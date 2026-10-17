# Peldaño 7 — Tests como candados, probados en rojo (contrato del peldaño)

**Tramo:** bucle (cada cambio).
**Forma:** un solo tiro; el agente ejecuta y reporta, el dueño lee el reporte.
**Tamaño:** obligatorio en todo proyecto. Es el corazón del método: si hay un peldaño que no se
puede negociar, es este.

## Para qué sirve

Un test que nunca viste fallar no sabés si prueba algo. La regla acá no es "escribí tests": es
"demostrá que el test se pone en rojo contra el código viejo, y después en verde con el nuevo".
Evita los tests que pasan porque no prueban nada, y el verde que esconde un bug.

Por qué esto es más importante con un modelo que con un programador humano: el modelo escribe el
código y el test **en la misma sesión, con el mismo entendimiento**. Si entendió mal el pedido,
el test va a probar lo que entendió, y va a pasar. El rojo contra el código viejo es la única
forma barata de comprobar que el test está mirando lo que importa: si el código viejo lo pasa,
el test no distingue el antes del después, y entonces no sirve.

## 1. Contexto requerido

- El cambio ya implementado (por defecto los tests van después de implementar; "primero el
  test" queda como opción para alcances chicos y bien definidos).
- El pendiente que origina el cambio, con su "cómo se verifica".
- La batería existente y el comando para correrla (peldaño 4).

## 2. Prompts

**Rutina (va en el contrato de convivencia; se aplica en cada cambio):**

> To close this pending item I need evidence, not your word. (1) Write the test that proves what
> the item asks for. (2) Demonstrate that this test fails against the previous code: you may
> temporarily revert the change, or run the test against the old version, but show me the red
> output. (3) Show me the green output with the change. (4) Run the regression suite for the
> neighbouring items and show me it is still green. (5) Do not replace with mocks the very part
> you are trying to test. If testing end to end requires something you lack (data, access, an
> environment), ask me for it; do not simulate what you do not have. Finally, the commit message
> says "proved red against [what]" and the test counts.

Qué le estamos pidiendo, cláusula por cláusula: (1) el test; (2) **el rojo demostrado**, con la
salida a la vista, que es la cláusula que distingue este método de "escribí tests"; (3) el
verde; (4) la regresión de los vecinos en la misma sesión, porque un cambio rompe cosas al lado;
(5) no mockear justamente lo que se prueba; y la cláusula de completitud adaptada a este
peldaño: si falta algo para probar de punta a punta, **pedirlo, no simularlo**. El mensaje de
commit con los números deja la evidencia donde vive el código.

**Cuando el agente dice que no se puede probar:**

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

Qué le estamos pidiendo: que "no se puede probar" no sea el final de la conversación sino el
principio de un pendiente. La no-testeabilidad es deuda, y la deuda se registra.

## 3. Resultado esperado

- El test nuevo en el repositorio, nombrado con el pendiente que cierra.
- En el reporte del agente y en el mensaje del commit: la salida en rojo (cuántos fallan,
  contra qué versión), la salida en verde, y la regresión en verde con sus números.
- Si se probó de punta a punta (pantalla → backend), la evidencia de que el backend cambió
  (la fila, el registro, el estado).

## 4. Verificación de completitud

- ¿El reporte muestra el rojo? Con números: "4 de 8 fallan contra el criterio viejo". Si solo
  muestra verde, el peldaño no está subido.
- ¿La regresión corrió en la misma sesión? ¿Cuántos tests, cuántos en verde?
- ¿Hay alguna parte "simulada" (mock) justo donde está el cambio? Preguntale al agente qué
  simuló y por qué.
- ¿El commit cita el pendiente y dice "probado en rojo"?
- ¿Si el test es de pantalla, verifica también el efecto en el backend?

## 5. Señales de alarma

- Todos los tests nuevos de la semana pasaron en verde a la primera, y nunca se mostró un rojo.
  O el agente está omitiendo el paso o los tests no prueban nada.
- La batería tarda cada vez más y nadie sabe por qué. Suele ser que los tests de punta a punta
  se fueron reemplazando por simulaciones "para que corra rápido".
- El agente reporta "los tests pasan" sin decir cuántos. Siempre con números.
