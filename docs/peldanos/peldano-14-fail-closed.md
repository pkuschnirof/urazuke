# Peldaño 14 — Fail-closed, candados y cero daño silencioso (contrato del peldaño)

**Tramo:** salida a producción.
**Cuándo:** en el tramo de salida a producción, ANTES de construir cualquier funcionalidad que
cobre, envíe, apruebe o borre; se revisa con cada acción nueva con consecuencias. Las
automatizaciones nuevas arrancan en modo de ensayo y se habilitan después de mirar su registro
unos días.
**Forma:** conversación: el agente lista las acciones con consecuencia, vos confirmás cuáles
llevan candado y de qué tipo.
**Tamaño:** obligatorio apenas el sistema hace algo irreversible (cobrar, enviar, borrar,
aprobar). Un sistema de solo lectura puede saltearlo; en el momento en que gana su primer botón que
actúa sobre el mundo, este peldaño pasa a ser el más importante.

## Para qué sirve

Hacé que el sistema, ante una duda o un fallo, NO actúe, y que lo diga. Suena obvio y es lo
contrario de lo que el software hace por defecto, que ante la duda sigue adelante. Evita el doble
cobro, la aprobación automática sin pasar por un humano, el `git add -A` que sube una credencial,
y el borrado de datos del cliente. Los candados que puse en la Obra Social son el modelo: el botón
de pánico con doble seguro, el aprobador automático en modo de ensayo, el vigía con guardas
[Ref. 28](../REFERENCIAS.md#ref-28); y el reflejo de que un fallo deje una fila sin su botón en vez
de romper el listado entero [Ref. 25](../REFERENCIAS.md#ref-25).

El principio tiene nombre, "fail-closed", y viene de la seguridad física: una puerta de seguridad
que queda cerrada cuando se corta la luz. Lo contrario, "fail-open", es la puerta que se abre. En
software la mayoría de las cosas son fail-open por defecto: si la validación falla, el código
sigue; si el servicio no responde, se asume que está todo bien. El método invierte el defecto:
**ante la duda, no**. Y se aplica tanto al sistema como al agente que lo opera.

## 1. Contexto requerido

Lo que sigue es la lista genérica. Los archivos concretos que tenés que tener hechos antes de cada
prompt, con su contenido y su estado mínimo, están en la sección 2, en el bloque "Antes de enviar
el prompt" que precede a cada uno.

- **Relevamiento de acciones con consecuencia**, nombrado así en forma genérica: qué hace el
  sistema que cobra, envía, aprueba, borra, o le avisa a alguien de afuera; qué pasa si se hace
  dos veces; qué pasa si se hace mal; cómo se deshace. Lo sabe el negocio; el agente evalúa si la
  lista está completa y pregunta. El árbol semántico ayuda: cada proceso con consecuencia está ahí.
- Qué acciones puede hacer el agente mismo sobre el sistema (si está embebido).

## 2. Prompts

**Inicial:**

**Antes de enviar el prompt**, esto tiene que existir, y lo hacés vos (o el negocio con vos), no
el agente:

- `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`: el relevamiento de acciones con consecuencia, escrito
  con el dueño del dominio. Qué hace o va a hacer el sistema que cobra, envía, aprueba, borra, o
  le avisa a alguien de afuera; y para cada acción: qué pasa si se hace dos veces, qué pasa si se
  hace mal, cómo se deshace, y quién debería poder hacerla. Los procesos del árbol semántico te
  dan la lista de partida: recorrelos uno por uno. El prompt lo nombra "the survey of
  consequential actions", sin ruta: guardalo con este nombre o decile en el chat dónde está.
- Si el agente va a estar embebido o residente: qué acciones puede hacer él mismo sobre el
  sistema, en una sección aparte del mismo relevamiento.
- `docs/SEMANTIC_TREE.md`, al día.
- Estado mínimo aceptable: cada proceso del árbol que actúa sobre el mundo está en la lista con su
  "qué pasa si se hace dos veces".

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [es]
> Vamos a decidir qué acciones del sistema necesitan candado. Leé el relevamiento de acciones
> con consecuencia, y recorré el código buscando todo lo que cobra, envía, aprueba, borra o avisa
> hacia afuera. Compará las dos listas: si el código tiene acciones que el relevamiento no
> menciona, o al revés, preguntame antes de seguir. Para cada acción proponé: si es reversible,
> qué candado lleva (confirmación explícita, doble seguro, modo de ensayo, límite diario, un
> humano en el circuito), y cuál es el camino de vuelta si sale mal. Regla general: ante cualquier
> duda o fallo en el camino, la acción NO se ejecuta y se registra el motivo. Presentame la tabla;
> yo confirmo candado por candado.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.
>
> Respondé en mi idioma.

Qué le estoy pidiendo: el cruce entre lo que el negocio dijo y lo que el código hace (ahí
aparecen las acciones que nadie recordaba); la cláusula de completitud en su forma para este
peldaño: las diferencias entre las dos listas se preguntan, no se resuelven; para cada acción,
reversibilidad, candado y camino de vuelta; y la regla general del fail-closed escrita en el
prompt, para que quede en la tabla y en el código.

**De cierre:**

**Antes de enviar el prompt**, tenés que tener esto a mano:

- La tabla que presentó el agente, leída candado por candado con el dueño; para cada fila, tu
  confirmación o tu cambio, escritos para los huecos [list], [X] e [Y] del prompt.
- Estado mínimo aceptable: no hay fila sin veredicto. Un candado no confirmado es un candado que
  no se va a implementar.

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [es]
> Confirmo los candados [lista]; cambiá [X] por [Y]. Implementalos con un test por candado que
> pruebe que, en la condición de duda, la acción NO ocurre (probado en rojo contra la versión sin
> el candado). Registrá la tabla final en `docs/LOCKS.md`. Y para toda automatización nueva: modo
> de ensayo primero, registrando lo que habría hecho, hasta que yo la habilite.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.

Qué le estoy pidiendo: el test por candado **probado en rojo** (sin el candado, la acción
ocurría; con el candado, no), que es el peldaño 8 aplicado a la seguridad; la tabla final; y la
regla del modo de ensayo para toda automatización nueva, que es lo que permite ver qué habría
hecho antes de dejarla hacer.

## 3. Resultado esperado

- `docs/LOCKS.md`: una fila por acción con consecuencia: qué hace, si es reversible, el candado,
  el camino de vuelta, quién lo aprobó y cuándo.
- Un test por candado, probado en rojo, que verifica que ante la duda la acción no ocurre.
- Las automatizaciones nuevas arrancando en modo de ensayo, con el registro de "habría hecho".
- Si el agente está embebido: sus permisos escritos (qué puede leer, qué puede cambiar, qué
  requiere aprobación).

## 4. Verificación de completitud

- ¿Cada acción que cobra, envía, aprueba o borra está en la tabla? Pensá una que no esté y
  preguntá.
- ¿Cada candado tiene su test en rojo? ("Sin el candado, la acción ocurría; con el candado, no.")
- ¿Toda acción irreversible tiene camino de vuelta escrito? Si no lo tiene, necesita doble
  seguro.
- ¿Las automatizaciones nuevas arrancaron en modo de ensayo? ¿Viste el registro de "habría hecho"
  antes de habilitarlas?
- ¿Qué pasa si el agente embebido intenta algo fuera de sus permisos? Pedile que lo intente y te
  muestre el rechazo en el log.

## 5. Señales de alarma

- Una automatización pasó de "no existe" a "corre sola" sin un período de modo de ensayo.
- El log no tiene ninguna entrada de "acción no ejecutada por duda". O el sistema nunca duda
  (imposible) o cuando duda sigue adelante.
- Un candado se puede saltear con un parámetro "para pruebas". Ese parámetro va a quedar puesto en
  producción.
