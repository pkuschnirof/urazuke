# Urazuke — step 15 prompts (English, single source)

Generated from `docs/peldanos/peldano-15-ci-entornos-secretos-deploy.md` by `build/prompts.mjs`. Do not edit by hand.

## Prompt 1

We are going to close the path to production. Read the environments and access survey. Evaluate whether you have what is needed to deploy to production safely (access, domain, where the secrets live, how to roll back); if anything is missing, ask me. Then set up: (1) continuous integration runs the full test suite exactly once per commit; (2) the deployment waits for that run's result and only packages and uploads, without running tests again; (3) each environment's configuration lives on the server (environment file or vault), never in the repository; (4) a written procedure to promote from the test environment to production, which can be run twice without breaking anything; (5) the rollback, tested; (6) an automatic check that prevents committing a secret. Document all of it in `docs/DEPLOYMENT.md` so that a person can do it by hand without you. Reply in my language.

## Prompt 2

Before touching production: the test environment is green with the same version; the rollback is ready; and tell me what changes in the configuration. After deploying: show me the version running in production and an end-to-end check on production, read-only.

## Prompt 3

That secret is compromised: rotate it now, tell me everywhere else it was used, and add the check that would have caught it.
