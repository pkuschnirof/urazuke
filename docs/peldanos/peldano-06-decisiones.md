# Peldaño 6 — Las decisiones se escriben junto al código (contrato del peldaño)

**Tramo:** bucle (cada vez que aparece una regla de negocio o una decisión estructural).
**Forma:** conversación corta: el agente detecta que hay una decisión, pregunta, y la deja escrita.

## Para qué sirve

Para que cada regla de negocio y cada decisión estructural tenga dueño, fecha y lugar. Si no, en
seis semanas nadie sabe si "aprobada más saldo vuelve a la cola" fue una decisión del cliente o
una ocurrencia del agente. Y evita lo peor: el agente inventando reglas de dominio porque le
parecieron razonables.

## 1. Contexto requerido

- La conversación con el dueño: es el único contexto. El agente no puede decidir reglas de
  negocio.
- Un lugar acordado donde se escriben las decisiones: el mensaje del commit, el documento del
  pendiente, o un registro `docs/DECISIONES.md`.

## 2. Prompts

**Rutina (va en el contrato):**

> Cada vez que para implementar algo necesites una regla de negocio que no está escrita, o
> tengas que elegir entre dos formas que cambian lo que el usuario ve, **frená y preguntame,
> en prosa, con tu recomendación y la alternativa**. No implementes la que te parezca. Cuando
> yo decida, escribila con mi nombre y la fecha en el commit y en `docs/DECISIONES.md`, con la
> frase textual que te dije. Si yo no te contesto y tenés que avanzar, implementá la opción más
> reversible y marcala como "decisión por omisión, pendiente de confirmar", para que la revise.

**De cierre (cada decisión):**

> Regla: [frase textual]. Decido yo, [fecha]. Dejala escrita y seguí.

## 3. Resultado esperado

- `docs/DECISIONES.md`: una línea o un párrafo por decisión, con fecha, quién decidió, la frase
  textual, el pendiente o commit donde se aplicó, y si fue "por omisión".
- En cada commit que implementa una regla de negocio: la frase de origen ("regla Pablo:
  aprobada + saldo = vuelve", "decisión Pablo 2026-08-10").

## 4. Verificación de completitud

- Abrí tres commits que toquen reglas de negocio: ¿cada uno cita quién decidió y cuándo?
- ¿Hay decisiones "por omisión" sin confirmar? Confirmalas o revertilas; no las dejes.
- ¿Hay alguna regla en el sistema que no reconocés como tuya? Si la hay, el agente la inventó:
  es un fallo del peldaño, se escribe como pendiente y se revisa.
- ¿Las frases están textuales o "mejoradas" por el agente? Tienen que ser las tuyas.
