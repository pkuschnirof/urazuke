// Prueba de punta a punta de UN flujo, para el prerrequisito 4 de la estacion N0.
//
// Por que asi. El prerrequisito pide recorrer la pantalla "con cada elemento accesible" y
// probarlo "escribiendo y corriendo un test de punta a punta de un flujo". Y CQ-21.1 dice que
// el otro lado tiene que ser el OTRO LADO DE VERDAD --el navegador, el sistema operativo, la
// base, la red-- y que ninguna cantidad de dobles fieles lo sustituye. Un doble del DOM que
// invoque al oyente a mano atravesaria el adaptador y no veria nada: es exactamente el defecto
// que midio el brazo del experimento y que hizo nacer la regla.
//
// Asi que esto habla con un Edge de verdad por el protocolo de depuracion, con un cliente de
// websocket escrito aca mismo, porque este repositorio no tiene ni un package.json y no se le
// va a agregar uno para esto. El click es un Input.dispatchMouseEvent sobre las coordenadas
// reales del boton: no es una llamada al oyente.
//
// Uso:  node tests/e2e_n0.mjs    (sirve docs/html y maneja el navegador)
// NO la descubre `node --test`, a proposito: la bateria del repositorio corre con node pelado
// y sin red, y esto necesita un navegador instalado. Se corre aparte y deja su recibo.
// Sale 0 si el flujo paso, 1 si no, y sus cuentas las imprime node:test.

import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { servir, WS, esperar, cual } from './e2e_lib.mjs';

const RAIZ = join(import.meta.dirname, '..', 'docs', 'html');
const PAGINA = process.env.N0_PAGINA || '/CONTRATOS_DE_PELDANO.html';


/* El aparato --servidor estatico, cliente de websocket, camino al navegador-- vive en
 * tests/e2e_lib.mjs desde que entro la segunda prueba de punta a punta: copiarlo habria sido
 * la segunda copia de ciento veinte lineas. */

/* ---------- el flujo, como pruebas de node:test ----------
 * Sobre node:test y no sobre un contador propio, por una razon medida: un rojo
 * tiene que ser una AFIRMACION FALLADA que una maquina pueda contar (D-037,
 * CQ-21.4), y un programa que imprime "1 fallas" de su propia cosecha no es eso.
 * Corrido con `node tests/e2e_n0.mjs` emite sus cuentas; y como el archivo no se
 * llama *.test.mjs, `node --test` NO lo descubre y la bateria del repositorio
 * sigue corriendo con node pelado y sin navegador. */

let C = null;   // el contexto vivo: servidor, navegador, websocket

before(async () => {
  const { s, puerto } = await servir(RAIZ);
  const url = `http://127.0.0.1:${puerto}${PAGINA}`;

  const bin = await cual();
  const perfil = join(tmpdir(), 'urazuke-n0-' + Date.now());
  const puertoCDP = 9333 + (Date.now() % 500);
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
  await esperar(2500);

  C = {
    s, edge, ws, url, puertoCDP,
    ev: async (expr) => (await ws.cmd('Runtime.evaluate', { expression: expr, returnByValue: true })).result.value,
  };
  console.log('# otro lado: Edge real en ' + puertoCDP + ', sitio servido en ' + url);
});

after(async () => {
  if (!C) return;
  await C.ws.cmd('Browser.close').catch(() => {});
  C.edge.kill();
  C.s.close();
});

test('la pantalla se ejecuta por programa: la pagina carga en un navegador de verdad', async () => {
  const titulo = await C.ev('document.title');
  assert.ok(titulo && titulo.length > 0, 'la pagina no tiene titulo: no cargo');
});

test('cada elemento de la pantalla es accesible por programa', async () => {
  const n = await C.ev('document.querySelectorAll("button.trbtn").length');
  assert.ok(n > 0, 'no hay un solo elemento accionable en la pantalla');
  console.log('#   ' + n + ' botones de traduccion accesibles');
});

test('un click DEL NAVEGADOR cambia el estado de la pantalla', async () => {
  /* El click es un Input.dispatchMouseEvent sobre las coordenadas reales del boton.
   * No es una llamada al oyente: un doble que invoque al oyente a mano atraviesa el
   * adaptador y no ve el defecto, que es lo que midio el brazo (CQ-21.1). */
  const caja = await C.ev(`(() => {
    const b = document.querySelector('button.trbtn');
    b.scrollIntoView({block:'center'});
    const r = b.getBoundingClientRect();
    return JSON.stringify({x: r.x + r.width/2, y: r.y + r.height/2, rotulo: b.textContent.trim()});
  })()`);
  const { x, y, rotulo } = JSON.parse(caja);

  await C.ws.cmd('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
  await C.ws.cmd('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
  await esperar(600);

  const despues = await C.ev('document.querySelector("button.trbtn").textContent.trim()');
  console.log('#   rotulo ' + JSON.stringify(rotulo) + ' -> ' + JSON.stringify(despues));
  assert.notStrictEqual(despues, rotulo,
    'el click no cambio nada: el boton esta en la pantalla y su oyente no responde');
});

test('el efecto verificable del otro lado: lo publicado es lo que su huella declara', async () => {
  /* El "backend" de este sistema es la interfaz de datos publicada, y no tiene
   * ninguna escritura desde la pantalla. Asi que el efecto verificable es que lo
   * que el otro extremo sirve coincida con la huella que declara, contra la RED. */
  const indice = await (await fetch('https://yujin.app/urazuke/api/index.json')).json();
  const rec = (indice.resources ?? []).find((r) => /gates\.json$/.test(r.url ?? ''));
  assert.ok(rec, 'el indice publicado no declara el recurso de compuertas');
  const j = JSON.parse(await (await fetch(rec.url)).text());
  const canon = (v) => Array.isArray(v) ? '[' + v.map(canon).join(',') + ']'
    : (v && typeof v === 'object') ? '{' + Object.keys(v).sort().map((k) => JSON.stringify(k) + ':' + canon(v[k])).join(',') + '}'
    : JSON.stringify(v);
  const payload = {};
  for (const k of j.content_hash.covers) payload[k] = j[k];
  const h = createHash('sha256').update(canon(payload), 'utf8').digest('hex');
  console.log('#   catalogo ' + j.catalog_version + ', huella recalculada');
  assert.strictEqual(h, j.content_hash.value, 'lo servido no coincide con la huella que declara');
});
