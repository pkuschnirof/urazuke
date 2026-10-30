// Una cifra que el nivel de datos escribe sobre si mismo se DERIVA del dato (D-077, PND-064).
//
// Por que existe, medido el 2026-10-30 sobre este arbol. El documento generado
// `docs/COMPUERTAS.md` decia "The four that block with a **human red**" y, a continuacion,
// listaba CINCO identificadores: la lista sale del dato y el numero estaba escrito a mano. Y el
// numero no era lo unico mal -- de esos cinco, uno AVISA y no bloquea, asi que la frase tambien
// atribuia una severidad que el dato no declara. La oracion era cierta el dia que se escribio y
// dejo de serlo cuando UX-28 entro (D-070, 2026-10-27), sin que cayera ninguna prueba, en un
// documento que se publica y que dice de si mismo "This document is generated. Do not edit it".
//
// Es la forma mas barata del defecto que el metodo persigue en todas las otras capas: dos copias
// del mismo hecho, una que se actualiza sola y otra que no. Y es peor que las otras dos copias,
// porque esta vive adentro del artefacto que el consumidor lee como autoridad.
//
// Lo que exige:
//   A. toda cifra escrita junto al nombre de una coleccion que el dato declara es la cuenta REAL
//      de esa coleccion, en todo el universo de abajo.
//   B. el mapa de colecciones NO se escribe: se deriva de las fuentes -- toda clave de arreglo a
//      profundidad 2 o menos de gates/*.json --, asi que una coleccion nueva queda vigilada el
//      dia que entra y no el dia que alguien se acuerda de agregarla a una lista. Es la leccion
//      de D-071: una guarda que solo reconoce las formas que alguien enumero dice "0 hallazgos"
//      con razon y no mira lo que importa.
//   C. los alias -- la palabra que la prosa usa cuando no es el nombre de la clave -- son un
//      registro con su razon, y cada alias resuelve a una coleccion que existe.
//   D. simetria del registro: toda exencion tiene que seguir salteando algo real. Una exencion
//      que ya no selecciona nada es una guarda que quedo apagada sobre un archivo que cambio de
//      forma, y no se nota nunca, porque sigue dando verde.
//
// Lo que NO exige, dicho aca y no cuando falle: que las cifras de la PROSA del metodo esten bien.
// La prosa es voz del autor, se escribe en castellano y sus cifras son parte de lo que cuenta;
// esta guarda mira el nivel de datos (D-051) y el documento que se genera de el. Tampoco mira si
// una cifra esta BIEN DERIVADA en el programa que la escribe: mira el resultado publicado, que es
// lo que un consumidor lee.
//
// Uso: node build/cifras_derivadas.mjs
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { raiz, esLineaDeComandos, cardinal } from './gates_lib.mjs';

/**
 * El universo, ENUMERADO (D-064). Una ausencia no se afirma desde una busqueda que fallo: se
 * enumera lo que se miro. Son las dos puntas donde una cifra del nivel de datos puede escribirse
 * -- las fuentes que se mantienen a mano y los artefactos que se generan de ellas -- porque el
 * arreglo de raiz es distinto en cada una: en un programa la cifra se calcula, en un json que una
 * persona edita no se puede, y ahi la guarda ES el arreglo.
 */
export const UNIVERSO = [
  { ruta: 'gates/catalog.json', clase: 'fuente' },
  { ruta: 'gates/schema.json', clase: 'fuente' },
  { ruta: 'gates/evaluators.json', clase: 'fuente' },
  { ruta: 'gates/steps.json', clase: 'fuente' },
  { ruta: 'gates/stations.json', clase: 'fuente' },
  { ruta: 'gates/heuristics.json', clase: 'fuente' },
  { ruta: 'gates/adapters.json', clase: 'fuente' },
  { ruta: 'labels/catalog.json', clase: 'fuente' },
  { ruta: 'prompts/catalog.json', clase: 'fuente' },
  { ruta: 'docs/COMPUERTAS.md', clase: 'generado' },
  { ruta: 'docs/html/api/gates.json', clase: 'publicado' },
  { ruta: 'docs/html/api/prompts.json', clase: 'publicado' },
  { ruta: 'docs/html/api/labels.json', clase: 'publicado' },
  { ruta: 'docs/html/api/index.json', clase: 'publicado' },
];

/** Las fuentes de las que se DERIVAN las colecciones. El congelado no entra (ver EXENTOS). */
export const FUENTES_DE_COLECCIONES = UNIVERSO
  .filter((u) => u.clase === 'fuente' && u.ruta.startsWith('gates/'))
  .map((u) => u.ruta);

/**
 * Lo que esta guarda NO mira, con su razon escrita. Es un registro y no una condicion escondida,
 * que es lo que el Anexo H pide para cualquier regla apagada; y la comprobacion D exige que cada
 * entrada siga salteando algo real, para que una exencion no sobreviva al archivo que la justifico.
 */
export const EXENTOS = [
  {
    id: 'base-congelada',
    forma: 'archivo',
    que: 'gates/baseline.json',
    razon: 'el congelado no se edita, y su texto esta en el castellano en que quedo congelado '
      + '(D-051, base_is_frozen). Una cifra de ahi no se puede derivar sin romper la diferencia '
      + 'cero, que es justo lo que el archivo existe para demostrar.',
  },
  {
    id: 'registro-fechado',
    forma: 'camino',
    que: /(^|\.)changelog\[\d+\]\./,
    razon: 'una entrada del registro de versiones es un registro FECHADO y append-only: lleva las '
      + 'palabras de su dia y la cifra que era cierta ese dia (D-053, D-061). Medido: la entrada '
      + 'de 2026.10.1 dice "the forty-five rules of Annex H" y hoy son cuarenta y seis, porque '
      + 'UX-28 entro cuatro dias despues. Derivarla seria reescribir la historia.',
  },
  {
    id: 'historia-del-esquema',
    forma: 'camino',
    que: /^history\./,
    razon: 'gates/schema.json#history dice que trajo cada version del esquema el dia que entro, y '
      + 'es la misma clase de registro que el changelog. Medido: la entrada "2" habla de las '
      + 'cuarenta y cinco reglas que entraron con el esquema 2 el 2026-10-23, y UX-28 se sumo '
      + 'despues dentro del mismo esquema. La cifra describe el acto, no el estado de hoy.',
  },
  {
    id: 'enunciado-del-anexo',
    forma: 'camino',
    que: /\.statement(\.|\[|$)/,
    razon: 'el enunciado de una regla es PROSA del Anexo H, vive en una sola copia ahi (D-044) y '
      + 'aca viaja extraido. Una cifra adentro de un enunciado ("one acceptance criterion per '
      + 'profile") es parte de lo que la regla exige, no una cuenta de una coleccion.',
  },
  {
    id: 'cadenas-extraidas',
    forma: 'camino',
    que: /^labels\./,
    razon: 'las cadenas de labels.json se extraen de la prosa del metodo y viajan tal cual '
      + '(D-074). Su guarda es la que exige que cada una aparezca LITERAL en el documento del que '
      + 'dice salir; exigirles una cifra derivada seria exigirle al autor que no cuente en prosa.',
  },
  {
    id: 'texto-de-los-prompts',
    forma: 'camino',
    que: /^contracts\./,
    razon: 'el texto de un prompt es prosa del contrato, generada de los contratos castellanos y '
      + 'verificada aparte por build/prompts.mjs. Sus cifras son parte de lo que el prompt le '
      + 'pide al modelo ("no more than five lines"), no cuentas de colecciones del dato.',
  },
  {
    id: 'filas-de-tabla',
    forma: 'linea',
    que: 'las lineas del documento generado que empiezan con |',
    razon: 'las filas de tabla de docs/COMPUERTAS.md llevan el enunciado de cada regla, que es la '
      + 'misma prosa del anexo de la exencion de arriba. Medido en este arbol: 27 cifras en filas '
      + 'de tabla, todas adentro de un enunciado. La narrativa del documento, que es lo que el '
      + 'generador escribe de su cuenta, SI se mira.',
  },
];

/**
 * Los alias: la palabra que un texto usa cuando no es el nombre de la clave. Es un registro con
 * su razon, y la comprobacion C exige que cada uno resuelva a una coleccion que existe -- un
 * alias colgante es un puntero colgante, el defecto de D-069 en otra forma.
 */
export const ALIAS = [
  {
    palabra: 'languages',
    coleccion: 'prose versions',
    razon: 'el metodo declara sus propios idiomas de prosa UNA sola vez, en '
      + 'catalog.languages.prose_versions (D-067), y los textos que los cuentan dicen "languages" '
      + 'porque es la palabra del lector. El nombre de la clave dice de donde salen; la prosa del '
      + 'dato dice que son.',
  },
  {
    palabra: 'evaluator names',
    coleccion: 'evaluators',
    razon: 'el `scope` de labels.json cuenta los NOMBRES de evaluador, que es uno por evaluador: '
      + 'es la misma coleccion dicha por lo que el catalogo de textos no publica de ella.',
  },
];

/* ------------------------------------------------------------------ *
 * B. Las colecciones, derivadas del dato
 * ------------------------------------------------------------------ */

/**
 * Toda clave de arreglo a profundidad 2 o menos de un objeto, con su cuenta. La profundidad se
 * corta ahi a proposito: una coleccion que el dato DECLARA vive arriba (steps, rules, anchors),
 * y mas abajo estan las listas de cada elemento -- los peldanos que ancla una regla, los
 * evaluadores de un paso -- que comparten el nombre con otra cuenta y convertirian cada mencion
 * en una ambiguedad.
 */
export function arreglosDe(nodo, camino = '', prof = 1, salida = []) {
  if (prof > 2 || !nodo || typeof nodo !== 'object' || Array.isArray(nodo)) return salida;
  for (const [clave, valor] of Object.entries(nodo)) {
    if (Array.isArray(valor)) salida.push({ clave: camino + clave, hoja: clave, cuenta: valor.length });
    else if (valor && typeof valor === 'object') arreglosDe(valor, camino + clave + '.', prof + 1, salida);
  }
  return salida;
}

/** El sustantivo de una clave: `prior_inputs` -> `prior inputs`. */
export const sustantivoDe = (clave) => clave.replace(/_/g, ' ');

/**
 * El mapa sustantivo -> cuenta, derivado de las fuentes. Solo las claves de forma plural: una
 * clave singular (`pinned_pair`, `communication_depth`) no es el nombre de una coleccion contada.
 * Un sustantivo con dos cuentas distintas queda marcado AMBIGUO y no se compara contra ninguna:
 * la guarda no adivina cual de las dos quiso decir el texto, lo dice y pide desambiguar.
 */
export function colecciones(arbolDeFuentes) {
  const mapa = new Map();
  for (const [ruta, objeto] of Object.entries(arbolDeFuentes)) {
    for (const a of arreglosDe(objeto)) {
      if (!/s$/.test(a.hoja)) continue;
      const nombre = sustantivoDe(a.hoja);
      const previo = mapa.get(nombre);
      if (!previo) { mapa.set(nombre, { cuenta: a.cuenta, origen: [ruta + '#' + a.clave], ambigua: false }); continue; }
      previo.origen.push(ruta + '#' + a.clave);
      if (previo.cuenta !== a.cuenta) previo.ambigua = true;
    }
  }
  return mapa;
}

/** Las colecciones con sus alias ya resueltos. Devuelve { mapa, hallazgos }. */
export function coleccionesConAlias(arbolDeFuentes) {
  const mapa = colecciones(arbolDeFuentes);
  const hallazgos = [];
  for (const a of ALIAS) {
    if (!a.razon || a.razon.length < 40) {
      hallazgos.push('el alias "' + a.palabra + '" no trae su razon escrita: un alias sin razon es una guarda que alguien ensancho sin decir por que');
    }
    const destino = mapa.get(a.coleccion);
    if (!destino) {
      hallazgos.push('el alias "' + a.palabra + '" apunta a la coleccion "' + a.coleccion
        + '", que el dato no declara. Un alias colgante es un puntero colgante: o la coleccion cambio de nombre, o el alias sobra.');
      continue;
    }
    if (mapa.has(a.palabra) && mapa.get(a.palabra).cuenta !== destino.cuenta) {
      hallazgos.push('el alias "' + a.palabra + '" tapa una coleccion real con otra cuenta: el dato declara '
        + a.palabra + ' con ' + mapa.get(a.palabra).cuenta + ' y el alias lo manda a ' + a.coleccion + ' con ' + destino.cuenta);
      continue;
    }
    mapa.set(a.palabra, { ...destino, origen: [...destino.origen, 'alias de ' + a.coleccion] });
  }
  return { mapa, hallazgos };
}

/* ------------------------------------------------------------------ *
 * A. Las cifras escritas, contra la cuenta real
 * ------------------------------------------------------------------ */

const CARDINALES = new Map();
for (let n = 0; n <= 99; n += 1) CARDINALES.set(cardinal(n), n);

/** El numero que escribe un texto, en cardinal ingles o en digitos. null si no es ninguno. */
export function numeroDe(escrito) {
  const limpio = escrito.toLowerCase();
  if (CARDINALES.has(limpio)) return CARDINALES.get(limpio);
  if (/^\d+$/.test(limpio)) return Number(limpio);
  return null;
}

/**
 * Las menciones `<numero> <coleccion>` de un texto. El numero tiene que ir INMEDIATAMENTE antes
 * del sustantivo, sin ninguna palabra en el medio, y las dos razones se midieron contra este
 * arbol. Sin esa exigencia, "sixteen hash covers" se lee como una cuenta de `covers`, que son
 * seis; y "one of steps, stations or rules" --el `keyed_by` de labels.json, que ENUMERA los
 * valores posibles-- se lee como "un peldano" y reclama veinticuatro. Un numero separado de su
 * sustantivo por una palabra casi nunca lo cuenta: selecciona uno, o cuenta un subconjunto. Lo
 * que el metodo escribe cuando quiere contar un subconjunto es la forma larga, con las dos
 * cifras ("five of the forty-six rules"), y ahi la que se mide es la de la coleccion.
 *
 * El sustantivo mas largo gana, para que `hash covers` no se lea como `covers`.
 */
export function menciones(texto, mapa) {
  const nombres = [...mapa.keys()].sort((a, b) => b.length - a.length);
  if (!nombres.length) return [];
  const escapar = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const numero = String.raw`[a-z]+(?:-[a-z]+)?|\d+`;
  const re = new RegExp(String.raw`\b(` + numero + String.raw`)\s+(`
    + nombres.map(escapar).join('|') + String.raw`)\b`, 'gi');
  const salida = [];
  for (const m of texto.matchAll(re)) {
    const n = numeroDe(m[1]);
    if (n === null) continue;
    salida.push({ escrito: m[1], numero: n, coleccion: m[2].toLowerCase(), frase: m[0] });
  }
  return salida;
}

/* ------------------------------------------------------------------ *
 * A2. Las cifras pegadas a una enumeracion de identificadores
 * ------------------------------------------------------------------ *
 * La comprobacion A no alcanza, y esto se midio: la frase que origino todo esto --"The four
 * that block with a **human red** -- CQ-12, CQ-14, UX-22, UX-27, UX-28 --"-- lleva el numero
 * pegado a "that" y no al nombre de ninguna coleccion, asi que A no la ve. Lo que la delata es
 * otra cosa, y es general: un numero al lado de una ENUMERACION de identificadores es la cuenta
 * de esa enumeracion. La lista sale del dato; el numero, si esta escrito, se desincroniza.
 *
 * Se mide apretado, porque la forma suelta ("un numero en algun lugar antes de una lista de
 * ids") daba cuatro falsos positivos en este arbol: los extremos de un rango ("CQ-01 to CQ-18"),
 * el numero de una subenumeracion entre parentesis, y un "(step 2)" que coincidia de casualidad
 * con una lista de dos. De ahi las tres exigencias: la enumeracion es una CORRIDA contigua de
 * ids separados solo por coma, "and" u "or" --un rango la corta--; el candidato es el PRIMER
 * numero hacia atras que no esta ya explicado por la comprobacion A (un numero seguido del
 * nombre de una coleccion es cuenta de la coleccion, no de la lista) ni CALIFICADO por la
 * palabra que lo precede ("step 2", "schema 2", "section 7" nombran una cosa, no cuentan una);
 * y tiene que estar dentro de una ventana de diez palabras.
 */
export const CALIFICADORES = ['step', 'steps', 'station', 'schema', 'version', 'section', 'row',
  'line', 'lines', 'part', 'annex', 'd', 'pnd', 'ux', 'cq', 'figure', 'item', 'number'];

/** Todo `id` de los elementos de las colecciones del dato. Derivado, no escrito. */
export function identificadoresDeclarados(arbolDeFuentes) {
  const ids = new Set();
  for (const objeto of Object.values(arbolDeFuentes)) {
    for (const a of arreglosDe(objeto)) {
      const valor = a.clave.split('.').reduce((n, c) => (n == null ? n : n[c]), objeto);
      if (!Array.isArray(valor)) continue;
      for (const elemento of valor) {
        if (elemento && typeof elemento === 'object' && typeof elemento.id === 'string') ids.add(elemento.id);
      }
    }
  }
  return ids;
}

/**
 * Las corridas de dos o mas identificadores contiguos de un texto, con la posicion donde
 * empieza cada una. Un "to" o cualquier otra palabra entre dos ids corta la corrida, que es lo
 * que distingue una enumeracion de un rango.
 */
export function corridasDe(texto, ids) {
  if (!ids.size) return [];
  const escapar = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const uno = [...ids].sort((a, b) => b.length - a.length).map(escapar).join('|');
  const re = new RegExp(String.raw`\b(?:` + uno + String.raw`)\b(?:\s*(?:,|,?\s+and|,?\s+or)\s*(?:` + uno + String.raw`)\b)+`, 'g');
  return [...texto.matchAll(re)].map((m) => ({
    desde: m.index,
    frase: m[0],
    cuenta: m[0].split(/\s*(?:,|,?\s+and\b|,?\s+or\b)\s*/).filter(Boolean).length,
  }));
}

/**
 * El numero que una corrida tiene antes, ya filtrado. Devuelve null cuando no hay candidato: una
 * enumeracion sin numero escrito al lado es exactamente lo que esta guarda quiere que haya.
 */
export function candidatoDe(texto, desde, mapa) {
  const antes = texto.slice(0, desde);
  const palabras = antes.split(/\s+/).filter(Boolean);
  const ventana = palabras.slice(-10);
  for (let i = ventana.length - 1; i >= 0; i -= 1) {
    const crudo = ventana[i].replace(/^[^\w-]+|[^\w-]+$/g, '');
    const n = numeroDe(crudo);
    if (n === null) continue;
    const previa = (ventana[i - 1] ?? '').replace(/[^\w-]/g, '').toLowerCase();
    if (CALIFICADORES.includes(previa)) return null;
    const siguiente = (ventana[i + 1] ?? '').replace(/[^\w-]/g, '').toLowerCase();
    if (siguiente && mapa.has(siguiente)) continue;
    return { numero: n, escrito: crudo };
  }
  return null;
}

/* ------------------------------------------------------------------ *
 * El recorrido del universo
 * ------------------------------------------------------------------ */

const exencionDeCamino = (camino) => EXENTOS.find((e) => e.forma === 'camino' && e.que.test(camino));
const exencionDeLinea = () => EXENTOS.find((e) => e.forma === 'linea');

/** Los textos que se miran de un json ya parseado, con su camino. Cuenta las exenciones que usa. */
export function textosDeJson(nodo, usadas, camino = '', salida = []) {
  if (typeof nodo === 'string') {
    const e = exencionDeCamino(camino);
    if (e) { usadas.set(e.id, (usadas.get(e.id) ?? 0) + 1); return salida; }
    salida.push({ camino, texto: nodo });
    return salida;
  }
  if (Array.isArray(nodo)) {
    nodo.forEach((v, i) => textosDeJson(v, usadas, camino + '[' + i + ']', salida));
    return salida;
  }
  if (nodo && typeof nodo === 'object') {
    for (const [clave, valor] of Object.entries(nodo)) {
      textosDeJson(valor, usadas, camino ? camino + '.' + clave : clave, salida);
    }
  }
  return salida;
}

/** Los textos que se miran de un markdown generado: la narrativa, no las filas de tabla. */
export function textosDeMarkdown(texto, usadas) {
  const salida = [];
  texto.replace(/\r\n/g, '\n').split('\n').forEach((linea, i) => {
    if (linea.trim().startsWith('|')) {
      const e = exencionDeLinea();
      if (e) usadas.set(e.id, (usadas.get(e.id) ?? 0) + 1);
      return;
    }
    salida.push({ camino: 'linea ' + (i + 1), texto: linea });
  });
  return salida;
}

/**
 * La comprobacion entera sobre un arbol ya leido. `arbol` es { ruta: texto } y `presentes` es el
 * conjunto de rutas que existen en disco (para la exencion de archivo). Funcion pura: la prueba
 * en rojo le da de comer un arbol mutilado y exige que caiga nombrando lo suyo.
 */
export function comprobar(arbol, presentes = new Set()) {
  const hallazgos = [];
  const usadas = new Map();

  /* Las fuentes, parseadas una vez: de ahi salen las colecciones. */
  const fuentes = {};
  for (const ruta of FUENTES_DE_COLECCIONES) {
    if (!(ruta in arbol)) { hallazgos.push(ruta + ': no se pudo leer, y no haber podido mirar es rojo y no verde'); continue; }
    try { fuentes[ruta] = JSON.parse(arbol[ruta]); }
    catch (e) { hallazgos.push(ruta + ': no es json valido (' + e.message + ')'); }
  }
  if (!Object.keys(fuentes).length) {
    return { hallazgos: [...hallazgos, 'no se pudo derivar ninguna coleccion: sin el dato, esta guarda no mide nada y decir cero hallazgos seria el defecto de D-057'], mapa: new Map(), mirados: 0, mediciones: 0 };
  }

  const { mapa, hallazgos: deAlias } = coleccionesConAlias(fuentes);
  hallazgos.push(...deAlias);
  const ids = identificadoresDeclarados(fuentes);

  /* A. cada mencion, contra la cuenta real. */
  let mirados = 0;
  let mediciones = 0;
  for (const entrada of UNIVERSO) {
    const texto = arbol[entrada.ruta];
    if (texto === undefined) {
      hallazgos.push(entrada.ruta + ': no se pudo leer, y no haber podido mirar es rojo y no verde (D-058)');
      continue;
    }
    let piezas;
    if (entrada.ruta.endsWith('.md')) {
      piezas = textosDeMarkdown(texto, usadas);
    } else {
      let objeto;
      try { objeto = JSON.parse(texto); }
      catch (e) { hallazgos.push(entrada.ruta + ': no es json valido (' + e.message + ')'); continue; }
      piezas = textosDeJson(objeto, usadas);
    }
    mirados += 1;
    for (const pieza of piezas) {
      for (const m of menciones(pieza.texto, mapa)) {
        const real = mapa.get(m.coleccion);
        mediciones += 1;
        if (real.ambigua) {
          hallazgos.push(entrada.ruta + ' ' + pieza.camino + ': "' + m.frase + '" nombra una coleccion que el dato declara con dos cuentas distintas ('
            + real.origen.join(', ') + '). Desambigua el nombre o la fuente: la guarda no adivina cual quiso decir.');
          continue;
        }
        if (m.numero !== real.cuenta) {
          hallazgos.push(entrada.ruta + ' ' + pieza.camino + ': dice "' + m.frase + '" y el dato declara '
            + real.cuenta + ' (' + real.origen.join(', ') + '). '
            + (entrada.clase === 'fuente'
              ? 'Es una fuente que se mantiene a mano: corregi la cifra, o si es un registro fechado agregalo al registro de exenciones con su razon.'
              : 'Es un artefacto que se genera: la cifra se deriva del dato en el programa que lo escribe, no se escribe ahi.'));
        }
      }
      /* A2. una cifra pegada a una enumeracion de identificadores es la cuenta de la enumeracion. */
      for (const corrida of corridasDe(pieza.texto, ids)) {
        const candidato = candidatoDe(pieza.texto, corrida.desde, mapa);
        if (!candidato) continue;
        mediciones += 1;
        if (candidato.numero !== corrida.cuenta) {
          hallazgos.push(entrada.ruta + ' ' + pieza.camino + ': dice "' + candidato.escrito + '" al lado de una enumeracion de '
            + corrida.cuenta + ' identificadores (' + corrida.frase + '). La lista sale del dato y el numero esta escrito: '
            + (entrada.clase === 'fuente'
              ? 'corregi la cifra, o agregala al registro de exenciones con su razon si es un registro fechado.'
              : 'derivala de la misma coleccion de la que sale la lista, en el programa que escribe el artefacto.'));
        }
      }
    }
  }

  /* C. toda exencion tiene su razon escrita. */
  for (const e of EXENTOS) {
    if (!e.razon || e.razon.length < 40) {
      hallazgos.push('la exencion ' + e.id + ' no trae su razon escrita: una exencion sin razon es una guarda que se apago sola');
    }
  }

  /* D. simetria: toda exencion sigue salteando algo real. */
  for (const e of EXENTOS) {
    if (e.forma === 'archivo') {
      if (!presentes.has(e.que)) {
        hallazgos.push('la exencion ' + e.id + ' saltea ' + e.que + ', que no esta en el arbol. '
          + 'Una exencion sobre un archivo que ya no existe es una guarda apagada sin registro: borrala o arregla la ruta.');
      }
      continue;
    }
    if (!usadas.get(e.id)) {
      hallazgos.push('la exencion ' + e.id + ' no salteo nada en todo el universo. '
        + 'Una exencion que ya no selecciona nada sobrevivio al archivo que la justificaba, y sigue dando verde: '
        + 'borrala, o arregla lo que selecciona.');
    }
  }

  return { hallazgos, mapa, mirados, mediciones };
}

/** El arbol de este repositorio, leido del disco. */
export function leerArbol(base = raiz) {
  const arbol = {};
  const presentes = new Set();
  for (const entrada of UNIVERSO) {
    try { arbol[entrada.ruta] = readFileSync(join(base, entrada.ruta), 'utf8'); } catch { /* lo reporta comprobar() */ }
  }
  for (const e of EXENTOS) {
    if (e.forma === 'archivo' && existsSync(join(base, e.que))) presentes.add(e.que);
  }
  return { arbol, presentes };
}

if (esLineaDeComandos(import.meta.url)) {
  const { arbol, presentes } = leerArbol();
  const { hallazgos, mapa, mirados, mediciones } = comprobar(arbol, presentes);
  const resumen = mirados + ' archivos del universo, ' + mapa.size + ' colecciones derivadas del dato, '
    + mediciones + ' cifras medidas, ' + EXENTOS.length + ' exenciones con su razon';
  if (!hallazgos.length) {
    console.log('cifras derivadas: comprobado -- ' + resumen + ', 0 hallazgos');
    process.exit(0);
  }
  console.log('cifras derivadas: ' + hallazgos.length + ' HALLAZGO(S) -- ' + resumen);
  for (const h of hallazgos) console.log('  ' + h);
  process.exit(1);
}
