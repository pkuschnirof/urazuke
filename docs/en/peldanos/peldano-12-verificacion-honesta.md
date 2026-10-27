# Step 12 — Honest verification and proportional reporting (step contract)

**Stretch:** loop.
**When:** in every report, of every pending item, throughout the whole project. It is the shape
that everything the agent tells you has to have.
**Form:** routine; it is the shape every report from the agent must have.
**Size:** mandatory in every project, without exception. It costs nothing and it is what lets the
owner not read code.

## What it is for

If you are not going to read code, the agent's report has to be reliable. Not optimistic, not
"complete in appearance": reliable. This is the genuinely new thing about the method: the author
of the code also manufactures the evidence, and does so with the same confidence in its voice when
it is right and when it is wrong. That is why the evidence has to prove itself, and the report has
to separate what was verified from what is believed. I wrote the rule in June
[Ref. 8](../REFERENCIAS.md#ref-8), and I needed it again in October, when an authentication error
was reported with the label "success" [Ref. 43](../REFERENCIAS.md#ref-43).

Understand why the model tends to over-report. It is not bad faith: it is that it was trained to
be useful and complete, and a report that says "I could not verify this" feels less useful than
one that says "done". So **ask it explicitly** for the bad news, the blind spots and what it did
not do. If you do not ask, it does not give it to you, not because it hides it but because it does
not consider it part of the answer.

## 1. Required context

What follows is the generic list. The concrete files you have to have made before each prompt,
with their content and their minimum state, are in section 2, in the "Before sending the
prompt" block that precedes each one.

- The work done and the pending item that asked for it.
- The working agreement (step 1), which already forbids announcing what was not done.

## 2. Prompts

**Routine (goes in the working agreement; applies to every report):**

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- `docs/WORKING_AGREEMENT.md` (step 1), where the routine goes.
- The list of what you asked for in the session, written by you (the items of the request), to
  contrast the report against: the prompt asks it to cover every item one by one, and you have to
  know how many there were.
- Minimum acceptable state: nothing else. This routine is pasted once and rules forever.

> When you report, separate three blocks: VERIFIED (what you tested, with the command and its
> output), BELIEVED (what you think works but did not test, and why not), and BLIND SPOTS (what
> you cannot see from where you are: another environment, real data, the user's browser). Cover
> every item I asked for, one by one, even when the answer is "I did not do it". No claim
> without its proof next to it. Do not say "done": say what is done and how you know it. If
> something went wrong, say it first.
>
> When you report, also report the Annex H groups: what was measured, what
> only warns and why, and which rule is switched off with its reason, who
> authorised it and its review date. Report the two dashboard figures with
> the fingerprint they were computed with (catalogue version, active and
> switched-off rules, frontend adapter, tool versions) and with the account
> of any movement. No figure closes a block: the green is decided rule by
> rule, and a switched-off rule with no written exception turns the whole
> report red.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

What I am asking for, clause by clause: the three blocks, which are the structure that makes a
report honest (what was verified with its proof, what is believed with the reason why it was not
tested, what it cannot see); coverage item by item, so that nothing "gets forgotten"; the proof
next to every claim; the ban on a bare "done"; and the bad news first, because the model tends to
leave it for the end or for never.

**When you say "it is still broken":**

**Before sending the prompt**, you have to have this at hand:

- Your verification, done in the place where you look (the test environment, your browser), with
  what you saw written down: at what URL, what version the system shows if it shows one, what you
  did, what you expected, what happened.
- The version number or the commit the agent said contained the fix, copied from its previous
  report.
- Minimum acceptable state: you can tell it "I look at [URL], I see version [N], I do [this],
  [this] happens". Without that, "it is still broken" is an impression, and the agent is going to
  diagnose an impression.

> Before diagnosing again, compare the version running where I see the problem with the version
> that contains your fix. Tell me both. If they differ, the problem is publication, not code.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

What I am asking for: that faced with an "it is still broken" it does not diagnose again from
scratch but first compares versions. Half of the "still broken" cases are fixes that are in the
repository but not in the place where you are looking [Ref. 45](../REFERENCIAS.md#ref-45).

## 3. Expected result

Every report from the agent with:

- The three blocks (verified / believed / blind spots), even if one of them is empty.
- One line per item requested, with its status.
- For every "verified": the command and the output, or the test and its result, or the number and
  its meter.
- What went wrong, at the beginning and not at the end.

## 4. Completeness check

- Are the three blocks there? If "believed" and "blind spots" are always empty, the agent is not
  being honest: there is always something it did not see.
- Pick a claim from the "verified" block at random: does it have its proof next to it? Can you
  reproduce it?
- Does it cover every item you asked for, or is there one that "got forgotten"?
- Is the bad news at the beginning?
- Did it ever say a bare "done"? That is a breach of the agreement.

## 5. Warning signs

- Ten reports in a row without a single blind spot. Nobody sees everything; the block is empty out
  of habit, not out of truth.
- The "verified" block has phrases like "it should work". That is "believed" in disguise.
- The report is longer than the change. A proportional report says what needs to be said; an
  inflated one is covering something up with volume.
