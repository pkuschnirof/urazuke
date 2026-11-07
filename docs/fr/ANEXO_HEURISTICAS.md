# Annexe H - Heuristiques de qualité de code et d'utilisabilité

**État : APPROUVE ET EN PRODUCTION.** Aucune décision ne reste ouverte : la forme (D-043 et D-044), les interrupteurs (D-045 et D-046), le tableau (D-047) et les sévérités initiales avec le poids de l'accessibilité (D-048, section 10) sont décidées. Le document est publié dans les huit langues de la méthode et ses deux prompts font partie de l'API de prompts : à partir de là, `build/prompts.mjs` exige le texte anglais identique octet par octet dans les huit, sinon la construction échoue. Date : 2026-10-22.

Registre des décisions de cette annexe : `docs/DECISIONES.md`, D-043 à D-048. Le tableau de conformité (section 12) a été décidé avec deux chiffres dans D-047. Le travail d'implémentation vit dans PND-002 ; la traduction et l'indexation, dans PND-003.

## 1. Ce qui manque aujourd'hui, et pourquoi

L'étape 9 mesure déjà le code, et elle le fait avec une barrière qui ne laisse rien passer : un formateur unique, des limites de taille (trois cents lignes par fichier, quarante par fonction), la complexité par fonction, le code dupliqué, le code mort, les dépendances déclarées et utilisées, la couverture avec cliquet et les tests de mutation là où il y a de vrais utilisateurs. Le chiffre est écrit dans `docs/CODE_QUALITY.md`. C'est résolu.

Ce qui n'est pas résolu, c'est l'autre moitié du produit. J'ai révisé le corpus des étapes : il n'y a pas une seule mention de l'utilisabilité, des profils/personnes ni du regroupement fonctionnel. L'interface tient aujourd'hui sur deux choses : la capture que le propriétaire regarde pendant dix secondes et les cas de test manuels. Les deux sont bons et les deux sont humains, coûteux et oublieux. Un système peut passer la barrière de qualité avec les honneurs et être inutilisable : tout vert, et la personne ne trouve pas où encaisser.

Et il y a un problème de second niveau, technique mais qui se voit dans l'interface : quand le même produit est utilisé par plusieurs profils (administration, opérations, consultation, client), les fonctionnalités sont activées à trois endroits différents - la base, le menu et le garde de route - qui s'écrivent à des moments différents et se désynchronisent tout seuls. Le symptôme est toujours le même : quelqu'un voit un bouton qui n'est pas le sien, ou pire, quelqu'un qui a bien la permission ne trouve pas l'écran.

Les deux heuristiques qui suivent attaquent ces deux choses avec la même forme : un catalogue court d'affirmations vérifiables, quelques instruments qui les mesurent tout seuls, et un chemin d'exception déclarée pour quand le projet doit sortir du cadre.

## 2. Le modèle : trois couches, une seule forme de règle

La tentation est de faire une liste de règles et de l'attacher à la pile du premier projet. Cela vieillit mal : la règle React ne s'applique pas en Angular, celle d'Angular ne s'applique pas dans un serveur avec des gabarits, et dans deux ans la moitié de la liste est morte. La proposition sépare trois couches.

**Couche 1 - Noyau agnostique (non négociable).** Des affirmations sur des résultats, pas sur des outils. "Il y a un seul formateur et personne ne discute avec lui" s'applique de la même façon en TypeScript, en PHP ou en Go. Le noyau s'énumère avec des identifiants stables et ne change pas d'un projet à l'autre.

**Couche 2 - Adaptateur par pile (configurable).** Pour chaque règle du noyau, chaque famille de frontend déclare *avec quoi* on la mesure et *avec quel seuil*. Un projet React avec Vite, un Next, un Angular, un serveur avec gabarits, un mobile et un en ligne de commande sont six adaptateurs différents du même noyau. Tout ce que l'utilisateur a demandé comme "configurable par frontend" vit ici.

**Couche 3 - Décisions du projet (déclarées).** Les seuils concrets et les exceptions. Ils ne s'inventent pas : ils se demandent au propriétaire et restent écrits, comme le dimensionnement de l'étape d'architecture. Si un seuil n'est pas déclaré, celui de l'adaptateur s'applique et il est enregistré comme tel.

Toute règle s'écrit toujours avec la même fiche de six champs :

| Champ | Ce qu'il contient |
|---|---|
| `id` | Identifiant stable (`CQ-07`, `UX-12`). Jamais réutilisé. |
| Énoncé | Une seule phrase, à l'impératif, sur un résultat observable. |
| Pourquoi | Le dommage concret qu'elle évite. S'il n'y a pas de dommage, la règle est superflue. |
| Comment on vérifie | L'instrument : barrière automatique, requête à la matrice, test de bout en bout ou cas manuel. |
| Sévérité | `BLOQUE` (la barrière passe au rouge et le bloc ne ferme pas), `AVERTIT` (ouvre un élément en attente), `ENREGISTRE` (reste seulement dans le document). |
| S'applique à | Les profils où elle commande. Hors d'eux elle ne tourne pas, et ce n'est pas une exception : c'est la portée. |

**L'exception se déclare, elle ne s'omet jamais.** Une règle s'éteint avec une fiche de quatre champs : identifiant, motif en une ligne, qui l'autorise (le propriétaire, pas l'agent) et date de révision. Une règle éteinte sans fiche est un échec de la barrière, pas une décision. C'est le même critère que la méthode utilise déjà pour refuser une limite relevée "pour passer".

**Une règle peut avoir des facettes, et on en éteint une seule (D-078).** Une facette est une coupe du même énoncé avec un identifiant propre —`CQ-19.1`, `CQ-19.2`—, append-only comme celui des règles et jamais recyclé. Elles existent pour une raison mécanique et non de rédaction : sans identifiant on ne peut pas en éteindre une seule, et une règle qu'on ne peut éteindre qu'entière pousse à éteindre de trop. La fiche d'extinction est celle du dessus, avec l'identifiant d'une facette à la place de celui d'une règle, et une fiche dont l'identifiant ne résout ni vers une règle ni vers une facette est une extinction pendante, ce qui est rouge. Trois choses là-dedans ne se négocient pas. Une règle dont une facette est éteinte **ne s'informe jamais comme remplie** : le rapport dit "CQ-19 : trois facettes sur quatre, une éteinte avec son motif" et jamais un pourcentage seul, ce qui est le critère de l'extinction observable appliqué à l'intérieur d'une règle. Le compte des facettes **se dérive** de la donnée et ne s'écrit pas, comme tout chiffre qui vit à côté du nom d'une collection. Et le tableau de la section 12 compte des facettes et non des règles pour une règle qui en a, sinon le pourcentage ment. Aujourd'hui `CQ-18` a cinq vérifications sans identifiant, c'est donc la seule règle dont les facettes ne sont pas adressables : leur donner un identifiant est ajouter et non renommer, et c'est un travail à part.

## 3. Les quatre instruments

Aucune heuristique ne vaut rien si sa vérification est une opinion. Il y en a quatre, et chaque règle déclare à laquelle elle appartient.

1. **Barrière automatique.** Elle tourne à chaque envoi et à la fermeture du bloc. Elle rend vert ou rouge. Elle est bon marche, répétable et ne discute pas. Elle mesure tout ce qui peut être compté.
2. **Requête à la matrice.** La matrice fonctionnalité-par-profil (voir B2) est un artefact déclaratif ; le menu, le routage et les permissions en dérivent. Vérifier la matrice, c'est vérifier l'interface. C'est la pièce qui convertit une partie de l'utilisabilité en quelque chose qu'une machine peut vérifier.
3. **Test de bout en bout par profil.** Pour chaque profil déclaré, un script qui entre comme ce profil et compare l'ensemble des fonctionnalités accessibles à la ligne de la matrice : *ni moins ni plus*. C'est le test qui attrape les deux désynchronisations typiques (le bouton qui reste et l'écran qui manque).
4. **Cas manuel.** Ce qu'aucune machine ne juge : si le regroupement se comprend, si la tâche se termine sans aide, si le texte est dans la langue de l'utilisateur. Il se déroule avec des personnes et il est enregistré, comme l'étape 10 le prescrit déjà.

## 4. Partie A - Qualité de code

Le noyau étend l'étape 9 : il ne la remplace pas et ne la contredit pas, il donne un nom, une sévérité et un adaptateur à chaque chose qui se mesure déjà, et il ajoute ce qui manque aujourd'hui, c'est-à-dire l'interface vue comme du code.

| id | Famille | Énoncé | Vérifié | Sévérité |
|---|---|---|---|---|
| CQ-01 | Forme | Il y a un seul formateur, il tourne sans intervention et il n'admet pas de discussion. | Barrière | BLOQUE |
| CQ-02 | Forme | Il y a un seul linter par dépôt et ses règles sont les mêmes pour tous ; une règle s'éteint avec un motif écrit, jamais dans un fichier isolé. | Barrière | BLOQUE |
| CQ-03 | Taille | Aucun fichier ne dépasse la limite déclarée (commence à 300 lignes) et aucune fonction ne dépasse la sienne (commence à 40). | Barrière | BLOQUE |
| CQ-04 | Complexité | Aucune fonction ne dépasse la limite déclarée de chemins. | Barrière | BLOQUE |
| CQ-05 | Duplication | Aucune duplication nouvelle n'entre : le bloc copié est extrait ou justifie. | Barrière | BLOQUE |
| CQ-06 | Choses mortes | Il n'y a pas de code mort : fonctions, variables, imports, branches et dépendances inutilisées. | Barrière | BLOQUE |
| CQ-07 | Types | Si le langage permet les types, le projet les utilise sérieusement ; le type "any" est une exception déclarée, pas une habitude. | Barrière | AVERTIT |
| CQ-08 | Tests | La couverture ne baisse pas : le chiffre d'aujourd'hui est le plancher de demain. | Barrière | BLOQUE |
| CQ-09 | Tests | Avec de vrais utilisateurs, le score de mutation se mesure par bloc et tout mutant qui survit dans du code nouveau ouvre un élément en attente. | Barrière + registre | BLOQUE |
| CQ-10 | Dépendances | Toute dépendance est déclarée, est utilisée et n'apporte pas un arbre tiers disproportionne à ce qu'elle apporte. | Barrière | AVERTIT |
| CQ-11 | Secrets | Il n'y a pas d'identifiants, de clés ni de chaînes de connexion dans le dépôt, ni dans l'historique nouveau. | Barrière | BLOQUE |
| CQ-12 | Interface | L'interface ne décide pas : aucun écran ni composant ne contient de règle métier (ce qui est permis, combien cela coûte, quel état suit). Elle vit dans le domaine et la vue l'interroge. | Révision à la fermeture + cas manuel | BLOQUE |
| CQ-13 | Interface | Tout appel au serveur passe par un seul client type ; aucun écran ne construit sa requête à la main. | Barrière (recherche) | BLOQUE |
| CQ-14 | Interface | Il y a un seul endroit où vit l'état partagé ; dupliquer l'état entre écrans est un échec, pas un raccourci. | Révision à la fermeture | BLOQUE |
| CQ-15 | Interface | Tout texte visible sort d'un catalogue de traductions ; aucune chaîne utilisateur ne reste écrite dans le composant. | Barrière (recherche) | BLOQUE |
| CQ-16 | Interface | Tout élément interactif porte un identifiant stable et un rôle, pour que le test automatique le trouve par son nom et non par sa position. | Barrière (recherche) | BLOQUE |
| CQ-17 | Interface | Toutes les couleurs, espacements et typographies sortent de tokens ; aucune valeur en dur dans la feuille de styles. | Barrière (recherche) | BLOQUE |
| CQ-18 | Interface | L'accessibilité de base se vérifie toute seule : contraste, etiquettes sur les champs, focus visible, navigation au clavier dans les flux principaux, images avec texte alternatif. | Barrière | AVERTIT |
| CQ-19 | Reçu | Tout instrument avec lequel le projet décide déclare les conditions dans lesquelles son chiffre vaut : quel ensemble il s'attendait à parcourir et combien il a parcouru, de quoi il dépend, et ce qu'il rapporte quand il n'a pas pu regarder. Un instrument dont le silence se lit comme la santé ne mesure pas : il rassure. | Barrière + cas manuel | BLOQUE |
| CQ-20 | Privilège | Une vérification tourne avec le privilège minimum pour vérifier et avec aucun de plus, et le fait qu'elle n'a pas pu faire de dégât se mesure, il ne se promet pas. | Barrière + cas manuel | BLOQUE |
| CQ-21 | Portée | Toute vérification déclare jusqu'où sa course est allée, et ce qui est resté au-delà de ce point se compte comme non vérifié et jamais comme sain : un double qu'aucune course ne traverse, un artefact que personne n'a fait tourner et une étape qu'aucune exécution n'a atteinte ne disent pas que ce qui est devant marche, ils disent que personne n'a regardé. | Barrière + cas manuel | BLOQUE |
| CQ-22 | Contraste | Un nombre que le projet mesure contre une exigence que le projet a déclarée se contraste, et le résultat du contraste est le verdict : une mesure qui existe et que personne n'a comparée à son seuil n'a rien vérifié. Que la mesure existe est le début de la vérification et non sa fin. | Barrière + cas manuel | BLOQUE |
| CQ-23 | Provenance | Un verdict vaut par où il a couru, quand il a couru et où il est resté écrit : sur l'arbre qui reste, après le dernier changement qui affecte ce qu'il mesure, sur des artefacts de ce travail, et avec sa sortie dans un endroit qui survit à la course. Un vert qui ne peut pas dire ces quatre choses n'est pas un vert vieux : c'est le vert d'autre chose. | Barrière + cas manuel | BLOQUE |
| CQ-24 | Registre | Un registre répond à la question pour laquelle il existe, sur tout son parcours : les champs avec lesquels on répond à cette question sont écrits par le chemin qui produit le fait, et la portion restée hors de sa portée est signalée comme hors de portée et jamais comme zéro. | Barrière + cas manuel | BLOQUE |

Les règles CQ-12 à CQ-18 sont celles qui font que "qualité de code" veut dire quelque chose sur le front. Sans elles, le projet peut avoir quatre-vingt-dix pour cent de mutation et un écran qui calcule le total avec sa propre arithmétique dans un composant : le pire des deux mondes, parce que le calcul dupliqué passe tous les tests du serveur.

**Les deux règles du reçu, et d'où elles sortent (D-078).** CQ-19 et CQ-20 sont entrées le 2026-11-01 et elles ne sortent pas d'une idée : elles sortent de onze défaillances mesurées dans une expérience qui mesurait autre chose. Toutes avaient la même forme —un instrument qui n'a pas pu regarder et qui l'a rapporté exactement comme il rapporte la santé, ou qui a regardé moins qu'il ne croyait avoir regardé— et elles sont apparues par onze chemins différents, ce qui rend très improbable qu'il s'agisse du défaut d'un seul programme. Ce qui en fait deux règles et non onze, c'est qu'on peut leur poser la même question : *quel est le dénominateur de ce chiffre, et que rapporte cet instrument quand il n'a pas pu regarder ?* CQ-19 porte sur ce qu'un instrument **rapporte** ; CQ-20 porte sur le **privilège** avec lequel il tourne, qui fait partie de la vérification et n'est pas un détail d'exploitation. Chacune entre avec ses facettes, qui est la forme que décrit la section 2.

#### Les quatre facettes de CQ-19

| id | Facette | Énoncé |
|---|---|---|
| CQ-19.1 | Le dénominateur | Toute mesure qui parcourt un ensemble déclare combien d'éléments elle s'attendait à parcourir à côté de combien elle en a parcouru, et échoue fermé quand elle en a parcouru moins. Il ne suffit pas de distinguer le zéro qui veut dire "il n'y en a pas" du zéro qui veut dire "je n'ai pas pu regarder" : ce qu'il faut distinguer, c'est le "moins parce que je n'ai pas tout regardé", qui est celui qui se lit comme la santé. |
| CQ-19.2 | L'indépendance | Aucun instrument ne dépend de la ressource qu'il mesure. Quand on ne peut pas l'éviter, son rapport déclare de quoi il dépend, et la chute de cette dépendance se rapporte comme "je n'ai pas pu regarder" et jamais comme la santé. |
| CQ-19.3 | L'univers, dans les deux sens | Tout filtre, toute recherche et toute sélection déclare l'univers sur lequel il a tourné : "je n'ai rien trouvé" et "je n'ai pas tourné" sont deux résultats différents et ne s'écrivent pas pareil, et un filtre qui a rendu de trop ne s'est pas appliqué non plus. Un chiffre qui décide se mesure deux fois, de deux façons différentes, avant d'être utilisé. |
| CQ-19.4 | Le frère laxiste | Quand un contrôle a une contrepartie dans la chaîne, ou bien ce sont le même instrument avec la même configuration, ou bien la différence est déclarée : ce que mesure chacun, lequel commande, et ce qui peut passer l'un et échouer l'autre. Un contrôle local plus permissif que celui qui décide est un vert qui ment. |

**En quoi il diffère du reçu de l'étape 8.** C'est le même concept sur des objets différents, et c'est pour cela qu'ils portent le même nom : le reçu de l'étape 8 est un artefact qu'un plan produit —le rouge avec sa commande exacte, sa version, ses nombres et son code de sortie, collé tel qu'il est sorti—, et le reçu de l'instrument est la condition qu'un chiffre apporte à côté de lui pour pouvoir être lu. L'un s'exige une fois par verrou ; l'autre, chaque fois qu'un chiffre décide quelque chose. Dit à l'envers, ce qui est la façon de le vérifier sans réfléchir : si ce que tu as devant toi est un test, demande le reçu de l'étape 8 ; si c'est un chiffre, demande celui de CQ-19.

#### Les deux facettes de CQ-20

| id | Facette | Énoncé |
|---|---|---|
| CQ-20.1 | L'effet non déclaré | Une commande qui se présente comme en lecture seule tourne sans permission d'écrire, et le privilège avec lequel elle a tourné se déclare à côté de son résultat. Un instrument qui écrit en disant qu'il ne le fait pas laisse le propriétaire décider sur un état que l'instrument lui-même a changé. |
| CQ-20.2 | La sonde qui n'est inoffensive que quand elle échoue | Une sonde qui exerce une opération destructrice pour vérifier qu'elle est empêchée tourne là où son instruction ne peut pas atterrir, et son rapport prouve que l'état est resté identique en le comptant avant et après. Une sonde dont le dégât dépend du bon fonctionnement de l'empêchement ne vérifie pas l'empêchement : elle parie dessus. |

L'appariement de CQ-20 avec la routine du rouge de l'étape 8 se lit tout seul : le rouge d'abord exige qu'un test **puisse** détecter ; CQ-20 exige qu'en détectant il **ne casse pas**.

**La règle de la portée, et pourquoi elle est une et non trois (D-087).** CQ-21 est entrée le 2026-11-03 et elle ne sort pas non plus d'une idée : elle sort de trois défauts mesurés dans la même expérience, au deuxième lot, et les trois avaient une forme qui se dit en une ligne —**un artefact correct qui n'arrive pas au seul endroit où il produit un effet**—. Le cas de test écrit que personne n'a exécuté. Le cas corrigé que personne n'a refait tourner. Et le port doublé qu'aucun test n'a traversé, qui est celui qui vaut la moitié du prix : un bras de l'expérience a construit sa vue sur un port avec son double, qui est ce que la méthode pousse à faire pour que la vue soit vérifiable, et ce port écoutait un seul type d'événement alors que quatre des cinq contrôles en émettaient un autre. **Quatre contrôles morts dans un navigateur, avec quatre-vingt-un fichiers de test au vert par-dessus**, dont un qui affirmait exactement ce qui était cassé, au vert parce qu'il parcourait les écouteurs du nœud factice et les appelait à la main. Dans ces quatre-vingt-un fichiers il n'y avait pas un seul appui sur un bouton. Ce qui en fait une règle et non trois, c'est qu'on peut leur poser la même question : *jusqu'où cette course est-elle allée, et quelle partie de l'artefact est restée non traversée ?*

Et il faut dire d'où vient la formulation, parce qu'elle n'est pas de moi. La mienne demandait *"au moins un test qui le traverse pour de vrai, contre l'implémentation réelle"*, et le bras l'a acceptée et a montré avec son propre code qu'**elle ne suffit pas** : un de ses tests faisait déjà tourner l'implémentation réelle, contre un document mensonger qui invoquait l'écouteur sans regarder l'événement. Il traversait l'adaptateur réel et continuait à ne pas voir le défaut. Celle qui est restée est la sienne, et c'est celle de `CQ-21.1` : l'autre côté doit être **le vrai autre côté**. Son coût, c'est lui aussi qui l'a mesuré, et c'est l'objection que cette facette va recevoir : **une course, quinze secondes six, zéro paquet nouveau**.

#### Les quatre facettes de CQ-21

| id | Facette | Énoncé |
|---|---|---|
| CQ-21.1 | Le vrai autre côté | Tout port avec un double de test a au moins une course qui le traverse jusqu'au vrai autre côté, et l'autre côté est ce que le port double : s'il y a là un navigateur, un système d'exploitation, une base ou le réseau, il n'y a pas moyen de la satisfaire sans cela, et aucune quantité de doubles fidèles ne la remplace. |
| CQ-21.2 | Écrit n'est pas couru | Un artefact de vérification que personne n'a fait tourner compte zéro et non une demi-vérification, et son chiffre voyage jusqu'au rapport où l'on décide et pas seulement jusqu'au fichier où vit l'artefact : un chiffre qu'il faut aller chercher n'arrête personne. |
| CQ-21.3 | Le cas revient entier | Une exécution rapporte jusqu'à quelle étape elle est allée, et les étapes qu'elle n'a pas atteintes n'ont ni passé ni échoué : quand on répare ce qui a échoué, le cas est refait tourner en entier et laisse une nouvelle ligne d'exécution postérieure à la réparation, et une correction ne se ferme pas avec la vérification de l'étape qui a échoué. |
| CQ-21.4 | Le rouge est arrivé à l'assertion | Un rouge prouve ce qu'il dit prouver seulement si la course est arrivée jusqu'à l'assertion : un rouge qui est une exception —le code muté ne compile pas, le fichier ne se parse pas, l'environnement n'a pas démarré— n'a rien falsifié, parce que l'assertion n'est ni passée ni tombée, et déclarer une mutation attrapée sur ce rouge, c'est rendre un verdict sur une étape que la course n'a jamais atteinte. |

**En quoi elle diffère de `CQ-19.1`, qui est la question que posera le premier lecteur.** Ce sont deux axes et non la même chose dite deux fois. `CQ-19.1` regarde la **largeur** : des éléments qu'un instrument s'attendait à parcourir, combien il en a parcouru. `CQ-21` regarde la **profondeur** : jusqu'à quelle couche, ou jusqu'à quelle étape, **une** course est allée. Et le cas du port les sépare tout seul : les quatre-vingt-un fichiers ont bien tourné tous les quatre-vingt-un, donc le dénominateur était parfait et la profondeur était nulle. Un chiffre peut avoir son dénominateur complet et n'avoir jamais touché la couche où vit le défaut. Dit à l'envers, c'est-à-dire comme on le vérifie sans réfléchir : si le doute est *combien sur combien*, c'est `CQ-19.1` ; si le doute est *jusqu'où*, c'est `CQ-21`.

**Et ce que cette règle ne promet pas, dit ici et non quand elle échouera.** Aucune barrière ne peut vérifier que la course qu'un projet déclare traverse le port **pour de vrai** : ce qu'une machine regarde, c'est la déclaration —que le port soit dans l'inventaire de l'étape 11, avec son adaptateur, son double et la course qui le traverse en nommant ce qu'il y a de l'autre côté— et ce qui décide si c'est vrai, c'est une personne qui lit la commande. C'est toute la barrière qu'il y a, et c'est plus qu'il n'y en avait : jusqu'au 2026-11-03 un projet avec un port doublé et aucune course qui le traverse sortait **exactement pareil** qu'un qui l'avait, et je l'ai mesuré avec l'évaluateur réel sur deux arbres qui ne différaient que par cela. La même chose vaut pour `CQ-21.3` : que la nouvelle ligne couvre *toutes* les étapes, c'est celui qui a exécuté qui le dit, pas un programme. Le chiffre est mécanique ; la vérité du chiffre appartient au propriétaire.

**Et la quatrième facette est arrivée après, le 2026-11-07, avec D-089.** `CQ-21.4` n'était pas là le jour où la règle est entrée, et c'est un défaut trouvé par une barrière et non par une personne qui l'a amenée : le vérificateur d'ancrages de mutation d'un bras de l'expérience a trouvé une mutation **déclarée attrapée parce que le test était passé au rouge**, et le test était passé au rouge sur une erreur de type et non sur une assertion tombée —le code muté explosait avant d'arriver à l'assertion—. Le rouge était réel et il ne prouvait pas ce qu'il disait prouver. Le même jour, dans un autre système, une garde plantait un mutant avec les fins de ligne de l'autre système d'exploitation, le coureur ne parsait pas le fichier, et le reçu **accusait le mutant**. Elle entre comme facette de cette règle et non comme règle propre parce que la question qui la détecte est celle de `CQ-21` mot pour mot : la course n'est pas arrivée jusqu'à l'assertion, donc l'assertion est une étape que la course n'a pas atteinte, et l'énoncé de la règle dit déjà qu'une étape qu'aucune exécution n'a atteinte n'est ni passée ni tombée. La question mécanique, qui se pose sans outils : **le rouge est-il une assertion tombée, ou est-ce une exception ?** C'est, en outre, le pendant exact de la routine du rouge de l'échelon 8 : le rouge d'abord exige qu'un test **puisse** détecter, `CQ-20` qu'en détectant il **ne casse pas**, et `CQ-21.4` que le rouge exhibé comme preuve **soit arrivé jusqu'où il prouve quelque chose**.

**Les trois règles du troisième lot, et pourquoi elles sont trois et non dix (D-089).** CQ-22, CQ-23 et CQ-24 sont entrées le 2026-11-07 et viennent de dix trouvailles : neuf que le bras C1 de l'expérience A/B a laissées en fermant les vingt-quatre échelons —vingt-deux sur vingt-quatre sans override, qui est le chiffre correct— et une qui ne vient pas du bras mais d'une analyse de plateformes d'outils. Le propriétaire les a amenées avec une ligne qui est celle qui en fait presque toutes une seule famille : **n'accepte pas « la mesure existe » comme critère**. Et la famille se coupe en trois en demandant à chaque trouvaille ce que personne ne regarde. *Contre quoi ce nombre est-il contrasté, et qui a décidé ?* c'est `CQ-22`. *Ce verdict est-il de ce travail, et existe-t-il encore ?* c'est `CQ-23`. *Ce registre peut-il répondre à la question pour laquelle il existe, sur tout son parcours ?* c'est `CQ-24`. Les trois questions se posent à la main et les trois ont une réponse falsifiable ; c'est pour cela que ce sont des règles et non des avertissements.

**CQ-22, le contraste, et le cas qui l'a mesurée.** L'échelon 19 du bras —tests de performance en volume et point de rupture— **a fermé au vert avec son exigence non fonctionnelle non satisfaite** : p95 de 557 à 911 millisecondes contre un plafond déclaré de 300, à deux cents simultanés, avec le puits de connexions d'un module saturé dès vingt personnes. Et la barrière qui l'a laissé passer **a raison sur ce qu'elle mesure** : elle vérifie que le reçu existe, qu'il couvre les quatre flux et qu'il apporte ses seuils ou l'impossibilité écrite. Mots du bras, qui est celui qui l'a trouvé : *"aucune barrière de l'échelle ne demande si le nombre passe"*. C'est ce que cette règle ferme, et la conséquence, il faut la dire entière parce qu'elle est grande : jusqu'au 2026-11-07 une échelle de vingt-quatre échelons pouvait se fermer **complète**, avec toutes ses exigences non fonctionnelles non satisfaites, et chaque barrière ayant raison une par une.

La règle entre avec **quatre facettes et non une**, et chacune vient d'une moitié différente du même trou. `CQ-22.2` est la moitié structurelle et c'est celle que le propriétaire a demandée explicite : l'exigence du cas disait *"p95 < 300 ms"* et **ne disait pas à quelle concurrence**, donc le même système passe à vingt personnes et échoue à deux cents, et un seuil sans sa condition ne peut être contrasté contre rien. `CQ-22.3` est celle du pire cas, un échelon plus haut : le manuel d'infrastructure et de reprise du bras, quatre cent neuf lignes écrites *"pour trois heures du matin"*, déclare dans sa section 6, textuel, **« Il n'y a pas de sauvegardes. Aucune. De rien. »**, avec la commande de vérification transcrite —et l'échelon 20 a fermé au vert, parce que la barrière vérifie que le manuel existe et déclare ce qu'il ne sait pas, non que la sauvegarde existe—. Cette différence est celle que cette facette marque et elle ne se négocie pas : pour le p95 l'impossibilité écrite est une sortie légitime, parce qu'il y a des systèmes où la charge ne peut pas se mesurer ; *"il n'y a pas de sauvegardes"*, écrit avec toute l'honnêteté du monde, **ne peut pas fermer un échelon**. Un p95 qui ne passe pas est un système lent et se découvre avec des utilisateurs fâchés ; une sauvegarde qui n'existe pas est un système dont on ne peut pas revenir, et se découvre le jour où elle sert, qui est le pire moment. Et `CQ-22.4` est la facette que la dixième trouvaille a demandée avec sa propre précaution écrite : si l'exigence finit par être *"qu'un inventaire existe"*, elle naît avec le défaut que tout ce lot vient réparer.

**CQ-23, la provenance, et la mesure qui l'ordonne.** Trois des dix trouvailles sont le même verdict regardé de trois côtés. La première : une barrière qui **n'est pas aveugle et qui ne court pas**. Un commit est entré avec une règle au rouge parce que la chaîne avait couru **avant** d'écrire le document qui la cassait, et l'arbre était vingt-sept commits en avance, donc le crochet qui regarde l'arbre qui reste vraiment n'a couru aucune des deux fois. Le vert était **vrai et vieux**. La deuxième : deux courses de la même chaîne dans le même projet avec des résultats opposés, et la différence était une seule chose —l'une est restée dans un registre sur disque, cent dix lignes avec trente-sept barrières et quatre au rouge, et l'autre voyageait dans la réponse et s'est perdue entière—. La troisième : un échelon **au vert et non fait**, dont les deux contrôles étaient résolus par les deux mêmes fichiers de l'échelon précédent, avec l'élément en attente de l'échelon à zéro entrée de travail ; aucune barrière ne l'a détecté et c'est le bras qui l'a arrêté, en refusant d'accepter son propre vert.

Des trois, la rédaction de `CQ-23.3` est du bras et il faut le créditer : *"la question qui le détecte est une seule et peut se poser à la main : quel fichier de cette liste n'existait pas avant de commencer ? Si la réponse est aucun, le vert est d'un autre."* La mienne aurait parlé d'« artefacts propres à l'échelon » et n'aurait pas donné au lecteur une question qu'il peut poser sans outils. C'est la deuxième fois que cela arrive —`CQ-21.1` est aussi la sienne— et il vaut la peine que ce soit écrit.

**CQ-24, le registre, et les deux défauts indépendants qui en ont fait une famille.** Le titre de l'expérience était *"vingt-quatre échelons fermés, zéro fermeture forcée"*, rapporté trois fois le même jour et écrit dans trois documents. Le bras est allé le vérifier avant de le copier, et sur les cent quatre-vingt-quinze éléments de son registre il a mesuré ceci : **zéro** avec le champ de forçage écrit, **vingt-huit** qui nomment le mot dans leur prose, **dix** fermetures que la prose déclare forcées par le propriétaire sous neuf autorisations, et de celles-là **deux** qui sont des tâches de l'échelle —les deux avec le motif de fermeture à « livré » et aucun champ de forçage—. Le champ existe pour un moment exact, l'échelon 23, et son propre schéma dit qu'il est obligatoire *"pour que la rétrospective puisse compter les fermetures forcées par motif"* ; dans le seul projet qui est arrivé jusque-là il **n'a jamais été écrit**, et le compte a dû se faire en lisant de la prose, qui est justement ce que le mécanisme venait éviter. Il y a un corollaire qui vaut seul : la liste de neuf autorisations de la rétrospective **en omettait une**, parce qu'elle a été montée avec une recherche du mot « override » et la prose de cet élément ne l'utilise pas —un recomptage par mot sur de la prose libre est un instrument qui ne peut pas garantir sa propre population, ce qui est `CQ-19.3`—.

Ce qui l'a converti en règle et non en réparation, c'est la **deuxième occurrence, indépendante**, mesurée le même jour que le lot et dans un autre système écrit par un autre auteur : le programme de démarrage d'un panneau écrivait dans son registre, qui est en ajout seul, un champ de motif **constant** —*"démarrage de la série 2 : l'ancien panneau avait 1.23.5 en mémoire"*—, vrai du premier démarrage et faux des trois suivants, qui sont restés archivés pour toujours avec un motif qui n'était pas le leur. Le champ existait, il était rempli à chaque ligne, et il mentait. Deux occurrences indépendantes du même motif font une famille et non une négligence, donc `CQ-24.1` est rédigée pour la famille —*un champ obligatoire dont la valeur ne se dérive pas du fait qu'il dit enregistrer*— et non pour le champ qui l'a amenée.

`CQ-24.2` est l'autre trouvaille et elle est moins chère à réparer qu'il n'y paraît. Le bras l'a mesurée en écrivant sa rétrospective : les **douze** premiers anti-patrons de son registre sont entrés **dans un seul commit à l'échelon 11** et décrivent les échelons 00 à 11, dont les échelons 00 à 04 rapportent **zéro incident**. Ses mots : *"ta question —dans quelle étape tombe chaque incident— ne peut pas être bien répondue pour le premier cinquième du parcours, qui est là où se prennent les décisions les plus chères à défaire."* Le propriétaire a offert deux sorties —que les registres naissent à l'échelon 01, ou que les lignes rétroactives se marquent comme telles— et la facette prend **les deux en une**, dans cet ordre, parce que la première évite le problème à la racine et la seconde est celle qu'un legs peut satisfaire quand le registre est déjà né tard. Et il est dit que la première seule ne suffit pas : un registre qui existe depuis l'échelon 01 et que personne n'écrit rapporte zéro pareil.

**Et ce que ces trois règles ne promettent pas, dit ici et non quand elles échoueront.** Aucune barrière ne peut vérifier que le nombre qu'un projet déclare soit celui qu'il a mesuré, ni que la condition qu'un seuil déclare soit celle qui gouverne l'exigence, ni qu'une ligne rétroactive soit marquée avec honnêteté. Ce qu'une machine regarde, c'est la **déclaration** —le verdict à côté du chiffre, la condition à côté du seuil, le dénominateur d'un inventaire et la décision de chaque entrée, la date d'un verdict contre celle du dernier changement, l'échelon où un registre est né— et la vérité de la déclaration, c'est une personne qui la décide en lisant. C'est la même frontière que `CQ-21` a écrite dans sa section et il vaut la peine de la répéter : le chiffre est mécanique, la vérité du chiffre est du propriétaire. Ce qui change par rapport à ne pas avoir la règle, c'est qu'avant le silence et la santé s'écrivaient pareil.

#### Les quatre facettes de CQ-22

| id | Facette | Énoncé |
|---|---|---|
| CQ-22.1 | Le nombre contre son seuil | Tout chiffre qu'une exigence déclarée gouverne arrive avec son seuil à côté et avec son verdict —il passe ou il ne passe pas—, et celui qui ne passe pas est rouge et non « mesuré ». L'impossibilité écrite vaut toujours comme sortie ; le silence non. |
| CQ-22.2 | Le seuil avec sa condition | Un seuil déclare la condition dans laquelle il vaut —à quel volume, à quelle concurrence, dans quel environnement, sur quelles données— et un seuil sans sa condition est signalé comme non déclaré : le même système passe à vingt personnes et échoue à deux cents, donc sans la condition il n'y a rien contre quoi contraster. La condition est une décision du propriétaire et ne se suppose pas. |
| CQ-22.3 | L'absence déclarée ne ferme pas | Une sauvegarde que la méthode exige et qui n'existe pas ne ferme pas son échelon pour être honnêtement déclarée. La différence avec l'impossibilité écrite est mécanique : si ce qui manque est le nombre, l'honnêteté suffit et la mesure reste en attente ; si ce qui manque est la sauvegarde, il ne manque pas un nombre —il manque le chemin du retour—, et cela est un rouge avec son projet préalable. |
| CQ-22.4 | Chaque entrée avec sa décision | Un inventaire que la méthode exige ferme avec une décision par entrée —acceptée, restreinte ou rejetée, avec qui et quand—, et non avec la liste qui existe. Un inventaire complet dont personne n'a résolu les entrées est la même mesure que personne n'a contrastée, sous une autre forme. |

#### Les trois facettes de CQ-23

| id | Facette | Énoncé |
|---|---|---|
| CQ-23.1 | Postérieur au dernier changement | Un verdict est postérieur au dernier changement qui affecte ce qu'il mesure, et il a couru sur l'arbre qui reste. Un vert vrai et vieux se lit comme un vert en vigueur ; et une barrière qui regarde l'arbre définitif et ne court qu'à la publication laisse un vert avec une date de péremption que personne ne revalide. |
| CQ-23.2 | La sortie survit à la course | Toute vérification qui peut durer plus longtemps que le tour qui l'a lancée laisse son verdict là où le tour suivant le lit. Une sortie qui voyage dans la réponse meurt avec elle, et ce qui se perd n'est pas le travail —celui-là est resté— mais le verdict, qui est la seule chose pour laquelle on a couru. |
| CQ-23.3 | L'artefact est de ce travail | Des artefacts avec lesquels une étape ferme, au moins un y est né, et la question qui le détecte se pose à la main et sans outils : quel fichier de cette liste n'existait pas avant de commencer ? Si la réponse est « aucun », le vert est d'une autre étape, et la barrière a bien mesuré le mauvais artefact. |

#### Les deux facettes de CQ-24

| id | Facette | Énoncé |
|---|---|---|
| CQ-24.1 | Le fait écrit le champ | Un champ obligatoire dont la valeur ne se dérive pas du fait qu'il dit enregistrer peut être vrai de lui-même et faux du fait : il est écrit par le chemin qui produit le fait, ou la méthode déclare que ce champ n'est pas le registre du fait et dit lequel l'est. Un champ constant, ou vide pendant que le fait arrive et compté dans la prose d'à côté, laisse un compte qu'il faut faire en lisant, ce qui est exactement ce que le champ venait éviter. |
| CQ-24.2 | Le registre naît avant le travail | Un registre qui commence au milieu du parcours ne peut pas répondre pour la portion antérieure, et son zéro là se lit comme « rien ne s'est passé ». Il naît avant le travail qu'il enregistre, ou les lignes écrites vers l'arrière se marquent comme telles et la portion sans registre est signalée comme non enregistrée et jamais comme propre. |

**Sévérités initiales (D-048).** Des le premier jour bloquent les règles qui ont un vérificateur et qui ne dépendent pas d'un seuil discutable : CQ-01 à CQ-06, CQ-08, CQ-11 à CQ-17, CQ-19, CQ-20, CQ-21, CQ-22, CQ-23 et CQ-24. CQ-09 bloque là où il y a de vrais utilisateurs, c'est-à-dire là où elle se mesure. Trois avertissent, et seulement trois : CQ-07 (types), CQ-10 (dépendances) et CQ-18 (accessibilité), parce que ce sont celles qui ont besoin que le projet se calibre d'abord. Le formateur, le linter, la taille et la complexité **ne se relachent pas** : l'étape 9 les bloque déjà aujourd'hui, et cette extension l'étend, elle ne la remplace pas ; la dette héritée se résout par une exception déclarée ou par la ligne de base du cliquet, jamais en baissant la sévérité. Et CQ-12 et CQ-14 sont les deux seules règles de ce tableau qui bloquent avec un rouge humain et non machine : elles se vérifient à la fermeture de l'élément en attente et avec le cas manuel devant, comme UX-22 et UX-27, pas à chaque envoi. Si le projet ne peut pas tenir cette fermeture, la règle descend à AVERTIT par décision enregistrée, pas par négligence.

**Adaptateur par famille de frontend.** Exemple de la façon dont la couche 2 s'instancie (les noms sont illustratifs ; le projet choisit et écrit les siens) :

| Concept | Application monopage (React, Vue, Angular) | Serveur avec gabarits | Mobile natif | Ligne de commande |
|---|---|---|---|---|
| CQ-12 domaine dans la vue | Règle de lint sur la taille et les dépendances du composant + révision | Révision du contrôleur | Révision du view-model | Révision de la couche de commandes |
| CQ-13 client unique | Génération à partir du contrat de l'API | Service unique du serveur | Client généré | Client unique du SDK |
| CQ-15 textes | Catalogue + règle qui interdit les littéraux visibles | Catalogue du moteur de gabarits | Catalogue de ressources | Catalogue |
| CQ-16 identifiants | Attributs déclaratifs par élément | Identifiants dans le balisage | Identifiants d'accessibilité | Sortie stable |
| CQ-17 tokens | Tokens dans la feuille de styles, sans valeurs en dur | Idem | Idem | Non applicable |
| CQ-18 accessibilité | Analyseur automatique dans la barrière | Analyseur sur le HTML généré | Analyseur d'accessibilité | Non applicable |

Ce qui change entre les colonnes, c'est l'outil et le seuil. Ce qui ne change pas, c'est l'énoncé. C'est cela qui rend l'heuristique agnostique sans la rendre décorative.

## 5. Partie B - Utilisabilité

Six familles. La première et la deuxième sont celles que le propriétaire a explicitement demandées ; les trois autres existent parce que sans elles le regroupement et les profils se degradent de la même façon, plus lentement. La sixième est née plus tard, le 2026-10-27 (D-070), et elle est d'une autre nature : les cinq premières portent sur l'écran que le système montre à une personne, et la sixième sur la conversation dans laquelle le système se construit.

### B1 - Regroupement par convergence fonctionnelle

La règle mère : **une fonctionnalité se regroupe par ce que la personne est venue faire, pas par le module dont elle est issue.** Le code s'organise par entités ("Facture", "Client", "Paiement") ; les personnes non. Personne n'entre dans le système pour "gérer des entités" : on entre pour encaisser, pour expédier, pour clôturer le mois. Si le menu montre les entités, la personne fait la traduction. Le menu *est* le travail.

| id | Énoncé | Vérifié | Sévérité |
|---|---|---|---|
| UX-01 | Chaque groupe du menu se nomme par un travail de l'utilisateur (dans son vocabulaire, avec le glossaire du projet), jamais par un module technique ni par une entité de données. | Cas manuel + révision de la matrice | AVERTIT |
| UX-02 | Chaque fonctionnalité a exactement une maison canonique. Si elle sert deux groupes, on choisit une maison et l'autre pointe vers elle ; l'entrée n'est pas dupliquée. | Requête à la matrice | BLOQUE |
| UX-03 | Il n'y a pas d'orphelines : chaque fonctionnalité déclarée est accessible depuis l'écran d'entrée en trois étapes au plus. | Parcours automatique des routes | BLOQUE |
| UX-04 | La taille d'un groupe est raisonnable : moins de trois fonctionnalités indique un groupe qui n'en était pas un ; plus de sept indique un tiroir. | Requête à la matrice | AVERTIT |
| UX-05 | Chaque groupe a un écran d'entrée qui dit ce qu'on y fait et quelle est l'action principale. Aucun groupe n'ouvre directement sur un tableau vide. | Cas manuel | AVERTIT |
| UX-06 | Les flux que la personne fait souvent vivent ensemble : si "enregistrer un paiement" et "voir le compte du client" s'utilisent dans la même session, ils partagent un groupe. | Cas manuel (test de tâche) | ENREGISTRE |
| UX-07 | Le test du premier clic : le propriétaire, devant une tâche concrète ("où encaisse-t-on un paiement ?"), nomme un endroit. S'il en nomme deux, il y a duplication ; s'il n'en nomme aucun, il y a orpheline. Il tourne à la fermeture de chaque bloc. | Cas manuel | AVERTIT |

### B2 - Profils et fonctionnalités activées par profil

Ici se trouve la pièce qui rapporte le plus, et la raison est d'ingénierie, pas de dessin : **l'activation se déclare une fois, dans une matrice, et tout le reste en dérive.** Aujourd'hui l'erreur classique est d'écrire la permission trois fois (dans le menu, dans le garde de route et dans le filtre de données) et de les avoir désynchronisées. Avec la matrice comme producteur unique, le menu, le routage, les permissions du serveur et les scripts de test sont des consommateurs, et la symétrie producteur/consommateur que la méthode exige déjà devient vérifiable toute seule.

La matrice a quatre colonnes et une ligne par fonctionnalité : *fonctionnalité*, *maison* (le groupe de B1), *profils qui l'ont*, *route d'entrée*. Rien de plus.

| id | Énoncé | Vérifié | Sévérité |
|---|---|---|---|
| UX-08 | Chaque fonctionnalité déclare dans la matrice quels profils l'ont. Une fonctionnalité sans profil n'existe pas : ou on lui donne un profil, ou on la supprime. | Requête à la matrice | BLOQUE |
| UX-09 | Chaque profil déclare a au moins une fonctionnalité et son propre point d'entrée. Un profil vide est un profil que personne n'a utilisé en concevant. | Requête à la matrice | BLOQUE |
| UX-10 | La navigation est générée à partir de la matrice. Un menu écrit à la main est un échec, pas un raccourci. | Barrière (recherche) | BLOQUE |
| UX-11 | Cacher n'est pas protéger : chaque route vérifie la permission côté serveur en plus de cacher l'entrée. Taper l'adresse à la main ne suffit pas pour entrer. | Test de bout en bout | BLOQUE |
| UX-12 | Ni moins ni plus : pour chaque profil, l'ensemble des fonctionnalités accessibles est exactement celui de sa ligne de la matrice. | Test de bout en bout par profil | BLOQUE |
| UX-13 | Le refus s'explique : si une personne entre dans une fonctionnalité qui n'est pas la sienne, elle voit un message qui dit pourquoi et à qui demander l'accès. Jamais un écran vide, jamais un bouton gris sans motif. | Cas manuel | AVERTIT |
| UX-14 | Le même bouton veut dire la même chose pour tous : si deux profils partagent un libellé, ils partagent l'effet. Si l'effet change par profil, le libellé change ou la fonctionnalité se coupe en deux. | Cas manuel | AVERTIT |
| UX-15 | Les données se filtrent aussi par profil : qui voit la liste voit les lignes qui lui correspondent, pas la liste entière avec les lignes cachées dans le navigateur. | Test de bout en bout + révision du serveur | BLOQUE |
| UX-16 | La matrice et le manuel utilisateur se mettent à jour dans le même élément en attente que la fonctionnalité. Une fonctionnalité nouvelle sans ligne dans la matrice ne ferme pas. | Fermeture de l'élément | BLOQUE |

### B3 - États, et ce que la personne voit quand quelque chose n'est pas là

La majorité des plaintes "ça ne marche pas" sont des écrans qui n'ont pas su dire "il n'y a rien", "ça charge" ou "ça a échoué". Quatre états, toujours, dans chaque liste et chaque écran de détail.

| id | Énoncé | Vérifié | Sévérité |
|---|---|---|---|
| UX-17 | Chaque liste a les quatre états résolus : avec données, vide, en chargement et en erreur. La vide distingue "il n'y a encore rien" de "votre recherche n'a rien trouve". | Cas manuel + révision | AVERTIT |
| UX-18 | Pendant qu'une chose prend du temps, on voit qu'elle travaille et on peut annuler si c'est long. Un bouton qui ne repond rien est la plainte numéro un. | Cas manuel | AVERTIT |
| UX-19 | L'erreur dit ce qui s'est passé, ce qu'on peut faire et n'efface pas ce qui a été saisi. Ni un code technique seul, ni un "une erreur est survenue". | Cas manuel | AVERTIT |

### B4 - Actions et erreurs

| id | Énoncé | Vérifié | Sévérité |
|---|---|---|---|
| UX-20 | Un écran a une action principale évidente ; le reste est secondaire et y ressemble. | Cas manuel | AVERTIT |
| UX-21 | Chaque action destructive demande confirmation en nommant l'objet concerne, et quand c'est possible on défait au lieu de confirmer. | Cas manuel | AVERTIT |
| UX-22 | Un formulaire qui échoue conserve ce qui a été saisi et marque le champ avec le problème, à l'endroit du champ. | Cas manuel | BLOQUE |
| UX-23 | Aucune action ne laisse l'écran sans sortie : après avoir enregistré, supprime ou annule, la personne sait où elle est et comment continuer. | Cas manuel | AVERTIT |

### B5 - Langue et accessibilité

| id | Énoncé | Vérifié | Sévérité |
|---|---|---|---|
| UX-24 | L'interface parle la langue du glossaire du projet : le même objet s'appelle pareil à l'écran, dans le manuel et dans l'e-mail. Un synonyme est un défaut. | Cas manuel + révision | AVERTIT |
| UX-25 | Tout se fait sans souris et avec un lecteur d'écran dans les flux principaux ; le focus est toujours visible et ne se coince pas. | Barrière (CQ-18) + cas manuel | AVERTIT |
| UX-26 | Les états ne se communiquent pas seulement par la couleur ; chaque image informative a un texte alternatif ; les textes se lisent en taille normale sans zoom. | Barrière (CQ-18) | AVERTIT |
| UX-27 | Chaque élément en attente qui touche un écran livre la capture réelle de l'environnement de test, et le propriétaire la regarde avant de fermer. La capture n'est pas optionnelle et ce n'est pas une maquette. | Fermeture de l'élément | BLOQUE |

### B6 - La question au propriétaire

La méthode ordonne au modèle de **demander** dans plus de la moitié de ses prompts : vingt-deux fois, dans quinze des vingt-sept fichiers du corpus publié. Et jusqu'au 2026-10-27 elle ne disait nulle part **comment on demande**, donc la forme restait à l'improvisation et le propriétaire recevait la question en vrac : sans les données qui la justifient, sans options et sans recommandation. C'est la même asymétrie que poursuit l'échelon 11 -- quelque chose d'exigé d'un côté et non défini de l'autre -- dans la direction la plus coûteuse : vers la personne qui décide. La méthode l'a déjà fait deux fois : la marche 8 ne s'est pas contentée de « montre-moi le rouge » et a défini ce qu'est un reçu ; la marche 12 ne s'est pas contentée de « rapporte » et a séparé le vérifié du cru.

| id | Énoncé | Vérifie | Sévérité |
|---|---|---|---|
| UX-28 | Quand l'agent a besoin d'une décision du propriétaire, la question arrive avec ses quatre parties et dans cet ordre : les données qui la rendent nécessaire, énumérées ; un paragraphe de cinq lignes au plus qui les relie et laisse voir la question ; la question avec ses réponses possibles numérotées ; et la recommandation de l'agent. Et à la profondeur technique que le projet a déclarée. Une question en vrac laisse au propriétaire le travail de reconstruire pourquoi on la lui pose. | Révision du propriétaire à la fermeture de l'élément | AVERTIT |

**Les trois niveaux de profondeur, et d'où ils viennent.** Le projet en déclare un et l'agent parle à ce niveau : `beginner` (langage de tous les jours, orienté résultat, sans noms de fichier ni jargon), `decision_maker` (chiffres mesurés et conséquences, sans chemins de fichier : celui que la méthode utilise par défaut) et `technical` (fichier, ligne et commande). Ils n'ont pas été inventés pour cette règle : le niveau débutant est déjà la forme de toute la méthode (D-025). Le nom du paramètre et les trois valeurs vivent au niveau des données, dans `project_config.communication_depth`, parce que c'est ce qu'un outil consommateur doit lire sans deviner.

**Ce que cette règle ne promet pas.** Une porte peut vérifier que la clause est dans les soixante-douze prompts et dans les huit langues -- et elle le fait ; aucun test ne peut vérifier qu'une question concrète écrite par un modèle un mardi a ses quatre parties. Cela, c'est le propriétaire qui en juge, et c'est pourquoi la règle avertit et ne bloque pas. Une règle qui bloque et que personne ne peut vérifier est pire qu'une règle qui avertit : c'est la même limitation déclarée que CQ-12 et CQ-14 ont déjà.


## 6. Ou cela s'accroche, et quels artefacts cela produit

L'annexe n'invente pas d'étapes nouvelles : elle s'accroche à celles qui existent. Cela évite de dupliquer les barrières et évite le destin habituel des listes d'utilisabilité, qui est d'être lues une fois.

**Ou elle va (D-043).** Elle est transversale aux quatre troncons, avec le poids principal sur la Boucle de Construction (étapes 5 à 12), qui est là où l'on décide et l'on construit. Ce n'est pas une étape propre : une étape numérotée obligerait à renuméroter l'échelle, altérerait le compte des étapes et soumettrait l'annexe à la traduction obligatoire des contrats dans les huit langues avant que la construction puisse passer au vert, sans ajouter aucune barrière que la boucle n'ait déjà.

**Comment elle s'accroche (D-044).** Une source canonique, cinq ancres et deux entrées préalables. Le texte des règles vit seulement ici et les prompts le citent ; ils ne le copient jamais. Répéter les règles dans les huit prompts de la boucle les dilue (elles rivalisent avec le travail de chaque étape et l'agent les obéit différemment chaque fois), les désaligne (deux copies du même texte se désynchronisent toutes seules, ce qui est l'antipattern que l'étape 11 poursuit) et ne les rend pas plus transversales : ce qui rend une règle transversale, c'est que chaque bloc passe par la même barrière, pas que la règle soit écrite partout.

**La seule règle qui entre dans le prompt, et pourquoi (D-070).** UX-28 est l'exception écrite à ce qui précède, et il vaut la peine de dire en quoi elle diffère des autres : celles-là sont des exigences sur **le système qu'on construit**, et la porte les mesure sur des artefacts que le projet laisse écrits ; UX-28 est une exigence sur **la conversation dans laquelle on construit**, et la seule manière pour que le modèle l'obéisse est qu'elle soit dans ce que le modèle lit. Elle entre de façon étroite -- elle nomme les quatre parties et le paramètre, et rien d'autre -- en une seule rédaction anglaise identique dans les huit langues. Ce que cette exception **n'autorise pas**, c'est de copier aucune des autres : l'argument de D-044 tient entier pour tout ce qu'une porte peut regarder.

| Moment | Ce qui s'ajoute | Pourquoi la |
|---|---|---|
| **Entrée préalable 1** - définition du périmètre | Le glossaire de l'utilisateur, dans `docs/GLOSSARY.md` | Sans glossaire, UX-01 et UX-24 n'ont rien à quoi se comparer. |
| **Entrée préalable 2** - définition du périmètre | La liste des profils, dans `docs/PROFILES.md` | Sans la liste, la matrice de B2 s'invente à l'étape 5 et tout ce qui en dérive naît sans base. |
| **Ancre 1** - étape 5 (le plan) | Chaque élément en attente qui touche un écran déclare trois choses : à quel groupe de convergence il appartient (B1), quels profils l'ont et quels critères d'acceptation sont par profil ("étant donne le profil X, la personne peut faire Y et ne peut pas faire Z"). Sans cette déclaration l'élément ne passe pas l'étape. | Ici *naissent* le regroupement et les profils : ce sont des décisions de planification, pas de code. C'est l'ancre au meilleur rendement et celle qui n'existe pas aujourd'hui. |
| **Ancre 2** - étape 8 (tests au rouge) | La matrice devient un test que l'on voit d'abord échouer : pour chaque profil, l'accessible contre sa ligne (UX-11, UX-12, UX-15). | Sans cela la matrice est un document que personne ne regarde. |
| **Ancre 3** - étape 9 (qualité) | Le catalogue CQ complet avec son adaptateur et ses seuils déclarés ; `docs/CODE_QUALITY.md` rend compte par règle, pas par un chiffre unique. Et la matrice comme barrière (UX-02, UX-03, UX-08, UX-09, UX-10, UX-16). | C'est le seul endroit où le texte entre littéralement comme directive, et c'est la barrière qui tourne à chaque bloc avec cliquet. |
| **Ancre 4** - étape 10 (cas manuels) | Chaque cas s'exécute **une fois par profil concerne**, dérivé de la matrice et non écrit à la main. Un cas déroule avec un seul profil ne compte pas comme exécuté. | Les cas manuels sont la seule vérification humaine de la méthode ; s'ils ne s'ouvrent pas par profil, la moitié de B2 n'est jamais regardée. |
| **Ancre 5** - étape 12 (vérification et rapport honnête) | Le rapport dit ce qui a été mesuré, ce qui est resté en avertissement et quelle règle est éteinte, avec son motif, son auteur et sa date de révision. | Zéro dommage silencieux : un groupe éteint ne peut pas être lu comme accompli. |
| Manuel utilisateur | Il s'organise par les groupes de B1 et déclare, par groupe, quels profils entrent. | Le manuel et le menu se nomment avec les mêmes mots ou le glossaire se casse. |
| Fermeture de chaque bloc | Test du premier clic (UX-07), capture de l'environnement réel (UX-27) et les deux tests de bout en bout de la matrice. | Ce sont les trois vérifications qui ne peuvent pas être automatisées. |

**État (D-049).** Les cinq ancrages sont en place : le prompt initial des peldans 5, 8, 9, 10 et 12 cite cette annexe dans les huit langues, avec une seule rédaction anglaise identique dans toutes et sa traduction locale à côté. Le document est publié sur le site avec le reste de la méthode dans les huit langues, et ses deux prompts sont entrés dans `docs/html/api/prompts.json` comme contrat `anexo-h` : à partir de la `build/prompts.mjs` les compare octet par octet dans les huit, sinon la construction échoue.

Les étapes 6, 7 et 11 reçoivent au plus une ligne : la 6 enregistre déjà les seuils et les exceptions comme décisions (c'est l'endroit naturel de l'exception déclarée), et la 11 est là où entre à coups le cas de la matrice écrite à quatre endroits. On ne leur ajoute pas de texte propre pour ne pas les diluer.

Trois artefacts, tous dans `docs/` : `CODE_QUALITY.md` (étendu), `USABILITY.md` (nouveau, avec le résultat par règle et les exceptions déclarées) et `PROFILE_MATRIX.md` (la matrice, qui est à la fois document et source du menu).

## 7. Configuration

Un seul fichier par projet déclare la couche 2 et la couche 3. Exemple avec la forme proposée, pas avec des valeurs definitives :

```json
{
  "frontend": "react-vite",
  "real_users": true,
  "communication_depth": "decision_maker",
  "measured_by": {
    "format": "prettier",
    "lint": "eslint",
    "types": "tsc",
    "complexity": "eslint-complexity",
    "duplication": "jscpd",
    "dead": "knip",
    "coverage": "vitest-coverage",
    "mutation": "stryker",
    "accessibility": "axe-core"
  },
  "tools": {
    "eslint": "9.12.0",
    "vitest": "2.1.3",
    "stryker": "8.6.0"
  },
  "thresholds": {
    "lines_per_file": 300,
    "lines_per_function": 40,
    "paths_per_function": 10,
    "minimum_coverage": 0,
    "mutation_target": 0,
    "end_users_outside_the_organisation": false,
    "acceptable_data_loss_window": "1h"
  },
  "switches": {
    "code_quality": true,
    "usability": true
  },
  "switched_off": [
    {
      "rule": "CQ-17",
      "reason": "rapport imprimable herite, sans tokens",
      "authorized_by": "proprietaire",
      "review_date": "2027-01-31"
    }
  ]
}
```

**Les clés de ce fichier sont du niveau de données et ne se traduisent pas** (D-051, D-075) : en anglais, en ASCII pur, avec le nom exact que la donnée déclare —les huit de premier niveau, les quatre du registre d'extinction (`gates/schema.json#project_config`) et les identifiants de seuil (`gates/adapters.json`)— et **identiques dans les huit langues**. Ce qui va dans la langue du lecteur, ce sont les **valeurs** qu'une personne écrit : le motif d'une extinction, par exemple. Écrit après mesure le 2026-10-29 : jusqu'à ce jour l'exemple portait les clés traduites —quatre vocabulaires différents dans les huit langues et quatre-vingt-sept noms pour vingt-quatre cases— et une extinction écrite comme l'exemple l'enseignait passait la barrière de la méthode elle-même **en vert**, avec la règle éteinte et le registre de quatre champs de D-046 jamais regardé, parce que la barrière lit `switched_off` et que l'exemple disait `exceptions`. `build/claves_configuracion.mjs` l'exige maintenant.

Les neuf clés à l'intérieur de `measured_by` sont les seules **illustratives**, et c'est une décision et non un oubli : la méthode **ne couvre pas avec quoi chaque règle est mesurée**, ce qui est laissé au jugement de celui qui mesure (décision du propriétaire, 2026-10-29). Et `end_users_outside_the_organisation` est le seuil de l'escalade de CQ-18 (D-048, D-076) : à `true` la règle bloque, à `false` l'escalade est **déclinée et enregistrée**, et non déclarée elle est signalée comme seuil non déclaré —c'est-à-dire « escalade en attente, personne ne l'a regardée » et pas la même chose que de l'avoir déclinée—. On n'utilise pas `real_users` pour cela : un outil interne peut avoir deux cents utilisateurs réels et aucun en dehors de l'organisation. Et `acceptable_data_loss_window` est le seuil de `CQ-22` pour l'essai de destruction et de restitution de l'échelon 20 (D-089) : c'est la période de perte de données que le propriétaire déclare acceptable, et **c'est lui qui y répond, ni la méthode ni l'agent**. La valeur de l'exemple est illustrative comme toutes celles du dessus ; ce qui n'est pas illustratif, c'est que sans cette réponse la cadence de la sauvegarde ne peut être contrastée contre rien —une copie par heure, une par jour et aucune sont également défendables— et la barrière le signale comme seuil non déclaré.

`communication_depth` est le paramètre d'UX-28 et prend une de trois valeurs -- `beginner`, `decision_maker`, `technical`. Si le projet ne le déclare pas, l'agent utilise `decision_maker` et le dit : le défaut se déclare, il ne se devine pas.

Les deux zéros sont délibérés et c'est la partie qui compte : la couverture minimale est fixée par le cliquet avec ce qui a été mesuré, et l'objectif de mutation est fixé par le propriétaire quand le projet a des utilisateurs. S'ils sont à zéro et que personne ne les a déclarés, la barrière le signale comme seuil non déclaré au lieu de l'inventer.

## 8. Les deux pièces, dans la forme que la méthode utilise

**Qualité de code.**

> Set up and maintain the code-quality gate for this project, configured for its frontend family. The core rules are the same in every project; what changes is how each one is measured and at which threshold. Install one formatter and one linter with a single shared configuration; enforce size limits per file and per function, complexity per function, duplication, dead code, declared-and-used dependencies, type checking where the language allows it, coverage with a ratchet, and secret scanning. Where the project has real users, add mutation testing scoped to the changed lines and record the score per block. Then extend the gate to the frontend itself: no business rule inside a screen, one typed client for every server call, one home for shared state, no user-visible string outside the translation catalogue, a stable identifier and role on every interactive element, styling only through tokens, and automatic basic accessibility checks. Every rule has a stable id, a severity (blocks, warns, records) and a named verifier. Thresholds and exceptions are declared by the owner in one configuration file; a rule switched off without a written exception is a gate failure, not a decision. Report the result per rule in `docs/CODE_QUALITY.md`, not as a single number.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [fr]
> Mettez en place et maintenez la barrière de qualité de code du projet, configurée pour sa famille de frontend. Les règles du noyau sont les mêmes dans tout projet ; ce qui change, c'est avec quoi on mesure chacune et à quel seuil. Installez un seul formateur et un seul linter avec une configuration partagée ; faites respecter des limites de taille par fichier et par fonction, la complexité par fonction, la duplication, le code mort, les dépendances déclarées et utilisées, la vérification des types là où le langage le permet, la couverture avec cliquet et l'analyse des secrets. Là où le projet a de vrais utilisateurs, ajoutez des tests de mutation limités aux lignes modifiées et enregistrez le score par bloc. Étendez ensuite la barrière au front : aucune règle métier dans un écran, un seul client type pour tout appel au serveur, un seul endroit pour l'état partagé, aucun texte visible hors du catalogue de traductions, un identifiant stable et un rôle sur chaque élément interactif, des styles uniquement par tokens et des vérifications automatiques d'accessibilité de base. Chaque règle a un identifiant stable, une sévérité (bloque, avertit, enregistre) et un vérificateur nommé. Les seuils et les exceptions sont déclarés par le propriétaire dans un fichier de configuration ; une règle éteinte sans exception écrite est un échec de la barrière, pas une décision. Rendez compte du résultat par règle dans `docs/CODE_QUALITY.md`, pas comme un chiffre unique.
>
> Quand tu as besoin d'une décision de ma part, demande-la avec les quatre parties de l'UX-28
> (`docs/ANEXO_HEURISTICAS.md`) et dans cet ordre : les données qui rendent la question
> nécessaire, énumérées ; un paragraphe de cinq lignes au plus qui les relie et laisse voir la
> question ; la question avec ses réponses possibles numérotées ; et ta recommandation. Dis-le à
> la profondeur technique que le projet a déclarée dans `communication_depth` —`beginner`,
> `decision_maker` ou `technical`— ; si le projet n'en a déclaré aucune, utilise `decision_maker`.

**Utilisabilité.**

> Build the usability criteria for this project before writing the first screen, and enforce them where the method already has hooks. Group functionality by what the person came to do, never by the internal module or the data entity: every menu group is named with a user job in the project glossary, every functionality has exactly one canonical home, no functionality is orphaned, and every group is reachable in no more than three steps from the entry screen. Then declare accessibility in one matrix and derive everything from it: each functionality lists the profiles that have it, each functionality has at least one profile, each profile has at least one functionality and its own entry point, the navigation is generated from the matrix instead of written by hand, and every route checks the permission on the server because hiding an entry is not protecting it. Verify the matrix per profile with an end-to-end check that compares what is reachable with the matrix row: neither less nor more. Require the four states on every list (with data, empty, loading, error), a visible working indicator with the option to cancel long operations, an error message that says what happened and what to do without losing entered data, a primary action per screen, confirmation or undo for destructive actions, and a form that keeps what was typed. Run each manual test case once per affected profile, run the first-click check at the close of every block, and require a real screenshot of the test environment on every item that touches a screen. Record the result per rule, with owner-declared exceptions, in `docs/USABILITY.md`, and keep the matrix in `docs/PROFILE_MATRIX.md` as the single source of truth.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [fr]
> Établissez les critères d'utilisabilité du projet avant d'écrire le premier écran, et faites-les respecter là où la méthode a déjà des accroches. Regroupez les fonctionnalités par ce que la personne est venue faire, jamais par le module interne ni par l'entité de données : chaque groupe du menu se nomme par un travail de l'utilisateur dans le glossaire du projet, chaque fonctionnalité a exactement une maison canonique, aucune ne reste orpheline, et chaque groupe est accessible en trois étapes au plus depuis l'écran d'entrée. Déclarez ensuite l'accessibilité dans une seule matrice et dérivez tout d'elle : chaque fonctionnalité énumère les profils qui l'ont, chaque fonctionnalité a au moins un profil, chaque profil a au moins une fonctionnalité et son propre point d'entrée, la navigation est générée à partir de la matrice au lieu d'être écrite à la main, et chaque route vérifie la permission côté serveur parce que cacher une entrée n'est pas la protéger. Vérifiez la matrice par profil avec un test de bout en bout qui compare l'accessible à la ligne de la matrice : ni moins ni plus. Exigez les quatre états dans chaque liste (avec données, vide, en chargement, en erreur), un indicateur visible de travail en cours avec la possibilité d'annuler ce qui est long, un message d'erreur qui dise ce qui s'est passé et quoi faire sans perdre ce qui a été saisi, une action principale par écran, une confirmation ou un défaire pour les actions destructives, et un formulaire qui conserve ce qui a été tapé. Déroulez chaque cas de test manuel une fois par profil concerne, déroulez le test du premier clic à la fermeture de chaque bloc, et exigez une capture réelle de l'environnement de test sur chaque élément qui touche un écran. Enregistrez le résultat par règle, avec les exceptions déclarées par le propriétaire, dans `docs/USABILITY.md`, et gardez la matrice dans `docs/PROFILE_MATRIX.md` comme source unique de vérité.
>
> Quand tu as besoin d'une décision de ma part, demande-la avec les quatre parties de l'UX-28
> (`docs/ANEXO_HEURISTICAS.md`) et dans cet ordre : les données qui rendent la question
> nécessaire, énumérées ; un paragraphe de cinq lignes au plus qui les relie et laisse voir la
> question ; la question avec ses réponses possibles numérotées ; et ta recommandation. Dis-le à
> la profondeur technique que le projet a déclarée dans `communication_depth` —`beginner`,
> `decision_maker` ou `technical`— ; si le projet n'en a déclaré aucune, utilise `decision_maker`.

## 9. Ce que cette proposition ne fait pas

- **Elle n'ajoute pas une étape.** Ce sont des règles transversales — de qualité du code et d'utilisabilité —, pas une nouvelle étape. Elles s'accrochent aux étapes qui existent. **Combien elles sont, cette prose ne le dit pas : c'est la donnée publiée qui le déclare** (`heuristics.counts`), la seule copie qui ne se périme pas (D-090).
- **Elle n'invente pas de score.** Un chiffre d'« utilisabilité 78 » ne dit pas quoi corriger et s'optimise dans la mauvaise direction. On rend compte par règle. La section 12 propose deux chiffres dérivés, mais ils sont un compte de règles avec son bordereau - pas une note de qualité ni d'utilisabilité - et ils n'autorisent à fermer quoi que ce soit.
- **Elle ne remplace pas le propriétaire.** Le test du premier clic, la capture et le test de tâche restent humains : c'est le seul instrument qui distingue « ça marche » de « ça sert ».
- **Elle n'apporte pas de seuils d'usine.** Ceux de l'adaptateur sont un point de départ déclaré ; le projet qui ne déclare pas les siens les hérite et cela est enregistré comme tel.
- **Elle ne promet pas que la barrière détecte le mauvais regroupement.** Une machine peut vérifier qu'il n'y a ni duplication ni orphelines ; si le groupe s'appelle « Gestion », il faut une personne pour le voir.

## 10. Les décisions : ce qui est règle et ce qui manque

### Réglées

| # | Décision | Registre |
|---|---|---|
| 1 | **Transversale à la Boucle de Construction, pas une étape propre.** On ne renumérote pas l'échelle, on n'altère pas le compte des étapes et l'annexe n'hérite pas de l'obligation de traduire un contrat d'étape. | D-043 |
| 2 | **Une source canonique avec cinq ancres et deux entrées préalables,** au lieu de copier les quarante-cinq règles dans les huit prompts de la boucle. | D-044 |
| 3 | **Deux interrupteurs independants** (qualité et utilisabilité), trois états par règle (bloque, avertit, éteinte), adaptateur par famille de frontend, seuils et exceptions déclarés par le propriétaire. | D-045 |
| 4 | **Discipline de l'interrupteur :** il vit dans la configuration du projet et non dans le prompt ; éteindre ne vaut que comme décision enregistrée avec motif, auteur et date de révision ; l'extinction est observable dans le rapport ; et l'interrupteur se teste en allumant et en éteignant. | D-046 |
| 5 | **Sévérités initiales, fixées règle par règle :** en qualité quatorze bloquent (CQ-01 à CQ-06, CQ-08, CQ-11 à CQ-17), CQ-09 bloque là où il y a de vrais utilisateurs, et trois avertissent (CQ-07, CQ-10, CQ-18). En utilisabilité onze bloquent (UX-02, UX-03, UX-08 à UX-12, UX-15, UX-16, UX-22, UX-27), UX-06 enregistre seulement et le reste avertit. Ni « tout bloque » - le projet ne démarre pas - ni « tout avertit » - l'heuristique est un ornement. | D-048 |
| 6 | **L'accessibilité commence par avertir et monte à bloquante par déclaration du propriétaire** quand le produit a des utilisateurs finaux hors de l'organisation. Le défaut ne s'invente pas : la montée se déclare, avec le même mécanisme que tout seuil (D-045). | D-048 |
| 7 | **La forme de la question est une règle avec un identifiant (UX-28), et elle entre dans les prompts.** La méthode ordonnait de demander vingt-deux fois et ne disait jamais comment ; la forme est quatre parties dans l'ordre et un niveau de profondeur déclaré par le projet. C'est l'exception écrite à D-044, étroite et argumentée dans la section 6. | D-070 |

### Ferme dans D-048, et les deux corrections qu'elle porte

Les deux questions qui bloquaient l'écriture des prompts sont déjà répondues : la première est devenue la ligne 5 et la seconde la ligne 6. Mais la recommandation approuvée avait deux erreurs de fait, et elles sont écrites ici pour qu'elles ne reviennent pas :

1. **Le défaut de comptage.** Là où cette annexe disait « vingt-sept règles », le nombre correct est **quarante-cinq** : 18 de qualité (CQ-01 à CQ-18) et 27 d'utilisabilité (UX-01 à UX-27). L'ancien chiffre venait d'un brouillon qui n'en comptait que la moitié. Corrige dans les sections 6 et 9 et note dans D-048 ; le texte de D-044 est conservé tel qu'il a été écrit, parce qu'une décision est un registre et ne se réécrit pas.
2. **Le formateur, le linter, la taille et la complexité ne se relachent pas.** Une version antérieure de cette recommandation les envoyait à « avertit » pour ne pas bloquer les projets avec de la dette héritée. Ce n'est pas possible : l'étape 9 les bloque déjà aujourd'hui, et cette extension l'étend, elle ne la remplace pas. La dette héritée se résout par une exception déclarée - avec motif et date de révision - ou par la ligne de base du cliquet, pas en baissant la sévérité de la règle.

**Et depuis le 2026-11-07 elles sont cinquante-deux.** CQ-22, CQ-23 et CQ-24 sont entrées avec D-089 et le compte est passé à 24 de qualité et 28 d'utilisabilité ; ce sont la quatrième, la cinquième et la sixième règle avec des **facettes**, et dans le même changement CQ-21 a reçu sa quatrième facette, ce qui est la première fois qu'une règle publiée gagne une facette après être entrée.

**Et depuis le 2026-11-03 elles sont quarante-neuf.** CQ-21 est entrée avec D-087 et le compte est passé à 21 de qualité et 28 d'utilisabilité ; c'est la troisième règle avec des **facettes** et la première qui entre avec la limite de ce qu'elle peut vérifier écrite dans sa propre section.

**Et depuis le 2026-11-01 elles sont quarante-huit.** CQ-19 et CQ-20 sont entrées avec D-078 et le compte est passé à 20 de qualité et 28 d'utilisabilité ; ce sont les deux premières règles avec des **facettes**, qui est la forme que décrit la section 2.

**Et depuis le 2026-10-27 elles sont quarante-six.** UX-28 est entrée avec D-070 et le compte est passé à 18 de qualité et 28 d'utilisabilité. La note ci-dessus est conservée telle qu'elle a été écrite, parce qu'une correction est aussi un registre ; ce qu'une règle nouvelle change, c'est le compte, pas l'histoire du compte.

Et une limitation déclarée, parce que c'est la seule de son espèce : **CQ-12 et CQ-14 bloquent avec un rouge humain.** Aucun outil ne prouve qu'un écran ne décide pas de règles métier. Elles se vérifient à la fermeture de l'élément en attente, avec le cas manuel devant et le même critère que UX-22 et UX-27 ; si le projet ne peut pas tenir cette fermeture, elles descendent à AVERTIT par décision enregistrée. Une règle qui bloque et que personne ne vérifie est pire qu'une règle qui avertit.

### Calendrier, pas décision

**La traduction.** Faite : l'annexe existe dans les huit langues et ses deux prompts font partie de l'API de prompts, identiques en anglais dans les huit versions (D-043 l'exige et `build/prompts.mjs` le fait respecter). Le texte espagnol reste le canonique : si jamais une traduction et l'espagnol se contredisent, l'espagnol gagne et la traduction se corrige dans la même modification.

## 11. Comment on vérifie que la barrière surveille

Une heuristique qui ne change rien quand on l'allume ou l'éteint n'est pas une barrière, c'est de la décoration. L'épreuve d'acceptation de l'implémentation (PND-002) est un projet fixture avec des violations délibérées de chaque famille :

| Scénario | Résultat exige |
|---|---|
| Qualité allumée, avec violation | Rouge, en nommant la règle et le fichier où se trouve la violation. |
| Qualité éteinte **avec bordereau** | Vert, et le rapport **dit** qu'elle est éteinte, depuis quand et qui l'a autorisée. |
| Qualité éteinte **sans bordereau** | Rouge. Éteindre sans motif écrit est un échec, pas une absence de règle. |
| Utilisabilité allumée, avec un profil qui atteint trop | Rouge sur UX-12, avec le profil et la fonctionnalité nommés. |
| Utilisabilité allumée, avec une fonctionnalité sans ligne dans la matrice | Rouge sur UX-08 à la fermeture de l'élément (UX-16). |
| Les deux groupes éteints | Vert dans les deux, avec les deux lignes d'extinction dans le rapport. |
| On plante une violation d'une règle qui **avertit** | Vert, et un élément en attente s'ouvre qui nomme la règle et le fichier : avertir n'est pas approuver. |
| On plante une violation d'une règle qui **bloque** | Rouge, avec règle, fichier et remède nommés. Et il n'y a pas de tableau : la moyenne ne ferme pas les blocs. |
| Tableau : on éteint une règle **avec bordereau** | La conformité peut monter, mais la **couverture de la barrière baisse** et le chiffre se publie avec le bordereau qui l'explique. Avec un seul chiffre ce scénario passerait inapercu ; c'est la preuve que les deux chiffres existent pour une raison (D-047). |
| Tableau : deux exécutions avec des règlements différents | Les deux chiffres se montrent avec leur empreinte (version du catalogue, règles actives et éteintes, adaptateur, versions des outils) et **ne se tracent pas comme une série continue** : ce sont deux mesures distinctes et le dire fait partie du résultat. |
| Tableau : règlement invalide (règle éteinte sans bordereau) | Il n'emet aucun chiffre. La sortie est rouge, pas un tableau avec un asterisque. |
| Tableau : conformité haute avec une règle qui bloque au rouge | Le bloc **ne ferme pas**. Le tableau fait la moyenne ; le vert est décidé par chaque règle, une par une. |
| Tableau : le pourcentage monte en ne touchant qu'à l'automatique | Le pourcentage monte et la ligne de vérification humaine ne bouge pas ; elle se rapporte à part et le rapport n'additionne pas les deux choses dans un chiffre unique. |

Ce que l'on regarde n'est pas seulement la couleur : on regarde que les deux lignes d'extinction **existent** dans le rapport. Un résultat vert sans cette ligne est le seul échec que cette épreuve ne peut pas détecter seule par la couleur, et c'est pourquoi on le vérifie en lisant la sortie.

## 12. Le tableau de conformité (DÉCIDE : deux chiffres, D-047)

**État.** Décide le 2026-10-22 dans D-047 : le tableau va avec deux chiffres, avec l'empreinte du règlement, avec cliquet, avec l'humain hors du pourcentage et avec le bordereau obligatoire. Il n'autorise pas à fermer des blocs. Ce qui suit est la spécification que l'implémentation (PND-002) doit respecter.

**Ce qu'il est.** Un dérivé déterministe du résultat par règle que la barrière a déjà émis. Il ne mesure rien de nouveau et ne juge rien de nouveau : il compte. Si le tableau pouvait changer le verdict d'une règle, il y aurait deux sources de vérité pour la même chose, ce qui est exactement ce que l'annexe combat en UX-10 (la navigation dérive de la matrice) et en CQ-14 (un seul endroit pour l'état).

**Ce qu'il n'est pas.** Ce n'est pas un critère d'acceptation. Aucun chiffre n'autorise à fermer un bloc : le vert ou le rouge est décidé par chaque règle qui bloque, une par une. Le tableau décrit la tendance et montre quoi regarder. S'il commence à servir de seuil de fermeture, il cesse de servir, parce que le chemin le plus court pour faire monter un chiffre est d'éteindre des règles.

**Deux chiffres, jamais un.**

| Chiffre | Formule | Ce qu'il mesure | Comment il bouge |
|---|---|---|---|
| **Conformité** | règles qui passent / règles actives | à quel point ce que l'on regarde est propre | monte quand on corrige |
| **Couverture de la barrière** | règles actives / règles déclarées au catalogue | quelle part de l'annexe surveille vraiment | baisse quand on éteint une règle |

La raison pour laquelle il y en a deux : éteindre une règle **fait monter** la conformité et **fait baisser** la couverture. Avec un seul chiffre, éteindre est gratuit et le tableau recompense l'aveuglement. Avec deux chiffres qui bougent en sens opposé, le raccourci disparait : pour montrer un meilleur tableau il faut corriger du code, pas éteindre des règles. Et la couverture ne peut pas monter sans mesurer.

**L'empreinte du règlement.** Chaque enregistrement garde avec quelle mesure il a été calculé : version du catalogue, règles actives et éteintes, adaptateur de frontend et versions des outils. Sans cela, un 82 d'hier et un 91 d'aujourd'hui ne sont pas la même mesure même s'ils s'écrivent pareil : ce sont deux règlements différents et la série est fausse. Deux chiffres sans empreinte produisent une illusion de progrès, ce qui est pire que de ne pas avoir de tableau. Si l'empreinte change, l'enregistrement est marqué comme **non comparable** où l'historique est recalculé avec la mesure en vigueur ; on ne les trace jamais ensemble sans le dire.

**Cliquet.** La conformité ne baisse pas d'un bloc au suivant sans une décision enregistrée qui l'explique. C'est le même mécanisme que la couverture de tests a déjà en CQ-08 : le chiffre d'aujourd'hui est le plancher de demain. Baisser n'est pas interdit ; baisser sans enregistrement, si.

**Ce qui n'entre pas dans le compte.** Ce qu'une personne seule peut juger - le test du premier clic (UX-07), le test de tâche (UX-06), la capture (UX-27), UX-28 et tous les cas manuels - s'enregistre comme passe ou échoue, par bloc, avec nom et date, et se rapporte à part comme couverture de vérification humaine. Il n'entre pas dans le pourcentage de conformité. Si on les melange, le résultat est un chiffre qui est soixante pour cent mesure et quarante pour cent opinion, et personne ne peut dire lequel est lequel. C'est pourquoi la section 9 tient toujours : le tableau n'invente pas une note d'utilisabilité, il compte des règles.

**Comment on le falsifie.** Il étend l'épreuve d'acceptation de la section 11 :

| Scénario | Résultat exige |
|---|---|
| On plante une violation d'une règle qui bloque | La conformité baisse d'exactement une règle sur les actives, et le rouge apparait avec la règle nommée. |
| On éteint une règle avec bordereau | La conformité peut monter ; la couverture baisse d'une règle sur les déclarées ; le rapport nomme la règle, le motif et la date de révision. |
| On éteint sans bordereau | Rouge, et aucun tableau n'est émis : un règlement invalide ne produit pas de chiffres. |
| Même arbre et même configuration, deux exécutions | Le même chiffre, identique. |
| La configuration change entre deux blocs | Les deux enregistrements sont marqués comme non comparables, où l'historique est recalculé avec la mesure en vigueur. |
| Le tableau sert de critère de fermeture | Usage impropre, pas un scénario valide : le vert est décidé par la règle, pas par la moyenne. |

**Ou il apparait.** Dans le rapport honnête de l'étape 12 (ancre 5), et dans cet ordre : d'abord le verdict binaire de la barrière, ensuite les deux chiffres, ensuite ce qui est éteint et jusqu'a quand, ensuite le mouvement par rapport au bloc précédent avec sa cause nommée. Toujours avec le bordereau : *a baissé de quatre points : CQ-15, trois chaînes hors du catalogue sur l'écran d'encaissement*. Un chiffre sans bordereau est du bruit ; le bordereau est ce qui le rend actionnable pour un propriétaire qui ne lit pas de code.

**Risque déclaré.** Le tableau va être lu par le propriétaire, qui ne lit pas de code, et c'est pourquoi il voudra qu'il monte. Le chiffre devient l'objectif, et l'objectif déplace le but. Les défenses sont celles du dessus, et il y en a cinq : deux chiffres qui se contredisent quand on éteint, l'empreinte qui empêche de comparer des mesures différentes, le cliquet qui ne laisse pas baisser sans enregistrement, l'humain hors du pourcentage et le bordereau obligatoire, avec la barrière qui ne se négocie pas à la moyenne. Si l'une des cinq tombe, le tableau s'éteint : un tableau mal utilisé fait plus de dégâts que de ne pas en avoir.

## 13. Registre

Chaque décision de cette annexe reste dans `docs/DECISIONES.md` avec date, auteur, citation textuelle et fichiers d'impact : D-043 (forme), D-044 (mécanisme), D-045 (interrupteurs), D-046 (discipline de l'interrupteur), D-047 (le tableau a deux chiffres) et D-048 (sévérités initiales et le poids de l'accessibilité). L'implémentation et ses critères d'acceptation vivent dans PND-002 ; la traduction et l'indexation, dans PND-003.

Aucune décision ne reste ouverte : la forme (D-043 et D-044), les interrupteurs (D-045 et D-046), le tableau (D-047) et les sévérités initiales avec le poids de l'accessibilité (D-048) sont décidées. Le texte voyage dans les huit langues et fait partie de l'API de prompts, ce qui ferme le seul point qui restait au calendrier.
