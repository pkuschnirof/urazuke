# Étape 6 — Les décisions s'écrivent à côté du code (contrat de l'échelon)

**Phase :** boucle (chaque fois qu'apparaît une règle métier ou une décision structurelle).
**Forme :** courte conversation : l'agent détecte qu'il y a une décision, demande, et la laisse
écrite.
**Taille :** obligatoire dans tout projet. Dans un petit, le registre peut être un tableau de dix
lignes ; ce qui compte, c'est que les règles métier aient un propriétaire.

## À quoi il sert

À ce que chaque règle métier et chaque décision structurelle ait un propriétaire, une date et un
lieu. Sinon, dans six semaines personne ne sait si « approuvée plus solde retourne dans la file »
était une décision du client ou une idée de l'agent. Et cela évite le pire : l'agent qui invente des
règles de domaine parce qu'elles lui semblaient raisonnables.

Cela a une conséquence qu'il vaut la peine de dire à voix haute : quand le modèle rencontre un trou
dans les règles, **il le comble**. Il ne s'arrête pas ; il complète avec ce qui lui semble le plus
probable, et il le fait avec le même naturel que pour tout le reste. C'est pourquoi la routine de cet
échelon n'est pas « écris les décisions » mais « arrête-toi et demande quand il en manque une ». La
seconde est la difficile, et c'est celle qu'il faut exiger dans le contrat.

## 1. Contexte requis

- La conversation avec le propriétaire : c'est le seul contexte. L'agent ne peut pas décider des
  règles métier.
- Un lieu convenu où s'écrivent les décisions : le message de commit, le document de l'élément en
  attente, ou un registre `docs/DECISIONS.md`.

## 2. Prompts

**Routine (va dans le contrat de collaboration) :**

> Whenever implementing something requires a business rule that is not written down, or you
> must choose between two approaches that change what the user sees, stop and ask me, in prose,
> with your recommendation and the alternative. Do not implement the one you prefer. When I
> decide, write the decision with my name and the date in the commit message and in
> `docs/DECISIONS.md`, with the exact words I used. If I do not answer and you must move on,
> implement the most reversible option and mark it "decision by omission, pending confirmation",
> so that I can review it.

Ce que nous demandons : qu'il **s'arrête** devant une règle non écrite ou une bifurcation
visible ; qu'il demande avec une recommandation et une alternative (pour que le propriétaire décide
en dix secondes, pas en dix minutes) ; qu'il enregistre la décision avec les mots exacts du
propriétaire, pas une paraphrase « améliorée » ; et, pour quand le propriétaire ne répond pas,
l'option la plus réversible marquée « par omission », qui est ce qui permet de continuer sans que la
décision disparaisse.

**De clôture (chaque décision) :**

> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.

Ce que nous demandons : le format minimal d'une décision : la règle textuelle, qui, quand. Trois
choses ; sans l'une des trois ce n'est pas une décision enregistrée.

## 3. Résultat attendu

- `docs/DECISIONS.md` : une ligne ou un paragraphe par décision, avec date, qui a décidé, la phrase
  textuelle, l'élément ou le commit où elle a été appliquée, et si elle était « par omission ».
- Dans chaque commit qui implémente une règle métier : la phrase d'origine (« règle du
  propriétaire : approuvée + solde = retour dans la file », « décision du propriétaire 2026-08-10 »).

## 4. Vérification de complétude

- Ouvrez trois commits qui touchent des règles métier : chacun cite-t-il qui a décidé et quand ?
- Y a-t-il des décisions « par omission » non confirmées ? Confirmez-les ou annulez-les ; ne les
  laissez pas.
- Y a-t-il une règle dans le système que vous ne reconnaissez pas comme la vôtre ? Si oui, l'agent
  l'a inventée : c'est un échec de l'échelon, on l'écrit comme élément en attente et on le revoit.
- Les phrases sont-elles textuelles ou « améliorées » par l'agent ? Elles doivent être les vôtres.

## 5. Signaux d'alarme

- Une semaine de travail s'est écoulée et le registre des décisions n'a pas grandi. Soit le travail
  était purement mécanique (rare), soit l'agent a décidé seul.
- Les décisions enregistrées sont toutes rédigées dans le même style poli. Ce sont des paraphrases
  de l'agent, pas vos mots.
- Un utilisateur du système demande « pourquoi fait-il cela ? » et personne ne trouve la décision.
