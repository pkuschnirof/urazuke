// Genera docs/COMPUERTAS.md desde los datos de gates/. NO se escribe a mano: dos copias
// del mismo contenido se desincronizan solas, que es el antipatrón que persigue el
// peldaño 11. Si algo está mal en el documento, se arregla la fuente o este script.
//
// El documento está EN INGLÉS (D-051). Queda fuera del corpus traducido, como
// documentación de herramienta, y lo que no está traducido se publica en el idioma
// canónico de la profesión; traducir para el usuario final es trabajo del consumidor.
// Sale en ASCII puro, igual que los datos de los que se genera.
//
// Uso: node build/gates_doc.mjs           (escribe el documento)
//      node build/gates_doc.mjs --check   (falla si lo escrito en disco no coincide)
import { writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { raiz, cargarFuentes, extraerAnexo, armarContenido, huellaDeContenido, esLineaDeComandos, ANEXOS } from './gates_lib.mjs';

const SEVERITY = { blocks: 'BLOCKS', warns: 'WARNS', records: 'RECORDS' };
const INSTRUMENT = {
  auto_gate: 'automatic gate',
  matrix_query: 'matrix query',
  e2e_per_profile: 'end-to-end test per profile',
  manual_case: 'manual case',
};
const TIMING = {
  push_and_block_close: 'on every push and at block close',
  block_close: 'at the close of each block',
  pending_close: 'at the close of the pending item',
};
const GROUP = { code_quality: 'Code quality', usability: 'Usability' };

export function generar() {
  const fuentes = cargarFuentes();
  const contenido = armarContenido(fuentes, extraerAnexo());
  const esquema = fuentes.schema.version_scheme;
  const huella = huellaDeContenido(contenido, esquema.hash_covers);
  const h = contenido.heuristics;
  const L = [];
  const p = (s = '') => L.push(s);

  p('# The gates, as data');
  p();
  p('**This document is generated.** It comes out of `gates/` with `node build/gates_doc.mjs`, and the');
  p('build fails when what is on disk does not match the data. Do not edit it: fix the source.');
  p();
  p('**It is written in English on purpose** (decision D-051). It is tool documentation, it is not part');
  p('of the translated corpus of the method, and whatever is not translated is published in the');
  p('canonical language of the profession. Translating for the comprehension of an end user is the job');
  p('of the consumer tool, not of this document.');
  p();
  p('Catalog version: **' + contenido.catalog_version + '** - schema **' + contenido.schema_version + '**');
  p('- content fingerprint `' + huella.slice(0, 16) + '...` - published at `docs/html/api/gates.json`.');
  p();
  p('## What this is, and why it lives here');
  p();
  p('The mechanical definition of the gates of the method -- which artifact has to exist at each step,');
  p('what it has to say, and with which strategy it is verified -- used to live compiled inside the tool');
  p('that enforces it. Which meant it changed when the tool shipped a version, not when the method');
  p('decided. Since decision D-050 the method owns the definition and publishes it as data, exactly as');
  p('it already publishes the prompts, and the tool consumes it.');
  p();
  p('## The version: what a project freezes');
  p();
  // El enunciado de la fijacion vive en el dato (gates/schema.json#pinning) y se extrae, no se
  // transcribe: una sola copia de cada texto, igual que los enunciados del Anexo H.
  p(contenido.pinning.what);
  p();
  p('For that to be possible, what is published has to be identifiable and stable:');
  p();
  p('- **`catalog_version`** (`' + contenido.catalog_version + '`): declared by hand by the method. It is what a project freezes, and');
  p('  what has to read back the same two years from now.');
  p('- **`content_hash`** (`' + esquema.hash_algo + '`): computed by the build over the enforceable content, with the keys sorted');
  p('  and without the publication metadata. The consumer **recomputes it and compares**: if it only read');
  p('  it, a frozen copy edited by hand or truncated by a merge would be undetectable.');
  p('- **`git_commit`**: informative, and no comparison looks at it. The identifier a build can know about');
  p('  itself is always the one of the change *before* the change that contains it, because it is computed');
  p('  before saving; it is useless as the identity of what is published.');
  p();
  p('Covered by the fingerprint: `' + esquema.hash_covers.join('`, `') + '`.');
  p('Left out: `' + esquema.hash_excludes.join('`, `') + '`.');
  p('Nothing in between: ' + esquema.hash_completeness);
  p();
  p('When the version moves: ' + esquema.version_bump);
  p();
  p('The ledger: ' + esquema.version_ledger);
  p();
  for (const c of fuentes.catalog.changelog) {
    p('- **' + c.catalog_version + '** (' + c.date + ', ' + c.decision + ') -- `' + c.content_hash.slice(0, 16) + '...`');
  }
  p();
  p('## Pinning: what a tool that freezes the method owes');
  p();
  const fij = contenido.pinning;
  p('The pair a project freezes: `' + fij.pinned_pair.join('`, `') + '`.');
  p();
  p('- **It records**: ' + fij.consumer_contract.must_record);
  p('- **It contrasts**: ' + fij.consumer_contract.must_contrast);
  p('- **On a mismatch**: ' + fij.consumer_contract.on_mismatch);
  p('- **Forbidden**: ' + fij.consumer_contract.forbidden);
  p('- Why it is written: ' + fij.consumer_contract.why_it_is_written);
  p();
  p('**Raising the version.** Who decides: `' + fij.upgrade.who_decides + '`.');
  p();
  p('- Before deciding: ' + fij.upgrade.before_deciding);
  p('- How the differential is computed: ' + fij.upgrade.how_to_compute);
  p('- What a newly required evaluator means: ' + fij.upgrade.what_a_new_required_evaluator_means);
  p('- Every covered key has existed since **' + fij.upgrade.covered_keys_since + '**. ' + fij.upgrade.covered_keys_note);
  p();
  p('**A prior version.** The canonical URL serves `' + fij.prior_version_content.canonical_url_serves + '`,');
  p('and every declared version also has an address of its own: `' + fij.prior_version_content.immutable_url_pattern + '`.');
  p();
  p('- ' + fij.prior_version_content.immutable_url_what);
  p('- Where it is declared: ' + fij.prior_version_content.immutable_url_where);
  p('- This version lives at `' + fij.prior_version_content.immutable_path + '` under the canonical base, and the first version with an address is **' + fij.prior_version_content.first_version_with_an_address + '**.');
  p('- No purge: ' + fij.prior_version_content.no_purge);
  p('- What the address promises: ' + fij.prior_version_content.what_is_promised);
  p('- Not guaranteed: ' + fij.prior_version_content.not_guaranteed);
  p('- ' + fij.prior_version_content.how);
  p();
  p('## The language of each text');
  p();
  const tl = contenido.languages.text_language;
  p(tl.what);
  p();
  p('- Declared: `languages.data` = `' + contenido.languages.data + '`, default `' + tl.default + '`.');
  p('- Spanish scope: ' + tl.spanish_scope.map((k) => '`' + k + '`').join(', ') + ', told apart by `' + tl.marker + '`.');
  p('- Rule: ' + tl.rule);
  p('- Readable text fields: ' + tl.text_fields.map((k) => '`' + k + '`').join(', ') + '.');
  p('- ' + tl.language_neutral);
  p('- ' + tl.verified);
  p('- **For a consumer:** ' + tl.consumer);
  p();
  p('## What an installation cannot measure');
  p();
  p('- Unknown evaluator, **required**: ' + contenido.compatibility.unknown_evaluator_required);
  p('- Unknown evaluator, not required: ' + contenido.compatibility.unknown_evaluator_not_required);
  p('- Forbidden: ' + contenido.compatibility.forbidden);
  p();
  p('## The evaluator vocabulary');
  p();
  p('An evaluator is the strategy a tool uses to decide whether a step is fulfilled. The vocabulary is');
  p('closed and **only grows**: none is removed, none is renamed and none changes meaning, exactly like');
  p('a stable error code.');
  p();
  p('| evaluator | since schema | what it checks |');
  p('|---|---|---|');
  for (const e of contenido.evaluators) p('| `' + e.name + '` | ' + e.since_schema + ' | ' + e.checks + ' |');
  p();
  p('## The ladder: twenty-four steps');
  p();
  p('The titles, summaries and completeness questions of the base are reproduced in the Spanish of the');
  p('method, which is the language they were frozen in: the base is not edited (D-051). Whatever the');
  p('method declares from now on is in English, and it is marked as new.');
  p();
  for (const [id, t] of Object.entries(contenido.tramos)) {
    p('### ' + t.title);
    p();
    p('| # | step | form | demand | evaluators | inputs | artifacts | checks |');
    p('|---|---|---|---|---|---|---|---|');
    for (const s of contenido.steps.filter((x) => x.tramo === id)) {
      p('| ' + s.num + ' | ' + s.title + ' | ' + s.form + ' | ' + s.mandatory + ' | '
        + s.evaluators.map((e) => '`' + e.name + '`' + (e.since_schema > 1 ? ' (new)' : '')).join(', ')
        + ' | ' + s.inputs.length + ' | ' + s.artifacts.length + ' | ' + s.verify.length + ' |');
    }
    p();
  }
  p('### What each step demands, in detail');
  p();
  for (const s of contenido.steps) {
    p('**' + s.num + ' - ' + s.title + '** (`' + s.id + '`, prompt `' + s.prompt_key + '`)');
    p();
    p('> ' + s.summary);
    p();
    if (s.inputs.length) {
      p('Inputs the owner has ready before the first prompt:');
      for (const a of s.inputs) p('- `' + a.path + '`' + detalleArtefacto(a));
      p();
    }
    if (s.artifacts.length) {
      p('Artifacts the agent leaves behind, and that the gate looks for on disk:');
      for (const a of s.artifacts) p('- `' + a.path + '`' + detalleArtefacto(a));
      p();
    }
    p('Completeness check, without reading code:');
    for (const v of s.verify) p('- ' + (typeof v === 'string' ? v : v.text + marcaNueva(v)));
    p();
  }
  p('## The legacy path: eight stations');
  p();
  p('A system built without the method is normalised first through these eight stations (they are not');
  p('called steps) and only then enters the Construction Loop at step ' + contenido.loop_entry.step + '.');
  p();
  p('**' + contenido.loop_entry.note + '** (since schema ' + contenido.loop_entry.since_schema + ', inherited anchors: '
    + contenido.loop_entry.inherits_anchors.join(', ') + ').');
  p();
  p('| # | station | evaluators | artifacts | checks |');
  p('|---|---|---|---|---|');
  for (const s of contenido.stations) {
    p('| N' + s.num + ' | ' + s.title + ' | ' + s.evaluators.map((e) => '`' + e.name + '`').join(', ')
      + ' | ' + s.artifacts.length + ' | ' + s.verify.length + ' |');
  }
  p();
  for (const s of contenido.stations) {
    p('**N' + s.num + ' - ' + s.title + '** (`' + s.id + '`)');
    p();
    p('> ' + s.summary);
    p();
    for (const a of s.artifacts) p('- `' + a.path + '`' + detalleArtefacto(a));
    p();
    for (const v of s.verify) p('- ' + (typeof v === 'string' ? v : v.text + marcaNueva(v)));
    p();
  }
  // El titulo cuenta del dato: una cuenta escrita a mano en un documento GENERADO es la peor de
  // las dos, porque parece verificada (D-070).
  p('## Annex H: ' + fuentes.heuristics.rules.length + ' rules');
  p();
  p('The statement of every rule lives **only** in Annex H: it is extracted from there on every build,');
  p('never transcribed. The published statement comes from [the English version](' + ANEXOS.en.replace('docs/', '') + '); the');
  p('[Spanish one](' + ANEXOS.es.replace('docs/', '') + ') is the source of truth of the method, and the build demands that both carry');
  p('the same rules with the same severities. What this data adds is the mechanical part: the group, the');
  p('instrument, the initial severity, when it is looked at and the step where it hooks. There are '
    + h.counts.code_quality + ' of');
  p('code quality and ' + h.counts.usability + ' of usability.');
  p();
  p('The two switches (' + h.groups.map((g) => '`' + g.id + '`').join(' and ') + ') are turned on and off separately,');
  p('they live in the project configuration and the gate reads them: never inside the prompt.');
  p('Switching a rule off is valid only as a recorded decision with ' + h.switch_off.requires.filter((c) => c !== 'rule').join(', ') + '.');
  p('Switched off without a record: ' + h.switch_off.without_record + '. A switched-off group ' + h.switch_off.group_switched_off + '.');
  p();
  for (const g of h.groups) {
    p('### ' + GROUP[g.id] + ' (' + g.range + ')');
    p();
    p('Result per rule in `' + g.result_document + '`.');
    p();
    p('| id | family | statement | instrument | when | severity | step |');
    p('|---|---|---|---|---|---|---|');
    for (const r of h.rules.filter((x) => x.group === g.id)) {
      p('| ' + r.id + ' | ' + r.family + ' | ' + r.statement.text + ' | '
        + r.instrument.map((i) => INSTRUMENT[i]).join(' + ') + ' | '
        + TIMING[r.timing ? r.timing.value : momentoPorDefecto(h, r)] + ' | '
        + SEVERITY[r.initial_severity] + (r.human_red ? ' (human red)' : '') + (r.applies_if ? ' where there are ' + r.applies_if.replace(/_/g, ' ') : '') + ' | '
        + r.anchor.steps.join(', ') + (r.anchor.source === 'annex' ? '' : ' *') + ' |');
    }
    p();
  }
  p('The rules marked with `*` in the step column are not anchored by the annex explicitly: the hook is');
  p('derived from their instrument (the manual case runs at step 10, the automatic gate runs at step 9)');
  p('and is declared as derived, not as a decision of the method.');
  p();
  p('The four that block with a **human red** -- ' + h.rules.filter((r) => r.human_red).map((r) => r.id).join(', ') + ' -- are tested by no');
  p('tool at all: they are verified at the close of the pending item, with the manual case in front, and');
  p('never on a commit.');
  p();
  p('### The five anchors and the two prior inputs');
  p();
  p('| anchor | step | what it adds | evaluator |');
  p('|---|---|---|---|');
  for (const a of h.anchors) p('| ' + a.id + ' | ' + a.step + ' | ' + a.what + ' | `' + a.evaluator + '` |');
  p();
  for (const e of h.prior_inputs) {
    p('- **' + e.what + '** (step ' + e.step + '): without it, ' + e.without_it + '. Declared path: '
      + (e.path ? '`' + e.path + '`' : '**none yet**') + '. ' + e.note);
  }
  p();
  p('### The three artifacts');
  p();
  for (const a of h.artifacts) p('- `' + a.path + '` (' + a.status + '): ' + a.what);
  p();
  p('## The adapters and the thresholds');
  p();
  p(contenido.adapters.what);
  p();
  p('| frontend family | column in the annex | rules that do not apply |');
  p('|---|---|---|');
  for (const f of contenido.adapters.families) p('| `' + f.id + '` | ' + f.annex_column + ' | ' + (f.not_applicable.length ? f.not_applicable.join(', ') : '-') + ' |');
  p();
  p('| threshold | rule | value | declared? | who declares it |');
  p('|---|---|---|---|---|');
  for (const u of contenido.adapters.thresholds) {
    p('| `' + u.id + '` | ' + u.rule + ' | ' + (u.value === null ? '-' : u.value) + ' | '
      + (u.declared ? 'yes, ' + u.source : '**no**') + ' | ' + (u.declared_by ?? 'the core of the annex') + ' |');
  }
  p();
  p('**' + contenido.adapters.undeclared_threshold + '**');
  p();
  p('## The project configuration');
  p();
  p(contenido.project_config.what);
  p();
  p('| field | what it holds |');
  p('|---|---|');
  for (const [campo, texto] of Object.entries(contenido.project_config.fields)) p('| `' + campo + '` | ' + texto + ' |');
  p();
  p(contenido.project_config.enums_what);
  p();
  p('| enum | values |');
  p('|---|---|');
  for (const [nombre, valores] of Object.entries(contenido.project_config.enums)) {
    p('| `project_config.enums.' + nombre + '` | `' + valores.join('`, `') + '` |');
  }
  p();
  p('The switch-off record is `' + contenido.project_config.switch_off_record.join('`, `') + '`. Without it: '
    + contenido.project_config.without_record);
  p();
  p('## The scoreboard');
  p();
  p('Two figures, never one (D-047). Switching a rule off **raises** compliance and **lowers** coverage,');
  p('so with a single figure the shortest path to a better number is to stop measuring.');
  p();
  p('| figure | formula | how it moves |');
  p('|---|---|---|');
  for (const c of h.scoreboard.figures) p('| ' + c.id + ' | `' + c.formula + '` | ' + c.moves + ' |');
  p();
  p('Ruleset fingerprint on every record: ' + h.scoreboard.ruleset_fingerprint.map((x) => '`' + x + '`').join(', ') + '.');
  p('Ratchet over ' + h.scoreboard.ratchet.on + ': it goes down only with ' + h.scoreboard.ratchet.lowers_only_with + '.');
  p('Out of the percentage, because a person judges it: ' + h.scoreboard.human_outside_the_percentage.join(', ') + '.');
  p('The scoreboard **does not close blocks**, and an invalid ruleset emits no figures at all.');
  p();
  p('Order in the step 12 report: ' + h.scoreboard.report_order.map((x) => x.replace(/_/g, ' ')).join(' -> ') + '.');
  p();
  p('## The decisions that govern this');
  p();
  p('D-050 (the method owns the definition of the gates), D-051 (the data layer and this document are');
  p('published in English), and the Annex H ones: ' + h.decisions.join(', ') + '. They are in the');
  p('[decision register](DECISIONES.md), written in Spanish, which is the language of the method.');
  p();
  return L.join('\n');
}

function momentoPorDefecto(h, r) {
  const inst = h.instruments.find((i) => i.id === r.instrument[0]);
  return inst.default_timing;
}

function detalleArtefacto(a) {
  const partes = [];
  if (a.label) partes.push(a.label);
  if (a.must_contain) partes.push('has to say: ' + a.must_contain.map((x) => '`' + x + '`').join(' and '));
  if (a.should_contain) partes.push('should say: ' + a.should_contain.map((x) => '`' + x + '`').join(' and ') + ' (if not, it warns and does not block)');
  if (a.min_bytes) partes.push('at least ' + a.min_bytes + ' bytes, so that a sketch does not count');
  if (a.fresh_days) partes.push('the newest one, less than ' + a.fresh_days + ' days old');
  if (a.since_schema) partes.push('**new in schema ' + a.since_schema + '**');
  return partes.length ? ' -- ' + partes.join('; ') : '';
}

const marcaNueva = (v) => ' **(new in schema ' + v.since_schema + (v.anchor ? ', anchor ' + v.anchor : '') + (v.decision ? ', ' + v.decision : '') + ')**';

const destino = join(raiz, 'docs', 'COMPUERTAS.md');
if (esLineaDeComandos(import.meta.url)) {
  const texto = generar();
  if (process.argv.includes('--check')) {
    let enDisco = null;
    try { enDisco = readFileSync(destino, 'utf8'); } catch { /* no existe */ }
    if (enDisco !== texto) {
      console.error('docs/COMPUERTAS.md no coincide con los datos de gates/. Corré: node build/gates_doc.mjs');
      process.exit(1);
    }
    console.log('docs/COMPUERTAS.md: coincide con los datos');
  } else {
    writeFileSync(destino, texto, 'utf8');
    console.log('docs/COMPUERTAS.md generado (' + texto.split('\n').length + ' líneas)');
  }
}
