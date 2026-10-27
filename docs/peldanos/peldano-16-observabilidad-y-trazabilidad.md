# Peldaño 16 — Observabilidad y trazabilidad totales, con nivel configurable (contrato del peldaño)

**Tramo:** salida a producción.
**Cuándo:** en la fase de salida a producción, después del 15 (ya hay cadena de despliegue y
configuración por entorno) y antes de las pruebas de rendimiento (19), porque sin observabilidad
las pruebas de rendimiento no dicen qué se rompió. En un legado, el nivel mínimo (registros
estructurados con nivel configurable y un identificador de correlación) entra en el cinturón de
seguridad (N4); el nivel completo, acá. La regla de "todo módulo nuevo registra y propaga" rige
durante toda la operación.
**Forma:** un solo tiro; el agente arma y demuestra; vos leés una traza real.
**Tamaño:** obligatorio en su nivel mínimo en todo proyecto que vaya a tener usuarios; completo en
cualquier proyecto con consecuencias.

## Para qué sirve

Cuando algo falle en producción, y va a fallar, quiero poder seguir una acción desde la pantalla
hasta la base de datos y hasta cada llamada externa, con un solo identificador, sin abrir el
código y sin pedirle al agente que "revise". Y quiero poder subir el nivel de detalle de los
registros en producción, en un minuto, sin volver a desplegar, y bajarlo después. Eso es
observabilidad: ver lo que el sistema hace. Y lo segundo es trazabilidad: que toda acción con
consecuencia (cobró, envió, borró, aprobó) deje un rastro de quién, cuándo, qué, desde dónde y
con qué resultado, en un registro que la aplicación no puede editar. Sin esto, el agente
residente del peldaño 23 opera a ciegas, el monitoreo de los peldaños 21 y 22 no tiene de qué
alimentarse, y cada incidente se diagnostica con hipótesis en vez de con evidencia. El turno
huérfano que siguió vivo una hora cuarenta y tres se encontró por el log, no por el código
[Ref. 16](../REFERENCIAS.md#ref-16); y el agente residente arrancó, justamente, leyendo logs
[Ref. 13](../REFERENCIAS.md#ref-13).

"Nivel configurable" es la cláusula que distingue esto de "poner logs": el nivel (error, aviso,
información, depuración, traza) se cambia por configuración en el servidor, por entorno, sin
tocar código ni desplegar, y producción corre en información salvo cuando se está investigando
algo.

**Si sos principiante.** Un *registro* (log) es una línea que el sistema escribe cada vez que hace
algo: "10:42:13, módulo agenda, usuario recepcion1, turno 17 cancelado". *Estructurado* quiere
decir que todas las líneas tienen las mismas partes en el mismo orden, para que se puedan buscar
por máquina. El *nivel* es cuánto detalle se escribe: en "error" solo lo que falló; en "traza",
cada paso. El *identificador de correlación* es un número único que se le da a cada acción cuando
empieza (apretaste "cancelar") y que viaja pegado a todo lo que esa acción provoca (la consulta a
la base, el mensaje al paciente), así después se busca ese número y aparece la historia completa.
Y la *auditoría* es una lista que no se puede editar de las acciones importantes: quién hizo qué y
cuándo.

## 1. Contexto requerido

Lo que sigue es la lista genérica. Los archivos concretos que tenés que tener hechos antes de cada
prompt, con su contenido y su estado mínimo, están en la sección 2, en el bloque "Antes de enviar
el prompt" que precede a cada uno.

- La cadena de despliegue y la configuración por entorno (peldaño 15): el nivel se configura ahí.
- La tabla de candados (peldaño 14): cada acción con consecuencia es una entrada de la auditoría.
- El relevamiento inicial con los datos personales marcados: los registros no pueden contenerlos.
- Dónde van a vivir los registros y las métricas (un archivo rotado, un servicio): lo decidís vos.

## 2. Prompts

**Inicial:**

**Antes de enviar el prompt**, esto tiene que existir, y lo hacés vos (o el negocio con vos), no
el agente:

- `docs/DEPLOYMENT.md` (peldaño 15) con la forma en que se lee la configuración por entorno: el
  nivel de registro va a ser una variable más de esa configuración.
- `docs/LOCKS.md` (peldaño 14): la lista de acciones con consecuencia es la lista de lo que tiene
  que quedar en la auditoría.
- En `docs/INITIAL_SURVEY.md`, la lista de qué datos son personales (nombres, teléfonos, correos,
  documentos, diagnósticos), escrita por vos con el dueño: es lo que los registros tienen que
  enmascarar. Es una obligación legal, no una preferencia.
- Tu decisión de dónde viven los registros y las métricas: un archivo rotado en el servidor es
  suficiente para un proyecto chico; un servicio de registros, para uno con consecuencias. Y
  cuánto tiempo se conservan.
- Estado mínimo aceptable: sabés qué datos son personales y dónde van a vivir los registros.

> We are going to make this system observable and traceable, end to end, with a level that I can
> change without redeploying. Read `PROJECT.md`, `docs/SEMANTIC_TREE.md`, `docs/DEPLOYMENT.md` and
> `docs/LOCKS.md`. Evaluate whether you have what is needed (where the logs and metrics will live,
> how configuration is read per environment, which external services are called); if anything is
> missing, ask me. Then set up: (1) structured logging, one record per event, with timestamp,
> level, module, correlation id and actor, with the level configurable per environment at runtime
> (error, warning, info, debug, trace) without a redeploy, and a default of info in production;
> (2) a correlation id created at the entry of every request, job and message, propagated through
> every call and written in every record, so that one id follows an action from the screen to the
> backend, to the database and to every external call; (3) traceability of every consequential
> action in `docs/LOCKS.md`: who, when, what, from where, with which input and which outcome, in
> an audit record the application cannot edit; (4) health and metrics endpoints or files
> (requests, latency, errors, queue sizes, resource usage) that the monitoring of steps 21 and 22
> will read; (5) masking of every personal field listed in `docs/INITIAL_SURVEY.md`, so that no
> log record contains personal data. Show me one real request followed by its id through every
> layer, and show me the level changing in the test environment without a redeploy. Document the
> levels, where to change them and where the records live in `docs/OBSERVABILITY.md`. Reply in my
> language.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [es]
> Vamos a hacer que este sistema sea observable y trazable, de punta a punta, con un nivel que yo
> pueda cambiar sin volver a desplegar. Leé `PROJECT.md`, `docs/SEMANTIC_TREE.md`,
> `docs/DEPLOYMENT.md` y `docs/LOCKS.md`. Evaluá si tenés lo necesario (dónde van a vivir los
> registros y las métricas, cómo se lee la configuración por entorno, qué servicios externos se
> llaman); si falta algo, pedímelo. Después armá: (1) registro estructurado, un registro por
> evento, con fecha y hora, nivel, módulo, identificador de correlación y actor, con el nivel
> configurable por entorno en tiempo de ejecución (error, aviso, información, depuración, traza)
> sin volver a desplegar, y con información como valor por defecto en producción; (2) un
> identificador de correlación creado a la entrada de cada pedido, tarea y mensaje, propagado por
> cada llamada y escrito en cada registro, de modo que un solo identificador siga una acción desde
> la pantalla hasta el backend, la base y cada llamada externa; (3) trazabilidad de toda acción
> con consecuencia de `docs/LOCKS.md`: quién, cuándo, qué, desde dónde, con qué entrada y con qué
> resultado, en un registro de auditoría que la aplicación no puede editar; (4) puntos o archivos
> de salud y métricas (pedidos, latencia, errores, tamaño de las colas, uso de recursos) que el
> monitoreo de los peldaños 21 y 22 va a leer; (5) enmascaramiento de todo campo personal listado
> en `docs/INITIAL_SURVEY.md`, de modo que ningún registro contenga datos personales. Mostrame un
> pedido real seguido por su identificador a través de cada capa, y mostrame el nivel cambiando en
> el entorno de prueba sin volver a desplegar. Documentá los niveles, dónde se cambian y dónde
> viven los registros en `docs/OBSERVABILITY.md`.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.
>
> Respondé en mi idioma.

Qué le estoy pidiendo: las cinco piezas, y dos demostraciones que son la evidencia del peldaño:
**un identificador real seguido por todas las capas** (si no lo puede mostrar, la propagación
está rota en algún lado) y **el nivel cambiando sin desplegar** (si hay que desplegar, no es
configurable). La auditoría de acciones con consecuencia tiene que ser inmutable desde la
aplicación, porque un rastro que la aplicación puede borrar no es un rastro. Y el enmascaramiento
de datos personales va en el mismo prompt porque los registros son el lugar donde más datos
personales se filtran sin que nadie lo decida.

**Rutina (va en el contrato de convivencia):**

**Antes de enviar el prompt**, tenés que tener esto a mano:

- `docs/OBSERVABILITY.md` leído por vos: ¿entendés cómo subir el nivel y dónde leer un registro?
- `docs/WORKING_AGREEMENT.md`, donde va la rutina.
- Estado mínimo aceptable: subiste y bajaste el nivel vos, una vez, en el entorno de prueba.

> Every new module, job or integration writes structured log records with the correlation id and
> the actor at the level that corresponds, masks personal data, propagates the id to every call it
> makes, and records every consequential action in the audit trail. A pending item that adds one
> of those is not closed without showing one real id followed end to end through the new code.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [es]
> Todo módulo, tarea o integración nueva escribe registros estructurados con el identificador de
> correlación y el actor al nivel que corresponde, enmascara los datos personales, propaga el
> identificador a cada llamada que hace, y registra toda acción con consecuencia en la auditoría.
> Un pendiente que agrega uno de esos no se cierra sin mostrar un identificador real seguido de
> punta a punta a través del código nuevo.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.

Qué le estoy pidiendo: que la observabilidad no se degrade con cada módulo nuevo, que es lo que
pasa siempre si no es regla: el módulo del mes tres no registra nada y es justo el que falla.

## 3. Resultado esperado

- Registros estructurados con nivel configurable por entorno, cambiados sin desplegar.
- Un identificador de correlación en cada registro, propagado de la pantalla a la base y a las
  llamadas externas.
- Un registro de auditoría inmutable de las acciones con consecuencia.
- Puntos o archivos de salud y métricas, documentados.
- Ningún dato personal en los registros.
- `docs/OBSERVABILITY.md` y la rutina en el contrato.

## 4. Verificación de completitud (la hacés vos, sin leer código)

- Pedile un identificador de un pedido real y buscalo vos en los registros: ¿aparece en la
  pantalla, en el backend, en la base y en la llamada externa, si la hubo?
- Subí el nivel a depuración en el entorno de prueba, hacé una acción, mirá los registros, bajalo.
  ¿Tuviste que desplegar? Entonces no está subido.
- Buscá un nombre o un teléfono de prueba en los registros: no tiene que estar.
- Hacé una acción con consecuencia en prueba (cancelar, enviar a la bandeja falsa): ¿quedó en la
  auditoría con quién, cuándo, qué y resultado?
- ¿`docs/OBSERVABILITY.md` te alcanza para encontrar un registro vos solo a las tres de la mañana?

## 5. Señales de alarma

- El agente muestra "logs" pero cada módulo escribe en un formato distinto. No es estructurado;
  nadie va a poder buscarlos.
- El identificador aparece en el backend pero no en las llamadas externas o en las tareas
  programadas. Son justo los lugares donde se pierden los incidentes.
- El nivel de producción quedó en depuración "por ahora". Se llena el disco y se filtran datos.
- La auditoría de acciones con consecuencia vive en la misma tabla que el resto de los datos y la
  aplicación puede borrarla.
