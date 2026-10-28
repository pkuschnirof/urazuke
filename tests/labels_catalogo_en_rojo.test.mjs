// Los rojos deliberados del catalogo de textos (PND-011, D-074).
//
// Una guarda que nadie vio caer no demuestra que guarde nada, y en este proyecto ya paso
// cuatro veces: un verificador que existia y no corria nadie, una prueba en rojo clavada a
// la ruta de otra copia del arbol, dos pasos de la cadena corriendo en vacio en verde. Asi
// que las comprobaciones de build/labels_api.mjs son funciones puras, y esto les da de
// comer un arbol MUTILADO y exige que caigan nombrando lo suyo.
//
// Cada prueba de aca mutila UNA cosa y exige UN hallazgo que la nombre. Si una mutilacion
// pasara en verde, el catalogo podria publicarse con un identificador sin texto, o con un
// texto que nadie escribio en la prosa, y el consumidor lo recibiria con cara de dato
// verificado.
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { raiz } from '../build/gates_lib.mjs';
import {
  titulosDePeldanos,
  titulosDeEstaciones,
  enunciadosDeReglas,
  armarUnIdioma,
  armarContenido,
  tituloDeEncabezado,
  leerDato,
  leerTextos,
} from '../build/labels_api.mjs';

const dato = leerDato();
const leerDoc = (n) => readFileSync(join(raiz, 'docs', n), 'utf8').replace(/\r\n/g, '\n');
const PRINCIPAL = leerDoc('ESCALERA_METODOLOGICA.md');
const EVOLUTIVO = leerDoc('EVOLUTIVO_CORRECTIVO.md');
const ANEXO = leerDoc('ANEXO_HEURISTICAS.md');

const catalogo = { labels_version: 'de-prueba', version_scheme: { hash_covers: [], hash_excludes: [] } };

/* ------------------------------------------------------------------ *
 * Antes de los rojos: que el verde sea verde de verdad
 * ------------------------------------------------------------------ */

test('sin mutilar, los tres grupos salen completos y sin hallazgos', () => {
  const p = titulosDePeldanos(PRINCIPAL, dato.pasos);
  const e = titulosDeEstaciones(EVOLUTIVO, dato.estaciones);
  const r = enunciadosDeReglas(ANEXO, dato.reglas);
  assert.deepEqual([p.hallazgos, e.hallazgos, r.hallazgos], [[], [], []]);
  assert.equal(Object.keys(p.textos).length, dato.pasos.length);
  assert.equal(Object.keys(e.textos).length, dato.estaciones.length);
  assert.equal(Object.keys(r.textos).length, dato.reglas.length);
});

/* ------------------------------------------------------------------ *
 * Los peldanos
 * ------------------------------------------------------------------ */

/**
 * Saca de un documento la ficha entera del peldano que cita ese contrato. Es lo que pasa
 * cuando una traduccion se queda a medio replicar: el dato sigue declarando el peldano y la
 * prosa ya no lo tiene. Se hace sobre los trozos y no con una expresion regular de una
 * linea porque el encabezado de la ficha NO nombra el archivo del contrato: la cita vive
 * adentro del cuerpo, que es justo por lo que el extractor la busca ahi.
 */
function sinLaFichaDe(texto, cita) {
  const trozos = texto.split(/^### /m);
  const quedan = trozos.filter((t) => !t.includes(cita));
  assert.equal(quedan.length, trozos.length - 1, 'la mutilacion saco una ficha y una sola');
  return quedan.join('### ');
}

test('ROJO: a un peldano le sacan su ficha del documento principal', () => {
  const mutilado = sinLaFichaDe(PRINCIPAL, 'peldanos/peldano-07-');
  const { textos, hallazgos } = titulosDePeldanos(mutilado, dato.pasos);
  assert.equal(hallazgos.length, 1);
  assert.match(hallazgos[0], /u07-medir: no se encontro la ficha del peldano 7/);
  assert.equal('u07-medir' in textos, false, 'y no se publica a medias');
});

test('ROJO: una ficha se queda sin la raya que separa el titulo', () => {
  const mutilado = PRINCIPAL.replace(/^(### [^\n]*?) — /m, '$1: ');
  assert.notEqual(mutilado, PRINCIPAL);
  const { hallazgos } = titulosDePeldanos(mutilado, dato.pasos);
  assert.equal(hallazgos.length, 1);
  assert.match(hallazgos[0], /no lleva la raya del titulo/);
});

test('ROJO: una ficha tiene la raya y nada despues', () => {
  assert.equal(tituloDeEncabezado('Peldano 3 —   '), null, 'un titulo vacio no es un titulo');
  assert.equal(tituloDeEncabezado('Peldano 3 sin raya'), null);
  const mutilado = PRINCIPAL.replace(/^(### [^\n]*?) — [^\n]*/m, '$1 —');
  const { hallazgos } = titulosDePeldanos(mutilado, dato.pasos);
  assert.equal(hallazgos.length, 1);
  assert.match(hallazgos[0], /no lleva la raya del titulo/);
});

/* ------------------------------------------------------------------ *
 * Las estaciones
 * ------------------------------------------------------------------ */

test('ROJO: a una estacion le sacan su encabezado del camino evolutivo-correctivo', () => {
  const mutilado = EVOLUTIVO.replace(/^### N4 — .*$/m, '### Lo que venia siendo el cinturon');
  assert.notEqual(mutilado, EVOLUTIVO);
  const { textos, hallazgos } = titulosDeEstaciones(mutilado, dato.estaciones);
  assert.equal(hallazgos.length, 1);
  assert.match(hallazgos[0], /n4-cinturon-de-seguridad: no se encontro el encabezado de la estacion N4/);
  assert.equal('n4-cinturon-de-seguridad' in textos, false);
});

test('ROJO: el encabezado de una estacion pierde su raya', () => {
  const mutilado = EVOLUTIVO.replace(/^### N2 — /m, '### N2 ');
  const { hallazgos } = titulosDeEstaciones(mutilado, dato.estaciones);
  assert.equal(hallazgos.length, 1);
  assert.match(hallazgos[0], /n2-lectura-del-sistema: el encabezado no lleva la raya/);
});

/* ------------------------------------------------------------------ *
 * Las reglas del Anexo H
 * ------------------------------------------------------------------ */

test('ROJO: al anexo de un idioma le falta una regla que el dato declara', () => {
  const mutilado = ANEXO.replace(/^\| UX-12 \|.*$/m, '');
  assert.notEqual(mutilado, ANEXO);
  const { textos, hallazgos } = enunciadosDeReglas(mutilado, dato.reglas);
  assert.equal(hallazgos.length, 1);
  assert.match(hallazgos[0], /UX-12: la regla no esta en el anexo de este idioma/);
  assert.equal('UX-12' in textos, false);
});

// La direccion que nadie miraba. El validador contrastaba el anexo castellano contra el
// ingles; los otros seis idiomas podian quedarse con una fila que el dato ya no tiene y
// nada caia. Esto es lo que lo atrapa, y vale para los ocho.
test('ROJO: el anexo de un idioma trae una regla que el dato no tiene', () => {
  const inventada = '| CQ-99 | Forma | Una regla que nadie declaro. | Compuerta | BLOQUEA |';
  const mutilado = ANEXO.replace(/^\| CQ-01 \|.*$/m, (fila) => fila + '\n' + inventada);
  assert.notEqual(mutilado, ANEXO);
  const { hallazgos } = enunciadosDeReglas(mutilado, dato.reglas);
  assert.equal(hallazgos.length, 1);
  assert.match(hallazgos[0], /CQ-99: el anexo de este idioma trae una regla que el dato no tiene/);
});

test('ROJO: una fila del anexo aparece dos veces', () => {
  const mutilado = ANEXO.replace(/^\| CQ-03 \|.*$/m, (fila) => fila + '\n' + fila);
  const { hallazgos } = enunciadosDeReglas(mutilado, dato.reglas);
  assert.ok(hallazgos.some((h) => /CQ-03: aparece dos veces en el anexo/.test(h)));
});

/* ------------------------------------------------------------------ *
 * No haber podido mirar es rojo y no verde
 * ------------------------------------------------------------------ */

test('ROJO: un documento que no se pudo leer no se saltea en silencio', () => {
  const { labels, hallazgos } = armarUnIdioma({ principal: null, evolutivo: EVOLUTIVO, anexo: ANEXO }, dato);
  assert.equal(hallazgos.length, dato.pasos.length, 'los 24 peldanos quedan nombrados uno por uno');
  assert.deepEqual(labels.steps, {}, 'y no se publica ni uno');
  assert.ok(hallazgos.every((h) => h.startsWith('steps/')));
});

test('ROJO: el armado entero nombra el idioma y el archivo que falta', () => {
  const idiomas = ['es', 'xx'];
  const textos = { es: leerTextos('es'), xx: { principal: null, evolutivo: null, anexo: null } };
  const { hallazgos } = armarContenido(idiomas, textos, dato, catalogo);
  assert.ok(hallazgos.some((h) => h === 'xx/ESCALERA_METODOLOGICA.md: no se pudo leer'));
  assert.ok(hallazgos.some((h) => h === 'xx/EVOLUTIVO_CORRECTIVO.md: no se pudo leer'));
  assert.ok(hallazgos.some((h) => h === 'xx/ANEXO_HEURISTICAS.md: no se pudo leer'));
  assert.equal(hallazgos.filter((h) => h.startsWith('es/')).length, 0, 'y el idioma que si estaba no se ensucia');
});

test('ROJO: un idioma que no esta en el arbol se reporta, no se omite de la cuenta', () => {
  const { contenido, hallazgos } = armarContenido(['es', 'xx'], { es: leerTextos('es') }, dato, catalogo);
  assert.ok(hallazgos.length > 0);
  assert.equal(contenido.counts.languages, 2, 'la cuenta es la de los idiomas pedidos, no la de los que salieron bien');
  assert.deepEqual(contenido.labels.xx, { steps: {}, stations: {}, rules: {} });
});
