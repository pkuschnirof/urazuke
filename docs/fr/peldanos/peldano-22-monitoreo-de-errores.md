# Étape 22 — Supervision des erreurs et rapport cyclique : aucune erreur sans élément en attente (contrat de l'échelon)

**Tronçon :** exploitation.
**Quand :** elle se monte dans la phase d'exploitation, avec le premier déploiement, avec le 21,
sur les journaux du 16 ; à partir de là elle tourne toute seule, avec des
alertes sur le moment et un rapport cyclique qui se lit avec le propriétaire. Chaque erreur
nouvelle entre dans la boucle comme élément en attente correctif et se clôt avec le test qui la
reproduit en rouge. Dans un système hérité, la première lecture est la ligne de base : les erreurs
qui existaient déjà le premier jour deviennent des éléments en attente avec leur marque de vitesse,
et aucune ne reste comme « connue » sans un élément en attente qui dise pourquoi on la tolère et
jusqu'à quand.
**Forme :** un seul envoi pour la monter ; ensuite, routine cyclique.
**Taille :** obligatoire dans tout projet avec des utilisateurs : la capture centralisée et le
rapport ne se négocient pas ; les alertes sur le moment, proportionnelles.

## À quoi il sert

Un système en production produit des erreurs qu'aucun utilisateur ne signale : celle de la personne
qui a vu l'écran blanc et a réessayé, celle de la tâche nocturne qui a échoué et que personne ne
regarde, celle de l'appel externe qui a renvoyé une erreur et que le code a avalée. Si je ne les
capture pas, elles n'existent pas jusqu'à ce qu'elles existent trop. Cet échelon est la contrepartie
du 21 : celui-là surveille la performance, celui-ci surveille les erreurs, et les deux finissent au
même endroit, la boucle, comme éléments en attente correctifs. Les règles de fond sont deux.
**Aucune erreur sans élément en attente** : une erreur nouvelle en ouvre un, et il se clôt avec le
test qui la reproduit en rouge, comme l'exige le mode correctif du chemin évolutif. Et **l'« erreur
connue » n'existe pas** sans un élément en attente qui dise pourquoi on la tolère et jusqu'à quand ;
« cette erreur a toujours été là » est la phrase avec laquelle un système pourrit. L'erreur
d'authentification rapportée comme un succès [Ref. 43](../REFERENCIAS.md#ref-43) et les quatre tours
jusqu'à la cause racine [Ref. 22](../REFERENCIAS.md#ref-22) sont les deux antécédents : la première,
du fait que les erreurs se cachent si on ne les capture pas par machine ; la seconde, du fait
qu'une erreur sans reproduction se corrige plusieurs fois.

**Si vous débutez.** Une *erreur* est tout ce que le système a essayé de faire et n'a pas pu : un
écran qui n'a pas chargé, une tâche nocturne qui s'est coupée, un appel à un autre service qui a
échoué. Une *exception non gérée* est une erreur que le code n'avait pas prévue et qui interrompt
ce qu'il était en train de faire. *Capturer* une erreur, c'est l'enregistrer avec toutes ses
données (quand, dans quelle version, avec quel identifiant, la *pile*, qui est la liste des pas du
programme jusqu'à l'échec) dans un seul endroit central, au lieu de la laisser se perdre sur
l'écran d'un utilisateur. *Regrouper*, c'est réunir les mille fois où la même erreur s'est produite
en une seule entrée avec un compteur. Et le *taux d'erreur par flux*, c'est, sur cent fois où
quelqu'un a enregistré un rendez-vous, combien ont échoué.

## 1. Contexte requis

Ce qui suit est la liste générique. Les fichiers concrets que vous devez avoir faits avant chaque
prompt, avec leur contenu et leur état minimum, sont dans la section 2, dans le bloc « Avant
d'envoyer le prompt » qui précède chacun d'eux.

- L'observabilité (16) : les erreurs arrivent avec l'identifiant de corrélation, la version et
  l'acteur.
- La table des verrous (12) : les erreurs dans les actions à conséquence sont une alerte immédiate.
- La production déployée (13), avec le navigateur de l'utilisateur inclus dans la capture.
- Le canal d'alertes et le cycle du rapport, partagés avec le 20.

## 2. Prompts

**Initial (monter et démontrer) :**

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous (ou le métier avec vous) qui le
faites, pas l'agent :

- `docs/OBSERVABILITY.md` (16) clos : les erreurs doivent sortir avec l'identifiant, la version,
  l'environnement et l'acteur.
- `docs/LOCKS.md` (12) : la liste des actions à conséquence, dont les erreurs sont une alerte sur
  le moment.
- Le canal et le cycle du rapport, les mêmes que ceux de l'échelon 21, décidés avec le
  propriétaire ; et le nombre d'occurrences par heure d'une erreur connue à partir duquel vous
  voulez une alerte, pour le trou du prompt.
- Où les erreurs sont conservées et pendant combien de temps (le même endroit que les journaux, ou
  un service de capture d'erreurs), décidé par vous, avec la règle qu'elles ne contiennent pas de
  données personnelles.
- État minimum acceptable : les erreurs sortent déjà avec leur identifiant (16) et il y a un canal
  avec une personne qui le lit.

> We are going to make sure that no error in production goes unseen. Using the records of step 16,
> set up: (1) centralized capture of every error and unhandled exception in the backend, in the
> jobs and in the user's browser, with the correlation id, the version, the environment, the
> actor (never personal data) and the stack; (2) grouping of errors by cause, so that one defect
> is one entry, with its count, first and last occurrence, versions affected and the flows it
> touches; (3) alerts to [channel] for every new error type, for a known error that crosses [N]
> occurrences per hour, and for any error inside a consequential action of `docs/LOCKS.md`; (4) a
> cyclic report, [weekly], generated automatically, with: new errors, recurring errors and their
> trend, the errors fixed in the period with their pending item, the error rate per flow against
> the previous period, and what you propose for each open one; (5) the rule that every new error
> type opens a corrective pending item, closed with the test that reproduces it in red, and that
> there is no "known error" without a pending item that says why it is tolerated and until when.
> Show me one error provoked on purpose in the test environment, in the browser, followed by its
> id to the backend record, the alert and the report. Document it in `docs/MONITORING.md`. Reply
> in my language.

> [fr]
> Nous allons nous assurer qu'aucune erreur en production ne passe inaperçue. En utilisant les
> enregistrements de l'échelon 16, mets en place : (1) la capture centralisée de chaque erreur et de
> chaque exception non gérée dans le backend, dans les tâches et dans le navigateur de
> l'utilisateur, avec l'identifiant de corrélation, la version, l'environnement, l'acteur (jamais de
> données personnelles) et la pile ; (2) le regroupement des erreurs par cause, de sorte qu'un
> défaut soit une entrée, avec son nombre, sa première et sa dernière occurrence, les versions
> affectées et les flux qu'il touche ; (3) des alertes vers [canal] pour chaque nouveau type
> d'erreur, pour une erreur connue qui dépasse [N] occurrences par heure, et pour toute erreur à
> l'intérieur d'une action à conséquence de `docs/LOCKS.md` ; (4) un rapport cyclique,
> [hebdomadaire], généré automatiquement, avec : les erreurs nouvelles, les erreurs récurrentes et
> leur tendance, les erreurs corrigées dans la période avec leur élément en attente, le taux
> d'erreur par flux par rapport à la période précédente, et ce que tu proposes pour chacune de
> celles qui restent ouvertes ; (5) la règle que chaque nouveau type d'erreur ouvre un élément en
> attente correctif, clos avec le test qui le reproduit en rouge, et qu'il n'existe pas d'« erreur
> connue » sans un élément en attente qui dise pourquoi elle est tolérée et jusqu'à quand.
> Montre-moi une erreur provoquée exprès dans l'environnement de test, dans le navigateur, suivie
> par son identifiant jusqu'à l'enregistrement du backend, l'alerte et le rapport. Documente-le dans
> `docs/MONITORING.md`. Réponds dans ma langue.

Ce que je lui demande : la capture dans les trois endroits où les erreurs se cachent (le backend,
les tâches, le navigateur), avec l'identifiant du 16 pour pouvoir les suivre ; le regroupement, sans
lequel le rapport est une liste de dix mille lignes ; les trois alertes qui comptent (nouvelle,
récurrente qui croît, à conséquence) ; le rapport avec le taux par flux, qui est le chiffre que le
propriétaire comprend ; les deux règles ; et la démonstration de bout en bout, du navigateur au
rapport.

**Routine de chaque cycle (va dans le contrat de collaboration) :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- Le rapport cyclique d'erreurs qui vient d'être généré, lu par vous.
- `docs/PENDING.md` sous la main, pour vérifier que les récurrentes ont leur élément en attente.
- État minimum acceptable : vous avez lu le rapport avant de coller le prompt.

> With every cyclic error report: go through it with me; open the corrective pending items for
> the new errors, each with the way to reproduce it; confirm that every recurring error has a
> pending item or a written reason with a date; and tell me which errors disappeared and why,
> with the commit that fixed each one. An error that disappeared without a fix is not solved: it
> is hiding, and it stays in the report until its cause is known.

> [fr]
> À chaque rapport cyclique d'erreurs : parcours-le avec moi ; ouvre les éléments en attente
> correctifs pour les erreurs nouvelles, chacun avec la façon de la reproduire ; confirme que chaque
> erreur récurrente a un élément en attente ou une raison écrite avec une date ; et dis-moi quelles
> erreurs ont disparu et pourquoi, avec le commit qui a corrigé chacune. Une erreur qui a disparu
> sans correction n'est pas résolue : elle se cache, et elle reste dans le rapport jusqu'à ce que sa
> cause soit connue.

Ce que je lui demande : la discipline du cycle, et la règle de l'erreur qui disparaît, qui est la
plus contre-intuitive et celle qui vaut le plus : une erreur partie toute seule revient toute seule.

## 3. Résultat attendu

- Une capture centralisée des erreurs dans le backend, les tâches et le navigateur, regroupées par
  cause, sans données personnelles.
- Des alertes par erreur nouvelle, récurrente qui croît, et à conséquence.
- Le rapport cyclique avec le taux d'erreur par flux.
- `docs/MONITORING.md` complet (avec le 20) ; la routine dans le contrat.
- Un élément en attente pour chaque erreur ouverte ; aucune « connue » sans élément en attente.

## 4. Vérification de complétude

- Provoquez vous-même une erreur dans le navigateur en test (une action dont vous savez qu'elle
  échoue) : est-elle apparue dans la capture avec votre identifiant, et l'alerte vous est-elle
  arrivée ?
- Lisez le dernier rapport : y a-t-il une erreur récurrente sans élément en attente ni raison ?
- Prenez une erreur « corrigée » du rapport : l'élément en attente a-t-il le test qui l'a reproduite
  en rouge ?
- Le taux d'erreur par flux est-il là, et a-t-il baissé ou monté par rapport à la période
  précédente ?
- Cherchez une donnée personnelle dans la capture d'erreurs : elle ne doit pas y être.

## 5. Signaux d'alarme

- Zéro erreur en production pendant un mois avec de vrais utilisateurs. Il n'existe pas de système
  comme ça ; la capture ne voit pas le navigateur ou les tâches.
- Une erreur avec mille occurrences et un commentaire « connue, sans incidence ». Sans élément en
  attente, sans date.
- Les erreurs se « corrigent » en redémarrant le service. Elles disparaissent et elles reviennent.
- Le rapport d'erreurs et celui des ressources sont lus par des gens différents et personne ne les
  croise : la requête lente du 20 est la cause du délai d'attente dépassé du 21.
