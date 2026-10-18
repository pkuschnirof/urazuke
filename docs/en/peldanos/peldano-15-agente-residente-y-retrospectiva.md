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

> Level [X]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the credential (never its
> value), and the procedure to request my approval. Then prove, with a real attempt recorded in
> the log, that something outside your scope is rejected.

What I am asking for: the resident agent's document (without the value of the credential, ever),
and the red test of the scope: a real attempt, logged, to do something outside the level,
rejected. It is step 7 applied to permissions.

**For the retrospective:**

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
