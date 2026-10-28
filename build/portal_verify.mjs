// Verifica que produccion sirva los recursos publicados y el indice que los lista -- la
// lista sale del indice, no de una cuenta escrita aca -- y DICE QUE VIO.
//
// Por que existe este archivo y no un curl dentro del workflow: el 2026-10-23 la
// publicacion de 9a31494 salio bien (el portal commiteo 161e74d a las 12:23:17 y su
// despliegue cerro verde a las 12:23:52) y el paso que verificaba dio 40 intentos con
// "(sin respuesta)" durante 13m17s y cerro avisando que produccion todavia no las
// servia. Era falso. El chequeo colapsaba tres situaciones distintas en una sola cadena
// y tiraba a /dev/null la unica senal que las separaba (el codigo HTTP, el error de
// red). Las tres son:
//
//   coincide     produccion sirve la huella que declara lo commiteado. Verde.
//   otra_huella  produccion contesta bien y sirve OTRA huella: el despliegue del portal
//                es otro flujo y puede estar corriendo. Aviso legitimo, y dice cual.
//   ilegible     no se pudo leer produccion (sin respuesta, codigo que no es 200,
//                cuerpo que no es JSON, JSON sin huella). ROJO: la publicacion ocurrio
//                y la evidencia falta, y eso no se reporta como demora de otro.
//
// Codigos de salida: 0 coincide todo, 2 solo demoras, 1 algo quedo ilegible (gana
// sobre la demora: si no se pudo mirar, no se sabe si hay demora).
//
// Corre igual en el runner y en una maquina cualquiera, con node pelado y sin curl:
//   node build/portal_verify.mjs
//   node build/portal_verify.mjs --rondas 1          <- una sola vuelta, para mirar rapido
//   node build/portal_verify.mjs --base https://...  <- otro extremo
//
// NO esta enganchado en build/build.mjs a proposito: la construccion tiene que correr
// sin red. Lo usan el paso de publicacion del workflow y el que quiera comprobar a mano
// que produccion sirve lo que este repositorio commiteo.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { raiz } from './gates_lib.mjs';
import { RECURSOS } from './index_api.mjs';

// Los recursos salen del indice y NO se vuelven a declarar aca, por la misma razon que en
// build/version_inmutable.mjs: el indice es el que declara que publica la interfaz, y dos
// listas que hay que acordarse de mantener juntas es la forma mas comun del defecto que este
// repositorio persigue. Medido el 2026-10-28, al agregar el catalogo de textos: esta lista
// estaba clavada en dos, asi que la publicacion habria preguntado a produccion por dos
// recursos de tres y habria cerrado en verde sin haber mirado el tercero (D-074).
export const ARCHIVOS = RECURSOS.map((r) => r.name);
// Y el nombre del campo donde cada recurso declara SU version sale del mismo lugar, por el
// mismo motivo: cada linea de version tiene su propio nombre de campo (catalog_version,
// corpus_version, labels_version) y una cadena de `a ?? b` escrita aca es la misma lista
// clavada en otra forma -- medido el 2026-10-28: con el catalogo de textos recien publicado,
// esa cadena no reconocia labels_version y el veredicto imprimia "(sin version declarada)"
// sobre un archivo que la declara. La huella no miente, pero el reporte si.
export const CAMPO_VERSION = Object.fromEntries(RECURSOS.map((r) => [r.name, r.version_field]));
export const INDICE = 'index.json';
// El indice se pregunta igual que los recursos, con el mismo vocabulario de tres estados,
// pero NO pasa por clasificar(): esa funcion se apoya en content_hash.value y el indice no
// tiene huella propia a proposito (D-056). Lo que se le exige es otra cosa: que las huellas
// que CITA sean las que declara lo commiteado.
export const TODOS = [...ARCHIVOS, INDICE];
export const BASE = 'https://yujin.app/urazuke/api';
export const PREFIJO_MAX = 120;

/** El principio del cuerpo, en una linea y acotado: un log no se inunda con 100 kB de HTML. */
const prefijo = (texto) => {
  const plano = String(texto ?? '').replace(/\s+/g, ' ').trim();
  return plano.length > PREFIJO_MAX ? plano.slice(0, PREFIJO_MAX) + '...' : plano;
};

/**
 * Clasifica UNA sonda contra la huella esperada. Funcion pura: las pruebas la
 * ejercitan sin red, que es la unica forma de probar los casos que no se pueden pedir
 * (un 503, una pagina de desafio, un JSON sin huella).
 * sonda: { error } o { status, cuerpo }
 */
export function clasificar(sonda, esperada, campoVersion) {
  if (sonda.error) {
    return { estado: 'ilegible', detalle: 'sin respuesta: ' + prefijo(sonda.error) };
  }
  const bytes = Buffer.byteLength(sonda.cuerpo ?? '', 'utf8');
  const cabeza = 'HTTP ' + sonda.status + ', ' + bytes + ' bytes';
  if (sonda.status !== 200) {
    return { estado: 'ilegible', detalle: cabeza + ': ' + prefijo(sonda.cuerpo) };
  }
  let json;
  try {
    json = JSON.parse(sonda.cuerpo);
  } catch {
    return { estado: 'ilegible', detalle: cabeza + ', la respuesta no es JSON: ' + prefijo(sonda.cuerpo) };
  }
  const servida = json?.content_hash?.value;
  if (typeof servida !== 'string' || !servida) {
    const version = campoVersion ? json?.[campoVersion] : undefined;
    return {
      estado: 'ilegible',
      detalle: cabeza + ', la respuesta es JSON pero no declara content_hash' + (version ? ' (version ' + version + ')' : ''),
    };
  }
  const version = campoVersion
    ? (json[campoVersion] ?? 'no declara ' + campoVersion)
    : 'sin campo de version declarado por el indice';
  if (servida === esperada) {
    return { estado: 'coincide', huella: servida, detalle: cabeza + ', version ' + version + ', huella ' + servida.slice(0, 12) };
  }
  return {
    estado: 'otra_huella',
    huella: servida,
    detalle: cabeza + ', sirve la version ' + version + ' con huella ' + servida.slice(0, 12) + ', esperabamos ' + esperada.slice(0, 12),
  };
}

/**
 * Clasifica UNA sonda del indice, con el mismo vocabulario de tres estados. Tambien es
 * pura, por el mismo motivo: los casos que importan (un indice anterior que todavia no
 * conoce un recurso, un indice que cita la huella vieja) no se pueden pedir por red.
 *
 * Un indice que cita una huella vieja no es un rojo del metodo: el despliegue del portal
 * es otro flujo y puede estar corriendo, y es exactamente el caso que `otra_huella`
 * nombra. Lo que si es rojo es no poder leerlo.
 */
export function clasificarIndice(sonda, esperadas) {
  if (sonda.error) {
    return { estado: 'ilegible', detalle: 'sin respuesta: ' + prefijo(sonda.error) };
  }
  const bytes = Buffer.byteLength(sonda.cuerpo ?? '', 'utf8');
  const cabeza = 'HTTP ' + sonda.status + ', ' + bytes + ' bytes';
  if (sonda.status !== 200) {
    return { estado: 'ilegible', detalle: cabeza + ': ' + prefijo(sonda.cuerpo) };
  }
  let json;
  try {
    json = JSON.parse(sonda.cuerpo);
  } catch {
    return { estado: 'ilegible', detalle: cabeza + ', la respuesta no es JSON: ' + prefijo(sonda.cuerpo) };
  }
  if (!Array.isArray(json?.resources) || json.resources.length === 0) {
    return { estado: 'ilegible', detalle: cabeza + ', la respuesta es JSON y no lista ningun recurso: ' + prefijo(sonda.cuerpo) };
  }
  const citadas = {};
  for (const r of json.resources) citadas[r?.name] = r?.content_hash?.value;
  const sinCitar = [];
  const distintas = [];
  for (const [nombre, esperada] of Object.entries(esperadas)) {
    const citada = citadas[nombre];
    if (typeof citada !== 'string' || !citada) sinCitar.push(nombre);
    else if (citada !== esperada) distintas.push(nombre + ' con huella ' + citada.slice(0, 12) + ', esperabamos ' + esperada.slice(0, 12));
  }
  if (sinCitar.length) {
    return { estado: 'otra_huella', detalle: cabeza + ', el indice servido no cita la huella de ' + sinCitar.join(', ') + ': puede ser un indice anterior, y el despliegue del portal es otro flujo' };
  }
  if (distintas.length) {
    return { estado: 'otra_huella', detalle: cabeza + ', el indice servido cita ' + distintas.join('; ') };
  }
  return { estado: 'coincide', detalle: cabeza + ', cita las ' + Object.keys(esperadas).length + ' huellas que declara lo commiteado' };
}

/**
 * La linea final, con la cuenta DERIVADA de los recursos que el indice declara. Decia "las
 * dos huellas" con tres publicadas (D-074): una cuenta escrita a mano en el texto de un
 * veredicto envejece igual que una lista escrita a mano, y en el unico lugar que se lee.
 */
export function lineaVeredicto(codigo, cuantos) {
  if (codigo === 0) return 'Produccion sirve las ' + cuantos + ' huellas y un indice que las cita: publicado y verificado.';
  if (codigo === 2) return 'Produccion contesta y todavia sirve otra huella: el despliegue del portal es otro flujo y puede estar corriendo.';
  return 'No se pudo leer produccion. La publicacion ocurrio; lo que falta es la evidencia de que llego.';
}

/** El veredicto de la corrida completa. Ilegible gana: si no se pudo mirar, no se sabe. */
export function codigoDeSalida(estados) {
  const valores = Object.values(estados);
  if (valores.some((e) => e === 'ilegible')) return 1;
  if (valores.some((e) => e !== 'coincide')) return 2;
  return 0;
}

/** Lo que declara lo commiteado: la huella que produccion tiene que servir. */
export function esperadas() {
  const fuera = {};
  for (const nombre of ARCHIVOS) {
    const publicado = JSON.parse(readFileSync(join(raiz, 'docs', 'html', 'api', nombre), 'utf8'));
    fuera[nombre] = publicado.content_hash.value;
  }
  return fuera;
}

async function sondear(url, timeoutMs) {
  try {
    const respuesta = await fetch(url, {
      signal: AbortSignal.timeout(timeoutMs),
      headers: { accept: 'application/json', 'cache-control': 'no-cache' },
    });
    return { status: respuesta.status, cuerpo: await respuesta.text() };
  } catch (e) {
    // El mensaje de fetch es siempre "fetch failed": el motivo esta en la causa, y es
    // justo lo que hay que poder leer (ECONNREFUSED, ETIMEDOUT, un timeout propio).
    const causa = e?.cause?.code ?? e?.cause?.message ?? '';
    return { error: [e?.name, e?.message, causa].filter(Boolean).join(' / ') };
  }
}

const dormir = (ms) => new Promise((r) => setTimeout(r, ms));
const argumento = (bandera, defecto) => {
  const i = process.argv.indexOf(bandera);
  return i > 0 && process.argv[i + 1] ? process.argv[i + 1] : defecto;
};

async function principal() {
  const base = argumento('--base', BASE).replace(/\/$/, '');
  const rondas = Number(argumento('--rondas', '15'));
  const espera = Number(argumento('--espera', '20')) * 1000;
  const timeout = Number(argumento('--timeout', '30')) * 1000;

  const quiero = esperadas();
  for (const nombre of ARCHIVOS) console.log(nombre + ': esperamos la huella ' + quiero[nombre].slice(0, 12));
  console.log(INDICE + ': esperamos que cite esas ' + ARCHIVOS.length + ' huellas (no tiene huella propia, D-056)');

  const estados = {};
  const ultimo = {};
  let pendientes = [...TODOS];

  for (let ronda = 1; ronda <= rondas && pendientes.length; ronda++) {
    // Los tres en la misma vuelta: asi una demora no duplica el reloj de pared, que es
    // lo que convirtio 20 intentos en 13 minutos.
    for (const nombre of pendientes) {
      const sonda = await sondear(base + '/' + nombre, timeout);
      const r = nombre === INDICE ? clasificarIndice(sonda, quiero) : clasificar(sonda, quiero[nombre], CAMPO_VERSION[nombre]);
      estados[nombre] = r.estado;
      ultimo[nombre] = r.detalle;
      console.log('  ' + nombre + ' vuelta ' + ronda + ': ' + r.estado + ' -- ' + r.detalle);
    }
    pendientes = pendientes.filter((n) => estados[n] !== 'coincide');
    if (pendientes.length && ronda < rondas) await dormir(espera);
  }

  console.log('--- veredicto ---');
  for (const nombre of TODOS) console.log(nombre + ': ' + estados[nombre] + ' -- ' + ultimo[nombre]);
  const codigo = codigoDeSalida(estados);
  console.log(lineaVeredicto(codigo, ARCHIVOS.length));
  process.exit(codigo);
}

if (process.argv[1] && process.argv[1].endsWith('portal_verify.mjs')) await principal();
