// Lo que el dato exige por ruta, el contrato lo nombra (D-065, PND-053).
//
// El dato declara, por peldano, los archivos que la compuerta busca. Si el dato busca un
// archivo que el contrato no nombra, la compuerta falla por una razon que a la persona nunca
// se le dijo: ella escribio lo que el prompt le pidio y le sale en rojo un archivo del que
// nadie le hablo. Es la asimetria entre el dato y la prosa, que es lo que persigue el
// peldano 11, aplicada a este repositorio.
//
// Por que es una biblioteca y no solo una prueba: las comprobaciones son funciones PURAS
// --reciben el dato y los textos, no leen el disco-- para que la prueba en rojo pueda
// alimentarlas con un arbol mutilado y exigir que caigan. Una guarda que nadie vio caer no
// demuestra que guarde nada, y en este proyecto ya paso cuatro veces.
//
// ALCANCE, dicho y no supuesto: esta guarda revisa los VEINTICUATRO PELDANOS. Las ocho
// estaciones N0..N7 declaran artefactos igual que los peldanos, pero su prosa no vive en
// docs/<idioma>/peldanos/ sino adentro de EVOLUTIVO_CORRECTIVO.md, que es otro documento con
// otra forma. Revisarlas pide otra lectura y no se hace aca; queda registrado para que la
// ausencia sea una exclusion escrita y no un olvido.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { raiz } from './gates_lib.mjs';
import { IDIOMAS, leer, archivoDelContrato } from './anexo_simetria.mjs';

export { IDIOMAS };

/**
 * Las rutas con comodin, registradas con su razon. Un glob no es un nombre de archivo que un
 * contrato pueda imprimir: `docs/AUDIT_*.md` se escribe en la prosa como "un archivo de
 * auditoria con su fecha". El registro esta aca, y no adentro de la comprobacion, para que
 * agregar un comodin nuevo al dato obligue a escribir su razon: la prueba exige que el
 * registro sea exactamente el conjunto de comodines que el dato tiene hoy.
 */
export const COMODINES_REGISTRADOS = new Map([
  ['docs/AUDIT_*.md', 'la auditoria lleva su fecha en el nombre; el contrato la nombra por lo que es'],
  ['docs/MONITORING_REPORT_*.md', 'un reporte por ciclo; el nombre exacto lo pone el proyecto'],
  ['docs/PERFORMANCE_*.md', 'un archivo por corrida de rendimiento'],
  ['docs/SECURITY_*.md', 'un archivo por escaneo'],
  ['docs/RETROSPECTIVE_*.md', 'una retrospectiva por iteracion, con su fecha'],
]);

export const esComodin = (ruta) => ruta.includes('*');

/** Las rutas con comodin que el dato declara hoy, sin repetir. */
export function comodinesDelDato(pasos) {
  const rutas = new Set();
  for (const paso of pasos) for (const a of paso.artifacts ?? []) if (esComodin(a.path)) rutas.add(a.path);
  return rutas;
}

/** Los pares (peldano, ruta) que la comprobacion tiene que mirar: artefactos sin comodin. */
export function artefactosExigidos(pasos) {
  const pares = [];
  for (const paso of pasos) {
    for (const a of paso.artifacts ?? []) {
      if (!esComodin(a.path)) pares.push({ num: paso.num, ruta: a.path });
    }
  }
  return pares;
}

/**
 * La comprobacion. Devuelve la lista de hallazgos: un hallazgo por par (peldano, ruta,
 * idioma) que el contrato no nombra. Un contrato que no se pudo leer es un HALLAZGO y no un
 * salteo, por la misma razon que en el resto del repositorio: no haber podido mirar es rojo.
 */
export function artefactosQueElContratoNoNombra(exigidos, contratosPorIdioma) {
  const faltan = [];
  for (const [idioma, contratos] of Object.entries(contratosPorIdioma)) {
    for (const { num, ruta } of exigidos) {
      const texto = contratos.get(num);
      if (texto === undefined) {
        faltan.push(idioma + '/peldano-' + num + ' (no se encontro el contrato)');
        continue;
      }
      if (!texto.includes(ruta)) faltan.push(idioma + '/peldano-' + num + ': ' + ruta);
    }
  }
  return faltan;
}

/** Todo lo que la comprobacion necesita, leido del arbol de este repositorio. */
export function leerArbol() {
  const pasos = JSON.parse(readFileSync(join(raiz, 'gates', 'steps.json'), 'utf8')).steps;
  const contratosPorIdioma = {};
  for (const idioma of IDIOMAS) {
    const principal = leer(idioma, 'ESCALERA_METODOLOGICA.md');
    const contratos = new Map();
    for (const paso of pasos) {
      const archivo = archivoDelContrato(principal, paso.num);
      if (archivo) contratos.set(paso.num, leer(idioma, 'peldanos', archivo));
    }
    contratosPorIdioma[idioma] = contratos;
  }
  return { pasos, exigidos: artefactosExigidos(pasos), contratosPorIdioma };
}
