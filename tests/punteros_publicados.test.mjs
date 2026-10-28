// Un puntero que el dato publica tiene que resolver, y una direccion que publica tiene que
// poder bajarla una maquina (D-069, PND-056).
//
// El contexto completo esta en build/punteros_publicados.mjs. En una linea: el contrato de
// fijacion recien publicado mandaba contrastar contra `version_scheme.version_ledger`, que
// no es una clave del publicado, y el indice declaraba del registro de versiones la pagina
// que un alojamiento sirve como HTML y no la que devuelve el JSON, asi que el unico
// consumidor que implemento la obligacion tuvo que adivinar la direccion que baja.
//
// A diferencia de la guarda de las rutas (tests/artefacto_nombrado.test.mjs), esta SI
// habria atrapado el defecto que la origino: medida contra el arbol publicado de 0af2a00
// devuelve 5 hallazgos y nombra los dos. Queda dicho porque es lo que la hace falsable.
//
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  SUFIJOS_NO_CLAVE,
  PUNTEROS_CRUZADOS,
  leerPublicados,
  punterosQueNoResuelven,
  registrosSinUsar,
  simetriaDelRegistroDeVersiones,
  cuenta,
  cuentaDeEnums,
  enumsDeLaConfiguracion,
  resuelve,
} from '../build/punteros_publicados.mjs';
import { cargarFuentes, enumsNombradosPorLaConfiguracion } from '../build/gates_lib.mjs';
import { RECURSOS } from '../build/index_api.mjs';

const pub = leerPublicados();

test('A: cada camino de clave que un texto publicado nombra resuelve', () => {
  const h = punterosQueNoResuelven(pub);
  assert.deepEqual(h, [], 'punteros colgantes:\n' + h.map((x) => '  ' + JSON.stringify(x)).join('\n'));
});

test('B: los dos registros de salteo no tienen entradas que sobren', () => {
  const h = registrosSinUsar(pub);
  assert.deepEqual(h, [], 'registros sin usar:\n' + h.map((x) => '  ' + JSON.stringify(x)).join('\n'));
});

test('B bis: cada entrada de los dos registros declara su razon', () => {
  for (const s of SUFIJOS_NO_CLAVE) {
    assert.ok(s.razon && s.razon.length > 20, 'el sufijo ' + s.sufijo + ' se saltea sin razon escrita');
  }
  for (const c of PUNTEROS_CRUZADOS) {
    assert.ok(c.razon && c.razon.length > 20, 'el puntero cruzado ' + c.camino + ' no declara su razon');
    assert.ok(c.desde && c.resuelve_en, 'un puntero cruzado sin origen o sin destino no se puede verificar');
  }
});

test('C: el registro de versiones se puede bajar, y el contrato nombra de donde se saca', () => {
  const h = simetriaDelRegistroDeVersiones(pub);
  assert.deepEqual(h, [], 'simetria del registro de versiones:\n' + h.map((x) => '  ' + JSON.stringify(x)).join('\n'));
});

test('C bis: fetch_url apunta al mismo path que el registro declara, por recurso', () => {
  const recursos = pub.indice?.resources ?? [];
  assert.ok(recursos.length >= 2, 'el indice tiene que listar los recursos publicados');
  for (const r of recursos) {
    const reg = r.version_ledger ?? {};
    // Presencia primero: sin esto, un indice sin las direcciones cae con un TypeError en vez
    // de nombrar lo que falta, y un rojo que no dice lo suyo obliga a leer el codigo.
    assert.ok(reg.url, r.name + ': el registro de versiones no declara la pagina que lee una persona (url)');
    assert.ok(reg.fetch_url, r.name + ': el registro de versiones no declara la direccion que baja una maquina (fetch_url)');
    assert.ok(reg.url.includes(reg.path), r.name + ': la pagina no nombra el path del registro');
    assert.ok(reg.fetch_url.endsWith(reg.path), r.name + ': la direccion de bajada no termina en el path del registro');
    assert.notEqual(reg.url, reg.fetch_url, r.name + ': las dos direcciones son la misma, asi que una de las dos no es la que dice ser');
  }
});

test('E: un campo que dice "uno de <enum>" lo nombra por un camino que resuelve', () => {
  const h = enumsDeLaConfiguracion(pub);
  assert.deepEqual(h, [], 'enums de la configuracion:\n' + h.map((x) => '  ' + JSON.stringify(x)).join('\n'));
});

test('E bis: el publicado lleva la lista de valores, no solo el nombre del enum', () => {
  const pc = pub.recursos['gates.json'].project_config;
  assert.ok(pc.enums_what, 'el bloque resuelto se explica donde se lee');
  assert.ok(cuentaDeEnums(pub) > 0, 'cero enums resueltos con verde es el defecto que esta prueba existe para evitar');
  // La lista no se transcribe: es la que declaran las fuentes, y el publicado la DERIVA. Si
  // alguien la copiara a mano habria dos copias que pueden divergir; esta asercion mide la
  // igualdad, que es lo unico que atrapa esa divergencia.
  const fuentes = cargarFuentes();
  for (const [nombre, valores] of Object.entries(pc.enums)) {
    assert.deepEqual(valores, fuentes.schema.enums[nombre],
      'el enum ' + nombre + ' publicado no es el que declaran las fuentes');
    assert.ok(Array.isArray(valores) && valores.length > 0, 'el enum ' + nombre + ' se publica vacio');
  }
});

test('E ter: el publicado resuelve exactamente los enums que los campos nombran', () => {
  const fuentes = cargarFuentes();
  const nombrados = enumsNombradosPorLaConfiguracion(fuentes.schema);
  assert.deepEqual(
    Object.keys(pub.recursos['gates.json'].project_config.enums).sort(),
    [...nombrados].sort(),
    'el bloque publicado y los enums que los campos nombran tienen que ser el mismo conjunto',
  );
});

// Cuantos recursos son NO se escribe aca: sale de la lista que el indice declara. Dos
// listas que hay que acordarse de mantener juntas es la forma mas comun del defecto que
// este repositorio persigue, y la prueba sigue siendo falsable: si un recurso declarado
// deja de estar en disco, la cuenta revisada no da la declarada y esto cae.
test('D: la cuenta no es cero, y todos los recursos declarados se revisaron', () => {
  const c = cuenta(pub);
  assert.ok(c.tokens > 0, 'cero punteros revisados con verde es el defecto que esta prueba existe para evitar');
  assert.equal(c.recursos, RECURSOS.length, 'se revisan los ' + RECURSOS.length + ' recursos que el indice declara, ademas del indice');
});

test('el resolvedor de caminos distingue lo que esta de lo que no', () => {
  const g = pub.recursos['gates.json'];
  assert.equal(resuelve(g, 'pinning.consumer_contract.must_contrast'), true);
  assert.equal(resuelve(g, 'version_scheme.version_ledger'), false);
  assert.equal(resuelve(g, 'pinning.no_existe'), false);
});
