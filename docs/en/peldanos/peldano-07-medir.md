# Step 7 — Measure before building, with an instrument that is itself verified (step contract)

**Stretch:** loop.
**When:** every time a pending item depends on a number or on a hypothesis about a cause, BEFORE
building. In the start-up stretch, sizing is the first case. In a small project, "measuring" is
counting with a command and writing the number down with its date.
**Form:** one shot per measurement; sometimes a conversation, when the hypothesis is yours.
**Size:** proportional. The ratchet and the query budget are for systems with volume. What does
not change with size: no number that decides anything comes from an impression.

## What it is for

Make every number that feeds a decision come from a program with a test, and not from a text
search, from an impression, or from "I think there are about a hundred". And make the instrument
itself get audited, because meters lie: one of mine did not see 84 calls with the counter at zero,
and another said 27 when there were 44 [Ref. 35](../REFERENCIAS.md#ref-35),
[Ref. 36](../REFERENCIAS.md#ref-36). The five rules I wrote after that are: a guarded meter; if
the instrument does not exist, it gets built; it is audited in both directions; what is
approximate gets marked; and the one who executes verifies the numbers of the one who planned.

This is the step that took me longest to formalise, and for a reason worth telling: I took it for
granted that a model would apply on its own something as basic in engineering as "measure before
touching". It does not. The model is very good at producing claims with a number in them ("there
are about 120 loops of that kind") and those claims sound exactly the same when they have been
measured and when they have been estimated. You have no way of telling them apart by the tone. The
only way is to demand the instrument: "what did you measure it with? show me the command". If
there is no command, it is an impression, however many decimals it has. I imposed the rules myself
in session, correcting the agent, before they became doctrine [Ref. 45](../REFERENCIAS.md#ref-45).

## 1. Required context

What follows is the generic list. The concrete files you have to have made before each prompt,
with their content and their minimum state, are in section 2, in the "Before sending the
prompt" block that precedes each one.

- The hypothesis, yours or the agent's: "I think the problem is X", "there must be about a
  hundred".
- Access to what is to be measured: the code, the database read-only, the log.
- The meters that already exist in the repository, if there are any.

## 2. Prompts

**Opening:**

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- The hypothesis, written in one sentence, yours or taken from the agent: "I think the day view
  runs one database query per appointment", "there must be about a hundred loops". It goes into
  the [X] gap of the prompt, and the quantity to measure into the other gap.
- Access to what is going to be measured: the code (it already has it); the database read-only,
  if the measurement is over real data, with the connection string outside the repository and the
  name of the variable said in the chat; the log, with its path.
- The meters that already exist in the repository, if there are any, named, so that the agent
  reuses them instead of making another one.
- A known case for the meter's test: a situation where you know the answer in advance ("with zero
  appointments it has to count exactly the two base queries"). If none occurs to you, ask the
  agent to propose one, but validate it yourself: a meter verified against a case that the meter
  itself invented is not verified.
- Minimum acceptable state: the hypothesis fits in one sentence and there is a known case to
  verify the instrument against.

> Before building anything, we are going to measure. The hypothesis is: [X]. Write a meter (a
> script that lives in the repository) that measures [the quantity], and a test for the meter
> that checks it against a known case where the answer is known in advance. If measuring
> requires access or data you lack, ask me; do not approximate silently. If some part can only
> be approximated, mark it as approximate and tell me the margin. Run the meter, show me the
> number together with the command that produces it, and audit it in both directions: from the
> code to the measurement (is everything that should be counted, counted?) and from the
> measurement to the code (does everything counted actually exist?). Only then propose what to
> build.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

What I am asking for, clause by clause: the meter **in the repository** (not a loose command that
gets lost); the **meter's test** against a known case (the guard); the completeness clause in its
form for measuring (ask for the access, do not approximate silently); mark what is approximate
with its margin; the number **with the command** that produces it, so that you can run it; the
audit in both directions, which is what unmasked my two lying meters; and the order: first
measure, then propose.

**When there is a budget:**

**Before sending the prompt**, you have to have this at hand:

- The measured number, which you ran yourself with the command the agent gave you, and which gave
  you the same. If you did not run it, do not set a budget on it.
- The margin you are willing to give, decided by you: a little more than what was measured, not
  double "just in case".
- Minimum acceptable state: you ran the meter yourself.

> Set the budget for [queries / loops / time] on this path at the measured value plus a small
> margin, and protect it with a test that fails if it is exceeded. Tell me the number and the
> margin.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

What I am asking for: that the budget be the measured value plus a little, not a round number,
and that it has a test that fails if it is exceeded. That way a performance regression shows up in
the test suite and not in production [Ref. 37](../REFERENCIAS.md#ref-37).

**When the one who planned gave numbers (rule five):**

**Before sending the prompt**, you have to have this at hand:

- A plan from the agent with numbers inside it ("there are 121 loops", "it is 27 queries"), in
  sight in the conversation.
- The meter that measures that quantity, already existing (the opening prompt of this step). If
  there is no meter for that number, first the opening prompt and then this one.
- Minimum acceptable state: for every number in the plan you know which meter verifies it.

> Before executing the plan, verify every number the plan asserts with the meter. If any does
> not match, stop and tell me; do not execute on a wrong number.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

What I am asking for: that the one who executes does not trust the numbers of the one who planned,
even if it is the same model in another session. In my case, three of the four claims in the plan
were wrong; where there was an instrument, the number was exact.

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
- The meter reads zero. It is almost never zero; it is almost always that the meter is not seeing
  something.
- The agent proposes to build "while measuring", to save time. The order is the method: first
  the number, then the plan.
