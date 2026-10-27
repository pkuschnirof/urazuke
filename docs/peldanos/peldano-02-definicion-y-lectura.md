# Peldaño 2 — La definición del proyecto, el árbol semántico y la lectura obligatoria (contrato del peldaño)

**Tramo:** arranque.
**Cuándo:** se escribe una vez, después del contrato; el árbol semántico y el
estado vivo se mantienen al día durante todo el proyecto, con cada bloque y cada decisión nueva.
**Forma:** conversación: el agente redacta, pregunta lo que falta, vos corregís.
**Tamaño:** obligatorio en todo proyecto. En uno chico, el archivo de proyecto puede tener
cincuenta líneas y el árbol semántico veinte nodos; lo que no pueden es no existir.

## Para qué sirve

Cada sesión del agente arranca de cero: no se acuerda de ayer. Dale un mapa, corto, que le diga
qué es el proyecto, en qué estado está y qué decisiones ya se tomaron, y obligalo a leerlo antes
de tocar nada. El fallo que evita es doble: trabajo descartable por no leer el mapa
[Ref. 9](../REFERENCIAS.md#ref-9), y el mapa que crece hasta volverse ilegible
[Ref. 41](../REFERENCIAS.md#ref-41). La regla práctica: **el archivo de proyecto es el programa, no
el historial**. Lo que pasó va a otro lado.

El mapa tiene dos piezas, y la segunda es la que más trabajo hace. La primera es el archivo de
proyecto: qué es el sistema, para quién, qué NO es, las decisiones tomadas. La segunda es el
**árbol semántico**: el sistema descompuesto como un árbol, con los dominios, y debajo de cada uno
sus actores, sus procesos (los casos de uso), sus entidades con sus estados, sus pantallas y sus
integraciones; y de cada nodo cuelgan los pendientes y las decisiones que lo tocan. El árbol sale
del relevamiento que hiciste con los métodos clásicos de la ingeniería de requerimientos
(entrevistas, casos de uso, modelo de dominio), lo construye el agente, lo corregís vos, y es lo
que le da al modelo el contexto exacto del nodo que va a tocar sin tener que leer todo el
proyecto. Y es lo que te permite a vos verificar, sin leer código, que el sistema que el agente
entiende es el que el negocio pidió.

## 1. Contexto requerido

Lo que sigue es la lista genérica. Los archivos concretos que tenés que tener hechos antes de cada
prompt, con su contenido y su estado mínimo, están en la sección 2, en el bloque "Antes de enviar
el prompt" que precede a cada uno.

- Relevamiento del negocio: qué hace el cliente, quiénes usan el sistema, qué problema resuelve,
  qué no tiene que hacer. Con las entrevistas, los casos de uso o historias de usuario que puedas
  nombrar, y las entidades del negocio con sus estados, aunque estén incompletos.
- El contrato de convivencia (peldaño 1).
- Si existe un sistema anterior: acceso de lectura a su código o a su documentación.
- Las decisiones ya tomadas, si las hay, aunque sea de palabra.
- Las palabras que el negocio usa de verdad para cada cosa, y quiénes son los distintos tipos de
  persona que van a usar el sistema. Son las dos **entradas previas** del
  [Anexo H](../ANEXO_HEURISTICAS.md), y este peldaño es donde se escriben: sin ellas, la matriz de
  perfiles del peldaño 8 se inventa y las reglas de usabilidad no tienen contra qué comparar.

## 2. Prompts

**Inicial:**

**Antes de enviar el prompt**, esto tiene que existir, y lo hacés vos (o el negocio con vos), no
el agente:

- `docs/INITIAL_SURVEY.md` (peldaño 0), completado con el relevamiento del negocio. Lo escribís
  vos a partir de las entrevistas de la ingesta; si usaste un método (entrevistas, casos de uso,
  historias de usuario, prototipos de pantalla), decí cuál y pegá el resultado. Tiene que tener:
  qué hace el cliente; quiénes usan el sistema (los actores, con nombre de rol); qué problema
  resuelve; qué NO tiene que hacer, en una sección propia, aunque tenga dos ítems; los casos de
  uso o historias de usuario que nombra el dueño, con sus palabras, aunque sean diez líneas; las
  entidades del negocio con sus estados ("un turno está pendiente, confirmado, cancelado"), aunque
  estén incompletas; los dibujos o las fotos de las pantallas, si hay; las integraciones externas
  (mensajería, pagos, otro sistema); y las decisiones ya tomadas, aunque hayan sido de palabra,
  con fecha y quién las tomó.
- `docs/WORKING_AGREEMENT.md` (peldaño 1), cerrado con fecha y versión.
- Si existe un sistema anterior: acceso de lectura a su código o a su documentación, con la ruta o
  el enlace anotado en el relevamiento.
- Estado mínimo aceptable: el relevamiento tiene la sección "qué NO es" con al menos dos ítems, al
  menos un caso de uso con las palabras del dueño, y al menos una entidad con sus estados. Sin
  eso, el árbol que salga va a ser inventado, y vos no vas a tener con qué compararlo.
- Y para las dos entradas previas del Anexo H: en el relevamiento, los actores nombrados **con la
  palabra que usa el negocio** (si la recepcionista se llama "la chica de mostrador", eso es el
  dato, no "usuario operativo"), y cualquier lista de tipos de usuario que ya exista, aunque esté
  en un correo. Si no tenés ni una cosa ni la otra, decilo: el agente las tiene que **preguntar**,
  no inventar.

> We are going to define the project in writing. Read the business survey in
> `docs/INITIAL_SURVEY.md` and the working agreement in `docs/WORKING_AGREEMENT.md`. Evaluate
> whether the survey is sufficient to describe the system, its users, its domain and its
> boundaries; if it is not, ask me for what is missing before writing anything. Then write two
> things. First, `PROJECT.md`, three hundred lines at most, with: what the system is and for
> whom; what it is NOT; the main modules as a list; the decisions already made, each with its
> date; and the instruction to read this file and the semantic tree at the start of every
> session. Second, `docs/SEMANTIC_TREE.md`: the system as a tree, with the domains at the top
> level and, under each one, its actors, its processes (the use cases, each with actor, trigger,
> steps, outcome and exceptions), its entities with their attributes, states and transitions,
> its screens, and its external integrations. Mark every node you inferred rather than read in
> the survey, so that I can confirm or correct it. Third, the two prior inputs that Annex H
> needs before a single screen exists: the user glossary, with the words people actually use
> for each thing as the business says them and not as the system calls them; and the list of
> profiles, saying who each one is and what they come to do. Take both from the survey, ask
> me for whatever is not in it instead of inventing it, write them as `docs/GLOSSARY.md` and
> `docs/PROFILES.md`, name them in `PROJECT.md`, and mark what you inferred there too. Separately, create
> `docs/STATUS.md` for the living state (what is being worked on, what is open): that file
> changes every day; the other two change only when the system changes. Reply in my language.

> [es]
> Vamos a definir el proyecto por escrito. Leé el relevamiento del negocio en
> `docs/INITIAL_SURVEY.md` y el contrato de convivencia en `docs/WORKING_AGREEMENT.md`. Evaluá si
> el relevamiento alcanza para describir el sistema, sus usuarios, su dominio y sus límites; si no
> alcanza, pedime lo que falta antes de escribir nada. Después escribí dos cosas. Primero,
> `PROJECT.md`, de trescientas líneas como máximo, con: qué es el sistema y para quién; qué NO es;
> los módulos principales como lista; las decisiones ya tomadas, cada una con su fecha; y la
> instrucción de leer este archivo y el árbol semántico al empezar cada sesión. Segundo,
> `docs/SEMANTIC_TREE.md`: el sistema como un árbol, con los dominios en el primer nivel y, debajo
> de cada uno, sus actores, sus procesos (los casos de uso, cada uno con actor, disparador, pasos,
> resultado y excepciones), sus entidades con sus atributos, estados y transiciones, sus pantallas
> y sus integraciones externas. Marcá cada nodo que hayas inferido en vez de leído en el
> relevamiento, para que yo lo confirme o lo corrija. Tercero, las dos entradas previas que el
> Anexo H necesita antes de que exista una sola pantalla: el glosario del usuario, con las
> palabras que la gente usa de verdad para cada cosa, como las dice el negocio y no como las
> llama el sistema; y la lista de perfiles, diciendo quién es cada uno y qué viene a hacer.
> Sacá las dos del relevamiento, pedime lo que no esté en él en vez de inventarlo, escribilas
> en `docs/GLOSSARY.md` y `docs/PROFILES.md`, nombralas en `PROJECT.md` y marcá también ahí
> lo que hayas inferido. Aparte, creá `docs/STATUS.md` para el estado
> vivo (en qué se está trabajando, qué está abierto): ese archivo cambia todos los días; los otros
> dos cambian solo cuando cambia el sistema. Respondé en mi idioma.

Qué le estoy pidiendo: que evalúe el relevamiento y pregunte antes de redactar; que el archivo de
proyecto sea **corto** (el tope de trescientas líneas es arbitrario pero necesario: sin tope,
crece); que diga explícitamente qué **no** es el sistema, porque lo que no está dicho es lo que el
modelo va a inventar; que las decisiones tengan fecha; que construya el **árbol semántico** con la
estructura completa (dominios, actores, casos de uso con sus partes, entidades con estados y
transiciones, pantallas, integraciones), que es el modelo de dominio de la ingeniería de
requerimientos puesto en forma de árbol; que **marque lo que infirió**, porque es ahí donde se
esconden las invenciones; y que separe el estado vivo en otro archivo, para que el mapa no se
convierta en historial.

Y las dos entradas previas del Anexo H, que son las que hacen que el peldaño 2 no sea sólo un mapa
para el modelo. El **glosario del usuario** es la lista de palabras que la gente usa de verdad:
"turno", no "reserva de agenda"; "la chica de mostrador", no "usuario operativo". Sirve para dos
cosas que vienen después: nombrar los grupos del menú con trabajos del usuario, y que el texto de
las pantallas diga lo que la gente dice. La **lista de perfiles** es quién es cada uno y qué viene
a hacer, y es la columna de la que sale la matriz del peldaño 8; si no está escrita acá, en el
peldaño 5 se inventa, y una matriz inventada es la causa de que alguien vea un botón que no le
corresponde. Le pido explícitamente que las **pregunte** en vez de deducirlas, porque son datos del
negocio y no del sistema; y que marque lo inferido, por lo mismo que en el árbol.

**De cierre:**

**Antes de enviar el prompt**, tenés que tener esto a mano:

- `PROJECT.md`, leído entero por vos (tiene que entrar en cinco minutos), con tus correcciones
  anotadas: lo que no es cierto, lo que no es tuyo, lo que sobra.
- `docs/SEMANTIC_TREE.md`, recorrido nodo por nodo como si fueras el cliente: cada nodo marcado
  como inferido tiene tu veredicto (confirmado o corregido), y anotaste los actores que faltan,
  los estados que el negocio no usa, las pantallas que nadie pidió.
- La lista de correcciones, escrita, que va en el hueco [list] del prompt. Si la lista está vacía
  la primera vez, desconfiá de tu lectura, no del agente.
- Estado mínimo aceptable: ningún nodo marcado "inferido" queda sin veredicto tuyo.

> Apply these corrections: [list]. Finalize `PROJECT.md` and `docs/SEMANTIC_TREE.md` with
> today's date. Add to the working agreement two rules: the change history never goes into
> `PROJECT.md` (it goes to `docs/STATUS.md` or to the pending-items register); and every pending
> item must hang from a node of the semantic tree, and the tree is updated in the same commit
> whenever a block adds or changes a node.

> [es]
> Aplicá estas correcciones: [lista]. Cerrá `PROJECT.md` y `docs/SEMANTIC_TREE.md` con la fecha
> de hoy. Agregá al contrato de convivencia dos reglas: el historial de cambios nunca va en
> `PROJECT.md` (va a `docs/STATUS.md` o al registro de pendientes); y todo pendiente tiene que
> colgar de un nodo del árbol semántico, y el árbol se actualiza en el mismo commit cada vez que
> un bloque agrega o cambia un nodo.

Qué le estoy pidiendo: tus correcciones (sobre todo a los nodos que marcó como inferidos), la
fecha, y dos reglas nuevas en el contrato: la que protege al archivo de proyecto de volverse
historial, y la que ata cada pendiente a un nodo del árbol, que es lo que mantiene el árbol vivo y
lo que te permite detectar en diez segundos un pendiente fuera de alcance.

## 3. Resultado esperado

- `PROJECT.md` (o `CLAUDE.md`): corto, de lectura obligatoria, con qué es, para quién, qué no es,
  módulos, decisiones con fecha, y la orden de leerlo junto con el árbol. Máximo trescientas
  líneas.
- `docs/SEMANTIC_TREE.md`: el árbol semántico, con los nodos inferidos marcados hasta que los
  confirmes, y, desde el primer bloque, los pendientes y decisiones colgando de sus nodos.
- `docs/STATUS.md`: estado vivo, separado de los anteriores.
- Las dos entradas previas del Anexo H, escritas y nombradas en `PROJECT.md`: el **glosario del
  usuario** (las palabras que la gente usa de verdad para cada cosa) y la **lista de perfiles**
  (quién es cada uno y qué viene a hacer), con lo inferido marcado. El método declara el nombre de esos dos
  archivos —`docs/GLOSSARY.md` y `docs/PROFILES.md`—, igual que declara el de los otros tres: una
  compuerta no puede mirar un archivo cuyo nombre nadie sabe, y mientras no lo declaró, la matriz
  del peldaño 8 se podía seguir inventando contra una lista que nada obligaba a existir. Lo que
  exige sigue siendo lo mismo: que existan, que se puedan encontrar desde el archivo de proyecto y
  que estén antes del peldaño 5.
- En los tres, una fecha de última actualización.
- En el contrato, las dos reglas nuevas.
- En el archivo de proyecto, una línea que diga con qué versión del método trabaja el proyecto:
  la `catalog_version` que fijaste y la huella de contenido que esa versión declara. Es lo que
  permite que dentro de un año se sepa contra qué definición se le dio verde a cada peldaño, y lo
  que hace que subir de versión sea una decisión y no un accidente.

## 4. Verificación de completitud

- ¿`PROJECT.md` cabe en una lectura de cinco minutos? Si no, está mal: es el programa, no el
  historial.
- ¿Dice explícitamente qué NO hace el sistema? (Lo que falta es lo que el agente va a inventar.)
- Recorré el árbol semántico como si fueras el cliente: ¿están todos los actores que vos conocés?
  ¿Cada entidad tiene los estados que el negocio usa, ni más ni menos? ¿Hay algún nodo que no
  reconozcas? Ese es un invento: corregilo ahora.
- ¿Los nodos inferidos están marcados? ¿Los confirmaste o corregiste todos?
- ¿Cada decisión tiene fecha y quién la tomó?
- ¿El agente preguntó algo sobre el negocio antes de redactar? Si no preguntó nada, revisá qué
  supuso.
- ¿El estado vivo está en otro archivo?
- ¿Está escrito el glosario del usuario, con las palabras que la gente usa de verdad para cada
  cosa? Leelo y buscá una palabra que vos no diríais: si está, la escribió el sistema y no el
  negocio.
- ¿Está escrita la lista de perfiles, diciendo quién es cada uno y qué viene a hacer? Contá los
  perfiles con los dedos de tu negocio: si falta uno, falta una fila de la matriz del peldaño 8 y
  una tanda de casos de prueba del 10.
- La prueba de lectura: cerrá la sesión, abrí una nueva, y preguntale qué NO hace el sistema y de
  qué nodo del árbol cuelga tal pantalla. Si contesta con el mapa, el enganche funciona.
- ¿Está escrito con qué versión del método trabaja el proyecto, con su huella? Si no está, el día
  que la definición cambie nadie va a poder decir si los peldaños cerrados siguen cerrados.

## 5. Señales de alarma

- El archivo de proyecto creció más de un 20 % en un mes. Algo que no es programa está entrando.
- El agente empieza una sesión proponiendo algo que ya se decidió y está escrito. No leyó el mapa:
  el enganche de lectura obligatoria falló.
- La sección "qué no es" está vacía o dice "nada en particular". Todo sistema tiene límites; si
  no están escritos, el modelo los va a cruzar.
- Hay pendientes que no cuelgan de ningún nodo del árbol. O el árbol quedó viejo o esos
  pendientes están fuera de alcance; las dos cosas hay que mirarlas.
- Una entidad del árbol tiene un estado que el negocio nunca nombró. El modelo lo inventó porque
  le pareció lógico, y va a construir sobre él.
- El glosario del usuario tiene las mismas palabras que el árbol semántico. No es un glosario del
  usuario: es el vocabulario del sistema copiado dos veces. Preguntale al negocio cómo le dice.
- La lista de perfiles tiene un solo perfil, "usuario". Casi nunca es cierto, y es la forma más
  común de llegar al peldaño 8 con una matriz de una fila que no protege nada.
