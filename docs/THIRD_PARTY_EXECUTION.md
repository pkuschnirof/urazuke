# El código de terceros que este sistema ejecuta

*Este documento **se genera** desde `vendor/terceros.json` con `node build/terceros_doc.mjs`.
No lo edites a mano: la cadena exige que coincida con el dato (`--check`), y las dos cifras de
la cabecera son cuentas **derivadas** del inventario y no escritas (D-077, D-090).*

`entries_total: 1`

`entries_with_a_decision: 1`

Es el inventario que el peldaño 14 pide: el código de terceros que este sistema **ejecuta** —no
el que importa para construirse—, con el privilegio con el que corre cada entrada y **una
decisión por entrada**. Un inventario cuyas entradas nadie resolvió es la medición que nadie
contrastó (`CQ-22.4`), así que las dos cifras de arriba van juntas a propósito: la segunda
tiene que alcanzar a la primera.

**Qué cuenta como una entrada acá.** Lo que se ejecuta: un paquete que corre en el navegador
del lector, un programa que una dependencia corre al instalarse, un binario puesto en el
camino, un proceso de fondo, un enganche que corre un comando ante un evento. Este
repositorio **no tiene dependencias**: cero `package.json`, cero `node_modules`, cero binarios,
y su construcción corre con node pelado. Por eso el inventario es corto, y por eso la única
entrada que tiene es del lado del **navegador de quien lee el sitio publicado**.

## mermaid 11.17.2

| | |
|---|---|
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
