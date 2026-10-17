# Étape 1 — Le contrat de collaboration (contrat de l'échelon)

**Phase :** démarrage (une fois par projet ; révisé quand un coup dur l'exige).
**Forme :** un seul envoi, avec un tour d'ajustement du propriétaire.
**Taille :** obligatoire dans tout projet. C'est l'échelon le moins cher de tous et celui qui évite
le plus de frustration.

## À quoi il sert

À ce que l'humain et l'agent conviennent de la façon dont ils vont travailler avant la première
ligne de code. Cela ressemble à une formalité et ce n'en est pas une : c'est ce qui empêche l'agent
d'« aider » en élargissant le périmètre, de laisser de la dette pour plus tard, ou de rapporter
comme fait ce qu'il croit avoir fait. Dans Forge ce fichier s'appelle `SQ.md` (standards de
qualité) ; le nom n'a pas d'importance, le contenu, si.

Une façon de le comprendre : l'agent est un nouveau collègue qui arrive chaque matin sans mémoire
de la veille. Le contrat est ce que vous lui dites le premier jour, et ce qu'il relira chaque jour.
Si vous ne l'écrivez pas, vous devrez le dire à chaque fois, et vous le direz différemment à chaque
fois.

## 1. Contexte requis

- Rien du projet : c'est le premier fichier.
- Du propriétaire : ses préférences de travail (langue, comment il veut qu'on lui pose des
  questions, ce qu'il considère comme une perte de temps, quel niveau d'autonomie il donne à
  l'agent).

## 2. Prompts

**Initial :**

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

Ce que nous demandons : les six règles minimales, chacune avec l'échec qu'elle évite (c'est ce qui
en fait des règles et non des conseils) ; qu'il propose des règles propres au projet mais les marque
comme propositions, pour que le propriétaire les accepte ou les rejette ; et qu'il demande ce qu'il
a besoin de savoir sur le propriétaire. Un contrat rédigé sans une seule question est suspect :
l'agent ne connaît pas la personne avec qui il va travailler.

**De clôture :**

> I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the
> agreement with today's date and a version number. Then add to the project file the
> instruction to read this agreement at the start of every session.

Ce que nous demandons : qu'il clôture le contrat avec date et version, et qu'il l'accroche au
fichier de projet pour qu'il soit lu à chaque session. Sans cet accrochage le contrat existe mais
n'agit pas.

## 3. Résultat attendu

Un fichier `docs/WORKING_AGREEMENT.md` (ou `SQ.md`, ou `CONTRATO.md`) avec :

- Date et version.
- Chaque règle numérotée, en une ou deux phrases, avec l'échec qu'elle évite.
- Les règles propres au projet, marquées comme telles.
- Une ligne au bas disant que l'agent propose des changements mais ne modifie pas le contrat seul.

Et une ligne dans le fichier de projet (`PROJECT.md` ou `CLAUDE.md`) qui ordonne de le lire au
début de chaque session.

## 4. Vérification de complétude

- Les six règles minimales sont-elles là, chacune avec l'échec qu'elle évite ?
- Y a-t-il une règle écrite comme une aspiration (« essayer de… », « dans la mesure du
  possible… ») ? Si oui, elle ne sert à rien : les règles se respectent ou non.
- Le fichier de projet ordonne-t-il de le lire à chaque session ?
- L'agent vous a-t-il posé au moins une question sur votre façon de travailler ? S'il a tout rédigé
  sans rien demander, c'est suspect : il ne vous connaît pas.

## 5. Signaux d'alarme

- Le contrat a plus de vingt règles. Personne, ni humain ni modèle, ne respecte vingt règles ; six
  à huit se respectent.
- Une règle dit « l'agent peut modifier ce contrat quand il le juge nécessaire ». Non.
- Deux semaines plus tard, l'agent fait quelque chose que le contrat interdit et personne ne s'en
  aperçoit. Le contrat n'est pas lu : vérifiez l'accrochage dans le fichier de projet.
