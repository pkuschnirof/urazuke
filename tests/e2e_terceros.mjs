// Prueba de punta a punta del tercero que el sitio ejecuta, en un navegador de verdad (D-093).
//
// Por que existe, y por que no alcanza la guarda. `build/terceros.mjs` lee el HTML y comprueba
// que ninguna pagina publicada nombre una direccion ajena. Eso es el TEXTO de la pagina. Lo que
// no puede contestar es la pregunta que de verdad importa: con el archivo servido por este
// mismo sitio, el lector sigue viendo los diagramas, y el navegador no sale a buscar nada a
// ningun host ajeno. Esas dos cosas las contesta el otro lado de verdad y nada mas (CQ-21.1), y
// un diagrama que dejo de dibujarse es justo el defecto que una mudanza de este tipo produce:
// la pagina carga, el texto queda, y donde habia un diagrama hay un bloque de codigo crudo.
//
// Lo que mide, las dos cosas:
//   1. que mermaid DIBUJO: hay un `<svg>` adentro de cada `pre.mermaid`, puesto por el paquete
//      congelado que sirve este sitio;
//   2. que el navegador no pidio NADA a un host ajeno, preguntandole al propio navegador por
//      todos los recursos que bajo (`performance.getEntriesByType('resource')`), que es la lista
//      de lo que de verdad paso por la red y no la de lo que la pagina dice.
//
// Y su rojo deliberado, en la misma corrida: la misma pagina con la etiqueta del paquete
// apuntada a una ruta que no existe. El navegador carga igual, los bloques siguen ahi, y la
// comprobacion 1 cae -- que es exactamente lo que pasaria si la mudanza se hubiera hecho mal.
//
// Uso:  node tests/e2e_terceros.mjs    (sirve docs/html y maneja el navegador)
// NO la descubre `node --test`, a proposito, por lo mismo que la otra: la bateria del
// repositorio corre con node pelado, sin navegador y sin red.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { servir, WS, esperar, cual } from './e2e_lib.mjs';
import { leerInventario } from '../build/terceros.mjs';

const RAIZ = join(import.meta.dirname, '..', 'docs', 'html');
const PAGINA = '/ESCALERA_METODOLOGICA.html';

/** Un arbol servido aparte, para poder mutilar la pagina sin tocar lo publicado. */
function arbolMutilado() {
  const base = join(tmpdir(), 'urazuke-terceros-' + Date.now());
  mkdirSync(base, { recursive: true });
  const entrada = leerInventario().entries.find((e) => e.id === 'mermaid');
  const nombre = entrada.published_as.split('/').pop();
  cpSync(join(RAIZ, 'ESCALERA_METODOLOGICA.html'), join(base, 'ESCALERA_METODOLOGICA.html'));
  const html = readFileSync(join(base, 'ESCALERA_METODOLOGICA.html'), 'utf8')
    .replace('vendor/' + nombre, 'vendor/no-existe-este-archivo.js');
  writeFileSync(join(base, 'ESCALERA_METODOLOGICA.html'), html, 'utf8');
  return base;
}

/** Levanta un navegador de verdad sobre un arbol, navega y devuelve el contexto. */
async function abrir(raizServida, pagina) {
  const { s, puerto } = await servir(raizServida);
  const url = `http://127.0.0.1:${puerto}${pagina}`;
  const bin = await cual();
  const perfil = join(tmpdir(), 'urazuke-terceros-perfil-' + Date.now() + '-' + Math.random().toString(36).slice(2));
  const puertoCDP = 9833 + (Date.now() % 400);
  const edge = spawn(bin, [
    '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--remote-debugging-port=' + puertoCDP, '--user-data-dir=' + perfil, 'about:blank',
  ], { stdio: 'ignore' });

  let destino = null;
  for (let i = 0; i < 40 && !destino; i++) {
    await esperar(500);
    try {
      const lista = await (await fetch(`http://127.0.0.1:${puertoCDP}/json/list`)).json();
      destino = lista.find((t) => t.type === 'page');
    } catch { /* todavia no levanto */ }
  }
  if (!destino) { edge.kill(); s.close(); throw new Error('el navegador no expuso una pagina en ' + puertoCDP); }

  const ws = new WS(destino.webSocketDebuggerUrl);
  await ws.listo;
  await ws.cmd('Page.enable');
  await ws.cmd('Runtime.enable');
  await ws.cmd('Page.navigate', { url });
  // mermaid dibuja despues de cargar: 3,5 MB de paquete y los diagramas de la pagina.
  await esperar(6000);
  // `esperarPromesa` existe para la unica comprobacion que necesita que el navegador haga algo
  // asincrono: recalcular la huella de los bytes que bajo.
  const ev = async (expr, esperarPromesa = false) => (await ws.cmd('Runtime.evaluate', {
    expression: expr, returnByValue: true, awaitPromise: esperarPromesa,
  })).result.value;
  return { s, edge, ws, url, ev, cerrar: async () => { await ws.cmd('Browser.close').catch(() => {}); edge.kill(); s.close(); } };
}

let C = null;
let M = null;
let mutilado = null;

before(async () => {
  C = await abrir(RAIZ, PAGINA);
  console.log('# otro lado: Edge real, sitio servido en ' + C.url);
  mutilado = arbolMutilado();
  M = await abrir(mutilado, PAGINA);
  console.log('# el arbol mutilado, para el rojo: ' + M.url);
});

after(async () => {
  if (C) await C.cerrar();
  if (M) await M.cerrar();
  if (mutilado && existsSync(mutilado)) rmSync(mutilado, { recursive: true, force: true });
});

test('la pagina insignia carga en un navegador de verdad', async () => {
  const titulo = await C.ev('document.title');
  assert.ok(titulo && titulo.length > 0, 'la pagina no tiene titulo: no cargo');
  console.log('#   title = ' + JSON.stringify(titulo));
});

test('el tercero DIBUJO: cada bloque de diagrama tiene su svg, con el archivo que sirve este sitio', async () => {
  const bloques = await C.ev('document.querySelectorAll("pre.mermaid").length');
  assert.ok(bloques > 0, 'la pagina no tiene ningun bloque de diagrama: la prueba esta mirando la pagina equivocada');
  const dibujados = await C.ev('document.querySelectorAll("pre.mermaid svg").length');
  console.log('#   ' + dibujados + ' de ' + bloques + ' bloques dibujados');
  assert.strictEqual(dibujados, bloques, 'hay un bloque de diagrama sin dibujar: el lector ve el codigo crudo');
});

test('el navegador no pidio nada a ningun host ajeno', async () => {
  const crudo = await C.ev('JSON.stringify(performance.getEntriesByType("resource").map(r => r.name))');
  const recursos = JSON.parse(crudo);
  assert.ok(recursos.length > 0, 'el navegador dice que no bajo ningun recurso: no midio nada');
  const ajenos = recursos.filter((u) => !u.startsWith('http://127.0.0.1:'));
  console.log('#   ' + recursos.length + ' recursos bajados, ' + ajenos.length + ' de un host ajeno');
  assert.deepEqual(ajenos, [], 'lo publicado sigue bajando algo de afuera');
});

test('el archivo que el navegador ejecuto es el que el inventario declara', async () => {
  const entrada = leerInventario().entries.find((e) => e.id === 'mermaid');
  const nombre = entrada.published_as.split('/').pop();
  const crudo = await C.ev('JSON.stringify(performance.getEntriesByType("resource").map(r => r.name))');
  const recursos = JSON.parse(crudo);
  assert.ok(recursos.some((u) => u.endsWith('/vendor/' + nombre)),
    'el navegador no bajo ' + nombre + ', que es el archivo que vendor/terceros.json declara publicado');

  /* Y la parte que de verdad cierra el circulo: la huella la recalcula EL NAVEGADOR sobre los
   * bytes que bajo, no esta prueba sobre el archivo del disco. Eso es lo que convierte "version
   * clavada con su integridad declarada" en algo comprobado del lado del lector. `crypto.subtle`
   * existe porque 127.0.0.1 es un contexto seguro por especificacion, aunque no sea https. */
  const huella = await C.ev(`(async () => {
    const r = await fetch('vendor/${nombre}');
    const b = await r.arrayBuffer();
    const d = await crypto.subtle.digest('SHA-256', b);
    return [...new Uint8Array(d)].map(x => x.toString(16).padStart(2, '0')).join('');
  })()`, true);
  console.log('#   huella recalculada por el navegador: ' + String(huella).slice(0, 12));
  assert.strictEqual(huella, entrada.integrity.value,
    'los bytes que el navegador ejecuto no son los que el inventario declara');
});

test('ROJO: con la etiqueta apuntada a un archivo que no existe, ningun diagrama se dibuja', async () => {
  const bloques = await M.ev('document.querySelectorAll("pre.mermaid").length');
  const dibujados = await M.ev('document.querySelectorAll("pre.mermaid svg").length');
  console.log('#   mutilado: ' + dibujados + ' de ' + bloques + ' bloques dibujados');
  assert.ok(bloques > 0, 'el arbol mutilado perdio los bloques: la mutilacion no es la que se queria');
  assert.strictEqual(dibujados, 0, 'se dibujaron diagramas sin el archivo: entonces la comprobacion de arriba no mide lo que dice');
});
