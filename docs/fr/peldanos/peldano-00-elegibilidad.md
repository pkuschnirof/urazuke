# Étape 0 — Ce projet peut-il être abordé ainsi ? (contrat de l'échelon)

**Tronçon :** démarrage.
**Quand :** une seule fois, la première semaine, avant d'ouvrir le dépôt et avant toute autre
chose. Une heure de travail.
**Forme :** conversation : l'agent évalue et pose des questions ; vous décidez.
**Taille :** obligatoire dans tout projet, si petit soit-il. Cela prend une heure ; cela épargne des
mois.
**État :** les critères excluants X1 et X2 sont clos ; les critères qui pondèrent (D1 à D10), je
suis encore en train de les calibrer et je les marque comme hypothèses.

## À quoi il sert

Ne vous engagez pas dans un projet où la méthode ne peut pas fonctionner. Si l'agent ne va pas
pouvoir se vérifier lui-même de bout en bout, ou s'il n'y a pas de propriétaire du domaine qui
décide, la méthode se dégrade en « programmer avec l'IA » et c'est vous qui finissez par lire du
code. Cet échelon est la porte d'entrée : on la franchit une fois, et si on ne la franchit pas,
mieux vaut le savoir avant qu'après.

Et une idée de fond que je veux que vous ayez bien en tête : **la méthode ne convient pas à
n'importe quel projet, et ce n'est pas un défaut**. Une méthode qui promet de servir à tout ne dit
rien du tout. Ce que fait cet échelon, c'est poser la frontière par écrit, pour que la décision
d'entrer ou de ne pas entrer soit une décision et non un espoir. Les deux critères excluants
viennent de projets que j'ai refusés, pas de ceux que j'ai acceptés
[Ref. 46](../REFERENCIAS.md#ref-46).

## 1. Contexte requis

Nommé de façon générique ; l'agent évalue si cela suffit et demande ce qui manque.

- Relevé de la demande : ce que veut le client, pour qui, et ce qui se passe aujourd'hui sans le
  système.
- Relevé technologique : quelle technologie existe ou est proposée, s'il y a un système antérieur,
  si ce système a un dépôt et comment il est géré.
- Relevé de testabilité : si les écrans peuvent être exécutés par programme et si chaque élément
  de l'interface est accessible avec ses différentes méthodes (clic, saisie, lecture d'état), de
  sorte qu'un test parcoure l'écran et vérifie l'effet dans le backend.
- Qui est le propriétaire du domaine et combien de temps il a pour décider.
- Quelle conséquence a une erreur (argent, santé, exploitation, aucune).
- Environnements et accès : s'il y aura un environnement de test, si l'agent peut y accéder, s'il
  existe une production consultable en lecture seule.

## 2. Prompts

Les prompts sont en anglais, qui est la langue dans laquelle les modèles suivent les instructions
avec le plus de précision et le moins de jetons. Chacun vient avec sa traduction (dans le HTML, avec
un bouton), et dessous l'explication de ce que je lui demande et de pourquoi chaque clause est là.
Au modèle, on colle l'anglais.

**Initial :**

> We are going to assess whether this project can be run with the Urazuke method. Read the
> initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`. First, evaluate whether the survey is sufficient to answer
> every criterion. If any criterion cannot be answered from the survey, ask me for the missing
> information before going on; do not assume. Then fill in the sheet criterion by criterion:
> the answer, where it comes from, and for each exclusionary criterion whether it is green or
> red. Do not decide: present me the completed sheet with your reading and your doubts, and I
> will decide. Reply in my language.

> [fr]
> Nous allons évaluer si ce projet peut être mené avec la méthode Urazuke. Lis le relevé initial
> dans `docs/INITIAL_SURVEY.md` et la fiche de critères dans `docs/ELIGIBILITY_CRITERIA.md`.
> D'abord, évalue si le relevé suffit pour répondre à chaque critère. Si un critère ne peut pas
> être répondu à partir du relevé, demande-moi l'information manquante avant de continuer ; ne
> suppose rien. Ensuite remplis la fiche critère par critère : la réponse, d'où elle vient, et
> pour chaque critère excluant s'il est au vert ou au rouge. Ne décide pas : présente-moi la fiche
> complète avec ta lecture et tes doutes, et c'est moi qui décide. Réponds dans ma langue.

Ce que je lui demande : qu'il lise les deux intrants (le relevé et la fiche de critères) ;
qu'**avant de répondre il évalue si le relevé suffit** et, s'il ne suffit pas, qu'il pose la
question au lieu de supposer (c'est la clause centrale de tous les prompts de la méthode) ; qu'il
remplisse la fiche avec la source de chaque réponse, pour qu'on puisse ensuite remonter la piste ;
qu'il marque les critères excluants au vert ou au rouge ; et qu'il **ne décide pas**, parce que
l'éligibilité, c'est moi qui la décide. La dernière ligne lui demande de répondre dans ma langue,
parce que le prompt est en anglais mais la conversation n'a aucune raison de l'être.

**De clôture :**

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.

> [fr]
> Décision : [ça passe / ça ne passe pas / ça passe sous ces conditions : …]. Écris la fiche
> finale dans `docs/ELIGIBILITY.md` avec la date, qui a décidé, la réponse à chaque critère avec
> sa source, et les conditions s'il y en a. Inclus les questions que tu as posées et mes réponses.

Ce que je lui demande : qu'il laisse la décision écrite avec sa date et son propriétaire
(échelon 6), avec les conditions s'il y en a, et avec la trace des questions et des réponses, qui
est la preuve qu'il n'a rien supposé.

## 3. Résultat attendu

Un fichier `docs/ELIGIBILITY.md` (ou le nom qu'utilise votre projet), d'une page, avec :

- La date et qui a décidé.
- Les deux critères excluants avec leur réponse et leur source :
  - X1 : il existe un dépôt accessible et géré de façon standard (ou le projet est nouveau).
  - X2 : l'interface peut être exécutée par programme et chaque élément est accessible avec ses
    différentes méthodes, avec vérification de l'effet dans le backend.
- Les critères qui pondèrent, chacun avec sa réponse, sa source et son poids (quand le poids sera
  calibré).
- La décision : ça passe, ça ne passe pas, ou ça passe sous conditions, avec les conditions
  écrites.
- Les questions que l'agent a posées et les réponses, pour que la trace reste.

## 4. Vérification de complétude (vous la faites vous-même, sans lire de code)

- Les deux critères excluants ont-ils une réponse explicite et une source ? Si l'un est au rouge,
  la décision est-elle « ça ne passe pas », ou a-t-elle une condition qui le résout ?
- Y a-t-il un critère répondu par « je suppose que oui » ou « probablement » ? S'il y en a un,
  l'échelon n'est pas gravi : l'agent devait poser la question.
- La décision est-elle écrite avec une date et un nom ?
- Les conditions (s'il y en a) sont-elles vérifiables ? (« Avoir un accès en lecture à la
  production avant l'échelon 3 », oui ; « que le client collabore », non.)

## 5. Signaux d'alarme

- L'agent a rempli toute la fiche sans poser une seule question. Soit le relevé était parfait (il
  ne l'est jamais), soit il a supposé.
- La décision est « ça passe sous conditions » et les conditions sont plus de trois. C'est
  probablement un « ça ne passe pas » qu'on ne veut pas dire.
- Le critère X2 a été répondu par « oui, avec un peu de travail ». Si les écrans ne peuvent pas
  être pilotés par programme aujourd'hui, ce « peu de travail », c'est le projet entier.
