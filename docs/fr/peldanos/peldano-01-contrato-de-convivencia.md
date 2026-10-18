# Étape 1 — Le contrat de collaboration (contrat de l'échelon)

**Tronçon :** démarrage.
**Quand :** une seule fois, la première semaine, immédiatement après l'éligibilité ; on le révise
quand un coup dur l'exige. Une demi-heure.
**Forme :** un seul envoi, avec un tour d'ajustement de votre part.
**Taille :** obligatoire dans tout projet. C'est l'échelon le moins cher de tous et celui qui évite
le plus de frustration.

## À quoi il sert

Mettez par écrit, avant la première ligne de code, comment vous et l'agent allez travailler. Cela
ressemble à une formalité et ce n'en est pas une : c'est ce qui évite que l'agent « aide » en
élargissant le périmètre, laisse de la dette pour plus tard, ou rapporte comme fait ce qu'il croit
avoir fait. Dans mon outil, ce fichier s'appelle `SQ.md` (standards de qualité) ; le nom n'a pas
d'importance, le contenu, si.

Voyez-le ainsi : l'agent est un collaborateur nouveau qui arrive chaque matin sans mémoire de la
veille. Le contrat, c'est ce que vous lui dites le premier jour, et ce qu'il relira chaque jour. Si
vous ne l'écrivez pas, vous allez devoir le lui dire à chaque fois, et vous le direz différemment
à chaque fois. Moi, je l'ai écrit pour la première fois alors que je répétais la même chose à
chaque session depuis deux semaines [Ref. 1](../REFERENCIAS.md#ref-1), et rien de ce que j'y ai mis
n'était nouveau en ingénierie des systèmes ; ce qui était nouveau, c'était de devoir l'écrire pour
quelqu'un sans mémoire.

## 1. Contexte requis

Ce qui suit est la liste générique. Les fichiers concrets que vous devez avoir faits avant chaque
prompt, avec leur contenu et leur état minimum, sont dans la section 2, dans le bloc « Avant
d'envoyer le prompt » qui précède chacun d'eux.
- Rien du projet : c'est le premier fichier.
- De vous : vos préférences de travail (langue, comment vous voulez qu'on vous pose des questions,
  ce que vous considérez comme une perte de votre temps, quel niveau d'autonomie vous donnez à
  l'agent).

## 2. Prompts

**Initial :**

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous (ou le métier avec vous) qui le
faites, pas l'agent :

- Rien du projet : c'est le premier fichier qui s'écrit. Si vous avez déjà fait l'échelon 0,
  `docs/ELIGIBILITY.md` existe et il est bon que l'agent le voie, mais ce n'est pas nécessaire.
- Vos préférences de travail, pensées avant de commencer et notées dans une liste courte que vous
  avez sous la main (sur un papier, ou dans `docs/MY_PREFERENCES.md` si vous voulez qu'elle reste
  dans le dépôt) : dans quelle langue vous voulez la conversation ; à quel point vous voulez qu'il
  vous interroge (peu et avec une recommandation, ou beaucoup) ; ce que vous considérez comme une
  perte de votre temps ; quel niveau d'autonomie vous lui donnez (peut-il faire des commits tout
  seul ? peut-il déployer vers le test tout seul ? jamais vers la production ?) ; ce que vous ne
  tolérez pas. L'agent va vous interroger là-dessus ; la liste est là pour que vous répondiez en
  une ligne et que vous n'improvisiez pas.
- Le dossier du projet créé et l'agent ouvert dedans.
- État minimum acceptable : vous savez répondre à chacune de ces cinq questions. Le contrat qui en
  sortira sera aussi bon que vos réponses.
> Before we write any code, we are going to set the working agreement between you and me.
> Write `docs/WORKING_AGREEMENT.md` with at least these rules, each with one line explaining
> what it prevents: (1) My time is sacred: do not ask me what you can resolve on your own, and
> when you do ask, ask in prose, with your recommendation. (2) Zero technical debt: whatever
> breaks is fixed at the root, with its regression test, in the same session. (3) Exact scope:
> no more and no less than what was asked; if you see something else, log it as a pending item,
> do not do it. (4) Documentation is updated in the same commit as the change. (5) Never report
> as done something you have not verified; always separate what you verified from what you
> believe. (6) Speak my language. Add any rules you think this project needs, marked as
> proposals. If you need to know something about how I work in order to write this, ask me.

> [fr]
> Avant d'écrire du code, nous allons fixer le contrat de collaboration entre toi et moi. Écris
> `docs/WORKING_AGREEMENT.md` avec au moins ces règles, chacune avec une ligne expliquant ce
> qu'elle évite : (1) Mon temps est sacré : ne me demande pas ce que tu peux résoudre seul, et
> quand tu demandes, demande en prose, avec ta recommandation. (2) Zéro dette technique : ce qui
> casse se répare à la racine, avec son test de régression, dans la même session. (3) Périmètre
> exact : ni plus ni moins que ce qui a été demandé ; si tu vois autre chose, note-le comme
> élément en attente, ne le fais pas. (4) La documentation se met à jour dans le même commit que
> le changement. (5) Ne rapporte jamais comme fait quelque chose que tu n'as pas vérifié ; sépare
> toujours ce que tu as vérifié de ce que tu crois. (6) Parle ma langue. Ajoute les règles dont tu
> penses que ce projet a besoin, marquées comme propositions. Si tu as besoin de savoir quelque
> chose sur ma façon de travailler pour écrire ceci, demande-le-moi.

Ce que je lui demande : les six règles minimales, chacune avec l'échec qu'elle évite (c'est ce
qui en fait des règles et non des conseils) ; qu'il propose des règles propres au projet mais les
marque comme propositions, pour que vous les acceptiez ou les refusiez ; et qu'il demande ce qu'il
a besoin de savoir sur vous. Un contrat rédigé sans une seule question est suspect : l'agent ne
connaît pas la personne avec qui il va travailler.

**De clôture :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- Le brouillon de `docs/WORKING_AGREEMENT.md` que l'agent a écrit, lu en entier par vous. Pour
  chaque règle qu'il a proposée, votre verdict : vous l'acceptez ou vous la rejetez, et si vous la
  rejetez, une raison d'une ligne. Cela va dans les trous [X, Y] et [Z] du prompt, et c'est vous
  qui les remplissez.
- Les réponses à ce qu'il vous a demandé sur votre façon de travailler, déjà données dans le chat.
- État minimum acceptable : aucune règle proposée ne reste sans verdict. Une règle que vous n'avez
  ni acceptée ni rejetée reste dans le contrat comme si vous l'aviez acceptée.
> I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the
> agreement with today's date and a version number. Then add to the project file the
> instruction to read this agreement at the start of every session.

> [fr]
> J'accepte les règles 1 à 6 et tes propositions [X, Y] ; je refuse [Z] parce que [raison].
> Finalise le contrat avec la date d'aujourd'hui et un numéro de version. Ensuite ajoute au
> fichier de projet l'instruction de lire ce contrat au début de chaque session.

Ce que je lui demande : qu'il clôture le contrat avec une date et une version, et qu'il l'accroche
au fichier de projet pour qu'il soit lu à chaque session. Sans cet accrochage, le contrat existe
mais n'agit pas.

## 3. Résultat attendu

Un fichier `docs/WORKING_AGREEMENT.md` (ou `SQ.md`, ou `CONTRATO.md`) avec :

- Une date et une version.
- Chaque règle numérotée, en une ou deux phrases, avec l'échec qu'elle évite.
- Les règles propres au projet, marquées comme telles.
- Une ligne en bas de page qui dise que l'agent propose des changements mais ne modifie pas le
  contrat seul.

Et une ligne dans le fichier de projet (`PROJECT.md` ou `CLAUDE.md`) qui ordonne de le lire au
début de chaque session.

## 4. Vérification de complétude

- Les six règles minimales y sont-elles, chacune avec l'échec qu'elle évite ?
- Y a-t-il une règle écrite comme une aspiration (« essayer de… », « dans la mesure du
  possible… ») ? S'il y en a une, elle ne sert à rien : les règles se respectent ou ne se
  respectent pas.
- Le fichier de projet ordonne-t-il de le lire à chaque session ?
- L'agent vous a-t-il posé au moins une question sur votre façon de travailler ? S'il a tout
  rédigé sans rien demander, c'est suspect : il ne vous connaît pas.

## 5. Signaux d'alarme

- Le contrat a plus de vingt règles. Personne, ni humain ni modèle, ne respecte vingt règles ; on
  en respecte six ou huit.
- Une règle dit « l'agent peut modifier ce contrat quand il le juge nécessaire ». Non.
- Deux semaines plus tard, l'agent fait quelque chose que le contrat interdit et personne ne s'en
  aperçoit. Le contrat n'est pas lu : vérifiez l'accrochage dans le fichier de projet.
