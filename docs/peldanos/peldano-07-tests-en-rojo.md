# Peldaño 7 — Tests como candados, probados en rojo (contrato del peldaño)

**Tramo:** bucle (cada cambio).
**Forma:** un solo tiro; el agente ejecuta y reporta, el dueño lee el reporte.

## Para qué sirve

Un test que nunca viste fallar no sabés si prueba algo. La regla acá no es "escribí tests": es
"demostrá que el test se pone en rojo contra el código viejo, y después en verde con el nuevo".
Evita los tests que pasan porque no prueban nada, y el verde que esconde un bug.

## 1. Contexto requerido

- El cambio ya implementado (por defecto los tests van después de implementar; "primero el
  test" queda como opción para alcances chicos y bien definidos).
- El pendiente que origina el cambio, con su "cómo se verifica".
- La batería existente y el comando para correrla (peldaño 4).

## 2. Prompts

**Rutina (va en el contrato, se aplica en cada cambio):**

> Para cerrar este pendiente necesito evidencia, no tu palabra. (1) Escribí el test que prueba
> lo que el pendiente pide. (2) **Demostrá que ese test falla contra el código anterior**: podés
> revertir temporalmente el cambio, o aplicar el test a la versión vieja, pero mostrame la
> salida en rojo. (3) Mostrame la salida en verde con el cambio. (4) Corré la regresión de los
> pendientes vecinos y mostrame que sigue en verde. (5) No reemplaces con simulaciones la parte
> que justamente querés probar. **Si para probar de punta a punta te falta algo (un dato, un
> acceso, un entorno), pedímelo; no simules lo que no tenés.** Al final, el mensaje del commit
> dice "probado en rojo contra [qué]" y los números de los tests.

**Cuando el agente dice que no se puede probar:**

> Explicame por qué no se puede probar, qué habría que agregar para que se pueda, y abrí un
> pendiente para eso. El cambio no se cierra hasta que se pueda probar.

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
