# Urazuke — Referencias: los casos detrás del método

Autor: Pablo Kuschniroff, asistido por Claude Code. Versión 4, 18 de octubre de 2026.

Este documento existe para una cosa: que los procedimientos y los manuales del método queden
limpios. Cuando en el documento principal, en un contrato de peldaño o en una lección del curso
afirmo algo del estilo "esto lo aprendí a los golpes" o "esto lo impuse porque el modelo lo
aplicaba mal", no quiero ensuciar la explicación con fechas, identificadores de commit y números
de pendiente. Pongo una marca corta, `[Ref. N]`, y quien tenga ganas de investigar el caso viene
acá y lo encuentra con su fecha, su evidencia y mi lectura de lo que pasó. Quien no tenga ganas,
sigue leyendo sin tropezar.

Dos aclaraciones antes de empezar. La primera: los tres sistemas de los que salen estos casos son
reales y hoy están en producción, con gente de verdad usándolos. Los clientes están anonimizados,
y los llamo "la Obra Social" (con su "Autorizador") y "la Asociación"; a sus sistemas los llamo
"Autorizaciones" y "Kikan". El tercer repositorio es la herramienta donde nació el método,
yujin-forge, que es mía y lleva su nombre. Los números, las fechas y los identificadores de commit
son reales; si algún día tengo el permiso de los clientes, pondré los nombres.

La segunda aclaración es más importante, y la repito en el documento principal porque no quiero
que se malinterprete: **el método no salió solamente de la casuística de fallos**. Salió de dos
cosas que se combinaron. Por un lado, de mi propio conocimiento de la ingeniería de sistemas, que
vengo aplicando desde mucho antes de que existieran estos modelos; la mayor parte de lo que pido
en los peldaños es lo que siempre pedí en un proyecto bien llevado. Por el otro lado, de que los
incidentes de estos cinco meses me mostraron, uno tras otro, **dónde los modelos aplican esos
principios de manera frágil**: dónde dicen que probaron y no probaron, dónde estiman con cara de
seguro, dónde llenan un hueco de reglas de negocio con una ocurrencia, dónde reportan de más. Los
casos que siguen son, entonces, la prueba de dónde hace falta apretar, no el origen de todo el
método. Léanlos con esa lente.

---

## Cómo citar

En cualquier documento del método, `[Ref. 26]` enlaza a la entrada "Ref. 26" de este archivo.
Las entradas están agrupadas por sistema de origen y, dentro de cada grupo, en orden cronológico.
Al final hay tres cronologías completas, por si alguien quiere ver la secuencia entera, y una
tabla que mapea cada fallo al peldaño que lo cubre.

---

## A. yujin-forge: donde se formó el método (mayo a octubre de 2026)

### Ref. 1 — Nacen los estándares de calidad (25 de mayo)

Escribí el primer documento de estándares de calidad, `SQ.md`, el 25 de mayo (commit
`2219f7a`). Es el primer "contrato de convivencia" entre el humano y el agente, y lo escribí
porque llevaba dos semanas repitiéndole al modelo las mismas cosas en cada sesión: que mi tiempo
es sagrado y no se gasta en lo que puede resolver solo; que no se deja deuda técnica, lo que se
rompe se arregla de raíz; que la documentación se mantiene al día; que el alcance es exacto, ni
más ni menos de lo pedido. Nada de eso es nuevo en ingeniería de sistemas. Lo nuevo fue tener que
escribirlo para un colaborador que cada mañana llega sin memoria de ayer. Es el origen del
peldaño 1.

### Ref. 2 — El primer registro de anti-patrones (27 de mayo)

El 27 de mayo (commit `73f4029`) abrí `GOTCHAS.md`: un archivo donde cada error que se repitió
queda anotado con un formato fijo, cómo huele, cuál es la causa raíz, cómo se arregló, y cómo
detectarlo la próxima vez antes de que duela. Lo abrí porque el modelo cometía el mismo error en
sesiones distintas sin ninguna memoria de haberlo cometido antes. Es la mitad "anti-patrones" del
peldaño 11.

### Ref. 3 — Las compuertas del flujo, inyectadas solo cuando corresponden (2 de junio)

El 2 de junio (commit `5b47475`) definí compuertas explícitas en el flujo de trabajo, numeradas
G1 a G9, y una compuerta de documentación, G-DOC, que exige que la documentación se actualice en
el mismo commit que el cambio. Y tomé una decisión que resultó importante: la doctrina de cada
compuerta entra al prompt del agente solo en el momento en que aplica, no siempre, porque el
contexto es finito y lo que se inyecta de más se paga en atención. Es el antecedente directo de la
idea de "contrato de peldaño" que se inyecta al cruzar la compuerta.

### Ref. 4 — La política de testing se reformula (4 de junio)

Hasta el 4 de junio insistía con "primero el test, después el código" para todo. Ese día (commit
`a9f59c7`, documento `testing-policy.md`) acepté que no sirve universalmente: por defecto los
tests van después de implementar, el test-primero queda como opción para alcances chicos y bien
definidos, el esqueleto tiene que estar en verde como compuerta, y agregué una protección contra
bucles, un modal que frena todo cuando el agente da vueltas sin avanzar. Lo cuento porque muestra
que el método también se corrige a sí mismo cuando una regla mía resulta demasiado rígida.

### Ref. 5 — Las decisiones se congelan antes de construir (4 de junio)

Antes de un sprint grande escribí y numeré tres decisiones estructurales (D1, D2, D3) en un
documento de decisiones del 4 de junio. Fue la primera vez que formalicé algo que siempre hice en
proyectos clásicos: la decisión se escribe antes de construir, con fecha, para que después nadie
la discuta de memoria. Es el antecedente del peldaño 6.

### Ref. 6 — Elimino el equipo multiagente con un número en la mano (5 de junio)

Tenía un equipo de cinco agentes (director, analista, programador, tester, armador de esqueletos)
que se pasaban trabajo entre sí. Hice un experimento medido: ese equipo gastó 60 dólares y 73
minutos y entregó algo a medias; una sola sesión con un solo agente tardó 90 minutos y entregó
algo publicable. El 5 de junio (commit `7584f8b`, documentado en un paper interno) eliminé el
equipo entero. Es el primer caso de "retrospectiva con un número en la mano, y rediseño", y es
el motivo por el que el peldaño 23 exige números y no impresiones.

### Ref. 7 — El plan pasa a ser la lista de pendientes (6 de junio)

El 6 de junio (commit `4fc82c6`, plan del registro de pendientes) el plan de trabajo pasó a SER
la cola de pendientes: una lista canónica, numerada, con comandos para manejarla, que se refresca
en cada sesión. Dejó de haber "plan" por un lado y "tareas" por otro. Es el origen del peldaño 5.

### Ref. 8 — Honestidad de verificación y tipos de flujo (10 de junio)

El 10 de junio (commits `7ab9d8a` y `2c552c0`, documentos `verification-honesty.md` y
`workflow-kinds.md`) hice obligatoria la doctrina en cada prompt y escribí la regla de
"honestidad de verificación": verificar que la red realmente se pone en rojo cuando tiene que
ponerse, declarar los puntos ciegos, y hacer afirmaciones proporcionales a lo que se comprobó.
Separé además tres tipos de flujo: proyecto nuevo, corrección y evolución. Es el origen del
peldaño 12 y de la mitad "rojo" del peldaño 8.

### Ref. 9 — Trabajo descartado por no leer el mapa (12 de junio)

El 12 de junio una sesión arrancó a construir sin leer el grafo de conocimiento del proyecto, y
el trabajo de toda una tarde fue descartable porque contradecía decisiones que ya estaban
escritas. De ahí la regla de lectura obligatoria del peldaño 2: el mapa existe, pero si no se
obliga a leerlo, no actúa.

### Ref. 10 — Pilotos automáticos de 24 y 48 horas (14 al 21 de junio)

Entre el 14 y el 21 de junio dejé al agente trabajar solo durante un día, y después dos, con un
mandato escrito: commit y push por cada pieza, sin preguntar, y yo recibía un resumen. Lo cuento
porque prueba que el método aguanta autonomía larga cuando el contrato de convivencia y el
registro de pendientes están bien hechos; y porque fue ahí donde aprendí a leer resúmenes con
desconfianza, que es el peldaño 12.

### Ref. 11 — Modo diagnóstico sobre sistemas ajenos (julio)

En julio (documento `diagnostic-mode.md`) el agente empezó a entrar a sistemas productivos de
clientes en modo diagnóstico: solo lectura, acotado, sin tocar nada. Es el primer nivel del
alcance del agente residente del peldaño 23.

### Ref. 12 — Patrones de rendimiento tomados de la producción de la Obra Social (22 de julio)

El 22 de julio (commit `873339c`) incorporé a la herramienta patrones de escala extraídos del
sistema de la Obra Social: el de las dos transacciones y, sobre todo, "medir antes de tocar". Fue
la primera vez que el método se alimentó de un sistema que ya estaba en producción, y es un
antecedente del peldaño 7.

### Ref. 13 — El agente queda residente en la producción de la Obra Social (14 de agosto)

El 14 de agosto el agente quedó instalado dentro del sistema del cliente, como asistente
residente, con tres reglas: un mapa del sistema obligatorio antes de operar, "primero la solución
operativa" cuando algo falla, y la capacidad de abrir tickets. Es el origen de la primera mitad del
peldaño 23.

### Ref. 14 — El dimensionamiento como compuerta (10 y 11 de octubre)

El 10 y el 11 de octubre (commits `c602725` y `0bd1b05`, documento `sizing.md`) formalicé el
dimensionamiento antes de construir, eligiendo entre opciones fijas, y lo registré como una
compuerta más (G9). Lo formalicé tarde, después del golpe de Kikan que cuento en la referencia 15,
y esa es justamente la lección del peldaño 3.

### Ref. 15 — La interfaz de persistencia asincrónica desde la línea uno (13 de octubre)

El 13 de octubre (commit `7391cc5`, documento `persistence-interface.md`) escribí la regla de que
la interfaz con la base de datos es asincrónica desde la primera línea, aunque el primer motor sea
sincrónico. Es una decisión "asimétrica": cuesta poco si estás equivocado y cuesta muchísimo si no
la tomás. Lo sé porque en Kikan no la tomé a tiempo y cambiarla después costó una etapa entera de
la reingeniería, la E6, con tres baterías de tests pasadas a asincrónico. Es un caso del peldaño 3.

### Ref. 16 — El turno huérfano de una hora cuarenta y tres (14 de octubre)

El 14 de octubre el agente trabajó una hora y cuarenta y tres minutos invisible para mí, e hizo
seis commits en ese lapso. Fue un fallo del método, y feo. Lo arreglé de raíz en la versión 1.18.0
(commit `b80a659`): un vigía de silencio que mata el turno si deja de dar señales de vida, una
correa entre procesos para que el hijo muera con el padre, y 28 tests. Cae en el peldaño 12 (el
reporte tiene que ser visible) y en el 14 (ante la duda, el sistema no sigue).

---

## B. Autorizaciones: el método bajo carga real (junio a octubre de 2026)

### Ref. 17 — El diseño inicial que el repositorio superó (11 de junio)

Autorizaciones arrancó con un documento de diseño (la "opción C"). El repositorio lo superó
rapidísimo: lo construido fue mucho más que lo que decía el papel. La lección que me quedó, y que
está en el peldaño 5, es que la especificación vale como punto de partida y el plan vivo son los
pendientes.

### Ref. 18 — La primera auditoría de consultas sin índice (23 de junio)

El 23 de junio hice la primera auditoría de "full scans" (consultas que leen la tabla entera
porque no hay un índice) sobre un sistema vivo. Los hallazgos se convirtieron en pendientes, no en
un informe archivado. Es el origen del peldaño 13.

### Ref. 19 — Lecciones de la nube de Google (24 de junio)

Los errores de infraestructura de las primeras semanas en la nube de Google quedaron escritos como
lecciones para no repetirlos. Es la primera versión de lo que después fue el manual de
infraestructura del peldaño 20.

### Ref. 20 — El manual de usuario nace junto con el sistema (26 de junio)

El 26 de junio ya había manual de usuario, con el sistema a medio construir. Lo hice así a
propósito: en los proyectos clásicos el manual se escribía al final, cuando ya nadie se acordaba
de nada; con un modelo que lo regenera gratis, no hay excusa para que no nazca con el sistema.
Peldaño 20.

### Ref. 21 — Copia de respaldo de segunda capa (13 de julio)

Antes de confiar en el sistema con datos reales puse dos capas de backup: una local y otra en el
almacenamiento de Google. Peldaño 15 y manual de recuperación del 20.

### Ref. 22 — PND-300: cuatro rondas hasta la causa raíz (14 de julio)

Un bug volvió tres veces hasta que se encontró la causa real, el 14 de julio. Cada "arreglo"
anterior había sido sobre el síntoma. Acá "el arreglo es de raíz o no es arreglo", que ya estaba
en el contrato de convivencia, dejó de ser una frase y se volvió práctica: hay que medir la
hipótesis antes de tocar. Peldaños 1 y 7.

**La aritmética, dicha en voz alta, porque los dos números son el mismo caso contado desde dos
lados.** Hubo **cuatro rondas de arreglo** y **tres retornos** del bug: la ronda 1 lo "arregló" y
volvió (retorno 1), la 2 lo "arregló" y volvió (retorno 2), la 3 lo "arregló" y volvió (retorno 3),
y la 4 fue la que encontró la causa raíz. De ahí que el título de esta referencia diga cuatro
rondas, que este párrafo diga que volvió tres veces y que la tabla de fallos por peldaño cuente
tres arreglos que no eran de raíz: no es una contradicción, son n rondas y n−1 retornos. Queda
escrito acá porque sin esta línea las tres menciones se leen como tres cifras distintas del mismo
hecho, y el primer lector externo que reprodujo el caso escribió "volvió cuatro veces". Si una
referencia deja que alguien que la lee con cuidado saque otro número, el defecto es de la
referencia.

### Ref. 23 — Auditoría de seguridad (16 de julio)

El 16 de julio hice la primera auditoría de seguridad formal, con hallazgos convertidos en
pendientes. Fue la que me convenció de tratar la seguridad como una auditoría periódica y no como
una lista que se tilda una vez al principio. Peldaño 13.

### Ref. 24 — Manual interno y manual de recuperación ante desastres (26 y 29 de julio)

El 26 y el 29 de julio (commits `6444ce6`, pendiente 442, y `a30cee3`, pendiente 459) dejé
documentado todo lo operativo, desplegar, recuperar, mantener, de forma "reproducible a mano, sin
IA". El criterio que usé, y que está en el peldaño 20, es que si mañana no hay agente, una persona
de confianza que no programa pueda seguir el manual.

### Ref. 25 — El fail-closed como reflejo (27 de julio)

El 27 de julio (commit `e18406d`, pendiente 452): si una tabla no existe o una búsqueda falla, la
fila simplemente queda sin su botón; nunca se rompe el listado entero. Ante la duda, no actuar y
no romper. Y el test de esa corrección se probó en rojo "sin el try/except", es decir, se demostró
que sin la protección el listado se rompía. Peldaños 8 y 14.

### Ref. 26 — Los contadores que no coincidían: 1.355 contra 1.234 (6 y 7 de agosto)

Este es, para mí, el ejemplo más completo de "verificar con instrumento". Un contador de la
pantalla mostraba 1.355 aprobaciones y la consulta a la base mostraba 1.234. El 6 y el 7 de agosto
(commits `ab3e529`, pendiente 517, y `1f5feb9`, pendiente 514) se verificó la causa raíz
directamente sobre producción en solo lectura, se descompuso la diferencia número por número (145
de más, 24 de menos; 145 menos 24 son 121), se escribió un test que se probó EN ROJO contra el
criterio viejo, y el script de diagnóstico quedó en el repositorio para la próxima vez. Peldaños
8, 11 y 7.

### Ref. 27 — Simetría entre productor y consumidor (6 de agosto)

El 6 de agosto (commits `50fe968`, pendiente 510, y `7251129`, pendiente 509) impuse que la "causa
de espera" que ve el usuario se calcule con las MISMAS compuertas con las que el robot decide, y
que la lista de columnas de la grilla la defina el servidor y el frontend la consuma. Así no pueden
divergir. Es la regla "toda lista tiene un solo dueño" del peldaño 11.

### Ref. 28 — Botón de pánico con candado, modo de ensayo del aprobador, vigía con guardas (7 de agosto)

El 7 de agosto (commit `0954740`, pendiente 524) quedaron los candados del sistema: un botón de
pánico con doble seguro, el aprobador automático corriendo primero en modo de ensayo (hace todo
menos aprobar, y registra lo que habría aprobado), y un vigía que empuja lo trabado con guardas
para no empujar dos veces. Peldaño 14.

### Ref. 29 — Las reglas de dominio escritas en el commit (10 de agosto)

El 10 de agosto (commit `0ae3ae6`, pendiente 550) el mensaje del commit dice, textual: "regla
Pablo: aprobada + saldo = vuelve", "decisión Pablo 2026-08-10". La decisión de negocio quedó con
fecha y con dueño, pegada al código que la implementa. Peldaño 6.

---

## C. Kikan: el método maduro (agosto a octubre de 2026)

### Ref. 30 — Arranque con el método ya escrito, y la serie de auditorías AUD-* (21 al 29 de agosto)

Kikan fue el primer proyecto que arrancó con todo lo anterior ya escrito desde el día uno: un
archivo de proyecto operativo y pendientes como plan desde el primer commit (21 de agosto). El 28
y el 29 de agosto hice una serie de auditorías tempranas (AUD-1, AUD-2…) que se convirtió
directamente en 19 documentos de pendientes. Peldaños 2, 5 y 13.

### Ref. 31 — Integración continua desde la primera semana; despliegue como paquete (28 de agosto, 23 y 24 de septiembre)

Los tests corrieron en GitHub desde la primera semana (`ci.yml`, 28 de agosto). El despliegue
llegó el 23 de septiembre (`deploy.yml`, commit `bb801ed`): un paquete, con la configuración
viviendo en el servidor y no en el repositorio, y la versión del runtime clavada. Que el
despliegue llegara un mes después del arranque es el error que motiva el peldaño 4.

### Ref. 32 — El despliegue se endurece a golpe de pendientes (30 de septiembre al 4 de octubre)

Entre el 30 de septiembre y el 4 de octubre hubo cinco pendientes seguidos solo para que el
despliegue funcionara bien: la URL pública en los dos entornos (`f85c3c9`), recargar el servicio
antes de reiniciar y antes de volver atrás (`513c8d0`, pendiente 108), un fixture que reconcilia
en vez de duplicar (`076df76`, pendiente 134), el material del cliente fuera del árbol que se
espeja (`9d76af8`, pendiente 130), y la batería de tests que ya no ensucia la configuración que
viaja en el despliegue (`0bd20a8`, pendiente 107, 3 de octubre). Si el esqueleto se hubiera
desplegado vacío la primera semana, esos cinco golpes se habrían dado con cero funcionalidad en
juego. Peldaños 4 y 15.

### Ref. 33 — Promoción de UAT a producción (4 y 8 de octubre)

El 4 y el 8 de octubre (commits `4eb5ad7`, pendiente 027, y `7658e2e`) quedó un circuito
explícito para pasar configuración y campañas del entorno de prueba al de producción. Peldaño 15.

### Ref. 34 — El esquema derivado del código, con candado (11 de octubre)

En la etapa 1 de la reingeniería de la persistencia (commits `6113319` y `68819ce`) el inventario
de tablas y campos se derivó del código mismo, con un test que lo protege, y se abrió en el
tablero compartido para que yo lo revisara. Es una lista con un solo dueño, el código. Peldaño 11.

### Ref. 35 — El trinquete estático, y el medidor que no veía (11 al 13 de octubre)

En la etapa 6 de la reingeniería (commits `06b2734`, `f6e5221`, `2fc6239`, `1d55a93`) puse un
"trinquete": un contador de llamadas a la base sin `await`, es decir, sin esperar el resultado,
que solo puede bajar y nunca subir. Y pasó algo que vale la pena contar: se descubrió DOS veces que
el medidor no veía partes del código. Primero 70 llamadas, después 84, con el contador en cero. Si
el instrumento no se verifica, el número tranquiliza y miente. Peldaño 7.

### Ref. 36 — Los medidores que mentían y las cinco reglas de la sección 11.b (13 y 14 de octubre)

Textual de los commits del 13 de octubre (`880ac0f`, `f955620`): "el medidor de E7.5 mentía sobre
una base con el ALTER ya aplicado"; "son 44, no 27". Y unos días antes, un plan afirmaba que
había 121 bucles de cierto tipo y el que ejecutó midió 79. De todo esto escribí la sección 11.b
del documento de reingeniería, con las cinco reglas que hoy son el peldaño 7: medidor con guarda;
si el instrumento no existe se construye; se audita en dos direcciones; lo aproximado se marca; y
el que ejecuta verifica los números del que planificó. Con la frase que lo resume: "tres de cuatro
aseveraciones estaban mal; donde había instrumento, exacto".

### Ref. 37 — Presupuesto de consultas y el techo apretado a lo medido (14 de octubre)

En la etapa 8 (commits `5926b3f`, `10ada00`) cada camino de la aplicación quedó con un
presupuesto de consultas a la base medido y protegido por un test, y el cambio de motor de base de
datos quedó como un interruptor por entorno. En la etapa 9 (`0730082`, `7f5f1af`) el techo se
apretó a lo medido más un margen chico: 63 sobre 60. El presupuesto no es un número inventado.
Peldaño 7.

### Ref. 38 — Retención por tabla, y un informe de integridad hecho por otra sesión (14 de octubre)

En las etapas 10 y 12 (commits `f72b15a`, `b266f11`) el paquete real pasó a traer los guiones de
migración, la retención de datos se declaró por tabla y se acotó en producción, y un informe de
integridad hecho por una sesión distinta de Claude Code, que no había construido el sistema, fue
absorbido como pendientes. Es el auditor distinto del constructor del peldaño 13.

### Ref. 39 — El despliegue solo empaqueta, y la cuota que se fundió (14 de octubre)

Los tests se corrían tres veces por cada commit, entre 16 y 27 minutos cada vez; en 16 días se
consumieron 2.000 minutos de cuota de GitHub Actions, y un día de 23 pushes la terminó de fundir.
El 14 de octubre (commit `39497b0`) partí el circuito: los tests corren UNA sola vez, en la
integración continua; el despliegue espera ese resultado y solo empaqueta. De 16 a 27 minutos por
commit, a 11. Peldaño 15.

### Ref. 40 — Dos puertas de administrador en veinticuatro horas (15 de octubre)

El 15 de octubre se crearon dos puertas de administrador en un solo día (pendientes 223 y 257).
Una revisión externa lo detectó; retiré una (commits `69bdab2`, `20fdbe7`, `1558ee4`) y quedó una
única vía. Lo cuento como evidencia de que el método aguanta "deshacer rápido" sin drama, y de por
qué la auditoría la tiene que hacer alguien que no construyó. Peldaños 13 y 14.

### Ref. 41 — La auditoría de calidad: una vulnerabilidad, un componente enorme, un archivo de proyecto de 9.661 líneas (15 de octubre)

La auditoría de calidad del 15 de octubre encontró una vulnerabilidad conocida en una
dependencia, un componente de pantalla de 2.679 líneas, ocho módulos duplicados entre la versión
web y la móvil, y un `CLAUDE.md` que había crecido hasta 9.661 líneas y 789 kilobytes, un archivo
que a esa altura no lee nadie, ni el modelo. De ahí la regla del peldaño 2: el archivo de proyecto
es el programa, no el historial, y el libro de casos va aparte. Peldaños 2, 11 y 13.

### Ref. 42 — Secretos pegados en el chat (14 y 16 de octubre)

El 14 de octubre una clave de la base de datos quedó impresa en una transcripción, y el 16 unas
claves de API aparecieron pegadas en el chat. Ninguna de las dos fue "vista por nadie", y las dos
hay que rotarlas igual, porque un secreto que estuvo en un chat, en un log o en un commit ya no es
un secreto. Peldaño 15.

### Ref. 43 — Tres reportes que no eran lo que decían (14 al 16 de octubre)

Tres casos chicos y muy ilustrativos del peldaño 12. El 14 de octubre un error de autenticación
fue reportado por la herramienta con la leyenda "success". El 16 el CORS del servidor se derivó
solo del primer nombre de dominio, y el asistente de configuración del entorno de prueba daba un
error 500 que el reporte no mencionaba. Y la aplicación móvil perdía las pestañas en condiciones
que el reporte declaraba verificadas. Los tres se corrigen con la misma regla: separar lo
verificado de lo creído y declarar los puntos ciegos.

### Ref. 44 — La batería que moría por memoria y parecía un test fallido

Una batería entera de tests "murió" por falta de memoria (commit `1d7a20b`), y el reporte lo leyó
como un test que fallaba. Hasta que no se miró la salida completa no se entendió que no había
fallado ningún test: se había caído el proceso. Es el motivo por el que el peldaño 8 pide los
números del rojo y del verde, no solo el veredicto.

---

## D. Lo que impuse en sesión, y lo que rechacé

### Ref. 45 — Cuatro correcciones que hice en sesión y que después se volvieron reglas (octubre)

Hay reglas del método que no salieron de un commit sino de correcciones que le hice al agente en
plena sesión, y que después formalicé. Las cito porque muestran el segundo factor del origen del
método, mi propio criterio de ingeniería frente a la aplicación frágil del modelo. "Medidor con
guarda, no grep": un número que alimenta una decisión se mide con un programa con test, no con
una búsqueda de texto. "Medí la hipótesis, no solo el síntoma": cuando yo traigo una causa en
forma de impresión, hay que medirla antes de construir, porque suelo tener razón en el síntoma y
la causa suele estar al lado. "Validá los límites con el log, no con la prosa": una negativa del
modelo no prueba que el límite esté aplicado; hay que forzar la invocación y leer el registro. Y
"compará primero la versión publicada": ante un "sigue roto", mirar qué versión corre donde yo veo
el problema antes de volver a diagnosticar. Peldaños 7 y 12.

### Ref. 46 — Los proyectos que rechacé, y de dónde salen los criterios excluyentes (17 de octubre)

Los dos criterios excluyentes del peldaño 0 no salen de los proyectos que acepté sino de los que
rechacé. Rechacé tecnologías heredadas sin repositorio accesible o con repositorios que no siguen
un estándar, porque sin repositorio no hay dónde dejar la evidencia. Y rechacé tecnologías que no
se pueden probar de punta a punta, donde no se pueden ejecutar las pantallas y acceder a cada
elemento de la interfaz con sus distintos métodos validando que el cambio llegó al backend. Aclaré
en ese momento, y lo sostengo, que NAC3 no es obligatorio: sí lo es testear desde la ejecución de
las pantallas.

---

## E. Cronologías completas

Las pongo por si alguien quiere ver la secuencia entera y no un caso suelto. Cada fila trae la
evidencia tal como está en los repositorios.

### E.1 yujin-forge

| Fecha | Momento | Qué cambió | Evidencia |
|---|---|---|---|
| 25 de mayo | Nacen los estándares de calidad | Primer contrato de convivencia: tiempo del humano, cero deuda, documentación al día, alcance exacto | `2219f7a` |
| 27 de mayo | Primer registro de anti-patrones | Formato fijo: olor, causa raíz, arreglo, detección temprana | `73f4029` |
| 2 de junio | Compuertas G1 a G9 y G-DOC | La doctrina entra al prompt solo cuando aplica | `5b47475` |
| 4 de junio | Política de testing reformulada | Tests después de implementar por defecto; esqueleto en verde; protección contra bucles | `a9f59c7`, `testing-policy.md` |
| 4 de junio | Decisiones congeladas antes del sprint | D1, D2, D3 escritas y numeradas | documento de decisiones del 4 de junio |
| 5 de junio | Se elimina el equipo multiagente | 60 dólares y 73 minutos contra 90 minutos | `7584f8b` |
| 6 de junio | El plan son los pendientes | Cola canónica, numerada, refrescada por sesión | `4fc82c6` |
| 10 de junio | Doctrinas obligatorias; honestidad de verificación; tipos de flujo | Rojo real, puntos ciegos, afirmaciones proporcionales | `7ab9d8a`, `2c552c0` |
| 14 al 21 de junio | Pilotos automáticos de 24 y 48 horas | Autonomía larga con mandato escrito | notas de sesión |
| 5 y 10 de julio | Modo diagnóstico | Solo lectura sobre sistemas ajenos | `diagnostic-mode.md` |
| 22 de julio | Endurecimiento de rendimiento | Patrones de escala tomados de producción | `873339c` |
| 14 de agosto | Agente residente en producción | Mapa del sistema, solución operativa primero, tickets | notas de sesión |
| 10 y 11 de octubre | Dimensionamiento como compuerta | Opciones fijas, registradas | `c602725`, `0bd1b05` |
| 13 de octubre | Interfaz de persistencia asincrónica | Decisión asimétrica | `7391cc5` |
| 14 de octubre | Turno huérfano de 1 h 43 → 1.18.0 | Vigía de silencio, correa entre procesos, 28 tests | `b80a659` |

### E.2 Autorizaciones

| Fecha | Momento | Qué aportó | Evidencia |
|---|---|---|---|
| 11 de junio | Documento de diseño inicial | Superado por el repositorio en semanas | documento de diseño |
| 23 de junio | Auditoría de consultas sin índice | Hallazgos convertidos en pendientes | documento de auditoría |
| 24 de junio | Lecciones de la nube de Google | Errores de infraestructura escritos como lecciones | documento de lecciones |
| 26 de junio | Manual de usuario | Nace con el sistema | manual |
| 13 de julio | Backup de segunda capa | Local y en la nube | commit de backup |
| 14 de julio | PND-300, cuatro rondas | Arreglo de raíz o no es arreglo | pendiente 300 |
| 16 de julio | Auditoría de seguridad | Periódica, genera pendientes | documento de auditoría |
| 26 y 29 de julio | Manuales interno y de recuperación | Reproducibles a mano, sin IA | `6444ce6`, `a30cee3` |
| 27 de julio | Fail-closed como reflejo | La fila queda sin botón; el listado no se rompe | `e18406d` |
| 6 y 7 de agosto | Contadores 1.355 contra 1.234 | Causa raíz sobre producción, test en rojo, script en el repo | `ab3e529`, `1f5feb9` |
| 6 de agosto | Simetría productor/consumidor | Una sola fuente para causas y columnas | `50fe968`, `7251129` |
| 7 de agosto | Botón de pánico, modo de ensayo, vigía | Candados | `0954740` |
| 10 de agosto | Reglas de dominio en el commit | Con fecha y dueño | `0ae3ae6` |

### E.3 Kikan

| Fecha | Momento | Qué aportó | Evidencia |
|---|---|---|---|
| 21 de agosto | Arranque con el método escrito | Archivo de proyecto y pendientes desde el día uno | primer commit |
| 28 y 29 de agosto | Serie AUD-* | 19 documentos de pendientes | documentos de pendientes |
| 28 de agosto | Integración continua | Tests en GitHub desde la primera semana | `ci.yml` |
| 23 y 24 de septiembre | Despliegue como paquete | Configuración en el servidor; runtime fijo | `deploy.yml`, `bb801ed` |
| 30 de septiembre al 4 de octubre | Despliegue endurecido | Cinco pendientes seguidos | `f85c3c9`, `513c8d0`, `076df76`, `9d76af8`, `0bd20a8` |
| 4 y 8 de octubre | Promoción UAT a PROD | Circuito explícito | `4eb5ad7`, `7658e2e` |
| 11 de octubre | Esquema derivado del código | Con candado, abierto al tablero | `6113319`, `68819ce` |
| 11 al 13 de octubre | Trinquete estático | El medidor no veía: 70, después 84 | `06b2734`, `f6e5221`, `2fc6239`, `1d55a93` |
| 13 de octubre | Medidores que mentían | "son 44, no 27" | `880ac0f`, `f955620` |
| 14 de octubre | Presupuesto de consultas; techo 63 sobre 60 | Medido más un margen | `5926b3f`, `10ada00`, `0730082`, `7f5f1af` |
| 14 de octubre | Las cinco reglas de 11.b | Medidor con guarda, auditoría en dos direcciones | documento de reingeniería, 11.b |
| 14 de octubre | Retención por tabla; integridad externa | Informe de otra sesión absorbido como pendientes | `f72b15a`, `b266f11` |
| 14 de octubre | El despliegue solo empaqueta | De 16-27 minutos a 11 | `39497b0` |
| 15 de octubre | Dos puertas de administrador | Una retirada en 24 horas | `69bdab2`, `20fdbe7`, `1558ee4` |
| 15 de octubre | Auditoría de calidad | Vulnerabilidad, componente de 2.679 líneas, archivo de 9.661 líneas | documento de auditoría |

---

## F. Cada fallo, y el peldaño que lo cubre

Esta tabla es, en cierto modo, la prueba de la escalera: cada golpe tiene que caer en algún
peldaño. Si apareciera uno que no cae en ninguno, faltaría un peldaño.

| Fallo | Referencia | Peldaño que lo cubre | Estado |
|---|---|---|---|
| El equipo multiagente que gastaba el doble y entregaba la mitad | Ref. 6 | 23, retrospectiva con número | cerrado |
| Trabajo descartado por no leer el mapa | Ref. 9 | 2, lectura obligatoria | cerrado |
| PND-300: tres arreglos que no eran de raíz | Ref. 22 | 1, cero deuda; 7, medir | cerrado |
| Contadores 1.355 contra 1.234 | Ref. 26 | 7, instrumento; 11, simetría | cerrado |
| 3,4 millones de filas por año sobre archivos JSON | Ref. 15 | 3, dimensionar | cerrado |
| Medidores que mentían; trinquete en cero | Refs. 35 y 36 | 7, verificar el instrumento | cerrado |
| Turno huérfano de 1 h 43 | Ref. 16 | 12 y 14 | cerrado |
| Tests tres veces por commit; cuota fundida | Ref. 39 | 15 | cerrado; la cuota hay que ampliarla |
| Dos puertas de administrador en 24 horas | Ref. 40 | 13 y 14 | cerrado |
| Secretos pegados en el chat | Ref. 42 | 15 | rotación pendiente |
| Error de autenticación reportado como éxito | Ref. 43 | 12 | pendiente, una línea |
| Archivo de proyecto de 9.661 líneas | Ref. 41 | 2 | pendiente |
| CORS del primer dominio; asistente de configuración con error 500 | Ref. 43 | 15 y 11 | aplicación pendiente |
| La aplicación móvil pierde pestañas | Ref. 43 | 12 y 14 | diagnóstico hecho; corrección pendiente |
| Consultas sin índice sobre un sistema vivo | Ref. 18 | 13 y 17 | cerrado |
| Auditoría de seguridad hecha una vez, no como rutina | Ref. 23 | 13 y 18 | cerrado; el calendario es nuevo |
| Techo apretado a lo medido; cuota fundida sin que nadie mirara | Refs. 37 y 39 | 7, 15 y 21 | cerrado |
| El turno huérfano se encontró por el log, no por el código | Ref. 16 | 16 y 22 | cerrado |
