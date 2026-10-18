# Urazuke, la méthode de la preuve — l'échelle méthodologique (version 4)

Auteur : Pablo Kuschniroff, assisté par Claude Code. Version 4, 18 octobre 2026. Ceci est un
document de travail que je vais continuer à polir avec chaque projet qui l'utilisera ; rien de ce
qu'il dit n'est encore doctrine fermée, même si c'est, pour autant que je sache, le premier
distillat honnête d'une méthode qui a déjà trois systèmes en production derrière elle.

Avant d'entrer dans le vif du sujet, un avertissement sur la façon dont c'est écrit, parce que cela
compte. Je l'ai écrit pour des personnes qui n'ont pas vécu ces projets avec moi : des gens qui
veulent construire du logiciel avec l'intelligence artificielle et que ce logiciel dure, pas des
gens qui veulent apprendre à programmer ni collectionner des astuces de prompts. C'est pourquoi je
prends le temps d'expliquer, je répète quand il le faut, j'utilise le langage de tous les jours, et
je laisse à la fin un **glossaire** avec chaque sigle et chaque expression familière qui
m'échappe. Si à un moment vous tombez sur un mot étrange — « cliquet », « verrou », « fail-closed »,
« PND » —, allez au glossaire ; tout y est. Et quand vous lisez une marque comme
[Ref. 26](REFERENCIAS.md#ref-26), sachez que c'est un raccourci vers un cas réel que je raconte
dans le document de références, avec sa date et sa preuve ; vous pouvez l'ignorer sans perdre le
fil ou la suivre si le détail vous intéresse.

Le dépôt public de la méthode est
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke). On y trouve ce
document, les contrats de chaque échelon, le manuel du cours et les références, dans les huit
langues de NAC3.

## Le nom

**Urazuke** (裏付け) est un mot japonais qui désigne l'appui dont dispose une affirmation : ce qui
la soutient par derrière (littéralement, « la doublure de derrière »). Le verbe *urazukeru*
signifie « étayer par des preuves ». Je l'ai choisi le 17 octobre 2026, après avoir écarté
plusieurs noms pour cause de collision avec des entreprises et des projets existants, et je l'ai
choisi parce qu'il dit exactement ce que la méthode demande : que chaque affirmation du modèle
vienne avec son appui, et que l'appui puisse se vérifier sans lire le code. Le nom ne se traduit
pas ; le sous-titre, « la méthode de la preuve », si : *the evidence method*, *o método da
evidência*, *la méthode de la preuve*, *die Nachweis-Methode*, *il metodo del riscontro*,
裏付けの方法, 验证方法. Dans ce document, « l'échelle » est la structure de la méthode — ses seize
échelons — et « Urazuke » est la méthode entière.

## De quoi s'agit-il

Je veux être clair sur ce que j'enseigne et sur ce que je n'enseigne pas. Je n'enseigne pas un
outil. J'enseigne une **méthode** : quoi faire dans quel ordre, quoi demander au modèle à chaque
moment, ce qu'il doit vous livrer, et comment savoir — sans lire de code — que ce qu'il vous a
livré est complet. Le pari est que n'importe qui, avec n'importe quel outil d'intelligence
artificielle capable de programmer, puisse construire du logiciel en conversant avec un modèle au
lieu de taper le code à la main, et que ce qui en sorte soit robuste, prêt pour la production et,
c'est là l'important, **n'exige pas que le propriétaire du projet relise une seule ligne de
code**.

Cela paraît ambitieux, et ça l'est. Mais j'ai quelque chose que presque personne n'a : trois
systèmes réels que j'ai construits exactement ainsi, qui fonctionnent aujourd'hui avec de vrais
clients, et dont j'ai extrait chaque règle qui suit. Donc la question que je me pose n'est pas
« est-ce que ce sera possible ? », parce que ça l'a déjà été. La question est « qu'ai-je fait, dans
quel ordre, et qu'est-ce qui, dans tout cela, a vraiment fait la différence ? ». Cette échelle est
ma réponse, et c'est la base de trois choses : la documentation de la méthode, la pratique que
feront les élèves du cours, et les manuels. Plus tard je l'exporterai comme un flux d'exécution
dans mon outil, pour que ce soit l'outil qui guide la méthode et non la mémoire de chacun.

## D'où vient la méthode, et ce que je ne veux pas qu'on comprenne de travers

Il y a une lecture facile de tout ceci que je veux désamorcer avant qu'elle ne s'installe : celle
selon laquelle la méthode serait une collection de rustines que j'aurais posées après chaque coup
dur. Ce n'est pas le cas, et il m'importe de le dire avec précision, parce que cela change la
façon dont il faut lire chaque échelon.

La méthode vient de deux facteurs qui se sont combinés, et aucun des deux ne suffit seul. Le
premier est **ma propre connaissance de l'ingénierie des systèmes**. Cela fait de nombreuses années
que j'applique ce que n'importe qui venant des systèmes reconnaît tout de suite : relevé avant de
concevoir, exigences écrites, dimensionnement avec des chiffres, conception, construction, tests
comme preuve, déploiement reproductible, exploitation, audit périodique, documentation comme partie
du produit. La plus grande partie de ce que j'exige dans les seize échelons est ce que j'ai
toujours exigé dans un projet bien mené. Je ne l'ai pas inventé pour les modèles ; je l'ai apporté
d'avant.

Le second facteur est ce que les incidents de ces cinq mois m'ont montré, l'un après l'autre :
**où les modèles appliquent ces principes de manière fragile**. Un modèle sait parfaitement ce
qu'est un test, ce qu'est une cause racine, ce qu'est un dimensionnement ; si vous le lui demandez,
il vous l'explique mieux que bien des ingénieurs. Mais en pratique il dit qu'il a testé et il n'a
pas testé, il estime d'un air assuré une donnée que seul le métier possède, il remplit un trou
dans les règles métier avec ce qui lui a paru raisonnable, il rapporte trop parce qu'il a été
entraîné à être utile, et il construit un compteur qui ment sans s'en rendre compte. Chacun de ces
cas, que je raconte dans les [références](REFERENCIAS.md), m'a dit exactement où il fallait
serrer : où un principe qui pour moi était évident devait se convertir en une clause explicite du
prompt, en une porte, en une vérification que je fais sans lire de code.

Donc, quand dans un échelon je dis « ceci, je l'ai imposé après tel incident », je ne dis pas que le
principe est né là. Je dis que c'est là que j'ai constaté que le modèle ne l'appliquait pas tout
seul, et qu'il fallait le lui exiger par écrit. La méthode est de l'ingénierie des systèmes de
toujours, appliquée avec la rigidité nécessaire pour un constructeur qui ne se fatigue pas et qu'on
ne peut pas croire sans preuve. Les cicatrices sont la preuve de là où la rigidité est nécessaire,
pas l'origine des principes.

## Les trois cas d'utilisation de la méthode

Avant d'aller plus loin, une bifurcation qui n'était pas dans les premières versions et qu'un
lecteur m'a demandée à juste titre. Ce document décrit l'échelle en regardant un dossier vide :
l'échelon 0 décide si le projet s'aborde, le 4 déploie le squelette sans fonctionnalité, le 5
ouvre le premier bloc. C'est le cas le plus clair pour apprendre, et ce n'est pas le plus
fréquent. La méthode a trois cas d'utilisation, et il vaut mieux savoir dans lequel vous êtes
avant d'ouvrir l'agent, parce que cela change par où l'on entre :

1. **Projet neuf.** Dossier vide et un propriétaire avec une demande. On entre par l'échelon 0 et
   on gravit les seize dans l'ordre. C'est ce que décrit ce document, avec ses contrats et le
   manuel du cours.
2. **Évolutif-correctif sur un système fait avec la méthode.** Le système a déjà gravi l'échelle :
   il a un contrat, une carte, des éléments en attente clos avec leur preuve, une batterie, un
   déploiement et des manuels. On entre par l'échelon 5, en ouvrant un bloc, et on suit la
   boucle ; le 11 périodique ; le 15 à la clôture de chaque étape. C'est la phase 4 de la ligne de
   temps (Partie B).
3. **Évolutif-correctif sur un système fait sans la méthode.** Un système qui tourne, avec des
   utilisateurs, fait par un autre ou par soi-même sans preuve, qu'il faut corriger ou faire
   grandir. On n'entre ni par le 0 ni par le 5 : on entre par un **tronçon de normalisation** de
   huit stations (N0 à N7) qui récupère, par autodécouverte et avec des marques de source, tous
   les intrants que les échelons du démarrage produisent, monte une ceinture de sécurité autour du
   système sans le réécrire, et seulement ensuite ouvre la boucle en mode correctif ou évolutif.
   Ce chemin est dans une page à lui, le [chemin évolutif-correctif](EVOLUTIVO_CORRECTIVO.md), et
   il a sa part du cours avec un second projet-guide.

Ce qui reste dehors, nommé : la migration technologique n'est pas un cas d'utilisation de la
méthode ; c'est un autre projet, et en général cela tombe dans les critères excluants de l'échelon
0.

## L'IA n'interrompt pas la méthode : elle la continue

C'est la thèse qui ouvre tout, et je la mets en premier parce qu'elle désamorce l'objection la plus
courante avant qu'elle n'apparaisse : « comment vas-tu faire confiance à du code écrit par une
machine ? ».

Ma réponse est que **l'industrie a déjà cessé de faire confiance à l'auteur du code il y a vingt
ans**. Quand le gros de l'écriture est passé à des équipes juniors, externalisées ou tournantes, la
revue ligne par ligne est devenue impossible à soutenir. Et ce qui a grandi à sa place, c'est tout
ce que nous tenons aujourd'hui pour acquis : les tests automatisés, l'intégration continue, les
critères d'acceptation, les pipelines qui ne laissent rien passer sans vert, le « shift left » des
tests, le contrôle qualité comme fonction indépendante. Ce fut la réponse de l'ingénierie des
systèmes à « celui qui écrit n'est pas fiable » : ne pas lui lire le code, lui exiger des preuves.

Mettre un modèle à écrire, donc, n'est pas un saut dans le vide. C'est remplacer un auteur en qui
nous ne faisions déjà plus confiance par un autre en qui nous ne faisons pas confiance non plus, et
pour lequel **nous avions déjà monté l'appareil de vérification**. Cela devrait rassurer, pas
inquiéter. Et en plus, le nouvel auteur est moins cher, plus rapide, et — à la différence du
junior — il ne se vexe pas quand vous lui demandez de prouver en rouge.

C'est pourquoi cette méthode s'appuie, sans le cacher, sur l'ingénierie des systèmes classique. Le
squelette est celui de toujours. Il ne pouvait pas en être autrement, parce que les problèmes sont
ceux de toujours : ne pas savoir combien de données il y aura, ne pas savoir ce que veut le client,
ne pas savoir si ce qui a été construit est ce qui a été demandé. L'IA n'a pas changé les
problèmes ; elle a changé qui fait chaque partie et à quel coût. Même le critère d'éligibilité X2
de l'échelon 0 est de l'ingénierie classique : la testabilité comme condition de contrat.

### Ce qui est ancien et ce qui est nouveau là-dedans

L'ancien, et il convient de dire que c'est ancien : le squelette d'étapes, l'indépendance de celui
qui vérifie par rapport à celui qui construit, les tests comme preuve, la documentation comme
partie du produit, le relevé avant la conception.

Ce qui change vraiment, et c'est là que se trouve mon apport, ce sont trois choses :

1. **Où va l'effort de l'humain.** Dans la méthode classique, l'humain écrit la spécification, écrit
   le code, et un autre humain le relit. Ici l'humain ne fait que deux choses : **il décide, et il
   vérifie des artefacts**. Tout le reste — rédiger, construire, tester, mesurer, documenter — c'est
   le modèle qui le fait. C'est pourquoi chaque échelon se termine par une « vérification de
   complétude sans lire de code » : c'est l'endroit exact où l'humain reste indispensable, et aucun
   autre.

2. **L'auteur fabrique aussi la preuve.** C'est le seul point authentiquement nouveau, et c'est la
   nuance qui justifie trois échelons entiers. Le junior écrivait du code douteux, mais il ne
   fabriquait pas la preuve : les tests et les mesures, c'est un autre qui les montait, ou du moins
   un autre les regardait. Le modèle, lui, produit le code *et* le test *et* le compteur *et* le
   rapport, dans la même session, avec la même assurance dans la voix quand c'est juste et quand
   c'est faux. Je l'ai vu : le compteur qui a menti deux fois [Ref. 36](REFERENCIAS.md#ref-36),
   l'erreur d'authentification rapportée comme « succès » [Ref. 43](REFERENCIAS.md#ref-43), les
   trois assertions sur quatre qui étaient fausses. Alors « réviser la preuve au lieu du code »
   reste le principe correct, mais **la preuve doit se prouver elle-même** : le test vu en rouge
   (échelon 7), l'instrument avec sa garde (échelon 9), le rapport qui sépare le vérifié du cru
   (échelon 10), l'auditeur distinct du constructeur (échelon 11). Ce n'est pas une inquiétude
   nouvelle : c'est la même discipline d'indépendance du contrôle qualité, portée un pas plus loin
   vers l'intérieur.

3. **Le coût des artefacts.** Dans la méthode classique, la documentation coûtait cher, donc on la
   faisait une fois et elle vieillissait. Ici la régénérer est gratuit, donc la règle devient « dans
   le même commit » et « reproductible à la main, sans IA ». Ce qui était avant un idéal inatteignable
   devient une porte.

Pour le cours et pour la présentation publique, cela définit le positionnement avec honnêteté : ce
n'est pas « la nouvelle façon de programmer » ; c'est **de l'ingénierie des systèmes appliquée à un
constructeur qui ne se fatigue pas et qu'on ne peut pas croire**. À ceux qui viennent des systèmes,
cela sonne familier et cela fait baisser la méfiance ; à ceux qui viennent du vibecoding, cela
donne ce qu'ils n'ont pas, qui est justement le squelette. Et cela me distingue des outils qui
vendent de la vitesse et omettent le squelette entier.

---

## Partie A — Comment lire chaque échelon

Chaque échelon a huit parties, toujours les mêmes, pour qu'on puisse les comparer :

- **Intention** : ce qu'il cherche, en une phrase.
- **Quand** : à quel moment du projet on le gravit, et si on le gravit une fois ou si on le répète.
  Cette partie est nouvelle dans la version 4 et je l'explique en détail dans la Partie B, parce
  qu'une méthode sans ligne de temps est une liste de bonnes intentions.
- **Entrées** : ce qui doit exister avant pour pouvoir le gravir.
- **Artefact** : ce qui reste écrit ou exécutable quand on l'a gravi. C'est toujours quelque chose
  de concret : un fichier, un test, un script.
- **Porte** : ce qui doit être vrai pour passer au suivant. Si ce n'est pas rempli, on ne monte pas.
- **Qui décide** : le propriétaire du projet, l'agent, ou personne parce que c'est automatique.
- **Échec évité** : le type de problème que l'échelon prévient, avec une référence courte au cas
  réel où je l'ai constaté.
- **Contrat** : le fichier où se trouve comment on l'exécute : contexte, prompts, résultat,
  vérification, signaux d'alarme.

Deux précisions importantes. D'abord : **l'échelle est neutre vis-à-vis de l'outil**. Chaque
artefact est un fichier, un test ou un script ; aucun n'exige mon outil ni aucun autre. Forge les
automatise (les portes, les commandes, le registre des éléments en attente), mais l'échelon existe
sans Forge. Ensuite : **les échelons ne sont pas strictement séquentiels**. Il y a trois tronçons :
ceux de 0 à 4 sont de démarrage et se gravissent une fois par projet ; ceux de 5 à 10 sont la
boucle qui se répète à chaque changement ; et ceux de 11 à 15 sont d'exploitation, quand le
système est déjà vivant. Le 15 ferme le cycle et revient au 0 pour le prochain projet. Mais « pas
strictement séquentiels » ne veut pas dire « dans n'importe quel ordre » : la Partie B dit
exactement quand on gravit chacun et ce qui se passe entre les deux.

---

## Partie B — La ligne de temps : quand on gravit chaque échelon et ce qui se passe entre-temps

Cette partie n'existait pas dans les versions précédentes, et son absence était un défaut
sérieux : la méthode disait quoi faire et comment le vérifier, mais elle ne disait pas **quand**.
Et « quand » est la moitié d'une méthode. Un lecteur qui l'aurait prise au pied de la lettre
pouvait gravir les seize échelons l'un après l'autre et se demander à quel moment, alors, on fait
l'infrastructure, la chaîne d'intégration et de déploiement continus, l'ingestion des exigences, le
développement de la fonctionnalité, les tests de bout en bout de tous les flux, le regard humain
sur les écrans, et les tests humains d'acceptation. Tout cela se passe, et se passe à des moments
précis, entre les échelons et à l'intérieur d'eux. Je l'écris ici.

### B.1 Les cinq phases d'un projet

Un projet mené avec cette méthode passe par cinq phases. Les trois du milieu sont celles qui
correspondent aux trois tronçons de l'échelle ; les deux des extrémités sont l'ingestion initiale et
la vie en production, que la méthode couvre aussi même si ce ne sont pas des « échelons » en soi.

| Phase | Durée typique dans un petit projet | Échelons gravis | Que se passe-t-il d'autre dans cette phase |
|---|---|---|---|
| 0. Ingestion | de deux jours à une semaine, en parallèle avec la phase 1 | aucun encore ; c'est la matière première du 0, du 2, du 3 et du 5 | Relevé du métier avec le propriétaire, avec les méthodes classiques de l'ingénierie des exigences (voir B.5) : entretiens, cas d'utilisation ou récits utilisateur, modèle de domaine, prototypes d'écran. Il s'écrit en prose, incomplet à dessein ; l'agent le complète en posant des questions. |
| 1. Démarrage | une semaine, d'affilée | 0, 1, 2, 3, 4 | Éligibilité, contrat, définition, dimensionnement. Et **toute l'infrastructure initiale** : le dépôt, l'environnement de test, l'intégration continue, le premier déploiement avec le système vide. |
| 2. Boucle | de trois à six semaines, en blocs fonctionnels d'une à deux semaines | 5, 6, 7, 8, 9, 10 à chaque changement | Développement fonctionnel bloc par bloc ; tests en rouge ; tests de bout en bout du flux qui vient d'être construit ; regard humain sur chaque écran nouveau ; à la clôture de chaque bloc, tests humains dans l'environnement de test. |
| 3. Mise en production | une semaine | 11, 12, 13, 14 | Audit par une autre session ; verrous sur tout ce qui agit sur le monde ; clôture de la chaîne de déploiement vers la production avec retour arrière testé ; les trois manuels ; tests d'acceptation avec le propriétaire sur tous les flux. |
| 4. Exploitation | tant que le système vit | 15, et la boucle (5 à 10) pour chaque évolution ; 11 périodique | Agent résident ; audit tous les un ou deux mois ; chaque nouveau changement entre par la boucle complète et sort par la chaîne de déploiement ; rétrospective à la clôture de chaque étape. |

Ce tableau est celui du projet neuf. Quand le système existe déjà et qu'il n'est pas né avec la
méthode, les phases 0 et 1 se remplacent par le tronçon de normalisation (trois semaines pour un
petit système : lecture, ceinture, mesurer et ordonner) qui est dans le [chemin
évolutif-correctif](EVOLUTIVO_CORRECTIVO.md) ; les phases 2, 3 et 4 sont les mêmes.

Les durées sont pour un petit projet, de la taille du projet-guide du cours. Dans un projet avec
des utilisateurs et des conséquences, la boucle s'allonge et les phases 1 et 3 restent presque les
mêmes, parce que ce qui grandit est la fonctionnalité, pas l'infrastructure ni la clôture.

### B.2 Ce qui se passe entre un échelon et le suivant

Voici ce qui manquait. Pour chaque phase, quelles tâches de chaque type on fait et à quel moment
exact par rapport aux échelons. Lisez la table par lignes : chaque ligne est un type de travail, et
chaque cellule dit quand on le fait dans cette phase.

| Type de travail | Démarrage (échelons 0 à 4) | Boucle (échelons 5 à 10, par bloc) | Mise en production (11 à 14) | Exploitation (15 et boucle) |
|---|---|---|---|---|
| **Ingestion des exigences** | Avant l'échelon 0 : relevé en prose avec le propriétaire, avec entretiens, cas d'utilisation et modèle de domaine. Il se complète au 2 (définition et arbre sémantique) et au 3 (volumétrie). | À l'ouverture de chaque bloc : la demande du client pour ce bloc, telle qu'il la formulerait, se convertit en éléments en attente avec **spécification détaillée** (échelon 5) : description, critères d'acceptation, règles applicables, données, écrans, cas limites. Les questions que pose l'agent sont l'ingestion fine. | Avant le 12 : relevé des actions à conséquence. Avant le 13 : relevé des environnements et des accès. | Chaque nouvelle demande entre comme élément en attente spécifié, accroché à son nœud de l'arbre sémantique ; l'agent résident recueille ce que demandent les utilisateurs. |
| **Infrastructure** | Toute l'initiale, à l'échelon 4 : dépôt, structure, environnement de test, identifiants, domaine de test. On ne construit pas de fonctionnalité tant que le squelette vide n'est pas déployé. | Aucune, sauf si un bloc l'exige (une file, un service externe). S'il l'exige, c'est un élément en attente avec son test. | Au 13 : environnement de production, secrets sur le serveur, domaine réel, sauvegardes, supervision minimale. | Les changements d'infrastructure entrent par la boucle et par le 13 ; jamais « à la main, vite fait ». |
| **Chaîne CI/CD** | À l'échelon 4 : l'intégration continue lance la batterie à chaque push dès la première semaine, et le déploiement vers l'environnement de test est automatique à la fusion. | Elle fonctionne seule. Chaque commit la traverse ; si elle n'est pas au vert, le bloc ne se clôture pas. | Au 13 elle se complète : le déploiement en production attend le résultat de l'intégration et ne fait qu'empaqueter ; la promotion est une procédure écrite ; le retour arrière se teste. | Chaque déploiement suit la routine du 13 : test au vert avec la même version, retour arrière prêt, vérification de bout en bout en production après. |
| **Développement fonctionnel** | Aucun. Le squelette se déploie vide à dessein. | C'est le centre de la boucle : l'agent prend un élément en attente (5), demande les règles métier qui manquent (6), construit, et clôture avec des preuves (7, 8, 9, 10). Bloc par bloc, du basique à ce qui a des conséquences. | Ce qui agit sur le monde (facturer, envoyer) se construit dans la boucle **après** l'échelon 12, avec ses verrous, et démarre en mode à blanc. | Les évolutions entrent par la boucle. |
| **Tests automatiques** | Un test de fumée qui passe, au 4. C'est la graine de la batterie. | Avec chaque élément en attente : le test prouvé en rouge (7), la régression des voisins dans la même session, et **un test de bout en bout du flux qui vient d'être construit**, de l'écran jusqu'au backend. À la clôture d'un bloc : la batterie complète de bout en bout de **tous** les flux existants, dans l'environnement de test. | Avant le premier déploiement en production : la batterie complète de bout en bout de tous les flux, au vert, avec la même version qui va être promue. Après le déploiement : une vérification de bout en bout sur la production, en lecture seule. | À chaque changement, la même chose que dans la boucle. |
| **Regard humain sur les écrans** | À la clôture du 4 : le propriétaire ouvre l'URL de l'environnement de test et voit l'écran vide. Cela paraît trivial et c'est la première fois que quelqu'un qui n'est pas l'agent regarde le système. | **Avec chaque élément en attente qui touche un écran** : l'agent livre une capture réelle de l'environnement de test et le propriétaire la regarde. Dix secondes. C'est la façon la moins chère de trouver ce qu'aucun test ne trouve : que le bouton est là où il ne devrait pas être, que le texte dit autre chose, que le flux n'est pas celui que le métier imaginait. | Au 14 : les captures du manuel utilisateur sont le dernier regard humain systématique avant la production. | Chaque écran nouveau ou modifié, comme dans la boucle. |
| **Tests humains** | Aucun encore, sauf ouvrir l'écran vide. | **À la clôture de chaque bloc fonctionnel** : le propriétaire, ou un utilisateur de confiance, utilise le système dans l'environnement de test comme il l'utiliserait pour de vrai, en suivant les flux du bloc. Ce qu'il trouve se note comme éléments en attente. On n'ouvre pas le bloc suivant avec des trouvailles humaines sans élément en attente. | Avant le premier déploiement en production : **tests d'acceptation** du propriétaire sur tous les flux, avec des données de test réalistes, dans l'environnement de test. Et au 14, une personne qui ne programme pas suit le manuel de reprise. | À chaque évolution, à la clôture de son bloc. |
| **Décisions du propriétaire** | Au 0 (ça passe ou ça ne passe pas), au 1 (le contrat), au 2 (ce que ce N'EST PAS), au 3 (l'option d'architecture). | Chaque fois que l'agent s'arrête sur une règle métier non écrite (6). Il y en a généralement deux ou trois par bloc. | Au 12 (verrou par verrou), au 13 (promouvoir en production), au 15 (le niveau de l'agent résident). | Celles qui surgissent ; toujours écrites. |

Un détail que je veux souligner parce que c'est là que les gens qui viennent du vibecoding se
trompent le plus : **les tests de bout en bout de tous les flux ne se font pas une seule fois à la
fin**. Ils se font trois fois, à trois échelles. Avec chaque élément en attente, le flux que cet
élément a touché. À la clôture de chaque bloc, tous les flux qui existent jusque-là. Et avant la
production, tous les flux avec la version exacte qui va être promue. Si vous ne faites que la
troisième, vous arrivez à la fin avec un système que personne n'a testé de bout en bout pendant des
semaines, et la mise en production se transforme en une semaine de réparations.

### B.3 Le rythme de la boucle : un bloc fonctionnel typique

Un bloc fonctionnel est un ensemble de quatre à huit éléments en attente liés entre eux, qui
ensemble font quelque chose que le métier peut utiliser : « l'agenda de base », « les rappels », « le
rapport mensuel ». Un bloc dure entre une et deux semaines dans un petit projet. Voici à quoi il
ressemble de l'intérieur :

1. **Ouverture du bloc (une demi-journée).** Le propriétaire raconte, en prose, ce qu'il veut pour
   ce bloc. L'agent le convertit en éléments en attente numérotés, avec leur « comment on vérifie »,
   et demande ce qui ne suffit pas pour écrire un élément en attente vérifiable (échelon 5). Le
   propriétaire priorise.
2. **Chaque élément en attente (de deux heures à une journée).** L'agent annonce quel élément il
   prend et pourquoi. Il construit. Si en chemin apparaît une règle métier qui n'est pas écrite, il
   s'arrête et demande (6). Quand il termine, il clôture avec la routine du 7 : test prouvé en rouge,
   vert, régression des voisins ; un test de bout en bout du flux touché ; et, si le changement a
   touché un contrat entre deux parties du système, l'autre côté mis à jour dans le même commit (8).
   Si l'élément dépendait d'un nombre — combien de requêtes, combien de temps —, on a d'abord
   mesuré avec un instrument doté d'un test (9). Et le rapport sépare le vérifié du cru et déclare
   les angles morts (10). Le propriétaire lit le rapport et regarde la capture de l'écran. Il ne lit
   pas de code.
3. **Clôture du bloc (d'une demi-journée à une journée).** La batterie complète de bout en bout au
   vert dans l'environnement de test. Le propriétaire ou un utilisateur de confiance utilise le
   système en suivant les flux du bloc. Ce qu'il trouve se note comme éléments en attente. On met à
   jour le manuel utilisateur avec les nouveaux écrans (14, dans le même commit). C'est seulement
   alors qu'on ouvre le bloc suivant.

Dans une journée typique de la boucle, le propriétaire investit entre quinze et trente minutes :
répondre à deux ou trois questions de règles métier, lire deux ou trois rapports, regarder deux ou
trois captures. C'est tout ce que la méthode lui demande. S'il investit davantage, soit l'agent
demande ce qu'il pourrait résoudre seul (échelon 1), soit le propriétaire lit du code (et alors
quelque chose de l'échelon 7 ou du 10 ne fonctionne pas).

### B.4 Les jalons humains

Je résume dans une liste les moments où un humain, le propriétaire ou quelqu'un de sa confiance,
doit regarder ou utiliser le système. Ils sont peu nombreux, ils sont à des moments précis, et
aucun ne peut se déléguer à l'agent :

- **Fin du démarrage** : ouvrir l'URL de l'environnement de test et voir le système vide.
- **Avec chaque élément en attente qui touche un écran** : regarder la capture réelle de
  l'environnement de test.
- **À la clôture de chaque bloc** : utiliser le système dans l'environnement de test en suivant les
  flux du bloc.
- **Avant le premier déploiement en production** : tests d'acceptation sur tous les flux.
- **À l'échelon 14** : une personne qui ne programme pas suit le manuel de reprise dans
  l'environnement de test.
- **Après chaque déploiement en production** : vérifier que la version qui tourne est celle qu'on
  voulait, et faire une passe en lecture seule sur les flux critiques.

Tout le reste — les tests, les mesures, les audits, la documentation — c'est le modèle qui le fait
et l'humain le vérifie par l'artefact, pas par le code.

### B.5 Comment entrent les exigences : du relevé à l'arbre sémantique et aux éléments en attente

Je veux m'arrêter là-dessus parce que c'est là que l'ingénierie des systèmes classique a le plus à
dire et là que le vibecoding l'ignore avec le plus d'enthousiasme. Une exigence n'est pas une
phrase du client dans un chat. C'est une phrase du client **traitée** par des méthodes qui existent
depuis des décennies et qui restent valables avec un modèle aux commandes, parce que le modèle est
très bon pour les appliquer si vous le lui demandez et très mauvais pour les appliquer si vous ne
le lui demandez pas.

Les méthodes que j'utilise, et que la méthode exige à chaque phase :

- **Entretiens avec le propriétaire**, ouverts, en prose, enregistrés. C'est la phase 0. Je
  n'essaie pas qu'ils soient complets : j'essaie que l'agent détecte ce qui leur manque.
- **Cas d'utilisation ou récits utilisateur**, un par flux que le métier peut nommer : « la
  réceptionniste saisit un rendez-vous », « le patient reçoit le rappel ». Chacun a un acteur, un
  déclencheur, des étapes, un résultat et des exceptions. C'est l'unité avec laquelle on ouvre un
  bloc fonctionnel.
- **Modèle de domaine** : les entités du métier, leurs attributs, leurs états possibles et les
  transitions entre états. C'est le cœur de l'arbre sémantique (voir plus bas) et ce qui évite que
  le modèle invente des états que le métier n'a pas.
- **Critères d'acceptation** par récit, sous la forme « étant donné telle situation, quand telle
  chose se produit, alors on voit tel résultat ». Ce sont eux qui se convertissent en « comment on
  vérifie » de chaque élément en attente et, ensuite, en test de bout en bout.
- **Prototypes d'écran**, même si ce n'est qu'un dessin. Le regard humain sur les écrans commence
  ici, avant qu'il n'existe du code.
- **Traçabilité** : chaque exigence peut se suivre jusqu'à l'élément en attente qui l'implémente,
  le test qui la prouve et le commit qui l'a clôturée. Dans la méthode, la traçabilité n'est pas une
  matrice à part : c'est l'élément en attente lui-même, qui cite son origine et sa preuve.

**L'arbre sémantique.** C'est l'artefact qui ordonne tout cela et c'est la carte que l'agent lit à
chaque session (échelon 2). C'est un arbre, pas une liste : le système à la racine ; en dessous, les
domaines ou modules ; sous chacun, ses acteurs, ses processus (les cas d'utilisation), ses entités
avec leurs états, ses écrans et ses intégrations externes ; et accrochés à chaque nœud, les
éléments en attente qui le touchent et les décisions qui l'affectent. C'est l'agent qui le
construit à partir du relevé, c'est vous qui le corrigez, et il grandit avec chaque bloc. Sa valeur
est double : il donne au modèle le contexte exact du nœud qu'il va toucher sans avoir à lire tout le
projet, et il vous donne à vous une façon de vérifier que le système que l'agent comprend est
celui que le métier a demandé, sans lire de code. Quand un élément en attente n'est accroché à aucun
nœud, soit l'arbre est incomplet, soit l'élément est hors périmètre ; les deux se voient en dix
secondes.

**La spécification détaillée vit dans l'élément en attente.** Dans la méthode classique il y avait
un document de spécification des exigences, long, qui vieillissait. Ici ce document se décompose :
chaque élément en attente porte sa propre spécification complète, et la somme des éléments en
attente est la spécification du système. Un élément en attente bien écrit a : un titre ; le nœud de
l'arbre sémantique auquel il est accroché ; le récit ou le cas d'utilisation qui l'origine, avec
les mots du client ; la description détaillée de ce qui est demandé ; les règles métier
applicables, avec leur décision et leur date ; les données qui entrent et qui sortent ; les écrans
affectés, avec le prototype s'il y en a un ; les cas limites et les exceptions ; les critères
d'acceptation ; et comment on vérifie. L'agent le rédige à partir de votre demande en prose,
demande ce qui ne suffit pas pour spécifier, et vous le lisez avant qu'il ne se construise. Lire
une spécification d'élément en attente est ce qui vous rapprochera le plus de la lecture du code,
et c'est exactement la bonne distance.

**Les éléments en attente clôturés sont de la documentation.** C'est ce qui ferme le cercle. Quand
un élément en attente se clôture, on ne l'efface pas et on ne l'archive pas vide : il reste avec sa
spécification, la décision qui l'a originé, la preuve avec laquelle il a été clôturé (les chiffres
du rouge et du vert, la capture de l'écran, le nombre mesuré), le commit, et la date. La file des
éléments en attente clôturés est, donc, l'historique fonctionnel du système : ce qui a été
construit, pourquoi, quand, et comment ça a été testé. C'est de là que sortent le journal des
modifications, les nouvelles sections du manuel utilisateur et, quand quelqu'un demande six mois
plus tard « pourquoi le système fait-il cela ? », la réponse. Le manuel du cours apprend à exiger
cette documentation à la clôture de chaque élément en attente, dans la même session, comme partie
de la routine de l'échelon 5.

---

## Partie C — Les seize échelons

### Étape 0 — Ce projet peut-il être abordé ainsi ? (l'éligibilité)

Il y a quelque chose qui précède tout le reste, et qui n'est dans aucun dépôt parce que c'est
toujours arrivé déjà décidé : la décision de **savoir si un projet s'aborde avec cette méthode ou
non**. C'est un critère que j'ai porté dans ma tête pendant des mois et que je finis d'écrire. Les
deux critères excluants, je les ai déjà clairement ; ils sortent des projets que j'ai refusés, pas
de ceux que j'ai acceptés [Ref. 46](REFERENCIAS.md#ref-46) : les « non » définissent la frontière
mieux que les « oui ». Les critères qui pondèrent, je suis encore en train de les calibrer, et je
le signale comme tel.

- **Intention** : décider si un projet s'aborde avec cette méthode, et avec un agent aux commandes,
  ou non, AVANT d'ouvrir le dépôt. Parce que si vous entrez dans un projet qui ne s'y prête pas, la
  méthode se dégrade en « programmer avec l'IA », et là, oui, le propriétaire finit par lire du
  code.
- **Quand** : une seule fois, la première semaine, avant toute autre chose. Une heure de travail ;
  elle économise des mois. Si le système existe déjà, cet échelon se gravit dans sa version pour
  les legacy (la station N0 du [chemin évolutif-correctif](EVOLUTIVO_CORRECTIVO.md)), avec quatre
  critères de plus et X2 mesuré écran par écran.
- **Entrées** : la demande du client, le domaine métier, les données, la technologie, les
  environnements disponibles, et qui va être le propriétaire.
- **Artefact** : une fiche d'éligibilité d'une page, avec les critères notés et la décision : on y
  va, on n'y va pas, ou on y va sous conditions.
- **Porte** : les critères excluants sont tous au vert, et la note de ceux qui pondèrent dépasse le
  seuil (un seuil que je n'ai pas encore défini).
- **Qui décide** : le propriétaire. Aujourd'hui c'est moi ; l'idée est que la méthode permette à
  une autre personne de le décider avec la même fiche.
- **Échec évité** : se lancer dans un projet où l'agent ne peut pas se vérifier seul, ou où il n'y
  a pas de propriétaire du domaine pour décider, et finir avec l'humain qui relit le code ligne par
  ligne.
- **Contrat** : `peldanos/peldano-00-elegibilidad.md`.

**Les deux critères excluants.**

| # | Critère excluant | Pourquoi il tue la méthode |
|---|---|---|
| X1 | Technologie héritée sans dépôt accessible, ou avec des dépôts qui ne suivent pas un standard | Sans dépôt standard il n'y a nulle part où déposer la preuve : pas d'éléments en attente cités dans les commits (échelon 5), pas de tests qui voyagent avec le code (7), pas d'intégration ni de déploiement comme paquet (13), pas de documentation dans le même commit (14). L'agent travaille à l'aveugle et ne laisse aucune trace vérifiable. |
| X2 | Technologie qu'on ne peut pas tester de bout en bout : on ne peut pas exécuter les écrans et accéder à chaque élément de l'interface avec ses différentes méthodes, en validant que le changement est bien arrivé au backend | Sans cette vérification de l'écran au backend l'agent ne peut pas se tester seul (échelons 7, 9 et 10), et alors le propriétaire devrait lire du code, ce qui est précisément ce que la méthode promet d'éviter. |

Une précision qui vaut de l'or pour la neutralité vis-à-vis de l'outil : **NAC3 (le protocole
qu'utilise mon outil pour que les écrans puissent être pilotés par programme) N'EST PAS une
condition ; c'est le moyen par lequel j'y parviens aujourd'hui**. Le critère neutre s'énonce ainsi :
l'interface peut être exécutée par programme, et chaque élément de l'écran est accessible avec ses
différentes méthodes (cliquer, saisir, lire son état), de sorte qu'un test puisse parcourir l'écran
puis vérifier l'effet dans le backend. Une technologie dont l'interface n'expose pas ses éléments à
un « driver » (comme Playwright, par exemple) reste dehors, même si elle a un dépôt.

Et une lecture qui me paraît importante : au fond, X1 et X2 sont **la même condition vue de deux
côtés**. L'agent doit pouvoir se vérifier seul, de bout en bout, et laisser la preuve dans le dépôt.
X1 est la moitié « où reste la preuve ? » ; X2 est la moitié « comment se produit la preuve ? ».

`[hypothèse]` **Critères qui pondèrent, encore sans poids.** Je les laisse marqués comme hypothèse
jusqu'à ce que je les calibre avec les premiers projets qui utiliseront la méthode de bout en bout.

| # | Critère candidat | Comment cela s'est vu dans les cas | Excluant ? |
|---|---|---|---|
| D1 | Il y a un propriétaire du domaine qui a du jugement et du temps pour décider (pas pour programmer) | dans les trois systèmes, avec les décisions écrites et datées | `[?]` |
| D2 | Il y a un « oracle » de vérité vérifiable : des données réelles, un système externe, la production en lecture seule | la Mutuelle et son Autorisateur comme oracle [Ref. 26](REFERENCIAS.md#ref-26) | `[?]` |
| D4 | La technologie est dans ce que l'agent maîtrise sans inventer (Node, Python, SQL, React) | les trois | `[?]` |
| D5 | L'erreur a une conséquence réelle (argent, santé, exploitation), ce qui justifie le fail-closed | la Mutuelle (santé, facturation), l'Association (familles) | `[?]` |
| D6 | La volumétrie peut être connue dès le premier jour | Kikan : 3,4 millions de lignes par an [Ref. 15](REFERENCIAS.md#ref-15) | `[?]` |
| D7 | Le client tolère un temps de maturation et un humain dans la boucle | l'approbateur automatique avec mode à blanc [Ref. 28](REFERENCIAS.md#ref-28) | `[?]` |
| D9 | Le périmètre tient dans un dépôt et un propriétaire | les trois | `[?]` |
| D10 | Les secrets et les accès peuvent être isolés (coffre, fichier d'environnement, permissions bornées) | la clé d'API associée à la personne qui l'a créée [Ref. 13](REFERENCIAS.md#ref-13) | `[?]` |

Deux critères que j'avais dans les versions précédentes (que l'agent puisse tester seul, et que le
projet soit nouveau ou auditable), je les ai absorbés dans X2 et X1 respectivement, parce que ce
sont des conséquences et non des critères à part.

### Étape 1 — Le contrat de collaboration (les règles avant le code)

Avant d'écrire une seule ligne, mettez par écrit comment vous et l'agent allez travailler. Cela
ressemble à une formalité, et ce n'en est pas une : c'est ce qui évite quatre-vingts pour cent des
frustrations du premier mois. Pensez que l'agent arrive chaque matin sans mémoire de la veille ; ce
qui n'est pas écrit, vous allez devoir le lui répéter à chaque fois, et à chaque fois un peu
différemment.

- **Intention** : fixer comment travaillent l'humain et l'agent avant la première ligne de code.
- **Quand** : une seule fois, la première semaine, immédiatement après l'éligibilité. Une
  demi-heure. On le révise quand un coup dur l'exige.
- **Entrées** : rien du projet ; c'est le premier fichier. De vous : vos préférences de travail.
- **Artefact** : un document de standards de qualité qui dise, au minimum : le temps de l'humain
  est sacré (on ne le dépense pas en choses que l'agent peut résoudre seul) ; zéro dette technique,
  c'est-à-dire que quand quelque chose casse on le répare à la racine et on ajoute la régression
  dans la même session ; le périmètre est exact, ni plus ni moins que ce qui a été demandé ; on
  parle la langue de l'utilisateur ; la documentation se met à jour dans le même commit ; et on
  n'annonce jamais comme fait quelque chose qui n'a pas été fait.
- **Porte** : le contrat est dans le dépôt et se lit à chaque session.
- **Qui décide** : le propriétaire. L'agent peut proposer des changements, mais il n'édite pas le
  contrat de son propre chef.
- **Échec évité** : l'agent qui « aide » en élargissant le périmètre parce que ça lui a semblé une
  bonne idée ; celui qui laisse de la dette « pour plus tard » (et le plus tard n'arrive jamais) ;
  et celui qui rapporte comme fait ce qu'il *croit* avoir fait. Je l'ai écrit pour la première fois
  quand cela faisait deux semaines que je répétais la même chose à chaque session
  [Ref. 1](REFERENCIAS.md#ref-1).
- **Contrat** : `peldanos/peldano-01-contrato-de-convivencia.md`.

### Étape 2 — La définition du projet et la lecture obligatoire

Chaque session de l'agent démarre de zéro. Donnez-lui une carte, courte, et obligez-le à la lire
avant de toucher à quoi que ce soit. Les deux moitiés comptent autant l'une que l'autre : une carte
que personne ne lit n'agit pas, et une carte longue, personne ne la lit.

- **Intention** : que chaque session démarre en sachant ce qu'est le projet, dans quel état il se
  trouve et quelles décisions ont déjà été prises.
- **Quand** : elle s'écrit une fois, la première semaine, après le contrat ; elle se maintient à
  jour pendant tout le projet, avec chaque nouvelle décision.
- **Entrées** : le contrat (échelon 1) et le relevé du métier.
- **Artefact** : un fichier de projet opérationnel, et ici j'insiste : COURT. C'est le programme,
  pas l'historique. Plus l'**arbre sémantique** du système (voir B.5) : domaines, acteurs,
  processus, entités avec leurs états, écrans et intégrations, avec les éléments en attente et les
  décisions accrochés à chaque nœud. Plus un fichier d'état vivant avec ce qui est en cours et les
  doutes ouverts.
- **Porte** : l'agent lit le fichier de projet et l'arbre sémantique avant de toucher au code, et
  on a prouvé qu'il les lit.
- **Qui décide** : le propriétaire définit ; l'agent le maintient à jour.
- **Échec évité** : deux, bien concrets. Du travail jetable pour ne pas avoir lu la carte
  [Ref. 9](REFERENCIAS.md#ref-9). Et le fichier de projet qui grossit jusqu'à devenir illisible
  [Ref. 41](REFERENCIAS.md#ref-41) : le fichier opérationnel et le livre de cas doivent être des
  fichiers distincts.
- **Contrat** : `peldanos/peldano-02-definicion-y-lectura.md`.

### Étape 3 — Dimensionner avant de concevoir l'architecture

C'est l'échelon qu'il coûte le plus cher de sauter, et je le sais parce que je l'ai sauté. Les
décisions structurelles se prennent avec des chiffres, et les chiffres primaires, c'est le métier
qui les a, pas le modèle.

- **Intention** : que les décisions structurelles (quel moteur de base de données, si l'interface
  est synchrone ou asynchrone, combien de concurrence) se prennent avec des chiffres et non au goût.
- **Quand** : une fois, la première semaine, avant de monter le squelette ; on le refait si le
  métier change d'échelle. Une demi-page et une décision dans un petit projet.
- **Entrées** : un relevé de données de volumétrie fait avec le métier, par nature incomplet ; et
  un accès en lecture au système précédent s'il existe. Il y a des données que **seul le métier
  possède** et que le modèle ne peut pas inférer : c'est pourquoi le prompt exige de lui qu'il
  évalue si elles sont complètes et qu'il demande celles qui manquent, au lieu de les estimer avec
  un air assuré.
- **Artefact** : un registre de dimensionnement avec des options FIXES (trois ou quatre options
  concrètes) et celle qui a été choisie ; et les décisions « asymétriques » déclarées explicitement,
  par exemple « l'interface de persistance est asynchrone dès la première ligne même si le premier
  moteur est synchrone », parce que si vous vous trompez cela coûte peu et si vous ne le faites pas
  cela coûte une fortune.
- **Porte** : le dimensionnement est enregistré avant de monter le squelette.
- **Qui décide** : le propriétaire choisit parmi les options fixes ; l'agent les présente avec des
  chiffres.
- **Échec évité** : démarrer avec un stockage qui ne supporte pas la volumétrie et le découvrir
  quand changer l'interface coûte une étape entière de réingénierie
  [Ref. 15](REFERENCIAS.md#ref-15).
- **Contrat** : `peldanos/peldano-03-dimensionar.md`.

### Étape 4 — Le squelette avec ses portes

Avant que le système fasse quoi que ce soit d'utile, il doit démarrer, se tester et se déployer
VIDE. Oui, vide. Parce que le chemin vers la production fait partie du produit, et la seule façon
de savoir qu'il fonctionne est de le parcourir quand il n'y a encore rien à perdre. C'est l'échelon
où se fait **toute l'infrastructure initiale et la chaîne d'intégration et de déploiement**, et
c'est pour cela qu'il occupe la plus grande partie de la première semaine.

- **Intention** : avoir un système qui démarre, se teste et se déploie sans aucune fonctionnalité
  encore.
- **Quand** : une fois, à la fin de la première semaine, après le dimensionnement et avant toute
  fonctionnalité. C'est la clôture du tronçon de démarrage.
- **Entrées** : le dimensionnement (échelon 3), le relevé des environnements, et les identifiants
  de l'endroit où l'on va déployer.
- **Artefact** : le squelette avec l'intégration continue au vert, la structure de tests montée
  avec un test de fumée, un déploiement vers un environnement de test qui fonctionne et qui a été
  lancé deux fois, et les portes du flux déclarées par écrit.
- **Porte** : le squelette est au vert, l'intégration continue tourne, et le déploiement vers
  l'environnement de test fonctionne avec zéro fonctionnalité. Le propriétaire a ouvert l'URL et vu
  l'écran vide.
- **Qui décide** : l'agent exécute ; le propriétaire approuve visuellement.
- **Échec évité** : découvrir le déploiement un mois après le démarrage et payer cinq éléments en
  attente d'affilée pour qu'il fonctionne, avec de la fonctionnalité en jeu
  [Ref. 32](REFERENCIAS.md#ref-32).
- **Contrat** : `peldanos/peldano-04-esqueleto.md`.

### Étape 5 — Le plan, ce sont les éléments en attente

Il y a ici une idée qui, une fois que vous l'avez saisie, ne vous lâche plus : il n'y a pas un
« plan » d'un côté et une « liste de tâches » de l'autre. **La liste des éléments en attente EST le
plan.** Et chaque élément en attente dit comment on le vérifie, parce que c'est cela que vous allez
regarder au lieu de regarder le code.

- **Intention** : une file de travail unique, ordonnée et avec porte, qui soit la vérité du projet.
- **Quand** : elle se crée à l'ouverture du premier bloc fonctionnel, dès que le démarrage se
  termine ; elle s'utilise à chaque session pendant tout le projet. Chaque nouveau bloc commence par
  convertir la demande du client en éléments en attente.
- **Entrées** : la demande du client pour le bloc, les audits, et les constats des tests humains.
- **Artefact** : un registre d'éléments en attente numérotés, chacun avec sa **spécification
  détaillée** (voir B.5) : le nœud de l'arbre sémantique auquel il est accroché, le récit d'origine
  avec les mots du client, la description, les règles métier applicables, les données, les écrans,
  les cas limites, les critères d'acceptation et comment on vérifie. Et, à la clôture, la
  **documentation de l'élément réalisé** : la preuve, le commit, la date, ce qui a été décidé en
  chemin. Les éléments en attente clos sont l'historique fonctionnel du système.
- **Porte** : aucun changement n'entre sans élément en attente spécifié ; et l'élément se clôt avec
  une preuve documentée, pas avec un « c'est fait ».
- **Qui décide** : le propriétaire priorise ; l'agent propose et exécute dans l'ordre.
- **Échec évité** : la spécification qui « se fait dépasser » et devient obsolète en deux semaines
  [Ref. 17](REFERENCIAS.md#ref-17) ; et le travail dont, six mois plus tard, personne ne sait
  pourquoi il a été fait [Ref. 7](REFERENCIAS.md#ref-7).
- **Contrat** : `peldanos/peldano-05-pendientes.md`.

### Étape 6 — Les décisions s'écrivent à côté du code

Le modèle, quand il trouve un trou dans les règles métier, le remplit. Il ne s'arrête pas pour
demander ; il complète avec ce qui lui semble le plus probable, avec le même naturel que lorsqu'il
écrit le reste. C'est pourquoi cet échelon n'est pas « écrivez les décisions » mais « exigez de lui
qu'il freine et qu'il demande quand il en manque une », et quand vous décidez, la décision reste
avec vos mots, votre nom et la date.

- **Intention** : que chaque règle de domaine ou décision structurelle ait un propriétaire, une date
  et un lieu.
- **Quand** : à chaque session de la boucle, chaque fois que l'agent bute sur une règle non écrite.
  Il y en a en général deux ou trois par bloc fonctionnel. Aussi au démarrage (échelons 0 et 3) et
  à la mise en production (12 et 13).
- **Entrées** : la conversation avec le propriétaire. C'est le seul intrant.
- **Artefact** : la décision écrite dans le commit et dans un registre des décisions, avec les mots
  textuels. Si le propriétaire n'a pas répondu et que l'agent a dû choisir, elle reste marquée
  « décision par omission » pour être révisée.
- **Porte** : une règle métier n'entre pas dans le code sans sa phrase d'origine.
- **Qui décide** : le propriétaire. Toujours. Sans exception.
- **Échec évité** : discuter six semaines plus tard de pourquoi quelque chose est ainsi ; et, pire,
  l'agent qui invente des règles de domaine parce qu'elles lui ont semblé raisonnables. La pratique
  d'écrire la règle dans le commit avec la date et le propriétaire vient de la Mutuelle
  [Ref. 29](REFERENCIAS.md#ref-29), et celle de geler les décisions avant de construire, de mon
  outil [Ref. 5](REFERENCIAS.md#ref-5).
- **Contrat** : `peldanos/peldano-06-decisiones.md`.

### Étape 7 — Les tests comme verrous, prouvés en rouge

Un test que vous n'avez jamais vu échouer, vous ne savez pas s'il prouve quelque chose. C'est
pourquoi ici la règle n'est pas « écrivez des tests » ; c'est « démontrez que le test passe au rouge
contre l'ancien code, puis au vert, puis que la régression reste au vert ». Et les tests de bout en
bout, de l'écran jusqu'au backend, sont ceux qui remplacent votre lecture du code.

- **Intention** : que chaque comportement qui compte ait un test qui ÉCHOUE s'il casse, et qu'on
  sache avec certitude qu'il échoue.
- **Quand** : avec chaque élément en attente de la boucle, à sa clôture. Le test de bout en bout du
  flux touché, dans la même clôture. La batterie complète de bout en bout, à la clôture de chaque
  bloc et avant chaque déploiement en production.
- **Entrées** : le changement déjà implémenté et l'élément en attente avec son « comment on
  vérifie ».
- **Artefact** : le nouveau test, la sortie en rouge et en vert avec des chiffres, la régression
  des voisins dans la même session, et le commit qui dit contre quoi on a prouvé le rouge.
- **Porte** : rouge démontré, vert, régression au vert. Et l'agent ne simule pas précisément la
  partie qu'il veut tester.
- **Qui décide** : l'agent exécute et rapporte ; le propriétaire lit le rapport, pas le test.
- **Échec évité** : les tests qui passent parce qu'ils ne prouvent rien, et le vert qui cache un
  bug [Ref. 44](REFERENCIAS.md#ref-44). Le cas des compteurs est l'exemple complet d'un test prouvé
  en rouge contre l'ancien critère [Ref. 26](REFERENCIAS.md#ref-26).
- **Contrat** : `peldanos/peldano-07-tests-en-rojo.md`.

### Étape 8 — Symétrie entre producteur et consommateur, et le registre des anti-patrons

Quand vous changez un bout (le serveur, la base, un robot), l'autre bout (l'écran, un compteur, un
rapport) doit changer dans le même commit. Le principe qui soutient cela est que **toute liste a un
seul propriétaire**. Et les erreurs que vous avez déjà payées une fois se notent avec leur
vérification automatique, pour ne pas les payer deux fois.

- **Intention** : qu'un changement à un bout entraîne l'autre, toujours, dans le même commit.
- **Quand** : avec chaque élément en attente qui touche un contrat entre deux parties du système ;
  la carte des contrats se construit à l'ouverture du deuxième bloc fonctionnel, quand il y a déjà
  un écran et un serveur ; le registre des anti-patrons grandit chaque fois que quelque chose casse
  pour la deuxième fois.
- **Entrées** : la carte de qui produit et qui consomme chaque contrat ; le registre des
  anti-patrons.
- **Artefact** : le serveur définit la liste et le consommateur la lit ; la carte
  producteur/consommateur ; le registre des anti-patrons avec odeur, cause racine, correctif et
  détection précoce.
- **Porte** : automatique : l'agent cherche l'autre côté avant de considérer un changement comme
  clos.
- **Qui décide** : personne ; c'est automatique.
- **Échec évité** : le compteur qui ne coïncide pas avec la requête
  [Ref. 26](REFERENCIAS.md#ref-26) ; deux copies du même module qui se désynchronisent
  [Ref. 41](REFERENCIAS.md#ref-41). La solution de la source unique, je l'ai imposée à la Mutuelle
  [Ref. 27](REFERENCIAS.md#ref-27).
- **Contrat** : `peldanos/peldano-08-simetria-y-antipatrones.md`.

### Étape 9 — Mesurer avant de construire, avec un instrument lui-même vérifié

C'est, pour moi, l'échelon le plus adulte de tous, et celui que j'ai mis le plus de temps à
formaliser parce que je tenais pour acquis qu'un modèle l'appliquerait seul. Il ne l'applique pas.
La règle est : aucun chiffre qui décide de quelque chose ne sort d'une impression ; il sort d'un
compteur qui vit dans le dépôt, qui a un test, et que vous pouvez lancer. Et le compteur aussi se
vérifie, parce que les compteurs mentent.

- **Intention** : que tout chiffre qui alimente une décision sorte d'un instrument avec test, et
  que l'instrument lui-même soit audité.
- **Quand** : dans la boucle, chaque fois qu'un élément en attente dépend d'un chiffre ou d'une
  hypothèse de cause, AVANT de construire. Au démarrage, le dimensionnement est le premier cas.
  Dans un petit projet, « mesurer » c'est compter avec une commande et noter le chiffre avec la
  date.
- **Entrées** : l'hypothèse, du propriétaire ou de l'agent, et l'accès à ce qu'on veut mesurer.
- **Artefact** : le compteur gardé dans le dépôt ; le chiffre avec sa commande et sa date ; l'audit
  dans les deux directions ; l'approximatif marqué ; et, le cas échéant, un budget par chemin
  resserré sur ce qui a été mesuré et protégé par un test.
- **Porte** : les cinq règles : compteur gardé ; si l'instrument n'existe pas on le construit ; on
  l'audite dans les deux directions ; l'approximatif se marque ; et celui qui exécute vérifie les
  chiffres de celui qui a planifié.
- **Qui décide** : le chiffre. Le propriétaire apporte l'hypothèse ; l'agent la mesure avant de
  construire.
- **Échec évité** : les compteurs qui mentaient et le plan avec trois chiffres faux sur quatre
  [Ref. 36](REFERENCIAS.md#ref-36) ; le cliquet à zéro qui ne voyait pas 84 appels
  [Ref. 35](REFERENCIAS.md#ref-35). Les règles, c'est moi qui les ai écrites, en session, avant
  qu'elles ne deviennent doctrine [Ref. 45](REFERENCIAS.md#ref-45).
- **Contrat** : `peldanos/peldano-09-medir.md`.

### Étape 10 — Vérification honnête et rapport proportionné

Si vous n'allez pas lire le code, le rapport de l'agent doit être fiable, et cela n'arrive pas tout
seul. Le modèle a été entraîné pour être utile et complet, et un rapport qui dit « ceci, je n'ai pas
pu le vérifier » semble moins utile qu'un rapport qui dit « c'est fait ». Alors exigez de lui
explicitement les mauvaises nouvelles, les angles morts et ce qu'il n'a pas fait.

- **Intention** : que le rapport de l'agent soit fiable sans que le propriétaire lise du code.
- **Quand** : à chaque rapport, de chaque élément en attente, pendant tout le projet. C'est la forme
  que doit avoir tout ce que l'agent vous dit.
- **Entrées** : le travail réalisé et l'élément en attente qui le demandait.
- **Artefact** : un rapport en trois blocs : vérifié (avec la preuve à côté), cru (et pourquoi on
  ne l'a pas testé), angles morts (ce qu'il ne peut pas voir d'où il est). Il couvre chaque point
  demandé. Les mauvaises nouvelles d'abord.
- **Porte** : aucune affirmation sans sa preuve. « C'est fait » ne se dit pas tout court. Devant un
  « c'est toujours cassé », on compare d'abord la version publiée avec celle qui contient le
  correctif.
- **Qui décide** : le propriétaire fait confiance, ou demande la preuve. Il ne relit jamais de
  code.
- **Échec évité** : l'erreur rapportée comme succès et les rapports qui déclaraient vérifié ce qui
  ne l'était pas [Ref. 43](REFERENCIAS.md#ref-43) ; le tour qui a travaillé invisible pendant une
  heure quarante-trois [Ref. 16](REFERENCIAS.md#ref-16). La règle d'honnêteté de vérification, je
  l'ai écrite en juin [Ref. 8](REFERENCIAS.md#ref-8).
- **Contrat** : `peldanos/peldano-10-verificacion-honesta.md`.

### Étape 11 — L'audit périodique comme intrant du plan

De temps en temps il faut regarder le système entier avec des yeux neufs, et ce qu'on y voit ne va
pas dans un rapport qu'on archive : il va dans la file des éléments en attente. La partie
importante est « des yeux neufs » : que ce soit quelqu'un qui n'a pas construit qui audite, parce
que celui qui a construit partage ses propres présupposés. Une autre session du modèle, avec un
autre fichier d'instructions, suffit.

- **Intention** : regarder le système complet de temps en temps et convertir ce qu'on voit en
  éléments en attente.
- **Quand** : obligatoire avant le premier déploiement en production (il ouvre le tronçon de mise
  en production). En exploitation, tous les un ou deux mois selon le rythme de changement, et à la
  clôture de chaque grande étape.
- **Entrées** : le dépôt entier et la production en lecture seule.
- **Artefact** : un rapport avec des constats gradués, chacun avec son emplacement, son risque, sa
  preuve et sa priorité ; des notes par dimension ; et les constats urgents déjà convertis en
  éléments en attente.
- **Porte** : chaque constat urgent a un élément en attente ouvert avant de considérer l'audit
  comme clos.
- **Qui décide** : le propriétaire priorise les constats.
- **Échec évité** : des requêtes qui lisent des tables entières [Ref. 18](REFERENCIAS.md#ref-18) ;
  deux portes d'administrateur que personne n'avait vues jusqu'à ce qu'un autre les regarde
  [Ref. 40](REFERENCIAS.md#ref-40) ; une vulnérabilité connue et un composant énorme
  [Ref. 41](REFERENCIAS.md#ref-41).
- **Contrat** : `peldanos/peldano-11-auditoria.md`.

### Étape 12 — Fail-closed, verrous et zéro dommage silencieux

Dans le doute ou en cas d'échec, le système N'AGIT PAS. Et il le dit. Cela semble évident, mais
c'est le contraire de ce que fait le logiciel par défaut, qui, dans le doute, continue. Cet échelon
vient **avant** de construire les fonctionnalités qui agissent sur le monde, pas après.

- **Intention** : que le système, devant un doute ou un échec, n'agisse pas, et prévienne.
- **Quand** : dans le tronçon de mise en production, avant de construire toute fonctionnalité qui
  facture, envoie, approuve ou supprime ; on le révise à chaque nouvelle action à conséquences. Les
  nouvelles automatisations démarrent en mode à blanc et s'activent après avoir regardé leur
  journal pendant quelques jours.
- **Entrées** : le relevé des actions à conséquences, fait avec le propriétaire.
- **Artefact** : la table des verrous : chaque action avec sa réversibilité, son verrou, son chemin
  de retour ; un test par verrou prouvé en rouge ; les nouvelles automatisations en mode à blanc.
- **Porte** : toute action irréversible a un verrou et un chemin de retour documenté.
- **Qui décide** : le propriétaire approuve verrou par verrou ; le système ne les contourne jamais.
- **Échec évité** : une double facturation, une approbation automatique sans passer par un humain,
  la suppression de données du client. Les verrous de la Mutuelle sont le modèle
  [Ref. 28](REFERENCIAS.md#ref-28) ; le réflexe de ne pas casser le listing entier, aussi
  [Ref. 25](REFERENCIAS.md#ref-25).
- **Contrat** : `peldanos/peldano-12-fail-closed.md`.

### Étape 13 — Intégration continue, environnements, secrets et déploiement comme partie du produit

Arriver en production doit être un paquet reproductible : les tests tournent UNE fois, le
déploiement ne fait qu'empaqueter et téléverser, la configuration vit sur le serveur et non dans le
dépôt, et le retour arrière est éprouvé. Une bonne partie de cela existe déjà depuis le squelette ;
cet échelon le complète vers la production.

- **Intention** : qu'arriver en production soit un paquet reproductible, avec les tests lancés une
  seule fois et la configuration hors du dépôt.
- **Quand** : la chaîne d'intégration et le déploiement vers l'environnement de test se montent à
  l'échelon 4. La clôture vers la production — environnement réel, secrets, promotion, retour
  arrière éprouvé, verrou contre les secrets — se fait dans le tronçon de mise en production, après
  l'audit et les verrous. La routine de chaque déploiement s'applique pendant toute l'exploitation.
- **Entrées** : le relevé des environnements et des accès ; le squelette avec son intégration.
- **Artefact** : l'intégration continue qui lance la batterie une fois par commit ; le déploiement
  qui attend ce résultat et ne fait qu'empaqueter ; la configuration uniquement sur le serveur ; la
  procédure de promotion écrite et répétable ; le retour arrière éprouvé ; la vérification qui
  empêche de pousser un secret.
- **Porte** : test au vert avec la même version avant de toucher à la production ; retour arrière
  éprouvé ; aucun secret dans le dépôt ni dans le chat sans rotation.
- **Qui décide** : le propriétaire promeut en production ; l'agent prépare tout.
- **Échec évité** : les tests lancés trois fois par commit et le quota brûlé
  [Ref. 39](REFERENCIAS.md#ref-39) ; le déploiement durci à coups d'éléments en attente pour l'avoir
  découvert tard [Ref. 32](REFERENCIAS.md#ref-32) ; des secrets collés dans le chat
  [Ref. 42](REFERENCIAS.md#ref-42).
- **Contrat** : `peldanos/peldano-13-ci-entornos-secretos-deploy.md`.

### Étape 14 — Documentation vivante et manuels qu'une personne peut suivre sans IA

Le système doit pouvoir s'utiliser, se maintenir et se rétablir sans l'agent et sans vous. Si le
jour où il n'y a pas d'agent on ne peut pas déployer, il n'est pas terminé. Et comme régénérer la
documentation avec un modèle est gratuit, la règle devient « dans le même commit ».

- **Intention** : que le système puisse s'utiliser, se maintenir et se rétablir sans l'agent et
  sans le constructeur.
- **Quand** : le manuel utilisateur grandit avec chaque bloc fonctionnel, à sa clôture, avec les
  nouveaux écrans. Les trois manuels complets se génèrent dans le tronçon de mise en production,
  après le 13, et le test avec une personne qui ne programme pas se fait avant le premier
  déploiement. La routine du même commit s'applique pendant toute l'exploitation.
- **Entrées** : le système qui tourne dans l'environnement de test ; les artefacts du 12 et du 13.
- **Artefact** : le manuel utilisateur avec des captures réelles, celui de maintenance, et celui
  d'infrastructure et de reprise écrit pour une personne qui doit le faire à la main à trois heures
  du matin ; chacun avec date et version.
- **Porte** : la documentation est à jour dans le même commit ; quelqu'un qui ne programme pas a
  suivi le manuel de reprise.
- **Qui décide** : l'agent maintient ; le propriétaire lit le manuel, pas le code.
- **Échec évité** : le document périmé qui a provoqué un commit dans le mauvais dépôt ; le fichier
  de projet transformé en historique [Ref. 41](REFERENCIAS.md#ref-41). Les manuels reproductibles à
  la main sont ceux de la Mutuelle [Ref. 24](REFERENCIAS.md#ref-24).
- **Contrat** : `peldanos/peldano-14-documentacion-viva.md`.

### Étape 15 — L'agent dans le système, et la rétrospective chiffrée

Le dernier échelon a deux parties qui ferment le même cycle. D'abord : l'agent reste résident en
production, avec un périmètre borné, agissant au nom d'une personne. Ensuite : la méthode elle-même
se révise avec des chiffres, et ce qu'on apprend revient à l'échelon 0 pour le projet suivant.

- **Intention** : que l'agent reste résident en production avec un périmètre borné, et que la
  méthode se révise avec des chiffres.
- **Quand** : l'agent résident, à l'entrée en exploitation, après le premier déploiement en
  production. La rétrospective, à la clôture de chaque étape et du projet ; elle est obligatoire
  même si elle tient en une page.
- **Entrées** : le système en production, les incidents, les coûts.
- **Artefact** : le document de l'agent résident avec sa carte du système, son périmètre, son
  identifiant au nom d'une personne et la preuve que ce qui est hors périmètre est rejeté ; et la
  rétrospective avec des chiffres sourcés, chaque incident rapporté à un échelon, et au moins une
  proposition concrète de changement de l'échelle.
- **Porte** : l'agent ne peut pas faire ce que le propriétaire n'a pas approuvé ; la rétrospective
  produit au moins un changement de l'échelle.
- **Qui décide** : le propriétaire.
- **Échec évité** : l'agent qui opère sans carte ; et la méthode qui se répète à l'identique projet
  après projet sans apprendre. La rétrospective chiffrée qui a tué l'équipe multi-agents est le
  modèle [Ref. 6](REFERENCIAS.md#ref-6) ; l'agent résident, celui de la Mutuelle
  [Ref. 13](REFERENCIAS.md#ref-13).
- **Contrat** : `peldanos/peldano-15-agente-residente-y-retrospectiva.md`.

---

## Partie D — Comment s'exécute, combien on exige, et avec quel outil

### Comment s'exécute chaque échelon : le contrat

La fiche en huit parties dit ce que cherche chaque échelon, quand on le gravit et ce qu'il laisse.
Mais un échelon ne se comprend pleinement que lorsqu'on voit **comment on le demande, ce qui doit
revenir et comment je sais que c'est revenu complet**. C'est pourquoi chaque échelon a, en plus de
la fiche, un **contrat** dans un fichier propre dans `peldanos/`, toujours avec les mêmes cinq
sections :

1. **Contexte requis**, nommé de façon générique (« relevé de données de volumétrie », « accès en
   lecture au système précédent », « la liste des actions à conséquence réelle »), sans descendre
   dans le détail de l'ingénierie des systèmes. Les relevés sont par nature incomplets ; je n'essaie
   pas de les rendre complets avec un formulaire.
2. **Prompts**, ceux qu'on donne au modèle, textuels. Celui d'ouverture et, quand l'échelon est une
   conversation, celui de clôture. Tous portent la même clause, qui est le cœur de l'affaire : *le
   modèle évalue si le contexte suffit ; s'il ne suffit pas, il demande tout ce qui manque avant de
   continuer ; et il n'estime ni n'invente une donnée que seul le métier possède*. Celui qui sait ce
   qui lui manque pour calculer, c'est le modèle, pas un formulaire. Et chaque prompt vient
   précédé d'un bloc qui dit **« Avant d'envoyer le prompt »** : les fichiers et les intrants que
   vous (ou le métier avec vous) devez avoir construits avant de le coller, avec leur nom, leur
   contenu et l'état minimum acceptable. Le prompt les nomme, le bloc vous dit comment ils doivent
   être faits ; sans ce bloc, le prompt mentionne des fichiers que personne ne vous a dit comment
   écrire.
3. **Résultat attendu** : les caractéristiques détaillées de l'artefact.
4. **Vérification de complétude** : la liste des contrôles que fait le propriétaire sur
   l'artefact, **sans lire de code**. Si l'un d'eux donne « non », l'échelon n'est pas gravi.
5. **Signaux d'alarme** : deux ou trois symptômes que l'échelon a été mal gravi même s'il paraît
   l'être.

Et dans l'en-tête de chaque contrat : le tronçon, le quand, la forme et la taille (s'il est
obligatoire dans tout projet ou proportionnel).

**Les prompts sont en anglais, et chacun vient avec sa traduction.** C'est une décision que j'ai
prise pour trois raisons : le même contenu en espagnol occupe entre 30 et 50 % de tokens en plus ;
la capacité des modèles à suivre des instructions est mieux calibrée en anglais, de sorte qu'un
prompt en anglais tolère mieux la brièveté sans devenir ambigu ; et le vocabulaire du métier (test,
commit, rollback, mock) est anglais. Mais je ne veux pas que l'anglais soit une barrière pour lire
la méthode : sous chaque prompt vient l'explication de ce que je demande et de pourquoi chaque
clause est là, et dans la version HTML il y a un bouton qui montre le prompt traduit dans la langue
du document. Le prompt qu'on colle au modèle est l'anglais ; la traduction est là pour que vous le
compreniez. Et tous se terminent par « Reply in my language », parce que le prompt est en anglais
mais la conversation n'a aucune raison de l'être.

### Ce qui est obligatoire et ce qui est proportionnel, selon la taille du projet

Une question qui surgit tout de suite : « tout cela pour un petit système ? ». La réponse est que
seize échelons ne font pas seize semaines ; plusieurs se gravissent en une heure, et ceux qui sont
proportionnels rétrécissent avec le projet. Ce qui ne rétrécit pas, c'est la liste de ceux qui ne
se négocient pas. Cette table est une proposition `[hypothèse]` à confirmer avec le premier projet
qui utilisera la méthode de bout en bout :

| Échelon | Petit projet (un propriétaire, peu d'utilisateurs, pas d'argent en jeu) | Projet avec utilisateurs et conséquences |
|---|---|---|
| 0 Éligibilité | obligatoire (une heure) | obligatoire |
| 1 Contrat | obligatoire (une demi-heure) | obligatoire |
| 2 Définition | obligatoire, cinquante lignes suffisent | obligatoire |
| 3 Dimensionner | obligatoire, une demi-page et une décision | obligatoire, complet |
| 4 Squelette | obligatoire s'il va avoir des utilisateurs | obligatoire |
| 5 Éléments en attente | obligatoire | obligatoire |
| 6 Décisions | obligatoire | obligatoire |
| 7 Tests en rouge | obligatoire | obligatoire |
| 8 Symétrie | la règle, oui ; la carte, optionnelle | obligatoire avec carte |
| 9 Mesurer | proportionnel : compter et noter | obligatoire, avec compteurs et budgets |
| 10 Vérification honnête | obligatoire | obligatoire |
| 11 Audit | un, avant la production | périodique |
| 12 Fail-closed | optionnel si c'est en lecture seule | obligatoire |
| 13 Intégration et déploiement | minimum : tests seuls, configuration dehors, retour arrière | obligatoire, complet |
| 14 Documentation | minimum : reprise | les trois manuels |
| 15 Résident et rétrospective | rétrospective d'une page | les deux |

En résumé : il y a neuf échelons qui ne se négocient dans aucun projet (0, 1, 2, 3, 5, 6, 7, 10 et
la rétrospective du 15), et sept qui se dimensionnent avec le projet.

### Comment l'utiliser avec n'importe quel outil

La méthode est neutre vis-à-vis de l'outil ; ce qui change de l'un à l'autre, c'est **où l'on met
chaque artefact** pour que le modèle le lise. La correspondance, pour les outils les plus utilisés
fin 2026 :

| Artefact de la méthode | Claude Code | Cursor | Codex CLI / Gemini CLI | Forge |
|---|---|---|---|---|
| Contrat de collaboration (E1) et routines (E5, E6, E7, E8, E10, E14) | `CLAUDE.md` du projet | `.cursor/rules/` | `AGENTS.md` / `GEMINI.md` | doctrines injectées par porte |
| Définition du projet (E2) | `CLAUDE.md` + `docs/STATUS.md` | idem, dans les règles et les docs | idem | `PROJECT.md` + fichier de contexte |
| Registre des éléments en attente (E5) | `docs/PENDING.md` ou issues | idem | idem | registre des éléments en attente natif avec verbes |
| Prompts d'échelon (tous) | collés dans le chat en gravissant l'échelon | idem | idem | injectés en franchissant la porte |
| Portes (E4) | `docs/GATES.md`, manuel | idem | idem | G1 à G9, automatiques |
| Compteurs et budgets (E9) | scripts dans le dépôt avec test | idem | idem | idem, plus le cliquet statique |

La colonne Forge est celle qui automatise le plus ; les trois autres fonctionnent tout aussi bien si
le propriétaire fait à la main ce que Forge fait tout seul : coller le prompt de l'échelon au bon
moment et exiger la vérification de complétude avant de passer au suivant. C'est, de fait, la
pratique du cours.

---

## Partie E — Ce qu'il reste à élaborer

1. **L'échelon 0 complet** : les poids des critères qui pondèrent, le seuil, et davantage de
   projets refusés comme contre-exemples. J'ai X1 et X2 ; il manque le reste.
2. **Un nom mémorable pour chaque échelon**, en une phrase, pour les manuels et les publications.
3. **L'export vers Forge** : quels échelons sont déjà des portes ou des commandes et lesquels
   manquent pour pouvoir faire tourner l'échelle comme un flux d'exécution.
4. **Tester les contrats dans un projet réel de bout en bout.** Les seize prompts sont écrits à
   partir de ce que j'ai fait, pas exécutés tels quels. Le premier projet qui les utilisera en
   entier en corrigera plusieurs ; cela fait partie de l'échelon 15.
5. **La première cohorte du cours**, qui va corriger les durées de la ligne de temps et les erreurs
   typiques, qui sont aujourd'hui écrites depuis mes projets et non depuis des élèves.
6. **Le chemin évolutif-correctif éprouvé de bout en bout sur un legacy réel.** Les huit stations
   sont écrites à partir de ce que j'ai fait dans des systèmes d'autrui en mode diagnostic et à
   partir des échelons réordonnés, pas à partir d'une normalisation complète exécutée avec ces
   prompts.
7. **Ce qui N'EST PAS dans l'échelle et devrait y être** `[hypothèse]` : la gestion du coût des
   tokens et des quotas comme budget explicite (aujourd'hui elle est réactive) ; la rotation des
   secrets comme routine et non comme incident ; et un critère pour savoir quand l'humain DOIT
   regarder le code, parce qu'aujourd'hui la réponse est « jamais » et je soupçonne qu'il y a des
   moments précis où cela vaut la peine.

---

## Glossaire

Chaque sigle, chaque nom propre et chaque expression familière qui apparaît dans ce document,
expliqué. Dans l'ordre du document d'origine. Certaines entrées sont des termes qui apparaissent dans
des noms de fichiers ou des messages de commit des dépôts d'origine ; je les garde pour que la
preuve puisse être suivie.

**À la dure (apprendre)** — Apprendre quelque chose parce que ça a mal tourné, pas parce que
quelqu'un l'a expliqué avant. Je l'emploie au sens de « ces règles se sont apprises à la dure », et
dans ce document je précise que ce n'est pas toute la vérité : les principes, je les avais d'avant ;
les coups durs ont montré où le modèle ne les applique pas.

**Agent** — Un programme d'intelligence artificielle qui ne se contente pas de répondre à des
questions mais exécute des actions : il lit des fichiers, écrit du code, lance des commandes, fait
des commits. Dans ce document, « l'agent » est Claude Code ou l'outil que vous utilisez.

**Anonymisation** — Dans ce document les clients réels s'appellent « la Mutuelle »,
« l'Autorisateur » et « l'Association », et leurs systèmes « Autorizaciones » et « Kikan ». C'est
volontaire : les noms restent réservés jusqu'à ce que j'aie la permission de les utiliser.

**Anti-patron** — Une façon de faire les choses qui semble raisonnable mais dont on sait qu'elle
finit mal. Le contraire d'un « patron » (une bonne pratique éprouvée).

**Arbre sémantique** — La carte du système sous forme d'arbre : le système à la racine ; en
dessous, les domaines ; en dessous, acteurs, processus, entités avec leurs états, écrans et
intégrations ; et à chaque nœud sont accrochés les éléments en attente et les décisions qui le
touchent. L'agent le construit, vous le corrigez, et c'est ce que l'agent lit avant de toucher au
code. Voir B.5.

**Resserrer le plafond** — Abaisser une limite (un budget, un maximum autorisé) jusqu'à ce qu'elle
soit à peine au-dessus de ce qui a été mesuré, pour que toute dégradation fasse échouer un test.

**Approbateur automatique** — Dans Autorizaciones, le robot qui approuve des ordonnances
automatiquement selon des règles. Il a d'abord tourné en « mode à blanc » (voir dry-run) avant
qu'on le laisse agir.

**Artefact** — Quelque chose de concret qui est produit : un fichier, un test, un script, un
document. Dans l'échelle, chaque échelon laisse un artefact.

**Asynchrone / synchrone (async / sync)** — Un appel synchrone attend le résultat avant de
continuer ; un appel asynchrone laisse la tâche tourner et continue, puis récupère le résultat. Les
vraies bases de données en Node sont asynchrones ; c'est pourquoi l'interface doit l'être dès le
début.

**Association (l')** — C'est ainsi que j'appelle dans ce document le client du système Kikan (son
nom réel reste réservé) : une association civile qui accompagne des familles et avait besoin d'un
guichet d'entrée omnicanal et de campagnes.

**AUD-*** — La série d'audits numérotés qui ont été faits dans Kikan en août, et qui ont généré des
éléments en attente.

**Autodécouverte** — Dans le chemin évolutif-correctif, la façon d'obtenir les intrants que
personne n'a écrits : l'agent les récupère en lisant le système lui-même (le code, le schéma de la
base, la configuration, les journaux, la documentation qu'il y a) et marque chaque affirmation
avec sa source (`[code]`, `[base]`, `[configuration]`, `[documentation]`, `[inféré]`, et
`[métier]` pour ce que le propriétaire a confirmé). Ce qui ne peut pas se lire se marque comme
trou, cela ne se remplit pas.

**Autorisateur (l')** — C'est ainsi que j'appelle le système de la Mutuelle qui reçoit les
ordonnances et renvoie un verdict (approuvée, rejetée). Pour nous il fonctionne comme un
« oracle » : la vérité contre laquelle on vérifie les compteurs.

**Autorizaciones** — Nom sous lequel j'appelle le premier système en production (le vrai reste
réservé) : automatisation de la gestion des ordonnances de la Mutuelle pour un organisme de santé,
avec un humain dans la boucle.

**await** — En JavaScript, le mot qui indique « attends le résultat de cet appel asynchrone ». Un
appel à la base sans `await` est un bug silencieux : le code continue avant d'avoir la donnée.

**Backend** — La partie du système qu'on ne voit pas : le serveur, la logique, la base de données.
Le contraire de « frontend » (l'écran).

**Batterie (de tests)** — L'ensemble complet des tests d'un projet, lancés tous ensemble.

**Bloc fonctionnel** — Un ensemble de quatre à huit éléments en attente liés entre eux qui, à eux
tous, font quelque chose que le métier peut utiliser. C'est l'unité de travail de la boucle ; il
dure entre une et deux semaines dans un petit projet.

**Coffre (vault)** — Un endroit chiffré où l'on garde les secrets (clés, mots de passe) au lieu de
les laisser dans des fichiers texte.

**Verrou** — Une protection qui empêche qu'une action dangereuse se produise sans une condition
explicite. Par exemple, le bouton de panique a un verrou dédié : on ne peut pas l'appuyer par
accident.

**Caractérisation (test de)** — Un test qui capture ce que le système fait aujourd'hui, exactement
comme il le fait, défauts compris ; non pas ce qu'il devrait faire. Il naît au vert, et la preuve
qu'il sert à quelque chose est qu'il passe au rouge quand on casse le flux délibérément (une
mutation). C'est la batterie qui protège un legacy pendant qu'on le change. Le terme vient de la
littérature sur le code hérité ; je l'emploie tel quel.

**Cause racine** — Le motif réel d'un problème, par opposition au symptôme. Corriger le symptôme
fait revenir le problème ; corriger la cause racine, non.

**Ceinture de sécurité** — Dans le chemin évolutif-correctif, ce qui doit exister autour d'un
legacy avant de lui changer une ligne : un environnement de test avec des données anonymisées, un
déploiement qui se répète, les secrets hors du code et rotés, l'intégration continue qui fait
tourner ce qu'il y a, et la batterie de caractérisation. C'est une porte dure, avec une seule
exception écrite (l'urgence en production).

**Chemin évolutif-correctif** — Le troisième cas d'utilisation de la méthode : prendre un système
qui existe déjà et qui n'est pas né avec la méthode, le normaliser sans le réécrire (huit
stations, N0 à N7) et seulement ensuite gravir l'échelle en mode correctif (réparer ce qui échoue)
ou évolutif (ajouter ce qui manque). Il a une page à lui.

**CI (intégration continue)** — Un service (ici, GitHub Actions) qui lance les tests
automatiquement chaque fois qu'on pousse du code. CI/CD ajoute le déploiement automatique.

**CLAUDE.md / PROJECT.md** — Le fichier que l'agent lit en commençant chaque session pour savoir ce
qu'est le projet et comment y travailler.

**Claude Code** — L'outil d'Anthropic avec lequel j'ai travaillé sur ces projets et avec lequel
j'ai écrit ce document : une session d'un modèle avec accès au dépôt, qui lit, écrit, exécute et
fait des commits.

**Commit** — Un point sauvegardé dans l'histoire du code, avec un message qui explique ce qui a
changé et pourquoi. Chaque commit a un identifiant court (par exemple `2219f7a`).

**Porte (gate)** — Une condition qui doit être remplie pour pouvoir avancer. Si elle n'est pas
remplie, on ne passe pas. Dans Forge elles sont numérotées G1 à G9.

**Concurrence** — Combien de choses se passent en même temps dans le système (utilisateurs
simultanés, processus en parallèle).

**CORS** — Un mécanisme de sécurité des navigateurs qui décide depuis quels domaines on peut
appeler un serveur. Mal configuré, il bloque des appels légitimes avec des erreurs confuses.

**Critères d'acceptation** — Les conditions, écrites sous la forme « étant donné telle situation,
quand telle chose se produit, alors on voit tel résultat », qui définissent quand une exigence est
satisfaite. Dans la méthode ce sont le « comment on vérifie » de chaque élément en attente et le
scénario du test de bout en bout.

**CVE** — Un identifiant public d'une vulnérabilité de sécurité connue dans un composant logiciel.

**Dette technique** — Ce qui reste mal fait « pour corriger plus tard ». La méthode l'interdit : ce
qui casse se répare à la racine dans la même session.

**Divergence** — Dans la lecture d'un système hérité, un point où le code, la base de données, la
documentation et ce que le métier croit que le système fait ne coïncident pas. Elle se liste avec
la preuve de chaque côté et c'est le propriétaire qui la décide, une par une : parfois le système
a tort, et parfois le métier avait oublié une règle que le code se rappelait.

**Doctrine** — Dans Forge, un document court qui fixe comment on fait quelque chose (comment on
teste, comment on vérifie, comment on dimensionne). C'est la forme que prend la méthode à
l'intérieur de l'outil.

**Driver (critère)** — Un facteur qui pousse une décision d'un côté ou de l'autre. À l'échelon 0,
les drivers sont les facteurs qui décident si un projet est éligible.

**Dry-run (mode à blanc)** — Faire tourner un processus « à vide » : il fait tout sauf l'action
finale. L'approbateur automatique a tourné ainsi au début, en montrant ce qu'il aurait approuvé
sans rien approuver.

**Embarqué (embed)** — Forge installé à l'intérieur du système du client, comme assistant résident,
avec des permissions bornées.

**End to end (E2E, de bout en bout)** — Tester le système complet, de l'écran jusqu'à la base de
données, comme l'utiliserait une personne.

**Environnement** — Une installation séparée du système. Les habituels : développement (la machine
du programmeur), UAT (test du client) et PROD (production, le vrai).

**Spécification des exigences** — Dans la méthode classique, un document long qui décrivait tout ce
que le système devait faire. Dans cette méthode il se décompose : chaque élément en attente porte sa
spécification détaillée complète, et la somme des éléments en attente est la spécification du
système. Voir B.5.

**Squelette (scaffold)** — La structure initiale d'un projet, sans fonctionnalité : il démarre, il a
des tests vides, il se déploie.

**Fail-closed** — « Échoue fermé » : dans le doute ou en cas d'erreur, le système n'agit pas. Le
contraire de « fail-open », qui, dans le doute, continue.

**Fallback (vers le legacy)** — Revenir à un ancien chemin quand le nouveau échoue. La méthode
l'interdit : s'il y a un ancien système, on l'audite et on migre ; on ne le laisse pas comme filet de
sécurité silencieux.

**Fixture** — Des données de test qu'on charge avant de lancer un test ou un déploiement.

**Flip (interrupteur)** — Un changement de configuration qui choisit entre deux chemins (par
exemple, l'ancien moteur ou le nouveau) sans toucher au code.

**Forge (Yujin Forge)** — L'outil que j'ai construit : une couche au-dessus de Claude Code qui lui
ajoute la méthode (doctrines, portes, éléments en attente, un panneau de chat, une application
mobile, et le mode embarqué).

**Frontend** — La partie visible du système : les écrans.

**Full scan** — Une requête à la base de données qui lit la table entière parce qu'elle n'a pas
d'index pour l'aider. Avec de petites tables on ne le remarque pas ; avec des millions de lignes,
cela fait tomber le système.

**G-DOC** — Dans Forge, la porte qui exige que la documentation se mette à jour dans le même commit
que le changement.

**gate-ci** — Le job de déploiement de Kikan qui attend que l'intégration continue se termine au
vert avant d'empaqueter.

**GCP** — Google Cloud Platform, le nuage où tournent les serveurs des deux systèmes de
l'Association.

**GOTCHAS** — Un fichier qui enregistre les « pièges » connus : des erreurs que nous avons déjà
payées une fois, avec leur odeur, leur cause racine, leur correctif et comment les détecter avant.

**Greenfield / brownfield** — Un projet nouveau à partir de zéro (greenfield, « champ vert »)
contre un projet qui part de quelque chose d'existant (brownfield, « champ usé »).

**Grep** — Une commande qui cherche du texte dans des fichiers. « Un compteur, pas grep » signifie :
un chiffre important ne s'obtient pas en comptant avec une recherche de texte, mais avec un
programme qui a un test.

**Heap** — La mémoire qu'utilise un programme. « La batterie mourait par le heap » veut dire que les
tests se retrouvaient sans mémoire et qu'on aurait dit qu'ils échouaient.

**HITL (human in the loop, humain dans la boucle)** — Une conception où une personne approuve avant
que le système agisse. Dans Autorizaciones, l'approbateur manuel.

**Orphelin (tour orphelin)** — Un processus qui continue de tourner alors que celui qui l'a lancé
en a déjà perdu la trace.

**Index** — Une structure auxiliaire de la base de données qui rend une recherche rapide. Sans
index, la requête est un full scan.

**Ingestion des exigences** — Le moment où la demande du métier entre dans la méthode : d'abord en
prose, avec le propriétaire, puis convertie en éléments en attente vérifiables par l'agent, qui
demande ce qui manque.

**IPC (laisse entre processus)** — Un canal entre deux processus. Dans Forge on l'a utilisé comme
« laisse » : si le processus parent meurt, l'enfant s'en aperçoit et s'éteint.

**JSON (stockage en)** — Garder les données dans des fichiers texte au format JSON au lieu d'une
base de données. Cela sert pour démarrer ; cela ne sert pas pour des millions de lignes.

**Kikan** — Le système de guichet d'entrée omnicanal et de campagnes de l'Association, le deuxième
système en production.

**Legacy (hérité)** — Un ancien système toujours en usage.

**Ligne de temps** — La Partie B de ce document : quand on gravit chaque échelon et quelles tâches
d'infrastructure, d'ingestion, de développement, de tests et de regard humain se passent entre les
deux.

**Journal (log)** — L'enregistrement de ce qu'un programme fait au fur et à mesure. « Valide avec le
journal » signifie : ne fais pas confiance à ce que l'agent dit avoir fait, regarde le journal.

**MariaDB** — Le moteur de base de données SQL qu'utilise Kikan en production.

**Compteur gardé** — Un script qui mesure quelque chose (combien de requêtes, combien de boucles)
et qui a son propre test qui vérifie que le compteur mesure bien. « Gardé » veut dire « protégé par
un test ».

**Mentir (un compteur)** — Quand un instrument renvoie un chiffre faux parce qu'il ne voit pas une
partie de ce qu'il doit mesurer. Cela nous est arrivé deux fois.

**Mois trois** — Expression à moi pour le moment où un système construit à la hâte commence à
montrer ses problèmes : quand il a déjà de vraies données et de vrais utilisateurs.

**Mock (simuler)** — Remplacer une partie réelle du système par une simulation pendant un test.
« Ne pas se mocker soi-même » signifie ne pas simuler précisément la partie qu'on veut tester.

**Mutation (rouge par)** — La façon de démontrer qu'un test de caractérisation surveille quelque
chose : casser le flux délibérément avec un changement temporaire, voir le test au rouge, annuler,
voir le vert. Un test de caractérisation sans son rouge par mutation est un test qui passe parce
qu'il ne regarde rien.

**NAC3** — Le protocole de Forge qui fait que les écrans d'une application peuvent être pilotés par
programme (chaque élément de l'interface a un identifiant et des méthodes). Il permet le test de
bout en bout. Il n'est pas obligatoire pour la méthode : c'est le moyen, pas la condition.

**Node (Node 22)** — L'environnement où tourne le JavaScript du serveur. « Node 22 fixé » veut dire
qu'on a épinglé la version pour que tous les environnements utilisent la même.

**Normalisation** — Amener un système qui n'est pas né avec la méthode à l'état que la méthode
tient pour acquis au moment d'ouvrir la boucle, sans toucher à sa fonctionnalité. Cela se fait à
deux vitesses : la ceinture de sécurité avant tout changement, et le reste de la dette **au fur et
à mesure qu'on y touche**, module par module (les éléments en attente de normalisation marqués
« se paie quand on y touche » entrent avec le bloc qui entre dans leur module). Jamais « une
semaine de grand nettoyage ».

**Mutuelle (la)** — C'est ainsi que j'appelle l'organisme de santé client du premier système en
production (son nom réel reste réservé).

**Oracle** — Une source de vérité externe contre laquelle on peut vérifier un résultat.

**P0, P1, P2** — Niveaux de priorité d'un constat : P0 est ce qu'il faut résoudre tout de suite.

**Pilote automatique** — Un mandat écrit pour que l'agent travaille seul pendant des heures (24 ou
48) en faisant des commits et des pushes sans demander, et livre un résumé à la fin.

**Écraser (une configuration)** — Écrire par-dessus quelque chose par accident.

**Tableau (le tableau partagé)** — Le tableau partagé de Forge où l'agent dépose des rapports pour
que je les lise.

**Playwright** — Un outil qui pilote un navigateur par programme pour tester des écrans comme le
ferait une personne.

**PND (élément en attente)** — Un item numéroté de la file de travail (PND-001, PND-002…). Dans
cette méthode, les éléments en attente SONT le plan, chacun porte sa spécification détaillée, et les
éléments en attente clos sont la documentation de ce qui a été fait.

**Élément en attente clos (documentation du fait)** — Un élément en attente qui, à sa clôture,
conserve sa spécification, la décision qui l'a originé, la preuve avec laquelle il a été clos, le
commit et la date. La file des éléments en attente clos est l'historique fonctionnel du système.

**Budget de requêtes** — Le maximum de requêtes à la base qu'un chemin de l'application peut faire,
mesuré et protégé par un test.

**Prouvé en rouge** — Un test dont on a démontré qu'il ÉCHOUE contre l'ancien code avant que le
correctif le mette au vert.

**PROD (production)** — Le vrai environnement, celui qu'utilise le client.

**Promotion (UAT → PROD)** — Faire passer quelque chose de l'environnement de test à celui de
production de façon contrôlée.

**Tests d'acceptation** — Les tests que fait le propriétaire, ou un utilisateur de confiance, en
utilisant le système comme il l'utiliserait pour de vrai, avant de l'accepter pour la production.
Ils sont humains ; ce n'est pas l'agent qui les fait.

**Pull / push** — Descendre et monter du code depuis et vers le dépôt distant (GitHub).

**Ref. N** — Une référence courte à un cas réel, expliqué dans le document de références avec sa
date et sa preuve. Elle est là pour que les procédures restent propres et que le détail reste
disponible.

**Régression** — Un test qui vérifie que quelque chose qui fonctionnait déjà continue de fonctionner
après un changement.

**Dépôt (repo)** — L'endroit où vit le code avec toute son histoire. « Dépôt standard » veut dire
un dépôt géré avec Git et avec une structure reconnaissable.

**Rétention (retention)** — Combien de temps on garde les données de chaque table avant de les
supprimer.

**Rollback (retour arrière)** — Revenir à la version précédente quand un déploiement tourne mal.

**RPAForce** — Ma marque, sous laquelle ces systèmes sont livrés.

**Runbook** — Une procédure opérationnelle écrite pas à pas. « Idempotent » veut dire qu'on peut la
lancer deux fois sans rien casser.

**Semeur (seeder)** — Un script qui charge des données de test dans un environnement.

**Shift left** — Déplacer les tests plus tôt dans le processus de développement.

**Smell (odeur)** — Un signe que quelque chose ne va pas dans le code, avant qu'il n'échoue.

**SQ (standards de qualité)** — Le contrat de collaboration entre l'humain et l'agent dans Forge.

**SQL** — Le langage des bases de données relationnelles.

**Station (N0 à N7)** — Chacune des huit étapes du tronçon de normalisation du chemin
évolutif-correctif. Je les appelle des stations et non des échelons pour qu'elles ne se confondent
pas avec les seize de l'échelle : ce ne sont pas de nouveaux échelons, ce sont ceux du démarrage
(et le 8, le 11 et le 12) dans un autre ordre et avec une autre entrée.

**Tag** — Une étiquette sur un commit qui marque une version.

**TDD** — « D'abord le test, ensuite le code ». La méthode le laisse comme option pour les petits
périmètres, pas comme règle universelle.

**Token (jeton)** — Deux sens. En IA : l'unité avec laquelle on mesure (et on facture) le texte que
traite le modèle. En sécurité : un identifiant d'accès.

**Tronçon** — Chacun des trois groupes d'échelons : démarrage (0 à 4), boucle (5 à 10),
exploitation (11 à 15).

**Traçabilité** — Pouvoir suivre une exigence jusqu'à l'élément en attente qui l'implémente, le
test qui la prouve et le commit qui l'a close. Dans la méthode ce n'est pas une matrice à part :
c'est l'élément en attente lui-même, qui cite son origine et sa preuve.

**Cliquet** — Un mécanisme qui ne tourne que dans un sens. Dans Kikan, un compteur d'appels sans
`await` qui ne peut que descendre : s'il monte, le test échoue.

**Tour** — Un aller-retour de la conversation avec l'agent : l'utilisateur demande, l'agent
travaille et répond.

**UAT** — L'environnement où le client teste avant la production.

**Urazuke** (裏付け) — Le nom de la méthode. En japonais, l'appui dont dispose une affirmation, ce
qui la soutient par derrière ; *urazukeru*, étayer par des preuves. Se prononce ou-ra-ZOU-ké. Ne se
traduit pas.

**Vibecoding / vibecoder** — Construire du logiciel en conversant avec une IA, en décrivant ce
qu'on veut, au lieu d'écrire le code à la main. Un vibecoder est celui qui le fait.

**Veilleur** — Dans Autorizaciones, le processus qui vérifie périodiquement ce qui est resté bloqué
et le pousse, avec des gardes pour ne pas pousser deux fois.

**Regard humain sur les écrans** — L'habitude que le propriétaire regarde une capture réelle de
chaque écran nouveau ou modifié, dans l'environnement de test, avec chaque élément en attente qui
le touche. Dix secondes qui trouvent ce qu'aucun test ne trouve.

**Volumétrie** — Combien de données le système va gérer : lignes par an, utilisateurs, pics.

**Chien de garde (watchdog, veilleur de silence)** — Un processus qui vérifie si un autre continue
de donner signe de vie, et le tue s'il reste silencieux trop longtemps.

**Yujin** — L'écosystème dont Forge est le produit commercial.
