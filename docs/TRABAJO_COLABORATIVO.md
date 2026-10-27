# Urazuke — trabajo colaborativo: varios desarrolladores, cada uno con su agente, sobre una misma rama

Autor: Pablo Kuschniroff, asistido por Claude Code. Versión 1, 19 de octubre de 2026. Este
documento complementa al [documento principal](ESCALERA_METODOLOGICA.md): dice cómo se aplica el
método cuando no hay un solo humano con un solo agente, sino varios desarrolladores, cada uno con
el suyo, trabajando sobre el mismo repositorio y sobre la misma rama. Las palabras raras están en
el glosario del documento principal. Repositorio público:
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## El problema, dicho sin rodeos

El método está escrito en singular: el dueño, el agente, el pendiente. Mis tres sistemas los
construí así, un humano y un modelo. Pero un equipo que adopta el método no tiene un humano: tiene
tres, o cinco, cada uno con su sesión de agente abierta sobre el mismo código, y en la mayoría de
los equipos chicos, sobre la **misma rama**, porque el bosque de ramas de larga vida es la forma
más segura de que dos semanas de trabajo se integren un viernes a los gritos. Trabajar sobre una
rama compartida se puede hacer bien, y la industria lo hace desde hace años con reglas conocidas
(commits chicos e integrados varias veces por día, la integración continua como árbitro, las
funcionalidades a medias escondidas detrás de un interruptor). Lo que cambia con el método es que
esas reglas ya no las cumplen personas que leen el código de los demás: las cumplen agentes que
no se ven entre sí, y entonces hay que escribirlas donde cada agente las lea.

Lo que sigue son las reglas, y después los prompts. No agrego peldaños: los veinticuatro son los
mismos. Agrego lo que cada peldaño necesita para que lo suban varios a la vez.

**Si sos principiante.** Una *rama* es una copia del código donde se trabaja; la *rama compartida*
(suele llamarse *main* o *trunk*) es la única que importa, la que se despliega. *Integrar* es
meter tu cambio en esa rama; *conflicto* es cuando dos personas cambiaron la misma línea y la
herramienta no sabe cuál vale. Un *interruptor de funcionalidad* es una llave de configuración que
deja una funcionalidad apagada aunque el código ya esté, para poder integrar a medias sin que el
usuario la vea. Y *reclamar* un pendiente es anotar tu nombre en él para que nadie más lo tome.

## Las siete reglas de la rama compartida

1. **El pendiente es la unidad de propiedad.** Nadie trabaja sin un pendiente reclamado a su
   nombre en `docs/PENDING.md`, y un pendiente tiene un solo dueño a la vez. Dos personas no toman
   dos pendientes que tocan el mismo módulo al mismo tiempo; si no se puede evitar, se avisan y la
   segunda espera a que la primera integre. El agente, al empezar la sesión, lee los pendientes
   reclamados por otros y no los toca.
2. **Integrar chico y seguido.** Un pendiente se parte en cambios que se integran a la rama
   compartida varias veces por día, nunca al final de la semana. Antes de cada integración: traer
   lo de los demás, correr la batería entera, y recién después subir. Un cambio que no se puede
   integrar en un día es un pendiente mal cortado: se vuelve a cortar.
3. **La integración continua es el árbitro, no el humano.** Nadie integra con la cadena en rojo,
   y nadie discute si un cambio "rompe": lo dice la batería, la compuerta de calidad (9) y la
   caracterización si es un legado. Quien pone en rojo la rama compartida la arregla antes que
   cualquier otra cosa, o revierte su cambio.
4. **Lo que está a medias va detrás de un interruptor.** Una funcionalidad que lleva más de un día
   se integra igual, apagada por configuración, con su interruptor anotado en el pendiente, y se
   enciende cuando el pendiente se cierra con evidencia. Así nadie espera a nadie para integrar.
5. **Las listas tienen un solo dueño, y el mapa dice cuál.** El mapa productor-consumidor (11) es
   el detector de conflictos del equipo: antes de tocar un contrato entre partes, se mira quién lo
   consume, y los consumidores se actualizan en el mismo cambio, aunque sean de otra persona. El
   árbol semántico (2) es el mapa compartido, y lo cambia quien agrega un nodo, en el mismo commit.
6. **Las decisiones se escriben con nombre, y valen para todos.** Una regla de negocio decidida
   por un desarrollador con el dueño va a `docs/DECISIONS.md` en el momento, porque el agente de al
   lado la va a necesitar esa misma tarde y no la va a adivinar. El contrato de convivencia (1) es
   uno solo para el equipo; nadie tiene reglas propias que los demás no leen.
7. **Se revisa evidencia, no código, y la revisa otro.** Un pendiente lo cierra su dueño con la
   rutina completa (8, 9, 10, 12), y lo da por cerrado otra persona del equipo leyendo el reporte:
   el rojo, el verde, la regresión, la calidad, el caso manual. Nadie se cierra sus propios
   pendientes, y nadie lee el código para cerrarlos.

Y una regla sobre los agentes, que es la que de verdad cambia respecto de un equipo sin modelos:
**cada agente trabaja a nombre de una persona**, con su propio contexto de sesión, y lo único que
comparten es lo que está escrito en el repositorio. No hay memoria común fuera de los archivos.
Por eso el estado vivo (`docs/STATUS.md`), los pendientes y las decisiones se escriben al momento,
no "al final del día": el agente del compañero los va a leer en cinco minutos.

## Cómo se reparten los peldaños en un equipo

| Peldaño | Quién lo sube | Qué cambia en equipo |
|---|---|---|
| 0 a 4, arranque | Una sola persona, la que lidera, con el dueño. | Se hace una vez y antes de que entre el resto. El esqueleto (4) incluye la cadena de integración que va a ser el árbitro, y las compuertas (`docs/GATES.md`) incluyen las de la rama compartida. |
| 1, contrato | El líder lo escribe; todos lo firman. | Se agregan las siete reglas de arriba como rutinas. Un solo archivo para el equipo. |
| 5, pendientes | El líder abre el bloque con el dueño; cada uno reclama. | El pendiente lleva un campo "reclamado por" y "módulos que toca". Dos pendientes que tocan el mismo módulo no se reclaman a la vez. |
| 6, decisiones | Quien la necesita, con el dueño. | Se escribe en el momento, no al final del día. |
| 7 a 12, el bucle | Cada uno, con su agente, sobre su pendiente. | Antes de integrar: traer, correr todo, subir. Lo que está a medias, detrás de un interruptor. El reporte (12) lo lee otro. |
| 9, calidad | Una sola configuración para todos. | Nadie tiene excepciones propias al linter. |
| 10, casos de prueba manual | Los escribe el dueño del pendiente; los ejecuta otro. | Quien no construyó la funcionalidad es quien mejor la prueba. |
| 11, simetría | Quien toca un contrato actualiza a los consumidores, sean de quien sean. | El mapa es el detector de conflictos. |
| 13, auditoría | Una sesión distinta de todas las que construyeron. | En equipo es más fácil: el auditor es el que no tocó ese módulo. |
| 14 a 20, salida | El líder coordina; cada peldaño tiene un responsable. | Una persona promueve a producción; los demás no. |
| 21 a 23, operación | Un responsable del monitoreo por ciclo, rotativo. | El reporte cíclico lo lee el equipo entero; los pendientes que salen se reclaman como cualquier otro. |

## Los prompts

**Antes de enviar el prompt**, esto tiene que existir, y lo hacés vos (o el líder del equipo), no
el agente:

- `docs/WORKING_AGREEMENT.md` (peldaño 1), cerrado, uno solo para el equipo, con la lista de los
  miembros y sus nombres de usuario en el repositorio.
- `docs/PENDING.md` (peldaño 5) con el campo "reclamado por" y "módulos que toca" en cada
  pendiente, aunque estén vacíos.
- La decisión del equipo sobre el interruptor de funcionalidad: dónde se declara (la
  configuración del servidor, un archivo) y cómo se nombra, escrita en `PROJECT.md`.
- La cadena de integración (peldaño 4 y 15) con la batería y la compuerta de calidad (9) como
  condición de fusión en la rama compartida, configurada en la plataforma del repositorio (nadie
  puede subir con la cadena en rojo).
- Estado mínimo aceptable: hay un contrato único, los pendientes tienen los dos campos, y la
  plataforma rechaza un push con la cadena en rojo.

**Rutina de la rama compartida (va en el contrato de convivencia):**

> We work as a team on one shared branch, each person with their own agent session, and the only
> shared memory is what is written in the repository. Rules: (1) At the start of every session,
> read `docs/STATUS.md`, `docs/DECISIONS.md` and `docs/PENDING.md`; never touch a pending item
> claimed by someone else, and never take one that touches a module another claimed item touches.
> (2) Before every integration into the shared branch: pull the others' changes, run the full
> suite and the quality gate, and only then push; integrate several times a day, never at the end
> of the week. (3) Never push with the pipeline red; whoever turns it red fixes it before anything
> else or reverts. (4) Anything that cannot be finished and integrated today goes behind a feature
> switch, off by default, noted in the pending item. (5) Before touching a contract between parts
> (a service, a table, a list of values), look up its consumers in `docs/PRODUCER_CONSUMER_MAP.md`
> and update them in the same change, whoever owns them. (6) Every business decision goes to
> `docs/DECISIONS.md` the moment it is taken, with the person's name and the date. (7) Update
> `docs/STATUS.md` with what you are doing when you start and when you stop, so that the others'
> agents see it.
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
> Trabajamos en equipo sobre una sola rama compartida, cada persona con su propia sesión de
> agente, y la única memoria compartida es lo que está escrito en el repositorio. Reglas: (1) Al
> empezar cada sesión, leé `docs/STATUS.md`, `docs/DECISIONS.md` y `docs/PENDING.md`; nunca toques
> un pendiente reclamado por otro, y nunca tomes uno que toque un módulo que otro pendiente
> reclamado toca. (2) Antes de cada integración a la rama compartida: traé los cambios de los demás,
> corré la batería completa y la compuerta de calidad, y recién después subí; integrá varias veces
> por día, nunca al final de la semana. (3) Nunca subas con la cadena en rojo; quien la pone en rojo
> la arregla antes que cualquier otra cosa o revierte. (4) Lo que no se pueda terminar e integrar
> hoy va detrás de un interruptor de funcionalidad, apagado por defecto, anotado en el pendiente.
> (5) Antes de tocar un contrato entre partes (un servicio, una tabla, una lista de valores), buscá
> sus consumidores en `docs/PRODUCER_CONSUMER_MAP.md` y actualizalos en el mismo cambio, sean de
> quien sean. (6) Toda decisión de negocio va a `docs/DECISIONS.md` en el momento en que se toma,
> con el nombre de la persona y la fecha. (7) Actualizá `docs/STATUS.md` con lo que estás haciendo
> al empezar y al terminar, para que los agentes de los demás lo vean.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.
>
> Respondé en mi idioma.

Qué le estoy pidiendo: las siete reglas hechas rutina del agente, porque el agente no ve a los
otros agentes y solo va a cumplir lo que lea; la lectura obligatoria al empezar la sesión, que es
lo que reemplaza la conversación de pasillo; la integración chica y seguida con la batería como
condición; el interruptor para lo que está a medias; el mapa como detector de conflictos; y el
estado vivo escrito al momento.

**Al reclamar un pendiente:**

**Antes de enviar el prompt**, tenés que tener esto a mano:

- El pendiente que querés tomar, elegido por vos del backlog, y una mirada a los reclamados por
  otros: ¿alguno toca el mismo módulo?
- Tu nombre de usuario en el repositorio, el que va a quedar en el campo "reclamado por".
- Estado mínimo aceptable: sabés qué módulos toca tu pendiente y que nadie los tiene reclamados.

> I am taking pending item [PND-NNN]. Before anything: list the pending items claimed by others
> and tell me whether any of them touches the same modules as mine, by the "modules it touches"
> field and by the producer-consumer map; if there is an overlap, stop and tell me, do not start.
> If there is none, write my name in the "claimed by" field with today's date, write in
> `docs/STATUS.md` what I am starting, re-read the item's specification, and tell me which
> contracts of the map this item will touch and who consumes them.
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
> Tomo el pendiente [PND-NNN]. Antes que nada: listá los pendientes reclamados por otros y decime
> si alguno toca los mismos módulos que el mío, por el campo "módulos que toca" y por el mapa
> productor-consumidor; si hay solapamiento, frená y decímelo, no empieces. Si no hay, escribí mi
> nombre en el campo "reclamado por" con la fecha de hoy, escribí en `docs/STATUS.md` qué empiezo,
> releé la especificación del pendiente, y decime qué contratos del mapa va a tocar este pendiente
> y quién los consume.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.
>
> Respondé en mi idioma.

Qué le estoy pidiendo: la verificación de solapamiento antes de empezar, que es el momento barato
de evitar un conflicto; el reclamo escrito; y la lista de consumidores que voy a tocar, para
saber desde el principio a quién le cambio algo.

**Al integrar:**

**Antes de enviar el prompt**, tenés que tener esto a mano:

- El pendiente con su rutina de cierre hecha o, si está a medias, el interruptor anotado.
- La certeza de que la rama compartida está en verde ahora mismo (si está en rojo, primero se
  arregla eso, sea de quien sea).
- Estado mínimo aceptable: sabés si integrás algo terminado o algo a medias detrás de un
  interruptor.

> We are going to integrate into the shared branch. Pull the others' changes first and tell me
> what came in and whether anything touches my modules. Resolve conflicts, if any, by reading
> both sides and asking me when a business rule is involved; never by keeping mine. Run the full
> suite, the quality gate and, if this is an inherited system, the characterization suite, and
> show me the counts. If anything is red, stop: tell me what and whose change it comes from. If
> this item is not finished, confirm the feature switch is off by default and say so in the
> commit message. Then push, show me the pipeline green on the shared branch, and update
> `docs/STATUS.md` and the pending item.
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
> Vamos a integrar a la rama compartida. Traé primero los cambios de los demás y decime qué entró y
> si algo toca mis módulos. Resolvé los conflictos, si los hay, leyendo los dos lados y
> preguntándome cuando haya una regla de negocio en juego; nunca quedándote con el mío. Corré la
> batería completa, la compuerta de calidad y, si es un sistema heredado, la batería de
> caracterización, y mostrame los números. Si algo está en rojo, frená: decime qué y de qué cambio
> de quién viene. Si este pendiente no está terminado, confirmá que el interruptor está apagado por
> defecto y decilo en el mensaje del commit. Después subí, mostrame la cadena en verde sobre la
> rama compartida, y actualizá `docs/STATUS.md` y el pendiente.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.
>
> Respondé en mi idioma.

Qué le estoy pidiendo: traer antes de subir; resolver los conflictos leyendo los dos lados y no
"ganando" (el reflejo del modelo ante un conflicto es quedarse con su versión); la batería como
condición; la cadena en verde sobre la rama compartida como evidencia, no en la máquina del
agente; y el estado vivo al día.

## Verificación de completitud (la hace el líder, sin leer código)

- Tomá tres pendientes cerrados esta semana: ¿los cerró alguien distinto de su dueño, leyendo el
  reporte?
- ¿Cuántas veces por día se integró a la rama compartida? Pedí el historial; si es una vez por
  semana, la regla 2 no se cumple.
- ¿Hubo un conflicto esta semana? ¿Cómo se resolvió, y hay un pendiente del mapa por eso?
- ¿Hay alguna funcionalidad a medias sin interruptor en la rama compartida?
- ¿`docs/STATUS.md` dice qué está haciendo cada uno hoy?

## Señales de alarma

- Cada desarrollador tiene su propio contrato de convivencia "porque trabaja distinto". Los
  agentes van a seguir reglas distintas sobre el mismo código.
- Las integraciones se acumulan para el viernes. Es el bosque de ramas, sin las ramas.
- Alguien lee el código del compañero para aprobar su pendiente. El método se degradó a revisión
  de código, que es lo que el modelo hace peor que la evidencia.
- Un conflicto se resolvió "quedándose con la versión más nueva". Una regla de negocio se perdió
  sin que nadie lo decidiera.
- El agente de una persona cerró un pendiente reclamado por otra. La lectura al empezar la sesión
  no está en el contrato, o el contrato no se lee.

## Lo que falta elaborar `[hipótesis]`

1. Estas reglas vienen de la práctica conocida de la industria sobre ramas compartidas y de lo que
   el método exige; no las probé con un equipo de varios agentes trabajando a la vez. El primer
   equipo que las use va a corregirlas, y la retrospectiva (23) tiene que preguntar cuántos
   conflictos hubo y cuántos se podrían haber evitado con el mapa.
2. No sé cuántas personas aguanta una rama compartida con el método antes de que haga falta otra
   forma de trabajo. Mi intuición es que más de las que aguantaba sin el método, porque el
   pendiente especificado y el mapa quitan la mitad de los motivos de conflicto.
3. En Forge, el registro de pendientes nativo y el grafo de conocimiento hacen el reclamo y la
   detección de solapamiento solos; en las otras herramientas se hace a mano con los campos del
   pendiente. No probé todavía cuánto cambia eso en la práctica.
