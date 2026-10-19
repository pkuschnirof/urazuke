# Los contratos de peldaño

Un archivo por peldaño. Todos tienen el mismo esqueleto, y lo tienen a propósito, para que puedas
compararlos y para que, con el tiempo, el reflejo de leerlos sea automático: el encabezado con el
tramo, el cuándo, la forma y el tamaño (obligatorio o proporcional); para qué sirve; (1) el
contexto requerido, nombrado en forma genérica; (2) los prompts, **en inglés**, cada uno
precedido por un bloque **"Antes de enviar el prompt"** (los archivos y los insumos que tenés que
tener hechos vos antes de pegarlo, con su contenido y su estado mínimo), seguido de su traducción
y, debajo, de la explicación de qué le estoy pidiendo al modelo y por qué cada cláusula está ahí;
(3) el resultado esperado, con sus características; (4) la verificación de completitud,
que hacés sin leer código; (5) las señales de alarma, los síntomas de un peldaño mal subido.

Los prompts en inglés son una sola pieza, idéntica en las ocho versiones del documento;
`node build/build.mjs` los extrae a `prompts/` y verifica que ninguna traducción los haya
alterado. La traducción que acompaña a cada prompt es para que lo entiendas; al modelo se le pega
el inglés.

Los escribí a partir de lo que hice en tres sistemas que hoy están en producción, no los ejecuté
tal cual todavía. El primer proyecto que los use de punta a punta va a corregir varios; eso es
parte del peldaño 15. Cuando un contrato cita un caso real, lo hace con una marca `[Ref. N]` que
enlaza al [documento de referencias](../REFERENCIAS.md); el procedimiento queda limpio y el detalle
sigue a un clic.

| Peldaño | Archivo | Tramo | Cuándo |
|---|---|---|---|
| 0 — ¿Este proyecto se puede encarar así? | `peldano-00-elegibilidad.md` | arranque | primera semana, antes de todo |
| 1 — El contrato de convivencia | `peldano-01-contrato-de-convivencia.md` | arranque | primera semana, después de la elegibilidad |
| 2 — Definición del proyecto y lectura obligatoria | `peldano-02-definicion-y-lectura.md` | arranque | primera semana; se mantiene siempre |
| 3 — Dimensionar antes de la arquitectura | `peldano-03-dimensionar.md` | arranque | primera semana, antes del esqueleto |
| 4 — El esqueleto con sus compuertas | `peldano-04-esqueleto.md` | arranque | cierre de la primera semana |
| 5 — El plan son los pendientes | `peldano-05-pendientes.md` | bucle | al abrir cada bloque; cada sesión |
| 6 — Las decisiones se escriben junto al código | `peldano-06-decisiones.md` | bucle | cada vez que falta una regla |
| 7 — Tests como candados, probados en rojo | `peldano-07-tests-en-rojo.md` | bucle | al cerrar cada pendiente |
| 8 — Simetría productor/consumidor y anti-patrones | `peldano-08-simetria-y-antipatrones.md` | bucle | con cada cambio de contrato |
| 9 — Medir antes de construir | `peldano-09-medir.md` | bucle | antes de construir sobre un número |
| 10 — Verificación honesta y reporte proporcional | `peldano-10-verificacion-honesta.md` | bucle | en cada reporte |
| 11 — La auditoría periódica como insumo del plan | `peldano-11-auditoria.md` | operación | antes de producción; después, periódica |
| 12 — Fail-closed, candados y cero daño silencioso | `peldano-12-fail-closed.md` | operación | antes de construir lo que actúa sobre el mundo |
| 13 — Integración continua, entornos, secretos y despliegue | `peldano-13-ci-entornos-secretos-deploy.md` | operación | cierre hacia producción; rutina en cada despliegue |
| 14 — Documentación viva y manuales sin IA | `peldano-14-documentacion-viva.md` | operación | al cierre de cada bloque; completos antes de producción |
| 15 — El agente residente y la retrospectiva con número | `peldano-15-agente-residente-y-retrospectiva.md` | operación y cierre | al entrar en operación; al cierre de cada etapa |
| 16 — Observabilidad y trazabilidad totales, con nivel configurable | `peldano-16-observabilidad-y-trazabilidad.md` | calidad operativa | salida a producción, después del 13 y antes del 19 |
| 17 — Optimización de la capa de persistencia | `peldano-17-persistencia.md` | calidad operativa | salida a producción, después del 16 y antes del 19; se repite cuando una consulta sale de rango |
| 18 — Escaneo y solución de vulnerabilidades | `peldano-18-vulnerabilidades.md` | calidad operativa | antes del primer despliegue; después, en cada push y semanal |
| 19 — Pruebas de rendimiento y punto de ruptura | `peldano-19-rendimiento-y-punto-de-ruptura.md` | calidad operativa | antes del primer despliegue; antes de cada despliegue que cambie arquitectura, persistencia o un flujo crítico |
| 20 — Monitoreo de recursos y rendimiento, reporte cíclico | `peldano-20-monitoreo-de-recursos-y-rendimiento.md` | calidad operativa | semana del primer despliegue; después, corre solo y se lee por ciclo |
| 21 — Monitoreo de errores, reporte cíclico | `peldano-21-monitoreo-de-errores.md` | calidad operativa | semana del primer despliegue, junto con el 20 |

Tramos: **arranque** se sube una vez por proyecto; **bucle** se repite con cada cambio;
**operación** cuando el sistema ya está vivo. El 15 vuelve al 0 para el proyecto siguiente. La
línea de tiempo completa, con lo que pasa entre peldaño y peldaño, está en la Parte B del
documento principal.
