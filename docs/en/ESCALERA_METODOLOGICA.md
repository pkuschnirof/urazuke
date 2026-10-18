# Urazuke, the evidence method — the methodological ladder (version 4)

Author: Pablo Kuschniroff, assisted by Claude Code. Version 4, 18 October 2026. This is a working
document that I am going to keep polishing with every project that uses it; nothing it says is
closed doctrine yet, although it is, as far as I know, the first honest distillation of a method
that already has three systems in production behind it.

Before getting into the matter, a warning about how it is written, because it matters. I wrote it
for people who did not live through these projects with me: people who want to build software
with artificial intelligence and want that software to last, not people who want to learn to
program or to collect prompt tricks. That is why I take the time to explain, repeat when needed,
use everyday language, and leave at the end a **glossary** with every acronym and every colloquial
expression that slips out of me. If at some point you run into an odd word — "ratchet", "lock",
"fail-closed", "PND" — go to the glossary; it is all there. And when you read a mark like
[Ref. 26](REFERENCIAS.md#ref-26), know that it is a shortcut to a real case that I tell in the
references document, with its date and its evidence; you can ignore it without losing the thread
or follow it if the detail interests you.

The public repository of the method is
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke). There you will find this
document, the contracts of each step, the course manual and the references, in the eight NAC3
languages.

## The name

**Urazuke** (裏付け) is a Japanese word that names the backing a claim has: what holds it up from
behind (literally, "the lining at the back"). The verb *urazukeru* is "to back with proof". I chose
it on 17 October 2026, after discarding several names because of collisions with existing
companies and projects, and I chose it because it says exactly what the method asks for: that every
claim of the model come with its backing, and that the backing can be verified without reading the
code. The name is not translated; the subtitle, "the evidence method", is: *el método de la
evidencia*, *o método da evidência*, *la méthode de la preuve*, *die Nachweis-Methode*, *il metodo
del riscontro*, 裏付けの方法, 验证方法. In this document, "the ladder" is the structure of the
method — its sixteen steps — and "Urazuke" is the whole method.

## What this is about

I want to be clear about what I am teaching and what I am not. I am not teaching a tool. I am
teaching a **method**: what to do in what order, what to ask the model for at each moment, what it
has to deliver to you, and how to know — without reading code — that what it delivered is complete.
The bet is that anyone, with any artificial intelligence tool that can be used for programming, can
build software by conversing with a model instead of typing the code by hand, and that what comes
out is robust, is ready for production and, this is the important part, **does not require the
project owner to review a single line of code**.

It sounds ambitious, and it is. But I have something almost nobody has: three real systems that I
built exactly this way, that work today with real clients, and from which I extracted every rule
that follows. So the question I ask myself is not "can it be done?", because it has already been
done. The question is "what did I do, in what order, and which of all that is what really made the
difference?". This ladder is my answer, and it is the basis of three things: the documentation of
the method, the practice the students of the course are going to do, and the manuals. Later I am
going to export it as an execution workflow inside my tool, so that it is the tool that guides the
method and not anyone's memory.

## Where the method comes from, and what I do not want misread

There is an easy reading of all this that I want to dismantle before it settles in: that the method
is a collection of patches that I kept applying after each blow. It is not, and it matters to me to
say so precisely, because it changes how each step has to be read.

The method comes from two factors that combined, and neither of the two is enough on its own. The
first is **my own knowledge of systems engineering**. I have spent many years applying what anyone
who comes from systems recognises immediately: survey before design, written requirements, sizing
with numbers, design, construction, tests as evidence, reproducible deployment, operation, periodic
audit, documentation as part of the product. Most of what I demand in the sixteen steps is what I
always demanded in a well-run project. I did not invent it for the models; I brought it from
before.

The second factor is what the incidents of these five months showed me, one after another:
**where the models apply those principles in a fragile way**. A model knows perfectly well what a
test is, what a root cause is, what a sizing is; if you ask it, it explains it better than many
engineers. But in practice it says it tested and did not test, it estimates with a straight face a
figure that only the business has, it fills a gap in the business rules with whatever seemed
reasonable to it, it over-reports because it was trained to be helpful, and it builds a meter that
lies without noticing. Each of those cases, which I tell in the [references](REFERENCIAS.md), told
me exactly where to tighten: where a principle that was obvious to me needed to become an explicit
clause of the prompt, a gate, a check that I do without reading code.

So, when in a step I say "I imposed this after such-and-such incident", I am not saying that the
principle was born there. I am saying that there I confirmed that the model did not apply it on its
own, and that it had to be demanded of it in writing. The method is the systems engineering we have
always had, applied with the rigidity needed for a builder that does not get tired and that cannot
be believed without evidence. The scars are the proof of where the rigidity is needed, not the
origin of the principles.

## AI does not interrupt the method: it continues it

This is the thesis that opens everything, and I put it first because it dismantles the most common
objection before it appears: "how are you going to trust code that a machine wrote?".

My answer is that **the industry already stopped trusting the author of the code twenty years
ago**. When the bulk of the writing moved to junior, outsourced or rotating teams, line-by-line
review became impossible to sustain. And what grew in its place was everything we take for granted
today: automated tests, continuous integration, acceptance criteria, pipelines that let nothing
through without green, the "shift left" of testing, quality control as an independent function.
That was the answer of systems engineering to "the one who writes is not trustworthy": do not read
their code, demand evidence from them.

Putting a model to write, then, is not a leap into the void. It is swapping an author we no longer
trusted for another we do not trust either, and for whom **we already had the verification
apparatus built**. That should reassure, not unsettle. And on top of that the new author is
cheaper, faster, and — unlike the junior — does not take offence when you ask it to prove red.

That is why this method leans, without disguise, on classical systems engineering. The skeleton is
the usual one. It could not be otherwise, because the problems are the usual ones: not knowing how
much data there will be, not knowing what the client wants, not knowing whether what was built is
what was asked for. AI did not change the problems; it changed who does each part and at what cost.
Even the eligibility criterion X2 of step 0 is classical engineering: testability as a condition of
contract.

### What is old and what is new in this

The old, and it is worth saying that it is old: the skeleton of stages, the independence of the one
who verifies from the one who builds, tests as evidence, documentation as part of the product, the
survey before the design.

What does change, and this is where my contribution lies, are three things:

1. **Where the human's effort goes.** In the classical method the human writes the specification,
   writes the code, and another human reviews it. Here the human does only two things: **decides,
   and verifies artefacts**. Everything else — drafting, building, testing, measuring, documenting —
   the model does. That is why every step ends in a "completeness check without reading code": it is
   the exact place where the human is still indispensable, and no other.

2. **The author also manufactures the evidence.** This is the only genuinely new point, and it is
   the nuance that justifies three whole steps. The junior wrote dubious code, but did not
   manufacture the evidence: the tests and the measurements were put together by someone else, or
   at least someone else looked at them. The model, instead, produces the code *and* the test *and*
   the meter *and* the report, in the same session, with the same confidence in its voice when it is
   right and when it is wrong. I saw it: the meter that lied twice [Ref. 36](REFERENCIAS.md#ref-36),
   the authentication error reported as "success" [Ref. 43](REFERENCIAS.md#ref-43), the three out of
   four claims that were wrong. So "review evidence instead of code" is still the right principle,
   but **the evidence has to prove itself**: the test seen red (step 7), the instrument with its
   guard (step 9), the report that separates what was verified from what is believed (step 10), the
   auditor different from the builder (step 11). It is not a new concern: it is the same discipline
   of independence of quality control, taken one step further in.

3. **The cost of the artefacts.** In the classical method documentation was expensive, so it was
   done once and aged. Here regenerating it is free, so the rule becomes "in the same commit" and
   "reproducible by hand, without AI". What used to be an unattainable ideal becomes a gate.

For the course and for the public presentation, this defines the positioning honestly: it is not
"the new way to program"; it is **systems engineering applied to a builder that does not get tired
and that cannot be believed**. To those who come from systems it sounds familiar and lowers their
distrust; to those who come from vibecoding it gives them what they do not have, which is precisely
the skeleton. And it sets me apart from the tools that sell speed and omit the whole skeleton.

---

## Part A — How to read each step

Each step has eight parts, always the same, so that they can be compared:

- **Intention**: what it seeks, in one sentence.
- **When**: at what moment of the project it is climbed, and whether it is climbed once or repeats.
  This part is new in version 4 and I explain it in detail in Part B, because a method without a
  timeline is a list of good intentions.
- **Inputs**: what has to exist beforehand to be able to climb it.
- **Artefact**: what is left written or executable when it is climbed. It is always something
  concrete: a file, a test, a script.
- **Gate**: what has to be true to move on to the next one. If it is not met, you do not climb.
- **Who decides**: the project owner, the agent, or nobody because it is automatic.
- **Failure it prevents**: the kind of problem the step prevents, with a short reference to the
  real case where I confirmed it.
- **Contract**: the file where how it is executed lives: context, prompts, result, check, warning
  signs.

Two important clarifications. First: **the ladder is neutral with respect to the tool**. Each
artefact is a file, a test or a script; none requires my tool or any other. Forge automates them
(the gates, the commands, the pending-items register), but the step exists without Forge. Second:
**the steps are not strictly sequential**. There are three stretches: steps 0 to 4 are start-up and
are climbed once per project; steps 5 to 10 are the loop that repeats with every change; and steps
11 to 15 are operation, when the system is already alive. Step 15 closes the cycle and returns to
step 0 for the next project. But "not strictly sequential" does not mean "in any order": Part B
says exactly when each one is climbed and what happens in between.

---

## Part B — The timeline: when each step is climbed and what happens in between

This part did not exist in the previous versions, and its absence was a serious defect: the method
said what to do and how to verify it, but it did not say **when**. And "when" is half of a method.
A reader who took it literally could climb the sixteen steps one after another and wonder at what
moment, then, the infrastructure gets done, the continuous integration and deployment chain, the
intake of the requirements, the development of the functionality, the end-to-end tests of all the
flows, the human look at the screens, and the human acceptance testing. All of that happens, and
it happens at precise moments, between the steps and inside them. Here I write it down.

### B.1 The five phases of a project

A project run with this method goes through five phases. The three in the middle are the ones that
correspond to the three stretches of the ladder; the two at the ends are the initial intake and
life in production, which the method also covers even though they are not "steps" in themselves.

| Phase | Typical duration in a small project | Steps climbed | What else happens in that phase |
|---|---|---|---|
| 0. Intake | from two days to a week, in parallel with phase 1 | none yet; it is the raw material of steps 0, 2, 3 and 5 | Survey of the business with the owner, with the classical methods of requirements engineering (see B.5): interviews, use cases or user stories, domain model, screen prototypes. It is written in prose, incomplete on purpose; the agent completes it by asking. |
| 1. Start-up | one week, straight through | 0, 1, 2, 3, 4 | Eligibility, agreement, definition, sizing. And **all the initial infrastructure**: the repository, the test environment, continuous integration, the first deployment with the empty system. |
| 2. Loop | from three to six weeks, in functional blocks of one to two weeks | 5, 6, 7, 8, 9, 10 with every change | Functional development block by block; tests proved red; end-to-end tests of the flow just built; a human look at every new screen; at the close of each block, human testing in the test environment. |
| 3. Go-live | one week | 11, 12, 13, 14 | Audit by another session; locks on everything that acts on the world; closing the deployment chain to production with a tested rollback; the three manuals; acceptance testing with the owner over all the flows. |
| 4. Operation | as long as the system lives | 15, and the loop (5 to 10) for every evolution; 11 periodically | Resident agent; audit every one or two months; every new change enters through the full loop and leaves through the deployment chain; retrospective at the close of each stage. |

The times are for a small project, the size of the course's guide project. In a project with users
and consequences, the loop stretches and phases 1 and 3 stay almost the same, because what grows is
the functionality, not the infrastructure or the closing.

### B.2 What happens between step and step

Here is what was missing. For each phase, which tasks of each kind are done and at what exact
moment with respect to the steps. Read the table by rows: each row is a kind of work, and each cell
says when it is done within that phase.

| Kind of work | Start-up (steps 0 to 4) | Loop (steps 5 to 10, per block) | Go-live (11 to 14) | Operation (15 and the loop) |
|---|---|---|---|---|
| **Requirements intake** | Before step 0: survey in prose with the owner, with interviews, use cases and domain model. It is completed in step 2 (definition and semantic tree) and in step 3 (volume). | When opening each block: the client's request for that block, just as they would say it, is turned into pending items with a **detailed specification** (step 5): description, acceptance criteria, applicable rules, data, screens, edge cases. The questions the agent asks are the fine intake. | Before step 12: survey of the consequential actions. Before step 13: survey of environments and access. | Every new request enters as a specified pending item, hanging from its node of the semantic tree; the resident agent collects what the users ask for. |
| **Infrastructure** | All the initial infrastructure, in step 4: repository, structure, test environment, credentials, test domain. No functionality is built until the empty skeleton is deployed. | None, unless a block demands it (a queue, an external service). If it does, it is a pending item with its test. | In step 13: production environment, secrets on the server, real domain, backups, minimal monitoring. | Infrastructure changes enter through the loop and through step 13; never "by hand, quickly". |
| **CI/CD chain** | In step 4: continuous integration runs the suite on every push from the first week, and deployment to the test environment is automatic on merge. | It works on its own. Every commit goes through it; if it is not green, the block does not close. | In step 13 it is completed: deployment to production waits for the integration result and only packages; promotion is a written procedure; the rollback is tested. | Every deployment follows the routine of step 13: test environment green with the same version, rollback ready, end-to-end check on production afterwards. |
| **Functional development** | None. The skeleton is deployed empty on purpose. | It is the centre of the loop: the agent takes a pending item (5), asks for the business rules that are missing (6), builds, and closes with evidence (7, 8, 9, 10). Block by block, from the basics to what has consequences. | What acts on the world (charging, sending) is built in the loop **after** step 12, with its locks, and starts in dry-run mode. | Evolutions enter through the loop. |
| **Automated tests** | One smoke test that passes, in step 4. It is the seed of the suite. | With every pending item: the test proved red (7), the regression of the neighbours in the same session, and **one end-to-end test of the flow just built**, from the screen to the backend. At the close of a block: the complete end-to-end suite of **all** the existing flows, in the test environment. | Before the first deployment to production: the complete end-to-end suite of all the flows, green, with the same version that is going to be promoted. After the deployment: an end-to-end check on production, read-only. | With every change, the same as in the loop. |
| **Human look at the screens** | At the close of step 4: the owner opens the URL of the test environment and sees the empty screen. It seems trivial and it is the first time someone who is not the agent looks at the system. | **With every pending item that touches a screen**: the agent delivers a real screenshot from the test environment and the owner looks at it. Ten seconds. It is the cheapest way to find what no test finds: that the button is where it should not be, that the text says something else, that the flow is not the one the business imagined. | In step 14: the screenshots of the user manual are the last systematic human look before production. | Every new or changed screen, the same as in the loop. |
| **Human testing** | None yet, apart from opening the empty screen. | **At the close of each functional block**: the owner, or a trusted user, uses the system in the test environment as they would for real, following the flows of the block. What they find is written down as pending items. The next block is not opened with human findings without a pending item. | Before the first deployment to production: **acceptance testing** by the owner over all the flows, with realistic test data, in the test environment. And in step 14, a person who does not program follows the recovery manual. | With every evolution, at the close of its block. |
| **Owner's decisions** | In step 0 (go or no-go), step 1 (the agreement), step 2 (what it is NOT), step 3 (the architecture option). | Every time the agent stops for an unwritten business rule (6). Usually two or three per block. | In step 12 (lock by lock), in step 13 (promote to production), in step 15 (the level of the resident agent). | Whatever comes up; always written. |

One detail I want to underline because it is where people who come from vibecoding get it wrong
most often: **the end-to-end tests of all the flows are not a single time at the end**. They are
three times, at three scales. With every pending item, the flow that pending item touched. At the
close of each block, all the flows that exist up to that point. And before production, all the flows
with the exact version that is going to be promoted. If you only do the third, you arrive at the
end with a system nobody tested end to end for weeks and the go-live turns into a week of fixes.

### B.3 The rhythm of the loop: a typical functional block

A functional block is a set of between four and eight related pending items that together do
something the business can use: "the basic schedule", "the reminders", "the monthly report". A
block lasts between one and two weeks in a small project. This is what it looks like from the
inside:

1. **Opening the block (half a day).** The owner tells, in prose, what they want for this block.
   The agent turns it into numbered pending items, with their "how it is verified", and asks what
   is not enough to write a verifiable pending item (step 5). The owner prioritises.
2. **Each pending item (from two hours to a day).** The agent announces which pending item it takes
   and why. It builds. If along the way a business rule appears that is not written, it stops and
   asks (6). When it finishes, it closes with the routine of step 7: test proved red, green,
   regression of the neighbours; an end-to-end test of the flow touched; and, if the change touched
   a contract between two parts of the system, the other side updated in the same commit (8). If
   the pending item depended on a number — how many queries, how long it takes — it was measured
   first with an instrument with a test (9). And the report separates what was verified from what
   is believed and declares the blind spots (10). The owner reads the report and looks at the
   screenshot of the screen. They do not read code.
3. **Closing the block (half a day to a day).** The complete end-to-end suite green in the test
   environment. The owner or a trusted user uses the system following the flows of the block. What
   they find is written down as pending items. The user manual is updated with the new screens
   (14, in the same commit). Only then is the next block opened.

On a typical day of the loop, the owner invests between fifteen and thirty minutes: answering two
or three business-rule questions, reading two or three reports, looking at two or three
screenshots. That is all the method asks of them. If they are investing more, either the agent is
asking what it could resolve on its own (step 1), or the owner is reading code (and then something
in step 7 or step 10 is not working).

### B.4 The human milestones

I summarise in a list the moments when a human, the owner or someone they trust, has to look at or
use the system. They are few, they are at precise moments, and none can be delegated to the agent:

- **End of start-up**: open the URL of the test environment and see the empty system.
- **With every pending item that touches a screen**: look at the real screenshot from the test
  environment.
- **At the close of each block**: use the system in the test environment following the flows of
  the block.
- **Before the first deployment to production**: acceptance testing over all the flows.
- **In step 14**: a person who does not program follows the recovery manual in the test
  environment.
- **After every deployment to production**: verify that the version running is the intended one,
  and do a read-only pass through the critical flows.

Everything else — the tests, the measurements, the audits, the documentation — the model does, and
the human verifies it by the artefact, not by the code.

### B.5 How requirements come in: from the survey to the semantic tree and to the pending items

I want to dwell on this because it is where classical systems engineering has the most to say and
where vibecoding ignores it most enthusiastically. A requirement is not a sentence from the client
in a chat. It is a sentence from the client **processed** by methods that have existed for decades
and that still hold with a model at the front, because the model is very good at applying them if
you ask it to and very bad at applying them if you do not.

The methods I use, and that the method demands in every phase:

- **Interviews with the owner**, open, in prose, recorded. They are phase 0. I do not try to make
  them complete: I try to get the agent to detect what they lack.
- **Use cases or user stories**, one per flow the business can name: "the receptionist books an
  appointment", "the patient receives the reminder". Each has actor, trigger, steps, outcome and
  exceptions. They are the unit with which a functional block is opened.
- **Domain model**: the business entities, their attributes, their possible states and the
  transitions between states. It is the heart of the semantic tree (see below) and what prevents
  the model from inventing states the business does not have.
- **Acceptance criteria** per story, in the form "given such a situation, when such a thing
  happens, then such a result is seen". They are what become the "how it is verified" of each
  pending item and, later, the end-to-end test.
- **Screen prototypes**, even if they are a drawing. The human look at the screens starts here,
  before any code exists.
- **Traceability**: every requirement can be followed to the pending item that implements it, the
  test that proves it and the commit that closed it. In the method, traceability is not a separate
  matrix: it is the pending item itself, which cites its origin and its evidence.

**The semantic tree.** It is the artefact that orders all this and it is the map the agent reads in
every session (step 2). It is a tree, not a list: the system at the root; below, the domains or
modules; below each one, its actors, its processes (the use cases), its entities with their states,
its screens and its external integrations; and hanging from each node, the pending items that touch
it and the decisions that affect it. The agent builds it from the survey, you correct it, and it
grows with every block. Its value is twofold: it gives the model the exact context of the node it
is going to touch without having to read the whole project, and it gives you a way to verify that
the system the agent understands is the one the business asked for, without reading code. When a
pending item hangs from no node, either the tree is incomplete or the pending item is out of scope;
both things are seen in ten seconds.

**The detailed specification lives in the pending item.** In the classical method there was a
requirements specification document, long, that aged. Here that document is decomposed: each
pending item carries its own complete specification, and the sum of the pending items is the
specification of the system. A well-written pending item has: title; the node of the semantic tree
it hangs from; the story or use case that originates it, with the client's words; the detailed
description of what is asked for; the applicable business rules, with their decision and their
date; the data that goes in and out; the screens affected, with the prototype if there is one; the
edge cases and the exceptions; the acceptance criteria; and how it is verified. The agent drafts it
from your request in prose, asks what is not enough to specify, and you read it before it is built.
Reading a pending item's specification is the closest you are going to get to reading code, and it
is exactly the right distance.

**Closed pending items are documentation.** This is what closes the circle. When a pending item is
closed, it is not deleted or filed away empty: it stays with its specification, the decision that
originated it, the evidence it was closed with (the counts of the red and the green, the screenshot
of the screen, the measured number), the commit, and the date. The queue of closed pending items is,
then, the functional history of the system: what was built, why, when, and how it was tested. From
there come the changelog, the new sections of the user manual and, when someone asks six months
later "why does the system do this?", the answer. The course manual teaches to demand this
documentation at the close of every pending item, in the same session, as part of the routine of
step 5.

---

## Part C — The sixteen steps

### Step 0 — Can this project be run this way? (eligibility)

There is something prior to everything, which is in no repository because it always arrived
already decided: the decision of **whether a project is run with this method or not**. It is a
criterion I lived in my head for months and that I am finishing writing down. The two exclusionary
criteria I already have clear, and they come from the projects I rejected, not from the ones I
accepted [Ref. 46](REFERENCIAS.md#ref-46): the "no"s define the frontier better than the "yes"es.
The weighted criteria I am still calibrating, and I mark them as such.

- **Intention**: decide whether a project is run with this method, and with an agent at the front,
  or not, BEFORE opening the repository. Because if you enter a project that does not qualify, the
  method degrades to "programming with AI" and there the owner does end up reading code.
- **When**: once only, in the first week, before anything else. One hour of work; it saves months.
- **Inputs**: the client's request, the business domain, the data, the technology, the available
  environments, and who is going to be the owner.
- **Artefact**: a one-page eligibility sheet, with the criteria scored and the decision: go, no-go,
  or go under conditions.
- **Gate**: the exclusionary criteria are all green, and the score of the weighted ones exceeds the
  threshold (a threshold I have not defined yet).
- **Who decides**: the owner. Today it is me; the idea is that the method allows another person to
  decide it with the same sheet.
- **Failure it prevents**: getting into a project where the agent cannot verify itself on its own,
  or where there is no domain owner who decides, and ending up with the human reviewing code line
  by line.
- **Contract**: `peldanos/peldano-00-elegibilidad.md`.

**The two exclusionary criteria.**

| # | Exclusionary criterion | Why it kills the method |
|---|---|---|
| X1 | Legacy technology without an accessible repository, or with repositories that do not follow a standard | Without a standard repository there is nowhere to leave the evidence: no pending items cited in the commits (step 5), no tests travelling with the code (7), no integration and deployment as a package (13), no documentation in the same commit (14). The agent works blind and leaves no verifiable trace. |
| X2 | Technology that cannot be tested end to end: the screens cannot be executed and each element of the interface accessed with its different methods, validating that the change reached the backend | Without that screen-to-backend verification the agent cannot test itself (steps 7, 9 and 10), and then the owner would have to read code, which is precisely what the method promises to avoid. |

A precision that is worth gold for tool neutrality: **NAC3 (the protocol my tool uses so that
screens can be operated by program) is NOT a condition; it is the means with which I achieve it
today**. The neutral criterion reads like this: the interface can be executed by program, and each
element of the screen is accessible with its different methods (click, type, read its state), so
that a test can walk the screen and then verify the effect in the backend. A technology whose
interface does not expose its elements to a "driver" (like Playwright, for example) is out, even if
it has a repository.

And a reading I find important: at bottom, X1 and X2 are **the same condition seen from two sides**.
The agent has to be able to verify itself on its own, end to end, and leave the evidence in the
repository. X1 is the half "where does the evidence stay?"; X2 is the half "how is the evidence
produced?".

`[hypothesis]` **Weighted criteria, still without weight.** I leave them marked as hypotheses until
I calibrate them with the first projects that use the method end to end.

| # | Candidate criterion | How it showed up in the cases | Exclusionary? |
|---|---|---|---|
| D1 | There is a domain owner with judgement and with time to decide (not to program) | in the three systems, with the decisions written with their date | `[?]` |
| D2 | There is an "oracle" of verifiable truth: real data, an external system, production read-only | the Health Fund and its Authorizer as oracle [Ref. 26](REFERENCIAS.md#ref-26) | `[?]` |
| D4 | The technology is within what the agent masters without inventing (Node, Python, SQL, React) | the three | `[?]` |
| D5 | An error has a real consequence (money, health, operations), which justifies fail-closed | the Health Fund (health, charges), the Association (families) | `[?]` |
| D6 | The volume can be known from day one | Kikan: 3.4 million rows per year [Ref. 15](REFERENCIAS.md#ref-15) | `[?]` |
| D7 | The client tolerates a maturing period and a human in the loop | the auto-approver with dry-run mode [Ref. 28](REFERENCIAS.md#ref-28) | `[?]` |
| D9 | The scope fits in one repository and one owner | the three | `[?]` |
| D10 | Secrets and access can be isolated (vault, environment file, bounded permissions) | the API key mapped to whoever created it [Ref. 13](REFERENCIAS.md#ref-13) | `[?]` |

Two criteria I had in previous versions (that the agent can test on its own, and that the project
is new or auditable) I absorbed into X2 and X1 respectively, because they are consequences and not
separate criteria.

### Step 1 — The working agreement (the rules before the code)

Before writing a single line, put in writing how you and the agent are going to work. It seems a
formality, and it is not: it is what prevents eighty per cent of the frustrations of month one.
Think that the agent arrives every morning with no memory of yesterday; whatever is not written you
are going to have to repeat every time, and every time a little differently.

- **Intention**: fix how the human and the agent work before the first line of code.
- **When**: once only, in the first week, immediately after eligibility. Half an hour. It is revised
  when a blow demands it.
- **Inputs**: nothing from the project; it is the first file. From you: your working preferences.
- **Artefact**: a quality standards document that says, at a minimum: the human's time is sacred
  (it is not spent on things the agent can resolve on its own); zero technical debt, that is, when
  something breaks it is fixed at the root and the regression is added in the same session; the
  scope is exact, no more and no less than what was asked; the user's language is spoken;
  documentation is updated in the same commit; and never is something announced as done that was
  not done.
- **Gate**: the agreement is in the repository and is read in every session.
- **Who decides**: the owner. The agent can propose changes, but does not edit the agreement on its
  own.
- **Failure it prevents**: the agent that "helps" by expanding the scope because it seemed a good
  idea; the one that leaves debt "for later" (and later never comes); and the one that reports as
  done what it *believes* it did. I wrote it for the first time when I had spent two weeks repeating
  the same thing in every session [Ref. 1](REFERENCIAS.md#ref-1).
- **Contract**: `peldanos/peldano-01-contrato-de-convivencia.md`.

### Step 2 — The project definition and the mandatory reading

Every session of the agent starts from zero. Give it a map, short, and force it to read it before
touching anything. The two halves matter equally: a map nobody reads does not act, and a long map
nobody reads.

- **Intention**: that every session start knowing what the project is, what state it is in and
  which decisions have already been made.
- **When**: it is written once, in the first week, after the agreement; it is kept up to date
  throughout the project, with every new decision.
- **Inputs**: the agreement (step 1) and the business survey.
- **Artefact**: an operational project file, and here goes an emphasis: SHORT. It is the programme,
  not the history. Plus the **semantic tree** of the system (see B.5): domains, actors, processes,
  entities with their states, screens and integrations, with the pending items and the decisions
  hanging from each node. Plus a living-state file with what is being worked on and the open
  doubts.
- **Gate**: the agent reads the project file and the semantic tree before touching code, and it was
  proved that it reads them.
- **Who decides**: the owner defines; the agent keeps it up to date.
- **Failure it prevents**: two, quite concrete. Throwaway work for not having read the map
  [Ref. 9](REFERENCIAS.md#ref-9). And the project file that grows until it becomes unreadable
  [Ref. 41](REFERENCIAS.md#ref-41): the operational file and the casebook have to be different
  files.
- **Contract**: `peldanos/peldano-02-definicion-y-lectura.md`.

### Step 3 — Size before designing the architecture

This is the step that costs the most to skip, and I know it because I skipped it. Structural
decisions are made with numbers, and the primary numbers are held by the business, not by the
model.

- **Intention**: that structural decisions (which database engine, whether the interface is
  synchronous or asynchronous, how much concurrency) are made with numbers and not with taste.
- **When**: once, in the first week, before building the skeleton; it is redone if the business
  changes scale. Half a page and one decision in a small project.
- **Inputs**: a volume data survey done with the business, incomplete by nature; and read access to
  the previous system if one exists. There is data that **only the business has** and the model
  cannot infer: that is why the prompt demands that it evaluate whether the data is complete and ask
  for what is missing, instead of estimating it with a straight face.
- **Artefact**: a sizing record with FIXED options (three or four concrete options) and the chosen
  one; and the "asymmetric" decisions declared explicitly, for example "the persistence interface
  is asynchronous from line one even if the first engine is synchronous", because if you are wrong
  it costs little and if you do not do it it costs a fortune.
- **Gate**: the sizing is recorded before building the skeleton.
- **Who decides**: the owner chooses among the fixed options; the agent presents them with numbers.
- **Failure it prevents**: starting with a storage that cannot take the volume and discovering it
  when changing the interface costs a whole stage of re-engineering
  [Ref. 15](REFERENCIAS.md#ref-15).
- **Contract**: `peldanos/peldano-03-dimensionar.md`.

### Step 4 — The skeleton with its gates

Before the system does anything useful, it has to start, be tested and be deployed EMPTY. Yes,
empty. Because the path to production is part of the product, and the only way to know it works is
to walk it when there is still nothing to lose. This is the step where **all the initial
infrastructure and the integration and deployment chain** are done, and that is why it takes most
of the first week.

- **Intention**: have a system that starts, is tested and is deployed with no functionality yet.
- **When**: once, at the end of the first week, after the sizing and before any functionality. It
  is the close of the start-up stretch.
- **Inputs**: the sizing (step 3), the environments survey, and the credentials of the place where
  it is going to be deployed.
- **Artefact**: the skeleton with continuous integration green, the test structure set up with one
  smoke test, a deployment to a test environment that works and was run twice, and the gates of the
  workflow declared in writing.
- **Gate**: the skeleton is green, continuous integration runs, and the deployment to the test
  environment works with zero functionality. The owner opened the URL and saw the empty screen.
- **Who decides**: the agent executes; the owner approves visually.
- **Failure it prevents**: discovering the deployment a month after start-up and paying five pending
  items in a row to make it work, with functionality at stake
  [Ref. 32](REFERENCIAS.md#ref-32).
- **Contract**: `peldanos/peldano-04-esqueleto.md`.

### Step 5 — The plan is the pending items

Here is an idea that, once you grasp it, you never let go of: there is no "plan" on one side and
"task list" on the other. **The list of pending items IS the plan.** And every pending item says
how it is verified, because that is what you are going to look at instead of looking at the code.

- **Intention**: a single work queue, ordered and gated, that is the truth of the project.
- **When**: it is created when opening the first functional block, as soon as start-up ends; it is
  used in every session throughout the project. Every new block starts by turning the client's
  request into pending items.
- **Inputs**: the client's request for the block, the audits, and the findings of human testing.
- **Artefact**: a register of numbered pending items, each with its **detailed specification** (see
  B.5): the node of the semantic tree it hangs from, the origin story with the client's words, the
  description, the applicable business rules, the data, the screens, the edge cases, the acceptance
  criteria and how it is verified. And, on closing, the **documentation of the pending item done**:
  the evidence, the commit, the date, what was decided along the way. Closed pending items are the
  functional history of the system.
- **Gate**: no change goes in without a specified pending item; and the pending item is closed with
  documented evidence, not with "done".
- **Who decides**: the owner prioritises; the agent proposes and executes in order.
- **Failure it prevents**: the specification that "gets overtaken" and is obsolete in two weeks
  [Ref. 17](REFERENCIAS.md#ref-17); and the work that six months later nobody knows why it was done
  [Ref. 7](REFERENCIAS.md#ref-7).
- **Contract**: `peldanos/peldano-05-pendientes.md`.

### Step 6 — Decisions are written next to the code

The model, when it finds a gap in the business rules, fills it. It does not stop to ask; it
completes with what seems most likely to it, with the same naturalness with which it writes
everything else. That is why this step is not "write down the decisions" but "demand that it stop
and ask when one is missing", and when you decide, the decision stays with your words, your name
and the date.

- **Intention**: that every domain rule or structural decision have an owner, a date and a place.
- **When**: in every session of the loop, every time the agent runs into an unwritten rule. Usually
  two or three per functional block. Also in start-up (steps 0 and 3) and in go-live (12 and 13).
- **Inputs**: the conversation with the owner. It is the only input.
- **Artefact**: the decision written in the commit and in a decisions register, with the exact
  words. If the owner did not answer and the agent had to choose, it is marked as a "decision by
  omission" to be reviewed.
- **Gate**: a business rule does not enter the code without its origin sentence.
- **Who decides**: the owner. Always. No exceptions.
- **Failure it prevents**: arguing six weeks later about why something is the way it is; and, worse,
  the agent inventing domain rules because they seemed reasonable to it. The practice of writing
  the rule in the commit with date and owner comes from the Health Fund
  [Ref. 29](REFERENCIAS.md#ref-29), and that of freezing decisions before building, from my tool
  [Ref. 5](REFERENCIAS.md#ref-5).
- **Contract**: `peldanos/peldano-06-decisiones.md`.

### Step 7 — Tests as locks, proved red

A test you never saw fail, you do not know whether it proves anything. That is why here the rule is
not "write tests"; it is "demonstrate that the test turns red against the old code, then green, and
then that the regression stays green". And the end-to-end tests, from the screen to the backend,
are what replace your reading of the code.

- **Intention**: that every behaviour that matters have a test that FAILS if it breaks, and that it
  be known with certainty that it fails.
- **When**: with every pending item of the loop, when closing it. The end-to-end test of the flow
  touched, in the same close. The complete end-to-end suite, at the close of each block and before
  every deployment to production.
- **Inputs**: the change already implemented and the pending item with its "how it is verified".
- **Artefact**: the new test, the red and green output with counts, the regression of the
  neighbours in the same session, and the commit that says what it was proved red against.
- **Gate**: red demonstrated, green, regression green. And the agent does not mock precisely the
  part it wants to test.
- **Who decides**: the agent executes and reports; the owner reads the report, not the test.
- **Failure it prevents**: tests that pass because they prove nothing, and the green that hides a
  bug [Ref. 44](REFERENCIAS.md#ref-44). The case of the counters is the complete example of a test
  proved red against the old criterion [Ref. 26](REFERENCIAS.md#ref-26).
- **Contract**: `peldanos/peldano-07-tests-en-rojo.md`.

### Step 8 — Producer/consumer symmetry, and the anti-pattern register

When you change one end (the server, the database, a robot), the other end (the screen, a counter,
a report) has to change in the same commit. The principle that holds it up is that **every list has
a single owner**. And the mistakes you already paid for once are written down with their automatic
check, so as not to pay for them twice.

- **Intention**: that a change at one end drag the other along, always, in the same commit.
- **When**: with every pending item that touches a contract between two parts of the system; the
  contracts map is built when opening the second functional block, when there is already a screen
  and a server; the anti-pattern register grows every time something breaks for the second time.
- **Inputs**: the map of who produces and who consumes each contract; the anti-pattern register.
- **Artefact**: the server defines the list and the consumer reads it; the producer/consumer map;
  the anti-pattern register with smell, root cause, fix and early detection.
- **Gate**: automatic: the agent looks for the other side before considering a change closed.
- **Who decides**: nobody; it is automatic.
- **Failure it prevents**: the counter that does not match the query [Ref. 26](REFERENCIAS.md#ref-26);
  two copies of the same module that drift apart [Ref. 41](REFERENCIAS.md#ref-41). The
  single-source solution I imposed at the Health Fund [Ref. 27](REFERENCIAS.md#ref-27).
- **Contract**: `peldanos/peldano-08-simetria-y-antipatrones.md`.

### Step 9 — Measure before building, with an instrument that is itself verified

This is, for me, the most grown-up step of all, and the one that took me longest to formalise
because I took for granted that a model would apply it on its own. It does not. The rule is: no
number that decides anything comes from an impression; it comes from a meter that lives in the
repository, that has a test, and that you can run. And the meter is verified too, because meters
lie.

- **Intention**: that every number that feeds a decision come from an instrument with a test, and
  that the instrument itself be audited.
- **When**: in the loop, every time a pending item depends on a number or on a hypothesis of cause,
  BEFORE building. In start-up, the sizing is the first case. In a small project, "measuring" is
  counting with a command and writing the number down with the date.
- **Inputs**: the hypothesis, from the owner or the agent, and access to what is to be measured.
- **Artefact**: the guarded meter in the repository; the number with its command and its date; the
  two-direction audit; what is approximate marked; and, if applicable, a budget per path tightened
  to the measured value and protected by a test.
- **Gate**: the five rules: guarded meter; if the instrument does not exist, it is built; it is
  audited in two directions; what is approximate is marked; and the one who executes verifies the
  numbers of the one who planned.
- **Who decides**: the number. The owner brings the hypothesis; the agent measures it before
  building.
- **Failure it prevents**: the meters that lied and the plan with three out of four numbers wrong
  [Ref. 36](REFERENCIAS.md#ref-36); the ratchet at zero that did not see 84 calls
  [Ref. 35](REFERENCIAS.md#ref-35). I wrote the rules myself, in session, before they were doctrine
  [Ref. 45](REFERENCIAS.md#ref-45).
- **Contract**: `peldanos/peldano-09-medir.md`.

### Step 10 — Honest verification and proportional reporting

If you are not going to read code, the agent's report has to be trustworthy, and that does not
happen on its own. The model was trained to be helpful and complete, and a report that says "I
could not verify this" feels less helpful than one that says "done". So demand explicitly the bad
news, the blind spots and what it did not do.

- **Intention**: that the agent's report be trustworthy without the owner reading code.
- **When**: in every report, of every pending item, throughout the project. It is the shape
  everything the agent tells you has to have.
- **Inputs**: the work done and the pending item that asked for it.
- **Artefact**: a report with three blocks: verified (with the proof next to it), believed (and why
  it was not tested), blind spots (what it cannot see from where it is). It covers every item
  asked for. Bad news first.
- **Gate**: no claim without its proof. "Done" is not said on its own. Faced with a "still broken",
  first the published version is compared with the one that has the fix.
- **Who decides**: the owner trusts, or asks for the proof. Never reviews code.
- **Failure it prevents**: the error reported as success and the reports that declared verified
  what was not [Ref. 43](REFERENCIAS.md#ref-43); the turn that worked invisible for an hour and
  forty-three minutes [Ref. 16](REFERENCIAS.md#ref-16). I wrote the verification-honesty rule in
  June [Ref. 8](REFERENCIAS.md#ref-8).
- **Contract**: `peldanos/peldano-10-verificacion-honesta.md`.

### Step 11 — The periodic audit as input to the plan

Every so often the whole system has to be looked at with fresh eyes, and what is seen does not go
to a report that gets filed: it goes to the queue of pending items. The important part is "fresh
eyes": that someone who did not build audits, because the one who built shares their own
assumptions. Another session of the model, with another instructions file, is enough.

- **Intention**: look at the complete system every so often and turn what is seen into pending
  items.
- **When**: mandatory before the first deployment to production (it opens the go-live stretch). In
  operation, every one or two months depending on the pace of change, and at the close of each big
  stage.
- **Inputs**: the whole repository and production read-only.
- **Artefact**: a report with graded findings, each with location, risk, evidence and priority;
  grades per dimension; and the urgent findings already turned into pending items.
- **Gate**: every urgent finding has an open pending item before the audit is considered closed.
- **Who decides**: the owner prioritises the findings.
- **Failure it prevents**: queries that read whole tables [Ref. 18](REFERENCIAS.md#ref-18); two
  administrator doors that nobody saw until someone else looked
  [Ref. 40](REFERENCIAS.md#ref-40); a known vulnerability and an enormous component
  [Ref. 41](REFERENCIAS.md#ref-41).
- **Contract**: `peldanos/peldano-11-auditoria.md`.

### Step 12 — Fail-closed, locks and zero silent harm

On doubt or failure, the system does NOT act. And it says so. It sounds obvious, but it is the
opposite of what software does by default, which on doubt carries on. This step goes **before**
building the functionalities that act on the world, not after.

- **Intention**: that the system, on doubt or failure, not act, and warn.
- **When**: in the go-live stretch, before building any functionality that charges, sends, approves
  or deletes; it is revised with every new consequential action. New automations start in dry-run
  mode and are enabled after looking at their log for a few days.
- **Inputs**: the survey of consequential actions, done with the owner.
- **Artefact**: the locks table: each action with its reversibility, its lock, its way back; one
  test per lock proved red; new automations in dry-run mode.
- **Gate**: every irreversible action has a lock and a documented way back.
- **Who decides**: the owner approves lock by lock; the system never skips them.
- **Failure it prevents**: a double charge, an automatic approval without going through a human,
  the deletion of the client's data. The Health Fund's locks are the model
  [Ref. 28](REFERENCIAS.md#ref-28); the reflex of not breaking the whole listing, too
  [Ref. 25](REFERENCIAS.md#ref-25).
- **Contract**: `peldanos/peldano-12-fail-closed.md`.

### Step 13 — Continuous integration, environments, secrets and deployment as part of the product

Reaching production has to be a reproducible package: the tests run ONCE, the deployment only
packages and uploads, the configuration lives on the server and not in the repository, and the
rollback is tested. A good part of this already exists from the skeleton; this step completes it
towards production.

- **Intention**: that reaching production be a reproducible package, with the tests run a single
  time and the configuration outside the repository.
- **When**: the integration chain and the deployment to the test environment are set up in step 4.
  The close towards production — real environment, secrets, promotion, tested rollback, lock
  against secrets — is done in the go-live stretch, after the audit and the locks. The routine of
  every deployment applies throughout operation.
- **Inputs**: the survey of environments and access; the skeleton with its integration.
- **Artefact**: continuous integration that runs the suite once per commit; the deployment that
  waits for that result and only packages; the configuration only on the server; the promotion
  procedure written and repeatable; the rollback tested; the check that prevents uploading a
  secret.
- **Gate**: test environment green with the same version before touching production; rollback
  tested; no secret in the repository or in the chat without rotation.
- **Who decides**: the owner promotes to production; the agent prepares everything.
- **Failure it prevents**: tests run three times per commit and the quota burned
  [Ref. 39](REFERENCIAS.md#ref-39); the deployment hardened blow by blow with pending items for
  having discovered it late [Ref. 32](REFERENCIAS.md#ref-32); secrets pasted in the chat
  [Ref. 42](REFERENCIAS.md#ref-42).
- **Contract**: `peldanos/peldano-13-ci-entornos-secretos-deploy.md`.

### Step 14 — Living documentation and manuals a person can follow without AI

The system has to be usable, maintainable and recoverable without the agent and without you. If on
the day there is no agent it cannot be deployed, it is not finished. And since regenerating
documentation with a model is free, the rule becomes "in the same commit".

- **Intention**: that the system can be used, maintained and recovered without the agent and
  without the builder.
- **When**: the user manual grows with every functional block, at the close, with the new screens.
  The three complete manuals are generated in the go-live stretch, after step 13, and the test with
  a person who does not program is done before the first deployment. The same-commit routine rules
  throughout operation.
- **Inputs**: the system running in the test environment; the artefacts of steps 12 and 13.
- **Artefact**: the user manual with real screenshots, the maintenance manual, and the
  infrastructure and recovery manual written for a person who has to do it by hand at three in the
  morning; each with date and version.
- **Gate**: the documentation is up to date in the same commit; someone who does not program
  followed the recovery manual.
- **Who decides**: the agent maintains; the owner reads the manual, not the code.
- **Failure it prevents**: the outdated document that caused a commit in the wrong repository; the
  project file turned into history [Ref. 41](REFERENCIAS.md#ref-41). The manuals reproducible by
  hand are the Health Fund's [Ref. 24](REFERENCIAS.md#ref-24).
- **Contract**: `peldanos/peldano-14-documentacion-viva.md`.

### Step 15 — The agent inside the system, and the retrospective with numbers

The last step has two parts that close the same cycle. First: the agent stays resident in
production, with a bounded scope, acting on behalf of a person. Second: the method itself is
reviewed with numbers, and what is learned returns to step 0 for the next project.

- **Intention**: that the agent stay resident in production with a bounded scope, and that the
  method be reviewed with numbers.
- **When**: the resident agent, on entering operation, after the first deployment to production.
  The retrospective, at the close of each stage and of the project; it is mandatory even if it is
  one page.
- **Inputs**: the system in production, the incidents, the costs.
- **Artefact**: the resident agent's document with its map of the system, its scope, its credential
  in a person's name and the proof that what is outside the scope is rejected; and the
  retrospective with sourced numbers, every incident mapped to a step, and at least one concrete
  proposal to change the ladder.
- **Gate**: the agent cannot do what the owner did not approve; the retrospective produces at least
  one change to the ladder.
- **Who decides**: the owner.
- **Failure it prevents**: the agent that operates without a map; and the method that repeats
  itself unchanged project after project without learning. The retrospective with numbers that
  killed the multi-agent crew is the model [Ref. 6](REFERENCIAS.md#ref-6); the resident agent, the
  Health Fund's [Ref. 13](REFERENCIAS.md#ref-13).
- **Contract**: `peldanos/peldano-15-agente-residente-y-retrospectiva.md`.

---

## Part D — How it is executed, how much is demanded, and with which tool

### How each step is executed: the contract

The eight-part card says what each step seeks, when it is climbed and what it leaves. But a step is
fully understood only when you see **how it is asked for, what has to come back and how I know it
came back complete**. That is why each step has, besides the card, a **contract** in a file of its
own inside `peldanos/`, always with the same five sections:

1. **Required context**, named generically ("volume data survey", "read access to the previous
   system", "the list of actions with real consequences"), without going down into the detail of
   systems engineering. Surveys are incomplete by nature; I do not try to make them complete with a
   form.
2. **Prompts**, the ones given to the model, verbatim. The opening one and, when the step is a
   conversation, the closing one. All carry the same clause, which is the heart of the matter: *the
   model evaluates whether the context is enough; if it is not enough, it asks for everything that
   is missing before going on; and it does not estimate or invent a figure that only the business
   has*. The one who knows what it lacks in order to compute is the model, not a form.
3. **Expected result**: the detailed characteristics of the artefact.
4. **Completeness check**: the list of checks the owner does on the artefact, **without reading
   code**. If one gives "no", the step is not climbed.
5. **Warning signs**: two or three symptoms that the step was climbed badly even though it seems
   climbed.

And in the header of each contract: the stretch, the when, the form and the size (whether it is
mandatory in every project or proportional).

**The prompts are in English, and each one comes with its translation.** It is a decision I made
for three reasons: the same content in Spanish takes between 30 and 50 % more tokens; the models'
ability to follow instructions is better calibrated in English, so a prompt in English tolerates
brevity better without becoming ambiguous; and the vocabulary of the trade (test, commit, rollback,
mock) is English. But I do not want English to be a barrier to reading the method: below each
prompt goes the explanation of what I am asking for and why each clause is there, and in the HTML
version there is a button that shows the prompt translated into the document's language. The prompt
that gets pasted to the model is the English one; the translation is for you to understand it. And
they all end with "Reply in my language", because the prompt is in English but the conversation
does not have to be.

### What is mandatory and what is proportional, by project size

A question that comes up right away: "all this for a small system?". The answer is that sixteen
steps are not sixteen weeks; several are climbed in an hour, and the ones that are proportional
shrink with the project. What does not shrink is the list of the ones that are not negotiable. This
table is a `[hypothesis]` proposal to confirm with the first project that uses the method end to
end:

| Step | Small project (one owner, few users, no money at stake) | Project with users and consequences |
|---|---|---|
| 0 Eligibility | mandatory (one hour) | mandatory |
| 1 Agreement | mandatory (half an hour) | mandatory |
| 2 Definition | mandatory, fifty lines are enough | mandatory |
| 3 Sizing | mandatory, half a page and one decision | mandatory, complete |
| 4 Skeleton | mandatory if it is going to have users | mandatory |
| 5 Pending items | mandatory | mandatory |
| 6 Decisions | mandatory | mandatory |
| 7 Tests proved red | mandatory | mandatory |
| 8 Symmetry | the rule yes; the map, optional | mandatory with map |
| 9 Measure | proportional: count and write down | mandatory, with meters and budgets |
| 10 Honest verification | mandatory | mandatory |
| 11 Audit | one, before production | periodic |
| 12 Fail-closed | optional if it is read-only | mandatory |
| 13 Integration and deployment | minimum: tests on their own, configuration outside, rollback | mandatory, complete |
| 14 Documentation | minimum: recovery | the three manuals |
| 15 Resident and retrospective | one-page retrospective | both |

In summary: there are nine steps that are not negotiable in any project (0, 1, 2, 3, 5, 6, 7, 10
and the retrospective of 15), and seven that are sized with the project.

### How it is used with any tool

The method is tool-neutral; what changes from one tool to another is **where each artefact is put**
so that the model reads it. The correspondence, for the most used tools at the end of 2026:

| Artefact of the method | Claude Code | Cursor | Codex CLI / Gemini CLI | Forge |
|---|---|---|---|---|
| Working agreement (S1) and routines (S5, S6, S7, S8, S10, S14) | the project's `CLAUDE.md` | `.cursor/rules/` | `AGENTS.md` / `GEMINI.md` | doctrines injected per gate |
| Project definition (S2) | `CLAUDE.md` + `docs/STATUS.md` | same, in rules and docs | same | `PROJECT.md` + context file |
| Pending-items register (S5) | `docs/PENDING.md` or issues | same | same | native pending-items register with verbs |
| Step prompts (all) | pasted into the chat when climbing the step | same | same | injected when the gate is crossed |
| Gates (S4) | `docs/GATES.md`, manual | same | same | G1 to G9, automatic |
| Meters and budgets (S9) | scripts in the repo with tests | same | same | same, plus the static ratchet |

The Forge column is the one that automates the most; the other three work just as well if the
owner does by hand what Forge does on its own: paste the step's prompt at the right moment and
demand the completeness check before moving on to the next. That is, in fact, the practice of the
course.

---

## Part E — What remains to be elaborated

1. **Step 0 complete**: the weights of the weighted criteria, the threshold, and more rejected
   projects as counterexamples. I have X1 and X2; the rest is missing.
2. **A memorable name for each step**, in one sentence, for the manuals and the publications.
3. **The export to Forge**: which steps are already gates or commands and which are missing to be
   able to run the ladder as an execution workflow.
4. **Test the contracts in a real project end to end.** The sixteen prompts are written from what
   I did, not executed as-is. The first project that uses them in full is going to correct several;
   it is part of step 15.
5. **The first cohort of the course**, which is going to correct the times of the timeline and the
   typical mistakes, which today are written from my projects and not from students.
6. **What is NOT on the ladder and should be** `[hypothesis]`: the management of token cost and
   quotas as an explicit budget (today it is reactive); secret rotation as a routine and not as an
   incident; and a criterion for when the human DOES have to look at the code, because today the
   answer is "never" and I suspect there are specific moments when it is worthwhile.

---

## Glossary

Every acronym, every proper name and every colloquial expression that appears in this document,
explained. In alphabetical order. Some entries are terms that appear in file names or commit
messages of the source repositories; I keep them so that the evidence can be followed.

**Acceptance criteria** — The conditions, written in the form "given such a situation, when such a
thing happens, then such a result is seen", that define when a requirement is met. In the method
they are the "how it is verified" of each pending item and the script of the end-to-end test.

**Acceptance testing** — The tests the owner, or a trusted user, does using the system as they
would for real, before accepting it for production. They are human; the agent does not do them.

**Agent** — An artificial intelligence program that does not just answer questions but executes
actions: reads files, writes code, runs commands, makes commits. In this document, "the agent" is
Claude Code or whichever tool you use.

**Anonymisation** — In this document the real clients are called "the Health Fund", "the
Authorizer" and "the Association", and their systems "Autorizaciones" and "Kikan". It is on
purpose: the names are withheld until I have permission to use them.

**Anti-pattern** — A way of doing things that seems reasonable but is known to end badly. The
opposite of a "pattern" (a proven good practice).

**Artefact** — Something concrete that is produced: a file, a test, a script, a document. On the
ladder, every step leaves an artefact.

**Association (the)** — What I call in this document the client of the Kikan system (its real name
is withheld): a civil association that serves families and needed an omnichannel service desk and
campaigns.

**Asynchronous / synchronous (async / sync)** — A synchronous call waits for the result before
going on; an asynchronous one leaves the task running and goes on, and collects the result later.
Real databases in Node are asynchronous; that is why the interface has to be so from the start.

**AUD-\*** — The series of numbered audits that were done in Kikan in August, and that generated
pending items.

**Authorizer (the)** — What I call the Health Fund's system that receives the orders and returns a
verdict (approved, rejected). For us it works as an "oracle": the truth against which the counters
are verified.

**Auto-approver** — In Autorizaciones, the robot that approves orders automatically according to
rules. It first ran in "dry-run mode" (see dry-run) before letting it act.

**Autopilot** — A written mandate for the agent to work on its own for hours (24 or 48), making
commits and pushes without asking, and deliver a summary at the end.

**Autorizaciones** — The name I give to the first system in production (the real one is withheld):
automation of the handling of the Health Fund's orders for a health entity, with a human in the
loop.

**await** — In JavaScript, the word that means "wait for the result of this asynchronous call". A
call to the database without `await` is a silent bug: the code goes on before it has the data.

**Backend** — The part of the system that is not seen: the server, the logic, the database. The
opposite of "frontend" (the screen).

**Board (the)** — Forge's shared board where the agent leaves reports for me to read.

**CI (continuous integration)** — A service (here, GitHub Actions) that runs the tests
automatically every time code is pushed. CI/CD adds automatic deployment.

**CLAUDE.md / PROJECT.md** — The file the agent reads when starting each session to know what the
project is and how to work in it.

**Claude Code** — Anthropic's tool with which I worked on these projects and with which I wrote
this document: a session of a model with access to the repository, which reads, writes, executes
and makes commits.

**Closed pending item (documentation of what was done)** — A pending item that, on closing, keeps
its specification, the decision that originated it, the evidence it was closed with, the commit and
the date. The queue of closed pending items is the functional history of the system.

**Commit** — A saved point in the history of the code, with a message that explains what changed
and why. Each commit has a short identifier (for example `2219f7a`).

**Concurrency** — How many things happen at the same time in the system (simultaneous users,
parallel processes).

**CORS** — A security mechanism of browsers that decides from which domains a server can be
called. Misconfigured, it blocks legitimate calls with confusing errors.

**CVE** — A public identifier of a known security vulnerability in a software component.

**Doctrine** — In Forge, a short document that fixes how something is done (how to test, how to
verify, how to size). It is the form the method takes inside the tool.

**Driver (criterion)** — A factor that pushes a decision one way or another. In step 0, the drivers
are the factors that decide whether a project is eligible.

**Dry-run (dry-run mode)** — Running a process "dry": it does everything except the final action.
The auto-approver ran like this at the beginning, showing what it would have approved without
approving anything.

**Embedded (embed)** — Forge installed inside the client's system, as a resident assistant, with
bounded permissions.

**End to end (E2E)** — Testing the complete system, from the screen to the database, as a person
would use it.

**Environment** — A separate installation of the system. The usual ones: development (the
programmer's machine), UAT (client testing) and PROD (production, the real one).

**Fail-closed** — "Fails closed": on doubt or error, the system does not act. The opposite of
"fail-open", which on doubt carries on.

**Fallback (to legacy)** — Going back to an old path when the new one fails. The method forbids
it: if there is an old system, it is audited and migrated; it is not left as a silent safety net.

**Fixture** — Test data loaded before running a test or a deployment.

**Flip (switch)** — A configuration change that chooses between two paths (for example, the old
engine or the new one) without touching code.

**Forge (Yujin Forge)** — The tool I built: a layer on top of Claude Code that adds the method to
it (doctrines, gates, pending items, a chat panel, a mobile app, and the embedded mode).

**Frontend** — The visible part of the system: the screens.

**Full scan** — A database query that reads the whole table because it has no index to help it.
With small tables it is not noticed; with millions of rows, it brings the system down.

**Functional block** — A set of between four and eight related pending items that together do
something the business can use. It is the unit of work of the loop; it lasts between one and two
weeks in a small project.

**G-DOC** — In Forge, the gate that demands that documentation be updated in the same commit as the
change.

**Gate** — A condition that has to be met to be able to move forward. If it is not met, you do not
pass. In Forge they are numbered G1 to G9.

**gate-ci** — The job in Kikan's deployment that waits for continuous integration to finish green
before packaging.

**GCP** — Google Cloud Platform, the cloud where the servers of the Association's two systems run.

**GOTCHAS** — A file that records known "traps": mistakes we already paid for once, with their
smell, their root cause, their fix and how to detect them earlier.

**Greenfield / brownfield** — A new project from scratch (greenfield) versus one that starts from
something existing (brownfield).

**Grep** — A command that searches for text in files. "A meter, not grep" means: an important
number is not obtained by counting with a text search, but with a program with a test.

**Guarded meter** — A script that measures something (how many queries, how many loops) and that
has its own test verifying that the meter measures correctly. "Guarded" means "protected by a
test".

**Hard way (the)** — Learning something because it went wrong, not because someone explained it
beforehand. I use it in the sense of "these rules were learned the hard way", and in this document I
clarify that it is not the whole truth: the principles I brought from before; the blows showed
where the model does not apply them.

**Health Fund (the)** — What I call the health entity that is the client of the first system in
production (its real name is withheld).

**Heap** — The memory a program uses. "The suite was dying by heap" means that the tests were
running out of memory and it looked as if they were failing.

**HITL (human in the loop)** — A design where a person approves before the system acts. In
Autorizaciones, the manual approver.

**Human look at the screens** — The habit of the owner looking at a real screenshot of every new
or changed screen, in the test environment, with every pending item that touches it. Ten seconds
that find what no test finds.

**Index** — An auxiliary structure of the database that makes a search fast. Without an index, the
query is a full scan.

**IPC (inter-process leash)** — A channel between two processes. In Forge it was used as a
"leash": if the parent process dies, the child finds out and shuts down.

**JSON (storage in)** — Keeping the data in text files in JSON format instead of in a database. It
works to get started; it does not work for millions of rows.

**Kikan** — The Association's omnichannel service desk and campaigns system, the second system in
production.

**Legacy** — An old system that is still in use.

**Lie (a meter)** — When an instrument returns a wrong number because it does not see part of what
it has to measure. It happened to us twice.

**Lock** — A protection that prevents a dangerous action from happening without an explicit
condition. For example, the panic button has a dedicated lock: it cannot be pressed by accident.

**Log** — The record of what a program is doing. "Validate with the log" means: do not trust what
the agent says it did, look at the record.

**MariaDB** — The SQL database engine Kikan uses in production.

**Mock** — Replacing a real part of the system with a simulation during a test. "Do not mock
yourself" means not simulating precisely the part you want to test.

**Month three** — My expression for the moment when a system built in a hurry starts showing its
problems: when it already has real data and real users.

**NAC3** — Forge's protocol that makes the screens of an application operable by program (each
element of the interface has an identifier and methods). It allows the end-to-end test. It is not
mandatory for the method: it is the means, not the condition.

**Node (Node 22)** — The environment where the server's JavaScript runs. "Node 22 pinned" means the
version was nailed down so that all environments use the same one.

**Oracle** — An external source of truth against which a result can be verified.

**Orphan (orphan turn)** — A process that keeps running when the one that launched it has already
lost track of it.

**Overwrite (a configuration)** — Writing on top of something by accident.

**P0, P1, P2** — Priority levels of a finding: P0 is what has to be resolved right now.

**Playwright** — A tool that controls a browser by program to test screens as a person would.

**PND (pending item)** — A numbered item of the work queue (PND-001, PND-002…). In this method, the
pending items ARE the plan, each carries its detailed specification, and the closed pending items
are the documentation of what was done.

**PROD (production)** — The real environment, the one the client uses.

**Promotion (UAT → PROD)** — Moving something from the test environment to production in a
controlled way.

**Proved red** — A test that was demonstrated to FAIL against the old code before the fix turns it
green.

**Pull / push** — Downloading and uploading code to the remote repository (GitHub).

**Query budget** — The maximum number of database queries a path of the application can make,
measured and protected by a test.

**Ratchet** — A mechanism that only turns one way. In Kikan, a counter of calls without `await`
that can only go down: if it goes up, the test fails.

**Ref. N** — A short reference to a real case, explained in the references document with its date
and its evidence. It is there so that the procedures stay clean and the detail stays available.

**Regression** — A test that verifies that something that already worked keeps working after a
change.

**Repository (repo)** — The place where the code lives with all its history. "Standard repo" means
one managed with Git and with a recognisable structure.

**Requirements intake** — The moment when the business's request enters the method: first in
prose, with the owner, and then turned into verifiable pending items by the agent, which asks for
what is missing.

**Requirements specification** — In the classical method, a long document that described
everything the system had to do. In this method it is decomposed: each pending item carries its
complete detailed specification, and the sum of the pending items is the specification of the
system. See B.5.

**Retention** — How long the data of each table is kept before deleting it.

**Rollback** — Going back to the previous version when a deployment goes wrong.

**Root cause** — The real reason for a problem, as opposed to the symptom. Fixing the symptom makes
the problem come back; fixing the root cause does not.

**RPAForce** — My brand, under which these systems are delivered.

**Runbook** — An operating procedure written step by step. "Idempotent" means it can be run twice
without breaking anything.

**Seeder** — A script that loads test data into an environment.

**Semantic tree** — The map of the system in the form of a tree: the system at the root; below,
the domains; below, actors, processes, entities with their states, screens and integrations; and
from each node hang the pending items and the decisions that touch it. The agent builds it, you
correct it, and it is what the agent reads before touching code. See B.5.

**Shift left** — Moving testing earlier in the development process.

**Skeleton (scaffold)** — The initial structure of a project, without functionality: it starts, it
has empty tests, it is deployed.

**Smell** — A sign that something is wrong in the code, before it fails.

**SQ (quality standards)** — The working agreement between human and agent in Forge.

**SQL** — The language of relational databases.

**Stretch** — Each of the three groups of steps: start-up (0 to 4), loop (5 to 10), operation (11
to 15).

**Tag** — A label on a commit that marks a version.

**TDD** — "First the test, then the code". The method leaves it as an option for small scopes, not
as a universal rule.

**Technical debt** — What is left badly done "to fix later". The method forbids it: what breaks is
fixed at the root in the same session.

**Test suite** — The complete set of tests of a project, run all together.

**Tighten the ceiling** — Lowering a limit (a budget, a maximum allowed) until it sits just above
the measured value, so that any worsening makes a test fail.

**Timeline** — Part B of this document: when each step is climbed and which tasks of
infrastructure, intake, development, testing and human look happen in between.

**Token** — Two senses. In AI: the unit with which the text the model processes is measured (and
charged). In security: an access credential.

**Traceability** — Being able to follow a requirement to the pending item that implements it, the
test that proves it and the commit that closed it. In the method it is not a separate matrix: it is
the pending item itself, which cites its origin and its evidence.

**Turn** — One round of the conversation with the agent: the user asks, the agent works and
answers.

**UAT** — The environment where the client tests before production.

**Urazuke** (裏付け) — The name of the method. In Japanese, the backing a claim has, what holds it
up from behind; *urazukeru*, to back with proof. Pronounced u-ra-ZU-ke. It is not translated.

**Vault** — An encrypted place where secrets (keys, passwords) are kept instead of leaving them in
text files.

**Vibecoding / vibecoder** — Building software by conversing with an AI, describing what you want,
instead of writing the code by hand. A vibecoder is whoever does it.

**Volume (volumetrics)** — How much data the system is going to handle: rows per year, users,
peaks.

**Watchdog (silence watchdog)** — A process that checks whether another is still giving signs of
life, and kills it if it stays silent too long.

**Watchman** — In Autorizaciones, the process that periodically checks what got stuck and pushes
it, with guards so as not to push twice.

**Yujin** — The ecosystem of which Forge is the commercial product.
