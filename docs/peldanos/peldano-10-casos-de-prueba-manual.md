# Peldaño 10 — Los casos de prueba manual se escriben junto con la funcionalidad, y los ejecutan personas (contrato del peldaño)

**Tramo:** bucle.
**Cuándo:** con cada pendiente, al cerrarlo, después del test en rojo (8) y de la calidad (9): el
agente escribe los casos de prueba manual del flujo que tocó. Se ejecutan por personas en tres
momentos: al cierre de cada bloque (las pruebas humanas), antes del primer despliegue a producción
(las pruebas de aceptación con el dueño), y después de cada despliegue, en una pasada de solo
lectura. Cada ejecución que falla reinyecta un requerimiento al bucle como pendiente correctivo.
**Forma:** rutina de cada pendiente; después, ejecución humana por ciclo.
**Tamaño:** obligatorio en todo proyecto con usuarios: el caso de prueba manual es la única
prueba que no escribe ni corre el modelo.

## Para qué sirve

El método tiene pruebas automáticas de sobra: el test en rojo, la regresión, la punta a punta en
tres escalas. Todas las escribe y las corre el modelo, y todas prueban lo que el modelo entendió.
Falta la prueba que hace una persona con sus propios ojos y sus propias manos, siguiendo un guion
escrito, y que encuentra lo que ningún test encuentra: el botón que está donde no debe, el mensaje
que no se entiende, el flujo que técnicamente anda y humanamente no sirve. La vista humana y las
pruebas humanas ya estaban en la línea de tiempo; lo que faltaba era que tuvieran **guion**, y que
el guion lo escribiera el mismo que construyó la funcionalidad, en el mismo momento, a partir de
los criterios de aceptación del pendiente. Sin guion, la prueba humana es "jugá un rato con el
sistema", y lo que se encuentra depende del humor del día. Con guion, se ejecuta igual cada vez,
se registra qué pasó, y lo que falla vuelve al bucle como requerimiento. Es el cierre del circuito
que el gráfico del proceso muestra: la ejecución manual de los casos de prueba reinyecta
requerimientos al desarrollo.

Un caso de prueba manual tiene siempre la misma forma: un identificador; el pendiente que lo
origina; la precondición (qué tiene que existir antes: un paciente, un turno de ayer); los pasos,
numerados, cada uno con lo que la persona hace y lo que tiene que ver; el resultado esperado al
final, incluido el efecto en el backend que una persona puede verificar (un registro que aparece,
un mensaje en la bandeja falsa); los datos de prueba a usar; y el espacio para el resultado de
cada ejecución: fecha, quién, pasó o falló, observación.

**Si sos principiante.** Un *caso de prueba manual* es una receta para que una persona pruebe
una funcionalidad: qué preparar, qué hacer paso por paso, y qué tiene que pasar en cada paso. Se
escribe para que cualquiera la siga igual, sin saber cómo está hecho el sistema. *Ejecutar* un
caso es seguir la receta y anotar si pasó o falló. *Precondición* es lo que tiene que existir
antes de empezar. Y *reinyectar* quiere decir que lo que la persona encontró mal vuelve a la lista
de pendientes como un pedido nuevo, con sus palabras.

## 1. Contexto requerido

Lo que sigue es la lista genérica. Los archivos concretos que tenés que tener hechos antes de cada
prompt, con su contenido y su estado mínimo, están en la sección 2, en el bloque "Antes de enviar
el prompt" que precede a cada uno.

- El pendiente que se está cerrando, con sus criterios de aceptación "dado, cuando, entonces"
  (peldaño 5): son la materia prima del caso.
- El entorno de prueba con datos, para que los pasos se puedan seguir de verdad.
- Quién va a ejecutar los casos (el dueño, un usuario de confianza) y cuándo (cierre de bloque,
  aceptación, después de cada despliegue).

## 2. Prompts

**Rutina de cada pendiente (va en el contrato de convivencia):**

**Antes de enviar el prompt**, esto tiene que existir, y lo hacés vos (o el negocio con vos), no
el agente:

- El pendiente con sus criterios de aceptación en `docs/PENDING.md` (peldaño 5), ya construido y
  con el test en rojo y la calidad en verde (peldaños 8 y 9).
- `docs/MANUAL_TESTS.md` creado, aunque esté vacío, con el formato del caso en el encabezado:
  identificador, pendiente, precondición, pasos (acción y resultado visible), resultado esperado
  con el efecto en el backend verificable por una persona, datos de prueba, y la tabla de
  ejecuciones (fecha, quién, pasó o falló, observación).
- La decisión de quién ejecuta y cuándo, escrita en `PROJECT.md` o en el contrato: para un
  proyecto chico, el dueño al cierre de cada bloque y antes del primer despliegue.
- `docs/WORKING_AGREEMENT.md`, donde va la rutina.
- Estado mínimo aceptable: el archivo existe con su formato y el pendiente tiene criterios de
  aceptación.

> Every pending item that changes what a user sees or does is closed with its manual test cases
> written in `docs/MANUAL_TESTS.md`, derived from its acceptance criteria: one case per flow the
> item touches, with an id, the pending item, the precondition, the numbered steps (what the
> person does and what they must see), the expected result including a backend effect a person
> can verify without tools, the test data to use, and an empty execution table (date, who,
> passed or failed, observation). Write them for a person who does not know how the system is
> built. Keep the cases of closed items up to date: when a flow changes, its cases change in the
> same commit. Never mark a case as executed yourself: execution is human.

> [es]
> Todo pendiente que cambie lo que un usuario ve o hace se cierra con sus casos de prueba manual
> escritos en `docs/MANUAL_TESTS.md`, derivados de sus criterios de aceptación: un caso por flujo
> que el pendiente toca, con un identificador, el pendiente, la precondición, los pasos numerados
> (qué hace la persona y qué tiene que ver), el resultado esperado incluido un efecto en el
> backend que una persona pueda verificar sin herramientas, los datos de prueba a usar, y una tabla
> de ejecuciones vacía (fecha, quién, pasó o falló, observación). Escribilos para una persona que
> no sabe cómo está hecho el sistema. Mantené al día los casos de los pendientes cerrados: cuando
> un flujo cambia, sus casos cambian en el mismo commit. Nunca marques un caso como ejecutado vos:
> la ejecución es humana.

Qué le estoy pidiendo: que el caso salga de los criterios de aceptación (así prueba lo que se
pidió, no lo que el modelo entendió); que esté escrito para alguien que no sabe cómo funciona el
sistema, que es la diferencia entre un caso de prueba y una nota técnica; que incluya el efecto
en el backend verificable por una persona, para que la prueba manual también mire del otro lado
de la pantalla; que los casos se mantengan en el mismo commit, igual que la documentación; y
**que el modelo nunca los ejecute**, porque ejecutados por el modelo son un test más, y la gracia
es que los ejecute una persona.

**Para una ejecución (cierre de bloque, aceptación, después de un despliegue):**

**Antes de enviar el prompt**, tenés que tener esto a mano:

- La ejecución hecha: una persona siguió los casos de `docs/MANUAL_TESTS.md` en el entorno de
  prueba (o en producción, en solo lectura, después de un despliegue) y anotó en la tabla de cada
  caso la fecha, quién, pasó o falló, y la observación. Esto lo hace la persona, a mano, antes de
  pegar el prompt; el agente no lo hace.
- Las observaciones sueltas que no caben en ningún caso (lo que molestó, lo que no se entendió),
  anotadas al final del archivo con fecha.
- Estado mínimo aceptable: todos los casos del alcance tienen resultado de hoy, aunque sea
  "no se pudo ejecutar" con la razón.

> Read the executions of today in `docs/MANUAL_TESTS.md`. For every case that failed, and for
> every loose observation at the end of the file, open a corrective pending item in
> `docs/PENDING.md` with the person's words as the way to reproduce it, hanging from the node of
> the semantic tree it touches; do not fix anything now. For every case that passed, nothing. Then
> tell me, flow by flow, how many cases passed and how many failed, compared with the previous
> execution, and which failures repeat. If a case could not be executed, tell me why and whether
> the case or the system is the problem. Reply in my language.

> [es]
> Leé las ejecuciones de hoy en `docs/MANUAL_TESTS.md`. Por cada caso que falló, y por cada
> observación suelta al final del archivo, abrí un pendiente correctivo en `docs/PENDING.md` con
> las palabras de la persona como forma de reproducirlo, colgado del nodo del árbol semántico que
> toca; no arregles nada ahora. Por cada caso que pasó, nada. Después decime, flujo por flujo,
> cuántos casos pasaron y cuántos fallaron, comparado con la ejecución anterior, y qué fallos se
> repiten. Si un caso no se pudo ejecutar, decime por qué y si el problema es el caso o el sistema.
> Respondé en mi idioma.

Qué le estoy pidiendo: la reinyección hecha operativa: cada fallo humano es un pendiente
correctivo, con las palabras de la persona (no las del modelo) como reproducción, y colgado del
árbol; la comparación con la ejecución anterior, que es lo que te dice si el sistema mejora o se
degrada entre bloques; y la distinción entre "el caso está mal escrito" y "el sistema está mal",
que son dos pendientes distintos.

## 3. Resultado esperado

- `docs/MANUAL_TESTS.md` con un caso por flujo tocado por cada pendiente cerrado, en el formato,
  escrito para una persona.
- Las ejecuciones registradas, con fecha y quién, en cada ciclo.
- Un pendiente correctivo por cada fallo y por cada observación.
- La rutina en el contrato.

## 4. Verificación de completitud (la hacés vos, sin leer código)

- Tomá un caso al azar y seguilo vos en el entorno de prueba sin preguntarle nada al agente:
  ¿pudiste? Si tuviste que preguntar, el caso no está escrito para una persona.
- ¿Cada pendiente cerrado que toca una pantalla tiene su caso? Pedile la lista de pendientes sin
  caso.
- ¿El caso dice qué efecto verificar del otro lado de la pantalla, y cómo lo verifica una persona?
- ¿La última ejecución tiene fecha y nombre en cada caso? ¿Hay alguno "pasó" sin fecha?
- ¿Cada fallo de la última ejecución tiene su pendiente, con las palabras de la persona?

## 5. Señales de alarma

- El agente marcó los casos como ejecutados. Los ejecutó él, que es lo mismo que no ejecutarlos.
- Los casos son copias del test automático en prosa. Un caso manual tiene que mirar lo que el
  test no mira: lo que se ve, lo que se entiende, lo que molesta.
- Todos los casos pasan en todas las ejecuciones. Las personas encuentran cosas siempre; si no
  encuentran nada, no están siguiendo el guion o el guion no pide mirar.
- Los fallos se "arreglan" en el momento, sin pendiente. Se pierden las palabras de la persona y
  el rastro de qué se repitió.
