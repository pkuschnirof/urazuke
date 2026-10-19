# Retrospectiva 2026-10-19 (ventana 2026-07-21 .. 2026-10-19)

Los numeros los calculo Forge desde sus registros (pendientes, recibos de evidencia,
overrides de compuertas, la escalera, los documentos en disco). Las secciones 2 y 3 las
escriben el dueno y el agente; la 3 tiene que terminar en una propuesta concreta de cambio
al metodo, con el incidente que la justifica.

## 1. Los numeros

| Medida | Valor |
|---|---|
| Pendientes del plan abiertos en la ventana | 5 |
| Pendientes del plan cerrados en la ventana | 5 |
| Cerrados con shipped | 4 |
| Cerrados con shipped CON reporte honesto | 4 |
| Bugs cerrados | 2 |
| Abiertos hoy | 0 |
| Abiertos hoy con especificacion | 0 |
| Abiertos hoy SIN especificacion | 0 |
| Recibos: rojo probado | 3 |
| Recibos: verde | 3 |
| Recibos: regresion | 3 |
| Recibos: punta a punta | 2 |
| Recibos: calidad | 1 |
| Recibos: mutacion | 0 |
| Recibos con veredicto NOT OK | 0 |
| Overrides de compuertas (con razon escrita) | 1 |
| Escalera: peldanos cerrados / verdes / rojos / a cargo del dueno | 26 / 1 / 0 / 0 de 27 |
| Auditorias en docs/ | 1 |
| Retrospectivas previas en docs/ | 2 |

## 2. Qué pasó (lo escribe el dueño con el agente)

Práctica del camino evolutivo-correctivo sobre una copia "heredada" de Turnera, en una sesión
(2026-10-19). La "dueña" es un rol de práctica.

**Lo que salió bien, con su recibo**

- El defecto que la dueña sufría (el recordatorio repetido a los reprogramados) se corrigió con
  un **rojo de verdad**: RCP-001, 2 tests fallando contra `90d53bb`, la versión con el defecto;
  verde con el cambio (RCP-004), regresión de 41 tests (RCP-008), punta a punta por la API hasta
  el archivo de salida (RCP-010). El cambio fue de dos líneas más un `WHERE`.
- Nada se reescribió (regla 7). El contador global y el `console.log` siguen ahí, anotados como
  deuda "se paga al tocar" (D-03, A-13). Lo raro se escribió, no se arregló de paso: 19
  discrepancias y 20 hallazgos, cada uno con su marca de velocidad.
- Lo que bloqueaba fue primero: el respaldo (PND-028) con una restauración probada por test
  (RCP-003 rojo porque el script no existía, RCP-006 verde).
- El cinturón de caracterización (30 tests, N4) atrapó su propio rojo por mutación antes de
  tocar nada, y después avisó cuando dos de sus tests contradecían la regla nueva: se cambiaron
  a la vista en el mismo commit (`a6f06d9`).

**Lo que salió mal, con su recibo**

- La auditoría (N3) la hizo la misma sesión que la lectura (N2); el método prefiere un auditor
  aparte. El informe lo declara.
- El primer reporte cíclico abrió una falsa alarma de dimensionamiento (PND-032, rechazada con
  motivo): la base de prueba de 30.000 filas cubre tres años y se pasó como si fuera uno. El
  número era correcto; la ventana, no.
- Herramienta: al abrir el panel de Forge sobre esta copia, Forge resolvió el mismo
  identificador que el proyecto original (los dos `package.json` se llaman "turnera") y pisó el
  registro del otro. Se corrigió en Forge el mismo día, con test. Está en `docs/GOTCHAS.md`.
- No hubo base de producción: todo lo medido es sobre bases de prueba sembradas, marcado así.

**Costo (estimado, no medido por Forge)**

- Tokens: no medidos; dos sesiones del agente (N0 a N6, y los documentos de salida) más la
  coordinación.
- Tiempo humano de la "dueña": ~1 hora (el pedido, las decisiones D-003 y D-14, la lectura de
  los reportes). Estimación.

## 3. Propuesta de cambio al método

**N6 y el peldaño 21: la ventana del número.** El dimensionamiento se revalida comparando "filas
observadas por año" contra lo declarado; el operador pasa cuántas filas y en cuántos días. Es
fácil pasar las filas de tres años como si fueran de uno (incidente: PND-032, falsa alarma).
Propuesta: que el contrato del peldaño 21 pida que la medición cíclica lleve siempre su
**ventana explícita y verificable** (primer y último `created_at` de la base, no un número a
mano), y que Forge la derive de la base cuando hay `count_sql`, sin dejar que el operador la
escriba. El incidente lo justifica: un número correcto con una ventana equivocada abrió un
pendiente falso.

**N3: el auditor aparte como compuerta, no como preferencia.** En esta práctica la auditoría la
hizo la misma sesión que leyó el sistema. El contrato de N3 dice "idealmente otra sesión".
Propuesta: que Forge registre quién produjo `docs/AUDIT_*.md` (la sesión y el modelo) y que la
compuerta de N3 exija que sea distinto del que escribió `docs/SEMANTIC_TREE.md`, con override
razonado. Incidente: esta misma retrospectiva.

## Prompt del peldano 23 (para la parte narrativa)

> [The stage / the project] is over. Do the retrospective with numbers, not impressions: what it cost (tokens, quota, my time), how many pending items, which ones took the most rounds and why, which incidents happened and which step of the ladder each falls into, and which step failed or was missing. If you lack the data for any figure (my time, for instance), ask me for it or mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder: which step is modified, how, and which incident justifies it. Write it to `docs/RETROSPECTIVE_[date].md`. Reply in my language.
