# Urazuke, the evidence method — the methodological ladder (version 3)

Conversation between Pablo and Sumi, 17 October 2026 (version 1 in the morning; version 2 in the
afternoon, with the opening thesis, the step contracts and the project's own repository; version 3
with the name, the enriched contracts, the prompts in English, the guide by project size and the
guide by tool). This is a working document: we are going to keep elaborating it in several passes,
so nothing it says is doctrine yet. It is, simply, the first honest distillation of what we actually
did in three repositories that are in production today, with real people using them.

A note on style, because it matters: this document is written for people who did not live through
these projects. That is why it explains things calmly, repeats when needed, uses everyday language,
and has a **glossary** at the end with every acronym and every colloquial expression that appears.
If at some point you run into an odd word — "ratchet", "lock", "PND", "fail-closed" — go to the
glossary; it is all there.

This is the English version. Spanish is the source of truth; if the two disagree, the Spanish
version wins and this one gets fixed. The prompts for the model are identical in every language.

## The name

**Urazuke** (裏付け) is a Japanese word for the backing a claim has: what holds it up from behind
(literally, "the lining at the back"). The verb *urazukeru* means "to back with proof". Pablo chose
it on 17 October 2026 ("Let's go with Urazuke"), after the name check ruled out Hashigo, Kaidan and
Shōko because of collisions with existing companies and projects. The name is never translated;
the subtitle, "the evidence method", is: *el método de la evidencia*, *o método da evidência*, *la
méthode de la preuve*, *die Nachweis-Methode*, *il metodo del riscontro*, 裏付けの方法, 验证方法.
In this document, "the ladder" is the structure of the method — its sixteen steps — and "Urazuke"
is the whole method.

## What is this about?

Pablo put it clearly: he does not want to teach a tool, he wants to teach **the method**. The idea
is that anyone, with any artificial-intelligence tool that can program, can "vibecode" (that is,
build software by conversing with an AI instead of typing the code by hand) and that what comes out
is robust, ready for production, and — this is the important part — **without the project owner
having to review a single line of code**.

It sounds ambitious, and it is. But we have something almost nobody has: three real systems that
were built exactly this way and that work today with real clients. So the question is not "can it
be done?" but "what did we do, in what order, and which of all that is what really made the
difference?".

This ladder is the answer to that question. And it will serve as the basis for three things: the
method's documentation, the practice the students will do, and the manuals. Later on, we will also
export it as a "project execution flow" inside Forge, so that the tool guides the method instead of
one having to remember it.

## Where all this comes from (the sources)

I surveyed the three repositories read-only, touching nothing:

- **`[yujin-forge repository]`** (the Forge tool and, above all, the place where the method was
  born): 1,090 commits between 10 May and 14 October 2026. There are the standards-of-quality
  document (`docs/SQ.md`), the 31 doctrines in `docs/doctrine/`, the anti-pattern register
  (`docs/GOTCHAS.md`), the paper where the multi-agent crew was killed
  (`docs/PAPER_SUMI_VS_AGENTIC.md`), the director's frozen decisions
  (`docs/DIRECTOR_DECISIONS_2026_06_04.md`), the pending-registry plan
  (`docs/PENDING_REGISTRY_PLAN.md`) and the text of rules SQ 1 to 9 that Forge injects into the
  brain on every turn (`src/chat/server.ts`).
- **`[Authorizations repository]`** (the first production system, for a health entity): 469
  commits between 11 June and 9 October, 641 pending items and all of them closed. It includes the
  initial design document, the lessons learned on Google's cloud, several audits and the manuals.
- **`[Kikan repository]`** (the second production system, the Association's omnichannel service
  desk and campaigns): 442 commits between 21 August and 16 October, 37 tags, the AUD-* audit
  series, 19 pending-item documents, the persistence re-engineering document
  (`docs/REINGENIERIA_PERSISTENCIA_SQL.md`, with its stages E1 to E12 and the famous section
  11.b), continuous integration and deployment, and this week's two reports (integrity on
  14 October, quality on the 15th).
- My own memory of the corrections Pablo made to me over these months ("guarded meter", "measure
  the hypothesis", "validate with the log", "check which version is published first").

**On names.** The clients of the two production systems are anonymised: we call them "the Health
Fund" (with its "Authorizer") and "the Association", and their systems "Authorizations" and
"Kikan". The numbers, the dates and the commits are real; the names of the organisations are
withheld until we have their permission. The local paths of the source repositories appear as
`[… repository]`.

A convention that holds for the whole document: **every claim cites the commit or the document
where the evidence is**. And when something is my interpretation and not a verified fact, I mark
it with the tag `[hypothesis]`, so that what is proven and what I am proposing can be told apart at
a glance.

## AI does not interrupt the method: it continues it

This is the thesis that opens the document, and we put it first because it disarms the most common
objection before it appears: "how are you going to trust code written by a machine?".

The answer is that **the industry stopped trusting the author of the code twenty years ago**.
When the bulk of writing moved to junior, outsourced or rotating teams, line-by-line review became
impossible to sustain. And what grew in its place is everything we now take for granted: automated
tests, continuous integration, acceptance criteria, pipelines that let nothing through without
green, the "shift left" of testing, quality control as an independent function. That was systems
engineering's answer to "the one who writes is not trustworthy": do not read their code, demand
evidence from them.

So putting an artificial-intelligence model to write is not a leap into the void. It is swapping an
author we no longer trusted for another we do not trust either, and for whom **we already had the
verification apparatus built**. That should reassure, not worry. And on top of that the new author
is cheaper, faster, and — unlike the junior — does not take offence when you ask it to prove red.

That is why this method leans, without disguise, on classical systems engineering. The skeleton is
the usual one: survey, requirements, sizing, design, construction, testing, deployment, operation,
audit. It could not be otherwise, because the problems are the usual ones: not knowing how much
data there will be, not knowing what the client wants, not knowing whether what was built is what
was asked for. AI did not change the problems; it changed who does each part and at what cost.
Even the eligibility criterion X2 (see step 0) is classical engineering: testability as a condition
of the contract.

### What is old and what is new in this

The old, which it is worth saying is old: the skeleton of stages, the independence of the one who
verifies from the one who builds, tests as evidence, documentation as part of the product, the
survey before the design.

What does change, and it is where our part is, are three things:

1. **Where the human's effort goes.** In the classical method the human writes the specification,
   writes the code, and another human reviews it. Here the human does only two things: **decides,
   and verifies artefacts**. Everything else — drafting, building, testing, measuring, documenting
   — the model does. That is why every step ends in a "completeness check without reading code":
   it is the exact place where the human remains indispensable, and no other.

2. **The author also manufactures the evidence.** This is the only genuinely new point, and it is
   the nuance that justifies three whole steps. The junior wrote dubious code, but did not
   manufacture the evidence: the tests and the measurements were built by someone else, or at
   least someone else looked at them. The model, on the other hand, produces the code *and* the
   test *and* the meter *and* the report, in the same session, with the same confidence in its
   voice when it is right and when it is wrong. We saw it: the meter that lied twice, the
   authentication error reported as "success", the three out of four claims that were wrong. So
   "review evidence instead of code" is still the right principle, but **the evidence has to prove
   itself**: the test seen red (step 7), the instrument with its guard (step 9), the report that
   separates verified from believed (step 10), the auditor different from the builder (step 11).
   It is not a new worry: it is the same discipline of quality-control independence, taken one step
   further in.

3. **The cost of artefacts.** In the classical method documentation was expensive, so it was done
   once and it aged. Here regenerating it is free, so the rule becomes "in the same commit" and
   "reproducible by hand, without AI". What used to be an unattainable ideal becomes a gate.

For the course and for the public presentation, this defines the positioning honestly: it is not
"the new way of programming"; it is **systems engineering applied to a builder that does not get
tired and cannot be believed**. To those coming from systems it sounds familiar and lowers their
distrust ("you already know how to do this"); to those coming from vibecoding it gives what they
lack, which is precisely the skeleton. And it sets us apart from the tools that sell speed and
leave out the whole skeleton.

---

## Part A — Survey: the moments and milestones that mattered

### A.1 yujin-forge: where the method was born (May to October 2026)

There is something fundamental to say up front, because it changes how everything else is read:
**the method was not designed first and applied afterwards**. It was the other way round. Every
rule was written *after* a blow, in the same repository where that blow was suffered, and often on
the same day. No doctrine was born in the abstract, in a whiteboard meeting. All of them have an
incident behind them and a birth commit. This is, I think, the most honest and the most valuable
thing we have to tell.

Here is the sequence, in order:

| Date | Moment | What changed in the method | Evidence |
|---|---|---|---|
| 25 May | The SQ (standards of quality) are born | It is the first "working agreement" between the human and the agent. It says things like: the human's time is sacred; no technical debt (what breaks is fixed at the root); everything in ASCII; documentation always up to date; and the exact scope, no more and no less than what was asked. | `2219f7a docs: add SQ.md` |
| 27 May | First GOTCHAS register | Recurring mistakes start being written down in a fixed format: how it smells, what the root cause is, how it was fixed, and how to detect it next time before it hurts. | `73f4029` (gotchas doc) |
| 2 June | Gates and G-DOC, injected only when relevant | The explicit gates of the workflow appear, numbered G1 to G9. And a clever detail: the doctrine enters the agent's prompt only at the moment it applies, not always, so as not to waste context. | `5b47475` |
| 4 June | The testing policy is reformulated | Until then "test first, code after" (TDD) was insisted on for everything. It turns out not to work universally: by default tests come *after* implementation, TDD remains an option for small, well-defined scopes, the skeleton must be green as a gate, and a loop protection is added (when the agent goes round in circles without progress, a modal stops everything). | `a9f59c7`, `docs/doctrine/testing-policy.md` |
| 4 June | The director's decisions are frozen | Before a sprint, three decisions are written down and numbered (D1, D2, D3). Here the practice of "the decision is written before building" is born. | `docs/DIRECTOR_DECISIONS_2026_06_04.md` |
| 5 June | REDESIGN: the multi-agent crew is killed | This is a huge moment. There was a crew of five agents (director, analyst, programmer, tester, scaffolder) passing work among themselves. A measured experiment was run: that crew spent 60 dollars and 73 minutes and delivered something half done; a single session with a single agent took 90 minutes and delivered something publishable. The whole crew was removed. It is the first case of "retrospective with a number in hand, and redesign". | `7584f8b`, `docs/PAPER_SUMI_VS_AGENTIC.md` |
| 6 June | Pending-items register | The work plan becomes THE pending-items list: a canonical queue, with commands to manage it, refreshed every session. There is no longer a "plan" on one side and "tasks" on the other. | `4fc82c6`, `docs/PENDING_REGISTRY_PLAN.md` |
| 10 June | Mandatory doctrines + verification honesty + workflow kinds | Doctrine stops being optional: it goes as a mandatory block in every prompt. "Verification honesty" is born: verify that the net really turns red when it should, declare blind spots, and make claims proportional to what was checked. And three kinds of workflow are separated: new project (greenfield), correction, and evolution. | `7ab9d8a`, `2c552c0`, `docs/doctrine/verification-honesty.md`, `workflow-kinds.md` |
| 14 to 21 June | 24- and 48-hour autopilots | The agent works alone for a day or two under a written mandate: commit and push per piece, without asking, and the human receives a summary. It is proven that the method holds up under long autonomy. | memory `feedback_autopilot_mandate`, `project_autonomous_multisession_interrupt` |
| 5 and 10 July | Concurrency scale and diagnostic mode | The agent enters other people's production systems in diagnostic mode: read-only, bounded, touching nothing. | `docs/doctrine/diagnostic-mode.md` |
| 22 July | Performance hardening | Scale patterns are extracted from the Health Fund's system (for example, the two-transaction one; and "measure before touching"). For the first time the method feeds on a system that is already in production. | `873339c` |
| 14 August | Forge Embed live in the Health Fund's production | The agent becomes RESIDENT inside the client's system: with a mandatory system map, with the rule "operational solution first", and with the ability to open tickets. | the memory of the resident assistant in production |
| 10 and 11 October | Operate mode + sizing (G9) | Sizing is done before building, choosing among fixed options, and the sizing is recorded as one more gate. | `c602725`, `0bd1b05`, `docs/doctrine/sizing.md` |
| 13 October | Persistence interface | An "asymmetric" decision (it costs little if you are wrong, it costs a great deal if you do not make it): the interface to the database is asynchronous from line one, even if the first engine is synchronous. Changing it later cost a whole stage of the re-engineering (E6: three test suites). | `7391cc5`, `docs/doctrine/persistence-interface.md` |
| 14 October | The orphan turn of 1 hour 43 → version 1.18.0 | A failure of the method, and an ugly one: the agent worked for an hour and forty-three minutes invisible to the human, and made six commits in that time. It was fixed at the root: a silence watchdog, a leash between processes, and 28 tests. | `b80a659`, CHANGELOG 1.18.0 |

What does this table say? That in five months the method went from "rules of courtesy" (the SQ,
which are almost manners of coexistence) to "measured gates" (sizing, query budget, verification
honesty). And that every step has a birth date and a blow that justified it. That is what makes it
teachable: it is not theory, it is scar tissue.

### A.2 Authorizations: the method under real load (June to October 2026)

This was the first system with real users, with money at stake and with health data. It has 641
pending items, all closed. And something different happened here: the method learned to
**operate**, not only to build. It is one thing for a system to work when you test it yourself;
quite another for it to keep working at three in the morning with a robot approving orders.

| Date | Moment | What it contributed | Evidence |
|---|---|---|---|
| 11 June | Start with a design document ("option C") | There was an initial specification. And the repository "overtook" it very quickly: what was built was far more than what the paper said. Lesson: the specification is worth having as a starting point, but the living plan is the pending items. | the initial design document |
| 23 June | Audit of queries without an index | The first audit of "full scans" (queries that read the whole table because there is no index) on a live system. And the findings become pending items, not a report that gets filed. | audit document of 23 June |
| 24 June | Lessons learned on Google's cloud | Infrastructure mistakes are written down as lessons so they are not repeated. | GCP lessons document |
| 26 June | User manual | The manual is born together with the system, not at the end when nobody remembers anything. | manual of 26 June |
| 13 July | Second-layer backup | Two layers of backup before trusting the system: one local and another in Google's storage. | backup layer 2 commit |
| 14 July | The PND-300 saga (four rounds of root cause) | A bug that came back three times until the real cause was found. Here "the fix is at the root or it is not a fix" stops being a nice phrase and becomes mandatory practice. | PND-300 |
| 16 July | Security audit | Security is treated as a periodic audit that generates pending items, not as a checklist ticked once at the beginning. | audit document of 16 July |
| 26 and 29 July | RPAForce internal manual + disaster recovery manual | Everything operational (deploying, recovering, maintaining) is documented "reproducible by hand, without AI". If tomorrow there is no agent, a person can follow the manual. | `6444ce6 (pnd442)`, `a30cee3 (pnd459)` |
| 27 July | "Fail-closed" as a reflex | If a table does not exist or a lookup fails, the row simply shows without its button; the whole listing never breaks. On doubt, do not act and do not break. | `e18406d (pnd452)` |
| 6 and 7 August | Counters verified against production (1,355 versus 1,234) | This is, for me, the most complete example of "verify with an instrument". A counter showed 1,355 approvals and the query showed 1,234. The root cause was verified directly on production (read-only), the difference was broken down number by number (145 too many, 24 too few, 145 − 24 = 121), a test was written and proved RED against the old criterion, and the diagnostic script stayed in the repository for next time. | `ab3e529 (pnd517)`, `1f5feb9 (pnd514)` |
| 6 August | Producer/consumer symmetry live | The "reason for waiting" the user sees is computed with the SAME gates the robot decides with (rule SQ 7); and the list of columns is defined by the server and consumed by the frontend. That way they cannot diverge. | `50fe968 (pnd510)`, `7251129 (pnd509)` |
| 7 August | Panic button with a dedicated lock | Locks: double safety, dry-run mode for the auto-approver, a watchman that pushes with guards. | `0954740 (pnd524)` |
| 10 August | Domain rules written in the commit | Verbatim: "rule from Pablo: approved + balance = back", "Pablo's decision 2026-08-10". The business decision is kept with date and owner, next to the code that implements it. | `0ae3ae6 (pnd550)` |

What does this say? That in this repository the method earned its OPERATIONAL steps: fail-closed,
locks, backups, manuals a person can follow without AI, periodic audits, and verification against
production with an instrument rather than by eye.

### A.3 Kikan: the mature method (August to October 2026)

The second production system, and the first built with everything above already written from day
one. Here the steps of **measurement** and of **continuous integration and deployment** appear: it
is the repository where, for the first time, measuring systematically comes before building.

| Date | Moment | What it contributed | Evidence |
|---|---|---|---|
| 21 August | Start | The project starts with an operational `CLAUDE.md` (the file the agent reads when it starts) and with pending items as the plan from day one. | first commit |
| 28 and 29 August | AUD-* audit series → 19 pending-item documents | An early, systematic audit that turns directly into the work plan. | PND documents of 28 and 29 August |
| 28 August | Continuous integration (CI) | Tests run on GitHub from the first week. | `ci.yml` |
| 23 and 24 September | Deployment + configuration only on the server + Node 22 pinned | Deployment is a package; configuration lives in the environment, not in the repository; and the runtime version is pinned. | `deploy.yml`, `bb801ed` |
| 30 September to 4 October | Deployment hardened blow by blow | The public URL in both environments; reload the service before restarting and before rolling back; a fixture that RECONCILES instead of duplicating; the client's material outside the mirrored tree. Five pending items in a row on the same thing: deployment discovered late charges its price. | `f85c3c9`, `513c8d0 (PND-108)`, `076df76 (PND-134)`, `9d76af8 (PND-130)` |
| 3 October | Isolate the configuration | The test suite no longer dirties the configuration that travels in the deployment. | `0bd20a8 (PND-107)` |
| 4 and 8 October | Promotion from UAT to PROD | An explicit circuit to move configuration and campaigns from the test environment to production. | `4eb5ad7 (PND-027)`, `7658e2e` |
| 11 October | RE-ENGINEERING, stage 1: the schema derived from the CODE, with a lock | The inventory of tables and fields is derived from the code itself, with a test that protects it, and it is opened on the board (the shared board with Pablo). | `6113319`, `68819ce` |
| 11 to 13 October | Stage 6: the static ratchet, three suites moved to asynchronous | The "ratchet" is a counter of database calls without `await` (without waiting for the result), which can only go down, never up. And something great to tell happened: it was discovered TWICE that the meter did not see parts of the code (70 calls, and later 84, with the counter at zero). | `06b2734`, `f6e5221`, `2fc6239`, `1d55a93` |
| 13 October | Meters that lied | Verbatim from the commits: "the E7.5 meter lied on a database with the ALTER already applied"; "there are 44, not 27". The method learns something new: **the instrument must be verified too**. | `880ac0f`, `f955620` |
| 14 October | Stage 8: the switch, the query budget and the re-entry guard | The database-engine switch is a per-environment toggle; every path of the application has a query budget, measured and protected by a test. | `5926b3f`, `10ada00` |
| 14 October | Stage 9: the ceiling is tightened to the measured value (63 over 60) | The budget is not an invented number: it is what was measured plus a small margin. | `0730082`, `7f5f1af` |
| 14 October | Section 11.b: the five rules | A guarded meter; build the instrument if it does not exist; audit in both directions; mark what is approximate; and the one who executes verifies the one who planned. With a sentence that says it all: "three out of four claims were wrong; where there was an instrument, exact". | `docs/REINGENIERIA_PERSISTENCIA_SQL.md` 11.b |
| 14 October | Stages 10 and 12 + external integrity | The REAL package carries the migration scripts; data retention is declared per table and bounded in production; and an integrity report by a third party (me, Sumi) that Forge absorbs as pending items. | `f72b15a`, `b266f11`, `INTEGRIDAD_..._10_14.md` |
| 14 October | Deployment only packages (gate-ci) | Tests run ONCE (in CI); the deployment waits for that result and packages. From 16-27 minutes per commit to 11. | `39497b0` |
| 15 October | PND-223 withdrawn within 24 hours / PND-257 | Two administrator doors were created in a single day. An external review caught it; one was withdrawn and a single path remained. The method supports "undo quickly" without drama. | `69bdab2`, `20fdbe7`, `1558ee4` |
| 15 October | Quality audit | Grades per dimension; a known vulnerability in a dependency; a 2,679-line component; a 9,661-line `CLAUDE.md`. Input for the next plan. | `AUDITORIA_CALIDAD_CODIGO_2026_10_15.md` |

What does this say? That Kikan is the first repository where MEASUREMENT precedes construction
systematically (sizing, ratchet, budget), and where deployment and continuous integration are
treated as part of the product and not as paperwork.

### A.4 The patterns that repeat in the three repositories

If one looks at the three repos together, there are ten things that appear over and over. These
are, at bottom, the method:

1. **Blow → rule written the same day.** No doctrine was born in the abstract. Each has a birth
   commit and an incident behind it.
2. **The plan is the pending items.** Numbered items (PND-nnn) in the three repos; the
   specification is the starting point, the queue of pending items is the truth.
3. **The decision is written next to the code, with owner and date.** "Rule from Pablo", "Pablo's
   decision 2026-08-10", the director's decisions, and in Kikan the "decision by omission" (when
   Pablo did not answer and the agent chose, it left it marked as such).
4. **The test is proved red.** It is not enough for it to be green: it has to be shown that the
   test fails against the old code. If you never saw it red, you do not know whether it tests
   anything.
5. **Measure with an instrument, and verify the instrument.** A script with a test that lives in
   the repo; the meter lied twice and the meter was fixed before the code.
6. **Fail-closed and locks.** Nothing breaks silently; on doubt, do not act.
7. **Periodic audit → pending items.** Full-scan in June, security in July, AUD-* in August,
   integrity and quality in October. The audit is not a report: it is plan.
8. **Documentation and manuals are born with the system**, and maintained in the same commit as
   the change.
9. **The agent operates inside the system** (diagnosis → operation → resident) with bounded
   permissions and approvals; the human approves, does not type.
10. **Retrospective with a number → redesign.** The multi-agent crew was killed with 60 dollars
    and 73 minutes versus 90 minutes; the deployment was split with 16-27 minutes versus 11; and
    this ladder itself is exactly that.

And now the failures, because without them this would be propaganda and not a survey: the orphan
turn of one hour forty-three (14 October); an authentication error reported as "success"; two
administrator doors in 24 hours; 23 pushes in one day that burned the GitHub Actions quota; the
database key printed in a transcript; a `CLAUDE.md` that turned into a 9,661-line changelog; the
Forge mobile app losing its tabs; and the meters that lied twice. All of that happened. And all of
it is in the ladder, because that is where the steps come from.

---

## Part B — The ladder, version 3

### How to read each step

Each step has seven parts, always the same, so that they can be compared:

- **Intention**: what it seeks, in one sentence.
- **Inputs**: what has to exist beforehand in order to climb it.
- **Artefact**: what is left written or executable once it is climbed. Always something concrete:
  a file, a test, a script.
- **Gate**: what has to be true to move to the next one. If it is not met, you do not climb.
- **Who decides**: the project owner, the agent, or nobody because it is automatic.
- **Failure it prevents**: the real blow that originated it. This is what makes it credible.
- **Evidence**: the commit or document where it is.

Two important clarifications. First: **the ladder is neutral with respect to the tool**. Every
artefact is a file, a test or a script; none requires Forge. Forge automates them (the gates, the
commands, the pending-items register), but the step exists without Forge. Second: **the steps are
not strictly sequential**. There are three phases: steps 0 to 4 are the start and are climbed once
per project; 5 to 10 are the loop that repeats with every change; and 11 to 15 are operation, once
the system is alive. Step 15 closes the cycle and returns to 0 for the next project.

### How each step is executed: the contract

The seven-part card says what each step seeks and what it leaves. But a step is fully understood
only when you see **how it is asked for, what has to come back and how I know it came back
complete**. That is why each step has, besides the card, a **contract** in its own file inside
`peldanos/`, always with the same five sections:

1. **Required context** — named generically ("volume data survey", "read access to the previous
   system", "the list of consequential actions"), without going down into the detail of systems
   engineering. Surveys are incomplete by nature; we do not try to make them complete with a form.
2. **Prompt(s)** — what is given to the model, verbatim. The opening one and, when the step is a
   conversation, the closing one. All carry the same clause, which is the heart of the matter: *the
   model evaluates whether the context is enough; if it is not, it asks for everything missing
   before going on; and it does not estimate or invent a fact only the business has*. The one who
   knows what is missing in order to compute is the model, not a form.
3. **Expected result** — the detailed characteristics of the artefact: which file, which sections,
   what each must contain, what cannot be missing.
4. **Completeness check** — the list of checks the owner does on the artefact, **without reading
   code**. If one comes out "no", the step is not climbed.
5. **Warning signs** — two or three symptoms that the step was climbed badly even though it looks
   climbed. They are the ones seen weeks later, when it already hurts.

And in the header of each contract, besides the phase and the form, the **size**: whether the step
is mandatory in every project or proportional, and what "proportional" means in a small one.

**The prompts are in English.** It is a decision (D-013) and it has three reasons: the same content
in Spanish takes between 30 and 50 % more tokens; the models' instruction-following is better
calibrated in English, so an English prompt tolerates brevity better without becoming ambiguous;
and the vocabulary of the trade (test, commit, rollback, mock) is English. Under each prompt goes
the explanation, in the reader's language, of what we are asking for and why each clause is there:
the prompt is a single piece identical in the eight versions of the document; the explanation is
what gets translated. And all of them end with "Reply in my language", because the prompt is in
English but the conversation need not be.

Those sixteen contracts are, moreover, what later gets exported to Forge: today Forge injects a
doctrine when a gate is crossed; the step contract *is* that doctrine, and the prompt *is* what is
injected. Writing them for the course and writing them for the Forge flow is the same work.

### What is mandatory and what is proportional, by project size

A question that comes up at once: "all this for a small system?". The answer is that sixteen steps
are not sixteen weeks; several are climbed in an hour, and the proportional ones shrink with the
project. What does not shrink is the list of those that are not negotiable. This table is a
`[hypothesis]` proposal to be confirmed with the first project that uses the method end to end:

| Step | Small project (one owner, few users, no money at stake) | Project with users and consequences |
|---|---|---|
| 0 Eligibility | mandatory (one hour) | mandatory |
| 1 Agreement | mandatory (half an hour) | mandatory |
| 2 Definition | mandatory, fifty lines are enough | mandatory |
| 3 Sizing | mandatory, half a page and one decision | mandatory, complete |
| 4 Skeleton | mandatory if it will have users | mandatory |
| 5 Pending items | mandatory | mandatory |
| 6 Decisions | mandatory | mandatory |
| 7 Tests proved red | mandatory | mandatory |
| 8 Symmetry | the rule yes; the map, optional | mandatory with map |
| 9 Measure | proportional: count and write down | mandatory, with meters and budgets |
| 10 Honest verification | mandatory | mandatory |
| 11 Audit | one, before production | periodic |
| 12 Fail-closed | optional if read-only | mandatory |
| 13 Integration and deployment | minimum: tests run alone, configuration outside, rollback | mandatory, complete |
| 14 Documentation | minimum: recovery | the three manuals |
| 15 Resident and retrospective | one-page retrospective | both |

In short: there are nine steps that are not negotiable in any project (0, 1, 2, 3, 5, 6, 7, 10 and
the retrospective of 15), and seven that are sized with the project.

### How it is used with any tool

The method is tool-neutral; what changes from one tool to another is **where each artefact goes**
so that the model reads it. The correspondence, for the most used tools as of late 2026:

| Method artefact | Claude Code | Cursor | Codex CLI / Gemini CLI | Forge |
|---|---|---|---|---|
| Working agreement (S1) and routines (S5, S6, S7, S8, S10, S14) | the project's `CLAUDE.md` | `.cursor/rules/` | `AGENTS.md` / `GEMINI.md` | doctrines injected per gate |
| Project definition (S2) | `CLAUDE.md` + `docs/STATUS.md` | same, in rules and docs | same | `PROJECT.md` + `.forge/sumi-context.md` |
| Pending-items register (S5) | `docs/PENDING.md` or issues | same | same | native pending register with verbs |
| Step prompts (all) | pasted into the chat when climbing the step | same | same | injected when the gate is crossed |
| Gates (S4) | `docs/GATES.md`, manual | same | same | G1 to G9, automatic |
| Meters and budgets (S9) | scripts in the repo with tests | same | same | same, plus the static ratchet |

The Forge column is the one that automates the most; the other three work just as well if the
owner does by hand what Forge does by itself: paste the step's prompt at the right moment and demand
the completeness check before moving to the next. That is, in fact, the practice of the course.

### Step 0 — Can this project be run this way? (eligibility)

This step has a particular history. Pablo said it on 17 October: there is something prior to
everything, which is in no repository because it always arrived already decided — the decision of
**whether a project is to be run with this method or not**. It is a criterion that lived in his
head, and that we are going to elaborate together. So everything that follows in this step is partly
confirmed by him and partly my hypothesis to start the conversation. I distinguish them carefully.

- **Intention**: to decide whether a project is to be run with this method, and with an agent at
  the front, or not, BEFORE opening the repository. Because if you enter a project that does not
  qualify, the method degrades into "programming with AI" and then the owner does end up reading
  code.
- **Inputs**: the client's request, the business domain, the data, the technology, the available
  environments, and who the owner will be.
- **Artefact**: a one-page eligibility sheet, with the criteria scored and the decision: go, no-go,
  or go under conditions.
- **Gate**: the exclusionary criteria are all green, and the score of the weighted ones exceeds the
  threshold (a threshold we have not yet defined).
- **Who decides**: today, Pablo. The idea is that the method lets another person decide it with the
  same sheet.
- **Failure it prevents**: getting into a project where the agent cannot verify itself, or where
  there is no domain owner who decides, and ending up with the human reviewing code line by line.
- **Contract (how it is executed)**: `peldanos/peldano-00-elegibilidad.md`.

**The two exclusionary criteria Pablo confirmed (17 October).** And mind this detail, which I
find very fine: they come from the projects Pablo *rejected*, not from the ones he accepted. The
"no"s define the boundary better than the "yes"es.

| # | Exclusionary criterion | Pablo's words, verbatim (translated) | Why it kills the method |
|---|---|---|---|
| X1 | Legacy technology without an accessible repository, or with repositories that do not follow a standard | "Legacy technologies without an accessible repo or with non-standard repos" | Without a standard repository there is nowhere to leave the evidence: no pending items cited in commits (step 5), no tests travelling with the code (7), no integration and deployment as a package (13), no documentation in the same commit (14). The agent works blind and leaves no verifiable trace. |
| X2 | Technology that cannot be tested end to end: the screens cannot be driven and every element of the interface reached with its various methods, verifying that the change reached the backend | "We cannot test end to end from the screen validating the changes in the backend"; and later: "NAC3 is not mandatory. YES to testing from the execution of the screens and access to every element of the interface with its different methods" | Without that screen-to-backend verification the agent cannot test itself (steps 7, 9 and 10), and so the owner would have to read code — which is precisely what the method promises to avoid. |

A precision Pablo made that is worth gold for tool neutrality: **NAC3 (the protocol Forge uses so
that screens can be driven programmatically) is NOT a condition; it is the means by which we
achieve it today**. The neutral criterion is: the interface can be driven programmatically, and
every element of the screen is accessible with its various methods (click, type, read its state),
so that a test can walk through the screen and then verify the effect on the backend. A technology
whose interface does not expose its elements to a "driver" (such as Playwright, for example) is
out, even if it has a repository.

And a reading of mine on these two: at bottom they are **the same condition seen from two
sides**. The agent has to be able to verify itself, end to end, and leave the evidence in the
repository. X1 is the half "where does the evidence go?"; X2 is the half "how is the evidence
produced?". That turns two of my hypotheses below (D3 and D8) into consequences of X1 and X2, not
separate criteria.

`[hypothesis]` **Candidate criteria I see in the three cases.** These must be confirmed, weighted
and completed with Pablo; the ones in his head are surely missing.

| # | Candidate criterion | How it showed in the cases | Exclusionary? |
|---|---|---|---|
| D1 | There is a domain owner with judgement and with time to decide (not to program) | Pablo in all three; "rule from Pablo", "Pablo's decision" with date | `[?]` |
| D2 | There is an "oracle" of verifiable truth: real data, an external system, production read-only | The Health Fund's Authorizer as oracle (the 1,355 versus 1,234 case); production read-only | `[?]` |
| D3 | The agent can test alone: access to test environments, continuous integration, test data | UAT in both of the Association's projects; an anonymised data seeder (pnd511) | absorbed by X2 |
| D4 | The technology is within what the agent masters without inventing (Node, Python, SQL, React) | all three | `[?]` |
| D5 | An error has real consequences (money, health, operations), which justifies fail-closed | the Health Fund (health, charges), the Association (families) | `[?]` |
| D6 | The volume can be known from day one (sizing G9) | Kikan: 3.4 million rows per year; the Health Fund: 7,819 rows | `[?]` |
| D7 | The client tolerates a maturing period and a human in the loop (not everything automatic on day one) | the auto-approver with dry-run mode; the human in the loop at the Health Fund | `[?]` |
| D8 | New project, or legacy but auditable (if there is legacy: it is audited first, and zero "fallback" to the legacy) | SQ 0.2; Forge's migration tool | absorbed by X1 |
| D9 | The scope fits in one repository and one owner (no coordination across several teams) | all three | `[?]` |
| D10 | Secrets and access can be isolated (vault, environment file, bounded permissions) | `forge-embed.env`, the API key mapped to its creator | `[?]` |

**Questions to elaborate together**: of D1 to D10, which more are exclusionary and which weigh?
What weight does each have? Which other projects did Pablo reject and why? And, very important, are
there business criteria (margin, relationship with the client, Pablo's available time) that come
from no repository and that also decide?

### Step 1 — The working agreement (the rules before the code)

Before writing a single line, human and agent agree on how they are going to work. It looks like a
formality, and it is not: it is what prevents 80 % of the frustrations of month one.

- **Intention**: to set how the human and the agent work before the first line of code.
- **Inputs**: nothing; it is the project's first file.
- **Artefact**: a standards-of-quality document (in Forge it is called `SQ.md`, but it can be
  called whatever you like) saying, at minimum: the human's time is sacred (it is not spent on
  things the agent can resolve alone); zero technical debt, that is, when something breaks it is
  fixed at the root and the regression is added in the same session; the scope is exact, no more
  and no less than asked; the user's language is spoken; the documentation is updated in the same
  commit; and nothing is ever announced as done that was not done.
- **Gate**: the agreement is in the repository and is read every session.
- **Who decides**: the owner. The agent can propose changes, but does not edit the agreement on its
  own.
- **Failure it prevents**: the agent that "helps" by expanding the scope because it seemed a good
  idea; the one that leaves debt "for later" (and later never comes); and the one that reports as
  done what it *believes* it did.
- **Evidence**: `2219f7a` (25 May); rules SQ 1 to 9 in `src/chat/server.ts`; `docs/SQ.md`,
  sections 0.1 to 0.11.
- **Contract (how it is executed)**: `peldanos/peldano-01-contrato-de-convivencia.md`.

### Step 2 — The project definition and mandatory reading

Every agent session starts from zero: it does not remember yesterday. So you have to give it a map,
and you have to force it to read it before touching anything.

- **Intention**: that every session starts knowing what the project is, what state it is in and
  which decisions have already been made.
- **Inputs**: the agreement (step 1) and the client's request.
- **Artefact**: an operational project file (`PROJECT.md` or `CLAUDE.md`), and here an emphasis:
  SHORT. It is the programme, not the history. Plus a living-state file (in Forge,
  `.forge/sumi-context.md`) with the current specification, the slice being worked on, the recent
  decisions and the open doubts. And a decision memory.
- **Gate**: the agent reads the map before touching code. In Forge this is an explicit rule: "read
  the knowledge graph first".
- **Who decides**: the owner defines; the agent keeps it up to date.
- **Failure it prevents**: two, very concrete ones. One: throwaway work from not having read the
  map (it happened to me on 12 June and cost an afternoon). Two: Kikan's `CLAUDE.md` that grew to
  9,661 lines and 789 kilobytes, impossible for anyone to read — the operational file and the
  casebook have to be different files.
- **Evidence**: SQ 1.1 (mandatory reading); memory `feedback_read_knowledge_graph_first`;
  `AUDITORIA_CALIDAD_CODIGO_2026_10_15.md`.
- **Contract (how it is executed)**: `peldanos/peldano-02-definicion-y-lectura.md`.

### Step 3 — Size before designing the architecture

This is the step that costs the most to skip, and we know it because we skipped it.

- **Intention**: that structural decisions (which database engine, whether the interface is
  synchronous or asynchronous, how much concurrency) are made with numbers and not with taste.
- **Inputs**: a volume data survey done with the business (entities, events, operators at peak,
  retention, exceptional loads), incomplete by nature; and read access to the previous system if it
  exists. There is data that **only the business has** and the model cannot infer: that is why the
  prompt demands that it evaluate whether it is complete and ask for what is missing, instead of
  estimating it with a confident face.
- **Artefact**: a sizing record with FIXED options (not an open list: three or four concrete
  options) and the chosen one. In Forge it is gate G9. And the "asymmetric" decisions declared
  explicitly — for example, "the persistence interface is asynchronous from line one even if the
  first engine is synchronous", because if you are wrong it costs little and if you do not do it it
  costs a fortune.
- **Gate**: the sizing is recorded before building the skeleton.
- **Who decides**: the owner chooses among the fixed options; the agent presents them with numbers.
- **Failure it prevents**: Kikan's. It started with storage in JSON files, and when it was measured
  it turned out the system would generate 3.4 million rows per year. Changing the persistence
  interface afterwards cost stage E6 of the re-engineering: three whole test suites moved to
  asynchronous, more than a week.
- **Evidence**: `0bd1b05` (sizing, 11 October); `7391cc5` (persistence interface, 13 October);
  SQ 1.2 and 1.3; `docs/doctrine/sizing.md` (the "four holes", plus the fifth).
- **Contract (how it is executed)**: `peldanos/peldano-03-dimensionar.md`.

### Step 4 — The skeleton with its gates

Before the system does anything useful, it has to start, be tested and be deployed EMPTY. Yes,
empty. Because discovering deployment at the end is very expensive.

- **Intention**: to have a system that starts, is tested and is deployed with no functionality yet.
- **Inputs**: the sizing (step 3) and the kind of workflow (new project, correction, or evolution of
  something that already exists).
- **Artefact**: the skeleton with continuous integration green, the test structure built, a
  deployment to a test environment that works, and gates G1 to G9 declared.
- **Gate**: the skeleton is green, continuous integration runs, and the deployment to the test
  environment works with zero functionality.
- **Who decides**: the agent executes; the owner approves visually (with a screenshot or an
  automated test that produces one).
- **Failure it prevents**: in Kikan the deployment arrived on 23 September, a month after the start,
  and between 30 September and 4 October there were five pending items in a row just to make the
  deployment work properly. If the skeleton had been deployed empty in the first week, those five
  blows would have landed with zero functionality at stake.
- **Evidence**: `docs/doctrine/gates.md`; `workflow-kinds.md` (new project, steps 6 of 18); the
  testing policy, "scaffold gate green"; Kikan's `ci.yml`, 28 August.
- **Contract (how it is executed)**: `peldanos/peldano-04-esqueleto.md`.

### Step 5 — The plan is the pending items

Here is an idea that, once you grasp it, you never let go of: there is no "plan" on one side and
"task list" on the other. **The pending-items list IS the plan.**

- **Intention**: a single work queue, ordered and gated, that is the truth of the project.
- **Inputs**: the initial specification, the audits, the client's requests, and the blows.
- **Artefact**: a register of numbered pending items (PND-001, PND-002…), each with a title, a
  status, the decision that originated it and the test that closes it. And every commit cites its
  pending item.
- **Gate**: no change goes in without a pending item; and the item is closed with evidence, not with
  "done".
- **Who decides**: the owner prioritises; the agent proposes and executes in order.
- **Failure it prevents**: the specification that is "overtaken" and goes stale within two weeks
  (it happened to Authorizations with its initial design document); and the work that, six months
  later, nobody knows why it was done.
- **Evidence**: `4fc82c6` (6 June); `docs/PENDING_REGISTRY_PLAN.md`; 641 pending items in
  Authorizations; 19 pending-item documents in Kikan; memory `project_pending_registry_is_plan`.
- **Contract (how it is executed)**: `peldanos/peldano-05-pendientes.md`.

### Step 6 — Decisions are written next to the code

Every business rule and every structural decision has to have an owner, a date and a place where
it is written. Otherwise, in six weeks nobody knows whether "approved plus balance goes back to the
queue" was a client decision or an agent's idea.

- **Intention**: that every domain rule or structural decision has an owner, a date and a place.
- **Inputs**: the conversation with the owner.
- **Artefact**: the decision written in the commit, in the pending item's document, or in a
  decision register. And when the owner did not answer and the agent had to choose, it is marked as
  "decision by omission" so that it can be reviewed.
- **Gate**: a business rule does not enter the code without its originating sentence.
- **Who decides**: the owner. Always. No exceptions.
- **Failure it prevents**: arguing six weeks later about why something is the way it is; and, worse,
  the agent inventing domain rules because they seemed reasonable.
- **Evidence**: `0ae3ae6 (pnd550)`, with the text "rule from Pablo" and "Pablo's decision
  2026-08-10" inside the commit; `docs/DIRECTOR_DECISIONS_2026_06_04.md`; SQ 7 (decision memory).
- **Contract (how it is executed)**: `peldanos/peldano-06-decisiones.md`.

### Step 7 — Tests as locks, proved red

A test you never saw fail, you do not know whether it tests anything. That is why the rule here is
not "write tests"; it is "prove that the test turns red against the old code".

- **Intention**: that every behaviour that matters has a test that FAILS if it breaks, and that it is
  known, with certainty, that it fails.
- **Inputs**: the change already implemented (by default tests come after implementation; "test
  first" remains an option for small scopes).
- **Artefact**: the new test, plus the regression of the neighbouring pending items run in the same
  session. And in the commit, verbatim: "proved RED against the old criterion", "verified RED 4 of
  8".
- **Gate**: red demonstrated → green → regression green. And the agent does not mock itself (it does
  not replace with simulations the very parts it wants to test).
- **Who decides**: the agent executes and reports; the owner does not review the test, reviews the
  report.
- **Failure it prevents**: tests that pass because they test nothing; and the green that hides a
  bug — it happened to us that a whole suite "died" from lack of memory and looked like a failing
  test (`1d7a20b`).
- **Evidence**: `docs/doctrine/testing-policy.md` (4 June); `ab3e529 (pnd517)`; `0ae3ae6
  (pnd550)`; `e18406d (pnd452)`, "red without the try/except".
- **Contract (how it is executed)**: `peldanos/peldano-07-tests-en-rojo.md`.

### Step 8 — Producer/consumer symmetry, and the anti-pattern register

When you change one end (the server, the robot, the database schema), the other end (the screen,
the counter, the consumer) has to change in the same commit. Otherwise, sooner or later they
diverge, and the user sees one number on one side and another number on the other.

- **Intention**: that a change at one end drags the other, always, in the same commit.
- **Inputs**: any change of contract between two parts of the system.
- **Artefact**: the server defines the list (the columns, the causes, the gates) and the consumer
  reads it from there, instead of keeping its own copy. Plus the GOTCHAS register: every
  anti-pattern with its smell, its root cause, its fix and how to detect it earlier.
- **Gate**: it is automatic (rule SQ 14): the agent looks up the other side before closing a change.
- **Who decides**: nobody; it is automatic.
- **Failure it prevents**: the counter that does not match the query (1,355 versus 1,234); the drift
  between the web and mobile versions (GOTCHAS G-2); two copies of the same module that fall out of
  sync (G-3; in Kikan there are 8 modules duplicated between web and mobile, found in the audit).
- **Evidence**: SQ 14; `docs/GOTCHAS.md` (27 May); `50fe968 (pnd510)`; `7251129 (pnd509)`.
- **Contract (how it is executed)**: `peldanos/peldano-08-simetria-y-antipatrones.md`.

### Step 9 — Measure before building, with an instrument that is itself verified

This is, for me, the most "grown-up" step of all, and the one that took longest to appear. The rule
is: every number that feeds a decision comes from a program with a test. Not from a `grep`, not from
an impression, not from "I think there are about a hundred".

- **Intention**: that every number that feeds a decision comes from an instrument with a test, and
  that the instrument itself is audited.
- **Inputs**: a hypothesis (from the owner or the agent) about a cause, a quantity or a cost.
- **Artefact**: a "guarded meter" (a script plus a test that protects it) that lives in the
  repository; a budget per path (how many queries, how many loops) tightened to the measured value
  plus a small margin; and a "ratchet", a counter that can only go down.
- **Gate**: the five rules of Kikan's section 11.b: (1) a guarded meter; (2) if the instrument does
  not exist, it is built; (3) it is audited in both directions (from code to measurement and from
  measurement to code); (4) what is approximate is marked as approximate; and (5) the one who
  executes verifies the numbers of the one who planned.
- **Who decides**: the number. The owner brings the hypothesis; the agent measures it before
  building. And an observation from months of working with Pablo: he is usually right about the
  symptom, and the cause is usually right next to where he places it — which is why you measure
  rather than argue.
- **Failure it prevents**: the "121 loops" that were 79; the "27 races" that were 44; the meter that
  lied because the database already had a schema change applied; the ratchet with the counter at
  zero that was not seeing 84 calls.
- **Evidence**: `REINGENIERIA_PERSISTENCIA_SQL.md`, section 11.b; `880ac0f`, `f955620`,
  `1d55a93`, `0730082` (63 over 60); `_diag_pnd517_counters.py`; memories
  `feedback_medidor_con_guarda`, `feedback_medir_la_hipotesis`,
  `feedback_validar_limites_con_el_log`.
- **Contract (how it is executed)**: `peldanos/peldano-09-medir.md`.

### Step 10 — Honest verification and proportional reporting

If the owner is not going to read code, the agent's report has to be trustworthy. Not
"optimistic", not "complete in appearance": trustworthy. And that has rules.

- **Intention**: that the agent's report is trustworthy without the owner reading code.
- **Inputs**: the work done.
- **Artefact**: a report that clearly separates what was "verified" from what is "believed"; that
  declares its blind spots (what it could not test); that covers every item of what was asked, one
  by one; and that cites the evidence (the log, the test, the number).
- **Gate**: no claim without its proof. "Done" is said only with the discipline of "done" (SQ 5).
  And on an "it is still broken", the first thing is to compare which version is published against
  which one has the fix, before diagnosing again.
- **Who decides**: the owner trusts, or asks for the evidence. Never reviews the code.
- **Failure it prevents**: the authentication error Forge reported as "success" (14 October);
  announcing work not done (SQ 9c); and the agent that says "fixed" when the fix is in the
  repository but has not been published yet.
- **Evidence**: `docs/doctrine/verification-honesty.md` (10 June); SQ 9a, 9b and 9c; SQ 5; memory
  `feedback_check_published_version_first`.
- **Contract (how it is executed)**: `peldanos/peldano-10-verificacion-honesta.md`.

### Step 11 — The periodic audit as input to the plan

Every so often you have to look at the whole system with fresh eyes. And what is seen does not go
to a report that gets filed: it goes to the queue of pending items.

- **Intention**: to look at the complete system every so often and turn what is seen into pending
  items.
- **Inputs**: the whole repository, and production read-only.
- **Artefact**: a report with graded findings (P0 the urgent, P1, P2…; or grades per dimension) that
  ends in numbered pending items. Ideally done by an auditor different from the builder: in our
  case, I (Sumi) audit what Forge builds, and Forge absorbs the findings.
- **Gate**: every P0 finding has a pending item opened before the audit is considered closed.
- **Who decides**: the owner prioritises the findings.
- **Failure it prevents**: a superadministrator password hard-coded in the code that nobody had
  seen; 264 queries reading whole tables; a known vulnerability in a dependency; a 2,679-line
  screen component.
- **Evidence**: full-scan of 23 June and security of 16 July (Authorizations); AUD-* → 19 pending
  items (Kikan, 28 August); `INTEGRIDAD_..._10_14.md`, absorbed in `b266f11`;
  `AUDITORIA_CALIDAD_..._10_15.md`.
- **Contract (how it is executed)**: `peldanos/peldano-11-auditoria.md`.

### Step 12 — Fail-closed, locks and zero silent harm

On doubt or failure, the system does NOT act. And it says so. This sounds obvious, but it is the
opposite of what software does by default, which on doubt carries on.

- **Intention**: that the system, on doubt or failure, does not act, and warns.
- **Inputs**: any action with consequences (charge, send, approve, delete).
- **Artefact**: locks (double safety, panic button), a dry-run mode before automating for real, a
  watchman that pushes with guards, explicit permissions and approvals for the agent, and lookups
  that, if they fail, do not break the screen.
- **Gate**: every irreversible action has a lock and a documented way back.
- **Who decides**: the owner approves the lock; the system never skips it.
- **Failure it prevents**: a double charge; an automatic approval without passing through a human; a
  `git add -A` that uploads a token to the repository; deleting the client's data.
- **Evidence**: `0954740 (pnd524)`; `e18406d (pnd452)`; the auto-approver in dry-run mode; SQ 0.3
  (zero silent harm); the NAC3 verbs with approval.
- **Contract (how it is executed)**: `peldanos/peldano-12-fail-closed.md`.

### Step 13 — Continuous integration, environments, secrets and deployment as part of the product

Reaching production has to be a reproducible package: the tests run ONCE, the configuration lives
outside the repository, and secrets do not wander around.

- **Intention**: that reaching production is a reproducible package, with the tests run only once
  and the configuration outside the repository.
- **Inputs**: the skeleton (step 4) and the tests (step 7).
- **Artefact**: continuous integration that runs the suite; a deployment that waits for that run's
  result and only packages and uploads; configuration only on the server (in an environment file or
  a vault); an explicit promotion from the test environment to production; a procedure (runbook)
  that can be run twice without breaking anything; and the continuous-integration minutes quota
  watched.
- **Gate**: the test environment green before touching production; the rollback tested; and no
  secret in the repository nor in the chat — if one was pasted by mistake, it is rotated.
- **Who decides**: the owner promotes to production; the agent prepares everything.
- **Failure it prevents**: the tests running three times per commit (16 to 27 minutes each; 2,000
  minutes in 16 days, quota burned); the database key printed in a transcript; CORS derived only
  from the server's first domain name; the configuration overwritten by the test suite (PND-107).
- **Evidence**: `39497b0` (gate-ci); `0bd20a8 (PND-107)`; `513c8d0 (PND-108)`; `7658e2e`
  (promotion); memories `project_kikan_deploy_solo_empaqueta` and
  `project_embed_apikey_environmentfile`.
- **Contract (how it is executed)**: `peldanos/peldano-13-ci-entornos-secretos-deploy.md`.

### Step 14 — Living documentation and manuals a person can follow without AI

The system has to be usable, maintainable and recoverable without the agent and without the person
who built it. If, on the day the agent is not there, it cannot be deployed, it is not finished.

- **Intention**: that the system can be used, maintained and recovered without the agent and without
  the builder.
- **Inputs**: every change (in Forge, gate G-DOC).
- **Artefact**: the user manual, the maintenance manual, the internal infrastructure manual
  "reproducible by hand, without AI", the disaster-recovery manual, and the change journal. All in
  the same commit as the change that motivated it.
- **Gate**: the documentation is up to date (SQ 4); the manual is regenerated together with the
  system.
- **Who decides**: the agent maintains; the owner reads the manual, not the code.
- **Failure it prevents**: a stale repository-management document that caused a commit in the wrong
  repository; and the `CLAUDE.md` turned into a changelog.
- **Evidence**: SQ 3.3, 3.4 and 6; the manual of 26 June; `6444ce6 (pnd442)`; `a30cee3 (pnd459)`;
  Kikan's manual with embedded images of 16 October.
- **Contract (how it is executed)**: `peldanos/peldano-14-documentacion-viva.md`.

### Step 15 — The agent inside the system, and the retrospective with numbers

The last step has two parts that look different but close the same cycle. First: the agent stays
resident in production, with a bounded scope. Second: the method itself is reviewed with numbers,
and what is learned returns to step 0 for the next project.

- **Intention**: that the agent stays resident in production with a bounded scope (diagnosis →
  operation → support), and that the method is reviewed with numbers.
- **Inputs**: the system in production, the incidents, the costs.
- **Artefact**: the embedded agent with a mandatory system map, bounded permissions, an API key that
  acts as the person who created it, and tickets. Plus a written retrospective with measurement (a
  paper, a report) that changes the method and returns to step 0.
- **Gate**: the embedded agent cannot do what the owner did not approve; and the retrospective
  produces at least one change to the ladder.
- **Who decides**: the owner.
- **Failure it prevents**: the multi-agent crew that spent twice as much and delivered half (killed
  with numbers on 5 June); and the agent operating inside a system without having a map of that
  system.
- **Evidence**: `docs/PAPER_SUMI_VS_AGENTIC.md`; `7584f8b`; `1c7c0b5` (the embed, PND-147);
  `c602725` (operate mode); `20fdbe7` and `1558ee4` (PND-257 and PND-223); the memory of the
  resident assistant in production.
- **Contract (how it is executed)**: `peldanos/peldano-15-agente-residente-y-retrospectiva.md`.

---

## Part C — The real failures, and which step covers each one

This table is, in a way, the proof of the ladder: every blow we took has to fall into some step. If
there is a blow that falls into none, a step is missing.

| Failure (and when it happened) | Step that covers it | Closed? |
|---|---|---|
| The multi-agent crew: 60 dollars and 73 minutes for a half-done delivery (5 June) | 15, retrospective with numbers | yes (redesigned) |
| Work thrown away for not reading the map (12 June) | 2, mandatory reading | yes |
| PND-300: three fixes that were not at the root (14 July) | 1, zero debt / 9, measure | yes (in the fourth round) |
| The counter 1,355 versus 1,234 (7 August) | 9, instrument / 8, symmetry | yes |
| 3.4 million rows per year on JSON files, synchronous interface (11 October) | 3, sizing | yes (stages E1 to E12) |
| Meters that lied: 27 that were 44, the ratchet at zero (13 October) | 9, verify the instrument | yes |
| The orphan turn of 1 hour 43, six invisible commits (14 October) | 10, honest verification / 12, fail-closed | yes (version 1.18.0) |
| Tests run three times per commit; GitHub Actions quota burned (14 October) | 13, integration as product | yes (gate-ci); the quota must be raised by Pablo |
| Two administrator doors in 24 hours (15 October) | 11, external audit / 12, locks | yes (PND-223 withdrawn) |
| The MariaDB key and the `yerp_` keys pasted in the chat (14 and 16 October) | 13, secrets | rotation pending on Pablo |
| "reported error: success" (14 October) | 10, proportional reporting | pending (a one-line fix) |
| The 9,661-line `CLAUDE.md` (15 October) | 2, operational file versus casebook | pending |
| CORS derived from the first domain name; the UAT setup wizard returned error 500 (16 October) | 13, deployment / 8, symmetry | the prompt for Forge is delivered; pending application |
| Forge Mobile losing its tabs (16 October) | 10 / 12 | diagnosis done; fix pending |

---

## Part D — What remains to be elaborated (for the next pass)

Done in version 2 (17 October, afternoon): the opening thesis ("AI does not interrupt the method:
it continues it"), the sixteen step contracts in `peldanos/`, and the method's own repository.
Done in version 3: the name, the enriched contracts (size, warning signs, English prompts with
explanation), the guide by project size and the guide by tool. Remaining:

1. **Step 0 complete**: the real list of criteria (Pablo's plus my hypotheses), which exclude and
   which weigh, the weights, the threshold, and the rejected projects as counter-examples. We already
   have X1 and X2; the rest is missing.
2. **Order and grouping**: the ladder has three phases (start, 0 to 4; loop, 5 to 10; operation, 11
   to 15). It must be confirmed whether it is taught like that or whether it is better to start
   with the loop, which is what a student will use every day.
3. **A memorable one-sentence name for each step**, for the manuals and the posts.
4. ~~What is minimal and what is optional by project size~~ — **proposed** in the table "What is
   mandatory and what is proportional", marked as a hypothesis until a project confirms it.
5. **The mapping to Forge**: which steps are already gates or commands (G1 to G9, the pending
   register, sizing, the doctrines) and which are missing in order to export the ladder as an
   execution flow.
6. **The practice**: the course manual (`MANUAL_CURSO.md`), with a hands-on task per step that a
   student can repeat in their own repository until the application is in production. In progress.
7. **What is NOT in the ladder and should be** `[hypothesis]`: handling the cost of tokens and
   quotas as an explicit budget (today it is reactive: we find out when it burns); secret rotation
   as a routine and not as an incident; and a criterion for when the human DOES have to look at
   code — today the answer is "never", but this week's two reports suggest there are specific
   moments when it is worth it.
8. ~~The name~~ — **done**: Urazuke, the evidence method (D-014, 17 October).
9. **The public presentation on yujin.app**: a page for the method with its highlights, in several
   languages, built with NAC3 (the repository for the pages is `pkuschnirof/rpaforce`, folder
   `C:\RPAForce\web\yujin.app\`). It now has a name; the multilingual structure is missing
   (D-013): Spanish as source, seven translations, and the prompts in English as a single piece
   explained in each language.
10. **Test the contracts on a real project.** The sixteen prompts are written from what we did,
    not executed as-is. The first project that uses them end to end will correct several; that is
    part of step 15.

---

## Glossary

Every acronym, every proper name and every colloquial expression that appears in this document,
explained. In alphabetical order. Some entries are Spanish terms that appear in file names or
commit messages of the source repositories; they are kept so that the evidence can be followed.

**Agent** — An artificial-intelligence program that not only answers questions but performs
actions: reads files, writes code, runs commands, makes commits. In this document, "the agent" is
Forge or Sumi (see below).

**Anonymisation** — In this document the real clients are called "the Health Fund", "the
Authorizer" and "the Association", and their systems "Authorizations" and "Kikan". It is on
purpose: the names are withheld until we have permission to use them.

**Anti-pattern** — A way of doing things that looks reasonable but is known to end badly. The
opposite of a "pattern" (a proven good practice).

**Artefact** — Something concrete that is produced: a file, a test, a script, a document. In the
ladder, every step leaves an artefact.

**Association (the)** — The name this document gives to the client of the Kikan system (its real
name is withheld): a civil association that serves families and needed an omnichannel service desk
(several contact channels in one place) and campaigns.

**Asynchronous / synchronous (async / sync)** — A synchronous call waits for the result before
continuing; an asynchronous one sets the task going and continues, collecting the result later.
Real databases in Node are asynchronous; that is why the interface must be so from the start.

**AUD-*** — The series of numbered audits done in Kikan in August (AUD-1, AUD-2…), which
generated pending items.

**Authorizations** — The name this document gives to the first production system (the real one is
withheld): robotic automation (RPA) of the handling of the Health Fund's orders for a health entity,
with a human in the loop.

**Authorizer (the)** — The name this document gives to the Health Fund's system that receives
orders and returns a verdict (approved, rejected). For us it works as an "oracle": the truth against
which the counters are verified.

**Auto-approver** — In the Authorizations system, the robot that approves orders automatically
according to rules. It first ran in "dry-run mode" before being allowed to act.

**Autopilot** — A written mandate for the agent to work alone for hours (24 or 48), making commits
and pushes without asking, and deliver a summary at the end.

**await** — In JavaScript, the keyword meaning "wait for the result of this asynchronous call". A
database call without `await` is a silent bug: the code continues before it has the data.

**Backend** — The part of the system that is not seen: the server, the logic, the database. The
opposite of "frontend" (the screen).

**Blow** — An incident, a mistake that hurt. "Blow → rule" is the birth pattern of every doctrine.

**Burn the quota** — To exhaust the budget of something (continuous-integration minutes, AI
tokens) ahead of time.

**CI (continuous integration)** — A service (here, GitHub Actions) that runs the tests
automatically every time code is pushed.

**CLAUDE.md / PROJECT.md** — The file the agent reads at the start of every session to know what
the project is and how to work on it.

**Commit** — A saved point in the history of the code, with a message explaining what changed and
why. Every commit has a short identifier (for example `2219f7a`).

**Concurrency** — How many things happen at the same time in the system (simultaneous users,
parallel processes).

**CORS** — A browser security mechanism that decides from which domains a server may be called.
Misconfigured, it blocks legitimate calls with confusing errors.

**CVE** — A public identifier of a known security vulnerability in some software component.

**Doctrine** — In Forge, a short document fixing how something is done (how to test, how to
verify, how to size). There are 31. It is the form the method takes inside the tool.

**Driver (criterion)** — A factor that pushes a decision one way or another. In step 0, the
drivers are the factors that decide whether a project is eligible.

**Dry-run mode** — Running a process "dry": it does everything except the final action. The
auto-approver ran that way first, showing what it would have approved without approving anything.

**E1 to E12** — The twelve stages of Kikan's persistence re-engineering (the move from storage in
JSON files to a MariaDB database).

**Embedded (embed, Forge Embedded)** — Forge installed inside the client's system, as a resident
assistant, with bounded permissions.

**End to end (E2E)** — Testing the complete system, from the screen to the database, the way a
person would use it.

**Environment** — A separate installation of the system. The usual ones: development (the
programmer's machine), UAT (the client's testing) and PROD (production, the real one).

**Fail-closed** — On doubt or error, the system does not act. The opposite of "fail-open", which on
doubt carries on.

**Fallback (to the legacy)** — Going back to an old path when the new one fails. The method forbids
it (SQ 0.2): if there is an old system, it is audited and migrated; it is not left as a silent
safety net.

**Fixture** — Test data loaded before running a test or a deployment.

**Flip (switch)** — A configuration change that chooses between two paths (for example, the old
engine or the new one) without touching code.

**Forge (Yujin Forge)** — The tool Pablo built: a layer over Claude Code that adds the method
(doctrines, gates, pending items, a chat panel, a mobile app, and the embedded mode). `yf` is its
command.

**Frontend** — The visible part of the system: the screens.

**Full scan** — A database query that reads the whole table because it has no index to help it.
With small tables it is unnoticed; with millions of rows, it brings the system down.

**G-DOC** — In Forge, the gate that requires documentation to be updated in the same commit as the
change.

**gate-ci** — The job in Kikan's deployment that waits for continuous integration to finish green
before packaging. Created on 14 October.

**Gate** — A condition that must be met in order to move on. If it is not met, you do not pass. In
Forge they are numbered G1 to G9.

**GCP** — Google Cloud Platform, the cloud where the servers of the Association's two systems run.

**GOTCHAS** — A file recording known "traps": mistakes we already paid for once, with their smell,
root cause, fix and how to detect them earlier.

**Greenfield / brownfield** — A new project from scratch (greenfield) versus one that starts from
something existing (brownfield).

**Grep** — A command that searches text in files. "A meter, not grep" means: an important number
is not obtained by counting with a text search, but with a program with a test.

**Guarded meter** — A script that measures something (how many queries, how many loops) and has
its own test verifying that the meter measures correctly. "Guarded" means "protected by a test".

**Health Fund (the)** — The name this document gives to the health insurance fund that is the
client of the first production system (its real name is withheld).

**Heap** — The memory a program uses. "The suite died from heap" means the tests ran out of memory
and looked as if they were failing.

**HITL (human in the loop)** — A design where a person approves before the system acts. In
Authorizations, the manual approver.

**Index** — An auxiliary database structure that makes a search fast. Without an index, the query
is a full scan.

**IPC (leash between processes)** — A channel between two processes. In Forge 1.18.0 it was used
as a "leash": if the parent process dies, the child finds out and shuts down.

**JSON (storage in)** — Keeping the data in text files in JSON format instead of in a database.
Fine to start; useless for millions of rows.

**Kikan** — The Association's omnichannel service desk and campaigns system, the second
production system.

**Legacy** — An old system still in use.

**Log** — The record of what a program does as it goes. "Validate with the log" means: do not
trust what the agent says it did, look at the record.

**Lock** — A protection that prevents a dangerous action from happening without an explicit
condition. For example, the panic button has a dedicated lock: it cannot be pressed by accident.

**Lying (a meter)** — When an instrument returns a wrong number because it does not see part of
what it has to measure. It happened to us twice.

**MariaDB** — The SQL database engine Kikan uses in production.

**Mock** — Replacing a real part of the system with a simulation during a test. "Not mocking
yourself" means not simulating precisely the part you want to test.

**Month three** — Our expression for the moment when a quickly built system starts showing its
problems: when it has real data and real users.

**NAC3** — Forge's protocol that makes an application's screens drivable programmatically (every
element of the interface has an identifier and methods). It enables end-to-end testing. Pablo
clarified that it is not mandatory for the method: it is the means, not the condition.

**Node (Node 22)** — The environment where server-side JavaScript runs. "Node 22 pinned" means the
version was fixed so that every environment uses the same one.

**Oracle** — An external source of truth against which a result can be verified. For the Health
Fund's counters, the oracle is the Authorizer.

**Overwrite (a configuration)** — To write over something by accident. "The suite was overwriting
the deployment configuration" was PND-107.

**P0, P1, P2** — Priority levels of a finding: P0 is what must be resolved now.

**Paper** — An analysis document with measurements and conclusions. `PAPER_SUMI_VS_AGENTIC` is the
one that justified killing the multi-agent crew.

**Playwright** — A tool that controls a browser programmatically to test screens the way a person
would.

**PND (pending item)** — A numbered item in the work queue (PND-001, PND-002…). In this method,
the pending items ARE the plan.

**PROD (production)** — The real environment, the one the client uses.

**Promotion (UAT → PROD)** — Moving something (configuration, campaigns) from the test environment
to production in a controlled way.

**Proved red** — A test that was shown to FAIL against the old code before the fix turned it green.
If you never saw it red, you do not know whether it tests anything.

**Pull / push** — Downloading and uploading code to the remote repository (GitHub).

**Query budget** — The maximum number of database queries a path of the application may make,
measured and protected by a test. If a change exceeds it, the test fails.

**R8 modal** — In Forge, the window that stops everything when the agent goes into a loop without
progress.

**Ratchet** — A mechanism that turns only one way. In Kikan, a counter of calls without `await`
that can only go down: if it goes up, the test fails.

**Regression** — A test that verifies that something that already worked keeps working after a
change.

**Relay** — The intermediary service connecting the Forge mobile app with the desktop session.

**Repository (repo)** — The place where the code lives with all its history. "Standard repo" means
one managed with Git and with a recognisable structure.

**Retention** — How long the data of each table is kept before being deleted.

**Rollback** — Going back to the previous version when a deployment goes wrong.

**RPAForce** — Pablo's brand under which these systems are delivered.

**Runbook** — An operating procedure written step by step, so that anyone can follow it.
"Idempotent" means it can be run twice without breaking anything.

**SDD** — A software design document written before building.

**Seeder** — A script that loads test data into an environment.

**Shift left** — Moving testing earlier in the development process, towards the "left" of the
timeline, instead of leaving it for the end.

**Smell** — A sign that something is wrong in the code, before it fails.

**SQ (Standards of Quality)** — The working agreement between human and agent in Forge. Numbered:
SQ 1 (the user's time is sacred), SQ 2 (zero debt), SQ 3 (ASCII), SQ 4 (documentation up to date),
SQ 5 (exact scope), SQ 6 (the user's language), SQ 7 (producer/consumer symmetry), SQ 8
(autonomy), SQ 9 (verify before claiming). And in the long document, sections 0.1 to 0.11.

**SQL** — The language of relational databases.

**Sumi (Sumi-Forge)** — The name of the Claude Code session that works with Pablo in the Forge
repository; the one writing this document. Forge is the product; Sumi is the one who builds it and
audits what Forge does in other projects.

**Tag** — A label on a commit marking a version (for example, v1.18.0).

**TDD** — "Test first, code after". The method keeps it as an option for small scopes, not as a
universal rule.

**The hard way** — Learning something because it went wrong, not because someone explained it
beforehand. Used in the sense of "these rules were learned the hard way".

**Tighten the ceiling** — To lower a limit (a budget, a maximum allowed) until it sits just above
the measured value, so that any worsening makes a test fail.

**Token** — Two meanings. In AI: the unit in which the text the model processes is measured (and
charged). In security: an access credential. "A `git add -A` with a token" is uploading a credential
to the repository by mistake.

**Turn** — One round of the conversation with the agent: the user asks, the agent works and
answers.

**UAT** — The environment where the client tests before production.

**Urazuke** (裏付け) — The name of the method. In Japanese, the backing a claim has, what holds it
up from behind; *urazukeru*, to back with proof. Pronounced oo-rah-ZOO-keh. Never translated.

**Vault** — An encrypted place where secrets (keys, passwords) are kept instead of being left in
text files.

**Vibecoding / vibecoder** — Building software by conversing with an AI, describing what is wanted,
instead of writing the code by hand. A vibecoder is one who does it.

**Volume** — How much data the system will handle: rows per year, users, peaks.

**Watchdog (silence watchdog)** — A process that watches whether another keeps giving signs of
life, and kills it if it stays silent too long. Forge 1.18.0 added one so that a turn can no longer
be orphaned.

**Watchman** — In Authorizations, the process that periodically checks what got stuck and pushes
it, with guards so as not to push twice.

**Whiteboard (the board)** — The shared board in Forge where the agent leaves reports for Pablo to
read.

**yerp_** — The prefix of Kikan's API keys.

**yf** — Forge's command in the terminal.

**Yujin** — The ecosystem of which Forge is the commercial product.
