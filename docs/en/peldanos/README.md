# The step contracts

One file per step. They all have the same skeleton, and they have it on purpose, so that you can
compare them and so that, over time, the reflex of reading them becomes automatic: the header
with the stretch, the when, the form and the size (mandatory or proportional); what it is for;
(1) the required context, named generically; (2) the prompts, **in English**, each followed by
the explanation of what I am asking the model for and why each clause is there; (3) the expected
result, with its characteristics; (4) the completeness check, which you do without reading code;
(5) the warning signs, the symptoms of a badly climbed step.

The English prompts are a single piece, identical in the eight versions of the document;
`node build/build.mjs` extracts them to `prompts/` and verifies that no translation has altered
them. In the Spanish version each prompt carries its translation alongside, so that the reader can
understand it; here the document is already in English, and the explanation under each prompt
says what I am asking for and why. What gets pasted to the model is always the English.

I wrote them from what I did in three systems that are in production today; I have not executed
them as-is yet. The first project that uses them end to end will correct several of them; that is
part of step 15. When a contract cites a real case, it does so with a `[Ref. N]` mark that links
to the [references document](../REFERENCIAS.md); the procedure stays clean and the detail is one
click away.

| Step | File | Stretch | When |
|---|---|---|---|
| 0 — Can this project be run this way? | `peldano-00-elegibilidad.md` | start-up | first week, before everything |
| 1 — The working agreement | `peldano-01-contrato-de-convivencia.md` | start-up | first week, after eligibility |
| 2 — Project definition and mandatory reading | `peldano-02-definicion-y-lectura.md` | start-up | first week; maintained always |
| 3 — Size before the architecture | `peldano-03-dimensionar.md` | start-up | first week, before the skeleton |
| 4 — The skeleton with its gates | `peldano-04-esqueleto.md` | start-up | close of the first week |
| 5 — The plan is the pending items | `peldano-05-pendientes.md` | loop | when opening each block; every session |
| 6 — Decisions are written next to the code | `peldano-06-decisiones.md` | loop | every time a rule is missing |
| 7 — Tests as locks, proved red | `peldano-07-tests-en-rojo.md` | loop | when closing each pending item |
| 8 — Producer/consumer symmetry and anti-patterns | `peldano-08-simetria-y-antipatrones.md` | loop | with every contract change |
| 9 — Measure before building | `peldano-09-medir.md` | loop | before building on a number |
| 10 — Honest verification and proportional reporting | `peldano-10-verificacion-honesta.md` | loop | in every report |
| 11 — The periodic audit as input to the plan | `peldano-11-auditoria.md` | operation | before production; periodic afterwards |
| 12 — Fail-closed, locks and zero silent harm | `peldano-12-fail-closed.md` | operation | before building what acts on the world |
| 13 — Continuous integration, environments, secrets and deployment | `peldano-13-ci-entornos-secretos-deploy.md` | operation | closing towards production; routine on every deployment |
| 14 — Living documentation and manuals without AI | `peldano-14-documentacion-viva.md` | operation | at the close of each block; complete before production |
| 15 — The resident agent and the retrospective with numbers | `peldano-15-agente-residente-y-retrospectiva.md` | operation and closure | on entering operation; at the close of each stage |

Stretches: **start-up** is climbed once per project; **loop** repeats with every change;
**operation** once the system is alive. Step 15 returns to step 0 for the next project. The
complete timeline, with what happens between one step and the next, is in Part B of the main
document.
