# Urazuke — step 11 prompts (English, single source)

Generated from `docs/peldanos/peldano-11-simetria-y-antipatrones.md` by `build/prompts.mjs`. Do not edit by hand.

## Prompt 1

Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table, a file format, a list of values), who produces it and who consumes it. If there are parts of the system you cannot access or do not understand, tell me instead of leaving them out of the map. Reply in my language.

## Prompt 2

Before closing any change that touches a contract, look up every consumer in the map and update them in the same commit. Always prefer that the producer defines the list (columns, causes, states) and the consumer reads it, rather than each keeping its own copy. If the map does not have that relationship, add it.

## Prompt 3

This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if possible, a test or an automatic check that detects it.
