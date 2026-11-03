// Los rojos deliberados de la guarda de las cifras derivadas (D-077, PND-064).
//
// Por el mismo motivo que los del validador, los del inventario y los de las claves de
// configuracion: una comprobacion de coherencia que nadie vio caer no demuestra que guarde nada.
// Cada mutacion de abajo tiene que caer Y nombrar lo suyo; si cae por otra razon, la guarda
// estaria pasando por buena una razon equivocada, que es la forma en que una guarda se duerme sin
// que nadie lo note.
//
// La primera es el defecto EXACTO que origino la guarda, reproducido byte a byte como estaba
// commiteado hasta el 2026-10-30: "The four that block with a **human red**" con cinco
// identificadores al lado. Tiene que volver a caer si alguien lo reintroduce. Y hace falta que
// esta sea su propia prueba, porque la comprobacion A --la cifra pegada al nombre de una
// coleccion-- NO la ve: ahi el numero esta pegado a "that". Lo que la delata es la comprobacion
// A2, y sin este rojo nadie sabria que A2 hace falta.
//
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { comprobar, leerArbol, EXENTOS } from '../build/cifras_derivadas.mjs';

const { arbol, presentes } = leerArbol();

/** Corre la guarda sobre un arbol mutado. */
const correr = (mutar, presentesMutados = presentes) => {
  const copia = { ...arbol };
  mutar(copia);
  return comprobar(copia, presentesMutados).hallazgos;
};

/** Cambia un json de la copia sin tocar el del disco. */
const editarJson = (copia, ruta, cambiar) => {
  const objeto = JSON.parse(copia[ruta]);
  cambiar(objeto);
  copia[ruta] = JSON.stringify(objeto, null, 2);
};

const MUTACIONES = [
  // EL DEFECTO. La frase original, con su numero escrito y la lista que crecio abajo.
  ['la frase original: "The four that block" con cinco identificadores',
    /al lado de una enumeracion de 5 identificadores/,
    (c) => {
      c['docs/COMPUERTAS.md'] = c['docs/COMPUERTAS.md'].replace(
        /A \*\*human red\*\* is carried by[\s\S]*?not how hard it hits\./,
        'The four that block with a **human red** -- CQ-12, CQ-14, UX-22, UX-27, UX-28 -- are tested by no\n'
        + 'tool at all: they are verified at the close of the pending item, with the manual case in front, and\n'
        + 'never on a commit.');
    }],

  // La misma familia, en el encabezado de una seccion del documento generado.
  ['un encabezado del documento con la cuenta cambiada',
    /dice "nine artifacts" y el dato declara 3/,
    (c) => { c['docs/COMPUERTAS.md'] = c['docs/COMPUERTAS.md'].replace('### The three artifacts', '### The nine artifacts'); }],

  ['el encabezado de los anclajes con la cuenta cambiada',
    /dice "eight anchors" y el dato declara 5/,
    (c) => { c['docs/COMPUERTAS.md'] = c['docs/COMPUERTAS.md'].replace('The five anchors and the two prior inputs', 'The eight anchors and the two prior inputs'); }],

  // El dato crece y el artefacto publicado se queda con la cifra vieja: es el caso que importa,
  // porque esa cifra viaja ADENTRO de lo que cubre la huella del recurso.
  ['un evaluador nuevo, y el scope del publicado sigue diciendo doce',
    /labels\.json.*dice "Twelve evaluator names" y el dato declara 13/,
    (c) => editarJson(c, 'gates/evaluators.json', (j) => j.evaluators.push({ name: 'inventado', checks: 'nada' }))],

  ['una regla nueva, y el documento generado sigue diciendo cuarenta y nueve',
    /dice "forty-nine rules" y el dato declara 50/,
    (c) => editarJson(c, 'gates/heuristics.json', (j) => j.rules.push({ id: 'UX-99', group: 'usability', family: 'b6' }))],

  // La fuente que se mantiene a mano, que es la otra punta del universo.
  ['una fuente a mano que cuenta mal sus propias estaciones',
    /gates\/stations\.json what: dice "nine stations" y el dato declara 8/,
    (c) => editarJson(c, 'gates/stations.json', (j) => { j.what = j.what.replace('eight stations', 'nine stations'); })],

  // Direccion B: una coleccion que nadie agrego a ninguna lista.
  ['una coleccion nueva del dato, con su cifra mal escrita',
    /dice "nine belts" y el dato declara 2/,
    (c) => editarJson(c, 'gates/adapters.json', (j) => {
      j.belts = [{ id: 'a' }, { id: 'b' }];
      j.what = 'There are nine belts in this method.';
    })],

  // Dos colecciones con el mismo nombre y cuentas distintas: la guarda no adivina.
  ['un sustantivo ambiguo: la guarda lo dice en vez de elegir',
    /nombra una coleccion que el dato declara con dos cuentas distintas/,
    (c) => editarJson(c, 'gates/adapters.json', (j) => { j.stations = [{ id: 'a' }]; })],

  // No haber podido mirar es rojo y no verde (D-057, D-058).
  ['un archivo del universo que no se pudo leer',
    /docs\/COMPUERTAS\.md: no se pudo leer, y no haber podido mirar es rojo/,
    (c) => { delete c['docs/COMPUERTAS.md']; }],

  ['una fuente del dato que no es json valido',
    /gates\/heuristics\.json: no es json valido/,
    (c) => { c['gates/heuristics.json'] = '{ esto no es json'; }],

  // El registro de exenciones no puede sobrevivir a lo que lo justificaba (direccion D).
  ['el congelado que la exencion saltea y ya no esta en el arbol',
    /la exencion base-congelada saltea gates\/baseline\.json, que no esta en el arbol/,
    (c) => { void c; }, new Set()],

  ['una exencion que ya no selecciona nada',
    /la exencion cadenas-extraidas no salteo nada en todo el universo/,
    (c) => editarJson(c, 'docs/html/api/labels.json', (j) => { delete j.labels; })],
];

for (const [etiqueta, esperado, mutar, presentesMutados] of MUTACIONES) {
  test('rojo deliberado: ' + etiqueta, () => {
    const hallazgos = correr(mutar, presentesMutados ?? presentes);
    assert.ok(hallazgos.length > 0, 'la guarda no cayo: ' + etiqueta);
    assert.ok(hallazgos.some((h) => esperado.test(h)),
      'cayo por otra razon, y una guarda que cae por la razon equivocada esta dormida:\n  ' + hallazgos.join('\n  '));
  });
}

test('el arbol sin mutar no tiene hallazgos: los rojos de arriba los causan las mutaciones', () => {
  assert.deepEqual(comprobar(arbol, presentes).hallazgos, []);
});

test('toda exencion del registro esta ejercitada por un rojo o nombrada con su razon', () => {
  // No todas se pueden mutilar de a una (el enunciado del anexo y el texto de los prompts son
  // miles de cadenas), pero ninguna puede estar sin su razon escrita, que es lo que la vuelve un
  // registro y no una condicion escondida.
  for (const e of EXENTOS) assert.ok(e.razon.length >= 40, 'la exencion ' + e.id + ' no trae su razon');
  assert.equal(EXENTOS.length, new Set(EXENTOS.map((e) => e.id)).size, 'hay dos exenciones con el mismo id');
});
