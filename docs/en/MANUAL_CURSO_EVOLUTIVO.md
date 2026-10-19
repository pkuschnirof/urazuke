# Urazuke — the course, part 2: the inherited project. Normalizing a system that was not born with the method, and then evolving it

Author: Pablo Kuschniroff, assisted by Claude Code. Version 1, 18 October 2026. This is the second
part of the [course manual](MANUAL_CURSO.md): it takes for granted that you did the first part, or
at least that you read lessons 0 to 7, because here I do not explain again what a pending item, a
red test or a semantic tree is. The method of this part is on the page of the
[evolutive-corrective path](EVOLUTIVO_CORRECTIVO.md); here is the practice, with a second guide
project. The odd words are in the glossary of the main document; the real cases, in the
[references](REFERENCIAS.md). Public repository:
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## Before you start

### Who this part is for

For whoever did the first part and discovered that, in real life, they are almost never handed an
empty folder. They are handed a system that already runs, with users who depend on it, and they
are asked to "fix this" or "add that". And also for whoever "vibecoded" something a few months
ago, it worked, and now has to keep building on it without it falling over. Both are in the same
place: with a legacy system, even if one of the two wrote it.

### What you will have at the end

The same system you inherited, doing the same thing it was doing, but with everything the method
takes for granted around it: a working agreement with the legacy rules, the recovered map of the
system with the tags saying where each statement came from, the list of discrepancies between
what the code does and what the business believes, an audit turned into a backlog with speed
marks, a test environment with anonymised data, a deployment that repeats, the secrets outside the
code and rotated, a characterization suite that watches the critical flows, locks on whatever
already acts on the world, the sizing with measured numbers, and a backlog where the debt and the
client's request live together, paired by module. And after that, the first bug corrected with its
test red and the first new functionality built with the full method.

### The calendar of this part

| Week | Lessons | What else you do |
|---|---|---|
| 1 | N0, N1, N2, N3 | **Reading.** Nothing is changed. You walk the recovered tree with the owner, you decide the discrepancies one by one, you read the audit. At the close: the map and the inventory of the debt. |
| 2 | N4, N5 | **The belt.** Test environment with anonymised data, deployment run twice, secrets rotated, characterization suite with its red by mutation. Locks confirmed on whatever already acts. At the close: the system runs in test and the suite is green. |
| 3 | N6, N7, R1 | **Measure, order, correct.** Sizing measured. The backlog with the two marks. The first block: the known bug, closed in corrective mode with its paired items. |
| 4 | R2 | **Evolve.** The second block: the new functionality, built with the full method (lessons 5 to 10 of the first part), with the characterization as the regression. |
| 5 and 6 | 11, 12, 13, 14, 16, 17, 18, 19 of the first part | **Go-live.** Periodic audit, remaining locks, closing of the path to production, the three manuals (which the legacy system did not have), and the four operational quality steps that precede the deployment: complete observability, persistence with what N6 measured, the vulnerability scan as a gate, the load test with the breaking point. |
| 7 | 15, 20, 21 of the first part | **Operation.** The two monitorings set up in the week of the deployment, with the first reading as the legacy system's baseline; resident agent; retrospective with the question a legacy system brings of its own: how much it cost to normalize. |

### The guide project: "Turnera inherited"

It is the same practice as in the first part, two years later and in another timeline: they never
built Turnera with the method. Instead, the practice manager's nephew built them a web
application one summer, "Turnos", which has worked ever since. Today it has two receptionists and
three practitioners using it every day, some twenty thousand appointments loaded, and nobody who
understands all of it: the nephew went to live abroad and answers a message once a fortnight.

**What there is.** A repository on GitHub with the code (a single branch, commits with messages
like "fixes"), a database on the same server where the application runs, deployment by hand
copying files over FTP, the database password written in the code, no tests, a job scheduled on
the server that sends the reminders every night, and a spreadsheet the practice manager downloads
every month by connecting to the database with a desktop tool. There is an "automatic" backup
that nobody has ever restored.

**What hurts.** Two things. The first, a bug: sometimes a patient gets the reminder twice, and
sometimes none at all; the practice manager does not know when it happens, but she has
screenshots of patients complaining. The second, what is missing: they want to ask for a deposit
through a payment link for certain appointments, and they want to see how many appointments,
no-shows and cancellations there were in the month without downloading the spreadsheet.

**The owner.** The same practice manager: judgement about the business, fifteen minutes a day,
does not read code. And one new thing that matters: she believes the system does things it does
not do, and she does not know about things the system does do. That is normal in a legacy system,
and it is what lesson N2 is going to bring to light.

**The critical flows**, in her words: "I load an appointment", "I cancel an appointment", "the
reminder reaches them", "I look up a patient", "I download the monthly sheet". There are five;
they will be the characterization suite.

That is enough. Everything else is in the system, and it is the agent that is going to read it.

---

## The normalization stretch: lessons N0 to N7

These eight lessons are the stretch the first part did not have. The first four are reading:
nothing is changed, and the temptation to change something is going to be enormous. The next two
build the belt. The last two measure and order. Only then is functionality touched.

### Lesson N0 — Eligibility of an existing system

**What you need to understand.** The two exclusionary criteria are the same as in lesson 0, but
here X2 (screens drivable by a program) is answered screen by screen, and if any of them is red
it is not a reason not to start: it is the first pending item, and it blocks. Four criteria
specific to a legacy system are added: whether there is anyone who knows how it works, whether
production can be queried read-only, whether any test exists, and whether the backup has ever
been restored. The last one is the one almost everybody discovers is red.

**Before sending the prompt**, with your own hands:

- `docs/INITIAL_SURVEY.md`, short: what Turnos does and for whom according to the practice
  manager, what hurts (the double reminder, what is missing), who made it and how long they take
  to reply, where it runs, who has access, and that there is an "automatic" backup nobody has
  restored. Half a page.
- `docs/ELIGIBILITY_CRITERIA.md`: the lesson 0 sheet with four more rows: somebody who knows,
  production queryable, existing tests, backup restored. Empty columns.
- Read access to the repository for the agent and, if you can get it, a read-only credential to
  the database, outside the chat.

1. Paste it:

> We are going to assess whether this existing system can be taken over with the Urazuke method.
> Read the initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`, which for an existing system adds four criteria: whether anyone
> who knows how the system works is available; whether production can be queried read-only;
> whether any automated test exists; and whether a backup exists and has ever been restored. Then
> explore the repository and, if I gave you access, the environment where it runs: change nothing.
> Fill in the sheet criterion by criterion with the answer, its source (survey, code, database,
> configuration, or inferred) and, for the exclusionary criteria X1 and X2, green or red. For X2,
> list every screen and say for each whether it can be driven by a program today and whether the
> effect can be checked in the backend. If a criterion cannot be answered from what you have, ask
> me; do not assume. Do not decide: present me the completed sheet with your reading and your
> doubts, and I will decide. Reply in my language.

   You are asking it for the same as in lesson 0, plus three things: that it explore without
   changing anything, that every answer say where it came from, and that X2 be measured screen by
   screen.

2. Answer its questions and read the sheet. Look above all at the row for each screen in X2.
3. Decide.

**Before sending the prompt** for the close: your decision in one line, and a condition that in
this project is mandatory: restore the backup on your machine before lesson N4.

4. Paste it the closing prompt:

> Decision: [go under this condition: the backup is restored at least once before N4]. Write the
> final sheet to `docs/ELIGIBILITY.md` with the date, who decided, every answer with its source,
> and the conditions if any. If X2 is red for any screen, create `docs/PENDING.md` and open the
> first pending item: make every screen drivable by a program with its backend effect checkable;
> mark it as blocking. Include the questions you asked and my answers.

**Completeness check.** Does X2 have one answer per screen? Do the four legacy criteria have an
answer with a source? Was the backup left as a condition with a date?

**Deliverable.** `docs/ELIGIBILITY.md`, and if need be the first blocking pending item.

**Typical mistakes.** Answering X2 green "because it is a web application". And skipping the
backup condition because "there is an automatic one": in lesson N4 the agent is going to copy the
production database, and if something goes wrong, that backup nobody tested is all there is.

**In the guide project.** The agent finds that of the six screens of Turnos, four can be driven by
a program and two cannot (the appointment form uses a calendar with no identifiers, and the
patient search is a field that does not respond to keyboard events); it opens the blocking pending
item. It finds the scheduled job for the reminders, which the practice manager did not mention.
There is a backup, never restored: a condition. On the nephew: "available, once a fortnight",
which the agent proposes reading as "not available", and it is right. Go, with one condition.

### Lesson N1 — The working agreement for a legacy system

**What you need to understand.** To the six rules of lesson 1, five are added that exist because a
model faced with somebody else's code does three things by reflex: it reorders it, it "fixes" it
wherever it looks wrong, and it assumes that whatever the code does differently from what it would
expect is a mistake. The legacy rules block those reflexes: nothing that was not asked for gets
refactored, code is read before it is touched, anything strange is logged instead of fixed,
current behaviour is the specification until the owner says otherwise, and nothing enters without
the characterization green.

**Before sending the prompt**, with your own hands:

- Your working preferences, as in lesson 1, and one more decision: how much risk you accept while
  the system is being normalized. For the course: the agent may deploy to the test environment on
  its own; to production, never, until lesson 13.
- `docs/ELIGIBILITY.md` closed.

1. Paste it:

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

2. Read the proposals. If one of them says "modernize the code as it is touched", reject it with a
   reason: it is the rewrite in disguise.

**Before sending the prompt** for the close: your verdict on each proposal, with a one-line
reason, for the gaps in the prompt.

3. Close with the closing prompt of lesson 1, unchanged.

**Completeness check.** Are the eleven rules there, each with the failure it prevents? Is there any
proposal that authorises refactoring or rewriting?

**Deliverable.** `docs/WORKING_AGREEMENT.md` with date and version.

**Typical mistakes.** Accepting a "progressive cleanup" rule because it sounds reasonable. It
sounds reasonable and it is the way the agent authorises itself to change what it was not asked
for.

**In the guide project.** The agent proposes two rules of its own that are worth accepting: "in
this system no real send leaves the test environment: in test, reminders go to a fake inbox", and
"the monthly sheet the practice manager downloads is a consumer of the system and counts as a
contract". The second is the producer/consumer map peeking in early, and that is fine.

### Lesson N2 — Reading the system: the recovered map and the discrepancies

**What you need to understand.** It is the lesson that gives the most value per hour of the whole
course. In lesson 2 the project file and the tree came out of the survey; here they come out of
the system itself, and every statement carries a tag saying where it came from: `[code]`,
`[database]`, `[configuration]`, `[documentation]`, `[business]` or `[inferred]`. The tags are
what let you verify without reading code: you look at what is inferred and you confirm it or you
correct it. And a new document appears, the list of discrepancies: everything that does not match
between what the code does, what the database enforces and what the business believes. They do not
resolve themselves: each one is a decision of yours with a date. A legacy system always has
discrepancies; if the list comes out empty, the agent did not compare.

**Before sending the prompt**, with your own hands and with the owner:

- Read access for the agent to everything: the whole repository, the database schema (read-only,
  credential outside the chat), the server configuration with the values of the secrets masked,
  the recent logs, and whatever documentation there is (in Turnos, an email from the nephew with
  "how to upload changes").
- In `docs/INITIAL_SURVEY.md`, a new section written with the practice manager: **what she
  believes the system does**, use case by use case, and the rules she remembers ("an appointment
  cannot be cancelled with less than two hours' notice", "the reminder goes out at eight in the
  evening"). Do not verify it against the system: that comparison is the agent's job.
- The list of what lives outside the repository: the scheduled job for the reminders and the
  monthly sheet that connects to the database.
- `docs/WORKING_AGREEMENT.md` closed.

1. Paste it:

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
> for the living state. Reply in my language.

   You are asking it to read everything and declare what it could not read, the survey and the
   tree with tags, the processes as the code implements them (not as they ought to be), the
   scheduled jobs, and the discrepancies listed without being resolved.

2. Walk the tree with the practice manager, node by node. Every `[inferred]` gets confirmed or
   corrected. Every `[code]` gets compared with what she believes: where it does not match, there
   is a discrepancy that the agent may already have listed, and if it did not list it, you add it.
3. Decide each discrepancy with her, in one line, with the date. There are three possible answers:
   "the system is right, the business had forgotten" (it is confirmed as a rule), "the system is
   wrong, it has to be changed" (a pending item is opened), or "I do not know, we will see later"
   (it stays open with a date; not too many of those).

**Before sending the prompt** for the close: the list of confirmed and corrected nodes, and the
list of discrepancies with your decision and the date, one line each.

4. Close with:

> I confirm these nodes: [list]. Correct these: [list]. The discrepancies are decided as follows:
> [one line each: discrepancy, my decision, today's date]. Finalize `docs/INITIAL_SURVEY.md`,
> `PROJECT.md` and `docs/SEMANTIC_TREE.md` with today's date, keeping the source tags. Write each
> discrepancy decision in `docs/DECISIONS.md` with my exact words, and open a pending item in
> `docs/PENDING.md` for every discrepancy where I decided the system must change; for the ones
> where I decided the current behaviour stays, write it next to the node as a confirmed rule. Add
> to `PROJECT.md` the instruction to read this file, the tree and the working agreement at the
> start of every session.

5. **The reading test**, as in lesson 2: a new session, with no context, "what does this system NOT
   do? what job runs on its own at night?". It has to answer from the map.

**Completeness check.** Are there nodes tagged `[inferred]`? (If there are none, the agent is not
distinguishing what it read from what it assumed.) Is there at least one scheduled job in the
tree? Does the list of discrepancies have more than zero? Does each one have a decision with a
date, or was it left open on purpose? Did the tags survive the close? Did it pass the reading
test?

**Deliverable.** `docs/INITIAL_SURVEY.md` complete with tags, `PROJECT.md`,
`docs/SEMANTIC_TREE.md`, `docs/DISCREPANCIES.md` decided, `docs/DECISIONS.md` with the decisions,
`docs/STATUS.md`.

**Typical mistakes.** Resolving the discrepancies "by fixing the code so that it does what the
practice manager says", without deciding them one by one: several of those discrepancies are rules
the business forgot and the code remembered. And letting the agent erase the tags at the close "so
that it looks cleaner": a tree without tags can no longer be verified.

**In the guide project.** The tree of Turnos has the Schedule domain the practice manager
expected, and two things she did not: an appointment state "rescheduled" that exists in the
database and that no screen shows `[database]`, and a scheduled job that, besides sending
reminders, deletes cancelled appointments more than a year old `[code]`; the practice manager did
not know they were being deleted. The typical discrepancies are eight: the two-hour rule for
cancelling does not exist in the code (it always cancels); the reminder goes out at eight
according to her and at seven according to the configuration; the patient's telephone number is
not mandatory in the database even though she believes it is; and so on. The deletion one is what
surprises her most, and she decides it in a minute: "that is never deleted again". A pending item.

### Lesson N3 — The audit as an inventory of the debt

**What you need to understand.** Lesson 11, but at the beginning instead of at the end, and with
one more field per finding: whether it blocks (it has to be fixed before any change), whether it is
paid when the module is touched, or whether it can wait. Without that field, an audited legacy
system has forty findings and nobody knows which one to start with. What blocks is decided by you,
not by the auditor: in general, an exposed secret, a screen that cannot be driven, a deployment
that cannot be repeated, the absence of a backup, and anything that can damage data or overcharge.

**Before sending the prompt**, with your own hands:

- A new session of the agent, with a clean clone and an instructions file that says "you are an
  auditor; you have not read and are not going to touch this system". Read-only access to the
  database and to the server.
- `PROJECT.md`, `docs/SEMANTIC_TREE.md` and `docs/DISCREPANCIES.md` from N2, so that it does not
  rediscover what is already written.
- Your criterion for what blocks, in two lines, for the gap in the prompt. For Turnos: an exposed
  secret, a screen that cannot be driven, a deployment that cannot be repeated, no tested backup,
  anything that deletes or sends without control.

1. Paste it:

> Audit this system for integrity, security, performance, code quality and deployability, as the
> inventory of what must be normalized before and during its evolution. Read-only: change nothing
> except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires access you
> lack (the database, the logs, the server), tell me and mark that part as not audited; do not
> pass it as fine. Go through all of the code, not a sample, and read `docs/SEMANTIC_TREE.md` and
> `docs/DISCREPANCIES.md` first so that you do not report what is already known. For every
> finding: where it is (file and line), the risk, the evidence that proves it (the command, the
> query, the number), its priority (P0 must be fixed now, P1 soon, P2 when possible), and one more
> field: whether it BLOCKS (must be fixed before any change, by my criteria: [an exposed secret, a
> screen that cannot be driven by a program, a deployment that cannot be repeated, no tested
> backup, anything that deletes or sends without control]), whether it is PAID WHEN TOUCHED (fixed
> together with the first change that enters its module), or whether it CAN WAIT. Grade every
> dimension you audited. End with every finding turned into a proposed pending item, blocking
> ones first. Reply in my language.

2. Read the report. Pick two findings and ask it for the evidence. Review the speed marks: you can
   raise or lower any of them, with a reason.

**Before sending the prompt** for the close: the report read, the two findings verified, and the
builder's session open (the close goes to the builder, not to the auditor).

3. Go back to the builder's session and paste it the closing prompt of lesson 11, adding at the
   end: "Each pending item keeps the speed mark of its finding."

**Completeness check.** Does it say what it could not audit? Is there at least one "blocks"? Does
every finding have a file, a line and evidence? Are the blocking ones already pending items?

**Deliverable.** `docs/AUDIT_[date].md` with speed marks, and the blocking pending items open.

**Typical mistakes.** Everything in "can wait", from an auditor who does not want to bother anyone.
Or everything in "blocks", from a frightened owner: then nothing can ever be started. Between three
and eight blocking items is normal in a small system.

**In the guide project.** The audit of Turnos finds, as blocking: the database password in the code
(and in the git history, so it has to be rotated, not just moved); the FTP deployment with no
record of which version is running; the scheduled job that deletes appointments with no lock; the
two screens that cannot be driven. As "paid when touched": the patient search with no index
(patients module), the day's schedule query that makes one query per appointment (schedule
module), the sending of reminders with no idempotency (messages module; it is the clue to the
bug). As "can wait": an old dependency with no known vulnerability, and the duplicated date-format
code in three places.

### Lesson N4 — The safety belt

**What you need to understand.** It is the hard gate of this path: until the belt is green, not one
line of functionality is changed. The belt has five pieces: a test environment with anonymised
data, a deployment that repeats, the secrets outside the code and rotated, continuous integration
running whatever there is, and the characterization suite. This last one is lesson 7 the other way
round: the test is born green, because it captures what the system does today, defects included,
and the proof that it is useful is that it goes red when you break the flow on purpose. Without
that red by mutation, it is a test that passes because it watches nothing.

**Before sending the prompt**, with your own hands and with the owner:

- `docs/ENVIRONMENTS_SURVEY.md`, which the agent drafted in N2 with tags and you complete: where
  the test environment is going to run (for the course, a free service or a container on your
  machine is enough), how it is deployed today, where the secrets are going to live on the server.
- The anonymisation decision with the practice manager: patients' names, telephone numbers, emails
  and identity documents are replaced with false values; the dates and the quantities are kept. It
  is a legal obligation, not a technical detail.
- The list of critical flows for the characterization: the practice manager's five.
- The backup restored on your machine (the N0 condition). If you did not do it, do it now: the
  agent is going to copy the production database and you need to know there is a way back.
- Access for the agent to the server read-only and to the place for the test environment with
  write permissions, credentials outside the chat.

1. Paste it:

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
> Reply in my language.

2. It is a long task, with back and forth. When it shows you the screenshot, open the URL
   yourself: Turnos has to be visible, with data. Look for a real patient by name: they must not
   be there.
3. Rotate every secret on the list it gave you. You, in whichever panel applies, today.

**Before sending the prompt** for the suite: the test environment opened by you, the secrets
rotated, and the list of the five critical flows for the gap in the prompt.

4. Paste it:

> We are going to write the characterization tests of these critical flows: [load an
> appointment; cancel an appointment; the reminder reaches the patient; search a patient; download
> the monthly sheet]. A characterization test captures what the system does today, exactly as it
> does it, defects included; it is not a test of what the system should do. For each flow: drive
> it from the screen as a user would and check the effect in the backend (the row, the state, the
> message queued). Every test must pass against the current code. Then prove that each test
> actually watches its flow: break the flow deliberately with a temporary change, show me the red
> output, revert the change, show me the green. If a flow cannot be driven from the screen, do not
> simulate it: say so and open a pending item marked as blocking. If while writing these tests you
> find behaviour that looks wrong, do not fix it: add it to `docs/DISCREPANCIES.md` with the
> evidence. Record the command to run the suite in `docs/STATUS.md`, and make the suite the gate
> for the test environment as `docs/GATES.md` says. Reply in my language.

   You are asking it for the test that is born green and proves it is useful by going red by
   mutation; nothing simulated where it cannot be driven; and whatever looks wrong logged as a
   discrepancy, not fixed.

5. The two screens that cannot be driven (the blocking pending item from N0) are resolved here,
   before the suite or as part of it: ask it to close that pending item with the routine of lesson
   7, and then to write the characterization tests of those flows.
6. Run the suite yourself with the command in `docs/STATUS.md`. It has to be green.

**Completeness check.** Did you open the test environment and fail to find a real name? Did the
deployment run twice and the second run change nothing? Did the search for secrets in the
repository come back empty, and did you rotate the ones it found? Does each of the five flows have
its test and its red by mutation in view? Did you run the suite yourself?

**Deliverable.** The test environment running with anonymised data, `docs/DEPLOYMENT.md`,
`docs/GATES.md`, the secrets rotated, continuous integration green, and the characterization suite
green with its five reds demonstrated.

**Typical mistakes.** Leaving the suite "for next week" and starting to fix the bug: a half-done
belt is the number one cause of breaking what was working. "Example" test data instead of the
anonymised copy: the bugs of a legacy system live in the real data (the double reminder in Turnos
only shows up with certain patients). And moving the secret without rotating it: it was in the git
history; it is not a secret any more.

**In the guide project.** The characterization test of the reminder is the most interesting one: it
captures that the nightly job sends one message per appointment for the next day to the fake
inbox, and it passes. While writing it, the agent notices that if the job runs twice it sends
twice, and it logs that as a discrepancy with the evidence. It is the clue to the bug, and it is
not fixed yet: current behaviour is the specification until lesson R1. The red by mutation: the
agent comments out the line that queues the message, the test fails, it uncomments it, the test
passes.

### Lesson N5 — Locks and producer/consumer map from the code

**What you need to understand.** Lessons 12 and 8, done by inventory over what already exists,
before changing anything. The agent is going to find more in the code than the business remembers
the system does outwards: sends, deletions, nightly jobs. The comparison between the two lists is
the result. And every lock carries a proposal of "now" or "when touched": a lock over something
that sends messages goes now; one over a monthly export can wait for the block that touches that
module.

**Before sending the prompt**, with your own hands and with the owner:

- In `docs/INITIAL_SURVEY.md`, the list of what the practice manager **knows** the system does
  outwards: it sends reminders, and nothing else, according to her.
- Access for the agent to the scheduled tasks of the server.
- The list of what lives outside the repository (the monthly sheet), for the map.
- The N4 test environment running.

1. Paste it:

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
> module is touched. Do not implement anything yet: I confirm lock by lock. Reply in my language.

2. Confirm lock by lock with the practice manager, and the "now" or "when touched" mark of each
   one.

**Before sending the prompt** for the close: the table with your verdict per row, and the list of
the "now" locks for the gap in the prompt.

3. Close with the closing prompt of lesson 12, listing only the "now" locks; the rest stay in the
   backlog with their mark.

**Completeness check.** Does the agent's list have more actions than the practice manager's? (If it
has the same ones, it did not look at the scheduled tasks.) Does every "now" lock have its test red
against the version without the lock? Is the monthly sheet in the map as a consumer?

**Deliverable.** `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`, `docs/PRODUCER_CONSUMER_MAP.md`,
`docs/LOCKS.md` with the "now" locks implemented and proved.

**Typical mistakes.** Implementing every lock now "while we are at it": that is the two-speeds rule
violated, and it is a week not spent on the bug the client asked about.

**In the guide project.** The agent finds three actions the practice manager did not list: the
nightly deletion of old cancelled appointments, an email the system sends the practitioner when an
appointment is cancelled (she did not know), and the export that feeds the monthly sheet. "Now"
locks: the nightly deletion goes into dry-run mode (it logs what it would have deleted) until she
decides, and the sending of reminders gets a daily limit. "When touched": idempotency of the
sending (messages module, it enters with the bug), confirmation on cancellation (schedule module).
The map has six contracts, and the monthly sheet is a consumer of the appointments table: if
somebody changes a column on it, the sheet breaks silently.

### Lesson N6 — Sizing with real numbers

**What you need to understand.** Lesson 3 with one advantage: the primary data are in the database
and in the logs. They are not asked for, they are measured, with a meter with a test (lesson 9).
The practice manager supplies only what is nowhere to be found: how much they expect to grow, and
whether the system is going to be sold to other practices.

**Before sending the prompt**, with your own hands:

- Read-only access to the production database, or the complete copy from N4 (the anonymisation
  touched neither dates nor quantities), and to the access logs.
- The two answers from the business: the expected growth ("the same as now, maybe one more
  practitioner") and the "times ten" ("if it works, my sister has another practice").
- A known case for the meter's test: the number of practitioners, which is three.

1. Paste it:

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
> cheap today and expensive later. Do not change any code. Reply in my language.

2. Run a meter yourself (the one for rows per table, for example). It has to give you the same
   figure. Redo one calculation by hand.

**Before sending the prompt** for the close: the recalculated figure that matches, and your
decision about whatever does not withstand the "times ten", if there is anything.

3. Close with the closing prompt of lesson 3, choosing among the options it proposed or confirming
   that what is there does withstand.

**Completeness check.** Is there any primary figure without a meter? Did you run one yourself? Is
the "times ten" written down?

**Deliverable.** `docs/VOLUME_SURVEY.md` with tags, the meters with their test, `docs/SIZING.md`.

**Typical mistakes.** Accepting "the database is too big to count, I estimate about a hundred
thousand". A big database is counted with a query; that is a meter.

**In the guide project.** Twenty thousand appointments in two years, a thousand a month and growing
slowly; sixty thousand messages; two users at the peak; the database takes up little space; the
slowest query is the patient search by name (no index, the audit said so already). The "times ten"
holds everywhere except on that search and on the nightly send, which takes time proportional to
the appointments. Asymmetric decision: the message-sending interface gets a queue, even though it
is not needed today, because the deposit (lesson R2) is going to use the same channel.

### Lesson N7 — The normalization backlog, paired with the client's request

**What you need to understand.** Lesson 5 with two more columns. A single queue where the debt
(audit, discrepancies, screens, pending locks, decisions from the sizing) and the client's request
(what fails, what is missing) live together, each pending item with its speed mark and its type,
and every client item with the list of the normalization ones that touch the same module and are
worth paying together with it. That is the "paid when touched" rule made operational.

**Before sending the prompt**, with your own hands and with the owner:

- The client's request for this stage, in `docs/blocks/STAGE_01_REQUEST.md`, in two lists in the
  practice manager's words. What fails: "sometimes the reminder arrives twice, and sometimes it
  does not arrive; I have screenshots of three patients from last week". What is missing: "I want
  to ask for a deposit through a payment link on first-time appointments", "I want to see the
  month's numbers without downloading the spreadsheet".
- Every artefact from N2 to N6 closed. If any is missing, do not open this prompt.
- The blocking pending items from N0, N3 and N4 closed.

1. Paste it:

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
> normalization. Reply in my language.

2. Read the specification of each client pending item as if you were the practice manager, just as
   in lesson 5. And review the pairings: does it make sense to pay that debt with that request?
3. Add the per-session routine of lesson 5 to the agreement, unchanged.

**Completeness check.** Is any "blocks" item left open? Does every corrective item say how it is
reproduced in the client's words? Does every client item have its paired items?

**Deliverable.** `docs/PENDING.md` with everything, and the routine in the agreement.

**Typical mistakes.** A backlog with fifty pending items in "can wait": it is the rewrite disguised
as a list. Archive what is never going to be paid, and say so. And opening the first block with a
blocking item open "because it is a small one".

**In the guide project.** The backlog of Turnos ends up with three client pending items: the double
reminder (corrective, messages module, paired with the idempotency of the sending and the message
queue from the sizing), the deposit (evolutive, a new payments module, paired with the
confirmation on cancellation because it touches the same screen), and the monthly report
(evolutive, reports module, paired with the patient index and with the contract of the monthly
sheet, which gets replaced). And some twelve normalization items, of which three "can wait" and it
is said so.

---

## The loop on the legacy system: lessons R1 and R2

### Lesson R1 — The first block: the bug, in corrective mode

**What you need to understand.** A corrective pending item is a known bug. In lesson 7 the red was
manufactured; here the red is the bug itself: the test that reproduces the failure, driving the
flow as the user who reported it did, has to fail against the current code. If it does not fail,
you reproduced a different bug. That red is the proof that you are fixing the right thing, and it
is worth more than any explanation from the agent about what "must be happening"
[Ref. 22](REFERENCIAS.md#ref-22). And the root cause is told in prose before anything is touched,
because sometimes the root cause is a business rule nobody wrote down, and that is decided by you.

**Before sending the prompt**, with your own hands:

- The corrective pending item in `docs/PENDING.md` with the reproduction in the practice manager's
  words, and a concrete case: the three screenshots from last week, with the patients' names
  (false ones, in test) and the date. Without a case, there is no test.
- The characterization suite green, with the command in `docs/STATUS.md`.
- The paired items of this pending item, listed in it.
- The practice manager warned that today you are going to ask her a business question.

1. Open the block with the per-session routine: the agent announces which pending item it is taking
   and re-reads the specification.
2. Paste it:

> This pending item is a correction: [some patients receive the reminder twice and some receive
> none; three cases from last week are attached in the item]. Before changing anything: (1)
> Reproduce the failure with a test that drives the flow from the screen and checks the effect in
> the backend, and show me that it fails against the current code; that red is the proof that you
> reproduced the right defect. If you cannot reproduce it, tell me what you tried and what you
> need; do not fix what you cannot see. (2) Find the root cause and tell me in prose, with the
> evidence, before fixing. If the root cause is a business rule nobody wrote down, stop and ask me.
> (3) Fix at the root, not where it hurts, and nothing else: anything else you find goes to a
> pending item. (4) Show me the test green, the characterization suite still green, and the
> regression of the neighbouring items. (5) If the fix changes a current behaviour that someone
> may depend on, say so explicitly: that is a decision for me, not a side effect. Close the paired
> normalization items of this module in the same block, each with its own evidence. The commit
> message says "proved red against [version]" and the test counts. Reply in my language.

   You are asking it for the reproduction before the diagnosis, the root cause in prose before
   touching anything, the root and nothing else, the characterization as the regression of the
   whole system, and for a change of behaviour to be a decision of yours.

3. Read the root cause before authorising the fix. If it asks you about a business rule, decide it
   with the practice manager and answer with the closing format of lesson 6.
4. At the close: run the characterization suite yourself. And use the system in the test
   environment for half an hour, as the receptionist would: the human look is not delegated.

**Completeness check.** Did you see the red of the test that reproduces the bug, with numbers? Was
the root cause written in prose before the fix? Is the characterization still green? Were the
paired items closed with their own evidence? Does the commit say "proved red"?

**Deliverable.** The bug closed with the full routine, the paired items closed, and the
characterization suite extended with the test for the bug.

**Typical mistakes.** Authorising the fix without reading the root cause: in Turnos, the agent's
first hypothesis is usually "the job runs twice" and that is half the truth. And letting a "while I
am at it" tidy up the messages module: rule 7.

**In the guide project.** The test reproduces the double send with an appointment that was
rescheduled: the nightly job sends one reminder per appointment row for the next day, and a
rescheduled appointment has two rows (the old one, in state "rescheduled", which no screen shows,
and the new one). The ones that get none are the ones rescheduled to after the send. Root cause:
the "rescheduled" state that turned up in lesson N2. The business question: "is a rescheduled
appointment a new appointment or the same appointment?". The practice manager decides: the same
appointment, with a history. The fix at the root touches the state, not the sending; the paired
idempotency is paid in the same block; the red says "2 messages for 1 appointment" and the green
"1 message for 1 appointment". And the change of behaviour is declared: rescheduled appointments
stop appearing twice in the monthly sheet, which is a consumer of the table; the practice manager
approves it.

### Lesson R2 — The second block: the deposit, in evolutive mode

**What you need to understand.** The new over the old is built with the full method, exactly as in
lessons 5 to 10 of the first part: specification in the pending item, decisions with a date, test
red, end-to-end test, honest report. Two differences. The regression of the neighbours is the whole
system, and the characterization suite is what says so. And when the block enters a module, the
normalization pending items of that module marked "paid when touched" enter with it, with their own
evidence. What the legacy system did to the old module is not done to the new one.

**Before sending the prompt**, with your own hands:

- The evolutive pending item for the deposit in `docs/PENDING.md`, with its full specification read
  by you, its paired items, and the business decisions the practice manager can already take: which
  appointments carry a deposit, how much, what happens if it is not paid.
- The consequential actions survey (N5) with the row "charge a deposit" added, because it is a new
  action that acts on the world: a lock before building, as in lesson 12.
- The characterization suite green.

1. Open the block with the opening prompt of lesson 5, on the request for the deposit, and read the
   specification as the practice manager would.
2. Before building, the lock: paste it the closing prompt of lesson 12 for the action "charge a
   deposit", with dry-run mode first.
3. Build with the routine of lesson 7, pending item by pending item, with the paired ones in the
   same block.
4. At the close of the block: the complete end-to-end suite (the characterization one plus the new
   tests), with the block-closing prompt of lesson 7, and half an hour of you using the system.

**Completeness check.** Does the deposit have a lock with its test red before the charging exists?
Is the characterization still green after the block? Were the module's paired items paid? Is there
anything of the old module that got "improved" without a pending item?

**Deliverable.** The deposit working in the test environment, in dry-run mode, with its
specification, its lock, its tests and its end-to-end test; the paired items closed.

**Typical mistakes.** Building the deposit "quickly, the way the rest is built" so that it fits in:
the new module is born with the full method, always. And forgetting the lock because "it is a
payment link, we are not the ones charging": the link is sent to a patient; that is an action
outwards.

**In the guide project.** The deposit uses the same channel as the reminders, which now has a queue
(the asymmetric decision from N6 paying for itself). Lock: explicit confirmation from the
receptionist and an amount set by the practitioner; dry-run mode for a week, logging "would have
asked for a deposit from". The paired item on the cancellation screen (the confirmation) is paid in
this block because the deposit changes what happens on cancelling. At the close, the suite runs
seven flows: the five characterization ones, the one for the R1 bug and the one for the deposit.

---

## Afterwards: go-live and operation

From here on, the legacy system is a system with method, and lessons 11 to 21 of the first part
apply exactly as they are, with four notes. The first is about the six operational quality steps:
the minimum observability and the vulnerability scan already came in with the belt, the
persistence measurements are already in N6, and the load test is run with those volumes before
the first deployment; the two monitorings start with the first reading as the baseline, and
whatever was already wrong on the first day turns into a pending item with its mark. The other
three notes are these. The audit of lesson 11 compares against the N3 one:
how much debt was paid, how much remains. The manuals of lesson 14 in a legacy system usually do
not exist, and they are generated from the system as it is and from the closed pending items,
which now do document what was done. And the retrospective of lesson 15 has a question of its own
on this path: how much it cost to normalize (in hours, in tokens, in weeks before the first
change), and how much of the debt marked "can wait" ended up costing anyway. That answer is what
is going to correct the calendar of this part in the next version.

## The exit list of the normalization stretch

The eight conditions the owner verifies without reading code, before opening the first block. They
are the same as on the page of the evolutive-corrective path; I repeat them here because they are
the deliverable of this part.

1. Every input of the previous stages exists (survey, eligibility, agreement, project file, tree,
   environments, volume, sizing, gates), with source tags, and the owner confirmed every inferred
   node (N2).
2. Every discrepancy has a decision with a date, and the ones that change the system have a pending
   item (N2).
3. The audit exists and every finding has a speed mark (N3).
4. The belt is green: test environment with anonymised data, deployment run twice, secrets outside
   and rotated, continuous integration, characterization suite with the red by mutation
   demonstrated (N4).
5. Every consequential action has a verdict, and the "now" locks have their test red (N5).
6. The primary figures are measured with a meter and a test, and the "times ten" is written down
   (N6).
7. No "blocks" item is left open, and every client pending item has its paired items (N7).
8. The agreement has the five legacy rules, and a new session passes the reading test (N1, N2).

## Annex — What this part does not have yet

- A cohort that has taken it on a real legacy system. Turnera inherited is built from what I saw
  in other people's systems in diagnostic mode, not from a student.
- An example repository of "Turnos" exactly as the nephew left it, so that the student who does
  not have a legacy system of their own has one to normalize. It is the most important pending
  item of this part.
- The size criterion for the characterization suite on large systems, and how normalization is
  split by module when the system has dozens of them.
