# Peldaño 0 — ¿Este proyecto se puede encarar así? (contrato del peldaño)

**Tramo:** arranque.
**Cuándo:** una sola vez, antes de abrir el repositorio y antes de cualquier otra cosa.
**Forma:** conversación: el agente evalúa y pregunta; vos decidís.
**Tamaño:** obligatorio en todo proyecto, por chico que sea.
**Estado:** los criterios excluyentes X1 y X2 están cerrados; los criterios que ponderan (D1 a D10)
todavía los estoy calibrando y los marco como hipótesis.

## Para qué sirve

No te metas en un proyecto donde el método no puede funcionar. Si el agente no va a poder
verificarse solo de punta a punta, o si no hay un dueño del dominio que decida, el método se
degrada a "programar con IA" y vos terminás leyendo código. Este peldaño es la puerta de entrada:
se cruza una vez, y si no se cruza, mejor saberlo antes que después.

Y una idea de fondo que quiero que tengas clara: **el método no sirve para cualquier proyecto, y
eso no es un defecto**. Un método que promete servir para todo no está diciendo nada. Lo que este
peldaño hace es poner la frontera por escrito, para que la decisión de entrar o no entrar sea una
decisión y no una esperanza. Los dos criterios excluyentes salen de proyectos que rechacé, no de
los que acepté [Ref. 46](../REFERENCIAS.md#ref-46).

## 1. Contexto requerido

Lo que sigue es la lista genérica. Los archivos concretos que tenés que tener hechos antes de cada
prompt, con su contenido y su estado mínimo, están en la sección 2, en el bloque "Antes de enviar
el prompt" que precede a cada uno.

Nombrado en forma genérica; el agente evalúa si alcanza y pide lo que falte.

- Relevamiento del pedido: qué quiere el cliente, para quién, y qué pasa hoy sin el sistema.
- Relevamiento tecnológico: qué tecnología hay o se propone, si existe un sistema anterior, si ese
  sistema tiene repositorio y cómo está manejado.
- Relevamiento de testeabilidad: si las pantallas se pueden ejecutar por programa y si cada
  elemento de la interfaz es accesible con sus distintos métodos (clic, tipeo, lectura de estado),
  de modo que un test recorra la pantalla y verifique el efecto en el backend.
- Quién es el dueño del dominio y cuánto tiempo tiene para decidir.
- Qué consecuencia tiene un error (plata, salud, operación, nada).
- Entornos y accesos: si va a haber un entorno de prueba, si el agente puede acceder, si hay
  producción consultable en solo lectura.

## 2. Prompts

Los prompts van en inglés, que es el idioma en el que los modelos siguen instrucciones con más
precisión y menos tokens. Cada uno trae su traducción (en el HTML, con un botón), y debajo la
explicación de qué le estoy pidiendo y por qué cada cláusula está ahí. Al modelo se le pega el
inglés.

**Inicial:**

**Antes de enviar el prompt**, esto tiene que existir, y lo hacés vos (o el negocio con vos), no
el agente:

- `docs/INITIAL_SURVEY.md`: el relevamiento inicial. Lo escribís vos, a mano, después de hablar
  con el cliente (es el resultado de la ingesta de la fase 0). Media página a una página, en
  prosa, no en formulario, con seis cosas: (1) el pedido: qué quiere el cliente, con sus palabras,
  para quién, y qué pasa hoy sin el sistema (el cuaderno, la planilla, la persona que lo hace a
  mano); (2) la tecnología: qué hay o qué se propone, si existe un sistema anterior, si ese
  sistema tiene repositorio y cómo está manejado (ramas, quién sube, si hay tests); (3) la
  testeabilidad: si las pantallas se pueden operar por programa, y si cada elemento de la interfaz
  tiene cómo ser encontrado, clickeado, tipeado y leído; si no lo sabés, decilo; (4) el dueño del
  dominio: quién es, con nombre y rol, y cuánto tiempo tiene por semana para decidir; (5) la
  consecuencia de un error: plata, salud, operación, nada; (6) los entornos: si va a haber uno de
  prueba, si el agente va a poder acceder, si hay una producción consultable en solo lectura. Lo
  que no sabés queda escrito como "no lo sé": no lo completes vos para que el agente no pregunte,
  porque la gracia del peldaño es ver qué pregunta.
- `docs/ELIGIBILITY_CRITERIA.md`: la ficha de criterios. La copiás del documento principal (la
  ficha del peldaño 0: los dos excluyentes X1 y X2 y los criterios D1 a D10 que ponderan), con una
  columna vacía para la respuesta, otra para la fuente y otra para verde o rojo. No la completes
  vos: la completa el agente.
- La carpeta del proyecto, creada, con el agente abierto ahí y todavía sin nada más que esos dos
  archivos dentro de `docs/`.
- Estado mínimo aceptable: los dos archivos existen, el relevamiento toca las seis cosas aunque
  varias digan "no lo sé", y el agente está parado en la carpeta.

> We are going to assess whether this project can be run with the Urazuke method. Read the
> initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`. First, evaluate whether the survey is sufficient to answer
> every criterion. If any criterion cannot be answered from the survey, ask me for the missing
> information before going on; do not assume. Then fill in the sheet criterion by criterion:
> the answer, where it comes from, and for each exclusionary criterion whether it is green or
> red. Do not decide: present me the completed sheet with your reading and your doubts, and I
> will decide. Reply in my language.

> [es]
> Vamos a evaluar si este proyecto se puede encarar con el método Urazuke. Leé el relevamiento
> inicial en `docs/INITIAL_SURVEY.md` y la ficha de criterios en `docs/ELIGIBILITY_CRITERIA.md`.
> Primero, evaluá si el relevamiento alcanza para responder cada criterio. Si algún criterio no
> se puede responder con el relevamiento, pedime la información que falta antes de seguir; no
> supongas. Después completá la ficha criterio por criterio: la respuesta, de dónde sale, y para
> cada criterio excluyente si está en verde o en rojo. No decidas: presentame la ficha completa
> con tu lectura y tus dudas, y decido yo. Respondé en mi idioma.

Qué le estoy pidiendo: que lea los dos insumos (el relevamiento y la ficha de criterios); que
**antes de responder evalúe si el relevamiento alcanza** y, si no alcanza, pregunte en vez de
suponer (esta es la cláusula central de todos los prompts del método); que complete la ficha con
la fuente de cada respuesta, para que después se pueda rastrear; que marque los excluyentes en
verde o rojo; y que **no decida**, porque la elegibilidad la decido yo. La última línea le pide
que conteste en mi idioma, porque el prompt está en inglés pero la conversación no tiene por qué
estarlo.

**De cierre:**

**Antes de enviar el prompt**, tenés que tener esto a mano:

- Tu decisión, en una línea, tomada después de leer la ficha completa que el agente presentó: va,
  no va, o va con condiciones. Si hay condiciones, escribilas antes de pegar el prompt, cada una
  verificable ("acceso de lectura a producción antes del peldaño 3" sí; "que el cliente colabore"
  no), y no más de tres.
- Las respuestas que le diste a las preguntas del agente, dadas en esta misma sesión del chat: el
  prompt le pide que las incluya en la ficha final, y si la sesión es otra, no las tiene.
- Estado mínimo aceptable: cada criterio de la ficha tiene respuesta y fuente a la vista, y vos ya
  decidiste. Si todavía dudás, no mandes el cierre: seguí preguntando.

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.

> [es]
> Decisión: [va / no va / va con estas condiciones: …]. Escribí la ficha final en
> `docs/ELIGIBILITY.md` con la fecha, quién decidió, la respuesta a cada criterio con su fuente,
> y las condiciones si las hay. Incluí las preguntas que hiciste y mis respuestas.

Qué le estoy pidiendo: que deje la decisión escrita con fecha y dueño (peldaño 6), con las
condiciones si las hay, y con el rastro de preguntas y respuestas, que es la evidencia de que no
supuso nada.

## 3. Resultado esperado

Un archivo `docs/ELIGIBILITY.md` (o el nombre que use tu proyecto), de una página, con:

- Fecha y quién decidió.
- Los dos criterios excluyentes con su respuesta y su fuente:
  - X1: hay repositorio accesible y manejado de forma estándar (o el proyecto es nuevo).
  - X2: la interfaz se puede ejecutar por programa y cada elemento es accesible con sus distintos
    métodos, con verificación del efecto en el backend.
- Los criterios que ponderan, cada uno con respuesta, fuente y peso (cuando el peso esté
  calibrado).
- La decisión: va, no va, o va con condiciones, y las condiciones escritas.
- Las preguntas que el agente hizo y las respuestas, para que quede el rastro.

## 4. Verificación de completitud (la hacés vos, sin leer código)

- ¿Los dos excluyentes tienen respuesta explícita y fuente? Si alguno está en rojo, ¿la decisión
  es "no va" o tiene una condición que lo resuelve?
- ¿Hay algún criterio respondido con "supongo que sí" o "probablemente"? Si lo hay, el peldaño
  no está subido: el agente tenía que preguntar.
- ¿La decisión está escrita con fecha y con nombre?
- ¿Las condiciones (si las hay) son verificables? ("Tener acceso de lectura a producción antes
  del peldaño 3" sí; "que el cliente colabore" no.)

## 5. Señales de alarma

- El agente completó la ficha entera sin hacer una sola pregunta. O el relevamiento era perfecto
  (nunca lo es) o supuso.
- La decisión es "va con condiciones" y las condiciones son más de tres. Probablemente es un "no
  va" que no se quiere decir.
- El criterio X2 se respondió "sí, con un poco de trabajo". Si las pantallas no se pueden operar
  por programa hoy, ese "poco de trabajo" es el proyecto entero.
