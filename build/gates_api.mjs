// Publica la definición mecánica de compuertas del método como una API estática en
// JSON, para que una herramienta (Forge, o cualquier otra) la tome del sitio en vez
// de llevarla compilada adentro. Mismo patrón que build/prompts_api.mjs.
//
// El contenido publicado está en inglés (D-051): no es parte del corpus traducido, y
// traducir para el usuario final es trabajo del consumidor. La única excepción es el
// texto de la base congelada, que no se edita.
//
// Salida: docs/html/api/gates.json
//   {
//     "catalog_version": "2026.10.1",     <- la declara el método a mano; es lo que un proyecto congela
//     "content_hash": { "algo": "sha256", "value": "...", ... },  <- la calcula el build; el consumidor la RECALCULA
//     "git_commit": "<sha corto>",        <- informativo: ninguna comparación lo mira
//     "schema_version": 2, "generated_at": "<ISO>",
//     "evaluators": [...], "steps": [...], "stations": [...],
//     "heuristics": { ..., "rules": [ ... con su enunciado extraído del Anexo H ... ] },
//     "adapters": {...}, "project_config": {...}
//   }
// Antes de escribir, valida: si hay un solo error, no se publica nada.
// Uso: node build/gates_api.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { raiz, cargarFuentes, extraerAnexo, armarContenido, huellaDeContenido, gitCommitCorto } from './gates_lib.mjs';
import { validar } from './gates_validate.mjs';

const fuentes = cargarFuentes();
const anexo = extraerAnexo();

const errores = validar(fuentes, anexo);
if (errores.length) {
  for (const e of errores) console.error('[' + e.code + '] ' + e.que + '\n    donde: ' + e.donde + '\n    arreglo: ' + e.arreglo);
  console.error('\ncompuertas: ' + errores.length + ' error(es). No se publica nada.');
  process.exit(1);
}

const contenido = armarContenido(fuentes, anexo);
const esquema = fuentes.schema.version_scheme;
const valor = huellaDeContenido(contenido, esquema.hash_covers);

const salida = {
  what: 'The mechanical definition of the gates of the Urazuke method, published as data. The method owns it; a tool consumes it. Whatever an installation cannot measure is reported as declared and not measured, never as green.',
  catalog_version: contenido.catalog_version,
  schema_version: contenido.schema_version,
  content_hash: {
    algo: esquema.hash_algo,
    encoding: esquema.hash_encoding,
    canonical_form: esquema.canonical_form,
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
  counts: {
    steps: contenido.steps.length,
    stations: contenido.stations.length,
    rules: contenido.heuristics.rules.length,
    evaluators: contenido.evaluators.length,
  },
  ...contenido,
};

const dir = join(raiz, 'docs', 'html', 'api');
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, 'gates.json'), JSON.stringify(salida, null, 2) + '\n', 'utf8');
console.log('api: docs/html/api/gates.json (catalogo ' + salida.catalog_version + ', esquema ' + salida.schema_version
  + ', ' + salida.counts.steps + ' peldaños, ' + salida.counts.stations + ' estaciones, ' + salida.counts.rules
  + ' reglas, huella ' + valor.slice(0, 12) + ')');
