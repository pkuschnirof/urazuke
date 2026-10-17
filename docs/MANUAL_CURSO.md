# Urazuke — el curso. Manual con tareas prácticas, peldaño por peldaño, hasta la aplicación en producción

Versión 1, 17 de octubre de 2026. Es un documento de trabajo del proyecto Urazuke: se va a
corregir con la primera cohorte que lo use. Está escrito en castellano con tildes, en lenguaje
de todos los días, y cada sigla o expresión rara está en el glosario del documento principal
(`docs/ESCALERA_METODOLOGICA.md`).

## Antes de empezar

### Para quién es este curso

Para alguien que quiere construir software con inteligencia artificial **y que ese software sea
usado de verdad**, por gente de verdad, durante meses. No es un curso de programación: no vas a
aprender un lenguaje ni un framework. Tampoco es un curso de "prompts": no vas a aprender trucos
para que el modelo escriba mejor. Es un curso de **método**: de qué hacer en qué orden, qué
pedirle al modelo en cada momento, qué tiene que entregarte, y cómo saber —sin leer código— que
lo que te entregó está completo.

Te sirve si sos alguna de estas personas:

- Tenés un negocio, un consultorio, una consultora chica, y querés tu propio sistema sin
  contratar un equipo de desarrollo.
- Sos consultor o freelancer de automatización y tus clientes te piden "algo más" que un robot.
- Sabés programar, pero querés que el modelo haga el trabajo pesado y vos quedarte con las
  decisiones.
- Ya "vibecodeaste" algo, funcionó dos semanas, y al mes tres se te cayó.

No te sirve si lo que querés es un prototipo para una demo del viernes. Para eso hay
herramientas más rápidas, y este método te va a parecer lento. El método es para lo que tiene
que seguir funcionando después de la demo.

### Qué vas a tener al final

Una aplicación tuya, corriendo en producción, con: tests que se vieron fallar antes de pasar;
despliegue reproducible con vuelta atrás; configuración y secretos fuera del repositorio; las
decisiones de negocio escritas con fecha; candados en todo lo que cobra, envía o borra; tres
manuales que una persona puede seguir sin IA; una auditoría hecha por un agente distinto del
que construyó; y una retrospectiva con números. Eso es lo que acá llamamos "production grade":
no es que funcione, es que **se puede sostener**.

Y vas a tener algo más, que es lo que de verdad te llevás: el reflejo de no creerle al modelo
sin evidencia, y de saber exactamente qué evidencia pedirle en cada paso.

### Qué necesitás

1. **Una herramienta de IA para programar.** Cualquiera que pueda leer y escribir archivos en tu
   repositorio y ejecutar comandos: Claude Code, Cursor, Codex CLI, Gemini CLI, Forge. El
   método no depende de cuál; el documento principal tiene una tabla de dónde va cada artefacto
   en cada herramienta. En este manual decimos "el agente" para referirnos a la que uses.
2. **Una cuenta en GitHub** (o equivalente) y nociones mínimas de qué es un repositorio, un
   commit y un push. Si no las tenés, dedicale una tarde antes de empezar; cualquier tutorial
   introductorio alcanza. No hace falta más.
3. **Un proyecto.** Lo ideal es que sea tuyo: un sistema que necesitás o que un cliente te
   pidió, con usuarios que lo van a usar. Si no tenés uno, usá el **proyecto guía** que describimos
   abajo; está pensado para que pase por los dieciséis peldaños sin saltearse ninguno.
4. **Tiempo.** El curso tiene dieciséis lecciones, una por peldaño. Las de arranque (0 a 4) son
   de una a tres horas cada una; las del bucle (5 a 10) se aprenden en una tarde y se practican
   durante todo el proyecto; las de operación (11 a 15) son de dos a cuatro horas cada una. Un
   proyecto chico, de punta a punta, son entre cuatro y ocho semanas de trabajo parcial.
5. **Un dueño del dominio con tiempo para decidir.** Si el proyecto es tuyo, sos vos. Si es de
   un cliente, es el cliente, y tiene que saber que va a tener que contestar preguntas durante
   todo el proyecto. Este punto no es negociable: sin dueño que decida, el modelo decide, y ahí
   el método se rompe.

### Cómo se cursa

Cada lección tiene la misma estructura:

- **Qué tenés que entender**: el concepto, explicado como se le explica a una persona.
- **La tarea**: paso a paso, con el prompt exacto que le vas a dar al agente (en inglés, porque
  los modelos siguen instrucciones con más precisión en inglés; debajo de cada uno está explicado
  en castellano qué le estás pidiendo) y qué hacer con lo que te devuelva.
- **La verificación de completitud**: la lista de preguntas que te hacés sobre lo que el agente
  entregó, sin abrir el código. Si alguna da "no", la lección no está terminada.
- **El entregable**: el archivo o la evidencia que tiene que existir al final.
- **Errores típicos**: lo que les pasa a casi todos la primera vez.
- **En el proyecto guía**: cómo se ve esta lección aplicada al proyecto de ejemplo.

Una regla para todo el curso: **no avances al peldaño siguiente con una verificación en "no"**.
La tentación de "después lo arreglo" es exactamente lo que el método existe para evitar. Si un
peldaño no se sube completo, el siguiente se construye sobre arena.

### El proyecto guía: "Turnera"

Si no tenés proyecto propio, usá este. Es chico, pero tiene todo lo que hace falta para que
ninguno de los dieciséis peldaños sea de mentira: usuarios reales, datos personales, mensajes que
salen al mundo, y plata.

**El negocio.** Un consultorio (puede ser un estudio, una peluquería, un taller: cualquier lugar
que da turnos). Hoy los turnos se anotan en un cuaderno y se confirman por WhatsApp a mano. Se
pierden turnos porque la gente se olvida, hay sobreturnos porque dos personas anotaron en
cuadernos distintos, y nadie sabe cuántos turnos se cancelaron el mes pasado.

**Lo que quieren.** Una agenda web donde las dos recepcionistas y los tres profesionales vean
los turnos; recordatorios automáticos 24 horas antes, por WhatsApp o correo; la posibilidad de
pedir una seña por link de pago para ciertos turnos; y un par de números al final del mes
(cuántos turnos, cuántas ausencias, cuántas señas).

**El dueño.** La encargada del consultorio. Tiene criterio sobre el negocio (sabe qué turnos
llevan seña, cuánto antes se puede cancelar, qué se le dice a un paciente que faltó tres veces)
y tiene quince minutos por día para contestar preguntas. No programa, y no va a leer código.

**Los números que solo ella sabe.** Unos cuarenta turnos por día, doscientos cincuenta días al
año. Unos tres mensajes por turno (confirmación, recordatorio, a veces reprogramación). Los
datos de los pacientes se conservan cinco años. El pico es el lunes a la mañana, con las dos
recepcionistas cargando a la vez. Y una pregunta que ella no sabe contestar y que importa: si
esto funciona, ¿lo van a vender a otros consultorios? (La respuesta cambia el dimensionamiento
por diez.)

**Lo que tiene consecuencias.** Enviar un recordatorio (si se manda dos veces, molesta; si se
manda al número equivocado, es un problema de privacidad). Cobrar una seña (plata). Cancelar un
turno (irreversible para el paciente que lo pierde). Borrar un paciente (datos personales).

Con esto alcanza para arrancar. Todo lo demás lo va a preguntar el agente, y es parte del
ejercicio que lo pregunte.

---

## Tramo de arranque: lecciones 0 a 4

Estas cinco lecciones se hacen una vez por proyecto, antes de escribir funcionalidad. Son las que
más tentación dan de saltear ("quiero ver algo funcionando"), y son las que más caro cuesta
saltear. Un consejo práctico: hacelas en una semana, de corrido, y recién después abrí el
bucle.

### Lección 0 — ¿Este proyecto se puede encarar así?

**Qué tenés que entender.** El método no sirve para cualquier proyecto, y saberlo antes de
empezar es la primera decisión de calidad. Hay dos condiciones sin las cuales no funciona:
que haya un repositorio estándar donde dejar la evidencia (X1), y que las pantallas se puedan
operar por programa para probar de punta a punta, desde la pantalla hasta el backend (X2). Si
cualquiera de las dos falla, el agente no va a poder verificarse solo, y entonces vas a terminar
leyendo código vos, que es justo lo que el método promete evitar. Después hay criterios que
ponderan (si hay un dueño con tiempo, si el error tiene consecuencias, si se puede probar en un
entorno aparte, etc.), que todavía estamos calibrando con los primeros proyectos.

Para el proyecto guía las dos condiciones se cumplen: es un proyecto nuevo (no hay legado) y lo
vamos a construir con una interfaz web operable por programa. Para un proyecto propio, esta
lección puede terminar en "no va", y eso es un resultado válido del curso.

**La tarea.**

1. Escribí, a mano, en un archivo `docs/INITIAL_SURVEY.md`, lo que sabés del proyecto: qué
   quiere el cliente, para quién, qué pasa hoy sin el sistema, qué tecnología hay o se propone, si
   hay un sistema anterior y si tiene repositorio, quién es el dueño y cuánto tiempo tiene, qué
   consecuencia tiene un error, qué entornos va a haber. Media página. No importa que esté
   incompleto; de hecho, es parte del ejercicio que esté incompleto.
2. Copiá la ficha de criterios del documento principal (los excluyentes X1 y X2 y los
   candidatos D1 a D10) a `docs/ELIGIBILITY_CRITERIA.md`.
3. Abrí el agente en la carpeta del proyecto (todavía vacía salvo esos dos archivos) y pegale
   este prompt:

> We are going to assess whether this project can be run with the Urazuke method. Read the
> initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`. First, evaluate whether the survey is sufficient to answer
> every criterion. If any criterion cannot be answered from the survey, ask me for the missing
> information before going on; do not assume. Then fill in the sheet criterion by criterion:
> the answer, where it comes from, and for each exclusionary criterion whether it is green or
> red. Do not decide: present me the completed sheet with your reading and your doubts, and I
> will decide. Reply in my language.

   Le estás pidiendo que lea los dos archivos, que **evalúe si el relevamiento alcanza y pregunte
   lo que falte antes de responder** (esta cláusula se repite en todos los prompts del curso; es
   el corazón del método), que complete la ficha diciendo de dónde sale cada respuesta, y que no
   decida: la decisión es tuya.

4. Contestá sus preguntas. Si no te hizo ninguna, desconfiá y preguntale qué supuso.
5. Cuando te presente la ficha, leela y decidí. Después pegale el prompt de cierre:

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.

**Verificación de completitud.** Abrí `docs/ELIGIBILITY.md` y preguntate: ¿los dos excluyentes
tienen respuesta explícita y fuente? ¿Hay algún criterio respondido con "probablemente"? (Si lo
hay, el agente tenía que preguntar.) ¿La decisión tiene fecha y nombre? ¿Las condiciones, si las
hay, se pueden verificar? ¿Están las preguntas que hizo y tus respuestas?

**Entregable.** `docs/ELIGIBILITY.md`, de una página.

**Errores típicos.** Escribir el relevamiento "completo" para que el agente no pregunte: te
perdés el ejercicio y, peor, te acostumbrás a hacer el trabajo del modelo. Responder "va" con
cinco condiciones: es un "no va" disfrazado. Y el más común: saltear la lección porque "es
obvio que va". Lo obvio es lo que no se escribe, y lo que no se escribe es lo que después se
discute.

**En el proyecto guía.** El agente debería preguntar, como mínimo, si la interfaz va a ser web o
móvil (porque X2 depende de eso), si hay un sistema anterior aunque sea un Excel, y qué canal de
mensajes se va a usar (WhatsApp tiene requisitos que el correo no tiene). La ficha termina en
"va", con una condición razonable: tener el canal de mensajes definido antes del peldaño 12.

### Lección 1 — El contrato de convivencia

**Qué tenés que entender.** El agente llega cada sesión sin memoria de la anterior. Es como un
colaborador nuevo cada mañana. El contrato de convivencia es lo que le decís el primer día y lo
que va a releer todos los días: cómo trabajás, qué no tolerás, qué nivel de autonomía le das. Sin
contrato, le vas a repetir las mismas cosas cada sesión, y cada vez un poco distinto.

Las seis reglas mínimas tienen cada una un fallo atrás: "mi tiempo es sagrado" evita que te
consulte cada detalle; "cero deuda" evita el "después lo arreglo"; "alcance exacto" evita que
"ya que está" te agregue cosas; "documentación en el mismo commit" evita los manuales viejos;
"nunca reportar como hecho lo no verificado" evita el "listo" que no era; "hablá mi idioma"
evita que te conteste en inglés porque el prompt estaba en inglés.

**La tarea.**

1. Pensá cinco minutos en cómo trabajás: ¿preferís que te pregunte mucho o poco? ¿En qué idioma?
   ¿Qué te saca de quicio de trabajar con otras personas? Anotalo en una lista corta; se lo vas a
   contar cuando pregunte.
2. Pegale este prompt:

> Before we write any code, we are going to set the working agreement between you and me.
> Write `docs/WORKING_AGREEMENT.md` with at least these rules, each with one line explaining
> what it prevents: (1) My time is sacred: do not ask me what you can resolve on your own, and
> when you do ask, ask in prose, with your recommendation. (2) Zero technical debt: whatever
> breaks is fixed at the root, with its regression test, in the same session. (3) Exact scope:
> no more and no less than what was asked; if you see something else, log it as a pending item,
> do not do it. (4) Documentation is updated in the same commit as the change. (5) Never report
> as done something you have not verified; always separate what you verified from what you
> believe. (6) Speak my language. Add any rules you think this project needs, marked as
> proposals. If you need to know something about how I work in order to write this, ask me.

   Le estás pidiendo las seis reglas con el fallo que cada una evita, reglas propias marcadas
   como propuestas para que las aceptes o rechaces, y que te pregunte sobre vos.

3. Contestá sus preguntas. Leé las propuestas: aceptá las que te sirvan, rechazá las que no,
   siempre con una razón de una línea.
4. Cerrá con:

> I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the
> agreement with today's date and a version number. Then add to the project file the
> instruction to read this agreement at the start of every session.

   Si todavía no hay archivo de proyecto (lo hacés en la lección 2), va a crear uno mínimo con
   esa instrucción; está bien.

**Verificación de completitud.** ¿Están las seis reglas, cada una con el fallo que evita? ¿Hay
alguna escrita como aspiración ("tratar de…")? ¿El archivo de proyecto ordena leerlo al empezar
cada sesión? ¿Te hizo al menos una pregunta sobre cómo trabajás?

**Entregable.** `docs/WORKING_AGREEMENT.md` con fecha y versión, enganchado al archivo de
proyecto.

**Errores típicos.** Aceptar veinte reglas porque todas suenan bien: nadie respeta veinte; seis u
ocho se respetan. Dejar una regla que diga que el agente puede cambiar el contrato: no. Y el
más silencioso: no probar nunca si lo lee. En la lección 2 vas a ver cómo.

**En el proyecto guía.** Una regla propia que el agente suele proponer para Turnera, y que vale la
pena aceptar: "nunca mando un mensaje real a un paciente desde un entorno que no sea producción;
en prueba, los mensajes van a una bandeja falsa". Es el peldaño 12 asomándose temprano.

### Lección 2 — La definición del proyecto y la lectura obligatoria

**Qué tenés que entender.** El archivo de proyecto (`PROJECT.md`, o `CLAUDE.md`, o el nombre
que use tu herramienta) es el mapa que el agente lee al empezar cada sesión. Tiene que ser
**corto**: qué es el sistema, para quién, qué NO es, los módulos, las decisiones tomadas con
fecha, y la orden de leer el contrato. Lo que pasó cada día no va ahí: va al estado vivo
(`docs/STATUS.md`) y al registro de pendientes. Uno de los sistemas de origen del método dejó
crecer este archivo hasta 9.661 líneas; en ese estado, no lo lee nadie, y el modelo tampoco.

La sección "qué NO es" es la más importante y la que todos dejan vacía. Lo que no está escrito
es lo que el modelo va a inventar cuando se encuentre con un hueco.

**La tarea.**

1. Completá `docs/INITIAL_SURVEY.md` con lo que aprendiste en la lección 0 (las respuestas a
   las preguntas del agente). Agregá una sección "qué NO tiene que hacer el sistema", aunque
   sea con dos ítems.
2. Pegale:

> We are going to define the project in writing. Read the business survey in
> `docs/INITIAL_SURVEY.md` and the working agreement in `docs/WORKING_AGREEMENT.md`. Evaluate
> whether the survey is sufficient to describe the system, its users and its boundaries; if it
> is not, ask me for what is missing before writing anything. Then write `PROJECT.md`, three
> hundred lines at most, with: what the system is and for whom; what it is NOT; the main
> modules as a list; the decisions already made, each with its date; and the instruction to
> read this file and the working agreement at the start of every session. Separately, create
> `docs/STATUS.md` for the living state (what is being worked on, what is open): that file
> changes every day; `PROJECT.md` almost never does. Reply in my language.

   Le estás pidiendo que pregunte antes de redactar, un archivo de proyecto corto con la sección
   "qué no es", decisiones con fecha, y el estado vivo en otro archivo.

3. Leé `PROJECT.md` entero. Tiene que entrar en cinco minutos. Corregí lo que no sea cierto o
   no sea tuyo.
4. Cerrá con:

> Apply these corrections: [list]. Finalize `PROJECT.md` with today's date. Add to the working
> agreement that the change history never goes into `PROJECT.md`: it goes to `docs/STATUS.md`
> or to the pending-items register.

5. **La prueba de lectura.** Cerrá la sesión del agente y abrí una nueva. Sin decirle nada más,
   pedile: "¿Qué no tiene que hacer este sistema?". Si te contesta con lo que dice `PROJECT.md`,
   el enganche funciona. Si te contesta cualquier otra cosa, no está leyendo el mapa: revisá cómo
   tu herramienta carga el archivo de proyecto.

**Verificación de completitud.** ¿`PROJECT.md` se lee en cinco minutos? ¿Dice qué NO hace el
sistema? ¿Cada decisión tiene fecha y quién la tomó? ¿El agente preguntó algo antes de redactar?
¿El estado vivo está en otro archivo? ¿Pasó la prueba de lectura?

**Entregable.** `PROJECT.md` (máximo trescientas líneas) y `docs/STATUS.md`, y la prueba de
lectura pasada.

**Errores típicos.** Pegar en `PROJECT.md` toda la especificación que ya tenías: es el programa,
no la especificación. Dejar "qué no es" vacío. Y no hacer la prueba de lectura: es la única forma
de saber que el peldaño 1 y el 2 están actuando y no solo existiendo.

**En el proyecto guía.** En "qué NO es" de Turnera deberían estar, como mínimo: no es un sistema
de historia clínica (no guarda datos médicos), no es una pasarela de pagos (usa un link de pago
de un proveedor, no procesa tarjetas), y no manda mensajes de marketing (solo confirmaciones y
recordatorios). Cada uno de esos tres "no" te ahorra una conversación de media hora más adelante.

### Lección 3 — Dimensionar antes de diseñar la arquitectura

**Qué tenés que entender.** Hay decisiones que, tomadas mal, cuestan semanas: qué base de datos,
si las llamadas a la base son sincrónicas o asincrónicas, cuánta gente puede usar el sistema al
mismo tiempo. Y todas dependen de números que **solo el negocio tiene**: cuántos turnos por día,
cuántos mensajes por turno, cuántos años se guarda. El modelo no puede inferir esos números;
puede inferir lo que se deriva de ellos (filas por año, tamaño en cinco años). Por eso el
prompt le exige distinguir datos primarios de derivados, y **pedir los primarios que falten en
vez de estimarlos**. Cuando el modelo estima un dato primario, lo hace con la misma cara de
seguro que cuando calcula; y no tenés forma de distinguir por el tono.

Hay además un tipo de decisión que conviene tomar siempre: las **asimétricas**, baratas si
sobran y carísimas si faltan. El ejemplo canónico es hacer la interfaz con la base de datos
asincrónica desde el primer día aunque la primera base sea un archivo: si nunca cambiás de
base, sobró un `await`; si cambiás, te ahorraste reescribir todo.

**La tarea.**

1. Sentate con el dueño (o con vos mismo, si el proyecto es tuyo) y escribí
   `docs/VOLUME_SURVEY.md`: las entidades principales y cuántas hay, cuántas se agregan por mes,
   cuántos eventos por entidad, cuántas personas operan en el pico y cuándo es el pico, cuánto se
   conservan los datos, si hay cargas excepcionales, qué crecimiento esperan. Para cada número,
   anotá de dónde sale: "lo dijo la encargada", "contado en el cuaderno de septiembre",
   "supuesto". Dejá algunos en "supuesto" a propósito: vas a ver qué hace el agente con ellos.
2. Pegale:

> Before proposing any architecture we are going to size the system. Read `PROJECT.md` and the
> volume survey in `docs/VOLUME_SURVEY.md`. Distinguish primary data (facts only the business
> knows) from derived data (what can be computed from the primary data). Evaluate whether the
> primary data is complete enough to compute what follows; if any primary figure is missing, or
> is marked as an assumption, ask me for all the missing figures before going on. Never estimate
> a primary figure. If a previous system can be queried, use its real numbers and state where
> each came from. With the primary data complete, compute, showing the arithmetic: rows per year
> for the three largest tables, peak concurrency, data size at five years, and what breaks first
> if everything is multiplied by ten. Then present three options for persistence and concurrency,
> each with the cost of migrating to the others later. Do not choose: I choose. Do not write code.
> Reply in my language.

   Le estás pidiendo: distinguir primarios de derivados; **pedirte los primarios que falten o
   estén en "supuesto", y no estimarlos nunca**; calcular lo derivado con la cuenta a la vista;
   el escenario "por diez"; tres opciones con el costo de cambiar de una a otra; y que no elija.

3. Si te pide los "supuestos", bien: ese era el ejercicio. Conseguí los números (preguntale al
   dueño, contá en el cuaderno) y dáselos. Si no te los pidió y calculó igual, pará y preguntale
   qué hizo con los supuestos: es una falla del peldaño y conviene verla ahora.
4. Leé las tres opciones. Rehacé una cuenta a mano (por ejemplo, filas por año de la tabla más
   grande): tiene que darte lo mismo. Elegí.
5. Cerrá con:

> I choose option [B]. Record in `docs/SIZING.md`: the primary data with its source, the derived
> data with its arithmetic, the three options, the chosen one and why, and the decisions we are
> taking "just in case" even though they are not needed today (for example: the persistence
> interface is asynchronous from line one, even if the first engine is synchronous). Include the
> questions you asked and my answers.

**Verificación de completitud.** ¿Hay algún dato primario con fuente "supuesto" o sin fuente?
¿Cada dato derivado muestra la cuenta, y te da si la rehacés? ¿Hay tres opciones y una elegida con
razón? ¿Dice qué pasa "por diez"? ¿Las decisiones asimétricas están escritas? ¿Te preguntó?

**Entregable.** `docs/SIZING.md`.

**Errores típicos.** Completar el relevamiento con números inventados por vos para que el agente
no pregunte (es el mismo error que en la lección 0, y es peor acá porque esos números deciden la
arquitectura). Elegir la opción "más potente" por las dudas: el costo de migrar está en la tabla
justamente para que elijas la más chica que aguante el "por diez". Y no escribir las decisiones
asimétricas: si no están escritas, en la lección 4 el agente no las va a respetar.

**En el proyecto guía.** Primarios: 40 turnos/día × 250 días = 10.000 turnos/año; 3 mensajes por
turno = 30.000 mensajes/año; 5 años de conservación; pico de dos recepcionistas simultáneas. El
"por diez" es la pregunta de si se vende a otros consultorios: 100.000 turnos y 300.000 mensajes
por año. Las tres opciones típicas: un archivo SQLite (alcanza para un consultorio durante años,
no aguanta el por diez con varios escribiendo), PostgreSQL desde el principio (aguanta todo,
cuesta un poco más de infraestructura), o SQLite ahora con la interfaz asincrónica y una migración
prevista a PostgreSQL (la asimétrica). Para el curso elegimos la tercera: es la que enseña más.

### Lección 4 — El esqueleto con sus compuertas

**Qué tenés que entender.** Antes de que el sistema haga algo útil, tiene que arrancar, probarse
y desplegarse **vacío**. Parece una pérdida de tiempo ("¿desplegar qué, si no hay nada?") y es lo
contrario: el camino a producción es parte del producto, y la única forma de saber que funciona
es recorrerlo cuando todavía no hay nada que perder. En uno de los sistemas de origen el
despliegue llegó un mes después del arranque y costó cinco pendientes seguidos; con el esqueleto
desplegado la primera semana, esos cinco golpes se habrían dado en vacío.

Las **compuertas** son las condiciones para pasar de una etapa a otra ("la batería está en verde",
"el despliegue a prueba funcionó"). Escribirlas ahora, aunque parezcan obvias, es lo que después
permite decir "esto no pasa" sin discutir.

**La tarea.**

1. Escribí `docs/ENVIRONMENTS_SURVEY.md`: dónde va a correr el sistema (un servidor que ya
   tenés, un servicio en la nube), si va a haber un entorno de prueba y uno de producción, quién
   tiene acceso a qué, y cómo se despliega hoy si hay algo. Si no tenés nada, decilo: el agente
   te va a proponer la opción más simple.
2. Asegurate de tener las credenciales del lugar donde se va a desplegar, aunque sea un servicio
   gratuito. Sin eso, el esqueleto se queda en tu máquina y la lección no se puede terminar.
3. Pegale:

> We are going to build the skeleton of the system, with no functionality at all. Read
> `PROJECT.md`, `docs/SIZING.md` and the environments survey. Evaluate whether you have what is
> needed for the skeleton to run in the test environment (access, URL, deployment method); if
> anything is missing, ask me before starting. Then build: the folder structure; the server and
> the UI starting up; the test structure with one smoke test that passes; continuous
> integration running that test suite on every push; and the deployment to the test
> environment. Declare the gates of the workflow (what must be green to move from one stage to
> the next) in `docs/GATES.md`. When done, take a screenshot of the empty UI running in the
> test environment and show it to me. Do not add any functionality "while you are at it".
> Reply in my language.

   Le estás pidiendo que verifique accesos antes de empezar, la lista exacta de lo que es un
   esqueleto, las compuertas escritas, una captura real del entorno de prueba, y la prohibición
   de agregar funcionalidad.

4. Esta tarea es larga (una o dos horas de trabajo del agente) y va a tener idas y vueltas:
   credenciales que faltan, un servicio que pide confirmar el correo, etc. Es normal. Lo que no es
   normal es que te diga "listo" sin la captura del entorno de prueba.
5. Cuando te muestre la captura, abrí vos la URL en tu navegador. Tiene que verse lo mismo.
6. Cerrá con:

> Skeleton approved. Record in `docs/STATUS.md` the test environment URL, the command to run
> the tests and the command to deploy, and mark this step as done. Then run the deployment a
> second time and show me that the second run changed nothing.

**Verificación de completitud.** ¿Abriste vos la URL del entorno de prueba y viste la pantalla
vacía? ¿Hay un enlace a una corrida de integración continua en verde? ¿El despliegue se corrió dos
veces y la segunda no rompió nada? ¿Las compuertas tienen cada una una condición verificable? ¿Hay
alguna funcionalidad que no pediste?

**Entregable.** El repositorio con el esqueleto, la integración continua en verde, la URL del
entorno de prueba funcionando, `docs/GATES.md`, y `docs/STATUS.md` con los tres comandos.

**Errores típicos.** Aceptar "funciona en local, el despliegue lo vemos después": no, el
despliegue es el esqueleto. Aceptar una captura de la máquina del agente en vez del entorno de
prueba. Y dejar que "ya que está" te agregue una pantalla de login, un menú, un logo: cada cosa
que entra sin pendiente es alcance que se escapó.

**En el proyecto guía.** El esqueleto de Turnera es una página web que dice "Turnera — versión
0.0.1" corriendo en una URL pública de un entorno de prueba, un servidor que responde "ok" en una
ruta de salud, un test de humo que llama a esa ruta, la integración continua corriendo ese test en
cada push, y el despliegue automático al entorno de prueba. Las compuertas: "batería en verde para
fusionar", "entorno de prueba en verde para promover a producción", "vuelta atrás probada para el
primer despliegue a producción". Nada más. Y es raro lo satisfactorio que es ver esa página vacía
en una URL real.

---

## Tramo del bucle: lecciones 5 a 10

Estas seis lecciones son las que vas a usar **con cada cambio**, durante todo el proyecto. Se
aprenden en una tarde, pero se practican durante semanas. La idea es que al final del tramo
tengas el reflejo: tomar un pendiente, construir, probar en rojo, actualizar el otro lado, medir
lo que haya que medir, y reportar separando lo verificado de lo creído. Ese reflejo es el método.

Para practicarlas vas a necesitar funcionalidad real. En el proyecto guía, el primer bloque de
pendientes es la agenda básica: ver los turnos del día, cargar un turno, cancelarlo. Nada de
mensajes ni pagos todavía; eso viene después de los candados (lección 12).

### Lección 5 — El plan son los pendientes

**Qué tenés que entender.** No hay un "plan" por un lado y una "lista de tareas" por el otro:
**la lista de pendientes es el plan**. Cada pendiente tiene número, de dónde viene (la decisión o
el pedido que lo originó), cómo se verifica que está hecho, y, cuando se cierra, la evidencia. Eso
último es lo que vos vas a mirar en vez de mirar el código. Y una regla de oro para el agente: lo
que aparece fuera de la lista se anota como pendiente nuevo, no se hace.

**La tarea.**

1. Escribí en `docs/INITIAL_SURVEY.md` (o en un archivo aparte) el pedido del cliente para el
   primer bloque de funcionalidad, tal como lo diría el cliente, con sus ambigüedades. Para
   Turnera: "quiero ver los turnos del día, cargar uno nuevo y cancelar".
2. Pegale:

> We are going to turn everything that must be done into numbered pending items. Read
> `PROJECT.md`, the client's request and whatever is in `docs/STATUS.md`. If the request is
> ambiguous on any point such that you cannot write a verifiable pending item for it, ask me;
> do not resolve it by assuming. Create `docs/PENDING.md` with one item per thing to do: number
> (PND-001 onwards), one-line title, what is requested, which decision originates it (or
> "client request, date"), how it will be verified as done, and status. Order them by the
> priority I gave you; if I gave none, propose an order and tell me why. Reply in my language.

   Le estás pidiendo que convierta el pedido en ítems verificables, que **pregunte cuando el
   pedido no da para escribir uno verificable**, y que proponga un orden con su razón.

3. Contestá las preguntas (para Turnera va a preguntar, por ejemplo, qué es "el día": ¿el de hoy,
   o cualquiera que se elija?; ¿cancelar borra o marca?). Esas preguntas son decisiones de
   negocio; en la lección 6 vas a ver dónde se escriben.
4. Agregá al contrato de convivencia la rutina de cada sesión. Pegale:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before touching any code, open
> `docs/PENDING.md`, tell me which item you are taking and why. Every commit cites its pending
> item. A pending item is closed with written evidence (the test, the screenshot, the number),
> never with 'done'. If along the way you see something that is not on the list, add it as a new
> pending item; do not do it."

5. Ahora sí, empezá a construir. Pedile que tome el primer pendiente. A partir de acá, cada
   sesión empieza con "qué pendiente tomás y por qué".

**Verificación de completitud.** ¿Cada pendiente dice cómo se verifica? ¿Hay pendientes cerrados
sin evidencia ni commit? Tomá tres commits al azar: ¿citan su pendiente? ¿Apareció en el código
algo sin pendiente? ¿Te preguntó por lo ambiguo?

**Entregable.** `docs/PENDING.md` con el primer bloque, la rutina en el contrato, y el primer
pendiente en curso.

**Errores típicos.** Escribir pendientes sin "cómo se verifica" ("mejorar la pantalla de
turnos"): no se pueden cerrar, y entonces se cierran con "listo". Dejar que el agente cierre
pendientes sin evidencia porque "ya lo vi funcionar". Y el que más cuesta corregir: dejar que haga
"una cosita más" fuera de la lista. La primera vez que lo dejás, perdiste el alcance exacto.

**En el proyecto guía.** El primer bloque de Turnera son unos seis pendientes: PND-001 ver los
turnos de un día; PND-002 cargar un turno con paciente, profesional, fecha y hora; PND-003 impedir
dos turnos del mismo profesional a la misma hora; PND-004 cancelar un turno (marcar, no borrar:
decisión de la lección 6); PND-005 buscar un paciente por nombre o teléfono; PND-006 el alta de
paciente con los datos mínimos. Cada uno con su verificación: "se ve en la pantalla y queda en la
base", "al intentar el sobreturno la pantalla avisa y la base no lo guarda", etc.

### Lección 6 — Las decisiones se escriben junto al código

**Qué tenés que entender.** El modelo, cuando encuentra un hueco en las reglas de negocio, **lo
llena**. No se detiene a preguntar; completa con lo que le parece más probable, con la misma
naturalidad con que escribe lo demás. Por eso esta lección no es "escribí las decisiones" sino
"exigile que frene y pregunte cuando falte una". Y cuando decidís, la decisión se escribe con tus
palabras textuales, tu nombre y la fecha, en el commit y en un registro. Seis semanas después,
cuando alguien pregunte "¿por qué cancelar no borra?", la respuesta está escrita y es tuya.

**La tarea.**

1. Agregá al contrato la rutina de decisiones. Pegale:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Whenever implementing something requires a
> business rule that is not written down, or you must choose between two approaches that change
> what the user sees, stop and ask me, in prose, with your recommendation and the alternative. Do
> not implement the one you prefer. When I decide, write the decision with my name and the date
> in the commit message and in `docs/DECISIONS.md`, with the exact words I used. If I do not
> answer and you must move on, implement the most reversible option and mark it 'decision by
> omission, pending confirmation', so that I can review it."

   Le estás pidiendo que frene ante una regla no escrita, que pregunte con recomendación y
   alternativa (para que puedas decidir en diez segundos), que registre tus palabras textuales, y
   que cuando no contestás elija lo más reversible y lo marque.

2. Seguí construyendo los pendientes del bloque. Cada vez que te pregunte una regla de negocio,
   decidí y contestá con el formato de cierre:

> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.

3. Hacé la prueba contraria, una vez, a propósito: dejá una pregunta sin contestar durante una
   sesión y mirá qué hace. Tiene que elegir lo más reversible y marcarlo "por omisión". Si
   eligió lo que le pareció y no lo marcó, es una falla del peldaño: corregila en el contrato.

**Verificación de completitud.** Abrí tres commits que toquen reglas de negocio: ¿citan quién
decidió y cuándo? ¿Hay decisiones "por omisión" sin confirmar? ¿Hay alguna regla en el sistema que
no reconocés como tuya? ¿Las frases son textuales o "mejoradas"?

**Entregable.** `docs/DECISIONS.md` creciendo, con al menos cinco decisiones del primer bloque,
y los commits citándolas.

**Errores típicos.** Contestar las preguntas por chat y no exigir que queden escritas: a la
tercera sesión ya nadie se acuerda. Dejar que el agente "mejore" tus palabras: una regla
parafraseada es una regla distinta. Y el más grave: descubrir en producción una regla que nadie
decidió. Cuando pase (va a pasar), no es un bug: es un fallo del peldaño 6, y se arregla en el
contrato, no solo en el código.

**En el proyecto guía.** Decisiones típicas del primer bloque de Turnera: "cancelar marca el
turno como cancelado y guarda quién y cuándo; no se borra nada"; "un profesional no puede tener dos
turnos a la misma hora, pero sí dos pacientes en un turno doble si el profesional lo habilitó";
"el teléfono del paciente es obligatorio; el correo no". Cada una con fecha y con el nombre de la
encargada.

### Lección 7 — Tests como candados, probados en rojo

**Qué tenés que entender.** Esta es la lección central del curso. Un test que nunca viste
fallar no sabés si prueba algo. El modelo escribe el código y el test en la misma sesión, con el
mismo entendimiento: si entendió mal el pedido, el test prueba lo que entendió, y pasa. La única
forma barata de saber que el test mira lo que importa es **verlo en rojo contra el código viejo**:
si el código de antes del cambio también lo pasa, el test no distingue el antes del después, y
entonces no sirve. Por eso el pedido no es "escribí tests" sino "mostrame el rojo, después el
verde, después la regresión".

Y una segunda idea: las pruebas de punta a punta. Un test que verifica desde la pantalla (hace
clic, tipea, lee) y comprueba el efecto en el backend (la fila quedó, el estado cambió) es el que
reemplaza tu lectura del código. Es el criterio X2 de la lección 0 convertido en práctica.

**La tarea.**

1. Agregá al contrato la rutina de evidencia. Pegale:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "To close a pending item I need evidence,
> not your word. (1) Write the test that proves what the item asks for. (2) Demonstrate that this
> test fails against the previous code: you may temporarily revert the change, or run the test
> against the old version, but show me the red output. (3) Show me the green output with the
> change. (4) Run the regression suite for the neighbouring items and show me it is still green.
> (5) Do not replace with mocks the very part you are trying to test. If testing end to end
> requires something you lack (data, access, an environment), ask me for it; do not simulate what
> you do not have. Finally, the commit message says 'proved red against [what]' and the test
> counts."

   Le estás pidiendo el test, **el rojo demostrado con la salida a la vista**, el verde, la
   regresión de los vecinos en la misma sesión, nada de simular justo lo que se prueba, y pedir
   lo que falte para probar de punta a punta en vez de simularlo.

2. Tomá el pendiente del sobreturno (PND-003 en Turnera, o el equivalente en tu proyecto: una
   regla que impide algo). Pedile que lo cierre con la rutina. Leé el reporte: tiene que haber
   una salida en rojo con números ("1 de 1 falla contra la versión sin la regla") y después el
   verde.
3. Pedile un test de punta a punta para ese mismo pendiente: que abra la pantalla, intente cargar
   el sobreturno, lea el aviso, y compruebe en la base que no se guardó. Si te dice que no puede
   porque la pantalla no se puede operar por programa, pará: eso es X2 fallando, y hay que
   arreglarlo ahora (agregar identificadores a los elementos de la pantalla) antes de seguir.
4. Cuando el agente diga que algo "no se puede probar", pegale:

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

**Verificación de completitud.** ¿El reporte muestra el rojo, con números? ¿La regresión corrió
en la misma sesión, con números? ¿Hay alguna parte simulada justo donde está el cambio? ¿El
commit dice "probado en rojo"? ¿El test de pantalla verifica también el backend?

**Entregable.** Al menos tres pendientes cerrados con la rutina completa (rojo, verde,
regresión), uno de ellos con un test de punta a punta.

**Errores típicos.** Aceptar "los tests pasan" sin números y sin rojo. Aceptar que la batería se
"acelere" reemplazando las pruebas de punta a punta por simulaciones. Y dejar pasar un "no se
puede probar" sin abrir el pendiente: la no-testeabilidad es deuda, y la deuda se registra.

**En el proyecto guía.** El rojo del sobreturno se ve así: el agente quita temporalmente la
regla, corre el test, y la salida dice que el test falló porque el segundo turno se guardó. Pone
la regla de vuelta, corre, verde. Después la regresión: los tests de PND-001 y PND-002 siguen en
verde. Y el de punta a punta: un navegador controlado por programa carga el formulario, aprieta
"guardar", lee el mensaje "ese horario ya está ocupado", y una consulta a la base confirma que hay
un solo turno a esa hora. Cuando veas ese reporte por primera vez, vas a entender para qué es todo
el método.

### Lección 8 — Simetría entre productor y consumidor, y el registro de anti-patrones

**Qué tenés que entender.** Cuando cambiás una punta del sistema (el servidor, la base, un
robot), la otra punta (la pantalla, un contador, un reporte) tiene que cambiar en el mismo
commit. Si no, divergen, y el usuario ve un número en un lado y otro en el otro. El principio
que lo evita es simple de enunciar y difícil de sostener: **toda lista tiene un solo dueño**. Los
estados posibles de un turno, las columnas de un reporte, las causas por las que algo espera: las
define una sola parte (el productor) y las demás las leen de ahí. En cuanto hay dos copias, una
está desactualizada; solo falta saber cuál.

La segunda mitad de la lección es el registro de anti-patrones (GOTCHAS): los errores que ya te
comiste una vez, anotados con su olor, su causa raíz, su arreglo y cómo detectarlos antes. Lo
importante no es anotarlos: es agregar la verificación automática que los detecte, porque un
anti-patrón anotado y no automatizado se repite cuando cambia la sesión.

**La tarea.**

1. Pedile el mapa de contratos:

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

   Le estás pidiendo el inventario de contratos con sus dos lados, y que lo que no ve lo declare
   en vez de omitirlo.

2. Agregá la rutina al contrato:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before closing any change that touches a
> contract, look up every consumer in the map and update them in the same commit. Always prefer
> that the producer defines the list (columns, causes, states) and the consumer reads it, rather
> than each keeping its own copy. If the map does not have that relationship, add it."

3. Hacé la prueba de la lista: elegí una lista que aparezca en la pantalla (en Turnera, los
   estados de un turno: pendiente, confirmado, cancelado, ausente) y pedile al agente que te
   muestre dónde está definida y dónde se lee. Si hay dos definiciones, pedile que deje una sola.
4. La primera vez que algo se rompa por segunda vez (va a pasar en las próximas semanas), pegale:

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

**Verificación de completitud.** Elegí un contrato del mapa: ¿cada consumidor lo lee del
productor o tiene su copia? ¿Hay un número que se muestre en dos pantallas y den igual? ¿Cada
entrada de GOTCHAS tiene las cuatro partes? ¿Se repitió algo que ya estaba anotado?

**Entregable.** `docs/PRODUCER_CONSUMER_MAP.md`, la rutina en el contrato, y `docs/GOTCHAS.md`
(aunque arranque con una sola entrada).

**Errores típicos.** Hacer el mapa una vez y no volver a mirarlo: tiene que crecer con cada
contrato nuevo. Anotar anti-patrones como anécdotas ("una vez pasó que…") sin la parte "cómo
detectarlo antes". Y el clásico: el mismo texto de un estado escrito a mano en el servidor y en
la pantalla; el día que uno cambie, el otro queda.

**En el proyecto guía.** El mapa de Turnera tiene, al principio, cuatro o cinco contratos: la
lista de estados de turno (la define el servidor, la lee la pantalla y el reporte mensual); la
tabla de turnos (la escribe la carga, la leen la agenda del día y el reporte); la tabla de
pacientes; y, más adelante, la cola de mensajes (la escribe la agenda, la lee el enviador). El
primer GOTCHA suele ser de fechas: la agenda mostraba el turno en el día equivocado porque el
servidor guardaba en una zona horaria y la pantalla mostraba en otra. Olor: "el turno de las 23
aparece mañana". Causa raíz: dos zonas horarias. Arreglo: una sola, en el servidor. Detección:
un test con un turno a las 23:30.

### Lección 9 — Medir antes de construir, con un instrumento que también se verifica

**Qué tenés que entender.** El modelo produce afirmaciones con número ("hay unas 120 consultas
de ese tipo") y suenan exactamente igual cuando son medidas que cuando son estimadas. Vos no
podés distinguirlas por el tono. La única forma es exigir el instrumento: "¿con qué lo mediste?
mostrame el comando". La regla del peldaño es que **ningún número que decide algo sale de una
impresión**: sale de un medidor que vive en el repositorio, que tiene un test que lo verifica
contra un caso conocido, y que vos podés correr.

Y hay algo más, que aprendimos a los golpes: los medidores también mienten. En uno de los
sistemas de origen, un medidor daba cero porque no veía una parte del código, y otro decía 27
cuando eran 44. Por eso la auditoría en dos direcciones: del código a la medida (¿todo lo que
debería contarse está contado?) y de la medida al código (¿todo lo contado existe de verdad?).

En un proyecto chico, "medir" es modesto: contar cuántas consultas hace una pantalla al cargar,
cuánto tarda el reporte mensual, cuántos mensajes se mandaron ayer. No hace falta un trinquete ni
un presupuesto por camino. Lo que sí hace falta es que el número tenga un comando atrás.

**La tarea.**

1. Elegí una hipótesis. En Turnera, una buena: "la agenda del día hace una consulta a la base
   por cada turno que muestra" (el clásico bucle N+1). Si no es cierta, mejor: vas a ver cómo se
   verifica una hipótesis falsa.
2. Pegale:

> Before building anything, we are going to measure. The hypothesis is: [the day view runs one
> database query per appointment shown]. Write a meter (a script that lives in the repository)
> that measures [the number of queries the day view runs for a day with N appointments], and a
> test for the meter that checks it against a known case where the answer is known in advance.
> If measuring requires access or data you lack, ask me; do not approximate silently. If some
> part can only be approximated, mark it as approximate and tell me the margin. Run the meter,
> show me the number together with the command that produces it, and audit it in both
> directions: from the code to the measurement (is everything that should be counted, counted?)
> and from the measurement to the code (does everything counted actually exist?). Only then
> propose what to build. Reply in my language.

   Le estás pidiendo el medidor en el repositorio, el test del medidor, pedir lo que le falte en
   vez de aproximar, marcar lo aproximado, el número con el comando, la auditoría en dos
   direcciones, y el orden: primero medir, después proponer.

3. Corré vos el comando que te dio. Tiene que darte el mismo número. No hace falta que entiendas
   el script; sí que lo ejecutes.
4. Si la hipótesis era cierta y el agente propone arreglarlo, pedile un presupuesto:

> Set the budget for [queries] on this path at the measured value plus a small margin, and
> protect it with a test that fails if it is exceeded. Tell me the number and the margin.

   Así, si alguien vuelve a meter el bucle dentro de tres meses, la batería lo detecta.

5. Agregá al contrato la regla cinco, para cuando un plan traiga números:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before executing a plan that asserts
> numbers, verify every number with the meter. If any does not match, stop and tell me; do not
> execute on a wrong number."

**Verificación de completitud.** ¿Corriste el medidor y te dio lo mismo? ¿Tiene test, contra qué
caso conocido? ¿Hay algún número en el reporte sin medidor atrás? ¿Lo aproximado está marcado?
¿Hay presupuesto con test?

**Entregable.** Un medidor en el repositorio con su test, un número con su comando y fecha en
`docs/STATUS.md` o en el pendiente, y (si correspondía) un presupuesto protegido por un test.

**Errores típicos.** Aceptar el número sin correr el comando: la mitad del valor de esta lección
está en que lo corras vos. Un medidor que da cero: casi nunca es cero; casi siempre no está viendo
algo. Y dejar que el agente "arregle mientras mide": el orden es el método.

**En el proyecto guía.** El medidor de Turnera es un script que carga un día con 10, 50 y 200
turnos en una base de prueba, abre la agenda de ese día contando las consultas, y escribe los tres
números. El test del medidor verifica que con 0 turnos cuenta exactamente las consultas base
(digamos, 2). Si había bucle, los números son 12, 52 y 202; se arregla, pasan a ser 3, 3 y 3, y
el presupuesto queda en 4 con un test que falla si la agenda hace más de 4 consultas para
cualquier cantidad de turnos.

### Lección 10 — Verificación honesta y reporte proporcional

**Qué tenés que entender.** Si vos no vas a leer código, el reporte del agente tiene que ser
confiable, y eso no pasa solo. El modelo fue entrenado para ser útil y completo, y un reporte que
dice "esto no lo pude verificar" se siente menos útil que uno que dice "listo". Entonces hay que
**pedirle explícitamente** las malas noticias, los puntos ciegos y lo que no hizo. Si no se lo
pedís, no te lo da; no porque lo oculte, sino porque no lo considera parte de la respuesta.

La estructura que lo vuelve honesto son tres bloques: **verificado** (con la prueba al lado),
**creído** (lo que piensa que funciona y por qué no lo probó), y **puntos ciegos** (lo que no
puede ver desde donde está). Y una regla: las malas noticias primero.

**La tarea.**

1. Agregá al contrato la rutina de reporte:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "When you report, separate three blocks:
> VERIFIED (what you tested, with the command and its output), BELIEVED (what you think works but
> did not test, and why not), and BLIND SPOTS (what you cannot see from where you are: another
> environment, real data, the user's browser). Cover every item I asked for, one by one, even when
> the answer is 'I did not do it'. No claim without its proof next to it. Do not say 'done': say
> what is done and how you know it. If something went wrong, say it first."

2. Pedile que cierre el próximo pendiente y leé el reporte con la lista de verificación de abajo.
   La primera vez, casi seguro, el bloque "puntos ciegos" va a estar vacío. Preguntale: "¿qué no
   podés ver desde donde estás?". Tiene que haber algo (tu navegador, el entorno de producción,
   los datos reales). Si insiste en que nada, insistí vos.
3. Practicá el "sigue roto". Pedile algo chico, verificá en el entorno de prueba, y si por
   cualquier razón no ves el cambio (es común: el despliegue tarda, o no se hizo), decile "sigue
   roto" y pegale:

> Before diagnosing again, compare the version running where I see the problem with the version
> that contains your fix. Tell me both. If they differ, the problem is publication, not code.

   La mitad de los "sigue roto" son arreglos que están en el repositorio y no en el lugar donde
   vos mirás. Esta cláusula te ahorra horas.

**Verificación de completitud.** ¿Están los tres bloques? ¿Elegiste una afirmación de
"verificado" al azar y tiene su prueba al lado, y la pudiste reproducir? ¿Cubre cada ítem de lo
que pediste? ¿Las malas noticias están al principio? ¿Dijo "listo" a secas alguna vez?

**Entregable.** La rutina en el contrato y tres reportes consecutivos con los tres bloques, uno
de ellos con un punto ciego real.

**Errores típicos.** Leer solo el bloque "verificado" y saltear los otros dos: los otros dos son
los que te protegen. Aceptar "debería funcionar" dentro de "verificado": eso es "creído"
disfrazado. Y acostumbrarte a reportes cada vez más largos: un reporte inflado está tapando algo
con volumen.

**En el proyecto guía.** Un buen reporte de cierre de PND-004 (cancelar un turno) en Turnera:
"VERIFICADO: el test de cancelación pasa (1/1, probado en rojo contra la versión que borraba);
regresión 6/6; en el entorno de prueba, el turno 17 del 3 de noviembre figura cancelado por
'recepcion1' a las 10:42 (captura). CREÍDO: el reporte mensual va a contar bien las cancelaciones,
pero no lo probé porque el reporte es PND-011 y todavía no existe. PUNTOS CIEGOS: no puedo ver
cómo se ve el estado 'cancelado' en el celular de la recepcionista; probalo vos."

---

## Tramo de operación: lecciones 11 a 15

Estas cinco lecciones son las que convierten "funciona" en "se puede sostener". Se hacen cuando
el primer bloque de funcionalidad está construido con el bucle, y antes de que el sistema actúe
sobre el mundo (mande mensajes, cobre) o tenga usuarios reales. En el proyecto guía, es el momento
de agregar los recordatorios y la seña, y por eso la lección 12 (candados) va antes de construir
esas funcionalidades, no después.

### Lección 11 — La auditoría periódica como insumo del plan

**Qué tenés que entender.** Cada tanto hay que mirar el sistema entero con ojos frescos, y lo que
se vea no va a un informe que se archiva: va a la lista de pendientes. La parte importante es
"ojos frescos": el que audita no tiene que ser el que construyó, porque comparte sus supuestos. Un
modelo que construyó un módulo "sabe" que la contraseña escrita en el código era provisoria; un
modelo que lo ve por primera vez la reporta como lo que es. No hace falta otra empresa: alcanza
con **otra sesión, con otro archivo de instrucciones, que no haya participado**.

**La tarea.**

1. Abrí una sesión nueva del agente en una copia limpia del repositorio (clonalo en otra carpeta).
   Si tu herramienta lo permite, dale un archivo de instrucciones distinto, que solo diga "sos un
   auditor; no construiste este sistema". Dale acceso de solo lectura al entorno de prueba.
2. Pegale:

> Audit this system for [integrity, security, performance and code quality]. Read-only: change
> nothing except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires
> access you lack (the database, the log, an environment), tell me and mark that part as not
> audited; do not pass it as fine. Go through all of the code, not a sample. For every finding:
> where it is (file and line), what the risk is, what evidence proves it (the command, the
> query, the number), and its priority: P0 must be fixed now, P1 soon, P2 when possible. Give a
> grade to every dimension you audited. End with the list of P0 findings turned into proposed
> pending items. Reply in my language.

   Le estás pidiendo solo lectura, que declare lo que no pudo auditar en vez de aprobarlo por
   omisión, todo el código y no una muestra, cada hallazgo con ubicación, riesgo, evidencia y
   prioridad, notas por dimensión, y los P0 ya como pendientes propuestos.

3. Leé el informe. Elegí dos hallazgos y pedile al auditor que te muestre la evidencia (el
   comando, la línea). Tiene que poder.
4. Volvé a la sesión del constructor y pegale:

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.

5. Repetí esta lección antes del primer despliegue a producción (lección 13) y, después, cada
   uno o dos meses.

**Verificación de completitud.** ¿El informe dice qué NO pudo auditar? ¿Dos hallazgos al azar
tienen archivo, línea y evidencia reproducible? ¿Cada P0 tiene su pendiente abierto? ¿Las notas
se van a poder comparar con la próxima auditoría? ¿Auditó una sesión distinta de la que construyó?

**Entregable.** `docs/AUDIT_[fecha].md` y los pendientes P0/P1 abiertos.

**Errores típicos.** Auditar con la misma sesión que construyó: va a confirmar sus propios
supuestos. Aceptar un informe sin ningún P0 en un sistema de más de un mes: casi nunca es verdad.
Y archivar el informe sin abrir los pendientes: ahí la auditoría no sirvió para nada.

**En el proyecto guía.** La primera auditoría de Turnera suele encontrar: datos de pacientes en
el log (teléfonos impresos al enviar mensajes: P0); la búsqueda de pacientes por nombre sin índice
(P1, se va a notar a los 5.000 pacientes); el formulario de turno sin validar que la fecha sea
futura (P1); y alguna dependencia con una vulnerabilidad conocida (P1). Cuatro pendientes nuevos,
todos con archivo y línea.

### Lección 12 — Fail-closed, candados y cero daño silencioso

**Qué tenés que entender.** El software, por defecto, ante la duda sigue adelante: si la
validación falla, el código continúa; si el servicio no responde, se asume que todo está bien.
Es "fail-open", como una puerta que se abre cuando se corta la luz. El método invierte el defecto:
**ante la duda, no**. Toda acción con consecuencia (cobrar, enviar, borrar, aprobar) lleva un
candado, tiene un camino de vuelta escrito, y toda automatización nueva arranca en modo de ensayo,
registrando lo que habría hecho, hasta que vos la habilitás.

Esta lección va **antes** de construir las funcionalidades que actúan sobre el mundo. En Turnera,
antes de los recordatorios y la seña.

**La tarea.**

1. Escribí `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` con el dueño: qué hace o va a hacer el sistema
   que cobra, envía, aprueba, borra o le avisa a alguien de afuera; qué pasa si se hace dos veces;
   qué pasa si se hace mal; cómo se deshace.
2. Pegale:

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock. Reply in my language.

   Le estás pidiendo que compare lo que el negocio dijo con lo que el código hace (ahí aparecen
   las acciones que nadie recordaba), que las diferencias las pregunte, y para cada acción la
   reversibilidad, el candado y el camino de vuelta, con la regla del fail-closed escrita.

3. Confirmá candado por candado. Cerrá con:

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.

4. Ahora construí las funcionalidades con consecuencia (los recordatorios, la seña) con el bucle
   de las lecciones 5 a 10, y dejalas en modo de ensayo. Mirá durante unos días el registro de "habría
   mandado" antes de habilitar el envío real.

**Verificación de completitud.** ¿Cada acción que cobra, envía, aprueba o borra está en la tabla?
¿Cada candado tiene su test en rojo? ¿Toda acción irreversible tiene camino de vuelta escrito?
¿Las automatizaciones nuevas arrancaron en modo de ensayo y viste el registro antes de
habilitarlas?

**Entregable.** `docs/LOCKS.md`, un test por candado probado en rojo, y las automatizaciones en
modo de ensayo con su registro.

**Errores típicos.** Habilitar el envío real "para probar con un mensaje a mi propio teléfono":
el modo de ensayo existe justamente para eso. Un candado que se saltea con un parámetro "para
pruebas": ese parámetro va a quedar puesto en producción. Y no mirar el registro de "habría
hecho": es la única ventana para ver un error antes de que le llegue a un paciente.

**En el proyecto guía.** La tabla de candados de Turnera: enviar recordatorio (no reversible; candado:
idempotencia por turno, un solo envío por turno y canal, límite de 200 por día, modo de ensayo
primero; vuelta: ninguna, por eso el límite); cobrar seña (reversible con devolución; candado:
confirmación explícita de la recepcionista, monto fijado por el profesional; vuelta: devolución por
el proveedor de pagos); cancelar turno (irreversible para el paciente; candado: confirmación y
registro de quién; vuelta: recrear el turno); borrar paciente (irreversible; candado: doble
confirmación, solo la encargada, y solo si no tiene turnos futuros; vuelta: ninguna, por eso doble).
Cada candado con un test que muestra que, sin el candado, la acción ocurría.

### Lección 13 — Integración continua, entornos, secretos y despliegue como parte del producto

**Qué tenés que entender.** Llegar a producción tiene que ser un paquete reproducible: los tests
corren **una** vez, el despliegue solo empaqueta y sube, la configuración vive en el servidor y no
en el repositorio, hay un procedimiento para promover de prueba a producción que se puede correr
dos veces, y la vuelta atrás está **probada** (una vuelta atrás que nunca se probó no existe).
Sobre los secretos, una regla sin excepciones: **un secreto que se vio en un chat, en un log o en
un commit ya no es un secreto**; se rota, y punto.

Ya tenés buena parte de esto desde el esqueleto (lección 4). Esta lección lo completa hacia
producción.

**La tarea.**

1. Completá `docs/ENVIRONMENTS_SURVEY.md` con lo que falta para producción: el dominio, dónde
   van a vivir los secretos, cuánta cuota de integración continua tenés (si usás GitHub Actions,
   fijate el límite del plan: uno de los sistemas de origen la fundió corriendo los tests tres
   veces por commit).
2. Pegale:

> We are going to close the path to production. Read the environments and access survey.
> Evaluate whether you have what is needed to deploy to production safely (access, domain,
> where the secrets live, how to roll back); if anything is missing, ask me. Then set up: (1)
> continuous integration runs the full test suite exactly once per commit; (2) the deployment
> waits for that run's result and only packages and uploads, without running tests again; (3)
> each environment's configuration lives on the server (environment file or vault), never in the
> repository; (4) a written procedure to promote from the test environment to production, which
> can be run twice without breaking anything; (5) the rollback, tested; (6) an automatic check
> that prevents committing a secret. Document all of it in `docs/DEPLOYMENT.md` so that a person
> can do it by hand without you. Reply in my language.

   Le estás pidiendo los accesos antes de empezar, los tests una sola vez por commit, el
   despliegue que solo empaqueta, la configuración afuera, la promoción repetible, la vuelta
   atrás probada, el candado contra secretos, y la documentación para una persona.

3. Antes del primer despliegue a producción, hacé la auditoría de la lección 11 si no la hiciste.
4. Agregá al contrato la rutina de despliegue:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before touching production: the test
> environment is green with the same version; the rollback is ready; and tell me what changes in
> the configuration. After deploying: show me the version running in production and an
> end-to-end check on production, read-only."

5. Hacé el primer despliegue a producción, con el sistema todavía sin usuarios reales. Y después
   **probá la vuelta atrás**: pedile que vuelva a la versión anterior y te muestre que está
   corriendo, y después que vuelva a la nueva.
6. Si en algún momento del curso pegaste un secreto en el chat (una clave de API, una contraseña),
   pegale:

> That secret is compromised: rotate it now, tell me everywhere else it was used, and add the
> check that would have caught it.

**Verificación de completitud.** ¿Cuántas veces corre la batería por commit? (una; pedí el
enlace). ¿Hay algún valor real de configuración en el repositorio? (pedile la búsqueda vacía).
¿Podrías seguir `docs/DEPLOYMENT.md` vos solo? ¿La vuelta atrás se probó, cuándo, con qué
evidencia? ¿Se rotó todo secreto que apareció en el chat? ¿Sabés cuánta cuota de integración
continua te queda?

**Entregable.** La integración continua una vez por commit, el despliegue que solo empaqueta,
`docs/DEPLOYMENT.md`, la vuelta atrás probada, el candado anti-secretos activo, y el sistema
corriendo en producción (sin usuarios todavía).

**Errores típicos.** El despliegue "a mano, rápido, porque es un cambio chico": los cambios
chicos rompen producción porque nadie los prueba. El archivo de ejemplo de configuración con
valores que parecen reales (lo son). Y no probar la vuelta atrás hasta el día que la necesitás.

**En el proyecto guía.** Para Turnera, la integración continua corre la batería (unos 30 tests a
esta altura, incluidos los de punta a punta) en cada push; el despliegue a prueba es automático al
fusionar en `main`; la promoción a producción es un comando que empaqueta la versión que está en
prueba y la sube, con la configuración (la clave del proveedor de mensajes, la del proveedor de
pagos, la URL de la base) en un archivo de entorno en el servidor que no está en el repositorio.
La vuelta atrás es el mismo comando con la versión anterior. Y el candado anti-secretos es una
verificación en cada commit que rechaza cualquier cosa que parezca una clave.

### Lección 14 — Documentación viva y manuales que una persona puede seguir sin IA

**Qué tenés que entender.** El sistema tiene que poder usarse, mantenerse y recuperarse sin el
agente y sin vos. El criterio para el manual de recuperación es concreto: **lo tiene que poder
seguir una persona de confianza que no programe, a las tres de la mañana, con el sistema caído y
el agente sin conexión**. Si un paso dice "consultar con el desarrollador", está incompleto. Y
como regenerar documentación con un modelo es gratis, la regla pasa a ser "en el mismo commit":
cada cambio que toca lo que el usuario ve, lo que el operador hace o cómo se despliega, actualiza
el manual en el mismo commit.

**La tarea.**

1. Agregá la rutina al contrato:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Every change that modifies what the user
> sees, what the operator does, or how the system is deployed, updates the corresponding manual in
> the same commit. If you do not know which manual, ask."

2. Pegale:

> Generate three manuals from the system as it is today in the test environment: the user
> manual (screen by screen, with real screenshots, in the user's language, no jargon); the
> maintenance manual (how it is built, where everything is, how to run the test suite, how to
> add a module); and the infrastructure and recovery manual (how to deploy, how to roll back,
> how to restore a backup, what to do if it goes down; written for a person who has to do it by
> hand, without AI, at three in the morning). If for any section you need something only the
> business knows (who is responsible for what, which phone number to call), ask me; do not leave
> a gap and do not invent. Each manual carries a date and the system version. Reply in my
> language.

   Le estás pidiendo los tres manuales con capturas reales, el criterio de las tres de la mañana
   para el de recuperación, que pregunte lo que solo el negocio sabe en vez de dejar huecos, y
   fecha y versión.

3. La prueba real: dale el manual de recuperación a alguien que no programe (el dueño, un
   familiar) y pedile que siga la sección "se cayó" en el entorno de prueba. Donde se trabe, hay
   que arreglar el manual.
4. Después del próximo cambio de pantalla, verificá que el commit tocó el manual de usuario.

**Verificación de completitud.** ¿Una captura al azar coincide con el entorno de prueba de hoy?
¿Alguien que no programa pudo seguir la sección "se cayó"? ¿El último commit que cambió una
pantalla tocó el manual? ¿Hay huecos tipo "[completar]"? ¿Cada manual dice para qué versión vale?

**Entregable.** Los tres manuales con fecha y versión, y la prueba con una persona hecha.

**Errores típicos.** Generar los manuales una vez y no ponerle la rutina al contrato: a los dos
meses tienen capturas de pantallas que ya no existen. Un manual de recuperación que empieza con
"abrí una sesión con el agente". Y no hacer la prueba con una persona: es la única verificación
que vale.

**En el proyecto guía.** El manual de usuario de Turnera tiene seis pantallas con captura; el
de mantenimiento explica dónde está cada módulo y cómo correr la batería; y el de recuperación
dice, en orden, con los comandos: cómo saber si el sistema está caído, cómo reiniciarlo, cómo
volver a la versión anterior, cómo restaurar la base del último backup (que se hace todas las
noches: eso también sale de esta lección), y a quién llamar. La encargada lo siguió en el entorno
de prueba y se trabó en "restaurar la base" porque el comando asumía una carpeta que ella no
tenía; se arregló el manual.

### Lección 15 — El agente adentro del sistema, y la retrospectiva con número

**Qué tenés que entender.** Dos cosas cierran el ciclo. La primera es opcional: dejar al agente
residente en producción, con alcance acotado, para diagnosticar y dar soporte sin que vos estés.
La regla que lo ordena es que **actúa a nombre de alguien**: su credencial está mapeada a una
persona responsable, y todo lo que hace queda registrado a nombre de esa persona; no es una cuenta
anónima, es un empleado con jefe. La segunda es obligatoria: la retrospectiva con números. Qué
costó, cuántos pendientes, cuáles dieron vueltas, qué incidentes hubo y en qué peldaño caen, y
**al menos un cambio propuesto a la escalera**. Una retrospectiva que no cambia nada no fue una
retrospectiva.

**La tarea (agente residente, si corresponde).**

1. Decidí con el dueño si el sistema necesita un agente residente. En Turnera sí: las
   recepcionistas van a tener preguntas ("¿por qué no le llegó el recordatorio a este paciente?")
   que el agente puede contestar leyendo el log, sin que nadie llame al desarrollador.
2. Pegale:

> We are going to leave you resident in production. First, build the map of the system you will
> need in order to operate it: modules, environments, where each configuration lives, which
> actions are consequential (read `docs/LOCKS.md`), whom to notify. If there are parts of the
> system you cannot see from where you are, tell me; the map must not have hidden gaps. Then
> propose your scope in three levels: read-only and diagnosis; configuration changes with my
> approval; consequential actions behind locks. I choose the level. Your credential acts as the
> person who created it: everything you do is logged under that person's name. Reply in my
> language.

   Le estás pidiendo el mapa antes de operar, que los huecos del mapa los declare, tres niveles
   de alcance para que elijas uno, y la credencial a nombre de una persona.

3. Elegí el nivel (para empezar, siempre el primero: solo lectura y diagnóstico). Cerrá con:

> Level [1: read-only and diagnosis]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the
> credential (never its value), and the procedure to request my approval. Then prove, with a real
> attempt recorded in the log, that something outside your scope is rejected.

**La tarea (retrospectiva, siempre).**

4. Juntá los números que solo vos tenés: cuántas horas le dedicaste, cuánto gastaste en la
   herramienta de IA, cuánta cuota de integración continua usaste.
5. Pegale:

> [The project] is over. Do the retrospective with numbers, not impressions: what it cost
> (tokens, quota, my time), how many pending items, which ones took the most rounds and why,
> which incidents happened and which step of the ladder each falls into, and which step failed
> or was missing. If you lack the data for any figure (my time, for instance), ask me for it or
> mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder:
> which step is modified, how, and which incident justifies it. Write it to
> `docs/RETROSPECTIVE_[date].md`. Reply in my language.

   Le estás pidiendo números con fuente, cada incidente mapeado a un peldaño (un incidente que
   no cae en ninguno es un peldaño que falta), que te pida los números que no tiene, y una
   propuesta concreta de cambio a la escalera.

6. Leé la propuesta de cambio. Si te parece válida, mandala al repositorio de Urazuke como
   propuesta de mejora (ver `CONTRIBUTING.md`): esa es la forma en que el método aprende de cada
   proyecto.

**Verificación de completitud.** ¿El mapa dice qué NO puede ver el agente? ¿Viste en el log que
una acción fuera del alcance se rechaza? ¿La credencial actúa a nombre de una persona? ¿La
retrospectiva tiene números con fuente, o adjetivos? ¿Cada incidente cae en un peldaño? ¿Hay al
menos una propuesta concreta de cambio?

**Entregable.** `docs/RESIDENT_AGENT.md` (si corresponde) y `docs/RETROSPECTIVE_[fecha].md`.

**Errores típicos.** Darle al agente residente un nivel alto "para que pueda resolver todo":
empezá por solo lectura y subí cuando haya evidencia. Una retrospectiva que dice que todo salió
bien: nunca sale todo bien; está escrita para vos, no para el método. Y no mandar la propuesta de
cambio: el peldaño 15 se cierra cuando la escalera cambia, no cuando el documento se escribe.

**En el proyecto guía.** La retrospectiva de Turnera, en un curso típico: seis semanas, unas
cuarenta horas del alumno, veintiocho pendientes, los que más vueltas dieron fueron los de
mensajes (zonas horarias y el proveedor de WhatsApp); dos incidentes, ambos en el peldaño 8 (el
estado "ausente" existía en la pantalla y no en el servidor) y en el 13 (un despliegue a
producción con la configuración de prueba, detectado por la verificación de punta a punta después
del despliegue). Propuesta de cambio: que la rutina de despliegue del peldaño 13 exija mostrar la
diferencia de configuración entre prueba y producción antes de promover, no solo "qué cambia".

---

## La lista de salida a producción

Cuando las dieciséis lecciones están hechas, el sistema cumple esta lista. Es la definición
operativa de "production grade" en Urazuke, y se puede usar como lista de verificación final,
con el dueño, sin abrir el código:

1. Hay una ficha de elegibilidad con decisión, fecha y nombre (P0).
2. Hay un contrato de convivencia que el agente lee en cada sesión, y se probó que lo lee (P1, P2).
3. El archivo de proyecto se lee en cinco minutos y dice qué NO es el sistema (P2).
4. Hay un dimensionamiento con datos primarios con fuente, derivados con cuenta, y el escenario
   "por diez" (P3).
5. El esqueleto se desplegó vacío, y el despliegue se corrió dos veces (P4).
6. Todo cambio tiene su pendiente, y todo pendiente cerrado tiene su evidencia (P5).
7. Toda regla de negocio tiene dueño, fecha y palabras textuales (P6).
8. Todo test importante se vio en rojo antes de verde; hay pruebas de punta a punta que verifican
   el backend desde la pantalla (P7).
9. Toda lista tiene un solo dueño; hay un mapa productor/consumidor; hay un registro de
   anti-patrones con verificación automática (P8).
10. Todo número que decidió algo tiene un medidor con test que vos podés correr (P9).
11. Todo reporte separa verificado, creído y puntos ciegos (P10).
12. Hubo al menos una auditoría por una sesión distinta, y sus P0 son pendientes (P11).
13. Toda acción con consecuencia tiene candado con test en rojo y camino de vuelta; las
    automatizaciones pasaron por modo de ensayo (P12).
14. Los tests corren una vez por commit; la configuración está fuera del repositorio; la vuelta
    atrás se probó; ningún secreto vive en el repositorio ni en el chat sin rotar (P13).
15. Hay tres manuales con fecha y versión, y una persona que no programa siguió el de
    recuperación (P14).
16. Hay una retrospectiva con números y una propuesta de cambio a la escalera (P15).

Si las dieciséis dan "sí", el sistema está listo para implementar. Si alguna da "no", ya sabés
qué peldaño volver a subir.

---

## Anexo A — Cómo evaluar (para quien dicta el curso o se autoevalúa)

Una rúbrica simple, por lección, con tres niveles:

- **No subido**: falta el entregable, o alguna verificación de completitud da "no".
- **Subido**: el entregable existe y todas las verificaciones dan "sí".
- **Subido con evidencia de criterio**: además, el alumno puede contar un caso en que el agente
  hizo algo mal en esa lección (supuso, inventó, reportó de más) y cómo lo detectó. Ese es el
  objetivo real del curso: no el artefacto, sino el reflejo.

Lo que no se evalúa: la calidad del código. Nadie la lee. Se evalúa la calidad de la evidencia.

## Anexo B — Adaptación del curso a cada herramienta

Los prompts son los mismos en cualquier herramienta. Lo que cambia es dónde van las rutinas que
en el curso se agregan a `docs/WORKING_AGREEMENT.md`:

- En **Claude Code**, las rutinas van en el `CLAUDE.md` del proyecto (o se incluye el contrato
  desde ahí), y se leen solas en cada sesión.
- En **Cursor**, van en `.cursor/rules/`, como reglas siempre activas.
- En **Codex CLI** o **Gemini CLI**, en `AGENTS.md` o `GEMINI.md` en la raíz.
- En **Forge**, el contrato y las rutinas son doctrinas, y los prompts de peldaño se inyectan
  solos al cruzar cada compuerta; el registro de pendientes es nativo. El curso con Forge es el
  mismo curso con menos copiar y pegar.

La prueba de lectura de la lección 2 vale para todas: si una sesión nueva no sabe qué NO hace el
sistema, la herramienta no está cargando el archivo donde pusiste el contrato.

## Anexo C — Lo que este manual todavía no tiene

- Una cohorte que lo haya cursado. Los tiempos, los errores típicos y el proyecto guía están
  escritos desde los tres sistemas de origen, no desde alumnos. La primera cohorte los va a
  corregir (y eso es, literalmente, el peldaño 15 aplicado al curso).
- Los pesos de los criterios de elegibilidad (lección 0), que se están elaborando.
- Las versiones en los otros siete idiomas.
