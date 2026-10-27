# Step 19 — Performance tests at volume and the breaking point (step contract)

**Stretch:** going live.
**When:** in the go-live phase, after step 16 (without observability you do not know what broke)
and after step 17 (on an already optimized persistence layer), and before the first deployment to
production. It is repeated before every deployment that changes the architecture, the persistence
layer or a critical flow, and when the sizing changes (it is sold to another client, the volume
doubles). In a legacy system, it is run with the volumes measured in N6, before the first
deployment after the normalization.
**Form:** one shot; the agent loads, measures and breaks; you read the numbers and the breaking
point.
**Size:** proportional: in a small project, one run at the expected volume and one at "times
ten"; in one with consequences, complete, with the breaking point found and the thresholds
recorded for the monitoring.

## What it is for

Step 3 sized the system with calculations; this step checks the calculations with the real system
running. I want to know three things before the first user comes in: how the system behaves at
the volume the business stated (does the most used screen respond within what the owner would
tolerate?), how it behaves at "times ten" (does it hold, or what stops holding first?), and
**where it breaks**: the exact load at which something gives way, and what that something is (the
database connections, the memory, a queue, a lock). The breaking point is the most useful number
of the whole stretch, because the alert thresholds of step 21 come out of it: an alert set "by
eye" warns too late or warns always; an alert set below the measured breaking point, with a
margin, warns while there is still time. The scale patterns I took from a system in production
[Ref. 12](../REFERENCIAS.md#ref-12) and the test suite that was dying by memory and looked like a
failed test [Ref. 44](../REFERENCIAS.md#ref-44) are the two antecedents: the first, about measuring
the real load; the second, about a breaking point not found in time disguising itself as
something else.

**If you are a beginner.** A *load test* is a program that simulates many users using the system
at the same time, to see what happens. *Throughput* is how many actions per second it holds.
*Latency* is how long an action takes to respond; you look at the *median* (half of the actions
took less than this) and the *95th percentile* (95 % took less than this; the remaining 5 % are
the users who complain). The *breaking point* is the amount of load at which something stops
working: not "it gets slow" but "the database connections ran out" or "the memory filled up". And
a *threshold* is a limit number above which the monitoring warns.

## 1. Required context

What follows is the generic list. The concrete files you have to have made before each prompt,
with their content and their minimum state, are in section 2, in the "Before sending the prompt"
block that precedes each one.

- The sizing (step 3 or N6): the expected volume and the "times ten".
- The observability (16) switched on, to see what breaks.
- The optimized persistence layer (17) with its budgets.
- A test environment similar to production in resources, or the awareness of how it differs.
- The critical flows (the ones in the semantic tree, or the ones in the characterization in a
  legacy system).

## 2. Prompts

**Opening (load, measure, break):**

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- `docs/SIZING.md` with the expected volume (concurrent users at the peak, events per hour, rows
  per table) and the "times ten": those are the two load steps.
- The list of critical flows for the prompt's slot, written by you from the semantic tree: the
  ones that are used most and the ones that have consequences. Between three and six.
- A test environment with resources comparable to production, or, if that is not possible, noted
  in `docs/ENVIRONMENTS_SURVEY.md` how it differs (half the memory, another engine), so that the
  numbers are read with that correction.
- Data at the expected volume in the test environment (the same script as step 17).
- Your tolerance, with the owner: how long the most used screen may take for the business to
  consider it acceptable (two seconds, five). Without that number, the results cannot be judged.
- Minimum acceptable state: you know the two load steps, the critical flows and the tolerance.

> We are going to find out how this system behaves at the volumes of `docs/SIZING.md`, and where
> it breaks. In the test environment, with the observability of step 16 on and the data loaded at
> the expected volume: (1) write a load script that lives in the repository and drives the
> critical flows [list] from the screen or the API as users would, with a configurable number of
> concurrent users and duration, and with a test that proves the script really exercises each
> flow (the backend effect appears); (2) run it at the expected volume and show me, per flow:
> throughput, median and 95th percentile latency, error rate, and the resource usage of the
> server and the database during the run; (3) run it at ten times the expected volume and show me
> the same; (4) raise the load step by step until something breaks, and tell me exactly what
> broke first (database connections, memory, a queue, a lock, the disk) and at which load: that
> is the breaking point; (5) compare every number with the budgets of `docs/PERSISTENCE.md`, with
> the tolerance I gave you ([tolerance] for the most used screen) and with the sizing assumptions,
> and tell me which assumption was wrong, if any. Do not optimize anything yet. Write
> `docs/PERFORMANCE_[date].md` with the numbers, the commands, the breaking point and your
> diagnosis of the first bottleneck.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

What I am asking for: a load script that is one more meter (it lives in the repository and has a
test, because a load script that does not exercise the flow measures thin air); three runs
(expected, times ten, until it breaks); the numbers with their commands; the comparison with the
budgets, the business's tolerance and the sizing assumptions, which is where you discover that
step 3 got something wrong; and **no optimizing yet**, because optimizing without reading the
diagnosis is changing what was not the problem.

**Closing (thresholds and pending items):**

**Before sending the prompt**, you have to have this at hand:

- `docs/PERFORMANCE_[date].md` read by you, with the business's tolerance alongside: does the most
  used screen fit within the tolerable at the expected volume? And at "times ten"?
- With the owner, the decision about the "times ten": if the business plans to grow, the
  bottlenecks below the "times ten" are pending items now; if not, they can wait, with a date.
- Minimum acceptable state: you read the breaking point and decided which bottlenecks get fixed
  now.

> Record in `docs/PERFORMANCE.md`: the expected volume, the ten-times volume, the breaking point
> with what breaks, and the alert thresholds that monitoring (step 21) will use, set below the
> breaking point with a margin and above the expected volume. Open a pending item for each
> bottleneck that sits below [ten times the expected volume / the volume I decided], with the
> measured number as its acceptance criterion. Make the load test a gate in `docs/GATES.md`: it
> reruns before every deployment that changes the architecture, the persistence or a critical
> flow, and its results are archived with date and version. Show me the first run archived.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

What I am asking for: the alert thresholds derived from the breaking point, which is the hook into
step 21; the bottlenecks as pending items with the number as the criterion (that way they are
closed with evidence and not with "it runs better now"); and the load test as an archived gate, so
that in six months you can compare.

## 3. Expected result

- The load script in the repository, with a test.
- `docs/PERFORMANCE_[date].md` with the three runs, the numbers, the breaking point and the
  diagnosis; `docs/PERFORMANCE.md` with the thresholds and the gate.
- One pending item per bottleneck below the volume decided.
- The load test as a gate before the deployments that require it.

## 4. Completeness check

- Does the most used screen, at the expected volume, take less than the owner's tolerance? If not,
  there is a pending item open with that number.
- Does the breaking point say what broke and at which load, or does it say "the system got slow"?
- Are the thresholds of `docs/PERFORMANCE.md` below the breaking point and above the expected
  volume?
- Run the script yourself at the expected volume with the command it gave you: do the numbers look
  similar?
- Does the test environment differ from production in resources, and is it written down how?

## 5. Warning signs

- "It holds the times ten with no problem" without a breaking point. If it did not find where it
  breaks, it did not raise the load enough.
- The load script hits the API but does not go through the screen, in a system where the screen is
  what loads. It measures something else.
- The results come from a run on the agent's machine, not on the test environment.
- Bottlenecks were fixed during the test, "while we were at it". Now you do not know which number
  corresponds to which version.
