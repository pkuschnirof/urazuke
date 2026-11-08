// El aparato comun de las pruebas de punta a punta: un servidor estatico, un cliente de
// websocket sin dependencias y el camino al navegador instalado.
//
// Por que vive aparte. La primera prueba de punta a punta (tests/e2e_n0.mjs, prerrequisito 4 de la
// estacion N0) trajo este aparato adentro. Cuando entro la segunda --la de los terceros, que
// comprueba en un navegador de verdad que los diagramas se dibujan con el archivo que sirve ESTE
// sitio-- copiarlo habria sido la segunda copia de ciento veinte lineas, que es la familia de
// defectos que este repositorio persigue desde D-044. Asi que se extrajo, y las dos lo importan.
//
// Sigue sin dependencias a proposito: este repositorio no tiene un package.json y no se le va a
// agregar uno para esto. El cliente de websocket es el minimo que el protocolo de depuracion
// necesita, y despacha RESPUESTAS por su id; los eventos del protocolo los descarta, asi que una
// prueba que los necesite tiene que agregarselo con su razon escrita.
import { createServer } from 'node:http';
import { createConnection } from 'node:net';
import { readFile, access } from 'node:fs/promises';
import { createHash, randomBytes } from 'node:crypto';
import { extname, join } from 'node:path';

export const EDGE = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
];
const TIPOS = { '.html': 'text/html; charset=utf-8', '.json': 'application/json', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };

/* ---------- un servidor estatico, que es el "otro lado" del lado del sitio ---------- */
export function servir(RAIZ) {
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
export class WS {
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

export const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

export async function cual() {
  for (const p of EDGE) { try { await access(p); return p; } catch { /* la otra */ } }
  throw new Error('no encuentro msedge.exe en ninguna de las dos rutas conocidas');
}
