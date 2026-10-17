# Peldaño 3 — Dimensionar antes de diseñar la arquitectura (contrato del peldaño)

**Tramo:** arranque (una vez; se vuelve a hacer si el negocio cambia de escala).
**Forma:** conversación (el agente calcula y presenta opciones; el dueño elige).

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
de seguro.

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

> Antes de proponer arquitectura vamos a dimensionar. Leé `PROJECT.md` y el relevamiento de
> volumetría en `docs/RELEVAMIENTO_VOLUMETRIA.md`. Distinguí **datos primarios** (los que solo el
> negocio sabe) de **datos derivados** (los que se calculan a partir de los primarios). **Evaluá si
> los primarios están completos para calcular lo que sigue; si falta alguno, o si alguno está
> marcado como supuesto, pedime todos los que falten antes de seguir. No estimes un dato primario.**
> Si hay un sistema anterior consultable, usá sus números reales y decí de dónde salieron. Con los
> primarios completos, calculá con la cuenta a la vista: filas por año de las tres tablas más
> grandes, concurrencia en el pico, tamaño del dato a cinco años, y qué pasa si todo se multiplica
> por diez. Después presentame tres opciones de persistencia y concurrencia, cada una con el costo
> de migrar a las otras más adelante. No elijas vos: yo elijo. No escribas código.

**De cierre:**

> Elijo la opción [B]. Dejá registrado en `docs/SIZING.md`: los datos primarios con su fuente, los
> derivados con su cuenta, las tres opciones, la elegida y por qué, y las decisiones que tomamos
> "por si acaso" aunque hoy no hagan falta (por ejemplo: la interfaz de persistencia es asincrónica
> desde la línea uno, aunque el primer motor sea sincrónico).

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
