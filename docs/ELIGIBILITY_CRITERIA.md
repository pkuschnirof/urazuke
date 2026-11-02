# Ficha de criterios de elegibilidad

Insumo de la estación N0 del camino evolutivo-correctivo. Era la ficha **en blanco**: la
transcripción de los criterios del peldaño 0 del documento principal
([`ESCALERA_METODOLOGICA.md`](ESCALERA_METODOLOGICA.md), Parte "¿Este proyecto se puede encarar
así?") más los siete prerrequisitos del legado de
[`EVOLUTIVO_CORRECTIVO.md`](EVOLUTIVO_CORRECTIVO.md). Las columnas las completa el agente con lo
que hizo, no con lo que le preguntó a nadie; la ficha completa, con la decisión, va a
[`ELIGIBILITY.md`](ELIGIBILITY.md).

- **Sistema evaluado**: este repositorio (`pkuschnirof/urazuke`): la construcción, la definición
  de compuertas como datos, los dos extremos publicados y el sitio generado.
- **Quién decide**: Pablo Kuschniroff, dueño del método. El agente verifica y presenta; no
  decide.
- **Fecha de apertura de la ficha**: 24 de octubre de 2026.
- **Fecha de llenado**: 30 de octubre de 2026, contra `main` en `c12fb5e`.
- **Cómo se verificó**: con un clon limpio del repositorio público en una carpeta aparte
  (`git clone https://github.com/pkuschnirof/urazuke.git`), sin tocar el árbol de trabajo. Cada
  celda de evidencia remite a una corrida cuya salida está pegada en la sección "La evidencia,
  medida" de abajo. Lo que no se pudo medir se dice, y no se escribe en verde.
- **Corrección de la propia ficha, el mismo día y antes de presentarla.** El primer llenado dijo
  dos cosas que no eran: que X2 y el prerrequisito 4 quedaban **sin verificar porque no había
  ningún motor de navegador instalado**, y que el prerrequisito 7 estaba en **verde** con una
  excepción. La primera es el defecto que D-064 prohíbe por escrito, cometido en el repositorio que
  escribió la regla: la ausencia se afirmó **sin haber buscado** —hay seis versiones de Chromium
  instaladas en esta máquina y una prueba de punta a punta con navegador real y clic de ratón
  escrita en octubre, que hoy vuelve a correr—. La segunda ablandaba un rojo que el registro de la
  corrida anterior ya había anotado. Las dos celdas están corregidas con lo medido, y el error
  queda escrito acá en vez de borrado, que es lo que el método pide.

## Los dos criterios excluyentes del peldaño 0

| # | Criterio excluyente | Respuesta | Fuente | Verde o rojo |
|---|---|---|---|---|
| X1 | Tecnología heredada sin repositorio accesible, o con repositorios que no siguen un estándar | No aplica como exclusión: hay un repositorio público accesible y es uno solo. El clon limpio trajo 606 archivos versionados y quedó en `c12fb5e`, con la disposición estándar del lenguaje (`build/`, `tests/`, `docs/`, `gates/`, `prompts/`, `labels/`) y su flujo de integración continua | E1 | **verde** |
| X2 | Tecnología que no se puede probar de punta a punta: no se pueden ejecutar las pantallas y acceder a cada elemento de la interfaz con sus distintos métodos, validando que el cambio llegó al backend | Se cumple en las dos mitades del sistema, y las dos están medidas hoy. Las **pantallas**: Chrome real manejado por el protocolo de DevTools, con un clic de ratón en coordenadas reales sobre el botón de traducir, y el efecto leído del documento —aparece la traducción, se oculta el inglés, el botón cambia de etiqueta, y el segundo clic cierra el flujo donde empezó—. La **interfaz de datos**: servida y recorrida por programa, con la huella de cada recurso recalculada por un consumidor independiente. Reserva que no bloquea: los 119 botones se alcanzan por su clase y su posición, sin identificador propio, así que el recorrido es posible y frágil | E4, E4b | **verde** |

El criterio neutral de X2, tal como lo fija el documento principal: la interfaz se puede
ejecutar por programa y cada elemento de la pantalla es accesible con sus distintos métodos
(hacer clic, tipear, leer su estado), de modo que un test pueda recorrer la pantalla y después
verificar el efecto en el backend. NAC3 no es condición: es uno de los medios.

Una aclaración sobre la segunda mitad del criterio, porque este sistema no tiene backend: lo que
publica son 84 pantallas de HTML estático y una interfaz de datos de cuatro archivos. "El efecto
llegó al backend" se verifica entonces en lo que hace de backend, que es el extremo publicado: el
recurso que el propio sitio sirve declara una huella que un tercero recalcula y compara. Eso está
medido (E4). Lo que queda a criterio del dueño es si esa traducción del criterio le sirve.

## Los criterios que ponderan (todavía sin peso, `[hipótesis]`)

| # | Criterio candidato | Respuesta | Fuente | Verde o rojo |
|---|---|---|---|---|
| D1 | Hay un dueño del dominio con criterio y con tiempo para decidir (no para programar) | Sí, y se ve en el árbol: el registro de decisiones lleva las decisiones firmadas por el dueño, dos de ellas del 2026-10-29 (D-075, D-076), y `.github/CODEOWNERS` le da la aprobación de toda fusión a una sola persona | E8 | **verde** |
| D2 | Hay un "oráculo" de verdad verificable: datos reales, un sistema externo, producción en solo lectura | Tres, y los tres se consultan sin permiso de nadie: producción en solo lectura (`yujin.app/urazuke/api/`, consultada hoy), el registro append-only de versiones con su par (versión → huella), y el congelado `gates/baseline.json` contra el que corre la prueba de diferencia cero | E2, E7 | **verde** |
| D4 | La tecnología está dentro de lo que el agente domina sin inventar (Node, Python, SQL, React) | Node 22 pelado, sin una sola dependencia de terceros, más markdown, JSON y un HTML con su CSS embebido y dos líneas de JavaScript. Las 54 unidades de código del repositorio están leídas o corridas | E3, E5 | **verde** |
| D5 | El error tiene consecuencia real (plata, salud, operación), lo que justifica el fail-closed | Lo medible: la interfaz de datos la consume al menos una herramienta externa que ya reportó tres defectos del método contra lo publicado (PND-056, PND-059, PND-061), así que un dato equivocado sale del repositorio y llega a un consumidor. Si eso alcanza como "consecuencia real" lo decide el dueño | E8 | **del dueño** |
| D6 | La volumetría se puede conocer desde el día uno | Se conoce entera y es chica: 84 pantallas, 4 recursos publicados, 184 KB de fuentes de compuertas, 16 MB de sitio generado, 63 entradas en el registro de pendientes. No hay base de datos ni crecimiento por uso: el sistema no guarda nada de nadie | E6 | **verde** |
| D7 | El cliente tolera un tiempo de maduración y un humano en el circuito | El humano en el circuito está en la máquina: `main` protegida con aprobación de un propietario, y ninguna publicación ocurre sin una fusión que él aprueba. La tolerancia al tiempo de maduración la declara el dueño | E8 | **verde en el circuito; el plazo lo declara el dueño** |
| D9 | El alcance cabe en un repositorio y un dueño | Un repositorio, 606 archivos, un propietario de código | E1, E8 | **verde** |
| D10 | Los secretos y accesos se pueden aislar (bóveda, archivo de entorno, permisos acotados) | El flujo usa **un** secreto (`PORTAL_DEPLOY_KEY`), que es una clave de despliegue alcanzada a un repositorio y se revoca desde sus ajustes; se lee en un solo trabajo, que corre sólo en `main` y sólo después de que la verificación quede verde; si falta, el trabajo falla diciéndolo y no se saltea en silencio | E8 | **verde** |

Nota de transcripción: el contrato del peldaño 0 habla de "los criterios D1 a D10", y la tabla
del documento principal tiene ocho filas: faltan D3 y D8. El propio documento dice, dos párrafos
más abajo, que dos criterios de versiones anteriores quedaron absorbidos en X1 y X2, así que los
huecos son de identificadores que no se reciclan. Queda anotado porque el texto que manda copiar
"D1 a D10" hace esperar diez.

## Los siete prerrequisitos del legado

Cada uno lo verifica el agente **haciendo**, no preguntando. Si está en rojo no es un rechazo: es
un proyecto previo con su propio criterio de salida, que es el prerrequisito verificado en verde.

| # | Prerrequisito | Verde o rojo | Evidencia (qué hizo el agente y qué pasó) | Proyecto previo, si está en rojo |
|---|---|---|---|---|
| 1 | Se puede montar un ambiente completo del sistema, con todos sus fuentes, su modelo de datos y su persistencia, desde el repositorio y una copia de los datos | **verde** | Clon limpio del repositorio público, construcción completa, suite entera y la verificación de lo publicado contra sus fuentes, todo en una carpeta recién creada y sin instalar nada: 13 s de construcción, 412 pruebas en verde, los cuatro archivos publicados coincidiendo con las fuentes. No hay base de datos que copiar: el modelo de datos son los archivos JSON de `gates/` mantenidos a mano y la persistencia es el propio repositorio (E1, E2, E3) | — |
| 2 | El código es entendible y abordable por un modelo de frontera: puede leerlo entero y explicar qué hace cada módulo sin inventar | **verde** | Se leyeron los 24 programas de `build/` línea por línea —5.102 líneas— y las fuentes de datos. No quedó ningún módulo sin entender, y la lectura dejó cuatro hallazgos propios que no venían de ninguna auditoría (E5). Lo que **no** se leyó línea por línea, y se dice: las 4.584 líneas de los 30 archivos de prueba; se corrieron, se leyeron sus nombres y se leyó entera la que vigila el guardián de línea de comandos, porque de ella dependía descartar un quinto hallazgo que resultó falso —`portal_verify.mjs` usa su propio guardián y está registrado con su razón— | — |
| 3 | A partir del código, el modelo puede describir en un documento la funcionalidad completa del sistema, en una forma que un usuario final reconozca como su sistema y acepte | **verde con una reserva medida** | El documento existe y está escrito desde el código, con sus marcas de fuente: [`FUNCTIONALITY_RECOVERED.md`](FUNCTIONALITY_RECOVERED.md), 18 KB. La reserva: se escribió el 24 de octubre contra `f49b267`, cuando el sistema tenía 12 programas y 2.064 líneas en `build/` y 158 pruebas. Hoy tiene 24 programas, 5.102 líneas y 412 pruebas, así que describe un sistema de menos de la mitad del tamaño del actual. Que un usuario final lo reconozca como su sistema no lo puede verificar el agente: lo acepta o no el dueño (E5) | Actualizar el documento contra `c12fb5e`, con el mismo método y las mismas marcas, y que el dueño lo acepte |
| 4 | El frontend puede ser recorrido por herramientas de prueba para generar tests de punta a punta, con cada elemento accesible y el efecto en el backend verificable (es X2) | **verde** | Dos pruebas, las dos corridas hoy sobre el clon limpio. La de **pantalla**, que existía de octubre y se volvió a correr: Chrome real por el protocolo de DevTools, con node pelado y sin instalar nada, y un clic de ratón de verdad —4 de sus 5 comprobaciones en verde; la quinta cae porque la escribieron fijando a mano la versión `2026.10.2` del catálogo y hoy la versión es `2026.10.11`, o sea que cae por el defecto de la prueba y no del sistema (E4b)—. Y la de **interfaz de datos**, escrita hoy: levantar el sitio, pedir el directorio, bajar los tres recursos y recalcular la huella de cada uno como consumidor independiente, sin usar una sola función del sistema; 28 comprobaciones en verde y verificada **en rojo** dos veces (E4). Reserva que no bloquea: los 119 botones no tienen identificador propio y se alcanzan por su clase y su posición | Darle a cada elemento interactivo un identificador estable, para que un recorrido de pantalla no dependa de la posición en el árbol del documento, y sacarle a la prueba de pantalla la versión fijada a mano |
| 5 | El sistema se puede construir y ejecutar desde los fuentes con herramientas disponibles hoy: las dependencias se resuelven, las versiones existen, nada depende de un binario perdido | **verde** | No hay ninguna dependencia que resolver: cero manifiestos de paquetes, cero `node_modules`, cero archivos de bloqueo, y las importaciones de `build/` y `tests/` son todas módulos propios del lenguaje (`node:fs`, `node:crypto`, `node:test`...). El único tercero del sistema entra en el navegador: ocho de las pantallas importan la biblioteca de diagramas desde una red de distribución pública, sin copia local ni alternativa (E3) | — |
| 6 | Los datos de producción se pueden copiar y anonimizar para un entorno de prueba, y hay una copia de respaldo que se restauró al menos una vez | **verde en la copia y la restauración; sin guarda la anonimización** | No hay base de datos: cero referencias a motor alguno en todo el árbol, y "los datos de producción" son el propio repositorio y los cuatro archivos que sirve el portal. La copia se hizo hoy, completa, en un minuto. La restauración **ya ocurrió de verdad**: las versiones publicadas de la interfaz se recuperaron de la historia de `main` y cada una verifica contra la huella que su registro anota —18 copias comprobadas hoy—. La anonimización de los clientes es una regla escrita del repositorio y **no la vigila ninguna prueba**: no hay guarda automática que impida escribir un nombre real (E6, E7) | Una guarda que falle si un nombre de cliente, un sistema real o una ruta local aparece en el árbol |
| 7 | Las integraciones externas tienen un modo de prueba o se pueden aislar en el borde, para que las acciones con consecuencia se prueben sin consecuencias | **rojo** (y es el mismo rojo que anotó la corrida del 24 de octubre) | Cuatro integraciones, enumeradas del flujo y del código. Dos se prueban sin consecuencia: a producción se le pregunta en **solo lectura** con dos programas que aceptan apuntar a otro extremo (`--base`), y la verificación entera corre sobre un clon cualquiera. La que tiene consecuencia real es **el empujón al repositorio del portal, que despliega a producción, y no tiene modo de ensayo**: no hay forma de correr la publicación en seco y ver qué copiaría. Lo que hay es acotación del daño, que no es lo mismo que ensayo: clave de despliegue alcanzada a un repositorio, el trabajo corre sólo en `main`, sólo después de la verificación en verde, y falla diciéndolo si falta el secreto. Y la cuarta, la red de distribución que sirve la biblioteca de diagramas al navegador, no tiene modo de prueba ni copia local: sin red, las ocho pantallas con diagramas se quedan sin diagramas (E3, E8) | Dos, y chicos: un modo en seco de la publicación que imprima qué archivos copiaría y qué borraría sin empujar nada —hoy el paso de copia vacía los dos destinos—, y servir la biblioteca de diagramas desde el propio sitio o declarar por escrito que el diagrama es decoración |

## Compuerta de la estación

Los siete en verde, con la evidencia del agente: el ambiente montado, el documento de
funcionalidad escrito y un test de punta a punta de un flujo corriendo. Cada rojo se convierte en
un proyecto previo con su propio pendiente de salida, marcado como bloqueante.

**Estado al 30 de octubre de 2026**: seis en verde y **uno en rojo**, que es el mismo que estaba
en rojo el 24 de octubre —las integraciones: el empujón que publica no tiene modo de ensayo—. De
los seis verdes, tres llevan una reserva escrita que el dueño tiene que leer antes de decidir: el
documento de funcionalidad quedó viejo (3), los botones de las pantallas no tienen identificador
propio (4) y la anonimización de los clientes no tiene guarda (6). Ninguna de las tres impide
recorrer el sistema ni montarlo; las tres son trabajo, y el dueño decide si son previo o posterior.

## La evidencia, medida

Cada bloque es la salida real, recortada cuando era larga. Se corrió el 30 de octubre de 2026
sobre el clon limpio, salvo donde se dice.

**E1 — el clon y lo que trajo.**

```
$ git clone https://github.com/pkuschnirof/urazuke.git
HEAD: c12fb5e
606 archivos versionados
build  docs  gates  labels  prompts  tests  CLAUDE.md  CONTRIBUTING.md  LICENSE  README.md
por extension: 357 md, 85 html, 54 mjs, 51 json, 40 png, 12 txt, 2 diff, 1 yml
```

**E2 — la construcción completa y la suite, en el clon.**

```
$ node build/build.mjs
prompts: 54 en 24 contratos ...; traducciones verificadas: en, pt, fr, de, it, ja, zh; errores: 0
forma de la pregunta: comprobado -- 8 idiomas, 576 prompts, 504 traducciones, 0 hallazgos
api: docs/html/api/gates.json (catalogo 2026.10.11, ... huella c17a09557a5f)
api: docs/html/api/labels.json (catalogo 2026.10.1, 8 idiomas x 78 ids = 624 textos extraidos ...)
versiones inmutables: comprobado -- 18 copias, cada una con la huella que su registro anota
docs/COMPUERTAS.md: coincide con los datos
real    0m13.081s

$ node --test
# tests 412   # pass 412   # fail 0   # duration_ms 3981

$ node build/api_check.mjs
gates.json: lo commiteado coincide con las fuentes (sin mirar generated_at, git_commit, git_commit_note)
prompts.json / labels.json / index.json: idem
```

Y lo que la construcción deja sucio, que son siete archivos y dos campos: `generated_at` y
`git_commit`, los dos fuera de la huella a propósito. El contenido que la huella cubre es
reproducible byte a byte en un clon recién hecho.

**E3 — las dependencias, contadas.**

```
$ find . -name "package*.json" -o -name node_modules -o -name "*.lock"   (sin .git)
0 manifiestos, 0 node_modules

$ grep -rhoE "from +'[^.'][^']*'" build/ tests/ | sort -u
node:assert/strict  node:child_process  node:crypto  node:fs  node:os  node:path  node:test  node:url
https://cdn.jsdelivr.net/npm/mermaid@11/...   <- en el navegador, 8 pantallas
```

**E4 — la prueba de punta a punta, y su rojo.** El programa vive fuera de este repositorio
(no entra sin el pendiente que lo pida): levanta un servidor sobre `docs/html/`, pide `/api/`,
y por cada recurso que el índice declara baja el archivo, lee qué claves dice cubrir, canonicaliza
con una implementación escrita de cero y compara la huella.

```
sitio construido servido en http://127.0.0.1:55739
  ok   GET /api/ contesta 200 (HTTP 200)
  ok   el indice declara recursos (3 recursos)
  ok   gates.json pesa lo que el indice dice (115272 vs 115272 declarados)
  ok   gates.json: la huella recalculada es la declarada (c17a09557a5f vs c17a09557a5f)
  ok   prompts.json: la huella recalculada es la declarada (03866b055357 vs 03866b055357)
  ok   labels.json: la huella recalculada es la declarada (0f3c78defe6f vs 0f3c78defe6f)
  ok   la pantalla sirve sus botones de traducir (54 botones)
  ok   los dos bloques del par estan servidos (108 bloques para 54 botones)
  ok   el bloque traducido llega oculto (estado inicial)
# verdes 28   # fallas 0
```

Los dos rojos deliberados, que son lo que demuestra que la prueba guarda algo:

```
rojo 1: una clave cubierta editada a mano (schema_version 2 -> 3)
  FALLA gates.json pesa lo que el indice dice (115271 vs 115272 declarados)
  FALLA gates.json: la huella recalculada es la declarada (1f6531683858 vs c17a09557a5f)
rojo 2: la pantalla sin sus botones
  FALLA la pantalla sirve sus botones de traducir (0 botones)
restaurado: # verdes 28   # fallas 0
```

Las pantallas, contadas: 84 archivos HTML (12 del castellano, 10 por cada uno de los siete
idiomas traducidos, 2 manuales de práctica). Los botones de las pantallas castellanas: 119, todos
con la misma clase y sin identificador propio.

**E4b — la pantalla manejada por un navegador real, con un clic de ratón.** La prueba la escribió
la corrida del 24 de octubre y hoy se volvió a correr contra el clon limpio, sin instalar nada:
Chrome real manejado por el protocolo de DevTools sobre el WebSocket que trae node 22, con
`Input.dispatchMouseEvent` en coordenadas reales y no un `.click()` inyectado.

```
$ URAZUKE_RAIZ=C:/n0-clone node --test .forge/n0-env/e2e_traducir.test.mjs
ok 1 - el documento se sirve por HTTP y trae los botones de traduccion
ok 2 - estado inicial: el prompt en ingles visible y la traduccion oculta
ok 3 - un clic de raton en Traducir muestra la traduccion y oculta el ingles
ok 4 - el segundo clic vuelve al original (el flujo cierra donde empezo)
not ok 5 - efecto del lado del servidor: ... declara una huella que se recalcula
    AssertionError: actual '2026.10.11'  expected '2026.10.2'
    e2e_traducir.test.mjs:204   assert.equal(servido.version, '2026.10.2');
# tests 5   # pass 4   # fail 1
```

Y los motores de navegador que la primera versión de esta ficha dijo que no existían, sin haber
mirado:

```
$ ls ~/AppData/Local/ms-playwright
chromium-1148  chromium-1217  chromium-1223  chromium-1228  chromium-1234  chromium-1248  ...
$ ls ~/.cache/puppeteer
chrome  chrome-headless-shell
```

**E5 — la lectura del código, y los cuatro hallazgos que dejó.** Se leyeron los 24 programas de
`build/` (5.102 líneas) y las fuentes de `gates/`. Los cuatro hallazgos son de la **misma
familia**, y es una que este repositorio ya documentó dos veces: una cifra escrita a mano dentro de
un artefacto generado o de una comprobación, que es la peor de las dos porque parece verificada. El
cuarto no salió de leer sino de correr —es la versión `2026.10.2` fijada a mano en la prueba de
pantalla (E4b)— y es el único de los cuatro que ya está cayendo.

```
build/gates_doc.mjs:252            '### The five anchors and the two prior inputs'
build/gates_doc.mjs:263            '### The three artifacts'
build/labels_api.mjs               scope.excluded[0].measured = 'Twelve evaluator names, ...'
.forge/n0-env/e2e_traducir:204     assert.equal(servido.version, '2026.10.2')   <- ya esta cayendo

medido contra el dato: anclas 5, prior_inputs 2, artifacts 3, evaluadores 12   (hoy coinciden)
ninguna prueba las contrasta: grep en tests/ -> 0 archivos
y la tercera viaja en el publicado, adentro de lo que cubre la huella:
  labels.json content_hash.covers incluye "scope" -> true
```

El caso de los veinticuatro peldaños no está en la lista porque el validador lo exige con
`E_CUENTA`, y el de las reglas del anexo tampoco porque ya se deriva del dato (D-070). Los tres de
arriba no los exige nadie: el día que entre una sexta ancla, un cuarto artefacto o un decimotercer
evaluador, el documento generado y el recurso publicado van a decir una cifra falsa y toda la
cadena va a seguir en verde.

**E6 — los datos, la copia y el respaldo.**

```
$ grep -rlnE "mysql|postgres|sqlite|mongo" build/ tests/ gates/
(ninguna referencia)

tamanos: gates/ 184K   prompts/ 160K   labels/ 4K   docs/html/api 2.0M   docs/html 16M
$ grep -rln "anonim..." tests/ build/
(ninguna guarda)
```

**E7 — producción, consultada hoy en solo lectura.**

```
$ node build/portal_verify.mjs --rondas 1
gates.json: coincide -- HTTP 200, 115272 bytes, version 2026.10.11, huella c17a09557a5f
prompts.json: coincide -- HTTP 200, 102716 bytes, version 2026.10.6, huella 03866b055357
labels.json: coincide -- HTTP 200, 91432 bytes, version 2026.10.1, huella 0f3c78defe6f
index.json: coincide -- HTTP 200, 12867 bytes, cita las 3 huellas que declara lo commiteado
Produccion sirve las 3 huellas y un indice que las cita: publicado y verificado.
```

**E8 — el gobierno, las integraciones y los secretos.**

```
$ grep -o "secrets\.[A-Z_]*" .github/workflows/compuertas.yml | sort | uniq -c
      2 secrets.PORTAL_DEPLOY_KEY            <- uno solo, en un solo trabajo

publicar:  if: github.event_name != 'pull_request' && github.ref == 'refs/heads/main'
           needs: verificar                  <- no se publica sin la verificacion en verde
           primer paso: exigir la credencial, y si falta falla diciendolo

$ cat .github/CODEOWNERS
* @pkuschnirof                               <- toda fusion en main la aprueba un propietario
```

## Posdata del 2 de noviembre de 2026: qué de esta ficha ya se movió

Esta ficha **no se edita**: es un registro fechado y lleva las palabras de su día, como el método
pide para una decisión y para un recibo. Pero entró a `main` tres días después de llenarse, y en
esos tres días se fusionaron cuatro lotes (D-077 a D-086), así que conviene decir qué de lo que
afirma sigue en pie y qué ya no, medido hoy contra `a0fa7ba` y no supuesto.

**Lo que la ficha encontró y ya está arreglado.** Tres de los cuatro hallazgos de E5 —las cifras
escritas a mano adentro de un artefacto generado o de una comprobación— los cerró **D-077**
(`PND-064`), que se fusionó el 1 de noviembre y no salió de esta ficha, sino del mismo
defecto encontrado en el documento generado. El documento ya no lleva las cifras pegadas a mano
(`grep "five anchors\|three artifacts" build/gates_doc.mjs` → 0) y la cifra de los evaluadores del
recurso de textos se deriva del dato (`Cardinal(dato.evaluadores.length)`). Y lo que la ficha
anticipaba como el costo —«el día que entre una sexta ancla, un cuarto artefacto o un decimotercer
evaluador, toda la cadena va a seguir en verde»— es justo lo que la guarda nueva impide, porque
`build/cifras_derivadas.mjs` **deriva** el mapa de colecciones del propio dato y no de una lista a
mano. El cuarto hallazgo, la versión `2026.10.2` fijada a mano en la prueba de pantalla, vive fuera
de este repositorio y sigue cayendo, ahora con más distancia: la versión del catálogo es
`2026.10.15`.

**Lo que la ficha dice y hoy sería otra cifra.** La suite pasó de 412 pruebas a **487**; `build/`
de 24 programas y 5.102 líneas a **26 y 6.058**; el catálogo de compuertas de `2026.10.11` a
`2026.10.15`, el de textos de `2026.10.1` a `2026.10.2` y el de prompts de `2026.10.6` a
`2026.10.10`; las reglas del Anexo H de 46 a **48**, con seis caras, por D-078. Lo que **no** se
movió es lo que la ficha usa para decidir: 84 pantallas, cuatro recursos publicados, un
repositorio, un propietario, cero dependencias de terceros en la construcción.

**Lo que sigue exactamente igual, y es lo que el dueño tiene que leer antes de decidir.** El
prerrequisito 7 sigue en **rojo** por la misma razón: el empujón que publica no tiene modo de
ensayo (`grep -n "dry" .github/workflows/compuertas.yml` → 0 líneas). La anonimización de los
clientes sigue **sin guarda** (`grep -rln "anonim" tests/ build/` → ningún archivo). Y el documento
de funcionalidad recuperada sigue siendo el del 24 de octubre, sin un commit desde `#13`, así que
la reserva del prerrequisito 3 creció en vez de encogerse. Las tres son las que esta ficha ya había
anotado como trabajo, y ninguna la cerró ninguno de los cuatro lotes.
