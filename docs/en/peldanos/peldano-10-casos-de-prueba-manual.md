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

Two more things came in with D-082, and they are two and not one. The first: **a person executes in
order to accept and the agent walks in order to find defects**, and the method asks for both. The
agentic walk -- the agent opening every screen, looking at what is on it, using it and following
the flow from one screen to the next, as a person would -- does not replace the human execution,
and it is not the end-to-end test of step 8 either: the end-to-end test walks a path somebody
chose, and the walk looks for what nobody thought of testing. I ask for it because I measured it:
of everything an agent did in a complete cycle, the walk was **what found the most interface
defects**, and the method did not ask for it; the agent was asking it of itself. It goes to
`docs/SCREEN_WALKTHROUGH.md`, with its denominator: how many screens the system has, how many it
walked and how many defects it found. A screen it could not get into is counted in the total and
named with its reason; taking it out of the denominator so the figure looks nicer is exactly what
`CQ-19.1` of Annex H forbids.

And the second, which is the limit of this step said to your face: **writing the cases and having a
person execute them are two different states, and the method cannot compel the second one.** No
program can verify that a person followed a script with their own hands, and a gate that demanded
it could only be satisfied by lying. So the step demands what can be verified -- the declaration --
and the debt stays in plain sight: `cases_written`, `cases_executed_by_a_person` and
`execution_debt` at the head of `docs/MANUAL_TESTS.md`, and the second figure is moved by a signed
execution and never by the agent's reading. The declaration **does not add a new gate**: what the step demands on top is that the debt be
written down, not that the figure be above zero, because compelling a person is the thing the
method cannot do. What **does** stop it, and was already there since anchor 4 of Annex H, is that a
case nobody ran per profile is not an executed case: I measured it on 2026-11-02 with the real
evaluator, and an installation that implements that anchor goes red saying that the register of
signed cases is empty. So what was missing was not a block: it was that the debt be **legible** --
its figure and the name of whoever owes it -- instead of an empty register that says "nobody
signed" without saying who had to sign or since when. And it is worth knowing, in order to read
this step, where the measurement that opened it came from: the project that advanced with the empty
table was running the **frozen** schema 1, where the only check of step 10 is that the file
exists. I measured it on 2026-11-02 in a real project: the thirteen
cases written, the execution table empty, the step green, and a compliance document claiming six
criteria as verified whose verifier was a person who never executed them. The agent had done
exactly what the step said. The hole was the step's.

**And the question all of this leaves, answered without detours: if nobody has signed a single
case, do I advance?** No. I measured it on 2026-11-02 with the real evaluator, and the two halves are
of one piece: with the register of signatures empty, step 10 comes out **red** saying that nobody
signed a single case, and with one single case signed by a person -- with their name, their date and
the profile they ran it with -- that same tree, with its thirteen written cases and its
`execution_debt` at `pending_verifier`, stops being red and goes to the owner's verification. So what
stops the step is not the debt, and never was: what stops it is that **nobody has signed anything**,
and that has been in anchor 4 of Annex H since `2026.10.1`, since before this declaration existed.
The debt neither opens nor closes the gate: it makes it **legible**, which is a different thing and
the one that was missing.

I write it because it had to be said here instead of left for each reader to deduce. A project that
advanced step 10 with an empty register of signatures did not do so because the method allows it: it
pinned the **frozen** schema 1, where the only check of step 10 is that the file exists, and that is
exactly what `PND-055` and D-068 say about pinning against an internal identity the method cannot
name. If it happened to you, the first thing to look at is not the step: it is which version the
project is pinned to.

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
>
> Every manual case also runs once per affected profile, and it is derived
> from `docs/PROFILE_MATRIX.md` instead of being written by hand: a case run
> with a single profile is not an executed case (Annex H, anchor 4). At the
> close of each block add the two human checks no machine replaces: the
> first-click check, where I name the place I would look for a task and you
> compare that with the menu, and the real screenshot of the test
> environment.
>
> `docs/MANUAL_TESTS.md` carries at its head three declarations that a gate reads, each one under
> its fixed key in English even when the file is in my language, because what this step owes is not
> the same as what it can prove. `cases_written`: how many cases are written.
> `cases_executed_by_a_person`: how many of those a person signed in their execution table, with a
> date and a name; you keep the first figure, and the second one moves only when a person executes
> -- never from your own reading of the system. `execution_debt`: `none` when the two figures are
> the same, or `pending_verifier` and then the cases nobody has executed yet, with who owes each
> execution and since when. That debt is not a gate of its own: what this step asks you for is the
> declaration and not a figure above zero, because the method cannot make a person execute. But it
> is never silent either, and a step that advances with its debt declared is honest in a way that a
> step advancing while it looks complete is not.
>
> And walk the screens yourself, which is a different thing from the execution a person owes and
> never a replacement for it: you walk to find defects, a person executes to accept. Go through
> every screen the system has as a person would -- open it, look at what is on it, use it, and
> follow the flow from one screen to the next -- and write `docs/SCREEN_WALKTHROUGH.md` with
> `screens_total`, how many screens the system has; `screens_walked`, how many of them you actually
> walked; and `walkthrough_findings`, how many defects the walk found. A screen you could not reach
> is counted in the total and named with its reason: taking it out of the denominator so that the
> figure reads better is the one thing this file must never do. For every defect: the screen, what
> you saw, what you expected instead, and the pending item you opened for it.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

What I am asking for: that the case come out of the acceptance criteria (so that it tests what was
asked for, not what the model understood); that it be written for somebody who does not know how
the system works, which is the difference between a test case and a technical note; that it
include the backend effect verifiable by a person, so that the manual test also looks at the other
side of the screen; that the cases be maintained in the same commit, just like the documentation;
and **that the model never execute them**, because executed by the model they are one more test,
and the whole point is that a person executes them.

And what D-082 adds: that the agent **walks the screens on its own**, which is what finds the most
interface defects and what the method was not asking for; and that the file of cases carries at its
head the difference between what is written and what was executed, so that a step advancing with
debt advances **saying so**. The walk does not replace the human execution: it makes it shorter,
because the person no longer runs into the defects the agent could have seen by looking.

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
> the case or the system is the problem.
>
> Then refresh the three declarations at the head of the file: `cases_written`,
> `cases_executed_by_a_person` counted from the signed execution tables and from nothing else, and
> `execution_debt` with who still owes which execution and since when.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

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
- `docs/SCREEN_WALKTHROUGH.md` with the agent's walk: `screens_total`, `screens_walked` and
  `walkthrough_findings`, and every defect with its screen, what was seen, what was expected and
  its pending item.
- At the head of `docs/MANUAL_TESTS.md`, the three declarations a gate reads: `cases_written`,
  `cases_executed_by_a_person` -- which only a signed execution moves -- and `execution_debt` at
  `none` or at `pending_verifier`, with who owes each execution and since when.

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
- Does `cases_executed_by_a_person` come from the signed tables and not from the agent's reading?
  Take a case counted as executed and look for the date and the name in its table.
- If there is debt, does `execution_debt` say who owes it and since when? A debt with no name is
  not a debt: it is a lapse with formatting.
- Does the walk count the screens it could not open inside the total, with their reason? A
  `screens_walked` equal to the total, in a system with screens behind a profile the agent does not
  have, is an invented figure.
- Do the defects of the walk have their pending item, the same as the human failures?

- If nobody has signed a single case yet, does the text tell you that you do not advance? Put the
  question to the contract and to the gate -- "if nobody executed, do I advance?" -- and demand that
  they answer the same. If the contract says yes and the gate says no, the one that is wrong is the
  contract.

## 5. Warning signs

- The agent marked the cases as executed. It executed them, which is the same as not executing
  them.
- The cases are copies of the automated test in prose. A manual case has to look at what the test
  does not look at: what is seen, what is understood, what is annoying.
- All the cases pass in every execution. People always find things; if they find nothing, they
  are not following the script or the script does not ask them to look.
- The failures get "fixed" on the spot, without a pending item. The person's words and the trail
  of what repeated get lost.
- The step shows as fulfilled, `cases_executed_by_a_person` is at zero **and the gate gave you
  green**. The figure at zero is not the problem: a declared debt is honest. The problem is the
  green: on the published catalogue, a step 10 with no signature at all comes out red through anchor
  4. If it came out green, do not celebrate it: look at which `catalog_version` the project is
  pinned to.
- The agent's walk found nothing and the system has new screens. Walking is not opening: if there
  are no findings, most likely it looked at the screen and did not use it.
- The walk starts being used as an excuse not to execute the cases. They are two things with two
  purposes, and the one that accepts is the person's.
