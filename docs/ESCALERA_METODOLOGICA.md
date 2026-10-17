# Urazuke, el método de la evidencia — la escalera metodológica (versión 3)

Conversación entre Pablo y Sumi, 17 de octubre de 2026 (versión 1 por la mañana; versión 2 por
la tarde, con la tesis de apertura, los contratos de peldaño y el repositorio propio; versión 3
con el nombre, los contratos enriquecidos, los prompts en inglés, la guía por tamaño de proyecto
y la guía por herramienta). Este es un documento de trabajo:
lo vamos a seguir elaborando en varias pasadas, así que nada de lo que dice es doctrina
todavía. Es, simplemente, el primer destilado honesto de lo que hicimos de verdad en tres
repositorios que hoy están en producción, con gente real usándolos.

Una aclaración de estilo, porque importa: este documento está escrito para personas que
no vivieron estos proyectos. Por eso explica las cosas con calma, repite cuando hace
falta, usa lenguaje de todos los días, y tiene al final un **glosario** con cada sigla y
cada expresión coloquial que aparece. Si en algún momento te encontrás con una palabra
rara —"trinquete", "candado", "PND", "fail-closed"— andá al glosario; está todo ahí.

## El nombre

**Urazuke** (裏付け) es una palabra japonesa que nombra el respaldo que tiene una afirmación: lo
que la sostiene por detrás (literalmente, "el forro de atrás"). El verbo *urazukeru* es "respaldar
con pruebas". Pablo lo eligió el 17 de octubre de 2026 ("Vamos con Urazuke"), después de que el
chequeo de nombres descartara Hashigo, Kaidan y Shōko por colisiones con empresas y proyectos
existentes. El nombre no se traduce; el subtítulo, "el método de la evidencia", sí: *the evidence
method*, *o método da evidência*, *la méthode de la preuve*, *die Nachweis-Methode*, *il metodo
del riscontro*, 裏付けの方法, 验证方法. En este documento, "la escalera" es la estructura del
método —sus dieciséis peldaños— y "Urazuke" es el método entero.

## ¿De qué se trata esto?

Pablo lo dijo con claridad: no quiere enseñar una herramienta, quiere enseñar **el
método**. La idea es que cualquier persona, con cualquier herramienta de inteligencia
artificial que sirva para programar, pueda "vibecodear" (es decir, construir software
conversando con una IA en vez de tipear el código a mano) y que lo que salga sea robusto,
listo para producción, y —esto es lo importante— **sin que el dueño del proyecto tenga que
revisar ni una sola línea de código**.

Suena ambicioso, y lo es. Pero tenemos algo que casi nadie tiene: tres sistemas reales que
se construyeron exactamente así y que hoy funcionan con clientes de verdad. Entonces la
pregunta no es "¿se podrá?", sino "¿qué hicimos, en qué orden, y qué de todo eso es lo que
realmente hizo la diferencia?".

Esta escalera es la respuesta a esa pregunta. Y va a servir de base para tres cosas: la
documentación del método, la práctica que van a hacer los alumnos, y los manuales. Más
adelante, además, la vamos a exportar como un "flujo de ejecución de proyecto" dentro de
Forge, para que la herramienta guíe el método en vez de que uno tenga que acordarse.

## La IA no interrumpe el método: lo continúa

Esta es la tesis que abre el documento, y la ponemos primero porque desarma la objeción más
común antes de que aparezca: "¿cómo vas a confiar en código que escribió una máquina?".

La respuesta es que **la industria ya dejó de confiar en el autor del código hace veinte años**.
Cuando el grueso de la escritura pasó a equipos junior, tercerizados o rotativos, la revisión
línea por línea se volvió imposible de sostener. Y lo que creció en su lugar fue todo lo que hoy
damos por sentado: los tests automatizados, la integración continua, los criterios de aceptación,
los pipelines que no dejan pasar nada sin verde, el "shift left" de las pruebas, el control de
calidad como función independiente. Esa fue la respuesta de la ingeniería de sistemas a "el que
escribe no es confiable": no leerle el código, exigirle evidencia.

Entonces poner a un modelo de inteligencia artificial a escribir no es un salto al vacío. Es
cambiar un autor en el que ya no confiábamos por otro en el que tampoco, y para el cual **ya
teníamos armado el aparato de verificación**. Eso debería tranquilizar, no inquietar. Y encima
el nuevo autor es más barato, más rápido, y —a diferencia del junior— no se ofende cuando le pedís
que pruebe en rojo.

Por eso este método se apoya, sin disimulo, en la ingeniería de sistemas clásica. El esqueleto
es el de siempre: relevamiento, requisitos, dimensionamiento, diseño, construcción, prueba,
despliegue, operación, auditoría. No podía ser de otra manera, porque los problemas son los de
siempre: no saber cuántos datos va a haber, no saber qué quiere el cliente, no saber si lo que se
construyó es lo que se pidió. La IA no cambió los problemas; cambió quién hace cada parte y a qué
costo. Hasta el criterio de elegibilidad X2 (ver peldaño 0) es ingeniería clásica: testeabilidad
como condición de contrato.

### Qué es viejo y qué es nuevo en esto

Lo viejo, y que conviene decir que es viejo: el esqueleto de etapas, la independencia del que
verifica respecto del que construye, los tests como evidencia, la documentación como parte del
producto, el relevamiento antes del diseño.

Lo que sí cambia, y es donde está lo nuestro, son tres cosas:

1. **Dónde va el esfuerzo del humano.** En el método clásico el humano escribe la especificación,
   escribe el código, y otro humano lo revisa. Acá el humano hace dos cosas solamente: **decide, y
   verifica artefactos**. Todo lo demás —redactar, construir, probar, medir, documentar— lo hace el
   modelo. Por eso cada peldaño termina en una "verificación de completitud sin leer código": es
   el lugar exacto donde el humano sigue siendo imprescindible, y ninguno más.

2. **El autor también fabrica la evidencia.** Este es el único punto genuinamente nuevo, y es el
   matiz que justifica tres peldaños enteros. El junior escribía código dudoso, pero no fabricaba
   la evidencia: los tests y las mediciones los armaba otro, o al menos otro los miraba. El modelo,
   en cambio, produce el código *y* el test *y* el medidor *y* el reporte, en la misma sesión, con
   la misma seguridad en la voz cuando está bien y cuando está mal. Lo vimos: el medidor que mintió
   dos veces, el error de autenticación reportado como "éxito", las tres de cuatro aseveraciones que
   estaban mal. Entonces "revisar evidencia en vez de código" sigue siendo el principio correcto,
   pero **la evidencia tiene que probarse a sí misma**: el test visto en rojo (peldaño 7), el
   instrumento con su guarda (peldaño 9), el reporte que separa lo verificado de lo creído
   (peldaño 10), el auditor distinto del constructor (peldaño 11). No es una inquietud nueva: es la
   misma disciplina de independencia del control de calidad, llevada un paso más adentro.

3. **El costo de los artefactos.** En el método clásico la documentación era cara, entonces se
   hacía una vez y envejecía. Acá regenerarla es gratis, entonces la regla pasa a ser "en el mismo
   commit" y "reproducible a mano, sin IA". Lo que antes era un ideal incumplible pasa a ser una
   compuerta.

Para el curso y para la presentación pública, esto define el posicionamiento con honestidad: no es
"la nueva forma de programar"; es **ingeniería de sistemas aplicada a un constructor que no se
cansa y al que no se le puede creer**. A los que vienen de sistemas les suena familiar y les baja
la desconfianza ("esto ya lo sabés hacer"); a los que vienen del vibecoding les da lo que no
tienen, que es justamente el esqueleto. Y nos diferencia de las herramientas que venden velocidad
y omiten el esqueleto entero.

## De dónde sale todo esto (las fuentes)

Relevé los tres repositorios en modo solo lectura, sin tocar nada:

- **`[repositorio yujin-forge]`** (la herramienta Forge y, sobre todo, el lugar donde nació el
  método): 1.090 commits entre el 10 de mayo y el 14 de octubre de 2026. Ahí están el
  documento de estándares de calidad (`docs/SQ.md`), las 31 doctrinas en
  `docs/doctrine/`, el registro de anti-patrones (`docs/GOTCHAS.md`), el paper donde se
  decidió matar el equipo multiagente (`docs/PAPER_SUMI_VS_AGENTIC.md`), las decisiones
  congeladas del director (`docs/DIRECTOR_DECISIONS_2026_06_04.md`), el plan del registro
  de pendientes (`docs/PENDING_REGISTRY_PLAN.md`) y el texto de las reglas SQ 1 a 9 que
  Forge le inyecta al cerebro en cada turno (`src/chat/server.ts`).
- **`[repositorio Autorizaciones]`** (el primer sistema productivo, para una entidad de
  salud): 469 commits entre el 11 de junio y el 9 de octubre, 641 pendientes y todos
  cerrados. Incluye el documento de diseño inicial (`sdd_opcion_c_claude_code.md`), las
  lecciones aprendidas de la nube de Google, varias auditorías y los manuales.
- **`[repositorio Kikan]`** (el segundo sistema productivo, la mesa de atención omnicanal y
  campañas de la Asociación): 442 commits entre el 21 de agosto y el 16 de octubre, 37 tags, la
  serie de auditorías AUD-*, 19 documentos de pendientes, el documento de la reingeniería
  de persistencia (`docs/REINGENIERIA_PERSISTENCIA_SQL.md`, con sus etapas E1 a E12 y la
  famosa sección 11.b), la integración continua y el despliegue, y los dos informes de
  esta semana (integridad del 14 de octubre, calidad del 15).
- Mi propia memoria de las correcciones que Pablo me hizo a lo largo de estos meses
  ("medidor con guarda", "medí la hipótesis", "validá con el log", "fijate primero qué
  versión está publicada").

**Sobre los nombres.** Los clientes de los dos sistemas productivos están anonimizados: los
llamamos "la Obra Social" (con su "Autorizador") y "la Asociación", y a sus sistemas
"Autorizaciones" y "Kikan". Los números, las fechas y los commits son reales; los nombres de
las organizaciones quedan reservados hasta tener su permiso. Las rutas locales de los
repositorios de origen aparecen como `[repositorio …]`.

Una convención que vale para todo el documento: **cada afirmación cita el commit o el
documento donde está la evidencia**. Y cuando algo es una interpretación mía y no un
hecho comprobado, lo marco con la etiqueta `[hipótesis]`, para que se distinga a simple
vista lo que está probado de lo que estoy proponiendo.

---

## Parte A — Relevamiento: los momentos y los hitos que importaron

### A.1 yujin-forge: donde nació el método (mayo a octubre de 2026)

Acá hay algo que me parece fundamental decir de entrada, porque cambia cómo se lee todo
lo demás: **el método no se diseñó primero y se aplicó después**. Fue al revés. Cada
regla se escribió *después* de un golpe, en el mismo repositorio donde se vivió ese
golpe, y muchas veces el mismo día. Ninguna doctrina nació en abstracto, en una reunión
de pizarra. Todas tienen un incidente atrás y un commit de nacimiento. Esto es, creo yo,
lo más honesto y lo más valioso que tenemos para contar.

Acá va la secuencia, en orden:

| Fecha | Momento | Qué cambió en el método | Evidencia |
|---|---|---|---|
| 25 de mayo | Nacen las SQ (los estándares de calidad) | Es el primer "contrato de convivencia" entre el humano y el agente. Dice cosas como: el tiempo del humano es sagrado; nada de deuda técnica (lo que se rompe se arregla de raíz); todo en ASCII; la documentación siempre al día; y el alcance exacto, ni más ni menos de lo pedido. | `2219f7a docs: add SQ.md` |
| 27 de mayo | Primer registro de GOTCHAS | Los errores que se repiten empiezan a anotarse con un formato fijo: cómo huele (el "smell"), cuál es la causa raíz, cómo se arregló, y cómo detectarlo la próxima vez antes de que duela. | `73f4029` (gotchas doc) |
| 2 de junio | Compuertas (gates) y G-DOC, inyectados solo cuando corresponden | Aparecen las compuertas explícitas del flujo de trabajo, numeradas G1 a G9. Y un detalle inteligente: la doctrina entra al prompt del agente solo en el momento en que aplica, no siempre, para no gastar contexto al cuete. | `5b47475` |
| 4 de junio | Se reformula la política de testing | Hasta entonces se insistía con "primero el test, después el código" (TDD) para todo. Se descubre que no sirve universalmente: por defecto los tests van *después* de implementar, el TDD queda como opción para alcances chicos y bien definidos, el esqueleto tiene que estar en verde como compuerta, y se agrega una protección contra bucles (cuando el agente da vueltas sin avanzar, salta un modal que frena todo). | `a9f59c7`, `docs/doctrine/testing-policy.md` |
| 4 de junio | Se congelan las decisiones del director | Antes de un sprint, tres decisiones se escriben y se numeran (D1, D2, D3). Acá nace la práctica de "la decisión se escribe antes de construir". | `docs/DIRECTOR_DECISIONS_2026_06_04.md` |
| 5 de junio | REDISEÑO: se mata el equipo multiagente | Este es un momento enorme. Había un equipo de cinco agentes (director, analista, programador, tester, armador de esqueletos) que se pasaban trabajo entre sí. Se hizo un experimento medido: ese equipo gastó 60 dólares y 73 minutos y entregó algo a medias; una sola sesión con un solo agente tardó 90 minutos y entregó algo publicable. Se eliminó el equipo entero. Es el primer caso de "retrospectiva con un número en la mano, y rediseño". | `7584f8b`, `docs/PAPER_SUMI_VS_AGENTIC.md` |
| 6 de junio | Registro de pendientes | El plan de trabajo pasa a SER la lista de pendientes: una cola canónica, con comandos para manejarla, que se refresca en cada sesión. Ya no hay "plan" por un lado y "tareas" por otro. | `4fc82c6`, `docs/PENDING_REGISTRY_PLAN.md` |
| 10 de junio | Doctrinas obligatorias + honestidad de verificación + tipos de flujo | La doctrina deja de ser opcional: va como bloque obligatorio en cada prompt. Nace la "honestidad de verificación": verificar que la red realmente se pone en rojo cuando tiene que ponerse, declarar los puntos ciegos, y hacer afirmaciones proporcionales a lo que se comprobó. Y se separan tres tipos de flujo: proyecto nuevo (greenfield), corrección, y evolución. | `7ab9d8a`, `2c552c0`, `docs/doctrine/verification-honesty.md`, `workflow-kinds.md` |
| 14 al 21 de junio | Pilotos automáticos de 24 y 48 horas | El agente trabaja solo durante un día o dos con un mandato escrito: commit y push por cada pieza, sin preguntar, y el humano recibe un resumen. Se prueba que el método aguanta autonomía larga. | memoria `feedback_autopilot_mandate`, `project_autonomous_multisession_interrupt` |
| 5 y 10 de julio | Escala de concurrencia y modo diagnóstico | El agente entra a sistemas productivos ajenos en modo diagnóstico: solo lectura, acotado, sin tocar nada. | `docs/doctrine/diagnostic-mode.md` |
| 22 de julio | Endurecimiento de rendimiento | Se extraen patrones de escala del sistema de la Obra Social (por ejemplo, el de las dos transacciones; y "medir antes de tocar"). Por primera vez el método se alimenta de un sistema que ya está en producción. | `873339c` |
| 14 de agosto | Forge Embed vivo en la producción de la Obra Social | El agente queda RESIDENTE dentro del sistema del cliente: con un mapa del sistema obligatorio, con la regla de "primero la solución operativa", y con capacidad de abrir tickets. | la memoria del asistente residente en producción |
| 10 y 11 de octubre | Modo operación + dimensionamiento (G9) | Se dimensiona antes de construir, eligiendo entre opciones fijas, y el dimensionamiento queda registrado como una compuerta más. | `c602725`, `0bd1b05`, `docs/doctrine/sizing.md` |
| 13 de octubre | Interfaz de persistencia | Una decisión "asimétrica" (cuesta poco si estás equivocado, cuesta muchísimo si no la tomás): la interfaz con la base de datos es asincrónica desde la línea uno, aunque el primer motor sea sincrónico. Cambiarla después costó una etapa entera de la reingeniería (E6: tres baterías de tests). | `7391cc5`, `docs/doctrine/persistence-interface.md` |
| 14 de octubre | El turno huérfano de 1 hora 43 → versión 1.18.0 | Un fallo del método, y bien feo: el agente trabajó una hora cuarenta y tres minutos invisible para el humano, e hizo seis commits en ese lapso. Se arregló de raíz: un vigía de silencio, una correa entre procesos, y 28 tests. | `b80a659`, CHANGELOG 1.18.0 |

¿Qué se lee en esta tabla? Que en cinco meses el método pasó de "reglas de cortesía" (las
SQ, que son casi modales de convivencia) a "compuertas medidas" (dimensionamiento,
presupuesto de consultas, honestidad de verificación). Y que cada peldaño tiene fecha de
nacimiento y un golpe que lo justificó. Eso es lo que lo hace enseñable: no es teoría, es
cicatriz.

### A.2 Autorizaciones: el método bajo carga real (junio a octubre de 2026)

Este fue el primer sistema con usuarios de verdad, con plata en juego y con datos de
salud. Son 641 pendientes, todos cerrados. Y acá pasó algo distinto: el método aprendió a
**operar**, no solo a construir. Una cosa es que un sistema funcione cuando lo probás vos;
otra muy distinta es que siga funcionando a las tres de la mañana con un robot aprobando
órdenes.

| Fecha | Momento | Qué aportó | Evidencia |
|---|---|---|---|
| 11 de junio | Arranque con un documento de diseño (la "opción C") | Hubo una especificación inicial. Y el repositorio la "superó" rapidísimo: lo que se construyó fue mucho más que lo que decía el papel. Lección: la especificación vale como punto de partida, pero el plan vivo son los pendientes. | `sdd_opcion_c_claude_code.md` |
| 23 de junio | Auditoría de consultas sin índice | La primera auditoría de "full scans" (consultas que leen la tabla entera porque no hay índice) sobre un sistema vivo. Y los hallazgos se convierten en pendientes, no en un informe que se archiva. | documento de auditoría del 23 de junio |
| 24 de junio | Lecciones aprendidas de la nube de Google | Los errores de infraestructura se escriben como lecciones para no repetirlos. | documento de lecciones GCP |
| 26 de junio | Manual de usuario | El manual nace junto con el sistema, no al final cuando ya nadie se acuerda de nada. | manual del 26 de junio |
| 13 de julio | Copia de respaldo de segunda capa | Dos capas de backup antes de confiar en el sistema: una local y otra en el almacenamiento de Google. | commit backup capa 2 |
| 14 de julio | La saga del PND-300 (cuatro rondas de causa raíz) | Un bug que volvió tres veces hasta que se encontró la causa real. Acá "el fix es de raíz o no es fix" deja de ser una frase linda y se vuelve práctica obligatoria. | PND-300 |
| 16 de julio | Auditoría de seguridad | La seguridad se trata como una auditoría periódica que genera pendientes, no como una lista de verificación que se tilda una vez al principio. | documento de auditoría del 16 de julio |
| 26 y 29 de julio | Manual interno de RPAForce + manual de recuperación ante desastres | Todo lo operativo (desplegar, recuperar, mantener) queda documentado de forma "reproducible a mano, sin IA". Si mañana no hay agente, una persona puede seguir el manual. | `6444ce6 (pnd442)`, `a30cee3 (pnd459)` |
| 27 de julio | El "fail-closed" como reflejo | Si una tabla no existe o una búsqueda falla, la fila simplemente queda sin su botón; nunca se rompe el listado entero. Ante la duda, no actuar y no romper. | `e18406d (pnd452)` |
| 6 y 7 de agosto | Contadores verificados contra producción (1.355 contra 1.234) | Este es, para mí, el ejemplo más completo de "verificar con instrumento". Un contador mostraba 1.355 aprobaciones y la consulta mostraba 1.234. Se verificó la causa raíz directamente sobre producción (en solo lectura), se descompuso la diferencia número por número (145 de más, 24 de menos, 145 − 24 = 121), se escribió un test que se probó EN ROJO contra el criterio viejo, y el script de diagnóstico quedó en el repositorio para la próxima. | `ab3e529 (pnd517)`, `1f5feb9 (pnd514)` |
| 6 de agosto | Simetría productor/consumidor en vivo | La "causa de espera" que ve el usuario se calcula con las MISMAS compuertas con las que el robot decide (regla SQ 7); y la lista de columnas la define el servidor y el frontend la consume. Así no pueden divergir. | `50fe968 (pnd510)`, `7251129 (pnd509)` |
| 7 de agosto | Botón de pánico con candado dedicado | Candados: doble seguro, modo de ensayo (dry-run) del aprobador automático, un vigía que empuja con guardas. | `0954740 (pnd524)` |
| 10 de agosto | Reglas de dominio escritas en el commit | Textual: "regla Pablo: aprobada + saldo = vuelve", "decisión Pablo 2026-08-10". La decisión de negocio queda con fecha y con dueño, pegada al código que la implementa. | `0ae3ae6 (pnd550)` |

¿Qué se lee acá? Que en este repositorio el método ganó sus peldaños OPERATIVOS: el
fail-closed, los candados, los backups, los manuales que una persona puede seguir sin IA,
las auditorías periódicas, y la verificación contra producción con un instrumento y no a
ojo.

### A.3 Kikan: el método maduro (agosto a octubre de 2026)

El segundo sistema productivo, y el primero que se construyó con todo lo anterior ya
escrito desde el día uno. Acá aparecen los peldaños de **medición** y de **integración y
despliegue continuos**: es el repo donde, por primera vez, medir viene sistemáticamente
antes que construir.

| Fecha | Momento | Qué aportó | Evidencia |
|---|---|---|---|
| 21 de agosto | Arranque | El proyecto arranca con un `CLAUDE.md` operativo (el archivo que el agente lee al empezar) y con pendientes como plan desde el primer día. | primer commit |
| 28 y 29 de agosto | Serie de auditorías AUD-* → 19 documentos de pendientes | Una auditoría sistemática temprana que se convierte directamente en el plan de trabajo. | documentos PND del 28 y 29 de agosto |
| 28 de agosto | Integración continua (CI) | Los tests corren en GitHub desde la primera semana. | `ci.yml` |
| 23 y 24 de septiembre | Despliegue + configuración solo en el servidor + Node 22 fijo | El despliegue es un paquete; la configuración vive en el entorno, no en el repositorio; y la versión del runtime queda clavada. | `deploy.yml`, `bb801ed` |
| 30 de septiembre al 4 de octubre | El despliegue se endurece a golpe de pendientes | La URL pública en los dos entornos; recargar el servicio antes de reiniciar y antes de volver atrás; un fixture que RECONCILIA en vez de duplicar; el material del cliente fuera del árbol que se espeja. Cinco pendientes seguidos sobre lo mismo: el despliegue descubierto tarde cobra su precio. | `f85c3c9`, `513c8d0 (PND-108)`, `076df76 (PND-134)`, `9d76af8 (PND-130)` |
| 3 de octubre | Aislar la configuración | La batería de tests ya no ensucia la configuración que viaja en el despliegue. | `0bd20a8 (PND-107)` |
| 4 y 8 de octubre | Promoción de UAT a PROD | Un circuito explícito para pasar configuración y campañas del entorno de prueba al de producción. | `4eb5ad7 (PND-027)`, `7658e2e` |
| 11 de octubre | REINGENIERÍA, etapa 1: el esquema derivado del CÓDIGO, con candado | El inventario de tablas y campos se deriva del código mismo, con un test que lo protege, y se abre en el pizarrón (el tablero compartido con Pablo). | `6113319`, `68819ce` |
| 11 al 13 de octubre | Etapa 6: el trinquete estático, tres baterías pasadas a asincrónico | El "trinquete" es un contador de llamadas a la base sin `await` (sin esperar el resultado), que solo puede bajar, nunca subir. Y pasó algo buenísimo para contar: se descubrió DOS veces que el medidor no veía partes del código (70 llamadas, y después 84, con el contador en cero). | `06b2734`, `f6e5221`, `2fc6239`, `1d55a93` |
| 13 de octubre | Medidores que mentían | Textual de los commits: "el medidor de E7.5 mentía sobre una base con el ALTER ya aplicado"; "son 44, no 27". El método aprende algo nuevo: **el instrumento también hay que verificarlo**. | `880ac0f`, `f955620` |
| 14 de octubre | Etapa 8: el interruptor, el presupuesto de consultas y la guarda de reentrada | El cambio de motor de base de datos es un interruptor por entorno; cada camino de la aplicación tiene un presupuesto de consultas medido y protegido por un test. | `5926b3f`, `10ada00` |
| 14 de octubre | Etapa 9: el techo se aprieta a lo medido (63 sobre 60) | El presupuesto no es un número inventado: es lo que se midió más un margen chico. | `0730082`, `7f5f1af` |
| 14 de octubre | Sección 11.b: las cinco reglas | Medidor con guarda; construir el instrumento si no existe; auditar en dos direcciones; marcar lo aproximado; y el que ejecuta verifica al que planificó. Con una frase que lo dice todo: "tres de cuatro aseveraciones estaban mal; donde había instrumento, exacto". | `docs/REINGENIERIA_PERSISTENCIA_SQL.md` 11.b |
| 14 de octubre | Etapas 10 y 12 + integridad externa | El paquete REAL trae los guiones de migración; la retención de datos se declara por tabla y se acota en producción; y un informe de integridad hecho por un tercero (yo, Sumi) que Forge absorbe como pendientes. | `f72b15a`, `b266f11`, `INTEGRIDAD_..._10_14.md` |
| 14 de octubre | El despliegue solo empaqueta (gate-ci) | Los tests se corren UNA sola vez (en CI); el despliegue espera ese resultado y empaqueta. De 16 a 27 minutos por commit, a 11. | `39497b0` |
| 15 de octubre | PND-223 retirada a las 24 horas / PND-257 | Se crearon dos puertas de administrador en un solo día. Una revisión externa lo detectó; se retiró una y quedó una única vía. El método aguanta "deshacer rápido" sin drama. | `69bdab2`, `20fdbe7`, `1558ee4` |
| 15 de octubre | Auditoría de calidad | Notas por dimensión; una vulnerabilidad conocida en una dependencia; un componente de 2.679 líneas; un `CLAUDE.md` de 9.661 líneas. Insumo para el próximo plan. | `AUDITORIA_CALIDAD_CODIGO_2026_10_15.md` |

¿Qué se lee acá? Que Kikan es el primer repositorio donde la MEDICIÓN precede a la
construcción de manera sistemática (dimensionamiento, trinquete, presupuesto), y donde el
despliegue y la integración continua se tratan como parte del producto y no como un
trámite.

### A.4 Los patrones que se repiten en los tres repositorios

Si uno mira los tres repos juntos, hay diez cosas que aparecen una y otra vez. Estas son,
en el fondo, el método:

1. **Golpe → regla escrita el mismo día.** Ninguna doctrina nació en abstracto. Cada una
   tiene un commit de nacimiento y un incidente atrás.
2. **El plan son los pendientes.** Pendientes numerados (PND-nnn) en los tres repos; la
   especificación es el punto de partida, la cola de pendientes es la verdad.
3. **La decisión se escribe junto al código, con dueño y fecha.** "Regla Pablo",
   "decisión Pablo 2026-08-10", las decisiones del director, y en Kikan la "decisión por
   omisión" (cuando Pablo no contestó y el agente eligió, lo dejó marcado como tal).
4. **El test se prueba en rojo.** No alcanza con que esté en verde: hay que demostrar que
   el test falla contra el código viejo. Si nunca lo viste rojo, no sabés si prueba algo.
5. **Medir con instrumento, y verificar el instrumento.** Un script con test que viaja en
   el repo; el medidor mintió dos veces y se arregló el medidor antes que el código.
6. **Fail-closed y candados.** Nada se rompe en silencio; ante la duda, no hacer.
7. **Auditoría periódica → pendientes.** Full-scan en junio, seguridad en julio, AUD-* en
   agosto, integridad y calidad en octubre. La auditoría no es un informe: es plan.
8. **Documentación y manuales nacen con el sistema**, y se mantienen en el mismo commit
   que el cambio.
9. **El agente opera adentro del sistema** (diagnóstico → operación → residente) con
   permisos acotados y aprobaciones; el humano aprueba, no teclea.
10. **Retrospectiva con número → rediseño.** El equipo multiagente se mató con 60 dólares
    y 73 minutos contra 90 minutos; el despliegue se partió con 16-27 minutos contra 11;
    y esta escalera misma es exactamente eso.

Y ahora los fallos, porque sin ellos esto sería propaganda y no un relevamiento: el turno
huérfano de una hora cuarenta y tres (14 de octubre); un error de autenticación reportado
como "éxito"; dos puertas de administrador en 24 horas; 23 pushes en un día que fundieron
la cuota de GitHub Actions; la clave de la base de datos impresa en una transcripción; un
`CLAUDE.md` que se volvió un historial de cambios de 9.661 líneas; la aplicación móvil de
Forge que pierde las pestañas; y los medidores que mintieron dos veces. Todo eso pasó. Y
todo eso está en la escalera, porque de ahí salen los peldaños.

---

## Parte B — La escalera, versión 1

### Cómo leer cada peldaño

Cada peldaño tiene siete partes, siempre las mismas, para que se puedan comparar:

- **Intención**: qué busca, en una frase.
- **Entradas**: qué tiene que existir antes para poder subirlo.
- **Artefacto**: qué queda escrito o ejecutable cuando se sube. Siempre es algo concreto:
  un archivo, un test, un script.
- **Compuerta**: qué tiene que ser verdad para pasar al siguiente. Si no se cumple, no se
  sube.
- **Quién decide**: el dueño del proyecto, el agente, o nadie porque es automático.
- **Fallo que evita**: el golpe real que lo originó. Esto es lo que lo vuelve creíble.
- **Evidencia**: el commit o documento donde está.

Dos aclaraciones importantes. Primero: **la escalera es neutral respecto de la
herramienta**. Cada artefacto es un archivo, un test o un script; ninguno exige Forge.
Forge los automatiza (las compuertas, los comandos, el registro de pendientes), pero el
peldaño existe sin Forge. Segundo: **los peldaños no son estrictamente secuenciales**.
Hay tres tramos: los del 0 al 4 son de arranque y se suben una vez por proyecto; los del
5 al 10 son el bucle que se repite con cada cambio; y los del 11 al 15 son de operación,
cuando el sistema ya está vivo. El 15 cierra el ciclo y vuelve al 0 para el próximo
proyecto.

### Cómo se ejecuta cada peldaño: el contrato

La ficha de siete partes dice qué busca cada peldaño y qué deja. Pero un peldaño se entiende
cabalmente recién cuando se ve **cómo se pide, qué tiene que volver y cómo sé que volvió
completo**. Por eso cada peldaño tiene, además de la ficha, un **contrato** en un archivo propio
dentro de `docs/peldanos/`, siempre con las mismas cuatro secciones:

1. **Contexto requerido** — nombrado en forma genérica ("relevamiento de datos de volumetría",
   "acceso de lectura al sistema anterior", "la lista de acciones con consecuencia real"), sin
   bajar al detalle de la ingeniería de sistemas. Los relevamientos son por naturaleza
   incompletos; no intentamos hacerlos completos con un formulario.
2. **Prompt(s)** — el que se le da al modelo, textual. El inicial y, cuando el peldaño es una
   conversación, el de cierre. Todos llevan la misma cláusula, que es el corazón del asunto: *el
   modelo evalúa si el contexto alcanza; si no alcanza, pide todo lo que falte antes de seguir; y
   no estima ni inventa un dato que solo el negocio tiene*. El que sabe qué le falta para calcular
   es el modelo, no un formulario.
3. **Resultado esperado** — las características detalladas del artefacto: qué archivo, qué
   secciones, qué tiene que tener cada una, qué no puede faltar.
4. **Verificación de completitud** — la lista de comprobaciones que hace el dueño sobre el
   artefacto, **sin leer código**. Si una da "no", el peldaño no está subido.

5. **Señales de alarma** — dos o tres síntomas de que el peldaño se subió mal aunque parezca
   subido. Son los que se ven semanas después, cuando ya duele.

Y en el encabezado de cada contrato, además del tramo y la forma, el **tamaño**: si el peldaño es
obligatorio en todo proyecto o proporcional, y qué significa "proporcional" en uno chico.

**Los prompts están en inglés.** Es una decisión (D-013) y tiene tres razones: el mismo contenido
en castellano ocupa entre un 30 y un 50 % más de tokens; la capacidad de seguir instrucciones de
los modelos está mejor calibrada en inglés, así que un prompt en inglés tolera mejor la brevedad
sin volverse ambiguo; y el vocabulario del oficio (test, commit, rollback, mock) es inglés. Debajo
de cada prompt va la explicación, en el idioma del lector, de qué le estamos pidiendo y por qué
cada cláusula está ahí: el prompt es una sola pieza idéntica en las ocho versiones del documento;
la explicación es lo que se traduce. Y todos terminan con "Reply in my language", porque el prompt
está en inglés pero la conversación no tiene por qué estarlo.

Esos dieciséis contratos son, además, lo que después se exporta a Forge: hoy Forge inyecta una
doctrina cuando se cruza una compuerta; el contrato del peldaño *es* esa doctrina, y el prompt
*es* lo que se inyecta. Escribirlos para el curso y escribirlos para el flujo de Forge es el mismo
trabajo.

### Qué es obligatorio y qué es proporcional, según el tamaño del proyecto

Una pregunta que aparece enseguida: "¿todo esto para un sistema chico?". La respuesta es que
dieciséis peldaños no son dieciséis semanas; varios se suben en una hora, y los que son
proporcionales se achican con el proyecto. Lo que no se achica es la lista de los que no se
negocian. Esta tabla es una propuesta `[hipótesis]` para confirmar con el primer proyecto que use
el método de punta a punta:

| Peldaño | Proyecto chico (un dueño, pocos usuarios, sin dinero en juego) | Proyecto con usuarios y consecuencias |
|---|---|---|
| 0 Elegibilidad | obligatorio (una hora) | obligatorio |
| 1 Contrato | obligatorio (media hora) | obligatorio |
| 2 Definición | obligatorio, cincuenta líneas alcanzan | obligatorio |
| 3 Dimensionar | obligatorio, media página y una decisión | obligatorio, completo |
| 4 Esqueleto | obligatorio si va a tener usuarios | obligatorio |
| 5 Pendientes | obligatorio | obligatorio |
| 6 Decisiones | obligatorio | obligatorio |
| 7 Tests en rojo | obligatorio | obligatorio |
| 8 Simetría | la regla sí; el mapa, opcional | obligatorio con mapa |
| 9 Medir | proporcional: contar y anotar | obligatorio, con medidores y presupuestos |
| 10 Verificación honesta | obligatorio | obligatorio |
| 11 Auditoría | una, antes de producción | periódica |
| 12 Fail-closed | opcional si es solo lectura | obligatorio |
| 13 Integración y despliegue | mínimo: tests solos, configuración afuera, vuelta atrás | obligatorio, completo |
| 14 Documentación | mínimo: recuperación | los tres manuales |
| 15 Residente y retrospectiva | retrospectiva de una página | ambos |

En resumen: hay nueve peldaños que no se negocian en ningún proyecto (0, 1, 2, 3, 5, 6, 7, 10 y
la retrospectiva del 15), y siete que se dimensionan con el proyecto.

### Cómo se usa con cualquier herramienta

El método es neutral de herramienta; lo que cambia entre una y otra es **dónde se pone cada
artefacto** para que el modelo lo lea. La correspondencia, para las herramientas más usadas a
fines de 2026:

| Artefacto del método | Claude Code | Cursor | Codex CLI / Gemini CLI | Forge |
|---|---|---|---|---|
| Contrato de convivencia (P1) y rutinas (P5, P6, P7, P8, P10, P14) | `CLAUDE.md` del proyecto | `.cursor/rules/` | `AGENTS.md` / `GEMINI.md` | doctrinas inyectadas por compuerta |
| Definición del proyecto (P2) | `CLAUDE.md` + `docs/STATUS.md` | igual, en reglas y docs | igual | `PROJECT.md` + `.forge/sumi-context.md` |
| Registro de pendientes (P5) | `docs/PENDING.md` o issues | igual | igual | registro de pendientes nativo con verbos |
| Prompts de peldaño (todos) | se pegan en el chat al subir el peldaño | igual | igual | se inyectan al cruzar la compuerta |
| Compuertas (P4) | `docs/GATES.md`, manual | igual | igual | G1 a G9, automáticas |
| Medidores y presupuestos (P9) | scripts en el repo con test | igual | igual | igual, más el trinquete estático |

La columna de Forge es la que automatiza más; las otras tres funcionan igual de bien si el dueño
hace a mano lo que Forge hace solo: pegar el prompt del peldaño en el momento correcto y exigir la
verificación de completitud antes de pasar al siguiente. Esa es, de hecho, la práctica del curso.

### Peldaño 0 — ¿Este proyecto se puede encarar así? (la elegibilidad)

Este peldaño tiene una historia particular. Pablo lo dijo el 17 de octubre: hay algo
previo a todo, que no está en ningún repositorio porque siempre llegó decidido —la
decisión de **si un proyecto se encara con este método o no**. Es un criterio que vivía en
su cabeza, y que vamos a elaborar juntos. Así que todo lo que sigue en este peldaño es, en
parte, confirmado por él, y en parte hipótesis mía para empezar la conversación. Lo
distingo con cuidado.

- **Intención**: decidir si un proyecto se encara con este método, y con un agente al
  frente, o no, ANTES de abrir el repositorio. Porque si entrás a un proyecto que no da,
  el método se degrada a "programar con IA" y ahí sí el dueño termina leyendo código.
- **Entradas**: el pedido del cliente, el dominio del negocio, los datos, la tecnología,
  los entornos disponibles, y quién va a ser el dueño.
- **Artefacto**: una ficha de elegibilidad de una página, con los criterios puntuados y la
  decisión: va, no va, o va con condiciones.
- **Compuerta**: los criterios excluyentes están todos en verde, y el puntaje de los que
  ponderan supera el umbral (umbral que todavía no definimos).
- **Quién decide**: hoy, Pablo. La idea es que el método permita que lo decida otra
  persona con la misma ficha.
- **Fallo que evita**: meterse en un proyecto donde el agente no puede verificarse solo, o
  donde no hay un dueño del dominio que decida, y terminar con el humano revisando código
  línea por línea.
- **Contrato (cómo se ejecuta)**: `docs/peldanos/peldano-00-elegibilidad.md`.

**Los dos criterios excluyentes que Pablo confirmó (17 de octubre).** Y ojo con este
detalle, que me parece muy fino: salen de los proyectos que Pablo *rechazó*, no de los que
aceptó. Los "no" definen la frontera mejor que los "sí".

| # | Criterio excluyente | Palabras de Pablo, textuales | Por qué mata el método |
|---|---|---|---|
| X1 | Tecnología heredada sin repositorio accesible, o con repositorios que no siguen un estándar | "Tecnologías legacy sin repo accesible o con repos no standard" | Sin un repositorio estándar no hay dónde dejar la evidencia: no hay pendientes citados en los commits (peldaño 5), ni tests que viajen con el código (7), ni integración y despliegue como paquete (13), ni documentación en el mismo commit (14). El agente trabaja a ciegas y no deja rastro verificable. |
| X2 | Tecnología que no se puede probar de punta a punta: no se pueden ejecutar las pantallas y acceder a cada elemento de la interfaz con sus distintos métodos, validando que el cambio llegó al backend | "No podemos testear el end to end desde la pantalla validando los cambios en el backend"; y después: "NAC3 no es obligatorio. SÍ testear desde la ejecución de las pantallas y el acceso a cada elemento de la interfaz con sus diferentes métodos" | Sin esa verificación de pantalla a backend el agente no puede probarse solo (peldaños 7, 9 y 10), y entonces el dueño tendría que leer código —que es justamente lo que el método promete evitar. |

Una precisión que Pablo hizo y que vale oro para la neutralidad de herramienta: **NAC3
(el protocolo que usa Forge para que las pantallas se puedan operar por programa) NO es
condición; es el medio con el que hoy lo logramos**. El criterio neutral queda así: la
interfaz se puede ejecutar por programa, y cada elemento de la pantalla es accesible con
sus distintos métodos (hacer clic, tipear, leer su estado), de modo que un test pueda
recorrer la pantalla y después verificar el efecto en el backend. Una tecnología cuya
interfaz no expone sus elementos a un "driver" (como Playwright, por ejemplo) queda
afuera, aunque tenga repositorio.

Y una lectura mía sobre estos dos: en el fondo son **la misma condición vista de dos
lados**. El agente tiene que poder verificarse solo, de punta a punta, y dejar la
evidencia en el repositorio. X1 es la mitad "¿dónde queda la evidencia?"; X2 es la mitad
"¿cómo se produce la evidencia?". Eso convierte a dos de mis hipótesis de abajo (D3 y D8)
en consecuencias de X1 y X2, no en criterios aparte.

`[hipótesis]` **Criterios candidatos que yo veo en los tres casos.** Estos hay que
confirmarlos, pesarlos y completarlos con Pablo; seguro faltan los que están en su cabeza.

| # | Criterio candidato | Cómo se vio en los casos | ¿Excluyente? |
|---|---|---|---|
| D1 | Hay un dueño del dominio con criterio y con tiempo para decidir (no para programar) | Pablo en los tres; "regla Pablo", "decisión Pablo" con fecha | `[?]` |
| D2 | Hay un "oráculo" de verdad verificable: datos reales, un sistema externo, producción en solo lectura | la Obra Social y su Autorizador como oráculo (el caso 1.355 contra 1.234); producción en solo lectura | `[?]` |
| D3 | El agente puede probar solo: acceso a entornos de prueba, integración continua, datos de prueba | UAT en los dos proyectos de la Asociación; un sembrador de datos anonimizados (pnd511) | absorbido por X2 |
| D4 | La tecnología está dentro de lo que el agente domina sin inventar (Node, Python, SQL, React) | los tres | `[?]` |
| D5 | El error tiene consecuencia real (plata, salud, operación), lo que justifica el fail-closed | la Obra Social (salud, cobros), la Asociación (familias) | `[?]` |
| D6 | La volumetría se puede conocer desde el día uno (dimensionamiento G9) | Kikan: 3,4 millones de filas por año; la Obra Social: 7.819 filas | `[?]` |
| D7 | El cliente tolera un tiempo de maduración y un humano en el circuito (no todo automático el día uno) | el aprobador automático con modo ensayo; el humano en el circuito de la Obra Social | `[?]` |
| D8 | Proyecto nuevo, o heredado pero auditable (si hay legado: se audita primero, y cero "fallback" al legado) | SQ 0.2; la herramienta de migración de Forge | absorbido por X1 |
| D9 | El alcance cabe en un repositorio y un dueño (sin coordinación entre varios equipos) | los tres | `[?]` |
| D10 | Los secretos y accesos se pueden aislar (bóveda, archivo de entorno, permisos acotados) | `forge-embed.env`, la clave de API mapeada a quien la creó | `[?]` |

**Preguntas para elaborar juntos**: de D1 a D10, ¿cuáles más son excluyentes y cuáles
ponderan? ¿Qué peso tiene cada uno? ¿Qué otros proyectos rechazó Pablo y por qué? Y, muy
importante, ¿hay criterios de negocio (margen, relación con el cliente, tiempo disponible
de Pablo) que no salen de ningún repositorio y que también deciden?

### Peldaño 1 — El contrato de convivencia (las reglas antes del código)

Antes de escribir una sola línea, humano y agente se ponen de acuerdo en cómo van a
trabajar. Parece una formalidad, y no lo es: es lo que evita el 80% de las frustraciones
del mes uno.

- **Intención**: fijar cómo trabajan el humano y el agente antes de la primera línea de
  código.
- **Entradas**: nada; es el primer archivo del proyecto.
- **Artefacto**: un documento de estándares de calidad (en Forge se llama `SQ.md`, pero
  puede llamarse como quieras) que diga, como mínimo: el tiempo del humano es sagrado (no
  se lo gasta en cosas que el agente puede resolver solo); cero deuda técnica, es decir,
  cuando algo se rompe se arregla de raíz y se agrega la regresión en la misma sesión; el
  alcance es exacto, ni más ni menos de lo pedido; se habla en el idioma del usuario; la
  documentación se actualiza en el mismo commit; y jamás se anuncia como hecho algo que
  no se hizo.
- **Compuerta**: el contrato está en el repositorio y se lee en cada sesión.
- **Quién decide**: el dueño. El agente puede proponer cambios, pero no edita el contrato
  por su cuenta.
- **Fallo que evita**: el agente que "ayuda" expandiendo el alcance porque le pareció
  buena idea; el que deja deuda "para después" (y el después nunca llega); y el que
  reporta como hecho lo que *cree* que hizo.
- **Evidencia**: `2219f7a` (25 de mayo); las reglas SQ 1 a 9 en `src/chat/server.ts`;
  `docs/SQ.md`, secciones 0.1 a 0.11.
- **Contrato (cómo se ejecuta)**: `docs/peldanos/peldano-01-contrato-de-convivencia.md`.

### Peldaño 2 — La definición del proyecto y la lectura obligatoria

Cada sesión del agente arranca de cero: no se acuerda de ayer. Entonces hay que darle un
mapa, y hay que obligarlo a leerlo antes de tocar nada.

- **Intención**: que cada sesión arranque sabiendo qué es el proyecto, en qué estado está
  y qué decisiones ya se tomaron.
- **Entradas**: el contrato (peldaño 1) y el pedido del cliente.
- **Artefacto**: un archivo de proyecto operativo (`PROJECT.md` o `CLAUDE.md`), y acá va
  un énfasis: CORTO. Es el programa, no el historial. Más un archivo de estado vivo (en
  Forge, `.forge/sumi-context.md`) con la especificación actual, la porción en la que se
  está trabajando, las decisiones recientes y las dudas abiertas. Y una memoria de
  decisiones.
- **Compuerta**: el agente lee el mapa antes de tocar código. En Forge esto es una regla
  explícita: "leé primero el grafo de conocimiento".
- **Quién decide**: el dueño define; el agente lo mantiene al día.
- **Fallo que evita**: dos, bien concretos. Uno: trabajo descartable por no haber leído el
  mapa (me pasó el 12 de junio y costó una tarde). Dos: el `CLAUDE.md` de Kikan que creció
  hasta 9.661 líneas y 789 kilobytes, imposible de leer para nadie —el archivo operativo y
  el libro de casos tienen que ser archivos distintos.
- **Evidencia**: SQ 1.1 (lectura obligatoria); memoria `feedback_read_knowledge_graph_first`;
  `AUDITORIA_CALIDAD_CODIGO_2026_10_15.md`.
- **Contrato (cómo se ejecuta)**: `docs/peldanos/peldano-02-definicion-y-lectura.md`.

### Peldaño 3 — Dimensionar antes de diseñar la arquitectura

Este es el peldaño que más caro cuesta saltearse, y lo sabemos porque lo salteamos.

- **Intención**: que las decisiones estructurales (qué motor de base de datos, si la
  interfaz es sincrónica o asincrónica, cuánta concurrencia) se tomen con números y no
  con gusto.
- **Entradas**: un relevamiento de datos de volumetría hecho con el negocio (entidades,
  eventos, operadores en el pico, conservación, cargas excepcionales), por naturaleza
  incompleto; y acceso de lectura al sistema anterior si existe. Hay datos que **solo el
  negocio tiene** y el modelo no puede inferir: por eso el prompt le exige evaluar si están
  completos y pedir los que falten, en vez de estimarlos con cara de seguro.
- **Artefacto**: un registro de dimensionamiento con opciones FIJAS (no una lista
  abierta: tres o cuatro opciones concretas) y la elegida. En Forge es la compuerta G9. Y
  las decisiones "asimétricas" declaradas explícitamente —por ejemplo, "la interfaz de
  persistencia es asincrónica desde la línea uno aunque el primer motor sea sincrónico",
  porque si estás equivocado cuesta poco y si no lo hacés cuesta una fortuna.
- **Compuerta**: el dimensionamiento está registrado antes de armar el esqueleto.
- **Quién decide**: el dueño elige entre las opciones fijas; el agente las presenta con
  números.
- **Fallo que evita**: el de Kikan. Se arrancó con un almacenamiento en archivos JSON, y
  cuando se midió resultó que el sistema iba a generar 3,4 millones de filas por año.
  Cambiar la interfaz de persistencia después costó la etapa E6 de la reingeniería: tres
  baterías de tests enteras pasadas a asincrónico, más de una semana.
- **Evidencia**: `0bd1b05` (dimensionamiento, 11 de octubre); `7391cc5` (interfaz de
  persistencia, 13 de octubre); SQ 1.2 y 1.3; `docs/doctrine/sizing.md` (los "cuatro
  agujeros", más el quinto).
- **Contrato (cómo se ejecuta)**: `docs/peldanos/peldano-03-dimensionar.md`.

### Peldaño 4 — El esqueleto con sus compuertas

Antes de que el sistema haga algo útil, tiene que arrancar, testearse y desplegarse
VACÍO. Sí, vacío. Porque descubrir el despliegue al final es carísimo.

- **Intención**: tener un sistema que arranca, se prueba y se despliega sin ninguna
  funcionalidad todavía.
- **Entradas**: el dimensionamiento (peldaño 3) y el tipo de flujo (proyecto nuevo,
  corrección, o evolución de algo que ya existe).
- **Artefacto**: el esqueleto con la integración continua en verde, la estructura de
  tests armada, un despliegue a un entorno de prueba que funciona, y las compuertas G1 a
  G9 declaradas.
- **Compuerta**: el esqueleto está en verde, la integración continua corre, y el
  despliegue al entorno de prueba funciona con cero funcionalidades.
- **Quién decide**: el agente ejecuta; el dueño aprueba visualmente (con una captura de
  pantalla o una prueba automatizada que la genere).
- **Fallo que evita**: en Kikan el despliegue llegó el 23 de septiembre, un mes después
  del arranque, y entre el 30 de septiembre y el 4 de octubre hubo cinco pendientes
  seguidos solo para que el despliegue funcionara bien. Si el esqueleto se hubiera
  desplegado vacío la primera semana, esos cinco golpes se habrían dado con cero
  funcionalidad en juego.
- **Evidencia**: `docs/doctrine/gates.md`; `workflow-kinds.md` (proyecto nuevo, pasos 6 de
  18); la política de testing, "scaffold gate green"; `ci.yml` de Kikan, 28 de agosto.
- **Contrato (cómo se ejecuta)**: `docs/peldanos/peldano-04-esqueleto.md`.

### Peldaño 5 — El plan son los pendientes

Acá hay una idea que, cuando la agarrás, no la soltás más: no hay "plan" por un lado y
"lista de tareas" por el otro. **La lista de pendientes ES el plan.**

- **Intención**: una sola cola de trabajo, con orden y con compuerta, que sea la verdad
  del proyecto.
- **Entradas**: la especificación inicial, las auditorías, los pedidos del cliente, y los
  golpes.
- **Artefacto**: un registro de pendientes numerados (PND-001, PND-002…), cada uno con
  título, estado, la decisión que lo originó y el test que lo cierra. Y cada commit cita
  su pendiente.
- **Compuerta**: ningún cambio entra sin un pendiente; y el pendiente se cierra con
  evidencia, no con "ya está".
- **Quién decide**: el dueño prioriza; el agente propone y ejecuta en orden.
- **Fallo que evita**: la especificación que "se supera" y queda obsoleta a las dos
  semanas (le pasó a Autorizaciones con su documento de diseño inicial); y el trabajo del
  que, seis meses después, nadie sabe por qué se hizo.
- **Evidencia**: `4fc82c6` (6 de junio); `docs/PENDING_REGISTRY_PLAN.md`; 641 pendientes
  en Autorizaciones; 19 documentos de pendientes en Kikan; memoria
  `project_pending_registry_is_plan`.
- **Contrato (cómo se ejecuta)**: `docs/peldanos/peldano-05-pendientes.md`.

### Peldaño 6 — Las decisiones se escriben junto al código

Cada regla de negocio y cada decisión estructural tiene que tener un dueño, una fecha y
un lugar donde está escrita. Si no, en seis semanas nadie sabe si "aprobada más saldo
vuelve a la cola" fue una decisión del cliente o una ocurrencia del agente.

- **Intención**: que cada regla de dominio o decisión estructural tenga dueño, fecha y
  lugar.
- **Entradas**: la conversación con el dueño.
- **Artefacto**: la decisión escrita en el commit, en el documento del pendiente, o en un
  registro de decisiones. Y cuando el dueño no contestó y el agente tuvo que elegir,
  queda marcado como "decisión por omisión" para que se pueda revisar.
- **Compuerta**: una regla de negocio no entra al código sin su frase de origen.
- **Quién decide**: el dueño. Siempre. Sin excepciones.
- **Fallo que evita**: discutir seis semanas después por qué algo es así; y, peor, el
  agente inventando reglas de dominio porque le parecieron razonables.
- **Evidencia**: `0ae3ae6 (pnd550)`, con el texto "regla Pablo" y "decisión Pablo
  2026-08-10" adentro del commit; `docs/DIRECTOR_DECISIONS_2026_06_04.md`; SQ 7
  (memoria de decisiones).
- **Contrato (cómo se ejecuta)**: `docs/peldanos/peldano-06-decisiones.md`.

### Peldaño 7 — Tests como candados, probados en rojo

Un test que nunca viste fallar no sabés si prueba algo. Por eso acá la regla no es
"escribí tests"; es "demostrá que el test se pone en rojo contra el código viejo".

- **Intención**: que cada comportamiento que importa tenga un test que FALLA si se rompe,
  y que se sepa, con certeza, que falla.
- **Entradas**: el cambio ya implementado (por defecto los tests van después de
  implementar; el "primero el test" queda como opción para alcances chicos).
- **Artefacto**: el test nuevo, más la regresión de los pendientes vecinos corrida en la
  misma sesión. Y en el commit, textual: "probado en ROJO contra el criterio viejo",
  "verificado ROJO 4 de 8".
- **Compuerta**: rojo demostrado → verde → regresión en verde. Y el agente no se mockea a
  sí mismo (no reemplaza con simulaciones las partes que justamente quiere probar).
- **Quién decide**: el agente ejecuta y reporta; el dueño no revisa el test, revisa el
  reporte.
- **Fallo que evita**: los tests que pasan porque no prueban nada; y el verde que esconde
  un bug —nos pasó que una batería entera "moría" por falta de memoria y parecía un test
  fallando (`1d7a20b`).
- **Evidencia**: `docs/doctrine/testing-policy.md` (4 de junio); `ab3e529 (pnd517)`;
  `0ae3ae6 (pnd550)`; `e18406d (pnd452)`, "roja sin el try/except".
- **Contrato (cómo se ejecuta)**: `docs/peldanos/peldano-07-tests-en-rojo.md`.

### Peldaño 8 — Simetría entre productor y consumidor, y el registro de anti-patrones

Cuando cambiás una punta (el servidor, el robot, el esquema de la base), la otra punta
(la pantalla, el contador, el que consume) tiene que cambiar en el mismo commit. Si no,
tarde o temprano divergen, y el usuario ve un número en un lado y otro número en el otro.

- **Intención**: que un cambio en una punta arrastre la otra, siempre, en el mismo commit.
- **Entradas**: cualquier cambio de contrato entre dos partes del sistema.
- **Artefacto**: el servidor define la lista (las columnas, las causas, las compuertas) y
  el consumidor la lee de ahí, en vez de tener su propia copia. Más el registro de
  GOTCHAS: cada anti-patrón con su olor, su causa raíz, su arreglo y cómo detectarlo antes.
- **Compuerta**: es automática (regla SQ 14): el agente busca el otro lado antes de dar
  por cerrado un cambio.
- **Quién decide**: nadie; es automático.
- **Fallo que evita**: el contador que no coincide con la consulta (1.355 contra 1.234);
  la deriva entre la versión web y la móvil (GOTCHAS G-2); dos copias del mismo módulo que
  se desincronizan (G-3; en Kikan hay 8 módulos duplicados entre web y móvil, detectados
  en la auditoría).
- **Evidencia**: SQ 14; `docs/GOTCHAS.md` (27 de mayo); `50fe968 (pnd510)`;
  `7251129 (pnd509)`.
- **Contrato (cómo se ejecuta)**: `docs/peldanos/peldano-08-simetria-y-antipatrones.md`.

### Peldaño 9 — Medir antes de construir, con un instrumento que también se verifica

Este es, para mí, el peldaño más "adulto" de todos, y el que más tardó en aparecer. La
regla es: todo número que alimenta una decisión sale de un programa con test. No de un
`grep`, no de una impresión, no de "me parece que son como cien".

- **Intención**: que todo número que alimenta una decisión salga de un instrumento con
  test, y que el instrumento mismo se audite.
- **Entradas**: una hipótesis (del dueño o del agente) sobre una causa, una cantidad o un
  costo.
- **Artefacto**: un "medidor con guarda" (un script más un test que lo protege) que viaja
  en el repositorio; un presupuesto por camino (cuántas consultas, cuántos bucles) apretado
  a lo medido más un margen chico; y un "trinquete", un contador que solo puede bajar.
- **Compuerta**: las cinco reglas de la sección 11.b de Kikan: (1) medidor con guarda;
  (2) si el instrumento no existe, se construye; (3) se audita en dos direcciones (del
  código a la medida y de la medida al código); (4) lo aproximado se marca como
  aproximado; y (5) el que ejecuta verifica los números del que planificó.
- **Quién decide**: el número. El dueño trae la hipótesis; el agente la mide antes de
  construir. Y una observación de meses de trabajo con Pablo: él suele tener razón en el
  síntoma, y la causa suele estar al lado de donde él la ubica —por eso se mide, no se
  discute.
- **Fallo que evita**: los "121 bucles" que eran 79; las "27 carreras" que eran 44; el
  medidor que mentía porque la base ya tenía aplicado un cambio de esquema; el trinquete
  con el contador en cero que no estaba viendo 84 llamadas.
- **Evidencia**: `REINGENIERIA_PERSISTENCIA_SQL.md`, sección 11.b; `880ac0f`, `f955620`,
  `1d55a93`, `0730082` (63 sobre 60); `_diag_pnd517_counters.py`; memorias
  `feedback_medidor_con_guarda`, `feedback_medir_la_hipotesis`,
  `feedback_validar_limites_con_el_log`.
- **Contrato (cómo se ejecuta)**: `docs/peldanos/peldano-09-medir.md`.

### Peldaño 10 — Verificación honesta y reporte proporcional

Si el dueño no va a leer código, el reporte del agente tiene que ser confiable. No
"optimista", no "completo en apariencia": confiable. Y eso tiene reglas.

- **Intención**: que el reporte del agente sea confiable sin que el dueño lea código.
- **Entradas**: el trabajo hecho.
- **Artefacto**: un reporte que separa claramente lo "verificado" de lo "creído"; que
  declara sus puntos ciegos (qué no pudo probar); que cubre cada ítem de lo que se pidió,
  uno por uno; y que cita la evidencia (el log, el test, el número).
- **Compuerta**: ninguna afirmación sin su prueba. "Listo" se dice solo con la disciplina
  de "listo" (SQ 5). Y ante un "sigue roto", lo primero es comparar qué versión está
  publicada contra cuál tiene el arreglo, antes de volver a diagnosticar.
- **Quién decide**: el dueño confía, o pide la evidencia. Nunca revisa el código.
- **Fallo que evita**: el error de autenticación que Forge reportó como "éxito" (14 de
  octubre); anunciar trabajo no hecho (SQ 9c); y el agente que dice "arreglado" cuando el
  arreglo está en el repositorio pero todavía no se publicó.
- **Evidencia**: `docs/doctrine/verification-honesty.md` (10 de junio); SQ 9a, 9b y 9c;
  SQ 5; memoria `feedback_check_published_version_first`.
- **Contrato (cómo se ejecuta)**: `docs/peldanos/peldano-10-verificacion-honesta.md`.

### Peldaño 11 — La auditoría periódica como insumo del plan

Cada tanto hay que mirar el sistema entero con ojos frescos. Y lo que se vea no va a un
informe que se archiva: va a la cola de pendientes.

- **Intención**: mirar el sistema completo cada tanto y convertir lo visto en pendientes.
- **Entradas**: el repositorio entero, y producción en solo lectura.
- **Artefacto**: un informe con hallazgos graduados (P0 lo urgente, P1, P2…; o notas por
  dimensión) que termina en pendientes numerados. Idealmente lo hace un auditor distinto
  del constructor: en nuestro caso, yo (Sumi) audito lo que Forge construye, y Forge
  absorbe los hallazgos.
- **Compuerta**: cada hallazgo P0 tiene un pendiente abierto antes de dar por cerrada la
  auditoría.
- **Quién decide**: el dueño prioriza los hallazgos.
- **Fallo que evita**: una contraseña de superadministrador escrita a fuego en el código
  que nadie había visto; 264 consultas que leían tablas enteras; una vulnerabilidad
  conocida en una dependencia; un componente de pantalla de 2.679 líneas.
- **Evidencia**: full-scan del 23 de junio y seguridad del 16 de julio (Autorizaciones);
  AUD-* → 19 pendientes (Kikan, 28 de agosto); `INTEGRIDAD_..._10_14.md`, absorbido en
  `b266f11`; `AUDITORIA_CALIDAD_..._10_15.md`.
- **Contrato (cómo se ejecuta)**: `docs/peldanos/peldano-11-auditoria.md`.

### Peldaño 12 — Fail-closed, candados y cero daño silencioso

Ante la duda o la falla, el sistema NO actúa. Y lo dice. Esto suena obvio, pero es lo
contrario de lo que hace el software por defecto, que ante la duda sigue adelante.

- **Intención**: que el sistema, ante duda o falla, no actúe, y que avise.
- **Entradas**: cualquier acción con consecuencia (cobrar, enviar, aprobar, borrar).
- **Artefacto**: candados (doble seguro, botón de pánico), un modo de ensayo antes de
  automatizar de verdad, un vigía que empuja con guardas, permisos y aprobaciones
  explícitas para el agente, y búsquedas que si fallan no rompen la pantalla.
- **Compuerta**: toda acción irreversible tiene candado y un camino de vuelta documentado.
- **Quién decide**: el dueño aprueba el candado; el sistema no lo saltea jamás.
- **Fallo que evita**: un doble cobro; una aprobación automática sin que pase por un
  humano; un `git add -A` que sube un token al repositorio; borrar datos del cliente.
- **Evidencia**: `0954740 (pnd524)`; `e18406d (pnd452)`; el aprobador automático en modo
  ensayo; SQ 0.3 (cero daño silencioso); los verbos NAC3 con aprobación.
- **Contrato (cómo se ejecuta)**: `docs/peldanos/peldano-12-fail-closed.md`.

### Peldaño 13 — Integración continua, entornos, secretos y despliegue como parte del producto

Llegar a producción tiene que ser un paquete reproducible: los tests se corren UNA vez, la
configuración vive fuera del repositorio, y los secretos no andan dando vueltas.

- **Intención**: que llegar a producción sea un paquete reproducible, con los tests
  corridos una sola vez y la configuración fuera del repositorio.
- **Entradas**: el esqueleto (peldaño 4) y los tests (peldaño 7).
- **Artefacto**: una integración continua que corre la batería; un despliegue que espera
  el resultado de esa integración y solamente empaqueta y sube; la configuración solo en
  el servidor (en un archivo de entorno o una bóveda); una promoción explícita del
  entorno de prueba al de producción; un procedimiento (runbook) que se puede correr dos
  veces sin romper nada; y la cuota de minutos de integración continua vigilada.
- **Compuerta**: el entorno de prueba en verde antes de tocar producción; la vuelta atrás
  (rollback) probada; y ningún secreto en el repositorio ni en el chat —si se pegó uno por
  error, se rota.
- **Quién decide**: el dueño promueve a producción; el agente prepara todo.
- **Fallo que evita**: los tests corriendo tres veces por cada commit (de 16 a 27 minutos
  cada uno; 2.000 minutos en 16 días, cuota fundida); la clave de la base de datos
  impresa en una transcripción; el CORS derivado solo del primer nombre de dominio del
  servidor; la configuración pisada por la batería de tests (PND-107).
- **Evidencia**: `39497b0` (gate-ci); `0bd20a8 (PND-107)`; `513c8d0 (PND-108)`;
  `7658e2e` (promoción); memorias `project_kikan_deploy_solo_empaqueta` y
  `project_embed_apikey_environmentfile`.
- **Contrato (cómo se ejecuta)**: `docs/peldanos/peldano-13-ci-entornos-secretos-deploy.md`.

### Peldaño 14 — Documentación viva y manuales que una persona puede seguir sin IA

El sistema tiene que poder usarse, mantenerse y recuperarse sin el agente y sin la persona
que lo construyó. Si el día que no está el agente no se puede desplegar, no está terminado.

- **Intención**: que el sistema se pueda usar, mantener y recuperar sin el agente y sin el
  constructor.
- **Entradas**: cada cambio (en Forge, la compuerta G-DOC).
- **Artefacto**: el manual de usuario, el de mantenimiento, el manual interno de
  infraestructura "reproducible a mano, sin IA", el de recuperación ante desastres, y el
  diario de cambios. Todo en el mismo commit que el cambio que lo motivó.
- **Compuerta**: la documentación está al día (SQ 4); el manual se regenera junto con el
  sistema.
- **Quién decide**: el agente mantiene; el dueño lee el manual, no el código.
- **Fallo que evita**: un documento de gestión de repositorios desactualizado que provocó
  un commit en el repositorio equivocado; y el `CLAUDE.md` convertido en historial de
  cambios.
- **Evidencia**: SQ 3.3, 3.4 y 6; el manual del 26 de junio; `6444ce6 (pnd442)`;
  `a30cee3 (pnd459)`; el manual de Kikan con imágenes incrustadas del 16 de octubre.
- **Contrato (cómo se ejecuta)**: `docs/peldanos/peldano-14-documentacion-viva.md`.

### Peldaño 15 — El agente adentro del sistema, y la retrospectiva con número

El último peldaño tiene dos partes que parecen distintas pero cierran el mismo ciclo.
Primero: el agente queda residente en producción, con alcance acotado. Segundo: el método
mismo se revisa con números, y lo que se aprende vuelve al peldaño 0 para el próximo
proyecto.

- **Intención**: que el agente quede residente en producción con alcance acotado
  (diagnóstico → operación → soporte), y que el método se revise con números.
- **Entradas**: el sistema en producción, los incidentes, los costos.
- **Artefacto**: el agente embebido con un mapa del sistema obligatorio, permisos
  acotados, una clave de API que actúa como la persona que la creó, y tickets. Más una
  retrospectiva escrita con medición (un paper, un informe) que cambia el método y vuelve
  al peldaño 0.
- **Compuerta**: el agente embebido no puede hacer lo que el dueño no aprobó; y la
  retrospectiva produce al menos un cambio en la escalera.
- **Quién decide**: el dueño.
- **Fallo que evita**: el equipo multiagente que gastaba el doble y entregaba la mitad (se
  mató con números el 5 de junio); y el agente operando dentro de un sistema sin tener un
  mapa de ese sistema.
- **Evidencia**: `docs/PAPER_SUMI_VS_AGENTIC.md`; `7584f8b`; `1c7c0b5` (el embebido,
  PND-147); `c602725` (modo operación); `20fdbe7` y `1558ee4` (PND-257 y PND-223);
  la memoria del asistente residente en producción.
- **Contrato (cómo se ejecuta)**: `docs/peldanos/peldano-15-agente-residente-y-retrospectiva.md`.

---

## Parte C — Los fallos reales, y qué peldaño cubre cada uno

Esta tabla es, en cierto modo, la prueba de la escalera: cada golpe que nos dimos tiene
que caer en algún peldaño. Si hay un golpe que no cae en ninguno, falta un peldaño.

| Fallo (y cuándo pasó) | Peldaño que lo cubre | ¿Está cerrado? |
|---|---|---|
| El equipo multiagente: 60 dólares y 73 minutos para una entrega a medias (5 de junio) | 15, retrospectiva con número | sí (se rediseñó) |
| Trabajo descartado por no leer el mapa (12 de junio) | 2, lectura obligatoria | sí |
| PND-300: tres arreglos que no eran de raíz (14 de julio) | 1, cero deuda / 9, medir | sí (en la cuarta ronda) |
| El contador 1.355 contra 1.234 (7 de agosto) | 9, instrumento / 8, simetría | sí |
| 3,4 millones de filas por año sobre archivos JSON, interfaz sincrónica (11 de octubre) | 3, dimensionar | sí (etapas E1 a E12) |
| Medidores que mentían: 27 que eran 44, el trinquete en cero (13 de octubre) | 9, verificar el instrumento | sí |
| El turno huérfano de 1 hora 43, seis commits invisibles (14 de octubre) | 10, verificación honesta / 12, fail-closed | sí (versión 1.18.0) |
| Tests corridos tres veces por commit; cuota de GitHub Actions fundida (14 de octubre) | 13, integración como producto | sí (gate-ci); la cuota la tiene que ampliar Pablo |
| Dos puertas de administrador en 24 horas (15 de octubre) | 11, auditoría externa / 12, candados | sí (PND-223 retirada) |
| La clave de MariaDB y las claves `yerp_` pegadas en el chat (14 y 16 de octubre) | 13, secretos | la rotación está pendiente de Pablo |
| "reported error: success" (14 de octubre) | 10, reporte proporcional | pendiente (es un arreglo de una línea) |
| El `CLAUDE.md` de 9.661 líneas (15 de octubre) | 2, archivo operativo contra libro de casos | pendiente |
| CORS derivado del primer nombre de dominio; el asistente de configuración de UAT daba error 500 (16 de octubre) | 13, despliegue / 8, simetría | el prompt para Forge está entregado; pendiente de aplicar |
| Forge Mobile pierde las pestañas (16 de octubre) | 10 / 12 | diagnóstico hecho; el arreglo está pendiente |

---

## Parte D — Lo que falta elaborar (para la próxima pasada)

Hecho en la versión 2 (17 de octubre, tarde): la tesis de apertura ("la IA no interrumpe el
método: lo continúa"), los dieciséis contratos de peldaño en `docs/peldanos/`, y el repositorio
propio del método. Hecho en la versión 3: el nombre, los contratos enriquecidos (tamaño, señales
de alarma, prompts en inglés con explicación), la guía por tamaño de proyecto y la guía por
herramienta. Queda:

1. **El peldaño 0 completo**: la lista real de criterios (los de Pablo más mis hipótesis),
   cuáles excluyen y cuáles ponderan, los pesos, el umbral, y los proyectos rechazados
   como contraejemplos. Ya tenemos X1 y X2; faltan los demás.
2. **El orden y la agrupación**: la escalera tiene tres tramos (arranque, del 0 al 4;
   bucle, del 5 al 10; operación, del 11 al 15). Hay que confirmar si se enseña así o si
   conviene empezar por el bucle, que es lo que un alumno va a usar todos los días.
3. **Un nombre memorable para cada peldaño**, de una frase, para los manuales y las
   publicaciones.
4. ~~Qué es mínimo y qué es opcional según el tamaño del proyecto~~ — **propuesto** en la
   tabla "Qué es obligatorio y qué es proporcional", marcada como hipótesis hasta que un
   proyecto la confirme.
5. **El mapeo a Forge**: qué peldaños ya son compuertas o comandos (G1 a G9, el registro
   de pendientes, el dimensionamiento, las doctrinas) y cuáles faltan para poder exportar
   la escalera como un flujo de ejecución.
6. **La práctica**: el manual-curso (`docs/MANUAL_CURSO.md`), con una tarea práctica por
   peldaño que un alumno pueda repetir en su propio repositorio hasta tener la aplicación en
   producción. En curso.
7. **Lo que NO está en la escalera y debería estar** `[hipótesis]`: el manejo del costo
   de tokens y de cuotas como un presupuesto explícito (hoy es reactivo: nos enteramos
   cuando se funde); la rotación de secretos como rutina y no como incidente; y un criterio
   para cuándo el humano SÍ tiene que mirar código —hoy la respuesta es "nunca", pero los
   dos informes de esta semana sugieren que hay momentos puntuales en los que conviene.
8. ~~El nombre~~ — **hecho**: Urazuke, el método de la evidencia (D-014, 17 de octubre).
9. **La presentación pública en yujin.app**: una página del método con sus puntos destacados,
   en varios idiomas, construida con NAC3 (el repositorio de las páginas es
   `pkuschnirof/rpaforce`, carpeta `C:\RPAForce\web\yujin.app\`). Ya tiene nombre; falta la estructura multilingüe
   (D-013): castellano como fuente, siete traducciones, y los prompts en inglés como una sola pieza
   explicada en cada idioma.
10. **Probar los contratos en un proyecto real.** Los dieciséis prompts están escritos desde
    lo que hicimos, no ejecutados tal cual. El primer proyecto que los use de punta a punta
    va a corregir varios; eso es parte del peldaño 15.

---

## Glosario

Cada sigla, cada nombre propio y cada expresión coloquial que aparece en este documento,
explicada. Está en orden alfabético.

**A los golpes** — Aprender algo porque salió mal, no porque alguien lo explicó antes. Se
usa en el sentido de "estas reglas se aprendieron a los golpes".

**Autorizador (el)** — Así llama este documento al sistema de la Obra Social que recibe las órdenes y devuelve un
veredicto (aprobada, rechazada). Para nosotros funciona como "oráculo": la verdad contra
la que se verifican los contadores.

**Asociación (la)** — Así llama este documento al cliente del sistema Kikan (su nombre real queda reservado): una asociación civil que atiende familias y necesitaba
una mesa de atención omnicanal (varios canales de contacto en un solo lugar) y campañas.

**Agente** — Un programa de inteligencia artificial que no solo contesta preguntas sino
que ejecuta acciones: lee archivos, escribe código, corre comandos, hace commits. En este
documento, "el agente" es Forge o Sumi (ver abajo).

**Al cuete** — Expresión rioplatense: en vano, sin sentido, desperdiciando algo.

**Anonimización** — En este documento los clientes reales se llaman "la Obra Social", "el
Autorizador" y "la Asociación", y sus sistemas "Autorizaciones" y "Kikan". Es a propósito:
los nombres quedan reservados hasta tener permiso para usarlos.

**Anti-patrón** — Una forma de hacer las cosas que parece razonable pero que se sabe que
termina mal. Lo contrario de un "patrón" (una buena práctica probada).

**Apretar el techo** — Bajar un límite (un presupuesto, un máximo permitido) hasta que
quede justo por encima de lo medido, para que cualquier empeoramiento haga fallar un
test.

**Artefacto** — Algo concreto que queda producido: un archivo, un test, un script, un
documento. En la escalera, cada peldaño deja un artefacto.

**Asincrónico / sincrónico (async / sync)** — Una llamada sincrónica se queda esperando el
resultado antes de seguir; una asincrónica deja la tarea en marcha y sigue, y después
recoge el resultado. Las bases de datos reales en Node son asincrónicas; por eso la
interfaz tiene que serlo desde el principio.

**AUD-*** — La serie de auditorías numeradas que se hicieron en Kikan en agosto (AUD-1,
AUD-2…), y que generaron pendientes.

**AutoAprobador** — En el sistema de la Obra Social, el robot que aprueba órdenes automáticamente
según reglas. Primero se corrió en "modo ensayo" (ver dry-run) antes de dejarlo actuar.

**Autopilot (piloto automático)** — Un mandato escrito para que el agente trabaje solo
durante horas (24 o 48) haciendo commits y pushes sin preguntar, y entregue un resumen al
final.

**await** — En JavaScript, la palabra que indica "esperá el resultado de esta llamada
asincrónica". Una llamada a la base de datos sin `await` es un bug silencioso: el código
sigue antes de tener el dato.

**Backend** — La parte del sistema que no se ve: el servidor, la lógica, la base de datos.
Lo contrario de "frontend" (la pantalla).

**Batería (de tests)** — El conjunto completo de tests de un proyecto, corridos todos
juntos.

**Bóveda (vault)** — Un lugar cifrado donde se guardan secretos (claves, contraseñas) en
vez de dejarlos en archivos de texto.

**Bucle (loop)** — Un trozo de código que se repite. "Bucle N+1" es un anti-patrón
clásico: hacer una consulta a la base por cada fila de un resultado, en vez de una sola
consulta para todas.

**Candado** — Una protección que impide que una acción peligrosa ocurra sin una condición
explícita. Por ejemplo, el botón de pánico tiene un candado dedicado: no se puede apretar
por accidente.

**Causa raíz** — El motivo real de un problema, en oposición al síntoma. Arreglar el
síntoma hace que el problema vuelva; arreglar la causa raíz, no.

**CI (integración continua)** — Un servicio (acá, GitHub Actions) que corre los tests
automáticamente cada vez que se sube código.

**CLAUDE.md / PROJECT.md** — El archivo que el agente lee al empezar cada sesión para saber
qué es el proyecto y cómo trabajar en él.

**Commit** — Un punto guardado en la historia del código, con un mensaje que explica qué
cambió y por qué. Cada commit tiene un identificador corto (por ejemplo `2219f7a`).

**Compuerta (gate)** — Una condición que tiene que cumplirse para poder avanzar. Si no se
cumple, no se pasa. En Forge están numeradas G1 a G9.

**Concurrencia** — Cuántas cosas pasan al mismo tiempo en el sistema (usuarios
simultáneos, procesos en paralelo).

**CORS** — Un mecanismo de seguridad de los navegadores que decide desde qué dominios se
puede llamar a un servidor. Mal configurado, bloquea llamadas legítimas con errores
confusos.

**Crew multiagente** — El equipo de cinco agentes especializados (director, analista,
programador, tester, armador) que Forge tenía al principio y que se eliminó el 5 de junio
porque gastaba el doble y entregaba la mitad.

**CVE** — Un identificador público de una vulnerabilidad de seguridad conocida en algún
componente de software.

**Deuda técnica** — Lo que queda mal hecho "para arreglar después". El método la prohíbe:
lo que se rompe se arregla de raíz en la misma sesión.

**Doctrina** — En Forge, un documento corto que fija cómo se hace algo (cómo se testea,
cómo se verifica, cómo se dimensiona). Hay 31. Es la forma que toma el método dentro de la
herramienta.

**Driver (criterio)** — Un factor que empuja una decisión en un sentido u otro. En el
peldaño 0, los drivers son los factores que deciden si un proyecto es elegible.

**Dry-run (modo ensayo)** — Correr un proceso "en seco": hace todo menos la acción final.
El AutoAprobador corrió así primero, mostrando qué habría aprobado sin aprobar nada.

**E1 a E12** — Las doce etapas de la reingeniería de persistencia de Kikan (el cambio de
almacenamiento en archivos JSON a una base de datos MariaDB).

**Embebido (embed, Forge Embedded)** — Forge instalado adentro del sistema del cliente,
como asistente residente, con permisos acotados.

**End to end (E2E, de punta a punta)** — Probar el sistema completo, desde la pantalla
hasta la base de datos, como lo usaría una persona.

**Entorno** — Una instalación separada del sistema. Los habituales: desarrollo (la máquina
del programador), UAT (prueba del cliente) y PROD (producción, la de verdad).

**Esqueleto (scaffold)** — La estructura inicial de un proyecto, sin funcionalidad: arranca,
tiene tests vacíos, se despliega.

**Fail-closed** — "Falla cerrado": ante la duda o el error, el sistema no actúa. Lo
contrario de "fail-open", que ante la duda sigue adelante.

**Fallback (al legado)** — Volver a un camino viejo cuando el nuevo falla. El método lo
prohíbe (SQ 0.2): si hay un sistema viejo, se audita y se migra; no se deja como red de
seguridad silenciosa.

**Fixture** — Datos de prueba que se cargan antes de correr un test o un despliegue.

**Flip (interruptor)** — Un cambio de configuración que elige entre dos caminos (por
ejemplo, el motor viejo o el nuevo) sin tocar código.

**Forge (Yujin Forge)** — La herramienta que construyó Pablo: una capa sobre Claude Code
que le agrega el método (doctrinas, compuertas, pendientes, un panel de chat, una app
móvil, y el modo embebido). `yf` es su comando.

**Frontend** — La parte visible del sistema: las pantallas.

**Full scan** — Una consulta a la base de datos que lee la tabla entera porque no tiene un
índice que la ayude. Con tablas chicas no se nota; con millones de filas, tumba el
sistema.

**Fundir la cuota** — Agotar el presupuesto de algo (minutos de integración continua,
tokens de la IA) antes de tiempo.

**G-DOC** — En Forge, la compuerta que exige que la documentación se actualice en el mismo
commit que el cambio.

**gate-ci** — El trabajo del despliegue de Kikan que espera a que la integración continua
termine en verde antes de empaquetar. Creado el 14 de octubre.

**GCP** — Google Cloud Platform, la nube donde corren los servidores de los dos sistemas
de la Asociación.

**Golpe** — Un incidente, un error que dolió. "Golpe → regla" es el patrón de nacimiento
de todas las doctrinas.

**GOTCHAS** — Un archivo que registra "trampas" conocidas: errores que ya nos comimos una
vez, con su olor, su causa raíz, su arreglo y cómo detectarlos antes.

**Greenfield / brownfield** — Un proyecto nuevo desde cero (greenfield, "campo verde")
contra uno que parte de algo existente (brownfield, "campo marrón").

**Grep** — Un comando que busca texto en archivos. "Medidor, no grep" significa: un número
importante no se obtiene contando con una búsqueda de texto, sino con un programa con
test.

**Heap** — La memoria que usa un programa. "La batería moría por heap" quiere decir que
los tests se quedaban sin memoria y parecía que fallaban.

**HITL (human in the loop, humano en el circuito)** — Un diseño donde una persona aprueba
antes de que el sistema actúe. En la Obra Social, el aprobador manual.

**Huérfano (turno huérfano)** — Un proceso que sigue corriendo cuando el que lo lanzó ya
lo perdió de vista. El 14 de octubre un turno de Forge trabajó una hora cuarenta y tres
así.

**Índice** — Una estructura auxiliar de la base de datos que hace rápida una búsqueda.
Sin índice, la consulta es un full scan.

**IPC (correa entre procesos)** — Un canal entre dos procesos. En Forge 1.18.0 se usó
como "correa": si el proceso padre muere, el hijo se entera y se apaga.

**JSON (almacenamiento en)** — Guardar los datos en archivos de texto con formato JSON
en vez de en una base de datos. Sirve para empezar; no sirve para millones de filas.

**Kikan** — El sistema de mesa de atención omnicanal y campañas de la Asociación, el
segundo sistema productivo.

**Legado (legacy)** — Un sistema viejo que sigue en uso.

**Log** — El registro de lo que un programa va haciendo. "Validá con el log" significa:
no confíes en lo que el agente dice que hizo, mirá el registro.

**MariaDB** — El motor de base de datos SQL que usa Kikan en producción.

**Medidor con guarda** — Un script que mide algo (cuántas consultas, cuántos bucles) y
que tiene un test propio que verifica que el medidor mide bien. "Con guarda" quiere
decir "protegido por un test".

**Mentir (un medidor)** — Cuando un instrumento devuelve un número equivocado porque no
ve parte de lo que tiene que medir. Nos pasó dos veces.

**Mes tres** — Expresión nuestra para el momento en que un sistema construido rápido
empieza a mostrar sus problemas: cuando ya tiene datos de verdad y usuarios de verdad.

**Mock (mockear)** — Reemplazar una parte real del sistema por una simulación durante un
test. "No mockearse a sí mismo" significa no simular justamente la parte que se quiere
probar.

**NAC3** — El protocolo de Forge que hace que las pantallas de una aplicación se puedan
operar por programa (cada elemento de la interfaz tiene un identificador y métodos).
Permite el testing de punta a punta. Pablo aclaró que no es obligatorio para el método:
es el medio, no la condición.

**Node (Node 22)** — El entorno donde corre el JavaScript del servidor. "Node 22 fijo"
quiere decir que la versión quedó clavada para que todos los entornos usen la misma.

**Oráculo** — Una fuente de verdad externa contra la que se puede verificar un resultado.
Para los contadores de la Obra Social, el oráculo es el Autorizador.

**Obra Social (la)** — Así llama este documento a la obra social cliente del primer sistema productivo (su nombre real queda reservado) (Autorizaciones).

**P0, P1, P2** — Niveles de prioridad de un hallazgo: P0 es lo que hay que resolver ya.

**Paper** — Un documento de análisis con mediciones y conclusiones. El
`PAPER_SUMI_VS_AGENTIC` es el que justificó matar el equipo multiagente.

**Pisar (una configuración)** — Sobrescribir algo por accidente. "La batería pisaba la
configuración del despliegue" fue el PND-107.

**Pizarrón** — El tablero compartido de Forge donde el agente deja informes para que
Pablo los lea.

**Playwright** — Una herramienta que controla un navegador por programa para probar
pantallas como lo haría una persona.

**PND (pendiente)** — Un ítem numerado de la cola de trabajo (PND-001, PND-002…). En
este método, los pendientes SON el plan.

**Presupuesto de consultas** — El máximo de consultas a la base de datos que puede hacer
un camino de la aplicación, medido y protegido por un test. Si una modificación lo
supera, el test falla.

**Probado en rojo** — Un test del que se demostró que FALLA contra el código viejo antes
de que el arreglo lo ponga en verde. Si nunca lo viste rojo, no sabés si prueba algo.

**PROD (producción)** — El entorno de verdad, el que usa el cliente.

**Promoción (UAT → PROD)** — Pasar algo (configuración, campañas) del entorno de prueba al
de producción de manera controlada.

**Pull / push** — Bajar y subir código al repositorio remoto (GitHub).

**R8 modal** — En Forge, la ventana que frena todo cuando el agente entra en un bucle sin
avanzar.

**Regresión** — Un test que verifica que algo que ya funcionaba sigue funcionando después
de un cambio.

**Relay** — El servicio intermediario que conecta la aplicación móvil de Forge con la
sesión de escritorio.

**Repositorio (repo)** — El lugar donde vive el código con toda su historia. "Repo
estándar" quiere decir uno manejado con Git y con una estructura reconocible.

**Retención** — Cuánto tiempo se conservan los datos de cada tabla antes de borrarlos.

**Rollback (vuelta atrás)** — Volver a la versión anterior cuando un despliegue sale mal.

**Autorizaciones** — Nombre con el que este documento llama al primer sistema productivo (el real queda reservado): automatización (RPA) de la gestión de
órdenes de la Obra Social para una entidad de salud, con un humano en el circuito.

**RPAForce** — La marca de Pablo bajo la que se entregan estos sistemas.

**Runbook** — Un procedimiento operativo escrito paso a paso, para que cualquiera lo pueda
seguir. "Idempotente" quiere decir que se puede correr dos veces sin romper nada.

**SDD** — Un documento de diseño de software escrito antes de construir.

**Sembrador (seeder)** — Un script que carga datos de prueba en un entorno.

**Smell (olor)** — Una señal de que algo anda mal en el código, antes de que falle.

**SQ (Standards of Quality, estándares de calidad)** — El contrato de convivencia entre
humano y agente en Forge. Numerados: SQ 1 (el tiempo del usuario es sagrado), SQ 2 (cero
deuda), SQ 3 (ASCII), SQ 4 (documentación al día), SQ 5 (alcance exacto), SQ 6 (idioma del
usuario), SQ 7 (simetría productor/consumidor), SQ 8 (autonomía), SQ 9 (verificar antes
de afirmar). Y en el documento largo, las secciones 0.1 a 0.11.

**SQL** — El lenguaje de las bases de datos relacionales.

**Sumi (Sumi-Forge)** — El nombre de la sesión de Claude Code que trabaja con Pablo en el
repositorio de Forge; la que escribe este documento. Forge es el producto; Sumi es quien
lo construye y audita lo que Forge hace en otros proyectos.

**Tag** — Una etiqueta sobre un commit que marca una versión (por ejemplo, v1.18.0).

**TDD** — "Primero el test, después el código". El método lo deja como opción para
alcances chicos, no como regla universal.

**Token** — Dos sentidos. En la IA: la unidad en que se mide (y se cobra) el texto que
procesa el modelo. En seguridad: una credencial de acceso. "Un `git add -A` con un token"
es subir una credencial al repositorio por error.

**Trinquete** — Un mecanismo que solo gira en un sentido. En Kikan, un contador de llamadas
sin `await` que solo puede bajar: si sube, el test falla.

**Turno** — Una vuelta de la conversación con el agente: el usuario pide, el agente
trabaja y responde.

**UAT** — El entorno donde el cliente prueba antes de producción.

**Urazuke** (裏付け) — El nombre del método. En japonés, el respaldo que tiene una afirmación, lo
que la sostiene por detrás; *urazukeru*, respaldar con pruebas. Se pronuncia u-ra-ZU-ke. No se
traduce.

**Vibecoding / vibecoder** — Construir software conversando con una IA, describiendo lo
que se quiere, en vez de escribir el código a mano. Un vibecoder es quien lo hace.

**Vigía** — En la Obra Social, el proceso que revisa periódicamente qué quedó trabado y lo empuja,
con guardas para no empujar dos veces.

**Volumetría** — Cuántos datos va a manejar el sistema: filas por año, usuarios, picos.

**Watchdog (vigía de silencio)** — Un proceso que mira si otro sigue dando señales de
vida, y lo mata si se queda callado demasiado tiempo. Forge 1.18.0 lo agregó para que un
turno no pueda quedar huérfano.

**yerp_** — El prefijo de las claves de API de Kikan.

**yf** — El comando de Forge en la terminal.

**Yujin** — El ecosistema del que Forge es el producto comercial.
