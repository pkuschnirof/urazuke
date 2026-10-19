# Step 20 — Monitoring of resources, functions and queries out of range, with a cyclic report (step contract)

**Stretch:** operational quality, after the first deployment to production.
**When:** it is set up in the operation phase, in the same week as the first deployment to
production, with the thresholds of step 19 and the metrics of step 16; from then on it runs on
its own, and the cyclic report is read with the owner every cycle (weekly in a system with
consequences, monthly in a small one). Every out-of-range event enters the loop as a corrective
pending item. In a legacy system, the same, with one difference: the first reading of the report
is the baseline, and whatever was already out of range on the first day turns into pending items
with their speed mark.
**Form:** one shot to set it up; afterwards, a cyclic routine.
**Size:** minimum in a small project (one monthly report, one disk alert and one database error
alert); complete in one with consequences (thresholds per function and per query, alerts, weekly
report).

## What it is for

The tests of step 19 say how the system behaves on one day, with a load I chose. Production is
every day, with the load the users choose, with the data growing, and with changes coming in
every week. What was in range in October goes out of range in March without anybody changing
anything, just because the table grew. This step exists so that this is seen **before the user
sees it**: resource usage against capacity, the response time of every function, every endpoint,
every job and every query, compared with the thresholds of step 19 and with its own history; an
alert when something goes out of range; and a cyclic report that I read with the owner, where
every deviation has a cause or a pending item. The ceiling tightened to the measured value
[Ref. 37](../REFERENCIAS.md#ref-37) is the underlying idea: the range is not an opinion, it is the
measured number plus a margin; and the continuous integration quota that was burned without
anybody looking [Ref. 39](../REFERENCIAS.md#ref-39) is the failure it prevents: a resource that is
consumed without monitoring is discovered when it runs out.

Two rules I do not negotiate. An alert that fires and nobody reads is a defect of the alert, not
of whoever did not read it: it gets adjusted or removed. And a threshold is not raised to silence
an alert without a measured reason written down.

**If you are a beginner.** To *monitor* is to watch the system all the time by machine and warn
when something goes outside the normal. The *resources* are what the system consumes: processor,
memory, disk, database connections, and also the quotas of external services (how many messages
per month your provider lets you send). "*Out of range*" means above a *threshold* (a fixed
limit, which came out of the tests of step 19) or very different from the *baseline* (what that
same number had been giving over the last few days). An *alert* is the warning at the moment; the
*cyclic report* is the summary that is read calmly every week or every month.

## 1. Required context

What follows is the generic list. The concrete files you have to have made before each prompt,
with their content and their minimum state, are in section 2, in the "Before sending the prompt"
block that precedes each one.

- The observability (16): the metrics and the log records it feeds on.
- The thresholds of step 19 and the budgets of step 17.
- Production deployed (13), with read-only access for the monitoring.
- The alert channel and the report cycle: you decide them with the owner.

## 2. Prompts

**Opening (set up and demonstrate):**

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- `docs/OBSERVABILITY.md` (16) and `docs/PERFORMANCE.md` (19) closed: the metrics and the
  thresholds.
- `docs/PERSISTENCE.md` (17) with the budgets per path.
- The alert channel, decided with the owner: who it reaches, through what (email, messaging), and
  who reads it at what time. An alert that arrives in a mailbox nobody opens is decoration.
- The report cycle: weekly or monthly, and who reads it with you.
- Read-only access for the monitoring to production (the server, the database, the log records),
  with the credential outside the chat.
- The percentage of deviation from the baseline that you consider an alarm (for example, 30 % more
  than the average of the last fourteen days), for the prompt's slot.
- Minimum acceptable state: there are written thresholds, a channel with a person who reads it,
  and a cycle.

> We are going to keep this system watched in production. Using the metrics and logs of step 16,
> the budgets of `docs/PERSISTENCE.md` and the thresholds of `docs/PERFORMANCE.md`, set up: (1)
> collection of resource usage (CPU, memory, disk, database connections, queue sizes, external
> quotas) and of the response time of every function, endpoint, job and query, with the
> correlation id, kept with a history; (2) alerts when any of them is out of range: above the
> thresholds, or more than [X] percent over the baseline of the last [N] days, sent to [channel],
> with the rule that an alert that fires without a human reading it is a defect of the alert and
> gets fixed or removed; (3) a cyclic report, [weekly], generated automatically, with: resource
> usage against capacity and its trend, the slowest functions and queries and how they moved
> against the previous period, every out-of-range event with its cause if known, and what you
> propose for each; (4) the rule that every out-of-range event becomes a corrective pending item
> with the measured number as its acceptance criterion, closed with the full routine. Nothing
> here may read or store personal data. Show me the first report generated on real data from the
> test environment, and one alert fired on purpose by exceeding a threshold. Document the
> thresholds, the channel, the cycle and how to silence an alert with a written reason in
> `docs/MONITORING.md`. Reply in my language.

What I am asking for: collection with history (without history there is no baseline, and without a
baseline there is no "out of range"); alerts against two references, the absolute threshold of
step 19 and the relative deviation from its own history; the cyclic report with the shape of a
report of step 10 (every deviation with a cause or a proposal, no "everything normal"); the
conversion of every deviation into a pending item with a number; and the two demonstrations: the
first report and a provoked alert.

**Routine for every cycle (goes in the working agreement):**

**Before sending the prompt**, you have to have this at hand:

- The cyclic report just generated, and half an hour of yours with the owner to read it.
- `docs/MONITORING.md` at hand, to compare the thresholds.
- Minimum acceptable state: you read the report before pasting the prompt; the agent does not read
  it for you.

> With every cyclic report of resources and performance: go through it with me, event by event;
> tell me which out-of-range events become pending items now and which can wait, with your
> reason; write the decision with the date in the report itself; and tell me whether any threshold
> must change and why, with the measurement that justifies it. Never raise a threshold to silence
> an alert without a measured reason written down.

What I am asking for: that the report be read and decided on, with a trace; and the threshold
rule, which is the one that keeps the monitoring from going silent little by little.

## 3. Expected result

- Collection of resources and response times with history, without personal data.
- Alerts by threshold and by deviation, to a channel a person reads.
- The cyclic report, generated on its own, with every deviation given a cause or a proposal.
- `docs/MONITORING.md` with thresholds, channel, cycle and how to silence with a reason.
- The routine in the agreement; the deviations as corrective pending items.

## 4. Completeness check

- Ask for a threshold to be exceeded on purpose in the test environment: did the alert reach you,
  through the agreed channel, with the identifier?
- Read the last report: does every out-of-range event have a cause or a proposal? Did any end up
  with nothing?
- Is there a pending item for every deviation you decided to attend to, with the number as the
  criterion?
- Did any threshold go up since step 19? With what written reason?
- Does the report mention the quota of the external services (messaging, continuous integration)?

## 5. Warning signs

- The alerts fire every day and nobody reads them. Their number has to come down until each one
  means something, not get used to.
- The report says "everything normal" three cycles in a row. Either the system has no users, or
  the report is not looking at what matters.
- A threshold went up "so that it stops warning". That is step 20 dying in silence.
- The monitoring stores personal data "so we can diagnose". That is a leak on a schedule.
