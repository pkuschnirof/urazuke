# Step 10 — Manual test cases are written together with the functionality, and people execute them (step contract)

**Stretch:** loop.
**When:** with every pending item, when closing it, after the red test (8) and quality (9): the
agent writes the manual test cases of the flow it touched. They are executed by people at three
moments: at the close of every block (the human tests), before the first deployment to production
(the acceptance tests with the owner), and after every deployment, in a read-only pass. Every
execution that fails reinjects a requirement into the loop as a corrective pending item.
**Form:** a routine of every pending item; afterwards, human execution per cycle.
**Size:** mandatory in every project with users: the manual test case is the only test the model
neither writes nor runs.

## What it is for

The method has automated tests to spare: the red test, the regression, the end-to-end on three
scales. The model writes and runs all of them, and all of them test what the model understood.
What is missing is the test a person does with their own eyes and their own hands, following a
written script, and which finds what no test finds: the button that is where it should not be,
the message that cannot be understood, the flow that technically works and humanly is useless.
The human view and the human tests were already in the timeline; what was missing was that they
have a **script**, and that the script be written by the same one who built the functionality, at
the same moment, out of the acceptance criteria of the pending item. Without a script, the human
test is "play with the system for a while", and what gets found depends on the mood of the day.
With a script, it is executed the same way every time, what happened gets recorded, and what
fails comes back into the loop as a requirement. It is the closing of the circuit that the process
diagram shows: the manual execution of the test cases reinjects requirements into development.

A manual test case always has the same shape: an identifier; the pending item that originates it;
the precondition (what has to exist beforehand: a patient, an appointment from yesterday); the
steps, numbered, each one with what the person does and what they must see; the expected result at
the end, including the backend effect a person can verify (a record that appears, a message in
the fake inbox); the test data to use; and the space for the result of each execution: date, who,
passed or failed, observation.

**If you are a beginner.** A *manual test case* is a recipe for a person to test a piece of
functionality: what to prepare, what to do step by step, and what has to happen at each step. It
is written so that anyone can follow it the same way, without knowing how the system is built. To
*execute* a case is to follow the recipe and write down whether it passed or failed. A
*precondition* is what has to exist before starting. And to *reinject* means that whatever the
person found wrong comes back to the list of pending items as a new request, in their words.

## 1. Required context

What follows is the generic list. The concrete files you have to have made before each prompt,
with their content and their minimum state, are in section 2, in the "Before sending the
prompt" block that precedes each one.

- The pending item that is being closed, with its "given, when, then" acceptance criteria
  (step 5): they are the raw material of the case.
- The test environment with data, so that the steps can really be followed.
- Who is going to execute the cases (the owner, a trusted user) and when (close of block,
  acceptance, after every deployment).

## 2. Prompts

**Routine of every pending item (goes in the working agreement):**

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- The pending item with its acceptance criteria in `docs/PENDING.md` (step 5), already built and
  with the test red and quality green (steps 8 and 9).
- `docs/MANUAL_TESTS.md` created, even if empty, with the format of the case in the header:
  identifier, pending item, precondition, steps (action and visible result), expected result with
  the backend effect verifiable by a person, test data, and the execution table (date, who,
  passed or failed, observation).
- The decision about who executes and when, written in `PROJECT.md` or in the agreement: for a
  small project, the owner at the close of every block and before the first deployment.
- `docs/WORKING_AGREEMENT.md`, where the routine goes.
- Minimum acceptable state: the file exists with its format and the pending item has acceptance
  criteria.

> Every pending item that changes what a user sees or does is closed with its manual test cases
> written in `docs/MANUAL_TESTS.md`, derived from its acceptance criteria: one case per flow the
> item touches, with an id, the pending item, the precondition, the numbered steps (what the
> person does and what they must see), the expected result including a backend effect a person
> can verify without tools, the test data to use, and an empty execution table (date, who,
> passed or failed, observation). Write them for a person who does not know how the system is
> built. Keep the cases of closed items up to date: when a flow changes, its cases change in the
> same commit. Never mark a case as executed yourself: execution is human.

What I am asking for: that the case come out of the acceptance criteria (so that it tests what was
asked for, not what the model understood); that it be written for somebody who does not know how
the system works, which is the difference between a test case and a technical note; that it
include the backend effect verifiable by a person, so that the manual test also looks at the other
side of the screen; that the cases be maintained in the same commit, just like the documentation;
and **that the model never execute them**, because executed by the model they are one more test,
and the whole point is that a person executes them.

**For an execution (close of block, acceptance, after a deployment):**

**Before sending the prompt**, you have to have this at hand:

- The execution done: a person followed the cases of `docs/MANUAL_TESTS.md` in the test
  environment (or in production, read-only, after a deployment) and wrote in the table of each
  case the date, who, passed or failed, and the observation. The person does this, by hand, before
  pasting the prompt; the agent does not do it.
- The loose observations that do not fit in any case (what was annoying, what was not understood),
  written at the end of the file with a date.
- Minimum acceptable state: every case in scope has today's result, even if it is "could not be
  executed" with the reason.

> Read the executions of today in `docs/MANUAL_TESTS.md`. For every case that failed, and for
> every loose observation at the end of the file, open a corrective pending item in
> `docs/PENDING.md` with the person's words as the way to reproduce it, hanging from the node of
> the semantic tree it touches; do not fix anything now. For every case that passed, nothing. Then
> tell me, flow by flow, how many cases passed and how many failed, compared with the previous
> execution, and which failures repeat. If a case could not be executed, tell me why and whether
> the case or the system is the problem. Reply in my language.

What I am asking for: the reinjection made operative: every human failure is a corrective pending
item, with the person's words (not the model's) as the reproduction, and hanging from the tree;
the comparison with the previous execution, which is what tells you whether the system improves or
degrades between blocks; and the distinction between "the case is badly written" and "the system
is wrong", which are two different pending items.

## 3. Expected result

- `docs/MANUAL_TESTS.md` with one case per flow touched by every closed pending item, in the
  format, written for a person.
- The executions recorded, with date and who, in every cycle.
- One corrective pending item for every failure and for every observation.
- The routine in the agreement.

## 4. Completeness check (you do it, without reading code)

- Take a case at random and follow it yourself in the test environment without asking the agent
  anything: could you? If you had to ask, the case is not written for a person.
- Does every closed pending item that touches a screen have its case? Ask for the list of pending
  items without a case.
- Does the case say what effect to verify on the other side of the screen, and how a person
  verifies it?
- Does the last execution have a date and a name in every case? Is there any "passed" without a
  date?
- Does every failure of the last execution have its pending item, with the person's words?

## 5. Warning signs

- The agent marked the cases as executed. It executed them, which is the same as not executing
  them.
- The cases are copies of the automated test in prose. A manual case has to look at what the test
  does not look at: what is seen, what is understood, what is annoying.
- All the cases pass in every execution. People always find things; if they find nothing, they
  are not following the script or the script does not ask them to look.
- The failures get "fixed" on the spot, without a pending item. The person's words and the trail
  of what repeated get lost.
