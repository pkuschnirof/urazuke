# Step 20 — Living documentation and manuals a person can follow without AI (step contract)

**Stretch:** going live.
**When:** the user manual grows with every functional block, at its close, with the new screens;
fed by the closed pending items, which are the documentation of what was done. The three complete
manuals are generated in the go-live stretch, after step 15, and the test with a person who does
not program is done before the first deployment. The same-commit routine applies throughout
operation.
**Form:** routine; plus one long shot when the manuals are generated.
**Size:** proportional. A small system needs, at minimum, the infrastructure and recovery manual;
the user manual can be one page. What does not change: if the person who built it disappears,
somebody else has to be able to carry on.

## What it is for

Make the system usable, maintainable and recoverable without the agent and without you. If on the
day there is no agent it cannot be deployed, it is not finished. In the classical method
documentation was expensive and it aged; here regenerating it is free, so the rule becomes "in the
same commit" and "reproducible by hand". The manuals I wrote for the Health Fund with that
criterion are the model [Ref. 24](../REFERENCIAS.md#ref-24); and the project file that turned into
a history of thousands of lines is the counterexample [Ref. 41](../REFERENCIAS.md#ref-41).

A quality criterion for the recovery manual, which lets you judge it without being technical: **a
trusted person who does not program has to be able to follow it, at three in the morning, with
the system down and the agent offline**. If at any step it says "check with the developer" or
"depending on the case", that step is incomplete.

And a source you must not waste: the closed pending items. Each one carries its specification, its
decision, its evidence and its date. The user manual is not written from scratch at the end: it is
assembled, block by block, from the pending items that were closed, and the changelog comes
straight out of them.

## 1. Required context

What follows is the generic list. The concrete files you have to have made before each prompt,
with their content and their minimum state, are in section 2, in the "Before sending the
prompt" block that precedes each one.

- Who the readers of each manual are: the end user, the one who maintains, the one who operates
  the infrastructure. The business knows; the agent asks if it is not clear.
- The system running in the test environment, to take real screenshots.
- The closed pending items of the block, with their closing documentation (step 5).
- `docs/DEPLOYMENT.md` (step 15) and `docs/LOCKS.md` (step 14), which are inputs.

## 2. Prompts

**Routine (goes in the working agreement):**

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- `docs/WORKING_AGREEMENT.md`, where the routine goes.
- The decision about which manuals the system is going to have and who each one is for (the end
  user, the one who maintains it, the one who operates the infrastructure), written in
  `PROJECT.md` or said in the chat, so that "the corresponding manual" means something.
- Minimum acceptable state: there is a list of manuals, each one with its reader.

> Every change that modifies what the user sees, what the operator does, or how the system is
> deployed, updates the corresponding manual in the same commit. At the close of every
> functional block, add to the user manual the screens and flows of the pending items closed
> in that block, with real screenshots from the test environment, and add their entries to the
> changelog. If you do not know which manual, ask.

What I am asking for: the same-commit rule, which is the only one that keeps a manual up to date;
the close of the block as the moment when the closed pending items become manual and changelog;
and the question when it is not clear which manual it goes to.

**To generate the manuals:**

**Before sending the prompt**, you have to have this at hand:

- The system running in the test environment with realistic data, not empty: the screenshots come
  from there.
- The closed pending items with their closing documentation (step 5), which are the source of the
  user manual and of the changelog.
- `docs/DEPLOYMENT.md` (step 15) and `docs/LOCKS.md` (step 14), which are the input of the
  infrastructure and recovery manual.
- What only the business knows, prepared for when the agent asks: who is responsible for what,
  what phone number gets called when it goes down, who makes the backup, in what language the
  user reads.
- Minimum acceptable state: there is data in the test environment, and you know whom to call at
  three in the morning.

> Generate three manuals from the system as it is today in the test environment: the user
> manual (screen by screen, with real screenshots, in the user's language, no jargon); the
> maintenance manual (how it is built, where everything is, how to run the test suite, how to
> add a module); and the infrastructure and recovery manual (how to deploy, how to roll back,
> how to restore a backup, what to do if it goes down; written for a person who has to do it by
> hand, without AI, at three in the morning). If for any section you need something only the
> business knows (who is responsible for what, which phone number to call), ask me; do not leave
> a gap and do not invent. Each manual carries a date and the system version. Reply in my
> language.

What I am asking for: the three manuals with their readers; **real** screenshots from the test
environment (not drawings or descriptions); the three-in-the-morning criterion for the recovery
manual; the completeness clause in its form for documenting: what only the business knows is
asked, and **no gap is left and nothing is invented**; and date and version, so that it is known
which system each manual corresponds to.

## 3. Expected result

- `docs/USER_MANUAL.md` (or HTML), with real, embedded screenshots, which grew block by block.
- `docs/MAINTENANCE_MANUAL.md`.
- `docs/INFRASTRUCTURE_AND_RECOVERY_MANUAL.md`: step by step, for a person.
- `docs/CHANGELOG.md`, fed by the closed pending items.
- Each one with a date and the version of the system it documents.
- In the commits that change screens, operation or deployment: the manual updated.

## 4. Completeness check

- Open the user manual at a random screen: does the screenshot match what is in the test
  environment today?
- Could you, or a trusted person who does not program, follow the recovery manual? Read the "it
  went down" section: does it say what to do, in order, with the commands?
- Pick a recent commit that changed a screen: did it touch the manual?
- Does the changelog have one entry for every pending item closed in the last block?
- Is there a gap of the kind "[to be completed]" or "check with the person responsible"? There the
  agent had to ask.
- Does each manual say which version of the system it is valid for?

## 5. Warning signs

- The user manual has screenshots of a version that no longer exists. It was generated once and
  not maintained: the same-commit rule is not in the agreement or is not being applied.
- The recovery manual starts with "open a session with the agent". If the agent is a
  prerequisite, it is not a manual for a person.
- Nobody outside the builder ever read the recovery manual. Ask somebody to follow it in the test
  environment; whatever gets them stuck is what has to be fixed.
