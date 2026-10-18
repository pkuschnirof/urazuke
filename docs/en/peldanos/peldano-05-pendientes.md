# Step 5 — The plan is the pending items: the detailed specification lives in each one (step contract)

**Stretch:** loop.
**When:** the register is created when the first functional block opens, as soon as the start-up
ends; every new block starts by turning the client's request into specified pending items; the
routine is used in every session throughout the project; the documentation of the finished item
is written when it is closed, in the same session.
**Form:** one shot when opening each block; afterwards, a routine of every session.
**Size:** mandatory in every project. It is the step that makes all the others traceable: without
numbered, specified pending items there is nowhere to hang either the specification or the
evidence.

## What it is for

Have a single work queue, ordered and gated, that is the truth of the project. There is no "plan"
on one side and "tasks" on the other: the list of pending items IS the plan. It prevents the long
specification that gets overtaken in two weeks and becomes obsolete
[Ref. 17](../REFERENCIAS.md#ref-17), and the work nobody knows why it was done
[Ref. 7](../REFERENCIAS.md#ref-7).

But there is more, and it is what distinguishes this step from any old task list. In the classic
method there was a requirements specification document, a long one, that described everything the
system had to do and that aged before it was finished. Here that document is decomposed: **the
detailed specification lives in each pending item**. A well-written pending item carries: the node
of the semantic tree it hangs from; the user story or use case that originates it, in the
client's words; the detailed description; the applicable business rules, with their decision and
date; the data in and out; the screens affected, with the prototype if there is one; the edge
cases and exceptions; the acceptance criteria in the form "given, when, then"; and how it is
verified. The sum of the pending items is the specification of the system, and traceability
(requirement → pending item → test → commit) is not a separate matrix: it is the pending item
itself.

And the third thing, which closes the circle: **closed pending items are documentation**. When a
pending item is closed, it is neither deleted nor filed empty: it stays with its specification,
the decision that originated it, the evidence it was closed with (the red and green counts, the
screenshot, the measured number), the commit and the date. The queue of closed pending items is
the functional history of the system: what was built, why, when and how it was tested. From there
come the changelog, the new sections of the manual, and the answer to "why does the system do
this?" six months later.

## 1. Required context

- The client's request for the block, in prose, just as they would say it, with its ambiguities.
  If you wrote use cases or user stories during intake, better: they are the natural unit of a
  block.
- The semantic tree (step 2), to hang each pending item from its node.
- The audits and the findings of human testing, if there have been any.
- `PROJECT.md` and `docs/STATUS.md`.

## 2. Prompts

**To open a block:**

> We are going to turn everything that must be done in this block into numbered pending items,
> each one carrying its full specification. Read `PROJECT.md`, `docs/SEMANTIC_TREE.md`, the
> client's request for this block, and whatever is in `docs/STATUS.md`. If the request is
> ambiguous on any point such that you cannot write a verifiable pending item for it, ask me; do
> not resolve it by assuming. Then create or extend `docs/PENDING.md` with one item per thing to
> do, each with: number (PND-001 onwards); one-line title; the node of the semantic tree it hangs
> from; the user story or use case that originates it, in the client's words; the detailed
> description; the business rules that apply, each with its decision and date, or marked as
> "rule missing, asked"; the data in and out; the screens affected; the edge cases and
> exceptions; the acceptance criteria in the form "given, when, then"; how it will be verified
> as done; and status. If a node the item needs does not exist in the tree, propose it and mark
> it. Order the items by the priority I gave you; if I gave none, propose an order and tell me
> why. Reply in my language.

What I am asking for: that it turn the request into verifiable items and that it **ask when the
request is not enough to write a verifiable one** (ambiguity is resolved by asking, not by
choosing); the complete specification of each pending item, field by field, which is classic
requirements engineering decomposed into small units; the node of the tree it hangs from, which is
what lets you spot an out-of-scope pending item; the business rules with their decision or marked
as missing, which is the hook into step 6; the acceptance criteria in the classic form, which are
the script of the end-to-end test of step 7; and a proposed order with its reason, so that you
confirm it or change it.

**Routine of every session (goes in the working agreement):**

> Before touching any code, open `docs/PENDING.md`, tell me which item you are taking and why,
> and re-read its specification. Every commit cites its pending item. A pending item is closed
> with written evidence (the test counts red and green, the screenshot, the measured number),
> never with "done". When you close it, keep it in the register with its full specification and
> add: the evidence, the commit, the date, and any decision that was taken along the way; that
> record is the documentation of what was built. If along the way you see something that is not
> on the list, add it as a new pending item with its specification; do not do it.

What I am asking for: the discipline of every session: announce what is being taken and reread
the specification (the agent starts without memory, and the specification is its memory of the
pending item), cite the pending item in every commit, close with evidence, **document the finished
item** in the same register, and **log instead of doing** whatever shows up outside the list. That
last clause is the one that protects the exact scope when the model "sees something more".

## 3. Expected result

`docs/PENDING.md` (or whatever tool your project uses) with, per pending item:

- Number, title, status (open / in progress / closed), opening and closing date.
- The node of the semantic tree.
- The story or use case of origin, in the client's words.
- The detailed specification: description, business rules with decision and date, data, screens,
  edge cases, acceptance criteria, how it is verified.
- On closing: the evidence, the commit, the date, the decisions taken along the way.

And the routine in the working agreement.

## 4. Completeness check

- Read the specification of a random pending item as if you were the client: does it describe
  what you asked for, in your original words? Are the acceptance criteria the ones you would use
  to say "that is right"? Is there an edge case you know of that is not there?
- Does each pending item hang from a node of the tree? Is any hanging from a node you do not
  recognise?
- Does each pending item say how it is verified? A pending item without verification cannot be
  closed.
- Are there business rules marked "missing, asked" that nobody asked you about?
- Are there "closed" pending items without evidence or commit? If there are, reopen them. Do the
  closed ones keep their specification and their closing documentation?
- Take three commits at random: do they cite their pending item?
- Did something show up in the code that has no pending item? That is where the agent stepped out
  of scope.

## 5. Warning signs

- A pending item has been "in progress" for more than three sessions. Either it is three pending
  items, or it is stuck on a decision nobody made (step 6).
- There are more pending items closed in a day than commits that day. They are being closed
  without evidence.
- The specifications are one line long. The agent wrote them to comply, not to build on them; it
  is going to invent what is missing at build time.
- The list has more than fifty open pending items. That is not a plan, it is an inventory of
  anxieties: prioritise and archive.
- Someone asks why the system does something and the answer is in no closed pending item. The
  documentation of what was done is not being written.
