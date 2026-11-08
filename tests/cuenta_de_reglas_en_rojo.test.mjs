// Los rojos deliberados de la guarda de la cuenta de reglas (D-090, PND-115).
//
// Por el mismo motivo que los del validador, los del inventario y los de las cifras derivadas: una
// comprobacion que nadie vio caer no demuestra que guarde nada. Cada mutacion de abajo tiene que
// caer Y nombrar lo suyo -- el archivo, la comprobacion que la vio y la cuenta, cuando aplica --;
// si cae por otra razon, la guarda estaria pasando por buena una razon equivocada.
//
// La primera es la forma que origino todo, reproducida como estaba commiteada hasta hoy en el
// documento principal. La quinta es la que importa de verdad: el dato se mueve y la prosa se queda,
// que es el defecto que PND-104 y PND-115 midieron dos veces en cinco dias.
//
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { leerArbol, comprobar, EXENTOS } from '../build/cuenta_de_reglas.mjs';

const { arbol, cuentas } = leerArbol();

const correr = (mutar, cuentasMutadas = cuentas) => {
  const copia = { ...arbol };
  const antes = JSON.stringify(copia);
  mutar(copia);
  assert.notEqual(JSON.stringify(copia), antes, 'la mutacion no cambio nada: el texto que buscaba ya no esta');
  return comprobar(copia, cuentasMutadas);
};

const MUTACIONES = [
  // LA FORMA ORIGINAL, tal como estaba escrita en el documento principal hasta este cambio.
  ['la cuenta con su desglose en el documento principal',
    { archivo: 'docs/ESCALERA_METODOLOGICA.md', comprobacion: 'A', fragmento: /cincuenta y dos reglas/ },
    (c) => { c['docs/ESCALERA_METODOLOGICA.md'] = c['docs/ESCALERA_METODOLOGICA.md'].replace('Son reglas verificables —de calidad', 'Son cincuenta y dos reglas verificables —veinticuatro de calidad'); }],

  // La misma familia en el anexo, que es la fuente canonica.
  ['la cuenta en la seccion 9 del anexo',
    { archivo: 'docs/ANEXO_HEURISTICAS.md', comprobacion: 'A', fragmento: /cincuenta y dos reglas/ },
    (c) => { c['docs/ANEXO_HEURISTICAS.md'] = c['docs/ANEXO_HEURISTICAS.md'].replace('Son reglas transversales', 'Son cincuenta y dos reglas transversales'); }],

  // La celda del README, que es la que estuvo vencida once dias en los nueve archivos (PND-104).
  ['la cuenta por familia en la celda del README ingles',
    { archivo: 'docs/en/README.md', comprobacion: 'A', fragmento: /twenty-four code-quality rules/ },
    (c) => { c['docs/en/README.md'] = c['docs/en/README.md'].replace('the code-quality rules and the usability rules', 'twenty-four code-quality rules and twenty-eight usability rules'); }],

  // UNA FORMA QUE NADIE ENUMERO. El sustantivo cambia y la comprobacion A no la ve; la ve B,
  // porque el valor lo declara el dato. Es la respuesta a D-071: una guarda que solo reconoce las
  // formas de una lista dice "0 hallazgos" con razon y no mira lo que importa.
  ['una forma nueva, con otro sustantivo, que ninguna lista preveia',
    { archivo: 'docs/ESCALERA_METODOLOGICA.md', comprobacion: 'B', cuenta: 'total' },
    (c) => { c['docs/ESCALERA_METODOLOGICA.md'] = c['docs/ESCALERA_METODOLOGICA.md'].replace('Son reglas verificables', 'El anexo tiene cincuenta y tres criterios verificables, y son reglas verificables'); }],

  // EL DEFECTO QUE SE MIDIO DOS VECES: el dato crece y la prosa se queda con la cifra de ayer.
  ['el dato sube a cincuenta y tres y la prosa se queda en cincuenta y dos',
    { archivo: 'docs/ANEXO_HEURISTICAS.md', comprobacion: 'B', cuenta: 'total_menos_uno' },
    (c) => { c['docs/ANEXO_HEURISTICAS.md'] = c['docs/ANEXO_HEURISTICAS.md'].replace('Son reglas transversales', 'Son cincuenta y dos reglas transversales'); },
    { ...cuentas, total: 53, total_menos_uno: 52 }],

  // La cifra en digitos, que es la otra mitad de la comprobacion A.
  ['la cuenta escrita en digitos al lado del sustantivo',
    { archivo: 'docs/ANEXO_HEURISTICAS.md', comprobacion: 'A', fragmento: /52 reglas|reglas.*52/ },
    (c) => { c['docs/ANEXO_HEURISTICAS.md'] = c['docs/ANEXO_HEURISTICAS.md'].replace('Son reglas transversales', 'Son 52 reglas transversales'); }],

  // Las dos escrituras ideograficas, donde el numeral va pegado a su clasificador.
  ['la cuenta en chino, con su clasificador',
    { archivo: 'docs/zh/ANEXO_HEURISTICAS.md', comprobacion: 'A' },
    (c) => { c['docs/zh/ANEXO_HEURISTICAS.md'] = c['docs/zh/ANEXO_HEURISTICAS.md'].replace('是横向规则', '是五十二条横向规则'); }],

  ['la cuenta en japones',
    { archivo: 'docs/ja/ANEXO_HEURISTICAS.md', comprobacion: 'A' },
    (c) => { c['docs/ja/ANEXO_HEURISTICAS.md'] = c['docs/ja/ANEXO_HEURISTICAS.md'].replace('横断的な規則——', '五十二の横断的な規則——'); }],

  // Un registro fechado al que le sacan la fecha deja de ser un registro fechado: es la condicion
  // exacta de la exencion, y tiene que caer sin ella.
  ['la nota apilada del anexo sin su fecha',
    { archivo: 'docs/ANEXO_HEURISTICAS.md', comprobacion: 'B' },
    (c) => { c['docs/ANEXO_HEURISTICAS.md'] = c['docs/ANEXO_HEURISTICAS.md'].replace('**Y desde el 2026-11-07 son cincuenta y dos.**', '**Y ahora son cincuenta y dos.**'); }],
];

for (const [nombre, espera, mutar, cuentasMutadas] of MUTACIONES) {
  test('rojo deliberado: ' + nombre, () => {
    const r = correr(mutar, cuentasMutadas);
    assert.ok(r.hallazgos.length > 0, 'la guarda no vio nada: ' + nombre);
    const suyo = r.hallazgos.filter((h) => h.archivo === espera.archivo
      && h.comprobacion === espera.comprobacion
      && (!espera.cuenta || h.cuenta === espera.cuenta)
      && (!espera.fragmento || espera.fragmento.test(h.fragmento)));
    assert.ok(suyo.length > 0, 'cayo, pero no nombrando lo suyo. Hallazgos: '
      + JSON.stringify(r.hallazgos.map((h) => [h.archivo, h.comprobacion, h.cuenta, h.fragmento])));
  });
}

// COMPROBACION C sobre si misma: en un arbol donde ninguna exencion aplica, las denuncia a todas.
// No es un caso artificial: es exactamente lo que pasa cuando el texto que justificaba una
// exencion se reescribe y nadie se acuerda de sacarla del registro. Una exencion que ya no
// selecciona nada sigue dando verde para siempre, que es la leccion de D-086.
test('rojo deliberado: las exenciones que no saltean nada se denuncian todas', () => {
  const r = comprobar({ 'docs/PREGUNTAS_AL_PROVEEDOR.md': 'Una hoja sin ninguna cifra.\n' }, cuentas);
  assert.deepEqual(r.hallazgos, []);
  assert.equal(r.sinUso.length, EXENTOS.length, 'no denuncio todas las exenciones sin uso: ' + JSON.stringify(r.sinUso));
});
