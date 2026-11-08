// La base: el catalogo valida, y lo que corresponde a lo que la herramienta ya hacia
// cumplir es identico a lo que tenia compilado el dia en que el metodo tomo la propiedad.
// Uso: node --test tests/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cargarFuentes, extraerAnexo, proyectarPasoABase } from '../build/gates_lib.mjs';
import { validar } from '../build/gates_validate.mjs';

const fuentes = cargarFuentes();
const anexo = extraerAnexo();

test('el catalogo del repositorio valida sin un solo error', () => {
  const errores = validar(fuentes, anexo);
  assert.deepEqual(errores, [], 'errores: ' + errores.map((e) => e.code + ' ' + e.que).join(' | '));
});

test('diferencia cero: los 24 peldanos proyectados a la base son identicos al congelado', () => {
  assert.equal(fuentes.steps.steps.length, 24);
  assert.equal(fuentes.baseline.steps.length, 24);
  for (const paso of fuentes.steps.steps) {
    const base = fuentes.baseline.steps.find((s) => s.num === paso.num);
    assert.ok(base, 'el peldano ' + paso.num + ' no esta en el congelado');
    assert.deepStrictEqual(proyectarPasoABase(paso), base, 'el peldano ' + paso.num + ' difiere de la base');
  }
});

test('diferencia cero: las 8 estaciones proyectadas a la base son identicas al congelado', () => {
  assert.equal(fuentes.stations.stations.length, 8);
  for (const est of fuentes.stations.stations) {
    const base = fuentes.baseline.stations.find((s) => s.num === est.num);
    assert.ok(base, 'la estacion N' + est.num + ' no esta en el congelado');
    assert.deepStrictEqual(proyectarPasoABase(est), base, 'la estacion N' + est.num + ' difiere de la base');
  }
});

test('la base no se edita: ninguna entrada sin since_schema cambio de contenido', () => {
  // Es el complemento del test anterior visto desde el otro lado: toda entrada de la
  // base sigue estando, tal cual, entre las entradas sin since_schema.
  for (const base of fuentes.baseline.steps) {
    const paso = fuentes.steps.steps.find((s) => s.num === base.num);
    const deLaBase = paso.artifacts.filter((a) => !a.since_schema);
    assert.deepStrictEqual(deLaBase, base.artifacts, 'cambiaron los artefactos de base del peldano ' + base.num);
    assert.deepStrictEqual(paso.verify.filter((v) => typeof v === 'string'), base.verify, 'cambiaron las verificaciones de base del peldano ' + base.num);
  }
});

test('lo nuevo entra declarado: todo agregado lleva since_schema 2 y nada mas', () => {
  const nuevos = [];
  for (const paso of [...fuentes.steps.steps, ...fuentes.stations.stations]) {
    for (const a of [...(paso.inputs ?? []), ...paso.artifacts]) if (a.since_schema) nuevos.push(a.since_schema);
    for (const v of paso.verify) if (typeof v !== 'string') nuevos.push(v.since_schema);
    for (const e of paso.evaluators) if (e.since_schema !== 1) nuevos.push(e.since_schema);
  }
  assert.ok(nuevos.length > 0, 'no hay ni un agregado: el Anexo H no entro');
  assert.deepEqual([...new Set(nuevos)], [2], 'hay agregados con un since_schema que no es 2');
});

test('las cinco anclas del Anexo H estan enganchadas en los peldanos 5, 8, 9, 10 y 12', () => {
  const esperado = { 1: [5, 'pendings_profiles'], 2: [8, 'profile_matrix'], 3: [9, 'heuristics'], 4: [10, 'manual_cases_per_profile'], 5: [12, 'heuristics'] };
  for (const [id, [num, evaluador]] of Object.entries(esperado)) {
    const ancla = fuentes.heuristics.anchors.find((a) => String(a.id) === id);
    assert.ok(ancla, 'falta el ancla ' + id);
    assert.equal(ancla.step, num);
    assert.equal(ancla.evaluator, evaluador);
    const paso = fuentes.steps.steps.find((s) => s.num === num);
    assert.ok(paso.evaluators.some((e) => e.name === evaluador && e.since_schema === 2),
      'el peldano ' + num + ' no declara el evaluador ' + evaluador);
  }
});

test('el camino heredado hereda las cinco anclas al entrar al bucle por el peldano 5', () => {
  assert.equal(fuentes.stations.loop_entry.step, 5);
  assert.deepEqual(fuentes.stations.loop_entry.inherits_anchors, [1, 2, 3, 4, 5]);
});

test('las severidades iniciales son las que fijo D-048, regla por regla', () => {
  const r = fuentes.heuristics.rules;
  const ids = (f) => r.filter(f).map((x) => x.id).sort();
  assert.deepEqual(
    ids((x) => x.group === 'code_quality' && x.initial_severity === 'blocks' && !x.applies_if),
    ['CQ-01', 'CQ-02', 'CQ-03', 'CQ-04', 'CQ-05', 'CQ-06', 'CQ-08', 'CQ-11', 'CQ-12', 'CQ-13', 'CQ-14', 'CQ-15', 'CQ-16', 'CQ-17', 'CQ-19', 'CQ-20', 'CQ-21', 'CQ-22', 'CQ-23', 'CQ-24', 'CQ-25'],
    'en calidad bloquean veintiuna desde el dia uno: catorce desde D-048, las dos del recibo desde D-078, la del alcance desde D-087, las tres de D-089 y la de lo servido de D-095');
  assert.deepEqual(ids((x) => x.group === 'code_quality' && x.initial_severity === 'warns'), ['CQ-07', 'CQ-10', 'CQ-18'], 'avisan tres, y solo tres');
  assert.equal(r.find((x) => x.id === 'CQ-09').applies_if, 'real_users', 'CQ-09 bloquea donde hay usuarios reales');
  assert.deepEqual(
    ids((x) => x.group === 'usability' && x.initial_severity === 'blocks'),
    ['UX-02', 'UX-03', 'UX-08', 'UX-09', 'UX-10', 'UX-11', 'UX-12', 'UX-15', 'UX-16', 'UX-22', 'UX-27'],
    'en usabilidad bloquean once');
  assert.deepEqual(ids((x) => x.group === 'usability' && x.initial_severity === 'records'), ['UX-06'], 'UX-06 solo registra');
  // UX-28 entro el 2026-10-27 (D-070) y es la quinta de rojo humano: la forma de la pregunta la
  // juzga el dueno al cierre del pendiente, por el mismo motivo que la captura de UX-27.
  assert.deepEqual(ids((x) => x.human_red), ['CQ-12', 'CQ-14', 'UX-22', 'UX-27', 'UX-28'], 'cinco reglas se verifican con rojo humano');
  assert.deepEqual(ids((x) => x.group === 'usability' && x.initial_severity === 'warns' && x.human_red), ['UX-28'],
    'UX-28 es la unica que avisa y ademas se verifica a mano: ninguna prueba puede mirar una pregunta concreta');
});

test('el conteo correcto es cincuenta y tres: 25 de calidad y 28 de usabilidad', () => {
  // Era cuarenta y cinco hasta el 2026-10-27, cuando entro UX-28 (D-070); cuarenta y seis hasta
  // el 2026-11-01, cuando entraron CQ-19 y CQ-20 (D-078); cuarenta y ocho hasta el 2026-11-03,
  // cuando entro CQ-21 (D-087); y cuarenta y nueve hasta el 2026-11-07, cuando entraron CQ-22,
  // CQ-23 y CQ-24 (D-089); y cincuenta y dos hasta el 2026-11-08, cuando entro CQ-25 (D-095). La
  // cuenta se congela aca a proposito: es el unico lugar del arbol que cae si una regla entra o
  // sale sin decision.
  assert.equal(fuentes.heuristics.rules.length, 53);
  assert.equal(fuentes.heuristics.rules.filter((r) => r.group === 'code_quality').length, 25);
  assert.equal(fuentes.heuristics.rules.filter((r) => r.group === 'usability').length, 28);
  assert.equal(fuentes.heuristics.counts.total, 53, 'la cuenta declarada es la real');
});

test('todo enunciado se resuelve contra el anexo, y ninguno esta transcrito en los datos', () => {
  for (const r of fuentes.heuristics.rules) {
    const a = anexo.reglas.get(r.id);
    assert.ok(a, 'la regla ' + r.id + ' no tiene fila en el anexo');
    assert.ok(a.enunciado.length > 20, 'el enunciado de ' + r.id + ' se extrajo vacio o truncado');
    assert.ok(!('text' in r.statement), 'la regla ' + r.id + ' trae el texto transcrito en los datos');
    assert.ok(!('document' in r.statement), 'la regla ' + r.id + ' repite la ruta del anexo');
  }
  assert.equal(anexo.reglas.size, 53, 'el anexo declara ' + anexo.reglas.size + ' reglas');
  assert.deepEqual(anexo.problemas, []);
});

// Las caras (D-078). Se congelan aca por la misma razon que la cuenta de reglas: una cara que
// entra o sale sin decision tiene que hacer caer algo, y lo que una cara habilita --apagar una
// sola comprobacion de una regla-- es justo lo que no se puede dejar aparecer en silencio.
test('las caras son veintitres, cuelgan de su regla y su enunciado se extrae del anexo', () => {
  const conCaras = fuentes.heuristics.rules.filter((r) => r.faces);
  assert.deepEqual(conCaras.map((r) => r.id), ['CQ-19', 'CQ-20', 'CQ-21', 'CQ-22', 'CQ-23', 'CQ-24', 'CQ-25'], 'las siete reglas con caras');
  assert.deepEqual(conCaras.map((r) => r.faces.length), [4, 2, 4, 4, 3, 2, 4], 'cuatro, dos, cuatro, cuatro, tres, dos y cuatro caras');
  assert.equal(anexo.caras.size, 23, 'el anexo declara ' + anexo.caras.size + ' caras');
  for (const r of conCaras) {
    for (const c of r.faces) {
      assert.ok(c.id.startsWith(r.id + '.'), 'la cara ' + c.id + ' cuelga de ' + r.id);
      assert.ok(!('text' in c.statement), 'la cara ' + c.id + ' trae el texto transcrito en los datos');
      const fila = anexo.caras.get(c.id);
      assert.ok(fila, 'la cara ' + c.id + ' no tiene fila en el anexo');
      assert.ok(fila.nombre.length > 2, 'la cara ' + c.id + ' se extrajo sin nombre');
      assert.ok(fila.enunciado.length > 20, 'el enunciado de ' + c.id + ' se extrajo vacio o truncado');
    }
  }
  // Y la politica, que es lo que hace que una cara apagada no se pueda esconder.
  const p = fuentes.heuristics.faces;
  assert.ok(p.never_reported_as_fulfilled.includes('never reported as'), 'una regla con una cara apagada no se informa como cumplida');
  assert.ok(p.count_is_derived.includes('derived'), 'la cuenta de caras se deriva');
  assert.equal(fuentes.heuristics.switch_off.by_face, 'see heuristics.faces.switch_off_record');
});

test('ningun umbral esta inventado: valor nulo si y solo si no esta declarado', () => {
  for (const u of fuentes.adapters.thresholds) assert.equal(u.value === null, u.declared === false, 'el umbral ' + u.id);
  assert.deepEqual(
    fuentes.adapters.thresholds.filter((u) => u.declared).map((u) => [u.id, u.value]),
    [['lines_per_file', 300], ['lines_per_function', 40]],
    'los dos unicos umbrales que el anexo declara son los del tamano');
});

test('las fuentes de gates/ son ASCII puro', () => {
  const errores = validar(fuentes, anexo).filter((e) => e.code === 'E_ASCII');
  assert.deepEqual(errores, []);
});

test('el registro de apagado es el mismo en el catalogo y en la configuracion que lo consume', () => {
  assert.deepEqual(fuentes.heuristics.switch_off.requires, fuentes.schema.project_config.switch_off_record);
  for (const campo of ['reason', 'authorized_by', 'review_date']) {
    assert.ok(fuentes.heuristics.switch_off.requires.includes(campo), 'D-046 exige ' + campo);
  }
});
