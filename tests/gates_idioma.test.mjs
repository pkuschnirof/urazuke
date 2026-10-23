// D-051: el nivel de datos esta en ingles y en ASCII puro, sources y publicado. La
// unica excepcion es el texto de la base congelada, que no se edita y sigue en
// castellano: eso tambien se verifica, para que la excepcion sea explicita y no una
// sorpresa que alguien descubra leyendo el publicado.
// Uso: node --test tests/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { raiz, cargarFuentes, extraerAnexo, armarContenido, leerAnexo, ANEXOS } from '../build/gates_lib.mjs';

const fuentes = cargarFuentes();
const anexo = extraerAnexo();
const contenido = armarContenido(fuentes, anexo);
const PARTES = Object.values(fuentes.catalog.parts).filter((p) => p !== 'gates/baseline_forge.json');

/** Las cadenas exactas de la base congelada: es lo que NO se traduce (no se edita). */
const DE_LA_BASE = new Set();
(function recorrer(v) {
  if (typeof v === 'string') return DE_LA_BASE.add(v);
  if (Array.isArray(v)) return v.forEach(recorrer);
  if (v && typeof v === 'object') return Object.values(v).forEach(recorrer);
})(fuentes.baseline);

// Heuristica deliberada, y por eso escrita: palabras castellanas frecuentes como
// palabra entera. No detecta idioma, detecta descuido, que es lo que hace falta aca.
const CASTELLANO = /\b(que|el|la|los|las|del|para|con|una|por|como|cada|sin|esta|tiene|hay|nunca|siempre|todo|toda|su|al|lo|ni|mas|pero|donde|cuando|porque|regla|reglas|motivo|autoriza|revisar|dueno|anexo|peldano|peldanos|compuerta|rojo|verde|archivo|perfil)\b/i;

function cadenasPropias(valor, archivo) {
  const salida = [];
  (function recorrer(v, p, dentroDeTramos) {
    if (typeof v === 'string') {
      if (dentroDeTramos) return;                       // titulos de tramo: son de la base
      if (/\.(must_contain|should_contain)\[/.test(p)) return;  // son expresiones regulares bilingues
      if (v.length <= 2) return;                        // etiquetas de idioma ("es", "en")
      if (DE_LA_BASE.has(v)) return;                    // la base no se edita
      salida.push([archivo + p, v]);
      return;
    }
    if (Array.isArray(v)) return v.forEach((x, i) => recorrer(x, p + '[' + i + ']', dentroDeTramos));
    if (v && typeof v === 'object') return Object.entries(v).forEach(([k, x]) => recorrer(x, p + '.' + k, dentroDeTramos || k === 'tramos'));
  })(valor, '', false);
  return salida;
}

test('ninguna cadena propia de gates/ quedo en castellano', () => {
  const sospechosas = [];
  for (const parte of PARTES) {
    const datos = JSON.parse(readFileSync(join(raiz, parte), 'utf8'));
    for (const [donde, texto] of cadenasPropias(datos, parte)) {
      if (CASTELLANO.test(texto)) sospechosas.push(donde + ' = ' + JSON.stringify(texto.slice(0, 80)));
    }
  }
  assert.deepEqual(sospechosas, [], 'el nivel de datos es ingles (D-051)');
});

test('el archivo publicado es ASCII puro, igual que sus fuentes', () => {
  const texto = readFileSync(join(raiz, 'docs', 'html', 'api', 'gates.json'), 'utf8');
  const sucios = [...new Set([...texto].filter((c) => c.charCodeAt(0) > 0x7f))];
  assert.deepEqual(sucios, [], 'el publicado dejo de ser ASCII: ' + sucios.join(' '));
});

test('el documento generado es ASCII puro y esta en ingles', () => {
  const texto = readFileSync(join(raiz, 'docs', 'COMPUERTAS.md'), 'utf8');
  const sucios = [...new Set([...texto].filter((c) => c.charCodeAt(0) > 0x7f))];
  assert.deepEqual(sucios, [], 'el documento dejo de ser ASCII: ' + sucios.join(' '));
  assert.match(texto, /It is written in English on purpose/, 'el documento dice por que esta en ingles');
  assert.match(texto, /# The gates, as data/);
});

test('el enunciado publicado sale del anexo INGLES, palabra por palabra', () => {
  assert.equal(fuentes.heuristics.statement_source.published_language, 'en');
  const en = leerAnexo(readFileSync(join(raiz, ANEXOS.en), 'utf8'));
  for (const r of contenido.heuristics.rules) {
    assert.equal(r.statement.language, 'en');
    assert.equal(r.statement.extracted, true, 'la regla ' + r.id + ' se publico sin enunciado');
    assert.equal(r.statement.text, en.reglas.get(r.id).enunciado, 'el enunciado de ' + r.id + ' no es el del anexo ingles');
  }
});

test('el castellano sigue siendo la fuente de verdad: mismas reglas, mismas severidades', () => {
  const tokens = fuentes.schema.enums.annex_severity_tokens;
  assert.ok(tokens.en && tokens.es, 'el esquema declara los tokens de severidad de los dos idiomas');
  assert.deepEqual([...anexo.reglas.keys()].sort(), [...anexo.canonico.reglas.keys()].sort());
  for (const [id, canon] of anexo.canonico.reglas) {
    assert.equal(tokens.es[canon.severidad_token], tokens.en[anexo.reglas.get(id).severidad_token],
      'la regla ' + id + ' tiene severidades distintas en los dos anexos');
  }
});

test('la excepcion declarada: el texto de la base viaja en el publicado tal como estaba', () => {
  // Si alguien "termina de traducir" el nivel de datos pasando por encima de la base,
  // este test se pone rojo: cambiar la base es un cambio del metodo, con su decision.
  const paso = contenido.steps.find((s) => s.num === 5);
  const base = fuentes.baseline.steps.find((s) => s.num === 5);
  assert.equal(paso.title, base.title);
  assert.equal(paso.summary, base.summary);
  assert.ok(paso.verify.includes(base.verify[0]), 'la pregunta de completitud de la base sigue literal');
  assert.equal(contenido.languages.data, 'en');
  assert.equal(contenido.languages.prose, 'es');
  assert.match(contenido.languages.exception, /baseline_forge\.json/);
});
