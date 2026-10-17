# Urazuke — step 15 prompts (English, single source)

Generated from `docs/peldanos/peldano-15-agente-residente-y-retrospectiva.md` by `build/prompts.mjs`. Do not edit by hand.

## Prompt 1

We are going to leave you resident in production. First, build the map of the system you will need in order to operate it: modules, environments, where each configuration lives, which actions are consequential (read `docs/LOCKS.md`), whom to notify. If there are parts of the system you cannot see from where you are, tell me; the map must not have hidden gaps. Then propose your scope in three levels: read-only and diagnosis; configuration changes with my approval; consequential actions behind locks. I choose the level. Your credential acts as the person who created it: everything you do is logged under that person's name. Reply in my language.

## Prompt 2

Level [X]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the credential (never its value), and the procedure to request my approval. Then prove, with a real attempt recorded in the log, that something outside your scope is rejected.

## Prompt 3

[The stage / the project] is over. Do the retrospective with numbers, not impressions: what it cost (tokens, quota, my time), how many pending items, which ones took the most rounds and why, which incidents happened and which step of the ladder each falls into, and which step failed or was missing. If you lack the data for any figure (my time, for instance), ask me for it or mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder: which step is modified, how, and which incident justifies it. Write it to `docs/RETROSPECTIVE_[date].md`. Reply in my language.
