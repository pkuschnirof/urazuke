# Urazuke — step 7 prompts (English, single source)

Generated from `docs/peldanos/peldano-07-tests-en-rojo.md` by `build/prompts.mjs`. Do not edit by hand.

## Prompt 1

To close this pending item I need evidence, not your word. (1) Write the test that proves what the item asks for. (2) Demonstrate that this test fails against the previous code: you may temporarily revert the change, or run the test against the old version, but show me the red output. (3) Show me the green output with the change. (4) Run the regression suite for the neighbouring items and show me it is still green. (5) Do not replace with mocks the very part you are trying to test. If testing end to end requires something you lack (data, access, an environment), ask me for it; do not simulate what you do not have. Finally, the commit message says "proved red against [what]" and the test counts.

## Prompt 2

Explain why it cannot be tested, what would have to be added so that it can, and open a pending item for that. The change is not closed until it can be tested.
