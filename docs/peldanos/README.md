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
parte del peldaño 23. Cuando un contrato cita un caso real, lo hace con una marca `[Ref. N]` que
enlaza al [documento de referencias](../REFERENCIAS.md); el procedimiento queda limpio y el detalle
sigue a un clic.

| Peldaño | Archivo | Tramo | Cuándo |
|---|---|---|---|
| 0 — ¿Este proyecto se puede encarar así? | `peldano-00-elegibilidad.md` | arranque | antes de todo |
| 1 — El contrato de convivencia | `peldano-01-contrato-de-convivencia.md` | arranque | después de la elegibilidad |
| 2 — Definición del proyecto y lectura obligatoria | `peldano-02-definicion-y-lectura.md` | arranque | después del contrato; se mantiene siempre |
| 3 — Dimensionar antes de la arquitectura | `peldano-03-dimensionar.md` | arranque | después de la definición, antes del esqueleto |
| 4 — El esqueleto con sus compuertas | `peldano-04-esqueleto.md` | arranque | cierre del arranque |
| 5 — El plan son los pendientes | `peldano-05-pendientes.md` | bucle | al abrir cada bloque; cada sesión |
| 6 — Las decisiones se escriben junto al código | `peldano-06-decisiones.md` | bucle | cada vez que falta una regla |
| 7 — Medir antes de construir | `peldano-07-medir.md` | bucle | antes de construir sobre un número |
| 8 — Tests como candados, probados en rojo | `peldano-08-tests-en-rojo.md` | bucle | al cerrar cada pendiente |
| 9 — Calidad del código verificada por máquina | `peldano-09-calidad-de-codigo.md` | bucle | se monta al abrir el primer bloque; corre en cada commit |
| 10 — Casos de prueba manual junto con la funcionalidad | `peldano-10-casos-de-prueba-manual.md` | bucle | con cada pendiente; ejecución humana al cierre de cada bloque, en la aceptación y después de cada despliegue |
| 11 — Simetría productor/consumidor y anti-patrones | `peldano-11-simetria-y-antipatrones.md` | bucle | con cada cambio de contrato |
| 12 — Verificación honesta y reporte proporcional | `peldano-12-verificacion-honesta.md` | bucle | en cada reporte |
| 13 — La auditoría periódica como insumo del plan | `peldano-13-auditoria.md` | salida a producción | antes de producción; después, periódica |
| 14 — Fail-closed, candados y cero daño silencioso | `peldano-14-fail-closed.md` | salida a producción | antes de construir lo que actúa sobre el mundo |
| 15 — Integración continua, entornos, secretos y despliegue | `peldano-15-ci-entornos-secretos-deploy.md` | salida a producción | cierre hacia producción; rutina en cada despliegue |
| 16 — Observabilidad y trazabilidad totales, con nivel configurable | `peldano-16-observabilidad-y-trazabilidad.md` | salida a producción | salida a producción, después del 15 y antes del 19 |
| 17 — Optimización de la capa de persistencia | `peldano-17-persistencia.md` | salida a producción | salida a producción, después del 16 y antes del 19; se repite cuando una consulta sale de rango |
| 18 — Escaneo y solución de vulnerabilidades | `peldano-18-vulnerabilidades.md` | salida a producción | antes del primer despliegue; después, en cada push y semanal |
| 19 — Pruebas de rendimiento y punto de ruptura | `peldano-19-rendimiento-y-punto-de-ruptura.md` | salida a producción | antes del primer despliegue; antes de cada despliegue que cambie arquitectura, persistencia o un flujo crítico |
| 20 — Documentación viva y manuales sin IA | `peldano-20-documentacion-viva.md` | salida a producción | al cierre de cada bloque; completos antes de producción |
| 21 — Monitoreo de recursos y rendimiento, reporte cíclico | `peldano-21-monitoreo-de-recursos-y-rendimiento.md` | operación | con el primer despliegue; después, corre solo y se lee por ciclo |
| 22 — Monitoreo de errores, reporte cíclico | `peldano-22-monitoreo-de-errores.md` | operación | con el primer despliegue, junto con el 21 |
| 23 — El agente residente y la retrospectiva con número | `peldano-23-agente-residente-y-retrospectiva.md` | operación | al entrar en operación; al cierre de cada etapa |

Tramos: **arranque** se sube una vez por proyecto; **bucle** se repite con cada cambio;
**operación** cuando el sistema ya está vivo. El 23 vuelve al 0 para el proyecto siguiente. La
línea de tiempo completa, con lo que pasa entre peldaño y peldaño, está en la Parte B del
documento principal.
