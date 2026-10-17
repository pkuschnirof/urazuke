# Étape 2 — La définition du projet et la lecture obligatoire (contrat de l'échelon)

**Phase :** démarrage (une fois ; tenu à jour pendant tout le projet).
**Forme :** conversation (l'agent rédige, demande ce qui manque, le propriétaire corrige).
**Taille :** obligatoire dans tout projet. Dans un petit, le fichier de projet peut faire
cinquante lignes ; ce qu'il ne peut pas, c'est ne pas exister.

## À quoi il sert

Chaque session de l'agent démarre de zéro : il ne se souvient pas d'hier. Il lui faut donc une
carte, courte, qui lui dise ce qu'est le projet, dans quel état il est et quelles décisions ont déjà
été prises. Et il lui faut l'obligation de la lire avant de toucher à quoi que ce soit. L'échec
qu'il évite est double : du travail jeté pour n'avoir pas lu la carte, et la carte qui grossit
jusqu'à devenir illisible (dans l'un des systèmes d'origine le fichier de projet a atteint
9 661 lignes, et dans cet état personne ne le lit, pas même le modèle).

La règle pratique qui sort de ce coup dur : **le fichier de projet est le programme, pas
l'historique**. Ce qui s'est passé va ailleurs (le registre des éléments en attente, l'état vivant,
le journal) ; le fichier de projet dit ce qu'est le système, pour qui, ce qu'il n'est pas, et ce qui
a été décidé.

## 1. Contexte requis

- Relevé du métier : ce que fait le client, qui utilise le système, quel problème il résout, ce
  qu'il ne doit pas faire.
- Le contrat de collaboration (échelon 1).
- S'il existe un système antérieur : accès en lecture à son code ou à sa documentation.
- Les décisions déjà prises, s'il y en a, même seulement orales.

## 2. Prompts

**Initial :**

> We are going to define the project in writing. Read the business survey in
> `docs/INITIAL_SURVEY.md` and the working agreement in `docs/WORKING_AGREEMENT.md`. Evaluate
> whether the survey is sufficient to describe the system, its users and its boundaries; if it
> is not, ask me for what is missing before writing anything. Then write `PROJECT.md`, three
> hundred lines at most, with: what the system is and for whom; what it is NOT; the main
> modules as a list; the decisions already made, each with its date; and the instruction to
> read this file and the working agreement at the start of every session. Separately, create
> `docs/STATUS.md` for the living state (what is being worked on, what is open): that file
> changes every day; `PROJECT.md` almost never does. Reply in my language.

Ce que nous demandons : qu'il évalue le relevé et demande avant de rédiger ; que le fichier de
projet soit **court** (le plafond de trois cents lignes est arbitraire mais nécessaire : sans
plafond, il grossit) ; qu'il dise explicitement ce que le système **n'est pas**, parce que ce qui
n'est pas dit est ce que le modèle va inventer ; que les décisions aient une date ; et qu'il sépare
l'état vivant dans un autre fichier, pour que le fichier de projet ne devienne pas un historique.

**De clôture :**

> Apply these corrections: [list]. Finalize `PROJECT.md` with today's date. Add to the working
> agreement that the change history never goes into `PROJECT.md`: it goes to `docs/STATUS.md`
> or to the pending-items register.

Ce que nous demandons : les corrections du propriétaire, la date, et une nouvelle règle dans le
contrat qui protège le fichier de projet contre la transformation en changelog. Cette règle est
celle qui manquait dans le cas des 9 661 lignes.

## 3. Résultat attendu

- `PROJECT.md` (ou `CLAUDE.md`) : court, de lecture obligatoire, avec ce que c'est, pour qui, ce
  que ce n'est pas, les modules, les décisions datées, et l'ordre de le lire. Trois cents lignes au
  maximum.
- `docs/STATUS.md` : l'état vivant, séparé du précédent.
- Dans les deux, une date de dernière mise à jour.
- Dans le contrat, la règle que l'historique ne va pas dans `PROJECT.md`.

## 4. Vérification de complétude

- `PROJECT.md` tient-il dans une lecture de cinq minutes ? Sinon, il est mal fait : c'est le
  programme, pas l'historique.
- Dit-il explicitement ce que le système ne fait PAS ? (Ce qui manque est ce que l'agent va
  inventer.)
- Chaque décision a-t-elle une date et l'auteur de la décision ?
- L'agent a-t-il posé une question sur le métier avant de rédiger ? S'il n'a rien demandé,
  vérifiez ce qu'il a supposé.
- L'état vivant est-il dans un autre fichier ?

## 5. Signaux d'alarme

- Le fichier de projet a grossi de plus de 20 % en un mois. Quelque chose qui n'est pas du
  programme y entre.
- L'agent ouvre une session en proposant quelque chose de déjà décidé et écrit. Il n'a pas lu la
  carte : l'accrochage de lecture obligatoire a échoué.
- La section « ce que ce n'est pas » est vide ou dit « rien en particulier ». Tout système a des
  limites ; si elles ne sont pas écrites, le modèle va les franchir.
