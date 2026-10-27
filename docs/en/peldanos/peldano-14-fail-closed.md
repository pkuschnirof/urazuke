# Step 14 — Fail-closed, locks and zero silent harm (step contract)

**Stretch:** going live.
**When:** in the go-live stretch, BEFORE building any functionality that charges, sends, approves
or deletes; revisited with every new consequential action. New automations start in dry-run mode
and are enabled after watching their log for a few days.
**Form:** conversation: the agent lists the consequential actions, you confirm which ones get a
lock and of what kind.
**Size:** mandatory as soon as the system does anything irreversible (charging, sending, deleting,
approving). A read-only system can skip it; the moment it gains its first button that acts on the
world, this step becomes the most important one.

## What it is for

Make the system, when in doubt or on failure, NOT act, and say so. It sounds obvious and it is
the opposite of what software does by default, which when in doubt carries on. It avoids the
double charge, the automatic approval that never went past a human, the `git add -A` that uploads
a credential, and the deletion of the client's data. The locks I put in at the Health Fund are
the model: the panic button with a double safety, the auto-approver in dry-run mode, the watchman
with guards [Ref. 28](../REFERENCIAS.md#ref-28); and the reflex that a failure leaves a row without
its button instead of breaking the whole listing [Ref. 25](../REFERENCIAS.md#ref-25).

The principle has a name, "fail-closed", and it comes from physical security: a security door that
stays shut when the power goes out. The opposite, "fail-open", is the door that opens. In software
most things are fail-open by default: if the validation fails, the code carries on; if the service
does not respond, everything is assumed to be fine. The method inverts the default: **when in
doubt, no**. And it applies both to the system and to the agent that operates it.

## 1. Required context

What follows is the generic list. The concrete files you have to have made before each prompt,
with their content and their minimum state, are in section 2, in the "Before sending the
prompt" block that precedes each one.

- **Survey of consequential actions**, named generically: what the system does that charges,
  sends, approves, deletes, or notifies someone outside; what happens if it is done twice; what
  happens if it is done wrong; how it is undone. The business knows it; the agent evaluates
  whether the list is complete and asks. The semantic tree helps: every consequential process is
  there.
- Which actions the agent itself can take on the system (if it is embedded).

## 2. Prompts

**Opening:**

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`: the survey of consequential actions, written with the
  domain owner. What the system does or is going to do that charges, sends, approves, deletes, or
  notifies somebody outside; and for each action: what happens if it is done twice, what happens
  if it is done wrong, how it is undone, and who should be able to do it. The processes of the
  semantic tree give you the starting list: walk them one by one. The prompt names it "the survey
  of consequential actions", with no path: save it under this name or tell it in the chat where
  it is.
- If the agent is going to be embedded or resident: which actions it can perform itself on the
  system, in a separate section of the same survey.
- `docs/SEMANTIC_TREE.md`, up to date.
- Minimum acceptable state: every process of the tree that acts on the world is in the list with
  its "what happens if it is done twice".

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

What I am asking for: the cross-check between what the business said and what the code does (that
is where the actions nobody remembered show up); the completeness clause in its form for this
step: the differences between the two lists are asked about, not resolved; for every action,
reversibility, lock and way back; and the general fail-closed rule written into the prompt, so
that it ends up in the table and in the code.

**Closing:**

**Before sending the prompt**, you have to have this at hand:

- The table the agent presented, read lock by lock with the owner; for every row, your
  confirmation or your change, written out for the [list], [X] and [Y] gaps of the prompt.
- Minimum acceptable state: there is no row without a verdict. An unconfirmed lock is a lock that
  is not going to be implemented.

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

What I am asking for: the test per lock **proved red** (without the lock, the action happened;
with the lock, it does not), which is step 8 applied to safety; the final table; and the dry-run
rule for every new automation, which is what lets you see what it would have done before letting
it do it.

## 3. Expected result

- `docs/LOCKS.md`: one row per consequential action: what it does, whether it is reversible, the
  lock, the way back, who approved it and when.
- One test per lock, proved red, which verifies that when in doubt the action does not happen.
- New automations starting in dry-run mode, with the log of "would have done".
- If the agent is embedded: its permissions written down (what it can read, what it can change,
  what requires approval).

## 4. Completeness check

- Is every action that charges, sends, approves or deletes in the table? Think of one that is not
  there and ask.
- Does every lock have its red test? ("Without the lock, the action happened; with the lock, it
  does not.")
- Does every irreversible action have a written way back? If it does not, it needs a double
  safety.
- Did the new automations start in dry-run mode? Did you see the "would have done" log before
  enabling them?
- What happens if the embedded agent tries something outside its permissions? Ask it to try and
  show you the rejection in the log.

## 5. Warning signs

- An automation went from "does not exist" to "runs on its own" without a dry-run period.
- The log has no entry at all of "action not executed due to doubt". Either the system never
  doubts (impossible) or when it doubts it carries on.
- A lock can be skipped with a parameter "for testing". That parameter will end up set in
  production.
