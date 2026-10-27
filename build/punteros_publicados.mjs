// Un puntero que el dato publica tiene que resolver, y una direccion que publica tiene que
// poder bajarla una maquina (D-069, PND-056).
//
// Por que existe, medido el 2026-10-27. El contrato de fijacion que el metodo acababa de
// publicar le decia al consumidor que contraste el par (version -> huella) "contra
// version_scheme.version_ledger", y `version_scheme` NO es una clave del publicado: vive
// solo en las fuentes. El unico que podia seguir ese puntero era quien tuviera el
// repositorio del metodo delante, que es exactamente el lector para el que la interfaz de
// datos no hace falta. Y el indice de la interfaz declaraba del registro de versiones una
// sola direccion, la pagina del blob, que ese alojamiento sirve como HTML (medido: 284852 B
// de text/html contra 11386 B de JSON en la direccion cruda), asi que el unico consumidor
// que implemento la obligacion tuvo que DERIVAR la direccion que baja. Adivinar una
// direccion es lo que el anexo prohibe, y el que tuvo que adivinarla lo reporto.
//
// Lo que exige:
//   A. cada camino de clave que un texto publicado nombra (`a.b`, `a.b.c`) resuelve en el
//      publicado donde vive, o esta en el registro de punteros cruzados y resuelve en el
//      recurso que ese registro declara, o su ultimo segmento esta en el registro de
//      sufijos que no son claves (un host, un nombre de archivo).
//   B. los dos registros no tienen entradas que sobren: cada una tiene que usarse. Que el
//      salteo sea un REGISTRO con su razon, y no una condicion escondida adentro de la
//      comprobacion, es lo que el anexo pide para una regla apagada.
//   C. del registro de versiones, el indice declara las DOS direcciones -- la que lee una
//      persona y la que baja una maquina -- para cada recurso, y la clausula publicada que
//      manda leerlas las nombra. Es la simetria productor/consumidor entre el contrato y el
//      directorio: un contrato que manda leer un campo que el directorio no publica obliga
//      a adivinar.
//   D. la cuenta no puede ser cero. Una comprobacion que reviso 0 punteros y dijo verde es
//      el defecto que este repositorio ya pago cuatro veces.
//   E. un campo de la configuracion de proyecto que dice "uno de <enum>" lo nombra por un
//      camino que resuelve --no por el nombre suelto-- y el publicado lleva ese enum
//      RESUELTO, con su lista de valores. Es la misma regla que A, para la forma que A no
//      sabia ver: un token sin punto. Y es simetrica: un enum publicado que ningun campo
//      nombra tambien es hallazgo, porque es una copia sin consumidor.
//
// Lo que NO guarda, dicho para que nadie le atribuya mas de lo que hace: no verifica que la
// direccion cruda CONTESTE -- eso es red, y la construccion corre sin red (lo pregunta
// build/portal_verify.mjs contra produccion) --, ni que el texto de un puntero diga la
// verdad sobre lo que hay del otro lado. Resuelve caminos, no significados.
//
// Las comprobaciones son puras, para que tests/punteros_publicados_en_rojo.test.mjs pueda
// alimentarlas con un publicado mutilado y exigir que caigan.
// Uso: node build/punteros_publicados.mjs
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { raiz, esLineaDeComandos } from './gates_lib.mjs';

export const DIR = join(raiz, 'docs', 'html', 'api');
export const INDICE = 'index.json';

// Un camino de clave: dos o mas segmentos en minuscula separados por punto. La forma se
// eligio medida sobre el publicado de hoy: siete tokens en los dos recursos, y los unicos
// que no resuelven son los que estos dos registros nombran.
export const RE_CAMINO = /\b[a-z][a-z0-9_]*(?:\.[a-z][a-z0-9_]*)+\b/g;

// Lo que parece un camino de clave y no lo es. Por ultimo segmento, porque es la unica
// parte que lo distingue sin leer la oracion.
export const SUFIJOS_NO_CLAVE = [
  { sufijo: 'com', razon: 'un nombre de alojamiento (github.com): la direccion del repositorio de origen, no una clave' },
  { sufijo: 'json', razon: 'un nombre de archivo (baseline.json, adapters.json, index.json): el dato nombra sus propias fuentes y su propio directorio' },
];

// Punteros que a proposito apuntan a OTRO recurso publicado. Son legitimos y hay que
// declararlos uno por uno: el que esta hoy es el de D-067, que saco la lista de idiomas de
// las oraciones y la dejo declarada una sola vez, en el catalogo de compuertas.
export const PUNTEROS_CRUZADOS = [
  {
    camino: 'languages.prose_versions',
    desde: 'prompts.json',
    resuelve_en: 'gates.json',
    razon: 'D-067: la lista de idiomas de la prosa se declara UNA vez, en el catalogo de compuertas, y el corpus de prompts apunta ahi en vez de contar',
  },
];

/** Lo publicado en docs/html/api/, por nombre. El indice aparte: es el directorio. */
export function leerPublicados(dir = DIR) {
  const out = { recursos: {}, indice: null };
  for (const nombre of readdirSync(dir).filter((f) => f.endsWith('.json')).sort()) {
    const json = JSON.parse(readFileSync(join(dir, nombre), 'utf8'));
    if (nombre === INDICE) out.indice = json;
    else out.recursos[nombre] = json;
  }
  return out;
}

/** Cada token de camino de clave que aparece en un texto del payload, con donde aparece. */
export function tokensDe(payload) {
  const out = [];
  (function rec(v, ruta) {
    if (typeof v === 'string') {
      for (const t of v.match(RE_CAMINO) ?? []) out.push({ token: t, en: ruta || '(raiz)' });
    } else if (v && typeof v === 'object') {
      for (const k of Object.keys(v)) rec(v[k], ruta ? ruta + '.' + k : k);
    }
  })(payload, '');
  return out;
}

/** Resuelve un camino contra un payload. */
export function resuelve(payload, camino) {
  let v = payload;
  for (const seg of camino.split('.')) {
    if (!v || typeof v !== 'object' || !(seg in v)) return false;
    v = v[seg];
  }
  return true;
}

const sufijoDe = (t) => t.split('.').pop();

/** A: los punteros que no resuelven en ninguna parte declarada. */
export function punterosQueNoResuelven(pub = leerPublicados()) {
  const hallazgos = [];
  for (const [nombre, payload] of Object.entries(pub.recursos)) {
    for (const { token, en } of tokensDe(payload)) {
      if (SUFIJOS_NO_CLAVE.some((s) => s.sufijo === sufijoDe(token))) continue;
      if (resuelve(payload, token)) continue;
      const cruzado = PUNTEROS_CRUZADOS.find((c) => c.camino === token && c.desde === nombre);
      if (cruzado) {
        const destino = pub.recursos[cruzado.resuelve_en];
        if (destino && resuelve(destino, token)) continue;
        hallazgos.push({ recurso: nombre, en, token, por_que: 'el registro dice que resuelve en ' + cruzado.resuelve_en + ' y ahi no resuelve' });
        continue;
      }
      hallazgos.push({ recurso: nombre, en, token, por_que: 'no es una clave de ' + nombre + ' y no esta registrado como puntero cruzado' });
    }
  }
  return hallazgos;
}

/** B: registros sin usar. Una exclusion que no se usa es una condicion escondida. */
export function registrosSinUsar(pub = leerPublicados()) {
  const tokens = [];
  for (const [nombre, payload] of Object.entries(pub.recursos)) {
    for (const { token } of tokensDe(payload)) tokens.push({ nombre, token });
  }
  const hallazgos = [];
  for (const s of SUFIJOS_NO_CLAVE) {
    if (!tokens.some((t) => sufijoDe(t.token) === s.sufijo)) {
      hallazgos.push({ registro: 'SUFIJOS_NO_CLAVE', entrada: s.sufijo, por_que: 'ningun texto publicado trae un token con ese sufijo' });
    }
  }
  for (const c of PUNTEROS_CRUZADOS) {
    if (!tokens.some((t) => t.nombre === c.desde && t.token === c.camino)) {
      hallazgos.push({ registro: 'PUNTEROS_CRUZADOS', entrada: c.desde + ' -> ' + c.camino, por_que: 'ese puntero ya no aparece en el publicado' });
    }
  }
  return hallazgos;
}

/** C: el registro de versiones se puede bajar, y el contrato nombra el campo que lo dice. */
export function simetriaDelRegistroDeVersiones(pub = leerPublicados()) {
  const hallazgos = [];
  const indice = pub.indice;
  if (!indice) return [{ donde: 'index.json', por_que: 'no hay indice publicado: no haber podido mirar es rojo' }];
  for (const r of indice.resources ?? []) {
    const reg = r.version_ledger;
    if (!reg?.url) {
      hallazgos.push({ donde: 'index.json ' + r.name, por_que: 'el registro de versiones no declara la pagina que lee una persona (url)' });
    }
    if (!reg?.fetch_url) {
      hallazgos.push({ donde: 'index.json ' + r.name, por_que: 'el registro de versiones no declara la direccion que baja una maquina (fetch_url), asi que el consumidor la deriva: una direccion derivada es una direccion inventada' });
    } else if (reg.path && !reg.fetch_url.endsWith(reg.path)) {
      hallazgos.push({ donde: 'index.json ' + r.name, por_que: 'fetch_url no termina en el path que el propio registro declara: ' + reg.fetch_url });
    }
  }
  const fijacion = pub.recursos['gates.json']?.pinning?.consumer_contract?.must_contrast;
  if (!fijacion) {
    hallazgos.push({ donde: 'gates.json#pinning', por_que: 'el contrato de fijacion no declara contra que contrasta el consumidor' });
  } else {
    for (const campo of ['url', 'fetch_url']) {
      if (!fijacion.includes(campo)) {
        hallazgos.push({ donde: 'gates.json#pinning.consumer_contract.must_contrast', por_que: 'la clausula manda contrastar y no nombra el campo ' + campo + ' del indice, asi que no dice de donde se saca la direccion' });
      }
    }
  }
  return hallazgos;
}

// Lo que parece un camino y no lo es porque no lleva punto: "One of <enum>". La forma se
// eligio medida el 2026-10-27 -- el dia DESPUES de escribir la regla de arriba, el campo
// `communication_depth` entro diciendo "One of communication_depth" y ninguna clave del
// publicado llevaba ese nombre, asi que una herramienta que quisiera validar la profundidad
// declarada tenia que ADIVINAR los tres valores y solo veia dos mencionados en prosa inglesa:
// una lista parcial que se lee como completa, que es peor que ninguna. RE_CAMINO no lo vio y
// dijo la verdad: para los punteros que sabe ver, no habia ninguno roto (PND-059, D-071).
export const RE_ENUM_SUELTO = /\bOne of ([a-z][a-z0-9_]*)\b/g;
export const RE_ENUM_RESUELTO = /`project_config\.enums\.([a-z][a-z0-9_]*)`/g;

/** E: un campo que dice "uno de <enum>" lo nombra por un camino que resuelve, y el bloque esta. */
export function enumsDeLaConfiguracion(pub = leerPublicados()) {
  const hallazgos = [];
  const pc = pub.recursos['gates.json']?.project_config;
  if (!pc) return [{ donde: 'gates.json#project_config', por_que: 'el publicado no lleva la configuracion de proyecto: no haber podido mirar es rojo' }];
  const campos = pc.fields ?? {};
  const nombrados = [];
  for (const [campo, texto] of Object.entries(campos)) {
    if (typeof texto !== 'string') continue;
    for (const m of texto.matchAll(RE_ENUM_SUELTO)) {
      hallazgos.push({ donde: 'gates.json#project_config.fields.' + campo, token: m[1],
        por_que: 'nombra el enum por su nombre suelto, que no es una clave del publicado: el consumidor tiene que adivinar la lista de valores' });
    }
    for (const m of texto.matchAll(RE_ENUM_RESUELTO)) {
      nombrados.push(m[1]);
      const lista = pc.enums?.[m[1]];
      if (!Array.isArray(lista) || lista.length === 0) {
        hallazgos.push({ donde: 'gates.json#project_config.fields.' + campo, token: m[1],
          por_que: 'el campo nombra ese enum y project_config.enums no lo publica resuelto' });
      }
    }
  }
  for (const nombre of Object.keys(pc.enums ?? {})) {
    if (!nombrados.includes(nombre)) {
      hallazgos.push({ donde: 'gates.json#project_config.enums', token: nombre,
        por_que: 'el publicado lleva ese enum resuelto y ningun campo lo nombra: un bloque que sobra es una copia sin consumidor' });
    }
  }
  if (!pc.enums) {
    hallazgos.push({ donde: 'gates.json#project_config', por_que: 'no publica el bloque de enums resuelto, asi que ningun campo puede nombrar una lista de valores que resuelva' });
  } else if (!pc.enums_what) {
    hallazgos.push({ donde: 'gates.json#project_config', por_que: 'publica enums y no dice que son' });
  }
  return hallazgos;
}

/** Cuantos enums de configuracion se revisaron. Cero seria la comprobacion que no miro nada. */
export function cuentaDeEnums(pub = leerPublicados()) {
  const pc = pub.recursos['gates.json']?.project_config;
  return Object.keys(pc?.enums ?? {}).length;
}

export function cuenta(pub = leerPublicados()) {
  let n = 0;
  for (const payload of Object.values(pub.recursos)) n += tokensDe(payload).length;
  return { tokens: n, recursos: Object.keys(pub.recursos).length };
}

if (esLineaDeComandos(import.meta.url)) {
  const pub = leerPublicados();
  const hallazgos = [
    ...punterosQueNoResuelven(pub),
    ...registrosSinUsar(pub),
    ...simetriaDelRegistroDeVersiones(pub),
    ...enumsDeLaConfiguracion(pub),
  ];
  const c = cuenta(pub);
  const e = cuentaDeEnums(pub);
  for (const h of hallazgos) console.error('  HALLAZGO ' + JSON.stringify(h));
  if (hallazgos.length || c.tokens === 0 || e === 0) {
    console.error('punteros: ' + (c.tokens === 0
      ? 'cero punteros revisados, que es el defecto que esta comprobacion existe para evitar'
      : e === 0
        ? 'cero enums de configuracion revisados: el publicado no lleva ninguno resuelto'
        : hallazgos.length + ' hallazgo(s)'));
    process.exit(1);
  }
  console.log('punteros: comprobado -- ' + c.tokens + ' punteros en ' + c.recursos + ' recursos publicados, '
    + e + ' enum(s) de configuracion resuelto(s), 0 hallazgos');
}
