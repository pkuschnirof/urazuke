# Urazuke — step 2 prompts (English, single source)

Generated from `docs/peldanos/peldano-02-definicion-y-lectura.md` by `build/prompts.mjs`. Do not edit by hand.

## Prompt 1

We are going to define the project in writing. Read the business survey in `docs/INITIAL_SURVEY.md` and the working agreement in `docs/WORKING_AGREEMENT.md`. Evaluate whether the survey is sufficient to describe the system, its users and its boundaries; if it is not, ask me for what is missing before writing anything. Then write `PROJECT.md`, three hundred lines at most, with: what the system is and for whom; what it is NOT; the main modules as a list; the decisions already made, each with its date; and the instruction to read this file and the working agreement at the start of every session. Separately, create `docs/STATUS.md` for the living state (what is being worked on, what is open): that file changes every day; `PROJECT.md` almost never does. Reply in my language.

## Prompt 2

Apply these corrections: [list]. Finalize `PROJECT.md` with today's date. Add to the working agreement that the change history never goes into `PROJECT.md`: it goes to `docs/STATUS.md` or to the pending-items register.
