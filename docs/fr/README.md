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
| `docs/ESCALERA_METODOLOGICA.md` | Le document principal : la thèse, d'où vient la méthode, la ligne de temps (quand on gravit chaque échelon et ce qui se passe entre-temps : infrastructure, CI/CD, ingestion des exigences, développement, tests de bout en bout, regard humain, tests humains), les vingt-quatre échelons avec leur fiche (les six derniers, de qualité opérationnelle : observabilité, persistance, vulnérabilités, performance, et les deux supervisions), ce qui manque encore, les travaux connexes (ce qui existe de semblable dans le monde et en quoi cette méthode s'en distingue), et le glossaire. |
| `docs/EVOLUTIVO_CORRECTIVO.md` | Le chemin pour un système qui existe déjà et qui n'est pas né avec la méthode : les trois cas d'utilisation de la méthode, le principe de normaliser sans réécrire, les huit stations de normalisation (N0 à N7) avec leurs contrats et leurs prompts, la boucle en mode correctif et évolutif, et la liste de sortie du tronçon. |
| `docs/REFERENCIAS.md` | Les cas réels derrière la méthode, numérotés (« Ref. N »), avec date et preuve, pour que les procédures restent propres et que le détail reste à un clic. Comprend les chronologies des trois systèmes et la table des échecs par échelon. |
| `docs/peldanos/peldano-NN-*.md` | Le contrat de chaque échelon : quand, contexte requis, prompts en anglais avec leur traduction et, avant chacun d'eux, le bloc « Avant d'envoyer le prompt » avec les fichiers que vous devez construire vous-même et leur contenu ; résultat attendu, vérification de complétude sans lire de code, signaux d'alarme. |
| `docs/peldanos/README.md` | L'index des contrats. |
| `docs/MANUAL_CURSO.md` | Le cours : calendrier, vingt-quatre leçons avec tâches pratiques et prompts, projet-guide (« Turnera »), liste de mise en production. |
| `docs/MANUAL_CURSO_EVOLUTIVO.md` | La partie 2 du cours : le projet-guide hérité (« Turnera héritée »), dix leçons (N0 à N7, R1 et R2) pour normaliser un legacy puis le corriger et le faire évoluer. |
| `docs/DECISIONES.md` | Les décisions du projet, avec date et mots textuels. La méthode s'applique à elle-même. |
| `docs/TRABAJO_COLABORATIVO.md` | Comment s'applique la méthode quand plusieurs développeurs, chacun avec son agent, travaillent sur la même branche : les sept règles de la branche partagée, comment se répartissent les échelons, et les prompts. |
| `docs/CAPACITACION_JUNIOR.md` | L'impact de la méthode sur la formation des développeurs juniors : quels axes perdent du poids, lesquels en gagnent, avec quel objectif et comment former un junior à l'ère de l'après-programmation à la main. |
| `docs/ANEXO_HEURISTICAS.md` | Annexe H, transversale à la Boucle de Construction : dix-huit règles de qualité du code et vingt-sept d'utilisabilité, chacune avec un identifiant stable, une sévérité, un vérificateur nommé et des seuils déclarés par le propriétaire ; regroupement par convergence fonctionnelle, profils et la matrice d'où dérivent le menu, le routage et les permissions ; deux interrupteurs et les tests d'acceptation qui prouvent que la barrière veille réellement. |
| `docs/PLAN_CURSO_MENTORING.md` | Le brouillon du plan commercial du cours et du mentoring. |
| `docs/html/` | Les versions HTML pour une lecture confortable, avec le bouton qui traduit chaque prompt. Elles ne s'éditent pas à la main. |
| `build/` | Le convertisseur de markdown en HTML, l'extracteur et vérificateur de prompts, et le script qui assemble le tout. |
| `prompts/` | Les prompts en anglais extraits des contrats, générés ; ils ne s'éditent pas à la main. |

## Comment le lire

Commencez par `docs/ESCALERA_METODOLOGICA.md`, ou par son HTML dans `docs/html/`. Si vous tombez
sur un mot étrange, le glossaire est à la fin. Ensuite, le contrat de l'échelon qui vous
intéresse, et le manuel du cours si vous voulez l'appliquer. Si ce que vous avez n'est pas un
dossier vide mais un système qui tourne déjà et qu'il faut corriger ou faire grandir, le chemin
est `docs/EVOLUTIVO_CORRECTIVO.md` et la partie 2 du manuel.

## Comment régénérer les HTML

```
node build/build.mjs
```

Il vérifie que les prompts en anglais sont identiques dans les huit versions (ceux des contrats et
ceux du chemin évolutif-correctif) et produit, pour chaque langue, `ESCALERA_METODOLOGICA.html`,
`REFERENCIAS.html`, `EVOLUTIVO_CORRECTIVO.html`, `MANUAL_CURSO.html`,
`MANUAL_CURSO_EVOLUTIVO.html`, `CAPACITACION_JUNIOR.html`, `TRABAJO_COLABORATIVO.html` et
`CONTRATOS_DE_PELDANO.html` (l'espagnol dans `docs/html/`, les autres dans
`docs/html/<langue>/`).

## Langues

L'espagnol est la source de vérité. La documentation existe dans les huit langues de NAC3 :
espagnol (`docs/`), anglais (`docs/en/`), portugais (`docs/pt/`), français (`docs/fr/`), allemand
(`docs/de/`), italien (`docs/it/`), japonais (`docs/ja/`) et chinois (`docs/zh/`). Chaque dossier a
son README, le document principal, les références, les vingt-quatre contrats, le chemin
évolutif-correctif et les deux parties du manuel-cours. Les
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
n'écrit dans `main`. Le processus est dans `CONTRIBUTING.md`. L'échelon 23 de la méthode demande
que chaque rétrospective se termine par une proposition concrète de changement à l'échelle ; c'est
la forme attendue de la contribution.

Les clients des systèmes d'origine sont anonymisés (« la Mutuelle », « l'Association ») ; les
chiffres, les dates et les commits sont réels.

## Le style de ce projet

Différent du reste de mes dépôts, et à dessein : première personne, prose expliquée, langage de tous
les jours, caractères latins avec accents, et un glossaire pour chaque sigle et chaque expression
familière. C'est écrit pour des personnes qui n'ont pas vécu les projets. Voir `CLAUDE.md`.
