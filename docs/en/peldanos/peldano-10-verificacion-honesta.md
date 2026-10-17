# Step 10 — Honest verification and proportional reporting (step contract)

**Phase:** loop (on closing every change).
**Form:** routine; it is the shape every report from the agent must have.
**Size:** mandatory in every project, without exception. It costs nothing and it is what lets the
owner not read code.

## What it is for

If the owner is not going to read code, the agent's report has to be trustworthy. Not optimistic,
not "complete in appearance": trustworthy. This is the genuinely new thing about the method: the
author of the code also manufactures the evidence, and does so with the same confidence in its
voice when it is right and when it is wrong. That is why the evidence has to prove itself, and the
report has to separate what was verified from what is believed.

One has to understand why the model tends to over-report. It is not bad faith: it was trained to
be helpful and complete, and a report that says "I could not verify this" feels less helpful than
one that says "done". So you have to **explicitly ask** for the bad news, the blind spots and what
it did not do. If you do not ask, it will not give them to you, not because it hides them but
because it does not consider them part of the answer.

## 1. Required context

- The work done and the pending item that asked for it.
- The working agreement (step 1), which already forbids announcing what was not done.

## 2. Prompts

**Routine (goes in the working agreement; applies to every report):**

> When you report, separate three blocks: VERIFIED (what you tested, with the command and its
> output), BELIEVED (what you think works but did not test, and why not), and BLIND SPOTS (what
> you cannot see from where you are: another environment, real data, the user's browser). Cover
> every item I asked for, one by one, even when the answer is "I did not do it". No claim
> without its proof next to it. Do not say "done": say what is done and how you know it. If
> something went wrong, say it first. Reply in my language.

What we are asking for, clause by clause: the three blocks, which are the structure that makes a
report honest (what was verified with its proof, what is believed with the reason it was not
tested, what cannot be seen); item-by-item coverage, so that nothing gets "forgotten"; the proof
next to every claim; the ban on a bare "done"; and the bad news first, because the model tends to
leave it for the end or for never.

**When the owner says "it is still broken":**

> Before diagnosing again, compare the version running where I see the problem with the version
> that contains your fix. Tell me both. If they differ, the problem is publication, not code.

What we are asking for: that on "still broken" it does not diagnose from scratch again but first
compares versions. Half of the "still broken" reports are fixes that are in the repository but not
in the place where the owner is looking.

## 3. Expected result

Every report from the agent with:

- The three blocks (verified / believed / blind spots), even if one is empty.
- One line per item requested, with its status.
- For every "verified": the command and its output, or the test and its result, or the number and
  its meter.
- What went wrong, at the beginning and not at the end.

## 4. Completeness check

- Are the three blocks there? If "believed" and "blind spots" are always empty, the agent is not
  being honest: there is always something it did not see.
- Pick one claim from the "verified" block at random: is its proof next to it? Can you reproduce
  it?
- Does it cover every item you asked for, or did one "get forgotten"?
- Is the bad news at the beginning?
- Did it ever say a bare "done"? That is a violation of the agreement.

## 5. Warning signs

- Ten reports in a row without a single blind spot. Nobody sees everything; the block is empty out
  of habit, not truth.
- The "verified" block contains phrases like "it should work". That is "believed" in disguise.
- The report is longer than the change. A proportional report says what needs saying; an inflated
  one is covering something with volume.
