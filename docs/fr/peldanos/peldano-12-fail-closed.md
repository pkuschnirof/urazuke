# Étape 12 — Fail-closed, verrous et zéro dommage silencieux (contrat de l'échelon)

**Phase :** exploitation (se conçoit avant que le système agisse sur le monde ; se révise à chaque
nouvelle action à conséquence).
**Forme :** conversation : l'agent liste les actions à conséquence, le propriétaire confirme
lesquelles portent un verrou et de quel type.
**Taille :** obligatoire dès que le système fait quelque chose d'irréversible (facturer, envoyer,
supprimer, approuver). Un système en lecture seule peut le sauter ; au moment où il gagne son premier
bouton qui agit sur le monde, cet échelon devient le plus important.

## À quoi il sert

À ce que le système, en cas de doute ou de panne, N'AGISSE PAS, et le signale. Cela semble évident
et c'est le contraire de ce que fait le logiciel par défaut, qui en cas de doute continue. Il évite
la double facturation, l'approbation automatique sans passer par un humain, le `git add -A` qui
téléverse un identifiant, et la suppression des données du client.

Le principe a un nom, « fail-closed », et vient de la sécurité physique : une porte de sécurité qui
reste fermée quand le courant est coupé. Le contraire, « fail-open », est la porte qui s'ouvre. En
logiciel, la plupart des choses sont fail-open par défaut : si la validation échoue, le code
continue ; si le service ne répond pas, on suppose que tout va bien. La méthode inverse le défaut :
**en cas de doute, non**. Et cela s'applique aussi bien au système qu'à l'agent qui l'exploite.

## 1. Contexte requis

- **Relevé des actions à conséquence**, nommé ainsi de façon générique : ce que fait le système qui
  facture, envoie, approuve, supprime, ou avertit quelqu'un à l'extérieur ; ce qui se passe si on le
  fait deux fois ; ce qui se passe si on le fait mal ; comment on l'annule. Le métier le sait ;
  l'agent évalue si la liste est complète et demande.
- Quelles actions l'agent lui-même peut faire sur le système (s'il est embarqué).

## 2. Prompts

**Initial :**

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock. Reply in my language.

Ce que nous demandons : la comparaison entre ce que le métier a dit et ce que fait le code (c'est là
qu'apparaissent les actions dont personne ne se souvenait) ; la clause de complétude sous sa forme
pour cet échelon : les différences entre les deux listes se demandent, ne se résolvent pas ; pour
chaque action, réversibilité, verrou et chemin de retour ; et la règle générale du fail-closed
écrite dans le prompt, pour qu'elle reste dans le tableau et dans le code.

**De clôture :**

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.

Ce que nous demandons : le test par verrou **prouvé en rouge** (sans le verrou, l'action avait
lieu ; avec le verrou, non), qui est l'échelon 7 appliqué à la sécurité ; le tableau final ; et la
règle du mode à blanc pour toute nouvelle automatisation, qui est ce qui permet de voir ce qu'elle
aurait fait avant de la laisser faire.

## 3. Résultat attendu

- `docs/LOCKS.md` : une ligne par action à conséquence : ce qu'elle fait, si elle est réversible,
  le verrou, le chemin de retour, qui l'a approuvée et quand.
- Un test par verrou, prouvé en rouge, qui vérifie qu'en cas de doute l'action n'a pas lieu.
- Les nouvelles automatisations démarrant en mode à blanc, avec le journal de « aurait fait ».
- Si l'agent est embarqué : ses permissions écrites (ce qu'il peut lire, ce qu'il peut changer, ce
  qui nécessite une approbation).

## 4. Vérification de complétude

- Chaque action qui facture, envoie, approuve ou supprime est-elle dans le tableau ? Pensez à une
  qui n'y est pas et demandez.
- Chaque verrou a-t-il son test en rouge ? (« Sans le verrou, l'action avait lieu ; avec le verrou,
  non. »)
- Toute action irréversible a-t-elle un chemin de retour écrit ? Sinon, elle a besoin d'une double
  sécurité.
- Les nouvelles automatisations ont-elles démarré en mode à blanc ? Avez-vous vu le journal de
  « aurait fait » avant de les activer ?
- Que se passe-t-il si l'agent embarqué tente quelque chose hors de ses permissions ? Demandez-lui
  d'essayer et de vous montrer le refus dans le journal.

## 5. Signaux d'alarme

- Une automatisation est passée de « n'existe pas » à « tourne seule » sans période de mode à
  blanc.
- Le journal n'a aucune entrée « action non exécutée pour cause de doute ». Soit le système ne
  doute jamais (impossible), soit quand il doute il continue.
- Un verrou peut être contourné avec un paramètre « pour les tests ». Ce paramètre restera activé en
  production.
