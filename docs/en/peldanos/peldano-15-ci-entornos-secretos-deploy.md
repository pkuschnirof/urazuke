# Step 15 — Continuous integration, environments, secrets and deployment as part of the product (step contract)

**Stretch:** going live.
**When:** the integration chain and the deployment to the test environment are set up in step 4.
The closing towards production — the real environment, secrets on the server, promotion, tested
rollback, lock against secrets — is done in the go-live stretch, after the audit and the locks.
The routine of every deployment applies throughout operation.
**Form:** one shot to set it up; routine for every deployment.
**Size:** mandatory in every project with users. In a small one, "continuous integration" can be a
single GitHub action and "environments" can be two folders on the same server; what is not
negotiable is that the tests run on their own, that the configuration is not in the repository,
and that there is a rollback.

## What it is for

Make reaching production a reproducible package: the tests run ONCE, the configuration lives
outside the repository, and the secrets are not floating around. It avoids the tests run three
times per commit and the burned quota [Ref. 39](../REFERENCIAS.md#ref-39), the deployment hardened
one pending item at a time because it was discovered late [Ref. 32](../REFERENCIAS.md#ref-32), and
the secrets pasted into the chat [Ref. 42](../REFERENCIAS.md#ref-42).

On secrets there is a rule to adopt as a reflex, with no exceptions: **a secret that was seen in a
chat, in a log or in a commit is no longer a secret**. It does not matter whether "nobody saw it"
or whether "it was deleted afterwards". It gets rotated. Rotation costs ten minutes; finding out
whether somebody used it is impossible.

## 1. Required context

What follows is the generic list. The concrete files you have to have made before each prompt,
with their content and their minimum state, are in section 2, in the "Before sending the
prompt" block that precedes each one.

- **Survey of environments and access**, generically: which environments there are (test,
  production), where they run, who has access, how something is promoted from one to the other,
  which secrets exist and where they live today, how much continuous integration quota there is.
  The agent evaluates whether it is enough and asks.
- The skeleton with its continuous integration and its deployment to test (step 4).

## 2. Prompts

**Opening:**

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- `docs/ENVIRONMENTS_SURVEY.md` (step 4), completed with what is missing for production: the
  domain and who administers it; where the secrets are going to live on the server (an
  environment file, a vault) and which ones they are (the name, never the value); how something
  is promoted from test to production today, if there is anything; who can touch production; how
  much continuous integration quota you have (the limit of your provider's plan) and how much you
  have consumed; how a rollback would be done today. The prompt names it "the environments and
  access survey": tell it where it is.
- The agent's access to production, decided by you: which one, with what credential, and the
  credential outside the repository and outside the chat.
- The skeleton with its continuous integration and its deployment to test working (step 4), and
  `docs/STATUS.md` with the commands.
- Minimum acceptable state: you know where the secrets are going to live and how much quota you
  have left. If you do not know the quota, find it out first: this step exists in part because of
  that.

> We are going to close the path to production. Read the environments and access survey.
> Evaluate whether you have what is needed to deploy to production safely (access, domain,
> where the secrets live, how to roll back); if anything is missing, ask me. Then set up: (1)
> continuous integration runs the full test suite exactly once per commit; (2) the deployment
> waits for that run's result and only packages and uploads, without running tests again; (3)
> each environment's configuration lives on the server (environment file or vault), never in the
> repository; (4) a written procedure to promote from the test environment to production, which
> can be run twice without breaking anything; (5) the rollback, tested — and if any change
> migrates schema or data, a written plan for undoing or compensating it, since reverting the code
> alone does not undo a migration that already ran; (6) an automatic check that prevents
> committing a secret. Document all of it in `docs/DEPLOYMENT.md` so that a person can do it by
> hand without you. Reply in my language.

What I am asking for, clause by clause: the access before starting; the tests **a single time**
per commit (running them three times is what burned the quota); the deployment that only
packages; the configuration outside the repository; promotion as a repeatable procedure; the
rollback **tested**, **with its data plan** (a rollback that was never tested does not exist, and a
schema or data migration does not get undone by reverting the commit); the lock against secrets in
commits; and the documentation for a person, which is step 20 applied to infrastructure.

**Routine of every deployment:**

**Before sending the prompt**, you have to have this at hand:

- `docs/WORKING_AGREEMENT.md`, where the routine goes.
- `docs/DEPLOYMENT.md` (the opening prompt of this step), written and read by you: could you
  follow it on your own?
- Before every real deployment, additionally: the complete end-to-end suite green with the exact
  version (step 8, close of block), and the audit done if it is the first deployment (step 13).
- Minimum acceptable state: the rollback was tested at least once before there are any users.

> Before touching production: the test environment is green with the same version; the
> rollback is ready; and tell me what changes in the configuration. After deploying: show me
> the version running in production and an end-to-end check on production, read-only.

What I am asking for: the three preconditions (test green with the same version, rollback ready,
configuration changes announced) and the two checks afterwards (the version running and an
end-to-end check without writing anything).

**If a secret showed up in the chat or in a commit:**

**Before sending the prompt**, you have to have this at hand:

- The secret identified: which one it is (its name, never its value), where it showed up (the
  chat, a commit, a log) and when. If it showed up in a commit, the commit.
- Your access to the place where it is generated (the provider's panel), in case the agent cannot
  rotate it on its own. Either you do the rotation or it does it with your credential, but it is
  not postponed.
- Minimum acceptable state: you can name the secret and where it was seen. And the rule with no
  exceptions: this prompt is not sent "later".

> That secret is compromised: rotate it now, tell me everywhere else it was used, and add the
> check that would have caught it.

What I am asking for: immediate rotation, an inventory of everywhere else it was, and the check
that would have detected it, so that next time it does not reach the chat.

## 3. Expected result

- Continuous integration running a single time per commit, with the link to a run.
- The deployment that waits for the integration and only packages; measured: how long it takes
  before and after.
- The configuration outside the repository; in the repo, only an example without values.
- `docs/DEPLOYMENT.md`: how to deploy, promote and roll back, step by step, for a person.
- The rollback tested at least once, with its evidence.
- The anti-secrets check active (an attempt to upload one, rejected).
- A record of the continuous integration quota consumed per month.

## 4. Completeness check

- How many times does the test suite run per commit? It has to be one. Ask for the link.
- Is there any real configuration value (a key, a password, an internal URL) in the repository?
  Ask the agent to search and show you the empty search.
- Could you follow `docs/DEPLOYMENT.md` on your own, without the agent? Read it with that question
  in mind.
- Was the rollback tested? When? What evidence is there?
- If there was a schema or data migration: is there a written plan to undo or compensate it,
  besides the code rollback?
- Was any secret pasted into the chat during the project? If so, was it rotated?
- Do you know how much continuous integration quota is left this month?

## 5. Warning signs

- The deployment to production is done "by hand, quickly, because it is a small change". Small
  changes are the ones that break production, because nobody tests them.
- The configuration example file has values that look real. They probably are.
- Nobody can say when the rollback was last tested.
- A migration changed data or schema and "the rollback" being talked about is only the code's. For
  that migration there is no rollback: there is, at best, a plan to compensate it.
