# El código de terceros que este sistema ejecuta

*Este documento **se genera** desde `vendor/terceros.json` con `node build/terceros_doc.mjs`.
No lo edites a mano: la cadena exige que coincida con el dato (`--check`), y las cifras de la
cabecera son cuentas **derivadas** del inventario y no escritas (D-077, D-090).*

`entries_total: 2`

`entries_with_a_decision: 2`

`entries_chosen_by_the_method: 1`

`entries_imposed_by_the_hosting: 1`

Es el inventario que el peldaño 14 pide: el código de terceros que este sistema **ejecuta** —no
el que importa para construirse—, con el privilegio con el que corre cada entrada y **una
decisión por entrada**. Un inventario cuyas entradas nadie resolvió es la medición que nadie
contrastó (`CQ-22.4`), así que las dos primeras cifras van juntas a propósito: la segunda
tiene que alcanzar a la primera.

**Y las otras dos cifras son la lección de este inventario, que costó dos roturas en dos
días.** Una entrada declara su **procedencia**, y hay dos: la que el método **eligió** —la
buscó, la congeló, la sirve y puede sacarla— y la que le **pusieron**, que el método no
escribió, no sirve y hoy no puede impedir. Es un campo y no un párrafo porque quien lea esto
tiene que poder distinguirlas **mecánicamente**: un inventario que dijera «ejecutamos esto,
decisión: aceptada» sobre algo que le impusieron sería cierto del campo y falso del hecho, y
cumpliría la regla por la forma incumpliéndola por el fondo. Lo que la regla prohíbe es el
privilegio **no declarado**; lo que esta columna impide es el privilegio declarado **como si
hubiera sido una elección**.

**Qué cuenta como una entrada acá.** Lo que se ejecuta: un paquete que corre en el navegador
del lector, un programa que una dependencia corre al instalarse, un binario puesto en el
camino, un proceso de fondo, un enganche que corre un comando ante un evento, **y lo que un
servidor agrega a lo publicado en el camino**. Este repositorio **no tiene dependencias**:
cero `package.json`, cero `node_modules`, cero binarios, y su construcción corre con node
pelado. Por eso el inventario es corto, y por eso lo que tiene es del lado del **navegador de
quien lee el sitio publicado**.

## mermaid 11.17.2

| | |
|---|---|
| `provenance` | `chosen_by_the_method` |
| qué ejecuta | Dibuja en el navegador del lector los diagramas escritos en bloques ```mermaid del documento principal: los convierte en SVG dentro de la propia pagina. |
| cuándo corre | Al cargar cualquiera de las paginas publicadas que tienen al menos un diagrama; el conversor incluye la etiqueta solo en esas. |
| `runs_as` | `browser_of_the_reader` |
| `privilege` | `page_dom_same_origin` |
| versión | **11.17.2**, exacta; no hay mayor flotante |
| archivo congelado | `vendor/mermaid-11.17.2.min.js` |
| lo que el sitio sirve | `docs/html/vendor/mermaid-11.17.2.min.js` |
| integridad (`sha256`) | `581ed7d74bd9048d0e3a91363927d72ef22942d7722546b27f7cc29e35390eb8` |
| integridad para quien lo espeje (SRI) | `sha384-EOXBFmc3gx5mb+vn0vPvvGqACToJD24hhacX5Yx+8NUUQrHIle/Qi5Bg9o3zKwW2` |
| red en tiempo de ejecución | `none` |
| de dónde salió, y cuándo | `https://cdn.jsdelivr.net/npm/mermaid@11.17.2/dist/mermaid.min.js`, el 2026-11-08 |
| licencia | MIT (`vendor/mermaid-11.17.2.LICENSE.txt`) |
| **decisión** | **acotada** — Pablo Kuschnirof, el 2026-11-08 (D-093, PND-120) |

**El privilegio, dicho para que se pueda juzgar.** Corre en el navegador de quien lee, con el privilegio de la pagina: puede leer y escribir el DOM de ese documento. No hay sesion, no hay cookie de dominio, no hay dato personal en el sitio y no hay nada que escribir del otro lado: el sitio publicado es un documento. No corre en ninguna maquina del metodo, ni en la construccion, ni en la cadena de integracion.

**La decisión, con las palabras del dueño.** Servirlo desde el propio sitio con la version clavada, en vez de pedirlo a un host ajeno con la mayor flotante. La razon del dueno: las tres salidas cumplirian la regla --clavar la version con su integridad declarada es una decision legitima por entrada-- pero esta es la unica en la que lo publicado no depende de que un host ajeno siga arriba. Y el cuidado que dejo escrito: servirlo desde el propio sitio NO lo saca de este inventario, porque el inventario es de lo que el sistema EJECUTA y no de quien lo hospeda; si al mudarlo desapareciera de aca, la mudanza habria roto la regla que vino a cumplir.

**Lo que se midió sobre el archivo congelado.** Medido el 2026-11-08 sobre el archivo congelado: 0 importaciones dinamicas y 0 referencias a chunks, asi que el paquete es una sola pieza y no baja nada mas. Las 29 direcciones que aparecen adentro son espacios de nombres XML, enlaces de documentacion y de licencia de sus propias dependencias.

## tccl.min.js — **lo pone el hospedaje, no el método**

| | |
|---|---|
| `provenance` | `imposed_by_the_hosting` |
| qué ejecuta el lector | `https://img1.wsimg.com/traffic-assets/js/tccl.min.js` |
| quién se declara su origen | `tccl.baseHost: secureserver.net` |
| dónde lo agrega el servidor | `immediately_after_</body>` |
| en qué páginas | `every_published_page` |
| bytes que agrega | **454** |
| `runs_as` | `browser_of_the_reader` |
| `privilege` | `page_dom_same_origin_and_its_own_host` |
| versión | `none_declared` |
| integridad declarada | **ninguna**: el archivo lo sirve un host ajeno y puede cambiar sin aviso y sin commit |
| red en tiempo de ejecución | `not_measurable_from_here` |
| lo escribió el método | **no** |
| lo sirve el método | **no** |
| el método puede impedirlo | **no** |
| medido | el 2026-11-08, en 84 de 84 páginas publicadas (RCP-142, RCP-144, RCP-145) |
| **decisión** | **acotada** — Pablo Kuschnirof, el 2026-11-08 (D-094, PND-123) |

**El privilegio, dicho para que se pueda juzgar.** Es el privilegio mas alto que este sitio le da a nadie, y es mayor que el del tercero que el metodo si eligio. Corre en el navegador de quien lee, con el privilegio de la pagina --puede leer y escribir el DOM del documento-- y ADEMAS es una pedida a un host que el metodo no controla, asi que ese host ve la direccion IP del lector, la pagina que abrio y el momento en que la abrio. En este sitio no hay sesion, no hay cookie de dominio propia y no hay dato personal cargado, pero si hay lectores: un sitio que publica una regla sobre privilegio no declarado esta entregando su navegacion a un tercero que ninguna decision del metodo puso ahi.

**La decisión, con las palabras del dueño.** Declarar primero, para que lo publicado no mienta hoy, y mudar el hospedaje despues: la salida (4) y despues la (2). La razon del dueno, que es la misma con la que eligio la (b) en PND-120: lo publicado no puede depender de que alguien respete un pedido. Por eso NO la salida (1) --pedirle al proveedor que lo apague-- que deja al metodo atado a la buena voluntad del proveedor y sin acuse. Y el borde que el dueno dejo escrito: la mudanza TRASLADA LA CLASE Y NO LA ELIMINA, porque saca a este proveedor y no a cualquier hospedaje que inyecte; asi que el criterio para elegir el nuevo no es "otro", es uno que sirva los bytes del arbol sin agregar nada, verificado por esta misma sonda antes y despues de mudar. Esta entrada NO es una aceptacion permanente: es la declaracion de un privilegio que hoy no se puede impedir, con su salida elegida y fechada, y PND-123 sigue abierto y bloqueante hasta que la mudanza pase la sonda.

**Qué manda, además de cargar un script.** El bloque no solo carga un script ajeno: deja preparados los metadatos del hospedaje --el host base, el servidor, el centro de datos y el identificador de cuenta-- antes de que el script arranque.

**Lo que de este no se puede declarar, y por qué.** No se puede declarar lo que hace en tiempo de ejecucion con la honestidad con la que se declaro el otro: el archivo lo sirve un host ajeno, puede cambiar sin aviso y sin commit, y no hay version ni huella que lo fije. Lo que si esta medido es la pedida: en un navegador real contra la pagina publicada, el bloque agrega una bajada a img1.wsimg.com (RCP-142, el 2026-11-08). Y lo que una corrida si puede decir, con su fecha: el 2026-11-08, en un navegador real contra la pagina publicada, detras de ese script el navegador no bajo nada mas (RCP-145). Es lo que paso ese dia y no una propiedad del archivo: el host puede servir otro contenido manana sin que cambie nada en este arbol, y por eso la sonda vuelve a preguntar.

**Lo que el método no controla, dicho entero.** Esta es la parte incomoda y es la que tiene que estar escrita. El hospedaje inyecta 454 bytes que el metodo no escribio, no controla y hoy NO PUEDE IMPEDIR. Declarar "ejecutamos tccl.min.js, decision: aceptado" seria cierto del campo y falso del hecho. Quien lea este inventario tiene que poder distinguir un tercero que el metodo ELIGIO de uno que le PUSIERON, y para eso esta el campo provenance: sin esa distincion, el inventario cumple la regla por la forma y la incumple por el fondo.

**Cómo podría dejar de correr.** Un pedido al soporte del hospedaje --la salida que el propio bloque nombra-- o mudar el hospedaje de la ruta del metodo a uno que sirva los bytes del arbol sin agregar nada.

**La salida elegida.** `move_the_hosting` (PND-123). El candidato tiene que servir los bytes del arbol sin agregar nada, medido por build/sonda_publicado.mjs contra el candidato ANTES de mudar y contra produccion DESPUES. Si la sonda no corre contra el candidato, la mudanza es un cambio de proveedor con la misma exposicion y un commit de confianza.

**Lo que el proveedor dice del bloque, transcripto.** *«Monitoring performance to make your website faster. If you want to opt-out, please contact web hosting support.»*

**Y el bloque entero, tal cual lo sirve el servidor**, que es con lo que
`build/sonda_publicado.mjs` contrasta lo publicado: le resta este bloque a lo que produccion
devuelve y exige que lo que quede sea byte a byte el archivo del árbol.

```html
<script>'undefined'=== typeof _trfq || (window._trfq = []);'undefined'=== typeof _trfd && (window._trfd=[]),_trfd.push({'tccl.baseHost':'secureserver.net'},{'ap':'cpsh-oh'},{'server':'p3plzcpnl505172'},{'dcenter':'p3'},{'cp_id':'10876549'},{'cp_cl':'8'}) // Monitoring performance to make your website faster. If you want to opt-out, please contact web hosting support.</script><script src='https://img1.wsimg.com/traffic-assets/js/tccl.min.js'></script>
```

---

**Qué vigila una máquina y qué no.** `node build/terceros.mjs` —que corre en la cadena con su
línea medida— recalcula la huella de cada
archivo congelado, exige que lo publicado sea byte a byte lo congelado, que cada entrada
declare su licencia con su texto en el árbol y su decisión resuelta con quién, cuándo y por
qué, y recorre **todas** las páginas publicadas juntando lo que ejecutan: una dirección
absoluta es un hallazgo, y una copia en `vendor/` que el inventario no declara también. Lo
que **no** hace es opinar sobre si un tercero es seguro, ni recalcular lo que hace en tiempo
de ejecución: eso está medido el día que se congeló y declarado arriba, y la verdad de cada
decisión la decide una persona leyendo.

**Y lo que esa guarda no puede ver, con su medición al lado.** `build/terceros.mjs` lee los
archivos del **árbol**. Lo que un servidor agrega en el camino no está en el árbol, así que es
estructuralmente invisible para ella por más entradas que se le agreguen. No es una hipótesis:
el 2026-11-08 esa guarda dijo «0 hallazgos» —y era verdad— la misma mañana en que todas las
páginas **servidas** ejecutaban un script ajeno que el hospedaje inyecta. La mitad que falta es
`node build/sonda_publicado.mjs`, que va **de la red al árbol**: le pide las páginas a
producción, les resta las inyecciones que este inventario declara y exige que lo que quede sea
byte a byte el árbol, que ninguna página servida ejecute un host que el inventario no declare,
y —al revés— que una inyección declarada que ya no aparezca también caiga, porque una
declaración que dejó de ser cierta es la copia vencida de siempre. Corre en el paso de
publicación y con calendario propio, porque lo que vigila cambia **sin un commit**: el día que
el hospedaje agregue, cambie o apague su bloque no va a haber nada en el árbol que dispare
nada. Y lo que la sonda tampoco ve —lo que un script agrega en tiempo de ejecución— lo
contesta `node tests/e2e_produccion.mjs`, en un navegador de verdad (`CQ-21.1`).
