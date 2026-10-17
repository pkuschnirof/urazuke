# Peldaño 5 — El plan son los pendientes (contrato del peldaño)

**Tramo:** bucle (se usa en cada cambio, durante todo el proyecto).
**Forma:** un solo tiro al crearlo; después, rutina de cada sesión.
**Tamaño:** obligatorio en todo proyecto. Es el peldaño que hace que todos los demás se puedan
seguir: sin pendientes numerados no hay dónde colgar la evidencia.

## Para qué sirve

Para que haya una sola cola de trabajo, con orden y con compuerta, que sea la verdad del
proyecto. No hay "plan" por un lado y "tareas" por el otro: la lista de pendientes ES el plan.
Evita la especificación que se supera a las dos semanas y queda obsoleta, y el trabajo del que
nadie sabe por qué se hizo.

Un pendiente bien escrito tiene tres cosas que un ítem de una lista de tareas no suele tener: de
dónde viene (la decisión o el pedido que lo originó), cómo se verifica que está hecho, y la
evidencia con que se cerró. Lo primero evita que el trabajo pierda su razón; lo segundo evita que
se cierre con "listo"; lo tercero es lo que el dueño mira en vez de mirar el código.

## 1. Contexto requerido

- La especificación o el pedido inicial del cliente, por incompleto que sea.
- Las auditorías, si ya hubo.
- `PROJECT.md` y `docs/STATUS.md`.

## 2. Prompts

**Para crear el registro:**

> We are going to turn everything that must be done into numbered pending items. Read
> `PROJECT.md`, the client's request and whatever is in `docs/STATUS.md`. If the request is
> ambiguous on any point such that you cannot write a verifiable pending item for it, ask me;
> do not resolve it by assuming. Create `docs/PENDING.md` with one item per thing to do: number
> (PND-001 onwards), one-line title, what is requested, which decision originates it (or
> "client request, date"), how it will be verified as done, and status. Order them by the
> priority I gave you; if I gave none, propose an order and tell me why. Reply in my language.

Qué le estamos pidiendo: que convierta el pedido en ítems verificables y que **pregunte cuando
el pedido no da para escribir uno verificable** (la ambigüedad se resuelve preguntando, no
eligiendo); los campos de cada pendiente, en particular "cómo se verifica", que es lo que
después permite cerrarlo con evidencia; y un orden propuesto con su razón, para que el dueño lo
confirme o lo cambie.

**Rutina de cada sesión (va en el contrato de convivencia o en `PROJECT.md`):**

> Before touching any code, open `docs/PENDING.md`, tell me which item you are taking and why.
> Every commit cites its pending item. A pending item is closed with written evidence (the test,
> the screenshot, the number), never with "done". If along the way you see something that is not
> on the list, add it as a new pending item; do not do it.

Qué le estamos pidiendo: la disciplina de cada sesión: anunciar qué se toma, citar el pendiente
en cada commit, cerrar con evidencia, y **anotar en vez de hacer** lo que aparezca fuera de la
lista. Esa última cláusula es la que protege el alcance exacto cuando el modelo "ve algo más".

## 3. Resultado esperado

`docs/PENDING.md` (o la herramienta que use el proyecto) con, por pendiente:

- Número, título, estado (abierto / en curso / cerrado), fecha de apertura y de cierre.
- Qué se pide, en dos o tres frases.
- Origen: la decisión o el pedido, con fecha.
- Cómo se verifica que está hecho: el test, la pantalla, el número.
- Al cerrarse: la evidencia y el commit.

Y la rutina en el contrato o en `PROJECT.md`.

## 4. Verificación de completitud

- ¿Cada pendiente dice cómo se verifica? Un pendiente sin verificación no se puede cerrar.
- ¿Hay pendientes "cerrados" sin evidencia ni commit? Si los hay, reabrilos.
- Tomá tres commits al azar: ¿citan su pendiente?
- ¿Apareció en el código algo que no tiene pendiente? Ahí el agente se salió del alcance.
- ¿El agente te preguntó por los puntos ambiguos del pedido, o los resolvió solo?

## 5. Señales de alarma

- Un pendiente lleva más de tres sesiones "en curso". O es tres pendientes, o está trabado por
  una decisión que nadie tomó (peldaño 6).
- Hay más pendientes cerrados en un día que commits ese día. Se están cerrando sin evidencia.
- La lista tiene más de cincuenta pendientes abiertos. No es un plan, es un inventario de
  ansiedades: hay que priorizar y archivar.
