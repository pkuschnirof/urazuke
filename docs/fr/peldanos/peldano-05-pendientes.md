# Étape 5 — Le plan, ce sont les éléments en attente : la spécification détaillée vit dans chacun (contrat de l'échelon)

**Tronçon :** boucle.
**Quand :** le registre se crée à l'ouverture du premier bloc fonctionnel, dès que le démarrage se
termine ; chaque nouveau bloc commence en convertissant la demande du client en éléments en attente
spécifiés ; la routine s'utilise à chaque session pendant tout le projet ; la documentation de
l'élément fait s'écrit à sa clôture, dans la même session.
**Forme :** un seul envoi à l'ouverture de chaque bloc ; ensuite, routine de chaque session.
**Taille :** obligatoire dans tout projet. C'est l'échelon qui rend tous les autres traçables :
sans éléments en attente numérotés et spécifiés, il n'y a nulle part où accrocher ni la
spécification ni la preuve.

## À quoi il sert

Ayez une seule file de travail, avec un ordre et une porte, qui soit la vérité du projet. Il n'y a
pas de « plan » d'un côté et de « tâches » de l'autre : la liste des éléments en attente EST le
plan. Cela évite la longue spécification qui est dépassée au bout de deux semaines et devient
obsolète [Ref. 17](../REFERENCIAS.md#ref-17), et le travail dont personne ne sait pourquoi il a été
fait [Ref. 7](../REFERENCIAS.md#ref-7).

Mais il y a plus, et c'est ce qui distingue cet échelon d'une liste de tâches quelconque. Dans la
méthode classique existait un document de spécification des exigences, long, qui décrivait tout ce
que le système devait faire et qui vieillissait avant d'être terminé. Ici, ce document se
décompose : **la spécification détaillée vit dans chaque élément en attente**. Un élément bien
écrit apporte : le nœud de l'arbre sémantique dont il pend ; le récit utilisateur ou cas
d'utilisation qui l'origine, avec les mots du client ; la description détaillée ; les règles
métier applicables, avec leur décision et leur date ; les données qui entrent et sortent ; les
écrans affectés, avec le prototype s'il y en a un ; les cas limites et les exceptions ; les
critères d'acceptation sous la forme « étant donné, quand, alors » ; et comment on vérifie. La
somme des éléments en attente est la spécification du système, et la traçabilité (exigence →
élément en attente → test → commit) n'est pas une matrice à part : c'est l'élément lui-même.

Et la troisième chose, qui boucle la boucle : **les éléments en attente clos sont de la
documentation**. Quand un élément se clôt, on ne l'efface pas et on ne l'archive pas vide : il
reste avec sa spécification, la décision qui l'a originé, la preuve avec laquelle il a été clos (les
chiffres du rouge et du vert, la capture, le chiffre mesuré), le commit et la date. La file des
éléments clos est l'historique fonctionnel du système : ce qui a été construit, pourquoi, quand et
comment ça a été testé. De là sortent le journal des modifications, les nouvelles sections du
manuel, et la réponse à « pourquoi le système fait-il cela ? » six mois plus tard.

## 1. Contexte requis

- La demande du client pour le bloc, en prose, telle qu'il la dirait, avec ses ambiguïtés. Si vous
  avez rédigé des cas d'utilisation ou des récits utilisateur pendant l'ingestion, tant mieux : ce
  sont l'unité naturelle d'un bloc.
- L'arbre sémantique (échelon 2), pour accrocher chaque élément en attente à son nœud.
- Les audits et les constats des tests humains, s'il y en a déjà eu.
- `PROJECT.md` et `docs/STATUS.md`.

## 2. Prompts

**Pour ouvrir un bloc :**

> We are going to turn everything that must be done in this block into numbered pending items,
> each one carrying its full specification. Read `PROJECT.md`, `docs/SEMANTIC_TREE.md`, the
> client's request for this block, and whatever is in `docs/STATUS.md`. If the request is
> ambiguous on any point such that you cannot write a verifiable pending item for it, ask me; do
> not resolve it by assuming. Then create or extend `docs/PENDING.md` with one item per thing to
> do, each with: number (PND-001 onwards); one-line title; the node of the semantic tree it hangs
> from; the user story or use case that originates it, in the client's words; the detailed
> description; the business rules that apply, each with its decision and date, or marked as
> "rule missing, asked"; the data in and out; the screens affected; the edge cases and
> exceptions; the acceptance criteria in the form "given, when, then"; how it will be verified
> as done; and status. If a node the item needs does not exist in the tree, propose it and mark
> it. Order the items by the priority I gave you; if I gave none, propose an order and tell me
> why. Reply in my language.

> [fr]
> Nous allons convertir tout ce qu'il y a à faire dans ce bloc en éléments en attente numérotés,
> chacun portant sa spécification complète. Lis `PROJECT.md`, `docs/SEMANTIC_TREE.md`, la demande
> du client pour ce bloc, et ce qu'il y a dans `docs/STATUS.md`. Si la demande est ambiguë sur un
> point au point que tu ne puisses pas écrire un élément en attente vérifiable, demande-moi ; ne
> le résous pas en supposant. Ensuite crée ou étends `docs/PENDING.md` avec un élément par chose à
> faire, chacun avec : un numéro (PND-001 et suivants) ; un titre d'une ligne ; le nœud de l'arbre
> sémantique dont il pend ; le récit utilisateur ou cas d'utilisation qui l'origine, avec les
> mots du client ; la description détaillée ; les règles métier qui s'appliquent, chacune avec sa
> décision et sa date, ou marquée « règle manquante, demandée » ; les données qui entrent et
> sortent ; les écrans affectés ; les cas limites et les exceptions ; les critères d'acceptation
> sous la forme « étant donné, quand, alors » ; comment on vérifiera que c'est fait ; et l'état. Si
> un nœud dont l'élément a besoin n'existe pas dans l'arbre, propose-le et marque-le. Ordonne les
> éléments selon la priorité que je t'ai donnée ; si je n'en ai donné aucune, propose un ordre et
> dis-moi pourquoi. Réponds dans ma langue.

Ce que je lui demande : qu'il convertisse la demande en éléments vérifiables et qu'il **pose la
question quand la demande ne permet pas d'en écrire un vérifiable** (l'ambiguïté se résout en
demandant, pas en choisissant) ; la spécification complète de chaque élément, champ par champ,
qui est l'ingénierie des exigences classique décomposée en petites unités ; le nœud de l'arbre
dont il pend, qui est ce qui vous permet de repérer un élément hors périmètre ; les règles métier
avec leur décision ou marquées comme manquantes, qui est l'accrochage avec l'échelon 6 ; les
critères d'acceptation sous la forme classique, qui sont le scénario du test de bout en bout de
l'échelon 7 ; et un ordre proposé avec sa raison, pour que vous le confirmiez ou le changiez.

**Routine de chaque session (va dans le contrat de collaboration) :**

> Before touching any code, open `docs/PENDING.md`, tell me which item you are taking and why,
> and re-read its specification. Every commit cites its pending item. A pending item is closed
> with written evidence (the test counts red and green, the screenshot, the measured number),
> never with "done". When you close it, keep it in the register with its full specification and
> add: the evidence, the commit, the date, and any decision that was taken along the way; that
> record is the documentation of what was built. If along the way you see something that is not
> on the list, add it as a new pending item with its specification; do not do it.

> [fr]
> Avant de toucher au code, ouvre `docs/PENDING.md`, dis-moi quel élément tu prends et pourquoi,
> et relis sa spécification. Chaque commit cite son élément en attente. Un élément en attente se
> clôt avec une preuve écrite (les chiffres du test en rouge et en vert, la capture, le chiffre
> mesuré), jamais avec « c'est fait ». Quand tu le clos, garde-le dans le registre avec sa
> spécification complète et ajoute : la preuve, le commit, la date, et toute décision prise en
> chemin ; cet enregistrement est la documentation de ce qui a été construit. Si en chemin tu vois
> quelque chose qui n'est pas dans la liste, ajoute-le comme nouvel élément en attente avec sa
> spécification ; ne le fais pas.

Ce que je lui demande : la discipline de chaque session : annoncer ce qu'il prend et relire la
spécification (l'agent démarre sans mémoire, et la spécification est sa mémoire de l'élément),
citer l'élément dans chaque commit, clore avec une preuve, **documenter l'élément fait** dans le
même registre, et **noter au lieu de faire** ce qui apparaît hors de la liste. Cette dernière clause
est celle qui protège le périmètre exact quand le modèle « voit autre chose ».

## 3. Résultat attendu

`docs/PENDING.md` (ou l'outil qu'utilise votre projet) avec, par élément en attente :

- Numéro, titre, état (ouvert / en cours / clos), date d'ouverture et de clôture.
- Le nœud de l'arbre sémantique.
- Le récit ou cas d'utilisation d'origine, avec les mots du client.
- La spécification détaillée : description, règles métier avec décision et date, données, écrans,
  cas limites, critères d'acceptation, comment on vérifie.
- À la clôture : la preuve, le commit, la date, les décisions prises en chemin.

Et la routine dans le contrat de collaboration.

## 4. Vérification de complétude

- Lisez la spécification d'un élément pris au hasard comme si vous étiez le client : décrit-elle
  ce que vous avez demandé, avec vos mots d'origine ? Les critères d'acceptation sont-ils ceux que
  vous utiliseriez pour dire « c'est bon » ? Y a-t-il un cas limite que vous connaissez et qui n'y
  est pas ?
- Chaque élément pend-il d'un nœud de l'arbre ? Y en a-t-il un pendu à un nœud que vous ne
  reconnaissez pas ?
- Chaque élément dit-il comment on le vérifie ? Un élément sans vérification ne peut pas se
  clore.
- Y a-t-il des règles métier marquées « manquante, demandée » qu'on ne vous a pas demandées ?
- Y a-t-il des éléments « clos » sans preuve ni commit ? S'il y en a, rouvrez-les. Les éléments
  clos conservent-ils leur spécification et leur documentation de clôture ?
- Prenez trois commits au hasard : citent-ils leur élément en attente ?
- Est-il apparu dans le code quelque chose qui n'a pas d'élément en attente ? C'est là que l'agent
  est sorti du périmètre.

## 5. Signaux d'alarme

- Un élément en attente est « en cours » depuis plus de trois sessions. Soit c'est trois éléments,
  soit il est bloqué par une décision que personne n'a prise (échelon 6).
- Il y a plus d'éléments clos en un jour que de commits ce jour-là. On clôt sans preuve.
- Les spécifications font une ligne. L'agent les a écrites pour la forme, pas pour construire
  dessus ; il va inventer ce qui manque au moment de construire.
- La liste a plus de cinquante éléments ouverts. Ce n'est pas un plan, c'est un inventaire
  d'angoisses : il faut prioriser et archiver.
- Quelqu'un demande pourquoi le système fait quelque chose et la réponse n'est dans aucun élément
  clos. La documentation du fait ne s'écrit pas.
