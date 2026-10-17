# Peldaño 3 — Dimensionar antes de diseñar la arquitectura (contrato del peldaño)

**Tramo:** arranque (una vez; se vuelve a hacer si el negocio cambia de escala).
**Forma:** conversación (el agente calcula y presenta opciones; el dueño elige).
**Tamaño:** obligatorio siempre, pero proporcional: en un proyecto chico el dimensionamiento
puede ser media página y una sola decisión ("cabe en SQLite durante años"). Lo que no puede es
no hacerse, porque la pregunta "¿cuánto va a crecer?" cuesta cinco minutos y la respuesta
equivocada cuesta semanas.

## Para qué sirve

Para que las decisiones estructurales —qué motor de base de datos, si la interfaz es sincrónica o
asincrónica, cuánta concurrencia— se tomen con números y no con gusto. Es el peldaño que más caro
cuesta saltearse: en Kikan se arrancó con archivos JSON y cuando se midió resultó que el sistema
generaba 3,4 millones de filas por año; cambiar la interfaz después costó una etapa entera de
reingeniería.

Un punto clave, que surgió al elaborar este contrato: **hay datos que solo el negocio tiene** (cuántas
entidades, cuántos eventos por entidad, cuántos operadores en el pico, cuánto hay que conservar) y
el modelo no los puede inferir. Lo que sí puede inferir es lo derivado. Por eso el prompt le exige
evaluar si los datos primarios están completos y pedir los que falten, en vez de estimarlos con cara
de seguro. El que sabe qué le falta para calcular es el modelo, no un formulario.

Y una segunda idea que vale la pena nombrar: las **decisiones asimétricas**. Hay decisiones que
cuestan muy poco si las tomás y resultan innecesarias, y muchísimo si no las tomás y resultan
necesarias. La interfaz de persistencia asincrónica desde la línea uno es el ejemplo canónico: si el
motor termina siendo sincrónico, sobró un `await`; si termina siendo asincrónico y no lo previste,
hay que reescribir todo. Esas decisiones se toman siempre que sean baratas, aunque hoy no hagan falta.

## 1. Contexto requerido

- **Relevamiento de datos de volumetría** del negocio, nombrado así en forma genérica: entidades
  principales y su crecimiento, eventos por entidad, operadores simultáneos y horario del pico,
  tiempo de conservación de los datos, cargas excepcionales (campañas, cierres), crecimiento
  esperado. El relevamiento es por naturaleza incompleto; el agente evalúa y pide.
- Si hay un sistema anterior: acceso de lectura a su base para sacar números reales en vez de
  estimados.
- `PROJECT.md` (peldaño 2).

## 2. Prompts

**Inicial:**

> Before proposing any architecture we are going to size the system. Read `PROJECT.md` and the
> volume survey in `docs/VOLUME_SURVEY.md`. Distinguish primary data (facts only the business
> knows) from derived data (what can be computed from the primary data). Evaluate whether the
> primary data is complete enough to compute what follows; if any primary figure is missing, or
> is marked as an assumption, ask me for all the missing figures before going on. Never estimate
> a primary figure. If a previous system can be queried, use its real numbers and state where
> each came from. With the primary data complete, compute, showing the arithmetic: rows per year
> for the three largest tables, peak concurrency, data size at five years, and what breaks first
> if everything is multiplied by ten. Then present three options for persistence and concurrency,
> each with the cost of migrating to the others later. Do not choose: I choose. Do not write code.
> Reply in my language.

Qué le estamos pidiendo, cláusula por cláusula: distinguir primarios de derivados (es la
distinción que evita el invento); **pedir los primarios que falten y no estimarlos nunca**; usar
números reales del sistema anterior cuando exista, con su fuente; calcular lo derivado con la
cuenta a la vista, para que el dueño pueda rehacerla; el escenario "por diez", que es lo que
revela qué se rompe primero; tres opciones con el costo de migrar entre ellas, porque la decisión
no es solo "cuál" sino "cuánto cuesta equivocarse"; y que no elija ni escriba código, porque este
peldaño es de decisión, no de construcción.

**De cierre:**

> I choose option [B]. Record in `docs/SIZING.md`: the primary data with its source, the derived
> data with its arithmetic, the three options, the chosen one and why, and the decisions we are
> taking "just in case" even though they are not needed today (for example: the persistence
> interface is asynchronous from line one, even if the first engine is synchronous). Include the
> questions you asked and my answers.

Qué le estamos pidiendo: el registro completo, con fuentes y cuentas; la elegida y la razón; y
las decisiones asimétricas escritas, porque si quedan implícitas no se respetan.

## 3. Resultado esperado

Un archivo `docs/SIZING.md` con:

- Fecha y quién decidió.
- Tabla de datos primarios: valor, fuente (informado por el negocio / medido en el sistema anterior),
  fecha. Ninguno con fuente "supuesto".
- Tabla de datos derivados: valor, de qué primarios sale, la cuenta.
- El escenario "por diez": qué se rompe primero.
- Las tres opciones numeradas, con el costo de migrar entre ellas.
- La elegida y la razón, en una o dos frases.
- Las decisiones asimétricas (baratas si estás equivocado, carísimas si no las tomás), listadas.
- Las preguntas que el agente hizo y las respuestas.

## 4. Verificación de completitud

- ¿Hay algún dato primario con fuente "supuesto" o sin fuente? Si lo hay, el peldaño no está subido:
  el agente tenía que pedirlo.
- ¿Cada dato derivado muestra de qué primarios sale y con qué cuenta? ¿Podés rehacer una cuenta a
  mano y te da?
- ¿Hay tres opciones y una elegida con razón escrita?
- ¿Dice qué pasa si la volumetría se multiplica por diez?
- ¿Las decisiones asimétricas están escritas, o quedaron implícitas?
- ¿El agente preguntó? Si presentó números sin haber hecho una sola pregunta, desconfiá.

## 5. Señales de alarma

- Los tres escenarios de opciones llevan a la misma conclusión. El agente ya había elegido y
  armó las otras dos para cumplir.
- Un número derivado tiene más precisión que los primarios de los que sale ("1.234.567 filas"
  a partir de "unas 5.000 familias"). La precisión es falsa.
- El escenario "por diez" dice "no pasa nada". Siempre pasa algo; si no lo encontró, no lo buscó.
