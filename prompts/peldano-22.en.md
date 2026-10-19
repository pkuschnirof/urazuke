# Urazuke — step 22 prompts (English, single source)

Generated from `docs/peldanos/peldano-22-monitoreo-de-errores.md` by `build/prompts.mjs`. Do not edit by hand.

## Prompt 1

We are going to make sure that no error in production goes unseen. Using the records of step 16, set up: (1) centralized capture of every error and unhandled exception in the backend, in the jobs and in the user's browser, with the correlation id, the version, the environment, the actor (never personal data) and the stack; (2) grouping of errors by cause, so that one defect is one entry, with its count, first and last occurrence, versions affected and the flows it touches; (3) alerts to [channel] for every new error type, for a known error that crosses [N] occurrences per hour, and for any error inside a consequential action of `docs/LOCKS.md`; (4) a cyclic report, [weekly], generated automatically, with: new errors, recurring errors and their trend, the errors fixed in the period with their pending item, the error rate per flow against the previous period, and what you propose for each open one; (5) the rule that every new error type opens a corrective pending item, closed with the test that reproduces it in red, and that there is no "known error" without a pending item that says why it is tolerated and until when. Show me one error provoked on purpose in the test environment, in the browser, followed by its id to the backend record, the alert and the report. Document it in `docs/MONITORING.md`. Reply in my language.

## Prompt 2

With every cyclic error report: go through it with me; open the corrective pending items for the new errors, each with the way to reproduce it; confirm that every recurring error has a pending item or a written reason with a date; and tell me which errors disappeared and why, with the commit that fixed each one. An error that disappeared without a fix is not solved: it is hiding, and it stays in the report until its cause is known.
