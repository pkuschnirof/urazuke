// Avisa cuando el metodo publica un documento que ninguna portada enlaza.
//
// Por que existe (PND-025, deriva de PND-015). El disparador de publicacion de este
// repositorio NO toca la portada: espeja docs/html/ sobre el portal y nada mas. Un
// documento nuevo queda accesible por su URL y no aparece enlazado hasta que alguien se
// acuerde de agregarlo al indice y al i18n de la landing, que viven en el repositorio
// del portal. Medido el 2026-10-24: de los setenta y seis documentos publicados, diez no
// estaban enlazados desde ninguna de las diez portadas, y el mapa del sitio nombraba
// /urazuke/ y ni uno de los documentos, con un robots.txt que invita por nombre a los
// rastreadores. Nadie se acuerda, y servido no es publicado.
//
// Por que no alcanza con la mitad que ya existe del lado del portal. Ahi vive
// build/verify-urazuke-homes.mjs, que falla si un documento del disco no esta enlazado
// desde ninguna portada y si al mapa del sitio le falta o le sobra una direccion. Pero
// contesta cuando alguien lo corre en ESE repositorio: medido el 2026-10-26, el flujo de
// despliegue del portal corre build/verify-deploy-htaccess.mjs y NO corre el de las
// portadas. O sea que hoy, cuando el metodo publica algo nuevo, no hay nada automatico
// que lo mire. Este programa es la mitad de aca, y la corre el unico momento en que los
// dos arboles estan juntos: el trabajo de publicacion, despues de clonar el portal.
//
// Tres situaciones por documento, separadas a proposito y con el mismo vocabulario de
// portal_verify.mjs, porque colapsarlas es lo que hace inservible a un aviso:
//
//   enlazado        alguna portada lo enlaza y el mapa del sitio lo lleva. Verde.
//   fuera_del_mapa  una portada lo enlaza y el mapa no lo lleva: una persona llega y un
//                   rastreador que no ejecuta JavaScript no. Aviso.
//   sin_enlace      esta publicado y ninguna portada lo enlaza. Aviso, que es la
//                   severidad que UX-03 ("no hay huerfanas") declara.
//
// Y una cuarta que no es de un documento sino del chequeo entero:
//
//   ilegible        el arbol del portal no esta donde se dijo, no tiene portada
//                   principal, no tiene mapa del sitio, o no hay nada generado que
//                   contrastar. ROJO, y nunca "cero huerfanos": decir que no hay
//                   huerfanos cuando no se pudo mirar es exactamente el defecto que
//                   D-057 dejo escrito.
//
// Codigos de salida: 0 todo enlazado y en el mapa, 2 hay avisos, 1 no se pudo mirar.
//
// NO esta enganchado en build/build.mjs: la construccion corre sobre un solo arbol y
// este chequeo necesita dos. Uso:
//   node build/portal_orphans.mjs                            <- el clon del workflow (./portal)
//   node build/portal_orphans.mjs --portal C:\RPAForce\web    <- un arbol del portal cualquiera
//   node build/portal_orphans.mjs --generados docs/html       <- otro arbol de lo generado
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, posix } from 'node:path';
import { raiz, esLineaDeComandos } from './gates_lib.mjs';

// Donde vive el arbol del metodo adentro del repositorio del portal, y donde su mapa del
// sitio. Es la estructura que el paso de copia de la publicacion ya da por cierta.
export const ARBOL = ['yujin.app', 'urazuke'];
export const MAPA = ['yujin.app', 'sitemap.xml'];
// Lo que el metodo es dueno de llenar en el portal, y por eso no son portadas.
export const NO_SON_PORTADAS = new Set(['docs', 'api']);
export const PREFIJO = '/urazuke/docs/';

/**
 * Las portadas del arbol del metodo en el portal: la principal y la de cada idioma.
 * Se DESCUBREN del disco -- un directorio de primer nivel con su index.html -- y nunca de
 * una lista escrita a mano: un idioma nuevo entra por existir.
 */
export function portadasDelPortal(uzDir) {
  const salida = [];
  if (existsSync(join(uzDir, 'index.html'))) salida.push('index.html');
  let entradas = [];
  try { entradas = readdirSync(uzDir, { withFileTypes: true }); } catch { return salida; }
  for (const e of entradas.sort((a, b) => a.name.localeCompare(b.name))) {
    if (!e.isDirectory() || NO_SON_PORTADAS.has(e.name)) continue;
    if (existsSync(join(uzDir, e.name, 'index.html'))) salida.push(e.name + '/index.html');
  }
  return salida;
}

/**
 * Los documentos que UNA portada enlaza, como rutas relativas a /urazuke/docs/.
 * Funcion pura, para poder ejercitarla sin un arbol del portal al lado.
 *
 * Resuelve las dos formas que el generador del portal produce, y que no son un capricho:
 * la portada castellana vive en /urazuke/ y enlaza relativo ("docs/X.html"), y las
 * subpaginas de idioma reescriben todo enlace interno a absoluto ("/urazuke/docs/X.html")
 * porque relativo resolveria un nivel mas abajo. Una sola de las dos formas dejaria
 * nueve portadas sin leer, y el chequeo cerraria diciendo que hay huerfanos que no hay.
 */
export function enlacesADocumentos(html, rutaDeLaPortada, prefijo = PREFIJO) {
  const salida = new Set();
  const dir = posix.dirname('/urazuke/' + rutaDeLaPortada);
  for (const m of String(html ?? '').matchAll(/(?:href|src)\s*=\s*(["'])([^"']*)\1/gi)) {
    const crudo = m[2].split('#')[0].split('?')[0].trim();
    if (!crudo) continue;
    // Otro esquema (http:, mailto:, data:) o un protocolo relativo: no es del sitio.
    if (/^[a-z][a-z0-9+.-]*:/i.test(crudo) || crudo.startsWith('//')) continue;
    const abs = posix.normalize(crudo.startsWith('/') ? crudo : posix.join(dir, crudo));
    if (abs.startsWith(prefijo)) salida.add(abs.slice(prefijo.length));
  }
  return salida;
}

/** Los documentos que el mapa del sitio lleva, como rutas relativas a /urazuke/docs/. */
export function urlsDelMapa(xml, prefijo = PREFIJO) {
  const salida = new Set();
  for (const m of String(xml ?? '').matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)) {
    const i = m[1].indexOf(prefijo);
    if (i >= 0) salida.add(m[1].slice(i + prefijo.length));
  }
  return salida;
}

/** Lo que el metodo genera y va a quedar servido: todo .html de docs/html/, recursivo. */
export function documentosGenerados(dirHtml) {
  const salida = [];
  const caminar = (dir, rel) => {
    for (const e of readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const r = rel ? rel + '/' + e.name : e.name;
      if (e.isDirectory()) caminar(join(dir, e.name), r);
      else if (e.name.endsWith('.html')) salida.push(r);
    }
  };
  caminar(dirHtml, '');
  return salida;
}

/**
 * Clasifica cada documento generado contra lo que las portadas enlazan y lo que el mapa
 * lleva. Funcion pura: es la que las pruebas ejercitan, incluidos los casos que no se
 * pueden pedir a un arbol real sin romperlo.
 */
export function clasificar(generados, enlaces, mapa) {
  return generados.map((documento) => {
    if (!enlaces.has(documento)) {
      return {
        documento,
        estado: 'sin_enlace',
        detalle: mapa.has(documento)
          ? 'ninguna portada lo enlaza (el mapa del sitio si lo lleva)'
          : 'ninguna portada lo enlaza, y el mapa del sitio tampoco lo lleva',
      };
    }
    if (!mapa.has(documento)) {
      return { documento, estado: 'fuera_del_mapa', detalle: 'una portada lo enlaza y el mapa del sitio no lo lleva' };
    }
    return { documento, estado: 'enlazado', detalle: 'enlazado desde una portada y en el mapa del sitio' };
  });
}

/**
 * 0 todo enlazado y en el mapa; 2 hay avisos; 1 no se pudo mirar. El motivo ilegible gana
 * sobre todo lo demas, por la misma razon que en portal_verify.mjs: si no se pudo mirar,
 * no se sabe que hay, y no se reporta como si se supiera.
 */
export function codigoDeSalida(filas, motivoIlegible = null) {
  if (motivoIlegible) return 1;
  return filas.some((f) => f.estado !== 'enlazado') ? 2 : 0;
}

/**
 * Lee los dos arboles y devuelve el veredicto, o el motivo por el que no se pudo mirar.
 * { ilegible } o { portadas, enlaces, mapa, filas }
 */
export function revisar({ portal, generados }) {
  const uz = join(portal, ...ARBOL);
  const rutaMapa = join(portal, ...MAPA);
  if (!existsSync(uz)) {
    return { ilegible: 'el arbol del metodo no esta en el portal: falta ' + uz };
  }
  const portadas = portadasDelPortal(uz);
  if (!portadas.includes('index.html')) {
    return { ilegible: 'el portal no tiene la portada principal: falta ' + join(uz, 'index.html') };
  }
  if (!existsSync(rutaMapa)) {
    return { ilegible: 'el portal no tiene mapa del sitio: falta ' + rutaMapa };
  }
  let docs;
  try {
    docs = documentosGenerados(generados);
  } catch (e) {
    return { ilegible: 'no se pudo leer lo generado en ' + generados + ': ' + e.message };
  }
  if (!docs.length) {
    return { ilegible: 'no hay ningun documento generado en ' + generados + ': no hay nada que contrastar, y eso no es cero huerfanos' };
  }
  const enlaces = new Set();
  for (const p of portadas) {
    for (const d of enlacesADocumentos(readFileSync(join(uz, p), 'utf8'), p)) enlaces.add(d);
  }
  const mapa = urlsDelMapa(readFileSync(rutaMapa, 'utf8'));
  return { portadas, enlaces, mapa, filas: clasificar(docs, enlaces, mapa) };
}

const argumento = (bandera, defecto) => {
  const i = process.argv.indexOf(bandera);
  return i > 0 && process.argv[i + 1] ? process.argv[i + 1] : defecto;
};

function principal() {
  const portal = argumento('--portal', join(raiz, 'portal'));
  const generados = argumento('--generados', join(raiz, 'docs', 'html'));
  console.log('portal: ' + portal);
  console.log('generados: ' + generados);

  const r = revisar({ portal, generados });
  // La linea final es una sola y dice cual de las dos cosas paso, porque un paso que no
  // imprimio nada no corrio y un paso que no pudo mirar no es un verde.
  if (r.ilegible) {
    console.log('--- veredicto ---');
    console.log(r.ilegible);
    console.log('huerfanas: NO se pudo comprobar -- ' + r.ilegible);
    process.exit(1);
  }

  console.log('portadas del portal: ' + r.portadas.length + ' (' + r.portadas.join(', ') + ')');
  console.log('documentos generados: ' + r.filas.length
    + ' | enlazados desde una portada: ' + r.enlaces.size
    + ' | en el mapa del sitio: ' + r.mapa.size);

  const huerfanos = r.filas.filter((f) => f.estado === 'sin_enlace');
  const fuera = r.filas.filter((f) => f.estado === 'fuera_del_mapa');
  console.log('--- veredicto ---');
  for (const f of [...huerfanos, ...fuera]) console.log('  ' + f.documento + ': ' + f.estado + ' -- ' + f.detalle);
  if (huerfanos.length) {
    console.log('Hay ' + huerfanos.length + ' documento(s) que el metodo publica y ninguna portada enlaza. Servido no es publicado:');
    console.log('agregalos al indice y al i18n de la landing, que viven en el repositorio del portal.');
  }
  if (fuera.length) {
    console.log('Hay ' + fuera.length + ' documento(s) enlazados que el mapa del sitio no lleva: un rastreador que no ejecuta JavaScript no llega.');
  }
  if (!huerfanos.length && !fuera.length) {
    console.log('Los ' + r.filas.length + ' documentos que publica el metodo estan enlazados desde una portada y en el mapa del sitio.');
  }
  console.log('huerfanas: comprobado -- ' + r.filas.length + ' documentos, '
    + huerfanos.length + ' huerfanos, ' + fuera.length + ' fuera del mapa');
  process.exit(codigoDeSalida(r.filas));
}

if (esLineaDeComandos(import.meta.url)) principal();
