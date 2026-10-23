// Evaluador de REFERENCIA del grupo de heuristicas (el evaluador `heuristics`).
//
// Por que vive en el repositorio del metodo y no solo en la herramienta: lo que el
// metodo publica no es una lista de reglas, es un VEREDICTO. Si cada herramienta
// inventa que significa "verde" con una regla apagada, el metodo perdio la compuerta
// igual que cuando la definicion vivia compilada. Esto es la semantica, ejecutable, y
// las pruebas de tests/ la falsifican con el fixture de violaciones deliberadas.
//
// No escanea codigo: recibe el resultado por regla ya medido. Lo que decide es que
// quiere decir ese conjunto de resultados, con los interruptores puestos.
//
// El vocabulario de entrada y de salida esta en ingles y lo declara gates/schema.json
// (project_config, enums.verdict, enums.rule_situation): es contrato con el consumidor
// (D-051), no prosa del metodo.
import { armarContenido } from './gates_lib.mjs';

const CAMPOS_DEL_REGISTRO = ['reason', 'authorized_by', 'review_date'];

/** Lee el interruptor de un grupo: true, o { on:false, reason, authorized_by, review_date }. */
function leerInterruptor(valor) {
  if (valor === true || valor === undefined) return { on: true, record: null, missing: [] };
  if (valor === false) return { on: false, record: null, missing: [...CAMPOS_DEL_REGISTRO] };
  const encendido = valor.on !== false;
  if (encendido) return { on: true, record: null, missing: [] };
  return { on: false, record: valor, missing: CAMPOS_DEL_REGISTRO.filter((c) => !valor[c]) };
}

/**
 * @param {object} config   { frontend, real_users, switches, switched_off, thresholds, tools }
 * @param {Array}  medido   [{ rule, state: 'pass' | 'fail', file?, detail? }]
 * @param {object} contenido  el catalogo publicado (por defecto, el del repositorio)
 */
export function evaluarHeuristicas(config, medido, contenido = armarContenido()) {
  const cat = contenido.heuristics;
  const porId = new Map(cat.rules.map((r) => [r.id, r]));
  const resultado = new Map((medido ?? []).map((m) => [m.rule, m]));
  const familia = contenido.adapters.families.find((f) => f.id === config.frontend) ?? null;

  const invalidez = [];
  const interruptores = {};
  for (const g of cat.groups) {
    const i = leerInterruptor((config.switches ?? {})[g.id]);
    interruptores[g.id] = i;
    if (!i.on && i.missing.length) {
      invalidez.push('group ' + g.id + ' is switched off without a record: missing ' + i.missing.join(', '));
    }
  }

  const apagadas = new Map();
  for (const a of config.switched_off ?? []) {
    apagadas.set(a.rule, a);
    const faltan = CAMPOS_DEL_REGISTRO.filter((c) => !a[c]);
    if (faltan.length) invalidez.push('rule ' + a.rule + ' is switched off without a record: missing ' + faltan.join(', '));
    if (!porId.has(a.rule)) invalidez.push('rule ' + a.rule + ' does not exist in the catalogue');
  }

  const estado = [];
  for (const r of cat.rules) {
    const fila = {
      rule: r.id, group: r.group, severity: r.initial_severity, human_red: r.human_red,
      counts_in_percentage: r.instrument.some((i) => i !== 'manual_case'),
      situation: null, note: null, measured: resultado.get(r.id) ?? null,
    };
    if (familia && familia.not_applicable.includes(r.id)) { fila.situation = 'out_of_scope'; fila.note = 'adapter ' + familia.id + ' declares it does not apply'; }
    else if (r.applies_if === 'real_users' && !config.real_users) { fila.situation = 'out_of_scope'; fila.note = 'applies only with real users, and the project declares it has none'; }
    else if (!interruptores[r.group].on) { fila.situation = 'group_switched_off'; fila.note = 'group ' + r.group + ' is switched off'; }
    else if (apagadas.has(r.id)) { fila.situation = 'switched_off'; fila.note = apagadas.get(r.id).reason ?? null; }
    else if (!fila.measured) { fila.situation = 'declared_not_measured'; fila.note = 'this installation did not measure it: it is not read as green'; }
    else fila.situation = fila.measured.state === 'pass' ? 'pass' : 'fail';
    estado.push(fila);
  }

  const activas = estado.filter((f) => ['pass', 'fail', 'declared_not_measured'].includes(f.situation));
  const rojos = estado.filter((f) => f.situation === 'fail' && f.severity === 'blocks');
  const avisos = estado.filter((f) => f.situation === 'fail' && f.severity === 'warns');
  const registros = estado.filter((f) => f.situation === 'fail' && f.severity === 'records');
  const noMedidas = estado.filter((f) => f.situation === 'declared_not_measured');
  const sinMedirQueBloquean = noMedidas.filter((f) => f.severity === 'blocks');

  let veredicto;
  if (invalidez.length) veredicto = 'invalid_ruleset';
  else if (rojos.length) veredicto = 'red';
  else if (sinMedirQueBloquean.length) veredicto = 'not_measured';
  else veredicto = 'green';

  // El tablero: dos cifras, y ninguna si el reglamento es invalido (D-047).
  let cifras = null;
  if (veredicto !== 'invalid_ruleset') {
    const contables = activas.filter((f) => f.counts_in_percentage);
    const pasan = contables.filter((f) => f.situation === 'pass').length;
    cifras = {
      compliance: { numerator: pasan, denominator: contables.length, value: contables.length ? redondear(pasan / contables.length) : null },
      gate_coverage: { numerator: activas.length, denominator: cat.counts.total, value: redondear(activas.length / cat.counts.total) },
      note: 'Compliance counts only what a machine judges. What a person judges is reported separately and stays out of the percentage (D-047). The denominator of the coverage figure is the 45 declared rules, exactly as D-047 says; whatever is out of scope is reported on its own line and not hidden.',
    };
  }

  return {
    verdict: veredicto,
    invalid_ruleset: invalidez,
    reds: rojos.map((f) => ({ rule: f.rule, file: f.measured?.file ?? null, detail: f.measured?.detail ?? null, human_red: f.human_red })),
    warnings: avisos.map((f) => ({ rule: f.rule, file: f.measured?.file ?? null, opens_pending: true })),
    records: registros.map((f) => ({ rule: f.rule, file: f.measured?.file ?? null })),
    declared_not_measured: noMedidas.map((f) => ({ rule: f.rule, severity: f.severity, note: f.note })),
    switched_off: estado.filter((f) => f.situation === 'switched_off').map((f) => {
      const a = apagadas.get(f.rule);
      return { rule: f.rule, reason: a.reason ?? null, authorized_by: a.authorized_by ?? null, review_date: a.review_date ?? null, since: a.since ?? null };
    }),
    groups_switched_off: cat.groups.filter((g) => !interruptores[g.id].on).map((g) => ({
      group: g.id,
      reason: interruptores[g.id].record?.reason ?? null,
      authorized_by: interruptores[g.id].record?.authorized_by ?? null,
      review_date: interruptores[g.id].record?.review_date ?? null,
      warning: 'a switched-off group is not read as fulfilled',
    })),
    out_of_scope: estado.filter((f) => f.situation === 'out_of_scope').map((f) => ({ rule: f.rule, note: f.note })),
    figures: cifras,
    fingerprint: {
      catalog_version: contenido.catalog_version,
      schema_version: contenido.schema_version,
      rules_declared: cat.counts.total,
      rules_active: activas.length,
      rules_switched_off: estado.filter((f) => ['switched_off', 'group_switched_off'].includes(f.situation)).length,
      adapter: config.frontend ?? null,
      tools: config.tools ?? null,
    },
    closes_blocks: false,
  };
}

const redondear = (x) => Math.round(x * 1000) / 1000;

/** El reporte, en el orden que manda D-047: veredicto, cifras, apagados, movimiento. */
export function renderizar(r) {
  const lineas = [];
  lineas.push('verdict: ' + r.verdict.toUpperCase());
  for (const m of r.invalid_ruleset) lineas.push('  invalid ruleset: ' + m);
  for (const x of r.reds) lineas.push('  red ' + x.rule + (x.file ? ' in ' + x.file : '') + (x.human_red ? ' (human red: verified at the close of the pending item)' : ''));
  for (const x of r.declared_not_measured) lineas.push('  declared, not measured by this installation: ' + x.rule + ' (' + x.severity + ')');
  for (const x of r.warnings) lineas.push('  warning ' + x.rule + (x.file ? ' in ' + x.file : '') + ' -> opens a pending item');
  for (const x of r.records) lineas.push('  records ' + x.rule + (x.file ? ' in ' + x.file : ''));
  if (r.figures) {
    lineas.push('compliance: ' + r.figures.compliance.numerator + '/' + r.figures.compliance.denominator);
    lineas.push('gate coverage: ' + r.figures.gate_coverage.numerator + '/' + r.figures.gate_coverage.denominator);
  } else {
    lineas.push('no scoreboard: an invalid ruleset emits no figures');
  }
  for (const g of r.groups_switched_off) lineas.push('group switched off: ' + g.group + ' -- reason: ' + (g.reason ?? 'NO RECORD') + ' -- authorized by: ' + (g.authorized_by ?? 'NO RECORD') + ' -- review: ' + (g.review_date ?? 'NO RECORD'));
  for (const a of r.switched_off) lineas.push('rule switched off: ' + a.rule + ' -- reason: ' + (a.reason ?? 'NO RECORD') + ' -- authorized by: ' + (a.authorized_by ?? 'NO RECORD') + ' -- review: ' + (a.review_date ?? 'NO RECORD'));
  for (const f of r.out_of_scope) lineas.push('out of scope: ' + f.rule + ' -- ' + f.note);
  lineas.push('fingerprint: catalog ' + r.fingerprint.catalog_version + ', ' + r.fingerprint.rules_active + ' active, ' + r.fingerprint.rules_switched_off + ' switched off, adapter ' + (r.fingerprint.adapter ?? 'not declared'));
  return lineas.join('\n');
}
