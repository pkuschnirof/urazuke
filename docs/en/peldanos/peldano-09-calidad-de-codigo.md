# Step 9 — Code quality verified by machine, with a gate (step contract)

**Stretch:** loop.
**When:** it is set up once, when the first functional block opens (as soon as the start-up
stretch finishes), and from then on it runs on its own on every commit, as a gate of continuous
integration; every pending item is closed with quality green, after the red test (8) and before
the manual test case (10). At the close of every block and before every deployment, the quality
report is read with the owner. In a legacy system, the first run is the baseline and the findings
enter the backlog with their speed mark.
**Form:** one shot to set it up; afterwards, a routine of every change and a reading per block.
**Size:** mandatory at its minimum level in every project (a linter and a size limit in the
chain); complete in any project with users. Mutation testing is an optional reinforcement,
recommended in every project with users.

## What it is for

The owner does not read the code, and that is the point of the method. But the code exists,
somebody is going to maintain it (the next agent, the next developer), and code that works today
and is unreadable tomorrow is debt that gets charged in month three. If nobody reads it, **a
machine has to look at it**: tools that, on every commit, measure what a human reviewer would look
at and turn it into a number with a limit. I did this in all my projects, without naming it as a
step, and a quality audit handed me back a component of more than two thousand lines and a project
file of almost ten thousand [Ref. 41](../REFERENCIAS.md#ref-41): neither of the two would have
passed a written size limit. The static ratchet, which prevents a quality number from getting
worse [Ref. 35](../REFERENCIAS.md#ref-35), is the shape I give this step.

What gets measured by machine, in order of importance: that the code respects a single style (the
*linter* and the *formatter*); that no function and no file goes over a size; that the
*complexity* of each function stays under a limit; that there is no duplicated code and no dead
code; that the dependencies are declared and used; that the *coverage* of the tests never drops
(the ratchet); and, if the language allows it, that the types close. None of this replaces the red
test: impeccable code can be wrong. What it prevents is correct code that nobody can ever touch
again.

And an optional reinforcement that is worth it in any project with users: **mutation testing**.
A tool plants bugs on purpose in the code (changes a "greater than" into a "greater than or
equal", deletes a line, flips a condition) and runs the tests; every bug the tests do not catch is
a *surviving mutant*, and the proportion caught is the score. It is the measure that complements
the demonstrated red of step 8: the red proves that one test watches today's change; mutation
measures how much the whole suite watches. And it is, as far as I know, the only one that in the
2026 studies told the tests that prove from the tests that decorate (Part F of the main
document).

**If you are a beginner.** A *linter* is a program that reads the code and marks what is badly
written or dangerous (a variable that is not used, a comparison that always gives the same
result), like the spell checker of a word processor. A *formatter* arranges it with a single style
(indentation, spaces) so that all the code looks as if it were written by the same hand. The
*complexity* of a function is how many different paths it can take (every "if" increases it); a
function with forty paths is understood by nobody. *Duplicated code* is the same block copied in
two places: the day one of them is fixed, the other one stays wrong. *Coverage* is what percentage
of the code is executed by some test. And a *ratchet* is a mechanism that only lets things
improve: today's number is tomorrow's floor. *Mutation testing* is a program that breaks the code
on purpose, one small change at a time, and looks at whether any test notices; if none does, that
piece of code is not being watched.

## 1. Required context

What follows is the generic list. The concrete files you have to have made before each prompt,
with their content and their minimum state, are in section 2, in the "Before sending the
prompt" block that precedes each one.

- Continuous integration running on every push (step 4).
- The first functional block open, with at least one pending item built: without code there is no
  quality to measure.
- Your decision about the limits, or the willingness to accept the ones the agent proposes, with
  a reason.
- The previous audit (13, or N3 in a legacy system), if there was one.

## 2. Prompts

**Opening (setting up the gate):**

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- Continuous integration running on every push (step 4), and how much quota you have left: the
  quality checks add minutes.
- At least one pending item of the first block built and closed with step 8, so that there is
  real code to measure and not the empty skeleton.
- Your decision about two limits, written in one line: the maximum size of a file and of a
  function (to start with, three hundred lines and forty), and whether coverage can only go up.
  The agent proposes the rest and you approve it.
- In a legacy system: `docs/AUDIT_[date].md` (N3), so that the agent does not report what is known
  and the first run is the baseline.
- Minimum acceptable state: the chain runs, there is code from a closed pending item, and you
  wrote the two limits.

> We are going to make the code quality verified by machine, because nobody is going to read the
> code. Set up, in continuous integration, on every push: (1) a linter and a formatter with one
> configuration for the whole repository, failing the build on any violation; (2) limits on the
> size of every file and every function ([file lines] and [function lines]) and on the complexity
> of every function, failing the build when exceeded; (3) detection of duplicated code and of dead
> code (unused functions, variables, imports, dependencies); (4) a test coverage report with a
> ratchet: the measured coverage of today becomes the floor, and the build fails if it drops; (5)
> type checking if the language allows it. Run all of it now on the current code and write
> `docs/CODE_QUALITY.md` with: the tools, the configuration, every limit with its current measured
> value, and the list of what fails today with where it is. Do not fix anything yet: what fails
> today becomes pending items, and I decide which limits apply now and which are raised with a
> date. Make the whole set a gate in `docs/GATES.md`: nothing is merged with quality red. Reply in
> my language.

What I am asking for: the five checks a human reviewer would do, done by machine and with the
build in red as the consequence, because a check that does not block is a piece of advice; the
limits with their measured value, so that the limit comes out of the number and not out of an
opinion; the coverage ratchet, which is the piece that keeps quality from degrading on its own;
and **not fixing anything yet**, because in a system with code already written the first run
always comes out red and the decision about what gets fixed now and what gets tolerated with a
date is mine.

**Routine (goes in the working agreement):**

**Before sending the prompt**, you have to have this at hand:

- `docs/CODE_QUALITY.md` read by you: do you understand every limit and why it is there?
- Your decision about the list of what fails today: what gets fixed now (one pending item each)
  and what gets tolerated with a date, written in the same file.
- `docs/WORKING_AGREEMENT.md`, where the routine goes.
- Minimum acceptable state: the gate is green or every red has a pending item or a date.

> Every pending item is closed with the quality gate green: linter, formatter, size and
> complexity limits, no new duplication, no dead code, coverage at or above the ratchet. A quality
> failure is fixed in the same commit, never silenced with an exception, and a limit is never
> raised to pass; if a limit must change, say so with the reason and I decide. At the close of
> every block, show me `docs/CODE_QUALITY.md` with the numbers of the block against the previous
> one.

What I am asking for: that quality be part of the close of every pending item and not a separate
task; the ban on silencing (a model facing a red linter tends to add the exception instead of
fixing, because it is faster) and on raising the limit; and the reading per block, which is the
only moment when you look at the numbers.

**Reinforcement (optional; recommended in every project with users): mutation testing.**

**Before sending the prompt**, you have to have this at hand:

- The quality gate set up and green, with the coverage measured in `docs/CODE_QUALITY.md`.
- At least one functional block closed with step 8, so that there are tests to mutate.
- Your decision about the scope, written in one line: the whole codebase (expensive, and it only
  makes sense once, as a baseline) or only the lines changed by each pending item (the usual).
- Minimum acceptable state: there is measured coverage and there is a closed block.

> Add mutation testing to the quality gate, [on the whole codebase | only on the lines changed by
> each pending item]: a tool that plants small deliberate bugs in the code (a flipped condition, a
> deleted line, a changed operator) and runs the tests. Run it now and write in
> `docs/CODE_QUALITY.md`: the tool, the scope, the number of mutants planted, how many the tests
> killed, how many survived and where. Do not fix anything yet: every surviving mutant in code
> that matters becomes a pending item for a test that catches it, and I decide which ones matter.
> From now on, report the mutation score at the close of every block next to the coverage, and
> treat a drop as a quality failure. Reply in my language.

What I am asking for: the measure that coverage does not give (coverage says which code was
executed; mutation says which code is being watched); the scope narrowed to the lines changed,
which is what makes the cost payable on every pending item; **not fixing anything yet**, because
deciding which mutant matters is mine; and the score at the close of every block, next to the
coverage, with a drop treated as red.

## 3. Expected result

- The linter, the formatter, the limits, the detection of duplication and dead code, the coverage
  with its ratchet and the types, running on every push and red when they should be.
- `docs/CODE_QUALITY.md` with tools, configuration, limits with their measured value, and the list
  of what fails with its pending item or its date.
- The gate in `docs/GATES.md` and the routine in the agreement.
- If the reinforcement was set up: the mutation score in `docs/CODE_QUALITY.md`, per block, next
  to the coverage, and a pending item for every surviving mutant in code that matters.

## 4. Completeness check (you do it, without reading code)

- Ask it for the link to the last run of the chain: is quality green?
- Ask it to put, on purpose, on a branch, a function of a hundred lines and an unused variable:
  does the chain go red for both things?
- Is today's coverage greater than or equal to the one at the close of the previous block? Ask for
  both numbers.
- Are there any linter exceptions in the code? Ask for the list; each one has to have a written
  reason.
- Did any limit go up since the first run? With what reason and who decided it?
- If there is mutation testing: how many mutants survived in the last block, and does each one
  have a pending item or a written reason?

## 5. Warning signs

- Quality passed green on the first try on code already written. It is almost never true: the
  limits are too loose.
- The agent proposes "disabling this rule because it is too strict". Sometimes it is right; it
  always has to go through you with the reason written down.
- Coverage goes up because tests that prove nothing were added (the green that hides a bug, step
  8). The ratchet measures quantity; the demonstrated red measures quality. They go together.
- A file grew up to the limit and was split into two files with the same content. That is
  duplication disguised as compliance.
- Coverage is high and the mutation score is low. Those are tests that execute the code without
  verifying anything: the exact case the demonstrated red of step 8 tries to prevent.
