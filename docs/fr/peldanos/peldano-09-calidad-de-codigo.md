# Étape 9 — Qualité du code vérifiée par machine, avec une porte (contrat de l'échelon)

**Tronçon :** boucle.
**Quand :** se monte une seule fois, à l'ouverture du premier bloc fonctionnel (dès que le
démarrage est fini), et dès lors tourne seul à chaque commit, comme porte de l'intégration
continue ; chaque élément en attente se clôt avec la qualité au vert, après le test en rouge (8)
et avant le cas de test manuel (10). À la clôture de chaque bloc et avant chaque déploiement, le
rapport de qualité se lit avec le propriétaire. Dans un système hérité, la première exécution est
la ligne de base et les constats entrent dans le backlog avec leur marque de vitesse.
**Forme :** un seul envoi pour le monter ; ensuite, routine de chaque changement et lecture par
bloc.
**Taille :** obligatoire à son niveau minimum dans tout projet (un linter et une limite de taille
dans la chaîne) ; complet, tests de mutation inclus, dans tout projet qui aura des utilisateurs.
Les tests de mutation restent un renfort optionnel seulement quand il n'y a pas d'utilisateurs
réels (un outil interne, un prototype que personne d'autre ne fait tourner).

## À quoi il sert

Le propriétaire ne lit pas le code, et c'est tout l'intérêt de la méthode. Mais le code existe,
quelqu'un va le maintenir (le prochain agent, le prochain développeur), et un code qui marche
aujourd'hui et qui sera illisible demain est une dette qui se paie au troisième mois. Si personne
ne le lit, **c'est une machine qui doit le regarder** : des outils qui, à chaque commit, mesurent
ce qu'un relecteur humain regarderait et le transforment en un chiffre avec une limite. Je l'ai
fait dans tous mes projets, sans le nommer comme un échelon, et un audit de qualité m'a renvoyé un
composant de plus de deux mille lignes et un fichier de projet de presque dix mille
[Ref. 41](../REFERENCIAS.md#ref-41) : aucun des deux n'aurait passé une limite de taille écrite.
Le cliquet statique, qui empêche un chiffre de qualité d'empirer
[Ref. 35](../REFERENCIAS.md#ref-35), est la forme que je donne à cet échelon.

Ce qui se mesure par machine, par ordre d'importance : que le code respecte un style unique (le
*linter* et le *formateur*) ; qu'aucune fonction ni aucun fichier ne dépasse une taille ; que la
*complexité* de chaque fonction reste sous une limite ; qu'il n'y ait ni code dupliqué ni code
mort ; que les dépendances soient déclarées et utilisées ; que la *couverture* des tests ne
baisse jamais (le cliquet) ; et, si le langage le permet, que les types soient cohérents. Rien de
tout cela ne remplace le test en rouge : un code impeccable peut être faux. Ce que cela évite,
c'est le code correct que plus personne ne peut toucher.

Et ce que j'arrête de traiter comme un renfort optionnel dans tout projet qui aura des
utilisateurs : les **tests de mutation**. Je les avais laissés comme « optionnels, recommandés »
dans une version antérieure de ce document, et une évaluation externe de la méthode m'a fait
remarquer la contradiction : si la Partie F dit que la mutation est, pour autant que je sache, la
seule mesure qui, dans les études de 2026, a distingué les tests qui prouvent de ceux qui décorent,
cela n'a pas de sens de la laisser hors du « complet » justement dans les projets où un test
décoratif de plus fait du tort à quelqu'un. Un outil plante des erreurs exprès dans le code (il change un « supérieur » en
« supérieur ou égal », efface une ligne, inverse une condition) et lance les tests ; chaque erreur
que les tests n'attrapent pas est un *mutant qui survit*, et la proportion d'attrapés est le score.
C'est la mesure qui complète le rouge démontré de l'échelon 8 : le rouge prouve qu'un test
surveille le changement d'aujourd'hui ; la mutation mesure à quel point la batterie entière
surveille. Et c'est, pour autant que je sache, la seule qui, dans les études de 2026, a distingué
les tests qui prouvent de ceux qui décorent (Partie F du document principal).

**Si vous débutez.** Un *linter* est un programme qui lit le code et signale ce qui est mal écrit
ou dangereux (une variable qui ne sert à rien, une comparaison qui donne toujours la même chose),
comme le correcteur orthographique d'un traitement de texte. Un *formateur* le met en forme avec
un style unique (indentations, espaces) pour que tout le code semble écrit par la même main. La
*complexité* d'une fonction, c'est le nombre de chemins différents qu'elle peut prendre (chaque
« si » l'augmente) ; une fonction avec quarante chemins, personne ne la comprend. Le *code
dupliqué*, c'est le même bloc copié à deux endroits : le jour où l'on en corrige un, l'autre reste
faux. La *couverture* est le pourcentage du code qui est exécuté par au moins un test. Et un
*cliquet* est un mécanisme qui ne laisse qu'améliorer : le chiffre d'aujourd'hui est le plancher
de demain. Les *tests de mutation* sont un programme qui casse le code exprès, un petit changement
à la fois, et regarde si un test s'en aperçoit ; si aucun ne s'en aperçoit, ce morceau de code
n'est pas surveillé.

## 1. Contexte requis

Ce qui suit est la liste générique. Les fichiers concrets que vous devez avoir faits avant chaque
prompt, avec leur contenu et leur état minimum, sont dans la section 2, dans le bloc « Avant
d'envoyer le prompt » qui précède chacun d'eux.

- L'intégration continue qui tourne à chaque push (échelon 4).
- Le premier bloc fonctionnel ouvert, avec au moins un élément en attente construit : sans code,
  il n'y a pas de qualité à mesurer.
- Votre décision sur les limites, ou la disposition à accepter celles que l'agent propose, avec
  sa raison.
- L'audit précédent (13, ou N3 dans un système hérité), s'il y en a eu un.

## 2. Prompts

**Initial (monter la porte) :**

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous (ou le métier avec vous) qui le
faites, pas l'agent :

- L'intégration continue qui tourne à chaque push (échelon 4), et le quota qu'il vous reste : les
  vérifications de qualité ajoutent des minutes.
- Au moins un élément en attente du premier bloc construit et clos avec l'échelon 8, pour qu'il y
  ait du vrai code à mesurer et non le squelette vide.
- Votre décision sur deux limites, écrite en une ligne : la taille maximum d'un fichier et d'une
  fonction (pour commencer, trois cents lignes et quarante), et si la couverture ne peut que
  monter. Le reste, l'agent le propose et vous l'approuvez.
- Dans un système hérité : `docs/AUDIT_[date].md` (N3), pour que l'agent ne rapporte pas ce qui
  est connu et que la première exécution soit la ligne de base.
- État minimum acceptable : la chaîne tourne, il y a le code d'un élément en attente clos, et
  vous avez écrit les deux limites.

> We are going to make the code quality verified by machine, because nobody is going to read the
> code. Set up, in continuous integration, on every push: (1) a linter and a formatter with one
> configuration for the whole repository, failing the build on any violation; (2) limits on the
> size of every file and every function ([file lines] and [function lines]) and on the complexity
> of every function, failing the build when exceeded; (3) detection of duplicated code and of dead
> code (unused functions, variables, imports, dependencies); (4) a test coverage report with a
> ratchet: the measured coverage of today becomes the floor, and the build fails if it drops; (5)
> type checking if the language allows it. Run all of it now on the current code and write
> `docs/CODE_QUALITY.md` with: the tools, the configuration, every limit with its current measured
> value, and the list of what fails today with where it is. Do not fix anything yet: what fails
> today becomes pending items, and I decide which limits apply now and which are raised with a
> date. Make the whole set a gate in `docs/GATES.md`: nothing is merged with quality red.
>
> Extend this gate to the screen frontier, as Annex H section 4 declares: no
> business rule inside a screen, one typed client for every server call, one
> home for shared state, no user-visible string outside the translation
> catalogue, a stable identifier and role on every interactive element,
> styling only through tokens, and automatic basic accessibility checks.
> Every rule carries its stable id, its severity and its named verifier; the
> thresholds and the exceptions are declared by me in the project
> configuration file, and a rule switched off with no written exception is a
> failure of the gate, not a decision. `docs/CODE_QUALITY.md` and
> `docs/USABILITY.md` report result by result, never as a single number. The
> catalogue is `docs/ANEXO_HEURISTICAS.md`: cite it, do not copy it.
>
> Reply in my language.

> [fr]
> Nous allons faire en sorte que la qualité du code soit vérifiée par machine, parce que personne
> ne va lire le code. Monte, dans l'intégration continue, à chaque push : (1) un linter et un
> formateur avec une seule configuration pour tout le dépôt, qui font échouer la construction à la
> moindre violation ; (2) des limites à la taille de chaque fichier et de chaque fonction
> ([lignes par fichier] et [lignes par fonction]) et à la complexité de chaque fonction, qui font
> échouer la construction quand elles sont dépassées ; (3) la détection du code dupliqué et du
> code mort (fonctions, variables, imports et dépendances inutilisés) ; (4) un rapport de
> couverture de tests avec cliquet : la couverture mesurée aujourd'hui devient le plancher, et la
> construction échoue si elle baisse ; (5) la vérification des types si le langage le permet.
> Lance tout cela maintenant sur le code actuel et écris `docs/CODE_QUALITY.md` avec : les outils,
> la configuration, chaque limite avec sa valeur mesurée actuelle, et la liste de ce qui échoue
> aujourd'hui avec l'endroit où c'est. Ne corrige rien encore : ce qui échoue aujourd'hui devient
> des éléments en attente, et c'est moi qui décide quelles limites s'appliquent tout de suite et
> lesquelles sont relevées avec une date. Fais de l'ensemble une porte dans `docs/GATES.md` : rien
> n'est fusionné avec la qualité au rouge.
>
> Étendez cette porte à la frontière de l'écran, comme la section 4 de
> l'Annexe H le déclare : aucune règle métier dans un écran, un seul client
> typé pour chaque appel au serveur, un seul endroit pour l'état partagé,
> aucun texte visible hors du catalogue de traductions, un identifiant et un
> rôle stables sur chaque élément interactif, des styles uniquement par
> jetons et des contrôles automatiques d'accessibilité de base. Chaque règle
> porte son identifiant stable, sa sévérité et son vérificateur nommé ; les
> seuils et les exceptions sont déclarés par moi dans le fichier de
> configuration du projet, et une règle éteinte sans exception écrite est
> une défaillance de la porte, pas une décision. `docs/CODE_QUALITY.md` et
> `docs/USABILITY.md` rendent compte résultat par résultat, jamais en un
> seul nombre. Le catalogue est `docs/ANEXO_HEURISTICAS.md` : citez-le, ne
> le copiez pas.
>
> Réponds dans ma langue.

Ce que je lui demande : les cinq vérifications qu'un relecteur humain ferait, faites par machine
et avec la construction au rouge comme conséquence, parce qu'une vérification qui ne bloque pas
est un conseil ; les limites avec leur valeur mesurée, pour que la limite sorte du chiffre et non
d'une opinion ; le cliquet de couverture, qui est la pièce qui empêche la qualité de se dégrader
toute seule ; et **ne rien corriger encore**, parce que dans un système avec du code déjà écrit la
première exécution donne toujours du rouge et la décision de ce qui se corrige maintenant et de ce
qui se tolère avec une date m'appartient.

**Routine (va dans le contrat de collaboration) :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- `docs/CODE_QUALITY.md` lu par vous : comprenez-vous chaque limite et pourquoi elle est là ?
- Votre décision sur la liste de ce qui échoue aujourd'hui : ce qui se corrige maintenant (un
  élément en attente pour chaque) et ce qui se tolère avec une date, écrite dans le même fichier.
- `docs/WORKING_AGREEMENT.md`, où va la routine.
- État minimum acceptable : la porte est au vert ou chaque rouge a son élément en attente ou sa
  date.

> Every pending item is closed with the quality gate green: linter, formatter, size and
> complexity limits, no new duplication, no dead code, coverage at or above the ratchet. A quality
> failure is fixed in the same commit, never silenced with an exception, and a limit is never
> raised to pass; if a limit must change, say so with the reason and I decide. At the close of
> every block, show me `docs/CODE_QUALITY.md` with the numbers of the block against the previous
> one.

> [fr]
> Tout élément en attente se clôt avec la porte de qualité au vert : linter, formateur, limites de
> taille et de complexité, pas de duplication nouvelle, pas de code mort, couverture égale ou
> supérieure au cliquet. Un échec de qualité se corrige dans le même commit, ne se fait jamais
> taire avec une exception, et une limite ne se relève jamais pour passer ; si une limite doit
> changer, dis-le avec la raison et c'est moi qui décide. À la clôture de chaque bloc, montre-moi
> `docs/CODE_QUALITY.md` avec les chiffres du bloc face au précédent.

Ce que je lui demande : que la qualité fasse partie de la clôture de chaque élément en attente et
ne soit pas une tâche à part ; l'interdiction de faire taire (un modèle face à un linter au rouge
a tendance à ajouter l'exception au lieu de corriger, parce que c'est plus rapide) et de relever
la limite ; et la lecture par bloc, qui est le seul moment où vous, vous regardez les chiffres.

**Obligatoire dans tout projet qui aura des utilisateurs (optionnel seulement sans utilisateurs
réels) : tests de mutation.**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- La porte de qualité montée et au vert, avec la couverture mesurée dans `docs/CODE_QUALITY.md`.
- Au moins un bloc fonctionnel clos avec l'échelon 8, pour qu'il y ait des tests à muter.
- Votre décision sur le périmètre, écrite en une ligne : tout le code (cher, et cela n'a de sens
  qu'une fois, comme ligne de base) ou seulement les lignes changées par chaque élément en attente
  (le cas normal).
- État minimum acceptable : il y a une couverture mesurée et il y a un bloc clos.

> Add mutation testing to the quality gate, [on the whole codebase | only on the lines changed by
> each pending item]: a tool that plants small deliberate bugs in the code (a flipped condition, a
> deleted line, a changed operator) and runs the tests. Run it now and write in
> `docs/CODE_QUALITY.md`: the tool, the scope, the number of mutants planted, how many the tests
> killed, how many survived and where. Do not fix anything yet: every surviving mutant in code
> that matters becomes a pending item for a test that catches it, and I decide which ones matter.
> From now on, report the mutation score at the close of every block next to the coverage, and
> treat a drop as a quality failure. Reply in my language.

> [fr]
> Ajoute des tests de mutation à la porte de qualité, [sur tout le code | seulement sur les lignes
> changées par chaque élément en attente] : un outil qui plante exprès de petites erreurs dans le
> code (une condition inversée, une ligne effacée, un opérateur changé) et lance les tests.
> Lance-le maintenant et écris dans `docs/CODE_QUALITY.md` : l'outil, le périmètre, le nombre de
> mutants plantés, combien les tests en ont tués, combien ont survécu et où. Ne corrige rien
> encore : chaque mutant qui survit dans du code qui compte devient un élément en attente pour un
> test qui l'attrape, et c'est moi qui décide lesquels comptent. Dès maintenant, rapporte le score
> de mutation à la clôture de chaque bloc à côté de la couverture, et traite une baisse comme un
> échec de qualité. Réponds dans ma langue.

Ce que je lui demande : la mesure que la couverture ne donne pas (la couverture dit quel code a été
exécuté ; la mutation dit quel code est surveillé) ; le périmètre limité aux lignes changées, qui
est ce qui rend le coût payable à chaque élément en attente ; **ne rien corriger encore**, parce
que décider quel mutant compte m'appartient ; et le score à la clôture de chaque bloc, à côté de la
couverture, avec une baisse traitée comme du rouge.

## 3. Résultat attendu

- Le linter, le formateur, les limites, la détection de duplication et de code mort, la
  couverture avec cliquet et les types, qui tournent à chaque push et passent au rouge quand il
  le faut.
- `docs/CODE_QUALITY.md` avec les outils, la configuration, les limites avec leur valeur mesurée,
  et la liste de ce qui échoue avec son élément en attente ou sa date.
- La porte dans `docs/GATES.md` et la routine dans le contrat.
- Dans tout projet qui a des utilisateurs : le score de mutation dans `docs/CODE_QUALITY.md`, par
  bloc, à côté de la couverture, et un élément en attente pour chaque mutant qui survit dans du
  code qui compte.

## 4. Vérification de complétude (vous la faites vous-même, sans lire de code)

- Demandez-lui le lien de la dernière exécution de la chaîne : la qualité est-elle au vert ?
- Demandez-lui de mettre exprès, dans une branche, une fonction de cent lignes et une variable
  inutilisée : la chaîne passe-t-elle au rouge pour les deux choses ?
- La couverture d'aujourd'hui est-elle supérieure ou égale à celle de la clôture du bloc
  précédent ? Demandez les deux chiffres.
- Y a-t-il une exception au linter dans le code ? Demandez-lui la liste ; chacune doit avoir sa
  raison écrite.
- Une limite a-t-elle été relevée depuis la première exécution ? Avec quelle raison et qui l'a
  décidé ?
- Si le projet a des utilisateurs réels : les tests de mutation tournent-ils ? Sinon, quelle raison
  écrite justifie de ne pas les avoir ?
- S'il y a des tests de mutation : combien de mutants ont survécu dans le dernier bloc, et chacun
  a-t-il son élément en attente ou sa raison écrite ?

## 5. Signaux d'alarme

- La qualité est passée au vert du premier coup sur du code déjà écrit. Ce n'est presque jamais
  vrai : les limites sont beaucoup trop lâches.
- L'agent propose « de désactiver cette règle parce qu'elle est trop stricte ». Parfois il a
  raison ; cela doit toujours passer par vous avec la raison écrite.
- La couverture monte parce qu'on a ajouté des tests qui ne prouvent rien (le vert qui cache un
  bug, échelon 8). Le cliquet mesure la quantité ; le rouge démontré mesure la qualité. Ils vont
  ensemble.
- Un fichier a grossi jusqu'à la limite et a été coupé en deux fichiers au même contenu. C'est la
  duplication déguisée en conformité.
- La couverture est haute et le score de mutation est bas. Ce sont des tests qui exécutent le code
  sans rien vérifier : le cas exact que le rouge démontré de l'échelon 8 cherche à éviter.
- Le projet a des utilisateurs réels et personne n'a lancé les tests de mutation ni écrit
  pourquoi. « C'est optionnel » a cessé d'être une raison valable pour un projet qui a des
  utilisateurs.
