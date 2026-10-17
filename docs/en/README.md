# Urazuke — the evidence method

*Urazuke* (裏付け) is a Japanese word for the backing a claim has: what holds it up from behind.
The verb, *urazukeru*, means "to back with proof". That is the method.

A method for building software with artificial intelligence that comes out robust, ready for
production, **without the project owner ever having to read a single line of code**. Distilled
from three real systems that are in production today, bumps and bruises included.

This folder holds the English version of the method. Spanish is the source of truth; if the two
ever disagree, the Spanish version wins and the English one gets fixed.

## The thesis in one sentence

AI does not interrupt the method: it continues it. The industry stopped trusting the author of
the code twenty years ago and learned to demand evidence instead of reading it; the model is the
next author, not the first untrustworthy one. The only genuinely new thing is that this author also
manufactures the evidence, and that is why the evidence has to prove itself.

## What is here

| File | What it is |
|---|---|
| `ESCALERA_METODOLOGICA.md` | The main document: the thesis, the survey of the three source repositories (moments and milestones with their commits), the sixteen steps of the ladder with their one-page card, the real failures mapped to steps, what is still missing, and the glossary. |
| `peldanos/peldano-NN-*.md` | The contract of each step: required context, the prompts (in English, single source, identical in every language), the expected result, the completeness check, and the warning signs. It is what a student executes and what later gets exported to Forge. |
| `peldanos/README.md` | The index of the contracts, with the phase of each one. |
| `MANUAL_CURSO.md` | The course: sixteen lessons, one per step, with the concept explained, the hands-on task step by step with the prompts, the completeness check, the deliverable, the typical mistakes, and the example on the guide project ("Turnera"). Ends with the production readiness list. |

The decision log (`../DECISIONES.md`) is kept in Spanish only, because it quotes the owner's
exact words.

## How to read it

Start with `ESCALERA_METODOLOGICA.md`, or with its HTML in `../html/en/`. If you run into an odd
word, the glossary is at the end. Then read the contract of whichever step interests you.

## Languages

Spanish is the source of truth. The documentation exists in the eight NAC3 languages (Spanish,
English, Portuguese, French, German, Italian, Japanese and Chinese). The prompts for the model are
a single piece in English, identical in every version, explained in the reader's language. The
name is never translated; the subtitle is: *el método de la evidencia*, *the evidence method*,
*o método da evidência*, *la méthode de la preuve*, *die Nachweis-Methode*, *il metodo del
riscontro*, 裏付けの方法, 验证方法.

## License and contributing

The method is published under **Creative Commons Attribution-ShareAlike 4.0** (`../../LICENSE`):
you may use, translate and adapt it, with attribution and under the same license. Improvements to
**this** repository come in as pull requests from a fork, with their evidence, and are merged by a
maintainer after review; nobody else writes to `main`. The process is in `../../CONTRIBUTING.md`.

The clients of the source systems are anonymised ("the Health Fund", "the Association"); the
numbers, dates and commits are real.

## Origin

Pablo Kuschnirof (RPAForce / Yujin) and Sumi (the Claude Code session that works with him), from
`yujin-forge`, `Authorizations` and `Kikan`. October 2026.
