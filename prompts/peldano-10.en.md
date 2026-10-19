# Urazuke — step 10 prompts (English, single source)

Generated from `docs/peldanos/peldano-10-casos-de-prueba-manual.md` by `build/prompts.mjs`. Do not edit by hand.

## Prompt 1

Every pending item that changes what a user sees or does is closed with its manual test cases written in `docs/MANUAL_TESTS.md`, derived from its acceptance criteria: one case per flow the item touches, with an id, the pending item, the precondition, the numbered steps (what the person does and what they must see), the expected result including a backend effect a person can verify without tools, the test data to use, and an empty execution table (date, who, passed or failed, observation). Write them for a person who does not know how the system is built. Keep the cases of closed items up to date: when a flow changes, its cases change in the same commit. Never mark a case as executed yourself: execution is human.

## Prompt 2

Read the executions of today in `docs/MANUAL_TESTS.md`. For every case that failed, and for every loose observation at the end of the file, open a corrective pending item in `docs/PENDING.md` with the person's words as the way to reproduce it, hanging from the node of the semantic tree it touches; do not fix anything now. For every case that passed, nothing. Then tell me, flow by flow, how many cases passed and how many failed, compared with the previous execution, and which failures repeat. If a case could not be executed, tell me why and whether the case or the system is the problem. Reply in my language.
