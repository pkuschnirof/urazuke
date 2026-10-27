// La forma de la pregunta esta en todos los prompts, y en los ocho idiomas (UX-28, D-070).
//
// Por que existe. El metodo les ordena a sus prompts PREGUNTAR: veintidos veces, en quince de
// los veintisiete archivos del corpus publicado. Y hasta el 2026-10-27 no decia en ninguna parte
// COMO se pregunta, asi que la forma quedaba a la improvisacion y el dueno recibia la pregunta
// suelta: sin los datos que la justifican, sin opciones y sin recomendacion. La regla ahora
// existe (UX-28) y la clausula entra en los prompts, que es lo unico que el modelo lee como
// instruccion. Esta guarda exige que siga ahi.
//
// Lo que exige, y es lo unico que una maquina puede exigir de esto:
//   A. cada prompt del corpus lleva la clausula inglesa, BYTE A BYTE la misma, en los ocho
//      idiomas. Es la misma regla que ya rige a los prompts (D-013): una sola pieza inglesa.
//   B. cada bloque de traduccion `> [xx]` lleva la clausula traducida de SU idioma.
//   C. simetria productor/consumidor con el dato: los tres niveles que la clausula nombra son
//      exactamente los que declara `enums.communication_depth`, y el contrato de configuracion
//      de proyecto declara el campo. Si el dato cambiara un valor y la clausula no, el modelo
//      escribiria un nivel que la herramienta no sabe leer.
//
// Lo que NO exige, dicho aca y no cuando falle: que una pregunta concreta que un modelo escribio
// un martes tenga sus cuatro partes. Eso no lo puede mirar ninguna prueba y lo juzga el dueno al
// cierre del pendiente, que es por que UX-28 avisa y no bloquea. Una guarda que promete mas de
// lo que mide es la sexta guarda dormida de este proyecto.
//
// Uso: node build/forma_de_la_pregunta.mjs
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { raiz, cargarFuentes, esLineaDeComandos } from './gates_lib.mjs';

/** Los ocho idiomas de la prosa. El castellano es la fuente y tambien se revisa. */
export const IDIOMAS = ['es', 'en', 'pt', 'fr', 'de', 'it', 'ja', 'zh'];

/** Las paginas con prompts propios, ademas de los veinticuatro contratos. */
export const PAGINAS = ['EVOLUTIVO_CORRECTIVO.md', 'TRABAJO_COLABORATIVO.md', 'ANEXO_HEURISTICAS.md'];

/** La pieza inglesa, una sola, identica en los ocho idiomas. */
export const CLAUSULA_EN = 'When you need a decision from me, ask it with the four parts of UX-28 '
  + '(`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary, '
  + 'listed; one paragraph of at most five lines that links that data and lets the question be '
  + 'seen; the question itself with its possible answers numbered; and your recommendation. Say it '
  + 'at the technical depth the project declared in `communication_depth` -- `beginner`, '
  + '`decision_maker` or `technical`; if the project declared none, use `decision_maker`.';

/**
 * Un trozo de la clausula traducida, por idioma: lo que tiene que aparecer en el bloque `[xx]`.
 * Es un trozo y no el texto entero a proposito, para que un reajuste de lineas de la traduccion
 * no se reporte como una clausula que falta; lo que se exige byte a byte es la pieza INGLESA,
 * que es la que el modelo obedece.
 */
export const TRADUCCIONES = {
  es: 'las cuatro partes de la UX-28',
  pt: 'as quatro partes da UX-28',
  fr: "les quatre parties de l'UX-28",
  de: 'den vier Teilen von UX-28',
  it: 'le quattro parti della UX-28',
  ja: 'UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分',
  zh: 'UX-28（`docs/ANEXO_HEURISTICAS.md`）的四个部分',
};

/** El nombre del campo de configuracion y el nombre del enum, en el dato. */
export const CAMPO = 'communication_depth';

const normalizar = (s) => s.replace(/\s+/g, ' ').trim();

/**
 * Los bloques de cita de un documento. Un bloque cuya primera linea es una etiqueta de idioma
 * (`[es]`, `[it]`...) es la traduccion del prompt anterior, para lectura, y no es un prompt.
 * Una sola copia de esta lectura: `build/prompts.mjs` la importa de aca.
 */
export function bloquesDeCita(md) {
  const bloques = [];
  let actual = [];
  const cerrar = () => {
    if (!actual.length) return;
    const etiqueta = /^\[([a-z]{2})\]\s*$/.exec(actual[0]);
    bloques.push({ etiqueta: etiqueta ? etiqueta[1] : null, texto: normalizar(actual.join(' ')) });
    actual = [];
  };
  for (const linea of md.split(/\r?\n/)) {
    if (/^> ?/.test(linea)) actual.push(linea.replace(/^> ?/, ''));
    else cerrar();
  }
  cerrar();
  return bloques;
}

/** Los archivos con prompts de un idioma, en orden. */
export function archivosDe(idioma, leerDir = readdirSync, hay = existsSync) {
  const dir = idioma === 'es' ? join(raiz, 'docs') : join(raiz, 'docs', idioma);
  const pel = join(dir, 'peldanos');
  const contratos = hay(pel)
    ? leerDir(pel).filter((f) => /^peldano-\d\d-.*\.md$/.test(f)).sort().map((f) => join(pel, f))
    : [];
  return [...contratos, ...PAGINAS.map((f) => join(dir, f)).filter(hay)];
}

/**
 * La comprobacion A y B sobre un arbol ya leido. `arbol` es { idioma: [{ ruta, texto }] }.
 * Devuelve la lista de hallazgos: vacia es coherente.
 */
export function clausulasQueFaltan(arbol) {
  const hallazgos = [];
  for (const [idioma, archivos] of Object.entries(arbol)) {
    for (const { ruta, texto } of archivos) {
      bloquesDeCita(texto).forEach((b, i) => {
        const donde = idioma + ' ' + ruta + ' bloque ' + (i + 1);
        if (!b.etiqueta) {
          if (!b.texto.includes(normalizar(CLAUSULA_EN))) {
            hallazgos.push(donde + ': el prompt no lleva la clausula inglesa de UX-28');
          }
          return;
        }
        const trozo = TRADUCCIONES[b.etiqueta];
        if (!trozo) { hallazgos.push(donde + ': etiqueta de idioma "' + b.etiqueta + '" que no esta declarada'); return; }
        if (!b.texto.includes(trozo)) hallazgos.push(donde + ': la traduccion [' + b.etiqueta + '] no lleva la clausula de UX-28');
      });
    }
  }
  return hallazgos;
}

/** La comprobacion C: lo que la clausula nombra es lo que el dato declara. */
export function simetriaConElDato(schema, clausula = CLAUSULA_EN) {
  const hallazgos = [];
  const niveles = schema.enums?.[CAMPO];
  if (!Array.isArray(niveles) || !niveles.length) {
    hallazgos.push('gates/schema.json no declara el enum ' + CAMPO + ': la clausula nombra niveles que el dato no tiene');
    return hallazgos;
  }
  for (const n of niveles) {
    if (!clausula.includes('`' + n + '`')) hallazgos.push('la clausula no nombra el nivel "' + n + '", que el dato declara');
  }
  const enLaClausula = [...clausula.matchAll(/`([a-z_]+)`/g)].map((m) => m[1]);
  for (const n of enLaClausula) {
    if (n === CAMPO) continue;
    if (!niveles.includes(n)) hallazgos.push('la clausula nombra "' + n + '", que el dato no declara como nivel');
  }
  if (!clausula.includes('`' + CAMPO + '`')) hallazgos.push('la clausula no nombra el campo ' + CAMPO);
  if (!(CAMPO in (schema.project_config?.fields ?? {}))) {
    hallazgos.push('el contrato de configuracion de proyecto no declara el campo ' + CAMPO + ': una herramienta tendria que adivinarlo');
  }
  return hallazgos;
}

/** El arbol de este repositorio, leido del disco. */
export function leerArbol() {
  const arbol = {};
  for (const idioma of IDIOMAS) {
    arbol[idioma] = archivosDe(idioma).map((ruta) => ({
      ruta: ruta.slice(raiz.length + 1).replace(/\\/g, '/'),
      texto: readFileSync(ruta, 'utf8'),
    }));
  }
  return arbol;
}

export function contar(arbol) {
  let prompts = 0, traducciones = 0;
  for (const archivos of Object.values(arbol)) {
    for (const { texto } of archivos) {
      for (const b of bloquesDeCita(texto)) (b.etiqueta ? traducciones++ : prompts++);
    }
  }
  return { prompts, traducciones };
}

if (esLineaDeComandos(import.meta.url)) {
  const arbol = leerArbol();
  const hallazgos = [...clausulasQueFaltan(arbol), ...simetriaConElDato(cargarFuentes().schema)];
  const { prompts, traducciones } = contar(arbol);
  const resumen = IDIOMAS.length + ' idiomas, ' + prompts + ' prompts, ' + traducciones + ' traducciones';
  if (!hallazgos.length) {
    console.log('forma de la pregunta: comprobado -- ' + resumen + ', 0 hallazgos');
    process.exit(0);
  }
  console.log('forma de la pregunta: ' + hallazgos.length + ' HALLAZGO(S) -- ' + resumen);
  for (const h of hallazgos) console.log('  ' + h);
  process.exit(1);
}
