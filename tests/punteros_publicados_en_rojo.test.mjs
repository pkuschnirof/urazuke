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
  enumsDeLaConfiguracion,
  cuentaDeEnums,
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

/* ------------------------------------------------------------------ *
 * Regla E: el enum nombrado por su nombre suelto (D-071, PND-059)
 * ------------------------------------------------------------------ */

test('rojo 11: el enum nombrado por su nombre suelto, que es el defecto que origino la regla', () => {
  const pub = clonar();
  // Esto es, textual, lo que 2026.10.8 publico: el nombre sin camino y sin lista de valores.
  pub.recursos['gates.json'].project_config.fields.communication_depth =
    'One of communication_depth: the technical depth at which the agent speaks to the owner (UX-28).';
  delete pub.recursos['gates.json'].project_config.enums;
  delete pub.recursos['gates.json'].project_config.enums_what;
  const h = enumsDeLaConfiguracion(pub);
  assert.ok(h.some((x) => x.token === 'communication_depth' && /nombre suelto/.test(x.por_que)),
    'el hallazgo tiene que nombrar el token, no solo decir que algo esta mal');
  assert.ok(h.some((x) => /no publica el bloque de enums/.test(x.por_que)));
  // Y la razon por la que la regla A no lo veia, que es lo que hace falsable a la E:
  assert.deepEqual(punterosQueNoResuelven(pub), [],
    'A solo reconoce caminos con punto, asi que decia la verdad: para los punteros que sabe ver, no habia ninguno roto');
});

test('rojo 12: el campo nombra un camino y el bloque no publica esa lista', () => {
  const pub = clonar();
  delete pub.recursos['gates.json'].project_config.enums.communication_depth;
  const h = enumsDeLaConfiguracion(pub);
  assert.ok(h.some((x) => x.token === 'communication_depth' && /no lo publica resuelto/.test(x.por_que)));
});

test('rojo 13: una lista publicada que ningun campo nombra es una copia sin consumidor', () => {
  const pub = clonar();
  pub.recursos['gates.json'].project_config.enums.verdict = ['green', 'red'];
  const h = enumsDeLaConfiguracion(pub);
  assert.ok(h.some((x) => x.token === 'verdict' && /ningun campo lo nombra/.test(x.por_que)));
});

test('rojo 14: el bloque publicado sin decir que es', () => {
  const pub = clonar();
  delete pub.recursos['gates.json'].project_config.enums_what;
  const h = enumsDeLaConfiguracion(pub);
  assert.equal(h.length, 1);
  assert.match(h[0].por_que, /no dice que son/);
});

test('rojo 15: sin configuracion de proyecto, no haber podido mirar es rojo y no verde', () => {
  const pub = clonar();
  delete pub.recursos['gates.json'].project_config;
  const h = enumsDeLaConfiguracion(pub);
  assert.equal(h.length, 1);
  assert.match(h[0].por_que, /no haber podido mirar es rojo/);
  assert.equal(cuentaDeEnums(pub), 0, 'y la cuenta en cero es lo que frena la linea de comandos');
});

