# Urazuke — teamwork: several developers, each with their own agent, on one shared branch

Author: Pablo Kuschniroff, assisted by Claude Code. Version 1, 19 October 2026. This document
complements the [main document](ESCALERA_METODOLOGICA.md): it says how the method is applied when
there is not one human with one agent, but several developers, each with their own, working on
the same repository and on the same branch. The odd words are in the glossary of the main
document. Public repository:
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## The problem, said plainly

The method is written in the singular: the owner, the agent, the pending item. I built my three
systems that way, one human and one model. But a team that adopts the method does not have one
human: it has three, or five, each with their agent session open on the same code, and in most
small teams, on the **same branch**, because the forest of long-lived branches is the surest way
for two weeks of work to be integrated on a Friday with everybody shouting. Working on a shared
branch can be done well, and the industry has done it for years with known rules (small commits
integrated several times a day, continuous integration as the referee, half-finished features
hidden behind a switch). What changes with the method is that those rules are no longer kept by
people who read each other's code: they are kept by agents that do not see one another, and so
they have to be written where every agent reads them.

What follows are the rules, and then the prompts. I am not adding steps: the twenty-four are the
same. I am adding what each step needs so that several people can climb it at once.

**If you are a beginner.** A *branch* is a copy of the code where work is done; the *shared
branch* (usually called *main* or *trunk*) is the only one that matters, the one that gets
deployed. To *integrate* is to put your change into that branch; a *conflict* is when two people
changed the same line and the tool does not know which one wins. A *feature switch* is a
configuration key that leaves a feature turned off even though the code is already there, so that
half-finished work can be integrated without the user seeing it. And to *claim* a pending item is
to write your name on it so that nobody else takes it.

## The seven rules of the shared branch

1. **The pending item is the unit of ownership.** Nobody works without a pending item claimed in
   their name in `docs/PENDING.md`, and a pending item has one owner at a time. Two people do not
   take two pending items that touch the same module at the same time; if it cannot be avoided,
   they tell each other and the second one waits for the first to integrate. The agent, when the
   session starts, reads the pending items claimed by others and does not touch them.
2. **Integrate small and often.** A pending item is split into changes that are integrated into
   the shared branch several times a day, never at the end of the week. Before every integration:
   pull in what the others did, run the whole suite, and only then push. A change that cannot be
   integrated in a day is a badly cut pending item: it gets cut again.
3. **Continuous integration is the referee, not the human.** Nobody integrates with the pipeline
   red, and nobody argues about whether a change "breaks" something: the suite says so, the
   quality gate (9) says so, and the characterization suite says so if it is a legacy system.
   Whoever turns the shared branch red fixes it before anything else, or reverts their change.
4. **Whatever is half-finished goes behind a switch.** A feature that takes more than a day gets
   integrated anyway, turned off by configuration, with its switch noted in the pending item, and
   it is turned on when the pending item is closed with evidence. That way nobody waits for
   anybody in order to integrate.
5. **Lists have a single owner, and the map says which.** The producer/consumer map (11) is the
   team's conflict detector: before touching a contract between parts, you look at who consumes
   it, and the consumers are updated in the same change, even if they belong to somebody else.
   The semantic tree (2) is the shared map, and whoever adds a node changes it, in the same
   commit.
6. **Decisions are written with a name, and they hold for everybody.** A business rule decided by
   one developer with the owner goes into `docs/DECISIONS.md` straight away, because the agent
   next to them is going to need it that same afternoon and is not going to guess it. The working
   agreement (1) is a single one for the team; nobody has private rules the others do not read.
7. **Evidence is reviewed, not code, and somebody else reviews it.** A pending item is closed by
   its owner with the full routine (8, 9, 10, 12), and somebody else on the team declares it
   closed by reading the report: the red, the green, the regression, the quality, the manual
   case. Nobody closes their own pending items, and nobody reads the code to close them.

And one rule about the agents, which is the one that really changes compared with a team without
models: **every agent works in the name of a person**, with its own session context, and the only
thing they share is what is written in the repository. There is no common memory outside the
files. That is why the living state (`docs/STATUS.md`), the pending items and the decisions get
written at the moment, not "at the end of the day": the colleague's agent is going to read them
in five minutes.

## How the steps are shared out in a team

| Step | Who climbs it | What changes in a team |
|---|---|---|
| 0 to 4, start-up | One single person, the one who leads, with the owner. | It is done once and before the rest come in. The skeleton (4) includes the integration pipeline that is going to be the referee, and the gates (`docs/GATES.md`) include the ones of the shared branch. |
| 1, agreement | The lead writes it; everybody signs it. | The seven rules above are added as routines. One single file for the team. |
| 5, pending items | The lead opens the block with the owner; each person claims. | The pending item carries a "claimed by" field and a "modules it touches" field. Two pending items that touch the same module are not claimed at the same time. |
| 6, decisions | Whoever needs it, with the owner. | It is written at the moment, not at the end of the day. |
| 7 to 12, the loop | Each person, with their agent, on their pending item. | Before integrating: pull, run everything, push. Whatever is half-finished, behind a switch. The report (12) is read by somebody else. |
| 9, quality | One single configuration for everybody. | Nobody has private exceptions to the linter. |
| 10, manual test cases | The owner of the pending item writes them; somebody else executes them. | Whoever did not build the feature is the one who tests it best. |
| 11, symmetry | Whoever touches a contract updates the consumers, no matter whose they are. | The map is the conflict detector. |
| 13, audit | A session different from all the ones that built. | In a team it is easier: the auditor is the one who did not touch that module. |
| 14 to 20, going live | The lead coordinates; each step has somebody responsible. | One person promotes to production; the others do not. |
| 21 to 23, operation | One person responsible for the monitoring per cycle, rotating. | The cyclic report is read by the whole team; the pending items that come out of it are claimed like any other. |

## The prompts

**Before sending the prompt**, this has to exist, and you (or the team lead) make it, not the
agent:

- `docs/WORKING_AGREEMENT.md` (step 1), closed, a single one for the team, with the list of the
  members and their usernames in the repository.
- `docs/PENDING.md` (step 5) with the "claimed by" and "modules it touches" fields in every
  pending item, even if they are empty.
- The team's decision about the feature switch: where it is declared (the server configuration, a
  file) and how it is named, written in `PROJECT.md`.
- The integration pipeline (steps 4 and 15) with the suite and the quality gate (9) as the
  condition for merging into the shared branch, configured on the repository platform (nobody can
  push with the pipeline red).
- Minimum acceptable state: there is a single agreement, the pending items have the two fields,
  and the platform rejects a push with the pipeline red.

**Routine of the shared branch (goes in the working agreement):**

> We work as a team on one shared branch, each person with their own agent session, and the only
> shared memory is what is written in the repository. Rules: (1) At the start of every session,
> read `docs/STATUS.md`, `docs/DECISIONS.md` and `docs/PENDING.md`; never touch a pending item
> claimed by someone else, and never take one that touches a module another claimed item touches.
> (2) Before every integration into the shared branch: pull the others' changes, run the full
> suite and the quality gate, and only then push; integrate several times a day, never at the end
> of the week. (3) Never push with the pipeline red; whoever turns it red fixes it before anything
> else or reverts. (4) Anything that cannot be finished and integrated today goes behind a feature
> switch, off by default, noted in the pending item. (5) Before touching a contract between parts
> (a service, a table, a list of values), look up its consumers in `docs/PRODUCER_CONSUMER_MAP.md`
> and update them in the same change, whoever owns them. (6) Every business decision goes to
> `docs/DECISIONS.md` the moment it is taken, with the person's name and the date. (7) Update
> `docs/STATUS.md` with what you are doing when you start and when you stop, so that the others'
> agents see it.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

What I am asking for: the seven rules turned into a routine of the agent, because the agent does
not see the other agents and is only going to keep what it reads; the mandatory reading at the
start of the session, which is what replaces the corridor conversation; small and frequent
integration with the suite as the condition; the switch for whatever is half-finished; the map as
the conflict detector; and the living state written at the moment.

**When claiming a pending item:**

**Before sending the prompt**, you have to have this at hand:

- The pending item you want to take, chosen by you from the backlog, and a look at the ones
  claimed by others: does any of them touch the same module?
- Your username in the repository, the one that is going to end up in the "claimed by" field.
- Minimum acceptable state: you know which modules your pending item touches and that nobody has
  claimed them.

> I am taking pending item [PND-NNN]. Before anything: list the pending items claimed by others
> and tell me whether any of them touches the same modules as mine, by the "modules it touches"
> field and by the producer-consumer map; if there is an overlap, stop and tell me, do not start.
> If there is none, write my name in the "claimed by" field with today's date, write in
> `docs/STATUS.md` what I am starting, re-read the item's specification, and tell me which
> contracts of the map this item will touch and who consumes them.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

What I am asking for: the overlap check before starting, which is the cheap moment to avoid a
conflict; the claim written down; and the list of consumers I am going to touch, so as to know
from the start whom I am changing something for.

**When integrating:**

**Before sending the prompt**, you have to have this at hand:

- The pending item with its closing routine done or, if it is half-finished, the switch noted.
- The certainty that the shared branch is green right now (if it is red, that gets fixed first,
  no matter whose it is).
- Minimum acceptable state: you know whether you are integrating something finished or something
  half-finished behind a switch.

> We are going to integrate into the shared branch. Pull the others' changes first and tell me
> what came in and whether anything touches my modules. Resolve conflicts, if any, by reading
> both sides and asking me when a business rule is involved; never by keeping mine. Run the full
> suite, the quality gate and, if this is an inherited system, the characterization suite, and
> show me the counts. If anything is red, stop: tell me what and whose change it comes from. If
> this item is not finished, confirm the feature switch is off by default and say so in the
> commit message. Then push, show me the pipeline green on the shared branch, and update
> `docs/STATUS.md` and the pending item.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

What I am asking for: pulling before pushing; resolving conflicts by reading both sides and not
by "winning" (the model's reflex faced with a conflict is to keep its own version); the suite as
the condition; the pipeline green on the shared branch as the evidence, not on the agent's
machine; and the living state up to date.

## Completeness check (the lead does it, without reading code)

- Take three pending items closed this week: were they closed by somebody other than their owner,
  reading the report?
- How many times a day was there an integration into the shared branch? Ask for the history; if
  it is once a week, rule 2 is not being kept.
- Was there a conflict this week? How was it resolved, and is there a pending item of the map
  because of it?
- Is there any half-finished feature without a switch on the shared branch?
- Does `docs/STATUS.md` say what each person is doing today?

## Warning signs

- Every developer has their own working agreement "because they work differently". The agents are
  going to follow different rules on the same code.
- Integrations pile up for Friday. It is the forest of branches, without the branches.
- Somebody reads a colleague's code in order to approve their pending item. The method has
  degraded into code review, which is what the model does worse than evidence.
- A conflict was resolved "by keeping the newest version". A business rule was lost without
  anybody deciding it.
- One person's agent closed a pending item claimed by another. The reading at the start of the
  session is not in the agreement, or the agreement is not being read.

## What remains to be elaborated `[hypothesis]`

1. These rules come from the industry's known practice on shared branches and from what the
   method demands; I have not proved them with a team of several agents working at the same time.
   The first team that uses them is going to correct them, and the retrospective (23) has to ask
   how many conflicts there were and how many could have been avoided with the map.
2. I do not know how many people a shared branch with the method can hold before another way of
   working is needed. My intuition is that more than it could hold without the method, because
   the specified pending item and the map remove half the reasons for a conflict.
3. In Forge, the native pending-items register and the knowledge graph do the claiming and the
   overlap detection on their own; in the other tools it is done by hand with the fields of the
   pending item. I have not yet tested how much that changes in practice.
