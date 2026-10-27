# Step 16 — Total observability and traceability, with a configurable level (step contract)

**Stretch:** going live.
**When:** in the go-live phase, after step 15 (there is already a deployment chain and
configuration per environment) and before the performance tests (19), because without
observability the performance tests do not say what broke. In a legacy system, the minimum level
(structured log records with a configurable level and a correlation id) goes into the safety belt
(N4); the complete level, here. The rule that "every new module logs and propagates" applies
throughout operation.
**Form:** one shot; the agent builds it and demonstrates it; you read one real trace.
**Size:** mandatory at its minimum level in every project that is going to have users; complete in
any project with consequences.

## What it is for

When something fails in production, and it will, I want to be able to follow an action from the
screen to the database and to every external call, with a single identifier, without opening the
code and without asking the agent to "have a look". And I want to be able to raise the level of
detail of the log records in production, in a minute, without redeploying, and lower it
afterwards. That is observability: seeing what the system does. And the second thing is
traceability: that every consequential action (charged, sent, deleted, approved) leaves a trace of
who, when, what, from where and with which outcome, in a record the application cannot edit.
Without this, the resident agent of step 23 operates blind, the monitoring of steps 21 and 22 has
nothing to feed on, and every incident is diagnosed with hypotheses instead of with evidence. The
orphan turn that stayed alive for an hour and forty-three minutes was found through the log, not
through the code [Ref. 16](../REFERENCIAS.md#ref-16); and the resident agent started, precisely, by
reading logs [Ref. 13](../REFERENCIAS.md#ref-13).

"Configurable level" is the clause that distinguishes this from "putting in logs": the level
(error, warning, info, debug, trace) is changed by configuration on the server, per environment,
without touching code and without deploying, and production runs at info except when something is
being investigated.

**If you are a beginner.** A *log record* is a line the system writes every time it does
something: "10:42:13, scheduling module, user reception1, appointment 17 cancelled".
*Structured* means that every line has the same parts in the same order, so that they can be
searched by machine. The *level* is how much detail is written: at "error", only what failed; at
"trace", every step. The *correlation id* is a unique number given to each action when it starts
(you pressed "cancel") and that travels attached to everything that action provokes (the query to
the database, the message to the patient), so that afterwards you search for that number and the
complete story appears. And the *audit trail* is a list, which cannot be edited, of the important
actions: who did what and when.

## 1. Required context

What follows is the generic list. The concrete files you have to have made before each prompt,
with their content and their minimum state, are in section 2, in the "Before sending the prompt"
block that precedes each one.

- The deployment chain and the configuration per environment (step 15): the level is configured
  there.
- The table of locks (step 14): every consequential action is an entry of the audit trail.
- The initial survey with the personal data marked: the log records cannot contain them.
- Where the log records and the metrics are going to live (a rotated file, a service): you decide.

## 2. Prompts

**Opening:**

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- `docs/DEPLOYMENT.md` (step 15) with the way the configuration per environment is read: the log
  level is going to be one more variable of that configuration.
- `docs/LOCKS.md` (step 14): the list of consequential actions is the list of what has to end up
  in the audit trail.
- In `docs/INITIAL_SURVEY.md`, the list of which data are personal (names, phone numbers, emails,
  identity documents, diagnoses), written by you with the owner: it is what the log records have
  to mask. It is a legal obligation, not a preference.
- Your decision about where the log records and the metrics live: a rotated file on the server is
  enough for a small project; a log service, for one with consequences. And how long they are
  kept.
- Minimum acceptable state: you know which data are personal and where the log records are going
  to live.

> We are going to make this system observable and traceable, end to end, with a level that I can
> change without redeploying. Read `PROJECT.md`, `docs/SEMANTIC_TREE.md`, `docs/DEPLOYMENT.md` and
> `docs/LOCKS.md`. Evaluate whether you have what is needed (where the logs and metrics will live,
> how configuration is read per environment, which external services are called); if anything is
> missing, ask me. Then set up: (1) structured logging, one record per event, with timestamp,
> level, module, correlation id and actor, with the level configurable per environment at runtime
> (error, warning, info, debug, trace) without a redeploy, and a default of info in production;
> (2) a correlation id created at the entry of every request, job and message, propagated through
> every call and written in every record, so that one id follows an action from the screen to the
> backend, to the database and to every external call; (3) traceability of every consequential
> action in `docs/LOCKS.md`: who, when, what, from where, with which input and which outcome, in
> an audit record the application cannot edit; (4) health and metrics endpoints or files
> (requests, latency, errors, queue sizes, resource usage) that the monitoring of steps 21 and 22
> will read; (5) masking of every personal field listed in `docs/INITIAL_SURVEY.md`, so that no
> log record contains personal data. Show me one real request followed by its id through every
> layer, and show me the level changing in the test environment without a redeploy. Document the
> levels, where to change them and where the records live in `docs/OBSERVABILITY.md`. Reply in my
> language.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

What I am asking for: the five pieces, and two demonstrations that are the evidence of the step:
**one real identifier followed through every layer** (if it cannot show that, the propagation is
broken somewhere) and **the level changing without deploying** (if you have to deploy, it is not
configurable). The audit trail of consequential actions has to be immutable from the application,
because a trace the application can delete is not a trace. And the masking of personal data goes
in the same prompt because the log records are the place where most personal data leaks without
anybody deciding it.

**Routine (goes in the working agreement):**

**Before sending the prompt**, you have to have this at hand:

- `docs/OBSERVABILITY.md` read by you: do you understand how to raise the level and where to read
  a record?
- `docs/WORKING_AGREEMENT.md`, where the routine goes.
- Minimum acceptable state: you raised and lowered the level yourself, once, in the test
  environment.

> Every new module, job or integration writes structured log records with the correlation id and
> the actor at the level that corresponds, masks personal data, propagates the id to every call it
> makes, and records every consequential action in the audit trail. A pending item that adds one
> of those is not closed without showing one real id followed end to end through the new code.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

What I am asking for: that the observability does not degrade with every new module, which is what
always happens if it is not a rule: the module of month three logs nothing and it is exactly the
one that fails.

## 3. Expected result

- Structured log records with a level configurable per environment, changed without deploying.
- A correlation id in every record, propagated from the screen to the database and to the external
  calls.
- An immutable audit record of the consequential actions.
- Health and metrics endpoints or files, documented.
- No personal data in the log records.
- `docs/OBSERVABILITY.md` and the routine in the agreement.

## 4. Completeness check (you do it, without reading code)

- Ask it for the identifier of a real request and search for it yourself in the log records: does
  it appear on the screen, in the backend, in the database and in the external call, if there was
  one?
- Raise the level to debug in the test environment, do an action, look at the records, lower it.
  Did you have to deploy? Then the step is not climbed.
- Search for a test name or phone number in the log records: it must not be there.
- Do a consequential action in the test environment (cancel, send to the fake inbox): did it end
  up in the audit trail with who, when, what and outcome?
- Is `docs/OBSERVABILITY.md` enough for you to find a record on your own at three in the morning?

## 5. Warning signs

- The agent shows "logs" but each module writes in a different format. It is not structured;
  nobody is going to be able to search them.
- The identifier appears in the backend but not in the external calls or in the scheduled jobs.
  Those are exactly the places where incidents get lost.
- The production level was left at debug "for now". The disk fills up and data leaks.
- The audit trail of consequential actions lives in the same table as the rest of the data and the
  application can delete it.
