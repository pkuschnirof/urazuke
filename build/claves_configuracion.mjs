// Las claves del archivo de configuracion de un proyecto son nivel de datos, y son UNA sola
// (D-075, PND-063).
//
// Por que existe. El Anexo H, seccion 7, muestra la forma del unico archivo que un proyecto
// escribe para la compuerta: la capa 2 y la capa 3. Esas claves no son prosa -- son el contrato
// que una herramienta ESCRIBE Y LEE, y el propio dato lo dice en project_config.what: "these are
// the field names a consumer tool has to write and read. Declared here so no tool has to guess
// them". Hasta el 2026-10-29 el ejemplo las llevaba TRADUCIDAS, y medido sobre los ocho idiomas:
// 24 caminos de clave por idioma, CUATRO vocabularios distintos (castellano en es, ja y zh;
// ingles en en, pt y fr; aleman en de; italiano en it) y 87 nombres distintos para 24 casilleros.
//
// Lo que eso costaba no era la incomodidad de un lector. Medido el mismo dia contra la propia
// compuerta del metodo (node build/gates_validate.mjs --config): un apagado escrito EXACTAMENTE
// como el ejemplo ingles lo ensenaba -- exceptions / authorised_by / review -- sale "validado"
// con codigo 0. La regla queda apagada y el registro de cuatro campos que D-046 llama no
// negociable nunca se mira, porque la compuerta lee switched_off y el ejemplo decia exceptions.
// El mismo apagado con el nombre del contrato da dos E_APAGADO_SIN_REGISTRO. Es dano silencioso
// causado por la documentacion del metodo, no por un adversario.
//
// Lo que exige:
//   A. los ocho idiomas llevan EXACTAMENTE los mismos caminos de clave, en el mismo orden. Una
//      clave es nivel de datos: no se traduce (D-051) y no se reordena por idioma.
//   B. toda clave es ASCII pura.
//   C. toda clave es un nombre que el dato declara -- project_config.fields, switch_off_record,
//      los ids de umbral de adapters.thresholds, los ids de grupo de heuristics.groups -- salvo
//      lo que el registro de exenciones de abajo saltea CON SU RAZON.
//   D. simetria en la otra direccion: todo nombre que el dato declara aparece en el ejemplo. Un
//      campo que la compuerta lee y el ejemplo no nombra es la mitad del defecto de arriba: el
//      lector no lo escribe porque nunca supo que existia.
//
// Lo que NO exige, dicho aca y no cuando falle: que los VALORES sean los correctos, ni que esten
// en un idioma determinado. Los valores los escribe una persona -- el motivo de un apagado, el
// nombre de quien lo autoriza -- y van en el idioma del lector a proposito.
//
// Uso: node build/claves_configuracion.mjs
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { raiz, cargarFuentes, esLineaDeComandos } from './gates_lib.mjs';
import { IDIOMAS } from './forma_de_la_pregunta.mjs';

/** La seccion del anexo donde vive el ejemplo. El numero es el mismo en los ocho idiomas. */
export const SECCION = '7';

/**
 * Lo que esta guarda NO revisa, con su razon. Es un registro y no una condicion escondida: una
 * exencion sin razon escrita es una guarda que se apago sola, que es lo que el Anexo H pide para
 * cualquier regla apagada. Cada prefijo saltea las claves de DENTRO de ese objeto, nunca el
 * objeto mismo, que si tiene que estar declarado.
 */
export const EXENTOS = [
  {
    prefijo: 'measured_by.',
    razon: 'el metodo no abarca con que se mide cada regla: queda a criterio de quien mide '
      + '(decision del dueno, 2026-10-29, D-075). Las nueve claves de adentro son ilustrativas y '
      + 'el dato no declara ninguna, asi que exigirlas seria exigir una capa que el metodo '
      + 'deliberadamente no tiene.',
  },
  {
    prefijo: 'tools.',
    razon: 'los nombres y las versiones de las herramientas que corrieron son del proyecto, y el '
      + 'nivel de datos del metodo no nombra ninguna herramienta (D-055). Lo que el contrato '
      + 'declara es el campo; su contenido lo escribe cada proyecto.',
  },
];

/** La ruta del anexo de un idioma. */
export function rutaDe(idioma) {
  return idioma === 'es'
    ? join(raiz, 'docs', 'ANEXO_HEURISTICAS.md')
    : join(raiz, 'docs', idioma, 'ANEXO_HEURISTICAS.md');
}

/**
 * El ejemplo de configuracion de un anexo ya leido. Se busca DENTRO de la seccion 7 y no en el
 * documento entero, para que un bloque json que alguien agregue en otra seccion no se tome por
 * este ni lo esconda. Devuelve { objeto } o { error }.
 */
export function ejemploDe(texto) {
  const t = texto.replace(/\r\n/g, '\n');
  const desde = t.search(new RegExp('^## ' + SECCION + '\\.', 'm'));
  if (desde < 0) return { error: 'no se encontro el encabezado de la seccion ' + SECCION };
  const resto = t.slice(desde);
  const hasta = resto.slice(1).search(/^## /m);
  const seccion = hasta < 0 ? resto : resto.slice(0, hasta + 1);
  const bloques = [...seccion.matchAll(/```json\n([\s\S]*?)\n```/g)];
  if (bloques.length !== 1) {
    return { error: 'la seccion ' + SECCION + ' tiene ' + bloques.length + ' bloques json y el ejemplo de configuracion tiene que ser el unico' };
  }
  try { return { objeto: JSON.parse(bloques[0][1]) }; }
  catch (e) { return { error: 'el ejemplo de configuracion no es json valido: ' + e.message }; }
}

/**
 * Los caminos de clave de un objeto, en orden de aparicion. Un arreglo de objetos se recorre por
 * su primer elemento y se nombra `campo[].clave`: lo que se compara es la FORMA, y un ejemplo con
 * dos apagados no deberia leerse distinto de uno con uno.
 */
export function caminosDeClave(valor, prefijo = '') {
  let salida = [];
  for (const clave of Object.keys(valor)) {
    const v = valor[clave];
    salida.push(prefijo + clave);
    if (Array.isArray(v)) {
      if (v.length && v[0] && typeof v[0] === 'object') salida = salida.concat(caminosDeClave(v[0], prefijo + clave + '[].'));
    } else if (v && typeof v === 'object') {
      salida = salida.concat(caminosDeClave(v, prefijo + clave + '.'));
    }
  }
  return salida;
}

/**
 * Los nombres que el dato declara, por posicion. No se transcribe ninguno: salen de las fuentes,
 * que es lo que hace que la guarda caiga cuando el dato cambia y el ejemplo no (o al reves).
 */
export function nombresDeclarados(fuentes) {
  const campos = Object.keys(fuentes.schema.project_config.fields);
  return {
    // `measured_by` es la capa 2 y lo declara adapters.json, no project_config: es el unico
    // nombre de primer nivel que no sale de los campos del contrato.
    primerNivel: [...campos, 'measured_by'].sort(),
    thresholds: fuentes.adapters.thresholds.map((u) => u.id).sort(),
    switches: fuentes.heuristics.groups.map((g) => g.id).sort(),
    switched_off: [...fuentes.schema.project_config.switch_off_record].sort(),
  };
}

/** Un camino exento, con la razon que lo saltea. */
function exencionDe(camino) {
  return EXENTOS.find((e) => camino.startsWith(e.prefijo));
}

/**
 * La comprobacion entera sobre un arbol ya leido. `arbol` es { idioma: texto }.
 * Devuelve { hallazgos, claves }: hallazgos vacio es coherente.
 */
export function comprobar(arbol, fuentes) {
  const hallazgos = [];
  const declarados = nombresDeclarados(fuentes);
  const porIdioma = {};

  for (const [idioma, texto] of Object.entries(arbol)) {
    const { objeto, error } = ejemploDe(texto);
    if (error) { hallazgos.push(idioma + ': ' + error); continue; }
    porIdioma[idioma] = caminosDeClave(objeto);
  }
  const idiomas = Object.keys(porIdioma);
  if (!idiomas.length) return { hallazgos, claves: 0 };

  /* A. los ocho idiomas llevan las mismas claves, en el mismo orden. */
  const referencia = porIdioma.es ?? porIdioma[idiomas[0]];
  const nombreReferencia = porIdioma.es ? 'es' : idiomas[0];
  for (const idioma of idiomas) {
    if (idioma === nombreReferencia) continue;
    const propias = porIdioma[idioma];
    if (propias.join('|') === referencia.join('|')) continue;
    const sobran = propias.filter((c) => !referencia.includes(c));
    const faltan = referencia.filter((c) => !propias.includes(c));
    const detalle = [
      sobran.length ? 'tiene ' + sobran.join(', ') : '',
      faltan.length ? 'le falta ' + faltan.join(', ') : '',
      !sobran.length && !faltan.length ? 'las lleva en otro orden' : '',
    ].filter(Boolean).join('; ');
    hallazgos.push(idioma + ': no lleva las mismas claves que ' + nombreReferencia + ' -- ' + detalle
      + '. Una clave es nivel de datos: no se traduce ni se reordena por idioma (D-051, D-075).');
  }

  /* B y C, sobre cada idioma: ASCII puro y nombre declarado. */
  for (const idioma of idiomas) {
    for (const camino of porIdioma[idioma]) {
      const hoja = camino.split('.').pop().replace(/\[\]$/, '');
      if ([...camino].some((c) => c.charCodeAt(0) > 0x7f)) {
        hallazgos.push(idioma + ': la clave ' + camino + ' no es ASCII pura, y el nivel de datos lo es (D-051)');
        continue;
      }
      if (exencionDe(camino)) continue;
      const padre = camino.includes('.') ? camino.slice(0, camino.lastIndexOf('.')).replace(/\[\]$/, '') : null;
      const esperados = padre === null ? declarados.primerNivel : declarados[padre];
      if (!esperados) {
        hallazgos.push(idioma + ': la clave ' + camino + ' cuelga de ' + padre
          + ', que el dato no declara como un objeto con claves propias. Si tiene que existir, declaralo o agregalo al registro de exenciones con su razon.');
        continue;
      }
      if (!esperados.includes(hoja)) {
        hallazgos.push(idioma + ': la clave ' + camino + ' no es un nombre que el dato declare. '
          + (padre === null ? 'Los campos son: ' : 'Los nombres de ' + padre + ' son: ') + esperados.join(', ') + '.');
      }
    }
  }

  /* D. simetria: todo nombre declarado aparece en el ejemplo. */
  const enElEjemplo = new Set(referencia.map((c) => c.replace(/\[\]/g, '')));
  const falta = (camino, que) => {
    if (!enElEjemplo.has(camino)) {
      hallazgos.push('el dato declara ' + que + ' y el ejemplo de la seccion ' + SECCION + ' no lo nombra: '
        + 'un campo que la compuerta lee y el ejemplo no muestra es uno que el lector no escribe porque nunca supo que existia.');
    }
  };
  for (const campo of declarados.primerNivel) falta(campo, campo);
  for (const id of declarados.thresholds) falta('thresholds.' + id, 'el umbral ' + id);
  for (const id of declarados.switches) falta('switches.' + id, 'el grupo ' + id);
  for (const campo of declarados.switched_off) falta('switched_off.' + campo, 'el campo ' + campo + ' del registro de apagado');

  /* El registro de exenciones no puede tener una entrada sin razon. */
  for (const e of EXENTOS) {
    if (!e.razon || e.razon.length < 40) {
      hallazgos.push('la exencion ' + e.prefijo + ' no trae su razon escrita: una exencion sin razon es una guarda apagada sin registro');
    }
  }

  return { hallazgos, claves: referencia.length };
}

/** El arbol de este repositorio, leido del disco. */
export function leerArbol() {
  const arbol = {};
  for (const idioma of IDIOMAS) arbol[idioma] = readFileSync(rutaDe(idioma), 'utf8');
  return arbol;
}

if (esLineaDeComandos(import.meta.url)) {
  const arbol = leerArbol();
  const { hallazgos, claves } = comprobar(arbol, cargarFuentes());
  const resumen = IDIOMAS.length + ' idiomas, ' + claves + ' claves, ' + EXENTOS.length + ' exenciones con su razon';
  if (!hallazgos.length) {
    console.log('claves de configuracion: comprobado -- ' + resumen + ', 0 hallazgos');
    process.exit(0);
  }
  console.log('claves de configuracion: ' + hallazgos.length + ' HALLAZGO(S) -- ' + resumen);
  for (const h of hallazgos) console.log('  ' + h);
  process.exit(1);
}
