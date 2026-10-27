// El indice de la interfaz de datos (docs/html/api/index.json).
//
// Lo que estaba mal y este archivo vigila: la interfaz publicaba dos recursos que se
// servian bien y nada que los listara, asi que un consumidor que no habia leido el
// repositorio no tenia por donde empezar. El indice lo arregla, y trae su propio riesgo:
// un indice que cita una huella vieja es PEOR que no tener indice, porque le miente al
// consumidor con cara de dato verificado. De ahi que casi todas las pruebas de aca sean
// rojos deliberados sobre el verificador.
//
// El indice no lleva version ni huella propias (D-056): es un directorio, no un catalogo.
// La contracara de esa decision es que tiene que ser COMPROBABLE contra lo que apunta, y
// eso tambien se prueba.
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { raiz } from '../build/gates_lib.mjs';
import {
  BASE_CANONICA, BASE_ESPEJO, RECURSOS, NOMBRE,
  armarIndice, leerDisco, verificarIndice,
} from '../build/index_api.mjs';
import { clasificarIndice } from '../build/portal_verify.mjs';

const disco = leerDisco();
const indiceEnDisco = JSON.parse(readFileSync(join(raiz, 'docs', 'html', 'api', NOMBRE), 'utf8'));
const clonar = (o) => JSON.parse(JSON.stringify(o));
const codigos = (errores) => [...new Set(errores.map((e) => e.codigo))].sort();

/* ------------------------------------------------------------------ *
 * Lo que el indice tiene que decir
 * ------------------------------------------------------------------ */

test('el indice commiteado pasa su propio verificador', () => {
  assert.deepEqual(verificarIndice(indiceEnDisco, disco), []);
});

test('el indice commiteado es el que dan los recursos (salvo la fecha de la corrida)', () => {
  const recien = armarIndice(disco);
  const sinFecha = (o) => { const c = clonar(o); delete c.generated_at; return c; };
  assert.deepEqual(sinFecha(indiceEnDisco), sinFecha(recien), 'el indice es un generado: no se edita a mano');
});

test('no lleva identidad propia, y lo dice (D-056)', () => {
  for (const clave of ['version', 'catalog_version', 'corpus_version', 'content_hash', 'index_version']) {
    assert.equal(clave in indiceEnDisco, false, 'el indice no declara ' + clave);
  }
  assert.equal(indiceEnDisco.identity.has_own_version, false);
  assert.equal(indiceEnDisco.identity.has_own_content_hash, false);
  // La tension que deja no tener identidad -- como sabe el consumidor que el indice no
  // esta viejo -- tiene que estar contestada EN el archivo, no en la cabeza del autor.
  assert.match(indiceEnDisco.identity.staleness_check, /recompute/i);
  assert.match(indiceEnDisco.what, /trust anchor/i);
});

test('el campo what dice que protege la huella y que no (PND-009)', () => {
  assert.match(indiceEnDisco.what, /self-consistent/i);
  assert.match(indiceEnDisco.what, /truncation/i);
  assert.match(indiceEnDisco.what, /does not protect/i);
});

test('declara la direccion canonica absoluta, y el espejo como espejo (PND-006)', () => {
  assert.equal(indiceEnDisco.canonical_base, BASE_CANONICA);
  assert.equal(indiceEnDisco.mirrors[0].base, BASE_ESPEJO);
  assert.notEqual(indiceEnDisco.canonical_base, indiceEnDisco.mirrors[0].base);
  for (const r of indiceEnDisco.resources) {
    assert.equal(r.url, BASE_CANONICA + r.name, 'la direccion de ' + r.name + ' es absoluta y canonica');
    assert.equal(r.media_type, 'application/json');
    assert.ok(Number.isInteger(r.bytes) && r.bytes > 0, 'declara el tamanio de ' + r.name);
    assert.ok(r.version_field && r.version, 'declara el campo de version de ' + r.name + ' y su valor');
    assert.equal(r.content_hash.field, 'content_hash.value');
    assert.ok(r.content_hash.algo && r.content_hash.canonical_form, 'declara con que se recalcula ' + r.name);
  }
  assert.equal(indiceEnDisco.resources.length, RECURSOS.length);
});

test('cada recurso apunta a su registro de versiones, y el registro dice lo mismo (PND-007)', () => {
  for (const r of indiceEnDisco.resources) {
    const declarado = RECURSOS.find((d) => d.name === r.name);
    assert.equal(r.version_ledger.path, declarado.ledger_path);
    assert.equal(r.version_ledger.field, declarado.ledger_field);
    assert.ok(r.version_ledger.url.endsWith(declarado.ledger_path), 'la direccion del registro apunta al archivo que vive en el repositorio del metodo');
    // Y el ancla de confianza tiene que ser verdad: el registro que el indice nombra
    // registra, para la version que el indice cita, la huella que el indice cita.
    const catalogo = JSON.parse(readFileSync(join(raiz, declarado.ledger_path), 'utf8'));
    const entrada = catalogo[declarado.ledger_field].find((e) => e[declarado.version_field] === r.version);
    assert.ok(entrada, 'el registro tiene la entrada de la version ' + r.version + ' de ' + r.name);
    assert.equal(entrada.content_hash, r.content_hash.value,
      'el registro y el indice citan la misma huella para la version ' + r.version);
  }
});

test('el archivo en disco es ASCII puro (D-051)', () => {
  const texto = readFileSync(join(raiz, 'docs', 'html', 'api', NOMBRE), 'utf8');
  const sucios = [...new Set([...texto].filter((c) => c.charCodeAt(0) > 0x7f))];
  assert.deepEqual(sucios, [], 'el nivel de datos es ingles y ASCII puro');
});

test('el paso de sanidad del flujo nombra el indice', () => {
  // Producer/consumer: el indice es un publicado mas, y el flujo tiene que negarse a
  // publicar un sitio donde falte. Si alguien agrega un recurso y no lo agrega al paso,
  // el dia que ese recurso falte la publicacion sale igual, a medias.
  const flujo = readFileSync(join(raiz, '.github', 'workflows', 'compuertas.yml'), 'utf8');
  assert.match(flujo, /docs\/html\/api\/index\.json/);
});

/* ------------------------------------------------------------------ *
 * Los rojos deliberados: cada uno es un caso que paso de verdad o que puede pasar
 * ------------------------------------------------------------------ */

test('ROJO: el indice cita una huella que ya no es la del recurso', () => {
  const malo = clonar(indiceEnDisco);
  malo.resources[0].content_hash.value = 'f'.repeat(64);
  assert.deepEqual(codigos(verificarIndice(malo, disco)), ['E_INDICE_HUELLA']);
});

test('ROJO: el indice cita una version que el recurso no declara', () => {
  const malo = clonar(indiceEnDisco);
  malo.resources[0].version = '1999.01.1';
  assert.deepEqual(codigos(verificarIndice(malo, disco)), ['E_INDICE_VERSION']);
});

test('ROJO: el indice lista un recurso que no esta en disco', () => {
  const sinUno = { ...disco };
  delete sinUno[indiceEnDisco.resources[0].name];
  assert.deepEqual(codigos(verificarIndice(indiceEnDisco, sinUno)), ['E_INDICE_FALTA_RECURSO']);
});

test('ROJO: hay un recurso publicado que el indice no lista', () => {
  const conExtra = { ...disco, 'labels.en.json': { bytes: 10, tiene_cr: false, json: { what: 'x' } } };
  assert.deepEqual(codigos(verificarIndice(indiceEnDisco, conExtra)), ['E_INDICE_NO_LISTA']);
});

test('ROJO: el tamanio declarado no es el del archivo', () => {
  const malo = clonar(indiceEnDisco);
  malo.resources[1].bytes = malo.resources[1].bytes + 1;
  assert.deepEqual(codigos(verificarIndice(malo, disco)), ['E_INDICE_BYTES']);
});

test('ROJO: un caracter fuera de ASCII (D-051)', () => {
  const malo = clonar(indiceEnDisco);
  malo.resources[0].what = 'La definicion mecanica de las compuertas del metodo';
  const salida = codigos(verificarIndice(malo, disco));
  assert.ok(salida.includes('E_INDICE_IDIOMA'), 'el castellano se detecta: ' + salida.join(', '));
  const conTilde = clonar(indiceEnDisco);
  conTilde.mirrors[0].note = 'The readable site carries its own copy of this director' + String.fromCharCode(0xed) + 'a';
  assert.ok(codigos(verificarIndice(conTilde, disco)).includes('E_INDICE_ASCII'));
});

test('ROJO: el indice se da identidad propia', () => {
  const malo = clonar(indiceEnDisco);
  malo.content_hash = { algo: 'sha256', value: 'a'.repeat(64) };
  assert.deepEqual(codigos(verificarIndice(malo, disco)), ['E_INDICE_IDENTIDAD']);
  const conVersion = clonar(indiceEnDisco);
  conVersion.index_version = '2026.10.1';
  assert.deepEqual(codigos(verificarIndice(conVersion, disco)), ['E_INDICE_IDENTIDAD']);
});

test('ROJO: una direccion relativa en vez de la canonica absoluta', () => {
  const malo = clonar(indiceEnDisco);
  malo.resources[0].url = 'gates.json';
  assert.deepEqual(codigos(verificarIndice(malo, disco)), ['E_INDICE_URL']);
  const sinBase = clonar(indiceEnDisco);
  sinBase.canonical_base = 'https://example.com/api/';
  assert.ok(codigos(verificarIndice(sinBase, disco)).includes('E_INDICE_CANONICA'));
});

test('ROJO: un recurso sin puntero a su registro de versiones', () => {
  const malo = clonar(indiceEnDisco);
  delete malo.resources[0].version_ledger;
  // Sin el bloque entero se pierden las dos cosas: el puntero y la direccion que baja.
  assert.deepEqual(codigos(verificarIndice(malo, disco)), ['E_INDICE_REGISTRO', 'E_INDICE_REGISTRO_CRUDO']);
});

// El registro de versiones se declara con DOS direcciones porque son dos cosas: la pagina
// que lee una persona (este alojamiento la sirve como HTML) y el archivo que baja una
// maquina. Publicar solo la primera obligaba al consumidor a derivar la segunda, y el unico
// que implemento la obligacion de fijacion tuvo que adivinarla (PND-056, D-069).
test('ROJO: el registro de versiones sin la direccion que devuelve el JSON', () => {
  const malo = clonar(indiceEnDisco);
  delete malo.resources[0].version_ledger.fetch_url;
  assert.deepEqual(codigos(verificarIndice(malo, disco)), ['E_INDICE_REGISTRO_CRUDO']);
});

test('ROJO: la direccion de bajada apunta a otro archivo que el path declarado', () => {
  const malo = clonar(indiceEnDisco);
  malo.resources[0].version_ledger.fetch_url =
    'https://raw.githubusercontent.com/pkuschnirof/urazuke/main/gates/schema.json';
  assert.deepEqual(codigos(verificarIndice(malo, disco)), ['E_INDICE_REGISTRO_CRUDO']);
});

test('ROJO: la direccion de bajada no vive en el host que devuelve el crudo', () => {
  const malo = clonar(indiceEnDisco);
  malo.resources[0].version_ledger.fetch_url =
    'https://github.com/pkuschnirof/urazuke/blob/main/gates/catalog.json';
  assert.deepEqual(codigos(verificarIndice(malo, disco)), ['E_INDICE_REGISTRO_CRUDO']);
});

/* ------------------------------------------------------------------ *
 * La clasificacion contra produccion: las tres situaciones, sin red
 * ------------------------------------------------------------------ */

const vivas = Object.fromEntries(indiceEnDisco.resources.map((r) => [r.name, r.content_hash.value]));
const cuerpoVivo = JSON.stringify(indiceEnDisco);

test('produccion sirve un indice que cita las huellas vivas: coincide', () => {
  const r = clasificarIndice({ status: 200, cuerpo: cuerpoVivo }, vivas);
  assert.equal(r.estado, 'coincide');
  assert.match(r.detalle, /huellas que declara lo commiteado/);
});

test('produccion sirve un indice anterior: otra_huella, y dice cual', () => {
  const viejo = clonar(indiceEnDisco);
  viejo.resources[0].content_hash.value = '8f9aa195001e2a00ab4dd67acbda6c3ec56b64199935a25120de132c9982905c';
  const r = clasificarIndice({ status: 200, cuerpo: JSON.stringify(viejo) }, vivas);
  assert.equal(r.estado, 'otra_huella');
  assert.match(r.detalle, /8f9aa195001e/);
});

test('produccion sirve un indice que no conoce un recurso: otra_huella', () => {
  const incompleto = clonar(indiceEnDisco);
  incompleto.resources = [incompleto.resources[0]];
  const r = clasificarIndice({ status: 200, cuerpo: JSON.stringify(incompleto) }, vivas);
  assert.equal(r.estado, 'otra_huella');
  assert.match(r.detalle, /no cita la huella de/);
});

test('las cuatro formas de no poder leerlo son ROJO, y dicen que paso', () => {
  const casos = [
    [{ error: 'TypeError / fetch failed / ECONNREFUSED' }, /ECONNREFUSED/],
    [{ status: 404, cuerpo: '<html>Not Found</html>' }, /HTTP 404/],
    [{ status: 200, cuerpo: '<html>una pagina de desafio</html>' }, /no es JSON/],
    [{ status: 200, cuerpo: '{"what":"un indice vacio","resources":[]}' }, /no lista ningun recurso/],
  ];
  for (const [sonda, dice] of casos) {
    const r = clasificarIndice(sonda, vivas);
    assert.equal(r.estado, 'ilegible', JSON.stringify(sonda).slice(0, 60));
    assert.match(r.detalle, dice);
  }
});
