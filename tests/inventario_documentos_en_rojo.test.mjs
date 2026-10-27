// Los rojos deliberados de la guarda "el arbol se explica solo" (D-066, PND-050).
//
// Por que existe. Es la regla de este repositorio y la leccion que ya costo cuatro veces: una
// comprobacion que nadie vio caer no demuestra que guarde nada. Asi que cada comprobacion de
// build/inventario_documentos.mjs se alimenta aca con un arbol mutilado a proposito y tiene que
// caer nombrando lo suyo.
//
// El rojo que importa es el 2: el arbol REAL de 1a02cd3, que es el commit donde los cuatro
// apuntes del panel ya estaban. Los nombres van literales y no salen de git, para que la prueba
// corra igual en un clon superficial y para que el insumo historico no cambie nunca.
//
// Se muta el INSUMO, no el programa. Nada de esto toca el disco. Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  TRABAJO_REGISTRADO,
  corpusDeLaConstruccion,
  documentosDelArbol,
  documentosSinExplicacion,
  registrosQueSobran,
  leerArbol,
} from '../build/inventario_documentos.mjs';

const arbol = leerArbol();

/** Los cuatro apuntes del panel que el arbol de 1a02cd3 tenia en la raiz de docs/. */
const APUNTES_DE_1A02CD3 = [
  'docs/auditoria-urazuke-el-arbol-del-portal-y-las-siete-decisiones.md',
  'docs/backlog-de-la-auditoria-el-registro-inaugurado-y-lo-que-qued.md',
  'docs/backlog-de-la-retrospectiva-las-4-decisiones-del-dueno.md',
  'docs/la-cuarta-decision-con-contexto-medido-pnd-048.md',
];

test('rojo 1: un apunte del panel suelto en la raiz de docs/ cae nombrado', () => {
  const mutado = [...arbol.documentos, 'docs/que-decidimos-en-la-sesion-de-hoy.md'].sort();
  const hallazgos = documentosSinExplicacion(mutado, arbol.publicados, TRABAJO_REGISTRADO);
  assert.deepEqual(hallazgos, [
    'docs/que-decidimos-en-la-sesion-de-hoy.md: no lo publica la construccion y no esta en el inventario con su razon',
  ]);
});

test('rojo 2: el arbol de 1a02cd3 cae cuatro veces, una por apunte', () => {
  const mutado = [...arbol.documentos, ...APUNTES_DE_1A02CD3].sort();
  const hallazgos = documentosSinExplicacion(mutado, arbol.publicados, TRABAJO_REGISTRADO);
  assert.equal(hallazgos.length, 4, 'el arbol que llevaba los apuntes tiene que dar cuatro hallazgos');
  for (const apunte of APUNTES_DE_1A02CD3) {
    assert.ok(
      hallazgos.some((h) => h.startsWith(apunte + ':')),
      'la guarda tiene que nombrar ' + apunte,
    );
  }
});

test('rojo 3: una razon que no cita el pendiente ni la decision que pide el documento', () => {
  const mutado = new Map(TRABAJO_REGISTRADO);
  mutado.set('docs/PENDING.md', 'porque siempre estuvo ahi y a nadie le molesta');
  const hallazgos = documentosSinExplicacion(arbol.documentos, arbol.publicados, mutado);
  assert.deepEqual(hallazgos, [
    'docs/PENDING.md: esta en el inventario y su razon no cita el pendiente ni la decision que lo pide',
  ]);
});

test('rojo 4: un registro que sobra, porque el documento salio del arbol', () => {
  const mutado = new Map(TRABAJO_REGISTRADO);
  mutado.set('docs/UN_DOCUMENTO_QUE_YA_NO_ESTA.md', 'una razon vieja que cita PND-050 y nada mas');
  assert.deepEqual(registrosQueSobran(arbol.documentos, mutado), ['docs/UN_DOCUMENTO_QUE_YA_NO_ESTA.md']);
});

test('rojo 5: un documento del corpus que la construccion deja de publicar pasa a pedir su razon', () => {
  const sinElAnexo = new Set([...arbol.publicados].filter((r) => r !== 'docs/ANEXO_HEURISTICAS.md'));
  const hallazgos = documentosSinExplicacion(arbol.documentos, sinElAnexo, TRABAJO_REGISTRADO);
  assert.deepEqual(hallazgos, [
    'docs/ANEXO_HEURISTICAS.md: no lo publica la construccion y no esta en el inventario con su razon',
  ]);
});

test('rojo 6: si la construccion cambia de forma, la extraccion FALLA en vez de devolver vacio', () => {
  // El modo de falla que este proyecto ya conoce: un paso que no encontro nada y dijo verde.
  // Si alguien reescribe el bucle de build/build.mjs, la guarda tiene que romperse a la vista y
  // no quedarse sin corpus, porque sin corpus pediria una razon para los once documentos que ya
  // se publican.
  assert.throws(
    () => corpusDeLaConstruccion('// una construccion que ya no tiene ese arreglo literal\n'),
    /no se encontro el arreglo literal/,
  );
  const once = corpusDeLaConstruccion("for (const nombre of ['UNO', 'DOS']) {");
  assert.deepEqual([...once], ['docs/UNO.md', 'docs/DOS.md']);
});

test('rojo 7: las exclusiones de arbol no se tragan la raiz de docs/', () => {
  // Una exclusion mal escrita --'docs/' en vez de 'docs/html/'-- vaciaria el universo y la
  // guarda daria verde sin haber mirado nada. La comprobacion no puede defenderse sola de eso,
  // asi que queda dicho aca: el universo de hoy tiene 22 documentos y la cuenta de la prueba D
  // es la que lo vigila.
  assert.equal(documentosDelArbol(['docs/COSA.md', 'README.md', 'docs/html/x.md']).length, 1);
  assert.ok(arbol.documentos.length >= 20, 'el universo no puede quedar vacio: hay ' + arbol.documentos.length);
});
