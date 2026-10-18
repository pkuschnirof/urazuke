# Étape 9 — Mesurer avant de construire, avec un instrument lui-même vérifié (contrat de l'échelon)

**Tronçon :** boucle.
**Quand :** chaque fois qu'un élément en attente dépend d'un chiffre ou d'une hypothèse de cause,
AVANT de construire. Au démarrage, le dimensionnement est le premier cas. Dans un petit projet,
« mesurer », c'est compter avec une commande et noter le chiffre avec la date.
**Forme :** un seul envoi par mesure ; parfois une conversation quand l'hypothèse est la vôtre.
**Taille :** proportionnel. Le cliquet et le budget de requêtes sont pour les systèmes avec du
volume. Ce qui ne change pas avec la taille : aucun chiffre qui décide de quelque chose ne sort
d'une impression.

## À quoi il sert

Faites en sorte que tout chiffre qui alimente une décision sorte d'un programme avec un test, et
non d'une recherche de texte, d'une impression, ni d'un « il me semble qu'il y en a une centaine ».
Et faites en sorte que l'instrument lui-même soit audité, parce que les compteurs mentent : un des
miens ne voyait pas 84 appels avec le compteur à zéro, et un autre disait 27 quand il y en avait 44
[Ref. 35](../REFERENCIAS.md#ref-35), [Ref. 36](../REFERENCIAS.md#ref-36). Les cinq règles que j'ai
écrites après cela sont : compteur gardé ; si l'instrument n'existe pas, on le construit ; on
l'audite dans les deux directions ; l'approximatif se marque ; et celui qui exécute vérifie les
chiffres de celui qui a planifié.

Cet échelon est celui que j'ai mis le plus de temps à formaliser, et pour une raison qui vaut la
peine d'être racontée : je tenais pour acquis qu'un modèle appliquerait tout seul quelque chose
d'aussi élémentaire en ingénierie que « mesure avant de toucher ». Il ne l'applique pas. Le modèle
est très bon pour produire des affirmations chiffrées (« il y a environ 120 boucles de ce type »)
et ces affirmations sonnent exactement pareil quand elles sont mesurées et quand elles sont
estimées. Vous n'avez aucun moyen de les distinguer au ton. La seule façon est d'exiger
l'instrument : « avec quoi l'as-tu mesuré ? montre-moi la commande ». S'il n'y a pas de commande,
c'est une impression, quel que soit le nombre de décimales. Ces règles, je les ai imposées moi-même
en session, en corrigeant l'agent, avant qu'elles ne deviennent doctrine
[Ref. 45](../REFERENCIAS.md#ref-45).

## 1. Contexte requis

- L'hypothèse, la vôtre ou celle de l'agent : « je crois que le problème est X », « il doit y en
  avoir une centaine ».
- Un accès à ce qu'on veut mesurer : le code, la base en lecture seule, le journal.
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

> [fr]
> Avant de construire quoi que ce soit, nous allons mesurer. L'hypothèse est : [X]. Écris un
> compteur (un script qui vit dans le dépôt) qui mesure [la quantité], et un test pour le compteur
> qui le vérifie contre un cas connu où la réponse est connue d'avance. Si mesurer requiert un
> accès ou des données que tu n'as pas, demande-les-moi ; n'approxime pas en silence. Si une partie
> ne peut être qu'approximée, marque-la comme approximative et dis-moi la marge. Lance le compteur,
> montre-moi le chiffre avec la commande qui le produit, et audite-le dans les deux directions : du
> code à la mesure (tout ce qui devrait être compté est-il compté ?) et de la mesure au code (tout
> ce qui est compté existe-t-il vraiment ?). Seulement alors, propose ce qu'il faut construire.
> Réponds dans ma langue.

Ce que je lui demande, clause par clause : le compteur **dans le dépôt** (pas une commande volante
qui se perd) ; le **test du compteur** contre un cas connu (la garde) ; la clause de complétude
sous sa forme pour mesurer (demander l'accès, ne pas approximer en silence) ; marquer
l'approximatif avec sa marge ; le chiffre **avec la commande** qui le produit, pour que vous
puissiez la lancer ; l'audit dans les deux directions, qui est ce qui a démasqué mes deux compteurs
qui mentaient ; et l'ordre : d'abord mesurer, ensuite proposer.

**Quand il y a un budget :**

> Set the budget for [queries / loops / time] on this path at the measured value plus a small
> margin, and protect it with a test that fails if it is exceeded. Tell me the number and the
> margin.

> [fr]
> Fixe le budget de [requêtes / boucles / temps] sur ce chemin à la valeur mesurée plus une petite
> marge, et protège-le avec un test qui échoue s'il est dépassé. Dis-moi le chiffre et la marge.

Ce que je lui demande : que le budget soit la valeur mesurée plus un peu, pas un chiffre rond, et
qu'il ait un test qui échoue s'il est dépassé. Ainsi une régression de performance apparaît dans
la batterie et non en production [Ref. 37](../REFERENCIAS.md#ref-37).

**Quand celui qui a planifié a donné des chiffres (règle cinq) :**

> Before executing the plan, verify every number the plan asserts with the meter. If any does
> not match, stop and tell me; do not execute on a wrong number.

> [fr]
> Avant d'exécuter le plan, vérifie avec le compteur chaque chiffre que le plan affirme. Si l'un
> d'eux ne correspond pas, arrête-toi et dis-le-moi ; n'exécute pas sur un chiffre faux.

Ce que je lui demande : que celui qui exécute ne fasse pas confiance aux chiffres de celui qui a
planifié, même si c'est le même modèle dans une autre session. Dans mon cas, trois des quatre
affirmations du plan étaient fausses ; là où il y avait un instrument, le chiffre était exact.

## 3. Résultat attendu

- Le compteur dans le dépôt (`tools/measure_*.py`, `scripts/meter-*.mjs` ou similaire), avec son
  test.
- Le chiffre, avec la commande qui le produit et la date.
- L'audit dans les deux directions, écrit en deux ou trois lignes.
- L'approximatif marqué comme tel, avec sa marge.
- S'il y a un budget : la valeur, la marge, et le test qui le protège.
- Dans le commit : "measured: [number] with [meter]".

## 4. Vérification de complétude

- Pouvez-vous lancer vous-même la commande du compteur et obtenir le même chiffre ? (C'est vous
  qui la lancez ; pas besoin de la comprendre, seulement de l'exécuter.)
- Le compteur a-t-il un test ? Contre quel cas connu ?
- Y a-t-il un chiffre dans le rapport sans compteur derrière ? Demandez d'où il sort.
- L'approximatif est-il marqué ?
- Si le plan apportait des chiffres, l'agent les a-t-il vérifiés avant d'exécuter et vous a-t-il
  dit lesquels ne correspondaient pas ?

## 5. Signaux d'alarme

- Un chiffre a changé entre deux rapports sans que le code change. L'un des deux n'a pas été
  mesuré.
- Le compteur donne zéro. Ce n'est presque jamais zéro ; presque toujours, le compteur ne voit pas
  quelque chose.
- L'agent propose de construire « pendant qu'il mesure », pour gagner du temps. L'ordre, c'est la
  méthode : d'abord le chiffre, ensuite le plan.
