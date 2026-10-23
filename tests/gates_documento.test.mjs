// docs/COMPUERTAS.md sale de los datos. Dos copias del mismo contenido se desincronizan
// solas: es el antipatron que persigue el peldano 11, y aca se verifica solo.
// Uso: node --test tests/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { raiz, cargarFuentes } from '../build/gates_lib.mjs';
import { generar } from '../build/gates_doc.mjs';

const enDisco = () => readFileSync(join(raiz, 'docs', 'COMPUERTAS.md'), 'utf8');

test('el documento en disco coincide, caracter por caracter, con lo que dan los datos', () => {
  assert.equal(enDisco(), generar(), 'corre: node build/gates_doc.mjs');
});

test('el documento dice que se genera, para que nadie lo edite a mano', () => {
  assert.match(enDisco(), /This document is generated/);
});

test('las cuarenta y cinco reglas aparecen con su enunciado, extraido del anexo', () => {
  const texto = enDisco();
  for (const r of cargarFuentes().heuristics.rules) {
    assert.ok(texto.includes('| ' + r.id + ' |'), 'falta la fila de ' + r.id);
  }
  assert.match(texto, /Neither less nor more: for each profile/, 'el enunciado sale del anexo ingles, no de los datos');
});

test('los veinticuatro peldanos y las ocho estaciones estan en el documento', () => {
  const texto = enDisco();
  const f = cargarFuentes();
  for (const s of f.steps.steps) assert.ok(texto.includes('`' + s.id + '`'), 'falta el peldano ' + s.id);
  for (const s of f.stations.stations) assert.ok(texto.includes('`' + s.id + '`'), 'falta la estacion ' + s.id);
});

test('el documento marca lo nuevo como nuevo, y no lo disimula entre lo viejo', () => {
  assert.match(enDisco(), /\*\*\(new in schema 2, anchor 1\)\*\*/);
  assert.match(enDisco(), /\*\*new in schema 2\*\*/);
});

test('el documento publica el umbral no declarado como no declarado', () => {
  assert.match(enDisco(), /\| `paths_per_function` \| CQ-04 \| - \| \*\*no\*\* \|/);
});

test('el documento dice que el texto de la base quedo en castellano, y por que', () => {
  const texto = enDisco();
  assert.match(texto, /reproduced in the Spanish of the\nmethod/, 'la excepcion esta escrita, no escondida');
  assert.match(texto, /the base is not edited \(D-051\)/);
});

test('el documento publica el contrato de configuracion que el consumidor tiene que escribir', () => {
  const texto = enDisco();
  for (const campo of Object.keys(cargarFuentes().schema.project_config.fields)) {
    assert.ok(texto.includes('| `' + campo + '` |'), 'falta el campo ' + campo + ' del contrato de configuracion');
  }
});
