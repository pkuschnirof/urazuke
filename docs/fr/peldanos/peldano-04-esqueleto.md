# Étape 4 — Le squelette avec ses portes (contrat de l'échelon)

**Tronçon :** démarrage.
**Quand :** une fois, à la clôture du démarrage, après le dimensionnement et avant toute
fonctionnalité. C'est ici que se fait toute l'infrastructure initiale et la chaîne d'intégration et
de déploiement.
**Forme :** un seul envoi long, avec votre approbation visuelle à la fin.
**Taille :** obligatoire dans tout projet qui aura des utilisateurs. Dans un prototype jetable, on
peut le sauter ; mais si le prototype survit (ils survivent toujours), cet échelon est la première
chose à payer.

## À quoi il sert

Faites en sorte que le système démarre, se teste et se déploie VIDE avant d'avoir des
fonctionnalités. Découvrir le déploiement à la fin coûte très cher : dans un de mes systèmes, il est
arrivé un mois après le démarrage et a coûté cinq éléments en attente d'affilée
[Ref. 32](../REFERENCIAS.md#ref-32). Si le squelette se déploie au démarrage, ces coups durs
se prennent avec zéro fonctionnalité en jeu.

L'idée générale derrière : **le chemin vers la production fait partie du produit**, ce n'est pas une
formalité de la fin. Un système qui fonctionne sur la machine du programmeur et qui ne peut pas se
déployer n'est pas un système ; c'est une démo. Et la seule façon de savoir que le chemin
fonctionne, c'est de le parcourir quand il n'y a encore rien à perdre. C'est pourquoi, dans cet
échelon, on monte tout ce que la boucle va utiliser ensuite : le dépôt avec sa structure,
l'environnement de test, l'intégration continue qui lance la batterie à chaque push, et le
déploiement automatique vers l'environnement de test.

## 1. Contexte requis

Ce qui suit est la liste générique. Les fichiers concrets que vous devez avoir faits avant chaque
prompt, avec leur contenu et leur état minimum, sont dans la section 2, dans le bloc « Avant
d'envoyer le prompt » qui précède chacun d'eux.
- `docs/SIZING.md` (échelon 3) : l'option choisie définit le squelette.
- Relevé des environnements : où ça va tourner (cloud, serveur propre), s'il y aura un
  environnement de test et un de production, qui a accès, comment on déploie aujourd'hui s'il y a
  quelque chose.
- Les identifiants de l'endroit où l'on va déployer, même si c'est un service gratuit.
- Le type de projet : nouveau, correction ou évolution de quelque chose d'existant.

## 2. Prompts

**Initial :**

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous (ou le métier avec vous) qui le
faites, pas l'agent :

- `docs/ENVIRONMENTS_SURVEY.md` : le relevé des environnements, écrit par vous. Où va tourner le
  système (un serveur que vous avez déjà, un service dans le nuage, lequel) ; s'il y aura un
  environnement de test et un de production, et s'ils existent déjà ; qui a accès à quoi ; comment
  on déploie aujourd'hui s'il y a quelque chose (à la main, un script, rien) ; le type de projet
  (nouveau, correction ou évolution de quelque chose d'existant) ; et l'URL ou le domaine qu'aura
  l'environnement de test, si on le sait déjà. Le prompt le nomme « the environments survey »,
  sans chemin : gardez-le sous ce nom, ou dites-lui dans le chat comment il s'appelle.
- Les identifiants de l'endroit où l'on va déployer, même si c'est un service gratuit : créés,
  essayés par vous une fois (entrer dans le panneau), et gardés hors du dépôt (dans un fichier
  d'environnement de votre machine ou dans le gestionnaire de secrets de votre outil). À l'agent,
  on lui dit où ils sont ; on ne les lui colle pas dans le chat.
- `PROJECT.md` (échelon 2) et `docs/SIZING.md` (échelon 3), clos : le squelette se construit sur
  l'option qui y a été choisie, et l'agent doit la lire.
- État minimum acceptable : vous pouvez entrer vous-même dans le service où l'on va déployer, et
  le relevé dit quel est l'environnement de test. Sans cela, le squelette reste sur votre machine
  et l'échelon n'est pas gravi.
> We are going to build the skeleton of the system, with no functionality at all. Read
> `PROJECT.md`, `docs/SIZING.md` and the environments survey. Evaluate whether you have what is
> needed for the skeleton to run in the test environment (access, URL, deployment method); if
> anything is missing, ask me before starting. Then build: the folder structure; the server and
> the UI starting up; the test structure with one smoke test that passes; continuous
> integration running that test suite on every push; and the deployment to the test
> environment. Declare the gates of the workflow (what must be green to move from one stage to
> the next) in `docs/GATES.md`. When done, take a screenshot of the empty UI running in the
> test environment and show it to me. Do not add any functionality "while you are at it".
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
> Nous allons construire le squelette du système, sans aucune fonctionnalité. Lis `PROJECT.md`,
> `docs/SIZING.md` et le relevé des environnements. Évalue si tu as ce qu'il faut pour que le
> squelette tourne dans l'environnement de test (accès, URL, méthode de déploiement) ; s'il manque
> quelque chose, demande-le-moi avant de commencer. Ensuite construis : la structure de dossiers ;
> le serveur et l'interface qui démarrent ; la structure de tests avec un test de fumée qui passe ;
> l'intégration continue qui lance cette batterie à chaque push ; et le déploiement vers
> l'environnement de test. Déclare les portes du flux de travail (ce qui doit être au vert pour
> passer d'une étape à la suivante) dans `docs/GATES.md`. Quand tu as fini, prends une capture de
> l'interface vide qui tourne dans l'environnement de test et montre-la-moi. N'ajoute aucune
> fonctionnalité « tant que tu y es ».
>
> Quand tu as besoin d'une décision de ma part, demande-la avec les quatre parties de l'UX-28
> (`docs/ANEXO_HEURISTICAS.md`) et dans cet ordre : les données qui rendent la question
> nécessaire, énumérées ; un paragraphe de cinq lignes au plus qui les relie et laisse voir la
> question ; la question avec ses réponses possibles numérotées ; et ta recommandation. Dis-le à
> la profondeur technique que le projet a déclarée dans `communication_depth` —`beginner`,
> `decision_maker` ou `technical`— ; si le projet n'en a déclaré aucune, utilise `decision_maker`.
>
> Réponds dans ma langue.

Ce que je lui demande : qu'il vérifie qu'il a les accès avant de commencer (sans cela, le
squelette reste sur la machine de l'agent) ; la liste exacte de ce qu'est un squelette (structure,
démarrage, un test, intégration continue, déploiement vers le test) ; les portes écrites ; une
capture réelle de l'environnement de test, qui est la seule preuve valable qu'il a été déployé ;
et l'interdiction explicite d'ajouter des fonctionnalités, parce que le modèle a tendance au
« tant que j'y suis » et que cela casse le périmètre exact.

**De clôture :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- La capture de l'environnement de test que l'agent vous a montrée, et votre propre visite de
  cette URL depuis votre navigateur : cela doit se voir pareil. C'est la première vue humaine du
  système, et c'est un jalon.
- Un lien vers une exécution d'intégration continue au vert, demandé à l'agent et ouvert par vous.
- `docs/GATES.md`, lu : chaque porte a une condition vérifiable.
- État minimum acceptable : vous avez vu l'écran vide à l'URL réelle, de vos yeux. Si vous n'avez
  vu que la capture, n'approuvez pas.
> Skeleton approved. Record in `docs/STATUS.md` the test environment URL, the command to run
> the tests and the command to deploy, and mark this step as done. Then run the deployment a
> second time and show me that the second run changed nothing.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [fr]
> Squelette approuvé. Enregistre dans `docs/STATUS.md` l'URL de l'environnement de test, la
> commande pour lancer les tests et la commande pour déployer, et marque cette étape comme faite.
> Ensuite lance le déploiement une seconde fois et montre-moi que la seconde exécution n'a rien
> changé.
>
> Quand tu as besoin d'une décision de ma part, demande-la avec les quatre parties de l'UX-28
> (`docs/ANEXO_HEURISTICAS.md`) et dans cet ordre : les données qui rendent la question
> nécessaire, énumérées ; un paragraphe de cinq lignes au plus qui les relie et laisse voir la
> question ; la question avec ses réponses possibles numérotées ; et ta recommandation. Dis-le à
> la profondeur technique que le projet a déclarée dans `communication_depth` —`beginner`,
> `decision_maker` ou `technical`— ; si le projet n'en a déclaré aucune, utilise `decision_maker`.

Ce que je lui demande : laisser les trois commandes là où la prochaine session les trouvera, et
prouver que le déploiement est répétable (le lancer deux fois sans rien casser). Cette seconde
exécution est la preuve que la procédure est une procédure et non un coup de chance.

## 3. Résultat attendu

- Le dépôt avec la structure, le serveur et l'écran qui démarrent.
- Un test de fumée au vert et la batterie qui tourne en intégration continue (avec le lien vers
  l'exécution au vert).
- Le déploiement vers l'environnement de test qui fonctionne, avec l'URL, et lancé deux fois.
- `docs/GATES.md` : la liste des portes, chacune avec la condition pour passer.
- Une capture d'écran du système vide qui tourne dans l'environnement de test.
- `docs/STATUS.md` mis à jour avec les trois commandes (lancer, tester, déployer).

## 4. Vérification de complétude

- Pouvez-vous ouvrir l'URL de l'environnement de test et voir l'écran vide ? (C'est vous qui le
  faites, pas l'agent.)
- Y a-t-il un lien vers une exécution d'intégration continue au vert ?
- Le déploiement a-t-il été lancé deux fois et la seconde n'a-t-elle rien cassé ?
- Les portes sont-elles écrites avec une condition vérifiable chacune ?
- Y a-t-il une fonctionnalité que vous n'avez pas demandée ? S'il y en a une, l'agent a violé le
  périmètre exact.

## 5. Signaux d'alarme

- Le squelette « fonctionne en local » mais le déploiement « on verra plus tard ». Non : le
  déploiement, c'est le squelette.
- La capture d'écran vient de la machine de l'agent, pas de l'environnement de test. Demandez
  l'URL.
- Les portes disent des choses comme « le code est de bonne qualité ». Une porte est une condition
  vérifiable : « la batterie est au vert », « le déploiement vers le test a fonctionné ».
