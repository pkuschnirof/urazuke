// La sonda de lo publicado, sobre una produccion de laboratorio y sobre el dato real (D-094,
// PND-123).
//
// Por que estas pruebas no piden la red. La sonda tiene dos mitades: una PURA --recibe lo servido
// y lo del arbol como dato y devuelve hallazgos-- y una que habla con el otro extremo. La bateria
// del repositorio corre con node pelado y SIN RED, asi que aca se ejercita la mitad pura, con una
// produccion inventada que se puede mentir en cualquier direccion; la mitad que pide la red deja
// su recibo cuando se corre contra produccion de verdad, y esta en PND-123.
//
// Lo que si se mira del dato real: que la entrada que el inventario declara como impuesta sea
// consistente consigo misma --el host que declara es el host de la direccion que el lector pide, y
// los bytes que declara son los del bloque transcripto y no un numero escrito--. Eso es la mitad
// que una prueba puede contestar sin red, y es justo la que se vence sola.
//
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  comprobar, descontar, divergencia, resolver, host, inyeccionesDeclaradas, hostsDeclarados,
} from '../build/sonda_publicado.mjs';
import { leerInventario, esAjena } from '../build/terceros.mjs';

/* ------------------------------------------------------------------ *
 * Una produccion de laboratorio, sana: el arbol mas la inyeccion declarada
 * ------------------------------------------------------------------ */

const BLOQUE = "<script>_trfd.push({'tccl.baseHost':'ajeno.example'})</script>"
  + "<script src='https://ajeno.example/traffic.js'></script>";

export const INYECCIONES = [
  { id: 'inyeccion-del-hospedaje', host: 'ajeno.example', snippet: BLOQUE, pages: 'every_published_page' },
];

const ARBOL_A = '<html><body><p>hola</p><script src="vendor/x.js"></script></body></html>';
const ARBOL_B = '<html><body><p>chau</p></body></html>';

/** La produccion sana: cada pagina es su archivo del arbol con el bloque metido tras </body>. */
function sana() {
  const servir = (arbol) => ({
    status: 200,
    texto: arbol.replace('</body>', '</body>' + BLOQUE),
  });
  return {
    inyecciones: INYECCIONES,
    publicados: ['a.html', 'sub/b.html', 'vendor/x.js'],
    paginas: [
      { ruta: 'a.html', arbol: ARBOL_A, servido: servir(ARBOL_A) },
      { ruta: 'sub/b.html', arbol: ARBOL_B, servido: servir(ARBOL_B) },
    ],
    recursos: [
      { ruta: 'vendor/x.js', arbol: { sha256: 'abc123', bytes: 7 }, servido: { status: 200, sha256: 'abc123', bytes: 7 } },
    ],
  };
}

test('una produccion que es el arbol mas la inyeccion declarada no tiene hallazgos', () => {
  assert.deepEqual(comprobar(sana()), []);
});

test('la pagina de un subdirectorio resuelve sus referencias relativas desde su propio directorio', () => {
  // Es el caso que una sonda escrita a la ligera rompe: `vendor/x.js` visto desde `sub/b.html`
  // es `sub/vendor/x.js`, y desde la raiz es `vendor/x.js`. Las ocho traducciones del sitio son
  // subdirectorios, asi que esto es la mayoria de las paginas y no un borde.
  const e = sana();
  e.paginas[1].arbol = ARBOL_B.replace('</body>', '<script src="../vendor/x.js"></script></body>');
  e.paginas[1].servido.texto = e.paginas[1].arbol.replace('</body>', '</body>' + BLOQUE);
  assert.deepEqual(comprobar(e), []);
  assert.equal(resolver('sub/b.html', '../vendor/x.js'), 'vendor/x.js');
  assert.equal(resolver('sub/b.html', 'vendor/x.js'), 'sub/vendor/x.js');
  assert.equal(resolver('a.html', './vendor/x.js'), 'vendor/x.js');
  assert.equal(resolver('sub/b.html', '/vendor/x.js'), 'vendor/x.js');
});

/* ------------------------------------------------------------------ *
 * Las piezas, una por una
 * ------------------------------------------------------------------ */

test('descontar quita todas las apariciones y dice cuantas quito', () => {
  assert.deepEqual(descontar('a-X-b-X-c', '-X-'), { texto: 'abc', veces: 2 });
  assert.deepEqual(descontar('abc', 'X'), { texto: 'abc', veces: 0 });
});

test('divergencia dice en que byte se separan dos textos y muestra las dos ventanas', () => {
  const d = divergencia('hola mundo', 'hola munda');
  assert.equal(d.offset, 9);
  assert.equal(d.a, 'o');
  assert.equal(d.b, 'a');
});

test('host lee el host de una direccion absoluta y de una con dos barras, y no se ahoga con una relativa', () => {
  assert.equal(host('https://img1.wsimg.com/traffic-assets/js/tccl.min.js'), 'img1.wsimg.com');
  assert.equal(host('//cdn.jsdelivr.net/x.mjs'), 'cdn.jsdelivr.net');
  assert.equal(host('vendor/x.js'), null);
});

/* ------------------------------------------------------------------ *
 * El dato real: la entrada impuesta, consistente consigo misma
 * ------------------------------------------------------------------ */

test('el inventario real declara su inyeccion con el host de la direccion que el lector pide', () => {
  const inv = leerInventario();
  const declaradas = inyeccionesDeclaradas(inv);
  assert.ok(declaradas.length > 0, 'el inventario no declara ninguna inyeccion y la sonda no tendria nada que descontar');
  for (const iny of declaradas) {
    const entrada = inv.entries.find((e) => e.id === iny.id);
    assert.equal(host(entrada.url), entrada.host,
      'el host declarado no es el de la direccion que la pagina pide: la sonda dejaria pasar al verdadero');
    assert.ok(esAjena(entrada.url), 'una inyeccion que no viene de un host ajeno no es una inyeccion');
    assert.ok(iny.snippet.includes(entrada.url),
      'el bloque transcripto no nombra la direccion que la entrada declara');
  }
});

test('los bytes que la entrada impuesta declara son los del bloque y no un numero escrito', () => {
  for (const e of leerInventario().entries.filter((x) => x.injection)) {
    assert.equal(e.injection.bytes, e.injection.snippet.length,
      e.id + ': la cifra de bytes se escribio en vez de derivarse del bloque transcripto (D-077, D-090)');
  }
});

test('la entrada impuesta dice que el metodo no la escribio, no la sirve y no puede impedirla, y nombra su salida', () => {
  for (const e of leerInventario().entries.filter((x) => x.provenance === 'imposed_by_the_hosting')) {
    assert.equal(e.control.written_by_the_method, false);
    assert.equal(e.control.served_by_the_method, false);
    assert.equal(typeof e.control.removable_by_the_method, 'boolean');
    if (e.control.removable_by_the_method === false) {
      assert.ok(e.decision.exit?.chosen, e.id + ': sin salida elegida, declarar es aceptar para siempre');
      assert.ok(e.decision.exit?.criterion, e.id + ': la salida no dice como se verifica que sirvio');
    }
    // Y la que importa para el lector del inventario: la nota tiene que decir el hecho
    // incomodo, no solo llenar el campo.
    assert.match(e.control.note, /no (lo )?(controla|puede)|NO PUEDE/i);
  }
});

test('hostsDeclarados junta los hosts de todas las entradas, cualquiera sea su procedencia', () => {
  const hosts = hostsDeclarados(leerInventario());
  assert.ok(hosts.includes('img1.wsimg.com'));
});
