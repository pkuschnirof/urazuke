// Arma los HTML de lectura a partir del markdown. Uso: node build/build.mjs
// - docs/html/ESCALERA_METODOLOGICA.html  <- docs/ESCALERA_METODOLOGICA.md
// - docs/html/CONTRATOS_DE_PELDANO.html   <- docs/peldanos/README.md + los 16 contratos, en orden
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, unlinkSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { execFileSync } from 'node:child_process';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

// 0) prompts en inglés: se extraen de la fuente y se verifica que las traducciones no los alteren.
execFileSync(process.execPath, [join(raiz, 'build', 'prompts.mjs')], { stdio: 'inherit' });
const conv = join(raiz, 'build', 'md2html.mjs');
mkdirSync(join(raiz, 'docs', 'html'), { recursive: true });

// 1) documento principal
execFileSync(process.execPath, [conv, join(raiz, 'docs', 'ESCALERA_METODOLOGICA.md'),
  join(raiz, 'docs', 'html', 'ESCALERA_METODOLOGICA.html')], { stdio: 'inherit' });

// 1b) manual-curso
execFileSync(process.execPath, [conv, join(raiz, 'docs', 'MANUAL_CURSO.md'),
  join(raiz, 'docs', 'html', 'MANUAL_CURSO.html')], { stdio: 'inherit' });

// 1c) traducciones: cada docs/<idioma>/ con los mismos nombres de archivo que la fuente.
for (const idioma of ['en', 'pt', 'fr', 'de', 'it', 'ja', 'zh']) {
  const dirIdioma = join(raiz, 'docs', idioma);
  if (!existsSync(dirIdioma)) continue;
  mkdirSync(join(raiz, 'docs', 'html', idioma), { recursive: true });
  for (const nombre of ['ESCALERA_METODOLOGICA', 'MANUAL_CURSO']) {
    const src = join(dirIdioma, nombre + '.md');
    if (existsSync(src)) execFileSync(process.execPath, [conv, src, join(raiz, 'docs', 'html', idioma, nombre + '.html')], { stdio: 'inherit' });
  }
  const dirP = join(dirIdioma, 'peldanos');
  if (existsSync(dirP)) {
    const fs = readdirSync(dirP).filter(f => /^peldano-\d\d-.*\.md$/.test(f)).sort();
    let m = '';
    const idx = join(dirP, 'README.md');
    if (existsSync(idx)) m += readFileSync(idx, 'utf8') + '\n\n---\n\n';
    else m += '# Urazuke — step contracts\n\n';
    for (const f of fs) m += readFileSync(join(dirP, f), 'utf8').replace(/^## /gm, '### ').replace(/^# /m, '## ') + '\n\n---\n\n';
    const t = join(raiz, 'docs', 'html', idioma, '.contratos.tmp.md');
    writeFileSync(t, m, 'utf8');
    execFileSync(process.execPath, [conv, t, join(raiz, 'docs', 'html', idioma, 'CONTRATOS_DE_PELDANO.html')], { stdio: 'inherit' });
    unlinkSync(t);
  }
}

// 2) contratos: se concatenan en un markdown temporal (en memoria) y se convierten.
const dir = join(raiz, 'docs', 'peldanos');
const archivos = readdirSync(dir).filter(f => /^peldano-\d\d-.*\.md$/.test(f)).sort();
let md = '# Contratos de peldaño\n\n' +
  readFileSync(join(dir, 'README.md'), 'utf8').replace(/^# .*\n/, '') + '\n\n---\n\n';
for (const f of archivos) {
  // cada contrato pasa de h1 a h2 y sus h2 a h3, para que el indice del HTML los agrupe.
  const t = readFileSync(join(dir, f), 'utf8')
    .replace(/^## /gm, '### ')
    .replace(/^# /m, '## ');
  md += t + '\n\n---\n\n';
}
const tmp = join(raiz, 'docs', 'html', '.contratos.tmp.md');
writeFileSync(tmp, md, 'utf8');
execFileSync(process.execPath, [conv, tmp, join(raiz, 'docs', 'html', 'CONTRATOS_DE_PELDANO.html')], { stdio: 'inherit' });
unlinkSync(tmp);
console.log('contratos incluidos:', archivos.length);
