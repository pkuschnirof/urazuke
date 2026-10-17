# Step 13 — Continuous integration, environments, secrets and deployment as part of the product (step contract)

**Phase:** operation (built on the skeleton of step 4; revised with every infrastructure change).
**Form:** one shot to set it up; routine for every deployment.
**Size:** mandatory in every project with users. In a small one, "continuous integration" can be a
single GitHub action and "environments" can be two folders on the same server; what is not
negotiable is that the tests run by themselves, that the configuration is not in the repository,
and that there is a way back.

## What it is for

So that reaching production is a reproducible package: the tests run ONCE, the configuration lives
outside the repository, and secrets do not wander around. It prevents the tests running three
times per commit (2,000 minutes of quota in 16 days), the database key printed in a transcript,
the CORS that only knew the first domain, and the configuration overwritten by the test suite.

On secrets there is a rule worth adopting as a reflex, with no exceptions: **a secret that was
seen in a chat, a log or a commit is no longer a secret**. It does not matter whether "nobody saw
it" or "it was deleted afterwards". It is rotated. Rotation costs ten minutes; finding out whether
someone used it is impossible.

## 1. Required context

- **Environments and access survey**, generically: which environments exist (test, production),
  where they run, who has access, how something is promoted from one to the other, which secrets
  exist and where they live today, how much continuous-integration quota there is. The agent
  evaluates whether it is enough and asks.
- The skeleton with its continuous integration and its deployment to the test environment
  (step 4).

## 2. Prompts

**Opening:**

> We are going to close the path to production. Read the environments and access survey.
> Evaluate whether you have what is needed to deploy to production safely (access, domain,
> where the secrets live, how to roll back); if anything is missing, ask me. Then set up: (1)
> continuous integration runs the full test suite exactly once per commit; (2) the deployment
> waits for that run's result and only packages and uploads, without running tests again; (3)
> each environment's configuration lives on the server (environment file or vault), never in the
> repository; (4) a written procedure to promote from the test environment to production, which
> can be run twice without breaking anything; (5) the rollback, tested; (6) an automatic check
> that prevents committing a secret. Document all of it in `docs/DEPLOYMENT.md` so that a person
> can do it by hand without you. Reply in my language.

What we are asking for, clause by clause: the access before starting; the tests **exactly once**
per commit (running them three times is what burned the quota); the deployment that only packages;
the configuration outside the repository; promotion as a repeatable procedure; the rollback
**tested** (a rollback that was never tested does not exist); the lock against secrets in commits;
and the documentation for a person, which is step 14 applied to infrastructure.

**Routine for every deployment:**

> Before touching production: the test environment is green with the same version; the
> rollback is ready; and tell me what changes in the configuration. After deploying: show me
> the version running in production and an end-to-end check on production, read-only.

What we are asking for: the three preconditions (test green with the same version, rollback
ready, configuration changes announced) and the two pieces of evidence afterwards (the version
running and an end-to-end check that writes nothing).

**If a secret showed up in the chat or in a commit:**

> That secret is compromised: rotate it now, tell me everywhere else it was used, and add the
> check that would have caught it.

What we are asking for: immediate rotation, an inventory of where else it was, and the check that
would have detected it, so that next time it does not reach the chat.

## 3. Expected result

- Continuous integration running exactly once per commit, with a link to a run.
- The deployment that waits for integration and only packages; measured: how long it takes before
  and after.
- The configuration outside the repository; in the repo, only an example without values.
- `docs/DEPLOYMENT.md`: how to deploy, promote and roll back, step by step, for a person.
- The rollback tested at least once, with its evidence.
- The anti-secrets check active (an attempt to commit one, rejected).
- A record of continuous-integration quota consumed per month.

## 4. Completeness check

- How many times does the suite run per commit? It has to be one. Ask for the link.
- Is there any real configuration value (a key, a password, an internal URL) in the repository?
  Ask the agent to search and show you the empty search.
- Could you follow `docs/DEPLOYMENT.md` yourself, without the agent? Read it with that question.
- Was the rollback tested? When? What evidence is there?
- Was any secret pasted in the chat during the project? If so, was it rotated?
- Do you know how much continuous-integration quota is left this month?

## 5. Warning signs

- The production deployment is done "by hand, quickly, because it is a small change". Small
  changes are the ones that break production, because nobody tests them.
- The example configuration file has values that look real. They probably are.
- Nobody can say when the rollback was last tested.
