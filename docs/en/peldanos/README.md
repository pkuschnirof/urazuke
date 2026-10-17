# The step contracts

One file per step. Each has the same skeleton: the header with phase, form and size (mandatory or
proportional); what it is for; (1) required context, named generically; (2) the prompts, **in
English**, each followed by the explanation in the reader's language of what we are asking for and
why each clause is there; (3) the expected result, with its characteristics; (4) the completeness
check, done by the owner without reading code; (5) the warning signs, the symptoms that the step
was climbed badly.

The English prompts are a single piece, identical in every version of the document in the eight
languages; `node build/build.mjs` extracts them to `prompts/` and verifies that no translation has
altered them.

They are written from what we did in the three repositories, not executed as-is yet. The first
project that uses them end to end will correct several: that is part of step 15.

| Step | File | Phase | Form |
|---|---|---|---|
| 0 — Can this project be run this way? | `peldano-00-elegibilidad.md` | start | conversation (being elaborated with Pablo) |
| 1 — The working agreement | `peldano-01-contrato-de-convivencia.md` | start | one shot + adjustment |
| 2 — Project definition and mandatory reading | `peldano-02-definicion-y-lectura.md` | start | conversation |
| 3 — Size before the architecture | `peldano-03-dimensionar.md` | start | conversation |
| 4 — The skeleton with its gates | `peldano-04-esqueleto.md` | start | one long shot + visual approval |
| 5 — The plan is the pending items | `peldano-05-pendientes.md` | loop | one shot + routine |
| 6 — Decisions are written next to the code | `peldano-06-decisiones.md` | loop | short conversation, every time |
| 7 — Tests as locks, proved red | `peldano-07-tests-en-rojo.md` | loop | routine of every change |
| 8 — Producer/consumer symmetry and anti-patterns | `peldano-08-simetria-y-antipatrones.md` | loop | automatic + a file that grows |
| 9 — Measure before building | `peldano-09-medir.md` | loop | one shot per measurement |
| 10 — Honest verification and proportional reporting | `peldano-10-verificacion-honesta.md` | loop | routine of every report |
| 11 — The periodic audit as input to the plan | `peldano-11-auditoria.md` | operation | one long shot, different auditor |
| 12 — Fail-closed, locks and zero silent harm | `peldano-12-fail-closed.md` | operation | conversation |
| 13 — Continuous integration, environments, secrets and deployment | `peldano-13-ci-entornos-secretos-deploy.md` | operation | one shot + deployment routine |
| 14 — Living documentation and manuals without AI | `peldano-14-documentacion-viva.md` | operation | routine + one long shot |
| 15 — The resident agent and the retrospective with numbers | `peldano-15-agente-residente-y-retrospectiva.md` | operation and closure | two parts |

Phases: **start** is climbed once per project; **loop** repeats with every change; **operation**
once the system is alive. Step 15 returns to step 0 for the next project. File names are kept in
Spanish in every language so that the build tooling can match them.
