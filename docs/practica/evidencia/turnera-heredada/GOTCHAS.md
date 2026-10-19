# Anti-patrones y golpes — Turnera heredada (peldaño 11)

Cada vez que algo sale mal, acá queda la regla que lo evita. Se lee en cada sesión.

| Fecha | Golpe | Regla |
|---|---|---|
| 2026-10-19 | El defecto del recordatorio repetido venía de un comentario en el código ("los reprogramados tienen que recibir el aviso sí o sí, pedido de la dueña, mayo") que nadie podía confirmar; el commit que decía arreglarlo solo tocaba un CSS. | Una regla de negocio vive en `docs/DECISIONS.md` con fecha y quién la pidió, no en un comentario; un commit dice lo que hace y lo que hace se puede verificar. |
| 2026-10-19 | La idempotencia del recordatorio vivía solo en la regla pura de JavaScript; la base aceptaba pisar el aviso previo. Con dos procesos, o una llamada repetida, se enviaba dos veces. | Toda garantía de "una sola vez" se escribe también en la base (`WHERE ... IS NULL`), y tiene su test contra la base real. |
| 2026-10-19 | Dos tests de caracterización describían el defecto como "comportamiento actual". Al corregirlo se pusieron en rojo. | Los tests de caracterización que describen un defecto se cambian a la vista, en el mismo commit que lo corrige, y el commit lo dice. Nunca se silencian. |
| 2026-10-19 | El sistema llevaba meses en producción sin una sola copia de seguridad, con la base en WAL abierta por el proceso. | Antes de cualquier cambio, el respaldo: una copia consistente (`VACUUM INTO`) y una restauración probada con test. Es lo primero que bloquea. |
| 2026-10-19 | Al abrir el panel de Forge sobre esta copia, Forge resolvió el mismo identificador de proyecto que el original (los dos `package.json` se llaman "turnera") y pisó el registro del otro proyecto. | Una carpeta registrada conserva su identificador; Forge lo corrigió el mismo día. Si tenés dos copias de un sistema, dales nombres distintos o un `project_slug` explícito. |
