// Verifica que lo publicado en docs/html/api/ sea exactamente lo que dan las fuentes:
// regenera las dos APIs y compara contra lo que estaba commiteado. Si difieren, alguien
// edito un generado a mano o se olvido de regenerar, y la construccion falla.
//
// Dos campos quedan FUERA de la comparacion a proposito, y conviene saber por que:
//   - prompts.json `version` y gates.json `git_commit` (el mismo campo con dos nombres,
//     por compatibilidad con los consumidores que ya lo imprimen): los calcula el build con
//     `git rev-parse HEAD`, o sea ANTES de guardar, asi que nombran siempre al cambio
//     anterior al que los contiene. Compararlos dejaria esta verificacion en rojo
//     permanente por un campo que ninguna decision mira. La identidad de lo publicado
//     es la version declarada a mano (`catalog_version` en gates.json, `corpus_version`
//     en prompts.json) + `content_hash` (calculada), y esa SI se verifica: se recalcula
//     la huella de los DOS archivos sobre lo commiteado.
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
import { verificarIndice, leerDisco } from './index_api.mjs';
import { verificar as verificarInmutables, congeladasEnDisco, RECURSOS as RECURSOS_INMUTABLES } from './version_inmutable.mjs';
import { CARPETA_INMUTABLE } from './gates_lib.mjs';

const VOLATILES = {
  'prompts.json': ['version', 'generated_at'],
  'gates.json': ['generated_at', 'git_commit', 'git_commit_note'],
  // El indice no tiene mas metadata de corrida que su fecha: no lleva version ni huella
  // propias (D-056), asi que todo lo demas tiene que coincidir clavado.
  'index.json': ['generated_at'],
};

const ARCHIVOS = ['prompts.json', 'gates.json', 'index.json'];

const ruta = (n) => join(raiz, 'docs', 'html', 'api', n);
const leer = (n) => { try { return JSON.parse(readFileSync(ruta(n), 'utf8')); } catch { return null; } };
const sinVolatiles = (o, n) => { const c = { ...o }; for (const k of VOLATILES[n]) delete c[k]; return c; };

const antes = Object.fromEntries(ARCHIVOS.map((n) => [n, leer(n)]));

let fallas = 0;

// La huella del archivo commiteado tiene que recalcularse igual: es lo que hace un
// consumidor para saber que su copia congelada no fue alterada.
function verificarHuella(nombre, publicado) {
  if (!publicado) { console.error('falta docs/html/api/' + nombre); return false; }
  const recalculada = huellaDeContenido(publicado, publicado.content_hash.covers);
  if (recalculada !== publicado.content_hash.value) {
    console.error('la huella de ' + nombre + ' no coincide con su contenido:');
    console.error('  publicada:   ' + publicado.content_hash.value);
    console.error('  recalculada: ' + recalculada);
    console.error('  arreglo: alguien edito el generado a mano. Corre: node build/build.mjs');
    return false;
  }
  const version = publicado.catalog_version ?? publicado.corpus_version;
  console.log(nombre + ': la huella recalculada coincide (version ' + version + ', ' + publicado.content_hash.value.slice(0, 12) + ')');
  return true;
}

// El indice no tiene huella propia que recalcular: lo que se le exige es que las
// versiones y las huellas que CITA sean las que los recursos declaran de verdad. Un
// indice que cita una huella vieja es peor que no tener indice, porque le miente al
// consumidor con cara de dato verificado.
function verificarCitasDelIndice() {
  const indice = antes['index.json'];
  if (!indice) {
    console.error('falta docs/html/api/index.json');
    console.error('  arreglo: corre node build/index_api.mjs');
    return false;
  }
  const errores = verificarIndice(indice, leerDisco());
  if (errores.length) {
    for (const e of errores) console.error('[' + e.codigo + '] ' + e.que + ' -- arreglo: ' + e.arreglo);
    return false;
  }
  console.log('index.json: cita las versiones y huellas vivas de '
    + indice.resources.map((r) => r.name + ' ' + r.version + '/' + r.content_hash.value.slice(0, 12)).join(', ')
    + ' (y no lleva version ni huella propias, D-056)');
  return true;
}

// Las copias por version: lo mismo que un consumidor puede hacer con la direccion
// inmutable, hecho aca sobre lo commiteado. Es la unica comprobacion de este archivo que
// mira el registro de versiones, que es el ancla que no vive en el alojamiento (PND-008).
function verificarInmutablesAca() {
  const { revisadas, hallazgos } = verificarInmutables();
  if (hallazgos.length) {
    for (const x of hallazgos) console.error('[' + x.recurso + '] ' + x.que + ' -- arreglo: ' + x.arreglo);
    return false;
  }
  const detalle = RECURSOS_INMUTABLES.map((r) => CARPETA_INMUTABLE[r.name] + '/ ' + congeladasEnDisco(r).length).join(', ');
  console.log('versiones inmutables: comprobado -- ' + revisadas + ' copias, cada una con la huella que su registro anota (' + detalle + ')');
  return true;
}

const huellas = () => {
  const recursos = ['gates.json', 'prompts.json'].map((n) => verificarHuella(n, antes[n])).every(Boolean);
  const indice = verificarCitasDelIndice();
  const inmutables = verificarInmutablesAca();
  return recursos && indice && inmutables;
};

if (process.argv.includes('--huella')) {
  process.exit(huellas() ? 0 : 1);
}

if (!huellas()) fallas++;

for (const script of ['prompts_api.mjs', 'gates_api.mjs', 'index_api.mjs']) {
  execFileSync(process.execPath, [join(raiz, 'build', script)], { stdio: 'inherit' });
}

for (const nombre of ARCHIVOS) {
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
