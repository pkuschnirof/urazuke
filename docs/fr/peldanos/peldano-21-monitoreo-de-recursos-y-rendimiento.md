# Étape 21 — Supervision des ressources, des fonctions et des requêtes hors plage, avec rapport cyclique (contrat de l'échelon)

**Tronçon :** exploitation.
**Quand :** elle se monte dans la phase d'exploitation, avec le premier déploiement en production,
avec les seuils du 19 et les métriques du 16 ; à partir de là, elle tourne toute
seule, et le rapport cyclique se lit avec le propriétaire à chaque cycle (hebdomadaire dans un
système à conséquences, mensuel dans un petit). Chaque événement hors plage entre dans la boucle
comme élément en attente correctif. Dans un système hérité, pareil, avec une différence : la
première lecture du rapport est la ligne de base, et ce qui était déjà hors plage le premier jour
devient des éléments en attente avec leur marque de vitesse.
**Forme :** un seul envoi pour la monter ; ensuite, routine cyclique.
**Taille :** minimale dans un petit projet (un rapport mensuel, une alerte de disque et une
d'erreurs de base) ; complète dans un projet à conséquences (seuils par fonction et par requête,
alertes, rapport hebdomadaire).

## À quoi il sert

Les tests de l'échelon 19 disent comment se comporte le système un jour, avec une charge que j'ai
choisie. La production, c'est tous les jours, avec la charge que les utilisateurs choisissent, avec
les données qui grandissent, et avec des changements qui entrent chaque semaine. Ce qui était dans
la plage en octobre en sort en mars sans que personne ne change rien, seulement parce que la table
a grandi. Cet échelon existe pour que cela se voie **avant que l'utilisateur ne le voie** : l'usage
des ressources contre la capacité, le temps de réponse de chaque fonction, chaque point d'entrée,
chaque tâche et chaque requête, comparé aux seuils du 19 et à sa propre histoire ; une alerte quand
quelque chose sort de la plage ; et un rapport cyclique que je lis avec le propriétaire, où chaque
écart a une cause ou un élément en attente. Le plafond resserré à ce qui a été mesuré
[Ref. 37](../REFERENCIAS.md#ref-37) est l'idée de fond : la plage n'est pas une opinion, c'est le
chiffre mesuré plus une marge ; et le quota d'intégration continue qui a fondu sans que personne ne
regarde [Ref. 39](../REFERENCIAS.md#ref-39) est l'échec qu'elle évite : une ressource qui se
consomme sans supervision se découvre quand elle est épuisée.

Deux règles que je ne négocie pas. Une alerte qui se déclenche et que personne ne lit est un défaut
de l'alerte, pas de celui qui ne l'a pas lue : on l'ajuste ou on la supprime. Et on ne monte pas un
seuil pour faire taire une alerte sans une raison mesurée écrite.

**Si vous débutez.** *Superviser*, c'est regarder le système tout le temps par machine et prévenir
quand quelque chose sort de l'ordinaire. Les *ressources* sont ce que le système consomme :
processeur, mémoire, disque, connexions à la base, et aussi les quotas de services externes
(combien de messages par mois le prestataire vous laisse envoyer). « *Hors plage* » veut dire
au-dessus d'un *seuil* (une limite fixe, issue des tests de l'échelon 19) ou très différent de la
*ligne de base* (ce que ce même chiffre donnait les derniers jours). Une *alerte* est
l'avertissement sur le moment ; le *rapport cyclique* est le résumé que l'on lit chaque semaine ou
chaque mois, au calme.

## 1. Contexte requis

Ce qui suit est la liste générique. Les fichiers concrets que vous devez avoir faits avant chaque
prompt, avec leur contenu et leur état minimum, sont dans la section 2, dans le bloc « Avant
d'envoyer le prompt » qui précède chacun d'eux.

- L'observabilité (16) : les métriques et les journaux dont elle se nourrit.
- Les seuils du 19 et les budgets du 17.
- La production déployée (13), avec un accès en lecture seule pour la supervision.
- Le canal d'alertes et le cycle du rapport : c'est vous qui les décidez avec le propriétaire.

## 2. Prompts

**Initial (monter et démontrer) :**

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous (ou le métier avec vous) qui le
faites, pas l'agent :

- `docs/OBSERVABILITY.md` (16) et `docs/PERFORMANCE.md` (19) clos : les métriques et les seuils.
- `docs/PERSISTENCE.md` (17) avec les budgets par chemin.
- Le canal d'alertes, décidé avec le propriétaire : à qui elle arrive, par où (courriel,
  messagerie), et qui la lit à quelle heure. Une alerte qui arrive dans une boîte que personne
  n'ouvre est une décoration.
- Le cycle du rapport : hebdomadaire ou mensuel, et qui le lit avec vous.
- L'accès en lecture seule de la supervision à la production (le serveur, la base, les journaux),
  avec l'identifiant hors du chat.
- Le pourcentage d'écart par rapport à la ligne de base que vous considérez comme une alarme (par
  exemple, 30 % de plus que la moyenne des quatorze derniers jours), pour le trou du prompt.
- État minimum acceptable : il y a des seuils écrits, un canal avec une personne qui le lit, et un
  cycle.

> We are going to keep this system watched in production. Using the metrics and logs of step 16,
> the budgets of `docs/PERSISTENCE.md` and the thresholds of `docs/PERFORMANCE.md`, set up: (1)
> collection of resource usage (CPU, memory, disk, database connections, queue sizes, external
> quotas) and of the response time of every function, endpoint, job and query, with the
> correlation id, kept with a history; (2) alerts when any of them is out of range: above the
> thresholds, or more than [X] percent over the baseline of the last [N] days, sent to [channel],
> with the rule that an alert that fires without a human reading it is a defect of the alert and
> gets fixed or removed; (3) a cyclic report, [weekly], generated automatically, with: resource
> usage against capacity and its trend, the slowest functions and queries and how they moved
> against the previous period, every out-of-range event with its cause if known, and what you
> propose for each; (4) the rule that every out-of-range event becomes a corrective pending item
> with the measured number as its acceptance criterion, closed with the full routine. Nothing
> here may read or store personal data. Show me the first report generated on real data from the
> test environment, and one alert fired on purpose by exceeding a threshold. Document the
> thresholds, the channel, the cycle and how to silence an alert with a written reason in
> `docs/MONITORING.md`. Reply in my language.

> [fr]
> Nous allons garder ce système sous surveillance en production. En utilisant les métriques et les
> journaux de l'échelon 16, les budgets de `docs/PERSISTENCE.md` et les seuils de
> `docs/PERFORMANCE.md`, mets en place : (1) la collecte de l'usage des ressources (processeur,
> mémoire, disque, connexions à la base, taille des files, quotas externes) et du temps de réponse
> de chaque fonction, point d'entrée, tâche et requête, avec l'identifiant de corrélation, conservée
> avec son historique ; (2) des alertes quand l'un d'eux est hors plage : au-dessus des seuils, ou à
> plus de [X] pour cent au-dessus de la ligne de base des [N] derniers jours, envoyées à [canal],
> avec la règle qu'une alerte qui se déclenche sans qu'un humain la lise est un défaut de l'alerte
> et qu'on la corrige ou qu'on la supprime ; (3) un rapport cyclique, [hebdomadaire], généré
> automatiquement, avec : l'usage des ressources par rapport à la capacité et sa tendance, les
> fonctions et les requêtes les plus lentes et comment elles ont bougé par rapport à la période
> précédente, chaque événement hors plage avec sa cause si elle est connue, et ce que tu proposes
> pour chacun ; (4) la règle que chaque événement hors plage devient un élément en attente correctif
> avec le chiffre mesuré comme critère d'acceptation, clos avec la routine complète. Rien de tout
> cela ne peut lire ni enregistrer de données personnelles. Montre-moi le premier rapport généré sur
> des données réelles de l'environnement de test, et une alerte déclenchée exprès en dépassant un
> seuil. Documente les seuils, le canal, le cycle et comment faire taire une alerte avec une raison
> écrite dans `docs/MONITORING.md`. Réponds dans ma langue.

Ce que je lui demande : une collecte avec historique (sans historique il n'y a pas de ligne de base,
et sans ligne de base il n'y a pas de « hors plage ») ; des alertes contre deux références, le seuil
absolu du 19 et l'écart relatif par rapport à sa propre histoire ; le rapport cyclique avec la forme
d'un rapport de l'échelon 12 (chaque écart avec sa cause ou sa proposition, pas de « tout est
normal ») ; la conversion de chaque écart en élément en attente avec son chiffre ; et les deux
démonstrations : le premier rapport et une alerte provoquée.

**Routine de chaque cycle (va dans le contrat de collaboration) :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- Le rapport cyclique qui vient d'être généré, et un moment de votre temps avec le
  propriétaire pour le lire.
- `docs/MONITORING.md` sous la main, pour comparer les seuils.
- État minimum acceptable : vous avez lu le rapport avant de coller le prompt ; l'agent ne le lit
  pas à votre place.

> With every cyclic report of resources and performance: go through it with me, event by event;
> tell me which out-of-range events become pending items now and which can wait, with your
> reason; write the decision with the date in the report itself; and tell me whether any threshold
> must change and why, with the measurement that justifies it. Never raise a threshold to silence
> an alert without a measured reason written down.

> [fr]
> À chaque rapport cyclique de ressources et de performance : parcours-le avec moi, événement par
> événement ; dis-moi quels événements hors plage deviennent des éléments en attente maintenant et
> lesquels peuvent attendre, avec ta raison ; écris la décision avec la date dans le rapport
> lui-même ; et dis-moi si un seuil doit changer et pourquoi, avec la mesure qui le justifie. Ne
> monte jamais un seuil pour faire taire une alerte sans une raison mesurée écrite.

Ce que je lui demande : que le rapport se lise et se décide, avec une trace ; et la règle du seuil,
qui est celle qui évite que la supervision devienne silencieuse petit à petit.

## 3. Résultat attendu

- Une collecte des ressources et des temps de réponse avec historique, sans données personnelles.
- Des alertes par seuil et par écart, vers un canal qu'une personne lit.
- Le rapport cyclique, généré tout seul, avec chaque écart causé ou proposé.
- `docs/MONITORING.md` avec les seuils, le canal, le cycle et comment faire taire avec une raison.
- La routine dans le contrat ; les écarts comme éléments en attente correctifs.

## 4. Vérification de complétude

- Demandez qu'un seuil soit dépassé exprès en test : l'alerte vous est-elle arrivée, par le canal
  convenu, avec l'identifiant ?
- Lisez le dernier rapport : chaque événement hors plage a-t-il une cause ou une proposition ? L'un
  d'eux est-il resté sans rien ?
- Y a-t-il un élément en attente pour chaque écart que vous avez décidé de traiter, avec le chiffre
  comme critère ?
- Un seuil a-t-il monté depuis le 19 ? Avec quelle raison écrite ?
- Le rapport mentionne-t-il le quota des services externes (messagerie, intégration continue) ?

## 5. Signaux d'alarme

- Les alertes se déclenchent tous les jours et personne ne les lit. Il faut baisser leur nombre
  jusqu'à ce que chacune signifie quelque chose, pas s'y habituer.
- Le rapport dit « tout est normal » trois cycles d'affilée. Ou le système n'a pas d'utilisateurs,
  ou le rapport ne regarde pas ce qui compte.
- Un seuil a monté « pour qu'il arrête de prévenir ». C'est l'échelon 21 qui meurt en silence.
- La supervision enregistre des données personnelles « pour pouvoir diagnostiquer ». C'est une fuite
  avec un horaire.
