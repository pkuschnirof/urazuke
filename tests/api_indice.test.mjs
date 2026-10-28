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
import { CARPETA_INMUTABLE, urlInmutable, ALCANCE_DE_LA_HUELLA } from '../build/gates_lib.mjs';
import {
  BASE_CANONICA, BASE_ESPEJO, RECURSOS, NOMBRE,
  armarIndice, leerDisco, verificarIndice, versionesDelRegistro,
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

// Y lo dicen tambien los DOS RECURSOS, que es la mitad que faltaba (PND-009). La frase
// vivia solo en el indice, y el indice no lleva huella propia por decision escrita
// (D-056): o sea que viajaba sin proteccion, y una declaracion de seguridad en un campo
// sin proteger es una que un atacante puede editar para que diga lo contrario. Solo se
// pudo mover a los recursos cuando `what` quedo CUBIERTO por la huella (PND-010, en
// 2026.10.6 y 2026.10.4). La trampa estaba anticipada en el propio pendiente desde el
// 2026-10-24: "si esa frase vive en what, y what esta fuera de la huella, es una
// declaracion de seguridad que un atacante puede editar".
test('la frase del alcance de la huella es UNA SOLA COPIA, y viaja en los tres (PND-009)', () => {
  const gates = JSON.parse(readFileSync(join(raiz, 'docs', 'html', 'api', 'gates.json'), 'utf8'));
  const prompts = JSON.parse(readFileSync(join(raiz, 'docs', 'html', 'api', 'prompts.json'), 'utf8'));
  for (const [nombre, payload] of [['gates.json', gates], ['prompts.json', prompts], ['index.json', indiceEnDisco]]) {
    assert.ok(payload.what.includes(ALCANCE_DE_LA_HUELLA), nombre + ' lleva la frase, literal y no parafraseada');
  }
  // Una sola copia quiere decir que es la MISMA cadena: si alguien la reescribe en un
  // archivo, esto cae en vez de dejar tres versiones de la misma promesa.
  assert.equal(new Set([gates, prompts, indiceEnDisco].map((p) => {
    const i = p.what.indexOf(ALCANCE_DE_LA_HUELLA);
    return p.what.slice(i);
  })).size, 1, 'la misma frase, byte a byte, en los tres');
  // Y en los dos recursos esta adentro de lo que la huella cubre, que era la condicion.
  for (const [nombre, payload] of [['gates.json', gates], ['prompts.json', prompts]]) {
    assert.ok(payload.content_hash.covers.includes('what'), nombre + ': `what` esta cubierto por la huella');
  }
  // El indice no: no tiene huella propia, y eso es la decision, no un olvido.
  assert.equal('content_hash' in indiceEnDisco, false);
});

// La direccion versionada e inmutable (PND-008). La viva sirve siempre lo vigente, asi que
// quien la apunta se actualiza en silencio; sin una direccion por version, un proyecto que
// fijo una version no tiene de donde volver a leerla, que es la mitad que le faltaba al
// contrato de fijacion de D-068.
test('declara la direccion inmutable de cada recurso, su version vigente y la lista entera (PND-008)', () => {
  for (const r of indiceEnDisco.resources) {
    assert.equal(r.immutable.base, BASE_CANONICA + CARPETA_INMUTABLE[r.name] + '/');
    assert.equal(r.immutable.current, urlInmutable(r.name, r.version));
    assert.ok(r.immutable.current.startsWith(r.immutable.base), 'la vigente vive bajo su base');
    assert.ok(r.immutable.versions.includes(r.version), 'la vigente esta en la lista');
    assert.deepEqual(r.immutable.versions, versionesDelRegistro(RECURSOS.find((d) => d.name === r.name)),
      'la lista es la del registro append-only, extraida y no transcrita');
    // Y lo que la direccion promete, dicho en el archivo y no en la cabeza del autor.
    assert.match(r.immutable.note, /never removed/i);
    assert.match(r.immutable.note, /not the bytes/i);
  }
});

test('ROJO: el indice se queda sin la direccion inmutable de un recurso', () => {
  const malo = clonar(indiceEnDisco);
  delete malo.resources[0].immutable;
  assert.deepEqual(codigos(verificarIndice(malo, disco)), ['E_INDICE_INMUTABLE']);
});

test('ROJO: la direccion inmutable vigente quedo en la version anterior', () => {
  const malo = clonar(indiceEnDisco);
  malo.resources[0].immutable.current = urlInmutable(malo.resources[0].name, '2026.10.1');
  const errores = verificarIndice(malo, disco);
  assert.deepEqual(codigos(errores), ['E_INDICE_INMUTABLE']);
  assert.match(errores[0].que, /2026\.10\.1/, 'y dice cual quedo citada');
});

test('ROJO: la lista de versiones con direccion no es la del registro', () => {
  const malo = clonar(indiceEnDisco);
  malo.resources[0].immutable.versions = malo.resources[0].immutable.versions.slice(1);
  assert.deepEqual(codigos(verificarIndice(malo, disco)), ['E_INDICE_INMUTABLE']);
});

test('ROJO: el indice lista un recurso que RECURSOS no declara', () => {
  const malo = clonar(indiceEnDisco);
  const extra = clonar(malo.resources[0]);
  extra.name = 'otra_cosa.json';
  malo.resources.push(extra);
  // Si no esta en disco, lo que se dice es eso y se corta ahi: no hace falta mas.
  assert.deepEqual(codigos(verificarIndice(malo, disco)), ['E_INDICE_FALTA_RECURSO']);

  // Y el caso que SI llega al chequeo de la declaracion: el archivo esta publicado, el
  // indice lo lista, y RECURSOS no lo declara, asi que nadie sabe de que registro de
  // versiones sale su lista. Va aparte porque una rama de error que no se puede alcanzar
  // es una guarda dormida, y este repositorio ya pago cinco.
  const conExtra = { ...disco, 'otra_cosa.json': disco[malo.resources[0].name] };
  // Y tambien E_INDICE_URL, porque la copia del recurso se quedo con la direccion del otro:
  // los dos codigos, cada uno diciendo lo suyo, que es lo contrario de un error generico.
  assert.deepEqual(codigos(verificarIndice(malo, conExtra)), ['E_INDICE_NO_DECLARADO', 'E_INDICE_URL']);
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

// Y el caso que el arreglo del byte NUL destapo: si falta el `path`, la comparacion
// tiene que fallar y no volverse vacua. Con `?? ''` -- que era la intencion escrita --
// `endsWith('')` es SIEMPRE verdadero, asi que un recurso sin path pasaba en verde; el
// literal commiteado tenia un byte NUL en vez de la cadena vacia, que hacia caer el
// chequeo por accidente y no por diseno. Ahora la condicion dice lo que quiere decir.
test('ROJO: el registro de versiones sin el path con el que se comprueba la direccion', () => {
  const malo = clonar(indiceEnDisco);
  delete malo.resources[0].version_ledger.path;
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
