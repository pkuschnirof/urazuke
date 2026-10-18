# Step 15 — The agent inside the system, and the retrospective with numbers (step contract)

**Stretch:** operation and closure.
**When:** the resident agent, on entering operation, after the first deployment to production.
The retrospective, at the close of every stage and of the project; it returns to step 0 for the
next project.
**Form:** two parts: a conversation to define the resident agent's scope, and one long shot for
the retrospective.
**Size:** the resident agent is optional (many systems do not need one; those with users who ask
for support do). The retrospective is mandatory in every project, even if it is one page long:
without it the method does not learn.

## What it is for

Two things that close the same cycle. First: leave the agent resident in production, with a
bounded scope, to diagnose, operate and give support without you having to be there
[Ref. 13](../REFERENCIAS.md#ref-13). Second: review the method itself with numbers, and let what is
learned change the ladder. It avoids the agent that operates without a map of the system, and the
method that repeats itself identically project after project without learning. The retrospective
with numbers that led me to eliminate a whole team of agents is the model for the second part
[Ref. 6](../REFERENCIAS.md#ref-6).

On the resident agent, the rule that orders everything: **it acts in someone's name**. Its
credential is mapped to a responsible person, and everything it does is logged under that
person's name. It is not an anonymous system account: it is an employee with a boss. That defines
its scope (what that person authorised it to do) and its traceability (who answers for what it
did).

## 1. Required context

What follows is the generic list. The concrete files you have to have made before each prompt,
with their content and their minimum state, are in section 2, in the "Before sending the
prompt" block that precedes each one.

For the resident agent:
- What the agent can and cannot do in production: read, diagnose, change configuration, execute
  actions. You decide.
- How the agent identifies itself to the system (a credential of its own, mapped to a responsible
  person).
- Whom it notifies when it finds something it cannot resolve (ticket, email).

For the retrospective:
- The project's incidents, the costs (tokens, quota, your time), the pending items that took the
  most rounds, and the dates.

## 2. Prompts

**For the resident agent (opening):**

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- The decision to leave a resident agent, taken with the owner and written down: what for
  (support, diagnosis) and with what initial limits.
- A credential of its own for the agent in production, created by you, mapped to a responsible
  person with a name, with the minimum scope (read-only, to begin with); the value, outside the
  chat and outside the repository.
- `docs/LOCKS.md` (step 12) and `docs/DEPLOYMENT.md` (step 13), up to date: the prompt asks it to
  read the first one.
- Whom the agent notifies when it finds something it cannot resolve: a channel (a ticket, an
  email) decided by you.
- Minimum acceptable state: the credential exists, it has a human owner, and it is read-only.

> We are going to leave you resident in production. First, build the map of the system you will
> need in order to operate it: modules, environments, where each configuration lives, which
> actions are consequential (read `docs/LOCKS.md`), whom to notify. If there are parts of the
> system you cannot see from where you are, tell me; the map must not have hidden gaps. Then
> propose your scope in three levels: read-only and diagnosis; configuration changes with my
> approval; consequential actions behind locks. I choose the level. Your credential acts as the
> person who created it: everything you do is logged under that person's name. Reply in my
> language.

What I am asking for: the map of the system before operating (operating without a map is the
failure this step avoids); the completeness clause in its form: **the gaps in the map are
declared, not hidden**; the three levels of scope so that you choose one and not an "it depends";
and the rule of the credential in a person's name.

**For the resident agent (closing):**

**Before sending the prompt**, you have to have this at hand:

- The map and the three levels the agent proposed, read by you, and your choice of level (to
  begin with, always the first one).
- A concrete action outside the chosen scope, thought up by you, so that the agent attempts it
  and you see the rejection in the log (with level 1, for example: changing a configuration).
- Minimum acceptable state: you chose the level and you know which attempt has to fail.

> Level [X]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the credential (never its
> value), and the procedure to request my approval. Then prove, with a real attempt recorded in
> the log, that something outside your scope is rejected.

What I am asking for: the resident agent's document (without the value of the credential, ever),
and the red test of the scope: a real attempt, logged, to do something outside the level,
rejected. It is step 7 applied to permissions.

**For the retrospective:**

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- The numbers only you have, gathered beforehand: how many hours you put in (from your calendar,
  not from memory), how much you spent on the AI tool (the invoice or the usage panel), how much
  continuous integration quota was used, and the start and end dates of the stage. Write them in
  `docs/RETROSPECTIVE_INPUTS.md`, or give them in the chat when it asks for them.
- The list of the incidents of the stage, as you remember them, with an approximate date, to
  contrast with what the agent pulls out of the pending items and the commits. What you remember
  and the agent does not find is a documentation gap, and it is worth noting down.
- `docs/PENDING.md` with the closed items documented (step 5) and `docs/DECISIONS.md` (step 6),
  which are the source of the numbers.
- Minimum acceptable state: the hours and the money are written down with their source. Without
  that, the retrospective is done with adjectives.

> [The stage / the project] is over. Do the retrospective with numbers, not impressions: what it
> cost (tokens, quota, my time), how many pending items, which ones took the most rounds and why,
> which incidents happened and which step of the ladder each falls into, and which step failed
> or was missing. If you lack the data for any figure (my time, for instance), ask me for it or
> mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder:
> which step is modified, how, and which incident justifies it. Write it to
> `docs/RETROSPECTIVE_[date].md`. Reply in my language.

What I am asking for: numbers with their source (costs, pending items, rounds, incidents); every
incident mapped to a step, because an incident that falls into none is a step that is missing;
the completeness clause for the numbers it does not have (ask or mark as an estimate); and **at
least one concrete proposal to change the ladder**, because a retrospective that changes nothing
was not a retrospective.

## 3. Expected result

- `docs/RESIDENT_AGENT.md`: map of the system, chosen scope, credential mapped to a person,
  approval procedure, and the rejection test recorded in the log.
- `docs/RETROSPECTIVE_[date].md`: the numbers with their source, the incidents mapped to steps,
  and at least one proposal to change the ladder with its justification.

## 4. Completeness check

- Does the map of the system say what the agent can NOT see? If it does not say so, it has hidden
  gaps.
- Did you test (or see in the log) that an action outside the scope is rejected?
- Does the agent's credential act in the name of an identifiable person?
- Does the retrospective have numbers with their source, or adjectives? ("It cost a lot" is not a
  number.)
- Does every incident fall into a step? If one falls into none, a step is missing: that is the
  change proposal.
- Is there at least one concrete proposal to change the ladder? If the retrospective changes
  nothing, it was not a retrospective.

## 5. Warning signs

- The resident agent "needs" a higher level of permissions every week. Check whether what it asks
  for is to solve the system's problems or its own limits.
- The retrospective says everything went well. Everything never goes well; it was written for you,
  not for the method.
- Two projects in a row had the same incident and the ladder did not change between one and the
  other. Step 15 is not being closed: the retrospective gets written and not applied.
