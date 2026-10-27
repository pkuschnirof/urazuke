// Cada documento del arbol esta publicado o nombrado con su razon (D-066, PND-050).
//
// Por que existe. El 2026-10-26 el commit 08a429d anuncio en su mensaje un arreglo de una
// palabra y llevo ademas ocho documentos que no menciona: el 98 % de las lineas que inserto.
// Entre ellos, cuatro apuntes del panel de chat tirados en la raiz de docs/. No lo encontro el
// dueno y no lo encontro ninguna compuerta: aparecio al leer el arbol a mano. Hasta hoy la
// unica defensa contra que vuelva a pasar era que alguien se acordara de mirar, que es la forma
// de una guarda dormida vista del otro lado: no hay guarda.
//
// Lo que exige: todo documento que el arbol tiene bajo docs/ esta en el arreglo literal de la
// construccion --es corpus y se publica-- o nombrado en TRABAJO_REGISTRADO con su razon, y esa
// razon cita el pendiente o la decision que lo pide. Un archivo que no esta en ninguna de las
// dos es rojo, y el mensaje dice el nombre.
//
// Lo que NO guarda, dicho para que nadie le atribuya mas de lo que hace: no mira el MENSAJE de
// un commit. Un commit que lleva un documento registrado y no lo nombra sigue siendo posible, y
// eso fue la segunda ocurrencia del mismo dia (6ea7f38, en el repositorio del portal). Cubrirlo
// agranda el alcance y es decision del dueno; queda escrito en PND-050.
//
// Por que lee el DISCO y no el indice de git: el panel auto-guarda sus apuntes en docs/, y un
// apunte que todavia no se commiteo es justo el que conviene atrapar. La guarda cae antes del
// commit y no despues.
//
// Las comprobaciones son PURAS --reciben la lista de rutas, el texto de la construccion y el
// registro-- para que la prueba en rojo pueda alimentarlas con el arbol de 1a02cd3, que es el
// que llevaba los apuntes. Una guarda que nadie vio caer no demuestra que guarde nada, y en
// este proyecto ya paso cuatro veces.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { raiz } from './gates_lib.mjs';
import { IDIOMAS } from './anexo_simetria.mjs';

/**
 * Los arboles que esta guarda NO revisa, cada uno con su razon escrita. El registro esta aca y
 * no adentro de la comprobacion por lo mismo que el registro de comodines del Anexo H: una
 * exclusion sin razon escrita es la forma de apagar una regla sin decirlo.
 */
export const EXCLUSIONES_REGISTRADAS = new Map([
  ...IDIOMAS.filter((i) => i !== 'es').map((i) => [
    'docs/' + i + '/',
    'corpus traducido: una copia por idioma de lo que la construccion ya publica (D-013)',
  ]),
  ['docs/html/', 'salida GENERADA por build/build.mjs; no es fuente y no se edita a mano'],
  ['docs/peldanos/', 'los veinticuatro contratos; la construccion los publica juntos como CONTRATOS_DE_PELDANO'],
  [
    'docs/practica/evidencia/',
    'la evidencia recolectada de los dos proyectos guia; crece un archivo por peldano y sus ' +
      'nombres los declara el propio dato (D-051, PND-050)',
  ],
]);

/**
 * El inventario: los documentos que el arbol tiene y la construccion NO publica, cada uno con
 * la razon por la que existe y el pendiente o la decision que lo pide. Agregar un documento de
 * trabajo cuesta una linea aca, que es el mismo precio que ya se paga por agregar uno al corpus.
 */
export const TRABAJO_REGISTRADO = new Map([
  ['docs/PENDING.md', 'el registro del peldano 5 de este propio proyecto, voz del autor, fuera del corpus traducido (D-051)'],
  ['docs/DECISIONES.md', 'el registro de decisiones, fuente primaria y voz del autor, fuera del corpus traducido (D-051)'],
  ['docs/PLAN_CURSO_MENTORING.md', 'el plan del curso y el mentoring, voz del autor, fuera del corpus traducido (D-051)'],
  [
    'docs/AIevaluation.md',
    'fuente primaria: las evaluaciones crudas de los modelos tal como las devolvieron, de donde ' +
      'se escribe EVALUACIONES_DE_IA.md; entro con D-041 y D-042 y ninguna decision lo nombraba ' +
      'hasta PND-050',
  ],
  [
    'docs/DECISION_PND-048_CONTEXTO_MEDIDO.md',
    'expediente: el contexto medido con el que el dueno decidio la forma de la comprobacion del ' +
      'Anexo H; el registro lo cita como evidencia, asi que se queda (PND-048, D-062)',
  ],
  [
    'docs/ELIGIBILITY_CRITERIA.md',
    'insumo de la estacion N0 del tramo de normalizacion que este proyecto esta corriendo; lo ' +
      'nombra PND-050 y el prompt de la estacion lo pide por su nombre',
  ],
  [
    'docs/FUNCTIONALITY_RECOVERED.md',
    'artefacto de la estacion N0 que el dato declara por ruta en gates/stations.json; trabajo en ' +
      'curso, lo nombra PND-050',
  ],
  ['docs/paper/README.md', 'material de trabajo del paper, que es trabajo en curso; lo nombra PND-050'],
  ['docs/paper/metodo-protocolo-herramienta.md', 'la pieza comun del paper, trabajo en curso; lo nombra PND-050'],
  [
    'docs/practica/MANUAL_FORGE_PROYECTO_NUEVO.md',
    'manual de ejecucion sobre un proyecto de practica real; documentacion de herramienta, fuera ' +
      'del corpus traducido (D-051)',
  ],
  [
    'docs/practica/MANUAL_FORGE_PROYECTO_EXISTENTE.md',
    'manual de ejecucion sobre un proyecto heredado de practica; documentacion de herramienta, ' +
      'fuera del corpus traducido (D-051)',
  ],
]);

/** Una razon valida cita el pendiente o la decision que pide el documento. */
export const RE_PIDE = /\b(PND-\d+|D-\d+)\b/;

/**
 * Los documentos que la construccion publica, leidos del arreglo literal de build/build.mjs.
 * Se EXTRAEN del texto en vez de copiarse: una lista duplicada se desincroniza y la guarda
 * empezaria a pedir una razon para un documento que ya es corpus.
 */
export function corpusDeLaConstruccion(textoDeBuild) {
  const m = textoDeBuild.match(/for \(const nombre of \[([^\]]+)\]\)/);
  if (!m) throw new Error('no se encontro el arreglo literal de documentos en build/build.mjs');
  return new Set(m[1].match(/'[^']+'/g).map((s) => 'docs/' + s.slice(1, -1) + '.md'));
}

/** De todas las rutas del arbol, las que esta guarda tiene que explicar. */
export function documentosDelArbol(rutas) {
  const excluidos = [...EXCLUSIONES_REGISTRADAS.keys()];
  return rutas
    .filter((r) => r.startsWith('docs/') && r.endsWith('.md'))
    .filter((r) => !excluidos.some((e) => r.startsWith(e)))
    .sort();
}

/**
 * La comprobacion. Un hallazgo por documento que ni se publica ni esta registrado, y uno por
 * registro cuya razon no cita su pendiente o su decision.
 */
export function documentosSinExplicacion(documentos, publicados, registrados) {
  const hallazgos = [];
  for (const ruta of documentos) {
    if (publicados.has(ruta)) continue;
    const razon = registrados.get(ruta);
    if (razon === undefined) {
      hallazgos.push(ruta + ': no lo publica la construccion y no esta en el inventario con su razon');
      continue;
    }
    if (!RE_PIDE.test(razon)) {
      hallazgos.push(ruta + ': esta en el inventario y su razon no cita el pendiente ni la decision que lo pide');
    }
  }
  return hallazgos;
}

/** Los registros que sobran: una linea del inventario para un documento que el arbol no tiene. */
export function registrosQueSobran(documentos, registrados) {
  const hay = new Set(documentos);
  return [...registrados.keys()].filter((r) => !hay.has(r)).sort();
}

/** Todo lo que la comprobacion necesita, leido del DISCO de este repositorio. */
export function leerArbol() {
  const rutas = [];
  const caminar = (rel) => {
    for (const e of readdirSync(join(raiz, rel), { withFileTypes: true })) {
      const hijo = rel + '/' + e.name;
      if (e.isDirectory()) caminar(hijo);
      else rutas.push(hijo);
    }
  };
  caminar('docs');
  const publicados = corpusDeLaConstruccion(readFileSync(join(raiz, 'build', 'build.mjs'), 'utf8'));
  return { rutas, documentos: documentosDelArbol(rutas), publicados };
}
