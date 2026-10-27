# Step 8 — Tests as locks, proved red (step contract)

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

There is a serious objection to this step, and I want to leave it written down because people are
going to use it against it: the same agent that writes the test and the code can **fake the red**.
A study published in August 2026 measured that, when an agent is asked for the test-first cycle,
it sometimes skips the red, reports it without having run it, or implements before the test so
that it passes from the start (it is in Part F of the main document, the one on related work). My
answer has three pieces, and all three are on the ladder. The first one, here: the red is not a
story, it is a **receipt**: the exact command, the identifier of the version it ran against, the
count of failing tests and the exit code, all pasted as they came out, so that you can run it
again with a single command without understanding what it does. The second, in step 13: the audit
by another session reruns a sample of those receipts. The third, in step 9: mutation testing,
which plants bugs on purpose and counts how many of them the tests catch; it is the only measure
that, in that same study, told the tests that watch from the tests that decorate.

And the second half: the end-to-end tests. A test that verifies from the screen (clicks, types,
reads) and checks the effect in the backend (the row is there, the state changed) is the one that
replaces your reading of the code. The acceptance criteria of the pending item ("given, when,
then") are its script. And they run three times at three scales: the flow touched with every
pending item, every flow at the close of each block, and every flow with the exact version before
production.

## 1. Required context

What follows is the generic list. The concrete files you have to have made before each prompt,
with their content and their minimum state, are in section 2, in the "Before sending the
prompt" block that precedes each one.

- The change already implemented (by default tests come after implementing; "test first" stays
  as an option for small, well-defined scopes).
- The pending item that originates the change, with its acceptance criteria and its "how it is
  verified".
- The existing test suite and the command to run it (step 4).

## 2. Prompts

**Routine (goes in the working agreement; applied on every change):**

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- The pending item that is being closed, with its full specification in `docs/PENDING.md`; in
  particular, its acceptance criteria in the "given, when, then" form and its "how it is
  verified", which are the script of the test. If the pending item does not have them, go back to
  step 5 before asking for the test.
- The change already implemented by the agent (the method tests after implementing, unless you
  choose "test first" for a small and well-defined scope).
- The existing suite and the command to run it, written down in `docs/STATUS.md` (step 4).
- The test environment running and reachable by the agent, with enough test data for the flow
  that is being touched. If the flow needs data that does not exist (a patient, yesterday's
  appointment), load it yourself or ask the agent to create it as part of the test; what it
  cannot do is simulate it.
- `docs/WORKING_AGREEMENT.md`, where the routine goes the first time.
- Minimum acceptable state: the specification has acceptance criteria, and the suite runs with a
  known command.

> To close this pending item I need evidence, not your word. (1) Write the test that proves what the
> item asks for, following its acceptance criteria. (2) Demonstrate that this test fails against the
> previous code: you may temporarily revert the change, or run the test against the old version, but
> show me the red output as a receipt, not a summary: the exact command, the identifier of the
> version it ran against, the count of failing tests and the exit code, pasted as they came out, so
> that I can rerun it myself with one command. (3) Show me the green output with the change. (4) Run
> the regression suite for the neighbouring items and show me it is still green. (5) Run the
> end-to-end test of the flow this item touches, from the screen to the backend, and show me the
> backend effect. (6) Do not replace with mocks the very part you are trying to test. If testing end
> to end requires something you lack (data, access, an environment), ask me for it; do not simulate
> what you do not have. If the previous version does not have the module at all (the first block of
> a new project), a failure to load is not a red: prove the red by planting one deliberate defect in
> the function you just wrote (an inverted condition, a deleted line), show me the test failing
> against that defect as the same kind of receipt, with the diff of the defect, and then revert it.
> Finally, the commit message says "proved red against [what]" and the test counts.
>
> The same pending item also carries the Annex H test. Write it, and see it
> fail first: for every declared profile, what that profile can reach is
> exactly its row in `docs/PROFILE_MATRIX.md`, neither less nor more, and
> every route checks the permission on the server, because hiding the entry
> point protects nothing (Annex H, UX-11, UX-12, UX-15). A matrix that
> nothing exercises is a document nobody reads.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

**The red of the first block.** In the first block of a new project there is no previous code: the new test fails because the module does not exist, and that failure does not prove the test tells behaviour apart. So, when the previous version does not have the module, the red is proven **by mutation**: the agent plants a deliberate defect in the function it just wrote, shows the test red against that defect (the receipt carries the diff of the defect, so you can see it was not trivial), reverts it and shows the green. One mutant per pending item, run and recorded like any other receipt; mutation testing over the whole codebase stays the optional reinforcement of step 9. (Decision D-037, from the Turnera practice: six red receipts that only said "the file does not load".)

What I am asking for, clause by clause: (1) the test, guided by the acceptance criteria of the
pending item; (2) **the red demonstrated as a receipt** (command, version, counts, exit code),
which is the clause that distinguishes this method from "write tests" and the one that keeps the
red from being a story; (3) the green; (4) the regression of the neighbours in the same session,
because a change breaks things next to it; (5) the end-to-end
test of the flow touched, with the backend effect in plain sight; (6) not mocking the very thing
being tested; and the completeness clause adapted to this step: if something is missing to test
end to end, **ask for it, do not simulate it**. The commit message with the counts leaves the
evidence where the code lives.

**At the close of each block and before every deployment to production:**

**Before sending the prompt**, you have to have this at hand:

- Every pending item of the block closed with the routine (red, green, regression, end to end of
  the flow).
- The exact version that is going to be promoted, identified (version number or commit) and
  deployed in the test environment; tell it in the chat if it is not in `docs/STATUS.md`.
- The list of the flows that exist so far, written by you from the use cases of the semantic
  tree, to contrast it with what the agent says it covered. Without your list, "every flow" is
  whatever the agent remembers.
- Minimum acceptable state: you know how many flows the suite has to walk before you ask it how
  many it walked.

> Run the complete end-to-end suite of every flow that exists so far, in the test environment,
> with the exact version that will be promoted. Show me the counts, and for each flow the
> backend check that proves it. If any flow has no end-to-end test, say so and open a pending
> item for it; do not pass it as covered.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

What I am asking for: the second and third scales of the end-to-end tests, with the exact version
(not "the latest"), with the backend effect per flow, and with the completeness clause: what is
not covered is declared and becomes a pending item, it is not passed off as covered.

**When the agent says it cannot be tested:**

**Before sending the prompt**, you have to have this at hand:

- The agent's message saying that it cannot be tested, read carefully: can it not, or is it
  missing something? If what is missing is an input you have (data, an access, an environment),
  give it to it and do not send this prompt. This prompt is for when something really is missing
  in the system (identifiers on the elements of the screen, a test mode from the external
  provider).
- Minimum acceptable state: you distinguished between "I am missing an input" (you give it) and
  "the system is not testable here" (this prompt).

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

What I am asking for: that "it cannot be tested" not be the end of the conversation but the
beginning of a pending item. Non-testability is debt, and debt gets recorded.

## 3. Expected result

- The new test in the repository, named after the pending item it closes.
- In the agent's report and in the commit message: the red output as a receipt (the command, the
  version it ran against, how many fail, the exit code), the green output, and the regression in
  green with its counts.
- The end-to-end test of the flow touched, with the evidence that the backend changed (the row,
  the record, the state).
- At the close of each block and before production: the complete end-to-end suite in green, per
  flow, with the exact version.

## 4. Completeness check

- Does the report show the red? With numbers: "4 of 8 fail against the old criterion". If it only
  shows green, the step is not climbed.
- Is the red a receipt or a story? It has to have the exact command, the version it ran against,
  the counts and the exit code. Once per block, pick a pending item at random and run that command
  yourself: the red has to show up again.
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
- The red comes told in prose ("the test failed as expected") with no command, no version and no
  counts. A red without a receipt is worth the same as none.
- You reach go-live and the complete end-to-end suite runs for the first time. The block closings
  were missing.
