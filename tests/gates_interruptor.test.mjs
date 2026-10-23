// El interruptor, probado prendiendolo y apagandolo sobre el proyecto fixture con
// violaciones deliberadas (D-046 (4)): si el resultado observable no cambia, no era una
// compuerta, era decoracion. Cubre tambien las dos tablas de falsificacion del Anexo H
// (seccion 11, el interruptor; seccion 12, el tablero).
// Uso: node --test tests/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { raiz, armarContenido, cargarFuentes } from '../build/gates_lib.mjs';
import { evaluarHeuristicas, renderizar } from '../build/gates_reference.mjs';

const contenido = armarContenido();
const fixture = JSON.parse(readFileSync(join(raiz, 'tests', 'fixture', 'proyecto_con_violaciones.json'), 'utf8'));
const REGISTRO = { reason: 'inherited debt from the printable report', authorized_by: 'the owner', review_date: '2027-01-31' };

/** Mide las 45: todas pasan, menos las que se le pidan, con el archivo del fixture. */
function medir(fallan = []) {
  return contenido.heuristics.rules.map((r) => {
    const v = fixture.violations.find((x) => x.rule === r.id);
    const falla = fallan.includes(r.id);
    return { rule: r.id, state: falla ? 'fail' : 'pass', file: falla ? v?.file ?? null : null, detail: falla ? v?.detail ?? null : null };
  });
}

const correr = (config, fallan) => evaluarHeuristicas({ ...fixture.config, ...config }, medir(fallan), contenido);
const todas = fixture.violations.map((v) => v.rule);

test('el fixture tiene violaciones deliberadas de cada familia de las dos partes', () => {
  const familias = new Set(fixture.violations.map((v) => v.family));
  assert.ok(familias.has('B1') && familias.has('B2') && familias.has('B3') && familias.has('B4') && familias.has('B5'), 'las cinco familias de usabilidad');
  assert.ok([...familias].some((f) => !f.startsWith('B')), 'y al menos una de calidad de codigo');
  const sev = new Set(fixture.violations.map((v) => contenido.heuristics.rules.find((r) => r.id === v.rule).initial_severity));
  assert.deepEqual([...sev].sort(), ['blocks', 'records', 'warns'], 'hay una violacion de cada severidad');
});

test('el fixture usa los nombres de campo del contrato de configuracion, no otros', () => {
  const declarados = Object.keys(cargarFuentes().schema.project_config.fields);
  assert.deepEqual(Object.keys(fixture.config).sort(), [...declarados].sort(),
    'si el fixture y el contrato se separan, la prueba deja de probar lo que el consumidor va a escribir');
});

test('sin violaciones y con todo encendido: verde, con las dos cifras', () => {
  const r = correr({}, []);
  assert.equal(r.verdict, 'green');
  assert.equal(r.figures.compliance.numerator, r.figures.compliance.denominator);
  assert.equal(r.figures.gate_coverage.numerator, 45);
});

test('todo veredicto que emite el evaluador esta declarado en el esquema', () => {
  const declarados = cargarFuentes().schema.enums.verdict;
  const casos = [
    correr({}, []),
    correr({}, ['CQ-15']),
    correr({ switches: { code_quality: false, usability: true } }, []),
    evaluarHeuristicas(fixture.config, medir([]).filter((m) => m.rule !== 'UX-12'), contenido),
  ];
  for (const r of casos) assert.ok(declarados.includes(r.verdict), 'veredicto no declarado: ' + r.verdict);
  assert.deepEqual([...new Set(casos.map((r) => r.verdict))].sort(), ['green', 'invalid_ruleset', 'not_measured', 'red'],
    'los cuatro veredictos se alcanzan de verdad, no son una lista de deseos');
});

test('calidad encendida, con violacion: rojo nombrando la regla y el archivo', () => {
  const r = correr({}, ['CQ-15']);
  assert.equal(r.verdict, 'red');
  assert.deepEqual(r.reds.map((x) => x.rule), ['CQ-15']);
  assert.equal(r.reds[0].file, 'src/screens/payment.tsx');
  assert.match(renderizar(r), /red CQ-15 in src\/screens\/payment\.tsx/);
});

test('calidad apagada CON registro: verde, y el reporte dice que esta apagada y quien lo autorizo', () => {
  const r = correr({ switches: { code_quality: { on: false, ...REGISTRO }, usability: true } }, ['CQ-15']);
  assert.equal(r.verdict, 'green');
  assert.deepEqual(r.reds, []);
  assert.equal(r.groups_switched_off.length, 1);
  assert.equal(r.groups_switched_off[0].group, 'code_quality');
  assert.equal(r.groups_switched_off[0].authorized_by, 'the owner');
  const texto = renderizar(r);
  assert.match(texto, /group switched off: code_quality/);
  assert.match(texto, /review: 2027-01-31/);
  assert.ok(!/NO RECORD/.test(texto));
});

test('calidad apagada SIN registro: rojo, y no se emite tablero', () => {
  const r = correr({ switches: { code_quality: false, usability: true } }, ['CQ-15']);
  assert.equal(r.verdict, 'invalid_ruleset');
  assert.equal(r.figures, null, 'un reglamento invalido no produce cifras');
  assert.match(renderizar(r), /no scoreboard/);
  assert.match(r.invalid_ruleset[0], /switched off without a record/);
});

test('D-046 (4): el resultado observable CAMBIA al prender y apagar el interruptor', () => {
  const encendido = correr({}, ['CQ-15']);
  const apagado = correr({ switches: { code_quality: { on: false, ...REGISTRO }, usability: true } }, ['CQ-15']);
  assert.notEqual(encendido.verdict, apagado.verdict, 'si el veredicto no cambia, el interruptor es decoracion');
  assert.notEqual(renderizar(encendido), renderizar(apagado));
  assert.ok(apagado.figures.gate_coverage.numerator < encendido.figures.gate_coverage.numerator,
    'apagar un grupo baja la cobertura de la compuerta');
});

test('usabilidad encendida, con un perfil que alcanza de mas: rojo en UX-12 con el perfil nombrado', () => {
  const r = correr({}, ['UX-12']);
  assert.equal(r.verdict, 'red');
  assert.deepEqual(r.reds.map((x) => x.rule), ['UX-12']);
  assert.match(r.reds[0].detail, /the enquiry profile reaches collect a payment/);
});

test('usabilidad encendida, con una funcionalidad sin fila en la matriz: rojo en UX-08', () => {
  const r = correr({}, ['UX-08']);
  assert.equal(r.verdict, 'red');
  assert.deepEqual(r.reds.map((x) => x.rule), ['UX-08']);
});

test('los dos grupos apagados con registro: verde, con las dos lineas de apagado', () => {
  const r = correr({
    switches: { code_quality: { on: false, ...REGISTRO }, usability: { on: false, ...REGISTRO } },
  }, todas);
  assert.equal(r.verdict, 'green');
  assert.equal(r.groups_switched_off.length, 2, 'las dos lineas tienen que existir en el reporte');
  assert.equal(r.figures.gate_coverage.numerator, 0, 'nada activo');
  assert.equal(r.figures.compliance.value, null, 'sin reglas contables no hay porcentaje que inventar');
  assert.equal((renderizar(r).match(/group switched off:/g) ?? []).length, 2);
});

test('una violacion de una regla que AVISA: verde, y abre un pendiente que la nombra', () => {
  const r = correr({}, ['CQ-07']);
  assert.equal(r.verdict, 'green', 'avisar no bloquea');
  assert.deepEqual(r.warnings.map((x) => x.rule), ['CQ-07']);
  assert.equal(r.warnings[0].opens_pending, true, 'avisar no es aprobar');
  assert.match(renderizar(r), /warning CQ-07 in src\/domain\/payment\.ts -> opens a pending item/);
});

test('una violacion de una regla que REGISTRA: verde, y queda registrada', () => {
  const r = correr({}, ['UX-06']);
  assert.equal(r.verdict, 'green');
  assert.deepEqual(r.records.map((x) => x.rule), ['UX-06']);
});

test('tablero: una violacion que bloquea baja el cumplimiento en exactamente una regla', () => {
  const base = correr({}, []);
  const con = correr({}, ['CQ-15']);
  assert.equal(con.figures.compliance.denominator, base.figures.compliance.denominator, 'el denominador no se mueve');
  assert.equal(con.figures.compliance.numerator, base.figures.compliance.numerator - 1);
  assert.equal(con.closes_blocks, false, 'el promedio no cierra bloques: el verde lo decide cada regla');
});

test('tablero: apagar una regla con registro sube el cumplimiento y baja la cobertura', () => {
  const con = correr({}, ['CQ-15']);
  const apagada = correr({ switched_off: [{ rule: 'CQ-15', ...REGISTRO }] }, ['CQ-15']);
  assert.ok(apagada.figures.compliance.value > con.figures.compliance.value, 'apagar sube el cumplimiento');
  assert.equal(apagada.figures.gate_coverage.numerator, con.figures.gate_coverage.numerator - 1,
    'y baja la cobertura en exactamente una regla sobre las declaradas');
  assert.equal(apagada.figures.gate_coverage.denominator, 45);
  assert.deepEqual(apagada.switched_off, [{ rule: 'CQ-15', reason: REGISTRO.reason, authorized_by: 'the owner', review_date: '2027-01-31', since: null }],
    'el reporte nombra la regla, el motivo y la fecha de revision');
});

test('tablero: apagar una regla sin registro no emite cifras, emite rojo', () => {
  const r = correr({ switched_off: [{ rule: 'CQ-15', reason: 'it is annoying' }] }, ['CQ-15']);
  assert.equal(r.verdict, 'invalid_ruleset');
  assert.equal(r.figures, null);
  assert.match(r.invalid_ruleset.join(' '), /CQ-15 is switched off without a record: missing authorized_by, review_date/);
});

test('tablero: el mismo arbol y la misma configuracion dan la misma cifra, identica', () => {
  const a = correr({}, ['CQ-15', 'UX-12']);
  const b = correr({}, ['CQ-15', 'UX-12']);
  assert.deepEqual(a.figures, b.figures);
  assert.equal(renderizar(a), renderizar(b));
});

test('tablero: la huella del reglamento viaja con cada registro', () => {
  const r = correr({}, []);
  assert.equal(r.fingerprint.catalog_version, contenido.catalog_version);
  assert.equal(r.fingerprint.adapter, 'react-vite');
  assert.equal(r.fingerprint.rules_declared, 45);
  assert.deepEqual(r.fingerprint.tools, fixture.config.tools);
});

test('tablero: dos corridas con reglamentos distintos quedan con huellas distintas', () => {
  const a = correr({}, []);
  const b = correr({ switched_off: [{ rule: 'CQ-15', ...REGISTRO }] }, []);
  assert.notDeepEqual(a.fingerprint, b.fingerprint, 'si las huellas fueran iguales, las dos cifras se graficarian como una serie falsa');
});

test('lo que juzga una persona queda fuera del porcentaje', () => {
  const r = correr({}, []);
  const manuales = contenido.heuristics.rules.filter((x) => x.instrument.length === 1 && x.instrument[0] === 'manual_case');
  assert.ok(manuales.length >= 15, 'hay un monton de reglas que solo juzga una persona');
  assert.equal(r.figures.compliance.denominator, 45 - manuales.length,
    'el porcentaje cuenta solo lo que mide una maquina');
  const humana = correr({}, ['UX-20']);
  assert.equal(humana.figures.compliance.value, r.figures.compliance.value,
    'una violacion de un caso manual no mueve el porcentaje: se reporta aparte');
  assert.deepEqual(humana.warnings.map((x) => x.rule), ['UX-20'], 'pero se reporta');
});

test('una regla activa que esta instalacion no midio no se lee como verde', () => {
  const sinMedir = medir([]).filter((m) => m.rule !== 'UX-12');
  const r = evaluarHeuristicas(fixture.config, sinMedir, contenido);
  assert.equal(r.verdict, 'not_measured');
  assert.deepEqual(r.declared_not_measured.map((x) => x.rule), ['UX-12']);
  assert.match(renderizar(r), /declared, not measured by this installation: UX-12 \(blocks\)/);
});

test('CQ-09 solo corre donde hay usuarios reales, y eso es alcance y no una excepcion', () => {
  const con = correr({ real_users: true }, []);
  const sin = correr({ real_users: false }, []);
  assert.ok(!con.out_of_scope.some((f) => f.rule === 'CQ-09'));
  assert.ok(sin.out_of_scope.some((f) => f.rule === 'CQ-09'));
  assert.equal(sin.switched_off.length, 0, 'fuera de alcance no es lo mismo que apagada');
});

test('el adaptador de linea de comandos deja fuera de alcance las dos reglas que el anexo excluye', () => {
  const r = correr({ frontend: 'cli' }, []);
  assert.deepEqual(r.out_of_scope.map((f) => f.rule).filter((id) => id.startsWith('CQ-1')), ['CQ-17', 'CQ-18']);
});

test('el reporte sale en el orden que manda D-047: veredicto, cifras, apagados', () => {
  const texto = renderizar(correr({ switched_off: [{ rule: 'CQ-17', ...REGISTRO }] }, ['CQ-15', 'CQ-07']));
  const pos = (re) => texto.search(re);
  assert.ok(pos(/^verdict:/m) === 0);
  assert.ok(pos(/^compliance:/m) > pos(/red CQ-15/));
  assert.ok(pos(/^rule switched off:/m) > pos(/^gate coverage:/m));
  assert.ok(pos(/^fingerprint:/m) > pos(/^rule switched off:/m));
});
