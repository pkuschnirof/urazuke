// Las cifras del nivel de datos contra las cuentas reales del dato (D-077, PND-064).
//
// Por que existe. El documento generado docs/COMPUERTAS.md decia "The four that block with a
// **human red**" y listaba CINCO identificadores, porque la lista sale del dato y el numero
// estaba escrito a mano; y de esos cinco, uno avisa y no bloquea, asi que la frase atribuia
// ademas una severidad que el dato no declara. La oracion era cierta el dia que se escribio y
// dejo de serlo cuando UX-28 entro (D-070), sin que cayera nada, en un archivo que se publica y
// que dice de si mismo "This document is generated. Do not edit it".
//
// La prueba que mas importa de este archivo no es la primera: es la que exige que una coleccion
// NUEVA del dato quede vigilada sin que nadie toque ninguna lista. Sin ella, esta guarda seria
// otra enumeracion escrita a mano --la forma exacta del defecto que persigue-- y diria "0
// hallazgos" con razon el dia que entre la coleccion que nadie agrego, que es el defecto que
// D-071 ya dejo escrito.
//
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cargarFuentes, cardinal, Cardinal } from '../build/gates_lib.mjs';
import {
  comprobar, leerArbol, colecciones, coleccionesConAlias, menciones, numeroDe, corridasDe,
  candidatoDe, identificadoresDeclarados, arreglosDe, sustantivoDe,
  UNIVERSO, EXENTOS, ALIAS, FUENTES_DE_COLECCIONES,
} from '../build/cifras_derivadas.mjs';

const { arbol, presentes } = leerArbol();
const fuentes = cargarFuentes();
const fuentesParseadas = Object.fromEntries(FUENTES_DE_COLECCIONES.map((r) => [r, JSON.parse(arbol[r])]));

test('ninguna cifra del nivel de datos contradice la cuenta que el dato declara', () => {
  const { hallazgos } = comprobar(arbol, presentes);
  assert.deepEqual(hallazgos, [], 'cifras que el dato no sostiene:\n  ' + hallazgos.join('\n  '));
});

test('el universo se mira entero, y no haber podido mirar seria rojo', () => {
  const { mirados } = comprobar(arbol, presentes);
  assert.equal(mirados, UNIVERSO.length, 'se miraron ' + mirados + ' de ' + UNIVERSO.length + ' archivos del universo');
  for (const clase of ['fuente', 'generado', 'publicado']) {
    assert.ok(UNIVERSO.some((u) => u.clase === clase), 'el universo dejo de cubrir la clase ' + clase);
  }
});

test('la guarda mide cifras de verdad: no da verde por no haber encontrado ninguna', () => {
  const { mediciones } = comprobar(arbol, presentes);
  assert.ok(mediciones >= 25, 'solo midio ' + mediciones + ' cifras: un verde con cero mediciones no es un verde');
});

/* ------------------------------------------------------------------ *
 * B. el mapa se deriva del dato
 * ------------------------------------------------------------------ */

test('las colecciones salen del dato y no de una lista escrita', () => {
  const mapa = colecciones(fuentesParseadas);
  assert.equal(mapa.get('rules').cuenta, fuentes.heuristics.rules.length);
  assert.equal(mapa.get('steps').cuenta, fuentes.steps.steps.length);
  assert.equal(mapa.get('stations').cuenta, fuentes.stations.stations.length);
  assert.equal(mapa.get('anchors').cuenta, fuentes.heuristics.anchors.length);
  assert.equal(mapa.get('prior inputs').cuenta, fuentes.heuristics.prior_inputs.length);
  assert.equal(mapa.get('artifacts').cuenta, fuentes.heuristics.artifacts.length);
  assert.equal(mapa.get('evaluators').cuenta, fuentes.evaluators.evaluators.length);
});

test('una coleccion NUEVA del dato queda vigilada sin tocar ninguna lista de esta guarda', () => {
  const copia = { ...fuentesParseadas };
  copia['gates/adapters.json'] = { ...copia['gates/adapters.json'], belts: [{ id: 'a' }, { id: 'b' }] };
  const mapa = colecciones(copia);
  assert.equal(mapa.get('belts')?.cuenta, 2, 'la coleccion nueva no quedo vigilada: la guarda seria otra lista a mano');
});

test('un sustantivo con dos cuentas distintas queda AMBIGUO y no se compara contra ninguna', () => {
  const copia = { ...fuentesParseadas };
  copia['gates/adapters.json'] = { ...copia['gates/adapters.json'], rules: [{ id: 'a' }] };
  const mapa = colecciones(copia);
  assert.equal(mapa.get('rules').ambigua, true, 'dos colecciones con el mismo nombre y cuentas distintas tienen que marcarse ambiguas');
});

test('la profundidad se corta en 2: las listas de cada elemento no son colecciones declaradas', () => {
  const arreglos = arreglosDe({ a: [1, 2], b: { c: [1, 2, 3], d: { e: [1] } } });
  assert.deepEqual(arreglos.map((x) => x.clave), ['a', 'b.c']);
  assert.equal(sustantivoDe('prior_inputs'), 'prior inputs');
});

/* ------------------------------------------------------------------ *
 * C. el registro: alias y exenciones
 * ------------------------------------------------------------------ */

test('todo alias resuelve a una coleccion que el dato declara', () => {
  const { hallazgos } = coleccionesConAlias(fuentesParseadas);
  assert.deepEqual(hallazgos, [], 'alias colgantes:\n  ' + hallazgos.join('\n  '));
  for (const a of ALIAS) assert.ok(a.razon.length >= 40, 'el alias ' + a.palabra + ' no trae su razon escrita');
});

test('toda exencion trae su razon escrita y sigue salteando algo real', () => {
  for (const e of EXENTOS) {
    assert.ok(e.razon && e.razon.length >= 40, 'la exencion ' + e.id + ' no trae su razon escrita');
    assert.ok(['archivo', 'camino', 'linea'].includes(e.forma), 'la exencion ' + e.id + ' no declara una forma conocida');
  }
  const { hallazgos } = comprobar(arbol, presentes);
  assert.ok(!hallazgos.some((h) => /no salteo nada|no esta en el arbol/.test(h)),
    'hay una exencion que sobrevivio a lo que la justificaba:\n  ' + hallazgos.join('\n  '));
});

/* ------------------------------------------------------------------ *
 * El deletreador y el lector de numeros
 * ------------------------------------------------------------------ */

test('el deletreador deletrea y no improvisa arriba de su alcance', () => {
  assert.equal(cardinal(0), 'zero');
  assert.equal(cardinal(5), 'five');
  assert.equal(cardinal(12), 'twelve');
  assert.equal(cardinal(24), 'twenty-four');
  assert.equal(cardinal(46), 'forty-six');
  assert.equal(cardinal(99), 'ninety-nine');
  assert.equal(Cardinal(4), 'Four');
  assert.throws(() => cardinal(100), /hasta 99/);
  assert.throws(() => cardinal(-1), /hasta 99/);
  assert.throws(() => cardinal(2.5), /hasta 99/);
  for (let n = 0; n <= 99; n += 1) {
    assert.equal(numeroDe(cardinal(n)), n, 'el deletreador y el lector tienen que ser inversos en ' + n);
    assert.ok(/^[\x20-\x7e]+$/.test(cardinal(n)), cardinal(n) + ' no es ASCII puro, y el nivel de datos lo es (D-051)');
  }
});

test('el lector de numeros lee cardinales y digitos, y nada mas', () => {
  assert.equal(numeroDe('Twelve'), 12);
  assert.equal(numeroDe('46'), 46);
  assert.equal(numeroDe('rules'), null);
  assert.equal(numeroDe('twentyfour'), null);
});

/* ------------------------------------------------------------------ *
 * A. las menciones, y los dos falsos positivos medidos
 * ------------------------------------------------------------------ */

test('una cifra pegada al nombre de una coleccion se lee como su cuenta', () => {
  const { mapa } = coleccionesConAlias(fuentesParseadas);
  const m = menciones('The forty-six rules and the five anchors', mapa);
  assert.deepEqual(m.map((x) => [x.coleccion, x.numero]), [['rules', 46], ['anchors', 5]]);
});

test('no se lee como cuenta un "one of" que enumera valores posibles', () => {
  const { mapa } = coleccionesConAlias(fuentesParseadas);
  // El keyed_by de labels.json: "<kind> is one of steps, stations or rules". Enumera, no cuenta.
  assert.deepEqual(menciones('where <kind> is one of steps, stations or rules', mapa), []);
});

test('no se lee como cuenta un numero separado del sustantivo por otra palabra', () => {
  const { mapa } = coleccionesConAlias(fuentesParseadas);
  // 'hash covers' son 16 y 'covers' son 6: sin esta exigencia, una se lee como la otra.
  assert.deepEqual(menciones('sixteen hash covers', mapa).map((x) => [x.coleccion, x.numero]), [['hash covers', 16]]);
  assert.deepEqual(menciones('five of the forty-six rules', mapa).map((x) => [x.coleccion, x.numero]), [['rules', 46]]);
});

/* ------------------------------------------------------------------ *
 * A2. las enumeraciones de identificadores
 * ------------------------------------------------------------------ */

test('los identificadores vigilados salen del dato', () => {
  const ids = identificadoresDeclarados(fuentesParseadas);
  for (const r of fuentes.heuristics.rules) assert.ok(ids.has(r.id), 'falta el id ' + r.id);
  for (const p of fuentes.steps.steps) assert.ok(ids.has(p.id), 'falta el id ' + p.id);
});

test('una corrida de ids es una enumeracion, y un rango la corta', () => {
  const ids = identificadoresDeclarados(fuentesParseadas);
  const enumeracion = corridasDe('-- CQ-12, CQ-14, UX-22, UX-27, UX-28 --', ids);
  assert.equal(enumeracion.length, 1);
  assert.equal(enumeracion[0].cuenta, 5);
  // El `what` de heuristics.json: "18 of code quality (CQ-01 to CQ-18)". Un rango no es una lista.
  assert.deepEqual(corridasDe('18 of code quality (CQ-01 to CQ-18)', ids), []);
});

test('el candidato descarta el numero calificado y el que ya explica una coleccion', () => {
  const { mapa } = coleccionesConAlias(fuentesParseadas);
  const texto = 'A **human red** is carried by five of the forty-six rules -- CQ-12, CQ-14, UX-22, UX-27, UX-28 --';
  const corrida = corridasDe(texto, identificadoresDeclarados(fuentesParseadas))[0];
  // 'forty-six' queda descartado porque lo sigue el nombre de una coleccion: es cuenta de las
  // reglas, no de la lista. El candidato es 'five', y es la cuenta de la enumeracion.
  assert.equal(candidatoDe(texto, corrida.desde, mapa).numero, 5);
  assert.equal(corrida.cuenta, 5);
  // '(step 2)' nombra un peldano: no cuenta la lista que viene despues.
  const calificado = 'the user glossary (step 2): without it, UX-01 and UX-24 have nothing to compare against';
  const otra = corridasDe(calificado, identificadoresDeclarados(fuentesParseadas))[0];
  assert.equal(candidatoDe(calificado, otra.desde, mapa), null);
});

/* ------------------------------------------------------------------ *
 * El documento generado: la frase que origino la guarda, derivada
 * ------------------------------------------------------------------ */

test('la frase del rojo humano se deriva del dato, cuenta y severidad', () => {
  const doc = arbol['docs/COMPUERTAS.md'];
  const humanas = fuentes.heuristics.rules.filter((r) => r.human_red);
  const bloquean = humanas.filter((r) => r.initial_severity === 'blocks');
  const avisan = humanas.filter((r) => r.initial_severity !== 'blocks');
  assert.ok(doc.includes('carried by ' + cardinal(humanas.length) + ' of the ' + cardinal(fuentes.heuristics.rules.length) + ' rules'),
    'el documento no dice la cuenta que el dato declara para el rojo humano');
  assert.ok(doc.includes(humanas.map((r) => r.id).join(', ')), 'el documento no lista las reglas que el dato marca');
  assert.ok(doc.includes(Cardinal(bloquean.length) + ' of them block'),
    'el documento no separa las que bloquean de las que avisan, que es la mitad del defecto que esto arreglo');
  assert.ok(avisan.length === 0 || doc.includes(cardinal(avisan.length) + ' ' + (avisan.length === 1 ? 'warns' : 'warn')),
    'el documento no dice cuantas avisan');
});

test('los encabezados del anexo en el documento llevan la cuenta del dato', () => {
  const doc = arbol['docs/COMPUERTAS.md'];
  assert.ok(doc.includes('### The ' + cardinal(fuentes.heuristics.anchors.length) + ' anchors and the '
    + cardinal(fuentes.heuristics.prior_inputs.length) + ' prior inputs'));
  assert.ok(doc.includes('### The ' + cardinal(fuentes.heuristics.artifacts.length) + ' artifacts'));
});

test('el scope del catalogo de textos cuenta los evaluadores que el dato declara', () => {
  const pub = JSON.parse(arbol['docs/html/api/labels.json']);
  const exclusion = pub.scope.excluded.find((e) => /evaluator vocabulary/.test(e.kind));
  assert.ok(exclusion, 'la exclusion del vocabulario de evaluadores desaparecio del scope');
  assert.match(exclusion.measured, new RegExp('^' + Cardinal(fuentes.evaluators.evaluators.length) + ' evaluator names'),
    'la exclusion declara una cuenta que el dato no sostiene, adentro de lo que cubre la huella');
});
