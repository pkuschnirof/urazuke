# Step 14 — Living documentation and manuals a person can follow without AI (step contract)

**Phase:** operation (born with the system; maintained with every change).
**Form:** routine; plus one long shot when the manuals are generated.
**Size:** proportional. A small system needs, at minimum, the infrastructure and recovery manual
(how to bring it up, how to restore); the user manual can be one page. What does not change: if the
person who built it disappears, another must be able to carry on.

## What it is for

So that the system can be used, maintained and recovered without the agent and without the person
who built it. If, on the day the agent is not there, it cannot be deployed, it is not finished. In
the classical method documentation was expensive and aged; here regenerating it is free, so the
rule becomes "in the same commit" and "reproducible by hand". It prevents the stale document that
caused a commit in the wrong repository, and the project file turned into a history.

A quality criterion for the recovery manual, usable to judge it without being technical: **a
trusted person who does not program must be able to follow it, at three in the morning, with the
system down and the agent offline**. If any step says "consult the developer" or "as appropriate",
that step is incomplete.

## 1. Required context

- Who the readers of each manual are: the end user, the maintainer, the infrastructure operator.
  The business knows; the agent asks if it is unclear.
- The system running in the test environment, to take real screenshots.
- `docs/DEPLOYMENT.md` (step 13) and `docs/LOCKS.md` (step 12), which are input.

## 2. Prompts

**Routine (goes in the working agreement):**

> Every change that modifies what the user sees, what the operator does, or how the system is
> deployed, updates the corresponding manual in the same commit. If you do not know which
> manual, ask.

What we are asking for: the same-commit rule, which is the only one that keeps a manual up to
date, and the question when it is unclear which manual it goes to.

**To generate the manuals:**

> Generate three manuals from the system as it is today in the test environment: the user
> manual (screen by screen, with real screenshots, in the user's language, no jargon); the
> maintenance manual (how it is built, where everything is, how to run the test suite, how to
> add a module); and the infrastructure and recovery manual (how to deploy, how to roll back,
> how to restore a backup, what to do if it goes down; written for a person who has to do it by
> hand, without AI, at three in the morning). If for any section you need something only the
> business knows (who is responsible for what, which phone number to call), ask me; do not leave
> a gap and do not invent. Each manual carries a date and the system version. Reply in my
> language.

What we are asking for: the three manuals with their readers; **real** screenshots from the test
environment (not drawings or descriptions); the three-in-the-morning criterion for the recovery
manual; the completeness clause in its documenting form: what only the business knows is asked
for, and **no gap is left and nothing is invented**; and date and version, so that it is known
which system each manual corresponds to.

## 3. Expected result

- `docs/USER_MANUAL.md` (or HTML), with real, embedded screenshots.
- `docs/MAINTENANCE_MANUAL.md`.
- `docs/INFRASTRUCTURE_AND_RECOVERY_MANUAL.md`: step by step, for a person.
- Each with a date and the version of the system it documents.
- In the commits that change screens, operation or deployment: the manual updated.

## 4. Completeness check

- Open the user manual at a random screen: does the screenshot match what is in the test
  environment today?
- Could you, or a trusted person who does not program, follow the recovery manual? Read the "it
  went down" section: does it say what to do, in order, with the commands?
- Pick a recent commit that changed a screen: did it touch the manual?
- Is there a gap like "[to be completed]" or "consult the person in charge"? That is where the
  agent had to ask.
- Does every manual say which system version it is valid for?

## 5. Warning signs

- The user manual has screenshots of a version that no longer exists. It was generated once and
  not maintained: the same-commit rule is not in the agreement or is not being applied.
- The recovery manual begins with "open a session with the agent". If the agent is a
  prerequisite, it is not a manual for a person.
- Nobody outside the builder ever read the recovery manual. Ask someone to follow it in the test
  environment; whatever stops them is what needs fixing.
