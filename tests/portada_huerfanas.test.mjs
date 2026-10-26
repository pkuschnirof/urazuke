// El aviso de huerfanas: lo que el metodo publica contra lo que la portada enlaza.
//
// Por que estas pruebas existen (PND-025, deriva de PND-015). El disparador de
// publicacion no toca la portada, asi que un documento nuevo queda servido por su URL y
// sin un solo enlace que lleve a el. El 2026-10-24 eran diez de setenta y seis, y el mapa
// del sitio no llevaba ninguno. El chequeo que lo avisa es build/portal_orphans.mjs.
//
// Lo que estas pruebas cuidan es, sobre todo, que el chequeo NO mienta en verde. Dos
// formas de mentir, las dos medidas en este repositorio en otros programas:
//
//   1. decir "cero huerfanos" cuando no se pudo mirar -- el arbol del portal no esta, no
//      hay portada, no hay mapa, no hay nada generado. Es el defecto de D-057: un verde
//      de un paso que no hizo nada no es un verde. Por eso esos cuatro casos son ROJO y
//      tienen una prueba cada uno.
//   2. leer una sola de las dos formas de enlace que el portal produce. La portada
//      castellana enlaza relativo ("docs/X.html") y las nueve subpaginas de idioma
//      reescriben a absoluto ("/urazuke/docs/X.html"). Leer una sola dejaria nueve
//      portadas sin mirar y acusaria de huerfanos a documentos que si estan enlazados.
//
// La ultima prueba corre el programa como lo corre la cadena -- proceso aparte, salida
// medida, codigo de salida -- porque es la unica forma de exigir la linea que el paso del
// workflow busca.
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { raiz } from '../build/gates_lib.mjs';
import {
  portadasDelPortal, enlacesADocumentos, urlsDelMapa, documentosGenerados,
  clasificar, codigoDeSalida, revisar, ARBOL, MAPA,
} from '../build/portal_orphans.mjs';

/* ------------------------------------------------------------------ *
 * Las dos formas de enlace que el portal produce
 * ------------------------------------------------------------------ */

test('la portada castellana enlaza relativo y se resuelve', () => {
  const html = '<a href="docs/ESCALERA_METODOLOGICA.html">leer</a><a href="docs/practica/MANUAL.html">x</a>';
  assert.deepEqual([...enlacesADocumentos(html, 'index.html')].sort(),
    ['ESCALERA_METODOLOGICA.html', 'practica/MANUAL.html']);
});

test('una subpagina de idioma enlaza absoluto y se resuelve igual', () => {
  const html = '<a href="/urazuke/docs/en/ESCALERA_METODOLOGICA.html">read</a>';
  assert.deepEqual([...enlacesADocumentos(html, 'en/index.html')], ['en/ESCALERA_METODOLOGICA.html']);
});

test('un enlace relativo en una subpagina NO se lee como del idioma de al lado', () => {
  // Si alguien volviera a enlazar relativo desde /urazuke/en/, el enlace resolveria a
  // /urazuke/en/docs/... y no apunta a un documento publicado: no cuenta como enlazado,
  // que es justo lo que hay que avisar.
  assert.deepEqual([...enlacesADocumentos('<a href="docs/X.html">x</a>', 'en/index.html')], []);
});

test('el ancla y la consulta no hacen de un enlace otro documento', () => {
  const html = '<a href="docs/ESCALERA_METODOLOGICA.html#parte-f">f</a><a href="docs/REFERENCIAS.html?x=1">r</a>';
  assert.deepEqual([...enlacesADocumentos(html, 'index.html')].sort(),
    ['ESCALERA_METODOLOGICA.html', 'REFERENCIAS.html']);
});

test('lo que no es del sitio no cuenta como enlace a un documento', () => {
  const html = '<a href="https://otro.sitio/urazuke/docs/X.html">x</a>'
    + '<a href="//otro.sitio/urazuke/docs/Y.html">y</a>'
    + '<a href="mailto:alguien@example.com">m</a>'
    + '<a href="#que-es">q</a><a href="api/gates.json">a</a>';
  assert.deepEqual([...enlacesADocumentos(html, 'index.html')], []);
});

test('el enlace entre comillas simples se lee igual', () => {
  assert.deepEqual([...enlacesADocumentos("<a href='docs/X.html'>x</a>", 'index.html')], ['X.html']);
});

/* ------------------------------------------------------------------ *
 * El mapa del sitio
 * ------------------------------------------------------------------ */

test('del mapa del sitio salen los documentos y nada mas', () => {
  const xml = '<urlset>'
    + '<url><loc>https://yujin.app/urazuke/</loc></url>'
    + '<url><loc>https://yujin.app/urazuke/api/gates.json</loc></url>'
    + '<url><loc>https://yujin.app/urazuke/docs/ESCALERA_METODOLOGICA.html</loc></url>'
    + '<url><loc> https://yujin.app/urazuke/docs/en/REFERENCIAS.html </loc></url>'
    + '</urlset>';
  assert.deepEqual([...urlsDelMapa(xml)].sort(), ['ESCALERA_METODOLOGICA.html', 'en/REFERENCIAS.html']);
});

/* ------------------------------------------------------------------ *
 * Las tres situaciones de un documento, separadas
 * ------------------------------------------------------------------ */

const conjunto = (...xs) => new Set(xs);

test('enlazado y en el mapa es verde', () => {
  const filas = clasificar(['A.html'], conjunto('A.html'), conjunto('A.html'));
  assert.equal(filas[0].estado, 'enlazado');
  assert.equal(codigoDeSalida(filas), 0);
});

test('publicado y sin enlace es aviso, y lo nombra', () => {
  const filas = clasificar(['A.html', 'B.html'], conjunto('A.html'), conjunto('A.html', 'B.html'));
  assert.equal(filas[1].estado, 'sin_enlace');
  assert.match(filas[1].detalle, /el mapa del sitio si lo lleva/);
  assert.equal(codigoDeSalida(filas), 2);
});

test('enlazado pero fuera del mapa es su propia situacion, no un huerfano', () => {
  const filas = clasificar(['A.html'], conjunto('A.html'), conjunto());
  assert.equal(filas[0].estado, 'fuera_del_mapa');
  assert.equal(codigoDeSalida(filas), 2);
});

test('sin enlace y sin mapa dice las dos cosas', () => {
  const filas = clasificar(['A.html'], conjunto(), conjunto());
  assert.equal(filas[0].estado, 'sin_enlace');
  assert.match(filas[0].detalle, /el mapa del sitio tampoco lo lleva/);
});

test('no se pudo mirar gana sobre cualquier veredicto de documento', () => {
  const filas = clasificar(['A.html'], conjunto('A.html'), conjunto('A.html'));
  assert.equal(codigoDeSalida(filas, 'el portal no esta'), 1);
});

/* ------------------------------------------------------------------ *
 * Los arboles de mentira, y los cuatro rojos deliberados
 * ------------------------------------------------------------------ */

const PORTADA = (prefijo, docs) => '<!doctype html><html><body>'
  + docs.map((d) => '<a href="' + prefijo + d + '">' + d + '</a>').join('') + '</body></html>';

const MAPA_XML = (docs) => '<?xml version="1.0"?><urlset>'
  + '<url><loc>https://yujin.app/urazuke/</loc></url>'
  + docs.map((d) => '<url><loc>https://yujin.app/urazuke/docs/' + d + '</loc></url>').join('')
  + '</urlset>';

/**
 * Arma un portal y un arbol de generados de mentira. opciones:
 *   generados      los documentos que el metodo publica
 *   enlazados      los que la portada castellana enlaza (por omision, todos)
 *   enMapa         los que el mapa del sitio lleva (por omision, todos)
 *   sinPortada     no escribe la portada principal
 *   sinMapa        no escribe el mapa del sitio
 *   idiomas        subpaginas de idioma, que enlazan absoluto
 */
function armar(opciones = {}) {
  const base = mkdtempSync(join(tmpdir(), 'uz-huerfanas-'));
  const generados = opciones.generados ?? ['A.html', 'en/A.html'];
  const enlazados = opciones.enlazados ?? generados;
  const enMapa = opciones.enMapa ?? generados;
  const portal = join(base, 'portal');
  const uz = join(portal, ...ARBOL);
  mkdirSync(uz, { recursive: true });
  if (!opciones.sinPortada) writeFileSync(join(uz, 'index.html'), PORTADA('docs/', enlazados));
  for (const l of opciones.idiomas ?? []) {
    mkdirSync(join(uz, l), { recursive: true });
    writeFileSync(join(uz, l, 'index.html'), PORTADA('/urazuke/docs/', enlazados));
  }
  // Los dos directorios que el metodo llena existen y NO son portadas, ni con index.html.
  for (const d of ['docs', 'api']) {
    mkdirSync(join(uz, d), { recursive: true });
    writeFileSync(join(uz, d, 'index.html'), '<html></html>');
  }
  if (!opciones.sinMapa) writeFileSync(join(portal, ...MAPA), MAPA_XML(enMapa));
  const html = join(base, 'html');
  mkdirSync(html, { recursive: true });
  for (const d of generados) {
    const partes = d.split('/');
    if (partes.length > 1) mkdirSync(join(html, ...partes.slice(0, -1)), { recursive: true });
    writeFileSync(join(html, ...partes), '<html></html>');
  }
  return { base, portal, html, limpiar: () => rmSync(base, { recursive: true, force: true }) };
}

test('las portadas se descubren del disco, y docs/ y api/ no son portadas', () => {
  const t = armar({ idiomas: ['en', 'ja'] });
  try {
    assert.deepEqual(portadasDelPortal(join(t.portal, ...ARBOL)),
      ['index.html', 'en/index.html', 'ja/index.html']);
  } finally { t.limpiar(); }
});

test('lo generado se descubre recursivo y solo los .html', () => {
  const t = armar({ generados: ['A.html', 'en/A.html', 'practica/B.html'] });
  try {
    writeFileSync(join(t.html, 'gates.json'), '{}');
    assert.deepEqual(documentosGenerados(t.html), ['A.html', 'en/A.html', 'practica/B.html']);
  } finally { t.limpiar(); }
});

test('con todo enlazado y en el mapa, el veredicto es verde', () => {
  const t = armar({ idiomas: ['en'] });
  try {
    const r = revisar({ portal: t.portal, generados: t.html });
    assert.equal(r.ilegible, undefined);
    assert.equal(codigoDeSalida(r.filas), 0);
  } finally { t.limpiar(); }
});

test('ROJO deliberado: un documento que ninguna portada enlaza sale nombrado', () => {
  const t = armar({ generados: ['A.html', 'NUEVO.html'], enlazados: ['A.html'] });
  try {
    const r = revisar({ portal: t.portal, generados: t.html });
    const huerfanos = r.filas.filter((f) => f.estado === 'sin_enlace').map((f) => f.documento);
    assert.deepEqual(huerfanos, ['NUEVO.html']);
    assert.equal(codigoDeSalida(r.filas), 2);
  } finally { t.limpiar(); }
});

test('ROJO deliberado: sin el arbol del portal no se dice cero huerfanos', () => {
  const t = armar();
  try {
    const r = revisar({ portal: join(t.base, 'no-existe'), generados: t.html });
    assert.match(r.ilegible, /el arbol del metodo no esta en el portal/);
    assert.equal(r.filas, undefined);
    assert.equal(codigoDeSalida(r.filas ?? [], r.ilegible), 1);
  } finally { t.limpiar(); }
});

test('ROJO deliberado: sin portada principal no se dice cero huerfanos', () => {
  const t = armar({ sinPortada: true, idiomas: ['en'] });
  try {
    const r = revisar({ portal: t.portal, generados: t.html });
    assert.match(r.ilegible, /no tiene la portada principal/);
  } finally { t.limpiar(); }
});

test('ROJO deliberado: sin mapa del sitio no se dice cero huerfanos', () => {
  const t = armar({ sinMapa: true });
  try {
    const r = revisar({ portal: t.portal, generados: t.html });
    assert.match(r.ilegible, /no tiene mapa del sitio/);
  } finally { t.limpiar(); }
});

test('ROJO deliberado: sin un solo documento generado no se dice cero huerfanos', () => {
  const t = armar({ generados: [] });
  try {
    const r = revisar({ portal: t.portal, generados: t.html });
    assert.match(r.ilegible, /no hay ningun documento generado/);
    assert.match(r.ilegible, /no es cero huerfanos/);
  } finally { t.limpiar(); }
});

/* ------------------------------------------------------------------ *
 * El programa como lo corre la cadena: salida medida y codigo de salida
 * ------------------------------------------------------------------ */

function correr(portal, generados) {
  try {
    const salida = execFileSync(process.execPath,
      [join(raiz, 'build', 'portal_orphans.mjs'), '--portal', portal, '--generados', generados],
      { encoding: 'utf8' });
    return { codigo: 0, salida };
  } catch (e) {
    return { codigo: e.status, salida: String(e.stdout ?? '') + String(e.stderr ?? '') };
  }
}

test('el programa imprime su linea de comprobado y sale 0 cuando todo esta enlazado', () => {
  const t = armar({ idiomas: ['en'] });
  try {
    const { codigo, salida } = correr(t.portal, t.html);
    assert.equal(codigo, 0);
    assert.match(salida, /^huerfanas: comprobado -- 2 documentos, 0 huerfanos, 0 fuera del mapa$/m);
  } finally { t.limpiar(); }
});

test('el programa avisa con 2 y nombra al huerfano', () => {
  const t = armar({ generados: ['A.html', 'NUEVO.html'], enlazados: ['A.html'] });
  try {
    const { codigo, salida } = correr(t.portal, t.html);
    assert.equal(codigo, 2);
    assert.match(salida, /NUEVO\.html: sin_enlace/);
    assert.match(salida, /^huerfanas: comprobado -- 2 documentos, 1 huerfanos, 0 fuera del mapa$/m);
  } finally { t.limpiar(); }
});

test('el programa que no pudo mirar sale 1 y NO imprime la linea de comprobado', () => {
  const t = armar({ sinMapa: true });
  try {
    const { codigo, salida } = correr(t.portal, t.html);
    assert.equal(codigo, 1);
    assert.doesNotMatch(salida, /^huerfanas: comprobado/m);
    assert.match(salida, /^huerfanas: NO se pudo comprobar -- /m);
  } finally { t.limpiar(); }
});
