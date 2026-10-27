# CLAUDE.md

Este repositorio es el proyecto del método Urazuke: el documento principal (la escalera
metodológica), las referencias a los casos reales, los contratos de cada peldaño, el manual del
curso, el registro de decisiones y el plan del curso y el mentoring. El autor es Pablo
Kuschniroff, asistido por Claude Code. Se publica bajo CC BY-SA 4.0 y se presenta en
yujin.app/urazuke.

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

El método se aplica a sí mismo: `docs/PENDING.md` es el registro del peldaño 5 de este proyecto, y
es **la verdad del plan**. Se inauguró el 2026-10-24 con el primer hallazgo de la normalización y
los veintidós de la auditoría externa de la publicación. Reglas: cada entrada lleva su
especificación completa (no de una línea), su grupo de convergencia y sus perfiles con un criterio
de aceptación por perfil (Anexo H, ancla 1), la evidencia **medida** y la reproducción propia con
fecha; un pendiente se cierra con evidencia escrita y **se queda** en el registro con su
documentación de cierre, porque los cerrados son la documentación de lo que se construyó; cada
commit cita su pendiente **y lleva sólo lo que su mensaje nombra**. Esto último hay que decirlo
porque ya falló: el 2026-10-26 un commit que anunciaba un arreglo de una palabra se llevó ocho
documentos que no menciona, mil sesenta y seis líneas de las mil ochenta y siete que insertó
(`PND-050`). Los apuntes del panel de chat **no son corpus ni evidencia y no entran al
repositorio**; un documento de trabajo entra con el pendiente que lo pide; y un archivo que el
registro cita como evidencia se queda, con el nombre del resto de la carpeta y no con el del
panel (D-062). Desde el 2026-10-27 eso **no depende de que alguien se acuerde de mirar el árbol**:
`build/inventario_documentos.mjs`, con sus dos pruebas, exige que cada documento bajo `docs/` esté
en el arreglo literal de la construcción —es corpus y se publica— o en su inventario **con la razón
por la que existe**, y que esa razón **cite el pendiente o la decisión que lo pide**; el inventario
tampoco puede tener registros que sobren, y las exclusiones de árbol son un registro con su razón y
no una condición escondida (D-066). Lee el **disco** y no el índice de git, porque el apunte que
conviene atrapar es el que todavía no se commiteó. Lo que **no** hace, y queda dicho: mirar el
mensaje de un commit. Agregar un documento de trabajo cuesta una línea en ese inventario. Va en castellano, es voz del autor y **no** se traduce ni se genera. La
numeración `PND-nnn` es la de este registro y no se corresponde con la de ninguna herramienta.
Mientras el árbol semántico del peldaño 2 no exista, los nodos se escriben `[nodo propuesto]`.
No se genera, pero **su resumen no puede contradecir sus entradas**: `tests/pending_resumen.test.mjs`
cuenta las entradas y exige que la tabla del resumen y el rango de ids declarado sean exactamente
eso, sin huecos ni repetidos, y trae sus propios rojos deliberados. Nació de un defecto medido el
2026-10-24: con cinco cierres en un día, la tabla seguía diciendo tres cerrados cuando ya eran ocho.
Un registro que es la verdad del plan y lleva un resumen viejo es dos planes.

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

D-033: en el peldaño 8 el rojo es un recibo (comando exacto, versión contra la que corrió,
cantidad de fallos, código de salida, pegados tal cual) y no un relato; el peldaño 9 tiene un
tercer prompt de pruebas de mutación, **obligatorio en cualquier proyecto con usuarios y opcional
sólo cuando no hay usuarios reales** — es un prompt aparte porque se agrega, no porque se pueda
saltear, y la verificación publicada lo exige con esa misma condición ("con usuarios reales, ¿se
mide el puntaje de mutación por bloque?"). Esta frase se alineó el 2026-10-26 (D-061, PND-047):
decía "opcional" sin su condición, y era la única de las cinco fuentes del repositorio que lo decía
así, justo en el archivo que un agente lee **como instrucción**. La decisión D-033 no se edita —las
decisiones llevan las palabras de su día—; la aclaración vive en D-061.
Es la respuesta escrita a la objeción de que el
agente puede fingir el rojo. D-034: la Parte F del documento principal, "Trabajos relacionados",
compara el método con lo publicado hasta octubre de 2026, con enlaces; se mantiene en los ocho
idiomas y se amplía cuando aparece algo nuevo. Los trabajos ajenos se citan ahí con su enlace,
no como "Ref. N" (las referencias son solo los casos propios). Su sección **F.5** es la primera
adaptación del método a otro formato y lo que la retrospectiva del peldaño 23 se trajo de ella
(D-061): cuatro formulaciones adoptadas con crédito, la hoja de `docs/PREGUNTAS_AL_PROVEEDOR.md`
escrita de cero desde los contratos —la idea es suya, la redacción es propia, y así se evita tomar
derechos reservados dentro de una obra BY-SA— y el defecto estructural que ninguna auditoría había
visto: el Anexo H era obligatorio y el documento principal no lo nombraba.

## El Anexo H se nombra donde el dato lo exige

D-061 (PND-039, PND-048). El Anexo H es obligatorio —45 reglas, con dos entradas previas en el
peldaño 2 y cinco anclas en los peldaños 5, 8, 9, 10 y 12, y esas cinco son evaluadores
`required: true` en el dato publicado— y hasta el 2026-10-26 el documento principal **no lo nombraba
ni una vez**. Lo descubrió un lector: el autor de la adaptación reprodujo sin error seis cifras de
las referencias y omitió veintisiete de las cuarenta y cinco reglas, porque nunca supo que estaban.
Desde entonces: el anexo se nombra en la Parte A (cómo se lee un peldaño), en la apertura de la
Parte C y en la **ficha** de cada uno de los seis peldaños que lo cargan, con el enlace, en los ocho
idiomas; y `README.md` lo lista en su tabla, que es donde las siete traducciones ya lo listaban y la
fuente de verdad no (D-013 al revés). La ficha lleva una línea que empieza con `**Anexo H**`.

Las **dos entradas previas** tienen ruta declarada desde el 2026-10-27 (D-065, `PND-053`):
`docs/GLOSSARY.md` para el glosario del usuario y `docs/PROFILES.md` para la lista de perfiles.
Hasta ese día el método las exigía sin decir dónde viven, así que se publicaban como exigidas y
**no verificables por máquina** —una compuerta no puede mirar un archivo cuyo nombre nadie sabe— y
la matriz del peldaño 8 se podía seguir inventando contra una lista que nada obligaba a existir.
Entran como artefactos **nuevos** del peldaño 2 con su `since_schema`, con `min_bytes` y **sin**
`must_contain`: lo que esos dos archivos tienen que *decir* lo juzga una persona. Los nombres van
en inglés y en mayúsculas porque es el nivel de datos (D-051) y porque las otras cuarenta rutas
que el dato declara están así. Y la regla que eso deja: **una ruta que el dato declara, el
contrato de su peldaño la nombra, en los ocho idiomas**;
`tests/artefacto_nombrado.test.mjs` lo exige (288 pares hoy) y los comodines se saltean desde un
registro con su razón, nunca desde una condición escondida. Un archivo que la compuerta busca y el
prompt no nombra es una compuerta que falla por una razón que a la persona nunca se le dijo.

`tests/anexo_simetria.test.mjs` lo exige en las dos direcciones y **no se negocia por comodidad**: un
peldaño que declara un ancla en `gates/steps.json` tiene que enlazar `ANEXO_HEURISTICAS.md` en su
ficha (en los ocho) y nombrar el token inglés `Annex H` en su contrato; y una ficha que enlaza el
anexo para un peldaño que el dato no ancla también es rojo. La forma se eligió medida: la ficha por
el **enlace**, que era 0 de 40 y es falsable; el contrato por el **token inglés**, que viaja idéntico
en las ocho versiones porque vive dentro del prompt. Si algún día una estación `N0..N7` declara un
evaluador del anexo, la prueba se pone **roja diciendo que no sabe revisar estaciones** —no verde—,
que es la semántica que `gates/evaluators.json` declara para `required: true`. La misma prueba trae
los dos candados decidibles de las referencias: el conjunto de `[Ref. N]` de cada ficha idéntico en
los ocho idiomas, y cada "fallo que evita" con su referencia o **registrado con su razón** en la
propia prueba, como el anexo exige para una regla apagada.

## La línea de tiempo

La Parte B del documento principal dice cuándo se sube cada peldaño y qué pasa entre medio
(ingesta de requerimientos con sus métodos, infraestructura, CI/CD, desarrollo, pruebas de punta a
punta en tres escalas, vista humana de las pantallas, pruebas humanas). Cada ficha de peldaño y
cada contrato tienen su "Cuándo". El manual tiene el calendario del curso. Cualquier cambio en una
de estas tres piezas se replica en las otras dos.

## Publicación

- **La distinción entre el método, el protocolo y la herramienta se escribe arriba, en el README**
  (D-059, D-063, PND-022). El método es qué hacer en qué orden, qué exigirle a quien construye y
  cómo saber que entregó completo, y se sigue con cualquier asistente o con lápiz y papel; el
  protocolo es un contrato para que una interfaz sea navegable por un agente y por una persona con
  la misma dignidad; la herramienta implementa el método y habla el protocolo. Va en una sección
  propia arriba de `README.md` y de los ocho `docs/<idioma>/README.md`, antes de la tesis. El
  argumento de neutralidad **se publica medido**, con el comando que el lector corre contra el
  archivo servido, nunca como declaración del autor; si algún día el dato dejara de sostenerlo, se
  corrige el dato y no el párrafo.
- **En la portada del portal ese párrafo NO va, y la razón está medida** (D-063, PND-051). El
  2026-10-26 se escribió, se horneó en los diez idiomas de la interfaz y **se descartó sin
  publicar**, porque la portada ya contesta la pregunta práctica donde el lector aterriza: dice
  «Neutral respecto de la herramienta» tres veces —una en la tira del encabezado, sobre el
  pliegue—, tiene la pregunta frecuente «¿Necesito Forge o NAC3?» y la frase «el peldaño existe sin
  Forge». La entrada que lo pedía afirmaba que la distinción «no está escrita en ninguna parte» y
  era falsa, comprobable con una orden de dos segundos. **Antes de escribir un párrafo para una
  portada se le pregunta a la portada**, y el criterio es ése: un documento se puede permitir un
  párrafo cuidadoso arriba, porque el lector llega dispuesto a leer con cuidado; una portada
  contesta la pregunta donde la pregunta se hace. Lo único que faltaba era la **taxonomía** —nombrar
  las tres naturalezas como tres—, y eso vive en el README.
- **La portada del protocolo sí tiene fuente, y creer que no la tenía fue un defecto propio de
  medición** (PND-036 refutado el 2026-10-27, PND-052, D-064). `yujin.app/nac-spec/` vive en
  `yujinapp/nac-spec` —otra **organización** de GitHub, distinta de `pkuschnirof/nac-spec`, que es el
  repositorio de la especificación—, con su flujo `Deploy nac-spec to yujin.app/nac-spec/` y su
  comprobación en vivo después del `rsync`. El enlace de vuelta a Urazuke lo escribió el commit
  `c64fcf2` y lo publicó la corrida `40384271448`: el `Last-Modified` de las 19:10 UTC que se citó
  como prueba de que la página «cambia sin dejar rastro» era la hora en que esa corrida terminó.
  La entrada original había buscado en cuatro árboles y ninguno era el que correspondía; en el
  portal encontró el **fósil** de una mudanza —el espejo vivía antes en `rpaforce/yujin.app/nac-spec/`
  y el propio flujo lo dice— y lo leyó como ausencia. De acá sale la regla de abajo.
- **Una ausencia se registra enumerando el universo buscado, nunca desde una búsqueda que falló**
  (D-064, PND-052). «No lo encontré donde miré» no es «no existe». Una entrada que afirme que algo
  no existe —un archivo, una fuente, una mención, un repositorio— lleva **el universo sobre el que
  corrió la búsqueda y por qué esa enumeración es completa**; si el universo son repositorios, se
  enumeran por su **remoto** (`git remote get-url origin`) y no por el nombre de la carpeta, que es
  lo que hizo caer a PND-036. Es la segunda forma del mismo defecto en dos días: D-063 ya pedía el
  comando y la cuenta en vez de la frase, y acá el comando estaba, la cuenta estaba, y el universo
  era el equivocado.
- Nombre: Urazuke (D-014). No se traduce; el subtítulo sí.
- Idiomas (D-013): castellano como fuente de verdad (`docs/`); las otras siete versiones de NAC3
  en `docs/<idioma>/` (en, pt, fr, de, it, ja, zh), cada una con README, documento principal,
  referencias, veinticuatro contratos, camino evolutivo-correctivo, las dos partes del manual-curso, el documento sobre la capacitación del junior, el Anexo H y la hoja de las veinticinco preguntas para el proveedor (`PREGUNTAS_AL_PROVEEDOR.md`, D-061). Un cambio en el castellano se replica en las
  siete traducciones en el mismo commit. Un documento nuevo del corpus, además, entra al arreglo
  literal de `build/build.mjs`: si no está ahí, existe y no se publica.
- **Lo que queda fuera del corpus traducido va en inglés** (D-051), que es el idioma canónico de la
  profesión, y traducir para que un usuario final entienda mejor es responsabilidad de quien
  consume. Hoy eso aplica al nivel de datos de las compuertas (`gates/`, `docs/html/api/gates.json`),
  al índice de la interfaz (`docs/html/api/index.json`) y a `docs/COMPUERTAS.md`. Los documentos que siguen en castellano por ser voz del autor o fuente
  primaria —`DECISIONES.md`, `EVALUACIONES_DE_IA.md`, `PLAN_CURSO_MENTORING.md`, `docs/PENDING.md`,
  `docs/practica/`— quedan explícitamente fuera de esa regla hasta que el dueño decida otra cosa.
- Los clientes están anonimizados: "la Obra Social" (con "el Autorizador") y "la Asociación"; sus
  sistemas, "Autorizaciones" y "Kikan". **Los nombres reales no se escriben en este repositorio**,
  ni en los documentos ni en los mensajes de commit. Las rutas locales de los repositorios de
  origen tampoco.
- Licencia: CC BY-SA 4.0 (`LICENSE`). Gobernanza: `CONTRIBUTING.md` + `.github/CODEOWNERS`;
  `main` protegida (pull request + aprobación de un propietario).
- Presentación pública: `yujin.app/urazuke` vive en el repositorio `pkuschnirof/rpaforce`, en
  `yujin.app/urazuke/`: landing con i18n propio (diez idiomas de interfaz), el extremo canónico
  de la API en `yujin.app/urazuke/api/` (lo que una herramienta pide por red) y la copia de
  `docs/html/` en `yujin.app/urazuke/docs/` (que arrastra su propia copia de `api/`). El push a
  `main` de ese repositorio despliega a producción.
- **La copia ya no se hace a mano** (D-052): el trabajo `publicar` de
  `.github/workflows/compuertas.yml` la hace solo en cada fusión a `main`, después de que las
  verificaciones queden verdes, y espeja `docs/html/` sobre los dos destinos de arriba. Lo que el
  método dejó de generar desaparece del portal y queda nombrado en el registro de la corrida. La
  credencial es una clave de despliegue del repositorio del portal, guardada como el secreto
  `PORTAL_DEPLOY_KEY` de este repositorio: alcanza a ese repositorio y a ningún otro, y se revoca
  desde sus ajustes. Si el secreto falta, el trabajo falla diciéndolo; no se saltea en silencio.
  La compuerta humana es la de siempre: `main` protegida, con pull request y aprobación de un
  propietario.
- **La interfaz de datos publica TRES archivos y uno es su índice** (D-056): `gates.json`,
  `prompts.json` y `index.json`, que es **generado** (`node build/index_api.mjs`) y no se edita a
  mano. El índice declara, por recurso, la dirección canónica absoluta, el tipo de medio, el tamaño,
  el nombre del campo de versión con su valor, la huella que ese recurso declara con su algoritmo y
  su forma canónica, y el puntero al registro de versiones que vive en este repositorio. **No lleva
  versión ni huella propias**, a propósito: es un directorio, no un catálogo, y una huella propia
  obligaría a subir una tercera línea de versión que nadie declara (D-053). Lo que lo hace confiable
  no es su identidad sino que sea **comprobable**: cita la huella de cada recurso, y un consumidor
  que baja el recurso y la recalcula descubre solo que el índice está viejo. La cadena lo exige en
  las dos puntas, porque un índice que cita una huella vieja es peor que no tener índice.
- **La configuración del servidor de la interfaz vive un nivel arriba del espejo** (D-056):
  `yujin.app/urazuke/.htaccess` en el repositorio del portal, no adentro de `api/`, porque la
  publicación **vacía** `docs/` y `api/` en cada fusión y se llevaría la configuración puesta
  adentro. Es la que hace que `/urazuke/api/` conteste con el índice en vez de 403, que una
  herramienta de navegador pueda leer la interfaz (CORS) y que la respuesta diga cuánto vale la
  copia (`Cache-Control`). El trabajo de publicación **se niega** si aparece un `.htaccess` dentro
  de lo que vacía y **avisa** si falta el de arriba. Comprobación repetible, a mano:
  `node build/api_headers.mjs`.
- **Poner la configuración ahí era necesario y no suficiente, y la guarda sólo afirma lo que
  verificó** (D-057). Medido el 2026-10-24: el archivo quedó donde el vaciado no llega, se commiteó
  en el portal, el despliegue del portal cerró **en verde** y producción seguía con las siete
  comprobaciones de `api_headers.mjs` en rojo, porque el paso de copia de ese despliegue excluía
  `.htaccess` **sin anclarlo a la raíz** y descartaba también los anidados. De ahí dos reglas. La
  guarda de arriba dice que el **archivo** está en el repositorio del portal —que es lo único que
  mira—, y no que el servidor lo tenga puesto. Y la publicación, después de empujar, **le pregunta a
  producción** si la interfaz se puede consumir, con ese mismo `api_headers.mjs`: avisa y no frena,
  porque la configuración es del portal, pero una publicación ya no cierra diciendo que todo está
  bien cuando la interfaz publicada no se puede leer. Es la misma lección que el guardián de línea
  de comandos, en otra escala: un verde de un paso que no hizo nada no es un verde, y la forma de
  saberlo es exigir la salida medida, no el código de salida.
- **La publicación se verifica contra producción, y el chequeo dice qué vio** (D-054): después de
  empujar, `node build/portal_verify.mjs` pide los tres archivos al extremo canónico y separa tres
  situaciones que antes salían con el mismo texto: la huella coincide (verde), producción contesta y
  sirve **otra** huella (aviso, y dice cuál: eso sí es el despliegue del portal, que es otro flujo y
  puede estar corriendo), o no se pudo leer producción (**rojo**, con el código HTTP o el error de
  red a la vista). Al índice, que no tiene huella propia, se le exige otra cosa con el mismo
  vocabulario de tres estados: que cite las huellas vivas. El rojo dice que la publicación ocurrió y
  falta la evidencia, no que el método
  publicó mal; y conviene saber, para leerlo, que el host del portal tiene documentado en su propio
  flujo que rechaza conexiones del runner de GitHub. A mano, en dos segundos:
  `node build/portal_verify.mjs --rondas 1`.
- **Lo que el disparador no hace**: tocar la landing. Un documento nuevo se publica y
  queda accesible por su URL, pero no aparece enlazado hasta que alguien lo agregue al índice y al
  i18n de la landing, que viven en el repositorio del portal. Desde el 2026-10-24 eso no pasa en
  silencio **del lado del portal**: su verificador (`build/verify-urazuke-homes.mjs`, con su prueba
  en rojo en `build/redproof-urazuke-homes.mjs`) **falla** si un documento del disco no está
  enlazado desde ninguna de las diez portadas —servido no es publicado— y si al mapa del sitio le
  falta o le sobra una dirección; el mapa ya no se escribe a mano, se descubre del disco.
  **Y desde el 2026-10-26 ese verificador tiene quien lo invoque, en cada despliegue del portal**
  (D-060, PND-038, cerrado): hasta ese día existía, estaba bien escrito y **no lo corría nadie**
  —el despliegue del portal corría la guarda del `.htaccess` y nunca éste—, así que la única defensa
  contra un huérfano era que alguien se acordara de correr un programa a mano. El paso nuevo hace
  que el despliegue corra el verificador y las tres pruebas en rojo, y **exija la línea que cada
  programa imprime**. El pendiente se cerró por el **efecto y no por el commit**: se había cerrado
  con el arreglo en la máquina, se reabrió el mismo día porque eso no es un efecto en producción
  (D-057), y cerró cuando la corrida `40400804428` dejó las cuatro líneas en el registro de un
  despliegue real. El paso instala **sólo `cheerio`**, que es la única dependencia que esos cuatro
  programas usan: `sharp` está en el manifiesto de `build/` y no lo toca ninguno, y un módulo nativo
  en el camino crítico del despliegue del sitio entero, para algo que no se usa, es superficie de
  falla regalada. Consecuencia, dicha donde se
  lee: una portada que deje de pasar frena ese despliegue, que es el sitio entero; es lo que la
  regla 4.11 de su contrato pide y el arreglo es siempre un enlace en la portada. Las dos pruebas
  nuevas son las que hacen que el arreglo se quede: `redproof-arbol-propio.mjs` exige que la prueba
  en rojo mutile **el árbol donde vive** (estaba clavado a una ruta de una máquina y contaba las
  claves de otra copia, PND-037) y `redproof-sitemap-eol.mjs` exige que el mapa regenerado sea el
  mismo archivo con los dos finales de línea.
- **Y desde el 2026-10-26 tampoco pasa en silencio del lado del método** (D-058, PND-025). El
  trabajo de publicación, después de clonar el portal y **antes** de la copia —el único momento en
  que los dos árboles están juntos—, contrasta los documentos que el método publica contra los que
  la portada enlaza y los que el mapa del sitio lleva, y **avisa** nombrando a cada huérfano:
  `node build/portal_orphans.mjs --portal <árbol del portal>`. Separa tres situaciones por
  documento (enlazado / enlazado pero fuera del mapa / servido y sin ningún enlace) y una cuarta
  que es del chequeo entero: no haber podido mirar —falta el árbol del portal, la portada
  principal, el mapa, o no hay nada generado— es **rojo y no verde**, porque decir «cero
  huérfanos» sin haber mirado es el defecto de D-057. Los huérfanos avisan y no frenan (es la
  severidad de UX-03, y el índice de la landing es del otro repositorio); lo que frena es no haber
  podido mirar. Hizo falta por algo que se midió al escribirlo: la mitad del portal existía y **no
  la corría nadie**, porque su flujo de despliegue no la invoca.

## Las compuertas como datos (`gates/`)

D-050: el método es el dueño de la definición mecánica de las compuertas (qué artefacto tiene que
existir en cada peldaño, qué tiene que decir, con qué estrategia se verifica) y la publica en
`docs/html/api/gates.json`; Yujin-Forge es consumidor, igual que con los prompts. La fuente es
`gates/`, mantenida **a mano** porque es datos y no prosa: `catalog.json` (la versión declarada),
`schema.json` (el esquema, que el validador interpreta), `evaluators.json` (el vocabulario cerrado
y append-only), `steps.json` (24 peldaños), `stations.json` (N0 a N7), `heuristics.json` (las 45
reglas del Anexo H) y `adapters.json` (las familias de frontend y los umbrales).
`baseline.json` es el congelado de lo que la herramienta tenía compilado el día del cambio: es la
referencia del test de diferencia cero y **no se edita** (la única excepción escrita es D-055, y
fue del dueño). Su cabecera guarda la procedencia —repositorio y commit de origen— y por eso el
archivo **no se publica**: es el recibo de la diferencia cero, no parte de la API.

Reglas que no se negocian, y que el validador hace cumplir (`node build/gates_validate.mjs`):

- **La base no se edita.** Una entrada sin `since_schema` viene del congelado y tiene que seguir
  siendo idéntica. Un requisito nuevo entra como entrada **nueva** con su `since_schema`. Si de
  verdad hay que cambiar un requisito existente, es un cambio del método y va con su decisión.
  Pasó una sola vez (D-055, autorizada por el dueño y acotada a dos textos): cuando se edita, se
  edita **en sincronía** con el congelado, para que la diferencia cero siga siendo demostrable.
- **Una sola copia de cada texto.** El enunciado de las 45 reglas vive sólo en el Anexo H;
  `heuristics.json` lleva el puntero (`statement_source` para la ruta, una vez, y `section` +
  `row` por regla) y el build **extrae** el texto de `docs/en/ANEXO_HEURISTICAS.md`, que es la
  versión que se publica. El validador rechaza un enunciado transcrito, una severidad que no
  coincida con el anexo y una regla del anexo que la compuerta no tenga.
- **El castellano sigue siendo la fuente de verdad del anexo.** La construcción contrasta las dos
  versiones y falla (`E_ANEXO_TRADUCCION`) si no llevan las mismas reglas, las mismas severidades
  y el mismo agrupamiento por familia. Lo que **no** se verifica por máquina, y queda dicho, es si
  la redacción inglesa sigue diciendo lo que dice la castellana.
- **Ids append-only.** Peldaños, estaciones, reglas (`CQ-*`, `UX-*`) y nombres de evaluador se
  agregan: no se reciclan, no se renombran, no cambian de significado.
- **Nada inventado.** Un umbral que el dueño no declaró se publica con valor nulo y
  `declarado: false`. Los únicos dos que el anexo declara son 300 líneas por archivo y 40 por
  función.
- **La versión.** `catalog_version` la declara el método a mano (hoy `2026.10.5`); el archivo
  publicado viaja con una huella `sha256` del contenido canonicalizado que el consumidor
  **recalcula**. El identificador de git es informativo: se calcula antes de guardar, así que
  siempre nombra al cambio anterior al que lo contiene.
- **Una versión es un contenido, y uno solo** (D-053). Cualquier cambio en una clave cubierta por
  la huella **sube la versión**, aunque no cambie ningún requisito; una regeneración que sólo
  reescribe `generated_at` no cambia nada cubierto y la deja quieta. Cada versión registra en
  `catalog.json#changelog` la huella que produjo; el registro es append-only y **una huella ya
  publicada no se edita** (hay un test que congela la de `2026.10.1`). La publicación se niega
  (`E_VERSION`) cuando la huella del contenido no es la que la versión tiene registrada: es lo que
  obliga a subirla en vez de confiar en que alguien se acuerde. El registro no viaja en el
  publicado, así que anotar una entrada no cambia la huella que esa entrada anota.
- **El idioma de cada texto se declara, y la declaración es verdad** (D-053). El publicado es
  **bilingüe**, porque la base congelada no se traduce: decir `languages.data: "en"` hacía que un
  consumidor que confiara le mostrara castellano a un lector inglés. `languages.data` dice `mixed`
  y `languages.text_language` lleva la regla **aplicable sin leer el texto**: dentro de `tramos`,
  `steps`, `stations` y `loop_entry` un texto es castellano salvo que su nodo o alguno que lo
  contenga declare `since_schema >= 2`; todo el resto es inglés. La construcción exige que **todo**
  texto que la regla llama castellano esté literal en el congelado y que ninguno de los que llama
  inglés se lea como castellano (`E_IDIOMA_DECLARADO`). La declaración también dice lo que el
  consumidor tiene que hacer: leer el `id` opaco y sacar el texto de su propio catálogo.
- **El nivel de datos está en inglés y en ASCII puro** (D-051): nombres de campo, enumeraciones y
  prosa explicativa de `gates/`, el publicado `gates.json` y el documento generado. Es lo que no
  está traducido, y lo que no está traducido va en el idioma canónico de la profesión; traducir
  para el usuario final es trabajo del consumidor. **La excepción es la base congelada**: su texto
  sigue en el castellano en que quedó congelado y el campo `tramo` conserva su nombre, porque la
  base no se edita. Hay un test que lo exige, para que nadie «termine de traducir» por encima de
  la diferencia cero.
- **El nivel de datos no nombra ninguna herramienta ni ningún protocolo** (D-055). Ni los propios
  (la herramienta, el protocolo de navegación) ni los de terceros, ni por su nombre, ni por un
  comando, ni por un identificador de compuerta `G<n>`, ni por una ruta de archivo. El motivo no es
  pudor: el método publica esta definición para cualquier consumidor, y una herramienta nombrada
  adentro del dato se lee como una dependencia que no existe. `tests/gates_neutralidad.test.mjs`
  recorre el payload de las fuentes, los dos archivos publicados y el documento generado contra una
  lista cerrada, y verifica que cada patrón detecte su propio caso. La **prosa** del método sigue
  comparando herramientas por su nombre a propósito (Parte E, manuales de práctica): ahí es
  información para el lector. Las familias de frontend de `adapters.json` también siguen, porque
  son el alcance de una regla y no el endoso de una herramienta.
- **El contrato con el consumidor se declara, no se adivina**: `schema.json` lleva los nombres de
  campo de la configuración de proyecto (`project_config`), el vocabulario de veredicto
  (`enums.verdict`) y las situaciones de una regla, y el validador exige que el registro de
  apagado sea el mismo en el catálogo y en la configuración que lo consume.
- **La huella no deja claves en el limbo.** Toda clave del publicado está cubierta por
  `hash_covers` o excluida en `hash_excludes`, y el validador lo verifica (`E_HUELLA`): una clave
  que no esté en ninguna de las dos viajaría sin protección.
- `docs/COMPUERTAS.md` **se genera** (`node build/gates_doc.mjs`), **en inglés**, y la construcción
  falla si lo que hay en disco no coincide con los datos. No se edita a mano. Queda fuera del
  corpus traducido: es documentación de herramienta (D-051), y su HTML se marca `lang="en"`.
- `build/gates_reference.mjs` es el evaluador de referencia del grupo de heurísticas: la semántica
  del veredicto, ejecutable, con el fixture de violaciones deliberadas en `tests/fixture/`.

## Los prompts publicados (`prompts/`)

`prompts/*.en.md` **se genera** desde los contratos castellanos (`build/prompts.mjs`) y no se edita
a mano; `prompts/catalog.json` se mantiene **a mano**, porque es la identidad de lo publicado y la
declara el método: `corpus_version` (hoy `2026.10.3`) y el registro de huellas, con las mismas
reglas que el catálogo de compuertas (D-053). `docs/html/api/prompts.json` viaja entonces con
versión declarada **y** huella recalculable, y conserva el campo `version` con el sha de git, ahora
explícitamente informativo, para no romper al consumidor que ya lo imprime: el cambio es aditivo y
hay un test que lo exige. Los títulos de peldaño salen de los contratos **ingleses**
(`docs/en/peldanos/`), porque esto es dato de herramienta (D-051); el archivo sigue siendo UTF-8 y
no ASCII puro, porque el texto de los prompts viaja tal cual, con su puntuación tipográfica.

## Build

`node build/build.mjs`: verifica los prompts, valida y publica las compuertas, verifica que
`docs/COMPUERTAS.md` coincida con los datos, y genera, por idioma, `ESCALERA_METODOLOGICA.html`,
`REFERENCIAS.html`, `EVOLUTIVO_CORRECTIVO.html`, `MANUAL_CURSO.html`, `MANUAL_CURSO_EVOLUTIVO.html`
y `CONTRATOS_DE_PELDANO.html`. `build/split.mjs` parte un
archivo con marcas `<!-- file: … -->` en contratos individuales.

`node --test` (a secas, que descubre los archivos de prueba solo): las pruebas de las compuertas
(sin dependencias, node pelado). **No se usa el patrón entre comillas**: medido que en un intérprete
que no lo expande corre CERO pruebas y devuelve éxito, y un verde con cero pruebas no es un verde.
Incluyen el test de diferencia cero contra el congelado, los rojos deliberados del validador, el
fixture que prende y apaga el interruptor, el test de idioma del nivel de datos (D-051) y el de la
versión declarada contra su huella, en los dos archivos publicados (D-053), y las del índice de la
interfaz de datos, que son casi todas rojos deliberados (D-056), y la del registro de pendientes
contra su propio resumen (D-057), y las del aviso de huérfanas, donde cinco de las veintitrés son
rojos deliberados y tres corren el programa aparte para exigir su salida medida (D-058), y las del
inventario del árbol, donde siete de las doce son rojos deliberados y uno reproduce el árbol que
llevaba los cuatro apuntes del panel (D-066). Los cinco
programas que tienen modo de línea de comandos (`gates_validate`, `gates_doc`, `prompts_api`,
`index_api`, `portal_orphans`)
detectan esa invocación con `esLineaDeComandos()` de `build/gates_lib.mjs`, que es portable:
el idiom de pegar `file:///` adelante de `argv[1]` sólo acierta en Windows y dejaba dos pasos
de la cadena corriendo en vacío sobre Linux, en verde. Hay una prueba que lo exige en las dos
formas de ruta, y los pasos del flujo que los corren exigen además la línea que el programa
imprime: un paso que no imprimió nada no corrió, y no es un verde. `node build/api_check.mjs` regenera lo publicado y falla
si no coincide con lo commiteado, y `node build/api_check.mjs --huella` recalcula la huella de los
**dos** recursos commiteados sin regenerar nada (es lo que usa el paso de publicación, porque regenerar reescribe
`generated_at` y publicaría algo distinto de lo que quedó en `main`); en los dos modos exige además
que el **índice** (`docs/html/api/index.json`, generado por `build/index_api.mjs`) cite las
versiones, las huellas y los tamaños vivos, y que no haya un recurso publicado que el índice esconda
ni un recurso listado que no exista.
`node build/portal_verify.mjs` pregunta a producción si sirve las dos huellas commiteadas y
distingue el verde del aviso (sirve otra huella) y del rojo (no se pudo leer); corre con node pelado
y sin `curl`, así que el mismo chequeo del flujo se corre a mano (`--rondas 1` para una sola vuelta).
Queda **fuera** de `build/build.mjs` a propósito: la construcción tiene que correr sin red.
`node build/api_headers.mjs` es el otro chequeo contra producción y pregunta otra cosa: no si el
**contenido** es el commiteado, sino si la interfaz se puede **consumir** —el directorio contesta
con el índice, vuelve la cabecera de origen cruzado, algo dice cuánto vale la copia—. También corre
con node pelado y sin `curl`, y también está fuera de la construcción.
`node build/portal_orphans.mjs --portal <árbol del portal>` es el tercero de esta familia y no
pregunta nada por red: contrasta los documentos que el método publica contra los que la portada
enlaza y los que el mapa del sitio lleva, y avisa nombrando a cada huérfano (D-058). Necesita los
**dos** árboles, así que también queda fuera de `build/build.mjs`; en el flujo corre dentro del
trabajo de publicación, que es el único momento en que están juntos.
`.github/workflows/compuertas.yml` corre todo eso en cada cambio y, en `main` y sólo con todo en
verde, publica en el repositorio del portal (D-052), avisa si algo quedó huérfano (D-058),
verifica que producción lo sirva (D-054) y le pregunta si se puede consumir (D-057, que avisa y no
frena).
