# Urazuke — la méthode de la preuve

*Urazuke* (裏付け) est un mot japonais qui désigne l'appui dont dispose une affirmation : ce qui la
soutient par derrière. Le verbe, *urazukeru*, signifie « étayer par des preuves ». C'est cela, la
méthode.

Une méthode pour construire du logiciel avec l'intelligence artificielle qui en sorte robuste, prêt
pour la production, **sans que le propriétaire du projet ait à lire une seule ligne de code**. Je
l'ai distillée de trois systèmes réels qui sont aujourd'hui en production, en m'appuyant sur
l'ingénierie des systèmes de toujours et sur ce que ces systèmes m'ont montré des endroits où les
modèles l'appliquent de manière fragile.

Auteur : Pablo Kuschniroff, assisté par Claude Code. Publié sous Creative Commons BY-SA 4.0.
Présentation publique : [yujin.app/urazuke](https://yujin.app/urazuke/).

Ce dossier (`docs/fr/`) contient la version française de la méthode. L'espagnol (`docs/`) est la
source de vérité et le français est une traduction ; si les deux versions divergent, la version
espagnole prévaut et la française est corrigée. Le dépôt public de la méthode est
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## La thèse en une phrase

L'IA n'interrompt pas la méthode : elle la continue. L'industrie a cessé de faire confiance à
l'auteur du code il y a vingt ans et a appris à exiger des preuves plutôt qu'à le lire ; le modèle
est l'auteur suivant, pas le premier dont on se méfie. La seule chose nouvelle, c'est que cet auteur
fabrique aussi la preuve, et c'est pourquoi la preuve doit se prouver elle-même.

## Ce qu'il y a ici

| Fichier | Ce que c'est |
|---|---|
| `docs/ESCALERA_METODOLOGICA.md` | Le document principal : la thèse, d'où vient la méthode, la ligne de temps (quand on gravit chaque échelon et ce qui se passe entre-temps : infrastructure, CI/CD, ingestion des exigences, développement, tests de bout en bout, regard humain, tests humains), les seize échelons avec leur fiche, ce qui manque encore, et le glossaire. |
| `docs/REFERENCIAS.md` | Les cas réels derrière la méthode, numérotés (« Ref. N »), avec date et preuve, pour que les procédures restent propres et que le détail reste à un clic. Comprend les chronologies des trois systèmes et la table des échecs par échelon. |
| `docs/peldanos/peldano-NN-*.md` | Le contrat de chaque échelon : quand, contexte requis, prompts en anglais avec leur traduction et, avant chacun d'eux, le bloc « Avant d'envoyer le prompt » avec les fichiers que vous devez construire vous-même et leur contenu ; résultat attendu, vérification de complétude sans lire de code, signaux d'alarme. |
| `docs/peldanos/README.md` | L'index des contrats. |
| `docs/MANUAL_CURSO.md` | Le cours : calendrier, seize leçons avec tâches pratiques et prompts, projet-guide (« Turnera »), liste de mise en production. |
| `docs/DECISIONES.md` | Les décisions du projet, avec date et mots textuels. La méthode s'applique à elle-même. |
| `docs/PLAN_CURSO_MENTORING.md` | Le brouillon du plan commercial du cours et du mentoring. |
| `docs/html/` | Les versions HTML pour une lecture confortable, avec le bouton qui traduit chaque prompt. Elles ne s'éditent pas à la main. |
| `build/` | Le convertisseur de markdown en HTML, l'extracteur et vérificateur de prompts, et le script qui assemble le tout. |
| `prompts/` | Les prompts en anglais extraits des contrats, générés ; ils ne s'éditent pas à la main. |

## Comment le lire

Commencez par `docs/ESCALERA_METODOLOGICA.md`, ou par son HTML dans `docs/html/`. Si vous tombez
sur un mot étrange, le glossaire est à la fin. Ensuite, le contrat de l'échelon qui vous intéresse,
et le manuel du cours si vous voulez l'appliquer.

## Comment régénérer les HTML

```
node build/build.mjs
```

Il vérifie que les prompts en anglais sont identiques dans les huit versions et produit, pour chaque
langue, `ESCALERA_METODOLOGICA.html`, `REFERENCIAS.html`, `MANUAL_CURSO.html` et
`CONTRATOS_DE_PELDANO.html` (l'espagnol dans `docs/html/`, les autres dans `docs/html/<langue>/`).

## Langues

L'espagnol est la source de vérité. La documentation existe dans les huit langues de NAC3 :
espagnol (`docs/`), anglais (`docs/en/`), portugais (`docs/pt/`), français (`docs/fr/`), allemand
(`docs/de/`), italien (`docs/it/`), japonais (`docs/ja/`) et chinois (`docs/zh/`). Chaque dossier a
son README, le document principal, les références, les seize contrats et le manuel-cours. Les
prompts destinés au modèle sont une pièce unique en anglais, identique dans toutes les versions,
avec leur traduction dans la langue du document juste à côté ; `node build/prompts.mjs --check`
échoue si une traduction les a altérés. Le nom ne se traduit pas ; le sous-titre, si : *the
evidence method*, *o método da evidência*, *la méthode de la preuve*, *die Nachweis-Methode*, *il
metodo del riscontro*, 裏付けの方法, 验证方法.

Les décisions (`docs/DECISIONES.md`) et le plan du cours restent uniquement en espagnol parce
qu'ils citent des mots textuels.

## Licence et comment contribuer

La méthode est publiée sous **Creative Commons Attribution – Partage dans les mêmes conditions
4.0** (`LICENSE`) : on peut l'utiliser, la traduire et l'adapter, avec attribution et en partageant
dans les mêmes conditions. Les améliorations à **ce** dépôt entrent par pull request depuis un
fork, avec leur preuve, et sont fusionnées par un mainteneur après révision ; personne d'autre
n'écrit dans `main`. Le processus est dans `CONTRIBUTING.md`. L'échelon 15 de la méthode demande
que chaque rétrospective se termine par une proposition concrète de changement à l'échelle ; c'est
la forme attendue de la contribution.

Les clients des systèmes d'origine sont anonymisés (« la Mutuelle », « l'Association ») ; les
chiffres, les dates et les commits sont réels.

## Le style de ce projet

Différent du reste de mes dépôts, et à dessein : première personne, prose expliquée, langage de tous
les jours, caractères latins avec accents, et un glossaire pour chaque sigle et chaque expression
familière. C'est écrit pour des personnes qui n'ont pas vécu les projets. Voir `CLAUDE.md`.
