// Los rojos deliberados de la guarda del Anexo H (D-061, PND-048).
//
// Por que existe. Es la regla de este repositorio y la leccion que costo cuatro veces: una
// comprobacion que nadie vio caer no demuestra que guarde nada. Las cuatro guardas dormidas
// del proyecto --el guardian de linea de comandos que acertaba solo en un sistema operativo
// (PND-001), la guarda que afirmaba un efecto sin verificarlo (D-057), la compuerta que no
// corria nadie (PND-038) y la prueba en rojo que mutilaba un arbol que no era el suyo
// (PND-037)-- eran todas verdes. Asi que aca cada comprobacion se alimenta con un arbol
// mutilado a proposito y tiene que caer nombrando lo suyo.
//
// Se muta el INSUMO, no el programa: las comprobaciones de build/anexo_simetria.mjs son
// puras, asi que la mutacion es una copia del arbol real con una cosa cambiada. Nada de esto
// toca el disco.
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ANEXO,
  TOKEN_CONTRATO,
  contratosQueNoCitanElAnexo,
  estacionesConEvaluadorDelAnexo,
  fichasDe,
  fichasQueNoCitanElAnexo,
  fichasQuePrometenMasQueElDato,
  leerArbol,
  peldanosConAncla,
  referenciasQueDifieren,
  revisarFallosQueEvita,
} from '../build/anexo_simetria.mjs';

const arbol = leerArbol();

/** Una copia del mapa de fichas de un idioma con la ficha `num` cambiada por `f`. */
function conFichaCambiada(fichasPorIdioma, idioma, num, f) {
  const copia = { ...fichasPorIdioma };
  const fichas = new Map(copia[idioma]);
  fichas.set(num, f(fichas.get(num)));
  copia[idioma] = fichas;
  return copia;
}

test('rojo A: una ficha a la que le sacan el enlace del anexo, en UN solo idioma', () => {
  // El idioma elegido es el japones a proposito: es el que una tabla de palabras por idioma
  // habria dejado pasar en silencio, y es por eso que la ficha se mide por el enlace.
  const mutado = conFichaCambiada(arbol.fichasPorIdioma, 'ja', 9, (t) => t.split(ANEXO).join('OTRA_COSA.md'));
  const hallazgos = fichasQueNoCitanElAnexo(arbol.conAncla, mutado);
  assert.deepEqual(hallazgos, ['ja/peldano-9 (anclas: 3, 3, 3)'], 'la mutacion cae y nombra el idioma y el peldano');
});

test('rojo A bis: una ficha que desaparece del documento tampoco pasa como verde', () => {
  const copia = { ...arbol.fichasPorIdioma };
  const fichas = new Map(copia.es);
  fichas.delete(5);
  copia.es = fichas;
  assert.deepEqual(
    fichasQueNoCitanElAnexo(arbol.conAncla, copia),
    ['es/peldano-5 (no se encontro la ficha)'],
    'una ficha ausente es un hallazgo, no un salteo',
  );
});

test('rojo B: un contrato al que le sacan el token ingles', () => {
  const copia = { ...arbol.contratosPorIdioma };
  const contratos = new Map(copia.de);
  contratos.set(12, contratos.get(12).split(TOKEN_CONTRATO).join('Appendix Q'));
  copia.de = contratos;
  assert.deepEqual(contratosQueNoCitanElAnexo(arbol.conAncla, copia), ['de/peldano-12'], 'la mutacion del contrato cae');
});

test('rojo C: una ficha que promete el anexo para un peldano que el dato no ancla', () => {
  const mutado = conFichaCambiada(arbol.fichasPorIdioma, 'es', 7, (t) => t + '\n- **Anexo H**: ancla inventada [x](' + ANEXO + ').\n');
  assert.deepEqual(
    fichasQuePrometenMasQueElDato(arbol.conAncla, mutado),
    ['es/peldano-7'],
    'la direccion inversa cae: la prosa prometiendo una compuerta que el dato no exige',
  );
});

test('rojo D: una estacion que declara un evaluador del anexo pone la guarda en rojo', () => {
  const estaciones = arbol.estaciones.map((e) =>
    e.id === 'n2-lectura-del-sistema' ? { ...e, evaluators: [...(e.evaluators ?? []), { name: 'heuristics', since_schema: 2, required: true }] } : e,
  );
  assert.deepEqual(
    estacionesConEvaluadorDelAnexo(estaciones, arbol.vocabulario),
    ['n2-lectura-del-sistema'],
    'la guarda avisa que no sabe revisar estaciones en vez de callarse',
  );
});

test('rojo D bis: el vocabulario del anexo sale del dato, y si el dato cambia, cambia', () => {
  // Si alguien le saca el ancla al peldano 9, su evaluador deja de estar en el vocabulario:
  // eso es lo que hace que la lista no este escrita a mano.
  const pasos = arbol.pasos.map((p) => (p.num === 9 ? { ...p, verify: (p.verify ?? []).filter((v) => typeof v === 'string') } : p));
  const conAncla = peldanosConAncla(pasos);
  assert.ok(!conAncla.some((p) => p.num === 9), 'el peldano 9 sale de la lista cuando el dato le saca el ancla');
  assert.ok(arbol.conAncla.some((p) => p.num === 9), 'y en el arbol real sigue estando');
  // Y entonces la direccion inversa lo detecta, porque su ficha SI enlaza el anexo.
  assert.deepEqual(
    fichasQuePrometenMasQueElDato(conAncla, { es: arbol.fichasPorIdioma.es }),
    ['es/peldano-9'],
    'sacar un ancla del dato sin sacar la prosa cae por la direccion inversa',
  );
});

test('rojo E: una traduccion que se come una referencia', () => {
  const mutado = conFichaCambiada(arbol.fichasPorIdioma, 'pt', 2, (t) => t.replace(/\[Ref\. 9\]/, '[Ref 9]'));
  const hallazgos = referenciasQueDifieren(mutado);
  assert.equal(hallazgos.length, 1, 'un solo hallazgo');
  assert.match(hallazgos[0], /^pt\/peldano-2: es=\[9,41\] pt=\[41\]$/, 'y dice que referencia falta en que idioma');
});

test('rojo F: una ficha que cita un caso sin su referencia y sin registro', () => {
  const fichas = new Map(arbol.fichasPorIdioma.es);
  fichas.set(12, fichas.get(12).replace(/\[Ref\. \d+\]\(REFERENCIAS\.md#ref-\d+\)/g, 'el caso que todos conocemos'));
  const { sinRegistro } = revisarFallosQueEvita(fichas, new Map());
  assert.ok(sinRegistro.includes('peldano 12'), 'la ficha sin referencia y sin registro cae');
});

test('rojo F bis: un registro que quedo viejo porque la ficha ya tiene su referencia', () => {
  const registrados = new Map([[12, { peldano: 12, razon: 'una razon cualquiera, suficientemente larga para pasar el largo minimo' }]]);
  const { registroViejo } = revisarFallosQueEvita(arbol.fichasPorIdioma.es, registrados);
  assert.deepEqual(registroViejo, ['peldano 12'], 'el registro viejo cae: se saca cuando la ficha consigue su referencia');
});

test('rojo F ter: si le cambian el nombre a la vineta, la prueba lo dice en vez de quedar verde', () => {
  const fichas = new Map(arbol.fichasPorIdioma.es);
  fichas.set(20, fichas.get(20).replace('- **Fallo que evita**', '- **Lo que previene**'));
  const { sinVineta, sinRegistro } = revisarFallosQueEvita(fichas, new Map());
  assert.deepEqual(sinVineta, ['peldano 20'], 'no encontrar la vineta es un hallazgo');
  assert.ok(!sinRegistro.includes('peldano 20'), 'y no se cuenta dos veces');
});

test('y cada mutacion de arriba es una sola: el arbol real sigue en verde', () => {
  // El control de que las nueve mutaciones no se filtraron al arbol que la otra prueba mira.
  assert.deepEqual(fichasQueNoCitanElAnexo(arbol.conAncla, arbol.fichasPorIdioma), []);
  assert.deepEqual(contratosQueNoCitanElAnexo(arbol.conAncla, arbol.contratosPorIdioma), []);
  assert.deepEqual(fichasQuePrometenMasQueElDato(arbol.conAncla, arbol.fichasPorIdioma), []);
  assert.deepEqual(estacionesConEvaluadorDelAnexo(arbol.estaciones, arbol.vocabulario), []);
  assert.deepEqual(referenciasQueDifieren(arbol.fichasPorIdioma), []);
});

test('y fichasDe no es un colador: un texto sin citas de contrato no devuelve fichas', () => {
  // Si el separador o la cita cambiaran de forma, fichasDe devolveria un mapa vacio y TODAS
  // las comprobaciones quedarian verdes sin mirar nada. Esto es el candado de ese modo de
  // fallar: el mapa vacio tiene que ser visible, no silencioso.
  assert.equal(fichasDe('# Un documento sin fichas\n\nTexto.\n').size, 0);
  assert.equal(fichasDe('### Peldano 5\n\n- **Contrato**: `peldanos/peldano-05-pendientes.md`.\n').size, 1);
});
