# Urazuke — le chemin évolutif-correctif : normaliser un système qui n'est pas né avec la méthode, puis gravir l'échelle

Auteur : Pablo Kuschniroff, assisté par Claude Code. Version 1, 18 octobre 2026. Cette page est la
seconde moitié de la méthode : le [document principal](ESCALERA_METODOLOGICA.md) décrit le chemin
d'un projet neuf, et ici je décris ce que je fais quand le système existe déjà, qu'il a été fait
par quelqu'un d'autre (ou par moi-même, en « vibecodant » sans preuve), et qu'il faut maintenant
le corriger ou le faire grandir. Les mots étranges sont dans le glossaire du document principal ;
les cas réels, dans les [références](REFERENCIAS.md). Dépôt public :
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## Pourquoi cette page existe

Quand j'ai écrit l'échelle, je l'ai écrite en regardant le dossier vide : l'échelon 0 décide si le
projet s'aborde, le 4 déploie le squelette sans fonctionnalité, et c'est seulement au 5
qu'apparaît la première chose que l'utilisateur va voir. C'est le cas propre, et c'est celui qui
enseigne le mieux. Mais ce n'est pas le cas le plus fréquent. Dans la pratique, la plupart du
temps quand on m'appelle il y a un système qui tourne déjà, avec des utilisateurs qui en
dépendent, fait par quelqu'un qui n'est plus là ou par un modèle à qui personne n'a demandé de
preuve, et la demande est « répare ça » ou « ajoute-lui ceci ». Mon propre outil est entré dans
des systèmes d'autrui en mode diagnostic bien avant que l'échelle ne soit écrite [Ref.
11](REFERENCIAS.md#ref-11), et la première fois que la méthode s'est nourrie d'un système en
production, c'était en en regardant un qui existait déjà [Ref. 12](REFERENCIAS.md#ref-12).

Et il y a ici un piège que je veux nommer avant d'aller plus loin : la tentation, face à un
legacy, est de choisir entre deux extrêmes qui sont tous les deux mauvais. Le premier est « je le
réécris avec la méthode, depuis zéro » : cela sonne propre, et cela finit presque toujours par un
deuxième système qui n'arrive jamais à remplacer le premier. Le second est « je lui applique la
boucle directement, c'est bien à ça que servent les échelons 5 à 12 » : cela sonne pragmatique, et
c'est construire sur du sable, parce que la boucle tient pour acquis qu'il existe un contrat, une
carte, un environnement de test, une batterie qui tourne et un déploiement qui se répète. Rien de
tout cela n'existe dans un système qui n'est pas né avec la méthode. Ce chemin est celui qui passe
par le milieu : **on normalise d'abord, sans réécrire, et ensuite on gravit l'échelle**.

## Les cas d'utilisation de la méthode

La méthode a trois cas d'utilisation, et il vaut mieux savoir dans lequel vous êtes avant d'ouvrir
l'agent, parce que cela change par où l'on entre.

| Cas | Point de départ | Par où l'on entre | Ce qu'il y a avant la première fonctionnalité | Où c'est écrit |
|---|---|---|---|---|
| **Projet neuf** | Dossier vide et un propriétaire avec une demande. | Échelon 0, et de là les vingt-quatre dans l'ordre. | Tout le tronçon de démarrage avant la première fonctionnalité. | Le document principal, les vingt-quatre contrats et le manuel du cours. |
| **Évolutif-correctif sur un système fait avec la méthode** | Le système a déjà gravi l'échelle : il a un contrat, une carte, des éléments en attente clos avec leur preuve, une batterie, un déploiement et des manuels. | Échelon 5 : on ouvre un bloc et on suit la boucle ; le 13 périodique ; le 23 à la clôture de l'étape. | Aucune : c'est l'échelon 23 qui revient au 0 pour l'étape suivante, et c'est déjà dans la Partie B du document principal. | Le document principal (phase 4, exploitation). |
| **Évolutif-correctif sur un système fait sans la méthode** | Un système qui tourne, avec des utilisateurs, sans aucun de ces artefacts ou avec quelques-uns à moitié faits. | Le tronçon de normalisation de cette page (N0 à N7), et seulement ensuite la boucle, en mode correctif ou évolutif. | Tout le tronçon de normalisation, avant de toucher la première ligne de fonctionnalité. | Cette page et le manuel du cours, partie 2. |

Ce qui reste dehors, nommé pour qu'il n'y ait pas de confusion : la **migration technologique**
(changer de plateforme, de langage, de base de données) n'est pas un cas d'utilisation de la
méthode ; c'est un autre projet, et en général cela tombe dans les critères excluants de l'échelon
0 [Ref. 46](REFERENCIAS.md#ref-46). Si le système dont vous héritez n'a pas de dépôt accessible,
ou si ses écrans ne peuvent pas être pilotés par programme et ne peuvent pas non plus le devenir,
ce qui convient n'est pas de le normaliser mais de faire un projet neuf qui le remplace, avec
l'échelon 0 en entier.

Et une précision qui vaut pour le troisième cas : peu importe que le legacy soit celui d'une autre
équipe ou le vôtre. Un système que vous avez construit avec un modèle, sans preuve, il y a trois
mois, est exactement aussi legacy que celui qu'un prestataire a fait il y a trois ans. Ce qui
change, c'est l'effort de le lire, pas le chemin.

## Le principe : normaliser sans réécrire, avec tous les intrants

Normaliser, c'est amener le système à l'état que la méthode tient pour acquis au moment d'ouvrir
la boucle. Et je le fais avec trois règles que je ne négocie pas.

Et quelque chose qui précède les trois règles : sur ce chemin non plus, il n'y a pas de délais. La
méthode est un procédé, pas une promesse de vitesse ; normaliser un legacy prend le temps que le
legacy demande, et la seule chose que je fixe, c'est l'ordre et les portes.

**Première : on ne réécrit pas.** La normalisation ne touche pas à la fonctionnalité. Elle met
autour du système ce qui lui manque (le contrat, la carte, l'environnement de test, la batterie,
le déploiement reproductible, les verrous sur ce qui agit déjà sur le monde) et laisse le système
faire ce qu'il faisait. Un legacy se casse plus souvent par l'enthousiasme de « tout ranger » que
par le bug qu'il fallait corriger.

**Deuxième : deux vitesses.** Il y a une part de la dette qui se paie avant tout changement, et
que j'appelle la **ceinture de sécurité** : pouvoir faire tourner le système dans un environnement
de test avec des données proches des vraies, le déployer de façon reproductible, avoir les secrets
hors du code, et avoir une batterie de caractérisation des flux critiques qui passe au rouge si
l'une de ces choses change. La ceinture est une **porte dure** : rien ne se change sans elle, avec
une seule exception écrite pour l'urgence en production, que j'explique plus bas. Le reste de la
dette se paie **au fur et à mesure qu'on y touche** : quand un bloc entre dans un module, les
éléments en attente de normalisation de ce module entrent avec lui. Jamais « un grand nettoyage
général » avant de commencer.

**Troisième : tous les intrants des étapes précédentes doivent exister, même s'il faut les
récupérer par autodécouverte.** C'est la règle qui distingue ce chemin de « appliquer la boucle et
puis c'est tout ». Chaque échelon du tronçon de démarrage produit un artefact que les échelons
suivants lisent : le relevé initial, la fiche d'éligibilité, le contrat de collaboration, le
fichier de projet, l'arbre sémantique, le relevé de volumétrie, le dimensionnement, le relevé des
environnements, les portes. Dans le projet neuf, ces intrants sont écrits par le propriétaire avec
l'agent à partir de l'ingestion. Dans le legacy, personne ne les a écrits, et la boucle ne peut
pas démarrer sans eux. La solution n'est pas de les sauter : c'est que l'agent les **récupère du
système lui-même**, en lisant le code, le schéma de la base, la configuration des environnements,
les journaux et ce qu'il y a de documentation, et que chaque affirmation de ces documents porte
une marque indiquant d'où elle sort. Les marques que j'utilise sont au nombre de cinq : `[code]`,
`[base]`, `[configuration]`, `[documentation]` et `[inféré]`, plus `[métier]` pour ce que le
propriétaire a confirmé ou corrigé. Un document récupéré avec ses marques est un document qui se
vérifie sans lire de code : le propriétaire regarde les affirmations marquées `[inféré]` et les
confirme ou les corrige, et il regarde celles marquées `[code]` pour voir si le système fait ce
qu'il croit qu'il fait. Ce qui ne coïncide pas est une **divergence**, et les divergences sont
l'or de la normalisation : ce sont les bugs que personne n'a signalés et les règles que personne
n'a décidées.

### Le tableau des intrants récupérés

Pour que cela ne reste pas abstrait, voici chaque intrant du tronçon de démarrage, où il naît dans
le projet neuf, et comment on l'obtient sur le chemin évolutif-correctif.

| Intrant | Dans le projet neuf, il est produit par | Sur le chemin évolutif-correctif | Qui confirme |
|---|---|---|---|
| `docs/INITIAL_SURVEY.md` | Le propriétaire, à la main, dans l'ingestion (échelons 0 et 2). | L'agent le rédige depuis le code, la base et la configuration, avec les marques de source, en N2 ; le propriétaire ajoute ce que seul le métier sait. | Le propriétaire, affirmation par affirmation sur ce qui est `[inféré]`. |
| `docs/ELIGIBILITY_CRITERIA.md` et `docs/ELIGIBILITY.md` | Échelon 0. | N0, avec quatre critères de plus, propres au legacy. | Le propriétaire décide. |
| `docs/WORKING_AGREEMENT.md` | Échelon 1. | N1, avec cinq règles de plus, propres au legacy. | Le propriétaire. |
| `PROJECT.md`, `docs/SEMANTIC_TREE.md`, `docs/STATUS.md` | Échelon 2, depuis le relevé. | N2, depuis le système, avec les marques ; plus la liste des divergences. | Le propriétaire parcourt l'arbre et décide chaque divergence. |
| `docs/AUDIT_[date].md` | Échelon 13, à la fin. | N3, au début : c'est l'inventaire de la dette. | Le propriétaire lit et vérifie deux constats. |
| `docs/ENVIRONMENTS_SURVEY.md`, l'environnement de test, l'intégration continue, le déploiement reproductible, `docs/GATES.md` | Échelons 4 et 15. | N4, la ceinture de sécurité, avec la batterie de caractérisation. | Le propriétaire voit la capture et la deuxième exécution du déploiement. |
| `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`, `docs/PRODUCER_CONSUMER_MAP.md` | Échelons 14 et 11. | N5, par inventaire du code et de la base. | Le propriétaire confirme verrou par verrou. |
| `docs/VOLUME_SURVEY.md`, `docs/SIZING.md` | Échelon 3, avec des chiffres que donne le métier. | N6, avec des chiffres mesurés dans la base et les journaux (échelon 7 appliqué au dimensionnement). | Le propriétaire n'apporte que ce qui ne peut pas se mesurer. |
| `docs/PENDING.md` | Échelon 5, depuis la demande du client. | N7, depuis l'audit, les divergences et la demande du client, avec la marque « bloque / se paie quand on y touche / peut attendre ». | Le propriétaire ordonne. |
| `docs/DECISIONS.md`, `docs/GOTCHAS.md`, `docs/LOCKS.md`, `docs/DEPLOYMENT.md` | Échelons 6, 11, 14, 15. | Ils se créent vides ou se complètent en N2, N4 et N5, et grandissent dans la boucle comme dans le projet neuf. | Le propriétaire. |

S'il manque l'un de ces fichiers à la fin de N7, le tronçon n'est pas gravi. Peu importe que le
système « fonctionne » : la boucle en aura besoin dès la première session.

## Le tronçon de normalisation : les huit stations

Je les appelle des stations et non des échelons, et je les numérote de N0 à N7, pour qu'elles ne
se confondent pas avec les vingt-quatre de l'échelle. Ce ne sont pas de nouveaux échelons : ce sont
les échelons du démarrage et trois de l'exploitation (le 11, le 13 et le 14), dans un autre ordre et
avec une autre entrée. Dans le projet neuf, l'entrée est le relevé ; ici l'entrée est le système,
et c'est l'agent qui fait la lecture.

| Station | Échelons d'origine | Ce qui change par rapport au projet neuf |
|---|---|---|
| N0 — Éligibilité d'un système existant | 0 | Sept prérequis vérifiés par le modèle en faisant, pas en demandant ; un prérequis au rouge n'est pas un refus, c'est un projet préalable. |
| N1 — Le contrat de collaboration pour un legacy | 1 | Cinq règles de plus : ne pas refactoriser ce qui n'a pas été demandé, lire avant de toucher, noter au lieu de réparer en passant, le comportement actuel est la spécification, rien n'entre sans la caractérisation au vert. |
| N2 — La lecture du système | 2 | Le relevé, le fichier de projet et l'arbre sortent du code avec les marques de source ; la liste des divergences apparaît. |
| N3 — L'audit comme inventaire | 13 | Il vient en premier, pas en dernier, et chaque constat dit s'il bloque, s'il se paie quand on y touche, ou s'il peut attendre. |
| N4 — La ceinture de sécurité | 4, 7, 13 | Environnement de test avec des données, déploiement reproductible, secrets dehors, intégration continue, et la batterie de caractérisation. Porte dure. |
| N5 — Verrous et carte depuis le code | 14, 11 | Inventaire de tout ce qui agit sur le monde et de tous les contrats entre parties, avant de rien changer. |
| N6 — Dimensionner avec de vrais chiffres | 3, 7 | Les chiffres primaires se mesurent, ne se demandent pas ; le propriétaire n'apporte que ce qui n'est pas dans la base. |
| N7 — La file de normalisation | 5 | La dette et la demande du client, dans une seule file, avec la marque de vitesse et l'appariement par module. |

L'ordre compte. N3 vient avant N4 parce que l'audit dit ce qui doit entrer dans la ceinture (les
secrets qu'il a trouvés, les écrans qu'on ne peut pas piloter, le déploiement qu'on ne peut pas
répéter). N5 vient après la ceinture parce qu'inventorier les actions à conséquence exige de
pouvoir faire tourner le système dans un endroit où se tromper ne coûte rien. N6 vient à la fin
parce qu'il mesure sur l'environnement de test avec des données, qui n'existe que depuis N4. Et N7
ferme la marche parce qu'il réunit tout ce qui précède dans une seule file.

### L'ordre de la normalisation

Il n'y a pas de délais : chaque étape dure ce que le système demande, et la seule chose fixe,
c'est l'ordre.

| Étape | Stations | Ce qui se passe en plus |
|---|---|---|
| 1 | N0, N1, N2, N3 | Lecture du système avec le propriétaire à côté, qui confirme les nœuds et décide les divergences. Rien ne se change. À la clôture de l'étape : la carte récupérée et l'inventaire de la dette. |
| 2 | N4, N5 | La ceinture : environnement de test avec des données, déploiement répété deux fois, secrets rotés, batterie de caractérisation des flux critiques. Verrous confirmés sur ce qui agit déjà. À la clôture : le système tourne en test et la batterie est au vert. |
| 3 | N6, N7, et le premier bloc | Dimensionnement mesuré. La file ordonnée. On ouvre le premier bloc avec l'échelon 5, correctif ou évolutif, avec ses éléments en attente de normalisation appariés. À partir d'ici, c'est la boucle de toujours. |

Si le système est grand, ce qui grandit c'est l'étape 1 (il y a plus à lire) et la batterie de
caractérisation de l'étape 2 (il y a plus de flux). N7 ne grandit pas : une file de normalisation
qu'on ne peut pas écrire d'une traite est une file que personne ne tiendra à jour.

---

### N0 — Éligibilité d'un système existant : les prérequis qu'un modèle peut vérifier

- **Intention** : décider si ce système peut être pris en charge avec la méthode, avant d'y
  toucher, avec des critères qui ne dépendent pas d'une évaluation humaine mais de ce qu'un
  modèle de frontière peut faire ou ne pas faire avec le système. Si un prérequis n'est pas
  rempli, ce n'est pas un « ça ne passe pas » : c'est un **projet en soi**, préalable, pour que le
  système devienne éligible.
- **Quand** : une seule fois, avant toute autre chose.
- **Entrées** : le relevé initial court, un accès en lecture au dépôt et, si possible, à
  l'environnement où il tourne et à sa base.
- **Artefact** : `docs/ELIGIBILITY.md` avec la décision et les sept prérequis excluants du legacy,
  chacun vérifié par l'agent avec une preuve, pas déclaré par une personne :
  1. **On peut monter un environnement complet du système**, avec toutes ses sources, son modèle
     de données et sa persistance, depuis le dépôt et une copie des données.
  2. **Le code est compréhensible et abordable par un modèle de frontière** : l'agent peut le lire
     en entier et expliquer ce que fait chaque module sans inventer.
  3. **À partir du code, le modèle peut décrire dans un document la fonctionnalité complète du
     système**, sous une forme qu'un utilisateur final reconnaît comme son système et accepte.
  4. **Le frontend peut être parcouru par des outils de test** pour générer des tests de bout en
     bout, avec chaque élément accessible et l'effet dans le backend vérifiable (c'est X2).
  5. **Le système peut se construire et s'exécuter depuis les sources avec les outils disponibles
     aujourd'hui** : les dépendances se résolvent, les versions existent, rien ne dépend d'un
     binaire perdu.
  6. **Les données de production peuvent se copier et s'anonymiser** vers un environnement de
     test, et il existe une copie de sauvegarde qui a été restaurée au moins une fois.
  7. **Les intégrations externes ont un mode de test ou peuvent s'isoler en bordure** (une boîte
     factice, un prestataire en mode à blanc), pour que les actions à conséquence se testent sans
     conséquences.
- **Porte** : les sept au vert, avec la preuve de l'agent (l'environnement monté, le document de
  fonctionnalité écrit, un test de bout en bout d'un flux qui tourne). Chaque rouge se convertit
  en un projet préalable avec son propre critère de sortie.
- **Qui décide** : l'agent vérifie et présente la preuve ; le propriétaire décide s'il entreprend
  les projets préalables ou non.

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous qui le faites (ou le métier avec
vous), pas l'agent :

- `docs/INITIAL_SURVEY.md`, la version courte que vous pouvez écrire le premier jour : ce que fait
  le système et pour qui, selon le métier ; ce qui fait mal aujourd'hui (le bug qui motive la
  demande, ce qui manque) ; qui l'a fait et s'il est disponible ; où il tourne ; qui a accès à
  quoi ; s'il y a une sauvegarde et qui la fait. Une demi-page, incomplète à dessein : en N2
  l'agent la complétera depuis le système.
- `docs/ELIGIBILITY_CRITERIA.md` : la fiche de l'échelon 0 (X1, X2 et ceux qui pondèrent) plus les
  sept prérequis du legacy ci-dessus, chacun avec trois colonnes vides : vert ou rouge, la preuve
  (ce que l'agent a fait pour le vérifier), et le projet préalable s'il est au rouge.
- Un accès en lecture au dépôt pour l'agent, un accès à une copie des données (ou à la production
  en lecture seule) et à un endroit où il puisse tenter de monter l'environnement, avec les
  identifiants hors du chat. Sans cela, les prérequis 1, 5 et 6 ne peuvent pas se vérifier et
  restent au rouge.
- État minimal acceptable : l'agent peut cloner le dépôt et il a un endroit où tenter de lever le
  système.

**Initial :**

> We are going to assess whether this existing system can be taken over with the Urazuke method,
> with prerequisites that you verify by doing, not by asking. Read the initial survey in
> `docs/INITIAL_SURVEY.md` and the criteria sheet in `docs/ELIGIBILITY_CRITERIA.md`. Then, changing
> nothing in the system, verify each prerequisite with evidence: (1) try to set up a complete
> environment of the system from the repository and a copy of the data, with its sources, data
> model and persistence, and tell me exactly what you could and could not bring up; (2) read the
> whole code and tell me whether you can understand and work with it, module by module, naming
> what you cannot understand; (3) from the code alone, write `docs/FUNCTIONALITY_RECOVERED.md`: the
> complete functionality of the system described for an end user, screen by screen and process by
> process, marking what you inferred; (4) list every screen and say whether it can be driven by a
> test tool with each element accessible and the backend effect checkable, and prove it by writing
> and running one end-to-end test of one flow; (5) try to build and run the system from the sources
> with today's tools and report every dependency that does not resolve; (6) check whether the
> production data can be copied and anonymized into a test environment and whether a backup exists
> and has ever been restored; (7) list every external integration and say whether it has a test
> mode or can be isolated at the edge. For each prerequisite: green or red, the evidence (what you
> did and what happened), and, if red, what project would make it green. Do not decide: present me
> the sheet, and I decide. Reply in my language.

> [fr]
> Nous allons évaluer si ce système existant peut être pris en charge avec la méthode Urazuke, avec
> des prérequis que tu vérifies en faisant, pas en demandant. Lis le relevé initial dans
> `docs/INITIAL_SURVEY.md` et la fiche de critères dans `docs/ELIGIBILITY_CRITERIA.md`. Ensuite,
> sans rien changer dans le système, vérifie chaque prérequis avec une preuve : (1) essaie de
> monter un environnement complet du système depuis le dépôt et une copie des données, avec ses
> sources, son modèle de données et sa persistance, et dis-moi exactement ce que tu as pu et n'as
> pas pu lever ; (2) lis tout le code et dis-moi si tu peux le comprendre et travailler avec,
> module par module, en nommant ce que tu ne comprends pas ; (3) à partir du code seul, écris
> `docs/FUNCTIONALITY_RECOVERED.md` : la fonctionnalité complète du système décrite pour un
> utilisateur final, écran par écran et processus par processus, en marquant ce que tu as inféré ;
> (4) liste chaque écran et dis s'il peut être piloté par un outil de test avec chaque élément
> accessible et l'effet dans le backend vérifiable, et prouve-le en écrivant et en lançant un test
> de bout en bout d'un flux ; (5) essaie de construire et d'exécuter le système depuis les sources
> avec les outils d'aujourd'hui et rapporte chaque dépendance qui ne se résout pas ; (6) vérifie si
> les données de production peuvent se copier et s'anonymiser vers un environnement de test et s'il
> existe une sauvegarde qui a déjà été restaurée ; (7) liste chaque intégration externe et dis si
> elle a un mode de test ou peut s'isoler en bordure. Pour chaque prérequis : vert ou rouge, la
> preuve (ce que tu as fait et ce qui s'est passé) et, si c'est rouge, quel projet le rendrait
> vert. Ne décide pas : présente-moi la fiche, et c'est moi qui décide. Réponds dans ma langue.

Ce que je lui demande : que les prérequis se vérifient **en faisant** (monter, lire, écrire le
document, lancer un test), parce qu'un modèle de frontière peut faire ces quatre choses et
qu'alors l'éligibilité cesse d'être une opinion ; le document de fonctionnalité récupérée, qui est
la preuve la plus forte que le code est abordable, et qui est en outre le premier brouillon de ce
que N2 va convertir en carte ; et que chaque rouge vienne avec le projet qui le rend vert, parce
qu'un prérequis manquant n'est pas un refus mais un travail préalable avec son propre périmètre.

**Avant d'envoyer le prompt** de clôture : votre décision en une ligne, prise après avoir lu la
fiche avec la preuve de chaque prérequis ; et, pour chaque rouge, votre décision de savoir si le
projet préalable s'entreprend maintenant, plus tard, ou jamais (et alors le système n'est pas
éligible).

**De clôture :**

> Decision: [go / go after these prerequisite projects: … / no-go]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, each prerequisite with its colour and its
> evidence, and, for every red one, the prerequisite project as a pending item in `docs/PENDING.md`
> marked as blocking, with its own acceptance criterion: the prerequisite verified green. Include
> the questions you asked and my answers.

> [fr]
> Décision : [ça passe / ça passe après ces projets préalables : … / ça ne passe pas]. Écris la
> fiche finale dans `docs/ELIGIBILITY.md` avec la date, qui a décidé, chaque prérequis avec sa
> couleur et sa preuve, et, pour chacun au rouge, le projet préalable comme élément en attente dans
> `docs/PENDING.md` marqué comme bloquant, avec son propre critère d'acceptation : le prérequis
> vérifié au vert. Inclus les questions que tu as posées et mes réponses.

Vérification de complétude : chaque prérequis a-t-il la preuve de quelque chose que l'agent a
**fait**, et non une réponse de vous ? `docs/FUNCTIONALITY_RECOVERED.md` existe-t-il, et l'avez-vous
lu comme le propriétaire : décrit-il le système qu'il croit avoir ? A-t-il lancé un vrai test de
bout en bout d'un flux ? Chaque rouge a-t-il son projet préalable avec un critère de sortie ?
Signal d'alarme : tous au vert en une après-midi pour un système que personne ne comprend. L'agent
a répondu au lieu de faire.

---

### N1 — Le contrat de collaboration pour un legacy

- **Intention** : fixer les règles avant de toucher à quoi que ce soit, avec cinq règles de plus
  qu'à l'échelon 1, qui sont celles dont un système hérité a besoin pour que l'agent ne
  l'« améliore » pas de son propre chef.
- **Quand** : après N0, avant de rien lire.
- **Entrées** : vos préférences de travail, comme à l'échelon 1.
- **Artefact** : `docs/WORKING_AGREEMENT.md` avec les six règles de la méthode et les cinq du
  legacy.
- **Porte** : le contrat a une date et une version, et le fichier de projet (quand il existera, en
  N2) ordonne de le lire.
- **Qui décide** : le propriétaire.

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- Vos préférences de travail, dans une courte liste, comme à l'échelon 1 : la langue, à quel point
  vous voulez qu'il vous demande, quelle autonomie vous lui donnez, ce que vous ne tolérez pas.
- Une décision de votre part sur le niveau de risque que vous acceptez pendant la normalisation :
  si l'agent peut ou non déployer tout seul vers l'environnement de test (vers la production,
  jamais, tant que N4 n'est pas clos et l'échelon 15 gravi).
- `docs/ELIGIBILITY.md` (N0), clos.
- État minimal acceptable : vous savez répondre aux questions de l'échelon 1 et à celle du risque.

**Initial :**

> Before we touch anything, we are going to set the working agreement between you and me for a
> system that already exists and has users. Write `docs/WORKING_AGREEMENT.md` with the six rules
> of the method (my time is sacred; zero technical debt; exact scope; documentation in the same
> commit; never report as done what you have not verified; speak my language), each with one line
> explaining what it prevents, and these five rules for an inherited system: (7) Nothing is
> refactored that was not asked for, and no module is rewritten. (8) Code you do not understand
> is read before it is touched, and what you learn goes into the system map. (9) Anything strange
> you find (a secret in the code, a dead path, a duplicated rule, a query without an index) is
> logged as a pending item with its evidence, never fixed in passing. (10) Current behaviour is
> the specification until the owner says otherwise: a difference between what the code does and
> what the business says is a discrepancy for me to decide, not a bug for you to fix silently.
> (11) No change reaches the test environment without the characterization suite green. Add any
> rules you think this system needs, marked as proposals. If you need to know something about how
> I work in order to write this, ask me.

> [fr]
> Avant de toucher à quoi que ce soit, nous allons fixer le contrat de collaboration entre toi et
> moi pour un système qui existe déjà et qui a des utilisateurs. Écris `docs/WORKING_AGREEMENT.md`
> avec les six règles de la méthode (mon temps est sacré ; zéro dette technique ; périmètre
> exact ; documentation dans le même commit ; ne jamais rapporter comme fait ce que tu n'as pas
> vérifié ; parle ma langue), chacune avec une ligne expliquant ce qu'elle évite, et ces cinq
> règles pour un système hérité : (7) On ne refactorise rien qui n'ait été demandé, et on ne
> réécrit aucun module. (8) Le code que tu ne comprends pas se lit avant qu'on y touche, et ce que
> tu apprends va dans la carte du système. (9) Toute chose étrange que tu trouves (un secret dans
> le code, un chemin mort, une règle dupliquée, une requête sans index) se note comme élément en
> attente avec sa preuve, ne se répare jamais en passant. (10) Le comportement actuel est la
> spécification jusqu'à ce que le propriétaire dise autre chose : une différence entre ce que le
> code fait et ce que le métier dit est une divergence que je décide, pas un bug que tu corriges
> en silence. (11) Aucun changement n'atteint l'environnement de test sans la batterie de
> caractérisation au vert. Ajoute les règles dont tu penses que ce système a besoin, marquées
> comme propositions. Si tu as besoin de savoir quelque chose sur ma façon de travailler pour
> écrire cela, demande-le-moi.

Ce que je lui demande : les six règles habituelles, et cinq qui existent parce qu'un modèle face à
du code d'autrui fait trois choses par réflexe : il le réordonne, il le « répare » là où il lui
semble mauvais, et il suppose que ce que le code fait est une erreur quand cela diffère de ce
qu'il attendrait. Les règles 7, 9 et 10 bloquent exactement ces trois réflexes. La règle 8
convertit la lecture en carte, pour que ce que l'agent apprend d'un module ne se perde pas à la
fermeture de la session. La 11 est la ceinture de sécurité écrite comme règle, pour qu'elle existe
avant que la batterie n'existe.

**De clôture :** le prompt de clôture de l'échelon 1, sans changement : vous acceptez et rejetez
les propositions avec une raison, et le contrat reste avec sa date et sa version.

Signal d'alarme : l'agent propose comme règle « moderniser le code au fur et à mesure qu'on y
touche ». Cette règle est la réécriture déguisée ; rejetez-la avec une raison écrite.

---

### N2 — La lecture du système : la carte récupérée et les divergences

- **Intention** : que la carte que l'échelon 2 produit dans un projet neuf existe, mais tirée du
  système lui-même, avec les marques de source, et avec la liste de tout ce qui ne coïncide pas
  entre le code, la base, la documentation et ce que le métier croit. C'est l'échelon 2 fait par
  rétro-ingénierie, et c'est l'étape qui donne le plus de valeur par heure de tout le chemin.
- **Quand** : après N1, avec le propriétaire disponible
  pour confirmer.
- **Entrées** : le dépôt complet, le schéma de la base en lecture seule, la configuration de
  chaque environnement, les journaux s'il y en a, la documentation qui existe, et le relevé court
  de N0.
- **Artefact** : `docs/INITIAL_SURVEY.md` complété avec les marques ; `PROJECT.md` ;
  `docs/SEMANTIC_TREE.md` avec chaque nœud marqué ; `docs/STATUS.md` ; et la liste des
  divergences, chacune décidée par le propriétaire et écrite dans `docs/DECISIONS.md`.
- **Porte** : aucun nœud `[inféré]` sans verdict du propriétaire ; aucune divergence sans décision
  ou sans élément en attente ; l'épreuve de lecture de l'échelon 2 réussie.
- **Qui décide** : le propriétaire, divergence par divergence.

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous qui le faites (ou le métier avec
vous), pas l'agent :

- Un accès en lecture pour l'agent à tout ce qui peut se lire : le dépôt entier (toutes les
  branches, pas seulement la principale), le schéma de la base de données (un identifiant en
  lecture seule, hors du chat), la configuration de chaque environnement (les fichiers
  d'environnement avec les valeurs des secrets masquées, ou la liste des variables sans leurs
  valeurs), les journaux récents s'il y en a, et toute documentation, même si ce n'est qu'un vieux
  courriel ou un manuel périmé.
- `docs/INITIAL_SURVEY.md` de N0, avec une section nouvelle, écrite par vous avec le
  propriétaire : **ce que le métier croit que le système fait**, dans ses mots, cas d'utilisation
  par cas d'utilisation, et les règles métier dont il se souvient (« un rendez-vous ne peut pas
  être annulé à moins de deux heures »). Ne le vérifiez pas contre le système : c'est précisément
  cette comparaison que l'agent va faire, et les différences sont les divergences.
- `docs/WORKING_AGREEMENT.md` (N1), clos.
- Une liste écrite par vous de ce qui vit hors du dépôt et touche le système : un robot, un
  tableur qui lit la base, un processus programmé sur le serveur, un autre système qui consomme
  une table. L'agent ne le verra pas depuis le code.
- État minimal acceptable : l'agent peut lire le code et le schéma de la base, et le relevé a au
  moins trois cas d'utilisation et trois règles dans les mots du métier.

**Initial :**

> We are going to recover the map of this system from what exists. Read the whole repository
> (every branch), the database schema (read-only), the configuration of each environment, the
> recent logs and whatever documentation there is; if some part cannot be read from where you are,
> tell me and mark it as a gap; do not fill it by guessing. Then write three things. First,
> complete `docs/INITIAL_SURVEY.md` in the form the method expects (what the system does and for
> whom; what it does NOT do; who uses it; the technology; the environments; what an error costs),
> with every statement tagged by its source: [code], [database], [configuration], [documentation],
> [business] for what the survey already says, or [inferred]. Second, `PROJECT.md`, three hundred
> lines at most, and `docs/SEMANTIC_TREE.md`: the domains and, under each one, the actors, the
> processes (each with trigger, steps, outcome and exceptions as the code actually implements
> them), the entities with the attributes, states and transitions the database and the code
> enforce, the screens, the external integrations and the scheduled jobs; every node tagged the
> same way. Third, `docs/DISCREPANCIES.md`: everything where the code, the database, the
> documentation and what the business says in the survey do not agree, with the evidence on each
> side. Do not resolve any discrepancy and do not fix anything: list them. Create `docs/STATUS.md`
> for the living state. Reply in my language.

> [fr]
> Nous allons récupérer la carte de ce système à partir de ce qui existe. Lis le dépôt entier
> (toutes les branches), le schéma de la base de données (en lecture seule), la configuration de
> chaque environnement, les journaux récents et toute la documentation qu'il y a ; si une partie
> ne peut pas se lire depuis où tu es, dis-le-moi et marque-la comme trou ; ne la remplis pas en
> devinant. Ensuite écris trois choses. Premièrement, complète `docs/INITIAL_SURVEY.md` dans la
> forme que la méthode attend (ce que le système fait et pour qui ; ce qu'il ne fait PAS ; qui
> l'utilise ; la technologie ; les environnements ; ce que coûte une erreur), avec chaque
> affirmation marquée par sa source : [code], [base], [configuration], [documentation], [métier]
> pour ce que le relevé dit déjà, ou [inféré]. Deuxièmement, `PROJECT.md`, trois cents lignes au
> maximum, et `docs/SEMANTIC_TREE.md` : les domaines et, sous chacun, les acteurs, les processus
> (chacun avec son déclencheur, ses étapes, son résultat et ses exceptions tels que le code les
> implémente réellement), les entités avec les attributs, les états et les transitions que la base
> et le code imposent, les écrans, les intégrations externes et les processus programmés ; chaque
> nœud marqué de la même façon. Troisièmement, `docs/DISCREPANCIES.md` : tout ce sur quoi le code,
> la base, la documentation et ce que le métier dit dans le relevé ne s'accordent pas, avec la
> preuve de chaque côté. Ne résous aucune divergence et ne répare rien : liste-les. Crée
> `docs/STATUS.md` pour l'état vivant. Réponds dans ma langue.

Ce que je lui demande : qu'il lise tout et déclare ce qu'il n'a pas pu lire (la clause de
complétude dans sa forme legacy : le trou se marque, il ne se remplit pas) ; que le relevé et
l'arbre sortent avec des **marques de source** sur chaque affirmation, parce que cette marque est
ce qui vous permet de vérifier sans lire de code ; que les processus et les états soient **ceux
que le code implémente**, pas ceux qu'ils devraient être, parce que le comportement actuel est la
spécification (règle 10 du contrat) ; qu'il inclue les processus programmés, qui sont ceux dont
personne ne se souvient et ceux qui font le plus de dégâts ; et que les divergences restent
listées avec la preuve de chaque côté et **sans être résolues**, parce que les résoudre c'est
décider, et décider vous appartient.

**Avant d'envoyer le prompt** de clôture : l'arbre parcouru avec le propriétaire nœud par nœud,
avec la liste des nœuds confirmés et celle des nœuds corrigés ; et la liste des divergences,
chacune avec la décision du propriétaire en une ligne et la date (le système a raison et le métier
avait oublié ; le système a tort et on le change ; ou elle reste ouverte avec une date, et pas
trop nombreuses).

**De clôture :**

> I confirm these nodes: [list]. Correct these: [list]. The discrepancies are decided as follows:
> [one line each: discrepancy, my decision, today's date]. Finalize `docs/INITIAL_SURVEY.md`,
> `PROJECT.md` and `docs/SEMANTIC_TREE.md` with today's date, keeping the source tags. Write each
> discrepancy decision in `docs/DECISIONS.md` with my exact words, and open a pending item in
> `docs/PENDING.md` for every discrepancy where I decided the system must change; for the ones
> where I decided the current behaviour stays, write it next to the node as a confirmed rule. Add
> to `PROJECT.md` the instruction to read this file, the tree and the working agreement at the
> start of every session.

> [fr]
> Je confirme ces nœuds : [liste]. Corrige ceux-ci : [liste]. Les divergences se décident ainsi :
> [une ligne chacune : divergence, ma décision, la date d'aujourd'hui]. Clos
> `docs/INITIAL_SURVEY.md`, `PROJECT.md` et `docs/SEMANTIC_TREE.md` avec la date d'aujourd'hui, en
> conservant les marques de source. Écris chaque décision sur une divergence dans
> `docs/DECISIONS.md` avec mes mots exacts, et ouvre un élément en attente dans `docs/PENDING.md`
> pour chaque divergence où j'ai décidé que le système doit changer ; pour celles où j'ai décidé
> que le comportement actuel reste, écris-le à côté du nœud comme règle confirmée. Ajoute à
> `PROJECT.md` l'instruction de lire ce fichier, l'arbre et le contrat de collaboration au début
> de chaque session.

Ce que je lui demande : que la décision sur chaque divergence reste dans les trois endroits
habituels (le registre des décisions, l'élément en attente s'il faut changer, l'arbre si l'on
confirme), et que les marques de source **ne s'effacent pas** à la clôture : un arbre qui a perdu
ses marques est un arbre qu'on ne peut plus vérifier.

Vérification de complétude : parcourez l'arbre comme le propriétaire : y a-t-il un état d'entité
que le métier n'a jamais utilisé ? S'il est marqué `[code]`, le système l'a même si personne ne
l'utilise, et c'est une divergence. Y a-t-il un processus programmé dans l'arbre ? S'il n'y en a
aucun, demandez à l'agent où il a cherché. Chaque divergence a-t-elle une décision avec sa date ?
L'épreuve de lecture de l'échelon 2 est-elle passée (une nouvelle session sait ce que le système
ne fait PAS) ? Signaux d'alarme : l'arbre n'a rien de marqué `[inféré]` (l'agent ne distingue pas
ce qu'il a lu de ce qu'il a supposé) ; la liste des divergences est vide (elle n'est jamais vide
dans un legacy : l'agent a mal comparé ou n'a pas comparé) ; le fichier de projet dépasse les
trois cents lignes parce qu'« il y avait beaucoup à documenter » (cela va dans l'arbre, et ce qui
s'est passé va dans l'état vivant [Ref. 41](REFERENCIAS.md#ref-41)).

---

### N3 — L'audit comme inventaire de la dette

- **Intention** : l'échelon 13, mais au début et avec une question de plus par constat : est-ce
  que cela bloque, est-ce que cela se paie quand on touche au module, ou est-ce que cela peut
  attendre ? Le rapport n'est pas un rapport : c'est la matière première de la ceinture (N4) et de
  la file (N7). Dans mon premier projet qui a démarré avec la méthode déjà écrite, la série
  d'audits précoces s'est convertie directement en éléments en attente [Ref.
  30](REFERENCIAS.md#ref-30) ; ici je fais la même chose sur un système d'autrui.
- **Quand** : après N2, dans une session différente de celle qui a lu le
  système si c'est possible.
- **Entrées** : le dépôt en lecture seule, l'environnement où il tourne en lecture seule, la carte
  récupérée (N2).
- **Artefact** : `docs/AUDIT_[date].md` avec chaque constat marqué « bloque / se paie quand on y
  touche / peut attendre ».
- **Porte** : aucun constat sans marque de vitesse ; ceux qui bloquent ont un élément en attente
  ouvert avant de commencer N4.
- **Qui décide** : le propriétaire, sur les marques de vitesse.

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous qui le faites (ou le métier avec
vous), pas l'agent :

- Une nouvelle session de l'agent, si votre outil le permet, avec un clone propre et un fichier
  d'instructions disant « tu es un auditeur ; tu n'as pas lu et tu ne toucheras pas à ce
  système », pour qu'il ne partage pas les présupposés de la session de N2. Si ce n'est pas
  possible, la même session, mais sachez-le.
- Un accès en lecture seule à l'environnement où tourne le système (base, journaux,
  configuration), avec des identifiants en lecture seule hors du chat.
- La carte récupérée de N2 (`PROJECT.md`, `docs/SEMANTIC_TREE.md`) et `docs/DISCREPANCIES.md`,
  pour que l'auditeur ne redécouvre pas ce qui est déjà écrit.
- Votre critère sur ce que « bloque » veut dire : en général, un secret exposé, un écran qui ne
  peut pas être piloté par programme, un déploiement qui ne peut pas se répéter, l'absence de
  sauvegarde, et tout ce qui peut abîmer des données ou facturer en trop. Écrivez-le en deux
  lignes pour le lui donner.
- État minimal acceptable : l'auditeur n'a que la lecture et il sait ce que vous considérez comme
  bloquant.

**Initial :**

> Audit this system for integrity, security, performance, code quality and deployability, as the
> inventory of what must be normalized before and during its evolution. Read-only: change nothing
> except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires access you
> lack (the database, the logs, the server), tell me and mark that part as not audited; do not
> pass it as fine. Go through all of the code, not a sample, and read `docs/SEMANTIC_TREE.md` and
> `docs/DISCREPANCIES.md` first so that you do not report what is already known. For every
> finding: where it is (file and line), the risk, the evidence that proves it (the command, the
> query, the number), its priority (P0 must be fixed now, P1 soon, P2 when possible), and one more
> field: whether it BLOCKS (must be fixed before any change, by my criteria: [criteria]), whether
> it is PAID WHEN TOUCHED (fixed together with the first change that enters its module), or whether
> it CAN WAIT. Grade every dimension you audited. End with every finding turned into a proposed
> pending item, blocking ones first. Reply in my language.

> [fr]
> Audite ce système sur l'intégrité, la sécurité, la performance, la qualité du code et la
> déployabilité, comme inventaire de ce qu'il faut normaliser avant et pendant son évolution. En
> lecture seule : ne change rien, sauf écrire ton rapport dans `docs/AUDIT_[date].md`. Si auditer
> une partie exige un accès que tu n'as pas (la base, les journaux, le serveur), dis-le-moi et
> marque cette partie comme non auditée ; ne la donne pas pour bonne. Parcours tout le code, pas
> un échantillon, et lis d'abord `docs/SEMANTIC_TREE.md` et `docs/DISCREPANCIES.md` pour ne pas
> rapporter ce qui est déjà connu. Pour chaque constat : où il est (fichier et ligne), le risque,
> la preuve qui le démontre (la commande, la requête, le chiffre), sa priorité (P0 à corriger tout
> de suite, P1 bientôt, P2 quand ce sera possible), et un champ de plus : s'il BLOQUE (à corriger
> avant tout changement, selon mon critère : [critère]), s'il SE PAIE QUAND ON Y TOUCHE (corrigé
> en même temps que le premier changement qui entre dans son module), ou s'il PEUT ATTENDRE. Mets
> une note à chaque dimension que tu as auditée. Termine avec chaque constat converti en élément
> en attente proposé, les bloquants d'abord. Réponds dans ma langue.

Ce que je lui demande : l'audit de l'échelon 13 avec la dimension « déployabilité » ajoutée (parce
que dans un legacy le déploiement est souvent le premier problème) et avec le champ de vitesse,
qui est ce qui transforme un rapport en plan : sans ce champ, un legacy audité a quarante constats
et personne ne sait par lequel commencer. Le critère de ce qui bloque, c'est moi qui le donne, pas
l'auditeur, parce que cela dépend des conséquences pour le métier.

**De clôture :** le prompt de clôture de l'échelon 13, au constructeur, avec un ajout : les
éléments en attente qu'il ouvre portent la marque de vitesse de leur constat.

Vérification : le rapport dit-il ce qu'il n'a PAS pu auditer ? Y a-t-il au moins un constat marqué
« bloque » ? (Dans un legacy, il y en a toujours ; s'il n'y en a pas, l'auditeur n'a regardé ni
les secrets ni le déploiement.) Deux constats pris au hasard ont-ils leur fichier, leur ligne et
une preuve reproductible ? Signal d'alarme : tout est dans « peut attendre ». C'est un auditeur
qui ne veut pas déranger.

---

### N4 — La ceinture de sécurité

- **Intention** : qu'il existe, autour du système et sans toucher à sa fonctionnalité, ce qui rend
  sûr de le changer : un environnement de test avec des données proches des vraies, un déploiement
  qui se répète, les secrets hors du code, l'intégration continue qui fait tourner ce qu'il y a,
  et la **batterie de caractérisation** des flux critiques. C'est l'échelon 4, la première moitié
  du 15 et une forme inversée du 8, réunis et avant tout changement. C'est une **porte dure** :
  tant que la ceinture n'est pas au vert, on ne change pas une ligne de fonctionnalité.
- **Quand** : après N3, avant tout changement.
- **Entrées** : le relevé des environnements (récupéré en N2 et confirmé par vous), le rapport de
  N3 avec ses constats bloquants, l'arbre sémantique avec les processus, et un accès au serveur et
  à la base.
- **Artefact** : l'environnement de test qui tourne avec des données anonymisées ;
  `docs/DEPLOYMENT.md` avec le déploiement vers le test répété deux fois ; les secrets dans la
  configuration du serveur et rotés ; l'intégration continue au vert ; `docs/GATES.md` ; et la
  batterie de caractérisation au vert, avec le rouge démontré pour chaque flux.
- **Porte** : capture du système tournant en test vue par vous ; deuxième exécution du déploiement
  sans changement ; recherche de secrets dans le dépôt vide ; batterie de caractérisation au vert
  et chaque test éprouvé au rouge par mutation.
- **Qui décide** : le propriétaire, sur quels flux sont critiques et sur l'anonymisation des
  données.

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous qui le faites (ou le métier avec
vous), pas l'agent :

- `docs/ENVIRONMENTS_SURVEY.md`, que l'agent a rédigé en N2 avec les marques et que vous avez
  complété : où il tourne aujourd'hui, comment il se déploie aujourd'hui (même si c'est « je copie
  les fichiers par FTP »), où vont vivre les secrets sur le serveur, qui a accès, et où va tourner
  l'environnement de test (un serveur à part, un conteneur, un compte dans le nuage ; si vous
  n'avez rien, dites-le et l'agent proposera le plus simple). Le prompt l'appelle « the
  environments survey » ; dites-lui où il est.
- Un accès de l'agent au serveur de production en lecture seule (pour copier la base et la
  configuration) et à l'endroit où va tourner l'environnement de test avec les droits d'écriture,
  avec les identifiants hors du chat.
- Votre décision sur l'**anonymisation** des données de test : quels champs sont des données
  personnelles (noms, téléphones, courriels, numéros de pièce d'identité) et comment ils se
  remplacent. C'est vous qui décidez parce que c'est une obligation légale, pas une préférence
  technique.
- La liste des **flux critiques** pour la caractérisation, écrite par vous à partir des processus
  de l'arbre sémantique : ceux qui, s'ils changent par inadvertance, coûtent de l'argent ou de la
  confiance au métier. Entre quatre et huit pour un petit système. Pas « tous » : tous, c'est
  aucun.
- `docs/AUDIT_[date].md` (N3), pour que l'agent sache quels secrets il a trouvés et quels écrans
  ne peuvent pas être pilotés.
- Une sauvegarde de production restaurée au moins une fois, ne serait-ce que sur votre machine,
  avant que l'agent ne touche au serveur. C'est la condition de N0 qui échoit ici.
- État minimal acceptable : vous savez où va tourner l'environnement de test, vous avez la liste
  des flux critiques, vous avez décidé l'anonymisation et vous avez restauré une sauvegarde.

**Pour l'environnement, le déploiement et les secrets :**

> We are going to build the safety belt around this system before changing anything in it. Read
> the environments survey, `docs/AUDIT_[date].md` and `docs/SEMANTIC_TREE.md`. Evaluate whether you
> have what is needed (read access to the server where it runs and to its database, write access
> to where the test environment will run, the way it is deployed today); if anything is missing,
> ask me before starting. Then set up, without touching any functionality: (1) a test environment
> that runs the system exactly as production does, with a copy of the data where the personal
> fields I listed are anonymized; (2) a reproducible deployment to that environment, run twice,
> showing me that the second run changed nothing; (3) every secret found in the repository or in
> the code moved to the server configuration (environment file or vault), with the list of what
> you moved so that I rotate each one; (4) continuous integration running whatever test suite
> exists today, even if it is a single smoke test, on every push; (5) `docs/GATES.md` with the
> gates of this project, including: nothing reaches the test environment without the
> characterization suite green, and nothing reaches production without the full suite green with
> the exact version. Document all of it in `docs/DEPLOYMENT.md` so that a person can do it by hand
> without you. Take a screenshot of the system running in the test environment and show it to me.
> Reply in my language.

> [fr]
> Nous allons construire la ceinture de sécurité autour de ce système avant de rien lui changer.
> Lis le relevé des environnements, `docs/AUDIT_[date].md` et `docs/SEMANTIC_TREE.md`. Évalue si
> tu as ce qu'il faut (accès en lecture au serveur où il tourne et à sa base, accès en écriture à
> l'endroit où tournera l'environnement de test, la façon dont il se déploie aujourd'hui) ; s'il
> manque quelque chose, demande-le-moi avant de commencer. Ensuite mets en place, sans toucher à
> aucune fonctionnalité : (1) un environnement de test qui fait tourner le système exactement
> comme la production, avec une copie des données où les champs personnels que je t'ai listés sont
> anonymisés ; (2) un déploiement reproductible vers cet environnement, exécuté deux fois, en me
> montrant que la deuxième exécution n'a rien changé ; (3) tout secret trouvé dans le dépôt ou
> dans le code déplacé vers la configuration du serveur (fichier d'environnement ou coffre), avec
> la liste de ce que tu as déplacé pour que je rote chacun d'eux ; (4) l'intégration continue
> faisant tourner la batterie de tests qui existe aujourd'hui, même si ce n'est qu'un seul test de
> fumée, à chaque push ; (5) `docs/GATES.md` avec les portes de ce projet, y compris : rien
> n'atteint l'environnement de test sans la batterie de caractérisation au vert, et rien n'atteint
> la production sans la batterie complète au vert avec la version exacte. Documente tout cela dans
> `docs/DEPLOYMENT.md` de sorte qu'une personne puisse le faire à la main sans toi. Prends une
> capture du système tournant dans l'environnement de test et montre-la-moi. Réponds dans ma
> langue.

Ce que je lui demande : le squelette de l'échelon 4 construit autour de quelque chose qui existe
déjà, avec la moitié de l'échelon 15 avancée (secrets dehors, déploiement documenté) parce que
dans un legacy les secrets dans le code sont la règle et non l'exception [Ref.
42](REFERENCIAS.md#ref-42) ; l'anonymisation comme partie de l'environnement et non comme un
détail ; et les portes écrites avant que la batterie n'existe, pour que la batterie naisse déjà en
étant une porte.

**Avant d'envoyer le prompt** de la batterie : l'environnement de test ouvert par vous avec les
données anonymisées ; les secrets de la liste rotés, aujourd'hui ; la liste des flux critiques
pour le trou du prompt ; et, si N0 a laissé des écrans au rouge, l'élément en attente bloquant qui
les rend pilotables, clos avant cette batterie ou dans le cadre de celle-ci.

**Pour la batterie de caractérisation :**

> We are going to write the characterization tests of these critical flows: [list]. A
> characterization test captures what the system does today, exactly as it does it, defects
> included; it is not a test of what the system should do. For each flow: drive it from the
> screen as a user would and check the effect in the backend (the row, the state, the message
> queued). Every test must pass against the current code. Then prove that each test actually
> watches its flow: break the flow deliberately with a temporary change, show me the red output,
> revert the change, show me the green. If a flow cannot be driven from the screen, do not
> simulate it: say so and open a pending item marked as blocking. If while writing these tests you
> find behaviour that looks wrong, do not fix it: add it to `docs/DISCREPANCIES.md` with the
> evidence. Record the command to run the suite in `docs/STATUS.md`, and make the suite the gate
> for the test environment as `docs/GATES.md` says. Reply in my language.

> [fr]
> Nous allons écrire les tests de caractérisation de ces flux critiques : [liste]. Un test de
> caractérisation capture ce que le système fait aujourd'hui, exactement comme il le fait, défauts
> compris ; ce n'est pas un test de ce que le système devrait faire. Pour chaque flux : pilote-le
> depuis l'écran comme le ferait un utilisateur et vérifie l'effet dans le backend (la ligne,
> l'état, le message mis en file). Chaque test doit passer contre le code actuel. Ensuite démontre
> que chaque test surveille vraiment son flux : casse le flux délibérément avec un changement
> temporaire, montre-moi la sortie au rouge, annule le changement, montre-moi le vert. Si un flux
> ne peut pas être piloté depuis l'écran, ne le simule pas : dis-le et ouvre un élément en attente
> marqué comme bloquant. Si en écrivant ces tests tu trouves un comportement qui semble incorrect,
> ne le répare pas : ajoute-le à `docs/DISCREPANCIES.md` avec la preuve. Consigne la commande pour
> lancer la batterie dans `docs/STATUS.md`, et fais de la batterie la porte de l'environnement de
> test comme le dit `docs/GATES.md`. Réponds dans ma langue.

Ce que je lui demande : l'échelon 8 à l'envers. Dans le projet neuf le test naît au rouge et passe
au vert avec le changement ; ici le test naît au vert, parce qu'il capture ce qu'il y a, et la
preuve qu'il sert à quelque chose est qu'il **passe au rouge quand vous cassez le flux
délibérément**. Sans cette mutation démontrée, un test de caractérisation est un test qui passe
parce qu'il ne regarde rien, ce qui est exactement le même problème que le vert qui cache un bug
[Ref. 44](REFERENCIAS.md#ref-44). Et les deux clauses de discipline : ce qui ne peut pas être
piloté se déclare et bloque, et ce qui semble mauvais se note comme divergence, ne se répare pas,
parce que tant que le propriétaire n'a pas décidé, le comportement actuel est la spécification.

Vérification de complétude : avez-vous ouvert vous-même l'URL de l'environnement de test et vu le
système avec des données ? Avez-vous cherché un vrai nom dans ces données sans le trouver ? Le
déploiement a-t-il tourné deux fois et la deuxième n'a-t-elle rien changé ? Avez-vous demandé la
recherche de secrets dans le dépôt et est-elle revenue vide ? Avez-vous roté chaque secret de la
liste ? Chaque flux critique a-t-il son test, et chaque test a-t-il son rouge par mutation sous
les yeux ? Signaux d'alarme : la batterie de caractérisation est passée en entier « du premier
coup » et on n'a jamais montré de rouge ; l'environnement de test tourne « sur la machine de
l'agent » et non dans un endroit que vous puissiez ouvrir ; les données de test sont « quelques
enregistrements d'exemple » au lieu d'une copie anonymisée (les bugs d'un legacy vivent dans les
vraies données, pas dans celles d'exemple).

---

### N5 — Verrous et carte producteur-consommateur depuis le code

- **Intention** : savoir, avant de rien changer, ce que fait le système qui agit sur le monde
  (encaisse, envoie, approuve, efface, prévient, tourne tout seul la nuit) et qui produit et
  consomme chaque contrat entre parties. Dans le projet neuf cela se décide avant de construire
  (échelon 14) et se cartographie au fur et à mesure qu'on construit (échelon 11). Dans le legacy
  c'est déjà construit, et personne ne s'en souvient en entier. Un changement évolutif peut
  déclencher une action à conséquence qui dormait, et un changement correctif peut laisser un
  consommateur périmé.
- **Quand** : après la ceinture, parce qu'inventorier des actions exige de
  pouvoir faire tourner le système là où se tromper ne coûte rien.
- **Entrées** : le code, la base, les processus programmés du serveur, l'arbre sémantique, et la
  liste de ce qui vit hors du dépôt.
- **Artefact** : `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` avec les marques de source,
  `docs/PRODUCER_CONSUMER_MAP.md`, et après la clôture `docs/LOCKS.md` avec les verrous qui vont
  maintenant et ceux qui vont plus tard.
- **Porte** : aucune action à conséquence sans verdict du propriétaire ; les verrous marqués
  « maintenant » implémentés avec leur test au rouge avant le premier bloc.
- **Qui décide** : le propriétaire, verrou par verrou.

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous qui le faites (ou le métier avec
vous), pas l'agent :

- Avec le propriétaire, une liste écrite de ce que le métier **sait** que le système fait vers
  l'extérieur : ce qu'il encaisse, ce qu'il envoie, qui il prévient, ce qu'il efface, ce qui
  tourne tout seul. Cela va dans une section de `docs/INITIAL_SURVEY.md`. L'agent va trouver dans
  le code plus de choses que le métier n'en retient ; la comparaison entre les deux listes est le
  résultat.
- Un accès de l'agent aux processus programmés du serveur (la liste des tâches planifiées ou
  l'équivalent sur votre plateforme), parce que les envois automatiques vivent souvent là et non
  dans le code.
- La liste de ce qui vit hors du dépôt (N2), pour la carte.
- L'environnement de test de N4 qui tourne, pour qu'il puisse déclencher une action et voir ce qui
  se passe sans conséquences réelles.
- État minimal acceptable : le métier a écrit sa liste et l'agent peut voir les tâches planifiées.

**Initial :**

> Go through the code, the database triggers and the scheduled jobs of the server looking for
> everything that charges, sends, approves, deletes, notifies outwards or runs on a schedule, and
> write `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` with every statement tagged by its source. Compare
> it with the list the business wrote in `docs/INITIAL_SURVEY.md`: whatever the code does that the
> business did not list, or the other way round, ask me about before going on. For every action:
> what triggers it, whether it can run twice, whether it is reversible, what lock exists today if
> any, and what the way back is. In the same pass, build `docs/PRODUCER_CONSUMER_MAP.md`: for every
> contract in the system (a service, a table, a file format, a list of values), who produces it
> and who consumes it, including the things outside the repository I told you about. If there are
> parts you cannot see, say so instead of leaving them out. Present me the actions table with a
> proposed lock for each (explicit confirmation, double safety, dry-run mode, daily limit, a human
> in the loop) and a proposal of which locks go NOW, before any change, and which can go when the
> module is touched. Do not implement anything yet: I confirm lock by lock. Reply in my language.

> [fr]
> Parcours le code, les déclencheurs de la base et les tâches planifiées du serveur en cherchant
> tout ce qui encaisse, envoie, approuve, efface, prévient vers l'extérieur ou tourne selon un
> horaire, et écris `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` avec chaque affirmation marquée par sa
> source. Compare-le avec la liste que le métier a écrite dans `docs/INITIAL_SURVEY.md` : ce que
> le code fait et que le métier n'a pas listé, ou l'inverse, demande-le-moi avant de continuer.
> Pour chaque action : ce qui la déclenche, si elle peut tourner deux fois, si elle est
> réversible, quel verrou elle a aujourd'hui si elle en a un, et quel est le chemin du retour.
> Dans la même passe, construis `docs/PRODUCER_CONSUMER_MAP.md` : pour chaque contrat du système
> (un service, une table, un format de fichier, une liste de valeurs), qui le produit et qui le
> consomme, y compris les choses hors du dépôt dont je t'ai parlé. S'il y a des parties que tu ne
> peux pas voir, dis-le au lieu de les laisser dehors. Présente-moi le tableau des actions avec un
> verrou proposé pour chacune (confirmation explicite, double sécurité, mode à blanc, limite
> quotidienne, un humain dans la boucle) et une proposition de quels verrous vont MAINTENANT,
> avant tout changement, et lesquels peuvent aller quand on touchera au module. N'implémente rien
> encore : je confirme verrou par verrou. Réponds dans ma langue.

Ce que je lui demande : l'inventaire des échelons 14 et 11 en une seule passe, parce qu'ils
parcourent le même code ; la comparaison entre ce dont le métier se souvient et ce que le code
fait, qui est là où apparaissent les envois dont personne ne se rappelait ; et la proposition de
**maintenant ou quand on y touche** pour chaque verrou, qui est la règle des deux vitesses
appliquée à la protection : un verrou sur une action qui encaisse va maintenant ; un verrou sur un
export mensuel peut attendre le bloc qui touchera ce module.

**De clôture :** le prompt de clôture de l'échelon 14, avec les verrous marqués « maintenant »,
chacun avec son test au rouge contre la version sans verrou ; les autres restent dans la file avec
leur marque.

Signal d'alarme : l'agent a trouvé exactement les mêmes actions que celles que le métier a
listées. Dans un legacy cela n'arrive jamais ; il a manqué de regarder les tâches planifiées ou
les déclencheurs de la base.

---

### N6 — Dimensionner avec de vrais chiffres

- **Intention** : l'échelon 3, mais avec l'énorme avantage du legacy : les données primaires n'ont
  pas à être demandées, elles sont dans la base et dans les journaux. Elles se mesurent avec
  l'échelon 7 (un compteur avec son test, audité dans les deux directions) et le propriétaire
  n'apporte que ce qui n'est nulle part : de combien ils espèrent croître et si le système va être
  vendu à d'autres.
- **Quand** : après N5, avant d'ouvrir le premier bloc.
- **Entrées** : la base de production en lecture seule ou la copie complète de test, les journaux,
  l'arbre sémantique avec les entités.
- **Artefact** : `docs/VOLUME_SURVEY.md` avec chaque chiffre marqué `[base]` ou `[journal]` et sa
  commande, les compteurs dans le dépôt avec leur test, et `docs/SIZING.md` avec le « fois dix »
  et les décisions asymétriques qu'il convient de prendre avant d'évoluer.
- **Porte** : aucun chiffre primaire sans compteur ; un calcul refait par vous qui coïncide.
- **Qui décide** : le propriétaire, sur la croissance attendue et les décisions asymétriques.

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- Un accès en lecture seule à la base de production (ou la copie complète de N4, si
  l'anonymisation n'a touché ni les dates ni les quantités) et aux journaux d'accès ou
  d'application, avec l'identifiant hors du chat.
- Les deux réponses que seul le métier a, écrites : de combien ils espèrent croître dans les deux
  prochaines années, et si le système va servir à plus d'un endroit (le « fois dix »).
- Un cas connu pour le test de chaque compteur : par exemple, le nombre d'enregistrements d'une
  petite table que vous pouvez compter à la main.
- État minimal acceptable : l'agent peut interroger la base et vous avez les deux réponses.

**Initial :**

> Before changing anything we are going to size this system with its real numbers. With read-only
> access to the production database (or the complete test copy) and to the logs, measure instead
> of asking: rows per table and growth per month from the timestamps, events per entity, peak
> concurrency from the access logs, data size today and projected at five years, and the slowest
> queries. Write a meter for each number (a script that lives in the repository, with a test
> against a known case I will give you) and show me every number together with the command that
> produces it; audit each meter in both directions (is everything that should be counted, counted?
> does everything counted exist?). Write `docs/VOLUME_SURVEY.md` with every figure tagged
> [database] or [log], and ask me only for what cannot be measured: the growth the business
> expects and whether the system will serve more than one site. Then write `docs/SIZING.md`: what
> breaks first if everything is multiplied by ten, which of the current architecture choices hold
> and which do not, and which asymmetric decisions we take now, before evolving, because they are
> cheap today and expensive later. Do not change any code. Reply in my language.

> [fr]
> Avant de rien changer, nous allons dimensionner ce système avec ses vrais chiffres. Avec un
> accès en lecture seule à la base de production (ou à la copie complète de test) et aux journaux,
> mesure au lieu de demander : lignes par table et croissance par mois à partir des horodatages,
> événements par entité, concurrence au pic à partir des journaux d'accès, taille des données
> aujourd'hui et projetée à cinq ans, et les requêtes les plus lentes. Écris un compteur pour
> chaque chiffre (un script qui vit dans le dépôt, avec un test contre un cas connu que je te
> donnerai) et montre-moi chaque chiffre accompagné de la commande qui le produit ; audite chaque
> compteur dans les deux directions (est-ce que tout ce qui devrait être compté l'est ? est-ce que
> tout ce qui est compté existe ?). Écris `docs/VOLUME_SURVEY.md` avec chaque chiffre marqué
> [base] ou [journal], et demande-moi seulement ce qui ne peut pas se mesurer : la croissance que
> le métier attend et si le système servira plus d'un site. Ensuite écris `docs/SIZING.md` : ce
> qui casse en premier si tout est multiplié par dix, lesquels des choix d'architecture actuels
> tiennent et lesquels ne tiennent pas, et quelles décisions asymétriques nous prenons maintenant,
> avant d'évoluer, parce qu'elles sont bon marché aujourd'hui et chères plus tard. Ne change aucun
> code. Réponds dans ma langue.

Ce que je lui demande : mesurer au lieu de demander, ce que le legacy permet et le projet neuf
non ; le compteur avec son test et l'audit dans les deux directions de l'échelon 7, parce que les
compteurs mentent [Ref. 35](REFERENCIAS.md#ref-35), [Ref. 36](REFERENCIAS.md#ref-36) ; et le
dimensionnement comme porte avant d'évoluer [Ref. 14](REFERENCIAS.md#ref-14) : si l'architecture
actuelle ne tient pas le « fois dix » et que la demande du client est justement de croître, cela
se sait maintenant et non au troisième bloc.

**De clôture :** le prompt de clôture de l'échelon 3, en choisissant parmi les options qu'il aura
proposées pour ce qui ne tient pas, ou en confirmant que l'existant tient.

Signal d'alarme : un chiffre « approximatif » sans marque d'approximation. S'il est dans la base,
il se mesure ; s'il n'y est pas, il se demande ; il n'y a pas de troisième option.

---

### N7 — La file de normalisation, appariée à la demande du client

- **Intention** : une seule file d'éléments en attente, avec leur spécification complète, où
  cohabitent la dette (ce qui est sorti de l'audit, les divergences, les écrans non pilotables,
  les verrous en attente, les décisions du dimensionnement) et la demande du client (ce qu'il faut
  corriger et ce qu'il faut ajouter), chacun avec sa marque de vitesse et appariés par module.
  C'est l'échelon 5 avec deux colonnes de plus.
- **Quand** : à la clôture du tronçon. Ensuite, la boucle.
- **Entrées** : `docs/AUDIT_[date].md`, `docs/DISCREPANCIES.md` avec les décisions,
  `docs/LOCKS.md`, `docs/SIZING.md`, l'arbre sémantique, et la demande du client pour cette étape.
- **Artefact** : `docs/PENDING.md` avec tous les éléments en attente spécifiés, marqués « bloque /
  se paie quand on y touche / peut attendre » et « correctif / évolutif / normalisation », et
  l'appariement par module.
- **Porte** : il ne reste aucun élément en attente marqué « bloque » ouvert avant le premier
  bloc ; chaque élément en attente du client a la liste de ceux de normalisation qui entrent avec
  lui.
- **Qui décide** : le propriétaire, sur l'ordre.

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous qui le faites (ou le métier avec
vous), pas l'agent :

- La demande du client pour cette étape, en prose et dans ses mots, séparée en deux listes : ce
  qui **échoue aujourd'hui** (chaque chose avec la façon de la reproduire, ce qui se passe et ce
  qui devrait se passer, selon le métier) et ce qui **manque** (le nouveau). Cela va dans
  `docs/blocks/STAGE_01_REQUEST.md` ou là où vous préférez ; le prompt dit « the client's request
  for this stage », alors dites-lui où elle est. Si le propriétaire a donné des priorités, elles
  aussi.
- Tous les artefacts de N2 à N6 clos : l'arbre, l'audit, les divergences décidées, les verrous, le
  dimensionnement. S'il en manque un, n'ouvrez pas ce prompt : la file va sortir incomplète et
  vous ne saurez pas ce qui lui manque.
- Les éléments en attente bloquants qui existent déjà (de N0, N3 et N4) clos ou en cours avec une
  date.
- État minimal acceptable : la demande du client est en deux listes avec ses mots, et les
  artefacts des stations précédentes existent.

**Initial :**

> We are going to turn the normalization and the client's request for this stage into one queue
> of numbered pending items in `docs/PENDING.md`, each with its full specification as the method
> asks (number, title, node of the semantic tree, origin, description, business rules with
> decision and date or marked as missing, data in and out, screens, edge cases, acceptance
> criteria as given, when, then, how it will be verified, status). Sources for the normalization
> items: `docs/AUDIT_[date].md`, the discrepancies I decided to change, the screens that cannot be
> driven by a program, the secrets to rotate, the locks that are not implemented yet, and the
> decisions in `docs/SIZING.md`; each one keeps its speed mark: BLOCKS, PAID WHEN TOUCHED, or CAN
> WAIT. Sources for the client's items: the client's request for this stage; each one marked
> CORRECTIVE (something that fails today, with the way to reproduce it in the client's words) or
> EVOLUTIVE (something new). For every client item, list the normalization items that touch the
> same modules and should be paid together with it. If the request is ambiguous on any point such
> that you cannot write a verifiable item, ask me; do not resolve it by assuming. Order: blocking
> items first, then the client's items in the priority I gave you, each with its paired
> normalization. Reply in my language.

> [fr]
> Nous allons transformer la normalisation et la demande du client pour cette étape en une seule
> file d'éléments en attente numérotés dans `docs/PENDING.md`, chacun avec sa spécification
> complète comme la méthode l'exige (numéro, titre, nœud de l'arbre sémantique, origine,
> description, règles métier avec décision et date ou marquées comme manquantes, données qui
> entrent et qui sortent, écrans, cas limites, critères d'acceptation sous la forme étant donné,
> quand, alors, comment cela se vérifiera, état). Sources des éléments de normalisation :
> `docs/AUDIT_[date].md`, les divergences que j'ai décidé de changer, les écrans qui ne peuvent
> pas être pilotés par programme, les secrets à roter, les verrous qui ne sont pas encore
> implémentés, et les décisions de `docs/SIZING.md` ; chacun conserve sa marque de vitesse :
> BLOQUE, SE PAIE QUAND ON Y TOUCHE, ou PEUT ATTENDRE. Sources des éléments du client : la demande
> du client pour cette étape ; chacun marqué CORRECTIF (quelque chose qui échoue aujourd'hui, avec
> la façon de le reproduire dans les mots du client) ou ÉVOLUTIF (quelque chose de nouveau). Pour
> chaque élément du client, liste les éléments de normalisation qui touchent les mêmes modules et
> qu'il convient de payer avec lui. Si la demande est ambiguë sur un point au point que tu ne
> puisses pas écrire un élément vérifiable, demande-le-moi ; ne le résous pas en supposant.
> Ordre : d'abord ceux qui bloquent, ensuite ceux du client dans la priorité que je t'ai donnée,
> chacun avec sa normalisation appariée. Réponds dans ma langue.

Ce que je lui demande : l'échelon 5 complet (la spécification détaillée vit dans chaque élément en
attente, y compris dans ceux de normalisation), avec les deux marques qui font ce chemin : la
vitesse, qui dit quand se paie chaque dette, et le type, qui dit comment elle se clôt (un
correctif se clôt avec le test qui reproduit la panne ; un évolutif, avec celui de l'échelon 8).
Et l'**appariement par module**, qui est la règle « se paie quand on y touche » rendue
opérationnelle : quand j'ouvre le bloc de « l'acompte », les éléments en attente de normalisation
du module de paiements entrent avec lui, et ni avant ni après.

**De clôture :** la routine de chaque session de l'échelon 5, sans changement, dans le contrat de
collaboration.

Vérification de complétude : reste-t-il un « bloque » ouvert ? Alors le premier bloc ne s'ouvre
pas. Chaque correctif dit-il comment il se reproduit, avec les mots du client ? Chaque élément en
attente du client a-t-il sa liste d'appariés, même vide ? Signal d'alarme : la file a plus de
cinquante éléments de normalisation en « peut attendre ». Ce n'est pas de la dette enregistrée :
c'est la réécriture déguisée en liste. Archivez ce qui ne sera jamais payé, et dites-le.

---

## La boucle sur un système hérité : mode correctif et mode évolutif

Une fois N7 terminé, le chemin rejoint l'échelle : les échelons 5 à 10 se gravissent avec chaque
élément en attente, comme dans le projet neuf, avec les mêmes contrats et les mêmes prompts. Mais
il y a deux nuances qui méritent une section, parce que ce sont elles qui distinguent « toucher un
legacy avec méthode » de « toucher un legacy avec précaution ».

### Le mode correctif : le rouge est naturel

Un élément en attente correctif est un bug : quelque chose qui échoue aujourd'hui et que le client
connaît. À l'échelon 8 du projet neuf, le rouge se fabrique (on écrit le test, on le lance contre
l'ancien code, on le voit échouer). Dans le correctif, le rouge **est le bug lui-même** : le test
qui reproduit la panne, en pilotant le flux depuis l'écran comme l'utilisateur qui l'a signalée,
doit échouer contre le code actuel. S'il n'échoue pas, vous n'avez pas reproduit le bug qu'on vous
a signalé ; vous en avez reproduit un autre. Ce rouge est la preuve que vous réparez la bonne
chose, et il vaut plus que n'importe quelle explication de l'agent sur « ce qui doit être en train
de se passer ». Le cas des quatre tours jusqu'à la cause racine [Ref. 22](REFERENCIAS.md#ref-22)
est celui qui m'a appris que sans reproduction écrite, chaque tour répare un symptôme différent.

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- L'élément en attente correctif dans `docs/PENDING.md` (N7), avec la façon de le reproduire dans
  les mots du client : ce qu'il a fait, ce qui s'est passé, ce qu'il attendait. Si le client ne
  sait pas le reproduire, obtenez d'abord un cas (un enregistrement, une date, une capture) ; sans
  reproduction il n'y a pas de test, et sans test il n'y a pas de clôture.
- La batterie de caractérisation (N4) au vert dans l'environnement de test, avec la commande dans
  `docs/STATUS.md`.
- Les éléments en attente de normalisation appariés avec celui-ci, listés dans l'élément.
- Votre disposition à décider : si la cause racine s'avère être une règle métier que personne n'a
  écrite (cela arrive souvent), l'agent va s'arrêter et demander, et quelqu'un doit répondre ce
  jour-là.
- État minimal acceptable : vous savez reproduire le bug à la main dans l'environnement de test.

**Pour clore un élément en attente correctif :**

> This pending item is a correction: [what fails, in the client's words, and how to reproduce
> it]. Before changing anything: (1) Reproduce the failure with a test that drives the flow from
> the screen and checks the effect in the backend, and show me that it fails against the current
> code; that red is the proof that you reproduced the right defect. If you cannot reproduce it,
> tell me what you tried and what you need; do not fix what you cannot see. (2) Find the root
> cause and tell me in prose, with the evidence, before fixing. If the root cause is a business
> rule nobody wrote down, stop and ask me. (3) Fix at the root, not where it hurts, and nothing
> else: anything else you find goes to a pending item. (4) Show me the test green, the
> characterization suite still green, and the regression of the neighbouring items. (5) If the
> fix changes a current behaviour that someone may depend on, say so explicitly: that is a decision
> for me, not a side effect. Close the paired normalization items of this module in the same
> block, each with its own evidence. The commit message says "proved red against [version]" and
> the test counts. Reply in my language.

> [fr]
> Cet élément en attente est une correction : [ce qui échoue, dans les mots du client, et comment
> le reproduire]. Avant de rien changer : (1) Reproduis la panne avec un test qui pilote le flux
> depuis l'écran et vérifie l'effet dans le backend, et montre-moi qu'il échoue contre le code
> actuel ; ce rouge est la preuve que tu as reproduit le bon défaut. Si tu ne peux pas le
> reproduire, dis-moi ce que tu as essayé et ce dont tu as besoin ; ne répare pas ce que tu ne
> peux pas voir. (2) Trouve la cause racine et dis-la-moi en prose, avec la preuve, avant de
> réparer. Si la cause racine est une règle métier que personne n'a écrite, arrête-toi et
> demande-moi. (3) Répare à la racine, pas là où ça fait mal, et rien d'autre : tout ce que tu
> trouves par ailleurs va dans un élément en attente. (4) Montre-moi le test au vert, la batterie
> de caractérisation toujours au vert, et la régression des éléments voisins. (5) Si la correction
> change un comportement actuel dont quelqu'un peut dépendre, dis-le explicitement : c'est une
> décision qui m'appartient, pas un effet secondaire. Clos les éléments en attente de
> normalisation appariés de ce module dans le même bloc, chacun avec sa propre preuve. Le message
> du commit dit « prouvé en rouge contre [version] » et les chiffres des tests. Réponds dans ma
> langue.

Ce que je lui demande : la reproduction **avant** le diagnostic, parce qu'un modèle diagnostique
avec beaucoup d'assurance ce qu'il n'a pas reproduit ; la cause racine en prose avant de toucher,
pour que vous puissiez arrêter une réparation qui vise mal ; la racine et rien d'autre, parce que
dans un legacy « tant que j'y suis » est la façon la plus courante de casser ce qui marchait ; la
caractérisation au vert comme régression du système entier ; et la clause 5, qui transforme le
changement de comportement en décision. Et l'appariement : la dette de ce module se paie
maintenant, avec sa preuve, pas « plus tard ».

### Le mode évolutif : la caractérisation est la régression

Un élément en attente évolutif est quelque chose de nouveau sur quelque chose qui existe. Il
s'ouvre avec le prompt de l'échelon 5, se construit avec le 6 et le 7 tels quels, et la seule
différence est ce que veut dire « la régression des voisins » : ici les voisins sont le système
entier, et la batterie de caractérisation est celle qui dit que ce qui marchait marche encore.
Deux règles de plus. Première : quand le bloc entre dans un module, les éléments en attente de
normalisation marqués « se paie quand on y touche » de ce module entrent avec lui, avec leur
propre preuve ; c'est la règle des deux vitesses. Deuxième : le nouveau naît déjà avec la méthode
complète, c'est-à-dire avec sa spécification dans l'élément en attente, son test au rouge, son
test de bout en bout et son verrou s'il agit sur le monde. On ne fait pas au nouveau module ce que
le legacy a fait à l'ancien.

### L'exception : l'urgence en production

La ceinture est une porte dure, et une porte dure a besoin de son exception écrite, parce que si
je ne l'écris pas, l'exception s'invente le jour où quelque chose tombe à onze heures du soir.
L'exception est celle-ci : si la production est tombée ou abîme des données et que la ceinture
n'est pas encore complète, on fait le minimum qui arrête le dommage, avec le retour arrière à la
main et le propriétaire prévenu, et **le jour même** on ouvre l'élément en attente correctif et on
le clôt avec la routine complète : le test qui le reproduit au rouge, la cause racine, la
régression. Une réparation d'urgence qui ne repasse pas par la boucle est une dette qui se perçoit
avec intérêts.

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main : la confirmation qu'il s'agit
d'une vraie urgence (production tombée ou en train d'abîmer des données, pas « le client est
nerveux »), le propriétaire prévenu, et la façon de revenir en arrière (la sauvegarde de N0 ou la
version précédente) sous la main.

**Pour une urgence :**

> This is an urgent fix on production: [what is happening]. Do the minimum that stops the damage,
> on a branch, with the rollback ready before you deploy, and tell me exactly what you changed and
> what you did not verify. Do not touch anything else. Then, today, open the corrective pending
> item in `docs/PENDING.md` with what happened, and we close it with the full routine: the test
> that reproduces it in red, the root cause, the fix at the root, the characterization suite and
> the regression green. Reply in my language.

> [fr]
> Ceci est une réparation urgente en production : [ce qui est en train de se passer]. Fais le
> minimum qui arrête le dommage, sur une branche, avec le retour arrière prêt avant de déployer,
> et dis-moi exactement ce que tu as changé et ce que tu n'as pas vérifié. Ne touche à rien
> d'autre. Ensuite, aujourd'hui même, ouvre l'élément en attente correctif dans `docs/PENDING.md`
> avec ce qui s'est passé, et nous le clorons avec la routine complète : le test qui le reproduit
> au rouge, la cause racine, la réparation à la racine, la batterie de caractérisation et la
> régression au vert. Réponds dans ma langue.

Ce que je lui demande : le minimum, avec le retour arrière avant et non après, et avec le rapport
honnête de ce qui n'a pas été vérifié (échelon 12) ; et l'obligation de repasser par la boucle le
jour même, qui est ce qui sépare une exception d'une habitude.

## Les six échelons de qualité opérationnelle (16 à 19, 21 et 22) dans un système hérité

Les échelons 16 à 19, 21 et 22 du document principal (observabilité et traçabilité, persistance,
vulnérabilités, performance, et les deux supervisions) valent pour les deux cas d'utilisation, et
dans un système hérité ils ont un emplacement précis, parce que plusieurs d'entre eux ont déjà la
moitié du travail faite par le tronçon de normalisation :

- **16, observabilité et traçabilité** : le niveau minimum (journaux structurés avec niveau
  configurable et un identifiant de corrélation dans les flux critiques) entre dans la ceinture de
  sécurité (N4), parce que sans lui la batterie de caractérisation ne dit pas ce qui a cassé. Le
  niveau complet, avec l'audit immuable des actions à conséquence que N5 a inventoriées, se gravit
  avant le premier déploiement postérieur à la normalisation.
- **17, persistance** : les mesures sont déjà faites en N6. Ce qui en sort entre dans la file (N7)
  avec sa marque : ce qui est déjà hors de la tolérance du métier, « bloque » ou « maintenant » ;
  le reste, « se paie quand on y touche », et entre avec le bloc qui touche ce module.
- **18, vulnérabilités** : la première passe est la dimension sécurité de l'audit de N3, et le scan
  dans la chaîne fait partie de la ceinture (N4), parce qu'un legacy a presque toujours des
  dépendances vieilles et des secrets dans l'historique. Les P0 bloquent ; le reste, dans la file.
- **19, performance** : on le lance avec les volumes mesurés en N6, sur la persistance déjà
  corrigée là où elle bloquait, avant le premier déploiement postérieur à la normalisation. Dans un
  legacy, il découvre souvent que le point de rupture est plus proche que ce que le métier croit.
- **21 et 22, supervision** : elles se montent avec le premier déploiement, comme dans
  le projet neuf, avec une différence : la première lecture du rapport est la ligne de base du
  legacy, et les écarts et les erreurs qui existaient déjà le premier jour deviennent des éléments
  en attente avec leur marque de vitesse. Aucun ne reste comme « connu » sans élément en attente.

En pratique, les quatre préalables au déploiement sont une étape de plus de la normalisation,
avant le premier bloc évolutif ou avec lui selon l'urgence de la demande, et les deux supervisions
se montent avec le déploiement.

## Quand le système est normalisé

Jamais tout à fait, et c'est très bien ainsi : la dette marquée « se paie quand on y touche » se
paie au fil des mois, module par module, et celle marquée « peut attendre » ne se paie parfois
jamais, et il faut le dire. Ce qui a un moment précis, en revanche, c'est la **clôture du
tronçon**, qui est le moment où s'ouvre le premier bloc. Voici la liste :

1. Tous les intrants du tableau des intrants récupérés existent, avec leurs marques de source, et
   le propriétaire a confirmé chaque nœud `[inféré]` de l'arbre (N2).
2. Chaque divergence a une décision avec sa date, et celles qui changent le système ont un élément
   en attente (N2).
3. L'audit existe et chaque constat a une marque de vitesse (N3).
4. La ceinture est au vert : environnement de test avec données anonymisées que vous avez ouvert ;
   déploiement exécuté deux fois ; recherche de secrets vide et ceux qui ont été trouvés rotés ;
   intégration continue au vert ; batterie de caractérisation au vert avec le rouge par mutation
   démontré pour chaque flux critique (N4).
5. Toute action à conséquence a un verdict, et les verrous marqués « maintenant » ont leur test au
   rouge (N5).
6. Les chiffres primaires sont mesurés avec un compteur et son test, et le « fois dix » est écrit
   (N6).
7. Il ne reste aucun élément en attente marqué « bloque » ouvert, et chaque élément en attente du
   client a ses appariés (N7).
8. Le contrat de collaboration a les cinq règles du legacy, et une nouvelle session passe
   l'épreuve de lecture (N1, N2).

Si les huit donnent « oui », le système est normalisé jusqu'où ce chemin l'exige, et ce qui suit
est l'échelle de toujours. Les phases 3 et 4 du document principal (mise en production et
exploitation) s'appliquent telles quelles : l'audit périodique, les manuels (qui dans un legacy
n'existent souvent pas, et se génèrent avec l'échelon 20 à partir du système tel qu'il est),
l'agent résident, et la rétrospective chiffrée, qui dans un legacy a une question qui lui est
propre : combien a coûté la normalisation, et quelle part de la dette que nous avions marquée
« peut attendre » a fini par coûter quand même.

## Signaux d'alarme du chemin entier

- L'agent propose de réécrire un module « parce que c'est plus facile que de le comprendre ».
  C'est la règle 7 du contrat violée ; dans un legacy, comprendre est le travail.
- On a commencé à changer de la fonctionnalité avec la ceinture à moitié faite (« la batterie, on
  la finira après »). L'après n'arrive jamais, et le premier changement sans batterie est celui
  qui casse ce que personne ne savait exister.
- La liste des divergences s'est résolue en « réparant le code pour qu'il fasse ce que le métier
  dit » sans que le propriétaire décide chacune d'elles. Certaines de ces divergences sont des
  règles que le métier avait oubliées et que le code se rappelait.
- La file de normalisation grandit plus vite qu'elle ne se paie. Elle est mal marquée : il y a des
  choses en « se paie quand on y touche » qui sont des « peut attendre », ou il y a des modules
  qu'on touche sans payer leur dette.
- Les chiffres du dimensionnement sont sortis d'une estimation « parce que la base est trop grande
  pour la compter ». Une grande base se compte avec une requête ; c'est cela, un compteur.
- Une réparation d'urgence n'est pas repassée par la boucle. Comptez combien il y en a eu dans le
  mois ; s'il y en a plus d'une, la ceinture n'est pas une porte, c'est une décoration.

## Ce qu'il reste à élaborer `[hypothèse]`

1. Les sept prérequis de N0 se vérifient en faisant, et cela les rend calibrables : chaque legacy
   qui passe par N0 laisse sa fiche avec ses preuves. Ce qui manque, c'est la casuistique :
   combien de legacies échouent à chaque prérequis et combien coûte le projet préalable qui le
   rend vert. Ce n'est déjà plus une hypothèse sur le critère ; c'est un calcul que je n'ai pas
   encore.
2. La taille de la batterie de caractérisation : entre quatre et huit flux est ce qui a marché
   pour moi sur de petits systèmes ; sur un grand, je ne sais pas si le critère est par flux, par
   module ou par argent en jeu.
3. Comment se répartit la normalisation dans un grand système : je soupçonne que la lecture (N2)
   se fait en entier mais que la ceinture (N4) s'assemble par module, à mesure que chaque module
   va être touché, et que la porte dure devient dure par module et non par système. Je ne l'ai pas
   éprouvé.
4. Ce qui se passe avec un legacy construit par un modèle avec la méthode à moitié appliquée
   (contrat oui, tests non) : si ce chemin se parcourt en entier ou s'il y a un raccourci. Mon
   intuition est qu'il n'y a pas de raccourci, et que le raccourci est justement l'erreur, mais
   c'est une intuition.
