// Pieza compartida de las compuertas: lee las fuentes de gates/, extrae del Anexo H
// el enunciado de cada regla (una sola copia del texto, D-044), arma el payload
// publicable y calcula su huella de contenido.
//
// El enunciado publicado sale de la version INGLESA del anexo (D-051: el nivel de
// datos es ingles, porque no es parte del corpus traducido y traducir para el usuario
// final es trabajo del consumidor). La version castellana sigue siendo la fuente de
// verdad del metodo, y el validador exige que las dos lleven las mismas reglas con las
// mismas severidades.
//
// La usan build/gates_validate.mjs, build/gates_api.mjs, build/gates_doc.mjs,
// build/gates_reference.mjs y las pruebas de tests/.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { execFileSync } from 'node:child_process';

export const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

const leer = (rel) => JSON.parse(readFileSync(join(raiz, rel), 'utf8'));

/** Las siete fuentes de gates/, mas el congelado de la base. */
export function cargarFuentes() {
  return {
    catalog: leer('gates/catalog.json'),
    schema: leer('gates/schema.json'),
    evaluators: leer('gates/evaluators.json'),
    steps: leer('gates/steps.json'),
    stations: leer('gates/stations.json'),
    heuristics: leer('gates/heuristics.json'),
    adapters: leer('gates/adapters.json'),
    baseline: leer('gates/baseline.json'),
  };
}

/* ------------------------------------------------------------------ *
 * Extraccion del Anexo H
 * ------------------------------------------------------------------ */

const sinTildes = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
export const idFamilia = (etiqueta) => sinTildes(etiqueta).trim().toLowerCase().replace(/\s+/g, '_');

/** Las dos versiones del anexo: la publicada (en) y la fuente de verdad (es). */
export const ANEXOS = { en: 'docs/en/ANEXO_HEURISTICAS.md', es: 'docs/ANEXO_HEURISTICAS.md' };

// Heuristica deliberada, y por eso escrita: palabras castellanas frecuentes como palabra
// entera. No detecta idioma, detecta descuido, que es lo que hace falta en el nivel de
// datos (D-051). Una sola copia, usada por la prueba de idioma y por el verificador del
// indice de la API.
export const CASTELLANO = /\b(que|el|la|los|las|del|para|con|una|por|como|cada|sin|esta|tiene|hay|nunca|siempre|todo|toda|su|al|lo|ni|mas|pero|donde|cuando|porque|regla|reglas|motivo|autoriza|revisar|dueno|anexo|peldano|peldanos|compuerta|rojo|verde|archivo|perfil)\b/i;

/**
 * Lee UNA version del anexo y devuelve, por id de regla, lo que declara: el enunciado,
 * la familia, el instrumento tal como lo escribe la tabla y el token de severidad. Es la
 * UNICA fuente del texto; nadie lo transcribe.
 *
 * Las tablas tienen dos formas:
 *   calidad     | id | Familia | Enunciado | Verifica | Severidad |
 *   usabilidad  | id | Enunciado | Verifica | Severidad |     (la familia es el titulo B1..B5)
 */
export function leerAnexo(texto) {
  const reglas = new Map();
  const problemas = [];
  let familiaUX = null;
  for (const linea of texto.split(/\r?\n/)) {
    const titulo = /^###\s+(B\d)\s/.exec(linea);
    if (titulo) { familiaUX = titulo[1]; continue; }
    if (!/^\|\s*(CQ|UX)-\d\d\s*\|/.test(linea)) continue;
    const celdas = linea.replace(/^\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim());
    const id = celdas[0];
    if (reglas.has(id)) { problemas.push(id + ': aparece dos veces en el anexo'); continue; }
    if (id.startsWith('CQ-')) {
      if (celdas.length !== 5) { problemas.push(id + ': la fila de calidad tiene ' + celdas.length + ' celdas, se esperaban 5'); continue; }
      reglas.set(id, { id, familia: idFamilia(celdas[1]), familia_label: celdas[1], enunciado: celdas[2], verifica: celdas[3], severidad_token: celdas[4] });
    } else {
      if (celdas.length !== 4) { problemas.push(id + ': la fila de usabilidad tiene ' + celdas.length + ' celdas, se esperaban 4'); continue; }
      if (!familiaUX) { problemas.push(id + ': no hay titulo B1..B5 antes de la fila'); continue; }
      reglas.set(id, { id, familia: idFamilia(familiaUX), familia_label: familiaUX, enunciado: celdas[1], verifica: celdas[2], severidad_token: celdas[3] });
    }
  }
  return { reglas, problemas };
}

/**
 * Las dos versiones juntas. `reglas` es la inglesa (la que se publica) y `canonico` la
 * castellana (la fuente de verdad, contra la que el validador contrasta).
 */
export function extraerAnexo(textoEn, textoEs) {
  const en = leerAnexo(textoEn ?? readFileSync(join(raiz, ANEXOS.en), 'utf8'));
  const es = leerAnexo(textoEs ?? readFileSync(join(raiz, ANEXOS.es), 'utf8'));
  return { reglas: en.reglas, problemas: en.problemas, idioma: 'en', canonico: { ...es, idioma: 'es' } };
}

/* ------------------------------------------------------------------ *
 * El payload publicable
 * ------------------------------------------------------------------ */

/** Las reglas con su enunciado ya resuelto contra el anexo. */
export function reglasConEnunciado(fuentes, anexo) {
  const idioma = fuentes.heuristics.statement_source.published_language;
  return fuentes.heuristics.rules.map((r) => {
    const a = anexo.reglas.get(r.id);
    return {
      ...r,
      statement: {
        ...r.statement,
        language: idioma,
        text: a ? a.enunciado : null,
        extracted: Boolean(a),
        family_label: a ? a.familia_label : null,
        verification_label: a ? a.verifica : null,
      },
    };
  });
}

/* ------------------------------------------------------------------ *
 * Los enums que la configuracion de proyecto nombra
 * ------------------------------------------------------------------ *
 * Un campo de la configuracion de proyecto que dice "uno de <enum>" tiene que poder
 * resolverse CONTRA EL PUBLICADO, porque el consumidor no tiene las fuentes delante. Y la
 * lista no se transcribe: vive una sola vez en gates/schema.json#enums y el bloque
 * publicado se DERIVA de ahi, para que no haya dos copias que puedan divergir (la misma
 * regla que el enunciado de las reglas del anexo, D-044).
 * Nacio medido el 2026-10-27: el campo decia "One of communication_depth" y ninguna clave
 * del publicado llevaba ese nombre (PND-059).
 */
export const RE_ENUM_DE_CONFIGURACION = /`project_config\.enums\.([a-z][a-z0-9_]*)`/g;

/** Los nombres de enum que los campos de la configuracion de proyecto nombran, en orden. */
export function enumsNombradosPorLaConfiguracion(schema) {
  const nombres = [];
  for (const texto of Object.values(schema.project_config.fields)) {
    if (typeof texto !== 'string') continue;
    for (const m of texto.matchAll(RE_ENUM_DE_CONFIGURACION)) {
      if (!nombres.includes(m[1])) nombres.push(m[1]);
    }
  }
  return nombres;
}

/** El bloque publicado: cada enum nombrado, con su lista sacada de schema.enums. */
export function enumsDeLaConfiguracion(schema) {
  const out = {};
  for (const nombre of enumsNombradosPorLaConfiguracion(schema)) {
    if (nombre in (schema.enums ?? {})) out[nombre] = schema.enums[nombre];
  }
  return out;
}

/** Lo que se publica, sin la metadata de publicacion (eso lo pone gates_api). */
export function armarContenido(fuentes = cargarFuentes(), anexo = extraerAnexo()) {
  const reglas = reglasConEnunciado(fuentes, anexo);
  return {
    // `what` y `counts` viven ACA y no en el armado del archivo porque desde la version
    // 2026.10.6 los cubre la huella (PND-010): un resumen de cantidades que puede mentir es peor
    // que no tener resumen --una herramienta que lo usa para comprobar que termino de leer
    // aceptaria en silencio un archivo truncado-- y `what` es justo donde el archivo declara el
    // alcance de su propia proteccion. Lo que la huella cubre tiene que estar en el contenido
    // que se canonicaliza, no agregado despues.
    what: 'The mechanical definition of the gates of the Urazuke method, published as data. The method owns it; a tool consumes it. Whatever an installation cannot measure is reported as declared and not measured, never as green.',
    counts: {
      steps: fuentes.steps.steps.length,
      stations: fuentes.stations.stations.length,
      rules: reglas.length,
      evaluators: fuentes.evaluators.evaluators.length,
    },
    schema_version: fuentes.catalog.schema_version,
    catalog_version: fuentes.catalog.catalog_version,
    languages: fuentes.catalog.languages,
    evaluators: fuentes.evaluators.evaluators,
    evaluator_semantics: fuentes.evaluators.semantics,
    compatibility: fuentes.schema.compatibility,
    tramos: fuentes.steps.tramos,
    steps: fuentes.steps.steps,
    stations: fuentes.stations.stations,
    loop_entry: fuentes.stations.loop_entry,
    heuristics: { ...fuentes.heuristics, rules: reglas },
    adapters: fuentes.adapters,
    // Los enums que los campos nombran viajan RESUELTOS en el publicado (PND-059): el
    // consumidor no tiene las fuentes, y un campo que dice "uno de X" sin X publicada obliga
    // a adivinar la lista. Se derivan de schema.enums, que sigue siendo la unica copia.
    project_config: { ...fuentes.schema.project_config, enums: enumsDeLaConfiguracion(fuentes.schema) },
    // El contrato de fijacion (D-068): que version congela un proyecto, con que par la congela,
    // que le exige al consumidor y como se computa el diferencial de un upgrade. Va cubierto por
    // la huella porque lleva requisitos: una copia congelada alterada ahi cambiaria lo que el
    // proyecto cree que debe.
    pinning: fuentes.schema.pinning,
  };
}

/* ------------------------------------------------------------------ *
 * La huella de contenido
 * ------------------------------------------------------------------ *
 * Receta, para que cualquier implementacion llegue al mismo numero:
 *   1. tomar SOLO los campos de hash_covers (gates/schema.json)
 *   2. ordenar las claves de todo objeto por punto de codigo, recursivamente
 *      (los arreglos conservan su orden declarado)
 *   3. serializar a JSON sin espacios opcionales, en UTF-8
 *   4. sha256, hexadecimal minuscula
 * Lo que queda afuera es metadata de publicacion: si entrara, cada regeneracion
 * cambiaria la huella sin que cambie una sola regla.
 */
export function canonicalizar(valor) {
  if (Array.isArray(valor)) return valor.map(canonicalizar);
  if (valor && typeof valor === 'object') {
    const salida = {};
    for (const clave of Object.keys(valor).sort()) salida[clave] = canonicalizar(valor[clave]);
    return salida;
  }
  return valor;
}

export function huellaDeContenido(contenido, cubre) {
  const recortado = {};
  for (const clave of cubre) if (clave in contenido) recortado[clave] = contenido[clave];
  const faltan = cubre.filter((c) => !(c in contenido));
  if (faltan.length) throw new Error('la huella no puede calcularse: faltan campos cubiertos: ' + faltan.join(', '));
  return createHash('sha256').update(JSON.stringify(canonicalizar(recortado)), 'utf8').digest('hex');
}

/* ------------------------------------------------------------------ *
 * La proyeccion a la base (para el test de diferencia cero)
 * ------------------------------------------------------------------ */

const esDeLaBase = (x) => !(x && typeof x === 'object' && 'since_schema' in x && x.since_schema > 1);

function artefactoBase(a) {
  const { since_schema, ...resto } = a;
  return resto;
}

/** Devuelve el paso tal como lo tenia la base (schema 1), para comparar byte a byte. */
export function proyectarPasoABase(paso) {
  const base = paso.evaluators.filter((e) => e.since_schema === 1);
  if (base.length !== 1) throw new Error(paso.id + ': la base tenia exactamente un evaluador, hay ' + base.length);
  const salida = {
    num: paso.num, id: paso.id,
  };
  if ('tramo' in paso) salida.tramo = paso.tramo;
  salida.title = paso.title;
  salida.summary = paso.summary;
  if ('form' in paso) { salida.form = paso.form; salida.mandatory = paso.mandatory; }
  salida.prompt_key = paso.prompt_key;
  if ('prompt_indexes' in paso) salida.prompt_indexes = paso.prompt_indexes;
  if ('inputs' in paso) salida.inputs = paso.inputs.filter(esDeLaBase).map(artefactoBase);
  salida.artifacts = paso.artifacts.filter(esDeLaBase).map(artefactoBase);
  salida.verify = paso.verify.filter((v) => typeof v === 'string');
  salida.evaluator = base[0].name;
  return salida;
}

export function gitCommitCorto() {
  try { return execFileSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: raiz, encoding: 'utf8' }).trim(); }
  catch { return null; }
}

/**
 * ?Se llamo a este modulo desde la linea de comandos?
 *
 * Existe porque el idiom que habia antes en los tres programas que tienen modo de
 * linea de comandos -- comparar import.meta.url contra 'file:///' pegado adelante de
 * argv[1] con las barras invertidas dadas vuelta -- SOLO acierta en Windows. En POSIX
 * argv[1] ya empieza con una barra, asi que la concatenacion da 'file:////home/...'
 * (cuatro barras) contra 'file:///home/...' y nunca es igual: el bloque no entra, el
 * programa define sus exports y sale con exito. Medido en la corrida 39956832685 de
 * ubuntu-latest: dos pasos de la cadena imprimieron CERO lineas y devolvieron verde.
 * Un verde vacuo, en el mismo repositorio que ya tiene escrito que un verde con cero
 * pruebas no es un verde.
 *
 * `ruta` se recibe por argumento, y no se lee process.argv adentro, para que la prueba
 * pueda ejercitar las dos plataformas corriendo en cualquiera de las dos: un verde en
 * Windows no vuelve a tapar un no-op en Linux.
 */
export function esLineaDeComandos(urlDelModulo, ruta = process.argv[1] ?? '') {
  if (!ruta) return false;
  const cola = (s) => s.replace(/^file:[/]+/, '').replace(/\\/g, '/').replace(/^[/]+/, '');
  const url = cola(urlDelModulo);
  // La ruta viene como la escribio el sistema operativo; import.meta.url viene con los
  // caracteres raros escapados (un espacio es %20). Se compara contra las dos formas.
  let suelta = url;
  try { suelta = decodeURIComponent(url); } catch { /* un '%' literal: queda como esta */ }
  const suya = cola(ruta);
  return suya === url || suya === suelta;
}
