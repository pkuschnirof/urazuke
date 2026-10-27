// Los rojos deliberados de la guarda de punteros publicados (D-069, PND-056).
//
// Cada prueba mutila una copia en memoria de lo publicado y exige que la comprobacion CAIGA
// nombrando lo suyo. Una guarda que nadie vio caer no demuestra nada: es la unica forma de
// saber que el verde de tests/punteros_publicados.test.mjs es un verde.
//
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  leerPublicados,
  punterosQueNoResuelven,
  registrosSinUsar,
  simetriaDelRegistroDeVersiones,
  cuenta,
} from '../build/punteros_publicados.mjs';

const clonar = () => JSON.parse(JSON.stringify(leerPublicados()));

test('rojo 1: el puntero colgante que origino la guarda vuelve a entrar', () => {
  const pub = clonar();
  pub.recursos['gates.json'].pinning.consumer_contract.must_contrast =
    'It contrasts that pair against the version ledger declared in version_scheme.version_ledger. url fetch_url';
  const h = punterosQueNoResuelven(pub);
  assert.equal(h.length, 1);
  assert.equal(h[0].token, 'version_scheme.version_ledger');
  assert.match(h[0].por_que, /no es una clave de gates\.json/);
});

test('rojo 2: un puntero a una clave que el publicado perdio', () => {
  const pub = clonar();
  delete pub.recursos['gates.json'].heuristics;
  pub.recursos['gates.json'].what += ' See heuristics.switch_off for the registry.';
  const h = punterosQueNoResuelven(pub);
  assert.ok(h.some((x) => x.token === 'heuristics.switch_off' && x.en === 'what'));
});

test('rojo 3: el puntero cruzado declarado deja de resolver en su destino', () => {
  const pub = clonar();
  delete pub.recursos['gates.json'].languages.prose_versions;
  const h = punterosQueNoResuelven(pub);
  assert.ok(h.some((x) => x.recurso === 'prompts.json' && x.token === 'languages.prose_versions'
    && /resuelve en gates\.json y ahi no resuelve/.test(x.por_que)));
});

test('rojo 4: un registro de salteo que ya no se usa queda nombrado', () => {
  const pub = clonar();
  // Si ningun texto nombra mas un archivo .json, la entrada del registro sobra y hay que
  // sacarla: una exclusion que no se usa es una condicion escondida esperando su turno.
  pub.recursos['gates.json'].languages.exception = 'the frozen base keeps its language';
  pub.recursos['gates.json'].languages.text_language.verified = 'checked against the frozen base';
  pub.recursos['gates.json'].project_config.fields.frontend = 'declared by the project';
  const h = registrosSinUsar(pub);
  assert.ok(h.some((x) => x.registro === 'SUFIJOS_NO_CLAVE' && x.entrada === 'json'));
});

test('rojo 5: el puntero cruzado que ya no aparece queda nombrado', () => {
  const pub = clonar();
  pub.recursos['prompts.json'].what = 'The prompts of the method, published as data.';
  pub.recursos['prompts.json'].languages.note = 'One English piece, identical in every version.';
  const h = registrosSinUsar(pub);
  assert.ok(h.some((x) => x.registro === 'PUNTEROS_CRUZADOS' && /prompts\.json/.test(x.entrada)));
});

test('rojo 6: el indice se queda sin la direccion que baja una maquina', () => {
  const pub = clonar();
  for (const r of pub.indice.resources) delete r.version_ledger.fetch_url;
  const h = simetriaDelRegistroDeVersiones(pub);
  assert.equal(h.length, 2);
  for (const x of h) assert.match(x.por_que, /fetch_url/);
});

test('rojo 7: fetch_url apunta a otro archivo que el que el registro declara', () => {
  const pub = clonar();
  pub.indice.resources[0].version_ledger.fetch_url =
    'https://raw.githubusercontent.com/pkuschnirof/urazuke/main/gates/schema.json';
  const h = simetriaDelRegistroDeVersiones(pub);
  assert.ok(h.some((x) => /no termina en el path/.test(x.por_que)));
});

test('rojo 8: la clausula de fijacion deja de nombrar de donde se saca la direccion', () => {
  const pub = clonar();
  pub.recursos['gates.json'].pinning.consumer_contract.must_contrast =
    'It contrasts that pair against the version ledger, which lives in the method repository.';
  const h = simetriaDelRegistroDeVersiones(pub);
  assert.equal(h.length, 2);
  for (const x of h) assert.match(x.por_que, /no dice de donde se saca la direccion/);
});

test('rojo 9: sin indice, no haber podido mirar es rojo y no verde', () => {
  const pub = clonar();
  pub.indice = null;
  const h = simetriaDelRegistroDeVersiones(pub);
  assert.equal(h.length, 1);
  assert.match(h[0].por_que, /no haber podido mirar es rojo/);
});

test('rojo 10: un publicado sin un solo puntero no es un verde', () => {
  const pub = clonar();
  for (const nombre of Object.keys(pub.recursos)) pub.recursos[nombre] = { what: 'nada que apuntar' };
  assert.equal(cuenta(pub).tokens, 0);
  assert.deepEqual(punterosQueNoResuelven(pub), [], 'sin punteros no hay colgantes: por eso la cuenta cero la atrapa B y D, no A');
  assert.ok(registrosSinUsar(pub).length >= 3, 'los dos registros quedan sin usar y la guarda lo dice');
});
