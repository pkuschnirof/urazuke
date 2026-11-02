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

Deux choses de plus sont entrées avec D-082, et elles sont deux et non une. La première : **la
personne exécute pour accepter et l'agent parcourt pour trouver des défauts**, et la méthode
demande les deux. Le parcours agentique — que l'agent ouvre chaque écran, regarde ce qu'il y a
dessus, l'utilise et suive le flux d'un écran au suivant, comme le ferait une personne — ne
remplace pas l'exécution humaine et n'est pas non plus le test de bout en bout de l'échelon 8 :
celui de bout en bout parcourt un chemin que quelqu'un a choisi, et le parcours cherche ce que
personne n'a pensé à tester. Je le demande parce que je l'ai mesuré : de tout ce qu'un agent a fait
dans un cycle complet, le parcours a été **ce qui a trouvé le plus de défauts d'interface**, et la
méthode ne le demandait pas ; c'est l'agent qui se le demandait à lui-même. Il va dans
`docs/SCREEN_WALKTHROUGH.md`, avec son dénominateur : combien d'écrans le système a, combien il en
a parcourus et combien de défauts il a trouvés. Un écran dans lequel il n'a pas pu entrer se compte
dans le total et se nomme avec sa raison ; le sortir du dénominateur pour que le nombre soit joli
est exactement ce qu'interdit `CQ-19.1` de l'Annexe H.

Et la deuxième, qui est la limite de cet échelon dite en face : **écrire les cas et qu'une personne
les exécute sont deux états différents, et le second, la méthode ne peut pas l'imposer.** Aucun
programme ne peut vérifier qu'une personne a suivi un script avec ses propres mains, et une porte
qui l'exigerait ne pourrait être satisfaite qu'en mentant. Alors l'échelon exige ce qui peut être
vérifié — la déclaration — et la dette reste en vue : `cases_written`,
`cases_executed_by_a_person` et `execution_debt` en tête de `docs/MANUAL_TESTS.md`, et le second
chiffre est déplacé par une exécution signée et jamais par la lecture de l'agent. La déclaration
**n'ajoute pas une porte nouvelle** : ce que l'échelon exige de plus, c'est que la dette soit
écrite, non que le chiffre soit supérieur à zéro, parce qu'obliger une personne est ce que la
méthode ne peut pas faire. Ce qui **arrête**, et qui était déjà là depuis l'ancre 4 de l'Annexe H,
c'est qu'un cas que personne n'a joué par profil n'est pas un cas exécuté : je l'ai mesuré le
2026-11-02 avec l'évaluateur réel, et une installation qui implémente cette ancre passe au rouge en
disant que le registre des cas signés est vide. Donc ce qui manquait n'était pas un blocage :
c'était que la dette soit **lisible** — son chiffre et le nom de qui la doit — au lieu d'un registre
vide qui dit « personne n'a signé » sans dire qui devait signer ni depuis quand. Et il vaut la peine
de savoir, pour lire cet échelon, d'où vient la mesure qui l'a ouvert : le projet qui a avancé avec
le tableau vide tournait sur le **gelé** du schéma 1, où le seul contrôle de l'échelon 10 est que le
fichier existe. Je l'ai mesuré le 2026-11-02 dans un projet réel : les treize cas écrits, le tableau
d'exécution vide, l'échelon au vert, et un document de conformité qui affirmait six critères comme
vérifiés dont le vérificateur était une personne qui ne les a jamais exécutés. L'agent avait fait
exactement ce que l'échelon disait. Le trou était celui de l'échelon.

**Et la question que tout cela laisse, répondue sans détour : si personne n'a signé un seul cas,
est-ce que j'avance ?** Non. Je l'ai mesuré le 2026-11-02 avec l'évaluateur réel, et les deux moitiés
sont d'une seule pièce : avec le registre des signatures vide, l'échelon 10 sort **rouge** en disant
que personne n'a signé aucun cas, et avec un seul cas signé par une personne — avec son nom, sa date
et le profil avec lequel elle l'a exécuté — le même arbre, avec ses treize cas écrits et son
`execution_debt` à `pending_verifier`, cesse d'être rouge et passe à la vérification du propriétaire.
Donc ce qui freine n'est pas la dette, et ne l'a jamais été : ce qui freine, c'est que **personne
n'ait rien signé**, et cela est dans l'ancre 4 de l'Annexe H depuis `2026.10.1`, avant même que cette
déclaration existe. La dette n'ouvre ni ne ferme la barrière : elle la rend **lisible**, ce qui est
autre chose et c'est ce qui manquait.

Je l'écris parce qu'il fallait le dire ici et non le laisser déduire à chacun. Un projet qui a
franchi l'échelon 10 avec un registre de signatures vide ne l'a pas fait parce que la méthode le
permet : il a épinglé le **gelé** du schéma 1, où la seule vérification de l'échelon 10 est que le
fichier existe, et c'est exactement ce que `PND-055` et D-068 disent sur l'épinglage contre une
identité interne que la méthode ne peut pas nommer. Si cela t'est arrivé, la première chose à
regarder n'est pas l'échelon : c'est contre quelle version le projet est épinglé.

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
>
> `docs/MANUAL_TESTS.md` carries at its head three declarations that a gate reads, each one under
> its fixed key in English even when the file is in my language, because what this step owes is not
> the same as what it can prove. `cases_written`: how many cases are written.
> `cases_executed_by_a_person`: how many of those a person signed in their execution table, with a
> date and a name; you keep the first figure, and the second one moves only when a person executes
> -- never from your own reading of the system. `execution_debt`: `none` when the two figures are
> the same, or `pending_verifier` and then the cases nobody has executed yet, with who owes each
> execution and since when. That debt is not a gate of its own: what this step asks you for is the
> declaration and not a figure above zero, because the method cannot make a person execute. But it
> is never silent either, and a step that advances with its debt declared is honest in a way that a
> step advancing while it looks complete is not.
>
> And walk the screens yourself, which is a different thing from the execution a person owes and
> never a replacement for it: you walk to find defects, a person executes to accept. Go through
> every screen the system has as a person would -- open it, look at what is on it, use it, and
> follow the flow from one screen to the next -- and write `docs/SCREEN_WALKTHROUGH.md` with
> `screens_total`, how many screens the system has; `screens_walked`, how many of them you actually
> walked; and `walkthrough_findings`, how many defects the walk found. A screen you could not reach
> is counted in the total and named with its reason: taking it out of the denominator so that the
> figure reads better is the one thing this file must never do. For every defect: the screen, what
> you saw, what you expected instead, and the pending item you opened for it.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

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
>
> `docs/MANUAL_TESTS.md` porte en tête trois déclarations qu'une porte lit, chacune sous sa clé fixe
> en anglais même si le fichier est dans ma langue, parce que ce que cet échelon doit n'est pas la
> même chose que ce qu'il peut prouver. `cases_written` : combien de cas sont écrits.
> `cases_executed_by_a_person` : combien d'entre eux une personne a signés dans leur tableau
> d'exécution, avec une date et un nom ; le premier chiffre, c'est toi qui le tiens, et le second ne
> bouge que quand une personne exécute — jamais depuis ta propre lecture du système.
> `execution_debt` : `none` quand les deux chiffres sont le même, ou `pending_verifier` et alors les
> cas que personne n'a encore exécutés, avec qui doit chaque exécution et depuis quand. Cette dette
> n'est pas une porte à elle seule : ce que cet échelon te demande, c'est la déclaration et non un
> chiffre supérieur à zéro, parce que la méthode ne peut pas obliger une personne à exécuter. Mais
> elle n'est jamais silencieuse non plus, et un échelon qui avance avec sa dette déclarée est honnête
> d'une manière dont ne l'est pas un échelon qui avance en ayant l'air complet.
>
> Et parcours les écrans toi-même, ce qui est autre chose que l'exécution que nous devons à une
> personne et jamais un remplaçant de celle-ci : toi tu parcours pour trouver des défauts, une
> personne exécute pour accepter. Passe par chaque écran que le système a comme le ferait une
> personne — ouvre-le, regarde ce qu'il y a dessus, utilise-le, et suis le flux d'un écran au
> suivant — et écris `docs/SCREEN_WALKTHROUGH.md` avec `screens_total`, combien d'écrans le système
> a ; `screens_walked`, combien d'entre eux tu as vraiment parcourus ; et `walkthrough_findings`,
> combien de défauts le parcours a trouvés. Un écran où tu n'as pas pu entrer se compte dans le
> total et se nomme avec sa raison : le sortir du dénominateur pour que le chiffre se lise mieux est
> la seule chose que ce fichier ne peut jamais faire. Pour chaque défaut : l'écran, ce que tu as vu,
> ce que tu attendais à la place, et l'élément en attente que tu as ouvert pour cela.
>
> Quand tu as besoin d'une décision de ma part, demande-la avec les quatre parties de l'UX-28
> (`docs/ANEXO_HEURISTICAS.md`) et dans cet ordre : les données qui rendent la question
> nécessaire, énumérées ; un paragraphe de cinq lignes au plus qui les relie et laisse voir la
> question ; la question avec ses réponses possibles numérotées ; et ta recommandation. Dis-le à
> la profondeur technique que le projet a déclarée dans `communication_depth` —`beginner`,
> `decision_maker` ou `technical`— ; si le projet n'en a déclaré aucune, utilise `decision_maker`.

Ce que je lui demande : que le cas sorte des critères d'acceptation (ainsi il teste ce qui a été
demandé, pas ce que le modèle a compris) ; qu'il soit écrit pour quelqu'un qui ne sait pas comment
le système fonctionne, ce qui est la différence entre un cas de test et une note technique ; qu'il
inclue l'effet côté backend vérifiable par une personne, pour que le test manuel regarde lui aussi
de l'autre côté de l'écran ; que les cas soient tenus à jour dans le même commit, comme la
documentation ; et **que le modèle ne les exécute jamais**, parce qu'exécutés par le modèle ce
sont des tests de plus, et tout l'intérêt est qu'une personne les exécute.

Et ce que D-082 ajoute : que l'agent **parcoure les écrans de son propre chef**, ce qui est ce qui
trouve le plus de défauts d'interface et ce que la méthode ne demandait pas ; et que le fichier des
cas porte en tête la différence entre ce qui est écrit et ce qui a été exécuté, pour qu'un échelon
qui avance avec une dette avance **en le disant**. Le parcours ne remplace pas l'exécution humaine :
il la raccourcit, parce que la personne ne tombe plus sur les défauts que l'agent aurait pu voir en
regardant.

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
> the case or the system is the problem.
>
> Then refresh the three declarations at the head of the file: `cases_written`,
> `cases_executed_by_a_person` counted from the signed execution tables and from nothing else, and
> `execution_debt` with who still owes which execution and since when.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [fr]
> Lis les exécutions d'aujourd'hui dans `docs/MANUAL_TESTS.md`. Pour chaque cas qui a échoué, et
> pour chaque observation éparse à la fin du fichier, ouvre un élément en attente correctif dans
> `docs/PENDING.md` avec les mots de la personne comme façon de le reproduire, accroché au nœud de
> l'arbre sémantique qu'il touche ; ne corrige rien maintenant. Pour chaque cas qui est passé,
> rien. Dis-moi ensuite, flux par flux, combien de cas sont passés et combien ont échoué, comparé
> à l'exécution précédente, et quels échecs se répètent. Si un cas n'a pas pu être exécuté,
> dis-moi pourquoi et si le problème est le cas ou le système.
>
> Ensuite rafraîchis les trois déclarations de la tête du fichier : `cases_written`,
> `cases_executed_by_a_person` comptée depuis les tableaux d'exécution signés et depuis rien
> d'autre, et `execution_debt` avec qui doit encore quelle exécution et depuis quand.
>
> Quand tu as besoin d'une décision de ma part, demande-la avec les quatre parties de l'UX-28
> (`docs/ANEXO_HEURISTICAS.md`) et dans cet ordre : les données qui rendent la question
> nécessaire, énumérées ; un paragraphe de cinq lignes au plus qui les relie et laisse voir la
> question ; la question avec ses réponses possibles numérotées ; et ta recommandation. Dis-le à
> la profondeur technique que le projet a déclarée dans `communication_depth` —`beginner`,
> `decision_maker` ou `technical`— ; si le projet n'en a déclaré aucune, utilise `decision_maker`.
>
> Réponds dans ma langue.

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
- `docs/SCREEN_WALKTHROUGH.md` avec le parcours de l'agent : `screens_total`, `screens_walked` et
  `walkthrough_findings`, et chaque défaut avec son écran, ce qui a été vu, ce qui était attendu et
  son élément en attente.
- En tête de `docs/MANUAL_TESTS.md`, les trois déclarations qu'une porte lit : `cases_written`,
  `cases_executed_by_a_person` — que seule une exécution signée déplace — et `execution_debt` à
  `none` ou à `pending_verifier`, avec qui doit chaque exécution et depuis quand.

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
- `cases_executed_by_a_person` sort-il des tableaux signés et non de la lecture de l'agent ? Prends
  un cas compté comme exécuté et cherche la date et le nom dans son tableau.
- S'il y a une dette, `execution_debt` dit-il qui la doit et depuis quand ? Une dette sans nom
  n'est pas une dette : c'est un oubli avec de la mise en forme.
- Le parcours compte-t-il les écrans qu'il n'a pas pu ouvrir dans le total, avec leur raison ? Un
  `screens_walked` égal au total, dans un système avec des écrans derrière un profil que l'agent
  n'a pas, est un chiffre inventé.
- Les défauts du parcours ont-ils leur élément en attente, comme les échecs humains ?

- Si personne n'a encore signé un seul cas, le texte te dit-il que tu n'avances pas ? Pose la
  question au contrat et à la barrière — « si personne n'a exécuté, est-ce que j'avance ? » — et
  exige qu'ils répondent la même chose. Si le contrat dit oui et la barrière dit non, celui qui a
  tort, c'est le contrat.

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
- L'échelon figure comme accompli, `cases_executed_by_a_person` est à zéro **et la barrière t'a
  donné le vert**. Le chiffre à zéro n'est pas le problème : une dette déclarée est honnête. Le
  problème est le vert : sur le catalogue publié, un échelon 10 sans aucune signature sort rouge par
  l'ancre 4. S'il est sorti vert, ne le fête pas : regarde contre quelle `catalog_version` le projet
  est épinglé.
- Le parcours de l'agent n'a rien trouvé et le système a des écrans nouveaux. Parcourir n'est pas
  ouvrir : s'il n'y a pas de constats, le plus probable est qu'il ait regardé l'écran sans
  l'utiliser.
- Le parcours commence à servir d'excuse pour ne pas exécuter les cas. Ce sont deux choses avec
  deux buts, et celle qui accepte est celle de la personne.
