# Step 17 — Optimization of the persistence layer, measured before and after (step contract)

**Stretch:** operational quality, before the first deployment to production.
**When:** in the go-live phase, after step 16 (you need to see the queries in order to measure
them) and before step 19 (the performance tests are run on an already optimized persistence
layer; otherwise they measure the problem that was already known). It is repeated when a block
adds a large table or changes a critical flow, and when the monitoring (20) shows a query out of
range. In a legacy system, the measurements come out of N6 and most of what is found is paid
"when touched", except what is already out of range.
**Form:** two shots: measure and propose; apply with before and after.
**Size:** proportional: in a small project, the indexes of the real queries and the end of the N+1
loops; in one with consequences, complete, with budgets per path.

## What it is for

The persistence layer is where systems die slowly: they work well with a hundred records,
acceptably with ten thousand, and at a hundred thousand every screen takes twenty seconds, and
nobody knows when it started. This step exists so that this gets decided with numbers and before
production, not with complaints and afterwards. And so that it gets decided **with the method of
step 9**: every query the system makes is counted and timed with a meter that has a test, what the
numbers say gets changed, and it is measured again on the same data. The first audit of queries
without an index on a live system [Ref. 18](../REFERENCIAS.md#ref-18) and the query budget tightened
to the measured value [Ref. 37](../REFERENCIAS.md#ref-37) are the origin of this step; the decision
of the asynchronous interface from line one [Ref. 15](../REFERENCIAS.md#ref-15), its antecedent at
the start.

What it is not: it is not "rewriting the data access layer", nor choosing another engine. Step 3
decided that. It is adjusting what is there (indexes, pagination, batching, retention, pool size)
on the basis of what the real queries do.

**If you are a beginner.** The *persistence layer* is the part of the system that stores and
reads the data, almost always a database. An *index* is like the index of a book: without it, to
find an appointment the database reads the whole table (that is a *full scan*); with it, it goes
straight there. An *N+1 loop* is a very common mistake: to show a hundred appointments, the system
makes one query for the list and then a hundred more queries, one per appointment, instead of just
one. *Pagination* is showing twenty at a time instead of everything at once. *Retention* is how
long each piece of data is kept before archiving or deleting it. And the *connection pool* is the
number of "open lines" the system has with the database at the same time. None of this requires
you to read code: it requires you to look at numbers before and after.

## 1. Required context

What follows is the generic list. The concrete files you have to have made before each prompt,
with their content and their minimum state, are in section 2, in the "Before sending the prompt"
block that precedes each one.

- The sizing and the volume data (step 3, or N6 in a legacy system): the volumes to measure at.
- The producer/consumer map (step 8): what consumes each table.
- The observability (16): every query visible with its time.
- The test environment loaded with data at the expected volume.

## 2. Prompts

**Opening (measure and propose):**

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- `docs/SIZING.md` and `docs/VOLUME_SURVEY.md` (step 3 or N6), closed: the volumes to load.
- The test environment with data **at the expected volume**, not with ten sample records. If
  there is a previous system or a production, an anonymised copy; if it is a new project, ask the
  agent to generate synthetic data with the shape of the semantic tree and the volumes of the
  sizing, and to leave it as a script in the repository. This is a prior pending item, not part of
  this prompt.
- `docs/PRODUCER_CONSUMER_MAP.md` (step 8), up to date.
- If there is a production: read-only access, with the credential outside the chat, to measure on
  real data as well as on test data.
- A known case for the test of each meter (a table whose number of rows you know).
- Minimum acceptable state: the test environment has the volumes of the sizing and the agent can
  see every query with its time (step 16).

> We are going to optimize the persistence layer with measurements, not opinions. Read
> `docs/SIZING.md`, `docs/VOLUME_SURVEY.md` and `docs/PRODUCER_CONSUMER_MAP.md`. With the test
> environment loaded at the volumes of the sizing (and, if I gave you access, production
> read-only), measure first, with meters that live in the repository and have a test against a
> known case: every query the system runs per screen and per job, with its count and its time;
> the queries that read whole tables; the ones that run once per item; the size and monthly growth
> of every table; the connection pool usage at the peak. Audit each meter in both directions. Show
> me the numbers with the commands that produce them. Then propose, query by query, what to
> change: indexes derived from the real queries, pagination, batching, the elimination of N+1
> loops, retention and archiving per table, pool size; for each change, the expected gain, the
> risk, and which consumers in the map it touches. Do not change anything yet: I approve the list.
> Reply in my language.

What I am asking for: measuring with the method of step 9 (a meter with a test, audited in both
directions, a number with its command) before proposing; proposing query by query, with the gain
and the risk, and with the consumers of the map that each change touches (a new index touches
nobody; a retention policy per table touches everybody who reads that table); and **not changing
anything until I approve**, because optimization is the place where what nobody asked for gets
"improved" the most.

**Closing (apply with before and after):**

**Before sending the prompt**, you have to have this at hand:

- The list of proposed changes, read, with your approval or rejection for each one; the rejected
  ones, with a one-line reason. For the ones that touch consumers of the map, the confirmation
  that you understand what changes for them.
- One calculation redone by hand on one number of the measurement (rows per month of the largest
  table, for example), which matches.
- Minimum acceptable state: every change has a verdict and you understand which consumer it
  touches.

> Apply the approved changes [list], one commit each. For each one show me the meter before and
> after on the same data, the regression suite green, and the end-to-end suite green. Set a budget
> per critical path (queries and time) at the measured value plus a small margin, protected by a
> test that fails if it is exceeded. Update every consumer in the map that a change touches, in
> the same commit. Record the before and after table, the budgets and the retention per table in
> `docs/PERSISTENCE.md`.

What I am asking for: one commit per change, so that the before and the after are attributable;
the same meter on the same data (if the data changes, the number says nothing); the budget with a
test, which is what stops the N+1 loop from coming back in three months; and the symmetry of step
8 applied to persistence.

## 3. Expected result

- The query meters in the repository, with a test.
- `docs/PERSISTENCE.md` with the before and after table per change, the budgets per path and the
  retention per table.
- The indexes, the pagination, the batching and the retention applied, one commit each, with the
  regression suite and the end-to-end suite green.
- One test per budget that fails if it is exceeded.

## 4. Completeness check

- Run a meter yourself before and after (the agent gives you both commands): do they match the
  table?
- Is there any query that reads a whole table in a critical flow? Why was it left?
- Does every table have a written retention policy, even if it is "forever"?
- Do the budgets have tests? Ask it to exceed one on purpose and show you the red.
- Does the slowest screen, with the data at volume, take as long as the sizing expected?

## 5. Warning signs

- The measurements were done with the skeleton's sample data. Everything is fast with ten rows.
- The agent proposes "migrating to another database" or "rewriting the data layer". That is step
  3, and if you have to go back to it, it is a decision of yours, not an optimization.
- The number improved but the end-to-end test of a flow stopped passing. An index does not break a
  flow; a retention policy or a pagination does: a consumer of the map was missed.
- There are no budgets. Without a budget, the optimization lasts until the next block.
