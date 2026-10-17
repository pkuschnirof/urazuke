# Étape 7 — Les tests comme verrous, prouvés en rouge (contrat de l'échelon)

**Phase :** boucle (chaque changement).
**Forme :** un seul envoi ; l'agent exécute et rapporte, le propriétaire lit le rapport.
**Taille :** obligatoire dans tout projet. C'est le cœur de la méthode : s'il y a un échelon qui ne
se négocie pas, c'est celui-ci.

## À quoi il sert

Un test que vous n'avez jamais vu échouer, vous ne savez pas s'il prouve quelque chose. La règle ici
n'est pas « écris des tests » : c'est « démontre que le test passe au rouge contre l'ancien code, et
ensuite au vert avec le nouveau ». Cela évite les tests qui passent parce qu'ils ne prouvent rien, et
le vert qui cache un bug.

Pourquoi cela importe plus avec un modèle qu'avec un programmeur humain : le modèle écrit le code
et le test **dans la même session, avec la même compréhension**. S'il a mal compris la demande, le
test prouvera ce qu'il a compris, et il passera. Le rouge contre l'ancien code est la seule façon
bon marché de vérifier que le test regarde ce qui compte : si l'ancien code le passe, le test ne
distingue pas l'avant de l'après, et alors il ne sert à rien.

## 1. Contexte requis

- Le changement déjà implémenté (par défaut les tests viennent après l'implémentation ; « le test
  d'abord » reste une option pour les périmètres petits et bien définis).
- L'élément en attente qui origine le changement, avec son « comment on vérifie ».
- La batterie existante et la commande pour la lancer (échelon 4).

## 2. Prompts

**Routine (va dans le contrat de collaboration ; s'applique à chaque changement) :**

> To close this pending item I need evidence, not your word. (1) Write the test that proves what
> the item asks for. (2) Demonstrate that this test fails against the previous code: you may
> temporarily revert the change, or run the test against the old version, but show me the red
> output. (3) Show me the green output with the change. (4) Run the regression suite for the
> neighbouring items and show me it is still green. (5) Do not replace with mocks the very part
> you are trying to test. If testing end to end requires something you lack (data, access, an
> environment), ask me for it; do not simulate what you do not have. Finally, the commit message
> says "proved red against [what]" and the test counts.

Ce que nous demandons, clause par clause : (1) le test ; (2) **le rouge démontré**, sortie
visible, qui est la clause qui distingue cette méthode de « écris des tests » ; (3) le vert ; (4) la
régression des voisins dans la même session, parce qu'un changement casse des choses à côté ; (5) ne
pas simuler justement ce qu'on teste ; et la clause de complétude adaptée à cet échelon : s'il manque
quelque chose pour tester de bout en bout, **le demander, pas le simuler**. Le message de commit
avec les chiffres laisse la preuve là où vit le code.

**Quand l'agent dit que ça ne peut pas être testé :**

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

Ce que nous demandons : que « ça ne peut pas être testé » ne soit pas la fin de la conversation
mais le début d'un élément en attente. La non-testabilité est de la dette, et la dette s'enregistre.

## 3. Résultat attendu

- Le nouveau test dans le dépôt, nommé d'après l'élément qu'il clôt.
- Dans le rapport de l'agent et dans le message de commit : la sortie en rouge (combien échouent,
  contre quelle version), la sortie en vert, et la régression en vert avec ses chiffres.
- Si cela a été testé de bout en bout (écran → backend), la preuve que le backend a changé (la
  ligne, l'enregistrement, l'état).

## 4. Vérification de complétude

- Le rapport montre-t-il le rouge ? Avec des chiffres : « 4 sur 8 échouent contre l'ancien
  critère ». S'il ne montre que du vert, l'échelon n'est pas gravi.
- La régression a-t-elle tourné dans la même session ? Combien de tests, combien au vert ?
- Y a-t-il une partie « simulée » (mock) juste là où est le changement ? Demandez à l'agent ce
  qu'il a simulé et pourquoi.
- Le commit cite-t-il l'élément et dit-il « prouvé en rouge » ?
- Si le test est un test d'écran, vérifie-t-il aussi l'effet sur le backend ?

## 5. Signaux d'alarme

- Tous les nouveaux tests de la semaine sont passés au vert du premier coup, et aucun rouge n'a
  jamais été montré. Soit l'agent saute l'étape, soit les tests ne prouvent rien.
- La batterie prend de plus en plus de temps et personne ne sait pourquoi. Généralement les tests
  de bout en bout ont été remplacés par des simulations « pour que ça tourne vite ».
- L'agent rapporte « les tests passent » sans dire combien. Toujours avec des chiffres.
