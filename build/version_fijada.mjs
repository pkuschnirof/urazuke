// La version que un proyecto fija, y lo que cuesta cambiarla (D-068, PND-055).
//
// Por que existe. La definicion mecanica de las compuertas se publica con una version
// declarada y una huella, y el documento generado ya decia desde el primer dia que un
// proyecto empieza y termina en la misma version del metodo. Lo que no estaba escrito en
// NINGUNA parte era con QUE se fija --el par (catalog_version, content_hash)--, que subir de
// version en medio de un proyecto es una regresion del estado de completitud, y que esa
// decision es del dueno. Medido el 2026-10-27: 0 menciones de la fijacion en la prosa
// castellana del documento principal y de los veinticuatro contratos, mientras el dato se lo
// venia diciendo al consumidor. Es la asimetria entre el dato y la prosa del peldano 11, en
// la direccion que mas caro sale: hacia la unica persona que puede decidir un cambio de
// version.
//
// Lo que esta biblioteca hace, y es lo que el validador NO puede hacer:
//   A. la simetria con la prosa: si el dato declara el contrato de fijacion, el documento
//      principal y el contrato del peldano 2 lo nombran, en los ocho idiomas. El token es
//      `catalog_version`, en ingles, porque es un identificador del dato y viaja identico en
//      las ocho versiones: la prueba no necesita saber como se dice "version del catalogo"
//      en ocho idiomas, y es justo el nombre que el lector necesita para encontrar el dato.
//   B. el diferencial de un upgrade, ejecutable: dadas dos versiones publicadas, que
//      requisitos entran en el medio. Es la cuenta que el dueno necesita ANTES de decidir, y
//      la razon por la que cada entrada agregada despues del congelado declara since_version.
//
// Lo que NO hace, dicho para que nadie le atribuya mas: no juzga si el parrafo dice algo
// verdadero. Verifica que este, en los ocho. Lo que dice lo juzga una persona.
//
// Las comprobaciones son PURAS --reciben el dato y los textos, no leen el disco-- para que
// tests/version_fijada_en_rojo.test.mjs pueda alimentarlas con un arbol mutilado y exigir que
// caigan. Una guarda que nadie vio caer no demuestra que guarde nada, y en este proyecto ya
// paso cuatro veces.
//
// Uso: node build/version_fijada.mjs
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { raiz, cargarFuentes, esLineaDeComandos } from './gates_lib.mjs';
import { IDIOMAS, leer, archivoDelContrato } from './anexo_simetria.mjs';

export { IDIOMAS };

/** El identificador que la prosa tiene que nombrar. Ingles, porque es el nombre del dato. */
export const TOKEN = 'catalog_version';

/** El peldano donde nace la definicion del proyecto, que es donde se escribe la version fijada. */
export const PELDANO_DE_LA_DEFINICION = 2;

// --- el dato ---------------------------------------------------------------------------

/**
 * Las entradas que el metodo agrego despues del congelado, con su procedencia. Una entrada de
 * la base no aparece aca: viene del congelado y esta en TODAS las versiones publicadas, asi
 * que su procedencia es no tener ninguna.
 */
export function entradasAgregadas(pasos, estaciones, evaluadores, reglas = [], umbrales = []) {
  const salida = [];
  const mirar = (nodo, etiqueta, campo, lista) => {
    (lista ?? []).forEach((x, i) => {
      if (!x || typeof x !== 'object' || !(x.since_schema >= 2)) return;
      salida.push({
        donde: etiqueta + '.' + campo + '[' + i + ']',
        que: x.path ?? x.name ?? x.text,
        since_schema: x.since_schema,
        since_version: x.since_version ?? null,
      });
    });
  };
  for (const [lista, prefijo] of [[pasos, 'step'], [estaciones, 'station']]) {
    for (const nodo of lista) {
      const etiqueta = prefijo + ':' + (nodo.num ?? nodo.id);
      mirar(nodo, etiqueta, 'inputs', nodo.inputs);
      mirar(nodo, etiqueta, 'artifacts', nodo.artifacts);
      mirar(nodo, etiqueta, 'verify', nodo.verify);
      mirar(nodo, etiqueta, 'evaluators', nodo.evaluators);
    }
  }
  mirar(null, 'catalog', 'evaluators', evaluadores);
  // Las reglas del Anexo H tambien son entradas: UX-28 fue la primera que el metodo agrego despues
  // de que esta maquinaria existiera, y sin esto el diferencial de un upgrade la omitia en
  // silencio --un proyecto que sube de version se encontraria con una regla nueva que el
  // diferencial no conto (D-070). `que` sale del id, que es el nombre estable de una regla.
  mirar(null, 'catalog', 'rules', (reglas ?? []).map((r) => ({ ...r, path: r.id })));
  // Y los umbrales, por el mismo argumento: end_users_outside_the_organisation fue el primero que
  // el metodo agrego despues del congelado (D-076), y declararlo o no cambia la severidad de su
  // regla, asi que es una entrada que lleva requisito. Sin esto, un proyecto que sube de version
  // se encontraria con un umbral nuevo que el diferencial no conto.
  mirar(null, 'catalog', 'thresholds', (umbrales ?? []).map((u) => ({ ...u, path: u.id })));
  return salida;
}

/** Las entradas que declaran since_schema y no dicen en que version entraron. */
export const sinProcedencia = (entradas) => entradas.filter((e) => !e.since_version).map((e) => e.donde);

export const comoNumeros = (v) => String(v).split('.').map((x) => parseInt(x, 10));

/** Compara dos versiones de la forma 2026.10.7. Devuelve -1, 0 o 1. */
export function compararVersiones(a, b) {
  const [x, y] = [comoNumeros(a), comoNumeros(b)];
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    const d = (x[i] ?? 0) - (y[i] ?? 0);
    if (d) return d > 0 ? 1 : -1;
  }
  return 0;
}

/**
 * El diferencial de un upgrade: que entradas entran entre la version fijada y la candidata.
 * Es la cuenta que el dueno necesita antes de decidir, y la unica razon por la que
 * since_version existe: con since_schema solo se puede separar la base de todo lo agregado.
 */
export function diferencial(entradas, fijada, candidata) {
  return entradas.filter(
    (e) => e.since_version
      && compararVersiones(e.since_version, fijada) > 0
      && compararVersiones(e.since_version, candidata) <= 0,
  );
}

/** Los evaluadores requeridos que entran en un diferencial: los que pueden trabar un peldano. */
export function evaluadoresQueTraban(pasos, fijada, candidata) {
  const traban = [];
  for (const paso of pasos) {
    for (const e of paso.evaluators ?? []) {
      if (!e.required || !e.since_version) continue;
      if (compararVersiones(e.since_version, fijada) > 0 && compararVersiones(e.since_version, candidata) <= 0) {
        traban.push({ peldano: paso.num, evaluador: e.name, since_version: e.since_version });
      }
    }
  }
  return traban;
}

// --- la simetria con la prosa ----------------------------------------------------------

/**
 * La comprobacion. Devuelve un hallazgo por (idioma, texto) que no nombra el token. Un texto
 * que no se pudo leer es HALLAZGO y no salteo, por la misma razon que en el resto del
 * repositorio: no haber podido mirar es rojo, no verde.
 */
export function prosaQueNoNombraLaFijacion(textosPorIdioma) {
  const faltan = [];
  for (const [idioma, textos] of Object.entries(textosPorIdioma)) {
    for (const nombre of ['principal', 'contrato']) {
      const texto = textos[nombre];
      if (typeof texto !== 'string') {
        faltan.push(idioma + '/' + nombre + ' (no se pudo leer)');
        continue;
      }
      if (!texto.includes(TOKEN)) faltan.push(idioma + '/' + nombre + ': no nombra ' + TOKEN);
    }
  }
  return faltan;
}

/** Todo lo que la comprobacion necesita, leido del arbol de este repositorio. */
export function leerArbol() {
  const fuentes = cargarFuentes();
  const pasos = fuentes.steps.steps;
  const estaciones = fuentes.stations.stations;
  const entradas = entradasAgregadas(pasos, estaciones, fuentes.evaluators.evaluators,
    fuentes.heuristics.rules, fuentes.adapters.thresholds);
  const versiones = fuentes.catalog.changelog.map((c) => c.catalog_version);
  const textosPorIdioma = {};
  for (const idioma of IDIOMAS) {
    const principal = leer(idioma, 'ESCALERA_METODOLOGICA.md');
    const archivo = archivoDelContrato(principal, PELDANO_DE_LA_DEFINICION);
    let contrato;
    try { contrato = archivo ? leer(idioma, 'peldanos', archivo) : undefined; } catch { contrato = undefined; }
    textosPorIdioma[idioma] = { principal, contrato };
  }
  const documento = readFileSync(join(raiz, 'docs', 'COMPUERTAS.md'), 'utf8');
  return { fuentes, pasos, estaciones, entradas, versiones, textosPorIdioma, documento };
}

/* ---------- la linea de comandos ---------- */

if (esLineaDeComandos(import.meta.url)) {
  const arbol = leerArbol();
  const faltan = prosaQueNoNombraLaFijacion(arbol.textosPorIdioma);
  const huerfanas = sinProcedencia(arbol.entradas);
  const primera = arbol.versiones[0];
  const actual = arbol.fuentes.catalog.catalog_version;
  const dif = diferencial(arbol.entradas, primera, actual);
  const textos = Object.keys(arbol.textosPorIdioma).length * 2;
  console.log('fijacion: comprobado -- ' + IDIOMAS.length + ' idiomas, ' + textos + ' textos, '
    + arbol.entradas.length + ' entradas agregadas, ' + (faltan.length + huerfanas.length) + ' hallazgos');
  console.log('diferencial ' + primera + ' -> ' + actual + ': ' + dif.length + ' entradas, '
    + evaluadoresQueTraban(arbol.pasos, primera, actual).length + ' evaluadores requeridos');
  for (const h of [...huerfanas.map((d) => 'sin procedencia: ' + d), ...faltan]) console.error('  ' + h);
  process.exit(faltan.length + huerfanas.length ? 1 : 0);
}
