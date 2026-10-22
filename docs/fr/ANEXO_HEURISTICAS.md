# Annexe H - Heuristiques de qualite de code et d'utilisabilite

**Etat : APPROUVE - FORME, SEVERITES INITIALES ET TRADUCTION.** Aucune decision ne reste ouverte. La forme (D-043 et D-044), les interrupteurs (D-045 et D-046), le tableau (D-047) et les severites initiales avec le poids de l'accessibilite (D-048, section 10) sont decidees. Le texte est traduit dans six des huit langues (allemand, anglais, espagnol, francais, italien et portugais) ; il manque le japonais et le chinois, et c'est seulement quand ils existeront qu'il entrera dans l'API de prompts, ou `build/prompts.mjs` l'exige octet par octet. Date : 2026-10-22.

Registre des decisions de cette annexe : `docs/DECISIONES.md`, D-043 a D-048. Le tableau de conformite (section 12) a ete decide avec deux chiffres dans D-047. Le travail d'implementation vit dans PND-002 ; la traduction et l'indexation, dans PND-003.

## 1. Ce qui manque aujourd'hui, et pourquoi

L'etape 9 mesure deja le code, et elle le fait avec une barriere qui ne laisse rien passer : un formateur unique, des limites de taille (trois cents lignes par fichier, quarante par fonction), la complexite par fonction, le code duplique, le code mort, les dependances declarees et utilisees, la couverture avec cliquet et les tests de mutation la ou il y a de vrais utilisateurs. Le chiffre est ecrit dans `docs/CODE_QUALITY.md`. C'est resolu.

Ce qui n'est pas resolu, c'est l'autre moitie du produit. J'ai revise le corpus des etapes : il n'y a pas une seule mention de l'utilisabilite, des profils/personnes ni du regroupement fonctionnel. L'interface tient aujourd'hui sur deux choses : la capture que le proprietaire regarde pendant dix secondes et les cas de test manuels. Les deux sont bons et les deux sont humains, couteux et oublieux. Un systeme peut passer la barriere de qualite avec les honneurs et etre inutilisable : tout vert, et la personne ne trouve pas ou encaisser.

Et il y a un probleme de second niveau, technique mais qui se voit dans l'interface : quand le meme produit est utilise par plusieurs profils (administration, operations, consultation, client), les fonctionnalites sont activees a trois endroits differents - la base, le menu et le garde de route - qui s'ecrivent a des moments differents et se desynchronisent tout seuls. Le symptome est toujours le meme : quelqu'un voit un bouton qui n'est pas le sien, ou pire, quelqu'un qui a bien la permission ne trouve pas l'ecran.

Les deux heuristiques qui suivent attaquent ces deux choses avec la meme forme : un catalogue court d'affirmations verifiables, quelques instruments qui les mesurent tout seuls, et un chemin d'exception declaree pour quand le projet doit sortir du cadre.

## 2. Le modele : trois couches, une seule forme de regle

La tentation est de faire une liste de regles et de l'attacher a la pile du premier projet. Cela vieillit mal : la regle React ne s'applique pas en Angular, celle d'Angular ne s'applique pas dans un serveur avec des gabarits, et dans deux ans la moitie de la liste est morte. La proposition separe trois couches.

**Couche 1 - Noyau agnostique (non negociable).** Des affirmations sur des resultats, pas sur des outils. "Il y a un seul formateur et personne ne discute avec lui" s'applique de la meme facon en TypeScript, en PHP ou en Go. Le noyau s'enumere avec des identifiants stables et ne change pas d'un projet a l'autre.

**Couche 2 - Adaptateur par pile (configurable).** Pour chaque regle du noyau, chaque famille de frontend declare *avec quoi* on la mesure et *avec quel seuil*. Un projet React avec Vite, un Next, un Angular, un serveur avec gabarits, un mobile et un en ligne de commande sont six adaptateurs differents du meme noyau. Tout ce que l'utilisateur a demande comme "configurable par frontend" vit ici.

**Couche 3 - Decisions du projet (declarees).** Les seuils concrets et les exceptions. Ils ne s'inventent pas : ils se demandent au proprietaire et restent ecrits, comme le dimensionnement de l'etape d'architecture. Si un seuil n'est pas declare, celui de l'adaptateur s'applique et il est enregistre comme tel.

Toute regle s'ecrit toujours avec la meme fiche de six champs :

| Champ | Ce qu'il contient |
|---|---|
| `id` | Identifiant stable (`CQ-07`, `UX-12`). Jamais reutilise. |
| Enonce | Une seule phrase, a l'imperatif, sur un resultat observable. |
| Pourquoi | Le dommage concret qu'elle evite. S'il n'y a pas de dommage, la regle est superflue. |
| Comment on verifie | L'instrument : barriere automatique, requete a la matrice, test de bout en bout ou cas manuel. |
| Severite | `BLOQUE` (la barriere passe au rouge et le bloc ne ferme pas), `AVERTIT` (ouvre un element en attente), `ENREGISTRE` (reste seulement dans le document). |
| S'applique a | Les profils ou elle commande. Hors d'eux elle ne tourne pas, et ce n'est pas une exception : c'est la portee. |

**L'exception se declare, elle ne s'omet jamais.** Une regle s'eteint avec une fiche de quatre champs : identifiant, motif en une ligne, qui l'autorise (le proprietaire, pas l'agent) et date de revision. Une regle eteinte sans fiche est un echec de la barriere, pas une decision. C'est le meme critere que la methode utilise deja pour refuser une limite relevee "pour passer".

## 3. Les quatre instruments

Aucune heuristique ne vaut rien si sa verification est une opinion. Il y en a quatre, et chaque regle declare a laquelle elle appartient.

1. **Barriere automatique.** Elle tourne a chaque envoi et a la fermeture du bloc. Elle rend vert ou rouge. Elle est bon marche, repetable et ne discute pas. Elle mesure tout ce qui peut etre compte.
2. **Requete a la matrice.** La matrice fonctionnalite-par-profil (voir B2) est un artefact declaratif ; le menu, le routage et les permissions en derivent. Verifier la matrice, c'est verifier l'interface. C'est la piece qui convertit une partie de l'utilisabilite en quelque chose qu'une machine peut verifier.
3. **Test de bout en bout par profil.** Pour chaque profil declare, un script qui entre comme ce profil et compare l'ensemble des fonctionnalites accessibles a la ligne de la matrice : *ni moins ni plus*. C'est le test qui attrape les deux desynchronisations typiques (le bouton qui reste et l'ecran qui manque).
4. **Cas manuel.** Ce qu'aucune machine ne juge : si le regroupement se comprend, si la tache se termine sans aide, si le texte est dans la langue de l'utilisateur. Il se deroule avec des personnes et il est enregistre, comme l'etape 10 le prescrit deja.

## 4. Partie A - Qualite de code

Le noyau etend l'etape 9 : il ne la remplace pas et ne la contredit pas, il donne un nom, une severite et un adaptateur a chaque chose qui se mesure deja, et il ajoute ce qui manque aujourd'hui, c'est-a-dire l'interface vue comme du code.

| id | Famille | Enonce | Verifie | Severite |
|---|---|---|---|---|
| CQ-01 | Forme | Il y a un seul formateur, il tourne sans intervention et il n'admet pas de discussion. | Barriere | BLOQUE |
| CQ-02 | Forme | Il y a un seul linter par depot et ses regles sont les memes pour tous ; une regle s'eteint avec un motif ecrit, jamais dans un fichier isole. | Barriere | BLOQUE |
| CQ-03 | Taille | Aucun fichier ne depasse la limite declaree (commence a 300 lignes) et aucune fonction ne depasse la sienne (commence a 40). | Barriere | BLOQUE |
| CQ-04 | Complexite | Aucune fonction ne depasse la limite declaree de chemins. | Barriere | BLOQUE |
| CQ-05 | Duplication | Aucune duplication nouvelle n'entre : le bloc copie est extrait ou justifie. | Barriere | BLOQUE |
| CQ-06 | Choses mortes | Il n'y a pas de code mort : fonctions, variables, imports, branches et dependances inutilisees. | Barriere | BLOQUE |
| CQ-07 | Types | Si le langage permet les types, le projet les utilise serieusement ; le type "any" est une exception declaree, pas une habitude. | Barriere | AVERTIT |
| CQ-08 | Tests | La couverture ne baisse pas : le chiffre d'aujourd'hui est le plancher de demain. | Barriere | BLOQUE |
| CQ-09 | Tests | Avec de vrais utilisateurs, le score de mutation se mesure par bloc et tout mutant qui survit dans du code nouveau ouvre un element en attente. | Barriere + registre | BLOQUE |
| CQ-10 | Dependances | Toute dependance est declaree, est utilisee et n'apporte pas un arbre tiers disproportionne a ce qu'elle apporte. | Barriere | AVERTIT |
| CQ-11 | Secrets | Il n'y a pas d'identifiants, de cles ni de chaines de connexion dans le depot, ni dans l'historique nouveau. | Barriere | BLOQUE |
| CQ-12 | Interface | L'interface ne decide pas : aucun ecran ni composant ne contient de regle metier (ce qui est permis, combien cela coute, quel etat suit). Elle vit dans le domaine et la vue l'interroge. | Revision a la fermeture + cas manuel | BLOQUE |
| CQ-13 | Interface | Tout appel au serveur passe par un seul client type ; aucun ecran ne construit sa requete a la main. | Barriere (recherche) | BLOQUE |
| CQ-14 | Interface | Il y a un seul endroit ou vit l'etat partage ; dupliquer l'etat entre ecrans est un echec, pas un raccourci. | Revision a la fermeture | BLOQUE |
| CQ-15 | Interface | Tout texte visible sort d'un catalogue de traductions ; aucune chaine utilisateur ne reste ecrite dans le composant. | Barriere (recherche) | BLOQUE |
| CQ-16 | Interface | Tout element interactif porte un identifiant stable et un role, pour que le test automatique le trouve par son nom et non par sa position. | Barriere (recherche) | BLOQUE |
| CQ-17 | Interface | Toutes les couleurs, espacements et typographies sortent de tokens ; aucune valeur en dur dans la feuille de styles. | Barriere (recherche) | BLOQUE |
| CQ-18 | Interface | L'accessibilite de base se verifie toute seule : contraste, etiquettes sur les champs, focus visible, navigation au clavier dans les flux principaux, images avec texte alternatif. | Barriere | AVERTIT |

Les regles CQ-12 a CQ-18 sont celles qui font que "qualite de code" veut dire quelque chose sur le front. Sans elles, le projet peut avoir quatre-vingt-dix pour cent de mutation et un ecran qui calcule le total avec sa propre arithmetique dans un composant : le pire des deux mondes, parce que le calcul duplique passe tous les tests du serveur.

**Severites initiales (D-048).** Des le premier jour bloquent les quatorze regles qui ont un verificateur et qui ne dependent pas d'un seuil discutable : CQ-01 a CQ-06, CQ-08 et CQ-11 a CQ-17. CQ-09 bloque la ou il y a de vrais utilisateurs, c'est-a-dire la ou elle se mesure. Trois avertissent, et seulement trois : CQ-07 (types), CQ-10 (dependances) et CQ-18 (accessibilite), parce que ce sont celles qui ont besoin que le projet se calibre d'abord. Le formateur, le linter, la taille et la complexite **ne se relachent pas** : l'etape 9 les bloque deja aujourd'hui, et cette extension l'etend, elle ne la remplace pas ; la dette heritee se resout par une exception declaree ou par la ligne de base du cliquet, jamais en baissant la severite. Et CQ-12 et CQ-14 sont les deux seules regles de ce tableau qui bloquent avec un rouge humain et non machine : elles se verifient a la fermeture de l'element en attente et avec le cas manuel devant, comme UX-22 et UX-27, pas a chaque envoi. Si le projet ne peut pas tenir cette fermeture, la regle descend a AVERTIT par decision enregistree, pas par negligence.

**Adaptateur par famille de frontend.** Exemple de la facon dont la couche 2 s'instancie (les noms sont illustratifs ; le projet choisit et ecrit les siens) :

| Concept | Application monopage (React, Vue, Angular) | Serveur avec gabarits | Mobile natif | Ligne de commande |
|---|---|---|---|---|
| CQ-12 domaine dans la vue | Regle de lint sur la taille et les dependances du composant + revision | Revision du controleur | Revision du view-model | Revision de la couche de commandes |
| CQ-13 client unique | Generation a partir du contrat de l'API | Service unique du serveur | Client genere | Client unique du SDK |
| CQ-15 textes | Catalogue + regle qui interdit les litteraux visibles | Catalogue du moteur de gabarits | Catalogue de ressources | Catalogue |
| CQ-16 identifiants | Attributs declaratifs par element | Identifiants dans le balisage | Identifiants d'accessibilite | Sortie stable |
| CQ-17 tokens | Tokens dans la feuille de styles, sans valeurs en dur | Idem | Idem | Non applicable |
| CQ-18 accessibilite | Analyseur automatique dans la barriere | Analyseur sur le HTML genere | Analyseur d'accessibilite | Non applicable |

Ce qui change entre les colonnes, c'est l'outil et le seuil. Ce qui ne change pas, c'est l'enonce. C'est cela qui rend l'heuristique agnostique sans la rendre decorative.

## 5. Partie B - Utilisabilite

Cinq familles. La premiere et la deuxieme sont celles que le proprietaire a explicitement demandees ; les trois autres existent parce que sans elles le regroupement et les profils se degradent de la meme facon, plus lentement.

### B1 - Regroupement par convergence fonctionnelle

La regle mere : **une fonctionnalite se regroupe par ce que la personne est venue faire, pas par le module dont elle est issue.** Le code s'organise par entites ("Facture", "Client", "Paiement") ; les personnes non. Personne n'entre dans le systeme pour "gerer des entites" : on entre pour encaisser, pour expedier, pour cloturer le mois. Si le menu montre les entites, la personne fait la traduction. Le menu *est* le travail.

| id | Enonce | Verifie | Severite |
|---|---|---|---|
| UX-01 | Chaque groupe du menu se nomme par un travail de l'utilisateur (dans son vocabulaire, avec le glossaire du projet), jamais par un module technique ni par une entite de donnees. | Cas manuel + revision de la matrice | AVERTIT |
| UX-02 | Chaque fonctionnalite a exactement une maison canonique. Si elle sert deux groupes, on choisit une maison et l'autre pointe vers elle ; l'entree n'est pas dupliquee. | Requete a la matrice | BLOQUE |
| UX-03 | Il n'y a pas d'orphelines : chaque fonctionnalite declaree est accessible depuis l'ecran d'entree en trois etapes au plus. | Parcours automatique des routes | BLOQUE |
| UX-04 | La taille d'un groupe est raisonnable : moins de trois fonctionnalites indique un groupe qui n'en etait pas un ; plus de sept indique un tiroir. | Requete a la matrice | AVERTIT |
| UX-05 | Chaque groupe a un ecran d'entree qui dit ce qu'on y fait et quelle est l'action principale. Aucun groupe n'ouvre directement sur un tableau vide. | Cas manuel | AVERTIT |
| UX-06 | Les flux que la personne fait souvent vivent ensemble : si "enregistrer un paiement" et "voir le compte du client" s'utilisent dans la meme session, ils partagent un groupe. | Cas manuel (test de tache) | ENREGISTRE |
| UX-07 | Le test du premier clic : le proprietaire, devant une tache concrete ("ou encaisse-t-on un paiement ?"), nomme un endroit. S'il en nomme deux, il y a duplication ; s'il n'en nomme aucun, il y a orpheline. Il tourne a la fermeture de chaque bloc. | Cas manuel | AVERTIT |

### B2 - Profils et fonctionnalites activees par profil

Ici se trouve la piece qui rapporte le plus, et la raison est d'ingenierie, pas de dessin : **l'activation se declare une fois, dans une matrice, et tout le reste en derive.** Aujourd'hui l'erreur classique est d'ecrire la permission trois fois (dans le menu, dans le garde de route et dans le filtre de donnees) et de les avoir desynchronisees. Avec la matrice comme producteur unique, le menu, le routage, les permissions du serveur et les scripts de test sont des consommateurs, et la symetrie producteur/consommateur que la methode exige deja devient verifiable toute seule.

La matrice a quatre colonnes et une ligne par fonctionnalite : *fonctionnalite*, *maison* (le groupe de B1), *profils qui l'ont*, *route d'entree*. Rien de plus.

| id | Enonce | Verifie | Severite |
|---|---|---|---|
| UX-08 | Chaque fonctionnalite declare dans la matrice quels profils l'ont. Une fonctionnalite sans profil n'existe pas : ou on lui donne un profil, ou on la supprime. | Requete a la matrice | BLOQUE |
| UX-09 | Chaque profil declare a au moins une fonctionnalite et son propre point d'entree. Un profil vide est un profil que personne n'a utilise en concevant. | Requete a la matrice | BLOQUE |
| UX-10 | La navigation est generee a partir de la matrice. Un menu ecrit a la main est un echec, pas un raccourci. | Barriere (recherche) | BLOQUE |
| UX-11 | Cacher n'est pas proteger : chaque route verifie la permission cote serveur en plus de cacher l'entree. Taper l'adresse a la main ne suffit pas pour entrer. | Test de bout en bout | BLOQUE |
| UX-12 | Ni moins ni plus : pour chaque profil, l'ensemble des fonctionnalites accessibles est exactement celui de sa ligne de la matrice. | Test de bout en bout par profil | BLOQUE |
| UX-13 | Le refus s'explique : si une personne entre dans une fonctionnalite qui n'est pas la sienne, elle voit un message qui dit pourquoi et a qui demander l'acces. Jamais un ecran vide, jamais un bouton gris sans motif. | Cas manuel | AVERTIT |
| UX-14 | Le meme bouton veut dire la meme chose pour tous : si deux profils partagent un libelle, ils partagent l'effet. Si l'effet change par profil, le libelle change ou la fonctionnalite se coupe en deux. | Cas manuel | AVERTIT |
| UX-15 | Les donnees se filtrent aussi par profil : qui voit la liste voit les lignes qui lui correspondent, pas la liste entiere avec les lignes cachees dans le navigateur. | Test de bout en bout + revision du serveur | BLOQUE |
| UX-16 | La matrice et le manuel utilisateur se mettent a jour dans le meme element en attente que la fonctionnalite. Une fonctionnalite nouvelle sans ligne dans la matrice ne ferme pas. | Fermeture de l'element | BLOQUE |

### B3 - Etats, et ce que la personne voit quand quelque chose n'est pas la

La majorite des plaintes "ca ne marche pas" sont des ecrans qui n'ont pas su dire "il n'y a rien", "ca charge" ou "ca a echoue". Quatre etats, toujours, dans chaque liste et chaque ecran de detail.

| id | Enonce | Verifie | Severite |
|---|---|---|---|
| UX-17 | Chaque liste a les quatre etats resolus : avec donnees, vide, en chargement et en erreur. La vide distingue "il n'y a encore rien" de "votre recherche n'a rien trouve". | Cas manuel + revision | AVERTIT |
| UX-18 | Pendant qu'une chose prend du temps, on voit qu'elle travaille et on peut annuler si c'est long. Un bouton qui ne repond rien est la plainte numero un. | Cas manuel | AVERTIT |
| UX-19 | L'erreur dit ce qui s'est passe, ce qu'on peut faire et n'efface pas ce qui a ete saisi. Ni un code technique seul, ni un "une erreur est survenue". | Cas manuel | AVERTIT |

### B4 - Actions et erreurs

| id | Enonce | Verifie | Severite |
|---|---|---|---|
| UX-20 | Un ecran a une action principale evidente ; le reste est secondaire et y ressemble. | Cas manuel | AVERTIT |
| UX-21 | Chaque action destructive demande confirmation en nommant l'objet concerne, et quand c'est possible on defait au lieu de confirmer. | Cas manuel | AVERTIT |
| UX-22 | Un formulaire qui echoue conserve ce qui a ete saisi et marque le champ avec le probleme, a l'endroit du champ. | Cas manuel | BLOQUE |
| UX-23 | Aucune action ne laisse l'ecran sans sortie : apres avoir enregistre, supprime ou annule, la personne sait ou elle est et comment continuer. | Cas manuel | AVERTIT |

### B5 - Langue et accessibilite

| id | Enonce | Verifie | Severite |
|---|---|---|---|
| UX-24 | L'interface parle la langue du glossaire du projet : le meme objet s'appelle pareil a l'ecran, dans le manuel et dans l'e-mail. Un synonyme est un defaut. | Cas manuel + revision | AVERTIT |
| UX-25 | Tout se fait sans souris et avec un lecteur d'ecran dans les flux principaux ; le focus est toujours visible et ne se coince pas. | Barriere (CQ-18) + cas manuel | AVERTIT |
| UX-26 | Les etats ne se communiquent pas seulement par la couleur ; chaque image informative a un texte alternatif ; les textes se lisent en taille normale sans zoom. | Barriere (CQ-18) | AVERTIT |
| UX-27 | Chaque element en attente qui touche un ecran livre la capture reelle de l'environnement de test, et le proprietaire la regarde avant de fermer. La capture n'est pas optionnelle et ce n'est pas une maquette. | Fermeture de l'element | BLOQUE |

## 6. Ou cela s'accroche, et quels artefacts cela produit

L'annexe n'invente pas d'etapes nouvelles : elle s'accroche a celles qui existent. Cela evite de dupliquer les barrieres et evite le destin habituel des listes d'utilisabilite, qui est d'etre lues une fois.

**Ou elle va (D-043).** Elle est transversale aux quatre troncons, avec le poids principal sur la Boucle de Construction (etapes 5 a 12), qui est la ou l'on decide et l'on construit. Ce n'est pas une etape propre : une etape numerotee obligerait a renumeroter l'echelle, altererait le compte des etapes et soumettrait l'annexe a la traduction obligatoire des contrats dans les huit langues avant que la construction puisse passer au vert, sans ajouter aucune barriere que la boucle n'ait deja.

**Comment elle s'accroche (D-044).** Une source canonique, cinq ancres et deux entrees prealables. Le texte des regles vit seulement ici et les prompts le citent ; ils ne le copient jamais. Repeter les quarante-cinq regles dans les huit prompts de la boucle les dilue (elles rivalisent avec le travail de chaque etape et l'agent les obeit differemment chaque fois), les desaligne (deux copies du meme texte se desynchronisent toutes seules, ce qui est l'antipattern que l'etape 11 poursuit) et ne les rend pas plus transversales : ce qui rend une regle transversale, c'est que chaque bloc passe par la meme barriere, pas que la regle soit ecrite partout.

| Moment | Ce qui s'ajoute | Pourquoi la |
|---|---|---|
| **Entree prealable 1** - definition du perimetre | Le glossaire de l'utilisateur | Sans glossaire, UX-01 et UX-24 n'ont rien a quoi se comparer. |
| **Entree prealable 2** - definition du perimetre | La liste des profils | Sans la liste, la matrice de B2 s'invente a l'etape 5 et tout ce qui en derive nait sans base. |
| **Ancre 1** - etape 5 (le plan) | Chaque element en attente qui touche un ecran declare trois choses : a quel groupe de convergence il appartient (B1), quels profils l'ont et quels criteres d'acceptation sont par profil ("etant donne le profil X, la personne peut faire Y et ne peut pas faire Z"). Sans cette declaration l'element ne passe pas l'etape. | Ici *naissent* le regroupement et les profils : ce sont des decisions de planification, pas de code. C'est l'ancre au meilleur rendement et celle qui n'existe pas aujourd'hui. |
| **Ancre 2** - etape 8 (tests au rouge) | La matrice devient un test que l'on voit d'abord echouer : pour chaque profil, l'accessible contre sa ligne (UX-11, UX-12, UX-15). | Sans cela la matrice est un document que personne ne regarde. |
| **Ancre 3** - etape 9 (qualite) | Le catalogue CQ complet avec son adaptateur et ses seuils declares ; `docs/CODE_QUALITY.md` rend compte par regle, pas par un chiffre unique. Et la matrice comme barriere (UX-02, UX-03, UX-08, UX-09, UX-10, UX-16). | C'est le seul endroit ou le texte entre litteralement comme directive, et c'est la barriere qui tourne a chaque bloc avec cliquet. |
| **Ancre 4** - etape 10 (cas manuels) | Chaque cas s'execute **une fois par profil concerne**, derive de la matrice et non ecrit a la main. Un cas deroule avec un seul profil ne compte pas comme execute. | Les cas manuels sont la seule verification humaine de la methode ; s'ils ne s'ouvrent pas par profil, la moitie de B2 n'est jamais regardee. |
| **Ancre 5** - etape 12 (verification et rapport honnete) | Le rapport dit ce qui a ete mesure, ce qui est reste en avertissement et quelle regle est eteinte, avec son motif, son auteur et sa date de revision. | Zero dommage silencieux : un groupe eteint ne peut pas etre lu comme accompli. |
| Manuel utilisateur | Il s'organise par les groupes de B1 et declare, par groupe, quels profils entrent. | Le manuel et le menu se nomment avec les memes mots ou le glossaire se casse. |
| Fermeture de chaque bloc | Test du premier clic (UX-07), capture de l'environnement reel (UX-27) et les deux tests de bout en bout de la matrice. | Ce sont les trois verifications qui ne peuvent pas etre automatisees. |

**Etat (D-049).** Les cinq ancres sont deja accrochees : le prompt initial des etapes 5, 8, 9, 10 et 12 cite cette annexe dans les huit langues, avec une seule redaction anglaise identique dans toutes et sa traduction locale a cote. Le document est publie sur le site avec le reste de la methode, en espagnol ; la traduction existe aujourd'hui dans six des huit langues et son entree dans l'API de prompts attend les deux dernieres (D-043). Quand il entrera, `build/prompts.mjs` comparera le texte anglais octet par octet entre les huit versions et la construction echouera si l'une differe.

Les etapes 6, 7 et 11 recoivent au plus une ligne : la 6 enregistre deja les seuils et les exceptions comme decisions (c'est l'endroit naturel de l'exception declaree), et la 11 est la ou entre a coups le cas de la matrice ecrite a quatre endroits. On ne leur ajoute pas de texte propre pour ne pas les diluer.

Trois artefacts, tous dans `docs/` : `CODE_QUALITY.md` (etendu), `USABILITY.md` (nouveau, avec le resultat par regle et les exceptions declarees) et `PROFILE_MATRIX.md` (la matrice, qui est a la fois document et source du menu).

## 7. Configuration

Un seul fichier par projet declare la couche 2 et la couche 3. Exemple avec la forme proposee, pas avec des valeurs definitives :

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

Les deux zeros sont deliberes et c'est la partie qui compte : la couverture minimale est fixee par le cliquet avec ce qui a ete mesure, et l'objectif de mutation est fixe par le proprietaire quand le projet a des utilisateurs. S'ils sont a zero et que personne ne les a declares, la barriere le signale comme seuil non declare au lieu de l'inventer.

## 8. Les deux pieces, dans la forme que la methode utilise

**Qualite de code.**

> Set up and maintain the code-quality gate for this project, configured for its frontend family. The core rules are the same in every project; what changes is how each one is measured and at which threshold. Install one formatter and one linter with a single shared configuration; enforce size limits per file and per function, complexity per function, duplication, dead code, declared-and-used dependencies, type checking where the language allows it, coverage with a ratchet, and secret scanning. Where the project has real users, add mutation testing scoped to the changed lines and record the score per block. Then extend the gate to the frontend itself: no business rule inside a screen, one typed client for every server call, one home for shared state, no user-visible string outside the translation catalogue, a stable identifier and role on every interactive element, styling only through tokens, and automatic basic accessibility checks. Every rule has a stable id, a severity (blocks, warns, records) and a named verifier. Thresholds and exceptions are declared by the owner in one configuration file; a rule switched off without a written exception is a gate failure, not a decision. Report the result per rule in `docs/CODE_QUALITY.md`, not as a single number.

> [fr]
> Mettez en place et maintenez la barriere de qualite de code du projet, configuree pour sa famille de frontend. Les regles du noyau sont les memes dans tout projet ; ce qui change, c'est avec quoi on mesure chacune et a quel seuil. Installez un seul formateur et un seul linter avec une configuration partagee ; faites respecter des limites de taille par fichier et par fonction, la complexite par fonction, la duplication, le code mort, les dependances declarees et utilisees, la verification des types la ou le langage le permet, la couverture avec cliquet et l'analyse des secrets. La ou le projet a de vrais utilisateurs, ajoutez des tests de mutation limites aux lignes modifiees et enregistrez le score par bloc. Etendez ensuite la barriere au front : aucune regle metier dans un ecran, un seul client type pour tout appel au serveur, un seul endroit pour l'etat partage, aucun texte visible hors du catalogue de traductions, un identifiant stable et un role sur chaque element interactif, des styles uniquement par tokens et des verifications automatiques d'accessibilite de base. Chaque regle a un identifiant stable, une severite (bloque, avertit, enregistre) et un verificateur nomme. Les seuils et les exceptions sont declares par le proprietaire dans un fichier de configuration ; une regle eteinte sans exception ecrite est un echec de la barriere, pas une decision. Rendez compte du resultat par regle dans `docs/CODE_QUALITY.md`, pas comme un chiffre unique.

**Utilisabilite.**

> Build the usability criteria for this project before writing the first screen, and enforce them where the method already has hooks. Group functionality by what the person came to do, never by the internal module or the data entity: every menu group is named with a user job in the project glossary, every functionality has exactly one canonical home, no functionality is orphaned, and every group is reachable in no more than three steps from the entry screen. Then declare accessibility in one matrix and derive everything from it: each functionality lists the profiles that have it, each functionality has at least one profile, each profile has at least one functionality and its own entry point, the navigation is generated from the matrix instead of written by hand, and every route checks the permission on the server because hiding an entry is not protecting it. Verify the matrix per profile with an end-to-end check that compares what is reachable with the matrix row: neither less nor more. Require the four states on every list (with data, empty, loading, error), a visible working indicator with the option to cancel long operations, an error message that says what happened and what to do without losing entered data, a primary action per screen, confirmation or undo for destructive actions, and a form that keeps what was typed. Run each manual test case once per affected profile, run the first-click check at the close of every block, and require a real screenshot of the test environment on every item that touches a screen. Record the result per rule, with owner-declared exceptions, in `docs/USABILITY.md`, and keep the matrix in `docs/PROFILE_MATRIX.md` as the single source of truth.

> [fr]
> Etablissez les criteres d'utilisabilite du projet avant d'ecrire le premier ecran, et faites-les respecter la ou la methode a deja des accroches. Regroupez les fonctionnalites par ce que la personne est venue faire, jamais par le module interne ni par l'entite de donnees : chaque groupe du menu se nomme par un travail de l'utilisateur dans le glossaire du projet, chaque fonctionnalite a exactement une maison canonique, aucune ne reste orpheline, et chaque groupe est accessible en trois etapes au plus depuis l'ecran d'entree. Declarez ensuite l'accessibilite dans une seule matrice et derivez tout d'elle : chaque fonctionnalite enumere les profils qui l'ont, chaque fonctionnalite a au moins un profil, chaque profil a au moins une fonctionnalite et son propre point d'entree, la navigation est generee a partir de la matrice au lieu d'etre ecrite a la main, et chaque route verifie la permission cote serveur parce que cacher une entree n'est pas la proteger. Verifiez la matrice par profil avec un test de bout en bout qui compare l'accessible a la ligne de la matrice : ni moins ni plus. Exigez les quatre etats dans chaque liste (avec donnees, vide, en chargement, en erreur), un indicateur visible de travail en cours avec la possibilite d'annuler ce qui est long, un message d'erreur qui dise ce qui s'est passe et quoi faire sans perdre ce qui a ete saisi, une action principale par ecran, une confirmation ou un defaire pour les actions destructives, et un formulaire qui conserve ce qui a ete tape. Deroulez chaque cas de test manuel une fois par profil concerne, deroulez le test du premier clic a la fermeture de chaque bloc, et exigez une capture reelle de l'environnement de test sur chaque element qui touche un ecran. Enregistrez le resultat par regle, avec les exceptions declarees par le proprietaire, dans `docs/USABILITY.md`, et gardez la matrice dans `docs/PROFILE_MATRIX.md` comme source unique de verite.

## 9. Ce que cette proposition ne fait pas

- **Elle n'ajoute pas une etape.** Ce sont quarante-cinq regles transversales (18 de qualite et 27 d'utilisabilite), pas une nouvelle etape. Elles s'accrochent aux etapes qui existent.
- **Elle n'invente pas de score.** Un chiffre d'« utilisabilite 78 » ne dit pas quoi corriger et s'optimise dans la mauvaise direction. On rend compte par regle. La section 12 propose deux chiffres derives, mais ils sont un compte de regles avec son bordereau - pas une note de qualite ni d'utilisabilite - et ils n'autorisent a fermer quoi que ce soit.
- **Elle ne remplace pas le proprietaire.** Le test du premier clic, la capture et le test de tache restent humains : c'est le seul instrument qui distingue « ca marche » de « ca sert ».
- **Elle n'apporte pas de seuils d'usine.** Ceux de l'adaptateur sont un point de depart declare ; le projet qui ne declare pas les siens les herite et cela est enregistre comme tel.
- **Elle ne promet pas que la barriere detecte le mauvais regroupement.** Une machine peut verifier qu'il n'y a ni duplication ni orphelines ; si le groupe s'appelle « Gestion », il faut une personne pour le voir.

## 10. Les decisions : ce qui est regle et ce qui manque

### Reglees

| # | Decision | Registre |
|---|---|---|
| 1 | **Transversale a la Boucle de Construction, pas une etape propre.** On ne renumerote pas l'echelle, on n'altere pas le compte des etapes et l'annexe n'herite pas de l'obligation de traduire un contrat d'etape. | D-043 |
| 2 | **Une source canonique avec cinq ancres et deux entrees prealables,** au lieu de copier les quarante-cinq regles dans les huit prompts de la boucle. | D-044 |
| 3 | **Deux interrupteurs independants** (qualite et utilisabilite), trois etats par regle (bloque, avertit, eteinte), adaptateur par famille de frontend, seuils et exceptions declares par le proprietaire. | D-045 |
| 4 | **Discipline de l'interrupteur :** il vit dans la configuration du projet et non dans le prompt ; eteindre ne vaut que comme decision enregistree avec motif, auteur et date de revision ; l'extinction est observable dans le rapport ; et l'interrupteur se teste en allumant et en eteignant. | D-046 |
| 5 | **Severites initiales, fixees regle par regle :** en qualite quatorze bloquent (CQ-01 a CQ-06, CQ-08, CQ-11 a CQ-17), CQ-09 bloque la ou il y a de vrais utilisateurs, et trois avertissent (CQ-07, CQ-10, CQ-18). En utilisabilite onze bloquent (UX-02, UX-03, UX-08 a UX-12, UX-15, UX-16, UX-22, UX-27), UX-06 enregistre seulement et le reste avertit. Ni « tout bloque » - le projet ne demarre pas - ni « tout avertit » - l'heuristique est un ornement. | D-048 |
| 6 | **L'accessibilite commence par avertir et monte a bloquante par declaration du proprietaire** quand le produit a des utilisateurs finaux hors de l'organisation. Le defaut ne s'invente pas : la montee se declare, avec le meme mecanisme que tout seuil (D-045). | D-048 |

### Ferme dans D-048, et les deux corrections qu'elle porte

Les deux questions qui bloquaient l'ecriture des prompts sont deja repondues : la premiere est devenue la ligne 5 et la seconde la ligne 6. Mais la recommandation approuvee avait deux erreurs de fait, et elles sont ecrites ici pour qu'elles ne reviennent pas :

1. **Le defaut de comptage.** La ou cette annexe disait « vingt-sept regles », le nombre correct est **quarante-cinq** : 18 de qualite (CQ-01 a CQ-18) et 27 d'utilisabilite (UX-01 a UX-27). L'ancien chiffre venait d'un brouillon qui n'en comptait que la moitie. Corrige dans les sections 6 et 9 et note dans D-048 ; le texte de D-044 est conserve tel qu'il a ete ecrit, parce qu'une decision est un registre et ne se reecrit pas.
2. **Le formateur, le linter, la taille et la complexite ne se relachent pas.** Une version anterieure de cette recommandation les envoyait a « avertit » pour ne pas bloquer les projets avec de la dette heritee. Ce n'est pas possible : l'etape 9 les bloque deja aujourd'hui, et cette extension l'etend, elle ne la remplace pas. La dette heritee se resout par une exception declaree - avec motif et date de revision - ou par la ligne de base du cliquet, pas en baissant la severite de la regle.

Et une limitation declaree, parce que c'est la seule de son espece : **CQ-12 et CQ-14 bloquent avec un rouge humain.** Aucun outil ne prouve qu'un ecran ne decide pas de regles metier. Elles se verifient a la fermeture de l'element en attente, avec le cas manuel devant et le meme critere que UX-22 et UX-27 ; si le projet ne peut pas tenir cette fermeture, elles descendent a AVERTIT par decision enregistree. Une regle qui bloque et que personne ne verifie est pire qu'une regle qui avertit.

### Calendrier, pas decision

**La traduction.** Faite : l'annexe existe dans les huit langues et ses deux prompts font partie de l'API de prompts, identiques en anglais dans les huit versions (D-043 l'exige et `build/prompts.mjs` le fait respecter). Le texte espagnol reste le canonique : si jamais une traduction et l'espagnol se contredisent, l'espagnol gagne et la traduction se corrige dans la meme modification.

## 11. Comment on verifie que la barriere surveille

Une heuristique qui ne change rien quand on l'allume ou l'eteint n'est pas une barriere, c'est de la decoration. L'epreuve d'acceptation de l'implementation (PND-002) est un projet fixture avec des violations deliberees de chaque famille :

| Scenario | Resultat exige |
|---|---|
| Qualite allumee, avec violation | Rouge, en nommant la regle et le fichier ou se trouve la violation. |
| Qualite eteinte **avec bordereau** | Vert, et le rapport **dit** qu'elle est eteinte, depuis quand et qui l'a autorisee. |
| Qualite eteinte **sans bordereau** | Rouge. Eteindre sans motif ecrit est un echec, pas une absence de regle. |
| Utilisabilite allumee, avec un profil qui atteint trop | Rouge sur UX-12, avec le profil et la fonctionnalite nommes. |
| Utilisabilite allumee, avec une fonctionnalite sans ligne dans la matrice | Rouge sur UX-08 a la fermeture de l'element (UX-16). |
| Les deux groupes eteints | Vert dans les deux, avec les deux lignes d'extinction dans le rapport. |
| On plante une violation d'une regle qui **avertit** | Vert, et un element en attente s'ouvre qui nomme la regle et le fichier : avertir n'est pas approuver. |
| On plante une violation d'une regle qui **bloque** | Rouge, avec regle, fichier et remede nommes. Et il n'y a pas de tableau : la moyenne ne ferme pas les blocs. |
| Tableau : on eteint une regle **avec bordereau** | La conformite peut monter, mais la **couverture de la barriere baisse** et le chiffre se publie avec le bordereau qui l'explique. Avec un seul chiffre ce scenario passerait inapercu ; c'est la preuve que les deux chiffres existent pour une raison (D-047). |
| Tableau : deux executions avec des reglements differents | Les deux chiffres se montrent avec leur empreinte (version du catalogue, regles actives et eteintes, adaptateur, versions des outils) et **ne se tracent pas comme une serie continue** : ce sont deux mesures distinctes et le dire fait partie du resultat. |
| Tableau : reglement invalide (regle eteinte sans bordereau) | Il n'emet aucun chiffre. La sortie est rouge, pas un tableau avec un asterisque. |
| Tableau : conformite haute avec une regle qui bloque au rouge | Le bloc **ne ferme pas**. Le tableau fait la moyenne ; le vert est decide par chaque regle, une par une. |
| Tableau : le pourcentage monte en ne touchant qu'a l'automatique | Le pourcentage monte et la ligne de verification humaine ne bouge pas ; elle se rapporte a part et le rapport n'additionne pas les deux choses dans un chiffre unique. |

Ce que l'on regarde n'est pas seulement la couleur : on regarde que les deux lignes d'extinction **existent** dans le rapport. Un resultat vert sans cette ligne est le seul echec que cette epreuve ne peut pas detecter seule par la couleur, et c'est pourquoi on le verifie en lisant la sortie.

## 12. Le tableau de conformite (DECIDE : deux chiffres, D-047)

**Etat.** Decide le 2026-10-22 dans D-047 : le tableau va avec deux chiffres, avec l'empreinte du reglement, avec cliquet, avec l'humain hors du pourcentage et avec le bordereau obligatoire. Il n'autorise pas a fermer des blocs. Ce qui suit est la specification que l'implementation (PND-002) doit respecter.

**Ce qu'il est.** Un derive deterministe du resultat par regle que la barriere a deja emis. Il ne mesure rien de nouveau et ne juge rien de nouveau : il compte. Si le tableau pouvait changer le verdict d'une regle, il y aurait deux sources de verite pour la meme chose, ce qui est exactement ce que l'annexe combat en UX-10 (la navigation derive de la matrice) et en CQ-14 (un seul endroit pour l'etat).

**Ce qu'il n'est pas.** Ce n'est pas un critere d'acceptation. Aucun chiffre n'autorise a fermer un bloc : le vert ou le rouge est decide par chaque regle qui bloque, une par une. Le tableau decrit la tendance et montre quoi regarder. S'il commence a servir de seuil de fermeture, il cesse de servir, parce que le chemin le plus court pour faire monter un chiffre est d'eteindre des regles.

**Deux chiffres, jamais un.**

| Chiffre | Formule | Ce qu'il mesure | Comment il bouge |
|---|---|---|---|
| **Conformite** | regles qui passent / regles actives | a quel point ce que l'on regarde est propre | monte quand on corrige |
| **Couverture de la barriere** | regles actives / regles declarees au catalogue | quelle part de l'annexe surveille vraiment | baisse quand on eteint une regle |

La raison pour laquelle il y en a deux : eteindre une regle **fait monter** la conformite et **fait baisser** la couverture. Avec un seul chiffre, eteindre est gratuit et le tableau recompense l'aveuglement. Avec deux chiffres qui bougent en sens oppose, le raccourci disparait : pour montrer un meilleur tableau il faut corriger du code, pas eteindre des regles. Et la couverture ne peut pas monter sans mesurer.

**L'empreinte du reglement.** Chaque enregistrement garde avec quelle mesure il a ete calcule : version du catalogue, regles actives et eteintes, adaptateur de frontend et versions des outils. Sans cela, un 82 d'hier et un 91 d'aujourd'hui ne sont pas la meme mesure meme s'ils s'ecrivent pareil : ce sont deux reglements differents et la serie est fausse. Deux chiffres sans empreinte produisent une illusion de progres, ce qui est pire que de ne pas avoir de tableau. Si l'empreinte change, l'enregistrement est marque comme **non comparable** ou l'historique est recalcule avec la mesure en vigueur ; on ne les trace jamais ensemble sans le dire.

**Cliquet.** La conformite ne baisse pas d'un bloc au suivant sans une decision enregistree qui l'explique. C'est le meme mecanisme que la couverture de tests a deja en CQ-08 : le chiffre d'aujourd'hui est le plancher de demain. Baisser n'est pas interdit ; baisser sans enregistrement, si.

**Ce qui n'entre pas dans le compte.** Ce qu'une personne seule peut juger - le test du premier clic (UX-07), le test de tache (UX-06), la capture (UX-27) et tous les cas manuels - s'enregistre comme passe ou echoue, par bloc, avec nom et date, et se rapporte a part comme couverture de verification humaine. Il n'entre pas dans le pourcentage de conformite. Si on les melange, le resultat est un chiffre qui est soixante pour cent mesure et quarante pour cent opinion, et personne ne peut dire lequel est lequel. C'est pourquoi la section 9 tient toujours : le tableau n'invente pas une note d'utilisabilite, il compte des regles.

**Comment on le falsifie.** Il etend l'epreuve d'acceptation de la section 11 :

| Scenario | Resultat exige |
|---|---|
| On plante une violation d'une regle qui bloque | La conformite baisse d'exactement une regle sur les actives, et le rouge apparait avec la regle nommee. |
| On eteint une regle avec bordereau | La conformite peut monter ; la couverture baisse d'une regle sur les declarees ; le rapport nomme la regle, le motif et la date de revision. |
| On eteint sans bordereau | Rouge, et aucun tableau n'est emis : un reglement invalide ne produit pas de chiffres. |
| Meme arbre et meme configuration, deux executions | Le meme chiffre, identique. |
| La configuration change entre deux blocs | Les deux enregistrements sont marques comme non comparables, ou l'historique est recalcule avec la mesure en vigueur. |
| Le tableau sert de critere de fermeture | Usage impropre, pas un scenario valide : le vert est decide par la regle, pas par la moyenne. |

**Ou il apparait.** Dans le rapport honnete de l'etape 12 (ancre 5), et dans cet ordre : d'abord le verdict binaire de la barriere, ensuite les deux chiffres, ensuite ce qui est eteint et jusqu'a quand, ensuite le mouvement par rapport au bloc precedent avec sa cause nommee. Toujours avec le bordereau : *a baisse de quatre points : CQ-15, trois chaines hors du catalogue sur l'ecran d'encaissement*. Un chiffre sans bordereau est du bruit ; le bordereau est ce qui le rend actionnable pour un proprietaire qui ne lit pas de code.

**Risque declare.** Le tableau va etre lu par le proprietaire, qui ne lit pas de code, et c'est pourquoi il voudra qu'il monte. Le chiffre devient l'objectif, et l'objectif deplace le but. Les defenses sont celles du dessus, et il y en a cinq : deux chiffres qui se contredisent quand on eteint, l'empreinte qui empeche de comparer des mesures differentes, le cliquet qui ne laisse pas baisser sans enregistrement, l'humain hors du pourcentage et le bordereau obligatoire, avec la barriere qui ne se negocie pas a la moyenne. Si l'une des cinq tombe, le tableau s'eteint : un tableau mal utilise fait plus de degats que de ne pas en avoir.

## 13. Registre

Chaque decision de cette annexe reste dans `docs/DECISIONES.md` avec date, auteur, citation textuelle et fichiers d'impact : D-043 (forme), D-044 (mecanisme), D-045 (interrupteurs), D-046 (discipline de l'interrupteur), D-047 (le tableau a deux chiffres) et D-048 (severites initiales et le poids de l'accessibilite). L'implementation et ses criteres d'acceptation vivent dans PND-002 ; la traduction et l'indexation, dans PND-003.

Aucune decision ne reste ouverte : la forme (D-043 et D-044), les interrupteurs (D-045 et D-046), le tableau (D-047) et les severites initiales avec le poids de l'accessibilite (D-048) sont decidees. Le texte voyage dans les huit langues et fait partie de l'API de prompts, ce qui ferme le seul point qui restait au calendrier.
