# Discrepancias (N2): lo que el código hace y lo que el negocio presumiblemente quiere

Fecha: 2026-10-19. **Ninguna está resuelta ni arreglada.** Cada una se escribe como: el código
hace X `[código: archivo:línea]`; el negocio dice Y `[dueña]` o `[supuesto]`; decisión: pendiente
de la dueña. Cuando decida, su frase exacta va a `docs/DECISIONS.md` y, si el sistema tiene que
cambiar, se abre un pendiente con su test en rojo. Mientras tanto, el comportamiento actual es la
especificación (regla 10) y está capturado en `tests/caracterizacion.test.js`.

Orden: primero el pedido de la etapa, después las del mismo módulo (recordatorios), después el
resto.

## D-01 — El reprogramado recibe el recordatorio todos los días hasta el turno

- El código hace: incluye en cada corrida a todo turno de mañana en estado `reprogramado`,
  tenga o no `reminder_sent_at` [código: src/rules.js:102-105]; como nada lo saca de ese estado,
  cada apretada del botón vuelve a escribirle una línea en `outbox.log` [código: src/server.js:93-110].
  El propio código lo dice: "TODO revisar: los reprogramados tienen que recibir el aviso si o si
  (pedido de la duena, mayo)" [código: src/rules.js:101]. Y dos comentarios afirman lo contrario:
  "Nunca repite" [código: src/server.js:90], "Idempotente por construccion" [código: src/rules.js:98].
- El negocio dice: "a los pacientes que reprogramaron les llega el recordatorio todos los días
  hasta el turno" como problema [dueña, pedido correctivo de esta etapa]. Lo que probablemente
  quiso en mayo: que un turno reprogramado **vuelva a avisarse una vez** con la fecha nueva
  [supuesto]; eso ya lo garantiza el `reminder_sent_at = NULL` de reprogramar
  [código: src/store.js:149], sin necesidad de la cláusula de la línea 105.
- Evidencia: test "comportamiento actual: el reprogramado vuelve a recibir el aviso en cada
  corrida": 3 corridas → 3 líneas para el mismo turno.
- Decisión: **pendiente de la dueña** (¿una sola vez con la fecha nueva? ¿o todos los días era
  lo pedido en mayo?).

## D-02 — Marcar avisos no es idempotente en la base

- El código hace: `UPDATE turnos SET reminder_sent_at = ?, updated_at = ? WHERE id = ?` sin
  condición `reminder_sent_at IS NULL` [código: src/store.js:162-168]; la única protección contra
  el doble aviso es la regla pura `seleccionarRecordatorios` [código: src/rules.js:99-106]. Si una
  regla futura (o un cliente de la API) manda un id ya avisado, se pisa la fecha del primer aviso
  y se pierde el rastro.
- El negocio dice: un paciente recibe un aviso por turno [supuesto].
- Evidencia: test "comportamiento actual: no es idempotente en la base; pisa reminder_sent_at".
- Decisión: pendiente de la dueña (es técnica, pero define si "cuándo le avisamos" tiene que ser
  un dato confiable).

## D-03 — Contador global `TOTAL_ENVIADOS` y `console.log` suelto

- El código hace: un contador en memoria del proceso [código: src/server.js:91], que se pierde al
  reiniciar, lo comparten todos los servidores del proceso, nunca se expone por ninguna ruta
  (el comentario dice "lo usa el resumen de la pantalla", pero `public/app.js` no lo lee), y se
  imprime con `console.log('enviados', n, 'total', TOTAL)` rompiendo el formato JSON del log
  [código: src/server.js:106-107].
- El negocio dice: nada; nadie ve ese número [supuesto].
- Evidencia: test "comportamiento actual: el contador TOTAL_ENVIADOS es global del proceso".
- Decisión: pendiente de la dueña (¿quiere ver "cuántos avisos se mandaron este mes"? Si sí, va a
  la base, no a la memoria; si no, el contador es código muerto).

## D-04 — No había tests

- El código hace: `package.json` original solo tenía `start` [código: `git show 8074897:package.json`].
- El negocio dice: nada; nunca supo que no los había [supuesto].
- Decisión: cubierto en N4 con la batería de caracterización (36 tests). Queda la decisión de la
  dueña sobre si exige además un test de navegador.

## D-05 — No había cadena de integración continua

- El código hace: no existía `.github/` [código: `git ls-tree HEAD`].
- Decisión: cubierto en N4 (`.github/workflows/ci.yml`); falta verla correr en GitHub (requiere
  push: lo decide el coordinador).

## D-06 — No hay respaldo de la agenda

- El código hace: los datos viven en `data/turnera.db` (+ `-wal`) fuera de git
  [código: src/server.js:18] [código: .gitignore:2]; nada los copia [código: `src/` entero]; el
  README no lo menciona [documentación: README.md].
- El negocio dice: presumiblemente cree que "está guardado" [supuesto].
- Decisión: pendiente de la dueña (¿hay copias a mano? ¿dónde?). Es el hallazgo A-01, bloqueante.

## D-07 — No se puede reprogramar desde la pantalla

- El código hace: la API tiene `PATCH /api/turnos/:id` [código: src/server.js:71]; la pantalla
  solo tiene Confirmar / Ausente / Cancelar [código: public/app.js:67-68]. Para que exista un
  turno `reprogramado` alguien tiene que llamar a la API por fuera.
- El negocio dice: "los pacientes que reprogramaron" existen [dueña]. ¿Cómo los reprograman?
  ¿Cancelan y crean uno nuevo (entonces nunca quedan en `reprogramado` y el reclamo tendría otra
  causa)? ¿El conocido les dejó un script? [supuesto].
- Decisión: pendiente de la dueña. **Importa para D-01**: si en el consultorio reprograman
  cancelando y creando, el turno nuevo nace `pendiente`, se avisa una vez, y el reclamo tendría
  que explicarse de otra forma.

## D-08 — Se aceptan turnos en fechas pasadas

- El código hace: valida solo el formato y que la fecha exista [código: src/rules.js:23-30,63].
- El negocio dice: un turno es para el futuro [supuesto]; quizá cargan turnos ya atendidos para
  el resumen [supuesto].
- Evidencia: test "comportamiento actual: acepta un turno en una fecha pasada".
- Decisión: pendiente de la dueña.

## D-09 — Cualquier cambio de estado está permitido

- El código hace: `cambiarEstado` acepta cualquier estado desde cualquier estado; solo revalida
  sobreturno al salir de `cancelado` [código: src/store.js:123-135]. La pantalla deshabilita los
  botones del cancelado [código: public/app.js:43], pero un ausente se puede confirmar y un
  confirmado marcar ausente y volver.
- El negocio dice: [supuesto] un ausente es definitivo; un cancelado no se "confirma".
- Evidencia: test "comportamiento actual: cualquier transición entre estados está permitida".
- Decisión: pendiente de la dueña.

## D-10 — Reprogramar un turno cancelado lo revive

- El código hace: `reprogramar` no mira el estado previo; deja `reprogramado`
  [código: src/store.js:142-153].
- El negocio dice: [supuesto] un cancelado se reprograma solo si el paciente volvió a pedir;
  podría ser deseado.
- Evidencia: test "comportamiento actual: reprogramar un turno cancelado lo revive como reprogramado".
- Decisión: pendiente de la dueña.

## D-11 — La API acepta el estado inicial en el alta

- El código hace: `estado: datos.estado ?? 'pendiente'` [código: src/store.js:112]; la pantalla
  nunca lo manda [código: public/app.js:111].
- El negocio dice: nada [supuesto: no lo sabe].
- Evidencia: test "comportamiento actual: el cliente puede fijar el estado inicial".
- Decisión: pendiente (técnica; probablemente "se queda y se documenta").

## D-12 — Regla duplicada y muerta: `resumenMensual`

- El código hace: `rules.js:108-112` calcula el resumen en JS; nadie la usa; `store.resumen` lo
  hace en SQL [código: src/store.js:171-177]. Dos reglas para lo mismo pueden divergir.
- Decisión: pendiente (regla 9: se anota, no se borra de paso).

## D-13 — La historia de git no cuenta cuándo entró la cláusula del reprogramado

- El código hace: el commit `005db84` "arreglos varios y recordatorio a los reprogramados" solo
  agrega la línea `/* arreglo del boton (pedido de la duena) */` a `public/style.css`
  [código: `git show 005db84 --stat`]; la cláusula de `rules.js:105` ya estaba en el primer
  commit `8074897`.
- El negocio dice: "en mayo pedí algo" [código: src/rules.js:101, cita indirecta].
- Decisión: pendiente de la dueña (¿qué pidió exactamente en mayo?).

## D-14 — "Enviar recordatorios" no envía nada

- El código hace: escribe líneas en `outbox.log` [código: src/server.js:100-104]; el README lo
  aclara [documentación: README.md:5]; la pantalla dice "Enviados N recordatorios"
  [código: public/app.js:129].
- El negocio dice: si la dueña reporta que "les llega el recordatorio todos los días", **algo o
  alguien** manda esos mensajes a partir del archivo, o la dueña habla de lo que ve en pantalla
  [supuesto]. Hueco importante: ver `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`.
- Decisión: pendiente de la dueña (¿quién lee `outbox.log` y manda los WhatsApp?).

**Decisión de la dueña (2026-10-19, PND-031):** hoy nadie lee `data/outbox.log` ni manda
mensajes a mano desde ahí; los recordatorios reales se hacen por teléfono mirando la agenda. Por
eso el defecto de R1 no llegó a ningún paciente por el sistema (llegó por la recepcionista, que
llamaba a quien figuraba en la lista cada día). Queda escrito: el envío real se decide en otra
etapa, con un proveedor en modo de prueba y los candados de `docs/LOCKS.md` antes.


## D-15 — El cuerpo `hoy` permite avisar "mañana" respecto de cualquier fecha

- El código hace: `hoy = body.hoy ?? fechaLocal()` [código: src/server.js:95]; la pantalla manda
  `{}` [código: public/app.js:128].
- Decisión: pendiente (técnica; útil para pruebas, riesgoso si alguien lo usa mal).

## D-16 — Los recordatorios son manuales

- El código hace: solo salen cuando alguien aprieta el botón [código: src/server.js:124]; no hay
  tarea programada [código: `src/` sin temporizadores].
- El negocio dice: [supuesto] la recepción lo aprieta cada tarde; si un día no lo aprieta, nadie
  recibe aviso.
- Decisión: pendiente de la dueña (¿quiere que salga solo?). Si sí, es evolutivo y necesita el
  candado de `docs/LOCKS.md` antes.

## D-17 — "Turnos" del resumen cuenta cancelados y ausentes

- El código hace: `turnos` = suma de todos los estados del mes [código: src/store.js:174-176].
- El negocio dice: [supuesto] "Turnos" = atendidos, o = agendados; no lo sabemos.
- Decisión: pendiente de la dueña.

## D-18 — Todos los días tienen los mismos 31 horarios

- El código hace: 08:00–18:00 cada 20 min, para los tres profesionales, sin fines de semana ni
  feriados [código: src/rules.js:40-46].
- El negocio dice: [supuesto] cada profesional atiende ciertos días y horas.
- Decisión: pendiente de la dueña (si lo quiere, es evolutivo grande).

## D-19 — El teléfono no se valida

- El código hace: cualquier texto no vacío [código: src/rules.js:61].
- El negocio dice: [supuesto] cuando se mande WhatsApp de verdad, el número tiene que ser válido.
- Decisión: pendiente de la dueña.

## Resumen para convertir en pendientes

| Id | Tema | Módulo | Capturado en test |
|---|---|---|---|
| D-01 | reprogramado re-avisado (pedido correctivo) | recordatorios (`rules.js`) | sí |
| D-02 | marcar avisos no idempotente en BD | recordatorios (`store.js`) | sí |
| D-03 | contador global + console.log | recordatorios (`server.js`) | sí |
| D-04 | sin tests | — | cubierto N4 |
| D-05 | sin CI | — | cubierto N4 |
| D-06 | sin respaldo | operación | — |
| D-07 | no hay reprogramar en pantalla | pantalla | — |
| D-08 | fechas pasadas | alta (`rules.js`) | sí |
| D-09 | transiciones libres | estado (`store.js`) | sí |
| D-10 | reprogramar revive cancelado | reprogramar (`store.js`) | sí |
| D-11 | estado en el alta por API | alta (`store.js`) | sí |
| D-12 | `resumenMensual` muerta/duplicada | `rules.js` | — |
| D-13 | historia git vs cláusula | — | — |
| D-14 | quién manda los mensajes de verdad | recordatorios / afuera | — |
| D-15 | `hoy` libre en el envío | recordatorios (`server.js`) | — |
| D-16 | envío manual, sin tarea programada | recordatorios | — |
| D-17 | "Turnos" incluye cancelados/ausentes | resumen (`store.js`) | sí |
| D-18 | mismos horarios todos los días | catálogo (`rules.js`) | — |
| D-19 | teléfono sin validar | alta (`rules.js`) | — |
