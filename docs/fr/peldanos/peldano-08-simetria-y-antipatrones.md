# Étape 8 — Symétrie entre producteur et consommateur, et le registre des anti-patrons (contrat de l'échelon)

**Phase :** boucle (chaque changement qui touche un contrat entre deux parties).
**Forme :** automatique dans la boucle ; plus un fichier qui grandit à chaque coup dur.
**Taille :** la symétrie est toujours obligatoire ; la carte producteur/consommateur est facultative
dans un projet à un seul module, et obligatoire dès qu'il y a un écran et un serveur séparés.

## À quoi il sert

Quand vous changez une extrémité (le serveur, le robot, le schéma de la base), l'autre extrémité
(l'écran, le compteur, le consommateur) doit changer dans le même commit. Sinon, tôt ou tard elles
divergent, et l'utilisateur voit un chiffre d'un côté et un autre chiffre de l'autre (le cas 1 355
contre 1 234). Et les erreurs que nous avons déjà payées une fois sont notées pour ne pas les payer
deux fois.

Le principe général derrière : **toute liste a un seul propriétaire**. Les colonnes d'un tableau,
les états possibles d'une commande, les raisons pour lesquelles quelque chose attend : une seule
partie du système (le producteur) les définit et toutes les autres les lisent de là. Dès qu'il y a
deux copies de la même liste, l'une des deux est périmée ; reste à savoir laquelle.

## 1. Contexte requis

- Une carte de quelles parties du système consomment quoi : quels écrans lisent quels services,
  quels processus écrivent quelles tables. Si elle n'existe pas, le premier prompt la construit.
- Le registre des anti-patrons `docs/GOTCHAS.md`, même vide.

## 2. Prompts

**Pour construire la carte (une fois) :**

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

Ce que nous demandons : l'inventaire des contrats avec leurs deux côtés, et la clause de complétude
dans sa forme pour cet échelon : ce qui ne se voit pas se déclare, ne s'omet pas. Une carte avec des
trous masqués est pire que pas de carte.

**Routine (va dans le contrat de collaboration) :**

> Before closing any change that touches a contract, look up every consumer in the map and
> update them in the same commit. Always prefer that the producer defines the list (columns,
> causes, states) and the consumer reads it, rather than each keeping its own copy. If the map
> does not have that relationship, add it.

Ce que nous demandons : la symétrie comme réflexe (chercher l'autre côté avant de clore), la règle
de la liste à un seul propriétaire, et que la carte s'entretienne d'elle-même à mesure qu'on
l'utilise.

**Quand quelque chose casse pour la deuxième fois :**

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

Ce que nous demandons : le format fixe d'un anti-patron (odeur, cause racine, correctif, détection
précoce) et, le plus important, la vérification automatique : un anti-patron noté et non automatisé
se répétera quand la personne ou la session changera.

## 3. Résultat attendu

- `docs/PRODUCER_CONSUMER_MAP.md` : la liste des contrats avec producteur et consommateurs.
- Dans chaque commit qui touche un contrat : les consommateurs mis à jour, nommés dans le message.
- `docs/GOTCHAS.md` : une entrée par anti-patron, avec les quatre parties (odeur, cause racine,
  correctif, comment le détecter avant), et la date de la première fois.

## 4. Vérification de complétude

- Choisissez un contrat de la carte et demandez à l'agent de vous montrer où chaque consommateur
  le lit. Si l'un a sa propre copie de la liste, il y a de la dette.
- Y a-t-il un chiffre affiché sur deux écrans différents ? Comparez : sont-ils égaux ?
- Chaque entrée de GOTCHAS a-t-elle les quatre parties ?
- Une erreur déjà dans GOTCHAS s'est-elle répétée ? Si oui, la vérification automatique manque.

## 5. Signaux d'alarme

- La même valeur est tapée à la main dans plus d'un fichier (« EN ATTENTE », « APPROUVÉE » dans
  le serveur et dans l'écran). Deux copies ; l'une va diverger.
- Un changement serveur a été clos avec le test serveur au vert et personne n'a touché l'écran.
- GOTCHAS a des entrées sans la partie « comment le détecter avant ». Ce sont des anecdotes, pas
  des anti-patrons.
