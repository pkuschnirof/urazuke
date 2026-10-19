# Urazuke — the junior developer in the era after hand-written programming: what changes in their training, with what objective to train them, and how

Author: Pablo Kuschniroff, assisted by Claude Code. Version 1, 18 October 2026. This document
accompanies the [main document](ESCALERA_METODOLOGICA.md) of the method and the two parts of the
course ([new project](MANUAL_CURSO.md), [inherited project](MANUAL_CURSO_EVOLUTIVO.md)). It is
written for three readers: the one who runs a team and has to decide what to teach the people who
come in; the one who teaches or mentors; and the junior themselves, who wants to know what to
become. The odd words are in the glossary of the main document. Public repository:
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## Why I am writing this

For thirty years, a junior developer was trained in a single way: by writing code under
supervision. They came in half knowing a language, they were given small, bounded tasks, a senior
reviewed their code, and in two or three years of writing and being corrected they learned the
trade. The code was both the work and the school.

That is over, and not because juniors are no longer needed, but because **the model writes the
code**. With my method, the one who builds does not read the code: they demand evidence. So the
question I am asked, and that I ask myself, is honest and urgent: if the junior no longer writes
the code, how do they learn? And what do they learn? And in order to become what?

I have an answer, and I write it from two places. One, the three systems I built this way, in
which I was the only human and where I saw, incident by incident, which skills saved me and which
ones I never needed. The other, the years of teaching systems engineering before the models
existed: much of what has to be taught to a junior today is what classical systems engineering
always taught and the industry stopped practising when the trade became "programming". The model
forces us to go back to what the trade was before the keyboard covered it up.

A warning so as not to be misread: I am not saying that the junior does not have to know how to
program. I am saying that **they are no longer trained by programming**, and that what they have
to know about programming changes in nature: from trade to literacy.

## What a junior used to do, and what they do now

| | Before | Now, with the method |
|---|---|---|
| **What they produce** | Code, under supervision. | Evidence: contracts, semantic trees, specified pending items, completeness checks, written decisions. The code is produced by the model. |
| **How they learn** | By writing and receiving corrections on the code. | By directing the model step by step and receiving corrections on the evidence they demanded and the evidence they accepted without demanding. |
| **What the senior reviews** | Their code. | Their judgement: what they asked the model for, what the model assumed without them detecting it, what they accepted as "done" without proof. |
| **What their typical mistake is** | A bug. | Believing the model. |
| **When they are useful** | When they write code that does not have to be rewritten, and that takes time. | When they finish their first small project with the twenty-four steps: the method does not promise speed, it promises an operable system and a formed judgement. |
| **What they become** | A programmer who knows more languages and frameworks. | Someone who can answer for a system without having written a line of it: a systems engineer who directs models. |

## The impact on the focuses of training

I will say it first in one sentence and then take it apart: **what loses weight is everything the
model does better than a junior of two years, and what gains weight is everything the model does
badly and the method exists to correct**. I did not invent that second list: it is the list of the
model's failures in the references document, looked at the other way round. Every failure of the
model is a skill the human has to have.

### The focuses that lose weight

- **Syntax and languages.** Knowing a language "by heart" was half of the training. Not any more:
  the model writes in any of them, better and faster. What remains is knowing how to *read* them,
  which is another thing (see below).
- **Frameworks and libraries.** Knowing a library's API was market value. The model knows it
  whole, with its versions. The junior has to know that they exist, what they are for and when to
  choose one, not what each function is called.
- **Typing and writing productivity.** Editor shortcuts, autocompletion, generating the scaffolding
  by hand. It has disappeared as a focus.
- **Line-by-line debugging as the main trade.** It still exists, but it changes place: now it is
  the last tool, when the evidence (the log, the test in red, the meter) was not enough.
- **The memory of "how such and such is done".** Patterns, recipes, tricks. The model has them
  all.

### The focuses that gain weight

I order them by the step where they are exercised, because that is the way to teach them.

1. **Requirements engineering** (steps 0, 2, 3, 5). Interviewing an owner who does not know what
   they want, writing in prose what they want, naming use cases, building the semantic tree of
   the business, specifying a pending item with its acceptance criteria in the "given, when,
   then" form, distinguishing a primary datum from a derived one and asking for the primary one
   instead of estimating it. It is skill number one, and it is the one the industry stopped
   teaching twenty years ago. The model is terrible at this by design: it fills the gaps with the
   most probable thing, and the most probable thing is not what the business needs.
2. **Design of the verification** (steps 8, 7, 12, 19). Not writing the test: knowing which test
   proves what, why a test has to be seen in red before it is worth anything, what an end-to-end
   test is and what is a simulation that proves nothing, which number decides something and with
   which instrument it is measured, how a report is read and the verified is told apart from the
   believed. The junior has to be able to say "that test does not prove what you say" without
   reading the test.
3. **Reading evidence** (every step). Reading a report from the model with trained distrust:
   finding the claim without proof, the "it should work" disguised as verified, the undeclared
   blind spot, the "done" that was not [Ref. 43](REFERENCIAS.md#ref-43). This skill did not exist
   as a focus of training because there was nobody who lied with such confidence and such good
   prose.
4. **Sizing and operation** (steps 3, 4, 15, 16 to 22). What an environment is, how something is
   deployed, what continuous integration is, what is measured in production, what an index is, a
   breaking point, an alert threshold. It used to be another role's territory; now the junior
   directs the model that does it, and has to know what to ask for and how to verify that it was
   done.
5. **Security and consequence** (steps 14, 18). Which actions of the system act on the world, what
   a lock is, what fail-closed is, what a vulnerability is and why a dependency upgrade is a
   change.
6. **Decision and communication with the owner** (steps 1, 6, 20). Asking well, with a
   recommendation and an alternative; writing a decision with exact words, a date and an owner;
   writing a manual that a person who does not program can follow. In the method, the junior is
   the translator between the owner and the model, and the translation goes both ways.
7. **Instrumental English.** The prompts of the method are in English, because models follow
   instructions with more precision in English. You do not need to speak it; you need to read a
   prompt and understand every clause, and to be able to write a new clause when the case calls
   for it.
8. **The catalogue of the model's failures.** Recognising, by their smell, every way the model
   gets it wrong: it assumes instead of asking, it invents a primary datum, it over-reports, it
   does the "while I am at it" outside the scope, it refactors what was not asked for, it
   improves your words, it closes without evidence, it goes quiet when it does not know. The four
   corrections I made in session that turned into rules [Ref. 45](REFERENCIAS.md#ref-45) are the
   example: each one is a failure that a trained junior has to detect in the first report.
9. **Cost as a budget.** Tokens, continuous integration quota, the owner's time. The junior who
   does not look at the cost repeats the multi-agent crew that spent twice as much and delivered
   half [Ref. 6](REFERENCIAS.md#ref-6).

### What the junior does have to know about programming: literacy, not trade

Here is the nuance that matters most to me, and the one most often misread. A junior who never
wrote code does not know when the model lies *in* the code, and the method has a moment, which
today I mark as a hypothesis in the main document, at which the human does have to look. That is
why the minimum literacy is not negotiable. The list:

- **Reading code**, not writing it: following a function, understanding a conditional,
  recognising a loop, seeing where a query to the database is made. Like reading a contract
  without being a lawyer.
- **How a system runs**: what a server is, a process, a database, an HTTP request, a browser, a
  scheduled job. Where each thing lives.
- **Git**: what a commit is, a branch, a push, a history. Enough to read the trail of evidence
  that the method leaves there.
- **Basic SQL**: reading a query and understanding which table it reads and with which filter. It
  is the language of the data, and of the numbers of step 7.
- **The terminal**: running a command the model gave you and reading its output. If the junior
  cannot run the meter, they cannot verify the number.
- **Debugging as the last tool**: when the log, the test and the meter were not enough, opening
  the code with the model alongside and reading it together.

It is taught in the first stage, it is practised throughout the course, and it is not the
trade: it is the literacy that makes it possible to practise it.

## With what objective to train a junior

I will say it bluntly, because everything else depends on the clarity of the objective. The
objective of training a junior in the era after hand-written programming is to form somebody who
**can answer for a system in production without having written a line of its code**: who can take
a small project through the twenty-four steps end to end, directing a model, demanding evidence at
every step, deciding with the owner, and knowing at all times what is verified, what is believed
and what is not visible. I call it, provisionally, the *technical owner of the evidence*: the one
who does not read the code and can nevertheless say, with proof in hand, that the system does
what the business asked for and is going to keep doing it tomorrow.

Three consequences of the objective, which order the training:

1. **The artefact of evaluation is the evidence, not the code.** A junior is evaluated by the
   agreement they wrote, the tree they built, the pending item they specified, the red they
   demanded, the report they did not accept. The rubric of annex A of the course manual already
   says it: not climbed, climbed, climbed with evidence of judgement. That third level, being able
   to tell of a case in which the model got it wrong and how they detected it, is the real
   objective.
2. **The reflex is formed with incidents, not with theory.** Nobody learns to distrust the model
   by reading that one should distrust it; they learn when the model says "done" and it was not,
   and they discover it in the test environment. That is why the course has deliberate tests
   (leaving a question unanswered and seeing what the model does; leaving assumptions in the
   survey), and that is why the training has to have designed incidents, not only tasks that turn
   out well.
3. **The junior is trained in the whole method, not in one stretch.** The temptation is to put
   them "to do pending items" in the loop, which is the closest thing to giving them small code
   tasks. It is a mistake: the loop without the start-up is building on sand, and the junior who
   never did a step 0 or a step 3 does not understand why step 5 has the shape it has. The two
   guide projects exist for that: one new and one inherited, end to end, the twenty-four steps and
   the eight stations.

## How to train them: the plan

What follows is the plan I would use, and that I am going to use with the first cohort: four
stages, with no deadlines (the method does not have them, and neither does the training: each
stage ends when its exit list says "yes"), with a mentor, on the two guide projects of the
course, and afterwards a small real project with a real owner.

### Stage 1: literacy, and the model as an object of study

- The literacy listed above: reading code, how a system runs, git, basic SQL, the terminal. With
  the model alongside, explaining; the junior does not write, they read and run.
- **The model as an object of study**: a stretch of making requests to the model with the sole
  purpose of watching it fail. Asking it for a datum it does not have and seeing whether it
  invents it. Giving it an ambiguous request and seeing whether it asks. Asking it to close
  something and seeing whether it says "done" without proof. Asking it to fix a bug without
  reproducing it. Every failure is written down with its smell. At the end of the stage the junior
  has their own catalogue, and it is the catalogue of the references document, discovered.
- Reading of the main document, with the glossary at hand, and of the references: the story of
  where each rule comes from.

### Stage 2: the new project, with a mentor

Part 1 of the course manual, exactly as it is, on the guide project "Turnera" or on a small
project of their own. The twenty-four steps. With three mentoring rules:

- **The mentor reviews evidence, not code.** They read the working agreement, the semantic tree,
  the specification of three pending items, the closing report of a pending item, the audit
  report, the load test report. And they ask a single question each time: "how do you know this
  is true?". If the answer is "because the model said so", the step is not climbed.
- **The mentor designs incidents.** Every so often, without warning, they alter something: they
  change a datum of the survey, they slip an assumption into the volume data, they ask for a
  change outside the scope through the model. The junior has to detect it through the evidence.
- **The junior keeps their own register of the model's failures**: every time they caught it,
  what smell it had, in which step. At the end of the project that register is their personal
  retrospective, and the proposal to change the ladder (step 23) is written by them.

### Stage 3: the inherited project, with less mentoring

Part 2 of the manual: the inherited Turnera, or a small real legacy system. The normalization
stretch and the first two blocks. Here the mentoring goes down: the mentor reads the recovered map
and the discrepancies, the audit report with its speed marks, and the closing of the first bug in
corrective mode. The objective of this stage is for the junior to learn what the new project does
not teach: to read somebody else's system through the model, to decide with the owner what of what
the code does is wrong and what was a forgotten rule, and not to rewrite.

### Stage 4: the real project, alone

A small real project, with a real owner who has fifteen minutes a day, end to end. The mentor does
not intervene; they read the retrospective with numbers at the end. If the junior reaches
production with the twenty-four conditions of the go-live checklist at "yes", they are trained. If
not, the list says exactly which step to climb again, and that is training too.

### What measures progress

Not how many pending items they closed. Three things, in this order:

1. **How many times they caught the model**, and in which step. A junior who in the whole new
   project has not caught the model even once is not looking: the model always fails.
2. **How much it cost the owner.** Minutes a day of questions; if they go up, the junior is
   passing on to the owner what the method asks them to resolve themselves (step 1).
3. **The quality of their proposal to change the ladder.** It is the indicator of judgement: a
   junior who proposes a concrete change, justified with an incident of their own, understood the
   method as something alive and not as a list.

## The impact on the roles and on the team

I say this because whoever runs a team is going to ask me. If the junior is trained this way, the
team changes shape:

- **The junior** stops being "the one who writes the easy parts" and becomes the one who takes a
  whole small project with the method. They are more valuable sooner, and they are more dangerous
  sooner, because they direct a model that builds fast; that is why the method is the condition,
  not an add-on.
- **The senior** stops reviewing code and moves to three things: writing and maintaining the
  contracts (the working agreement, the gates, the locks), auditing with another session (step 13)
  and deciding what the junior cannot decide (architecture, the "times ten", what blocks). Their
  value moves from the keyboard to the judgement, which is where it always was in the good ones.
- **The team shrinks and flattens.** One senior and two or three juniors with the method carry
  what an eight-person team used to carry. I saw it in my own numbers when I eliminated a whole
  crew of agents [Ref. 6](REFERENCIAS.md#ref-6): the same logic applies to the humans who direct
  models.
- **The owner of the domain joins the team.** With fifteen minutes a day, but they join, because
  the method requires it. Training a junior includes teaching them how to get those fifteen
  minutes and how not to waste them.

## The risks, said without softening

- **The junior who never wrote code and does not know when to look.** It is the main risk, and I
  mitigate it with the mandatory literacy and with the exercise of debugging as the last tool. But
  I mark it as a hypothesis: I still do not know how much code one has to have written in order to
  read well the code somebody else writes. I suspect it is little, and I suspect that what matters
  is not having written but having *debugged*.
- **Dependence on one tool.** The method is tool-neutral on purpose. A junior trained in a single
  tool learns its shortcuts and not the method; the training has to go through at least two.
- **The invisible cost.** A junior with a model spends tokens as if they were free. The token
  budget has to be part of the training from the first stage, with the number in plain sight.
- **The illusion of speed.** The model builds in one session what used to take far longer, and
  the junior may believe they have finished. The go-live checklist, with its twenty-four
  conditions, is
  the antidote: "finished" has a definition, and it is not "it works".
- **The mentor who reviews code out of habit.** It is the risk on the senior's side, and it is
  serious: a mentor who reads the code teaches the junior that the evidence is not enough, which is
  exactly the opposite of the method. The mentor has to be trained in the method before the junior
  is.

## What is still to be worked out `[hypothesis]`

1. How much programming one has to have done in order to read somebody else's code well. My
   intuition is that what matters is having debugged, not having written, and that a little is
   enough. No data yet.
2. The four-stage plan is written from my projects and from what I taught before the models, not
   from a cohort. The first one is going to correct it, just as it will correct the course.
3. Whether the "technical owner of the evidence" is a new role or the systems engineer of always
   with another tool. I lean towards the second, and then the name is superfluous; but the market
   is going to need a name, and I prefer to propose one before it proposes a worse one.
4. What happens to the junior who joins a team that does not use the method. This document assumes
   that the team adopts it; if not, the junior trained this way is going to collide with a senior
   who asks them for code. I have no answer, except that the method is published so that that
   senior can read it.
