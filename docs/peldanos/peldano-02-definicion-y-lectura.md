# Peldaño 2 — La definición del proyecto y la lectura obligatoria (contrato del peldaño)

**Tramo:** arranque (una vez; se mantiene al día durante todo el proyecto).
**Forma:** conversación (el agente redacta, pregunta lo que falta, el dueño corrige).
**Tamaño:** obligatorio en todo proyecto. En uno chico, el archivo de proyecto puede tener
cincuenta líneas; lo que no puede es no existir.

## Para qué sirve

Cada sesión del agente arranca de cero: no se acuerda de ayer. Entonces necesita un mapa, corto,
que le diga qué es el proyecto, en qué estado está y qué decisiones ya se tomaron. Y necesita la
obligación de leerlo antes de tocar nada. El fallo que evita es doble: trabajo descartable por
no leer el mapa, y el mapa que crece hasta volverse ilegible (en uno de los sistemas de origen el
archivo de proyecto llegó a 9.661 líneas, y en ese estado no lo lee nadie, ni el modelo).

La regla práctica que sale de ese golpe: **el archivo de proyecto es el programa, no el
historial**. Lo que pasó va a otro lado (el registro de pendientes, el estado vivo, el diario);
el archivo de proyecto dice qué es el sistema, para quién, qué no es, y qué se decidió.

## 1. Contexto requerido

- Relevamiento del negocio: qué hace el cliente, quiénes usan el sistema, qué problema
  resuelve, qué no tiene que hacer.
- El contrato de convivencia (peldaño 1).
- Si existe un sistema anterior: acceso de lectura a su código o a su documentación.
- Las decisiones ya tomadas, si las hay, aunque sea de palabra.

## 2. Prompts

**Inicial:**

> We are going to define the project in writing. Read the business survey in
> `docs/INITIAL_SURVEY.md` and the working agreement in `docs/WORKING_AGREEMENT.md`. Evaluate
> whether the survey is sufficient to describe the system, its users and its boundaries; if it
> is not, ask me for what is missing before writing anything. Then write `PROJECT.md`, three
> hundred lines at most, with: what the system is and for whom; what it is NOT; the main
> modules as a list; the decisions already made, each with its date; and the instruction to
> read this file and the working agreement at the start of every session. Separately, create
> `docs/STATUS.md` for the living state (what is being worked on, what is open): that file
> changes every day; `PROJECT.md` almost never does. Reply in my language.

Qué le estamos pidiendo: que evalúe el relevamiento y pregunte antes de redactar; que el archivo
de proyecto sea **corto** (el tope de trescientas líneas es arbitrario pero necesario: sin tope,
crece); que diga explícitamente qué **no** es el sistema, porque lo que no está dicho es lo que
el modelo va a inventar; que las decisiones tengan fecha; y que separe el estado vivo en otro
archivo, para que el archivo de proyecto no se convierta en historial.

**De cierre:**

> Apply these corrections: [list]. Finalize `PROJECT.md` with today's date. Add to the working
> agreement that the change history never goes into `PROJECT.md`: it goes to `docs/STATUS.md`
> or to the pending-items register.

Qué le estamos pidiendo: las correcciones del dueño, la fecha, y una regla nueva en el contrato
que proteja al archivo de proyecto de volverse changelog. Esa regla es la que faltó en el caso de
las 9.661 líneas.

## 3. Resultado esperado

- `PROJECT.md` (o `CLAUDE.md`): corto, de lectura obligatoria, con qué es, para quién, qué no
  es, módulos, decisiones con fecha, y la orden de leerlo. Máximo trescientas líneas.
- `docs/STATUS.md`: estado vivo, separado del anterior.
- En ambos, una fecha de última actualización.
- En el contrato, la regla de que el historial no va en `PROJECT.md`.

## 4. Verificación de completitud

- ¿`PROJECT.md` cabe en una lectura de cinco minutos? Si no, está mal: es el programa, no el
  historial.
- ¿Dice explícitamente qué NO hace el sistema? (Lo que falta es lo que el agente va a inventar.)
- ¿Cada decisión tiene fecha y quién la tomó?
- ¿El agente preguntó algo sobre el negocio antes de redactar? Si no preguntó nada, revisá
  qué supuso.
- ¿El estado vivo está en otro archivo?

## 5. Señales de alarma

- El archivo de proyecto creció más de un 20 % en un mes. Algo que no es programa está entrando.
- El agente empieza una sesión proponiendo algo que ya se decidió y está escrito. No leyó el
  mapa: el enganche de lectura obligatoria falló.
- La sección "qué no es" está vacía o dice "nada en particular". Todo sistema tiene límites;
  si no están escritos, el modelo los va a cruzar.
