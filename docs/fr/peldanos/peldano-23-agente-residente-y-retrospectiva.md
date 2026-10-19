# Étape 23 — L'agent dans le système, et la rétrospective chiffrée (contrat de l'échelon)

**Tronçon :** exploitation.
**Quand :** l'agent résident, à l'entrée en exploitation, après le premier déploiement en
production. La rétrospective, à la clôture de chaque étape et du projet ; elle revient à l'échelon 0
pour le projet suivant.
**Forme :** deux parties : une conversation pour définir le périmètre de l'agent résident, et un
envoi long pour la rétrospective.
**Taille :** l'agent résident est facultatif (beaucoup de systèmes n'en ont pas besoin ; ceux qui
ont des utilisateurs qui demandent du support, si). La rétrospective est obligatoire dans tout
projet, même si elle tient en une page : sans elle, la méthode n'apprend pas.

## À quoi il sert

Deux choses qui bouclent le même cycle. D'abord : laissez l'agent résident en production, avec un
périmètre borné, pour diagnostiquer, exploiter et donner du support sans que vous ayez à être là
[Ref. 13](../REFERENCIAS.md#ref-13). Ensuite : révisez la méthode elle-même avec des chiffres, et
laissez ce qui s'apprend changer l'échelle. Cela évite l'agent qui exploite sans carte du système,
et la méthode qui se répète à l'identique projet après projet sans apprendre. La rétrospective
chiffrée qui m'a conduit à éliminer une équipe entière d'agents est le modèle de la seconde chose
[Ref. 6](../REFERENCIAS.md#ref-6).

Sur l'agent résident, la règle qui ordonne tout : **il agit au nom de quelqu'un**. Son identifiant
est rattaché à une personne responsable, et tout ce qu'il fait reste consigné au nom de cette
personne. Ce n'est pas un compte système anonyme : c'est un employé avec un chef. Cela définit son
périmètre (ce que cette personne l'a autorisé à faire) et sa traçabilité (qui répond de ce qu'il a
fait).

## 1. Contexte requis

Ce qui suit est la liste générique. Les fichiers concrets que vous devez avoir faits avant chaque
prompt, avec leur contenu et leur état minimum, sont dans la section 2, dans le bloc « Avant
d'envoyer le prompt » qui précède chacun d'eux.
Pour l'agent résident :
- Ce que l'agent peut faire en production et ce qu'il ne peut pas : lire, diagnostiquer, changer la
  configuration, exécuter des actions. C'est vous qui le décidez.
- Comment l'agent s'identifie auprès du système (un identifiant propre, rattaché à une personne
  responsable).
- Qui il prévient quand il trouve quelque chose qu'il ne peut pas résoudre (ticket, courriel).

Pour la rétrospective :
- Les incidents du projet, les coûts (jetons, quota, votre temps), les éléments en attente qui ont
  fait le plus d'allers-retours, et les dates.

## 2. Prompts

**Pour l'agent résident (initial) :**

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous (ou le métier avec vous) qui le
faites, pas l'agent :

- La décision de laisser un agent résident, prise avec le propriétaire et écrite : pour quoi
  (support, diagnostic) et avec quelles limites initiales.
- Un identifiant propre à l'agent en production, créé par vous, rattaché à une personne
  responsable avec un nom, avec le périmètre minimal (lecture seule, pour commencer) ; la valeur,
  hors du chat et du dépôt.
- `docs/LOCKS.md` (échelon 14) et `docs/DEPLOYMENT.md` (échelon 15), à jour : le prompt lui
  demande de lire le premier.
- Qui l'agent prévient quand il trouve quelque chose qu'il ne peut pas résoudre : un canal
  (ticket, courriel) décidé par vous.
- État minimum acceptable : l'identifiant existe, il a un propriétaire humain, et il est en
  lecture seule.
> We are going to leave you resident in production. First, build the map of the system you will
> need in order to operate it: modules, environments, where each configuration lives, which
> actions are consequential (read `docs/LOCKS.md`), whom to notify. If there are parts of the
> system you cannot see from where you are, tell me; the map must not have hidden gaps. Then
> propose your scope in three levels: read-only and diagnosis; configuration changes with my
> approval; consequential actions behind locks. I choose the level. Your credential acts as the
> person who created it: everything you do is logged under that person's name. Reply in my
> language.

> [fr]
> Nous allons te laisser résident en production. D'abord, construis la carte du système dont tu
> auras besoin pour l'exploiter : modules, environnements, où vit chaque configuration, quelles
> actions ont des conséquences (lis `docs/LOCKS.md`), qui prévenir. S'il y a des parties du
> système que tu ne peux pas voir d'où tu es, dis-le-moi ; la carte ne doit pas avoir de trous
> cachés. Ensuite propose ton périmètre en trois niveaux : lecture seule et diagnostic ;
> changements de configuration avec mon approbation ; actions à conséquences derrière des verrous.
> C'est moi qui choisis le niveau. Ton identifiant agit comme la personne qui l'a créé : tout ce
> que tu fais est consigné au nom de cette personne. Réponds dans ma langue.

Ce que je lui demande : la carte du système avant d'exploiter (exploiter sans carte est l'échec
que cet échelon évite) ; la clause de complétude sous sa forme : **les trous de la carte se
déclarent, on ne les cache pas** ; les trois niveaux de périmètre pour que vous en choisissiez un
et non un « ça dépend » ; et la règle de l'identifiant au nom d'une personne.

**Pour l'agent résident (de clôture) :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- La carte et les trois niveaux que l'agent a proposés, lus par vous, et votre choix du niveau
  (pour commencer, toujours le premier).
- Une action concrète hors du périmètre choisi, pensée par vous, pour que l'agent l'essaie et que
  vous voyiez le refus dans le journal (avec le niveau 1, par exemple : changer une
  configuration).
- État minimum acceptable : vous avez choisi le niveau et vous savez quelle tentative doit
  échouer.
> Level [X]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the credential (never its
> value), and the procedure to request my approval. Then prove, with a real attempt recorded in
> the log, that something outside your scope is rejected.

> [fr]
> Niveau [X]. Écris dans `docs/RESIDENT_AGENT.md` la carte, le périmètre, l'identifiant (jamais
> sa valeur), et la procédure pour demander mon approbation. Ensuite démontre, avec une tentative
> réelle consignée dans le journal, que quelque chose hors de ton périmètre est refusé.

Ce que je lui demande : le document de l'agent résident (sans la valeur de l'identifiant,
jamais), et la preuve en rouge du périmètre : une tentative réelle, consignée, de faire quelque
chose hors du niveau, refusée. C'est l'échelon 8 appliqué aux permissions.

**Pour la rétrospective :**

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous (ou le métier avec vous) qui le
faites, pas l'agent :

- Les chiffres que vous seul avez, rassemblés avant : combien d'heures vous y avez consacrées (de
  votre agenda, pas de mémoire), combien vous avez dépensé dans l'outil d'IA (la facture ou le
  panneau de consommation), combien de quota d'intégration continue a été utilisé, et les dates de
  début et de fin de l'étape. Écrivez-les dans `docs/RETROSPECTIVE_INPUTS.md`, ou donnez-les-lui
  dans le chat quand il les demandera.
- La liste des incidents de l'étape, tels que vous vous en souvenez, avec une date approximative,
  pour la confronter à ce que l'agent sortira des éléments en attente et des commits. Ce dont vous
  vous souvenez et que l'agent ne trouve pas est un trou de documentation, et cela vaut la peine
  de le noter.
- `docs/PENDING.md` avec les éléments clos documentés (échelon 5) et `docs/DECISIONS.md`
  (échelon 6), qui sont la source des chiffres.
- État minimum acceptable : les heures et l'argent sont notés avec leur source. Sans cela, la
  rétrospective se fait avec des adjectifs.
> [The stage / the project] is over. Do the retrospective with numbers, not impressions: what it
> cost (tokens, quota, my time), how many pending items, which ones took the most rounds and why,
> which incidents happened and which step of the ladder each falls into, and which step failed
> or was missing. If you lack the data for any figure (my time, for instance), ask me for it or
> mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder:
> which step is modified, how, and which incident justifies it. Write it to
> `docs/RETROSPECTIVE_[date].md`. Reply in my language.

> [fr]
> [L'étape / le projet] est terminé(e). Fais la rétrospective avec des chiffres, pas avec des
> impressions : ce que ça a coûté (jetons, quota, mon temps), combien d'éléments en attente,
> lesquels ont fait le plus d'allers-retours et pourquoi, quels incidents il y a eu et dans quel
> échelon de l'échelle tombe chacun, et quel échelon a échoué ou a manqué. S'il te manque la donnée
> pour un chiffre (mon temps, par exemple), demande-la-moi ou marque-le comme estimation ; ne
> l'invente pas. Termine par une proposition concrète de changement de l'échelle : quel échelon est
> modifié, comment, et quel incident le justifie. Écris-la dans `docs/RETROSPECTIVE_[date].md`.
> Réponds dans ma langue.

Ce que je lui demande : des chiffres avec leur source (coûts, éléments en attente,
allers-retours, incidents) ; chaque incident rapporté à un échelon, parce qu'un incident qui ne
tombe dans aucun est un échelon qui manque ; la clause de complétude pour les chiffres qu'il n'a
pas (demander ou marquer comme estimation) ; et **au moins une proposition concrète de changement
de l'échelle**, parce qu'une rétrospective qui ne change rien n'a pas été une rétrospective.

## 3. Résultat attendu

- `docs/RESIDENT_AGENT.md` : carte du système, périmètre choisi, identifiant rattaché à une
  personne, procédure d'approbation, et la preuve du refus consignée dans le journal.
- `docs/RETROSPECTIVE_[date].md` : les chiffres avec leur source, les incidents rapportés aux
  échelons, et au moins une proposition de changement de l'échelle avec sa justification.

## 4. Vérification de complétude

- La carte du système dit-elle ce que l'agent NE peut PAS voir ? Si elle ne le dit pas, elle a des
  trous cachés.
- Avez-vous prouvé (ou vu dans le journal) qu'une action hors du périmètre est refusée ?
- L'identifiant de l'agent agit-il au nom d'une personne identifiable ?
- La rétrospective a-t-elle des chiffres avec leur source, ou des adjectifs ? (« Ça a coûté
  cher » n'est pas un chiffre.)
- Chaque incident tombe-t-il dans un échelon ? Si l'un ne tombe dans aucun, il manque un échelon :
  c'est ça, la proposition de changement.
- Y a-t-il au moins une proposition concrète de changement de l'échelle ? Si la rétrospective ne
  change rien, ce n'était pas une rétrospective.

## 5. Signaux d'alarme

- L'agent résident « a besoin » d'un niveau de permissions plus élevé chaque semaine. Vérifiez si
  ce qu'il demande sert à résoudre des problèmes du système ou ses propres limites.
- La rétrospective dit que tout s'est bien passé. Tout ne se passe jamais bien ; elle est écrite
  pour vous, pas pour la méthode.
- Deux projets d'affilée ont eu le même incident et l'échelle n'a pas changé entre les deux.
  L'échelon 23 ne se clôt pas : on écrit la rétrospective et on ne l'applique pas.
