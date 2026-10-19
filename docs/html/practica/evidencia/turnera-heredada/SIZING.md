# Dimensionamiento de Turnera (N6)

Fecha: 2026-10-19. Base: `docs/VOLUME_SURVEY.md` (cifras de la dueña + mediciones sobre bases de
prueba; **ninguna medición es sobre la base real**). Pregunta del peldaño: si todo se multiplica
por diez, ¿qué se rompe primero, qué decisiones actuales aguantan, cuáles no, y qué conviene
decidir ahora porque hoy es barato y después caro?

## El tamaño real del problema

- Hoy [dueña]: 40 turnos/día, 250 días/año, 5 personas, 3 años → 30.000 turnos, 5,6 MiB de
  base, 1 PC.
- Por diez: 400 turnos/día (más de los 93 que la agenda admite [código: src/rules.js:3,40-46]:
  solo pasa si hay más profesionales o más sedes), 300.000 turnos, 57 MiB, quizá 50 personas o
  10 consultorios.

Es un sistema **chico** en cualquiera de los dos escenarios. Lo que decide es la forma, no el
tamaño.

## Qué se rompe primero en el "por diez" (en orden)

1. **`GET /api/turnos` sin filtro** [código: src/store.js:76-84]: 81 MB de JSON y 7,9 s con el
   proceso bloqueado (SQLite síncrono: durante esos segundos nadie más es atendido). La
   pantalla no lo usa, pero cualquier integración o curiosidad lo dispara. Medido [base de
   prueba]. Se rompe la **disponibilidad**, no los datos.
2. **La falta de idempotencia en la base** [código: src/store.js:162-168] y la **cláusula del
   reprogramado** [código: src/rules.js:105]: a 30.000 turnos es un paciente molesto; a 300.000
   con un envío real detrás son miles de mensajes repetidos. Se rompe la **confianza**.
3. **El contador global `TOTAL_ENVIADOS`** [código: src/server.js:91]: con un proceso es un número
   inútil; con dos procesos (dos sedes, un reinicio) es dos números distintos que nadie entiende.
   No aguanta ni el "por dos".
4. **El respaldo inexistente** (A-01): no se rompe "más" con el tamaño; a 5,6 MiB ya es la
   pérdida total de la agenda.
5. **`outbox.log` sin rotación** [código: src/server.js:104]: 1,9 MB/año hoy, 19 MB/año por diez.
   No rompe nada en años; molesta.
6. **Un solo proceso en una sola PC**: por diez con varias sedes significa varias PCs, y hoy la
   unicidad del horario vive en el código y no en la base [código: src/store.js:31,97-104]. Con
   una base por sede aguanta; con una base compartida por varios procesos, no.

## Qué decisiones actuales aguantan

| Decisión | ¿Aguanta x10? | Evidencia |
|---|---|---|
| **SQLite embebido en archivo** [código: src/store.js:6] | **Sí, en disco y en memoria**: 57 MiB a 300.000 filas; las tres consultas principales siguen por índice en 0,02–4,4 ms | medido [base de prueba] |
| Modo WAL + `busy_timeout` 5 s [código: src/store.js:44] | Sí para un proceso; para lectores concurrentes en la misma PC también | diseño de SQLite; no medido |
| Índices `(profesional, fecha, hora)` y `(fecha)` [código: src/store.js:31-32] | Sí: `EXPLAIN QUERY PLAN` muestra `SEARCH ... USING INDEX` en las tres consultas | medido |
| Resumen agregado en SQL [código: src/store.js:171-177] | Sí: 4,4 ms sobre 8.400 filas del mes | medido |
| Recordatorios materializando solo "mañana" [código: src/store.js:156-159] | Sí: 400 filas en 1,2 ms | medido |
| Transacciones `BEGIN IMMEDIATE` con el chequeo adentro [código: src/store.js:64-74,113] | Sí mientras haya un proceso por base | lectura del código |
| Cero dependencias [código: package.json] | Sí; el costo es `node:sqlite` experimental (A-19) | — |
| Vanilla JS, una pantalla [código: public/] | Sí para 93 filas por día; una agenda semanal o 30 profesionales la harían lenta de leer, no de ejecutar | [supuesto] |

## Qué no aguanta

| Decisión | Por qué no | Qué la reemplaza |
|---|---|---|
| Listado sin filtro obligatorio | 81 MB / 7,9 s bloqueado | exigir `fecha` (o rango) y/o paginar — barato hoy |
| Idempotencia solo en JS | se pisa la marca; cualquier cliente o regla nueva duplica | `WHERE reminder_sent_at IS NULL` o tabla `avisos (turno_id, fecha_aviso)` única — barato hoy |
| Contador global en memoria | no sobrevive ni a un reinicio ni a dos procesos | sacarlo, o contar en SQL (`COUNT(*) WHERE reminder_sent_at >= ...`) — barato hoy |
| Catálogo de profesionales y horarios en código [código: src/rules.js:3-7] | 3 profesionales fijos y los mismos 31 horarios todos los días; por diez significa más profesionales y agendas distintas | tabla `profesionales` y agenda por profesional — **caro**; solo si la dueña dice que crece |
| Un proceso por PC sin servicio | por diez significa varias PCs o un servidor, y hoy ni una sola se reinicia sola | servicio + respaldo (A-18, A-01) |
| `outbox.log` como único canal | no es un canal: es un archivo; por diez con envío real necesita cola, reintentos y proveedor | diseño del envío real, con candado (C-5) — después, cuando se decida |

## Decisiones asimétricas para tomar ahora (baratas hoy, caras después)

1. **Idempotencia del aviso en la base** (tabla `avisos` o condición en el `UPDATE`): entra con el
   bloque correctivo de D-01 que ya toca ese módulo. Hoy son 5 líneas; después de conectar un
   proveedor real, es un incidente con pacientes.
2. **Exigir `fecha` en `GET /api/turnos`** (o un límite): 2 líneas hoy; un servidor colgado
   después.
3. **Respaldo con checkpoint del WAL**: un script de 10 líneas hoy; la agenda perdida después.
4. **`engines.node` en `package.json`**: 1 línea hoy; una PC que no arranca después de una
   actualización.
5. **`.gitattributes` con `eol=lf`**: 1 línea hoy; diffs de 900 líneas después.
6. **No** tomar ahora: migrar de SQLite, agregar un framework, agendas por profesional. Aguantan
   o no están pedidos.

## Veredicto para registrar en Forge (G9)

Con las cifras de la dueña y el "por diez", **la persistencia actual (SQLite en archivo con los
dos índices) aguanta**; lo que no aguanta es periférico y barato: un endpoint sin límite, la
idempotencia en JS, un contador en memoria, la falta de respaldo. Ninguna decisión de
arquitectura necesita cambiar antes de abrir el primer bloque. Las cinco decisiones asimétricas
de arriba se proponen como pendientes de normalización emparejados con el módulo de recordatorios
(1, 3) y con el primer toque a `package.json` (4, 5); la 2 puede esperar.

Lo no medido, dicho explícitamente: base real, `outbox.log` real, concurrencia real, crecimiento
esperado y cantidad de sedes. El veredicto cambia si la dueña responde "vamos a abrir tres
consultorios más": entonces el catálogo en código y el proceso único pasan a ser el primer
problema.
