// El reparto de licencias, en todas las caras donde se declara (decision del dueno del
// 2026-11-07, D-088).
//
// Lo que estaba mal. El repositorio entero se publicaba bajo CC BY-SA 4.0, incluidos los
// programas de build/, sus pruebas y la definicion mecanica de las compuertas que una
// herramienta IMPLEMENTA -- o sea que la embute y la transforma, que es justo lo que el
// compartir-igual alcanza. Esa licencia sobre un archivo que se ejecuta no protege nada
// que el titular pueda hacer valer y si cuesta la adopcion que el metodo busca: Creative
// Commons misma recomienda no usar sus licencias para software, y una revision de
// licencias corporativa pone "CC BY-SA sobre codigo" en la misma casilla que "sin
// licencia". Desde la decision hay DOS: Apache-2.0 para lo que una maquina ejecuta o
// consume, CC BY-SA 4.0 para el metodo.
//
// Por que esto es una compuerta y no una nota. La licencia no se declara en un lugar: se
// declara en dos textos legales, en la cabecera del catalogo (gates/catalog.json), en el
// campo `license` de los tres recursos publicados, en el indice de la interfaz -- que la
// EXTRAE de cada recurso y no la transcribe -- y en los ocho README. Son trece
// declaraciones del mismo hecho, mantenidas por manos distintas y en momentos distintos.
// La forma conocida del defecto de este repositorio es exactamente esa: dos copias de un
// dato que hay que acordarse de mantener juntas. Un consumidor que lee una licencia vieja
// cree tener permisos que no tiene, o no usa algo que si podia usar.
//
// Lo que NO guarda, dicho para que nadie le atribuya mas: no opina sobre si el reparto es
// el correcto -- eso es la decision del dueno, escrita en docs/DECISIONES.md -- y no mira
// las copias congeladas de versiones anteriores, que declaran la licencia que regia cuando
// se publicaron y no se editan (la huella de contenido deja `license` afuera a proposito,
// gates/schema.json#version_scheme.hash_excludes).
//
// Las comprobaciones son PURAS -- reciben el arbol descripto como dato -- para que los
// rojos deliberados de abajo puedan alimentarlas con un arbol roto a mano. Una compuerta
// que nadie vio caer no demuestra que guarde nada.
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { raiz } from '../build/gates_lib.mjs';
import { RECURSOS, NOMBRE, leerDisco, verificarIndice } from '../build/index_api.mjs';

const PROSA = 'CC BY-SA 4.0';
const CODIGO = 'Apache-2.0';

// La licencia que a cada recurso publicado le toca POR SU NATURALEZA, y el motivo:
//   gates.json   -- la definicion mecanica que una herramienta implementa  -> Apache-2.0
//   prompts.json -- los prompts del metodo, que son su prosa               -> CC BY-SA 4.0
//   labels.json  -- los textos del metodo extraidos de su prosa            -> CC BY-SA 4.0
const POR_RECURSO = { 'gates.json': CODIGO, 'prompts.json': PROSA, 'labels.json': PROSA };

const READMES = ['README.md', 'docs/en/README.md', 'docs/pt/README.md', 'docs/fr/README.md',
  'docs/de/README.md', 'docs/it/README.md', 'docs/ja/README.md', 'docs/zh/README.md'];

/** El arbol real, leido del disco y descripto como dato. */
function leerArbol(base = raiz) {
  const leer = (rel) => readFileSync(join(base, rel), 'utf8');
  const recursos = {};
  for (const r of RECURSOS) recursos[r.name] = JSON.parse(leer(join('docs', 'html', 'api', r.name)));
  const readmes = {};
  for (const rel of READMES) readmes[rel] = leer(rel);
  return {
    license: leer('LICENSE'),
    license_code: leer('LICENSE-CODE'),
    catalogo: JSON.parse(leer(join('gates', 'catalog.json'))),
    indice: JSON.parse(leer(join('docs', 'html', 'api', NOMBRE))),
    recursos,
    readmes,
  };
}

/**
 * Devuelve la lista de hallazgos. Cada uno nombra la cara que se desincronizo, porque un
 * rojo que dice "las licencias no coinciden" obliga a buscar donde y eso es trabajo que la
 * compuerta ya hizo.
 */
function hallazgos(arbol) {
  const h = [];

  // 1. Los dos textos legales son los canonicos, que son los que un detector reconoce.
  if (!arbol.license.startsWith('Attribution-ShareAlike 4.0 International')) {
    h.push('LICENSE no abre con el titulo canonico de CC BY-SA 4.0: la ficha del repositorio vuelve a NOASSERTION y, para quien evalua, un repositorio sin licencia declarada no se puede usar');
  }
  if (!arbol.license_code.includes('Apache License') || !arbol.license_code.includes('Version 2.0, January 2004')) {
    h.push('LICENSE-CODE no es el texto canonico de Apache-2.0');
  }
  if (arbol.license_code.includes('[name of copyright owner]') || arbol.license_code.includes('[yyyy]')) {
    h.push('LICENSE-CODE dejo el apendice de Apache-2.0 sin completar: todavia dice [yyyy] o [name of copyright owner]');
  }

  // 2. Cada recurso publicado declara la licencia que su naturaleza manda.
  for (const [nombre, esperada] of Object.entries(POR_RECURSO)) {
    const payload = arbol.recursos[nombre];
    if (!payload) { h.push('falta el recurso publicado ' + nombre); continue; }
    if (payload.license !== esperada) {
      h.push(nombre + ' declara la licencia ' + JSON.stringify(payload.license) + ' y por su naturaleza le toca ' + JSON.stringify(esperada));
    }
  }

  // 3. La fuente y lo publicado no se separan: la cabecera del catalogo declara lo mismo
  // que publica gates.json. Son dos archivos distintos escritos por dos manos distintas --
  // uno a mano, el otro generado -- y es la pareja que mas facil se desincroniza.
  const delCatalogo = arbol.catalogo?.method?.license;
  const delPublicado = arbol.recursos['gates.json']?.license;
  if (delCatalogo !== delPublicado) {
    h.push('gates/catalog.json#method.license dice ' + JSON.stringify(delCatalogo) + ' y gates.json publica ' + JSON.stringify(delPublicado));
  }

  // 4. El indice: su propia licencia, y la de cada recurso EXTRAIDA del recurso. Desde que
  // hay dos licencias los tres recursos ya no coinciden, asi que un indice que declarara
  // una sola para todos le mentiria a dos de cada tres consumidores.
  if (arbol.indice.license !== CODIGO) {
    h.push('el indice de la interfaz declara su propia licencia ' + JSON.stringify(arbol.indice.license) + ' y le toca ' + JSON.stringify(CODIGO) + ': es metadata de publicacion');
  }
  for (const entrada of arbol.indice.resources ?? []) {
    const payload = arbol.recursos[entrada.name];
    if (!payload) continue;
    if (entrada.license === undefined) {
      h.push('el indice lista ' + entrada.name + ' y no declara su licencia: un consumidor que solo tiene el indice no sabe bajo que permisos esta lo que va a bajar');
    } else if (entrada.license !== payload.license) {
      h.push('el indice dice que ' + entrada.name + ' esta bajo ' + JSON.stringify(entrada.license) + ' y el recurso declara ' + JSON.stringify(payload.license));
    }
  }

  // 5. Los ocho README nombran los DOS archivos de licencia. Un lector que llega por una
  // traduccion y lee que el metodo es CC BY-SA 4.0 a secas se lleva la mitad del hecho.
  for (const [rel, texto] of Object.entries(arbol.readmes)) {
    if (!texto.includes('LICENSE-CODE')) {
      h.push(rel + ' no nombra LICENSE-CODE: declara una sola de las dos licencias');
    }
    if (!texto.includes('Apache-2.0')) {
      h.push(rel + ' no nombra Apache-2.0');
    }
  }

  return h;
}

const clonar = (o) => JSON.parse(JSON.stringify(o));

/* ------------------------------------------------------------------ *
 * El arbol real
 * ------------------------------------------------------------------ */

test('el arbol real no tiene hallazgos: las trece declaraciones dicen lo mismo', () => {
  assert.deepEqual(hallazgos(leerArbol()), []);
});

test('la huella de contenido deja la licencia afuera, que es lo que permite cambiarla sin subir la version', () => {
  const esquema = JSON.parse(readFileSync(join(raiz, 'gates', 'schema.json'), 'utf8')).version_scheme;
  assert.ok(esquema.hash_excludes.includes('license'), 'license esta en hash_excludes');
  assert.ok(!esquema.hash_covers.includes('license'), 'license no esta en hash_covers');
});

/* ------------------------------------------------------------------ *
 * Los rojos deliberados: un arbol roto a mano, uno por cara
 * ------------------------------------------------------------------ */

test('ROJO: un recurso con la licencia del otro lado del reparto', () => {
  const roto = leerArbol();
  roto.recursos['prompts.json'] = { ...roto.recursos['prompts.json'], license: CODIGO };
  roto.indice = clonar(roto.indice);
  for (const e of roto.indice.resources) if (e.name === 'prompts.json') e.license = CODIGO;
  const h = hallazgos(roto);
  assert.equal(h.length, 1, h.join(' | '));
  assert.match(h[0], /prompts\.json declara la licencia "Apache-2\.0"/);
});

test('ROJO: la cabecera del catalogo se separa de lo publicado', () => {
  const roto = leerArbol();
  roto.catalogo = clonar(roto.catalogo);
  roto.catalogo.method.license = PROSA;
  const h = hallazgos(roto);
  assert.equal(h.length, 1, h.join(' | '));
  assert.match(h[0], /gates\/catalog\.json#method\.license dice "CC BY-SA 4\.0" y gates\.json publica "Apache-2\.0"/);
});

test('ROJO: el indice transcribe una licencia vieja en vez de extraerla', () => {
  const roto = leerArbol();
  roto.indice = clonar(roto.indice);
  for (const e of roto.indice.resources) if (e.name === 'gates.json') e.license = PROSA;
  const h = hallazgos(roto);
  assert.equal(h.length, 1, h.join(' | '));
  assert.match(h[0], /el indice dice que gates\.json esta bajo "CC BY-SA 4\.0"/);
});

test('ROJO: el indice no declara la licencia de un recurso', () => {
  const roto = leerArbol();
  roto.indice = clonar(roto.indice);
  for (const e of roto.indice.resources) if (e.name === 'labels.json') delete e.license;
  const h = hallazgos(roto);
  assert.equal(h.length, 1, h.join(' | '));
  assert.match(h[0], /el indice lista labels\.json y no declara su licencia/);
});

test('ROJO: una traduccion declara una sola de las dos licencias', () => {
  const roto = leerArbol();
  roto.readmes['docs/ja/README.md'] = roto.readmes['docs/ja/README.md']
    .split('LICENSE-CODE').join('LICENSE').split('Apache-2.0').join('CC BY-SA 4.0');
  const h = hallazgos(roto);
  assert.equal(h.length, 2, h.join(' | '));
  assert.match(h.join(' | '), /docs\/ja\/README\.md no nombra LICENSE-CODE/);
  assert.match(h.join(' | '), /docs\/ja\/README\.md no nombra Apache-2\.0/);
});

test('ROJO: LICENSE-CODE con el apendice de Apache-2.0 sin completar', () => {
  const roto = leerArbol();
  roto.license_code = roto.license_code.replace('Copyright 2026 Pablo Kuschnirof', 'Copyright [yyyy] [name of copyright owner]');
  const h = hallazgos(roto);
  assert.equal(h.length, 1, h.join(' | '));
  assert.match(h[0], /dejo el apendice de Apache-2\.0 sin completar/);
});

/* ------------------------------------------------------------------ *
 * Y el verificador del indice, que es el que corre al publicar
 * ------------------------------------------------------------------ */

test('el verificador del indice atrapa una licencia que no es la del recurso', () => {
  const disco = leerDisco();
  const indice = JSON.parse(readFileSync(join(raiz, 'docs', 'html', 'api', NOMBRE), 'utf8'));
  assert.deepEqual(verificarIndice(indice, disco), [], 'el indice commiteado pasa');
  const roto = clonar(indice);
  for (const e of roto.resources) if (e.name === 'gates.json') e.license = PROSA;
  const codigos = [...new Set(verificarIndice(roto, disco).map((x) => x.codigo))];
  assert.deepEqual(codigos, ['E_INDICE_LICENCIA']);
});
