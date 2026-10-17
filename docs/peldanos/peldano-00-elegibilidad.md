# Peldaño 0 — ¿Este proyecto se puede encarar así? (contrato del peldaño)

**Tramo:** arranque (una vez por proyecto, antes de abrir el repositorio).
**Forma:** conversación (el agente evalúa y pregunta; el dueño decide).
**Tamaño:** obligatorio en todo proyecto, por chico que sea. Lleva una hora; ahorra meses.
**Estado:** en elaboración con Pablo. Los criterios excluyentes X1 y X2 están confirmados; los
criterios que ponderan (D1 a D10) son hipótesis sin peso todavía.

## Para qué sirve

Para no meterse en un proyecto donde el método no puede funcionar. Si el agente no va a poder
verificarse solo de punta a punta, o si no hay un dueño del dominio que decida, el método se
degrada a "programar con IA" y el humano termina leyendo código. Este peldaño es la puerta de
entrada: se cruza una vez, y si no se cruza, mejor saberlo antes que después.

Hay una idea de fondo que conviene decir explícita: **el método no sirve para cualquier proyecto,
y eso no es un defecto**. Un método que promete servir para todo no está diciendo nada. Lo que
este peldaño hace es poner la frontera por escrito, para que la decisión de entrar o no entrar
sea una decisión y no una esperanza.

## 1. Contexto requerido

Nombrado en forma genérica; el agente evalúa si alcanza y pide lo que falte.

- Relevamiento del pedido: qué quiere el cliente, para quién, y qué pasa hoy sin el sistema.
- Relevamiento tecnológico: qué tecnología hay o se propone, si existe un sistema anterior, si
  ese sistema tiene repositorio y cómo está manejado.
- Relevamiento de testeabilidad: si las pantallas se pueden ejecutar por programa y si cada
  elemento de la interfaz es accesible con sus distintos métodos (clic, tipeo, lectura de
  estado), de modo que un test recorra la pantalla y verifique el efecto en el backend.
- Quién es el dueño del dominio y cuánto tiempo tiene para decidir.
- Qué consecuencia tiene un error (plata, salud, operación, nada).
- Entornos y accesos: si va a haber un entorno de prueba, si el agente puede acceder, si hay
  producción consultable en solo lectura.

## 2. Prompts

Los prompts van en inglés, que es el idioma en el que los modelos siguen instrucciones con más
precisión y menos tokens. Debajo de cada uno, la explicación en castellano de qué le estamos
pidiendo y por qué cada cláusula está ahí.

**Inicial:**

> We are going to assess whether this project can be run with the Urazuke method. Read the
> initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`. First, evaluate whether the survey is sufficient to answer
> every criterion. If any criterion cannot be answered from the survey, ask me for the missing
> information before going on; do not assume. Then fill in the sheet criterion by criterion:
> the answer, where it comes from, and for each exclusionary criterion whether it is green or
> red. Do not decide: present me the completed sheet with your reading and your doubts, and I
> will decide. Reply in my language.

Qué le estamos pidiendo: que lea los dos insumos (el relevamiento y la ficha de criterios); que
**antes de responder evalúe si el relevamiento alcanza** y, si no alcanza, pregunte en vez de
suponer (esta es la cláusula central de todos los prompts del método); que complete la ficha
con la fuente de cada respuesta, para que después se pueda rastrear; que marque los excluyentes
en verde o rojo; y que **no decida**, porque la elegibilidad la decide el dueño. La última línea
le pide que conteste en el idioma del dueño, porque el prompt está en inglés pero la conversación
no tiene por qué estarlo.

**De cierre:**

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.

Qué le estamos pidiendo: que deje la decisión escrita con fecha y dueño (peldaño 6), con las
condiciones si las hay, y con el rastro de preguntas y respuestas, que es la evidencia de que no
supuso nada.

## 3. Resultado esperado

Un archivo `docs/ELIGIBILITY.md` (o el nombre que use el proyecto), de una página, con:

- Fecha y quién decidió.
- Los dos criterios excluyentes con su respuesta y su fuente:
  - X1: hay repositorio accesible y manejado de forma estándar (o el proyecto es nuevo).
  - X2: la interfaz se puede ejecutar por programa y cada elemento es accesible con sus
    distintos métodos, con verificación del efecto en el backend.
- Los criterios que ponderan (los D1 a D10 de la escalera, cuando estén cerrados), cada uno
  con respuesta, fuente y peso.
- La decisión: va, no va, o va con condiciones, y las condiciones escritas.
- Las preguntas que el agente hizo y las respuestas, para que quede el rastro.

## 4. Verificación de completitud (la hace el dueño, sin leer código)

- ¿Los dos excluyentes tienen respuesta explícita y fuente? Si alguno está en rojo, ¿la
  decisión es "no va" o tiene una condición que lo resuelve?
- ¿Hay algún criterio respondido con "supongo que sí" o "probablemente"? Si lo hay, el
  peldaño no está subido: el agente tenía que preguntar.
- ¿La decisión está escrita con fecha y con nombre?
- ¿Las condiciones (si las hay) son verificables? ("Tener acceso de lectura a producción
  antes del peldaño 3" sí; "que el cliente colabore" no.)

## 5. Señales de alarma

- El agente completó la ficha entera sin hacer una sola pregunta. O el relevamiento era perfecto
  (nunca lo es) o supuso.
- La decisión es "va con condiciones" y las condiciones son más de tres. Probablemente es un
  "no va" que no se quiere decir.
- El criterio X2 se respondió "sí, con un poco de trabajo". Si las pantallas no se pueden operar
  por programa hoy, ese "poco de trabajo" es el proyecto entero.
