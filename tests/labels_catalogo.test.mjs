// El catalogo de textos por identificador: lo que tiene que cumplir (PND-011, D-074).
//
// El contexto completo esta en build/labels_api.mjs. En una linea: el archivo de compuertas
// le dice al consumidor que no imprima sus textos y que saque el texto de su propio
// catalogo, y el metodo no publicaba ningun catalogo de donde sacarlo, asi que la
// instruccion era correcta y no se podia cumplir.
//
// Lo que estas pruebas vigilan, y en este orden de importancia:
//   1. que a ningun identificador le falte su texto en ningun idioma -- es el criterio de
//      aceptacion del perfil auditor, textual del pendiente;
//   2. que NINGUN texto este escrito aca ni transcrito: cada una de las 624 cadenas tiene
//      que aparecer LITERAL en el documento de prosa del que dice salir. Es la prueba que
//      hace imposible que este archivo se convierta en una segunda copia del metodo, que
//      es el riesgo propio de un catalogo de textos y la razon por la que esto se extrae;
//   3. que la lista de idiomas no sea una segunda copia de la que el dato declara;
//   4. que la identidad del recurso (version declarada + huella registrada) se sostenga.
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { raiz, huellaDeContenido } from '../build/gates_lib.mjs';
import { IDIOMAS } from '../build/anexo_simetria.mjs';
import { RECURSOS } from '../build/index_api.mjs';
import { DOCUMENTOS, idiomasDeclarados, leerDato, leerTextos } from '../build/labels_api.mjs';

const api = (n) => JSON.parse(readFileSync(join(raiz, 'docs', 'html', 'api', n), 'utf8'));
const pub = api('labels.json');
const catalogo = JSON.parse(readFileSync(join(raiz, 'labels', 'catalog.json'), 'utf8'));
const dato = leerDato();

const GRUPOS = [
  ['steps', dato.pasos, 'principal'],
  ['stations', dato.estaciones, 'evolutivo'],
  ['rules', dato.reglas, 'anexo'],
];

test('a ningun identificador le falta su texto en ningun idioma', () => {
  const faltan = [];
  for (const idioma of idiomasDeclarados()) {
    const labels = pub.labels[idioma];
    assert.ok(labels, 'el idioma ' + idioma + ' esta publicado');
    for (const [grupo, nodos] of GRUPOS) {
      for (const nodo of nodos) {
        const texto = labels[grupo]?.[nodo.id];
        if (typeof texto !== 'string' || !texto.trim()) faltan.push(idioma + '/' + grupo + '/' + nodo.id);
      }
    }
  }
  assert.deepEqual(faltan, [], 'identificadores sin texto:\n  ' + faltan.join('\n  '));
});

// Y la simetria para el otro lado: una clave publicada que el dato no declara es un texto
// que nadie puede pedir, porque el consumidor llega con el id que el dato le dio.
test('no hay ningun texto publicado que el dato no declare', () => {
  const sobran = [];
  for (const [idioma, labels] of Object.entries(pub.labels)) {
    for (const [grupo, nodos] of GRUPOS) {
      const declarados = new Set(nodos.map((n) => n.id));
      for (const id of Object.keys(labels[grupo] ?? {})) {
        if (!declarados.has(id)) sobran.push(idioma + '/' + grupo + '/' + id);
      }
    }
  }
  assert.deepEqual(sobran, [], 'textos publicados que el dato no declara:\n  ' + sobran.join('\n  '));
});

// LA PRUEBA QUE IMPORTA. Si una cadena no esta literal en el documento del que dice salir,
// alguien la escribio o la transcribio, y entonces este archivo es una segunda version del
// metodo que puede divergir de la primera sin que nada caiga. Es la misma regla que ya
// gobierna el enunciado de las 46 reglas en el archivo de compuertas, exigida sobre las 624.
test('ninguna cadena esta escrita aca: cada una aparece literal en su documento de prosa', () => {
  const inventadas = [];
  let revisadas = 0;
  for (const idioma of idiomasDeclarados()) {
    const textos = leerTextos(idioma);
    for (const [grupo, nodos, documento] of GRUPOS) {
      const fuente = textos[documento];
      assert.ok(fuente, idioma + '/' + DOCUMENTOS[documento] + ' se pudo leer');
      for (const nodo of nodos) {
        const texto = pub.labels[idioma][grupo][nodo.id];
        revisadas++;
        if (!fuente.includes(texto)) inventadas.push(idioma + '/' + grupo + '/' + nodo.id + ' = ' + JSON.stringify(texto.slice(0, 70)));
      }
    }
  }
  assert.equal(revisadas, pub.counts.strings, 'se revisaron las que el archivo declara');
  assert.deepEqual(inventadas, [], 'cadenas que no estan en la prosa:\n  ' + inventadas.join('\n  '));
});

test('el resumen de cantidades no puede mentir: es el que da el arbol', () => {
  const idiomas = idiomasDeclarados();
  const porIdioma = dato.pasos.length + dato.estaciones.length + dato.reglas.length;
  assert.deepEqual(pub.counts, {
    languages: idiomas.length,
    ids_per_language: porIdioma,
    steps: dato.pasos.length,
    stations: dato.estaciones.length,
    rules: dato.reglas.length,
    strings: idiomas.length * porIdioma,
  });
  assert.ok(pub.content_hash.covers.includes('counts'), 'y viaja cubierto por la huella');
});

// Una sola copia de la lista de idiomas (D-067). El recurso la DERIVA del catalogo de
// compuertas en vez de declararla de nuevo; y la lista que las guardas de la prosa usan
// --IDIOMAS, escrita a mano en build/anexo_simetria.mjs antes de que el dato la declarara--
// tiene que ser la misma. El dia que se agregue un idioma, esto cae en vez de dejar media
// cadena mirando ocho idiomas y la otra mitad nueve.
test('la lista de idiomas es la que el dato declara, y no una segunda copia', () => {
  const declarados = idiomasDeclarados();
  assert.deepEqual(pub.languages.published, declarados);
  assert.deepEqual([...IDIOMAS], declarados, 'las guardas de la prosa miran los mismos idiomas que el dato declara');
});

test('la huella recalcula, y es la que el registro anota para la version declarada', () => {
  const valor = huellaDeContenido(pub, pub.content_hash.covers);
  assert.equal(valor, pub.content_hash.value, 'la huella publicada es la de su contenido');
  const entrada = catalogo.changelog.find((c) => c.labels_version === pub.labels_version);
  assert.ok(entrada, 'la version declarada tiene su entrada en el registro');
  assert.equal(entrada.content_hash, valor, 'y el registro anota la huella que el contenido da');
  assert.equal(catalogo.labels_version, pub.labels_version, 'el catalogo declara la version que se publico');
});

test('ninguna clave del publicado queda en el limbo de la huella', () => {
  const cubre = new Set(pub.content_hash.covers);
  const excluye = new Set(pub.content_hash.excludes);
  const limbo = Object.keys(pub).filter((k) => !cubre.has(k) && !excluye.has(k));
  assert.deepEqual(limbo, [], 'claves sin cubrir ni excluir: ' + limbo.join(', '));
  assert.deepEqual([...cubre].filter((k) => excluye.has(k)), [], 'ninguna clave cubierta y excluida a la vez');
});

test('el recurso esta declarado en el indice y el indice lo cita vivo', () => {
  const declarado = RECURSOS.find((r) => r.name === 'labels.json');
  assert.ok(declarado, 'labels.json esta en la lista de recursos del indice');
  assert.equal(declarado.version_field, 'labels_version');
  const enIndice = api('index.json').resources.find((r) => r.name === 'labels.json');
  assert.ok(enIndice, 'el indice lo lista');
  assert.equal(enIndice.version, pub.labels_version);
  assert.equal(enIndice.content_hash.value, pub.content_hash.value);
});

// La neutralidad, para esta superficie y con su alcance dicho. La prueba del nivel de datos
// (tests/gates_neutralidad.test.mjs) cubre el payload de las compuertas; esto es otra cosa:
// es PROSA del metodo, y la prosa compara herramientas por su nombre a proposito. Pero los
// textos que este recurso publica son titulos y enunciados de regla, que son justo las
// partes de la prosa que entran a la interfaz de datos y viajan a cualquier consumidor. Un
// nombre de herramienta ahi se leeria como una dependencia, igual que adentro del dato.
// Medido el 2026-10-28: cero en las 624.
test('ningun texto publicado nombra una herramienta ni un protocolo', () => {
  const prohibidas = /\b(forge|nac-?3|yujin|yf|claude|copilot|cursor|codex|gemini|chatgpt|gpt|mcp)\b/i;
  const hallazgos = [];
  for (const [idioma, labels] of Object.entries(pub.labels)) {
    for (const [grupo, textos] of Object.entries(labels)) {
      for (const [id, texto] of Object.entries(textos)) {
        if (prohibidas.test(texto)) hallazgos.push(idioma + '/' + grupo + '/' + id + ' = ' + JSON.stringify(texto.slice(0, 70)));
      }
    }
  }
  assert.deepEqual(hallazgos, [], 'textos que nombran una herramienta:\n  ' + hallazgos.join('\n  '));
});

// Lo que el archivo declara que deja AFUERA, verificado y no creido. La exclusion de las
// preguntas de verificacion se apoya en una medicion --que la lista del dato y la lista de
// la prosa del contrato no son la misma, asi que emparejarlas por posicion las etiquetaria
// mal--, y una medicion que vive solo en una oracion se vuelve falsa sola. Esto la
// reproduce. El dia que las dos listas coincidan en todos los peldanos, esto se pone rojo
// diciendo que la exclusion hay que revisarla, que es exactamente lo que corresponde.
test('la exclusion de las preguntas de verificacion sigue siendo verdad, medida de nuevo', () => {
  const principal = readFileSync(join(raiz, 'docs', 'ESCALERA_METODOLOGICA.md'), 'utf8').replace(/\r\n/g, '\n');
  const pasos = JSON.parse(readFileSync(join(raiz, 'gates', 'steps.json'), 'utf8')).steps;
  let difieren = 0, comparados = 0;
  for (const paso of pasos) {
    const dos = String(paso.num).padStart(2, '0');
    const cita = new RegExp('peldanos/(peldano-' + dos + '-[a-z0-9-]+\\.md)').exec(principal);
    if (!cita) continue;
    const contrato = readFileSync(join(raiz, 'docs', 'peldanos', cita[1]), 'utf8').replace(/\r\n/g, '\n');
    const seccion = contrato.split(/^## /m).find((s) => /^4\./.test(s));
    if (!seccion) continue;
    comparados++;
    if ((seccion.match(/^- /gm) ?? []).length !== (paso.verify ?? []).length) difieren++;
  }
  assert.ok(comparados > 0, 'no haber podido comparar ninguno es rojo y no verde');
  assert.ok(difieren > 0, 'si las dos listas ya coinciden en todos los peldanos, la exclusion declarada en scope hay que revisarla');
  const exclusion = pub.scope.excluded.find((e) => /verification questions/.test(e.kind));
  assert.ok(exclusion, 'la exclusion esta declarada en el publicado');
  assert.match(exclusion.measured, /twenty-four/i, 'y declara la medicion que la sostiene');
});

test('el archivo dice que protege y que no, con la frase que viaja en una sola copia', () => {
  assert.ok(pub.content_hash.covers.includes('what'), '`what` esta cubierto por la huella');
  const gates = api('gates.json');
  const desde = (p) => p.what.slice(p.what.indexOf('And about the content hash'));
  assert.equal(desde(pub), desde(gates), 'la misma frase, byte a byte, que la del catalogo de compuertas');
  assert.match(pub.what, /does not protect/i);
});
