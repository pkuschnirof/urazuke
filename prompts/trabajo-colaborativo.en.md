# Urazuke — teamwork on a shared branch prompts (English, single source)

Generated from `docs/TRABAJO_COLABORATIVO.md` by `build/prompts.mjs`. Do not edit by hand.

## Prompt 1

We work as a team on one shared branch, each person with their own agent session, and the only shared memory is what is written in the repository. Rules: (1) At the start of every session, read `docs/STATUS.md`, `docs/DECISIONS.md` and `docs/PENDING.md`; never touch a pending item claimed by someone else, and never take one that touches a module another claimed item touches. (2) Before every integration into the shared branch: pull the others' changes, run the full suite and the quality gate, and only then push; integrate several times a day, never at the end of the week. (3) Never push with the pipeline red; whoever turns it red fixes it before anything else or reverts. (4) Anything that cannot be finished and integrated today goes behind a feature switch, off by default, noted in the pending item. (5) Before touching a contract between parts (a service, a table, a list of values), look up its consumers in `docs/PRODUCER_CONSUMER_MAP.md` and update them in the same change, whoever owns them. (6) Every business decision goes to `docs/DECISIONS.md` the moment it is taken, with the person's name and the date. (7) Update `docs/STATUS.md` with what you are doing when you start and when you stop, so that the others' agents see it. Reply in my language.

## Prompt 2

I am taking pending item [PND-NNN]. Before anything: list the pending items claimed by others and tell me whether any of them touches the same modules as mine, by the "modules it touches" field and by the producer-consumer map; if there is an overlap, stop and tell me, do not start. If there is none, write my name in the "claimed by" field with today's date, write in `docs/STATUS.md` what I am starting, re-read the item's specification, and tell me which contracts of the map this item will touch and who consumes them. Reply in my language.

## Prompt 3

We are going to integrate into the shared branch. Pull the others' changes first and tell me what came in and whether anything touches my modules. Resolve conflicts, if any, by reading both sides and asking me when a business rule is involved; never by keeping mine. Run the full suite, the quality gate and, if this is an inherited system, the characterization suite, and show me the counts. If anything is red, stop: tell me what and whose change it comes from. If this item is not finished, confirm the feature switch is off by default and say so in the commit message. Then push, show me the pipeline green on the shared branch, and update `docs/STATUS.md` and the pending item. Reply in my language.
