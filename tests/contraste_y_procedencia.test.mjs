// El contraste, la procedencia y el registro contestable: lo que D-089 le agrega al dato.
//
// Por que existe. D-089 mete tres reglas y diez caras, y cuatro exigencias nuevas sobre
// artefactos de peldano -- el ensayo de destruccion y restitucion del 20, el inventario del
// codigo de terceros que CORRE del 14, los umbrales con su condicion del 19 y el error
// reconstruido del 22 --. Todas son `must_contain`, o sea expresiones regulares, y una
// expresion regular mal escrita no se nota: pasa todo o no pasa nada, y las dos fallas se
// leen igual desde afuera. Es la misma razon por la que existe
// tests/declaraciones_del_rastro.test.mjs, y la misma forma: verde contra lo que el prompt
// pide, ROJO contra el caso que la origino.
//
// Lo que exige, en este orden:
//   A. las tres reglas estan ancladas donde producen efecto, con su procedencia y sus caras;
//   B. cada peldano anclado trae al menos una pregunta de verificacion de D-089;
//   C. las cuatro claves nuevas estan declaradas en el peldano y el archivo que les toca,
//      con su `since_version`;
//   D. sus expresiones ACEPTAN el documento que el prompt pide;
//   E. y RECHAZAN el caso medido que las origino: el recibo de rendimiento sin el veredicto
//      de sus umbrales, el manual que declara honestamente que no hay respaldos, el
//      inventario sin decision por entrada y el monitoreo que cuenta sin poder mirar.
//
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { raiz } from '../build/gates_lib.mjs';

const VERSION = '2026.10.17';
const steps = JSON.parse(readFileSync(join(raiz, 'gates', 'steps.json'), 'utf8')).steps;
const reglas = JSON.parse(readFileSync(join(raiz, 'gates', 'heuristics.json'), 'utf8')).rules;
const umbrales = JSON.parse(readFileSync(join(raiz, 'gates', 'adapters.json'), 'utf8')).thresholds;
const paso = (n) => steps.find((s) => s.num === n);

/** Como las compila el consumidor: la bandera `i` y nada mas. */
const compilar = (fuente) => new RegExp(fuente, 'i');

function exigencias(num, ruta) {
  return paso(num).artifacts
    .filter((a) => a.path === ruta && Array.isArray(a.must_contain))
    .flatMap((a) => a.must_contain);
}
const pasa = (texto, expresiones) => expresiones.every((fuente) => compilar(fuente).test(texto));
const caen = (texto, expresiones) => expresiones.filter((fuente) => !compilar(fuente).test(texto));

// --- A: las tres reglas, donde producen efecto ------------------------------------------

const ESPERADAS = [
  { id: 'CQ-22', family: 'contrast', steps: [14, 19, 20], caras: 4 },
  { id: 'CQ-23', family: 'provenance', steps: [8, 9, 12], caras: 3 },
  { id: 'CQ-24', family: 'register', steps: [5, 11, 23], caras: 2 },
];

test('A: las tres reglas de D-089 se anclan donde producen efecto, con su procedencia', () => {
  for (const e of ESPERADAS) {
    const r = reglas.find((x) => x.id === e.id);
    assert.ok(r, 'el dato no declara ' + e.id);
    assert.equal(r.family, e.family, e.id + ' no lleva su familia');
    assert.equal(r.group, 'code_quality', e.id + ' no es una regla de calidad');
    assert.equal(r.initial_severity, 'blocks', e.id + ' no bloquea, y las tres bloquean');
    assert.equal(r.since_version, VERSION, e.id + ' no declara la version en la que entro');
    assert.deepEqual(r.anchor.steps, e.steps, 'una regla anclada donde no produce efecto es decoracion');
    assert.equal(r.anchor.source, 'annex');
    assert.equal(r.faces.length, e.caras, e.id + ' no trae sus caras');
    for (const c of r.faces) {
      assert.ok(c.id.startsWith(e.id + '.'), 'la cara ' + c.id + ' cuelga de otra regla');
      assert.equal(c.since_version, VERSION, 'la cara ' + c.id + ' no declara su procedencia');
      assert.ok(!('text' in c.statement), 'la cara ' + c.id + ' trae el enunciado transcrito');
    }
  }
});

test('B: cada peldano que una de las tres ancla trae su pregunta de verificacion', () => {
  const anclados = [...new Set(ESPERADAS.flatMap((e) => e.steps))].sort((a, b) => a - b);
  for (const num of anclados) {
    const preguntas = (paso(num).verify ?? [])
      .filter((v) => v && typeof v === 'object' && v.decision === 'D-089');
    assert.ok(preguntas.length, 'el peldano ' + num + ' no trae ninguna pregunta de D-089');
    for (const p of preguntas) assert.equal(p.since_version, VERSION, 'una pregunta sin procedencia');
  }
});

test('B bis: el umbral de la ventana de perdida es del dueno y no trae valor inventado', () => {
  const u = umbrales.find((x) => x.id === 'acceptable_data_loss_window');
  assert.ok(u, 'el dato no declara el umbral de la ventana de perdida aceptable');
  assert.equal(u.rule, 'CQ-22');
  assert.equal(u.value, null, 'un umbral que el metodo no fija se publica con valor nulo');
  assert.equal(u.declared, false);
  assert.equal(u.declared_by, 'the owner', 'la ventana la contesta el dueno, no el metodo ni el agente');
  assert.equal(u.since_version, VERSION);
});

// --- C y D: las cuatro claves nuevas, y lo que aceptan ----------------------------------

const CLAVES = [
  { clave: 'thresholds_total', num: 19, ruta: 'docs/PERFORMANCE.md' },
  { clave: 'thresholds_met', num: 19, ruta: 'docs/PERFORMANCE.md' },
  { clave: 'threshold_condition', num: 19, ruta: 'docs/PERFORMANCE.md' },
  { clave: 'acceptable_data_loss_window', num: 20, ruta: 'docs/RESTORE_DRILL.md' },
  { clave: 'backup_cadence', num: 20, ruta: 'docs/RESTORE_DRILL.md' },
  { clave: 'destroyed_and_restored', num: 20, ruta: 'docs/RESTORE_DRILL.md' },
  { clave: 'rows_before', num: 20, ruta: 'docs/RESTORE_DRILL.md' },
  { clave: 'rows_after', num: 20, ruta: 'docs/RESTORE_DRILL.md' },
  { clave: 'schema_after', num: 20, ruta: 'docs/RESTORE_DRILL.md' },
  { clave: 'entries_total', num: 14, ruta: 'docs/THIRD_PARTY_EXECUTION.md' },
  { clave: 'entries_with_a_decision', num: 14, ruta: 'docs/THIRD_PARTY_EXECUTION.md' },
  { clave: 'privilege', num: 14, ruta: 'docs/THIRD_PARTY_EXECUTION.md' },
  { clave: 'runs_as', num: 14, ruta: 'docs/THIRD_PARTY_EXECUTION.md' },
  { clave: 'error_reconstructed', num: 22, ruta: 'docs/MONITORING.md' },
];

test('C: cada clave nueva esta declarada en su peldano y su archivo, con su procedencia', () => {
  for (const { clave, num, ruta } of CLAVES) {
    const art = paso(num).artifacts.find((a) => a.path === ruta
      && (a.must_contain ?? []).some((f) => f.startsWith(clave)));
    assert.ok(art, 'el peldano ' + num + ' no declara ' + clave + ' sobre ' + ruta);
    assert.equal(art.since_schema, 2, clave + ' no declara su esquema');
    assert.equal(art.since_version, VERSION, clave + ' no declara la version en la que entro');
  }
});

const RENDIMIENTO = [
  '# Rendimiento',
  '',
  'thresholds_total: 3',
  'thresholds_met: 3',
  '',
  '| umbral | valor | threshold_condition | medido | veredicto |',
  '|---|---|---|---|---|',
  '| NFR-01 p95 | 300 ms | 200 usuarios simultaneos, entorno de prueba | 241 ms | pasa |',
].join('\n');

const ENSAYO = [
  '# Ensayo de restitucion',
  '',
  'acceptable_data_loss_window: 1h (lo declaro el dueno el 2026-11-07)',
  'backup_cadence: cada 30 minutos, contrastada contra la ventana: pasa',
  'destroyed_and_restored: si, el 2026-11-07, sobre una copia del sistema',
  '',
  'rows_before: 1001 talleres, 3 personas',
  'rows_after: 1001 talleres, 3 personas',
  'schema_after: migracion 007 aplicada',
].join('\n');

const TERCEROS = [
  '# Codigo de terceros que el sistema ejecuta',
  '',
  'entries_total: 2',
  'entries_with_a_decision: 2',
  '',
  '| que corre | cuando | privilege | runs_as | decision |',
  '|---|---|---|---|---|',
  '| script de instalacion de la base | al instalar | escritura en su carpeta | el usuario del servicio | aceptada, el dueno, 2026-11-07 |',
].join('\n');

const MONITOREO = [
  '# Monitoreo de errores',
  '',
  'Cada error nuevo abre su pendiente, y el reporte ciclico llega solo.',
  '',
  'error_reconstructed: un TypeError lanzado dentro de un setTimeout, seguido por su',
  'identificador desde el navegador hasta el renglon del servidor, con la misma traza.',
].join('\n');

test('D: los documentos que el prompt pide pasan las cuatro exigencias nuevas', () => {
  const casos = [
    [19, 'docs/PERFORMANCE.md', RENDIMIENTO],
    [20, 'docs/RESTORE_DRILL.md', ENSAYO],
    [14, 'docs/THIRD_PARTY_EXECUTION.md', TERCEROS],
    [22, 'docs/MONITORING.md', MONITOREO],
  ];
  for (const [num, ruta, texto] of casos) {
    const fuentes = exigencias(num, ruta);
    assert.ok(fuentes.length, 'el peldano ' + num + ' no exige nada sobre ' + ruta);
    assert.ok(pasa(texto, fuentes),
      'el documento del peldano ' + num + ' no pasa: ' + caen(texto, fuentes).join(' | '));
  }
});

// --- E: los rojos, que son la mitad que importa ----------------------------------------

test('E: ROJO -- el recibo de rendimiento sin el veredicto de sus umbrales no pasa el 19', () => {
  // Es el caso medido: p95 de 911 ms contra un techo de 300, y la compuerta en verde porque
  // verificaba que el recibo existiera. Sin las tres claves no hay nada que contrastar.
  const sinContraste = RENDIMIENTO.split('thresholds_total')[0] + 'p95 medido: 911 ms\n';
  const fuentes = exigencias(19, 'docs/PERFORMANCE.md');
  assert.ok(!pasa(sinContraste, fuentes), 'un recibo sin el contraste pasa, y no deberia');
  assert.deepEqual(caen(sinContraste, fuentes).map((f) => f.split('.')[0]).sort(),
    ['threshold_condition', 'thresholds_met', 'thresholds_total'],
    'tienen que caer las tres del contraste');
});

test('E: ROJO -- un umbral sin su condicion se lee como no declarado', () => {
  const sinCondicion = ENSAYO.replace('acceptable_data_loss_window', 'ventana aceptable');
  const fuentes = exigencias(20, 'docs/RESTORE_DRILL.md');
  assert.ok(!pasa(sinCondicion, fuentes),
    'la ventana escrita con otras palabras pasa, y la clave es nivel de datos: no se traduce');
});

test('E: ROJO -- el manual que declara honestamente que no hay respaldos no cierra el 20', () => {
  // El caso del brazo, textual en su seccion 6. El peldano cerro en verde porque la compuerta
  // verifica que el manual exista y declare lo que no sabe, no que el respaldo exista.
  const honesto = [
    '# Manual de infraestructura y recuperacion',
    '',
    '## 6. Restituir un respaldo',
    '',
    '> No hay respaldos. Ninguno. De nada.',
    '',
    'Verificado con: grep -rniE "pg_dump|pg_restore|pgbackrest|wal-g|basebackup"',
  ].join('\n');
  const fuentes = exigencias(20, 'docs/RESTORE_DRILL.md');
  assert.ok(!pasa(honesto, fuentes), 'la ausencia declarada con honestidad pasa, y no deberia');
  assert.equal(caen(honesto, fuentes).length, fuentes.length,
    'ninguna de las exigencias del ensayo la satisface un manual que solo nombra el procedimiento');
});

test('E: ROJO -- un inventario completo sin decision por entrada no cierra el 14', () => {
  const sinDecision = TERCEROS.split('entries_with_a_decision')[0]
    + '| que corre | cuando | privilege | runs_as |\n|---|---|---|---|\n';
  const fuentes = exigencias(14, 'docs/THIRD_PARTY_EXECUTION.md');
  assert.ok(!pasa(sinDecision, fuentes), 'un inventario sin decision por entrada pasa, y no deberia');
  assert.deepEqual(caen(sinDecision, fuentes).map((f) => f.split('.')[0]),
    ['entries_with_a_decision'],
    'lo unico que tiene que caer es la cuenta de entradas con decision');
});

test('E: ROJO -- el monitoreo que cuenta sin poder mirar no cierra el 22', () => {
  const soloContador = MONITOREO.split('error_reconstructed')[0] + 'Contador de 5xx: 143 en el ciclo.\n';
  const fuentes = exigencias(22, 'docs/MONITORING.md');
  assert.ok(!pasa(soloContador, fuentes), 'un contador de 5xx solo pasa, y no deberia');
  assert.deepEqual(caen(soloContador, fuentes), ['error_reconstructed'],
    'lo unico que tiene que caer es el error reconstruido');
});

test('E bis: el registro de anti-patrones dice en que peldano nacio, y eso se puede caer', () => {
  const fuentes = exigencias(11, 'docs/GOTCHAS.md');
  const conOrigen = [
    '# Anti-patrones',
    '',
    'register_opened_at_step: 01',
    'rows_written_retroactively: 0',
  ].join('\n');
  assert.ok(pasa(conOrigen, fuentes), 'el registro con su origen no pasa: ' + caen(conOrigen, fuentes).join(' | '));
  const sinOrigen = '# Anti-patrones\n\nAP-01: el caso de la matriz escrita en cuatro lugares.\n';
  assert.ok(!pasa(sinOrigen, fuentes), 'un registro que no dice cuando nacio pasa, y no deberia');
  assert.equal(caen(sinOrigen, fuentes).length, 2, 'tienen que caer las dos claves del origen');
});
