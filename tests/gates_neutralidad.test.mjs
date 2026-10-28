// D-055: el nivel de datos no nombra ninguna herramienta ni ningun protocolo.
//
// El metodo es el dueno de la definicion mecanica de las compuertas y la publica para
// cualquier consumidor. Un nombre de herramienta dentro del dato no es una mencion: se
// lee como una dependencia, y no hay ninguna. La prosa del metodo SI compara herramientas
// a proposito (Parte E del documento principal); esta prueba cubre solo el nivel de datos:
// el payload que sale de gates/, los dos archivos publicados y el documento generado.
//
// La procedencia del congelado (de donde salio la base, con su repositorio y su commit)
// se queda adentro de gates/baseline.json, que NO se publica: es el recibo de la
// diferencia cero, y por eso esta prueba no lo mira.
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { raiz, cargarFuentes, extraerAnexo, armarContenido } from '../build/gates_lib.mjs';

// Vocabulario prohibido en el nivel de datos. Es una lista cerrada y se agrega a mano:
// herramientas y protocolos propios del ecosistema del autor, agentes de programacion de
// terceros, y la forma de los identificadores de compuerta de una herramienta (G<n>), que
// es por donde se habia colado la referencia que nadie veia.
const PROHIBIDAS = [
  ['forge', /\bforge\b/i],
  ['nac3', /\bnac-?3\b/i],
  ['yujin', /\byujin\b/i],
  ['yf (la linea de comandos)', /\byf\b/i],
  ['claude', /\bclaude\b/i],
  ['copilot', /\bcopilot\b/i],
  ['cursor', /\bcursor\b/i],
  ['codex', /\bcodex\b/i],
  ['gemini', /\bgemini\b/i],
  ['chatgpt / gpt', /\b(chatgpt|gpt)\b/i],
  ['mcp', /\bmcp\b/i],
  ['G<n> (id de compuerta de una herramienta)', /\bG\d+\b/],
];

const nombra = (texto) => PROHIBIDAS.filter(([, re]) => re.test(texto)).map(([n]) => n);

/** Toda cadena y toda clave del payload, con su camino, para que el rojo diga donde. */
function hallazgosEnPayload(valor) {
  const salida = [];
  (function recorrer(v, p) {
    if (typeof v === 'string') {
      for (const n of nombra(v)) salida.push(n + ' @ ' + p + ' = ' + JSON.stringify(v.slice(0, 90)));
      return;
    }
    if (Array.isArray(v)) return v.forEach((x, i) => recorrer(x, p + '[' + i + ']'));
    if (v && typeof v === 'object') {
      for (const [k, x] of Object.entries(v)) {
        for (const n of nombra(k)) salida.push(n + ' @ clave ' + p + '.' + k);
        recorrer(x, p + '.' + k);
      }
    }
  })(valor, '');
  return salida;
}

test('el payload que sale de gates/ no nombra ninguna herramienta ni protocolo', () => {
  const contenido = armarContenido(cargarFuentes(), extraerAnexo());
  assert.deepEqual(hallazgosEnPayload(contenido), [], 'el nivel de datos es agnostico (D-055)');
});

test('los dos archivos publicados tampoco: es lo que el consumidor baja', () => {
  for (const nombre of ['gates.json', 'prompts.json']) {
    const texto = readFileSync(join(raiz, 'docs', 'html', 'api', nombre), 'utf8');
    assert.deepEqual(nombra(texto), [], nombre + ' nombra una herramienta (D-055)');
  }
});

test('el indice publicado tampoco, y su unica excepcion es una direccion -- probada', () => {
  // El indice tiene que declarar la direccion ABSOLUTA de cada recurso, porque un
  // consumidor que solo tiene el indice no puede resolver una relativa. Esa direccion
  // lleva el nombre del alojamiento, y una direccion es una direccion: no es una
  // dependencia declarada (D-056). La excepcion es estrecha y se verifica aca -- el
  // nombre puede aparecer SOLO como una de las direcciones que el propio archivo
  // declara, nunca en prosa y nunca en un nombre de campo.
  const indice = JSON.parse(readFileSync(join(raiz, 'docs', 'html', 'api', 'index.json'), 'utf8'));
  const direcciones = new Set([
    indice.canonical_base,
    ...(indice.mirrors ?? []).map((m) => m.base),
    ...indice.resources.map((r) => r.url),
    // Y las de la direccion inmutable, que son direcciones por el mismo motivo: la base de
    // la carpeta del recurso y la de su version vigente (PND-008). La excepcion no se
    // ensancha de concepto -- sigue siendo "el alojamiento solo aparece como una direccion
    // que este archivo declara" --, se ensancha la lista de las que declara. Y la direccion
    // ABSOLUTA de una version vive solo aca: el recurso declara su camino RELATIVO, porque
    // el nivel de datos no nombra el alojamiento y el metodo publica la cuenta medida.
    ...indice.resources.map((r) => r.immutable?.base),
    ...indice.resources.map((r) => r.immutable?.current),
  ].filter(Boolean));
  const hallazgos = hallazgosEnPayload(indice);
  const sobrantes = hallazgos.filter((h) => {
    const m = /^yujin @ [^=]+= (.*)$/.exec(h);
    if (!m) return true;
    let valor;
    try { valor = JSON.parse(m[1]); } catch { return true; }
    return !direcciones.has(valor);
  });
  assert.deepEqual(sobrantes, [], 'el nivel de datos no nombra herramientas, y el alojamiento solo puede aparecer como direccion');
  // Y la excepcion existe de verdad: si el indice dejara de declarar sus direcciones,
  // esta prueba quedaria verde sin estar probando nada.
  assert.ok(direcciones.size >= 3, 'el indice declara la canonica, el espejo y la direccion de cada recurso');
  assert.ok(hallazgos.length >= direcciones.size, 'y esas direcciones son las que la lista cerrada detecta');
});

test('el documento generado desde los datos tampoco', () => {
  const texto = readFileSync(join(raiz, 'docs', 'COMPUERTAS.md'), 'utf8');
  assert.deepEqual(nombra(texto), [], 'docs/COMPUERTAS.md nombra una herramienta (D-055)');
});

test('la lista prohibida de verdad detecta: cada patron se prueba contra un caso', () => {
  // Un test que nunca vio un rojo no prueba nada: aca cada patron tiene su caso.
  const casos = {
    'forge': 'el registro de Forge esta admisible',
    'nac3': 'marcado con atributos NAC-3',
    'yujin': 'publicado en yujin.app',
    'yf (la linea de comandos)': 'ultimo reporte ciclico (yf urazuke cycle)',
    'claude': 'escrito con Claude Code',
    'copilot': 'medido con Copilot',
    'cursor': 'abierto en Cursor',
    'codex': 'corrido con Codex CLI',
    'gemini': 'corrido con Gemini CLI',
    'chatgpt / gpt': 'revisado por ChatGPT',
    'mcp': 'expuesto por MCP',
    'G<n> (id de compuerta de una herramienta)': 'rechazado por G9',
  };
  for (const [nombre, texto] of Object.entries(casos)) {
    assert.deepEqual(nombra(texto), [nombre], 'el patron de ' + nombre + ' no detecta su propio caso');
  }
  assert.equal(Object.keys(casos).length, PROHIBIDAS.length, 'cada patron de la lista tiene su caso');
  assert.deepEqual(nombra('the artifacts, plus an admissible sizing record: volumetry and retention'), [],
    'y no se dispara con el texto neutral que lo reemplazo');
});
