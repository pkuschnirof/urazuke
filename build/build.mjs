// Arma los HTML de lectura a partir del markdown. Uso: node build/build.mjs
// Para el castellano (docs/) y para cada traducción (docs/<idioma>/):
// - ESCALERA_METODOLOGICA.html  <- ESCALERA_METODOLOGICA.md
// - REFERENCIAS.html            <- REFERENCIAS.md
// - MANUAL_CURSO.html           <- MANUAL_CURSO.md
// - CONTRATOS_DE_PELDANO.html   <- peldanos/README.md + los 16 contratos, en orden
// Antes verifica que los prompts en inglés sean idénticos en todas las versiones.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, unlinkSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { execFileSync } from 'node:child_process';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
execFileSync(process.execPath, [join(raiz, 'build', 'prompts.mjs')], { stdio: 'inherit' });
const conv = join(raiz, 'build', 'md2html.mjs');

function armar(dirMd, dirHtml, idioma) {
  mkdirSync(dirHtml, { recursive: true });
  for (const nombre of ['ESCALERA_METODOLOGICA', 'REFERENCIAS', 'MANUAL_CURSO']) {
    const src = join(dirMd, nombre + '.md');
    if (existsSync(src)) execFileSync(process.execPath, [conv, src, join(dirHtml, nombre + '.html'), idioma], { stdio: 'inherit' });
  }
  const dirP = join(dirMd, 'peldanos');
  if (!existsSync(dirP)) return 0;
  const archivos = readdirSync(dirP).filter(f => /^peldano-\d\d-.*\.md$/.test(f)).sort();
  if (!archivos.length) return 0;
  let md = '';
  const idx = join(dirP, 'README.md');
  if (existsSync(idx)) md += readFileSync(idx, 'utf8') + '\n\n---\n\n';
  else md += '# Urazuke — step contracts\n\n';
  // cada contrato pasa de h1 a h2 y sus h2 a h3, para que el índice del HTML los agrupe.
  for (const f of archivos) md += readFileSync(join(dirP, f), 'utf8').replace(/^## /gm, '### ').replace(/^# /m, '## ') + '\n\n---\n\n';
  const tmp = join(dirHtml, '.contratos.tmp.md');
  writeFileSync(tmp, md, 'utf8');
  execFileSync(process.execPath, [conv, tmp, join(dirHtml, 'CONTRATOS_DE_PELDANO.html'), idioma], { stdio: 'inherit' });
  unlinkSync(tmp);
  return archivos.length;
}

const n = armar(join(raiz, 'docs'), join(raiz, 'docs', 'html'), 'es');
console.log('contratos incluidos (es):', n);
for (const idioma of ['en', 'pt', 'fr', 'de', 'it', 'ja', 'zh']) {
  const dirIdioma = join(raiz, 'docs', idioma);
  if (!existsSync(dirIdioma)) continue;
  const k = armar(dirIdioma, join(raiz, 'docs', 'html', idioma), idioma);
  console.log(`contratos incluidos (${idioma}):`, k);
}
