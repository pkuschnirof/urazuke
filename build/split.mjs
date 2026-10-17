// Parte un archivo combinado de contratos traducidos en los 16 archivos individuales.
// El combinado lleva lineas "<!-- file: peldano-NN-slug.md -->" antes de cada contrato.
// Uso: node build/split.mjs docs/<idioma>/peldanos/_all.md   (borra el combinado al terminar)
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
const [,, combinado] = process.argv;
const dir = dirname(combinado);
const partes = readFileSync(combinado, 'utf8').split(/^<!-- file: (peldano-\d\d-[a-z0-9-]+\.md) -->\r?\n/m);
let n = 0;
for (let i = 1; i < partes.length; i += 2) { writeFileSync(join(dir, partes[i]), partes[i + 1].trim() + '\n', 'utf8'); n++; }
unlinkSync(combinado);
console.log('contratos escritos:', n, 'en', dir);
