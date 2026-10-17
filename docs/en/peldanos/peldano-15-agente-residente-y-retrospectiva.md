# Step 15 — The agent inside the system, and the retrospective with numbers (step contract)

**Phase:** operation (once the system is in production) and closure (returns to step 0 for the
next project).
**Form:** two parts: a conversation to define the resident agent's scope, and one long shot for
the retrospective.
**Size:** the resident agent is optional (many systems do not need one; those whose users ask for
support do). The retrospective is mandatory in every project, even if it is one page: without it
the method does not learn.

## What it is for

Two things that close the same cycle. First: the agent stays resident in production, with a
bounded scope, to diagnose, operate and support without the builder having to be there. Second:
the method itself is reviewed with numbers, and what is learned changes the ladder. It prevents the
agent operating without a map of the system, and the method repeating itself unchanged project
after project without learning (the multi-agent crew was killed by a retrospective: 60 dollars and
73 minutes versus 90 minutes).

On the resident agent, the rule that orders everything: **it acts on someone's behalf**. Its
credential is mapped to a responsible person, and everything it does is logged under that person's
name. It is not an anonymous system account: it is an employee with a boss. That defines its scope
(what that person authorised) and its traceability (who answers for what it did).

## 1. Required context

For the resident agent:
- What the agent may do in production and what not: read, diagnose, change configuration,
  execute actions. The owner decides.
- How the agent identifies itself to the system (its own credential, mapped to a responsible
  person).
- Whom it notifies when it finds something it cannot resolve (tickets, email).

For the retrospective:
- The project's incidents, the costs (tokens, quota, the owner's time), the pending items that
  took the most rounds, and the dates.

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

What we are asking for: the map of the system before operating (operating without a map is the
failure this step prevents); the completeness clause in its form: **gaps in the map are declared,
not covered up**; the three scope levels so that the owner chooses one and not a "depends"; and the
credential-on-someone's-behalf rule.

**For the resident agent (closing):**

> Level [X]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the credential (never its
> value), and the procedure to request my approval. Then prove, with a real attempt recorded in
> the log, that something outside your scope is rejected.

What we are asking for: the resident agent's document (without the credential's value, ever), and
the red proof of the scope: a real, logged attempt to do something beyond the level, rejected. It
is step 7 applied to permissions.

**For the retrospective:**

> [The stage / the project] is over. Do the retrospective with numbers, not impressions: what it
> cost (tokens, quota, my time), how many pending items, which ones took the most rounds and why,
> which incidents happened and which step of the ladder each falls into, and which step failed
> or was missing. If you lack the data for any figure (my time, for instance), ask me for it or
> mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder:
> which step is modified, how, and which incident justifies it. Write it to
> `docs/RETROSPECTIVE_[date].md`. Reply in my language.

What we are asking for: sourced numbers (costs, items, rounds, incidents); every incident mapped to
a step, because an incident that falls into none is a missing step; the completeness clause for
the figures it lacks (ask, or mark as estimate); and **at least one concrete proposal to change
the ladder**, because a retrospective that changes nothing was not a retrospective.

## 3. Expected result

- `docs/RESIDENT_AGENT.md`: map of the system, chosen scope, credential mapped to a person,
  approval procedure, and the rejection proof recorded in the log.
- `docs/RETROSPECTIVE_[date].md`: the numbers with their source, the incidents mapped to steps,
  and at least one proposal to change the ladder with its justification.

## 4. Completeness check

- Does the map of the system say what the agent can NOT see? If it does not, it has hidden gaps.
- Did you test (or see in the log) that an action outside the scope is rejected?
- Does the agent's credential act on behalf of an identifiable person?
- Does the retrospective have sourced numbers, or adjectives? ("It cost a lot" is not a number.)
- Does every incident fall into a step? If one falls into none, a step is missing: that is the
  change proposal.
- Is there at least one concrete proposal to change the ladder? If the retrospective changes
  nothing, it was not a retrospective.

## 5. Warning signs

- The resident agent "needs" a higher permission level every week. Check whether what it asks for
  is to solve the system's problems or its own limitations.
- The retrospective says everything went well. Nothing ever goes entirely well; it is written for
  the owner, not for the method.
- Two consecutive projects had the same incident and the ladder did not change between them. Step
  15 is not being closed: the retrospective is written and not applied.
