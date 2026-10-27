// Los rojos deliberados de la guarda "lo que el dato exige, el contrato lo nombra" (D-065,
// PND-053).
//
// Por que existe. Es la regla de este repositorio y la leccion que ya costo cuatro veces:
// una comprobacion que nadie vio caer no demuestra que guarde nada. Asi que cada
// comprobacion de build/artefacto_nombrado.mjs se alimenta aca con un arbol mutilado a
// proposito y tiene que caer nombrando lo suyo.
//
// Se muta el INSUMO, no el programa: las comprobaciones son puras, asi que la mutacion es
// una copia del arbol real con una cosa cambiada. Nada de esto toca el disco.
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  COMODINES_REGISTRADOS,
  artefactosExigidos,
  artefactosQueElContratoNoNombra,
  comodinesDelDato,
  leerArbol,
} from '../build/artefacto_nombrado.mjs';

const arbol = leerArbol();

/** Una copia de los contratos con el de `num` en `idioma` cambiado por `f`. */
function conContratoCambiado(contratosPorIdioma, idioma, num, f) {
  const copia = { ...contratosPorIdioma };
  const contratos = new Map(copia[idioma]);
  if (f === null) contratos.delete(num);
  else contratos.set(num, f(contratos.get(num)));
  copia[idioma] = contratos;
  return copia;
}

test('rojo 1: un contrato que deja de nombrar una ruta que el dato exige, en UN solo idioma', () => {
  // El japones a proposito: es el idioma donde una revision a ojo no ve el agujero.
  const mutado = conContratoCambiado(arbol.contratosPorIdioma, 'ja', 2, (t) =>
    t.split('docs/GLOSSARY.md').join('docs/ALGUNA_OTRA_COSA.md'),
  );
  const faltan = artefactosQueElContratoNoNombra(arbol.exigidos, mutado);
  assert.deepEqual(faltan, ['ja/peldano-2: docs/GLOSSARY.md']);
});

test('rojo 2: la ruta nueva sacada de los ocho contratos a la vez cae ocho veces', () => {
  const mutado = {};
  for (const [idioma, contratos] of Object.entries(arbol.contratosPorIdioma)) {
    const copia = new Map(contratos);
    copia.set(2, copia.get(2).split('docs/PROFILES.md').join('OTRA.md'));
    mutado[idioma] = copia;
  }
  const faltan = artefactosQueElContratoNoNombra(arbol.exigidos, mutado);
  assert.equal(faltan.length, 8, 'los ocho idiomas, nombrados uno por uno: ' + faltan.join(' | '));
  assert.ok(faltan.every((f) => f.endsWith('docs/PROFILES.md')));
});

test('rojo 3: un contrato que no se pudo leer es HALLAZGO y no un salteo en silencio', () => {
  const mutado = conContratoCambiado(arbol.contratosPorIdioma, 'de', 9, null);
  const faltan = artefactosQueElContratoNoNombra(arbol.exigidos, mutado);
  assert.ok(faltan.length > 0, 'no haber podido mirar tiene que dar rojo, no verde');
  assert.ok(
    faltan.every((f) => f.startsWith('de/peldano-9 (no se encontro el contrato)')),
    'el hallazgo dice que no se encontro el contrato, no que falte una ruta: ' + faltan.join(' | '),
  );
});

test('rojo 4: un comodin nuevo en el dato que nadie registro', () => {
  const pasos = arbol.pasos.map((p) =>
    p.num === 2 ? { ...p, artifacts: [...p.artifacts, { path: 'docs/INVENTADO_*.md' }] } : p,
  );
  const enElDato = [...comodinesDelDato(pasos)].sort();
  const registrados = [...COMODINES_REGISTRADOS.keys()].sort();
  assert.notDeepEqual(enElDato, registrados, 'un comodin sin razon escrita tiene que caer');
  assert.ok(enElDato.includes('docs/INVENTADO_*.md'));
});

test('rojo 5: un comodin no se cuela como ruta exigida, y por eso el registro es necesario', () => {
  const rutas = artefactosExigidos(arbol.pasos).map((e) => e.ruta);
  assert.ok(rutas.length > 0);
  assert.ok(!rutas.some((r) => r.includes('*')), 'ninguna ruta exigida lleva comodin');
  // y la contracara: lo salteado es exactamente lo registrado, no mas.
  assert.equal(comodinesDelDato(arbol.pasos).size, COMODINES_REGISTRADOS.size);
});

test('rojo 6: un dato sin artefactos da CERO pares, y cero pares no es un verde', () => {
  const pasos = arbol.pasos.map((p) => ({ ...p, artifacts: [] }));
  const exigidos = artefactosExigidos(pasos);
  assert.equal(exigidos.length, 0);
  assert.deepEqual(
    artefactosQueElContratoNoNombra(exigidos, arbol.contratosPorIdioma),
    [],
    'con cero pares la comprobacion no tiene nada que decir: por eso la prueba A no alcanza sola ' +
      'y la prueba C exige que la cuenta no sea cero',
  );
});
