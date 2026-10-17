# Urazuke — step 1 prompts (English, single source)

Generated from `docs/peldanos/peldano-01-contrato-de-convivencia.md` by `build/prompts.mjs`. Do not edit by hand.

## Prompt 1

Before we write any code, we are going to set the working agreement between you and me. Write `docs/WORKING_AGREEMENT.md` with at least these rules, each with one line explaining what it prevents: (1) My time is sacred: do not ask me what you can resolve on your own, and when you do ask, ask in prose, with your recommendation. (2) Zero technical debt: whatever breaks is fixed at the root, with its regression test, in the same session. (3) Exact scope: no more and no less than what was asked; if you see something else, log it as a pending item, do not do it. (4) Documentation is updated in the same commit as the change. (5) Never report as done something you have not verified; always separate what you verified from what you believe. (6) Speak my language. Add any rules you think this project needs, marked as proposals. If you need to know something about how I work in order to write this, ask me.

## Prompt 2

I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the agreement with today's date and a version number. Then add to the project file the instruction to read this agreement at the start of every session.
