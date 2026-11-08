// Ningun archivo de texto del arbol lleva bytes de control.
//
// Lo que estaba mal y esta prueba vigila, medido el 2026-10-27: `build/index_api.mjs`
// tenia UN byte NUL adentro de un literal -- `r.version_ledger?.path ?? '\0'`, donde la
// intencion era la cadena vacia --, commiteado en 063ec7c y el unico de los 1041 archivos
// de texto del arbol. El dano no es el literal: es que `grep` clasifica como BINARIO
// cualquier archivo con un NUL y lo saltea, asi que ese archivo se volvio invisible para
// toda busqueda de texto sobre el arbol. Un programa que ninguna busqueda encuentra es la
// forma mas barata de una guarda dormida: no hace falta que nadie lo rompa, basta con que
// nadie lo vea.
//
// Y las dos guardas que ya existian no podian verlo, cada una por su razon: la de ASCII
// puro mira los caracteres SOBRE 0x7F del publicado (D-051) y un NUL esta debajo, y
// mira el publicado y no las fuentes.
//
// Se permiten el tabulador, el salto de linea y el retorno de carro: el retorno porque un
// clon en Windows lo tiene y eso se vigila aparte (E_INDICE_BYTES), no aca.
//
// El universo es lo que git TIENE VERSIONADO, enumerado con `git ls-files`, y no un
// recorrido del disco. La razon se midio: el arbol de trabajo tiene hoy un clon COMPLETO
// del propio repositorio adentro (`.forge/n0-env/clone`, del relevamiento de la estacion
// N0), asi que recorrer el disco cuenta 1040 archivos de dos copias distintas y un
// hallazgo en la copia ajena se reportaria como si fuera del metodo. Es la forma nueva del
// defecto de PND-037. Lo versionado son 531.
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { raiz } from '../build/gates_lib.mjs';

const EXTENSIONES = ['.mjs', '.js', '.json', '.md', '.yml', '.yaml', '.html', '.css', '.txt'];
const SALTEAR = new Set(['.git', 'node_modules']);
const PERMITIDOS = new Set([0x09, 0x0a, 0x0d]);

/**
 * Los arboles que esta prueba NO lee, cada uno con su razon escrita. El registro vive aca y no
 * adentro de la comprobacion por lo mismo que los comodines del Anexo H y las exclusiones del
 * inventario de documentos: una exclusion sin razon escrita es la forma de apagar una regla sin
 * decirlo (D-066).
 *
 * La unica razon que hay hoy es un tercero vendoreado, y conviene leerla entera porque es el
 * borde de lo que esta prueba defiende. `vendor/mermaid-11.17.2.min.js` es un paquete minificado
 * de terceros, de 3,5 MB, que este repositorio NO escribe ni edita y que trae un 0x01 adentro de
 * un literal propio. Exigirle ASCII de control a un bundle ajeno seria pedirle al metodo que lo
 * reescriba, que es exactamente lo que no se hace con un tercero. Y lo que esta prueba protege
 * --que un archivo no se vuelva invisible para una busqueda de texto-- ahi no aplica: a ese
 * archivo nadie lo busca por su texto, su identidad es la huella que `vendor/terceros.json`
 * declara, y `build/terceros.mjs` la RECALCULA en cada construccion, que es una guarda mas fuerte
 * que esta (D-093, PND-120).
 */
export const EXCLUIDOS_REGISTRADOS = new Map([
  [
    'vendor/',
    'codigo de terceros vendoreado: no es fuente de este repositorio y no se edita aca; su ' +
      'integridad la vigila build/terceros.mjs recalculando la huella que vendor/terceros.json ' +
      'declara (D-093)',
  ],
  [
    'docs/html/vendor/',
    'la copia publicada del mismo tercero, que build/build.mjs copia y build/terceros.mjs exige ' +
      'byte a byte igual a la congelada (D-093)',
  ],
]);

/** Normaliza el separador para que el registro se lea igual en Windows y en POSIX. */
const estaExcluido = (relativo) => {
  const r = relativo.split('\\').join('/');
  return [...EXCLUIDOS_REGISTRADOS.keys()].some((e) => r.startsWith(e));
};

/**
 * Devuelve { leidos, hallazgos }. Recibe el directorio Y la lista de archivos relativos
 * por argumento -- no la raiz clavada y no un recorrido fijo -- para que el arbol real se
 * pueda enumerar con git y la prueba en rojo pueda ejercitar un arbol de mentira: una
 * prueba que mutila un arbol que no es el suyo ya paso en este proyecto (PND-037) y dio
 * verde contando los archivos de otra copia.
 */
export function bytesDeControl(dir, archivos = recorrerDisco(dir)) {
  const hallazgos = [];
  let leidos = 0;
  let exentos = 0;
  for (const relativo of archivos) {
      if (!EXTENSIONES.some((e) => relativo.endsWith(e))) continue;
      if (estaExcluido(relativo)) { exentos++; continue; }
      const p = join(dir, relativo);
      leidos++;
      const bytes = readFileSync(p);
      for (let i = 0; i < bytes.length; i++) {
        const b = bytes[i];
        if ((b < 0x20 && !PERMITIDOS.has(b)) || b === 0x7f) {
          const linea = bytes.subarray(0, i).toString('latin1').split('\n').length;
          hallazgos.push({ archivo: p, offset: i, byte: '0x' + b.toString(16).padStart(2, '0'), linea });
          break;   // uno por archivo alcanza para nombrarlo
        }
      }
  }
  return { leidos, hallazgos, exentos };
}

/** Recorrido del disco, para el arbol de mentira de los rojos. */
export function recorrerDisco(dir, prefijo = '') {
  const salida = [];
  for (const entrada of readdirSync(join(dir, prefijo), { withFileTypes: true })) {
    if (SALTEAR.has(entrada.name)) continue;
    const relativo = prefijo ? join(prefijo, entrada.name) : entrada.name;
    if (entrada.isDirectory()) salida.push(...recorrerDisco(dir, relativo));
    else salida.push(relativo);
  }
  return salida;
}

/** El universo del arbol real: lo que git tiene versionado, enumerado y no adivinado. */
export function versionados(dir = raiz) {
  return execFileSync('git', ['ls-files', '-z'], { cwd: dir, encoding: 'utf8', maxBuffer: 1 << 28 })
    .split(String.fromCharCode(0)).filter(Boolean);   // -z: un NUL por separador, escrito sin poner un NUL en esta fuente
}

test('ningun archivo de texto versionado lleva bytes de control', () => {
  const { leidos, hallazgos } = bytesDeControl(raiz, versionados());
  // Primero que leyo algo: un recorrido que no encontro un solo archivo devuelve cero
  // hallazgos y eso no es un verde, es la misma trampa que el patron entre comillas de
  // `node --test`.
  assert.ok(leidos > 400, 'se leyeron ' + leidos + ' archivos de texto versionados, que son muy pocos para ser el arbol del metodo (medido el 2026-10-27: 531)');
  assert.deepEqual(
    hallazgos.map((h) => h.archivo + ':' + h.linea + ' (' + h.byte + ')'),
    [],
    'un byte de control deja el archivo invisible para grep, que lo clasifica como binario y lo saltea',
  );
});

test('cada exclusion del registro sigue salteando algo real', () => {
  // La leccion de D-086, bajada a este registro: una exclusion que ya no selecciona nada es una
  // guarda apagada sobre un arbol que cambio de forma, y no se nota nunca porque sigue dando
  // verde. Si manana el tercero se saca, esta prueba cae y el registro se limpia en el acto.
  const todos = versionados().map((r) => r.split('\\').join('/'));
  const sinUso = [...EXCLUIDOS_REGISTRADOS.keys()]
    .filter((e) => !todos.some((r) => r.startsWith(e) && EXTENSIONES.some((x) => r.endsWith(x))));
  assert.deepEqual(sinUso, [], 'una exclusion que ya no saltea nada sobra: sacala del registro');
  assert.ok(bytesDeControl(raiz, versionados()).exentos > 0, 'el registro no salteo un solo archivo');
});

test('ROJO: un NUL en una fuente sale nombrado, con su archivo y su linea', () => {
  const tmp = mkdtempSync(join(tmpdir(), 'urazuke-control-'));
  mkdirSync(join(tmp, 'build'));
  writeFileSync(join(tmp, 'build', 'limpio.mjs'), 'export const a = 1;\n');
  writeFileSync(join(tmp, 'build', 'sucio.mjs'), Buffer.from("const x = '\0';\nconst y = 2;\n", 'latin1'));

  const { leidos, hallazgos } = bytesDeControl(tmp);
  assert.equal(leidos, 2);
  assert.equal(hallazgos.length, 1, 'cae el sucio y no el limpio');
  assert.match(hallazgos[0].archivo, /sucio\.mjs$/);
  assert.equal(hallazgos[0].byte, '0x00');
  assert.equal(hallazgos[0].linea, 1, 'y dice en que linea, que es lo que grep no puede decir');
});

test('ROJO: no es un colador -- un arbol limpio devuelve cero y un arbol vacio no pasa por limpio', () => {
  const limpio = mkdtempSync(join(tmpdir(), 'urazuke-control-limpio-'));
  writeFileSync(join(limpio, 'a.mjs'), 'export const a = 1;\n');
  writeFileSync(join(limpio, 'b.md'), '# titulo\n\ncon tabulador\ty retorno\r\n');
  assert.deepEqual(bytesDeControl(limpio).hallazgos, [], 'el tabulador y el retorno de carro estan permitidos');
  assert.equal(bytesDeControl(limpio).leidos, 2);

  const vacio = mkdtempSync(join(tmpdir(), 'urazuke-control-vacio-'));
  writeFileSync(join(vacio, 'imagen.png'), Buffer.from([0x89, 0x50, 0x00, 0x01]));
  const r = bytesDeControl(vacio);
  assert.equal(r.leidos, 0, 'lo que no es texto no se lee');
  assert.deepEqual(r.hallazgos, [], 'y por lo tanto no se reporta: el cero de arriba es lo que lo distingue de un verde');
});
