# Peldaño 20 — Documentación viva y manuales que una persona puede seguir sin IA (contrato del peldaño)

**Tramo:** salida a producción.
**Cuándo:** el manual de usuario crece con cada bloque funcional, al cierre, con las pantallas
nuevas; alimentado por los pendientes cerrados, que son la documentación de lo hecho. Los tres
manuales completos se generan en el tramo de salida a producción, después del 15, y la prueba con
una persona que no programa se hace antes del primer despliegue. La rutina del mismo commit rige
durante toda la operación.
**Forma:** rutina; más un tiro largo cuando se generan los manuales.
**Tamaño:** proporcional. Un sistema chico necesita, como mínimo, el manual de infraestructura y
recuperación; el de usuario puede ser una página. Lo que no cambia: si la persona que lo construyó
desaparece, otra tiene que poder seguir.

## Para qué sirve

Hacé que el sistema se pueda usar, mantener y recuperar sin el agente y sin vos. Si el día que no
hay agente no se puede desplegar, no está terminado. En el método clásico la documentación era
cara y envejecía; acá regenerarla es gratis, así que la regla pasa a ser "en el mismo commit" y
"reproducible a mano". Los manuales que escribí para la Obra Social con ese criterio son el modelo
[Ref. 24](../REFERENCIAS.md#ref-24); y el archivo de proyecto que se volvió un historial de miles
de líneas es el contraejemplo [Ref. 41](../REFERENCIAS.md#ref-41).

Un criterio de calidad para el manual de recuperación, que sirve para juzgarlo sin ser técnico:
**lo tiene que poder seguir una persona de confianza que no programe, a las tres de la mañana, con
el sistema caído y el agente sin conexión**. Si en algún paso dice "consultar con el desarrollador"
o "según el caso", ese paso está incompleto.

Y esa prueba **deja tres cosas escritas**, porque si no deja nada, la compuerta se cumple sin medir
nada —que es la forma más barata de tener una compuerta decorativa—. Las tres son: el **tiempo
medido** de punta a punta (cuándo empezó la persona, cuándo el sistema volvió a funcionar), el
**punto exacto donde se trabó** (el paso del manual, con sus palabras, no con las tuyas), y **cada
palabra que no entendió**. Las tres van con fecha y con el nombre de quien hizo la prueba. Y cada
palabra que no entendió **abre un pendiente**: o se explica en el manual, o se le cambia el nombre a
la cosa en todo el sistema. Esa lista de palabras es, además, el mejor insumo del glosario del
usuario del peldaño 2, y la retrospectiva del peldaño 23 la usa como propuesta de cambio.

Sin estos manuales, dicho en una palabra que no necesita explicación: **el dueño no es dueño, es
inquilino**. Tiene el sistema, lo paga, y no puede entrar sin pedirle permiso a quien lo construyó.

Y una fuente que no hay que desaprovechar: los pendientes cerrados. Cada uno trae su
especificación, su decisión, su evidencia y su fecha. El manual de usuario no se escribe de cero
al final: se arma, bloque a bloque, a partir de los pendientes que cerraron, y el diario de cambios
sale directamente de ellos.

## 1. Contexto requerido

Lo que sigue es la lista genérica. Los archivos concretos que tenés que tener hechos antes de cada
prompt, con su contenido y su estado mínimo, están en la sección 2, en el bloque "Antes de enviar
el prompt" que precede a cada uno.

- Quiénes son los lectores de cada manual: el usuario final, el que mantiene, el que opera la
  infraestructura. Lo sabe el negocio; el agente pregunta si no está claro.
- El sistema corriendo en el entorno de prueba, para sacar capturas reales.
- Los pendientes cerrados del bloque, con su documentación de cierre (peldaño 5).
- `docs/DEPLOYMENT.md` (peldaño 15) y `docs/LOCKS.md` (peldaño 14), que son insumos.

## 2. Prompts

**Rutina (va en el contrato de convivencia):**

**Antes de enviar el prompt**, esto tiene que existir, y lo hacés vos (o el negocio con vos), no
el agente:

- `docs/WORKING_AGREEMENT.md`, donde va la rutina.
- La decisión de qué manuales va a tener el sistema y para quién es cada uno (el usuario final, el
  que mantiene, el que opera la infraestructura), escrita en `PROJECT.md` o dicha en el chat, para
  que "el manual correspondiente" tenga sentido.
- Estado mínimo aceptable: hay una lista de manuales, cada uno con su lector.

> Every change that modifies what the user sees, what the operator does, or how the system is
> deployed, updates the corresponding manual in the same commit. At the close of every
> functional block, add to the user manual the screens and flows of the pending items closed
> in that block, with real screenshots from the test environment, and add their entries to the
> changelog. If you do not know which manual, ask.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [es]
> Todo cambio que modifique lo que el usuario ve, lo que el operador hace, o cómo se despliega el
> sistema, actualiza el manual correspondiente en el mismo commit. Al cierre de cada bloque
> funcional, agregá al manual de usuario las pantallas y los flujos de los pendientes cerrados en
> ese bloque, con capturas reales del entorno de prueba, y agregá sus entradas al diario de
> cambios. Si no sabés a qué manual va, preguntá.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.

Qué le estoy pidiendo: la regla del mismo commit, que es la única que mantiene un manual al día;
el cierre de bloque como momento en que los pendientes cerrados se vuelven manual y diario de
cambios; y la pregunta cuando no está claro a qué manual va.

**Para generar los manuales:**

**Antes de enviar el prompt**, tenés que tener esto a mano:

- El sistema corriendo en el entorno de prueba con datos realistas, no vacío: las capturas salen
  de ahí.
- Los pendientes cerrados con su documentación de cierre (peldaño 5), que son la fuente del manual
  de usuario y del diario de cambios.
- `docs/DEPLOYMENT.md` (peldaño 15) y `docs/LOCKS.md` (peldaño 14), que son el insumo del manual
  de infraestructura y recuperación.
- Lo que solo el negocio sabe, preparado para cuando el agente pregunte: quién es responsable de
  qué, a qué teléfono se llama cuando se cae, quién hace la copia de respaldo, en qué idioma lee
  el usuario.
- Estado mínimo aceptable: hay datos en el entorno de prueba, y sabés a quién llamar a las tres de
  la mañana.

> Generate three manuals from the system as it is today in the test environment: the user
> manual (screen by screen, with real screenshots, in the user's language, no jargon); the
> maintenance manual (how it is built, where everything is, how to run the test suite, how to
> add a module); and the infrastructure and recovery manual (how to deploy, how to roll back,
> how to restore a backup, what to do if it goes down; written for a person who has to do it by
> hand, without AI, at three in the morning). If for any section you need something only the
> business knows (who is responsible for what, which phone number to call), ask me; do not leave
> a gap and do not invent. Each manual carries a date and the system version. Reply in my
> language.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [es]
> Generá tres manuales a partir del sistema tal como está hoy en el entorno de prueba: el manual
> de usuario (pantalla por pantalla, con capturas reales, en el idioma del usuario, sin jerga); el
> manual de mantenimiento (cómo está construido, dónde está cada cosa, cómo correr la batería,
> cómo agregar un módulo); y el manual de infraestructura y recuperación (cómo desplegar, cómo
> volver atrás, cómo restaurar una copia de respaldo, qué hacer si se cae; escrito para una persona
> que tiene que hacerlo a mano, sin IA, a las tres de la mañana). Si para alguna sección necesitás
> algo que solo el negocio sabe (quién es responsable de qué, a qué teléfono llamar), pedímelo; no
> dejes un hueco ni inventes. Cada manual lleva fecha y versión del sistema.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.
>
> Respondé en mi idioma.

Qué le estoy pidiendo: los tres manuales con sus lectores; capturas **reales** del entorno de
prueba (no dibujos ni descripciones); el criterio de las tres de la mañana para el de
recuperación; la cláusula de completitud en su forma para documentar: lo que solo el negocio sabe
se pregunta, y **no se deja un hueco ni se inventa**; y fecha y versión, para que se sepa a qué
sistema corresponde cada manual.

## 3. Resultado esperado

- `docs/USER_MANUAL.md` (o HTML), con capturas reales e incrustadas, que creció bloque a bloque.
- `docs/MAINTENANCE_MANUAL.md`.
- `docs/INFRASTRUCTURE_AND_RECOVERY_MANUAL.md`: paso a paso, para una persona.
- `docs/CHANGELOG.md`, alimentado por los pendientes cerrados.
- Cada uno con fecha y la versión del sistema que documenta.
- En los commits que cambian pantallas, operación o despliegue: el manual actualizado.
- **El registro de la prueba del manual de recuperación**, con cuatro cosas: la fecha y el nombre
  de quien la hizo; el tiempo medido de punta a punta; el paso exacto donde se trabó, con sus
  palabras; y la lista de palabras que no entendió. Más un pendiente abierto por cada una de esas
  palabras. Dónde se escribe es tu elección —al final del propio manual de recuperación alcanza—;
  lo que no es opcional es que exista.

## 4. Verificación de completitud

- Abrí el manual de usuario en una pantalla al azar: ¿la captura coincide con lo que hay hoy en el
  entorno de prueba?
- ¿El manual de recuperación lo podrías seguir vos, o alguien de confianza que no programe? Leé
  la sección "se cayó": ¿dice qué hacer, en orden, con los comandos?
- ¿La prueba del manual de recuperación dejó su registro: cuánto tardó, dónde se trabó la persona
  y qué palabras no entendió, con fecha y nombre? Y de esas palabras, ¿cada una abrió un pendiente?
  Si el registro dice "la prueba se hizo" y nada más, la prueba no se puede repetir ni comparar: la
  compuerta está cumplida en el papel.
- Elegí un commit reciente que cambió una pantalla: ¿tocó el manual?
- ¿El diario de cambios tiene una entrada por cada pendiente cerrado del último bloque?
- ¿Hay un hueco tipo "[completar]" o "consultar con el responsable"? Ahí el agente tenía que
  preguntar.
- ¿Cada manual dice para qué versión del sistema vale?

## 5. Señales de alarma

- El manual de usuario tiene capturas de una versión que ya no existe. Se generó una vez y no se
  mantuvo: la regla del mismo commit no está en el contrato o no se está aplicando.
- El manual de recuperación empieza con "abrí una sesión con el agente". Si el agente es
  prerrequisito, no es un manual para una persona.
- Nadie fuera del constructor leyó nunca el manual de recuperación. Pedile a alguien que lo siga
  en el entorno de prueba; lo que lo trabe es lo que hay que arreglar.
- La prueba se hizo y no quedó registrada, o quedó registrada como "salió bien". Entonces nadie
  puede decir cuánto tardó ni dónde estuvo cerca de no salir, y la próxima vez se empieza de cero.
- El registro no tiene ni una palabra en la lista de las que no se entendieron. Pasa de vez en
  cuando y es cierto; pasa siempre y significa que nadie preguntó.
