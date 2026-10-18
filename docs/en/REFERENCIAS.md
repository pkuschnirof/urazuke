# Urazuke — References: the cases behind the method

Author: Pablo Kuschniroff, assisted by Claude Code. Version 4, 18 October 2026.

This document exists for one thing: so that the procedures and the manuals of the method stay
clean. When, in the main document, in a step contract or in a lesson of the course, I claim
something along the lines of "I learned this the hard way" or "I imposed this because the model
applied it badly", I do not want to clutter the explanation with dates, commit identifiers and
pending-item numbers. I put a short mark, `[Ref. N]`, and whoever feels like investigating the
case comes here and finds it with its date, its evidence and my reading of what happened. Whoever
does not feel like it keeps reading without stumbling.

Two clarifications before starting. The first: the three systems these cases come from are real
and are in production today, with real people using them. The clients are anonymised, and I call
them "the Health Fund" (with its "Authorizer") and "the Association"; their systems I call
"Autorizaciones" and "Kikan". The third repository is the tool where the method was born,
yujin-forge, which is mine and carries its own name. The numbers, the dates and the commit
identifiers are real; if one day I have the clients' permission, I will put the names in.

The second clarification matters more, and I repeat it in the main document because I do not want
it to be misread: **the method did not come only from the casuistry of failures**. It came from
two things that combined. On the one hand, from my own knowledge of systems engineering, which I
have been applying since long before these models existed; most of what I demand in the steps is
what I always demanded in a well-run project. On the other hand, from the fact that the incidents
of these five months showed me, one after another, **where the models apply those principles in a
fragile way**: where they say they tested and did not test, where they estimate with a straight
face, where they fill a gap in the business rules with a whim, where they over-report. The cases
that follow are, then, the proof of where it is necessary to tighten, not the origin of the whole
method. Read them through that lens.

---

## How to cite

In any document of the method, `[Ref. 26]` links to the entry "Ref. 26" of this file. The
entries are grouped by source system and, within each group, in chronological order. At the end
there are three complete chronologies, in case someone wants to see the whole sequence, and a
table that maps each failure to the step that covers it.

---

## A. yujin-forge: where the method was formed (May to October 2026)

### Ref. 1 — The quality standards are born (25 May)

I wrote the first quality standards document, `SQ.md`, on 25 May (commit `2219f7a`). It is the
first "working agreement" between the human and the agent, and I wrote it because I had spent two
weeks repeating the same things to the model in every session: that my time is sacred and is not
spent on what it can resolve on its own; that no technical debt is left behind, whatever breaks
is fixed at the root; that the documentation is kept up to date; that the scope is exact, no more
and no less than what was asked. None of that is new in systems engineering. What was new was
having to write it down for a collaborator who arrives every morning with no memory of yesterday.
It is the origin of step 1.

### Ref. 2 — The first anti-pattern register (27 May)

On 27 May (commit `73f4029`) I opened `GOTCHAS.md`: a file where every error that repeated itself
is written down in a fixed format: how it smells, what the root cause is, how it was fixed, and
how to detect it next time before it hurts. I opened it because the model was making the same
mistake in different sessions with no memory whatsoever of having made it before. It is the
"anti-patterns" half of step 8.

### Ref. 3 — The gates of the workflow, injected only when they apply (2 June)

On 2 June (commit `5b47475`) I defined explicit gates in the workflow, numbered G1 to G9, and a
documentation gate, G-DOC, which requires the documentation to be updated in the same commit as
the change. And I took a decision that turned out to be important: the doctrine of each gate
enters the agent's prompt only at the moment it applies, not always, because context is finite
and whatever is injected in excess is paid for in attention. It is the direct precedent of the
idea of a "step contract" that gets injected when the gate is crossed.

### Ref. 4 — The testing policy is reformulated (4 June)

Until 4 June I insisted on "first the test, then the code" for everything. That day (commit
`a9f59c7`, document `testing-policy.md`) I accepted that it does not work universally: by default
the tests come after implementing, test-first stays as an option for small, well-defined scopes,
the skeleton has to be green as a gate, and I added a protection against loops, a modal that
stops everything when the agent goes round in circles without making progress. I tell it because
it shows that the method also corrects itself when a rule of mine turns out to be too rigid.

### Ref. 5 — Decisions are frozen before building (4 June)

Before a big sprint I wrote and numbered three structural decisions (D1, D2, D3) in a decisions
document of 4 June. It was the first time I formalised something I had always done in classic
projects: the decision is written before building, with a date, so that afterwards nobody argues
it from memory. It is the precedent of step 6.

### Ref. 6 — I eliminate the multi-agent team with a number in hand (5 June)

I had a team of five agents (director, analyst, programmer, tester, skeleton builder) that passed
work among themselves. I ran a measured experiment: that team spent 60 dollars and 73 minutes and
delivered something half-done; a single session with a single agent took 90 minutes and delivered
something publishable. On 5 June (commit `7584f8b`, documented in an internal paper) I
eliminated the whole team. It is the first case of "retrospective with a number in hand, and
redesign", and it is the reason why step 15 demands numbers and not impressions.

### Ref. 7 — The plan becomes the list of pending items (6 June)

On 6 June (commit `4fc82c6`, plan for the pending-items register) the work plan came to BE the
queue of pending items: a canonical, numbered list, with commands to manage it, refreshed in every
session. There stopped being a "plan" on one side and "tasks" on the other. It is the origin of
step 5.

### Ref. 8 — Verification honesty and workflow kinds (10 June)

On 10 June (commits `7ab9d8a` and `2c552c0`, documents `verification-honesty.md` and
`workflow-kinds.md`) I made the doctrine mandatory in every prompt and wrote the rule of
"verification honesty": verify that the net really turns red when it has to, declare the blind
spots, and make claims proportional to what was checked. I also separated three workflow kinds:
new project, correction and evolution. It is the origin of step 10 and of the "red" half of
step 7.

### Ref. 9 — Work discarded for not reading the map (12 June)

On 12 June a session started building without reading the project's knowledge graph, and the
work of a whole afternoon was discardable because it contradicted decisions that were already
written. From there comes the mandatory-reading rule of step 2: the map exists, but if reading it
is not enforced, it does not act.

### Ref. 10 — Autopilots of 24 and 48 hours (14 to 21 June)

Between 14 and 21 June I let the agent work alone for a day, and then two, with a written
mandate: commit and push for every piece, without asking, and I received a summary. I tell it
because it proves that the method withstands long autonomy when the working agreement and the
pending-items register are well made; and because it was there that I learned to read summaries
with distrust, which is step 10.

### Ref. 11 — Diagnostic mode on other people's systems (July)

In July (document `diagnostic-mode.md`) the agent started entering clients' production systems
in diagnostic mode: read-only, bounded, touching nothing. It is the first level of the scope of
the resident agent of step 15.

### Ref. 12 — Performance patterns taken from the Health Fund's production (22 July)

On 22 July (commit `873339c`) I incorporated into the tool scale patterns extracted from the
Health Fund's system: the two-transaction one and, above all, "measure before touching". It was
the first time the method fed on a system that was already in production, and it is a precedent
of step 9.

### Ref. 13 — The agent becomes resident in the Health Fund's production (14 August)

On 14 August the agent was installed inside the client's system, as a resident assistant, with
three rules: a mandatory map of the system before operating, "operational solution first" when
something fails, and the ability to open tickets. It is the origin of the first half of step 15.

### Ref. 14 — Sizing as a gate (10 and 11 October)

On 10 and 11 October (commits `c602725` and `0bd1b05`, document `sizing.md`) I formalised sizing
before building, choosing among fixed options, and I recorded it as one more gate (G9). I
formalised it late, after the Kikan blow I tell in reference 15, and that is precisely the lesson
of step 3.

### Ref. 15 — The asynchronous persistence interface from line one (13 October)

On 13 October (commit `7391cc5`, document `persistence-interface.md`) I wrote the rule that the
interface with the database is asynchronous from the first line, even if the first engine is
synchronous. It is an "asymmetric" decision: it costs little if you are wrong and costs an
enormous amount if you do not take it. I know because in Kikan I did not take it in time and
changing it afterwards cost a whole stage of the re-engineering, E6, with three test suites moved
to asynchronous. It is a case of step 3.

### Ref. 16 — The orphan turn of one hour forty-three (14 October)

On 14 October the agent worked for one hour and forty-three minutes invisible to me, and made six
commits in that span. It was a failure of the method, and an ugly one. I fixed it at the root in
version 1.18.0 (commit `b80a659`): a silence watchdog that kills the turn if it stops giving signs
of life, an inter-process leash so that the child dies with the parent, and 28 tests. It falls
under step 10 (the report has to be visible) and step 12 (on doubt, the system does not go on).

---

## B. Autorizaciones: the method under real load (June to October 2026)

### Ref. 17 — The initial design that the repository overtook (11 June)

Autorizaciones started with a design document ("option C"). The repository overtook it very
quickly: what was built was far more than what the paper said. The lesson I was left with, and
which is in step 5, is that the specification is worth having as a starting point and the living
plan is the pending items.

### Ref. 18 — The first audit of queries without an index (23 June)

On 23 June I did the first audit of "full scans" (queries that read the whole table because there
is no index) on a live system. The findings became pending items, not a filed report. It is the
origin of step 11.

### Ref. 19 — Lessons from Google's cloud (24 June)

The infrastructure mistakes of the first weeks on Google's cloud were written down as lessons so
as not to repeat them. It is the first version of what later became the infrastructure manual of
step 14.

### Ref. 20 — The user manual is born together with the system (26 June)

On 26 June there was already a user manual, with the system half built. I did it that way on
purpose: in classic projects the manual was written at the end, when nobody remembered anything
any more; with a model that regenerates it for free, there is no excuse for it not to be born
with the system. Step 14.

### Ref. 21 — Second-layer backup (13 July)

Before trusting the system with real data I put two layers of backup in place: one local and
another in Google's storage. Step 13 and the recovery manual of step 14.

### Ref. 22 — PND-300: four rounds until the root cause (14 July)

A bug came back three times until the real cause was found, on 14 July. Each previous "fix" had
been on the symptom. Here "the fix is at the root or it is not a fix", which was already in the
working agreement, stopped being a phrase and became practice: the hypothesis has to be measured
before touching. Steps 1 and 9.

### Ref. 23 — Security audit (16 July)

On 16 July I did the first formal security audit, with findings turned into pending items. It was
the one that convinced me to treat security as a periodic audit and not as a list that gets
ticked once at the beginning. Step 11.

### Ref. 24 — Internal manual and disaster recovery manual (26 and 29 July)

On 26 and 29 July (commits `6444ce6`, pending item 442, and `a30cee3`, pending item 459) I left
everything operational documented, deploying, recovering, maintaining, in a form "reproducible by
hand, without AI". The criterion I used, and which is in step 14, is that if tomorrow there is no
agent, a trusted person who does not program can follow the manual.

### Ref. 25 — Fail-closed as a reflex (27 July)

On 27 July (commit `e18406d`, pending item 452): if a table does not exist or a lookup fails, the
row simply stays without its button; the whole listing never breaks. On doubt, do not act and do
not break. And the test for that correction was proved red "without the try/except", that is, it
was demonstrated that without the protection the listing broke. Steps 7 and 12.

### Ref. 26 — The counters that did not match: 1,355 versus 1,234 (6 and 7 August)

This is, for me, the most complete example of "verify with an instrument". A counter on the
screen showed 1,355 approvals and the query to the database showed 1,234. On 6 and 7 August
(commits `ab3e529`, pending item 517, and `1f5feb9`, pending item 514) the root cause was
verified directly on production in read-only mode, the difference was decomposed number by number
(145 too many, 24 too few; 145 minus 24 is 121), a test was written and proved RED against the
old criterion, and the diagnostic script stayed in the repository for the next time. Steps 7, 8
and 9.

### Ref. 27 — Producer/consumer symmetry (6 August)

On 6 August (commits `50fe968`, pending item 510, and `7251129`, pending item 509) I imposed that
the "reason for waiting" the user sees be computed with the SAME gates the robot decides with,
and that the list of columns of the grid be defined by the server and consumed by the frontend.
That way they cannot diverge. It is the rule "every list has a single owner" of step 8.

### Ref. 28 — Panic button with a lock, dry-run mode for the approver, watchman with guards (7 August)

On 7 August (commit `0954740`, pending item 524) the system's locks were in place: a panic
button with a double safety, the auto-approver running first in dry-run mode (it does everything
except approve, and logs what it would have approved), and a watchman that pushes what got stuck,
with guards so as not to push twice. Step 12.

### Ref. 29 — The domain rules written in the commit (10 August)

On 10 August (commit `0ae3ae6`, pending item 550) the commit message says, verbatim: "regla
Pablo: aprobada + saldo = vuelve" ("Pablo's rule: approved + balance = comes back"), "decisión
Pablo 2026-08-10" ("Pablo's decision 2026-08-10"). The business decision stayed with a date and an
owner, attached to the code that implements it. Step 6.

---

## C. Kikan: the mature method (August to October 2026)

### Ref. 30 — Start with the method already written, and the AUD-* series of audits (21 to 29 August)

Kikan was the first project that started with everything above already written from day one: an
operational project file and pending items as the plan from the first commit (21 August). On 28
and 29 August I did a series of early audits (AUD-1, AUD-2…) that turned directly into 19
pending-item documents. Steps 2, 5 and 11.

### Ref. 31 — Continuous integration from the first week; deployment as a package (28 August, 23 and 24 September)

The tests ran on GitHub from the first week (`ci.yml`, 28 August). The deployment arrived on 23
September (`deploy.yml`, commit `bb801ed`): a package, with the configuration living on the
server and not in the repository, and the runtime version pinned. That the deployment arrived a
month after the start is the mistake that motivates step 4.

### Ref. 32 — The deployment is hardened blow by blow, one pending item at a time (30 September to 4 October)

Between 30 September and 4 October there were five pending items in a row just to make the
deployment work properly: the public URL in both environments (`f85c3c9`), reloading the service
before restarting and before rolling back (`513c8d0`, pending item 108), a fixture that
reconciles instead of duplicating (`076df76`, pending item 134), the client's material outside
the mirrored tree (`9d76af8`, pending item 130), and the test suite that no longer dirties the
configuration that travels in the deployment (`0bd20a8`, pending item 107, 3 October). If the
skeleton had been deployed empty in the first week, those five blows would have been taken with
zero functionality at stake. Steps 4 and 13.

### Ref. 33 — Promotion from UAT to production (4 and 8 October)

On 4 and 8 October (commits `4eb5ad7`, pending item 027, and `7658e2e`) an explicit circuit was
put in place to move configuration and campaigns from the test environment to the production
one. Step 13.

### Ref. 34 — The schema derived from the code, with a lock (11 October)

In stage 1 of the persistence re-engineering (commits `6113319` and `68819ce`) the inventory of
tables and fields was derived from the code itself, with a test that protects it, and it was
opened on the shared board so that I could review it. It is a list with a single owner, the
code. Step 8.

### Ref. 35 — The static ratchet, and the meter that could not see (11 to 13 October)

In stage 6 of the re-engineering (commits `06b2734`, `f6e5221`, `2fc6239`, `1d55a93`) I put in a
"ratchet": a counter of calls to the database without `await`, that is, without waiting for the
result, which can only go down and never up. And something happened that is worth telling: it was
discovered TWICE that the meter could not see parts of the code. First 70 calls, then 84, with
the counter at zero. If the instrument is not verified, the number reassures and lies. Step 9.

### Ref. 36 — The meters that lied and the five rules of section 11.b (13 and 14 October)

Verbatim from the commits of 13 October (`880ac0f`, `f955620`): "the E7.5 meter lied on a
database with the ALTER already applied"; "it is 44, not 27". And a few days earlier, a plan
claimed there were 121 loops of a certain kind and the one who executed measured 79. Out of all
this I wrote section 11.b of the re-engineering document, with the five rules that today are
step 9: a guarded meter; if the instrument does not exist, it gets built; it is audited in both
directions; what is approximate is marked; and the one who executes verifies the numbers of the
one who planned. With the sentence that sums it up: "three out of four assertions were wrong;
where there was an instrument, exact".

### Ref. 37 — Query budget and the ceiling tightened to the measured value (14 October)

In stage 8 (commits `5926b3f`, `10ada00`) every path of the application was left with a budget
of database queries, measured and protected by a test, and the change of database engine was left
as a switch per environment. In stage 9 (`0730082`, `7f5f1af`) the ceiling was tightened to the
measured value plus a small margin: 63 over 60. The budget is not an invented number. Step 9.

### Ref. 38 — Retention per table, and an integrity report made by another session (14 October)

In stages 10 and 12 (commits `f72b15a`, `b266f11`) the real package started carrying the
migration scripts, data retention was declared per table and bounded in production, and an
integrity report made by a different Claude Code session, one that had not built the system, was
absorbed as pending items. It is the auditor distinct from the builder of step 11.

### Ref. 39 — The deployment only packages, and the quota that got burned (14 October)

The tests were run three times for every commit, between 16 and 27 minutes each time; in 16 days
2,000 minutes of GitHub Actions quota were consumed, and a day of 23 pushes finished burning it.
On 14 October (commit `39497b0`) I split the circuit: the tests run ONCE only, in continuous
integration; the deployment waits for that result and only packages. From 16 to 27 minutes per
commit, down to 11. Step 13.

### Ref. 40 — Two administrator doors in twenty-four hours (15 October)

On 15 October two administrator doors were created in a single day (pending items 223 and 257).
An external review detected it; I withdrew one (commits `69bdab2`, `20fdbe7`, `1558ee4`) and a
single way in remained. I tell it as evidence that the method withstands "undo quickly" without
drama, and of why the audit has to be done by someone who did not build. Steps 11 and 12.

### Ref. 41 — The quality audit: a vulnerability, a huge component, a project file of 9,661 lines (15 October)

The quality audit of 15 October found a known vulnerability in a dependency, a screen component
of 2,679 lines, eight modules duplicated between the web version and the mobile one, and a
`CLAUDE.md` that had grown to 9,661 lines and 789 kilobytes, a file that at that point nobody
reads, not even the model. From there comes the rule of step 2: the project file is the
programme, not the history, and the casebook goes separately. Steps 2, 8 and 11.

### Ref. 42 — Secrets pasted in the chat (14 and 16 October)

On 14 October a database key was printed in a transcript, and on 16 October some API keys showed
up pasted in the chat. Neither of the two was "seen by anyone", and both have to be rotated all
the same, because a secret that has been in a chat, in a log or in a commit is no longer a
secret. Step 13.

### Ref. 43 — Three reports that were not what they said (14 to 16 October)

Three small and very illustrative cases of step 10. On 14 October an authentication error was
reported by the tool with the label "success". On 16 October the server's CORS was derived only
from the first domain name, and the configuration assistant of the test environment was giving a
500 error that the report did not mention. And the mobile application lost its tabs under
conditions the report declared verified. All three are corrected with the same rule: separate
what was verified from what is believed and declare the blind spots.

### Ref. 44 — The test suite that died from memory and looked like a failed test

A whole test suite "died" from lack of memory (commit `1d7a20b`), and the report read it as a
failing test. Until the complete output was looked at, it was not understood that no test had
failed: the process had crashed. It is the reason why step 7 asks for the counts of the red and
the green, not just the verdict.

---

## D. What I imposed in session, and what I rejected

### Ref. 45 — Four corrections I made in session that later became rules (October)

There are rules of the method that did not come from a commit but from corrections I made to the
agent in the middle of a session, and which I formalised afterwards. I cite them because they
show the second factor of the method's origin, my own engineering judgement against the model's
fragile application. "A guarded meter, not grep": a number that feeds a decision is measured with
a program that has a test, not with a text search. "Measure the hypothesis, not only the
symptom": when I bring a cause in the form of an impression, it has to be measured before
building, because I tend to be right about the symptom and the cause tends to be right next to
it. "Validate the limits with the log, not with the prose": a refusal by the model does not prove
the limit is enforced; you have to force the invocation and read the log. And "compare the
published version first": faced with "it is still broken", look at which version is running where
I see the problem before diagnosing again. Steps 9 and 10.

### Ref. 46 — The projects I rejected, and where the exclusionary criteria come from (17 October)

The two exclusionary criteria of step 0 do not come from the projects I accepted but from the
ones I rejected. I rejected legacy technologies without an accessible repository or with
repositories that do not follow a standard, because without a repository there is nowhere to
leave the evidence. And I rejected technologies that cannot be tested end to end, where the
screens cannot be executed and each element of the interface accessed with its different methods
while validating that the change reached the backend. I made clear at the time, and I stand by
it, that NAC3 is not mandatory: what is mandatory is testing from the execution of the screens.

---

## E. Complete chronologies

I put them here in case someone wants to see the whole sequence and not a loose case. Each row
carries the evidence as it is in the repositories.

### E.1 yujin-forge

| Date | Moment | What changed | Evidence |
|---|---|---|---|
| 25 May | The quality standards are born | First working agreement: the human's time, zero debt, documentation up to date, exact scope | `2219f7a` |
| 27 May | First anti-pattern register | Fixed format: smell, root cause, fix, early detection | `73f4029` |
| 2 June | Gates G1 to G9 and G-DOC | The doctrine enters the prompt only when it applies | `5b47475` |
| 4 June | Testing policy reformulated | Tests after implementing by default; skeleton green; protection against loops | `a9f59c7`, `testing-policy.md` |
| 4 June | Decisions frozen before the sprint | D1, D2, D3 written and numbered | decisions document of 4 June |
| 5 June | The multi-agent team is eliminated | 60 dollars and 73 minutes versus 90 minutes | `7584f8b` |
| 6 June | The plan is the pending items | Canonical queue, numbered, refreshed per session | `4fc82c6` |
| 10 June | Mandatory doctrines; verification honesty; workflow kinds | Real red, blind spots, proportional claims | `7ab9d8a`, `2c552c0` |
| 14 to 21 June | Autopilots of 24 and 48 hours | Long autonomy with a written mandate | session notes |
| 5 and 10 July | Diagnostic mode | Read-only on other people's systems | `diagnostic-mode.md` |
| 22 July | Performance hardening | Scale patterns taken from production | `873339c` |
| 14 August | Resident agent in production | System map, operational solution first, tickets | session notes |
| 10 and 11 October | Sizing as a gate | Fixed options, recorded | `c602725`, `0bd1b05` |
| 13 October | Asynchronous persistence interface | Asymmetric decision | `7391cc5` |
| 14 October | Orphan turn of 1 h 43 → 1.18.0 | Silence watchdog, inter-process leash, 28 tests | `b80a659` |

### E.2 Autorizaciones

| Date | Moment | What it contributed | Evidence |
|---|---|---|---|
| 11 June | Initial design document | Overtaken by the repository within weeks | design document |
| 23 June | Audit of queries without an index | Findings turned into pending items | audit document |
| 24 June | Lessons from Google's cloud | Infrastructure mistakes written as lessons | lessons document |
| 26 June | User manual | Born with the system | manual |
| 13 July | Second-layer backup | Local and in the cloud | backup commit |
| 14 July | PND-300, four rounds | A fix at the root or it is not a fix | pending item 300 |
| 16 July | Security audit | Periodic, generates pending items | audit document |
| 26 and 29 July | Internal and recovery manuals | Reproducible by hand, without AI | `6444ce6`, `a30cee3` |
| 27 July | Fail-closed as a reflex | The row stays without its button; the listing does not break | `e18406d` |
| 6 and 7 August | Counters 1,355 versus 1,234 | Root cause on production, test proved red, script in the repo | `ab3e529`, `1f5feb9` |
| 6 August | Producer/consumer symmetry | A single source for causes and columns | `50fe968`, `7251129` |
| 7 August | Panic button, dry-run mode, watchman | Locks | `0954740` |
| 10 August | Domain rules in the commit | With date and owner | `0ae3ae6` |

### E.3 Kikan

| Date | Moment | What it contributed | Evidence |
|---|---|---|---|
| 21 August | Start with the method written | Project file and pending items from day one | first commit |
| 28 and 29 August | AUD-* series | 19 pending-item documents | pending-item documents |
| 28 August | Continuous integration | Tests on GitHub from the first week | `ci.yml` |
| 23 and 24 September | Deployment as a package | Configuration on the server; runtime pinned | `deploy.yml`, `bb801ed` |
| 30 September to 4 October | Deployment hardened | Five pending items in a row | `f85c3c9`, `513c8d0`, `076df76`, `9d76af8`, `0bd20a8` |
| 4 and 8 October | Promotion from UAT to PROD | Explicit circuit | `4eb5ad7`, `7658e2e` |
| 11 October | Schema derived from the code | With a lock, opened on the board | `6113319`, `68819ce` |
| 11 to 13 October | Static ratchet | The meter could not see: 70, then 84 | `06b2734`, `f6e5221`, `2fc6239`, `1d55a93` |
| 13 October | Meters that lied | "it is 44, not 27" | `880ac0f`, `f955620` |
| 14 October | Query budget; ceiling 63 over 60 | Measured plus a margin | `5926b3f`, `10ada00`, `0730082`, `7f5f1af` |
| 14 October | The five rules of 11.b | Guarded meter, audit in both directions | re-engineering document, 11.b |
| 14 October | Retention per table; external integrity | Report from another session absorbed as pending items | `f72b15a`, `b266f11` |
| 14 October | The deployment only packages | From 16-27 minutes down to 11 | `39497b0` |
| 15 October | Two administrator doors | One withdrawn within 24 hours | `69bdab2`, `20fdbe7`, `1558ee4` |
| 15 October | Quality audit | Vulnerability, component of 2,679 lines, file of 9,661 lines | audit document |

---

## F. Every failure, and the step that covers it

This table is, in a way, the proof of the ladder: every blow has to fall into some step. If one
appeared that falls into none, a step would be missing.

| Failure | Reference | Step that covers it | Status |
|---|---|---|---|
| The multi-agent team that spent double and delivered half | Ref. 6 | 15, retrospective with numbers | closed |
| Work discarded for not reading the map | Ref. 9 | 2, mandatory reading | closed |
| PND-300: three fixes that were not at the root | Ref. 22 | 1, zero debt; 9, measure | closed |
| Counters 1,355 versus 1,234 | Ref. 26 | 9, instrument; 8, symmetry | closed |
| 3.4 million rows per year on JSON files | Ref. 15 | 3, sizing | closed |
| Meters that lied; ratchet at zero | Refs. 35 and 36 | 9, verify the instrument | closed |
| Orphan turn of 1 h 43 | Ref. 16 | 10 and 12 | closed |
| Tests three times per commit; quota burned | Ref. 39 | 13 | closed; the quota has to be raised |
| Two administrator doors in 24 hours | Ref. 40 | 11 and 12 | closed |
| Secrets pasted in the chat | Ref. 42 | 13 | rotation pending |
| Authentication error reported as success | Ref. 43 | 10 | pending, one line |
| Project file of 9,661 lines | Ref. 41 | 2 | pending |
| CORS from the first domain; configuration assistant with a 500 error | Ref. 43 | 13 and 8 | application pending |
| The mobile application loses its tabs | Ref. 43 | 10 and 12 | diagnosis done; correction pending |
