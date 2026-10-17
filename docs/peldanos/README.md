# Los contratos de peldaño

Un archivo por peldaño. Cada uno tiene el mismo esqueleto: para qué sirve; (1) contexto requerido,
nombrado en forma genérica; (2) los prompts textuales, con la cláusula de completitud; (3) el
resultado esperado, con sus características; (4) la verificación de completitud, que hace el dueño
sin leer código.

Están escritos desde lo que hicimos en los tres repositorios, no ejecutados tal cual todavía. El
primer proyecto que los use de punta a punta va a corregir varios: eso es parte del peldaño 15.

| Peldaño | Archivo | Tramo | Forma |
|---|---|---|---|
| 0 — ¿Este proyecto se puede encarar así? | `peldano-00-elegibilidad.md` | arranque | conversación (en elaboración con Pablo) |
| 1 — El contrato de convivencia | `peldano-01-contrato-de-convivencia.md` | arranque | un tiro + ajuste |
| 2 — Definición del proyecto y lectura obligatoria | `peldano-02-definicion-y-lectura.md` | arranque | conversación |
| 3 — Dimensionar antes de la arquitectura | `peldano-03-dimensionar.md` | arranque | conversación |
| 4 — El esqueleto con sus compuertas | `peldano-04-esqueleto.md` | arranque | un tiro largo + aprobación visual |
| 5 — El plan son los pendientes | `peldano-05-pendientes.md` | bucle | un tiro + rutina |
| 6 — Las decisiones se escriben junto al código | `peldano-06-decisiones.md` | bucle | conversación corta, cada vez |
| 7 — Tests como candados, probados en rojo | `peldano-07-tests-en-rojo.md` | bucle | rutina de cada cambio |
| 8 — Simetría productor/consumidor y anti-patrones | `peldano-08-simetria-y-antipatrones.md` | bucle | automática + archivo que crece |
| 9 — Medir antes de construir | `peldano-09-medir.md` | bucle | un tiro por medición |
| 10 — Verificación honesta y reporte proporcional | `peldano-10-verificacion-honesta.md` | bucle | rutina de todo reporte |
| 11 — La auditoría periódica como insumo del plan | `peldano-11-auditoria.md` | operación | un tiro largo, auditor distinto |
| 12 — Fail-closed, candados y cero daño silencioso | `peldano-12-fail-closed.md` | operación | conversación |
| 13 — Integración continua, entornos, secretos y despliegue | `peldano-13-ci-entornos-secretos-deploy.md` | operación | un tiro + rutina de despliegue |
| 14 — Documentación viva y manuales sin IA | `peldano-14-documentacion-viva.md` | operación | rutina + un tiro largo |
| 15 — El agente residente y la retrospectiva con número | `peldano-15-agente-residente-y-retrospectiva.md` | operación y cierre | dos partes |

Tramos: **arranque** se sube una vez por proyecto; **bucle** se repite con cada cambio;
**operación** cuando el sistema ya está vivo. El 15 vuelve al 0 para el próximo proyecto.
