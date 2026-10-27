# Urazuke — step 6 prompts (English, single source)

Generated from `docs/peldanos/peldano-06-decisiones.md` by `build/prompts.mjs`. Do not edit by hand.

## Prompt 1

Whenever implementing something requires a business rule that is not written down, or you must choose between two approaches that change what the user sees, stop and ask me, in prose, with your recommendation and the alternative. Do not implement the one you prefer. When I decide, write the decision with my name and the date in the commit message, in the pending item's specification and in `docs/DECISIONS.md`, with the exact words I used. If I do not answer and you must move on, implement the most reversible option and mark it "decision by omission, pending confirmation", so that I can review it. When you need a decision from me, ask it with the four parts of UX-28 (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary, listed; one paragraph of at most five lines that links that data and lets the question be seen; the question itself with its possible answers numbered; and your recommendation. Say it at the technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or `technical`; if the project declared none, use `decision_maker`.

## Prompt 2

Rule: [exact wording]. Decided by me, [date]. Write it down and continue. When you need a decision from me, ask it with the four parts of UX-28 (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary, listed; one paragraph of at most five lines that links that data and lets the question be seen; the question itself with its possible answers numbered; and your recommendation. Say it at the technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or `technical`; if the project declared none, use `decision_maker`.
