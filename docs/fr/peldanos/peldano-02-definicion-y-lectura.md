# Étape 2 — La définition du projet, l'arbre sémantique et la lecture obligatoire (contrat de l'échelon)

**Tronçon :** démarrage.
**Quand :** s'écrit une fois, après le contrat ; l'arbre sémantique et l'état
vivant se tiennent à jour pendant tout le projet, avec chaque bloc et chaque décision nouvelle.
**Forme :** conversation : l'agent rédige, demande ce qui manque, vous corrigez.
**Taille :** obligatoire dans tout projet. Dans un petit projet, le fichier de projet peut faire
cinquante lignes et l'arbre sémantique vingt nœuds ; ce qu'ils ne peuvent pas, c'est ne pas exister.

## À quoi il sert

Chaque session de l'agent démarre de zéro : il ne se souvient pas d'hier. Donnez-lui une carte,
courte, qui lui dise ce qu'est le projet, dans quel état il est et quelles décisions ont déjà été
prises, et obligez-le à la lire avant de toucher à quoi que ce soit. L'échec évité est double : du
travail jetable pour ne pas avoir lu la carte [Ref. 9](../REFERENCIAS.md#ref-9), et la carte qui
grossit jusqu'à devenir illisible [Ref. 41](../REFERENCIAS.md#ref-41). La règle pratique : **le
fichier de projet est le programme, pas l'historique**. Ce qui s'est passé va ailleurs.

La carte a deux pièces, et c'est la seconde qui fait le plus de travail. La première est le fichier
de projet : ce qu'est le système, pour qui, ce qu'il N'EST PAS, les décisions prises. La seconde
est l'**arbre sémantique** : le système décomposé comme un arbre, avec les domaines, et sous chacun
ses acteurs, ses processus (les cas d'utilisation), ses entités avec leurs états, ses écrans et
ses intégrations ; et de chaque nœud pendent les éléments en attente et les décisions qui le
touchent. L'arbre sort du relevé que vous avez fait avec les méthodes classiques de l'ingénierie
des exigences (entretiens, cas d'utilisation, modèle de domaine), l'agent le construit, vous le
corrigez, et c'est ce qui donne au modèle le contexte exact du nœud qu'il va toucher sans avoir à
lire tout le projet. Et c'est ce qui vous permet, à vous, de vérifier sans lire de code que le
système que l'agent comprend est celui que le métier a demandé.

## 1. Contexte requis

Ce qui suit est la liste générique. Les fichiers concrets que vous devez avoir faits avant chaque
prompt, avec leur contenu et leur état minimum, sont dans la section 2, dans le bloc « Avant
d'envoyer le prompt » qui précède chacun d'eux.
- Relevé du métier : ce que fait le client, qui utilise le système, quel problème il résout, ce
  qu'il ne doit pas faire. Avec les entretiens, les cas d'utilisation ou récits utilisateur que
  vous pouvez nommer, et les entités du métier avec leurs états, même s'ils sont incomplets.
- Le contrat de collaboration (échelon 1).
- S'il existe un système antérieur : un accès en lecture à son code ou à sa documentation.
- Les décisions déjà prises, s'il y en a, même à l'oral.

## 2. Prompts

**Initial :**

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous (ou le métier avec vous) qui le
faites, pas l'agent :

- `docs/INITIAL_SURVEY.md` (échelon 0), complété avec le relevé du métier. C'est vous qui
  l'écrivez à partir des entretiens de l'ingestion ; si vous avez utilisé une méthode (entretiens,
  cas d'utilisation, récits utilisateur, maquettes d'écran), dites laquelle et collez le résultat.
  Il doit contenir : ce que fait le client ; qui utilise le système (les acteurs, avec un nom de
  rôle) ; quel problème il résout ; ce qu'il ne doit PAS faire, dans une section à part, même avec
  deux items ; les cas d'utilisation ou récits utilisateur que nomme le propriétaire, avec ses
  mots, même s'ils tiennent en dix lignes ; les entités du métier avec leurs états (« un
  rendez-vous est en attente, confirmé, annulé »), même incomplètes ; les dessins ou les photos
  des écrans, s'il y en a ; les intégrations externes (messagerie, paiements, un autre système) ;
  et les décisions déjà prises, même si elles l'ont été de vive voix, avec leur date et qui les a
  prises.
- `docs/WORKING_AGREEMENT.md` (échelon 1), clos avec sa date et sa version.
- S'il existe un système antérieur : un accès en lecture à son code ou à sa documentation, avec le
  chemin ou le lien noté dans le relevé.
- État minimum acceptable : le relevé a la section « ce que ce n'est pas » avec au moins deux
  items, au moins un cas d'utilisation avec les mots du propriétaire, et au moins une entité avec
  ses états. Sans cela, l'arbre qui en sortira sera inventé, et vous n'aurez rien pour le
  comparer.
> We are going to define the project in writing. Read the business survey in
> `docs/INITIAL_SURVEY.md` and the working agreement in `docs/WORKING_AGREEMENT.md`. Evaluate
> whether the survey is sufficient to describe the system, its users, its domain and its
> boundaries; if it is not, ask me for what is missing before writing anything. Then write two
> things. First, `PROJECT.md`, three hundred lines at most, with: what the system is and for
> whom; what it is NOT; the main modules as a list; the decisions already made, each with its
> date; and the instruction to read this file and the semantic tree at the start of every
> session. Second, `docs/SEMANTIC_TREE.md`: the system as a tree, with the domains at the top
> level and, under each one, its actors, its processes (the use cases, each with actor, trigger,
> steps, outcome and exceptions), its entities with their attributes, states and transitions,
> its screens, and its external integrations. Mark every node you inferred rather than read in
> the survey, so that I can confirm or correct it. Separately, create `docs/STATUS.md` for the
> living state (what is being worked on, what is open): that file changes every day; the other
> two change only when the system changes. Reply in my language.

> [fr]
> Nous allons définir le projet par écrit. Lis le relevé du métier dans
> `docs/INITIAL_SURVEY.md` et le contrat de collaboration dans `docs/WORKING_AGREEMENT.md`. Évalue
> si le relevé suffit pour décrire le système, ses utilisateurs, son domaine et ses limites ; s'il
> ne suffit pas, demande-moi ce qui manque avant d'écrire quoi que ce soit. Ensuite écris deux
> choses. D'abord, `PROJECT.md`, de trois cents lignes au maximum, avec : ce qu'est le système et
> pour qui ; ce qu'il N'EST PAS ; les modules principaux sous forme de liste ; les décisions déjà
> prises, chacune avec sa date ; et l'instruction de lire ce fichier et l'arbre sémantique au
> début de chaque session. Ensuite, `docs/SEMANTIC_TREE.md` : le système sous forme d'arbre, avec
> les domaines au premier niveau et, sous chacun, ses acteurs, ses processus (les cas
> d'utilisation, chacun avec acteur, déclencheur, étapes, résultat et exceptions), ses entités
> avec leurs attributs, états et transitions, ses écrans et ses intégrations externes. Marque
> chaque nœud que tu as inféré plutôt que lu dans le relevé, pour que je le confirme ou le
> corrige. À part, crée `docs/STATUS.md` pour l'état vivant (ce sur quoi on travaille, ce qui est
> ouvert) : ce fichier change tous les jours ; les deux autres ne changent que quand le système
> change. Réponds dans ma langue.

Ce que je lui demande : qu'il évalue le relevé et pose des questions avant de rédiger ; que le
fichier de projet soit **court** (le plafond de trois cents lignes est arbitraire mais nécessaire :
sans plafond, ça grossit) ; qu'il dise explicitement ce que le système **n'est pas**, parce que ce
qui n'est pas dit est ce que le modèle va inventer ; que les décisions aient une date ; qu'il
construise l'**arbre sémantique** avec la structure complète (domaines, acteurs, cas d'utilisation
avec leurs parties, entités avec états et transitions, écrans, intégrations), qui est le modèle de
domaine de l'ingénierie des exigences mis sous forme d'arbre ; qu'il **marque ce qu'il a inféré**,
parce que c'est là que se cachent les inventions ; et qu'il sépare l'état vivant dans un autre
fichier, pour que la carte ne se transforme pas en historique.

**De clôture :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- `PROJECT.md`, lu en entier par vous (il doit rentrer en cinq minutes), avec vos corrections
  notées : ce qui n'est pas vrai, ce qui n'est pas de vous, ce qui est en trop.
- `docs/SEMANTIC_TREE.md`, parcouru nœud par nœud comme si vous étiez le client : chaque nœud
  marqué comme inféré a votre verdict (confirmé ou corrigé), et vous avez noté les acteurs qui
  manquent, les états que le métier n'utilise pas, les écrans que personne n'a demandés.
- La liste des corrections, écrite, qui va dans le trou [list] du prompt. Si la liste est vide la
  première fois, méfiez-vous de votre lecture, pas de l'agent.
- État minimum acceptable : aucun nœud marqué « inféré » ne reste sans votre verdict.
> Apply these corrections: [list]. Finalize `PROJECT.md` and `docs/SEMANTIC_TREE.md` with
> today's date. Add to the working agreement two rules: the change history never goes into
> `PROJECT.md` (it goes to `docs/STATUS.md` or to the pending-items register); and every pending
> item must hang from a node of the semantic tree, and the tree is updated in the same commit
> whenever a block adds or changes a node.

> [fr]
> Applique ces corrections : [liste]. Finalise `PROJECT.md` et `docs/SEMANTIC_TREE.md` avec la
> date d'aujourd'hui. Ajoute au contrat de collaboration deux règles : l'historique des
> changements ne va jamais dans `PROJECT.md` (il va dans `docs/STATUS.md` ou dans le registre des
> éléments en attente) ; et tout élément en attente doit pendre d'un nœud de l'arbre sémantique,
> et l'arbre se met à jour dans le même commit chaque fois qu'un bloc ajoute ou change un nœud.

Ce que je lui demande : vos corrections (surtout sur les nœuds qu'il a marqués comme inférés), la
date, et deux règles nouvelles dans le contrat : celle qui protège le fichier de projet de devenir
un historique, et celle qui attache chaque élément en attente à un nœud de l'arbre, ce qui
maintient l'arbre vivant et vous permet de repérer en dix secondes un élément en attente hors
périmètre.

## 3. Résultat attendu

- `PROJECT.md` (ou `CLAUDE.md`) : court, de lecture obligatoire, avec ce que c'est, pour qui, ce
  que ce n'est pas, les modules, les décisions datées, et l'ordre de le lire avec l'arbre. Trois
  cents lignes au maximum.
- `docs/SEMANTIC_TREE.md` : l'arbre sémantique, avec les nœuds inférés marqués jusqu'à ce que vous
  les confirmiez, et, dès le premier bloc, les éléments en attente et les décisions pendus à leurs
  nœuds.
- `docs/STATUS.md` : l'état vivant, séparé des précédents.
- Dans les trois, une date de dernière mise à jour.
- Dans le contrat, les deux règles nouvelles.

## 4. Vérification de complétude

- `PROJECT.md` tient-il dans une lecture de cinq minutes ? Sinon, c'est mal fait : c'est le
  programme, pas l'historique.
- Dit-il explicitement ce que le système NE fait PAS ? (Ce qui manque est ce que l'agent va
  inventer.)
- Parcourez l'arbre sémantique comme si vous étiez le client : tous les acteurs que vous
  connaissez y sont-ils ? Chaque entité a-t-elle les états que le métier utilise, ni plus ni
  moins ? Y a-t-il un nœud que vous ne reconnaissez pas ? C'est une invention : corrigez-la
  maintenant.
- Les nœuds inférés sont-ils marqués ? Les avez-vous tous confirmés ou corrigés ?
- Chaque décision a-t-elle une date et le nom de qui l'a prise ?
- L'agent a-t-il posé une question sur le métier avant de rédiger ? S'il n'a rien demandé,
  vérifiez ce qu'il a supposé.
- L'état vivant est-il dans un autre fichier ?
- Le test de lecture : fermez la session, ouvrez-en une nouvelle, et demandez-lui ce que le
  système NE fait PAS et de quel nœud de l'arbre pend tel écran. S'il répond avec la carte,
  l'accrochage fonctionne.

## 5. Signaux d'alarme

- Le fichier de projet a grossi de plus de 20 % en un mois. Quelque chose qui n'est pas le
  programme est en train d'y entrer.
- L'agent commence une session en proposant quelque chose qui a déjà été décidé et qui est écrit.
  Il n'a pas lu la carte : l'accrochage de lecture obligatoire a échoué.
- La section « ce que ce n'est pas » est vide ou dit « rien de particulier ». Tout système a des
  limites ; si elles ne sont pas écrites, le modèle va les franchir.
- Il y a des éléments en attente qui ne pendent d'aucun nœud de l'arbre. Soit l'arbre a vieilli,
  soit ces éléments sont hors périmètre ; les deux choses sont à regarder.
- Une entité de l'arbre a un état que le métier n'a jamais nommé. Le modèle l'a inventé parce que
  cela lui a paru logique, et il va construire dessus.
