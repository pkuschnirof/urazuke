// Arma los HTML de lectura a partir del markdown. Uso: node build/build.mjs
// Para el castellano (docs/) y para cada traducción (docs/<idioma>/):
// - ESCALERA_METODOLOGICA.html  <- ESCALERA_METODOLOGICA.md
// - REFERENCIAS.html            <- REFERENCIAS.md
// - MANUAL_CURSO.html           <- MANUAL_CURSO.md
// - EVOLUTIVO_CORRECTIVO.html   <- EVOLUTIVO_CORRECTIVO.md (el camino para sistemas heredados)
// - MANUAL_CURSO_EVOLUTIVO.html <- MANUAL_CURSO_EVOLUTIVO.md (parte 2 del curso)
// - CONTRATOS_DE_PELDANO.html   <- peldanos/README.md + los 16 contratos, en orden
// - EVALUACIONES_DE_IA.html     <- EVALUACIONES_DE_IA.md (solo castellano: cita textual de cada IA)
// - COMPUERTAS.html             <- COMPUERTAS.md (generado desde gates/; en INGLES, D-051: es
//                                  documentacion de herramienta y queda fuera del corpus traducido)
// Antes verifica que los prompts en inglés sean idénticos en todas las versiones.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, unlinkSync, cpSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { execFileSync } from 'node:child_process';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
execFileSync(process.execPath, [join(raiz, 'build', 'prompts.mjs')], { stdio: 'inherit' });
// La API estatica de prompts (docs/html/api/prompts.json), para Forge y cualquier herramienta.
execFileSync(process.execPath, [join(raiz, 'build', 'prompts_api.mjs')], { stdio: 'inherit' });
// Las compuertas como datos (docs/html/api/gates.json): valida gates/ contra su esquema
// y contra el Anexo H, y no publica nada si hay un solo error. Despues verifica que
// docs/COMPUERTAS.md siga coincidiendo con los datos de los que sale.
execFileSync(process.execPath, [join(raiz, 'build', 'gates_api.mjs')], { stdio: 'inherit' });
// El indice de la API (docs/html/api/index.json): va DESPUES de los dos recursos, porque
// cita la version y la huella que cada uno declara. Si citara una vieja no se publica.
execFileSync(process.execPath, [join(raiz, 'build', 'index_api.mjs')], { stdio: 'inherit' });
execFileSync(process.execPath, [join(raiz, 'build', 'gates_doc.mjs'), '--check'], { stdio: 'inherit' });
const conv = join(raiz, 'build', 'md2html.mjs');

function armar(dirMd, dirHtml, idioma) {
  mkdirSync(dirHtml, { recursive: true });
  for (const nombre of ['ESCALERA_METODOLOGICA', 'REFERENCIAS', 'EVOLUTIVO_CORRECTIVO', 'MANUAL_CURSO', 'MANUAL_CURSO_EVOLUTIVO', 'CAPACITACION_JUNIOR', 'TRABAJO_COLABORATIVO', 'EVALUACIONES_DE_IA', 'ANEXO_HEURISTICAS', 'COMPUERTAS']) {
    const src = join(dirMd, nombre + '.md');
    // COMPUERTAS es documentacion de herramienta y se genera en ingles (D-051), asi que
    // el HTML se marca en ingles aunque viva en el arbol del castellano.
    const idiomaDoc = nombre === 'COMPUERTAS' ? 'en' : idioma;
    if (existsSync(src)) execFileSync(process.execPath, [conv, src, join(dirHtml, nombre + '.html'), idiomaDoc], { stdio: 'inherit' });
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

// Los manuales de practica (docs/practica/*.md) con sus capturas y la evidencia: solo castellano por ahora.
const dirPr = join(raiz, 'docs', 'practica');
if (existsSync(dirPr)) {
  const outPr = join(raiz, 'docs', 'html', 'practica');
  mkdirSync(outPr, { recursive: true });
  let m = 0;
  for (const f of readdirSync(dirPr).filter(f => f.endsWith('.md')).sort()) {
    execFileSync(process.execPath, [conv, join(dirPr, f), join(outPr, f.replace(/\.md$/, '.html')), 'es'], { stdio: 'inherit' });
    m++;
  }
  for (const sub of ['img', 'evidencia']) {
    if (existsSync(join(dirPr, sub))) cpSync(join(dirPr, sub), join(outPr, sub), { recursive: true });
  }
  console.log('manuales de practica:', m);
}

