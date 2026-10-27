# Peldaño 6 — Las decisiones se escriben junto al código (contrato del peldaño)

**Tramo:** bucle.
**Cuándo:** en cada sesión del bucle, cada vez que el agente se topa con una regla de negocio no
escrita o con una bifurcación que cambia lo que el usuario ve. Suelen ser dos o tres por bloque.
También en el arranque (peldaños 0 y 3) y en la salida a producción (14 y 15).
**Forma:** conversación corta: el agente detecta que hay una decisión, pregunta, y la deja escrita.
**Tamaño:** obligatorio en todo proyecto. En uno chico el registro puede ser una tabla de diez
filas; lo que importa es que las reglas de negocio tengan dueño.

## Para qué sirve

Hacé que cada regla de negocio y cada decisión estructural tenga dueño, fecha y lugar. Si no, en
seis semanas nadie sabe si "aprobada más saldo vuelve a la cola" fue una decisión del cliente o
una ocurrencia del agente. Y evitá lo peor: el agente inventando reglas de dominio porque le
parecieron razonables.

Esto tiene una consecuencia que quiero decir en voz alta: el modelo, cuando se encuentra con un
hueco en las reglas, **lo llena**. No se detiene; completa con lo que le parece más probable, y lo
hace con la misma naturalidad con que escribe lo demás. Por eso la rutina de este peldaño no es
"escribí las decisiones" sino "frená y preguntá cuando falte una". Lo segundo es lo difícil, y es
lo que hay que exigir en el contrato. La práctica de dejar la regla escrita en el commit, con mis
palabras y la fecha, la impuse en la Obra Social [Ref. 29](../REFERENCIAS.md#ref-29), y la de
congelar las decisiones antes de construir viene de mi herramienta
[Ref. 5](../REFERENCIAS.md#ref-5).

## 1. Contexto requerido

Lo que sigue es la lista genérica. Los archivos concretos que tenés que tener hechos antes de cada
prompt, con su contenido y su estado mínimo, están en la sección 2, en el bloque "Antes de enviar
el prompt" que precede a cada uno.

- La conversación con el dueño: es el único contexto. El agente no puede decidir reglas de
  negocio.
- Un lugar acordado donde se escriben las decisiones: el mensaje del commit, la especificación del
  pendiente, y un registro `docs/DECISIONS.md`.

## 2. Prompts

**Rutina (va en el contrato de convivencia):**

**Antes de enviar el prompt**, esto tiene que existir, y lo hacés vos (o el negocio con vos), no
el agente:

- `docs/WORKING_AGREEMENT.md` (peldaño 1), donde va la rutina.
- `docs/DECISIONS.md`, creado aunque esté vacío, con el formato en el encabezado: fecha, quién
  decidió, las palabras textuales, el pendiente que la necesitaba. Lo creás vos o se lo pedís al
  agente en la misma sesión; lo que importa es que el lugar acordado exista antes de la primera
  decisión.
- Vos, disponible. Esta rutina solo funciona si, cuando el agente frena y pregunta, alguien
  contesta en horas y no en semanas. Si el dueño del dominio es otra persona, acordá con él el
  canal y el tiempo de respuesta antes de pegar el prompt.
- Estado mínimo aceptable: el registro existe y hay alguien que decide.

> Whenever implementing something requires a business rule that is not written down, or you
> must choose between two approaches that change what the user sees, stop and ask me, in prose,
> with your recommendation and the alternative. Do not implement the one you prefer. When I
> decide, write the decision with my name and the date in the commit message, in the pending
> item's specification and in `docs/DECISIONS.md`, with the exact words I used. If I do not
> answer and you must move on, implement the most reversible option and mark it "decision by
> omission, pending confirmation", so that I can review it.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [es]
> Cada vez que implementar algo requiera una regla de negocio que no está escrita, o tengas que
> elegir entre dos enfoques que cambian lo que el usuario ve, frená y preguntame, en prosa, con tu
> recomendación y la alternativa. No implementes la que preferís. Cuando yo decida, escribí la
> decisión con mi nombre y la fecha en el mensaje del commit, en la especificación del pendiente y
> en `docs/DECISIONS.md`, con las palabras exactas que usé. Si no contesto y tenés que seguir,
> implementá la opción más reversible y marcala como "decisión por omisión, pendiente de
> confirmación", para que yo la revise.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.

Qué le estoy pidiendo: que **frene** ante una regla no escrita o una bifurcación visible; que
pregunte con recomendación y alternativa (para que vos decidas en diez segundos, no en diez
minutos); que registre la decisión con tus palabras textuales en los tres lugares (el commit, el
pendiente, el registro), no con una paráfrasis "mejorada"; y, para cuando no contestás, la opción
más reversible marcada como "por omisión", que es lo que permite seguir sin que la decisión
desaparezca.

**De cierre (cada decisión):**

**Antes de enviar el prompt**, tenés que tener esto a mano:

- La pregunta del agente, leída, con su recomendación y su alternativa.
- Tu decisión, consultada con el dueño del dominio si no sos vos, redactada en una frase con tus
  palabras exactas, las que querés que queden para siempre (van a estar en el commit, en el
  pendiente y en el registro), y la fecha.
- Estado mínimo aceptable: la frase está escrita antes de pegar el prompt, no se improvisa en el
  chat. Una regla parafraseada después es una regla distinta.

> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [es]
> Regla: [texto exacto]. Decidida por mí, [fecha]. Anotala y seguí.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.

Qué le estoy pidiendo: el formato mínimo de una decisión: la regla textual, quién, cuándo. Tres
cosas; sin ninguna de las tres no es una decisión registrada.

## 3. Resultado esperado

- `docs/DECISIONS.md`: una línea o un párrafo por decisión, con fecha, quién decidió, la frase
  textual, el pendiente o commit donde se aplicó, y si fue "por omisión".
- En la especificación de cada pendiente afectado: la regla con su decisión y fecha.
- En cada commit que implementa una regla de negocio: la frase de origen.

## 4. Verificación de completitud

- Abrí tres commits que toquen reglas de negocio: ¿cada uno cita quién decidió y cuándo?
- ¿Hay decisiones "por omisión" sin confirmar? Confirmalas o revertilas; no las dejes.
- ¿Hay alguna regla en el sistema que no reconocés como tuya? Si la hay, el agente la inventó: es
  un fallo del peldaño, se escribe como pendiente y se revisa.
- ¿Las frases están textuales o "mejoradas" por el agente? Tienen que ser las tuyas.

## 5. Señales de alarma

- Pasó una semana de trabajo y el registro de decisiones no creció. O el trabajo fue puramente
  mecánico (raro) o el agente decidió solo.
- Las decisiones registradas están todas redactadas con el mismo estilo pulido. Son paráfrasis del
  agente, no tus palabras.
- Un usuario del sistema pregunta "¿por qué hace esto?" y nadie encuentra la decisión.
