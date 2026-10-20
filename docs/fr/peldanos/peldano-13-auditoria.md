# Étape 13 — L'audit périodique comme intrant du plan (contrat de l'échelon)

**Tronçon :** mise en production.
**Quand :** obligatoire avant le premier déploiement en production ; il ouvre le tronçon de mise en
production. Ensuite, en exploitation, tous les un ou deux mois selon le rythme de changement, et à
la clôture de chaque grande étape.
**Forme :** un seul envoi long, idéalement à un agent différent de celui qui construit.
**Taille :** obligatoire avant le premier déploiement en production, dans tout projet ; ensuite,
proportionnel au rythme de changement (un système qui change toutes les semaines s'audite tous les
mois ; un système stable, tous les six).

## À quoi il sert

Regardez le système entier avec des yeux neufs de temps en temps, et convertissez ce que vous voyez
en éléments en attente. L'audit n'est pas un rapport qu'on archive : c'est du plan. Il évite le mot
de passe écrit dans le code que personne n'avait vu, les requêtes qui lisent des tables entières
[Ref. 18](../REFERENCIAS.md#ref-18), la vulnérabilité connue dans une dépendance, le composant de
milliers de lignes [Ref. 41](../REFERENCIAS.md#ref-41). Et c'est l'indépendance du contrôle de
qualité portée un cran plus loin : celui qui audite n'est pas celui qui a construit.

Sur l'indépendance : pas besoin d'une autre entreprise ni d'un autre outil. Il suffit d'**une autre
session, avec un autre fichier d'instructions, qui n'ait pas participé à la construction**. Ce que
vous cherchez, c'est que l'auditeur ne partage pas les présupposés du constructeur. Un modèle qui a
construit un module « sait » que le mot de passe codé en dur était provisoire ; un modèle qui le
voit pour la première fois le rapporte pour ce qu'il est. C'est ainsi qu'ont été détectées deux
portes d'administrateur que le constructeur avait laissées en une journée
[Ref. 40](../REFERENCIAS.md#ref-40).

Si vous pouvez choisir, que ce soit en plus **un modèle différent** de celui qui a construit, pas
seulement une autre session du même : une étude de 2026 a mesuré qu'une session propre avec un
modèle différent trouve plus d'erreurs que deux sessions du même modèle
([arXiv 2610.01471](https://arxiv.org/abs/2610.01471)). Ce n'est pas une porte dure, parce que
parfois le modèle du constructeur est le seul disponible ; c'est une préférence qui vaut la peine
d'être exercée quand c'est possible, et plus le système est critique, plus ça vaut la peine.

## 1. Contexte requis

Ce qui suit est la liste générique. Les fichiers concrets que vous devez avoir faits avant chaque
prompt, avec leur contenu et leur état minimum, sont dans la section 2, dans le bloc « Avant
d'envoyer le prompt » qui précède chacun d'eux.
- Le dépôt complet, en lecture seule.
- La production ou l'environnement de test, en lecture seule (base de données, journaux).
- L'audit précédent, s'il y en a eu un, pour mesurer ce qui a changé.
- Le périmètre : intégrité, sécurité, performance, qualité du code, ou tout.
- `docs/PENDING.md` avec les éléments en attente clos au dernier cycle et leurs reçus, pour que
  l'auditeur choisisse lesquels reproduire.

## 2. Prompts

**Initial (à un agent différent du constructeur, si possible) :**

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous (ou le métier avec vous) qui le
faites, pas l'agent :

- Une session nouvelle de l'agent, différente de celle du constructeur : un clone propre du dépôt
  dans un autre dossier et, si votre outil le permet, un fichier d'instructions différent qui dise
  seulement « tu es un auditeur ; tu n'as pas construit ce système ». Sans cela, l'auditeur
  partage les présupposés du constructeur et il les confirme.
- Un accès en lecture seule pour cette session à l'environnement de test ou à la production : base
  de données, journaux. Des identifiants en lecture seule, hors du dépôt, avec le nom de la
  variable dit dans le chat.
- Le périmètre, décidé par vous, pour le trou [scope] : intégrité, sécurité, performance, qualité
  du code, ou tout.
- L'audit précédent, s'il y en a eu (`docs/AUDIT_[date]` de la fois d'avant), pour qu'il mesure ce
  qui a changé.
- État minimum acceptable : la session de l'auditeur n'est pas celle du constructeur, et elle n'a
  que la lecture.
> Audit this system for [scope]. Read-only: change nothing except writing your report to
> `docs/AUDIT_[date].md`. If auditing some part requires access you lack (the database, the
> log, an environment), tell me and mark that part as not audited; do not pass it as fine. Go
> through all of the code, not a sample. Pick two or three pending items closed in the last cycle
> and reproduce their receipts literally: rerun the exact red-then-green commands they cite
> against the commits they name, and say for each one whether it reproduces or not. A receipt you
> only read is not a receipt you audited. For every finding: where it is (file and line), what
> the risk is, what evidence proves it (the command, the query, the number), and its priority:
> P0 must be fixed now, P1 soon, P2 when possible. Give a grade to every dimension you audited.
> End with the list of P0 findings turned into proposed pending items. Reply in my language.

> [fr]
> Audite ce système sur [périmètre]. Lecture seule : ne change rien sauf écrire ton rapport dans
> `docs/AUDIT_[date].md`. Si auditer une partie requiert un accès que tu n'as pas (la base de
> données, le journal, un environnement), dis-le-moi et marque cette partie comme non auditée ; ne
> la fais pas passer pour bonne. Parcours tout le code, pas un échantillon. Choisis deux ou trois
> éléments en attente clos au dernier cycle et reproduis leurs reçus tels quels : relance les
> commandes exactes de rouge puis vert qu'ils citent, contre les commits qu'ils nomment, et dis
> pour chacun s'il se reproduit ou non. Un reçu que tu as seulement lu n'est pas un reçu que tu as
> audité. Pour chaque constat : où il est (fichier et ligne), quel est le risque, quelle preuve le
> démontre (la commande, la requête, le chiffre), et sa priorité : P0 doit être corrigé maintenant,
> P1 bientôt, P2 quand on pourra. Donne une note à chaque dimension que tu as auditée. Termine par
> la liste des constats P0 convertis en éléments en attente proposés. Réponds dans ma langue.

Ce que je lui demande, clause par clause : lecture seule (l'auditeur ne corrige pas ; il
propose) ; la clause de complétude sous sa forme pour auditer : **ce qui n'a pas pu être vérifié se
déclare, on ne l'approuve pas par omission** ; tout le code et non un échantillon, parce que les
constats graves sont souvent là où personne ne regarde ; **la reproduction littérale de deux ou
trois reçus**, pour que l'audit vérifie des preuves au lieu de se contenter de les lire (c'est la
clause qui ferme le trou de D-033 : un rouge raconté n'est pas un rouge audité) ; chaque constat
avec emplacement, risque, preuve et priorité, pour qu'il soit actionnable sans relire le rapport ;
des notes par dimension, pour comparer avec l'audit précédent ; et les P0 déjà convertis en
éléments en attente proposés.

**De clôture (au constructeur) :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- `docs/AUDIT_[date].md`, lu par vous, et deux constats au hasard vérifiés avec l'auditeur
  (demandez-lui la commande, la ligne ; il doit pouvoir les montrer).
- La session du constructeur ouverte : ce prompt va au constructeur, pas à l'auditeur, avec la
  date du fichier mise dans le trou.
- État minimum acceptable : vous avez lu le rapport, vous savez combien il y a de P0 et de P1, et
  vous allez compter les éléments en attente qu'il ouvre.
> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.

> [fr]
> Lis `docs/AUDIT_[date].md`. Ouvre un élément en attente pour chaque P0 et P1, en citant le
> constat. Si tu n'es pas d'accord avec l'un d'eux, dis-le-moi avec la preuve contraire ; ne
> l'ignore pas.

Ce que je lui demande : que l'audit se convertisse en éléments en attente (sinon, c'est un rapport
qu'on archive), et que le désaccord soit explicite et avec preuve, pas silencieux.

## 3. Résultat attendu

- `docs/AUDIT_[date].md` avec : le périmètre, ce qui a pu être vérifié et ce qui ne l'a pas été (et
  pourquoi), les constats avec emplacement, risque, preuve et priorité, une note par dimension, le
  résultat de la reproduction de deux ou trois reçus du dernier cycle, et la liste des éléments en
  attente proposés.
- Dans `docs/PENDING.md` : un élément en attente pour chaque P0 et P1, citant le constat.

## 4. Vérification de complétude

- Le rapport dit-il ce qu'il N'A PAS pu vérifier ? S'il dit avoir tout vérifié, méfiez-vous.
- Choisissez deux constats : ont-ils un fichier et une ligne, et une preuve que vous pouvez
  reproduire ?
- Le rapport dit-il quels reçus il a reproduits, avec la commande et le résultat, ou dit-il
  seulement qu'il les a lus ?
- Chaque P0 a-t-il son élément en attente ouvert avant de déclarer l'audit clos ?
- Les notes par dimension pourront-elles être comparées avec l'audit précédent ?
- Est-ce le même agent qui a construit qui a audité ? Si oui, demandez un second regard sur les P0.

## 5. Signaux d'alarme

- L'audit n'a trouvé aucun P0. Dans un système de plus de trois mois, ce n'est presque jamais
  vrai ; il est plus probable que le périmètre était petit ou que l'auditeur partageait les
  présupposés.
- Les constats n'ont pas de ligne de fichier. Ce sont des opinions, pas des constats.
- Le rapport dit que les reçus « ont été vérifiés » sans montrer la commande exécutée ni sa
  sortie. Un reçu lu et un reçu reproduit ne sont pas la même chose, et seul le second ferme
  l'objection de D-033.
- Deux semaines ont passé et les P0 n'ont toujours pas d'élément en attente. L'audit a été archivé.
