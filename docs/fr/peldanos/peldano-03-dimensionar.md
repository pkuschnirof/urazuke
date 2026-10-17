# Étape 3 — Dimensionner avant de concevoir l'architecture (contrat de l'échelon)

**Phase :** démarrage (une fois ; refait si le métier change d'échelle).
**Forme :** conversation (l'agent calcule et présente des options ; le propriétaire choisit).
**Taille :** toujours obligatoire, mais proportionnel : dans un petit projet le dimensionnement
peut tenir en une demi-page et une seule décision (« ça tient dans SQLite pendant des années »). Ce
qu'il ne peut pas être, c'est sauté, parce que la question « de combien cela va-t-il croître ? »
coûte cinq minutes et la mauvaise réponse coûte des semaines.

## À quoi il sert

À ce que les décisions structurelles — quel moteur de base de données, si l'interface est synchrone
ou asynchrone, combien de concurrence — se prennent avec des chiffres et non au goût. C'est
l'échelon le plus cher à sauter : dans Kikan on a démarré avec des fichiers JSON et quand on a
mesuré, il s'est avéré que le système générait 3,4 millions de lignes par an ; changer l'interface
après coup a coûté une étape entière de réingénierie.

Un point clé, apparu en élaborant ce contrat : **il y a des données que seul le métier possède**
(combien d'entités, combien d'événements par entité, combien d'opérateurs en pointe, combien de
temps conserver) et le modèle ne peut pas les inférer. Ce qu'il peut inférer, c'est le dérivé. C'est
pourquoi le prompt exige qu'il évalue si les données primaires sont complètes et demande celles qui
manquent, au lieu de les estimer d'un air assuré. Celui qui sait ce qui lui manque pour calculer,
c'est le modèle, pas un formulaire.

Et une seconde idée qui mérite d'être nommée : les **décisions asymétriques**. Il y a des décisions
qui coûtent très peu si vous les prenez et qu'elles s'avèrent inutiles, et énormément si vous ne les
prenez pas et qu'elles s'avèrent nécessaires. L'interface de persistance asynchrone dès la ligne un
en est l'exemple canonique : si le moteur finit par être synchrone, un `await` était de trop ; s'il
finit par être asynchrone et que vous ne l'aviez pas prévu, il faut tout réécrire. Ces décisions se
prennent toujours quand elles sont bon marché, même si elles ne sont pas nécessaires aujourd'hui.

## 1. Contexte requis

- **Relevé des données de volumétrie** du métier, nommé ainsi de façon générique : entités
  principales et leur croissance, événements par entité, opérateurs simultanés et heure de pointe,
  durée de conservation des données, charges exceptionnelles (campagnes, clôtures), croissance
  attendue. Le relevé est par nature incomplet ; l'agent évalue et demande.
- S'il y a un système antérieur : accès en lecture à sa base pour tirer des chiffres réels plutôt
  qu'estimés.
- `PROJECT.md` (échelon 2).

## 2. Prompts

**Initial :**

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
> Reply in my language.

Ce que nous demandons, clause par clause : distinguer les données primaires des dérivées (la
distinction qui évite l'invention) ; **demander les primaires qui manquent et ne jamais les
estimer** ; utiliser les chiffres réels du système antérieur quand il existe, avec leur source ;
calculer le dérivé en montrant le calcul, pour que le propriétaire puisse le refaire ; le scénario
« fois dix », qui est ce qui révèle ce qui casse en premier ; trois options avec le coût de migrer
de l'une à l'autre, parce que la décision n'est pas seulement « laquelle » mais « combien coûte
l'erreur » ; et qu'il ne choisisse pas et n'écrive pas de code, parce que cet échelon est de
décision, pas de construction.

**De clôture :**

> I choose option [B]. Record in `docs/SIZING.md`: the primary data with its source, the derived
> data with its arithmetic, the three options, the chosen one and why, and the decisions we are
> taking "just in case" even though they are not needed today (for example: the persistence
> interface is asynchronous from line one, even if the first engine is synchronous). Include the
> questions you asked and my answers.

Ce que nous demandons : l'enregistrement complet, avec sources et calculs ; l'option choisie et la
raison ; et les décisions asymétriques écrites, parce que si elles restent implicites elles ne sont
pas respectées.

## 3. Résultat attendu

Un fichier `docs/SIZING.md` avec :

- La date et qui a décidé.
- Le tableau des données primaires : valeur, source (fournie par le métier / mesurée dans le
  système antérieur), date. Aucune avec la source « supposition ».
- Le tableau des données dérivées : valeur, de quelles primaires elle vient, le calcul.
- Le scénario « fois dix » : ce qui casse en premier.
- Les trois options numérotées, avec le coût de migrer de l'une à l'autre.
- L'option choisie et la raison, en une ou deux phrases.
- Les décisions asymétriques (bon marché si vous vous trompez, très chères si vous ne les prenez
  pas), listées.
- Les questions que l'agent a posées et les réponses.

## 4. Vérification de complétude

- Y a-t-il une donnée primaire avec la source « supposition » ou sans source ? Si oui, l'échelon
  n'est pas gravi : l'agent devait la demander.
- Chaque donnée dérivée montre-t-elle de quelles primaires elle vient et avec quel calcul ?
  Pouvez-vous refaire un calcul à la main et obtenir le même résultat ?
- Y a-t-il trois options et une choisie avec une raison écrite ?
- Dit-il ce qui se passe si la volumétrie est multipliée par dix ?
- Les décisions asymétriques sont-elles écrites, ou sont-elles restées implicites ?
- L'agent a-t-il posé des questions ? S'il a présenté des chiffres sans en poser une seule,
  méfiez-vous.

## 5. Signaux d'alarme

- Les trois options mènent à la même conclusion. L'agent avait déjà choisi et a monté les deux
  autres pour la forme.
- Un chiffre dérivé a plus de précision que les primaires dont il vient (« 1 234 567 lignes » à
  partir de « environ 5 000 familles »). La précision est fausse.
- Le scénario « fois dix » dit « rien ne se passe ». Il se passe toujours quelque chose ; s'il ne l'a
  pas trouvé, il n'a pas cherché.
