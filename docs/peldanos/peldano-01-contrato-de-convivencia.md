# Peldaño 1 — El contrato de convivencia (contrato del peldaño)

**Tramo:** arranque.
**Cuándo:** una sola vez, inmediatamente después de la elegibilidad; se
revisa cuando un golpe lo exige.
**Forma:** un solo tiro, con una vuelta de ajuste tuya.
**Tamaño:** obligatorio en todo proyecto. Es el peldaño más barato de todos y el que más
frustración evita.

## Para qué sirve

Poné por escrito, antes de la primera línea de código, cómo van a trabajar vos y el agente. Parece
una formalidad y no lo es: es lo que evita que el agente "ayude" expandiendo el alcance, deje
deuda para después, o reporte como hecho lo que cree que hizo. En mi herramienta este archivo se
llama `SQ.md` (estándares de calidad); el nombre no importa, el contenido sí.

Pensalo así: el agente es un colaborador nuevo que llega cada mañana sin memoria de ayer. El
contrato es lo que le decís el primer día, y lo que va a releer cada día. Si no lo escribís, se lo
vas a tener que decir cada vez, y lo vas a decir distinto cada vez. Yo lo escribí por primera vez
cuando llevaba dos semanas repitiendo lo mismo en cada sesión [Ref. 1](../REFERENCIAS.md#ref-1), y
nada de lo que puse era nuevo en ingeniería de sistemas; lo nuevo era tener que escribirlo para
alguien sin memoria.

## 1. Contexto requerido

Lo que sigue es la lista genérica. Los archivos concretos que tenés que tener hechos antes de cada
prompt, con su contenido y su estado mínimo, están en la sección 2, en el bloque "Antes de enviar
el prompt" que precede a cada uno.

- Ninguno del proyecto: es el primer archivo.
- Tuyo: tus preferencias de trabajo (idioma, cómo querés que te pregunten, qué considerás una
  pérdida de tu tiempo, qué nivel de autonomía le das al agente).

## 2. Prompts

**Inicial:**

**Antes de enviar el prompt**, esto tiene que existir, y lo hacés vos (o el negocio con vos), no
el agente:

- Nada del proyecto: es el primer archivo que se escribe. Si ya hiciste el peldaño 0,
  `docs/ELIGIBILITY.md` existe y está bien que el agente lo vea, pero no hace falta.
- Tus preferencias de trabajo, pensadas antes de empezar y anotadas en una lista corta que tenés a
  mano (en un papel, o en `docs/MY_PREFERENCES.md` si querés que quede en el repositorio): en qué
  idioma querés la conversación; cuánto querés que te pregunte (poco y con recomendación, o
  mucho); qué considerás una pérdida de tu tiempo; qué nivel de autonomía le das (¿puede hacer
  commits solo?, ¿puede desplegar a prueba solo?, ¿a producción nunca?); qué no tolerás. El agente
  te va a preguntar sobre esto; la lista es para que contestes en una línea y no improvises.
- La carpeta del proyecto creada y el agente abierto ahí.
- Estado mínimo aceptable: sabés contestar cada una de esas cinco preguntas. El contrato que salga
  va a ser tan bueno como tus respuestas.

> Before we write any code, we are going to set the working agreement between you and me.
> Write `docs/WORKING_AGREEMENT.md` with at least these rules, each with one line explaining
> what it prevents: (1) My time is sacred: do not ask me what you can resolve on your own, and
> when you do ask, ask in prose, with your recommendation. (2) Zero technical debt: whatever
> breaks is fixed at the root, with its regression test, in the same session. (3) Exact scope:
> no more and no less than what was asked; if you see something else, log it as a pending item,
> do not do it. (4) Documentation is updated in the same commit as the change. (5) Never report
> as done something you have not verified; always separate what you verified from what you
> believe. (6) Speak my language. Add any rules you think this project needs, marked as
> proposals. If you need to know something about how I work in order to write this, ask me.

> [es]
> Antes de escribir código, vamos a fijar el contrato de convivencia entre vos y yo. Escribí
> `docs/WORKING_AGREEMENT.md` con al menos estas reglas, cada una con una línea que explique qué
> evita: (1) Mi tiempo es sagrado: no me preguntes lo que podés resolver solo, y cuando preguntes,
> preguntá en prosa, con tu recomendación. (2) Cero deuda técnica: lo que se rompe se arregla de
> raíz, con su test de regresión, en la misma sesión. (3) Alcance exacto: ni más ni menos de lo
> pedido; si ves otra cosa, anotala como pendiente, no la hagas. (4) La documentación se actualiza
> en el mismo commit que el cambio. (5) Nunca reportes como hecho algo que no verificaste; separá
> siempre lo que verificaste de lo que creés. (6) Hablá mi idioma. Agregá las reglas que creas que
> este proyecto necesita, marcadas como propuestas. Si necesitás saber algo sobre cómo trabajo para
> escribir esto, preguntame.

Qué le estoy pidiendo: las seis reglas mínimas, cada una con el fallo que evita (eso es lo que las
vuelve reglas y no consejos); que proponga reglas propias del proyecto pero las marque como
propuestas, para que vos las aceptes o rechaces; y que pregunte lo que necesite saber sobre vos.
Un contrato redactado sin una sola pregunta es sospechoso: el agente no conoce a la persona con
la que va a trabajar.

**De cierre:**

**Antes de enviar el prompt**, tenés que tener esto a mano:

- El borrador de `docs/WORKING_AGREEMENT.md` que el agente escribió, leído entero por vos. Para
  cada regla que él propuso, tu veredicto: la aceptás o la rechazás, y si la rechazás, una razón
  de una línea. Eso va en los huecos [X, Y] y [Z] del prompt, y los llenás vos.
- Las respuestas a lo que te preguntó sobre cómo trabajás, ya dadas en el chat.
- Estado mínimo aceptable: no queda ninguna regla propuesta sin veredicto. Una regla que no
  aceptaste ni rechazaste queda en el contrato como si la hubieras aceptado.

> I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the
> agreement with today's date and a version number. Then add to the project file the
> instruction to read this agreement at the start of every session.

> [es]
> Acepto las reglas 1 a 6 y tus propuestas [X, Y]; rechazo [Z] porque [razón]. Cerrá el contrato
> con la fecha de hoy y un número de versión. Después agregá al archivo de proyecto la
> instrucción de leer este contrato al empezar cada sesión.

Qué le estoy pidiendo: que cierre el contrato con fecha y versión, y que lo enganche al archivo de
proyecto para que se lea en cada sesión. Sin ese enganche el contrato existe pero no actúa.

## 3. Resultado esperado

Un archivo `docs/WORKING_AGREEMENT.md` (o `SQ.md`, o `CONTRATO.md`) con:

- Fecha y versión.
- Cada regla numerada, en una o dos frases, con el fallo que evita.
- Las reglas propias del proyecto, marcadas como tales.
- Una línea al pie que diga que el agente propone cambios pero no edita el contrato solo.

Y una línea en el archivo de proyecto (`PROJECT.md` o `CLAUDE.md`) que ordene leerlo al empezar
cada sesión.

## 4. Verificación de completitud

- ¿Están las seis reglas mínimas, cada una con el fallo que evita?
- ¿Hay alguna regla escrita como aspiración ("tratar de…", "en lo posible…")? Si la hay, no
  sirve: las reglas se cumplen o no.
- ¿El archivo de proyecto ordena leerlo en cada sesión?
- ¿El agente te hizo al menos una pregunta sobre cómo trabajás? Si redactó todo sin preguntar
  nada, es sospechoso: no te conoce.

## 5. Señales de alarma

- El contrato tiene más de veinte reglas. Nadie, ni humano ni modelo, respeta veinte reglas; se
  respetan seis u ocho.
- Una regla dice "el agente puede modificar este contrato cuando lo considere necesario". No.
- Dos semanas después, el agente hace algo que el contrato prohíbe y nadie lo nota. El contrato no
  se está leyendo: revisá el enganche en el archivo de proyecto.
