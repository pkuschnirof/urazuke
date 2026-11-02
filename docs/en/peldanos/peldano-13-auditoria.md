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

If you can choose, make it also **a different model** from the one that built, not just another
session of the same one: a 2026 study measured that a clean session with a different model finds
more errors than two sessions of the same model ([arXiv 2610.01471](https://arxiv.org/abs/2610.01471)).
But that preference has a **capacity floor**, and I say so because I measured it: another model
finds more **only if that model can do the work**. Below a certain capacity, diversity stops being
an advantage and turns into a cost, because verifying a false finding costs almost as much as
having looked for it yourself. So the order is this one: first, **another model, if it is up to the
task**; if it is not, **another session of the same model, declaring the deviation** in the
`Auditor:` line of the report; and **never** an auditor chosen by which key happens to be loaded or
which timeout it survives. If a limit of the tool chose it, the report says so with those words:
that is the `tool_constraint` case of the `auditor_choice` key, and it exists because a constraint
of the tool disguises itself as a technical choice, and the only thing that strips it bare is
having to name it. The builder's model being the only one available is not a failure of the method:
it is a declared deviation, and a declared deviation can be audited. (Decision D-079, on the
experiment of 2026-11-02: the auditor on another model delivered four of the nine findings it had
itself announced, and its only P0 was false because it misread a decimal point; the one on the same
model, departing from the preference and declaring it in its first line, delivered seventeen, and
not one of them turned out false when they were verified one by one.)

And here is the limit, because saying it is worth more than simulating it: **step 13 cannot be
verified end to end by a machine**. Its work is done by a third party, so the gate cannot evaluate
the work; it can evaluate its **trace**. I measured it on 2026-11-02 and it is uncomfortable: a
report that said of itself, literally, "I found nine findings, I am writing four, this report is
incomplete" came out **green**, because "complete" is not a property of the file -- it is the
relation between what the report announces and what it delivers -- and a gate that looks at the
file cannot see it. And giving the auditor a bigger budget does not fix it: in that measurement the
session **was not cut off**, it ended on its own, in one turn and a hundred and thirty thousand
tokens, emitting its closing marker by itself. A gate cannot tell a report that was cut off from
one that was abandoned. What it can do, and what the method demands of it since D-081, is ask the
report to **declare** what can afterwards be falsified by counting: its completeness under
`audit_completeness`, with how many findings it announced and how many it wrote; the grade of every
dimension under `dimension_grades`; the verdict of every receipt it reran under
`receipts_reproduced`; and what it did not audit under `not_audited`, with its pending item open.
None of the four prevents lying. The four turn the lie into a concrete claim, written, with a date
and a signature, instead of a silence; and counting the findings a report wrote and comparing them
with its own figure costs two minutes and requires reading no code, which is exactly the kind of
verification this method asks of you.

## 1. Required context

What follows is the generic list. The concrete files you have to have made before each prompt,
with their content and their minimum state, are in section 2, in the "Before sending the
prompt" block that precedes each one.

- The complete repository, read-only.
- Production or the test environment, read-only (database, logs).
- The previous audit, if there was one, to measure what changed.
- The scope: integrity, security, performance, code quality, or all of them.
- `docs/PENDING.md` with the pending items closed in the last cycle and their receipts, so the
  auditor can pick which ones to reproduce.
- The register of the evidence of the whole last cycle: the functional commits, the pending items
  closed with their receipts, and the archived receipts that carry a mutation. This is not the
  same as the previous point: there the auditor picks two or three receipts to reproduce, and here
  it has to be able to count the whole register.

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
- Who is going to audit and why that one, decided by you: another model if it is up to the task,
  another session of the same one if it is not, and never the one that was left because it was the
  key that happened to be loaded or the only one that survived the timeout. The prompt asks it to
  declare this in the report, but the decision is yours: if you do not make it, the tool makes it.
- Minimum acceptable state: the auditor's session is not the builder's, and it has read-only
  access.

> Audit this system for [scope]. Read-only: change nothing except writing your report to
> `docs/AUDIT_[date].md`. If auditing some part requires access you lack (the database, the
> log, an environment), tell me and mark that part as not audited; do not pass it as fine. Go
> through all of the code, not a sample. Pick two or three pending items closed in the last cycle
> and reproduce their receipts literally: rerun the exact red-then-green commands they cite
> against the commits they name, and say for each one whether it reproduces or not. A receipt you
> only read is not a receipt you audited. For every finding: where it is (file and line), what
> the risk is, what evidence proves it (the command, the query, the number), and its priority:
> P0 must be fixed now, P1 soon, P2 when possible. Give a grade to every dimension you audited.
> End with the list of P0 findings turned into proposed pending items.
>
> This report carries declarations that a gate reads, each one under its fixed key, so write the
> key in English even when the report is in my language. `auditor_choice`: which case applies and
> who decided it -- `different_model` if you are a model other than the one that built this
> system; `same_model_declared` if you are the same model because no other one was up to the
> task; `tool_constraint` if what chose you was a key that happened to be loaded, a timeout or
> any other limit of the tool, and then say so with those words. In the `Auditor:` line, the
> model that built and the model that audits. `evidence_register_health`: the health of the
> register of the evidence, which is a dimension of this audit and is not optional -- how many
> functional commits carry no receipt of any kind; how many pending items closed as shipped lack
> their receipts, and of those how many have the reason written; and of the receipts that carry
> a mutation, how many can be applied again. Each of those figures measured by a program, with
> the command next to it, and a figure you could not measure declared as not measured and never
> as zero. If the register of the evidence is broken, every other finding in this report rests
> on data nobody can reproduce. `findings_by_destination`: every finding assigned to one
> destination -- `product` if the defect is in the audited system, `method` if it is in the
> method being followed, `tool` if it is in the tool that runs it -- with the register where its
> pending item goes. A finding whose destination nobody assigned leaves this audit open.
>
> Four more declarations, about this report and not about the system, because a gate can read the
> trace of the work and cannot read the work. `audit_completeness`: `complete` when you wrote down
> every finding you found, and next to it `findings_announced` and `findings_written` with their
> figures. Those two figures have to be the same figure: if you announce nine findings and write
> four, this report is not complete and this step does not close with it -- so do not announce a
> count you are not going to write, and do not stop halfway and emit your closing marker as if you
> had finished. `dimension_grades`: the grade of every dimension you audited, each one with the name
> of its dimension next to it. `receipts_reproduced`: for every receipt you reran, `reproduces` or
> `does_not_reproduce`, with the command and its output; at least one, and a receipt you only read
> is not one of them. `not_audited`: `none` when you audited everything in the scope, or
> `with_pending` and then, part by part, what you did not audit, why, and the pending item that is
> open for it. A part named as not audited and left without its own pending item leaves this report
> open; an audit with a smaller scope declared up front is worth more than a wide one with holes.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

What I am asking for, clause by clause: read-only (the auditor does not fix; it proposes); the
completeness clause in its form for auditing: **what could not be verified is declared, not
approved by omission**; all of the code and not a sample, because the serious findings are usually
where nobody looks; **the literal reproduction of two or three receipts**, so the audit verifies
evidence instead of just reading it (this is the clause that closes the D-033 gap: a red that is
told is not a red that is audited); every finding with location, risk, evidence and priority, so
that it is actionable without re-reading the report; grades per dimension, to compare with the
previous audit; and the P0 findings already turned into proposed pending items.

And what the two decisions of November add, said separately because both change the auditor's work
and not only its wording: the **three declarations with a fixed key**, because "complete" and
"audited" are not properties you can read off a report written in free prose (D-079 and D-080); the
**health of the register of the evidence** as a mandatory dimension, because it is the only one
that audits all the others -- if the register of the evidence is broken, every other finding in the
report rests on data nobody can reproduce, and then the whole report is worth less than its grades
say --; and the **destination of every finding**, because a defect of the method filed in the
product's register is a defect nobody is ever going to fix: the owner of the product cannot fix the
method, and whoever could never heard about it.

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
>
> Open each one in the register of the destination the report assigned to it: the product
> register for `product`, and for `method` and for `tool` the register of the method or the
> register of the tool, never the product's. If a finding arrives with no destination, ask me
> for it before opening anything.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

What I am asking for: that the audit turns into pending items (otherwise it is a report that gets
filed), and that disagreement be explicit and backed by evidence, not silent.

And, since D-080, that every pending item be opened in the register of its destination. The builder
is the one with its hands on the product, so it is the one that most easily sends everything to the
product's register; a finding that arrives with no destination is asked of you before anything is
opened.

## 3. Expected result

- `docs/AUDIT_[date].md` with: the scope, what could be verified and what could not (and why), the
  findings with location, risk, evidence and priority, a grade per dimension, the result of
  reproducing two or three receipts from the last cycle, and the list of proposed pending items.
- In `docs/PENDING.md`: one pending item for every P0 and P1, citing the finding.
- In that same report, the three declarations a gate can read, each with its key in English:
  `auditor_choice` (which case applies and who decided it), `evidence_register_health` (the figures
  of the register of the evidence, each one with the command that measured it, and "not measured"
  when it could not be measured) and `findings_by_destination` (every finding with its destination).
- In the register of each destination: one pending item for every P0 and P1. The product's in the
  product register, the method's in the method's, the tool's in the tool's.
- In that same report, the four declarations D-081 adds to the previous three:
  `audit_completeness` at `complete`, with `findings_announced` and `findings_written` at the same
  figure; `dimension_grades` with the grade of every dimension audited; `receipts_reproduced` with
  the verdict of every receipt that was rerun; and `not_audited` at `none` or at `with_pending`,
  and then the open pending item of every part that was left out.

## 4. Completeness check

- Does the report say what it could NOT verify? If it says it verified everything, be suspicious.
- Pick two findings: do they have file and line, and evidence you can reproduce?
- Does the report say which receipts it reproduced, with the command and the result, or does it
  only say it read them?
- Does every P0 have its pending item open before the audit is considered closed?
- Will the grades per dimension be comparable with the previous audit?
- Did the same agent that built also audit? If so, ask for a second look at the P0 findings.
- Does the report say who audited and why that one? If the reason is that it was the only one
  loaded or the only one that survived the timeout, that is `tool_constraint` and it has to be
  written that way.
- Are the figures of the health of the register of the evidence there, each one with the command
  that measured it? A figure that could not be measured says "not measured"; a zero that does not
  tell "there are none" from "I could not look" is not a figure (CQ-19, the denominator).
- Does every finding have a destination, and did its pending item get opened in the register of
  that destination?
- Do `findings_announced` and `findings_written` say the same figure? Count the findings that were
  written by hand and compare them with the declared figure: it is the only way to falsify the
  declaration, and it is the cheapest verification of this step.
- Does every part the report names as not audited have its pending item open? A part declared with
  no pending item is a part nobody is ever going to audit.
- Is there at least one receipt with its verdict, `reproduces` or `does_not_reproduce`, with the
  command and the output pasted in? A receipt that was only read has no verdict.

## 5. Warning signs

- The audit found no P0 at all. In a system more than three months old, that is almost never
  true; more likely the scope was small or the auditor shared the assumptions.
- The findings have no file line. They are opinions, not findings.
- The report says the receipts "were reviewed" without showing the command that ran or its
  output. A receipt that was read and one that was reproduced are not the same, and only the
  second one closes the D-033 objection.
- Two weeks went by and the P0 findings still have no pending item. The audit got filed.
- The report praises the auditor's independence and does not say which `auditor_choice` case
  applies. When the tool chose the auditor and not you, that is precisely the case nobody writes
  down on their own.
- The health of the register of the evidence comes back as zero and with no command. A zero
  without the command that produced it is an "I could not look" dressed up as good news.
- Every finding came out with destination `product`. In a control that looks at the system with
  the method and the tool in use, none of them being of the method or of the tool is improbable:
  the likelier thing is that nobody asked about the destination.
- The report declares `audit_completeness: complete` and the count of findings written does not
  add up. It is the one declaration you can falsify in two minutes, which is why it is worth doing
  every time.
- The report ends with an impeccable closing sentence and never came back to the parts it had
  marked as not audited. An auditor who runs out of room emits its closing marker all the same:
  what tells a finished report from an abandoned one is not the ending, it is `not_audited`.
