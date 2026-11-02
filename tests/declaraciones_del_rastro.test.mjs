// Las declaraciones del RASTRO: lo que un peldano cuyo trabajo esta afuera puede exigir.
//
// Por que existe. D-081 y D-082 agregan al dato doce claves que un informe o un archivo de
// casos tiene que traer para que una compuerta pueda leer el rastro del trabajo que no hizo.
// El dato las declara como `must_contain`, o sea como expresiones regulares, y una expresion
// regular mal escrita no se nota: pasa todo o no pasa nada, y las dos fallas se leen igual
// desde afuera. Medido el 2026-11-02, antes de commitear: tres de las doce salian en ROJO
// contra un informe correcto, porque `must_contain` se compila con la bandera `i` y nada mas,
// asi que `.` no cruza el salto de linea y un informe que escribe la clave como titulo de
// seccion no pasaba. Eso se arreglo; esta prueba es lo que impide que vuelva.
//
// D-084 agrega cinco mas, sobre el peldano 9, y son de la misma familia por la misma razon:
// la compuerta no puede JUZGAR un criterio que juzga una persona, asi que lo que exige es el
// rastro -- el denominador, la reparticion entre programa y persona, la deuda con su
// verificador pendiente y el instrumento de cada criterio--. Esa ultima trae una simetria que
// las doce de D-081 y D-082 no tenian: los cuatro instrumentos que la expresion acepta son los
// que declara `heuristics.json#instruments`, asi que el verificador se DERIVA del dato y no lo
// elige quien escribe el documento; la comprobacion E lo exige en las dos direcciones.
//
// Lo que exige, y es lo que ninguna otra prueba del arbol mira:
//   A. que las claves esten declaradas en el peldano y el archivo que les toca;
//   B. que sus expresiones ACEPTEN lo que el prompt le pide al informe;
//   C. que RECHACEN el caso que las origino -- el informe que se declara parcial, la cifra
//      inventada, el archivo de casos sin su deuda --, que es la mitad que importa: una
//      comprobacion que nadie vio caer no demuestra que guarde nada;
//   D. que `audit_completeness` siga sin cruzar el salto de linea, que es una decision
//      escrita de D-081 y no un descuido: una ventana permisiva ahi podria tomar un
//      "complete" de la prosa de al lado, y un verde falso es el defecto que D-081 cierra.
//
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { raiz } from '../build/gates_lib.mjs';

const steps = JSON.parse(readFileSync(join(raiz, 'gates', 'steps.json'), 'utf8')).steps;
const paso = (n) => steps.find((s) => s.num === n);

/** Como las compila el consumidor: la bandera `i` y nada mas. Si esto cambia, cambia el contrato. */
const compilar = (fuente) => new RegExp(fuente, 'i');

/** Las exigencias de un artefacto del peldano, por una de sus expresiones. */
function exigencias(num, ruta) {
  return paso(num).artifacts
    .filter((a) => a.path === ruta && Array.isArray(a.must_contain))
    .flatMap((a) => a.must_contain);
}

/** Un texto pasa un artefacto cuando satisface TODAS sus expresiones. */
function pasa(texto, expresiones) {
  return expresiones.every((fuente) => compilar(fuente).test(texto));
}

// Las doce claves de D-081 y D-082, con el peldano y el archivo donde el dato las declara.
const CLAVES = [
  { clave: 'audit_completeness', num: 13, ruta: 'docs/AUDIT_*.md' },
  { clave: 'findings_announced', num: 13, ruta: 'docs/AUDIT_*.md' },
  { clave: 'findings_written', num: 13, ruta: 'docs/AUDIT_*.md' },
  { clave: 'dimension_grades', num: 13, ruta: 'docs/AUDIT_*.md' },
  { clave: 'receipts_reproduced', num: 13, ruta: 'docs/AUDIT_*.md' },
  { clave: 'not_audited', num: 13, ruta: 'docs/AUDIT_*.md' },
  { clave: 'cases_written', num: 10, ruta: 'docs/MANUAL_TESTS.md' },
  { clave: 'cases_executed_by_a_person', num: 10, ruta: 'docs/MANUAL_TESTS.md' },
  { clave: 'execution_debt', num: 10, ruta: 'docs/MANUAL_TESTS.md' },
  { clave: 'screens_total', num: 10, ruta: 'docs/SCREEN_WALKTHROUGH.md' },
  { clave: 'screens_walked', num: 10, ruta: 'docs/SCREEN_WALKTHROUGH.md' },
  { clave: 'walkthrough_findings', num: 10, ruta: 'docs/SCREEN_WALKTHROUGH.md' },
];

test('A: cada clave del rastro esta declarada en el peldano y el archivo que le toca', () => {
  for (const { clave, num, ruta } of CLAVES) {
    const fuentes = exigencias(num, ruta);
    assert.ok(fuentes.length, 'el peldano ' + num + ' no exige nada sobre ' + ruta);
    assert.ok(
      fuentes.some((f) => f.startsWith(clave)),
      'el peldano ' + num + ' no declara ' + clave + ' sobre ' + ruta,
    );
  }
});

// --- Peldano 13: el informe de auditoria -------------------------------------------------

/** Un informe que trae todo lo que el prompt le pide, con las claves en una sola linea. */
const INFORME_COMPLETO = [
  'Auditor: modelo-que-audita sobre el commit abc1234.',
  'auditor_choice: different_model -- lo decidio el dueno.',
  'audit_completeness: complete',
  'findings_announced: 9',
  'findings_written: 9',
  'dimension_grades: integridad B, seguridad C, rendimiento A',
  'receipts_reproduced: el recibo del PND-500 reproduces con el comando de su rojo.',
  'not_audited: none',
  'evidence_register_health: 1 de 12 commits sin recibo.',
  'findings_by_destination: el hallazgo 1 va a product.',
].join('\n');

/** El mismo informe escribiendo las tres claves de vocabulario cerrado como TITULO. */
const INFORME_EN_SECCIONES = INFORME_COMPLETO
  .replace('receipts_reproduced: el recibo del PND-500 reproduces con el comando de su rojo.',
    '## receipts_reproduced\n\n- el recibo del PND-500: reproduces, con el comando de su rojo.')
  .replace('not_audited: none', '## not_audited\n\nno quedo nada afuera: none.');

test('B: el informe que el prompt pide pasa los cuatro chequeos de D-081', () => {
  const fuentes = exigencias(13, 'docs/AUDIT_*.md');
  assert.ok(pasa(INFORME_COMPLETO, fuentes), 'un informe correcto no pasa: ' +
    fuentes.filter((f) => !compilar(f).test(INFORME_COMPLETO)).join(' | '));
});

test('B: y pasa igual cuando escribe las claves de vocabulario cerrado como titulo de seccion', () => {
  // Es la medicion que cambio el dato antes de commitear: con una ventana que no cruza el
  // salto de linea, este informe --que dice exactamente lo que el prompt pide-- salia en rojo.
  const fuentes = exigencias(13, 'docs/AUDIT_*.md');
  assert.ok(pasa(INFORME_EN_SECCIONES, fuentes), 'el informe por secciones no pasa: ' +
    fuentes.filter((f) => !compilar(f).test(INFORME_EN_SECCIONES)).join(' | '));
});

test('C: ROJO -- el informe que se declara parcial no cierra el peldano 13', () => {
  // El caso que origino D-081: nueve anunciados, cuatro escritos, y el auditor lo dice.
  const parcial = INFORME_COMPLETO
    .replace('audit_completeness: complete', 'audit_completeness: partial')
    .replace('findings_written: 9', 'findings_written: 4');
  const fuentes = exigencias(13, 'docs/AUDIT_*.md');
  assert.ok(!pasa(parcial, fuentes), 'un informe que se declara parcial pasa, y no deberia');
  const fallan = fuentes.filter((f) => !compilar(f).test(parcial));
  assert.deepEqual(fallan.map((f) => f.split(/[.[]/)[0]), ['audit_completeness'],
    'el unico chequeo que tiene que caer es el de la completitud, y cayeron: ' + fallan.join(' | '));
});

test('C: ROJO -- "incomplete" no cuenta como "complete", que es el borde de la expresion', () => {
  const fuentes = exigencias(13, 'docs/AUDIT_*.md').filter((f) => f.startsWith('audit_completeness'));
  assert.equal(fuentes.length, 1);
  const re = compilar(fuentes[0]);
  assert.ok(re.test('audit_completeness: complete'));
  assert.ok(!re.test('audit_completeness: incomplete'),
    'la expresion toma el "complete" que esta adentro de "incomplete"');
  assert.ok(!re.test('audit_completeness: incomplete (4 de 9)'));
});

test('D: audit_completeness NO cruza el salto de linea, y es una decision escrita', () => {
  // D-081: una ventana permisiva aca podria tomar un "complete" de la prosa de al lado, y un
  // verde falso es justo el defecto que la decision cierra. Las tres de vocabulario cerrado
  // SI cruzan, porque un informe las escribe naturalmente como titulo.
  const fuentes = exigencias(13, 'docs/AUDIT_*.md');
  const una = (clave) => fuentes.find((f) => f.startsWith(clave));
  assert.ok(!una('audit_completeness').includes('\\s\\S'),
    'audit_completeness quedo con una ventana que cruza el salto de linea');
  const titulo = 'audit_completeness\n\nno pude completar la auditoria entera.';
  assert.ok(!compilar(una('audit_completeness')).test(titulo),
    'la clave toma un "complete" que esta en la prosa de la linea siguiente');
  for (const clave of ['receipts_reproduced', 'not_audited']) {
    assert.ok(una(clave).includes('\\s\\S'), clave + ' no cruza el salto de linea');
  }
});

// --- Peldano 10: la deuda de ejecucion y la recorrida ------------------------------------

const CASOS_CON_DEUDA = [
  '# Casos de prueba manual',
  '',
  'cases_written: 13',
  'cases_executed_by_a_person: 0',
  'execution_debt: pending_verifier -- los trece los debe ejecutar el dueno, desde el 2026-11-02.',
].join('\n');

const RECORRIDA = [
  '# Recorrida de las pantallas',
  '',
  'screens_total: 7',
  'screens_walked: 6',
  'walkthrough_findings: 3',
  '',
  'La pantalla de administracion no se pudo abrir: esta detras de un perfil que el agente no',
  'tiene. Se cuenta en el total con su razon.',
].join('\n');

test('B: el archivo de casos con su deuda declarada y la recorrida con su denominador pasan', () => {
  assert.ok(pasa(CASOS_CON_DEUDA, exigencias(10, 'docs/MANUAL_TESTS.md')),
    'el archivo de casos con la deuda declarada no pasa');
  assert.ok(pasa(RECORRIDA, exigencias(10, 'docs/SCREEN_WALKTHROUGH.md')),
    'la recorrida con su denominador no pasa');
});

test('C: ROJO -- los casos escritos sin la deuda declarada no pasan el peldano 10', () => {
  const sinDeuda = '# Casos de prueba manual\n\n## CP-01 -- Alta de turno (PND-500)\n\n1. Abrir.';
  assert.ok(!pasa(sinDeuda, exigencias(10, 'docs/MANUAL_TESTS.md')),
    'un archivo de casos sin ninguna de las tres declaraciones pasa, y no deberia');
});

test('C: ROJO -- la deuda sin su vocabulario, y la cifra sin su numero, no pasan', () => {
  const fuentes = exigencias(10, 'docs/MANUAL_TESTS.md');
  const inventada = CASOS_CON_DEUDA.replace('execution_debt: pending_verifier',
    'execution_debt: la va a ejecutar alguien');
  assert.ok(!pasa(inventada, fuentes), 'un valor fuera del vocabulario pasa, y no deberia');
  const sinCifra = CASOS_CON_DEUDA.replace('cases_written: 13', 'cases_written: los que hay');
  assert.ok(!pasa(sinCifra, fuentes), 'una cifra escrita en prosa pasa, y no deberia');
});

test('C: ROJO -- una recorrida sin denominador no pasa, que es CQ-19.1 en el dato', () => {
  const fuentes = exigencias(10, 'docs/SCREEN_WALKTHROUGH.md');
  const sinTotal = RECORRIDA.replace('screens_total: 7\n', '');
  assert.ok(!pasa(sinTotal, fuentes), 'una recorrida sin su total pasa, y no deberia');
  const sinHallazgos = RECORRIDA.replace('walkthrough_findings: 3\n', '');
  assert.ok(!pasa(sinHallazgos, fuentes), 'una recorrida sin su cuenta de hallazgos pasa');
});

test('A: la recorrida es un artefacto NUEVO del peldano 10, con su procedencia', () => {
  const art = paso(10).artifacts.find((a) => a.path === 'docs/SCREEN_WALKTHROUGH.md');
  assert.ok(art, 'el peldano 10 no declara la recorrida');
  assert.equal(art.since_schema, 2);
  assert.equal(typeof art.since_version, 'string');
});

// --- Peldano 9: quien verifico cada criterio (D-084) -------------------------------------
//
// La misma familia: una clave que una compuerta lee sobre un trabajo que no hizo. Aca el
// trabajo que la compuerta no puede hacer es JUZGAR un criterio que juzga una persona, asi
// que lo que se exige es el rastro: el denominador, la reparticion entre programa y persona,
// la deuda con su verificador pendiente, y el instrumento de cada criterio.

const CUMPLIMIENTO = [
  '# Usabilidad -- cumplimiento regla por regla',
  '',
  'criteria_total: 28',
  'criteria_verified_by_a_program: 6 (yarn lint:ux, corrida del 2026-11-02)',
  'criteria_verified_by_a_person: 1 (Pablo, 2026-11-02)',
  'verification_debt: pending_verifier -- las 21 restantes las debe juzgar el dueno, desde el 2026-11-02.',
  '',
  '| regla | resultado | verified_by | firma |',
  '|---|---|---|---|',
  '| UX-03 | cumplida | auto_gate | la corrida de hoy |',
  '| UX-22 | cumplida | manual_case | Pablo, 2026-11-02 |',
  '| UX-27 | not_verifiable | manual_case | nadie todavia |',
].join('\n');

const DOCUMENTOS = ['docs/USABILITY.md', 'docs/CODE_QUALITY.md'];

/** Las entradas de D-084 sobre un documento de cumplimiento, sin las que ya estaban.
 *  Los dos documentos traen ademas, desde `2026.10.1`, la exigencia de informar regla por
 *  regla (`CQ-\d\d` en uno, `UX-\d\d` en el otro): esta prueba mira lo que D-084 agrega, y no
 *  vuelve a medir lo que el ancla 3 ya exigia. */
const entradasD084 = (ruta) => paso(9).artifacts
  .filter((a) => a.path === ruta && a.must_contain && a.since_version === '2026.10.15');
const exigenciasD084 = (ruta) => entradasD084(ruta).flatMap((a) => a.must_contain);

test('A: las cuatro declaraciones del cumplimiento estan en el peldano 9, en los dos documentos', () => {
  for (const ruta of DOCUMENTOS) {
    const fuentes = exigenciasD084(ruta);
    for (const clave of ['criteria_total', 'criteria_verified_by_a_program',
      'criteria_verified_by_a_person', 'verification_debt', 'verified_by']) {
      assert.ok(fuentes.some((f) => f.startsWith(clave)),
        'el peldano 9 no declara ' + clave + ' sobre ' + ruta);
    }
  }
});

test('B: el documento de cumplimiento que el prompt pide pasa los chequeos de D-084', () => {
  for (const ruta of DOCUMENTOS) {
    const fuentes = exigenciasD084(ruta);
    assert.ok(pasa(CUMPLIMIENTO, fuentes), ruta + ': un documento correcto no pasa: ' +
      fuentes.filter((f) => !compilar(f).test(CUMPLIMIENTO)).join(' | '));
  }
});

test('C: ROJO -- el documento del experimento, sin decir quien verifico, no pasa', () => {
  // El caso que origino PND-098: siete criterios, todos "verificado", y ninguna columna que
  // diga de quien era el criterio. Seis de los siete tuvieron que corregirse a mano despues.
  const comoEstaba = [
    '# Usabilidad -- cumplimiento regla por regla',
    '',
    '| regla | resultado |',
    '|---|---|',
    '| UX-03 | verificada |',
    '| UX-22 | verificada |',
  ].join('\n');
  for (const ruta of DOCUMENTOS) {
    assert.ok(!pasa(comoEstaba, exigenciasD084(ruta)),
      ruta + ': el documento sin verificador pasa, y no deberia');
  }
});

test('C: ROJO -- con la cabeza completa pero sin el verificador por criterio, cae UNA sola exigencia', () => {
  // Es el borde que importa: las cuatro cifras de la cabeza se pueden escribir sin decir, criterio
  // por criterio, quien lo juzgo. Si eso pasara, PND-098 seguiria abierto con la compuerta en verde.
  const soloLaCabeza = CUMPLIMIENTO.split('\n').filter((l) => !l.startsWith('|')).join('\n');
  const ruta = 'docs/USABILITY.md';
  const caen = entradasD084(ruta).filter((a) => !pasa(soloLaCabeza, a.must_contain));
  assert.equal(caen.length, 1, 'tienen que caer la exigencia del verificador y solo esa');
  assert.ok(caen[0].must_contain.includes('verified_by'),
    'la que cayo no es la del verificador por criterio');
});

test('C: ROJO -- una cifra sin numero y una deuda fuera del vocabulario no pasan', () => {
  const fuentes = exigenciasD084('docs/USABILITY.md');
  const sinCifra = CUMPLIMIENTO.replace('criteria_total: 28', 'criteria_total: las que aplican');
  assert.ok(!pasa(sinCifra, fuentes), 'un total escrito en prosa pasa, y no deberia');
  const inventada = CUMPLIMIENTO.replace('verification_debt: pending_verifier',
    'verification_debt: lo vemos la semana que viene');
  assert.ok(!pasa(inventada, fuentes), 'una deuda fuera del vocabulario pasa, y no deberia');
});

test('E: el verificador por criterio nombra EXACTAMENTE los instrumentos que el dato declara', () => {
  // Simetria productor/consumidor (SQ 14): el verificador no se elige, se DERIVA del
  // instrumento que el Anexo H ya declara para cada regla. Si el dato agregara un instrumento
  // y esta expresion no, un documento que lo usara saldria en rojo por nombrar algo que el
  // propio metodo declara; si lo quitara, la expresion aceptaria un valor que ya no existe.
  const instrumentos = JSON.parse(readFileSync(join(raiz, 'gates', 'heuristics.json'), 'utf8'))
    .instruments.map((i) => i.id).sort();
  const fuente = exigenciasD084('docs/USABILITY.md')
    .find((f) => f.startsWith('(') && f.includes('|'));
  assert.ok(fuente, 'el peldano 9 no declara la alternativa de instrumentos');
  const nombrados = fuente.replace(/^\(|\)$/g, '').split('|').sort();
  assert.deepEqual(nombrados, instrumentos,
    'la expresion y los instrumentos del Anexo H dejaron de ser la misma lista');
});

test('D: verification_debt cruza el salto de linea y criteria_total no, por la misma razon que D-081', () => {
  const fuentes = exigenciasD084('docs/USABILITY.md');
  const una = (clave) => fuentes.find((f) => f.startsWith(clave));
  assert.ok(una('verification_debt').includes('\\s\\S'),
    'verification_debt no cruza el salto de linea, y un documento la escribe como titulo');
  assert.ok(!una('criteria_total').includes('\\s\\S'),
    'una cifra con ventana que cruza el salto de linea toma el numero del renglon de al lado');
  assert.ok(!compilar(una('criteria_total')).test('criteria_total\n\nlas que aplican al proyecto'),
    'criteria_total pasa sin numero');
});
