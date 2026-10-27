# Urazuke — step 11 prompts (English, single source)

Generated from `docs/peldanos/peldano-11-simetria-y-antipatrones.md` by `build/prompts.mjs`. Do not edit by hand.

## Prompt 1

Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table, a file format, a list of values), who produces it and who consumes it. If there are parts of the system you cannot access or do not understand, tell me instead of leaving them out of the map. When you need a decision from me, ask it with the four parts of UX-28 (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary, listed; one paragraph of at most five lines that links that data and lets the question be seen; the question itself with its possible answers numbered; and your recommendation. Say it at the technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or `technical`; if the project declared none, use `decision_maker`. Reply in my language.

## Prompt 2

Before closing any change that touches a contract, look up every consumer in the map and update them in the same commit. Always prefer that the producer defines the list (columns, causes, states) and the consumer reads it, rather than each keeping its own copy. If the map does not have that relationship, add it. When you need a decision from me, ask it with the four parts of UX-28 (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary, listed; one paragraph of at most five lines that links that data and lets the question be seen; the question itself with its possible answers numbered; and your recommendation. Say it at the technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or `technical`; if the project declared none, use `decision_maker`.

## Prompt 3

This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if possible, a test or an automatic check that detects it. When you need a decision from me, ask it with the four parts of UX-28 (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary, listed; one paragraph of at most five lines that links that data and lets the question be seen; the question itself with its possible answers numbered; and your recommendation. Say it at the technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or `technical`; if the project declared none, use `decision_maker`.
