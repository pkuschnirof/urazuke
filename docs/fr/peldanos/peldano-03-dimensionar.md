# Étape 3 — Dimensionner avant de concevoir l'architecture (contrat de l'échelon)

**Tronçon :** démarrage.
**Quand :** une fois, après la définition et avant de monter le squelette ;
on le refait si le métier change d'échelle.
**Forme :** conversation : l'agent calcule et présente des options ; vous choisissez.
**Taille :** obligatoire toujours, mais proportionnel : dans un petit projet, le dimensionnement
peut tenir en une demi-page et une seule décision (« ça tient dans SQLite pendant des années »).
Ce qu'il ne peut pas, c'est ne pas se faire, parce que la question « de combien ça va grandir ? »
coûte cinq minutes et la mauvaise réponse coûte des semaines.

## À quoi il sert

Prenez les décisions structurelles — quel moteur de base de données, si l'interface est synchrone
ou asynchrone, combien de concurrence — avec des chiffres et non avec du goût. C'est l'échelon
qu'il coûte le plus cher de sauter, et je le dis en connaissance de cause : dans un de mes
systèmes, j'ai démarré avec des fichiers JSON et quand j'ai mesuré, il s'est avéré que cela allait
générer 3,4 millions de lignes par an ; changer l'interface ensuite a coûté une étape entière de
réingénierie [Ref. 15](../REFERENCIAS.md#ref-15).

Il y a un point clé qu'il vaut la peine de garder présent à l'esprit : **il y a des données que
seul le métier possède** (combien d'entités, combien d'événements par entité, combien d'opérateurs
au pic, combien de temps il faut conserver) et le modèle ne peut pas les inférer. Ce qu'il peut
inférer, c'est ce qui en dérive. C'est pourquoi le prompt lui exige d'évaluer si les données
primaires sont complètes et de demander celles qui manquent, au lieu de les estimer avec un air
sûr de lui. Celui qui sait ce qui lui manque pour calculer, c'est le modèle, pas un formulaire.

Et une seconde idée que je veux que vous emportiez : les **décisions asymétriques**. Il y a des
décisions qui coûtent très peu si vous les prenez et qu'elles se révèlent inutiles, et énormément
si vous ne les prenez pas et qu'elles se révèlent nécessaires. L'interface de persistance
asynchrone dès la première ligne est l'exemple canonique : si le moteur finit par être synchrone,
il y a un `await` de trop ; s'il finit par être asynchrone et que vous ne l'avez pas prévu, il faut
tout réécrire. Ces décisions-là, prenez-les toujours quand elles sont bon marché, même si
aujourd'hui elles ne sont pas nécessaires.

## 1. Contexte requis

Ce qui suit est la liste générique. Les fichiers concrets que vous devez avoir faits avant chaque
prompt, avec leur contenu et leur état minimum, sont dans la section 2, dans le bloc « Avant
d'envoyer le prompt » qui précède chacun d'eux.
- **Relevé des données de volumétrie** du métier, nommé ainsi de façon générique : entités
  principales et leur croissance, événements par entité, opérateurs simultanés et horaire du pic,
  durée de conservation des données, charges exceptionnelles (campagnes, clôtures), croissance
  attendue. Le relevé est par nature incomplet ; l'agent évalue et demande.
- S'il y a un système antérieur : un accès en lecture à sa base pour tirer des chiffres réels au
  lieu d'estimations.
- `PROJECT.md` et l'arbre sémantique (échelon 2) : les entités de l'arbre sont celles qu'il faut
  dimensionner.

## 2. Prompts

**Initial :**

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous (ou le métier avec vous) qui le
faites, pas l'agent :

- `docs/VOLUME_SURVEY.md` : le relevé de volumétrie, écrit avec le propriétaire du domaine (ou
  avec vous-même, si le projet est le vôtre). Pour chaque entité principale de l'arbre sémantique
  : combien il y en a aujourd'hui, combien s'en ajoutent par mois, combien d'événements chacune
  génère (un rendez-vous génère trois messages ; une autorisation génère tant de requêtes) ;
  combien de personnes travaillent au pic et à quelle heure est le pic ; combien de temps les
  données sont conservées ; quelles charges exceptionnelles il y a (campagnes, clôtures de mois,
  le lundi après un jour férié) ; quelle croissance ils attendent et si le système pourrait être
  vendu à d'autres. Et le plus important : pour chaque chiffre, d'où il sort (« la responsable l'a
  dit », « compté dans le cahier de septembre », « supposé »). Les suppositions se marquent comme
  des suppositions ; elles ne se déguisent pas en données.
- `PROJECT.md` et `docs/SEMANTIC_TREE.md` (échelon 2), clos : les entités à dimensionner sont
  celles de l'arbre.
- S'il y a un système antérieur avec une base de données : un accès en lecture seule pour que
  l'agent sorte des chiffres réels au lieu d'estimations, avec la chaîne de connexion gardée hors
  du dépôt et le nom de la variable noté dans le relevé.
- État minimum acceptable : toute entité de l'arbre a au moins un chiffre avec sa source, même si
  plusieurs disent « supposé ». L'agent va vous demander les suppositions ; cette demande, c'est
  l'échelon qui fonctionne.
> Before proposing any architecture we are going to size the system. Read `PROJECT.md` and the
> volume survey in `docs/VOLUME_SURVEY.md`. Distinguish primary data (facts only the business
> knows) from derived data (what can be computed from the primary data). Evaluate whether the
> primary data is complete enough to compute what follows; if any primary figure is missing, or
> is marked as an assumption, ask me for all the missing figures before going on. Never estimate
> a primary figure. If a previous system can be queried, use its real numbers and state where
> each came from. With the primary data complete, compute, showing the arithmetic: rows per year
> for the three largest tables, peak concurrency, data size at five years, and what breaks first
> if everything is multiplied by ten. Then present three options for persistence and concurrency,
> each with the cost of migrating to the others later. Do not choose: I choose. Do not write code.
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
> Avant de proposer une architecture quelconque, nous allons dimensionner le système. Lis
> `PROJECT.md` et le relevé de volumétrie dans `docs/VOLUME_SURVEY.md`. Distingue les données
> primaires (des faits que seul le métier connaît) des données dérivées (ce qui peut se calculer à
> partir des primaires). Évalue si les données primaires sont assez complètes pour calculer ce qui
> suit ; s'il manque une donnée primaire, ou si elle est marquée comme supposée, demande-moi toutes
> celles qui manquent avant de continuer. N'estime jamais une donnée primaire. Si un système
> antérieur peut être consulté, utilise ses chiffres réels et dis d'où vient chacun. Avec les
> primaires complètes, calcule, en montrant le calcul : lignes par an des trois plus grandes
> tables, concurrence au pic, taille des données à cinq ans, et ce qui casse en premier si tout
> est multiplié par dix. Ensuite présente trois options de persistance et de concurrence, chacune
> avec le coût de migrer vers les autres plus tard. Ne choisis pas : c'est moi qui choisis.
> N'écris pas de code.
>
> Quand tu as besoin d'une décision de ma part, demande-la avec les quatre parties de l'UX-28
> (`docs/ANEXO_HEURISTICAS.md`) et dans cet ordre : les données qui rendent la question
> nécessaire, énumérées ; un paragraphe de cinq lignes au plus qui les relie et laisse voir la
> question ; la question avec ses réponses possibles numérotées ; et ta recommandation. Dis-le à
> la profondeur technique que le projet a déclarée dans `communication_depth` —`beginner`,
> `decision_maker` ou `technical`— ; si le projet n'en a déclaré aucune, utilise `decision_maker`.
>
> Réponds dans ma langue.

Ce que je lui demande, clause par clause : distinguer les primaires des dérivées (c'est la
distinction qui évite l'invention) ; **demander les primaires qui manquent et ne jamais les
estimer** ; utiliser les chiffres réels du système antérieur quand il existe, avec leur source ;
calculer les dérivées avec le calcul à la vue, pour que vous puissiez le refaire ; le scénario
« fois dix », qui est ce qui révèle ce qui casse en premier ; trois options avec le coût de migrer
entre elles, parce que la décision n'est pas seulement « laquelle » mais « combien coûte une
erreur » ; et qu'il ne choisisse pas et n'écrive pas de code, parce que cet échelon est de
décision, pas de construction.

**De clôture :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- Les trois options que l'agent a présentées, lues, et au moins un calcul refait à la main par
  vous (les lignes par an de la plus grande table, par exemple) : il doit vous donner la même
  chose.
- Les données primaires qu'il vous a demandées, obtenues pour de vrai (dans le cahier, en
  demandant au propriétaire) et données dans le chat ; aucune estimée par vous pour vous en
  sortir.
- Votre choix, avec la lettre de l'option et une raison d'une ligne, décidé par vous et, s'il y a
  un propriétaire, avec lui.
- État minimum acceptable : le calcul refait coïncide, les suppositions sont devenues des données
  avec leur source, et l'option est choisie. Si le calcul ne coïncide pas, ne clôturez pas :
  demandez.
> I choose option [B]. Record in `docs/SIZING.md`: the primary data with its source, the derived
> data with its arithmetic, the three options, the chosen one and why, and the decisions we are
> taking "just in case" even though they are not needed today (for example: the persistence
> interface is asynchronous from line one, even if the first engine is synchronous). Include the
> questions you asked and my answers.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [fr]
> Je choisis l'option [B]. Enregistre dans `docs/SIZING.md` : les données primaires avec leur
> source, les dérivées avec leur calcul, les trois options, celle qui est choisie et pourquoi, et
> les décisions que nous prenons « au cas où » même si elles ne sont pas nécessaires aujourd'hui
> (par exemple : l'interface de persistance est asynchrone dès la première ligne, même si le
> premier moteur est synchrone). Inclus les questions que tu as posées et mes réponses.
>
> Quand tu as besoin d'une décision de ma part, demande-la avec les quatre parties de l'UX-28
> (`docs/ANEXO_HEURISTICAS.md`) et dans cet ordre : les données qui rendent la question
> nécessaire, énumérées ; un paragraphe de cinq lignes au plus qui les relie et laisse voir la
> question ; la question avec ses réponses possibles numérotées ; et ta recommandation. Dis-le à
> la profondeur technique que le projet a déclarée dans `communication_depth` —`beginner`,
> `decision_maker` ou `technical`— ; si le projet n'en a déclaré aucune, utilise `decision_maker`.

Ce que je lui demande : le registre complet, avec les sources et les calculs ; l'option choisie et
la raison ; et les décisions asymétriques écrites, parce que si elles restent implicites, elles ne
sont pas respectées.

## 3. Résultat attendu

Un fichier `docs/SIZING.md` avec :

- La date et qui a décidé.
- Un tableau des données primaires : valeur, source (donnée par le métier / mesurée dans le
  système antérieur), date. Aucune avec la source « supposé ».
- Un tableau des données dérivées : valeur, de quelles primaires elle sort, le calcul.
- Le scénario « fois dix » : ce qui casse en premier.
- Les trois options numérotées, avec le coût de migrer entre elles.
- Celle qui est choisie et la raison, en une ou deux phrases.
- Les décisions asymétriques, listées.
- Les questions que l'agent a posées et les réponses.

## 4. Vérification de complétude

- Y a-t-il une donnée primaire avec la source « supposé » ou sans source ? S'il y en a une,
  l'échelon n'est pas gravi : l'agent devait la demander.
- Chaque donnée dérivée montre-t-elle de quelles primaires elle sort et avec quel calcul ?
  Pouvez-vous refaire un calcul à la main et retrouver le résultat ?
- Y a-t-il trois options et une choisie avec la raison écrite ?
- Dit-il ce qui se passe si la volumétrie est multipliée par dix ?
- Les décisions asymétriques sont-elles écrites, ou sont-elles restées implicites ?
- L'agent a-t-il posé des questions ? S'il a présenté des chiffres sans avoir posé une seule
  question, méfiez-vous.

## 5. Signaux d'alarme

- Les trois scénarios d'options mènent à la même conclusion. L'agent avait déjà choisi et a monté
  les deux autres pour la forme.
- Un chiffre dérivé a plus de précision que les primaires dont il sort (« 1 234 567 lignes » à
  partir de « quelque 5 000 familles »). La précision est fausse.
- Le scénario « fois dix » dit « il ne se passe rien ». Il se passe toujours quelque chose ; s'il
  ne l'a pas trouvé, il ne l'a pas cherché.
