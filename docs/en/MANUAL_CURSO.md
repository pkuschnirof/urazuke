# Urazuke — the course. Manual with hands-on tasks, step by step, up to the application in production

Author: Pablo Kuschniroff, assisted by Claude Code. Version 2, 18 October 2026. It is a working
document of the Urazuke project: I am going to correct it with the first cohort that uses it. It
is written in everyday language, and every acronym or odd expression is in the glossary of the
main document (`ESCALERA_METODOLOGICA.md`). When I cite a real case I do it with a `[Ref. N]`
mark that leads to the [references document](REFERENCIAS.md); the manual stays clean and the
detail is one click away. The public repository of the method is
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## Before you start

### Who this course is for

For someone who wants to build software with artificial intelligence **and wants that software
to be used for real**, by real people, for months. It is not a programming course: you are not
going to learn a language or a framework. Nor is it a "prompts" course: you are not going to learn
tricks to make the model write better. It is a course of **method**: of what to do in what order,
what to ask the model for at each moment, what it has to deliver to you, and how to know —without
reading code— that what it delivered is complete.

It is useful to you if you are one of these people:

- You have a business, a practice, a small consultancy, and you want your own system without
  hiring a development team.
- You are an automation consultant or freelancer and your clients ask you for "something more"
  than a robot.
- You know how to program, but you want the model to do the heavy lifting and keep the decisions
  for yourself.
- You already "vibecoded" something, it worked for two weeks, and in month three it fell over.

It is not useful to you if what you want is a prototype for Friday's demo. There are faster tools
for that, and this method is going to feel slow to you. The method is for what has to keep working
after the demo.

### What you will have at the end

An application of your own, running in production, with: tests that were seen failing before they
passed; end-to-end tests of every flow; reproducible deployment with rollback; configuration and
secrets outside the repository; the business decisions written down with their date; a semantic
tree of the system and the detailed specification of every thing that was built, in its pending
items; locks on everything that charges, sends or deletes; three manuals that a person can follow
without AI; an audit done by an agent different from the one that built; and a retrospective with
numbers. That is what I call "production grade" here: it is not that it works, it is that **it can
be sustained**.

And you will have something more, which is what you really take with you: the reflex of not
believing the model without evidence, and of knowing exactly what evidence to ask it for at every
step.

### What you need

1. **An AI tool for programming.** Any one that can read and write files in your repository and
   run commands: Claude Code, Cursor, Codex CLI, Gemini CLI, Forge. The method does not depend on
   which one; the main document has a table of where each artefact goes in each tool. In this
   manual I say "the agent" to refer to whichever one you use.
2. **A GitHub account** (or equivalent) and minimal notions of what a repository, a commit and a
   push are. If you do not have them, spend an afternoon on it before starting; any introductory
   tutorial is enough. Nothing more is needed.
3. **A project.** Ideally it is your own: a system you need or that a client asked you for, with
   users who are going to use it. If you do not have one, use the **guide project** I describe
   below; it is designed to go through the sixteen steps without skipping any.
4. **Time.** The course has sixteen lessons, one per step, and a calendar that tells you in which
   week each thing falls (see "The course calendar"). A small project, end to end, is between six
   and eight weeks of part-time work.
5. **A domain owner with time to decide.** If the project is yours, that is you. If it is a
   client's, it is the client, and they have to know that they are going to have to answer
   questions throughout the whole project. This point is not negotiable: without an owner who
   decides, the model decides, and there the method breaks.

### How the course works

Every lesson has the same structure:

- **What you need to understand**: the concept, explained the way you explain it to a person.
- **The task**: step by step, with the exact prompt you are going to give the agent (in English,
  because models follow instructions more precisely in English; below each one it is explained
  what you are asking for) and what to do with what it gives you back.
- **The completeness check**: the list of questions you ask yourself about what the agent
  delivered, without opening the code. If any of them comes out "no", the lesson is not finished.
- **The deliverable**: the file or the evidence that has to exist at the end.
- **Typical mistakes**: what happens to almost everybody the first time.
- **In the guide project**: what this lesson looks like applied to the example project.

One rule for the whole course: **do not move on to the next step with a check at "no"**. The
temptation of "I'll fix it later" is exactly what the method exists to avoid. If a step is not
climbed completely, the next one is built on sand.

### The course calendar: when each thing happens

The main document has, in its Part B, the complete timeline of the method. Here I translate it
into the course calendar for a small project like the guide project. The weeks are indicative;
what is not indicative is the order and, above all, what happens between one lesson and the next.

| Week | Lessons | What you do besides the lessons |
|---|---|---|
| 0 (two or three days) | none | **Intake**: you interview the owner and write in prose what they want, for whom, what happens today, what has consequences, what numbers only they know. You name the use cases you can ("the receptionist books an appointment"), you draw the main screens even if by hand, and you list the business entities with their states. Incomplete on purpose. |
| 1 | 0, 1, 2, 3, 4 | **Start-up, in one go.** Eligibility, agreement, definition with semantic tree, sizing, and the skeleton with **all the infrastructure and the integration and deployment chain**: repository, test environment, continuous integration, first empty deployment. At the close, you open the URL and see the empty screen. |
| 2 | 5, 6, 7 | **First functional block** (the basic schedule). You open the block by turning the request into specified pending items. With each pending item: decisions, test proved red, end-to-end test of the flow, screenshot of the screen that you look at. At the close of the block: full end-to-end suite, and you use the system in the test environment following the flows of the block. |
| 3 | 8, 9, 10 | **Second block** (patients and search). The three remaining lessons of the loop are learned on this block. Same close: end to end of every flow, human testing, user manual with the new screens. |
| 4 | 11, 12 | **Go-live, first half.** Audit by another session. Locks. And only then, the **third block** (reminders and deposit), built with the full loop and left in dry-run mode. |
| 5 | 13, 14 | **Go-live, second half.** Closing of the chain to production with a tested rollback. The three manuals; someone who does not program follows the recovery one. **Acceptance testing** by you or by the owner over every flow. First deployment to production without users. |
| 6 | 15 | **Operation.** You enable the reminders after looking at the dry-run log. Resident agent. Retrospective with numbers and a proposed change to the ladder. |

If your project is bigger, what stretches is weeks 2 and 3 (more blocks), not week 1 or weeks 4
and 5. And if at some point you find yourself doing infrastructure in week 3, or running the
end-to-end suite for the first time in week 5, go back to the calendar: something was skipped.

### The guide project: "Turnera"

If you do not have a project of your own, use this one. It is small, but it has everything needed
so that none of the sixteen steps is a fake: real users, personal data, messages that go out into
the world, and money.

**The business.** A practice (it can be a studio, a hairdresser, a workshop: any place that gives
appointments). Today the appointments are written in a notebook and confirmed by WhatsApp by
hand. Appointments are lost because people forget, there are double bookings because two people
wrote in different notebooks, and nobody knows how many appointments were cancelled last month.

**What they want.** A web schedule where the two receptionists and the three practitioners see
the appointments; automatic reminders 24 hours before, by WhatsApp or email; the possibility of
asking for a deposit through a payment link for certain appointments; and a couple of numbers at
the end of the month (how many appointments, how many no-shows, how many deposits).

**The owner.** The practice manager. She has judgement about the business (she knows which
appointments carry a deposit, how far in advance one can cancel, what to say to a patient who has
missed three times) and she has fifteen minutes a day to answer questions. She does not program,
and she is not going to read code.

**The numbers only she knows.** About forty appointments a day, two hundred and fifty days a
year. About three messages per appointment (confirmation, reminder, sometimes rescheduling).
Patient data is kept for five years. The peak is Monday morning, with the two receptionists
entering at the same time. And a question she cannot answer and that matters: if this works, are
they going to sell it to other practices? (The answer changes the sizing by ten.)

**What has consequences.** Sending a reminder (if it is sent twice, it annoys; if it is sent to
the wrong number, it is a privacy problem). Charging a deposit (money). Cancelling an appointment
(irreversible for the patient who loses it). Deleting a patient (personal data).

**The use cases the practice manager names**, just as she says them: "I book an appointment", "I
look up a patient", "I cancel an appointment", "the patient gets the reminder", "I ask for the
deposit", "I see how many appointments there were this month". There are six; they will be the
end-to-end flows.

This is enough to start. Everything else the agent is going to ask, and it is part of the
exercise that it asks.

---

## The start-up stretch: lessons 0 to 4

These five lessons are done once per project, in week 1, before writing functionality. They are
the ones that tempt you most to skip ("I want to see something working"), and they are the ones
that cost the most to skip. Do them in one go, and only then open the loop.

### Lesson 0 — Can this project be run this way?

**What you need to understand.** The method does not work for every project, and knowing that
before starting is the first quality decision. There are two conditions without which it does not
work: that there is a standard repository where the evidence can be left (X1), and that the
screens can be driven by a program in order to test end to end, from the screen to the backend
(X2). If either of the two fails, the agent is not going to be able to verify itself, and then you
are going to end up reading code yourself, which is exactly what the method promises to avoid. I
took both from projects I turned down [Ref. 46](REFERENCIAS.md#ref-46). Then there are weighted
criteria (whether there is an owner with time, whether an error has consequences, whether it can
be tested in a separate environment, etc.), which I am still calibrating.

For the guide project the two conditions are met: it is a new project (there is no legacy) and we
are going to build it with a web interface that can be driven by a program. For a project of your
own, this lesson may end in "no-go", and that is a valid outcome of the course.

**The task.**

1. Write, by hand, in a file `docs/INITIAL_SURVEY.md`, what you know about the project from the
   week 0 intake: what the client wants, for whom, what happens today without the system, what
   technology there is or is proposed, whether there is a previous system and whether it has a
   repository, who the owner is and how much time they have, what consequence an error has, what
   environments there are going to be. Half a page. It does not matter that it is incomplete; in
   fact, it is part of the exercise that it is incomplete.
2. Copy the criteria sheet from the main document (the exclusionary criteria X1 and X2 and the
   candidates) to `docs/ELIGIBILITY_CRITERIA.md`.
3. Open the agent in the project folder (still empty except for those two files) and paste it
   this prompt:

> We are going to assess whether this project can be run with the Urazuke method. Read the
> initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`. First, evaluate whether the survey is sufficient to answer
> every criterion. If any criterion cannot be answered from the survey, ask me for the missing
> information before going on; do not assume. Then fill in the sheet criterion by criterion:
> the answer, where it comes from, and for each exclusionary criterion whether it is green or
> red. Do not decide: present me the completed sheet with your reading and your doubts, and I
> will decide. Reply in my language.

   You are asking it to read the two files, to **evaluate whether the survey is sufficient and
   ask for what is missing before answering** (this clause is repeated in every prompt of the
   course; it is the heart of the method), to fill in the sheet saying where each answer comes
   from, and not to decide: the decision is yours.

4. Answer its questions. If it did not ask you any, be suspicious and ask it what it assumed.
5. When it presents you the sheet, read it and decide. Then paste it the closing prompt:

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.

**Completeness check.** Open `docs/ELIGIBILITY.md` and ask yourself: do the two exclusionary
criteria have an explicit answer and a source? Is there any criterion answered with "probably"?
(If there is, the agent had to ask.) Does the decision have a date and a name? Can the conditions,
if there are any, be verified? Are the questions it asked and your answers there?

**Deliverable.** `docs/ELIGIBILITY.md`, one page.

**Typical mistakes.** Writing the survey "complete" so that the agent does not ask: you miss the
exercise and, worse, you get used to doing the model's job. Answering "go" with five conditions:
it is a "no-go" in disguise. And the most common one: skipping the lesson because "it is obvious
that it is a go". What is obvious is what does not get written, and what does not get written is
what gets argued about later.

**In the guide project.** The agent should ask, at a minimum, whether the interface is going to be
web or mobile (because X2 depends on that), whether there is a previous system even if it is an
Excel, and which message channel is going to be used (WhatsApp has requirements that email does
not). The sheet ends in "go", with one reasonable condition: having the message channel defined
before step 12.

### Lesson 1 — The working agreement

**What you need to understand.** The agent arrives at every session with no memory of the
previous one. It is like a new collaborator every morning. The working agreement is what you tell
it on the first day and what it is going to re-read every day: how you work, what you do not
tolerate, what level of autonomy you give it. Without an agreement, you are going to repeat the
same things to it every session, and each time a little differently. I wrote it for the first time
after two weeks of repeating myself [Ref. 1](REFERENCIAS.md#ref-1).

Each of the six minimum rules has a failure behind it: "my time is sacred" prevents it from
consulting you on every detail; "zero debt" prevents the "I'll fix it later"; "exact scope"
prevents it from adding things "while it is at it"; "documentation in the same commit" prevents
old manuals; "never report as done what was not verified" prevents the "done" that was not; "speak
my language" prevents it from answering you in English because the prompt was in English.

**The task.**

1. Think for five minutes about how you work: do you prefer it to ask you a lot or a little? In
   what language? What drives you up the wall when working with other people? Write it down in a
   short list; you are going to tell it when it asks.
2. Paste it this prompt:

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

   You are asking it for the six rules with the failure each one prevents, rules of its own
   marked as proposals so that you accept or reject them, and to ask you about yourself.

3. Answer its questions. Read the proposals: accept the ones that are useful to you, reject the
   ones that are not, always with a one-line reason.
4. Close with:

> I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the
> agreement with today's date and a version number. Then add to the project file the
> instruction to read this agreement at the start of every session.

   If there is no project file yet (you make it in lesson 2), it is going to create a minimal one
   with that instruction; that is fine.

**Completeness check.** Are the six rules there, each with the failure it prevents? Is any of them
written as an aspiration ("try to…")? Does the project file order it to be read at the start of
every session? Did it ask you at least one question about how you work?

**Deliverable.** `docs/WORKING_AGREEMENT.md` with date and version, hooked into the project
file.

**Typical mistakes.** Accepting twenty rules because they all sound good: nobody respects twenty;
six or eight get respected. Leaving a rule that says the agent may change the agreement: no. And
the quietest one: never testing whether it reads it. In lesson 2 you are going to see how.

**In the guide project.** A rule of its own that the agent tends to propose for Turnera, and that
is worth accepting: "I never send a real message to a patient from an environment that is not
production; in test, messages go to a fake inbox". It is step 12 peeking in early.

### Lesson 2 — The project definition, the semantic tree and mandatory reading

**What you need to understand.** The project file (`PROJECT.md`, or `CLAUDE.md`, or whatever name
your tool uses) is the map the agent reads at the start of every session. It has to be **short**:
what the system is, for whom, what it is NOT, the modules, the decisions taken with their date,
and the order to read the agreement. What happened each day does not go there: it goes to the
living state (`docs/STATUS.md`) and to the pending-items register. One of my systems let this
file grow to more than nine thousand lines; in that state, nobody reads it, and neither does the
model [Ref. 41](REFERENCIAS.md#ref-41).

But the map has a second piece, and it is the one that does the most work: the **semantic
tree**. It is the system broken down as a tree: the domains at the first level, and under each
one its actors, its processes (the use cases you named in the intake, with actor, trigger, steps,
outcome and exceptions), its entities with their attributes and their states, its screens and its
external integrations. It is the domain model of requirements engineering as it has always been,
put in the form of a tree so that the model reads it. From each node will hang the pending items
and the decisions that touch it. Its value is twofold: it gives the agent the exact context of
the node it is going to touch, and it gives you a way to verify, without reading code, that the
system the agent understands is the one the business asked for. If the tree has a state the
business never named, the model invented it, and you are going to see it before it builds on it.

The "what it is NOT" section is still the most important one and the one everybody leaves empty.
What is not written is what the model is going to invent when it runs into a gap.

**The task.**

1. Complete `docs/INITIAL_SURVEY.md` with what you learned in lesson 0 (the answers to the
   agent's questions). Add a section "what the system must NOT do", even if with two items, and
   make sure the use cases the owner names, the entities with their states and the drawings of
   the screens are there, even if they are photos of a piece of paper.
2. Paste it:

> We are going to define the project in writing. Read the business survey in
> `docs/INITIAL_SURVEY.md` and the working agreement in `docs/WORKING_AGREEMENT.md`. Evaluate
> whether the survey is sufficient to describe the system, its users, its domain and its
> boundaries; if it is not, ask me for what is missing before writing anything. Then write two
> things. First, `PROJECT.md`, three hundred lines at most, with: what the system is and for
> whom; what it is NOT; the main modules as a list; the decisions already made, each with its
> date; and the instruction to read this file and the semantic tree at the start of every
> session. Second, `docs/SEMANTIC_TREE.md`: the system as a tree, with the domains at the top
> level and, under each one, its actors, its processes (the use cases, each with actor, trigger,
> steps, outcome and exceptions), its entities with their attributes, states and transitions,
> its screens, and its external integrations. Mark every node you inferred rather than read in
> the survey, so that I can confirm or correct it. Separately, create `docs/STATUS.md` for the
> living state (what is being worked on, what is open): that file changes every day; the other
> two change only when the system changes. Reply in my language.

   You are asking it to ask before drafting, for a short project file with the "what it is not"
   section, the semantic tree with its complete structure and with the inferred nodes marked,
   and the living state in another file.

3. Read `PROJECT.md` in full. It has to fit in five minutes. Correct whatever is not true or not
   yours.
4. Walk the semantic tree as if you were the client. Look at every node marked as inferred and
   confirm or correct it. Look for missing actors, entity states the business does not use,
   screens you did not ask for.
5. Close with:

> Apply these corrections: [list]. Finalize `PROJECT.md` and `docs/SEMANTIC_TREE.md` with
> today's date. Add to the working agreement two rules: the change history never goes into
> `PROJECT.md` (it goes to `docs/STATUS.md` or to the pending-items register); and every pending
> item must hang from a node of the semantic tree, and the tree is updated in the same commit
> whenever a block adds or changes a node.

6. **The reading test.** Close the agent's session and open a new one. Without telling it
   anything else, ask it: "What must this system not do? And which node of the tree does the
   schedule screen hang from?". If it answers you with what `PROJECT.md` and the tree say, the
   hook works. If it answers you anything else, it is not reading the map: check how your tool
   loads the project file.

**Completeness check.** Can `PROJECT.md` be read in five minutes? Does it say what the system
does NOT do? Does the tree have every actor you know, and does every entity have the states the
business uses, no more and no less? Did you confirm or correct every inferred node? Does every
decision have a date and who took it? Did the agent ask something before drafting? Is the living
state in another file? Did it pass the reading test?

**Deliverable.** `PROJECT.md` (three hundred lines at most), `docs/SEMANTIC_TREE.md` with the
nodes confirmed, `docs/STATUS.md`, and the reading test passed.

**Typical mistakes.** Pasting into `PROJECT.md` the whole specification you already had: it is
the programme, not the specification. Leaving "what it is not" empty. Accepting the tree without
walking it: the model infers states and screens with a naturalness that is frightening, and every
invented node is functionality it is going to build without anyone having asked for it. And not
doing the reading test: it is the only way to know that steps 1 and 2 are acting and not just
existing.

**In the guide project.** In Turnera's "what it is NOT" there should be, at a minimum: it is not a
medical records system (it does not store medical data), it is not a payment gateway (it uses a
payment link from a provider, it does not process cards), and it does not send marketing
messages (only confirmations and reminders). The tree has a "Schedule" domain with the actors
receptionist and practitioner, the processes "book appointment", "cancel appointment" and "look
up patient", the entities Appointment (with states pending, confirmed, cancelled, no-show) and
Patient, and the screens "day view" and "patient record"; a "Messages" domain with the process
"send reminder", the entity Message and the integration with the WhatsApp provider; and a
"Payments" domain with "ask for deposit" and the integration with the payment provider. If the
agent adds a "rescheduled" state to the appointment, ask it where it got it from: the practice
manager did not name it. Maybe it is needed, maybe not; you decide, not the agent.

### Lesson 3 — Size before designing the architecture

**What you need to understand.** There are decisions that, taken badly, cost weeks: which
database, whether the calls to the database are synchronous or asynchronous, how many people can
use the system at the same time. And they all depend on numbers that **only the business has**:
how many appointments a day, how many messages per appointment, how many years the data is kept.
The model cannot infer those numbers; it can infer what is derived from them (rows per year, size
in five years). That is why the prompt requires it to distinguish primary data from derived data,
and to **ask for the missing primary figures instead of estimating them**. When the model
estimates a primary figure, it does it with the same straight face as when it computes; and you
have no way to tell the difference by the tone. Not having done this in time cost me an entire
stage of re-engineering [Ref. 15](REFERENCIAS.md#ref-15).

There is also a kind of decision that is always worth taking: the **asymmetric** ones, cheap if
they turn out unnecessary and very expensive if they are missing. The canonical example is making
the interface with the database asynchronous from day one even if the first database is a file:
if you never change database, one `await` was superfluous; if you do change, you saved yourself
rewriting everything.

**The task.**

1. Sit down with the owner (or with yourself, if the project is yours) and write
   `docs/VOLUME_SURVEY.md`: the main entities (the ones in the semantic tree) and how many there
   are, how many are added per month, how many events per entity, how many people operate at the
   peak and when the peak is, how long the data is kept, whether there are exceptional loads,
   what growth they expect. For every number, write down where it comes from: "the practice
   manager said so", "counted in September's notebook", "assumption". Leave some at "assumption"
   on purpose: you are going to see what the agent does with them.
2. Paste it:

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

   You are asking it to: distinguish primary from derived; **ask you for the primary figures that
   are missing or at "assumption", and never estimate them**; compute what is derived with the
   arithmetic in view; the "times ten" scenario; three options with the cost of changing from one
   to another; and not to choose.

3. If it asks you for the "assumptions", good: that was the exercise. Get the numbers (ask the
   owner, count in the notebook) and give them to it. If it did not ask for them and computed
   anyway, stop and ask it what it did with the assumptions: it is a failure of the step and it is
   better to see it now.
4. Read the three options. Redo one calculation by hand (for example, rows per year of the
   largest table): it has to give you the same. Choose.
5. Close with:

> I choose option [B]. Record in `docs/SIZING.md`: the primary data with its source, the derived
> data with its arithmetic, the three options, the chosen one and why, and the decisions we are
> taking "just in case" even though they are not needed today (for example: the persistence
> interface is asynchronous from line one, even if the first engine is synchronous). Include the
> questions you asked and my answers.

**Completeness check.** Is there any primary figure with source "assumption" or with no source?
Does every derived figure show the arithmetic, and does it give you the same if you redo it? Are
there three options and one chosen with a reason? Does it say what happens "times ten"? Are the
asymmetric decisions written down? Did it ask you?

**Deliverable.** `docs/SIZING.md`.

**Typical mistakes.** Filling in the survey with numbers you invented so that the agent does not
ask (it is the same mistake as in lesson 0, and it is worse here because those numbers decide the
architecture). Choosing the "most powerful" option just in case: the cost of migrating is in the
table precisely so that you choose the smallest one that withstands the "times ten". And not
writing down the asymmetric decisions: if they are not written, in lesson 4 the agent is not
going to respect them.

**In the guide project.** Primary figures: 40 appointments/day × 250 days = 10,000
appointments/year; 3 messages per appointment = 30,000 messages/year; 5 years of retention; a
peak of two simultaneous receptionists. The "times ten" is the question of whether it is sold to
other practices: 100,000 appointments and 300,000 messages a year. The three typical options: a
SQLite file (enough for one practice for years, does not withstand the times ten with several
writers), PostgreSQL from the start (withstands everything, costs a bit more infrastructure), or
SQLite now with the asynchronous interface and a planned migration to PostgreSQL (the asymmetric
one). For the course we choose the third: it is the one that teaches the most.

### Lesson 4 — The skeleton with its gates

**What you need to understand.** Before the system does anything useful, it has to start up, be
tested and be deployed **empty**. It looks like a waste of time ("deploy what, if there is
nothing?") and it is the opposite: the path to production is part of the product, and the only
way to know it works is to walk it when there is still nothing to lose. In one of my systems the
deployment arrived a month after the start and cost five pending items in a row
[Ref. 32](REFERENCIAS.md#ref-32); with the skeleton deployed in the first week, those five blows
would have landed on an empty system.

This lesson is, moreover, **where all the infrastructure and the integration and deployment
chain** of the project get done. You are not going to touch it again until lesson 13, and in
between you are going to build all the functionality on top of it. That is why it takes up most
of week 1.

The **gates** are the conditions for moving from one stage to the next ("the test suite is
green", "the deployment to test worked"). Writing them now, even if they seem obvious, is what
later lets you say "this does not go through" without arguing.

**The task.**

1. Write `docs/ENVIRONMENTS_SURVEY.md`: where the system is going to run (a server you already
   have, a cloud service), whether there is going to be a test environment and a production one,
   who has access to what, and how it is deployed today if there is anything. If you have
   nothing, say so: the agent is going to propose the simplest option.
2. Make sure you have the credentials of the place where it is going to be deployed, even if it
   is a free service. Without that, the skeleton stays on your machine and the lesson cannot be
   finished.
3. Paste it:

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

   You are asking it to verify access before starting, for the exact list of what a skeleton is,
   the gates written down, a real screenshot of the test environment, and the prohibition on
   adding functionality.

4. This task is long (one or two hours of the agent's work) and it is going to have back and
   forth: missing credentials, a service that asks you to confirm your email, etc. That is
   normal. What is not normal is for it to tell you "done" without the screenshot of the test
   environment.
5. When it shows you the screenshot, open the URL yourself in your browser. It has to look the
   same. It is the first human look at the system, and it is a milestone.
6. Close with:

> Skeleton approved. Record in `docs/STATUS.md` the test environment URL, the command to run
> the tests and the command to deploy, and mark this step as done. Then run the deployment a
> second time and show me that the second run changed nothing.

**Completeness check.** Did you open the test environment URL yourself and see the empty screen?
Is there a link to a green continuous integration run? Was the deployment run twice and did the
second run break nothing? Does every gate have a verifiable condition? Is there any functionality
you did not ask for?

**Deliverable.** The repository with the skeleton, continuous integration green, the test
environment URL working, `docs/GATES.md`, and `docs/STATUS.md` with the three commands.

**Typical mistakes.** Accepting "it works locally, we'll look at the deployment later": no, the
deployment is the skeleton. Accepting a screenshot of the agent's machine instead of the test
environment. And letting it add "while it is at it" a login screen, a menu, a logo: every thing
that comes in without a pending item is scope that got away.

**In the guide project.** Turnera's skeleton is a web page that says "Turnera — version 0.0.1"
running on a public URL of a test environment, a server that answers "ok" on a health route, a
smoke test that calls that route, continuous integration running that test on every push, and
automatic deployment to the test environment. The gates: "suite green to merge", "test
environment green to promote to production", "rollback tested for the first deployment to
production". Nothing more. And it is strange how satisfying it is to see that empty page on a
real URL.

---

## The loop stretch: lessons 5 to 10

These six lessons are the ones you are going to use **with every change**, throughout the whole
project. They are learned in weeks 2 and 3 on the first two functional blocks, and practised
until the end. The idea is that by the end of the stretch you have the reflex: open a block by
turning the request into specified pending items, take one, build, prove red, run the end-to-end
test of the flow, update the other side, measure whatever has to be measured, report separating
what was verified from what is believed, document the closed pending item, and at the close of
the block use the system yourself. That reflex is the method.

To practise them you are going to need real functionality. In the guide project, the first block
is the basic schedule: see the day's appointments, book an appointment, cancel it. The second,
patients and search. No messages or payments yet; that comes after the locks (lesson 12).
### Lesson 5 — The plan is the pending items, and the detailed specification lives in each one

**What you need to understand.** There is no "plan" on one side and a "task list" on the other:
**the list of pending items is the plan**. But there are two more ideas, and they are the ones
that distinguish this method from any old task list.

The first: the **detailed specification lives in each pending item**. In the classical method
there was a requirements specification document, long, that aged before it was finished. Here it
is broken down: every pending item carries the node of the semantic tree it hangs from, the user
story or the use case that originates it in the client's words, the detailed description, the
applicable business rules with their decision and their date, the data that goes in and out, the
screens affected, the edge cases, the acceptance criteria in the form "given, when, then", and
how it is verified. Reading the specification of a pending item is the closest you are going to
get to reading code, and it is exactly the right distance: that is where you detect that the
agent understood something else, before it builds.

The second: **closed pending items are documentation**. When a pending item is closed, it stays
with its specification, the decision that originated it, the evidence with which it was closed,
the commit and the date. The queue of closed pending items is the functional history of the
system, and from there come the changelog and the new sections of the manual. And the golden rule
for the agent: whatever appears outside the list is written down as a new pending item, with its
specification, not done.

**The task.**

1. Write in `docs/INITIAL_SURVEY.md` (or in a separate file) the client's request for the first
   block of functionality, just as the client would say it, with its ambiguities. For Turnera: "I
   want to see the day's appointments, book a new one and cancel". If you wrote the use cases in
   the intake, paste them too: they are the natural unit of the block.
2. Paste it:

> We are going to turn everything that must be done in this block into numbered pending items,
> each one carrying its full specification. Read `PROJECT.md`, `docs/SEMANTIC_TREE.md`, the
> client's request for this block, and whatever is in `docs/STATUS.md`. If the request is
> ambiguous on any point such that you cannot write a verifiable pending item for it, ask me; do
> not resolve it by assuming. Then create or extend `docs/PENDING.md` with one item per thing to
> do, each with: number (PND-001 onwards); one-line title; the node of the semantic tree it hangs
> from; the user story or use case that originates it, in the client's words; the detailed
> description; the business rules that apply, each with its decision and date, or marked as
> "rule missing, asked"; the data in and out; the screens affected; the edge cases and
> exceptions; the acceptance criteria in the form "given, when, then"; how it will be verified
> as done; and status. If a node the item needs does not exist in the tree, propose it and mark
> it. Order the items by the priority I gave you; if I gave none, propose an order and tell me
> why. Reply in my language.

   You are asking it to turn the request into verifiable items, to **ask when the request is not
   enough to write a verifiable one**, for the complete specification of each one field by
   field, the node of the tree it hangs from, the business rules with their decision or marked as
   missing, the acceptance criteria that will later be the script of the test, and an order with
   its reason.

3. Answer the questions (for Turnera it is going to ask, for example, what "the day" is: today's,
   or any day that gets chosen?; does cancelling delete or mark?). Those questions are business
   decisions; in lesson 6 you are going to see where they get written.
4. **Read the specification of every pending item** as if you were the client. This is the most
   important task of the lesson, and the one that tempts you most to skip. Does it describe what
   you asked for, in your words? Are the acceptance criteria the ones you would use to say "that
   is right"? Is there an edge case you know of that is not there? Does it hang from the right
   node? Correct before anything gets built.
5. Add the routine of every session to the working agreement. Paste it:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before touching any code, open
> `docs/PENDING.md`, tell me which item you are taking and why, and re-read its specification.
> Every commit cites its pending item. A pending item is closed with written evidence (the test
> counts red and green, the screenshot, the measured number), never with 'done'. When you close
> it, keep it in the register with its full specification and add: the evidence, the commit, the
> date, and any decision that was taken along the way; that record is the documentation of what
> was built. If along the way you see something that is not on the list, add it as a new pending
> item with its specification; do not do it."

6. Now, yes, start building. Ask it to take the first pending item. From here on, every session
   starts with "which pending item are you taking and why", and every close leaves the pending
   item documented.

**Completeness check.** Read the specification of a pending item at random: does it have every
field, and does it describe what you asked for? Does every pending item hang from a node of the
tree that you recognise? Does each one say how it is verified? Are there rules marked "missing,
asked" that it did not ask you about? Are there closed pending items without evidence or commit?
Do the closed ones keep their specification and their closing documentation? Take three commits
at random: do they cite their pending item? Did anything show up in the code without a pending
item?

**Deliverable.** `docs/PENDING.md` with the first block specified, the routine in the agreement,
and the first pending item in progress.

**Typical mistakes.** Accepting one-line specifications: the agent wrote them to comply, and it
is going to invent what is missing at the moment of building. Not reading the specifications: it
is the only moment when you can catch a misunderstanding before it costs. Letting the agent close
pending items without evidence because "I already saw it working". Letting it close without
documenting: six months later nobody knows why the system does what it does. And the one that is
hardest to correct: letting it do "one little thing more" outside the list. The first time you
allow it, you lost the exact scope.

**In the guide project.** Turnera's first block is about six pending items, hanging from the
"Schedule" domain of the tree: PND-001 see the appointments of a day; PND-002 book an appointment
with patient, practitioner, date and time; PND-003 prevent two appointments of the same
practitioner at the same time; PND-004 cancel an appointment (mark, do not delete: a lesson 6
decision); PND-005 look up a patient by name or phone; PND-006 registering a patient with the
minimum data. The specification of PND-003, for example, says: node Schedule → process "book
appointment" → entity Appointment; story: "there cannot be two appointments of the same
practitioner at the same time, it happened to me twice with the notebook" (the practice manager's
words); rule: "double appointment only if the practitioner enabled it" (pending decision, asked);
data: practitioner, date, start time, duration; screen: booking form; edge cases: partially
overlapping appointments, appointments of different duration; acceptance criteria: "given an
appointment of Dr. A at 10:00, when I try to book another of Dr. A at 10:00, then the screen warns
and the database does not save it"; verification: end-to-end test of the form plus a database
query. That is a specification.

### Lesson 6 — Decisions are written next to the code

**What you need to understand.** The model, when it finds a gap in the business rules, **fills
it**. It does not stop to ask; it completes with what seems most likely to it, with the same
naturalness with which it writes everything else. That is why this lesson is not "write down the
decisions" but "require it to stop and ask when one is missing". And when you decide, the decision
is written with your exact words, your name and the date, in the commit, in the specification of
the pending item and in a register. I have done it since the first system
[Ref. 29](REFERENCIAS.md#ref-29); six weeks later, when someone asks "why does cancelling not
delete?", the answer is written and it is yours.

**The task.**

1. Add the decisions routine to the agreement. Paste it:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Whenever implementing something requires a
> business rule that is not written down, or you must choose between two approaches that change
> what the user sees, stop and ask me, in prose, with your recommendation and the alternative. Do
> not implement the one you prefer. When I decide, write the decision with my name and the date
> in the commit message, in the pending item's specification and in `docs/DECISIONS.md`, with
> the exact words I used. If I do not answer and you must move on, implement the most reversible
> option and mark it 'decision by omission, pending confirmation', so that I can review it."

   You are asking it to stop before an unwritten rule, to ask with a recommendation and an
   alternative (so that you can decide in ten seconds), to record your exact words in the three
   places, and, when you do not answer, to choose the most reversible option and mark it.

2. Keep building the pending items of the block. Every time it asks you a business rule, decide
   and answer with the closing format:

> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.

3. Do the opposite test, once, on purpose: leave a question unanswered for a session and watch
   what it does. It has to choose the most reversible option and mark it "by omission". If it
   chose what it felt like and did not mark it, it is a failure of the step: correct it in the
   agreement.

**Completeness check.** Open three commits that touch business rules: do they cite who decided
and when? Is the rule also in the specification of the pending item? Are there "by omission"
decisions left unconfirmed? Is there any rule in the system you do not recognise as yours? Are
the sentences exact or "improved"?

**Deliverable.** `docs/DECISIONS.md` growing, with at least five decisions from the first block,
and the commits and the pending items citing them.

**Typical mistakes.** Answering the questions in the chat and not requiring them to be written
down: by the third session nobody remembers. Letting the agent "improve" your words: a
paraphrased rule is a different rule. And the most serious one: discovering in production a rule
nobody decided. When it happens (it is going to happen), it is not a bug: it is a failure of step
6, and it is fixed in the agreement, not only in the code.

**In the guide project.** Typical decisions of Turnera's first block: "cancelling marks the
appointment as cancelled and records who and when; nothing is deleted"; "a practitioner cannot
have two appointments at the same time, but can have two patients in a double appointment if the
practitioner enabled it"; "the patient's phone number is mandatory; the email is not". Each one
with a date and with the practice manager's name, and each one pasted into the specification of
the pending item that needed it.

### Lesson 7 — Tests as locks, proved red, and the end-to-end tests

**What you need to understand.** This is the central lesson of the course. A test you never saw
fail, you do not know whether it proves anything. The model writes the code and the test in the
same session, with the same understanding: if it misunderstood the request, the test proves what
it understood, and it passes. The only cheap way to know that the test is looking at what matters
is **to see it red against the old code**: if the code from before the change also passes it, the
test does not distinguish before from after, and then it is useless. That is why the request is
not "write tests" but "show me the red, then the green, then the regression". The case that shows
it best is the one of the counters that did not match [Ref. 26](REFERENCIAS.md#ref-26).

And the second idea, which is as important as the first: the end-to-end tests. A test that
verifies from the screen (clicks, types, reads) and checks the effect in the backend (the row is
there, the state changed) is the one that replaces your reading of the code. The acceptance
criteria of the pending item ("given, when, then") are its script. And they are run **three
times, at three scales**: the flow touched, with every pending item; every flow that exists, at
the close of every block; and every flow with the exact version, before every deployment to
production. If you only do the third, you reach the end with a system nobody tested end to end
for weeks.

**The task.**

1. Add the evidence routine to the agreement. Paste it:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "To close a pending item I need evidence,
> not your word. (1) Write the test that proves what the item asks for, following its acceptance
> criteria. (2) Demonstrate that this test fails against the previous code: you may temporarily
> revert the change, or run the test against the old version, but show me the red output. (3)
> Show me the green output with the change. (4) Run the regression suite for the neighbouring
> items and show me it is still green. (5) Run the end-to-end test of the flow this item
> touches, from the screen to the backend, and show me the backend effect. (6) Do not replace
> with mocks the very part you are trying to test. If testing end to end requires something you
> lack (data, access, an environment), ask me for it; do not simulate what you do not have.
> Finally, the commit message says 'proved red against [what]' and the test counts."

   You are asking it for the test guided by the acceptance criteria, **the red demonstrated with
   the output in view**, the green, the regression of the neighbours, the end-to-end test of the
   flow with the effect in the backend, no mocking of exactly what is being tested, and asking
   for what is missing instead of simulating it.

2. Take the double-booking pending item (PND-003 in Turnera, or the equivalent in your project: a
   rule that prevents something). Ask it to close it with the routine. Read the report: there has
   to be a red output with numbers ("1 of 1 fails against the version without the rule"), then
   the green, and the end-to-end test: a browser driven by a program that opens the screen, tries
   to book the double booking, reads the warning, and checks in the database that it was not
   saved.
3. If it tells you it cannot test end to end because the screen cannot be driven by a program,
   stop: that is X2 failing, and it has to be fixed now (adding identifiers to the screen
   elements) before going on. Paste it:

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

4. **At the close of the block**, when the six pending items are closed, paste it the full suite
   prompt:

> Run the complete end-to-end suite of every flow that exists so far, in the test environment,
> with the exact version that will be promoted. Show me the counts, and for each flow the
> backend check that proves it. If any flow has no end-to-end test, say so and open a pending
> item for it; do not pass it as covered.

5. And after that, **use the system yourself**. Open the test environment and do what the
   receptionist would do: book an appointment, try the double booking, cancel, search. Whatever
   bothers you, whatever you do not understand, whatever is where it should not be: write it down
   as a pending item. This half hour finds what no test finds.

**Completeness check.** Does the report show the red, with numbers? Did the regression run in the
same session, with numbers? Does the end-to-end test also verify the backend? Is there any part
mocked exactly where the change is? Does the commit say "proved red"? At the close of the block:
are all the flows in the end-to-end suite? Did you use the system yourself and write down what you
found?

**Deliverable.** At least three pending items closed with the full routine (red, green,
regression, end to end), the full end-to-end suite of the block green, and the pending items
that came out of your human testing.

**Typical mistakes.** Accepting "the tests pass" without numbers and without red. Accepting that
the suite gets "sped up" by replacing the end-to-end tests with mocks. Letting a "cannot be
tested" go by without opening the pending item. And closing the block without using it yourself:
the human look is not delegated.

**In the guide project.** The red of the double booking looks like this: the agent temporarily
removes the rule, runs the test, and the output says the test failed because the second
appointment was saved. It puts the rule back, runs, green. Then the regression: the tests of
PND-001 and PND-002 are still green. And the end-to-end one: a browser driven by a program fills
in the form, presses "save", reads the message "that time slot is already taken", and a database
query confirms there is a single appointment at that time. At the close of the block, the
end-to-end suite walks the three flows that exist (see the day, book, cancel), and the practice
manager enters ten test appointments and discovers that the time is chosen with an awkward
drop-down menu. New pending item. When you see that report for the first time, you are going to
understand what the whole method is for.

### Lesson 8 — Producer/consumer symmetry, and the anti-pattern register

**What you need to understand.** When you change one end of the system (the server, the database,
a robot), the other end (the screen, a counter, a report) has to change in the same commit. If it
does not, they diverge, and the user sees one number on one side and a different one on the other
[Ref. 26](REFERENCIAS.md#ref-26). The principle that prevents it is simple to state and hard to
sustain: **every list has a single owner**. The possible states of an appointment, the columns of
a report, the reasons something is waiting: one single part (the producer) defines them and all
the others read them from there [Ref. 27](REFERENCIAS.md#ref-27). The semantic tree is the first
place where those lists are declared. As soon as there are two copies, one of them is out of date;
the only question is which.

The second half of the lesson is the anti-pattern register (GOTCHAS): the mistakes you have
already paid for once, written down with their smell, their root cause, their fix and how to
detect them earlier [Ref. 2](REFERENCIAS.md#ref-2). The important part is not writing them down:
it is adding the automatic check that detects them, because an anti-pattern that is recorded but
not automated repeats itself the moment the session changes.

**The task.**

1. Ask it for the contract map:

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

   You are asking it for the inventory of contracts with both of their sides, and for whatever it
   cannot see to be declared rather than left out.

2. Add the routine to the agreement:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before closing any change that touches a
> contract, look up every consumer in the map and update them in the same commit. Always prefer
> that the producer defines the list (columns, causes, states) and the consumer reads it, rather
> than each keeping its own copy. If the map does not have that relationship, add it."

3. Do the list test: pick a list that appears on the screen (in Turnera, the states of an
   appointment: pending, confirmed, cancelled, no-show) and ask the agent to show you where it is
   defined and where it is read. If there are two definitions, ask it to leave only one, and to
   make it match the semantic tree.
4. The first time something breaks for the second time (it will happen in the coming weeks), paste
   it this:

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

**Completeness check.** Pick a contract from the map: does every consumer read it from the
producer, or does it keep its own copy? Is there a number shown on two screens, and do they agree?
Do the states of the entities match between the code and the semantic tree? Does every GOTCHAS
entry have the four parts? Did anything that was already recorded happen again?

**Deliverable.** `docs/PRODUCER_CONSUMER_MAP.md`, the routine in the agreement, and
`docs/GOTCHAS.md` (even if it starts with a single entry).

**Typical mistakes.** Building the map once and never looking at it again: it has to grow with
every new contract. Recording anti-patterns as anecdotes ("once it happened that…") without the
"how to detect it earlier" part. And the classic: the same text of a state typed by hand on the
server and on the screen; the day one of them changes, the other stays behind.

**In the guide project.** Turnera's map has, at the start, four or five contracts: the list of
appointment states (the server defines it; the screen and the monthly report read it); the
appointments table (the booking form writes it; the day view and the report read it); the patients
table; and, later on, the message queue (the day view writes it; the sender reads it). The first
GOTCHA is usually about dates: the day view showed the appointment on the wrong day because the
server stored one time zone and the screen displayed another. Smell: "the 11 pm appointment shows
up tomorrow". Root cause: two time zones. Fix: a single one, on the server. Detection: a test with
an appointment at 11:30 pm.

### Lesson 9 — Measure before building, with an instrument that is itself verified

**What you need to understand.** The model produces claims with a number in them ("there are about
120 queries of that kind") and they sound exactly the same whether they were measured or estimated.
You cannot tell them apart by tone. The only way is to demand the instrument: "what did you measure
it with? show me the command". The rule of the step is that **no number that decides anything
comes from an impression**: it comes from a meter that lives in the repository, that has a test
checking it against a known case, and that you can run yourself.

And there is something more, which I learned the hard way and which is the reason I took so long
to formalise a rule I took for granted: meters lie too. In one of my systems, a meter read zero
because it did not see part of the code, and another said 27 when there were 44
[Ref. 35](REFERENCIAS.md#ref-35), [Ref. 36](REFERENCIAS.md#ref-36). Hence the audit in both
directions: from the code to the measurement (is everything that should be counted, counted?) and
from the measurement to the code (does everything counted actually exist?).

In a small project, "measuring" is modest: counting how many queries a screen runs when it loads,
how long the monthly report takes, how many messages were sent yesterday. You do not need a
ratchet or a budget per path. What you do need is a command behind the number.

**The task.**

1. Pick a hypothesis. In Turnera, a good one: "the day view runs one database query per
   appointment it shows" (the classic N+1 loop). If it turns out not to be true, even better: you
   will see how a false hypothesis gets verified.
2. Paste it this:

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

   You are asking it for the meter in the repository, the meter's test, to ask for what it lacks
   instead of approximating, to mark what is approximate, the number with its command, the audit
   in both directions, and the order: first measure, then propose.

3. Run the command it gave you, yourself. It has to give you the same number. You do not need to
   understand the script; you do need to execute it.
4. If the hypothesis was true and the agent proposes fixing it, ask it for a budget:

> Set the budget for [queries] on this path at the measured value plus a small margin, and
> protect it with a test that fails if it is exceeded. Tell me the number and the margin.

   That way, if someone puts the loop back in three months from now, the test suite catches it.

5. Add rule five to the agreement, for when a plan comes with numbers:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before executing a plan that asserts
> numbers, verify every number with the meter. If any does not match, stop and tell me; do not
> execute on a wrong number."

**Completeness check.** Did you run the meter and get the same number? Does it have a test, and
against which known case? Is there any number in the report without a meter behind it? Is what is
approximate marked? Is there a budget with a test?

**Deliverable.** A meter in the repository with its test, a number with its command and date in
`docs/STATUS.md` or in the pending item, and (if it applied) a budget protected by a test.

**Typical mistakes.** Accepting the number without running the command: half the value of this
lesson is in you running it. A meter that reads zero: it is almost never zero; it is almost always
failing to see something. And letting the agent "fix while it measures": the order is the method.

**In the guide project.** Turnera's meter is a script that loads a day with 10, 50 and 200
appointments into a test database, opens the day view for that day counting the queries, and
writes down the three numbers. The meter's test verifies that with 0 appointments it counts
exactly the baseline queries (say, 2). If there was a loop, the numbers are 12, 52 and 202; it gets
fixed, they become 3, 3 and 3, and the budget is set at 4 with a test that fails if the day view
runs more than 4 queries for any number of appointments.

### Lesson 10 — Honest verification and proportional reporting

**What you need to understand.** If you are not going to read code, the agent's report has to be
trustworthy, and that does not happen on its own. The model was trained to be helpful and
complete, and a report that says "I could not verify this" feels less helpful than one that says
"done". So you have to **explicitly ask it** for the bad news, the blind spots and what it did not
do. If you do not ask, it does not give them to you; not because it hides them, but because it
does not consider them part of the answer. I once had an authentication error reported to me with
the label "success" [Ref. 43](REFERENCIAS.md#ref-43).

The structure that makes a report honest is three blocks: **verified** (with the proof next to
it), **believed** (what it thinks works and why it did not test it), and **blind spots** (what it
cannot see from where it is). And one rule: bad news first.

**The task.**

1. Add the reporting routine to the agreement:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "When you report, separate three blocks:
> VERIFIED (what you tested, with the command and its output), BELIEVED (what you think works but
> did not test, and why not), and BLIND SPOTS (what you cannot see from where you are: another
> environment, real data, the user's browser). Cover every item I asked for, one by one, even when
> the answer is 'I did not do it'. No claim without its proof next to it. Do not say 'done': say
> what is done and how you know it. If something went wrong, say it first."

2. Ask it to close the next pending item and read the report against the checklist below. The
   first time, almost certainly, the "blind spots" block will be empty. Ask it: "what can you not
   see from where you are?". There has to be something (your browser, the production environment,
   the real data). If it insists there is nothing, you insist too.
3. Practise the "still broken". Ask it for something small, check in the test environment, and if
   for any reason you do not see the change (it is common: the deployment takes a while, or was
   not done), tell it "still broken" and paste it this:

> Before diagnosing again, compare the version running where I see the problem with the version
> that contains your fix. Tell me both. If they differ, the problem is publication, not code.

   Half of the "still broken" cases are fixes that are in the repository and not in the place you
   are looking at [Ref. 45](REFERENCIAS.md#ref-45). This clause saves you hours.

**Completeness check.** Are the three blocks there? Did you pick a "verified" claim at random,
does it have its proof next to it, and could you reproduce it? Does it cover every item you asked
for? Is the bad news at the top? Did it ever say a bare "done"?

**Deliverable.** The routine in the agreement and three consecutive reports with the three blocks,
one of them with a real blind spot.

**Typical mistakes.** Reading only the "verified" block and skipping the other two: the other two
are the ones that protect you. Accepting "it should work" inside "verified": that is "believed" in
disguise. And getting used to ever longer reports: an inflated report is covering something up
with volume.

**In the guide project.** A good closing report for PND-004 (cancel an appointment) in Turnera:
"VERIFIED: the cancellation test passes (1/1, proved red against the version that deleted);
regression 6/6; end-to-end of the 'cancel' flow green, with the row marked in the database; in
the test environment, appointment 17 of 3 November shows as cancelled by 'reception1' at 10:42
(screenshot). BELIEVED: the monthly report will count cancellations correctly, but I did not test
it because the report is PND-011 and does not exist yet. BLIND SPOTS: I cannot see how the
'cancelled' state looks on the receptionist's phone; test that yourself."

---

## The operation stretch: lessons 11 to 15

These five lessons are the ones that turn "it works" into "it can be sustained". They are done in
weeks 4 and 5, when the first two blocks have been built with the loop and tested by you in the
test environment, and before the system acts on the world (sends messages, charges money) or has
real users. In the guide project, this is the moment to add the reminders and the deposit, and
that is why lesson 12 (locks) comes before building those features, not after.

### Lesson 11 — The periodic audit as input to the plan

**What you need to understand.** Every so often you have to look at the whole system with fresh
eyes, and what is seen does not go into a report that gets filed: it goes into the list of pending
items. The important part is "fresh eyes": the one who audits must not be the one who built,
because they share their assumptions. A model that built a module "knows" that the password written
in the code was provisional; a model that sees it for the first time reports it for what it is.
That is how two administrator doors the builder had left in a single day were found
[Ref. 40](REFERENCIAS.md#ref-40). You do not need another company: **another session, with
another instructions file, that did not take part** is enough.

**The task.**

1. Open a new session of the agent on a clean copy of the repository (clone it into another
   folder). If your tool allows it, give it a different instructions file that only says "you are
   an auditor; you did not build this system". Give it read-only access to the test environment.
2. Paste it this:

> Audit this system for [integrity, security, performance and code quality]. Read-only: change
> nothing except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires
> access you lack (the database, the log, an environment), tell me and mark that part as not
> audited; do not pass it as fine. Go through all of the code, not a sample. For every finding:
> where it is (file and line), what the risk is, what evidence proves it (the command, the
> query, the number), and its priority: P0 must be fixed now, P1 soon, P2 when possible. Give a
> grade to every dimension you audited. End with the list of P0 findings turned into proposed
> pending items. Reply in my language.

   You are asking it for read-only, to declare what it could not audit instead of approving it by
   omission, all of the code and not a sample, every finding with location, risk, evidence and
   priority, grades per dimension, and the P0s already as proposed pending items.

3. Read the report. Pick two findings and ask the auditor to show you the evidence (the command,
   the line). It has to be able to.
4. Go back to the builder's session and paste it this:

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.

5. Repeat this lesson before the first deployment to production (lesson 13) and, afterwards,
   every one or two months.

**Completeness check.** Does the report say what it could NOT audit? Do two findings picked at
random have file, line and reproducible evidence? Does every P0 have its pending item open? Will
the grades be comparable with the next audit? Did a session other than the one that built do the
audit?

**Deliverable.** `docs/AUDIT_[date].md` and the P0/P1 pending items opened.

**Typical mistakes.** Auditing with the same session that built: it will confirm its own
assumptions. Accepting a report with no P0 at all on a system older than a month: it is almost
never true. And filing the report without opening the pending items: there the audit was good for
nothing.

**In the guide project.** Turnera's first audit usually finds: patient data in the log (phone
numbers printed when sending messages: P0); the patient search by name without an index (P1, it
will show at 5,000 patients); the appointment form not validating that the date is in the future
(P1); and some dependency with a known vulnerability (P1). Four new pending items, all with file
and line.

### Lesson 12 — Fail-closed, locks and zero silent harm

**What you need to understand.** Software, by default, goes ahead when in doubt: if the validation
fails, the code continues; if the service does not respond, everything is assumed to be fine. It is
"fail-open", like a door that opens when the power goes out. The method inverts the default: **when
in doubt, no**. Every consequential action (charging, sending, deleting, approving) carries a lock,
has a written way back, and every new automation starts in dry-run mode, logging what it would have
done, until you enable it. The locks I put in my first system are the model
[Ref. 28](REFERENCIAS.md#ref-28).

This lesson comes **before** building the features that act on the world. In Turnera, before the
reminders and the deposit, which are the third block.

**The task.**

1. Write `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` with the owner: what the system does or will do
   that charges, sends, approves, deletes or notifies someone outside; what happens if it is done
   twice; what happens if it is done wrong; how it is undone. The processes of the semantic tree
   give you the starting list.
2. Paste it this:

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock. Reply in my language.

   You are asking it to compare what the business said with what the code does (that is where the
   actions nobody remembered show up), to ask about the differences, and for every action its
   reversibility, its lock and its way back, with the fail-closed rule written down.

3. Confirm lock by lock. Close with:

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.

4. Now open the third block (the reminders, the deposit) with lesson 5, build it with the full loop
   of lessons 5 to 10, and leave it in dry-run mode. Watch the "would have sent" log for a few days
   before enabling real sending.

**Completeness check.** Is every action that charges, sends, approves or deletes in the table?
Does every lock have its red test? Does every irreversible action have a written way back? Did the
new automations start in dry-run mode, and did you see the log before enabling them?

**Deliverable.** `docs/LOCKS.md`, one test per lock proved red, and the automations in dry-run
mode with their log.

**Typical mistakes.** Enabling real sending "to test with a message to my own phone": dry-run mode
exists precisely for that. A lock that can be bypassed with a "for testing" parameter: that
parameter will end up set in production. And not looking at the "would have done" log: it is the
only window to see a mistake before it reaches a patient.

**In the guide project.** Turnera's lock table: send reminder (not reversible; lock: idempotency
per appointment, a single send per appointment and channel, limit of 200 per day, dry-run mode
first; way back: none, hence the limit); charge deposit (reversible with a refund; lock: explicit
confirmation by the receptionist, amount set by the practitioner; way back: refund through the
payment provider); cancel appointment (irreversible for the patient; lock: confirmation and a
record of who did it; way back: recreate the appointment); delete patient (irreversible; lock:
double confirmation, only the practice manager, and only if there are no future appointments; way
back: none, hence double). Each lock with a test that shows that, without the lock, the action
happened.

### Lesson 13 — Continuous integration, environments, secrets and deployment as part of the product

**What you need to understand.** Reaching production has to be a reproducible package: the tests
run **once**, the deployment only packages and uploads, the configuration lives on the server and
not in the repository, there is a procedure to promote from test to production that can be run
twice, and the rollback is **tested** (a rollback that was never tested does not exist). Tests run
three times per commit burned through my continuous integration quota
[Ref. 39](REFERENCIAS.md#ref-39). About secrets, a rule with no exceptions: **a secret that was
seen in a chat, in a log or in a commit is no longer a secret**; it gets rotated, full stop
[Ref. 42](REFERENCIAS.md#ref-42).

You already have a good part of this from the skeleton (lesson 4): continuous integration and the
deployment to test. This lesson completes it towards production.

**The task.**

1. Complete `docs/ENVIRONMENTS_SURVEY.md` with what is missing for production: the domain, where
   the secrets are going to live, how much continuous integration quota you have (if you use GitHub
   Actions, check the limit of your plan).
2. Paste it this:

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

   You are asking it for the access before starting, the tests once per commit, the deployment
   that only packages, the configuration outside, the repeatable promotion, the tested rollback,
   the lock against secrets, and the documentation for a person.

3. Before the first deployment to production, do the audit of lesson 11 if you have not done it,
   and run the complete end-to-end suite of every flow with the exact version you are going to
   promote (the block-closing prompt of lesson 7).
4. Add the deployment routine to the agreement:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before touching production: the test
> environment is green with the same version; the rollback is ready; and tell me what changes in
> the configuration. After deploying: show me the version running in production and an
> end-to-end check on production, read-only."

5. Do the first deployment to production, with the system still without real users. And then
   **test the rollback**: ask it to go back to the previous version and show you that it is
   running, and then to go back to the new one.
6. If at any point in the course you pasted a secret into the chat (an API key, a password),
   paste it this:

> That secret is compromised: rotate it now, tell me everywhere else it was used, and add the
> check that would have caught it.

**Completeness check.** How many times does the test suite run per commit? (once; ask for the
link). Is there any real configuration value in the repository? (ask it for the empty search).
Could you follow `docs/DEPLOYMENT.md` on your own? Was the rollback tested, when, with what
evidence? Was every secret that showed up in the chat rotated? Do you know how much continuous
integration quota you have left?

**Deliverable.** Continuous integration once per commit, the deployment that only packages,
`docs/DEPLOYMENT.md`, the tested rollback, the anti-secrets lock active, and the system running in
production (without users yet).

**Typical mistakes.** The deployment "by hand, quickly, because it is a small change": small
changes break production because nobody tests them. The example configuration file with values
that look real (they are). And not testing the rollback until the day you need it.

**In the guide project.** For Turnera, continuous integration runs the test suite (about 30 tests
at this point, including the six end-to-end flows) on every push; the deployment to test is
automatic on merging into `main`; the promotion to production is a command that packages the
version that is in test and uploads it, with the configuration (the messaging provider's key, the
payment provider's key, the database URL) in an environment file on the server that is not in the
repository. The rollback is the same command with the previous version. And the anti-secrets lock
is a check on every commit that rejects anything that looks like a key.

### Lesson 14 — Living documentation and manuals a person can follow without AI

**What you need to understand.** The system has to be usable, maintainable and recoverable without
the agent and without you. The criterion for the recovery manual is concrete: **a trusted person
who does not program has to be able to follow it, at three in the morning, with the system down and
the agent offline**. If a step says "check with the developer", it is incomplete. And since
regenerating documentation with a model is free, the rule becomes "in the same commit": every
change that touches what the user sees, what the operator does or how it is deployed updates the
manual in the same commit. The manuals I wrote for my first system with that criterion are the
model [Ref. 24](REFERENCIAS.md#ref-24).

And a source you already have: the closed pending items. If you documented every closure as
lesson 5 asks, the user manual is not written from scratch: it is assembled from the pending items
that were closed, block by block, and the changelog comes straight out of them.

**The task.**

1. Add the routine to the agreement:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Every change that modifies what the user
> sees, what the operator does, or how the system is deployed, updates the corresponding manual
> in the same commit. At the close of every functional block, add to the user manual the screens
> and flows of the pending items closed in that block, with real screenshots from the test
> environment, and add their entries to the changelog. If you do not know which manual, ask."

2. Paste it this:

> Generate three manuals from the system as it is today in the test environment: the user
> manual (screen by screen, with real screenshots, in the user's language, no jargon); the
> maintenance manual (how it is built, where everything is, how to run the test suite, how to
> add a module); and the infrastructure and recovery manual (how to deploy, how to roll back,
> how to restore a backup, what to do if it goes down; written for a person who has to do it by
> hand, without AI, at three in the morning). If for any section you need something only the
> business knows (who is responsible for what, which phone number to call), ask me; do not leave
> a gap and do not invent. Each manual carries a date and the system version. Reply in my
> language.

   You are asking it for the three manuals with real screenshots, the three-in-the-morning
   criterion for the recovery manual, to ask what only the business knows instead of leaving gaps,
   and a date and version.

3. The real test: give the recovery manual to someone who does not program (the owner, a
   relative) and ask them to follow the "it went down" section in the test environment. Wherever
   they get stuck, the manual has to be fixed.
4. After the next screen change, check that the commit touched the user manual.
5. And now the **acceptance testing**: the owner uses the whole system in the test environment,
   with realistic data, following the six flows, before the first real user comes in. Whatever they
   find becomes pending items; with those closed, the system is accepted.

**Completeness check.** Does a screenshot picked at random match today's test environment? Could
someone who does not program follow the "it went down" section? Did the last commit that changed
a screen touch the manual? Does the changelog have one entry per closed pending item? Are there
gaps like "[to be completed]"? Does every manual say which version it is valid for? Did the owner
do the acceptance testing on every flow?

**Deliverable.** The three manuals with date and version, the test with a person done, and the
acceptance testing closed.

**Typical mistakes.** Generating the manuals once and not putting the routine in the agreement:
two months later they have screenshots of screens that no longer exist. A recovery manual that
starts with "open a session with the agent". And not doing the test with a person: it is the only
check that counts.

**In the guide project.** Turnera's user manual has six screens with screenshots, assembled from
the closed pending items of the three blocks; the maintenance manual explains where every module
is and how to run the test suite; and the recovery manual says, in order, with the commands: how
to tell whether the system is down, how to restart it, how to go back to the previous version, how
to restore the database from the latest backup (which is made every night: that also comes out of
this lesson), and whom to call. The practice manager followed it in the test environment and got
stuck at "restore the database" because the command assumed a folder she did not have; the manual
was fixed.

### Lesson 15 — The agent inside the system, and the retrospective with numbers

**What you need to understand.** Two things close the cycle. The first is optional: leaving the
agent resident in production, with a bounded scope, to diagnose and give support without you being
there [Ref. 13](REFERENCIAS.md#ref-13). The rule that orders it is that **it acts on behalf of
someone**: its credential is mapped to a responsible person, and everything it does is logged under
that person's name; it is not an anonymous account, it is an employee with a boss. The second is
mandatory: the retrospective with numbers. What it cost, how many pending items, which ones went
round in circles, which incidents there were and which step they fall into, and **at least one
proposed change to the ladder**. A retrospective that changes nothing was not a retrospective; the
one that led me to eliminate an entire team of agents is the model [Ref. 6](REFERENCIAS.md#ref-6).

**The task (resident agent, if applicable).**

1. Decide with the owner whether the system needs a resident agent. In Turnera it does: the
   receptionists will have questions ("why did this patient not get the reminder?") that the agent
   can answer by reading the log, without anyone calling the developer.
2. Paste it this:

> We are going to leave you resident in production. First, build the map of the system you will
> need in order to operate it: modules, environments, where each configuration lives, which
> actions are consequential (read `docs/LOCKS.md`), whom to notify. If there are parts of the
> system you cannot see from where you are, tell me; the map must not have hidden gaps. Then
> propose your scope in three levels: read-only and diagnosis; configuration changes with my
> approval; consequential actions behind locks. I choose the level. Your credential acts as the
> person who created it: everything you do is logged under that person's name. Reply in my
> language.

   You are asking it for the map before operating, for the gaps in the map to be declared, three
   levels of scope so that you pick one, and the credential in a person's name.

3. Pick the level (to begin with, always the first: read-only and diagnosis). Close with:

> Level [1: read-only and diagnosis]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the
> credential (never its value), and the procedure to request my approval. Then prove, with a real
> attempt recorded in the log, that something outside your scope is rejected.

**The task (retrospective, always).**

4. Gather the numbers only you have: how many hours you put in, how much you spent on the AI tool,
   how much continuous integration quota you used.
5. Paste it this:

> [The project] is over. Do the retrospective with numbers, not impressions: what it cost
> (tokens, quota, my time), how many pending items, which ones took the most rounds and why,
> which incidents happened and which step of the ladder each falls into, and which step failed
> or was missing. If you lack the data for any figure (my time, for instance), ask me for it or
> mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder:
> which step is modified, how, and which incident justifies it. Write it to
> `docs/RETROSPECTIVE_[date].md`. Reply in my language.

   You are asking it for numbers with a source, every incident mapped to a step (an incident that
   falls into none is a missing step), to ask you for the numbers it does not have, and a concrete
   proposal to change the ladder.

6. Read the proposed change. If it seems valid to you, send it to the
   [Urazuke repository](https://github.com/pkuschnirof/urazuke) as an improvement proposal (see
   `CONTRIBUTING.md`): that is how the method learns from every project.

**Completeness check.** Does the map say what the agent can NOT see? Did you see in the log that
an action outside the scope is rejected? Does the credential act on behalf of a person? Does the
retrospective have numbers with a source, or adjectives? Does every incident fall into a step? Is
there at least one concrete proposed change?

**Deliverable.** `docs/RESIDENT_AGENT.md` (if applicable) and `docs/RETROSPECTIVE_[date].md`.

**Typical mistakes.** Giving the resident agent a high level "so it can solve everything": start
with read-only and raise it when there is evidence. A retrospective that says everything went
well: nothing ever goes entirely well; it is written for you, not for the method. And not sending
the proposed change: step 15 closes when the ladder changes, not when the document gets written.

**In the guide project.** Turnera's retrospective, in a typical course: six weeks, about forty
hours of the student's time, twenty-eight pending items, the ones that went round the most were
the messaging ones (time zones and the WhatsApp provider); two incidents, one in step 8 (the
"no-show" state existed on the screen and not on the server, nor in the semantic tree) and another
in step 13 (a deployment to production with the test configuration, caught by the end-to-end check
after the deployment). Proposed change: that the deployment routine of step 13 require showing the
configuration difference between test and production before promoting, not just "what changes".

---

## The go-live checklist

When the sixteen lessons are done, the system meets this list. It is the operational definition of
"production grade" in Urazuke, and it can be used as the final checklist, with the owner, without
opening the code:

1. There is an eligibility sheet with a decision, date and name (S0).
2. There is a working agreement the agent reads in every session, and it was proved that it reads
   it (S1, S2).
3. The project file can be read in five minutes and says what the system is NOT; there is a
   semantic tree confirmed by the owner, and every pending item hangs from a node (S2).
4. There is a sizing with primary data with its source, derived data with its arithmetic, and the
   "times ten" scenario (S3).
5. The skeleton was deployed empty in the first week, with the integration and deployment chain,
   and the deployment was run twice (S4).
6. Every change has its pending item with a detailed specification, and every closed pending item
   keeps its specification and its evidence: it is the documentation of what was done (S5).
7. Every business rule has an owner, a date and the exact words, in the commit, in the pending
   item and in the register (S6).
8. Every important test was seen red before green; every flow has its end-to-end test that
   verifies the backend from the screen; the full suite was run at the close of every block and
   before production (S7).
9. Every list has a single owner; there is a producer/consumer map; there is an anti-pattern
   register with automatic checks (S8).
10. Every number that decided something has a meter with a test that you can run (S9).
11. Every report separates verified, believed and blind spots (S10).
12. There was at least one audit by a different session, and its P0s are pending items (S11).
13. Every consequential action has a lock with a red test and a way back; the automations went
    through dry-run mode (S12).
14. The tests run once per commit; the configuration is outside the repository; the rollback was
    tested; no secret lives in the repository or in the chat without being rotated (S13).
15. There are three manuals with date and version, assembled from the closed pending items; a
    person who does not program followed the recovery one; the owner did the acceptance testing on
    every flow (S14).
16. There is a retrospective with numbers and a proposed change to the ladder (S15).

If all sixteen say "yes", the system is ready to go live. If any says "no", you already know which
step to climb again.

---

## Annex A — How to assess (for whoever teaches the course or self-assesses)

A simple rubric, per lesson, with three levels:

- **Not climbed**: the deliverable is missing, or some completeness check says "no".
- **Climbed**: the deliverable exists and every check says "yes".
- **Climbed with evidence of judgement**: in addition, the student can tell of a case in which the
  agent did something wrong in that lesson (assumed, invented, over-reported) and how they caught
  it. That is the real goal of the course: not the artefact, but the reflex.

What is not assessed: the quality of the code. Nobody reads it. What is assessed is the quality of
the evidence.

## Annex B — Adapting the course to each tool

The prompts are the same in any tool. What changes is where the routines that the course adds to
`docs/WORKING_AGREEMENT.md` go:

- In **Claude Code**, the routines go in the project's `CLAUDE.md` (or the agreement is included
  from there), and they are read on their own in every session.
- In **Cursor**, they go in `.cursor/rules/`, as always-active rules.
- In **Codex CLI** or **Gemini CLI**, in `AGENTS.md` or `GEMINI.md` at the root.
- In **Forge**, the agreement and the routines are doctrines, the step prompts are injected on
  their own when each gate is crossed, the pending-items register is native and the semantic tree
  is the project's knowledge graph. The course with Forge is the same course with less copying and
  pasting.

The reading test of lesson 2 holds for all of them: if a new session does not know what the system
does NOT do, the tool is not loading the file where you put the agreement.

## Annex C — What this manual does not have yet

- A cohort that has taken it. The calendar's timings, the typical mistakes and the guide project
  are written from my three systems, not from students. The first cohort will correct them (and
  that is, literally, step 15 applied to the course).
- The weights of the eligibility criteria (lesson 0), which I am calibrating.
- A complete example of the guide project's `docs/PENDING.md`, with the twenty-eight pending items
  specified and closed, so that a student can see what the documentation of what was done looks
  like at the end of a project.
