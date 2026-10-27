# Urazuke — the evolutive-corrective path: normalizing a system that was not born with the method, and then climbing the ladder

Author: Pablo Kuschniroff, assisted by Claude Code. Version 1, 18 October 2026. This page is the
second half of the method: the [main document](ESCALERA_METODOLOGICA.md) describes the path of a
new project, and here I describe what I do when the system already exists, somebody else made it
(or I made it myself, "vibecoding" without evidence), and now it has to be corrected or made to
grow. The odd words are in the glossary of the main document; the real cases, in the
[references](REFERENCIAS.md). Public repository:
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## Why this page exists

When I wrote the ladder I wrote it looking at the empty folder: step 0 decides whether the
project is taken on, step 4 deploys the skeleton without functionality, and only at step 5 does
the first thing the user is going to see appear. It is the clean case, and it is the one that
teaches best. But it is not the most frequent case. In practice, most of the times somebody calls
me there is a system already running, with users who depend on it, made by somebody who is no
longer around or by a model nobody asked for evidence from, and the request is "fix this" or "add
that". My own tool entered other people's systems in diagnostic mode long before the ladder was
written [Ref. 11](REFERENCIAS.md#ref-11), and the first time the method fed on a system in
production it was by looking at one that already existed [Ref. 12](REFERENCIAS.md#ref-12).

And here there is a trap I want to name before going on: the temptation, faced with a legacy
system, is to choose between two extremes that are both wrong. One is "I rewrite it with the
method, from scratch": it sounds clean, and it almost always ends in a second system that never
manages to replace the first. The other is "I apply the loop directly, that is what steps 5 to 12
are for": it sounds pragmatic, and it is building on sand, because the loop takes for granted
that there is a definition, a map, a test environment, a suite that runs and a deployment that
repeats. None of that exists in a system that was not born with the method. This path is the one
that goes down the middle: **first you normalize, without rewriting, and then you climb the
ladder**.

## The method's use cases

The method has three use cases, and it is worth knowing which one you are in before opening the
agent, because it changes where you enter.

| Case | Starting point | Where you enter | What there is before the first functionality | Where it is written |
|---|---|---|---|---|
| **New project** | An empty folder and an owner with a request. | Step 0, and from there the twenty-four in order. | The whole start-up stretch before the first functionality. | The main document, the twenty-four contracts and the course manual. |
| **Evolutive-corrective on a system made with the method** | The system already climbed the ladder: it has a definition, a map, pending items closed with evidence, a suite, a deployment and manuals. | Step 5: a block is opened and the loop followed; step 13 periodically; step 23 at the close of the stage. | None: it is step 23 going back to step 0 for the next stage, which is already in Part B of the main document. | The main document (phase 4, operation). |
| **Evolutive-corrective on a system made without the method** | A system that runs, with users, without any of those artefacts or with some of them half done. | The normalization stretch of this page (N0 to N7), and only then the loop, in corrective or evolutive mode. | The whole normalization stretch, before touching the first line of functionality. | This page and the course manual, part 2. |

What is left out, named so that it does not get confused: a **technology migration** (changing
platform, language, database) is not a use case of the method; it is a different project, and it
generally falls under the exclusionary criteria of step 0
[Ref. 46](REFERENCIAS.md#ref-46). If the system you inherit has no accessible repository, or its
screens cannot be driven by a program and cannot be made drivable, what is called for is not
normalizing it but a new project that replaces it, with the whole of step 0.

And one clarification that holds for the third case: it makes no difference whether the legacy
system belongs to another team or to you. A system you built with a model, without evidence,
three months ago, is exactly as much a legacy system as the one a contractor made three years
ago. What changes is the effort of reading it, not the path.

## The principle: normalize without rewriting, with every input

Normalizing is bringing the system to the state the method takes for granted when it opens the
loop. And I do it with three rules I do not negotiate.

And something that comes before the three rules: on this path there are no deadlines either. The
method is a process, not a promise of speed; normalizing a legacy system takes as long as the
legacy system demands, and the only things I fix are the order and the gates.

**First: nothing is rewritten.** Normalization does not touch functionality. It puts around the
system what it is missing (the definition, the map, the test environment, the suite, the
repeatable deployment, the locks on whatever already acts on the world) and leaves the system
doing the same thing it was doing. A legacy system breaks more often from the enthusiasm of
"tidying it all up" than from the bug that had to be fixed.

**Second: two speeds.** There is a part of the debt that is paid before any change, and I call it
the **safety belt**: being able to run the system in a test environment with data resembling the
real data, to deploy it repeatably, to have the secrets outside the code, and to have a
characterization suite of the critical flows that goes red if any of that changes. The belt is a
**hard gate**: nothing is changed without it, with a single written exception for an emergency in
production, which I explain further down. The rest of the debt is paid **as it is touched**: when
a block enters a module, the normalization pending items of that module enter with it. Never "a
general cleanup" before starting.

**Third: all the inputs of the previous stages have to exist, even if they have to be recovered
by autodiscovery.** This is the rule that distinguishes this path from "apply the loop and be
done". Every step of the start-up stretch produces an artefact the following steps read: the
initial survey, the eligibility sheet, the working agreement, the project file, the semantic
tree, the volume survey, the sizing, the environments survey, the gates. In a new project the
owner writes those inputs with the agent out of the intake. In a legacy system nobody wrote them,
and the loop cannot start without them. The solution is not to skip them: it is for the agent to
**recover them from the system itself**, reading the code, the database schema, the configuration
of the environments, the logs and whatever documentation there is, and for every statement in
those documents to carry a mark of where it came from. The tags I use are five: `[code]`,
`[database]`, `[configuration]`, `[documentation]` and `[inferred]`, plus `[business]` for what
the owner confirmed or corrected. A recovered document with tags is a document that can be
verified without reading code: the owner looks at the statements tagged `[inferred]` and confirms
or corrects them, and looks at the ones tagged `[code]` to see whether the system does what they
believe it does. Whatever does not match is a **discrepancy**, and the discrepancies are the gold
of normalization: they are the bugs nobody reported and the rules nobody decided.

### The table of recovered inputs

So that it does not stay abstract, here is each input of the start-up stretch, where it is born
in a new project, and how it is obtained on the evolutive-corrective path.

| Input | In a new project it is produced by | On the evolutive-corrective path | Who confirms |
|---|---|---|---|
| `docs/INITIAL_SURVEY.md` | The owner, by hand, in the intake (steps 0 and 2). | The agent drafts it from the code, the database and the configuration, with source tags, in N2; the owner adds what only the business knows. | The owner, statement by statement on whatever is `[inferred]`. |
| `docs/ELIGIBILITY_CRITERIA.md` and `docs/ELIGIBILITY.md` | Step 0. | N0, with four more criteria specific to a legacy system. | The owner decides. |
| `docs/WORKING_AGREEMENT.md` | Step 1. | N1, with five more rules specific to a legacy system. | The owner. |
| `PROJECT.md`, `docs/SEMANTIC_TREE.md`, `docs/STATUS.md` | Step 2, from the survey. | N2, from the system, with tags; plus the list of discrepancies. | The owner walks the tree and decides each discrepancy. |
| `docs/AUDIT_[date].md` | Step 13, at the end. | N3, at the beginning: it is the inventory of the debt. | The owner reads it and verifies two findings. |
| `docs/ENVIRONMENTS_SURVEY.md`, the test environment, continuous integration, the repeatable deployment, `docs/GATES.md` | Steps 4 and 15. | N4, the safety belt, with the characterization suite. | The owner sees the screenshot and the second run of the deployment. |
| `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`, `docs/PRODUCER_CONSUMER_MAP.md` | Steps 14 and 11. | N5, by inventory of the code and the database. | The owner confirms lock by lock. |
| `docs/VOLUME_SURVEY.md`, `docs/SIZING.md` | Step 3, with numbers the business gives. | N6, with numbers measured in the database and the logs (step 7 applied to the sizing). | The owner supplies only what cannot be measured. |
| `docs/PENDING.md` | Step 5, from the client's request. | N7, from the audit, the discrepancies and the client's request, with the mark "blocks / paid when touched / can wait". | The owner orders them. |
| `docs/DECISIONS.md`, `docs/GOTCHAS.md`, `docs/LOCKS.md`, `docs/DEPLOYMENT.md` | Steps 6, 11, 14, 15. | They are created empty or completed in N2, N4 and N5, and they grow in the loop as in a new project. | The owner. |

If when N7 finishes any of these files is missing, the stretch has not been climbed. It does not
matter that the system "works": the loop is going to need it in the first session.

## The normalization stretch: the eight stations

I call them stations and not steps, and I number them N0 to N7, so that they do not get confused
with the twenty-four of the ladder. They are not new steps: they are the steps of the start-up and
three of the operation (11, 13 and 14), in another order and with another input. In a new project
the input is the survey; here the input is the system, and the reading is done by the agent.

| Station | Steps it comes from | What changes with respect to a new project |
|---|---|---|
| N0 — Eligibility of an existing system | 0 | Seven prerequisites the model verifies by doing; a red one is a prerequisite project, not a rejection. |
| N1 — The working agreement for a legacy system | 1 | Five more rules: do not refactor what was not asked for, read before touching, log instead of fixing in passing, current behaviour is the specification, nothing enters without characterization green. |
| N2 — Reading the system | 2 | The survey, the project file and the tree come out of the code with source tags; the list of discrepancies appears. |
| N3 — The audit as an inventory | 13 | It goes first, not last, and every finding says whether it blocks, whether it is paid when touched, or whether it can wait. |
| N4 — The safety belt | 4, 8, 15 | A test environment with data, a repeatable deployment, secrets outside, continuous integration, and the characterization suite. A hard gate. |
| N5 — Locks and map from the code | 14, 11 | An inventory of everything that acts on the world and of every contract between parts, before changing anything. |
| N6 — Sizing with real numbers | 3, 7 | The primary figures are measured, not asked for; the owner supplies only what is not in the database. |
| N7 — The normalization backlog | 5 | The debt and the client's request, in a single queue, with the speed mark and the pairing by module. |

The order matters. N3 goes before N4 because the audit says what has to go into the belt (the
secrets it found, the screens that cannot be driven, the deployment that cannot be repeated). N5
goes after the belt because taking an inventory of consequential actions requires being able to
run the system somewhere where a mistake costs nothing. N6 goes last because it measures on the
test environment with data, which only exists from N4 on. And N7 closes because it brings
everything before it into a single queue.

### The order of normalization

There are no deadlines: each stage lasts as long as the system demands, and the only fixed thing
is the order.

| Stage | Stations | What else happens |
|---|---|---|
| 1 | N0, N1, N2, N3 | Reading the system with the owner alongside, confirming nodes and deciding discrepancies. Nothing is changed. At the close of the stage: the recovered map and the inventory of the debt. |
| 2 | N4, N5 | The belt: test environment with data, deployment run twice, secrets rotated, characterization suite of the critical flows. Locks confirmed on whatever already acts. At the close: the system runs in test and the suite is green. |
| 3 | N6, N7, and the first block | Sizing measured. The backlog ordered. The first block is opened with step 5, corrective or evolutive, with its normalization pending items paired. From here on it is the usual loop. |

If the system is large, what grows is stage 1 (there is more to read) and the characterization
suite of stage 2 (there are more flows). N7 does not grow: a normalization backlog that cannot be
written in one sitting is a backlog nobody is going to maintain.

---

### N0 — Eligibility of an existing system: the prerequisites a model can verify

- **Intention**: decide whether this system can be taken on with the method, before touching it,
  with criteria that do not depend on a human assessment but on what a frontier model can or
  cannot do with the system. If a prerequisite is not met, it is not a "no-go": it is a **project
  in itself**, a prior one, so that the system becomes eligible.
- **When**: once only, before anything else.
- **Inputs**: the short initial survey, read access to the repository and, if possible, to the
  environment where it runs and to its database.
- **Artefact**: `docs/ELIGIBILITY.md` with the decision and the seven exclusionary prerequisites
  of a legacy system, each one verified by the agent with evidence, not declared by a person:
  1. **A complete environment of the system can be set up**, with all its sources, its data model
     and its persistence, from the repository and a copy of the data.
  2. **The code is understandable and workable by a frontier model**: the agent can read it whole
     and explain what each module does without inventing.
  3. **From the code, the model can describe in a document the complete functionality of the
     system**, in a form an end user recognises as their system and accepts.
  4. **The frontend can be walked by testing tools** in order to generate end-to-end tests, with
     every element accessible and the backend effect verifiable (this is X2).
  5. **The system can be built and run from the sources with the tools available today**: the
     dependencies resolve, the versions exist, nothing depends on a lost binary.
  6. **The production data can be copied and anonymized** into a test environment, and there is a
     backup that has been restored at least once.
  7. **The external integrations have a test mode or can be isolated at the edge** (a fake inbox,
     a provider in dry-run mode), so that the consequential actions can be tested without
     consequences.
- **Gate**: the seven green, with the agent's evidence (the environment brought up, the
  functionality document written, one end-to-end test of one flow running). Every red one turns
  into a prior project with its own exit pending item.
- **Who decides**: the agent verifies and presents the evidence; the owner decides whether to
  take on the prior projects or not.

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- `docs/INITIAL_SURVEY.md`, the short version you can write on the first day: what the system
  does and for whom, according to the business; what hurts today (the bug that motivates the
  request, what is missing); who made it and whether they are available; where it runs; who has
  access to what; whether there is a backup and who takes it. Half a page, incomplete on purpose:
  in N2 the agent is going to complete it from the system.
- `docs/ELIGIBILITY_CRITERIA.md`: the step 0 sheet (X1, X2 and the ones that weigh) plus the seven
  legacy prerequisites above, each one with three empty columns: green or red, the evidence (what
  the agent did to verify it), and the prior project if it is red.
- Read access to the repository for the agent, access to a copy of the data (or to production
  read-only) and to a place where it can try to set the environment up, with the credentials
  outside the chat. Without this, prerequisites 1, 5 and 6 cannot be verified and stay red.
- Minimum acceptable state: the agent can clone the repository and has a place where it can try
  to bring the system up.

**Opening:**

> We are going to assess whether this existing system can be taken over with the Urazuke method,
> with prerequisites that you verify by doing, not by asking. Read the initial survey in
> `docs/INITIAL_SURVEY.md` and the criteria sheet in `docs/ELIGIBILITY_CRITERIA.md`. Then, changing
> nothing in the system, verify each prerequisite with evidence: (1) try to set up a complete
> environment of the system from the repository and a copy of the data, with its sources, data
> model and persistence, and tell me exactly what you could and could not bring up; (2) read the
> whole code and tell me whether you can understand and work with it, module by module, naming
> what you cannot understand; (3) from the code alone, write `docs/FUNCTIONALITY_RECOVERED.md`: the
> complete functionality of the system described for an end user, screen by screen and process by
> process, marking what you inferred; (4) list every screen and say whether it can be driven by a
> test tool with each element accessible and the backend effect checkable, and prove it by writing
> and running one end-to-end test of one flow; (5) try to build and run the system from the sources
> with today's tools and report every dependency that does not resolve; (6) check whether the
> production data can be copied and anonymized into a test environment and whether a backup exists
> and has ever been restored; (7) list every external integration and say whether it has a test
> mode or can be isolated at the edge. For each prerequisite: green or red, the evidence (what you
> did and what happened), and, if red, what project would make it green. Do not decide: present me
> the sheet, and I decide.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

What I am asking for: that the prerequisites be verified **by doing** (setting up, reading,
writing the document, running a test), because a frontier model can do all four things and then
eligibility stops being an opinion; the recovered functionality document, which is the strongest
proof that the code is workable, and which is also the first draft of what N2 is going to turn
into the map; and that every red one come with the project that turns it green, because a missing
prerequisite is not a rejection but a prior piece of work with its own scope.

**Before sending the prompt** for the close: your decision in one line, taken after reading the
sheet with the evidence of each prerequisite; and, for every red one, your decision about whether
the prior project is taken on now, later, or never (and then the system is not eligible).

**Closing:**

> Decision: [go / go after these prerequisite projects: … / no-go]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, each prerequisite with its colour and its
> evidence, and, for every red one, the prerequisite project as a pending item in `docs/PENDING.md`
> marked as blocking, with its own acceptance criterion: the prerequisite verified green. Include
> the questions you asked and my answers.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

Completeness check: does every prerequisite have evidence of something the agent **did**, not an
answer from you? Does `docs/FUNCTIONALITY_RECOVERED.md` exist, and did you read it as the owner:
does it describe the system they believe they have? Did it run a real end-to-end test of one
flow? Does every red one have its prior project with an exit criterion? Warning sign: all green
in one afternoon for a system nobody understands. The agent answered instead of doing.

---

### N1 — The working agreement for a legacy system

- **Intention**: set the rules before touching anything, with five more rules than step 1, which
  are the ones an inherited system needs so that the agent does not "improve" it on its own.
- **When**: after N0, before reading anything.
- **Inputs**: your working preferences, as in step 1.
- **Artefact**: `docs/WORKING_AGREEMENT.md` with the six rules of the method and the five of the
  legacy system.
- **Gate**: the agreement has a date and a version, and the project file (once it exists, in N2)
  orders it to be read.
- **Who decides**: the owner.

**Before sending the prompt**, you have to have this at hand:

- Your working preferences, in a short list, as in step 1: language, how much you want it to ask
  you, what autonomy you give it, what you do not tolerate.
- A decision of yours about the level of risk you accept while the system is being normalized:
  whether the agent may or may not deploy to the test environment on its own (to production,
  never, until N4 is closed and step 15 climbed).
- `docs/ELIGIBILITY.md` (N0), closed.
- Minimum acceptable state: you know how to answer the questions of step 1 and the one about
  risk.

**Opening:**

> Before we touch anything, we are going to set the working agreement between you and me for a
> system that already exists and has users. Write `docs/WORKING_AGREEMENT.md` with the six rules
> of the method (my time is sacred; zero technical debt; exact scope; documentation in the same
> commit; never report as done what you have not verified; speak my language), each with one line
> explaining what it prevents, and these five rules for an inherited system: (7) Nothing is
> refactored that was not asked for, and no module is rewritten. (8) Code you do not understand
> is read before it is touched, and what you learn goes into the system map. (9) Anything strange
> you find (a secret in the code, a dead path, a duplicated rule, a query without an index) is
> logged as a pending item with its evidence, never fixed in passing. (10) Current behaviour is
> the specification until the owner says otherwise: a difference between what the code does and
> what the business says is a discrepancy for me to decide, not a bug for you to fix silently.
> (11) No change reaches the test environment without the characterization suite green. Add any
> rules you think this system needs, marked as proposals. If you need to know something about how
> I work in order to write this, ask me.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

What I am asking for: the usual six rules, and five that exist because a model faced with
somebody else's code does three things by reflex: it reorders it, it "fixes" it wherever it looks
wrong, and it assumes that what the code does is a mistake when it differs from what it would
expect. Rules 7, 9 and 10 block exactly those three reflexes. Rule 8 turns the reading into a
map, so that what the agent learns about a module is not lost when the session closes. Rule 11 is
the safety belt written as a rule, so that it exists before the suite exists.

**Closing:** the closing prompt of step 1, unchanged: you accept and reject the proposals with a
reason, and the agreement is left with a date and a version.

Warning sign: the agent proposes as a rule "modernize the code as it is touched". That rule is
the rewrite in disguise; reject it with a written reason.

---

### N2 — Reading the system: the recovered map and the discrepancies

- **Intention**: that the map step 2 produces in a new project should exist, but drawn out of the
  system itself, with source tags, and with the list of everything that does not match between
  the code, the database, the documentation and what the business believes. It is step 2 done by
  reverse engineering, and it is the move that gives the most value per hour of the whole path.
- **When**: after N1, with the owner available to confirm.
- **Inputs**: the complete repository, the database schema read-only, the configuration of each
  environment, the logs if there are any, whatever documentation exists, and the short survey
  from N0.
- **Artefact**: `docs/INITIAL_SURVEY.md` completed with tags; `PROJECT.md`;
  `docs/SEMANTIC_TREE.md` with every node tagged; `docs/STATUS.md`; and the list of
  discrepancies, each one decided by the owner and written into `docs/DECISIONS.md`.
- **Gate**: no `[inferred]` node without a verdict from the owner; no discrepancy without a
  decision or without a pending item; the reading test of step 2 passed.
- **Who decides**: the owner, discrepancy by discrepancy.

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- Read access for the agent to everything that can be read: the whole repository (every branch,
  not just the main one), the database schema (a read-only credential, outside the chat), the
  configuration of each environment (the environment files with the values of the secrets masked,
  or the list of variables without their values), the recent logs if they exist, and any
  documentation, even if it is an old email or an out-of-date manual.
- `docs/INITIAL_SURVEY.md` from N0, with a new section, written by you with the owner: **what the
  business believes the system does**, in their words, use case by use case, and the business
  rules they remember ("an appointment cannot be cancelled with less than two hours' notice"). Do
  not verify it against the system: that comparison is precisely what the agent is going to do,
  and the differences are the discrepancies.
- `docs/WORKING_AGREEMENT.md` (N1), closed.
- A list written by you of what lives outside the repository and touches the system: a robot, a
  spreadsheet that reads the database, a job scheduled on the server, another system that
  consumes a table. The agent is not going to see it from the code.
- Minimum acceptable state: the agent can read the code and the database schema, and the survey
  has at least three use cases and three rules in the business's words.

**Opening:**

> We are going to recover the map of this system from what exists. Read the whole repository
> (every branch), the database schema (read-only), the configuration of each environment, the
> recent logs and whatever documentation there is; if some part cannot be read from where you are,
> tell me and mark it as a gap; do not fill it by guessing. Then write three things. First,
> complete `docs/INITIAL_SURVEY.md` in the form the method expects (what the system does and for
> whom; what it does NOT do; who uses it; the technology; the environments; what an error costs),
> with every statement tagged by its source: [code], [database], [configuration], [documentation],
> [business] for what the survey already says, or [inferred]. Second, `PROJECT.md`, three hundred
> lines at most, and `docs/SEMANTIC_TREE.md`: the domains and, under each one, the actors, the
> processes (each with trigger, steps, outcome and exceptions as the code actually implements
> them), the entities with the attributes, states and transitions the database and the code
> enforce, the screens, the external integrations and the scheduled jobs; every node tagged the
> same way. Third, `docs/DISCREPANCIES.md`: everything where the code, the database, the
> documentation and what the business says in the survey do not agree, with the evidence on each
> side. Do not resolve any discrepancy and do not fix anything: list them. Create `docs/STATUS.md`
> for the living state.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

What I am asking for: that it read everything and declare what it could not read (the
completeness clause in its legacy form: the gap is marked, not filled); that the survey and the
tree come out with **source tags** on every statement, because that tag is what lets you verify
without reading code; that the processes and the states be **the ones the code implements**, not
the ones they ought to be, because current behaviour is the specification (rule 10 of the
agreement); that it include the scheduled jobs, which are the ones nobody remembers and the ones
that do the most damage; and that the discrepancies be left listed with the evidence on each side
and **unresolved**, because resolving them is deciding, and deciding is yours.

**Before sending the prompt** for the close: the tree walked with the owner node by node, with
the list of confirmed nodes and the list of corrected ones; and the list of discrepancies, each
one with the owner's decision in one line and the date (the system is right and the business had
forgotten; the system is wrong and it gets changed; or it stays open with a date, and not too
many of those).

**Closing:**

> I confirm these nodes: [list]. Correct these: [list]. The discrepancies are decided as follows:
> [one line each: discrepancy, my decision, today's date]. Finalize `docs/INITIAL_SURVEY.md`,
> `PROJECT.md` and `docs/SEMANTIC_TREE.md` with today's date, keeping the source tags. Write each
> discrepancy decision in `docs/DECISIONS.md` with my exact words, and open a pending item in
> `docs/PENDING.md` for every discrepancy where I decided the system must change; for the ones
> where I decided the current behaviour stays, write it next to the node as a confirmed rule. Add
> to `PROJECT.md` the instruction to read this file, the tree and the working agreement at the
> start of every session.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

What I am asking for: that the decision about each discrepancy end up in the usual three places
(the decision register, the pending item if something has to change, the tree if it is confirmed),
and that the source tags **not be erased** at the close: a tree that lost its tags is a tree that
can no longer be verified.

Completeness check: walk the tree as the owner does. Is there an entity state the business never
used? If it is tagged `[code]`, the system has it even if nobody uses it, and it is a
discrepancy. Is there a scheduled job in the tree? If there is none, ask the agent where it
looked. Does every discrepancy have a decision with a date? Did it pass the reading test of step
2 (a new session knows what the system does NOT do)? Warning signs: nothing in the tree is tagged
`[inferred]` (the agent is not distinguishing what it read from what it assumed); the list of
discrepancies is empty (it is never empty in a legacy system: the agent compared badly or did not
compare); the project file goes over three hundred lines because "there was a lot to document"
(that goes into the tree, and what happened goes into the living state
[Ref. 41](REFERENCIAS.md#ref-41)).

---

### N3 — The audit as an inventory of the debt

- **Intention**: step 13, but at the beginning and with one more question per finding: does it
  block, is it paid when the module is touched, or can it wait? The report is not a report: it is
  the raw material of the belt (N4) and of the backlog (N7). In my first project that started
  with the method already written, the series of early audits turned directly into pending items
  [Ref. 30](REFERENCIAS.md#ref-30); here I do the same on somebody else's system.
- **When**: after N2, in a different session from the one that read the system if possible.
- **Inputs**: the repository read-only, the environment where it runs read-only, the recovered
  map (N2).
- **Artefact**: `docs/AUDIT_[date].md` with every finding marked "blocks / paid when touched /
  can wait".
- **Gate**: no finding without a speed mark; the ones that block have a pending item open before
  N4 starts.
- **Who decides**: the owner, on the speed marks.

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- A new session of the agent, if your tool allows it, with a clean clone and an instructions file
  that says "you are an auditor; you have not read and are not going to touch this system", so
  that it does not share the assumptions of the N2 session. If that is not possible, the same
  session, but know it.
- Read-only access to the environment where the system runs (database, logs, configuration), with
  read-only credentials outside the chat.
- The recovered map from N2 (`PROJECT.md`, `docs/SEMANTIC_TREE.md`) and `docs/DISCREPANCIES.md`,
  so that the auditor does not rediscover what is already written.
- Your criterion for what "blocks" means: in general, an exposed secret, a screen that cannot be
  driven by a program, a deployment that cannot be repeated, the absence of a backup, and
  anything that can damage data or overcharge. Write it in two lines so you can give it to it.
- Minimum acceptable state: the auditor has read-only access and knows what you consider
  blocking.

**Opening:**

> Audit this system for integrity, security, performance, code quality and deployability, as the
> inventory of what must be normalized before and during its evolution. Read-only: change nothing
> except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires access you
> lack (the database, the logs, the server), tell me and mark that part as not audited; do not
> pass it as fine. Go through all of the code, not a sample, and read `docs/SEMANTIC_TREE.md` and
> `docs/DISCREPANCIES.md` first so that you do not report what is already known. For every
> finding: where it is (file and line), the risk, the evidence that proves it (the command, the
> query, the number), its priority (P0 must be fixed now, P1 soon, P2 when possible), and one more
> field: whether it BLOCKS (must be fixed before any change, by my criteria: [criteria]), whether
> it is PAID WHEN TOUCHED (fixed together with the first change that enters its module), or whether
> it CAN WAIT. Grade every dimension you audited. End with every finding turned into a proposed
> pending item, blocking ones first.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

What I am asking for: the audit of step 13 with the "deployability" dimension added (because in a
legacy system the deployment is usually the first problem) and with the speed field, which is
what turns a report into a plan: without that field, an audited legacy system has forty findings
and nobody knows which one to start with. The criterion for what blocks is given by me, not by
the auditor, because it depends on the consequences for the business.

**Closing:** the closing prompt of step 13, to the builder, with one addition: the pending items
it opens carry the speed mark of the finding.

Check: does the report say what it could NOT audit? Is there at least one finding marked
"blocks"? (In a legacy system there always is; if there is none, the auditor did not look at the
secrets or at the deployment.) Do two findings picked at random have a file, a line and
reproducible evidence? Warning sign: everything is in "can wait". That is an auditor who does not
want to bother anyone.

---

### N4 — The safety belt

- **Intention**: that there should exist, around the system and without touching its
  functionality, what makes it safe to change: a test environment with data resembling the real
  data, a deployment that repeats, the secrets outside the code, continuous integration running
  whatever there is, and the **characterization suite** of the critical flows. It is step 4, the
  first half of step 15 and an inverted form of step 8, together and before any change. It is a
  **hard gate**: until the belt is green, not one line of functionality is changed.
- **When**: after N3, before any change.
- **Inputs**: the environments survey (recovered in N2 and confirmed by you), the N3 report with
  its blocking findings, the semantic tree with the processes, and access to the server and to
  the database.
- **Artefact**: the test environment running with anonymised data; `docs/DEPLOYMENT.md` with the
  deployment to test repeated twice; the secrets in the server configuration and rotated;
  continuous integration green; `docs/GATES.md`; and the characterization suite green, with the
  red demonstrated for each flow.
- **Gate**: a screenshot of the system running in test, seen by you; a second run of the
  deployment with no changes; a search for secrets in the repository that comes back empty; the
  characterization suite green and every test proved red by mutation.
- **Who decides**: the owner, on which flows are critical and on the anonymisation of the data.

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- `docs/ENVIRONMENTS_SURVEY.md`, which the agent drafted in N2 with tags and you completed: where
  it runs today, how it is deployed today (even if that is "I copy the files over FTP"), where
  the secrets are going to live on the server, who has access, and where the test environment is
  going to run (a separate server, a container, a cloud account; if you have nothing, say so and
  the agent proposes the simplest thing). The prompt calls it "the environments survey"; tell it
  where it is.
- Access for the agent to the production server read-only (to copy the database and the
  configuration) and to the place where the test environment is going to run with write
  permissions, with the credentials outside the chat.
- Your decision about the **anonymisation** of the test data: which fields are personal data
  (names, telephone numbers, emails, identity documents) and how they are replaced. You decide
  it because it is a legal obligation, not a technical preference.
- The list of **critical flows** for the characterization, written by you out of the processes of
  the semantic tree: the ones that, if they change by accident, cost the business money or trust.
  Between four and eight for a small system. Not "all of them": all of them is none of them.
- `docs/AUDIT_[date].md` (N3), so that the agent knows which secrets it found and which screens
  cannot be driven.
- A production backup restored at least once, even if only on your machine, before the agent
  touches the server. It is the N0 condition that falls due here.
- Minimum acceptable state: you know where the test environment is going to run, you have the
  list of critical flows, you decided the anonymisation and you restored a backup.

**For the environment, the deployment and the secrets:**

> We are going to build the safety belt around this system before changing anything in it. Read
> the environments survey, `docs/AUDIT_[date].md` and `docs/SEMANTIC_TREE.md`. Evaluate whether you
> have what is needed (read access to the server where it runs and to its database, write access
> to where the test environment will run, the way it is deployed today); if anything is missing,
> ask me before starting. Then set up, without touching any functionality: (1) a test environment
> that runs the system exactly as production does, with a copy of the data where the personal
> fields I listed are anonymized; (2) a reproducible deployment to that environment, run twice,
> showing me that the second run changed nothing; (3) every secret found in the repository or in
> the code moved to the server configuration (environment file or vault), with the list of what
> you moved so that I rotate each one; (4) continuous integration running whatever test suite
> exists today, even if it is a single smoke test, on every push; (5) `docs/GATES.md` with the
> gates of this project, including: nothing reaches the test environment without the
> characterization suite green, and nothing reaches production without the full suite green with
> the exact version. Document all of it in `docs/DEPLOYMENT.md` so that a person can do it by hand
> without you. Take a screenshot of the system running in the test environment and show it to me.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

What I am asking for: the skeleton of step 4 built around something that already exists, with
half of step 15 brought forward (secrets outside, deployment documented) because in a legacy
system secrets in the code are the rule and not the exception
[Ref. 42](REFERENCIAS.md#ref-42); the anonymisation as part of the environment and not as a
detail; and the gates written before the suite exists, so that the suite is born already being a
gate.

**Before sending the prompt** for the suite: the test environment opened by you with the
anonymised data; the secrets on the list rotated, today; the list of critical flows for the gap
in the prompt; and, if N0 left screens red, the blocking pending item that makes them drivable
closed before this suite or as part of it.

**For the characterization suite:**

> We are going to write the characterization tests of these critical flows: [list]. A
> characterization test captures what the system does today, exactly as it does it, defects
> included; it is not a test of what the system should do. For each flow: drive it from the
> screen as a user would and check the effect in the backend (the row, the state, the message
> queued). Every test must pass against the current code. Then prove that each test actually
> watches its flow: break the flow deliberately with a temporary change, show me the red output,
> revert the change, show me the green. If a flow cannot be driven from the screen, do not
> simulate it: say so and open a pending item marked as blocking. If while writing these tests you
> find behaviour that looks wrong, do not fix it: add it to `docs/DISCREPANCIES.md` with the
> evidence. Record the command to run the suite in `docs/STATUS.md`, and make the suite the gate
> for the test environment as `docs/GATES.md` says.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

What I am asking for: step 8 the other way round. In a new project the test is born red and turns
green with the change; here the test is born green, because it captures what is there, and the
proof that it is useful is that **it goes red when you break the flow on purpose**. Without that
demonstrated mutation, a characterization test is a test that passes because it watches nothing,
which is the same problem as the green that hides a bug [Ref. 44](REFERENCIAS.md#ref-44). And the
two discipline clauses: what cannot be driven is declared and blocks, and what looks wrong is
logged as a discrepancy, not fixed, because until the owner decides, current behaviour is the
specification.

Completeness check: did you open the URL of the test environment yourself and see the system with
data? Did you search for a real name in that data and fail to find it? Did the deployment run
twice and the second run change nothing? Did you ask for the search for secrets in the repository
and did it come back empty? Did you rotate every secret on the list? Does every critical flow
have its test, and does every test have its red by mutation in view? Warning signs: the
characterization suite passed in full "first time" and a red was never shown; the test environment
runs "on the agent's machine" and not somewhere you can open; the test data is "a few example
records" instead of an anonymised copy (the bugs of a legacy system live in the real data, not in
the example data).

---

### N5 — Locks and producer/consumer map from the code

- **Intention**: to know, before changing anything, what the system does that acts on the world
  (charges, sends, approves, deletes, notifies, runs on its own at night) and who produces and
  consumes each contract between parts. In a new project this is decided before building (step
  14) and mapped as the building goes on (step 11). In a legacy system it is already built, and
  nobody remembers all of it. An evolutive change can trigger a consequential action that was
  dormant, and a corrective change can leave a consumer out of date.
- **When**: after the belt, because taking an inventory of actions requires being able to run
  the system where a mistake costs nothing.
- **Inputs**: the code, the database, the scheduled jobs of the server, the semantic tree, and the
  list of what lives outside the repository.
- **Artefact**: `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` with source tags,
  `docs/PRODUCER_CONSUMER_MAP.md`, and after the close `docs/LOCKS.md` with the locks that go now
  and the ones that go later.
- **Gate**: no consequential action without a verdict from the owner; the locks marked "now"
  implemented with their test red before the first block.
- **Who decides**: the owner, lock by lock.

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- With the owner, a written list of what the business **knows** the system does outwards: what it
  charges, what it sends, who it notifies, what it deletes, what runs on its own. It goes in a
  section of `docs/INITIAL_SURVEY.md`. The agent is going to find more in the code than the
  business remembers; the comparison between the two lists is the result.
- Access for the agent to the scheduled jobs of the server (the list of scheduled tasks or
  whatever your platform's equivalent is), because automatic sends usually live there and not in
  the code.
- The list of what lives outside the repository (N2), for the map.
- The N4 test environment running, so that it can trigger an action and see what happens without
  real consequences.
- Minimum acceptable state: the business wrote its list and the agent can see the scheduled tasks.

**Opening:**

> Go through the code, the database triggers and the scheduled jobs of the server looking for
> everything that charges, sends, approves, deletes, notifies outwards or runs on a schedule, and
> write `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` with every statement tagged by its source. Compare
> it with the list the business wrote in `docs/INITIAL_SURVEY.md`: whatever the code does that the
> business did not list, or the other way round, ask me about before going on. For every action:
> what triggers it, whether it can run twice, whether it is reversible, what lock exists today if
> any, and what the way back is. In the same pass, build `docs/PRODUCER_CONSUMER_MAP.md`: for every
> contract in the system (a service, a table, a file format, a list of values), who produces it
> and who consumes it, including the things outside the repository I told you about. If there are
> parts you cannot see, say so instead of leaving them out. Present me the actions table with a
> proposed lock for each (explicit confirmation, double safety, dry-run mode, daily limit, a human
> in the loop) and a proposal of which locks go NOW, before any change, and which can go when the
> module is touched. Do not implement anything yet: I confirm lock by lock.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

What I am asking for: the inventory of steps 14 and 11 in a single pass, because they walk the
same code; the comparison between what the business remembers and what the code does, which is
where the sends nobody remembered turn up; and the **now or when touched** proposal for each
lock, which is the two-speeds rule applied to protection: a lock over an action that charges goes
now; a lock over a monthly export can wait for the block that touches that module.

**Closing:** the closing prompt of step 14, with the locks marked "now", each one with its test
red against the version without the lock; the rest stay in the backlog with their mark.

Warning sign: the agent found exactly the same actions the business listed. In a legacy system
that never happens; it failed to look at the scheduled tasks or at the database triggers.

---

### N6 — Sizing with real numbers

- **Intention**: step 3, but with the enormous advantage of a legacy system: the primary data do
  not have to be asked for, they are in the database and in the logs. They are measured with step
  7 (a meter with a test, audited in both directions) and the owner supplies only what is nowhere
  to be found: how much they expect to grow and whether the system is going to be sold to others.
- **When**: after N5, before opening the first block.
- **Inputs**: the production database read-only or the complete test copy, the logs, the semantic
  tree with the entities.
- **Artefact**: `docs/VOLUME_SURVEY.md` with every number tagged `[database]` or `[log]` and its
  command, the meters in the repository with their test, and `docs/SIZING.md` with the "times
  ten" and the asymmetric decisions worth taking before evolving.
- **Gate**: no primary figure without a meter; an arithmetic check redone by you that matches.
- **Who decides**: the owner, on the expected growth and the asymmetric decisions.

**Before sending the prompt**, you have to have this at hand:

- Read-only access to the production database (or the complete copy from N4, if the anonymisation
  touched neither the dates nor the quantities) and to the access or application logs, with the
  credential outside the chat.
- The two answers only the business has, written down: how much they expect to grow over the next
  two years, and whether the system is going to be used in more than one place (the "times ten").
- A known case for the test of each meter: for example, the number of rows of a small table you
  can count by hand.
- Minimum acceptable state: the agent can query the database and you have the two answers.

**Opening:**

> Before changing anything we are going to size this system with its real numbers. With read-only
> access to the production database (or the complete test copy) and to the logs, measure instead
> of asking: rows per table and growth per month from the timestamps, events per entity, peak
> concurrency from the access logs, data size today and projected at five years, and the slowest
> queries. Write a meter for each number (a script that lives in the repository, with a test
> against a known case I will give you) and show me every number together with the command that
> produces it; audit each meter in both directions (is everything that should be counted, counted?
> does everything counted exist?). Write `docs/VOLUME_SURVEY.md` with every figure tagged
> [database] or [log], and ask me only for what cannot be measured: the growth the business
> expects and whether the system will serve more than one site. Then write `docs/SIZING.md`: what
> breaks first if everything is multiplied by ten, which of the current architecture choices hold
> and which do not, and which asymmetric decisions we take now, before evolving, because they are
> cheap today and expensive later. Do not change any code.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

What I am asking for: measuring instead of asking, which is what a legacy system allows and a new
project does not; the meter with a test and the audit in both directions of step 7, because
meters lie [Ref. 35](REFERENCIAS.md#ref-35), [Ref. 36](REFERENCIAS.md#ref-36); and the sizing as
a gate before evolving [Ref. 14](REFERENCIAS.md#ref-14): if the current architecture does not
withstand the "times ten" and the client's request is precisely to grow, that is known now and
not in the third block.

**Closing:** the closing prompt of step 3, choosing among the options it proposed for whatever
does not withstand, or confirming that what is there does withstand.

Warning sign: an "approximate" number without a mark saying it is approximate. If it is in the
database, it is measured; if it is not there, it is asked for; there is no third option.

---

### N7 — The normalization backlog, paired with the client's request

- **Intention**: a single queue of pending items, with a full specification, where the debt (what
  came out of the audit, the discrepancies, the screens that cannot be driven, the pending locks,
  the decisions of the sizing) and the client's request (what has to be corrected and what has to
  be added) live together, each with its speed mark and paired by module. It is step 5 with two
  more columns.
- **When**: at the close of the stretch. After that, the loop.
- **Inputs**: `docs/AUDIT_[date].md`, `docs/DISCREPANCIES.md` with the decisions,
  `docs/LOCKS.md`, `docs/SIZING.md`, the semantic tree, and the client's request for this stage.
- **Artefact**: `docs/PENDING.md` with every pending item specified, marked "blocks / paid when
  touched / can wait" and "corrective / evolutive / normalization", and the pairing by module.
- **Gate**: no pending item marked "blocks" is left open before the first block; every client
  item has the normalization items that enter with it listed.
- **Who decides**: the owner, on the order.

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- The client's request for this stage, in prose and in their words, separated into two lists:
  what **fails today** (each thing with how it is reproduced, what happens and what ought to
  happen, according to the business) and what is **missing** (the new things). It goes in
  `docs/blocks/STAGE_01_REQUEST.md` or wherever you prefer; the prompt says "the client's request
  for this stage", so tell it where it is. If the owner gave priorities, those too.
- Every artefact from N2 to N6 closed: the tree, the audit, the discrepancies decided, the locks,
  the sizing. If any is missing, do not open this prompt: the backlog is going to come out
  incomplete and you are not going to know what it is missing.
- The blocking pending items that already exist (from N0, N3 and N4) closed or under way with a
  date.
- Minimum acceptable state: the client's request is in two lists in their words, and the
  artefacts of the previous stations exist.

**Opening:**

> We are going to turn the normalization and the client's request for this stage into one queue
> of numbered pending items in `docs/PENDING.md`, each with its full specification as the method
> asks (number, title, node of the semantic tree, origin, description, business rules with
> decision and date or marked as missing, data in and out, screens, edge cases, acceptance
> criteria as given, when, then, how it will be verified, status). Sources for the normalization
> items: `docs/AUDIT_[date].md`, the discrepancies I decided to change, the screens that cannot be
> driven by a program, the secrets to rotate, the locks that are not implemented yet, and the
> decisions in `docs/SIZING.md`; each one keeps its speed mark: BLOCKS, PAID WHEN TOUCHED, or CAN
> WAIT. Sources for the client's items: the client's request for this stage; each one marked
> CORRECTIVE (something that fails today, with the way to reproduce it in the client's words) or
> EVOLUTIVE (something new). For every client item, list the normalization items that touch the
> same modules and should be paid together with it. If the request is ambiguous on any point such
> that you cannot write a verifiable item, ask me; do not resolve it by assuming. Order: blocking
> items first, then the client's items in the priority I gave you, each with its paired
> normalization.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

What I am asking for: the whole of step 5 (the detailed specification lives in each pending item,
including the normalization ones), with the two marks that make this path what it is: the speed,
which says when each debt is paid, and the type, which says how it is closed (a corrective item
closes with the test that reproduces the failure; an evolutive one, with the test of step 8). And
the **pairing by module**, which is the "paid when touched" rule made operational: when I open the
block for "the deposit", the normalization pending items of the payments module enter with it,
and neither before nor after.

**Closing:** the per-session routine of step 5, unchanged, in the working agreement.

Completeness check: is any "blocks" item left open? Then the first block does not get opened. Does
every corrective item say how it is reproduced, in the client's words? Does every client item have
its list of paired items, even if it is empty? Warning sign: the backlog has more than fifty
normalization pending items in "can wait". That is not registered debt: it is the rewrite
disguised as a list. Archive what is never going to be paid, and say so.

---

## The loop on an inherited system: corrective mode and evolutive mode

Once N7 is finished, the path joins the ladder: steps 5 to 12 are climbed with every pending item,
just as in a new project, with the same contracts and the same prompts. But there are two nuances
worth a section of their own, because they are what distinguishes "touching a legacy system with
method" from "touching a legacy system carefully".

### Corrective mode: red is natural

A corrective pending item is a bug: something that fails today and the client knows it. In step 8
of a new project the red is manufactured (the test is written, it is run against the old code, it
is seen to fail). In a corrective item the red **is the bug itself**: the test that reproduces the
failure, driving the flow from the screen as the user who reported it did, has to fail against the
current code. If it does not fail, you did not reproduce the bug you were told about; you
reproduced a different one. That red is the proof that you are fixing the right thing, and it is
worth more than any explanation from the agent about "what must be happening". The case of the
four rounds until the root cause [Ref. 22](REFERENCIAS.md#ref-22) is the one that taught me that
without a written reproduction, each round fixes a different symptom.

**Before sending the prompt**, you have to have this at hand:

- The corrective pending item in `docs/PENDING.md` (N7), with the way to reproduce it in the
  client's words: what they did, what happened, what they expected. If the client does not know
  how to reproduce it, first get hold of a case (a record, a date, a screenshot); without a
  reproduction there is no test, and without a test there is no close.
- The characterization suite (N4) green in the test environment, with the command in
  `docs/STATUS.md`.
- The normalization pending items paired with this one, listed in the item.
- Your willingness to decide: if the root cause turns out to be a business rule nobody wrote down
  (it happens often), the agent is going to stop and ask, and somebody has to answer that day.
- Minimum acceptable state: you know how to reproduce the bug by hand in the test environment.

**To close a corrective pending item:**

> This pending item is a correction: [what fails, in the client's words, and how to reproduce
> it]. Before changing anything: (1) Reproduce the failure with a test that drives the flow from
> the screen and checks the effect in the backend, and show me that it fails against the current
> code; that red is the proof that you reproduced the right defect. If you cannot reproduce it,
> tell me what you tried and what you need; do not fix what you cannot see. (2) Find the root
> cause and tell me in prose, with the evidence, before fixing. If the root cause is a business
> rule nobody wrote down, stop and ask me. (3) Fix at the root, not where it hurts, and nothing
> else: anything else you find goes to a pending item. (4) Show me the test green, the
> characterization suite still green, and the regression of the neighbouring items. (5) If the
> fix changes a current behaviour that someone may depend on, say so explicitly: that is a decision
> for me, not a side effect. Close the paired normalization items of this module in the same
> block, each with its own evidence. The commit message says "proved red against [version]" and
> the test counts.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

What I am asking for: the reproduction **before** the diagnosis, because a model diagnoses with
great confidence what it did not reproduce; the root cause in prose before touching anything, so
that you can stop a fix that is aiming at the wrong place; the root and nothing else, because in a
legacy system "while I am at it" is the commonest way to break what was working; the
characterization green as the regression of the whole system; and clause 5, which turns a change
of behaviour into a decision. And the pairing: the debt of this module is paid now, with its
evidence, not "later".

### Evolutive mode: characterization is the regression

An evolutive pending item is something new over something that exists. It is opened with the
prompt of step 5, built with steps 6 and 8 exactly as they are, and the only difference is what
"the regression of the neighbours" means: here the neighbours are the whole system, and the
characterization suite is what says that what was working keeps working. Two more rules. First:
when the block enters a module, the normalization pending items of that module marked "paid when
touched" enter with it, with their own evidence; it is the two-speeds rule. Second: the new thing
is born with the full method already, that is, with its specification in the pending item, its
test red, its end-to-end test and its lock if it acts on the world. What the legacy system did to
the old module is not done to the new one.

### The exception: an emergency in production

The belt is a hard gate, and a hard gate needs its written exception, because if I do not write
it, the exception gets invented the day something falls over at eleven at night. The exception is
this: if production is down or is damaging data and the belt is not yet complete, the minimum that
stops the damage is done, with the rollback by hand and the owner informed, and **the same day**
the corrective pending item is opened and closed with the full routine: the test that reproduces
it red, the root cause, the regression. An emergency fix that does not come back in through the
loop is debt that is charged with interest.

**Before sending the prompt**, you have to have this at hand: confirmation that it is a real
emergency (production down or damaging data, not "the client is nervous"), the owner informed, and
the way back (the N0 backup or the previous version) at hand.

**For an emergency:**

> This is an urgent fix on production: [what is happening]. Do the minimum that stops the damage,
> on a branch, with the rollback ready before you deploy, and tell me exactly what you changed and
> what you did not verify. Do not touch anything else. Then, today, open the corrective pending
> item in `docs/PENDING.md` with what happened, and we close it with the full routine: the test
> that reproduces it in red, the root cause, the fix at the root, the characterization suite and
> the regression green.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

What I am asking for: the minimum, with the rollback before and not after, and with the honest
report of what was not verified (step 12); and the obligation to come back in through the loop the
same day, which is what separates an exception from a habit.

## The six operational quality steps (16 to 19, 21 and 22) in a legacy system

Steps 16 to 19, 21 and 22 of the main document (observability and traceability, persistence,
vulnerabilities, performance, and the two monitorings) hold for both use cases, and in a legacy
system they have a precise location, because several of them already have half the work done by
the normalization stretch:

- **16, observability and traceability**: the minimum level (structured log records with a
  configurable level and a correlation id in the critical flows) goes into the safety belt (N4),
  because without it the characterization suite does not say what broke. The complete level, with
  the immutable audit trail of the consequential actions that N5 inventoried, is climbed before
  the first deployment after the normalization.
- **17, persistence**: the measurements are already done in N6. What comes out of them goes into
  the backlog (N7) with its mark: whatever is already outside the business's tolerance, "blocks"
  or "now"; the rest, "paid when touched", and it comes in with the block that touches that
  module.
- **18, vulnerabilities**: the first run is the security dimension of the N3 audit, and the scan
  in the chain is part of the belt (N4), because a legacy system almost always has old
  dependencies and secrets in its history. The P0s block; the rest, to the backlog.
- **19, performance**: it is run with the volumes measured in N6, on the persistence layer
  already corrected in what was blocking, before the first deployment after the normalization. In
  a legacy system it usually discovers that the breaking point is closer than the business
  believes.
- **21 and 22, monitoring**: they are set up with the first deployment, just as in a
  new project, with one difference: the first reading of the report is the legacy system's
  baseline, and the deviations and the errors that already existed on the first day turn into
  pending items with their speed mark. None is left as "known" without a pending item.

In practice, the four that precede the deployment are one more stage of the normalization,
before the first evolutive block or together with it depending on the urgency of the request,
and the two monitorings are set up with the deployment.

## When the system is normalized

Never entirely, and that is as it should be: the debt marked "paid when touched" is paid over
months, module by module, and the debt marked "can wait" is sometimes never paid, and that has to
be said. What does have a precise moment is the **close of the stretch**, which is when the first
block is opened. That is the list:

1. Every input of the table of recovered inputs exists, with source tags, and the owner confirmed
   every `[inferred]` node of the tree (N2).
2. Every discrepancy has a decision with a date, and the ones that change the system have a
   pending item (N2).
3. The audit exists and every finding has a speed mark (N3).
4. The belt is green: a test environment with anonymised data that you opened; the deployment run
   twice; the search for secrets empty and the ones found rotated; continuous integration green;
   the characterization suite green with the red by mutation demonstrated for every critical flow
   (N4).
5. Every consequential action has a verdict, and the locks marked "now" have their test red (N5).
6. The primary figures are measured with a meter and a test, and the "times ten" is written down
   (N6).
7. No pending item marked "blocks" is left open, and every client item has its paired items (N7).
8. The working agreement has the five legacy rules, and a new session passes the reading test
   (N1, N2).

If the eight all say "yes", the system is normalized as far as this path demands, and what follows
is the usual ladder. Phases 3 and 4 of the main document (go-live and operation) apply exactly as
they are: the periodic audit, the manuals (which in a legacy system usually do not exist, and are
generated with step 20 from the system as it is), the resident agent, and the retrospective with
numbers, which in a legacy system has a question of its own: how much it cost to normalize, and
how much of the debt we marked "can wait" ended up costing anyway.

## Warning signs of the whole path

- The agent proposes rewriting a module "because that is easier than understanding it". That is
  rule 7 of the agreement violated; in a legacy system, understanding is the work.
- Functionality started being changed with the belt half done ("we will finish the suite later").
  Later never arrives, and the first change without a suite is the one that breaks what nobody
  knew existed.
- The list of discrepancies was resolved "by fixing the code so that it does what the business
  says" without the owner deciding each one. Some of those discrepancies are rules the business
  forgot and the code remembered.
- The normalization backlog grows faster than it is paid. It is marked wrong: there are things in
  "paid when touched" that are "can wait", or there are modules being touched without their debt
  being paid.
- The sizing numbers came out of an estimate "because the database is too big to count". A big
  database is counted with a query; that is a meter.
- An emergency fix did not come back in through the loop. Count how many there were in the month;
  if there is more than one, the belt is not a gate, it is decoration.

## What remains to be elaborated `[hypothesis]`

1. The seven prerequisites of N0 are verified by doing, and that makes them calibrable: every
   legacy system that goes through N0 leaves its sheet with evidence. What is missing is the
   casuistry: how many legacy systems fail each prerequisite and how much the prior project that
   turns it green costs. It is no longer a hypothesis about the criterion; it is a count I do not
   have yet.
2. The size of the characterization suite: between four and eight flows is what worked for me on
   small systems; on a large one I do not know whether the criterion is per flow, per module or
   per money at stake.
3. How normalization is split on a large system: I suspect the reading (N2) is done whole but
   the belt (N4) is assembled module by module, as each module is about to be touched, and that
   the hard gate becomes hard per module and not per system. I have not tried it.
4. What happens with a legacy system built by a model with the method half applied (agreement
   yes, tests no): whether this path is walked in full or whether there is a shortcut. My
   intuition is that there is no shortcut, and that the shortcut is precisely the mistake, but it
   is intuition.
