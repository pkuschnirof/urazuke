# Step 12 — Fail-closed, locks and zero silent harm (step contract)

**Phase:** operation (designed before the system acts on the world; revised with every new
consequential action).
**Form:** conversation: the agent lists the consequential actions, the owner confirms which get a
lock and of what kind.
**Size:** mandatory as soon as the system does anything irreversible (charge, send, delete,
approve). A read-only system can skip it; the moment it gains its first button that acts on the
world, this step becomes the most important one.

## What it is for

So that the system, on doubt or failure, does NOT act, and says so. It sounds obvious and it is
the opposite of what software does by default, which on doubt carries on. It prevents the double
charge, the automatic approval without a human in the loop, the `git add -A` that uploads a
credential, and deleting the client's data.

The principle has a name, "fail-closed", and comes from physical security: a security door that
stays shut when the power is cut. The opposite, "fail-open", is the door that opens. In software
most things are fail-open by default: if validation fails, the code continues; if the service does
not answer, everything is assumed fine. The method flips the default: **on doubt, no**. And it
applies both to the system and to the agent that operates it.

## 1. Required context

- **Survey of consequential actions**, named generically: what the system does that charges,
  sends, approves, deletes, or notifies someone outside; what happens if it is done twice; what
  happens if it is done wrong; how it is undone. The business knows this; the agent evaluates
  whether the list is complete and asks.
- Which actions the agent itself may take on the system (if it is embedded).

## 2. Prompts

**Opening:**

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock. Reply in my language.

What we are asking for: the comparison between what the business said and what the code does
(that is where the actions nobody remembered appear); the completeness clause in its form for this
step: differences between the two lists are asked about, not resolved; for every action,
reversibility, lock and way back; and the general fail-closed rule written in the prompt, so that
it ends up in the table and in the code.

**Closing:**

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.

What we are asking for: the test per lock **proved red** (without the lock, the action happened;
with the lock, it does not), which is step 7 applied to safety; the final table; and the dry-run
rule for every new automation, which is what lets you see what it would have done before letting
it do it.

## 3. Expected result

- `docs/LOCKS.md`: one row per consequential action: what it does, whether it is reversible, the
  lock, the way back, who approved it and when.
- One test per lock, proved red, verifying that on doubt the action does not happen.
- New automations starting in dry-run mode, with the "would have done" log.
- If the agent is embedded: its permissions written down (what it can read, what it can change,
  what needs approval).

## 4. Completeness check

- Is every action that charges, sends, approves or deletes in the table? Think of one that is not
  and ask.
- Does every lock have its red test? ("Without the lock, the action happened; with the lock, it
  does not.")
- Does every irreversible action have a written way back? If it does not, it needs double
  safety.
- Did the new automations start in dry-run mode? Did you see the "would have done" log before
  enabling them?
- What happens if the embedded agent tries something outside its permissions? Ask it to try and
  to show you the rejection in the log.

## 5. Warning signs

- An automation went from "does not exist" to "runs on its own" without a dry-run period.
- The log has no "action not executed due to doubt" entry at all. Either the system never doubts
  (impossible) or when it doubts it carries on.
- A lock can be bypassed with a "for testing" parameter. That parameter will end up set in
  production.
