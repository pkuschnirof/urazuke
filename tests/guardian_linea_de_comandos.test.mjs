// El guardian de linea de comandos de los programas de la cadena, y por que tiene una
// prueba propia.
//
// Los tres programas que se pueden invocar desde la linea de comandos detectaban eso
// con un idiom que solo acierta en Windows: pegaban 'file:///' adelante de argv[1] y lo
// comparaban contra import.meta.url. En POSIX argv[1] ya empieza con una barra, asi que
// la comparacion era 'file:////home/...' contra 'file:///home/...' y nunca daba. El
// bloque no entraba: el programa definia sus exports y salia con exito, sin hacer nada.
//
// Lo que eso costaba, medido en la corrida 39956832685 de ubuntu-latest (main, verde):
// los pasos `node build/gates_validate.mjs` y `node build/gates_doc.mjs --check`
// imprimieron CERO lineas. O sea que la cadena NO estaba validando las fuentes contra el
// esquema ni exigiendo que docs/COMPUERTAS.md coincidiera con los datos: una edicion a
// mano del documento generado pasaba en verde. Dos de las cinco verificaciones eran
// ceremonia.
//
// Un verde en Windows no alcanza para cuidar esto, porque el defecto solo se ve en la
// otra plataforma. Por eso la prueba hace dos cosas distintas:
//   1. ejercita el guardian con las dos FORMAS de ruta -- la de POSIX y la de Windows --
//      corriendo en cualquiera de las dos, que es lo que se pone en rojo si alguien
//      vuelve a escribir una comparacion dependiente de la plataforma;
//   2. recorre build/ y rechaza el idiom viejo, para que no reaparezca en un archivo
//      nuevo que todavia no tiene prueba.
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { raiz, esLineaDeComandos } from '../build/gates_lib.mjs';

const POSIX = '/home/runner/work/urazuke/urazuke/build/gates_validate.mjs';
const URL_POSIX = 'file://' + POSIX;
const WIN = 'C:\\urazuke\\build\\gates_validate.mjs';
const URL_WIN = 'file:///C:/urazuke/build/gates_validate.mjs';

test('el guardian acierta con una ruta de POSIX (es el caso que estaba roto)', () => {
  assert.equal(esLineaDeComandos(URL_POSIX, POSIX), true);
});

test('el guardian acierta con una ruta de Windows', () => {
  assert.equal(esLineaDeComandos(URL_WIN, WIN), true);
});

test('el guardian no confunde un modulo con otro', () => {
  assert.equal(esLineaDeComandos(URL_POSIX, '/home/runner/work/urazuke/urazuke/build/gates_doc.mjs'), false);
  assert.equal(esLineaDeComandos(URL_WIN, 'C:\\urazuke\\build\\gates_doc.mjs'), false);
});

test('importado como modulo (sin argv[1]) el guardian no entra', () => {
  assert.equal(esLineaDeComandos(URL_POSIX, ''), false);
});

test('el guardian tolera una ruta con un espacio, que import.meta.url trae escapado', () => {
  assert.equal(esLineaDeComandos('file:///home/mi%20carpeta/build/gates_doc.mjs', '/home/mi carpeta/build/gates_doc.mjs'), true);
});

test('ningun programa de build/ vuelve a comparar a mano contra "file:///"', () => {
  const culpables = [];
  for (const nombre of readdirSync(join(raiz, 'build')).filter((n) => n.endsWith('.mjs'))) {
    const texto = readFileSync(join(raiz, 'build', nombre), 'utf8');
    for (const [i, linea] of texto.split('\n').entries()) {
      const limpia = linea.trimStart();
      if (limpia.startsWith('*') || limpia.startsWith('//')) continue;
      if (limpia.includes("'file:///' +") || limpia.includes('"file:///" +')) {
        culpables.push('build/' + nombre + ':' + (i + 1));
      }
    }
  }
  assert.deepEqual(culpables, [], 'usa esLineaDeComandos(import.meta.url) de gates_lib.mjs: pegar "file:///" adelante de argv[1] no acierta en POSIX');
});

test('los tres programas con modo de linea de comandos usan el guardian compartido', () => {
  for (const nombre of ['gates_validate.mjs', 'gates_doc.mjs', 'prompts_api.mjs']) {
    const texto = readFileSync(join(raiz, 'build', nombre), 'utf8');
    assert.ok(texto.includes('esLineaDeComandos(import.meta.url)'),
      'build/' + nombre + ' tiene modo de linea de comandos y no usa el guardian compartido');
  }
});
