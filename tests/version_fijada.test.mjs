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
    '2026.10.12 CQ-19',
    '2026.10.12 CQ-19.1',
    '2026.10.12 CQ-19.2',
    '2026.10.12 CQ-19.3',
    '2026.10.12 CQ-19.4',
    '2026.10.12 CQ-20',
    '2026.10.12 CQ-20.1',
    '2026.10.12 CQ-20.2',
    '2026.10.12 Does every instrument this step decides with carry its receipt: which set it expected to walk next to how much of it it walked, what it depends on, and what it reports when it could not look (CQ-19)?',
    '2026.10.12 Does every verification declare the privilege it ran with, and does the probe that exercises a destructive operation run where its statement cannot land, with the state counted before and after (CQ-20)?',
    // Las diez de 2026.10.13 son D-079 y D-080: tres artefactos del informe de auditoria, uno
    // de la rutina del reporte, uno de la retrospectiva, y sus cinco preguntas. Tres entradas
    // comparten el mismo `que` porque son tres exigencias sobre el MISMO archivo, y el
    // diferencial cuenta entradas y no rutas: una ruta que ya existia con dos exigencias y hoy
    // tiene cinco le agrega trabajo a un upgrade, y una cuenta por ruta lo esconderia.
    '2026.10.13 Does every finding carry its destination, and was its pending item opened in the register of that destination?',
    "2026.10.13 Does every finding of the retrospective carry its destination, so that what belongs to the method and to the tool does not end up in the product's register?",
    '2026.10.13 Does every finding that is not about the product carry its destination, and was its pending item opened in the register of that destination?',
    '2026.10.13 Does the health of the register of the evidence come with the command that measured each figure, and does a figure that could not be measured say so instead of reading as zero?',
    '2026.10.13 Does the report declare, under auditor_choice, why this auditor and not another one, and does it say so with those words when a limit of the tool chose it?',
    '2026.10.13 docs/AUDIT_*.md',
    '2026.10.13 docs/AUDIT_*.md',
    '2026.10.13 docs/AUDIT_*.md',
    '2026.10.13 docs/RETROSPECTIVE_*.md',
    '2026.10.13 docs/WORKING_AGREEMENT.md',
    // Las once de 2026.10.14 son D-081 y D-082, y son las dos mitades del mismo hueco: un
    // peldano cuyo trabajo esta afuera. Cuatro exigencias mas sobre el informe de auditoria
    // (la completitud declarada con sus dos cifras, las notas por dimension, el veredicto de un
    // recibo reproducido, lo no auditado con su pendiente) y tres preguntas; y en el peldano 10,
    // la deuda de ejecucion sobre el archivo de casos, la recorrida agentica como artefacto
    // NUEVO -- la unica ruta nueva de este lote -- y sus dos preguntas.
    '2026.10.14 Do findings_announced and findings_written say the same figure, counted by hand against the findings the report actually wrote?',
    '2026.10.14 Does cases_executed_by_a_person come from the signed execution tables rather than from the reading of the agent, and does the debt name who owes it and since when?',
    '2026.10.14 Does every part the report names as not audited have its pending item open?',
    '2026.10.14 Does the walk count the screens it could not open inside the total, with their reason, instead of leaving them out of the denominator?',
    '2026.10.14 Is there at least one receipt with its verdict, with the command and the output, rather than a receipt that was only read?',
    '2026.10.14 docs/AUDIT_*.md',
    '2026.10.14 docs/AUDIT_*.md',
    '2026.10.14 docs/AUDIT_*.md',
    '2026.10.14 docs/AUDIT_*.md',
    '2026.10.14 docs/MANUAL_TESTS.md',
    '2026.10.14 docs/SCREEN_WALKTHROUGH.md',
    // Las siete de 2026.10.15 son D-083 y D-084, y las dos son la misma pregunta sobre un
    // peldano cuyo veredicto depende de una persona. Del peldano 10 entra UNA pregunta y nada
    // mas: el requisito ya estaba (el ancla 4), lo que faltaba era que el texto contestara lo
    // mismo que contesta la compuerta, y eso es prosa. Del peldano 9 entran cuatro exigencias
    // sobre los dos documentos de cumplimiento -- dos por documento: la cabeza con su
    // denominador y el verificador por criterio -- y sus dos preguntas. Son los DOS documentos
    // y no solo el que nombro el hallazgo, porque el dato dice que cuatro reglas de calidad de
    // codigo tambien las juzga un caso manual.
    '2026.10.15 Does criteria_total count the rules nobody has looked at yet, rather than only the ones that were verified?',
    '2026.10.15 If nobody has signed a single case yet, does the text of the step answer the same thing the gate answers -- that the step does not advance -- instead of leaving the reader to deduce it?',
    '2026.10.15 Take a criterion that reads as met and ask who said so: if its instrument is a manual case, is there a name and a date, instead of a criterion nobody judged reading as one that was verified?',
    '2026.10.15 docs/CODE_QUALITY.md',
    '2026.10.15 docs/CODE_QUALITY.md',
    '2026.10.15 docs/USABILITY.md',
    '2026.10.15 docs/USABILITY.md',
    // Las doce de 2026.10.16 son D-087, y son UNA regla con sus TRES caras: el alcance de una
    // corrida. Tres artefactos --el inventario de puertos con doble en el mapa, la vuelta a
    // correr en el archivo de casos, el alcance de los casos en la rutina del informe-- y cinco
    // preguntas sobre los peldanos 8, 10, 11 y 12. Ninguna ruta nueva: las tres exigencias caen
    // sobre archivos que el metodo ya pedia, que es la forma mas barata de agregar un requisito.
    '2026.10.16 CQ-21',
    '2026.10.16 CQ-21.1',
    '2026.10.16 CQ-21.2',
    '2026.10.16 CQ-21.3',
    '2026.10.16 Do ports_total and ports_with_a_crossing_run come from the same table they describe, so that a port with no crossing run is visible instead of being left out of the denominator?',
    '2026.10.16 Does every case that failed and was fixed have an execution row LATER than the fix covering all of its steps, instead of closing on the row that failed? A row reports how far the person got: the steps it did not reach neither passed nor failed (CQ-21.3).',
    '2026.10.16 Does every port that was doubled for testing carry the run that crosses it to the real other side, and does that other side name what the port is doubling -- a browser, an operating system, a database, the network -- instead of another double?',
    '2026.10.16 Does the report say how many manual cases this closing touches, how many of them a person signed and who, with all the letters when the answer is none? A figure somebody has to go and look for stops nobody (CQ-21.2).',
    '2026.10.16 For every port this item doubled, is there one run that crosses it to the real other side? A test that instantiates the real adapter against a fake environment went through the adapter and still never saw the event (CQ-21.1).',
    '2026.10.16 docs/MANUAL_TESTS.md',
    '2026.10.16 docs/PRODUCER_CONSUMER_MAP.md',
    '2026.10.16 docs/WORKING_AGREEMENT.md',
    // Las treinta y seis de 2026.10.17 son D-089, y son el lote mas grande hasta hoy: TRES
    // reglas con nueve caras --el contraste, la procedencia y el registro contestable--, mas la
    // CUARTA cara de CQ-21, que es la primera vez que una regla ya publicada gana una cara. Y
    // con ellas, las primeras DOS rutas nuevas desde 2026.10.14: el recibo del ensayo de
    // destruccion y restitucion del peldano 20 y el inventario del codigo de terceros que el
    // sistema EJECUTA del peldano 14. Cinco artefactos mas sobre archivos que ya existian, un
    // umbral nuevo que declara el dueno y doce preguntas de verificacion sobre los peldanos 5,
    // 8, 9, 11, 12, 14, 16, 19, 20, 22 y 23.
    '2026.10.17 CQ-21.4',
    '2026.10.17 CQ-22',
    '2026.10.17 CQ-22.1',
    '2026.10.17 CQ-22.2',
    '2026.10.17 CQ-22.3',
    '2026.10.17 CQ-22.4',
    '2026.10.17 CQ-23',
    '2026.10.17 CQ-23.1',
    '2026.10.17 CQ-23.2',
    '2026.10.17 CQ-23.3',
    '2026.10.17 CQ-24',
    '2026.10.17 CQ-24.1',
    '2026.10.17 CQ-24.2',
    '2026.10.17 Did the chain that produced this green run AFTER the last change that affects what it measures, and over the tree that stays? A green that is true and old reads exactly like a current one (CQ-23.1).',
    '2026.10.17 Did the owner declare the acceptable window of data loss, as data and not as prose, and is the cadence of the backup contrasted against it? If the owner says one hour, a daily backup does not pass (CQ-22.2).',
    '2026.10.17 Does every entry declare the privilege it runs with, and is there one that runs with more than it needs without a written decision saying why (CQ-20.1)?',
    '2026.10.17 Does every threshold say at what concurrency, at what volume and in which environment it holds, and did the owner answer that condition instead of the agent assuming it (CQ-22.2)?',
    '2026.10.17 Does the count of forced closes come from the FIELD the register declares, rather than from a word search over free prose? A recount by word cannot guarantee its own population: the list of overrides of a real retrospective omitted one because the prose of that item did not use the word (CQ-24.1, CQ-19.3).',
    '2026.10.17 Does the inventory cover the third-party code that RUNS and not the code that is imported, and does every entry carry its decision -- accepted, narrowed or rejected, with who and when -- rather than the list merely existing (CQ-22.4)?',
    '2026.10.17 Does the path by which the owner authorises a forced close WRITE the field the register declares mandatory for it, or does the project declare which record carries the fact and which field is not it? A forced close counted by reading prose is the count the field came in to avoid (CQ-24.1).',
    '2026.10.17 Does the register say at which step it was opened, and are the rows that describe earlier steps marked as written retroactively? Steps before the register reporting zero incidents means there was no register, not that nothing happened (CQ-24.2).',
    '2026.10.17 For every verdict the report cites: is it later than the last change that affects what it measures, and did its output land somewhere the next turn can read? A verification that can last longer than the turn that launched it is launched with a record (CQ-23.1, CQ-23.2).',
    '2026.10.17 Is every mutant declared caught backed by a failed assertion, rather than by a red the mutated code produced before the run reached the assertion (CQ-21.4)?',
    '2026.10.17 Is the red of every receipt a FAILED ASSERTION and not an exception -- code that does not compile, a file that does not parse, an environment that did not start? A red that never reached its assertion falsified nothing, because the assertion neither passed nor failed (CQ-21.4).',
    '2026.10.17 Is there a receipt of a run that destroyed and restored, with the rows counted before and after and the schema at the migration it was at -- rather than a manual that names the procedure? Restoring onto an empty database proves less, which is why the drill destroys first (CQ-22.3).',
    '2026.10.17 Of one error, what can be reconstructed? Not how many it counted: take a real failure, follow it to its line in the register, and check that the line says what it was instead of having been discarded for not having the expected shape (CQ-19.2).',
    '2026.10.17 Take ONE real error and follow it: does it leave a structured line that says what it was, with the same trace on both sides? Counting errors is not seeing them -- a counter can count over something the collector could not read (CQ-19.2).',
    '2026.10.17 Was every measured figure contrasted against its declared threshold, and is the one that does not pass RED rather than merely measured? A whole ladder can be closed with every non-functional requirement unmet while each gate is right about what it measures (CQ-22.1).',
    '2026.10.17 acceptable_data_loss_window',
    '2026.10.17 docs/CODE_QUALITY.md',
    '2026.10.17 docs/GOTCHAS.md',
    '2026.10.17 docs/MONITORING.md',
    '2026.10.17 docs/PERFORMANCE.md',
    '2026.10.17 docs/RESTORE_DRILL.md',
    '2026.10.17 docs/THIRD_PARTY_EXECUTION.md',
    '2026.10.17 docs/WORKING_AGREEMENT.md',
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
  // el primer UMBRAL, end_users_outside_the_organisation (D-076). Las diez que siguen son de
  // D-078: dos reglas, sus seis CARAS y las dos preguntas de verificacion de sus peldanos. Las
  // diez ultimas son de D-079 y D-080, y son las primeras que no tocan el Anexo H: cinco
  // artefactos y cinco preguntas sobre los peldanos 12, 13 y 23, que exigen lo que un control
  // tiene que DECLARAR al cerrar y no lo que el sistema tiene que ser. Las once de D-081 y
  // D-082 son las dos mitades de un peldano cuyo trabajo esta afuera; las siete que siguen son de
  // D-083 y D-084, y la asimetria entre ellas es el dato: del peldano 10 entra una sola
  // pregunta, porque lo que faltaba ahi era prosa y no un requisito. Las doce ultimas son de
  // D-087: una regla, sus tres caras, tres artefactos y cinco preguntas, y es el primer lote que
  // no agrega ninguna RUTA nueva -- las tres exigencias caen sobre archivos que el metodo ya pedia.
  // Las treinta y seis ultimas son de D-089, que es el lote mas grande hasta hoy: tres reglas con
  // nueve caras, la CUARTA cara de CQ-21 --la primera que una regla ya publicada gana despues de
  // entrar--, un umbral que declara el dueno, siete artefactos (dos de ellos sobre rutas NUEVAS:
  // el ensayo de restitucion del peldano 20 y el inventario del codigo de terceros que corre del
  // peldano 14) y doce preguntas de verificacion.
  assert.equal(arbol.entradas.length, 123, 'las entradas agregadas despues del congelado, medidas el 2026-11-07');
  assert.deepEqual(arbol.entradas.filter((e) => e.donde.startsWith('catalog.rules')).map((e) => e.que), ['CQ-19', 'CQ-20', 'CQ-21', 'CQ-22', 'CQ-23', 'CQ-24', 'UX-28'],
    'una regla agregada despues del congelado entra en el diferencial: sin esto un upgrade la omitia en silencio');
  // Y una cara, por el mismo argumento una capa adentro: se puede apagar sola, asi que un
  // diferencial que cuenta la regla y no sus caras dice que entra una cosa cuando entran cinco.
  assert.deepEqual(arbol.entradas.filter((e) => e.donde.startsWith('catalog.faces')).map((e) => e.que),
    ['CQ-19.1', 'CQ-19.2', 'CQ-19.3', 'CQ-19.4', 'CQ-20.1', 'CQ-20.2', 'CQ-21.1', 'CQ-21.2', 'CQ-21.3', 'CQ-21.4',
      'CQ-22.1', 'CQ-22.2', 'CQ-22.3', 'CQ-22.4', 'CQ-23.1', 'CQ-23.2', 'CQ-23.3', 'CQ-24.1', 'CQ-24.2'],
    'las caras entran en el diferencial con su procedencia (D-078, D-087, D-089)');
  assert.deepEqual(arbol.entradas.filter((e) => e.donde.startsWith('catalog.thresholds')).map((e) => e.que), ['end_users_outside_the_organisation', 'acceptable_data_loss_window'],
    'un umbral agregado despues del congelado entra en el diferencial: declararlo o no cambia la severidad de su regla');
  assert.ok(arbol.versiones.length >= 7, 'el registro de versiones tiene al menos las siete publicadas');
});
