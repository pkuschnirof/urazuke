# Étape 9 — Mesurer avant de construire, avec un instrument lui-même vérifié (contrat de l'échelon)

**Phase :** boucle (chaque fois qu'un chiffre alimente une décision).
**Forme :** un seul envoi par mesure ; parfois une conversation quand l'hypothèse est celle du
propriétaire.
**Taille :** proportionnel. Dans un petit projet, « mesurer » peut être compter avec une commande
et noter le chiffre avec sa date ; le cliquet et le budget de requêtes sont pour les systèmes avec
du volume. Ce qui ne change pas avec la taille : aucun chiffre qui décide de quelque chose ne sort
d'une impression.

## À quoi il sert

À ce que tout chiffre qui alimente une décision sorte d'un programme avec un test, et non d'une
recherche de texte, d'une impression, ni de « je crois qu'il y en a une centaine ». Et à ce que
l'instrument lui-même soit audité, parce que les compteurs mentent : dans Kikan l'un ne voyait pas
84 appels avec le compteur à zéro, et un autre disait 27 quand il y en avait 44. Les cinq règles
sont : un compteur gardé ; si l'instrument n'existe pas, on le construit ; on audite dans les deux
sens ; l'approximatif se marque ; et celui qui exécute vérifie les chiffres de celui qui a planifié.

Il y a une raison de fond à l'existence de cet échelon : le modèle est très bon pour produire des
affirmations chiffrées (« il y a environ 120 boucles de ce type ») et ces affirmations sonnent
exactement pareil qu'elles soient mesurées ou estimées. Le propriétaire n'a aucun moyen de les
distinguer au ton. La seule façon est d'exiger l'instrument : « avec quoi l'as-tu mesuré ?
montre-moi la commande ». S'il n'y a pas de commande, c'est une impression, quel que soit le nombre
de décimales.

## 1. Contexte requis

- L'hypothèse, du propriétaire ou de l'agent : « je crois que le problème est X », « il doit y en
  avoir une centaine ».
- L'accès à ce qu'on veut mesurer : le code, la base en lecture seule, le journal.
- Les compteurs qui existent déjà dans le dépôt, s'il y en a.

## 2. Prompts

**Initial :**

> Before building anything, we are going to measure. The hypothesis is: [X]. Write a meter (a
> script that lives in the repository) that measures [the quantity], and a test for the meter
> that checks it against a known case where the answer is known in advance. If measuring
> requires access or data you lack, ask me; do not approximate silently. If some part can only
> be approximated, mark it as approximate and tell me the margin. Run the meter, show me the
> number together with the command that produces it, and audit it in both directions: from the
> code to the measurement (is everything that should be counted, counted?) and from the
> measurement to the code (does everything counted actually exist?). Only then propose what to
> build. Reply in my language.

Ce que nous demandons, clause par clause : le compteur **dans le dépôt** (pas une commande volante
qui se perd) ; le **test du compteur** contre un cas connu (la garde) ; la clause de complétude sous
sa forme pour mesurer (demander l'accès, ne pas approximer en silence) ; marquer l'approximatif avec
sa marge ; le chiffre **avec la commande** qui le produit, pour que le propriétaire puisse la
lancer ; l'audit dans les deux sens, qui est ce qui a démasqué les deux compteurs menteurs ; et
l'ordre : d'abord mesurer, ensuite proposer.

**Quand il y a un budget :**

> Set the budget for [queries / loops / time] on this path at the measured value plus a small
> margin, and protect it with a test that fails if it is exceeded. Tell me the number and the
> margin.

Ce que nous demandons : que le budget soit la valeur mesurée plus un peu, pas un chiffre rond, et
qu'il ait un test qui échoue s'il est dépassé. Ainsi une régression de performance apparaît dans la
batterie et non en production.

**Quand celui qui a planifié a donné des chiffres (règle cinq) :**

> Before executing the plan, verify every number the plan asserts with the meter. If any does
> not match, stop and tell me; do not execute on a wrong number.

Ce que nous demandons : que celui qui exécute ne fasse pas confiance aux chiffres de celui qui a
planifié, même si c'est le même modèle dans une autre session. Dans Kikan, trois affirmations du
plan sur quatre étaient fausses ; là où il y avait un instrument, le chiffre était exact.

## 3. Résultat attendu

- Le compteur dans le dépôt (`tools/measure_*.py`, `scripts/meter-*.mjs` ou similaire), avec son
  test.
- Le chiffre, avec la commande qui le produit et la date.
- L'audit dans les deux sens, écrit en deux ou trois lignes.
- L'approximatif marqué comme tel, avec sa marge.
- S'il y a un budget : la valeur, la marge, et le test qui le protège.
- Dans le commit : « measured: [number] with [meter] ».

## 4. Vérification de complétude

- Pouvez-vous lancer vous-même la commande du compteur et obtenir le même chiffre ? (C'est vous
  qui la lancez ; pas besoin de la comprendre, seulement de l'exécuter.)
- Le compteur a-t-il un test ? Contre quel cas connu ?
- Y a-t-il un chiffre dans le rapport sans compteur derrière ? Demandez d'où il vient.
- L'approximatif est-il marqué ?
- Si le plan apportait des chiffres, l'agent les a-t-il vérifiés avant d'exécuter et vous a-t-il
  dit lesquels ne collaient pas ?

## 5. Signaux d'alarme

- Un chiffre a changé entre deux rapports sans que le code change. L'un des deux n'a pas été
  mesuré.
- Le compteur donne zéro. Ce n'est presque jamais zéro ; c'est presque toujours que le compteur
  ne voit pas quelque chose (dans Kikan, deux fois).
- L'agent propose de construire « pendant qu'il mesure », pour gagner du temps. L'ordre est la
  méthode : d'abord le chiffre, ensuite le plan.
