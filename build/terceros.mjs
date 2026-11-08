// El codigo de terceros que este sistema EJECUTA: inventariado, congelado y con su huella
// recalculada en cada construccion (D-093, PND-120).
//
// Por que existe, y la medicion es del propio metodo mirandose. El 2026-11-08, el relevamiento
// de la estacion N0 sobre este repositorio midio que ocho paginas publicadas --el documento
// principal en los ocho idiomas, que es la pagina insignia-- cargaban `mermaid@11` desde un host
// ajeno: mayor FLOTANTE resuelta en el momento de leer, sin integridad declarada y sin inventario.
// No es una vulnerabilidad declarada: es un privilegio no declarado, que es la forma de CQ-20. Y
// es incomodo de una manera util, porque el primer sistema que no cumplia el
// `docs/THIRD_PARTY_EXECUTION.md` que el metodo habia publicado el dia anterior era el
// repositorio del metodo.
//
// La decision del dueno (D-093) fue servirlo desde el propio sitio con la version clavada, y dejo
// escrito el cuidado que esta guarda hace cumplir: servirlo desde el propio sitio NO lo saca del
// inventario, porque el inventario es de lo que el sistema EJECUTA y no de quien lo hospeda. Si
// al mudarlo hubiera desaparecido de ahi, la mudanza habria roto la regla que vino a cumplir.
//
// Lo que exige:
//   A. INTEGRIDAD. Cada entrada del inventario tiene su archivo congelado en el arbol y su
//      sha256 RECALCULADO coincide con el que declara. Es lo que vuelve verificable a "version
//      clavada" sin red: una copia reemplazada a mano o truncada por una fusion se ve.
//   B. LA COPIA PUBLICADA ES LA CONGELADA. El archivo que el sitio sirve es byte a byte el que
//      el inventario declara. Lo que se audita y lo que el lector ejecuta no son dos cosas.
//   C. LICENCIA. Cada entrada declara su licencia y el texto de esa licencia viaja en el arbol:
//      MIT exige llevar el aviso, y un tercero vendoreado sin su licencia es una deuda legal
//      silenciosa.
//   D. DECISION POR ENTRADA. Cada entrada tiene su estado decidido --aceptada, acotada o
//      rechazada-- con quien, cuando y por que. Un inventario cuyas entradas nadie resolvio es
//      la medicion que nadie contrasto (CQ-22.4), que es la salvedad que el metodo ya escribio.
//   F. PROCEDENCIA, Y LO QUE CADA CLASE DECLARA (D-094, PND-123). Cada entrada dice si el metodo
//      la ELIGIO o si se la PUSIERON. A la elegida se le exigen A, B y C; a la impuesta no se le
//      puede pedir un archivo congelado --el metodo no lo sirve-- y se le exige lo que si se
//      puede decir de ella, que es mas incomodo: el bloque que el servidor agrega TRANSCRIPTO,
//      los bytes derivados de ese bloque y no escritos, donde y en que paginas se inyecta, lo que
//      el proveedor dice de el, que el metodo no lo escribio ni lo sirve, si puede impedirlo, y
//      --cuando no puede-- la salida elegida. Una declaracion sin salida es la aceptacion
//      permanente de un privilegio que nadie decidio.
//   E. NINGUN TERCERO SIN DECLARAR EN LO PUBLICADO. Se recorren las paginas publicadas y se
//      junta todo lo que EJECUTAN: el `src` de cada script y los `import` de los modulos en
//      linea. Una direccion absoluta es un hallazgo --eso es volver a depender de un host
//      ajeno-- y una referencia a `vendor/` que no sea el archivo que una entrada declara
//      tambien, porque seria una copia que el inventario no conoce.
//
// Lo que NO promete, dicho aca y no cuando falle:
//   - No opina sobre si el tercero es seguro. Lo que vigila es que este DECLARADO, con su version
//     exacta, su huella y la decision de una persona al lado. La verdad de esa decision la
//     decide el dueno leyendo, que es el mismo borde que D-089 escribio para sus reglas nuevas.
//   - No mira lo que un tercero hace en tiempo de ejecucion. Que el paquete congelado no baje
//     nada mas esta MEDIDO y declarado en el inventario (0 importaciones dinamicas, 0 chunks),
//     pero es una medicion del dia que se congelo y no una propiedad que esta guarda recalcule.
//   - No mira las hojas de estilo ni las imagenes: el inventario del metodo es del codigo que el
//     sistema EJECUTA, y esa es la palabra que el prompt del peldano 14 usa.
//   - NO MIRA LA RED, y esto es lo mas importante que dice esta cabecera. Lee los archivos del
//     ARBOL. Lo que un servidor agrega en el camino no esta en el arbol y esta guarda no lo puede
//     ver, por mas entradas que se le agreguen: mira el lado equivocado del cable. Esta medido y
//     no es una hipotesis -- el 2026-11-08 esta guarda dijo "84 paginas publicadas revisadas, 0
//     hallazgos", y era verdad, la misma manana en que las 84 paginas SERVIDAS ejecutaban un
//     script de un host ajeno que el hospedaje inyecta. La mitad que falta es
//     build/sonda_publicado.mjs, que va de la red al arbol (D-094, PND-123).
//
// Las comprobaciones son PURAS --reciben el arbol descripto como dato-- para que los rojos
// deliberados puedan alimentarlas con un arbol roto a mano. Una guarda que nadie vio caer no
// demuestra que guarde nada, y en este proyecto ya paso cinco veces.
// Uso: node build/terceros.mjs
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { raiz, esLineaDeComandos } from './gates_lib.mjs';

export const INVENTARIO = 'vendor/terceros.json';
export const ESTADOS = ['accepted', 'narrowed', 'rejected'];
// La PROCEDENCIA de una entrada, que es la columna que PND-123 dejo como deuda y vale mas que el
// hallazgo que la pidio: quien lea el inventario tiene que poder distinguir mecanicamente un
// tercero que el metodo ELIGIO --lo busco, lo congelo, lo sirve-- de uno que le PUSIERON, que el
// metodo no escribio, no sirve y hoy no puede impedir. Sin esa distincion un inventario cumple la
// regla por la forma y la incumple por el fondo: "ejecutamos tccl.min.js, decision: aceptado"
// seria cierto del campo y falso del hecho.
export const PROCEDENCIAS = ['chosen_by_the_method', 'imposed_by_the_hosting'];
export const elegido = (e) => e.provenance !== 'imposed_by_the_hosting';

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');

/** El inventario declarado, leido del disco. */
export function leerInventario(base = raiz) {
  return JSON.parse(readFileSync(join(base, INVENTARIO), 'utf8'));
}

/**
 * Lo que EJECUTA una pagina: el `src` de cada script y los `import` de cada modulo en linea.
 * Puro: recibe el HTML y devuelve las referencias, para que la prueba pueda armar una pagina a
 * mano sin escribir un archivo.
 */
export function referenciasQueEjecuta(html) {
  const refs = [];
  for (const m of html.matchAll(/<script\b([^>]*)>/gi)) {
    const src = m[1].match(/\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
    if (src) refs.push({ kind: 'script-src', url: src[1] ?? src[2] });
  }
  for (const m of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)) {
    for (const imp of m[1].matchAll(/\bimport\s+(?:[\w*{}\s,]+\s+from\s+)?["']([^"']+)["']/g)) {
      refs.push({ kind: 'module-import', url: imp[1] });
    }
    for (const imp of m[1].matchAll(/\bimport\s*\(\s*["']([^"']+)["']\s*\)/g)) {
      refs.push({ kind: 'dynamic-import', url: imp[1] });
    }
  }
  return refs;
}

/** Una direccion que sale del propio sitio: tiene esquema, o empieza con dos barras. */
export const esAjena = (url) => /^[a-z][a-z0-9+.-]*:/i.test(url) || url.startsWith('//');

/**
 * La comprobacion. Recibe { entries, files, pages } y devuelve la lista de hallazgos; cada uno
 * nombra la comprobacion que cayo, porque un rojo que dice "los terceros no coinciden" obliga a
 * buscar donde, y eso es trabajo que la guarda ya hizo.
 *   entries: el inventario declarado
 *   files:   { ruta: { sha256, bytes } } -- lo que el arbol tiene
 *   pages:   [ { ruta, refs: [ { kind, url } ] } ] -- lo publicado
 */
export function comprobar({ entries, files, pages }) {
  const h = [];
  const publicados = new Set();

  /** D. decision por entrada. Vale para las dos procedencias: la unica cosa que el metodo exige
   * igual de un tercero que eligio y de uno que le pusieron es que alguien la haya decidido. */
  const decision = (e, quien) => {
    const d = e.decision ?? {};
    if (!ESTADOS.includes(d.state)) {
      h.push('[D] ' + quien + ': su decision no esta resuelta (estado ' + JSON.stringify(d.state ?? null)
        + '; los que el metodo acepta son ' + ESTADOS.join(', ') + ')');
    }
    if (!d.by || !d.on) h.push('[D] ' + quien + ': su decision no dice quien la tomo y cuando');
    if (!d.why) h.push('[D] ' + quien + ': su decision no dice por que');
  };

  for (const e of entries) {
    const quien = e.id || e.name || '(entrada sin id)';

    // F. la procedencia, y lo que cada clase tiene que declarar. Va primero porque es la que
    // decide que se le exige a la entrada: a un tercero impuesto no se le puede pedir el archivo
    // congelado ni su huella --el metodo no lo sirve-- y pedirselo seria una guarda que no se
    // puede cumplir nunca; lo que se le exige es lo que SI se puede decir de el, que es mas
    // incomodo: el bloque transcripto, la medicion con su fecha, y que el metodo no lo controla.
    if (!PROCEDENCIAS.includes(e.provenance)) {
      h.push('[F] ' + quien + ': no declara su procedencia (declara ' + JSON.stringify(e.provenance ?? null)
        + '; las que el metodo acepta son ' + PROCEDENCIAS.join(', ') + ')');
    }
    if (!elegido(e)) {
      const iny = e.injection ?? {};
      const c = e.control ?? {};
      if (!e.host) h.push('[F] ' + quien + ': un tercero impuesto tiene que declarar el host que el lector le pide');
      if (!iny.snippet) {
        h.push('[F] ' + quien + ': no transcribe el bloque que el servidor agrega, y sin el bloque no hay con que contrastar lo servido');
      } else if (iny.bytes !== iny.snippet.length) {
        h.push('[F] ' + quien + ': declara ' + iny.bytes + ' bytes inyectados y el bloque transcripto tiene '
          + iny.snippet.length + ': la cifra se escribio en vez de derivarse del bloque');
      }
      if (!iny.where || !iny.pages) h.push('[F] ' + quien + ': no dice donde se inyecta ni en que paginas');
      if (!iny.provider_comment) h.push('[F] ' + quien + ': no transcribe lo que el proveedor dice del bloque');
      if (c.written_by_the_method !== false || c.served_by_the_method !== false) {
        h.push('[F] ' + quien + ': un tercero impuesto no lo escribe ni lo sirve el metodo, y la entrada no lo dice');
      }
      if (typeof c.removable_by_the_method !== 'boolean' || !c.how_it_could_stop || !c.note) {
        h.push('[F] ' + quien + ': no declara si el metodo puede impedirlo, como podria dejar de correr, y la nota que lo dice en palabras');
      }
      if (c.removable_by_the_method === false && !e.decision?.exit?.chosen) {
        h.push('[F] ' + quien + ': el metodo no puede impedirlo y la decision no nombra una salida elegida: una declaracion sin salida es la aceptacion permanente de un privilegio que nadie decidio');
      }
      const m = e.measured ?? {};
      if (!m.on || !m.source || !(m.receipts?.length)) {
        h.push('[F] ' + quien + ': su medicion no dice cuando, con que y con que recibos');
      }
      decision(e, quien);
      continue;
    }

    // A. integridad del congelado
    const congelado = files[e.file];
    if (!congelado) {
      h.push('[A] ' + quien + ': el inventario declara ' + e.file + ' y el arbol no lo tiene');
    } else if (e.integrity?.algo !== 'sha256') {
      h.push('[A] ' + quien + ': no declara su huella con sha256 (declara ' + JSON.stringify(e.integrity?.algo ?? null) + ')');
    } else if (congelado.sha256 !== e.integrity.value) {
      h.push('[A] ' + quien + ': ' + e.file + ' declara la huella ' + e.integrity.value.slice(0, 12)
        + ' y sus bytes dan ' + congelado.sha256.slice(0, 12) + ': la copia congelada no es la que el inventario audito');
    }

    // B. la copia publicada es la congelada
    const servido = files[e.published_as];
    if (!servido) {
      h.push('[B] ' + quien + ': el sitio tendria que servir ' + e.published_as + ' y no esta publicado');
    } else if (congelado && servido.sha256 !== congelado.sha256) {
      h.push('[B] ' + quien + ': lo publicado en ' + e.published_as + ' no es byte a byte lo congelado en ' + e.file);
    }
    if (e.published_as) publicados.add(e.published_as.replace(/^docs\/html\//, ''));

    // C. licencia
    if (!e.license) h.push('[C] ' + quien + ': no declara su licencia');
    if (!e.license_file) h.push('[C] ' + quien + ': no dice donde vive el texto de su licencia');
    else if (!files[e.license_file] || files[e.license_file].bytes === 0) {
      h.push('[C] ' + quien + ': declara la licencia ' + (e.license ?? '?') + ' y su texto no viaja en el arbol (' + e.license_file + ')');
    }

    decision(e, quien);
  }

  // E. ningun tercero sin declarar en lo publicado
  for (const p of pages) {
    for (const r of p.refs) {
      if (esAjena(r.url)) {
        h.push('[E] ' + p.ruta + ' ejecuta codigo de un host ajeno (' + r.kind + ' ' + r.url
          + '): lo publicado volvio a depender de alguien que el metodo no controla');
        continue;
      }
      if (!r.url.includes('vendor/')) continue;
      const relativo = r.url.replace(/^(\.\.\/)+/, '').replace(/^\//, '').split('?')[0];
      if (!publicados.has(relativo)) {
        h.push('[E] ' + p.ruta + ' carga ' + r.url + ' y el inventario no declara ese archivo publicado');
      }
    }
  }

  return h;
}

/** Todo lo que la comprobacion necesita, leido del DISCO de este repositorio. */
export function leerArbol(base = raiz) {
  const inv = leerInventario(base);
  const files = {};
  const anotar = (rel) => {
    const abs = join(base, rel);
    if (!existsSync(abs)) return;
    const buf = readFileSync(abs);
    files[rel] = { sha256: sha256(buf), bytes: buf.length };
  };
  for (const e of inv.entries) for (const r of [e.file, e.published_as, e.license_file]) if (r) anotar(r);

  const pages = [];
  const caminar = (rel) => {
    const abs = join(base, rel);
    if (!existsSync(abs)) return;
    for (const entrada of readdirSync(abs, { withFileTypes: true })) {
      const hijo = rel + '/' + entrada.name;
      if (entrada.isDirectory()) caminar(hijo);
      else if (entrada.name.endsWith('.html')) {
        pages.push({ ruta: hijo, refs: referenciasQueEjecuta(readFileSync(join(base, hijo), 'utf8')) });
      }
    }
  };
  const html = join(base, 'docs', 'html');
  if (existsSync(html) && statSync(html).isDirectory()) caminar('docs/html');
  return { entries: inv.entries, files, pages };
}

/** Las cuentas que el documento publica, DERIVADAS del inventario y no escritas (D-077, D-090). */
export function cuentas(entries) {
  return {
    entries_total: entries.length,
    entries_with_a_decision: entries.filter((e) => ESTADOS.includes(e.decision?.state)).length,
    // Las dos clases, DERIVADAS igual que las otras dos: el dia que entre un tercero impuesto mas
    // --o el dia que la mudanza saque este-- la cifra se mueve sola. Escribirla seria exactamente
    // lo que D-077 y D-090 persiguen, y aca el riesgo es peor que el de una cifra vencida: la
    // cuenta de terceros que nadie eligio es lo primero que un lector busca en este inventario.
    entries_chosen_by_the_method: entries.filter((e) => elegido(e)).length,
    entries_imposed_by_the_hosting: entries.filter((e) => !elegido(e)).length,
  };
}

export function informe(estado, hallazgos) {
  const interesa = (r) => r.url.includes('vendor/') || esAjena(r.url);
  const conRef = estado.pages.filter((p) => p.refs.some(interesa));
  const refs = conRef.reduce((a, p) => a + p.refs.filter(interesa).length, 0);
  const c = cuentas(estado.entries);
  const l = hallazgos.map((x) => '  ' + x);
  l.push('terceros ejecutados: comprobado -- ' + c.entries_total + ' entradas ('
    + c.entries_chosen_by_the_method + ' elegidas, ' + c.entries_imposed_by_the_hosting
    + ' impuestas por el hospedaje), ' + c.entries_with_a_decision
    + ' con decision, huellas recalculadas sobre ' + Object.keys(estado.files).length + ' archivos del arbol, '
    + estado.pages.length + ' paginas publicadas revisadas, ' + refs + ' referencias a un tercero en '
    + conRef.length + ' de ellas, ' + hallazgos.length + ' hallazgos');
  return l.join('\n');
}

if (esLineaDeComandos(import.meta.url)) {
  const estado = leerArbol();
  const hallazgos = comprobar(estado);
  console.log(informe(estado, hallazgos));
  process.exit(hallazgos.length === 0 ? 0 : 1);
}
