# Mediciones — Turnera (peldaño 7)

Cada número viene con el comando que lo produce y la fecha. El medidor vive en el repositorio y
tiene su propio test (`tests/meter.test.js`): se lo verificó contra un caso donde la respuesta se
conoce de antemano (una base de 100 filas contada por otro camino), contra su determinismo (el
mismo seed produce la misma base) y contra el caso negativo (sin el índice, el medidor lo dice).

## Hipótesis

La agenda del día (`GET /api/turnos?fecha=`) usa el índice por fecha y su tiempo **no depende del
total de filas** de la tabla. Es la hipótesis que sostiene la elección de `SIZING.md` (base SQL,
paginación por clave): si fuera falsa, a 180.000 filas la pantalla principal se degradaría.

## Medición (2026-10-19)

| Comando | Filas totales | Filas del día | Índice usado | p50 | máx |
|---|---|---|---|---|---|
| `node scripts/meter-agenda.mjs --rows 30000 --fecha 2027-03-10` | 30.000 | 13 | sí | 0,088 ms | 1,157 ms |
| `node scripts/meter-agenda.mjs --rows 180000 --fecha 2027-03-10` | 180.000 | 53 | sí | 0,653 ms | 1,27 ms |

Plan de consulta, textual: `SEARCH turnos USING INDEX idx_turnos_fecha (fecha=?) | USE TEMP B-TREE
FOR ORDER BY`.

Lectura: seis veces más filas en la tabla, el tiempo del día sigue debajo de un milisegundo. La
diferencia entre 0,088 y 0,653 ms se explica por las filas del día (13 contra 53), no por el total.
La hipótesis se sostiene.

## Auditoría en los dos sentidos

- Del código a la medición: la consulta que mide el medidor es la misma que usa `src/store.js`
  en `listar({ fecha })` (misma cláusula `WHERE fecha = ?`); el plan se pide sobre esa consulta.
- De la medición al código: el índice `idx_turnos_fecha` que aparece en el plan existe en el
  esquema de `src/store.js`; el test negativo lo borra y comprueba que el medidor lo nota.

## Lo aproximado, marcado

- Los tiempos son de una máquina de desarrollo (4 núcleos, 8 GB) con la base en disco local, 20
  muestras. En CI pueden ser hasta diez veces mayores: por eso el presupuesto es generoso.
- La base sembrada reparte los turnos al azar en diez años; un consultorio real los concentra en
  días hábiles. Eso cambia las filas por día (más), no el uso del índice.

## Presupuesto (protegido por test)

- Agenda del día a 20.000 filas: medido p50 0,137 ms; presupuesto **20 ms** (margen ×100) y el
  índice obligatorio. Test: `tests/meter.test.js` → "entra en el presupuesto". Si se supera, la
  cadena se pone en rojo.
