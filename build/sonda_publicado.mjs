// La sonda de lo publicado: le pregunta a PRODUCCION, por red, que recibe el lector, y lo
// contrasta contra el arbol (D-094, PND-123).
//
// Por que existe, y es la mitad que faltaba. Este repositorio tiene guardas que van del dato a
// la prosa, de la prosa al dato y del arbol a la red. No tenia ninguna que fuera DE LA RED AL
// ARBOL, y las dos veces que "servido no es publicado" se midio de verdad fue por esa puerta:
//
//   2026-10-24  algo COMMITEADO que no llegaba al lector. El .htaccess del portal estuvo
//               commiteado y desplegado en verde, y el rsync del portal lo excluia: nunca
//               llego al servidor. Lo encontro una persona preguntandose por que la interfaz
//               de datos no era legible.
//   2026-11-08  algo que NADIE COMMITEO y si llega. El hospedaje inyecta un bloque de script
//               ajeno en todas las paginas publicadas, despues de `</body>`, y las paginas del
//               arbol no lo nombran ni una vez. `build/terceros.mjs` dijo "0 hallazgos" la
//               misma manana, y era verdad: mira el arbol, que es el lado equivocado del cable.
//
// Las dos caras de la misma frase, y la unica forma de cerrarlas es pedirle los bytes al otro
// extremo y restarle lo que el metodo declara. De ahi la comprobacion central de esta sonda,
// que es una sola y es fuerte: QUITANDO LAS INYECCIONES QUE EL INVENTARIO DECLARA, lo que
// produccion sirve es byte a byte el archivo del arbol. Cualquier cosa agregada, quitada o
// cambiada en el camino cae, sin que haya que saber de antemano que buscar.
//
// Lo que exige, por paginas y por recursos:
//   S1. LEGIBLE. Cada pagina se pidio y contesto 200 con cuerpo. No haber podido mirar es rojo
//       y nunca verde (D-057): un fallo de red no se informa como "no hay hallazgos".
//   S2. SERVIDO MENOS LO DECLARADO = ARBOL. Byte a byte, y el hallazgo dice de que lado esta
//       la diferencia: mas bytes es algo que nadie commiteo llegando al lector, menos bytes es
//       algo commiteado que no llega.
//   S3. NINGUN HOST AJENO SIN DECLARAR en lo que la pagina servida EJECUTA. Se lee lo que
//       ejecuta con la misma funcion que usa la guarda del arbol (build/terceros.mjs), asi que
//       las dos miran lo mismo y lo unico que cambia es de donde salio el HTML.
//   S4. NINGUNA REFERENCIA RELATIVA QUE EL ARBOL NO TENGA.
//   S5. LA DECLARACION NO SE VENCE. Una inyeccion que el inventario declara y que ya no
//       aparece tambien es un hallazgo: el inventario quedo diciendo algo que dejo de ser
//       cierto, y eso es la copia vencida que este repositorio persigue desde D-077.
//   S6. LOS RECURSOS QUE EL INVENTARIO PUBLICA bajan de la red con la huella que declaran.
//
// Lo que NO promete, dicho aca y no cuando falle:
//   - No ve lo que un script agrega en tiempo de ejecucion. Esto es el HTML que el servidor
//     devuelve; lo que el navegador de verdad termina bajando lo contesta
//     tests/e2e_produccion.mjs, en un navegador real, que es el otro lado de verdad que
//     CQ-21.1 exige.
//   - No opina sobre si un tercero es seguro, igual que build/terceros.mjs. Lo que exige es
//     que este DECLARADO; la verdad de la decision la decide una persona leyendo.
//   - No mira hojas de estilo ni imagenes: el inventario del metodo es del codigo que el
//     sistema EJECUTA.
//   - No corre en build/build.mjs y no va a correr: la construccion tiene que correr sin red.
//     Esta sonda vive en el paso de publicacion y en un flujo con calendario propio
//     (.github/workflows/sonda.yml), porque lo que vigila cambia SIN UN COMMIT: el dia que el
//     hospedaje agregue, cambie o apague su bloque no va a haber ningun cambio en el arbol que
//     dispare nada.
//
// La comprobacion es PURA --recibe lo servido y lo del arbol como dato-- para que los rojos
// deliberados puedan alimentarla con una produccion mentida. Una guarda que nadie vio caer no
// demuestra que guarde nada, y en este proyecto ya paso cinco veces.
//
// Uso:
//   node build/sonda_publicado.mjs
//   node build/sonda_publicado.mjs --base https://otro/extremo/docs
//   node build/sonda_publicado.mjs --timeout 45
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { raiz, esLineaDeComandos } from './gates_lib.mjs';
import { leerInventario, referenciasQueEjecuta, esAjena } from './terceros.mjs';

export const BASE = 'https://yujin.app/urazuke/docs';
export const RAIZ_PUBLICADA = 'docs/html';
export const VENTANA = 100;

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');

/**
 * Las inyecciones que el inventario declara: las entradas cuya procedencia es el hospedaje y
 * que traen el bloque transcripto. Es lo UNICO que la sonda le descuenta a lo servido; todo
 * lo demas que aparezca es un hallazgo.
 */
export function inyeccionesDeclaradas(inv) {
  return inv.entries
    .filter((e) => e.provenance === 'imposed_by_the_hosting' && e.injection?.snippet)
    .map((e) => ({ id: e.id, host: e.host, snippet: e.injection.snippet, pages: e.injection.pages }));
}

/** Los hosts ajenos que el inventario declara, de cualquier procedencia. */
export const hostsDeclarados = (inv) => inv.entries.map((e) => e.host).filter(Boolean);

/** El host de una direccion, o null si no se puede leer (una relativa, una basura). */
export function host(url) {
  try {
    return new URL(url.startsWith('//') ? 'https:' + url : url).hostname;
  } catch {
    return null;
  }
}

/** Le quita a un texto todas las apariciones de un bloque, y dice cuantas le quito. */
export function descontar(texto, snippet) {
  const partes = texto.split(snippet);
  return { texto: partes.join(''), veces: partes.length - 1 };
}

/** El primer byte en que dos textos difieren, con su ventana a cada lado. */
export function divergencia(a, b) {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return { offset: i, a: a.slice(i, i + VENTANA), b: b.slice(i, i + VENTANA) };
}

/** La ruta a la que resuelve una referencia relativa, vista desde la pagina que la trae. */
export function resolver(rutaPagina, url) {
  const dir = rutaPagina.includes('/') ? rutaPagina.slice(0, rutaPagina.lastIndexOf('/') + 1) : '';
  const crudo = url.startsWith('/') ? url.slice(1) : dir + url.split('?')[0];
  return crudo.split('/').reduce((pila, parte) => {
    if (parte === '..') pila.pop();
    else if (parte !== '.' && parte !== '') pila.push(parte);
    return pila;
  }, []).join('/');
}

/**
 * La comprobacion. Pura: recibe lo que se pidio y lo que el arbol tiene, y devuelve la lista
 * de hallazgos; cada uno nombra la comprobacion que cayo, porque un rojo que dice "produccion
 * no coincide" obliga a buscar donde, y eso es trabajo que la sonda ya hizo.
 *   paginas:     [ { ruta, arbol: string|null, servido: { status, texto } | { error } } ]
 *   recursos:    [ { ruta, arbol: { sha256, bytes }|null, servido: { status, sha256, bytes } | { error } } ]
 *   inyecciones: inyeccionesDeclaradas(inv)
 *   publicados:  las rutas que el arbol publicado tiene, relativas a RAIZ_PUBLICADA
 */
export function comprobar({ paginas, recursos = [], inyecciones = [], publicados = [] }) {
  const h = [];
  const enElArbol = new Set(publicados);
  const vistas = new Map(inyecciones.map((i) => [i.id, 0]));

  for (const p of paginas) {
    // S1. legible. Un fallo de red no es un verde ni un silencio.
    if (p.servido.error) {
      h.push('[S1] ' + p.ruta + ': no se pudo leer de produccion (' + p.servido.error
        + '): no haber podido mirar es rojo y nunca verde');
      continue;
    }
    if (p.servido.status !== 200) {
      h.push('[S1] ' + p.ruta + ': produccion contesto ' + p.servido.status + ' y no 200');
      continue;
    }
    if (!p.servido.texto) {
      h.push('[S1] ' + p.ruta + ': produccion contesto 200 con el cuerpo vacio');
      continue;
    }
    if (p.arbol == null) {
      h.push('[S2] ' + p.ruta + ': produccion lo sirve y el arbol publicado no lo tiene');
      continue;
    }

    // S2. lo servido, descontadas las inyecciones declaradas, es el arbol.
    let limpio = p.servido.texto;
    for (const iny of inyecciones) {
      const r = descontar(limpio, iny.snippet);
      limpio = r.texto;
      if (r.veces > 0) vistas.set(iny.id, vistas.get(iny.id) + 1);
    }
    if (limpio !== p.arbol) {
      const d = divergencia(limpio, p.arbol);
      const lado = limpio.length > p.arbol.length
        ? 'lo servido trae ' + (limpio.length - p.arbol.length) + ' bytes que nadie commiteo'
        : limpio.length < p.arbol.length
          ? 'a lo servido le faltan ' + (p.arbol.length - limpio.length) + ' bytes que si estan commiteados'
          : 'mismo tamano y contenido distinto';
      h.push('[S2] ' + p.ruta + ': descontado lo que el inventario declara, lo servido no es el arbol -- '
        + lado + ', divergen en el byte ' + d.offset
        + '; servido ' + JSON.stringify(d.a) + ' / arbol ' + JSON.stringify(d.b));
    }

    // S3 y S4. lo que la pagina SERVIDA ejecuta.
    for (const r of referenciasQueEjecuta(p.servido.texto)) {
      if (esAjena(r.url)) {
        const quien = host(r.url);
        if (!inyecciones.some((i) => i.host && i.host === quien)) {
          h.push('[S3] ' + p.ruta + ' ejecuta codigo de un host que el inventario no declara ('
            + r.kind + ' ' + r.url + '): lo que el lector recibe tiene un tercero sin declarar');
        }
        continue;
      }
      const normal = resolver(p.ruta, r.url);
      if (!enElArbol.has(normal)) {
        h.push('[S4] ' + p.ruta + ' ejecuta ' + r.url + ' y el arbol publicado no tiene ese archivo ('
          + normal + ')');
      }
    }
  }

  // S5. la declaracion no se vence.
  for (const iny of inyecciones) {
    const cuantas = vistas.get(iny.id);
    if (cuantas === 0) {
      h.push('[S5] el inventario declara la inyeccion ' + iny.id + ' (' + iny.host
        + ') y no aparecio en ninguna pagina servida: la declaracion quedo vencida');
    } else if (iny.pages === 'every_published_page' && cuantas !== paginas.length) {
      h.push('[S5] el inventario declara que ' + iny.id + ' esta en todas las paginas publicadas y aparecio en '
        + cuantas + ' de ' + paginas.length + ': la declaracion quedo vencida');
    }
  }

  // S6. los recursos publicados, con su huella, pedidos por red.
  for (const r of recursos) {
    if (r.servido.error) {
      h.push('[S6] ' + r.ruta + ': no se pudo leer de produccion (' + r.servido.error + ')');
    } else if (r.servido.status !== 200) {
      h.push('[S6] ' + r.ruta + ': produccion contesto ' + r.servido.status + ' y no 200');
    } else if (!r.arbol) {
      h.push('[S6] ' + r.ruta + ': el arbol no tiene el archivo con el que comparar');
    } else if (r.servido.sha256 !== r.arbol.sha256) {
      h.push('[S6] ' + r.ruta + ': produccion sirve la huella ' + r.servido.sha256.slice(0, 12)
        + ' (' + r.servido.bytes + ' bytes) y el arbol declara ' + r.arbol.sha256.slice(0, 12)
        + ' (' + r.arbol.bytes + ' bytes): lo que el lector ejecuta no es lo auditado');
    }
  }

  return h;
}

/** Los archivos del arbol publicado, relativos a docs/html. */
export function archivosDelArbol(base = raiz) {
  const dir = join(base, RAIZ_PUBLICADA);
  const encontrados = [];
  const caminar = (rel) => {
    for (const e of readdirSync(join(dir, rel), { withFileTypes: true })) {
      const hijo = rel ? rel + '/' + e.name : e.name;
      if (e.isDirectory()) caminar(hijo);
      else encontrados.push(hijo);
    }
  };
  if (existsSync(dir)) caminar('');
  return encontrados;
}

/** Una pedida al otro extremo, con el motivo legible cuando falla (la leccion de D-058). */
export async function pedir(url, timeoutMs) {
  try {
    const r = await fetch(url, {
      signal: AbortSignal.timeout(timeoutMs),
      headers: { 'cache-control': 'no-cache' },
    });
    const buf = Buffer.from(await r.arrayBuffer());
    return { status: r.status, buf };
  } catch (e) {
    // El mensaje de fetch es siempre "fetch failed": el motivo esta en la causa, y es justo lo
    // que hay que poder leer (ECONNREFUSED, ETIMEDOUT, un timeout propio).
    const causa = e?.cause?.code ?? e?.cause?.message ?? '';
    return { error: [e?.name, e?.message, causa].filter(Boolean).join(' / ') };
  }
}

export function informe(estado, hallazgos) {
  const l = hallazgos.map((x) => '  ' + x);
  const encontradas = estado.inyecciones.map((i) => i.id + ' en ' + estado.vistas[i.id] + ' paginas');
  l.push('sonda de lo publicado: comprobado -- ' + estado.paginas.length + ' paginas pedidas por red a '
    + estado.base + ', ' + estado.legibles + ' legibles, ' + estado.bytes + ' bytes leidos, '
    + estado.inyecciones.length + ' inyecciones declaradas (' + (encontradas.join('; ') || 'ninguna')
    + '), ' + estado.recursos.length + ' recursos con su huella recalculada, '
    + hallazgos.length + ' hallazgos');
  return l.join('\n');
}

const argumento = (bandera, defecto) => {
  const i = process.argv.indexOf(bandera);
  return i > 0 && process.argv[i + 1] ? process.argv[i + 1] : defecto;
};

async function principal() {
  const base = argumento('--base', BASE).replace(/\/$/, '');
  const timeout = Number(argumento('--timeout', '30')) * 1000;
  const inv = leerInventario();
  const inyecciones = inyeccionesDeclaradas(inv);
  const publicados = archivosDelArbol();
  const rutas = publicados.filter((r) => r.endsWith('.html'));

  const paginas = [];
  let bytes = 0;
  for (const ruta of rutas) {
    const s = await pedir(base + '/' + ruta, timeout);
    if (s.buf) bytes += s.buf.length;
    paginas.push({
      ruta,
      arbol: readFileSync(join(raiz, RAIZ_PUBLICADA, ruta), 'utf8'),
      servido: s.error ? { error: s.error } : { status: s.status, texto: s.buf.toString('utf8') },
    });
  }

  const recursos = [];
  for (const e of inv.entries.filter((x) => x.published_as)) {
    const ruta = e.published_as.replace(/^docs\/html\//, '');
    const s = await pedir(base + '/' + ruta, timeout);
    const abs = join(raiz, e.published_as);
    const propio = existsSync(abs) ? readFileSync(abs) : null;
    recursos.push({
      ruta,
      arbol: propio ? { sha256: sha256(propio), bytes: propio.length } : null,
      servido: s.error ? { error: s.error } : { status: s.status, sha256: sha256(s.buf), bytes: s.buf.length },
    });
    if (s.buf) bytes += s.buf.length;
  }

  const hallazgos = comprobar({ paginas, recursos, inyecciones, publicados });
  const vistas = {};
  for (const iny of inyecciones) {
    vistas[iny.id] = paginas.filter((p) => p.servido.texto?.includes(iny.snippet)).length;
  }
  console.log(informe({
    base,
    paginas,
    recursos,
    inyecciones,
    vistas,
    bytes,
    legibles: paginas.filter((p) => p.servido.status === 200 && p.servido.texto).length,
  }, hallazgos));
  process.exit(hallazgos.length === 0 ? 0 : 1);
}

if (esLineaDeComandos(import.meta.url)) await principal();
