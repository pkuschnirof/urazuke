# Étape 6 — Les décisions s'écrivent à côté du code (contrat de l'échelon)

**Tronçon :** boucle.
**Quand :** à chaque session de la boucle, chaque fois que l'agent tombe sur une règle métier non
écrite ou sur une bifurcation qui change ce que l'utilisateur voit. Il y en a en général deux ou
trois par bloc. Aussi au démarrage (échelons 0 et 3) et à la mise en production (14 et 15).
**Forme :** courte conversation : l'agent détecte qu'il y a une décision, demande, et la laisse
écrite.
**Taille :** obligatoire dans tout projet. Dans un petit projet, le registre peut être un tableau
de dix lignes ; ce qui compte, c'est que les règles métier aient un propriétaire.

## À quoi il sert

Faites en sorte que chaque règle métier et chaque décision structurelle ait un propriétaire, une
date et un lieu. Sinon, dans six semaines, personne ne sait si « approuvée plus solde revient dans
la file » était une décision du client ou une idée de l'agent. Et évitez le pire : l'agent qui
invente des règles de domaine parce qu'elles lui ont paru raisonnables.

Cela a une conséquence que je veux dire à voix haute : le modèle, quand il rencontre un trou dans
les règles, **le remplit**. Il ne s'arrête pas ; il complète avec ce qui lui paraît le plus
probable, et il le fait avec le même naturel que quand il écrit le reste. C'est pourquoi la routine
de cet échelon n'est pas « écris les décisions » mais « arrête-toi et demande quand il en manque
une ». C'est la seconde qui est difficile, et c'est ce qu'il faut exiger dans le contrat. La
pratique de laisser la règle écrite dans le commit, avec mes mots et la date, je l'ai imposée à la
Mutuelle [Ref. 29](../REFERENCIAS.md#ref-29), et celle de geler les décisions avant de construire
vient de mon outil [Ref. 5](../REFERENCIAS.md#ref-5).

## 1. Contexte requis

Ce qui suit est la liste générique. Les fichiers concrets que vous devez avoir faits avant chaque
prompt, avec leur contenu et leur état minimum, sont dans la section 2, dans le bloc « Avant
d'envoyer le prompt » qui précède chacun d'eux.
- La conversation avec le propriétaire : c'est le seul contexte. L'agent ne peut pas décider de
  règles métier.
- Un lieu convenu où s'écrivent les décisions : le message du commit, la spécification de
  l'élément en attente, et un registre `docs/DECISIONS.md`.

## 2. Prompts

**Routine (va dans le contrat de collaboration) :**

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous (ou le métier avec vous) qui le
faites, pas l'agent :

- `docs/WORKING_AGREEMENT.md` (échelon 1), où va la routine.
- `docs/DECISIONS.md`, créé même s'il est vide, avec le format dans l'en-tête : la date, qui a
  décidé, les mots textuels, l'élément en attente qui en avait besoin. Vous le créez vous-même ou
  vous le demandez à l'agent dans la même session ; ce qui compte, c'est que l'endroit convenu
  existe avant la première décision.
- Vous, disponible. Cette routine ne fonctionne que si, quand l'agent s'arrête et demande,
  quelqu'un répond en heures et non en semaines. Si le propriétaire du domaine est une autre
  personne, convenez avec lui du canal et du délai de réponse avant de coller le prompt.
- État minimum acceptable : le registre existe et il y a quelqu'un qui décide.
> Whenever implementing something requires a business rule that is not written down, or you
> must choose between two approaches that change what the user sees, stop and ask me, in prose,
> with your recommendation and the alternative. Do not implement the one you prefer. When I
> decide, write the decision with my name and the date in the commit message, in the pending
> item's specification and in `docs/DECISIONS.md`, with the exact words I used. If I do not
> answer and you must move on, implement the most reversible option and mark it "decision by
> omission, pending confirmation", so that I can review it.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [fr]
> Chaque fois qu'implémenter quelque chose requiert une règle métier qui n'est pas écrite, ou que
> tu dois choisir entre deux approches qui changent ce que l'utilisateur voit, arrête-toi et
> demande-moi, en prose, avec ta recommandation et l'alternative. N'implémente pas celle que tu
> préfères. Quand je décide, écris la décision avec mon nom et la date dans le message du commit,
> dans la spécification de l'élément en attente et dans `docs/DECISIONS.md`, avec les mots exacts
> que j'ai utilisés. Si je ne réponds pas et que tu dois avancer, implémente l'option la plus
> réversible et marque-la « décision par omission, en attente de confirmation », pour que je la
> révise.
>
> Quand tu as besoin d'une décision de ma part, demande-la avec les quatre parties de l'UX-28
> (`docs/ANEXO_HEURISTICAS.md`) et dans cet ordre : les données qui rendent la question
> nécessaire, énumérées ; un paragraphe de cinq lignes au plus qui les relie et laisse voir la
> question ; la question avec ses réponses possibles numérotées ; et ta recommandation. Dis-le à
> la profondeur technique que le projet a déclarée dans `communication_depth` —`beginner`,
> `decision_maker` ou `technical`— ; si le projet n'en a déclaré aucune, utilise `decision_maker`.

Ce que je lui demande : qu'il **s'arrête** devant une règle non écrite ou une bifurcation
visible ; qu'il demande avec une recommandation et une alternative (pour que vous décidiez en dix
secondes, pas en dix minutes) ; qu'il enregistre la décision avec vos mots textuels aux trois
endroits (le commit, l'élément en attente, le registre), et non avec une paraphrase « améliorée » ;
et, pour quand vous ne répondez pas, l'option la plus réversible marquée « par omission », ce qui
permet d'avancer sans que la décision disparaisse.

**De clôture (chaque décision) :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- La question de l'agent, lue, avec sa recommandation et son alternative.
- Votre décision, consultée avec le propriétaire du domaine si ce n'est pas vous, rédigée en une
  phrase avec vos mots exacts, ceux que vous voulez voir rester pour toujours (ils seront dans le
  commit, dans l'élément en attente et dans le registre), et la date.
- État minimum acceptable : la phrase est écrite avant de coller le prompt, elle ne s'improvise
  pas dans le chat. Une règle paraphrasée plus tard est une règle différente.
> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [fr]
> Règle : [texte exact]. Décidée par moi, [date]. Note-la et continue.
>
> Quand tu as besoin d'une décision de ma part, demande-la avec les quatre parties de l'UX-28
> (`docs/ANEXO_HEURISTICAS.md`) et dans cet ordre : les données qui rendent la question
> nécessaire, énumérées ; un paragraphe de cinq lignes au plus qui les relie et laisse voir la
> question ; la question avec ses réponses possibles numérotées ; et ta recommandation. Dis-le à
> la profondeur technique que le projet a déclarée dans `communication_depth` —`beginner`,
> `decision_maker` ou `technical`— ; si le projet n'en a déclaré aucune, utilise `decision_maker`.

Ce que je lui demande : le format minimal d'une décision : la règle textuelle, qui, quand. Trois
choses ; sans l'une des trois, ce n'est pas une décision enregistrée.

## 3. Résultat attendu

- `docs/DECISIONS.md` : une ligne ou un paragraphe par décision, avec la date, qui a décidé, la
  phrase textuelle, l'élément en attente ou le commit où elle a été appliquée, et si elle a été
  « par omission ».
- Dans la spécification de chaque élément en attente concerné : la règle avec sa décision et sa
  date.
- Dans chaque commit qui implémente une règle métier : la phrase d'origine.

## 4. Vérification de complétude

- Ouvrez trois commits qui touchent des règles métier : chacun cite-t-il qui a décidé et quand ?
- Y a-t-il des décisions « par omission » non confirmées ? Confirmez-les ou annulez-les ; ne les
  laissez pas.
- Y a-t-il une règle dans le système que vous ne reconnaissez pas comme vôtre ? S'il y en a une,
  l'agent l'a inventée : c'est un échec de l'échelon, on l'écrit comme élément en attente et on la
  révise.
- Les phrases sont-elles textuelles ou « améliorées » par l'agent ? Elles doivent être les vôtres.

## 5. Signaux d'alarme

- Une semaine de travail est passée et le registre des décisions n'a pas grandi. Soit le travail a
  été purement mécanique (rare), soit l'agent a décidé seul.
- Les décisions enregistrées sont toutes rédigées dans le même style poli. Ce sont des
  paraphrases de l'agent, pas vos mots.
- Un utilisateur du système demande « pourquoi fait-il cela ? » et personne ne trouve la décision.
