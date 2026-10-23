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
    ['CQ-01', 'CQ-02', 'CQ-03', 'CQ-04', 'CQ-05', 'CQ-06', 'CQ-08', 'CQ-11', 'CQ-12', 'CQ-13', 'CQ-14', 'CQ-15', 'CQ-16', 'CQ-17'],
    'en calidad bloquean catorce desde el dia uno');
  assert.deepEqual(ids((x) => x.group === 'code_quality' && x.initial_severity === 'warns'), ['CQ-07', 'CQ-10', 'CQ-18'], 'avisan tres, y solo tres');
  assert.equal(r.find((x) => x.id === 'CQ-09').applies_if, 'real_users', 'CQ-09 bloquea donde hay usuarios reales');
  assert.deepEqual(
    ids((x) => x.group === 'usability' && x.initial_severity === 'blocks'),
    ['UX-02', 'UX-03', 'UX-08', 'UX-09', 'UX-10', 'UX-11', 'UX-12', 'UX-15', 'UX-16', 'UX-22', 'UX-27'],
    'en usabilidad bloquean once');
  assert.deepEqual(ids((x) => x.group === 'usability' && x.initial_severity === 'records'), ['UX-06'], 'UX-06 solo registra');
  assert.deepEqual(ids((x) => x.human_red), ['CQ-12', 'CQ-14', 'UX-22', 'UX-27'], 'cuatro reglas bloquean con rojo humano');
});

test('el conteo correcto es cuarenta y cinco: 18 de calidad y 27 de usabilidad', () => {
  assert.equal(fuentes.heuristics.rules.length, 45);
  assert.equal(fuentes.heuristics.rules.filter((r) => r.group === 'code_quality').length, 18);
  assert.equal(fuentes.heuristics.rules.filter((r) => r.group === 'usability').length, 27);
});

test('todo enunciado se resuelve contra el anexo, y ninguno esta transcrito en los datos', () => {
  for (const r of fuentes.heuristics.rules) {
    const a = anexo.reglas.get(r.id);
    assert.ok(a, 'la regla ' + r.id + ' no tiene fila en el anexo');
    assert.ok(a.enunciado.length > 20, 'el enunciado de ' + r.id + ' se extrajo vacio o truncado');
    assert.ok(!('text' in r.statement), 'la regla ' + r.id + ' trae el texto transcrito en los datos');
    assert.ok(!('document' in r.statement), 'la regla ' + r.id + ' repite la ruta del anexo');
  }
  assert.equal(anexo.reglas.size, 45, 'el anexo declara ' + anexo.reglas.size + ' reglas');
  assert.deepEqual(anexo.problemas, []);
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
