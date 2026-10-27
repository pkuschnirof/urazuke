// Los rojos deliberados de la guarda de la version fijada (D-068, PND-055).
//
// Por que existe. Es la regla de este repositorio y la leccion que ya costo cuatro veces: una
// comprobacion que nadie vio caer no demuestra que guarde nada. Asi que cada comprobacion de
// build/version_fijada.mjs se alimenta aca con un arbol mutilado a proposito y tiene que caer
// nombrando lo suyo.
//
// Se muta el INSUMO, no el programa: las comprobaciones son puras, asi que la mutacion es una
// copia del arbol real con una cosa cambiada. Nada de esto toca el disco. Los rojos del
// VALIDADOR --procedencia ausente, procedencia inventada, contrato de fijacion mutilado--
// viven en tests/gates_validador_en_rojo.test.mjs, que es donde estan todos los suyos.
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  TOKEN,
  prosaQueNoNombraLaFijacion,
  sinProcedencia,
  diferencial,
  compararVersiones,
  evaluadoresQueTraban,
  leerArbol,
} from '../build/version_fijada.mjs';

const arbol = leerArbol();

const conTextoCambiado = (textos, idioma, cual, f) => ({
  ...textos,
  [idioma]: { ...textos[idioma], [cual]: f === null ? undefined : f(textos[idioma][cual]) },
});

test('el token es el identificador del dato, en ingles, y viaja identico en los ocho', () => {
  assert.equal(TOKEN, 'catalog_version');
});

test('rojo 1: el documento principal de UN idioma deja de nombrar la fijacion', () => {
  // El japones a proposito: es el idioma donde una revision a ojo no ve el agujero.
  const mutado = conTextoCambiado(arbol.textosPorIdioma, 'ja', 'principal', (t) =>
    t.split(TOKEN).join('version_del_catalogo'),
  );
  assert.deepEqual(prosaQueNoNombraLaFijacion(mutado), ['ja/principal: no nombra catalog_version']);
});

test('rojo 2: el contrato del peldano 2 de UN idioma deja de nombrarla', () => {
  const mutado = conTextoCambiado(arbol.textosPorIdioma, 'zh', 'contrato', (t) => t.split(TOKEN).join('la version'));
  assert.deepEqual(prosaQueNoNombraLaFijacion(mutado), ['zh/contrato: no nombra catalog_version']);
});

test('rojo 3: un texto que no se pudo leer es hallazgo y no salteo', () => {
  const mutado = conTextoCambiado(arbol.textosPorIdioma, 'de', 'contrato', null);
  assert.deepEqual(prosaQueNoNombraLaFijacion(mutado), ['de/contrato (no se pudo leer)']);
});

test('rojo 4: el castellano tambien cuenta, que es donde ya paso lo contrario', () => {
  // Los siete README traducidos listaban el Anexo H y la fuente de verdad no (D-061). La
  // guarda no privilegia al castellano por ser la fuente: lo revisa igual que a los otros.
  const mutado = conTextoCambiado(arbol.textosPorIdioma, 'es', 'principal', (t) => t.split(TOKEN).join('la version'));
  assert.deepEqual(prosaQueNoNombraLaFijacion(mutado), ['es/principal: no nombra catalog_version']);
});

test('rojo 5: una entrada agregada a la que le falta la procedencia sale nombrada', () => {
  const mutadas = arbol.entradas.map((e) => (e.que === 'docs/PROFILES.md' ? { ...e, since_version: null } : e));
  const faltan = sinProcedencia(mutadas);
  assert.equal(faltan.length, 1);
  assert.match(faltan[0], /^step:2\.artifacts\[\d+\]$/);
});

test('rojo 6: la comparacion de versiones no es alfabetica', () => {
  // El rojo que importa: con comparacion de cadenas, "2026.10.9" > "2026.10.10" y el
  // diferencial de un upgrade saldria vacio justo cuando hay trabajo que mirar.
  assert.equal(compararVersiones('2026.10.10', '2026.10.9'), 1);
  assert.equal(compararVersiones('2026.10.9', '2026.10.10'), -1);
  assert.equal(compararVersiones('2026.10.7', '2026.10.7'), 0);
  assert.equal(compararVersiones('2027.1.1', '2026.12.9'), 1);
  const entradas = [{ donde: 'x', que: 'x', since_schema: 2, since_version: '2026.10.10' }];
  assert.equal(diferencial(entradas, '2026.10.9', '2026.10.10').length, 1);
});

test('rojo 7: el diferencial no incluye lo que entro EN la version fijada', () => {
  const entradas = [
    { donde: 'a', que: 'a', since_schema: 2, since_version: '2026.10.4' },
    { donde: 'b', que: 'b', since_schema: 2, since_version: '2026.10.5' },
  ];
  assert.deepEqual(diferencial(entradas, '2026.10.4', '2026.10.5').map((e) => e.que), ['b']);
  assert.deepEqual(diferencial(entradas, '2026.10.3', '2026.10.4').map((e) => e.que), ['a']);
});

test('rojo 8: un evaluador requerido nuevo sale nombrado con el peldano que traba', () => {
  // Es el caso que todavia no ocurrio entre dos versiones publicadas y va a ocurrir: la
  // guarda tiene que nombrar el peldano, no contar.
  const pasos = structuredClone(arbol.pasos);
  pasos.find((p) => p.num === 9).evaluators.push({ name: 'heuristics', since_schema: 2, since_version: '2026.10.7', required: true });
  assert.deepEqual(evaluadoresQueTraban(pasos, '2026.10.6', '2026.10.7'), [
    { peldano: 9, evaluador: 'heuristics', since_version: '2026.10.7' },
  ]);
  // Y uno que no es requerido avisa pero no traba: la distincion es del dato, no de la guarda.
  const sueltos = structuredClone(arbol.pasos);
  sueltos.find((p) => p.num === 9).evaluators.push({ name: 'heuristics', since_schema: 2, since_version: '2026.10.7', required: false });
  assert.deepEqual(evaluadoresQueTraban(sueltos, '2026.10.6', '2026.10.7'), []);
});

test('rojo 9: con el arbol real todas las mutaciones de arriba caen de a una, no en bloque', () => {
  // Un verde del arbol real es la unica manera de saber que los rojos de arriba son rojos de
  // la mutacion y no del estado del repositorio.
  assert.deepEqual(prosaQueNoNombraLaFijacion(arbol.textosPorIdioma), []);
  assert.deepEqual(sinProcedencia(arbol.entradas), []);
});
