# Urazuke — step 7 prompts (English, single source)

Generated from `docs/peldanos/peldano-07-medir.md` by `build/prompts.mjs`. Do not edit by hand.

## Prompt 1

Before building anything, we are going to measure. The hypothesis is: [X]. Write a meter (a script that lives in the repository) that measures [the quantity], and a test for the meter that checks it against a known case where the answer is known in advance. If measuring requires access or data you lack, ask me; do not approximate silently. If some part can only be approximated, mark it as approximate and tell me the margin. Run the meter, show me the number together with the command that produces it, and audit it in both directions: from the code to the measurement (is everything that should be counted, counted?) and from the measurement to the code (does everything counted actually exist?). Only then propose what to build. When you need a decision from me, ask it with the four parts of UX-28 (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary, listed; one paragraph of at most five lines that links that data and lets the question be seen; the question itself with its possible answers numbered; and your recommendation. Say it at the technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or `technical`; if the project declared none, use `decision_maker`. Reply in my language.

## Prompt 2

Set the budget for [queries / loops / time] on this path at the measured value plus a small margin, and protect it with a test that fails if it is exceeded. Tell me the number and the margin. When you need a decision from me, ask it with the four parts of UX-28 (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary, listed; one paragraph of at most five lines that links that data and lets the question be seen; the question itself with its possible answers numbered; and your recommendation. Say it at the technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or `technical`; if the project declared none, use `decision_maker`.

## Prompt 3

Before executing the plan, verify every number the plan asserts with the meter. If any does not match, stop and tell me; do not execute on a wrong number. When you need a decision from me, ask it with the four parts of UX-28 (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary, listed; one paragraph of at most five lines that links that data and lets the question be seen; the question itself with its possible answers numbered; and your recommendation. Say it at the technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or `technical`; if the project declared none, use `decision_maker`.
