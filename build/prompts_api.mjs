// Publica los prompts del método como una API estática en JSON, para que una
// herramienta (Forge, o cualquier otra) los tome del sitio en vez de copiarlos a mano.
//
// Salida: docs/html/api/prompts.json
//   {
//     "version": "<commit corto>", "generated_at": "<ISO>", "language": "en",
//     "source": "https://github.com/pkuschnirof/urazuke",
//     "contracts": { "peldano-00": ["..."], ..., "evolutivo-correctivo": [...], "trabajo-colaborativo": [...] },
//     "steps": [ { "num": 0, "key": "peldano-00", "title": "..." }, ... ],
//     "count": 70
//   }
// Los prompts son los mismos que prompts/*.en.md (una sola pieza en inglés, idéntica en
// los ocho idiomas); build.mjs corre este script después de verificarlos.
// Uso: node build/prompts_api.mjs
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { execFileSync } from 'node:child_process';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const dirPrompts = join(raiz, 'prompts');
const dirPeldanos = join(raiz, 'docs', 'peldanos');

function extraer(md) {
  return md.split(/^## Prompt \d+\s*$/m).slice(1).map((p) => p.replace(/\s+/g, ' ').trim());
}

let version = 'unknown';
try { version = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: raiz, encoding: 'utf8' }).trim(); } catch { /* sin git */ }

const contracts = {};
let count = 0;
for (const f of readdirSync(dirPrompts).filter((n) => n.endsWith('.en.md')).sort()) {
  const key = f.replace(/\.en\.md$/, '');
  contracts[key] = extraer(readFileSync(join(dirPrompts, f), 'utf8'));
  count += contracts[key].length;
}

const steps = [];
for (const f of readdirSync(dirPeldanos).filter((n) => /^peldano-\d\d-.*\.md$/.test(n)).sort()) {
  const md = readFileSync(join(dirPeldanos, f), 'utf8');
  const m = /^# Peldaño (\d+) — (.*?) \(contrato/m.exec(md);
  if (m) steps.push({ num: Number(m[1]), key: 'peldano-' + f.slice(8, 10), title: m[2] });
}

const out = {
  version, generated_at: new Date().toISOString(), language: 'en',
  source: 'https://github.com/pkuschnirof/urazuke',
  license: 'CC BY-SA 4.0',
  contracts, steps, count,
};
const dir = join(raiz, 'docs', 'html', 'api');
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, 'prompts.json'), JSON.stringify(out, null, 2) + '\n', 'utf8');
console.log('api: docs/html/api/prompts.json (' + count + ' prompts, ' + steps.length + ' peldaños, ' + version + ')');
