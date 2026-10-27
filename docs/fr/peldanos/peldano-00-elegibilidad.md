# Étape 0 — Ce projet peut-il être abordé ainsi ? (contrat de l'échelon)

**Tronçon :** démarrage.
**Quand :** une seule fois, avant d'ouvrir le dépôt et avant toute autre chose.
**Forme :** conversation : l'agent évalue et pose des questions ; vous décidez.
**Taille :** obligatoire dans tout projet, si petit soit-il.
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

Ce qui suit est la liste générique. Les fichiers concrets que vous devez avoir faits avant chaque
prompt, avec leur contenu et leur état minimum, sont dans la section 2, dans le bloc « Avant
d'envoyer le prompt » qui précède chacun d'eux.
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

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous (ou le métier avec vous) qui le
faites, pas l'agent :

- `docs/INITIAL_SURVEY.md` : le relevé initial. C'est vous qui l'écrivez, à la main, après avoir
  parlé avec le client (c'est le résultat de l'ingestion de la phase 0). Une demi-page à une page,
  en prose, pas en formulaire, avec six choses : (1) la demande : ce que veut le client, avec ses
  mots, pour qui, et ce qui se passe aujourd'hui sans le système (le cahier, le tableur, la
  personne qui le fait à la main) ; (2) la technologie : ce qu'il y a ou ce qui est proposé, s'il
  existe un système antérieur, si ce système a un dépôt et comment il est géré (branches, qui
  pousse, s'il y a des tests) ; (3) la testabilité : si les écrans peuvent être pilotés par
  programme, et si chaque élément de l'interface peut être trouvé, cliqué, saisi et lu ; si vous
  ne le savez pas, dites-le ; (4) le propriétaire du domaine : qui c'est, avec son nom et son
  rôle, et combien de temps il a par semaine pour décider ; (5) la conséquence d'une erreur :
  argent, santé, exploitation, aucune ; (6) les environnements : s'il y aura un environnement de
  test, si l'agent pourra y accéder, s'il existe une production consultable en lecture seule. Ce
  que vous ne savez pas reste écrit « je ne sais pas » : ne le complétez pas vous-même pour que
  l'agent ne pose pas la question, parce que tout l'intérêt de l'échelon est de voir ce qu'il
  demande.
- `docs/ELIGIBILITY_CRITERIA.md` : la fiche de critères. Vous la copiez du document principal (la
  fiche de l'échelon 0 : les deux excluants X1 et X2 et les critères D1 à D10 qui pondèrent), avec
  une colonne vide pour la réponse, une autre pour la source et une autre pour le vert ou le
  rouge. Ne la remplissez pas vous-même : c'est l'agent qui la remplit.
- Le dossier du projet, créé, avec l'agent ouvert dedans et encore rien d'autre que ces deux
  fichiers dans `docs/`.
- État minimum acceptable : les deux fichiers existent, le relevé touche les six points même si
  plusieurs disent « je ne sais pas », et l'agent est posé dans le dossier.
> We are going to assess whether this project can be run with the Urazuke method. Read the
> initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`. First, evaluate whether the survey is sufficient to answer
> every criterion. If any criterion cannot be answered from the survey, ask me for the missing
> information before going on; do not assume. Then fill in the sheet criterion by criterion:
> the answer, where it comes from, and for each exclusionary criterion whether it is green or
> red. Do not decide: present me the completed sheet with your reading and your doubts, and I
> will decide.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [fr]
> Nous allons évaluer si ce projet peut être mené avec la méthode Urazuke. Lis le relevé initial
> dans `docs/INITIAL_SURVEY.md` et la fiche de critères dans `docs/ELIGIBILITY_CRITERIA.md`.
> D'abord, évalue si le relevé suffit pour répondre à chaque critère. Si un critère ne peut pas
> être répondu à partir du relevé, demande-moi l'information manquante avant de continuer ; ne
> suppose rien. Ensuite remplis la fiche critère par critère : la réponse, d'où elle vient, et
> pour chaque critère excluant s'il est au vert ou au rouge. Ne décide pas : présente-moi la fiche
> complète avec ta lecture et tes doutes, et c'est moi qui décide.
>
> Quand tu as besoin d'une décision de ma part, demande-la avec les quatre parties de l'UX-28
> (`docs/ANEXO_HEURISTICAS.md`) et dans cet ordre : les données qui rendent la question
> nécessaire, énumérées ; un paragraphe de cinq lignes au plus qui les relie et laisse voir la
> question ; la question avec ses réponses possibles numérotées ; et ta recommandation. Dis-le à
> la profondeur technique que le projet a déclarée dans `communication_depth` —`beginner`,
> `decision_maker` ou `technical`— ; si le projet n'en a déclaré aucune, utilise `decision_maker`.
>
> Réponds dans ma langue.

Ce que je lui demande : qu'il lise les deux intrants (le relevé et la fiche de critères) ;
qu'**avant de répondre il évalue si le relevé suffit** et, s'il ne suffit pas, qu'il pose la
question au lieu de supposer (c'est la clause centrale de tous les prompts de la méthode) ; qu'il
remplisse la fiche avec la source de chaque réponse, pour qu'on puisse ensuite remonter la piste ;
qu'il marque les critères excluants au vert ou au rouge ; et qu'il **ne décide pas**, parce que
l'éligibilité, c'est moi qui la décide. La dernière ligne lui demande de répondre dans ma langue,
parce que le prompt est en anglais mais la conversation n'a aucune raison de l'être.

**De clôture :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- Votre décision, en une ligne, prise après avoir lu la fiche complète que l'agent a présentée :
  ça passe, ça ne passe pas, ou ça passe sous conditions. S'il y a des conditions, écrivez-les
  avant de coller le prompt, chacune vérifiable (« accès en lecture à la production avant
  l'échelon 3 », oui ; « que le client collabore », non), et pas plus de trois.
- Les réponses que vous avez données aux questions de l'agent, données dans cette même session de
  chat : le prompt lui demande de les inclure dans la fiche finale, et si la session est une
  autre, il ne les a pas.
- État minimum acceptable : chaque critère de la fiche a une réponse et une source en vue, et vous
  avez déjà décidé. Si vous hésitez encore, n'envoyez pas la clôture : continuez à poser des
  questions.
> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [fr]
> Décision : [ça passe / ça ne passe pas / ça passe sous ces conditions : …]. Écris la fiche
> finale dans `docs/ELIGIBILITY.md` avec la date, qui a décidé, la réponse à chaque critère avec
> sa source, et les conditions s'il y en a. Inclus les questions que tu as posées et mes réponses.
>
> Quand tu as besoin d'une décision de ma part, demande-la avec les quatre parties de l'UX-28
> (`docs/ANEXO_HEURISTICAS.md`) et dans cet ordre : les données qui rendent la question
> nécessaire, énumérées ; un paragraphe de cinq lignes au plus qui les relie et laisse voir la
> question ; la question avec ses réponses possibles numérotées ; et ta recommandation. Dis-le à
> la profondeur technique que le projet a déclarée dans `communication_depth` —`beginner`,
> `decision_maker` ou `technical`— ; si le projet n'en a déclaré aucune, utilise `decision_maker`.

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
