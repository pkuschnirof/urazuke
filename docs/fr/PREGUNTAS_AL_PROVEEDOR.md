# Les vingt-cinq questions pour le prestataire

Cette feuille est pour un moment très concret : quelqu'un vous propose de construire un système, ou
vous le livre, et vous ne programmez pas. Vous n'avez pas à apprendre à programmer pour cette
réunion. Vous avez à savoir **quoi demander qu'on vous montre**.

La méthode complète vit dans les contrats des vingt-quatre échelons, et chaque contrat apporte sa
« vérification de complétude sans lire de code » : la liste des contrôles que le propriétaire fait
sur ce qui a été livré. Ça sert pendant que le projet est en marche, mais c'est réparti dans
trente-deux fichiers et personne n'entre en réunion avec ça. Cette feuille est la même chose,
réunie et ordonnée par **ce qu'on vous promet**. On l'imprime et on l'emporte.

## La seule règle que vous devez retenir

**Les réponses qui valent sont celles qui peuvent se voir.** Un fichier, un chiffre avec la commande
qui le produit, un test qu'on a vu échouer, un manuel, une signature avec une date. Celles qui ne
peuvent pas se voir sont des promesses, et une promesse n'est pas une réponse : c'est une intention,
dite par quelqu'un qui veut clore la réunion.

Il n'est pas nécessaire que vous compreniez ce qu'on vous montre. Il suffit que ça **existe** et que
la personne l'ouvre devant vous. Si pour vous répondre elle doit vous expliquer pourquoi pas encore,
notez la date et redemandez à la réunion suivante : ce qui se répète deux fois sans se montrer ne va
pas apparaître.

Trois phrases qu'il vaut mieux reconnaître, parce qu'elles veulent dire « je n'ai pas ça » :

- « Faites-moi confiance, ça on le fait toujours comme ça. »
- « Ça se voit à la fin, quand tout sera prêt. »
- « C'est dans ma tête / c'est dans le dépôt, je vous l'envoie après. »

Et une précision honnête dans l'autre sens : **un « non » dit avec sa raison est une bonne
réponse**. « Nous n'avons pas de tests de charge parce que c'est trente utilisateurs et nous en
étions convenus » est un non avec une raison, et c'est exactement ce que la méthode appelle
proportionnalité. Ce qui ne sert à rien, c'est le « oui » qui ne peut pas se voir.

## Si vous n'avez que dix minutes

Si la réunion est courte, ces cinq apportent plus d'information que les vingt-cinq : la **4** (un
test vu en rouge), la **7** (le plan, ce sont les éléments en attente), la **13** (la limite qui
freine la construction), la **20** (le manuel de reprise, éprouvé par une personne) et la **24** (le
rapport qui dit ce qui n'a pas pu être vérifié). Si ces cinq-là peuvent se voir, le reste y est
presque toujours. Si aucune ne peut se voir, le reste n'y est presque jamais.

---

## Ce qu'on vous promet : « je vous le livre fonctionnel »

**1. Pouvez-vous me montrer le système qui tourne dans un environnement qui n'est pas votre
ordinateur ?**
Ce qui peut se voir : une adresse que vous ouvrez vous-même, sur votre téléphone, avec des données de
test. S'il ne marche que sur la machine de celui qui l'a construit, il n'existe pas encore comme
système.
*(Échelon 15.)*

**2. Qu'est-ce qui doit être vrai pour que vous considériez une de mes demandes comme terminée ?**
Ce qui peut se voir : écrit, avant de commencer, pour chaque demande. Ça devrait inclure « le test
est passé » et « une personne l'a utilisé ». Si la réponse est « quand ça marchera », il n'y a pas de
critère : il y a une opinion.
*(Échelon 5, critères d'acceptation.)*

**3. Y a-t-il un test automatique de chaque chose qui m'importe ?**
Ce qui peut se voir : une exécution de la batterie de tests, avec des chiffres, à l'écran. Le contenu
ne vous importe pas : ce qui vous importe, c'est qu'il y ait une sortie et qu'elle dise combien sont
passés.
*(Échelon 8.)*

**4. Pouvez-vous me montrer un de ces tests **en échec** ?**
Ce qui peut se voir : le morceau d'écran où le test est passé au rouge contre le système sans le
correctif, avec la commande qui l'a lancé et la date. C'est la question la plus importante de la
feuille : un test que personne n'a vu échouer, on ne sait pas s'il prouve quelque chose. Un système
peut avoir mille tests qui passent et ne rien surveiller.
*(Échelon 8. Dans la méthode, ça s'appelle « éprouvé en rouge ».)*

**5. Qui, à part vous et un programme, a utilisé le système et est allé jusqu'au bout ?**
Ce qui peut se voir : une liste de cas de test écrits pour une personne, avec une date, avec le nom
de qui les a exécutés et ce qui s'est passé. Celui qui a construit ne peut pas être le seul qui a
testé, et le modèle teste ce qu'il a compris, qui n'est pas toujours ce que vous avez demandé.
*(Échelon 10.)*

**6. Si je fais quelque chose de travers à l'écran — je saisis deux fois, j'appuie sur le bouton
dans la précipitation —, que se passe-t-il ?**
Ce qui peut se voir : la liste des actions qui ne peuvent pas se défaire, chacune avec son verrou et
ce qui se passe si elle échoue à mi-chemin. La bonne réponse n'est jamais « ça ne devrait pas
arriver ».
*(Échelon 14.)*

## Ce qu'on vous promet : « je sais ce qui reste et dans quel ordre »

**7. Où est la liste de ce qui reste, et puis-je la voir aujourd'hui ?**
Ce qui peut se voir : un registre d'éléments en attente numérotés, chacun écrit en détail et avec la
date à laquelle il a été clos. **Cette liste est le plan** : s'il y a un plan ailleurs et une liste
ici, il y a deux plans, et celui qui vaut est celui que personne ne regarde.
*(Échelon 5.)*

**8. Chaque chose que vous allez me construire est-elle écrite avant de la construire, avec mes
mots ?**
Ce qui peut se voir : l'élément en attente ouvert, avec l'histoire d'où vient la demande dite comme
vous l'avez dite, les règles qui s'appliquent, les écrans et les cas bizarres. S'il tient en une
ligne, ce qui manque, quelqu'un va l'inventer.
*(Échelon 5.)*

**9. Quand quelque chose du métier n'est pas clair, que faites-vous ?**
Ce qui peut se voir : le fichier de décisions, avec la date et qui a décidé chacune. La réponse que
vous cherchez est « je vous demande et je le note ». Un modèle qui trouve un trou dans les règles du
métier le remplit tout seul et continue, et six semaines plus tard personne ne sait pourquoi le
système fait ça.
*(Échelons 1 et 6.)*

**10. Est-il écrit quelles choses le système **ne** va **pas** faire ?**
Ce qui peut se voir : une section à part, avec au moins deux entrées, dans le document du projet. Ce
qui n'est pas dit est exactement ce qui va apparaître construit d'une autre manière.
*(Échelon 2.)*

**11. Qui sont les différents types de personne qui vont utiliser ça, et est-il écrit ce que chacun
peut faire ?**
Ce qui peut se voir : la liste des profils — qui est chacun et ce qu'il vient faire — et un tableau
qui dit ce que chaque profil peut faire. S'il y a un seul profil appelé « utilisateur », il manque
presque toujours la moitié : c'est la cause la plus fréquente de ce que quelqu'un voie un bouton qui
ne lui revient pas, ou de ce que quelqu'un qui a la permission ne trouve pas l'écran.
*(Échelon 2, les entrées préalables de l'Annexe H ; échelon 8, la matrice.)*

## Ce qu'on vous promet : « c'est bien fait »

**12. Qu'est-ce qu'une machine mesure à chaque changement, sans que personne ait à y penser ?**
Ce qui peut se voir : la configuration de la chaîne de vérification dans le dépôt et le registre de
la dernière exécution. « On se relit entre nous » n'est pas une réponse : c'est une habitude, et les
habitudes tombent la semaine où il y a urgence.
*(Échelons 4 et 9.)*

**13. Y a-t-il une limite qui, si elle est dépassée, **freine** la construction ?**
Ce qui peut se voir : un fichier avec les limites et leur valeur mesurée du jour, et une exécution
freinée par l'une d'elles. La question de contrôle, qu'il vaut mieux poser telle quelle : *avez-vous
déjà relevé une limite pour pouvoir continuer ?* Si la réponse est oui et qu'il n'est pas écrit
pourquoi, la limite est décorative.
*(Échelon 9.)*

**14. Comment savez-vous que le code pourra être maintenu par quelqu'un d'autre ?**
Ce qui peut se voir : le rapport par règle, pas un chiffre unique : taille de fichier, taille de
fonction, code répété, code mort. Une « qualité de quatre-vingt-quinze pour cent » ne dit pas quoi
réparer.
*(Échelon 9 et Annexe H.)*

**15. Les écrans, quelqu'un les a-t-il pensés, ou sont-ils sortis de ce dont le programme avait
besoin ?**
Ce qui peut se voir : le registre des règles d'utilisabilité avec leur résultat, et les exceptions
éteintes avec le motif écrit, qui l'a autorisé et quand ça se révise. Un système peut passer toutes
les vérifications techniques et être inutilisable : tout vert, et la personne ne trouve pas où
encaisser.
*(Annexe H, les vingt-sept règles d'utilisabilité.)*

**16. Les tests que vous m'avez montrés surveillent-ils vraiment, ou décorent-ils ?**
Ce qui peut se voir : le score de mutation. C'est un programme qui introduit des erreurs exprès et
compte combien les tests en attrapent ; le chiffre sort avec sa commande. Si votre système a de vrais
utilisateurs, ce n'est pas facultatif dans la méthode.
*(Échelon 9.)*

## Ce qu'on vous promet : « ça ne vous fera pas de mal »

**17. Qu'arrive-t-il à mes données si quelque chose casse au milieu d'une opération ?**
Ce qui peut se voir : le tableau des actions avec leur réversibilité, et la règle écrite selon
laquelle, dans le doute, le système **se freine** au lieu de continuer. Un double encaissement ou une
approbation automatique que personne n'a regardée sont le cas typique.
*(Échelon 14.)*

**18. Y a-t-il des sauvegardes, et avez-vous déjà éprouvé d'en restaurer une ?**
Ce qui peut se voir : la date de la dernière restauration **éprouvée**. Une sauvegarde qu'on n'a
jamais restaurée n'est pas une sauvegarde : c'est un fichier dont personne ne sait rien.
*(Échelon 20, manuel de reprise.)*

**19. Qui vérifie que le système n'a pas de trous connus, et tous les combien ?**
Ce qui peut se voir : le scan qui tourne dans la chaîne, avec une date, et les constats convertis en
éléments en attente. Plus une question courte et très révélatrice : *où sont gardées les clés et les
mots de passe du système ?* S'ils sont dans le code, vous avez déjà un problème.
*(Échelons 18 et 15.)*

**20. Quelqu'un qui ne programme pas a-t-il récupéré le système depuis zéro en suivant un manuel ?**
Ce qui peut se voir : le manuel, et le registre de cette épreuve avec trois choses : combien de temps
elle a pris de bout en bout, à quelle étape exacte la personne s'est bloquée, et quels mots elle n'a
pas compris. Si le manuel commence par « ouvre une session avec l'agent », ce n'est pas un manuel
pour une personne. Et tant que ça n'existe pas, dit sans détour : **le propriétaire n'est pas
propriétaire, il est locataire**. Il a le système, il le paie, et il ne peut pas entrer sans demander
la permission à qui l'a construit.
*(Échelon 20.)*

## Ce qu'on vous promet : « ça va tenir »

**21. Avec quels chiffres avez-vous dimensionné ça, et d'où sortent-ils ?**
Ce qui peut se voir : combien d'utilisateurs en même temps, combien d'opérations par jour, combien ça
croît par an, combien de temps ça doit rester stocké. Et la partie qui importe : ces chiffres, c'est
**votre métier** qui les a, pas celui qui construit. S'il les a inventés, ils sont faux.
*(Échelon 3.)*

**22. L'avez-vous éprouvé avec la charge que je vais lui donner, et avec dix fois plus ?**
Ce qui peut se voir : le rapport de l'exécution, avec le point exact où le système est tombé. Savoir
où il casse est la seule façon de savoir quelle marge vous avez.
*(Échelon 19.)*

**23. Quand le système sera lent dans six mois, comment allez-vous savoir pourquoi ?**
Ce qui peut se voir : les journaux avec un identifiant par action, le rapport des requêtes les plus
lentes, et les alertes configurées. Si la réponse est « on verra quand ça arrivera », c'est vous qui
le verrez d'abord, par un utilisateur en colère.
*(Échelons 16, 17, 21 et 22.)*

## Ce qu'on vous promet : « je vais vous dire la vérité »

**24. Quand vous m'annoncez que quelque chose est prêt, comment distingue-je ce que vous avez
éprouvé de ce que vous supposez ?**
Ce qui peut se voir : le rapport en trois blocs : **vérifié** (avec la preuve à côté), **cru** (et
pourquoi ça n'a pas été éprouvé) et **angles morts** (ce qu'on ne peut pas voir d'où on est). « Prêt »
tout court n'est pas un rapport. Et la deuxième partie de la question vaut plus que la première :
*quelles choses de cette livraison n'avez-vous **pas** pu vérifier ?* Si la réponse est « aucune, tout
vérifié », méfiez-vous : personne ne vérifie tout.
*(Échelon 12.)*

**25. Qui relit le travail, en plus de vous-même ?**
Ce qui peut se voir : un audit fait par quelqu'un — ou quelque chose — de différent de celui qui a
construit, avec ses constats convertis en éléments en attente et avec une date. Un modèle avalise une
part considérable de ses propres erreurs, et une personne aussi. Celui qui construit ne peut pas être
le seul qui vérifie.
*(Échelon 13.)*

---

## Que faire des réponses

Notez, à côté de chaque question, une de trois choses : **je l'ai vu**, **je ne l'ai pas encore vu**
(avec la date où on vous l'a promis) ou **ça n'existe pas et on m'a dit pourquoi** (avec la raison).
Il n'est pas nécessaire que les vingt-cinq donnent « je l'ai vu » : un petit projet n'a pas besoin de
tests de charge ni de supervision hebdomadaire, et la méthode le dit. Ce qui doit arriver, en
revanche, c'est que **chaque « non » ait sa raison écrite**, parce qu'un non avec une raison est une
décision de vous et un non sans raison est une dette que vous allez payer sans l'avoir choisie.

Et une dernière, non numérotée parce qu'elle n'est pas pour le prestataire : si quelqu'un se met mal
à l'aise parce que vous demandez à voir les choses, ça aussi c'est de l'information.

---

## D'où sort cette feuille

Les vingt-cinq questions sont la « vérification de complétude sans lire de code » des contrats de
cette méthode, réunie : chacune cite l'échelon dont elle sort, donc n'importe qui peut aller au
contrat et lire la version complète. Elles sont écrites de zéro pour cette feuille.

**L'idée que ça devait exister comme une feuille n'est pas la mienne.** Elle vient de la première
adaptation de la méthode à un autre format — le roman d'Oscar Schmitz « El Arte de Forjar Sistemas »,
2026, crédité en Partie F du document principal —, qui l'a dit mieux que moi : la méthode a la
vérification répartie dans ses contrats et il lui manquait la pièce qu'un propriétaire emporte à une
réunion. Le critère en tête de cette feuille — que les réponses qui valent sont celles qui peuvent se
voir — vient aussi de là. Sa version des questions est son œuvre et porte ses droits réservés ;
celles-ci sont d'autres, écrites depuis mes contrats, et c'est pour ça qu'elles se publient sous la
licence de ce dépôt.
