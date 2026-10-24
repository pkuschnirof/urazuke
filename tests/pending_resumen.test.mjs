// El resumen del registro de pendientes contra sus propias entradas.
//
// Por que existe. docs/PENDING.md es el registro del peldano 5 aplicado a este proyecto, y
// el propio documento dice que la lista de pendientes ES el plan. Un plan con un resumen
// desincronizado de sus entradas no es un plan: son dos. Medido el 2026-10-24: tras cerrar
// cinco entradas en un dia, la tabla del resumen seguia diciendo tres cerrados cuando ya
// eran ocho, y treinta y un abiertos cuando eran veintisiete. Nadie miente a proposito; la
// tabla simplemente no se vuelve a contar a mano.
//
// Lo que exige: que la tabla del resumen sea exactamente lo que sale de contar las
// entradas, y que el rango de ids que el texto afirma coincida con las entradas que hay,
// sin huecos ni repetidos. Es la misma regla que ya se le aplica a docs/COMPUERTAS.md --que
// se genera y se exige coincidente-- bajada a un documento que se escribe a mano: no se
// genera, pero su resumen no puede contradecir su contenido.
//
// Y trae sus propios rojos deliberados, por el mismo motivo que los del validador: una
// comprobacion de coherencia que nadie vio caer no demuestra que guarde nada.
//
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { raiz } from '../build/gates_lib.mjs';

const GRUPOS = ['G-API', 'G-ALCANCE', 'G-IDIOMA', 'G-PUBLICACION', 'G-ECOSISTEMA'];

// Las entradas, leidas del documento. Un encabezado "## PND-026 a PND-034" es un rango y
// cuenta por todas las entradas que nombra, no por una.
function leerEntradas(texto) {
  const entradas = [];
  let actual = null;
  for (const linea of texto.replace(/\r\n/g, '\n').split('\n')) {
    const encabezado = linea.match(/^## (PND-(\d+))(?: a PND-(\d+))?/);
    if (encabezado) {
      const desde = Number(encabezado[2]);
      const hasta = encabezado[3] ? Number(encabezado[3]) : desde;
      actual = { id: encabezado[1], desde, hasta, cuantas: hasta - desde + 1 };
      entradas.push(actual);
      continue;
    }
    if (!actual) continue;
    const grupo = linea.match(/\*\*Grupo:\*\* (G-[A-Z]+)/);
    if (grupo && !actual.grupo) actual.grupo = grupo[1];
    const estado = linea.match(/\*\*Estado: ([^*]+)\*\*/);
    if (estado && !actual.estado) actual.estado = estado[1].trim();
    const severidad = linea.match(/\*\*Severidad:\*\* (\w+)/);
    if (severidad && !actual.severidad) actual.severidad = severidad[1];
  }
  return entradas;
}

function contar(entradas) {
  const filas = {};
  for (const g of GRUPOS) {
    const propias = entradas.filter((e) => e.grupo === g);
    const n = propias.reduce((a, e) => a + e.cuantas, 0);
    const cerradas = propias.filter((e) => /CERRADO/.test(e.estado ?? '')).reduce((a, e) => a + e.cuantas, 0);
    const bloqueantes = propias
      .filter((e) => !/CERRADO/.test(e.estado ?? '') && e.severidad === 'bloquea')
      .reduce((a, e) => a + e.cuantas, 0);
    filas[g] = { n, abiertas: n - cerradas, cerradas, bloqueantes };
  }
  const total = Object.values(filas).reduce(
    (a, f) => ({
      n: a.n + f.n, abiertas: a.abiertas + f.abiertas,
      cerradas: a.cerradas + f.cerradas, bloqueantes: a.bloqueantes + f.bloqueantes,
    }),
    { n: 0, abiertas: 0, cerradas: 0, bloqueantes: 0 },
  );
  return { filas, total };
}

// La tabla tal como esta escrita en el resumen.
function leerTabla(texto) {
  const filas = {};
  let total = null;
  for (const linea of texto.replace(/\r\n/g, '\n').split('\n')) {
    const f = linea.match(/^\| (G-[A-Z]+) \| (\d+) \| (\d+) \| (\d+) \| (\d+) \|$/);
    if (f) filas[f[1]] = { n: +f[2], abiertas: +f[3], cerradas: +f[4], bloqueantes: +f[5] };
    const t = linea.match(/^\| \*\*total\*\* \| \*\*(\d+)\*\* \| \*\*(\d+)\*\* \| \*\*(\d+)\*\* \| \*\*(\d+)\*\* \|$/);
    if (t) total = { n: +t[1], abiertas: +t[2], cerradas: +t[3], bloqueantes: +t[4] };
  }
  return { filas, total };
}

// Un solo lugar donde vive la semantica, para que el rojo deliberado ejercite EXACTAMENTE
// lo que ejercita el verde. Devuelve la lista de problemas: vacia es coherente.
function comprobar(texto) {
  const problemas = [];
  const entradas = leerEntradas(texto);
  if (entradas.length === 0) {
    problemas.push('no se leyo ninguna entrada: cambio el formato del encabezado');
    return problemas;
  }
  for (const e of entradas) {
    if (!GRUPOS.includes(e.grupo)) problemas.push(e.id + ': grupo no reconocido (' + e.grupo + ')');
    if (!e.severidad) problemas.push(e.id + ': sin severidad');
    if (!e.estado) problemas.push(e.id + ': sin estado');
  }

  const contado = contar(entradas);
  const escrito = leerTabla(texto);
  if (!escrito.total) {
    problemas.push('el resumen no tiene fila de total con las cinco columnas');
  } else {
    for (const g of GRUPOS) {
      if (JSON.stringify(escrito.filas[g]) !== JSON.stringify(contado.filas[g])) {
        problemas.push(g + ': el resumen dice ' + JSON.stringify(escrito.filas[g] ?? null)
          + ' y las entradas dan ' + JSON.stringify(contado.filas[g]));
      }
    }
    if (JSON.stringify(escrito.total) !== JSON.stringify(contado.total)) {
      problemas.push('el total del resumen dice ' + JSON.stringify(escrito.total)
        + ' y las entradas dan ' + JSON.stringify(contado.total));
    }
  }

  const ultimo = Math.max(...entradas.map((e) => e.hasta));
  const rango = texto.match(/`PND-001` a `PND-(\d+)`/);
  if (!rango) problemas.push('el resumen no declara el rango de ids');
  else if (Number(rango[1]) !== ultimo) {
    problemas.push('el resumen declara hasta PND-' + rango[1] + ' y la ultima entrada es PND-' + String(ultimo).padStart(3, '0'));
  }

  const vistos = new Set();
  for (const e of entradas) {
    for (let n = e.desde; n <= e.hasta; n++) {
      if (vistos.has(n)) problemas.push('PND-' + String(n).padStart(3, '0') + ' aparece dos veces');
      vistos.add(n);
    }
  }
  for (let n = 1; n <= ultimo; n++) {
    if (!vistos.has(n)) problemas.push('falta PND-' + String(n).padStart(3, '0'));
  }

  return problemas;
}

const texto = readFileSync(join(raiz, 'docs', 'PENDING.md'), 'utf8');

test('el registro de pendientes es coherente con su resumen', () => {
  const problemas = comprobar(texto);
  assert.deepEqual(problemas, [], 'docs/PENDING.md:\n  ' + problemas.join('\n  '));
});

/* ------------------------------------------------------------------ *
 * Rojos deliberados: cada mutacion tiene que caer, y nombrar lo suyo
 * ------------------------------------------------------------------ */

// Las dos primeras mutaciones se CALCULAN de la tabla que hay, no se escriben a mano.
// Una fila pegada a mano en el test queda vieja en el primer cierre que la cambie: la
// mutacion deja de mutar, el rojo pasa a probar nada y el unico aviso es la asercion
// "la mutacion no cambio nada". Medido el 2026-10-24: al cerrar cuatro entradas, las dos
// filas ancladas a mano quedaron obsoletas en el mismo commit que las cambio. Es el mismo
// defecto que este archivo vigila --un resumen que no se vuelve a contar--, una capa mas
// arriba. Asi que mueve una unidad de "cerrados" a "abiertos" en la fila que encuentre,
// sin nombrar ningun numero.
function desincronizarFila(texto, patron) {
  const fila = texto.match(patron);
  if (!fila) return texto;
  let columna = 0;
  const mutada = fila[0].replace(/\d+/g, (n) => {
    columna += 1;
    if (columna === 2) return String(Number(n) + 1); // abiertos
    if (columna === 3) return String(Number(n) - 1); // cerrados
    return n;
  });
  return texto.replace(fila[0], mutada);
}

const FILA_GRUPO = /^\| G-[A-Z]+ \| \d+ \| \d+ \| \d+ \| \d+ \|$/m;
const FILA_TOTAL = /^\| \*\*total\*\* \| \*\*\d+\*\* \| \*\*\d+\*\* \| \*\*\d+\*\* \| \*\*\d+\*\* \|$/m;

const MUTACIONES = [
  // El defecto que de verdad paso: se cierra una entrada y la tabla no se vuelve a contar.
  ['un cierre que el resumen no registro', /cerradas/,
    (t) => desincronizarFila(t, FILA_GRUPO)],
  // El total escrito a mano que no suma lo que dicen las filas.
  ['el total no coincide', /el total del resumen/,
    (t) => desincronizarFila(t, FILA_TOTAL)],
  // Una entrada nueva sin tocar el rango declarado.
  ['una entrada mas alla del rango declarado', /declara hasta PND-/,
    (t) => t.replace('# Resumen del estado', '## PND-099 — entrada de prueba\n\n- **Grupo:** G-API · **Severidad:** avisa · **Estado: abierto**\n\n# Resumen del estado')],
  // Una entrada sin los campos que el peldano 5 pide.
  ['una entrada sin grupo', /grupo no reconocido|sin severidad/,
    (t) => t.replace('- **Grupo:** G-API · **Severidad:** registra · **Repositorio:** método · **Estado: abierto**',
      '- **Repositorio:** método · **Estado: abierto**')],
];

for (const [nombre, esperado, mutar] of MUTACIONES) {
  test('rojo deliberado: ' + nombre, () => {
    const mutado = mutar(texto);
    assert.notEqual(mutado, texto, 'la mutacion no cambio nada: el ancla quedo vieja y este rojo no prueba nada');
    const problemas = comprobar(mutado);
    assert.ok(problemas.length > 0, 'la mutacion paso en verde: la comprobacion no guarda nada');
    assert.ok(problemas.some((p) => esperado.test(p)),
      'cayo, pero no nombro el problema esperado (' + esperado + '):\n  ' + problemas.join('\n  '));
  });
}
