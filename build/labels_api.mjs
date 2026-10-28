// El catalogo de textos por identificador, en los idiomas de la prosa (PND-011, D-074).
//
// Que estaba mal, con las palabras del auditor del 2026-10-24. El archivo de compuertas le
// dice al consumidor, y con razon, "no imprimas estos textos, lee el identificador estable
// y saca el texto de tu propio catalogo" (languages.text_language.consumer). Y el metodo no
// le daba ningun catalogo: lo unico legible por maquina era justo lo que le pedia no
// imprimir. La instruccion era correcta y no se podia cumplir, asi que lo que en la
// practica dejaba era que cada herramienta se escribiera sus propias traducciones de los
// titulos del metodo -- veinticuatro peldanos traducidos ocho veces en cada consumidor, sin
// que nadie pueda decir cual de las copias es la del metodo.
//
// Lo que esto hace, y lo que NO. Esto no traduce nada: las traducciones ya existen en la
// prosa del metodo, en los ocho idiomas que declara. Es una EXTRACCION, el mismo mecanismo
// que ya usa el enunciado de las reglas del Anexo H, aplicado a los titulos. Ni una cadena
// se escribe aca ni se transcribe: si el texto no esta en la prosa, esto se pone en rojo y
// no se publica nada. Una sola copia de cada texto es la regla del repositorio, y un
// catalogo de textos es el lugar donde romperla seria mas facil y mas dificil de ver.
//
// Lo que entra, medido sobre el arbol y no estimado: 24 titulos de peldano, 8 titulos de
// estacion y 46 enunciados de regla, en 8 idiomas. Lo que queda afuera entra en `scope`
// del publicado, con su razon y con la medicion que la sostiene, porque una ausencia que
// no se enumera se lee como un olvido (D-064).
//
// La forma: UN recurso y no ocho. El auditor propuso un archivo por idioma, y esa forma
// pedia ocho lineas de version declarada. Pero el metodo ya se obliga a replicar un cambio
// del castellano en las siete traducciones EN EL MISMO COMMIT (D-013): las ocho se mueven
// juntas, siempre, asi que ocho lineas de version serian ocho copias de un solo hecho --
// exactamente lo que este repositorio persigue. Una linea, un recurso, y el consumidor que
// quiere un idioma lee una clave.
//
// Es UTF-8 y NO ASCII puro, igual que el corpus de prompts y por la misma razon: el texto
// de la prosa viaja tal cual, con sus tildes y su puntuacion tipografica. Lo que si es
// ingles y ASCII (D-051) es todo lo que este archivo dice SOBRE los textos: `what`,
// `scope`, las notas. Un campo que explica el dato es nivel de datos; un texto extraido de
// la prosa es prosa.
//
// Las comprobaciones son funciones PURAS -- reciben los textos y devuelven hallazgos, no
// leen el disco -- para que la prueba en rojo pueda alimentarlas con un arbol mutilado y
// exigir que caigan. Una guarda que nadie vio caer no demuestra que guarde nada, y en este
// proyecto ya paso cuatro veces.
// Uso: node build/labels_api.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { raiz, leerAnexo, huellaDeContenido, gitCommitCorto, esLineaDeComandos, ALCANCE_DE_LA_HUELLA } from './gates_lib.mjs';
import { dirDe } from './anexo_simetria.mjs';

export const DIR = join(raiz, 'docs', 'html', 'api');
export const NOMBRE = 'labels.json';
export const CATALOGO = join('labels', 'catalog.json');

// El separador de los encabezados de la prosa. Es la raya de los titulos -- "Peldano 0 — ..."
// , "### N0 — ..." -- y viaja IDENTICA en los ocho idiomas, incluido el japones y el chino:
// medido sobre los 24 encabezados de los 8 idiomas, cero sin raya. Por eso el titulo se
// parte por la raya y no por la palabra "Peldano", que esta en ocho idiomas distintos.
export const RAYA = '—';

/**
 * Los idiomas de la prosa, de donde el metodo los declara UNA sola vez: el catalogo de
 * compuertas (D-067). No se vuelve a escribir la lista aca, que es el defecto que esa
 * decision arreglo.
 */
export function idiomasDeclarados(base = raiz) {
  const catalogo = JSON.parse(readFileSync(join(base, 'gates', 'catalog.json'), 'utf8'));
  return catalogo.languages.prose_versions;
}

/** El titulo de un encabezado "<cualquier cosa> — <titulo>". null si no lleva raya. */
export function tituloDeEncabezado(linea) {
  const i = linea.indexOf(RAYA);
  if (i < 0) return null;
  return linea.slice(i + RAYA.length).trim() || null;
}

/* ------------------------------------------------------------------ *
 * La extraccion, pura
 * ------------------------------------------------------------------ */

/**
 * Los titulos de peldano del documento principal, por id del dato. La ficha se encuentra
 * por la CITA del contrato (`peldanos/peldano-NN-`), que esta byte a byte igual en los ocho
 * idiomas: no hace falta saber como se dice "Peldano" en ocho idiomas.
 */
export function titulosDePeldanos(textoPrincipal, pasos) {
  const encabezados = new Map();
  for (const trozo of (textoPrincipal ?? '').replace(/\r\n/g, '\n').split(/^### /m)) {
    const cita = /peldanos\/peldano-(\d\d)-/.exec(trozo);
    if (cita) encabezados.set(Number(cita[1]), trozo.split('\n')[0].trim());
  }
  const textos = {};
  const hallazgos = [];
  for (const paso of pasos) {
    const encabezado = encabezados.get(paso.num);
    if (encabezado === undefined) { hallazgos.push(paso.id + ': no se encontro la ficha del peldano ' + paso.num); continue; }
    const titulo = tituloDeEncabezado(encabezado);
    if (!titulo) { hallazgos.push(paso.id + ': la ficha no lleva la raya del titulo: ' + JSON.stringify(encabezado.slice(0, 60))); continue; }
    textos[paso.id] = titulo;
  }
  return { textos, hallazgos };
}

/**
 * Los titulos de estacion del camino evolutivo-correctivo, por id del dato. Se encuentran
 * por el token `N<n>`, que tampoco se traduce.
 */
export function titulosDeEstaciones(textoEvolutivo, estaciones) {
  const encabezados = new Map();
  for (const linea of (textoEvolutivo ?? '').split(/\r?\n/)) {
    const m = /^###\s+N(\d)\s/.exec(linea);
    if (m) encabezados.set(Number(m[1]), linea.replace(/^###\s+/, '').trim());
  }
  const textos = {};
  const hallazgos = [];
  for (const estacion of estaciones) {
    const encabezado = encabezados.get(estacion.num);
    if (encabezado === undefined) { hallazgos.push(estacion.id + ': no se encontro el encabezado de la estacion N' + estacion.num); continue; }
    const titulo = tituloDeEncabezado(encabezado);
    if (!titulo) { hallazgos.push(estacion.id + ': el encabezado no lleva la raya del titulo: ' + JSON.stringify(encabezado.slice(0, 60))); continue; }
    textos[estacion.id] = titulo;
  }
  return { textos, hallazgos };
}

/**
 * Los enunciados de las reglas del Anexo H, por id. Usa el MISMO lector que ya extrae el
 * enunciado ingles para el archivo de compuertas: una sola implementacion.
 *
 * Y exige las dos direcciones. Que a un idioma le falte una regla es un hallazgo; que un
 * idioma traiga una regla que el dato no tiene, tambien. Lo segundo es lo que atrapa a una
 * traduccion que quedo con una fila vieja: hasta hoy el validador contrastaba el anexo
 * castellano contra el ingles y los otros seis no los miraba nadie.
 */
export function enunciadosDeReglas(textoAnexo, reglas) {
  const leido = leerAnexo(textoAnexo ?? '');
  const textos = {};
  const hallazgos = leido.problemas.map((p) => 'el anexo no se pudo leer: ' + p);
  const esperados = new Set(reglas.map((r) => r.id));
  for (const r of reglas) {
    const fila = leido.reglas.get(r.id);
    if (!fila) { hallazgos.push(r.id + ': la regla no esta en el anexo de este idioma'); continue; }
    if (!fila.enunciado) { hallazgos.push(r.id + ': la fila del anexo no trae enunciado'); continue; }
    textos[r.id] = fila.enunciado;
  }
  for (const id of leido.reglas.keys()) {
    if (!esperados.has(id)) hallazgos.push(id + ': el anexo de este idioma trae una regla que el dato no tiene');
  }
  return { textos, hallazgos };
}

/**
 * Un idioma entero. `textos` son los tres documentos de ese idioma ya leidos; `dato` son
 * los peldanos, las estaciones y las reglas del dato. No lee disco a proposito.
 */
export function armarUnIdioma(textos, dato) {
  const peldanos = titulosDePeldanos(textos.principal, dato.pasos);
  const estaciones = titulosDeEstaciones(textos.evolutivo, dato.estaciones);
  const reglas = enunciadosDeReglas(textos.anexo, dato.reglas);
  return {
    labels: { steps: peldanos.textos, stations: estaciones.textos, rules: reglas.textos },
    hallazgos: [
      ...peldanos.hallazgos.map((h) => 'steps/' + h),
      ...estaciones.hallazgos.map((h) => 'stations/' + h),
      ...reglas.hallazgos.map((h) => 'rules/' + h),
    ],
  };
}

/* ------------------------------------------------------------------ *
 * El arbol
 * ------------------------------------------------------------------ */

export const DOCUMENTOS = {
  principal: 'ESCALERA_METODOLOGICA.md',
  evolutivo: 'EVOLUTIVO_CORRECTIVO.md',
  anexo: 'ANEXO_HEURISTICAS.md',
};

/** El dato: los ids con sus numeros, de las fuentes de las compuertas. */
export function leerDato(base = raiz) {
  const de = (n) => JSON.parse(readFileSync(join(base, 'gates', n), 'utf8'));
  return {
    pasos: de('steps.json').steps.map((p) => ({ id: p.id, num: p.num })),
    estaciones: de('stations.json').stations.map((e) => ({ id: e.id, num: e.num })),
    reglas: de('heuristics.json').rules.map((r) => ({ id: r.id })),
  };
}

/**
 * Los tres documentos de un idioma. Un documento que no se pudo leer NO es un salteo: se
 * devuelve como null y la comprobacion lo reporta como hallazgo, por la misma razon que en
 * el resto del repositorio -- no haber podido mirar es rojo y no verde.
 */
export function leerTextos(idioma) {
  const salida = {};
  for (const [clave, archivo] of Object.entries(DOCUMENTOS)) {
    try { salida[clave] = readFileSync(join(dirDe(idioma), archivo), 'utf8').replace(/\r\n/g, '\n'); }
    catch { salida[clave] = null; }
  }
  return salida;
}

/* ------------------------------------------------------------------ *
 * El payload publicable
 * ------------------------------------------------------------------ */

const WHAT = 'The texts of the Urazuke method by stable identifier, in the languages its prose is published in. It exists because the gate catalogue tells a consumer not to print its texts and to take them from its own catalogue instead, and until this resource there was no catalogue to take them from: the instruction was right and impossible to obey, so every tool ended up writing its own translations of the titles of the method. Nothing here is translated by this file. Every string is EXTRACTED from the prose of the method, which already carries the translations; if a text is not in the prose, publication is refused instead of inventing it. Read the opaque id from the gate catalogue and look it up here under the language you are rendering for. ' + ALCANCE_DE_LA_HUELLA;

const KEYED_BY = 'labels.<language>.<kind>.<id>, where <language> is one of the entries of `languages.published`, <kind> is one of steps, stations or rules, and <id> is the opaque identifier the gate catalogue declares for that node. The ids are the key, not the order: they are append-only and never renamed.';

const SCOPE = {
  included: [
    { kind: 'steps', what: 'The title of each of the steps of the ladder.', source: 'The heading of the step card in the main document of each language.' },
    { kind: 'stations', what: 'The title of each of the normalisation stations.', source: 'The heading of each station in the evolutionary-corrective path of each language.' },
    { kind: 'rules', what: 'The statement of each rule of Annex H.', source: 'The row of each rule in Annex H of each language, read with the same extractor that resolves the English statement published in the gate catalogue.' },
  ],
  excluded: [
    {
      kind: 'the evaluator vocabulary',
      why: 'The description of what an evaluator checks is written at the data layer, in English, and is not part of the translated corpus (D-051). There is no prose source for it in the other languages, so publishing it translated would mean writing new text here, and a catalogue of texts is exactly where inventing one is easiest to do and hardest to see.',
      measured: 'Twelve evaluator names, each with one English description and no other language.',
    },
    {
      kind: 'the verification questions of a step',
      why: 'The questions the data declares for a step and the ones the prose of its contract lists are not the same list, so matching them by position would mislabel them. Translating them here instead of extracting them would make this file a second copy of the method, which is the thing it exists to prevent.',
      measured: 'Counted over the twenty-four steps of the Spanish prose on 2026-10-28: zero of twenty-four carry the same number of items in the data and in the contract, and the prose is the longer one in every single step.',
    },
  ],
};

const LANGUAGES_NOTE = 'The languages this file publishes are the languages the PROSE of the method is published in, declared once in the gate catalogue and derived here instead of listed again. The reading interface of the method is published in more languages than its prose, and that difference is a known open item of the method, not a defect of this file: a language whose prose does not exist has no text to extract, and inventing it is what this file refuses to do. Ask for a language that is not published here and there is nothing to fall back to; render in one that is.';

/** El payload, armado de lo que la prosa dice. Devuelve tambien los hallazgos. */
export function armarContenido(idiomas, textosPorIdioma, dato, catalogo) {
  const labels = {};
  const hallazgos = [];
  for (const idioma of idiomas) {
    const textos = textosPorIdioma[idioma] ?? {};
    for (const [clave, archivo] of Object.entries(DOCUMENTOS)) {
      if (textos[clave] == null) hallazgos.push(idioma + '/' + archivo + ': no se pudo leer');
    }
    const uno = armarUnIdioma(textos, dato);
    labels[idioma] = uno.labels;
    for (const h of uno.hallazgos) hallazgos.push(idioma + '/' + h);
  }
  const porIdioma = dato.pasos.length + dato.estaciones.length + dato.reglas.length;
  return {
    hallazgos,
    contenido: {
      what: WHAT,
      labels_version: catalogo.labels_version,
      counts: {
        languages: idiomas.length,
        ids_per_language: porIdioma,
        steps: dato.pasos.length,
        stations: dato.estaciones.length,
        rules: dato.reglas.length,
        strings: idiomas.length * porIdioma,
      },
      keyed_by: KEYED_BY,
      scope: SCOPE,
      languages: { published: idiomas, note: LANGUAGES_NOTE },
      labels,
    },
  };
}

/**
 * Las guardas de identidad, las mismas que el corpus de prompts y por las mismas razones
 * (D-053): ninguna clave del publicado en el limbo --ni cubierta ni excluida de la huella,
 * que es viajar sin proteccion--, y el contenido tiene que ser el que la version declarada
 * tiene REGISTRADO. Esto ultimo es lo que obliga a subir la version en vez de confiar en
 * que alguien se acuerde: dos contenidos distintos bajo una misma version declarada dejan
 * ilegible lo que un proyecto congelo.
 */
export function verificar(salida, catalogo, valor) {
  const errores = [];
  const esquema = catalogo.version_scheme;
  const cubiertas = new Set(esquema.hash_covers);
  const excluidas = new Set(esquema.hash_excludes);
  for (const clave of cubiertas) {
    if (excluidas.has(clave)) errores.push('E_HUELLA: la clave ' + clave + ' esta a la vez cubierta y excluida de la huella. Decide: o viaja protegida, o es metadata de publicacion.');
  }
  for (const clave of Object.keys(salida)) {
    if (!cubiertas.has(clave) && !excluidas.has(clave)) {
      errores.push('E_HUELLA: la clave ' + clave + ' del publicado no esta ni cubierta ni excluida de la huella (labels/catalog.json). Una clave en el limbo viaja sin proteccion: una copia congelada alterada ahi seguiria coincidiendo.');
    }
  }
  if (!Array.isArray(catalogo.changelog) || !catalogo.changelog.length) {
    errores.push('E_VERSION: labels/catalog.json no tiene changelog: cada version publicada deja su entrada con la huella que produjo.');
    return errores;
  }
  const versiones = catalogo.changelog.map((c) => c.labels_version);
  if (new Set(versiones).size !== versiones.length) errores.push('E_VERSION: hay dos entradas del changelog con la misma labels_version. Una version es un contenido, y uno solo.');
  const ultima = catalogo.changelog[catalogo.changelog.length - 1];
  if (ultima.labels_version !== catalogo.labels_version) {
    errores.push('E_VERSION: la version declarada es ' + catalogo.labels_version + ' y la ultima entrada del changelog dice ' + ultima.labels_version + '. La ultima entrada es la version que se publica.');
  }
  const entrada = catalogo.changelog.find((c) => c.labels_version === catalogo.labels_version);
  if (!entrada) errores.push('E_VERSION: la version declarada ' + catalogo.labels_version + ' no tiene entrada en el changelog.');
  else if (entrada.content_hash !== valor) {
    errores.push('E_VERSION: el contenido no es el que la version ' + entrada.labels_version + ' tiene registrado.\n'
      + '    registrada: ' + entrada.content_hash + '\n'
      + '    calculada:  ' + valor + '\n'
      + '    arreglo: cambio la prosa de la que salen estos textos. Subi labels_version y agrega la entrada nueva con la huella calculada, o volve atras el cambio.\n'
      + '    Dos contenidos distintos bajo una misma version declarada dejan ilegible lo que un proyecto congelo.');
  }
  return errores;
}

/** Todo junto: lo que se publicaria, su catalogo, su huella y los hallazgos de la prosa. */
export function armarPublicado() {
  const catalogo = JSON.parse(readFileSync(join(raiz, CATALOGO), 'utf8'));
  const idiomas = idiomasDeclarados();
  const dato = leerDato();
  const textosPorIdioma = Object.fromEntries(idiomas.map((i) => [i, leerTextos(i)]));
  const { contenido, hallazgos } = armarContenido(idiomas, textosPorIdioma, dato, catalogo);
  // La receta --algoritmo, codificacion, forma canonica-- vive UNA sola vez, en el esquema
  // de las compuertas, y el catalogo de este recurso declara solo que claves cubre: el
  // payload es otro. La misma division que el corpus de prompts.
  const receta = JSON.parse(readFileSync(join(raiz, 'gates', 'schema.json'), 'utf8')).version_scheme;
  const esquema = catalogo.version_scheme;
  const valor = huellaDeContenido(contenido, esquema.hash_covers);
  const salida = {
    what: contenido.what,
    labels_version: contenido.labels_version,
    content_hash: {
      algo: receta.hash_algo,
      encoding: receta.hash_encoding,
      canonical_form: receta.canonical_form,
      covers: esquema.hash_covers,
      excludes: esquema.hash_excludes,
      value: valor,
      note: 'Recompute it over the canonicalised payload and compare. If you only read it, a frozen copy edited by hand or truncated by a merge is undetectable.',
    },
    git_commit: gitCommitCorto(),
    git_commit_note: 'Informative. It is the sha of the change BEFORE the one that contains this file, because it is computed before saving: it is not the identity of what is published and no comparison looks at it.',
    generated_at: new Date().toISOString(),
    source: 'https://github.com/pkuschnirof/urazuke',
    license: 'CC BY-SA 4.0',
    ...contenido,
  };
  return { salida, catalogo, valor, hallazgos };
}

/* ------------------------------------------------------------------ *
 * Linea de comandos
 * ------------------------------------------------------------------ */

if (esLineaDeComandos(import.meta.url)) {
  const { salida, catalogo, valor, hallazgos } = armarPublicado();
  if (hallazgos.length) {
    for (const h of hallazgos) console.error('  ' + h);
    console.error('\nlabels: ' + hallazgos.length + ' identificador(es) sin texto en la prosa. No se publica nada.');
    console.error('    arreglo: el texto se EXTRAE, no se escribe aca. Agregalo a la prosa del idioma que lo pide.');
    process.exit(1);
  }
  const errores = verificar(salida, catalogo, valor);
  if (errores.length) {
    for (const e of errores) console.error('[' + e);
    console.error('\nlabels: ' + errores.length + ' error(es). No se publica nada.');
    process.exit(1);
  }
  mkdirSync(DIR, { recursive: true });
  writeFileSync(join(DIR, NOMBRE), JSON.stringify(salida, null, 2) + '\n', 'utf8');
  console.log('api: docs/html/api/labels.json (catalogo ' + salida.labels_version + ', '
    + salida.counts.languages + ' idiomas x ' + salida.counts.ids_per_language + ' ids = '
    + salida.counts.strings + ' textos extraidos, huella ' + valor.slice(0, 12) + ')');
}
