// La cuenta de reglas no vive en la prosa: los verdes de la guarda (D-090, PND-115).
//
// Lo que estas pruebas afirman es lo que la guarda puede afirmar, y nada mas. La que importa es la
// ultima: pone por escrito, ejecutable, el limite que la guarda declara en su cabecera, para que
// nadie lea "0 hallazgos" como "no hay cifras vencidas en la prosa".
//
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import {
  leerArbol, comprobar, deletreos, cuentasDeclaradas, documentos, idiomaDe,
  EXENTOS, EXENTOS_DE_ARBOL,
} from '../build/cuenta_de_reglas.mjs';
import { raiz } from '../build/gates_lib.mjs';

const { arbol, cuentas } = leerArbol();

test('el arbol commiteado no lleva ninguna cuenta de reglas en su prosa', () => {
  const r = comprobar(arbol, cuentas);
  assert.deepEqual(r.hallazgos.map((h) => h.archivo + ': ' + h.fragmento), []);
});

test('toda exencion del registro sigue salteando algo real (comprobacion C)', () => {
  assert.deepEqual(comprobar(arbol, cuentas).sinUso, []);
});

test('toda exencion de arbol sigue excluyendo algun documento que existe', () => {
  const todos = execFileSync('git', ['ls-files', '*.md'], { cwd: raiz, encoding: 'utf8' }).trim().split('\n');
  for (const e of EXENTOS_DE_ARBOL) {
    assert.ok(todos.some((f) => e.que.test(f)), 'la exencion de arbol "' + e.id + '" ya no excluye ningun documento del indice de git');
  }
});

test('cada exencion lleva su razon escrita, y la razon no es una linea sola', () => {
  for (const e of [...EXENTOS, ...EXENTOS_DE_ARBOL]) {
    assert.ok(typeof e.razon === 'string' && e.razon.length > 80, 'la exencion "' + e.id + '" no tiene una razon escrita');
  }
});

test('las cuentas se derivan del dato y no estan escritas en el programa', () => {
  const c = cuentasDeclaradas();
  const h = JSON.parse(execFileSync('git', ['show', 'HEAD:gates/heuristics.json'], { cwd: raiz, encoding: 'utf8' }));
  assert.equal(c.total, h.counts.total);
  assert.equal(c.total_menos_uno, h.counts.total - 1);
  assert.equal(c.usabilidad, h.counts.usability);
  assert.equal(c.caras, h.rules.reduce((n, r) => n + (r.faces?.length ?? 0), 0));
});

test('el universo es el indice de git y no un recorrido del disco', () => {
  const docs = documentos();
  assert.ok(docs.length > 200, 'el universo tiene ' + docs.length + ' documentos y eso es menos de lo que el corpus tiene');
  assert.ok(!docs.some((f) => f.includes('.forge/')), 'el universo se metio en el clon del propio repositorio que vive en el arbol de trabajo');
  assert.ok(docs.includes('docs/ANEXO_HEURISTICAS.md') && docs.includes('docs/zh/README.md'));
});

test('el deletreador da las formas que la prosa usa, en los ocho idiomas', () => {
  // Medidas contra el arbol anterior al 2026-11-07: son las que la prosa llevaba escritas.
  assert.deepEqual(deletreos(52, 'es'), ['cincuenta y dos']);
  assert.deepEqual(deletreos(51, 'es'), ['cincuenta y uno', 'cincuenta y una']);
  assert.deepEqual(deletreos(52, 'en'), ['fifty-two']);
  assert.deepEqual(deletreos(52, 'pt'), ['cinquenta e dois', 'cinquenta e duas']);
  assert.deepEqual(deletreos(52, 'fr'), ['cinquante-deux']);
  assert.deepEqual(deletreos(51, 'fr'), ['cinquante et un', 'cinquante et une']);
  assert.deepEqual(deletreos(52, 'de'), ['zweiundfünfzig']);
  assert.deepEqual(deletreos(52, 'it'), ['cinquantadue']);
  assert.deepEqual(deletreos(28, 'it'), ['ventotto']);
  assert.deepEqual(deletreos(51, 'it'), ['cinquantuno']);
  assert.deepEqual(deletreos(19, 'es'), ['diecinueve']);
  assert.deepEqual(deletreos(24, 'ja'), ['二十四']);
  assert.deepEqual(deletreos(52, 'zh'), ['五十二']);
  assert.deepEqual(deletreos(19, 'zh'), ['十九']);
});

test('el deletreador se niega arriba de su alcance en vez de improvisar', () => {
  assert.throws(() => deletreos(100, 'es'), /no improvisa/);
  assert.throws(() => deletreos(9, 'es'), /no improvisa/);
});

test('el idioma sale de la carpeta y el castellano es el default', () => {
  assert.equal(idiomaDe('docs/ANEXO_HEURISTICAS.md'), 'es');
  assert.equal(idiomaDe('README.md'), 'es');
  assert.equal(idiomaDe('docs/zh/peldanos/peldano-01-contrato-de-convivencia.md'), 'zh');
});

// EL LIMITE DECLARADO, PUESTO POR ESCRITO Y EJECUTABLE. La guarda no lee la prosa: ve la cifra el
// dia que se escribe (comprobacion B, que busca los valores que el dato declara) y la ve cuando la
// coleccion se mueve de uno (la forma "las otras N-1"). Una copia que el dato dejo atras por TRES
// --que es lo que paso entre el 2026-11-01 y el 2026-11-07-- y que no lleva el sustantivo al lado
// NO la ve ninguna de las dos. Esta prueba lo fija: si alguien un dia la hace caer, la guarda
// mejoro y esta prueba se cambia a proposito, no por accidente.
test('la guarda NO ve una cifra que el dato dejo atras por mas de uno y sin sustantivo al lado', () => {
  const copia = { ...arbol };
  copia['docs/ANEXO_HEURISTICAS.md'] = copia['docs/ANEXO_HEURISTICAS.md']
    .replace('se diferencia de las demás:', 'se diferencia de las otras cuarenta y siete:');
  assert.notEqual(copia['docs/ANEXO_HEURISTICAS.md'], arbol['docs/ANEXO_HEURISTICAS.md'], 'la mutacion no se aplico');
  const r = comprobar(copia, cuentas);
  assert.deepEqual(r.hallazgos, [], 'la guarda vio la cifra vencida: el limite de su cabecera quedo viejo y hay que reescribirlo');
});

test('y SI la ve el dia que se escribe, que es la forma en que esa frase nacio', () => {
  const copia = { ...arbol };
  copia['docs/ANEXO_HEURISTICAS.md'] = copia['docs/ANEXO_HEURISTICAS.md']
    .replace('se diferencia de las demás:', 'se diferencia de las otras cincuenta y una:');
  const r = comprobar(copia, cuentas);
  assert.equal(r.hallazgos.length, 1);
  assert.equal(r.hallazgos[0].comprobacion, 'B');
  assert.equal(r.hallazgos[0].cuenta, 'total_menos_uno');
});
