// La prosa cita lo que el dato declara exigible (PND-048, deriva de PND-039).
//
// Por que existe. El Anexo H son cuarenta y cinco reglas obligatorias, y el dato que el
// metodo publica las engancha con anclas: cinco en los peldanos 5, 8, 9, 10 y 12 --cada una
// con su evaluador `required: true`-- y dos entradas previas en el peldano 2. Medido el
// 2026-10-26: el documento principal no nombraba el anexo ni una vez en 143.274 caracteres,
// y el autor de una adaptacion del metodo omitio veintisiete de las cuarenta y cinco reglas
// porque nunca supo que estaban. Esa asimetria entre el dato y la prosa es justo lo que el
// peldano 11 persigue, aplicado al propio metodo.
//
// Lo que exige, en las dos direcciones:
//   A. del dato a la prosa: un peldano con ancla del anexo ENLAZA el anexo en su FICHA del
//      documento principal, en los ocho idiomas.
//   B. del dato a la prosa: ese mismo peldano nombra "Annex H" en su CONTRATO, en los ocho.
//   C. de la prosa al dato: una ficha que enlaza el anexo para un peldano SIN ancla es rojo
//      --la prosa prometiendole al lector una compuerta que el dato no exige--. Es la forma
//      que el validador ya tiene como E_ANEXO_HUERFANA, leida al reves.
//   D. las estaciones: si alguna declarara un evaluador del anexo, esta prueba se pone ROJA
//      diciendo que no sabe revisarlas. Es la semantica que gates/evaluators.json declara
//      para `required: true`: una instalacion que no lo sabe medir no reporta verde.
//   E. el conjunto de [Ref. N] de cada ficha es identico en los ocho idiomas.
//   F. cada "fallo que evita" lleva al menos una referencia, o esta registrado con su razon.
//
// Por que la ficha se mide por el ENLACE y el contrato por el TOKEN INGLES. Medido el mismo
// dia: "citar el anexo" da numeros distintos segun como se mida. Los contratos dan 40 de 40
// en los ocho idiomas porque la cita vive dentro del prompt en INGLES, y build/prompts.mjs
// exige ese prompt identico byte a byte en las ocho versiones: esa rama esta verde por
// construccion y lo va a seguir estando, asi que lo unico que agrega es el candado de que
// nadie lo saque en silencio de las ocho a la vez. Las fichas daban 0 de 40 por el enlace,
// que es lo falsable, y el enlace ademas le sirve al lector: build/md2html.mjs lo convierte
// en el .html que la portada enlaza. Una tabla de ocho palabras por idioma quedo descartada
// por lo que es: una entrada que falte da verde en silencio en ese idioma.
//
// Las comprobaciones viven en build/anexo_simetria.mjs y son puras, para que
// tests/anexo_simetria_en_rojo.test.mjs pueda alimentarlas con un arbol mutilado y exigir
// que caigan. Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ANEXO,
  TOKEN_CONTRATO,
  contratosQueNoCitanElAnexo,
  estacionesConEvaluadorDelAnexo,
  fichasQueNoCitanElAnexo,
  fichasQuePrometenMasQueElDato,
  leerArbol,
  referenciasQueDifieren,
  revisarFallosQueEvita,
} from '../build/anexo_simetria.mjs';

const arbol = leerArbol();

// Un "fallo que evita" sin referencia se registra con su razon, como el anexo exige para una
// regla apagada (D-045, D-046: apagado sin registro es rojo). Dos registros distintos, porque
// son dos cosas distintas, y los dos se vacian solos: si la ficha consigue su referencia, el
// registro queda viejo y la prueba cae.
export const SIN_CASO_CONCRETO = [
  {
    peldano: 0,
    razon:
      'nombra una categoria de problema y no un caso: "meterse en un proyecto donde el agente no puede verificarse solo". No hay caso que referenciar.',
  },
];
export const DEUDA_DEL_DUENO = [
  {
    peldano: 10,
    razon:
      'cita un caso concreto sin su [Ref. N] ("el menu desplegable incomodo que ningun test vio y la encargada si"). El dueno elige entre escribir la referencia o quitar la mencion; la evidencia la tiene el, no el agente.',
    pendiente: 'PND-046',
  },
];
const REGISTRADOS = new Map([...SIN_CASO_CONCRETO, ...DEUDA_DEL_DUENO].map((r) => [r.peldano, r]));

test('cada peldano con ancla del anexo lo ENLAZA en su ficha, en los ocho idiomas', () => {
  assert.ok(arbol.conAncla.length >= 6, 'el dato declara anclas del anexo (hoy: peldanos 2, 5, 8, 9, 10 y 12)');
  assert.deepEqual(
    fichasQueNoCitanElAnexo(arbol.conAncla, arbol.fichasPorIdioma),
    [],
    'el dato declara la exigencia y la ficha no la nombra',
  );
});

test('y lo nombra en su contrato con el token ingles, que es el que viaja igual en los ocho', () => {
  assert.deepEqual(
    contratosQueNoCitanElAnexo(arbol.conAncla, arbol.contratosPorIdioma),
    [],
    'el contrato no nombra "' + TOKEN_CONTRATO + '"',
  );
});

test('y ninguna ficha promete el anexo para un peldano que el dato no ancla', () => {
  assert.deepEqual(
    fichasQuePrometenMasQueElDato(arbol.conAncla, arbol.fichasPorIdioma),
    [],
    'la prosa le promete al lector una compuerta que el dato no exige',
  );
});

test('si una estacion declarara un evaluador del anexo, esta prueba no sabe revisarla', () => {
  // No es un hueco escondido: es la semantica de `required: true` aplicada a nuestra propia
  // guarda. Hoy ninguna de las ocho lo declara --el legado hereda las cinco anclas al entrar
  // al bucle por el peldano 5-- y el dia que alguna lo declare, esto se pone rojo pidiendo
  // que se extienda la prueba al camino evolutivo-correctivo, en vez de callarse.
  assert.deepEqual(
    estacionesConEvaluadorDelAnexo(arbol.estaciones, arbol.vocabulario),
    [],
    'una estacion declara un evaluador del anexo y esta prueba solo revisa las fichas de los veinticuatro peldanos: extendela a docs/EVOLUTIVO_CORRECTIVO.md',
  );
  assert.ok(arbol.vocabulario.size >= 4, 'y el vocabulario del anexo se derivo del dato, no de una lista a mano');
});

test('el conjunto de referencias de cada ficha es identico en los ocho idiomas', () => {
  assert.deepEqual(referenciasQueDifieren(arbol.fichasPorIdioma), [], 'una traduccion se comio o agrego una referencia');
});

test('cada "fallo que evita" lleva su referencia, o esta registrado con su razon', () => {
  const { sinRegistro, registroViejo, sinVineta } = revisarFallosQueEvita(arbol.fichasPorIdioma.es, REGISTRADOS);
  // Que no se encuentre el parrafo es ROJO y no un salteo: si alguien le cambia el nombre a
  // la vineta, esta prueba tiene que decirlo en vez de quedarse verde sin mirar nada.
  assert.deepEqual(sinVineta, [], 'una ficha no tiene su vineta "Fallo que evita" y la prueba no pudo mirar nada');
  assert.deepEqual(sinRegistro, [], 'un caso afirmado sin su [Ref. N] y sin registro: es la afirmacion sin respaldo que el metodo persigue');
  assert.deepEqual(registroViejo, [], 'el registro quedo viejo: la ficha ya tiene su referencia y el registro hay que sacarlo');
  assert.equal(REGISTRADOS.size, SIN_CASO_CONCRETO.length + DEUDA_DEL_DUENO.length, 'ningun peldano registrado dos veces');
  for (const r of [...SIN_CASO_CONCRETO, ...DEUDA_DEL_DUENO]) {
    assert.ok(r.razon.length > 40, 'el registro del peldano ' + r.peldano + ' dice su razon, no solo su numero');
  }
  // La deuda nombra su pendiente: un registro sin dueno se vuelve permanente.
  for (const r of DEUDA_DEL_DUENO) assert.match(r.pendiente, /^PND-\d{3}$/, 'la deuda del peldano ' + r.peldano + ' nombra su pendiente');
});

test('y la lectura del arbol trajo los ocho idiomas, no un subconjunto', () => {
  // Si esto se relajara, las seis comprobaciones de arriba quedarian verdes mirando menos de
  // lo que uno cree que miran: es el defecto de PND-037 (una prueba que mutila otro arbol).
  assert.equal(Object.keys(arbol.fichasPorIdioma).length, 8, 'ocho idiomas de fichas');
  for (const [idioma, fichas] of Object.entries(arbol.fichasPorIdioma)) {
    assert.equal(fichas.size, 24, 'las veinticuatro fichas en ' + idioma);
  }
  for (const [idioma, contratos] of Object.entries(arbol.contratosPorIdioma)) {
    assert.equal(contratos.size, arbol.conAncla.length, 'los contratos con ancla en ' + idioma);
    for (const [num, texto] of contratos) {
      assert.ok(texto.includes(ANEXO) || texto.includes(TOKEN_CONTRATO), 'el contrato ' + num + ' de ' + idioma + ' se leyo de verdad');
    }
  }
});
