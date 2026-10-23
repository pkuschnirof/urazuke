// La version declarada y la huella que produjo, de los DOS archivos publicados.
//
// La regla del dueno (2026-10-22) es que un proyecto empieza y termina con la misma
// version del metodo, y que lo que congelo tiene que releerse igual dentro de dos anos.
// Eso exige algo que la primera version no tenia: que una version declarada corresponda
// a UN contenido y a uno solo. Si una clave cubierta por la huella cambia sin que la
// version suba, quedan dos contenidos distintos bajo el mismo nombre, y una copia
// congelada deja de poder contrastarse. Estas pruebas exigen ese vinculo en los dos
// sentidos: el contenido contra su registro, y el registro contra su historia.
// Uso: node --test tests/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { raiz, cargarFuentes, extraerAnexo, armarContenido, huellaDeContenido } from '../build/gates_lib.mjs';
import { armarPublicado, verificar } from '../build/prompts_api.mjs';

const fuentes = cargarFuentes();
const anexo = extraerAnexo();
const publicadoGates = JSON.parse(readFileSync(join(raiz, 'docs', 'html', 'api', 'gates.json'), 'utf8'));
const publicadoPrompts = JSON.parse(readFileSync(join(raiz, 'docs', 'html', 'api', 'prompts.json'), 'utf8'));

/* ------------------------------------------------------------------ *
 * El registro de versiones de las compuertas
 * ------------------------------------------------------------------ */

const ledgerGates = fuentes.catalog.changelog;

test('cada version del catalogo registra la huella que produjo', () => {
  for (const c of ledgerGates) {
    assert.match(c.content_hash, /^[0-9a-f]{64}$/, 'la version ' + c.catalog_version + ' sin huella registrada');
    assert.ok(c.date && c.changed, 'cada entrada dice cuando y que cambio');
  }
  const versiones = ledgerGates.map((c) => c.catalog_version);
  assert.equal(new Set(versiones).size, versiones.length, 'una version es un contenido, y uno solo');
  assert.equal(ledgerGates.at(-1).catalog_version, fuentes.catalog.catalog_version, 'la ultima entrada es la que se publica');
});

test('el contenido de hoy es el que su version tiene registrado', () => {
  const calculada = huellaDeContenido(armarContenido(fuentes, anexo), fuentes.schema.version_scheme.hash_covers);
  const entrada = ledgerGates.find((c) => c.catalog_version === fuentes.catalog.catalog_version);
  assert.equal(entrada.content_hash, calculada,
    'cambio una clave cubierta sin subir la version: la huella calculada es ' + calculada);
  assert.equal(publicadoGates.content_hash.value, calculada, 'y es la que viaja en el publicado');
});

test('la huella de una version ya publicada no se edita', () => {
  // 2026.10.1 es lo que sirvio produccion el 2026-10-23, verificado por HTTP contra
  // yujin.app/urazuke/api/gates.json y recalculado por el consumidor. Si alguien la
  // cambia, este test se pone rojo: una version publicada es historia, y la historia
  // no se edita. Lo mismo que vale para la base congelada.
  const primera = ledgerGates.find((c) => c.catalog_version === '2026.10.1');
  assert.equal(primera.content_hash, '8f9aa195001e2a00ab4dd67acbda6c3ec56b64199935a25120de132c9982905c');
  assert.equal(primera.decision, 'D-050');
});

test('la version declarada no es un sha de git, en ninguno de los dos archivos', () => {
  for (const v of [fuentes.catalog.catalog_version, publicadoPrompts.corpus_version]) {
    assert.match(v, /^\d{4}\.\d{2}\.\d+$/, 'estilo 2026.10.1');
  }
  assert.match(publicadoGates.git_commit_note, /BEFORE/, 'el sha de git viaja diciendo que es informativo');
  assert.match(publicadoPrompts.version_note, /BEFORE/);
});

/* ------------------------------------------------------------------ *
 * Los prompts: la misma identidad que las compuertas
 * ------------------------------------------------------------------ */

test('un consumidor recalcula la huella de prompts.json sin red', () => {
  const recalculada = huellaDeContenido(publicadoPrompts, publicadoPrompts.content_hash.covers);
  assert.equal(recalculada, publicadoPrompts.content_hash.value,
    'si solo se leyera el campo, una copia congelada alterada a mano seria indetectable');
  assert.equal(publicadoPrompts.content_hash.algo, 'sha256');
  assert.equal(publicadoPrompts.content_hash.canonical_form, publicadoGates.content_hash.canonical_form,
    'la receta es una sola para los dos archivos: un consumidor escribe la canonicalizacion una vez');
});

test('una copia de prompts.json alterada o truncada se detecta', () => {
  const tocado = structuredClone(publicadoPrompts);
  tocado.contracts['peldano-08'][0] = tocado.contracts['peldano-08'][0].replace('red', 'green');
  assert.notEqual(huellaDeContenido(tocado, tocado.content_hash.covers), publicadoPrompts.content_hash.value);
  const truncado = structuredClone(publicadoPrompts);
  delete truncado.contracts['anexo-h'];
  assert.notEqual(huellaDeContenido(truncado, truncado.content_hash.covers), publicadoPrompts.content_hash.value);
});

test('no hay clave en el limbo en prompts.json: todo esta cubierto o excluido', () => {
  const { covers, excludes } = publicadoPrompts.content_hash;
  const limbo = Object.keys(publicadoPrompts).filter((k) => !covers.includes(k) && !excludes.includes(k));
  assert.deepEqual(limbo, [], 'una clave sin cubrir viaja sin proteccion');
  for (const k of covers) assert.ok(!excludes.includes(k), 'la clave ' + k + ' esta cubierta y excluida a la vez');
});

test('lo que el consumidor instalado ya lee sigue estando: el cambio es aditivo', () => {
  // Esta es la forma que valida hoy Forge (validPayload en src/urazuke/prompts_client.ts):
  // version como texto y contracts como objeto de listas de texto. Agregar claves no lo
  // rompe; sacar `version` si.
  assert.equal(typeof publicadoPrompts.version, 'string');
  assert.ok(publicadoPrompts.contracts && typeof publicadoPrompts.contracts === 'object');
  for (const v of Object.values(publicadoPrompts.contracts)) {
    assert.ok(Array.isArray(v) && v.every((p) => typeof p === 'string' && p.length > 0));
  }
  assert.equal(publicadoPrompts.count, Object.values(publicadoPrompts.contracts).flat().length);
});

test('los titulos de peldano se publican en ingles, que es donde vive el dato', () => {
  assert.equal(publicadoPrompts.steps.length, 24);
  assert.equal(publicadoPrompts.language, 'en');
  assert.equal(publicadoPrompts.languages.step_titles, 'en');
  const CASTELLANO = /\b(el|la|los|las|del|para|con|una|por|como|este|esta|se|y|que)\b/i;
  const enCastellano = publicadoPrompts.steps.filter((s) => CASTELLANO.test(s.title)).map((s) => s.num + ': ' + s.title);
  assert.deepEqual(enCastellano, [], 'decia language "en" y publicaba los titulos castellanos');
  for (const s of publicadoPrompts.steps) {
    assert.equal(s.key, 'peldano-' + String(s.num).padStart(2, '0'), 'la clave opaca es la que el consumidor usa');
  }
});

/* ------------------------------------------------------------------ *
 * Los rojos de la guarda de los prompts
 * ------------------------------------------------------------------ */

const { salida, catalogo, valor } = armarPublicado();
const sucio = () => structuredClone(catalogo);

test('verde: tal como esta, la guarda de prompts no tiene nada que decir', () => {
  assert.deepEqual(verificar(salida, catalogo, valor), []);
});

const ROJOS = [
  ['el corpus cambia y la version no sube', (c) => { c.changelog.at(-1).content_hash = 'f'.repeat(64); }, 'E_VERSION'],
  ['la version declarada sin entrada en el registro', (c) => { c.corpus_version = '2026.11.1'; }, 'E_VERSION'],
  ['dos entradas con la misma version', (c) => { c.changelog.push(structuredClone(c.changelog[0])); }, 'E_VERSION'],
  ['una entrada sin huella', (c) => { delete c.changelog.at(-1).content_hash; }, 'E_VERSION'],
  ['una clave cubierta y excluida a la vez', (c) => { c.version_scheme.hash_excludes.push('contracts'); }, 'E_HUELLA'],
  ['una clave exigible que queda en el limbo', (c) => { c.version_scheme.hash_covers = c.version_scheme.hash_covers.filter((k) => k !== 'contracts'); c.version_scheme.hash_excludes = c.version_scheme.hash_excludes.filter((k) => k !== 'contracts'); }, 'E_HUELLA'],
];

for (const [nombre, romper, codigo] of ROJOS) {
  test('rojo: ' + nombre + ' -> ' + codigo, () => {
    const c = sucio();
    romper(c);
    const errores = verificar(salida, c, valor);
    assert.ok(errores.length > 0, 'la guarda no vio nada');
    assert.ok(errores.some((e) => e.startsWith(codigo)), 'se esperaba ' + codigo + ' y llego: ' + errores.join(' | '));
  });
}
