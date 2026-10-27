// Lo que el dato exige por ruta, el contrato lo nombra (D-065, PND-053).
//
// Por que existe. Hasta el 2026-10-27 las dos entradas previas del Anexo H --el glosario del
// usuario y la lista de perfiles-- se publicaban como exigidas y SIN ruta declarada, asi que
// ninguna compuerta podia mirarlas y la matriz del peldano 8 se podia seguir inventando
// contra una lista que nada obligaba a existir. El dueno declaro la ruta ese dia
// (docs/GLOSSARY.md y docs/PROFILES.md) y las dos entraron como artefactos del peldano 2.
// Declarar la ruta en el dato y no nombrarla en la prosa habria cambiado un defecto por
// otro: la compuerta fallaria por un archivo del que al lector nadie le hablo. Esta prueba
// es el candado de eso.
//
// Lo que exige:
//   A. del dato a la prosa: cada artefacto que un peldano declara por ruta esta NOMBRADO en
//      su contrato, en los ocho idiomas. Un contrato que no se pudo leer es hallazgo, no
//      salteo: no haber podido mirar es rojo.
//   B. el registro de comodines es exactamente el conjunto de rutas con comodin que el dato
//      declara hoy. Un glob no es un nombre que un contrato pueda imprimir, asi que se
//      saltea; que el salteo sea un REGISTRO con su razon, y no una condicion escondida
//      adentro de la comprobacion, es lo que el anexo pide para una regla apagada.
//   C. la cuenta no puede ser cero. Una comprobacion que reviso 0 pares y dijo verde es el
//      defecto que este repositorio ya pago dos veces.
//
// Lo que esta prueba NO guarda, dicho para que nadie le atribuya mas de lo que hace: no
// habria atrapado el defecto que la origino. Mientras el dato no declaraba ninguna ruta, no
// habia par que revisar y la comprobacion daba verde con razon. Lo que guarda es que la ruta
// declarada hoy no se quede sin su prosa, en ninguno de los ocho idiomas, y que una ruta
// nueva no entre al dato en silencio.
//
// Las estaciones N0..N7 quedan FUERA del alcance, con su razon escrita en
// build/artefacto_nombrado.mjs: su prosa no vive en docs/<idioma>/peldanos/.
//
// Las comprobaciones viven en build/artefacto_nombrado.mjs y son puras, para que
// tests/artefacto_nombrado_en_rojo.test.mjs pueda alimentarlas con un arbol mutilado y
// exigir que caigan. Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  COMODINES_REGISTRADOS,
  comodinesDelDato,
  artefactosQueElContratoNoNombra,
  leerArbol,
  IDIOMAS,
} from '../build/artefacto_nombrado.mjs';

const arbol = leerArbol();

test('A: cada artefacto que el dato exige por ruta esta nombrado en su contrato, en los ocho idiomas', () => {
  const faltan = artefactosQueElContratoNoNombra(arbol.exigidos, arbol.contratosPorIdioma);
  assert.deepEqual(
    faltan,
    [],
    'el dato busca estos archivos y el contrato no los nombra, asi que la compuerta falla por ' +
      'una razon que al lector nunca se le dijo:\n' + faltan.join('\n'),
  );
});

test('B: el registro de comodines es exactamente el conjunto que el dato declara', () => {
  const enElDato = [...comodinesDelDato(arbol.pasos)].sort();
  const registrados = [...COMODINES_REGISTRADOS.keys()].sort();
  assert.deepEqual(
    enElDato,
    registrados,
    'un comodin nuevo en el dato entra al registro con su razon, y un registro que sobra se saca: ' +
      'un salteo sin razon escrita es la forma de apagar una regla sin decirlo',
  );
  for (const [ruta, razon] of COMODINES_REGISTRADOS) {
    assert.ok(razon && razon.length > 20, 'el comodin ' + ruta + ' esta registrado sin una razon escrita');
  }
});

test('C: la comprobacion reviso algo, y lo dice con su cuenta', () => {
  assert.equal(IDIOMAS.length, 8, 'los ocho idiomas del corpus');
  assert.ok(arbol.exigidos.length > 0, 'cero artefactos exigidos: la comprobacion no reviso nada y no puede dar verde');
  const pares = arbol.exigidos.length * IDIOMAS.length;
  assert.ok(pares >= 280, 'se esperaban al menos 280 pares (peldano x ruta x idioma) y hay ' + pares);
});

test('las dos entradas previas del Anexo H tienen su ruta en el dato y en el contrato', () => {
  const paso2 = arbol.pasos.find((p) => p.num === 2);
  const rutas = paso2.artifacts.map((a) => a.path);
  for (const ruta of ['docs/GLOSSARY.md', 'docs/PROFILES.md']) {
    assert.ok(rutas.includes(ruta), 'el peldano 2 declara ' + ruta);
    const nueva = paso2.artifacts.find((a) => a.path === ruta);
    assert.equal(nueva.since_schema, 2, ruta + ' entra como artefacto NUEVO: la base congelada no se edita');
    for (const idioma of IDIOMAS) {
      assert.ok(
        arbol.contratosPorIdioma[idioma].get(2).includes(ruta),
        'el contrato del peldano 2 en ' + idioma + ' nombra ' + ruta,
      );
    }
  }
});
