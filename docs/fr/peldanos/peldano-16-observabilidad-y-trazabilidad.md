# Étape 16 — Observabilité et traçabilité totales, avec un niveau configurable (contrat de l'échelon)

**Tronçon :** mise en production.
**Quand :** dans la phase de mise en production, après le 13 (il y a déjà une chaîne de déploiement
et une configuration par environnement) et avant les tests de performance (19), parce que sans
observabilité les tests de performance ne disent pas ce qui a cassé. Dans un système hérité, le
niveau minimum (journaux structurés avec niveau configurable et un identifiant de corrélation)
entre dans la ceinture de sécurité (N4) ; le niveau complet, ici. La règle « tout nouveau module
journalise et propage » vaut pendant toute l'exploitation.
**Forme :** un seul envoi ; l'agent monte le dispositif et le démontre ; vous lisez une trace
réelle.
**Taille :** obligatoire à son niveau minimum dans tout projet qui va avoir des utilisateurs ;
complet dans tout projet à conséquences.

## À quoi il sert

Quand quelque chose cassera en production, et ça cassera, je veux pouvoir suivre une action depuis
l'écran jusqu'à la base de données et jusqu'à chaque appel externe, avec un seul identifiant, sans
ouvrir le code et sans demander à l'agent de « vérifier ». Et je veux pouvoir monter le niveau de
détail des journaux en production, en une minute, sans redéployer, et le redescendre ensuite. Ça,
c'est l'observabilité : voir ce que le système fait. Et la seconde chose, c'est la traçabilité :
que toute action à conséquence (a facturé, a envoyé, a effacé, a approuvé) laisse une trace de qui,
quand, quoi, d'où et avec quel résultat, dans un enregistrement que l'application ne peut pas
modifier. Sans cela, l'agent résident de l'échelon 23 travaille en aveugle, la supervision des
échelons 21 et 22 n'a rien dont se nourrir, et chaque incident se diagnostique avec des hypothèses
au lieu de preuves. Le tour orphelin qui a continué de vivre une heure quarante-trois s'est trouvé
par le journal, pas par le code [Ref. 16](../REFERENCIAS.md#ref-16) ; et l'agent résident a démarré,
justement, en lisant des journaux [Ref. 13](../REFERENCIAS.md#ref-13).

« Niveau configurable » est la clause qui distingue ceci de « mettre des logs » : le niveau (erreur,
avertissement, information, débogage, trace) se change par configuration sur le serveur, par
environnement, sans toucher au code ni déployer, et la production tourne en information sauf quand
on est en train d'enquêter sur quelque chose.

**Si vous débutez.** Un *journal* (log) est une ligne que le système écrit chaque fois qu'il fait
quelque chose : « 10:42:13, module agenda, utilisateur reception1, rendez-vous 17 annulé ».
*Structuré* veut dire que toutes les lignes ont les mêmes parties dans le même ordre, pour qu'on
puisse les chercher par machine. Le *niveau* est la quantité de détail écrite : en « erreur », rien
que ce qui a échoué ; en « trace », chaque pas. L'*identifiant de corrélation* est un numéro unique
donné à chaque action quand elle commence (vous avez appuyé sur « annuler ») et qui voyage collé à
tout ce que cette action provoque (la requête à la base, le message au patient) ; on cherche ensuite
ce numéro et toute l'histoire apparaît. Et l'*audit* est une liste non modifiable des actions
importantes : qui a fait quoi et quand.

## 1. Contexte requis

Ce qui suit est la liste générique. Les fichiers concrets que vous devez avoir faits avant chaque
prompt, avec leur contenu et leur état minimum, sont dans la section 2, dans le bloc « Avant
d'envoyer le prompt » qui précède chacun d'eux.

- La chaîne de déploiement et la configuration par environnement (échelon 15) : le niveau se
  configure là.
- La table des verrous (échelon 14) : chaque action à conséquence est une entrée de l'audit.
- Le relevé initial avec les données personnelles marquées : les journaux ne peuvent pas en
  contenir.
- Où vont vivre les journaux et les métriques (un fichier roulé, un service) : c'est vous qui le
  décidez.

## 2. Prompts

**Initial :**

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous (ou le métier avec vous) qui le
faites, pas l'agent :

- `docs/DEPLOYMENT.md` (échelon 15) avec la façon dont se lit la configuration par environnement :
  le niveau de journalisation va être une variable de plus de cette configuration.
- `docs/LOCKS.md` (échelon 14) : la liste des actions à conséquence est la liste de ce qui doit
  rester dans l'audit.
- Dans `docs/INITIAL_SURVEY.md`, la liste des données qui sont personnelles (noms, téléphones,
  courriels, pièces d'identité, diagnostics), écrite par vous avec le propriétaire : c'est ce que
  les journaux doivent masquer. C'est une obligation légale, pas une préférence.
- Votre décision sur l'endroit où vivent les journaux et les métriques : un fichier roulé sur le
  serveur suffit pour un petit projet ; un service de journalisation, pour un projet à
  conséquences. Et combien de temps on les conserve.
- État minimum acceptable : vous savez quelles données sont personnelles et où vont vivre les
  journaux.

> We are going to make this system observable and traceable, end to end, with a level that I can
> change without redeploying. Read `PROJECT.md`, `docs/SEMANTIC_TREE.md`, `docs/DEPLOYMENT.md` and
> `docs/LOCKS.md`. Evaluate whether you have what is needed (where the logs and metrics will live,
> how configuration is read per environment, which external services are called); if anything is
> missing, ask me. Then set up: (1) structured logging, one record per event, with timestamp,
> level, module, correlation id and actor, with the level configurable per environment at runtime
> (error, warning, info, debug, trace) without a redeploy, and a default of info in production;
> (2) a correlation id created at the entry of every request, job and message, propagated through
> every call and written in every record, so that one id follows an action from the screen to the
> backend, to the database and to every external call; (3) traceability of every consequential
> action in `docs/LOCKS.md`: who, when, what, from where, with which input and which outcome, in
> an audit record the application cannot edit; (4) health and metrics endpoints or files
> (requests, latency, errors, queue sizes, resource usage) that the monitoring of steps 21 and 22
> will read; (5) masking of every personal field listed in `docs/INITIAL_SURVEY.md`, so that no
> log record contains personal data. Show me one real request followed by its id through every
> layer, and show me the level changing in the test environment without a redeploy. Document the
> levels, where to change them and where the records live in `docs/OBSERVABILITY.md`. Reply in my
> language.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [fr]
> Nous allons rendre ce système observable et traçable, de bout en bout, avec un niveau que je
> puisse changer sans redéployer. Lis `PROJECT.md`, `docs/SEMANTIC_TREE.md`, `docs/DEPLOYMENT.md` et
> `docs/LOCKS.md`. Évalue si tu as ce qu'il faut (où vont vivre les journaux et les métriques,
> comment se lit la configuration par environnement, quels services externes sont appelés) ; s'il
> manque quelque chose, demande-le-moi. Ensuite mets en place : (1) une journalisation structurée,
> un enregistrement par événement, avec date et heure, niveau, module, identifiant de corrélation
> et acteur, avec le niveau configurable par environnement à l'exécution (erreur, avertissement,
> information, débogage, trace) sans redéployer, et information par défaut en production ; (2) un
> identifiant de corrélation créé à l'entrée de chaque requête, tâche et message, propagé à travers
> chaque appel et écrit dans chaque enregistrement, de sorte qu'un seul identifiant suive une action
> depuis l'écran jusqu'au backend, à la base de données et à chaque appel externe ; (3) la
> traçabilité de toute action à conséquence de `docs/LOCKS.md` : qui, quand, quoi, d'où, avec quelle
> entrée et avec quel résultat, dans un enregistrement d'audit que l'application ne peut pas
> modifier ; (4) des points d'entrée ou des fichiers de santé et de métriques (requêtes, latence,
> erreurs, taille des files, usage des ressources) que la supervision des échelons 21 et 22 va lire ;
> (5) le masquage de tout champ personnel listé dans `docs/INITIAL_SURVEY.md`, de sorte qu'aucun
> enregistrement de journal ne contienne de données personnelles. Montre-moi une requête réelle
> suivie par son identifiant à travers chaque couche, et montre-moi le niveau qui change dans
> l'environnement de test sans redéployer. Documente les niveaux, où les changer et où vivent les
> enregistrements dans `docs/OBSERVABILITY.md`.
>
> Quand tu as besoin d'une décision de ma part, demande-la avec les quatre parties de l'UX-28
> (`docs/ANEXO_HEURISTICAS.md`) et dans cet ordre : les données qui rendent la question
> nécessaire, énumérées ; un paragraphe de cinq lignes au plus qui les relie et laisse voir la
> question ; la question avec ses réponses possibles numérotées ; et ta recommandation. Dis-le à
> la profondeur technique que le projet a déclarée dans `communication_depth` —`beginner`,
> `decision_maker` ou `technical`— ; si le projet n'en a déclaré aucune, utilise `decision_maker`.
>
> Réponds dans ma langue.

Ce que je lui demande : les cinq pièces, et deux démonstrations qui sont la preuve de l'échelon :
**un identifiant réel suivi à travers toutes les couches** (s'il ne peut pas le montrer, la
propagation est cassée quelque part) et **le niveau qui change sans déployer** (s'il faut déployer,
ce n'est pas configurable). L'audit des actions à conséquence doit être immuable depuis
l'application, parce qu'une trace que l'application peut effacer n'est pas une trace. Et le masquage
des données personnelles va dans le même prompt parce que les journaux sont l'endroit où le plus de
données personnelles fuient sans que personne ne l'ait décidé.

**Routine (va dans le contrat de collaboration) :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- `docs/OBSERVABILITY.md` lu par vous : comprenez-vous comment monter le niveau et où lire un
  enregistrement ?
- `docs/WORKING_AGREEMENT.md`, où va la routine.
- État minimum acceptable : vous avez monté et redescendu le niveau vous-même, une fois, dans
  l'environnement de test.

> Every new module, job or integration writes structured log records with the correlation id and
> the actor at the level that corresponds, masks personal data, propagates the id to every call it
> makes, and records every consequential action in the audit trail. A pending item that adds one
> of those is not closed without showing one real id followed end to end through the new code.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [fr]
> Tout nouveau module, tâche ou intégration écrit des enregistrements de journal structurés avec
> l'identifiant de corrélation et l'acteur au niveau qui convient, masque les données personnelles,
> propage l'identifiant à chaque appel qu'il fait, et consigne toute action à conséquence dans la
> piste d'audit. Un élément en attente qui ajoute l'un de ceux-là n'est pas clos sans montrer un
> identifiant réel suivi de bout en bout à travers le nouveau code.
>
> Quand tu as besoin d'une décision de ma part, demande-la avec les quatre parties de l'UX-28
> (`docs/ANEXO_HEURISTICAS.md`) et dans cet ordre : les données qui rendent la question
> nécessaire, énumérées ; un paragraphe de cinq lignes au plus qui les relie et laisse voir la
> question ; la question avec ses réponses possibles numérotées ; et ta recommandation. Dis-le à
> la profondeur technique que le projet a déclarée dans `communication_depth` —`beginner`,
> `decision_maker` ou `technical`— ; si le projet n'en a déclaré aucune, utilise `decision_maker`.

Ce que je lui demande : que l'observabilité ne se dégrade pas à chaque nouveau module, ce qui est ce
qui arrive toujours si ce n'est pas une règle : le module du mois trois ne journalise rien et c'est
justement celui qui échoue.

## 3. Résultat attendu

- Des journaux structurés avec niveau configurable par environnement, changé sans déployer.
- Un identifiant de corrélation dans chaque enregistrement, propagé de l'écran à la base de données
  et aux appels externes.
- Un enregistrement d'audit immuable des actions à conséquence.
- Des points d'entrée ou des fichiers de santé et de métriques, documentés.
- Aucune donnée personnelle dans les journaux.
- `docs/OBSERVABILITY.md` et la routine dans le contrat.

## 4. Vérification de complétude (vous la faites vous-même, sans lire de code)

- Demandez-lui l'identifiant d'une requête réelle et cherchez-le vous-même dans les journaux :
  apparaît-il dans l'écran, dans le backend, dans la base et dans l'appel externe, s'il y en a eu
  un ?
- Montez le niveau à débogage dans l'environnement de test, faites une action, regardez les
  journaux, redescendez-le. Avez-vous dû déployer ? Alors l'échelon n'est pas gravi.
- Cherchez un nom ou un téléphone de test dans les journaux : il ne doit pas y être.
- Faites une action à conséquence en test (annuler, envoyer vers la boîte factice) : est-elle restée
  dans l'audit avec qui, quand, quoi et le résultat ?
- `docs/OBSERVABILITY.md` vous suffit-il pour trouver un enregistrement tout seul à trois heures du
  matin ?

## 5. Signaux d'alarme

- L'agent montre des « logs » mais chaque module écrit dans un format différent. Ce n'est pas
  structuré ; personne ne pourra les chercher.
- L'identifiant apparaît dans le backend mais pas dans les appels externes ni dans les tâches
  programmées. Ce sont justement les endroits où les incidents se perdent.
- Le niveau de production est resté en débogage « pour l'instant ». Le disque se remplit et des
  données fuient.
- L'audit des actions à conséquence vit dans la même table que le reste des données et
  l'application peut l'effacer.
