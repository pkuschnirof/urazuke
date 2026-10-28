// La direccion versionada e inmutable de la interfaz de datos (PND-008, decision del
// dueno del 2026-10-24: hacerlo, y SIN PURGA).
//
// Que estaba mal. La interfaz publicaba una sola direccion por recurso, la viva, que sirve
// siempre lo vigente. Entonces quien queria reproducibilidad tenia que guardarse su copia,
// y quien apuntaba a la direccion viva se actualizaba en silencio: la huella le cambiaba
// abajo de los pies. Con las versiones y las huellas ya hechas, publicar tambien la ruta
// inmutable era casi gratis -- y desde D-068 dejo de ser un lujo: el contrato de fijacion
// le dice a un proyecto que congele una version y la mantenga hasta el final, y hasta hoy
// no habia ninguna direccion desde donde volver a leer la version congelada. El dato lo
// decia, con todas las letras, en pinning.prior_version_content.not_guaranteed: "There is
// no per-version URL on this host today".
//
// Como. Una carpeta por RECURSO bajo docs/html/api/, con un archivo por version publicada:
// docs/html/api/gates/2026.10.9.json. El espejo la arrastra sola, porque la publicacion
// copia el directorio entero con cp -a. Es una carpeta por recurso y no una por version
// porque cada recurso declara su propia linea de version (catalogo y corpus no van juntas),
// y la forma vive una sola vez, en urlInmutable() de build/gates_lib.mjs.
//
// LO QUE SE PROMETE es el contenido que cubre la huella, no los bytes: `generated_at` y
// `git_commit` son metadata de publicacion, quedan fuera de la huella y una regeneracion
// los mueve. Prometer los bytes seria prometer algo que la primera regeneracion rompe, y
// el consumidor igual recalcula la huella. De ahi que la verificacion de abajo contraste
// HUELLAS contra el registro de versiones y no bytes contra git.
//
// TRES MODOS, y la diferencia importa:
//   node build/version_inmutable.mjs              verifica. No toca git y no escribe nada.
//   node build/version_inmutable.mjs --vigente    escribe la copia de la version VIGENTE.
//   node build/version_inmutable.mjs --congelar    recupera tambien las anteriores, de git.
// La copia de la version vigente es una copia de un archivo que esta en disco: no necesita
// git, y por eso la hace la construccion sola, igual que genera los otros tres archivos.
// Recuperar una version ANTERIOR si necesita la historia de git, y la cadena clona a
// profundidad 1, asi que eso es una operacion local y deliberada -- como mantener gates/ a
// mano -- y lo que corre en cada cambio es la verificacion. Un paso de la cadena que
// necesitara la historia completa fallaria por una razon que no tiene nada que ver con lo
// que vigila.
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { raiz, huellaDeContenido, esLineaDeComandos, CARPETA_INMUTABLE } from './gates_lib.mjs';
import { RECURSOS as RECURSOS_DEL_INDICE } from './index_api.mjs';

export const DIR_API = join(raiz, 'docs', 'html', 'api');

// Los recursos salen del indice y NO se vuelven a declarar aca: el indice es el que
// declara que publica la interfaz, y dos listas que hay que acordarse de mantener juntas
// es la forma mas comun del defecto que este repositorio persigue.
export const RECURSOS = RECURSOS_DEL_INDICE.map((r) => ({
  name: r.name, version_field: r.version_field, ledger: r.ledger_path,
}));

/**
 * El registro de versiones de un recurso: el par (version declarada -> huella), leido del
 * changelog append-only. Es el ancla que NO vive en el alojamiento que sirve el archivo, y
 * por eso es contra el que se verifican las copias congeladas.
 */
export function registroDe(recurso, base = raiz) {
  const catalogo = JSON.parse(readFileSync(join(base, recurso.ledger), 'utf8'));
  return (catalogo.changelog ?? []).map((e) => ({
    version: e[recurso.version_field],
    hash: e.content_hash,
  }));
}

/** El archivo vivo de un recurso, o null si no esta. */
function vivo(recurso, dirApi = DIR_API) {
  const p = join(dirApi, recurso.name);
  if (!existsSync(p)) return null;
  return { bytes: readFileSync(p), json: JSON.parse(readFileSync(p, 'utf8')) };
}

export const rutaCongelada = (recurso, version, dirApi = DIR_API) =>
  join(dirApi, CARPETA_INMUTABLE[recurso.name], version + '.json');

/** Las versiones que ya tienen copia congelada en disco, por recurso. */
export function congeladasEnDisco(recurso, dirApi = DIR_API) {
  const dir = join(dirApi, CARPETA_INMUTABLE[recurso.name]);
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5)).sort();
}

/* ------------------------------------------------------------------ *
 * El verificador
 * ------------------------------------------------------------------ */

/**
 * Devuelve la lista de hallazgos. Cuatro cosas, y ninguna necesita red ni historia de git:
 *
 *   1. toda version del registro tiene su copia congelada;
 *   2. la huella RECALCULADA de cada copia es la que el registro anota para esa version
 *      -- que es, literalmente, el criterio de aceptacion de P5: citar una direccion que
 *      dentro de dos anios devuelva el mismo contenido y comprobarlo contra la huella que
 *      la version registro;
 *   3. cada copia declara la version que su nombre de archivo dice (una copia bien
 *      nombrada con otro contenido adentro es la peor de las dos mentiras posibles);
 *   4. la copia de la version VIGENTE coincide con el archivo vivo en el contenido que la
 *      huella cubre, y no sobra ninguna copia que el registro no anote.
 */
export function verificar(dirApi = DIR_API, base = raiz) {
  const hallazgos = [];
  const h = (recurso, que, arreglo) => hallazgos.push({ recurso, que, arreglo });
  let revisadas = 0;

  for (const recurso of RECURSOS) {
    const registro = registroDe(recurso, base);
    const porRegistro = new Map(registro.map((e) => [e.version, e.hash]));
    const actual = vivo(recurso, dirApi);
    if (!actual) {
      h(recurso.name, 'no esta publicado en docs/html/api/', 'corre node build/build.mjs');
      continue;
    }
    const versionViva = actual.json[recurso.version_field];

    for (const { version, hash } of registro) {
      const p = rutaCongelada(recurso, version, dirApi);
      if (!existsSync(p)) {
        h(recurso.name, 'la version ' + version + ' esta en el registro y no tiene copia en ' + CARPETA_INMUTABLE[recurso.name] + '/',
          'corre node build/version_inmutable.mjs --congelar (necesita la historia de git)');
        continue;
      }
      revisadas++;
      let copia = null;
      try { copia = JSON.parse(readFileSync(p, 'utf8')); } catch {
        h(recurso.name, 'la copia de ' + version + ' no es JSON legible', 'volve a congelarla desde el commit que publico esa version');
        continue;
      }
      const declarada = copia[recurso.version_field];
      if (declarada !== version) {
        h(recurso.name, 'la copia que se llama ' + version + ' declara adentro ' + JSON.stringify(declarada),
          'una copia bien nombrada con otro contenido adentro es la mentira mas cara de las dos: renombrala o volve a congelarla');
      }
      const recalculada = huellaDeContenido(copia, copia.content_hash?.covers ?? []);
      if (recalculada !== hash) {
        h(recurso.name, 'la huella recalculada de la copia de ' + version + ' es ' + recalculada.slice(0, 12)
          + ' y el registro anota ' + String(hash).slice(0, 12),
          'la direccion inmutable promete el contenido que el registro anota para esa version. Si la copia cambio, se restaura; si el registro esta mal, eso es un cambio del metodo y va con su decision (una huella ya publicada no se edita, D-053).');
      }
      if (version === versionViva) {
        const vivoCanon = huellaDeContenido(actual.json, actual.json.content_hash?.covers ?? []);
        if (vivoCanon !== recalculada) {
          h(recurso.name, 'la copia de la version vigente ' + version + ' no es el archivo vivo',
            'la direccion viva y la inmutable de la version vigente tienen que entregar el mismo contenido: corre node build/version_inmutable.mjs --congelar');
        }
      }
    }

    if (!porRegistro.has(versionViva)) {
      h(recurso.name, 'la version viva ' + versionViva + ' no esta en el registro de versiones',
        'anotala en ' + recurso.ledger + '#changelog con la huella que produjo: sin entrada en el registro no hay par (version -> huella) que comprobar (D-053)');
    }
    for (const version of congeladasEnDisco(recurso, dirApi)) {
      if (!porRegistro.has(version)) {
        h(recurso.name, 'hay una copia congelada de ' + version + ' que el registro no anota',
          'o la version se publico sin anotarse -- y entonces falta la entrada -- o la copia sobra. Una direccion que sirve una version que ningun registro declara no se puede comprobar contra nada.');
      }
    }
  }

  return { revisadas, hallazgos };
}

/* ------------------------------------------------------------------ *
 * El que escribe
 * ------------------------------------------------------------------ */

/**
 * Escribe las copias que falten. La version vigente sale del archivo vivo; las anteriores,
 * del ultimo commit de `main` que publico esa version, que es el contenido que produccion
 * sirvio. Una copia que ya existe NO se toca: el directorio es append-only, igual que el
 * registro del que sale.
 */
export function congelar(dirApi = DIR_API, base = raiz, { soloVigente = false } = {}) {
  const escritas = [];
  const faltantes = [];
  for (const recurso of RECURSOS) {
    const ruta = 'docs/html/api/' + recurso.name;
    const actual = vivo(recurso, dirApi);
    const versionViva = actual?.json?.[recurso.version_field];
    mkdirSync(join(dirApi, CARPETA_INMUTABLE[recurso.name]), { recursive: true });

    // Una pasada por la historia, no una por version: `git log` del archivo y, de cada
    // commit, la version que declaraba. El ULTIMO commit de cada version es el contenido
    // que quedo servido.
    const porVersion = new Map();
    let commits = [];
    try {
      if (soloVigente) throw new Error('solo la vigente: no hace falta la historia');
      commits = execFileSync('git', ['log', '--format=%H', '--', ruta], { cwd: base, encoding: 'utf8', maxBuffer: 1 << 28 })
        .trim().split('\n').filter(Boolean);
    } catch { /* sin historia: queda lo vivo, y lo que falte sale en faltantes */ }
    for (const commit of commits) {
      let texto = null;
      try { texto = execFileSync('git', ['show', commit + ':' + ruta], { cwd: base, encoding: 'utf8', maxBuffer: 1 << 28 }); } catch { continue; }
      let json = null;
      try { json = JSON.parse(texto); } catch { continue; }
      const v = json[recurso.version_field];
      if (v && !porVersion.has(v)) porVersion.set(v, texto);   // el log viene del mas nuevo al mas viejo
    }

    for (const { version } of soloVigente ? [] : registroDe(recurso, base)) {
      const destino = rutaCongelada(recurso, version, dirApi);
      if (existsSync(destino)) continue;
      const texto = version === versionViva ? actual.bytes.toString('utf8') : porVersion.get(version);
      if (!texto) { faltantes.push(recurso.name + ' ' + version); continue; }
      writeFileSync(destino, texto, 'utf8');
      escritas.push(recurso.name + ' ' + version);
    }

    // La vigente SI se reescribe: mientras una version es la vigente, su copia tiene que
    // seguir al archivo vivo. Se sella cuando la version deja de ser la vigente.
    if (versionViva) {
      const destino = rutaCongelada(recurso, versionViva, dirApi);
      const nuevo = actual.bytes.toString('utf8');
      if (!existsSync(destino) || readFileSync(destino, 'utf8') !== nuevo) {
        writeFileSync(destino, nuevo, 'utf8');
        if (!escritas.includes(recurso.name + ' ' + versionViva)) escritas.push(recurso.name + ' ' + versionViva + ' (vigente)');
      }
    }
  }
  return { escritas, faltantes };
}

/* ------------------------------------------------------------------ *
 * Linea de comandos
 * ------------------------------------------------------------------ */

if (esLineaDeComandos(import.meta.url)) {
  if (process.argv.includes('--congelar') || process.argv.includes('--vigente')) {
    const soloVigente = !process.argv.includes('--congelar');
    const { escritas, faltantes } = congelar(DIR_API, raiz, { soloVigente });
    for (const e of escritas) console.log('congelada: ' + e);
    for (const f of faltantes) console.error('NO se pudo congelar ' + f + ': la historia de git no tiene esa version del archivo publicado');
    if (faltantes.length) process.exit(1);
  }
  const { revisadas, hallazgos } = verificar();
  if (hallazgos.length) {
    for (const x of hallazgos) console.error('[' + x.recurso + '] ' + x.que + '\n    arreglo: ' + x.arreglo);
    console.error('\nversiones inmutables: ' + hallazgos.length + ' hallazgo(s).');
    process.exit(1);
  }
  const detalle = RECURSOS.map((r) => CARPETA_INMUTABLE[r.name] + '/ ' + congeladasEnDisco(r).length).join(', ');
  console.log('versiones inmutables: comprobado -- ' + revisadas + ' copias, cada una con la huella que su registro anota (' + detalle + '), 0 hallazgos');
}
