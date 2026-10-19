# Urazuke — le développeur junior à l'ère de l'après-programmation à la main : ce qui change dans sa formation, avec quel objectif le former et comment

Auteur : Pablo Kuschniroff, assisté par Claude Code. Version 1, 18 octobre 2026. Ce document
accompagne le [document principal](ESCALERA_METODOLOGICA.md) de la méthode et les deux parties du
cours ([projet neuf](MANUAL_CURSO.md), [projet hérité](MANUAL_CURSO_EVOLUTIVO.md)). Il est écrit
pour trois lecteurs : celui qui dirige une équipe et doit décider ce qu'il enseigne aux gens qui
arrivent ; celui qui donne des cours ou du mentorat ; et le junior lui-même, qui veut savoir en quoi
se transformer. Les mots étranges sont dans le glossaire du document principal. Dépôt public :
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## Pourquoi j'écris ceci

Pendant trente ans, un développeur junior s'est formé d'une seule manière : en écrivant du code
sous supervision. Il entrait en sachant un langage à moitié, on lui donnait des tâches petites et
bornées, un senior relisait son code, et en deux ou trois ans à écrire et à se faire corriger il
apprenait le métier. Le code était à la fois le travail et l'école.

C'est terminé, et pas parce que les juniors ne servent plus à rien, mais parce que **le modèle
écrit le code**. Avec ma méthode, celui qui construit ne lit pas le code : il exige des preuves.
Alors la question qu'on me pose, et que je me pose, est honnête et urgente : si le junior n'écrit
plus le code, comment apprend-il ? Et qu'apprend-il ? Et pour devenir quoi ?

J'ai une réponse, et je l'écris depuis deux endroits. Le premier, les trois systèmes que j'ai
construits ainsi, dans lesquels j'ai été le seul humain et où j'ai vu, incident après incident,
quelles compétences m'ont sauvé et lesquelles ne m'ont pas manqué. Le second, les années passées à
enseigner l'ingénierie des systèmes avant que les modèles n'existent : une grande partie de ce qu'il
faut aujourd'hui enseigner à un junior est ce que l'ingénierie des systèmes classique a toujours
enseigné et que l'industrie a cessé de pratiquer quand le métier est devenu « programmer ». Le
modèle nous oblige à revenir à ce qu'était le métier avant que le clavier ne le recouvre.

Un avertissement pour qu'on ne me comprenne pas de travers : je ne dis pas que le junior n'a pas
besoin de savoir programmer. Je dis qu'**il ne se forme plus en programmant**, et que ce qu'il doit
savoir de la programmation change de nature : de métier à alphabétisation.

## Ce que faisait un junior, et ce qu'il fait maintenant

| | Avant | Maintenant, avec la méthode |
|---|---|---|
| **Ce qu'il produit** | Du code, sous supervision. | De la preuve : des contrats, des arbres sémantiques, des éléments en attente spécifiés, des vérifications de complétude, des décisions écrites. Le code, c'est le modèle qui le produit. |
| **Comment il apprend** | En écrivant et en recevant des corrections sur le code. | En dirigeant le modèle échelon par échelon et en recevant des corrections sur la preuve qu'il a exigée et sur celle qu'il a acceptée sans l'exiger. |
| **Ce que relit le senior** | Son code. | Son discernement : ce qu'il a demandé au modèle, ce que le modèle a supposé sans qu'il le détecte, ce qu'il a accepté comme « terminé » sans preuve. |
| **Quelle est son erreur typique** | Un bug. | Croire le modèle. |
| **Quand il est utile** | Quand il écrit du code qu'il ne faut pas réécrire, et cela prend du temps. | Quand il termine son premier petit projet avec les vingt-quatre échelons : la méthode ne promet pas la vitesse, elle promet un système exploitable et un discernement formé. |
| **En quoi il se transforme** | En un programmeur qui connaît plus de langages et de frameworks. | En quelqu'un qui peut répondre d'un système sans en avoir écrit une ligne : un ingénieur systèmes qui dirige des modèles. |

## L'impact sur les axes de formation

Je le dis d'abord en une phrase et ensuite je le démonte : **ce qui perd du poids, c'est tout ce
que le modèle fait mieux qu'un junior de deux ans, et ce qui gagne du poids, c'est tout ce que le
modèle fait mal et que la méthode existe pour corriger**. Cette seconde liste, je ne l'ai pas
inventée : c'est la liste des échecs du document de références, regardée à l'envers. Chaque échec
du modèle est une compétence que l'humain doit avoir.

### Les axes qui perdent du poids

- **La syntaxe et les langages.** Savoir un langage « par cœur » était la moitié de la formation.
  Plus maintenant : le modèle écrit dans n'importe lequel, mieux et plus vite. Ce qui reste, c'est
  savoir les *lire*, ce qui est autre chose (voir plus bas).
- **Les frameworks et les bibliothèques.** Connaître l'API d'une bibliothèque avait une valeur
  marchande. Le modèle la connaît en entier, avec ses versions. Le junior doit savoir qu'elles
  existent, à quoi elles servent et quand en choisir une, pas comment s'appelle chaque fonction.
- **La frappe et la productivité d'écriture.** Raccourcis de l'éditeur, autocomplétion, générer
  l'échafaudage à la main. Cela a disparu comme axe.
- **Le débogage ligne par ligne comme métier principal.** Il existe toujours, mais il change de
  place : c'est maintenant le dernier outil, quand la preuve (le journal, le test en rouge, le
  compteur) n'a pas suffi.
- **La mémoire du « comment on fait telle chose ».** Motifs, recettes, astuces. Le modèle les a
  tous.

### Les axes qui gagnent du poids

Je les ordonne par l'échelon où ils s'exercent, parce que c'est la façon de les enseigner.

1. **Ingénierie des exigences** (échelons 0, 2, 3, 5). Interviewer un propriétaire qui ne sait pas
   ce qu'il veut, écrire en prose ce qu'il veut, nommer des cas d'utilisation, construire l'arbre
   sémantique du métier, spécifier un élément en attente avec ses critères d'acceptation sous la
   forme « étant donné, quand, alors », distinguer une donnée primaire d'une donnée dérivée et
   demander la primaire au lieu de l'estimer. C'est la compétence numéro un, et c'est celle que
   l'industrie a cessé d'enseigner il y a vingt ans. Le modèle y est mauvais par conception : il
   comble les trous avec le plus probable, et le plus probable n'est pas ce dont le métier a besoin.
2. **Conception de la vérification** (échelons 8, 7, 12, 19). Non pas écrire le test : savoir quel
   test démontre quoi, pourquoi un test doit se voir en rouge avant de valoir quelque chose, ce
   qu'est un test de bout en bout et ce qu'est une simulation qui ne prouve rien, quel chiffre
   décide de quelque chose et avec quel instrument il se mesure, comment on lit un rapport et
   comment on y distingue le vérifié du cru. Le junior doit pouvoir dire « ce test ne prouve pas ce
   que tu dis » sans lire le test.
3. **Lecture de la preuve** (tous les échelons). Lire un rapport du modèle avec une méfiance
   entraînée : trouver l'affirmation sans preuve, le « ça devrait marcher » déguisé en vérifié,
   l'angle mort non déclaré, le « terminé » qui ne l'était pas
   [Ref. 43](REFERENCIAS.md#ref-43). Cette compétence n'existait pas comme axe de formation parce
   qu'il n'y avait personne qui mentît avec autant d'assurance et une aussi bonne rédaction.
4. **Dimensionnement et exploitation** (échelons 3, 4, 15, 16 à 22). Ce qu'est un environnement,
   comment on déploie, ce qu'est l'intégration continue, ce qu'on mesure en production, ce qu'est
   un index, un point de rupture, un seuil d'alerte. Avant, c'était le territoire d'un autre rôle ;
   maintenant le junior dirige le modèle qui le fait, et il doit savoir quoi lui demander et
   comment vérifier qu'il l'a fait.
5. **Sécurité et conséquence** (échelons 14, 18). Quelles actions du système agissent sur le monde,
   ce qu'est un verrou, ce qu'est le fail-closed, ce qu'est une vulnérabilité et pourquoi une mise
   à jour de dépendance est un changement.
6. **Décision et communication avec le propriétaire** (échelons 1, 6, 20). Bien demander, avec une
   recommandation et une solution de rechange ; écrire une décision avec les mots textuels, la date
   et le propriétaire ; écrire un manuel qu'une personne qui ne programme pas puisse suivre. Le
   junior est, dans la méthode, le traducteur entre le propriétaire et le modèle, et la traduction
   se fait dans les deux sens.
7. **Anglais instrumental.** Les prompts de la méthode sont en anglais, parce que les modèles
   suivent les instructions avec plus de précision en anglais. Il n'est pas nécessaire de le
   parler ; il est nécessaire de lire un prompt et de comprendre chaque clause, et de pouvoir
   écrire une clause nouvelle quand le cas le demande.
8. **Le catalogue des échecs du modèle.** Reconnaître, à l'odeur, chaque façon dont le modèle se
   trompe : il suppose au lieu de demander, il invente une donnée primaire, il rapporte de trop, il
   fait du « tant que j'y suis » hors du périmètre, il remanie ce qu'on ne lui a pas demandé, il
   améliore vos mots, il clôt sans preuve, il se tait quand il ne sait pas. Les quatre corrections
   que j'ai faites en séance et qui sont devenues des règles [Ref. 45](REFERENCIAS.md#ref-45) en
   sont l'exemple : chacune est un échec qu'un junior formé doit détecter dès le premier rapport.
9. **Le coût comme budget.** Jetons, quota d'intégration continue, temps du propriétaire. Le junior
   qui ne regarde pas le coût répète l'équipe multi-agent qui dépensait le double et livrait la
   moitié [Ref. 6](REFERENCIAS.md#ref-6).

### Ce que le junior doit bel et bien savoir de la programmation : l'alphabétisation, pas le métier

Voici la nuance qui m'importe le plus, et celle que l'on comprend le plus souvent de travers. Un
junior qui n'a jamais écrit de code ne sait pas quand le modèle ment *dans* le code, et la méthode
a un moment, que je marque aujourd'hui comme hypothèse dans le document principal, où l'humain doit
bel et bien regarder. C'est pourquoi l'alphabétisation minimale n'est pas négociable. La liste :

- **Lire du code**, pas l'écrire : suivre une fonction, comprendre une condition, reconnaître une
  boucle, voir où se fait une requête à la base. Comme lire un contrat sans être avocat.
- **Comment tourne un système** : ce qu'est un serveur, un processus, une base de données, une
  requête HTTP, un navigateur, une tâche programmée. Où vit chaque chose.
- **Git** : ce qu'est un commit, une branche, un push, un historique. Assez pour lire la trace de
  preuve que la méthode y laisse.
- **SQL de base** : lire une requête et comprendre quelle table elle lit et avec quel filtre. C'est
  la langue des données, et celle des chiffres de l'échelon 7.
- **Le terminal** : lancer une commande que le modèle vous a donnée et lire sa sortie. Si le junior
  ne peut pas lancer le compteur, il ne peut pas vérifier le chiffre.
- **Le débogage comme dernier outil** : quand le journal, le test et le compteur n'ont pas suffi,
  ouvrir le code avec le modèle à côté et lire ensemble.

Cela s'enseigne à la première étape, se pratique pendant tout le cours, et ce n'est pas le
métier : c'est l'alphabétisation qui permet de l'exercer.

## Avec quel objectif former un junior

Je le dis sans détour, parce que de la clarté de l'objectif dépend tout le reste. L'objectif de
former un junior à l'ère de l'après-programmation à la main est de former quelqu'un qui **puisse
répondre d'un système en production sans en avoir écrit une ligne de code** : qui puisse mener un
petit projet à travers les vingt-quatre échelons de bout en bout, en dirigeant un modèle, en lui
exigeant des preuves à chaque pas, en décidant avec le propriétaire, et en sachant à tout moment ce
qui est vérifié, ce qui est cru et ce qui ne se voit pas. Je l'appelle, provisoirement,
*propriétaire technique de la preuve* : celui qui ne lit pas le code et qui pourtant peut dire,
preuves en main, que le système fait ce que le métier a demandé et qu'il va continuer de le faire
demain.

Trois conséquences de cet objectif, qui ordonnent la formation :

1. **L'artefact d'évaluation est la preuve, pas le code.** Un junior s'évalue par le contrat qu'il a
   écrit, l'arbre qu'il a construit, l'élément en attente qu'il a spécifié, le rouge qu'il a exigé,
   le rapport qu'il n'a pas accepté. La grille de l'annexe A du manuel du cours le dit déjà : non
   gravi, gravi, gravi avec preuve de discernement. Ce troisième niveau, pouvoir raconter un cas où
   le modèle s'est trompé et comment il l'a détecté, est le véritable objectif.
2. **Le réflexe se forme avec des incidents, pas avec de la théorie.** Personne n'apprend à se
   méfier du modèle en lisant qu'il faut s'en méfier ; on l'apprend quand le modèle dit « terminé »
   et que ce ne l'était pas, et qu'on le découvre dans l'environnement de test. C'est pour cela que
   le cours a des épreuves faites exprès (laisser une question sans réponse et voir ce que fait le
   modèle ; laisser des suppositions dans le relevé), et c'est pour cela que la formation doit avoir
   des incidents conçus, et pas seulement des tâches qui se passent bien.
3. **Le junior se forme à la méthode entière, pas à un tronçon.** La tentation est de le mettre « à
   faire des éléments en attente » dans la boucle, ce qui ressemble le plus à lui donner de petites
   tâches de code. C'est une erreur : la boucle sans le démarrage, c'est construire sur du sable, et
   le junior qui n'a jamais fait un échelon 0 ou un 3 ne comprend pas pourquoi le 5 a la forme qu'il
   a. Les deux projets-guides existent pour cela : un neuf et un hérité, de bout en bout, les
   vingt-quatre échelons et les huit stations.

## Comment le former : le plan

Ce qui suit est le plan que j'utiliserais, et que je vais utiliser avec la première cohorte :
quatre étapes, sans délais (la méthode n'en a pas, et la formation non plus : chaque étape se
termine quand sa liste de sortie donne « oui »), avec un mentor, sur les deux projets-guides du
cours, et ensuite un petit projet réel avec un vrai propriétaire.

### Étape 1 : alphabétisation et le modèle comme objet d'étude

- L'alphabétisation ci-dessus : lire du code, comment tourne un système, git, SQL de base, le
  terminal. Avec le modèle à côté, qui explique ; le junior n'écrit pas, il lit et il lance.
- **Le modèle comme objet d'étude** : un temps à faire des demandes au modèle dans le seul but
  de le voir échouer. Lui demander une donnée qu'il n'a pas et voir s'il l'invente. Lui donner une
  demande ambiguë et voir s'il pose une question. Lui demander de clore quelque chose et voir s'il
  dit « terminé » sans preuve. Lui demander de corriger un bug sans le reproduire. Chaque échec se
  note avec son odeur. À la fin de l'étape le junior a son propre catalogue, et c'est le
  catalogue du document de références, redécouvert.
- Lecture du document principal, le glossaire à portée de main, et des références : l'histoire d'où
  sort chaque règle.

### Étape 2 : le projet neuf, avec mentor

Le manuel du cours, partie 1, tel quel, sur le projet-guide « Turnera » ou sur un petit projet à
soi. Les vingt-quatre échelons. Avec trois règles de mentorat :

- **Le mentor relit la preuve, pas le code.** Il lit le contrat de collaboration, l'arbre
  sémantique, la spécification de trois éléments en attente, le rapport de clôture d'un élément en
  attente, le rapport de l'audit, le rapport du test de charge. Et il pose une seule question à
  chaque fois : « comment sais-tu que c'est vrai ? ». Si la réponse est « parce que le modèle l'a
  dit », l'échelon n'est pas gravi.
- **Le mentor conçoit des incidents.** De temps en temps, sans prévenir, il altère quelque
  chose : il change une donnée du relevé, il glisse une supposition dans la volumétrie, il demande
  un changement hors périmètre à travers le modèle. Le junior doit le détecter par la preuve.
- **Le junior tient son propre registre des échecs du modèle** : chaque fois qu'il l'a attrapé,
  quelle odeur cela avait, à quel échelon. À la fin du projet, ce registre est sa rétrospective
  personnelle, et c'est lui qui écrit la proposition de changement à l'échelle (échelon 23).

### Étape 3 : le projet hérité, avec moins de mentor

Le manuel, partie 2 : la Turnera héritée, ou un petit système hérité réel. Le tronçon de
normalisation et les deux premiers blocs. Ici le mentorat baisse : le mentor lit la carte récupérée
et les divergences, le rapport de l'audit avec ses marques de vitesse, et la clôture du premier bug
en mode correctif. L'objectif de cette étape est que le junior apprenne ce que le projet neuf
n'enseigne pas : lire un système qui n'est pas le sien à travers le modèle, décider avec le
propriétaire ce qui, dans ce que le code fait, est faux et ce qui était une règle oubliée, et ne
pas réécrire.

### Étape 4 : le projet réel, seul

Un petit projet pour de vrai, avec un vrai propriétaire qui a quinze minutes par jour, de bout en
bout. Le mentor n'intervient pas ; il lit la rétrospective chiffrée à la fin. Si le junior arrive
en production avec les vingt-quatre conditions de la liste de mise en production à « oui », il est
formé. Sinon, la liste dit exactement quel échelon regravir, et cela aussi, c'est de la formation.

### Ce qui mesure le progrès

Pas combien d'éléments en attente il a clos. Trois choses, dans cet ordre :

1. **Combien de fois il a attrapé le modèle**, et à quel échelon. Un junior qui, sur tout le projet
   neuf, n'a pas attrapé le modèle une seule fois ne regarde pas : le modèle échoue toujours.
2. **Combien cela a coûté au propriétaire.** Des minutes par jour de questions ; si elles montent,
   le junior transfère au propriétaire ce que la méthode lui demande à lui de résoudre
   (échelon 1).
3. **La qualité de sa proposition de changement à l'échelle.** C'est l'indicateur de discernement :
   un junior qui propose un changement concret, justifié par un incident à lui, a compris la
   méthode comme quelque chose de vivant et non comme une liste.

## L'impact sur les rôles et sur l'équipe

Je le dis parce que celui qui dirige une équipe va me le demander. Si le junior se forme ainsi,
l'équipe change de forme :

- **Le junior** cesse d'être « celui qui écrit le facile » et devient celui qui mène un petit projet
  entier avec la méthode. Il a plus de valeur plus tôt, et il est plus dangereux plus tôt, parce
  qu'il dirige un modèle qui construit vite ; c'est pour cela que la méthode est la condition, pas
  un supplément.
- **Le senior** cesse de relire du code et passe à trois choses : écrire et maintenir les contrats
  (celui de collaboration, les portes, les verrous), auditer avec une autre session (échelon 13) et
  décider ce que le junior ne peut pas décider (l'architecture, le « fois dix », ce qui bloque). Sa
  valeur se déplace du clavier vers le discernement, là où elle a toujours été chez les bons.
- **L'équipe rapetisse et s'aplatit.** Un senior et deux ou trois juniors avec la méthode portent
  ce que portait avant une équipe de huit. Je l'ai vu dans mes propres chiffres quand j'ai éliminé
  une équipe entière d'agents [Ref. 6](REFERENCIAS.md#ref-6) : la même logique s'applique aux
  humains qui dirigent des modèles.
- **Le propriétaire du domaine entre dans l'équipe.** Avec quinze minutes par jour, mais il entre,
  parce que la méthode l'exige. Former un junior inclut lui apprendre à obtenir ces quinze minutes
  et à ne pas les gaspiller.

## Les risques, dits sans les adoucir

- **Le junior qui n'a jamais écrit de code et ne sait pas quand regarder.** C'est le risque
  principal, et je l'atténue avec l'alphabétisation obligatoire et avec l'exercice du débogage comme
  dernier outil. Mais je le marque comme hypothèse : je ne sais pas encore combien de code il faut
  avoir écrit pour bien lire celui qu'écrit un autre. Je soupçonne que c'est peu, et je soupçonne
  que ce qui compte n'est pas d'avoir écrit mais d'avoir *débogué*.
- **La dépendance à un outil.** La méthode est neutre vis-à-vis de l'outil, à dessein. Un junior
  formé sur un seul outil apprend ses raccourcis et non la méthode ; la formation doit passer par
  au moins deux.
- **Le coût invisible.** Un junior avec un modèle dépense des jetons comme s'ils étaient gratuits.
  Le budget de jetons doit faire partie de la formation dès la première étape, avec le chiffre sous
  les yeux.
- **L'illusion de vitesse.** Le modèle construit en une session ce qui prenait avant bien plus
  longtemps, et le junior peut croire qu'il a fini. La liste de mise en production, avec ses
  vingt-quatre conditions, est l'antidote : « terminé » a une définition, et ce n'est pas « ça marche ».
- **Le mentor qui relit le code par habitude.** C'est le risque du côté du senior, et il est
  sérieux : un mentor qui lit le code enseigne au junior que la preuve ne suffit pas, ce qui est
  exactement le contraire de la méthode. Le mentor doit se former à la méthode avant le junior.

## Ce qui reste à élaborer `[hypothèse]`

1. Combien de programmation il faut avoir faite pour bien lire le code d'un autre. Mon intuition est
   que ce qui compte est d'avoir débogué, pas d'avoir écrit, et qu'il en faut peu. Sans données pour
   l'instant.
2. Le plan de quatre étapes est écrit depuis mes projets et depuis ce que j'ai enseigné avant les
   modèles, pas depuis une cohorte. La première le corrigera, comme elle corrigera le cours.
3. Si le « propriétaire technique de la preuve » est un rôle nouveau ou si c'est l'ingénieur
   systèmes de toujours avec un autre outil. Je penche pour la seconde hypothèse, et alors le nom
   est de trop ; mais le marché va avoir besoin d'un nom, et je préfère en proposer un avant qu'il
   n'en propose un pire.
4. Ce qui arrive au junior qui entre dans une équipe qui n'utilise pas la méthode. Ce document
   suppose que l'équipe l'adopte ; sinon, le junior formé ainsi va se heurter à un senior qui lui
   demande du code. Je n'ai pas de réponse, sinon que la méthode est publiée pour que ce senior la
   lise.
