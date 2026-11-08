// docs/THIRD_PARTY_EXECUTION.md SE GENERA desde vendor/terceros.json (D-093, PND-120).
//
// Por que se genera y no se escribe. El artefacto que el metodo pide en el peldano 14 lleva en la
// cabecera cuentas de una coleccion que el dato declara --cuantas entradas, cuantas resueltas,
// cuantas elegidas y cuantas impuestas--: escritas a mano se vencen el dia que entra la entrada
// siguiente, y eso es exactamente lo que D-077 y D-090 persiguen. El dia que esto se midio no fue
// una hipotesis: la segunda entrada llego dos dias despues de la primera. Aca la cuenta se DERIVA
// del inventario, igual que `docs/COMPUERTAS.md` se deriva de `gates/`, y la huella de cada entrada
// se copia del dato en vez de transcribirse.
//
// Y un tercero IMPUESTO lleva su propia ficha (D-094, PND-123): no la misma tabla con huecos, sino
// lo que de el si se puede declarar --el bloque transcripto, quien se dice su origen, que manda, y
// que el metodo no lo escribio, no lo sirve y hoy no puede impedirlo--, con su salida elegida.
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
  l.push('No lo edites a mano: la cadena exige que coincida con el dato (`--check`), y las cifras de la');
  l.push('cabecera son cuentas **derivadas** del inventario y no escritas (D-077, D-090).*');
  l.push('');
  l.push('`entries_total: ' + c.entries_total + '`');
  l.push('');
  l.push('`entries_with_a_decision: ' + c.entries_with_a_decision + '`');
  l.push('');
  l.push('`entries_chosen_by_the_method: ' + c.entries_chosen_by_the_method + '`');
  l.push('');
  l.push('`entries_imposed_by_the_hosting: ' + c.entries_imposed_by_the_hosting + '`');
  l.push('');
  l.push('Es el inventario que el peldaño 14 pide: el código de terceros que este sistema **ejecuta** —no');
  l.push('el que importa para construirse—, con el privilegio con el que corre cada entrada y **una');
  l.push('decisión por entrada**. Un inventario cuyas entradas nadie resolvió es la medición que nadie');
  l.push('contrastó (`CQ-22.4`), así que las dos primeras cifras van juntas a propósito: la segunda');
  l.push('tiene que alcanzar a la primera.');
  l.push('');
  l.push('**Y las otras dos cifras son la lección de este inventario, que costó dos roturas en dos');
  l.push('días.** Una entrada declara su **procedencia**, y hay dos: la que el método **eligió** —la');
  l.push('buscó, la congeló, la sirve y puede sacarla— y la que le **pusieron**, que el método no');
  l.push('escribió, no sirve y hoy no puede impedir. Es un campo y no un párrafo porque quien lea esto');
  l.push('tiene que poder distinguirlas **mecánicamente**: un inventario que dijera «ejecutamos esto,');
  l.push('decisión: aceptada» sobre algo que le impusieron sería cierto del campo y falso del hecho, y');
  l.push('cumpliría la regla por la forma incumpliéndola por el fondo. Lo que la regla prohíbe es el');
  l.push('privilegio **no declarado**; lo que esta columna impide es el privilegio declarado **como si');
  l.push('hubiera sido una elección**.');
  l.push('');
  l.push('**Qué cuenta como una entrada acá.** Lo que se ejecuta: un paquete que corre en el navegador');
  l.push('del lector, un programa que una dependencia corre al instalarse, un binario puesto en el');
  l.push('camino, un proceso de fondo, un enganche que corre un comando ante un evento, **y lo que un');
  l.push('servidor agrega a lo publicado en el camino**. Este repositorio **no tiene dependencias**:');
  l.push('cero `package.json`, cero `node_modules`, cero binarios, y su construcción corre con node');
  l.push('pelado. Por eso el inventario es corto, y por eso lo que tiene es del lado del **navegador de');
  l.push('quien lee el sitio publicado**.');
  l.push('');

  for (const e of inv.entries) {
    const d = e.decision ?? {};
    const pie = () => {
      l.push('| **decisión** | **' + (ESTADO_EN_CASTELLANO[d.state] ?? d.state) + '** — ' + d.by + ', el ' + d.on
        + (d.decision_id ? ' (' + d.decision_id + (d.pending_id ? ', ' + d.pending_id : '') + ')' : '') + ' |');
      l.push('');
      l.push('**El privilegio, dicho para que se pueda juzgar.** ' + e.privilege_note);
      l.push('');
      l.push('**La decisión, con las palabras del dueño.** ' + d.why);
      l.push('');
    };

    // Un tercero IMPUESTO lleva su propia ficha, y no es la misma tabla con huecos: lo que de él
    // se puede declarar es otra cosa --el bloque transcripto, quién se dice su origen, qué manda,
    // y sobre todo que el método no lo controla-- y una tabla con "(no aplica)" en la mitad de
    // las filas leería como una entrada incompleta en vez de como lo que es.
    if (e.provenance === 'imposed_by_the_hosting') {
      const iny = e.injection ?? {};
      const ctl = e.control ?? {};
      const m = e.measured ?? {};
      l.push('## ' + e.name + ' — **lo pone el hospedaje, no el método**');
      l.push('');
      l.push('| | |');
      l.push('|---|---|');
      l.push('| `provenance` | `' + e.provenance + '` |');
      l.push('| qué ejecuta el lector | `' + e.url + '` |');
      l.push('| quién se declara su origen | `' + iny.declares_itself_as + '` |');
      l.push('| dónde lo agrega el servidor | `' + iny.where + '` |');
      l.push('| en qué páginas | `' + iny.pages + '` |');
      l.push('| bytes que agrega | **' + iny.bytes + '** |');
      l.push('| `runs_as` | `' + e.runs_as + '` |');
      l.push('| `privilege` | `' + e.privilege + '` |');
      l.push('| versión | `' + e.version + '` |');
      l.push('| integridad declarada | **ninguna**: el archivo lo sirve un host ajeno y puede cambiar sin aviso y sin commit |');
      l.push('| red en tiempo de ejecución | `' + e.network_at_runtime + '` |');
      l.push('| lo escribió el método | **no** |');
      l.push('| lo sirve el método | **no** |');
      l.push('| el método puede impedirlo | **' + (ctl.removable_by_the_method ? 'sí' : 'no') + '** |');
      l.push('| medido | el ' + m.on + ', en ' + m.pages_with_it + ' de ' + m.pages_checked
        + ' páginas publicadas (' + (m.receipts ?? []).join(', ') + ') |');
      pie();
      l.push('**Qué manda, además de cargar un script.** ' + iny.metadata_it_sends);
      l.push('');
      l.push('**Lo que de este no se puede declarar, y por qué.** ' + e.network_note);
      l.push('');
      l.push('**Lo que el método no controla, dicho entero.** ' + ctl.note);
      l.push('');
      l.push('**Cómo podría dejar de correr.** ' + ctl.how_it_could_stop);
      l.push('');
      if (d.exit) {
        l.push('**La salida elegida.** `' + d.exit.chosen + '` (' + d.exit.pending_id + '). ' + d.exit.criterion);
        l.push('');
      }
      l.push('**Lo que el proveedor dice del bloque, transcripto.** *«' + iny.provider_comment + '»*');
      l.push('');
      l.push('**Y el bloque entero, tal cual lo sirve el servidor**, que es con lo que');
      l.push('`build/sonda_publicado.mjs` contrasta lo publicado: le resta este bloque a lo que produccion');
      l.push('devuelve y exige que lo que quede sea byte a byte el archivo del árbol.');
      l.push('');
      l.push('```html');
      l.push(iny.snippet);
      l.push('```');
      l.push('');
      continue;
    }

    l.push('## ' + e.name + ' ' + e.version);
    l.push('');
    l.push('| | |');
    l.push('|---|---|');
    l.push('| `provenance` | `' + e.provenance + '` |');
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
    pie();
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
  l.push('**Y lo que esa guarda no puede ver, con su medición al lado.** `build/terceros.mjs` lee los');
  l.push('archivos del **árbol**. Lo que un servidor agrega en el camino no está en el árbol, así que es');
  l.push('estructuralmente invisible para ella por más entradas que se le agreguen. No es una hipótesis:');
  l.push('el 2026-11-08 esa guarda dijo «0 hallazgos» —y era verdad— la misma mañana en que todas las');
  l.push('páginas **servidas** ejecutaban un script ajeno que el hospedaje inyecta. La mitad que falta es');
  l.push('`node build/sonda_publicado.mjs`, que va **de la red al árbol**: le pide las páginas a');
  l.push('producción, les resta las inyecciones que este inventario declara y exige que lo que quede sea');
  l.push('byte a byte el árbol, que ninguna página servida ejecute un host que el inventario no declare,');
  l.push('y —al revés— que una inyección declarada que ya no aparezca también caiga, porque una');
  l.push('declaración que dejó de ser cierta es la copia vencida de siempre. Corre en el paso de');
  l.push('publicación y con calendario propio, porque lo que vigila cambia **sin un commit**: el día que');
  l.push('el hospedaje agregue, cambie o apague su bloque no va a haber nada en el árbol que dispare');
  l.push('nada. Y lo que la sonda tampoco ve —lo que un script agrega en tiempo de ejecución— lo');
  l.push('contesta `node tests/e2e_produccion.mjs`, en un navegador de verdad (`CQ-21.1`).');
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
