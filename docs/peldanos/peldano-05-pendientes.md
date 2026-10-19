# Peldaño 5 — El plan son los pendientes: la especificación detallada vive en cada uno (contrato del peldaño)

**Tramo:** bucle.
**Cuándo:** el registro se crea al abrir el primer bloque funcional, apenas termina el arranque;
cada bloque nuevo arranca convirtiendo el pedido del cliente en pendientes especificados; la
rutina se usa en cada sesión durante todo el proyecto; la documentación del pendiente hecho se
escribe al cerrarlo, en la misma sesión.
**Forma:** un solo tiro al abrir cada bloque; después, rutina de cada sesión.
**Tamaño:** obligatorio en todo proyecto. Es el peldaño que hace que todos los demás se puedan
seguir: sin pendientes numerados y especificados no hay dónde colgar ni la especificación ni la
evidencia.

## Para qué sirve

Tené una sola cola de trabajo, con orden y con compuerta, que sea la verdad del proyecto. No hay
"plan" por un lado y "tareas" por otro: la lista de pendientes ES el plan. Evita la especificación
larga que se supera a las dos semanas y queda obsoleta [Ref. 17](../REFERENCIAS.md#ref-17), y el
trabajo del que nadie sabe por qué se hizo [Ref. 7](../REFERENCIAS.md#ref-7).

Pero hay más, y es lo que distingue a este peldaño de una lista de tareas cualquiera. En el
método clásico existía un documento de especificación de requerimientos, largo, que describía todo
lo que el sistema tenía que hacer y que envejecía antes de terminarse. Acá ese documento se
descompone: **la especificación detallada vive en cada pendiente**. Un pendiente bien escrito
trae: el nodo del árbol semántico del que cuelga; la historia de usuario o caso de uso que lo
origina, con las palabras del cliente; la descripción detallada; las reglas de negocio
aplicables, con su decisión y su fecha; los datos que entran y salen; las pantallas afectadas,
con el prototipo si lo hay; los casos borde y las excepciones; los criterios de aceptación en la
forma "dado, cuando, entonces"; y cómo se verifica. La suma de los pendientes es la especificación
del sistema, y la trazabilidad (requerimiento → pendiente → test → commit) no es una matriz
aparte: es el pendiente mismo.

Y lo tercero, que cierra el círculo: **los pendientes cerrados son documentación**. Cuando un
pendiente se cierra, no se borra ni se archiva vacío: queda con su especificación, la decisión que
lo originó, la evidencia con la que se cerró (los números del rojo y del verde, la captura, el
número medido), el commit y la fecha. La cola de pendientes cerrados es el historial funcional del
sistema: qué se construyó, por qué, cuándo y cómo se probó. De ahí salen el diario de cambios, las
secciones nuevas del manual, y la respuesta a "¿por qué el sistema hace esto?" seis meses después.

## 1. Contexto requerido

Lo que sigue es la lista genérica. Los archivos concretos que tenés que tener hechos antes de cada
prompt, con su contenido y su estado mínimo, están en la sección 2, en el bloque "Antes de enviar
el prompt" que precede a cada uno.

- El pedido del cliente para el bloque, en prosa, tal como lo diría él, con sus ambigüedades. Si
  hiciste casos de uso o historias de usuario en la ingesta, mejor: son la unidad natural de un
  bloque.
- El árbol semántico (peldaño 2), para colgar cada pendiente de su nodo.
- Las auditorías y los hallazgos de las pruebas humanas, si ya hubo.
- `PROJECT.md` y `docs/STATUS.md`.

## 2. Prompts

**Para abrir un bloque:**

**Antes de enviar el prompt**, esto tiene que existir, y lo hacés vos (o el negocio con vos), no
el agente:

- El pedido del cliente para este bloque, escrito en prosa, tal como lo diría él, con sus
  ambigüedades. Va en `docs/INITIAL_SURVEY.md` bajo un título con el nombre del bloque, o en un
  archivo propio (por ejemplo `docs/blocks/BLOCK_01_REQUEST.md`); el prompt dice "the client's
  request for this block" sin ruta, así que decile en el chat dónde está. Si en la ingesta
  escribiste casos de uso o historias de usuario, van ahí: son la unidad natural del bloque. Si el
  dueño te dio una prioridad, también. No lo "mejores" vos: las ambigüedades son lo que el agente
  tiene que preguntar.
- `docs/SEMANTIC_TREE.md` (peldaño 2), al día: cada pendiente va a colgar de un nodo de ahí.
- `PROJECT.md` y `docs/STATUS.md` (peldaño 2), al día.
- Si hubo auditorías (peldaño 13) o pruebas humanas (la vista humana al cierre del bloque
  anterior): sus hallazgos, en `docs/AUDIT_[fecha].md` o anotados en el estado vivo, porque son
  pendientes candidatos para este bloque.
- Estado mínimo aceptable: el pedido del bloque está escrito con las palabras del cliente, y el
  árbol tiene los nodos de ese bloque, o el pedido deja ver cuáles faltan.

> We are going to turn everything that must be done in this block into numbered pending items,
> each one carrying its full specification. Read `PROJECT.md`, `docs/SEMANTIC_TREE.md`, the
> client's request for this block, and whatever is in `docs/STATUS.md`. If the request is
> ambiguous on any point such that you cannot write a verifiable pending item for it, ask me; do
> not resolve it by assuming. Then create or extend `docs/PENDING.md` with one item per thing to
> do, each with: number (PND-001 onwards); one-line title; the node of the semantic tree it hangs
> from; the user story or use case that originates it, in the client's words; the detailed
> description; the business rules that apply, each with its decision and date, or marked as
> "rule missing, asked"; the data in and out; the screens affected; the edge cases and
> exceptions; the acceptance criteria in the form "given, when, then"; how it will be verified
> as done; and status. If a node the item needs does not exist in the tree, propose it and mark
> it. Order the items by the priority I gave you; if I gave none, propose an order and tell me
> why. Reply in my language.

> [es]
> Vamos a convertir todo lo que hay que hacer en este bloque en pendientes numerados, cada uno
> con su especificación completa. Leé `PROJECT.md`, `docs/SEMANTIC_TREE.md`, el pedido del
> cliente para este bloque, y lo que haya en `docs/STATUS.md`. Si el pedido es ambiguo en algún
> punto de modo que no puedas escribir un pendiente verificable, preguntame; no lo resuelvas
> suponiendo. Después creá o extendé `docs/PENDING.md` con un ítem por cosa a hacer, cada uno
> con: número (PND-001 en adelante); título de una línea; el nodo del árbol semántico del que
> cuelga; la historia de usuario o caso de uso que lo origina, con las palabras del cliente; la
> descripción detallada; las reglas de negocio que aplican, cada una con su decisión y fecha, o
> marcada como "regla faltante, preguntada"; los datos que entran y salen; las pantallas
> afectadas; los casos borde y las excepciones; los criterios de aceptación en la forma "dado,
> cuando, entonces"; cómo se va a verificar que está hecho; y el estado. Si un nodo que el ítem
> necesita no existe en el árbol, proponelo y marcalo. Ordenalos por la prioridad que te di; si
> no te di ninguna, proponé un orden y decime por qué. Respondé en mi idioma.

Qué le estoy pidiendo: que convierta el pedido en ítems verificables y que **pregunte cuando el
pedido no da para escribir uno verificable** (la ambigüedad se resuelve preguntando, no
eligiendo); la especificación completa de cada pendiente, campo por campo, que es la ingeniería de
requerimientos clásica descompuesta en unidades chicas; el nodo del árbol del que cuelga, que es
lo que te permite detectar un pendiente fuera de alcance; las reglas de negocio con su decisión o
marcadas como faltantes, que es el enganche con el peldaño 6; los criterios de aceptación en la
forma clásica, que son el guion del test de punta a punta del peldaño 8; y un orden propuesto con
su razón, para que vos lo confirmes o lo cambies.

**Rutina de cada sesión (va en el contrato de convivencia):**

**Antes de enviar el prompt**, tenés que tener esto a mano:

- `docs/PENDING.md` con el bloque especificado y leído por vos, pendiente por pendiente, como si
  fueras el cliente, con tus correcciones ya hechas (es la tarea más importante del peldaño, y la
  que más tentación da de saltear).
- `docs/WORKING_AGREEMENT.md` (peldaño 1), donde esta rutina se agrega.
- Estado mínimo aceptable: ningún pendiente tiene una especificación de una línea. Si la tiene, no
  empieces a construir: hacela completar primero.

> Before touching any code, open `docs/PENDING.md`, tell me which item you are taking and why,
> and re-read its specification. Every commit cites its pending item. A pending item is closed
> with written evidence (the test counts red and green, the screenshot, the measured number),
> never with "done". When you close it, keep it in the register with its full specification and
> add: the evidence, the commit, the date, and any decision that was taken along the way; that
> record is the documentation of what was built. If along the way you see something that is not
> on the list, add it as a new pending item with its specification; do not do it.

> [es]
> Antes de tocar código, abrí `docs/PENDING.md`, decime qué pendiente tomás y por qué, y releé su
> especificación. Cada commit cita su pendiente. Un pendiente se cierra con evidencia escrita (los
> números del test en rojo y en verde, la captura, el número medido), nunca con "listo". Cuando lo
> cierres, dejalo en el registro con su especificación completa y agregá: la evidencia, el commit,
> la fecha, y cualquier decisión que se haya tomado en el camino; ese registro es la documentación
> de lo que se construyó. Si en el camino ves algo que no está en la lista, agregalo como pendiente
> nuevo con su especificación; no lo hagas.

Qué le estoy pidiendo: la disciplina de cada sesión: anunciar qué se toma y releer la
especificación (el agente arranca sin memoria, y la especificación es su memoria del pendiente),
citar el pendiente en cada commit, cerrar con evidencia, **documentar el pendiente hecho** en el
mismo registro, y **anotar en vez de hacer** lo que aparezca fuera de la lista. Esa última cláusula
es la que protege el alcance exacto cuando el modelo "ve algo más".

## 3. Resultado esperado

`docs/PENDING.md` (o la herramienta que use tu proyecto) con, por pendiente:

- Número, título, estado (abierto / en curso / cerrado), fecha de apertura y de cierre.
- El nodo del árbol semántico.
- La historia o caso de uso de origen, con las palabras del cliente.
- La especificación detallada: descripción, reglas de negocio con decisión y fecha, datos,
  pantallas, casos borde, criterios de aceptación, cómo se verifica.
- Al cerrarse: la evidencia, el commit, la fecha, las decisiones tomadas en el camino.

Y la rutina en el contrato de convivencia.

## 4. Verificación de completitud

- Leé la especificación de un pendiente al azar como si fueras el cliente: ¿describe lo que
  pediste, con tus palabras de origen? ¿Los criterios de aceptación son los que vos usarías para
  decir "está bien"? ¿Hay un caso borde que vos conocés y no está?
- ¿Cada pendiente cuelga de un nodo del árbol? ¿Hay alguno colgado de un nodo que no reconocés?
- ¿Cada pendiente dice cómo se verifica? Un pendiente sin verificación no se puede cerrar.
- ¿Hay reglas de negocio marcadas como "faltante, preguntada" que no te preguntaron?
- ¿Hay pendientes "cerrados" sin evidencia ni commit? Si los hay, reabrilos. ¿Los cerrados
  conservan su especificación y su documentación de cierre?
- Tomá tres commits al azar: ¿citan su pendiente?
- ¿Apareció en el código algo que no tiene pendiente? Ahí el agente se salió del alcance.

## 5. Señales de alarma

- Un pendiente lleva más de tres sesiones "en curso". O es tres pendientes, o está trabado por
  una decisión que nadie tomó (peldaño 6).
- Hay más pendientes cerrados en un día que commits ese día. Se están cerrando sin evidencia.
- Las especificaciones son de una línea. El agente las escribió para cumplir, no para construir
  sobre ellas; va a inventar lo que falta en el momento de construir.
- La lista tiene más de cincuenta pendientes abiertos. No es un plan, es un inventario de
  ansiedades: hay que priorizar y archivar.
- Alguien pregunta por qué el sistema hace algo y la respuesta no está en ningún pendiente
  cerrado. La documentación del hecho no se está escribiendo.
