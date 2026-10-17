# Urazuke — step 14 prompts (English, single source)

Generated from `docs/peldanos/peldano-14-documentacion-viva.md` by `build/prompts.mjs`. Do not edit by hand.

## Prompt 1

Every change that modifies what the user sees, what the operator does, or how the system is deployed, updates the corresponding manual in the same commit. If you do not know which manual, ask.

## Prompt 2

Generate three manuals from the system as it is today in the test environment: the user manual (screen by screen, with real screenshots, in the user's language, no jargon); the maintenance manual (how it is built, where everything is, how to run the test suite, how to add a module); and the infrastructure and recovery manual (how to deploy, how to roll back, how to restore a backup, what to do if it goes down; written for a person who has to do it by hand, without AI, at three in the morning). If for any section you need something only the business knows (who is responsible for what, which phone number to call), ask me; do not leave a gap and do not invent. Each manual carries a date and the system version. Reply in my language.
