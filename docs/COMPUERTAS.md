# The gates, as data

**This document is generated.** It comes out of `gates/` with `node build/gates_doc.mjs`, and the
build fails when what is on disk does not match the data. Do not edit it: fix the source.

**It is written in English on purpose** (decision D-051). It is tool documentation, it is not part
of the translated corpus of the method, and whatever is not translated is published in the
canonical language of the profession. Translating for the comprehension of an end user is the job
of the consumer tool, not of this document.

Catalog version: **2026.10.6** - schema **2**
- content fingerprint `649f10179cc1a4ef...` - published at `docs/html/api/gates.json`.

## What this is, and why it lives here

The mechanical definition of the gates of the method -- which artifact has to exist at each step,
what it has to say, and with which strategy it is verified -- used to live compiled inside the tool
that enforces it. Which meant it changed when the tool shipped a version, not when the method
decided. Since decision D-050 the method owns the definition and publishes it as data, exactly as
it already publishes the prompts, and the tool consumes it.

## The version: what a project freezes

A project starts and ends on the same version of the method, unless somebody applies the double
lock. For that to be possible, what is published has to be identifiable and stable:

- **`catalog_version`** (`2026.10.6`): declared by hand by the method. It is what a project freezes, and
  what has to read back the same two years from now.
- **`content_hash`** (`sha256`): computed by the build over the enforceable content, with the keys sorted
  and without the publication metadata. The consumer **recomputes it and compares**: if it only read
  it, a frozen copy edited by hand or truncated by a merge would be undetectable.
- **`git_commit`**: informative, and no comparison looks at it. The identifier a build can know about
  itself is always the one of the change *before* the change that contains it, because it is computed
  before saving; it is useless as the identity of what is published.

Covered by the fingerprint: `schema_version`, `catalog_version`, `languages`, `evaluators`, `evaluator_semantics`, `compatibility`, `tramos`, `steps`, `stations`, `loop_entry`, `heuristics`, `adapters`, `project_config`, `counts`, `what`.
Left out: `generated_at`, `git_commit`, `git_commit_note`, `source`, `license`, `content_hash`.
Nothing in between: Every key of the published payload is either covered or excluded, and the validator checks it. A requirement-bearing key left out of both would travel without protection: a frozen copy could be altered there and the recomputed hash would still match.

When the version moves: Any change to a key listed in hash_covers raises catalog_version, even when no requirement changed: the content hash moves with it, and two different contents published under one declared version would make a freeze unreadable. A regeneration that only rewrites generated_at or git_commit changes nothing covered, so it leaves the version alone.

The ledger: gates/catalog.json#changelog records, for each catalog_version, the content hash it produced. The build refuses to publish when the hash of the current content is not the one recorded for the current version: that is what forces the bump instead of trusting it. The ledger is append-only and a hash already recorded is never edited, for the same reason the base is not edited. It is not part of the published payload, so recording a new entry cannot change the hash it records.

- **2026.10.1** (2026-10-23, D-050) -- `8f9aa195001e2a00...`
- **2026.10.2** (2026-10-23, D-053) -- `3bd03ac3bf79a600...`
- **2026.10.3** (2026-10-24, D-055) -- `0f3c1b472f922428...`
- **2026.10.4** (2026-10-26, D-061) -- `ad88adccfcbfff7d...`
- **2026.10.5** (2026-10-27, D-065) -- `6fc83add4a1245d3...`
- **2026.10.6** (2026-10-27, D-067) -- `649f10179cc1a4ef...`

## The language of each text

Which language each human-readable text of this file is in. It is declared mechanically because the file is bilingual: reading `data` as a single language would make a consumer show Spanish to an English reader.

- Declared: `languages.data` = `mixed`, default `en`.
- Spanish scope: `tramos`, `steps`, `stations`, `loop_entry`, told apart by `since_schema`.
- Rule: Inside the keys listed in `spanish_scope`, a text is Spanish when neither its own node nor any enclosing node declares `since_schema` >= 2: it comes from the frozen base, and the base is not edited. A node with `since_schema` >= 2 is new, and its text is English. Every text outside `spanish_scope` is English.
- Readable text fields: `title`, `summary`, `verify`, `label`, `text`, `note`.
- Ids, step and station keys, evaluator names, enum values, file paths and the regular expressions of must_contain / should_contain are not prose and carry no language. The regular expressions are deliberately bilingual, so that a gate matches a document written in either language.
- The method checks this declaration on every build: every text the rule calls Spanish has to appear literally in gates/baseline.json, and no text the rule calls English may read as Spanish. If the declaration stops being true, nothing is published.
- **For a consumer:** Do not print these texts to an end user. Read the stable `id` -- an opaque key that is never translated -- and take the text from your own catalogue. That holds for the English texts too: this file is the definition of the gates, not a translated user interface.

## What an installation cannot measure

- Unknown evaluator, **required**: The installation does NOT report green. It reports "declared, not measured by this installation", naming the evaluator, and the step does not advance.
- Unknown evaluator, not required: A warning: it names it and the step may advance.
- Forbidden: Approximating with the closest evaluator, or ignoring the block. Zero silent damage.

## The evaluator vocabulary

An evaluator is the strategy a tool uses to decide whether a step is fulfilled. The vocabulary is
closed and **only grows**: none is removed, none is renamed and none changes meaning, exactly like
a stable error code.

| evaluator | since schema | what it checks |
|---|---|---|
| `artifacts` | 1 | Every declared artifact exists, passes its min_bytes, satisfies each must_contain and, if it is a glob, the newest one is within its fresh_days. A should_contain that does not appear leaves a warning, not a red. |
| `sizing` | 1 | The artifacts, plus an admissible sizing record: volumetry, retention per data class and hardware envelope, all declared by the owner. |
| `ci` | 1 | The artifacts, plus a continuous integration definition that exists in the repository. |
| `pendings_spec` | 1 | The artifacts, plus every open pending item carrying its full specification (acceptance criteria and how it is verified). An empty plan is red, not green. |
| `receipts` | 1 | The artifacts, plus evidence receipts including at least one proven red and one green. No receipt, no step. |
| `reports` | 1 | The artifacts, plus every closed pending item having its honest report (verified / believed / blind spot). No closure yet is red, not green. |
| `meters` | 1 | A meter exists in the repository and the meter has a test of its own. |
| `owner` | 1 | Nothing mechanical: the owner verifies it and signs it. No step of the catalogue chooses it today; the state exists for a step that leaves no machine check at all, and that is why the name is published anyway. |
| `heuristics` | 2 | The Annex H rule catalogue is declared and active per group; every active rule has an instrument, a severity and a checker; every switched-off rule has its record with reason, author and review date (switched off without a record is red, not the absence of a rule); every undeclared threshold is reported as undeclared instead of invented; and the report emits the two figures with the ruleset fingerprint. A switched-off group is never read as fulfilled. |
| `profile_matrix` | 2 | The functionality-by-profile matrix exists and is consistent: every functionality has at least one profile, every profile has at least one functionality and its entry point, and navigation is derived from the matrix rather than hand-written. And for every profile, the end-to-end test compares what is reachable against its row: neither less nor more. |
| `manual_cases_per_profile` | 2 | Every manual test case was run once per affected profile, derived from the matrix. A case run with a single profile does not count as executed. |
| `pendings_profiles` | 2 | Every pending item that touches a screen declares its functional convergence group, the profiles that have it and one acceptance criterion per profile. Without that declaration the pending item does not pass the step. |

## The ladder: twenty-four steps

The titles, summaries and completeness questions of the base are reproduced in the Spanish of the
method, which is the language they were frozen in: the base is not edited (D-051). Whatever the
method declares from now on is in English, and it is marked as new.

### I. Arranque

| # | step | form | demand | evaluators | inputs | artifacts | checks |
|---|---|---|---|---|---|---|---|
| 0 | Este proyecto se puede encarar asi? (elegibilidad) | conversation | always | `artifacts` | 1 | 1 | 3 |
| 1 | El contrato de convivencia | one_shot | always | `artifacts` | 2 | 1 | 3 |
| 2 | La definicion del proyecto, el arbol semantico y la lectura obligatoria | conversation | always | `artifacts` | 2 | 5 | 5 |
| 3 | Dimensionar antes de disenar la arquitectura | conversation | always | `sizing` | 3 | 1 | 3 |
| 4 | El esqueleto con sus compuertas | one_shot | always | `ci` | 2 | 2 | 3 |

### II. Bucle de construccion

| # | step | form | demand | evaluators | inputs | artifacts | checks |
|---|---|---|---|---|---|---|---|
| 5 | El plan son los pendientes | routine | always | `pendings_spec`, `pendings_profiles` (new) | 2 | 1 | 4 |
| 6 | Las decisiones se escriben junto al codigo | conversation | always | `artifacts` | 1 | 1 | 2 |
| 7 | Medir antes de construir, con un instrumento que tambien se verifica | one_shot | proportional | `meters` | 0 | 0 | 3 |
| 8 | Tests como candados, probados en rojo | routine | always | `receipts`, `profile_matrix` (new) | 2 | 1 | 4 |
| 9 | Calidad del codigo verificada por maquina, con compuerta | routine | minimum | `ci`, `heuristics` (new) | 1 | 4 | 6 |
| 10 | Los casos de prueba manual se escriben con la funcionalidad y los ejecutan personas | routine | always | `artifacts`, `manual_cases_per_profile` (new) | 2 | 1 | 4 |
| 11 | Simetria entre productor y consumidor, y el registro de anti-patrones | routine | minimum | `artifacts` | 1 | 2 | 2 |
| 12 | Verificacion honesta y reporte proporcional | routine | always | `reports`, `heuristics` (new) | 1 | 1 | 4 |

### III. Salida a produccion

| # | step | form | demand | evaluators | inputs | artifacts | checks |
|---|---|---|---|---|---|---|---|
| 13 | La auditoria periodica como insumo del plan | one_shot | minimum | `artifacts` | 2 | 2 | 5 |
| 14 | Fail-closed, candados y cero dano silencioso | conversation | minimum | `artifacts` | 2 | 1 | 2 |
| 15 | Integracion continua, entornos, secretos y despliegue como parte del producto | one_shot | minimum | `ci` | 1 | 2 | 4 |
| 16 | Observabilidad y trazabilidad totales, con nivel configurable | one_shot | minimum | `artifacts` | 2 | 1 | 2 |
| 17 | Optimizacion de la capa de persistencia, medida antes y despues | one_shot | proportional | `artifacts` | 2 | 1 | 2 |
| 18 | Escaneo y solucion de vulnerabilidades, en la cadena y con calendario | one_shot | minimum | `ci` | 2 | 2 | 2 |
| 19 | Pruebas de rendimiento en volumen y punto de ruptura | one_shot | proportional | `artifacts` | 2 | 2 | 2 |
| 20 | Documentacion viva y manuales que una persona puede seguir sin IA | routine | minimum | `artifacts` | 3 | 4 | 3 |

### IV. Operacion

| # | step | form | demand | evaluators | inputs | artifacts | checks |
|---|---|---|---|---|---|---|---|
| 21 | Monitoreo de recursos, funciones y consultas fuera de rango, con reporte ciclico | routine | minimum | `artifacts` | 2 | 2 | 2 |
| 22 | Monitoreo de errores y reporte ciclico: ningun error sin pendiente | routine | always | `artifacts` | 2 | 2 | 2 |
| 23 | El agente adentro del sistema, y la retrospectiva con numero | conversation | minimum | `artifacts` | 2 | 4 | 4 |

### What each step demands, in detail

**0 - Este proyecto se puede encarar asi? (elegibilidad)** (`u00-elegibilidad`, prompt `peldano-00`)

> Decidir, con criterios excluyentes y ponderados, si el proyecto se puede construir con el metodo.

Inputs the owner has ready before the first prompt:
- `docs/INITIAL_SURVEY.md` -- relevamiento inicial escrito por el dueno

Artifacts the agent leaves behind, and that the gate looks for on disk:
- `docs/ELIGIBILITY.md` -- veredicto de elegibilidad; has to say: `eligib|elegib`

Completeness check, without reading code:
- Hay un veredicto escrito (elegible / no elegible / elegible con proyectos previos)?
- Cada criterio excluyente tiene su verificacion, no una opinion?
- Lo que falta quedo como pendiente, no como suposicion?

**1 - El contrato de convivencia** (`u01-contrato-de-convivencia`, prompt `peldano-01`)

> Las reglas que el agente cumple en cada sesion, escritas antes del codigo.

Inputs the owner has ready before the first prompt:
- `docs/ELIGIBILITY.md`
- `docs/MY_PREFERENCES.md` -- tus preferencias, en una pagina; at least 50 bytes, so that a sketch does not count

Artifacts the agent leaves behind, and that the gate looks for on disk:
- `docs/WORKING_AGREEMENT.md` -- contrato de convivencia; has to say: `evidence|evidencia`

Completeness check, without reading code:
- El contrato dice que ninguna afirmacion de "hecho" vale sin evidencia?
- Dice que el agente pide lo que falta en vez de estimar?
- Esta cargado donde la herramienta lo lee en cada sesion?

**2 - La definicion del proyecto, el arbol semantico y la lectura obligatoria** (`u02-definicion-y-lectura`, prompt `peldano-02`)

> Que es el sistema, para quien, con que casos de uso, y que se lee en cada sesion.

Inputs the owner has ready before the first prompt:
- `docs/INITIAL_SURVEY.md`
- `docs/WORKING_AGREEMENT.md`

Artifacts the agent leaves behind, and that the gate looks for on disk:
- `PROJECT.md` -- definicion del proyecto
- `docs/SEMANTIC_TREE.md` -- arbol semantico
- `docs/STATUS.md` -- estado del proyecto; at least 80 bytes, so that a sketch does not count
- `docs/GLOSSARY.md` -- the user glossary, in the words the business uses; at least 80 bytes, so that a sketch does not count; **new in schema 2**
- `docs/PROFILES.md` -- the list of profiles, who each one is and what they come to do; at least 80 bytes, so that a sketch does not count; **new in schema 2**

Completeness check, without reading code:
- PROJECT.md explica el sistema a alguien que no lo conoce?
- El arbol semantico tiene cada caso de uso que vos nombraste?
- Lo inferido esta marcado como inferido?
- Is the user glossary written, with the words people actually use for things? **(new in schema 2, anchor prior_input_1)**
- Is the list of profiles written, saying who each one is and what they come to do? **(new in schema 2, anchor prior_input_2)**

**3 - Dimensionar antes de disenar la arquitectura** (`u03-dimensionar`, prompt `peldano-03`)

> Volumetria, retencion, concurrencia y envoltura de hardware antes de elegir la persistencia.

Inputs the owner has ready before the first prompt:
- `docs/VOLUME_SURVEY.md` -- relevamiento de volumen; at least 80 bytes, so that a sketch does not count
- `PROJECT.md`
- `docs/SEMANTIC_TREE.md`

Artifacts the agent leaves behind, and that the gate looks for on disk:
- `docs/SIZING.md` -- dimensionamiento escrito

Completeness check, without reading code:
- Cada numero tiene su fuente (vos, el negocio, medido), no una estimacion del agente?
- La persistencia elegida tiene su envoltura de validez escrita?
- El registro de dimensionamiento esta admisible?

**4 - El esqueleto con sus compuertas** (`u04-esqueleto`, prompt `peldano-04`)

> Repositorio, integracion continua, entornos y las compuertas que nadie puede saltar.

Inputs the owner has ready before the first prompt:
- `docs/ENVIRONMENTS_SURVEY.md` -- relevamiento de entornos; at least 80 bytes, so that a sketch does not count
- `docs/SIZING.md`

Artifacts the agent leaves behind, and that the gate looks for on disk:
- `docs/GATES.md` -- las compuertas escritas
- `docs/STATUS.md` -- STATUS con el comando de la bateria; has to say: `test`

Completeness check, without reading code:
- La cadena corre sola en cada push y se pone en rojo cuando corresponde?
- Hay un comando conocido para correr la bateria, anotado en STATUS?
- Las compuertas estan escritas en GATES.md?

**5 - El plan son los pendientes** (`u05-pendientes`, prompt `peldano-05`)

> Cada pendiente lleva su especificacion completa: criterios de aceptacion y como se verifica.

Inputs the owner has ready before the first prompt:
- `docs/blocks/*.md` -- el pedido del bloque, escrito por vos
- `docs/SEMANTIC_TREE.md`

Artifacts the agent leaves behind, and that the gate looks for on disk:
- `docs/PROFILE_MATRIX.md` -- the functionality-by-profile matrix; has to say: `perfil|profile`; **new in schema 2**

Completeness check, without reading code:
- Cada pendiente abierto tiene criterios de aceptacion "dado, cuando, entonces"?
- Cada pendiente dice como se verifica sin leer codigo?
- Los pendientes cerrados conservan su especificacion (documentacion del hecho)?
- Does every pending item that touches a screen declare its convergence group, its profiles and one acceptance criterion per profile? **(new in schema 2, anchor 1)**

**6 - Las decisiones se escriben junto al codigo** (`u06-decisiones`, prompt `peldano-06`)

> Cada decision con dueno, fecha, la frase textual de origen y donde se aplica.

Inputs the owner has ready before the first prompt:
- `docs/WORKING_AGREEMENT.md`

Artifacts the agent leaves behind, and that the gate looks for on disk:
- `docs/DECISIONS.md` -- registro de decisiones

Completeness check, without reading code:
- Cada decision tiene quien, cuando y la frase textual?
- El agente pregunta antes de decidir lo que es tuyo?

**7 - Medir antes de construir, con un instrumento que tambien se verifica** (`u07-medir`, prompt `peldano-07`)

> Un numero que alimenta una decision se mide con un programa que tiene su propio test.

Completeness check, without reading code:
- El medidor esta en el repositorio y tiene su test?
- El numero viene con el comando que lo produce y la fecha?
- Lo aproximado esta marcado como aproximado, con su margen?

**8 - Tests como candados, probados en rojo** (`u08-tests-en-rojo`, prompt `peldano-08`)

> El rojo contra el codigo anterior como recibo, el verde, la regresion y la prueba de punta a punta.

Inputs the owner has ready before the first prompt:
- `docs/WORKING_AGREEMENT.md`
- `docs/STATUS.md` -- has to say: `test`

Artifacts the agent leaves behind, and that the gate looks for on disk:
- `docs/WORKING_AGREEMENT.md` -- la rutina del rojo en el contrato; has to say: `red|rojo`

Completeness check, without reading code:
- El rojo es un recibo (comando, version, numeros, codigo de salida) y no un relato?
- La regresion corrio en la misma sesion, con numeros?
- La prueba de pantalla verifica tambien el efecto en el backend?
- Was the matrix seen failing first: for each profile, what is reachable against its row, neither less nor more? **(new in schema 2, anchor 2)**

**9 - Calidad del codigo verificada por maquina, con compuerta** (`u09-calidad-de-codigo`, prompt `peldano-09`)

> Linter, formateador, limites de tamano y complejidad, duplicacion, codigo muerto, cobertura con trinquete.

Inputs the owner has ready before the first prompt:
- `docs/GATES.md`

Artifacts the agent leaves behind, and that the gate looks for on disk:
- `docs/CODE_QUALITY.md` -- herramientas, limites y valores medidos
- `docs/GATES.md` -- la calidad como compuerta; has to say: `quality|calidad|lint`
- `docs/CODE_QUALITY.md` -- the result per rule, not as a single number; has to say: `CQ-\d\d`; **new in schema 2**
- `docs/USABILITY.md` -- the result per usability rule, with its declared exceptions; has to say: `UX-\d\d`; **new in schema 2**

Completeness check, without reading code:
- La ultima corrida de la cadena tiene la calidad en verde?
- Una funcion de cien lineas en una rama pone la cadena en rojo?
- La cobertura de hoy es mayor o igual que la del bloque anterior?
- Is the rule catalogue complete, with its frontend adapter and its declared thresholds (and does whatever is undeclared say so)? **(new in schema 2, anchor 3)**
- Does every switched-off rule have its record with reason, author and review date? **(new in schema 2, anchor 3)**
- With real users, is the mutation score measured per block, and did every surviving mutant in new code open a pending item? **(new in schema 2, anchor 3)**

**10 - Los casos de prueba manual se escriben con la funcionalidad y los ejecutan personas** (`u10-casos-de-prueba-manual`, prompt `peldano-10`)

> Cada pendiente deja su caso de prueba manual; cada fallo humano vuelve como pendiente.

Inputs the owner has ready before the first prompt:
- `PROJECT.md`
- `docs/WORKING_AGREEMENT.md`

Artifacts the agent leaves behind, and that the gate looks for on disk:
- `docs/MANUAL_TESTS.md` -- casos de prueba manual

Completeness check, without reading code:
- Cada pendiente cerrado tiene su caso de prueba manual, con pasos y resultado esperado?
- Los casos se ejecutaron al cierre del bloque, con fecha y quien?
- Cada fallo abrio un pendiente?
- Was each case run once per affected profile, derived from the matrix? A case run with a single profile does not count. **(new in schema 2, anchor 4)**

**11 - Simetria entre productor y consumidor, y el registro de anti-patrones** (`u11-simetria-y-antipatrones`, prompt `peldano-11`)

> Nadie cambia una estructura compartida sin tocar a todos sus consumidores; cada golpe queda escrito.

Inputs the owner has ready before the first prompt:
- `docs/SEMANTIC_TREE.md`

Artifacts the agent leaves behind, and that the gate looks for on disk:
- `docs/PRODUCER_CONSUMER_MAP.md` -- mapa productor-consumidor
- `docs/GOTCHAS.md` -- registro de anti-patrones; at least 50 bytes, so that a sketch does not count

Completeness check, without reading code:
- El mapa nombra cada estructura compartida con sus lectores y escritores?
- Cada golpe de los ultimos bloques esta en GOTCHAS.md con su regla?

**12 - Verificacion honesta y reporte proporcional** (`u12-verificacion-honesta`, prompt `peldano-12`)

> Cada reporte separa lo verificado, lo creido y el punto ciego, y ocupa lo que la evidencia da.

Inputs the owner has ready before the first prompt:
- `docs/WORKING_AGREEMENT.md`

Artifacts the agent leaves behind, and that the gate looks for on disk:
- `docs/WORKING_AGREEMENT.md` -- la rutina del reporte honesto; has to say: `verif` and `blind|ciego`

Completeness check, without reading code:
- El ultimo reporte separa verificado / creido / punto ciego?
- Lo verificado tiene su recibo?
- Does the report say what was measured, what was left warning and which rule is switched off, with reason, author and review date? **(new in schema 2, anchor 5)**
- Do the two figures travel with their ruleset fingerprint, and does neither of them close a block? **(new in schema 2, anchor 5)**

**13 - La auditoria periodica como insumo del plan** (`u13-auditoria`, prompt `peldano-13`)

> Otra sesion, idealmente otro modelo, revisa todo y sus hallazgos entran al plan como pendientes.

Inputs the owner has ready before the first prompt:
- `docs/SEMANTIC_TREE.md`
- `docs/STATUS.md`

Artifacts the agent leaves behind, and that the gate looks for on disk:
- `docs/AUDIT_*.md` -- auditoria reciente; should say: `^\s*\**\s*auditor\s*\**\s*:` (if not, it warns and does not block); the newest one, less than 60 days old
- `docs/AUDIT_*.md` -- the audit reproduces receipts and declares which model performed it; has to say: `recibo|receipt`; should say: `modelo|model` (if not, it warns and does not block); the newest one, less than 60 days old; **new in schema 2**

Completeness check, without reading code:
- La auditoria la hizo una sesion distinta de la que construye?
- Cada hallazgo P0 y P1 tiene pendiente?
- Vuelve a correr una muestra de los recibos de rojo?
- Did you literally reproduce two or three receipts of closed pending items (same command, same numbers), rather than just reading them? **(new in schema 2, D-042)**
- Was the audit done, where possible, by a model other than the one that builds? **(new in schema 2, D-042)**

**14 - Fail-closed, candados y cero dano silencioso** (`u14-fail-closed`, prompt `peldano-14`)

> Cada accion con consecuencia real tiene su candado; ante la duda, el sistema se detiene.

Inputs the owner has ready before the first prompt:
- `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` -- tu lista de acciones con consecuencia; at least 50 bytes, so that a sketch does not count
- `docs/SEMANTIC_TREE.md`

Artifacts the agent leaves behind, and that the gate looks for on disk:
- `docs/LOCKS.md` -- registro de candados

Completeness check, without reading code:
- Cada accion de tu lista tiene su candado en LOCKS.md, con el test que lo prueba?
- Ante un dato que falta, el sistema se detiene en vez de inventar?

**15 - Integracion continua, entornos, secretos y despliegue como parte del producto** (`u15-ci-entornos-secretos-deploy`, prompt `peldano-15`)

> Despliegue repetible, configuracion afuera del codigo, secretos en su lugar y vuelta atras probada.

Inputs the owner has ready before the first prompt:
- `docs/ENVIRONMENTS_SURVEY.md`

Artifacts the agent leaves behind, and that the gate looks for on disk:
- `docs/DEPLOYMENT.md` -- procedimiento de despliegue y vuelta atras; has to say: `rollback|vuelta atras`
- `docs/DEPLOYMENT.md` -- the migration with an undo or compensation plan of its own; has to say: `migrac|migration` and `deshacer|compensar|undo|compensat`; **new in schema 2**

Completeness check, without reading code:
- El despliegue es un comando, no una lista de pasos a mano?
- La vuelta atras se probo al menos una vez?
- Ningun secreto vive en el repositorio?
- Does every schema or data migration have its own undo or compensation plan? Rolling the code back is not enough. **(new in schema 2, D-042)**

**16 - Observabilidad y trazabilidad totales, con nivel configurable** (`u16-observabilidad-y-trazabilidad`, prompt `peldano-16`)

> Cada accion deja un registro estructurado con su identificador; el nivel se configura sin tocar codigo.

Inputs the owner has ready before the first prompt:
- `docs/SEMANTIC_TREE.md`
- `docs/DEPLOYMENT.md`

Artifacts the agent leaves behind, and that the gate looks for on disk:
- `docs/OBSERVABILITY.md` -- que se registra, donde y con que nivel

Completeness check, without reading code:
- Pediste una traza real de una accion y la leiste de punta a punta?
- El nivel de registro se cambia por configuracion?

**17 - Optimizacion de la capa de persistencia, medida antes y despues** (`u17-persistencia`, prompt `peldano-17`)

> Indices, fin de los bucles N+1, presupuestos de consultas por camino; todo con numero antes y despues.

Inputs the owner has ready before the first prompt:
- `docs/SIZING.md`
- `docs/VOLUME_SURVEY.md`

Artifacts the agent leaves behind, and that the gate looks for on disk:
- `docs/PERSISTENCE.md` -- medicion antes y despues

Completeness check, without reading code:
- Cada cambio tiene su numero de antes y de despues?
- Hay un presupuesto de consultas por camino, con test?

**18 - Escaneo y solucion de vulnerabilidades, en la cadena y con calendario** (`u18-vulnerabilidades`, prompt `peldano-18`)

> Dependencias, secretos, codigo e infraestructura escaneados en cada push y con fecha de repaso.

Inputs the owner has ready before the first prompt:
- `docs/ENVIRONMENTS_SURVEY.md`
- `docs/GATES.md`

Artifacts the agent leaves behind, and that the gate looks for on disk:
- `docs/SECURITY.md` -- que se escanea y con que calendario
- `docs/SECURITY_*.md` -- ultimo reporte de escaneo; the newest one, less than 45 days old

Completeness check, without reading code:
- La cadena se pone en rojo con una dependencia vulnerable conocida?
- Cada hallazgo tiene pendiente o excepcion con razon y fecha?

**19 - Pruebas de rendimiento en volumen y punto de ruptura** (`u19-rendimiento-y-punto-de-ruptura`, prompt `peldano-19`)

> Cargar al volumen esperado y al por diez, y encontrar que se rompe primero.

Inputs the owner has ready before the first prompt:
- `docs/SIZING.md`
- `docs/ENVIRONMENTS_SURVEY.md`

Artifacts the agent leaves behind, and that the gate looks for on disk:
- `docs/PERFORMANCE.md` -- umbrales y como se corre la prueba
- `docs/PERFORMANCE_*.md` -- ultimo resultado; the newest one, less than 90 days old

Completeness check, without reading code:
- Hay un punto de ruptura escrito, con la pieza que se rompe?
- Los umbrales estan en la cadena o en el monitoreo?

**20 - Documentacion viva y manuales que una persona puede seguir sin IA** (`u20-documentacion-viva`, prompt `peldano-20`)

> Manual de usuario, de mantenimiento y de infraestructura y recuperacion; el registro de cambios al dia.

Inputs the owner has ready before the first prompt:
- `PROJECT.md`
- `docs/DEPLOYMENT.md`
- `docs/LOCKS.md`

Artifacts the agent leaves behind, and that the gate looks for on disk:
- `docs/USER_MANUAL.md` -- manual de usuario
- `docs/MAINTENANCE_MANUAL.md` -- manual de mantenimiento
- `docs/INFRASTRUCTURE_AND_RECOVERY_MANUAL.md` -- manual de infraestructura y recuperacion
- `docs/CHANGELOG.md` -- registro de cambios; at least 50 bytes, so that a sketch does not count

Completeness check, without reading code:
- Una persona sin IA puede recuperar el sistema siguiendo el manual?
- Alguien que no sos vos siguio el manual de usuario y llego?
- Does the recovery-manual run leave its record -- the measured end-to-end time, the exact point where the person got stuck and every word they did not understand, with a date and the name of whoever ran it -- and did every one of those words open a pending item? **(new in schema 2)**

**21 - Monitoreo de recursos, funciones y consultas fuera de rango, con reporte ciclico** (`u21-monitoreo-de-recursos`, prompt `peldano-21`)

> Umbrales por recurso y por funcion, alertas, y un reporte que llega solo cada ciclo.

Inputs the owner has ready before the first prompt:
- `docs/OBSERVABILITY.md`
- `docs/PERFORMANCE.md`

Artifacts the agent leaves behind, and that the gate looks for on disk:
- `docs/MONITORING.md` -- umbrales, alertas y ciclo del reporte
- `docs/MONITORING_REPORT_*.md` -- ultimo reporte ciclico; at least 100 bytes, so that a sketch does not count; the newest one, less than 35 days old

Completeness check, without reading code:
- Recibiste el primer reporte ciclico sin pedirlo?
- Cada umbral tiene una accion escrita para cuando se supera?

**22 - Monitoreo de errores y reporte ciclico: ningun error sin pendiente** (`u22-monitoreo-de-errores`, prompt `peldano-22`)

> Captura centralizada de errores, alerta cuando importa, y cada error nuevo con su pendiente.

Inputs the owner has ready before the first prompt:
- `docs/OBSERVABILITY.md`
- `docs/LOCKS.md`

Artifacts the agent leaves behind, and that the gate looks for on disk:
- `docs/MONITORING.md` -- el monitoreo de errores en MONITORING.md; has to say: `error`
- `docs/MONITORING_REPORT_*.md` -- ultimo reporte ciclico con los errores; at least 100 bytes, so that a sketch does not count; the newest one, less than 35 days old

Completeness check, without reading code:
- Cada error nuevo del ultimo ciclo tiene su pendiente?
- El reporte ciclico de errores llega solo?

**23 - El agente adentro del sistema, y la retrospectiva con numero** (`u23-agente-residente-y-retrospectiva`, prompt `peldano-23`)

> Un agente residente con alcance escrito, y una retrospectiva que termina en una propuesta al metodo.

Inputs the owner has ready before the first prompt:
- `docs/RETROSPECTIVE_INPUTS.md` -- tus insumos para la retrospectiva; at least 50 bytes, so that a sketch does not count
- `docs/LOCKS.md`

Artifacts the agent leaves behind, and that the gate looks for on disk:
- `docs/RESIDENT_AGENT.md` -- alcance del agente residente
- `docs/RETROSPECTIVE_*.md` -- retrospectiva reciente; the newest one, less than 120 days old
- `docs/RESIDENT_AGENT.md` -- the injection clause inside the scope of the resident agent; has to say: `inyecc|injection`; **new in schema 2**
- `docs/RETROSPECTIVE_*.md` -- the retrospective names the model the system was built with; should say: `modelo|model` (if not, it warns and does not block); the newest one, less than 120 days old; **new in schema 2**

Completeness check, without reading code:
- La retrospectiva tiene numeros, no impresiones?
- Termina en una propuesta concreta de cambio al metodo, con el incidente que la justifica?
- Does the scope of the resident agent say that whatever it reads in production is data and never an instruction? **(new in schema 2, D-042)**
- Was there a short retrospective when the building model changed? **(new in schema 2, D-042)**

## The legacy path: eight stations

A system built without the method is normalised first through these eight stations (they are not
called steps) and only then enters the Construction Loop at step 5.

**A legacy system enters the Construction Loop at step 5, so from there the five anchors of Annex H rule exactly as they do in a new project (D-023 + D-043). The two prior inputs are recovered by self-discovery with a source mark, like every input of an earlier stage on this path.** (since schema 2, inherited anchors: 1, 2, 3, 4, 5).

| # | station | evaluators | artifacts | checks |
|---|---|---|---|---|
| N0 | Elegibilidad de un sistema existente: los prerrequisitos que un modelo puede verificar haciendo | `artifacts` | 2 | 2 |
| N1 | El contrato de convivencia para un legado | `artifacts` | 1 | 1 |
| N2 | La lectura del sistema: el mapa recuperado y las discrepancias | `artifacts` | 4 | 3 |
| N3 | La auditoria como inventario de la deuda | `artifacts` | 1 | 2 |
| N4 | El cinturon de seguridad | `ci` | 3 | 2 |
| N5 | Candados y mapa productor-consumidor desde el codigo | `artifacts` | 2 | 1 |
| N6 | Dimensionar con numeros reales | `sizing` | 1 | 1 |
| N7 | El backlog de normalizacion, emparejado con el pedido del cliente | `pendings_spec` | 1 | 1 |

**N0 - Elegibilidad de un sistema existente: los prerrequisitos que un modelo puede verificar haciendo** (`n0-elegibilidad-legado`)

> Siete prerrequisitos verificados haciendo; cada rojo es un proyecto previo.

- `docs/ELIGIBILITY.md` -- has to say: `eligib|elegib`
- `docs/FUNCTIONALITY_RECOVERED.md` -- la funcionalidad descrita desde el codigo

- Cada prerrequisito tiene su verde o su proyecto previo?
- La funcionalidad recuperada la entenderia un usuario final?

**N1 - El contrato de convivencia para un legado** (`n1-contrato-legado`)

> Las reglas del metodo mas la regla de no reescribir.

- `docs/WORKING_AGREEMENT.md` -- has to say: `evidence|evidencia`

- El contrato dice que no se reescribe?

**N2 - La lectura del sistema: el mapa recuperado y las discrepancias** (`n2-lectura-del-sistema`)

> Relevamiento, proyecto y arbol desde el codigo con marcas de fuente; la lista de discrepancias.

- `PROJECT.md`
- `docs/SEMANTIC_TREE.md`
- `docs/STATUS.md` -- at least 80 bytes, so that a sketch does not count
- `docs/DISCREPANCIES.md` -- at least 50 bytes, so that a sketch does not count

- Lo inferido esta marcado como inferido?
- Decidiste cada discrepancia?
- Were the user glossary and the list of profiles recovered, with their source mark where nobody had written them? **(new in schema 2, anchor prior_inputs)**

**N3 - La auditoria como inventario de la deuda** (`n3-auditoria-inventario`)

> Toda la deuda, con su marca: bloquea, se paga al tocar, puede esperar.

- `docs/AUDIT_*.md` -- should say: `^\s*\**\s*auditor\s*\**\s*:` (if not, it warns and does not block); the newest one, less than 120 days old

- Cada hallazgo tiene su marca de velocidad?
- La hizo otra sesion que la que leyo el sistema (N2)?

**N4 - El cinturon de seguridad** (`n4-cinturon-de-seguridad`)

> Tests de caracterizacion con su rojo por mutacion, la cadena y los entornos. Compuerta dura.

- `docs/GATES.md`
- `docs/STATUS.md` -- has to say: `test`
- `docs/DEPLOYMENT.md`

- Cada flujo tiene su caracterizacion con el rojo por mutacion visto?
- La cadena corre sola?

**N5 - Candados y mapa productor-consumidor desde el codigo** (`n5-candados-y-mapa`)

> Las acciones con consecuencia y las estructuras compartidas, leidas del sistema.

- `docs/LOCKS.md`
- `docs/PRODUCER_CONSUMER_MAP.md`

- Cada accion con consecuencia tiene su candado?

**N6 - Dimensionar con numeros reales** (`n6-dimensionar-real`)

> La volumetria medida en la base real, y la persistencia contrastada con su envoltura.

- `docs/SIZING.md`

- Los numeros salen de la base, no de una estimacion?

**N7 - El backlog de normalizacion, emparejado con el pedido del cliente** (`n7-backlog-de-normalizacion`)

> La deuda que bloquea y el pedido del cliente, en un solo plan ordenado.

- `docs/blocks/*.md` -- el pedido de la etapa; at least 50 bytes, so that a sketch does not count

- Cada pendiente de deuda esta emparejado con el modulo que el pedido toca?

## Annex H: forty-five rules

The statement of every rule lives **only** in Annex H: it is extracted from there on every build,
never transcribed. The published statement comes from [the English version](en/ANEXO_HEURISTICAS.md); the
[Spanish one](ANEXO_HEURISTICAS.md) is the source of truth of the method, and the build demands that both carry
the same rules with the same severities. What this data adds is the mechanical part: the group, the
instrument, the initial severity, when it is looked at and the step where it hooks. There are 18 of
code quality and 27 of usability.

The two switches (`code_quality` and `usability`) are turned on and off separately,
they live in the project configuration and the gate reads them: never inside the prompt.
Switching a rule off is valid only as a recorded decision with reason, authorized_by, review_date.
Switched off without a record: red: switching a rule off without a written reason is a failure of the gate, not the absence of a rule. A switched-off group is never read as fulfilled.

### Code quality (CQ-01..CQ-18)

Result per rule in `docs/CODE_QUALITY.md`.

| id | family | statement | instrument | when | severity | step |
|---|---|---|---|---|---|---|
| CQ-01 | form | There is a single formatter, it runs without intervention and it admits no discussion. | automatic gate | on every push and at block close | BLOCKS | 9 |
| CQ-02 | form | There is a single linter per repository and its rules are the same for everybody; a rule is switched off with a written reason, never in a loose file. | automatic gate | on every push and at block close | BLOCKS | 9 |
| CQ-03 | size | No file exceeds the declared limit (starts at 300 lines) and no function exceeds its own (starts at 40). | automatic gate | on every push and at block close | BLOCKS | 9 |
| CQ-04 | complexity | No function exceeds the declared path limit. | automatic gate | on every push and at block close | BLOCKS | 9 |
| CQ-05 | duplication | No new duplication enters: the copied block is extracted or justified. | automatic gate | on every push and at block close | BLOCKS | 9 |
| CQ-06 | dead_things | There is no dead code: unused functions, variables, imports, branches and dependencies. | automatic gate | on every push and at block close | BLOCKS | 9 |
| CQ-07 | types | If the language allows types, the project uses them seriously; the "any" type is a declared exception, not a habit. | automatic gate | on every push and at block close | WARNS | 9 |
| CQ-08 | tests | Coverage does not go down: today's number is tomorrow's floor. | automatic gate | on every push and at block close | BLOCKS | 9 |
| CQ-09 | tests | With real users, the mutation score is measured per block and every mutant that survives in new code opens a pending item. | automatic gate | on every push and at block close | BLOCKS where there are real users | 9 |
| CQ-10 | dependencies | Every dependency is declared, is used and does not bring a third-party tree out of proportion to what it contributes. | automatic gate | on every push and at block close | WARNS | 9 |
| CQ-11 | secrets | There are no credentials, keys or connection strings in the repository, nor in the new history. | automatic gate | on every push and at block close | BLOCKS | 9 |
| CQ-12 | interface | The interface does not decide: no screen or component contains business rules (what is allowed, how much it costs, which state follows). It lives in the domain and the view queries it. | manual case | at the close of the pending item | BLOCKS (human red) | 9 |
| CQ-13 | interface | Every server call goes through a single typed client; no screen builds its own request by hand. | automatic gate | on every push and at block close | BLOCKS | 9 |
| CQ-14 | interface | There is a single place where shared state lives; duplicating state between screens is a failure, not a shortcut. | manual case | at the close of the pending item | BLOCKS (human red) | 9 |
| CQ-15 | interface | Every visible text comes out of a translation catalogue; no user string stays written inside the component. | automatic gate | on every push and at block close | BLOCKS | 9 |
| CQ-16 | interface | Every interactive element carries a stable identifier and a role, so that the automated test finds it by name and not by position. | automatic gate | on every push and at block close | BLOCKS | 9 |
| CQ-17 | interface | All colours, spacings and typefaces come out of tokens; no loose magic value in the stylesheet. | automatic gate | on every push and at block close | BLOCKS | 9 |
| CQ-18 | interface | Basic accessibility is verified on its own: contrast, labels on fields, visible focus, keyboard navigation in the main flows, images with alternative text. | automatic gate | on every push and at block close | WARNS | 9 |

### Usability (UX-01..UX-27)

Result per rule in `docs/USABILITY.md`.

| id | family | statement | instrument | when | severity | step |
|---|---|---|---|---|---|---|
| UX-01 | B1 | Every menu group is named with a user job (in their vocabulary, with the project glossary), never with a technical module nor with a data entity. | manual case + matrix query | at the close of each block | WARNS | 10 * |
| UX-02 | B1 | Every functionality has exactly one canonical home. If it serves two groups, one home is chosen and the other links to it; the entry is not duplicated. | matrix query | on every push and at block close | BLOCKS | 9 |
| UX-03 | B1 | There are no orphans: every declared functionality is reachable from the entry screen in no more than three steps. | automatic gate | on every push and at block close | BLOCKS | 9 |
| UX-04 | B1 | The size of a group is reasonable: fewer than three functionalities indicates a group that was not a group; more than seven indicates a drawer. | matrix query | on every push and at block close | WARNS | 9 * |
| UX-05 | B1 | Every group has an entry screen that says what is done there and which is the main action. No group opens straight into an empty table. | manual case | at the close of each block | WARNS | 10 * |
| UX-06 | B1 | The flows the person does often live together: if "record a payment" and "see the customer's account" are used in the same session, they share a group. | manual case | at the close of each block | RECORDS | 10 * |
| UX-07 | B1 | The first-click test: the owner, facing a concrete task ("where do you charge a payment?"), names one place. If they name two, there is duplication; if they name none, there is an orphan. It runs at the close of every block. | manual case | at the close of each block | WARNS | 10 * |
| UX-08 | B2 | Every functionality declares in the matrix which profiles have it. A functionality without a profile does not exist: either it is given a profile or it is deleted. | matrix query | on every push and at block close | BLOCKS | 9 |
| UX-09 | B2 | Every declared profile has at least one functionality and its own entry point. An empty profile is a profile nobody used while designing. | matrix query | on every push and at block close | BLOCKS | 9 |
| UX-10 | B2 | Navigation is generated from the matrix. A hand-written menu is a failure, not a shortcut. | automatic gate | on every push and at block close | BLOCKS | 9 |
| UX-11 | B2 | Hiding is not protecting: every route verifies the permission on the server side in addition to hiding the entry. Typing the address by hand is not enough to get in. | end-to-end test per profile | on every push and at block close | BLOCKS | 8 |
| UX-12 | B2 | Neither less nor more: for each profile, the set of reachable functionalities is exactly the one in its row of the matrix. | end-to-end test per profile | on every push and at block close | BLOCKS | 8 |
| UX-13 | B2 | The refusal is explained: if a person enters a functionality that is not theirs, they see a message that says why and who to ask for access. Never a blank screen, never a grey button without a reason. | manual case | at the close of each block | WARNS | 10 * |
| UX-14 | B2 | The same button means the same for everybody: if two profiles share a label, they share an effect. If the effect changes per profile, the label changes or the functionality is split in two. | manual case | at the close of each block | WARNS | 10 * |
| UX-15 | B2 | Data is also filtered by profile: whoever sees the list sees the rows that correspond to them, not the whole list with the rows hidden in the browser. | end-to-end test per profile + manual case | on every push and at block close | BLOCKS | 8 |
| UX-16 | B2 | The matrix and the user manual are updated in the same pending item as the functionality. A new functionality without a row in the matrix does not close. | matrix query | at the close of the pending item | BLOCKS | 9 |
| UX-17 | B3 | Every list has four resolved states: with data, empty, loading and with error. The empty one distinguishes "there is nothing yet" from "your search found nothing". | manual case | at the close of each block | WARNS | 10 * |
| UX-18 | B3 | While something takes time, it is visible that it is working and it can be cancelled if it is long. A button that answers nothing is complaint number one. | manual case | at the close of each block | WARNS | 10 * |
| UX-19 | B3 | The error says what happened, what can be done and does not erase what was entered. Neither a technical code alone, nor an "an error occurred". | manual case | at the close of each block | WARNS | 10 * |
| UX-20 | B4 | A screen has one evident main action; the rest are secondary and look like it. | manual case | at the close of each block | WARNS | 10 * |
| UX-21 | B4 | Every destructive action asks for confirmation naming the affected object, and when it can be done it is undone instead of confirmed. | manual case | at the close of each block | WARNS | 10 * |
| UX-22 | B4 | A form that fails keeps what was entered and marks the field with the problem, in the place of the field. | manual case | at the close of the pending item | BLOCKS (human red) | 10 * |
| UX-23 | B4 | No action leaves the screen without an exit: after saving, deleting or cancelling, the person knows where they are and how to continue. | manual case | at the close of each block | WARNS | 10 * |
| UX-24 | B5 | The interface speaks the language of the project glossary: the same object is called the same on the screen, in the manual and in the email. A synonym is a defect. | manual case | at the close of each block | WARNS | 10 * |
| UX-25 | B5 | Everything can be done without a mouse and with a screen reader in the main flows; the focus is always visible and it does not get trapped. | automatic gate + manual case | on every push and at block close | WARNS | 9, 10 * |
| UX-26 | B5 | States are not communicated by colour alone; every informative image has alternative text; texts are read at normal size without zoom. | automatic gate | on every push and at block close | WARNS | 9 * |
| UX-27 | B5 | Every pending item that touches a screen delivers the real screenshot of the test environment, and the owner looks at it before closing. The screenshot is not optional and it is not a mock-up. | manual case | at the close of the pending item | BLOCKS (human red) | 10 * |

The rules marked with `*` in the step column are not anchored by the annex explicitly: the hook is
derived from their instrument (the manual case runs at step 10, the automatic gate runs at step 9)
and is declared as derived, not as a decision of the method.

The four that block with a **human red** -- CQ-12, CQ-14, UX-22, UX-27 -- are tested by no
tool at all: they are verified at the close of the pending item, with the manual case in front, and
never on a commit.

### The five anchors and the two prior inputs

| anchor | step | what it adds | evaluator |
|---|---|---|---|
| 1 | 5 | every pending item that touches a screen declares its convergence group, its profiles and acceptance criteria per profile | `pendings_profiles` |
| 2 | 8 | the matrix as a test that is seen failing first | `profile_matrix` |
| 3 | 9 | the full CQ catalogue with its adapter and declared thresholds, and the matrix as a gate | `heuristics` |
| 4 | 10 | one manual case per affected profile, derived from the matrix | `manual_cases_per_profile` |
| 5 | 12 | the report says what was measured, what was left warning and which rule is switched off, with reason, author and review date | `heuristics` |

- **the user glossary** (step 2): without it, UX-01 and UX-24 have nothing to compare against. Declared path: `docs/GLOSSARY.md`. The annex requires it when scope is defined. Since 2026-10-26 the step 2 contract asks for it in writing, and since 2026-10-27 the method also declares its canonical path, which the owner decided: the step 2 artifact list carries it like the other three, so a gate can look at the file instead of trusting a checklist. The path is the only thing a consumer may assume; what the file says is read by a person.
- **the list of profiles** (step 2): without it, the B2 matrix gets invented at step 5. Declared path: `docs/PROFILES.md`. Same status as prior input 1: asked for by the step 2 contract since 2026-10-26, with its canonical path declared by the owner on 2026-10-27 and carried as a step 2 artifact.

### The three artifacts

- `docs/CODE_QUALITY.md` (extended): the result per code-quality rule, not a single number
- `docs/USABILITY.md` (new): the result per usability rule and the declared exceptions
- `docs/PROFILE_MATRIX.md` (new): the matrix: a document and the source of the menu at the same time

## The adapters and the thresholds

Layer 2 of Annex H: per frontend family, with what each rule is measured and with which default threshold. Whatever the annex declares is here; whatever the annex leaves to the project is published as UNDECLARED, never with an invented value. The tool names in the example of the annex (section 7) are illustrative and are therefore NOT copied here: a tool named in this data would read as a default, and it is not one.

| frontend family | column in the annex | rules that do not apply |
|---|---|---|
| `react-vite` | spa | - |
| `next` | spa | - |
| `angular` | spa | - |
| `server-templates` | server-templates | - |
| `mobile-native` | mobile-native | - |
| `cli` | cli | CQ-17, CQ-18 |

| threshold | rule | value | declared? | who declares it |
|---|---|---|---|---|
| `lines_per_file` | CQ-03 | 300 | yes, annex | the core of the annex |
| `lines_per_function` | CQ-03 | 40 | yes, annex | the core of the annex |
| `paths_per_function` | CQ-04 | - | **no** | the owner |
| `minimum_coverage` | CQ-08 | - | **no** | the ratchet, over what is measured |
| `mutation_target` | CQ-09 | - | **no** | the owner, once the project has real users |

**it is reported as an undeclared threshold. No approximating, no silent inheriting and no inventing: the same rule as the sizing of the architecture step.**

## The project configuration

The shape of the per-project configuration that the gate reads (layer 3 of Annex H). It lives in the project, never inside a prompt (D-046), and these are the field names a consumer tool has to write and read. Declared here so no tool has to guess them.

| field | what it holds |
|---|---|
| `frontend` | Id of the adapter family (see gates/adapters.json families). |
| `real_users` | Boolean. Rules with applies_if real_users only run where it is true, and that is scope, not an exception. |
| `switches` | One entry per rule group: true, or an object { on: false, reason, authorized_by, review_date }. |
| `switched_off` | List of individual rules switched off, each with the full record. |
| `thresholds` | Declared values, by threshold id. Whatever is not here is reported as undeclared, never invented. |
| `tools` | Tool names and versions actually used, for the ruleset fingerprint. |

The switch-off record is `rule`, `reason`, `authorized_by`, `review_date`. Without it: red, and the ruleset is invalid: the scoreboard emits no figures at all (D-046, D-047).

## The scoreboard

Two figures, never one (D-047). Switching a rule off **raises** compliance and **lowers** coverage,
so with a single figure the shortest path to a better number is to stop measuring.

| figure | formula | how it moves |
|---|---|---|
| compliance | `rules_passing / rules_active` | goes up when something is fixed |
| gate_coverage | `rules_active / rules_declared` | goes down when a rule is switched off |

Ruleset fingerprint on every record: `catalog_version`, `rules_active`, `rules_switched_off`, `adapter`, `tool_versions`.
Ratchet over compliance: it goes down only with a recorded decision.
Out of the percentage, because a person judges it: UX-06, UX-07, UX-27, every manual case.
The scoreboard **does not close blocks**, and an invalid ruleset emits no figures at all.

Order in the step 12 report: binary verdict -> the two figures -> what is switched off and until when -> movement against the previous block with its cause.

## The decisions that govern this

D-050 (the method owns the definition of the gates), D-051 (the data layer and this document are
published in English), and the Annex H ones: D-043, D-044, D-045, D-046, D-047, D-048, D-049. They are in the
[decision register](DECISIONES.md), written in Spanish, which is the language of the method.
