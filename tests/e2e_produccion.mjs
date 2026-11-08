// Lo que el navegador de un lector de verdad baja de PRODUCCION, preguntado al navegador y no al
// HTML (D-094, PND-123).
//
// Por que existe, habiendo ya dos guardas. Son tres cosas distintas y las tres hicieron falta:
//   build/terceros.mjs       lee el ARBOL. No puede ver lo que un servidor agrega en el camino.
//   build/sonda_publicado.mjs lee lo que PRODUCCION DEVUELVE. Ve la inyeccion del servidor, y no
//                            puede ver lo que un script agrega en tiempo de ejecucion.
//   esto                     le pregunta AL NAVEGADOR que bajo de verdad. Es el otro lado de
//                            verdad que CQ-21.1 exige, y ninguna cantidad de dobles fieles lo
//                            sustituye.
//
// Y su rojo no es de laboratorio: el 2026-11-08, esta misma comprobacion contra produccion dio
// CUATRO DE CINCO --el navegador bajaba un script de img1.wsimg.com que ninguna decision del
// metodo habia puesto ahi-- con codigo de salida 1. Ese recibo es RCP-142 y el hallazgo que abrio
// es PND-123. El rojo deliberado de laboratorio vive en tests/e2e_terceros.mjs, que corre sobre el
// arbol servido en el puesto y puede mutilar la pagina; aca el otro extremo es produccion y no se
// mutila.
//
// Lo que mide, y la diferencia con la version anterior de esta prueba: un host ajeno ya no es
// automaticamente un fallo. Lo que se exige es que TODO lo que el navegador bajo venga del sitio
// publicado o de un host que el inventario DECLARA, con su procedencia y su decision al lado. Es
// la misma regla que el resto del metodo: lo que esta prohibido es el privilegio no declarado.
//
// Uso:  node tests/e2e_produccion.mjs
//       node tests/e2e_produccion.mjs --base https://yujin.app/urazuke/docs
// NO la descubre `node --test`, a proposito: la bateria del repositorio corre con node pelado,
// sin navegador y sin red. Se corre aparte y deja su recibo.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { WS, esperar, cual } from './e2e_lib.mjs';
import { leerInventario } from '../build/terceros.mjs';
import { hostsDeclarados, host } from '../build/sonda_publicado.mjs';

const argumento = (bandera, defecto) => {
  const i = process.argv.indexOf(bandera);
  return i > 0 && process.argv[i + 1] ? process.argv[i + 1] : defecto;
};

const BASE = argumento('--base', 'https://yujin.app/urazuke/docs');
const PAGINA = argumento('--pagina', 'ESCALERA_METODOLOGICA.html');
const URL_PUBLICADA = BASE + '/' + PAGINA;
const INV = leerInventario();
const ENTRADA = INV.entries.find((e) => e.published_as);
const NOMBRE = ENTRADA.published_as.split('/').pop();
const PROPIO = host(BASE);
const DECLARADOS = hostsDeclarados(INV);

let C = null;

before(async () => {
  const bin = await cual();
  const perfil = join(tmpdir(), 'urazuke-produccion-' + Date.now());
  const cdp = 9881 + (Date.now() % 90);
  const edge = spawn(bin, ['--headless=new', '--disable-gpu', '--no-first-run',
    '--no-default-browser-check', '--remote-debugging-port=' + cdp,
    '--user-data-dir=' + perfil, 'about:blank'], { stdio: 'ignore' });

  let destino = null;
  for (let i = 0; i < 40 && !destino; i++) {
    await esperar(500);
    try {
      const lista = await (await fetch('http://127.0.0.1:' + cdp + '/json/list')).json();
      destino = lista.find((t) => t.type === 'page');
    } catch { /* todavia no levanto */ }
  }
  if (!destino) { edge.kill(); throw new Error('el navegador no expuso una pagina en ' + cdp); }

  const ws = new WS(destino.webSocketDebuggerUrl);
  await ws.listo;
  await ws.cmd('Page.enable');
  await ws.cmd('Runtime.enable');
  await ws.cmd('Page.navigate', { url: URL_PUBLICADA });
  // Produccion y 3,5 MB de paquete: mas espera que contra el puesto.
  await esperar(9000);
  const ev = async (expr, p = false) => (await ws.cmd('Runtime.evaluate', {
    expression: expr, returnByValue: true, awaitPromise: p,
  })).result.value;
  C = { ev, cerrar: async () => { await ws.cmd('Browser.close').catch(() => {}); edge.kill(); } };
  console.log('# otro lado: navegador real, navegado a ' + URL_PUBLICADA);
  console.log('# hosts que el inventario declara: ' + (DECLARADOS.join(', ') || '(ninguno)'));
});

after(async () => { if (C) await C.cerrar(); });

/** Lo que el navegador dice que bajo: la lista de lo que de verdad paso por la red. */
const recursos = async () => JSON.parse(
  await C.ev('JSON.stringify(performance.getEntriesByType("resource").map(r => r.name))'));

test('la pagina publicada carga en un navegador de verdad', async () => {
  const titulo = await C.ev('document.title');
  assert.ok(titulo && titulo.length > 0, 'la pagina no tiene titulo: no cargo');
  console.log('#   title = ' + JSON.stringify(titulo));
});

test('el tercero que el metodo eligio DIBUJO en produccion', async () => {
  const bloques = await C.ev('document.querySelectorAll("pre.mermaid").length');
  assert.ok(bloques > 0, 'la pagina no tiene ningun bloque de diagrama: la prueba mira la pagina equivocada');
  const dibujados = await C.ev('document.querySelectorAll("pre.mermaid svg").length');
  console.log('#   ' + dibujados + ' de ' + bloques + ' bloques dibujados');
  assert.strictEqual(dibujados, bloques, 'hay un bloque sin dibujar: el lector ve el codigo crudo');
});

test('todo lo que el navegador bajo viene del sitio o de un host que el inventario declara', async () => {
  const bajados = await recursos();
  assert.ok(bajados.length > 0, 'el navegador dice que no bajo ningun recurso: no midio nada');
  const ajenos = bajados.map(host).filter((q) => q && q !== PROPIO);
  const sinDeclarar = [...new Set(ajenos.filter((q) => !DECLARADOS.includes(q)))];
  for (const u of bajados) console.log('#   bajo ' + u);
  console.log('#   ' + bajados.length + ' recursos, ' + ajenos.length + ' de un host ajeno, '
    + sinDeclarar.length + ' sin declarar');
  assert.deepEqual(sinDeclarar, [],
    'el navegador del lector ejecuta codigo de un host que el inventario no declara');
});

test('cada host ajeno que el navegador pidio tiene su entrada con su decision', async () => {
  const bajados = await recursos();
  const ajenos = [...new Set(bajados.map(host).filter((q) => q && q !== PROPIO))];
  for (const q of ajenos) {
    const entrada = INV.entries.find((e) => e.host === q);
    assert.ok(entrada, 'el navegador pidio ' + q + ' y el inventario no tiene su entrada');
    assert.ok(entrada.decision?.state, q + ': su entrada no tiene decision resuelta');
    console.log('#   ' + q + ' -> ' + entrada.id + ' (' + entrada.provenance + ', '
      + entrada.decision.state + ' por ' + entrada.decision.by + ' el ' + entrada.decision.on + ')');
  }
});

test('el archivo que el navegador ejecuto es el que el inventario declara, con su huella recalculada por el navegador', async () => {
  const bajados = await recursos();
  assert.ok(bajados.some((u) => u.endsWith('/vendor/' + NOMBRE)),
    'el navegador no bajo ' + NOMBRE + ', que es el archivo que el inventario declara publicado');
  const huella = await C.ev(`(async () => {
    const r = await fetch('vendor/${NOMBRE}');
    const b = await r.arrayBuffer();
    const d = await crypto.subtle.digest('SHA-256', b);
    return [...new Uint8Array(d)].map(x => x.toString(16).padStart(2, '0')).join('');
  })()`, true);
  console.log('#   huella recalculada por el navegador: ' + String(huella).slice(0, 12)
    + ' / inventario: ' + ENTRADA.integrity.value.slice(0, 12));
  assert.strictEqual(huella, ENTRADA.integrity.value,
    'los bytes que el navegador ejecuto no son los que el inventario declara');
});
