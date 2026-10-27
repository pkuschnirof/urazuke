# Peldaño 19 — Pruebas de rendimiento en volumen y punto de ruptura (contrato del peldaño)

**Tramo:** salida a producción.
**Cuándo:** en la fase de salida a producción, después del 16 (sin observabilidad no se sabe qué
se rompió) y del 17 (sobre la persistencia ya optimizada), y antes del primer despliegue a
producción. Se repite antes de cada despliegue que cambie la arquitectura, la persistencia o un
flujo crítico, y cuando el dimensionamiento cambia (se vende a otro cliente, se duplica el
volumen). En un legado, se corre con los volúmenes medidos en N6, antes del primer despliegue
posterior a la normalización.
**Forma:** un solo tiro; el agente carga, mide y rompe; vos leés los números y el punto de
ruptura.
**Tamaño:** proporcional: en un proyecto chico, una corrida al volumen esperado y una al "por
diez"; en uno con consecuencias, completo, con el punto de ruptura encontrado y los umbrales
registrados para el monitoreo.

## Para qué sirve

El peldaño 3 dimensionó con cuentas; este peldaño comprueba las cuentas con el sistema real
corriendo. Quiero saber tres cosas antes de que entre el primer usuario: cómo se comporta el
sistema al volumen que el negocio dijo (¿la pantalla más usada responde en lo que el dueño
toleraría?), cómo se comporta al "por diez" (¿aguanta, o qué deja de aguantar primero?), y
**dónde se rompe**: la carga exacta a la que algo cede, y qué es ese algo (las conexiones a la
base, la memoria, una cola, un bloqueo). El punto de ruptura es el número más útil de todo el
tramo, porque de él salen los umbrales de alerta del peldaño 21: una alerta puesta "a ojo" avisa
tarde o avisa siempre; una alerta puesta debajo del punto de ruptura medido, con un margen, avisa
cuando todavía hay tiempo. Los patrones de escala que saqué de un sistema en producción
[Ref. 12](../REFERENCIAS.md#ref-12) y la batería que se moría por memoria y parecía un test fallido
[Ref. 44](../REFERENCIAS.md#ref-44) son los dos antecedentes: el primero, de medir la carga real; el
segundo, de que un punto de ruptura no encontrado a tiempo se disfraza de otra cosa.

**Si sos principiante.** Una *prueba de carga* es un programa que simula a muchos usuarios usando
el sistema al mismo tiempo, para ver qué pasa. *Rendimiento* (throughput) es cuántas acciones por
segundo aguanta. *Latencia* es cuánto tarda una acción en responder; se mira la *mediana* (la
mitad de las acciones tardó menos que esto) y el *percentil 95* (el 95 % tardó menos que esto;
el 5 % restante son los usuarios que se quejan). El *punto de ruptura* es la cantidad de carga a
la que algo deja de funcionar: no "se pone lento" sino "las conexiones a la base se agotaron" o
"la memoria se llenó". Y un *umbral* es un número límite a partir del cual el monitoreo avisa.

## 1. Contexto requerido

Lo que sigue es la lista genérica. Los archivos concretos que tenés que tener hechos antes de cada
prompt, con su contenido y su estado mínimo, están en la sección 2, en el bloque "Antes de enviar
el prompt" que precede a cada uno.

- El dimensionamiento (peldaño 3 o N6): el volumen esperado y el "por diez".
- La observabilidad (16) encendida, para ver qué se rompe.
- La persistencia optimizada (17) con sus presupuestos.
- Un entorno de prueba parecido a producción en recursos, o la conciencia de en qué difiere.
- Los flujos críticos (los del árbol semántico, o los de la caracterización en un legado).

## 2. Prompts

**Inicial (cargar, medir, romper):**

**Antes de enviar el prompt**, esto tiene que existir, y lo hacés vos (o el negocio con vos), no
el agente:

- `docs/SIZING.md` con el volumen esperado (usuarios concurrentes en el pico, eventos por hora,
  filas por tabla) y el "por diez": son los dos escalones de carga.
- La lista de flujos críticos para el hueco del prompt, escrita por vos a partir del árbol
  semántico: los que se usan más y los que tienen consecuencia. Entre tres y seis.
- Un entorno de prueba con recursos comparables a producción, o, si no es posible, anotado en
  `docs/ENVIRONMENTS_SURVEY.md` en qué difiere (la mitad de memoria, otro motor), para que los
  números se lean con esa corrección.
- Datos al volumen esperado en el entorno de prueba (el mismo script del peldaño 17).
- Tu tolerancia, con el dueño: cuánto puede tardar la pantalla más usada para que el negocio lo
  considere aceptable (dos segundos, cinco). Sin ese número, los resultados no se pueden juzgar.
- Estado mínimo aceptable: sabés los dos escalones de carga, los flujos críticos y la tolerancia.

> We are going to find out how this system behaves at the volumes of `docs/SIZING.md`, and where
> it breaks. In the test environment, with the observability of step 16 on and the data loaded at
> the expected volume: (1) write a load script that lives in the repository and drives the
> critical flows [list] from the screen or the API as users would, with a configurable number of
> concurrent users and duration, and with a test that proves the script really exercises each
> flow (the backend effect appears); (2) run it at the expected volume and show me, per flow:
> throughput, median and 95th percentile latency, error rate, and the resource usage of the
> server and the database during the run; (3) run it at ten times the expected volume and show me
> the same; (4) raise the load step by step until something breaks, and tell me exactly what
> broke first (database connections, memory, a queue, a lock, the disk) and at which load: that
> is the breaking point; (5) compare every number with the budgets of `docs/PERSISTENCE.md`, with
> the tolerance I gave you ([tolerance] for the most used screen) and with the sizing assumptions,
> and tell me which assumption was wrong, if any. Do not optimize anything yet. Write
> `docs/PERFORMANCE_[date].md` with the numbers, the commands, the breaking point and your
> diagnosis of the first bottleneck.
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
> Vamos a averiguar cómo se comporta este sistema a los volúmenes de `docs/SIZING.md`, y dónde se
> rompe. En el entorno de prueba, con la observabilidad del peldaño 16 encendida y los datos
> cargados al volumen esperado: (1) escribí un script de carga que viva en el repositorio y opere
> los flujos críticos [lista] desde la pantalla o la API como lo harían los usuarios, con una
> cantidad de usuarios concurrentes y una duración configurables, y con un test que pruebe que el
> script de verdad ejercita cada flujo (el efecto en el backend aparece); (2) corrélo al volumen
> esperado y mostrame, por flujo: rendimiento, latencia mediana y percentil 95, tasa de error, y
> el uso de recursos del servidor y de la base durante la corrida; (3) corrélo a diez veces el
> volumen esperado y mostrame lo mismo; (4) subí la carga escalón por escalón hasta que algo se
> rompa, y decime exactamente qué se rompió primero (conexiones a la base, memoria, una cola, un
> bloqueo, el disco) y a qué carga: ese es el punto de ruptura; (5) compará cada número con los
> presupuestos de `docs/PERSISTENCE.md`, con la tolerancia que te di ([tolerancia] para la
> pantalla más usada) y con los supuestos del dimensionamiento, y decime qué supuesto estaba mal,
> si alguno. No optimices nada todavía. Escribí `docs/PERFORMANCE_[fecha].md` con los números, los
> comandos, el punto de ruptura y tu diagnóstico del primer cuello de botella. Respondé en mi
> idioma.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.

Qué le estoy pidiendo: un script de carga que es un medidor más (vive en el repositorio y tiene
test, porque un script de carga que no ejercita el flujo mide el aire); tres corridas (esperado,
por diez, hasta romper); los números con comandos; la comparación con los presupuestos, la
tolerancia del negocio y los supuestos del dimensionamiento, que es donde se descubre que el
peldaño 3 se equivocó en algo; y **nada de optimizar todavía**, porque optimizar sin leer el
diagnóstico es cambiar lo que no era.

**De cierre (umbrales y pendientes):**

**Antes de enviar el prompt**, tenés que tener esto a mano:

- `docs/PERFORMANCE_[fecha].md` leído por vos, con la tolerancia del negocio al lado: ¿la pantalla
  más usada entra en lo tolerable al volumen esperado? ¿Y al "por diez"?
- Con el dueño, la decisión sobre el "por diez": si el negocio planea crecer, los cuellos de
  botella debajo del "por diez" son pendientes ahora; si no, pueden esperar, con fecha.
- Estado mínimo aceptable: leíste el punto de ruptura y decidiste qué cuellos de botella se
  arreglan ahora.

> Record in `docs/PERFORMANCE.md`: the expected volume, the ten-times volume, the breaking point
> with what breaks, and the alert thresholds that monitoring (step 21) will use, set below the
> breaking point with a margin and above the expected volume. Open a pending item for each
> bottleneck that sits below [ten times the expected volume / the volume I decided], with the
> measured number as its acceptance criterion. Make the load test a gate in `docs/GATES.md`: it
> reruns before every deployment that changes the architecture, the persistence or a critical
> flow, and its results are archived with date and version. Show me the first run archived.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [es]
> Registrá en `docs/PERFORMANCE.md`: el volumen esperado, el volumen por diez, el punto de ruptura
> con qué se rompe, y los umbrales de alerta que el monitoreo (peldaño 21) va a usar, fijados
> debajo del punto de ruptura con un margen y encima del volumen esperado. Abrí un pendiente por
> cada cuello de botella que quede debajo de [diez veces el volumen esperado / el volumen que
> decidí], con el número medido como criterio de aceptación. Hacé de la prueba de carga una
> compuerta en `docs/GATES.md`: se vuelve a correr antes de cada despliegue que cambie la
> arquitectura, la persistencia o un flujo crítico, y sus resultados se archivan con fecha y
> versión. Mostrame la primera corrida archivada.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.

Qué le estoy pidiendo: los umbrales de alerta derivados del punto de ruptura, que es el enganche
con el peldaño 21; los cuellos de botella como pendientes con el número como criterio (así se
cierran con evidencia y no con "ahora anda mejor"); y la prueba de carga como compuerta
archivada, para que dentro de seis meses se pueda comparar.

## 3. Resultado esperado

- El script de carga en el repositorio, con test.
- `docs/PERFORMANCE_[fecha].md` con las tres corridas, los números, el punto de ruptura y el
  diagnóstico; `docs/PERFORMANCE.md` con los umbrales y la compuerta.
- Un pendiente por cuello de botella bajo el volumen decidido.
- La prueba de carga como compuerta antes de los despliegues que la requieren.

## 4. Verificación de completitud

- ¿La pantalla más usada, al volumen esperado, tarda menos que la tolerancia del dueño? Si no,
  hay un pendiente abierto con ese número.
- ¿El punto de ruptura dice qué se rompió y a qué carga, o dice "el sistema se puso lento"?
- ¿Los umbrales de `docs/PERFORMANCE.md` están debajo del punto de ruptura y encima del esperado?
- Corré vos el script al volumen esperado con el comando que te dio: ¿los números se parecen?
- ¿El entorno de prueba difiere de producción en recursos, y está anotado cómo?

## 5. Señales de alarma

- "Aguanta el por diez sin problemas" sin un punto de ruptura. Si no encontró dónde se rompe, no
  subió la carga lo suficiente.
- El script de carga pega a la API pero no pasa por la pantalla, en un sistema donde la pantalla
  es la que carga. Mide otra cosa.
- Los resultados son de una corrida en la máquina del agente, no en el entorno de prueba.
- Se arreglaron cuellos de botella durante la prueba, "ya que estaba". Ahora no sabés qué número
  corresponde a qué versión.
