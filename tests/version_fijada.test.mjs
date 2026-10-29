// La version que un proyecto fija, y lo que cuesta cambiarla (D-068, PND-055).
//
// Por que existe. El dato publica una version declarada y una huella, y el documento generado
// decia desde el primer dia que un proyecto empieza y termina en la misma version del metodo.
// Lo que no estaba escrito en ninguna parte era con QUE se fija, que subir de version en
// medio de un proyecto es una regresion del estado de completitud, y que esa decision es del
// dueno. Medido el 2026-10-27: cero menciones de la fijacion en la prosa del documento
// principal y de los veinticuatro contratos, en los ocho idiomas, mientras el dato se lo
// venia diciendo al consumidor. Lo trajo una pregunta del dueno, no una auditoria.
//
// Lo que exige:
//   A. simetria con la prosa: el documento principal y el contrato del peldano 2 nombran el
//      token `catalog_version`, en los ocho idiomas. Un texto que no se pudo leer es
//      hallazgo, no salteo.
//   B. procedencia completa: cada entrada que el metodo agrego despues del congelado dice en
//      que version publicada entro, y ninguna entrada de la base se atribuye una.
//   C. el diferencial de un upgrade es computable, y se ancla en la historia medida: lo que
//      entro despues de la primera version publicada son esas tres entradas y no otras.
//   D. una sola copia de cada texto: el enunciado de la fijacion viaja del dato al documento
//      generado por extraccion, no transcrito.
//   E. la cuenta no puede ser cero. Una comprobacion que reviso cero textos y dijo verde es
//      el defecto que este repositorio ya pago cuatro veces.
//
// Lo que NO guarda, dicho para que nadie le atribuya mas: no juzga si el parrafo dice algo
// verdadero, ni si una herramienta cumple la obligacion que el dato le declara. Lo primero lo
// juzga una persona; lo segundo se mide en el repositorio de esa herramienta.
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  IDIOMAS,
  prosaQueNoNombraLaFijacion,
  sinProcedencia,
  diferencial,
  compararVersiones,
  evaluadoresQueTraban,
  leerArbol,
} from '../build/version_fijada.mjs';
import { armarContenido, cargarFuentes, extraerAnexo, huellaDeContenido } from '../build/gates_lib.mjs';

const arbol = leerArbol();

test('A: la prosa nombra la fijacion en los ocho idiomas, en el documento principal y en el contrato', () => {
  assert.deepEqual(prosaQueNoNombraLaFijacion(arbol.textosPorIdioma), []);
});

test('A: y los ocho idiomas estan, no siete', () => {
  assert.deepEqual(Object.keys(arbol.textosPorIdioma).sort(), [...IDIOMAS].sort());
});

test('B: cada entrada agregada despues del congelado dice en que version entro', () => {
  assert.deepEqual(sinProcedencia(arbol.entradas), []);
});

test('B: toda procedencia es una version del registro, y ninguna es posterior a la declarada', () => {
  const actual = arbol.fuentes.catalog.catalog_version;
  for (const e of arbol.entradas) {
    assert.ok(arbol.versiones.includes(e.since_version), e.donde + ' dice ' + e.since_version);
    assert.ok(compararVersiones(e.since_version, actual) <= 0, e.donde + ' es posterior a ' + actual);
  }
});

test('B: ninguna entrada de la base se atribuye una procedencia', () => {
  const intrusas = [];
  const mirar = (nodo, etiqueta) => {
    for (const campo of ['inputs', 'artifacts', 'verify', 'evaluators']) {
      (nodo[campo] ?? []).forEach((x, i) => {
        if (x && typeof x === 'object' && !(x.since_schema >= 2) && 'since_version' in x) {
          intrusas.push(etiqueta + '.' + campo + '[' + i + ']');
        }
      });
    }
  };
  for (const p of arbol.pasos) mirar(p, 'step:' + p.num);
  for (const s of arbol.estaciones) mirar(s, 'station:' + s.id);
  assert.deepEqual(intrusas, []);
});

test('C: el diferencial desde la primera version publicada es la historia medida, y no otra', () => {
  const primera = arbol.versiones[0];
  const actual = arbol.fuentes.catalog.catalog_version;
  const dif = diferencial(arbol.entradas, primera, actual).map((e) => e.since_version + ' ' + e.que).sort();
  assert.deepEqual(dif, [
    // El orden es el del sort() lexico y no el cronologico: 2026.10.11 va antes que 2026.10.4.
    '2026.10.11 end_users_outside_the_organisation',
    '2026.10.4 Does the recovery-manual run leave its record -- the measured end-to-end time, the exact point where the person got stuck and every word they did not understand, with a date and the name of whoever ran it -- and did every one of those words open a pending item?',
    '2026.10.5 docs/GLOSSARY.md',
    '2026.10.5 docs/PROFILES.md',
    '2026.10.8 UX-28',
  ]);
});

test('C: el diferencial de una version contra si misma esta vacio, y el borde no se cuenta dos veces', () => {
  const actual = arbol.fuentes.catalog.catalog_version;
  assert.deepEqual(diferencial(arbol.entradas, actual, actual), []);
  // Una entrada que entro EN la version fijada ya la tiene el proyecto: no entra en el
  // diferencial. Es el borde que un `>=` mal puesto convierte en trabajo inventado.
  assert.deepEqual(diferencial(arbol.entradas, '2026.10.5', '2026.10.5'), []);
  assert.equal(diferencial(arbol.entradas, '2026.10.4', '2026.10.5').length, 2);
});

test('C: los cinco evaluadores requeridos del anexo entraron con la primera version publicada', () => {
  // Medido, y es el dato que cambia como se lee un upgrade: ningun salto entre dos versiones
  // PUBLICADAS agrega hoy un evaluador requerido. El unico caso que traba un proyecto es el
  // de quien nunca fijo una version publicada y mide contra el congelado anterior a todas.
  const primera = arbol.versiones[0];
  const actual = arbol.fuentes.catalog.catalog_version;
  assert.deepEqual(evaluadoresQueTraban(arbol.pasos, primera, actual), []);
  const requeridos = arbol.pasos.flatMap((p) => (p.evaluators ?? [])
    .filter((e) => e.since_schema >= 2 && e.required)
    .map((e) => p.num + ':' + e.name + '@' + e.since_version));
  assert.deepEqual(requeridos.sort(), [
    '10:manual_cases_per_profile@2026.10.1',
    '12:heuristics@2026.10.1',
    '5:pendings_profiles@2026.10.1',
    '8:profile_matrix@2026.10.1',
    '9:heuristics@2026.10.1',
  ]);
});

test('el contrato de fijacion se publica, y la huella lo cubre', () => {
  const fuentes = cargarFuentes();
  const contenido = armarContenido(fuentes, extraerAnexo());
  assert.ok(contenido.pinning, 'el publicado no lleva el contrato de fijacion');
  assert.deepEqual(contenido.pinning.pinned_pair, ['catalog_version', 'content_hash']);
  assert.equal(contenido.pinning.upgrade.who_decides, 'owner');
  assert.ok(fuentes.schema.version_scheme.hash_covers.includes('pinning'));
  // Si estuviera fuera de la huella, una copia congelada alterada ahi cambiaria lo que el
  // proyecto cree que debe y la huella recalculada seguiria coincidiendo.
  const sinFijacion = { ...contenido, pinning: { ...contenido.pinning, upgrade: { ...contenido.pinning.upgrade, who_decides: 'tool' } } };
  assert.notEqual(
    huellaDeContenido(contenido, fuentes.schema.version_scheme.hash_covers),
    huellaDeContenido(sinFijacion, fuentes.schema.version_scheme.hash_covers),
  );
});

test('D: el documento generado trae el enunciado del dato, extraido y no transcrito', () => {
  const fij = armarContenido(cargarFuentes(), extraerAnexo()).pinning;
  // Afirmar que esta ANTES de desreferenciarlo: corrida contra un arbol sin contrato de
  // fijacion, esta prueba caia con un TypeError en vez de nombrar lo que falta, y un rojo que
  // no nombra lo que falta es la mitad de un rojo (herramienta PND-049).
  assert.ok(fij, 'el publicado no lleva el contrato de fijacion: no hay enunciado que extraer');
  for (const texto of [fij.what, fij.consumer_contract.must_record, fij.consumer_contract.forbidden, fij.upgrade.how_to_compute]) {
    assert.ok(arbol.documento.includes(texto), 'el documento no trae: ' + texto.slice(0, 60));
  }
});

test('E: la comprobacion reviso algo, y lo dice con su cuenta', () => {
  assert.equal(Object.keys(arbol.textosPorIdioma).length * 2, 16);
  // Treinta y cinco el 2026-10-27 por la manana; la trigesimo sexta es UX-28, la primera REGLA
  // que el metodo agrego despues de que esta maquinaria existiera (D-070); la trigesimo septima es
  // el primer UMBRAL, end_users_outside_the_organisation (D-076).
  assert.equal(arbol.entradas.length, 37, 'las entradas agregadas despues del congelado, medidas el 2026-10-29');
  assert.deepEqual(arbol.entradas.filter((e) => e.donde.startsWith('catalog.rules')).map((e) => e.que), ['UX-28'],
    'una regla agregada despues del congelado entra en el diferencial: sin esto un upgrade la omitia en silencio');
  assert.deepEqual(arbol.entradas.filter((e) => e.donde.startsWith('catalog.thresholds')).map((e) => e.que), ['end_users_outside_the_organisation'],
    'un umbral agregado despues del congelado entra en el diferencial: declararlo o no cambia la severidad de su regla');
  assert.ok(arbol.versiones.length >= 7, 'el registro de versiones tiene al menos las siete publicadas');
});
