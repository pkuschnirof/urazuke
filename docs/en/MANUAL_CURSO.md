# Urazuke — the course. A manual with hands-on tasks, step by step, up to the application in production

Version 1, 17 October 2026. It is a working document of the Urazuke project: it will be corrected
with the first cohort that uses it. It is written in everyday language, and every acronym or odd
expression is in the glossary of the main document (`ESCALERA_METODOLOGICA.md`). This is the
English version; Spanish is the source of truth. The prompts for the model are identical in every
language.

## Before you start

### Who this course is for

For someone who wants to build software with artificial intelligence **and wants that software to
be used for real**, by real people, for months. It is not a programming course: you will not learn a
language or a framework. It is not a "prompting" course either: you will not learn tricks to make
the model write better. It is a course on **method**: on what to do in what order, what to ask the
model for at each moment, what it has to deliver to you, and how to know — without reading code —
that what it delivered is complete.

It is for you if you are any of these people:

- You have a business, a clinic, a small consultancy, and you want your own system without hiring a
  development team.
- You are an automation consultant or freelancer and your clients ask you for "something more" than
  a robot.
- You know how to program, but you want the model to do the heavy lifting and keep the decisions
  for yourself.
- You already "vibecoded" something, it worked for two weeks, and in month three it fell over.

It is not for you if what you want is a prototype for Friday's demo. There are faster tools for
that, and this method will feel slow. The method is for what has to keep working after the demo.

### What you will have at the end

An application of your own, running in production, with: tests that were seen to fail before they
passed; reproducible deployment with a way back; configuration and secrets outside the repository;
the business decisions written with a date; locks on everything that charges, sends or deletes;
three manuals a person can follow without AI; an audit done by an agent different from the one that
built; and a retrospective with numbers. That is what we call "production grade" here: not that it
works, but that **it can be sustained**.

And you will have something else, which is what you really take away: the reflex of not believing
the model without evidence, and of knowing exactly which evidence to ask it for at each step.

### What you need

1. **An AI tool for programming.** Any that can read and write files in your repository and run
   commands: Claude Code, Cursor, Codex CLI, Gemini CLI, Forge. The method does not depend on which;
   the main document has a table of where each artefact goes in each tool. In this manual we say
   "the agent" to refer to whichever you use.
2. **A GitHub account** (or equivalent) and minimal notions of what a repository, a commit and a
   push are. If you do not have them, spend an afternoon on it before starting; any introductory
   tutorial will do. Nothing more is needed.
3. **A project.** Ideally your own: a system you need or that a client asked you for, with users who
   will use it. If you do not have one, use the **guide project** described below; it is designed to
   go through the sixteen steps without skipping any.
4. **Time.** The course has sixteen lessons, one per step. The start lessons (0 to 4) take one to
   three hours each; the loop lessons (5 to 10) are learned in an afternoon and practised throughout
   the project; the operation lessons (11 to 15) take two to four hours each. A small project, end
   to end, is between four and eight weeks of part-time work.
5. **A domain owner with time to decide.** If the project is yours, that is you. If it is a
   client's, it is the client, and they must know they will have to answer questions throughout the
   project. This point is not negotiable: without an owner who decides, the model decides, and that
   is where the method breaks.

### How the course works

Every lesson has the same structure:

- **What you need to understand**: the concept, explained the way you explain it to a person.
- **The task**: step by step, with the exact prompt you are going to give the agent (in English,
  because models follow instructions more precisely in English; under each one it is explained what
  you are asking for) and what to do with what it returns.
- **The completeness check**: the list of questions you ask yourself about what the agent
  delivered, without opening the code. If any comes out "no", the lesson is not finished.
- **The deliverable**: the file or the evidence that must exist at the end.
- **Typical mistakes**: what happens to almost everyone the first time.
- **In the guide project**: how this lesson looks applied to the example project.

One rule for the whole course: **do not move on to the next step with a check at "no"**. The
temptation of "I'll fix it later" is exactly what the method exists to prevent. If a step is not
climbed completely, the next one is built on sand.

### The guide project: "Turnera"

If you do not have your own project, use this one. It is small, but it has everything needed so
that none of the sixteen steps is make-believe: real users, personal data, messages that go out
into the world, and money.

**The business.** A clinic (it could be a studio, a hair salon, a workshop: any place that gives
appointments). Today appointments are written in a notebook and confirmed by WhatsApp by hand.
Appointments are lost because people forget, there are double bookings because two people wrote in
different notebooks, and nobody knows how many appointments were cancelled last month.

**What they want.** A web agenda where the two receptionists and the three practitioners see the
appointments; automatic reminders 24 hours before, by WhatsApp or email; the possibility of asking
for a deposit through a payment link for certain appointments; and a couple of numbers at the end of
the month (how many appointments, how many no-shows, how many deposits).

**The owner.** The clinic's manager. She has judgement about the business (she knows which
appointments carry a deposit, how far in advance one can cancel, what to say to a patient who has
missed three times) and she has fifteen minutes a day to answer questions. She does not program, and
she is not going to read code.

**The numbers only she knows.** About forty appointments a day, two hundred and fifty days a year.
About three messages per appointment (confirmation, reminder, sometimes rescheduling). Patient data
is kept for five years. The peak is Monday morning, with both receptionists entering appointments at
once. And one question she cannot answer and which matters: if this works, will they sell it to
other clinics? (The answer changes the sizing by ten.)

**What has consequences.** Sending a reminder (if sent twice, it annoys; if sent to the wrong
number, it is a privacy problem). Charging a deposit (money). Cancelling an appointment
(irreversible for the patient who loses it). Deleting a patient (personal data).

This is enough to start. Everything else the agent will ask, and it is part of the exercise that it
asks.

---

## Start phase: lessons 0 to 4

These five lessons are done once per project, before writing functionality. They are the ones most
tempting to skip ("I want to see something working"), and the most expensive to skip. A practical
tip: do them in one week, straight through, and only then open the loop.

### Lesson 0 — Can this project be run this way?

**What you need to understand.** The method does not work for every project, and knowing it
before starting is the first quality decision. There are two conditions without which it does not
work: that there is a standard repository where the evidence can be left (X1), and that the screens
can be driven programmatically to test end to end, from the screen to the backend (X2). If either
fails, the agent will not be able to verify itself, and then you will end up reading code yourself,
which is just what the method promises to avoid. Then there are weighted criteria (whether there is
an owner with time, whether an error has consequences, whether it can be tested in a separate
environment, etc.), which we are still calibrating with the first projects.

For the guide project the two conditions are met: it is a new project (no legacy) and we are going
to build it with a web interface that can be driven programmatically. For a project of your own,
this lesson may end in "no-go", and that is a valid result of the course.

**The task.**

1. Write, by hand, in a file `docs/INITIAL_SURVEY.md`, what you know about the project: what the
   client wants, for whom, what happens today without the system, what technology exists or is
   proposed, whether there is a previous system and whether it has a repository, who the owner is
   and how much time they have, what the consequence of an error is, which environments there will
   be. Half a page. It does not matter that it is incomplete; in fact, it is part of the exercise
   that it is incomplete.
2. Copy the criteria sheet from the main document (the exclusionary X1 and X2 and the candidates D1
   to D10) into `docs/ELIGIBILITY_CRITERIA.md`.
3. Open the agent in the project folder (still empty except for those two files) and paste this
   prompt:

> We are going to assess whether this project can be run with the Urazuke method. Read the
> initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`. First, evaluate whether the survey is sufficient to answer
> every criterion. If any criterion cannot be answered from the survey, ask me for the missing
> information before going on; do not assume. Then fill in the sheet criterion by criterion:
> the answer, where it comes from, and for each exclusionary criterion whether it is green or
> red. Do not decide: present me the completed sheet with your reading and your doubts, and I
> will decide. Reply in my language.

   You are asking it to read the two files, to **evaluate whether the survey is enough and ask for
   what is missing before answering** (this clause repeats in every prompt of the course; it is the
   heart of the method), to fill in the sheet saying where each answer comes from, and not to
   decide: the decision is yours.

4. Answer its questions. If it asked none, be suspicious and ask it what it assumed.
5. When it presents the sheet, read it and decide. Then paste the closing prompt:

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.

**Completeness check.** Open `docs/ELIGIBILITY.md` and ask yourself: do the two exclusionary
criteria have an explicit answer and a source? Is any criterion answered with "probably"? (If so,
the agent had to ask.) Does the decision have a date and a name? Can the conditions, if any, be
verified? Are the questions it asked and your answers there?

**Deliverable.** `docs/ELIGIBILITY.md`, one page.

**Typical mistakes.** Writing the survey "complete" so that the agent does not ask: you miss the
exercise and, worse, you get used to doing the model's work. Answering "go" with five conditions:
it is a "no-go" in disguise. And the most common: skipping the lesson because "obviously it goes".
The obvious is what does not get written, and what does not get written is what gets argued about
later.

**In the guide project.** The agent should ask, at minimum, whether the interface will be web or
mobile (because X2 depends on that), whether there is a previous system even if it is a spreadsheet,
and which messaging channel will be used (WhatsApp has requirements that email does not). The sheet
ends in "go", with a reasonable condition: having the messaging channel defined before step 12.

### Lesson 1 — The working agreement

**What you need to understand.** The agent arrives at every session with no memory of the
previous one. It is like a new colleague every morning. The working agreement is what you tell them
on the first day and what they will re-read every day: how you work, what you do not tolerate, how
much autonomy you give them. Without an agreement, you will repeat the same things every session,
and each time a little differently.

The six minimum rules each have a failure behind them: "my time is sacred" prevents it consulting
you on every detail; "zero debt" prevents "I'll fix it later"; "exact scope" prevents it adding
things "while it's at it"; "documentation in the same commit" prevents stale manuals; "never report
as done what was not verified" prevents the "done" that was not; "speak my language" prevents it
answering in English because the prompt was in English.

**The task.**

1. Think for five minutes about how you work: do you prefer it to ask a lot or a little? In which
   language? What drives you up the wall when working with other people? Write it down in a short
   list; you will tell it when it asks.
2. Paste this prompt:

> Before we write any code, we are going to set the working agreement between you and me.
> Write `docs/WORKING_AGREEMENT.md` with at least these rules, each with one line explaining
> what it prevents: (1) My time is sacred: do not ask me what you can resolve on your own, and
> when you do ask, ask in prose, with your recommendation. (2) Zero technical debt: whatever
> breaks is fixed at the root, with its regression test, in the same session. (3) Exact scope:
> no more and no less than what was asked; if you see something else, log it as a pending item,
> do not do it. (4) Documentation is updated in the same commit as the change. (5) Never report
> as done something you have not verified; always separate what you verified from what you
> believe. (6) Speak my language. Add any rules you think this project needs, marked as
> proposals. If you need to know something about how I work in order to write this, ask me.

   You are asking for the six rules with the failure each prevents, project-specific rules marked
   as proposals so that you accept or reject them, and that it asks you about yourself.

3. Answer its questions. Read the proposals: accept the ones that help you, reject the ones that
   do not, always with a one-line reason.
4. Close with:

> I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the
> agreement with today's date and a version number. Then add to the project file the
> instruction to read this agreement at the start of every session.

   If there is no project file yet (you make it in lesson 2), it will create a minimal one with
   that instruction; that is fine.

**Completeness check.** Are the six rules there, each with the failure it prevents? Is any written
as an aspiration ("try to…")? Does the project file order it to be read at the start of every
session? Did it ask you at least one question about how you work?

**Deliverable.** `docs/WORKING_AGREEMENT.md` with date and version, hooked into the project file.

**Typical mistakes.** Accepting twenty rules because they all sound good: nobody follows twenty;
six or eight get followed. Leaving a rule saying the agent may change the agreement: no. And the
quietest one: never testing whether it reads it. In lesson 2 you will see how.

**In the guide project.** One project-specific rule the agent usually proposes for Turnera, and
which is worth accepting: "I never send a real message to a patient from an environment other than
production; in test, messages go to a fake inbox". It is step 12 peeking in early.

### Lesson 2 — The project definition and mandatory reading

**What you need to understand.** The project file (`PROJECT.md`, or `CLAUDE.md`, or whatever
name your tool uses) is the map the agent reads at the start of every session. It has to be
**short**: what the system is, for whom, what it is NOT, the modules, the decisions made with
their dates, and the order to read the agreement. What happened each day does not go there: it goes
to the living state (`docs/STATUS.md`) and to the pending-items register. One of the method's
source systems let this file grow to 9,661 lines; in that state, nobody reads it, and neither does
the model.

The "what it is NOT" section is the most important one and the one everybody leaves empty. What is
not written is what the model will invent when it runs into a gap.

**The task.**

1. Complete `docs/INITIAL_SURVEY.md` with what you learned in lesson 0 (the answers to the agent's
   questions). Add a section "what the system must NOT do", even with just two items.
2. Paste:

> We are going to define the project in writing. Read the business survey in
> `docs/INITIAL_SURVEY.md` and the working agreement in `docs/WORKING_AGREEMENT.md`. Evaluate
> whether the survey is sufficient to describe the system, its users and its boundaries; if it
> is not, ask me for what is missing before writing anything. Then write `PROJECT.md`, three
> hundred lines at most, with: what the system is and for whom; what it is NOT; the main
> modules as a list; the decisions already made, each with its date; and the instruction to
> read this file and the working agreement at the start of every session. Separately, create
> `docs/STATUS.md` for the living state (what is being worked on, what is open): that file
> changes every day; `PROJECT.md` almost never does. Reply in my language.

   You are asking it to ask before drafting, a short project file with the "what it is not"
   section, decisions with dates, and the living state in another file.

3. Read `PROJECT.md` in full. It has to fit in five minutes. Correct what is not true or not yours.
4. Close with:

> Apply these corrections: [list]. Finalize `PROJECT.md` with today's date. Add to the working
> agreement that the change history never goes into `PROJECT.md`: it goes to `docs/STATUS.md`
> or to the pending-items register.

5. **The reading test.** Close the agent's session and open a new one. Without telling it anything
   else, ask: "What must this system not do?". If it answers with what `PROJECT.md` says, the hook
   works. If it answers anything else, it is not reading the map: check how your tool loads the
   project file.

**Completeness check.** Can `PROJECT.md` be read in five minutes? Does it say what the system does
NOT do? Does every decision have a date and who made it? Did the agent ask something before
drafting? Is the living state in another file? Did it pass the reading test?

**Deliverable.** `PROJECT.md` (three hundred lines at most) and `docs/STATUS.md`, and the reading
test passed.

**Typical mistakes.** Pasting into `PROJECT.md` the whole specification you already had: it is the
programme, not the specification. Leaving "what it is not" empty. And not doing the reading test:
it is the only way to know that steps 1 and 2 are acting and not just existing.

**In the guide project.** In Turnera's "what it is NOT" there should be, at minimum: it is not a
medical-records system (it stores no medical data), it is not a payment gateway (it uses a
provider's payment link, it does not process cards), and it does not send marketing messages (only
confirmations and reminders). Each of those three "no"s saves you a half-hour conversation later.

### Lesson 3 — Size before designing the architecture

**What you need to understand.** There are decisions that, made badly, cost weeks: which
database, whether the calls to the database are synchronous or asynchronous, how many people can
use the system at the same time. And they all depend on numbers that **only the business has**:
how many appointments a day, how many messages per appointment, how many years are kept. The model
cannot infer those numbers; it can infer what derives from them (rows per year, size at five years).
That is why the prompt demands that it distinguish primary from derived data, and **ask for the
missing primary figures instead of estimating them**. When the model estimates a primary figure, it
does so with the same confident face as when it computes; and you have no way to tell by tone.

There is also a kind of decision worth always making: the **asymmetric** ones, cheap if they turn
out unnecessary and very expensive if they turn out missing. The canonical example is making the
interface to the database asynchronous from the first day even if the first database is a file: if
you never change database, you wasted one `await`; if you do change, you saved yourself a rewrite.

**The task.**

1. Sit down with the owner (or with yourself, if the project is yours) and write
   `docs/VOLUME_SURVEY.md`: the main entities and how many there are, how many are added per month,
   how many events per entity, how many people operate at peak and when the peak is, how long data
   is kept, whether there are exceptional loads, what growth they expect. For every number, note
   where it comes from: "the manager said so", "counted in September's notebook", "assumption".
   Leave some as "assumption" on purpose: you will see what the agent does with them.
2. Paste:

> Before proposing any architecture we are going to size the system. Read `PROJECT.md` and the
> volume survey in `docs/VOLUME_SURVEY.md`. Distinguish primary data (facts only the business
> knows) from derived data (what can be computed from the primary data). Evaluate whether the
> primary data is complete enough to compute what follows; if any primary figure is missing, or
> is marked as an assumption, ask me for all the missing figures before going on. Never estimate
> a primary figure. If a previous system can be queried, use its real numbers and state where
> each came from. With the primary data complete, compute, showing the arithmetic: rows per year
> for the three largest tables, peak concurrency, data size at five years, and what breaks first
> if everything is multiplied by ten. Then present three options for persistence and concurrency,
> each with the cost of migrating to the others later. Do not choose: I choose. Do not write code.
> Reply in my language.

   You are asking it: to distinguish primary from derived; **to ask you for the primary figures
   that are missing or marked "assumption", and never estimate them**; to compute the derived
   figures showing the arithmetic; the "times ten" scenario; three options with the cost of
   changing between them; and not to choose.

3. If it asks you for the "assumptions", good: that was the exercise. Get the numbers (ask the
   owner, count in the notebook) and give them to it. If it did not ask and computed anyway, stop
   and ask it what it did with the assumptions: it is a failure of the step and it is worth seeing
   it now.
4. Read the three options. Redo one calculation by hand (for example, rows per year of the largest
   table): it has to give you the same. Choose.
5. Close with:

> I choose option [B]. Record in `docs/SIZING.md`: the primary data with its source, the derived
> data with its arithmetic, the three options, the chosen one and why, and the decisions we are
> taking "just in case" even though they are not needed today (for example: the persistence
> interface is asynchronous from line one, even if the first engine is synchronous). Include the
> questions you asked and my answers.

**Completeness check.** Is any primary figure sourced "assumption" or unsourced? Does every
derived figure show the arithmetic, and does it match when you redo it? Are there three options and
one chosen with a reason? Does it say what happens "times ten"? Are the asymmetric decisions
written? Did it ask you?

**Deliverable.** `docs/SIZING.md`.

**Typical mistakes.** Filling in the survey with numbers you made up so that the agent does not ask
(it is the same mistake as in lesson 0, and worse here because those numbers decide the
architecture). Choosing the "most powerful" option just in case: the migration cost is in the table
precisely so that you choose the smallest one that survives "times ten". And not writing the
asymmetric decisions: if they are not written, in lesson 4 the agent will not honour them.

**In the guide project.** Primary: 40 appointments/day × 250 days = 10,000 appointments/year; 3
messages per appointment = 30,000 messages/year; 5 years of retention; peak of two simultaneous
receptionists. "Times ten" is the question of selling to other clinics: 100,000 appointments and
300,000 messages per year. The three typical options: a SQLite file (enough for one clinic for
years, does not survive "times ten" with several writers), PostgreSQL from the start (survives
everything, costs a bit more infrastructure), or SQLite now with the asynchronous interface and a
planned migration to PostgreSQL (the asymmetric one). For the course we choose the third: it is the
one that teaches the most.

### Lesson 4 — The skeleton with its gates

**What you need to understand.** Before the system does anything useful, it has to start, be
tested and be deployed **empty**. It looks like a waste of time ("deploy what, if there is
nothing?") and it is the opposite: the path to production is part of the product, and the only way
to know it works is to walk it when there is still nothing to lose. In one of the source systems the
deployment arrived a month after the start and cost five pending items in a row; with the skeleton
deployed in the first week, those five blows would have landed on an empty system.

The **gates** are the conditions to move from one stage to another ("the suite is green", "the
deployment to test worked"). Writing them now, even if they seem obvious, is what later lets you say
"this does not pass" without arguing.

**The task.**

1. Write `docs/ENVIRONMENTS_SURVEY.md`: where the system will run (a server you already have, a
   cloud service), whether there will be a test environment and a production one, who has access to
   what, and how deployment is done today if anything exists. If you have nothing, say so: the
   agent will propose the simplest option.
2. Make sure you have the credentials for the place where it will be deployed, even if it is a free
   service. Without that, the skeleton stays on your machine and the lesson cannot be finished.
3. Paste:

> We are going to build the skeleton of the system, with no functionality at all. Read
> `PROJECT.md`, `docs/SIZING.md` and the environments survey. Evaluate whether you have what is
> needed for the skeleton to run in the test environment (access, URL, deployment method); if
> anything is missing, ask me before starting. Then build: the folder structure; the server and
> the UI starting up; the test structure with one smoke test that passes; continuous
> integration running that test suite on every push; and the deployment to the test
> environment. Declare the gates of the workflow (what must be green to move from one stage to
> the next) in `docs/GATES.md`. When done, take a screenshot of the empty UI running in the
> test environment and show it to me. Do not add any functionality "while you are at it".
> Reply in my language.

   You are asking it to check access before starting, the exact list of what a skeleton is, the
   gates written down, a real screenshot of the test environment, and the ban on adding
   functionality.

4. This task is long (one or two hours of the agent's work) and it will have back-and-forth:
   missing credentials, a service that asks to confirm the email, etc. That is normal. What is not
   normal is for it to tell you "done" without the screenshot of the test environment.
5. When it shows you the screenshot, open the URL yourself in your browser. It has to look the
   same.
6. Close with:

> Skeleton approved. Record in `docs/STATUS.md` the test environment URL, the command to run
> the tests and the command to deploy, and mark this step as done. Then run the deployment a
> second time and show me that the second run changed nothing.

**Completeness check.** Did you open the test environment URL yourself and see the empty screen?
Is there a link to a green continuous-integration run? Was the deployment run twice and did the
second run break nothing? Does each gate have a verifiable condition? Is there any functionality
you did not ask for?

**Deliverable.** The repository with the skeleton, continuous integration green, the test
environment URL working, `docs/GATES.md`, and `docs/STATUS.md` with the three commands.

**Typical mistakes.** Accepting "it works locally, we'll see the deployment later": no, the
deployment is the skeleton. Accepting a screenshot of the agent's machine instead of the test
environment. And letting it add "while it's at it" a login screen, a menu, a logo: everything that
enters without a pending item is scope that escaped.

**In the guide project.** Turnera's skeleton is a web page that says "Turnera — version 0.0.1"
running at a public URL of a test environment, a server that answers "ok" on a health route, a smoke
test that calls that route, continuous integration running that test on every push, and the
automatic deployment to the test environment. The gates: "suite green to merge", "test environment
green to promote to production", "rollback tested for the first deployment to production". Nothing
else. And it is odd how satisfying it is to see that empty page at a real URL.

---

## Loop phase: lessons 5 to 10

These six lessons are the ones you will use **with every change**, throughout the project. They
are learned in an afternoon, but practised over weeks. The idea is that by the end of the phase you
have the reflex: take a pending item, build, prove red, update the other side, measure what needs
measuring, and report separating what was verified from what is believed. That reflex is the
method.

To practise them you will need real functionality. In the guide project, the first block of pending
items is the basic agenda: see the day's appointments, enter an appointment, cancel it. No messages
or payments yet; that comes after the locks (lesson 12).

### Lesson 5 — The plan is the pending items

**What you need to understand.** There is no "plan" on one side and "task list" on the other:
**the pending-items list is the plan**. Every item has a number, where it comes from (the decision
or request that originated it), how it is verified as done, and, when it is closed, the evidence.
That last part is what you will look at instead of looking at the code. And a golden rule for the
agent: whatever shows up outside the list is written down as a new item, not done.

**The task.**

1. Write in `docs/INITIAL_SURVEY.md` (or in a separate file) the client's request for the first
   block of functionality, the way the client would say it, with its ambiguities. For Turnera: "I
   want to see the day's appointments, enter a new one and cancel".
2. Paste:

> We are going to turn everything that must be done into numbered pending items. Read
> `PROJECT.md`, the client's request and whatever is in `docs/STATUS.md`. If the request is
> ambiguous on any point such that you cannot write a verifiable pending item for it, ask me;
> do not resolve it by assuming. Create `docs/PENDING.md` with one item per thing to do: number
> (PND-001 onwards), one-line title, what is requested, which decision originates it (or
> "client request, date"), how it will be verified as done, and status. Order them by the
> priority I gave you; if I gave none, propose an order and tell me why. Reply in my language.

   You are asking it to turn the request into verifiable items, to **ask when the request is not
   enough to write a verifiable one**, and to propose an order with its reason.

3. Answer the questions (for Turnera it will ask, for example, what "the day" is: today, or any day
   chosen?; does cancelling delete or mark?). Those questions are business decisions; in lesson 6
   you will see where they are written.
4. Add to the working agreement the routine of every session. Paste:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before touching any code, open
> `docs/PENDING.md`, tell me which item you are taking and why. Every commit cites its pending
> item. A pending item is closed with written evidence (the test, the screenshot, the number),
> never with 'done'. If along the way you see something that is not on the list, add it as a new
> pending item; do not do it."

5. Now start building. Ask it to take the first item. From here on, every session starts with
   "which item are you taking and why".

**Completeness check.** Does every item say how it is verified? Are there closed items without
evidence or commit? Take three commits at random: do they cite their item? Did something appear in
the code without an item? Did it ask you about the ambiguous parts?

**Deliverable.** `docs/PENDING.md` with the first block, the routine in the agreement, and the
first item in progress.

**Typical mistakes.** Writing items without "how it is verified" ("improve the appointments
screen"): they cannot be closed, and so they get closed with "done". Letting the agent close items
without evidence because "I already saw it work". And the hardest to correct: letting it do "one
little extra thing" outside the list. The first time you allow it, you lost exact scope.

**In the guide project.** Turnera's first block is about six items: PND-001 see a day's
appointments; PND-002 enter an appointment with patient, practitioner, date and time; PND-003
prevent two appointments for the same practitioner at the same time; PND-004 cancel an appointment
(mark, not delete: decision of lesson 6); PND-005 search a patient by name or phone; PND-006 patient
registration with minimal data. Each with its verification: "it shows on the screen and stays in the
database", "when the double booking is attempted the screen warns and the database does not store
it", etc.

### Lesson 6 — Decisions are written next to the code

**What you need to understand.** When the model finds a gap in the business rules, **it fills
it**. It does not stop to ask; it completes with what seems most likely, with the same naturalness
with which it writes everything else. That is why this lesson is not "write down the decisions" but
"demand that it stop and ask when one is missing". And when you decide, the decision is written
with your exact words, your name and the date, in the commit and in a register. Six weeks later,
when someone asks "why does cancelling not delete?", the answer is written and it is yours.

**The task.**

1. Add the decisions routine to the agreement. Paste:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Whenever implementing something requires a
> business rule that is not written down, or you must choose between two approaches that change
> what the user sees, stop and ask me, in prose, with your recommendation and the alternative. Do
> not implement the one you prefer. When I decide, write the decision with my name and the date
> in the commit message and in `docs/DECISIONS.md`, with the exact words I used. If I do not
> answer and you must move on, implement the most reversible option and mark it 'decision by
> omission, pending confirmation', so that I can review it."

   You are asking it to stop at an unwritten rule, to ask with a recommendation and an alternative
   (so that you can decide in ten seconds), to record your exact words, and when you do not answer
   to choose the most reversible option and mark it.

2. Keep building the block's items. Every time it asks you a business rule, decide and answer with
   the closing format:

> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.

3. Do the opposite test, once, on purpose: leave a question unanswered for a session and see what
   it does. It has to choose the most reversible option and mark it "by omission". If it chose what
   it liked and did not mark it, that is a failure of the step: fix it in the agreement.

**Completeness check.** Open three commits that touch business rules: do they cite who decided
and when? Are there unconfirmed "by omission" decisions? Is there any rule in the system you do not
recognise as yours? Are the sentences verbatim or "improved"?

**Deliverable.** `docs/DECISIONS.md` growing, with at least five decisions from the first block,
and the commits citing them.

**Typical mistakes.** Answering the questions in the chat and not demanding they be written: by the
third session nobody remembers. Letting the agent "improve" your words: a paraphrased rule is a
different rule. And the gravest: discovering in production a rule nobody decided. When it happens
(it will), it is not a bug: it is a failure of step 6, and it is fixed in the agreement, not only in
the code.

**In the guide project.** Typical decisions of Turnera's first block: "cancelling marks the
appointment as cancelled and records who and when; nothing is deleted"; "a practitioner cannot have
two appointments at the same time, but can have two patients in a double slot if the practitioner
enabled it"; "the patient's phone is mandatory; the email is not". Each with a date and the
manager's name.

### Lesson 7 — Tests as locks, proved red

**What you need to understand.** This is the central lesson of the course. A test you never saw
fail, you do not know whether it tests anything. The model writes the code and the test in the same
session, with the same understanding: if it misunderstood the request, the test tests what it
understood, and it passes. The only cheap way to know that the test looks at what matters is **to
see it red against the old code**: if the code from before the change also passes it, the test does
not tell before from after, and so it is useless. That is why the request is not "write tests" but
"show me the red, then the green, then the regression".

And a second idea: end-to-end tests. A test that verifies from the screen (clicks, types, reads)
and checks the effect on the backend (the row is there, the state changed) is the one that replaces
your reading of the code. It is criterion X2 of lesson 0 turned into practice.

**The task.**

1. Add the evidence routine to the agreement. Paste:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "To close a pending item I need evidence,
> not your word. (1) Write the test that proves what the item asks for. (2) Demonstrate that this
> test fails against the previous code: you may temporarily revert the change, or run the test
> against the old version, but show me the red output. (3) Show me the green output with the
> change. (4) Run the regression suite for the neighbouring items and show me it is still green.
> (5) Do not replace with mocks the very part you are trying to test. If testing end to end
> requires something you lack (data, access, an environment), ask me for it; do not simulate what
> you do not have. Finally, the commit message says 'proved red against [what]' and the test
> counts."

   You are asking for the test, **the demonstrated red with the output in view**, the green, the
   neighbours' regression in the same session, no mocking of precisely what is tested, and asking
   for what is missing to test end to end instead of simulating it.

2. Take the double-booking item (PND-003 in Turnera, or the equivalent in your project: a rule that
   prevents something). Ask it to close it with the routine. Read the report: there has to be a red
   output with numbers ("1 of 1 fails against the version without the rule") and then the green.
3. Ask for an end-to-end test for that same item: that it opens the screen, tries to enter the
   double booking, reads the warning, and checks in the database that it was not stored. If it says
   it cannot because the screen cannot be driven programmatically, stop: that is X2 failing, and it
   has to be fixed now (add identifiers to the screen's elements) before going on.
4. When the agent says something "cannot be tested", paste:

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

**Completeness check.** Does the report show the red, with numbers? Did the regression run in the
same session, with numbers? Is any part mocked right where the change is? Does the commit say
"proved red"? Does the screen test also verify the backend?

**Deliverable.** At least three items closed with the full routine (red, green, regression), one of
them with an end-to-end test.

**Typical mistakes.** Accepting "the tests pass" without numbers and without red. Accepting that
the suite is "sped up" by replacing end-to-end tests with simulations. And letting a "cannot be
tested" go by without opening the item: non-testability is debt, and debt is recorded.

**In the guide project.** The double-booking red looks like this: the agent temporarily removes
the rule, runs the test, and the output says the test failed because the second appointment was
stored. It puts the rule back, runs, green. Then the regression: the tests for PND-001 and PND-002
are still green. And the end-to-end one: a program-controlled browser loads the form, presses
"save", reads the message "that time is already taken", and a database query confirms there is a
single appointment at that time. When you see that report for the first time, you will understand
what the whole method is for.

### Lesson 8 — Producer/consumer symmetry, and the anti-pattern register

**What you need to understand.** When you change one end of the system (the server, the database,
a robot), the other end (the screen, a counter, a report) has to change in the same commit. If not,
they diverge, and the user sees one number on one side and another on the other. The principle that
prevents it is simple to state and hard to sustain: **every list has a single owner**. The possible
states of an appointment, the columns of a report, the reasons something is waiting: one part
defines them (the producer) and the rest read them from there. As soon as there are two copies, one
is out of date; the only question is which.

The second half of the lesson is the anti-pattern register (GOTCHAS): the mistakes you already paid
for once, written down with their smell, root cause, fix and how to detect them earlier. The
important thing is not writing them down: it is adding the automatic check that detects them,
because an anti-pattern written down but not automated repeats when the session changes.

**The task.**

1. Ask for the contracts map:

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

   You are asking for the inventory of contracts with both sides, and that what it does not see it
   declares instead of omitting.

2. Add the routine to the agreement:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before closing any change that touches a
> contract, look up every consumer in the map and update them in the same commit. Always prefer
> that the producer defines the list (columns, causes, states) and the consumer reads it, rather
> than each keeping its own copy. If the map does not have that relationship, add it."

3. Do the list test: pick a list that appears on the screen (in Turnera, the states of an
   appointment: pending, confirmed, cancelled, no-show) and ask the agent to show you where it is
   defined and where it is read. If there are two definitions, ask it to leave only one.
4. The first time something breaks for the second time (it will happen in the coming weeks), paste:

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

**Completeness check.** Pick a contract from the map: does every consumer read it from the
producer or keep its own copy? Is there a number shown on two screens, and do they match? Does
every GOTCHAS entry have the four parts? Did anything already written down repeat?

**Deliverable.** `docs/PRODUCER_CONSUMER_MAP.md`, the routine in the agreement, and
`docs/GOTCHAS.md` (even if it starts with a single entry).

**Typical mistakes.** Making the map once and never looking at it again: it has to grow with every
new contract. Writing anti-patterns as anecdotes ("once it happened that…") without the "how to
detect it earlier" part. And the classic: the same text of a state typed by hand in the server and
in the screen; the day one changes, the other stays.

**In the guide project.** Turnera's map has, at first, four or five contracts: the list of
appointment states (defined by the server, read by the screen and the monthly report); the
appointments table (written by the entry form, read by the day view and the report); the patients
table; and, later, the message queue (written by the agenda, read by the sender). The first GOTCHA is
usually about dates: the agenda showed the appointment on the wrong day because the server stored in
one time zone and the screen displayed in another. Smell: "the 11 pm appointment shows up tomorrow".
Root cause: two time zones. Fix: a single one, on the server. Detection: a test with an appointment
at 11:30 pm.

### Lesson 9 — Measure before building, with an instrument that is itself verified

**What you need to understand.** The model produces claims with a number ("there are about 120
queries of that kind") and they sound exactly the same whether measured or estimated. You cannot
tell them apart by tone. The only way is to demand the instrument: "what did you measure it with?
show me the command". The rule of the step is that **no number that decides anything comes from an
impression**: it comes from a meter that lives in the repository, has a test that verifies it
against a known case, and that you can run.

And there is something more, which we learned the hard way: meters lie too. In one of the source
systems, a meter read zero because it did not see part of the code, and another said 27 when there
were 44. Hence the audit in both directions: from the code to the measurement (is everything that
should be counted, counted?) and from the measurement to the code (does everything counted actually
exist?).

In a small project, "measuring" is modest: counting how many queries a screen runs when it loads,
how long the monthly report takes, how many messages were sent yesterday. No ratchet or per-path
budget needed. What is needed is that the number has a command behind it.

**The task.**

1. Choose a hypothesis. In Turnera, a good one: "the day view runs one database query per
   appointment it shows" (the classic N+1 loop). If it is not true, even better: you will see how a
   false hypothesis is verified.
2. Paste:

> Before building anything, we are going to measure. The hypothesis is: [the day view runs one
> database query per appointment shown]. Write a meter (a script that lives in the repository)
> that measures [the number of queries the day view runs for a day with N appointments], and a
> test for the meter that checks it against a known case where the answer is known in advance.
> If measuring requires access or data you lack, ask me; do not approximate silently. If some
> part can only be approximated, mark it as approximate and tell me the margin. Run the meter,
> show me the number together with the command that produces it, and audit it in both
> directions: from the code to the measurement (is everything that should be counted, counted?)
> and from the measurement to the code (does everything counted actually exist?). Only then
> propose what to build. Reply in my language.

   You are asking for the meter in the repository, the meter's test, asking for what it lacks
   instead of approximating, marking what is approximate, the number with the command, the audit
   in both directions, and the order: first measure, then propose.

3. Run the command it gave you yourself. It has to give you the same number. You do not need to
   understand the script; you do need to execute it.
4. If the hypothesis was true and the agent proposes fixing it, ask for a budget:

> Set the budget for [queries] on this path at the measured value plus a small margin, and
> protect it with a test that fails if it is exceeded. Tell me the number and the margin.

   That way, if someone puts the loop back in three months from now, the suite catches it.

5. Add rule five to the agreement, for when a plan brings numbers:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before executing a plan that asserts
> numbers, verify every number with the meter. If any does not match, stop and tell me; do not
> execute on a wrong number."

**Completeness check.** Did you run the meter and get the same? Does it have a test, against which
known case? Is there any number in the report without a meter behind it? Is what is approximate
marked? Is there a budget with a test?

**Deliverable.** A meter in the repository with its test, a number with its command and date in
`docs/STATUS.md` or in the item, and (if applicable) a budget protected by a test.

**Typical mistakes.** Accepting the number without running the command: half the value of this
lesson is in you running it. A meter that reads zero: it is almost never zero; it is almost always
not seeing something. And letting the agent "fix while measuring": the order is the method.

**In the guide project.** Turnera's meter is a script that loads a day with 10, 50 and 200
appointments into a test database, opens the day view counting the queries, and writes the three
numbers. The meter's test verifies that with 0 appointments it counts exactly the base queries (say,
2). If there was a loop, the numbers are 12, 52 and 202; it gets fixed, they become 3, 3 and 3, and
the budget is set at 4 with a test that fails if the day view runs more than 4 queries for any number
of appointments.

### Lesson 10 — Honest verification and proportional reporting

**What you need to understand.** If you are not going to read code, the agent's report has to be
trustworthy, and that does not happen by itself. The model was trained to be helpful and complete,
and a report that says "I could not verify this" feels less helpful than one that says "done". So
you have to **explicitly ask** for the bad news, the blind spots and what it did not do. If you do
not ask, it will not give them; not because it hides them, but because it does not consider them
part of the answer.

The structure that makes it honest is three blocks: **verified** (with the proof next to it),
**believed** (what it thinks works and why it did not test it), and **blind spots** (what it cannot
see from where it is). And one rule: bad news first.

**The task.**

1. Add the reporting routine to the agreement:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "When you report, separate three blocks:
> VERIFIED (what you tested, with the command and its output), BELIEVED (what you think works but
> did not test, and why not), and BLIND SPOTS (what you cannot see from where you are: another
> environment, real data, the user's browser). Cover every item I asked for, one by one, even when
> the answer is 'I did not do it'. No claim without its proof next to it. Do not say 'done': say
> what is done and how you know it. If something went wrong, say it first."

2. Ask it to close the next item and read the report with the checklist below. The first time, the
   "blind spots" block will almost certainly be empty. Ask it: "what can you not see from where you
   are?". There has to be something (your browser, the production environment, the real data). If
   it insists on nothing, you insist.
3. Practise the "still broken". Ask for something small, check in the test environment, and if for
   any reason you do not see the change (it is common: the deployment takes time, or was not done),
   tell it "still broken" and paste:

> Before diagnosing again, compare the version running where I see the problem with the version
> that contains your fix. Tell me both. If they differ, the problem is publication, not code.

   Half of the "still broken" cases are fixes that are in the repository and not in the place
   where you look. This clause saves you hours.

**Completeness check.** Are the three blocks there? Did you pick a claim from "verified" at random
and is its proof next to it, and could you reproduce it? Does it cover every item you asked for? Is
the bad news at the beginning? Did it ever say a bare "done"?

**Deliverable.** The routine in the agreement and three consecutive reports with the three blocks,
one of them with a real blind spot.

**Typical mistakes.** Reading only the "verified" block and skipping the other two: the other two
are the ones that protect you. Accepting "it should work" inside "verified": that is "believed" in
disguise. And getting used to ever-longer reports: an inflated report is covering something with
volume.

**In the guide project.** A good closing report for PND-004 (cancel an appointment) in Turnera:
"VERIFIED: the cancellation test passes (1/1, proved red against the version that deleted);
regression 6/6; in the test environment, appointment 17 of 3 November shows as cancelled by
'reception1' at 10:42 (screenshot). BELIEVED: the monthly report will count cancellations correctly,
but I did not test it because the report is PND-011 and does not exist yet. BLIND SPOTS: I cannot
see how the 'cancelled' state looks on the receptionist's phone; test it yourself."

---

## Operation phase: lessons 11 to 15

These five lessons are the ones that turn "it works" into "it can be sustained". They are done when
the first block of functionality has been built with the loop, and before the system acts on the
world (sends messages, charges) or has real users. In the guide project, it is the moment to add the
reminders and the deposit, and that is why lesson 12 (locks) comes before building those features,
not after.

### Lesson 11 — The periodic audit as input to the plan

**What you need to understand.** Every so often the whole system has to be looked at with fresh
eyes, and what is seen does not go to a report that gets filed: it goes to the pending-items list.
The important part is "fresh eyes": the one who audits must not be the one who built, because they
share its assumptions. A model that built a module "knows" the password written in the code was
temporary; a model seeing it for the first time reports it as what it is. No other company is
needed: **another session, with another instructions file, that did not take part** is enough.

**The task.**

1. Open a new agent session in a clean copy of the repository (clone it into another folder). If
   your tool allows it, give it a different instructions file that only says "you are an auditor;
   you did not build this system". Give it read-only access to the test environment.
2. Paste:

> Audit this system for [integrity, security, performance and code quality]. Read-only: change
> nothing except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires
> access you lack (the database, the log, an environment), tell me and mark that part as not
> audited; do not pass it as fine. Go through all of the code, not a sample. For every finding:
> where it is (file and line), what the risk is, what evidence proves it (the command, the
> query, the number), and its priority: P0 must be fixed now, P1 soon, P2 when possible. Give a
> grade to every dimension you audited. End with the list of P0 findings turned into proposed
> pending items. Reply in my language.

   You are asking for read-only, that it declares what it could not audit instead of approving it
   by omission, all of the code and not a sample, every finding with location, risk, evidence and
   priority, grades per dimension, and the P0 findings already as proposed items.

3. Read the report. Pick two findings and ask the auditor to show you the evidence (the command,
   the line). It has to be able to.
4. Go back to the builder's session and paste:

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.

5. Repeat this lesson before the first deployment to production (lesson 13) and, afterwards, every
   one or two months.

**Completeness check.** Does the report say what it could NOT audit? Do two random findings have
file, line and reproducible evidence? Does every P0 have its item opened? Will the grades be
comparable with the next audit? Did a session different from the builder audit?

**Deliverable.** `docs/AUDIT_[date].md` and the P0/P1 items opened.

**Typical mistakes.** Auditing with the same session that built: it will confirm its own
assumptions. Accepting a report with no P0 in a system older than a month: it is almost never true.
And filing the report without opening the items: then the audit served no purpose.

**In the guide project.** Turnera's first audit usually finds: patient data in the log (phone
numbers printed when sending messages: P0); the patient search by name without an index (P1, it
will be felt at 5,000 patients); the appointment form not validating that the date is in the future
(P1); and some dependency with a known vulnerability (P1). Four new items, all with file and line.

### Lesson 12 — Fail-closed, locks and zero silent harm

**What you need to understand.** Software, by default, carries on when in doubt: if validation
fails, the code continues; if the service does not answer, everything is assumed fine. It is
"fail-open", like a door that opens when the power is cut. The method flips the default: **on
doubt, no**. Every consequential action (charge, send, delete, approve) carries a lock, has a
written way back, and every new automation starts in dry-run mode, logging what it would have done,
until you enable it.

This lesson comes **before** building the features that act on the world. In Turnera, before the
reminders and the deposit.

**The task.**

1. Write `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` with the owner: what the system does or will do
   that charges, sends, approves, deletes or notifies someone outside; what happens if it is done
   twice; what happens if it is done wrong; how it is undone.
2. Paste:

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock. Reply in my language.

   You are asking it to compare what the business said with what the code does (that is where the
   actions nobody remembered appear), to ask about the differences, and for every action the
   reversibility, the lock and the way back, with the fail-closed rule written down.

3. Confirm lock by lock. Close with:

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.

4. Now build the consequential features (the reminders, the deposit) with the loop of lessons 5 to
   10, and leave them in dry-run mode. Watch for a few days the "would have sent" log before enabling
   real sending.

**Completeness check.** Is every action that charges, sends, approves or deletes in the table?
Does every lock have its red test? Does every irreversible action have a written way back? Did the
new automations start in dry-run mode and did you see the log before enabling them?

**Deliverable.** `docs/LOCKS.md`, one test per lock proved red, and the automations in dry-run mode
with their log.

**Typical mistakes.** Enabling real sending "to test with a message to my own phone": dry-run mode
exists precisely for that. A lock that can be bypassed with a "for testing" parameter: that
parameter will end up set in production. And not looking at the "would have done" log: it is the
only window to see an error before it reaches a patient.

**In the guide project.** Turnera's lock table: send reminder (not reversible; lock: idempotency
per appointment, one send per appointment and channel, limit of 200 per day, dry-run first; way
back: none, hence the limit); charge deposit (reversible with refund; lock: explicit confirmation by
the receptionist, amount set by the practitioner; way back: refund through the payment provider);
cancel appointment (irreversible for the patient; lock: confirmation and record of who; way back:
recreate the appointment); delete patient (irreversible; lock: double confirmation, manager only,
and only if there are no future appointments; way back: none, hence double). Each lock with a test
showing that, without the lock, the action happened.

### Lesson 13 — Continuous integration, environments, secrets and deployment as part of the product

**What you need to understand.** Reaching production has to be a reproducible package: the tests
run **once**, the deployment only packages and uploads, the configuration lives on the server and
not in the repository, there is a procedure to promote from test to production that can be run
twice, and the rollback is **tested** (a rollback that was never tested does not exist). On
secrets, a rule with no exceptions: **a secret that was seen in a chat, a log or a commit is no
longer a secret**; it is rotated, full stop.

You already have a good part of this from the skeleton (lesson 4). This lesson completes it towards
production.

**The task.**

1. Complete `docs/ENVIRONMENTS_SURVEY.md` with what is missing for production: the domain, where
   the secrets will live, how much continuous-integration quota you have (if you use GitHub Actions,
   check your plan's limit: one of the source systems burned it running the tests three times per
   commit).
2. Paste:

> We are going to close the path to production. Read the environments and access survey.
> Evaluate whether you have what is needed to deploy to production safely (access, domain,
> where the secrets live, how to roll back); if anything is missing, ask me. Then set up: (1)
> continuous integration runs the full test suite exactly once per commit; (2) the deployment
> waits for that run's result and only packages and uploads, without running tests again; (3)
> each environment's configuration lives on the server (environment file or vault), never in the
> repository; (4) a written procedure to promote from the test environment to production, which
> can be run twice without breaking anything; (5) the rollback, tested; (6) an automatic check
> that prevents committing a secret. Document all of it in `docs/DEPLOYMENT.md` so that a person
> can do it by hand without you. Reply in my language.

   You are asking for the access before starting, the tests exactly once per commit, the
   deployment that only packages, the configuration outside, repeatable promotion, the rollback
   tested, the lock against secrets, and the documentation for a person.

3. Before the first deployment to production, do the audit of lesson 11 if you have not.
4. Add the deployment routine to the agreement:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before touching production: the test
> environment is green with the same version; the rollback is ready; and tell me what changes in
> the configuration. After deploying: show me the version running in production and an
> end-to-end check on production, read-only."

5. Do the first deployment to production, with the system still without real users. And then
   **test the rollback**: ask it to go back to the previous version and show you it is running, and
   then to return to the new one.
6. If at any point in the course you pasted a secret into the chat (an API key, a password), paste:

> That secret is compromised: rotate it now, tell me everywhere else it was used, and add the
> check that would have caught it.

**Completeness check.** How many times does the suite run per commit? (once; ask for the link). Is
there any real configuration value in the repository? (ask for the empty search). Could you follow
`docs/DEPLOYMENT.md` alone? Was the rollback tested, when, with what evidence? Was every secret
that appeared in the chat rotated? Do you know how much continuous-integration quota you have left?

**Deliverable.** Continuous integration once per commit, the deployment that only packages,
`docs/DEPLOYMENT.md`, the rollback tested, the anti-secrets lock active, and the system running in
production (no users yet).

**Typical mistakes.** The deployment "by hand, quickly, because it is a small change": small
changes break production because nobody tests them. The example configuration file with values that
look real (they are). And not testing the rollback until the day you need it.

**In the guide project.** For Turnera, continuous integration runs the suite (about 30 tests at
this point, including the end-to-end ones) on every push; the deployment to test is automatic on
merging into `main`; promotion to production is a command that packages the version in test and
uploads it, with the configuration (the messaging provider's key, the payment provider's key, the
database URL) in an environment file on the server that is not in the repository. The rollback is
the same command with the previous version. And the anti-secrets lock is a check on every commit
that rejects anything that looks like a key.

### Lesson 14 — Living documentation and manuals a person can follow without AI

**What you need to understand.** The system has to be usable, maintainable and recoverable
without the agent and without you. The criterion for the recovery manual is concrete: **a trusted
person who does not program must be able to follow it, at three in the morning, with the system
down and the agent offline**. If a step says "consult the developer", it is incomplete. And since
regenerating documentation with a model is free, the rule becomes "in the same commit": every
change that touches what the user sees, what the operator does or how it is deployed updates the
manual in the same commit.

**The task.**

1. Add the routine to the agreement:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Every change that modifies what the user
> sees, what the operator does, or how the system is deployed, updates the corresponding manual in
> the same commit. If you do not know which manual, ask."

2. Paste:

> Generate three manuals from the system as it is today in the test environment: the user
> manual (screen by screen, with real screenshots, in the user's language, no jargon); the
> maintenance manual (how it is built, where everything is, how to run the test suite, how to
> add a module); and the infrastructure and recovery manual (how to deploy, how to roll back,
> how to restore a backup, what to do if it goes down; written for a person who has to do it by
> hand, without AI, at three in the morning). If for any section you need something only the
> business knows (who is responsible for what, which phone number to call), ask me; do not leave
> a gap and do not invent. Each manual carries a date and the system version. Reply in my
> language.

   You are asking for the three manuals with real screenshots, the three-in-the-morning criterion
   for the recovery one, that it asks for what only the business knows instead of leaving gaps, and
   date and version.

3. The real test: give the recovery manual to someone who does not program (the owner, a relative)
   and ask them to follow the "it went down" section in the test environment. Wherever they get
   stuck, the manual needs fixing.
4. After the next screen change, check that the commit touched the user manual.

**Completeness check.** Does a random screenshot match today's test environment? Could someone who
does not program follow the "it went down" section? Did the last commit that changed a screen touch
the manual? Are there gaps like "[to be completed]"? Does every manual say which version it is
valid for?

**Deliverable.** The three manuals with date and version, and the test with a person done.

**Typical mistakes.** Generating the manuals once and not putting the routine into the agreement:
in two months they have screenshots of screens that no longer exist. A recovery manual that begins
with "open a session with the agent". And not doing the test with a person: it is the only check
that counts.

**In the guide project.** Turnera's user manual has six screens with screenshots; the maintenance
one explains where every module is and how to run the suite; and the recovery one says, in order,
with the commands: how to know whether the system is down, how to restart it, how to go back to the
previous version, how to restore the database from the latest backup (made every night: that also
comes out of this lesson), and whom to call. The manager followed it in the test environment and got
stuck at "restore the database" because the command assumed a folder she did not have; the manual
was fixed.

### Lesson 15 — The agent inside the system, and the retrospective with numbers

**What you need to understand.** Two things close the cycle. The first is optional: leaving the
agent resident in production, with a bounded scope, to diagnose and give support without you being
there. The rule that orders it is that **it acts on someone's behalf**: its credential is mapped to
a responsible person, and everything it does is logged under that person's name; it is not an
anonymous account, it is an employee with a boss. The second is mandatory: the retrospective with
numbers. What it cost, how many items, which ones went round in circles, which incidents happened
and which step they fall into, and **at least one proposed change to the ladder**. A retrospective
that changes nothing was not a retrospective.

**The task (resident agent, if applicable).**

1. Decide with the owner whether the system needs a resident agent. In Turnera it does: the
   receptionists will have questions ("why didn't this patient get the reminder?") that the agent
   can answer by reading the log, without anyone calling the developer.
2. Paste:

> We are going to leave you resident in production. First, build the map of the system you will
> need in order to operate it: modules, environments, where each configuration lives, which
> actions are consequential (read `docs/LOCKS.md`), whom to notify. If there are parts of the
> system you cannot see from where you are, tell me; the map must not have hidden gaps. Then
> propose your scope in three levels: read-only and diagnosis; configuration changes with my
> approval; consequential actions behind locks. I choose the level. Your credential acts as the
> person who created it: everything you do is logged under that person's name. Reply in my
> language.

   You are asking for the map before operating, that it declares the map's gaps, three scope
   levels so that you choose one, and the credential on a person's behalf.

3. Choose the level (to start, always the first: read-only and diagnosis). Close with:

> Level [1: read-only and diagnosis]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the
> credential (never its value), and the procedure to request my approval. Then prove, with a real
> attempt recorded in the log, that something outside your scope is rejected.

**The task (retrospective, always).**

4. Gather the numbers only you have: how many hours you spent, how much you spent on the AI tool,
   how much continuous-integration quota you used.
5. Paste:

> [The project] is over. Do the retrospective with numbers, not impressions: what it cost
> (tokens, quota, my time), how many pending items, which ones took the most rounds and why,
> which incidents happened and which step of the ladder each falls into, and which step failed
> or was missing. If you lack the data for any figure (my time, for instance), ask me for it or
> mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder:
> which step is modified, how, and which incident justifies it. Write it to
> `docs/RETROSPECTIVE_[date].md`. Reply in my language.

   You are asking for sourced numbers, every incident mapped to a step (an incident that falls
   into none is a missing step), that it asks you for the numbers it lacks, and a concrete
   proposal to change the ladder.

6. Read the change proposal. If it seems valid, send it to the Urazuke repository as an improvement
   proposal (see `CONTRIBUTING.md`): that is how the method learns from every project.

**Completeness check.** Does the map say what the agent can NOT see? Did you see in the log that
an action outside the scope is rejected? Does the credential act on a person's behalf? Does the
retrospective have sourced numbers, or adjectives? Does every incident fall into a step? Is there at
least one concrete change proposal?

**Deliverable.** `docs/RESIDENT_AGENT.md` (if applicable) and `docs/RETROSPECTIVE_[date].md`.

**Typical mistakes.** Giving the resident agent a high level "so that it can solve everything":
start with read-only and raise it when there is evidence. A retrospective saying everything went
well: nothing ever goes entirely well; it is written for you, not for the method. And not sending the
change proposal: step 15 closes when the ladder changes, not when the document is written.

**In the guide project.** Turnera's retrospective, in a typical course: six weeks, about forty
hours of the student's time, twenty-eight items, the ones that went round the most were the messaging
ones (time zones and the WhatsApp provider); two incidents, one in step 8 (the "no-show" state
existed in the screen and not in the server) and one in step 13 (a deployment to production with the
test configuration, caught by the end-to-end check after deploying). Change proposal: that the
deployment routine of step 13 require showing the configuration difference between test and
production before promoting, not just "what changes".

---

## The production readiness list

When the sixteen lessons are done, the system meets this list. It is the operational definition of
"production grade" in Urazuke, and it can be used as a final checklist, with the owner, without
opening the code:

1. There is an eligibility sheet with decision, date and name (S0).
2. There is a working agreement the agent reads every session, and it was tested that it reads it
   (S1, S2).
3. The project file can be read in five minutes and says what the system is NOT (S2).
4. There is a sizing with sourced primary data, derived data with arithmetic, and the "times ten"
   scenario (S3).
5. The skeleton was deployed empty, and the deployment was run twice (S4).
6. Every change has its pending item, and every closed item has its evidence (S5).
7. Every business rule has an owner, a date and verbatim words (S6).
8. Every important test was seen red before green; there are end-to-end tests that verify the
   backend from the screen (S7).
9. Every list has a single owner; there is a producer/consumer map; there is an anti-pattern
   register with automatic checks (S8).
10. Every number that decided something has a meter with a test you can run (S9).
11. Every report separates verified, believed and blind spots (S10).
12. There was at least one audit by a different session, and its P0 findings are pending items
    (S11).
13. Every consequential action has a lock with a red test and a way back; the automations went
    through dry-run mode (S12).
14. The tests run once per commit; the configuration is outside the repository; the rollback was
    tested; no secret lives in the repository or in the chat without rotation (S13).
15. There are three manuals with date and version, and a person who does not program followed the
    recovery one (S14).
16. There is a retrospective with numbers and a proposal to change the ladder (S15).

If all sixteen come out "yes", the system is ready to go live. If any comes out "no", you already
know which step to climb again.

---

## Appendix A — How to evaluate (for whoever teaches the course or self-assesses)

A simple rubric, per lesson, with three levels:

- **Not climbed**: the deliverable is missing, or some completeness check comes out "no".
- **Climbed**: the deliverable exists and every check comes out "yes".
- **Climbed with evidence of judgement**: in addition, the student can tell of a case in which the
  agent did something wrong in that lesson (assumed, invented, over-reported) and how they caught
  it. That is the real objective of the course: not the artefact, but the reflex.

What is not evaluated: the quality of the code. Nobody reads it. The quality of the evidence is
evaluated.

## Appendix B — Adapting the course to each tool

The prompts are the same in any tool. What changes is where the routines go that in the course are
added to `docs/WORKING_AGREEMENT.md`:

- In **Claude Code**, the routines go in the project's `CLAUDE.md` (or the agreement is included
  from there), and they are read automatically every session.
- In **Cursor**, they go in `.cursor/rules/`, as always-on rules.
- In **Codex CLI** or **Gemini CLI**, in `AGENTS.md` or `GEMINI.md` at the root.
- In **Forge**, the agreement and the routines are doctrines, and the step prompts are injected
  automatically when each gate is crossed; the pending-items register is native. The course with
  Forge is the same course with less copying and pasting.

The reading test of lesson 2 holds for all of them: if a new session does not know what the system
must NOT do, the tool is not loading the file where you put the agreement.

## Appendix C — What this manual does not have yet

- A cohort that has taken it. The timings, the typical mistakes and the guide project are written
  from the three source systems, not from students. The first cohort will correct them (and that is,
  literally, step 15 applied to the course).
- The weights of the eligibility criteria (lesson 0), which are being elaborated.
