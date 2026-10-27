// La forma de la pregunta, contra el arbol y contra el dato (UX-28, D-070).
//
// Por que existe. El metodo ordenaba preguntar veintidos veces y no decia como. Ahora la forma
// es una regla con identificador y una clausula en los prompts; esta prueba es lo que impide que
// la clausula se caiga de un idioma sin que nadie se entere, que es lo unico de esto que una
// maquina puede vigilar.
//
// Y trae sus rojos deliberados, por el mismo motivo que los del validador: una comprobacion que
// nadie vio caer no demuestra que guarde nada. En este proyecto ya pasaron cinco guardas
// dormidas; esta nace con las dos direcciones ejercitadas.
//
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cargarFuentes } from '../build/gates_lib.mjs';
import {
  IDIOMAS, CLAUSULA_EN, TRADUCCIONES, CAMPO,
  bloquesDeCita, clausulasQueFaltan, simetriaConElDato, leerArbol, contar,
} from '../build/forma_de_la_pregunta.mjs';

const arbol = leerArbol();
const fuentes = cargarFuentes();

test('A: la clausula inglesa esta en todos los prompts de los ocho idiomas', () => {
  const hallazgos = clausulasQueFaltan(arbol).filter((h) => h.includes('clausula inglesa'));
  assert.deepEqual(hallazgos, [], 'la pieza inglesa es una sola y esta en todos');
  const { prompts } = contar(arbol);
  assert.equal(prompts, 576, 'setenta y dos prompts por ocho idiomas');
});

test('B: cada bloque de traduccion lleva la clausula de su idioma', () => {
  const hallazgos = clausulasQueFaltan(arbol).filter((h) => h.includes('la traduccion ['));
  assert.deepEqual(hallazgos, []);
  const { traducciones } = contar(arbol);
  assert.equal(traducciones, 504, 'setenta y dos por los siete idiomas que traducen la pieza');
  assert.deepEqual(Object.keys(TRADUCCIONES).sort(), IDIOMAS.filter((i) => i !== 'en').sort(),
    'el ingles no traduce su propia pieza: el prompt ya esta en ingles');
});

test('C: los tres niveles de la clausula son los que declara el dato', () => {
  assert.deepEqual(simetriaConElDato(fuentes.schema), []);
  assert.deepEqual(fuentes.schema.enums[CAMPO], ['beginner', 'decision_maker', 'technical']);
  assert.ok(CAMPO in fuentes.schema.project_config.fields,
    'el contrato de configuracion declara el campo: una herramienta no lo adivina');
});

test('la regla existe en el dato con la severidad y el instrumento que el anexo declara', () => {
  const r = fuentes.heuristics.rules.find((x) => x.id === 'UX-28');
  assert.ok(r, 'UX-28 esta en gates/heuristics.json');
  assert.equal(r.group, 'usability');
  assert.equal(r.family, 'B6');
  assert.equal(r.initial_severity, 'warns', 'avisa: ninguna prueba puede mirar una pregunta concreta');
  assert.equal(r.human_red, true);
  assert.equal(r.timing.value, 'pending_close');
  assert.equal(r.checker_declared_by, 'owner');
  assert.deepEqual(r.anchor.steps, [1], 'se ancla donde nace el contrato de convivencia');
});

/* ---------- los rojos deliberados ---------- */

test('rojo deliberado: a un prompt le falta la clausula', () => {
  const roto = JSON.parse(JSON.stringify(arbol));
  roto.es[0].texto = roto.es[0].texto.replace(CLAUSULA_EN.slice(0, 40), 'When you need a decision from me, just ask');
  const hallazgos = clausulasQueFaltan(roto);
  assert.ok(hallazgos.some((h) => h.includes('no lleva la clausula inglesa')),
    'tiene que caer nombrando el archivo y el bloque: ' + JSON.stringify(hallazgos.slice(0, 2)));
});

test('rojo deliberado: una traduccion perdio la clausula', () => {
  const roto = JSON.parse(JSON.stringify(arbol));
  roto.it[0].texto = roto.it[0].texto.replace(TRADUCCIONES.it, 'le quattro parti');
  const hallazgos = clausulasQueFaltan(roto);
  assert.ok(hallazgos.some((h) => h.includes('la traduccion [it] no lleva la clausula')), JSON.stringify(hallazgos.slice(0, 2)));
});

// Los tres rojos del dato se alimentan de un esquema LITERAL y no del vivo, por dos motivos:
// el rojo tiene que ser el de la mutacion y no el del estado del arbol, y un recibo de rojo que
// corre esta prueba contra un arbol anterior no tiene que explotar por un campo que ahi no
// existia. Es el defecto que el rojo de la version fijada tuvo hasta hoy (herramienta PND-049).
const ESQUEMA_MINIMO = {
  enums: { [CAMPO]: ['beginner', 'decision_maker', 'technical'] },
  project_config: { fields: { [CAMPO]: 'declarado' } },
};

test('rojo deliberado: el dato declara un nivel que la clausula no nombra', () => {
  const schema = { ...ESQUEMA_MINIMO, enums: { [CAMPO]: [...ESQUEMA_MINIMO.enums[CAMPO], 'auditor'] } };
  const hallazgos = simetriaConElDato(schema);
  assert.ok(hallazgos.some((h) => h.includes('no nombra el nivel "auditor"')), JSON.stringify(hallazgos));
});

test('rojo deliberado: la clausula nombra un nivel que el dato no declara', () => {
  const hallazgos = simetriaConElDato(ESQUEMA_MINIMO, CLAUSULA_EN.replace('`technical`', '`expert`'));
  assert.ok(hallazgos.some((h) => h.includes('nombra "expert"')), JSON.stringify(hallazgos));
  assert.ok(hallazgos.some((h) => h.includes('no nombra el nivel "technical"')), 'y el que falta');
});

test('rojo deliberado: el contrato de configuracion no declara el campo', () => {
  const schema = { ...ESQUEMA_MINIMO, project_config: { fields: {} } };
  const hallazgos = simetriaConElDato(schema);
  assert.ok(hallazgos.some((h) => h.includes('no declara el campo')), JSON.stringify(hallazgos));
});

test('rojo deliberado: el dato no declara el enum', () => {
  const schema = { ...ESQUEMA_MINIMO, enums: {} };
  const hallazgos = simetriaConElDato(schema);
  assert.ok(hallazgos.length === 1 && hallazgos[0].includes('no declara el enum'),
    'un solo hallazgo, y dice que el dato no tiene los niveles: ' + JSON.stringify(hallazgos));
});

test('rojo deliberado: un bloque con una etiqueta de idioma que nadie declaro', () => {
  const roto = { es: [{ ruta: 'inventado.md', texto: '> [xx]\n> algo en un idioma que el metodo no declara.\n' }] };
  const hallazgos = clausulasQueFaltan(roto);
  assert.ok(hallazgos.some((h) => h.includes('etiqueta de idioma "xx"')), JSON.stringify(hallazgos));
});

test('la lectura de bloques distingue el prompt de su traduccion', () => {
  const md = '> el prompt.\n\n> [es]\n> la traduccion.\n\ntexto suelto\n';
  assert.deepEqual(bloquesDeCita(md), [
    { etiqueta: null, texto: 'el prompt.' },
    { etiqueta: 'es', texto: '[es] la traduccion.' },
  ]);
});
