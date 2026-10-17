# Peldaño 11 — La auditoría periódica como insumo del plan (contrato del peldaño)

**Tramo:** operación (cada tanto: al cerrar una etapa grande, antes de un despliegue importante,
o cada uno o dos meses).
**Forma:** un solo tiro largo, idealmente a cargo de un agente distinto del que construye.
**Tamaño:** obligatoria antes del primer despliegue a producción, en cualquier proyecto; después,
proporcional al ritmo de cambio (un sistema que cambia todas las semanas se audita cada mes; uno
estable, cada seis).

## Para qué sirve

Para mirar el sistema entero con ojos frescos cada tanto, y convertir lo visto en pendientes.
La auditoría no es un informe que se archiva: es plan. Evita la contraseña escrita a fuego que
nadie vio, las 264 consultas que leían tablas enteras, la vulnerabilidad conocida en una
dependencia, el componente de 2.679 líneas. Y es la independencia de QA llevada un paso más
adentro: el que audita no es el que construyó.

Sobre la independencia: no hace falta otra empresa ni otra herramienta. Alcanza con **otra
sesión, con otro archivo de instrucciones, que no haya participado de la construcción**. Lo que
se busca es que el auditor no comparta los supuestos del constructor. Un modelo que construyó un
módulo "sabe" que la contraseña hardcodeada era provisoria; un modelo que lo ve por primera vez
la reporta como lo que es.

## 1. Contexto requerido

- El repositorio completo, en solo lectura.
- Producción o el entorno de prueba, en solo lectura (base de datos, logs).
- La auditoría anterior, si hubo, para medir qué cambió.
- El alcance: integridad, seguridad, rendimiento, calidad de código, o todo.

## 2. Prompts

**Inicial (a un agente distinto del constructor, si se puede):**

> Audit this system for [scope]. Read-only: change nothing except writing your report to
> `docs/AUDIT_[date].md`. If auditing some part requires access you lack (the database, the
> log, an environment), tell me and mark that part as not audited; do not pass it as fine. Go
> through all of the code, not a sample. For every finding: where it is (file and line), what
> the risk is, what evidence proves it (the command, the query, the number), and its priority:
> P0 must be fixed now, P1 soon, P2 when possible. Give a grade to every dimension you audited.
> End with the list of P0 findings turned into proposed pending items. Reply in my language.

Qué le estamos pidiendo, cláusula por cláusula: solo lectura (el auditor no arregla; propone);
la cláusula de completitud en su forma para auditar: **lo que no se pudo auditar se declara, no
se aprueba por omisión**; todo el código y no una muestra, porque los hallazgos graves suelen
estar donde nadie mira; cada hallazgo con ubicación, riesgo, evidencia y prioridad, para que sea
accionable sin releer el informe; notas por dimensión, para comparar con la auditoría anterior; y
los P0 ya convertidos en pendientes propuestos.

**De cierre (al constructor):**

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.

Qué le estamos pidiendo: que la auditoría se convierta en pendientes (si no, es un informe que
se archiva), y que el desacuerdo sea explícito y con evidencia, no silencioso.

## 3. Resultado esperado

- `docs/AUDIT_[date].md` con: alcance, qué se pudo auditar y qué no (y por qué), los
  hallazgos con ubicación, riesgo, evidencia y prioridad, una nota por dimensión, y la lista
  de pendientes propuestos.
- En `docs/PENDING.md`: un pendiente por cada P0 y P1, citando el hallazgo.

## 4. Verificación de completitud

- ¿El informe dice qué NO pudo auditar? Si dice que auditó todo, desconfiá.
- Elegí dos hallazgos: ¿tienen archivo y línea, y una evidencia que podés reproducir?
- ¿Cada P0 tiene su pendiente abierto antes de dar por cerrada la auditoría?
- ¿Las notas por dimensión se pueden comparar con la auditoría anterior?
- ¿Auditó el mismo agente que construyó? Si fue así, pedí una segunda mirada sobre los P0.

## 5. Señales de alarma

- La auditoría no encontró ningún P0. En un sistema con más de tres meses de vida, eso casi
  nunca es verdad; más probable es que el alcance fue chico o el auditor compartía supuestos.
- Los hallazgos no tienen línea de archivo. Son opiniones, no hallazgos.
- Pasaron dos semanas y los P0 siguen sin pendiente. La auditoría se archivó.
