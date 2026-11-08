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
import { createServer } from 'node:http';
import { createConnection } from 'node:net';
import { readFile, access } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { createHash, randomBytes } from 'node:crypto';
import { extname, join } from 'node:path';
import { tmpdir } from 'node:os';

const RAIZ = join(import.meta.dirname, '..', 'docs', 'html');
const PAGINA = process.env.N0_PAGINA || '/CONTRATOS_DE_PELDANO.html';
const EDGE = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
];
const TIPOS = { '.html': 'text/html; charset=utf-8', '.json': 'application/json', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };


/* ---------- un servidor estatico, que es el "otro lado" del lado del sitio ---------- */
function servir() {
  return new Promise((resolve) => {
    const s = createServer(async (req, res) => {
      const ruta = decodeURIComponent(req.url.split('?')[0]);
      try {
        const cuerpo = await readFile(join(RAIZ, ruta === '/' ? '/index.html' : ruta));
        res.writeHead(200, { 'content-type': TIPOS[extname(ruta)] ?? 'application/octet-stream' });
        res.end(cuerpo);
      } catch { res.writeHead(404); res.end('no'); }
    });
    s.listen(0, '127.0.0.1', () => resolve({ s, puerto: s.address().port }));
  });
}

/* ---------- cliente de websocket minimo (sin dependencias) ---------- */
class WS {
  constructor(url) {
    const u = new URL(url);
    this.sock = createConnection({ host: u.hostname, port: Number(u.port) });
    this.buf = Buffer.alloc(0);
    this.esperando = new Map();
    this.listo = new Promise((res, rej) => {
      this.sock.once('error', rej);
      this.sock.once('connect', () => {
        const clave = randomBytes(16).toString('base64');
        this.sock.write(
          `GET ${u.pathname} HTTP/1.1\r\nHost: ${u.host}\r\nUpgrade: websocket\r\nConnection: Upgrade\r\n` +
          `Sec-WebSocket-Key: ${clave}\r\nSec-WebSocket-Version: 13\r\n\r\n`);
        const esperado = createHash('sha1').update(clave + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');
        const alSaludo = (trozo) => {
          this.buf = Buffer.concat([this.buf, trozo]);
          const fin = this.buf.indexOf('\r\n\r\n');
          if (fin < 0) return;
          const cab = this.buf.slice(0, fin).toString();
          this.buf = this.buf.slice(fin + 4);
          this.sock.off('data', alSaludo);
          this.sock.on('data', (t) => { this.buf = Buffer.concat([this.buf, t]); this.leer(); });
          if (!cab.includes(esperado)) return rej(new Error('el saludo del websocket no valida: ' + cab.split('\r\n')[0]));
          this.leer();
          res();
        };
        this.sock.on('data', alSaludo);
      });
    });
    this.id = 0;
  }
  leer() {
    for (;;) {
      if (this.buf.length < 2) return;
      const largoCorto = this.buf[1] & 0x7f;
      let off = 2, largo = largoCorto;
      if (largoCorto === 126) { if (this.buf.length < 4) return; largo = this.buf.readUInt16BE(2); off = 4; }
      else if (largoCorto === 127) { if (this.buf.length < 10) return; largo = Number(this.buf.readBigUInt64BE(2)); off = 10; }
      if (this.buf.length < off + largo) return;
      const carga = this.buf.slice(off, off + largo).toString('utf8');
      this.buf = this.buf.slice(off + largo);
      try {
        const m = JSON.parse(carga);
        if (m.id && this.esperando.has(m.id)) { this.esperando.get(m.id)(m); this.esperando.delete(m.id); }
      } catch { /* un marco que no es json no nos sirve */ }
    }
  }
  enviar(obj) {
    const carga = Buffer.from(JSON.stringify(obj));
    const mascara = randomBytes(4);
    const cab = carga.length < 126 ? Buffer.from([0x81, 0x80 | carga.length])
      : Buffer.concat([Buffer.from([0x81, 0xfe]), (() => { const b = Buffer.alloc(2); b.writeUInt16BE(carga.length); return b; })()]);
    const enmascarada = Buffer.from(carga.map((b, i) => b ^ mascara[i % 4]));
    this.sock.write(Buffer.concat([cab, mascara, enmascarada]));
  }
  cmd(method, params = {}) {
    const id = ++this.id;
    return new Promise((res, rej) => {
      const t = setTimeout(() => rej(new Error('sin respuesta a ' + method)), 20000);
      this.esperando.set(id, (m) => { clearTimeout(t); m.error ? rej(new Error(method + ': ' + m.error.message)) : res(m.result); });
      this.enviar({ id, method, params });
    });
  }
}

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

async function cual() {
  for (const p of EDGE) { try { await access(p); return p; } catch { /* la otra */ } }
  throw new Error('no encuentro msedge.exe en ninguna de las dos rutas conocidas');
}

/* ---------- el flujo, como pruebas de node:test ----------
 * Sobre node:test y no sobre un contador propio, por una razon medida: un rojo
 * tiene que ser una AFIRMACION FALLADA que una maquina pueda contar (D-037,
 * CQ-21.4), y un programa que imprime "1 fallas" de su propia cosecha no es eso.
 * Corrido con `node tests/e2e_n0.mjs` emite sus cuentas; y como el archivo no se
 * llama *.test.mjs, `node --test` NO lo descubre y la bateria del repositorio
 * sigue corriendo con node pelado y sin navegador. */

let C = null;   // el contexto vivo: servidor, navegador, websocket

before(async () => {
  const { s, puerto } = await servir();
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
