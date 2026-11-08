// La cuenta de una coleccion que el dato declara NO vive en la prosa (D-090, PND-115).
//
// Por que existe, medido dos veces en cinco dias sobre este arbol. El 2026-11-03, con D-087, la
// cuenta de reglas del Anexo H paso de cuarenta y ocho a cuarenta y nueve, y veinte afirmaciones
// de la prosa quedaron vencidas en el mismo acto: tres en el documento principal, los nueve
// README y las ocho hojas de preguntas al proveedor (PND-104). Se corrigieron a mano y la guarda
// quedo declarada como trabajo aparte. El 2026-11-07, con D-089, la cuenta paso a cincuenta y dos
// y hubo que mover NOVENTA Y SEIS afirmaciones a mano, y OCHO ya estaban vencidas desde el lote
// anterior: el parrafo que explica por que UX-28 es la unica regla que entra en el prompt decia
// "en que se diferencia de las otras cuarenta y siete" en los ocho idiomas (PND-115).
//
// Y lo que vuelve a esto una guarda y no una tanda mas de ediciones es POR QUE el barrido de
// PND-104 no las vio: su universo estaba completo -- los 312 archivos .md del arbol, enumerados --
// y sus FORMAS no. Busco "N reglas" y esa afirmacion no lleva el sustantivo. Es CQ-19.3, el
// universo en las dos direcciones, aplicado al barrido del propio metodo.
//
// Lo que exige, y el orden importa porque es el que el dueno decidio (PND-115, salida (b) primero
// y el registro de formas sobre lo que quede):
//   A. LA FORMA CON SUSTANTIVO. Ninguna cifra de diez o mas -- deletreada en el idioma del archivo
//      o en digitos -- esta pegada al sustantivo de regla o de cara, en todo el universo de abajo.
//   B. LA FORMA SIN SUSTANTIVO, que es la que fallo. Ninguna cifra DELETREADA que sea una cuenta
//      que el dato declara -- el total, el total menos uno, la cuenta de usabilidad, las caras --
//      aparece en la prosa, con sustantivo o sin el. El conjunto de valores se DERIVA de
//      gates/heuristics.json: se mueve cuando el dato se mueve, asi que no hay una lista a mano
//      que se pueda quedar atras (D-077).
//   C. SIMETRIA DEL REGISTRO. Toda exencion tiene que seguir salteando algo real. Una exencion que
//      ya no selecciona nada es una guarda apagada sobre un texto que cambio de forma, y no se
//      nota nunca porque sigue dando verde (la leccion de D-086).
//
// Lo que NO promete, dicho aca y no cuando falle:
//   - No lee la prosa. Atrapa la cifra el dia que se ESCRIBE (B la ve en el acto, porque el autor
//     escribe el numero correcto) y el dia que la coleccion se mueve de uno (la forma "las otras
//     N-1", que es la que midio PND-115). Una copia que el dato dejo atras por mas de uno y que no
//     lleva el sustantivo no la ve ninguna de las dos comprobaciones: por eso la salida elegida
//     fue (b) -- que la prosa no lleve la cifra -- y no (a) sola.
//   - No mira las cuentas de otras colecciones del metodo (veinticuatro peldanos, ocho estaciones,
//     ocho idiomas). El valor veinticuatro es hoy, a la vez, la cuenta de reglas de calidad y la
//     de peldanos, asi que buscarlo suelto por la prosa devolveria decenas de aciertos de la otra
//     coleccion; en la comprobacion B ese valor entra con el sustantivo o no entra, y esta
//     registrado abajo con esa razon medida.
//
// Uso: node build/cuenta_de_reglas.mjs
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { raiz, esLineaDeComandos } from './gates_lib.mjs';

/**
 * El universo, ENUMERADO (D-064): todo documento .md que git tiene versionado, menos lo que esta
 * registrado aca con su razon. Se lee del indice de git y no del disco, porque el arbol de
 * trabajo tiene un clon completo del propio repositorio adentro (la leccion de PND-037).
 */
export const EXENTOS_DE_ARBOL = [
  { id: 'html-generado', que: /^docs\/html\//, razon: 'el HTML se genera de la prosa: una cifra de ahi es la del documento del que sale, y el arreglo es en el documento.' },
  { id: 'prompts-generados', que: /^prompts\//, razon: 'el corpus de prompts se extrae de los contratos (build/prompts.mjs): una cifra de ahi es la del contrato, y el arreglo es en el contrato.' },
  { id: 'compuertas-generado', que: /^docs\/COMPUERTAS\.md$/, razon: 'se genera del dato y sus cifras ya las deriva D-077 (build/cifras_derivadas.mjs). Mirarlo aca seria una segunda copia de la misma guarda.' },
  { id: 'registro-de-pendientes', que: /^docs\/PENDING\.md$/, razon: 'es un registro fechado: cada entrada lleva la cifra que era cierta el dia que se escribio y no se reescribe (D-053, D-061).' },
  { id: 'registro-de-decisiones', que: /^docs\/DECISIONES\.md$/, razon: 'misma razon que el registro de pendientes: una decision lleva las palabras de su dia y no se edita (D-033, D-079).' },
  { id: 'instruccion-del-repositorio', que: /^docs\/CONTEXTO_DEL_REPOSITORIO\.md$/, razon: 'Hasta el 2026-11-08 esta exencion apuntaba a CLAUDE.md; ese dia el relato se mudo a este archivo (PND-117, D-092) y la exencion lo siguio, porque la razon es del TEXTO y no del archivo. CLAUDE.md salio del registro en el mismo acto, medido: ya no nombra ninguna cuenta, y una exencion que cubre un archivo que no la necesita es el defecto de D-086. '
    + 'Los parrafos de este archivo son el relato fechado de cada lote -- "el anexo pasa a cincuenta y dos" es lo que ese lote hizo -- y la serie apilada ("52 desde D-089, 49 desde D-087") se fecha a si misma, que es la forma que no se vence.' },
  { id: 'referencias-de-los-casos', que: /REFERENCIAS\.md$/, razon: 'es el registro fechado de los casos reales -- "Ref. N", con su fecha y su commit -- y lo que cita es lo que paso ese dia (D-013). Sus tablas llevan fechas en digitos al lado de la palabra regla.' },
  { id: 'evaluaciones-fechadas', que: /^docs\/EVALUACIONES_DE_IA\.md$/, razon: 'es el registro fechado de lo que cada modelo contesto el dia que se le pregunto, con la cifra que el metodo tenia ese dia, y por eso no se actualiza: lo que vale de ese documento es que la respuesta quedo como vino.' },
  { id: 'revision-fechada', que: /^docs\/REVISION_SEMANTICA_INTERFAZ\.md$/, razon: 'es una medicion fechada de la portada, con la cifra que el dato declaraba ese dia.' },
  { id: 'paper-en-curso', que: /^docs\/paper\//, razon: 'el paper es un relato fechado del origen del metodo y no esta traducido (lo nombra PND-050).' },
  { id: 'evidencia-de-practica', que: /^docs\/practica\//, razon: 'son los artefactos de las dos corridas de practica, fechados: lo que el proyecto guia escribio el dia que lo escribio.' },
  { id: 'relevamiento-de-la-estacion-n0', que: /^docs\/(FUNCTIONALITY_RECOVERED|INITIAL_SURVEY|ELIGIBILITY_CRITERIA|ELIGIBILITY)\.md$/, razon: 'son los artefactos del relevamiento de la estacion N0 sobre este mismo repositorio: describen lo que el sistema tenia el dia que se leyo, con la cifra de ese dia, y el que los refresca es el peldano y no esta guarda.' },
  { id: 'plan-del-curso', que: /^docs\/PLAN_CURSO_MENTORING\.md$/, razon: 'es el borrador fechado del plan comercial del curso, voz del autor, fuera del corpus traducido y explicitamente fuera de la regla de los idiomas (D-051): sus cifras son las del plan y no las del metodo.' },
];

export const IDIOMAS = { 'docs/en/': 'en', 'docs/pt/': 'pt', 'docs/fr/': 'fr', 'docs/de/': 'de', 'docs/it/': 'it', 'docs/ja/': 'ja', 'docs/zh/': 'zh' };
export const idiomaDe = (ruta) => Object.entries(IDIOMAS).find(([p]) => ruta.startsWith(p))?.[1] ?? 'es';
export const esIdeografico = (idioma) => idioma === 'ja' || idioma === 'zh';

/** La cifra de diez o mas, deletreada, por idioma. Las decenas alcanzan: toda compuesta las lleva. */
const GRANDE = {
  es: '(?:diez|once|doce|trece|catorce|quince|dieci[a-zéí]+|veint[eiu][a-zóí]*|treinta|cuarenta|cincuenta|sesenta|setenta|ochenta|noventa|cien(?:to)?)(?:\\s+y\\s+[a-zéíó]+)?',
  en: '(?:ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred)(?:-[a-z]+)?',
  pt: '(?:dez|onze|doze|treze|cator[zc]e|quatorze|quinze|dezess[a-z]+|dezoito|dezenove|vinte|trinta|quarenta|cinquenta|sessenta|setenta|oitenta|noventa|cem|cento)(?:\\s+e\\s+[a-zç]+)?',
  fr: '(?:dix|onze|douze|treize|quatorze|quinze|seize|vingt|trente|quarante|cinquante|soixante|cent)(?:[- ](?:et[- ])?[a-zéû]+)?',
  de: '(?:[a-zäöüß]*(?:zehn|elf|zw[oö]lf|zwanzig|drei(?:ssig|ßig)|vierzig|f[uü]nfzig|sechzig|siebzig|achtzig|neunzig|hundert))',
  it: '(?:dieci|undici|dodici|tredici|quattordici|quindici|sedici|diciassette|diciotto|diciannove|vent[a-z]*|trent[a-z]*|quarant[a-z]*|cinquant[a-z]*|sessant[a-z]*|settant[a-z]*|ottant[a-z]*|novant[a-z]*|cent[a-z]*)',
};
const IDEOGRAMAS ='[零一二三四五六七八九两両]*[十百][零一二三四五六七八九十百]*(?![分％%万千])';
const DIGITOS = '\\d{2,}';

/** El sustantivo de la coleccion y el de sus caras, por idioma. */
const SUSTANTIVO = {
  es: '(?:regl(?:a|as)|caras?)', en: '(?:rules?|faces?)', pt: '(?:regras?|faces?)',
  fr: '(?:r[eè]gles?|facettes?)', de: '(?:Regeln?|Facetten?)', it: '(?:regol[ae]|facc(?:ia|e))',
  ja: '(?:規則|ルール)', zh: '(?:规则)',
};
const LETRA = 'A-Za-zÀ-ÿ';
const VENTANA = { latino: 30, ideografico: 10 };

/** Lo que un numero lleva al lado cuando NO es la cuenta de una coleccion: su unidad. */
const UNIDAD = /(?:segundos?|seconds?|secondes?|Sekunden|secondi|minutos?|minutes?|Minuten|minuti|horas?|hours?|heures?|Stunden|ore|l[ií]neas?|lines?|lignes|Zeilen|righe|linhas|caracteres?|characters?|Zeichen|caratteri|bytes?|ms\b|%|por ciento|per cent|pour cent|Prozent|per cento)/i;

/** Una cifra con su fecha al lado es un registro fechado y lleva las palabras de su dia. */
const FECHA = /\b20\d\d-\d\d-\d\d\b/;

export function cuentasDeclaradas(ruta = raiz) {
  const h = JSON.parse(readFileSync(join(ruta, 'gates/heuristics.json'), 'utf8'));
  const caras = (h.rules ?? []).reduce((n, r) => n + (r.faces?.length ?? 0), 0);
  return { total: h.counts.total, total_menos_uno: h.counts.total - 1, calidad: h.counts.code_quality, usabilidad: h.counts.usability, caras };
}

/** El deletreo de un valor, por idioma, con las variantes de genero que la prosa usa. */
export function deletreos(n, idioma) {
  if (!Number.isInteger(n) || n < 10 || n > 99) {
    throw new Error('deletreos(' + n + '): el deletreador cubre de diez a noventa y nueve y no improvisa afuera de su alcance');
  }
  const d = Math.floor(n / 10), u = n % 10;
  if (esIdeografico(idioma)) {
    const ID = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    return [(d === 1 ? '' : ID[d]) + '十' + (u ? ID[u] : '')];
  }
  const DIEZ = {
    es: ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciseis', 'diecisiete', 'dieciocho', 'diecinueve'],
    en: ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
    pt: ['dez', 'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'],
    fr: ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'],
    de: ['zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'],
    it: ['dieci', 'undici', 'dodici', 'tredici', 'quattordici', 'quindici', 'sedici', 'diciassette', 'diciotto', 'diciannove'],
  };
  const DEC = {
    es: ['', 'diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'],
    en: ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'],
    pt: ['', 'dez', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'],
    fr: ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante', 'quatre-vingt', 'quatre-vingt'],
    de: ['', 'zehn', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'],
    it: ['', 'dieci', 'venti', 'trenta', 'quaranta', 'cinquanta', 'sessanta', 'settanta', 'ottanta', 'novanta'],
  };
  const UNI = {
    es: ['', ['uno', 'una'], ['dos'], ['tres'], ['cuatro'], ['cinco'], ['seis'], ['siete'], ['ocho'], ['nueve']],
    en: ['', ['one'], ['two'], ['three'], ['four'], ['five'], ['six'], ['seven'], ['eight'], ['nine']],
    pt: ['', ['um', 'uma'], ['dois', 'duas'], ['três'], ['quatro'], ['cinco'], ['seis'], ['sete'], ['oito'], ['nove']],
    fr: ['', ['un', 'une'], ['deux'], ['trois'], ['quatre'], ['cinq'], ['six'], ['sept'], ['huit'], ['neuf']],
    de: ['', ['ein'], ['zwei'], ['drei'], ['vier'], ['fünf'], ['sechs'], ['sieben'], ['acht'], ['neun']],
    it: ['', ['uno'], ['due'], ['tre'], ['quattro'], ['cinque'], ['sei'], ['sette'], ['otto'], ['nove']],
  };
  if (d === 1) return [DIEZ[idioma][u]];
  if (u === 0) return [DEC[idioma][d]];
  const dec = DEC[idioma][d];
  return UNI[idioma][u].map((uni) => {
    if (idioma === 'es') return d === 2 ? 'veinti' + (uni === 'uno' ? 'uno' : uni) : dec + ' y ' + uni;
    if (idioma === 'en') return dec + '-' + uni;
    if (idioma === 'pt') return dec + ' e ' + uni;
    if (idioma === 'fr') return u === 1 ? dec + ' et ' + uni : dec + '-' + uni;
    if (idioma === 'de') return uni + 'und' + dec;
    return (u === 1 || u === 8 ? dec.slice(0, -1) : dec) + uni;
  });
}

export function documentos(ruta = raiz) {
  const todos = execFileSync('git', ['ls-files', '*.md'], { cwd: ruta, encoding: 'utf8' }).trim().split('\n').filter(Boolean);
  return todos.filter((f) => !EXENTOS_DE_ARBOL.some((e) => e.que.test(f)));
}

/**
 * El registro de formas (PND-115, la salida (a) sobre el residuo que dejo (b)). Cada entrada dice
 * QUE saltea y POR QUE, y la comprobacion C exige que siga salteando algo real. No es una
 * condicion escondida: es lo que el Anexo H pide para cualquier regla apagada.
 */
export const EXENTOS = [
  { id: 'cifra-fechada', donde: '*', cuando: (h) => FECHA.test(h.oracion), razon: 'una cifra con su fecha al lado es un registro fechado y lleva las palabras de su dia (D-053, D-061). Son las notas apiladas del anexo ("Y desde el 2026-11-07 son cincuenta y dos") en los ocho idiomas: la forma que se fecha a si misma no se vence.' },
  { id: 'unidad-y-no-cuenta', donde: '*', cuando: (h) => UNIDAD.test(h.fragmento + ' ' + h.despues), razon: 'un numero seguido de su unidad -- segundos, lineas, por ciento -- no es la cuenta de una coleccion. Entra porque la ventana de treinta caracteres lo alcanza cuando el sustantivo esta cerca ("esta cara va a recibir: una corrida, quince segundos").' },
  { id: 'cuenta-del-contrato-de-convivencia', donde: /peldano-01-contrato-de-convivencia\.md$|MANUAL_CURSO(_EVOLUTIVO)?\.md$/, razon: 'la cuenta de reglas del contrato de convivencia (ocho minimas, trece en el camino heredado) y el umbral de su senal de alarma ("mas de veinte reglas") NO los declara el dato: viven en una sola copia, en la prosa del peldano 1, asi que no hay dos copias que se desincronicen. Cuando paso de seis a ocho con D-078, cambio en su unica fuente.' },
  { id: 'hecho-historico-de-pnd-039', donde: /ESCALERA_METODOLOGICA\.md$/, cuando: (h) => /veintisiete|twenty-seven|vinte e sete|vingt-sept|siebenundzwanzig|ventisette|二十七/i.test(h.fragmento), razon: 'el lector que adapto el metodo omitio veintisiete de las cuarenta y cinco reglas que existian ESE DIA (PND-039, D-061). Es un hecho fechado: derivarlo seria reescribir lo que paso.' },
  { id: 'medicion-de-pnd-111', donde: /ANEXO_HEURISTICAS\.md$/, cuando: (h) => /二十八|veintiocho|twenty-eight|vinte e oito|vingt-huit|achtundzwanzig|ventotto/i.test(h.fragmento) && /CQ-24|forzad|forçad|forzat|forced|forc[eé]|erzwung|强制|強制/i.test(h.oracion), razon: 'la medicion que trajo CQ-24.1: veintiocho elementos del registro del brazo nombran el cierre forzado en su prosa. Es una cifra medida de otro sistema y coincide por casualidad con la cuenta de usabilidad.' },
  { id: 'tabla-de-la-propuesta-original', donde: '*', cuando: (h) => /^\s*\|/.test(h.parrafo) && /\|\s*D-0\d\d/.test(h.parrafo), razon: 'una fila de la tabla cuya ultima celda es la decision que la fijo es un registro fechado: dice lo que esa decision decidio el dia que se tomo, con la cifra de ese dia (D-053). Son la tabla de la propuesta original del anexo y sus correcciones.' },
  { id: 'correccion-del-conteo-de-d-061', donde: /ANEXO_HEURISTICAS\.md$/, cuando: (h) => /CQ-18/.test(h.parrafo) && /UX-27/.test(h.parrafo), razon: 'el parrafo que registra el defecto de conteo que D-061 corrigio, con los rangos de ids que existian ese dia (CQ-01 a CQ-18, UX-01 a UX-27). Es la correccion fechada de una cifra, no una cifra vigente.' },
  { id: 'referencia-a-una-regla-por-su-numero', donde: '*', cuando: (h) => /(?:regl|rule|r[eè]gl|Regel|regol|regra|规则|規則|ルール)[a-zäöüéèà]*\s*\d/i.test(h.fragmento), razon: 'una regla nombrada por su numero -- "la regla 10 del contrato", "las reglas 7, 9 y 10" -- es un identificador y no una cuenta. El contrato de convivencia numera sus reglas y la prosa las cita por ese numero.' },
  { id: 'numero-que-no-es-una-cuenta-declarada', donde: '*', cuando: (h) => /^\d+/.test(h.fragmento) && !Object.values(h.cuentas).includes(Number.parseInt(h.fragmento, 10)), razon: 'un numero que abre el fragmento y que NO es ninguna de las cuentas que el dato declara es el numero de una seccion, de un peldano o de una celda de tabla ("el tablero de la seccion 12 cuenta caras", "| 11 Simetria | la regla si"). La condicion se deriva del dato: si el valor fuera una cuenta declarada, el hallazgo sale igual.' },
  { id: 'cuenta-de-hallazgos-del-lote', donde: /ANEXO_HEURISTICAS\.md$/, cuando: (h) => /\bonce\b|\beleven\b|\bonze\b|\belf\b|\bundici\b|十一/i.test(h.fragmento), razon: 'once fallos medidos que se volvieron dos reglas (D-078): es la cuenta de los hallazgos de un lote, no de la coleccion.' },
];

/**
 * Lee el arbol una sola vez y devuelve el texto de cada documento del universo. Existe aparte de
 * la comprobacion para que los rojos deliberados puedan mutar una copia EN MEMORIA: una guarda que
 * solo sabe mirar el disco no se puede probar sin ensuciar el arbol, y entonces nadie la ve caer.
 */
export function leerArbol(ruta = raiz) {
  const arbol = {};
  for (const f of documentos(ruta)) arbol[f] = readFileSync(join(ruta, f), 'utf8').replace(/\r/g, '');
  return { arbol, cuentas: cuentasDeclaradas(ruta) };
}

export function comprobar(arbol, cuentas) {
  const hallazgos = [];
  const usados = new Set();
  for (const f of Object.keys(arbol)) {
    const idioma = idiomaDe(f), ideo = esIdeografico(idioma);
    const ventana = ideo ? VENTANA.ideografico : VENTANA.latino;
    const num = ideo ? IDEOGRAMAS : '(?<![' + LETRA + '])(?:' + GRANDE[idioma] + '|(?<![\\d\\-./])' + DIGITOS + ')(?![' + LETRA + '])';
    const sus = ideo ? SUSTANTIVO[idioma] : '(?<![' + LETRA + '])' + SUSTANTIVO[idioma] + '(?![' + LETRA + '])';
    // El medio de la ventana no cruza un fin de oracion: en ideografico eso incluye su propia
    // puntuacion, porque "veinticuatro peldanos. Hay tres reglas de mentoring" son dos oraciones.
    const medio = (ideo ? '[^.;!?\\n。！？；]{0,' : '[^.;!?\\n]{0,') + ventana + '}?';
    const formas = [
      { comprobacion: 'A', re: new RegExp(num + medio + sus, ideo ? 'gi' : 'giu') },
      { comprobacion: 'A', re: new RegExp(sus + medio + num, ideo ? 'gi' : 'giu') },
    ];
    for (const [cuenta, valor] of Object.entries(cuentas)) {
      if (cuenta === 'calidad') continue; // registrado arriba: veinticuatro es tambien la cuenta de peldanos
      for (const forma of deletreos(valor, idioma)) {
        const esc = forma.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const cuerpo = ideo
          ? '(?<![零一二三四五六七八九十百])' + esc
          : '(?<![' + LETRA + '])' + esc + '(?![' + LETRA + '])';
        formas.push({ comprobacion: 'B', cuenta, valor, re: new RegExp(cuerpo, ideo ? 'g' : 'giu') });
      }
    }
    for (const parrafo of arbol[f].split(/\n\s*\n/)) {
      const plano = parrafo.replace(/\n/g, ' ');
      const vistos = new Set();
      for (const forma of formas) {
        forma.re.lastIndex = 0;
        let m;
        while ((m = forma.re.exec(plano))) {
          const clave = forma.comprobacion + ':' + m.index + ':' + m[0];
          if (vistos.has(clave)) continue;
          vistos.add(clave);
          const h = {
            archivo: f, idioma, comprobacion: forma.comprobacion, cuenta: forma.cuenta ?? null,
            fragmento: m[0].replace(/\s+/g, ' '),
            despues: plano.slice(m.index + m[0].length, m.index + m[0].length + 24),
            oracion: plano.slice(Math.max(0, m.index - 140), m.index + m[0].length + 140).replace(/\s+/g, ' '),
            parrafo: plano, cuentas,
          };
          const ex = EXENTOS.find((e) => (e.donde === '*' || e.donde.test(f)) && (!e.cuando || e.cuando(h)));
          if (ex) { usados.add(ex.id); continue; }
          hallazgos.push(h);
        }
      }
    }
  }
  return { cuentas, documentos: Object.keys(arbol).length, hallazgos, sinUso: EXENTOS.filter((e) => !usados.has(e.id)).map((e) => e.id) };
}

export function analizar(ruta = raiz) {
  const { arbol, cuentas } = leerArbol(ruta);
  return comprobar(arbol, cuentas);
}

export function informe(r) {
  const l = [];
  for (const h of r.hallazgos) {
    l.push('  [' + h.comprobacion + (h.cuenta ? '/' + h.cuenta : '') + '] ' + h.archivo + ': "' + h.fragmento + '"');
    l.push('        ...' + h.oracion.slice(80, 230) + '...');
  }
  for (const id of r.sinUso) l.push('  [C] la exencion "' + id + '" ya no saltea nada: o el texto que la justificaba cambio de forma, o sobra.');
  const cuentas = Object.entries(r.cuentas).map(([k, v]) => k + '=' + v).join(' ');
  l.push('cuenta de reglas en la prosa: comprobado -- ' + r.documentos + ' documentos del universo, '
    + 'cuentas derivadas del dato (' + cuentas + '), ' + EXENTOS.length + ' exenciones con su razon, '
    + (r.sinUso.length ? r.sinUso.length + ' sin uso, ' : '') + r.hallazgos.length + ' hallazgos');
  return l.join('\n');
}

if (esLineaDeComandos(import.meta.url)) {
  const r = analizar();
  console.log(informe(r));
  process.exit(r.hallazgos.length + r.sinUso.length === 0 ? 0 : 1);
}
