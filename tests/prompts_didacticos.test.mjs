// La guarda de los prompts didacticos: que la divergencia siga DECLARADA (D-085, PND-094).
//
// Lo verde de aca es el arbol real, con su cuenta. Los rojos son mutaciones del arbol: cada una
// reproduce una forma concreta de que la declaracion se vuelva mentira sin que nadie lo note, y
// la primera reproduce el arbol tal como estaba antes de D-085 -- sin declaracion y sin un solo
// puntero al contrato --, que es el estado que PND-094 midio.
//
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { raiz } from '../build/gates_lib.mjs';
import {
  IDIOMAS, MANUALES, EXENTOS, DECLARACION, leerArbol, revisar,
} from '../build/prompts_didacticos.mjs';

const arbolReal = () => leerArbol();

/** Una copia del arbol con un texto cambiado. */
function mutar(idioma, manual, cambio) {
  const arbol = arbolReal();
  const nodo = arbol[idioma][manual];
  const antes = nodo.texto;
  nodo.texto = cambio(antes);
  assert.notEqual(nodo.texto, antes, 'la mutacion no cambio nada: el rojo no probaria nada');
  return arbol;
}

const soloDe = (hallazgos, trozo) => hallazgos.filter((h) => h.includes(trozo));

test('verde: el arbol commiteado pasa, y la guarda dice cuanto reviso', () => {
  const { hallazgos, cuentas } = revisar(arbolReal());
  assert.deepEqual(hallazgos, []);
  // Las cuentas medidas el 2026-11-02: 47 prompts por idioma (37 del curso y 10 del evolutivo),
  // 24 lecciones con prompt por idioma (16 y 8), y un puntero por leccion con prompt.
  assert.equal(cuentas.prompts, 376);
  assert.equal(cuentas.secciones, 192);
  assert.equal(cuentas.punteros, 192);
  assert.equal(cuentas.prompts / IDIOMAS.length, 47);
  assert.equal(cuentas.secciones / IDIOMAS.length, 24);
});

test('ROJO: el arbol como estaba antes de D-085 -- sin declaracion y sin punteros', () => {
  // La mutacion es exactamente lo que D-085 agrego: se le quita y tiene que volver a caer.
  const arbol = arbolReal();
  for (const idioma of IDIOMAS) {
    for (const manual of MANUALES) {
      const nodo = arbol[idioma][manual];
      nodo.texto = nodo.texto
        .split('\n')
        .filter((l) => !/^\*\*[^*]+:\*\* `(peldanos\/peldano|EVOLUTIVO_CORRECTIVO)/.test(l))
        .join('\n')
        .replace(DECLARACION[idioma], 'son el prompt exacto');
    }
  }
  const { hallazgos } = revisar(arbol);
  assert.equal(soloDe(hallazgos, 'no lleva la declaracion').length, 16,
    'tienen que caer los dos manuales en los ocho idiomas');
  assert.ok(soloDe(hallazgos, 'no nombra su contrato').length >= 100,
    'las lecciones con prompt y sin puntero tienen que salir nombradas una por una');
});

test('ROJO: un manual sin su declaracion sale nombrado, y solo ese', () => {
  const arbol = mutar('de', 'MANUAL_CURSO.md', (t) => t.replace(DECLARACION.de, 'sind exakt'));
  const { hallazgos } = revisar(arbol);
  assert.equal(hallazgos.length, 1, hallazgos.join(' | '));
  assert.match(hallazgos[0], /docs\/de\/MANUAL_CURSO\.md: no lleva la declaracion/);
});

test('ROJO: una leccion que trae prompt y no nombra su contrato', () => {
  const arbol = mutar('es', 'MANUAL_CURSO.md',
    (t) => t.replace('**El contrato de este peldaño:** `peldanos/peldano-13-auditoria.md`', 'La auditoria'));
  const { hallazgos } = revisar(arbol);
  assert.ok(soloDe(hallazgos, 'no nombra su contrato').length === 1, hallazgos.join(' | '));
  // Y la asimetria con las otras siete versiones tambien cae: es el mismo defecto visto de canto.
  assert.ok(soloDe(hallazgos, 'el castellano tiene').length >= 7,
    'una version que pierde su puntero tiene que romper tambien la comparacion entre idiomas');
});

test('ROJO: un puntero que no resuelve en el arbol de su idioma', () => {
  // El disco se miente a proposito: la ruta del contrato del peldano 13 no existe. Es la regla
  // de D-069 (un puntero publicado resuelve) aplicada a la prosa del manual.
  const falta = join(raiz, 'docs', 'peldanos', 'peldano-13-auditoria.md');
  const hay = (p) => p !== falta;
  const { hallazgos } = revisar(arbolReal(), EXENTOS, readFileSync, hay);
  assert.equal(hallazgos.length, 1, hallazgos.join(' | '));
  assert.match(hallazgos[0], /nombra `peldanos\/peldano-13-auditoria\.md`, que no existe/);
});

test('ROJO: una traduccion que pierde un prompt, en la leccion donde lo perdio', () => {
  const arbol = mutar('zh', 'MANUAL_CURSO.md', (t) => {
    // Se borra el BLOQUE entero, que es como se pierde un prompt de verdad: una traduccion que
    // se saltea la cita. Quitarle una linea no cambiaria la cuenta, y la cuenta es lo que se mide.
    const lineas = t.replace(/\r\n/g, '\n').split('\n');
    let desde = -1;
    for (const [i, l] of lineas.entries()) {
      const nuevo = l.startsWith('>') && !lineas[i - 1]?.startsWith('>');
      if (nuevo && !/^> ?\[[a-z]{2}\]\s*$/.test(l)) { desde = i; break; }
    }
    assert.ok(desde >= 0, 'no encontre un bloque de prompt para borrar');
    let hasta = desde;
    while (hasta < lineas.length && lineas[hasta].startsWith('>')) hasta += 1;
    lineas.splice(desde, hasta - desde);
    return lineas.join('\n');
  });
  const { hallazgos } = revisar(arbol);
  assert.ok(soloDe(hallazgos, 'docs/zh/MANUAL_CURSO.md seccion').length >= 1, hallazgos.join(' | '));
  assert.ok(hallazgos.some((h) => /el castellano tiene "\d/.test(h)),
    'el hallazgo tiene que decir cuantos prompts hay de cada lado');
});

test('ROJO: una traduccion que apunta a otro peldano', () => {
  const arbol = mutar('it', 'MANUAL_CURSO.md',
    (t) => t.replace('`peldanos/peldano-13-auditoria.md`', '`peldanos/peldano-12-verificacion-honesta.md`'));
  const { hallazgos } = revisar(arbol);
  assert.ok(soloDe(hallazgos, 'docs/it/MANUAL_CURSO.md seccion').length >= 1, hallazgos.join(' | '));
  assert.ok(hallazgos.some((h) => h.includes('peldano-12-verificacion-honesta.md')),
    'el hallazgo tiene que nombrar el contrato al que apunta de mas');
});

test('ROJO: las lecciones fuera de orden -- la 13 apuntando al contrato del 12', () => {
  // Es el caso anterior visto desde la otra comprobacion: si las OCHO versiones apuntaran mal, la
  // comparacion entre idiomas no diria nada y lo unico que queda es el orden.
  const arbol = arbolReal();
  for (const idioma of IDIOMAS) {
    const nodo = arbol[idioma]['MANUAL_CURSO.md'];
    nodo.texto = nodo.texto.replace('`peldanos/peldano-13-auditoria.md`',
      '`peldanos/peldano-12-verificacion-honesta.md`');
  }
  const { hallazgos } = revisar(arbol);
  assert.equal(soloDe(hallazgos, 'y las lecciones van en orden').length, 8, hallazgos.join(' | '));
});

test('ROJO: una exencion cuya razon dejo de ser verdad', () => {
  const exentos = EXENTOS.map((e) => ({ ...e, bloques: e.bloques + 1 }));
  const { hallazgos } = revisar(arbolReal(), exentos);
  assert.equal(hallazgos.length, 2, hallazgos.join(' | '));
  for (const h of hallazgos) assert.match(h, /la razon de la exencion hay que volver a mirarla/);
});

test('ROJO: un exento que ya no existe no se saltea en silencio', () => {
  const exentos = [{ ruta: 'docs/practica/NO_EXISTE.md', bloques: 0, razon: 'inventada' }];
  const { hallazgos } = revisar(arbolReal(), exentos);
  assert.equal(hallazgos.length, 1);
  assert.match(hallazgos[0], /esta exento y no existe, asi que la exencion sobra/);
});

test('la declaracion tiene su trozo en los ocho idiomas, y cada uno aparece en su manual', () => {
  assert.deepEqual(Object.keys(DECLARACION).sort(), [...IDIOMAS].sort());
  const arbol = arbolReal();
  for (const idioma of IDIOMAS) {
    for (const manual of MANUALES) {
      const { ruta, texto } = arbol[idioma][manual];
      assert.ok(texto.includes(DECLARACION[idioma]), ruta + ' no lleva el trozo de la declaracion');
    }
  }
});
