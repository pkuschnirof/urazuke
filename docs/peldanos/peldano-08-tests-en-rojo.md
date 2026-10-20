# Peldaño 8 — Tests como candados, probados en rojo (contrato del peldaño)

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

Hay una objeción seria a este peldaño, y la quiero dejar escrita porque la van a usar en contra:
el mismo agente que escribe el test y el código puede **fingir el rojo**. Un estudio publicado en
agosto de 2026 midió que, cuando a un agente se le pide el ciclo de test primero, a veces se
saltea el rojo, lo cuenta sin haberlo corrido, o implementa antes del test para que pase de
entrada (está en la Parte F del documento principal, la de los trabajos relacionados). Mi
respuesta tiene tres piezas, y las tres están en la escalera. La primera, acá: el rojo no es un
relato, es un **recibo**: el comando exacto, el identificador de la versión contra la que corrió,
la cantidad de tests que fallan y el código de salida, todo pegado tal como salió, de manera que
vos puedas volver a correrlo con un solo comando sin entender lo que hace. La segunda, en el
peldaño 13: la auditoría por otra sesión vuelve a correr una muestra de esos recibos. La tercera,
en el peldaño 9: las pruebas de mutación, que plantan errores a propósito y cuentan cuántos
atrapan los tests; es la única medida que, en ese mismo estudio, distinguió a los tests que
vigilan de los que decoran.

Y la segunda mitad: las pruebas de punta a punta. Un test que verifica desde la pantalla (hace
clic, tipea, lee) y comprueba el efecto en el backend (la fila quedó, el estado cambió) es el que
reemplaza tu lectura del código. Los criterios de aceptación del pendiente ("dado, cuando,
entonces") son su guion. Y se corren tres veces en tres escalas: el flujo tocado con cada
pendiente, todos los flujos al cierre de cada bloque, y todos los flujos con la versión exacta
antes de producción.

## 1. Contexto requerido

Lo que sigue es la lista genérica. Los archivos concretos que tenés que tener hechos antes de cada
prompt, con su contenido y su estado mínimo, están en la sección 2, en el bloque "Antes de enviar
el prompt" que precede a cada uno.

- El cambio ya implementado (por defecto los tests van después de implementar; "primero el test"
  queda como opción para alcances chicos y bien definidos).
- El pendiente que origina el cambio, con sus criterios de aceptación y su "cómo se verifica".
- La batería existente y el comando para correrla (peldaño 4).

## 2. Prompts

**Rutina (va en el contrato de convivencia; se aplica en cada cambio):**

**Antes de enviar el prompt**, esto tiene que existir, y lo hacés vos (o el negocio con vos), no
el agente:

- El pendiente que se está cerrando, con su especificación completa en `docs/PENDING.md`; en
  particular, sus criterios de aceptación en la forma "dado, cuando, entonces" y su "cómo se
  verifica", que son el guion del test. Si el pendiente no los tiene, volvé al peldaño 5 antes de
  pedir el test.
- El cambio ya implementado por el agente (el método prueba después de implementar, salvo que vos
  elijas "primero el test" para un alcance chico y bien definido).
- La batería existente y el comando para correrla, anotados en `docs/STATUS.md` (peldaño 4).
- El entorno de prueba corriendo y accesible para el agente, con datos de prueba suficientes para
  el flujo que se toca. Si el flujo necesita datos que no existen (un paciente, un turno de ayer),
  cargalos vos o pedile que los cree como parte del test; lo que no puede hacer es simularlos.
- `docs/WORKING_AGREEMENT.md`, donde va la rutina la primera vez.
- Estado mínimo aceptable: la especificación tiene criterios de aceptación, y la batería corre con
  un comando conocido.

> To close this pending item I need evidence, not your word. (1) Write the test that proves what the
> item asks for, following its acceptance criteria. (2) Demonstrate that this test fails against the
> previous code: you may temporarily revert the change, or run the test against the old version, but
> show me the red output as a receipt, not a summary: the exact command, the identifier of the
> version it ran against, the count of failing tests and the exit code, pasted as they came out, so
> that I can rerun it myself with one command. (3) Show me the green output with the change. (4) Run
> the regression suite for the neighbouring items and show me it is still green. (5) Run the
> end-to-end test of the flow this item touches, from the screen to the backend, and show me the
> backend effect. (6) Do not replace with mocks the very part you are trying to test. If testing end
> to end requires something you lack (data, access, an environment), ask me for it; do not simulate
> what you do not have. If the previous version does not have the module at all (the first block of
> a new project), a failure to load is not a red: prove the red by planting one deliberate defect in
> the function you just wrote (an inverted condition, a deleted line), show me the test failing
> against that defect as the same kind of receipt, with the diff of the defect, and then revert it.
> Finally, the commit message says "proved red against [what]" and the test counts.

> [es]
> Para cerrar este pendiente necesito evidencia, no tu palabra. (1) Escribí el test que prueba lo
> que el pendiente pide, siguiendo sus criterios de aceptación. (2) Demostrá que ese test falla
> contra el código anterior: podés revertir temporalmente el cambio, o correr el test contra la
> versión vieja, pero mostrame la salida en rojo como un recibo, no como un resumen: el comando
> exacto, el identificador de la versión contra la que corrió, la cantidad de tests que fallan y el
> código de salida, pegados tal como salieron, para que yo pueda volver a correrlo con un solo
> comando. (3) Mostrame la salida en verde con el cambio. (4) Corré la regresión de los pendientes
> vecinos y mostrame que sigue en verde. (5) Corré la prueba de punta a punta del flujo que este
> pendiente toca, desde la pantalla hasta el backend, y mostrame el efecto en el backend. (6) No
> reemplaces con simulaciones justamente la parte que estás probando. Si probar de punta a punta
> requiere algo que no tenés (datos, acceso, un entorno), pedímelo; no simules lo que no tenés. Si
> la versión anterior no tiene el módulo (el primer bloque de un proyecto nuevo), un archivo que no
> carga no es un rojo: probá el rojo plantando un defecto a propósito en la función que acabás de
> escribir (una condición invertida, una línea borrada), mostrame el test fallando contra ese
> defecto como el mismo tipo de recibo, con el diff del defecto, y después revertilo. Por último,
> el mensaje del commit dice "probado en rojo contra [qué]" y los números de los tests.

**El rojo del primer bloque.** En el primer bloque de un proyecto nuevo no hay código anterior: el test nuevo falla porque el módulo no existe, y ese fallo no demuestra que el test distinga comportamiento. Por eso, cuando la versión anterior no tiene el módulo, el rojo se prueba **por mutación**: el agente planta un defecto a propósito en la función que acaba de escribir, muestra el test en rojo contra ese defecto (el recibo lleva el diff del defecto, para que vos veas que no fue trivial), lo revierte y muestra el verde. Es un solo mutante por pendiente, ejecutado y registrado como cualquier otro recibo; las pruebas de mutación sobre toda la base siguen siendo el refuerzo opcional del peldaño 9. (Decisión D-037, a partir de la práctica Turnera: seis recibos de rojo que solo decían "el archivo no carga".)

Qué le estoy pidiendo, cláusula por cláusula: (1) el test, guiado por los criterios de aceptación
del pendiente; (2) **el rojo demostrado como recibo** (comando, versión, números, código de
salida), que es la cláusula que distingue este método de "escribí tests" y la que impide que el
rojo sea un relato; (3) el verde; (4) la regresión de los vecinos en la
misma sesión, porque un cambio rompe cosas al lado; (5) la prueba de punta a punta del flujo
tocado, con el efecto en el backend a la vista; (6) no simular justamente lo que se prueba; y la
cláusula de completitud adaptada a este peldaño: si falta algo para probar de punta a punta,
**pedirlo, no simularlo**. El mensaje de commit con los números deja la evidencia donde vive el
código.

**Al cierre de cada bloque y antes de cada despliegue a producción:**

**Antes de enviar el prompt**, tenés que tener esto a mano:

- Todos los pendientes del bloque cerrados con la rutina (rojo, verde, regresión, punta a punta
  del flujo).
- La versión exacta que se va a promover, identificada (número de versión o commit) y desplegada
  en el entorno de prueba; decísela en el chat si no está en `docs/STATUS.md`.
- La lista de flujos que existen hasta ahora, escrita por vos a partir de los casos de uso del
  árbol semántico, para contrastarla con lo que el agente diga que cubrió. Sin tu lista, "todos
  los flujos" es lo que el agente recuerde.
- Estado mínimo aceptable: sabés cuántos flujos tiene que recorrer la batería antes de preguntarle
  cuántos recorrió.

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

**Antes de enviar el prompt**, tenés que tener esto a mano:

- El mensaje del agente diciendo que no se puede probar, leído con atención: ¿no se puede, o le
  falta algo? Si lo que falta es un insumo que vos tenés (datos, un acceso, un entorno), dáselo y
  no mandes este prompt. Este prompt es para cuando de verdad falta algo en el sistema
  (identificadores en los elementos de la pantalla, un modo de prueba del proveedor externo).
- Estado mínimo aceptable: distinguiste entre "me falta un insumo" (lo das) y "el sistema no es
  testeable acá" (este prompt).

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

> [es]
> Explicá por qué no se puede probar, qué habría que agregar para que se pueda, y abrí un
> pendiente para eso. El cambio no está cerrado hasta que se pueda probar.

Qué le estoy pidiendo: que "no se puede probar" no sea el final de la conversación sino el
principio de un pendiente. La no-testeabilidad es deuda, y la deuda se registra.

## 3. Resultado esperado

- El test nuevo en el repositorio, nombrado con el pendiente que cierra.
- En el reporte del agente y en el mensaje del commit: la salida en rojo como recibo (el comando,
  la versión contra la que corrió, cuántos fallan, el código de salida), la salida en verde, y la
  regresión en verde con sus números.
- La prueba de punta a punta del flujo tocado, con la evidencia de que el backend cambió (la
  fila, el registro, el estado).
- Al cierre de cada bloque y antes de producción: la batería completa de punta a punta en verde,
  por flujo, con la versión exacta.

## 4. Verificación de completitud

- ¿El reporte muestra el rojo? Con números: "4 de 8 fallan contra el criterio viejo". Si solo
  muestra verde, el peldaño no está subido.
- ¿El rojo es un recibo o un relato? Tiene que tener el comando exacto, la versión contra la que
  corrió, los números y el código de salida. Una vez por bloque, elegí un pendiente al azar y
  corré vos ese comando: el rojo tiene que volver a aparecer.
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
- El rojo viene contado en prosa ("el test falló como se esperaba") sin comando, sin versión y sin
  números. Un rojo sin recibo vale lo mismo que ninguno.
- Llegás a la salida a producción y la batería completa de punta a punta se corre por primera vez.
  Faltaron los cierres de bloque.
