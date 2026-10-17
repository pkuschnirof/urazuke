# Step 9 — Measure before building, with an instrument that is itself verified (step contract)

**Phase:** loop (whenever a number feeds a decision).
**Form:** one shot per measurement; sometimes a conversation when the hypothesis is the owner's.
**Size:** proportional. In a small project, "measuring" can be counting with one command and
writing the number down with its date; the ratchet and the query budget are for systems with
volume. What does not change with size: no number that decides anything comes from an impression.

## What it is for

So that every number that feeds a decision comes from a program with a test, and not from a text
search, an impression, or "I think there are about a hundred". And so that the instrument itself
is audited, because meters lie: in Kikan one did not see 84 calls with the counter at zero, and
another said 27 when there were 44. The five rules are: a guarded meter; if the instrument does
not exist, build it; audit in both directions; mark what is approximate; and the one who executes
verifies the numbers of the one who planned.

There is a deep reason for this step to exist: the model is very good at producing claims with a
number ("there are about 120 loops of this kind") and those claims sound exactly the same whether
they were measured or estimated. The owner has no way to tell them apart by tone. The only way is
to demand the instrument: "what did you measure it with? show me the command". If there is no
command, it is an impression, however many decimals it has.

## 1. Required context

- The hypothesis, from the owner or the agent: "I think the problem is X", "there must be about a
  hundred".
- Access to what is to be measured: the code, the database read-only, the log.
- The meters that already exist in the repository, if any.

## 2. Prompts

**Opening:**

> Before building anything, we are going to measure. The hypothesis is: [X]. Write a meter (a
> script that lives in the repository) that measures [the quantity], and a test for the meter
> that checks it against a known case where the answer is known in advance. If measuring
> requires access or data you lack, ask me; do not approximate silently. If some part can only
> be approximated, mark it as approximate and tell me the margin. Run the meter, show me the
> number together with the command that produces it, and audit it in both directions: from the
> code to the measurement (is everything that should be counted, counted?) and from the
> measurement to the code (does everything counted actually exist?). Only then propose what to
> build. Reply in my language.

What we are asking for, clause by clause: the meter **in the repository** (not a loose command
that gets lost); the **meter's test** against a known case (the guard); the completeness clause in
its measuring form (ask for access, do not approximate silently); mark what is approximate with its
margin; the number **with the command** that produces it, so that the owner can run it; the audit
in both directions, which is what uncovered the two lying meters; and the order: first measure,
then propose.

**When there is a budget:**

> Set the budget for [queries / loops / time] on this path at the measured value plus a small
> margin, and protect it with a test that fails if it is exceeded. Tell me the number and the
> margin.

What we are asking for: that the budget be the measured value plus a little, not a round number,
and that it has a test that fails when exceeded. That way a performance regression shows up in the
suite and not in production.

**When the one who planned gave numbers (rule five):**

> Before executing the plan, verify every number the plan asserts with the meter. If any does
> not match, stop and tell me; do not execute on a wrong number.

What we are asking for: that the one who executes does not trust the planner's numbers, even if it
is the same model in another session. In Kikan, three of four claims in the plan were wrong; where
there was an instrument, the number was exact.

## 3. Expected result

- The meter in the repository (`tools/measure_*.py`, `scripts/meter-*.mjs` or similar), with its
  test.
- The number, with the command that produces it and the date.
- The two-direction audit, written in two or three lines.
- What is approximate marked as such, with its margin.
- If there is a budget: the value, the margin, and the test that protects it.
- In the commit: "measured: [number] with [meter]".

## 4. Completeness check

- Can you run the meter's command yourself and get the same number? (You run it; you do not need
  to understand it, only to execute it.)
- Does the meter have a test? Against which known case?
- Is there any number in the report without a meter behind it? Ask where it came from.
- Is what is approximate marked?
- If the plan carried numbers, did the agent verify them before executing and tell you which did
  not match?

## 5. Warning signs

- A number changed between two reports without the code changing. One of the two was not
  measured.
- The meter reads zero. It is almost never zero; it is almost always that the meter does not see
  something (in Kikan, twice).
- The agent proposes to build "while measuring", to save time. The order is the method: first the
  number, then the plan.
