# Étape 4 — Le squelette avec ses portes (contrat de l'échelon)

**Phase :** démarrage (une fois).
**Forme :** un seul envoi long, avec l'approbation visuelle du propriétaire à la fin.
**Taille :** obligatoire dans tout projet qui aura des utilisateurs. Dans un prototype jetable on
peut le sauter ; mais si le prototype survit (ils survivent toujours), cet échelon est la première
chose à payer.

## À quoi il sert

À ce que le système démarre, soit testé et soit déployé VIDE avant d'avoir une fonctionnalité.
Découvrir le déploiement à la fin coûte très cher : dans Kikan il est arrivé un mois après le
démarrage et a coûté cinq éléments en attente d'affilée. Si le squelette est déployé la première
semaine, ces coups tombent avec zéro fonctionnalité en jeu.

L'idée générale derrière : **le chemin vers la production fait partie du produit**, ce n'est pas une
formalité de fin. Un système qui fonctionne sur la machine du programmeur et ne peut pas être
déployé n'est pas un système ; c'est une démo. Et la seule façon de savoir que le chemin fonctionne,
c'est de le parcourir quand il n'y a encore rien à perdre.

## 1. Contexte requis

- `docs/SIZING.md` (échelon 3) : l'option choisie définit le squelette.
- Relevé des environnements : où cela va tourner (cloud, serveur propre), s'il y a un environnement
  de test et un de production, qui a accès, comment on déploie aujourd'hui s'il y a quelque chose.
- Le type de projet : nouveau (greenfield), correctif ou évolution de quelque chose d'existant.

## 2. Prompts

**Initial :**

> We are going to build the skeleton of the system, with no functionality at all. Read
> `PROJECT.md`, `docs/SIZING.md` and the environments survey. Evaluate whether you have what is
> needed for the skeleton to run in the test environment (access, URL, deployment method); if
> anything is missing, ask me before starting. Then build: the folder structure; the server and
> the UI starting up; the test structure with one smoke test that passes; continuous
> integration running that test suite on every push; and the deployment to the test
> environment. Declare the gates of the workflow (what must be green to move from one stage to
> the next) in `docs/GATES.md`. When done, take a screenshot of the empty UI running in the
> test environment and show it to me. Do not add any functionality "while you are at it".
> Reply in my language.

Ce que nous demandons : qu'il vérifie qu'il a les accès avant de commencer (sans cela le squelette
reste sur la machine de l'agent) ; la liste exacte de ce qu'est un squelette (structure, démarrage,
un test, intégration continue, déploiement en test) ; les portes écrites ; une capture réelle de
l'environnement de test, qui est la seule preuve valable qu'il a été déployé ; et l'interdiction
explicite d'ajouter de la fonctionnalité, parce que le modèle a tendance au « tant que j'y suis » et
que cela casse le périmètre exact.

**De clôture :**

> Skeleton approved. Record in `docs/STATUS.md` the test environment URL, the command to run
> the tests and the command to deploy, and mark this step as done. Then run the deployment a
> second time and show me that the second run changed nothing.

Ce que nous demandons : laisser les trois commandes là où la prochaine session les trouvera, et
prouver que le déploiement est répétable (le lancer deux fois sans rien casser). Cette seconde
exécution est la preuve que la procédure est une procédure et non de la chance.

## 3. Résultat attendu

- Le dépôt avec la structure, le serveur et l'écran qui démarrent.
- Un test de fumée au vert et la batterie qui tourne en intégration continue (avec le lien vers
  l'exécution au vert).
- Le déploiement dans l'environnement de test qui fonctionne, avec l'URL, et lancé deux fois.
- `docs/GATES.md` : la liste des portes, chacune avec la condition pour passer.
- Une capture d'écran du système vide tournant dans l'environnement de test.
- `docs/STATUS.md` mis à jour avec les trois commandes (lancer, tester, déployer).

## 4. Vérification de complétude

- Pouvez-vous ouvrir l'URL de l'environnement de test et voir l'écran vide ? (C'est vous qui le
  faites, pas l'agent.)
- Y a-t-il un lien vers une exécution d'intégration continue au vert ?
- Le déploiement a-t-il été lancé deux fois, et la seconde n'a-t-elle rien cassé ?
- Les portes sont-elles écrites avec une condition vérifiable chacune ?
- Y a-t-il une fonctionnalité que vous n'avez pas demandée ? Si oui, l'agent a violé le périmètre
  exact.

## 5. Signaux d'alarme

- Le squelette « fonctionne en local » mais le déploiement « on verra plus tard ». Non : le
  déploiement est le squelette.
- La capture d'écran vient de la machine de l'agent, pas de l'environnement de test. Demandez l'URL.
- Les portes disent des choses comme « le code est de bonne qualité ». Une porte est une condition
  vérifiable : « la batterie est au vert », « le déploiement en test a fonctionné ».
