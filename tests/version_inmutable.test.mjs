// La direccion versionada e inmutable de la interfaz de datos (PND-008).
//
// Lo que estaba mal: la interfaz publicaba una sola direccion por recurso, la viva, que
// sirve siempre lo vigente. Quien queria reproducibilidad tenia que guardarse su copia, y
// quien apuntaba a la direccion viva se actualizaba en silencio: la huella le cambiaba
// abajo de los pies. Y desde el contrato de fijacion (D-068) eso dejo de ser un lujo: el
// dato le dice a un proyecto que congele una version y la mantenga hasta el final, y no
// habia ninguna direccion desde donde volver a leerla.
//
// Lo que esta vigilando este archivo no es que los archivos existan: es que la PROMESA sea
// verdad. La promesa es el contenido que cubre la huella, y el ancla contra la que se
// comprueba es el registro de versiones, que es append-only y vive en el repositorio del
// metodo y no en el alojamiento que sirve el archivo. De ahi que casi todo lo de abajo sean
// rojos deliberados sobre el verificador: una copia por version que nadie contrasta es un
// archivo mas, no una garantia.
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, readFileSync, writeFileSync, rmSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { raiz, huellaDeContenido, CARPETA_INMUTABLE, caminoInmutable, urlInmutable, BASE_API } from '../build/gates_lib.mjs';
import {
  DIR_API, RECURSOS, registroDe, rutaCongelada, congeladasEnDisco, verificar, congelar,
} from '../build/version_inmutable.mjs';

/** Una copia de docs/html/api/ en un arbol de mentira, para que los rojos no toquen el real. */
function apiDeMentira() {
  const dir = mkdtempSync(join(tmpdir(), 'urazuke-inmutable-'));
  cpSync(DIR_API, dir, { recursive: true });
  return dir;
}
const leer = (p) => JSON.parse(readFileSync(p, 'utf8'));
const escribir = (p, o) => writeFileSync(p, JSON.stringify(o, null, 2) + '\n', 'utf8');
const dichos = (hallazgos) => hallazgos.map((h) => h.recurso + ': ' + h.que);

/* ------------------------------------------------------------------ *
 * Lo que tiene que ser verdad hoy
 * ------------------------------------------------------------------ */

test('el arbol commiteado pasa su propio verificador, y reviso algo', () => {
  const { revisadas, hallazgos } = verificar();
  assert.deepEqual(dichos(hallazgos), []);
  // Un verificador que no encontro una sola copia devuelve cero hallazgos, y eso no es un
  // verde: es la misma trampa que el patron entre comillas de `node --test`.
  assert.ok(revisadas >= 14, 'reviso ' + revisadas + ' copias, que son muy pocas para las versiones publicadas');
});

test('toda version del registro tiene su copia, y ninguna copia sobra', () => {
  for (const recurso of RECURSOS) {
    const delRegistro = registroDe(recurso).map((e) => e.version);
    const enDisco = congeladasEnDisco(recurso);
    assert.deepEqual([...enDisco].sort(), [...delRegistro].sort(),
      CARPETA_INMUTABLE[recurso.name] + '/ tiene exactamente las versiones que el registro anota');
    assert.ok(delRegistro.length > 0);
  }
});

test('la huella de cada copia es la que su registro anota -- el criterio de aceptacion de P5', () => {
  let contadas = 0;
  for (const recurso of RECURSOS) {
    for (const { version, hash } of registroDe(recurso)) {
      const copia = leer(rutaCongelada(recurso, version));
      assert.equal(copia[recurso.version_field], version, 'la copia de ' + version + ' declara esa version adentro');
      assert.equal(huellaDeContenido(copia, copia.content_hash.covers), hash,
        recurso.name + ' ' + version + ': la huella recalculada es la del registro');
      contadas++;
    }
  }
  assert.ok(contadas >= 14, 'contadas ' + contadas);
});

test('la copia de la version vigente entrega lo mismo que la direccion viva', () => {
  for (const recurso of RECURSOS) {
    const vivo = leer(join(DIR_API, recurso.name));
    const copia = leer(rutaCongelada(recurso, vivo[recurso.version_field]));
    assert.equal(
      huellaDeContenido(copia, copia.content_hash.covers),
      huellaDeContenido(vivo, vivo.content_hash.covers),
      recurso.name + ': la direccion viva y la inmutable de la version vigente dan el mismo contenido',
    );
  }
});

test('la forma de la direccion vive una sola vez, y el recurso declara su camino RELATIVO', () => {
  const gates = leer(join(DIR_API, 'gates.json'));
  const version = gates.catalog_version;
  assert.equal(gates.pinning.prior_version_content.immutable_path, caminoInmutable('gates.json', version));
  // Y es relativo a proposito: una absoluta trae el nombre del alojamiento al nivel de
  // datos, y el metodo publica un comando que cuenta esas ocurrencias sobre el archivo
  // servido y afirma que da cero (README, en los ocho idiomas). Medido aca, sobre el
  // archivo que se publica, para que el README no dependa de que alguien se acuerde.
  for (const nombre of ['gates.json', 'prompts.json']) {
    const texto = readFileSync(join(DIR_API, nombre), 'utf8');
    assert.equal((texto.match(/forge|nac-?3|yujin/gi) ?? []).length, 0,
      nombre + ': la cuenta que el README publica medida tiene que dar cero');
  }
  // La absoluta existe, y la declara el indice, que es el directorio de la interfaz.
  const indice = leer(join(DIR_API, 'index.json'));
  const r = indice.resources.find((x) => x.name === 'gates.json');
  assert.equal(r.immutable.current, urlInmutable('gates.json', version));
  assert.equal(r.immutable.base, BASE_API + CARPETA_INMUTABLE['gates.json'] + '/');
  assert.deepEqual(r.immutable.versions, registroDe(RECURSOS[0]).map((e) => e.version));
});

/* ------------------------------------------------------------------ *
 * Los rojos
 * ------------------------------------------------------------------ */

test('ROJO: falta la copia de una version del registro, y sale nombrada', () => {
  const dir = apiDeMentira();
  const recurso = RECURSOS[0];
  const version = registroDe(recurso)[0].version;
  rmSync(rutaCongelada(recurso, version, dir));
  const { hallazgos } = verificar(dir);
  assert.equal(hallazgos.length, 1);
  assert.match(hallazgos[0].que, new RegExp('la version ' + version.replace(/\./g, '\\.') + ' esta en el registro y no tiene copia'));
});

test('ROJO: una copia alterada en una clave que la huella cubre', () => {
  const dir = apiDeMentira();
  const recurso = RECURSOS[0];
  const version = registroDe(recurso)[0].version;
  const p = rutaCongelada(recurso, version, dir);
  const copia = leer(p);
  copia.steps[0].title = 'otra cosa';   // `steps` esta cubierto en TODAS las versiones
  escribir(p, copia);
  const { hallazgos } = verificar(dir);
  assert.equal(hallazgos.length, 1);
  assert.match(hallazgos[0].que, /la huella recalculada de la copia de .* y el registro anota/);
});

test('lo que la direccion promete es el CONTENIDO y no los bytes, y por eso esto pasa', () => {
  // No es un agujero: es la promesa, escrita. `generated_at` queda fuera de la huella
  // porque si entrara cada regeneracion cambiaria la huella sin que cambie una regla, asi
  // que prometer los bytes seria prometer algo que la primera regeneracion rompe. El
  // consumidor recalcula la huella, que es lo que el dato dice que compare.
  const dir = apiDeMentira();
  const recurso = RECURSOS[0];
  const version = registroDe(recurso)[0].version;
  const p = rutaCongelada(recurso, version, dir);
  const copia = leer(p);
  copia.generated_at = '1999-01-01T00:00:00.000Z';
  escribir(p, copia);
  assert.deepEqual(dichos(verificar(dir).hallazgos), [],
    'la promesa es el contenido cubierto: eso esta declarado en what_is_promised y aca se prueba que es asi');
});

// Y hasta donde llega la promesa de una version VIEJA, medido y no estimado. La huella de
// una version cubre lo que cubria el dia que se publico, y eso crecio: PND-010 metio `what`
// y `counts` adentro en 2026.10.6. Entonces para una version anterior la direccion solo
// puede prometer lo que esa version podia probar, y eso no lo arregla una version posterior
// -- una huella ya publicada no se edita (D-053). Esta prueba fija la tabla medida para que
// el limite se vea y no se pueda ensanchar en silencio.
test('la promesa de una version vieja llega hasta donde llegaba SU huella, y la tabla se fija', () => {
  const recurso = RECURSOS[0];
  const sinCubrir = {};
  const METADATA = ['generated_at', 'git_commit', 'git_commit_note', 'source', 'license', 'content_hash'];
  for (const { version } of registroDe(recurso)) {
    const copia = leer(rutaCongelada(recurso, version));
    const cubiertas = new Set(copia.content_hash.covers);
    sinCubrir[version] = Object.keys(copia).filter((k) => !cubiertas.has(k) && !METADATA.includes(k)).sort();
  }
  for (const version of ['2026.10.1', '2026.10.2', '2026.10.3', '2026.10.4', '2026.10.5']) {
    assert.deepEqual(sinCubrir[version], ['counts', 'what'], version + ': lo que su huella no cubria');
  }
  for (const version of ['2026.10.6', '2026.10.7', '2026.10.8', '2026.10.9']) {
    assert.deepEqual(sinCubrir[version], [], version + ': desde 2026.10.6 no queda nada en el limbo (PND-010)');
  }
  // Y el dato lo DICE, en el archivo que un consumidor baja: si la frase se cae, esto cae.
  const promesa = leer(join(DIR_API, 'gates.json')).pinning.prior_version_content.what_is_promised;
  assert.match(promesa, /2026\.10\.1 to 2026\.10\.5/);
  assert.match(promesa, /not more than that version's own hash covered/);
});

test('ROJO: una copia bien nombrada con otra version adentro', () => {
  const dir = apiDeMentira();
  const recurso = RECURSOS[0];
  const registro = registroDe(recurso);
  const p = rutaCongelada(recurso, registro[0].version, dir);
  escribir(p, leer(rutaCongelada(recurso, registro[1].version, dir)));
  const hallazgos = verificar(dir).hallazgos;
  assert.equal(hallazgos.length, 2, 'cae por declarar otra version Y por la huella');
  assert.match(hallazgos[0].que, /declara adentro/);
});

test('ROJO: una copia congelada que el registro no anota', () => {
  const dir = apiDeMentira();
  const recurso = RECURSOS[0];
  const p = rutaCongelada(recurso, '2026.99.1', dir);
  escribir(p, leer(join(dir, recurso.name)));
  const hallazgos = verificar(dir).hallazgos;
  assert.equal(hallazgos.length, 1);
  assert.match(hallazgos[0].que, /hay una copia congelada de 2026\.99\.1 que el registro no anota/);
});

test('ROJO: la version viva no esta en el registro de versiones', () => {
  const dir = apiDeMentira();
  const recurso = RECURSOS[0];
  const vivo = leer(join(dir, recurso.name));
  vivo[recurso.version_field] = '2026.99.2';
  escribir(join(dir, recurso.name), vivo);
  const hallazgos = verificar(dir).hallazgos;
  assert.deepEqual(dichos(hallazgos), [recurso.name + ': la version viva 2026.99.2 no esta en el registro de versiones']);
});

test('ROJO: el recurso vivo no esta publicado', () => {
  const dir = apiDeMentira();
  rmSync(join(dir, RECURSOS[0].name));
  const hallazgos = verificar(dir).hallazgos;
  assert.equal(hallazgos.length, 1);
  assert.match(hallazgos[0].que, /no esta publicado/);
});

test('congelar no toca una copia que ya existe: el directorio es append-only', () => {
  const dir = apiDeMentira();
  const recurso = RECURSOS[0];
  const version = registroDe(recurso)[0].version;
  const p = rutaCongelada(recurso, version, dir);
  const antes = readFileSync(p, 'utf8');
  const marcado = leer(p);
  marcado.generated_at = '1999-01-01T00:00:00.000Z';   // fuera de la huella: no dispara rojo
  escribir(p, marcado);
  const { escritas } = congelar(dir, raiz);
  assert.equal(escritas.filter((e) => e.includes(version)).length, 0, 'no la reescribio');
  assert.notEqual(readFileSync(p, 'utf8'), antes, 'y la dejo como estaba, con la marca puesta');
});

test('congelar --vigente no necesita la historia de git, y la vigente SI se reescribe', () => {
  const dir = apiDeMentira();
  const recurso = RECURSOS[0];
  const viva = leer(join(dir, recurso.name))[recurso.version_field];
  rmSync(rutaCongelada(recurso, viva, dir));
  // Un directorio sin repositorio: si --vigente necesitara git, esto fallaria.
  const sinGit = mkdtempSync(join(tmpdir(), 'urazuke-sin-git-'));
  cpSync(join(raiz, 'gates'), join(sinGit, 'gates'), { recursive: true });
  cpSync(join(raiz, 'prompts'), join(sinGit, 'prompts'), { recursive: true });
  const { escritas, faltantes } = congelar(dir, sinGit, { soloVigente: true });
  assert.deepEqual(faltantes, []);
  assert.ok(escritas.some((e) => e.includes(viva)), 'escribio la vigente: ' + escritas.join(', '));
  assert.deepEqual(dichos(verificar(dir).hallazgos), []);
  assert.ok(readdirSync(join(sinGit, 'gates')).length > 0);
});
