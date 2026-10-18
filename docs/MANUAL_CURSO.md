# Urazuke — el curso. Manual con tareas prácticas, peldaño por peldaño, hasta la aplicación en producción

Autor: Pablo Kuschniroff, asistido por Claude Code. Versión 2, 18 de octubre de 2026. Es un
documento de trabajo del proyecto Urazuke: lo voy a corregir con la primera cohorte que lo use.
Está escrito en castellano con tildes, en lenguaje de todos los días, y cada sigla o expresión rara
está en el glosario del documento principal (`ESCALERA_METODOLOGICA.md`). Cuando cito un caso
real lo hago con una marca `[Ref. N]` que lleva al [documento de referencias](REFERENCIAS.md); el
manual queda limpio y el detalle, a un clic. El repositorio público del método es
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

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

No te sirve si lo que querés es un prototipo para una demo del viernes. Para eso hay herramientas
más rápidas, y este método te va a parecer lento. El método es para lo que tiene que seguir
funcionando después de la demo.

### Qué vas a tener al final

Una aplicación tuya, corriendo en producción, con: tests que se vieron fallar antes de pasar;
pruebas de punta a punta de todos los flujos; despliegue reproducible con vuelta atrás;
configuración y secretos fuera del repositorio; las decisiones de negocio escritas con fecha; un
árbol semántico del sistema y la especificación detallada de cada cosa que se construyó, en sus
pendientes; candados en todo lo que cobra, envía o borra; tres manuales que una persona puede
seguir sin IA; una auditoría hecha por un agente distinto del que construyó; y una retrospectiva
con números. Eso es lo que acá llamo "production grade": no es que funcione, es que **se puede
sostener**.

Y vas a tener algo más, que es lo que de verdad te llevás: el reflejo de no creerle al modelo sin
evidencia, y de saber exactamente qué evidencia pedirle en cada paso.

### Qué necesitás

1. **Una herramienta de IA para programar.** Cualquiera que pueda leer y escribir archivos en tu
   repositorio y ejecutar comandos: Claude Code, Cursor, Codex CLI, Gemini CLI, Forge. El método
   no depende de cuál; el documento principal tiene una tabla de dónde va cada artefacto en cada
   herramienta. En este manual digo "el agente" para referirme a la que uses.
2. **Una cuenta en GitHub** (o equivalente) y nociones mínimas de qué es un repositorio, un
   commit y un push. Si no las tenés, dedicale una tarde antes de empezar; cualquier tutorial
   introductorio alcanza. No hace falta más.
3. **Un proyecto.** Lo ideal es que sea tuyo: un sistema que necesitás o que un cliente te pidió,
   con usuarios que lo van a usar. Si no tenés uno, usá el **proyecto guía** que describo abajo;
   está pensado para que pase por los dieciséis peldaños sin saltearse ninguno.
4. **Tiempo.** El curso tiene dieciséis lecciones, una por peldaño, y un calendario que te dice en
   qué semana cae cada cosa (ver "El calendario del curso"). Un proyecto chico, de punta a punta,
   son entre seis y ocho semanas de trabajo parcial.
5. **Un dueño del dominio con tiempo para decidir.** Si el proyecto es tuyo, sos vos. Si es de un
   cliente, es el cliente, y tiene que saber que va a tener que contestar preguntas durante todo
   el proyecto. Este punto no es negociable: sin dueño que decida, el modelo decide, y ahí el
   método se rompe.

### Cómo se cursa

Cada lección tiene la misma estructura:

- **Qué tenés que entender**: el concepto, explicado como se le explica a una persona.
- **La tarea**: paso a paso, con el prompt exacto que le vas a dar al agente (en inglés, porque
  los modelos siguen instrucciones con más precisión en inglés; cada uno trae su traducción, y
  debajo está explicado qué le estás pidiendo) y qué hacer con lo que te devuelva. Antes de cada
  prompt hay un bloque que dice **"Antes de enviar el prompt"**: los archivos y los insumos que
  tenés que haber hecho vos, con tus manos, antes de pegarlo. No lo saltees: el prompt nombra esos
  archivos, y si no existen o están vacíos, el agente los va a inventar o te los va a pedir.
- **La verificación de completitud**: la lista de preguntas que te hacés sobre lo que el agente
  entregó, sin abrir el código. Si alguna da "no", la lección no está terminada.
- **El entregable**: el archivo o la evidencia que tiene que existir al final.
- **Errores típicos**: lo que les pasa a casi todos la primera vez.
- **En el proyecto guía**: cómo se ve esta lección aplicada al proyecto de ejemplo.

Una regla para todo el curso: **no avances al peldaño siguiente con una verificación en "no"**.
La tentación de "después lo arreglo" es exactamente lo que el método existe para evitar. Si un
peldaño no se sube completo, el siguiente se construye sobre arena.

### El calendario del curso: cuándo se hace cada cosa

El documento principal tiene, en su Parte B, la línea de tiempo completa del método. Acá la
traduzco al calendario del curso para un proyecto chico como el proyecto guía. Las semanas son
orientativas; lo que no es orientativo es el orden y, sobre todo, qué pasa entre lección y lección.

| Semana | Lecciones | Qué hacés además de las lecciones |
|---|---|---|
| 0 (dos o tres días) | ninguna | **Ingesta**: entrevistás al dueño y escribís en prosa qué quiere, para quién, qué pasa hoy, qué tiene consecuencias, qué números solo él sabe. Nombrás los casos de uso que puedas ("la recepcionista carga un turno"), dibujás las pantallas principales aunque sea a mano, y listás las entidades del negocio con sus estados. Incompleto a propósito. |
| 1 | 0, 1, 2, 3, 4 | **Arranque, de corrido.** Elegibilidad, contrato, definición con árbol semántico, dimensionamiento, y el esqueleto con **toda la infraestructura y la cadena de integración y despliegue**: repositorio, entorno de prueba, integración continua, primer despliegue vacío. Al cierre, abrís la URL y ves la pantalla vacía. |
| 2 | 5, 6, 7 | **Primer bloque funcional** (la agenda básica). Abrís el bloque convirtiendo el pedido en pendientes especificados. Con cada pendiente: decisiones, test en rojo, prueba de punta a punta del flujo, captura de la pantalla que mirás vos. Al cierre del bloque: batería completa de punta a punta, y vos usás el sistema en el entorno de prueba siguiendo los flujos del bloque. |
| 3 | 8, 9, 10 | **Segundo bloque** (pacientes y búsqueda). Las tres lecciones restantes del bucle se aprenden sobre este bloque. Mismo cierre: punta a punta de todos los flujos, pruebas humanas, manual de usuario con las pantallas nuevas. |
| 4 | 11, 12 | **Salida a producción, primera mitad.** Auditoría por otra sesión. Candados. Y recién después, el **tercer bloque** (recordatorios y seña), construido con el bucle completo y dejado en modo de ensayo. |
| 5 | 13, 14 | **Salida a producción, segunda mitad.** Cierre de la cadena a producción con vuelta atrás probada. Los tres manuales; alguien que no programa sigue el de recuperación. **Pruebas de aceptación** tuyas o del dueño sobre todos los flujos. Primer despliegue a producción sin usuarios. |
| 6 | 15 | **Operación.** Habilitás los recordatorios después de mirar el registro de ensayo. Agente residente. Retrospectiva con números y propuesta de cambio a la escalera. |

Si tu proyecto es más grande, lo que se estira son las semanas 2 y 3 (más bloques), no la 1 ni la
4 y 5. Y si en algún momento te encontrás haciendo infraestructura en la semana 3, o corriendo la
batería de punta a punta por primera vez en la semana 5, volvé al calendario: algo se salteó.

### El proyecto guía: "Turnera"

Si no tenés proyecto propio, usá este. Es chico, pero tiene todo lo que hace falta para que
ninguno de los dieciséis peldaños sea de mentira: usuarios reales, datos personales, mensajes que
salen al mundo, y plata.

**El negocio.** Un consultorio (puede ser un estudio, una peluquería, un taller: cualquier lugar
que da turnos). Hoy los turnos se anotan en un cuaderno y se confirman por WhatsApp a mano. Se
pierden turnos porque la gente se olvida, hay sobreturnos porque dos personas anotaron en
cuadernos distintos, y nadie sabe cuántos turnos se cancelaron el mes pasado.

**Lo que quieren.** Una agenda web donde las dos recepcionistas y los tres profesionales vean los
turnos; recordatorios automáticos 24 horas antes, por WhatsApp o correo; la posibilidad de pedir
una seña por link de pago para ciertos turnos; y un par de números al final del mes (cuántos
turnos, cuántas ausencias, cuántas señas).

**El dueño.** La encargada del consultorio. Tiene criterio sobre el negocio (sabe qué turnos
llevan seña, cuánto antes se puede cancelar, qué se le dice a un paciente que faltó tres veces) y
tiene quince minutos por día para contestar preguntas. No programa, y no va a leer código.

**Los números que solo ella sabe.** Unos cuarenta turnos por día, doscientos cincuenta días al
año. Unos tres mensajes por turno (confirmación, recordatorio, a veces reprogramación). Los datos
de los pacientes se conservan cinco años. El pico es el lunes a la mañana, con las dos
recepcionistas cargando a la vez. Y una pregunta que ella no sabe contestar y que importa: si esto
funciona, ¿lo van a vender a otros consultorios? (La respuesta cambia el dimensionamiento por
diez.)

**Lo que tiene consecuencias.** Enviar un recordatorio (si se manda dos veces, molesta; si se
manda al número equivocado, es un problema de privacidad). Cobrar una seña (plata). Cancelar un
turno (irreversible para el paciente que lo pierde). Borrar un paciente (datos personales).

**Los casos de uso que nombra la encargada**, tal como los dice: "cargo un turno", "busco a un
paciente", "cancelo un turno", "le llega el recordatorio al paciente", "le pido la seña", "veo
cuántos turnos hubo este mes". Son seis; serán los flujos de punta a punta.

Con esto alcanza para arrancar. Todo lo demás lo va a preguntar el agente, y es parte del
ejercicio que lo pregunte.

---

## Tramo de arranque: lecciones 0 a 4

Estas cinco lecciones se hacen una vez por proyecto, en la semana 1, antes de escribir
funcionalidad. Son las que más tentación dan de saltear ("quiero ver algo funcionando"), y son
las que más caro cuesta saltear. Hacelas de corrido, y recién después abrí el bucle.

### Lección 0 — ¿Este proyecto se puede encarar así?

**Qué tenés que entender.** El método no sirve para cualquier proyecto, y saberlo antes de
empezar es la primera decisión de calidad. Hay dos condiciones sin las cuales no funciona: que
haya un repositorio estándar donde dejar la evidencia (X1), y que las pantallas se puedan operar
por programa para probar de punta a punta, desde la pantalla hasta el backend (X2). Si cualquiera
de las dos falla, el agente no va a poder verificarse solo, y entonces vas a terminar leyendo
código vos, que es justo lo que el método promete evitar. Las dos las saqué de proyectos que
rechacé [Ref. 46](REFERENCIAS.md#ref-46). Después hay criterios que ponderan (si hay un dueño con
tiempo, si el error tiene consecuencias, si se puede probar en un entorno aparte, etc.), que
todavía estoy calibrando.

Para el proyecto guía las dos condiciones se cumplen: es un proyecto nuevo (no hay legado) y lo
vamos a construir con una interfaz web operable por programa. Para un proyecto propio, esta
lección puede terminar en "no va", y eso es un resultado válido del curso.

**La tarea.**

**Antes de enviar el prompt**, con tus manos (el agente no puede hacer esto por vos):

- `docs/INITIAL_SURVEY.md`: lo escribís a mano, a partir de la ingesta de la semana 0: qué quiere
  el cliente, para quién, qué pasa hoy sin el sistema, qué tecnología hay o se propone, si hay un
  sistema anterior y si tiene repositorio, si las pantallas se van a poder operar por programa,
  quién es el dueño y cuánto tiempo tiene, qué consecuencia tiene un error, qué entornos va a
  haber. Media página. No importa que esté incompleto; de hecho, es parte del ejercicio que esté
  incompleto, y lo que no sabés lo escribís como "no lo sé".
- `docs/ELIGIBILITY_CRITERIA.md`: copiá la ficha de criterios del documento principal (los
  excluyentes X1 y X2 y los candidatos), con las columnas de respuesta, fuente y verde o rojo
  vacías. No la completes vos: la completa el agente.
- La carpeta del proyecto, todavía vacía salvo esos dos archivos, con el agente abierto ahí.
- El contenido completo de cada archivo está en el contrato del peldaño 0, en el mismo bloque.

1. Pegale este prompt:

> We are going to assess whether this project can be run with the Urazuke method. Read the
> initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`. First, evaluate whether the survey is sufficient to answer
> every criterion. If any criterion cannot be answered from the survey, ask me for the missing
> information before going on; do not assume. Then fill in the sheet criterion by criterion:
> the answer, where it comes from, and for each exclusionary criterion whether it is green or
> red. Do not decide: present me the completed sheet with your reading and your doubts, and I
> will decide. Reply in my language.

> [es]
> Vamos a evaluar si este proyecto se puede encarar con el método Urazuke. Leé el relevamiento
> inicial en `docs/INITIAL_SURVEY.md` y la ficha de criterios en `docs/ELIGIBILITY_CRITERIA.md`.
> Primero, evaluá si el relevamiento alcanza para responder cada criterio. Si algún criterio no
> se puede responder con el relevamiento, pedime la información que falta antes de seguir; no
> supongas. Después completá la ficha criterio por criterio: la respuesta, de dónde sale, y para
> cada criterio excluyente si está en verde o en rojo. No decidas: presentame la ficha completa
> con tu lectura y tus dudas, y decido yo. Respondé en mi idioma.

   Le estás pidiendo que lea los dos archivos, que **evalúe si el relevamiento alcanza y pregunte
   lo que falte antes de responder** (esta cláusula se repite en todos los prompts del curso; es
   el corazón del método), que complete la ficha diciendo de dónde sale cada respuesta, y que no
   decida: la decisión es tuya.

2. Contestá sus preguntas. Si no te hizo ninguna, desconfiá y preguntale qué supuso.
3. Cuando te presente la ficha, leela y decidí.

**Antes de enviar el prompt** de cierre: tu decisión en una línea (va, no va, o va con
condiciones, cada condición verificable y no más de tres), y las respuestas que le diste a sus
preguntas en esta misma sesión, porque el prompt le pide incluirlas.

4. Pegale el prompt de cierre:

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.

> [es]
> Decisión: [va / no va / va con estas condiciones: …]. Escribí la ficha final en
> `docs/ELIGIBILITY.md` con la fecha, quién decidió, la respuesta a cada criterio con su fuente,
> y las condiciones si las hay. Incluí las preguntas que hiciste y mis respuestas.

**Verificación de completitud.** Abrí `docs/ELIGIBILITY.md` y preguntate: ¿los dos excluyentes
tienen respuesta explícita y fuente? ¿Hay algún criterio respondido con "probablemente"? (Si lo
hay, el agente tenía que preguntar.) ¿La decisión tiene fecha y nombre? ¿Las condiciones, si las
hay, se pueden verificar? ¿Están las preguntas que hizo y tus respuestas?

**Entregable.** `docs/ELIGIBILITY.md`, de una página.

**Errores típicos.** Escribir el relevamiento "completo" para que el agente no pregunte: te
perdés el ejercicio y, peor, te acostumbrás a hacer el trabajo del modelo. Responder "va" con
cinco condiciones: es un "no va" disfrazado. Y el más común: saltear la lección porque "es obvio
que va". Lo obvio es lo que no se escribe, y lo que no se escribe es lo que después se discute.

**En el proyecto guía.** El agente debería preguntar, como mínimo, si la interfaz va a ser web o
móvil (porque X2 depende de eso), si hay un sistema anterior aunque sea un Excel, y qué canal de
mensajes se va a usar (WhatsApp tiene requisitos que el correo no tiene). La ficha termina en
"va", con una condición razonable: tener el canal de mensajes definido antes del peldaño 12.

### Lección 1 — El contrato de convivencia

**Qué tenés que entender.** El agente llega cada sesión sin memoria de la anterior. Es como un
colaborador nuevo cada mañana. El contrato de convivencia es lo que le decís el primer día y lo
que va a releer todos los días: cómo trabajás, qué no tolerás, qué nivel de autonomía le das. Sin
contrato, le vas a repetir las mismas cosas cada sesión, y cada vez un poco distinto. Yo lo
escribí por primera vez después de dos semanas de repetirme [Ref. 1](REFERENCIAS.md#ref-1).

Las seis reglas mínimas tienen cada una un fallo atrás: "mi tiempo es sagrado" evita que te
consulte cada detalle; "cero deuda" evita el "después lo arreglo"; "alcance exacto" evita que "ya
que está" te agregue cosas; "documentación en el mismo commit" evita los manuales viejos; "nunca
reportar como hecho lo no verificado" evita el "listo" que no era; "hablá mi idioma" evita que te
conteste en inglés porque el prompt estaba en inglés.

**La tarea.**

**Antes de enviar el prompt**, con tus manos:

- Tus preferencias de trabajo, pensadas cinco minutos y anotadas en una lista corta (en un papel,
  o en `docs/MY_PREFERENCES.md`): ¿preferís que te pregunte mucho o poco? ¿En qué idioma? ¿Qué
  nivel de autonomía le das (commits solo, despliegue a prueba solo, producción nunca)? ¿Qué te
  saca de quicio de trabajar con otras personas? Se lo vas a contar cuando pregunte; la lista es
  para no improvisar.
- La carpeta del proyecto con el agente abierto ahí. Nada más: es el primer archivo del proyecto.

1. Pegale este prompt:

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

> [es]
> Antes de escribir código, vamos a fijar el contrato de convivencia entre vos y yo. Escribí
> `docs/WORKING_AGREEMENT.md` con al menos estas reglas, cada una con una línea que explique qué
> evita: (1) Mi tiempo es sagrado: no me preguntes lo que podés resolver solo, y cuando preguntes,
> preguntá en prosa, con tu recomendación. (2) Cero deuda técnica: lo que se rompe se arregla de
> raíz, con su test de regresión, en la misma sesión. (3) Alcance exacto: ni más ni menos de lo
> pedido; si ves otra cosa, anotala como pendiente, no la hagas. (4) La documentación se actualiza
> en el mismo commit que el cambio. (5) Nunca reportes como hecho algo que no verificaste; separá
> siempre lo que verificaste de lo que creés. (6) Hablá mi idioma. Agregá las reglas que creas que
> este proyecto necesita, marcadas como propuestas. Si necesitás saber algo sobre cómo trabajo para
> escribir esto, preguntame.

   Le estás pidiendo las seis reglas con el fallo que cada una evita, reglas propias marcadas
   como propuestas para que las aceptes o rechaces, y que te pregunte sobre vos.

2. Contestá sus preguntas. Leé las propuestas: aceptá las que te sirvan, rechazá las que no,
   siempre con una razón de una línea.

**Antes de enviar el prompt** de cierre: tu veredicto sobre cada propuesta del agente, escrito:
cuáles aceptás [X, Y], cuáles rechazás [Z] y por qué, en una línea cada una. Va en los huecos del
prompt, y los llenás vos.

3. Cerrá con:

> I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the
> agreement with today's date and a version number. Then add to the project file the
> instruction to read this agreement at the start of every session.

> [es]
> Acepto las reglas 1 a 6 y tus propuestas [X, Y]; rechazo [Z] porque [razón]. Cerrá el contrato
> con la fecha de hoy y un número de versión. Después agregá al archivo de proyecto la
> instrucción de leer este contrato al empezar cada sesión.

   Si todavía no hay archivo de proyecto (lo hacés en la lección 2), va a crear uno mínimo con
   esa instrucción; está bien.

**Verificación de completitud.** ¿Están las seis reglas, cada una con el fallo que evita? ¿Hay
alguna escrita como aspiración ("tratar de…")? ¿El archivo de proyecto ordena leerlo al empezar
cada sesión? ¿Te hizo al menos una pregunta sobre cómo trabajás?

**Entregable.** `docs/WORKING_AGREEMENT.md` con fecha y versión, enganchado al archivo de
proyecto.

**Errores típicos.** Aceptar veinte reglas porque todas suenan bien: nadie respeta veinte; seis u
ocho se respetan. Dejar una regla que diga que el agente puede cambiar el contrato: no. Y el más
silencioso: no probar nunca si lo lee. En la lección 2 vas a ver cómo.

**En el proyecto guía.** Una regla propia que el agente suele proponer para Turnera, y que vale la
pena aceptar: "nunca mando un mensaje real a un paciente desde un entorno que no sea producción;
en prueba, los mensajes van a una bandeja falsa". Es el peldaño 12 asomándose temprano.

### Lección 2 — La definición del proyecto, el árbol semántico y la lectura obligatoria

**Qué tenés que entender.** El archivo de proyecto (`PROJECT.md`, o `CLAUDE.md`, o el nombre que
use tu herramienta) es el mapa que el agente lee al empezar cada sesión. Tiene que ser **corto**:
qué es el sistema, para quién, qué NO es, los módulos, las decisiones tomadas con fecha, y la
orden de leer el contrato. Lo que pasó cada día no va ahí: va al estado vivo (`docs/STATUS.md`) y
al registro de pendientes. Uno de mis sistemas dejó crecer este archivo hasta más de nueve mil
líneas; en ese estado, no lo lee nadie, y el modelo tampoco [Ref. 41](REFERENCIAS.md#ref-41).

Pero el mapa tiene una segunda pieza, y es la que más trabajo hace: el **árbol semántico**. Es el
sistema descompuesto como un árbol: los dominios en el primer nivel, y debajo de cada uno sus
actores, sus procesos (los casos de uso que nombraste en la ingesta, con actor, disparador, pasos,
resultado y excepciones), sus entidades con sus atributos y sus estados, sus pantallas y sus
integraciones externas. Es el modelo de dominio de la ingeniería de requerimientos de toda la
vida, puesto en forma de árbol para que el modelo lo lea. De cada nodo van a colgar los pendientes
y las decisiones que lo tocan. Su valor es doble: le da al agente el contexto exacto del nodo que
va a tocar, y te da a vos una forma de verificar, sin leer código, que el sistema que el agente
entiende es el que el negocio pidió. Si el árbol tiene un estado que el negocio nunca nombró, el
modelo lo inventó, y lo vas a ver antes de que construya sobre él.

La sección "qué NO es" sigue siendo la más importante y la que todos dejan vacía. Lo que no está
escrito es lo que el modelo va a inventar cuando se encuentre con un hueco.

**La tarea.**

**Antes de enviar el prompt**, con tus manos:

- `docs/INITIAL_SURVEY.md`, completado con lo que aprendiste en la lección 0 (las respuestas a las
  preguntas del agente) y con el relevamiento del negocio: quiénes usan el sistema, qué problema
  resuelve, una sección "qué NO tiene que hacer el sistema" aunque sea con dos ítems, los casos de
  uso que nombra el dueño con sus palabras, las entidades con sus estados, los dibujos de las
  pantallas aunque sean fotos de un papel, las integraciones externas, y las decisiones ya
  tomadas, con fecha. Si usaste un método de ingesta (entrevistas, casos de uso, historias de
  usuario, prototipos), decí cuál y pegá el resultado.
- `docs/WORKING_AGREEMENT.md`, cerrado (lección 1).
- Si hay un sistema anterior, acceso de lectura a su código o a su documentación, anotado en el
  relevamiento.

1. Pegale:

> We are going to define the project in writing. Read the business survey in
> `docs/INITIAL_SURVEY.md` and the working agreement in `docs/WORKING_AGREEMENT.md`. Evaluate
> whether the survey is sufficient to describe the system, its users, its domain and its
> boundaries; if it is not, ask me for what is missing before writing anything. Then write two
> things. First, `PROJECT.md`, three hundred lines at most, with: what the system is and for
> whom; what it is NOT; the main modules as a list; the decisions already made, each with its
> date; and the instruction to read this file and the semantic tree at the start of every
> session. Second, `docs/SEMANTIC_TREE.md`: the system as a tree, with the domains at the top
> level and, under each one, its actors, its processes (the use cases, each with actor, trigger,
> steps, outcome and exceptions), its entities with their attributes, states and transitions,
> its screens, and its external integrations. Mark every node you inferred rather than read in
> the survey, so that I can confirm or correct it. Separately, create `docs/STATUS.md` for the
> living state (what is being worked on, what is open): that file changes every day; the other
> two change only when the system changes. Reply in my language.

> [es]
> Vamos a definir el proyecto por escrito. Leé el relevamiento del negocio en
> `docs/INITIAL_SURVEY.md` y el contrato de convivencia en `docs/WORKING_AGREEMENT.md`. Evaluá si
> el relevamiento alcanza para describir el sistema, sus usuarios, su dominio y sus límites; si no
> alcanza, pedime lo que falta antes de escribir nada. Después escribí dos cosas. Primero,
> `PROJECT.md`, de trescientas líneas como máximo, con: qué es el sistema y para quién; qué NO es;
> los módulos principales como lista; las decisiones ya tomadas, cada una con su fecha; y la
> instrucción de leer este archivo y el árbol semántico al empezar cada sesión. Segundo,
> `docs/SEMANTIC_TREE.md`: el sistema como un árbol, con los dominios en el primer nivel y, debajo
> de cada uno, sus actores, sus procesos (los casos de uso, cada uno con actor, disparador, pasos,
> resultado y excepciones), sus entidades con sus atributos, estados y transiciones, sus pantallas
> y sus integraciones externas. Marcá cada nodo que hayas inferido en vez de leído en el
> relevamiento, para que yo lo confirme o lo corrija. Aparte, creá `docs/STATUS.md` para el estado
> vivo (en qué se está trabajando, qué está abierto): ese archivo cambia todos los días; los otros
> dos cambian solo cuando cambia el sistema. Respondé en mi idioma.

   Le estás pidiendo que pregunte antes de redactar, un archivo de proyecto corto con la sección
   "qué no es", el árbol semántico con su estructura completa y con los nodos inferidos marcados,
   y el estado vivo en otro archivo.

2. Leé `PROJECT.md` entero. Tiene que entrar en cinco minutos. Corregí lo que no sea cierto o no
   sea tuyo.
3. Recorré el árbol semántico como si fueras el cliente. Mirá cada nodo marcado como inferido y
   confirmalo o corregilo. Buscá actores que falten, estados de entidad que el negocio no usa,
   pantallas que no pediste.

**Antes de enviar el prompt** de cierre: `PROJECT.md` leído entero por vos, el árbol recorrido
nodo por nodo con un veredicto para cada nodo inferido, y la lista de correcciones escrita para el
hueco [list] del prompt. Si la lista está vacía la primera vez, desconfiá de tu lectura.

4. Cerrá con:

> Apply these corrections: [list]. Finalize `PROJECT.md` and `docs/SEMANTIC_TREE.md` with
> today's date. Add to the working agreement two rules: the change history never goes into
> `PROJECT.md` (it goes to `docs/STATUS.md` or to the pending-items register); and every pending
> item must hang from a node of the semantic tree, and the tree is updated in the same commit
> whenever a block adds or changes a node.

> [es]
> Aplicá estas correcciones: [lista]. Cerrá `PROJECT.md` y `docs/SEMANTIC_TREE.md` con la fecha
> de hoy. Agregá al contrato de convivencia dos reglas: el historial de cambios nunca va en
> `PROJECT.md` (va a `docs/STATUS.md` o al registro de pendientes); y todo pendiente tiene que
> colgar de un nodo del árbol semántico, y el árbol se actualiza en el mismo commit cada vez que
> un bloque agrega o cambia un nodo.

5. **La prueba de lectura.** Cerrá la sesión del agente y abrí una nueva. Sin decirle nada más,
   pedile: "¿Qué no tiene que hacer este sistema? ¿Y de qué nodo del árbol cuelga la pantalla de
   la agenda?". Si te contesta con lo que dicen `PROJECT.md` y el árbol, el enganche funciona. Si
   te contesta cualquier otra cosa, no está leyendo el mapa: revisá cómo tu herramienta carga el
   archivo de proyecto.

**Verificación de completitud.** ¿`PROJECT.md` se lee en cinco minutos? ¿Dice qué NO hace el
sistema? ¿El árbol tiene todos los actores que vos conocés, y cada entidad tiene los estados que
el negocio usa, ni más ni menos? ¿Confirmaste o corregiste todos los nodos inferidos? ¿Cada
decisión tiene fecha y quién la tomó? ¿El agente preguntó algo antes de redactar? ¿El estado vivo
está en otro archivo? ¿Pasó la prueba de lectura?

**Entregable.** `PROJECT.md` (máximo trescientas líneas), `docs/SEMANTIC_TREE.md` con los nodos
confirmados, `docs/STATUS.md`, y la prueba de lectura pasada.

**Errores típicos.** Pegar en `PROJECT.md` toda la especificación que ya tenías: es el programa,
no la especificación. Dejar "qué no es" vacío. Aceptar el árbol sin recorrerlo: el modelo infiere
estados y pantallas con una naturalidad que da miedo, y cada nodo inventado es funcionalidad que
va a construir sin que nadie se la haya pedido. Y no hacer la prueba de lectura: es la única forma
de saber que el peldaño 1 y el 2 están actuando y no solo existiendo.

**En el proyecto guía.** En "qué NO es" de Turnera deberían estar, como mínimo: no es un sistema
de historia clínica (no guarda datos médicos), no es una pasarela de pagos (usa un link de pago de
un proveedor, no procesa tarjetas), y no manda mensajes de marketing (solo confirmaciones y
recordatorios). El árbol tiene un dominio "Agenda" con los actores recepcionista y profesional,
los procesos "cargar turno", "cancelar turno" y "buscar paciente", las entidades Turno (con
estados pendiente, confirmado, cancelado, ausente) y Paciente, y las pantallas "agenda del día" y
"ficha del paciente"; un dominio "Mensajes" con el proceso "enviar recordatorio", la entidad
Mensaje y la integración con el proveedor de WhatsApp; y un dominio "Pagos" con "pedir seña" y la
integración con el proveedor de pagos. Si el agente te agrega un estado "reprogramado" al turno,
preguntale de dónde lo sacó: la encargada no lo nombró. A lo mejor hace falta, a lo mejor no; lo
decidís vos, no él.

### Lección 3 — Dimensionar antes de diseñar la arquitectura

**Qué tenés que entender.** Hay decisiones que, tomadas mal, cuestan semanas: qué base de datos,
si las llamadas a la base son sincrónicas o asincrónicas, cuánta gente puede usar el sistema al
mismo tiempo. Y todas dependen de números que **solo el negocio tiene**: cuántos turnos por día,
cuántos mensajes por turno, cuántos años se guarda. El modelo no puede inferir esos números; puede
inferir lo que se deriva de ellos (filas por año, tamaño en cinco años). Por eso el prompt le
exige distinguir datos primarios de derivados, y **pedir los primarios que falten en vez de
estimarlos**. Cuando el modelo estima un dato primario, lo hace con la misma cara de seguro que
cuando calcula; y no tenés forma de distinguir por el tono. A mí me costó una etapa entera de
reingeniería no haber hecho esto a tiempo [Ref. 15](REFERENCIAS.md#ref-15).

Hay además un tipo de decisión que conviene tomar siempre: las **asimétricas**, baratas si sobran
y carísimas si faltan. El ejemplo canónico es hacer la interfaz con la base de datos asincrónica
desde el primer día aunque la primera base sea un archivo: si nunca cambiás de base, sobró un
`await`; si cambiás, te ahorraste reescribir todo.

**La tarea.**

**Antes de enviar el prompt**, con tus manos y con el dueño:

- `docs/VOLUME_SURVEY.md`: sentate con el dueño (o con vos mismo, si el proyecto es tuyo) y
  escribí las entidades principales (las del árbol semántico) y cuántas hay, cuántas se agregan
  por mes, cuántos eventos por entidad, cuántas personas operan en el pico y cuándo es el pico,
  cuánto se conservan los datos, si hay cargas excepcionales, qué crecimiento esperan. Para cada
  número, anotá de dónde sale: "lo dijo la encargada", "contado en el cuaderno de septiembre",
  "supuesto". Dejá algunos en "supuesto" a propósito: vas a ver qué hace el agente con ellos.
- `PROJECT.md` y `docs/SEMANTIC_TREE.md`, cerrados (lección 2).
- Si hay un sistema anterior con base de datos, un acceso de solo lectura para que el agente saque
  números reales, con la cadena de conexión fuera del repositorio.

1. Pegale:

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

> [es]
> Antes de proponer cualquier arquitectura vamos a dimensionar el sistema. Leé `PROJECT.md` y el
> relevamiento de volumetría en `docs/VOLUME_SURVEY.md`. Distinguí los datos primarios (hechos que
> solo el negocio sabe) de los derivados (lo que se puede calcular a partir de los primarios).
> Evaluá si los datos primarios están lo bastante completos para calcular lo que sigue; si falta
> algún dato primario, o está marcado como supuesto, pedime todos los que falten antes de seguir.
> Nunca estimes un dato primario. Si se puede consultar un sistema anterior, usá sus números reales
> y decí de dónde sale cada uno. Con los primarios completos, calculá, mostrando la cuenta: filas
> por año de las tres tablas más grandes, concurrencia en el pico, tamaño de los datos a cinco
> años, y qué se rompe primero si todo se multiplica por diez. Después presentá tres opciones de
> persistencia y concurrencia, cada una con el costo de migrar a las otras más adelante. No
> elijas: elijo yo. No escribas código. Respondé en mi idioma.

   Le estás pidiendo: distinguir primarios de derivados; **pedirte los primarios que falten o
   estén en "supuesto", y no estimarlos nunca**; calcular lo derivado con la cuenta a la vista; el
   escenario "por diez"; tres opciones con el costo de cambiar de una a otra; y que no elija.

2. Si te pide los "supuestos", bien: ese era el ejercicio. Conseguí los números (preguntale al
   dueño, contá en el cuaderno) y dáselos. Si no te los pidió y calculó igual, pará y preguntale
   qué hizo con los supuestos: es una falla del peldaño y conviene verla ahora.
3. Leé las tres opciones. Rehacé una cuenta a mano (por ejemplo, filas por año de la tabla más
   grande): tiene que darte lo mismo. Elegí.

**Antes de enviar el prompt** de cierre: los supuestos convertidos en datos con fuente, una cuenta
rehecha a mano por vos que coincide con la del agente, y la opción elegida con una razón de una
línea.

4. Cerrá con:

> I choose option [B]. Record in `docs/SIZING.md`: the primary data with its source, the derived
> data with its arithmetic, the three options, the chosen one and why, and the decisions we are
> taking "just in case" even though they are not needed today (for example: the persistence
> interface is asynchronous from line one, even if the first engine is synchronous). Include the
> questions you asked and my answers.

> [es]
> Elijo la opción [B]. Registrá en `docs/SIZING.md`: los datos primarios con su fuente, los
> derivados con su cuenta, las tres opciones, la elegida y por qué, y las decisiones que tomamos
> "por las dudas" aunque hoy no hagan falta (por ejemplo: la interfaz de persistencia es
> asincrónica desde la línea uno, aunque el primer motor sea sincrónico). Incluí las preguntas que
> hiciste y mis respuestas.

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

**Qué tenés que entender.** Antes de que el sistema haga algo útil, tiene que arrancar, probarse y
desplegarse **vacío**. Parece una pérdida de tiempo ("¿desplegar qué, si no hay nada?") y es lo
contrario: el camino a producción es parte del producto, y la única forma de saber que funciona
es recorrerlo cuando todavía no hay nada que perder. En uno de mis sistemas el despliegue llegó
un mes después del arranque y costó cinco pendientes seguidos [Ref. 32](REFERENCIAS.md#ref-32);
con el esqueleto desplegado la primera semana, esos cinco golpes se habrían dado en vacío.

Esta lección es, además, **donde se hace toda la infraestructura y la cadena de integración y
despliegue** del proyecto. No la vas a volver a tocar hasta la lección 13, y en el medio vas a
construir toda la funcionalidad sobre ella. Por eso ocupa la mayor parte de la semana 1.

Las **compuertas** son las condiciones para pasar de una etapa a otra ("la batería está en verde",
"el despliegue a prueba funcionó"). Escribirlas ahora, aunque parezcan obvias, es lo que después
permite decir "esto no pasa" sin discutir.

**La tarea.**

**Antes de enviar el prompt**, con tus manos:

- `docs/ENVIRONMENTS_SURVEY.md`: dónde va a correr el sistema (un servidor que ya tenés, un
  servicio en la nube), si va a haber un entorno de prueba y uno de producción, quién tiene acceso
  a qué, cómo se despliega hoy si hay algo, y el tipo de proyecto (nuevo, corrección o evolución).
  Si no tenés nada, decilo: el agente te va a proponer la opción más simple. El prompt lo nombra
  "the environments survey", sin ruta: decile cómo se llama.
- Las credenciales del lugar donde se va a desplegar, aunque sea un servicio gratuito: creadas,
  probadas por vos entrando al panel, y guardadas fuera del repositorio; al agente le decís dónde
  están, no se las pegás en el chat. Sin eso, el esqueleto se queda en tu máquina y la lección no
  se puede terminar.
- `PROJECT.md` y `docs/SIZING.md`, cerrados (lecciones 2 y 3).

1. Pegale:

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

> [es]
> Vamos a construir el esqueleto del sistema, sin ninguna funcionalidad. Leé `PROJECT.md`,
> `docs/SIZING.md` y el relevamiento de entornos. Evaluá si tenés lo necesario para que el
> esqueleto corra en el entorno de prueba (acceso, URL, forma de desplegar); si falta algo,
> pedímelo antes de empezar. Después construí: la estructura de carpetas; el servidor y la
> interfaz arrancando; la estructura de tests con un test de humo que pasa; la integración
> continua corriendo esa batería en cada push; y el despliegue al entorno de prueba. Declará las
> compuertas del flujo (qué tiene que estar en verde para pasar de una etapa a la siguiente) en
> `docs/GATES.md`. Cuando termines, sacá una captura de la interfaz vacía corriendo en el entorno
> de prueba y mostrámela. No agregues ninguna funcionalidad "ya que estás". Respondé en mi idioma.

   Le estás pidiendo que verifique accesos antes de empezar, la lista exacta de lo que es un
   esqueleto, las compuertas escritas, una captura real del entorno de prueba, y la prohibición
   de agregar funcionalidad.

2. Esta tarea es larga (una o dos horas de trabajo del agente) y va a tener idas y vueltas:
   credenciales que faltan, un servicio que pide confirmar el correo, etc. Es normal. Lo que no es
   normal es que te diga "listo" sin la captura del entorno de prueba.
3. Cuando te muestre la captura, abrí vos la URL en tu navegador. Tiene que verse lo mismo. Es la
   primera vista humana del sistema, y es un hito.

**Antes de enviar el prompt** de cierre: tu visita a la URL del entorno de prueba hecha, el enlace
a la corrida de integración continua en verde abierto por vos, y `docs/GATES.md` leído, con una
condición verificable por compuerta.

4. Cerrá con:

> Skeleton approved. Record in `docs/STATUS.md` the test environment URL, the command to run
> the tests and the command to deploy, and mark this step as done. Then run the deployment a
> second time and show me that the second run changed nothing.

> [es]
> Esqueleto aprobado. Registrá en `docs/STATUS.md` la URL del entorno de prueba, el comando para
> correr los tests y el comando para desplegar, y marcá este paso como hecho. Después corré el
> despliegue por segunda vez y mostrame que la segunda corrida no cambió nada.

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
aprenden en las semanas 2 y 3 sobre los dos primeros bloques funcionales, y se practican hasta el
final. La idea es que al terminar el tramo tengas el reflejo: abrir un bloque convirtiendo el
pedido en pendientes especificados, tomar uno, construir, probar en rojo, correr la prueba de
punta a punta del flujo, actualizar el otro lado, medir lo que haya que medir, reportar separando
lo verificado de lo creído, documentar el pendiente cerrado, y al cierre del bloque usar el sistema
vos mismo. Ese reflejo es el método.

Para practicarlas vas a necesitar funcionalidad real. En el proyecto guía, el primer bloque es la
agenda básica: ver los turnos del día, cargar un turno, cancelarlo. El segundo, pacientes y
búsqueda. Nada de mensajes ni pagos todavía; eso viene después de los candados (lección 12).
### Lección 5 — El plan son los pendientes, y la especificación detallada vive en cada uno

**Qué tenés que entender.** No hay un "plan" por un lado y una "lista de tareas" por el otro:
**la lista de pendientes es el plan**. Pero hay dos ideas más, y son las que distinguen este
método de una lista de tareas cualquiera.

La primera: la **especificación detallada vive en cada pendiente**. En el método clásico había un
documento de especificación de requerimientos, largo, que envejecía antes de terminarse. Acá se
descompone: cada pendiente trae el nodo del árbol semántico del que cuelga, la historia de usuario
o el caso de uso que lo origina con las palabras del cliente, la descripción detallada, las reglas
de negocio aplicables con su decisión y su fecha, los datos que entran y salen, las pantallas
afectadas, los casos borde, los criterios de aceptación en la forma "dado, cuando, entonces", y
cómo se verifica. Leer la especificación de un pendiente es lo más cerca que vas a estar de leer
código, y es exactamente la distancia correcta: ahí es donde vos detectás que el agente entendió
otra cosa, antes de que construya.

La segunda: **los pendientes cerrados son documentación**. Cuando un pendiente se cierra, queda
con su especificación, la decisión que lo originó, la evidencia con la que se cerró, el commit y
la fecha. La cola de pendientes cerrados es el historial funcional del sistema, y de ahí salen el
diario de cambios y las secciones nuevas del manual. Y la regla de oro para el agente: lo que
aparece fuera de la lista se anota como pendiente nuevo, con su especificación, no se hace.

**La tarea.**

**Antes de enviar el prompt**, con tus manos:

- El pedido del cliente para el primer bloque de funcionalidad, escrito en
  `docs/INITIAL_SURVEY.md` bajo un título con el nombre del bloque, o en un archivo aparte (por
  ejemplo `docs/blocks/BLOCK_01_REQUEST.md`; el prompt dice "the client's request for this block"
  sin ruta, así que decile dónde está), tal como lo diría el cliente, con sus ambigüedades. Para
  Turnera: "quiero ver los turnos del día, cargar uno nuevo y cancelar". Si en la ingesta
  escribiste los casos de uso, pegalos también: son la unidad natural del bloque. Si el dueño te
  dio una prioridad, también.
- `docs/SEMANTIC_TREE.md`, `PROJECT.md` y `docs/STATUS.md`, al día (lección 2).

1. Pegale:

> We are going to turn everything that must be done in this block into numbered pending items,
> each one carrying its full specification. Read `PROJECT.md`, `docs/SEMANTIC_TREE.md`, the
> client's request for this block, and whatever is in `docs/STATUS.md`. If the request is
> ambiguous on any point such that you cannot write a verifiable pending item for it, ask me; do
> not resolve it by assuming. Then create or extend `docs/PENDING.md` with one item per thing to
> do, each with: number (PND-001 onwards); one-line title; the node of the semantic tree it hangs
> from; the user story or use case that originates it, in the client's words; the detailed
> description; the business rules that apply, each with its decision and date, or marked as
> "rule missing, asked"; the data in and out; the screens affected; the edge cases and
> exceptions; the acceptance criteria in the form "given, when, then"; how it will be verified
> as done; and status. If a node the item needs does not exist in the tree, propose it and mark
> it. Order the items by the priority I gave you; if I gave none, propose an order and tell me
> why. Reply in my language.

> [es]
> Vamos a convertir todo lo que hay que hacer en este bloque en pendientes numerados, cada uno
> con su especificación completa. Leé `PROJECT.md`, `docs/SEMANTIC_TREE.md`, el pedido del
> cliente para este bloque, y lo que haya en `docs/STATUS.md`. Si el pedido es ambiguo en algún
> punto de modo que no puedas escribir un pendiente verificable, preguntame; no lo resuelvas
> suponiendo. Después creá o extendé `docs/PENDING.md` con un ítem por cosa a hacer, cada uno
> con: número (PND-001 en adelante); título de una línea; el nodo del árbol semántico del que
> cuelga; la historia de usuario o caso de uso que lo origina, con las palabras del cliente; la
> descripción detallada; las reglas de negocio que aplican, cada una con su decisión y fecha, o
> marcada como "regla faltante, preguntada"; los datos que entran y salen; las pantallas
> afectadas; los casos borde y las excepciones; los criterios de aceptación en la forma "dado,
> cuando, entonces"; cómo se va a verificar que está hecho; y el estado. Si un nodo que el ítem
> necesita no existe en el árbol, proponelo y marcalo. Ordenalos por la prioridad que te di; si
> no te di ninguna, proponé un orden y decime por qué. Respondé en mi idioma.

   Le estás pidiendo que convierta el pedido en ítems verificables, que **pregunte cuando el
   pedido no da para escribir uno verificable**, la especificación completa de cada uno campo
   por campo, el nodo del árbol del que cuelga, las reglas de negocio con su decisión o marcadas
   como faltantes, los criterios de aceptación que después serán el guion del test, y un orden
   con su razón.

2. Contestá las preguntas (para Turnera va a preguntar, por ejemplo, qué es "el día": ¿el de hoy,
   o cualquiera que se elija?; ¿cancelar borra o marca?). Esas preguntas son decisiones de
   negocio; en la lección 6 vas a ver dónde se escriben.
3. **Leé la especificación de cada pendiente** como si fueras el cliente. Esta es la tarea más
   importante de la lección, y la que más tentación da de saltear. ¿Describe lo que pediste, con
   tus palabras? ¿Los criterios de aceptación son los que vos usarías para decir "está bien"? ¿Hay
   un caso borde que vos conocés y no está? ¿Cuelga del nodo correcto? Corregí antes de que se
   construya nada.

**Antes de enviar el prompt** de la rutina: `docs/PENDING.md` con el bloque especificado y leído
por vos pendiente por pendiente, con tus correcciones hechas (ningún pendiente con una
especificación de una línea), y `docs/WORKING_AGREEMENT.md`, donde la rutina se agrega.

4. Agregá al contrato de convivencia la rutina de cada sesión. Pegale:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before touching any code, open
> `docs/PENDING.md`, tell me which item you are taking and why, and re-read its specification.
> Every commit cites its pending item. A pending item is closed with written evidence (the test
> counts red and green, the screenshot, the measured number), never with 'done'. When you close
> it, keep it in the register with its full specification and add: the evidence, the commit, the
> date, and any decision that was taken along the way; that record is the documentation of what
> was built. If along the way you see something that is not on the list, add it as a new pending
> item with its specification; do not do it."

> [es]
> Agregá esta rutina a `docs/WORKING_AGREEMENT.md`: "Antes de tocar código, abrí
> `docs/PENDING.md`, decime qué pendiente tomás y por qué, y releé su especificación. Cada commit
> cita su pendiente. Un pendiente se cierra con evidencia escrita (los números del test en rojo y
> en verde, la captura, el número medido), nunca con 'listo'. Cuando lo cierres, dejalo en el
> registro con su especificación completa y agregá: la evidencia, el commit, la fecha, y cualquier
> decisión que se haya tomado en el camino; ese registro es la documentación de lo que se
> construyó. Si en el camino ves algo que no está en la lista, agregalo como pendiente nuevo con
> su especificación; no lo hagas."

5. Ahora sí, empezá a construir. Pedile que tome el primer pendiente. A partir de acá, cada
   sesión empieza con "qué pendiente tomás y por qué", y cada cierre deja el pendiente documentado.

**Verificación de completitud.** Leé la especificación de un pendiente al azar: ¿tiene todos los
campos, y describe lo que vos pediste? ¿Cada pendiente cuelga de un nodo del árbol que reconocés?
¿Cada uno dice cómo se verifica? ¿Hay reglas marcadas "faltante, preguntada" que no te
preguntaron? ¿Hay pendientes cerrados sin evidencia ni commit? ¿Los cerrados conservan su
especificación y su documentación de cierre? Tomá tres commits al azar: ¿citan su pendiente?
¿Apareció en el código algo sin pendiente?

**Entregable.** `docs/PENDING.md` con el primer bloque especificado, la rutina en el contrato, y
el primer pendiente en curso.

**Errores típicos.** Aceptar especificaciones de una línea: el agente las escribió para cumplir,
y va a inventar lo que falta en el momento de construir. No leer las especificaciones: es el
único momento en que podés atajar un malentendido antes de que cueste. Dejar que el agente cierre
pendientes sin evidencia porque "ya lo vi funcionar". Dejar que cierre sin documentar: seis meses
después nadie sabe por qué el sistema hace lo que hace. Y el que más cuesta corregir: dejar que
haga "una cosita más" fuera de la lista. La primera vez que lo dejás, perdiste el alcance exacto.

**En el proyecto guía.** El primer bloque de Turnera son unos seis pendientes, colgados del
dominio "Agenda" del árbol: PND-001 ver los turnos de un día; PND-002 cargar un turno con
paciente, profesional, fecha y hora; PND-003 impedir dos turnos del mismo profesional a la misma
hora; PND-004 cancelar un turno (marcar, no borrar: decisión de la lección 6); PND-005 buscar un
paciente por nombre o teléfono; PND-006 el alta de paciente con los datos mínimos. La
especificación de PND-003, por ejemplo, dice: nodo Agenda → proceso "cargar turno" → entidad
Turno; historia: "no puede haber dos turnos del mismo profesional a la misma hora, me pasó dos
veces con el cuaderno" (palabras de la encargada); regla: "turno doble solo si el profesional lo
habilitó" (decisión pendiente, preguntada); datos: profesional, fecha, hora de inicio, duración;
pantalla: formulario de carga; casos borde: turnos que se solapan parcialmente, turnos de
distinta duración; criterios de aceptación: "dado un turno del Dr. A a las 10:00, cuando intento
cargar otro del Dr. A a las 10:00, entonces la pantalla avisa y la base no lo guarda"; verificación:
test de punta a punta del formulario más consulta a la base. Eso es una especificación.

### Lección 6 — Las decisiones se escriben junto al código

**Qué tenés que entender.** El modelo, cuando encuentra un hueco en las reglas de negocio, **lo
llena**. No se detiene a preguntar; completa con lo que le parece más probable, con la misma
naturalidad con que escribe lo demás. Por eso esta lección no es "escribí las decisiones" sino
"exigile que frene y pregunte cuando falte una". Y cuando decidís, la decisión se escribe con tus
palabras textuales, tu nombre y la fecha, en el commit, en la especificación del pendiente y en un
registro. Yo lo hago desde el primer sistema [Ref. 29](REFERENCIAS.md#ref-29); seis semanas
después, cuando alguien pregunte "¿por qué cancelar no borra?", la respuesta está escrita y es
tuya.

**La tarea.**

**Antes de enviar el prompt**, con tus manos:

- `docs/WORKING_AGREEMENT.md` (lección 1), donde va la rutina.
- `docs/DECISIONS.md`, creado aunque esté vacío, con el formato en el encabezado: fecha, quién
  decidió, las palabras textuales, el pendiente que la necesitaba.
- Un acuerdo con el dueño del dominio, si no sos vos, sobre el canal y el tiempo en que contesta:
  la rutina solo funciona si alguien decide en horas, no en semanas.

1. Agregá al contrato la rutina de decisiones. Pegale:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Whenever implementing something requires a
> business rule that is not written down, or you must choose between two approaches that change
> what the user sees, stop and ask me, in prose, with your recommendation and the alternative. Do
> not implement the one you prefer. When I decide, write the decision with my name and the date
> in the commit message, in the pending item's specification and in `docs/DECISIONS.md`, with
> the exact words I used. If I do not answer and you must move on, implement the most reversible
> option and mark it 'decision by omission, pending confirmation', so that I can review it."

> [es]
> Agregá esta rutina a `docs/WORKING_AGREEMENT.md`: "Cada vez que implementar algo requiera una
> regla de negocio que no está escrita, o tengas que elegir entre dos enfoques que cambian lo que
> el usuario ve, frená y preguntame, en prosa, con tu recomendación y la alternativa. No
> implementes la que preferís. Cuando yo decida, escribí la decisión con mi nombre y la fecha en
> el mensaje del commit, en la especificación del pendiente y en `docs/DECISIONS.md`, con las
> palabras exactas que usé. Si no contesto y tenés que seguir, implementá la opción más reversible
> y marcala como 'decisión por omisión, pendiente de confirmación', para que yo la revise."

   Le estás pidiendo que frene ante una regla no escrita, que pregunte con recomendación y
   alternativa (para que puedas decidir en diez segundos), que registre tus palabras textuales en
   los tres lugares, y que cuando no contestás elija lo más reversible y lo marque.

2. Seguí construyendo los pendientes del bloque. Cada vez que te pregunte una regla de negocio,
   decidí y contestá con el formato de cierre.

**Antes de enviar el prompt** de cierre: la pregunta del agente leída con su recomendación y su
alternativa, y tu decisión redactada en una frase con las palabras exactas que querés que queden
para siempre, consultada con el dueño si no sos vos, con la fecha. No se improvisa en el chat.

3. Pegale:

> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.

> [es]
> Regla: [texto exacto]. Decidida por mí, [fecha]. Anotala y seguí.

4. Hacé la prueba contraria, una vez, a propósito: dejá una pregunta sin contestar durante una
   sesión y mirá qué hace. Tiene que elegir lo más reversible y marcarlo "por omisión". Si eligió
   lo que le pareció y no lo marcó, es una falla del peldaño: corregila en el contrato.

**Verificación de completitud.** Abrí tres commits que toquen reglas de negocio: ¿citan quién
decidió y cuándo? ¿La regla está también en la especificación del pendiente? ¿Hay decisiones "por
omisión" sin confirmar? ¿Hay alguna regla en el sistema que no reconocés como tuya? ¿Las frases
son textuales o "mejoradas"?

**Entregable.** `docs/DECISIONS.md` creciendo, con al menos cinco decisiones del primer bloque,
y los commits y los pendientes citándolas.

**Errores típicos.** Contestar las preguntas por chat y no exigir que queden escritas: a la
tercera sesión ya nadie se acuerda. Dejar que el agente "mejore" tus palabras: una regla
parafraseada es una regla distinta. Y el más grave: descubrir en producción una regla que nadie
decidió. Cuando pase (va a pasar), no es un bug: es un fallo del peldaño 6, y se arregla en el
contrato, no solo en el código.

**En el proyecto guía.** Decisiones típicas del primer bloque de Turnera: "cancelar marca el turno
como cancelado y guarda quién y cuándo; no se borra nada"; "un profesional no puede tener dos
turnos a la misma hora, pero sí dos pacientes en un turno doble si el profesional lo habilitó";
"el teléfono del paciente es obligatorio; el correo no". Cada una con fecha y con el nombre de la
encargada, y cada una pegada en la especificación del pendiente que la necesitaba.

### Lección 7 — Tests como candados, probados en rojo, y las pruebas de punta a punta

**Qué tenés que entender.** Esta es la lección central del curso. Un test que nunca viste fallar
no sabés si prueba algo. El modelo escribe el código y el test en la misma sesión, con el mismo
entendimiento: si entendió mal el pedido, el test prueba lo que entendió, y pasa. La única forma
barata de saber que el test mira lo que importa es **verlo en rojo contra el código viejo**: si el
código de antes del cambio también lo pasa, el test no distingue el antes del después, y entonces
no sirve. Por eso el pedido no es "escribí tests" sino "mostrame el rojo, después el verde,
después la regresión". El caso que mejor lo muestra es el de los contadores que no coincidían
[Ref. 26](REFERENCIAS.md#ref-26).

Y la segunda idea, que es tan importante como la primera: las pruebas de punta a punta. Un test
que verifica desde la pantalla (hace clic, tipea, lee) y comprueba el efecto en el backend (la
fila quedó, el estado cambió) es el que reemplaza tu lectura del código. Los criterios de
aceptación del pendiente ("dado, cuando, entonces") son su guion. Y se corren **tres veces, en
tres escalas**: el flujo tocado, con cada pendiente; todos los flujos que existen, al cierre de
cada bloque; y todos los flujos con la versión exacta, antes de cada despliegue a producción. Si
solo hacés la tercera, llegás al final con un sistema que nadie probó de punta a punta durante
semanas.

**La tarea.**

**Antes de enviar el prompt**, con tus manos:

- `docs/WORKING_AGREEMENT.md`, donde va la rutina.
- El pendiente que se va a cerrar, con sus criterios de aceptación "dado, cuando, entonces" y su
  "cómo se verifica" en `docs/PENDING.md`: son el guion del test. Si no los tiene, volvé a la
  lección 5 antes de pedir el test.
- La batería y el comando para correrla en `docs/STATUS.md` (lección 4), y el entorno de prueba
  corriendo, con datos suficientes para el flujo que se toca; si faltan datos, cargalos vos o
  pedile que los cree como parte del test, pero que no los simule.

1. Agregá al contrato la rutina de evidencia. Pegale:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "To close a pending item I need evidence,
> not your word. (1) Write the test that proves what the item asks for, following its acceptance
> criteria. (2) Demonstrate that this test fails against the previous code: you may temporarily
> revert the change, or run the test against the old version, but show me the red output. (3)
> Show me the green output with the change. (4) Run the regression suite for the neighbouring
> items and show me it is still green. (5) Run the end-to-end test of the flow this item
> touches, from the screen to the backend, and show me the backend effect. (6) Do not replace
> with mocks the very part you are trying to test. If testing end to end requires something you
> lack (data, access, an environment), ask me for it; do not simulate what you do not have.
> Finally, the commit message says 'proved red against [what]' and the test counts."

> [es]
> Agregá esta rutina a `docs/WORKING_AGREEMENT.md`: "Para cerrar un pendiente necesito
> evidencia, no tu palabra. (1) Escribí el test que prueba lo que el pendiente pide, siguiendo sus
> criterios de aceptación. (2) Demostrá que ese test falla contra el código anterior: podés
> revertir temporalmente el cambio, o correr el test contra la versión vieja, pero mostrame la
> salida en rojo. (3) Mostrame la salida en verde con el cambio. (4) Corré la regresión de los
> pendientes vecinos y mostrame que sigue en verde. (5) Corré la prueba de punta a punta del flujo
> que este pendiente toca, desde la pantalla hasta el backend, y mostrame el efecto en el backend.
> (6) No reemplaces con simulaciones justamente la parte que estás probando. Si probar de punta a
> punta requiere algo que no tenés (datos, acceso, un entorno), pedímelo; no simules lo que no
> tenés. Por último, el mensaje del commit dice 'probado en rojo contra [qué]' y los números de
> los tests."

   Le estás pidiendo el test guiado por los criterios de aceptación, **el rojo demostrado con la
   salida a la vista**, el verde, la regresión de los vecinos, la prueba de punta a punta del
   flujo con el efecto en el backend, nada de simular justo lo que se prueba, y pedir lo que
   falte en vez de simularlo.

2. Tomá el pendiente del sobreturno (PND-003 en Turnera, o el equivalente en tu proyecto: una
   regla que impide algo). Pedile que lo cierre con la rutina. Leé el reporte: tiene que haber una
   salida en rojo con números ("1 de 1 falla contra la versión sin la regla"), después el verde,
   y la prueba de punta a punta: un navegador controlado por programa que abre la pantalla,
   intenta cargar el sobreturno, lee el aviso, y comprueba en la base que no se guardó.
3. Si te dice que no puede probar de punta a punta porque la pantalla no se puede operar por
   programa, pará: eso es X2 fallando, y hay que arreglarlo ahora (agregar identificadores a los
   elementos de la pantalla) antes de seguir.

**Antes de enviar el prompt**: distinguí si le falta un insumo que vos tenés (datos, un acceso, un
entorno: dáselo y no mandes este prompt) o si de verdad el sistema no es testeable ahí (este
prompt).

4. Pegale:

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

> [es]
> Explicá por qué no se puede probar, qué habría que agregar para que se pueda, y abrí un
> pendiente para eso. El cambio no está cerrado hasta que se pueda probar.

5. **Al cierre del bloque**, cuando los seis pendientes estén cerrados, corré la batería
   completa.

**Antes de enviar el prompt** de la batería: los seis pendientes cerrados con la rutina, la
versión exacta que se va a promover identificada y desplegada en el entorno de prueba, y tu propia
lista de los flujos que existen (sacada de los casos de uso del árbol semántico), para
contrastarla con lo que el agente diga que cubrió.

6. Pegale:

> Run the complete end-to-end suite of every flow that exists so far, in the test environment,
> with the exact version that will be promoted. Show me the counts, and for each flow the
> backend check that proves it. If any flow has no end-to-end test, say so and open a pending
> item for it; do not pass it as covered.

> [es]
> Corré la batería completa de punta a punta de todos los flujos que existen hasta ahora, en el
> entorno de prueba, con la versión exacta que se va a promover. Mostrame los números y, para cada
> flujo, la verificación en el backend que lo prueba. Si algún flujo no tiene prueba de punta a
> punta, decilo y abrí un pendiente; no lo pases como cubierto.

7. Y después de eso, **usá el sistema vos**. Abrí el entorno de prueba y hacé lo que haría la
   recepcionista: cargá un turno, intentá el sobreturno, cancelá, buscá. Lo que te moleste, lo que
   no entiendas, lo que esté donde no debe: anotalo como pendiente. Esta media hora encuentra lo
   que ningún test encuentra.

**Verificación de completitud.** ¿El reporte muestra el rojo, con números? ¿La regresión corrió en
la misma sesión, con números? ¿La prueba de punta a punta verifica también el backend? ¿Hay alguna
parte simulada justo donde está el cambio? ¿El commit dice "probado en rojo"? Al cierre del
bloque: ¿están todos los flujos en la batería de punta a punta? ¿Usaste el sistema vos y anotaste
lo que encontraste?

**Entregable.** Al menos tres pendientes cerrados con la rutina completa (rojo, verde, regresión,
punta a punta), la batería completa de punta a punta del bloque en verde, y los pendientes que
salieron de tus pruebas humanas.

**Errores típicos.** Aceptar "los tests pasan" sin números y sin rojo. Aceptar que la batería se
"acelere" reemplazando las pruebas de punta a punta por simulaciones. Dejar pasar un "no se puede
probar" sin abrir el pendiente. Y cerrar el bloque sin usarlo vos: la vista humana no se delega.

**En el proyecto guía.** El rojo del sobreturno se ve así: el agente quita temporalmente la regla,
corre el test, y la salida dice que el test falló porque el segundo turno se guardó. Pone la regla
de vuelta, corre, verde. Después la regresión: los tests de PND-001 y PND-002 siguen en verde. Y
el de punta a punta: un navegador controlado por programa carga el formulario, aprieta "guardar",
lee el mensaje "ese horario ya está ocupado", y una consulta a la base confirma que hay un solo
turno a esa hora. Al cierre del bloque, la batería de punta a punta recorre los tres flujos que
existen (ver el día, cargar, cancelar), y la encargada carga diez turnos de prueba y descubre que
la hora se elige con un menú desplegable incómodo. Pendiente nuevo. Cuando veas ese reporte por
primera vez, vas a entender para qué es todo el método.

### Lección 8 — Simetría entre productor y consumidor, y el registro de anti-patrones

**Qué tenés que entender.** Cuando cambiás una punta del sistema (el servidor, la base, un robot),
la otra punta (la pantalla, un contador, un reporte) tiene que cambiar en el mismo commit. Si no,
divergen, y el usuario ve un número en un lado y otro en el otro
[Ref. 26](REFERENCIAS.md#ref-26). El principio que lo evita es simple de enunciar y difícil de
sostener: **toda lista tiene un solo dueño**. Los estados posibles de un turno, las columnas de un
reporte, las causas por las que algo espera: las define una sola parte (el productor) y las demás
las leen de ahí [Ref. 27](REFERENCIAS.md#ref-27). El árbol semántico es el primer lugar donde esas
listas se declaran. En cuanto hay dos copias, una está desactualizada; solo falta saber cuál.

La segunda mitad de la lección es el registro de anti-patrones (GOTCHAS): los errores que ya te
comiste una vez, anotados con su olor, su causa raíz, su arreglo y cómo detectarlos antes
[Ref. 2](REFERENCIAS.md#ref-2). Lo importante no es anotarlos: es agregar la verificación
automática que los detecte, porque un anti-patrón anotado y no automatizado se repite cuando
cambia la sesión.

**La tarea.**

**Antes de enviar el prompt**, con tus manos:

- Al menos un bloque funcional construido: sin contratos entre partes no hay mapa que hacer.
- `docs/SEMANTIC_TREE.md` al día: las listas (estados, tipos, causas) están declaradas ahí, y el
  mapa tiene que coincidir con el árbol.
- Una lista escrita por vos de lo que vive fuera del repositorio y produce o consume algo del
  sistema (un robot, una planilla, un proceso de otro equipo), o la constancia de que no hay nada.

1. Pedile el mapa de contratos:

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

> [es]
> Construí `docs/PRODUCER_CONSUMER_MAP.md`: para cada contrato del sistema (un servicio, una
> tabla, un formato de archivo, una lista de valores), quién lo produce y quién lo consume. Si hay
> partes del sistema a las que no podés acceder o que no entendés, decímelo en vez de dejarlas
> fuera del mapa. Respondé en mi idioma.

   Le estás pidiendo el inventario de contratos con sus dos lados, y que lo que no ve lo declare
   en vez de omitirlo.

**Antes de enviar el prompt** de la rutina: el mapa revisado por vos (elegí un contrato y verificá
que los dos lados sean los que conocés) y `docs/WORKING_AGREEMENT.md`.

2. Agregá la rutina al contrato:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before closing any change that touches a
> contract, look up every consumer in the map and update them in the same commit. Always prefer
> that the producer defines the list (columns, causes, states) and the consumer reads it, rather
> than each keeping its own copy. If the map does not have that relationship, add it."

> [es]
> Agregá esta rutina a `docs/WORKING_AGREEMENT.md`: "Antes de cerrar cualquier cambio que toque
> un contrato, buscá en el mapa a cada consumidor y actualizalos en el mismo commit. Preferí
> siempre que el productor defina la lista (columnas, causas, estados) y el consumidor la lea, en
> vez de que cada uno tenga su copia. Si el mapa no tiene esa relación, agregala."

3. Hacé la prueba de la lista: elegí una lista que aparezca en la pantalla (en Turnera, los
   estados de un turno: pendiente, confirmado, cancelado, ausente) y pedile al agente que te
   muestre dónde está definida y dónde se lee. Si hay dos definiciones, pedile que deje una sola,
   y que coincida con el árbol semántico.
4. La primera vez que algo se rompa por segunda vez (va a pasar en las próximas semanas),
   registralo.

**Antes de enviar el prompt**: el pendiente o el commit de la primera vez, ubicado por vos entre
los cerrados de `docs/PENDING.md`, para pegárselo junto con el prompt (sin esa referencia el
anti-patrón sale genérico); y `docs/GOTCHAS.md` creado aunque esté vacío, con el formato en el
encabezado: olor, causa raíz, arreglo, cómo detectarlo antes.

5. Pegale:

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

> [es]
> Esto ya nos pasó. Registralo en `docs/GOTCHAS.md` con: cómo huele (la señal temprana), la causa
> raíz, el arreglo, y cómo detectarlo la próxima vez antes de que duela. Y agregá, si se puede, un
> test o una verificación automática que lo detecte.

**Verificación de completitud.** Elegí un contrato del mapa: ¿cada consumidor lo lee del productor
o tiene su copia? ¿Hay un número que se muestre en dos pantallas y den igual? ¿Los estados de las
entidades coinciden entre el código y el árbol semántico? ¿Cada entrada de GOTCHAS tiene las
cuatro partes? ¿Se repitió algo que ya estaba anotado?

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
aparece mañana". Causa raíz: dos zonas horarias. Arreglo: una sola, en el servidor. Detección: un
test con un turno a las 23:30.

### Lección 9 — Medir antes de construir, con un instrumento que también se verifica

**Qué tenés que entender.** El modelo produce afirmaciones con número ("hay unas 120 consultas de
ese tipo") y suenan exactamente igual cuando son medidas que cuando son estimadas. Vos no podés
distinguirlas por el tono. La única forma es exigir el instrumento: "¿con qué lo mediste? mostrame
el comando". La regla del peldaño es que **ningún número que decide algo sale de una impresión**:
sale de un medidor que vive en el repositorio, que tiene un test que lo verifica contra un caso
conocido, y que vos podés correr.

Y hay algo más, que aprendí a los golpes y que es el motivo por el que tardé en formalizar esta
regla que daba por obvia: los medidores también mienten. En uno de mis sistemas, un medidor daba
cero porque no veía una parte del código, y otro decía 27 cuando eran 44
[Ref. 35](REFERENCIAS.md#ref-35), [Ref. 36](REFERENCIAS.md#ref-36). Por eso la auditoría en dos
direcciones: del código a la medida (¿todo lo que debería contarse está contado?) y de la medida
al código (¿todo lo contado existe de verdad?).

En un proyecto chico, "medir" es modesto: contar cuántas consultas hace una pantalla al cargar,
cuánto tarda el reporte mensual, cuántos mensajes se mandaron ayer. No hace falta un trinquete ni
un presupuesto por camino. Lo que sí hace falta es que el número tenga un comando atrás.

**La tarea.**

**Antes de enviar el prompt**, con tus manos:

- La hipótesis, en una frase. En Turnera, una buena: "la agenda del día hace una consulta a la
  base por cada turno que muestra" (el clásico bucle N+1). Si no es cierta, mejor: vas a ver cómo
  se verifica una hipótesis falsa. Va en el hueco del prompt, junto con la cantidad a medir.
- Un caso conocido para el test del medidor, en el que vos sabés la respuesta de antemano ("con
  cero turnos tiene que contar exactamente las consultas base").
- Acceso a lo que se mide (la base en solo lectura si son datos reales, el log) y los medidores
  que ya existan en el repositorio, nombrados.

1. Pegale:

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

> [es]
> Antes de construir nada, vamos a medir. La hipótesis es: [la agenda del día hace una consulta a
> la base por cada turno que muestra]. Escribí un medidor (un script que vive en el repositorio)
> que mida [la cantidad de consultas que hace la agenda del día para un día con N turnos], y un
> test para el medidor que lo verifique contra un caso conocido donde la respuesta se sabe de
> antemano. Si medir requiere acceso o datos que no tenés, pedímelos; no aproximes en silencio.
> Si alguna parte solo se puede aproximar, marcala como aproximada y decime el margen. Corré el
> medidor, mostrame el número junto con el comando que lo produce, y auditalo en las dos
> direcciones: del código a la medición (¿está contado todo lo que debería contarse?) y de la
> medición al código (¿existe de verdad todo lo contado?). Recién entonces proponé qué construir.
> Respondé en mi idioma.

   Le estás pidiendo el medidor en el repositorio, el test del medidor, pedir lo que le falte en
   vez de aproximar, marcar lo aproximado, el número con el comando, la auditoría en dos
   direcciones, y el orden: primero medir, después proponer.

2. Corré vos el comando que te dio. Tiene que darte el mismo número. No hace falta que entiendas el
   script; sí que lo ejecutes.
3. Si la hipótesis era cierta y el agente propone arreglarlo, pedile un presupuesto.

**Antes de enviar el prompt** del presupuesto: el número medido, corrido por vos con el comando
que te dio (te tiene que dar lo mismo), y el margen que estás dispuesto a dar, decidido por vos:
un poco más que lo medido, no el doble por las dudas.

4. Pegale:

> Set the budget for [queries] on this path at the measured value plus a small margin, and
> protect it with a test that fails if it is exceeded. Tell me the number and the margin.

> [es]
> Fijá el presupuesto de [consultas] en este camino en el valor medido más un margen chico, y
> protegelo con un test que falle si se supera. Decime el número y el margen.

   Así, si alguien vuelve a meter el bucle dentro de tres meses, la batería lo detecta.

**Antes de enviar el prompt** de la regla cinco: `docs/WORKING_AGREEMENT.md`, y un medidor ya
existente para cada cantidad que un plan pueda afirmar; si no hay medidor, primero el prompt
inicial de esta lección.

5. Agregá al contrato la regla cinco, para cuando un plan traiga números:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before executing a plan that asserts
> numbers, verify every number with the meter. If any does not match, stop and tell me; do not
> execute on a wrong number."

> [es]
> Agregá esta rutina a `docs/WORKING_AGREEMENT.md`: "Antes de ejecutar un plan que afirma
> números, verificá cada número con el medidor. Si alguno no coincide, frená y decímelo; no
> ejecutes sobre un número equivocado."

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
(digamos, 2). Si había bucle, los números son 12, 52 y 202; se arregla, pasan a ser 3, 3 y 3, y el
presupuesto queda en 4 con un test que falla si la agenda hace más de 4 consultas para cualquier
cantidad de turnos.

### Lección 10 — Verificación honesta y reporte proporcional

**Qué tenés que entender.** Si vos no vas a leer código, el reporte del agente tiene que ser
confiable, y eso no pasa solo. El modelo fue entrenado para ser útil y completo, y un reporte que
dice "esto no lo pude verificar" se siente menos útil que uno que dice "listo". Entonces hay que
**pedirle explícitamente** las malas noticias, los puntos ciegos y lo que no hizo. Si no se lo
pedís, no te lo da; no porque lo oculte, sino porque no lo considera parte de la respuesta. A mí
me reportaron un error de autenticación con la leyenda "success" [Ref. 43](REFERENCIAS.md#ref-43).

La estructura que lo vuelve honesto son tres bloques: **verificado** (con la prueba al lado),
**creído** (lo que piensa que funciona y por qué no lo probó), y **puntos ciegos** (lo que no
puede ver desde donde está). Y una regla: las malas noticias primero.

**La tarea.**

**Antes de enviar el prompt**, con tus manos:

- `docs/WORKING_AGREEMENT.md`, donde va la rutina.
- La costumbre de anotar, en cada sesión, la lista de lo que pediste: el prompt le exige cubrir
  cada ítem uno por uno, y vos tenés que saber cuántos eran.

1. Agregá al contrato la rutina de reporte:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "When you report, separate three blocks:
> VERIFIED (what you tested, with the command and its output), BELIEVED (what you think works but
> did not test, and why not), and BLIND SPOTS (what you cannot see from where you are: another
> environment, real data, the user's browser). Cover every item I asked for, one by one, even when
> the answer is 'I did not do it'. No claim without its proof next to it. Do not say 'done': say
> what is done and how you know it. If something went wrong, say it first."

> [es]
> Agregá esta rutina a `docs/WORKING_AGREEMENT.md`: "Cuando reportes, separá tres bloques:
> VERIFICADO (lo que probaste, con el comando y su salida), CREÍDO (lo que pensás que funciona
> pero no probaste, y por qué no), y PUNTOS CIEGOS (lo que no podés ver desde donde estás: otro
> entorno, datos reales, el navegador del usuario). Cubrí cada ítem que te pedí, uno por uno,
> incluso cuando la respuesta sea 'no lo hice'. Ninguna afirmación sin su prueba al lado. No
> digas 'listo': decí qué está hecho y cómo lo sabés. Si algo salió mal, decilo primero."

2. Pedile que cierre el próximo pendiente y leé el reporte con la lista de verificación de abajo.
   La primera vez, casi seguro, el bloque "puntos ciegos" va a estar vacío. Preguntale: "¿qué no
   podés ver desde donde estás?". Tiene que haber algo (tu navegador, el entorno de producción,
   los datos reales). Si insiste en que nada, insistí vos.
3. Practicá el "sigue roto". Pedile algo chico, verificá en el entorno de prueba, y si por
   cualquier razón no ves el cambio (es común: el despliegue tarda, o no se hizo), decile "sigue
   roto".

**Antes de enviar el prompt**: tu verificación anotada (en qué URL miraste, qué versión muestra el
sistema, qué hiciste, qué esperabas, qué pasó) y el commit o la versión que el agente dijo que
contenía el arreglo, copiado de su reporte. Sin eso, el "sigue roto" es una impresión.

4. Pegale:

> Before diagnosing again, compare the version running where I see the problem with the version
> that contains your fix. Tell me both. If they differ, the problem is publication, not code.

> [es]
> Antes de volver a diagnosticar, compará la versión que corre donde yo veo el problema con la
> versión que contiene tu arreglo. Decime las dos. Si son distintas, el problema es de publicación,
> no de código.

   La mitad de los "sigue roto" son arreglos que están en el repositorio y no en el lugar donde
   vos mirás [Ref. 45](REFERENCIAS.md#ref-45). Esta cláusula te ahorra horas.

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
regresión 6/6; punta a punta del flujo 'cancelar' en verde, con la fila marcada en la base; en el
entorno de prueba, el turno 17 del 3 de noviembre figura cancelado por 'recepcion1' a las 10:42
(captura). CREÍDO: el reporte mensual va a contar bien las cancelaciones, pero no lo probé porque
el reporte es PND-011 y todavía no existe. PUNTOS CIEGOS: no puedo ver cómo se ve el estado
'cancelado' en el celular de la recepcionista; probalo vos."

---

## Tramo de operación: lecciones 11 a 15

Estas cinco lecciones son las que convierten "funciona" en "se puede sostener". Se hacen en las
semanas 4 y 5, cuando los dos primeros bloques están construidos con el bucle y probados por vos
en el entorno de prueba, y antes de que el sistema actúe sobre el mundo (mande mensajes, cobre) o
tenga usuarios reales. En el proyecto guía, es el momento de agregar los recordatorios y la seña,
y por eso la lección 12 (candados) va antes de construir esas funcionalidades, no después.

### Lección 11 — La auditoría periódica como insumo del plan

**Qué tenés que entender.** Cada tanto hay que mirar el sistema entero con ojos frescos, y lo que
se vea no va a un informe que se archiva: va a la lista de pendientes. La parte importante es
"ojos frescos": el que audita no tiene que ser el que construyó, porque comparte sus supuestos.
Un modelo que construyó un módulo "sabe" que la contraseña escrita en el código era provisoria; un
modelo que lo ve por primera vez la reporta como lo que es. Así se encontraron dos puertas de
administrador que el constructor había dejado en un día [Ref. 40](REFERENCIAS.md#ref-40). No hace
falta otra empresa: alcanza con **otra sesión, con otro archivo de instrucciones, que no haya
participado**.

**La tarea.**

**Antes de enviar el prompt**, con tus manos:

- Una sesión nueva del agente en una copia limpia del repositorio (clonalo en otra carpeta). Si tu
  herramienta lo permite, dale un archivo de instrucciones distinto, que solo diga "sos un
  auditor; no construiste este sistema".
- Acceso de solo lectura para esa sesión al entorno de prueba (base de datos, logs), con
  credenciales de solo lectura fuera del repositorio.
- El alcance decidido por vos para el hueco del prompt, y la auditoría anterior, si hubo.

1. Pegale:

> Audit this system for [integrity, security, performance and code quality]. Read-only: change
> nothing except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires
> access you lack (the database, the log, an environment), tell me and mark that part as not
> audited; do not pass it as fine. Go through all of the code, not a sample. For every finding:
> where it is (file and line), what the risk is, what evidence proves it (the command, the
> query, the number), and its priority: P0 must be fixed now, P1 soon, P2 when possible. Give a
> grade to every dimension you audited. End with the list of P0 findings turned into proposed
> pending items. Reply in my language.

> [es]
> Auditá este sistema en [integridad, seguridad, rendimiento y calidad de código]. Solo lectura:
> no cambies nada salvo escribir tu informe en `docs/AUDIT_[fecha].md`. Si auditar alguna parte
> requiere un acceso que no tenés (la base de datos, el log, un entorno), decímelo y marcá esa
> parte como no auditada; no la des por buena. Recorré todo el código, no una muestra. Para cada
> hallazgo: dónde está (archivo y línea), cuál es el riesgo, qué evidencia lo prueba (el comando,
> la consulta, el número), y su prioridad: P0 hay que arreglarlo ya, P1 pronto, P2 cuando se
> pueda. Poné una nota a cada dimensión que auditaste. Terminá con la lista de hallazgos P0
> convertidos en pendientes propuestos. Respondé en mi idioma.

   Le estás pidiendo solo lectura, que declare lo que no pudo auditar en vez de aprobarlo por
   omisión, todo el código y no una muestra, cada hallazgo con ubicación, riesgo, evidencia y
   prioridad, notas por dimensión, y los P0 ya como pendientes propuestos.

2. Leé el informe. Elegí dos hallazgos y pedile al auditor que te muestre la evidencia (el
   comando, la línea). Tiene que poder.

**Antes de enviar el prompt** de cierre: el informe leído por vos, los dos hallazgos verificados
con el auditor, y la sesión del constructor abierta (este prompt va al constructor, no al
auditor), con la fecha del archivo en el hueco.

3. Volvé a la sesión del constructor y pegale:

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.

> [es]
> Leé `docs/AUDIT_[fecha].md`. Abrí un pendiente por cada P0 y P1, citando el hallazgo. Si no
> estás de acuerdo con alguno, decímelo con la evidencia en contra; no lo ignores.

4. Repetí esta lección antes del primer despliegue a producción (lección 13) y, después, cada uno
   o dos meses.

**Verificación de completitud.** ¿El informe dice qué NO pudo auditar? ¿Dos hallazgos al azar
tienen archivo, línea y evidencia reproducible? ¿Cada P0 tiene su pendiente abierto? ¿Las notas se
van a poder comparar con la próxima auditoría? ¿Auditó una sesión distinta de la que construyó?

**Entregable.** `docs/AUDIT_[fecha].md` y los pendientes P0/P1 abiertos.

**Errores típicos.** Auditar con la misma sesión que construyó: va a confirmar sus propios
supuestos. Aceptar un informe sin ningún P0 en un sistema de más de un mes: casi nunca es verdad.
Y archivar el informe sin abrir los pendientes: ahí la auditoría no sirvió para nada.

**En el proyecto guía.** La primera auditoría de Turnera suele encontrar: datos de pacientes en el
log (teléfonos impresos al enviar mensajes: P0); la búsqueda de pacientes por nombre sin índice
(P1, se va a notar a los 5.000 pacientes); el formulario de turno sin validar que la fecha sea
futura (P1); y alguna dependencia con una vulnerabilidad conocida (P1). Cuatro pendientes nuevos,
todos con archivo y línea.

### Lección 12 — Fail-closed, candados y cero daño silencioso

**Qué tenés que entender.** El software, por defecto, ante la duda sigue adelante: si la
validación falla, el código continúa; si el servicio no responde, se asume que todo está bien. Es
"fail-open", como una puerta que se abre cuando se corta la luz. El método invierte el defecto:
**ante la duda, no**. Toda acción con consecuencia (cobrar, enviar, borrar, aprobar) lleva un
candado, tiene un camino de vuelta escrito, y toda automatización nueva arranca en modo de ensayo,
registrando lo que habría hecho, hasta que vos la habilitás. Los candados que puse en mi primer
sistema son el modelo [Ref. 28](REFERENCIAS.md#ref-28).

Esta lección va **antes** de construir las funcionalidades que actúan sobre el mundo. En Turnera,
antes de los recordatorios y la seña, que son el tercer bloque.

**La tarea.**

**Antes de enviar el prompt**, con tus manos y con el dueño:

- `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`: qué hace o va a hacer el sistema que cobra, envía,
  aprueba, borra o le avisa a alguien de afuera; y para cada acción, qué pasa si se hace dos
  veces, qué pasa si se hace mal, cómo se deshace, quién debería poder hacerla. Los procesos del
  árbol semántico te dan la lista de partida. El prompt lo nombra "the survey of consequential
  actions", sin ruta: decile dónde está.
- `docs/SEMANTIC_TREE.md`, al día.

1. Pegale:

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock. Reply in my language.

> [es]
> Vamos a decidir qué acciones del sistema necesitan candado. Leé el relevamiento de acciones
> con consecuencia, y recorré el código buscando todo lo que cobra, envía, aprueba, borra o avisa
> hacia afuera. Compará las dos listas: si el código tiene acciones que el relevamiento no
> menciona, o al revés, preguntame antes de seguir. Para cada acción proponé: si es reversible,
> qué candado lleva (confirmación explícita, doble seguro, modo de ensayo, límite diario, un
> humano en el circuito), y cuál es el camino de vuelta si sale mal. Regla general: ante cualquier
> duda o fallo en el camino, la acción NO se ejecuta y se registra el motivo. Presentame la tabla;
> yo confirmo candado por candado. Respondé en mi idioma.

   Le estás pidiendo que compare lo que el negocio dijo con lo que el código hace (ahí aparecen
   las acciones que nadie recordaba), que las diferencias las pregunte, y para cada acción la
   reversibilidad, el candado y el camino de vuelta, con la regla del fail-closed escrita.

2. Confirmá candado por candado, con el dueño.

**Antes de enviar el prompt** de cierre: para cada fila de la tabla, tu confirmación o tu cambio,
escritos para los huecos del prompt; ninguna fila sin veredicto, porque un candado no confirmado
es un candado que no se implementa.

3. Cerrá con:

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.

> [es]
> Confirmo los candados [lista]; cambiá [X] por [Y]. Implementalos con un test por candado que
> pruebe que, en la condición de duda, la acción NO ocurre (probado en rojo contra la versión sin
> el candado). Registrá la tabla final en `docs/LOCKS.md`. Y para toda automatización nueva: modo
> de ensayo primero, registrando lo que habría hecho, hasta que yo la habilite.

4. Ahora abrí el tercer bloque (los recordatorios, la seña) con la lección 5, construilo con el
   bucle completo de las lecciones 5 a 10, y dejalo en modo de ensayo. Mirá durante unos días el
   registro de "habría mandado" antes de habilitar el envío real.

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

**En el proyecto guía.** La tabla de candados de Turnera: enviar recordatorio (no reversible;
candado: idempotencia por turno, un solo envío por turno y canal, límite de 200 por día, modo de
ensayo primero; vuelta: ninguna, por eso el límite); cobrar seña (reversible con devolución;
candado: confirmación explícita de la recepcionista, monto fijado por el profesional; vuelta:
devolución por el proveedor de pagos); cancelar turno (irreversible para el paciente; candado:
confirmación y registro de quién; vuelta: recrear el turno); borrar paciente (irreversible;
candado: doble confirmación, solo la encargada, y solo si no tiene turnos futuros; vuelta:
ninguna, por eso doble). Cada candado con un test que muestra que, sin el candado, la acción
ocurría.

### Lección 13 — Integración continua, entornos, secretos y despliegue como parte del producto

**Qué tenés que entender.** Llegar a producción tiene que ser un paquete reproducible: los tests
corren **una** vez, el despliegue solo empaqueta y sube, la configuración vive en el servidor y no
en el repositorio, hay un procedimiento para promover de prueba a producción que se puede correr
dos veces, y la vuelta atrás está **probada** (una vuelta atrás que nunca se probó no existe). A
mí los tests corridos tres veces por commit me fundieron la cuota de integración continua
[Ref. 39](REFERENCIAS.md#ref-39). Sobre los secretos, una regla sin excepciones: **un secreto que
se vio en un chat, en un log o en un commit ya no es un secreto**; se rota, y punto
[Ref. 42](REFERENCIAS.md#ref-42).

Ya tenés buena parte de esto desde el esqueleto (lección 4): la integración continua y el
despliegue a prueba. Esta lección lo completa hacia producción.

**La tarea.**

**Antes de enviar el prompt**, con tus manos:

- `docs/ENVIRONMENTS_SURVEY.md` (lección 4), completado con lo que falta para producción: el
  dominio y quién lo administra, dónde van a vivir los secretos y cuáles son (el nombre, nunca el
  valor), quién puede tocar producción, cómo se haría hoy una vuelta atrás, y cuánta cuota de
  integración continua tenés (si usás GitHub Actions, fijate el límite del plan). El prompt lo
  nombra "the environments and access survey": decile dónde está.
- El acceso a producción para el agente, decidido por vos, con la credencial fuera del repositorio
  y del chat.
- El esqueleto con su integración continua y su despliegue a prueba funcionando (lección 4).

1. Pegale:

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

> [es]
> Vamos a cerrar el camino a producción. Leé el relevamiento de entornos y accesos. Evaluá si
> tenés lo necesario para desplegar a producción con seguridad (acceso, dominio, dónde viven los
> secretos, cómo volver atrás); si falta algo, pedímelo. Después armá: (1) la integración continua
> corre la batería completa exactamente una vez por commit; (2) el despliegue espera el resultado
> de esa corrida y solo empaqueta y sube, sin volver a correr tests; (3) la configuración de cada
> entorno vive en el servidor (archivo de entorno o bóveda), nunca en el repositorio; (4) un
> procedimiento escrito para promover del entorno de prueba a producción, que se pueda correr dos
> veces sin romper nada; (5) la vuelta atrás, probada; (6) una verificación automática que impida
> subir un secreto en un commit. Documentá todo en `docs/DEPLOYMENT.md` de modo que una persona lo
> pueda hacer a mano sin vos. Respondé en mi idioma.

   Le estás pidiendo los accesos antes de empezar, los tests una sola vez por commit, el
   despliegue que solo empaqueta, la configuración afuera, la promoción repetible, la vuelta atrás
   probada, el candado contra secretos, y la documentación para una persona.

2. Antes del primer despliegue a producción, hacé la auditoría de la lección 11 si no la hiciste,
   y corré la batería completa de punta a punta de todos los flujos con la versión exacta que vas
   a promover (el prompt de cierre de bloque de la lección 7).

**Antes de enviar el prompt** de la rutina: `docs/DEPLOYMENT.md` escrito y leído por vos (¿lo
podrías seguir solo?), y `docs/WORKING_AGREEMENT.md`.

3. Agregá al contrato la rutina de despliegue:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before touching production: the test
> environment is green with the same version; the rollback is ready; and tell me what changes in
> the configuration. After deploying: show me the version running in production and an
> end-to-end check on production, read-only."

> [es]
> Agregá esta rutina a `docs/WORKING_AGREEMENT.md`: "Antes de tocar producción: el entorno de
> prueba está en verde con la misma versión; la vuelta atrás está lista; y decime qué cambia en la
> configuración. Después de desplegar: mostrame la versión que corre en producción y una
> verificación de punta a punta sobre producción, en solo lectura."

4. Hacé el primer despliegue a producción, con el sistema todavía sin usuarios reales. Y después
   **probá la vuelta atrás**: pedile que vuelva a la versión anterior y te muestre que está
   corriendo, y después que vuelva a la nueva.
5. Si en algún momento del curso pegaste un secreto en el chat (una clave de API, una
   contraseña), rotalo.

**Antes de enviar el prompt**: el secreto identificado (su nombre, nunca su valor), dónde apareció
y cuándo, y tu acceso al panel donde se genera, por si el agente no puede rotarlo solo. Este
prompt no se manda "más tarde".

6. Pegale:

> That secret is compromised: rotate it now, tell me everywhere else it was used, and add the
> check that would have caught it.

> [es]
> Ese secreto está comprometido: rotalo ahora, decime en qué otros lugares se usó, y agregá la
> verificación que lo habría atrapado.

**Verificación de completitud.** ¿Cuántas veces corre la batería por commit? (una; pedí el
enlace). ¿Hay algún valor real de configuración en el repositorio? (pedile la búsqueda vacía).
¿Podrías seguir `docs/DEPLOYMENT.md` vos solo? ¿La vuelta atrás se probó, cuándo, con qué
evidencia? ¿Se rotó todo secreto que apareció en el chat? ¿Sabés cuánta cuota de integración
continua te queda?

**Entregable.** La integración continua una vez por commit, el despliegue que solo empaqueta,
`docs/DEPLOYMENT.md`, la vuelta atrás probada, el candado anti-secretos activo, y el sistema
corriendo en producción (sin usuarios todavía).

**Errores típicos.** El despliegue "a mano, rápido, porque es un cambio chico": los cambios chicos
rompen producción porque nadie los prueba. El archivo de ejemplo de configuración con valores que
parecen reales (lo son). Y no probar la vuelta atrás hasta el día que la necesitás.

**En el proyecto guía.** Para Turnera, la integración continua corre la batería (unos 30 tests a
esta altura, incluidos los seis flujos de punta a punta) en cada push; el despliegue a prueba es
automático al fusionar en `main`; la promoción a producción es un comando que empaqueta la versión
que está en prueba y la sube, con la configuración (la clave del proveedor de mensajes, la del
proveedor de pagos, la URL de la base) en un archivo de entorno en el servidor que no está en el
repositorio. La vuelta atrás es el mismo comando con la versión anterior. Y el candado
anti-secretos es una verificación en cada commit que rechaza cualquier cosa que parezca una clave.

### Lección 14 — Documentación viva y manuales que una persona puede seguir sin IA

**Qué tenés que entender.** El sistema tiene que poder usarse, mantenerse y recuperarse sin el
agente y sin vos. El criterio para el manual de recuperación es concreto: **lo tiene que poder
seguir una persona de confianza que no programe, a las tres de la mañana, con el sistema caído y
el agente sin conexión**. Si un paso dice "consultar con el desarrollador", está incompleto. Y como
regenerar documentación con un modelo es gratis, la regla pasa a ser "en el mismo commit": cada
cambio que toca lo que el usuario ve, lo que el operador hace o cómo se despliega, actualiza el
manual en el mismo commit. Los manuales que escribí para mi primer sistema con ese criterio son el
modelo [Ref. 24](REFERENCIAS.md#ref-24).

Y una fuente que ya tenés: los pendientes cerrados. Si documentaste cada cierre como pide la
lección 5, el manual de usuario no se escribe de cero: se arma a partir de los pendientes que
cerraron, bloque a bloque, y el diario de cambios sale directamente de ellos.

**La tarea.**

**Antes de enviar el prompt**, con tus manos:

- `docs/WORKING_AGREEMENT.md`, donde va la rutina.
- La lista de manuales que va a tener el sistema, cada uno con su lector (el usuario final, el que
  mantiene, el que opera la infraestructura), escrita en `PROJECT.md` o dicha en el chat.

1. Agregá la rutina al contrato:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Every change that modifies what the user
> sees, what the operator does, or how the system is deployed, updates the corresponding manual
> in the same commit. At the close of every functional block, add to the user manual the screens
> and flows of the pending items closed in that block, with real screenshots from the test
> environment, and add their entries to the changelog. If you do not know which manual, ask."

> [es]
> Agregá esta rutina a `docs/WORKING_AGREEMENT.md`: "Todo cambio que modifique lo que el usuario
> ve, lo que el operador hace, o cómo se despliega el sistema, actualiza el manual correspondiente
> en el mismo commit. Al cierre de cada bloque funcional, agregá al manual de usuario las pantallas
> y los flujos de los pendientes cerrados en ese bloque, con capturas reales del entorno de
> prueba, y agregá sus entradas al diario de cambios. Si no sabés a qué manual va, preguntá."

**Antes de enviar el prompt** de los manuales: el sistema corriendo en el entorno de prueba con
datos realistas (las capturas salen de ahí), los pendientes cerrados con su documentación (lección
5), `docs/DEPLOYMENT.md` y `docs/LOCKS.md` al día, y lo que solo el negocio sabe, preparado para
cuando pregunte: quién es responsable de qué, a qué teléfono se llama a las tres de la mañana,
quién hace la copia de respaldo.

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

> [es]
> Generá tres manuales a partir del sistema tal como está hoy en el entorno de prueba: el manual
> de usuario (pantalla por pantalla, con capturas reales, en el idioma del usuario, sin jerga); el
> manual de mantenimiento (cómo está construido, dónde está cada cosa, cómo correr la batería,
> cómo agregar un módulo); y el manual de infraestructura y recuperación (cómo desplegar, cómo
> volver atrás, cómo restaurar una copia de respaldo, qué hacer si se cae; escrito para una persona
> que tiene que hacerlo a mano, sin IA, a las tres de la mañana). Si para alguna sección necesitás
> algo que solo el negocio sabe (quién es responsable de qué, a qué teléfono llamar), pedímelo; no
> dejes un hueco ni inventes. Cada manual lleva fecha y versión del sistema. Respondé en mi idioma.

   Le estás pidiendo los tres manuales con capturas reales, el criterio de las tres de la mañana
   para el de recuperación, que pregunte lo que solo el negocio sabe en vez de dejar huecos, y
   fecha y versión.

3. La prueba real: dale el manual de recuperación a alguien que no programe (el dueño, un
   familiar) y pedile que siga la sección "se cayó" en el entorno de prueba. Donde se trabe, hay
   que arreglar el manual.
4. Después del próximo cambio de pantalla, verificá que el commit tocó el manual de usuario.
5. Y ahora las **pruebas de aceptación**: el dueño usa el sistema entero en el entorno de prueba,
   con datos realistas, siguiendo los seis flujos, antes de que entre el primer usuario real. Lo
   que encuentre son pendientes; con ellos cerrados, el sistema está aceptado.

**Verificación de completitud.** ¿Una captura al azar coincide con el entorno de prueba de hoy?
¿Alguien que no programa pudo seguir la sección "se cayó"? ¿El último commit que cambió una
pantalla tocó el manual? ¿El diario de cambios tiene una entrada por cada pendiente cerrado? ¿Hay
huecos tipo "[completar]"? ¿Cada manual dice para qué versión vale? ¿El dueño hizo las pruebas de
aceptación sobre todos los flujos?

**Entregable.** Los tres manuales con fecha y versión, la prueba con una persona hecha, y las
pruebas de aceptación cerradas.

**Errores típicos.** Generar los manuales una vez y no ponerle la rutina al contrato: a los dos
meses tienen capturas de pantallas que ya no existen. Un manual de recuperación que empieza con
"abrí una sesión con el agente". Y no hacer la prueba con una persona: es la única verificación
que vale.

**En el proyecto guía.** El manual de usuario de Turnera tiene seis pantallas con captura, armadas
a partir de los pendientes cerrados de los tres bloques; el de mantenimiento explica dónde está
cada módulo y cómo correr la batería; y el de recuperación dice, en orden, con los comandos: cómo
saber si el sistema está caído, cómo reiniciarlo, cómo volver a la versión anterior, cómo
restaurar la base del último backup (que se hace todas las noches: eso también sale de esta
lección), y a quién llamar. La encargada lo siguió en el entorno de prueba y se trabó en
"restaurar la base" porque el comando asumía una carpeta que ella no tenía; se arregló el manual.

### Lección 15 — El agente adentro del sistema, y la retrospectiva con número

**Qué tenés que entender.** Dos cosas cierran el ciclo. La primera es opcional: dejar al agente
residente en producción, con alcance acotado, para diagnosticar y dar soporte sin que vos estés
[Ref. 13](REFERENCIAS.md#ref-13). La regla que lo ordena es que **actúa a nombre de alguien**: su
credencial está mapeada a una persona responsable, y todo lo que hace queda registrado a nombre
de esa persona; no es una cuenta anónima, es un empleado con jefe. La segunda es obligatoria: la
retrospectiva con números. Qué costó, cuántos pendientes, cuáles dieron vueltas, qué incidentes
hubo y en qué peldaño caen, y **al menos un cambio propuesto a la escalera**. Una retrospectiva
que no cambia nada no fue una retrospectiva; la que me llevó a eliminar un equipo entero de agentes
es el modelo [Ref. 6](REFERENCIAS.md#ref-6).

**La tarea (agente residente, si corresponde).**

**Antes de enviar el prompt**, con tus manos y con el dueño:

- La decisión de si el sistema necesita un agente residente, y para qué. En Turnera sí: las
  recepcionistas van a tener preguntas ("¿por qué no le llegó el recordatorio a este paciente?")
  que el agente puede contestar leyendo el log, sin que nadie llame al desarrollador.
- Una credencial propia para el agente en producción, creada por vos, mapeada a una persona
  responsable con nombre, de solo lectura para empezar, con el valor fuera del chat y del
  repositorio.
- `docs/LOCKS.md` y `docs/DEPLOYMENT.md` al día, y el canal (ticket, correo) por el que avisa lo
  que no puede resolver.

1. Pegale:

> We are going to leave you resident in production. First, build the map of the system you will
> need in order to operate it: modules, environments, where each configuration lives, which
> actions are consequential (read `docs/LOCKS.md`), whom to notify. If there are parts of the
> system you cannot see from where you are, tell me; the map must not have hidden gaps. Then
> propose your scope in three levels: read-only and diagnosis; configuration changes with my
> approval; consequential actions behind locks. I choose the level. Your credential acts as the
> person who created it: everything you do is logged under that person's name. Reply in my
> language.

> [es]
> Vamos a dejarte residente en producción. Primero, construí el mapa del sistema que vas a
> necesitar para operarlo: módulos, entornos, dónde vive cada configuración, qué acciones tienen
> consecuencia (leé `docs/LOCKS.md`), a quién avisar. Si hay partes del sistema que no podés ver
> desde donde estás, decímelo; el mapa no puede tener huecos escondidos. Después proponé tu
> alcance en tres niveles: solo lectura y diagnóstico; cambios de configuración con mi aprobación;
> acciones con consecuencia detrás de candados. Yo elijo el nivel. Tu credencial actúa como la
> persona que la creó: todo lo que hagas queda registrado a nombre de esa persona. Respondé en mi
> idioma.

   Le estás pidiendo el mapa antes de operar, que los huecos del mapa los declare, tres niveles
   de alcance para que elijas uno, y la credencial a nombre de una persona.

2. Elegí el nivel (para empezar, siempre el primero: solo lectura y diagnóstico).

**Antes de enviar el prompt** de cierre: el mapa y los tres niveles leídos, el nivel elegido, y
una acción concreta fuera de ese alcance pensada por vos, para que el agente la intente y vos veas
el rechazo en el log.

3. Cerrá con:

> Level [1: read-only and diagnosis]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the
> credential (never its value), and the procedure to request my approval. Then prove, with a real
> attempt recorded in the log, that something outside your scope is rejected.

> [es]
> Nivel [1: solo lectura y diagnóstico]. Escribí en `docs/RESIDENT_AGENT.md` el mapa, el alcance,
> la credencial (nunca su valor), y el procedimiento para pedir mi aprobación. Después demostrá,
> con un intento real registrado en el log, que algo fuera de tu alcance se rechaza.

**La tarea (retrospectiva, siempre).**

**Antes de enviar el prompt**, con tus manos:

- Los números que solo vos tenés, en `docs/RETROSPECTIVE_INPUTS.md` o listos para el chat: cuántas
  horas le dedicaste (de tu calendario, no de memoria), cuánto gastaste en la herramienta de IA
  (la factura), cuánta cuota de integración continua usaste, y las fechas de inicio y de fin.
- La lista de incidentes como vos los recordás, con fecha aproximada, para contrastar con lo que
  el agente saque de los pendientes y los commits.
- `docs/PENDING.md` con los cerrados documentados y `docs/DECISIONS.md`, que son la fuente de los
  números.

4. Pegale:

> [The project] is over. Do the retrospective with numbers, not impressions: what it cost
> (tokens, quota, my time), how many pending items, which ones took the most rounds and why,
> which incidents happened and which step of the ladder each falls into, and which step failed
> or was missing. If you lack the data for any figure (my time, for instance), ask me for it or
> mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder:
> which step is modified, how, and which incident justifies it. Write it to
> `docs/RETROSPECTIVE_[date].md`. Reply in my language.

> [es]
> [El proyecto] terminó. Hacé la retrospectiva con números, no con impresiones: qué costó
> (tokens, cuota, mi tiempo), cuántos pendientes, cuáles dieron más vueltas y por qué, qué
> incidentes hubo y en qué peldaño de la escalera cae cada uno, y qué peldaño falló o faltó. Si no
> tenés el dato para alguna cifra (mi tiempo, por ejemplo), pedímelo o marcalo como estimación; no
> lo inventes. Terminá con una propuesta concreta de cambio a la escalera: qué peldaño se modifica,
> cómo, y qué incidente lo justifica. Escribila en `docs/RETROSPECTIVE_[fecha].md`. Respondé en mi
> idioma.

   Le estás pidiendo números con fuente, cada incidente mapeado a un peldaño (un incidente que no
   cae en ninguno es un peldaño que falta), que te pida los números que no tiene, y una propuesta
   concreta de cambio a la escalera.

5. Leé la propuesta de cambio. Si te parece válida, mandala al
   [repositorio de Urazuke](https://github.com/pkuschnirof/urazuke) como propuesta de mejora (ver
   `CONTRIBUTING.md`): esa es la forma en que el método aprende de cada proyecto.

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
mensajes (zonas horarias y el proveedor de WhatsApp); dos incidentes, uno en el peldaño 8 (el
estado "ausente" existía en la pantalla y no en el servidor, y tampoco en el árbol semántico) y
otro en el 13 (un despliegue a producción con la configuración de prueba, detectado por la
verificación de punta a punta después del despliegue). Propuesta de cambio: que la rutina de
despliegue del peldaño 13 exija mostrar la diferencia de configuración entre prueba y producción
antes de promover, no solo "qué cambia".

---

## La lista de salida a producción

Cuando las dieciséis lecciones están hechas, el sistema cumple esta lista. Es la definición
operativa de "production grade" en Urazuke, y se puede usar como lista de verificación final, con
el dueño, sin abrir el código:

1. Hay una ficha de elegibilidad con decisión, fecha y nombre (P0).
2. Hay un contrato de convivencia que el agente lee en cada sesión, y se probó que lo lee (P1, P2).
3. El archivo de proyecto se lee en cinco minutos y dice qué NO es el sistema; hay un árbol
   semántico confirmado por el dueño, y todo pendiente cuelga de un nodo (P2).
4. Hay un dimensionamiento con datos primarios con fuente, derivados con cuenta, y el escenario
   "por diez" (P3).
5. El esqueleto se desplegó vacío en la primera semana, con la cadena de integración y
   despliegue, y el despliegue se corrió dos veces (P4).
6. Todo cambio tiene su pendiente con especificación detallada, y todo pendiente cerrado conserva
   su especificación y su evidencia: es la documentación de lo hecho (P5).
7. Toda regla de negocio tiene dueño, fecha y palabras textuales, en el commit, en el pendiente y
   en el registro (P6).
8. Todo test importante se vio en rojo antes de verde; cada flujo tiene su prueba de punta a punta
   que verifica el backend desde la pantalla; la batería completa se corrió al cierre de cada
   bloque y antes de producción (P7).
9. Toda lista tiene un solo dueño; hay un mapa productor/consumidor; hay un registro de
   anti-patrones con verificación automática (P8).
10. Todo número que decidió algo tiene un medidor con test que vos podés correr (P9).
11. Todo reporte separa verificado, creído y puntos ciegos (P10).
12. Hubo al menos una auditoría por una sesión distinta, y sus P0 son pendientes (P11).
13. Toda acción con consecuencia tiene candado con test en rojo y camino de vuelta; las
    automatizaciones pasaron por modo de ensayo (P12).
14. Los tests corren una vez por commit; la configuración está fuera del repositorio; la vuelta
    atrás se probó; ningún secreto vive en el repositorio ni en el chat sin rotar (P13).
15. Hay tres manuales con fecha y versión, armados desde los pendientes cerrados; una persona que
    no programa siguió el de recuperación; el dueño hizo las pruebas de aceptación sobre todos los
    flujos (P14).
16. Hay una retrospectiva con números y una propuesta de cambio a la escalera (P15).

Si las dieciséis dan "sí", el sistema está listo para implementar. Si alguna da "no", ya sabés qué
peldaño volver a subir.

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

Los prompts son los mismos en cualquier herramienta. Lo que cambia es dónde van las rutinas que en
el curso se agregan a `docs/WORKING_AGREEMENT.md`:

- En **Claude Code**, las rutinas van en el `CLAUDE.md` del proyecto (o se incluye el contrato
  desde ahí), y se leen solas en cada sesión.
- En **Cursor**, van en `.cursor/rules/`, como reglas siempre activas.
- En **Codex CLI** o **Gemini CLI**, en `AGENTS.md` o `GEMINI.md` en la raíz.
- En **Forge**, el contrato y las rutinas son doctrinas, los prompts de peldaño se inyectan solos
  al cruzar cada compuerta, el registro de pendientes es nativo y el árbol semántico es el grafo
  de conocimiento del proyecto. El curso con Forge es el mismo curso con menos copiar y pegar.

La prueba de lectura de la lección 2 vale para todas: si una sesión nueva no sabe qué NO hace el
sistema, la herramienta no está cargando el archivo donde pusiste el contrato.

## Anexo C — Lo que este manual todavía no tiene

- Una cohorte que lo haya cursado. Los tiempos del calendario, los errores típicos y el proyecto
  guía están escritos desde mis tres sistemas, no desde alumnos. La primera cohorte los va a
  corregir (y eso es, literalmente, el peldaño 15 aplicado al curso).
- Los pesos de los criterios de elegibilidad (lección 0), que estoy calibrando.
- Un ejemplo completo de `docs/PENDING.md` del proyecto guía, con los veintiocho pendientes
  especificados y cerrados, para que un alumno vea cómo se ve la documentación de lo hecho al
  final de un proyecto.
