# Step 6 — Decisions are written next to the code (step contract)

**Stretch:** loop.
**When:** in every session of the loop, every time the agent runs into an unwritten business rule
or a fork that changes what the user sees. There are usually two or three per block. Also during
start-up (steps 0 and 3) and at go-live (12 and 13).
**Form:** short conversation: the agent detects that there is a decision, asks, and leaves it
written down.
**Size:** mandatory in every project. In a small one the register can be a ten-row table; what
matters is that the business rules have an owner.

## What it is for

Make every business rule and every structural decision have an owner, a date and a place. If not,
in six weeks nobody knows whether "approved plus balance goes back to the queue" was a decision of
the client or an idea of the agent. And avoid the worst: the agent inventing domain rules because
they seemed reasonable.

This has a consequence I want to say out loud: the model, when it runs into a gap in the rules,
**fills it**. It does not stop; it completes with what seems most likely to it, and it does so with
the same naturalness with which it writes everything else. That is why the routine of this step is
not "write down the decisions" but "stop and ask when one is missing". The second is the hard
part, and it is what has to be demanded in the agreement. The practice of leaving the rule written
in the commit, with my words and the date, I imposed at the Health Fund
[Ref. 29](../REFERENCIAS.md#ref-29), and the practice of freezing decisions before building comes
from my tool [Ref. 5](../REFERENCIAS.md#ref-5).

## 1. Required context

What follows is the generic list. The concrete files you have to have made before each prompt,
with their content and their minimum state, are in section 2, in the "Before sending the
prompt" block that precedes each one.

- The conversation with the owner: it is the only context. The agent cannot decide business
  rules.
- An agreed place where decisions are written: the commit message, the pending item's
  specification, and a register `docs/DECISIONS.md`.

## 2. Prompts

**Routine (goes in the working agreement):**

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- `docs/WORKING_AGREEMENT.md` (step 1), where the routine goes.
- `docs/DECISIONS.md`, created even if it is empty, with the format in the header: the date, who
  decided, the literal words, the pending item that needed it. You create it, or you ask the
  agent for it in the same session; what matters is that the agreed place exists before the first
  decision.
- You, available. This routine only works if, when the agent stops and asks, somebody answers in
  hours and not in weeks. If the domain owner is another person, agree with them on the channel
  and the response time before pasting the prompt.
- Minimum acceptable state: the register exists and there is somebody who decides.

> Whenever implementing something requires a business rule that is not written down, or you
> must choose between two approaches that change what the user sees, stop and ask me, in prose,
> with your recommendation and the alternative. Do not implement the one you prefer. When I
> decide, write the decision with my name and the date in the commit message, in the pending
> item's specification and in `docs/DECISIONS.md`, with the exact words I used. If I do not
> answer and you must move on, implement the most reversible option and mark it "decision by
> omission, pending confirmation", so that I can review it.

What I am asking for: that it **stop** at an unwritten rule or a visible fork; that it ask with a
recommendation and an alternative (so that you decide in ten seconds, not ten minutes); that it
record the decision in your exact words in the three places (the commit, the pending item, the
register), not in an "improved" paraphrase; and, for when you do not answer, the most reversible
option marked "by omission", which is what allows moving on without the decision disappearing.

**Closing (each decision):**

**Before sending the prompt**, you have to have this at hand:

- The agent's question, read, with its recommendation and its alternative.
- Your decision, consulted with the domain owner if it is not you, drafted in one sentence with
  your exact words, the ones you want to stay forever (they are going to be in the commit, in the
  pending item and in the register), and the date.
- Minimum acceptable state: the sentence is written before pasting the prompt; it is not
  improvised in the chat. A rule paraphrased afterwards is a different rule.

> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.

What I am asking for: the minimum format of a decision: the exact rule, who, when. Three things;
without any one of the three it is not a recorded decision.

## 3. Expected result

- `docs/DECISIONS.md`: one line or one paragraph per decision, with date, who decided, the exact
  wording, the pending item or commit where it was applied, and whether it was "by omission".
- In the specification of each affected pending item: the rule with its decision and date.
- In every commit that implements a business rule: the sentence of origin.

## 4. Completeness check

- Open three commits that touch business rules: does each cite who decided and when?
- Are there "by omission" decisions still unconfirmed? Confirm them or revert them; do not leave
  them.
- Is there any rule in the system you do not recognise as yours? If there is, the agent invented
  it: it is a failure of the step, it is written up as a pending item and reviewed.
- Are the sentences exact or "improved" by the agent? They have to be yours.

## 5. Warning signs

- A week of work went by and the decisions register did not grow. Either the work was purely
  mechanical (rare) or the agent decided on its own.
- The recorded decisions are all written in the same polished style. They are paraphrases by the
  agent, not your words.
- A user of the system asks "why does it do this?" and nobody can find the decision.
