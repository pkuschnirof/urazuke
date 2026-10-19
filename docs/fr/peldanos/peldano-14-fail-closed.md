# Étape 14 — Fail-closed, verrous et zéro dommage silencieux (contrat de l'échelon)

**Tronçon :** mise en production.
**Quand :** dans le tronçon de mise en production, AVANT de construire toute fonctionnalité qui
encaisse, envoie, approuve ou efface ; on le révise à chaque nouvelle action à conséquences. Les
nouvelles automatisations démarrent en mode à blanc et s'activent après avoir regardé leur
journal pendant quelques jours.
**Forme :** conversation : l'agent liste les actions à conséquences, vous confirmez lesquelles
portent un verrou et de quel type.
**Taille :** obligatoire dès que le système fait quelque chose d'irréversible (encaisser, envoyer,
effacer, approuver). Un système en lecture seule peut le sauter ; au moment où il gagne son
premier bouton qui agit sur le monde, cet échelon devient le plus important.

## À quoi il sert

Faites en sorte que le système, face à un doute ou à une panne, N'agisse PAS, et qu'il le dise.
Cela semble évident et c'est le contraire de ce que le logiciel fait par défaut, qui dans le doute
continue. Cela évite le double encaissement, l'approbation automatique sans passer par un humain,
le `git add -A` qui pousse un identifiant, et l'effacement de données du client. Les verrous que
j'ai posés à la Mutuelle sont le modèle : le bouton de panique à double sécurité, l'approbateur
automatique en mode à blanc, le veilleur avec gardes [Ref. 28](../REFERENCIAS.md#ref-28) ; et le
réflexe qu'une panne laisse une ligne sans son bouton au lieu de casser la liste entière
[Ref. 25](../REFERENCIAS.md#ref-25).

Le principe a un nom, « fail-closed », et il vient de la sécurité physique : une porte de sécurité
qui reste fermée quand le courant est coupé. Le contraire, « fail-open », c'est la porte qui
s'ouvre. En logiciel, la plupart des choses sont fail-open par défaut : si la validation échoue, le
code continue ; si le service ne répond pas, on suppose que tout va bien. La méthode inverse le
défaut : **dans le doute, non**. Et cela s'applique aussi bien au système qu'à l'agent qui
l'exploite.

## 1. Contexte requis

Ce qui suit est la liste générique. Les fichiers concrets que vous devez avoir faits avant chaque
prompt, avec leur contenu et leur état minimum, sont dans la section 2, dans le bloc « Avant
d'envoyer le prompt » qui précède chacun d'eux.
- **Relevé des actions à conséquences**, nommé ainsi de façon générique : ce que fait le système
  qui encaisse, envoie, approuve, efface, ou prévient quelqu'un à l'extérieur ; ce qui se passe si
  on le fait deux fois ; ce qui se passe si on le fait mal ; comment on le défait. C'est le métier
  qui le sait ; l'agent évalue si la liste est complète et pose des questions. L'arbre sémantique
  aide : chaque processus à conséquences y est.
- Quelles actions l'agent lui-même peut faire sur le système (s'il est embarqué).

## 2. Prompts

**Initial :**

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous (ou le métier avec vous) qui le
faites, pas l'agent :

- `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` : le relevé des actions à conséquence, écrit avec le
  propriétaire du domaine. Ce que fait ou va faire le système qui encaisse, envoie, approuve,
  efface, ou prévient quelqu'un de l'extérieur ; et pour chaque action : ce qui se passe si elle
  est faite deux fois, ce qui se passe si elle est mal faite, comment on la défait, et qui devrait
  pouvoir la faire. Les processus de l'arbre sémantique vous donnent la liste de départ :
  parcourez-les un par un. Le prompt le nomme « the survey of consequential actions », sans
  chemin : gardez-le sous ce nom ou dites-lui dans le chat où il est.
- Si l'agent va être embarqué ou résident : quelles actions il peut faire lui-même sur le système,
  dans une section à part du même relevé.
- `docs/SEMANTIC_TREE.md`, à jour.
- État minimum acceptable : chaque processus de l'arbre qui agit sur le monde est dans la liste
  avec son « ce qui se passe si elle est faite deux fois ».
> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock. Reply in my language.

> [fr]
> Nous allons décider quelles actions du système ont besoin d'un verrou. Lis le relevé des
> actions à conséquences, et parcours le code à la recherche de tout ce qui encaisse, envoie,
> approuve, efface ou prévient vers l'extérieur. Compare les deux listes : si le code a des actions
> que le relevé ne mentionne pas, ou l'inverse, demande-moi avant de continuer. Pour chaque
> action, propose : si elle est réversible, quel verrou elle porte (confirmation explicite, double
> sécurité, mode à blanc, limite quotidienne, un humain dans la boucle), et quel est le chemin de
> retour si ça tourne mal. Règle générale : au moindre doute ou à la moindre panne en chemin,
> l'action N'est PAS exécutée et le motif est consigné. Présente-moi le tableau ; je confirme
> verrou par verrou. Réponds dans ma langue.

Ce que je lui demande : le croisement entre ce que le métier a dit et ce que le code fait (c'est
là qu'apparaissent les actions dont personne ne se souvenait) ; la clause de complétude sous sa
forme pour cet échelon : les différences entre les deux listes se demandent, on ne les résout
pas ; pour chaque action, réversibilité, verrou et chemin de retour ; et la règle générale du
fail-closed écrite dans le prompt, pour qu'elle reste dans le tableau et dans le code.

**De clôture :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- Le tableau que l'agent a présenté, lu verrou par verrou avec le propriétaire ; pour chaque
  ligne, votre confirmation ou votre changement, écrits pour les trous [list], [X] et [Y] du
  prompt.
- État minimum acceptable : il n'y a pas de ligne sans verdict. Un verrou non confirmé est un
  verrou qui ne sera pas implémenté.
> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.

> [fr]
> Je confirme les verrous [liste] ; change [X] en [Y]. Implémente-les avec un test par verrou qui
> prouve que, dans la condition de doute, l'action N'a PAS lieu (prouvé en rouge contre la version
> sans le verrou). Enregistre le tableau final dans `docs/LOCKS.md`. Et pour toute nouvelle
> automatisation : mode à blanc d'abord, en consignant ce qu'elle aurait fait, jusqu'à ce que je
> l'active.

Ce que je lui demande : le test par verrou **prouvé en rouge** (sans le verrou, l'action avait
lieu ; avec le verrou, non), qui est l'échelon 8 appliqué à la sécurité ; le tableau final ; et la
règle du mode à blanc pour toute nouvelle automatisation, qui est ce qui permet de voir ce qu'elle
aurait fait avant de la laisser faire.

## 3. Résultat attendu

- `docs/LOCKS.md` : une ligne par action à conséquences : ce qu'elle fait, si elle est réversible,
  le verrou, le chemin de retour, qui l'a approuvé et quand.
- Un test par verrou, prouvé en rouge, qui vérifie que dans le doute l'action n'a pas lieu.
- Les nouvelles automatisations démarrant en mode à blanc, avec le journal des « aurait fait ».
- Si l'agent est embarqué : ses permissions écrites (ce qu'il peut lire, ce qu'il peut changer, ce
  qui requiert une approbation).

## 4. Vérification de complétude

- Chaque action qui encaisse, envoie, approuve ou efface est-elle dans le tableau ? Pensez à une
  qui n'y est pas et demandez.
- Chaque verrou a-t-il son test en rouge ? (« Sans le verrou, l'action avait lieu ; avec le verrou,
  non. »)
- Toute action irréversible a-t-elle un chemin de retour écrit ? Si elle n'en a pas, elle a besoin
  d'une double sécurité.
- Les nouvelles automatisations ont-elles démarré en mode à blanc ? Avez-vous vu le journal des
  « aurait fait » avant de les activer ?
- Que se passe-t-il si l'agent embarqué tente quelque chose hors de ses permissions ?
  Demandez-lui d'essayer et de vous montrer le refus dans le journal.

## 5. Signaux d'alarme

- Une automatisation est passée de « n'existe pas » à « tourne toute seule » sans période de mode
  à blanc.
- Le journal n'a aucune entrée « action non exécutée pour cause de doute ». Soit le système ne
  doute jamais (impossible), soit quand il doute, il continue.
- Un verrou peut se contourner avec un paramètre « pour les tests ». Ce paramètre va rester activé
  en production.
