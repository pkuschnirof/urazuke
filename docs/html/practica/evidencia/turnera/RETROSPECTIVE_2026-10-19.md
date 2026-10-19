# Retrospectiva 2026-10-19 (ventana 2026-07-21 .. 2026-10-19)

Los numeros los calculo Forge desde sus registros (pendientes, recibos de evidencia,
overrides de compuertas, la escalera, los documentos en disco). Las secciones 2 y 3 las
escriben el dueno y el agente; la 3 tiene que terminar en una propuesta concreta de cambio
al metodo, con el incidente que la justifica.

## 1. Los numeros

| Medida | Valor |
|---|---|
| Pendientes del plan abiertos en la ventana | 25 |
| Pendientes del plan cerrados en la ventana | 18 |
| Cerrados con shipped | 12 |
| Cerrados con shipped CON reporte honesto | 12 |
| Bugs cerrados | 9 |
| Abiertos hoy | 7 |
| Abiertos hoy con especificacion | 6 |
| Abiertos hoy SIN especificacion | 1 |
| Recibos: rojo probado | 9 |
| Recibos: verde | 9 |
| Recibos: regresion | 11 |
| Recibos: punta a punta | 10 |
| Recibos: calidad | 1 |
| Recibos: mutacion | 0 |
| Recibos con veredicto NOT OK | 2 |
| Overrides de compuertas (con razon escrita) | 3 |
| Escalera: peldanos cerrados / verdes / rojos / a cargo del dueno | 23 / 1 / 0 / 0 de 24 |
| Auditorias en docs/ | 1 |
| Retrospectivas previas en docs/ | 1 |

## 2. Qué pasó (lo escribe el dueño con el agente)

Proyecto de práctica: una sola sesión de trabajo (2026-10-19), 24 peldaños, dos bloques de
construcción. La "dueña" es un rol de práctica; el tiempo humano es una estimación.

**Lo que salió bien, con su recibo**

- La compuerta de dimensionamiento (G9) rechazó la primera persistencia propuesta (JSON en
  memoria) antes de escribir una línea: `docs/SIZING.md` conserva el texto del rechazo. Sin ese
  rechazo el proyecto habría nacido con el defecto que el método cuenta en su post mortem.
- Seis pendientes del bloque 1 cerrados con cuatro recibos cada uno (RCP-001 a RCP-024); tres
  del bloque 2 con rojo de comportamiento contra `ab412fc` (RCP-034 a RCP-036: 3, 1 y 2 tests
  fallando) y no un rojo de "el módulo no existe".
- La auditoría la hizo otra sesión con otro modelo y encontró lo que la sesión constructora no
  veía: dos candados escritos en `docs/LOCKS.md` que no existían en el código y un estado
  terminal que se podía revivir (PND-039 a PND-041, cerrados en el bloque 2).
- Los doce cierres con `shipped` llevan reporte honesto armado por Forge desde los recibos.

**Lo que salió mal, con su recibo**

- El primer rojo del bloque 1 era un rojo trivial: el test fallaba porque el módulo no existía
  en el esqueleto (RCP-001 a RCP-006: "1 files failed"). Es un recibo válido pero flojo; el
  bloque 2 muestra el rojo bueno. Para un proyecto nuevo, el primer bloque no tiene otro "antes".
- Dos recibos NOT OK y tres overrides con razón: PND-031 y PND-032 (refactors sin cambio de
  comportamiento, sin rojo posible) y PND-044 (solo documentación). Están en el historial con
  su motivo.
- Herramienta: el runner de la prueba en rojo borró `node_modules` del proyecto al limpiar el
  worktree (junction atravesada), el contador de recibos leía archivos en vez de tests, y el
  reporte cíclico abrió seis "bugs" que eran errores de red del propio panel. Los tres se
  corrigieron en Forge el mismo día, con test cada uno. Están en `docs/GOTCHAS.md`.
- Cuatro tests viejos contradecían las reglas nuevas del bloque 2 (teléfono "111", ausente en
  un turno futuro) y se cambiaron a la vista en el mismo commit (`2cc4435`).

**Costo (estimado, no medido por Forge)**

- Tokens: no medidos en esta práctica; la retrospectiva siguiente los toma del registro del
  cerebro.
- Tiempo humano de la "dueña": ~2 horas de lectura de reportes y decisiones (estimación).
- Rondas por pendiente: los del bloque 1, una ronda; PND-039 a PND-041, dos (la segunda por
  los cuatro tests viejos).

## 3. Propuesta de cambio al método

**Peldaño 8, el rojo del primer bloque de un proyecto nuevo.** Hoy el contrato pide "el rojo
contra el código anterior". En el primer bloque de un proyecto nuevo no hay código anterior y el
rojo degenera en "el módulo no existe" (RCP-001 a RCP-006). Propuesta: que el peldaño 8 diga que
en el primer bloque el rojo se prueba **por mutación** (plantar un defecto en la función recién
escrita y mostrar que el test lo atrapa), igual que el cinturón de seguridad del camino
heredado (N4), y que el rojo contra la versión anterior rija desde el segundo bloque. El
incidente que lo justifica: seis recibos de rojo que no demuestran que el test distinga el
comportamiento, solo que el archivo no cargaba.

**Peldaño 22, los errores que cuentan.** El reporte cíclico tomó como errores del producto los
errores de la herramienta que lo monitorea. Propuesta: que el contrato del peldaño 22 diga
explícitamente que la captura de errores separa, por fuente, los del sistema de los de la
herramienta, y que el reporte los liste aparte. Incidente: PND-033 a PND-038, rechazados con
motivo.

## Prompt del peldano 23 (para la parte narrativa)

> [The stage / the project] is over. Do the retrospective with numbers, not impressions: what it cost (tokens, quota, my time), how many pending items, which ones took the most rounds and why, which incidents happened and which step of the ladder each falls into, and which step failed or was missing. If you lack the data for any figure (my time, for instance), ask me for it or mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder: which step is modified, how, and which incident justifies it. Write it to `docs/RETROSPECTIVE_[date].md`. Reply in my language.
