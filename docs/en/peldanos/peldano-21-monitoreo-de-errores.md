# Step 21 — Error monitoring and cyclic report: no error without a pending item (step contract)

**Stretch:** operational quality, after the first deployment to production.
**When:** it is set up in the operation phase, in the same week as the first deployment, together
with step 20, on the log records of step 16; from then on it runs on its own, with alerts at the
moment and a cyclic report that is read with the owner. Every new error enters the loop as a
corrective pending item and is closed with the test that reproduces it in red. In a legacy
system, the first reading is the baseline: the errors that already existed on the first day turn
into pending items with their speed mark, and none is left as "known" without a pending item that
says why it is tolerated and until when.
**Form:** one shot to set it up; afterwards, a cyclic routine.
**Size:** mandatory in every project with users: the centralized capture and the report are not
negotiable; the alerts at the moment, proportional.

## What it is for

A system in production produces errors no user reports: the one who saw a blank screen and tried
again, the one from the nightly job that failed and nobody looks at, the one from the external
call that returned an error and the code swallowed. If I do not capture them, they do not exist
until they exist too much. This step is the counterpart of step 20: that one watches performance,
this one watches errors, and both end up in the same place, the loop, as corrective pending
items. The underlying rules are two. **No error without a pending item**: a new error opens one,
and it is closed with the test that reproduces it in red, as the corrective mode of the evolutive
path demands. And **there is no such thing as a "known error"** without a pending item that says
why it is tolerated and until when; "that error was always there" is the sentence with which a
system rots. The authentication error reported as a success
[Ref. 43](../REFERENCIAS.md#ref-43) and the four rounds to the root cause
[Ref. 22](../REFERENCIAS.md#ref-22) are the two antecedents: the first, about errors hiding if they
are not captured by machine; the second, about an error without a reproduction being fixed
several times.

**If you are a beginner.** An *error* is anything the system tried to do and could not: a screen
that did not load, a nightly job that was cut short, a call to another service that failed. An
*unhandled exception* is an error the code did not foresee and that cuts short what it was doing.
To *capture* an error is to store it with all its data (when, in which version, with which
identifier, the *stack*, which is the list of the program's steps up to the failure) in a single
central place, instead of letting it get lost on a user's screen. To *group* is to join the
thousand times the same error happened into a single entry with a counter. And the *error rate
per flow* is, out of every hundred times somebody booked an appointment, how many failed.

## 1. Required context

What follows is the generic list. The concrete files you have to have made before each prompt,
with their content and their minimum state, are in section 2, in the "Before sending the prompt"
block that precedes each one.

- The observability (16): the errors arrive with a correlation id, a version and an actor.
- The table of locks (12): the errors in consequential actions are an immediate alert.
- Production deployed (13), with the user's browser included in the capture.
- The alert channel and the report cycle, shared with step 20.

## 2. Prompts

**Opening (set up and demonstrate):**

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- `docs/OBSERVABILITY.md` (16) closed: the errors have to come out with an identifier, a version,
  an environment and an actor.
- `docs/LOCKS.md` (12): the list of consequential actions, whose errors are an alert at the
  moment.
- The channel and the report cycle, the same as step 20, decided with the owner; and the number
  of occurrences per hour of a known error above which you want an alert, for the prompt's slot.
- Where the errors are stored and for how long (the same place as the log records, or an error
  capture service), decided by you, with the rule that they contain no personal data.
- Minimum acceptable state: the errors already come out with an identifier (16) and there is a
  channel with a person who reads it.

> We are going to make sure that no error in production goes unseen. Using the records of step 16,
> set up: (1) centralized capture of every error and unhandled exception in the backend, in the
> jobs and in the user's browser, with the correlation id, the version, the environment, the
> actor (never personal data) and the stack; (2) grouping of errors by cause, so that one defect
> is one entry, with its count, first and last occurrence, versions affected and the flows it
> touches; (3) alerts to [channel] for every new error type, for a known error that crosses [N]
> occurrences per hour, and for any error inside a consequential action of `docs/LOCKS.md`; (4) a
> cyclic report, [weekly], generated automatically, with: new errors, recurring errors and their
> trend, the errors fixed in the period with their pending item, the error rate per flow against
> the previous period, and what you propose for each open one; (5) the rule that every new error
> type opens a corrective pending item, closed with the test that reproduces it in red, and that
> there is no "known error" without a pending item that says why it is tolerated and until when.
> Show me one error provoked on purpose in the test environment, in the browser, followed by its
> id to the backend record, the alert and the report. Document it in `docs/MONITORING.md`. Reply
> in my language.

What I am asking for: the capture in the three places where errors hide (backend, jobs, browser),
with the identifier of step 16 so that they can be followed; the grouping, without which the
report is a list of ten thousand lines; the three alerts that matter (new, recurring and growing,
with consequences); the report with the rate per flow, which is the number the owner understands;
the two rules; and the end-to-end demonstration, from the browser to the report.

**Routine for every cycle (goes in the working agreement):**

**Before sending the prompt**, you have to have this at hand:

- The cyclic error report just generated, read by you.
- `docs/PENDING.md` at hand, to verify that the recurring ones have a pending item.
- Minimum acceptable state: you read the report before pasting the prompt.

> With every cyclic error report: go through it with me; open the corrective pending items for
> the new errors, each with the way to reproduce it; confirm that every recurring error has a
> pending item or a written reason with a date; and tell me which errors disappeared and why,
> with the commit that fixed each one. An error that disappeared without a fix is not solved: it
> is hiding, and it stays in the report until its cause is known.

What I am asking for: the discipline of the cycle, and the rule of the error that disappears,
which is the most counter-intuitive and the most valuable: an error that went away on its own
comes back on its own.

## 3. Expected result

- Centralized capture of errors in the backend, the jobs and the browser, grouped by cause,
  without personal data.
- Alerts for a new error, for a recurring one that grows, and for one with consequences.
- The cyclic report with the error rate per flow.
- `docs/MONITORING.md` complete (together with step 20); the routine in the agreement.
- One pending item for every open error; none "known" without a pending item.

## 4. Completeness check

- Provoke an error yourself in the browser in the test environment (an action you know fails):
  did it appear in the capture with your identifier, and did the alert reach you?
- Read the last report: is there any recurring error with no pending item and no reason?
- Take a "fixed" error from the report: does the pending item have the test that reproduced it in
  red?
- Is the error rate per flow there, and did it go down or up against the previous period?
- Search for a piece of personal data in the error capture: it must not be there.

## 5. Warning signs

- Zero errors in production during a month with real users. There is no such system; the capture
  is not seeing the browser or the jobs.
- An error with a thousand occurrences and a comment saying "known, no impact". No pending item,
  no date.
- The errors get "fixed" by restarting the service. They disappear and they come back.
- The error report and the resources report are read by different people and nobody cross-reads
  them: the slow query of step 20 is the cause of the timeout of step 21.
