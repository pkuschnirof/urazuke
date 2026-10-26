// La simetria entre el dato publicado y la prosa, para el Anexo H (D-061, PND-048).
//
// Por que es una biblioteca y no solo una prueba: las comprobaciones de abajo son funciones
// PURAS --reciben los textos y devuelven la lista de hallazgos, no leen el disco-- para que
// la prueba en rojo pueda alimentarlas con un arbol mutilado y exigir que caigan. Una guarda
// que nadie vio caer no demuestra que guarde nada, y en este proyecto ya pasó cuatro veces.
//
// El dato es la fuente: las anclas del anexo salen de gates/steps.json (las entradas de
// `verify` que declaran `anchor`), no de una lista escrita a mano aca.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { raiz } from './gates_lib.mjs';

export const IDIOMAS = ['es', 'en', 'pt', 'fr', 'de', 'it', 'ja', 'zh'];
export const ANEXO = 'ANEXO_HEURISTICAS.md';
export const TOKEN_CONTRATO = 'Annex H';

export const dirDe = (idioma) => (idioma === 'es' ? join(raiz, 'docs') : join(raiz, 'docs', idioma));
export const leer = (idioma, ...partes) => readFileSync(join(dirDe(idioma), ...partes), 'utf8').replace(/\r\n/g, '\n');

// --- el dato ---------------------------------------------------------------------------

/** Las anclas que un nodo del dato declara en su verificacion. */
export const anclasDe = (nodo) =>
  (nodo.verify ?? []).filter((v) => v && typeof v === 'object' && v.anchor != null).map((v) => v.anchor);

/** Los peldanos con ancla del anexo, con sus anclas y sus evaluadores de esquema 2 o mas. */
export function peldanosConAncla(pasos) {
  return pasos
    .filter((p) => anclasDe(p).length > 0)
    .map((p) => ({
      num: p.num,
      anclas: anclasDe(p),
      evaluadores: (p.evaluators ?? []).filter((e) => e.since_schema >= 2).map((e) => e.name),
    }));
}

/** El vocabulario de evaluadores del anexo, derivado del dato y no de una lista a mano. */
export const evaluadoresDelAnexo = (conAncla) => new Set(conAncla.flatMap((p) => p.evaluadores));

// --- la prosa --------------------------------------------------------------------------

/**
 * Las fichas del documento principal, por numero de peldano. La llave es la cita del
 * contrato (`peldanos/peldano-NN-`), que esta byte a byte igual en los ocho idiomas: la
 * prueba no necesita saber como se dice "Peldano" en ocho idiomas.
 */
export function fichasDe(texto) {
  const fichas = new Map();
  for (const trozo of texto.replace(/\r\n/g, '\n').split(/^### /m)) {
    const cita = /peldanos\/peldano-(\d\d)-/.exec(trozo);
    if (cita) fichas.set(Number(cita[1]), trozo);
  }
  return fichas;
}

/** El nombre del archivo de contrato del peldano `num`, leido del documento principal. */
export function archivoDelContrato(textoPrincipal, num) {
  const dos = String(num).padStart(2, '0');
  const cita = new RegExp('peldanos/(peldano-' + dos + '-[a-z0-9-]+\\.md)').exec(textoPrincipal);
  return cita ? cita[1] : null;
}

export const referenciasDe = (trozo) =>
  [...new Set([...trozo.matchAll(/\[Ref\. (\d+)\]/g)].map((m) => Number(m[1])))].sort((a, b) => a - b);

/** El parrafo "fallo que evita" de una ficha castellana. null si no esta la vineta. */
export function falloQueEvita(ficha) {
  const i = ficha.indexOf('- **Fallo que evita**');
  if (i < 0) return null;
  const resto = ficha.slice(i + 1);
  const fin = resto.search(/\n- \*\*/);
  return fin < 0 ? resto : resto.slice(0, fin);
}

// --- las comprobaciones, puras ---------------------------------------------------------

/** A: del dato a la prosa. Un peldano con ancla ENLAZA el anexo en su ficha, en los ocho. */
export function fichasQueNoCitanElAnexo(conAncla, fichasPorIdioma) {
  const faltan = [];
  for (const [idioma, fichas] of Object.entries(fichasPorIdioma)) {
    for (const paso of conAncla) {
      const ficha = fichas.get(paso.num);
      if (ficha === undefined) {
        faltan.push(idioma + '/peldano-' + paso.num + ' (no se encontro la ficha)');
        continue;
      }
      if (!ficha.includes(ANEXO)) faltan.push(idioma + '/peldano-' + paso.num + ' (anclas: ' + paso.anclas.join(', ') + ')');
    }
  }
  return faltan;
}

/** B: del dato a la prosa. Ese peldano nombra el token ingles en su CONTRATO, en los ocho. */
export function contratosQueNoCitanElAnexo(conAncla, contratosPorIdioma) {
  const faltan = [];
  for (const [idioma, contratos] of Object.entries(contratosPorIdioma)) {
    for (const paso of conAncla) {
      const texto = contratos.get(paso.num);
      if (texto === undefined) {
        faltan.push(idioma + '/peldano-' + paso.num + ' (no se encontro el contrato)');
        continue;
      }
      if (!texto.includes(TOKEN_CONTRATO)) faltan.push(idioma + '/peldano-' + paso.num);
    }
  }
  return faltan;
}

/** C: de la prosa al dato. Una ficha que promete el anexo sin que el dato lo ancle es rojo. */
export function fichasQuePrometenMasQueElDato(conAncla, fichasPorIdioma) {
  const nums = new Set(conAncla.map((p) => p.num));
  const sobran = [];
  for (const [idioma, fichas] of Object.entries(fichasPorIdioma)) {
    for (const [num, ficha] of fichas) {
      if (!nums.has(num) && ficha.includes(ANEXO)) sobran.push(idioma + '/peldano-' + num);
    }
  }
  return sobran;
}

/** D: las estaciones. Si alguna declara un evaluador del anexo, esta guarda no sabe revisarla. */
export function estacionesConEvaluadorDelAnexo(estaciones, vocabulario) {
  return estaciones.filter((e) => (e.evaluators ?? []).some((v) => vocabulario.has(v.name))).map((e) => e.id);
}

/** E: el conjunto de [Ref. N] de cada ficha es identico en los ocho idiomas. */
export function referenciasQueDifieren(fichasPorIdioma) {
  const base = fichasPorIdioma.es;
  const difieren = [];
  for (const [idioma, fichas] of Object.entries(fichasPorIdioma)) {
    if (idioma === 'es') continue;
    for (const [num, ficha] of base) {
      const unas = referenciasDe(ficha).join(',');
      const otras = referenciasDe(fichas.get(num) ?? '').join(',');
      if (unas !== otras) difieren.push(idioma + '/peldano-' + num + ': es=[' + unas + '] ' + idioma + '=[' + otras + ']');
    }
  }
  return difieren;
}

/**
 * F: cada "fallo que evita" lleva su referencia, o esta registrado con su razon.
 * Devuelve tres listas, y las tres importan: sin registro (la afirmacion sin respaldo),
 * registro viejo (la ficha ya consiguio su referencia y el registro hay que sacarlo) y
 * sin vineta (no se encontro el parrafo: es rojo, no un salteo).
 */
export function revisarFallosQueEvita(fichasEs, registrados) {
  const sinRegistro = [];
  const registroViejo = [];
  const sinVineta = [];
  for (const [num, ficha] of fichasEs) {
    const parrafo = falloQueEvita(ficha);
    if (parrafo === null) {
      sinVineta.push('peldano ' + num);
      continue;
    }
    const tiene = referenciasDe(parrafo).length > 0;
    if (!tiene && !registrados.has(num)) sinRegistro.push('peldano ' + num);
    if (tiene && registrados.has(num)) registroViejo.push('peldano ' + num);
  }
  return { sinRegistro, registroViejo, sinVineta };
}

// --- la lectura del arbol real ---------------------------------------------------------

/** Todo lo que las comprobaciones necesitan, leido del arbol de este repositorio. */
export function leerArbol() {
  const pasos = JSON.parse(readFileSync(join(raiz, 'gates', 'steps.json'), 'utf8')).steps;
  const estaciones = JSON.parse(readFileSync(join(raiz, 'gates', 'stations.json'), 'utf8')).stations;
  const conAncla = peldanosConAncla(pasos);
  const fichasPorIdioma = {};
  const contratosPorIdioma = {};
  for (const idioma of IDIOMAS) {
    const principal = leer(idioma, 'ESCALERA_METODOLOGICA.md');
    fichasPorIdioma[idioma] = fichasDe(principal);
    const contratos = new Map();
    for (const paso of conAncla) {
      const archivo = archivoDelContrato(principal, paso.num);
      if (archivo) contratos.set(paso.num, leer(idioma, 'peldanos', archivo));
    }
    contratosPorIdioma[idioma] = contratos;
  }
  return { pasos, estaciones, conAncla, vocabulario: evaluadoresDelAnexo(conAncla), fichasPorIdioma, contratosPorIdioma };
}
