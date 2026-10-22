# Étape 8 — Les tests comme verrous, prouvés en rouge (contrat de l'échelon)

**Tronçon :** boucle.
**Quand :** avec chaque élément en attente, à sa clôture : le test en rouge et en vert, la
régression des voisins et le test de bout en bout du flux touché. La batterie complète de bout en
bout de tous les flux, à la clôture de chaque bloc et avant chaque déploiement en production.
**Forme :** un seul envoi ; l'agent exécute et rapporte, vous lisez le rapport.
**Taille :** obligatoire dans tout projet. C'est le cœur de la méthode : s'il y a un échelon qui ne
se négocie pas, c'est celui-ci.

## À quoi il sert

Un test que vous n'avez jamais vu échouer, vous ne savez pas s'il prouve quelque chose. La règle
ici n'est pas « écris des tests » : c'est « démontre que le test passe au rouge contre l'ancien
code, et ensuite au vert avec le nouveau ». Cela évite les tests qui passent parce qu'ils ne
prouvent rien, et le vert qui cache un bug [Ref. 44](../REFERENCIAS.md#ref-44).

Pourquoi cela importe plus avec un modèle qu'avec un programmeur humain : le modèle écrit le code
et le test **dans la même session, avec la même compréhension**. S'il a mal compris la demande, le
test va prouver ce qu'il a compris, et il va passer. Le rouge contre l'ancien code est la seule
façon bon marché de vérifier que le test regarde ce qui compte : si l'ancien code le passe, le
test ne distingue pas l'avant de l'après, et alors il ne sert à rien. Le cas qui le montre le mieux
est celui des compteurs qui ne coïncidaient pas [Ref. 26](../REFERENCIAS.md#ref-26).

Il y a une objection sérieuse à cet échelon, et je veux la laisser écrite parce qu'on va s'en
servir contre lui : le même agent qui écrit le test et le code peut **feindre le rouge**. Une étude
publiée en août 2026 a mesuré que, lorsqu'on demande à un agent le cycle du test d'abord, il saute
parfois le rouge, le raconte sans l'avoir lancé, ou implémente avant le test pour que celui-ci
passe d'entrée (c'est dans la Partie F du document principal, celle des travaux connexes). Ma
réponse a trois pièces, et les trois sont dans l'échelle. La première, ici : le rouge n'est pas un
récit, c'est un **reçu** : la commande exacte, l'identifiant de la version contre laquelle il a
tourné, le nombre de tests qui échouent et le code de sortie, le tout collé tel qu'il est sorti, de
manière que vous puissiez le relancer avec une seule commande sans comprendre ce qu'il fait. La
deuxième, à l'échelon 13 : l'audit par une autre session relance un échantillon de ces reçus. La
troisième, à l'échelon 9 : les tests de mutation, qui plantent des erreurs exprès et comptent
combien les tests en attrapent ; c'est la seule mesure qui, dans cette même étude, a distingué les
tests qui surveillent de ceux qui décorent.

Et la seconde moitié : les tests de bout en bout. Un test qui vérifie depuis l'écran (clique,
saisit, lit) et contrôle l'effet dans le backend (la ligne est là, l'état a changé) est celui qui
remplace votre lecture du code. Les critères d'acceptation de l'élément en attente (« étant donné,
quand, alors ») sont son scénario. Et on les lance trois fois à trois échelles : le flux touché
avec chaque élément en attente, tous les flux à la clôture de chaque bloc, et tous les flux avec
la version exacte avant la production.

## 1. Contexte requis

Ce qui suit est la liste générique. Les fichiers concrets que vous devez avoir faits avant chaque
prompt, avec leur contenu et leur état minimum, sont dans la section 2, dans le bloc « Avant
d'envoyer le prompt » qui précède chacun d'eux.
- Le changement déjà implémenté (par défaut les tests viennent après l'implémentation ; « le test
  d'abord » reste une option pour les périmètres petits et bien définis).
- L'élément en attente qui origine le changement, avec ses critères d'acceptation et son
  « comment on vérifie ».
- La batterie existante et la commande pour la lancer (échelon 4).

## 2. Prompts

**Routine (va dans le contrat de collaboration ; s'applique à chaque changement) :**

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous (ou le métier avec vous) qui le
faites, pas l'agent :

- L'élément en attente que l'on est en train de clore, avec sa spécification complète dans
  `docs/PENDING.md` ; en particulier, ses critères d'acceptation sous la forme « étant donné,
  quand, alors » et son « comment cela se vérifie », qui sont le scénario du test. Si l'élément ne
  les a pas, revenez à l'échelon 5 avant de demander le test.
- Le changement déjà implémenté par l'agent (la méthode teste après avoir implémenté, sauf si vous
  choisissez « le test d'abord » pour une portée petite et bien définie).
- La batterie existante et la commande pour la lancer, notées dans `docs/STATUS.md` (échelon 4).
- L'environnement de test en marche et accessible à l'agent, avec assez de données de test pour le
  flux qui est touché. Si le flux a besoin de données qui n'existent pas (un patient, un
  rendez-vous d'hier), chargez-les vous-même ou demandez-lui de les créer dans le cadre du test ;
  ce qu'il ne peut pas faire, c'est les simuler.
- `docs/WORKING_AGREEMENT.md`, où va la routine la première fois.
- État minimum acceptable : la spécification a des critères d'acceptation, et la batterie tourne
  avec une commande connue.
> To close this pending item I need evidence, not your word. (1) Write the test that proves what the
> item asks for, following its acceptance criteria. (2) Demonstrate that this test fails against the
> previous code: you may temporarily revert the change, or run the test against the old version, but
> show me the red output as a receipt, not a summary: the exact command, the identifier of the
> version it ran against, the count of failing tests and the exit code, pasted as they came out, so
> that I can rerun it myself with one command. (3) Show me the green output with the change. (4) Run
> the regression suite for the neighbouring items and show me it is still green. (5) Run the
> end-to-end test of the flow this item touches, from the screen to the backend, and show me the
> backend effect. (6) Do not replace with mocks the very part you are trying to test. If testing end
> to end requires something you lack (data, access, an environment), ask me for it; do not simulate
> what you do not have. If the previous version does not have the module at all (the first block of
> a new project), a failure to load is not a red: prove the red by planting one deliberate defect in
> the function you just wrote (an inverted condition, a deleted line), show me the test failing
> against that defect as the same kind of receipt, with the diff of the defect, and then revert it.
> Finally, the commit message says "proved red against [what]" and the test counts.
>
> The same pending item also carries the Annex H test. Write it, and see it
> fail first: for every declared profile, what that profile can reach is
> exactly its row in `docs/PROFILE_MATRIX.md`, neither less nor more, and
> every route checks the permission on the server, because hiding the entry
> point protects nothing (Annex H, UX-11, UX-12, UX-15). A matrix that
> nothing exercises is a document nobody reads.

> [fr]
> Pour clore cet élément en attente, j'ai besoin d'une preuve, pas de ta parole. (1) Écris le test
> qui prouve ce que l'élément demande, en suivant ses critères d'acceptation. (2) Démontre que ce
> test échoue contre le code précédent : tu peux annuler temporairement le changement, ou lancer
> le test contre l'ancienne version, mais montre-moi la sortie en rouge comme un reçu, pas comme
> un résumé : la commande exacte, l'identifiant de la version contre laquelle il a tourné, le
> nombre de tests qui échouent et le code de sortie, collés tels qu'ils sont sortis, pour que je
> puisse le relancer moi-même avec une seule commande. (3) Montre-moi la sortie en vert avec le
> changement. (4) Lance la régression des éléments voisins et montre-moi qu'elle est toujours au
> vert. (5) Lance le test de bout en bout du flux que cet élément touche, depuis l'écran jusqu'au
> backend, et montre-moi l'effet dans le backend. (6) Ne remplace pas par des simulations
> précisément la partie que tu es en train de tester. Si tester de bout en bout requiert quelque
> chose que tu n'as pas (des données, un accès, un environnement), demande-le-moi ; ne simule pas
> ce que tu n'as pas. Si la version précédente n'a pas du tout le module (le premier bloc d'un
> nouveau projet), un fichier qui ne se charge pas n'est pas un rouge : prouve le rouge en plantant
> volontairement un défaut dans la fonction que tu viens d'écrire (une condition inversée, une
> ligne supprimée), montre-moi le test qui échoue contre ce défaut sous la même forme de reçu, avec
> le diff du défaut, puis annule-le. Enfin, le message du commit dit « prouvé en rouge contre
> [quoi] » et les chiffres des tests.
>
> Le même élément porte aussi le test de l'Annexe H. Écrivez-le et voyez-le
> échouer d'abord : pour chaque profil déclaré, ce que ce profil peut
> atteindre est exactement sa ligne dans `docs/PROFILE_MATRIX.md`, ni moins
> ni plus, et chaque route vérifie la permission côté serveur, car masquer
> le point d'entrée ne protège rien (Annexe H, UX-11, UX-12, UX-15). Une
> matrice que rien n'exerce est un document que personne ne lit.

**Le rouge du premier bloc.** Dans le premier bloc d'un nouveau projet il n'y a pas de code précédent : le nouveau test échoue parce que le module n'existe pas, et cet échec ne prouve pas que le test distingue un comportement. C'est pourquoi, quand la version précédente n'a pas le module, le rouge se prouve **par mutation** : l'agent plante volontairement un défaut dans la fonction qu'il vient d'écrire, montre le test en rouge contre ce défaut (le reçu porte le diff du défaut, pour que vous voyiez qu'il n'était pas trivial), l'annule et montre le vert. Un seul mutant par élément en attente, exécuté et enregistré comme n'importe quel autre reçu ; les tests de mutation sur toute la base restent le renfort optionnel de l'échelon 9. (Décision D-037, issue de la pratique Turnera : six reçus de rouge qui disaient seulement « le fichier ne se charge pas ».)

Ce que je lui demande, clause par clause : (1) le test, guidé par les critères d'acceptation de
l'élément en attente ; (2) **le rouge démontré comme reçu** (commande, version, chiffres, code de
sortie), qui est la clause qui distingue cette méthode de « écris des tests » et celle qui empêche
que le rouge soit un récit ; (3) le vert ; (4) la régression des voisins dans la même session,
parce qu'un changement casse des choses à côté ; (5) le test de bout en bout du flux touché, avec
l'effet dans le backend à la vue ; (6) ne pas simuler précisément ce qu'on teste ; et la clause de
complétude adaptée à cet échelon : s'il manque quelque chose pour tester de bout en bout, **le
demander, pas le simuler**. Le message de commit avec les chiffres laisse la preuve là où vit le
code.

**À la clôture de chaque bloc et avant chaque déploiement en production :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- Tous les éléments en attente du bloc clos avec la routine (rouge, vert, régression, bout en bout
  du flux).
- La version exacte qui va être promue, identifiée (numéro de version ou commit) et déployée dans
  l'environnement de test ; dites-la dans le chat si elle n'est pas dans `docs/STATUS.md`.
- La liste des flux qui existent jusqu'ici, écrite par vous à partir des cas d'utilisation de
  l'arbre sémantique, pour la confronter à ce que l'agent dira avoir couvert. Sans votre liste,
  « tous les flux » est ce dont l'agent se souvient.
- État minimum acceptable : vous savez combien de flux la batterie doit parcourir avant de lui
  demander combien elle en a parcourus.
> Run the complete end-to-end suite of every flow that exists so far, in the test environment,
> with the exact version that will be promoted. Show me the counts, and for each flow the
> backend check that proves it. If any flow has no end-to-end test, say so and open a pending
> item for it; do not pass it as covered.

> [fr]
> Lance la batterie complète de bout en bout de tous les flux qui existent jusqu'ici, dans
> l'environnement de test, avec la version exacte qui va être promue. Montre-moi les chiffres et,
> pour chaque flux, la vérification dans le backend qui le prouve. Si un flux n'a pas de test de
> bout en bout, dis-le et ouvre un élément en attente pour cela ; ne le fais pas passer pour
> couvert.

Ce que je lui demande : la deuxième et la troisième échelle des tests de bout en bout, avec la
version exacte (pas « la dernière »), avec l'effet dans le backend par flux, et avec la clause de
complétude : ce qui n'est pas couvert se déclare et devient un élément en attente, on ne le fait
pas passer pour couvert.

**Quand l'agent dit qu'on ne peut pas tester :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- Le message de l'agent disant qu'on ne peut pas tester, lu avec attention : est-ce qu'on ne peut
  pas, ou est-ce qu'il lui manque quelque chose ? Si ce qui manque est un intrant que vous avez
  (des données, un accès, un environnement), donnez-le-lui et n'envoyez pas ce prompt. Ce prompt
  est pour quand il manque vraiment quelque chose dans le système (des identifiants sur les
  éléments de l'écran, un mode test du fournisseur externe).
- État minimum acceptable : vous avez distingué entre « il me manque un intrant » (vous le donnez)
  et « le système n'est pas testable ici » (ce prompt).
> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

> [fr]
> Explique pourquoi on ne peut pas le tester, ce qu'il faudrait ajouter pour que ce soit
> possible, et ouvre un élément en attente pour cela. Le changement n'est pas clos tant qu'il ne
> peut pas être testé.

Ce que je lui demande : que « on ne peut pas tester » ne soit pas la fin de la conversation mais
le début d'un élément en attente. La non-testabilité est de la dette, et la dette s'enregistre.

## 3. Résultat attendu

- Le nouveau test dans le dépôt, nommé d'après l'élément en attente qu'il clôt.
- Dans le rapport de l'agent et dans le message du commit : la sortie en rouge comme reçu (la
  commande, la version contre laquelle il a tourné, combien échouent, le code de sortie), la sortie
  en vert, et la régression au vert avec ses chiffres.
- Le test de bout en bout du flux touché, avec la preuve que le backend a changé (la ligne,
  l'enregistrement, l'état).
- À la clôture de chaque bloc et avant la production : la batterie complète de bout en bout au
  vert, par flux, avec la version exacte.

## 4. Vérification de complétude

- Le rapport montre-t-il le rouge ? Avec des chiffres : « 4 sur 8 échouent contre l'ancien
  critère ». S'il ne montre que du vert, l'échelon n'est pas gravi.
- Le rouge est-il un reçu ou un récit ? Il doit contenir la commande exacte, la version contre
  laquelle il a tourné, les chiffres et le code de sortie. Une fois par bloc, choisissez un élément
  en attente au hasard et lancez vous-même cette commande : le rouge doit réapparaître.
- La régression a-t-elle tourné dans la même session ? Combien de tests, combien au vert ?
- Y a-t-il une partie « simulée » (mock) juste là où est le changement ? Demandez à l'agent ce
  qu'il a simulé et pourquoi.
- Le commit cite-t-il l'élément en attente et dit-il « prouvé en rouge » ?
- Le test d'écran vérifie-t-il aussi l'effet dans le backend ?
- À la clôture du bloc : tous les flux sont-ils dans la batterie de bout en bout, ou y en a-t-il un
  qui « est couvert par les unitaires » ?

## 5. Signaux d'alarme

- Tous les nouveaux tests de la semaine sont passés au vert du premier coup, et on n'a jamais
  montré un rouge. Soit l'agent saute l'étape, soit les tests ne prouvent rien.
- La batterie prend de plus en plus de temps et personne ne sait pourquoi. C'est souvent que les
  tests de bout en bout ont été remplacés peu à peu par des simulations « pour que ça tourne
  vite ».
- L'agent rapporte « les tests passent » sans dire combien. Toujours avec des chiffres.
- Le rouge arrive raconté en prose (« le test a échoué comme prévu ») sans commande, sans version
  et sans chiffres. Un rouge sans reçu vaut autant qu'aucun rouge.
- Vous arrivez à la mise en production et la batterie complète de bout en bout tourne pour la
  première fois. Les clôtures de bloc ont manqué.
