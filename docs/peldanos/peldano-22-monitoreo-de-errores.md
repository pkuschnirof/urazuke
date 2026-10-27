# Peldaño 22 — Monitoreo de errores y reporte cíclico: ningún error sin pendiente (contrato del peldaño)

**Tramo:** operación.
**Cuándo:** se monta en la fase de operación, con el primer despliegue, junto con el 21, sobre los registros del 16; desde entonces corre solo, con alertas en el momento y un
reporte cíclico que se lee con el dueño. Cada error nuevo entra al bucle como pendiente
correctivo y se cierra con el test que lo reproduce en rojo. En un legado, la primera lectura es
la línea base: los errores que ya existían el primer día se vuelven pendientes con su marca de
velocidad, y ninguno queda como "conocido" sin un pendiente que diga por qué se tolera y hasta
cuándo.
**Forma:** un solo tiro para montar; después, rutina cíclica.
**Tamaño:** obligatorio en todo proyecto con usuarios: la captura centralizada y el reporte no se
negocian; las alertas en el momento, proporcionales.

## Para qué sirve

Un sistema en producción produce errores que ningún usuario reporta: el que vio la pantalla en
blanco y volvió a intentar, el de la tarea nocturna que falló y nadie mira, el de la llamada
externa que devolvió un error y el código tragó. Si no los capturo, no existen hasta que
existen demasiado. Este peldaño es la contraparte del 21: aquel vigila el rendimiento, este
vigila los errores, y los dos terminan en el mismo lugar, el bucle, como pendientes correctivos.
Las reglas de fondo son dos. **Ningún error sin pendiente**: un error nuevo abre uno, y se cierra
con el test que lo reproduce en rojo, como pide el modo correctivo del camino evolutivo. Y **no
existe el "error conocido"** sin un pendiente que diga por qué se tolera y hasta cuándo; "ese
error siempre estuvo" es la frase con la que un sistema se pudre. El error de autenticación
reportado como éxito [Ref. 43](../REFERENCIAS.md#ref-43) y las cuatro rondas hasta la causa raíz
[Ref. 22](../REFERENCIAS.md#ref-22) son los dos antecedentes: el primero, de que los errores se
esconden si no se los captura por máquina; el segundo, de que un error sin reproducción se
arregla varias veces.

**Si sos principiante.** Un *error* es cualquier cosa que el sistema intentó hacer y no pudo:
una pantalla que no cargó, una tarea nocturna que se cortó, una llamada a otro servicio que
falló. Una *excepción no manejada* es un error que el código no previó y que corta lo que estaba
haciendo. *Capturar* un error es guardarlo con todos sus datos (cuándo, en qué versión, con qué
identificador, la *pila*, que es la lista de pasos del programa hasta el fallo) en un solo lugar
central, en vez de dejarlo perderse en la pantalla de un usuario. *Agrupar* es juntar las mil
veces que pasó el mismo error en una sola entrada con un contador. Y la *tasa de error por
flujo* es, de cada cien veces que alguien cargó un turno, cuántas fallaron.

## 1. Contexto requerido

Lo que sigue es la lista genérica. Los archivos concretos que tenés que tener hechos antes de cada
prompt, con su contenido y su estado mínimo, están en la sección 2, en el bloque "Antes de enviar
el prompt" que precede a cada uno.

- La observabilidad (16): los errores llegan con identificador de correlación, versión y actor.
- La tabla de candados (14): los errores en acciones con consecuencia son alerta inmediata.
- Producción desplegada (15), con el navegador del usuario incluido en la captura.
- El canal de alertas y el ciclo del reporte, compartidos con el 21.

## 2. Prompts

**Inicial (montar y demostrar):**

**Antes de enviar el prompt**, esto tiene que existir, y lo hacés vos (o el negocio con vos), no
el agente:

- `docs/OBSERVABILITY.md` (16) cerrado: los errores tienen que salir con identificador, versión,
  entorno y actor.
- `docs/LOCKS.md` (14): la lista de acciones con consecuencia, cuyos errores son alerta en el
  momento.
- El canal y el ciclo del reporte, los mismos del peldaño 21, decididos con el dueño; y el
  número de ocurrencias por hora de un error conocido a partir del cual querés alerta, para el
  hueco del prompt.
- Dónde se guardan los errores y por cuánto tiempo (el mismo lugar que los registros, o un
  servicio de captura de errores), decidido por vos, con la regla de que no contienen datos
  personales.
- Estado mínimo aceptable: los errores ya salen con identificador (16) y hay un canal con una
  persona que lo lee.

> We are going to make sure that no error in production goes unseen. Using the records of step 16,
> set up: (1) centralized capture of every error and unhandled exception in the backend, in the jobs
> and in the user's browser, with the correlation id, the version, the environment, the actor (never
> personal data) and the stack; (2) grouping of errors by cause, so that one defect is one entry,
> with its count, first and last occurrence, versions affected and the flows it touches; (3) alerts
> to [channel] for every new error type, for a known error that crosses [N] occurrences per hour,
> and for any error inside a consequential action of `docs/LOCKS.md`; (4) a cyclic report, [weekly],
> generated automatically, with: new errors, recurring errors and their trend, the errors fixed in
> the period with their pending item, the error rate per flow against the previous period, and what
> you propose for each open one; (5) the rule that every new error type opens a corrective pending
> item, closed with the test that reproduces it in red, and that there is no "known error" without a
> pending item that says why it is tolerated and until when. Show me one error provoked on purpose
> in the test environment, in the browser, followed by its id to the backend record, the alert and
> the report. Tag every captured error with its source, and keep the errors of the tools that watch
> the system (the panel, the resident agent, the monitoring itself) apart from the errors of the
> system: the report lists them in a separate section, and only the system's errors open pending
> items. Document it in `docs/MONITORING.md`.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [es]
> Vamos a asegurarnos de que ningún error en producción pase sin ser visto. Con los registros
> del peldaño 16, armá: (1) la captura centralizada de cada error y excepción no manejada en el
> backend, en las tareas y en el navegador del usuario, con el identificador de correlación, la
> versión, el entorno, el actor (nunca datos personales) y la pila; (2) el agrupamiento de errores
> por causa, de modo que un defecto sea una entrada, con su cantidad, primera y última ocurrencia,
> versiones afectadas y los flujos que toca; (3) alertas a [canal] por cada tipo de error nuevo,
> por un error conocido que supere [N] ocurrencias por hora, y por cualquier error dentro de una
> acción con consecuencia de `docs/LOCKS.md`; (4) un reporte cíclico, [semanal], generado
> automáticamente, con: errores nuevos, errores recurrentes y su tendencia, los errores arreglados
> en el período con su pendiente, la tasa de error por flujo contra el período anterior, y qué
> proponés para cada uno abierto; (5) la regla de que cada tipo de error nuevo abre un pendiente
> correctivo, cerrado con el test que lo reproduce en rojo, y de que no existe el "error conocido"
> sin un pendiente que diga por qué se tolera y hasta cuándo. Mostrame un error provocado a
> propósito en el entorno de prueba, en el navegador, seguido por su identificador hasta el
> registro del backend, la alerta y el reporte. Etiquetá cada error capturado con su fuente, y
> mantené separados los errores de las herramientas que observan el sistema (el panel, el agente
> residente, el propio monitoreo) de los errores del sistema: el reporte los lista en una sección
> aparte, y solo los errores del sistema abren pendientes. Documentalo en `docs/MONITORING.md`.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.
>
> Respondé en mi idioma.

**Los errores de la herramienta no son errores del sistema.** La captura centralizada separa por fuente: los errores del sistema y los de las herramientas que lo observan (el panel, el agente residente, el propio monitoreo) se guardan con fuente distinta, el reporte los lista en secciones separadas, y solo los del sistema abren pendientes. En la práctica Turnera, el primer reporte cíclico abrió seis "bugs" que eran el panel de Forge hablando con un servidor apagado. (Decisión D-038.)

Qué le estoy pidiendo: la captura en los tres lugares donde los errores se esconden (backend,
tareas, navegador), con el identificador del 16 para poder seguirlos; el agrupamiento, sin el
cual el reporte es una lista de diez mil líneas; las tres alertas que importan (nuevo, recurrente
que crece, con consecuencia); el reporte con la tasa por flujo, que es el número que el dueño
entiende; las dos reglas; y la demostración de punta a punta, del navegador al reporte.

**Rutina de cada ciclo (va en el contrato de convivencia):**

**Antes de enviar el prompt**, tenés que tener esto a mano:

- El reporte cíclico de errores recién generado, leído por vos.
- `docs/PENDING.md` a mano, para verificar que los recurrentes tienen pendiente.
- Estado mínimo aceptable: leíste el reporte antes de pegar el prompt.

> With every cyclic error report: go through it with me; open the corrective pending items for
> the new errors, each with the way to reproduce it; confirm that every recurring error has a
> pending item or a written reason with a date; and tell me which errors disappeared and why,
> with the commit that fixed each one. An error that disappeared without a fix is not solved: it
> is hiding, and it stays in the report until its cause is known.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [es]
> Con cada reporte cíclico de errores: recorrelo conmigo; abrí los pendientes correctivos de los
> errores nuevos, cada uno con la forma de reproducirlo; confirmá que cada error recurrente tiene
> un pendiente o una razón escrita con fecha; y decime qué errores desaparecieron y por qué, con
> el commit que arregló cada uno. Un error que desapareció sin arreglo no está resuelto: está
> escondido, y queda en el reporte hasta que se conozca su causa.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.

Qué le estoy pidiendo: la disciplina del ciclo, y la regla del error que desaparece, que es la
más contraintuitiva y la que más vale: un error que se fue solo vuelve solo.

## 3. Resultado esperado

- Captura centralizada de errores en backend, tareas y navegador, agrupados por causa, sin datos
  personales.
- Alertas por error nuevo, recurrente que crece, y con consecuencia.
- El reporte cíclico con la tasa de error por flujo.
- `docs/MONITORING.md` completo (con el 21); la rutina en el contrato.
- Un pendiente por cada error abierto; ninguno "conocido" sin pendiente.

## 4. Verificación de completitud

- Provocá vos un error en el navegador en prueba (una acción que sabés que falla): ¿apareció en
  la captura con tu identificador, y te llegó la alerta?
- Leé el último reporte: ¿hay algún error recurrente sin pendiente ni razón?
- Tomá un error "arreglado" del reporte: ¿el pendiente tiene el test que lo reprodujo en rojo?
- ¿La tasa de error por flujo está, y bajó o subió respecto del período anterior?
- Buscá un dato personal en la captura de errores: no tiene que estar.

## 5. Señales de alarma

- Cero errores en producción durante un mes con usuarios reales. No hay sistema así; la captura
  no está viendo el navegador o las tareas.
- Un error con mil ocurrencias y un comentario "conocido, no afecta". Sin pendiente, sin fecha.
- Los errores se "arreglan" reiniciando el servicio. Desaparecen y vuelven.
- El reporte de errores y el de recursos los lee gente distinta y nadie los cruza: la consulta
  lenta del 21 es la causa del tiempo de espera agotado del 22.
