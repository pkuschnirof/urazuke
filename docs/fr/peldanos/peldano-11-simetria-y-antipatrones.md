# Étape 11 — Symétrie entre producteur et consommateur, et le registre des anti-patrons (contrat de l'échelon)

**Tronçon :** boucle.
**Quand :** avec chaque élément en attente qui touche un contrat entre deux parties du système. La
carte des contrats se construit à l'ouverture du deuxième bloc fonctionnel, quand il y a déjà un
écran et un serveur. Le registre des anti-patrons grandit chaque fois que quelque chose casse pour
la deuxième fois.
**Forme :** automatique à l'intérieur de la boucle ; plus un fichier qui grandit à chaque coup dur.
**Taille :** la symétrie est obligatoire toujours ; la carte producteur/consommateur est facultative
dans un projet d'un seul module, et obligatoire dès qu'il y a un écran et un serveur séparés.

## À quoi il sert

Quand vous changez une extrémité (le serveur, le robot, le schéma de la base), faites en sorte que
l'autre extrémité (l'écran, le compteur, le consommateur) change dans le même commit. Sinon, tôt ou
tard elles divergent, et l'utilisateur voit un chiffre d'un côté et un autre chiffre de l'autre
[Ref. 26](../REFERENCIAS.md#ref-26). Et les erreurs que vous avez déjà payées une fois, notez-les
pour ne pas les payer deux fois [Ref. 2](../REFERENCIAS.md#ref-2).

Le principe général derrière, que j'ai imposé à la Mutuelle et qui vaut pour tout système
[Ref. 27](../REFERENCIAS.md#ref-27) : **toute liste a un seul propriétaire**. Les colonnes d'un
tableau, les états possibles d'une commande, les causes pour lesquelles quelque chose attend : une
seule partie du système (le producteur) les définit et toutes les autres les lisent là. Dès qu'il y
a deux copies de la même liste, l'une est périmée ; il ne reste qu'à savoir laquelle. L'arbre
sémantique de l'échelon 2 est le premier endroit où ces listes se déclarent : les états d'une
entité y sont, et le code doit les lire depuis une seule source.

## 1. Contexte requis

Ce qui suit est la liste générique. Les fichiers concrets que vous devez avoir faits avant chaque
prompt, avec leur contenu et leur état minimum, sont dans la section 2, dans le bloc « Avant
d'envoyer le prompt » qui précède chacun d'eux.
- Une carte de quelles parties du système consomment quoi : quels écrans lisent quels services,
  quels processus écrivent quelles tables. Si elle n'existe pas, le premier prompt la construit.
- Le registre des anti-patrons `docs/GOTCHAS.md`, même vide.

## 2. Prompts

**Pour construire la carte (une fois) :**

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous (ou le métier avec vous) qui le
faites, pas l'agent :

- Le système avec au moins un bloc fonctionnel construit : sans contrats entre les parties, il n'y
  a pas de carte à faire.
- `docs/SEMANTIC_TREE.md` à jour : les listes (états, types, causes) y sont déclarées, et la carte
  doit coïncider avec l'arbre.
- Une liste écrite par vous des parties qui vivent hors du dépôt et qui produisent ou consomment
  quelque chose du système (un robot, un tableur qui lit la base, un processus d'une autre
  équipe), pour que l'agent les mette sur la carte même s'il ne les voit pas. S'il n'y en a
  aucune, dites-le.
- État minimum acceptable : l'agent peut lire tout le dépôt, et vous lui avez dit ce qu'il y a
  dehors.
> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

> [fr]
> Construis `docs/PRODUCER_CONSUMER_MAP.md` : pour chaque contrat du système (un service, une
> table, un format de fichier, une liste de valeurs), qui le produit et qui le consomme. S'il y a
> des parties du système auxquelles tu ne peux pas accéder ou que tu ne comprends pas, dis-le-moi
> au lieu de les laisser hors de la carte. Réponds dans ma langue.

Ce que je lui demande : l'inventaire des contrats avec leurs deux côtés, et la clause de
complétude sous sa forme pour cet échelon : ce qu'on ne voit pas se déclare, on ne l'omet pas. Une
carte avec des trous cachés est pire que pas de carte du tout.

**Routine (va dans le contrat de collaboration) :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- `docs/PRODUCER_CONSUMER_MAP.md`, construit et revu par vous : choisissez un contrat et vérifiez
  que les deux côtés sont bien ceux que vous connaissez.
- `docs/WORKING_AGREEMENT.md`, où va la routine.
- État minimum acceptable : la carte existe et elle a au moins les contrats du premier bloc.
> Before closing any change that touches a contract, look up every consumer in the map and
> update them in the same commit. Always prefer that the producer defines the list (columns,
> causes, states) and the consumer reads it, rather than each keeping its own copy. If the map
> does not have that relationship, add it.

> [fr]
> Avant de clore tout changement qui touche un contrat, cherche dans la carte chaque consommateur
> et mets-les à jour dans le même commit. Préfère toujours que le producteur définisse la liste
> (colonnes, causes, états) et que le consommateur la lise, plutôt que chacun garde sa propre
> copie. Si la carte n'a pas cette relation, ajoute-la.

Ce que je lui demande : la symétrie comme réflexe (chercher l'autre côté avant de clore), la règle
de la liste à un seul propriétaire, et que la carte s'entretienne d'elle-même à mesure qu'on
l'utilise.

**Quand quelque chose casse pour la deuxième fois :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- La preuve que c'est la deuxième fois : l'élément en attente ou le commit de la première,
  retrouvé par vous (cherchez dans les éléments clos de `docs/PENDING.md`), pour le lui coller
  avec le prompt. Sans cette référence, l'agent va enregistrer un anti-patron générique qui ne
  permettra de détecter quoi que ce soit.
- `docs/GOTCHAS.md`, créé même s'il est vide, avec le format dans l'en-tête : l'odeur, la cause
  racine, la correction, comment le détecter avant.
- État minimum acceptable : vous pouvez nommer la première fois avec une date ou un numéro
  d'élément en attente.
> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

> [fr]
> Cela nous est déjà arrivé. Enregistre-le dans `docs/GOTCHAS.md` avec : comment ça sent (le
> signe précoce), la cause racine, la correction, et comment le détecter la prochaine fois avant
> que ça fasse mal. Et ajoute, si possible, un test ou une vérification automatique qui le
> détecte.

Ce que je lui demande : le format fixe d'un anti-patron (odeur, cause racine, correction,
détection précoce) et, surtout, la vérification automatique : un anti-patron noté et non
automatisé va se répéter quand la personne ou la session changera.

## 3. Résultat attendu

- `docs/PRODUCER_CONSUMER_MAP.md` : la liste des contrats avec producteur et consommateurs.
- Dans chaque commit qui touche un contrat : les consommateurs mis à jour, nommés dans le message.
- `docs/GOTCHAS.md` : une entrée par anti-patron, avec les quatre parties (odeur, cause racine,
  correction, comment le détecter avant), et la date de la première fois.

## 4. Vérification de complétude

- Choisissez un contrat de la carte et demandez à l'agent de vous montrer où chaque consommateur
  le lit. Si l'un d'eux a sa propre copie de la liste, il y a de la dette.
- Y a-t-il un chiffre affiché sur deux écrans différents ? Comparez : donnent-ils la même chose ?
- Chaque entrée de GOTCHAS a-t-elle les quatre parties ?
- Une erreur qui était déjà dans GOTCHAS s'est-elle répétée ? Si oui, la vérification automatique
  manque.

## 5. Signaux d'alarme

- La même valeur apparaît écrite à la main dans plus d'un fichier (« EN ATTENTE », « APPROUVÉE »
  dans le serveur et dans l'écran). Deux copies ; l'une va diverger.
- Un changement au serveur a été clos avec le test du serveur au vert et personne n'a touché à
  l'écran.
- GOTCHAS a des entrées sans la partie « comment le détecter avant ». Ce sont des anecdotes, pas
  des anti-patrons.
