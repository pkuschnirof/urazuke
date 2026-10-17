# Peldaño 9 — Medir antes de construir, con un instrumento que también se verifica (contrato del peldaño)

**Tramo:** bucle (cada vez que un número alimenta una decisión).
**Forma:** un solo tiro por medición; a veces una conversación cuando la hipótesis es del dueño.
**Tamaño:** proporcional. En un proyecto chico, "medir" puede ser contar con un comando y
anotar el número con su fecha; el trinquete y el presupuesto de consultas son para sistemas con
volumen. Lo que no cambia con el tamaño: ningún número que decide algo sale de una impresión.

## Para qué sirve

Para que todo número que alimenta una decisión salga de un programa con test, y no de una
búsqueda de texto, de una impresión, ni de "me parece que son como cien". Y para que el
instrumento mismo se audite, porque los medidores mienten: en Kikan uno no veía 84 llamadas con
el contador en cero, y otro decía 27 cuando eran 44. Las cinco reglas son: medidor con guarda;
si el instrumento no existe se construye; se audita en dos direcciones; lo aproximado se marca;
y el que ejecuta verifica los números del que planificó.

Hay una razón de fondo para que este peldaño exista: el modelo es muy bueno produciendo
afirmaciones con número ("hay unos 120 bucles de este tipo") y esas afirmaciones suenan
exactamente igual cuando son medidas que cuando son estimadas. El dueño no tiene forma de
distinguirlas por el tono. La única forma es exigir el instrumento: "¿con qué lo mediste? mostrame
el comando". Si no hay comando, es una impresión, por más decimales que tenga.

## 1. Contexto requerido

- La hipótesis, del dueño o del agente: "creo que el problema es X", "deben ser unos cien".
- Acceso a lo que se quiere medir: el código, la base en solo lectura, el log.
- Los medidores que ya existen en el repositorio, si hay.

## 2. Prompts

**Inicial:**

> Before building anything, we are going to measure. The hypothesis is: [X]. Write a meter (a
> script that lives in the repository) that measures [the quantity], and a test for the meter
> that checks it against a known case where the answer is known in advance. If measuring
> requires access or data you lack, ask me; do not approximate silently. If some part can only
> be approximated, mark it as approximate and tell me the margin. Run the meter, show me the
> number together with the command that produces it, and audit it in both directions: from the
> code to the measurement (is everything that should be counted, counted?) and from the
> measurement to the code (does everything counted actually exist?). Only then propose what to
> build. Reply in my language.

Qué le estamos pidiendo, cláusula por cláusula: el medidor **en el repositorio** (no un comando
suelto que se pierde); el **test del medidor** contra un caso conocido (la guarda); la cláusula
de completitud en su forma para medir (pedir el acceso, no aproximar en silencio); marcar lo
aproximado con su margen; el número **con el comando** que lo produce, para que el dueño lo pueda
correr; la auditoría en dos direcciones, que es lo que destapó los dos medidores que mentían; y
el orden: primero medir, después proponer.

**Cuando hay un presupuesto:**

> Set the budget for [queries / loops / time] on this path at the measured value plus a small
> margin, and protect it with a test that fails if it is exceeded. Tell me the number and the
> margin.

Qué le estamos pidiendo: que el presupuesto sea lo medido más poco, no un número redondo, y que
tenga un test que falle si se supera. Así una regresión de rendimiento aparece en la batería y
no en producción.

**Cuando el que planificó dio números (regla cinco):**

> Before executing the plan, verify every number the plan asserts with the meter. If any does
> not match, stop and tell me; do not execute on a wrong number.

Qué le estamos pidiendo: que el que ejecuta no confíe en los números del que planificó, aunque
sea el mismo modelo en otra sesión. En Kikan, tres de cuatro aseveraciones del plan estaban
mal; donde había instrumento, el número era exacto.

## 3. Resultado esperado

- El medidor en el repositorio (`tools/measure_*.py`, `scripts/meter-*.mjs` o similar), con
  su test.
- El número, con el comando que lo produce y la fecha.
- La auditoría en dos direcciones, escrita en dos o tres líneas.
- Lo aproximado marcado como tal, con su margen.
- Si hay presupuesto: el valor, el margen, y el test que lo protege.
- En el commit: "measured: [number] with [meter]".

## 4. Verificación de completitud

- ¿Podés correr vos el comando del medidor y te da el mismo número? (Lo corrés vos; no hace
  falta entenderlo, solo ejecutarlo.)
- ¿El medidor tiene test? ¿Contra qué caso conocido?
- ¿Hay algún número en el reporte sin medidor atrás? Preguntá de dónde salió.
- ¿Lo aproximado está marcado?
- Si el plan traía números, ¿el agente los verificó antes de ejecutar y te dijo cuáles no
  daban?

## 5. Señales de alarma

- Un número cambió entre dos reportes sin que cambiara el código. Uno de los dos no se midió.
- El medidor da cero. Casi nunca es cero; casi siempre es que el medidor no ve algo (en Kikan,
  dos veces).
- El agente propone construir "mientras mide", para ganar tiempo. El orden es el método: primero
  el número, después el plan.
