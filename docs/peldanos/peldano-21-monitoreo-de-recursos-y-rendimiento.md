# Peldaño 21 — Monitoreo de recursos, funciones y consultas fuera de rango, con reporte cíclico (contrato del peldaño)

**Tramo:** operación.
**Cuándo:** se monta en la fase de operación, con el primer despliegue a producción, con los umbrales del 19 y las métricas del 16; desde entonces, corre solo, y el
reporte cíclico se lee con el dueño en cada ciclo (semanal en un sistema con consecuencias,
mensual en uno chico). Cada evento fuera de rango entra al bucle como pendiente correctivo. En un
legado, igual, con una diferencia: la primera lectura del reporte es la línea base, y lo que ya
estaba fuera de rango el primer día se convierte en pendientes con su marca de velocidad.
**Forma:** un solo tiro para montar; después, rutina cíclica.
**Tamaño:** mínimo en un proyecto chico (un reporte mensual, una alerta de disco y una de
errores de base); completo en uno con consecuencias (umbrales por función y por consulta,
alertas, reporte semanal).

## Para qué sirve

Las pruebas del peldaño 19 dicen cómo se comporta el sistema un día, con una carga que yo elegí.
La producción es todos los días, con la carga que los usuarios eligen, con los datos creciendo,
y con cambios que entran cada semana. Lo que estaba en rango en octubre sale de rango en marzo
sin que nadie cambie nada, solo porque la tabla creció. Este peldaño existe para que eso se vea
**antes de que lo vea el usuario**: el uso de recursos contra la capacidad, el tiempo de
respuesta de cada función, cada punto de entrada, cada tarea y cada consulta, comparado con los
umbrales del 19 y con su propia historia; una alerta cuando algo sale de rango; y un reporte
cíclico que yo leo con el dueño, donde cada desvío tiene una causa o un pendiente. El techo
apretado a lo medido [Ref. 37](../REFERENCIAS.md#ref-37) es la idea de fondo: el rango no es una
opinión, es el número medido más un margen; y la cuota de integración continua que se fundió sin
que nadie mirara [Ref. 39](../REFERENCIAS.md#ref-39) es el fallo que evita: un recurso que se consume
sin monitoreo se descubre cuando se acaba.

Dos reglas que no negocio. Una alerta que se dispara y nadie lee es un defecto de la alerta, no
del que no la leyó: se ajusta o se elimina. Y un umbral no se sube para callar una alerta sin una
razón medida escrita.

**Si sos principiante.** *Monitorear* es mirar el sistema todo el tiempo por máquina y avisar
cuando algo se sale de lo normal. Los *recursos* son lo que el sistema consume: procesador,
memoria, disco, conexiones a la base, y también cuotas de servicios externos (cuántos mensajes
por mes te deja mandar el proveedor). "*Fuera de rango*" quiere decir por encima de un *umbral*
(un límite fijo, que salió de las pruebas del peldaño 19) o muy distinto de la *línea base* (lo
que ese mismo número venía dando los últimos días). Una *alerta* es el aviso en el momento; el
*reporte cíclico* es el resumen que se lee cada semana o cada mes con calma.

## 1. Contexto requerido

Lo que sigue es la lista genérica. Los archivos concretos que tenés que tener hechos antes de cada
prompt, con su contenido y su estado mínimo, están en la sección 2, en el bloque "Antes de enviar
el prompt" que precede a cada uno.

- La observabilidad (16): las métricas y los registros de los que se alimenta.
- Los umbrales del 19 y los presupuestos del 17.
- Producción desplegada (15), con acceso de solo lectura para el monitoreo.
- El canal de alertas y el ciclo del reporte: los decidís vos con el dueño.

## 2. Prompts

**Inicial (montar y demostrar):**

**Antes de enviar el prompt**, esto tiene que existir, y lo hacés vos (o el negocio con vos), no
el agente:

- `docs/OBSERVABILITY.md` (16) y `docs/PERFORMANCE.md` (19) cerrados: las métricas y los umbrales.
- `docs/PERSISTENCE.md` (17) con los presupuestos por camino.
- El canal de alertas, decidido con el dueño: a quién le llega, por dónde (correo, mensajería),
  y quién la lee a qué hora. Una alerta que llega a una casilla que nadie abre es decoración.
- El ciclo del reporte: semanal o mensual, y quién lo lee con vos.
- Acceso de solo lectura del monitoreo a producción (el servidor, la base, los registros), con la
  credencial fuera del chat.
- El porcentaje de desvío sobre la línea base que considerás alarma (por ejemplo, 30 % más que el
  promedio de los últimos catorce días), para el hueco del prompt.
- Estado mínimo aceptable: hay umbrales escritos, un canal con una persona que lo lee, y un ciclo.

> We are going to keep this system watched in production. Using the metrics and logs of step 16,
> the budgets of `docs/PERSISTENCE.md` and the thresholds of `docs/PERFORMANCE.md`, set up: (1)
> collection of resource usage (CPU, memory, disk, database connections, queue sizes, external
> quotas) and of the response time of every function, endpoint, job and query, with the
> correlation id, kept with a history; (2) alerts when any of them is out of range: above the
> thresholds, or more than [X] percent over the baseline of the last [N] days, sent to [channel],
> with the rule that an alert that fires without a human reading it is a defect of the alert and
> gets fixed or removed; (3) a cyclic report, [weekly], generated automatically, with: resource
> usage against capacity and its trend, the slowest functions and queries and how they moved
> against the previous period, every out-of-range event with its cause if known, and what you
> propose for each; (4) the rule that every out-of-range event becomes a corrective pending item
> with the measured number as its acceptance criterion, closed with the full routine. Nothing
> here may read or store personal data. Show me the first report generated on real data from the
> test environment, and one alert fired on purpose by exceeding a threshold. Document the
> thresholds, the channel, the cycle and how to silence an alert with a written reason in
> `docs/MONITORING.md`. Reply in my language.

> [es]
> Vamos a mantener este sistema vigilado en producción. Con las métricas y los registros del
> peldaño 16, los presupuestos de `docs/PERSISTENCE.md` y los umbrales de `docs/PERFORMANCE.md`,
> armá: (1) la recolección del uso de recursos (CPU, memoria, disco, conexiones a la base, tamaño
> de las colas, cuotas externas) y del tiempo de respuesta de cada función, punto de entrada,
> tarea y consulta, con el identificador de correlación, guardado con historia; (2) alertas cuando
> cualquiera salga de rango: por encima de los umbrales, o más de [X] por ciento sobre la línea
> base de los últimos [N] días, enviadas a [canal], con la regla de que una alerta que se dispara
> sin que un humano la lea es un defecto de la alerta y se arregla o se elimina; (3) un reporte
> cíclico, [semanal], generado automáticamente, con: uso de recursos contra capacidad y su
> tendencia, las funciones y consultas más lentas y cómo se movieron respecto del período
> anterior, cada evento fuera de rango con su causa si se conoce, y qué proponés para cada uno;
> (4) la regla de que cada evento fuera de rango se convierte en un pendiente correctivo con el
> número medido como criterio de aceptación, cerrado con la rutina completa. Nada de esto puede
> leer ni guardar datos personales. Mostrame el primer reporte generado con datos reales del
> entorno de prueba, y una alerta disparada a propósito superando un umbral. Documentá los
> umbrales, el canal, el ciclo y cómo silenciar una alerta con una razón escrita en
> `docs/MONITORING.md`. Respondé en mi idioma.

Qué le estoy pidiendo: recolección con historia (sin historia no hay línea base, y sin línea base
no hay "fuera de rango"); alertas contra dos referencias, el umbral absoluto del 19 y el desvío
relativo sobre la propia historia; el reporte cíclico con la forma de un reporte del peldaño 12
(cada desvío con causa o con propuesta, nada de "todo normal"); la conversión de cada desvío en
pendiente con número; y las dos demostraciones: el primer reporte y una alerta provocada.

**Rutina de cada ciclo (va en el contrato de convivencia):**

**Antes de enviar el prompt**, tenés que tener esto a mano:

- El reporte cíclico recién generado, y un rato tuyo con el dueño para leerlo.
- `docs/MONITORING.md` a mano, para comparar los umbrales.
- Estado mínimo aceptable: leíste el reporte antes de pegar el prompt; el agente no lo lee por
  vos.

> With every cyclic report of resources and performance: go through it with me, event by event;
> tell me which out-of-range events become pending items now and which can wait, with your
> reason; write the decision with the date in the report itself; and tell me whether any threshold
> must change and why, with the measurement that justifies it. Never raise a threshold to silence
> an alert without a measured reason written down.

> [es]
> Con cada reporte cíclico de recursos y rendimiento: recorrelo conmigo, evento por evento; decime
> qué eventos fuera de rango se convierten en pendientes ahora y cuáles pueden esperar, con tu
> razón; escribí la decisión con la fecha en el reporte mismo; y decime si algún umbral tiene que
> cambiar y por qué, con la medición que lo justifica. Nunca subas un umbral para callar una
> alerta sin una razón medida escrita.

Qué le estoy pidiendo: que el reporte se lea y se decida, con rastro; y la regla del umbral, que
es la que evita que el monitoreo se vuelva silencioso de a poco.

## 3. Resultado esperado

- Recolección de recursos y tiempos de respuesta con historia, sin datos personales.
- Alertas por umbral y por desvío, a un canal que una persona lee.
- El reporte cíclico, generado solo, con cada desvío causado o propuesto.
- `docs/MONITORING.md` con umbrales, canal, ciclo y cómo silenciar con razón.
- La rutina en el contrato; los desvíos como pendientes correctivos.

## 4. Verificación de completitud

- Pedí que se supere un umbral a propósito en prueba: ¿te llegó la alerta, por el canal
  acordado, con el identificador?
- Leé el último reporte: ¿cada evento fuera de rango tiene causa o propuesta? ¿Alguno quedó sin
  nada?
- ¿Hay un pendiente por cada desvío que decidiste atender, con el número como criterio?
- ¿Algún umbral subió desde el 19? ¿Con qué razón escrita?
- ¿El reporte menciona la cuota de los servicios externos (mensajería, integración continua)?

## 5. Señales de alarma

- Las alertas se disparan todos los días y nadie las lee. Hay que bajar su cantidad hasta que
  cada una signifique algo, no acostumbrarse.
- El reporte dice "todo normal" tres ciclos seguidos. O el sistema no tiene usuarios, o el
  reporte no mira lo que importa.
- Un umbral subió "para que deje de avisar". Es el peldaño 21 muriendo en silencio.
- El monitoreo guarda datos personales "para poder diagnosticar". Es una filtración con horario.
