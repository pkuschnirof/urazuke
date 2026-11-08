# CLAUDE.md

Este repositorio es el proyecto del método Urazuke: el documento principal (la escalera
metodológica), las referencias a los casos reales, los contratos de cada peldaño, el manual del
curso, el registro de decisiones y el plan del curso y el mentoring. El autor es Pablo
Kuschniroff, asistido por Claude Code. Se presenta en yujin.app/urazuke y tiene DOS licencias:
el método (la prosa, los contratos, los manuales, las traducciones, los prompts y las etiquetas)
bajo CC BY-SA 4.0, y lo que se ejecuta o una máquina consume (`build/`, `tests/`, `gates/`, y en la
interfaz publicada `docs/html/api/gates.json` y `docs/html/api/index.json`) bajo Apache-2.0. El
reparto, con la razón de cada lado, está en `LICENCIA.md`; el campo `license` de cada recurso
publicado lo declara y `tests/licencias_declaradas.test.mjs` lo vigila.

## Estilo (distinto del resto de los repositorios de Yujin)

- **Voz**: primera persona del autor (Pablo), imperativo hacia el lector ("exigile", "no
  avances"), verbosa, con complejidad y matices; tiene que leerse como un escrito humano, no como
  un informe de un asistente. Nunca "el usuario pidió", nunca "Sumi"; cuando hace falta nombrar a
  la herramienta, es "Claude Code" o "el agente".
- Prosa explicada, lenguaje de todos los días, interjecciones y calificativos cuando ayudan.
- Caracteres latinos con tildes y eñes (NO ASCII-only, al revés que en los otros repos). Eso vale
  para la **prosa** del método; el nivel de datos de las compuertas (`gates/`, la API publicada y
  `docs/COMPUERTAS.md`) va en inglés y en ASCII puro, porque no es prosa y no está traducido (D-051).
- Cada sigla y cada expresión coloquial que aparece se explica en el glosario del documento
  principal.
- Los casos reales (fechas, commits, pendientes, incidentes) NO van en los procedimientos ni en
  los manuales: van en `docs/REFERENCIAS.md`, numerados "Ref. N", y los demás documentos los
  citan con `[Ref. N](REFERENCIAS.md#ref-N)` (desde `docs/peldanos/`, `../REFERENCIAS.md`). El
  conversor convierte esos enlaces a `REFERENCIAS.html#ref-N`.
- El origen del método se presenta siempre como la combinación de dos factores: la ingeniería de
  sistemas clásica que el autor aplica desde antes, y los incidentes que mostraron dónde los
  modelos la aplican de manera frágil. Nunca como "todo salió de los fallos".
- Lo que es interpretación y no hecho verificado se marca `[hipótesis]`.
- **Nivel principiante** (D-025): todo se explica para alguien que no programa. Cada término
  técnico se explica en lenguaje de todos los días la primera vez que aparece en un documento y
  entra al glosario; los contratos de los peldaños de calidad operativa (16 a 22) llevan un
  párrafo "Si sos principiante" después de "Para qué sirve", y los nuevos tienen que llevarlo.

## El registro de pendientes (`docs/PENDING.md`)

`docs/PENDING.md` es el registro del peldaño 5 de este proyecto y **la verdad del plan**. Cada
entrada lleva su especificación completa (no de una línea), su grupo de convergencia y sus perfiles
con un criterio de aceptación por perfil (Anexo H, ancla 1), la evidencia **medida** y la
reproducción propia con fecha. Un pendiente se cierra con evidencia escrita y **se queda** en el
registro con su documentación de cierre, porque los cerrados son la documentación de lo que se
construyó. Cada commit cita su pendiente **y lleva sólo lo que su mensaje nombra** —ya falló una vez
y el caso está en `PND-050`—. Los apuntes del panel de chat **no son corpus ni evidencia y no
entran al repositorio**; un documento de trabajo entra con el pendiente que lo pide, y agregarlo
cuesta **una línea** en el inventario de `build/inventario_documentos.mjs`, que exige que cada
documento bajo `docs/` esté en el arreglo literal de la construcción —es corpus y se publica— o en
ese inventario **con la razón por la que existe**, y que esa razón **cite el pendiente o la decisión
que lo pide**; las exclusiones de árbol son un registro con su razón y no una condición escondida
(D-066). El registro va en castellano, es voz del autor y **no** se traduce ni se genera; mientras el
árbol semántico del peldaño 2 no exista, los nodos se escriben `[nodo propuesto]`. Y **su resumen no
puede contradecir sus entradas**: `tests/pending_resumen.test.mjs` cuenta las entradas y exige que la
tabla del resumen y el rango de ids declarado sean exactamente eso, sin huecos ni repetidos.

## Estructura de los contratos (`docs/peldanos/`)

Encabezado con tramo, **cuándo**, forma y tamaño; "Para qué sirve"; y cinco secciones: (1)
contexto requerido, genérico, sin formularios, con un párrafo que remite a los bloques de la
sección 2; (2) prompts en inglés, cada uno **precedido** por un bloque que empieza con `**Antes de
enviar el prompt**` (párrafo + lista: los archivos e insumos que el lector construye antes de
pegarlo, con nombre, contenido, quién lo hace y estado mínimo aceptable; D-022) y **seguido** de su
traducción en un bloque `> [es]` (o `> [xx]` en cada traducción) y de "Qué le estoy pidiendo";
(3) resultado esperado; (4) verificación de completitud sin leer código; (5) señales de alarma.
Todos los prompts llevan la cláusula de completitud (evaluá si alcanza, pedí lo que falte, no
estimes) y terminan con "Reply in my language". Son UNA pieza en inglés, idéntica en las ocho
versiones; `build/prompts.mjs` la extrae y falla si una traducción la alteró. Los bloques `> [xx]`
no cuentan como prompts; el HTML los muestra con un botón "Traducir". El conversor reconoce la
etiqueta del bloque "antes" en cada idioma (`RE_ANTES` en `build/md2html.mjs`) y lo dibuja en una
caja propia; en las traducciones, la etiqueta es la del idioma, con la misma forma. El manual
tiene el mismo bloque antes de cada prompt de cada lección.

## Los peldaños de calidad operativa (16 a 22)

Cuarto tramo (D-025): 16 observabilidad y trazabilidad con nivel configurable; 17 optimización de
la persistencia medida antes y después; 18 escaneo y solución de vulnerabilidades en la cadena y
con calendario; 19 pruebas de rendimiento en volumen y punto de ruptura; 21 monitoreo de recursos,
funciones y consultas fuera de rango con reporte cíclico; 22 monitoreo de errores con reporte
cíclico. 16 a 19 van en la fase 3 (antes del primer despliegue); 21 y 22 en la fase 4. Valen para
los dos casos de uso; el camino evolutivo-correctivo dice cómo se ubican en un legado. La escalera
tiene veinticuatro peldaños y cuatro tramos; "dieciséis" y "veintidós" ya no aparecen como cuenta de peldaños.

## Los casos de uso y el camino evolutivo-correctivo

El método tiene tres casos de uso (D-023): proyecto nuevo (la escalera tal cual), evolutivo-
correctivo sobre un sistema hecho con el método (se entra por el peldaño 5), y
evolutivo-correctivo sobre un sistema hecho sin el método, que lleva un tramo de normalización
previo: `docs/EVOLUTIVO_CORRECTIVO.md`, con ocho estaciones N0 a N7 (no se llaman peldaños), sus
contratos y prompts con la misma estructura que los contratos de peldaño (bloque "Antes de enviar
el prompt", prompt EN, `> [xx]`, "Qué le estoy pidiendo"), el bucle en modo correctivo y
evolutivo, y la lista de salida del tramo. Reglas de ese camino que no se negocian: no se
reescribe; el cinturón de seguridad es compuerta dura (con la excepción escrita de la urgencia);
y todos los insumos de las etapas previas tienen que existir, recuperados por autodescubrimiento
con marcas de fuente (`[código]`, `[base]`, `[configuración]`, `[documentación]`, `[negocio]`,
`[inferido]`) cuando nadie los escribió. La parte 2 del curso (`docs/MANUAL_CURSO_EVOLUTIVO.md`)
tiene el proyecto guía heredado "Turnera heredada" y las lecciones N0 a N7, R1 y R2.
`build/prompts.mjs` también verifica los prompts de `EVOLUTIVO_CORRECTIVO.md` en los ocho idiomas.

## El rojo como recibo, las pruebas de mutación y los trabajos relacionados

D-033: en el peldaño 8 el rojo es un **recibo** —comando exacto, versión contra la que corrió,
cantidad de fallos, código de salida, pegados tal cual— y no un relato. Es la respuesta escrita a la
objeción de que el agente puede fingir el rojo. El peldaño 9 tiene un tercer prompt de **pruebas de
mutación**, obligatorio en cualquier proyecto con usuarios reales y **opcional sólo cuando no hay
usuarios reales** —es un prompt aparte porque se agrega, no porque se pueda saltear—, y la
verificación publicada lo exige con esa misma condición. D-061 aclara esa frase y **D-033 no se
edita**: una decisión lleva las palabras de su día. D-034: la Parte F del documento principal,
«Trabajos relacionados», se mantiene en los ocho idiomas y se amplía cuando aparece algo nuevo; los
trabajos ajenos se citan ahí **con su enlace y no como «Ref. N»**, porque las referencias son sólo
los casos propios.

## Lo que no se negocia de cada lote (el relato está en `docs/CONTEXTO_DEL_REPOSITORIO.md`)

Trece secciones de este archivo se mudaron **verbatim** a `docs/CONTEXTO_DEL_REPOSITORIO.md` el
2026-11-08 (D-092, `PND-117`): pesaban 34.549 de los 42.308 tokens que este archivo le cobraba a
cada llamada de cada turno. **Abrí ese archivo antes de tocar el nivel de datos, la publicación, el
Anexo H o la cadena**; acá queda sólo la obligación. Las decisiones completas están en
`docs/DECISIONES.md` y lo que midió cada una, en `docs/PENDING.md`.

- **El nivel de datos (`gates/`, lo publicado, `docs/COMPUERTAS.md`).** Va en inglés y en ASCII puro
  (D-051) y **no nombra ninguna herramienta ni ningún protocolo** (D-055). `baseline.json` es el
  congelado y **no se edita**: un requisito nuevo entra como entrada **nueva** con su `since_schema`
  y su `since_version`. Ids append-only: peldaños, estaciones, reglas y evaluadores se agregan, no
  se renombran ni se reciclan. Nada inventado: un umbral que el dueño no declaró se publica nulo.
  **Una sola copia de cada texto**: el enunciado de las reglas y de las caras vive sólo en el Anexo
  H y el build lo **extrae**. Validá siempre con `node build/gates_validate.mjs`.
- **Las versiones.** Un cambio en una clave cubierta por la huella **sube la versión** y la anota en
  el changelog append-only; una huella ya servida **no se edita**; `docs/COMPUERTAS.md` **se genera**
  y no se edita a mano. Una cifra pegada al nombre de una colección que el dato declara **se deriva**
  (D-077, D-090), nunca se escribe.
- **La publicación.** `docs/html/` se espeja solo al fusionar a `main`; el portal es otro
  repositorio (`pkuschnirof/rpaforce`) y **ahí no mira ninguna guarda del método**. Un recurso nuevo
  o una cifra que se mueve **pone en rojo el despliegue del portal** y eso es correcto: se arregla en
  el generador (`node build/prerender-urazuke.mjs`), nunca en el verificador. Servido no es
  publicado, y **no haber podido mirar es rojo y nunca verde** (D-057). Y lo que se afirme de lo
  publicado se le pregunta a **producción por red** (`node build/sonda_publicado.mjs`), nunca al
  árbol: una guarda que lee el árbol no ve lo que un servidor agrega en el camino (D-094).
- **La cadena.** `node build/build.mjs` y `node --test` **a secas** (el patrón entre comillas corre
  cero pruebas y devuelve éxito). Un paso que no imprimió su línea medida no corrió y no es un verde.
- **El Anexo H.** Se nombra en la Parte A, en la apertura de la Parte C y en la **ficha** de cada
  peldaño que lo ancla, en los ocho idiomas; una ruta que el dato declara, el contrato de su peldaño
  la nombra; una regla con cualquier cara apagada **no se informa como cumplida**.
- **Las reglas nuevas (D-070 UX-28, D-078, D-087, D-089).** Entran como reglas **nuevas** con su
  procedencia y sus caras, y lo que una máquina mira es **la declaración**: la verdad de la
  declaración la decide una persona leyendo. Eso va escrito en el anexo y en el contrato, en los ocho
  idiomas, en vez de simulado. UX-28 es la **única** excepción escrita a D-044 (una regla adentro de
  un prompt) y **no autoriza copiar ninguna otra**.
- **Las claves de configuración** van en inglés, en ASCII puro, con el nombre exacto que el dato
  declara e idénticas en los ocho idiomas; los **valores** que escribe una persona, en su idioma
  (D-075).

## La forma de la pregunta (UX-28)

D-070, y la pidió el dueño. Toda pregunta que necesita una decisión del dueño llega con sus cuatro
partes y **en este orden**: los datos que la hacen necesaria, enumerados; un párrafo de no más de
cinco líneas que los enlace y deje ver el interrogante; la pregunta con sus respuestas posibles
enumeradas; y la recomendación. Y a la profundidad que el proyecto declaró en
`project_config.communication_depth` —`beginner`, `decision_maker` o `technical`—, y sin declarar
significa `decision_maker` **diciendo cuál se usó**. Tres cosas no se negocian. **Entra adentro de
los prompts**, que es lo que D-044 argumenta que no se hace, y es la **única** excepción escrita:
acotada —nombra las cuatro partes y el parámetro, nada más— porque las demás reglas son exigencias
sobre el sistema y ésta es una exigencia sobre la conversación, cuyo único lugar de obediencia es lo
que el modelo lee; la excepción **no autoriza** copiar ninguna otra regla al prompt. **Avisa y no
bloquea**: una compuerta puede exigir que la cláusula esté en los prompts de los ocho idiomas
—`build/forma_de_la_pregunta.mjs` lo hace, con su paso en el flujo— y ninguna prueba puede verificar
que una pregunta concreta tenga sus cuatro partes; eso lo juzga el dueño y queda fuera del porcentaje
del tablero. Y **la cláusula y el dato son un solo par**: los tres niveles que la cláusula nombra son
exactamente los que declara `enums.communication_depth`, y la guarda cae si uno cambia sin el otro.

## Los prompts del curso son una versión didáctica declarada

D-085. Los dos manuales del curso llevan **su propia copia** del prompt de cada lección, y es más
corta a propósito: enseña un peldaño sin que al principiante le llegue todo junto (D-025). La
decisión es **declarar** la divergencia y no eliminarla. Lo que entra, en los dos manuales y en los
ocho idiomas: una subsección propia que dice que el prompt de la lección es la versión del curso, que
el completo vive en el contrato y que **para aprender se usa el de la lección y para un sistema de
verdad el del contrato**; y, en cada lección que trae prompt, el puntero a su contrato con el nombre
del archivo, que es protocolo y viaja idéntico en las ocho versiones. La guarda es
`build/prompts_didacticos.mjs`, con su paso en el flujo que exige la línea medida, y exige cinco
cosas: la declaración en los dieciséis pares idioma-manual; el puntero en cada lección con prompt;
que el archivo nombrado **exista** en el árbol de ese idioma (D-069 aplicado a la prosa); que las
ocho versiones tengan los mismos prompts en las mismas lecciones y apunten a los mismos contratos,
posición por posición; y el orden ascendente. Lo que **no** promete, escrito en su cabecera: que el
prompt de la lección diga lo mismo que el del contrato. No tiene que decirlo; lo que una persona
tiene que poder hacer es abrir la lección y el contrato y ver la diferencia **declarada**.

## La cuenta de una colección no vive en la prosa

D-090 (`PND-115`), y la decidió el dueño. Lo midió dos veces en cinco días: cada vez que la cuenta
de reglas del Anexo H se mueve, hay que mover las afirmaciones de la prosa a mano —veinte el
2026-11-03, noventa y seis el 2026-11-07— y algunas quedan vencidas. Desde ahora **la cifra no está
en la prosa**: el anexo dice una vez de dónde sale (`heuristics.counts`) y el resto habla de «las
reglas» y de «las demás». La guarda es `build/cuenta_de_reglas.mjs`, con su paso en el flujo, y
tiene dos comprobaciones por la misma razón que D-077: la forma **con** sustantivo y la forma
**sin** sustantivo —buscando los valores que el dato declara, derivados y no escritos—, porque la
que falló fue la segunda. El registro de formas tiene diez exenciones con su razón, y la más
importante es «una cifra con su fecha al lado es un registro fechado», que es la forma que no se
vence. Lo que la guarda **no** promete está en su cabecera y hay una prueba verde que lo fija: una
copia que el dato dejó atrás por más de uno y sin el sustantivo al lado no la ve nadie —`PND-116`
es la prueba medida de eso— y por eso la salida fue sacar la cifra, no sólo vigilarla.

Esta sección es corta a propósito: `PND-117` mide que este archivo pesa 38.571 tokens contra un tope
de 8.000, y cada lote que agrega su sección lo paga cada sesión. El relato largo de D-090 vive en
`docs/DECISIONES.md` y el cierre, en `docs/PENDING.md`.

## La línea de tiempo

La Parte B del documento principal dice cuándo se sube cada peldaño y qué pasa entre medio
(ingesta de requerimientos con sus métodos, infraestructura, CI/CD, desarrollo, pruebas de punta a
punta en tres escalas, vista humana de las pantallas, pruebas humanas). Cada ficha de peldaño y
cada contrato tienen su "Cuándo". El manual tiene el calendario del curso. Cualquier cambio en una
de estas tres piezas se replica en las otras dos.

## Los prompts publicados (`prompts/`)

`prompts/*.en.md` **se genera** desde los contratos castellanos (`build/prompts.mjs`) y no se edita
a mano; `prompts/catalog.json` se mantiene **a mano**, porque es la identidad de lo publicado y la
declara el método: `corpus_version` (hoy `2026.10.11`) y el registro de huellas, con las mismas
reglas que el catálogo de compuertas (D-053). `docs/html/api/prompts.json` viaja entonces con
versión declarada **y** huella recalculable, y conserva el campo `version` con el sha de git, ahora
explícitamente informativo, para no romper al consumidor que ya lo imprime: el cambio es aditivo y
hay un test que lo exige. Los títulos de peldaño salen de los contratos **ingleses**
(`docs/en/peldanos/`), porque esto es dato de herramienta (D-051); el archivo sigue siendo UTF-8 y
no ASCII puro, porque el texto de los prompts viaja tal cual, con su puntuación tipográfica.
