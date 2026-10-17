# Étape 11 — L'audit périodique comme intrant du plan (contrat de l'échelon)

**Phase :** exploitation (de temps en temps : à la clôture d'une grande étape, avant un déploiement
important, ou tous les un ou deux mois).
**Forme :** un seul envoi long, idéalement confié à un agent différent de celui qui construit.
**Taille :** obligatoire avant le premier déploiement en production, dans tout projet ; ensuite,
proportionnel au rythme de changement (un système qui change chaque semaine s'audite chaque mois ;
un système stable, tous les six).

## À quoi il sert

À regarder le système entier avec un œil neuf de temps en temps, et à convertir ce qu'on voit en
éléments en attente. L'audit n'est pas un rapport qu'on archive : c'est du plan. Il évite le mot de
passe codé en dur que personne n'a vu, les 264 requêtes qui lisaient des tables entières, la
vulnérabilité connue dans une dépendance, le composant de 2 679 lignes. Et c'est l'indépendance du
contrôle qualité portée un cran plus loin : celui qui audite n'est pas celui qui a construit.

Sur l'indépendance : pas besoin d'une autre entreprise ni d'un autre outil. **Une autre session,
avec un autre fichier d'instructions, qui n'a pas participé à la construction** suffit. Ce qu'on
cherche, c'est que l'auditeur ne partage pas les présupposés du constructeur. Un modèle qui a
construit un module « sait » que le mot de passe codé en dur était provisoire ; un modèle qui le
voit pour la première fois le signale comme ce qu'il est.

## 1. Contexte requis

- Le dépôt complet, en lecture seule.
- La production ou l'environnement de test, en lecture seule (base de données, journaux).
- L'audit précédent, s'il y en a eu un, pour mesurer ce qui a changé.
- Le périmètre : intégrité, sécurité, performance, qualité du code, ou tout.

## 2. Prompts

**Initial (à un agent différent du constructeur, si possible) :**

> Audit this system for [scope]. Read-only: change nothing except writing your report to
> `docs/AUDIT_[date].md`. If auditing some part requires access you lack (the database, the
> log, an environment), tell me and mark that part as not audited; do not pass it as fine. Go
> through all of the code, not a sample. For every finding: where it is (file and line), what
> the risk is, what evidence proves it (the command, the query, the number), and its priority:
> P0 must be fixed now, P1 soon, P2 when possible. Give a grade to every dimension you audited.
> End with the list of P0 findings turned into proposed pending items. Reply in my language.

Ce que nous demandons, clause par clause : lecture seule (l'auditeur ne corrige pas ; il propose) ;
la clause de complétude sous sa forme pour auditer : **ce qui n'a pas pu être audité se déclare, ne
s'approuve pas par omission** ; tout le code et non un échantillon, parce que les constats graves
se trouvent généralement là où personne ne regarde ; chaque constat avec emplacement, risque,
preuve et priorité, pour qu'il soit actionnable sans relire le rapport ; des notes par dimension,
pour comparer avec l'audit précédent ; et les P0 déjà convertis en éléments en attente proposés.

**De clôture (au constructeur) :**

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.

Ce que nous demandons : que l'audit se convertisse en éléments en attente (sinon c'est un rapport
qu'on archive), et que le désaccord soit explicite et étayé, pas silencieux.

## 3. Résultat attendu

- `docs/AUDIT_[date].md` avec : le périmètre, ce qui a pu être audité et ce qui n'a pas pu l'être
  (et pourquoi), les constats avec emplacement, risque, preuve et priorité, une note par dimension,
  et la liste des éléments en attente proposés.
- Dans `docs/PENDING.md` : un élément pour chaque P0 et P1, citant le constat.

## 4. Vérification de complétude

- Le rapport dit-il ce qu'il n'a PAS pu auditer ? S'il dit avoir tout audité, méfiez-vous.
- Choisissez deux constats : ont-ils fichier et ligne, et une preuve que vous pouvez reproduire ?
- Chaque P0 a-t-il son élément ouvert avant de considérer l'audit clos ?
- Les notes par dimension pourront-elles être comparées avec l'audit précédent ?
- Est-ce le même agent qui a construit qui a audité ? Si oui, demandez un second regard sur les P0.

## 5. Signaux d'alarme

- L'audit n'a trouvé aucun P0. Dans un système de plus de trois mois, ce n'est presque jamais
  vrai ; plus probablement le périmètre était petit ou l'auditeur partageait des présupposés.
- Les constats n'ont pas de ligne de fichier. Ce sont des opinions, pas des constats.
- Deux semaines ont passé et les P0 n'ont toujours pas d'élément en attente. L'audit a été archivé.
