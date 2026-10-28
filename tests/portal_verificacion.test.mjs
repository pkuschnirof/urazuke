// La verificacion de que produccion sirve lo que se publico tiene que decir QUE vio.
//
// El 2026-10-23 la publicacion de 9a31494 salio bien -- el portal commiteo 161e74d a
// las 12:23:17 y su despliegue cerro verde a las 12:23:52 -- y el paso que verifica
// dio 40 intentos (20 por archivo, 13m17s) con "(sin respuesta)" y cerro avisando que
// produccion todavia no las servia. Era falso: produccion las servia, y el primer
// intento corrio cuando todavia estaba la version ANTERIOR, que es JSON valido con su
// huella, asi que un chequeo que mirara habria impreso la huella vieja.
//
// El defecto no era la red: era que las tres situaciones distintas -- no hubo
// respuesta, hubo respuesta ilegible, hubo respuesta buena con otra huella -- se
// colapsaban en una sola cadena, y la unica senal que las habria separado (el codigo
// HTTP, el error de curl) se tiraba a /dev/null. Un aviso que dice lo que no paso es
// peor que un rojo que dice lo que paso.
//
// Estas pruebas exigen la separacion sobre la funcion pura, sin red: la clasificacion
// de una sonda y el veredicto que sale de varias.
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { clasificar, codigoDeSalida, lineaVeredicto, CAMPO_VERSION, PREFIJO_MAX } from '../build/portal_verify.mjs';

const ESPERADA = '3bd03ac3bf79aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
const VIEJA = '8f9aa195001e2a00ab4dd67acbda6c3ec56b64199935a25120de132c9982905c';

// El campo donde el recurso declara su version es parte de la sonda: cada linea de version
// tiene el suyo, y clasificar() lo recibe en vez de adivinarlo (D-074).
const CAMPO = 'catalog_version';
const cuerpo = (h, version, campo = CAMPO) => JSON.stringify({ [campo]: version, content_hash: { value: h } });

/* ------------------------------------------------------------------ *
 * Las tres situaciones, separadas
 * ------------------------------------------------------------------ */

test('la huella que coincide se reporta como coincide', () => {
  const r = clasificar({ status: 200, cuerpo: cuerpo(ESPERADA, '2026.10.2') }, ESPERADA, CAMPO);
  assert.equal(r.estado, 'coincide');
  assert.match(r.detalle, /HTTP 200/);
});

test('una respuesta buena con otra huella es demora del despliegue, no ilegible', () => {
  const r = clasificar({ status: 200, cuerpo: cuerpo(VIEJA, '2026.10.1') }, ESPERADA, CAMPO);
  assert.equal(r.estado, 'otra_huella');
  // Lo que un chequeo que mira tiene que poder decir, y el defecto no decia: QUE sirve.
  assert.match(r.detalle, /8f9aa195001e/);
  assert.match(r.detalle, /2026\.10\.1/);
});

test('un fallo de red se reporta como ilegible y con el error a la vista', () => {
  const r = clasificar({ error: 'fetch failed: ECONNREFUSED' }, ESPERADA, CAMPO);
  assert.equal(r.estado, 'ilegible');
  assert.match(r.detalle, /ECONNREFUSED/);
});

test('un codigo HTTP que no es 200 se reporta con su codigo', () => {
  const r = clasificar({ status: 404, cuerpo: '<!DOCTYPE html><title>Not Found</title>' }, ESPERADA, CAMPO);
  assert.equal(r.estado, 'ilegible');
  assert.match(r.detalle, /HTTP 404/);
});

test('una respuesta que no es JSON se reporta con el principio del cuerpo', () => {
  const r = clasificar({ status: 200, cuerpo: '<html><body>Attention Required! Cloudflare</body></html>' }, ESPERADA, CAMPO);
  assert.equal(r.estado, 'ilegible');
  assert.match(r.detalle, /no es JSON/);
  assert.match(r.detalle, /Attention Required/);
});

test('un JSON sin content_hash se reporta como tal, que es lo que servia prompts.json', () => {
  // Es el caso exacto del 2026-10-23: produccion servia el prompts.json anterior, que
  // es JSON valido y no declara huella. El defecto lo llamaba "(sin respuesta)".
  const r = clasificar({ status: 200, cuerpo: JSON.stringify({ version: '1c29109', contracts: [] }) }, ESPERADA, CAMPO);
  assert.equal(r.estado, 'ilegible');
  assert.match(r.detalle, /no declara content_hash/);
});

/* ------------------------------------------------------------------ *
 * Lo que el defecto hacia: colapsar
 * ------------------------------------------------------------------ */

test('las situaciones distintas no comparten el mismo texto', () => {
  const detalles = [
    clasificar({ error: 'fetch failed' }, ESPERADA, CAMPO).detalle,
    clasificar({ status: 503, cuerpo: 'x' }, ESPERADA, CAMPO).detalle,
    clasificar({ status: 200, cuerpo: '<html>' }, ESPERADA, CAMPO).detalle,
    clasificar({ status: 200, cuerpo: JSON.stringify({ a: 1 }) }, ESPERADA, CAMPO).detalle,
    clasificar({ status: 200, cuerpo: cuerpo(VIEJA, '2026.10.1') }, ESPERADA, CAMPO).detalle,
  ];
  assert.equal(new Set(detalles).size, detalles.length);
  for (const d of detalles) assert.notEqual(d, '(sin respuesta)');
});

test('el principio del cuerpo queda acotado y en una sola linea', () => {
  const r = clasificar({ status: 200, cuerpo: '<html>\n<body>\n' + 'a'.repeat(5000) }, ESPERADA);
  assert.ok(r.detalle.length < PREFIJO_MAX + 200, 'el detalle no inunda el log: ' + r.detalle.length);
  assert.ok(!r.detalle.includes('\n'), 'el detalle entra en una linea');
});

/* ------------------------------------------------------------------ *
 * El veredicto: que sale rojo y que sale aviso
 * ------------------------------------------------------------------ */

test('todo coincide: verde', () => {
  assert.equal(codigoDeSalida({ 'gates.json': 'coincide', 'prompts.json': 'coincide' }), 0);
});

test('solo demoras: aviso', () => {
  assert.equal(codigoDeSalida({ 'gates.json': 'coincide', 'prompts.json': 'otra_huella' }), 2);
});

test('no haber podido mirar es rojo, y gana sobre la demora', () => {
  // Esta es la regla: la publicacion ocurrio y la evidencia falta. Eso no se reporta
  // como "el otro despliegue tarda", que es lo que paso el 2026-10-23.
  assert.equal(codigoDeSalida({ 'gates.json': 'ilegible', 'prompts.json': 'otra_huella' }), 1);
  assert.equal(codigoDeSalida({ 'gates.json': 'ilegible', 'prompts.json': 'coincide' }), 1);
});

/* ------------------------------------------------------------------ *
 * El reporte dice la version de CADA recurso, y la cuenta sale de la lista
 *
 * Medido el 2026-10-28, con el catalogo de textos recien publicado (D-074): la version
 * se buscaba con una cadena `catalog_version ?? corpus_version`, que es la misma lista
 * clavada que este archivo ya corrigio una vez, en otra forma. labels.json declara
 * `labels_version`, asi que el veredicto imprimia "(sin version declarada)" sobre un
 * archivo que la declara. La huella no mentia; el reporte si, y este programa existe
 * para reportar.
 * ------------------------------------------------------------------ */

test('la version se lee del campo que CADA recurso declara, sin adivinar el nombre', () => {
  // Recorre los recursos que el indice declara: un cuarto recurso con un cuarto nombre
  // de campo entra solo, sin que nadie tenga que agregarlo a esta prueba.
  const campos = Object.entries(CAMPO_VERSION);
  assert.ok(campos.length >= 3, 'el indice declara al menos los tres recursos: ' + campos.length);
  for (const [nombre, campo] of campos) {
    const r = clasificar({ status: 200, cuerpo: cuerpo(ESPERADA, '2026.10.77', campo) }, ESPERADA, campo);
    assert.equal(r.estado, 'coincide', nombre);
    assert.match(r.detalle, /2026\.10\.77/, nombre + ' tiene que decir su version (campo ' + campo + ')');
  }
});

test('cada recurso declara su propio nombre de campo: no hay dos que compartan uno', () => {
  // Si alguna vez dos recursos comparten el campo, la cadena `a ?? b` volveria a ser
  // suficiente y esta prueba deja de tener sentido; que caiga es la senal de releerla.
  const campos = Object.values(CAMPO_VERSION);
  assert.equal(new Set(campos).size, campos.length, 'los nombres de campo son distintos: ' + campos.join(', '));
});

test('un recurso que no declara su campo lo dice por su nombre, no "sin version declarada"', () => {
  const r = clasificar({ status: 200, cuerpo: JSON.stringify({ content_hash: { value: ESPERADA } }) }, ESPERADA, 'labels_version');
  assert.equal(r.estado, 'coincide');
  assert.match(r.detalle, /no declara labels_version/);
});

test('la linea del veredicto cuenta los recursos que hay, no los que habia', () => {
  // Decia "las dos huellas" con tres publicadas. Una cuenta escrita a mano en el texto
  // de un veredicto envejece igual que una lista escrita a mano.
  assert.match(lineaVeredicto(0, 3), /las 3 huellas/);
  assert.match(lineaVeredicto(0, 4), /las 4 huellas/);
  assert.ok(!/las dos huellas/.test(lineaVeredicto(0, 3)), 'la cuenta no esta escrita a mano');
  // Los otros dos estados no cuentan huellas: dicen lo que paso.
  assert.match(lineaVeredicto(2, 3), /otra huella/);
  assert.match(lineaVeredicto(1, 3), /No se pudo leer produccion/);
});
