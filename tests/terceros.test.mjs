// El inventario del codigo de terceros que este sistema ejecuta, contra el arbol real y contra
// cinco arboles rotos a mano (D-093, PND-120).
//
// Por que existe. La guarda `build/terceros.mjs` es la que hace cumplir la decision del dueno:
// el tercero se sirve desde el propio sitio, con la version clavada, su huella recalculada y su
// decision al lado; y servirlo desde el propio sitio NO lo saca del inventario. Una guarda que
// nadie vio caer no demuestra que guarde nada, y en este proyecto ya paso cinco veces, asi que
// cada una de sus cinco comprobaciones tiene su rojo deliberado: se rompe el arbol por esa cara
// y se exige que el hallazgo salga, y que sea UNO.
//
// El rojo que de verdad importa no esta aca sino en la historia: el 2026-11-08, antes del
// arreglo, esta misma guarda corrida sobre el arbol publicado dio NUEVE hallazgos --la copia sin
// publicar y las ocho paginas del documento principal pidiendo mermaid a un host ajeno-- con
// codigo de salida 1. Ese recibo esta en PND-120.
//
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { raiz } from '../build/gates_lib.mjs';
import { comprobar, leerArbol, referenciasQueEjecuta, esAjena, cuentas, ESTADOS } from '../build/terceros.mjs';
import { generar, DESTINO } from '../build/terceros_doc.mjs';

const clonar = (o) => JSON.parse(JSON.stringify(o));

/* ------------------------------------------------------------------ *
 * El arbol real
 * ------------------------------------------------------------------ */

test('el arbol real no tiene hallazgos: el tercero esta congelado, publicado, licenciado y decidido', () => {
  assert.deepEqual(comprobar(leerArbol()), []);
});

test('ninguna pagina publicada ejecuta algo de un host ajeno', () => {
  const { pages } = leerArbol();
  const ajenas = [];
  for (const p of pages) for (const r of p.refs) if (esAjena(r.url)) ajenas.push(p.ruta + ' -> ' + r.url);
  assert.deepEqual(ajenas, [], 'lo publicado volvio a depender de un host que el metodo no controla');
  assert.ok(pages.length > 50, 'se revisaron ' + pages.length + ' paginas: eso no es el sitio entero');
});

test('el documento del inventario coincide con el dato del que se genera', () => {
  const inv = JSON.parse(readFileSync(join(raiz, 'vendor', 'terceros.json'), 'utf8'));
  const actual = readFileSync(join(raiz, DESTINO), 'utf8').replace(/\r\n/g, '\n');
  assert.strictEqual(actual, generar(inv), DESTINO + ' se genera: corre node build/terceros_doc.mjs');
});

test('TODAS las cifras de la cabecera del documento son las cuentas que el dato da, y no un numero escrito', () => {
  const inv = JSON.parse(readFileSync(join(raiz, 'vendor', 'terceros.json'), 'utf8'));
  const c = cuentas(inv.entries);
  const texto = readFileSync(join(raiz, DESTINO), 'utf8');
  // Todas y no una muestra: se recorre el objeto de cuentas, asi que una cuenta NUEVA queda
  // vigilada el dia que entra y no el dia que alguien se acuerda de agregarla aca. Es la leccion
  // de D-071, y esta prueba se reescribio el dia que la cabecera paso de dos cifras a cuatro,
  // que es exactamente el dia en que la version anterior habria seguido dando verde mirando la
  // mitad.
  for (const [clave, valor] of Object.entries(c)) {
    assert.match(texto, new RegExp(clave + ': ' + valor + '\\b'),
      'la cabecera no publica ' + clave + ' con la cuenta que el dato da (' + valor + ')');
  }
  assert.ok(Object.keys(c).length >= 4, 'se esperaban al menos las cuatro cuentas del inventario');
  // Y la que importa: la segunda alcanza a la primera. Un inventario cuyas entradas nadie
  // resolvio es la medicion que nadie contrasto (CQ-22.4).
  assert.strictEqual(c.entries_with_a_decision, c.entries_total);
});

/* ------------------------------------------------------------------ *
 * El lector de lo que una pagina ejecuta
 * ------------------------------------------------------------------ */

test('lee el src de un script y el import de un modulo en linea, y no se lleva el resto del html', () => {
  const html = '<p>src="no.js"</p><script src="vendor/x.js"></script>'
    + '<script type="module">import m from \'https://ajeno/x.mjs\';</script>'
    + '<script>document.body;</script><link rel="stylesheet" href="https://ajeno/x.css">';
  assert.deepEqual(referenciasQueEjecuta(html), [
    { kind: 'script-src', url: 'vendor/x.js' },
    { kind: 'module-import', url: 'https://ajeno/x.mjs' },
  ]);
});

test('una direccion con esquema o con dos barras es ajena; una relativa no', () => {
  assert.equal(esAjena('https://cdn.jsdelivr.net/npm/mermaid@11/x.mjs'), true);
  assert.equal(esAjena('//cdn.jsdelivr.net/x.mjs'), true);
  assert.equal(esAjena('vendor/mermaid.min.js'), false);
  assert.equal(esAjena('../vendor/mermaid.min.js'), false);
});

/* ------------------------------------------------------------------ *
 * Los rojos deliberados: un arbol roto a mano, uno por comprobacion
 * ------------------------------------------------------------------ */

function roto(cambiar) {
  const a = leerArbol();
  const copia = { entries: clonar(a.entries), files: clonar(a.files), pages: clonar(a.pages) };
  cambiar(copia);
  return comprobar(copia);
}

test('ROJO [A]: la copia congelada dejo de ser la que el inventario audito, y arrastra a [B]', () => {
  const h = roto((a) => { a.files[a.entries[0].file].sha256 = 'f'.repeat(64); });
  // Son DOS y eso es correcto, no un defecto de la guarda: si el congelado cambio, tambien dejo
  // de coincidir con lo publicado. Se exige asi, con los dos, en vez de aflojar la cuenta a "al
  // menos uno": un rojo que acepta cualquier cantidad de hallazgos deja de medir cual cayo.
  assert.equal(h.length, 2, h.join(' | '));
  assert.match(h[0], /^\[A\] mermaid: .* la copia congelada no es la que el inventario audito$/);
  assert.match(h[1], /^\[B\] mermaid: lo publicado en .* no es byte a byte lo congelado/);
});

test('ROJO [B]: lo publicado no es byte a byte lo congelado', () => {
  const h = roto((a) => { a.files[a.entries[0].published_as].sha256 = '0'.repeat(64); });
  assert.equal(h.length, 1, h.join(' | '));
  assert.match(h[0], /^\[B\] mermaid: lo publicado en .* no es byte a byte lo congelado/);
});

test('ROJO [C]: el texto de la licencia del tercero no viaja en el arbol', () => {
  const h = roto((a) => { delete a.files[a.entries[0].license_file]; });
  assert.equal(h.length, 1, h.join(' | '));
  assert.match(h[0], /^\[C\] mermaid: declara la licencia MIT y su texto no viaja en el arbol/);
});

test('ROJO [D]: una entrada del inventario que nadie resolvio', () => {
  const h = roto((a) => { a.entries[0].decision.state = 'pending'; });
  assert.equal(h.length, 1, h.join(' | '));
  assert.match(h[0], /^\[D\] mermaid: su decision no esta resuelta/);
  assert.ok(!ESTADOS.includes('pending'));
});

test('ROJO [E]: una pagina publicada vuelve a pedir el tercero a un host ajeno', () => {
  const h = roto((a) => {
    a.pages[0].refs.push({ kind: 'module-import', url: 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs' });
  });
  assert.equal(h.length, 1, h.join(' | '));
  assert.match(h[0], /^\[E\] .* ejecuta codigo de un host ajeno/);
});

test('ROJO [E]: una copia en vendor que el inventario no declara', () => {
  const h = roto((a) => { a.pages[0].refs.push({ kind: 'script-src', url: '../vendor/mermaid-otra-version.min.js' }); });
  assert.equal(h.length, 1, h.join(' | '));
  assert.match(h[0], /el inventario no declara ese archivo publicado$/);
});

/* ------------------------------------------------------------------ *
 * [F] La procedencia, y lo que una entrada IMPUESTA tiene que declarar (D-094, PND-123)
 * ------------------------------------------------------------------ */

/** La entrada impuesta del arbol real, para romperle una cosa por vez. */
const impuesta = (a) => a.entries.find((e) => e.provenance === 'imposed_by_the_hosting');

test('el arbol real declara las dos clases, y las cuentas de la cabecera las derivan', () => {
  const { entries } = leerArbol();
  const c = cuentas(entries);
  assert.equal(c.entries_chosen_by_the_method + c.entries_imposed_by_the_hosting, c.entries_total,
    'una entrada quedo sin clasificar: la suma de las dos clases tiene que dar el total');
  assert.ok(c.entries_imposed_by_the_hosting > 0,
    'el inventario no declara ningun tercero impuesto, y el sitio publicado tiene uno medido (PND-123)');
});

test('ROJO [F]: una entrada sin procedencia declarada', () => {
  const h = roto((a) => { delete a.entries[0].provenance; });
  assert.equal(h.length, 1, h.join(' | '));
  assert.match(h[0], /^\[F\] mermaid: no declara su procedencia/);
});

test('ROJO [F]: la entrada impuesta sin el bloque transcripto -- sin bloque no hay con que contrastar', () => {
  const h = roto((a) => { delete impuesta(a).injection.snippet; });
  assert.equal(h.length, 1, h.join(' | '));
  assert.match(h[0], /^\[F\] hosting-traffic-script: no transcribe el bloque que el servidor agrega/);
});

test('ROJO [F]: los bytes declarados no son los del bloque -- la cifra escrita en vez de derivada', () => {
  const h = roto((a) => { impuesta(a).injection.bytes = 999; });
  assert.equal(h.length, 1, h.join(' | '));
  assert.match(h[0], /^\[F\] hosting-traffic-script: declara 999 bytes inyectados y el bloque transcripto tiene \d+/);
});

test('ROJO [F]: la entrada impuesta que dice que el metodo la escribio o la sirve', () => {
  const h = roto((a) => { impuesta(a).control.served_by_the_method = true; });
  assert.equal(h.length, 1, h.join(' | '));
  assert.match(h[0], /^\[F\] hosting-traffic-script: un tercero impuesto no lo escribe ni lo sirve el metodo/);
});

test('ROJO [F]: el metodo no puede impedirlo y la decision no nombra ninguna salida', () => {
  // Es el rojo que vale mas de los seis, porque es el que distingue DECLARAR de ACEPTAR PARA
  // SIEMPRE. Una entrada que dice "no lo controlamos" y no nombra como se sale es la aceptacion
  // permanente de un privilegio que nadie decidio, con el campo lleno.
  const h = roto((a) => { delete impuesta(a).decision.exit; });
  assert.equal(h.length, 1, h.join(' | '));
  assert.match(h[0], /^\[F\] hosting-traffic-script: el metodo no puede impedirlo y la decision no nombra una salida elegida/);
});

test('ROJO [F]: la medicion de la entrada impuesta sin fecha, sin fuente o sin recibos', () => {
  const h = roto((a) => { delete impuesta(a).measured.receipts; });
  assert.equal(h.length, 1, h.join(' | '));
  assert.match(h[0], /^\[F\] hosting-traffic-script: su medicion no dice cuando, con que y con que recibos/);
});

test('[D] vale para las dos clases: una entrada impuesta sin decidir tambien cae', () => {
  const h = roto((a) => { impuesta(a).decision.state = 'pending'; });
  assert.equal(h.length, 1, h.join(' | '));
  assert.match(h[0], /^\[D\] hosting-traffic-script: su decision no esta resuelta/);
});
