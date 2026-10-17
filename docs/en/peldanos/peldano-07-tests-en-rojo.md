# Step 7 — Tests as locks, proved red (step contract)

**Phase:** loop (every change).
**Form:** one shot; the agent executes and reports, the owner reads the report.
**Size:** mandatory in every project. It is the heart of the method: if there is one step that
cannot be negotiated, it is this one.

## What it is for

A test you never saw fail, you do not know whether it tests anything. The rule here is not "write
tests": it is "prove that the test turns red against the old code, and then green with the new
one". It prevents tests that pass because they test nothing, and the green that hides a bug.

Why this matters more with a model than with a human programmer: the model writes the code and the
test **in the same session, with the same understanding**. If it misunderstood the request, the
test will test what it understood, and it will pass. The red against the old code is the only cheap
way to check that the test is looking at what matters: if the old code passes it, the test does not
tell before from after, and so it is useless.

## 1. Required context

- The change already implemented (by default tests come after implementation; "test first" stays
  as an option for small, well-defined scopes).
- The pending item that originates the change, with its "how it is verified".
- The existing suite and the command to run it (step 4).

## 2. Prompts

**Routine (goes in the working agreement; applied to every change):**

> To close this pending item I need evidence, not your word. (1) Write the test that proves what
> the item asks for. (2) Demonstrate that this test fails against the previous code: you may
> temporarily revert the change, or run the test against the old version, but show me the red
> output. (3) Show me the green output with the change. (4) Run the regression suite for the
> neighbouring items and show me it is still green. (5) Do not replace with mocks the very part
> you are trying to test. If testing end to end requires something you lack (data, access, an
> environment), ask me for it; do not simulate what you do not have. Finally, the commit message
> says "proved red against [what]" and the test counts.

What we are asking for, clause by clause: (1) the test; (2) **the demonstrated red**, output in
view, which is the clause that distinguishes this method from "write tests"; (3) the green; (4) the
neighbours' regression in the same session, because a change breaks things next to it; (5) no
mocking of precisely what is being tested; and the completeness clause adapted to this step: if
something is missing to test end to end, **ask for it, do not simulate it**. The commit message
with the counts leaves the evidence where the code lives.

**When the agent says it cannot be tested:**

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

What we are asking for: that "it cannot be tested" is not the end of the conversation but the start
of a pending item. Non-testability is debt, and debt is recorded.

## 3. Expected result

- The new test in the repository, named after the item it closes.
- In the agent's report and in the commit message: the red output (how many fail, against which
  version), the green output, and the regression in green with its counts.
- If it was tested end to end (screen → backend), the evidence that the backend changed (the row,
  the record, the state).

## 4. Completeness check

- Does the report show the red? With numbers: "4 of 8 fail against the old criterion". If it only
  shows green, the step is not climbed.
- Did the regression run in the same session? How many tests, how many green?
- Is any part "simulated" (mocked) right where the change is? Ask the agent what it mocked and
  why.
- Does the commit cite the item and say "proved red"?
- If the test is a screen test, does it also verify the effect on the backend?

## 5. Warning signs

- All of the week's new tests passed green on the first run, and no red was ever shown. Either the
  agent is skipping the step or the tests test nothing.
- The suite takes longer and longer and nobody knows why. Usually the end-to-end tests have been
  replaced by simulations "so it runs fast".
- The agent reports "the tests pass" without saying how many. Always with numbers.
