# Étape 10 — Les cas de test manuel s'écrivent avec la fonctionnalité, et ce sont des personnes qui les exécutent (contrat de l'échelon)

**Tronçon :** boucle.
**Quand :** avec chaque élément en attente, à sa clôture, après le test en rouge (8) et la
qualité (9) : l'agent écrit les cas de test manuel du flux qu'il a touché. Ils sont exécutés par
des personnes à trois moments : à la clôture de chaque bloc (les tests humains), avant le premier
déploiement en production (les tests d'acceptation avec le propriétaire), et après chaque
déploiement, en une passe en lecture seule. Chaque exécution qui échoue réinjecte une exigence
dans la boucle comme élément en attente correctif.
**Forme :** routine de chaque élément en attente ; ensuite, exécution humaine par cycle.
**Taille :** obligatoire dans tout projet avec des utilisateurs : le cas de test manuel est le
seul test que le modèle n'écrit ni ne lance.

## À quoi il sert

La méthode a des tests automatiques en abondance : le test en rouge, la régression, le bout en
bout à trois échelles. Tous sont écrits et lancés par le modèle, et tous testent ce que le modèle
a compris. Il manque le test que fait une personne avec ses propres yeux et ses propres mains, en
suivant un scénario écrit, et qui trouve ce qu'aucun test ne trouve : le bouton qui est là où il
ne devrait pas, le message qui ne se comprend pas, le flux qui marche techniquement et qui,
humainement, ne sert à rien. La vue humaine et les tests humains étaient déjà dans la ligne du
temps ; ce qui manquait, c'est qu'ils aient un **scénario**, et que le scénario soit écrit par
celui-là même qui a construit la fonctionnalité, au même moment, à partir des critères
d'acceptation de l'élément en attente. Sans scénario, le test humain devient « joue un moment
avec le système », et ce qu'on trouve dépend de l'humeur du jour. Avec un scénario, il s'exécute
de la même façon à chaque fois, on enregistre ce qui s'est passé, et ce qui échoue revient dans
la boucle comme exigence. C'est la fermeture du circuit que montre le diagramme du processus :
l'exécution manuelle des cas de test réinjecte des exigences dans le développement.

Un cas de test manuel a toujours la même forme : un identifiant ; l'élément en attente qui lui
donne naissance ; la précondition (ce qui doit exister avant : un patient, un rendez-vous d'hier) ;
les étapes, numérotées, chacune avec ce que la personne fait et ce qu'elle doit voir ; le
résultat attendu à la fin, y compris l'effet côté backend qu'une personne peut vérifier (un
enregistrement qui apparaît, un message dans la boîte factice) ; les données de test à utiliser ;
et la place pour le résultat de chaque exécution : date, qui, passé ou échoué, observation.

**Si vous débutez.** Un *cas de test manuel* est une recette pour qu'une personne teste une
fonctionnalité : quoi préparer, quoi faire étape par étape, et ce qui doit se passer à chaque
étape. Il s'écrit pour que n'importe qui la suive de la même façon, sans savoir comment le système
est fait. *Exécuter* un cas, c'est suivre la recette et noter s'il est passé ou s'il a échoué. La
*précondition* est ce qui doit exister avant de commencer. Et *réinjecter* veut dire que ce que la
personne a trouvé de travers revient dans la liste des éléments en attente comme une demande
nouvelle, avec ses mots à elle.

## 1. Contexte requis

Ce qui suit est la liste générique. Les fichiers concrets que vous devez avoir faits avant chaque
prompt, avec leur contenu et leur état minimum, sont dans la section 2, dans le bloc « Avant
d'envoyer le prompt » qui précède chacun d'eux.

- L'élément en attente qu'on est en train de clore, avec ses critères d'acceptation « étant
  donné, quand, alors » (échelon 5) : ils sont la matière première du cas.
- L'environnement de test avec des données, pour que les étapes puissent vraiment se suivre.
- Qui va exécuter les cas (le propriétaire, un utilisateur de confiance) et quand (clôture de
  bloc, acceptation, après chaque déploiement).

## 2. Prompts

**Routine de chaque élément en attente (va dans le contrat de collaboration) :**

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous (ou le métier avec vous) qui le
faites, pas l'agent :

- L'élément en attente avec ses critères d'acceptation dans `docs/PENDING.md` (échelon 5), déjà
  construit et avec le test en rouge et la qualité au vert (échelons 8 et 9).
- `docs/MANUAL_TESTS.md` créé, même vide, avec le format du cas dans l'en-tête : identifiant,
  élément en attente, précondition, étapes (action et résultat visible), résultat attendu avec
  l'effet côté backend vérifiable par une personne, données de test, et le tableau des exécutions
  (date, qui, passé ou échoué, observation).
- La décision de qui exécute et quand, écrite dans `PROJECT.md` ou dans le contrat : pour un petit
  projet, le propriétaire à la clôture de chaque bloc et avant le premier déploiement.
- `docs/WORKING_AGREEMENT.md`, où va la routine.
- État minimum acceptable : le fichier existe avec son format et l'élément en attente a des
  critères d'acceptation.

> Every pending item that changes what a user sees or does is closed with its manual test cases
> written in `docs/MANUAL_TESTS.md`, derived from its acceptance criteria: one case per flow the
> item touches, with an id, the pending item, the precondition, the numbered steps (what the
> person does and what they must see), the expected result including a backend effect a person
> can verify without tools, the test data to use, and an empty execution table (date, who,
> passed or failed, observation). Write them for a person who does not know how the system is
> built. Keep the cases of closed items up to date: when a flow changes, its cases change in the
> same commit. Never mark a case as executed yourself: execution is human.
>
> Every manual case also runs once per affected profile, and it is derived
> from `docs/PROFILE_MATRIX.md` instead of being written by hand: a case run
> with a single profile is not an executed case (Annex H, anchor 4). At the
> close of each block add the two human checks no machine replaces: the
> first-click check, where I name the place I would look for a task and you
> compare that with the menu, and the real screenshot of the test
> environment.

> [fr]
> Tout élément en attente qui change ce qu'un utilisateur voit ou fait se clôt avec ses cas de
> test manuel écrits dans `docs/MANUAL_TESTS.md`, dérivés de ses critères d'acceptation : un cas
> par flux que l'élément touche, avec un identifiant, l'élément en attente, la précondition, les
> étapes numérotées (ce que la personne fait et ce qu'elle doit voir), le résultat attendu y
> compris un effet côté backend qu'une personne peut vérifier sans outils, les données de test à
> utiliser, et un tableau d'exécutions vide (date, qui, passé ou échoué, observation). Écris-les
> pour une personne qui ne sait pas comment le système est fait. Tiens à jour les cas des éléments
> clos : quand un flux change, ses cas changent dans le même commit. Ne marque jamais toi-même un
> cas comme exécuté : l'exécution est humaine.
>
> Chaque cas manuel s'exécute aussi une fois par profil concerné, et il est
> dérivé de `docs/PROFILE_MATRIX.md` au lieu d'être écrit à la main : un cas
> passé avec un seul profil n'est pas un cas exécuté (Annexe H, ancre 4). À
> la clôture de chaque bloc, ajoutez les deux vérifications humaines
> qu'aucune machine ne remplace : celle du premier clic, où je nomme
> l'endroit où je chercherais une tâche et vous comparez cela avec le menu,
> et la capture réelle de l'environnement de test.

Ce que je lui demande : que le cas sorte des critères d'acceptation (ainsi il teste ce qui a été
demandé, pas ce que le modèle a compris) ; qu'il soit écrit pour quelqu'un qui ne sait pas comment
le système fonctionne, ce qui est la différence entre un cas de test et une note technique ; qu'il
inclue l'effet côté backend vérifiable par une personne, pour que le test manuel regarde lui aussi
de l'autre côté de l'écran ; que les cas soient tenus à jour dans le même commit, comme la
documentation ; et **que le modèle ne les exécute jamais**, parce qu'exécutés par le modèle ce
sont des tests de plus, et tout l'intérêt est qu'une personne les exécute.

**Pour une exécution (clôture de bloc, acceptation, après un déploiement) :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- L'exécution faite : une personne a suivi les cas de `docs/MANUAL_TESTS.md` dans l'environnement
  de test (ou en production, en lecture seule, après un déploiement) et a noté dans le tableau de
  chaque cas la date, qui, passé ou échoué, et l'observation. Cela, c'est la personne qui le fait,
  à la main, avant de coller le prompt ; l'agent ne le fait pas.
- Les observations éparses qui ne tiennent dans aucun cas (ce qui a gêné, ce qui n'a pas été
  compris), notées à la fin du fichier avec la date.
- État minimum acceptable : tous les cas du périmètre ont un résultat d'aujourd'hui, même si
  c'est « n'a pas pu être exécuté » avec la raison.

> Read the executions of today in `docs/MANUAL_TESTS.md`. For every case that failed, and for
> every loose observation at the end of the file, open a corrective pending item in
> `docs/PENDING.md` with the person's words as the way to reproduce it, hanging from the node of
> the semantic tree it touches; do not fix anything now. For every case that passed, nothing. Then
> tell me, flow by flow, how many cases passed and how many failed, compared with the previous
> execution, and which failures repeat. If a case could not be executed, tell me why and whether
> the case or the system is the problem. Reply in my language.

> [fr]
> Lis les exécutions d'aujourd'hui dans `docs/MANUAL_TESTS.md`. Pour chaque cas qui a échoué, et
> pour chaque observation éparse à la fin du fichier, ouvre un élément en attente correctif dans
> `docs/PENDING.md` avec les mots de la personne comme façon de le reproduire, accroché au nœud de
> l'arbre sémantique qu'il touche ; ne corrige rien maintenant. Pour chaque cas qui est passé,
> rien. Dis-moi ensuite, flux par flux, combien de cas sont passés et combien ont échoué, comparé
> à l'exécution précédente, et quels échecs se répètent. Si un cas n'a pas pu être exécuté,
> dis-moi pourquoi et si le problème est le cas ou le système. Réponds dans ma langue.

Ce que je lui demande : la réinjection rendue opérationnelle : chaque échec humain est un élément
en attente correctif, avec les mots de la personne (pas ceux du modèle) comme reproduction, et
accroché à l'arbre ; la comparaison avec l'exécution précédente, qui est ce qui vous dit si le
système s'améliore ou se dégrade entre les blocs ; et la distinction entre « le cas est mal
écrit » et « le système est mauvais », qui sont deux éléments en attente différents.

## 3. Résultat attendu

- `docs/MANUAL_TESTS.md` avec un cas par flux touché par chaque élément en attente clos, dans le
  format, écrit pour une personne.
- Les exécutions enregistrées, avec la date et qui, à chaque cycle.
- Un élément en attente correctif pour chaque échec et pour chaque observation.
- La routine dans le contrat.

## 4. Vérification de complétude (vous la faites vous-même, sans lire de code)

- Prenez un cas au hasard et suivez-le vous-même dans l'environnement de test sans rien demander
  à l'agent : avez-vous réussi ? Si vous avez dû demander, le cas n'est pas écrit pour une
  personne.
- Chaque élément en attente clos qui touche un écran a-t-il son cas ? Demandez-lui la liste des
  éléments sans cas.
- Le cas dit-il quel effet vérifier de l'autre côté de l'écran, et comment une personne le
  vérifie ?
- La dernière exécution a-t-elle une date et un nom dans chaque cas ? Y en a-t-il un « passé »
  sans date ?
- Chaque échec de la dernière exécution a-t-il son élément en attente, avec les mots de la
  personne ?

## 5. Signaux d'alarme

- L'agent a marqué les cas comme exécutés. C'est lui qui les a exécutés, ce qui revient à ne pas
  les exécuter.
- Les cas sont des copies du test automatique en prose. Un cas manuel doit regarder ce que le
  test ne regarde pas : ce qui se voit, ce qui se comprend, ce qui gêne.
- Tous les cas passent à toutes les exécutions. Les personnes trouvent toujours quelque chose ;
  si elles ne trouvent rien, elles ne suivent pas le scénario ou le scénario ne demande pas de
  regarder.
- Les échecs se « corrigent » sur le moment, sans élément en attente. On perd les mots de la
  personne et la trace de ce qui s'est répété.
