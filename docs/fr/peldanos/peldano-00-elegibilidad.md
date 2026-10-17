# Étape 0 — Ce projet peut-il être abordé ainsi ? (contrat de l'échelon)

**Phase :** démarrage (une fois par projet, avant d'ouvrir le dépôt).
**Forme :** conversation (l'agent évalue et pose des questions ; le propriétaire décide).
**Taille :** obligatoire dans tout projet, si petit soit-il. Cela prend une heure ; cela épargne
des mois.
**État :** en cours d'élaboration avec Pablo. Les critères excluants X1 et X2 sont confirmés ; les
critères pondérés (D1 à D10) restent des hypothèses sans poids.

## À quoi il sert

À ne pas s'engager dans un projet où la méthode ne peut pas fonctionner. Si l'agent ne pourra pas
se vérifier lui-même de bout en bout, ou s'il n'y a pas de propriétaire du domaine qui décide, la
méthode se dégrade en « programmer avec l'IA » et l'humain finit par lire du code. Cet échelon est
la porte d'entrée : on la franchit une fois, et si on ne peut pas la franchir, mieux vaut le savoir
avant qu'après.

Il y a une idée de fond qu'il vaut mieux dire explicitement : **la méthode ne convient pas à
n'importe quel projet, et ce n'est pas un défaut**. Une méthode qui promet de servir à tout ne dit
rien. Ce que fait cet échelon, c'est mettre la frontière par écrit, pour que la décision d'entrer
ou non soit une décision et non un espoir.

## 1. Contexte requis

Nommé de façon générique ; l'agent évalue s'il suffit et demande ce qui manque.

- Relevé de la demande : ce que veut le client, pour qui, et ce qui se passe aujourd'hui sans le
  système.
- Relevé technologique : quelle technologie existe ou est proposée, s'il existe un système
  antérieur, si ce système a un dépôt et comment il est géré.
- Relevé de testabilité : si les écrans peuvent être pilotés par programme et si chaque élément de
  l'interface est accessible avec ses différentes méthodes (clic, saisie, lecture d'état), de sorte
  qu'un test parcoure l'écran et vérifie l'effet sur le backend.
- Qui est le propriétaire du domaine et combien de temps il a pour décider.
- Quelle conséquence a une erreur (argent, santé, exploitation, aucune).
- Environnements et accès : s'il y aura un environnement de test, si l'agent peut y accéder, si la
  production peut être consultée en lecture seule.

## 2. Prompts

Les prompts sont en anglais, la langue dans laquelle les modèles suivent les instructions avec le
plus de précision et le moins de jetons. Sous chacun, l'explication en français de ce que nous
demandons et pourquoi chaque clause est là.

**Initial :**

> We are going to assess whether this project can be run with the Urazuke method. Read the
> initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`. First, evaluate whether the survey is sufficient to answer
> every criterion. If any criterion cannot be answered from the survey, ask me for the missing
> information before going on; do not assume. Then fill in the sheet criterion by criterion:
> the answer, where it comes from, and for each exclusionary criterion whether it is green or
> red. Do not decide: present me the completed sheet with your reading and your doubts, and I
> will decide. Reply in my language.

Ce que nous demandons : qu'il lise les deux intrants (le relevé et la fiche de critères) ;
qu'**avant de répondre il évalue si le relevé suffit** et, s'il ne suffit pas, qu'il demande plutôt
que de supposer (c'est la clause centrale de tous les prompts de la méthode) ; qu'il remplisse la
fiche avec la source de chaque réponse, pour qu'on puisse la retracer ensuite ; qu'il marque les
critères excluants en vert ou en rouge ; et qu'il **ne décide pas**, parce que l'éligibilité est
décidée par le propriétaire. La dernière ligne lui demande de répondre dans la langue du
propriétaire, parce que le prompt est en anglais mais la conversation n'a pas à l'être.

**De clôture :**

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.

Ce que nous demandons : qu'il laisse la décision écrite avec date et propriétaire (échelon 6), avec
les conditions s'il y en a, et avec la trace des questions et des réponses, qui est la preuve que
rien n'a été supposé.

## 3. Résultat attendu

Un fichier `docs/ELIGIBILITY.md` (ou le nom qu'utilise le projet), d'une page, avec :

- La date et qui a décidé.
- Les deux critères excluants avec leur réponse et leur source :
  - X1 : il existe un dépôt accessible et géré de façon standard (ou le projet est nouveau).
  - X2 : l'interface peut être pilotée par programme et chaque élément est accessible avec ses
    différentes méthodes, avec vérification de l'effet sur le backend.
- Les critères pondérés (les D1 à D10 de l'échelle, une fois arrêtés), chacun avec réponse, source
  et poids.
- La décision : go, no-go, ou go sous conditions, et les conditions écrites.
- Les questions que l'agent a posées et les réponses, pour que la trace reste.

## 4. Vérification de complétude (faite par le propriétaire, sans lire de code)

- Les deux critères excluants ont-ils une réponse explicite et une source ? Si l'un est rouge, la
  décision est-elle « no-go », ou y a-t-il une condition qui le résout ?
- Y a-t-il un critère auquel on a répondu « je suppose que oui » ou « probablement » ? Si oui,
  l'échelon n'est pas gravi : l'agent devait demander.
- La décision est-elle écrite avec une date et un nom ?
- Les conditions (s'il y en a) sont-elles vérifiables ? (« Avoir un accès en lecture à la
  production avant l'échelon 3 », oui ; « que le client collabore », non.)

## 5. Signaux d'alarme

- L'agent a rempli toute la fiche sans poser une seule question. Soit le relevé était parfait (il
  ne l'est jamais), soit il a supposé.
- La décision est « go sous conditions » et les conditions sont plus de trois. C'est probablement
  un « no-go » que personne ne veut dire.
- Au critère X2 on a répondu « oui, avec un peu de travail ». Si les écrans ne peuvent pas être
  pilotés par programme aujourd'hui, ce « peu de travail » est le projet entier.
