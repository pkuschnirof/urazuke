# Étape 15 — L'agent dans le système, et la rétrospective chiffrée (contrat de l'échelon)

**Phase :** exploitation (quand le système est déjà en production) et clôture (revient à l'échelon
0 pour le projet suivant).
**Forme :** deux parties : une conversation pour définir le périmètre de l'agent résident, et un
envoi long pour la rétrospective.
**Taille :** l'agent résident est facultatif (beaucoup de systèmes n'en ont pas besoin ; ceux dont
les utilisateurs demandent du support, si). La rétrospective est obligatoire dans tout projet, même
d'une page : sans elle la méthode n'apprend pas.

## À quoi il sert

Deux choses qui ferment le même cycle. D'abord : l'agent reste résident en production, avec un
périmètre borné, pour diagnostiquer, exploiter et assurer le support sans que le constructeur ait à
être là. Ensuite : la méthode elle-même se révise avec des chiffres, et ce qu'on apprend change
l'échelle. Il évite l'agent exploitant sans carte du système, et la méthode qui se répète à
l'identique projet après projet sans apprendre (l'équipe multi-agents a été tuée par une
rétrospective : 60 dollars et 73 minutes contre 90 minutes).

Sur l'agent résident, la règle qui ordonne tout : **il agit au nom de quelqu'un**. Son identifiant
est rattaché à une personne responsable, et tout ce qu'il fait est journalisé au nom de cette
personne. Ce n'est pas un compte système anonyme : c'est un employé avec un chef. Cela définit son
périmètre (ce que cette personne lui a autorisé) et sa traçabilité (qui répond de ce qu'il a fait).

## 1. Contexte requis

Pour l'agent résident :
- Ce que l'agent peut faire en production et ce qu'il ne peut pas : lire, diagnostiquer, changer la
  configuration, exécuter des actions. Le propriétaire décide.
- Comment l'agent s'identifie auprès du système (un identifiant propre, rattaché à une personne
  responsable).
- Qui il prévient quand il trouve quelque chose qu'il ne peut pas résoudre (tickets, courriel).

Pour la rétrospective :
- Les incidents du projet, les coûts (jetons, quota, temps du propriétaire), les éléments en attente
  qui ont fait le plus de tours, et les dates.

## 2. Prompts

**Pour l'agent résident (initial) :**

> We are going to leave you resident in production. First, build the map of the system you will
> need in order to operate it: modules, environments, where each configuration lives, which
> actions are consequential (read `docs/LOCKS.md`), whom to notify. If there are parts of the
> system you cannot see from where you are, tell me; the map must not have hidden gaps. Then
> propose your scope in three levels: read-only and diagnosis; configuration changes with my
> approval; consequential actions behind locks. I choose the level. Your credential acts as the
> person who created it: everything you do is logged under that person's name. Reply in my
> language.

Ce que nous demandons : la carte du système avant d'exploiter (exploiter sans carte est l'échec
que cet échelon évite) ; la clause de complétude sous sa forme : **les trous de la carte se
déclarent, ne se masquent pas** ; les trois niveaux de périmètre pour que le propriétaire en
choisisse un et non un « ça dépend » ; et la règle de l'identifiant au nom d'une personne.

**Pour l'agent résident (de clôture) :**

> Level [X]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the credential (never its
> value), and the procedure to request my approval. Then prove, with a real attempt recorded in
> the log, that something outside your scope is rejected.

Ce que nous demandons : le document de l'agent résident (sans la valeur de l'identifiant, jamais),
et la preuve en rouge du périmètre : une tentative réelle, journalisée, de faire quelque chose hors
du niveau, rejetée. C'est l'échelon 7 appliqué aux permissions.

**Pour la rétrospective :**

> [The stage / the project] is over. Do the retrospective with numbers, not impressions: what it
> cost (tokens, quota, my time), how many pending items, which ones took the most rounds and why,
> which incidents happened and which step of the ladder each falls into, and which step failed
> or was missing. If you lack the data for any figure (my time, for instance), ask me for it or
> mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder:
> which step is modified, how, and which incident justifies it. Write it to
> `docs/RETROSPECTIVE_[date].md`. Reply in my language.

Ce que nous demandons : des chiffres sourcés (coûts, éléments, tours, incidents) ; chaque incident
rapporté à un échelon, parce qu'un incident qui ne tombe dans aucun est un échelon manquant ; la
clause de complétude pour les chiffres qu'il n'a pas (demander, ou marquer comme estimation) ; et
**au moins une proposition concrète de changement de l'échelle**, parce qu'une rétrospective qui ne
change rien n'était pas une rétrospective.

## 3. Résultat attendu

- `docs/RESIDENT_AGENT.md` : carte du système, périmètre choisi, identifiant rattaché à une
  personne, procédure d'approbation, et la preuve de refus journalisée.
- `docs/RETROSPECTIVE_[date].md` : les chiffres avec leur source, les incidents rapportés aux
  échelons, et au moins une proposition de changement de l'échelle avec sa justification.

## 4. Vérification de complétude

- La carte du système dit-elle ce que l'agent ne peut PAS voir ? Si elle ne le dit pas, elle a des
  trous masqués.
- Avez-vous testé (ou vu dans le journal) qu'une action hors périmètre est rejetée ?
- L'identifiant de l'agent agit-il au nom d'une personne identifiable ?
- La rétrospective a-t-elle des chiffres sourcés, ou des adjectifs ? (« Ça a coûté cher » n'est pas
  un chiffre.)
- Chaque incident tombe-t-il dans un échelon ? Si l'un ne tombe dans aucun, un échelon manque :
  c'est la proposition de changement.
- Y a-t-il au moins une proposition concrète de changement de l'échelle ? Si la rétrospective ne
  change rien, ce n'était pas une rétrospective.

## 5. Signaux d'alarme

- L'agent résident « a besoin » d'un niveau de permissions plus élevé chaque semaine. Vérifiez si ce
  qu'il demande sert à résoudre les problèmes du système ou ses propres limites.
- La rétrospective dit que tout s'est bien passé. Rien ne se passe jamais entièrement bien ; elle
  est écrite pour le propriétaire, pas pour la méthode.
- Deux projets consécutifs ont eu le même incident et l'échelle n'a pas changé entre les deux.
  L'échelon 15 n'est pas clos : on écrit la rétrospective et on ne l'applique pas.
