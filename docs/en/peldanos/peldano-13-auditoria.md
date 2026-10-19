# Step 13 — The periodic audit as input to the plan (step contract)

**Stretch:** going live.
**When:** mandatory before the first deployment to production; it opens the go-live stretch.
Afterwards, in operation, every one or two months depending on the pace of change, and at the
close of every large stage.
**Form:** one long shot, ideally to an agent different from the one that builds.
**Size:** mandatory before the first deployment to production, in any project; afterwards,
proportional to the pace of change (a system that changes every week is audited every month; a
stable one, every six).

## What it is for

Look at the whole system with fresh eyes every so often, and turn what you see into pending items.
The audit is not a report that gets filed: it is plan. It avoids the password written into the
code that nobody had seen, the queries that read whole tables [Ref. 18](../REFERENCIAS.md#ref-18),
the known vulnerability in a dependency, the component of thousands of lines
[Ref. 41](../REFERENCIAS.md#ref-41). And it is the independence of quality control taken one step
further in: the one who audits is not the one who built.

On independence: you do not need another company or another tool. **Another session, with
another instructions file, that did not take part in the construction** is enough. What you are
after is that the auditor does not share the builder's assumptions. A model that built a module
"knows" that the hardcoded password was provisional; a model that sees it for the first time
reports it as what it is. That is how two administrator doors that the builder had left in a single
day were detected [Ref. 40](../REFERENCIAS.md#ref-40).

## 1. Required context

What follows is the generic list. The concrete files you have to have made before each prompt,
with their content and their minimum state, are in section 2, in the "Before sending the
prompt" block that precedes each one.

- The complete repository, read-only.
- Production or the test environment, read-only (database, logs).
- The previous audit, if there was one, to measure what changed.
- The scope: integrity, security, performance, code quality, or all of them.

## 2. Prompts

**Opening (to an agent different from the builder, if possible):**

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- A new session of the agent, different from the builder's: a clean clone of the repository in
  another folder and, if your tool allows it, a different instructions file that only says "you
  are an auditor; you did not build this system". Without this, the auditor shares the builder's
  assumptions and confirms them.
- Read-only access for that session to the test environment or to production: database, logs.
  Read-only credentials, outside the repository, with the name of the variable said in the chat.
- The scope, decided by you, for the [scope] gap: integrity, security, performance, code quality,
  or everything.
- The previous audit, if there was one (`docs/AUDIT_[date]` from last time), so that it measures
  what changed.
- Minimum acceptable state: the auditor's session is not the builder's, and it has read-only
  access.

> Audit this system for [scope]. Read-only: change nothing except writing your report to
> `docs/AUDIT_[date].md`. If auditing some part requires access you lack (the database, the
> log, an environment), tell me and mark that part as not audited; do not pass it as fine. Go
> through all of the code, not a sample. For every finding: where it is (file and line), what
> the risk is, what evidence proves it (the command, the query, the number), and its priority:
> P0 must be fixed now, P1 soon, P2 when possible. Give a grade to every dimension you audited.
> End with the list of P0 findings turned into proposed pending items. Reply in my language.

What I am asking for, clause by clause: read-only (the auditor does not fix; it proposes); the
completeness clause in its form for auditing: **what could not be verified is declared, not
approved by omission**; all of the code and not a sample, because the serious findings are usually
where nobody looks; every finding with location, risk, evidence and priority, so that it is
actionable without re-reading the report; grades per dimension, to compare with the previous
audit; and the P0 findings already turned into proposed pending items.

**Closing (to the builder):**

**Before sending the prompt**, you have to have this at hand:

- `docs/AUDIT_[date].md`, read by you, and two findings at random verified with the auditor (ask
  it for the command, for the line; it has to be able to show them).
- The builder's session open: this prompt goes to the builder, not to the auditor, with the date
  of the file put into the gap.
- Minimum acceptable state: you read the report, you know how many P0s and P1s there are, and you
  are going to count the pending items it opens.

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.

What I am asking for: that the audit turns into pending items (otherwise it is a report that gets
filed), and that disagreement be explicit and backed by evidence, not silent.

## 3. Expected result

- `docs/AUDIT_[date].md` with: the scope, what could be verified and what could not (and why), the
  findings with location, risk, evidence and priority, a grade per dimension, and the list of
  proposed pending items.
- In `docs/PENDING.md`: one pending item for every P0 and P1, citing the finding.

## 4. Completeness check

- Does the report say what it could NOT verify? If it says it verified everything, be suspicious.
- Pick two findings: do they have file and line, and evidence you can reproduce?
- Does every P0 have its pending item open before the audit is considered closed?
- Will the grades per dimension be comparable with the previous audit?
- Did the same agent that built also audit? If so, ask for a second look at the P0 findings.

## 5. Warning signs

- The audit found no P0 at all. In a system more than three months old, that is almost never
  true; more likely the scope was small or the auditor shared the assumptions.
- The findings have no file line. They are opinions, not findings.
- Two weeks went by and the P0 findings still have no pending item. The audit got filed.
