# Step 7 — Tests as locks, proved red (step contract)

**Stretch:** loop.
**When:** with every pending item, when closing it: the test red and green, the regression of the
neighbours and the end-to-end test of the flow touched. The complete end-to-end suite of every
flow, at the close of each block and before every deployment to production.
**Form:** one shot; the agent executes and reports, you read the report.
**Size:** mandatory in every project. It is the heart of the method: if there is one step that
cannot be negotiated, it is this one.

## What it is for

A test you never saw fail, you do not know whether it proves anything. The rule here is not "write
tests": it is "demonstrate that the test turns red against the old code, and then green with the
new one". It prevents the tests that pass because they prove nothing, and the green that hides a
bug [Ref. 44](../REFERENCIAS.md#ref-44).

Why this matters more with a model than with a human programmer: the model writes the code and the
test **in the same session, with the same understanding**. If it misunderstood the request, the
test is going to test what it understood, and it is going to pass. The red against the old code
is the only cheap way to check that the test is looking at what matters: if the old code passes
it, the test does not tell before from after, and so it is useless. The case that shows it best is
the one of the counters that did not match [Ref. 26](../REFERENCIAS.md#ref-26).

And the second half: the end-to-end tests. A test that verifies from the screen (clicks, types,
reads) and checks the effect in the backend (the row is there, the state changed) is the one that
replaces your reading of the code. The acceptance criteria of the pending item ("given, when,
then") are its script. And they run three times at three scales: the flow touched with every
pending item, every flow at the close of each block, and every flow with the exact version before
production.

## 1. Required context

- The change already implemented (by default tests come after implementing; "test first" stays
  as an option for small, well-defined scopes).
- The pending item that originates the change, with its acceptance criteria and its "how it is
  verified".
- The existing test suite and the command to run it (step 4).

## 2. Prompts

**Routine (goes in the working agreement; applied on every change):**

> To close this pending item I need evidence, not your word. (1) Write the test that proves what
> the item asks for, following its acceptance criteria. (2) Demonstrate that this test fails
> against the previous code: you may temporarily revert the change, or run the test against the
> old version, but show me the red output. (3) Show me the green output with the change. (4) Run
> the regression suite for the neighbouring items and show me it is still green. (5) Run the
> end-to-end test of the flow this item touches, from the screen to the backend, and show me the
> backend effect. (6) Do not replace with mocks the very part you are trying to test. If testing
> end to end requires something you lack (data, access, an environment), ask me for it; do not
> simulate what you do not have. Finally, the commit message says "proved red against [what]"
> and the test counts.

What I am asking for, clause by clause: (1) the test, guided by the acceptance criteria of the
pending item; (2) **the red demonstrated**, with the output in plain sight, which is the clause
that distinguishes this method from "write tests"; (3) the green; (4) the regression of the
neighbours in the same session, because a change breaks things next to it; (5) the end-to-end
test of the flow touched, with the backend effect in plain sight; (6) not mocking the very thing
being tested; and the completeness clause adapted to this step: if something is missing to test
end to end, **ask for it, do not simulate it**. The commit message with the counts leaves the
evidence where the code lives.

**At the close of each block and before every deployment to production:**

> Run the complete end-to-end suite of every flow that exists so far, in the test environment,
> with the exact version that will be promoted. Show me the counts, and for each flow the
> backend check that proves it. If any flow has no end-to-end test, say so and open a pending
> item for it; do not pass it as covered.

What I am asking for: the second and third scales of the end-to-end tests, with the exact version
(not "the latest"), with the backend effect per flow, and with the completeness clause: what is
not covered is declared and becomes a pending item, it is not passed off as covered.

**When the agent says it cannot be tested:**

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

What I am asking for: that "it cannot be tested" not be the end of the conversation but the
beginning of a pending item. Non-testability is debt, and debt gets recorded.

## 3. Expected result

- The new test in the repository, named after the pending item it closes.
- In the agent's report and in the commit message: the red output (how many fail, against which
  version), the green output, and the regression in green with its counts.
- The end-to-end test of the flow touched, with the evidence that the backend changed (the row,
  the record, the state).
- At the close of each block and before production: the complete end-to-end suite in green, per
  flow, with the exact version.

## 4. Completeness check

- Does the report show the red? With numbers: "4 of 8 fail against the old criterion". If it only
  shows green, the step is not climbed.
- Did the regression run in the same session? How many tests, how many green?
- Is any part "mocked" right where the change is? Ask the agent what it mocked and why.
- Does the commit cite the pending item and say "proved red"?
- Does the screen test also verify the effect in the backend?
- At the close of the block: are all the flows in the end-to-end suite, or is there one that "is
  covered by the unit tests"?

## 5. Warning signs

- Every new test of the week passed green on the first try, and no red was ever shown. Either the
  agent is skipping the step or the tests prove nothing.
- The test suite takes longer and longer and nobody knows why. It is usually that the end-to-end
  tests were being replaced by mocks "so that it runs fast".
- The agent reports "the tests pass" without saying how many. Always with numbers.
- You reach go-live and the complete end-to-end suite runs for the first time. The block closings
  were missing.
