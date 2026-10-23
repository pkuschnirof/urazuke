// El validador en rojo, demostrable. Un validador que nunca se vio fallar no es una
// compuerta: es una funcion que devuelve una lista vacia. Cada caso de abajo planta una
// violacion deliberada y exige el codigo de error que le corresponde.
// Uso: node --test tests/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { cargarFuentes, extraerAnexo, raiz, ANEXOS } from '../build/gates_lib.mjs';
import { validar } from '../build/gates_validate.mjs';
import { join } from 'node:path';

const limpio = () => structuredClone(cargarFuentes());
const anexo = extraerAnexo();
const textoAnexoEn = readFileSync(join(raiz, ANEXOS.en), 'utf8');
const textoAnexoEs = readFileSync(join(raiz, ANEXOS.es), 'utf8');

const regla = (f, id) => f.heuristics.rules.find((r) => r.id === id);
const paso = (f, num) => f.steps.steps.find((s) => s.num === num);

/** Cada caso: que se rompe, y el codigo que el validador tiene que devolver. */
const CASOS = [
  ['un id de regla con formato invalido', (f) => { regla(f, 'CQ-07').id = 'CQ-7'; }, 'E_ID_FORMATO'],
  ['un id de regla repetido', (f) => { regla(f, 'CQ-07').id = 'CQ-08'; }, 'E_ID_DUPLICADO'],
  ['un id de peldano renombrado', (f) => { paso(f, 9).id = 'u09-calidad'; }, 'E_APPEND_ONLY'],
  ['un peldano que desaparece', (f) => { f.steps.steps = f.steps.steps.filter((s) => s.num !== 20); }, 'E_APPEND_ONLY'],
  ['un evaluador que no esta en el vocabulario', (f) => { paso(f, 9).evaluators.push({ name: 'heuristicas', since_schema: 2, required: true }); }, 'E_EVALUADOR_DESCONOCIDO'],
  ['un evaluador sacado del vocabulario', (f) => { f.evaluators.evaluators = f.evaluators.evaluators.filter((e) => e.name !== 'meters'); }, 'E_APPEND_ONLY'],
  ['un evaluador que cambia de version', (f) => { f.evaluators.evaluators.find((e) => e.name === 'heuristics').since_schema = 3; }, 'E_EVALUADOR_SINCE'],
  ['el vocabulario que deja de ser append-only', (f) => { f.evaluators.append_only = false; }, 'E_ESQUEMA'],
  ['una entrada de la base editada', (f) => { paso(f, 9).verify[0] = 'La cadena esta mas o menos bien?'; }, 'E_BASE_ALTERADA'],
  ['la base traducida al ingles por las nuestras', (f) => { paso(f, 5).title = 'The plan is the pending items'; }, 'E_BASE_ALTERADA'],
  ['un artefacto de la base con un must_contain nuevo', (f) => { paso(f, 15).artifacts[0].must_contain.push('kubernetes'); }, 'E_BASE_ALTERADA'],
  ['el evaluador de la base reemplazado en vez de agregado', (f) => { paso(f, 9).evaluators[0] = { name: 'heuristics', since_schema: 2, required: true }; }, 'E_EVALUADOR_BASE'],
  ['el enunciado transcrito en los datos', (f) => { regla(f, 'UX-12').statement.text = 'Ni de menos ni de mas.'; }, 'E_TEXTO_DUPLICADO'],
  ['la ruta del anexo repetida en cada regla', (f) => { regla(f, 'UX-12').statement.document = 'docs/USABILITY.md'; }, 'E_TEXTO_DUPLICADO'],
  ['el enunciado apuntando a otro documento', (f) => { f.heuristics.statement_source.documents.en = 'docs/USABILITY.md'; }, 'E_PUNTERO'],
  ['el enunciado publicado en un idioma sin tokens de severidad', (f) => { f.heuristics.statement_source.published_language = 'ja'; }, 'E_ANEXO_IDIOMA'],
  ['una severidad bajada sin tocar el anexo', (f) => { regla(f, 'CQ-01').initial_severity = 'warns'; }, 'E_ANEXO_SEVERIDAD'],
  ['una familia que no es la del anexo', (f) => { regla(f, 'CQ-01').family = 'interface'; }, 'E_ANEXO_FAMILIA'],
  ['una regla del anexo que la compuerta no tiene', (f) => { f.heuristics.rules = f.heuristics.rules.filter((r) => r.id !== 'UX-27'); f.heuristics.counts.usability = 26; f.heuristics.counts.total = 44; }, 'E_ANEXO_HUERFANA'],
  ['una cuenta que no coincide con las reglas', (f) => { f.heuristics.counts.total = 27; }, 'E_CUENTA'],
  ['un ancla que apunta a un peldano que no existe', (f) => { f.heuristics.anchors[0].step = 24; }, 'E_ANCLA_INEXISTENTE'],
  ['un ancla cuyo evaluador no esta enganchado en su peldano', (f) => { f.heuristics.anchors[2].step = 11; }, 'E_ANCLA_SIN_ENGANCHE'],
  ['una regla anclada en un peldano que no existe', (f) => { regla(f, 'UX-12').anchor.steps = [99]; }, 'E_ANCLA_INEXISTENTE'],
  ['el camino heredado heredando un ancla que no existe', (f) => { f.stations.loop_entry.inherits_anchors = [1, 2, 3, 4, 5, 6]; }, 'E_ANCLA_INEXISTENTE'],
  ['un umbral inventado', (f) => { f.adapters.thresholds.find((u) => u.id === 'paths_per_function').value = 10; }, 'E_UMBRAL'],
  ['un umbral declarado al que le sacan el valor', (f) => { f.adapters.thresholds.find((u) => u.id === 'lines_per_file').value = null; }, 'E_UMBRAL'],
  ['un umbral que apunta a una regla que no existe', (f) => { f.adapters.thresholds[0].rule = 'CQ-99'; }, 'E_UMBRAL'],
  ['el tablero con una sola cifra', (f) => { f.heuristics.scoreboard.figures.pop(); }, 'E_TABLERO'],
  ['el tablero autorizado a cerrar bloques', (f) => { f.heuristics.scoreboard.closes_blocks = true; }, 'E_TABLERO'],
  ['el tablero emitiendo cifras con un reglamento invalido', (f) => { f.heuristics.scoreboard.invalid_ruleset_emits_no_figures = false; }, 'E_TABLERO'],
  ['el apagado que deja de exigir la fecha de revision', (f) => { f.heuristics.switch_off.requires = ['rule', 'reason', 'authorized_by']; }, 'E_APAGADO'],
  ['el registro de apagado distinto en el catalogo y en la configuracion', (f) => { f.schema.project_config.switch_off_record = ['rule', 'reason', 'authorized_by', 'review_date', 'blame']; }, 'E_APAGADO'],
  ['una clave exigible fuera de la huella', (f) => { f.schema.version_scheme.hash_covers = f.schema.version_scheme.hash_covers.filter((c) => c !== 'heuristics'); }, 'E_HUELLA'],
  ['una clave cubierta y excluida a la vez', (f) => { f.schema.version_scheme.hash_excludes.push('steps'); }, 'E_HUELLA'],
  ['un campo de mas, por un error de tipeo', (f) => { paso(f, 9).evaluador = 'ci'; }, 'E_CAMPO_DE_MAS'],
  ['un artefacto sin ruta', (f) => { delete paso(f, 9).artifacts[0].path; }, 'E_CAMPO_FALTA'],
  ['una expresion regular que no compila', (f) => { paso(f, 9).artifacts[1].must_contain = ['calidad('] }, 'E_REGEX'],
  ['un valor fuera del enum', (f) => { paso(f, 9).mandatory = 'optional'; }, 'E_ENUM'],
  ['la escalera renumerada', (f) => { paso(f, 23).num = 24; }, 'E_ORDEN'],
  ['un peldano agregado al final', (f) => { f.steps.steps.push({ ...structuredClone(paso(f, 23)), num: 24, id: 'u24-nuevo' }); }, 'E_CUENTA'],
  ['una regla con rojo humano y compuerta automatica a la vez', (f) => { regla(f, 'CQ-12').instrument = ['auto_gate']; }, 'E_ROJO_HUMANO'],
  ['una fuente con caracteres fuera de ASCII', (f) => { f.catalog.parts.doc = 'docs/ESCALERA_METODOLOGICA.md'; }, 'E_ASCII'],
  // La version declarada tiene que corresponder a UN contenido: si no, lo que un
  // proyecto congelo no se puede volver a leer con certeza.
  ['una version declarada sin entrada en el registro', (f) => { f.catalog.catalog_version = '2026.11.1'; }, 'E_VERSION'],
  ['una huella registrada que no es la del contenido', (f) => { f.catalog.changelog.at(-1).content_hash = 'a'.repeat(64); }, 'E_VERSION'],
  ['dos entradas del registro con la misma version', (f) => { f.catalog.changelog.push(structuredClone(f.catalog.changelog[0])); }, 'E_VERSION'],
  ['una entrada del registro sin su huella', (f) => { delete f.catalog.changelog[0].content_hash; }, 'E_VERSION'],
  ['el registro sin la entrada de la version que se publica', (f) => { f.catalog.changelog.pop(); }, 'E_VERSION'],
  // La declaracion de idioma solo sirve si es verdad: un consumidor la aplica sin leer
  // el texto, asi que una declaracion aproximada le hace mostrar castellano a un lector
  // ingles. Es el pedido del consumidor del 2026-10-23.
  ['el publicado declarado en un idioma cuando es bilingue', (f) => { f.catalog.languages.data = 'en'; }, 'E_IDIOMA_DECLARADO'],
  ['la declaracion de idioma sin su regla', (f) => { delete f.catalog.languages.text_language; }, 'E_IDIOMA_DECLARADO'],
  ['un texto nuevo sin su marca, que la regla daria por castellano', (f) => { paso(f, 9).verify.push('A question nobody marked as new'); }, 'E_IDIOMA_DECLARADO'],
  ['el alcance del castellano nombrando una clave que no existe', (f) => { f.catalog.languages.text_language.spanish_scope.push('pasos'); }, 'E_IDIOMA_DECLARADO'],
  ['el nivel de datos declarado en un idioma que no es el ingles', (f) => { f.catalog.languages.text_language.default = 'es'; }, 'E_IDIOMA_DECLARADO'],
];

test('el catalogo limpio no devuelve ni un error (si no, los rojos de abajo no prueban nada)', () => {
  assert.deepEqual(validar(limpio(), anexo), []);
});

for (const [nombre, romper, codigo] of CASOS) {
  test('rojo: ' + nombre + ' -> ' + codigo, () => {
    const f = limpio();
    romper(f);
    const errores = validar(f, anexo);
    assert.ok(errores.length > 0, 'el validador no vio nada');
    assert.ok(errores.some((e) => e.code === codigo),
      'se esperaba ' + codigo + ' y llegaron: ' + [...new Set(errores.map((e) => e.code))].join(', '));
    for (const e of errores) {
      assert.ok(e.que && e.donde && e.arreglo, 'todo error dice que paso, donde y como se arregla');
    }
  });
}

test('rojo: una regla apagada sin registro, en la configuracion de un proyecto', () => {
  const config = { switches: { code_quality: true, usability: true }, switched_off: [{ rule: 'CQ-17' }] };
  const errores = validar(limpio(), anexo, config);
  const apagado = errores.filter((e) => e.code === 'E_APAGADO_SIN_REGISTRO');
  assert.equal(apagado.length, 3, 'falta motivo, quien autoriza y la fecha: tres rojos, uno por campo');
  assert.ok(apagado[0].arreglo.includes('D-046'));
});

test('verde: la misma regla apagada CON registro no es un error del reglamento', () => {
  const config = {
    switches: { code_quality: true, usability: true },
    switched_off: [{ rule: 'CQ-17', reason: 'inherited printable report, no tokens', authorized_by: 'owner', review_date: '2027-01-31' }],
  };
  assert.deepEqual(validar(limpio(), anexo, config).filter((e) => e.code.startsWith('E_APAGADO')), []);
});

test('rojo: un umbral en cero que nadie declaro se reporta, no se inventa', () => {
  const config = { switches: { code_quality: true, usability: true }, thresholds: { mutation_target: 0 } };
  const errores = validar(limpio(), anexo, config).filter((e) => e.code === 'E_UMBRAL_NO_DECLARADO');
  assert.equal(errores.length, 1);
  assert.ok(errores[0].arreglo.includes('the owner'), errores[0].arreglo);
});

test('rojo: un grupo sin interruptor declarado en la configuracion', () => {
  const errores = validar(limpio(), anexo, { switches: { code_quality: true } });
  assert.ok(errores.some((e) => e.code === 'E_CONFIG' && e.que.includes('usability')));
});

test('rojo: si el anexo pierde la fila de una regla, su enunciado no existe y se dice', () => {
  const mutilado = textoAnexoEn.split(/\r?\n/).filter((l) => !/^\|\s*UX-12\s*\|/.test(l)).join('\n');
  const errores = validar(limpio(), extraerAnexo(mutilado, textoAnexoEs));
  assert.ok(errores.some((e) => e.code === 'E_ANEXO_SIN_ENUNCIADO' && e.que.includes('UX-12')),
    'codigos: ' + [...new Set(errores.map((e) => e.code))].join(', '));
});

test('rojo: si una fila del anexo cambia de forma, la extraccion lo dice en vez de adivinar', () => {
  const mutilado = textoAnexoEn.replace(/^\|\s*UX-12\s*\|/m, '| UX-12 | de mas |');
  const errores = validar(limpio(), extraerAnexo(mutilado, textoAnexoEs));
  assert.ok(errores.some((e) => e.code === 'E_ANEXO_ILEGIBLE'), 'codigos: ' + [...new Set(errores.map((e) => e.code))].join(', '));
});

test('rojo: si la traduccion inglesa se queda atras, la publicacion no sale como si nada', () => {
  // El castellano gana una regla y el ingles no la tiene todavia.
  const conUnaMas = textoAnexoEs.replace(/^(\|\s*UX-27\s*\|.*)$/m, '$1\n| UX-28 | Una regla nueva que el ingles no tiene todavia. | Caso manual | AVISA |');
  const errores = validar(limpio(), extraerAnexo(textoAnexoEn, conUnaMas));
  assert.ok(errores.some((e) => e.code === 'E_ANEXO_TRADUCCION' && e.que.includes('UX-28')),
    'codigos: ' + [...new Set(errores.map((e) => e.code))].join(', '));
});

test('rojo: si las dos versiones del anexo no coinciden en la severidad, se dice cual', () => {
  const aflojado = textoAnexoEn.replace(/^(\|\s*CQ-01\s*\|.*\|)\s*BLOCKS\s*\|$/m, '$1 WARNS |');
  assert.notEqual(aflojado, textoAnexoEn, 'la fila de CQ-01 tenia que quedar modificada');
  const errores = validar(limpio(), extraerAnexo(aflojado, textoAnexoEs));
  const codigos = [...new Set(errores.map((e) => e.code))];
  assert.ok(codigos.includes('E_ANEXO_TRADUCCION'), 'codigos: ' + codigos.join(', '));
  assert.ok(errores.some((e) => e.que.includes('CQ-01')));
});

test('rojo: si una fila se mueve de familia en una sola version, el agrupamiento lo delata', () => {
  const movido = textoAnexoEn.replace(/^\|\s*CQ-01\s*\|\s*Form\s*\|/m, '| CQ-01 | Size |');
  assert.notEqual(movido, textoAnexoEn, 'la familia de CQ-01 tenia que quedar cambiada');
  const errores = validar(limpio(), extraerAnexo(movido, textoAnexoEs));
  const codigos = [...new Set(errores.map((e) => e.code))];
  assert.ok(codigos.includes('E_ANEXO_TRADUCCION'), 'codigos: ' + codigos.join(', '));
});
