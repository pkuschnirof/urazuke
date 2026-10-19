# Urazuke — el curso, parte 2: el proyecto heredado. Normalizar un sistema que no nació con el método, y después evolucionarlo

Autor: Pablo Kuschniroff, asistido por Claude Code. Versión 1, 18 de octubre de 2026. Esta es la
segunda parte del [manual del curso](MANUAL_CURSO.md): da por hecho que hiciste la primera, o al
menos que leíste las lecciones 0 a 8, porque acá no vuelvo a explicar qué es un pendiente, un test
en rojo o un árbol semántico. El método de esta parte está en la página del
[camino evolutivo-correctivo](EVOLUTIVO_CORRECTIVO.md); acá está la práctica, con un segundo
proyecto guía. Las palabras raras, en el glosario del documento principal; los casos reales, en
las [referencias](REFERENCIAS.md). Repositorio público:
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## Antes de empezar

### Para quién es esta parte

Para el que hizo la primera parte y descubrió que, en la vida real, casi nunca le dan una carpeta
vacía. Le dan un sistema que ya corre, con usuarios que dependen de él, y le piden "arreglá esto"
o "agregale aquello". Y también para el que "vibecodeó" algo hace unos meses, funcionó, y ahora
tiene que seguir construyendo sobre eso sin que se le caiga. Los dos están en el mismo lugar: con
un legado, aunque uno de los dos lo haya escrito.

### Qué vas a tener al final

El mismo sistema que heredaste, haciendo lo mismo que hacía, pero con todo lo que el método da por
supuesto alrededor: un contrato de convivencia con las reglas del legado, el mapa recuperado del
sistema con las marcas de dónde salió cada afirmación, la lista de discrepancias entre lo que el
código hace y lo que el negocio cree, una auditoría convertida en backlog con marcas de velocidad,
un entorno de prueba con datos anonimizados, un despliegue que se repite, los secretos fuera del
código y rotados, una batería de caracterización que vigila los flujos críticos, candados sobre lo
que ya actúa sobre el mundo, el dimensionamiento con números medidos, y un backlog donde la deuda y
el pedido del cliente conviven, emparejados por módulo. Y después, el primer bug corregido con su
test en rojo y la primera funcionalidad nueva construida con el método completo.

### El orden de esta parte

| Etapa | Lecciones | Qué hacés además |
|---|---|---|
| 1 | N0, N1, N2, N3 | **Lectura.** Nada se cambia. Recorrés el árbol recuperado con el dueño, decidís las discrepancias una por una, leés la auditoría. Al cierre: el mapa y el inventario de deuda. |
| 2 | N4, N5 | **El cinturón.** Entorno de prueba con datos anonimizados, despliegue dos veces, secretos rotados, batería de caracterización con su rojo por mutación. Candados confirmados sobre lo que ya actúa. Al cierre: el sistema corre en prueba y la batería está en verde. |
| 3 | N6, N7, R1 | **Medir, ordenar, corregir.** Dimensionamiento medido. El backlog con las dos marcas. El primer bloque: el bug conocido, cerrado en modo correctivo con sus emparejados. |
| 4 | R2 | **Evolucionar.** El segundo bloque: la funcionalidad nueva, construida con el método completo (lecciones 5 a 12 de la primera parte), con la caracterización como regresión. |
| 5 y 6 | 13, 14, 15, 20, 16, 17, 18, 19 de la primera parte | **Salida a producción.** Auditoría periódica, candados restantes, cierre del camino a producción, los tres manuales (que el legado no tenía), y los cuatro peldaños de calidad operativa previos al despliegue: observabilidad completa, persistencia con lo que N6 midió, escaneo de vulnerabilidades como compuerta, prueba de carga con el punto de ruptura. |
| 7 | 23, 21, 22 de la primera parte | **Operación.** Los dos monitoreos montados con el despliegue, con la primera lectura como línea base del legado; agente residente; retrospectiva con la pregunta propia del legado: cuánto costó normalizar. |

### El proyecto guía: "Turnera heredada"

Es el mismo consultorio de la primera parte, dos años después y en otra línea de tiempo: nunca
hicieron Turnera con el método. En vez de eso, el sobrino de la encargada les hizo en un verano
una aplicación web, "Turnos", que funciona desde entonces. Hoy tiene dos recepcionistas y tres
profesionales usándola todos los días, unos veinte mil turnos cargados, y nadie que la entienda
entera: el sobrino se fue a vivir afuera y contesta un mensaje cada dos semanas.

**Lo que hay.** Un repositorio en GitHub con el código (una sola rama, commits con mensajes como
"arreglos"), una base de datos en el mismo servidor donde corre la aplicación, el despliegue a
mano copiando archivos por FTP, la contraseña de la base escrita en el código, ningún test, un
proceso programado en el servidor que manda los recordatorios todas las noches, y una planilla
que la encargada baja todos los meses conectándose a la base con una herramienta de escritorio.
Hay una copia de respaldo "automática" que nadie restauró nunca.

**Lo que duele.** Dos cosas. La primera, un bug: a veces un paciente recibe el recordatorio dos
veces, y a veces ninguna; la encargada no sabe cuándo pasa, pero tiene capturas de pacientes
quejándose. La segunda, lo que falta: quieren pedir una seña por link de pago para ciertos turnos,
y quieren ver cuántos turnos, ausencias y cancelaciones hubo en el mes sin bajar la planilla.

**El dueño.** La misma encargada: criterio sobre el negocio, quince minutos por día, no lee
código. Y una novedad que importa: ella cree que el sistema hace cosas que no hace, y no sabe de
cosas que el sistema sí hace. Eso es normal en un legado, y es lo que la lección N2 va a sacar a
la luz.

**Los flujos críticos**, en sus palabras: "cargo un turno", "cancelo un turno", "le llega el
recordatorio", "busco a un paciente", "bajo la planilla del mes". Son cinco; serán la batería de
caracterización.

Con esto alcanza. Todo lo demás está en el sistema, y es el agente el que lo va a leer.

---

## Tramo de normalización: lecciones N0 a N7

Estas ocho lecciones son el tramo que la primera parte no tenía. Las cuatro primeras son de
lectura: no se cambia nada, y la tentación de cambiar algo va a ser enorme. Las dos siguientes
arman el cinturón. Las dos últimas miden y ordenan. Recién después se toca funcionalidad.

### Lección N0 — Elegibilidad de un sistema existente: prerrequisitos que el agente verifica haciendo

**Qué tenés que entender.** En la lección 0 los criterios los respondía el relevamiento. Acá hay
un sistema, y entonces los criterios se pueden **verificar haciendo**, por el agente, sin que
nadie opine: ¿puede montar un ambiente completo con fuentes, datos y persistencia? ¿Puede entender
el código? ¿Puede escribir, solo a partir del código, un documento que describa toda la
funcionalidad y que la encargada reconozca como su sistema? ¿Puede operar las pantallas con una
herramienta de prueba y correr un test de punta a punta? ¿Se construye con herramientas de hoy?
¿Se pueden copiar y anonimizar los datos, y hay un respaldo que se restauró? ¿Las integraciones
tienen modo de prueba? Son siete prerrequisitos, y la regla nueva es que un rojo no es un "no
va": es un **proyecto previo**, con su propio alcance, para que el sistema se vuelva elegible.

**Antes de enviar el prompt**, con tus manos:

- `docs/INITIAL_SURVEY.md`, corto: qué hace Turnos y para quién según la encargada, qué duele
  (el recordatorio doble, lo que falta), quién lo hizo y cuánto tarda en contestar, dónde corre,
  quién tiene acceso, y que hay un respaldo "automático" que nadie restauró. Media página.
- `docs/ELIGIBILITY_CRITERIA.md`: la ficha de la lección 0 más los siete prerrequisitos del legado
  (copialos de la página del camino evolutivo-correctivo, estación N0), con tres columnas vacías:
  verde o rojo, evidencia, proyecto previo.
- Acceso de lectura al repositorio, una copia de la base (o producción en solo lectura) y un lugar
  donde el agente pueda intentar levantar el sistema (tu máquina alcanza para el curso), con las
  credenciales fuera del chat.

1. Pegale el prompt inicial de la estación N0 (en la página del camino evolutivo-correctivo), tal
   cual.
2. Va a tardar: tiene que montar el ambiente, leer todo, escribir `docs/FUNCTIONALITY_RECOVERED.md`
   y correr un test. Cuando termine, leé ese documento con la encargada: ¿describe el sistema que
   ella cree tener? Lo que no coincida, anotalo: es la primera lista de discrepancias.
3. Mirá la ficha: cada prerrequisito tiene que tener evidencia de algo que el agente hizo, no una
   respuesta tuya.

**Antes de enviar el prompt** de cierre: tu decisión en una línea y, para cada rojo, si el
proyecto previo se encara ahora, después, o nunca.

4. Pegale el prompt de cierre de la estación N0.

**Verificación de completitud.** ¿Cada prerrequisito tiene evidencia hecha, no dicha? ¿Existe el
documento de funcionalidad recuperada y la encargada lo reconoció? ¿Corrió un test de punta a
punta real? ¿Cada rojo tiene su proyecto previo como pendiente bloqueante?

**Entregable.** `docs/ELIGIBILITY.md`, `docs/FUNCTIONALITY_RECOVERED.md`, y los pendientes
bloqueantes de los proyectos previos, si los hay.

**Errores típicos.** Aceptar un verde que el agente contestó sin hacer ("sí, el código es
entendible"). Y tratar un rojo como rechazo: el método pide un proyecto previo, no una renuncia.

**En el proyecto guía.** El agente monta Turnos en tu máquina con una copia de la base (verde),
entiende el código salvo un módulo de reportes escrito en un lenguaje de plantillas viejo (verde,
con nota), escribe el documento de funcionalidad y la encargada descubre ahí dos cosas que no
sabía que el sistema hacía (verde: el documento es mejor que su memoria), opera cuatro de seis
pantallas y corre un test del flujo de carga (rojo: dos pantallas no operables, proyecto previo:
"hacer operables el calendario y la búsqueda"), construye con las herramientas de hoy salvo una
dependencia muerta del generador de PDF (rojo: proyecto previo chico), copia y anonimiza los datos
(verde) pero el respaldo nunca se restauró (rojo: restaurarlo es el proyecto previo más barato de
todos), y el proveedor de mensajes tiene modo de prueba (verde). Decisión: va, después de tres
proyectos previos chicos.

### Lección N1 — El contrato de convivencia para un legado

**Qué tenés que entender.** A las seis reglas de la lección 1 se agregan cinco que existen porque
un modelo frente a código ajeno hace tres cosas por reflejo: lo reordena, lo "arregla" donde le
parece mal, y supone que lo que el código hace distinto de lo que él esperaría es un error. Las
reglas del legado bloquean esos reflejos: no se refactoriza lo no pedido, se lee antes de tocar, lo
raro se anota en vez de arreglarse, el comportamiento actual es la especificación hasta que el
dueño diga otra cosa, y nada entra sin la caracterización en verde.

**Antes de enviar el prompt**, con tus manos:

- Tus preferencias de trabajo, como en la lección 1, y una decisión más: cuánto riesgo aceptás
  mientras se normaliza. Para el curso: el agente puede desplegar al entorno de prueba solo; a
  producción, nunca, hasta la lección 15.
- `docs/ELIGIBILITY.md` cerrado.

1. Pegale:

> Before we touch anything, we are going to set the working agreement between you and me for a
> system that already exists and has users. Write `docs/WORKING_AGREEMENT.md` with the six rules
> of the method (my time is sacred; zero technical debt; exact scope; documentation in the same
> commit; never report as done what you have not verified; speak my language), each with one line
> explaining what it prevents, and these five rules for an inherited system: (7) Nothing is
> refactored that was not asked for, and no module is rewritten. (8) Code you do not understand
> is read before it is touched, and what you learn goes into the system map. (9) Anything strange
> you find (a secret in the code, a dead path, a duplicated rule, a query without an index) is
> logged as a pending item with its evidence, never fixed in passing. (10) Current behaviour is
> the specification until the owner says otherwise: a difference between what the code does and
> what the business says is a discrepancy for me to decide, not a bug for you to fix silently.
> (11) No change reaches the test environment without the characterization suite green. Add any
> rules you think this system needs, marked as proposals. If you need to know something about how
> I work in order to write this, ask me.

> [es]
> Antes de tocar nada, vamos a fijar el contrato de convivencia entre vos y yo para un sistema que
> ya existe y tiene usuarios. Escribí `docs/WORKING_AGREEMENT.md` con las seis reglas del método
> (mi tiempo es sagrado; cero deuda técnica; alcance exacto; documentación en el mismo commit;
> nunca reportar como hecho lo no verificado; hablá mi idioma), cada una con una línea que explique
> qué evita, y estas cinco reglas para un sistema heredado: (7) No se refactoriza nada que no se
> haya pedido, y no se reescribe ningún módulo. (8) El código que no entendés se lee antes de
> tocarse, y lo que aprendés va al mapa del sistema. (9) Cualquier cosa rara que encuentres (un
> secreto en el código, un camino muerto, una regla duplicada, una consulta sin índice) se anota
> como pendiente con su evidencia, nunca se arregla de paso. (10) El comportamiento actual es la
> especificación hasta que el dueño diga otra cosa: una diferencia entre lo que el código hace y lo
> que el negocio dice es una discrepancia que decido yo, no un bug que vos arreglás en silencio.
> (11) Ningún cambio llega al entorno de prueba sin la batería de caracterización en verde. Agregá
> las reglas que creas que este sistema necesita, marcadas como propuestas. Si necesitás saber algo
> sobre cómo trabajo para escribir esto, preguntame.

2. Leé las propuestas. Si una dice "modernizar el código a medida que se toca", rechazala con
   razón: es la reescritura disfrazada.

**Antes de enviar el prompt** de cierre: tu veredicto sobre cada propuesta, con razón de una
línea, para los huecos del prompt.

3. Cerrá con el prompt de cierre de la lección 1, sin cambios.

**Verificación de completitud.** ¿Están las once reglas, cada una con el fallo que evita? ¿Hay
alguna propuesta que habilite refactorizar o reescribir?

**Entregable.** `docs/WORKING_AGREEMENT.md` con fecha y versión.

**Errores típicos.** Aceptar una regla de "limpieza progresiva" porque suena razonable. Suena
razonable y es la forma en que el agente se autoriza a cambiar lo que no se le pidió.

**En el proyecto guía.** El agente propone dos reglas propias que vale aceptar: "en este sistema
ningún envío real sale del entorno de prueba: los recordatorios en prueba van a una bandeja
falsa", y "la planilla mensual que baja la encargada es un consumidor del sistema y cuenta como
contrato". La segunda es el mapa productor-consumidor asomando antes de tiempo, y está bien.

### Lección N2 — La lectura del sistema: el mapa recuperado y las discrepancias

**Qué tenés que entender.** Es la lección que más valor da por hora de todo el curso. En la
lección 2 el archivo de proyecto y el árbol salían del relevamiento; acá salen del sistema mismo,
y cada afirmación lleva una marca de dónde salió: `[código]`, `[base]`, `[configuración]`,
`[documentación]`, `[negocio]` o `[inferido]`. Las marcas son lo que te permite verificar sin leer
código: mirás lo inferido y lo confirmás o lo corregís. Y aparece un documento nuevo, la lista de
discrepancias: todo lo que no coincide entre lo que el código hace, lo que la base impone y lo
que el negocio cree. No se resuelven solas: cada una es una decisión tuya con fecha. Un legado
siempre tiene discrepancias; si la lista sale vacía, el agente no comparó.

**Antes de enviar el prompt**, con tus manos y con el dueño:

- Acceso de lectura para el agente a todo: el repositorio entero, el esquema de la base (solo
  lectura, credencial fuera del chat), la configuración del servidor con los valores de los
  secretos tapados, los logs recientes, y lo que haya de documentación (en Turnos, un correo del
  sobrino con "cómo subir cambios").
- En `docs/INITIAL_SURVEY.md`, una sección nueva escrita con la encargada: **lo que ella cree que
  el sistema hace**, caso de uso por caso de uso, y las reglas que recuerda ("un turno no se
  puede cancelar con menos de dos horas", "el recordatorio sale a las ocho de la noche"). No lo
  verifiques contra el sistema: esa comparación es el trabajo del agente.
- La lista de lo que vive fuera del repositorio: el proceso programado de los recordatorios y la
  planilla mensual que se conecta a la base.
- `docs/WORKING_AGREEMENT.md` cerrado.

1. Pegale:

> We are going to recover the map of this system from what exists. Read the whole repository
> (every branch), the database schema (read-only), the configuration of each environment, the
> recent logs and whatever documentation there is; if some part cannot be read from where you are,
> tell me and mark it as a gap; do not fill it by guessing. Then write three things. First,
> complete `docs/INITIAL_SURVEY.md` in the form the method expects (what the system does and for
> whom; what it does NOT do; who uses it; the technology; the environments; what an error costs),
> with every statement tagged by its source: [code], [database], [configuration], [documentation],
> [business] for what the survey already says, or [inferred]. Second, `PROJECT.md`, three hundred
> lines at most, and `docs/SEMANTIC_TREE.md`: the domains and, under each one, the actors, the
> processes (each with trigger, steps, outcome and exceptions as the code actually implements
> them), the entities with the attributes, states and transitions the database and the code
> enforce, the screens, the external integrations and the scheduled jobs; every node tagged the
> same way. Third, `docs/DISCREPANCIES.md`: everything where the code, the database, the
> documentation and what the business says in the survey do not agree, with the evidence on each
> side. Do not resolve any discrepancy and do not fix anything: list them. Create `docs/STATUS.md`
> for the living state. Reply in my language.

> [es]
> Vamos a recuperar el mapa de este sistema a partir de lo que existe. Leé el repositorio entero
> (todas las ramas), el esquema de la base de datos (solo lectura), la configuración de cada
> entorno, los logs recientes y la documentación que haya; si alguna parte no se puede leer desde
> donde estás, decímelo y marcala como hueco; no lo rellenes adivinando. Después escribí tres
> cosas. Primero, completá `docs/INITIAL_SURVEY.md` en la forma que el método espera (qué hace el
> sistema y para quién; qué NO hace; quién lo usa; la tecnología; los entornos; qué cuesta un
> error), con cada afirmación marcada por su fuente: [código], [base], [configuración],
> [documentación], [negocio] para lo que el relevamiento ya dice, o [inferido]. Segundo,
> `PROJECT.md`, de trescientas líneas como máximo, y `docs/SEMANTIC_TREE.md`: los dominios y, bajo
> cada uno, los actores, los procesos (cada uno con disparador, pasos, resultado y excepciones tal
> como el código los implementa de verdad), las entidades con los atributos, estados y transiciones
> que la base y el código imponen, las pantallas, las integraciones externas y los procesos
> programados; cada nodo marcado de la misma forma. Tercero, `docs/DISCREPANCIES.md`: todo aquello
> en lo que el código, la base, la documentación y lo que el negocio dice en el relevamiento no
> coinciden, con la evidencia de cada lado. No resuelvas ninguna discrepancia y no arregles nada:
> listalas. Creá `docs/STATUS.md` para el estado vivo. Respondé en mi idioma.

   Le estás pidiendo que lea todo y declare lo que no pudo leer, el relevamiento y el árbol con
   marcas, los procesos como el código los implementa (no como deberían ser), los procesos
   programados, y las discrepancias listadas sin resolver.

2. Recorré el árbol con la encargada, nodo por nodo. Cada `[inferido]` se confirma o se corrige.
   Cada `[código]` se compara con lo que ella cree: donde no coincide, hay una discrepancia que a
   lo mejor el agente ya listó, y si no la listó, la agregás vos.
3. Decidí cada discrepancia con ella, en una línea, con la fecha. Hay tres respuestas posibles:
   "el sistema está bien, el negocio se había olvidado" (se confirma como regla), "el sistema
   está mal, hay que cambiarlo" (se abre un pendiente), o "no sé, lo vemos después" (queda abierta
   con fecha; no demasiadas).

**Antes de enviar el prompt** de cierre: la lista de nodos confirmados y corregidos, y la lista de
discrepancias con tu decisión y la fecha, una línea cada una.

4. Cerrá con:

> I confirm these nodes: [list]. Correct these: [list]. The discrepancies are decided as follows:
> [one line each: discrepancy, my decision, today's date]. Finalize `docs/INITIAL_SURVEY.md`,
> `PROJECT.md` and `docs/SEMANTIC_TREE.md` with today's date, keeping the source tags. Write each
> discrepancy decision in `docs/DECISIONS.md` with my exact words, and open a pending item in
> `docs/PENDING.md` for every discrepancy where I decided the system must change; for the ones
> where I decided the current behaviour stays, write it next to the node as a confirmed rule. Add
> to `PROJECT.md` the instruction to read this file, the tree and the working agreement at the
> start of every session.

> [es]
> Confirmo estos nodos: [lista]. Corregí estos: [lista]. Las discrepancias se deciden así: [una
> línea cada una: discrepancia, mi decisión, la fecha de hoy]. Cerrá `docs/INITIAL_SURVEY.md`,
> `PROJECT.md` y `docs/SEMANTIC_TREE.md` con la fecha de hoy, conservando las marcas de fuente.
> Escribí cada decisión sobre una discrepancia en `docs/DECISIONS.md` con mis palabras exactas, y
> abrí un pendiente en `docs/PENDING.md` por cada discrepancia en la que decidí que el sistema
> tiene que cambiar; en las que decidí que el comportamiento actual se queda, escribilo junto al
> nodo como regla confirmada. Agregá a `PROJECT.md` la instrucción de leer este archivo, el árbol y
> el contrato de convivencia al empezar cada sesión.

5. **La prueba de lectura**, como en la lección 2: sesión nueva, sin contexto, "¿qué NO hace este
   sistema? ¿qué proceso corre solo de noche?". Tiene que contestar con el mapa.

**Verificación de completitud.** ¿Hay nodos marcados `[inferido]`? (Si no hay ninguno, el agente
no distingue lo que leyó de lo que supuso.) ¿Hay al menos un proceso programado en el árbol? ¿La
lista de discrepancias tiene más de cero? ¿Cada una tiene decisión con fecha o quedó abierta a
propósito? ¿Las marcas sobrevivieron al cierre? ¿Pasó la prueba de lectura?

**Entregable.** `docs/INITIAL_SURVEY.md` completo con marcas, `PROJECT.md`,
`docs/SEMANTIC_TREE.md`, `docs/DISCREPANCIES.md` decidido, `docs/DECISIONS.md` con las decisiones,
`docs/STATUS.md`.

**Errores típicos.** Resolver las discrepancias "arreglando el código para que haga lo que la
encargada dice", sin decidirlas una por una: varias de esas discrepancias son reglas que el
negocio olvidó y el código recordaba. Y dejar que el agente borre las marcas al cerrar "para que
quede más limpio": un árbol sin marcas ya no se puede verificar.

**En el proyecto guía.** El árbol de Turnos tiene el dominio Agenda que la encargada esperaba, y
dos cosas que no: un estado de turno "reprogramado" que existe en la base y que ninguna pantalla
muestra `[base]`, y un proceso programado que, además de mandar recordatorios, borra los turnos
cancelados de más de un año `[código]`; la encargada no sabía que se borraban. Las discrepancias
típicas son ocho: la regla de las dos horas para cancelar no existe en el código (se cancela
siempre); el recordatorio sale a las ocho según ella y a las siete según la configuración; el
teléfono del paciente no es obligatorio en la base aunque ella cree que sí; y así. La del borrado
es la que más la sorprende, y la decide en un minuto: "eso no se borra más". Pendiente.

### Lección N3 — La auditoría como inventario de la deuda

**Qué tenés que entender.** La lección 13, pero al principio, en vez de al final, y con un campo
más por hallazgo: si bloquea (hay que arreglarlo antes de cualquier cambio), si se paga al tocar
el módulo, o si puede esperar. Sin ese campo, un legado auditado tiene cuarenta hallazgos y nadie
sabe por cuál empezar. Qué bloquea lo decidís vos, no el auditor: en general, un secreto expuesto,
una pantalla que no se puede operar, un despliegue que no se puede repetir, la falta de respaldo,
y lo que pueda dañar datos o cobrar de más.

**Antes de enviar el prompt**, con tus manos:

- Una sesión nueva del agente, con un clon limpio y un archivo de instrucciones que diga "sos un
  auditor; no leíste ni vas a tocar este sistema". Acceso de solo lectura a la base y al servidor.
- `PROJECT.md`, `docs/SEMANTIC_TREE.md` y `docs/DISCREPANCIES.md` de N2, para que no redescubra lo
  escrito.
- Tu criterio de qué bloquea, en dos líneas, para el hueco del prompt. Para Turnos: secreto
  expuesto, pantalla no operable, despliegue no repetible, sin respaldo probado, cualquier cosa que
  borre o mande sin control.

1. Pegale:

> Audit this system for integrity, security, performance, code quality and deployability, as the
> inventory of what must be normalized before and during its evolution. Read-only: change nothing
> except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires access you
> lack (the database, the logs, the server), tell me and mark that part as not audited; do not
> pass it as fine. Go through all of the code, not a sample, and read `docs/SEMANTIC_TREE.md` and
> `docs/DISCREPANCIES.md` first so that you do not report what is already known. For every
> finding: where it is (file and line), the risk, the evidence that proves it (the command, the
> query, the number), its priority (P0 must be fixed now, P1 soon, P2 when possible), and one more
> field: whether it BLOCKS (must be fixed before any change, by my criteria: [an exposed secret, a
> screen that cannot be driven by a program, a deployment that cannot be repeated, no tested
> backup, anything that deletes or sends without control]), whether it is PAID WHEN TOUCHED (fixed
> together with the first change that enters its module), or whether it CAN WAIT. Grade every
> dimension you audited. End with every finding turned into a proposed pending item, blocking
> ones first. Reply in my language.

> [es]
> Auditá este sistema en integridad, seguridad, rendimiento, calidad de código y desplegabilidad,
> como inventario de lo que hay que normalizar antes y durante su evolución. Solo lectura: no
> cambies nada salvo escribir tu informe en `docs/AUDIT_[fecha].md`. Si auditar alguna parte
> requiere un acceso que no tenés (la base, los logs, el servidor), decímelo y marcá esa parte como
> no auditada; no la des por buena. Recorré todo el código, no una muestra, y leé antes
> `docs/SEMANTIC_TREE.md` y `docs/DISCREPANCIES.md` para no reportar lo que ya se sabe. Para cada
> hallazgo: dónde está (archivo y línea), el riesgo, la evidencia que lo prueba (el comando, la
> consulta, el número), su prioridad (P0 hay que arreglarlo ya, P1 pronto, P2 cuando se pueda), y
> un campo más: si BLOQUEA (hay que arreglarlo antes de cualquier cambio, según mi criterio: [un
> secreto expuesto, una pantalla que no se puede operar por programa, un despliegue que no se puede
> repetir, sin respaldo probado, cualquier cosa que borre o mande sin control]), si SE PAGA AL
> TOCAR (se arregla junto con el primer cambio que entre a su módulo), o si PUEDE ESPERAR. Poné una
> nota a cada dimensión que auditaste. Terminá con cada hallazgo convertido en pendiente propuesto,
> los bloqueantes primero. Respondé en mi idioma.

2. Leé el informe. Elegí dos hallazgos y pedile la evidencia. Revisá las marcas de velocidad: vos
   podés subir o bajar cualquiera, con razón.

**Antes de enviar el prompt** de cierre: el informe leído, los dos hallazgos verificados, y la
sesión del constructor abierta (el cierre va al constructor, no al auditor).

3. Volvé a la sesión del constructor y pegale el prompt de cierre de la lección 13, agregándole
   al final: "Each pending item keeps the speed mark of its finding."

**Verificación de completitud.** ¿Dice qué no pudo auditar? ¿Hay al menos un "bloquea"? ¿Cada
hallazgo tiene archivo, línea y evidencia? ¿Los bloqueantes ya son pendientes?

**Entregable.** `docs/AUDIT_[fecha].md` con marcas de velocidad, y los pendientes bloqueantes
abiertos.

**Errores típicos.** Todo en "puede esperar", por un auditor que no quiere molestar. O todo en
"bloquea", por un dueño asustado: entonces nada se puede empezar nunca. Entre tres y ocho
bloqueantes es lo normal en un sistema chico.

**En el proyecto guía.** La auditoría de Turnos encuentra, como bloqueantes: la contraseña de la
base en el código (y en el historial de git, así que hay que rotarla, no solo moverla); el
despliegue por FTP sin registro de qué versión corre; el proceso programado que borra turnos sin
candado; las dos pantallas no operables. Como "se paga al tocar": la búsqueda de pacientes sin
índice (módulo de pacientes), la consulta de la agenda del día que hace una consulta por turno
(módulo de agenda), el envío de recordatorios sin idempotencia (módulo de mensajes; es la pista
del bug). Como "puede esperar": una dependencia vieja sin vulnerabilidad conocida, y el código
duplicado del formato de fecha en tres lugares.

### Lección N4 — El cinturón de seguridad

**Qué tenés que entender.** Es la compuerta dura de este camino: hasta que el cinturón no esté en
verde, no se cambia una línea de funcionalidad. El cinturón tiene cinco piezas: un entorno de
prueba con datos anonimizados, un despliegue que se repite, los secretos fuera del código y
rotados, la integración continua corriendo lo que haya, y la batería de caracterización. Esta
última es la lección 8 al revés: el test nace en verde, porque captura lo que el sistema hace hoy,
defectos incluidos, y la prueba de que sirve es que se pone en rojo cuando rompés el flujo a
propósito. Sin ese rojo por mutación, es un test que pasa porque no mira nada.

**Antes de enviar el prompt**, con tus manos y con el dueño:

- `docs/ENVIRONMENTS_SURVEY.md`, que el agente redactó en N2 con marcas y vos completás: dónde va
  a correr el entorno de prueba (para el curso, un servicio gratuito o un contenedor en tu
  máquina alcanza), cómo se despliega hoy, dónde van a vivir los secretos en el servidor.
- La decisión de anonimización con la encargada: nombres, teléfonos, correos y documentos de los
  pacientes se reemplazan por valores falsos; las fechas y las cantidades se conservan. Es una
  obligación legal, no un detalle técnico.
- La lista de flujos críticos para la caracterización: los cinco de la encargada.
- El respaldo restaurado en tu máquina (la condición de N0). Si no lo hiciste, hacelo ahora: el
  agente va a copiar la base de producción y necesitás saber que hay vuelta atrás.
- Acceso del agente al servidor en solo lectura y al lugar del entorno de prueba con escritura,
  credenciales fuera del chat.

1. Pegale:

> We are going to build the safety belt around this system before changing anything in it. Read
> the environments survey, `docs/AUDIT_[date].md` and `docs/SEMANTIC_TREE.md`. Evaluate whether you
> have what is needed (read access to the server where it runs and to its database, write access
> to where the test environment will run, the way it is deployed today); if anything is missing,
> ask me before starting. Then set up, without touching any functionality: (1) a test environment
> that runs the system exactly as production does, with a copy of the data where the personal
> fields I listed are anonymized; (2) a reproducible deployment to that environment, run twice,
> showing me that the second run changed nothing; (3) every secret found in the repository or in
> the code moved to the server configuration (environment file or vault), with the list of what
> you moved so that I rotate each one; (4) continuous integration running whatever test suite
> exists today, even if it is a single smoke test, on every push; (5) `docs/GATES.md` with the
> gates of this project, including: nothing reaches the test environment without the
> characterization suite green, and nothing reaches production without the full suite green with
> the exact version. Document all of it in `docs/DEPLOYMENT.md` so that a person can do it by hand
> without you. Take a screenshot of the system running in the test environment and show it to me.
> Reply in my language.

> [es]
> Vamos a construir el cinturón de seguridad alrededor de este sistema antes de cambiarle nada.
> Leé el relevamiento de entornos, `docs/AUDIT_[fecha].md` y `docs/SEMANTIC_TREE.md`. Evaluá si
> tenés lo necesario (acceso de lectura al servidor donde corre y a su base, acceso de escritura a
> donde va a correr el entorno de prueba, la forma en que se despliega hoy); si falta algo,
> pedímelo antes de empezar. Después armá, sin tocar ninguna funcionalidad: (1) un entorno de prueba
> que corra el sistema exactamente como producción, con una copia de los datos donde los campos
> personales que te listé estén anonimizados; (2) un despliegue reproducible a ese entorno, corrido
> dos veces, mostrándome que la segunda corrida no cambió nada; (3) todo secreto encontrado en el
> repositorio o en el código movido a la configuración del servidor (archivo de entorno o bóveda),
> con la lista de lo que moviste para que yo rote cada uno; (4) la integración continua corriendo
> la batería que exista hoy, aunque sea un solo test de humo, en cada push; (5) `docs/GATES.md` con
> las compuertas de este proyecto, incluidas: nada llega al entorno de prueba sin la batería de
> caracterización en verde, y nada llega a producción sin la batería completa en verde con la
> versión exacta. Documentá todo en `docs/DEPLOYMENT.md` de modo que una persona lo pueda hacer a
> mano sin vos. Sacá una captura del sistema corriendo en el entorno de prueba y mostrámela.
> Respondé en mi idioma.

2. Es una tarea larga, con idas y vueltas. Cuando te muestre la captura, abrí vos la URL: tiene
   que verse Turnos con datos. Buscá a un paciente real por nombre: no tiene que estar.
3. Rotá cada secreto de la lista que te dio. Vos, en el panel que corresponda, hoy.

**Antes de enviar el prompt** de la batería: el entorno de prueba abierto por vos, los secretos
rotados, y la lista de los cinco flujos críticos para el hueco del prompt.

4. Pegale:

> We are going to write the characterization tests of these critical flows: [load an
> appointment; cancel an appointment; the reminder reaches the patient; search a patient; download
> the monthly sheet]. A characterization test captures what the system does today, exactly as it
> does it, defects included; it is not a test of what the system should do. For each flow: drive
> it from the screen as a user would and check the effect in the backend (the row, the state, the
> message queued). Every test must pass against the current code. Then prove that each test
> actually watches its flow: break the flow deliberately with a temporary change, show me the red
> output, revert the change, show me the green. If a flow cannot be driven from the screen, do not
> simulate it: say so and open a pending item marked as blocking. If while writing these tests you
> find behaviour that looks wrong, do not fix it: add it to `docs/DISCREPANCIES.md` with the
> evidence. Record the command to run the suite in `docs/STATUS.md`, and make the suite the gate
> for the test environment as `docs/GATES.md` says. Reply in my language.

> [es]
> Vamos a escribir los tests de caracterización de estos flujos críticos: [cargar un turno;
> cancelar un turno; el recordatorio le llega al paciente; buscar un paciente; bajar la planilla
> del mes]. Un test de caracterización captura lo que el sistema hace hoy, exactamente como lo
> hace, defectos incluidos; no es un test de lo que el sistema debería hacer. Para cada flujo:
> operalo desde la pantalla como lo haría un usuario y verificá el efecto en el backend (la fila,
> el estado, el mensaje encolado). Todos los tests tienen que pasar contra el código actual.
> Después demostrá que cada test de verdad vigila su flujo: rompé el flujo a propósito con un
> cambio temporal, mostrame la salida en rojo, revertí el cambio, mostrame el verde. Si un flujo no
> se puede operar desde la pantalla, no lo simules: decilo y abrí un pendiente marcado como
> bloqueante. Si mientras escribís estos tests encontrás un comportamiento que parece incorrecto,
> no lo arregles: agregalo a `docs/DISCREPANCIES.md` con la evidencia. Registrá el comando para
> correr la batería en `docs/STATUS.md`, y hacé que la batería sea la compuerta del entorno de
> prueba como dice `docs/GATES.md`. Respondé en mi idioma.

   Le estás pidiendo el test que nace en verde y demuestra que sirve poniéndose en rojo por
   mutación; nada de simular lo que no se puede operar; y lo que parece mal, anotado como
   discrepancia, no arreglado.

5. Las dos pantallas no operables (el pendiente bloqueante de N0) se resuelven acá, antes de la
   batería o como parte de ella: pedile que cierre ese pendiente con la rutina de la lección 8,
   y que después escriba los tests de caracterización de esos flujos.
6. Corré vos la batería con el comando de `docs/STATUS.md`. Tiene que estar en verde.

**Verificación de completitud.** ¿Abriste el entorno de prueba y no encontraste un nombre real?
¿El despliegue corrió dos veces y la segunda no cambió nada? ¿La búsqueda de secretos en el
repositorio vino vacía, y rotaste los que encontró? ¿Cada uno de los cinco flujos tiene su test y
su rojo por mutación a la vista? ¿Corriste vos la batería?

**Entregable.** El entorno de prueba corriendo con datos anonimizados, `docs/DEPLOYMENT.md`,
`docs/GATES.md`, los secretos rotados, la integración continua en verde, y la batería de
caracterización en verde con sus cinco rojos demostrados.

**Errores típicos.** Dejar la batería "para después" y empezar a arreglar el bug: el
cinturón a medias es la causa número uno de romper lo que andaba. Datos de prueba "de ejemplo" en
vez de la copia anonimizada: los bugs de un legado viven en los datos reales (el recordatorio
doble de Turnos solo aparece con ciertos pacientes). Y mover el secreto sin rotarlo: estaba en el
historial de git; ya no es un secreto.

**En el proyecto guía.** El test de caracterización del recordatorio es el más interesante:
captura que el proceso nocturno manda un mensaje por turno del día siguiente a la bandeja falsa, y
pasa. Mientras lo escribe, el agente nota que si el proceso se corre dos veces manda dos veces, y
lo anota como discrepancia con la evidencia. Es la pista del bug, y todavía no se arregla: el
comportamiento actual es la especificación hasta la lección R1. El rojo por mutación: el agente
comenta la línea que encola el mensaje, el test falla, la descomenta, pasa.

### Lección N5 — Candados y mapa productor-consumidor desde el código

**Qué tenés que entender.** Las lecciones 14 y 11, hechas por inventario sobre lo que ya existe,
antes de cambiar nada. El agente va a encontrar en el código más de lo que el negocio recuerda
que el sistema hace hacia afuera: envíos, borrados, procesos nocturnos. La comparación entre las
dos listas es el resultado. Y cada candado lleva una propuesta de "ahora" o "al tocar": un candado
sobre algo que manda mensajes va ahora; uno sobre una exportación mensual puede esperar al bloque
que toque ese módulo.

**Antes de enviar el prompt**, con tus manos y con el dueño:

- En `docs/INITIAL_SURVEY.md`, la lista de lo que la encargada **sabe** que el sistema hace hacia
  afuera: manda recordatorios, y nada más, según ella.
- Acceso del agente a las tareas programadas del servidor.
- La lista de lo que vive fuera del repositorio (la planilla mensual), para el mapa.
- El entorno de prueba de N4 corriendo.

1. Pegale:

> Go through the code, the database triggers and the scheduled jobs of the server looking for
> everything that charges, sends, approves, deletes, notifies outwards or runs on a schedule, and
> write `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` with every statement tagged by its source. Compare
> it with the list the business wrote in `docs/INITIAL_SURVEY.md`: whatever the code does that the
> business did not list, or the other way round, ask me about before going on. For every action:
> what triggers it, whether it can run twice, whether it is reversible, what lock exists today if
> any, and what the way back is. In the same pass, build `docs/PRODUCER_CONSUMER_MAP.md`: for every
> contract in the system (a service, a table, a file format, a list of values), who produces it
> and who consumes it, including the things outside the repository I told you about. If there are
> parts you cannot see, say so instead of leaving them out. Present me the actions table with a
> proposed lock for each (explicit confirmation, double safety, dry-run mode, daily limit, a human
> in the loop) and a proposal of which locks go NOW, before any change, and which can go when the
> module is touched. Do not implement anything yet: I confirm lock by lock. Reply in my language.

> [es]
> Recorré el código, los disparadores de la base y las tareas programadas del servidor buscando
> todo lo que cobra, envía, aprueba, borra, avisa hacia afuera o corre solo con un horario, y
> escribí `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` con cada afirmación marcada por su fuente.
> Comparalo con la lista que el negocio escribió en `docs/INITIAL_SURVEY.md`: lo que el código hace
> y el negocio no listó, o al revés, preguntámelo antes de seguir. Para cada acción: qué la
> dispara, si puede correr dos veces, si es reversible, qué candado tiene hoy si tiene alguno, y
> cuál es el camino de vuelta. En la misma pasada, construí `docs/PRODUCER_CONSUMER_MAP.md`: para
> cada contrato del sistema (un servicio, una tabla, un formato de archivo, una lista de valores),
> quién lo produce y quién lo consume, incluidas las cosas fuera del repositorio que te conté. Si
> hay partes que no podés ver, decilo en vez de dejarlas afuera. Presentame la tabla de acciones
> con un candado propuesto para cada una (confirmación explícita, doble seguro, modo de ensayo,
> límite diario, un humano en el circuito) y una propuesta de qué candados van AHORA, antes de
> cualquier cambio, y cuáles pueden ir cuando se toque el módulo. No implementes nada todavía: yo
> confirmo candado por candado. Respondé en mi idioma.

2. Confirmá candado por candado con la encargada, y la marca "ahora" o "al tocar" de cada uno.

**Antes de enviar el prompt** de cierre: la tabla con tu veredicto por fila, y la lista de los
candados "ahora" para el hueco del prompt.

3. Cerrá con el prompt de cierre de la lección 14, listando solo los candados "ahora"; los demás
   quedan en el backlog con su marca.

**Verificación de completitud.** ¿La lista del agente tiene más acciones que la de la encargada?
(Si tiene las mismas, no miró las tareas programadas.) ¿Cada candado "ahora" tiene su test en
rojo contra la versión sin candado? ¿La planilla mensual está en el mapa como consumidor?

**Entregable.** `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`, `docs/PRODUCER_CONSUMER_MAP.md`,
`docs/LOCKS.md` con los candados "ahora" implementados y probados.

**Errores típicos.** Implementar todos los candados ahora "ya que estamos": es la regla de las dos
velocidades violada, y es tiempo que no se dedica al bug que el cliente pidió.

**En el proyecto guía.** El agente encuentra tres acciones que la encargada no listó: el borrado
nocturno de turnos cancelados viejos, un correo que el sistema manda al profesional cuando se
cancela un turno (ella no sabía), y la exportación que alimenta la planilla. Candados "ahora": el
borrado nocturno pasa a modo de ensayo (registra lo que habría borrado) hasta que ella decida, y
el envío de recordatorios recibe un límite diario. "Al tocar": idempotencia del envío (módulo de
mensajes, entra con el bug), confirmación en la cancelación (módulo de agenda). El mapa tiene seis
contratos, y la planilla mensual es consumidor de la tabla de turnos: si alguien le cambia una
columna, la planilla se rompe en silencio.

### Lección N6 — Dimensionar con números reales

**Qué tenés que entender.** La lección 3 con una ventaja: los datos primarios están en la base y
en los logs. No se preguntan, se miden, con un medidor con test (lección 7). La encargada aporta
solo lo que no está en ningún lado: cuánto esperan crecer, y si el sistema se va a vender a otros
consultorios.

**Antes de enviar el prompt**, con tus manos:

- Acceso de solo lectura a la base de producción, o la copia completa de N4 (la anonimización no
  tocó fechas ni cantidades), y a los logs de acceso.
- Las dos respuestas del negocio: crecimiento esperado ("igual que ahora, a lo mejor un
  profesional más") y el "por diez" ("si funciona, mi hermana tiene otro consultorio").
- Un caso conocido para el test del medidor: la cantidad de profesionales, que son tres.

1. Pegale:

> Before changing anything we are going to size this system with its real numbers. With read-only
> access to the production database (or the complete test copy) and to the logs, measure instead
> of asking: rows per table and growth per month from the timestamps, events per entity, peak
> concurrency from the access logs, data size today and projected at five years, and the slowest
> queries. Write a meter for each number (a script that lives in the repository, with a test
> against a known case I will give you) and show me every number together with the command that
> produces it; audit each meter in both directions (is everything that should be counted, counted?
> does everything counted exist?). Write `docs/VOLUME_SURVEY.md` with every figure tagged
> [database] or [log], and ask me only for what cannot be measured: the growth the business
> expects and whether the system will serve more than one site. Then write `docs/SIZING.md`: what
> breaks first if everything is multiplied by ten, which of the current architecture choices hold
> and which do not, and which asymmetric decisions we take now, before evolving, because they are
> cheap today and expensive later. Do not change any code. Reply in my language.

> [es]
> Antes de cambiar nada vamos a dimensionar este sistema con sus números reales. Con acceso de
> solo lectura a la base de producción (o a la copia completa de prueba) y a los logs, medí en vez
> de preguntar: filas por tabla y crecimiento por mes a partir de las fechas, eventos por entidad,
> concurrencia en el pico a partir de los logs de acceso, tamaño de los datos hoy y proyectado a
> cinco años, y las consultas más lentas. Escribí un medidor por cada número (un script que vive
> en el repositorio, con un test contra un caso conocido que te voy a dar) y mostrame cada número
> junto con el comando que lo produce; auditá cada medidor en las dos direcciones (¿está contado
> todo lo que debería contarse? ¿existe todo lo contado?). Escribí `docs/VOLUME_SURVEY.md` con cada
> cifra marcada [base] o [log], y pedime solo lo que no se puede medir: el crecimiento que el
> negocio espera y si el sistema va a servir a más de un lugar. Después escribí `docs/SIZING.md`:
> qué se rompe primero si todo se multiplica por diez, cuáles de las decisiones de arquitectura
> actuales aguantan y cuáles no, y qué decisiones asimétricas tomamos ahora, antes de evolucionar,
> porque hoy son baratas y después caras. No cambies ningún código. Respondé en mi idioma.

2. Corré vos un medidor (el de filas por tabla, por ejemplo). Tiene que darte lo mismo. Rehacé
   una cuenta a mano.

**Antes de enviar el prompt** de cierre: la cuenta rehecha que coincide, y tu decisión sobre lo
que no aguanta el "por diez", si hay algo.

3. Cerrá con el prompt de cierre de la lección 3, eligiendo entre las opciones que haya propuesto
   o confirmando que lo actual aguanta.

**Verificación de completitud.** ¿Hay algún número primario sin medidor? ¿Corriste uno vos? ¿Está
escrito el "por diez"?

**Entregable.** `docs/VOLUME_SURVEY.md` con marcas, los medidores con test, `docs/SIZING.md`.

**Errores típicos.** Aceptar "la base es muy grande para contarla, estimo unos cien mil". Una
base grande se cuenta con una consulta; eso es un medidor.

**En el proyecto guía.** Veinte mil turnos en dos años, mil por mes y creciendo despacio; sesenta
mil mensajes; dos usuarias en el pico; la base ocupa poco; la consulta más lenta es la búsqueda
de pacientes por nombre (sin índice, ya lo decía la auditoría). El "por diez" aguanta en todo
salvo en esa búsqueda y en el envío nocturno, que tarda proporcional a los turnos. Decisión
asimétrica: la interfaz de envío de mensajes pasa a tener una cola, aunque hoy no haga falta,
porque la seña (lección R2) va a usar el mismo canal.

### Lección N7 — El backlog de normalización, emparejado con el pedido del cliente

**Qué tenés que entender.** La lección 5 con dos columnas más. Una sola cola donde conviven la
deuda (auditoría, discrepancias, pantallas, candados pendientes, decisiones del dimensionamiento)
y el pedido del cliente (lo que falla, lo que falta), cada pendiente con su marca de velocidad y
su tipo, y cada pendiente del cliente con la lista de los de normalización que tocan el mismo
módulo y conviene pagar junto con él. Eso es la regla "se paga al tocar" hecha operativa.

**Antes de enviar el prompt**, con tus manos y con el dueño:

- El pedido del cliente para esta etapa, en `docs/blocks/STAGE_01_REQUEST.md`, en dos listas con
  las palabras de la encargada. Lo que falla: "a veces el recordatorio llega dos veces, y a veces
  no llega; tengo capturas de tres pacientes de la semana pasada". Lo que falta: "quiero pedir
  seña por link de pago en los turnos de primera vez", "quiero ver los números del mes sin bajar
  la planilla".
- Todos los artefactos de N2 a N6 cerrados. Si falta alguno, no abras este prompt.
- Los pendientes bloqueantes de N0, N3 y N4 cerrados.

1. Pegale:

> We are going to turn the normalization and the client's request for this stage into one queue
> of numbered pending items in `docs/PENDING.md`, each with its full specification as the method
> asks (number, title, node of the semantic tree, origin, description, business rules with
> decision and date or marked as missing, data in and out, screens, edge cases, acceptance
> criteria as given, when, then, how it will be verified, status). Sources for the normalization
> items: `docs/AUDIT_[date].md`, the discrepancies I decided to change, the screens that cannot be
> driven by a program, the secrets to rotate, the locks that are not implemented yet, and the
> decisions in `docs/SIZING.md`; each one keeps its speed mark: BLOCKS, PAID WHEN TOUCHED, or CAN
> WAIT. Sources for the client's items: the client's request for this stage; each one marked
> CORRECTIVE (something that fails today, with the way to reproduce it in the client's words) or
> EVOLUTIVE (something new). For every client item, list the normalization items that touch the
> same modules and should be paid together with it. If the request is ambiguous on any point such
> that you cannot write a verifiable item, ask me; do not resolve it by assuming. Order: blocking
> items first, then the client's items in the priority I gave you, each with its paired
> normalization. Reply in my language.

> [es]
> Vamos a convertir la normalización y el pedido del cliente para esta etapa en una sola cola de
> pendientes numerados en `docs/PENDING.md`, cada uno con su especificación completa como pide el
> método (número, título, nodo del árbol semántico, origen, descripción, reglas de negocio con
> decisión y fecha o marcadas como faltantes, datos que entran y salen, pantallas, casos borde,
> criterios de aceptación en la forma dado, cuando, entonces, cómo se verifica, estado). Fuentes de
> los pendientes de normalización: `docs/AUDIT_[fecha].md`, las discrepancias en las que decidí
> cambiar, las pantallas que no se pueden operar por programa, los secretos a rotar, los candados
> que todavía no están implementados, y las decisiones de `docs/SIZING.md`; cada uno conserva su
> marca de velocidad: BLOQUEA, SE PAGA AL TOCAR, o PUEDE ESPERAR. Fuentes de los pendientes del
> cliente: el pedido del cliente para esta etapa; cada uno marcado CORRECTIVO (algo que hoy falla,
> con la forma de reproducirlo en palabras del cliente) o EVOLUTIVO (algo nuevo). Para cada
> pendiente del cliente, listá los pendientes de normalización que tocan los mismos módulos y
> conviene pagar junto con él. Si el pedido es ambiguo en algún punto de modo que no puedas escribir
> un pendiente verificable, preguntame; no lo resuelvas suponiendo. Orden: primero los que
> bloquean, después los del cliente en la prioridad que te di, cada uno con su normalización
> emparejada. Respondé en mi idioma.

2. Leé la especificación de cada pendiente del cliente como si fueras la encargada, igual que en
   la lección 5. Y revisá los emparejamientos: ¿tiene sentido pagar esa deuda con ese pedido?
3. Agregá al contrato la rutina de cada sesión de la lección 5, sin cambios.

**Verificación de completitud.** ¿Queda algún "bloquea" abierto? ¿Cada correctivo dice cómo se
reproduce con las palabras del cliente? ¿Cada pendiente del cliente tiene sus emparejados?

**Entregable.** `docs/PENDING.md` con todo, y la rutina en el contrato.

**Errores típicos.** Un backlog con cincuenta pendientes en "puede esperar": es la reescritura
disfrazada de lista. Archivá lo que no se va a pagar y decilo. Y abrir el primer bloque con un
bloqueante abierto "porque es chico".

**En el proyecto guía.** El backlog de Turnos queda con tres pendientes del cliente: el
recordatorio doble (correctivo, módulo de mensajes, emparejado con la idempotencia del envío y la
cola de mensajes del dimensionamiento), la seña (evolutivo, módulo nuevo de pagos, emparejado con
la confirmación en la cancelación porque toca la misma pantalla), y el reporte mensual (evolutivo,
módulo de reportes, emparejado con el índice de pacientes y con el contrato de la planilla, que se
reemplaza). Y unos doce de normalización, de los cuales tres "pueden esperar" y se dice.

---

## El bucle sobre el legado: lecciones R1 y R2

### Lección R1 — El primer bloque: el bug, en modo correctivo

**Qué tenés que entender.** Un pendiente correctivo es un bug conocido. En la lección 8 el rojo se
fabricaba; acá el rojo es el bug mismo: el test que reproduce la falla, operando el flujo como el
usuario que la reportó, tiene que fallar contra el código actual. Si no falla, reprodujiste otro
bug. Ese rojo es la prueba de que arreglás lo correcto, y vale más que cualquier explicación del
agente sobre lo que "debe estar pasando" [Ref. 22](REFERENCIAS.md#ref-22). Y la causa raíz se
dice en prosa antes de tocar, porque a veces la causa raíz es una regla de negocio que nadie
escribió, y eso lo decidís vos.

**Antes de enviar el prompt**, con tus manos:

- El pendiente correctivo en `docs/PENDING.md` con la reproducción en palabras de la encargada,
  y un caso concreto: las tres capturas de la semana pasada, con el nombre (falso, en prueba) de
  los pacientes y la fecha. Sin un caso, no hay test.
- La batería de caracterización en verde, con el comando en `docs/STATUS.md`.
- Los emparejados de este pendiente, listados en él.
- La encargada avisada de que hoy le vas a hacer una pregunta de negocio.

1. Abrí el bloque con la rutina de cada sesión: el agente anuncia qué pendiente toma y relee la
   especificación.
2. Pegale:

> This pending item is a correction: [some patients receive the reminder twice and some receive
> none; three cases from last week are attached in the item]. Before changing anything: (1)
> Reproduce the failure with a test that drives the flow from the screen and checks the effect in
> the backend, and show me that it fails against the current code; that red is the proof that you
> reproduced the right defect. If you cannot reproduce it, tell me what you tried and what you
> need; do not fix what you cannot see. (2) Find the root cause and tell me in prose, with the
> evidence, before fixing. If the root cause is a business rule nobody wrote down, stop and ask me.
> (3) Fix at the root, not where it hurts, and nothing else: anything else you find goes to a
> pending item. (4) Show me the test green, the characterization suite still green, and the
> regression of the neighbouring items. (5) If the fix changes a current behaviour that someone
> may depend on, say so explicitly: that is a decision for me, not a side effect. Close the paired
> normalization items of this module in the same block, each with its own evidence. The commit
> message says "proved red against [version]" and the test counts. Reply in my language.

> [es]
> Este pendiente es una corrección: [algunos pacientes reciben el recordatorio dos veces y otros
> ninguno; en el pendiente están los tres casos de la semana pasada]. Antes de cambiar nada: (1)
> Reproducí la falla con un test que opere el flujo desde la pantalla y verifique el efecto en el
> backend, y mostrame que falla contra el código actual; ese rojo es la prueba de que reprodujiste
> el defecto correcto. Si no podés reproducirlo, decime qué probaste y qué necesitás; no arregles
> lo que no podés ver. (2) Encontrá la causa raíz y decímela en prosa, con la evidencia, antes de
> arreglar. Si la causa raíz es una regla de negocio que nadie escribió, frená y preguntame. (3)
> Arreglá en la raíz, no donde duele, y nada más: cualquier otra cosa que encuentres va a un
> pendiente. (4) Mostrame el test en verde, la batería de caracterización todavía en verde, y la
> regresión de los pendientes vecinos. (5) Si el arreglo cambia un comportamiento actual del que
> alguien puede depender, decilo explícitamente: eso es una decisión mía, no un efecto secundario.
> Cerrá los pendientes de normalización emparejados de este módulo en el mismo bloque, cada uno con
> su propia evidencia. El mensaje del commit dice "probado en rojo contra [versión]" y los números
> de los tests. Respondé en mi idioma.

   Le estás pidiendo la reproducción antes del diagnóstico, la causa raíz en prosa antes de tocar,
   la raíz y nada más, la caracterización como regresión del sistema entero, y que un cambio de
   comportamiento sea una decisión tuya.

3. Leé la causa raíz antes de autorizar el arreglo. Si te pregunta una regla de negocio, decidila
   con la encargada y contestá con el formato de cierre de la lección 6.
4. Al cierre: corré vos la batería de caracterización. Y usá el sistema en el entorno de prueba
   un rato, como la recepcionista: la vista humana no se delega.

**Verificación de completitud.** ¿Viste el rojo del test que reproduce el bug, con números? ¿La
causa raíz estaba escrita en prosa antes del arreglo? ¿La caracterización sigue en verde? ¿Los
emparejados se cerraron con su propia evidencia? ¿El commit dice "probado en rojo"?

**Entregable.** El bug cerrado con la rutina completa, los emparejados cerrados, y la batería de
caracterización ampliada con el test del bug.

**Errores típicos.** Autorizar el arreglo sin leer la causa raíz: en Turnos, la primera hipótesis
del agente suele ser "el proceso corre dos veces" y es la mitad de la verdad. Y dejar que "ya que
está" ordene el módulo de mensajes: regla 7.

**En el proyecto guía.** El test reproduce el doble envío con un turno que fue reprogramado: el
proceso nocturno manda un recordatorio por cada fila de turno del día siguiente, y un turno
reprogramado tiene dos filas (la vieja, en estado "reprogramado", que ninguna pantalla muestra, y
la nueva). Los que no reciben ninguno son los que se reprogramaron para después del envío. Causa
raíz: el estado "reprogramado" que apareció en la lección N2. La pregunta de negocio: "¿un turno
reprogramado es un turno nuevo o el mismo turno?". La encargada decide: el mismo turno, con
historial. El arreglo en la raíz toca el estado, no el envío; la idempotencia emparejada se paga en
el mismo bloque; el rojo dice "2 mensajes para 1 turno" y el verde "1 mensaje para 1 turno". Y el
cambio de comportamiento se declara: los turnos reprogramados dejan de aparecer dos veces en la
planilla mensual, que es consumidor de la tabla; la encargada lo aprueba.

### Lección R2 — El segundo bloque: la seña, en modo evolutivo

**Qué tenés que entender.** Lo nuevo sobre lo viejo se construye con el método completo, tal cual
las lecciones 5 a 12 de la primera parte: especificación en el pendiente, decisiones con fecha,
test en rojo, prueba de punta a punta, reporte honesto. Dos diferencias. La regresión de los
vecinos es el sistema entero, y la batería de caracterización es la que lo dice. Y cuando el
bloque entra a un módulo, los pendientes de normalización marcados "se paga al tocar" de ese
módulo entran con él, con su propia evidencia. No se le hace al módulo nuevo lo que el legado le
hizo al viejo.

**Antes de enviar el prompt**, con tus manos:

- El pendiente evolutivo de la seña en `docs/PENDING.md`, con su especificación completa leída
  por vos, sus emparejados, y las decisiones de negocio que la encargada ya pueda tomar: qué
  turnos llevan seña, cuánto, qué pasa si no se paga.
- El relevamiento de acciones con consecuencia (N5) con la fila "cobrar seña" agregada, porque
  es una acción nueva que actúa sobre el mundo: candado antes de construir, como en la lección
  14.
- La batería de caracterización en verde.

1. Abrí el bloque con el prompt de apertura de la lección 5, sobre el pedido de la seña, y leé la
   especificación como la encargada.
2. Antes de construir, el candado: pegale el prompt de cierre de la lección 14 para la acción
   "cobrar seña", con modo de ensayo primero.
3. Construí con la rutina de la lección 8, pendiente por pendiente, con los emparejados en el
   mismo bloque.
4. Al cierre del bloque: la batería completa de punta a punta (la de caracterización más los
   tests nuevos), con el prompt de cierre de bloque de la lección 8, y un rato tuyo usando el
   sistema.

**Verificación de completitud.** ¿La seña tiene candado con test en rojo antes de que exista el
cobro? ¿La caracterización sigue en verde después del bloque? ¿Los emparejados del módulo se
pagaron? ¿Hay algo del módulo viejo que se "mejoró" sin pendiente?

**Entregable.** La seña funcionando en el entorno de prueba, en modo de ensayo, con su
especificación, su candado, sus tests y su prueba de punta a punta; los emparejados cerrados.

**Errores típicos.** Construir la seña "rápido, como está hecho el resto" para que encaje: el
módulo nuevo nace con el método completo, siempre. Y olvidar el candado porque "es un link de
pago, no cobramos nosotros": el link se manda a un paciente; eso es una acción hacia afuera.

**En el proyecto guía.** La seña usa el mismo canal que los recordatorios, que ahora tiene cola
(la decisión asimétrica de N6 pagando sola). Candado: confirmación explícita de la recepcionista y
monto fijado por el profesional; modo de ensayo durante un tiempo registrando "habría pedido
seña a". El emparejado de la pantalla de cancelación (la confirmación) se paga en este bloque
porque la seña cambia qué pasa al cancelar. Al cierre, la batería corre siete flujos: los cinco de
caracterización, el del bug de R1 y el de la seña.

---

## Después: salida a producción y operación

Desde acá, el legado es un sistema con método, y las lecciones 13 a 22 de la primera parte se
aplican tal cual, con cuatro notas. La primera es sobre los seis peldaños de calidad operativa:
la observabilidad mínima y el escaneo de vulnerabilidades ya entraron con el cinturón, las
mediciones de persistencia ya están en N6, y la prueba de carga se corre con esos volúmenes antes
del primer despliegue; los dos monitoreos arrancan con la primera lectura como línea base, y lo
que ya estaba mal el primer día se vuelve pendiente con su marca. Las otras tres notas son estas. La auditoría de la lección 13 compara contra la de N3: cuánta
deuda se pagó, cuánta sigue. Los manuales de la lección 20 en un legado suelen no existir, y se
generan a partir del sistema como está y de los pendientes cerrados, que ahora sí documentan lo
hecho. Y la retrospectiva de la lección 23 tiene una pregunta propia de este camino: cuánto costó
normalizar (en horas, en tokens, en etapas antes del primer cambio), y qué de la deuda marcada
"puede esperar" terminó costando igual. Esa respuesta es la que va a corregir el calendario de
esta parte en la próxima versión.

## Lista de salida del tramo de normalización

Las ocho condiciones que el dueño verifica sin leer código, antes de abrir el primer bloque. Son
las mismas de la página del camino evolutivo-correctivo; las repito acá porque son el entregable
de esta parte.

1. Existen todos los insumos de las etapas previas (relevamiento, elegibilidad, contrato, archivo
   de proyecto, árbol, entornos, volumetría, dimensionamiento, compuertas), con marcas de fuente,
   y el dueño confirmó cada nodo inferido (N2).
2. Cada discrepancia tiene decisión con fecha, y las que cambian el sistema tienen pendiente (N2).
3. La auditoría existe y cada hallazgo tiene marca de velocidad (N3).
4. El cinturón está en verde: entorno de prueba con datos anonimizados, despliegue corrido dos
   veces, secretos afuera y rotados, integración continua, batería de caracterización con el rojo
   por mutación demostrado (N4).
5. Toda acción con consecuencia tiene veredicto, y los candados "ahora" tienen su test en rojo
   (N5).
6. Los números primarios están medidos con medidor y test, y el "por diez" está escrito (N6).
7. No queda ningún "bloquea" abierto, y cada pendiente del cliente tiene sus emparejados (N7).
8. El contrato tiene las cinco reglas del legado, y una sesión nueva pasa la prueba de lectura
   (N1, N2).

## Anexo — Lo que esta parte todavía no tiene

- Una cohorte que la haya cursado sobre un legado real. Turnos heredada está construida a partir
  de lo que vi en sistemas ajenos en modo diagnóstico, no de un alumno.
- Un repositorio de ejemplo de "Turnos" tal como lo dejó el sobrino, para que el alumno que no
  tiene un legado propio tenga uno que normalizar. Es el pendiente más importante de esta parte.
- El criterio de tamaño de la batería de caracterización para sistemas grandes, y cómo se reparte
  la normalización por módulo cuando el sistema tiene decenas.
