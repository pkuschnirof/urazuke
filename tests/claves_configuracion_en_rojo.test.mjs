// Los rojos deliberados de la guarda de las claves de configuracion (D-075).
//
// Por el mismo motivo que los del validador y los del resumen del registro: una comprobacion de
// coherencia que nadie vio caer no demuestra que guarde nada. Cada mutacion de abajo tiene que
// caer Y nombrar lo suyo; si cae por otra razon, la guarda estaria pasando por buena una razon
// equivocada, que es la forma en que una guarda se duerme sin que nadie lo note.
//
// Las dos primeras son el defecto exacto que originó esta guarda, reproducido: la clave traducida
// y el nombre viejo del apagado. Tienen que volver a caer si alguien los reintroduce.
//
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cargarFuentes, extraerAnexo } from '../build/gates_lib.mjs';
import { validar } from '../build/gates_validate.mjs';
import { comprobar, leerArbol, ejemploDe, EXENTOS } from '../build/claves_configuracion.mjs';

const arbol = leerArbol();
const fuentes = cargarFuentes();
const IDIOMAS = Object.keys(arbol);

/** Muta todos los idiomas a la vez: lo que se ejercita es el nombre, no la divergencia. */
const enTodos = (de, a) => {
  const salida = {};
  for (const idioma of IDIOMAS) salida[idioma] = arbol[idioma].replace(de, a);
  return salida;
};

/** Muta un solo idioma: lo que se ejercita es la divergencia entre idiomas. */
const enUno = (idioma, de, a) => ({ ...arbol, [idioma]: arbol[idioma].replace(de, a) });

const MUTACIONES = [
  // El defecto que de verdad paso, idioma por idioma: la clave traducida.
  ['una clave traducida al castellano', /no es un nombre que el dato declare/,
    () => enTodos('"thresholds": {', '"umbrales": {')],
  ['una clave traducida al aleman', /no es un nombre que el dato declare/,
    () => enTodos('"switched_off": [', '"ausnahmen": [')],
  // El nombre viejo del apagado: el que hacia que la compuerta no viera la regla apagada.
  ['el nombre viejo del apagado (exceptions)', /switched_off.*no lo nombra|no es un nombre que el dato declare/,
    () => enTodos('"switched_off": [', '"exceptions": [')],
  // La ortografia britanica, que es la forma que mas facil se cuela.
  ['la ortografia britanica de authorized_by', /authorised_by.*no es un nombre que el dato declare/,
    () => enTodos('"authorized_by"', '"authorised_by"')],
  // El campo abreviado: review en vez de review_date.
  ['el campo abreviado review', /review.*no es un nombre que el dato declare|review_date.*no lo nombra/,
    () => enTodos('"review_date"', '"review"')],
  // Una clave que el contrato no declara, agregada al pasar.
  ['una clave de primer nivel que el dato no declara', /"?version"? no es un nombre que el dato declare|la clave version no es/,
    () => enTodos('{\n  "frontend"', '{\n  "version": 1,\n  "frontend"')],
  // Un campo declarado que el ejemplo deja de nombrar.
  ['un campo declarado que el ejemplo no muestra', /el dato declara real_users y el ejemplo/,
    () => enTodos('  "real_users": true,\n', '')],
  // Un umbral declarado que el ejemplo deja de nombrar: es el caso de PND-062 al reves.
  ['un umbral declarado que el ejemplo no muestra', /el umbral end_users_outside_the_organisation y el ejemplo/,
    () => enTodos(',\n    "end_users_outside_the_organisation": false', '')],
  // Un grupo de reglas que el ejemplo deja de nombrar.
  ['un grupo de reglas que el ejemplo no muestra', /el grupo usability y el ejemplo/,
    () => enTodos(',\n    "usability": true', '')],
  // La divergencia entre idiomas, que es la comprobacion A.
  ['un solo idioma con otra clave', /zh: no lleva las mismas claves/,
    () => enUno('zh', '"frontend"', '"front_end"')],
  // Una clave que no es ASCII: el nivel de datos lo es (D-051).
  ['una clave que no es ASCII', /no es ASCII pura/,
    () => enTodos('"real_users"', '"real_usuários"')],
  // El ejemplo que desaparece de la seccion 7.
  ['el ejemplo que ya no esta en la seccion 7', /tiene 0 bloques json/,
    () => enTodos('```json', '```jsonc')],
];

for (const [nombre, esperado, mutar] of MUTACIONES) {
  test('rojo deliberado: ' + nombre, () => {
    const mutado = mutar();
    assert.notEqual(JSON.stringify(mutado), JSON.stringify(arbol),
      'la mutacion no cambio nada: el ancla quedo vieja y este rojo no prueba nada');
    const { hallazgos } = comprobar(mutado, fuentes);
    assert.ok(hallazgos.length > 0, 'la mutacion paso en verde: la comprobacion no guarda nada');
    assert.ok(hallazgos.some((h) => esperado.test(h)),
      'cayo, pero no nombro el problema esperado (' + esperado + '):\n  ' + hallazgos.join('\n  '));
  });
}

test('rojo deliberado: una exencion sin su razon', () => {
  EXENTOS.push({ prefijo: 'inventado.', razon: '' });
  try {
    const { hallazgos } = comprobar(arbol, fuentes);
    assert.ok(hallazgos.some((h) => /exencion inventado\..*razon/.test(h)),
      'una exencion sin razon tiene que caer: si no, el registro se puede ampliar en silencio y la guarda se apaga sola');
  } finally {
    EXENTOS.pop();
  }
});

test('rojo deliberado: el nombre viejo del apagado hacia INVISIBLE la regla apagada', () => {
  // Esta es la reproduccion del dano, no de la incomodidad, y es la razon por la que la guarda
  // existe. Con el nombre que el ejemplo ensenaba hasta el 2026-10-29, la compuerta sale limpia:
  // la regla queda apagada y el registro de cuatro campos de D-046 no se mira nunca.
  const anexo = extraerAnexo();
  const bueno = ejemploDe(arbol.es).objeto;
  const viejo = { ...bueno };
  delete viejo.switched_off;
  viejo.exceptions = [{ rule: 'CQ-17', reason: 'x', authorised_by: 'owner', review: '2027-01-31' }];
  delete viejo.thresholds.minimum_coverage;
  delete viejo.thresholds.mutation_target;

  const conElViejo = validar(fuentes, anexo, viejo).map((e) => e.code);
  assert.deepEqual(conElViejo, [], 'con el nombre viejo la compuerta tendria que salir LIMPIA, que es el defecto: ' + conElViejo.join(', '));

  const conElDelContrato = { ...viejo };
  delete conElDelContrato.exceptions;
  conElDelContrato.switched_off = [{ rule: 'CQ-17', reason: 'x', authorised_by: 'owner', review: '2027-01-31' }];
  const codigos = validar(fuentes, anexo, conElDelContrato).map((e) => e.code);
  assert.deepEqual(codigos, ['E_APAGADO_SIN_REGISTRO', 'E_APAGADO_SIN_REGISTRO'],
    'con el nombre del contrato y la ortografia del ejemplo viejo tendrian que caer los dos campos del registro: ' + codigos.join(', '));
});
