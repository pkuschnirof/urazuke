# Peldaño 17 — Optimización de la capa de persistencia, medida antes y después (contrato del peldaño)

**Tramo:** salida a producción.
**Cuándo:** en la fase de salida a producción, después del 16 (hace falta ver las consultas para
medirlas) y antes del 19 (las pruebas de rendimiento se corren sobre la persistencia ya
optimizada; si no, miden el problema que ya se conocía). Se repite cuando un bloque agrega una
tabla grande o cambia un flujo crítico, y cuando el monitoreo (21) muestra una consulta fuera de
rango. En un legado, las mediciones salen de N6 y la mayor parte de lo que se encuentra se paga
"al tocar", salvo lo que ya está fuera de rango.
**Forma:** dos tiros: medir y proponer; aplicar con antes y después.
**Tamaño:** proporcional: en un proyecto chico, los índices de las consultas reales y el fin de
los bucles N+1; en uno con consecuencias, completo, con presupuestos por camino.

## Para qué sirve

La capa de persistencia es donde los sistemas se mueren despacio: funcionan bien con cien
registros, aceptablemente con diez mil, y a los cien mil cada pantalla tarda veinte segundos, y
nadie sabe cuándo empezó. Este peldaño existe para que eso se decida con números y antes de
producción, no con quejas y después. Y para que se decida **con el método del peldaño 7**: cada
consulta que el sistema hace se cuenta y se cronometra con un medidor que tiene test, se cambia
lo que los números dicen, y se vuelve a medir sobre los mismos datos. La primera auditoría de
consultas sin índice sobre un sistema vivo [Ref. 18](../REFERENCIAS.md#ref-18) y el presupuesto de
consultas apretado a lo medido [Ref. 37](../REFERENCIAS.md#ref-37) son el origen de este peldaño; la
decisión de la interfaz asincrónica desde la línea uno [Ref. 15](../REFERENCIAS.md#ref-15), su
antecedente en el arranque.

Lo que no es: no es "reescribir el acceso a datos", ni elegir otro motor. Eso lo decidió el
peldaño 3. Es ajustar lo que hay (índices, paginación, lotes, retención, tamaño del pool) a partir
de lo que las consultas reales hacen.

**Si sos principiante.** La *capa de persistencia* es la parte del sistema que guarda y lee los
datos, casi siempre una base de datos. Un *índice* es como el índice de un libro: sin él, para
encontrar un turno la base lee la tabla entera (eso es un *full scan*); con él, va directo. Un
*bucle N+1* es un error muy común: para mostrar cien turnos, el sistema hace una consulta para la
lista y después cien consultas más, una por turno, en vez de una sola. *Paginación* es mostrar de
a veinte en vez de todo junto. *Retención* es cuánto tiempo se guarda cada dato antes de
archivarlo o borrarlo. Y el *pool de conexiones* es la cantidad de "líneas abiertas" que el
sistema tiene con la base al mismo tiempo. Nada de esto requiere que leas código: requiere que
mires números antes y después.

## 1. Contexto requerido

Lo que sigue es la lista genérica. Los archivos concretos que tenés que tener hechos antes de cada
prompt, con su contenido y su estado mínimo, están en la sección 2, en el bloque "Antes de enviar
el prompt" que precede a cada uno.

- El dimensionamiento y la volumetría (peldaño 3, o N6 en un legado): los volúmenes a los que hay
  que medir.
- El mapa productor-consumidor (peldaño 11): qué consume cada tabla.
- La observabilidad (16): cada consulta visible con su tiempo.
- El entorno de prueba cargado con datos al volumen esperado.

## 2. Prompts

**Inicial (medir y proponer):**

**Antes de enviar el prompt**, esto tiene que existir, y lo hacés vos (o el negocio con vos), no
el agente:

- `docs/SIZING.md` y `docs/VOLUME_SURVEY.md` (peldaño 3 o N6), cerrados: los volúmenes a cargar.
- El entorno de prueba con datos **al volumen esperado**, no con diez registros de ejemplo. Si
  hay un sistema anterior o producción, una copia anonimizada; si es un proyecto nuevo, pedile al
  agente que genere datos sintéticos con la forma del árbol semántico y los volúmenes del
  dimensionamiento, y que lo deje como script en el repositorio. Esto es un pendiente previo, no
  parte de este prompt.
- `docs/PRODUCER_CONSUMER_MAP.md` (peldaño 11), al día.
- Si hay producción: acceso de solo lectura, con la credencial fuera del chat, para medir sobre
  datos reales además de los de prueba.
- Un caso conocido para el test de cada medidor (una tabla cuya cantidad de filas sabés).
- Estado mínimo aceptable: el entorno de prueba tiene los volúmenes del dimensionamiento y el
  agente puede ver cada consulta con su tiempo (peldaño 16).

> We are going to optimize the persistence layer with measurements, not opinions. Read
> `docs/SIZING.md`, `docs/VOLUME_SURVEY.md` and `docs/PRODUCER_CONSUMER_MAP.md`. With the test
> environment loaded at the volumes of the sizing (and, if I gave you access, production
> read-only), measure first, with meters that live in the repository and have a test against a
> known case: every query the system runs per screen and per job, with its count and its time;
> the queries that read whole tables; the ones that run once per item; the size and monthly growth
> of every table; the connection pool usage at the peak. Audit each meter in both directions. Show
> me the numbers with the commands that produce them. Then propose, query by query, what to
> change: indexes derived from the real queries, pagination, batching, the elimination of N+1
> loops, retention and archiving per table, pool size; for each change, the expected gain, the
> risk, and which consumers in the map it touches. Do not change anything yet: I approve the list.
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
> Vamos a optimizar la capa de persistencia con mediciones, no con opiniones. Leé
> `docs/SIZING.md`, `docs/VOLUME_SURVEY.md` y `docs/PRODUCER_CONSUMER_MAP.md`. Con el entorno de
> prueba cargado a los volúmenes del dimensionamiento (y, si te di acceso, producción en solo
> lectura), medí primero, con medidores que viven en el repositorio y tienen un test contra un
> caso conocido: cada consulta que el sistema hace por pantalla y por tarea, con su cantidad y su
> tiempo; las consultas que leen tablas enteras; las que corren una vez por ítem; el tamaño y el
> crecimiento mensual de cada tabla; el uso del pool de conexiones en el pico. Auditá cada medidor
> en las dos direcciones. Mostrame los números con los comandos que los producen. Después proponé,
> consulta por consulta, qué cambiar: índices derivados de las consultas reales, paginación,
> lotes, la eliminación de los bucles N+1, retención y archivado por tabla, tamaño del pool; para
> cada cambio, la ganancia esperada, el riesgo, y qué consumidores del mapa toca. No cambies nada
> todavía: yo apruebo la lista.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.
>
> Respondé en mi idioma.

Qué le estoy pidiendo: medir con el método del peldaño 7 (medidor con test, auditado en dos
direcciones, número con comando) antes de proponer; proponer consulta por consulta, con la
ganancia y el riesgo, y con los consumidores del mapa que cada cambio toca (un índice nuevo no
toca a nadie; una retención por tabla toca a todos los que leen esa tabla); y **no cambiar nada
hasta que yo apruebe**, porque la optimización es el lugar donde más se "mejora" lo que nadie
pidió.

**De cierre (aplicar con antes y después):**

**Antes de enviar el prompt**, tenés que tener esto a mano:

- La lista de cambios propuestos, leída, con tu aprobación o rechazo por cada uno; los rechazados,
  con razón de una línea. Para los que tocan consumidores del mapa, la confirmación de que
  entendés qué cambia para ellos.
- Una cuenta rehecha a mano sobre un número de la medición (filas por mes de la tabla más grande,
  por ejemplo), que coincide.
- Estado mínimo aceptable: cada cambio tiene veredicto y entendés qué consumidor toca.

> Apply the approved changes [list], one commit each. For each one show me the meter before and
> after on the same data, the regression suite green, and the end-to-end suite green. Set a budget
> per critical path (queries and time) at the measured value plus a small margin, protected by a
> test that fails if it is exceeded. Update every consumer in the map that a change touches, in
> the same commit. Record the before and after table, the budgets and the retention per table in
> `docs/PERSISTENCE.md`.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [es]
> Aplicá los cambios aprobados [lista], un commit cada uno. Para cada uno mostrame el medidor
> antes y después sobre los mismos datos, la regresión en verde, y la batería de punta a punta en
> verde. Fijá un presupuesto por camino crítico (consultas y tiempo) en el valor medido más un
> margen chico, protegido por un test que falle si se supera. Actualizá en el mismo commit a cada
> consumidor del mapa que un cambio toque. Registrá la tabla de antes y después, los presupuestos
> y la retención por tabla en `docs/PERSISTENCE.md`.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.

Qué le estoy pidiendo: un commit por cambio, para que el antes y el después sean atribuibles; el
mismo medidor sobre los mismos datos (si cambian los datos, el número no dice nada); el
presupuesto con test, que es lo que impide que el bucle N+1 vuelva en tres meses; y la simetría
del peldaño 11 aplicada a la persistencia.

## 3. Resultado esperado

- Los medidores de consultas en el repositorio, con test.
- `docs/PERSISTENCE.md` con la tabla de antes y después por cambio, los presupuestos por camino y
  la retención por tabla.
- Los índices, la paginación, los lotes y la retención aplicados, un commit cada uno, con la
  regresión y la punta a punta en verde.
- Un test por presupuesto que falla si se supera.

## 4. Verificación de completitud

- Corré vos un medidor antes y después (el agente te da los dos comandos): ¿coinciden con la
  tabla?
- ¿Hay alguna consulta que lea una tabla entera en un flujo crítico? ¿Por qué quedó?
- ¿Cada tabla tiene una política de retención escrita, aunque sea "para siempre"?
- ¿Los presupuestos tienen test? Pedile que suba uno a propósito y te muestre el rojo.
- ¿La pantalla más lenta, con los datos al volumen, tarda lo que el dimensionamiento esperaba?

## 5. Señales de alarma

- Las mediciones se hicieron con los datos de ejemplo del esqueleto. Todo es rápido con diez
  filas.
- El agente propone "migrar a otra base" o "reescribir la capa de datos". Eso es el peldaño 3, y
  si hay que volver a él es una decisión tuya, no una optimización.
- Mejoró el número pero la punta a punta de un flujo dejó de pasar. Un índice no rompe un flujo;
  una retención o una paginación sí: faltó un consumidor del mapa.
- No hay presupuestos. Sin presupuesto, la optimización dura hasta el próximo bloque.
