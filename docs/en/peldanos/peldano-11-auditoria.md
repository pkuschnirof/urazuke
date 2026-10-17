# Step 11 — The periodic audit as input to the plan (step contract)

**Phase:** operation (every so often: on closing a large stage, before an important deployment,
or every one or two months).
**Form:** one long shot, ideally by an agent different from the one that builds.
**Size:** mandatory before the first deployment to production, in any project; afterwards,
proportional to the pace of change (a system that changes every week is audited every month; a
stable one, every six).

## What it is for

To look at the whole system with fresh eyes every so often, and to turn what is seen into pending
items. The audit is not a report to be filed: it is plan. It prevents the hard-coded password
nobody saw, the 264 queries reading whole tables, the known vulnerability in a dependency, the
2,679-line component. And it is QA independence taken one step further in: the one who audits is
not the one who built.

On independence: no other company or other tool is needed. **Another session, with another
instructions file, that did not take part in the construction** is enough. What is sought is that
the auditor does not share the builder's assumptions. A model that built a module "knows" the
hard-coded password was temporary; a model seeing it for the first time reports it as what it is.

## 1. Required context

- The complete repository, read-only.
- Production or the test environment, read-only (database, logs).
- The previous audit, if there was one, to measure what changed.
- The scope: integrity, security, performance, code quality, or all of them.

## 2. Prompts

**Opening (to an agent different from the builder, if possible):**

> Audit this system for [scope]. Read-only: change nothing except writing your report to
> `docs/AUDIT_[date].md`. If auditing some part requires access you lack (the database, the
> log, an environment), tell me and mark that part as not audited; do not pass it as fine. Go
> through all of the code, not a sample. For every finding: where it is (file and line), what
> the risk is, what evidence proves it (the command, the query, the number), and its priority:
> P0 must be fixed now, P1 soon, P2 when possible. Give a grade to every dimension you audited.
> End with the list of P0 findings turned into proposed pending items. Reply in my language.

What we are asking for, clause by clause: read-only (the auditor does not fix; it proposes); the
completeness clause in its auditing form: **what could not be audited is declared, not approved by
omission**; all of the code and not a sample, because the serious findings tend to be where nobody
looks; every finding with location, risk, evidence and priority, so that it is actionable without
rereading the report; grades per dimension, to compare with the previous audit; and the P0 findings
already turned into proposed pending items.

**Closing (to the builder):**

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.

What we are asking for: that the audit becomes pending items (otherwise it is a report that gets
filed), and that disagreement is explicit and evidenced, not silent.

## 3. Expected result

- `docs/AUDIT_[date].md` with: scope, what could and could not be audited (and why), the findings
  with location, risk, evidence and priority, a grade per dimension, and the list of proposed
  pending items.
- In `docs/PENDING.md`: one item for every P0 and P1, citing the finding.

## 4. Completeness check

- Does the report say what it could NOT audit? If it says it audited everything, be suspicious.
- Pick two findings: do they have file and line, and evidence you can reproduce?
- Does every P0 have its pending item opened before the audit is considered closed?
- Can the grades per dimension be compared with the previous audit?
- Did the same agent that built also audit? If so, ask for a second look at the P0 findings.

## 5. Warning signs

- The audit found no P0. In a system older than three months that is almost never true; more
  likely the scope was small or the auditor shared assumptions.
- The findings have no file line. They are opinions, not findings.
- Two weeks went by and the P0 findings still have no pending item. The audit got filed.
