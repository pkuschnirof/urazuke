# Step 5 — The plan is the pending items (step contract)

**Phase:** loop (used with every change, throughout the project).
**Form:** one shot to create it; then a routine every session.
**Size:** mandatory in every project. It is the step that makes all the others traceable: without
numbered pending items there is nowhere to hang the evidence.

## What it is for

So that there is a single work queue, ordered and gated, which is the truth of the project. There
is no "plan" on one side and "tasks" on the other: the pending-items list IS the plan. It prevents
the specification that is overtaken in two weeks and goes stale, and the work nobody knows the
reason for.

A well-written pending item has three things that an item on a to-do list usually lacks: where it
comes from (the decision or request that originated it), how it is verified as done, and the
evidence it was closed with. The first keeps the work from losing its reason; the second keeps it
from being closed with "done"; the third is what the owner looks at instead of looking at the code.

## 1. Required context

- The specification or the client's initial request, however incomplete.
- The audits, if there have been any.
- `PROJECT.md` and `docs/STATUS.md`.

## 2. Prompts

**To create the register:**

> We are going to turn everything that must be done into numbered pending items. Read
> `PROJECT.md`, the client's request and whatever is in `docs/STATUS.md`. If the request is
> ambiguous on any point such that you cannot write a verifiable pending item for it, ask me;
> do not resolve it by assuming. Create `docs/PENDING.md` with one item per thing to do: number
> (PND-001 onwards), one-line title, what is requested, which decision originates it (or
> "client request, date"), how it will be verified as done, and status. Order them by the
> priority I gave you; if I gave none, propose an order and tell me why. Reply in my language.

What we are asking for: to turn the request into verifiable items and to **ask when the request
is not enough to write a verifiable one** (ambiguity is resolved by asking, not by choosing); the
fields of each item, in particular "how it is verified", which is what later allows closing it with
evidence; and a proposed order with its reason, for the owner to confirm or change.

**Routine for every session (goes in the working agreement or in `PROJECT.md`):**

> Before touching any code, open `docs/PENDING.md`, tell me which item you are taking and why.
> Every commit cites its pending item. A pending item is closed with written evidence (the test,
> the screenshot, the number), never with "done". If along the way you see something that is not
> on the list, add it as a new pending item; do not do it.

What we are asking for: the discipline of every session: announce what is taken, cite the item in
every commit, close with evidence, and **write down rather than do** whatever shows up outside the
list. That last clause is what protects exact scope when the model "sees something else".

## 3. Expected result

`docs/PENDING.md` (or whatever tool the project uses) with, per item:

- Number, title, status (open / in progress / closed), opening and closing dates.
- What is requested, in two or three sentences.
- Origin: the decision or the request, with date.
- How it is verified as done: the test, the screen, the number.
- On closing: the evidence and the commit.

And the routine in the agreement or in `PROJECT.md`.

## 4. Completeness check

- Does every item say how it is verified? An item without verification cannot be closed.
- Are there "closed" items without evidence or commit? If so, reopen them.
- Take three commits at random: do they cite their item?
- Did something appear in the code that has no item? That is where the agent left the scope.
- Did the agent ask you about the ambiguous points of the request, or resolve them alone?

## 5. Warning signs

- An item has been "in progress" for more than three sessions. Either it is three items, or it is
  blocked by a decision nobody made (step 6).
- More items were closed in a day than commits were made that day. They are being closed without
  evidence.
- The list has more than fifty open items. It is not a plan, it is an inventory of anxieties:
  prioritise and archive.
