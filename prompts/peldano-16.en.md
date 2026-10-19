# Urazuke — step 16 prompts (English, single source)

Generated from `docs/peldanos/peldano-16-observabilidad-y-trazabilidad.md` by `build/prompts.mjs`. Do not edit by hand.

## Prompt 1

We are going to make this system observable and traceable, end to end, with a level that I can change without redeploying. Read `PROJECT.md`, `docs/SEMANTIC_TREE.md`, `docs/DEPLOYMENT.md` and `docs/LOCKS.md`. Evaluate whether you have what is needed (where the logs and metrics will live, how configuration is read per environment, which external services are called); if anything is missing, ask me. Then set up: (1) structured logging, one record per event, with timestamp, level, module, correlation id and actor, with the level configurable per environment at runtime (error, warning, info, debug, trace) without a redeploy, and a default of info in production; (2) a correlation id created at the entry of every request, job and message, propagated through every call and written in every record, so that one id follows an action from the screen to the backend, to the database and to every external call; (3) traceability of every consequential action in `docs/LOCKS.md`: who, when, what, from where, with which input and which outcome, in an audit record the application cannot edit; (4) health and metrics endpoints or files (requests, latency, errors, queue sizes, resource usage) that the monitoring of steps 20 and 21 will read; (5) masking of every personal field listed in `docs/INITIAL_SURVEY.md`, so that no log record contains personal data. Show me one real request followed by its id through every layer, and show me the level changing in the test environment without a redeploy. Document the levels, where to change them and where the records live in `docs/OBSERVABILITY.md`. Reply in my language.

## Prompt 2

Every new module, job or integration writes structured log records with the correlation id and the actor at the level that corresponds, masks personal data, propagates the id to every call it makes, and records every consequential action in the audit trail. A pending item that adds one of those is not closed without showing one real id followed end to end through the new code.
