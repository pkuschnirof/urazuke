# Peldaño 6 — Las decisiones se escriben junto al código (contrato del peldaño)

**Tramo:** bucle (cada vez que aparece una regla de negocio o una decisión estructural).
**Forma:** conversación corta: el agente detecta que hay una decisión, pregunta, y la deja escrita.
**Tamaño:** obligatorio en todo proyecto. En uno chico el registro puede ser una tabla de diez
filas; lo que importa es que las reglas de negocio tengan dueño.

## Para qué sirve

Para que cada regla de negocio y cada decisión estructural tenga dueño, fecha y lugar. Si no, en
seis semanas nadie sabe si "aprobada más saldo vuelve a la cola" fue una decisión del cliente o
una ocurrencia del agente. Y evita lo peor: el agente inventando reglas de dominio porque le
parecieron razonables.

Esto tiene una consecuencia que vale la pena decir en voz alta: el modelo, cuando se encuentra
con un hueco en las reglas, **lo llena**. No se detiene; completa con lo que le parece más
probable, y lo hace con la misma naturalidad con que escribe lo demás. Por eso la rutina de este
peldaño no es "escribí las decisiones" sino "frená y preguntá cuando falte una". Lo segundo es lo
difícil, y es lo que hay que exigir en el contrato.

## 1. Contexto requerido

- La conversación con el dueño: es el único contexto. El agente no puede decidir reglas de
  negocio.
- Un lugar acordado donde se escriben las decisiones: el mensaje del commit, el documento del
  pendiente, o un registro `docs/DECISIONS.md`.

## 2. Prompts

**Rutina (va en el contrato de convivencia):**

> Whenever implementing something requires a business rule that is not written down, or you
> must choose between two approaches that change what the user sees, stop and ask me, in prose,
> with your recommendation and the alternative. Do not implement the one you prefer. When I
> decide, write the decision with my name and the date in the commit message and in
> `docs/DECISIONS.md`, with the exact words I used. If I do not answer and you must move on,
> implement the most reversible option and mark it "decision by omission, pending confirmation",
> so that I can review it.

Qué le estamos pidiendo: que **frene** ante una regla no escrita o una bifurcación visible;
que pregunte con recomendación y alternativa (para que el dueño decida en diez segundos, no en
diez minutos); que registre la decisión con las palabras textuales del dueño, no con una
paráfrasis "mejorada"; y, para cuando el dueño no contesta, la opción más reversible marcada
como "por omisión", que es lo que permite seguir sin que la decisión desaparezca.

**De cierre (cada decisión):**

> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.

Qué le estamos pidiendo: el formato mínimo de una decisión: la regla textual, quién, cuándo.
Tres cosas; sin ninguna de las tres no es una decisión registrada.

## 3. Resultado esperado

- `docs/DECISIONS.md`: una línea o un párrafo por decisión, con fecha, quién decidió, la frase
  textual, el pendiente o commit donde se aplicó, y si fue "por omisión".
- En cada commit que implementa una regla de negocio: la frase de origen ("rule from the owner:
  approved + balance = back to the queue", "owner decision 2026-08-10").

## 4. Verificación de completitud

- Abrí tres commits que toquen reglas de negocio: ¿cada uno cita quién decidió y cuándo?
- ¿Hay decisiones "por omisión" sin confirmar? Confirmalas o revertilas; no las dejes.
- ¿Hay alguna regla en el sistema que no reconocés como tuya? Si la hay, el agente la inventó:
  es un fallo del peldaño, se escribe como pendiente y se revisa.
- ¿Las frases están textuales o "mejoradas" por el agente? Tienen que ser las tuyas.

## 5. Señales de alarma

- Pasó una semana de trabajo y el registro de decisiones no creció. O el trabajo fue puramente
  mecánico (raro) o el agente decidió solo.
- Las decisiones registradas están todas redactadas con el mismo estilo pulido. Son paráfrasis
  del agente, no tus palabras.
- Un usuario del sistema pregunta "¿por qué hace esto?" y nadie encuentra la decisión.
