// Extrae los prompts en inglés de los contratos de peldaño (fuente: docs/peldanos/, castellano) a
// prompts/peldano-NN.en.md, y verifica que cada traducción (docs/<idioma>/peldanos/) contenga
// exactamente los mismos prompts. Es un medidor con guarda aplicado al propio repositorio: si una
// traducción alteró un prompt, el build falla.
// Un bloque de cita que empieza con una etiqueta de idioma ("> [es]", "> [it]"...) es la
// traducción del prompt anterior, para lectura, y no cuenta como prompt.
// Uso: node build/prompts.mjs            -> extrae y verifica
//      node build/prompts.mjs --check    -> solo verifica (no escribe)
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const soloVerificar = process.argv.includes('--check');
const fuente = join(raiz, 'docs', 'peldanos');
const destino = join(raiz, 'prompts');
const idiomas = ['en', 'pt', 'fr', 'de', 'it', 'ja', 'zh'];

// Un prompt es un bloque de líneas consecutivas que empiezan con "> ". Se normaliza el espacio
// para que un re-ajuste de líneas en una traducción no cuente como alteración.
function extraerPrompts(md) {
  const bloques = [];
  let actual = [];
  const cerrar = () => {
    if (!actual.length) return;
    if (!/^\[[a-z]{2}\]\s*$/.test(actual[0])) bloques.push(actual.join(' '));
    actual = [];
  };
  for (const linea of md.split(/\r?\n/)) {
    if (/^> ?/.test(linea)) actual.push(linea.replace(/^> ?/, ''));
    else cerrar();
  }
  cerrar();
  return bloques.map(b => b.replace(/\s+/g, ' ').trim());
}

// Cuenta cuántos prompts tienen su traducción colgada (para informar, no para fallar).
function contarTraducciones(md) {
  let n = 0;
  for (const linea of md.split(/\r?\n/)) if (/^> \[[a-z]{2}\]\s*$/.test(linea)) n++;
  return n;
}

const archivos = readdirSync(fuente).filter(f => /^peldano-\d\d-.*\.md$/.test(f)).sort();
let errores = 0, total = 0, traducidos = 0;
if (!soloVerificar) mkdirSync(destino, { recursive: true });

for (const f of archivos) {
  const n = f.slice(8, 10);
  const texto = readFileSync(join(fuente, f), 'utf8');
  const prompts = extraerPrompts(texto);
  total += prompts.length;
  traducidos += contarTraducciones(texto);
  if (!soloVerificar) {
    const cuerpo = `# Urazuke — step ${Number(n)} prompts (English, single source)\n\n` +
      `Generated from \`docs/peldanos/${f}\` by \`build/prompts.mjs\`. Do not edit by hand.\n\n` +
      prompts.map((p, i) => `## Prompt ${i + 1}\n\n${p}\n`).join('\n');
    writeFileSync(join(destino, `peldano-${n}.en.md`), cuerpo, 'utf8');
  }
  for (const idioma of idiomas) {
    const dir = join(raiz, 'docs', idioma, 'peldanos');
    if (!existsSync(dir) || !readdirSync(dir).some(x => /^peldano-\d\d-/.test(x))) continue;
    const candidatos = readdirSync(dir).filter(x => x.startsWith(`peldano-${n}-`) || x.startsWith(`step-${n}-`));
    if (!candidatos.length) { console.error(`[${idioma}] falta la traducción del peldaño ${n}`); errores++; continue; }
    const otros = extraerPrompts(readFileSync(join(dir, candidatos[0]), 'utf8'));
    if (otros.length !== prompts.length) {
      console.error(`[${idioma}] peldaño ${n}: ${otros.length} prompts, se esperaban ${prompts.length}`); errores++; continue;
    }
    otros.forEach((p, i) => { if (p !== prompts[i]) { console.error(`[${idioma}] peldaño ${n}: el prompt ${i + 1} difiere de la fuente`); errores++; } });
  }
}
// La página del camino evolutivo-correctivo también lleva prompts: misma regla, misma verificación.
{
  const nombre = 'EVOLUTIVO_CORRECTIVO.md';
  const src = join(raiz, 'docs', nombre);
  if (existsSync(src)) {
    const texto = readFileSync(src, 'utf8');
    const prompts = extraerPrompts(texto);
    if (!soloVerificar) {
      const cuerpo = `# Urazuke — evolutive-corrective path prompts (English, single source)\n\n` +
        `Generated from \`docs/${nombre}\` by \`build/prompts.mjs\`. Do not edit by hand.\n\n` +
        prompts.map((p, i) => `## Prompt ${i + 1}\n\n${p}\n`).join('\n');
      writeFileSync(join(destino, 'evolutivo-correctivo.en.md'), cuerpo, 'utf8');
    }
    for (const idioma of idiomas) {
      const otro = join(raiz, 'docs', idioma, nombre);
      if (!existsSync(otro)) { if (existsSync(join(raiz, 'docs', idioma, 'peldanos'))) { console.error(`[${idioma}] falta la traducción de ${nombre}`); errores++; } continue; }
      const otros = extraerPrompts(readFileSync(otro, 'utf8'));
      if (otros.length !== prompts.length) { console.error(`[${idioma}] ${nombre}: ${otros.length} prompts, se esperaban ${prompts.length}`); errores++; continue; }
      otros.forEach((p, i) => { if (p !== prompts[i]) { console.error(`[${idioma}] ${nombre}: el prompt ${i + 1} difiere de la fuente`); errores++; } });
    }
    console.log(`prompts del camino evolutivo-correctivo: ${prompts.length}`);
  }
}
const verificadas = idiomas.filter(i => existsSync(join(raiz, 'docs', i, 'peldanos')) && readdirSync(join(raiz, 'docs', i, 'peldanos')).some(x => /^peldano-\d\d-/.test(x)));
console.log(`prompts: ${total} en ${archivos.length} contratos (${traducidos} con traducción en la fuente); traducciones verificadas: ${verificadas.join(', ') || 'ninguna todavía'}; errores: ${errores}`);
if (errores) process.exit(1);
