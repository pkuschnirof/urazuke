// Cada documento del arbol esta publicado o nombrado con su razon (D-066, PND-050).
//
// Por que existe. El commit 08a429d anuncio un arreglo de una palabra y llevo ademas ocho
// documentos que su mensaje no nombra --el 98 % de lo que inserto--, cuatro de ellos apuntes
// del panel de chat tirados en la raiz de docs/. Lo encontro una lectura del arbol a mano. La
// prevencion que faltaba es esta: el arbol se explica solo.
//
// Lo que exige:
//   A. todo documento bajo docs/ esta en el arreglo literal de la construccion (es corpus y se
//      publica) o en el inventario con su razon, y la razon cita el pendiente o la decision que
//      lo pide. Un archivo que no esta en ninguna de las dos es rojo, con su nombre.
//   B. el inventario no tiene registros que sobren: una linea para un documento que el arbol ya
//      no tiene es un registro viejo diciendo algo falso.
//   C. las exclusiones de arbol son un REGISTRO con su razon y no una condicion escondida
//      adentro de la comprobacion, que es lo que el anexo pide para una regla apagada.
//   D. la cuenta no puede ser cero. Una comprobacion que reviso 0 documentos y dijo verde es el
//      defecto que este repositorio ya pago cuatro veces.
//
// Lo que NO guarda: el mensaje de un commit. Eso agranda el alcance y es decision del dueno;
// queda escrito en PND-050 con su segunda ocurrencia medida.
//
// Las comprobaciones viven en build/inventario_documentos.mjs y son puras, para que
// tests/inventario_documentos_en_rojo.test.mjs las alimente con el arbol que llevaba los
// apuntes y exija que caigan. Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  EXCLUSIONES_REGISTRADAS,
  TRABAJO_REGISTRADO,
  RE_PIDE,
  documentosSinExplicacion,
  registrosQueSobran,
  leerArbol,
} from '../build/inventario_documentos.mjs';

const arbol = leerArbol();

test('A: cada documento del arbol lo publica la construccion o lo explica el inventario', () => {
  const hallazgos = documentosSinExplicacion(arbol.documentos, arbol.publicados, TRABAJO_REGISTRADO);
  assert.deepEqual(
    hallazgos,
    [],
    'estos documentos estan en el arbol y nada dice por que:\n' + hallazgos.join('\n'),
  );
});

test('B: el inventario no tiene registros que sobren', () => {
  const sobran = registrosQueSobran(arbol.documentos, TRABAJO_REGISTRADO);
  assert.deepEqual(
    sobran,
    [],
    'el inventario explica documentos que el arbol ya no tiene, asi que esas lineas dicen algo ' +
      'falso:\n' + sobran.join('\n'),
  );
});

test('C: cada exclusion de arbol y cada registro llevan su razon escrita', () => {
  assert.equal(
    EXCLUSIONES_REGISTRADAS.size,
    10,
    'las siete traducciones mas docs/html/, docs/peldanos/ y la evidencia de los proyectos guia',
  );
  for (const [prefijo, razon] of EXCLUSIONES_REGISTRADAS) {
    assert.ok(razon && razon.length > 30, 'el arbol ' + prefijo + ' esta excluido sin una razon escrita');
  }
  for (const [ruta, razon] of TRABAJO_REGISTRADO) {
    assert.ok(razon && razon.length > 40, ruta + ' esta en el inventario sin una razon escrita');
    assert.match(razon, RE_PIDE, 'la razon de ' + ruta + ' no cita el pendiente ni la decision que lo pide');
  }
});

test('D: la comprobacion reviso algo, y lo dice con su cuenta', () => {
  assert.ok(arbol.rutas.length > 400, 'el arbol de docs/ se leyo entero y tiene ' + arbol.rutas.length + ' archivos');
  assert.ok(
    arbol.documentos.length >= 20,
    'cero o casi cero documentos a explicar: la comprobacion no reviso nada y no puede dar verde',
  );
  assert.equal(arbol.publicados.size, 11, 'el arreglo literal de la construccion lleva once nombres');
  assert.equal(
    arbol.documentos.length,
    arbol.publicados.size + TRABAJO_REGISTRADO.size,
    'la cuenta tiene que cerrar sin resto: cada documento a explicar esta publicado o registrado',
  );
});

test('los cuatro apuntes del panel que motivaron esto no estan en el arbol', () => {
  // El quinto caso, el que se quedo: el registro lo cita como evidencia, asi que esta en el
  // inventario y no borrado (D-062).
  for (const apunte of arbol.documentos) {
    assert.ok(
      !/^docs\/[a-z0-9-]+\.md$/.test(apunte),
      'esto tiene la forma de un apunte del panel (minusculas y guiones en la raiz de docs/): ' + apunte,
    );
  }
  assert.ok(
    TRABAJO_REGISTRADO.has('docs/DECISION_PND-048_CONTEXTO_MEDIDO.md'),
    'el apunte que el registro cita como evidencia se queda, con el nombre del resto de la carpeta',
  );
});
