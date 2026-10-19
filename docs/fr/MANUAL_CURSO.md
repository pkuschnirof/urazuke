# Urazuke — le cours. Manuel avec tâches pratiques, échelon par échelon, jusqu'à l'application en production

Auteur : Pablo Kuschniroff, assisté par Claude Code. Version 2, 18 octobre 2026. C'est un
document de travail du projet Urazuke : je vais le corriger avec la première cohorte qui l'utilisera.
Cette version est écrite en français, dans le langage de tous les jours, et chaque sigle ou
expression étrange se trouve dans le glossaire du document principal (`ESCALERA_METODOLOGICA.md`).
Quand je cite un cas réel, je le fais avec une marque `[Ref. N]` qui mène au
[document de références](REFERENCIAS.md) ; le manuel reste propre et le détail, à un clic. Le dépôt
public de la méthode est [github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## Avant de commencer

### À qui s'adresse ce cours

À quelqu'un qui veut construire du logiciel avec l'intelligence artificielle **et que ce logiciel
soit vraiment utilisé**, par de vraies personnes, pendant des mois. Ce n'est pas un cours de
programmation : vous n'allez pas apprendre un langage ni un framework. Ce n'est pas non plus un
cours de « prompts » : vous n'allez pas apprendre des astuces pour que le modèle écrive mieux. C'est
un cours de **méthode** : quoi faire dans quel ordre, quoi demander au modèle à chaque moment, ce
qu'il doit vous livrer, et comment savoir — sans lire de code — que ce qu'il vous a livré est
complet.

Il vous sert si vous êtes l'une de ces personnes :

- Vous avez une entreprise, un cabinet, un petit bureau de conseil, et vous voulez votre propre
  système sans embaucher une équipe de développement.
- Vous êtes consultant ou freelance en automatisation et vos clients vous demandent « quelque chose
  de plus » qu'un robot.
- Vous savez programmer, mais vous voulez que le modèle fasse le gros du travail et garder pour vous
  les décisions.
- Vous avez déjà « vibecodé » quelque chose, ça a marché deux semaines, et au mois trois ça vous est
  tombé dessus.

Il ne vous sert pas si ce que vous voulez est un prototype pour une démo de vendredi. Pour cela il
existe des outils plus rapides, et cette méthode vous paraîtra lente. La méthode est pour ce qui
doit continuer à fonctionner après la démo.

### Ce que vous aurez à la fin

Une application à vous, tournant en production, avec : des tests qu'on a vus échouer avant de
passer ; des tests de bout en bout de tous les flux ; un déploiement reproductible avec retour
arrière ; la configuration et les secrets hors du dépôt ; les décisions de métier écrites avec leur
date ; un arbre sémantique du système et la spécification détaillée de chaque chose construite, dans
ses éléments en attente ; des verrous sur tout ce qui encaisse, envoie ou efface ; trois manuels
qu'une personne peut suivre sans IA ; un audit fait par un agent différent de celui qui a construit ;
et une rétrospective chiffrée. C'est ce que j'appelle ici « production grade » : ce n'est pas que ça
fonctionne, c'est que **ça peut se maintenir**.

Et vous aurez quelque chose de plus, qui est ce que vous emportez vraiment : le réflexe de ne pas
croire le modèle sans preuve, et de savoir exactement quelle preuve lui demander à chaque pas.

### Ce dont vous avez besoin

1. **Un outil d'IA pour programmer.** N'importe lequel capable de lire et d'écrire des fichiers
   dans votre dépôt et d'exécuter des commandes : Claude Code, Cursor, Codex CLI, Gemini CLI, Forge.
   La méthode ne dépend pas de l'outil ; le document principal a un tableau indiquant où va chaque
   artefact dans chaque outil. Dans ce manuel je dis « l'agent » pour désigner celui que vous
   utilisez.
2. **Un compte GitHub** (ou équivalent) et des notions minimales de ce qu'est un dépôt, un commit
   et un push. Si vous ne les avez pas, consacrez-y une après-midi avant de commencer ; n'importe
   quel tutoriel d'introduction suffit. Il n'en faut pas plus.
3. **Un projet.** L'idéal est qu'il soit à vous : un système dont vous avez besoin ou qu'un client
   vous a demandé, avec des utilisateurs qui vont s'en servir. Si vous n'en avez pas, utilisez le
   **projet-guide** que je décris plus bas ; il est pensé pour passer par les vingt-quatre
   échelons sans en sauter aucun. Si ce que vous avez est un système qui existe déjà et qu'il faut corriger ou
   faire grandir, cette première partie vous enseigne la méthode sur un projet neuf, et la [partie
   2 du cours](MANUAL_CURSO_EVOLUTIVO.md) vous enseigne à le normaliser d'abord, avec un second
   projet-guide hérité.
4. **Du temps.** Le cours a vingt-quatre leçons, une par échelon, et un ordre qui vous dit à
   quelle étape tombe chaque chose (voir « L'ordre du cours »). Je ne vous donne pas de délais, à
   dessein : la méthode est un procédé, pas une promesse de vitesse, et le temps que prend chaque
   étape, c'est la taille de votre projet qui le fixe. Ce que je vous donne, c'est l'ordre, et
   celui-là ne se négocie pas.
5. **Un propriétaire du domaine avec du temps pour décider.** Si le projet est à vous, c'est vous.
   S'il est à un client, c'est le client, et il doit savoir qu'il va devoir répondre à des questions
   pendant tout le projet. Ce point n'est pas négociable : sans propriétaire qui décide, c'est le
   modèle qui décide, et là la méthode se casse.

### Comment se suit le cours

Chaque leçon a la même structure :

- **Ce que vous devez comprendre** : le concept, expliqué comme on l'explique à une personne.
- **La tâche** : pas à pas, avec le prompt exact que vous allez donner à l'agent (en anglais, parce
  que les modèles suivent les instructions avec plus de précision en anglais ; chacun est accompagné
  de sa traduction, et en dessous est expliqué ce que vous lui demandez) et quoi faire de ce qu'il
  vous renvoie. Avant chaque prompt il y a un bloc qui dit **« Avant d'envoyer le prompt »** : les
  fichiers et les intrants que vous devez avoir faits vous-même, de vos mains, avant de le coller.
  Ne le sautez pas : le prompt nomme ces fichiers, et s'ils n'existent pas ou s'ils sont vides,
  l'agent va les inventer ou va vous les demander.
- **La vérification de complétude** : la liste des questions que vous vous posez sur ce que l'agent
  a livré, sans ouvrir le code. Si l'une d'elles donne « non », la leçon n'est pas terminée.
- **Le livrable** : le fichier ou la preuve qui doit exister à la fin.
- **Erreurs typiques** : ce qui arrive à presque tout le monde la première fois.
- **Dans le projet-guide** : à quoi ressemble cette leçon appliquée au projet d'exemple.

Une règle pour tout le cours : **n'avancez pas à l'échelon suivant avec une vérification à
« non »**. La tentation du « je l'arrangerai plus tard » est exactement ce que la méthode existe
pour éviter. Si un échelon n'est pas gravi complètement, le suivant se construit sur du sable.

### L'ordre du cours : quand se fait chaque chose

Le document principal a, dans sa Partie B, la ligne de temps complète de la méthode. Ici je la
traduis en ordre du cours pour le projet-guide. Ce sont des étapes, pas des semaines : chacune dure
ce que votre projet demande, et ce qui ne se négocie pas, c'est l'ordre et, surtout, ce qui se
passe entre une leçon et la suivante.

| Étape | Leçons | Ce que vous faites en plus des leçons |
|---|---|---|
| 0 | aucune | **Ingestion** : vous interviewez le propriétaire et vous écrivez en prose ce qu'il veut, pour qui, ce qui se passe aujourd'hui, ce qui a des conséquences, quels chiffres lui seul connaît. Vous nommez les cas d'utilisation que vous pouvez (« la réceptionniste enregistre un rendez-vous »), vous dessinez les écrans principaux même à la main, et vous listez les entités du métier avec leurs états. Incomplet à dessein. |
| 1 | 0, 1, 2, 3, 4 | **Démarrage, d'une traite.** Éligibilité, contrat, définition avec arbre sémantique, dimensionnement, et le squelette avec **toute l'infrastructure et la chaîne d'intégration et de déploiement** : dépôt, environnement de test, intégration continue, premier déploiement à vide. À la clôture, vous ouvrez l'URL et vous voyez l'écran vide. |
| 2 | 5, 6, 8, 10 | **Premier bloc fonctionnel** (l'agenda de base). Vous ouvrez le bloc en convertissant la demande en éléments en attente spécifiés. Avec chaque élément : décisions, test en rouge, test de bout en bout du flux, capture de l'écran que vous regardez vous-même. À la clôture du bloc : batterie complète de bout en bout, et vous utilisez le système dans l'environnement de test en suivant les flux du bloc. |
| 3 | 7, 9, 11, 12 | **Deuxième bloc** (patients et recherche). Les quatre leçons restantes de la boucle s'apprennent sur ce bloc. Même clôture : bout en bout de tous les flux, tests humains, manuel utilisateur avec les nouveaux écrans. |
| 4 | 13, 14 | **Mise en production, première moitié.** Audit par une autre session. Verrous. Et seulement ensuite, le **troisième bloc** (rappels et acompte), construit avec la boucle complète et laissé en mode à blanc. |
| 5 | 15, 16, 17, 18, 19, 20 | **Mise en production, deuxième moitié.** Clôture de la chaîne vers la production avec retour arrière prouvé. Observabilité avec niveau configurable, persistance mesurée avant et après, scan de vulnérabilités comme porte, test de charge avec le point de rupture. Les trois manuels ; quelqu'un qui ne programme pas suit celui de reprise. **Tests d'acceptation** par vous ou par le propriétaire sur tous les flux. Premier déploiement en production sans utilisateurs. |
| 6 | 21, 22, 23 | **Exploitation.** Vous activez les rappels après avoir regardé le journal du mode à blanc. Les deux supervisions montées avec le déploiement : ressources et performance, erreurs ; le premier rapport cyclique lu avec le propriétaire. Agent résident. Rétrospective chiffrée et proposition de changement à l'échelle. |

Si votre projet est plus grand, ce qui grandit, ce sont les étapes 2 et 3 (plus de blocs), pas la
1 ni les 4 et 5. Et si à un moment vous vous retrouvez à faire de l'infrastructure à l'étape 3, ou
à lancer la batterie de bout en bout pour la première fois à l'étape 5, revenez à l'ordre :
quelque chose a été sauté.

### Le projet-guide : « Turnera »

Si vous n'avez pas de projet à vous, utilisez celui-ci. Il est petit, mais il a tout ce qu'il faut
pour qu'aucun des vingt-quatre échelons ne soit du faux-semblant : des utilisateurs réels, des
données personnelles, des messages qui sortent vers le monde, et de l'argent.

**Le métier.** Un cabinet (ça peut être un studio, un salon de coiffure, un atelier : n'importe quel
endroit qui donne des rendez-vous). Aujourd'hui les rendez-vous se notent dans un cahier et se
confirment à la main par WhatsApp. On perd des rendez-vous parce que les gens oublient, il y a des
doubles réservations parce que deux personnes ont noté dans des cahiers différents, et personne ne
sait combien de rendez-vous ont été annulés le mois dernier.

**Ce qu'ils veulent.** Un agenda web où les deux réceptionnistes et les trois praticiens voient les
rendez-vous ; des rappels automatiques 24 heures avant, par WhatsApp ou courriel ; la possibilité de
demander un acompte par lien de paiement pour certains rendez-vous ; et deux ou trois chiffres en
fin de mois (combien de rendez-vous, combien d'absences, combien d'acomptes).

**Le propriétaire.** La responsable du cabinet. Elle a du jugement sur le métier (elle sait quels
rendez-vous exigent un acompte, combien de temps à l'avance on peut annuler, ce qu'on dit à un
patient qui a manqué trois fois) et elle a quinze minutes par jour pour répondre à des questions.
Elle ne programme pas, et elle ne lira pas de code.

**Les chiffres qu'elle seule connaît.** Une quarantaine de rendez-vous par jour, deux cent
cinquante jours par an. Environ trois messages par rendez-vous (confirmation, rappel, parfois
reprogrammation). Les données des patients se conservent cinq ans. Le pic est le lundi matin, avec
les deux réceptionnistes qui enregistrent en même temps. Et une question à laquelle elle ne sait pas
répondre et qui compte : si ça marche, vont-ils le vendre à d'autres cabinets ? (La réponse change
le dimensionnement par dix.)

**Ce qui a des conséquences.** Envoyer un rappel (s'il part deux fois, ça agace ; s'il part au
mauvais numéro, c'est un problème de confidentialité). Encaisser un acompte (de l'argent). Annuler
un rendez-vous (irréversible pour le patient qui le perd). Effacer un patient (données
personnelles).

**Les cas d'utilisation que nomme la responsable**, tels qu'elle les dit : « j'enregistre un
rendez-vous », « je cherche un patient », « j'annule un rendez-vous », « le patient reçoit le
rappel », « je lui demande l'acompte », « je vois combien de rendez-vous il y a eu ce mois-ci ». Il
y en a six ; ce seront les flux de bout en bout.

Avec cela, on a de quoi démarrer. Tout le reste, l'agent le demandera, et cela fait partie de
l'exercice qu'il le demande.

---

## Tronçon de démarrage : leçons 0 à 4

Ces cinq leçons se font une fois par projet, à l'étape 1, avant d'écrire de la fonctionnalité. Ce
sont celles qui donnent le plus envie d'être sautées (« je veux voir quelque chose qui marche »), et
ce sont celles qui coûtent le plus cher à sauter. Faites-les d'une traite, et seulement ensuite
ouvrez la boucle.

### Leçon 0 — Ce projet peut-il être abordé ainsi ?

**Ce que vous devez comprendre.** La méthode ne convient pas à n'importe quel projet, et le savoir
avant de commencer est la première décision de qualité. Il y a deux conditions sans lesquelles elle
ne fonctionne pas : qu'il y ait un dépôt standard où laisser la preuve (X1), et que les écrans
puissent être pilotés par programme pour tester de bout en bout, de l'écran jusqu'au backend (X2).
Si l'une des deux manque, l'agent ne pourra pas se vérifier seul, et alors c'est vous qui finirez
par lire du code, ce qui est justement ce que la méthode promet d'éviter. Les deux, je les ai tirées
de projets que j'ai refusés [Ref. 46](REFERENCIAS.md#ref-46). Ensuite il y a des critères qui
pondèrent (s'il y a un propriétaire avec du temps, si l'erreur a des conséquences, si on peut tester
dans un environnement à part, etc.), que je suis encore en train de calibrer.

Pour le projet-guide, les deux conditions sont remplies : c'est un projet neuf (pas de legacy) et
nous allons le construire avec une interface web pilotable par programme. Pour un projet à vous,
cette leçon peut se terminer par « ça ne passe pas », et c'est un résultat valide du cours.

**La tâche.**

**Avant d'envoyer le prompt**, de vos mains (l'agent ne peut pas le faire à votre place) :

- `docs/INITIAL_SURVEY.md` : vous l'écrivez à la main, à partir de l'ingestion de l'étape 0 :
  ce que veut le client, pour qui, ce qui se passe aujourd'hui sans le système, quelle technologie
  existe ou est proposée, s'il y a un système antérieur et s'il a un dépôt, si les écrans pourront
  être pilotés par programme, qui est le propriétaire et combien de temps il a, quelle conséquence
  a une erreur, quels environnements il y aura. Une demi-page. Peu importe qu'il soit incomplet ;
  en fait, cela fait partie de l'exercice qu'il soit incomplet, et ce que vous ne savez pas, vous
  l'écrivez « je ne sais pas ».
- `docs/ELIGIBILITY_CRITERIA.md` : copiez la fiche de critères du document principal (les
  excluants X1 et X2 et les candidats), avec les colonnes de réponse, de source et de vert ou
  rouge vides. Ne la remplissez pas vous-même : c'est l'agent qui la remplit.
- Le dossier du projet, encore vide à part ces deux fichiers, avec l'agent ouvert dedans.
- Le contenu complet de chaque fichier est dans le contrat de l'échelon 0, dans le même bloc.

1. Collez-lui ce prompt :

> We are going to assess whether this project can be run with the Urazuke method. Read the
> initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`. First, evaluate whether the survey is sufficient to answer
> every criterion. If any criterion cannot be answered from the survey, ask me for the missing
> information before going on; do not assume. Then fill in the sheet criterion by criterion:
> the answer, where it comes from, and for each exclusionary criterion whether it is green or
> red. Do not decide: present me the completed sheet with your reading and your doubts, and I
> will decide. Reply in my language.

> [fr]
> Nous allons évaluer si ce projet peut être mené avec la méthode Urazuke. Lis le relevé initial
> dans `docs/INITIAL_SURVEY.md` et la fiche de critères dans `docs/ELIGIBILITY_CRITERIA.md`.
> D'abord, évalue si le relevé suffit pour répondre à chaque critère. Si un critère ne peut pas
> être répondu à partir du relevé, demande-moi l'information manquante avant de continuer ; ne
> suppose pas. Ensuite remplis la fiche critère par critère : la réponse, d'où elle vient, et pour
> chaque critère excluant s'il est au vert ou au rouge. Ne décide pas : présente-moi la fiche
> complète avec ta lecture et tes doutes, et c'est moi qui décide. Réponds dans ma langue.

   Vous lui demandez de lire les deux fichiers, d'**évaluer si le relevé suffit et de demander ce
   qui manque avant de répondre** (cette clause se répète dans tous les prompts du cours ; c'est le
   cœur de la méthode), de remplir la fiche en disant d'où vient chaque réponse, et de ne pas
   décider : la décision est à vous.

2. Répondez à ses questions. S'il ne vous en a posé aucune, méfiez-vous et demandez-lui ce qu'il a
   supposé.
3. Quand il vous présente la fiche, lisez-la et décidez.

**Avant d'envoyer le prompt** de clôture : votre décision en une ligne (ça passe, ça ne passe pas,
ou ça passe sous conditions, chaque condition vérifiable et pas plus de trois), et les réponses
que vous avez données à ses questions dans cette même session, parce que le prompt lui demande de
les inclure.

4. Collez-lui le prompt de clôture :

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.

> [fr]
> Décision : [ça passe / ça ne passe pas / ça passe à ces conditions : …]. Écris la fiche finale
> dans `docs/ELIGIBILITY.md` avec la date, qui a décidé, la réponse à chaque critère avec sa
> source, et les conditions s'il y en a. Inclus les questions que tu as posées et mes réponses.

**Vérification de complétude.** Ouvrez `docs/ELIGIBILITY.md` et demandez-vous : les deux excluants
ont-ils une réponse explicite et une source ? Y a-t-il un critère répondu par « probablement » ?
(S'il y en a un, l'agent devait demander.) La décision a-t-elle une date et un nom ? Les
conditions, s'il y en a, peuvent-elles se vérifier ? Les questions qu'il a posées et vos réponses
y sont-elles ?

**Livrable.** `docs/ELIGIBILITY.md`, d'une page.

**Erreurs typiques.** Écrire le relevé « complet » pour que l'agent ne demande rien : vous perdez
l'exercice et, pire, vous vous habituez à faire le travail du modèle. Répondre « ça passe » avec
cinq conditions : c'est un « ça ne passe pas » déguisé. Et la plus courante : sauter la leçon parce
que « c'est évident que ça passe ». L'évident est ce qu'on n'écrit pas, et ce qu'on n'écrit pas est
ce qu'on discute ensuite.

**Dans le projet-guide.** L'agent devrait demander, au minimum, si l'interface sera web ou mobile
(parce que X2 en dépend), s'il y a un système antérieur même si c'est un Excel, et quel canal de
messages sera utilisé (WhatsApp a des exigences que le courriel n'a pas). La fiche se termine par
« ça passe », avec une condition raisonnable : avoir le canal de messages défini avant l'échelon 14.

### Leçon 1 — Le contrat de collaboration

**Ce que vous devez comprendre.** L'agent arrive à chaque session sans mémoire de la précédente.
C'est comme un collaborateur nouveau chaque matin. Le contrat de collaboration est ce que vous lui
dites le premier jour et ce qu'il relira tous les jours : comment vous travaillez, ce que vous ne
tolérez pas, quel niveau d'autonomie vous lui donnez. Sans contrat, vous lui répéterez les mêmes
choses à chaque session, et chaque fois un peu différemment. Moi, je l'ai écrit pour la première
fois après deux semaines à me répéter [Ref. 1](REFERENCIAS.md#ref-1).

Les six règles minimales ont chacune un échec derrière elles : « mon temps est sacré » évite qu'il
vous consulte pour chaque détail ; « zéro dette » évite le « je l'arrangerai plus tard » ;
« périmètre exact » évite que « tant qu'il y est » il vous ajoute des choses ; « documentation
dans le même commit » évite les manuels périmés ; « ne jamais rapporter comme fait ce qui n'est pas
vérifié » évite le « c'est fait » qui ne l'était pas ; « parle ma langue » évite qu'il vous réponde
en anglais parce que le prompt était en anglais.

**La tâche.**

**Avant d'envoyer le prompt**, de vos mains :

- Vos préférences de travail, pensées cinq minutes et notées dans une courte liste (sur un papier,
  ou dans `docs/MY_PREFERENCES.md`) : préférez-vous qu'il vous pose beaucoup ou peu de questions ?
  Dans quelle langue ? Quel niveau d'autonomie lui donnez-vous (des commits tout seul, un
  déploiement vers le test tout seul, jamais la production) ? Qu'est-ce qui vous exaspère quand
  vous travaillez avec d'autres personnes ? Vous le lui raconterez quand il demandera ; la liste
  est là pour ne pas improviser.
- Le dossier du projet avec l'agent ouvert dedans. Rien de plus : c'est le premier fichier du
  projet.

1. Collez-lui ce prompt :

> Before we write any code, we are going to set the working agreement between you and me.
> Write `docs/WORKING_AGREEMENT.md` with at least these rules, each with one line explaining
> what it prevents: (1) My time is sacred: do not ask me what you can resolve on your own, and
> when you do ask, ask in prose, with your recommendation. (2) Zero technical debt: whatever
> breaks is fixed at the root, with its regression test, in the same session. (3) Exact scope:
> no more and no less than what was asked; if you see something else, log it as a pending item,
> do not do it. (4) Documentation is updated in the same commit as the change. (5) Never report
> as done something you have not verified; always separate what you verified from what you
> believe. (6) Speak my language. Add any rules you think this project needs, marked as
> proposals. If you need to know something about how I work in order to write this, ask me.

> [fr]
> Avant d'écrire du code, nous allons fixer le contrat de collaboration entre toi et moi. Écris
> `docs/WORKING_AGREEMENT.md` avec au moins ces règles, chacune avec une ligne qui explique ce
> qu'elle évite : (1) Mon temps est sacré : ne me demande pas ce que tu peux résoudre seul, et
> quand tu demandes, demande en prose, avec ta recommandation. (2) Zéro dette technique : ce qui
> casse se répare à la racine, avec son test de régression, dans la même session. (3) Périmètre
> exact : ni plus ni moins que ce qui a été demandé ; si tu vois autre chose, note-le comme élément
> en attente, ne le fais pas. (4) La documentation se met à jour dans le même commit que le
> changement. (5) Ne rapporte jamais comme fait quelque chose que tu n'as pas vérifié ; sépare
> toujours ce que tu as vérifié de ce que tu crois. (6) Parle ma langue. Ajoute les règles dont tu
> penses que ce projet a besoin, marquées comme propositions. Si tu as besoin de savoir quelque
> chose sur ma façon de travailler pour écrire ceci, demande-moi.

   Vous lui demandez les six règles avec l'échec que chacune évite, des règles propres au projet
   marquées comme propositions pour que vous les acceptiez ou les refusiez, et qu'il vous pose des
   questions sur vous.

2. Répondez à ses questions. Lisez les propositions : acceptez celles qui vous servent, refusez
   celles qui ne servent pas, toujours avec une raison d'une ligne.

**Avant d'envoyer le prompt** de clôture : votre verdict sur chaque proposition de l'agent,
écrit : lesquelles vous acceptez [X, Y], lesquelles vous refusez [Z] et pourquoi, en une ligne
chacune. Cela va dans les trous du prompt, et c'est vous qui les remplissez.

3. Clôturez avec :

> I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the
> agreement with today's date and a version number. Then add to the project file the
> instruction to read this agreement at the start of every session.

> [fr]
> J'accepte les règles 1 à 6 et tes propositions [X, Y] ; je refuse [Z] parce que [raison].
> Finalise le contrat avec la date d'aujourd'hui et un numéro de version. Ensuite ajoute au
> fichier de projet l'instruction de lire ce contrat au début de chaque session.

   S'il n'y a pas encore de fichier de projet (vous le faites à la leçon 2), il en créera un
   minimal avec cette instruction ; c'est très bien.

**Vérification de complétude.** Les six règles sont-elles là, chacune avec l'échec qu'elle évite ?
Y en a-t-il une écrite comme une aspiration (« essayer de… ») ? Le fichier de projet ordonne-t-il
de le lire au début de chaque session ? Vous a-t-il posé au moins une question sur votre façon de
travailler ?

**Livrable.** `docs/WORKING_AGREEMENT.md` avec date et version, rattaché au fichier de projet.

**Erreurs typiques.** Accepter vingt règles parce qu'elles sonnent toutes bien : personne n'en
respecte vingt ; six ou huit se respectent. Laisser une règle qui dit que l'agent peut changer le
contrat : non. Et la plus silencieuse : ne jamais tester s'il le lit. À la leçon 2 vous verrez
comment.

**Dans le projet-guide.** Une règle propre que l'agent propose souvent pour Turnera, et qui vaut la
peine d'être acceptée : « je n'envoie jamais de vrai message à un patient depuis un environnement
autre que la production ; en test, les messages vont dans une boîte factice ». C'est l'échelon 14
qui pointe le nez tôt.

### Leçon 2 — La définition du projet, l'arbre sémantique et la lecture obligatoire

**Ce que vous devez comprendre.** Le fichier de projet (`PROJECT.md`, ou `CLAUDE.md`, ou le nom
qu'utilise votre outil) est la carte que l'agent lit au début de chaque session. Il doit être
**court** : ce qu'est le système, pour qui, ce qu'il N'est PAS, les modules, les décisions prises
avec leur date, et l'ordre de lire le contrat. Ce qui s'est passé chaque jour ne va pas là : ça va
dans l'état vivant (`docs/STATUS.md`) et dans le registre des éléments en attente. Un de mes
systèmes a laissé ce fichier grossir jusqu'à plus de neuf mille lignes ; dans cet état, personne ne
le lit, et le modèle non plus [Ref. 41](REFERENCIAS.md#ref-41).

Mais la carte a une seconde pièce, et c'est celle qui travaille le plus : l'**arbre sémantique**.
C'est le système décomposé en arbre : les domaines au premier niveau, et sous chacun ses acteurs,
ses processus (les cas d'utilisation que vous avez nommés lors de l'ingestion, avec acteur,
déclencheur, étapes, résultat et exceptions), ses entités avec leurs attributs et leurs états, ses
écrans et ses intégrations externes. C'est le modèle de domaine de l'ingénierie des exigences de
toujours, mis sous forme d'arbre pour que le modèle le lise. De chaque nœud pendront les éléments en
attente et les décisions qui le touchent. Sa valeur est double : il donne à l'agent le contexte
exact du nœud qu'il va toucher, et il vous donne à vous une façon de vérifier, sans lire de code,
que le système que l'agent comprend est celui que le métier a demandé. Si l'arbre a un état que le
métier n'a jamais nommé, le modèle l'a inventé, et vous le verrez avant qu'il construise dessus.

La section « ce que ce N'est PAS » reste la plus importante et celle que tout le monde laisse vide.
Ce qui n'est pas écrit est ce que le modèle inventera quand il tombera sur un trou.

**La tâche.**

**Avant d'envoyer le prompt**, de vos mains :

- `docs/INITIAL_SURVEY.md`, complété avec ce que vous avez appris à la leçon 0 (les réponses aux
  questions de l'agent) et avec le relevé du métier : qui utilise le système, quel problème il
  résout, une section « ce que le système NE doit PAS faire » même avec deux items, les cas
  d'utilisation nommés par le propriétaire avec ses mots, les entités avec leurs états, les
  dessins des écrans même si ce sont des photos d'un papier, les intégrations externes, et les
  décisions déjà prises, avec leur date. Si vous avez utilisé une méthode d'ingestion (entretiens,
  cas d'utilisation, récits utilisateur, maquettes), dites laquelle et collez le résultat.
- `docs/WORKING_AGREEMENT.md`, clos (leçon 1).
- S'il y a un système antérieur, un accès en lecture à son code ou à sa documentation, noté dans
  le relevé.

1. Collez-lui :

> We are going to define the project in writing. Read the business survey in
> `docs/INITIAL_SURVEY.md` and the working agreement in `docs/WORKING_AGREEMENT.md`. Evaluate
> whether the survey is sufficient to describe the system, its users, its domain and its
> boundaries; if it is not, ask me for what is missing before writing anything. Then write two
> things. First, `PROJECT.md`, three hundred lines at most, with: what the system is and for
> whom; what it is NOT; the main modules as a list; the decisions already made, each with its
> date; and the instruction to read this file and the semantic tree at the start of every
> session. Second, `docs/SEMANTIC_TREE.md`: the system as a tree, with the domains at the top
> level and, under each one, its actors, its processes (the use cases, each with actor, trigger,
> steps, outcome and exceptions), its entities with their attributes, states and transitions,
> its screens, and its external integrations. Mark every node you inferred rather than read in
> the survey, so that I can confirm or correct it. Separately, create `docs/STATUS.md` for the
> living state (what is being worked on, what is open): that file changes every day; the other
> two change only when the system changes. Reply in my language.

> [fr]
> Nous allons définir le projet par écrit. Lis le relevé du métier dans
> `docs/INITIAL_SURVEY.md` et le contrat de collaboration dans `docs/WORKING_AGREEMENT.md`.
> Évalue si le relevé suffit pour décrire le système, ses utilisateurs, son domaine et ses
> limites ; s'il ne suffit pas, demande-moi ce qui manque avant d'écrire quoi que ce soit.
> Ensuite écris deux choses. D'abord, `PROJECT.md`, de trois cents lignes au maximum, avec : ce
> qu'est le système et pour qui ; ce qu'il N'est PAS ; les modules principaux sous forme de
> liste ; les décisions déjà prises, chacune avec sa date ; et l'instruction de lire ce fichier et
> l'arbre sémantique au début de chaque session. Ensuite, `docs/SEMANTIC_TREE.md` : le système
> sous forme d'arbre, avec les domaines au premier niveau et, sous chacun, ses acteurs, ses
> processus (les cas d'utilisation, chacun avec acteur, déclencheur, étapes, résultat et
> exceptions), ses entités avec leurs attributs, états et transitions, ses écrans et ses
> intégrations externes. Marque chaque nœud que tu as inféré au lieu de l'avoir lu dans le
> relevé, pour que je le confirme ou le corrige. À part, crée `docs/STATUS.md` pour l'état vivant
> (ce sur quoi on travaille, ce qui est ouvert) : ce fichier change tous les jours ; les deux
> autres ne changent que quand le système change. Réponds dans ma langue.

   Vous lui demandez de poser ses questions avant de rédiger, un fichier de projet court avec la
   section « ce que ce n'est pas », l'arbre sémantique avec sa structure complète et les nœuds
   inférés marqués, et l'état vivant dans un autre fichier.

2. Lisez `PROJECT.md` en entier. Il doit tenir en cinq minutes. Corrigez ce qui n'est pas vrai ou
   pas à vous.
3. Parcourez l'arbre sémantique comme si vous étiez le client. Regardez chaque nœud marqué comme
   inféré et confirmez-le ou corrigez-le. Cherchez les acteurs qui manquent, les états d'entité que
   le métier n'utilise pas, les écrans que vous n'avez pas demandés.

**Avant d'envoyer le prompt** de clôture : `PROJECT.md` lu en entier par vous, l'arbre parcouru
nœud par nœud avec un verdict pour chaque nœud inféré, et la liste des corrections écrite pour le
trou [list] du prompt. Si la liste est vide la première fois, méfiez-vous de votre lecture.

4. Clôturez avec :

> Apply these corrections: [list]. Finalize `PROJECT.md` and `docs/SEMANTIC_TREE.md` with
> today's date. Add to the working agreement two rules: the change history never goes into
> `PROJECT.md` (it goes to `docs/STATUS.md` or to the pending-items register); and every pending
> item must hang from a node of the semantic tree, and the tree is updated in the same commit
> whenever a block adds or changes a node.

> [fr]
> Applique ces corrections : [liste]. Finalise `PROJECT.md` et `docs/SEMANTIC_TREE.md` avec la
> date d'aujourd'hui. Ajoute au contrat de collaboration deux règles : l'historique des
> changements ne va jamais dans `PROJECT.md` (il va dans `docs/STATUS.md` ou dans le registre des
> éléments en attente) ; et tout élément en attente doit pendre d'un nœud de l'arbre sémantique,
> et l'arbre se met à jour dans le même commit chaque fois qu'un bloc ajoute ou change un nœud.

5. **Le test de lecture.** Fermez la session de l'agent et ouvrez-en une nouvelle. Sans rien lui
   dire de plus, demandez-lui : « Que ne doit pas faire ce système ? Et de quel nœud de l'arbre
   pend l'écran de l'agenda ? ». S'il vous répond avec ce que disent `PROJECT.md` et l'arbre, le
   rattachement fonctionne. S'il vous répond n'importe quoi d'autre, il ne lit pas la carte :
   vérifiez comment votre outil charge le fichier de projet.

**Vérification de complétude.** `PROJECT.md` se lit-il en cinq minutes ? Dit-il ce que le système
NE fait PAS ? L'arbre a-t-il tous les acteurs que vous connaissez, et chaque entité a-t-elle les
états que le métier utilise, ni plus ni moins ? Avez-vous confirmé ou corrigé tous les nœuds
inférés ? Chaque décision a-t-elle une date et qui l'a prise ? L'agent a-t-il demandé quelque chose
avant de rédiger ? L'état vivant est-il dans un autre fichier ? Le test de lecture est-il passé ?

**Livrable.** `PROJECT.md` (trois cents lignes maximum), `docs/SEMANTIC_TREE.md` avec les nœuds
confirmés, `docs/STATUS.md`, et le test de lecture réussi.

**Erreurs typiques.** Coller dans `PROJECT.md` toute la spécification que vous aviez déjà : c'est
le programme, pas la spécification. Laisser « ce que ce n'est pas » vide. Accepter l'arbre sans le
parcourir : le modèle infère des états et des écrans avec un naturel qui fait peur, et chaque nœud
inventé est de la fonctionnalité qu'il construira sans que personne ne la lui ait demandée. Et ne
pas faire le test de lecture : c'est la seule façon de savoir que les échelons 1 et 2 agissent et
pas seulement existent.

**Dans le projet-guide.** Dans « ce que ce N'est PAS » de Turnera devraient figurer, au minimum :
ce n'est pas un système de dossier médical (il ne garde pas de données médicales), ce n'est pas une
passerelle de paiement (il utilise un lien de paiement d'un prestataire, il ne traite pas de
cartes), et il n'envoie pas de messages marketing (seulement des confirmations et des rappels).
L'arbre a un domaine « Agenda » avec les acteurs réceptionniste et praticien, les processus
« enregistrer un rendez-vous », « annuler un rendez-vous » et « chercher un patient », les entités
Rendez-vous (avec les états en attente, confirmé, annulé, absent) et Patient, et les écrans
« agenda du jour » et « fiche du patient » ; un domaine « Messages » avec le processus « envoyer un
rappel », l'entité Message et l'intégration avec le prestataire WhatsApp ; et un domaine
« Paiements » avec « demander l'acompte » et l'intégration avec le prestataire de paiement. Si
l'agent vous ajoute un état « reprogrammé » au rendez-vous, demandez-lui d'où il le sort : la
responsable ne l'a pas nommé. Peut-être qu'il faut, peut-être que non ; c'est vous qui décidez, pas
lui.

### Leçon 3 — Dimensionner avant de concevoir l'architecture

**Ce que vous devez comprendre.** Il y a des décisions qui, mal prises, coûtent des semaines :
quelle base de données, si les appels à la base sont synchrones ou asynchrones, combien de
personnes peuvent utiliser le système en même temps. Et toutes dépendent de chiffres que **seul le
métier possède** : combien de rendez-vous par jour, combien de messages par rendez-vous, combien
d'années on conserve. Le modèle ne peut pas inférer ces chiffres ; il peut inférer ce qui en
dérive (lignes par an, taille à cinq ans). C'est pourquoi le prompt lui exige de distinguer les
données primaires des dérivées, et de **demander les primaires manquantes au lieu de les
estimer**. Quand le modèle estime une donnée primaire, il le fait avec le même air assuré que quand
il calcule ; et vous n'avez aucun moyen de les distinguer au ton. Ne pas l'avoir fait à temps m'a
coûté une étape entière de réingénierie [Ref. 15](REFERENCIAS.md#ref-15).

Il y a en plus un type de décision qu'il convient de toujours prendre : les **asymétriques**, bon
marché si elles sont superflues et hors de prix si elles manquent. L'exemple canonique est de rendre
l'interface avec la base de données asynchrone dès le premier jour même si la première base est un
fichier : si vous ne changez jamais de base, il y a eu un `await` de trop ; si vous changez, vous
vous êtes épargné de tout réécrire.

**La tâche.**

**Avant d'envoyer le prompt**, de vos mains et avec le propriétaire :

- `docs/VOLUME_SURVEY.md` : asseyez-vous avec le propriétaire (ou avec vous-même, si le projet est
  à vous) et écrivez les entités principales (celles de l'arbre sémantique) et combien il y en a,
  combien s'ajoutent par mois, combien d'événements par entité, combien de personnes opèrent au
  pic et quand est le pic, combien de temps on conserve les données, s'il y a des charges
  exceptionnelles, quelle croissance ils attendent. Pour chaque chiffre, notez d'où il vient :
  « la responsable l'a dit », « compté dans le cahier de septembre », « supposé ». Laissez-en
  quelques-uns en « supposé » à dessein : vous verrez ce que l'agent en fait.
- `PROJECT.md` et `docs/SEMANTIC_TREE.md`, clos (leçon 2).
- S'il y a un système antérieur avec une base de données, un accès en lecture seule pour que
  l'agent sorte des chiffres réels, avec la chaîne de connexion hors du dépôt.

1. Collez-lui :

> Before proposing any architecture we are going to size the system. Read `PROJECT.md` and the
> volume survey in `docs/VOLUME_SURVEY.md`. Distinguish primary data (facts only the business
> knows) from derived data (what can be computed from the primary data). Evaluate whether the
> primary data is complete enough to compute what follows; if any primary figure is missing, or
> is marked as an assumption, ask me for all the missing figures before going on. Never estimate
> a primary figure. If a previous system can be queried, use its real numbers and state where
> each came from. With the primary data complete, compute, showing the arithmetic: rows per year
> for the three largest tables, peak concurrency, data size at five years, and what breaks first
> if everything is multiplied by ten. Then present three options for persistence and concurrency,
> each with the cost of migrating to the others later. Do not choose: I choose. Do not write code.
> Reply in my language.

> [fr]
> Avant de proposer la moindre architecture, nous allons dimensionner le système. Lis
> `PROJECT.md` et le relevé de volumétrie dans `docs/VOLUME_SURVEY.md`. Distingue les données
> primaires (des faits que seul le métier connaît) des données dérivées (ce qui peut se calculer à
> partir des primaires). Évalue si les données primaires sont assez complètes pour calculer ce qui
> suit ; s'il manque une donnée primaire, ou si elle est marquée comme supposée, demande-moi toutes
> celles qui manquent avant de continuer. N'estime jamais une donnée primaire. Si un système
> antérieur peut être consulté, utilise ses chiffres réels et dis d'où vient chacun. Avec les
> primaires complètes, calcule, en montrant le calcul : lignes par an des trois plus grandes
> tables, concurrence au pic, taille des données à cinq ans, et ce qui casse en premier si tout est
> multiplié par dix. Ensuite présente trois options de persistance et de concurrence, chacune avec
> le coût de migrer vers les autres plus tard. Ne choisis pas : c'est moi qui choisis. N'écris pas
> de code. Réponds dans ma langue.

   Vous lui demandez : de distinguer primaires et dérivées ; de **vous demander les primaires
   manquantes ou en « supposé », et de ne jamais les estimer** ; de calculer les dérivées avec le
   calcul en vue ; le scénario « par dix » ; trois options avec le coût de passer de l'une à
   l'autre ; et de ne pas choisir.

2. S'il vous demande les « supposés », bien : c'était l'exercice. Procurez-vous les chiffres
   (demandez au propriétaire, comptez dans le cahier) et donnez-les-lui. S'il ne vous les a pas
   demandés et a calculé quand même, arrêtez et demandez-lui ce qu'il a fait des supposés : c'est
   une défaillance de l'échelon et il vaut mieux la voir maintenant.
3. Lisez les trois options. Refaites un calcul à la main (par exemple, les lignes par an de la
   plus grande table) : il doit vous donner la même chose. Choisissez.

**Avant d'envoyer le prompt** de clôture : les supposés convertis en données avec leur source, un
calcul refait à la main par vous qui coïncide avec celui de l'agent, et l'option choisie avec une
raison d'une ligne.

4. Clôturez avec :

> I choose option [B]. Record in `docs/SIZING.md`: the primary data with its source, the derived
> data with its arithmetic, the three options, the chosen one and why, and the decisions we are
> taking "just in case" even though they are not needed today (for example: the persistence
> interface is asynchronous from line one, even if the first engine is synchronous). Include the
> questions you asked and my answers.

> [fr]
> Je choisis l'option [B]. Enregistre dans `docs/SIZING.md` : les données primaires avec leur
> source, les dérivées avec leur calcul, les trois options, celle choisie et pourquoi, et les
> décisions que nous prenons « au cas où » même si elles ne sont pas nécessaires aujourd'hui (par
> exemple : l'interface de persistance est asynchrone dès la première ligne, même si le premier
> moteur est synchrone). Inclus les questions que tu as posées et mes réponses.

**Vérification de complétude.** Y a-t-il une donnée primaire avec la source « supposé » ou sans
source ? Chaque donnée dérivée montre-t-elle le calcul, et retombez-vous dessus si vous le refaites ?
Y a-t-il trois options et une choisie avec sa raison ? Dit-il ce qui se passe « par dix » ? Les
décisions asymétriques sont-elles écrites ? Vous a-t-il posé des questions ?

**Livrable.** `docs/SIZING.md`.

**Erreurs typiques.** Compléter le relevé avec des chiffres inventés par vous pour que l'agent ne
demande rien (c'est la même erreur qu'à la leçon 0, et elle est pire ici parce que ces chiffres
décident de l'architecture). Choisir l'option « la plus puissante » au cas où : le coût de
migration est dans le tableau justement pour que vous choisissiez la plus petite qui tienne le
« par dix ». Et ne pas écrire les décisions asymétriques : si elles ne sont pas écrites, à la
leçon 4 l'agent ne les respectera pas.

**Dans le projet-guide.** Primaires : 40 rendez-vous/jour × 250 jours = 10 000 rendez-vous/an ;
3 messages par rendez-vous = 30 000 messages/an ; 5 ans de conservation ; pic de deux
réceptionnistes simultanées. Le « par dix », c'est la question de savoir si on le vend à d'autres
cabinets : 100 000 rendez-vous et 300 000 messages par an. Les trois options typiques : un fichier
SQLite (suffit pour un cabinet pendant des années, ne tient pas le par dix avec plusieurs
écrivains), PostgreSQL dès le début (tient tout, coûte un peu plus d'infrastructure), ou SQLite
maintenant avec l'interface asynchrone et une migration prévue vers PostgreSQL (l'asymétrique).
Pour le cours nous choisissons la troisième : c'est celle qui enseigne le plus.

### Leçon 4 — Le squelette avec ses portes

**Ce que vous devez comprendre.** Avant que le système fasse quelque chose d'utile, il doit
démarrer, se tester et se déployer **à vide**. Cela ressemble à une perte de temps (« déployer quoi,
s'il n'y a rien ? ») et c'est le contraire : le chemin vers la production fait partie du produit, et
la seule façon de savoir qu'il fonctionne est de le parcourir quand il n'y a encore rien à perdre.
Dans un de mes systèmes, le déploiement est arrivé un mois après le démarrage et a coûté cinq
éléments en attente d'affilée [Ref. 32](REFERENCIAS.md#ref-32) ; avec le squelette déployé au
démarrage, ces cinq coups durs auraient été pris à vide.

Cette leçon est, en plus, **là où se fait toute l'infrastructure et la chaîne d'intégration et de
déploiement** du projet. Vous n'y retoucherez pas avant la leçon 15, et entre-temps vous
construirez toute la fonctionnalité dessus. C'est pourquoi elle occupe la plus grande partie de
l'étape 1.

Les **portes** sont les conditions pour passer d'une étape à une autre (« la batterie est au
vert », « le déploiement en test a fonctionné »). Les écrire maintenant, même si elles semblent
évidentes, est ce qui permettra ensuite de dire « ça ne passe pas » sans discuter.

**La tâche.**

**Avant d'envoyer le prompt**, de vos mains :

- `docs/ENVIRONMENTS_SURVEY.md` : où le système va tourner (un serveur que vous avez déjà, un
  service dans le cloud), s'il y aura un environnement de test et un de production, qui a accès à
  quoi, comment on déploie aujourd'hui s'il y a quelque chose, et le type de projet (nouveau,
  correction ou évolution). Si vous n'avez rien, dites-le : l'agent vous proposera l'option la
  plus simple. Le prompt le nomme « the environments survey », sans chemin : dites-lui comment il
  s'appelle.
- Les identifiants de l'endroit où l'on va déployer, même si c'est un service gratuit : créés,
  essayés par vous en entrant dans le panneau, et gardés hors du dépôt ; à l'agent vous dites où
  ils sont, vous ne les lui collez pas dans le chat. Sans cela, le squelette reste sur votre
  machine et la leçon ne peut pas se terminer.
- `PROJECT.md` et `docs/SIZING.md`, clos (leçons 2 et 3).

1. Collez-lui :

> We are going to build the skeleton of the system, with no functionality at all. Read
> `PROJECT.md`, `docs/SIZING.md` and the environments survey. Evaluate whether you have what is
> needed for the skeleton to run in the test environment (access, URL, deployment method); if
> anything is missing, ask me before starting. Then build: the folder structure; the server and
> the UI starting up; the test structure with one smoke test that passes; continuous
> integration running that test suite on every push; and the deployment to the test
> environment. Declare the gates of the workflow (what must be green to move from one stage to
> the next) in `docs/GATES.md`. When done, take a screenshot of the empty UI running in the
> test environment and show it to me. Do not add any functionality "while you are at it".
> Reply in my language.

> [fr]
> Nous allons construire le squelette du système, sans aucune fonctionnalité. Lis `PROJECT.md`,
> `docs/SIZING.md` et le relevé des environnements. Évalue si tu as ce qu'il faut pour que le
> squelette tourne dans l'environnement de test (accès, URL, méthode de déploiement) ; s'il manque
> quelque chose, demande-le-moi avant de commencer. Ensuite construis : la structure des dossiers ;
> le serveur et l'interface qui démarrent ; la structure de tests avec un test de fumée qui passe ;
> l'intégration continue qui lance cette batterie à chaque push ; et le déploiement vers
> l'environnement de test. Déclare les portes du flux de travail (ce qui doit être au vert pour
> passer d'une étape à la suivante) dans `docs/GATES.md`. Quand tu as fini, prends une capture de
> l'interface vide qui tourne dans l'environnement de test et montre-la-moi. N'ajoute aucune
> fonctionnalité « tant que tu y es ». Réponds dans ma langue.

   Vous lui demandez de vérifier les accès avant de commencer, la liste exacte de ce qu'est un
   squelette, les portes écrites, une capture réelle de l'environnement de test, et l'interdiction
   d'ajouter de la fonctionnalité.

2. Cette tâche est longue et aura des allers-retours :
   des identifiants qui manquent, un service qui demande de confirmer le courriel, etc. C'est
   normal. Ce qui n'est pas normal, c'est qu'il vous dise « c'est fait » sans la capture de
   l'environnement de test.
3. Quand il vous montre la capture, ouvrez vous-même l'URL dans votre navigateur. On doit voir la
   même chose. C'est le premier regard humain sur le système, et c'est un jalon.

**Avant d'envoyer le prompt** de clôture : votre visite de l'URL de l'environnement de test faite,
le lien vers l'exécution d'intégration continue au vert ouvert par vous, et `docs/GATES.md` lu,
avec une condition vérifiable par porte.

4. Clôturez avec :

> Skeleton approved. Record in `docs/STATUS.md` the test environment URL, the command to run
> the tests and the command to deploy, and mark this step as done. Then run the deployment a
> second time and show me that the second run changed nothing.

> [fr]
> Squelette approuvé. Enregistre dans `docs/STATUS.md` l'URL de l'environnement de test, la
> commande pour lancer les tests et la commande pour déployer, et marque cette étape comme faite.
> Ensuite lance le déploiement une seconde fois et montre-moi que la seconde exécution n'a rien
> changé.

**Vérification de complétude.** Avez-vous ouvert vous-même l'URL de l'environnement de test et vu
l'écran vide ? Y a-t-il un lien vers une exécution d'intégration continue au vert ? Le déploiement
a-t-il été lancé deux fois et la seconde n'a-t-elle rien cassé ? Les portes ont-elles chacune une
condition vérifiable ? Y a-t-il une fonctionnalité que vous n'avez pas demandée ?

**Livrable.** Le dépôt avec le squelette, l'intégration continue au vert, l'URL de l'environnement
de test qui fonctionne, `docs/GATES.md`, et `docs/STATUS.md` avec les trois commandes.

**Erreurs typiques.** Accepter « ça marche en local, le déploiement on verra plus tard » : non, le
déploiement, c'est le squelette. Accepter une capture de la machine de l'agent au lieu de
l'environnement de test. Et laisser « tant qu'il y est » vous ajouter un écran de connexion, un
menu, un logo : chaque chose qui entre sans élément en attente est du périmètre qui s'est échappé.

**Dans le projet-guide.** Le squelette de Turnera est une page web qui dit « Turnera — version
0.0.1 » tournant sur une URL publique d'un environnement de test, un serveur qui répond « ok » sur
une route de santé, un test de fumée qui appelle cette route, l'intégration continue qui lance ce
test à chaque push, et le déploiement automatique vers l'environnement de test. Les portes :
« batterie au vert pour fusionner », « environnement de test au vert pour promouvoir en
production », « retour arrière prouvé pour le premier déploiement en production ». Rien de plus. Et
c'est étonnant comme il est satisfaisant de voir cette page vide sur une URL réelle.

---

## Tronçon de la boucle : leçons 5 à 12

Ces huit leçons sont celles que vous utiliserez **à chaque changement**, pendant tout le projet.
Elles s'apprennent aux étapes 2 et 3 sur les deux premiers blocs fonctionnels, et se pratiquent
jusqu'à la fin. Elles vont dans l'ordre où on les fait avec chaque élément en attente : ouvrir un
bloc en convertissant la demande en éléments en attente spécifiés, en prendre un, décider ce qui
manque, mesurer ce qu'il y a à mesurer, construire, prouver en rouge et de bout en bout, passer la
porte de qualité, écrire les cas de test manuel, mettre à jour l'autre côté, et rapporter en
séparant le vérifié du cru. À la clôture du bloc, exécuter vous-même les cas de test manuel. Ce
réflexe, c'est la méthode.

Pour les pratiquer, vous aurez besoin de fonctionnalité réelle. Dans le projet-guide, le premier
bloc est l'agenda de base : voir les rendez-vous du jour, enregistrer un rendez-vous, l'annuler. Le
second, patients et recherche. Pas de messages ni de paiements pour l'instant ; ça vient après les
verrous (leçon 14).
### Leçon 5 — Le plan, ce sont les éléments en attente, et la spécification détaillée vit dans chacun

**Ce que vous devez comprendre.** Il n'y a pas un « plan » d'un côté et une « liste de tâches » de
l'autre : **la liste des éléments en attente est le plan**. Mais il y a deux idées de plus, et ce
sont elles qui distinguent cette méthode d'une liste de tâches quelconque.

La première : la **spécification détaillée vit dans chaque élément en attente**. Dans la méthode
classique, il y avait un document de spécification des exigences, long, qui vieillissait avant
d'être terminé. Ici il se décompose : chaque élément en attente porte le nœud de l'arbre sémantique
dont il pend, le récit utilisateur ou le cas d'utilisation qui l'origine avec les mots du client, la
description détaillée, les règles de métier applicables avec leur décision et leur date, les
données qui entrent et sortent, les écrans touchés, les cas limites, les critères d'acceptation
sous la forme « étant donné, quand, alors », et comment on vérifie. Lire la spécification d'un
élément en attente est ce qui vous rapprochera le plus de lire du code, et c'est exactement la bonne
distance : c'est là que vous détectez que l'agent a compris autre chose, avant qu'il construise.

La seconde : **les éléments en attente clôturés sont de la documentation**. Quand un élément se
clôture, il reste avec sa spécification, la décision qui l'a originé, la preuve avec laquelle il a
été clôturé, le commit et la date. La file des éléments clôturés est l'historique fonctionnel du
système, et c'est de là que sortent le journal des modifications et les nouvelles sections du
manuel. Et la règle d'or pour l'agent : ce qui apparaît hors de la liste se note comme nouvel
élément en attente, avec sa spécification, on ne le fait pas.

**La tâche.**

**Avant d'envoyer le prompt**, de vos mains :

- La demande du client pour le premier bloc de fonctionnalité, écrite dans
  `docs/INITIAL_SURVEY.md` sous un titre portant le nom du bloc, ou dans un fichier à part (par
  exemple `docs/blocks/BLOCK_01_REQUEST.md` ; le prompt dit « the client's request for this
  block » sans chemin, alors dites-lui où elle est), telle que le client la dirait, avec ses
  ambiguïtés. Pour Turnera : « je veux voir les rendez-vous du jour, en enregistrer un nouveau et
  annuler ». Si lors de l'ingestion vous avez écrit les cas d'utilisation, collez-les aussi : ce
  sont l'unité naturelle du bloc. Si le propriétaire vous a donné une priorité, elle aussi.
- `docs/SEMANTIC_TREE.md`, `PROJECT.md` et `docs/STATUS.md`, à jour (leçon 2).

1. Collez-lui :

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
> chacun avec sa spécification complète. Lis `PROJECT.md`, `docs/SEMANTIC_TREE.md`, la demande du
> client pour ce bloc, et ce qu'il y a dans `docs/STATUS.md`. Si la demande est ambiguë sur un
> point au point que tu ne puisses pas écrire un élément en attente vérifiable, demande-moi ; ne le
> résous pas en supposant. Ensuite crée ou étends `docs/PENDING.md` avec un item par chose à faire,
> chacun avec : numéro (PND-001 et suivants) ; titre d'une ligne ; le nœud de l'arbre sémantique
> dont il pend ; le récit utilisateur ou cas d'utilisation qui l'origine, avec les mots du client ;
> la description détaillée ; les règles de métier qui s'appliquent, chacune avec sa décision et sa
> date, ou marquée « règle manquante, demandée » ; les données qui entrent et sortent ; les écrans
> touchés ; les cas limites et les exceptions ; les critères d'acceptation sous la forme « étant
> donné, quand, alors » ; comment on vérifiera qu'il est fait ; et l'état. Si un nœud dont l'item
> a besoin n'existe pas dans l'arbre, propose-le et marque-le. Ordonne-les selon la priorité que je
> t'ai donnée ; si je ne t'en ai donné aucune, propose un ordre et dis-moi pourquoi. Réponds dans
> ma langue.

   Vous lui demandez de convertir la demande en items vérifiables, de **demander quand la demande
   ne permet pas d'en écrire un vérifiable**, la spécification complète de chacun champ par champ,
   le nœud de l'arbre dont il pend, les règles de métier avec leur décision ou marquées comme
   manquantes, les critères d'acceptation qui seront ensuite le scénario du test, et un ordre avec
   sa raison.

2. Répondez aux questions (pour Turnera il demandera, par exemple, ce qu'est « le jour » : celui
   d'aujourd'hui, ou n'importe lequel qu'on choisit ? ; annuler efface-t-il ou marque-t-il ?). Ces
   questions sont des décisions de métier ; à la leçon 6 vous verrez où elles s'écrivent.
3. **Lisez la spécification de chaque élément en attente** comme si vous étiez le client. C'est
   la tâche la plus importante de la leçon, et celle qui donne le plus envie d'être sautée.
   Décrit-elle ce que vous avez demandé, avec vos mots ? Les critères d'acceptation sont-ils ceux
   que vous utiliseriez pour dire « c'est bon » ? Y a-t-il un cas limite que vous connaissez et qui
   n'y est pas ? Pend-il du bon nœud ? Corrigez avant que quoi que ce soit se construise.

**Avant d'envoyer le prompt** de la routine : `docs/PENDING.md` avec le bloc spécifié et lu par
vous élément par élément, avec vos corrections faites (aucun élément avec une spécification d'une
ligne), et `docs/WORKING_AGREEMENT.md`, où la routine s'ajoute.

4. Ajoutez au contrat de collaboration la routine de chaque session. Collez-lui :

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before touching any code, open
> `docs/PENDING.md`, tell me which item you are taking and why, and re-read its specification.
> Every commit cites its pending item. A pending item is closed with written evidence (the test
> counts red and green, the screenshot, the measured number), never with 'done'. When you close
> it, keep it in the register with its full specification and add: the evidence, the commit, the
> date, and any decision that was taken along the way; that record is the documentation of what
> was built. If along the way you see something that is not on the list, add it as a new pending
> item with its specification; do not do it."

> [fr]
> Ajoute cette routine à `docs/WORKING_AGREEMENT.md` : « Avant de toucher au code, ouvre
> `docs/PENDING.md`, dis-moi quel élément en attente tu prends et pourquoi, et relis sa
> spécification. Chaque commit cite son élément en attente. Un élément en attente se clôture avec
> une preuve écrite (les nombres du test en rouge et en vert, la capture, le chiffre mesuré),
> jamais avec « c'est fait ». Quand tu le clôtures, laisse-le dans le registre avec sa
> spécification complète et ajoute : la preuve, le commit, la date, et toute décision prise en
> chemin ; ce registre est la documentation de ce qui a été construit. Si en chemin tu vois
> quelque chose qui n'est pas dans la liste, ajoute-le comme nouvel élément en attente avec sa
> spécification ; ne le fais pas. »

5. Maintenant oui, commencez à construire. Demandez-lui de prendre le premier élément en attente. À
   partir d'ici, chaque session commence par « quel élément tu prends et pourquoi », et chaque
   clôture laisse l'élément documenté.

**Vérification de complétude.** Lisez la spécification d'un élément en attente au hasard :
a-t-elle tous les champs, et décrit-elle ce que vous avez demandé ? Chaque élément pend-il d'un nœud
de l'arbre que vous reconnaissez ? Chacun dit-il comment on vérifie ? Y a-t-il des règles marquées
« manquante, demandée » qu'on ne vous a pas demandées ? Y a-t-il des éléments clôturés sans preuve
ni commit ? Les clôturés conservent-ils leur spécification et leur documentation de clôture ? Prenez
trois commits au hasard : citent-ils leur élément en attente ? Quelque chose sans élément en
attente est-il apparu dans le code ?

**Livrable.** `docs/PENDING.md` avec le premier bloc spécifié, la routine dans le contrat, et le
premier élément en attente en cours.

**Erreurs typiques.** Accepter des spécifications d'une ligne : l'agent les a écrites pour
s'acquitter, et il inventera ce qui manque au moment de construire. Ne pas lire les
spécifications : c'est le seul moment où vous pouvez intercepter un malentendu avant qu'il coûte.
Laisser l'agent clôturer des éléments sans preuve parce que « je l'ai déjà vu marcher ». Le laisser
clôturer sans documenter : six mois plus tard, personne ne sait pourquoi le système fait ce qu'il
fait. Et celle qui coûte le plus à corriger : le laisser faire « une petite chose de plus » hors de
la liste. La première fois que vous le laissez faire, vous avez perdu le périmètre exact.

**Dans le projet-guide.** Le premier bloc de Turnera, ce sont environ six éléments en attente,
pendus du domaine « Agenda » de l'arbre : PND-001 voir les rendez-vous d'un jour ; PND-002
enregistrer un rendez-vous avec patient, praticien, date et heure ; PND-003 empêcher deux
rendez-vous du même praticien à la même heure ; PND-004 annuler un rendez-vous (marquer, pas
effacer : décision de la leçon 6) ; PND-005 chercher un patient par nom ou téléphone ; PND-006 la
création d'un patient avec les données minimales. La spécification de PND-003, par exemple, dit :
nœud Agenda → processus « enregistrer un rendez-vous » → entité Rendez-vous ; récit : « il ne peut
pas y avoir deux rendez-vous du même praticien à la même heure, ça m'est arrivé deux fois avec le
cahier » (mots de la responsable) ; règle : « double rendez-vous seulement si le praticien l'a
autorisé » (décision en attente, demandée) ; données : praticien, date, heure de début, durée ;
écran : formulaire de saisie ; cas limites : rendez-vous qui se chevauchent partiellement,
rendez-vous de durées différentes ; critères d'acceptation : « étant donné un rendez-vous du Dr A à
10 h 00, quand j'essaie d'en enregistrer un autre du Dr A à 10 h 00, alors l'écran avertit et la
base ne l'enregistre pas » ; vérification : test de bout en bout du formulaire plus requête à la
base. Ça, c'est une spécification.

### Leçon 6 — Les décisions s'écrivent à côté du code

**Ce que vous devez comprendre.** Le modèle, quand il trouve un trou dans les règles de métier,
**le remplit**. Il ne s'arrête pas pour demander ; il complète avec ce qui lui paraît le plus
probable, avec le même naturel qu'il écrit le reste. C'est pourquoi cette leçon n'est pas « écrivez
les décisions » mais « exigez qu'il s'arrête et demande quand il en manque une ». Et quand vous
décidez, la décision s'écrit avec vos mots textuels, votre nom et la date, dans le commit, dans la
spécification de l'élément en attente et dans un registre. Je le fais depuis le premier système
[Ref. 29](REFERENCIAS.md#ref-29) ; six semaines plus tard, quand quelqu'un demande « pourquoi
annuler n'efface pas ? », la réponse est écrite et elle est à vous.

**La tâche.**

**Avant d'envoyer le prompt**, de vos mains :

- `docs/WORKING_AGREEMENT.md` (leçon 1), où va la routine.
- `docs/DECISIONS.md`, créé même s'il est vide, avec le format dans l'en-tête : la date, qui a
  décidé, les mots textuels, l'élément en attente qui en avait besoin.
- Un accord avec le propriétaire du domaine, si ce n'est pas vous, sur le canal et le délai dans
  lequel il répond : la routine ne fonctionne que si quelqu'un décide en heures, pas en semaines.

1. Ajoutez au contrat la routine des décisions. Collez-lui :

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Whenever implementing something requires a
> business rule that is not written down, or you must choose between two approaches that change
> what the user sees, stop and ask me, in prose, with your recommendation and the alternative. Do
> not implement the one you prefer. When I decide, write the decision with my name and the date
> in the commit message, in the pending item's specification and in `docs/DECISIONS.md`, with
> the exact words I used. If I do not answer and you must move on, implement the most reversible
> option and mark it 'decision by omission, pending confirmation', so that I can review it."

> [fr]
> Ajoute cette routine à `docs/WORKING_AGREEMENT.md` : « Chaque fois qu'implémenter quelque chose
> exige une règle de métier qui n'est pas écrite, ou que tu dois choisir entre deux approches qui
> changent ce que l'utilisateur voit, arrête-toi et demande-moi, en prose, avec ta recommandation
> et l'alternative. N'implémente pas celle que tu préfères. Quand je décide, écris la décision
> avec mon nom et la date dans le message du commit, dans la spécification de l'élément en attente
> et dans `docs/DECISIONS.md`, avec les mots exacts que j'ai utilisés. Si je ne réponds pas et
> que tu dois continuer, implémente l'option la plus réversible et marque-la « décision par
> omission, en attente de confirmation », pour que je la revoie. »

   Vous lui demandez de s'arrêter devant une règle non écrite, de demander avec recommandation et
   alternative (pour que vous puissiez décider en dix secondes), d'enregistrer vos mots textuels
   aux trois endroits, et quand vous ne répondez pas de choisir le plus réversible et de le
   marquer.

2. Continuez à construire les éléments en attente du bloc. Chaque fois qu'il vous demande une
   règle de métier, décidez et répondez avec le format de clôture.

**Avant d'envoyer le prompt** de clôture : la question de l'agent lue avec sa recommandation et
son alternative, et votre décision rédigée en une phrase avec les mots exacts que vous voulez voir
rester pour toujours, consultée avec le propriétaire si ce n'est pas vous, avec la date. Cela ne
s'improvise pas dans le chat.

3. Collez-lui :

> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.

> [fr]
> Règle : [texte exact]. Décidée par moi, [date]. Note-la et continue.

4. Faites le test contraire, une fois, à dessein : laissez une question sans réponse pendant une
   session et regardez ce qu'il fait. Il doit choisir le plus réversible et le marquer « par
   omission ». S'il a choisi ce qui lui semblait bon et ne l'a pas marqué, c'est une défaillance de
   l'échelon : corrigez-la dans le contrat.

**Vérification de complétude.** Ouvrez trois commits qui touchent des règles de métier :
citent-ils qui a décidé et quand ? La règle est-elle aussi dans la spécification de l'élément en
attente ? Y a-t-il des décisions « par omission » non confirmées ? Y a-t-il dans le système une
règle que vous ne reconnaissez pas comme la vôtre ? Les phrases sont-elles textuelles ou
« améliorées » ?

**Livrable.** `docs/DECISIONS.md` qui grandit, avec au moins cinq décisions du premier bloc, et
les commits et les éléments en attente qui les citent.

**Erreurs typiques.** Répondre aux questions par chat sans exiger qu'elles soient écrites : à la
troisième session, plus personne ne s'en souvient. Laisser l'agent « améliorer » vos mots : une
règle paraphrasée est une règle différente. Et la plus grave : découvrir en production une règle
que personne n'a décidée. Quand ça arrive (ça arrivera), ce n'est pas un bug : c'est un échec de
l'échelon 6, et ça se répare dans le contrat, pas seulement dans le code.

**Dans le projet-guide.** Décisions typiques du premier bloc de Turnera : « annuler marque le
rendez-vous comme annulé et garde qui et quand ; rien n'est effacé » ; « un praticien ne peut pas
avoir deux rendez-vous à la même heure, mais oui deux patients dans un double rendez-vous si le
praticien l'a autorisé » ; « le téléphone du patient est obligatoire ; le courriel non ». Chacune
avec sa date et le nom de la responsable, et chacune collée dans la spécification de l'élément en
attente qui en avait besoin.

### Leçon 7 — Mesurer avant de construire, avec un instrument lui-même vérifié

**Ce que vous devez comprendre.** Le modèle produit des affirmations chiffrées (« il y a environ
120 requêtes de ce type ») et elles sonnent exactement pareil quand elles sont mesurées et quand
elles sont estimées. Vous ne pouvez pas les distinguer au ton. La seule façon est d'exiger
l'instrument : « avec quoi l'as-tu mesuré ? montre-moi la commande ». La règle de l'échelon est
qu'**aucun chiffre qui décide de quelque chose ne sort d'une impression** : il sort d'un compteur
qui vit dans le dépôt, qui a un test qui le vérifie contre un cas connu, et que vous pouvez
lancer.

Et il y a autre chose, que j'ai appris à la dure et qui est la raison pour laquelle j'ai tardé à
formaliser cette règle que je tenais pour évidente : les compteurs mentent aussi. Dans un de mes
systèmes, un compteur donnait zéro parce qu'il ne voyait pas une partie du code, et un autre disait
27 quand il y en avait 44 [Ref. 35](REFERENCIAS.md#ref-35), [Ref. 36](REFERENCIAS.md#ref-36).
D'où l'audit dans les deux directions : du code à la mesure (tout ce qui devrait être compté
l'est-il ?) et de la mesure au code (tout ce qui est compté existe-t-il vraiment ?).

Dans un petit projet, « mesurer » est modeste : compter combien de requêtes fait un écran au
chargement, combien de temps prend le rapport mensuel, combien de messages ont été envoyés hier.
Pas besoin d'un cliquet ni d'un budget par chemin. Ce qu'il faut, en revanche, c'est que le chiffre
ait une commande derrière lui.

**La tâche.**

**Avant d'envoyer le prompt**, de vos mains :

- L'hypothèse, en une phrase. Dans Turnera, une bonne : « l'agenda du jour fait une requête à la
  base pour chaque rendez-vous affiché » (le classique de la boucle N+1). Si elle n'est pas vraie,
  tant mieux : vous verrez comment se vérifie une hypothèse fausse. Elle va dans le trou du
  prompt, avec la quantité à mesurer.
- Un cas connu pour le test du compteur, où vous connaissez la réponse d'avance (« avec zéro
  rendez-vous, il doit compter exactement les requêtes de base »).
- L'accès à ce qui se mesure (la base en lecture seule si ce sont des données réelles, le journal)
  et les compteurs qui existent déjà dans le dépôt, nommés.

1. Collez-lui :

> Before building anything, we are going to measure. The hypothesis is: [the day view runs one
> database query per appointment shown]. Write a meter (a script that lives in the repository)
> that measures [the number of queries the day view runs for a day with N appointments], and a
> test for the meter that checks it against a known case where the answer is known in advance.
> If measuring requires access or data you lack, ask me; do not approximate silently. If some
> part can only be approximated, mark it as approximate and tell me the margin. Run the meter,
> show me the number together with the command that produces it, and audit it in both
> directions: from the code to the measurement (is everything that should be counted, counted?)
> and from the measurement to the code (does everything counted actually exist?). Only then
> propose what to build. Reply in my language.

> [fr]
> Avant de construire quoi que ce soit, nous allons mesurer. L'hypothèse est : [l'agenda du jour
> fait une requête à la base pour chaque rendez-vous affiché]. Écris un compteur (un script qui vit
> dans le dépôt) qui mesure [le nombre de requêtes que fait l'agenda du jour pour un jour avec N
> rendez-vous], et un test pour le compteur qui le vérifie contre un cas connu où la réponse est
> connue d'avance. Si mesurer requiert un accès ou des données que tu n'as pas, demande-les-moi ;
> n'approxime pas en silence. Si une partie ne peut être qu'approximée, marque-la comme approximée
> et dis-moi la marge. Lance le compteur, montre-moi le chiffre avec la commande qui le produit, et
> audite-le dans les deux directions : du code à la mesure (tout ce qui devrait être compté
> l'est-il ?) et de la mesure au code (tout ce qui est compté existe-t-il vraiment ?). Seulement
> alors, propose quoi construire. Réponds dans ma langue.

   Vous lui demandez le compteur dans le dépôt, le test du compteur, de demander ce qui lui manque
   au lieu d'approximer, de marquer l'approximé, le chiffre avec la commande, l'audit dans les deux
   directions, et l'ordre : d'abord mesurer, ensuite proposer.

2. Lancez vous-même la commande qu'il vous a donnée. Elle doit vous donner le même chiffre. Pas
   besoin de comprendre le script ; il faut l'exécuter.
3. Si l'hypothèse était vraie et que l'agent propose de corriger, demandez-lui un budget.

**Avant d'envoyer le prompt** du budget : le chiffre mesuré, lancé par vous avec la commande qu'il
vous a donnée (elle doit vous donner la même chose), et la marge que vous êtes prêt à donner,
décidée par vous : un peu plus que ce qui a été mesuré, pas le double au cas où.

4. Collez-lui :

> Set the budget for [queries] on this path at the measured value plus a small margin, and
> protect it with a test that fails if it is exceeded. Tell me the number and the margin.

> [fr]
> Fixe le budget de [requêtes] sur ce chemin à la valeur mesurée plus une petite marge, et
> protège-le avec un test qui échoue s'il est dépassé. Dis-moi le chiffre et la marge.

   Ainsi, si quelqu'un remet la boucle dans trois mois, la batterie le détecte.

**Avant d'envoyer le prompt** de la règle cinq : `docs/WORKING_AGREEMENT.md`, et un compteur déjà
existant pour chaque quantité qu'un plan peut affirmer ; s'il n'y a pas de compteur, d'abord le
prompt initial de cette leçon.

5. Ajoutez au contrat la règle cinq, pour quand un plan apporte des chiffres :

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before executing a plan that asserts
> numbers, verify every number with the meter. If any does not match, stop and tell me; do not
> execute on a wrong number."

> [fr]
> Ajoute cette routine à `docs/WORKING_AGREEMENT.md` : « Avant d'exécuter un plan qui affirme des
> chiffres, vérifie chaque chiffre avec le compteur. Si l'un d'eux ne coïncide pas, arrête-toi et
> dis-le-moi ; n'exécute pas sur un chiffre faux. »

**Vérification de complétude.** Avez-vous lancé le compteur et obtenu la même chose ? A-t-il un
test, contre quel cas connu ? Y a-t-il un chiffre dans le rapport sans compteur derrière ?
L'approximé est-il marqué ? Y a-t-il un budget avec test ?

**Livrable.** Un compteur dans le dépôt avec son test, un chiffre avec sa commande et sa date dans
`docs/STATUS.md` ou dans l'élément en attente, et (le cas échéant) un budget protégé par un test.

**Erreurs typiques.** Accepter le chiffre sans lancer la commande : la moitié de la valeur de cette
leçon est que vous la lanciez vous-même. Un compteur qui donne zéro : ce n'est presque jamais zéro ;
presque toujours, il ne voit pas quelque chose. Et laisser l'agent « corriger pendant qu'il
mesure » : l'ordre, c'est la méthode.

**Dans le projet-guide.** Le compteur de Turnera est un script qui charge une journée avec 10, 50
et 200 rendez-vous dans une base de test, ouvre l'agenda de ce jour en comptant les requêtes, et
écrit les trois chiffres. Le test du compteur vérifie qu'avec 0 rendez-vous il compte exactement les
requêtes de base (disons, 2). S'il y avait une boucle, les chiffres sont 12, 52 et 202 ; on
corrige, ils passent à 3, 3 et 3, et le budget est fixé à 4 avec un test qui échoue si l'agenda
fait plus de 4 requêtes pour n'importe quel nombre de rendez-vous.

### Leçon 8 — Les tests comme verrous, prouvés en rouge, et les tests de bout en bout

**Ce que vous devez comprendre.** C'est la leçon centrale du cours. Un test que vous n'avez jamais
vu échouer, vous ne savez pas s'il prouve quelque chose. Le modèle écrit le code et le test dans la
même session, avec la même compréhension : s'il a mal compris la demande, le test prouve ce qu'il a
compris, et il passe. La seule façon bon marché de savoir que le test regarde ce qui compte est de
**le voir au rouge contre l'ancien code** : si le code d'avant le changement le passe aussi, le
test ne distingue pas l'avant de l'après, et alors il ne sert à rien. C'est pourquoi la demande
n'est pas « écris des tests » mais « montre-moi le rouge, puis le vert, puis la régression ». Le cas
qui le montre le mieux est celui des compteurs qui ne coïncidaient pas
[Ref. 26](REFERENCIAS.md#ref-26).

Et la seconde idée, qui est aussi importante que la première : les tests de bout en bout. Un test
qui vérifie depuis l'écran (il clique, il tape, il lit) et qui constate l'effet dans le backend (la
ligne est là, l'état a changé) est celui qui remplace votre lecture du code. Les critères
d'acceptation de l'élément en attente (« étant donné, quand, alors ») en sont le scénario. Et ils
se lancent **trois fois, à trois échelles** : le flux touché, avec chaque élément en attente ; tous
les flux qui existent, à la clôture de chaque bloc ; et tous les flux avec la version exacte, avant
chaque déploiement en production. Si vous ne faites que la troisième, vous arrivez à la fin avec un
système que personne n'a testé de bout en bout pendant des semaines.

**La tâche.**

**Avant d'envoyer le prompt**, de vos mains :

- `docs/WORKING_AGREEMENT.md`, où va la routine.
- L'élément en attente qui va être clos, avec ses critères d'acceptation « étant donné, quand,
  alors » et son « comment cela se vérifie » dans `docs/PENDING.md` : ce sont le scénario du test.
  S'il ne les a pas, revenez à la leçon 5 avant de demander le test.
- La batterie et la commande pour la lancer dans `docs/STATUS.md` (leçon 4), et l'environnement de
  test en marche, avec assez de données pour le flux qui est touché ; s'il manque des données,
  chargez-les vous-même ou demandez-lui de les créer dans le cadre du test, mais qu'il ne les
  simule pas.

1. Ajoutez au contrat la routine de preuve. Collez-lui :

> Add this routine to `docs/WORKING_AGREEMENT.md`: "To close a pending item I need evidence,
> not your word. (1) Write the test that proves what the item asks for, following its acceptance
> criteria. (2) Demonstrate that this test fails against the previous code: you may temporarily
> revert the change, or run the test against the old version, but show me the red output. (3)
> Show me the green output with the change. (4) Run the regression suite for the neighbouring
> items and show me it is still green. (5) Run the end-to-end test of the flow this item
> touches, from the screen to the backend, and show me the backend effect. (6) Do not replace
> with mocks the very part you are trying to test. If testing end to end requires something you
> lack (data, access, an environment), ask me for it; do not simulate what you do not have.
> Finally, the commit message says 'proved red against [what]' and the test counts."

> [fr]
> Ajoute cette routine à `docs/WORKING_AGREEMENT.md` : « Pour clôturer un élément en attente, j'ai
> besoin d'une preuve, pas de ta parole. (1) Écris le test qui prouve ce que l'élément demande, en
> suivant ses critères d'acceptation. (2) Démontre que ce test échoue contre le code antérieur : tu
> peux annuler temporairement le changement, ou lancer le test contre l'ancienne version, mais
> montre-moi la sortie en rouge. (3) Montre-moi la sortie en vert avec le changement. (4) Lance
> la régression des éléments en attente voisins et montre-moi qu'elle est toujours au vert.
> (5) Lance le test de bout en bout du flux que cet élément touche, de l'écran jusqu'au backend,
> et montre-moi l'effet dans le backend. (6) Ne remplace pas par des simulations justement la
> partie que tu es en train de tester. Si tester de bout en bout exige quelque chose que tu n'as
> pas (des données, un accès, un environnement), demande-le-moi ; ne simule pas ce que tu n'as
> pas. Enfin, le message du commit dit « prouvé en rouge contre [quoi] » et les nombres des
> tests. »

   Vous lui demandez le test guidé par les critères d'acceptation, **le rouge démontré avec la
   sortie en vue**, le vert, la régression des voisins, le test de bout en bout du flux avec
   l'effet dans le backend, pas de simulation de justement ce qu'on teste, et de demander ce qui
   manque au lieu de le simuler.

2. Prenez l'élément en attente de la double réservation (PND-003 dans Turnera, ou l'équivalent
   dans votre projet : une règle qui empêche quelque chose). Demandez-lui de le clôturer avec la
   routine. Lisez le rapport : il doit y avoir une sortie en rouge avec des nombres (« 1 sur 1
   échoue contre la version sans la règle »), puis le vert, et le test de bout en bout : un
   navigateur piloté par programme qui ouvre l'écran, tente d'enregistrer la double réservation,
   lit l'avertissement, et vérifie dans la base qu'elle n'a pas été enregistrée.
3. S'il vous dit qu'il ne peut pas tester de bout en bout parce que l'écran ne peut pas être piloté
   par programme, arrêtez : c'est X2 qui échoue, et il faut le réparer maintenant (ajouter des
   identifiants aux éléments de l'écran) avant de continuer.

**Avant d'envoyer le prompt** : distinguez s'il lui manque un intrant que vous avez (des données,
un accès, un environnement : donnez-le-lui et n'envoyez pas ce prompt) ou si vraiment le système
n'est pas testable là (ce prompt).

4. Collez-lui :

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

> [fr]
> Explique pourquoi ça ne peut pas être testé, ce qu'il faudrait ajouter pour que ça le soit, et
> ouvre un élément en attente pour cela. Le changement n'est pas clôturé tant qu'il ne peut pas
> être testé.

5. **À la clôture du bloc**, quand les six éléments en attente sont clôturés, lancez la batterie
   complète.

**Avant d'envoyer le prompt** de la batterie : les six éléments en attente clos avec la routine,
la version exacte qui va être promue identifiée et déployée dans l'environnement de test, et votre
propre liste des flux qui existent (tirée des cas d'utilisation de l'arbre sémantique), pour la
confronter à ce que l'agent dira avoir couvert.

6. Collez-lui :

> Run the complete end-to-end suite of every flow that exists so far, in the test environment,
> with the exact version that will be promoted. Show me the counts, and for each flow the
> backend check that proves it. If any flow has no end-to-end test, say so and open a pending
> item for it; do not pass it as covered.

> [fr]
> Lance la batterie complète de bout en bout de tous les flux qui existent jusqu'ici, dans
> l'environnement de test, avec la version exacte qui sera promue. Montre-moi les nombres et, pour
> chaque flux, la vérification dans le backend qui le prouve. Si un flux n'a pas de test de bout
> en bout, dis-le et ouvre un élément en attente ; ne le fais pas passer pour couvert.

7. Et après cela, **utilisez le système vous-même**. Ouvrez l'environnement de test et faites ce
   que ferait la réceptionniste : enregistrez un rendez-vous, tentez la double réservation,
   annulez, cherchez. Ce qui vous gêne, ce que vous ne comprenez pas, ce qui n'est pas à sa place :
   notez-le comme élément en attente. Ce moment-là trouve ce qu'aucun test ne trouve.

**Vérification de complétude.** Le rapport montre-t-il le rouge, avec des nombres ? La régression
a-t-elle tourné dans la même session, avec des nombres ? Le test de bout en bout vérifie-t-il aussi
le backend ? Y a-t-il une partie simulée juste là où se trouve le changement ? Le commit dit-il
« prouvé en rouge » ? À la clôture du bloc : tous les flux sont-ils dans la batterie de bout en
bout ? Avez-vous utilisé le système vous-même et noté ce que vous avez trouvé ?

**Livrable.** Au moins trois éléments en attente clôturés avec la routine complète (rouge, vert,
régression, bout en bout), la batterie complète de bout en bout du bloc au vert, et les éléments en
attente sortis de vos tests humains.

**Erreurs typiques.** Accepter « les tests passent » sans nombres et sans rouge. Accepter que la
batterie « s'accélère » en remplaçant les tests de bout en bout par des simulations. Laisser passer
un « ça ne peut pas être testé » sans ouvrir l'élément en attente. Et clôturer le bloc sans
l'utiliser vous-même : le regard humain ne se délègue pas.

**Dans le projet-guide.** Le rouge de la double réservation ressemble à ceci : l'agent retire
temporairement la règle, lance le test, et la sortie dit que le test a échoué parce que le second
rendez-vous a été enregistré. Il remet la règle, lance, vert. Ensuite la régression : les tests de
PND-001 et PND-002 sont toujours au vert. Et celui de bout en bout : un navigateur piloté par
programme remplit le formulaire, appuie sur « enregistrer », lit le message « ce créneau est déjà
occupé », et une requête à la base confirme qu'il n'y a qu'un seul rendez-vous à cette heure. À la
clôture du bloc, la batterie de bout en bout parcourt les trois flux qui existent (voir le jour,
enregistrer, annuler), et la responsable enregistre dix rendez-vous de test et découvre que l'heure
se choisit avec un menu déroulant peu pratique. Nouvel élément en attente. Quand vous verrez ce
rapport pour la première fois, vous comprendrez à quoi sert toute la méthode.

### Leçon 9 — Qualité du code vérifiée par machine

**Ce que vous devez comprendre.** Vous, vous ne lisez pas le code, et c'est très bien ; mais le
code existe et quelqu'un va le maintenir. Si personne ne le lit, c'est une machine qui doit le
regarder : un *linter* (comme le correcteur orthographique d'un traitement de texte, mais pour le
code), un *formateur* (un seul style pour tout), des limites de taille des fichiers et des
fonctions, des limites de *complexité* (combien de chemins a une fonction), la détection de code
dupliqué et mort, et la *couverture* des tests avec un *cliquet* (celle d'aujourd'hui est le
plancher de demain). Le tout dans l'intégration continue, au rouge quand c'est violé. Je l'ai fait
dans tous mes projets ; un audit m'a renvoyé un composant de plus de deux mille lignes parce
qu'aucune limite ne l'avait arrêté [Ref. 41](REFERENCIAS.md#ref-41).

**Avant d'envoyer le prompt**, de vos mains :

- L'intégration continue qui tourne (leçon 4) et au moins un élément en attente du bloc clos avec
  la leçon 8, pour qu'il y ait du vrai code à mesurer.
- Vos deux limites, en une ligne : pour Turnera, trois cents lignes par fichier et quarante par
  fonction, et la couverture ne fait que monter.

1. Collez-lui le prompt initial du contrat de l'échelon 9 (dans `docs/peldanos/`), avec vos
   limites dans les trous.
2. Lisez `docs/CODE_QUALITY.md`. Il y aura une liste de ce qui échoue aujourd'hui ; décidez ce
   qui se corrige tout de suite (un élément en attente pour chaque) et ce qui se tolère avec une
   date, et écrivez-le dans le même fichier.

**Avant d'envoyer le prompt** de la routine : `docs/CODE_QUALITY.md` lu et avec vos décisions, et
`docs/WORKING_AGREEMENT.md`.

3. Ajoutez au contrat la routine de l'échelon 9, enveloppée dans « Add this routine to
   `docs/WORKING_AGREEMENT.md`: » comme les autres.
4. Demandez-lui de mettre exprès, dans une branche, une fonction de cent lignes et une variable
   inutilisée : la chaîne doit passer au rouge pour les deux choses.

**Vérification de complétude.** La dernière exécution de la chaîne a-t-elle la qualité au vert ?
Le test de la branche est-il passé au rouge ? Y a-t-il des exceptions au linter, et chacune a-t-elle
sa raison écrite ? La couverture d'aujourd'hui est-elle supérieure ou égale à celle d'hier ?

**Livrable.** La porte de qualité dans la chaîne, `docs/CODE_QUALITY.md` avec les limites et les
valeurs, et la routine dans le contrat.

**Erreurs typiques.** Laisser l'agent « désactiver cette règle parce qu'elle est trop stricte »
sans que cela passe par vous. Relever une limite pour qu'elle passe. Et confondre couverture et
qualité : la couverture compte les tests, le rouge de la leçon 8 dit s'ils prouvent quelque chose.

**Dans le projet-guide.** La première exécution de Turnera donne du rouge sur trois choses : le
formulaire de rendez-vous a une fonction de 70 lignes (on la coupe en deux : élément en attente),
il y a deux copies du format de date (une seule, dans le serveur : élément en attente), et la
couverture est à 61 %. Le cliquet reste à 61 et monte avec chaque élément en attente. À la
clôture du bloc, 74 %.

### Leçon 10 — Les cas de test manuel s'écrivent avec la fonctionnalité

**Ce que vous devez comprendre.** Tous les tests que nous avons vus jusqu'ici sont écrits et
lancés par le modèle, et ils testent ce que le modèle a compris. Il manque le test que fait une
personne avec ses yeux et ses mains, en suivant un *scénario* : un cas de test manuel, avec
précondition, étapes, résultat attendu et un tableau pour noter chaque exécution. Le scénario est
écrit par l'agent avec chaque élément en attente, à partir des critères d'acceptation ; vous
l'exécutez (ou la responsable) à la clôture de chaque bloc, avant le premier déploiement et après
chaque déploiement ; et ce qui échoue revient dans la boucle comme élément en attente correctif,
avec vos mots. C'est le regard humain avec un scénario, et c'est la fermeture du circuit du
graphique du procédé : l'exécution manuelle réinjecte des exigences.

**Avant d'envoyer le prompt**, de vos mains :

- `docs/MANUAL_TESTS.md` créé, même vide, avec le format dans l'en-tête (copiez-le du contrat de
  l'échelon 10).
- La décision de qui exécute et quand, écrite dans le contrat : pour le cours, vous à la clôture
  de chaque bloc et la responsable avant le premier déploiement.
- Un élément en attente du bloc clos avec les leçons 8 et 9.

1. Ajoutez au contrat la routine de l'échelon 10 (dans le contrat, « Routine de chaque élément en
   attente »), enveloppée comme les autres. Désormais, chaque élément en attente qui touche un
   écran se clos avec son cas.
2. Demandez-lui d'écrire les cas des éléments en attente déjà clos du bloc. Prenez-en un au
   hasard et suivez-le vous-même dans l'environnement de test sans rien lui demander : si vous
   avez dû demander, le cas n'est pas écrit pour une personne ; faites-le réécrire.
3. À la clôture du bloc, exécutez vous-même tous les cas du bloc, à la main, et notez dans chacun
   la date, votre nom, passé ou échoué, et l'observation. Ce qui vous gêne et qui ne tombe dans
   aucun cas, notez-le à la fin du fichier.

**Avant d'envoyer le prompt** de l'exécution : vos exécutions notées dans le fichier, cas par cas,
et les observations éparses à la fin.

4. Collez-lui le prompt d'exécution du contrat de l'échelon 10. Chaque échec doit revenir comme
   élément en attente correctif avec vos mots.

**Vérification de complétude.** Avez-vous pu suivre un cas sans demander ? Chaque élément en
attente clos qui touche un écran a-t-il son cas ? Chaque cas dit-il quoi vérifier de l'autre côté
de l'écran ? L'exécution a-t-elle une date et un nom dans chaque cas ? Chaque échec a-t-il son
élément en attente avec vos mots ?

**Livrable.** `docs/MANUAL_TESTS.md` avec un cas par flux du bloc, la première exécution
enregistrée, et un élément en attente par échec.

**Erreurs typiques.** Laisser l'agent marquer les cas comme exécutés. Des cas qui sont le test
automatique en prose. Et corriger les échecs sur le moment, sans élément en attente : on perd vos
mots et la trace de ce qui se répète.

**Dans le projet-guide.** Les cas du premier bloc de Turnera sont six : voir l'agenda du jour,
enregistrer un rendez-vous, tenter une surréservation, annuler, chercher un patient, créer un
patient. À la première exécution, deux échouent : celui d'annuler (l'agenda ne se met pas à jour
avant de recharger la page ; observation de la responsable : « je croyais que ça n'avait pas été
annulé ») et celui de chercher (avec deux patients du même nom de famille, il n'en montre qu'un).
Deux éléments en attente correctifs, avec ses mots. Le menu déroulant peu pratique de l'heure,
qu'aucun test n'a vu, apparaît comme observation éparse.

### Leçon 11 — Symétrie entre producteur et consommateur, et le registre des anti-patrons

**Ce que vous devez comprendre.** Quand vous changez un bout du système (le serveur, la base, un
robot), l'autre bout (l'écran, un compteur, un rapport) doit changer dans le même commit. Sinon,
ils divergent, et l'utilisateur voit un chiffre d'un côté et un autre chiffre de l'autre
[Ref. 26](REFERENCIAS.md#ref-26). Le principe qui l'évite est simple à énoncer et difficile à
tenir : **toute liste a un seul propriétaire**. Les états possibles d'un rendez-vous, les colonnes
d'un rapport, les causes pour lesquelles quelque chose attend : une seule partie les définit (le
producteur) et les autres les lisent à cet endroit [Ref. 27](REFERENCIAS.md#ref-27). L'arbre
sémantique est le premier endroit où ces listes se déclarent. Dès qu'il y a deux copies, l'une est
périmée ; il ne reste qu'à savoir laquelle.

La seconde moitié de la leçon est le registre des anti-patrons (GOTCHAS) : les erreurs que vous
avez déjà encaissées une fois, notées avec leur odeur, leur cause racine, leur correctif et la façon
de les détecter avant [Ref. 2](REFERENCIAS.md#ref-2). L'important n'est pas de les noter : c'est
d'ajouter la vérification automatique qui les détecte, parce qu'un anti-patron noté et non
automatisé se répète dès que la session change.

**La tâche.**

**Avant d'envoyer le prompt**, de vos mains :

- Au moins un bloc fonctionnel construit : sans contrats entre les parties, il n'y a pas de carte
  à faire.
- `docs/SEMANTIC_TREE.md` à jour : les listes (états, types, causes) y sont déclarées, et la carte
  doit coïncider avec l'arbre.
- Une liste écrite par vous de ce qui vit hors du dépôt et produit ou consomme quelque chose du
  système (un robot, un tableur, un processus d'une autre équipe), ou le constat qu'il n'y a rien.

1. Demandez-lui la carte des contrats :

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

> [fr]
> Construis `docs/PRODUCER_CONSUMER_MAP.md` : pour chaque contrat du système (un service, une
> table, un format de fichier, une liste de valeurs), qui le produit et qui le consomme. S'il y a
> des parties du système auxquelles tu ne peux pas accéder ou que tu ne comprends pas, dis-le-moi
> au lieu de les laisser hors de la carte. Réponds dans ma langue.

   Vous lui demandez l'inventaire des contrats avec leurs deux côtés, et que ce qu'il ne voit pas,
   il le déclare au lieu de l'omettre.

**Avant d'envoyer le prompt** de la routine : la carte revue par vous (choisissez un contrat et
vérifiez que les deux côtés sont bien ceux que vous connaissez) et `docs/WORKING_AGREEMENT.md`.

2. Ajoutez la routine au contrat :

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before closing any change that touches a
> contract, look up every consumer in the map and update them in the same commit. Always prefer
> that the producer defines the list (columns, causes, states) and the consumer reads it, rather
> than each keeping its own copy. If the map does not have that relationship, add it."

> [fr]
> Ajoute cette routine à `docs/WORKING_AGREEMENT.md` : « Avant de clore tout changement qui touche
> un contrat, cherche dans la carte chaque consommateur et mets-les à jour dans le même commit.
> Préfère toujours que le producteur définisse la liste (colonnes, causes, états) et que le
> consommateur la lise, plutôt que chacun garde sa propre copie. Si la carte n'a pas cette
> relation, ajoute-la. »

3. Faites le test de la liste : choisissez une liste qui apparaît à l'écran (dans Turnera, les
   états d'un rendez-vous : en attente, confirmé, annulé, absent) et demandez à l'agent de vous
   montrer où elle est définie et où elle est lue. S'il y a deux définitions, demandez-lui de n'en
   laisser qu'une, et qu'elle coïncide avec l'arbre sémantique.
4. La première fois que quelque chose casse pour la deuxième fois (cela arrivera),
   enregistrez-le.

**Avant d'envoyer le prompt** : l'élément en attente ou le commit de la première fois, retrouvé
par vous parmi les clos de `docs/PENDING.md`, pour le lui coller avec le prompt (sans cette
référence, l'anti-patron sort générique) ; et `docs/GOTCHAS.md` créé même s'il est vide, avec le
format dans l'en-tête : l'odeur, la cause racine, le correctif, comment le détecter avant.

5. Collez-lui :

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

> [fr]
> Cela nous est déjà arrivé. Enregistre-le dans `docs/GOTCHAS.md` avec : comment ça sent (le
> signe précoce), la cause racine, le correctif, et comment le détecter la prochaine fois avant
> que ça fasse mal. Et ajoute, si possible, un test ou une vérification automatique qui le
> détecte.

**Vérification de complétude.** Choisissez un contrat de la carte : chaque consommateur le lit-il
chez le producteur, ou a-t-il sa copie ? Y a-t-il un chiffre affiché sur deux écrans, et
donnent-ils la même chose ? Les états des entités coïncident-ils entre le code et l'arbre
sémantique ? Chaque entrée de GOTCHAS a-t-elle les quatre parties ? Quelque chose qui était déjà
noté s'est-il répété ?

**Livrable.** `docs/PRODUCER_CONSUMER_MAP.md`, la routine dans le contrat, et `docs/GOTCHAS.md`
(même s'il démarre avec une seule entrée).

**Erreurs typiques.** Faire la carte une fois et ne plus jamais la regarder : elle doit grandir
avec chaque nouveau contrat. Noter les anti-patrons comme des anecdotes (« une fois il est arrivé
que… ») sans la partie « comment le détecter avant ». Et le classique : le même texte d'un état
écrit à la main dans le serveur et dans l'écran ; le jour où l'un change, l'autre reste.

**Dans le projet-guide.** La carte de Turnera a, au début, quatre ou cinq contrats : la liste des
états de rendez-vous (le serveur la définit, l'écran et le rapport mensuel la lisent) ; la table
des rendez-vous (la saisie l'écrit, l'agenda du jour et le rapport la lisent) ; la table des
patients ; et, plus tard, la file des messages (l'agenda l'écrit, l'envoyeur la lit). Le premier
GOTCHA est souvent une affaire de dates : l'agenda affichait le rendez-vous le mauvais jour parce
que le serveur enregistrait dans un fuseau horaire et l'écran affichait dans un autre. Odeur : « le
rendez-vous de 23 h apparaît demain ». Cause racine : deux fuseaux horaires. Correctif : un seul,
sur le serveur. Détection : un test avec un rendez-vous à 23 h 30.

### Leçon 12 — Vérification honnête et rapport proportionné

**Ce que vous devez comprendre.** Si vous n'allez pas lire le code, le rapport de l'agent doit
être fiable, et cela n'arrive pas tout seul. Le modèle a été entraîné pour être utile et complet,
et un rapport qui dit « ceci, je n'ai pas pu le vérifier » semble moins utile qu'un qui dit « c'est
fait ». Il faut donc **lui demander explicitement** les mauvaises nouvelles, les angles morts et ce
qu'il n'a pas fait. Si vous ne le lui demandez pas, il ne vous le donne pas ; non parce qu'il le
cache, mais parce qu'il ne le considère pas comme faisant partie de la réponse. À moi, on m'a
rapporté une erreur d'authentification avec la mention « success »
[Ref. 43](REFERENCIAS.md#ref-43).

La structure qui le rend honnête, ce sont trois blocs : **vérifié** (avec la preuve à côté), **cru**
(ce qu'il pense qui fonctionne et pourquoi il ne l'a pas testé), et **angles morts** (ce qu'il ne
peut pas voir de là où il est). Et une règle : les mauvaises nouvelles d'abord.

**La tâche.**

**Avant d'envoyer le prompt**, de vos mains :

- `docs/WORKING_AGREEMENT.md`, où va la routine.
- L'habitude de noter, à chaque session, la liste de ce que vous avez demandé : le prompt lui
  exige de couvrir chaque point un par un, et vous devez savoir combien il y en avait.

1. Ajoutez au contrat la routine de rapport :

> Add this routine to `docs/WORKING_AGREEMENT.md`: "When you report, separate three blocks:
> VERIFIED (what you tested, with the command and its output), BELIEVED (what you think works but
> did not test, and why not), and BLIND SPOTS (what you cannot see from where you are: another
> environment, real data, the user's browser). Cover every item I asked for, one by one, even when
> the answer is 'I did not do it'. No claim without its proof next to it. Do not say 'done': say
> what is done and how you know it. If something went wrong, say it first."

> [fr]
> Ajoute cette routine à `docs/WORKING_AGREEMENT.md` : « Quand tu rapportes, sépare trois blocs :
> VÉRIFIÉ (ce que tu as testé, avec la commande et sa sortie), CRU (ce que tu penses qui fonctionne
> mais que tu n'as pas testé, et pourquoi), et ANGLES MORTS (ce que tu ne peux pas voir de là où tu
> es : un autre environnement, des données réelles, le navigateur de l'utilisateur). Couvre chaque
> point que je t'ai demandé, un par un, même quand la réponse est “je ne l'ai pas fait”. Aucune
> affirmation sans sa preuve à côté. Ne dis pas “c'est fait” : dis ce qui est fait et comment tu le
> sais. Si quelque chose a mal tourné, dis-le d'abord. »

2. Demandez-lui de clore le prochain élément en attente et lisez le rapport avec la liste de
   vérification ci-dessous. La première fois, presque à coup sûr, le bloc « angles morts » sera
   vide. Demandez-lui : « qu'est-ce que tu ne peux pas voir de là où tu es ? ». Il doit y avoir
   quelque chose (votre navigateur, l'environnement de production, les données réelles). S'il
   insiste que rien, insistez vous aussi.
3. Pratiquez le « c'est toujours cassé ». Demandez-lui quelque chose de petit, vérifiez dans
   l'environnement de test, et si pour une raison quelconque vous ne voyez pas le changement (c'est
   courant : le déploiement tarde, ou n'a pas été fait), dites-lui « c'est toujours cassé ».

**Avant d'envoyer le prompt** : votre vérification notée (sur quelle URL vous avez regardé, quelle
version affiche le système, ce que vous avez fait, ce que vous attendiez, ce qui s'est passé) et
le commit ou la version dont l'agent a dit qu'il contenait le correctif, copié de son rapport.
Sans cela, le « c'est toujours cassé » est une impression.

4. Collez-lui :

> Before diagnosing again, compare the version running where I see the problem with the version
> that contains your fix. Tell me both. If they differ, the problem is publication, not code.

> [fr]
> Avant de diagnostiquer à nouveau, compare la version qui tourne là où je vois le problème avec
> la version qui contient ton correctif. Dis-moi les deux. Si elles diffèrent, le problème est de
> publication, pas de code.

   La moitié des « c'est toujours cassé » sont des correctifs qui sont dans le dépôt et pas à
   l'endroit où vous regardez [Ref. 45](REFERENCIAS.md#ref-45). Cette clause vous économise des
   heures.

**Vérification de complétude.** Les trois blocs sont-ils là ? Avez-vous choisi une affirmation de
« vérifié » au hasard, a-t-elle sa preuve à côté, et avez-vous pu la reproduire ? Couvre-t-il chaque
point de ce que vous avez demandé ? Les mauvaises nouvelles sont-elles au début ? A-t-il dit « c'est
fait » tout court une seule fois ?

**Livrable.** La routine dans le contrat et trois rapports consécutifs avec les trois blocs, dont
un avec un angle mort réel.

**Erreurs typiques.** Lire seulement le bloc « vérifié » et sauter les deux autres : ce sont les
deux autres qui vous protègent. Accepter « ça devrait fonctionner » dans « vérifié » : c'est du
« cru » déguisé. Et s'habituer à des rapports de plus en plus longs : un rapport gonflé couvre
quelque chose avec du volume.

**Dans le projet-guide.** Un bon rapport de clôture de PND-004 (annuler un rendez-vous) dans
Turnera : « VÉRIFIÉ : le test d'annulation passe (1/1, prouvé en rouge contre la version qui
supprimait) ; régression 6/6 ; bout en bout du flux “annuler” au vert, avec la ligne marquée dans
la base ; dans l'environnement de test, le rendez-vous 17 du 3 novembre figure annulé par
“reception1” à 10 h 42 (capture). CRU : le rapport mensuel comptera bien les annulations, mais je
ne l'ai pas testé parce que le rapport est PND-011 et n'existe pas encore. ANGLES MORTS : je ne
peux pas voir comment s'affiche l'état “annulé” sur le téléphone de la réceptionniste ; testez-le
vous-même. »

---

## Tronçon de mise en production : leçons 13 à 20

Ces huit leçons sont celles qui transforment « ça marche » en « ça se maintient », et elles se
font une fois, dans l'ordre, quand les deux premiers blocs sont construits avec la boucle et
testés par vous dans l'environnement de test, et avant que le système n'agisse sur le monde
(envoie des messages, encaisse) ou n'ait des utilisateurs réels. Dans le projet-guide, c'est le
moment d'ajouter les rappels et l'acompte, et c'est pourquoi la leçon 14 (verrous) vient avant de
construire ces fonctionnalités, pas après. Les quatre de qualité opérationnelle (16 à 19) sont
celles que je faisais sans les nommer ; si vous débutez, chacun de leurs contrats a un paragraphe
« Si vous débutez » qui explique ses mots ; lisez-le avant la leçon.

### Leçon 13 — L'audit périodique comme intrant du plan

**Ce que vous devez comprendre.** De temps en temps, il faut regarder le système entier avec des
yeux neufs, et ce que l'on voit ne va pas dans un rapport que l'on archive : ça va dans la liste
des éléments en attente. La partie importante est « yeux neufs » : celui qui audite ne doit pas
être celui qui a construit, parce qu'il partage ses présupposés. Un modèle qui a construit un
module « sait » que le mot de passe écrit dans le code était provisoire ; un modèle qui le voit pour
la première fois le rapporte pour ce qu'il est. C'est ainsi qu'on a trouvé deux portes
d'administrateur que le constructeur avait laissées en une journée
[Ref. 40](REFERENCIAS.md#ref-40). Pas besoin d'une autre entreprise : il suffit d'**une autre
session, avec un autre fichier d'instructions, qui n'a pas participé**.

**La tâche.**

**Avant d'envoyer le prompt**, de vos mains :

- Une nouvelle session de l'agent dans une copie propre du dépôt (clonez-le dans un autre
  dossier). Si votre outil le permet, donnez-lui un fichier d'instructions différent, qui dise
  seulement « tu es un auditeur ; tu n'as pas construit ce système ».
- Un accès en lecture seule, pour cette session, à l'environnement de test (base de données,
  journaux), avec des identifiants en lecture seule hors du dépôt.
- Le périmètre décidé par vous pour le trou du prompt, et l'audit précédent, s'il y en a eu.

1. Collez-lui :

> Audit this system for [integrity, security, performance and code quality]. Read-only: change
> nothing except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires
> access you lack (the database, the log, an environment), tell me and mark that part as not
> audited; do not pass it as fine. Go through all of the code, not a sample. For every finding:
> where it is (file and line), what the risk is, what evidence proves it (the command, the
> query, the number), and its priority: P0 must be fixed now, P1 soon, P2 when possible. Give a
> grade to every dimension you audited. End with the list of P0 findings turned into proposed
> pending items. Reply in my language.

> [fr]
> Audite ce système sur [intégrité, sécurité, performance et qualité du code]. Lecture seule : ne
> change rien sauf écrire ton rapport dans `docs/AUDIT_[date].md`. Si auditer une partie requiert
> un accès que tu n'as pas (la base de données, le journal, un environnement), dis-le-moi et marque
> cette partie comme non auditée ; ne la donne pas pour bonne. Parcours tout le code, pas un
> échantillon. Pour chaque constat : où il est (fichier et ligne), quel est le risque, quelle
> preuve le prouve (la commande, la requête, le chiffre), et sa priorité : P0 doit être corrigé
> tout de suite, P1 bientôt, P2 quand c'est possible. Donne une note à chaque dimension que tu as
> auditée. Termine par la liste des constats P0 convertis en éléments en attente proposés. Réponds
> dans ma langue.

   Vous lui demandez la lecture seule, qu'il déclare ce qu'il n'a pas pu auditer au lieu de
   l'approuver par omission, tout le code et pas un échantillon, chaque constat avec emplacement,
   risque, preuve et priorité, des notes par dimension, et les P0 déjà sous forme d'éléments en
   attente proposés.

2. Lisez le rapport. Choisissez deux constats et demandez à l'auditeur de vous montrer la preuve
   (la commande, la ligne). Il doit pouvoir.

**Avant d'envoyer le prompt** de clôture : le rapport lu par vous, les deux constats vérifiés avec
l'auditeur, et la session du constructeur ouverte (ce prompt va au constructeur, pas à
l'auditeur), avec la date du fichier dans le trou.

3. Revenez à la session du constructeur et collez-lui :

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.

> [fr]
> Lis `docs/AUDIT_[date].md`. Ouvre un élément en attente pour chaque P0 et P1, en citant le
> constat. Si tu n'es pas d'accord avec l'un d'eux, dis-le-moi avec la preuve contraire ; ne
> l'ignore pas.

4. Répétez cette leçon avant le premier déploiement en production (leçon 15) et, ensuite, tous
   les un ou deux mois.

**Vérification de complétude.** Le rapport dit-il ce qu'il n'a PAS pu auditer ? Deux constats au
hasard ont-ils fichier, ligne et preuve reproductible ? Chaque P0 a-t-il son élément en attente
ouvert ? Les notes pourront-elles se comparer avec le prochain audit ? Est-ce une session
différente de celle qui a construit qui a audité ?

**Livrable.** `docs/AUDIT_[date].md` et les éléments en attente P0/P1 ouverts.

**Erreurs typiques.** Auditer avec la même session qui a construit : elle confirmera ses propres
présupposés. Accepter un rapport sans aucun P0 sur un système de plus d'un mois : ce n'est presque
jamais vrai. Et archiver le rapport sans ouvrir les éléments en attente : là, l'audit n'a servi à
rien.

**Dans le projet-guide.** Le premier audit de Turnera trouve souvent : des données de patients
dans le journal (téléphones imprimés à l'envoi des messages : P0) ; la recherche de patients par
nom sans index (P1, ça se remarquera à 5 000 patients) ; le formulaire de rendez-vous sans
validation que la date est future (P1) ; et une dépendance avec une vulnérabilité connue (P1).
Quatre nouveaux éléments en attente, tous avec fichier et ligne.

### Leçon 14 — Fail-closed, verrous et zéro dommage silencieux

**Ce que vous devez comprendre.** Le logiciel, par défaut, dans le doute, continue : si la
validation échoue, le code poursuit ; si le service ne répond pas, on suppose que tout va bien.
C'est « fail-open », comme une porte qui s'ouvre quand le courant est coupé. La méthode inverse le
défaut : **dans le doute, non**. Toute action à conséquence (encaisser, envoyer, supprimer,
approuver) porte un verrou, a un chemin de retour écrit, et toute nouvelle automatisation démarre
en mode à blanc, en enregistrant ce qu'elle aurait fait, jusqu'à ce que vous l'activiez. Les
verrous que j'ai posés dans mon premier système sont le modèle [Ref. 28](REFERENCIAS.md#ref-28).

Cette leçon vient **avant** de construire les fonctionnalités qui agissent sur le monde. Dans
Turnera, avant les rappels et l'acompte, qui sont le troisième bloc.

**La tâche.**

**Avant d'envoyer le prompt**, de vos mains et avec le propriétaire :

- `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` : ce que fait ou va faire le système qui encaisse,
  envoie, approuve, supprime ou prévient quelqu'un à l'extérieur ; et pour chaque action, ce qui
  se passe si c'est fait deux fois, ce qui se passe si c'est mal fait, comment on le défait, qui
  devrait pouvoir le faire. Les processus de l'arbre sémantique vous donnent la liste de départ.
  Le prompt le nomme « the survey of consequential actions », sans chemin : dites-lui où il est.
- `docs/SEMANTIC_TREE.md`, à jour.

1. Collez-lui :

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock. Reply in my language.

> [fr]
> Nous allons décider quelles actions du système ont besoin d'un verrou. Lis le relevé des actions
> à conséquence, et parcours le code en cherchant tout ce qui encaisse, envoie, approuve, supprime
> ou prévient vers l'extérieur. Compare les deux listes : si le code a des actions que le relevé ne
> mentionne pas, ou l'inverse, demande-moi avant de continuer. Pour chaque action, propose : si
> elle est réversible, quel verrou elle reçoit (confirmation explicite, double sécurité, mode à
> blanc, limite quotidienne, un humain dans la boucle), et quel est le chemin de retour si ça
> tourne mal. Règle générale : au moindre doute ou échec en chemin, l'action N'est PAS exécutée et
> la raison est enregistrée. Présente-moi la table ; je confirme verrou par verrou. Réponds dans
> ma langue.

   Vous lui demandez de comparer ce que le métier a dit avec ce que fait le code (c'est là
   qu'apparaissent les actions dont personne ne se souvenait), que les différences, il les
   demande, et pour chaque action la réversibilité, le verrou et le chemin de retour, avec la règle
   du fail-closed écrite.

2. Confirmez verrou par verrou, avec le propriétaire.

**Avant d'envoyer le prompt** de clôture : pour chaque ligne du tableau, votre confirmation ou
votre changement, écrits pour les trous du prompt ; aucune ligne sans verdict, parce qu'un verrou
non confirmé est un verrou qui ne s'implémente pas.

3. Clôturez avec :

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.

> [fr]
> Je confirme les verrous [liste] ; change [X] en [Y]. Implémente-les avec un test par verrou qui
> prouve que, dans la condition de doute, l'action N'a PAS lieu (prouvé en rouge contre la version
> sans le verrou). Enregistre la table finale dans `docs/LOCKS.md`. Et pour toute nouvelle
> automatisation : mode à blanc d'abord, en enregistrant ce qu'elle aurait fait, jusqu'à ce que je
> l'active.

4. Ouvrez maintenant le troisième bloc (les rappels, l'acompte) avec la leçon 5, construisez-le
   avec la boucle complète des leçons 5 à 12, et laissez-le en mode à blanc. Regardez pendant
   quelques jours le journal des « j'aurais envoyé » avant d'activer l'envoi réel.

**Vérification de complétude.** Chaque action qui encaisse, envoie, approuve ou supprime est-elle
dans la table ? Chaque verrou a-t-il son test en rouge ? Toute action irréversible a-t-elle un
chemin de retour écrit ? Les nouvelles automatisations ont-elles démarré en mode à blanc, et
avez-vous vu le journal avant de les activer ?

**Livrable.** `docs/LOCKS.md`, un test par verrou prouvé en rouge, et les automatisations en mode
à blanc avec leur journal.

**Erreurs typiques.** Activer l'envoi réel « pour tester avec un message vers mon propre
téléphone » : le mode à blanc existe justement pour ça. Un verrou qui se contourne avec un
paramètre « pour les tests » : ce paramètre restera en place en production. Et ne pas regarder le
journal des « j'aurais fait » : c'est la seule fenêtre pour voir une erreur avant qu'elle n'arrive
à un patient.

**Dans le projet-guide.** La table des verrous de Turnera : envoyer un rappel (non réversible ;
verrou : idempotence par rendez-vous, un seul envoi par rendez-vous et par canal, limite de 200 par
jour, mode à blanc d'abord ; retour : aucun, d'où la limite) ; encaisser un acompte (réversible par
remboursement ; verrou : confirmation explicite de la réceptionniste, montant fixé par le
professionnel ; retour : remboursement par le prestataire de paiement) ; annuler un rendez-vous
(irréversible pour le patient ; verrou : confirmation et enregistrement de qui ; retour : recréer le
rendez-vous) ; supprimer un patient (irréversible ; verrou : double confirmation, seulement la
responsable, et seulement s'il n'a pas de rendez-vous futurs ; retour : aucun, d'où le double).
Chaque verrou avec un test qui montre que, sans le verrou, l'action avait lieu.

### Leçon 15 — Intégration continue, environnements, secrets et déploiement comme partie du produit

**Ce que vous devez comprendre.** Arriver en production doit être un paquet reproductible : les
tests tournent **une** fois, le déploiement ne fait qu'empaqueter et téléverser, la configuration
vit sur le serveur et pas dans le dépôt, il y a une procédure pour promouvoir de test vers
production qui peut se lancer deux fois, et le retour arrière est **testé** (un retour arrière
jamais testé n'existe pas). À moi, les tests lancés trois fois par commit m'ont brûlé le quota
d'intégration continue [Ref. 39](REFERENCIAS.md#ref-39). Sur les secrets, une règle sans
exceptions : **un secret qui a été vu dans un chat, dans un journal ou dans un commit n'est plus un
secret** ; on le fait tourner, point [Ref. 42](REFERENCIAS.md#ref-42).

Vous avez déjà une bonne partie de tout cela depuis le squelette (leçon 4) : l'intégration
continue et le déploiement vers test. Cette leçon le complète vers la production.

**La tâche.**

**Avant d'envoyer le prompt**, de vos mains :

- `docs/ENVIRONMENTS_SURVEY.md` (leçon 4), complété avec ce qui manque pour la production : le
  domaine et qui l'administre, où vont vivre les secrets et quels ils sont (le nom, jamais la
  valeur), qui peut toucher à la production, comment se ferait aujourd'hui un retour arrière, et
  combien de quota d'intégration continue vous avez (si vous utilisez GitHub Actions, regardez la
  limite du plan). Le prompt le nomme « the environments and access survey » : dites-lui où il
  est.
- L'accès à la production pour l'agent, décidé par vous, avec l'identifiant hors du dépôt et du
  chat.
- Le squelette avec son intégration continue et son déploiement vers le test qui fonctionnent
  (leçon 4).

1. Collez-lui :

> We are going to close the path to production. Read the environments and access survey.
> Evaluate whether you have what is needed to deploy to production safely (access, domain,
> where the secrets live, how to roll back); if anything is missing, ask me. Then set up: (1)
> continuous integration runs the full test suite exactly once per commit; (2) the deployment
> waits for that run's result and only packages and uploads, without running tests again; (3)
> each environment's configuration lives on the server (environment file or vault), never in the
> repository; (4) a written procedure to promote from the test environment to production, which
> can be run twice without breaking anything; (5) the rollback, tested; (6) an automatic check
> that prevents committing a secret. Document all of it in `docs/DEPLOYMENT.md` so that a person
> can do it by hand without you. Reply in my language.

> [fr]
> Nous allons fermer le chemin vers la production. Lis le relevé des environnements et des accès.
> Évalue si tu as ce qu'il faut pour déployer en production en sécurité (accès, domaine, où vivent
> les secrets, comment revenir en arrière) ; s'il manque quelque chose, demande-le-moi. Ensuite,
> mets en place : (1) l'intégration continue lance la batterie complète exactement une fois par
> commit ; (2) le déploiement attend le résultat de cette exécution et ne fait qu'empaqueter et
> téléverser, sans relancer les tests ; (3) la configuration de chaque environnement vit sur le
> serveur (fichier d'environnement ou coffre), jamais dans le dépôt ; (4) une procédure écrite pour
> promouvoir de l'environnement de test vers la production, qui peut se lancer deux fois sans rien
> casser ; (5) le retour arrière, testé ; (6) une vérification automatique qui empêche de committer
> un secret. Documente tout cela dans `docs/DEPLOYMENT.md` de façon qu'une personne puisse le
> faire à la main sans toi. Réponds dans ma langue.

   Vous lui demandez les accès avant de commencer, les tests une seule fois par commit, le
   déploiement qui ne fait qu'empaqueter, la configuration dehors, la promotion répétable, le
   retour arrière testé, le verrou contre les secrets, et la documentation pour une personne.

2. Avant le premier déploiement en production, faites l'audit de la leçon 13 si vous ne l'avez
   pas fait, et lancez la batterie complète de bout en bout de tous les flux avec la version exacte
   que vous allez promouvoir (le prompt de clôture de bloc de la leçon 8).

**Avant d'envoyer le prompt** de la routine : `docs/DEPLOYMENT.md` écrit et lu par vous
(pourriez-vous le suivre tout seul ?), et `docs/WORKING_AGREEMENT.md`.

3. Ajoutez au contrat la routine de déploiement :

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before touching production: the test
> environment is green with the same version; the rollback is ready; and tell me what changes in
> the configuration. After deploying: show me the version running in production and an
> end-to-end check on production, read-only."

> [fr]
> Ajoute cette routine à `docs/WORKING_AGREEMENT.md` : « Avant de toucher la production :
> l'environnement de test est au vert avec la même version ; le retour arrière est prêt ; et
> dis-moi ce qui change dans la configuration. Après le déploiement : montre-moi la version qui
> tourne en production et une vérification de bout en bout sur la production, en lecture seule. »

4. Faites le premier déploiement en production, avec le système encore sans utilisateurs réels.
   Et ensuite **testez le retour arrière** : demandez-lui de revenir à la version précédente et de
   vous montrer qu'elle tourne, puis de revenir à la nouvelle.
5. Si à un moment du cours vous avez collé un secret dans le chat (une clé d'API, un mot de
   passe), faites-le tourner.

**Avant d'envoyer le prompt** : le secret identifié (son nom, jamais sa valeur), où il est apparu
et quand, et votre accès au panneau où il se génère, au cas où l'agent ne pourrait pas le
remplacer tout seul. Ce prompt ne s'envoie pas « plus tard ».

6. Collez-lui :

> That secret is compromised: rotate it now, tell me everywhere else it was used, and add the
> check that would have caught it.

> [fr]
> Ce secret est compromis : fais-le tourner maintenant, dis-moi partout ailleurs où il a été
> utilisé, et ajoute la vérification qui l'aurait attrapé.

**Vérification de complétude.** Combien de fois la batterie tourne-t-elle par commit ? (une ;
demandez le lien). Y a-t-il une vraie valeur de configuration dans le dépôt ? (demandez-lui la
recherche vide). Pourriez-vous suivre `docs/DEPLOYMENT.md` tout seul ? Le retour arrière a-t-il
été testé, quand, avec quelle preuve ? Tout secret apparu dans le chat a-t-il été tourné ?
Savez-vous combien de quota d'intégration continue il vous reste ?

**Livrable.** L'intégration continue une fois par commit, le déploiement qui ne fait
qu'empaqueter, `docs/DEPLOYMENT.md`, le retour arrière testé, le verrou anti-secrets actif, et le
système qui tourne en production (sans utilisateurs encore).

**Erreurs typiques.** Le déploiement « à la main, vite, parce que c'est un petit changement » :
les petits changements cassent la production parce que personne ne les teste. Le fichier d'exemple
de configuration avec des valeurs qui ont l'air réelles (elles le sont). Et ne pas tester le retour
arrière jusqu'au jour où vous en avez besoin.

**Dans le projet-guide.** Pour Turnera, l'intégration continue lance la batterie (une trentaine
de tests à ce stade, y compris les six flux de bout en bout) à chaque push ; le déploiement vers
test est automatique à la fusion dans `main` ; la promotion en production est une commande qui
empaquette la version qui est en test et la téléverse, avec la configuration (la clé du
prestataire de messages, celle du prestataire de paiement, l'URL de la base) dans un fichier
d'environnement sur le serveur qui n'est pas dans le dépôt. Le retour arrière est la même commande
avec la version précédente. Et le verrou anti-secrets est une vérification à chaque commit qui
rejette tout ce qui ressemble à une clé.

### Leçon 16 — Observabilité et traçabilité, avec un niveau configurable

**Ce que vous devez comprendre.** Quand quelque chose cassera en production, vous voudrez savoir
ce qui s'est passé sans ouvrir le code et sans que l'agent « vérifie » : chercher un numéro et
voir apparaître l'histoire complète de cette action, de l'écran à la base. C'est cela, un
*journal structuré* avec un *identifiant de corrélation*. Et vous voudrez monter le détail de ce
que le système écrit, une minute, pendant que vous enquêtez, sans redéployer : c'est le *niveau
configurable*. La *traçabilité* est l'autre moitié : toute action à conséquence (a facturé, a
envoyé, a effacé) reste dans une liste que l'application ne peut pas modifier, avec qui, quand et
quoi. Sans cela, l'agent résident de la leçon 23 travaille en aveugle et les supervisions des
leçons 21 et 22 n'ont rien à regarder [Ref. 16](REFERENCIAS.md#ref-16).

**Avant d'envoyer le prompt**, de vos mains et avec le propriétaire :

- `docs/DEPLOYMENT.md` (leçon 15), avec la façon dont se lit la configuration par environnement :
  le niveau va être une variable de plus.
- `docs/LOCKS.md` (leçon 14) : la liste des actions qui doivent rester dans l'audit.
- Dans `docs/INITIAL_SURVEY.md`, la liste des données qui sont personnelles (dans Turnera : nom,
  téléphone, courriel et pièce d'identité du patient), écrite avec la responsable. Les journaux
  doivent les masquer ; c'est une obligation légale.
- Votre décision sur l'endroit où vivent les journaux et combien de temps on les conserve. Pour le
  cours : un fichier roulé sur le serveur, quatre-vingt-dix jours.

1. Collez-lui le prompt initial du contrat de l'échelon 16 (dans `docs/peldanos/`), tel quel.
2. Quand il vous montre l'identifiant d'une requête réelle, cherchez-le vous-même dans les
   journaux de l'environnement de test : il doit apparaître dans l'écran, dans le backend, dans la
   base et dans l'appel au prestataire de messages.
3. Montez le niveau à débogage vous-même, faites une action, regardez, redescendez-le. Si vous
   avez dû déployer, l'échelon n'est pas gravi.
4. Cherchez « Jean » (ou n'importe quel nom de test) dans les journaux : il ne doit pas y être.

**Avant d'envoyer le prompt** de la routine : `docs/OBSERVABILITY.md` lu par vous, et le niveau
monté et redescendu par vous une fois.

5. Ajoutez au contrat la routine de l'échelon 16 (dans le contrat, « Routine »), enveloppée dans
   « Add this routine to `docs/WORKING_AGREEMENT.md`: » comme les autres.

**Vérification de complétude.** Avez-vous suivi vous-même un identifiant à travers toutes les
couches ? Avez-vous changé le niveau sans déployer ? Y a-t-il une donnée personnelle dans les
journaux ? L'annulation d'un rendez-vous en test est-elle restée dans l'audit avec qui et quand ?
`docs/OBSERVABILITY.md` vous suffit-il pour trouver un enregistrement tout seul ?

**Livrable.** Des journaux structurés avec niveau configurable, l'identifiant propagé, l'audit des
actions à conséquence, `docs/OBSERVABILITY.md`, et la routine dans le contrat.

**Erreurs typiques.** Accepter des « logs » que chaque module écrit différemment. Laisser la
production en débogage « pour l'instant ». Et que l'identifiant n'arrive pas jusqu'à la tâche
nocturne de rappels, qui est justement là où les incidents se perdent.

**Dans le projet-guide.** L'identifiant d'« annuler le rendez-vous 17 » apparaît dans le clic, sur
le serveur, dans la ligne marquée dans la base et dans le courriel au praticien. L'audit dit
« reception1 a annulé le rendez-vous 17 à 10:42 depuis l'agenda du jour ; résultat : ok ». La
responsable monte le niveau à trace pour voir pourquoi un rappel a tardé, elle le trouve, et elle
le redescend.

### Leçon 17 — Optimisation de la couche de persistance, mesurée avant et après

**Ce que vous devez comprendre.** La base de données est l'endroit où les systèmes meurent
lentement : bien avec cent rendez-vous, mal avec cent mille. Un *index* est comme celui d'un
livre : sans lui, la base lit la table entière pour trouver un rendez-vous. Une *boucle N+1*,
c'est faire cent requêtes pour afficher cent rendez-vous au lieu d'une. Cette leçon applique la
leçon 9 à la base : mesurer chaque requête avec un compteur qui a un test, changer ce que les
chiffres disent, remesurer sur les mêmes données, et laisser un budget avec son test pour que cela
ne revienne pas [Ref. 18](REFERENCIAS.md#ref-18), [Ref. 37](REFERENCIAS.md#ref-37). Ce n'est pas
réécrire la base ni changer de moteur : cela, c'était la leçon 3.

**Avant d'envoyer le prompt**, de vos mains :

- `docs/SIZING.md` et `docs/VOLUME_SURVEY.md` (leçon 3) : les volumes à charger.
- L'environnement de test avec des données **au volume attendu** : pour Turnera, dix mille
  rendez-vous et trente mille messages sur un an, générés par un script que l'agent laisse dans le
  dépôt (demandez-le comme élément en attente préalable, avec la forme de l'arbre sémantique).
- `docs/PRODUCER_CONSUMER_MAP.md` (leçon 11), à jour.
- Un cas connu pour le test du compteur : la table des praticiens a trois lignes.

1. Collez-lui le prompt initial du contrat de l'échelon 17.
2. Lisez la liste des changements proposés comme la responsable lirait une liste de réparations du
   cabinet : comprenez-vous ce que chacun gagne et quel risque il porte ? Approuvez ou refusez un
   par un. Refaites un calcul à la main (lignes par mois de la table des rendez-vous).

**Avant d'envoyer le prompt** de clôture : la liste avec votre verdict par changement et le calcul
refait qui coïncide.

3. Collez-lui le prompt de clôture du contrat de l'échelon 17, avec la liste approuvée.
4. Lancez vous-même un compteur avant et après, avec les deux commandes qu'il vous a données.

**Vérification de complétude.** Vos passes coïncident-elles avec la table de
`docs/PERSISTENCE.md` ? Reste-t-il une requête qui lise une table entière dans un flux critique ?
Chaque table a-t-elle une rétention écrite ? Les budgets ont-ils un test (demandez-lui d'en
dépasser un et de vous montrer le rouge) ?

**Livrable.** Les compteurs avec test, `docs/PERSISTENCE.md` avec l'avant et l'après, les budgets
avec test, et la batterie au vert.

**Erreurs typiques.** Mesurer avec les dix enregistrements du squelette. Accepter « mieux vaut
migrer vers une autre base ». Et améliorer un chiffre en cassant le tableau mensuel qui lisait
cette table : il a manqué la carte.

**Dans le projet-guide.** L'agenda du jour faisait une requête par rendez-vous (la boucle de la
leçon 7) : 52 requêtes pour 50 rendez-vous passent à 3. La recherche de patients par nom lisait la
table entière : un index la fait passer de 800 millisecondes à 4 avec dix mille patients.
Rétention : les messages s'archivent au bout d'un an ; les rendez-vous, jamais. Budget : 4
requêtes pour l'agenda, avec test.

### Leçon 18 — Scan et résolution des vulnérabilités

**Ce que vous devez comprendre.** Une *vulnérabilité* est un défaut que quelqu'un peut utiliser
pour entrer, voler des données ou faire que le système fasse ce qu'il ne doit pas. L'audit (leçon
13) les cherche avec discernement, de temps en temps ; cette leçon les cherche par machine, tout
le temps, en quatre couches : les *dépendances* (morceaux d'autres gens que votre système utilise,
avec leurs défauts connus publiés), le code (*analyse statique*), les secrets dans l'historique du
dépôt, et la configuration du serveur. Et une règle : mettre à jour une dépendance est un
changement, et cela passe par la boucle ; « j'ai monté la version pour fermer le constat » sans
régression est la façon la plus courante de casser la production un vendredi
[Ref. 41](REFERENCIAS.md#ref-41), [Ref. 23](REFERENCIAS.md#ref-23).

**Avant d'envoyer le prompt**, de vos mains :

- L'intégration continue qui tourne (leçons 4 et 15), et combien de quota il vous reste : le scan
  ajoute des minutes.
- `docs/ENVIRONMENTS_SURVEY.md` avec le serveur, les ports et qui administre le domaine.
- `docs/AUDIT_[date].md` (leçon 13), pour qu'il ne répète pas ce qui est connu.
- Votre critère de P0, en deux lignes : pour Turnera, ce qui laisse entrer sans identifiant, ce
  qui expose des données de patients, ce qui permet d'envoyer des messages ou de facturer sans
  contrôle.

1. Collez-lui le prompt initial du contrat de l'échelon 18, avec votre critère dans le trou.
2. Lisez `docs/SECURITY_[date].md`. Choisissez deux constats et demandez-lui la preuve. Dit-il ce
   qu'il n'a PAS scanné ?

**Avant d'envoyer le prompt** de clôture : la liste des corrections approuvées ; pour chaque mise
à jour de dépendance, la conscience que la régression et le bout en bout vont tourner.

3. Collez-lui le prompt de clôture du contrat de l'échelon 18.
4. Demandez-lui d'introduire exprès, dans une branche, une dépendance avec une vulnérabilité
   connue : la chaîne doit passer au rouge.

**Vérification de complétude.** La dernière passe du scan est-elle au vert et de quelle date ?
Chaque P0 a-t-il son élément en attente clos avec sa preuve ? Le scan est-il une porte dans
`docs/GATES.md` ? Savez-vous quand tourne le prochain scan programmé ?

**Livrable.** Le scan en quatre couches dans la chaîne et avec un calendrier,
`docs/SECURITY_[date].md`, `docs/SECURITY.md`, les P0 et P1 corrigés, la porte.

**Erreurs typiques.** Un scan « propre du premier coup » sur un système de plus d'un mois : il a
manqué une couche. Dix dépendances mises à jour dans un commit. Un P0 « accepté » sans élément en
attente ni date.

**Dans le projet-guide.** Le scan de Turnera trouve : une dépendance du générateur de PDF avec une
vulnérabilité connue (P1, on la met à jour avec régression et bout en bout) ; l'en-tête qui
empêche d'incruster l'agenda dans un autre site, absent (P1, une ligne de configuration, avec
test) ; une clé de test du prestataire de paiements dans l'historique du dépôt (P0 : on la fait
tourner, même si c'est une clé de test) ; et un port de la base ouvert au monde sur le serveur de
test (P0 : on le ferme). Le scan reste comme porte et tourne les lundis.

### Leçon 19 — Tests de performance en volume et point de rupture

**Ce que vous devez comprendre.** La leçon 3 a dimensionné avec des calculs ; celle-ci les vérifie
avec le système qui tourne. Un *test de charge* simule beaucoup d'utilisateurs à la fois. On
regarde le *débit* (actions par seconde), la *latence* (le temps que met chaque action ; la
médiane et le *centile 95*, qui est ce que voient ceux qui se plaignent) et le taux d'erreur, au
volume attendu et au « fois dix ». Et ensuite on monte la charge jusqu'à ce que quelque chose
casse : le *point de rupture* n'est pas « ça devient lent » mais « les connexions à la base se
sont épuisées à 180 utilisatrices ». Ce chiffre est le plus utile du tronçon, parce que c'est de
lui que sortent les *seuils* d'alerte de la leçon 21 [Ref. 12](REFERENCIAS.md#ref-12),
[Ref. 44](REFERENCIAS.md#ref-44).

**Avant d'envoyer le prompt**, de vos mains et avec le propriétaire :

- `docs/SIZING.md` avec le volume attendu et le « fois dix » : pour Turnera, deux utilisatrices au
  pic et quarante rendez-vous par jour ; fois dix, vingt utilisatrices et quatre cents
  rendez-vous.
- Les flux critiques pour le trou du prompt : enregistrer un rendez-vous, voir l'agenda du jour,
  chercher un patient, l'envoi nocturne des rappels.
- La tolérance de la responsable pour l'écran le plus utilisé (l'agenda du jour) : « si ça met
  plus de deux secondes, les filles se plaignent ».
- L'environnement de test avec les données au volume (leçon 17) et, s'il diffère de la production
  en ressources, noté comment dans `docs/ENVIRONMENTS_SURVEY.md`.
- L'observabilité de la leçon 16 allumée.

1. Collez-lui le prompt initial du contrat de l'échelon 19, avec les flux et la tolérance dans les
   trous.
2. Lisez `docs/PERFORMANCE_[date].md` avec la tolérance à côté : l'agenda du jour entre-t-il en
   deux secondes au volume attendu ? Et au fois dix ? Qu'est-ce qui a cassé en premier et à quelle
   charge ?
3. Décidez avec la responsable jusqu'à quel volume les goulots d'étranglement se corrigent
   maintenant : s'ils pensent le vendre à d'autres cabinets, le « fois dix » c'est maintenant ;
   sinon, avec une date.

**Avant d'envoyer le prompt** de clôture : le rapport lu, la décision sur le « fois dix ».

4. Collez-lui le prompt de clôture du contrat de l'échelon 19.
5. Lancez vous-même le script au volume attendu avec la commande qu'il vous a donnée : les
   chiffres doivent se ressembler.

**Vérification de complétude.** L'écran le plus utilisé entre-t-il dans la tolérance, ou y a-t-il
un élément en attente avec le chiffre ? Le point de rupture dit-il ce qui a cassé et à quelle
charge ? Les seuils de `docs/PERFORMANCE.md` sont-ils sous le point de rupture et au-dessus de
l'attendu ? Le test est-il une porte et la première passe est-elle archivée ?

**Livrable.** Le script de charge avec test, `docs/PERFORMANCE_[date].md`,
`docs/PERFORMANCE.md` avec seuils et porte, et un élément en attente par goulot d'étranglement.

**Erreurs typiques.** « Il tient le fois dix sans problème » sans point de rupture : il n'a pas
monté la charge assez haut. Un script qui tape sur l'API et pas sur l'écran. Corriger des goulots
d'étranglement pendant le test, « tant qu'on y était ».

**Dans le projet-guide.** Au volume attendu, l'agenda répond en 300 millisecondes ; au fois dix,
en 1,4 seconde ; l'envoi nocturne de 400 rappels met 50 secondes. Le point de rupture : à 180
utilisatrices simultanées, le pool de connexions (10) s'épuise et les actions commencent à
échouer. Seuils : alerte si l'agenda dépasse 1,5 seconde ou si les connexions en usage dépassent
7. Élément en attente : l'envoi nocturne par lots de 50, parce que la responsable veut bel et bien
le vendre.

### Leçon 20 — Documentation vivante et manuels qu'une personne peut suivre sans IA

**Ce que vous devez comprendre.** Le système doit pouvoir s'utiliser, se maintenir et se rétablir
sans l'agent et sans vous. Le critère pour le manuel de reprise est concret : **une personne de
confiance qui ne programme pas doit pouvoir le suivre, à trois heures du matin, avec le système à
terre et l'agent hors ligne**. Si une étape dit « consulter le développeur », elle est incomplète.
Et comme régénérer la documentation avec un modèle est gratuit, la règle devient « dans le même
commit » : chaque changement qui touche ce que l'utilisateur voit, ce que l'opérateur fait ou la
façon dont on déploie met à jour le manuel dans le même commit. Les manuels que j'ai écrits pour
mon premier système avec ce critère sont le modèle [Ref. 24](REFERENCIAS.md#ref-24).

Et une source que vous avez déjà : les éléments en attente clos. Si vous avez documenté chaque
clôture comme le demande la leçon 5, le manuel utilisateur ne s'écrit pas de zéro : il s'assemble à
partir des éléments en attente qui ont été clos, bloc par bloc, et le journal des modifications en
sort directement.

**La tâche.**

**Avant d'envoyer le prompt**, de vos mains :

- `docs/WORKING_AGREEMENT.md`, où va la routine.
- La liste des manuels qu'aura le système, chacun avec son lecteur (l'utilisateur final, celui qui
  maintient, celui qui exploite l'infrastructure), écrite dans `PROJECT.md` ou dite dans le chat.

1. Ajoutez la routine au contrat :

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Every change that modifies what the user
> sees, what the operator does, or how the system is deployed, updates the corresponding manual
> in the same commit. At the close of every functional block, add to the user manual the screens
> and flows of the pending items closed in that block, with real screenshots from the test
> environment, and add their entries to the changelog. If you do not know which manual, ask."

> [fr]
> Ajoute cette routine à `docs/WORKING_AGREEMENT.md` : « Tout changement qui modifie ce que
> l'utilisateur voit, ce que l'opérateur fait, ou la façon dont le système se déploie, met à jour
> le manuel correspondant dans le même commit. À la clôture de chaque bloc fonctionnel, ajoute au
> manuel utilisateur les écrans et les flux des éléments en attente clos dans ce bloc, avec des
> captures réelles de l'environnement de test, et ajoute leurs entrées au journal des
> modifications. Si tu ne sais pas dans quel manuel ça va, demande. »

**Avant d'envoyer le prompt** des manuels : le système qui tourne dans l'environnement de test
avec des données réalistes (les captures sortent de là), les éléments en attente clos avec leur
documentation (leçon 5), `docs/DEPLOYMENT.md` et `docs/LOCKS.md` à jour, et ce que seul le métier
sait, préparé pour quand il posera la question : qui est responsable de quoi, à quel téléphone on
appelle à trois heures du matin, qui fait la copie de sauvegarde.

2. Collez-lui :

> Generate three manuals from the system as it is today in the test environment: the user
> manual (screen by screen, with real screenshots, in the user's language, no jargon); the
> maintenance manual (how it is built, where everything is, how to run the test suite, how to
> add a module); and the infrastructure and recovery manual (how to deploy, how to roll back,
> how to restore a backup, what to do if it goes down; written for a person who has to do it by
> hand, without AI, at three in the morning). If for any section you need something only the
> business knows (who is responsible for what, which phone number to call), ask me; do not leave
> a gap and do not invent. Each manual carries a date and the system version. Reply in my
> language.

> [fr]
> Génère trois manuels à partir du système tel qu'il est aujourd'hui dans l'environnement de
> test : le manuel utilisateur (écran par écran, avec des captures réelles, dans la langue de
> l'utilisateur, sans jargon) ; le manuel de maintenance (comment il est construit, où se trouve
> chaque chose, comment lancer la batterie, comment ajouter un module) ; et le manuel
> d'infrastructure et de reprise (comment déployer, comment revenir en arrière, comment restaurer
> une sauvegarde, que faire s'il tombe ; écrit pour une personne qui doit le faire à la main, sans
> IA, à trois heures du matin). Si pour une section tu as besoin de quelque chose que seul le
> métier sait (qui est responsable de quoi, quel numéro de téléphone appeler), demande-le-moi ; ne
> laisse pas de trou et n'invente pas. Chaque manuel porte une date et la version du système.
> Réponds dans ma langue.

   Vous lui demandez les trois manuels avec des captures réelles, le critère des trois heures du
   matin pour celui de reprise, qu'il demande ce que seul le métier sait au lieu de laisser des
   trous, et date et version.

3. Le vrai test : donnez le manuel de reprise à quelqu'un qui ne programme pas (le propriétaire,
   un proche) et demandez-lui de suivre la section « il est tombé » dans l'environnement de test.
   Là où il bloque, il faut corriger le manuel.
4. Après le prochain changement d'écran, vérifiez que le commit a touché le manuel utilisateur.
5. Et maintenant les **tests d'acceptation** : le propriétaire utilise le système entier dans
   l'environnement de test, avec des données réalistes, en suivant les six flux, avant qu'entre le
   premier utilisateur réel. Ce qu'il trouve, ce sont des éléments en attente ; une fois ceux-ci
   clos, le système est accepté.

**Vérification de complétude.** Une capture au hasard coïncide-t-elle avec l'environnement de test
d'aujourd'hui ? Quelqu'un qui ne programme pas a-t-il pu suivre la section « il est tombé » ? Le
dernier commit qui a changé un écran a-t-il touché le manuel ? Le journal des modifications a-t-il
une entrée pour chaque élément en attente clos ? Y a-t-il des trous du type « [à compléter] » ?
Chaque manuel dit-il pour quelle version il vaut ? Le propriétaire a-t-il fait les tests
d'acceptation sur tous les flux ?

**Livrable.** Les trois manuels avec date et version, le test avec une personne fait, et les tests
d'acceptation clos.

**Erreurs typiques.** Générer les manuels une fois et ne pas mettre la routine dans le contrat :
au bout de deux mois, ils ont des captures d'écrans qui n'existent plus. Un manuel de reprise qui
commence par « ouvrez une session avec l'agent ». Et ne pas faire le test avec une personne : c'est
la seule vérification qui vaille.

**Dans le projet-guide.** Le manuel utilisateur de Turnera a six écrans avec capture, assemblés à
partir des éléments en attente clos des trois blocs ; celui de maintenance explique où se trouve
chaque module et comment lancer la batterie ; et celui de reprise dit, dans l'ordre, avec les
commandes : comment savoir si le système est tombé, comment le redémarrer, comment revenir à la
version précédente, comment restaurer la base depuis la dernière sauvegarde (qui se fait toutes
les nuits : cela aussi sort de cette leçon), et qui appeler. La responsable l'a suivi dans
l'environnement de test et a bloqué sur « restaurer la base » parce que la commande supposait un
dossier qu'elle n'avait pas ; on a corrigé le manuel.

## Tronçon d'exploitation : leçons 21 à 23

Ces trois leçons commencent avec le premier déploiement en production et ne finissent pas : les
deux supervisions se montent avec lui et tournent seules à partir de là, et la rétrospective clot
chaque étape et revient au 0 pour la suivante.

### Leçon 21 — Supervision des ressources et de la performance, avec rapport cyclique

**Ce que vous devez comprendre.** La leçon 19 dit comment se comporte le système un jour ; la
production, c'est tous les jours, avec les données qui grandissent. *Superviser*, c'est regarder
par machine, tout le temps, l'usage des *ressources* (processeur, mémoire, disque, connexions,
quota du prestataire de messages) et le temps de réponse de chaque fonction et de chaque requête,
et prévenir quand quelque chose sort de la plage : au-dessus d'un *seuil* (ceux de la leçon 19) ou
très différent de la *ligne de base* (ce que cela donnait). Une *alerte* prévient sur le moment ;
le *rapport cyclique* se lit au calme chaque semaine ou chaque mois. Deux règles : une alerte que
personne ne lit est un défaut de l'alerte ; et on ne monte pas un seuil pour faire taire une
alerte sans une raison mesurée écrite [Ref. 37](REFERENCIAS.md#ref-37),
[Ref. 39](REFERENCIAS.md#ref-39).

**Avant d'envoyer le prompt**, de vos mains et avec le propriétaire :

- `docs/OBSERVABILITY.md` (16), `docs/PERSISTENCE.md` (17) et `docs/PERFORMANCE.md` (19) clos.
- Le canal d'alertes décidé avec la responsable : à qui cela arrive et par où. Pour le cours : à
  votre courriel et à votre messagerie.
- Le cycle : mensuel pour Turnera ; hebdomadaire s'il y avait de l'argent en jeu tous les jours.
- L'écart que vous considérez comme une alarme : 30 % au-dessus de la moyenne des quatorze
  derniers jours.
- L'accès en lecture seule de la supervision à la production, avec l'identifiant hors du chat.

1. Collez-lui le prompt initial du contrat de l'échelon 21, avec le canal, le cycle et l'écart
   dans les trous.
2. Demandez-lui de dépasser un seuil exprès en test : l'alerte doit vous arriver par le canal.
3. Lisez le premier rapport : chaque événement hors plage doit avoir une cause ou une proposition.

**Avant d'envoyer le prompt** de la routine : le premier rapport lu par vous.

4. Ajoutez au contrat la routine de l'échelon 21, enveloppée dans « Add this routine to
   `docs/WORKING_AGREEMENT.md`: ».

**Vérification de complétude.** L'alerte provoquée vous est-elle arrivée ? Le rapport a-t-il
chaque écart avec sa cause ou sa proposition ? Y a-t-il un élément en attente pour chaque écart
que vous avez décidé de traiter, avec le chiffre comme critère ? Un seuil a-t-il monté depuis la
leçon 19, et avec quelle raison ? Le rapport regarde-t-il le quota du prestataire de messages ?

**Livrable.** Une collecte avec historique, les alertes, le rapport cyclique,
`docs/MONITORING.md`, la routine dans le contrat.

**Erreurs typiques.** Des alertes tous les jours que personne ne lit. Trois rapports d'affilée qui
disent « tout est normal ». Un seuil monté « pour qu'il arrête de prévenir ». Des données
personnelles enregistrées « pour diagnostiquer ».

**Dans le projet-guide.** Le premier rapport mensuel de Turnera dit : disque à 40 %, mémoire
stable, l'agenda du jour à 320 millisecondes de médiane (ligne de base), la recherche de patients
est passée de 4 à 9 millisecondes (la table grandit ; dans la plage), et le quota de messages à
60 % (proposition : prévenir à 80 %). Un écart : le rapport mensuel de la responsable a mis 11
secondes le jour 1 (proposition : le précalculer la nuit ; élément en attente).

### Leçon 22 — Supervision des erreurs et rapport cyclique

**Ce que vous devez comprendre.** Un système en production produit des erreurs que personne ne
signale : la réceptionniste qui a vu l'écran blanc et a réessayé, la tâche nocturne qui s'est
coupée. Cette leçon les *capture* dans les trois endroits où elles se cachent (le backend, les
tâches et le navigateur), les *regroupe* (mille fois la même erreur font une entrée avec un
compteur), prévient de celles qui sont nouvelles et de celles qui croissent, et produit un rapport
avec le *taux d'erreur par flux* (sur cent rendez-vous enregistrés, combien ont échoué). Deux
règles : aucune erreur sans élément en attente, et l'« erreur connue » n'existe pas sans un
élément en attente qui dise pourquoi on la tolère et jusqu'à quand
[Ref. 43](REFERENCIAS.md#ref-43), [Ref. 22](REFERENCIAS.md#ref-22).

**Avant d'envoyer le prompt**, de vos mains :

- `docs/OBSERVABILITY.md` (16) : les erreurs sortent déjà avec l'identifiant, la version et
  l'acteur.
- `docs/LOCKS.md` (14) : les erreurs dans les actions à conséquence sont une alerte immédiate.
- Le canal et le cycle de la leçon 21, et le nombre d'occurrences par heure d'une erreur connue à
  partir duquel vous voulez une alerte : pour Turnera, dix.
- Où les erreurs sont conservées et pendant combien de temps, sans données personnelles.

1. Collez-lui le prompt initial du contrat de l'échelon 22, avec le canal, le cycle et le nombre
   dans les trous.
2. Provoquez vous-même une erreur dans le navigateur, en test (une date impossible dans le
   formulaire de rendez-vous, par exemple) : elle doit apparaître dans la capture avec votre
   identifiant, et l'alerte doit vous arriver si elle est nouvelle.

**Avant d'envoyer le prompt** de la routine : le premier rapport d'erreurs lu par vous, et
`docs/PENDING.md` sous la main.

3. Ajoutez au contrat la routine de l'échelon 22, enveloppée comme les autres.
4. Avec le premier rapport : ouvrez les éléments en attente correctifs des erreurs nouvelles,
   chacun avec sa reproduction, et clôturez-les avec la routine de la leçon 8 (le test qui la
   reproduit en rouge).

**Vérification de complétude.** Votre erreur provoquée est-elle arrivée à la capture, à l'alerte
et au rapport ? Y a-t-il une erreur récurrente sans élément en attente ni raison datée ? Une
erreur « corrigée » du rapport a-t-elle le test en rouge dans son élément en attente ? Le taux
d'erreur par flux est-il là, et comparé à la période précédente ? Y a-t-il des données
personnelles dans la capture ?

**Livrable.** La capture centralisée et regroupée, les alertes, le rapport cyclique avec le taux
par flux, `docs/MONITORING.md` complet, la routine dans le contrat, et un élément en attente par
erreur.

**Erreurs typiques.** « Zéro erreur en un mois » avec de vrais utilisateurs : la capture ne voit
pas le navigateur ou les tâches. Une erreur avec mille occurrences et le commentaire « connue,
sans incidence ». Des erreurs qui se « corrigent » en redémarrant. Et lire le rapport d'erreurs
sans le croiser avec celui des ressources : la requête lente de l'un est le délai d'attente
dépassé de l'autre.

**Dans le projet-guide.** Le premier rapport de Turnera a trois erreurs : une dans le navigateur
(l'agenda échoue si le nom du praticien a une apostrophe ; 14 fois ; élément en attente, test en
rouge), une dans la tâche nocturne (le prestataire de messages a renvoyé une erreur une nuit ; 1
fois ; élément en attente pour réessayer avec journalisation), et une « connue » du neveu dans le
tableau mensuel (élément en attente avec date : il se remplace par le rapport de la leçon R2 de la
partie 2). Taux d'erreur : 0,3 % dans « enregistrer un rendez-vous », 0 % dans les autres.

### Leçon 23 — L'agent dans le système, et la rétrospective chiffrée

**Ce que vous devez comprendre.** Deux choses ferment le cycle. La première est optionnelle :
laisser l'agent résident en production, avec une portée bornée, pour diagnostiquer et assurer le
support sans que vous soyez là [Ref. 13](REFERENCIAS.md#ref-13). La règle qui ordonne tout est
qu'il **agit au nom de quelqu'un** : son identifiant est rattaché à une personne responsable, et
tout ce qu'il fait est enregistré au nom de cette personne ; ce n'est pas un compte anonyme, c'est
un employé avec un chef. La seconde est obligatoire : la rétrospective chiffrée. Ce que ça a coûté,
combien d'éléments en attente, lesquels ont tourné en rond, quels incidents il y a eu et dans quel
échelon ils tombent, et **au moins un changement proposé à l'échelle**. Une rétrospective qui ne
change rien n'a pas été une rétrospective ; celle qui m'a conduit à supprimer une équipe entière
d'agents est le modèle [Ref. 6](REFERENCIAS.md#ref-6).

**La tâche (agent résident, le cas échéant).**

**Avant d'envoyer le prompt**, de vos mains et avec le propriétaire :

- La décision de savoir si le système a besoin d'un agent résident, et pour quoi. Dans Turnera,
  oui : les réceptionnistes auront des questions (« pourquoi le rappel n'est-il pas arrivé à ce
  patient ? ») auxquelles l'agent peut répondre en lisant le journal, sans que personne n'appelle
  le développeur.
- Un identifiant propre à l'agent en production, créé par vous, rattaché à une personne
  responsable avec un nom, en lecture seule pour commencer, avec la valeur hors du chat et du
  dépôt.
- `docs/LOCKS.md` et `docs/DEPLOYMENT.md` à jour, et le canal (ticket, courriel) par lequel il
  prévient de ce qu'il ne peut pas résoudre.

1. Collez-lui :

> We are going to leave you resident in production. First, build the map of the system you will
> need in order to operate it: modules, environments, where each configuration lives, which
> actions are consequential (read `docs/LOCKS.md`), whom to notify. If there are parts of the
> system you cannot see from where you are, tell me; the map must not have hidden gaps. Then
> propose your scope in three levels: read-only and diagnosis; configuration changes with my
> approval; consequential actions behind locks. I choose the level. Your credential acts as the
> person who created it: everything you do is logged under that person's name. Reply in my
> language.

> [fr]
> Nous allons te laisser résident en production. D'abord, construis la carte du système dont tu
> auras besoin pour l'exploiter : modules, environnements, où vit chaque configuration, quelles
> actions ont des conséquences (lis `docs/LOCKS.md`), qui prévenir. S'il y a des parties du système
> que tu ne peux pas voir de là où tu es, dis-le-moi ; la carte ne doit pas avoir de trous cachés.
> Ensuite, propose ta portée en trois niveaux : lecture seule et diagnostic ; changements de
> configuration avec mon approbation ; actions à conséquence derrière des verrous. Je choisis le
> niveau. Ton identifiant agit comme la personne qui l'a créé : tout ce que tu fais est enregistré
> au nom de cette personne. Réponds dans ma langue.

   Vous lui demandez la carte avant d'exploiter, que les trous de la carte, il les déclare, trois
   niveaux de portée pour que vous en choisissiez un, et l'identifiant au nom d'une personne.

2. Choisissez le niveau (pour commencer, toujours le premier : lecture seule et diagnostic).

**Avant d'envoyer le prompt** de clôture : la carte et les trois niveaux lus, le niveau choisi, et
une action concrète hors de ce périmètre pensée par vous, pour que l'agent l'essaie et que vous
voyiez le refus dans le journal.

3. Clôturez avec :

> Level [1: read-only and diagnosis]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the
> credential (never its value), and the procedure to request my approval. Then prove, with a real
> attempt recorded in the log, that something outside your scope is rejected.

> [fr]
> Niveau [1 : lecture seule et diagnostic]. Écris dans `docs/RESIDENT_AGENT.md` la carte, la
> portée, l'identifiant (jamais sa valeur), et la procédure pour demander mon approbation. Ensuite,
> démontre, avec une tentative réelle enregistrée dans le journal, que quelque chose hors de ta
> portée est rejeté.

**La tâche (rétrospective, toujours).**

**Avant d'envoyer le prompt**, de vos mains :

- Les chiffres que vous seul avez, dans `docs/RETROSPECTIVE_INPUTS.md` ou prêts pour le chat :
  combien d'heures vous y avez consacré (de votre agenda, pas de mémoire), combien vous avez
  dépensé dans l'outil d'IA (la facture), combien de quota d'intégration continue vous avez
  utilisé, et les dates de début et de fin.
- La liste des incidents tels que vous vous en souvenez, avec une date approximative, pour la
  confronter à ce que l'agent sortira des éléments en attente et des commits.
- `docs/PENDING.md` avec les clos documentés et `docs/DECISIONS.md`, qui sont la source des
  chiffres.

4. Collez-lui :

> [The project] is over. Do the retrospective with numbers, not impressions: what it cost
> (tokens, quota, my time), how many pending items, which ones took the most rounds and why,
> which incidents happened and which step of the ladder each falls into, and which step failed
> or was missing. If you lack the data for any figure (my time, for instance), ask me for it or
> mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder:
> which step is modified, how, and which incident justifies it. Write it to
> `docs/RETROSPECTIVE_[date].md`. Reply in my language.

> [fr]
> [Le projet] est terminé. Fais la rétrospective avec des chiffres, pas des impressions : ce que
> ça a coûté (jetons, quota, mon temps), combien d'éléments en attente, lesquels ont pris le plus
> de tours et pourquoi, quels incidents il y a eu et dans quel échelon de l'échelle tombe chacun,
> et quel échelon a échoué ou manquait. Si tu n'as pas la donnée pour un chiffre (mon temps, par
> exemple), demande-la-moi ou marque-la comme estimation ; ne l'invente pas. Termine par une
> proposition concrète de changement à l'échelle : quel échelon est modifié, comment, et quel
> incident le justifie. Écris-la dans `docs/RETROSPECTIVE_[date].md`. Réponds dans ma langue.

   Vous lui demandez des chiffres avec leur source, chaque incident rattaché à un échelon (un
   incident qui ne tombe dans aucun est un échelon qui manque), qu'il vous demande les chiffres
   qu'il n'a pas, et une proposition concrète de changement à l'échelle.

5. Lisez la proposition de changement. Si elle vous paraît valable, envoyez-la au
   [dépôt d'Urazuke](https://github.com/pkuschnirof/urazuke) comme proposition d'amélioration
   (voir `CONTRIBUTING.md`) : c'est ainsi que la méthode apprend de chaque projet.

**Vérification de complétude.** La carte dit-elle ce que l'agent ne peut PAS voir ? Avez-vous vu
dans le journal qu'une action hors de la portée est rejetée ? L'identifiant agit-il au nom d'une
personne ? La rétrospective a-t-elle des chiffres avec leur source, ou des adjectifs ? Chaque
incident tombe-t-il dans un échelon ? Y a-t-il au moins une proposition concrète de changement ?

**Livrable.** `docs/RESIDENT_AGENT.md` (le cas échéant) et `docs/RETROSPECTIVE_[date].md`.

**Erreurs typiques.** Donner à l'agent résident un niveau élevé « pour qu'il puisse tout
résoudre » : commencez par la lecture seule et montez quand il y a des preuves. Une rétrospective
qui dit que tout s'est bien passé : tout ne se passe jamais bien ; elle est écrite pour vous, pas
pour la méthode. Et ne pas envoyer la proposition de changement : l'échelon 15 se clôt quand
l'échelle change, pas quand le document s'écrit.

**Dans le projet-guide.** La rétrospective de Turnera, dans un cours typique : une quarantaine
d'heures de l'élève, vingt-huit éléments en attente, ceux qui ont le plus tourné en rond étaient
ceux des messages (fuseaux horaires et le prestataire WhatsApp) ; deux incidents, un dans
l'échelon 11 (l'état « absent » existait dans l'écran et pas dans le serveur, ni non plus dans
l'arbre sémantique) et un autre dans le 15 (un déploiement en production avec la configuration de
test, détecté par la vérification de bout en bout après le déploiement). Proposition de
changement : que la routine de déploiement de l'échelon 15 exige de montrer la différence de
configuration entre test et production avant de promouvoir, pas seulement « ce qui change ».

---

## La liste de mise en production

Quand les vingt-quatre leçons sont faites, le système remplit cette liste. C'est la définition
opérationnelle de « production grade » dans Urazuke, et elle peut servir de liste de vérification
finale, avec le propriétaire, sans ouvrir le code :

1. Il y a une fiche d'éligibilité avec décision, date et nom (P0).
2. Il y a un contrat de collaboration que l'agent lit à chaque session, et il a été prouvé qu'il
   le lit (P1, P2).
3. Le fichier de projet se lit en cinq minutes et dit ce que le système N'est PAS ; il y a un arbre
   sémantique confirmé par le propriétaire, et tout élément en attente pend d'un nœud (P2).
4. Il y a un dimensionnement avec des données primaires sourcées, des dérivées avec leur calcul,
   et le scénario « fois dix » (P3).
5. Le squelette a été déployé vide au démarrage, avec la chaîne d'intégration et de
   déploiement, et le déploiement a été lancé deux fois (P4).
6. Tout changement a son élément en attente avec spécification détaillée, et tout élément en
   attente clos conserve sa spécification et sa preuve : c'est la documentation de ce qui a été
   fait (P5).
7. Toute règle métier a un propriétaire, une date et des mots textuels, dans le commit, dans
   l'élément en attente et dans le registre (P6).
8. Tout chiffre qui a décidé de quelque chose a un compteur avec test que vous pouvez lancer (P7).
9. Tout test important a été vu en rouge avant le vert ; chaque flux a son test de bout en bout qui
   vérifie le backend depuis l'écran ; la batterie complète a été lancée à la clôture de chaque
   bloc et avant la production (P8).
10. La qualité du code se vérifie par machine à chaque commit, c'est une porte, et la couverture
   n'a jamais baissé (P9).
11. Chaque fonctionnalité a ses cas de test manuel, écrits pour une personne ; ils ont été
   exécutés à la clôture de chaque bloc et à l'acceptation, avec date et nom ; chaque échec est
   revenu comme élément en attente (P10).
12. Toute liste a un seul propriétaire ; il y a une carte producteur/consommateur ; il y a un
   registre d'anti-patrons avec vérification automatique (P11).
13. Tout rapport sépare vérifié, cru et angles morts (P12).
14. Il y a eu au moins un audit par une session différente, et ses P0 sont des éléments en attente
    (P13).
15. Toute action à conséquence a un verrou avec test en rouge et chemin de retour ; les
    automatisations sont passées par le mode à blanc (P14).
16. Les tests tournent une fois par commit ; la configuration est hors du dépôt ; le retour
    arrière a été testé ; aucun secret ne vit dans le dépôt ni dans le chat sans avoir été tourné
    (P15).
17. Les journaux sont structurés, avec un niveau configurable sans déployer, avec un identifiant
    qui suit chaque action de l'écran à la base ; les actions à conséquence restent dans un audit
    immuable ; aucune donnée personnelle dans les journaux (P16).
18. Les requêtes réelles ont été mesurées au volume attendu, corrigées avec un avant et un
    après, et il y a des budgets avec test par chemin critique (P17).
19. Le scan de vulnérabilités tourne à chaque push et avec un calendrier, c'est une porte, et il
    n'y a aucun P0 ouvert (P18).
20. Il y a un test de charge avec test, lancé au volume attendu et au « fois dix », avec le point
    de rupture écrit et les seuils qui en dérivent (P19).
21. Il y a trois manuels avec date et version, assemblés depuis les éléments en attente clos ; une
    personne qui ne programme pas a suivi celui de reprise ; le propriétaire a fait les tests
    d'acceptation sur tous les flux (P20).
22. L'usage des ressources et les temps de réponse sont surveillés avec des alertes et un rapport
    cyclique, et chaque écart a une cause ou un élément en attente (P21).
23. Les erreurs sont capturées dans le backend, les tâches et le navigateur, regroupées,
    rapportées par cycle avec le taux par flux, et aucune ne reste sans élément en attente (P22).
24. Il y a une rétrospective chiffrée et une proposition de changement à l'échelle (P23).

Si les vingt-quatre donnent « oui », le système est prêt à être mis en œuvre. Si l'une donne
« non », vous savez déjà quel échelon regravir.

---

## Et ensuite : la partie 2, le projet hérité

Cette première partie enseigne la méthode sur un dossier vide parce que c'est la façon la plus
claire de l'apprendre. Mais dans la vraie vie on ne vous donne presque jamais un dossier vide : on
vous donne un système qui tourne déjà et on vous demande « répare ça » ou « ajoute-lui ceci ». La
[partie 2 du cours](MANUAL_CURSO_EVOLUTIVO.md) prend le même cabinet dans une autre ligne de
temps, avec une application que le neveu de la responsable leur a faite en un été et que personne
ne comprend en entier, et enseigne le tronçon de normalisation du [chemin
évolutif-correctif](EVOLUTIVO_CORRECTIVO.md) : huit leçons pour récupérer les intrants que la
méthode tient pour acquis, monter la ceinture de sécurité et ordonner la dette, et deux de plus
pour corriger le premier bug et construire la première fonctionnalité nouvelle avec la méthode
complète.

## Annexe A — Comment évaluer (pour qui donne le cours ou s'auto-évalue)

Une grille simple, par leçon, avec trois niveaux :

- **Non gravi** : le livrable manque, ou une vérification de complétude donne « non ».
- **Gravi** : le livrable existe et toutes les vérifications donnent « oui ».
- **Gravi avec preuve de discernement** : en plus, l'élève peut raconter un cas où l'agent a mal
  fait quelque chose dans cette leçon (il a supposé, inventé, rapporté de trop) et comment il l'a
  détecté. C'est l'objectif réel du cours : pas l'artefact, mais le réflexe.

Ce qui ne s'évalue pas : la qualité du code. Personne ne la lit. On évalue la qualité de la preuve.

## Annexe B — Adaptation du cours à chaque outil

Les prompts sont les mêmes dans n'importe quel outil. Ce qui change, c'est où vont les routines
que, dans le cours, on ajoute à `docs/WORKING_AGREEMENT.md` :

- Dans **Claude Code**, les routines vont dans le `CLAUDE.md` du projet (ou le contrat est inclus
  depuis là), et elles se lisent toutes seules à chaque session.
- Dans **Cursor**, elles vont dans `.cursor/rules/`, comme règles toujours actives.
- Dans **Codex CLI** ou **Gemini CLI**, dans `AGENTS.md` ou `GEMINI.md` à la racine.
- Dans **Forge**, le contrat et les routines sont des doctrines, les prompts d'échelon s'injectent
  tout seuls au franchissement de chaque porte, le registre des éléments en attente est natif et
  l'arbre sémantique est le graphe de connaissance du projet. Le cours avec Forge est le même
  cours avec moins de copier-coller.

Le test de lecture de la leçon 2 vaut pour tous : si une nouvelle session ne sait pas ce que le
système NE fait PAS, l'outil ne charge pas le fichier où vous avez mis le contrat.

## Annexe C — Ce que ce manuel n'a pas encore

- Une cohorte qui l'ait suivi. L'ordre des étapes, les erreurs typiques et le projet-guide
  sont écrits depuis mes trois systèmes, pas depuis des élèves. La première cohorte les corrigera
  (et c'est, littéralement, l'échelon 23 appliqué au cours).
- Les poids des critères d'éligibilité (leçon 0), que je suis en train de calibrer.
- Un exemple complet de `docs/PENDING.md` du projet-guide, avec les vingt-huit éléments en attente
  spécifiés et clos, pour qu'un élève voie à quoi ressemble la documentation de ce qui a été fait à
  la fin d'un projet.
