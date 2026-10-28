// Publica el INDICE de la interfaz de datos del metodo: el unico recurso que un
// consumidor puede pedir sin saber nada de antemano, y que le dice que mas hay, donde
// vive, con que version y con que huella. Hasta hoy la interfaz publicaba dos archivos
// que se servian bien y nada que los listara -- /api/ daba 403 y /api/index.json daba
// 404 --, asi que quien no habia leido el repositorio no tenia por donde empezar.
//
// Es un GENERADO, como los otros dos: no se edita a mano nunca. Sale de leer los dos
// archivos ya publicados en docs/html/api/ y de EXTRAER lo que cada uno declara; no
// transcribe ningun texto (una sola copia de cada texto, la misma regla del Anexo H).
//
// Lo que NO lleva, y es una decision escrita (D-056): version propia ni huella propia.
// Es un directorio, no un catalogo: su identidad es la de aquello que apunta. Si llevara
// huella, cualquier cambio en los otros dos obligaria a subir una TERCERA linea de
// version que nadie declaro, contra D-053. La tension que eso deja -- como sabe el
// consumidor que el indice no esta viejo -- se resuelve sin darle identidad: el indice
// CITA la version y la huella de cada recurso; el consumidor baja el recurso, recalcula
// y compara. Si no coinciden, el indice esta viejo y lo sabe sin tener que confiar en el.
// Eso va escrito adentro del archivo, en `identity`, porque un consumidor no tiene por
// que deducirlo.
//
// En ingles y en ASCII puro (D-051): es nivel de datos. La unica aparicion del nombre
// del alojamiento es la direccion absoluta de cada recurso, que es una direccion y no una
// dependencia declarada; la prueba de neutralidad la acota a esa forma (D-056).
//
// Salida: docs/html/api/index.json
// Uso: node build/index_api.mjs
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { raiz, esLineaDeComandos, CASTELLANO, ALCANCE_DE_LA_HUELLA, BASE_API, CARPETA_INMUTABLE, urlInmutable } from './gates_lib.mjs';

export const DIR = join(raiz, 'docs', 'html', 'api');
export const NOMBRE = 'index.json';
export const BASE_CANONICA = BASE_API;   // una sola copia de la base, en gates_lib
export const BASE_ESPEJO = 'https://yujin.app/urazuke/docs/api/';
export const REPO = 'https://github.com/pkuschnirof/urazuke';
// El mismo registro, en la direccion que devuelve el JSON. Hace falta las dos porque son
// dos cosas distintas: `url` es la pagina que lee una persona (GitHub la sirve como HTML:
// medido 284852 B de text/html) y `fetch_url` es el archivo que baja una maquina (11386 B
// de JSON valido). Publicar solo la primera obligaba al consumidor a DERIVAR la segunda,
// y adivinar una direccion es justo lo que el anexo prohibe: lo pidio el consumidor que
// implemento la obligacion de fijacion, el 2026-10-27 (PND-056).
export const REPO_CRUDO = 'https://raw.githubusercontent.com/pkuschnirof/urazuke/main/';

// Los recursos que la interfaz publica, declarados a mano: cada uno con el NOMBRE del
// campo de version que usa (no el valor: el valor se extrae del archivo) y el registro
// append-only donde vive el par (version -> huella), que es el ancla de confianza que no
// esta en este alojamiento. Agregar un recurso a docs/html/api/ sin agregarlo aca deja
// el indice incompleto, y el verificador lo rechaza en vez de publicar un indice que
// esconde un archivo.
export const RECURSOS = [
  {
    name: 'gates.json',
    version_field: 'catalog_version',
    ledger_path: 'gates/catalog.json',
    ledger_field: 'changelog',
  },
  {
    name: 'prompts.json',
    version_field: 'corpus_version',
    ledger_path: 'prompts/catalog.json',
    ledger_field: 'changelog',
  },
];

const LEDGER_NOTE = 'Append-only: one entry per declared version with the content hash it produced, and a hash already recorded is never edited. It lives in the method repository, not on this host, so the pair (version -> hash) can be checked against a source other than the server that handed you the file. It is not part of any published payload, so recording an entry cannot change the hash that entry records.';

// La direccion inmutable (PND-008). La viva sirve siempre lo vigente, asi que quien la
// apunta se actualiza en silencio; la inmutable devuelve una version y solo esa. El indice
// las declara LAS DOS y la lista completa de versiones que tienen direccion, para que
// ningun consumidor tenga que derivar una direccion -- que es inventarla (D-069).
const INMUTABLE_NOTE = 'The live url above always serves whatever is current, so a tool that points at it is updated in silence and the hash moves under its feet. Each address below returns one declared version and only that one, and versions are never removed. What the address promises is the content whose hash the version ledger records for that version, not the bytes: the keys the hash excludes are publication metadata and a regeneration can move them. Recompute and compare, which is what you were going to do anyway.';

const INMUTABLE_PATTERN = '<base><version>.json';

const FETCH_NOTE = 'Two addresses because they are two different things: url is the page a person reads, which this host serves as HTML, and fetch_url is the same file as JSON, which is what a tool downloads. Both are declared so no consumer has to derive one from the other: a derived address is an invented address.';

const WHAT = 'A directory of the data interface of the Urazuke method: the one resource you can ask for without knowing anything else beforehand. For every published resource it declares the canonical URL, the media type, the size in bytes, the name and the value of the version field that resource declares, and the content hash it declares with its algorithm and its canonical form, so a consumer knows what it is going to recompute before downloading anything. This file carries no version and no content hash of its own, on purpose (see identity): do not use it as a trust anchor, verify it against the resources it lists.' + ' ' + ALCANCE_DE_LA_HUELLA;

const IDENTITY = {
  has_own_version: false,
  has_own_content_hash: false,
  why: 'A directory, not a catalogue: its identity is the identity of what it points at. A hash of its own would force a third declared version line, that nobody declares, every time one of the listed resources changes.',
  staleness_check: 'Fetch a listed resource, recompute its hash over the canonical form declared here for that resource, and compare it with the hash quoted here. If the two differ, this index is stale, and you know that without having to trust it.',
};

const ESPEJO_NOTE = 'The readable site carries its own copy of this directory, written by the same publication run, so the two cannot drift while that run is the only writer. Cite the canonical base.';

/* ------------------------------------------------------------------ *
 * Lo que hay en disco
 * ------------------------------------------------------------------ */

/**
 * Los archivos publicados, tal como estan en docs/html/api/: tamanio en bytes y lo que
 * declaran. El indice se excluye a si mismo (un directorio no se lista adentro).
 *
 * El tamanio se mide sobre los bytes del archivo. El repositorio fuerza fin de linea LF
 * en .gitattributes, asi que ese numero es el mismo en cualquier clon y es el que sirve
 * produccion -- medido: Content-Length 100112 contra 100112 en disco. Si un dia un clon
 * los convierte a CRLF, el tamanio declarado seria una mentira de cara a lo que el
 * servidor entrega, asi que se verifica y se dice.
 */
export function leerDisco(dir = DIR) {
  const disco = {};
  for (const nombre of readdirSync(dir).filter((f) => f.endsWith('.json') && f !== NOMBRE).sort()) {
    const crudo = readFileSync(join(dir, nombre));
    let json = null;
    try { json = JSON.parse(crudo.toString('utf8')); } catch { /* lo reporta el verificador */ }
    disco[nombre] = { bytes: crudo.length, tiene_cr: crudo.includes(0x0d), json };
  }
  return disco;
}

/**
 * Las versiones que el registro append-only de un recurso declara, en orden. Es extraccion
 * y no transcripcion: la lista vive una sola vez, en el changelog del catalogo del recurso.
 */
export function versionesDelRegistro(r, base = raiz) {
  const catalogo = JSON.parse(readFileSync(join(base, r.ledger_path), 'utf8'));
  return (catalogo[r.ledger_field] ?? []).map((e) => e[r.version_field]).filter(Boolean);
}

/** El indice, armado de lo que los recursos declaran. No transcribe: extrae. */
export function armarIndice(disco = leerDisco(), ahora = new Date()) {
  const recursos = [];
  for (const r of RECURSOS) {
    const encontrado = disco[r.name];
    if (!encontrado || !encontrado.json) continue;   // lo reporta verificarIndice
    const p = encontrado.json;
    const h = p.content_hash ?? {};
    recursos.push({
      name: r.name,
      url: BASE_CANONICA + r.name,
      media_type: 'application/json',
      bytes: encontrado.bytes,
      what: p.what,
      version_field: r.version_field,
      version: p[r.version_field],
      content_hash: {
        field: 'content_hash.value',
        algo: h.algo,
        encoding: h.encoding,
        canonical_form: h.canonical_form,
        value: h.value,
      },
      immutable: {
        base: BASE_API + CARPETA_INMUTABLE[r.name] + '/',
        url_pattern: INMUTABLE_PATTERN,
        current: urlInmutable(r.name, p[r.version_field]),
        versions: versionesDelRegistro(r),
        note: INMUTABLE_NOTE,
      },
      version_ledger: {
        url: REPO + '/blob/main/' + r.ledger_path,
        fetch_url: REPO_CRUDO + r.ledger_path,
        path: r.ledger_path,
        field: r.ledger_field,
        note: LEDGER_NOTE,
        fetch_note: FETCH_NOTE,
      },
    });
  }
  return {
    what: WHAT,
    identity: IDENTITY,
    generated_at: ahora.toISOString(),
    source: REPO,
    license: 'CC BY-SA 4.0',
    canonical_base: BASE_CANONICA,
    mirrors: [{ base: BASE_ESPEJO, note: ESPEJO_NOTE }],
    resources: recursos,
  };
}

/* ------------------------------------------------------------------ *
 * El verificador
 * ------------------------------------------------------------------ */

const TOPE_IDENTIDAD = ['version', 'catalog_version', 'corpus_version', 'content_hash', 'index_version'];

/** Toda cadena del indice, con su camino, para que el rojo diga donde. */
function cadenas(valor, p = '') {
  if (typeof valor === 'string') return [[p, valor]];
  if (Array.isArray(valor)) return valor.flatMap((x, i) => cadenas(x, p + '[' + i + ']'));
  if (valor && typeof valor === 'object') return Object.entries(valor).flatMap(([k, x]) => cadenas(x, p ? p + '.' + k : k));
  return [];
}

const CAMINO_SIN_PROSA = /(^|\.)(url|base|path|field|name|source|license|canonical_base|version|version_field|media_type|algo|encoding|canonical_form|value|generated_at)$/;

/**
 * Verifica el indice contra lo que hay en disco. Devuelve la lista de errores con su
 * codigo: si hay uno solo, no se publica nada.
 *
 * Un indice que cita una huella vieja es PEOR que no tener indice, porque le miente al
 * consumidor con cara de dato verificado. De ahi que esto corra en las dos puntas: al
 * generar (build/index_api.mjs, build/build.mjs) y al publicar (build/api_check.mjs, en
 * sus dos modos).
 */
export function verificarIndice(indice, disco = leerDisco()) {
  const errores = [];
  const err = (codigo, que, arreglo) => errores.push({ codigo, que, arreglo });

  for (const clave of TOPE_IDENTIDAD) {
    if (clave in indice) {
      err('E_INDICE_IDENTIDAD', 'el indice declara ' + clave + ', o sea identidad propia',
        'D-056: el indice no lleva version ni huella propias. Su identidad es la de los recursos que apunta.');
    }
  }
  if (indice.canonical_base !== BASE_CANONICA) {
    err('E_INDICE_CANONICA', 'el indice declara la base canonica ' + JSON.stringify(indice.canonical_base),
      'la canonica es ' + BASE_CANONICA + ': es la que un consumidor cita (PND-006).');
  }

  const listados = new Set();
  for (const r of indice.resources ?? []) {
    listados.add(r.name);
    const enDisco = disco[r.name];
    if (!enDisco) {
      err('E_INDICE_FALTA_RECURSO', 'el indice lista ' + r.name + ' y no esta en docs/html/api/',
        'o el recurso dejo de publicarse y sale del indice, o falta generarlo. Un indice que apunta a un 404 manda al consumidor a la nada.');
      continue;
    }
    if (!enDisco.json) {
      err('E_INDICE_RECURSO_ILEGIBLE', r.name + ' no es JSON legible', 'regeneralo: node build/build.mjs');
      continue;
    }
    if (enDisco.tiene_cr) {
      err('E_INDICE_BYTES', r.name + ' tiene fin de linea CRLF en este clon',
        'el tamanio declarado no seria el que sirve el servidor. El repositorio fuerza LF en .gitattributes: revisa la configuracion del clon.');
    }
    if (r.bytes !== enDisco.bytes) {
      err('E_INDICE_BYTES', 'el indice dice que ' + r.name + ' tiene ' + r.bytes + ' bytes y tiene ' + enDisco.bytes,
        'regenera el indice: node build/index_api.mjs');
    }
    const declaradaVersion = enDisco.json[r.version_field];
    if (declaradaVersion === undefined) {
      err('E_INDICE_VERSION', 'el indice dice que ' + r.name + ' usa el campo ' + r.version_field + ' y el archivo no lo tiene',
        'corregi version_field en build/index_api.mjs, o revisa que publica el recurso.');
    } else if (r.version !== declaradaVersion) {
      err('E_INDICE_VERSION', 'el indice cita la version ' + r.version + ' de ' + r.name + ' y el archivo declara ' + declaradaVersion,
        'regenera el indice: node build/index_api.mjs');
    }
    const h = enDisco.json.content_hash ?? {};
    for (const [campo, esperado] of [['algo', h.algo], ['encoding', h.encoding], ['canonical_form', h.canonical_form], ['value', h.value]]) {
      if (r.content_hash?.[campo] !== esperado) {
        err('E_INDICE_HUELLA', 'el indice cita content_hash.' + campo + ' = ' + JSON.stringify(r.content_hash?.[campo]) + ' para ' + r.name + ' y el archivo declara ' + JSON.stringify(esperado),
          'regenera el indice: node build/index_api.mjs. Un indice que cita una huella vieja miente con cara de dato verificado.');
      }
    }
    if (r.url !== BASE_CANONICA + r.name) {
      err('E_INDICE_URL', 'la direccion de ' + r.name + ' no es la canonica absoluta: ' + JSON.stringify(r.url),
        'un consumidor que solo tiene el indice necesita la direccion completa (PND-002, PND-006).');
    }
    if (!r.version_ledger?.url || !r.version_ledger?.field) {
      err('E_INDICE_REGISTRO', r.name + ' no apunta a su registro de versiones',
        'el par (version -> huella) es el unico ancla de confianza que vive fuera de este alojamiento (PND-007).');
    }
    // La direccion inmutable: la declara el indice y el consumidor NO la deriva, asi que
    // tiene que ser la que el recurso tiene de verdad y la lista tiene que ser la del
    // registro. Un indice que declara una direccion inmutable vieja manda a bajar otra
    // version que la que el consumidor cree (PND-008).
    const inm = r.immutable;
    // El recurso DECLARADO (build/index_api.mjs#RECURSOS), que es el que sabe de que
    // registro sale la lista de versiones. El indice lista nombres; la declaracion dice
    // donde vive el registro de cada uno.
    const declarado = RECURSOS.find((d) => d.name === r.name);
    if (!declarado) {
      err('E_INDICE_NO_DECLARADO', 'el indice lista ' + r.name + ' y RECURSOS no lo declara',
        'agregalo a RECURSOS en build/index_api.mjs con su campo de version y su registro, o sacalo del indice.');
      continue;
    }
    const baseEsperada = BASE_API + CARPETA_INMUTABLE[r.name] + '/';
    if (!inm || inm.base !== baseEsperada || inm.url_pattern !== INMUTABLE_PATTERN || !inm.note) {
      err('E_INDICE_INMUTABLE', r.name + ' no declara su direccion versionada e inmutable: ' + JSON.stringify(inm?.base ?? null),
        'regenera el indice: node build/index_api.mjs. Sin ella, un consumidor que fijo una version no tiene de donde volver a leerla y la direccion viva se le actualiza en silencio (PND-008).');
    } else {
      const esperada = declaradaVersion === undefined ? null : urlInmutable(r.name, declaradaVersion);
      if (esperada && inm.current !== esperada) {
        err('E_INDICE_INMUTABLE', 'el indice dice que la version vigente de ' + r.name + ' vive en ' + JSON.stringify(inm.current) + ' y el archivo declara ' + declaradaVersion,
          'regenera el indice: node build/index_api.mjs. Una direccion inmutable vieja es peor que ninguna: devuelve contenido y no es el que el consumidor pidio.');
      }
      const delRegistro = versionesDelRegistro(declarado);
      if (JSON.stringify(inm.versions) !== JSON.stringify(delRegistro)) {
        err('E_INDICE_INMUTABLE', 'la lista de versiones con direccion de ' + r.name + ' no es la del registro (' + (inm.versions ?? []).length + ' contra ' + delRegistro.length + ')',
          'regenera el indice: node build/index_api.mjs. La lista se extrae del changelog del catalogo del recurso, que es append-only.');
      }
    }
    const cruda = r.version_ledger?.fetch_url;
    const ruta = r.version_ledger?.path;
    if (!ruta || !cruda || !cruda.startsWith(REPO_CRUDO) || !cruda.endsWith(ruta)) {
      err('E_INDICE_REGISTRO_CRUDO', r.name + ' declara el registro de versiones y no la direccion que devuelve el JSON: ' + JSON.stringify(cruda ?? null),
        'regenera el indice: node build/index_api.mjs. La pagina del blob se sirve como HTML, asi que un consumidor que solo tiene `url` tiene que ADIVINAR la cruda, y adivinar una direccion es lo que el anexo prohibe (PND-056).');
    }
  }

  for (const nombre of Object.keys(disco)) {
    if (!listados.has(nombre)) {
      err('E_INDICE_NO_LISTA', 'docs/html/api/' + nombre + ' se publica y el indice no lo lista',
        'agregalo a RECURSOS en build/index_api.mjs. Un archivo publicado que el indice esconde es indescubrible, que es justo el defecto que el indice existe para arreglar.');
    }
  }

  const texto = JSON.stringify(indice);
  const sucios = [...new Set([...texto].filter((c) => c.charCodeAt(0) > 0x7f))];
  if (sucios.length) {
    err('E_INDICE_ASCII', 'el indice tiene ' + sucios.length + ' caracter(es) sobre 0x7F: ' + sucios.join(' '),
      'el nivel de datos es ingles y ASCII puro (D-051). La prosa del metodo, con sus tildes, va en docs/.');
  }
  for (const [camino, v] of cadenas(indice)) {
    if (CAMINO_SIN_PROSA.test(camino.replace(/\[\d+\]/g, ''))) continue;
    if (CASTELLANO.test(v)) {
      err('E_INDICE_IDIOMA', 'el indice tiene texto que se lee como castellano en ' + camino + ': ' + JSON.stringify(v.slice(0, 60)),
        'el nivel de datos es ingles (D-051): no esta traducido, y traducir para el usuario final es trabajo del consumidor.');
    }
  }
  return errores;
}

/* ------------------------------------------------------------------ *
 * Linea de comandos
 * ------------------------------------------------------------------ */

if (esLineaDeComandos(import.meta.url)) {
  const disco = leerDisco();
  const indice = armarIndice(disco);
  const errores = verificarIndice(indice, disco);
  if (errores.length) {
    for (const e of errores) console.error('[' + e.codigo + '] ' + e.que + '\n    arreglo: ' + e.arreglo);
    console.error('\nindice: ' + errores.length + ' error(es). No se publica nada.');
    process.exit(1);
  }
  mkdirSync(DIR, { recursive: true });
  writeFileSync(join(DIR, NOMBRE), JSON.stringify(indice, null, 2) + '\n', 'utf8');
  console.log('api: docs/html/api/index.json (' + indice.resources.length + ' recursos: '
    + indice.resources.map((r) => r.name + ' ' + r.version + '/' + r.content_hash.value.slice(0, 12)).join(', ')
    + '; sin version ni huella propias, D-056)');
}
