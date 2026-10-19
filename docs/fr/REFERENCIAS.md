# Urazuke — Références : les cas derrière la méthode

Auteur : Pablo Kuschniroff, assisté par Claude Code. Version 4, 18 octobre 2026.

Ce document existe pour une seule chose : que les procédures et les manuels de la méthode restent
propres. Quand, dans le document principal, dans un contrat d'échelon ou dans une leçon du cours,
j'affirme quelque chose du genre « ceci, je l'ai appris à la dure » ou « ceci, je l'ai imposé parce
que le modèle l'appliquait mal », je ne veux pas salir l'explication avec des dates, des
identifiants de commit et des numéros d'éléments en attente. Je pose une marque courte, `[Ref. N]`,
et celui qui a envie d'aller fouiller le cas vient ici et le trouve avec sa date, sa preuve et ma
lecture de ce qui s'est passé. Celui qui n'en a pas envie continue à lire sans trébucher.

Deux précisions avant de commencer. La première : les trois systèmes dont sortent ces cas sont
réels et sont aujourd'hui en production, avec de vraies personnes qui les utilisent. Les clients
sont anonymisés, et je les appelle « la Mutuelle » (avec son « Autorisateur ») et « l'Association » ;
leurs systèmes, je les appelle « Autorizaciones » et « Kikan ». Le troisième dépôt est l'outil où la
méthode est née, yujin-forge, qui est à moi et porte son nom. Les chiffres, les dates et les
identifiants de commit sont réels ; si un jour j'obtiens la permission des clients, je mettrai les
noms.

La seconde précision est plus importante, et je la répète dans le document principal parce que je
ne veux pas qu'on l'interprète de travers : **la méthode n'est pas sortie seulement de la casuistique
des échecs**. Elle est sortie de deux choses qui se sont combinées. D'un côté, de ma propre
connaissance de l'ingénierie des systèmes, que j'applique depuis bien avant que ces modèles
existent ; la plus grande partie de ce que j'exige dans les échelons est ce que j'ai toujours exigé
dans un projet bien mené. De l'autre côté, du fait que les incidents de ces cinq mois m'ont montré,
l'un après l'autre, **où les modèles appliquent ces principes de manière fragile** : où ils disent
avoir testé sans avoir testé, où ils estiment avec un air sûr d'eux, où ils comblent un trou dans
les règles métier avec une idée qui leur est venue, où ils rapportent plus qu'ils n'ont fait. Les
cas qui suivent sont donc la preuve des endroits où il faut serrer, pas l'origine de toute la
méthode. Lisez-les avec cette lentille.

---

## Comment citer

Dans n'importe quel document de la méthode, `[Ref. 26]` renvoie à l'entrée « Ref. 26 » de ce
fichier. Les entrées sont regroupées par système d'origine et, dans chaque groupe, en ordre
chronologique. À la fin il y a trois chronologies complètes, au cas où quelqu'un voudrait voir la
séquence entière, et une table qui rapporte chaque échec à l'échelon qui le couvre.

---

## A. yujin-forge : là où la méthode s'est formée (mai à octobre 2026)

### Ref. 1 — Naissance des standards de qualité (25 mai)

J'ai écrit le premier document de standards de qualité, `SQ.md`, le 25 mai (commit `2219f7a`).
C'est le premier « contrat de collaboration » entre l'humain et l'agent, et je l'ai écrit parce que
cela faisait deux semaines que je répétais au modèle les mêmes choses à chaque session : que mon
temps est sacré et ne se dépense pas sur ce qu'il peut résoudre seul ; qu'on ne laisse pas de dette
technique, ce qui casse se répare à la racine ; que la documentation se maintient à jour ; que le
périmètre est exact, ni plus ni moins que ce qui a été demandé. Rien de tout cela n'est nouveau en
ingénierie des systèmes. Ce qui était nouveau, c'était de devoir l'écrire pour un collaborateur qui
arrive chaque matin sans mémoire de la veille. C'est l'origine de l'échelon 1.

### Ref. 2 — Le premier registre d'anti-patrons (27 mai)

Le 27 mai (commit `73f4029`) j'ai ouvert `GOTCHAS.md` : un fichier où chaque erreur qui s'est
répétée reste notée avec un format fixe, comment elle sent, quelle est la cause racine, comment on
l'a réparée, et comment la détecter la prochaine fois avant qu'elle fasse mal. Je l'ai ouvert parce
que le modèle commettait la même erreur dans des sessions différentes, sans aucune mémoire de
l'avoir déjà commise. C'est la moitié « anti-patrons » de l'échelon 11.

### Ref. 3 — Les portes du flux, injectées seulement quand elles s'appliquent (2 juin)

Le 2 juin (commit `5b47475`) j'ai défini des portes explicites dans le flux de travail, numérotées
G1 à G9, et une porte de documentation, G-DOC, qui exige que la documentation soit mise à jour dans
le même commit que le changement. Et j'ai pris une décision qui s'est révélée importante : la
doctrine de chaque porte n'entre dans le prompt de l'agent qu'au moment où elle s'applique, pas
toujours, parce que le contexte est fini et que ce qu'on injecte en trop se paie en attention. C'est
l'antécédent direct de l'idée de « contrat d'échelon » qui s'injecte au franchissement de la porte.

### Ref. 4 — La politique de test se reformule (4 juin)

Jusqu'au 4 juin j'insistais sur « d'abord le test, ensuite le code » pour tout. Ce jour-là (commit
`a9f59c7`, document `testing-policy.md`) j'ai accepté que ça ne marche pas universellement : par
défaut les tests viennent après l'implémentation, le test-d'abord reste une option pour les
périmètres petits et bien définis, le squelette doit être au vert comme porte, et j'ai ajouté une
protection contre les boucles, une modale qui arrête tout quand l'agent tourne en rond sans
avancer. Je le raconte parce que cela montre que la méthode se corrige aussi elle-même quand une
règle à moi se révèle trop rigide.

### Ref. 5 — Les décisions se gèlent avant de construire (4 juin)

Avant un grand sprint, j'ai écrit et numéroté trois décisions structurelles (D1, D2, D3) dans un
document de décisions du 4 juin. C'était la première fois que je formalisais quelque chose que j'ai
toujours fait dans les projets classiques : la décision s'écrit avant de construire, avec une date,
pour que personne ne la discute ensuite de mémoire. C'est l'antécédent de l'échelon 6.

### Ref. 6 — J'élimine l'équipe multi-agents avec un chiffre en main (5 juin)

J'avais une équipe de cinq agents (directeur, analyste, programmeur, testeur, monteur de
squelettes) qui se passaient le travail entre eux. J'ai fait une expérience mesurée : cette équipe
a dépensé 60 dollars et 73 minutes et a livré quelque chose à moitié fait ; une seule session avec
un seul agent a pris 90 minutes et a livré quelque chose de publiable. Le 5 juin (commit `7584f8b`,
documenté dans un papier interne) j'ai éliminé l'équipe entière. C'est le premier cas de
« rétrospective avec un chiffre en main, et refonte », et c'est la raison pour laquelle l'échelon 23
exige des chiffres et non des impressions.

### Ref. 7 — Le plan devient la liste des éléments en attente (6 juin)

Le 6 juin (commit `4fc82c6`, plan du registre des éléments en attente) le plan de travail est
devenu, littéralement, la file des éléments en attente : une liste canonique, numérotée, avec des
commandes pour la gérer, qui se rafraîchit à chaque session. Il a cessé d'y avoir un « plan » d'un
côté et des « tâches » de l'autre. C'est l'origine de l'échelon 5.

### Ref. 8 — Honnêteté de vérification et types de flux (10 juin)

Le 10 juin (commits `7ab9d8a` et `2c552c0`, documents `verification-honesty.md` et
`workflow-kinds.md`) j'ai rendu la doctrine obligatoire dans chaque prompt et j'ai écrit la règle
d'« honnêteté de vérification » : vérifier que le filet passe réellement au rouge quand il doit y
passer, déclarer les angles morts, et faire des affirmations proportionnées à ce qui a été
vérifié. J'ai en outre séparé trois types de flux : projet nouveau, correction et évolution. C'est
l'origine de l'échelon 12 et de la moitié « rouge » de l'échelon 8.

### Ref. 9 — Du travail jeté pour ne pas avoir lu la carte (12 juin)

Le 12 juin, une session a commencé à construire sans lire le graphe de connaissance du projet, et
le travail de toute une après-midi a été bon à jeter parce qu'il contredisait des décisions déjà
écrites. De là vient la règle de lecture obligatoire de l'échelon 2 : la carte existe, mais si on
n'oblige pas à la lire, elle n'agit pas.

### Ref. 10 — Pilotes automatiques de 24 et 48 heures (du 14 au 21 juin)

Entre le 14 et le 21 juin j'ai laissé l'agent travailler seul pendant un jour, puis deux, avec un
mandat écrit : commit et push pour chaque pièce, sans demander, et je recevais un résumé. Je le
raconte parce que cela prouve que la méthode supporte une autonomie longue quand le contrat de
collaboration et le registre des éléments en attente sont bien faits ; et parce que c'est là que
j'ai appris à lire les résumés avec méfiance, ce qui est l'échelon 12.

### Ref. 11 — Mode diagnostic sur des systèmes d'autrui (juillet)

En juillet (document `diagnostic-mode.md`) l'agent a commencé à entrer dans des systèmes en
production de clients en mode diagnostic : lecture seule, périmètre borné, sans rien toucher. C'est
le premier niveau du périmètre de l'agent résident de l'échelon 23.

### Ref. 12 — Patrons de performance pris dans la production de la Mutuelle (22 juillet)

Le 22 juillet (commit `873339c`) j'ai incorporé à l'outil des patrons de montée en charge extraits
du système de la Mutuelle : celui des deux transactions et, surtout, « mesurer avant de toucher ».
C'était la première fois que la méthode se nourrissait d'un système déjà en production, et c'est un
antécédent de l'échelon 7.

### Ref. 13 — L'agent devient résident dans la production de la Mutuelle (14 août)

Le 14 août, l'agent a été installé à l'intérieur du système du client, comme assistant résident,
avec trois règles : une carte du système obligatoire avant d'opérer, « d'abord la solution
opérationnelle » quand quelque chose tombe en panne, et la capacité d'ouvrir des tickets. C'est
l'origine de la première moitié de l'échelon 23.

### Ref. 14 — Le dimensionnement comme porte (10 et 11 octobre)

Les 10 et 11 octobre (commits `c602725` et `0bd1b05`, document `sizing.md`) j'ai formalisé le
dimensionnement avant de construire, en choisissant parmi des options fixes, et je l'ai enregistré
comme une porte de plus (G9). Je l'ai formalisé tard, après le coup dur de Kikan que je raconte dans
la référence 15, et c'est justement la leçon de l'échelon 3.

### Ref. 15 — L'interface de persistance asynchrone dès la ligne un (13 octobre)

Le 13 octobre (commit `7391cc5`, document `persistence-interface.md`) j'ai écrit la règle selon
laquelle l'interface avec la base de données est asynchrone dès la première ligne, même si le
premier moteur est synchrone. C'est une décision « asymétrique » : elle coûte peu si vous vous
trompez et énormément si vous ne la prenez pas. Je le sais parce que dans Kikan je ne l'ai pas prise
à temps et la changer ensuite a coûté une étape entière de la réingénierie, la E6, avec trois
batteries de tests passées en asynchrone. C'est un cas de l'échelon 3.

### Ref. 16 — Le tour orphelin d'une heure quarante-trois (14 octobre)

Le 14 octobre l'agent a travaillé une heure et quarante-trois minutes de façon invisible pour moi,
et a fait six commits dans ce laps de temps. Ce fut un échec de la méthode, et un vilain. Je l'ai
réparé à la racine dans la version 1.18.0 (commit `b80a659`) : un veilleur de silence qui tue le
tour s'il cesse de donner signe de vie, une laisse entre processus pour que le fils meure avec le
père, et 28 tests. Cela tombe dans l'échelon 12 (le rapport doit être visible) et dans le 14 (en cas
de doute, le système ne continue pas).

---

## B. Autorizaciones : la méthode sous charge réelle (juin à octobre 2026)

### Ref. 17 — La conception initiale que le dépôt a dépassée (11 juin)

Autorizaciones a démarré avec un document de conception (l'« option C »). Le dépôt l'a dépassé à
toute vitesse : ce qui a été construit était bien plus que ce que disait le papier. La leçon qui
m'est restée, et qui est dans l'échelon 5, c'est que la spécification vaut comme point de départ et
que le plan vivant, ce sont les éléments en attente.

### Ref. 18 — Le premier audit des requêtes sans index (23 juin)

Le 23 juin j'ai fait le premier audit de « full scans » (des requêtes qui lisent la table entière
parce qu'il n'y a pas d'index) sur un système vivant. Les constats se sont transformés en éléments
en attente, pas en un rapport archivé. C'est l'origine de l'échelon 13.

### Ref. 19 — Leçons du cloud de Google (24 juin)

Les erreurs d'infrastructure des premières semaines sur le cloud de Google ont été écrites comme
des leçons pour ne pas les répéter. C'est la première version de ce qui est devenu ensuite le
manuel d'infrastructure de l'échelon 20.

### Ref. 20 — Le manuel d'utilisateur naît avec le système (26 juin)

Le 26 juin il y avait déjà un manuel d'utilisateur, avec le système à moitié construit. Je l'ai
fait ainsi à dessein : dans les projets classiques le manuel s'écrivait à la fin, quand plus
personne ne se souvenait de rien ; avec un modèle qui le régénère gratuitement, il n'y a aucune
excuse pour qu'il ne naisse pas avec le système. Échelon 20.

### Ref. 21 — Sauvegarde de seconde couche (13 juillet)

Avant de faire confiance au système avec des données réelles, j'ai mis deux couches de sauvegarde :
une locale et une autre dans le stockage de Google. Échelon 15 et manuel de reprise du 20.

### Ref. 22 — PND-300 : quatre tours jusqu'à la cause racine (14 juillet)

Un bug est revenu trois fois avant qu'on trouve la cause réelle, le 14 juillet. Chaque
« réparation » précédente avait porté sur le symptôme. C'est ici que « la réparation est à la racine
ou n'est pas une réparation », qui était déjà dans le contrat de collaboration, a cessé d'être une
phrase pour devenir une pratique : il faut mesurer l'hypothèse avant de toucher. Échelons 1 et 7.

### Ref. 23 — Audit de sécurité (16 juillet)

Le 16 juillet j'ai fait le premier audit de sécurité formel, avec des constats transformés en
éléments en attente. C'est celui qui m'a convaincu de traiter la sécurité comme un audit périodique
et non comme une liste qu'on coche une fois au début. Échelon 13.

### Ref. 24 — Manuel interne et manuel de reprise après sinistre (26 et 29 juillet)

Les 26 et 29 juillet (commits `6444ce6`, élément en attente 442, et `a30cee3`, élément en attente
459) j'ai laissé documenté tout l'opérationnel — déployer, récupérer, maintenir — de façon
« reproductible à la main, sans IA ». Le critère que j'ai utilisé, et qui est dans l'échelon 20,
c'est que si demain il n'y a pas d'agent, une personne de confiance qui ne programme pas puisse
suivre le manuel.

### Ref. 25 — Le fail-closed comme réflexe (27 juillet)

Le 27 juillet (commit `e18406d`, élément en attente 452) : si une table n'existe pas ou si une
recherche échoue, la ligne reste simplement sans son bouton ; jamais on ne casse le listing entier.
En cas de doute, ne pas agir et ne pas casser. Et le test de cette correction a été prouvé en rouge
« sans le try/except », c'est-à-dire qu'on a démontré que sans la protection le listing se cassait.
Échelons 8 et 14.

### Ref. 26 — Les compteurs qui ne coïncidaient pas : 1 355 contre 1 234 (6 et 7 août)

C'est, pour moi, l'exemple le plus complet de « vérifier avec un instrument ». Un compteur de
l'écran affichait 1 355 approbations et la requête sur la base en montrait 1 234. Les 6 et 7 août
(commits `ab3e529`, élément en attente 517, et `1f5feb9`, élément en attente 514) on a vérifié la
cause racine directement sur la production en lecture seule, on a décomposé la différence chiffre
par chiffre (145 de trop, 24 de moins ; 145 moins 24 font 121), on a écrit un test qui a été prouvé
EN ROUGE contre l'ancien critère, et le script de diagnostic est resté dans le dépôt pour la
prochaine fois. Échelons 8, 11 et 7.

### Ref. 27 — Symétrie entre producteur et consommateur (6 août)

Le 6 août (commits `50fe968`, élément en attente 510, et `7251129`, élément en attente 509) j'ai
imposé que la « cause d'attente » que voit l'utilisateur se calcule avec les MÊMES portes que celles
avec lesquelles le robot décide, et que la liste des colonnes de la grille soit définie par le
serveur et consommée par le frontend. Ainsi elles ne peuvent pas diverger. C'est la règle « toute
liste a un seul propriétaire » de l'échelon 11.

### Ref. 28 — Bouton de panique avec verrou, mode à blanc de l'approbateur, veilleur avec gardes (7 août)

Le 7 août (commit `0954740`, élément en attente 524) les verrous du système ont été posés : un
bouton de panique à double sécurité, l'approbateur automatique qui tourne d'abord en mode à blanc
(il fait tout sauf approuver, et enregistre ce qu'il aurait approuvé), et un veilleur qui pousse ce
qui est bloqué avec des gardes pour ne pas pousser deux fois. Échelon 14.

### Ref. 29 — Les règles de domaine écrites dans le commit (10 août)

Le 10 août (commit `0ae3ae6`, élément en attente 550) le message du commit dit, textuellement :
« règle Pablo : approuvée + solde = revient », « décision Pablo 2026-08-10 ». La décision métier est
restée avec une date et un propriétaire, collée au code qui l'implémente. Échelon 6.

---

## C. Kikan : la méthode mûre (août à octobre 2026)

### Ref. 30 — Démarrage avec la méthode déjà écrite, et la série d'audits AUD-* (du 21 au 29 août)

Kikan a été le premier projet à démarrer avec tout ce qui précède déjà écrit dès le premier jour :
un fichier de projet opérationnel et des éléments en attente comme plan dès le premier commit
(21 août). Les 28 et 29 août j'ai fait une série d'audits précoces (AUD-1, AUD-2…) qui s'est
transformée directement en 19 documents d'éléments en attente. Échelons 2, 5 et 13.

### Ref. 31 — Intégration continue dès la première semaine ; déploiement comme paquet (28 août, 23 et 24 septembre)

Les tests ont tourné sur GitHub dès la première semaine (`ci.yml`, 28 août). Le déploiement est
arrivé le 23 septembre (`deploy.yml`, commit `bb801ed`) : un paquet, avec la configuration qui vit
sur le serveur et non dans le dépôt, et la version du runtime figée. Que le déploiement soit arrivé
un mois après le démarrage est l'erreur qui motive l'échelon 4.

### Ref. 32 — Le déploiement se durcit à coups d'éléments en attente (du 30 septembre au 4 octobre)

Entre le 30 septembre et le 4 octobre il y a eu cinq éléments en attente d'affilée rien que pour
que le déploiement fonctionne bien : l'URL publique dans les deux environnements (`f85c3c9`),
recharger le service avant de redémarrer et avant de revenir en arrière (`513c8d0`, élément en
attente 108), une fixture qui réconcilie au lieu de dupliquer (`076df76`, élément en attente 134),
le matériel du client hors de l'arborescence qui se réplique (`9d76af8`, élément en attente 130), et
la batterie de tests qui ne salit plus la configuration qui voyage dans le déploiement (`0bd20a8`,
élément en attente 107, 3 octobre). Si le squelette avait été déployé vide la première semaine,
ces cinq coups durs auraient été reçus avec zéro fonctionnalité en jeu. Échelons 4 et 15.

### Ref. 33 — Promotion de l'UAT vers la production (4 et 8 octobre)

Les 4 et 8 octobre (commits `4eb5ad7`, élément en attente 027, et `7658e2e`) un circuit explicite a
été mis en place pour passer la configuration et les campagnes de l'environnement de test vers
celui de production. Échelon 15.

### Ref. 34 — Le schéma dérivé du code, avec verrou (11 octobre)

Dans l'étape 1 de la réingénierie de la persistance (commits `6113319` et `68819ce`) l'inventaire
des tables et des champs a été dérivé du code lui-même, avec un test qui le protège, et il a été
ouvert sur le tableau partagé pour que je le révise. C'est une liste avec un seul propriétaire : le
code. Échelon 11.

### Ref. 35 — Le cliquet statique, et le compteur qui ne voyait pas (du 11 au 13 octobre)

Dans l'étape 6 de la réingénierie (commits `06b2734`, `f6e5221`, `2fc6239`, `1d55a93`) j'ai posé
un « cliquet » : un compteur d'appels à la base sans `await`, c'est-à-dire sans attendre le
résultat, qui ne peut que descendre et jamais monter. Et il s'est passé quelque chose qui vaut la
peine d'être raconté : on a découvert DEUX fois que le compteur ne voyait pas des parties du code.
D'abord 70 appels, puis 84, avec le compteur à zéro. Si l'instrument n'est pas vérifié, le chiffre
rassure et ment. Échelon 7.

### Ref. 36 — Les compteurs qui mentaient et les cinq règles de la section 11.b (13 et 14 octobre)

Textuel des commits du 13 octobre (`880ac0f`, `f955620`) : « le compteur de E7.5 mentait sur une
base avec l'ALTER déjà appliqué » ; « il y en a 44, pas 27 ». Et quelques jours plus tôt, un plan
affirmait qu'il y avait 121 boucles d'un certain type et celui qui a exécuté en a mesuré 79. De
tout cela j'ai écrit la section 11.b du document de réingénierie, avec les cinq règles qui sont
aujourd'hui l'échelon 7 : compteur gardé ; si l'instrument n'existe pas, on le construit ; on
l'audite dans les deux directions ; l'approximatif se marque ; et celui qui exécute vérifie les
chiffres de celui qui a planifié. Avec la phrase qui résume tout : « trois affirmations sur quatre
étaient fausses ; là où il y avait un instrument, exact ».

### Ref. 37 — Budget de requêtes et le plafond resserré sur le mesuré (14 octobre)

Dans l'étape 8 (commits `5926b3f`, `10ada00`) chaque chemin de l'application s'est retrouvé avec
un budget de requêtes à la base mesuré et protégé par un test, et le changement de moteur de base
de données est resté comme un interrupteur par environnement. Dans l'étape 9 (`0730082`,
`7f5f1af`) le plafond a été resserré sur le mesuré plus une petite marge : 63 sur 60. Le budget
n'est pas un chiffre inventé. Échelon 7.

### Ref. 38 — Rétention par table, et un rapport d'intégrité fait par une autre session (14 octobre)

Dans les étapes 10 et 12 (commits `f72b15a`, `b266f11`) le vrai paquet s'est mis à apporter les
scripts de migration, la rétention des données a été déclarée par table et bornée en production, et
un rapport d'intégrité fait par une session distincte de Claude Code, qui n'avait pas construit le
système, a été absorbé comme éléments en attente. C'est l'auditeur distinct du constructeur de
l'échelon 13.

### Ref. 39 — Le déploiement se contente d'empaqueter, et le quota qui a fondu (14 octobre)

Les tests tournaient trois fois pour chaque commit, entre 16 et 27 minutes à chaque fois ; en
16 jours, 2 000 minutes de quota de GitHub Actions ont été consommées, et une journée de 23 pushes a
achevé de le faire fondre. Le 14 octobre (commit `39497b0`) j'ai scindé le circuit : les tests
tournent UNE seule fois, dans l'intégration continue ; le déploiement attend ce résultat et se
contente d'empaqueter. De 16 à 27 minutes par commit, à 11. Échelon 15.

### Ref. 40 — Deux portes d'administrateur en vingt-quatre heures (15 octobre)

Le 15 octobre, deux portes d'administrateur ont été créées en une seule journée (éléments en
attente 223 et 257). Une relecture externe l'a détecté ; j'en ai retiré une (commits `69bdab2`,
`20fdbe7`, `1558ee4`) et il est resté une voie unique. Je le raconte comme preuve que la méthode
supporte « défaire vite » sans drame, et de la raison pour laquelle l'audit doit être fait par
quelqu'un qui n'a pas construit. Échelons 13 et 14.

### Ref. 41 — L'audit de qualité : une vulnérabilité, un composant énorme, un fichier de projet de 9 661 lignes (15 octobre)

L'audit de qualité du 15 octobre a trouvé une vulnérabilité connue dans une dépendance, un
composant d'écran de 2 679 lignes, huit modules dupliqués entre la version web et la version mobile,
et un `CLAUDE.md` qui avait grossi jusqu'à 9 661 lignes et 789 kilo-octets, un fichier qu'à ce
stade plus personne ne lit, pas même le modèle. De là vient la règle de l'échelon 2 : le fichier de
projet est le programme, pas l'historique, et le livre de cas va à part. Échelons 2, 11 et 13.

### Ref. 42 — Des secrets collés dans le chat (14 et 16 octobre)

Le 14 octobre, une clé de la base de données s'est retrouvée imprimée dans une transcription, et le
16 des clés d'API sont apparues collées dans le chat. Aucune des deux n'a été « vue par personne »,
et il faut les faire tourner toutes les deux quand même, parce qu'un secret qui a été dans un chat,
dans un journal ou dans un commit n'est plus un secret. Échelon 15.

### Ref. 43 — Trois rapports qui n'étaient pas ce qu'ils disaient (du 14 au 16 octobre)

Trois cas petits et très parlants pour l'échelon 12. Le 14 octobre, une erreur d'authentification
a été rapportée par l'outil avec la mention « success ». Le 16, le CORS du serveur s'est dérivé du
seul premier nom de domaine, et l'assistant de configuration de l'environnement de test renvoyait
une erreur 500 que le rapport ne mentionnait pas. Et l'application mobile perdait les onglets dans
des conditions que le rapport déclarait vérifiées. Les trois se corrigent avec la même règle :
séparer le vérifié du cru et déclarer les angles morts.

### Ref. 44 — La batterie qui mourait par manque de mémoire et ressemblait à un test en échec

Une batterie entière de tests est « morte » par manque de mémoire (commit `1d7a20b`), et le
rapport l'a lue comme un test qui échouait. Tant qu'on n'a pas regardé la sortie complète, on n'a
pas compris qu'aucun test n'avait échoué : c'est le processus qui s'était effondré. C'est la raison
pour laquelle l'échelon 8 demande les chiffres du rouge et du vert, pas seulement le verdict.

---

## D. Ce que j'ai imposé en session, et ce que j'ai refusé

### Ref. 45 — Quatre corrections que j'ai faites en session et qui sont ensuite devenues des règles (octobre)

Il y a des règles de la méthode qui ne sont pas sorties d'un commit mais de corrections que j'ai
faites à l'agent en pleine session, et que j'ai formalisées ensuite. Je les cite parce qu'elles
montrent le second facteur de l'origine de la méthode : mon propre critère d'ingénierie face à
l'application fragile du modèle. « Compteur gardé, pas grep » : un chiffre qui alimente une décision
se mesure avec un programme qui a un test, pas avec une recherche de texte. « Mesure l'hypothèse,
pas seulement le symptôme » : quand j'apporte une cause sous forme d'impression, il faut la mesurer
avant de construire, parce que j'ai en général raison sur le symptôme et que la cause est en
général juste à côté. « Valide les limites avec le journal, pas avec la prose » : un refus du modèle
ne prouve pas que la limite est appliquée ; il faut forcer l'invocation et lire le journal. Et
« compare d'abord la version publiée » : devant un « c'est toujours cassé », regarder quelle version
tourne là où je vois le problème avant de recommencer à diagnostiquer. Échelons 7 et 12.

### Ref. 46 — Les projets que j'ai refusés, et d'où sortent les critères excluants (17 octobre)

Les deux critères excluants de l'échelon 0 ne sortent pas des projets que j'ai acceptés mais de
ceux que j'ai refusés. J'ai refusé des technologies héritées sans dépôt accessible ou avec des
dépôts qui ne suivent pas un standard, parce que sans dépôt il n'y a nulle part où laisser la
preuve. Et j'ai refusé des technologies qu'on ne peut pas tester de bout en bout, où l'on ne peut
pas exécuter les écrans et accéder à chaque élément de l'interface avec ses différentes méthodes en
validant que le changement est arrivé jusqu'au backend. J'ai précisé à ce moment-là, et je le
maintiens, que NAC3 n'est pas obligatoire : ce qui l'est, c'est de tester depuis l'exécution des
écrans.

---

## E. Chronologies complètes

Je les mets au cas où quelqu'un voudrait voir la séquence entière et non un cas isolé. Chaque
ligne apporte la preuve telle qu'elle se trouve dans les dépôts.

### E.1 yujin-forge

| Date | Moment | Ce qui a changé | Preuve |
|---|---|---|---|
| 25 mai | Naissance des standards de qualité | Premier contrat de collaboration : temps de l'humain, zéro dette, documentation à jour, périmètre exact | `2219f7a` |
| 27 mai | Premier registre d'anti-patrons | Format fixe : odeur, cause racine, réparation, détection précoce | `73f4029` |
| 2 juin | Portes G1 à G9 et G-DOC | La doctrine n'entre dans le prompt que quand elle s'applique | `5b47475` |
| 4 juin | Politique de test reformulée | Tests après l'implémentation par défaut ; squelette au vert ; protection contre les boucles | `a9f59c7`, `testing-policy.md` |
| 4 juin | Décisions gelées avant le sprint | D1, D2, D3 écrites et numérotées | document de décisions du 4 juin |
| 5 juin | L'équipe multi-agents est éliminée | 60 dollars et 73 minutes contre 90 minutes | `7584f8b` |
| 6 juin | Le plan, ce sont les éléments en attente | File canonique, numérotée, rafraîchie à chaque session | `4fc82c6` |
| 10 juin | Doctrines obligatoires ; honnêteté de vérification ; types de flux | Rouge réel, angles morts, affirmations proportionnées | `7ab9d8a`, `2c552c0` |
| du 14 au 21 juin | Pilotes automatiques de 24 et 48 heures | Autonomie longue avec mandat écrit | notes de session |
| 5 et 10 juillet | Mode diagnostic | Lecture seule sur des systèmes d'autrui | `diagnostic-mode.md` |
| 22 juillet | Durcissement de la performance | Patrons de montée en charge pris dans la production | `873339c` |
| 14 août | Agent résident en production | Carte du système, solution opérationnelle d'abord, tickets | notes de session |
| 10 et 11 octobre | Dimensionnement comme porte | Options fixes, enregistrées | `c602725`, `0bd1b05` |
| 13 octobre | Interface de persistance asynchrone | Décision asymétrique | `7391cc5` |
| 14 octobre | Tour orphelin de 1 h 43 → 1.18.0 | Veilleur de silence, laisse entre processus, 28 tests | `b80a659` |

### E.2 Autorizaciones

| Date | Moment | Ce que cela a apporté | Preuve |
|---|---|---|---|
| 11 juin | Document de conception initial | Dépassé par le dépôt en quelques semaines | document de conception |
| 23 juin | Audit des requêtes sans index | Constats transformés en éléments en attente | document d'audit |
| 24 juin | Leçons du cloud de Google | Erreurs d'infrastructure écrites comme leçons | document de leçons |
| 26 juin | Manuel d'utilisateur | Naît avec le système | manuel |
| 13 juillet | Sauvegarde de seconde couche | Locale et dans le cloud | commit de sauvegarde |
| 14 juillet | PND-300, quatre tours | Réparation à la racine ou ce n'est pas une réparation | élément en attente 300 |
| 16 juillet | Audit de sécurité | Périodique, génère des éléments en attente | document d'audit |
| 26 et 29 juillet | Manuels interne et de reprise | Reproductibles à la main, sans IA | `6444ce6`, `a30cee3` |
| 27 juillet | Fail-closed comme réflexe | La ligne reste sans bouton ; le listing ne casse pas | `e18406d` |
| 6 et 7 août | Compteurs 1 355 contre 1 234 | Cause racine sur la production, test en rouge, script dans le dépôt | `ab3e529`, `1f5feb9` |
| 6 août | Symétrie producteur/consommateur | Une seule source pour les causes et les colonnes | `50fe968`, `7251129` |
| 7 août | Bouton de panique, mode à blanc, veilleur | Verrous | `0954740` |
| 10 août | Règles de domaine dans le commit | Avec date et propriétaire | `0ae3ae6` |

### E.3 Kikan

| Date | Moment | Ce que cela a apporté | Preuve |
|---|---|---|---|
| 21 août | Démarrage avec la méthode écrite | Fichier de projet et éléments en attente dès le premier jour | premier commit |
| 28 et 29 août | Série AUD-* | 19 documents d'éléments en attente | documents d'éléments en attente |
| 28 août | Intégration continue | Tests sur GitHub dès la première semaine | `ci.yml` |
| 23 et 24 septembre | Déploiement comme paquet | Configuration sur le serveur ; runtime figé | `deploy.yml`, `bb801ed` |
| du 30 septembre au 4 octobre | Déploiement durci | Cinq éléments en attente d'affilée | `f85c3c9`, `513c8d0`, `076df76`, `9d76af8`, `0bd20a8` |
| 4 et 8 octobre | Promotion UAT vers PROD | Circuit explicite | `4eb5ad7`, `7658e2e` |
| 11 octobre | Schéma dérivé du code | Avec verrou, ouvert sur le tableau partagé | `6113319`, `68819ce` |
| du 11 au 13 octobre | Cliquet statique | Le compteur ne voyait pas : 70, puis 84 | `06b2734`, `f6e5221`, `2fc6239`, `1d55a93` |
| 13 octobre | Compteurs qui mentaient | « il y en a 44, pas 27 » | `880ac0f`, `f955620` |
| 14 octobre | Budget de requêtes ; plafond 63 sur 60 | Mesuré plus une marge | `5926b3f`, `10ada00`, `0730082`, `7f5f1af` |
| 14 octobre | Les cinq règles de 11.b | Compteur gardé, audit dans les deux directions | document de réingénierie, 11.b |
| 14 octobre | Rétention par table ; intégrité externe | Rapport d'une autre session absorbé comme éléments en attente | `f72b15a`, `b266f11` |
| 14 octobre | Le déploiement se contente d'empaqueter | De 16-27 minutes à 11 | `39497b0` |
| 15 octobre | Deux portes d'administrateur | Une retirée en 24 heures | `69bdab2`, `20fdbe7`, `1558ee4` |
| 15 octobre | Audit de qualité | Vulnérabilité, composant de 2 679 lignes, fichier de 9 661 lignes | document d'audit |

---

## F. Chaque échec, et l'échelon qui le couvre

Cette table est, d'une certaine façon, la preuve de l'échelle : chaque coup dur doit tomber dans un
échelon. S'il en apparaissait un qui ne tombe dans aucun, il manquerait un échelon.

| Échec | Référence | Échelon qui le couvre | État |
|---|---|---|---|
| L'équipe multi-agents qui dépensait le double et livrait la moitié | Ref. 6 | 23, rétrospective chiffrée | clos |
| Du travail jeté pour ne pas avoir lu la carte | Ref. 9 | 2, lecture obligatoire | clos |
| PND-300 : trois réparations qui n'étaient pas à la racine | Ref. 22 | 1, zéro dette ; 7, mesurer | clos |
| Compteurs 1 355 contre 1 234 | Ref. 26 | 7, instrument ; 11, symétrie | clos |
| 3,4 millions de lignes par an sur des fichiers JSON | Ref. 15 | 3, dimensionner | clos |
| Compteurs qui mentaient ; cliquet à zéro | Refs. 35 et 36 | 7, vérifier l'instrument | clos |
| Tour orphelin de 1 h 43 | Ref. 16 | 12 et 14 | clos |
| Tests trois fois par commit ; quota fondu | Ref. 39 | 15 | clos ; le quota doit être élargi |
| Deux portes d'administrateur en 24 heures | Ref. 40 | 13 et 14 | clos |
| Des secrets collés dans le chat | Ref. 42 | 15 | rotation en attente |
| Erreur d'authentification rapportée comme succès | Ref. 43 | 12 | en attente, une ligne |
| Fichier de projet de 9 661 lignes | Ref. 41 | 2 | en attente |
| CORS du premier domaine ; assistant de configuration avec erreur 500 | Ref. 43 | 15 et 11 | application en attente |
| L'application mobile perd les onglets | Ref. 43 | 12 et 14 | diagnostic fait ; correction en attente |
| Requêtes sans index sur un système vivant | Ref. 18 | 13 et 17 | clos |
| Audit de sécurité fait une fois, non comme routine | Ref. 23 | 13 et 18 | clos ; le calendrier est nouveau |
| Plafond resserré à ce qui a été mesuré ; quota fondu sans que personne ne regarde | Refs. 37 et 39 | 7, 15 et 21 | clos |
| Le tour orphelin s'est trouvé par le journal, pas par le code | Ref. 16 | 16 et 22 | clos |
