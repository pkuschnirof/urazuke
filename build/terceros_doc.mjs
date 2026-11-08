// docs/THIRD_PARTY_EXECUTION.md SE GENERA desde vendor/terceros.json (D-093, PND-120).
//
// Por que se genera y no se escribe. El artefacto que el metodo pide en el peldano 14 lleva
// `entries_total` y `entries_with_a_decision` en la cabecera, que son cuentas de una coleccion que
// el dato declara: escritas a mano se vencen el dia que entra la segunda entrada, y eso es
// exactamente lo que D-077 y D-090 persiguen. Aca la cuenta se DERIVA del inventario, igual que
// `docs/COMPUERTAS.md` se deriva de `gates/`, y la huella de cada entrada se copia del dato en vez
// de transcribirse.
//
// Dos modos, el mismo que gates_doc.mjs:
//   node build/terceros_doc.mjs           reescribe el documento
//   node build/terceros_doc.mjs --check   exige que el commiteado sea exactamente el generado
//
// Lo que NO promete: no juzga la decision de ninguna entrada. La decision es del dueno y viaja
// como valor del inventario; esto la publica con su fecha y su nombre al lado.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { raiz, esLineaDeComandos } from './gates_lib.mjs';
import { leerInventario, cuentas } from './terceros.mjs';

export const DESTINO = 'docs/THIRD_PARTY_EXECUTION.md';

const ESTADO_EN_CASTELLANO = { accepted: 'aceptada', narrowed: 'acotada', rejected: 'rechazada' };

/** El documento, armado desde el inventario. Puro: recibe el dato y devuelve el texto. */
export function generar(inv) {
  const c = cuentas(inv.entries);
  const l = [];
  l.push('# El código de terceros que este sistema ejecuta');
  l.push('');
  l.push('*Este documento **se genera** desde `vendor/terceros.json` con `node build/terceros_doc.mjs`.');
  l.push('No lo edites a mano: la cadena exige que coincida con el dato (`--check`), y las dos cifras de');
  l.push('la cabecera son cuentas **derivadas** del inventario y no escritas (D-077, D-090).*');
  l.push('');
  l.push('`entries_total: ' + c.entries_total + '`');
  l.push('');
  l.push('`entries_with_a_decision: ' + c.entries_with_a_decision + '`');
  l.push('');
  l.push('Es el inventario que el peldaño 14 pide: el código de terceros que este sistema **ejecuta** —no');
  l.push('el que importa para construirse—, con el privilegio con el que corre cada entrada y **una');
  l.push('decisión por entrada**. Un inventario cuyas entradas nadie resolvió es la medición que nadie');
  l.push('contrastó (`CQ-22.4`), así que las dos cifras de arriba van juntas a propósito: la segunda');
  l.push('tiene que alcanzar a la primera.');
  l.push('');
  l.push('**Qué cuenta como una entrada acá.** Lo que se ejecuta: un paquete que corre en el navegador');
  l.push('del lector, un programa que una dependencia corre al instalarse, un binario puesto en el');
  l.push('camino, un proceso de fondo, un enganche que corre un comando ante un evento. Este');
  l.push('repositorio **no tiene dependencias**: cero `package.json`, cero `node_modules`, cero binarios,');
  l.push('y su construcción corre con node pelado. Por eso el inventario es corto, y por eso la única');
  l.push('entrada que tiene es del lado del **navegador de quien lee el sitio publicado**.');
  l.push('');

  for (const e of inv.entries) {
    const d = e.decision ?? {};
    l.push('## ' + e.name + ' ' + e.version);
    l.push('');
    l.push('| | |');
    l.push('|---|---|');
    l.push('| qué ejecuta | ' + e.what_it_runs + ' |');
    l.push('| cuándo corre | ' + e.when_it_runs + ' |');
    l.push('| `runs_as` | `' + e.runs_as + '` |');
    l.push('| `privilege` | `' + e.privilege + '` |');
    l.push('| versión | **' + e.version + '**, exacta; no hay mayor flotante |');
    l.push('| archivo congelado | `' + e.file + '` |');
    l.push('| lo que el sitio sirve | `' + e.published_as + '` |');
    l.push('| integridad (`' + e.integrity.algo + '`) | `' + e.integrity.value + '` |');
    l.push('| integridad para quien lo espeje (SRI) | `' + e.sri + '` |');
    l.push('| red en tiempo de ejecución | `' + e.network_at_runtime + '` |');
    l.push('| de dónde salió, y cuándo | `' + e.upstream + '`, el ' + e.frozen_on + ' |');
    l.push('| licencia | ' + e.license + ' (`' + e.license_file + '`) |');
    l.push('| **decisión** | **' + (ESTADO_EN_CASTELLANO[d.state] ?? d.state) + '** — ' + d.by + ', el ' + d.on
      + (d.decision_id ? ' (' + d.decision_id + (d.pending_id ? ', ' + d.pending_id : '') + ')' : '') + ' |');
    l.push('');
    l.push('**El privilegio, dicho para que se pueda juzgar.** ' + e.privilege_note);
    l.push('');
    l.push('**La decisión, con las palabras del dueño.** ' + d.why);
    l.push('');
    l.push('**Lo que se midió sobre el archivo congelado.** ' + e.network_note);
    l.push('');
  }

  l.push('---');
  l.push('');
  l.push('**Qué vigila una máquina y qué no.** `node build/terceros.mjs` —que corre en la cadena con su');
  l.push('línea medida— recalcula la huella de cada');
  l.push('archivo congelado, exige que lo publicado sea byte a byte lo congelado, que cada entrada');
  l.push('declare su licencia con su texto en el árbol y su decisión resuelta con quién, cuándo y por');
  l.push('qué, y recorre **todas** las páginas publicadas juntando lo que ejecutan: una dirección');
  l.push('absoluta es un hallazgo, y una copia en `vendor/` que el inventario no declara también. Lo');
  l.push('que **no** hace es opinar sobre si un tercero es seguro, ni recalcular lo que hace en tiempo');
  l.push('de ejecución: eso está medido el día que se congeló y declarado arriba, y la verdad de cada');
  l.push('decisión la decide una persona leyendo.');
  l.push('');
  return l.join('\n');
}

if (esLineaDeComandos(import.meta.url)) {
  const inv = leerInventario();
  const texto = generar(inv);
  const destino = join(raiz, DESTINO);
  if (process.argv.includes('--check')) {
    const actual = readFileSync(destino, 'utf8').replace(/\r\n/g, '\n');
    if (actual !== texto) {
      console.error('terceros: ' + DESTINO + ' NO coincide con vendor/terceros.json. Se genera: corre node build/terceros_doc.mjs');
      process.exit(1);
    }
    console.log('terceros: ' + DESTINO + ' coincide con los datos -- ' + inv.entries.length + ' entradas');
  } else {
    writeFileSync(destino, texto, 'utf8');
    console.log('escrito', destino, texto.length, 'bytes |', inv.entries.length, 'entradas');
  }
}
