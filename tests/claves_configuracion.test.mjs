// Las claves del ejemplo de configuracion contra el contrato que el dato declara (D-075).
//
// Por que existe. El Anexo H, seccion 7, muestra el unico archivo que un proyecto escribe para la
// compuerta, y esas claves no son prosa: son el contrato que una herramienta escribe y lee. El
// propio dato lo dice en project_config.what ("these are the field names a consumer tool has to
// write and read. Declared here so no tool has to guess them"). Hasta el 2026-10-29 el ejemplo
// las llevaba traducidas, con cuatro vocabularios distintos en los ocho idiomas, y el apagado
// escrito como el ejemplo lo ensenaba pasaba la propia compuerta del metodo en verde.
//
// La prueba que mas importa de este archivo no es la de los nombres: es la ultima, la que le da
// el ejemplo a la compuerta y exige que lo unico que salga sean los dos umbrales que el anexo
// declara deliberados en cero. Esa es la que ata el documento al programa; sin ella, los nombres
// podrian quedar todos iguales y todos equivocados.
//
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cargarFuentes, extraerAnexo } from '../build/gates_lib.mjs';
import { validar } from '../build/gates_validate.mjs';
import { comprobar, leerArbol, ejemploDe, caminosDeClave, nombresDeclarados, EXENTOS, SECCION } from '../build/claves_configuracion.mjs';

const arbol = leerArbol();
const fuentes = cargarFuentes();
const IDIOMAS = Object.keys(arbol);

test('las claves del ejemplo de configuracion son las que el dato declara, en los ocho idiomas', () => {
  const { hallazgos } = comprobar(arbol, fuentes);
  assert.deepEqual(hallazgos, [], 'docs/**/ANEXO_HEURISTICAS.md seccion ' + SECCION + ':\n  ' + hallazgos.join('\n  '));
});

test('los ocho idiomas tienen su ejemplo y es json valido', () => {
  for (const idioma of IDIOMAS) {
    const { objeto, error } = ejemploDe(arbol[idioma]);
    assert.equal(error, undefined, idioma + ': ' + error);
    assert.ok(objeto && typeof objeto === 'object', idioma + ': el ejemplo no es un objeto');
  }
});

test('los ocho idiomas llevan exactamente los mismos caminos de clave, en el mismo orden', () => {
  const referencia = caminosDeClave(ejemploDe(arbol.es).objeto).join('|');
  for (const idioma of IDIOMAS) {
    assert.equal(caminosDeClave(ejemploDe(arbol[idioma]).objeto).join('|'), referencia,
      idioma + ': una clave es nivel de datos y no se traduce ni se reordena por idioma');
  }
});

test('toda clave del ejemplo es ASCII pura, en los ocho idiomas', () => {
  for (const idioma of IDIOMAS) {
    for (const camino of caminosDeClave(ejemploDe(arbol[idioma]).objeto)) {
      const sucios = [...camino].filter((c) => c.charCodeAt(0) > 0x7f);
      assert.deepEqual(sucios, [], idioma + ': la clave ' + camino + ' no es ASCII pura (D-051)');
    }
  }
});

test('los valores SI pueden diferir por idioma: es lo que una persona escribe', () => {
  // Lo contrario de la prueba de arriba, y esta escrita para que nadie "termine de unificar" el
  // ejemplo convirtiendo el motivo de un apagado en una cadena inglesa en los ocho idiomas.
  const motivos = new Set(IDIOMAS.map((i) => ejemploDe(arbol[i]).objeto.switched_off[0].reason));
  assert.ok(motivos.size >= 7, 'el motivo del apagado tendria que estar en el idioma de cada lector, y hay ' + motivos.size + ' distintos');
});

test('el registro de exenciones no tiene ninguna entrada sin su razon', () => {
  assert.ok(EXENTOS.length > 0, 'si no hay exenciones, esta prueba ya no tiene sentido');
  for (const e of EXENTOS) {
    assert.ok(typeof e.prefijo === 'string' && e.prefijo.endsWith('.'), 'una exencion se declara por prefijo de objeto');
    assert.ok((e.razon ?? '').length >= 40, e.prefijo + ': una exencion sin razon escrita es una guarda apagada sin registro');
  }
});

test('la exencion de measured_by funciona: sus nueve claves no se exigen declaradas', () => {
  // La contracara del rojo deliberado: el metodo NO abarca con que se mide cada regla (decision
  // del dueno, 2026-10-29), asi que renombrar una de esas nueve no puede ser un hallazgo. Si esta
  // prueba se pone roja, la exencion se cerro y el ejemplo quedo exigiendo una capa que el metodo
  // deliberadamente no tiene.
  const mutado = {};
  for (const idioma of IDIOMAS) mutado[idioma] = arbol[idioma].replace('"lint": "eslint"', '"linter": "eslint"');
  assert.notEqual(mutado.es, arbol.es, 'la mutacion no cambio nada: el ancla quedo vieja');
  const { hallazgos } = comprobar(mutado, fuentes);
  assert.deepEqual(hallazgos, [], 'renombrar una clave de measured_by no es un hallazgo:\n  ' + hallazgos.join('\n  '));
});

test('todo nombre que el dato declara aparece en el ejemplo', () => {
  const declarados = nombresDeclarados(fuentes);
  const caminos = new Set(caminosDeClave(ejemploDe(arbol.es).objeto).map((c) => c.replace(/\[\]/g, '')));
  for (const campo of declarados.primerNivel) assert.ok(caminos.has(campo), 'el dato declara el campo ' + campo + ' y el ejemplo no lo nombra');
  for (const id of declarados.thresholds) assert.ok(caminos.has('thresholds.' + id), 'el dato declara el umbral ' + id + ' y el ejemplo no lo nombra');
  for (const id of declarados.switches) assert.ok(caminos.has('switches.' + id), 'el dato declara el grupo ' + id + ' y el ejemplo no lo nombra');
  for (const c of declarados.switched_off) assert.ok(caminos.has('switched_off.' + c), 'el registro de apagado declara ' + c + ' y el ejemplo no lo nombra');
});

/* ------------------------------------------------------------------ *
 * La prueba que ata el documento al programa
 * ------------------------------------------------------------------ */

const anexo = extraerAnexo();

test('el ejemplo de cada idioma, dado a la compuerta, solo reporta los dos umbrales deliberados', () => {
  // Medido el 2026-10-29 contra el ejemplo anterior: cuatro errores, dos de ellos por los grupos
  // que el ejemplo no declaraba. Y lo que no aparecia era peor que los que aparecian: el apagado
  // escrito como `exceptions` no se veia, asi que la regla quedaba apagada SIN el registro de
  // cuatro campos y la compuerta salia en verde.
  for (const idioma of IDIOMAS) {
    const config = ejemploDe(arbol[idioma]).objeto;
    const codigos = validar(fuentes, anexo, config).map((e) => e.code).sort();
    assert.deepEqual(codigos, ['E_UMBRAL_NO_DECLARADO', 'E_UMBRAL_NO_DECLARADO'],
      idioma + ': la compuerta reporta ' + codigos.join(', ') + ' sobre el ejemplo del propio anexo. '
      + 'Los dos umbrales en cero son deliberados y el anexo lo dice; cualquier otro codigo es el documento contradiciendo al programa.');
  }
});

test('el apagado del ejemplo lo VE la compuerta, con sus cuatro campos', () => {
  const config = ejemploDe(arbol.es).objeto;
  assert.ok(Array.isArray(config.switched_off) && config.switched_off.length === 1, 'el ejemplo tiene que mostrar un apagado');
  const sinUnCampo = { ...config, switched_off: [{ ...config.switched_off[0] }] };
  delete sinUnCampo.switched_off[0].review_date;
  const codigos = validar(fuentes, anexo, sinUnCampo).map((e) => e.code);
  assert.ok(codigos.includes('E_APAGADO_SIN_REGISTRO'),
    'quitandole un campo al apagado del ejemplo la compuerta tendria que caer, y no cayo: el ejemplo esta usando un nombre que la compuerta no lee');
});
