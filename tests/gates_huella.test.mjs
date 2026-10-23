// La huella del contenido: lo que un proyecto congela y lo que un consumidor recalcula
// sin red. El identificador de git NO entra, porque un build solo puede conocer el sha
// del cambio anterior al que lo contiene.
// Uso: node --test tests/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { raiz, cargarFuentes, extraerAnexo, armarContenido, huellaDeContenido, canonicalizar } from '../build/gates_lib.mjs';

const fuentes = cargarFuentes();
const anexo = extraerAnexo();
const cubre = fuentes.schema.version_scheme.hash_covers;
const contenido = armarContenido(fuentes, anexo);

test('la version del catalogo la declara el metodo a mano, y no es un sha de git', () => {
  assert.match(fuentes.catalog.catalog_version, /^\d{4}\.\d{2}\.\d+$/, 'estilo 2026.10.1');
  assert.ok(!/^[0-9a-f]{7}$/.test(fuentes.catalog.catalog_version), 'un sha corto no sirve como version declarada');
});

test('la misma fuente da la misma huella, dos veces', () => {
  assert.equal(huellaDeContenido(contenido, cubre), huellaDeContenido(armarContenido(fuentes, anexo), cubre));
});

test('la huella no depende del orden de las claves', () => {
  const alReves = {};
  for (const clave of Object.keys(contenido).reverse()) alReves[clave] = contenido[clave];
  assert.equal(huellaDeContenido(alReves, cubre), huellaDeContenido(contenido, cubre));
});

test('la huella no mira la metadata de publicacion', () => {
  const conOtraFecha = { ...contenido, generated_at: '1999-01-01T00:00:00.000Z', git_commit: 'deadbee', source: 'otro' };
  assert.equal(huellaDeContenido(conOtraFecha, cubre), huellaDeContenido(contenido, cubre),
    'si la fecha entrara, cada regeneracion cambiaria la huella sin cambiar una sola regla');
});

test('la huella cambia si cambia una regla', () => {
  const tocado = structuredClone(contenido);
  tocado.heuristics.rules.find((r) => r.id === 'CQ-01').initial_severity = 'warns';
  assert.notEqual(huellaDeContenido(tocado, cubre), huellaDeContenido(contenido, cubre));
});

test('la huella cambia si cambia un artefacto de un peldano', () => {
  const tocado = structuredClone(contenido);
  tocado.steps.find((s) => s.num === 9).artifacts[0].min_bytes = 10;
  assert.notEqual(huellaDeContenido(tocado, cubre), huellaDeContenido(contenido, cubre));
});

test('la huella cambia si cambia la version declarada del catalogo', () => {
  assert.notEqual(huellaDeContenido({ ...contenido, catalog_version: '2026.10.2' }, cubre), huellaDeContenido(contenido, cubre));
});

test('la canonicalizacion ordena por punto de codigo, recursivamente, y no toca los arreglos', () => {
  const c = canonicalizar({ b: 1, a: { z: [3, 1, 2], A: 1, a: 2 } });
  assert.deepEqual(Object.keys(c), ['a', 'b']);
  assert.deepEqual(Object.keys(c.a), ['A', 'a', 'z'], 'mayusculas primero: es orden de punto de codigo, no alfabetico');
  assert.deepEqual(c.a.z, [3, 1, 2], 'los arreglos conservan su orden declarado');
});

test('la huella se niega a calcularse si falta un campo cubierto, en vez de dar un numero mentiroso', () => {
  const sinReglas = { ...contenido };
  delete sinReglas.heuristics;
  assert.throws(() => huellaDeContenido(sinReglas, cubre), /faltan campos cubiertos: heuristics/);
});

test('un consumidor puede recalcular la huella del archivo publicado sin red', () => {
  const ruta = join(raiz, 'docs', 'html', 'api', 'gates.json');
  if (!existsSync(ruta)) { assert.fail('falta docs/html/api/gates.json: corre node build/gates_api.mjs'); }
  const publicado = JSON.parse(readFileSync(ruta, 'utf8'));
  const recalculada = huellaDeContenido(publicado, publicado.content_hash.covers);
  assert.equal(recalculada, publicado.content_hash.value,
    'el consumidor tiene que llegar al mismo numero leyendo solo el archivo: si no, el congelado es una etiqueta en la que hay que confiar');
  assert.equal(publicado.content_hash.algo, 'sha256');
  assert.equal(publicado.catalog_version, fuentes.catalog.catalog_version);
});

test('una copia congelada alterada a mano se detecta: la huella deja de coincidir', () => {
  const publicado = JSON.parse(readFileSync(join(raiz, 'docs', 'html', 'api', 'gates.json'), 'utf8'));
  // alguien "afloja" una regla en su copia local y deja la huella publicada como estaba
  publicado.heuristics.rules.find((r) => r.id === 'CQ-15').initial_severity = 'warns';
  assert.notEqual(huellaDeContenido(publicado, publicado.content_hash.covers), publicado.content_hash.value);
});

test('una copia congelada truncada se detecta igual', () => {
  const publicado = JSON.parse(readFileSync(join(raiz, 'docs', 'html', 'api', 'gates.json'), 'utf8'));
  publicado.steps = publicado.steps.slice(0, 20);
  assert.notEqual(huellaDeContenido(publicado, publicado.content_hash.covers), publicado.content_hash.value);
});

test('no hay clave en el limbo: todo lo publicado esta cubierto o excluido', () => {
  const esquema = fuentes.schema.version_scheme;
  const cubre = new Set(esquema.hash_covers);
  const excluye = new Set(esquema.hash_excludes);
  const publicado = JSON.parse(readFileSync(join(raiz, 'docs', 'html', 'api', 'gates.json'), 'utf8'));
  const limbo = Object.keys(publicado).filter((k) => !cubre.has(k) && !excluye.has(k));
  assert.deepEqual(limbo, [], 'una clave sin cubrir viaja sin proteccion: una copia alterada ahi seguiria coincidiendo');
  for (const k of cubre) assert.ok(!excluye.has(k), 'la clave ' + k + ' esta cubierta y excluida a la vez');
});

test('la huella cambia si cambia el contrato de configuracion del proyecto', () => {
  const tocado = structuredClone(contenido);
  tocado.project_config.switch_off_record = ['rule', 'reason'];
  assert.notEqual(huellaDeContenido(tocado, cubre), huellaDeContenido(contenido, cubre),
    'el registro de apagado es exigible: si no entrara en la huella, aflojarlo seria invisible');
});
