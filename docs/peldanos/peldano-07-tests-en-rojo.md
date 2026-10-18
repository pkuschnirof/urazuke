# Peldaño 7 — Tests como candados, probados en rojo (contrato del peldaño)

**Tramo:** bucle.
**Cuándo:** con cada pendiente, al cerrarlo: el test en rojo y en verde, la regresión de los
vecinos y la prueba de punta a punta del flujo tocado. La batería completa de punta a punta de
todos los flujos, al cierre de cada bloque y antes de cada despliegue a producción.
**Forma:** un solo tiro; el agente ejecuta y reporta, vos leés el reporte.
**Tamaño:** obligatorio en todo proyecto. Es el corazón del método: si hay un peldaño que no se
puede negociar, es este.

## Para qué sirve

Un test que nunca viste fallar no sabés si prueba algo. La regla acá no es "escribí tests": es
"demostrá que el test se pone en rojo contra el código viejo, y después en verde con el nuevo".
Evita los tests que pasan porque no prueban nada, y el verde que esconde un bug
[Ref. 44](../REFERENCIAS.md#ref-44).

Por qué esto es más importante con un modelo que con un programador humano: el modelo escribe el
código y el test **en la misma sesión, con el mismo entendimiento**. Si entendió mal el pedido, el
test va a probar lo que entendió, y va a pasar. El rojo contra el código viejo es la única forma
barata de comprobar que el test está mirando lo que importa: si el código viejo lo pasa, el test
no distingue el antes del después, y entonces no sirve. El caso que mejor lo muestra es el de los
contadores que no coincidían [Ref. 26](../REFERENCIAS.md#ref-26).

Y la segunda mitad: las pruebas de punta a punta. Un test que verifica desde la pantalla (hace
clic, tipea, lee) y comprueba el efecto en el backend (la fila quedó, el estado cambió) es el que
reemplaza tu lectura del código. Los criterios de aceptación del pendiente ("dado, cuando,
entonces") son su guion. Y se corren tres veces en tres escalas: el flujo tocado con cada
pendiente, todos los flujos al cierre de cada bloque, y todos los flujos con la versión exacta
antes de producción.

## 1. Contexto requerido

- El cambio ya implementado (por defecto los tests van después de implementar; "primero el test"
  queda como opción para alcances chicos y bien definidos).
- El pendiente que origina el cambio, con sus criterios de aceptación y su "cómo se verifica".
- La batería existente y el comando para correrla (peldaño 4).

## 2. Prompts

**Rutina (va en el contrato de convivencia; se aplica en cada cambio):**

> To close this pending item I need evidence, not your word. (1) Write the test that proves what
> the item asks for, following its acceptance criteria. (2) Demonstrate that this test fails
> against the previous code: you may temporarily revert the change, or run the test against the
> old version, but show me the red output. (3) Show me the green output with the change. (4) Run
> the regression suite for the neighbouring items and show me it is still green. (5) Run the
> end-to-end test of the flow this item touches, from the screen to the backend, and show me the
> backend effect. (6) Do not replace with mocks the very part you are trying to test. If testing
> end to end requires something you lack (data, access, an environment), ask me for it; do not
> simulate what you do not have. Finally, the commit message says "proved red against [what]"
> and the test counts.

> [es]
> Para cerrar este pendiente necesito evidencia, no tu palabra. (1) Escribí el test que prueba lo
> que el pendiente pide, siguiendo sus criterios de aceptación. (2) Demostrá que ese test falla
> contra el código anterior: podés revertir temporalmente el cambio, o correr el test contra la
> versión vieja, pero mostrame la salida en rojo. (3) Mostrame la salida en verde con el cambio.
> (4) Corré la regresión de los pendientes vecinos y mostrame que sigue en verde. (5) Corré la
> prueba de punta a punta del flujo que este pendiente toca, desde la pantalla hasta el backend, y
> mostrame el efecto en el backend. (6) No reemplaces con simulaciones justamente la parte que
> estás probando. Si probar de punta a punta requiere algo que no tenés (datos, acceso, un
> entorno), pedímelo; no simules lo que no tenés. Por último, el mensaje del commit dice "probado
> en rojo contra [qué]" y los números de los tests.

Qué le estoy pidiendo, cláusula por cláusula: (1) el test, guiado por los criterios de aceptación
del pendiente; (2) **el rojo demostrado**, con la salida a la vista, que es la cláusula que
distingue este método de "escribí tests"; (3) el verde; (4) la regresión de los vecinos en la
misma sesión, porque un cambio rompe cosas al lado; (5) la prueba de punta a punta del flujo
tocado, con el efecto en el backend a la vista; (6) no simular justamente lo que se prueba; y la
cláusula de completitud adaptada a este peldaño: si falta algo para probar de punta a punta,
**pedirlo, no simularlo**. El mensaje de commit con los números deja la evidencia donde vive el
código.

**Al cierre de cada bloque y antes de cada despliegue a producción:**

> Run the complete end-to-end suite of every flow that exists so far, in the test environment,
> with the exact version that will be promoted. Show me the counts, and for each flow the
> backend check that proves it. If any flow has no end-to-end test, say so and open a pending
> item for it; do not pass it as covered.

> [es]
> Corré la batería completa de punta a punta de todos los flujos que existen hasta ahora, en el
> entorno de prueba, con la versión exacta que se va a promover. Mostrame los números y, para cada
> flujo, la verificación en el backend que lo prueba. Si algún flujo no tiene prueba de punta a
> punta, decilo y abrí un pendiente; no lo pases como cubierto.

Qué le estoy pidiendo: la segunda y la tercera escala de las pruebas de punta a punta, con la
versión exacta (no "la última"), con el efecto en el backend por flujo, y con la cláusula de
completitud: lo que no está cubierto se declara y se vuelve pendiente, no se pasa por cubierto.

**Cuando el agente dice que no se puede probar:**

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

> [es]
> Explicá por qué no se puede probar, qué habría que agregar para que se pueda, y abrí un
> pendiente para eso. El cambio no está cerrado hasta que se pueda probar.

Qué le estoy pidiendo: que "no se puede probar" no sea el final de la conversación sino el
principio de un pendiente. La no-testeabilidad es deuda, y la deuda se registra.

## 3. Resultado esperado

- El test nuevo en el repositorio, nombrado con el pendiente que cierra.
- En el reporte del agente y en el mensaje del commit: la salida en rojo (cuántos fallan, contra
  qué versión), la salida en verde, y la regresión en verde con sus números.
- La prueba de punta a punta del flujo tocado, con la evidencia de que el backend cambió (la
  fila, el registro, el estado).
- Al cierre de cada bloque y antes de producción: la batería completa de punta a punta en verde,
  por flujo, con la versión exacta.

## 4. Verificación de completitud

- ¿El reporte muestra el rojo? Con números: "4 de 8 fallan contra el criterio viejo". Si solo
  muestra verde, el peldaño no está subido.
- ¿La regresión corrió en la misma sesión? ¿Cuántos tests, cuántos en verde?
- ¿Hay alguna parte "simulada" (mock) justo donde está el cambio? Preguntale al agente qué simuló
  y por qué.
- ¿El commit cita el pendiente y dice "probado en rojo"?
- ¿La prueba de pantalla verifica también el efecto en el backend?
- Al cierre del bloque: ¿están todos los flujos en la batería de punta a punta, o hay alguno que
  "se cubre con los unitarios"?

## 5. Señales de alarma

- Todos los tests nuevos de la semana pasaron en verde a la primera, y nunca se mostró un rojo. O
  el agente está omitiendo el paso o los tests no prueban nada.
- La batería tarda cada vez más y nadie sabe por qué. Suele ser que los tests de punta a punta se
  fueron reemplazando por simulaciones "para que corra rápido".
- El agente reporta "los tests pasan" sin decir cuántos. Siempre con números.
- Llegás a la salida a producción y la batería completa de punta a punta se corre por primera vez.
  Faltaron los cierres de bloque.
