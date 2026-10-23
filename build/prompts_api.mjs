// Publica los prompts del método como una API estática en JSON, para que una
// herramienta (Forge, o cualquier otra) los tome del sitio en vez de copiarlos a mano.
//
// La identidad de lo publicado es la misma que la de las compuertas (D-050, D-053):
// `corpus_version` la declara el método a mano en prompts/catalog.json, y el archivo
// viaja con una huella de contenido que el consumidor RECALCULA sobre el payload
// canonicalizado. El sha de git queda informativo: se calcula antes de guardar, así que
// siempre nombra al cambio ANTERIOR al que lo contiene, y no sirve para congelar nada.
//
// Salida: docs/html/api/prompts.json
//   {
//     "corpus_version": "2026.10.1",
//     "content_hash": { "algo": "sha256", "value": "...", "covers": [...], ... },
//     "version": "<sha corto, informativo>", "generated_at": "<ISO>",
//     "language": "en", "languages": { ... },
//     "contracts": { "peldano-00": ["..."], ..., "anexo-h": [...] },
//     "steps": [ { "num": 0, "key": "peldano-00", "title": "..." }, ... ],
//     "count": 72
//   }
// Los prompts son los mismos que prompts/*.en.md (una sola pieza en inglés, idéntica en
// las ocho versiones); build.mjs corre este script después de verificarlos. Los títulos
// de peldaño salen de los contratos INGLESES (docs/en/peldanos/), porque esto es dato de
// herramienta y el nivel de datos se publica en inglés (D-051).
//
// Antes de escribir, verifica: si la huella no es la que la versión declarada tiene
// registrada, no se publica nada y el error dice qué huella hay que registrar.
// Uso: node build/prompts_api.mjs
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { raiz, huellaDeContenido, gitCommitCorto } from './gates_lib.mjs';

const dirPrompts = join(raiz, 'prompts');
const dirContratos = join(raiz, 'docs', 'en', 'peldanos');
const leerJson = (...p) => JSON.parse(readFileSync(join(raiz, ...p), 'utf8'));

function extraer(md) {
  return md.split(/^## Prompt \d+\s*$/m).slice(1).map((p) => p.replace(/\s+/g, ' ').trim());
}

/** Lo que la huella cubre: el corpus, y nada de la metadata de publicación. */
export function armarContenido() {
  const catalogo = leerJson('prompts', 'catalog.json');
  const contracts = {};
  let count = 0;
  for (const f of readdirSync(dirPrompts).filter((n) => n.endsWith('.en.md')).sort()) {
    const key = f.replace(/\.en\.md$/, '');
    contracts[key] = extraer(readFileSync(join(dirPrompts, f), 'utf8'));
    count += contracts[key].length;
  }
  // El título viene del contrato inglés. Si uno pierde su encabezado, el peldaño NO se
  // publica a medias: la lista queda corta y la guarda de la línea de comandos lo frena.
  const steps = [];
  for (const f of readdirSync(dirContratos).filter((n) => /^peldano-\d\d-.*\.md$/.test(n)).sort()) {
    const m = /^# Step (\d+) — (.*?) \(step contract/m.exec(readFileSync(join(dirContratos, f), 'utf8'));
    if (m) steps.push({ num: Number(m[1]), key: 'peldano-' + f.slice(8, 10), title: m[2] });
  }
  const contenido = {
    corpus_version: catalogo.corpus_version,
    language: 'en',
    languages: {
      prompts: 'en',
      step_titles: 'en',
      decision: 'D-051',
      note: 'The prompts are ONE English piece, identical in the eight versions of the method (D-013): that is what makes them comparable. The step titles come from the English contracts (docs/en/peldanos/), because this file is tool data and the data layer is published in English. The file is UTF-8 and NOT pure ASCII: the prompt text travels verbatim, typographic punctuation included.',
      consumer: 'Do not print `title` to an end user. Read the opaque `key` and `num` -- they are never translated -- and take your display text from your own catalogue, in the language of your reader.',
    },
    contracts,
    steps,
    count,
  };
  return { catalogo, contenido };
}

/** Las guardas que corren ANTES de escribir. Devuelve la lista de errores. */
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
      errores.push('E_HUELLA: la clave ' + clave + ' del publicado no esta ni cubierta ni excluida de la huella (prompts/catalog.json). Una clave en el limbo viaja sin proteccion: una copia congelada alterada ahi seguiria coincidiendo.');
    }
  }
  if (!Array.isArray(catalogo.changelog) || !catalogo.changelog.length) {
    errores.push('E_VERSION: prompts/catalog.json no tiene changelog: cada version publicada deja su entrada con la huella que produjo.');
    return errores;
  }
  const versiones = catalogo.changelog.map((c) => c.corpus_version);
  if (new Set(versiones).size !== versiones.length) errores.push('E_VERSION: hay dos entradas del changelog con la misma corpus_version. Una version es un contenido, y uno solo.');
  const ultima = catalogo.changelog[catalogo.changelog.length - 1];
  if (ultima.corpus_version !== catalogo.corpus_version) {
    errores.push('E_VERSION: la version declarada es ' + catalogo.corpus_version + ' y la ultima entrada del changelog dice ' + ultima.corpus_version + '. La ultima entrada es la version que se publica.');
  }
  const entrada = catalogo.changelog.find((c) => c.corpus_version === catalogo.corpus_version);
  if (!entrada) errores.push('E_VERSION: la version declarada ' + catalogo.corpus_version + ' no tiene entrada en el changelog.');
  else if (entrada.content_hash !== valor) {
    errores.push('E_VERSION: el contenido no es el que la version ' + entrada.corpus_version + ' tiene registrado.\n'
      + '    registrada: ' + entrada.content_hash + '\n'
      + '    calculada:  ' + valor + '\n'
      + '    arreglo: cambio el corpus. Subi corpus_version y agrega la entrada nueva con la huella calculada, o volve atras el cambio.\n'
      + '    Dos contenidos distintos bajo una misma version declarada dejan ilegible lo que un proyecto congelo.');
  }
  return errores;
}

export function armarPublicado() {
  const { catalogo, contenido } = armarContenido();
  const receta = leerJson('gates', 'schema.json').version_scheme;
  const esquema = catalogo.version_scheme;
  const valor = huellaDeContenido(contenido, esquema.hash_covers);
  const salida = {
    what: 'The prompts of the Urazuke method, published as data. The method owns them; a tool consumes them. They are one English piece, identical in the eight versions of the method, and a tool does not rewrite them.',
    corpus_version: contenido.corpus_version,
    content_hash: {
      algo: receta.hash_algo,
      encoding: receta.hash_encoding,
      canonical_form: receta.canonical_form,
      covers: esquema.hash_covers,
      excludes: esquema.hash_excludes,
      value: valor,
      note: 'Recompute it over the canonicalised payload and compare. If you only read it, a frozen copy edited by hand or truncated by a merge is undetectable.',
    },
    version: gitCommitCorto(),
    version_note: 'Informative, and kept for the consumers that already print it. It is the sha of the change BEFORE the one that contains this file, because it is computed before saving: the identity of what is published is corpus_version + content_hash, and no comparison looks at this.',
    generated_at: new Date().toISOString(),
    source: 'https://github.com/pkuschnirof/urazuke',
    license: 'CC BY-SA 4.0',
    ...contenido,
  };
  return { salida, catalogo, valor };
}

if (import.meta.url === 'file:///' + (process.argv[1] ?? '').replace(/\\/g, '/')) {
  const { salida, catalogo, valor } = armarPublicado();
  if (salida.steps.length !== 24) {
    console.error('E_CUENTA: se leyeron ' + salida.steps.length + ' titulos de peldano en docs/en/peldanos/, y el metodo declara 24.');
    console.error('    arreglo: revisa el encabezado "# Step N - titulo (step contract)" del contrato que falta. No se publica nada.');
    process.exit(1);
  }
  const errores = verificar(salida, catalogo, valor);
  if (errores.length) {
    for (const e of errores) console.error('[' + e);
    console.error('\nprompts: ' + errores.length + ' error(es). No se publica nada.');
    process.exit(1);
  }
  const dir = join(raiz, 'docs', 'html', 'api');
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'prompts.json'), JSON.stringify(salida, null, 2) + '\n', 'utf8');
  console.log('api: docs/html/api/prompts.json (corpus ' + salida.corpus_version + ', ' + salida.count + ' prompts, '
    + Object.keys(salida.contracts).length + ' contratos, ' + salida.steps.length + ' peldaños, huella ' + valor.slice(0, 12) + ')');
}
