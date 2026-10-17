# Step 6 — Decisions are written next to the code (step contract)

**Phase:** loop (whenever a business rule or a structural decision appears).
**Form:** short conversation: the agent detects that there is a decision, asks, and writes it
down.
**Size:** mandatory in every project. In a small one the register can be a ten-row table; what
matters is that business rules have an owner.

## What it is for

So that every business rule and every structural decision has an owner, a date and a place. If
not, in six weeks nobody knows whether "approved plus balance goes back to the queue" was a client
decision or an agent's idea. And it prevents the worst: the agent inventing domain rules because
they seemed reasonable.

This has a consequence worth saying out loud: when the model runs into a gap in the rules, **it
fills it**. It does not stop; it completes with what seems most likely, and it does so with the same
naturalness with which it writes everything else. That is why the routine of this step is not
"write down the decisions" but "stop and ask when one is missing". The second is the hard part, and
the one that must be demanded in the agreement.

## 1. Required context

- The conversation with the owner: it is the only context. The agent cannot decide business
  rules.
- An agreed place where decisions are written: the commit message, the pending item's document, or
  a register `docs/DECISIONS.md`.

## 2. Prompts

**Routine (goes in the working agreement):**

> Whenever implementing something requires a business rule that is not written down, or you
> must choose between two approaches that change what the user sees, stop and ask me, in prose,
> with your recommendation and the alternative. Do not implement the one you prefer. When I
> decide, write the decision with my name and the date in the commit message and in
> `docs/DECISIONS.md`, with the exact words I used. If I do not answer and you must move on,
> implement the most reversible option and mark it "decision by omission, pending confirmation",
> so that I can review it.

What we are asking for: to **stop** at an unwritten rule or a visible fork; to ask with a
recommendation and an alternative (so that the owner can decide in ten seconds, not ten minutes);
to record the decision in the owner's exact words, not an "improved" paraphrase; and, for when the
owner does not answer, the most reversible option marked "by omission", which is what allows
moving on without the decision disappearing.

**Closing (each decision):**

> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.

What we are asking for: the minimum format of a decision: the rule verbatim, who, when. Three
things; without any of the three it is not a recorded decision.

## 3. Expected result

- `docs/DECISIONS.md`: one line or paragraph per decision, with date, who decided, the verbatim
  sentence, the item or commit where it was applied, and whether it was "by omission".
- In every commit that implements a business rule: the originating sentence ("rule from the
  owner: approved + balance = back to the queue", "owner decision 2026-08-10").

## 4. Completeness check

- Open three commits that touch business rules: does each cite who decided and when?
- Are there unconfirmed "by omission" decisions? Confirm or revert them; do not leave them.
- Is there any rule in the system you do not recognise as yours? If so, the agent invented it: it
  is a failure of the step, written up as a pending item and reviewed.
- Are the sentences verbatim or "improved" by the agent? They have to be yours.

## 5. Warning signs

- A week of work went by and the decision register did not grow. Either the work was purely
  mechanical (rare) or the agent decided alone.
- All recorded decisions are written in the same polished style. They are the agent's paraphrases,
  not your words.
- A user of the system asks "why does it do this?" and nobody can find the decision.
