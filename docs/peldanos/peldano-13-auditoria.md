# Peldaño 13 — La auditoría periódica como insumo del plan (contrato del peldaño)

**Tramo:** salida a producción.
**Cuándo:** obligatoria antes del primer despliegue a producción; abre el tramo de salida. Después,
en operación, cada uno o dos meses según el ritmo de cambio, y al cierre de cada etapa grande.
**Forma:** un solo tiro largo, idealmente a un agente distinto del que construye.
**Tamaño:** obligatorio antes del primer despliegue a producción, en cualquier proyecto; después,
proporcional al ritmo de cambio (un sistema que cambia todas las semanas se audita cada mes; uno
estable, cada seis).

## Para qué sirve

Mirá el sistema entero con ojos frescos cada tanto, y convertí lo que veas en pendientes. La
auditoría no es un informe que se archiva: es plan. Evita la contraseña escrita en el código que
nadie había visto, las consultas que leen tablas enteras [Ref. 18](../REFERENCIAS.md#ref-18), la
vulnerabilidad conocida en una dependencia, el componente de miles de líneas
[Ref. 41](../REFERENCIAS.md#ref-41). Y es la independencia del control de calidad llevada un paso
más adentro: el que audita no es el que construyó.

Sobre la independencia: no hace falta otra empresa ni otra herramienta. Alcanza con **otra sesión,
con otro archivo de instrucciones, que no haya participado de la construcción**. Lo que buscás es
que el auditor no comparta los supuestos del constructor. Un modelo que construyó un módulo "sabe"
que la contraseña hardcodeada era provisoria; un modelo que lo ve por primera vez la reporta como
lo que es. Así se detectaron dos puertas de administrador que el constructor había dejado en un
día [Ref. 40](../REFERENCIAS.md#ref-40).

Si podés elegir, que además sea **un modelo distinto** del que construyó, no solo otra sesión del
mismo: un estudio de 2026 midió que una sesión limpia con un modelo distinto encuentra más errores
que dos sesiones del mismo modelo ([arXiv 2610.01471](https://arxiv.org/abs/2610.01471)). Pero esa
preferencia tiene un **piso de capacidad**, y lo digo porque lo medí: otro modelo encuentra más
**sólo si ese modelo puede hacer el trabajo**. Por debajo de cierta capacidad la diversidad deja de
ser una ventaja y se vuelve un costo, porque verificar un hallazgo falso cuesta casi lo mismo que
haberlo buscado vos. Entonces el orden es éste: primero, **otro modelo, si está a la altura de la
tarea**; si no lo está, **otra sesión del mismo modelo, declarando la desviación** en la línea
`Auditor:` del informe; y **nunca** un auditor elegido por qué clave hay cargada o por qué
vencimiento aguanta. Si lo eligió una restricción de la herramienta, el informe lo dice con esas
palabras: es el caso `tool_constraint` de la clave `auditor_choice`, y existe porque la restricción
de herramienta se disfraza de elección técnica y lo único que la desnuda es tener que nombrarla.
Que el modelo del constructor sea el único disponible no es una falla del método: es una desviación
declarada, y una desviación declarada se puede auditar. (Decisión D-079, sobre el experimento del
2026-11-02: el auditor de otro modelo entregó cuatro de los nueve hallazgos que él mismo anunció, y
su único P0 era falso por leer mal un decimal; el del mismo modelo, apartándose de la preferencia y
declarándolo en su primera línea, entregó diecisiete, y ninguno resultó falso al verificarlos uno
por uno.)

## 1. Contexto requerido

Lo que sigue es la lista genérica. Los archivos concretos que tenés que tener hechos antes de cada
prompt, con su contenido y su estado mínimo, están en la sección 2, en el bloque "Antes de enviar
el prompt" que precede a cada uno.

- El repositorio completo, en solo lectura.
- La producción o el entorno de prueba, en solo lectura (base de datos, logs).
- La auditoría anterior, si hubo, para medir qué cambió.
- El alcance: integridad, seguridad, rendimiento, calidad de código, o todo.
- `docs/PENDING.md` con los pendientes cerrados del último ciclo y sus recibos, para que el
  auditor elija cuáles reproducir.
- El registro de la evidencia del último ciclo completo: los commits funcionales, los cierres de
  pendientes con sus recibos, y los recibos con mutación archivados. No es lo mismo que el punto
  anterior: ahí el auditor elige dos o tres recibos para reproducir, y acá tiene que poder contar
  el registro entero.

## 2. Prompts

**Inicial (a un agente distinto del constructor, si se puede):**

**Antes de enviar el prompt**, esto tiene que existir, y lo hacés vos (o el negocio con vos), no
el agente:

- Una sesión nueva del agente, distinta de la del constructor: un clon limpio del repositorio en
  otra carpeta y, si tu herramienta lo permite, un archivo de instrucciones distinto que solo diga
  "sos un auditor; no construiste este sistema". Sin esto, el auditor comparte los supuestos del
  constructor y los confirma.
- Acceso de solo lectura para esa sesión al entorno de prueba o a producción: base de datos, logs.
  Credenciales de solo lectura, fuera del repositorio, con el nombre de la variable dicho en el
  chat.
- El alcance, decidido por vos, para el hueco [scope]: integridad, seguridad, rendimiento, calidad
  de código, o todo.
- La auditoría anterior, si hubo (`docs/AUDIT_[fecha]` de la vez pasada), para que mida qué
  cambió.
- Quién va a auditar y por qué ése, decidido por vos: otro modelo si está a la altura de la tarea,
  otra sesión del mismo si no lo está, y nunca el que quedó porque era la clave que estaba cargada
  o el único que aguantaba el vencimiento. El prompt le pide declararlo en el informe, pero la
  decisión es tuya: si no la tomás, la toma la herramienta.
- Estado mínimo aceptable: la sesión del auditor no es la del constructor, y tiene solo lectura.

> Audit this system for [scope]. Read-only: change nothing except writing your report to
> `docs/AUDIT_[date].md`. If auditing some part requires access you lack (the database, the
> log, an environment), tell me and mark that part as not audited; do not pass it as fine. Go
> through all of the code, not a sample. Pick two or three pending items closed in the last cycle
> and reproduce their receipts literally: rerun the exact red-then-green commands they cite
> against the commits they name, and say for each one whether it reproduces or not. A receipt you
> only read is not a receipt you audited. For every finding: where it is (file and line), what
> the risk is, what evidence proves it (the command, the query, the number), and its priority:
> P0 must be fixed now, P1 soon, P2 when possible. Give a grade to every dimension you audited.
> End with the list of P0 findings turned into proposed pending items.
>
> This report carries declarations that a gate reads, each one under its fixed key, so write the
> key in English even when the report is in my language. `auditor_choice`: which case applies and
> who decided it -- `different_model` if you are a model other than the one that built this
> system; `same_model_declared` if you are the same model because no other one was up to the
> task; `tool_constraint` if what chose you was a key that happened to be loaded, a timeout or
> any other limit of the tool, and then say so with those words. In the `Auditor:` line, the
> model that built and the model that audits. `evidence_register_health`: the health of the
> register of the evidence, which is a dimension of this audit and is not optional -- how many
> functional commits carry no receipt of any kind; how many pending items closed as shipped lack
> their receipts, and of those how many have the reason written; and of the receipts that carry
> a mutation, how many can be applied again. Each of those figures measured by a program, with
> the command next to it, and a figure you could not measure declared as not measured and never
> as zero. If the register of the evidence is broken, every other finding in this report rests
> on data nobody can reproduce. `findings_by_destination`: every finding assigned to one
> destination -- `product` if the defect is in the audited system, `method` if it is in the
> method being followed, `tool` if it is in the tool that runs it -- with the register where its
> pending item goes. A finding whose destination nobody assigned leaves this audit open.
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
> Auditá este sistema en [alcance]. Solo lectura: no cambies nada salvo escribir tu informe en
> `docs/AUDIT_[fecha].md`. Si auditar alguna parte requiere un acceso que no tenés (la base de
> datos, el log, un entorno), decímelo y marcá esa parte como no auditada; no la des por buena.
> Recorré todo el código, no una muestra. Elegí dos o tres pendientes cerrados en el último ciclo
> y reproducí sus recibos tal cual: volvé a correr los comandos exactos de rojo y después verde
> que citan, contra los commits que nombran, y decime para cada uno si reproduce o no. Un recibo
> que solo leíste no es un recibo que auditaste. Para cada hallazgo: dónde está (archivo y línea),
> cuál es el riesgo, qué evidencia lo prueba (el comando, la consulta, el número), y su prioridad:
> P0 hay que arreglarlo ya, P1 pronto, P2 cuando se pueda. Poné una nota a cada dimensión que
> auditaste. Terminá con la lista de hallazgos P0 convertidos en pendientes propuestos. Respondé
> en mi idioma.
>
> Este informe lleva declaraciones que una compuerta lee, cada una con su clave fija, así que
> escribí la clave en inglés aunque el informe esté en mi idioma. `auditor_choice`: qué caso
> aplica y quién lo decidió —`different_model` si sos un modelo distinto del que construyó este
> sistema; `same_model_declared` si sos el mismo modelo porque ningún otro estaba a la altura de
> la tarea; `tool_constraint` si lo que te eligió fue una clave que estaba cargada, un
> vencimiento o cualquier otro límite de la herramienta, y entonces decilo con esas palabras. En
> la línea `Auditor:`, el modelo que construyó y el modelo que audita.
> `evidence_register_health`: la salud del registro de la evidencia, que es una dimensión de esta
> auditoría y no es opcional —cuántos commits funcionales no tienen ningún recibo; cuántos
> pendientes cerrados como entregados no tienen sus recibos, y de ésos cuántos tienen el motivo
> escrito; y de los recibos que llevan una mutación, cuántos se vuelven a aplicar—. Cada una de
> esas cifras medida por un programa, con el comando al lado, y una cifra que no pudiste medir
> declarada como no medida y nunca como cero. Si el registro de la evidencia está roto, todos los
> demás hallazgos de este informe se apoyan en datos que nadie puede reproducir.
> `findings_by_destination`: cada hallazgo asignado a un destino —`product` si el defecto es del
> sistema auditado, `method` si es del método que se está siguiendo, `tool` si es de la
> herramienta que lo corre— con el registro donde va su pendiente. Un hallazgo cuyo destino nadie
> asignó deja esta auditoría abierta.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.

Qué le estoy pidiendo, cláusula por cláusula: solo lectura (el auditor no arregla; propone); la
cláusula de completitud en su forma para auditar: **lo que no se pudo verificar se declara, no se
aprueba por omisión**; todo el código y no una muestra, porque los hallazgos graves suelen estar
donde nadie mira; **la reproducción literal de dos o tres recibos**, para que la auditoría verifique
evidencia, no solo la lea (esta es la cláusula que cierra el hueco de D-033: un rojo contado no es
un rojo auditado); cada hallazgo con ubicación, riesgo, evidencia y prioridad, para que sea
accionable sin releer el informe; notas por dimensión, para comparar con la auditoría anterior; y
los P0 ya convertidos en pendientes propuestos.

Y lo que agregan las dos decisiones de noviembre, dicho aparte porque las dos cambian el trabajo
del auditor y no solo su redacción: las **tres declaraciones con clave fija**, porque "completo" y
"auditado" no son propiedades que se puedan leer de un informe escrito en prosa libre (D-079 y
D-080); la **salud del registro de la evidencia** como dimensión obligatoria, porque es la única
que audita a las demás —si el registro de la evidencia está roto, todos los otros hallazgos del
informe se apoyan en datos que nadie puede reproducir, y entonces el informe entero vale menos de
lo que sus notas dicen—; y el **destino de cada hallazgo**, porque un defecto del método anotado en
el registro del producto es un defecto que nadie va a arreglar nunca: el dueño del producto no
puede arreglar el método, y el que puede nunca se enteró.

**De cierre (al constructor):**

**Antes de enviar el prompt**, tenés que tener esto a mano:

- `docs/AUDIT_[fecha].md`, leído por vos, y dos hallazgos al azar verificados con el auditor
  (pedile el comando, la línea; tiene que poder mostrarlos).
- La sesión del constructor abierta: este prompt va al constructor, no al auditor, con la fecha
  del archivo puesta en el hueco.
- Estado mínimo aceptable: leíste el informe, sabés cuántos P0 y P1 hay, y vas a contar los
  pendientes que abra.

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.
>
> Open each one in the register of the destination the report assigned to it: the product
> register for `product`, and for `method` and for `tool` the register of the method or the
> register of the tool, never the product's. If a finding arrives with no destination, ask me
> for it before opening anything.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [es]
> Leé `docs/AUDIT_[fecha].md`. Abrí un pendiente por cada P0 y P1, citando el hallazgo. Si no
> estás de acuerdo con alguno, decímelo con la evidencia en contra; no lo ignores.
>
> Abrí cada uno en el registro del destino que el informe le asignó: el registro del producto
> para `product`, y para `method` y para `tool` el registro del método o el de la herramienta,
> nunca el del producto. Si un hallazgo llega sin destino, pedímelo antes de abrir nada.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.

Qué le estoy pidiendo: que la auditoría se convierta en pendientes (si no, es un informe que se
archiva), y que el desacuerdo sea explícito y con evidencia, no silencioso.

Y, desde D-080, que cada pendiente se abra en el registro de su destino. El constructor es el que
tiene las manos en el producto, así que es el que más fácilmente manda todo al registro del
producto; un hallazgo que llega sin destino se te pregunta a vos antes de abrir nada.

## 3. Resultado esperado

- `docs/AUDIT_[fecha].md` con: alcance, qué se pudo verificar y qué no (y por qué), los
  hallazgos con ubicación, riesgo, evidencia y prioridad, una nota por dimensión, el resultado de
  reproducir dos o tres recibos del último ciclo, y la lista de pendientes propuestos.
- En `docs/PENDING.md`: un pendiente por cada P0 y P1, citando el hallazgo.
- En ese mismo informe, las tres declaraciones que una compuerta puede leer, con su clave en
  inglés: `auditor_choice` (qué caso aplica y quién lo decidió), `evidence_register_health` (las
  cifras del registro de la evidencia, cada una con el comando que la midió, y "no medida" cuando
  no se pudo medir) y `findings_by_destination` (cada hallazgo con su destino).
- En el registro de cada destino: un pendiente por cada P0 y P1. Los del producto en el registro
  del producto, los del método en el del método, los de la herramienta en el de la herramienta.

## 4. Verificación de completitud

- ¿El informe dice qué NO pudo verificar? Si dice que verificó todo, desconfiá.
- Elegí dos hallazgos: ¿tienen archivo y línea, y una evidencia que podés reproducir?
- ¿El informe dice qué recibos reprodujo, con el comando y el resultado, o solo dice que los leyó?
- ¿Cada P0 tiene su pendiente abierto antes de dar la auditoría por cerrada?
- ¿Las notas por dimensión se van a poder comparar con la auditoría anterior?
- ¿Auditó el mismo agente que construyó? Si es así, pedí una segunda mirada sobre los P0.
- ¿El informe dice quién auditó y por qué ése? Si la razón es que era el único que había cargado o
  el único que aguantaba el vencimiento, eso es `tool_constraint` y tiene que estar escrito así.
- ¿Están las cifras de la salud del registro de la evidencia, cada una con el comando que la midió?
  Una cifra que no se pudo medir dice "no medida"; un cero que no distingue "no hay ninguno" de "no
  pude mirar" no es una cifra (CQ-19, el denominador).
- ¿Cada hallazgo tiene destino, y su pendiente quedó abierto en el registro de ese destino?

## 5. Señales de alarma

- La auditoría no encontró ningún P0. En un sistema de más de tres meses, casi nunca es verdad;
  más probable es que el alcance fue chico o que el auditor compartía los supuestos.
- Los hallazgos no tienen línea de archivo. Son opiniones, no hallazgos.
- El informe dice que los recibos "se revisaron" sin mostrar el comando que corrió ni su salida.
  Un recibo leído y uno reproducido no son lo mismo, y solo el segundo cierra la objeción de D-033.
- Pasaron dos semanas y los P0 siguen sin pendiente. La auditoría se archivó.
- El informe elogia la independencia del auditor y no dice qué caso de `auditor_choice` aplica.
  Cuando al auditor lo eligió la herramienta y no vos, es justo el caso que nadie escribe solo.
- La salud del registro de la evidencia vuelve en cero y sin comando. Un cero sin el comando que lo
  produjo es un "no pude mirar" disfrazado de buena noticia.
- Todos los hallazgos salieron con destino `product`. En un control que mira el sistema con el
  método y la herramienta puestos, que ninguno sea del método ni de la herramienta es improbable:
  lo más probable es que nadie se preguntó por el destino.
