# Peldaño 1 — El contrato de convivencia (contrato del peldaño)

**Tramo:** arranque (una vez por proyecto; se revisa cuando un golpe lo exige).
**Forma:** un solo tiro, con una vuelta de ajuste del dueño.
**Tamaño:** obligatorio en todo proyecto. Es el peldaño más barato de todos y el que más
frustración evita.

## Para qué sirve

Para que humano y agente acuerden cómo van a trabajar antes de la primera línea de código.
Parece una formalidad y no lo es: es lo que evita que el agente "ayude" expandiendo el alcance,
deje deuda para después, o reporte como hecho lo que cree que hizo. En Forge este archivo se
llama `SQ.md` (estándares de calidad); el nombre no importa, el contenido sí.

Una forma de entenderlo: el agente es un colaborador nuevo que llega cada mañana sin memoria de
ayer. El contrato es lo que le decís el primer día, y lo que va a releer cada día. Si no lo
escribís, se lo vas a tener que decir cada vez, y lo vas a decir distinto cada vez.

## 1. Contexto requerido

- Ninguno del proyecto: es el primer archivo.
- Del dueño: sus preferencias de trabajo (idioma, cómo quiere que le pregunten, qué
  considera una pérdida de su tiempo, qué nivel de autonomía le da al agente).

## 2. Prompts

**Inicial:**

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

Qué le estamos pidiendo: las seis reglas mínimas, cada una con el fallo que evita (eso es lo que
las vuelve reglas y no consejos); que proponga reglas propias del proyecto pero las marque como
propuestas, para que el dueño las acepte o rechace; y que pregunte lo que necesite saber sobre
el dueño. Un contrato redactado sin una sola pregunta es sospechoso: el agente no conoce a la
persona con la que va a trabajar.

**De cierre:**

> I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the
> agreement with today's date and a version number. Then add to the project file the
> instruction to read this agreement at the start of every session.

Qué le estamos pidiendo: que cierre el contrato con fecha y versión, y que lo enganche al archivo
de proyecto para que se lea en cada sesión. Sin ese enganche el contrato existe pero no actúa.

## 3. Resultado esperado

Un archivo `docs/WORKING_AGREEMENT.md` (o `SQ.md`, o `CONTRATO.md`) con:

- Fecha y versión.
- Cada regla numerada, en una o dos frases, con el fallo que evita.
- Las reglas propias del proyecto, marcadas como tales.
- Una línea al pie que diga que el agente propone cambios pero no edita el contrato solo.

Y una línea en el archivo de proyecto (`PROJECT.md` o `CLAUDE.md`) que ordene leerlo al
empezar cada sesión.

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
- Dos semanas después, el agente hace algo que el contrato prohíbe y nadie lo nota. El contrato
  no se está leyendo: revisá el enganche en el archivo de proyecto.
