# Urazuke, la méthode de la preuve — l'échelle méthodologique (version 3)

Conversation entre Pablo et Sumi, 17 octobre 2026 (version 1 le matin ; version 2 l'après-midi,
avec la thèse d'ouverture, les contrats d'échelon et le dépôt propre ; version 3 avec le nom, les
contrats enrichis, les prompts en anglais, le guide par taille de projet et le guide par outil).
C'est un document de travail : nous allons continuer à l'élaborer en plusieurs passes, donc rien de
ce qu'il dit n'est encore doctrine. C'est, simplement, le premier distillat honnête de ce que nous
avons réellement fait dans trois dépôts qui sont aujourd'hui en production, avec de vraies personnes
qui les utilisent.

Une remarque de style, parce que c'est important : ce document est écrit pour des personnes qui
n'ont pas vécu ces projets. C'est pourquoi il explique les choses calmement, répète quand il le
faut, utilise le langage de tous les jours, et comporte à la fin un **glossaire** avec chaque sigle
et chaque expression familière qui apparaît. Si à un moment vous tombez sur un mot étrange —
« cliquet », « verrou », « PND », « fail-closed » — allez au glossaire ; tout y est.

Ceci est la version française. L'espagnol est la source de vérité ; si les deux divergent, la
version espagnole prévaut et celle-ci est corrigée. Les prompts destinés au modèle sont identiques
dans toutes les langues.

## Le nom

**Urazuke** (裏付け) est un mot japonais qui désigne l'appui dont dispose une affirmation : ce qui
la soutient par derrière (littéralement, « la doublure du dos »). Le verbe *urazukeru* signifie
« étayer par des preuves ». Pablo l'a choisi le 17 octobre 2026 (« Allons-y avec Urazuke »), après
que la vérification des noms a écarté Hashigo, Kaidan et Shōko pour collision avec des entreprises
et des projets existants. Le nom ne se traduit pas ; le sous-titre, « la méthode de la preuve »,
si : *el método de la evidencia*, *the evidence method*, *o método da evidência*, *die
Nachweis-Methode*, *il metodo del riscontro*, 裏付けの方法, 验证方法. Dans ce document,
« l'échelle » est la structure de la méthode — ses seize échelons — et « Urazuke » est la méthode
entière.

## De quoi s'agit-il ?

Pablo l'a dit clairement : il ne veut pas enseigner un outil, il veut enseigner **la méthode**.
L'idée est que n'importe qui, avec n'importe quel outil d'intelligence artificielle capable de
programmer, puisse « vibecoder » (c'est-à-dire construire du logiciel en conversant avec une IA au
lieu de taper le code à la main) et que ce qui en sort soit robuste, prêt pour la production, et —
c'est là l'important — **sans que le propriétaire du projet ait à relire une seule ligne de code**.

Cela paraît ambitieux, et ça l'est. Mais nous avons quelque chose que presque personne n'a : trois
systèmes réels construits exactement ainsi et qui fonctionnent aujourd'hui avec de vrais clients. La
question n'est donc pas « est-ce possible ? » mais « qu'avons-nous fait, dans quel ordre, et
qu'est-ce qui, dans tout cela, a vraiment fait la différence ? ».

Cette échelle est la réponse à cette question. Et elle servira de base à trois choses : la
documentation de la méthode, la pratique que feront les élèves, et les manuels. Plus tard, nous
l'exporterons aussi comme un « flux d'exécution de projet » dans Forge, pour que l'outil guide la
méthode au lieu qu'on doive s'en souvenir.

## D'où vient tout cela (les sources)

J'ai relevé les trois dépôts en lecture seule, sans rien toucher :

- **`[dépôt yujin-forge]`** (l'outil Forge et, surtout, le lieu où la méthode est née) :
  1 090 commits entre le 10 mai et le 14 octobre 2026. On y trouve le document des standards de
  qualité (`docs/SQ.md`), les 31 doctrines dans `docs/doctrine/`, le registre des anti-patrons
  (`docs/GOTCHAS.md`), le papier où l'on a décidé de tuer l'équipe multi-agents
  (`docs/PAPER_SUMI_VS_AGENTIC.md`), les décisions gelées du directeur
  (`docs/DIRECTOR_DECISIONS_2026_06_04.md`), le plan du registre des éléments en attente
  (`docs/PENDING_REGISTRY_PLAN.md`) et le texte des règles SQ 1 à 9 que Forge injecte dans le
  cerveau à chaque tour (`src/chat/server.ts`).
- **`[dépôt Autorisations]`** (le premier système en production, pour une entité de santé) :
  469 commits entre le 11 juin et le 9 octobre, 641 éléments en attente et tous clos. Il comprend
  le document de conception initial, les leçons apprises sur le cloud de Google, plusieurs audits et
  les manuels.
- **`[dépôt Kikan]`** (le second système en production, le guichet omnicanal et les campagnes de
  l'Association) : 442 commits entre le 21 août et le 16 octobre, 37 tags, la série d'audits AUD-*,
  19 documents d'éléments en attente, le document de la réingénierie de la persistance
  (`docs/REINGENIERIA_PERSISTENCIA_SQL.md`, avec ses étapes E1 à E12 et la fameuse section 11.b),
  l'intégration continue et le déploiement, et les deux rapports de cette semaine (intégrité le
  14 octobre, qualité le 15).
- Ma propre mémoire des corrections que Pablo m'a faites au fil de ces mois (« compteur gardé »,
  « mesure l'hypothèse », « valide avec le journal », « regarde d'abord quelle version est
  publiée »).

**Sur les noms.** Les clients des deux systèmes en production sont anonymisés : nous les appelons
« la Mutuelle » (avec son « Autorisateur ») et « l'Association », et leurs systèmes
« Autorisations » et « Kikan ». Les chiffres, les dates et les commits sont réels ; les noms des
organisations restent réservés jusqu'à obtention de leur permission. Les chemins locaux des dépôts
d'origine apparaissent comme `[dépôt …]`.

Une convention qui vaut pour tout le document : **chaque affirmation cite le commit ou le document
où se trouve la preuve**. Et quand quelque chose est mon interprétation et non un fait vérifié, je
le marque avec l'étiquette `[hypothèse]`, pour que ce qui est prouvé et ce que je propose se
distinguent au premier coup d'œil.

## L'IA n'interrompt pas la méthode : elle la continue

C'est la thèse qui ouvre le document, et nous la mettons en premier parce qu'elle désamorce
l'objection la plus courante avant qu'elle n'apparaisse : « comment vas-tu faire confiance à du
code écrit par une machine ? ».

La réponse est que **l'industrie a cessé de faire confiance à l'auteur du code il y a vingt ans**.
Quand le gros de l'écriture est passé à des équipes juniors, externalisées ou tournantes, la
relecture ligne par ligne est devenue impossible à tenir. Et ce qui a grandi à sa place, c'est tout
ce que nous tenons aujourd'hui pour acquis : les tests automatisés, l'intégration continue, les
critères d'acceptation, les pipelines qui ne laissent rien passer sans vert, le « shift left » des
tests, le contrôle qualité comme fonction indépendante. Ce fut la réponse de l'ingénierie des
systèmes à « celui qui écrit n'est pas fiable » : ne pas lire son code, lui exiger des preuves.

Mettre un modèle d'intelligence artificielle à écrire n'est donc pas un saut dans le vide. C'est
remplacer un auteur en qui nous n'avions déjà plus confiance par un autre en qui nous n'avons pas
confiance non plus, et pour lequel **nous avions déjà construit l'appareil de vérification**. Cela
devrait rassurer, pas inquiéter. Et en plus le nouvel auteur est moins cher, plus rapide, et — à la
différence du junior — ne se vexe pas quand on lui demande de prouver en rouge.

C'est pourquoi cette méthode s'appuie, sans le cacher, sur l'ingénierie des systèmes classique. Le
squelette est celui de toujours : relevé, exigences, dimensionnement, conception, construction,
test, déploiement, exploitation, audit. Il ne pouvait en être autrement, parce que les problèmes
sont ceux de toujours : ne pas savoir combien de données il y aura, ne pas savoir ce que veut le
client, ne pas savoir si ce qui a été construit est ce qui a été demandé. L'IA n'a pas changé les
problèmes ; elle a changé qui fait chaque partie et à quel coût. Même le critère d'éligibilité X2
(voir échelon 0) est de l'ingénierie classique : la testabilité comme condition du contrat.

### Ce qui est ancien et ce qui est nouveau là-dedans

L'ancien, qu'il vaut mieux dire ancien : le squelette d'étapes, l'indépendance de celui qui vérifie
par rapport à celui qui construit, les tests comme preuve, la documentation comme partie du
produit, le relevé avant la conception.

Ce qui change vraiment, et c'est là que se trouve notre part, ce sont trois choses :

1. **Où va l'effort de l'humain.** Dans la méthode classique l'humain écrit la spécification, écrit
   le code, et un autre humain le relit. Ici l'humain ne fait que deux choses : **il décide, et il
   vérifie des artefacts**. Tout le reste — rédiger, construire, tester, mesurer, documenter —
   c'est le modèle qui le fait. C'est pourquoi chaque échelon se termine par une « vérification de
   complétude sans lire de code » : c'est l'endroit exact où l'humain reste indispensable, et aucun
   autre.

2. **L'auteur fabrique aussi la preuve.** C'est le seul point véritablement nouveau, et c'est la
   nuance qui justifie trois échelons entiers. Le junior écrivait du code douteux, mais ne
   fabriquait pas la preuve : les tests et les mesures étaient montés par quelqu'un d'autre, ou du
   moins quelqu'un d'autre les regardait. Le modèle, lui, produit le code *et* le test *et* le
   compteur *et* le rapport, dans la même session, avec la même assurance dans la voix quand il a
   raison et quand il a tort. Nous l'avons vu : le compteur qui a menti deux fois, l'erreur
   d'authentification rapportée comme « succès », les trois affirmations sur quatre qui étaient
   fausses. Donc « relire la preuve plutôt que le code » reste le bon principe, mais **la preuve
   doit se prouver elle-même** : le test vu en rouge (échelon 7), l'instrument avec sa garde
   (échelon 9), le rapport qui sépare le vérifié du supposé (échelon 10), l'auditeur différent du
   constructeur (échelon 11). Ce n'est pas une inquiétude nouvelle : c'est la même discipline
   d'indépendance du contrôle qualité, portée un cran plus loin.

3. **Le coût des artefacts.** Dans la méthode classique la documentation coûtait cher, donc on la
   faisait une fois et elle vieillissait. Ici la régénérer est gratuit, donc la règle devient « dans
   le même commit » et « reproductible à la main, sans IA ». Ce qui était un idéal inatteignable
   devient une porte.

Pour le cours et pour la présentation publique, cela définit le positionnement avec honnêteté : ce
n'est pas « la nouvelle façon de programmer » ; c'est **l'ingénierie des systèmes appliquée à un
constructeur qui ne se fatigue pas et qu'on ne peut pas croire**. À ceux qui viennent des systèmes,
cela paraît familier et abaisse leur méfiance (« ça, tu sais déjà le faire ») ; à ceux qui viennent
du vibecoding, cela donne ce qui leur manque, qui est justement le squelette. Et cela nous
différencie des outils qui vendent de la vitesse et omettent le squelette entier.

---

## Partie A — Relevé : les moments et les jalons qui ont compté

### A.1 yujin-forge : là où la méthode est née (mai à octobre 2026)

Il y a quelque chose de fondamental à dire d'emblée, parce que cela change la lecture de tout le
reste : **la méthode n'a pas été conçue d'abord et appliquée ensuite**. Ce fut l'inverse. Chaque
règle a été écrite *après* un coup dur, dans le même dépôt où ce coup dur a été vécu, et souvent le
même jour. Aucune doctrine n'est née dans l'abstrait, dans une réunion devant un tableau blanc.
Toutes ont un incident derrière elles et un commit de naissance. C'est, je crois, la chose la plus
honnête et la plus précieuse que nous ayons à raconter.

Voici la séquence, dans l'ordre :

| Date | Moment | Ce qui a changé dans la méthode | Preuve |
|---|---|---|---|
| 25 mai | Naissance des SQ (les standards de qualité) | C'est le premier « contrat de collaboration » entre l'humain et l'agent. Il dit des choses comme : le temps de l'humain est sacré ; pas de dette technique (ce qui casse se répare à la racine) ; tout en ASCII ; la documentation toujours à jour ; et le périmètre exact, ni plus ni moins que ce qui a été demandé. | `2219f7a docs: add SQ.md` |
| 27 mai | Premier registre GOTCHAS | Les erreurs qui se répètent commencent à être notées dans un format fixe : comment ça sent, quelle est la cause racine, comment ça a été corrigé, et comment le détecter la prochaine fois avant que ça fasse mal. | `73f4029` (gotchas doc) |
| 2 juin | Portes (gates) et G-DOC, injectées seulement quand elles s'appliquent | Les portes explicites du flux de travail apparaissent, numérotées G1 à G9. Et un détail intelligent : la doctrine entre dans le prompt de l'agent seulement au moment où elle s'applique, pas toujours, pour ne pas gaspiller de contexte. | `5b47475` |
| 4 juin | Reformulation de la politique de test | Jusque-là on insistait sur « le test d'abord, le code ensuite » (TDD) pour tout. On découvre que ça ne marche pas universellement : par défaut les tests viennent *après* l'implémentation, le TDD reste une option pour les périmètres petits et bien définis, le squelette doit être au vert comme porte, et on ajoute une protection contre les boucles (quand l'agent tourne en rond sans avancer, une modale arrête tout). | `a9f59c7`, `docs/doctrine/testing-policy.md` |
| 4 juin | Les décisions du directeur sont gelées | Avant un sprint, trois décisions s'écrivent et se numérotent (D1, D2, D3). Ici naît la pratique « la décision s'écrit avant de construire ». | `docs/DIRECTOR_DECISIONS_2026_06_04.md` |
| 5 juin | REFONTE : on tue l'équipe multi-agents | C'est un moment énorme. Il y avait une équipe de cinq agents (directeur, analyste, programmeur, testeur, monteur de squelettes) qui se passaient le travail. On a fait une expérience mesurée : cette équipe a dépensé 60 dollars et 73 minutes et a livré quelque chose d'à moitié fait ; une seule session avec un seul agent a pris 90 minutes et a livré quelque chose de publiable. On a supprimé l'équipe entière. C'est le premier cas de « rétrospective avec un chiffre en main, et refonte ». | `7584f8b`, `docs/PAPER_SUMI_VS_AGENTIC.md` |
| 6 juin | Registre des éléments en attente | Le plan de travail devient LA liste des éléments en attente : une file canonique, avec des commandes pour la gérer, rafraîchie à chaque session. Il n'y a plus de « plan » d'un côté et de « tâches » de l'autre. | `4fc82c6`, `docs/PENDING_REGISTRY_PLAN.md` |
| 10 juin | Doctrines obligatoires + honnêteté de vérification + types de flux | La doctrine cesse d'être facultative : elle va comme bloc obligatoire dans chaque prompt. Naît l'« honnêteté de vérification » : vérifier que le filet passe vraiment au rouge quand il le doit, déclarer les angles morts, et faire des affirmations proportionnées à ce qui a été vérifié. Et on sépare trois types de flux : projet nouveau (greenfield), correction, et évolution. | `7ab9d8a`, `2c552c0`, `docs/doctrine/verification-honesty.md`, `workflow-kinds.md` |
| 14 au 21 juin | Pilotes automatiques de 24 et 48 heures | L'agent travaille seul pendant un jour ou deux sous un mandat écrit : commit et push par pièce, sans demander, et l'humain reçoit un résumé. On prouve que la méthode tient sous une autonomie longue. | mémoire `feedback_autopilot_mandate`, `project_autonomous_multisession_interrupt` |
| 5 et 10 juillet | Échelle de concurrence et mode diagnostic | L'agent entre dans des systèmes en production d'autrui en mode diagnostic : lecture seule, borné, sans rien toucher. | `docs/doctrine/diagnostic-mode.md` |
| 22 juillet | Durcissement de la performance | On extrait des patrons de montée en charge du système de la Mutuelle (par exemple celui des deux transactions ; et « mesurer avant de toucher »). Pour la première fois la méthode se nourrit d'un système déjà en production. | `873339c` |
| 14 août | Forge Embed vivant dans la production de la Mutuelle | L'agent devient RÉSIDENT dans le système du client : avec une carte du système obligatoire, avec la règle « la solution opérationnelle d'abord », et avec la capacité d'ouvrir des tickets. | la mémoire de l'assistant résident en production |
| 10 et 11 octobre | Mode exploitation + dimensionnement (G9) | On dimensionne avant de construire, en choisissant parmi des options fixes, et le dimensionnement est enregistré comme une porte de plus. | `c602725`, `0bd1b05`, `docs/doctrine/sizing.md` |
| 13 octobre | Interface de persistance | Une décision « asymétrique » (elle coûte peu si vous vous trompez, énormément si vous ne la prenez pas) : l'interface avec la base de données est asynchrone dès la ligne un, même si le premier moteur est synchrone. La changer plus tard a coûté une étape entière de la réingénierie (E6 : trois batteries de tests). | `7391cc5`, `docs/doctrine/persistence-interface.md` |
| 14 octobre | Le tour orphelin de 1 h 43 → version 1.18.0 | Un échec de la méthode, et bien laid : l'agent a travaillé une heure quarante-trois invisible pour l'humain, et a fait six commits pendant ce temps. Corrigé à la racine : un chien de garde du silence, une laisse entre processus, et 28 tests. | `b80a659`, CHANGELOG 1.18.0 |

Que lit-on dans ce tableau ? Qu'en cinq mois la méthode est passée de « règles de courtoisie »
(les SQ, qui sont presque des règles de savoir-vivre) à des « portes mesurées » (dimensionnement,
budget de requêtes, honnêteté de vérification). Et que chaque échelon a une date de naissance et un
coup dur qui l'a justifié. C'est ce qui le rend enseignable : ce n'est pas de la théorie, c'est de
la cicatrice.

### A.2 Autorisations : la méthode sous charge réelle (juin à octobre 2026)

Ce fut le premier système avec de vrais utilisateurs, de l'argent en jeu et des données de santé.
Ce sont 641 éléments en attente, tous clos. Et ici quelque chose de différent s'est produit : la
méthode a appris à **exploiter**, pas seulement à construire. C'est une chose qu'un système
fonctionne quand c'est vous qui le testez ; c'en est une autre qu'il continue de fonctionner à trois
heures du matin avec un robot qui approuve des commandes.

| Date | Moment | Ce qu'il a apporté | Preuve |
|---|---|---|---|
| 11 juin | Démarrage avec un document de conception (l'« option C ») | Il y a eu une spécification initiale. Et le dépôt l'a « dépassée » très vite : ce qui a été construit était bien plus que ce que disait le papier. Leçon : la spécification vaut comme point de départ, mais le plan vivant, ce sont les éléments en attente. | le document de conception initial |
| 23 juin | Audit des requêtes sans index | Le premier audit des « full scans » (requêtes qui lisent la table entière parce qu'il n'y a pas d'index) sur un système vivant. Et les constats deviennent des éléments en attente, pas un rapport qu'on archive. | document d'audit du 23 juin |
| 24 juin | Leçons apprises sur le cloud de Google | Les erreurs d'infrastructure s'écrivent comme des leçons pour ne pas les répéter. | document des leçons GCP |
| 26 juin | Manuel utilisateur | Le manuel naît avec le système, pas à la fin quand personne ne se souvient de rien. | manuel du 26 juin |
| 13 juillet | Sauvegarde de seconde couche | Deux couches de sauvegarde avant de faire confiance au système : une locale et une autre dans le stockage de Google. | commit sauvegarde couche 2 |
| 14 juillet | La saga du PND-300 (quatre tours de cause racine) | Un bug revenu trois fois jusqu'à ce qu'on trouve la vraie cause. Ici « le correctif est à la racine ou ce n'est pas un correctif » cesse d'être une belle phrase et devient une pratique obligatoire. | PND-300 |
| 16 juillet | Audit de sécurité | La sécurité se traite comme un audit périodique qui génère des éléments en attente, pas comme une liste de contrôle cochée une fois au début. | document d'audit du 16 juillet |
| 26 et 29 juillet | Manuel interne RPAForce + manuel de reprise après sinistre | Tout l'opérationnel (déployer, restaurer, maintenir) est documenté de façon « reproductible à la main, sans IA ». Si demain il n'y a pas d'agent, une personne peut suivre le manuel. | `6444ce6 (pnd442)`, `a30cee3 (pnd459)` |
| 27 juillet | Le « fail-closed » comme réflexe | Si une table n'existe pas ou qu'une recherche échoue, la ligne reste simplement sans son bouton ; jamais le listage entier ne casse. En cas de doute, ne pas agir et ne pas casser. | `e18406d (pnd452)` |
| 6 et 7 août | Compteurs vérifiés contre la production (1 355 contre 1 234) | C'est, pour moi, l'exemple le plus complet de « vérifier avec un instrument ». Un compteur affichait 1 355 approbations et la requête en affichait 1 234. La cause racine a été vérifiée directement sur la production (en lecture seule), la différence a été décomposée chiffre par chiffre (145 de trop, 24 de moins, 145 − 24 = 121), un test a été écrit et prouvé en ROUGE contre l'ancien critère, et le script de diagnostic est resté dans le dépôt pour la prochaine fois. | `ab3e529 (pnd517)`, `1f5feb9 (pnd514)` |
| 6 août | Symétrie producteur/consommateur en direct | La « raison d'attente » que voit l'utilisateur se calcule avec les MÊMES portes que celles avec lesquelles le robot décide (règle SQ 7) ; et la liste des colonnes est définie par le serveur et consommée par le frontend. Ainsi elles ne peuvent pas diverger. | `50fe968 (pnd510)`, `7251129 (pnd509)` |
| 7 août | Bouton de panique avec verrou dédié | Verrous : double sécurité, mode à blanc (dry-run) de l'approbateur automatique, un veilleur qui pousse avec des gardes. | `0954740 (pnd524)` |
| 10 août | Règles métier écrites dans le commit | Textuellement : « règle Pablo : approuvée + solde = retour », « décision Pablo 2026-08-10 ». La décision métier reste avec date et propriétaire, collée au code qui l'implémente. | `0ae3ae6 (pnd550)` |

Que lit-on ici ? Que dans ce dépôt la méthode a gagné ses échelons OPÉRATIONNELS : le fail-closed,
les verrous, les sauvegardes, les manuels qu'une personne peut suivre sans IA, les audits
périodiques, et la vérification contre la production avec un instrument et non à l'œil.

### A.3 Kikan : la méthode mûre (août à octobre 2026)

Le second système en production, et le premier construit avec tout ce qui précède déjà écrit dès le
premier jour. Ici apparaissent les échelons de **mesure** et d'**intégration et déploiement
continus** : c'est le dépôt où, pour la première fois, mesurer vient systématiquement avant
construire.

| Date | Moment | Ce qu'il a apporté | Preuve |
|---|---|---|---|
| 21 août | Démarrage | Le projet démarre avec un `CLAUDE.md` opérationnel (le fichier que l'agent lit en commençant) et avec les éléments en attente comme plan dès le premier jour. | premier commit |
| 28 et 29 août | Série d'audits AUD-* → 19 documents d'éléments en attente | Un audit systématique précoce qui se convertit directement en plan de travail. | documents PND des 28 et 29 août |
| 28 août | Intégration continue (CI) | Les tests tournent sur GitHub dès la première semaine. | `ci.yml` |
| 23 et 24 septembre | Déploiement + configuration uniquement sur le serveur + Node 22 figé | Le déploiement est un paquet ; la configuration vit dans l'environnement, pas dans le dépôt ; et la version du runtime est figée. | `deploy.yml`, `bb801ed` |
| 30 septembre au 4 octobre | Le déploiement se durcit à coups d'éléments en attente | L'URL publique dans les deux environnements ; recharger le service avant de redémarrer et avant de revenir en arrière ; un fixture qui RÉCONCILIE au lieu de dupliquer ; le matériel du client hors de l'arbre miroité. Cinq éléments en attente d'affilée sur le même sujet : le déploiement découvert tard fait payer son prix. | `f85c3c9`, `513c8d0 (PND-108)`, `076df76 (PND-134)`, `9d76af8 (PND-130)` |
| 3 octobre | Isoler la configuration | La batterie de tests ne salit plus la configuration qui voyage dans le déploiement. | `0bd20a8 (PND-107)` |
| 4 et 8 octobre | Promotion de UAT vers PROD | Un circuit explicite pour passer configuration et campagnes de l'environnement de test à celui de production. | `4eb5ad7 (PND-027)`, `7658e2e` |
| 11 octobre | RÉINGÉNIERIE, étape 1 : le schéma dérivé du CODE, avec verrou | L'inventaire des tables et des champs se dérive du code lui-même, avec un test qui le protège, et s'ouvre sur le tableau (le tableau partagé avec Pablo). | `6113319`, `68819ce` |
| 11 au 13 octobre | Étape 6 : le cliquet statique, trois batteries passées en asynchrone | Le « cliquet » est un compteur d'appels à la base sans `await` (sans attendre le résultat), qui ne peut que descendre, jamais monter. Et il s'est passé quelque chose de formidable à raconter : on a découvert DEUX fois que le compteur ne voyait pas des parties du code (70 appels, puis 84, avec le compteur à zéro). | `06b2734`, `f6e5221`, `2fc6239`, `1d55a93` |
| 13 octobre | Des compteurs qui mentaient | Textuellement d'après les commits : « le compteur de E7.5 mentait sur une base avec l'ALTER déjà appliqué » ; « il y en a 44, pas 27 ». La méthode apprend quelque chose de nouveau : **l'instrument aussi doit être vérifié**. | `880ac0f`, `f955620` |
| 14 octobre | Étape 8 : l'interrupteur, le budget de requêtes et la garde de réentrée | Le changement de moteur de base de données est un interrupteur par environnement ; chaque chemin de l'application a un budget de requêtes mesuré et protégé par un test. | `5926b3f`, `10ada00` |
| 14 octobre | Étape 9 : le plafond se resserre sur la mesure (63 sur 60) | Le budget n'est pas un chiffre inventé : c'est ce qui a été mesuré plus une petite marge. | `0730082`, `7f5f1af` |
| 14 octobre | Section 11.b : les cinq règles | Compteur gardé ; construire l'instrument s'il n'existe pas ; auditer dans les deux sens ; marquer l'approximatif ; et celui qui exécute vérifie celui qui a planifié. Avec une phrase qui dit tout : « trois affirmations sur quatre étaient fausses ; là où il y avait un instrument, exact ». | `docs/REINGENIERIA_PERSISTENCIA_SQL.md` 11.b |
| 14 octobre | Étapes 10 et 12 + intégrité externe | Le VRAI paquet apporte les scripts de migration ; la rétention des données se déclare par table et se borne en production ; et un rapport d'intégrité fait par un tiers (moi, Sumi) que Forge absorbe comme éléments en attente. | `f72b15a`, `b266f11`, `INTEGRIDAD_..._10_14.md` |
| 14 octobre | Le déploiement ne fait qu'empaqueter (gate-ci) | Les tests tournent UNE seule fois (en CI) ; le déploiement attend ce résultat et empaquette. De 16 à 27 minutes par commit, à 11. | `39497b0` |
| 15 octobre | PND-223 retirée en 24 heures / PND-257 | Deux portes d'administrateur ont été créées en une seule journée. Une relecture externe l'a détecté ; on en a retiré une et il est resté une voie unique. La méthode supporte « défaire vite » sans drame. | `69bdab2`, `20fdbe7`, `1558ee4` |
| 15 octobre | Audit de qualité | Des notes par dimension ; une vulnérabilité connue dans une dépendance ; un composant de 2 679 lignes ; un `CLAUDE.md` de 9 661 lignes. Intrant pour le prochain plan. | `AUDITORIA_CALIDAD_CODIGO_2026_10_15.md` |

Que lit-on ici ? Que Kikan est le premier dépôt où la MESURE précède la construction de façon
systématique (dimensionnement, cliquet, budget), et où le déploiement et l'intégration continue sont
traités comme une partie du produit et non comme une formalité.

### A.4 Les patrons qui se répètent dans les trois dépôts

Si l'on regarde les trois dépôts ensemble, il y a dix choses qui apparaissent encore et encore. Ce
sont, au fond, la méthode :

1. **Coup dur → règle écrite le jour même.** Aucune doctrine n'est née dans l'abstrait. Chacune a un
   commit de naissance et un incident derrière.
2. **Le plan, ce sont les éléments en attente.** Des éléments numérotés (PND-nnn) dans les trois
   dépôts ; la spécification est le point de départ, la file des éléments en attente est la vérité.
3. **La décision s'écrit à côté du code, avec propriétaire et date.** « Règle Pablo », « décision
   Pablo 2026-08-10 », les décisions du directeur, et dans Kikan la « décision par omission » (quand
   Pablo n'a pas répondu et que l'agent a choisi, il l'a laissé marqué comme tel).
4. **Le test se prouve en rouge.** Il ne suffit pas qu'il soit au vert : il faut démontrer que le
   test échoue contre l'ancien code. Si vous ne l'avez jamais vu rouge, vous ne savez pas s'il
   prouve quelque chose.
5. **Mesurer avec un instrument, et vérifier l'instrument.** Un script avec test qui voyage dans le
   dépôt ; le compteur a menti deux fois et on a corrigé le compteur avant le code.
6. **Fail-closed et verrous.** Rien ne casse en silence ; en cas de doute, ne pas faire.
7. **Audit périodique → éléments en attente.** Full-scan en juin, sécurité en juillet, AUD-* en
   août, intégrité et qualité en octobre. L'audit n'est pas un rapport : c'est du plan.
8. **Documentation et manuels naissent avec le système**, et s'entretiennent dans le même commit
   que le changement.
9. **L'agent exploite à l'intérieur du système** (diagnostic → exploitation → résident) avec des
   permissions bornées et des approbations ; l'humain approuve, il ne tape pas.
10. **Rétrospective chiffrée → refonte.** L'équipe multi-agents a été tuée avec 60 dollars et
    73 minutes contre 90 minutes ; le déploiement a été scindé avec 16-27 minutes contre 11 ; et
    cette échelle elle-même est exactement cela.

Et maintenant les échecs, parce que sans eux ceci serait de la propagande et non un relevé : le tour
orphelin d'une heure quarante-trois (14 octobre) ; une erreur d'authentification rapportée comme
« succès » ; deux portes d'administrateur en 24 heures ; 23 pushes en un jour qui ont brûlé le quota
de GitHub Actions ; la clé de la base de données imprimée dans une transcription ; un `CLAUDE.md`
devenu un historique de 9 661 lignes ; l'application mobile de Forge qui perd ses onglets ; et les
compteurs qui ont menti deux fois. Tout cela est arrivé. Et tout cela est dans l'échelle, parce que
c'est de là que viennent les échelons.

---

## Partie B — L'échelle, version 3

### Comment lire chaque échelon

Chaque échelon a sept parties, toujours les mêmes, pour qu'on puisse les comparer :

- **Intention** : ce qu'il cherche, en une phrase.
- **Entrées** : ce qui doit exister avant pour pouvoir le gravir.
- **Artefact** : ce qui reste écrit ou exécutable une fois gravi. Toujours quelque chose de
  concret : un fichier, un test, un script.
- **Porte** : ce qui doit être vrai pour passer au suivant. Si ce n'est pas rempli, on ne monte
  pas.
- **Qui décide** : le propriétaire du projet, l'agent, ou personne parce que c'est automatique.
- **Échec qu'il évite** : le coup dur réel qui l'a originé. C'est ce qui le rend crédible.
- **Preuve** : le commit ou le document où il se trouve.

Deux précisions importantes. Premièrement : **l'échelle est neutre vis-à-vis de l'outil**. Chaque
artefact est un fichier, un test ou un script ; aucun n'exige Forge. Forge les automatise (les
portes, les commandes, le registre des éléments en attente), mais l'échelon existe sans Forge.
Deuxièmement : **les échelons ne sont pas strictement séquentiels**. Il y a trois phases : ceux de
0 à 4 sont de démarrage et se gravissent une fois par projet ; ceux de 5 à 10 sont la boucle qui se
répète à chaque changement ; et ceux de 11 à 15 sont d'exploitation, quand le système est déjà
vivant. Le 15 ferme le cycle et revient au 0 pour le projet suivant.

### Comment s'exécute chaque échelon : le contrat

La fiche en sept parties dit ce que cherche chaque échelon et ce qu'il laisse. Mais un échelon ne se
comprend pleinement que lorsqu'on voit **comment on le demande, ce qui doit revenir et comment je
sais que c'est revenu complet**. C'est pourquoi chaque échelon a, en plus de la fiche, un
**contrat** dans un fichier propre dans `peldanos/`, toujours avec les mêmes cinq sections :

1. **Contexte requis** — nommé de façon générique (« relevé des données de volumétrie », « accès
   en lecture au système antérieur », « la liste des actions à conséquence réelle »), sans
   descendre dans le détail de l'ingénierie des systèmes. Les relevés sont par nature incomplets ;
   nous n'essayons pas de les rendre complets avec un formulaire.
2. **Prompt(s)** — ce que l'on donne au modèle, textuellement. L'initial et, quand l'échelon est une
   conversation, celui de clôture. Tous portent la même clause, qui est le cœur de l'affaire : *le
   modèle évalue si le contexte suffit ; s'il ne suffit pas, il demande tout ce qui manque avant de
   continuer ; et il n'estime ni n'invente une donnée que seul le métier possède*. Celui qui sait ce
   qui lui manque pour calculer, c'est le modèle, pas un formulaire.
3. **Résultat attendu** — les caractéristiques détaillées de l'artefact : quel fichier, quelles
   sections, ce que chacune doit contenir, ce qui ne peut pas manquer.
4. **Vérification de complétude** — la liste des vérifications que fait le propriétaire sur
   l'artefact, **sans lire de code**. Si l'une donne « non », l'échelon n'est pas gravi.
5. **Signaux d'alarme** — deux ou trois symptômes qui montrent que l'échelon a été mal gravi même
   s'il semble gravi. Ce sont ceux qu'on voit des semaines plus tard, quand ça fait déjà mal.

Et dans l'en-tête de chaque contrat, en plus de la phase et de la forme, la **taille** : si
l'échelon est obligatoire dans tout projet ou proportionnel, et ce que « proportionnel » signifie
dans un petit.

**Les prompts sont en anglais.** C'est une décision (D-013) et elle a trois raisons : le même
contenu en espagnol occupe entre 30 et 50 % de jetons en plus ; la capacité des modèles à suivre
des instructions est mieux calibrée en anglais, donc un prompt en anglais tolère mieux la brièveté
sans devenir ambigu ; et le vocabulaire du métier (test, commit, rollback, mock) est anglais. Sous
chaque prompt vient l'explication, dans la langue du lecteur, de ce que nous demandons et pourquoi
chaque clause est là : le prompt est une pièce unique identique dans les huit versions du document ;
l'explication est ce qui se traduit. Et tous se terminent par « Reply in my language », parce que
le prompt est en anglais mais la conversation n'a pas à l'être.

Ces seize contrats sont, en outre, ce qui sera ensuite exporté vers Forge : aujourd'hui Forge
injecte une doctrine quand on franchit une porte ; le contrat de l'échelon *est* cette doctrine, et
le prompt *est* ce qui s'injecte. Les écrire pour le cours et les écrire pour le flux de Forge est
le même travail.

### Ce qui est obligatoire et ce qui est proportionnel, selon la taille du projet

Une question qui surgit aussitôt : « tout ça pour un petit système ? ». La réponse est que seize
échelons ne sont pas seize semaines ; plusieurs se gravissent en une heure, et ceux qui sont
proportionnels rétrécissent avec le projet. Ce qui ne rétrécit pas, c'est la liste de ceux qui ne
se négocient pas. Ce tableau est une proposition `[hypothèse]` à confirmer avec le premier projet
qui utilisera la méthode de bout en bout :

| Échelon | Petit projet (un propriétaire, peu d'utilisateurs, pas d'argent en jeu) | Projet avec utilisateurs et conséquences |
|---|---|---|
| 0 Éligibilité | obligatoire (une heure) | obligatoire |
| 1 Contrat | obligatoire (une demi-heure) | obligatoire |
| 2 Définition | obligatoire, cinquante lignes suffisent | obligatoire |
| 3 Dimensionner | obligatoire, une demi-page et une décision | obligatoire, complet |
| 4 Squelette | obligatoire s'il aura des utilisateurs | obligatoire |
| 5 Éléments en attente | obligatoire | obligatoire |
| 6 Décisions | obligatoire | obligatoire |
| 7 Tests en rouge | obligatoire | obligatoire |
| 8 Symétrie | la règle oui ; la carte, facultative | obligatoire avec carte |
| 9 Mesurer | proportionnel : compter et noter | obligatoire, avec compteurs et budgets |
| 10 Vérification honnête | obligatoire | obligatoire |
| 11 Audit | un, avant la production | périodique |
| 12 Fail-closed | facultatif si lecture seule | obligatoire |
| 13 Intégration et déploiement | minimum : tests seuls, configuration dehors, retour arrière | obligatoire, complet |
| 14 Documentation | minimum : reprise | les trois manuels |
| 15 Résident et rétrospective | rétrospective d'une page | les deux |

En résumé : il y a neuf échelons qui ne se négocient dans aucun projet (0, 1, 2, 3, 5, 6, 7, 10 et
la rétrospective du 15), et sept qui se dimensionnent avec le projet.

### Comment l'utiliser avec n'importe quel outil

La méthode est neutre vis-à-vis de l'outil ; ce qui change d'un outil à l'autre, c'est **où l'on
place chaque artefact** pour que le modèle le lise. La correspondance, pour les outils les plus
utilisés fin 2026 :

| Artefact de la méthode | Claude Code | Cursor | Codex CLI / Gemini CLI | Forge |
|---|---|---|---|---|
| Contrat de collaboration (E1) et routines (E5, E6, E7, E8, E10, E14) | `CLAUDE.md` du projet | `.cursor/rules/` | `AGENTS.md` / `GEMINI.md` | doctrines injectées par porte |
| Définition du projet (E2) | `CLAUDE.md` + `docs/STATUS.md` | idem, en règles et docs | idem | `PROJECT.md` + `.forge/sumi-context.md` |
| Registre des éléments en attente (E5) | `docs/PENDING.md` ou issues | idem | idem | registre natif des éléments en attente avec verbes |
| Prompts d'échelon (tous) | collés dans le chat en gravissant l'échelon | idem | idem | injectés en franchissant la porte |
| Portes (E4) | `docs/GATES.md`, manuel | idem | idem | G1 à G9, automatiques |
| Compteurs et budgets (E9) | scripts dans le dépôt avec tests | idem | idem | idem, plus le cliquet statique |

La colonne Forge est celle qui automatise le plus ; les trois autres fonctionnent tout aussi bien si
le propriétaire fait à la main ce que Forge fait tout seul : coller le prompt de l'échelon au bon
moment et exiger la vérification de complétude avant de passer au suivant. C'est, de fait, la
pratique du cours.

### Étape 0 — Ce projet peut-il être abordé ainsi ? (l'éligibilité)

Cet échelon a une histoire particulière. Pablo l'a dit le 17 octobre : il y a quelque chose de
préalable à tout, qui n'est dans aucun dépôt parce que c'est toujours arrivé déjà décidé — la
décision de **savoir si un projet s'aborde avec cette méthode ou non**. C'est un critère qui vivait
dans sa tête, et que nous allons élaborer ensemble. Donc tout ce qui suit dans cet échelon est, en
partie, confirmé par lui, et en partie hypothèse de ma part pour lancer la conversation. Je les
distingue soigneusement.

- **Intention** : décider si un projet s'aborde avec cette méthode, et avec un agent aux
  commandes, ou non, AVANT d'ouvrir le dépôt. Parce que si vous entrez dans un projet qui ne s'y
  prête pas, la méthode se dégrade en « programmer avec l'IA » et là, oui, le propriétaire finit par
  lire du code.
- **Entrées** : la demande du client, le domaine métier, les données, la technologie, les
  environnements disponibles, et qui sera le propriétaire.
- **Artefact** : une fiche d'éligibilité d'une page, avec les critères notés et la décision : go,
  no-go, ou go sous conditions.
- **Porte** : les critères excluants sont tous au vert, et la note de ceux qui pondèrent dépasse le
  seuil (seuil que nous n'avons pas encore défini).
- **Qui décide** : aujourd'hui, Pablo. L'idée est que la méthode permette à une autre personne de
  le décider avec la même fiche.
- **Échec qu'il évite** : se lancer dans un projet où l'agent ne peut pas se vérifier seul, ou où il
  n'y a pas de propriétaire du domaine qui décide, et finir avec l'humain relisant le code ligne par
  ligne.
- **Contrat (comment on l'exécute)** : `peldanos/peldano-00-elegibilidad.md`.

**Les deux critères excluants que Pablo a confirmés (17 octobre).** Et attention à ce détail, que je
trouve très fin : ils viennent des projets que Pablo a *refusés*, pas de ceux qu'il a acceptés. Les
« non » définissent la frontière mieux que les « oui ».

| # | Critère excluant | Les mots de Pablo, textuels (traduits) | Pourquoi il tue la méthode |
|---|---|---|---|
| X1 | Technologie héritée sans dépôt accessible, ou avec des dépôts qui ne suivent pas un standard | « Technologies legacy sans repo accessible ou avec des repos non standard » | Sans dépôt standard il n'y a nulle part où laisser la preuve : pas d'éléments en attente cités dans les commits (échelon 5), pas de tests voyageant avec le code (7), pas d'intégration et de déploiement en paquet (13), pas de documentation dans le même commit (14). L'agent travaille à l'aveugle et ne laisse aucune trace vérifiable. |
| X2 | Technologie qu'on ne peut pas tester de bout en bout : on ne peut pas exécuter les écrans et accéder à chaque élément de l'interface avec ses différentes méthodes, en validant que le changement a atteint le backend | « Nous ne pouvons pas tester le end to end depuis l'écran en validant les changements dans le backend » ; et plus tard : « NAC3 n'est pas obligatoire. OUI à tester depuis l'exécution des écrans et l'accès à chaque élément de l'interface avec ses différentes méthodes » | Sans cette vérification de l'écran au backend l'agent ne peut pas se prouver seul (échelons 7, 9 et 10), et alors le propriétaire devrait lire du code — ce qui est précisément ce que la méthode promet d'éviter. |

Une précision que Pablo a faite et qui vaut de l'or pour la neutralité d'outil : **NAC3 (le
protocole que Forge utilise pour que les écrans puissent être pilotés par programme) N'EST PAS une
condition ; c'est le moyen par lequel nous y parvenons aujourd'hui**. Le critère neutre est le
suivant : l'interface peut être exécutée par programme, et chaque élément de l'écran est accessible
avec ses différentes méthodes (cliquer, saisir, lire son état), de sorte qu'un test puisse parcourir
l'écran puis vérifier l'effet sur le backend. Une technologie dont l'interface n'expose pas ses
éléments à un « driver » (comme Playwright, par exemple) reste dehors, même si elle a un dépôt.

Et une lecture de ma part sur ces deux critères : au fond ce sont **la même condition vue de deux
côtés**. L'agent doit pouvoir se vérifier seul, de bout en bout, et laisser la preuve dans le
dépôt. X1 est la moitié « où va la preuve ? » ; X2 est la moitié « comment la preuve est-elle
produite ? ». Cela transforme deux de mes hypothèses ci-dessous (D3 et D8) en conséquences de X1 et
X2, et non en critères à part.

`[hypothèse]` **Critères candidats que je vois dans les trois cas.** Ils doivent être confirmés,
pondérés et complétés avec Pablo ; ceux qui sont dans sa tête manquent sûrement.

| # | Critère candidat | Comment il s'est manifesté dans les cas | Excluant ? |
|---|---|---|---|
| D1 | Il y a un propriétaire du domaine avec du jugement et du temps pour décider (pas pour programmer) | Pablo dans les trois ; « règle Pablo », « décision Pablo » avec date | `[?]` |
| D2 | Il y a un « oracle » de vérité vérifiable : données réelles, un système externe, la production en lecture seule | La Mutuelle et son Autorisateur comme oracle (le cas 1 355 contre 1 234) ; la production en lecture seule | `[?]` |
| D3 | L'agent peut tester seul : accès aux environnements de test, intégration continue, données de test | UAT dans les deux projets de l'Association ; un semeur de données anonymisées (pnd511) | absorbé par X2 |
| D4 | La technologie est dans ce que l'agent maîtrise sans inventer (Node, Python, SQL, React) | les trois | `[?]` |
| D5 | L'erreur a une conséquence réelle (argent, santé, exploitation), ce qui justifie le fail-closed | la Mutuelle (santé, facturation), l'Association (familles) | `[?]` |
| D6 | La volumétrie peut être connue dès le premier jour (dimensionnement G9) | Kikan : 3,4 millions de lignes par an ; la Mutuelle : 7 819 lignes | `[?]` |
| D7 | Le client tolère un temps de maturation et un humain dans la boucle (pas tout automatique dès le premier jour) | l'approbateur automatique avec mode à blanc ; l'humain dans la boucle à la Mutuelle | `[?]` |
| D8 | Projet nouveau, ou hérité mais auditable (s'il y a du legacy : on l'audite d'abord, et zéro « fallback » vers le legacy) | SQ 0.2 ; l'outil de migration de Forge | absorbé par X1 |
| D9 | Le périmètre tient dans un dépôt et un propriétaire (sans coordination entre plusieurs équipes) | les trois | `[?]` |
| D10 | Les secrets et les accès peuvent être isolés (coffre, fichier d'environnement, permissions bornées) | `forge-embed.env`, la clé d'API rattachée à son créateur | `[?]` |

**Questions à élaborer ensemble** : de D1 à D10, lesquels de plus sont excluants et lesquels
pondèrent ? Quel poids a chacun ? Quels autres projets Pablo a-t-il refusés et pourquoi ? Et, très
important, y a-t-il des critères d'affaires (marge, relation avec le client, temps disponible de
Pablo) qui ne sortent d'aucun dépôt et qui décident aussi ?

### Étape 1 — Le contrat de collaboration (les règles avant le code)

Avant d'écrire une seule ligne, humain et agent se mettent d'accord sur la façon dont ils vont
travailler. Cela ressemble à une formalité, et ce n'en est pas une : c'est ce qui évite 80 % des
frustrations du premier mois.

- **Intention** : fixer comment travaillent l'humain et l'agent avant la première ligne de code.
- **Entrées** : rien ; c'est le premier fichier du projet.
- **Artefact** : un document de standards de qualité (dans Forge il s'appelle `SQ.md`, mais il peut
  s'appeler comme vous voulez) qui dise, au minimum : le temps de l'humain est sacré (on ne le
  dépense pas pour des choses que l'agent peut résoudre seul) ; zéro dette technique, c'est-à-dire
  que quand quelque chose casse on le répare à la racine et on ajoute la régression dans la même
  session ; le périmètre est exact, ni plus ni moins que demandé ; on parle la langue de
  l'utilisateur ; la documentation se met à jour dans le même commit ; et jamais on n'annonce comme
  fait quelque chose qui ne l'a pas été.
- **Porte** : le contrat est dans le dépôt et se lit à chaque session.
- **Qui décide** : le propriétaire. L'agent peut proposer des changements, mais ne modifie pas le
  contrat de son propre chef.
- **Échec qu'il évite** : l'agent qui « aide » en élargissant le périmètre parce que ça lui a semblé
  une bonne idée ; celui qui laisse de la dette « pour plus tard » (et le plus tard n'arrive
  jamais) ; et celui qui rapporte comme fait ce qu'il *croit* avoir fait.
- **Preuve** : `2219f7a` (25 mai) ; les règles SQ 1 à 9 dans `src/chat/server.ts` ; `docs/SQ.md`,
  sections 0.1 à 0.11.
- **Contrat (comment on l'exécute)** : `peldanos/peldano-01-contrato-de-convivencia.md`.

### Étape 2 — La définition du projet et la lecture obligatoire

Chaque session de l'agent démarre de zéro : il ne se souvient pas d'hier. Il faut donc lui donner
une carte, et il faut l'obliger à la lire avant de toucher à quoi que ce soit.

- **Intention** : que chaque session démarre en sachant ce qu'est le projet, dans quel état il est
  et quelles décisions ont déjà été prises.
- **Entrées** : le contrat (échelon 1) et la demande du client.
- **Artefact** : un fichier de projet opérationnel (`PROJECT.md` ou `CLAUDE.md`), et ici une
  insistance : COURT. C'est le programme, pas l'historique. Plus un fichier d'état vivant (dans
  Forge, `.forge/sumi-context.md`) avec la spécification actuelle, la tranche en cours, les
  décisions récentes et les doutes ouverts. Et une mémoire des décisions.
- **Porte** : l'agent lit la carte avant de toucher au code. Dans Forge c'est une règle explicite :
  « lis d'abord le graphe de connaissance ».
- **Qui décide** : le propriétaire définit ; l'agent tient à jour.
- **Échec qu'il évite** : deux, bien concrets. Un : du travail jetable pour n'avoir pas lu la carte
  (ça m'est arrivé le 12 juin et ça a coûté un après-midi). Deux : le `CLAUDE.md` de Kikan qui a
  grossi jusqu'à 9 661 lignes et 789 kilo-octets, impossible à lire pour quiconque — le fichier
  opérationnel et le recueil de cas doivent être des fichiers distincts.
- **Preuve** : SQ 1.1 (lecture obligatoire) ; mémoire `feedback_read_knowledge_graph_first` ;
  `AUDITORIA_CALIDAD_CODIGO_2026_10_15.md`.
- **Contrat (comment on l'exécute)** : `peldanos/peldano-02-definicion-y-lectura.md`.

### Étape 3 — Dimensionner avant de concevoir l'architecture

C'est l'échelon le plus cher à sauter, et nous le savons parce que nous l'avons sauté.

- **Intention** : que les décisions structurelles (quel moteur de base de données, si l'interface
  est synchrone ou asynchrone, combien de concurrence) se prennent avec des chiffres et non au goût.
- **Entrées** : un relevé des données de volumétrie fait avec le métier (entités, événements,
  opérateurs en pointe, conservation, charges exceptionnelles), par nature incomplet ; et un accès en
  lecture au système antérieur s'il existe. Il y a des données que **seul le métier possède** et que
  le modèle ne peut pas inférer : c'est pourquoi le prompt exige qu'il évalue si elles sont
  complètes et demande celles qui manquent, au lieu de les estimer d'un air assuré.
- **Artefact** : un enregistrement de dimensionnement avec des options FIXES (pas une liste
  ouverte : trois ou quatre options concrètes) et celle qui a été choisie. Dans Forge c'est la porte
  G9. Et les décisions « asymétriques » déclarées explicitement — par exemple, « l'interface de
  persistance est asynchrone dès la ligne un même si le premier moteur est synchrone », parce que si
  vous vous trompez ça coûte peu et si vous ne le faites pas ça coûte une fortune.
- **Porte** : le dimensionnement est enregistré avant de monter le squelette.
- **Qui décide** : le propriétaire choisit parmi les options fixes ; l'agent les présente avec des
  chiffres.
- **Échec qu'il évite** : celui de Kikan. On a démarré avec un stockage en fichiers JSON, et quand
  on a mesuré il s'est avéré que le système allait générer 3,4 millions de lignes par an. Changer
  l'interface de persistance après coup a coûté l'étape E6 de la réingénierie : trois batteries de
  tests entières passées en asynchrone, plus d'une semaine.
- **Preuve** : `0bd1b05` (dimensionnement, 11 octobre) ; `7391cc5` (interface de persistance,
  13 octobre) ; SQ 1.2 et 1.3 ; `docs/doctrine/sizing.md` (les « quatre trous », plus le
  cinquième).
- **Contrat (comment on l'exécute)** : `peldanos/peldano-03-dimensionar.md`.

### Étape 4 — Le squelette avec ses portes

Avant que le système fasse quelque chose d'utile, il doit démarrer, être testé et être déployé
VIDE. Oui, vide. Parce que découvrir le déploiement à la fin coûte très cher.

- **Intention** : avoir un système qui démarre, se teste et se déploie sans aucune fonctionnalité
  encore.
- **Entrées** : le dimensionnement (échelon 3) et le type de flux (projet nouveau, correction, ou
  évolution de quelque chose qui existe déjà).
- **Artefact** : le squelette avec l'intégration continue au vert, la structure de tests montée, un
  déploiement vers un environnement de test qui fonctionne, et les portes G1 à G9 déclarées.
- **Porte** : le squelette est au vert, l'intégration continue tourne, et le déploiement vers
  l'environnement de test fonctionne avec zéro fonctionnalité.
- **Qui décide** : l'agent exécute ; le propriétaire approuve visuellement (avec une capture
  d'écran ou un test automatisé qui la produit).
- **Échec qu'il évite** : dans Kikan le déploiement est arrivé le 23 septembre, un mois après le
  démarrage, et entre le 30 septembre et le 4 octobre il y a eu cinq éléments en attente d'affilée
  rien que pour que le déploiement fonctionne bien. Si le squelette avait été déployé vide la
  première semaine, ces cinq coups seraient tombés avec zéro fonctionnalité en jeu.
- **Preuve** : `docs/doctrine/gates.md` ; `workflow-kinds.md` (projet nouveau, étapes 6 sur 18) ;
  la politique de test, « scaffold gate green » ; `ci.yml` de Kikan, 28 août.
- **Contrat (comment on l'exécute)** : `peldanos/peldano-04-esqueleto.md`.

### Étape 5 — Le plan, ce sont les éléments en attente

Il y a ici une idée qui, une fois saisie, ne vous lâche plus : il n'y a pas de « plan » d'un côté
et de « liste de tâches » de l'autre. **La liste des éléments en attente EST le plan.**

- **Intention** : une seule file de travail, ordonnée et avec porte, qui soit la vérité du projet.
- **Entrées** : la spécification initiale, les audits, les demandes du client, et les coups durs.
- **Artefact** : un registre d'éléments en attente numérotés (PND-001, PND-002…), chacun avec
  titre, état, la décision qui l'a originé et le test qui le clôt. Et chaque commit cite son
  élément.
- **Porte** : aucun changement n'entre sans élément en attente ; et l'élément se clôt avec une
  preuve, pas avec « fait ».
- **Qui décide** : le propriétaire priorise ; l'agent propose et exécute dans l'ordre.
- **Échec qu'il évite** : la spécification qui « se fait dépasser » et devient obsolète en deux
  semaines (c'est arrivé à Autorisations avec son document de conception initial) ; et le travail
  dont, six mois plus tard, personne ne sait pourquoi il a été fait.
- **Preuve** : `4fc82c6` (6 juin) ; `docs/PENDING_REGISTRY_PLAN.md` ; 641 éléments en attente
  dans Autorisations ; 19 documents d'éléments en attente dans Kikan ; mémoire
  `project_pending_registry_is_plan`.
- **Contrat (comment on l'exécute)** : `peldanos/peldano-05-pendientes.md`.

### Étape 6 — Les décisions s'écrivent à côté du code

Chaque règle métier et chaque décision structurelle doit avoir un propriétaire, une date et un
endroit où elle est écrite. Sinon, dans six semaines personne ne sait si « approuvée plus solde
retourne dans la file » était une décision du client ou une idée de l'agent.

- **Intention** : que chaque règle de domaine ou décision structurelle ait propriétaire, date et
  lieu.
- **Entrées** : la conversation avec le propriétaire.
- **Artefact** : la décision écrite dans le commit, dans le document de l'élément en attente, ou
  dans un registre des décisions. Et quand le propriétaire n'a pas répondu et que l'agent a dû
  choisir, c'est marqué « décision par omission » pour pouvoir être revu.
- **Porte** : une règle métier n'entre pas dans le code sans sa phrase d'origine.
- **Qui décide** : le propriétaire. Toujours. Sans exception.
- **Échec qu'il évite** : discuter six semaines plus tard de pourquoi quelque chose est ainsi ; et,
  pire, l'agent qui invente des règles de domaine parce qu'elles lui ont semblé raisonnables.
- **Preuve** : `0ae3ae6 (pnd550)`, avec le texte « règle Pablo » et « décision Pablo 2026-08-10 »
  dans le commit ; `docs/DIRECTOR_DECISIONS_2026_06_04.md` ; SQ 7 (mémoire des décisions).
- **Contrat (comment on l'exécute)** : `peldanos/peldano-06-decisiones.md`.

### Étape 7 — Les tests comme verrous, prouvés en rouge

Un test que vous n'avez jamais vu échouer, vous ne savez pas s'il prouve quelque chose. C'est
pourquoi la règle ici n'est pas « écris des tests » ; c'est « démontre que le test passe au rouge
contre l'ancien code ».

- **Intention** : que chaque comportement qui compte ait un test qui ÉCHOUE s'il casse, et qu'on
  sache, avec certitude, qu'il échoue.
- **Entrées** : le changement déjà implémenté (par défaut les tests viennent après l'implémentation ;
  « le test d'abord » reste une option pour les petits périmètres).
- **Artefact** : le nouveau test, plus la régression des éléments en attente voisins lancée dans la
  même session. Et dans le commit, textuellement : « prouvé en ROUGE contre l'ancien critère »,
  « vérifié ROUGE 4 sur 8 ».
- **Porte** : rouge démontré → vert → régression au vert. Et l'agent ne se simule pas lui-même (il ne
  remplace pas par des simulations les parties qu'il veut justement tester).
- **Qui décide** : l'agent exécute et rapporte ; le propriétaire ne relit pas le test, il relit le
  rapport.
- **Échec qu'il évite** : les tests qui passent parce qu'ils ne prouvent rien ; et le vert qui cache
  un bug — il nous est arrivé qu'une batterie entière « meure » par manque de mémoire et ressemble
  à un test qui échoue (`1d7a20b`).
- **Preuve** : `docs/doctrine/testing-policy.md` (4 juin) ; `ab3e529 (pnd517)` ; `0ae3ae6
  (pnd550)` ; `e18406d (pnd452)`, « rouge sans le try/except ».
- **Contrat (comment on l'exécute)** : `peldanos/peldano-07-tests-en-rojo.md`.

### Étape 8 — Symétrie entre producteur et consommateur, et le registre des anti-patrons

Quand vous changez une extrémité (le serveur, le robot, le schéma de la base), l'autre extrémité
(l'écran, le compteur, le consommateur) doit changer dans le même commit. Sinon, tôt ou tard elles
divergent, et l'utilisateur voit un chiffre d'un côté et un autre chiffre de l'autre.

- **Intention** : qu'un changement à une extrémité entraîne l'autre, toujours, dans le même commit.
- **Entrées** : tout changement de contrat entre deux parties du système.
- **Artefact** : le serveur définit la liste (les colonnes, les causes, les portes) et le
  consommateur la lit de là, au lieu d'avoir sa propre copie. Plus le registre GOTCHAS : chaque
  anti-patron avec son odeur, sa cause racine, son correctif et comment le détecter avant.
- **Porte** : elle est automatique (règle SQ 14) : l'agent cherche l'autre côté avant de considérer
  un changement clos.
- **Qui décide** : personne ; c'est automatique.
- **Échec qu'il évite** : le compteur qui ne coïncide pas avec la requête (1 355 contre 1 234) ; la
  dérive entre la version web et la version mobile (GOTCHAS G-2) ; deux copies du même module qui se
  désynchronisent (G-3 ; dans Kikan il y a 8 modules dupliqués entre web et mobile, détectés dans
  l'audit).
- **Preuve** : SQ 14 ; `docs/GOTCHAS.md` (27 mai) ; `50fe968 (pnd510)` ; `7251129 (pnd509)`.
- **Contrat (comment on l'exécute)** : `peldanos/peldano-08-simetria-y-antipatrones.md`.

### Étape 9 — Mesurer avant de construire, avec un instrument lui-même vérifié

C'est, pour moi, l'échelon le plus « adulte » de tous, et celui qui a mis le plus de temps à
apparaître. La règle est : tout chiffre qui alimente une décision sort d'un programme avec un test.
Pas d'un `grep`, pas d'une impression, pas de « je crois qu'il y en a une centaine ».

- **Intention** : que tout chiffre qui alimente une décision sorte d'un instrument avec test, et que
  l'instrument lui-même soit audité.
- **Entrées** : une hypothèse (du propriétaire ou de l'agent) sur une cause, une quantité ou un
  coût.
- **Artefact** : un « compteur gardé » (un script plus un test qui le protège) qui voyage dans le
  dépôt ; un budget par chemin (combien de requêtes, combien de boucles) resserré sur la mesure
  plus une petite marge ; et un « cliquet », un compteur qui ne peut que descendre.
- **Porte** : les cinq règles de la section 11.b de Kikan : (1) compteur gardé ; (2) si
  l'instrument n'existe pas, on le construit ; (3) on audite dans les deux sens (du code à la mesure
  et de la mesure au code) ; (4) l'approximatif se marque comme approximatif ; et (5) celui qui
  exécute vérifie les chiffres de celui qui a planifié.
- **Qui décide** : le chiffre. Le propriétaire apporte l'hypothèse ; l'agent la mesure avant de
  construire. Et une observation de mois de travail avec Pablo : il a généralement raison sur le
  symptôme, et la cause se trouve généralement juste à côté de là où il la place — c'est pourquoi
  on mesure, on ne discute pas.
- **Échec qu'il évite** : les « 121 boucles » qui étaient 79 ; les « 27 courses » qui étaient 44 ;
  le compteur qui mentait parce que la base avait déjà un changement de schéma appliqué ; le cliquet
  avec le compteur à zéro qui ne voyait pas 84 appels.
- **Preuve** : `REINGENIERIA_PERSISTENCIA_SQL.md`, section 11.b ; `880ac0f`, `f955620`,
  `1d55a93`, `0730082` (63 sur 60) ; `_diag_pnd517_counters.py` ; mémoires
  `feedback_medidor_con_guarda`, `feedback_medir_la_hipotesis`,
  `feedback_validar_limites_con_el_log`.
- **Contrat (comment on l'exécute)** : `peldanos/peldano-09-medir.md`.

### Étape 10 — Vérification honnête et rapport proportionné

Si le propriétaire ne va pas lire de code, le rapport de l'agent doit être fiable. Pas
« optimiste », pas « complet en apparence » : fiable. Et cela a des règles.

- **Intention** : que le rapport de l'agent soit fiable sans que le propriétaire lise de code.
- **Entrées** : le travail effectué.
- **Artefact** : un rapport qui sépare clairement le « vérifié » du « supposé » ; qui déclare ses
  angles morts (ce qu'il n'a pas pu tester) ; qui couvre chaque point de ce qui a été demandé, un par
  un ; et qui cite la preuve (le journal, le test, le chiffre).
- **Porte** : aucune affirmation sans sa preuve. « Fait » ne se dit qu'avec la discipline du
  « fait » (SQ 5). Et face à un « c'est toujours cassé », la première chose est de comparer quelle
  version est publiée et laquelle contient le correctif, avant de rediagnostiquer.
- **Qui décide** : le propriétaire fait confiance, ou demande la preuve. Il ne relit jamais le code.
- **Échec qu'il évite** : l'erreur d'authentification que Forge a rapportée comme « succès »
  (14 octobre) ; annoncer du travail non fait (SQ 9c) ; et l'agent qui dit « corrigé » quand le
  correctif est dans le dépôt mais n'a pas encore été publié.
- **Preuve** : `docs/doctrine/verification-honesty.md` (10 juin) ; SQ 9a, 9b et 9c ; SQ 5 ;
  mémoire `feedback_check_published_version_first`.
- **Contrat (comment on l'exécute)** : `peldanos/peldano-10-verificacion-honesta.md`.

### Étape 11 — L'audit périodique comme intrant du plan

De temps en temps il faut regarder le système entier avec un œil neuf. Et ce qu'on voit ne va pas
dans un rapport qu'on archive : cela va dans la file des éléments en attente.

- **Intention** : regarder le système complet de temps en temps et convertir ce qu'on voit en
  éléments en attente.
- **Entrées** : le dépôt entier, et la production en lecture seule.
- **Artefact** : un rapport avec des constats gradués (P0 l'urgent, P1, P2… ; ou des notes par
  dimension) qui se termine en éléments en attente numérotés. Idéalement fait par un auditeur
  différent du constructeur : dans notre cas, moi (Sumi) j'audite ce que Forge construit, et Forge
  absorbe les constats.
- **Porte** : chaque constat P0 a un élément en attente ouvert avant de considérer l'audit clos.
- **Qui décide** : le propriétaire priorise les constats.
- **Échec qu'il évite** : un mot de passe de superadministrateur codé en dur que personne n'avait
  vu ; 264 requêtes qui lisaient des tables entières ; une vulnérabilité connue dans une
  dépendance ; un composant d'écran de 2 679 lignes.
- **Preuve** : full-scan du 23 juin et sécurité du 16 juillet (Autorisations) ; AUD-* → 19
  éléments en attente (Kikan, 28 août) ; `INTEGRIDAD_..._10_14.md`, absorbé dans `b266f11` ;
  `AUDITORIA_CALIDAD_..._10_15.md`.
- **Contrat (comment on l'exécute)** : `peldanos/peldano-11-auditoria.md`.

### Étape 12 — Fail-closed, verrous et zéro dommage silencieux

En cas de doute ou de panne, le système N'AGIT PAS. Et il le dit. Cela semble évident, mais c'est
le contraire de ce que fait le logiciel par défaut, qui en cas de doute continue.

- **Intention** : que le système, en cas de doute ou de panne, n'agisse pas, et prévienne.
- **Entrées** : toute action à conséquence (facturer, envoyer, approuver, supprimer).
- **Artefact** : des verrous (double sécurité, bouton de panique), un mode à blanc avant d'automatiser
  pour de vrai, un veilleur qui pousse avec des gardes, des permissions et des approbations
  explicites pour l'agent, et des recherches qui, si elles échouent, ne cassent pas l'écran.
- **Porte** : toute action irréversible a un verrou et un chemin de retour documenté.
- **Qui décide** : le propriétaire approuve le verrou ; le système ne le saute jamais.
- **Échec qu'il évite** : une double facturation ; une approbation automatique sans passer par un
  humain ; un `git add -A` qui téléverse un jeton dans le dépôt ; supprimer les données du client.
- **Preuve** : `0954740 (pnd524)` ; `e18406d (pnd452)` ; l'approbateur automatique en mode à
  blanc ; SQ 0.3 (zéro dommage silencieux) ; les verbes NAC3 avec approbation.
- **Contrat (comment on l'exécute)** : `peldanos/peldano-12-fail-closed.md`.

### Étape 13 — Intégration continue, environnements, secrets et déploiement comme partie du produit

Arriver en production doit être un paquet reproductible : les tests tournent UNE fois, la
configuration vit hors du dépôt, et les secrets ne traînent pas.

- **Intention** : qu'arriver en production soit un paquet reproductible, avec les tests lancés une
  seule fois et la configuration hors du dépôt.
- **Entrées** : le squelette (échelon 4) et les tests (échelon 7).
- **Artefact** : une intégration continue qui lance la batterie ; un déploiement qui attend le
  résultat de cette intégration et ne fait qu'empaqueter et téléverser ; la configuration seulement
  sur le serveur (dans un fichier d'environnement ou un coffre) ; une promotion explicite de
  l'environnement de test vers la production ; une procédure (runbook) qui peut être lancée deux fois
  sans rien casser ; et le quota de minutes d'intégration continue surveillé.
- **Porte** : l'environnement de test au vert avant de toucher à la production ; le retour arrière
  testé ; et aucun secret dans le dépôt ni dans le chat — si l'un a été collé par erreur, on le
  renouvelle.
- **Qui décide** : le propriétaire promeut en production ; l'agent prépare tout.
- **Échec qu'il évite** : les tests lancés trois fois par commit (de 16 à 27 minutes chacun ;
  2 000 minutes en 16 jours, quota brûlé) ; la clé de la base de données imprimée dans une
  transcription ; le CORS dérivé seulement du premier nom de domaine du serveur ; la configuration
  écrasée par la batterie de tests (PND-107).
- **Preuve** : `39497b0` (gate-ci) ; `0bd20a8 (PND-107)` ; `513c8d0 (PND-108)` ; `7658e2e`
  (promotion) ; mémoires `project_kikan_deploy_solo_empaqueta` et
  `project_embed_apikey_environmentfile`.
- **Contrat (comment on l'exécute)** : `peldanos/peldano-13-ci-entornos-secretos-deploy.md`.

### Étape 14 — Documentation vivante et manuels qu'une personne peut suivre sans IA

Le système doit pouvoir être utilisé, maintenu et récupéré sans l'agent et sans la personne qui l'a
construit. Si, le jour où l'agent n'est pas là, on ne peut pas déployer, ce n'est pas terminé.

- **Intention** : que le système puisse être utilisé, maintenu et récupéré sans l'agent et sans le
  constructeur.
- **Entrées** : chaque changement (dans Forge, la porte G-DOC).
- **Artefact** : le manuel utilisateur, celui de maintenance, le manuel interne d'infrastructure
  « reproductible à la main, sans IA », celui de reprise après sinistre, et le journal des
  changements. Tout dans le même commit que le changement qui l'a motivé.
- **Porte** : la documentation est à jour (SQ 4) ; le manuel se régénère avec le système.
- **Qui décide** : l'agent entretient ; le propriétaire lit le manuel, pas le code.
- **Échec qu'il évite** : un document de gestion des dépôts périmé qui a provoqué un commit dans le
  mauvais dépôt ; et le `CLAUDE.md` transformé en historique des changements.
- **Preuve** : SQ 3.3, 3.4 et 6 ; le manuel du 26 juin ; `6444ce6 (pnd442)` ; `a30cee3
  (pnd459)` ; le manuel de Kikan avec images intégrées du 16 octobre.
- **Contrat (comment on l'exécute)** : `peldanos/peldano-14-documentacion-viva.md`.

### Étape 15 — L'agent dans le système, et la rétrospective chiffrée

Le dernier échelon a deux parties qui semblent distinctes mais ferment le même cycle. D'abord :
l'agent reste résident en production, avec un périmètre borné. Ensuite : la méthode elle-même se
révise avec des chiffres, et ce qu'on apprend revient à l'échelon 0 pour le projet suivant.

- **Intention** : que l'agent reste résident en production avec un périmètre borné (diagnostic →
  exploitation → support), et que la méthode se révise avec des chiffres.
- **Entrées** : le système en production, les incidents, les coûts.
- **Artefact** : l'agent embarqué avec une carte du système obligatoire, des permissions bornées,
  une clé d'API qui agit comme la personne qui l'a créée, et des tickets. Plus une rétrospective
  écrite avec mesure (un papier, un rapport) qui change la méthode et revient à l'échelon 0.
- **Porte** : l'agent embarqué ne peut pas faire ce que le propriétaire n'a pas approuvé ; et la
  rétrospective produit au moins un changement dans l'échelle.
- **Qui décide** : le propriétaire.
- **Échec qu'il évite** : l'équipe multi-agents qui dépensait le double et livrait la moitié (tuée
  avec des chiffres le 5 juin) ; et l'agent exploitant à l'intérieur d'un système sans en avoir la
  carte.
- **Preuve** : `docs/PAPER_SUMI_VS_AGENTIC.md` ; `7584f8b` ; `1c7c0b5` (l'embarqué, PND-147) ;
  `c602725` (mode exploitation) ; `20fdbe7` et `1558ee4` (PND-257 et PND-223) ; la mémoire de
  l'assistant résident en production.
- **Contrat (comment on l'exécute)** : `peldanos/peldano-15-agente-residente-y-retrospectiva.md`.

---

## Partie C — Les échecs réels, et quel échelon couvre chacun

Ce tableau est, d'une certaine façon, la preuve de l'échelle : chaque coup dur que nous avons pris
doit tomber dans un échelon. S'il y a un coup dur qui ne tombe dans aucun, un échelon manque.

| Échec (et quand c'est arrivé) | Échelon qui le couvre | Clos ? |
|---|---|---|
| L'équipe multi-agents : 60 dollars et 73 minutes pour une livraison à moitié faite (5 juin) | 15, rétrospective chiffrée | oui (refonte) |
| Travail jeté pour n'avoir pas lu la carte (12 juin) | 2, lecture obligatoire | oui |
| PND-300 : trois correctifs qui n'étaient pas à la racine (14 juillet) | 1, zéro dette / 9, mesurer | oui (au quatrième tour) |
| Le compteur 1 355 contre 1 234 (7 août) | 9, instrument / 8, symétrie | oui |
| 3,4 millions de lignes par an sur des fichiers JSON, interface synchrone (11 octobre) | 3, dimensionner | oui (étapes E1 à E12) |
| Des compteurs qui mentaient : 27 qui étaient 44, le cliquet à zéro (13 octobre) | 9, vérifier l'instrument | oui |
| Le tour orphelin de 1 h 43, six commits invisibles (14 octobre) | 10, vérification honnête / 12, fail-closed | oui (version 1.18.0) |
| Tests lancés trois fois par commit ; quota GitHub Actions brûlé (14 octobre) | 13, intégration comme produit | oui (gate-ci) ; le quota doit être augmenté par Pablo |
| Deux portes d'administrateur en 24 heures (15 octobre) | 11, audit externe / 12, verrous | oui (PND-223 retirée) |
| La clé MariaDB et les clés `yerp_` collées dans le chat (14 et 16 octobre) | 13, secrets | la rotation est en attente chez Pablo |
| « reported error: success » (14 octobre) | 10, rapport proportionné | en attente (c'est un correctif d'une ligne) |
| Le `CLAUDE.md` de 9 661 lignes (15 octobre) | 2, fichier opérationnel contre recueil de cas | en attente |
| CORS dérivé du premier nom de domaine ; l'assistant de configuration de l'UAT renvoyait une erreur 500 (16 octobre) | 13, déploiement / 8, symétrie | le prompt pour Forge est livré ; application en attente |
| Forge Mobile perd ses onglets (16 octobre) | 10 / 12 | diagnostic fait ; correctif en attente |

---

## Partie D — Ce qu'il reste à élaborer (pour la prochaine passe)

Fait dans la version 2 (17 octobre, après-midi) : la thèse d'ouverture (« l'IA n'interrompt pas la
méthode : elle la continue »), les seize contrats d'échelon dans `peldanos/`, et le dépôt propre de
la méthode. Fait dans la version 3 : le nom, les contrats enrichis (taille, signaux d'alarme,
prompts en anglais avec explication), le guide par taille de projet et le guide par outil. Reste :

1. **L'échelon 0 complet** : la liste réelle des critères (ceux de Pablo plus mes hypothèses),
   lesquels excluent et lesquels pondèrent, les poids, le seuil, et les projets refusés comme
   contre-exemples. Nous avons déjà X1 et X2 ; le reste manque.
2. **L'ordre et le regroupement** : l'échelle a trois phases (démarrage, de 0 à 4 ; boucle, de 5 à
   10 ; exploitation, de 11 à 15). Il faut confirmer si on l'enseigne ainsi ou s'il vaut mieux
   commencer par la boucle, qui est ce qu'un élève utilisera tous les jours.
3. **Un nom mémorable pour chaque échelon**, en une phrase, pour les manuels et les publications.
4. ~~Ce qui est minimal et ce qui est facultatif selon la taille du projet~~ — **proposé** dans le
   tableau « Ce qui est obligatoire et ce qui est proportionnel », marqué comme hypothèse jusqu'à ce
   qu'un projet le confirme.
5. **La correspondance avec Forge** : quels échelons sont déjà des portes ou des commandes (G1 à
   G9, le registre des éléments en attente, le dimensionnement, les doctrines) et lesquels manquent
   pour pouvoir exporter l'échelle comme flux d'exécution.
6. **La pratique** : le manuel-cours (`MANUAL_CURSO.md`), avec une tâche pratique par échelon
   qu'un élève puisse répéter dans son propre dépôt jusqu'à avoir l'application en production. En
   cours.
7. **Ce qui N'EST PAS dans l'échelle et devrait y être** `[hypothèse]` : la gestion du coût des
   jetons et des quotas comme un budget explicite (aujourd'hui c'est réactif : on l'apprend quand ça
   brûle) ; la rotation des secrets comme routine et non comme incident ; et un critère pour savoir
   quand l'humain DOIT regarder le code — aujourd'hui la réponse est « jamais », mais les deux
   rapports de cette semaine suggèrent qu'il y a des moments précis où cela vaut la peine.
8. ~~Le nom~~ — **fait** : Urazuke, la méthode de la preuve (D-014, 17 octobre).
9. ~~La présentation publique sur yujin.app~~ — **fait** (17 octobre, soir) : la sous-page
   `yujin.app/urazuke` (dépôt `pkuschnirof/rpaforce`, dossier `web/yujin.app/urazuke/`), avec la
   landing dans les dix langues d'interface du site, les trois documents HTML dans les huit langues
   de la méthode, et une carte mise en avant sur l'accueil de yujin.app. Reste à la publier par un
   push sur `main` de ce dépôt et, quand ce dépôt-ci s'ouvrira, à le lier depuis là.
10. **Tester les contrats sur un projet réel.** Les seize prompts sont écrits à partir de ce que
    nous avons fait, pas exécutés tels quels. Le premier projet qui les utilisera de bout en bout en
    corrigera plusieurs ; cela fait partie de l'échelon 15.

---

## Glossaire

Chaque sigle, chaque nom propre et chaque expression familière qui apparaît dans ce document,
expliqué. Par ordre alphabétique. Certaines entrées sont des termes espagnols qui apparaissent dans
des noms de fichiers ou des messages de commit des dépôts d'origine ; on les garde pour que la
preuve puisse être suivie.

**Agent** — Un programme d'intelligence artificielle qui ne se contente pas de répondre à des
questions mais exécute des actions : lit des fichiers, écrit du code, lance des commandes, fait des
commits. Dans ce document, « l'agent » est Forge ou Sumi (voir plus bas).

**Anonymisation** — Dans ce document les vrais clients s'appellent « la Mutuelle »,
« l'Autorisateur » et « l'Association », et leurs systèmes « Autorisations » et « Kikan ». C'est
voulu : les noms restent réservés jusqu'à obtention de la permission de les utiliser.

**Anti-patron** — Une façon de faire les choses qui semble raisonnable mais dont on sait qu'elle
finit mal. Le contraire d'un « patron » (une bonne pratique éprouvée).

**Apprendre à la dure** — Apprendre quelque chose parce que ça a mal tourné, pas parce que
quelqu'un l'a expliqué avant. S'emploie au sens de « ces règles ont été apprises à la dure ».

**Artefact** — Quelque chose de concret qui est produit : un fichier, un test, un script, un
document. Dans l'échelle, chaque échelon laisse un artefact.

**Association (l')** — Ainsi ce document appelle le client du système Kikan (son vrai nom reste
réservé) : une association civile qui accompagne des familles et avait besoin d'un guichet omnicanal
(plusieurs canaux de contact en un seul endroit) et de campagnes.

**Asynchrone / synchrone (async / sync)** — Un appel synchrone attend le résultat avant de
continuer ; un appel asynchrone lance la tâche et continue, puis récupère le résultat. Les vraies
bases de données en Node sont asynchrones ; c'est pourquoi l'interface doit l'être dès le départ.

**AUD-*** — La série d'audits numérotés faits dans Kikan en août (AUD-1, AUD-2…), qui ont généré
des éléments en attente.

**Autorisateur (l')** — Ainsi ce document appelle le système de la Mutuelle qui reçoit les
commandes et renvoie un verdict (approuvée, rejetée). Pour nous il fonctionne comme « oracle » : la
vérité contre laquelle on vérifie les compteurs.

**Autorisations** — Nom que ce document donne au premier système en production (le vrai reste
réservé) : automatisation robotisée (RPA) de la gestion des commandes de la Mutuelle pour une entité
de santé, avec un humain dans la boucle.

**Approbateur automatique** — Dans le système Autorisations, le robot qui approuve les commandes
automatiquement selon des règles. Il a d'abord tourné en « mode à blanc » (voir dry-run) avant
qu'on le laisse agir.

**Autopilot (pilote automatique)** — Un mandat écrit pour que l'agent travaille seul pendant des
heures (24 ou 48) en faisant des commits et des pushes sans demander, et livre un résumé à la fin.

**await** — En JavaScript, le mot-clé qui signifie « attends le résultat de cet appel asynchrone ».
Un appel à la base de données sans `await` est un bug silencieux : le code continue avant d'avoir
la donnée.

**Backend** — La partie du système qu'on ne voit pas : le serveur, la logique, la base de données.
Le contraire de « frontend » (l'écran).

**Batterie (de tests)** — L'ensemble complet des tests d'un projet, lancés tous ensemble.

**Brûler le quota** — Épuiser le budget de quelque chose (minutes d'intégration continue, jetons
de l'IA) avant l'heure.

**Cause racine** — Le motif réel d'un problème, par opposition au symptôme. Corriger le symptôme
fait revenir le problème ; corriger la cause racine, non.

**CI (intégration continue)** — Un service (ici, GitHub Actions) qui lance les tests
automatiquement à chaque fois qu'on pousse du code.

**CLAUDE.md / PROJECT.md** — Le fichier que l'agent lit au début de chaque session pour savoir ce
qu'est le projet et comment y travailler.

**Cliquet** — Un mécanisme qui ne tourne que dans un sens. Dans Kikan, un compteur d'appels sans
`await` qui ne peut que descendre : s'il monte, le test échoue.

**Coffre (vault)** — Un endroit chiffré où l'on garde les secrets (clés, mots de passe) au lieu de
les laisser dans des fichiers texte.

**Commit** — Un point sauvegardé dans l'histoire du code, avec un message qui explique ce qui a
changé et pourquoi. Chaque commit a un identifiant court (par exemple `2219f7a`).

**Compteur gardé** — Un script qui mesure quelque chose (combien de requêtes, combien de boucles)
et qui a son propre test vérifiant que le compteur mesure bien. « Gardé » signifie « protégé par
un test ».

**Concurrence** — Combien de choses se passent en même temps dans le système (utilisateurs
simultanés, processus en parallèle).

**CORS** — Un mécanisme de sécurité des navigateurs qui décide depuis quels domaines on peut
appeler un serveur. Mal configuré, il bloque des appels légitimes avec des erreurs confuses.

**Coup dur** — Un incident, une erreur qui a fait mal. « Coup dur → règle » est le patron de
naissance de toutes les doctrines.

**CVE** — Un identifiant public d'une vulnérabilité de sécurité connue dans un composant logiciel.

**Dette technique** — Ce qui reste mal fait « à réparer plus tard ». La méthode l'interdit : ce
qui casse se répare à la racine dans la même session.

**Doctrine** — Dans Forge, un document court qui fixe comment on fait quelque chose (comment on
teste, comment on vérifie, comment on dimensionne). Il y en a 31. C'est la forme que prend la
méthode à l'intérieur de l'outil.

**Driver (critère)** — Un facteur qui pousse une décision dans un sens ou dans l'autre. À
l'échelon 0, les drivers sont les facteurs qui décident si un projet est éligible.

**Dry-run (mode à blanc)** — Lancer un processus « à vide » : il fait tout sauf l'action finale.
L'approbateur automatique a d'abord tourné ainsi, en montrant ce qu'il aurait approuvé sans rien
approuver.

**E1 à E12** — Les douze étapes de la réingénierie de la persistance de Kikan (le passage du
stockage en fichiers JSON à une base de données MariaDB).

**Embarqué (embed, Forge Embedded)** — Forge installé à l'intérieur du système du client, comme
assistant résident, avec des permissions bornées.

**End to end (E2E, de bout en bout)** — Tester le système complet, de l'écran à la base de
données, comme une personne l'utiliserait.

**Environnement** — Une installation séparée du système. Les habituels : développement (la machine
du programmeur), UAT (test par le client) et PROD (production, la vraie).

**Fail-closed** — « Échoue fermé » : en cas de doute ou d'erreur, le système n'agit pas. Le
contraire de « fail-open », qui en cas de doute continue.

**Fallback (vers le legacy)** — Revenir à un ancien chemin quand le nouveau échoue. La méthode
l'interdit (SQ 0.2) : s'il y a un ancien système, on l'audite et on le migre ; on ne le laisse pas
comme filet de sécurité silencieux.

**Fixture** — Des données de test chargées avant de lancer un test ou un déploiement.

**Flip (interrupteur)** — Un changement de configuration qui choisit entre deux chemins (par
exemple, l'ancien moteur ou le nouveau) sans toucher au code.

**Forge (Yujin Forge)** — L'outil que Pablo a construit : une couche au-dessus de Claude Code qui y
ajoute la méthode (doctrines, portes, éléments en attente, un panneau de chat, une application
mobile, et le mode embarqué). `yf` est sa commande.

**Frontend** — La partie visible du système : les écrans.

**Full scan** — Une requête à la base de données qui lit la table entière parce qu'elle n'a pas
d'index pour l'aider. Avec de petites tables ça ne se voit pas ; avec des millions de lignes, ça
fait tomber le système.

**G-DOC** — Dans Forge, la porte qui exige que la documentation soit mise à jour dans le même
commit que le changement.

**gate-ci** — Le job du déploiement de Kikan qui attend que l'intégration continue se termine au
vert avant d'empaqueter. Créé le 14 octobre.

**GCP** — Google Cloud Platform, le cloud où tournent les serveurs des deux systèmes de
l'Association.

**GOTCHAS** — Un fichier qui enregistre les « pièges » connus : des erreurs que nous avons déjà
payées une fois, avec leur odeur, leur cause racine, leur correctif et comment les détecter avant.

**Greenfield / brownfield** — Un projet nouveau à partir de zéro (greenfield, « terrain vierge »)
contre un qui part de quelque chose d'existant (brownfield, « friche »).

**Grep** — Une commande qui cherche du texte dans des fichiers. « Un compteur, pas grep »
signifie : un chiffre important ne s'obtient pas en comptant avec une recherche de texte, mais avec
un programme muni d'un test.

**Heap** — La mémoire qu'utilise un programme. « La batterie mourait par heap » veut dire que les
tests manquaient de mémoire et semblaient échouer.

**HITL (human in the loop, humain dans la boucle)** — Une conception où une personne approuve avant
que le système agisse. Dans Autorisations, l'approbateur manuel.

**Index** — Une structure auxiliaire de la base de données qui rend une recherche rapide. Sans
index, la requête est un full scan.

**IPC (laisse entre processus)** — Un canal entre deux processus. Dans Forge 1.18.0 il a servi de
« laisse » : si le processus parent meurt, l'enfant l'apprend et s'éteint.

**JSON (stockage en)** — Garder les données dans des fichiers texte au format JSON au lieu d'une
base de données. Ça sert pour commencer ; ça ne sert pas pour des millions de lignes.

**Kikan** — Le système de guichet omnicanal et de campagnes de l'Association, le second système en
production.

**Legacy (hérité)** — Un ancien système encore en usage.

**Journal (log)** — L'enregistrement de ce qu'un programme fait au fur et à mesure. « Valide avec
le journal » signifie : ne fais pas confiance à ce que l'agent dit avoir fait, regarde
l'enregistrement.

**MariaDB** — Le moteur de base de données SQL que Kikan utilise en production.

**Mentir (un compteur)** — Quand un instrument renvoie un chiffre faux parce qu'il ne voit pas une
partie de ce qu'il doit mesurer. Cela nous est arrivé deux fois.

**Mois trois** — Notre expression pour le moment où un système construit vite commence à montrer
ses problèmes : quand il a de vraies données et de vrais utilisateurs.

**Mock (simuler)** — Remplacer une partie réelle du système par une simulation pendant un test.
« Ne pas se simuler soi-même » signifie ne pas simuler justement la partie qu'on veut tester.

**Mutuelle (la)** — Ainsi ce document appelle l'organisme d'assurance santé client du premier
système en production (son vrai nom reste réservé).

**NAC3** — Le protocole de Forge qui rend les écrans d'une application pilotables par programme
(chaque élément de l'interface a un identifiant et des méthodes). Il permet le test de bout en
bout. Pablo a précisé qu'il n'est pas obligatoire pour la méthode : c'est le moyen, pas la
condition.

**Node (Node 22)** — L'environnement où tourne le JavaScript côté serveur. « Node 22 figé » veut
dire que la version a été fixée pour que tous les environnements utilisent la même.

**Oracle** — Une source de vérité externe contre laquelle on peut vérifier un résultat. Pour les
compteurs de la Mutuelle, l'oracle est l'Autorisateur.

**Écraser (une configuration)** — Écrire par-dessus quelque chose par accident. « La batterie
écrasait la configuration du déploiement » était le PND-107.

**P0, P1, P2** — Niveaux de priorité d'un constat : P0 est ce qu'il faut résoudre tout de suite.

**Papier** — Un document d'analyse avec des mesures et des conclusions. Le `PAPER_SUMI_VS_AGENTIC`
est celui qui a justifié de tuer l'équipe multi-agents.

**Tableau (le tableau partagé)** — Le tableau partagé de Forge où l'agent laisse des rapports pour
que Pablo les lise.

**Playwright** — Un outil qui contrôle un navigateur par programme pour tester des écrans comme le
ferait une personne.

**PND (élément en attente)** — Un item numéroté de la file de travail (PND-001, PND-002…). Dans
cette méthode, les éléments en attente SONT le plan.

**Budget de requêtes** — Le maximum de requêtes à la base de données qu'un chemin de l'application
peut faire, mesuré et protégé par un test. Si une modification le dépasse, le test échoue.

**Prouvé en rouge** — Un test dont on a démontré qu'il ÉCHOUE contre l'ancien code avant que le
correctif le mette au vert. Si vous ne l'avez jamais vu rouge, vous ne savez pas s'il prouve quelque
chose.

**PROD (production)** — L'environnement réel, celui que le client utilise.

**Promotion (UAT → PROD)** — Faire passer quelque chose (configuration, campagnes) de
l'environnement de test à la production de façon contrôlée.

**Pull / push** — Télécharger et téléverser du code vers le dépôt distant (GitHub).

**Modale R8** — Dans Forge, la fenêtre qui arrête tout quand l'agent entre dans une boucle sans
avancer.

**Régression** — Un test qui vérifie que quelque chose qui fonctionnait déjà continue de
fonctionner après un changement.

**Relay** — Le service intermédiaire qui connecte l'application mobile de Forge à la session de
bureau.

**Dépôt (repo)** — L'endroit où vit le code avec toute son histoire. « Dépôt standard » signifie
un dépôt géré avec Git et doté d'une structure reconnaissable.

**Rétention** — Combien de temps on conserve les données de chaque table avant de les supprimer.

**Rollback (retour arrière)** — Revenir à la version précédente quand un déploiement tourne mal.

**RPAForce** — La marque de Pablo sous laquelle ces systèmes sont livrés.

**Runbook** — Une procédure opérationnelle écrite pas à pas, pour que n'importe qui puisse la
suivre. « Idempotent » veut dire qu'on peut la lancer deux fois sans rien casser.

**SDD** — Un document de conception logicielle écrit avant de construire.

**Semeur (seeder)** — Un script qui charge des données de test dans un environnement.

**Shift left** — Déplacer les tests plus tôt dans le processus de développement, vers la
« gauche » de la chronologie, au lieu de les laisser pour la fin.

**Smell (odeur)** — Un signe que quelque chose ne va pas dans le code, avant que ça n'échoue.

**SQ (Standards of Quality, standards de qualité)** — Le contrat de collaboration entre humain et
agent dans Forge. Numérotés : SQ 1 (le temps de l'utilisateur est sacré), SQ 2 (zéro dette), SQ 3
(ASCII), SQ 4 (documentation à jour), SQ 5 (périmètre exact), SQ 6 (langue de l'utilisateur), SQ 7
(symétrie producteur/consommateur), SQ 8 (autonomie), SQ 9 (vérifier avant d'affirmer). Et dans le
document long, les sections 0.1 à 0.11.

**SQL** — Le langage des bases de données relationnelles.

**Sumi (Sumi-Forge)** — Le nom de la session Claude Code qui travaille avec Pablo dans le dépôt de
Forge ; celle qui écrit ce document. Forge est le produit ; Sumi est celle qui le construit et
audite ce que Forge fait dans d'autres projets.

**Tag** — Une étiquette sur un commit qui marque une version (par exemple, v1.18.0).

**TDD** — « Le test d'abord, le code ensuite ». La méthode le garde comme option pour les petits
périmètres, pas comme règle universelle.

**Jeton (token)** — Deux sens. En IA : l'unité dans laquelle on mesure (et facture) le texte que le
modèle traite. En sécurité : un identifiant d'accès. « Un `git add -A` avec un jeton » c'est
téléverser un identifiant dans le dépôt par erreur.

**Resserrer le plafond** — Abaisser une limite (un budget, un maximum autorisé) jusqu'à ce qu'elle
soit juste au-dessus de la mesure, pour que toute dégradation fasse échouer un test.

**Tour** — Un aller-retour de la conversation avec l'agent : l'utilisateur demande, l'agent
travaille et répond.

**UAT** — L'environnement où le client teste avant la production.

**Urazuke** (裏付け) — Le nom de la méthode. En japonais, l'appui dont dispose une affirmation, ce
qui la soutient par derrière ; *urazukeru*, étayer par des preuves. Se prononce ou-ra-ZOU-ké. Ne se
traduit pas.

**Vibecoding / vibecoder** — Construire du logiciel en conversant avec une IA, en décrivant ce
qu'on veut, au lieu d'écrire le code à la main. Un vibecoder est celui qui le fait.

**Veilleur** — Dans Autorisations, le processus qui vérifie périodiquement ce qui est resté bloqué
et le pousse, avec des gardes pour ne pas pousser deux fois.

**Volumétrie** — Combien de données le système va manipuler : lignes par an, utilisateurs, pics.

**Chien de garde (watchdog, veilleur de silence)** — Un processus qui surveille si un autre donne
encore des signes de vie, et le tue s'il reste muet trop longtemps. Forge 1.18.0 en a ajouté un pour
qu'un tour ne puisse plus rester orphelin.

**yerp_** — Le préfixe des clés d'API de Kikan.

**yf** — La commande de Forge dans le terminal.

**Yujin** — L'écosystème dont Forge est le produit commercial.
