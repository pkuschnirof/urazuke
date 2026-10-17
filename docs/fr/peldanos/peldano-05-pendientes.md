# Étape 5 — Le plan, ce sont les éléments en attente (contrat de l'échelon)

**Phase :** boucle (utilisé à chaque changement, pendant tout le projet).
**Forme :** un seul envoi à la création ; ensuite, routine de chaque session.
**Taille :** obligatoire dans tout projet. C'est l'échelon qui rend tous les autres traçables : sans
éléments en attente numérotés il n'y a nulle part où accrocher la preuve.

## À quoi il sert

À ce qu'il y ait une seule file de travail, ordonnée et avec porte, qui soit la vérité du projet. Il
n'y a pas de « plan » d'un côté et de « tâches » de l'autre : la liste des éléments en attente EST le
plan. Il évite la spécification dépassée en deux semaines qui devient obsolète, et le travail dont
personne ne sait pourquoi il a été fait.

Un élément en attente bien écrit a trois choses qu'un item de liste de tâches n'a généralement pas :
d'où il vient (la décision ou la demande qui l'a originé), comment on vérifie qu'il est fait, et la
preuve avec laquelle il a été clos. La première évite que le travail perde sa raison ; la deuxième
évite qu'il soit clos par « fait » ; la troisième est ce que le propriétaire regarde au lieu de
regarder le code.

## 1. Contexte requis

- La spécification ou la demande initiale du client, si incomplète soit-elle.
- Les audits, s'il y en a déjà eu.
- `PROJECT.md` et `docs/STATUS.md`.

## 2. Prompts

**Pour créer le registre :**

> We are going to turn everything that must be done into numbered pending items. Read
> `PROJECT.md`, the client's request and whatever is in `docs/STATUS.md`. If the request is
> ambiguous on any point such that you cannot write a verifiable pending item for it, ask me;
> do not resolve it by assuming. Create `docs/PENDING.md` with one item per thing to do: number
> (PND-001 onwards), one-line title, what is requested, which decision originates it (or
> "client request, date"), how it will be verified as done, and status. Order them by the
> priority I gave you; if I gave none, propose an order and tell me why. Reply in my language.

Ce que nous demandons : qu'il convertisse la demande en items vérifiables et qu'il **demande quand
la demande ne permet pas d'en écrire un vérifiable** (l'ambiguïté se résout en demandant, pas en
choisissant) ; les champs de chaque élément, en particulier « comment on vérifie », qui est ce qui
permet ensuite de le clore avec une preuve ; et un ordre proposé avec sa raison, pour que le
propriétaire le confirme ou le change.

**Routine de chaque session (va dans le contrat de collaboration ou dans `PROJECT.md`) :**

> Before touching any code, open `docs/PENDING.md`, tell me which item you are taking and why.
> Every commit cites its pending item. A pending item is closed with written evidence (the test,
> the screenshot, the number), never with "done". If along the way you see something that is not
> on the list, add it as a new pending item; do not do it.

Ce que nous demandons : la discipline de chaque session : annoncer ce qu'on prend, citer l'élément
dans chaque commit, clore avec une preuve, et **noter au lieu de faire** ce qui apparaît hors de la
liste. Cette dernière clause est celle qui protège le périmètre exact quand le modèle « voit autre
chose ».

## 3. Résultat attendu

`docs/PENDING.md` (ou l'outil qu'utilise le projet) avec, par élément :

- Numéro, titre, état (ouvert / en cours / clos), date d'ouverture et de clôture.
- Ce qui est demandé, en deux ou trois phrases.
- Origine : la décision ou la demande, avec date.
- Comment on vérifie qu'il est fait : le test, l'écran, le chiffre.
- À la clôture : la preuve et le commit.

Et la routine dans le contrat ou dans `PROJECT.md`.

## 4. Vérification de complétude

- Chaque élément dit-il comment on le vérifie ? Un élément sans vérification ne peut pas être clos.
- Y a-t-il des éléments « clos » sans preuve ni commit ? Si oui, rouvrez-les.
- Prenez trois commits au hasard : citent-ils leur élément ?
- Quelque chose est-il apparu dans le code sans élément ? C'est là que l'agent est sorti du
  périmètre.
- L'agent vous a-t-il interrogé sur les points ambigus de la demande, ou les a-t-il résolus seul ?

## 5. Signaux d'alarme

- Un élément est « en cours » depuis plus de trois sessions. Soit ce sont trois éléments, soit il est
  bloqué par une décision que personne n'a prise (échelon 6).
- Plus d'éléments clos en une journée que de commits ce jour-là. On les clôt sans preuve.
- La liste a plus de cinquante éléments ouverts. Ce n'est pas un plan, c'est un inventaire
  d'anxiétés : il faut prioriser et archiver.
