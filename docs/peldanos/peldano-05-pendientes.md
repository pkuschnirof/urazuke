# Peldaño 5 — El plan son los pendientes (contrato del peldaño)

**Tramo:** bucle (se usa en cada cambio, durante todo el proyecto).
**Forma:** un solo tiro al crearlo; después, rutina de cada sesión.

## Para qué sirve

Para que haya una sola cola de trabajo, con orden y con compuerta, que sea la verdad del
proyecto. No hay "plan" por un lado y "tareas" por el otro: la lista de pendientes ES el plan.
Evita la especificación que se supera a las dos semanas y queda obsoleta, y el trabajo del que
nadie sabe por qué se hizo.

## 1. Contexto requerido

- La especificación o el pedido inicial del cliente, por incompleto que sea.
- Las auditorías, si ya hubo.
- `PROJECT.md` y `docs/ESTADO.md`.

## 2. Prompts

**Para crear el registro:**

> Vamos a convertir todo lo que hay que hacer en pendientes numerados. Leé `PROJECT.md`, el
> pedido del cliente y lo que haya en `docs/ESTADO.md`. **Si el pedido es ambiguo en algún
> punto como para no poder escribir un pendiente verificable, preguntame; no lo resuelvas
> suponiendo.** Creá `docs/PENDIENTES.md` con un pendiente por ítem: número (PND-001 en
> adelante), título en una línea, qué se pide, qué decisión lo origina (o "pedido del cliente,
> fecha"), cómo se verifica que está hecho, y estado. Ordenalos por la prioridad que yo te dé;
> si no te la di, proponé un orden y decime por qué.

**Rutina de cada sesión (va en el contrato o en `PROJECT.md`):**

> Antes de tocar código, abrí `docs/PENDIENTES.md`, decime cuál vas a tomar y por qué. Cada
> commit cita su pendiente. Un pendiente se cierra con la evidencia escrita (el test, la
> captura, el número), no con "listo". Si en el camino ves algo que no está en la lista, lo
> agregás como pendiente nuevo; no lo hacés.

## 3. Resultado esperado

`docs/PENDIENTES.md` (o la herramienta que use el proyecto) con, por pendiente:

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
