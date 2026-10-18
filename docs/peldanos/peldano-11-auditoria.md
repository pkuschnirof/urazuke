# Peldaño 11 — La auditoría periódica como insumo del plan (contrato del peldaño)

**Tramo:** operación.
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

## 1. Contexto requerido

Lo que sigue es la lista genérica. Los archivos concretos que tenés que tener hechos antes de cada
prompt, con su contenido y su estado mínimo, están en la sección 2, en el bloque "Antes de enviar
el prompt" que precede a cada uno.

- El repositorio completo, en solo lectura.
- La producción o el entorno de prueba, en solo lectura (base de datos, logs).
- La auditoría anterior, si hubo, para medir qué cambió.
- El alcance: integridad, seguridad, rendimiento, calidad de código, o todo.

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
- Estado mínimo aceptable: la sesión del auditor no es la del constructor, y tiene solo lectura.

> Audit this system for [scope]. Read-only: change nothing except writing your report to
> `docs/AUDIT_[date].md`. If auditing some part requires access you lack (the database, the
> log, an environment), tell me and mark that part as not audited; do not pass it as fine. Go
> through all of the code, not a sample. For every finding: where it is (file and line), what
> the risk is, what evidence proves it (the command, the query, the number), and its priority:
> P0 must be fixed now, P1 soon, P2 when possible. Give a grade to every dimension you audited.
> End with the list of P0 findings turned into proposed pending items. Reply in my language.

> [es]
> Auditá este sistema en [alcance]. Solo lectura: no cambies nada salvo escribir tu informe en
> `docs/AUDIT_[fecha].md`. Si auditar alguna parte requiere un acceso que no tenés (la base de
> datos, el log, un entorno), decímelo y marcá esa parte como no auditada; no la des por buena.
> Recorré todo el código, no una muestra. Para cada hallazgo: dónde está (archivo y línea), cuál
> es el riesgo, qué evidencia lo prueba (el comando, la consulta, el número), y su prioridad: P0
> hay que arreglarlo ya, P1 pronto, P2 cuando se pueda. Poné una nota a cada dimensión que
> auditaste. Terminá con la lista de hallazgos P0 convertidos en pendientes propuestos. Respondé
> en mi idioma.

Qué le estoy pidiendo, cláusula por cláusula: solo lectura (el auditor no arregla; propone); la
cláusula de completitud en su forma para auditar: **lo que no se pudo verificar se declara, no se
aprueba por omisión**; todo el código y no una muestra, porque los hallazgos graves suelen estar
donde nadie mira; cada hallazgo con ubicación, riesgo, evidencia y prioridad, para que sea
accionable sin releer el informe; notas por dimensión, para comparar con la auditoría anterior; y
los P0 ya convertidos en pendientes propuestos.

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

> [es]
> Leé `docs/AUDIT_[fecha].md`. Abrí un pendiente por cada P0 y P1, citando el hallazgo. Si no
> estás de acuerdo con alguno, decímelo con la evidencia en contra; no lo ignores.

Qué le estoy pidiendo: que la auditoría se convierta en pendientes (si no, es un informe que se
archiva), y que el desacuerdo sea explícito y con evidencia, no silencioso.

## 3. Resultado esperado

- `docs/AUDIT_[fecha].md` con: alcance, qué se pudo verificar y qué no (y por qué), los
  hallazgos con ubicación, riesgo, evidencia y prioridad, una nota por dimensión, y la lista de
  pendientes propuestos.
- En `docs/PENDING.md`: un pendiente por cada P0 y P1, citando el hallazgo.

## 4. Verificación de completitud

- ¿El informe dice qué NO pudo verificar? Si dice que verificó todo, desconfiá.
- Elegí dos hallazgos: ¿tienen archivo y línea, y una evidencia que podés reproducir?
- ¿Cada P0 tiene su pendiente abierto antes de dar la auditoría por cerrada?
- ¿Las notas por dimensión se van a poder comparar con la auditoría anterior?
- ¿Auditó el mismo agente que construyó? Si es así, pedí una segunda mirada sobre los P0.

## 5. Señales de alarma

- La auditoría no encontró ningún P0. En un sistema de más de tres meses, casi nunca es verdad;
  más probable es que el alcance fue chico o que el auditor compartía los supuestos.
- Los hallazgos no tienen línea de archivo. Son opiniones, no hallazgos.
- Pasaron dos semanas y los P0 siguen sin pendiente. La auditoría se archivó.
