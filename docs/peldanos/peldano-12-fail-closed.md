# Peldaño 12 — Fail-closed, candados y cero daño silencioso (contrato del peldaño)

**Tramo:** operación (se diseña antes de que el sistema actúe sobre el mundo; se revisa con cada
acción nueva con consecuencia).
**Forma:** conversación: el agente lista las acciones con consecuencia, el dueño confirma cuáles
llevan candado y de qué tipo.
**Tamaño:** obligatorio en cuanto el sistema hace algo irreversible (cobrar, enviar, borrar,
aprobar). Un sistema de solo lectura puede saltearlo; en el momento en que gana su primer botón
que actúa sobre el mundo, este peldaño se vuelve el más importante.

## Para qué sirve

Para que el sistema, ante duda o falla, NO actúe, y avise. Suena obvio y es lo contrario de lo
que hace el software por defecto, que ante la duda sigue adelante. Evita el doble cobro, la
aprobación automática sin que pase por un humano, el `git add -A` que sube una credencial, y
borrar datos del cliente.

El principio tiene nombre, "fail-closed", y viene de la seguridad física: una puerta de
seguridad que se queda cerrada cuando se corta la luz. Lo contrario, "fail-open", es la puerta
que se abre. En software la mayoría de las cosas son fail-open por defecto: si la validación
falla, el código sigue; si el servicio no responde, se asume que todo está bien. El método
invierte el defecto: **ante la duda, no**. Y aplica tanto al sistema como al agente que lo opera.

## 1. Contexto requerido

- **Relevamiento de acciones con consecuencia**, nombrado así en forma genérica: qué hace el
  sistema que cobra, envía, aprueba, borra, o le avisa a alguien de afuera; qué pasa si se hace
  dos veces; qué pasa si se hace mal; cómo se deshace. Lo sabe el negocio; el agente evalúa si
  la lista está completa y pregunta.
- Qué acciones puede hacer el agente mismo sobre el sistema (si está embebido).

## 2. Prompts

**Inicial:**

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock. Reply in my language.

Qué le estamos pidiendo: la comparación entre lo que el negocio dijo y lo que el código hace
(ahí aparecen las acciones que nadie recordaba); la cláusula de completitud en su forma para
este peldaño: las diferencias entre las dos listas se preguntan, no se resuelven; para cada
acción, reversibilidad, candado y camino de vuelta; y la regla general del fail-closed escrita
en el prompt, para que quede en la tabla y en el código.

**De cierre:**

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.

Qué le estamos pidiendo: el test por candado **probado en rojo** (sin el candado, la acción
ocurría; con el candado, no), que es el peldaño 7 aplicado a la seguridad; la tabla final; y la
regla del modo de ensayo para toda automatización nueva, que es lo que permite ver qué habría
hecho antes de dejarla hacer.

## 3. Resultado esperado

- `docs/LOCKS.md`: una fila por acción con consecuencia: qué hace, si es reversible, el
  candado, el camino de vuelta, quién lo aprobó y cuándo.
- Un test por candado, probado en rojo, que verifica que ante la duda la acción no ocurre.
- Las automatizaciones nuevas arrancando en modo de ensayo, con el registro de "habría hecho".
- Si el agente está embebido: sus permisos escritos (qué puede leer, qué puede cambiar, qué
  necesita aprobación).

## 4. Verificación de completitud

- ¿Cada acción que cobra, envía, aprueba o borra está en la tabla? Pensá en una que no esté y
  preguntá.
- ¿Cada candado tiene su test en rojo? ("Sin el candado, la acción ocurría; con el candado,
  no.")
- ¿Toda acción irreversible tiene camino de vuelta escrito? Si no lo tiene, necesita doble
  seguro.
- ¿Las automatizaciones nuevas arrancaron en modo de ensayo? ¿Viste el registro de "habría
  hecho" antes de habilitarlas?
- ¿Qué pasa si el agente embebido intenta algo fuera de sus permisos? Pedile que lo pruebe y
  que te muestre el rechazo en el log.

## 5. Señales de alarma

- Una automatización pasó de "no existe" a "corre sola" sin un período de modo de ensayo.
- El log no tiene ninguna entrada de "acción no ejecutada por duda". O el sistema nunca duda
  (imposible) o cuando duda sigue adelante.
- Un candado se puede saltear con un parámetro "para pruebas". Ese parámetro va a quedar
  puesto en producción.
