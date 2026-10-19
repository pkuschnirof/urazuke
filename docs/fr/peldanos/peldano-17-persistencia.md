# Étape 17 — Optimisation de la couche de persistance, mesurée avant et après (contrat de l'échelon)

**Tronçon :** mise en production.
**Quand :** dans la phase de mise en production, après le 16 (il faut voir les requêtes pour les
mesurer) et avant le 19 (les tests de performance se lancent sur une persistance déjà optimisée ;
sinon, ils mesurent le problème qu'on connaissait déjà). On le répète quand un bloc ajoute une
grande table ou change un flux critique, et quand la supervision (20) montre une requête hors
plage. Dans un système hérité, les mesures sortent de N6 et la plus grande partie de ce qu'on
trouve se paie « au moment où on y touche », sauf ce qui est déjà hors plage.
**Forme :** deux envois : mesurer et proposer ; appliquer avec un avant et un après.
**Taille :** proportionnelle : dans un petit projet, les index des requêtes réelles et la fin des
boucles N+1 ; dans un projet à conséquences, complète, avec des budgets par chemin.

## À quoi il sert

La couche de persistance est l'endroit où les systèmes meurent lentement : ils fonctionnent bien
avec cent enregistrements, acceptablement avec dix mille, et à cent mille chaque écran met vingt
secondes, et personne ne sait quand ça a commencé. Cet échelon existe pour que cela se décide avec
des chiffres et avant la production, pas avec des plaintes et après. Et pour que cela se décide
**avec la méthode de l'échelon 7** : chaque requête que le système fait se compte et se chronomètre
avec un compteur qui a un test, on change ce que les chiffres disent, et on remesure sur les mêmes
données. Le premier audit des requêtes sans index sur un système vivant
[Ref. 18](../REFERENCIAS.md#ref-18) et le budget resserré à ce qui a été mesuré
[Ref. 37](../REFERENCIAS.md#ref-37) sont à l'origine de cet échelon ; la décision de l'interface
asynchrone dès la première ligne [Ref. 15](../REFERENCIAS.md#ref-15), son antécédent au démarrage.

Ce que ce n'est pas : ce n'est pas « réécrire l'accès aux données », ni choisir un autre moteur. Ça,
l'échelon 3 l'a décidé. C'est ajuster ce qu'il y a (index, pagination, lots, rétention, taille du
pool) à partir de ce que les requêtes réelles font.

**Si vous débutez.** La *couche de persistance* est la partie du système qui enregistre et lit les
données, presque toujours une base de données. Un *index* est comme l'index d'un livre : sans lui,
pour trouver un rendez-vous la base lit la table entière (c'est un *full scan*) ; avec lui, elle va
droit au but. Une *boucle N+1* est une erreur très courante : pour afficher cent rendez-vous, le
système fait une requête pour la liste et ensuite cent requêtes de plus, une par rendez-vous, au
lieu d'une seule. La *pagination*, c'est afficher par vingt au lieu de tout d'un coup. La
*rétention*, c'est combien de temps on garde chaque donnée avant de l'archiver ou de l'effacer. Et
le *pool de connexions* est le nombre de « lignes ouvertes » que le système a avec la base en même
temps. Rien de tout cela n'exige que vous lisiez du code : cela exige que vous regardiez des
chiffres avant et après.

## 1. Contexte requis

Ce qui suit est la liste générique. Les fichiers concrets que vous devez avoir faits avant chaque
prompt, avec leur contenu et leur état minimum, sont dans la section 2, dans le bloc « Avant
d'envoyer le prompt » qui précède chacun d'eux.

- Le dimensionnement et la volumétrie (échelon 3, ou N6 dans un système hérité) : les volumes
  auxquels il faut mesurer.
- La carte producteur-consommateur (échelon 11) : ce qui consomme chaque table.
- L'observabilité (16) : chaque requête visible avec son temps.
- L'environnement de test chargé avec des données au volume attendu.

## 2. Prompts

**Initial (mesurer et proposer) :**

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous (ou le métier avec vous) qui le
faites, pas l'agent :

- `docs/SIZING.md` et `docs/VOLUME_SURVEY.md` (échelon 3 ou N6), clos : les volumes à charger.
- L'environnement de test avec des données **au volume attendu**, pas avec dix enregistrements
  d'exemple. S'il y a un système antérieur ou une production, une copie anonymisée ; si c'est un
  projet neuf, demandez à l'agent de générer des données synthétiques avec la forme de l'arbre
  sémantique et les volumes du dimensionnement, et de laisser cela comme script dans le dépôt.
  C'est un élément en attente préalable, pas une partie de ce prompt.
- `docs/PRODUCER_CONSUMER_MAP.md` (échelon 11), à jour.
- S'il y a une production : un accès en lecture seule, avec l'identifiant hors du chat, pour
  mesurer sur des données réelles en plus de celles de test.
- Un cas connu pour le test de chaque compteur (une table dont vous connaissez le nombre de lignes).
- État minimum acceptable : l'environnement de test a les volumes du dimensionnement et l'agent
  peut voir chaque requête avec son temps (échelon 16).

> We are going to optimize the persistence layer with measurements, not opinions. Read
> `docs/SIZING.md`, `docs/VOLUME_SURVEY.md` and `docs/PRODUCER_CONSUMER_MAP.md`. With the test
> environment loaded at the volumes of the sizing (and, if I gave you access, production
> read-only), measure first, with meters that live in the repository and have a test against a
> known case: every query the system runs per screen and per job, with its count and its time;
> the queries that read whole tables; the ones that run once per item; the size and monthly growth
> of every table; the connection pool usage at the peak. Audit each meter in both directions. Show
> me the numbers with the commands that produce them. Then propose, query by query, what to
> change: indexes derived from the real queries, pagination, batching, the elimination of N+1
> loops, retention and archiving per table, pool size; for each change, the expected gain, the
> risk, and which consumers in the map it touches. Do not change anything yet: I approve the list.
> Reply in my language.

> [fr]
> Nous allons optimiser la couche de persistance avec des mesures, pas avec des opinions. Lis
> `docs/SIZING.md`, `docs/VOLUME_SURVEY.md` et `docs/PRODUCER_CONSUMER_MAP.md`. Avec l'environnement
> de test chargé aux volumes du dimensionnement (et, si je t'ai donné l'accès, la production en
> lecture seule), mesure d'abord, avec des compteurs qui vivent dans le dépôt et ont un test contre
> un cas connu : chaque requête que le système lance par écran et par tâche, avec son nombre et son
> temps ; les requêtes qui lisent des tables entières ; celles qui tournent une fois par élément ;
> la taille et la croissance mensuelle de chaque table ; l'usage du pool de connexions au pic.
> Audite chaque compteur dans les deux sens. Montre-moi les chiffres avec les commandes qui les
> produisent. Ensuite propose, requête par requête, quoi changer : des index dérivés des requêtes
> réelles, la pagination, le traitement par lots, l'élimination des boucles N+1, la rétention et
> l'archivage par table, la taille du pool ; pour chaque changement, le gain attendu, le risque, et
> quels consommateurs de la carte il touche. Ne change rien encore : c'est moi qui approuve la
> liste. Réponds dans ma langue.

Ce que je lui demande : mesurer avec la méthode de l'échelon 7 (compteur avec test, audité dans les
deux sens, chiffre avec sa commande) avant de proposer ; proposer requête par requête, avec le gain
et le risque, et avec les consommateurs de la carte que chaque changement touche (un nouvel index ne
touche personne ; une rétention par table touche tous ceux qui lisent cette table) ; et **ne rien
changer tant que je n'ai pas approuvé**, parce que l'optimisation est l'endroit où l'on « améliore »
le plus ce que personne n'avait demandé.

**De clôture (appliquer avec un avant et un après) :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- La liste des changements proposés, lue, avec votre approbation ou votre refus pour chacun ; les
  refusés, avec une raison d'une ligne. Pour ceux qui touchent des consommateurs de la carte, la
  confirmation que vous comprenez ce qui change pour eux.
- Un calcul refait à la main sur un chiffre de la mesure (lignes par mois de la plus grande table,
  par exemple), qui coïncide.
- État minimum acceptable : chaque changement a son verdict et vous comprenez quel consommateur il
  touche.

> Apply the approved changes [list], one commit each. For each one show me the meter before and
> after on the same data, the regression suite green, and the end-to-end suite green. Set a budget
> per critical path (queries and time) at the measured value plus a small margin, protected by a
> test that fails if it is exceeded. Update every consumer in the map that a change touches, in
> the same commit. Record the before and after table, the budgets and the retention per table in
> `docs/PERSISTENCE.md`.

> [fr]
> Applique les changements approuvés [liste], un commit chacun. Pour chacun, montre-moi le compteur
> avant et après sur les mêmes données, la suite de régression au vert, et la batterie de bout en
> bout au vert. Fixe un budget par chemin critique (requêtes et temps) à la valeur mesurée plus une
> petite marge, protégé par un test qui échoue s'il est dépassé. Mets à jour chaque consommateur de
> la carte qu'un changement touche, dans le même commit. Consigne la table de l'avant et de l'après,
> les budgets et la rétention par table dans `docs/PERSISTENCE.md`.

Ce que je lui demande : un commit par changement, pour que l'avant et l'après soient attribuables ;
le même compteur sur les mêmes données (si les données changent, le chiffre ne dit rien) ; le budget
avec son test, qui est ce qui empêche la boucle N+1 de revenir dans trois mois ; et la symétrie de
l'échelon 11 appliquée à la persistance.

## 3. Résultat attendu

- Les compteurs de requêtes dans le dépôt, avec leur test.
- `docs/PERSISTENCE.md` avec la table de l'avant et de l'après par changement, les budgets par
  chemin et la rétention par table.
- Les index, la pagination, les lots et la rétention appliqués, un commit chacun, avec la régression
  et le bout en bout au vert.
- Un test par budget qui échoue s'il est dépassé.

## 4. Vérification de complétude

- Lancez vous-même un compteur avant et après (l'agent vous donne les deux commandes) :
  coïncident-ils avec la table ?
- Y a-t-il une requête qui lise une table entière dans un flux critique ? Pourquoi est-elle restée ?
- Chaque table a-t-elle une politique de rétention écrite, même si c'est « pour toujours » ?
- Les budgets ont-ils un test ? Demandez-lui d'en dépasser un exprès et de vous montrer le rouge.
- L'écran le plus lent, avec les données au volume, met-il le temps que le dimensionnement
  attendait ?

## 5. Signaux d'alarme

- Les mesures ont été faites avec les données d'exemple du squelette. Tout est rapide avec dix
  lignes.
- L'agent propose de « migrer vers une autre base » ou de « réécrire la couche de données ». Ça,
  c'est l'échelon 3, et s'il faut y revenir c'est une décision à vous, pas une optimisation.
- Le chiffre s'est amélioré mais le bout en bout d'un flux ne passe plus. Un index ne casse pas un
  flux ; une rétention ou une pagination, si : il a manqué un consommateur de la carte.
- Il n'y a pas de budgets. Sans budget, l'optimisation dure jusqu'au prochain bloc.
