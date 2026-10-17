# Urazuke — step 11 prompts (English, single source)

Generated from `docs/peldanos/peldano-11-auditoria.md` by `build/prompts.mjs`. Do not edit by hand.

## Prompt 1

Audit this system for [scope]. Read-only: change nothing except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires access you lack (the database, the log, an environment), tell me and mark that part as not audited; do not pass it as fine. Go through all of the code, not a sample. For every finding: where it is (file and line), what the risk is, what evidence proves it (the command, the query, the number), and its priority: P0 must be fixed now, P1 soon, P2 when possible. Give a grade to every dimension you audited. End with the list of P0 findings turned into proposed pending items. Reply in my language.

## Prompt 2

Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding. If you disagree with any of them, tell me with the evidence against; do not ignore it.
