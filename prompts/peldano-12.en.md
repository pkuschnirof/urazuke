# Urazuke — step 12 prompts (English, single source)

Generated from `docs/peldanos/peldano-12-fail-closed.md` by `build/prompts.mjs`. Do not edit by hand.

## Prompt 1

We are going to decide which actions of the system need a lock. Read the survey of consequential actions, and go through the code looking for everything that charges, sends, approves, deletes or notifies outwards. Compare the two lists: if the code has actions the survey does not mention, or the other way round, ask me before going on. For every action propose: whether it is reversible, which lock it gets (explicit confirmation, double safety, dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong. General rule: on any doubt or failure along the way, the action is NOT executed and the reason is logged. Present me the table; I confirm lock by lock. Reply in my language.

## Prompt 2

I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves that, under the doubt condition, the action does NOT happen (proved red against the version without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation: dry-run mode first, logging what it would have done, until I enable it.
