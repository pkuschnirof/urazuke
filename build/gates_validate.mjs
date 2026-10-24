// Valida las fuentes de gates/ contra gates/schema.json y contra el Anexo H.
// Uso: node build/gates_validate.mjs            (valida el repositorio)
//      node build/gates_validate.mjs --config <archivo.json>   (valida tambien la
//                                     configuracion de un proyecto: interruptores,
//                                     apagados con registro, umbrales declarados)
//
// Cada error sale con codigo estable, que paso, donde y como se arregla. Devuelve
// codigo de salida 1 si hay al menos un error.
import { readFileSync } from 'node:fs';
import { cargarFuentes, extraerAnexo, proyectarPasoABase, idFamilia, armarContenido, huellaDeContenido, esLineaDeComandos, ANEXOS } from './gates_lib.mjs';

const esObjeto = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

export function validar(fuentes = cargarFuentes(), anexo = extraerAnexo(), config = null) {
  const errores = [];
  const err = (code, que, donde, arreglo) => errores.push({ code, que, donde, arreglo });
  const { schema, evaluators, steps, stations, heuristics, adapters, baseline } = fuentes;
  const enums = schema.enums;
  const tipos = schema.types;

  /* ---------- 1. forma: el esquema se interpreta, no se recita ---------- */

  function valorValido(def, valor, donde) {
    const t = def.type;
    if (t === 'any') return;
    if (t === 'object_or_null') { if (valor !== null && !esObjeto(valor)) err('E_TIPO', 'se esperaba objeto o null', donde, 'revisa el tipo en gates/schema.json'); return; }
    if (t === 'integer') { if (!Number.isInteger(valor)) err('E_TIPO', 'se esperaba entero, llego ' + typeof valor, donde, 'escribi un numero sin comillas'); }
    else if (t === 'string') { if (typeof valor !== 'string' || !valor.length) err('E_TIPO', 'se esperaba texto no vacio', donde, 'completa el campo'); }
    else if (t === 'boolean') { if (typeof valor !== 'boolean') err('E_TIPO', 'se esperaba true o false', donde, 'sin comillas'); }
    else if (t === 'object') { if (!esObjeto(valor)) err('E_TIPO', 'se esperaba objeto', donde, 'revisa el tipo en gates/schema.json'); }
    else if (t === 'array') {
      if (!Array.isArray(valor)) { err('E_TIPO', 'se esperaba lista', donde, 'revisa el tipo en gates/schema.json'); return; }
      if (def.min_items && valor.length < def.min_items) err('E_VACIO', 'la lista necesita al menos ' + def.min_items + ' elemento(s)', donde, 'agrega la entrada que falta');
      valor.forEach((item, i) => itemValido(def, item, donde + '[' + i + ']'));
    }
    if (def.enum && typeof valor !== 'object') {
      const permitidos = enums[def.enum];
      if (!permitidos.includes(valor)) err('E_ENUM', JSON.stringify(valor) + ' no esta en el enum ' + def.enum, donde, 'usa uno de: ' + permitidos.join(', '));
    }
    if (def.pattern && typeof valor === 'string' && !new RegExp(def.pattern).test(valor)) {
      err('E_ID_FORMATO', JSON.stringify(valor) + ' no cumple el formato ' + def.pattern, donde, 'respeta la forma del id; los ids son append-only');
    }
    if (def.enum_items && Array.isArray(valor)) {
      for (const item of valor) if (!enums[def.enum_items].includes(item)) err('E_ENUM', JSON.stringify(item) + ' no esta en el enum ' + def.enum_items, donde, 'usa uno de: ' + enums[def.enum_items].join(', '));
    }
  }

  function itemValido(def, item, donde) {
    const items = def.items;
    if (items === 'integer') { if (!Number.isInteger(item)) err('E_TIPO', 'se esperaba entero', donde, 'sin comillas'); return; }
    if (items === 'string') { if (typeof item !== 'string') err('E_TIPO', 'se esperaba texto', donde, 'entre comillas'); return; }
    if (items === 'regex') {
      if (typeof item !== 'string' || !item.length) { err('E_TIPO', 'se esperaba una expresion regular como texto', donde, 'escribi el patron'); return; }
      try { new RegExp(item, 'i'); } catch (e) { err('E_REGEX', 'la expresion regular no compila: ' + e.message, donde, 'escapa lo que haga falta'); }
      return;
    }
    if (tipos[items]) { objetoValido(items, item, donde); return; }
    err('E_ESQUEMA', 'el esquema nombra un tipo que no existe: ' + items, donde, 'declara el tipo en gates/schema.json');
  }

  function objetoValido(nombreTipo, valor, donde) {
    const tipo = tipos[nombreTipo];
    if (tipo.either) {
      const simple = tipo.either.find((o) => o.type);
      if (typeof valor === simple.type) return;
      const compuesto = tipo.either.find((o) => o.fields);
      if (!esObjeto(valor)) { err('E_TIPO', 'se esperaba ' + simple.type + ' u objeto', donde, 'revisa el tipo ' + nombreTipo); return; }
      return camposValidos(compuesto, valor, donde);
    }
    if (!esObjeto(valor)) { err('E_TIPO', 'se esperaba un objeto ' + nombreTipo, donde, 'revisa el tipo en gates/schema.json'); return; }
    camposValidos(tipo, valor, donde);
  }

  function camposValidos(tipo, valor, donde) {
    for (const [campo, def] of Object.entries(tipo.fields)) {
      if (!(campo in valor)) {
        if (def.required) err('E_CAMPO_FALTA', 'falta el campo obligatorio ' + campo, donde, 'agregalo; lo exige gates/schema.json');
        continue;
      }
      valorValido(def, valor[campo], donde + '.' + campo);
    }
    if (tipo.additional === false) {
      for (const campo of Object.keys(valor)) {
        if (!(campo in tipo.fields)) err('E_CAMPO_DE_MAS', 'el campo ' + campo + ' no esta en el esquema', donde, 'si es nuevo, declaralo primero en gates/schema.json; si es un error de tipeo, corregilo');
      }
    }
  }

  steps.steps.forEach((s) => objetoValido('step', s, 'steps[' + s.num + ']'));
  stations.stations.forEach((s) => objetoValido('station', s, 'stations[N' + s.num + ']'));
  heuristics.rules.forEach((r) => objetoValido('rule', r, 'rules[' + r.id + ']'));

  /* ---------- 2. ids: unicos, completos, append-only ---------- */

  const dup = (lista, etiqueta, donde) => {
    const vistos = new Set();
    for (const x of lista) {
      if (vistos.has(x)) err('E_ID_DUPLICADO', etiqueta + ' repetido: ' + x, donde, 'los ids son unicos y no se reciclan nunca');
      vistos.add(x);
    }
  };
  dup(steps.steps.map((s) => s.id), 'id de peldano', 'gates/steps.json');
  dup(steps.steps.map((s) => s.num), 'numero de peldano', 'gates/steps.json');
  dup(stations.stations.map((s) => s.id), 'id de estacion', 'gates/stations.json');
  dup(heuristics.rules.map((r) => r.id), 'id de regla', 'gates/heuristics.json');

  const numsPaso = new Set(steps.steps.map((s) => s.num));
  for (const [i, s] of steps.steps.entries()) {
    if (s.num !== i) err('E_ORDEN', 'el peldano en la posicion ' + i + ' dice num ' + s.num, 'gates/steps.json', 'la escalera va de 0 a 23 en orden');
  }
  if (steps.steps.length !== 24) err('E_CUENTA', 'la escalera tiene ' + steps.steps.length + ' peldanos, el metodo declara 24', 'gates/steps.json', 'no se renumera la escalera: revisa que no sobre ni falte uno');
  if (stations.stations.length !== 8) err('E_CUENTA', 'el camino heredado tiene ' + stations.stations.length + ' estaciones, el metodo declara 8 (N0 a N7)', 'gates/stations.json', 'revisa que no sobre ni falte una');

  for (const b of baseline.steps) {
    const actual = steps.steps.find((s) => s.num === b.num);
    if (!actual) { err('E_APPEND_ONLY', 'el peldano ' + b.num + ' de la base no esta', 'gates/steps.json', 'un peldano no se saca: la base es append-only'); continue; }
    if (actual.id !== b.id) err('E_APPEND_ONLY', 'el peldano ' + b.num + ' cambio de id: ' + b.id + ' -> ' + actual.id, 'gates/steps.json', 'los ids no se renombran; agrega uno nuevo si hace falta');
  }
  for (const b of baseline.stations) {
    const actual = stations.stations.find((s) => s.num === b.num);
    if (!actual) { err('E_APPEND_ONLY', 'la estacion N' + b.num + ' de la base no esta', 'gates/stations.json', 'una estacion no se saca'); continue; }
    if (actual.id !== b.id) err('E_APPEND_ONLY', 'la estacion N' + b.num + ' cambio de id: ' + b.id + ' -> ' + actual.id, 'gates/stations.json', 'los ids no se renombran');
  }

  /* ---------- 3. diferencia cero contra la base ---------- */

  const comparar = (a, b, donde) => {
    if (JSON.stringify(ordenar(a)) !== JSON.stringify(ordenar(b))) {
      err('E_BASE_ALTERADA', 'lo que corresponde a la base no coincide con gates/baseline.json', donde,
        'un requisito nuevo entra como entrada NUEVA con su since_schema; una entrada de la base no se edita. Si el cambio es a proposito, es una decision del metodo y va escrita.');
    }
  };
  const ordenar = (v) => {
    if (Array.isArray(v)) return v.map(ordenar);
    if (esObjeto(v)) { const o = {}; for (const k of Object.keys(v).sort()) o[k] = ordenar(v[k]); return o; }
    return v;
  };
  for (const s of steps.steps) {
    const b = baseline.steps.find((x) => x.num === s.num);
    if (!b) continue;
    try { comparar(proyectarPasoABase(s), b, 'steps[' + s.num + ']'); }
    catch (e) { err('E_EVALUADOR_BASE', e.message, 'steps[' + s.num + ']', 'cada paso conserva exactamente un evaluador con since_schema 1: el que tenia la base'); }
  }
  for (const s of stations.stations) {
    const b = baseline.stations.find((x) => x.num === s.num);
    if (!b) continue;
    try { comparar(proyectarPasoABase(s), b, 'stations[N' + s.num + ']'); }
    catch (e) { err('E_EVALUADOR_BASE', e.message, 'stations[N' + s.num + ']', 'cada estacion conserva exactamente un evaluador con since_schema 1'); }
  }

  /* ---------- 4. evaluadores: vocabulario cerrado y append-only ---------- */

  const conocidos = new Map(evaluators.evaluators.map((e) => [e.name, e]));
  if (!evaluators.append_only) err('E_ESQUEMA', 'gates/evaluators.json dejo de declararse append_only', 'gates/evaluators.json', 'el vocabulario de evaluadores es append-only por definicion');
  const usados = new Set();
  for (const lista of [steps.steps, stations.stations]) {
    for (const paso of lista) {
      for (const uso of paso.evaluators) {
        usados.add(uso.name);
        const def = conocidos.get(uso.name);
        if (!def) {
          err('E_EVALUADOR_DESCONOCIDO', 'el evaluador "' + uso.name + '" no esta en el vocabulario', (paso.tramo ? 'steps[' + paso.num + ']' : 'stations[N' + paso.num + ']'),
            'agregalo a gates/evaluators.json con su since_schema, o corregi el nombre. El vocabulario es cerrado: un nombre que no esta declarado es un error, no una extension.');
          continue;
        }
        if (def.since_schema !== uso.since_schema) {
          err('E_EVALUADOR_SINCE', 'el uso de "' + uso.name + '" dice since_schema ' + uso.since_schema + ' y el vocabulario dice ' + def.since_schema,
            (paso.tramo ? 'steps[' + paso.num + ']' : 'stations[N' + paso.num + ']'), 'igualalos: la version en la que aparecio el evaluador es una sola');
        }
      }
    }
  }
  for (const b of [...baseline.steps, ...baseline.stations]) {
    const def = conocidos.get(b.evaluator);
    if (!def) err('E_APPEND_ONLY', 'el evaluador "' + b.evaluator + '" que usaba la base ya no esta declarado', 'gates/evaluators.json', 'un evaluador no se saca nunca');
    else if (def.since_schema !== 1) err('E_APPEND_ONLY', 'el evaluador "' + b.evaluator + '" venia de la base y figura como since_schema ' + def.since_schema, 'gates/evaluators.json', 'lo que estaba en la base es since_schema 1');
  }
  for (const a of heuristics.anchors) {
    if (!conocidos.has(a.evaluator)) err('E_EVALUADOR_DESCONOCIDO', 'el ancla ' + a.id + ' nombra el evaluador "' + a.evaluator + '", que no esta en el vocabulario', 'gates/heuristics.json', 'corregi el nombre o declara el evaluador');
    if (!usados.has(a.evaluator)) err('E_ANCLA_SUELTA', 'el ancla ' + a.id + ' nombra el evaluador "' + a.evaluator + '" y ningun paso lo declara', 'gates/heuristics.json', 'engancha el evaluador en el peldano ' + a.step + ', o el ancla es decoracion');
  }

  /* ---------- 5. anclas: todas apuntan a un peldano que existe ---------- */

  for (const a of heuristics.anchors) {
    if (!numsPaso.has(a.step)) err('E_ANCLA_INEXISTENTE', 'el ancla ' + a.id + ' apunta al peldano ' + a.step + ', que no existe', 'gates/heuristics.json', 'la escalera va de 0 a 23');
    const paso = steps.steps.find((s) => s.num === a.step);
    if (paso && !paso.evaluators.some((e) => e.name === a.evaluator)) {
      err('E_ANCLA_SIN_ENGANCHE', 'el ancla ' + a.id + ' dice peldano ' + a.step + ' con evaluador ' + a.evaluator + ', y ese peldano no lo declara', 'gates/steps.json', 'agrega el evaluador al peldano ' + a.step);
    }
  }
  const idsAncla = new Set(heuristics.anchors.map((a) => a.id));
  for (const n of stations.loop_entry.inherits_anchors) {
    if (!idsAncla.has(n)) err('E_ANCLA_INEXISTENTE', 'el camino heredado hereda el ancla ' + n + ', que no existe', 'gates/stations.json', 'las anclas declaradas son: ' + [...idsAncla].join(', '));
  }
  if (!numsPaso.has(stations.loop_entry.step)) err('E_ANCLA_INEXISTENTE', 'el camino heredado entra al bucle por el peldano ' + stations.loop_entry.step + ', que no existe', 'gates/stations.json', 'la escalera va de 0 a 23');
  for (const r of heuristics.rules) {
    for (const n of r.anchor.steps) {
      if (!numsPaso.has(n)) err('E_ANCLA_INEXISTENTE', 'la regla ' + r.id + ' se ancla en el peldano ' + n + ', que no existe', 'gates/heuristics.json', 'la escalera va de 0 a 23');
    }
    if (!enums.anchor_source.includes(r.anchor.source)) err('E_ENUM', 'la regla ' + r.id + ' declara origen de ancla "' + r.anchor.source + '"', 'gates/heuristics.json', 'usa uno de: ' + enums.anchor_source.join(', '));
    if (r.timing && !enums.timing.includes(r.timing.value)) err('E_ENUM', 'la regla ' + r.id + ' declara momento "' + r.timing.value + '"', 'gates/heuristics.json', 'usa uno de: ' + enums.timing.join(', '));
    if (r.timing && !enums.timing_source.includes(r.timing.source)) err('E_ENUM', 'la regla ' + r.id + ' declara origen de momento "' + r.timing.source + '"', 'gates/heuristics.json', 'usa uno de: ' + enums.timing_source.join(', '));
  }

  /* ---------- 6. el Anexo H: todo enunciado se resuelve contra el anexo ---------- */

  const fuente = heuristics.statement_source;
  const tokens = enums.annex_severity_tokens;
  // Si el idioma publicado no tiene documento declarado, los errores de mas abajo
  // tienen que seguir diciendo DONDE: un error sin lugar no sirve para arreglar nada.
  const dondePub = fuente.documents[fuente.published_language] ?? 'gates/heuristics.json';
  if (!tokens[fuente.published_language]) {
    err('E_ANEXO_IDIOMA', 'se publica el enunciado en "' + fuente.published_language + '" y el esquema no declara los tokens de severidad de ese idioma', 'gates/schema.json',
      'declara enums.annex_severity_tokens.' + fuente.published_language + ', o corregi el idioma publicado');
  }
  for (const [idioma, ruta] of Object.entries(fuente.documents)) {
    if (ANEXOS[idioma] !== ruta) err('E_PUNTERO', 'el enunciado dice venir de ' + ruta + ' para el idioma ' + idioma, 'gates/heuristics.json',
      'el build extrae de ' + (ANEXOS[idioma] ?? 'un idioma que no conoce') + ': las dos rutas tienen que ser la misma');
  }
  for (const p of anexo.problemas) err('E_ANEXO_ILEGIBLE', p, dondePub, 'la fila de la tabla tiene que mantener su forma; el build extrae el enunciado de ahi');
  for (const p of anexo.canonico.problemas) err('E_ANEXO_ILEGIBLE', p, fuente.documents.es, 'la fila de la tabla tiene que mantener su forma: el castellano es la fuente de verdad y el validador la contrasta');

  const tokensPub = tokens[fuente.published_language] ?? {};
  for (const r of heuristics.rules) {
    const a = anexo.reglas.get(r.id);
    if (!a) {
      err('E_ANEXO_SIN_ENUNCIADO', 'la regla ' + r.id + ' no tiene fila en el anexo: su enunciado no existe', dondePub,
        'escribi la regla en el anexo (es la unica copia del texto) o saca la entrada de gates/heuristics.json');
      continue;
    }
    const esperada = tokensPub[a.severidad_token];
    if (!esperada) err('E_ANEXO_SEVERIDAD', 'el anexo declara para ' + r.id + ' la severidad "' + a.severidad_token + '", que no se reconoce', dondePub, 'usa una de: ' + Object.keys(tokensPub).join(', '));
    else if (esperada !== r.initial_severity) {
      err('E_ANEXO_SEVERIDAD', 'la regla ' + r.id + ' dice ' + r.initial_severity + ' y el anexo dice ' + a.severidad_token + ' (' + esperada + ')', 'gates/heuristics.json',
        'la severidad la decide el metodo en el anexo: ahi es donde se cambia, y con su decision escrita');
    }
    if (a.familia !== idFamilia(r.family)) err('E_ANEXO_FAMILIA', 'la regla ' + r.id + ' dice familia "' + r.family + '" (' + idFamilia(r.family) + ') y el anexo la pone en "' + a.familia_label + '" (' + a.familia + ')', 'gates/heuristics.json', 'usa la familia del anexo');
    if ('text' in r.statement) err('E_TEXTO_DUPLICADO', 'la regla ' + r.id + ' trae el enunciado transcrito', 'gates/heuristics.json', 'saca el texto: va el puntero y el build lo extrae. Dos copias del mismo texto se desincronizan solas.');
    if ('document' in r.statement) err('E_TEXTO_DUPLICADO', 'la regla ' + r.id + ' repite la ruta del anexo', 'gates/heuristics.json', 'la ruta va una sola vez, en heuristics.statement_source.documents');
  }
  for (const id of anexo.reglas.keys()) {
    if (!heuristics.rules.some((r) => r.id === id)) err('E_ANEXO_HUERFANA', 'el anexo declara la regla ' + id + ' y la compuerta no la tiene', 'gates/heuristics.json', 'agregala: una regla escrita que la compuerta no mira es decoracion');
  }

  // El castellano es la fuente de verdad: la version publicada no puede tener otras
  // reglas ni otras severidades que ella. Lo que NO se verifica aca, y queda dicho, es
  // si la redaccion inglesa sigue diciendo lo que dice la castellana.
  const tokensEs = tokens.es ?? {};
  for (const [id, canon] of anexo.canonico.reglas) {
    const pub = anexo.reglas.get(id);
    if (!pub) {
      err('E_ANEXO_TRADUCCION', 'la regla ' + id + ' esta en el anexo castellano y falta en el publicado (' + fuente.published_language + ')', dondePub,
        'un cambio en castellano se replica en las traducciones en el mismo commit: el publicado se quedo atras');
      continue;
    }
    if (tokensEs[canon.severidad_token] !== tokensPub[pub.severidad_token]) {
      err('E_ANEXO_TRADUCCION', 'la regla ' + id + ' tiene severidad ' + canon.severidad_token + ' en castellano y ' + pub.severidad_token + ' en el anexo publicado', dondePub,
        'la severidad la fija el metodo una sola vez: igualalas y revisa cual de las dos quedo mal');
    }
  }
  // La etiqueta de familia esta traducida, asi que no se comparan los nombres: se
  // compara el AGRUPAMIENTO. Si una familia castellana se corresponde con dos del
  // publicado, o al reves, es que una fila se movio de tabla en una de las dos versiones.
  const porFamilia = new Map();
  const alReves = new Map();
  for (const [id, canon] of anexo.canonico.reglas) {
    const pub = anexo.reglas.get(id);
    if (!pub) continue;
    const previo = porFamilia.get(canon.familia);
    if (previo && previo.familia !== pub.familia) {
      err('E_ANEXO_TRADUCCION', 'la familia "' + canon.familia_label + '" del anexo castellano aparece partida en el publicado: ' + previo.familia_label + ' y ' + pub.familia_label + ' (la regla que se movio es ' + id + ' o ' + previo.id + ')',
        dondePub, 'el agrupamiento por familia es el mismo en los dos idiomas: una fila se movio de tabla');
    } else if (!previo) porFamilia.set(canon.familia, { ...pub, id });
    const inverso = alReves.get(pub.familia);
    if (inverso && inverso.familia !== canon.familia) {
      err('E_ANEXO_TRADUCCION', 'la familia "' + pub.familia_label + '" del anexo publicado junta reglas que en castellano estan en "' + inverso.familia_label + '" y en "' + canon.familia_label + '" (' + id + ' contra ' + inverso.id + ')',
        fuente.documents.es, 'el agrupamiento por familia es el mismo en los dos idiomas: una fila se movio de tabla');
    } else if (!inverso) alReves.set(pub.familia, { ...canon, id });
  }
  for (const id of anexo.reglas.keys()) {
    if (!anexo.canonico.reglas.has(id)) err('E_ANEXO_TRADUCCION', 'la regla ' + id + ' esta en el anexo publicado y no en el castellano, que es la fuente de verdad', fuente.documents.es, 'escribila en castellano primero');
  }

  const cq = heuristics.rules.filter((r) => r.group === 'code_quality').length;
  const ux = heuristics.rules.filter((r) => r.group === 'usability').length;
  if (cq !== heuristics.counts.code_quality || ux !== heuristics.counts.usability || cq + ux !== heuristics.counts.total) {
    err('E_CUENTA', 'las cuentas declaradas (' + heuristics.counts.code_quality + ' + ' + heuristics.counts.usability + ' = ' + heuristics.counts.total + ') no son las reales (' + cq + ' + ' + ux + ' = ' + (cq + ux) + ')', 'gates/heuristics.json', 'corregi la cuenta; el conteo correcto es 45 (D-048)');
  }
  for (const r of heuristics.rules) {
    if (r.human_red && r.instrument.includes('auto_gate')) err('E_ROJO_HUMANO', 'la regla ' + r.id + ' bloquea con rojo humano y a la vez declara compuerta automatica', 'gates/heuristics.json', 'un rojo humano se verifica al cierre, no por commit');
    if (r.human_red && (!r.timing || r.timing.value !== 'pending_close')) err('E_ROJO_HUMANO', 'la regla ' + r.id + ' bloquea con rojo humano y su momento no es el cierre del pendiente', 'gates/heuristics.json', 'D-048: se verifica al cierre del pendiente, con el caso manual delante, nunca por commit');
  }

  /* ---------- 7. el tablero y el apagado no se aflojan ---------- */

  const t = heuristics.scoreboard;
  if (t.figures.length !== 2) err('E_TABLERO', 'el tablero tiene ' + t.figures.length + ' cifra(s)', 'gates/heuristics.json', 'D-047: dos cifras, nunca una. Con una sola, apagar reglas mejora el numero.');
  if (t.closes_blocks !== false) err('E_TABLERO', 'el tablero figura como que cierra bloques', 'gates/heuristics.json', 'D-047: ninguna cifra autoriza a cerrar un bloque; el verde lo decide cada regla');
  if (!t.invalid_ruleset_emits_no_figures) err('E_TABLERO', 'el tablero emitiria cifras con un reglamento invalido', 'gates/heuristics.json', 'D-047: una regla apagada sin registro no produce tablero, produce rojo');
  const REGISTRO = ['reason', 'authorized_by', 'review_date'];
  for (const campo of REGISTRO) {
    if (!heuristics.switch_off.requires.includes(campo)) err('E_APAGADO', 'el registro de apagado no exige ' + campo, 'gates/heuristics.json', 'D-046: apagar vale solo como decision registrada con motivo, autor y fecha de revision');
    if (!schema.project_config.switch_off_record.includes(campo)) err('E_APAGADO', 'la configuracion de proyecto no exige ' + campo + ' en el registro de apagado', 'gates/schema.json', 'D-046: el registro es el mismo en el catalogo y en la configuracion que lo consume');
  }
  if (JSON.stringify(heuristics.switch_off.requires) !== JSON.stringify(schema.project_config.switch_off_record)) {
    err('E_APAGADO', 'el registro de apagado del catalogo y el de la configuracion no son el mismo', 'gates/schema.json',
      'un productor y un consumidor del mismo registro con campos distintos es una desincronizacion esperando: igualalos');
  }
  for (const u of adapters.thresholds) {
    if ((u.value === null) !== (u.declared === false)) err('E_UMBRAL', 'el umbral ' + u.id + ' dice valor ' + JSON.stringify(u.value) + ' y declarado ' + u.declared, 'gates/adapters.json', 'un umbral sin valor se publica como no declarado, y uno declarado tiene valor. No se inventa ninguno.');
    if (!heuristics.rules.some((r) => r.id === u.rule)) err('E_UMBRAL', 'el umbral ' + u.id + ' apunta a la regla ' + u.rule + ', que no existe', 'gates/adapters.json', 'corregi el id de la regla');
  }
  for (const f of adapters.families) {
    for (const id of f.not_applicable) if (!heuristics.rules.some((r) => r.id === id)) err('E_ADAPTADOR', 'la familia ' + f.id + ' excluye la regla ' + id + ', que no existe', 'gates/adapters.json', 'corregi el id de la regla');
  }

  /* ---------- 8. ASCII puro ---------- */

  for (const rel of Object.values(fuentes.catalog.parts)) {
    let texto;
    try { texto = readFileSync(new URL('../' + rel, import.meta.url), 'utf8'); } catch { err('E_PARTE_FALTA', 'gates/catalog.json nombra ' + rel + ' y no se puede leer', 'gates/catalog.json', 'corregi la ruta o agrega el archivo'); continue; }
    const sucios = [...texto].filter((c) => c.charCodeAt(0) > 0x7f);
    if (sucios.length) err('E_ASCII', rel + ' tiene ' + sucios.length + ' caracter(es) sobre 0x7F: ' + [...new Set(sucios)].join(' '), rel, 'el nivel de datos es ingles y ASCII puro (D-051): son datos que consume una herramienta. La prosa del metodo, con sus tildes, va en docs/.');
  }

  /* ---------- 9. la huella cubre todo lo exigible ---------- */

  const esquema = schema.version_scheme;
  const cubiertas = new Set(esquema.hash_covers);
  const excluidas = new Set(esquema.hash_excludes);
  for (const clave of cubiertas) if (excluidas.has(clave)) err('E_HUELLA', 'la clave ' + clave + ' esta a la vez cubierta y excluida de la huella', 'gates/schema.json', 'decide: o viaja protegida, o es metadata de publicacion');
  let publicado = null;
  try { publicado = armarContenido(fuentes, anexo); } catch { /* lo que falte ya salio arriba */ }
  if (publicado) {
    for (const clave of Object.keys(publicado)) {
      if (!cubiertas.has(clave) && !excluidas.has(clave)) {
        err('E_HUELLA', 'la clave ' + clave + ' del publicado no esta ni cubierta ni excluida de la huella', 'gates/schema.json',
          'agregala a hash_covers si lleva requisitos, o a hash_excludes si es metadata de publicacion. Una clave en el limbo viaja sin proteccion: una copia congelada alterada ahi seguiria coincidiendo.');
      }
    }
    for (const clave of cubiertas) {
      if (!(clave in publicado)) err('E_HUELLA', 'la huella cubre la clave ' + clave + ', que el publicado no tiene', 'gates/schema.json', 'corregi el nombre o saca la clave de hash_covers');
    }
  }

  /* ---------- 10. la version declarada y la huella que produjo ---------- */

  const changelog = fuentes.catalog.changelog;
  if (!Array.isArray(changelog) || !changelog.length) {
    err('E_VERSION', 'gates/catalog.json no tiene changelog', 'gates/catalog.json',
      'cada version publicada deja su entrada con la huella que produjo: es el registro que permite distinguir dos contenidos');
  } else {
    const versiones = changelog.map((c) => c.catalog_version);
    if (new Set(versiones).size !== versiones.length) {
      err('E_VERSION', 'hay dos entradas del changelog con la misma catalog_version', 'gates/catalog.json',
        'una version es un contenido, y uno solo: si el contenido cambio, la version sube');
    }
    const ultima = changelog[changelog.length - 1];
    if (ultima.catalog_version !== fuentes.catalog.catalog_version) {
      err('E_VERSION', 'la version declarada es ' + fuentes.catalog.catalog_version + ' y la ultima entrada del changelog dice ' + ultima.catalog_version, 'gates/catalog.json',
        'la ultima entrada del changelog es la version que se publica: agrega la entrada que falta, o corregi catalog_version');
    }
    for (const c of changelog) {
      if (!/^[0-9a-f]{64}$/.test(c.content_hash ?? '')) {
        err('E_VERSION', 'la entrada ' + c.catalog_version + ' del changelog no registra una huella sha256', 'gates/catalog.json',
          'cada version viaja con la huella que produjo; sin eso, una copia congelada no se puede contrastar contra el registro del metodo');
      }
    }
    const entrada = changelog.find((c) => c.catalog_version === fuentes.catalog.catalog_version);
    if (!entrada) {
      err('E_VERSION', 'la version declarada ' + fuentes.catalog.catalog_version + ' no tiene entrada en el changelog', 'gates/catalog.json',
        'agregala, con la fecha, la decision que la motiva y la huella que produce');
    } else if (publicado) {
      let calculada = null;
      try { calculada = huellaDeContenido(publicado, esquema.hash_covers); } catch { /* lo que falte ya salio en la seccion 9 */ }
      if (calculada && entrada.content_hash !== calculada) {
        err('E_VERSION', 'el contenido no es el que la version ' + entrada.catalog_version + ' tiene registrado: registrada ' + String(entrada.content_hash).slice(0, 12) + ', calculada ' + calculada.slice(0, 12), 'gates/catalog.json',
          'cambio una clave cubierta por la huella. Subi catalog_version y agrega la entrada nueva con la huella ' + calculada + ', o volve atras el cambio. Dos contenidos distintos bajo una misma version declarada dejan ilegible lo que un proyecto congelo, que es justo lo que la version existe para evitar.');
      }
    }
  }

  /* ---------- 11. la declaracion de idioma dice la verdad ---------- */

  const idiomas = fuentes.catalog.languages;
  const tl = idiomas && idiomas.text_language;
  if (!tl) {
    err('E_IDIOMA_DECLARADO', 'gates/catalog.json no declara el idioma de cada texto', 'gates/catalog.json',
      'el publicado es bilingue (la base congelada no se traduce): declara languages.text_language, o un consumidor que confie le muestra castellano a un lector ingles');
  } else if (publicado) {
    if (tl.default !== 'en') {
      err('E_IDIOMA_DECLARADO', 'el idioma por defecto del nivel de datos dice "' + tl.default + '"', 'gates/catalog.json',
        'D-051: lo que no esta traducido se publica en ingles. La unica excepcion es la base congelada, y esa va por spanish_scope.');
    }
    if (!Array.isArray(tl.text_fields) || !tl.text_fields.length) {
      err('E_IDIOMA_DECLARADO', 'la declaracion de idioma no dice que campos son texto legible', 'gates/catalog.json',
        'nombralos en text_fields: sin eso la regla no se puede verificar ni aplicar');
    } else {
      const deLaBase = new Set();
      (function recorrer(v) {
        if (typeof v === 'string') return deLaBase.add(v);
        if (Array.isArray(v)) return v.forEach(recorrer);
        if (esObjeto(v)) return Object.values(v).forEach(recorrer);
      })(baseline);
      const textos = { es: 0, en: 0 };
      const mentiras = [];
      const caminar = (v, donde, campo, nuevo) => {
        if (typeof v === 'string') {
          if (!tl.text_fields.includes(campo)) return;
          if (nuevo) { textos.en++; return; }
          textos.es++;
          if (!deLaBase.has(v)) mentiras.push(donde + ' = ' + JSON.stringify(v.slice(0, 60)));
          return;
        }
        if (Array.isArray(v)) return v.forEach((x, i) => caminar(x, donde + '[' + i + ']', campo, nuevo));
        if (esObjeto(v)) {
          const n = nuevo || (typeof v.since_schema === 'number' && v.since_schema > 1);
          for (const [k, x] of Object.entries(v)) caminar(x, donde + '.' + k, k, n);
        }
      };
      for (const clave of tl.spanish_scope ?? []) {
        if (!(clave in publicado)) {
          err('E_IDIOMA_DECLARADO', 'el alcance del castellano nombra la clave ' + clave + ', que el publicado no tiene', 'gates/catalog.json', 'corregi el nombre en spanish_scope');
          continue;
        }
        caminar(publicado[clave], clave, clave, false);
      }
      for (const m of mentiras) {
        err('E_IDIOMA_DECLARADO', 'la regla declara castellano un texto que no esta en la base congelada: ' + m, 'gates/catalog.json',
          'o el texto es nuevo y le falta su since_schema, o se edito la base. La declaracion de idioma solo sirve si es verdad: un consumidor la aplica sin leer el texto.');
      }
      const esperado = textos.es && textos.en ? 'mixed' : textos.es ? 'es' : 'en';
      if (idiomas.data !== esperado) {
        err('E_IDIOMA_DECLARADO', 'languages.data dice "' + idiomas.data + '" y el publicado lleva ' + textos.es + ' texto(s) en castellano y ' + textos.en + ' en ingles', 'gates/catalog.json',
          'declara "' + esperado + '". Un consumidor que lee un solo idioma y confia le muestra castellano a un lector ingles.');
      }
    }
  }

  /* ---------- 12. la configuracion de un proyecto (opcional) ---------- */

  if (config) {
    const idsRegla = new Set(heuristics.rules.map((r) => r.id));
    const registro = schema.project_config.switch_off_record.filter((c) => c !== 'rule');
    for (const grupo of heuristics.groups.map((g) => g.id)) {
      if (!(grupo in (config.switches ?? {}))) err('E_CONFIG', 'la configuracion no dice si el grupo ' + grupo + ' esta encendido', 'configuracion del proyecto', 'declara switches.' + grupo + ' en true o false');
    }
    for (const r of config.switched_off ?? []) {
      if (!idsRegla.has(r.rule)) err('E_CONFIG', 'la configuracion apaga ' + r.rule + ', que no es una regla del catalogo', 'configuracion del proyecto', 'corregi el id');
      for (const campo of registro) {
        if (!r[campo]) err('E_APAGADO_SIN_REGISTRO', 'la regla ' + r.rule + ' esta apagada sin ' + campo, 'configuracion del proyecto',
          'D-046: apagar vale solo como decision registrada con motivo, autor y fecha de revision. Apagar sin registro es rojo, no la ausencia de una regla.');
      }
    }
    for (const [id, valor] of Object.entries(config.thresholds ?? {})) {
      const u = adapters.thresholds.find((x) => x.id === id);
      if (!u) err('E_CONFIG', 'la configuracion declara el umbral ' + id + ', que no esta en el adaptador', 'configuracion del proyecto', 'los umbrales son: ' + adapters.thresholds.map((x) => x.id).join(', '));
      else if (valor === 0 || valor === null) err('E_UMBRAL_NO_DECLARADO', 'el umbral ' + id + ' esta en ' + JSON.stringify(valor) + ' y nadie lo declaro', 'configuracion del proyecto',
        'se reporta como umbral no declarado en vez de inventarlo: lo fija ' + (u.declared_by ?? 'el dueno'));
    }
  }

  return errores;
}

/* ---------- la linea de comandos ---------- */

if (esLineaDeComandos(import.meta.url)) {
  const i = process.argv.indexOf('--config');
  const config = i > 0 ? JSON.parse(readFileSync(process.argv[i + 1], 'utf8')) : null;
  const errores = validar(cargarFuentes(), extraerAnexo(), config);
  if (!errores.length) {
    console.log('compuertas: validado (24 peldanos, 8 estaciones, 45 reglas)' + (config ? ' + la configuracion del proyecto' : ''));
    process.exit(0);
  }
  for (const e of errores) {
    console.error('[' + e.code + '] ' + e.que);
    console.error('    donde: ' + e.donde);
    console.error('    arreglo: ' + e.arreglo);
  }
  console.error('\ncompuertas: ' + errores.length + ' error(es). No se publica nada.');
  process.exit(1);
}
