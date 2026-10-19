# Urazuke — step 8 prompts (English, single source)

Generated from `docs/peldanos/peldano-08-tests-en-rojo.md` by `build/prompts.mjs`. Do not edit by hand.

## Prompt 1

To close this pending item I need evidence, not your word. (1) Write the test that proves what the item asks for, following its acceptance criteria. (2) Demonstrate that this test fails against the previous code: you may temporarily revert the change, or run the test against the old version, but show me the red output as a receipt, not a summary: the exact command, the identifier of the version it ran against, the count of failing tests and the exit code, pasted as they came out, so that I can rerun it myself with one command. (3) Show me the green output with the change. (4) Run the regression suite for the neighbouring items and show me it is still green. (5) Run the end-to-end test of the flow this item touches, from the screen to the backend, and show me the backend effect. (6) Do not replace with mocks the very part you are trying to test. If testing end to end requires something you lack (data, access, an environment), ask me for it; do not simulate what you do not have. If the previous version does not have the module at all (the first block of a new project), a failure to load is not a red: prove the red by planting one deliberate defect in the function you just wrote (an inverted condition, a deleted line), show me the test failing against that defect as the same kind of receipt, with the diff of the defect, and then revert it. Finally, the commit message says "proved red against [what]" and the test counts.

## Prompt 2

Run the complete end-to-end suite of every flow that exists so far, in the test environment, with the exact version that will be promoted. Show me the counts, and for each flow the backend check that proves it. If any flow has no end-to-end test, say so and open a pending item for it; do not pass it as covered.

## Prompt 3

Explain why it cannot be tested, what would have to be added so that it can, and open a pending item for that. The change is not closed until it can be tested.
