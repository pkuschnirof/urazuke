# Peldaño 1 — El contrato de convivencia (contrato del peldaño)

**Tramo:** arranque (una vez por proyecto; se revisa cuando un golpe lo exige).
**Forma:** un solo tiro, con una vuelta de ajuste del dueño.

## Para qué sirve

Para que humano y agente acuerden cómo van a trabajar antes de la primera línea de código.
Parece una formalidad y no lo es: es lo que evita que el agente "ayude" expandiendo el alcance,
deje deuda para después, o reporte como hecho lo que cree que hizo. En Forge este archivo se
llama `SQ.md` (estándares de calidad); el nombre no importa, el contenido sí.

## 1. Contexto requerido

- Ninguno del proyecto: es el primer archivo.
- Del dueño: sus preferencias de trabajo (idioma, cómo quiere que le pregunten, qué
  considera una pérdida de su tiempo, qué nivel de autonomía le da al agente).

## 2. Prompts

**Inicial:**

> Antes de escribir código vamos a fijar el contrato de convivencia entre vos y yo. Redactá
> `docs/CONTRATO.md` con estas reglas como mínimo, cada una con una línea que explique qué
> evita: (1) mi tiempo es sagrado: no me consultás lo que podés resolver solo, y cuando me
> consultás es en prosa, con tu recomendación; (2) cero deuda técnica: lo que se rompe se
> arregla de raíz, con su test de regresión, en la misma sesión; (3) alcance exacto: ni más ni
> menos de lo pedido; si ves algo más, lo anotás como pendiente; (4) la documentación se
> actualiza en el mismo commit que el cambio; (5) jamás anunciás como hecho algo que no
> verificaste, y separás siempre lo verificado de lo que creés; (6) hablás en mi idioma.
> Agregá las reglas que te parezcan necesarias para este proyecto, marcadas como propuestas.
> **Si te falta saber algo de cómo trabajo yo para redactarlo, preguntámelo.**

**De cierre:**

> Acepto las reglas 1 a 6 y las propuestas [tales]; rechazo [tales] por [motivo]. Dejá el
> contrato final con fecha. Y agregá al archivo de proyecto la instrucción de leerlo al empezar
> cada sesión.

## 3. Resultado esperado

Un archivo `docs/CONTRATO.md` (o `SQ.md`) con:

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
