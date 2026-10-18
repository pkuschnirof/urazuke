# Urazuke — the evidence method

*Urazuke* (裏付け) is a Japanese word that names the backing a claim has: what holds it up from
behind. The verb, *urazukeru*, is "to back with proof". That is the method.

A method for building software with artificial intelligence that comes out robust, ready for
production, **without the project owner ever having to read a single line of code**. I distilled
it from three real systems that are in production today, leaning on the systems engineering we
have always had and on what those systems showed me about where the models apply it in a fragile
way.

Author: Pablo Kuschniroff, assisted by Claude Code. Published under Creative Commons BY-SA 4.0.
Public presentation: [yujin.app/urazuke](https://yujin.app/urazuke/).

This folder holds the English version of the method. Spanish is the source of truth and this is a
translation; if the two ever disagree, the Spanish version wins and the English one gets fixed.

## The thesis in one sentence

AI does not interrupt the method: it continues it. The industry stopped trusting the author of the
code twenty years ago and learned to demand evidence instead of reading it; the model is the next
author, not the first untrustworthy one. The only new thing is that this author also manufactures
the evidence, and that is why the evidence has to prove itself.

## What is here

| File | What it is |
|---|---|
| `ESCALERA_METODOLOGICA.md` | The main document: the thesis, where the method comes from, the timeline (when each step is climbed and what happens in between: infrastructure, CI/CD, requirements intake, development, end-to-end tests, the human look, human testing), the sixteen steps with their card, what is still missing, and the glossary. |
| `EVOLUTIVO_CORRECTIVO.md` | The path for a system that already exists and was not born with the method: the three use cases of the method, the principle of normalizing without rewriting, the eight normalization stations (N0 to N7) with their contracts and prompts, the loop in corrective and evolutive mode, and the exit list of the stretch. |
| `REFERENCIAS.md` | The real cases behind the method, numbered ("Ref. N"), with date and evidence, so that the procedures stay clean and the detail is one click away. Includes the chronologies of the three systems and the table of failures by step. |
| `peldanos/peldano-NN-*.md` | The contract of each step: when, required context, the prompts in English with their explanation and, before each one, the "Before sending the prompt" block with the files you have to build yourself and their content; the expected result, the completeness check without reading code, the warning signs. |
| `peldanos/README.md` | The index of the contracts. |
| `MANUAL_CURSO.md` | The course: calendar, sixteen lessons with hands-on tasks and prompts, the guide project ("Turnera"), the go-live checklist. |
| `MANUAL_CURSO_EVOLUTIVO.md` | Part 2 of the course: the inherited guide project ("Turnera inherited"), ten lessons (N0 to N7, R1 and R2) to normalize a legacy system and then correct it and evolve it. |
| `../DECISIONES.md` | The project's decisions, with date and exact words. The method applies to itself. Spanish only. |
| `../PLAN_CURSO_MENTORING.md` | The draft of the commercial plan for the course and the mentoring. Spanish only. |
| `../html/en/` | The HTML versions for comfortable reading, with the button that translates each prompt. Not edited by hand. |
| `../../build/` | The markdown-to-HTML converter, the prompt extractor and checker, and the script that builds everything. |
| `../../prompts/` | The English prompts extracted from the contracts, generated; not edited by hand. |

## How to read it

Start with `ESCALERA_METODOLOGICA.md`, or with its HTML in `../html/en/`. If you run into an odd
word, the glossary is at the end. Then the contract of whichever step interests you, and the course
manual if you want to apply it. If what you have is not an empty folder but a system that already
runs and has to be corrected or made to grow, the path is `EVOLUTIVO_CORRECTIVO.md` and part 2 of
the manual.

## How to regenerate the HTML

```
node build/build.mjs
```

It verifies that the English prompts are identical in the eight versions (the ones in the
contracts and the ones on the evolutive-corrective path) and produces, for each language,
`ESCALERA_METODOLOGICA.html`, `REFERENCIAS.html`, `EVOLUTIVO_CORRECTIVO.html`,
`MANUAL_CURSO.html`, `MANUAL_CURSO_EVOLUTIVO.html` and `CONTRATOS_DE_PELDANO.html` (Spanish in
`docs/html/`, the others in `docs/html/<language>/`).

## Languages

Spanish is the source of truth. The documentation exists in the eight NAC3 languages: Spanish
(`docs/`), English (`docs/en/`), Portuguese (`docs/pt/`), French (`docs/fr/`), German (`docs/de/`),
Italian (`docs/it/`), Japanese (`docs/ja/`) and Chinese (`docs/zh/`). Each folder has its README,
the main document, the references, the sixteen contracts, the evolutive-corrective path and the
two parts of the course manual. The prompts for the model are a single piece in English,
identical in every version, with their translation into the document's language alongside;
`node build/prompts.mjs --check` fails if a translation altered them. The name is never
translated; the subtitle is: *the evidence method*, *o método da evidência*, *la méthode de
la preuve*, *die Nachweis-Methode*, *il metodo del riscontro*,
裏付けの方法, 验证方法.

The decisions (`docs/DECISIONES.md`) and the course plan stay in Spanish only because they quote
exact words.

## License and how to contribute

The method is published under **Creative Commons Attribution-ShareAlike 4.0** (`LICENSE`): you may
use, translate and adapt it, with attribution and sharing alike. Improvements to **this** repository
come in by pull request from a fork, with their evidence, and a maintainer merges them after
reviewing them; nobody else writes to `main`. The process is in `CONTRIBUTING.md`. Step 15 of the
method asks that every retrospective end in a concrete proposal to change the ladder; that is the
expected way to contribute.

The public repository of the method is
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

The clients of the source systems are anonymised ("the Health Fund", "the Association"); the
numbers, the dates and the commits are real.

## The style of this project

Different from the rest of my repositories, and on purpose: first person, explained prose, everyday
language, and a glossary for every acronym and every colloquial expression. It is written for
people who did not live through the projects. See `CLAUDE.md`.
