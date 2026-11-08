# Ficha de elegibilidad — el repositorio del método Urazuke

**Artefacto de la estación N0** del tramo de normalización (`docs/EVOLUTIVO_CORRECTIVO.md`), parte
[2/2] de su consigna. El nombre del archivo es protocolo y no se traduce; su contenido va en el
idioma del proyecto, que es el castellano.

| | |
|---|---|
| **Sistema evaluado** | este repositorio (`pkuschnirof/urazuke`): la construcción, la definición de compuertas como datos, los cuatro recursos publicados y el sitio generado |
| **Sobre qué estado** | `main` en `09e48a8` para el relevamiento; la ficha se escribe sobre `f06ac41`, con el previo del inventario de terceros ya cerrado |
| **Quién verificó** | Claude Code, haciendo: montando, construyendo, leyendo, corriendo la batería y manejando un navegador de verdad |
| **Quién decidió** | **Pablo Kuschniroff**, el 2026-11-08 |
| **Decisión** | **`go` con un proyecto previo** (`PND-121`) |

**La decisión, con sus palabras.** *«Acepto tu argumento: ninguno de los dos rojos toca la capacidad
de trabajar el sistema, y declararlos previos es más honesto que dar la estación en verde con el
documento diciendo dos cuando hay cuatro. La condición es que un previo no sea una forma de verde.
Es el riesgo que este método entero combate: `MF-25` es justamente una medición que existe y no pasa.
Entonces cada previo entra **con el peldaño que bloquea y con fecha**, no como lista de deseos. Si un
previo no bloquea nada, no es un previo: es un pendiente común y se dice así.»*

Eran **dos** previos y queda **uno**: el del código de terceros se cerró en el mismo movimiento, por
decisión del mismo turno (`PND-120`, D-093). *«Y con la decisión C de abajo, el previo del CDN se
cierra en el mismo movimiento, así que N0 arranca con uno y no con dos.»*

**Un insumo que esta ficha no tuvo, dicho en vez de simulado.** La consigna manda leer el
relevamiento inicial en `docs/INITIAL_SURVEY.md` y **ese archivo no existe**. Lo verifiqué: no está
en el árbol ni en la historia. El dato **sí** lo exige —es insumo declarado del peldaño 0 y del
peldaño 2, desde el congelado, con su rótulo *«relevamiento inicial escrito por el dueno»*—, así que
el documento tiene contrato y la pregunta no es si corresponde escribirlo. No lo escribí porque el
propio bloque «antes de enviar el prompt» de N0 dice, textual, que *«esto tiene que existir, y lo
hacés vos (o el negocio con vos), **no el agente**»*: es media página de lo que el negocio sabe, y en
este camino el agente la **completa** desde el sistema en N2, no la inventa en N0. Queda como el único
insumo que N0 debe del lado del dueño. Lo que el relevamiento sí destapó, y es otra cosa, está en
`PND-122`: el tipo `station` del esquema no tiene campo `inputs`, así que en el camino del legado
ningún insumo de ninguna de las ocho estaciones existe para una máquina.

---

## Los dos criterios excluyentes

| # | Criterio | | Evidencia |
|---|---|---|---|
| **X1** | Tecnología heredada sin repositorio accesible, o sin estándar | **VERDE** | Clonado limpio desde el remoto a un árbol vacío: `git clone` → once entradas de primer nivel, estructura estándar (`build/`, `tests/`, `docs/`, `gates/`, `labels/`, `prompts/`, `vendor/`). Nada fuera de git. |
| **X2** | No se puede probar de punta a punta: ejecutar las pantallas, acceder a cada elemento y validar que el cambio llegó al backend | **VERDE**, con una aclaración | Ver el prerrequisito 4. La aclaración importa: **este sistema no tiene ninguna escritura desde la pantalla.** El sitio es un documento; no hay formulario, no hay sesión, no hay nada que mandar. Así que «el cambio llegó al backend» se verificó en la forma que este sistema sí tiene: que lo que el otro extremo sirve es lo que su huella declara. Decirlo así en vez de simular una escritura es la diferencia entre medir y actuar que medís. |

## Los siete prerrequisitos del legado

### 1. Montar un ambiente completo desde el repositorio y una copia de los datos — **VERDE**

Borré todo y cloné de cero en un árbol que no existía. Corrí la construcción entera y la batería
entera, sin instalar nada.

| qué | resultado |
|---|---|
| `git clone` | limpio |
| dependencias a instalar | **ninguna: no hay un solo `package.json` en todo el árbol** |
| `node build/build.mjs` | **código de salida 0**, 84 archivos HTML generados |
| las guardas de la cadena | **0 hallazgos** cada una, con su línea medida |
| `node --test` | **551 de 551** |

No hay modelo de datos ni persistencia que montar: este sistema no tiene base. Su «persistencia» es
el árbol de git y los archivos publicados, y vinieron con el clon.

### 2. El código es entendible y abordable — **VERDE**

Lo medí y lo leí. Sesenta y siete programas entre `build/` y `tests/`, en un solo lenguaje
(JavaScript de módulos, node pelado), sin marcos, sin generación de código y sin capas. La semántica
de cada guarda está escrita en su propia cabecera —qué mira, qué **no** promete y qué defecto medido
la hizo nacer—, que es lo que hace que no haya que adivinar.

**Lo que no entendí sin leer dos veces, dicho porque la consigna pide nombrarlo:** la
canonicalización que entra en la huella (`armarContenido()` y el orden de claves por punto de código)
y la relación entre `hash_covers`, `hash_excludes` y el congelado. No está mal escrito: son tres
reglas que se sostienen entre sí y la consecuencia de mover una está en la decisión y no en el código.
Las entendí leyendo D-053 y D-067.

### 3. La funcionalidad completa descrita para un usuario final, desde el código — **ROJO**

El artefacto existe y **está vencido**: dice que el sitio publica **dos** archivos JSON y publica
**cuatro**; cero menciones de los textos por identificador y del índice; fechado el 24 de octubre. La
compuerta no lo ve porque es el único de los dos artefactos de N0 sin `must_contain`.

**Proyecto previo: `PND-121`.** Bloquea la **estación N2**, con fecha de entrada **2026-11-08**, y no
por conveniencia: N2 es el peldaño 2 hecho por ingeniería inversa, su entrada declarada incluye el
relevamiento de N0, y su artefacto es el árbol semántico **más la lista de discrepancias**. Una lista
de discrepancias que arranca de un mapa incompleto hereda un error y lo llama hallazgo.

**Criterio de aceptación: el prerrequisito verificado en verde**, con sus dos partes: (1) el documento
describe el sistema de hoy, pantalla por pantalla y proceso por proceso, con lo inferido marcado; y
(2) su vencimiento es **detectable** —no nombra ninguna cantidad de recursos publicados, o la que
nombra sale del dato (`RECURSOS` en `build/index_api.mjs`)—. La segunda parte es D-090 bajado a este
artefacto: la salida no es vigilar la cifra, es que la cifra no esté escrita.

### 4. El frontend recorrible por una herramienta de prueba, con el efecto verificable — **VERDE, con recibo**

Escribí y corrí una prueba de punta a punta contra el **otro lado de verdad**, que es lo que `CQ-21.1`
exige: un Edge instalado en esta máquina, manejado por el protocolo de depuración, con un cliente de
websocket escrito en el propio repositorio porque acá no hay dependencias. El click es un
`Input.dispatchMouseEvent` sobre las coordenadas reales del botón: **no** es una llamada al oyente.

```
RECIBO: 6 de 6 pasos, 0 fallas.
  ok  sitio servido desde el disco
  ok  navegador real levantado -- Edge, protocolo de depuracion
  ok  la pagina cargo
  ok  los elementos son accesibles por programa -- 54 botones de traduccion
  ok  un click del navegador cambio el estado
  ok  el otro lado: lo publicado es lo que su huella declara -- huella recalculada y coincide
```

**Y su rojo, porque un verde no es prueba.** Mutilé la página —le arranqué el único `<script>`, que
deja los 54 botones en su lugar y sin oyente— y la volví a correr: el paso del click **falló** con
una `AssertionError` y el código de salida fue **1**. Esa mutación es exactamente la forma del
defecto que hizo nacer `CQ-21.1`: controles vivos en la pantalla y muertos de verdad, con la batería
en verde encima.

Y desde el 2026-11-08 hay una segunda, por el previo que se cerró: en un navegador de verdad, **5 de
5**, los diagramas dibujados por el archivo que sirve este mismo sitio, **0 recursos bajados de un
host ajeno**, y la huella de los bytes ejecutados **recalculada por el propio navegador**; con su
rojo deliberado, la misma página apuntada a un archivo que no existe, dando cero diagramas.

### 5. Se construye y se ejecuta desde los fuentes con herramientas de hoy — **VERDE**

**No hay ninguna dependencia que resolver**: cero `package.json`, cero `node_modules`, cero binarios.
Node 22.16.0 y nada más, y los programas de la cadena declaran su propio guardián de línea de
comandos portable en vez de depender de un idiom de un sistema operativo. **La construcción no
necesita red**: de los programas del árbol, sólo dos piden por la red (`api_headers.mjs` y
`portal_verify.mjs`) y `build/build.mjs` **no invoca a ninguno de los dos**. El único código de
terceros que el sistema ejecuta viaja congelado en el árbol, con su huella recalculada en cada
construcción (`docs/THIRD_PARTY_EXECUTION.md`).

### 6. Los datos de producción se pueden copiar y anonimizar, y hay un respaldo restituido — **VERDE, y la restitución ya ocurrió**

**La anonimización no es un trabajo pendiente: es una condición de construcción.** Este repositorio
tiene prohibido por regla escribir el nombre real de un cliente, en los documentos y en los mensajes
de commit, y las rutas locales de los repositorios de origen tampoco. No hay dato personal que
anonimizar porque no hay dato personal.

**Y el respaldo se restituyó, con su verificación, antes de que yo preguntara.** Es la mejor
evidencia de la ficha y no la produje hoy: cuando entró la dirección versionada e inmutable (D-073),
las versiones ya publicadas se **recuperaron de la historia de `main`** y cada una verificó contra la
huella que su registro anota. Hoy son **33 copias** y el chequeo las recorre todas: *«versiones
inmutables: comprobado — 33 copias, cada una con la huella que su registro anota, 0 hallazgos»*. Una
restitución que se verifica contra una huella registrada append-only es más de lo que el
prerrequisito pide.

### 7. Las integraciones externas tienen modo de prueba o se pueden aislar en el borde — **VERDE desde el 2026-11-08**

**Estaba en rojo y el dueño cerró el previo en el mismo movimiento** (`PND-120`, D-093). El rojo era
éste: ocho páginas publicadas —el documento principal en los ocho idiomas— ejecutaban `mermaid@11`
desde un host ajeno, **mayor flotante**, sin integridad declarada y sin inventario. Un privilegio no
declarado, que es la forma de `CQ-20`. Y era el caso de prueba del propio método: el día anterior
había entrado la exigencia de `docs/THIRD_PARTY_EXECUTION.md` y el primer sistema que no la cumplía
era el repositorio del método.

Hoy: el archivo lo sirve este sitio, con la versión exacta a la que la mayor flotante resolvía ese
día, su licencia al lado, su huella recalculada en cada construcción, el inventario con el privilegio
y **la decisión del dueño con fecha**, y una guarda que recorre todas las páginas publicadas y cae si
una vuelve a pedirle código a un host ajeno.

**La condición de este verde, y no se borra (`CQ-22.2`).** Lo escribo acá porque el verde de arriba
se sostiene y está incompleto a la vez, y eso se informa junto: **este prerrequisito cerró sobre una
verificación que miró el árbol y no la red.** El 2026-11-08, minutos después de fusionar y desplegar,
la verificación contra **producción** encontró que el hospedaje inyecta un script ajeno en todas las
páginas publicadas —`PND-123`, con su evidencia medida—: nadie lo commiteó, no está en el árbol, y la
guarda que dijo «0 hallazgos» esa mañana tenía razón porque mira el lado del cable donde no estaba.
El dueño decidió **no reabrir N0**, con la misma razón con la que no reabrió los veinticuatro
peldaños del brazo —*«un registro que se reescribe no es un registro»*—, así que lo que queda escrito
es la cifra **con su condición** y no un verde corregido a posteriori. Desde ese mismo día hay una
sonda que le pregunta a producción por red, con su paso en la publicación y su calendario semanal
(D-094), y lo que falta es la mudanza del hospedaje, que sigue abierta y bloqueante en `PND-123`.

**Y lo que ya estaba bien, medido.** Los dos programas que tocan la red están **fuera** de la cadena a
propósito; los tres chequeos contra producción son de **sólo lectura**; el despliegue al portal
necesita un secreto que alcanza a un solo repositorio y se revoca desde sus ajustes; y la compuerta
humana es `main` protegida con pull request y aprobación. Nada con consecuencia se puede disparar sin
pasar por ahí.

## Los criterios que ponderan

| # | Criterio | Respuesta, medida |
|---|---|---|
| D1 | Dueño del dominio con criterio y tiempo para decidir | **Sí.** Decide por número de opción, y hay noventa y tres decisiones fechadas con sus palabras textuales para probarlo. |
| D2 | Oráculo de verdad verificable | **Sí, y es el más duro de la ficha:** la huella que el consumidor recalcula, el registro append-only de versiones, y producción servida por un host ajeno que se puede interrogar. |
| D4 | Tecnología dentro de lo que el agente domina sin inventar | **Sí.** JavaScript de módulos sobre node, sin marcos. |
| D5 | El error tiene consecuencia real | **Sí, y es reputacional y de licencia:** una cifra vencida en lo publicado es lo que el lector copia, y ya pasó seis veces con su número. |
| D6 | La volumetría se conoce desde el día uno | **Sí, y es chica y acotada:** los documentos versionados, 84 HTML generados, cuatro recursos publicados, 33 copias inmutables. No crece con usuarios. |
| D7 | El cliente tolera maduración y un humano en el circuito | **Sí.** El humano en el circuito es compuerta dura: `main` protegida con aprobación de un propietario. |
| D9 | El alcance cabe en un repositorio y un dueño | **Casi.** Cabe en **dos** y el segundo no es del método: el portal (`pkuschnirof/rpaforce`) es el único árbol donde ninguna guarda del método puede mirar, y ya produjo un defecto que ninguna de las tres guardas podía ver (D-086). Está registrado, no es sorpresa. |
| D10 | Secretos y accesos aislables | **Sí.** Un solo secreto (`PORTAL_DEPLOY_KEY`), de alcance a un repositorio, revocable desde sus ajustes. |

## Resumen

| prerrequisito | |
|---|---|
| 1 ambiente completo | **VERDE** |
| 2 código entendible | **VERDE** |
| 3 funcionalidad descrita | **ROJO** → proyecto previo `PND-121`, bloquea N2, entró el 2026-11-08 |
| 4 frontend recorrible | **VERDE**, con recibo de navegador real y su rojo deliberado |
| 5 construir desde fuentes | **VERDE** |
| 6 datos copiables y respaldo restituido | **VERDE**, con la restitución ya verificada sobre 33 copias |
| 7 integraciones aislables | **VERDE** desde el 2026-11-08 (era rojo; `PND-120` cerrado con D-093), **con su condición escrita**: la verificación miró el árbol y no la red, y lo que la red mostró es `PND-123` |

**Seis en verde, uno en rojo, y el rojo tiene su proyecto previo con el peldaño que bloquea y con
fecha.** Los dos rojos del relevamiento eran del mismo tipo —**dos copias de un hecho que el sistema
no vuelve a derivar**: la cuenta de recursos en la funcionalidad recuperada, y el privilegio de un
tercero que nadie inventarió—. Es, otra vez, la familia de D-044, D-077, D-086 y D-090, ahora
encontrada por el relevamiento del propio sistema en vez de por un lector.

---

## Las preguntas que le hice al dueño, y sus respuestas

Las tres que la ficha necesitaba, porque eran decisiones y no mediciones. Van con su respuesta
textual, que es lo que la consigna [2/2] pide incluir.

**1. Sobre el rojo 7, qué salida querés:** (a) clavar `mermaid` en una versión exacta y declarar su
integridad, dejando la dependencia del CDN; (b) servir el archivo desde el propio sitio; o (c) sacar
los diagramas. Recomendé (b).

> **(b), y el inventario igual.** *«Tu argumento me convence y le agrego el que falta, que es más
> fuerte que el de neutralidad: el método publicó ayer `docs/THIRD_PARTY_EXECUTION.md`, que exige el
> inventario del código de terceros que el sistema EJECUTA con una decisión por entrada. Que el
> primer sistema que no lo cumple sea el repositorio del método no es ironía: es el caso de prueba, y
> lo escribiste vos. Las tres opciones cumplirían la regla —(a) con integridad declarada es una
> decisión legítima por entrada— pero (b) es la única en la que lo publicado no depende de que un
> host ajeno siga arriba. Y el cuidado, que es donde se equivocaría alguien aplicando esto mal:
> servir mermaid desde el propio sitio **no lo saca del inventario**. El inventario es de lo que el
> sistema **ejecuta**, no de quien lo hospeda. La entrada sigue, cambia su decisión y gana la versión
> clavada. Si al mudarlo desaparece del inventario, la mudanza rompió la regla que vino a cumplir.»*

**2. Sobre `docs/INITIAL_SURVEY.md`, que la consigna manda leer y no existe:** ¿lo escribimos, con su
pendiente, o la consigna deja de nombrarlo en los ocho idiomas? Recomendé escribirlo.

> **Sí, pero en el orden inverso.** *«El hallazgo que abrís es el que importa, y es mejor que la
> pregunta (...) Sobre el documento: sí, se escribe, pero **primero el dato lo exige y después se
> escribe**. Al revés sería dejar que la prosa gobierne al dato, que es lo contrario de D-055 y de
> todo lo que el método sostiene. El orden es: mirar si el relevamiento inicial es un artefacto del
> método; si lo es, el dato lo exige y entonces el documento tiene contrato; si no lo es —si es una
> nota de trabajo que se le escapó a la consigna— entonces la respuesta correcta era la 2 y la
> consigna deja de nombrarlo en los ocho idiomas. **No escribas el documento para que la ruta deje de
> faltar.** Esa es la trampa, y es de la misma familia que "que exista un inventario".»*

Lo verifiqué contra el dato antes de escribir nada, y **mi premisa era falsa**: el dato ya lo exige,
como insumo del peldaño 0 y del peldaño 2, desde el congelado. Así que es un artefacto del método, ya
tiene contrato, y lo escribe el dueño —media página de lo que el negocio sabe— porque eso es lo que
el propio contrato de N0 dice. Lo que falta de verdad está en `PND-122`.

**3. Sobre el destino del hallazgo de la consigna:** ¿pendiente del método, o dentro de la pregunta 2?

> **Pendiente del método, y vale por sí solo.** *«Eso es `CQ-19.3` aplicado a las rutas —el universo
> en una sola dirección— y vale por sí solo. Abrilo con destino método.»*

`PND-122`, abierto, con la corrección de mi afirmación escrita adentro.

---

## Lo que esta ficha no promete

Que el sistema esté bien construido: eso lo contestan sus compuertas, peldaño por peldaño. Esta ficha
contesta otra cosa, que es la pregunta de N0: **si este sistema se puede encarar con el método**, con
cada prerrequisito verificado haciendo y con su evidencia al lado. Y no contesta por el dueño: la
decisión de arriba es suya, con su fecha y sus palabras.
