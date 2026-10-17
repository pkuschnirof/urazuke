# Peldaño 2 — La definición del proyecto y la lectura obligatoria (contrato del peldaño)

**Tramo:** arranque (una vez; se mantiene al día durante todo el proyecto).
**Forma:** conversación (el agente redacta, pregunta lo que falta, el dueño corrige).

## Para qué sirve

Cada sesión del agente arranca de cero: no se acuerda de ayer. Entonces necesita un mapa, corto,
que le diga qué es el proyecto, en qué estado está y qué decisiones ya se tomaron. Y necesita la
obligación de leerlo antes de tocar nada. El fallo que evita es doble: trabajo descartable por
no leer el mapa, y el mapa que crece hasta volverse ilegible (el `CLAUDE.md` de 9.661 líneas).

## 1. Contexto requerido

- Relevamiento del negocio: qué hace el cliente, quiénes usan el sistema, qué problema
  resuelve, qué no tiene que hacer.
- El contrato de convivencia (peldaño 1).
- Si existe un sistema anterior: acceso de lectura a su código o a su documentación.
- Las decisiones ya tomadas, si las hay, aunque sea de palabra.

## 2. Prompts

**Inicial:**

> Vamos a definir el proyecto por escrito. Leé el relevamiento en `docs/RELEVAMIENTO_INICIAL.md`
> y el contrato en `docs/CONTRATO.md`. **Evaluá si el relevamiento alcanza para describir el
> sistema, sus usuarios y sus límites; si no alcanza, pedime lo que falte antes de redactar.**
> Después escribí `PROJECT.md` con, como máximo, trescientas líneas: qué es el sistema y para
> quién; qué NO es; los módulos principales en una lista; las decisiones ya tomadas con fecha;
> y la instrucción de leer este archivo y el contrato al empezar cada sesión. Separado, creá
> `docs/ESTADO.md` para el estado vivo (en qué se está trabajando, qué quedó abierto): ese
> archivo cambia todos los días; `PROJECT.md` casi nunca.

**De cierre:**

> Corregí [esto]. Dejá `PROJECT.md` en su versión final con fecha, y anotá en el contrato que
> el historial de cambios NO va en `PROJECT.md`: va en `docs/ESTADO.md` o en el registro de
> pendientes.

## 3. Resultado esperado

- `PROJECT.md` (o `CLAUDE.md`): corto, de lectura obligatoria, con qué es, para quién, qué no
  es, módulos, decisiones con fecha, y la orden de leerlo. Máximo trescientas líneas.
- `docs/ESTADO.md`: estado vivo, separado del anterior.
- En ambos, una fecha de última actualización.

## 4. Verificación de completitud

- ¿`PROJECT.md` cabe en una lectura de cinco minutos? Si no, está mal: es el programa, no el
  historial.
- ¿Dice explícitamente qué NO hace el sistema? (Lo que falta es lo que el agente va a inventar.)
- ¿Cada decisión tiene fecha y quién la tomó?
- ¿El agente preguntó algo sobre el negocio antes de redactar? Si no preguntó nada, revisá
  qué supuso.
- ¿El estado vivo está en otro archivo?
