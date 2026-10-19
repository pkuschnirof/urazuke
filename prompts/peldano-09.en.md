# Urazuke — step 9 prompts (English, single source)

Generated from `docs/peldanos/peldano-09-calidad-de-codigo.md` by `build/prompts.mjs`. Do not edit by hand.

## Prompt 1

We are going to make the code quality verified by machine, because nobody is going to read the code. Set up, in continuous integration, on every push: (1) a linter and a formatter with one configuration for the whole repository, failing the build on any violation; (2) limits on the size of every file and every function ([file lines] and [function lines]) and on the complexity of every function, failing the build when exceeded; (3) detection of duplicated code and of dead code (unused functions, variables, imports, dependencies); (4) a test coverage report with a ratchet: the measured coverage of today becomes the floor, and the build fails if it drops; (5) type checking if the language allows it. Run all of it now on the current code and write `docs/CODE_QUALITY.md` with: the tools, the configuration, every limit with its current measured value, and the list of what fails today with where it is. Do not fix anything yet: what fails today becomes pending items, and I decide which limits apply now and which are raised with a date. Make the whole set a gate in `docs/GATES.md`: nothing is merged with quality red. Reply in my language.

## Prompt 2

Every pending item is closed with the quality gate green: linter, formatter, size and complexity limits, no new duplication, no dead code, coverage at or above the ratchet. A quality failure is fixed in the same commit, never silenced with an exception, and a limit is never raised to pass; if a limit must change, say so with the reason and I decide. At the close of every block, show me `docs/CODE_QUALITY.md` with the numbers of the block against the previous one.

## Prompt 3

Add mutation testing to the quality gate, [on the whole codebase | only on the lines changed by each pending item]: a tool that plants small deliberate bugs in the code (a flipped condition, a deleted line, a changed operator) and runs the tests. Run it now and write in `docs/CODE_QUALITY.md`: the tool, the scope, the number of mutants planted, how many the tests killed, how many survived and where. Do not fix anything yet: every surviving mutant in code that matters becomes a pending item for a test that catches it, and I decide which ones matter. From now on, report the mutation score at the close of every block next to the coverage, and treat a drop as a quality failure. Reply in my language.
