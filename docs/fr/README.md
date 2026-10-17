# Urazuke — la méthode de la preuve

*Urazuke* (裏付け) est un mot japonais qui désigne l'appui dont dispose une affirmation : ce qui la
soutient par derrière. Le verbe, *urazukeru*, signifie « étayer par des preuves ». C'est cela, la
méthode.

Une méthode pour construire du logiciel avec l'intelligence artificielle qui en sorte robuste, prêt
pour la production, **sans que le propriétaire du projet ait à lire une seule ligne de code**.
Distillée à partir de trois systèmes réels qui sont aujourd'hui en production, coups durs compris.

Ce dossier contient la version française de la méthode. L'espagnol est la source de vérité ; si les
deux versions divergent, la version espagnole prévaut et la française est corrigée.

## La thèse en une phrase

L'IA n'interrompt pas la méthode : elle la continue. L'industrie a cessé de faire confiance à
l'auteur du code il y a vingt ans et a appris à exiger des preuves plutôt qu'à le lire ; le modèle
est l'auteur suivant, pas le premier dont on se méfie. La seule chose véritablement nouvelle, c'est
que cet auteur fabrique aussi la preuve, et c'est pourquoi la preuve doit se prouver elle-même.

## Ce qu'il y a ici

| Fichier | Ce que c'est |
|---|---|
| `ESCALERA_METODOLOGICA.md` | Le document principal : la thèse, le relevé des trois dépôts d'origine (moments et jalons avec leurs commits), les seize échelons de l'échelle avec leur fiche, les échecs réels rapportés aux échelons, ce qui manque encore, et le glossaire. |
| `peldanos/peldano-NN-*.md` | Le contrat de chaque échelon : contexte requis, les prompts (en anglais, source unique, identiques dans toutes les langues), le résultat attendu, la vérification de complétude et les signaux d'alarme. C'est ce qu'un élève exécute et ce qui sera ensuite exporté vers Forge. |
| `peldanos/README.md` | L'index des contrats, avec la phase de chacun. |
| `MANUAL_CURSO.md` | Le cours : seize leçons, une par échelon, avec le concept expliqué, la tâche pratique pas à pas avec les prompts, la vérification de complétude, le livrable, les erreurs typiques et l'exemple sur le projet-guide (« Turnera »). Se termine par la liste de mise en production. |

Le registre des décisions (`../DECISIONES.md`) reste en espagnol uniquement, car il cite les mots
exacts du propriétaire.

## Comment le lire

Commencez par `ESCALERA_METODOLOGICA.md`, ou par son HTML dans `../html/fr/`. Si vous tombez sur
un mot étrange, le glossaire est à la fin. Ensuite, le contrat de l'échelon qui vous intéresse.

## Langues

L'espagnol est la source de vérité. La documentation existe dans les huit langues de NAC3
(espagnol, anglais, portugais, français, allemand, italien, japonais et chinois). Les prompts
destinés au modèle sont une pièce unique en anglais, identique dans toutes les versions, expliquée
dans la langue du lecteur. Le nom ne se traduit pas ; le sous-titre, si : *el método de la
evidencia*, *the evidence method*, *o método da evidência*, *la méthode de la preuve*, *die
Nachweis-Methode*, *il metodo del riscontro*, 裏付けの方法, 验证方法.

## Licence et contribution

La méthode est publiée sous **Creative Commons Attribution – Partage dans les mêmes conditions
4.0** (`../../LICENSE`) : on peut l'utiliser, la traduire et l'adapter, avec attribution et sous la
même licence. Les améliorations à **ce** dépôt entrent par pull request depuis un fork, avec leur
preuve, et sont fusionnées par un mainteneur après révision ; personne d'autre n'écrit dans
`main`. Le processus est dans `../../CONTRIBUTING.md`.

Les clients des systèmes d'origine sont anonymisés (« la Mutuelle », « l'Association ») ; les
chiffres, les dates et les commits sont réels.

## Origine

Pablo Kuschnirof (RPAForce / Yujin) et Sumi (la session Claude Code qui travaille avec lui), à
partir de `yujin-forge`, `Autorisations` et `Kikan`. Octobre 2026.
