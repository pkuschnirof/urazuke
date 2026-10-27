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

Les règles CQ-12 à CQ-18 sont celles qui font que "qualité de code" veut dire quelque chose sur le front. Sans elles, le projet peut avoir quatre-vingt-dix pour cent de mutation et un écran qui calcule le total avec sa propre arithmétique dans un composant : le pire des deux mondes, parce que le calcul dupliqué passe tous les tests du serveur.

**Sévérités initiales (D-048).** Des le premier jour bloquent les quatorze règles qui ont un vérificateur et qui ne dépendent pas d'un seuil discutable : CQ-01 à CQ-06, CQ-08 et CQ-11 à CQ-17. CQ-09 bloque là où il y a de vrais utilisateurs, c'est-à-dire là où elle se mesure. Trois avertissent, et seulement trois : CQ-07 (types), CQ-10 (dépendances) et CQ-18 (accessibilité), parce que ce sont celles qui ont besoin que le projet se calibre d'abord. Le formateur, le linter, la taille et la complexité **ne se relachent pas** : l'étape 9 les bloque déjà aujourd'hui, et cette extension l'étend, elle ne la remplace pas ; la dette héritée se résout par une exception déclarée ou par la ligne de base du cliquet, jamais en baissant la sévérité. Et CQ-12 et CQ-14 sont les deux seules règles de ce tableau qui bloquent avec un rouge humain et non machine : elles se vérifient à la fermeture de l'élément en attente et avec le cas manuel devant, comme UX-22 et UX-27, pas à chaque envoi. Si le projet ne peut pas tenir cette fermeture, la règle descend à AVERTIT par décision enregistrée, pas par négligence.

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

Cinq familles. La première et la deuxième sont celles que le propriétaire a explicitement demandées ; les trois autres existent parce que sans elles le regroupement et les profils se degradent de la même façon, plus lentement.

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

## 6. Ou cela s'accroche, et quels artefacts cela produit

L'annexe n'invente pas d'étapes nouvelles : elle s'accroche à celles qui existent. Cela évite de dupliquer les barrières et évite le destin habituel des listes d'utilisabilité, qui est d'être lues une fois.

**Ou elle va (D-043).** Elle est transversale aux quatre troncons, avec le poids principal sur la Boucle de Construction (étapes 5 à 12), qui est là où l'on décide et l'on construit. Ce n'est pas une étape propre : une étape numérotée obligerait à renuméroter l'échelle, altérerait le compte des étapes et soumettrait l'annexe à la traduction obligatoire des contrats dans les huit langues avant que la construction puisse passer au vert, sans ajouter aucune barrière que la boucle n'ait déjà.

**Comment elle s'accroche (D-044).** Une source canonique, cinq ancres et deux entrées préalables. Le texte des règles vit seulement ici et les prompts le citent ; ils ne le copient jamais. Répéter les quarante-cinq règles dans les huit prompts de la boucle les dilue (elles rivalisent avec le travail de chaque étape et l'agent les obéit différemment chaque fois), les désaligne (deux copies du même texte se désynchronisent toutes seules, ce qui est l'antipattern que l'étape 11 poursuit) et ne les rend pas plus transversales : ce qui rend une règle transversale, c'est que chaque bloc passe par la même barrière, pas que la règle soit écrite partout.

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
  "version": 1,
  "frontend": "react-vite",
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
  "thresholds": {
    "lines_per_file": 300,
    "lines_per_function": 40,
    "paths_per_function": 10,
    "minimum_coverage": 0,
    "mutation_target": 0
  },
  "exceptions": [
    {
      "rule": "CQ-17",
      "reason": "rapport imprimable herite, sans tokens",
      "authorised_by": "proprietaire",
      "review": "2027-01-31"
    }
  ]
}
```

Les deux zéros sont délibérés et c'est la partie qui compte : la couverture minimale est fixée par le cliquet avec ce qui a été mesuré, et l'objectif de mutation est fixé par le propriétaire quand le projet a des utilisateurs. S'ils sont à zéro et que personne ne les a déclarés, la barrière le signale comme seuil non déclaré au lieu de l'inventer.

## 8. Les deux pièces, dans la forme que la méthode utilise

**Qualité de code.**

> Set up and maintain the code-quality gate for this project, configured for its frontend family. The core rules are the same in every project; what changes is how each one is measured and at which threshold. Install one formatter and one linter with a single shared configuration; enforce size limits per file and per function, complexity per function, duplication, dead code, declared-and-used dependencies, type checking where the language allows it, coverage with a ratchet, and secret scanning. Where the project has real users, add mutation testing scoped to the changed lines and record the score per block. Then extend the gate to the frontend itself: no business rule inside a screen, one typed client for every server call, one home for shared state, no user-visible string outside the translation catalogue, a stable identifier and role on every interactive element, styling only through tokens, and automatic basic accessibility checks. Every rule has a stable id, a severity (blocks, warns, records) and a named verifier. Thresholds and exceptions are declared by the owner in one configuration file; a rule switched off without a written exception is a gate failure, not a decision. Report the result per rule in `docs/CODE_QUALITY.md`, not as a single number.

> [fr]
> Mettez en place et maintenez la barrière de qualité de code du projet, configurée pour sa famille de frontend. Les règles du noyau sont les mêmes dans tout projet ; ce qui change, c'est avec quoi on mesure chacune et à quel seuil. Installez un seul formateur et un seul linter avec une configuration partagée ; faites respecter des limites de taille par fichier et par fonction, la complexité par fonction, la duplication, le code mort, les dépendances déclarées et utilisées, la vérification des types là où le langage le permet, la couverture avec cliquet et l'analyse des secrets. Là où le projet a de vrais utilisateurs, ajoutez des tests de mutation limités aux lignes modifiées et enregistrez le score par bloc. Étendez ensuite la barrière au front : aucune règle métier dans un écran, un seul client type pour tout appel au serveur, un seul endroit pour l'état partagé, aucun texte visible hors du catalogue de traductions, un identifiant stable et un rôle sur chaque élément interactif, des styles uniquement par tokens et des vérifications automatiques d'accessibilité de base. Chaque règle a un identifiant stable, une sévérité (bloque, avertit, enregistre) et un vérificateur nommé. Les seuils et les exceptions sont déclarés par le propriétaire dans un fichier de configuration ; une règle éteinte sans exception écrite est un échec de la barrière, pas une décision. Rendez compte du résultat par règle dans `docs/CODE_QUALITY.md`, pas comme un chiffre unique.

**Utilisabilité.**

> Build the usability criteria for this project before writing the first screen, and enforce them where the method already has hooks. Group functionality by what the person came to do, never by the internal module or the data entity: every menu group is named with a user job in the project glossary, every functionality has exactly one canonical home, no functionality is orphaned, and every group is reachable in no more than three steps from the entry screen. Then declare accessibility in one matrix and derive everything from it: each functionality lists the profiles that have it, each functionality has at least one profile, each profile has at least one functionality and its own entry point, the navigation is generated from the matrix instead of written by hand, and every route checks the permission on the server because hiding an entry is not protecting it. Verify the matrix per profile with an end-to-end check that compares what is reachable with the matrix row: neither less nor more. Require the four states on every list (with data, empty, loading, error), a visible working indicator with the option to cancel long operations, an error message that says what happened and what to do without losing entered data, a primary action per screen, confirmation or undo for destructive actions, and a form that keeps what was typed. Run each manual test case once per affected profile, run the first-click check at the close of every block, and require a real screenshot of the test environment on every item that touches a screen. Record the result per rule, with owner-declared exceptions, in `docs/USABILITY.md`, and keep the matrix in `docs/PROFILE_MATRIX.md` as the single source of truth.

> [fr]
> Établissez les critères d'utilisabilité du projet avant d'écrire le premier écran, et faites-les respecter là où la méthode a déjà des accroches. Regroupez les fonctionnalités par ce que la personne est venue faire, jamais par le module interne ni par l'entité de données : chaque groupe du menu se nomme par un travail de l'utilisateur dans le glossaire du projet, chaque fonctionnalité a exactement une maison canonique, aucune ne reste orpheline, et chaque groupe est accessible en trois étapes au plus depuis l'écran d'entrée. Déclarez ensuite l'accessibilité dans une seule matrice et dérivez tout d'elle : chaque fonctionnalité énumère les profils qui l'ont, chaque fonctionnalité a au moins un profil, chaque profil a au moins une fonctionnalité et son propre point d'entrée, la navigation est générée à partir de la matrice au lieu d'être écrite à la main, et chaque route vérifie la permission côté serveur parce que cacher une entrée n'est pas la protéger. Vérifiez la matrice par profil avec un test de bout en bout qui compare l'accessible à la ligne de la matrice : ni moins ni plus. Exigez les quatre états dans chaque liste (avec données, vide, en chargement, en erreur), un indicateur visible de travail en cours avec la possibilité d'annuler ce qui est long, un message d'erreur qui dise ce qui s'est passé et quoi faire sans perdre ce qui a été saisi, une action principale par écran, une confirmation ou un défaire pour les actions destructives, et un formulaire qui conserve ce qui a été tapé. Déroulez chaque cas de test manuel une fois par profil concerne, déroulez le test du premier clic à la fermeture de chaque bloc, et exigez une capture réelle de l'environnement de test sur chaque élément qui touche un écran. Enregistrez le résultat par règle, avec les exceptions déclarées par le propriétaire, dans `docs/USABILITY.md`, et gardez la matrice dans `docs/PROFILE_MATRIX.md` comme source unique de vérité.

## 9. Ce que cette proposition ne fait pas

- **Elle n'ajoute pas une étape.** Ce sont quarante-cinq règles transversales (18 de qualité et 27 d'utilisabilité), pas une nouvelle étape. Elles s'accrochent aux étapes qui existent.
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

### Ferme dans D-048, et les deux corrections qu'elle porte

Les deux questions qui bloquaient l'écriture des prompts sont déjà répondues : la première est devenue la ligne 5 et la seconde la ligne 6. Mais la recommandation approuvée avait deux erreurs de fait, et elles sont écrites ici pour qu'elles ne reviennent pas :

1. **Le défaut de comptage.** Là où cette annexe disait « vingt-sept règles », le nombre correct est **quarante-cinq** : 18 de qualité (CQ-01 à CQ-18) et 27 d'utilisabilité (UX-01 à UX-27). L'ancien chiffre venait d'un brouillon qui n'en comptait que la moitié. Corrige dans les sections 6 et 9 et note dans D-048 ; le texte de D-044 est conservé tel qu'il a été écrit, parce qu'une décision est un registre et ne se réécrit pas.
2. **Le formateur, le linter, la taille et la complexité ne se relachent pas.** Une version antérieure de cette recommandation les envoyait à « avertit » pour ne pas bloquer les projets avec de la dette héritée. Ce n'est pas possible : l'étape 9 les bloque déjà aujourd'hui, et cette extension l'étend, elle ne la remplace pas. La dette héritée se résout par une exception déclarée - avec motif et date de révision - ou par la ligne de base du cliquet, pas en baissant la sévérité de la règle.

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

**Ce qui n'entre pas dans le compte.** Ce qu'une personne seule peut juger - le test du premier clic (UX-07), le test de tâche (UX-06), la capture (UX-27) et tous les cas manuels - s'enregistre comme passe ou échoue, par bloc, avec nom et date, et se rapporte à part comme couverture de vérification humaine. Il n'entre pas dans le pourcentage de conformité. Si on les melange, le résultat est un chiffre qui est soixante pour cent mesure et quarante pour cent opinion, et personne ne peut dire lequel est lequel. C'est pourquoi la section 9 tient toujours : le tableau n'invente pas une note d'utilisabilité, il compte des règles.

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
