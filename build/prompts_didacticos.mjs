// Los prompts de las lecciones son una version didactica DECLARADA (D-085, PND-094).
//
// Por que existe. Los dos manuales del curso llevan SU PROPIA COPIA del prompt de cada leccion
// -- cuarenta y siete por idioma, trescientos setenta y seis en los ocho -- y hasta el 2026-11-02
// nadie la comparaba con el contrato del peldano que ensena. El universo de build/prompts.mjs y de
// build/forma_de_la_pregunta.mjs son los veinticuatro contratos mas tres paginas; los manuales
// aparecen una sola vez en build/build.mjs, en la lista de lo que se convierte a HTML. Medido:
// CERO de los trescientos setenta y seis llevan la clausula de UX-28, y la leccion 13 no tiene la
// reproduccion de recibos que D-042 agrego el 2026-10-20 ni las declaraciones de D-079 a D-082.
//
// Y el defecto NO es la divergencia: es que no estaba declarada. El prompt de la leccion es mas
// corto A PROPOSITO -- ensena un peldano sin que al principiante le llegue todo junto (D-025) -- y
// el manual, para peor, afirmaba lo contrario: decia que trae "el prompt exacto que le vas a dar
// al agente". Esa frase era la copia que mentia. D-085 declara la divergencia, le pone condiciones
// y deja esta guarda para que las condiciones sigan ahi.
//
// Lo que exige:
//   A. cada manual, en cada idioma, lleva la DECLARACION: la subseccion que dice que el prompt de
//      la leccion es la version del curso y que el completo vive en el contrato.
//   B. cada seccion que trae su propio prompt NOMBRA su contrato, y el archivo que nombra EXISTE
//      en el arbol de ese idioma. Es la regla de D-069 aplicada a la prosa: un puntero que un
//      documento publicado nombra tiene que resolver.
//   C. las ocho versiones tienen los MISMOS prompts en las MISMAS secciones y nombran los MISMOS
//      contratos, posicion por posicion. Es lo que atrapa a una traduccion que pierde un prompt o
//      que apunta a otro peldano, que es el drift silencioso que nadie estaba midiendo.
//   D. en el manual del curso los peldanos nombrados van en orden ascendente: la leccion 13 no
//      puede apuntar al contrato del 12.
//   E. las exenciones vuelven a medirse: los dos manuales de practica quedan afuera porque no
//      llevan copia de ningun prompt, y cada uno declara CUANTOS bloques de cita tiene medidos.
//      Una maquina no puede distinguir la salida de un comando de un prompt, asi que lo que se
//      exige es que esa cifra no se mueva sin que alguien vuelva a mirar. Una exencion que se
//      puede volver falsa sola es el defecto de D-077.
//
// Lo que NO exige, dicho aca y no cuando falle: que el prompt de la leccion diga lo mismo que el
// del contrato, ni que lleve sus clausulas. No lo exige porque no es cierto que tenga que ser
// igual: es la version del curso. Lo que una persona tiene que poder hacer es ABRIR la leccion y
// el contrato y ver la diferencia declarada, y eso es lo que las cinco comprobaciones de arriba
// sostienen.
//
// Uso: node build/prompts_didacticos.mjs
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { raiz, esLineaDeComandos } from './gates_lib.mjs';

/** Los ocho idiomas de la prosa. El castellano es la fuente y tambien se revisa. */
export const IDIOMAS = ['es', 'en', 'pt', 'fr', 'de', 'it', 'ja', 'zh'];

/** Los dos manuales del curso: los unicos documentos del corpus que llevan copia de un prompt. */
export const MANUALES = ['MANUAL_CURSO.md', 'MANUAL_CURSO_EVOLUTIVO.md'];

/**
 * Lo que queda afuera, con su razon, como el registro de exclusiones del inventario del arbol.
 * No es una condicion escondida: la comprobacion E vuelve a medir la razon de cada uno.
 */
export const EXENTOS = [
  {
    ruta: 'docs/practica/MANUAL_FORGE_PROYECTO_NUEVO.md',
    bloques: 1,
    razon: 'no lleva copia de ningun prompt: dice de frente que los prompts llegan desde la API '
      + 'publicada del metodo y que la herramienta los inyecta sola. Su unico bloque de cita es '
      + 'la SALIDA de un comando. La cifra medida va al lado a proposito: una maquina no puede '
      + 'distinguir una salida de un prompt, asi que lo que esta guarda exige es que el numero '
      + 'no se mueva sin que alguien vuelva a mirar.',
  },
  {
    ruta: 'docs/practica/MANUAL_FORGE_PROYECTO_EXISTENTE.md',
    bloques: 0,
    razon: 'por lo mismo que el anterior, y sin ningun bloque de cita: es un manual de '
      + 'herramienta y no lleva prompt propio.',
  },
];

/**
 * Un trozo de la declaracion, por idioma. Es un trozo y no el texto entero a proposito, para que
 * un reajuste de lineas no se reporte como una declaracion que falta; lo que se exige es que la
 * frase que la identifica siga ahi.
 */
export const DECLARACION = {
  es: 'son la versión del curso, no la del contrato',
  en: 'are the course version, not the contract one',
  pt: 'são a versão do curso, não a do contrato',
  fr: 'sont la version du cours, pas celle du contrat',
  de: 'sind die Kursversion, nicht die des Vertrags',
  it: 'sono la versione del corso, non quella del contratto',
  ja: 'レッスンのプロンプトはコース版であり',
  zh: '课里的提示词是课程版',
};

/** Un puntero a un contrato: el archivo de un peldano, o el documento del camino heredado. */
const RE_PUNTERO = /`(peldanos\/peldano-(\d\d)-[a-z0-9-]+\.md|EVOLUTIVO_CORRECTIVO\.md)`/g;

/** Las secciones `### ` de un documento, en orden, con su cuerpo. */
export function secciones(md) {
  const lineas = md.replace(/\r\n/g, '\n').split('\n');
  const cortes = lineas.map((l, i) => (l.startsWith('### ') ? i : -1)).filter((i) => i >= 0);
  return cortes.map((desde, k) => {
    const hasta = k + 1 < cortes.length ? cortes[k + 1] : lineas.length;
    return { titulo: lineas[desde].slice(4).trim(), cuerpo: lineas.slice(desde, hasta) };
  });
}

/** Los prompts de una seccion: un bloque de cita cuya primera linea NO es una etiqueta `[xx]`. */
export function promptsDe(cuerpo) {
  let n = 0;
  let dentro = false;
  for (const l of cuerpo) {
    if (!l.startsWith('>')) { dentro = false; continue; }
    if (dentro) continue;
    dentro = true;
    if (!/^> ?\[[a-z]{2}\]\s*$/.test(l)) n += 1;
  }
  return n;
}

/** Los contratos que una seccion nombra, en orden de aparicion. */
export function punterosDe(cuerpo) {
  return [...cuerpo.join('\n').matchAll(RE_PUNTERO)].map((m) => m[1]);
}

/** El arbol de este repositorio: { idioma: { manual: { ruta, texto } } }. */
export function leerArbol(leer = readFileSync) {
  const arbol = {};
  for (const idioma of IDIOMAS) {
    arbol[idioma] = {};
    for (const manual of MANUALES) {
      const rel = (idioma === 'es' ? 'docs/' : 'docs/' + idioma + '/') + manual;
      arbol[idioma][manual] = { ruta: rel, texto: leer(join(raiz, rel), 'utf8') };
    }
  }
  return arbol;
}

/**
 * Las cinco comprobaciones sobre un arbol ya leido. Devuelve { hallazgos, cuentas }.
 * `hay` se inyecta para que los rojos deliberados puedan mentir sobre el disco.
 */
export function revisar(arbol, exentos = EXENTOS, leer = readFileSync, hay = existsSync) {
  const hallazgos = [];
  const cuentas = { prompts: 0, secciones: 0, punteros: 0 };
  const perfil = {};

  for (const idioma of IDIOMAS) {
    for (const manual of MANUALES) {
      const { ruta, texto } = arbol[idioma][manual];
      // A. la declaracion
      if (!texto.includes(DECLARACION[idioma])) {
        hallazgos.push(ruta + ': no lleva la declaracion de que el prompt de la leccion es la '
          + 'version del curso (D-085)');
      }
      const secs = secciones(texto);
      const huella = [];
      let anterior = -1;
      for (const [k, s] of secs.entries()) {
        const prompts = promptsDe(s.cuerpo);
        const punteros = punterosDe(s.cuerpo);
        huella.push(prompts + ':' + punteros.join(','));
        if (!prompts) continue;
        cuentas.prompts += prompts;
        cuentas.secciones += 1;
        cuentas.punteros += punteros.length;
        // B. el puntero, y que resuelva
        if (!punteros.length) {
          hallazgos.push(ruta + ' seccion ' + (k + 1) + ' ("' + s.titulo.slice(0, 40)
            + '"): trae ' + prompts + ' prompt(s) y no nombra su contrato');
          continue;
        }
        for (const rel of punteros) {
          if (!hay(join(raiz, dirname(ruta), rel))) {
            hallazgos.push(ruta + ' seccion ' + (k + 1) + ': nombra `' + rel
              + '`, que no existe en el arbol de ' + idioma);
          }
        }
        // D. el orden ascendente de los peldanos nombrados
        for (const rel of punteros) {
          const m = /peldano-(\d\d)-/.exec(rel);
          if (!m) continue;
          const num = Number(m[1]);
          if (num <= anterior) {
            hallazgos.push(ruta + ' seccion ' + (k + 1) + ': nombra el peldano ' + num
              + ' despues del ' + anterior + ', y las lecciones van en orden');
          }
          anterior = num;
        }
      }
      perfil[idioma + '|' + manual] = huella;
    }
  }

  // C. las ocho versiones, posicion por posicion
  for (const manual of MANUALES) {
    const fuente = perfil['es|' + manual];
    for (const idioma of IDIOMAS.filter((i) => i !== 'es')) {
      const otra = perfil[idioma + '|' + manual];
      if (otra.length !== fuente.length) {
        hallazgos.push('docs/' + idioma + '/' + manual + ': tiene ' + otra.length
          + ' secciones y el castellano ' + fuente.length);
        continue;
      }
      for (const [k, v] of fuente.entries()) {
        if (otra[k] !== v) {
          hallazgos.push('docs/' + idioma + '/' + manual + ' seccion ' + (k + 1)
            + ': el castellano tiene "' + v + '" y esta version "' + otra[k] + '"');
        }
      }
    }
  }

  // E. las exenciones, vueltas a medir
  for (const { ruta, bloques } of exentos) {
    if (!hay(join(raiz, ruta))) {
      hallazgos.push(ruta + ': esta exento y no existe, asi que la exencion sobra');
      continue;
    }
    const medidos = promptsDe(leer(join(raiz, ruta), 'utf8').replace(/\r\n/g, '\n').split('\n'));
    if (medidos !== bloques) {
      hallazgos.push(ruta + ': esta exento con ' + bloques + ' bloque(s) de cita medidos y hoy '
        + 'tiene ' + medidos + ': la razon de la exencion hay que volver a mirarla');
    }
  }

  return { hallazgos, cuentas };
}

if (esLineaDeComandos(import.meta.url)) {
  const { hallazgos, cuentas } = revisar(leerArbol());
  const resumen = IDIOMAS.length + ' idiomas, ' + MANUALES.length + ' manuales, '
    + cuentas.secciones + ' lecciones con prompt, ' + cuentas.prompts + ' prompts, '
    + cuentas.punteros + ' punteros al contrato, ' + EXENTOS.length + ' exenciones con su razon';
  if (!hallazgos.length) {
    console.log('prompts didacticos: comprobado -- ' + resumen + ', 0 hallazgos');
    process.exit(0);
  }
  console.log('prompts didacticos: ' + hallazgos.length + ' HALLAZGO(S) -- ' + resumen);
  for (const h of hallazgos) console.log('  ' + h);
  process.exit(1);
}
