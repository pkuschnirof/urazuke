// Verifica que lo publicado en docs/html/api/ sea exactamente lo que dan las fuentes:
// regenera las dos APIs y compara contra lo que estaba commiteado. Si difieren, alguien
// edito un generado a mano o se olvido de regenerar, y la construccion falla.
//
// Dos campos quedan FUERA de la comparacion a proposito, y conviene saber por que:
//   - prompts.json `version` y gates.json `git_commit`: los calcula el build con
//     `git rev-parse HEAD`, o sea ANTES de guardar, asi que nombran siempre al cambio
//     anterior al que los contiene. Compararlos dejaria esta verificacion en rojo
//     permanente por un campo que ninguna decision mira. La identidad de lo publicado
//     es `catalog_version` (declarada a mano) + `content_hash` (calculada), y esa SI
//     se verifica: se recalcula la huella sobre el archivo commiteado.
//   - `generated_at`: cambia en cada corrida por definicion.
// Uso: node build/api_check.mjs
//      node build/api_check.mjs --huella   <- solo recalcula la huella de lo commiteado
//
// El modo --huella existe para el paso de publicacion (.github/workflows/compuertas.yml):
// ahi hay que volver a comprobar que el archivo que se va a copiar al portal sigue siendo
// el que dice ser, pero NO se puede regenerar nada, porque regenerar reescribe
// `generated_at` y el `version` de prompts.json y terminariamos publicando algo distinto
// de lo que esta commiteado en main. Hace lo mismo que hace un consumidor: lee el archivo,
// recalcula la huella sobre el payload canonicalizado y compara.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { raiz, huellaDeContenido } from './gates_lib.mjs';

const VOLATILES = {
  'prompts.json': ['version', 'generated_at'],
  'gates.json': ['generated_at', 'git_commit', 'git_commit_note'],
};

const ruta = (n) => join(raiz, 'docs', 'html', 'api', n);
const leer = (n) => { try { return JSON.parse(readFileSync(ruta(n), 'utf8')); } catch { return null; } };
const sinVolatiles = (o, n) => { const c = { ...o }; for (const k of VOLATILES[n]) delete c[k]; return c; };

const antes = { 'prompts.json': leer('prompts.json'), 'gates.json': leer('gates.json') };

let fallas = 0;

// La huella del archivo commiteado tiene que recalcularse igual: es lo que hace un
// consumidor para saber que su copia congelada no fue alterada.
function verificarHuella(publicado) {
  if (!publicado) { console.error('falta docs/html/api/gates.json'); return false; }
  const recalculada = huellaDeContenido(publicado, publicado.content_hash.covers);
  if (recalculada !== publicado.content_hash.value) {
    console.error('la huella de gates.json no coincide con su contenido:');
    console.error('  publicada:   ' + publicado.content_hash.value);
    console.error('  recalculada: ' + recalculada);
    console.error('  arreglo: alguien edito el generado a mano. Corre: node build/gates_api.mjs');
    return false;
  }
  console.log('gates.json: la huella recalculada coincide (catalogo ' + publicado.catalog_version
    + ', ' + publicado.content_hash.value.slice(0, 12) + ')');
  return true;
}

if (process.argv.includes('--huella')) {
  process.exit(verificarHuella(antes['gates.json']) ? 0 : 1);
}

if (!verificarHuella(antes['gates.json'])) fallas++;

for (const script of ['prompts_api.mjs', 'gates_api.mjs']) {
  execFileSync(process.execPath, [join(raiz, 'build', script)], { stdio: 'inherit' });
}

for (const nombre of ['prompts.json', 'gates.json']) {
  const a = antes[nombre], b = leer(nombre);
  if (!a) { console.error('no habia ' + nombre + ' commiteado'); fallas++; continue; }
  const ja = JSON.stringify(sinVolatiles(a, nombre)), jb = JSON.stringify(sinVolatiles(b, nombre));
  if (ja !== jb) {
    console.error(nombre + ': lo commiteado no es lo que dan las fuentes.');
    for (const clave of new Set([...Object.keys(a), ...Object.keys(b)])) {
      if (VOLATILES[nombre].includes(clave)) continue;
      if (JSON.stringify(a[clave]) !== JSON.stringify(b[clave])) console.error('  difiere: ' + clave);
    }
    console.error('  arreglo: corre node build/build.mjs y commitea lo regenerado.');
    fallas++;
  } else {
    console.log(nombre + ': lo commiteado coincide con las fuentes (sin mirar ' + VOLATILES[nombre].join(', ') + ')');
  }
}

if (fallas) process.exit(1);
