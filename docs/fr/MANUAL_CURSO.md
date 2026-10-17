# Urazuke — le cours. Manuel avec tâches pratiques, échelon par échelon, jusqu'à l'application en production

Version 1, 17 octobre 2026. C'est un document de travail du projet Urazuke : il sera corrigé avec la
première promotion qui l'utilisera. Il est écrit dans le langage de tous les jours, et chaque sigle
ou expression étrange se trouve dans le glossaire du document principal
(`ESCALERA_METODOLOGICA.md`). Ceci est la version française ; l'espagnol est la source de vérité.
Les prompts destinés au modèle sont identiques dans toutes les langues.

## Avant de commencer

### À qui s'adresse ce cours

À quelqu'un qui veut construire du logiciel avec l'intelligence artificielle **et veut que ce
logiciel soit utilisé pour de vrai**, par de vraies personnes, pendant des mois. Ce n'est pas un
cours de programmation : vous n'apprendrez ni un langage ni un framework. Ce n'est pas non plus un
cours de « prompts » : vous n'apprendrez pas d'astuces pour que le modèle écrive mieux. C'est un
cours de **méthode** : quoi faire dans quel ordre, quoi demander au modèle à chaque moment, ce qu'il
doit vous livrer, et comment savoir — sans lire de code — que ce qu'il a livré est complet.

Il est pour vous si vous êtes l'une de ces personnes :

- Vous avez une entreprise, un cabinet, une petite société de conseil, et vous voulez votre propre
  système sans embaucher une équipe de développement.
- Vous êtes consultant ou freelance en automatisation et vos clients vous demandent « quelque chose
  de plus » qu'un robot.
- Vous savez programmer, mais vous voulez que le modèle fasse le gros du travail et garder les
  décisions pour vous.
- Vous avez déjà « vibecodé » quelque chose, ça a marché deux semaines, et au troisième mois ça
  s'est effondré.

Il n'est pas pour vous si ce que vous voulez est un prototype pour la démo de vendredi. Pour cela il
existe des outils plus rapides, et cette méthode vous paraîtra lente. La méthode est pour ce qui doit
continuer à fonctionner après la démo.

### Ce que vous aurez à la fin

Une application à vous, tournant en production, avec : des tests qu'on a vus échouer avant de
passer ; un déploiement reproductible avec retour arrière ; la configuration et les secrets hors du
dépôt ; les décisions métier écrites avec une date ; des verrous sur tout ce qui facture, envoie ou
supprime ; trois manuels qu'une personne peut suivre sans IA ; un audit fait par un agent différent
de celui qui a construit ; et une rétrospective chiffrée. C'est ce que nous appelons ici
« production grade » : ce n'est pas que ça fonctionne, c'est que **ça peut être soutenu**.

Et vous aurez quelque chose de plus, qui est ce que vous emportez vraiment : le réflexe de ne pas
croire le modèle sans preuve, et de savoir exactement quelle preuve lui demander à chaque étape.

### Ce dont vous avez besoin

1. **Un outil d'IA pour programmer.** N'importe lequel capable de lire et d'écrire des fichiers
   dans votre dépôt et d'exécuter des commandes : Claude Code, Cursor, Codex CLI, Gemini CLI,
   Forge. La méthode ne dépend pas duquel ; le document principal a un tableau indiquant où va
   chaque artefact dans chaque outil. Dans ce manuel nous disons « l'agent » pour désigner celui que
   vous utilisez.
2. **Un compte GitHub** (ou équivalent) et des notions minimales de ce que sont un dépôt, un commit
   et un push. Si vous ne les avez pas, consacrez-y un après-midi avant de commencer ; n'importe
   quel tutoriel d'introduction suffit. Il n'en faut pas plus.
3. **Un projet.** L'idéal est qu'il soit à vous : un système dont vous avez besoin ou qu'un client
   vous a demandé, avec des utilisateurs qui vont l'utiliser. Si vous n'en avez pas, utilisez le
   **projet-guide** décrit ci-dessous ; il est conçu pour passer par les seize échelons sans en
   sauter aucun.
4. **Du temps.** Le cours a seize leçons, une par échelon. Celles de démarrage (0 à 4) prennent une
   à trois heures chacune ; celles de la boucle (5 à 10) s'apprennent en un après-midi et se
   pratiquent pendant tout le projet ; celles d'exploitation (11 à 15) prennent deux à quatre heures
   chacune. Un petit projet, de bout en bout, c'est entre quatre et huit semaines de travail à temps
   partiel.
5. **Un propriétaire du domaine avec du temps pour décider.** Si le projet est à vous, c'est vous.
   S'il appartient à un client, c'est le client, et il doit savoir qu'il devra répondre à des
   questions pendant tout le projet. Ce point n'est pas négociable : sans propriétaire qui décide,
   c'est le modèle qui décide, et c'est là que la méthode casse.

### Comment se suit le cours

Chaque leçon a la même structure :

- **Ce que vous devez comprendre** : le concept, expliqué comme on l'explique à une personne.
- **La tâche** : pas à pas, avec le prompt exact que vous allez donner à l'agent (en anglais, parce
  que les modèles suivent les instructions avec plus de précision en anglais ; sous chacun il est
  expliqué en français ce que vous demandez) et quoi faire de ce qu'il renvoie.
- **La vérification de complétude** : la liste des questions que vous vous posez sur ce que l'agent
  a livré, sans ouvrir le code. Si l'une donne « non », la leçon n'est pas terminée.
- **Le livrable** : le fichier ou la preuve qui doit exister à la fin.
- **Erreurs typiques** : ce qui arrive à presque tout le monde la première fois.
- **Dans le projet-guide** : à quoi ressemble cette leçon appliquée au projet d'exemple.

Une règle pour tout le cours : **ne passez pas à l'échelon suivant avec une vérification à
« non »**. La tentation du « je corrigerai plus tard » est exactement ce que la méthode existe pour
éviter. Si un échelon n'est pas gravi complètement, le suivant se construit sur du sable.

### Le projet-guide : « Turnera »

Si vous n'avez pas de projet à vous, utilisez celui-ci. Il est petit, mais il a tout ce qu'il faut
pour qu'aucun des seize échelons ne soit factice : de vrais utilisateurs, des données personnelles,
des messages qui partent dans le monde, et de l'argent.

**Le métier.** Un cabinet (ce peut être un studio, un salon de coiffure, un atelier : n'importe
quel lieu qui donne des rendez-vous). Aujourd'hui les rendez-vous se notent dans un cahier et se
confirment par WhatsApp à la main. On perd des rendez-vous parce que les gens oublient, il y a des
doublons parce que deux personnes ont noté dans des cahiers différents, et personne ne sait combien
de rendez-vous ont été annulés le mois dernier.

**Ce qu'ils veulent.** Un agenda web où les deux réceptionnistes et les trois praticiens voient les
rendez-vous ; des rappels automatiques 24 heures avant, par WhatsApp ou courriel ; la possibilité de
demander un acompte par lien de paiement pour certains rendez-vous ; et deux ou trois chiffres en
fin de mois (combien de rendez-vous, combien d'absences, combien d'acomptes).

**La propriétaire.** La responsable du cabinet. Elle a du jugement sur le métier (elle sait quels
rendez-vous nécessitent un acompte, combien de temps à l'avance on peut annuler, quoi dire à un
patient qui a manqué trois fois) et elle a quinze minutes par jour pour répondre aux questions.
Elle ne programme pas, et elle ne lira pas de code.

**Les chiffres qu'elle seule connaît.** Une quarantaine de rendez-vous par jour, deux cent cinquante
jours par an. Environ trois messages par rendez-vous (confirmation, rappel, parfois
reprogrammation). Les données des patients sont conservées cinq ans. Le pic est le lundi matin,
avec les deux réceptionnistes qui saisissent en même temps. Et une question à laquelle elle ne sait
pas répondre et qui compte : si ça fonctionne, vont-ils le vendre à d'autres cabinets ? (La réponse
change le dimensionnement par dix.)

**Ce qui a des conséquences.** Envoyer un rappel (envoyé deux fois, ça agace ; envoyé au mauvais
numéro, c'est un problème de confidentialité). Encaisser un acompte (de l'argent). Annuler un
rendez-vous (irréversible pour le patient qui le perd). Supprimer un patient (données personnelles).

Cela suffit pour démarrer. Tout le reste, l'agent le demandera, et il fait partie de l'exercice
qu'il le demande.

---

## Phase de démarrage : leçons 0 à 4

Ces cinq leçons se font une fois par projet, avant d'écrire de la fonctionnalité. Ce sont celles
qu'on est le plus tenté de sauter (« je veux voir quelque chose qui marche »), et les plus chères à
sauter. Un conseil pratique : faites-les en une semaine, d'une traite, et seulement ensuite ouvrez
la boucle.

### Leçon 0 — Ce projet peut-il être abordé ainsi ?

**Ce que vous devez comprendre.** La méthode ne convient pas à n'importe quel projet, et le savoir
avant de commencer est la première décision de qualité. Il y a deux conditions sans lesquelles elle
ne fonctionne pas : qu'il y ait un dépôt standard où laisser la preuve (X1), et que les écrans
puissent être pilotés par programme pour tester de bout en bout, de l'écran au backend (X2). Si l'une
des deux manque, l'agent ne pourra pas se vérifier seul, et alors vous finirez par lire du code
vous-même, ce qui est justement ce que la méthode promet d'éviter. Ensuite il y a des critères qui
pondèrent (s'il y a un propriétaire avec du temps, si une erreur a des conséquences, si on peut
tester dans un environnement à part, etc.), que nous calibrons encore avec les premiers projets.

Pour le projet-guide les deux conditions sont remplies : c'est un projet nouveau (pas de legacy) et
nous allons le construire avec une interface web pilotable par programme. Pour un projet à vous,
cette leçon peut se terminer par « no-go », et c'est un résultat valable du cours.

**La tâche.**

1. Écrivez, à la main, dans un fichier `docs/INITIAL_SURVEY.md`, ce que vous savez du projet : ce
   que veut le client, pour qui, ce qui se passe aujourd'hui sans le système, quelle technologie
   existe ou est proposée, s'il y a un système antérieur et s'il a un dépôt, qui est le propriétaire
   et combien de temps il a, quelle conséquence a une erreur, quels environnements il y aura. Une
   demi-page. Peu importe que ce soit incomplet ; en fait, il fait partie de l'exercice que ce le
   soit.
2. Copiez la fiche de critères du document principal (les excluants X1 et X2 et les candidats D1 à
   D10) dans `docs/ELIGIBILITY_CRITERIA.md`.
3. Ouvrez l'agent dans le dossier du projet (encore vide à part ces deux fichiers) et collez-lui ce
   prompt :

> We are going to assess whether this project can be run with the Urazuke method. Read the
> initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`. First, evaluate whether the survey is sufficient to answer
> every criterion. If any criterion cannot be answered from the survey, ask me for the missing
> information before going on; do not assume. Then fill in the sheet criterion by criterion:
> the answer, where it comes from, and for each exclusionary criterion whether it is green or
> red. Do not decide: present me the completed sheet with your reading and your doubts, and I
> will decide. Reply in my language.

   Vous lui demandez de lire les deux fichiers, d'**évaluer si le relevé suffit et de demander ce
   qui manque avant de répondre** (cette clause se répète dans tous les prompts du cours ; c'est le
   cœur de la méthode), de remplir la fiche en disant d'où vient chaque réponse, et de ne pas
   décider : la décision vous appartient.

4. Répondez à ses questions. S'il n'en a posé aucune, méfiez-vous et demandez-lui ce qu'il a
   supposé.
5. Quand il vous présente la fiche, lisez-la et décidez. Puis collez le prompt de clôture :

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.

**Vérification de complétude.** Ouvrez `docs/ELIGIBILITY.md` et demandez-vous : les deux critères
excluants ont-ils une réponse explicite et une source ? Y a-t-il un critère auquel on a répondu
« probablement » ? (Si oui, l'agent devait demander.) La décision a-t-elle une date et un nom ? Les
conditions, s'il y en a, peuvent-elles être vérifiées ? Les questions qu'il a posées et vos réponses
y sont-elles ?

**Livrable.** `docs/ELIGIBILITY.md`, d'une page.

**Erreurs typiques.** Écrire le relevé « complet » pour que l'agent ne demande rien : vous ratez
l'exercice et, pire, vous vous habituez à faire le travail du modèle. Répondre « go » avec cinq
conditions : c'est un « no-go » déguisé. Et la plus courante : sauter la leçon parce qu'« il est
évident que ça va ». L'évident est ce qui ne s'écrit pas, et ce qui ne s'écrit pas est ce qui se
discute ensuite.

**Dans le projet-guide.** L'agent devrait demander, au minimum, si l'interface sera web ou mobile
(parce que X2 en dépend), s'il y a un système antérieur même s'il s'agit d'un tableur, et quel canal
de messagerie sera utilisé (WhatsApp a des exigences que le courriel n'a pas). La fiche se termine
par « go », avec une condition raisonnable : avoir le canal de messagerie défini avant l'échelon 12.

### Leçon 1 — Le contrat de collaboration

**Ce que vous devez comprendre.** L'agent arrive à chaque session sans mémoire de la précédente.
C'est comme un nouveau collègue chaque matin. Le contrat de collaboration est ce que vous lui dites
le premier jour et ce qu'il relira tous les jours : comment vous travaillez, ce que vous ne tolérez
pas, quel niveau d'autonomie vous lui donnez. Sans contrat, vous répéterez les mêmes choses à
chaque session, et à chaque fois un peu différemment.

Les six règles minimales ont chacune un échec derrière elles : « mon temps est sacré » évite qu'il
vous consulte sur chaque détail ; « zéro dette » évite le « je corrigerai plus tard » ; « périmètre
exact » évite qu'il vous ajoute des choses « tant qu'il y est » ; « documentation dans le même
commit » évite les manuels périmés ; « ne jamais rapporter comme fait ce qui n'a pas été vérifié »
évite le « fait » qui ne l'était pas ; « parle ma langue » évite qu'il vous réponde en anglais parce
que le prompt était en anglais.

**La tâche.**

1. Réfléchissez cinq minutes à votre façon de travailler : préférez-vous qu'il demande beaucoup ou
   peu ? Dans quelle langue ? Qu'est-ce qui vous agace quand vous travaillez avec d'autres
   personnes ? Notez-le dans une courte liste ; vous le lui raconterez quand il demandera.
2. Collez ce prompt :

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

   Vous lui demandez les six règles avec l'échec que chacune évite, des règles propres marquées
   comme propositions pour que vous les acceptiez ou les rejetiez, et qu'il vous pose des questions
   sur vous.

3. Répondez à ses questions. Lisez les propositions : acceptez celles qui vous servent, rejetez
   celles qui ne servent pas, toujours avec une raison d'une ligne.
4. Clôturez avec :

> I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the
> agreement with today's date and a version number. Then add to the project file the
> instruction to read this agreement at the start of every session.

   S'il n'y a pas encore de fichier de projet (vous le faites à la leçon 2), il en créera un
   minimal avec cette instruction ; c'est très bien.

**Vérification de complétude.** Les six règles sont-elles là, chacune avec l'échec qu'elle
évite ? L'une est-elle écrite comme une aspiration (« essayer de… ») ? Le fichier de projet
ordonne-t-il de le lire au début de chaque session ? Vous a-t-il posé au moins une question sur
votre façon de travailler ?

**Livrable.** `docs/WORKING_AGREEMENT.md` avec date et version, accroché au fichier de projet.

**Erreurs typiques.** Accepter vingt règles parce qu'elles sonnent toutes bien : personne n'en
respecte vingt ; six à huit se respectent. Laisser une règle qui dit que l'agent peut changer le
contrat : non. Et la plus silencieuse : ne jamais tester s'il le lit. À la leçon 2 vous verrez
comment.

**Dans le projet-guide.** Une règle propre que l'agent propose souvent pour Turnera, et qu'il vaut
la peine d'accepter : « je n'envoie jamais un vrai message à un patient depuis un environnement
autre que la production ; en test, les messages vont dans une boîte factice ». C'est l'échelon 12
qui pointe le nez tôt.

### Leçon 2 — La définition du projet et la lecture obligatoire

**Ce que vous devez comprendre.** Le fichier de projet (`PROJECT.md`, ou `CLAUDE.md`, ou le nom
qu'utilise votre outil) est la carte que l'agent lit au début de chaque session. Il doit être
**court** : ce qu'est le système, pour qui, ce qu'il N'EST PAS, les modules, les décisions prises
avec leur date, et l'ordre de lire le contrat. Ce qui s'est passé chaque jour ne va pas là : cela va
dans l'état vivant (`docs/STATUS.md`) et dans le registre des éléments en attente. L'un des
systèmes d'origine de la méthode a laissé ce fichier grossir jusqu'à 9 661 lignes ; dans cet état,
personne ne le lit, et le modèle non plus.

La section « ce que ce n'est pas » est la plus importante et celle que tout le monde laisse vide.
Ce qui n'est pas écrit est ce que le modèle inventera quand il rencontrera un trou.

**La tâche.**

1. Complétez `docs/INITIAL_SURVEY.md` avec ce que vous avez appris à la leçon 0 (les réponses aux
   questions de l'agent). Ajoutez une section « ce que le système NE doit PAS faire », même avec
   deux points seulement.
2. Collez :

> We are going to define the project in writing. Read the business survey in
> `docs/INITIAL_SURVEY.md` and the working agreement in `docs/WORKING_AGREEMENT.md`. Evaluate
> whether the survey is sufficient to describe the system, its users and its boundaries; if it
> is not, ask me for what is missing before writing anything. Then write `PROJECT.md`, three
> hundred lines at most, with: what the system is and for whom; what it is NOT; the main
> modules as a list; the decisions already made, each with its date; and the instruction to
> read this file and the working agreement at the start of every session. Separately, create
> `docs/STATUS.md` for the living state (what is being worked on, what is open): that file
> changes every day; `PROJECT.md` almost never does. Reply in my language.

   Vous lui demandez de demander avant de rédiger, un fichier de projet court avec la section
   « ce que ce n'est pas », des décisions datées, et l'état vivant dans un autre fichier.

3. Lisez `PROJECT.md` en entier. Il doit tenir en cinq minutes. Corrigez ce qui n'est pas vrai ou
   pas à vous.
4. Clôturez avec :

> Apply these corrections: [list]. Finalize `PROJECT.md` with today's date. Add to the working
> agreement that the change history never goes into `PROJECT.md`: it goes to `docs/STATUS.md`
> or to the pending-items register.

5. **Le test de lecture.** Fermez la session de l'agent et ouvrez-en une nouvelle. Sans rien lui
   dire d'autre, demandez : « Que ne doit pas faire ce système ? ». S'il répond avec ce que dit
   `PROJECT.md`, l'accrochage fonctionne. S'il répond n'importe quoi d'autre, il ne lit pas la
   carte : vérifiez comment votre outil charge le fichier de projet.

**Vérification de complétude.** `PROJECT.md` se lit-il en cinq minutes ? Dit-il ce que le système
ne fait PAS ? Chaque décision a-t-elle une date et son auteur ? L'agent a-t-il demandé quelque chose
avant de rédiger ? L'état vivant est-il dans un autre fichier ? A-t-il réussi le test de lecture ?

**Livrable.** `PROJECT.md` (trois cents lignes au maximum) et `docs/STATUS.md`, et le test de
lecture réussi.

**Erreurs typiques.** Coller dans `PROJECT.md` toute la spécification que vous aviez déjà : c'est le
programme, pas la spécification. Laisser « ce que ce n'est pas » vide. Et ne pas faire le test de
lecture : c'est la seule façon de savoir que les échelons 1 et 2 agissent et n'existent pas
seulement.

**Dans le projet-guide.** Dans « ce que ce N'EST PAS » de Turnera il devrait y avoir, au minimum :
ce n'est pas un système de dossier médical (il ne stocke pas de données médicales), ce n'est pas une
passerelle de paiement (il utilise un lien de paiement d'un prestataire, il ne traite pas de
cartes), et il n'envoie pas de messages marketing (seulement des confirmations et des rappels).
Chacun de ces trois « non » vous épargne une conversation d'une demi-heure plus tard.

### Leçon 3 — Dimensionner avant de concevoir l'architecture

**Ce que vous devez comprendre.** Il y a des décisions qui, mal prises, coûtent des semaines :
quelle base de données, si les appels à la base sont synchrones ou asynchrones, combien de personnes
peuvent utiliser le système en même temps. Et toutes dépendent de chiffres que **seul le métier
possède** : combien de rendez-vous par jour, combien de messages par rendez-vous, combien d'années
on conserve. Le modèle ne peut pas inférer ces chiffres ; il peut inférer ce qui en dérive (lignes
par an, taille à cinq ans). C'est pourquoi le prompt exige qu'il distingue données primaires et
dérivées, et **demande les primaires manquantes au lieu de les estimer**. Quand le modèle estime une
donnée primaire, il le fait avec le même air assuré que quand il calcule ; et vous n'avez aucun
moyen de distinguer au ton.

Il y a aussi un type de décision qu'il convient de toujours prendre : les **asymétriques**, bon
marché si elles sont de trop et très chères si elles manquent. L'exemple canonique est de rendre
l'interface avec la base de données asynchrone dès le premier jour même si la première base est un
fichier : si vous ne changez jamais de base, un `await` était de trop ; si vous changez, vous vous
êtes épargné une réécriture.

**La tâche.**

1. Asseyez-vous avec le propriétaire (ou avec vous-même, si le projet est à vous) et écrivez
   `docs/VOLUME_SURVEY.md` : les entités principales et combien il y en a, combien s'ajoutent par
   mois, combien d'événements par entité, combien de personnes opèrent en pointe et quand est la
   pointe, combien de temps on conserve les données, s'il y a des charges exceptionnelles, quelle
   croissance ils attendent. Pour chaque chiffre, notez d'où il vient : « la responsable l'a dit »,
   « compté dans le cahier de septembre », « supposition ». Laissez-en quelques-uns en
   « supposition » exprès : vous verrez ce que l'agent en fait.
2. Collez :

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

   Vous lui demandez : de distinguer primaires et dérivées ; de **vous demander les primaires qui
   manquent ou sont en « supposition », et de ne jamais les estimer** ; de calculer le dérivé en
   montrant le calcul ; le scénario « fois dix » ; trois options avec le coût de passer de l'une à
   l'autre ; et de ne pas choisir.

3. S'il vous demande les « suppositions », bien : c'était l'exercice. Obtenez les chiffres
   (demandez au propriétaire, comptez dans le cahier) et donnez-les-lui. S'il ne les a pas demandés
   et a calculé quand même, arrêtez-vous et demandez-lui ce qu'il a fait des suppositions : c'est un
   échec de l'échelon et il vaut mieux le voir maintenant.
4. Lisez les trois options. Refaites un calcul à la main (par exemple, lignes par an de la plus
   grande table) : il doit vous donner la même chose. Choisissez.
5. Clôturez avec :

> I choose option [B]. Record in `docs/SIZING.md`: the primary data with its source, the derived
> data with its arithmetic, the three options, the chosen one and why, and the decisions we are
> taking "just in case" even though they are not needed today (for example: the persistence
> interface is asynchronous from line one, even if the first engine is synchronous). Include the
> questions you asked and my answers.

**Vérification de complétude.** Y a-t-il une donnée primaire avec la source « supposition » ou
sans source ? Chaque donnée dérivée montre-t-elle le calcul, et retrouvez-vous le résultat en le
refaisant ? Y a-t-il trois options et une choisie avec une raison ? Dit-il ce qui se passe « fois
dix » ? Les décisions asymétriques sont-elles écrites ? Vous a-t-il posé des questions ?

**Livrable.** `docs/SIZING.md`.

**Erreurs typiques.** Compléter le relevé avec des chiffres inventés par vous pour que l'agent ne
demande rien (c'est la même erreur qu'à la leçon 0, et elle est pire ici parce que ces chiffres
décident de l'architecture). Choisir l'option « la plus puissante » par précaution : le coût de
migration est dans le tableau justement pour que vous choisissiez la plus petite qui résiste au
« fois dix ». Et ne pas écrire les décisions asymétriques : si elles ne sont pas écrites, à la
leçon 4 l'agent ne les respectera pas.

**Dans le projet-guide.** Primaires : 40 rendez-vous/jour × 250 jours = 10 000 rendez-vous/an ;
3 messages par rendez-vous = 30 000 messages/an ; 5 ans de conservation ; pointe de deux
réceptionnistes simultanées. Le « fois dix » est la question de la vente à d'autres cabinets :
100 000 rendez-vous et 300 000 messages par an. Les trois options typiques : un fichier SQLite
(suffisant pour un cabinet pendant des années, ne résiste pas au fois dix avec plusieurs
écrivains), PostgreSQL dès le départ (résiste à tout, coûte un peu plus d'infrastructure), ou SQLite
maintenant avec l'interface asynchrone et une migration prévue vers PostgreSQL (l'asymétrique).
Pour le cours nous choisissons la troisième : c'est celle qui enseigne le plus.

### Leçon 4 — Le squelette avec ses portes

**Ce que vous devez comprendre.** Avant que le système fasse quelque chose d'utile, il doit
démarrer, être testé et être déployé **vide**. Cela ressemble à une perte de temps (« déployer
quoi, s'il n'y a rien ? ») et c'est le contraire : le chemin vers la production fait partie du
produit, et la seule façon de savoir qu'il fonctionne est de le parcourir quand il n'y a encore rien
à perdre. Dans l'un des systèmes d'origine le déploiement est arrivé un mois après le démarrage et
a coûté cinq éléments en attente d'affilée ; avec le squelette déployé la première semaine, ces cinq
coups seraient tombés à vide.

Les **portes** sont les conditions pour passer d'une étape à l'autre (« la batterie est au vert »,
« le déploiement en test a fonctionné »). Les écrire maintenant, même si elles semblent évidentes,
est ce qui permet ensuite de dire « ça ne passe pas » sans discuter.

**La tâche.**

1. Écrivez `docs/ENVIRONMENTS_SURVEY.md` : où le système va tourner (un serveur que vous avez
   déjà, un service cloud), s'il y aura un environnement de test et un de production, qui a accès à
   quoi, et comment on déploie aujourd'hui s'il y a quelque chose. Si vous n'avez rien, dites-le :
   l'agent proposera l'option la plus simple.
2. Assurez-vous d'avoir les identifiants de l'endroit où ce sera déployé, même s'il s'agit d'un
   service gratuit. Sans cela, le squelette reste sur votre machine et la leçon ne peut pas être
   terminée.
3. Collez :

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

   Vous lui demandez de vérifier les accès avant de commencer, la liste exacte de ce qu'est un
   squelette, les portes écrites, une capture réelle de l'environnement de test, et l'interdiction
   d'ajouter de la fonctionnalité.

4. Cette tâche est longue (une ou deux heures de travail de l'agent) et aura des allers-retours :
   des identifiants manquants, un service qui demande de confirmer le courriel, etc. C'est normal.
   Ce qui n'est pas normal, c'est qu'il vous dise « fait » sans la capture de l'environnement de
   test.
5. Quand il vous montre la capture, ouvrez vous-même l'URL dans votre navigateur. Cela doit avoir
   le même aspect.
6. Clôturez avec :

> Skeleton approved. Record in `docs/STATUS.md` the test environment URL, the command to run
> the tests and the command to deploy, and mark this step as done. Then run the deployment a
> second time and show me that the second run changed nothing.

**Vérification de complétude.** Avez-vous ouvert vous-même l'URL de l'environnement de test et vu
l'écran vide ? Y a-t-il un lien vers une exécution d'intégration continue au vert ? Le déploiement
a-t-il été lancé deux fois et la seconde n'a-t-elle rien cassé ? Chaque porte a-t-elle une condition
vérifiable ? Y a-t-il une fonctionnalité que vous n'avez pas demandée ?

**Livrable.** Le dépôt avec le squelette, l'intégration continue au vert, l'URL de l'environnement
de test qui fonctionne, `docs/GATES.md`, et `docs/STATUS.md` avec les trois commandes.

**Erreurs typiques.** Accepter « ça marche en local, le déploiement on verra plus tard » : non, le
déploiement est le squelette. Accepter une capture de la machine de l'agent au lieu de
l'environnement de test. Et le laisser ajouter « tant qu'il y est » un écran de connexion, un menu,
un logo : tout ce qui entre sans élément en attente est du périmètre qui s'est échappé.

**Dans le projet-guide.** Le squelette de Turnera est une page web qui dit « Turnera — version
0.0.1 » tournant à une URL publique d'un environnement de test, un serveur qui répond « ok » sur une
route de santé, un test de fumée qui appelle cette route, l'intégration continue lançant ce test à
chaque push, et le déploiement automatique vers l'environnement de test. Les portes : « batterie au
vert pour fusionner », « environnement de test au vert pour promouvoir en production », « retour
arrière testé pour le premier déploiement en production ». Rien de plus. Et c'est étonnant comme il
est satisfaisant de voir cette page vide à une vraie URL.

---

## Phase de la boucle : leçons 5 à 10

Ces six leçons sont celles que vous utiliserez **à chaque changement**, pendant tout le projet.
Elles s'apprennent en un après-midi, mais se pratiquent pendant des semaines. L'idée est qu'à la fin
de la phase vous ayez le réflexe : prendre un élément en attente, construire, prouver en rouge,
mettre à jour l'autre côté, mesurer ce qu'il y a à mesurer, et rapporter en séparant le vérifié du
supposé. Ce réflexe est la méthode.

Pour les pratiquer vous aurez besoin de fonctionnalité réelle. Dans le projet-guide, le premier bloc
d'éléments en attente est l'agenda de base : voir les rendez-vous du jour, saisir un rendez-vous,
l'annuler. Pas de messages ni de paiements encore ; cela vient après les verrous (leçon 12).

### Leçon 5 — Le plan, ce sont les éléments en attente

**Ce que vous devez comprendre.** Il n'y a pas de « plan » d'un côté et de « liste de tâches » de
l'autre : **la liste des éléments en attente est le plan**. Chaque élément a un numéro, d'où il
vient (la décision ou la demande qui l'a originé), comment on vérifie qu'il est fait, et, quand il
est clos, la preuve. Ce dernier point est ce que vous regarderez au lieu de regarder le code. Et une
règle d'or pour l'agent : ce qui apparaît hors de la liste se note comme nouvel élément, ne se fait
pas.

**La tâche.**

1. Écrivez dans `docs/INITIAL_SURVEY.md` (ou dans un fichier à part) la demande du client pour le
   premier bloc de fonctionnalité, telle que le client la dirait, avec ses ambiguïtés. Pour
   Turnera : « je veux voir les rendez-vous du jour, en saisir un nouveau et annuler ».
2. Collez :

> We are going to turn everything that must be done into numbered pending items. Read
> `PROJECT.md`, the client's request and whatever is in `docs/STATUS.md`. If the request is
> ambiguous on any point such that you cannot write a verifiable pending item for it, ask me;
> do not resolve it by assuming. Create `docs/PENDING.md` with one item per thing to do: number
> (PND-001 onwards), one-line title, what is requested, which decision originates it (or
> "client request, date"), how it will be verified as done, and status. Order them by the
> priority I gave you; if I gave none, propose an order and tell me why. Reply in my language.

   Vous lui demandez de convertir la demande en items vérifiables, de **demander quand la demande
   ne permet pas d'en écrire un vérifiable**, et de proposer un ordre avec sa raison.

3. Répondez aux questions (pour Turnera il demandera, par exemple, ce qu'est « le jour » :
   aujourd'hui, ou n'importe lequel qu'on choisit ? ; annuler supprime-t-il ou marque-t-il ?). Ces
   questions sont des décisions métier ; à la leçon 6 vous verrez où elles s'écrivent.
4. Ajoutez au contrat de collaboration la routine de chaque session. Collez :

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before touching any code, open
> `docs/PENDING.md`, tell me which item you are taking and why. Every commit cites its pending
> item. A pending item is closed with written evidence (the test, the screenshot, the number),
> never with 'done'. If along the way you see something that is not on the list, add it as a new
> pending item; do not do it."

5. Maintenant, oui, commencez à construire. Demandez-lui de prendre le premier élément. À partir
   d'ici, chaque session commence par « quel élément prends-tu et pourquoi ».

**Vérification de complétude.** Chaque élément dit-il comment on le vérifie ? Y a-t-il des éléments
clos sans preuve ni commit ? Prenez trois commits au hasard : citent-ils leur élément ? Quelque
chose est-il apparu dans le code sans élément ? Vous a-t-il interrogé sur l'ambigu ?

**Livrable.** `docs/PENDING.md` avec le premier bloc, la routine dans le contrat, et le premier
élément en cours.

**Erreurs typiques.** Écrire des éléments sans « comment on vérifie » (« améliorer l'écran des
rendez-vous ») : ils ne peuvent pas être clos, et donc ils se closent avec « fait ». Laisser
l'agent clore des éléments sans preuve parce que « je l'ai déjà vu marcher ». Et le plus dur à
corriger : le laisser faire « une petite chose en plus » hors de la liste. La première fois que vous
le laissez, vous avez perdu le périmètre exact.

**Dans le projet-guide.** Le premier bloc de Turnera est environ six éléments : PND-001 voir les
rendez-vous d'un jour ; PND-002 saisir un rendez-vous avec patient, praticien, date et heure ;
PND-003 empêcher deux rendez-vous du même praticien à la même heure ; PND-004 annuler un
rendez-vous (marquer, pas supprimer : décision de la leçon 6) ; PND-005 chercher un patient par nom
ou téléphone ; PND-006 la création de patient avec les données minimales. Chacun avec sa
vérification : « ça s'affiche à l'écran et ça reste dans la base », « quand on tente le doublon
l'écran avertit et la base ne l'enregistre pas », etc.

### Leçon 6 — Les décisions s'écrivent à côté du code

**Ce que vous devez comprendre.** Le modèle, quand il trouve un trou dans les règles métier, **le
comble**. Il ne s'arrête pas pour demander ; il complète avec ce qui lui semble le plus probable,
avec le même naturel que pour tout le reste. C'est pourquoi cette leçon n'est pas « écris les
décisions » mais « exige qu'il s'arrête et demande quand il en manque une ». Et quand vous décidez,
la décision s'écrit avec vos mots exacts, votre nom et la date, dans le commit et dans un registre.
Six semaines plus tard, quand quelqu'un demandera « pourquoi annuler ne supprime pas ? », la réponse
est écrite et c'est la vôtre.

**La tâche.**

1. Ajoutez au contrat la routine des décisions. Collez :

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Whenever implementing something requires a
> business rule that is not written down, or you must choose between two approaches that change
> what the user sees, stop and ask me, in prose, with your recommendation and the alternative. Do
> not implement the one you prefer. When I decide, write the decision with my name and the date
> in the commit message and in `docs/DECISIONS.md`, with the exact words I used. If I do not
> answer and you must move on, implement the most reversible option and mark it 'decision by
> omission, pending confirmation', so that I can review it."

   Vous lui demandez de s'arrêter devant une règle non écrite, de demander avec une recommandation
   et une alternative (pour que vous puissiez décider en dix secondes), d'enregistrer vos mots
   exacts, et quand vous ne répondez pas de choisir le plus réversible et de le marquer.

2. Continuez à construire les éléments du bloc. Chaque fois qu'il vous demande une règle métier,
   décidez et répondez avec le format de clôture :

> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.

3. Faites le test contraire, une fois, exprès : laissez une question sans réponse pendant une
   session et regardez ce qu'il fait. Il doit choisir le plus réversible et le marquer « par
   omission ». S'il a choisi ce qui lui plaisait et ne l'a pas marqué, c'est un échec de l'échelon :
   corrigez-le dans le contrat.

**Vérification de complétude.** Ouvrez trois commits qui touchent des règles métier : citent-ils
qui a décidé et quand ? Y a-t-il des décisions « par omission » non confirmées ? Y a-t-il une règle
dans le système que vous ne reconnaissez pas comme la vôtre ? Les phrases sont-elles textuelles ou
« améliorées » ?

**Livrable.** `docs/DECISIONS.md` qui grandit, avec au moins cinq décisions du premier bloc, et les
commits qui les citent.

**Erreurs typiques.** Répondre aux questions par chat et ne pas exiger qu'elles soient écrites : à
la troisième session plus personne ne s'en souvient. Laisser l'agent « améliorer » vos mots : une
règle paraphrasée est une règle différente. Et la plus grave : découvrir en production une règle
que personne n'a décidée. Quand ça arrive (ça arrivera), ce n'est pas un bug : c'est un échec de
l'échelon 6, et ça se corrige dans le contrat, pas seulement dans le code.

**Dans le projet-guide.** Décisions typiques du premier bloc de Turnera : « annuler marque le
rendez-vous comme annulé et enregistre qui et quand ; rien n'est supprimé » ; « un praticien ne peut
pas avoir deux rendez-vous à la même heure, mais peut avoir deux patients sur un créneau double si
le praticien l'a activé » ; « le téléphone du patient est obligatoire ; le courriel non ». Chacune
avec une date et le nom de la responsable.

### Leçon 7 — Les tests comme verrous, prouvés en rouge

**Ce que vous devez comprendre.** C'est la leçon centrale du cours. Un test que vous n'avez jamais
vu échouer, vous ne savez pas s'il prouve quelque chose. Le modèle écrit le code et le test dans la
même session, avec la même compréhension : s'il a mal compris la demande, le test prouve ce qu'il a
compris, et il passe. La seule façon bon marché de savoir que le test regarde ce qui compte est de
**le voir en rouge contre l'ancien code** : si le code d'avant le changement le passe aussi, le
test ne distingue pas l'avant de l'après, et alors il ne sert à rien. C'est pourquoi la demande
n'est pas « écris des tests » mais « montre-moi le rouge, puis le vert, puis la régression ».

Et une seconde idée : les tests de bout en bout. Un test qui vérifie depuis l'écran (clique, saisit,
lit) et constate l'effet sur le backend (la ligne est là, l'état a changé) est celui qui remplace
votre lecture du code. C'est le critère X2 de la leçon 0 transformé en pratique.

**La tâche.**

1. Ajoutez au contrat la routine de preuve. Collez :

> Add this routine to `docs/WORKING_AGREEMENT.md`: "To close a pending item I need evidence,
> not your word. (1) Write the test that proves what the item asks for. (2) Demonstrate that this
> test fails against the previous code: you may temporarily revert the change, or run the test
> against the old version, but show me the red output. (3) Show me the green output with the
> change. (4) Run the regression suite for the neighbouring items and show me it is still green.
> (5) Do not replace with mocks the very part you are trying to test. If testing end to end
> requires something you lack (data, access, an environment), ask me for it; do not simulate what
> you do not have. Finally, the commit message says 'proved red against [what]' and the test
> counts."

   Vous lui demandez le test, **le rouge démontré avec la sortie visible**, le vert, la régression
   des voisins dans la même session, aucune simulation de ce qui est justement testé, et de demander
   ce qui manque pour tester de bout en bout au lieu de le simuler.

2. Prenez l'élément du doublon (PND-003 dans Turnera, ou l'équivalent dans votre projet : une
   règle qui empêche quelque chose). Demandez-lui de le clore avec la routine. Lisez le rapport : il
   doit y avoir une sortie en rouge avec des chiffres (« 1 sur 1 échoue contre la version sans la
   règle ») puis le vert.
3. Demandez un test de bout en bout pour ce même élément : qu'il ouvre l'écran, tente de saisir le
   doublon, lise l'avertissement, et vérifie dans la base qu'il n'a pas été enregistré. S'il dit
   qu'il ne peut pas parce que l'écran ne peut pas être piloté par programme, arrêtez : c'est X2 qui
   échoue, et il faut le corriger maintenant (ajouter des identifiants aux éléments de l'écran)
   avant de continuer.
4. Quand l'agent dit que quelque chose « ne peut pas être testé », collez :

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

**Vérification de complétude.** Le rapport montre-t-il le rouge, avec des chiffres ? La régression
a-t-elle tourné dans la même session, avec des chiffres ? Y a-t-il une partie simulée juste là où
est le changement ? Le commit dit-il « prouvé en rouge » ? Le test d'écran vérifie-t-il aussi le
backend ?

**Livrable.** Au moins trois éléments clos avec la routine complète (rouge, vert, régression),
dont un avec un test de bout en bout.

**Erreurs typiques.** Accepter « les tests passent » sans chiffres et sans rouge. Accepter que la
batterie soit « accélérée » en remplaçant les tests de bout en bout par des simulations. Et laisser
passer un « ne peut pas être testé » sans ouvrir l'élément : la non-testabilité est de la dette, et
la dette s'enregistre.

**Dans le projet-guide.** Le rouge du doublon ressemble à ceci : l'agent retire temporairement la
règle, lance le test, et la sortie dit que le test a échoué parce que le second rendez-vous a été
enregistré. Il remet la règle, lance, vert. Puis la régression : les tests de PND-001 et PND-002
sont toujours au vert. Et celui de bout en bout : un navigateur piloté par programme charge le
formulaire, appuie sur « enregistrer », lit le message « ce créneau est déjà pris », et une requête
à la base confirme qu'il n'y a qu'un seul rendez-vous à cette heure. Quand vous verrez ce rapport
pour la première fois, vous comprendrez à quoi sert toute la méthode.

### Leçon 8 — Symétrie entre producteur et consommateur, et le registre des anti-patrons

**Ce que vous devez comprendre.** Quand vous changez une extrémité du système (le serveur, la
base, un robot), l'autre extrémité (l'écran, un compteur, un rapport) doit changer dans le même
commit. Sinon, elles divergent, et l'utilisateur voit un chiffre d'un côté et un autre de l'autre.
Le principe qui l'évite est simple à énoncer et difficile à tenir : **toute liste a un seul
propriétaire**. Les états possibles d'un rendez-vous, les colonnes d'un rapport, les raisons pour
lesquelles quelque chose attend : une seule partie les définit (le producteur) et les autres les
lisent de là. Dès qu'il y a deux copies, l'une est périmée ; reste à savoir laquelle.

La seconde moitié de la leçon est le registre des anti-patrons (GOTCHAS) : les erreurs que vous
avez déjà payées une fois, notées avec leur odeur, leur cause racine, leur correctif et comment les
détecter avant. L'important n'est pas de les noter : c'est d'ajouter la vérification automatique
qui les détecte, parce qu'un anti-patron noté et non automatisé se répète quand la session change.

**La tâche.**

1. Demandez la carte des contrats :

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

   Vous lui demandez l'inventaire des contrats avec leurs deux côtés, et que ce qu'il ne voit pas
   il le déclare au lieu de l'omettre.

2. Ajoutez la routine au contrat :

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before closing any change that touches a
> contract, look up every consumer in the map and update them in the same commit. Always prefer
> that the producer defines the list (columns, causes, states) and the consumer reads it, rather
> than each keeping its own copy. If the map does not have that relationship, add it."

3. Faites le test de la liste : choisissez une liste qui apparaît à l'écran (dans Turnera, les
   états d'un rendez-vous : en attente, confirmé, annulé, absent) et demandez à l'agent de vous
   montrer où elle est définie et où elle est lue. S'il y a deux définitions, demandez-lui de n'en
   laisser qu'une.
4. La première fois que quelque chose casse pour la deuxième fois (ça arrivera dans les prochaines
   semaines), collez :

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

**Vérification de complétude.** Choisissez un contrat de la carte : chaque consommateur le lit-il
du producteur ou a-t-il sa copie ? Y a-t-il un chiffre affiché sur deux écrans et donnent-ils la
même chose ? Chaque entrée de GOTCHAS a-t-elle les quatre parties ? Quelque chose de déjà noté
s'est-il répété ?

**Livrable.** `docs/PRODUCER_CONSUMER_MAP.md`, la routine dans le contrat, et `docs/GOTCHAS.md`
(même s'il démarre avec une seule entrée).

**Erreurs typiques.** Faire la carte une fois et ne plus jamais la regarder : elle doit grandir
avec chaque nouveau contrat. Noter les anti-patrons comme des anecdotes (« une fois il est arrivé
que… ») sans la partie « comment le détecter avant ». Et le classique : le même texte d'un état tapé
à la main dans le serveur et dans l'écran ; le jour où l'un change, l'autre reste.

**Dans le projet-guide.** La carte de Turnera a, au début, quatre ou cinq contrats : la liste des
états de rendez-vous (définie par le serveur, lue par l'écran et le rapport mensuel) ; la table des
rendez-vous (écrite par la saisie, lue par l'agenda du jour et le rapport) ; la table des patients ;
et, plus tard, la file des messages (écrite par l'agenda, lue par l'expéditeur). Le premier GOTCHA
concerne souvent les dates : l'agenda affichait le rendez-vous le mauvais jour parce que le serveur
stockait dans un fuseau horaire et l'écran affichait dans un autre. Odeur : « le rendez-vous de
23 h apparaît demain ». Cause racine : deux fuseaux horaires. Correctif : un seul, sur le serveur.
Détection : un test avec un rendez-vous à 23 h 30.

### Leçon 9 — Mesurer avant de construire, avec un instrument lui-même vérifié

**Ce que vous devez comprendre.** Le modèle produit des affirmations chiffrées (« il y a environ
120 requêtes de ce type ») et elles sonnent exactement pareil qu'elles soient mesurées ou estimées.
Vous ne pouvez pas les distinguer au ton. La seule façon est d'exiger l'instrument : « avec quoi
l'as-tu mesuré ? montre-moi la commande ». La règle de l'échelon est qu'**aucun chiffre qui décide
de quelque chose ne sort d'une impression** : il sort d'un compteur qui vit dans le dépôt, qui a un
test le vérifiant contre un cas connu, et que vous pouvez lancer.

Et il y a autre chose, que nous avons appris à la dure : les compteurs mentent aussi. Dans l'un des
systèmes d'origine, un compteur donnait zéro parce qu'il ne voyait pas une partie du code, et un
autre disait 27 quand il y en avait 44. D'où l'audit dans les deux sens : du code à la mesure (tout
ce qui devrait être compté est-il compté ?) et de la mesure au code (tout ce qui est compté
existe-t-il vraiment ?).

Dans un petit projet, « mesurer » est modeste : compter combien de requêtes un écran fait au
chargement, combien de temps prend le rapport mensuel, combien de messages ont été envoyés hier.
Pas besoin de cliquet ni de budget par chemin. Ce qu'il faut, c'est que le chiffre ait une commande
derrière lui.

**La tâche.**

1. Choisissez une hypothèse. Dans Turnera, une bonne : « l'agenda du jour fait une requête à la
   base par rendez-vous affiché » (la classique boucle N+1). Si elle n'est pas vraie, tant mieux :
   vous verrez comment on vérifie une hypothèse fausse.
2. Collez :

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

   Vous lui demandez le compteur dans le dépôt, le test du compteur, de demander ce qui lui manque
   au lieu d'approximer, de marquer l'approximatif, le chiffre avec la commande, l'audit dans les
   deux sens, et l'ordre : d'abord mesurer, ensuite proposer.

3. Lancez vous-même la commande qu'il vous a donnée. Elle doit vous donner le même chiffre. Pas
   besoin de comprendre le script ; il faut l'exécuter.
4. Si l'hypothèse était vraie et que l'agent propose de la corriger, demandez un budget :

> Set the budget for [queries] on this path at the measured value plus a small margin, and
> protect it with a test that fails if it is exceeded. Tell me the number and the margin.

   Ainsi, si quelqu'un remet la boucle dans trois mois, la batterie le détecte.

5. Ajoutez au contrat la règle cinq, pour quand un plan apporte des chiffres :

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before executing a plan that asserts
> numbers, verify every number with the meter. If any does not match, stop and tell me; do not
> execute on a wrong number."

**Vérification de complétude.** Avez-vous lancé le compteur et obtenu la même chose ? A-t-il un
test, contre quel cas connu ? Y a-t-il un chiffre dans le rapport sans compteur derrière ?
L'approximatif est-il marqué ? Y a-t-il un budget avec test ?

**Livrable.** Un compteur dans le dépôt avec son test, un chiffre avec sa commande et sa date dans
`docs/STATUS.md` ou dans l'élément, et (le cas échéant) un budget protégé par un test.

**Erreurs typiques.** Accepter le chiffre sans lancer la commande : la moitié de la valeur de cette
leçon est que vous la lanciez. Un compteur qui donne zéro : ce n'est presque jamais zéro ; presque
toujours il ne voit pas quelque chose. Et laisser l'agent « corriger pendant qu'il mesure » :
l'ordre est la méthode.

**Dans le projet-guide.** Le compteur de Turnera est un script qui charge un jour avec 10, 50 et
200 rendez-vous dans une base de test, ouvre l'agenda de ce jour en comptant les requêtes, et écrit
les trois chiffres. Le test du compteur vérifie qu'avec 0 rendez-vous il compte exactement les
requêtes de base (disons, 2). S'il y avait une boucle, les chiffres sont 12, 52 et 202 ; on corrige,
ils deviennent 3, 3 et 3, et le budget est fixé à 4 avec un test qui échoue si l'agenda fait plus
de 4 requêtes quel que soit le nombre de rendez-vous.

### Leçon 10 — Vérification honnête et rapport proportionné

**Ce que vous devez comprendre.** Si vous n'allez pas lire de code, le rapport de l'agent doit être
fiable, et cela ne se produit pas tout seul. Le modèle a été entraîné pour être utile et complet,
et un rapport qui dit « ceci, je n'ai pas pu le vérifier » semble moins utile qu'un rapport qui dit
« fait ». Il faut donc **demander explicitement** les mauvaises nouvelles, les angles morts et ce
qu'il n'a pas fait. Si vous ne le demandez pas, il ne le donne pas ; non parce qu'il le cache, mais
parce qu'il ne le considère pas comme faisant partie de la réponse.

La structure qui le rend honnête, ce sont trois blocs : **vérifié** (avec la preuve à côté),
**supposé** (ce qu'il pense qui fonctionne et pourquoi il ne l'a pas testé), et **angles morts**
(ce qu'il ne peut pas voir d'où il est). Et une règle : les mauvaises nouvelles d'abord.

**La tâche.**

1. Ajoutez au contrat la routine de rapport :

> Add this routine to `docs/WORKING_AGREEMENT.md`: "When you report, separate three blocks:
> VERIFIED (what you tested, with the command and its output), BELIEVED (what you think works but
> did not test, and why not), and BLIND SPOTS (what you cannot see from where you are: another
> environment, real data, the user's browser). Cover every item I asked for, one by one, even when
> the answer is 'I did not do it'. No claim without its proof next to it. Do not say 'done': say
> what is done and how you know it. If something went wrong, say it first."

2. Demandez-lui de clore l'élément suivant et lisez le rapport avec la liste de vérification
   ci-dessous. La première fois, presque sûrement, le bloc « angles morts » sera vide.
   Demandez-lui : « que ne peux-tu pas voir d'où tu es ? ». Il doit y avoir quelque chose (votre
   navigateur, l'environnement de production, les vraies données). S'il insiste sur rien, insistez
   vous aussi.
3. Pratiquez le « toujours cassé ». Demandez quelque chose de petit, vérifiez dans l'environnement
   de test, et si pour une raison quelconque vous ne voyez pas le changement (c'est courant : le
   déploiement prend du temps, ou n'a pas été fait), dites-lui « toujours cassé » et collez :

> Before diagnosing again, compare the version running where I see the problem with the version
> that contains your fix. Tell me both. If they differ, the problem is publication, not code.

   La moitié des « toujours cassé » sont des correctifs qui sont dans le dépôt et pas là où vous
   regardez. Cette clause vous épargne des heures.

**Vérification de complétude.** Les trois blocs sont-ils là ? Avez-vous choisi une affirmation de
« vérifié » au hasard, sa preuve est-elle à côté, et avez-vous pu la reproduire ? Couvre-t-il chaque
point que vous avez demandé ? Les mauvaises nouvelles sont-elles au début ? A-t-il dit « fait »
tout court à un moment ?

**Livrable.** La routine dans le contrat et trois rapports consécutifs avec les trois blocs, dont
un avec un angle mort réel.

**Erreurs typiques.** Ne lire que le bloc « vérifié » et sauter les deux autres : les deux autres
sont ceux qui vous protègent. Accepter « ça devrait fonctionner » dans « vérifié » : c'est du
« supposé » déguisé. Et s'habituer à des rapports de plus en plus longs : un rapport gonflé couvre
quelque chose avec du volume.

**Dans le projet-guide.** Un bon rapport de clôture de PND-004 (annuler un rendez-vous) dans
Turnera : « VÉRIFIÉ : le test d'annulation passe (1/1, prouvé en rouge contre la version qui
supprimait) ; régression 6/6 ; dans l'environnement de test, le rendez-vous 17 du 3 novembre
figure annulé par 'reception1' à 10 h 42 (capture). SUPPOSÉ : le rapport mensuel comptera bien les
annulations, mais je ne l'ai pas testé parce que le rapport est PND-011 et n'existe pas encore.
ANGLES MORTS : je ne peux pas voir à quoi ressemble l'état 'annulé' sur le téléphone de la
réceptionniste ; testez-le vous-même. »

---

## Phase d'exploitation : leçons 11 à 15

Ces cinq leçons sont celles qui transforment « ça marche » en « ça peut être soutenu ». Elles se
font quand le premier bloc de fonctionnalité est construit avec la boucle, et avant que le système
agisse sur le monde (envoie des messages, encaisse) ou ait de vrais utilisateurs. Dans le
projet-guide, c'est le moment d'ajouter les rappels et l'acompte, et c'est pourquoi la leçon 12
(verrous) vient avant de construire ces fonctionnalités, pas après.

### Leçon 11 — L'audit périodique comme intrant du plan

**Ce que vous devez comprendre.** De temps en temps il faut regarder le système entier avec un œil
neuf, et ce qu'on voit ne va pas dans un rapport qu'on archive : cela va dans la liste des éléments
en attente. L'important, c'est « œil neuf » : celui qui audite ne doit pas être celui qui a
construit, parce qu'il partage ses présupposés. Un modèle qui a construit un module « sait » que le
mot de passe écrit dans le code était provisoire ; un modèle qui le voit pour la première fois le
signale comme ce qu'il est. Pas besoin d'une autre entreprise : **une autre session, avec un autre
fichier d'instructions, qui n'a pas participé** suffit.

**La tâche.**

1. Ouvrez une nouvelle session de l'agent dans une copie propre du dépôt (clonez-le dans un autre
   dossier). Si votre outil le permet, donnez-lui un fichier d'instructions différent, qui dise
   seulement « tu es un auditeur ; tu n'as pas construit ce système ». Donnez-lui un accès en
   lecture seule à l'environnement de test.
2. Collez :

> Audit this system for [integrity, security, performance and code quality]. Read-only: change
> nothing except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires
> access you lack (the database, the log, an environment), tell me and mark that part as not
> audited; do not pass it as fine. Go through all of the code, not a sample. For every finding:
> where it is (file and line), what the risk is, what evidence proves it (the command, the
> query, the number), and its priority: P0 must be fixed now, P1 soon, P2 when possible. Give a
> grade to every dimension you audited. End with the list of P0 findings turned into proposed
> pending items. Reply in my language.

   Vous lui demandez la lecture seule, de déclarer ce qu'il n'a pas pu auditer au lieu de
   l'approuver par omission, tout le code et non un échantillon, chaque constat avec emplacement,
   risque, preuve et priorité, des notes par dimension, et les P0 déjà comme éléments proposés.

3. Lisez le rapport. Choisissez deux constats et demandez à l'auditeur de vous montrer la preuve
   (la commande, la ligne). Il doit pouvoir.
4. Revenez à la session du constructeur et collez :

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.

5. Répétez cette leçon avant le premier déploiement en production (leçon 13) et, ensuite, tous les
   un ou deux mois.

**Vérification de complétude.** Le rapport dit-il ce qu'il n'a PAS pu auditer ? Deux constats au
hasard ont-ils fichier, ligne et preuve reproductible ? Chaque P0 a-t-il son élément ouvert ? Les
notes pourront-elles être comparées avec le prochain audit ? Est-ce une session différente de celle
qui a construit qui a audité ?

**Livrable.** `docs/AUDIT_[date].md` et les éléments P0/P1 ouverts.

**Erreurs typiques.** Auditer avec la même session qui a construit : elle confirmera ses propres
présupposés. Accepter un rapport sans aucun P0 dans un système de plus d'un mois : c'est presque
toujours faux. Et archiver le rapport sans ouvrir les éléments : là l'audit n'a servi à rien.

**Dans le projet-guide.** Le premier audit de Turnera trouve généralement : des données de
patients dans le journal (téléphones imprimés à l'envoi des messages : P0) ; la recherche de
patients par nom sans index (P1, ça se sentira à 5 000 patients) ; le formulaire de rendez-vous qui
ne valide pas que la date est future (P1) ; et une dépendance avec une vulnérabilité connue (P1).
Quatre nouveaux éléments, tous avec fichier et ligne.

### Leçon 12 — Fail-closed, verrous et zéro dommage silencieux

**Ce que vous devez comprendre.** Le logiciel, par défaut, continue en cas de doute : si la
validation échoue, le code continue ; si le service ne répond pas, on suppose que tout va bien.
C'est « fail-open », comme une porte qui s'ouvre quand le courant est coupé. La méthode inverse le
défaut : **en cas de doute, non**. Toute action à conséquence (facturer, envoyer, supprimer,
approuver) porte un verrou, a un chemin de retour écrit, et toute nouvelle automatisation démarre en
mode à blanc, en journalisant ce qu'elle aurait fait, jusqu'à ce que vous l'activiez.

Cette leçon vient **avant** de construire les fonctionnalités qui agissent sur le monde. Dans
Turnera, avant les rappels et l'acompte.

**La tâche.**

1. Écrivez `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` avec le propriétaire : ce que le système fait ou
   fera qui facture, envoie, approuve, supprime ou avertit quelqu'un à l'extérieur ; ce qui se passe
   si on le fait deux fois ; ce qui se passe si on le fait mal ; comment on l'annule.
2. Collez :

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock. Reply in my language.

   Vous lui demandez de comparer ce que le métier a dit avec ce que fait le code (c'est là
   qu'apparaissent les actions dont personne ne se souvenait), que les différences soient
   demandées, et pour chaque action la réversibilité, le verrou et le chemin de retour, avec la
   règle du fail-closed écrite.

3. Confirmez verrou par verrou. Clôturez avec :

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.

4. Construisez maintenant les fonctionnalités à conséquence (les rappels, l'acompte) avec la boucle
   des leçons 5 à 10, et laissez-les en mode à blanc. Regardez pendant quelques jours le journal
   des « aurait envoyé » avant d'activer l'envoi réel.

**Vérification de complétude.** Chaque action qui facture, envoie, approuve ou supprime est-elle
dans le tableau ? Chaque verrou a-t-il son test en rouge ? Toute action irréversible a-t-elle un
chemin de retour écrit ? Les nouvelles automatisations ont-elles démarré en mode à blanc et
avez-vous vu le journal avant de les activer ?

**Livrable.** `docs/LOCKS.md`, un test par verrou prouvé en rouge, et les automatisations en mode à
blanc avec leur journal.

**Erreurs typiques.** Activer l'envoi réel « pour tester avec un message vers mon propre
téléphone » : le mode à blanc existe justement pour cela. Un verrou qu'on contourne avec un
paramètre « pour les tests » : ce paramètre restera activé en production. Et ne pas regarder le
journal des « aurait fait » : c'est la seule fenêtre pour voir une erreur avant qu'elle n'atteigne
un patient.

**Dans le projet-guide.** Le tableau des verrous de Turnera : envoyer un rappel (non réversible ;
verrou : idempotence par rendez-vous, un seul envoi par rendez-vous et canal, limite de 200 par
jour, mode à blanc d'abord ; retour : aucun, d'où la limite) ; encaisser un acompte (réversible avec
remboursement ; verrou : confirmation explicite de la réceptionniste, montant fixé par le
praticien ; retour : remboursement par le prestataire de paiement) ; annuler un rendez-vous
(irréversible pour le patient ; verrou : confirmation et enregistrement de qui ; retour : recréer le
rendez-vous) ; supprimer un patient (irréversible ; verrou : double confirmation, responsable
uniquement, et seulement s'il n'a pas de rendez-vous futurs ; retour : aucun, d'où le double).
Chaque verrou avec un test qui montre que, sans le verrou, l'action avait lieu.

### Leçon 13 — Intégration continue, environnements, secrets et déploiement comme partie du produit

**Ce que vous devez comprendre.** Arriver en production doit être un paquet reproductible : les
tests tournent **une** fois, le déploiement ne fait qu'empaqueter et téléverser, la configuration
vit sur le serveur et pas dans le dépôt, il y a une procédure pour promouvoir de test en production
qui peut être lancée deux fois, et le retour arrière est **testé** (un retour arrière jamais testé
n'existe pas). Sur les secrets, une règle sans exception : **un secret qui a été vu dans un chat, un
journal ou un commit n'est plus un secret** ; on le renouvelle, point.

Vous avez déjà une bonne partie de cela depuis le squelette (leçon 4). Cette leçon le complète vers
la production.

**La tâche.**

1. Complétez `docs/ENVIRONMENTS_SURVEY.md` avec ce qui manque pour la production : le domaine, où
   vivront les secrets, combien de quota d'intégration continue vous avez (si vous utilisez GitHub
   Actions, regardez la limite de votre forfait : l'un des systèmes d'origine l'a brûlée en lançant
   les tests trois fois par commit).
2. Collez :

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

   Vous lui demandez les accès avant de commencer, les tests une seule fois par commit, le
   déploiement qui ne fait qu'empaqueter, la configuration dehors, la promotion répétable, le retour
   arrière testé, le verrou contre les secrets, et la documentation pour une personne.

3. Avant le premier déploiement en production, faites l'audit de la leçon 11 si vous ne l'avez pas
   fait.
4. Ajoutez au contrat la routine de déploiement :

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before touching production: the test
> environment is green with the same version; the rollback is ready; and tell me what changes in
> the configuration. After deploying: show me the version running in production and an
> end-to-end check on production, read-only."

5. Faites le premier déploiement en production, avec le système encore sans vrais utilisateurs. Et
   ensuite **testez le retour arrière** : demandez-lui de revenir à la version précédente et de vous
   montrer qu'elle tourne, puis de revenir à la nouvelle.
6. Si à un moment du cours vous avez collé un secret dans le chat (une clé d'API, un mot de passe),
   collez :

> That secret is compromised: rotate it now, tell me everywhere else it was used, and add the
> check that would have caught it.

**Vérification de complétude.** Combien de fois la batterie tourne-t-elle par commit ? (une ;
demandez le lien). Y a-t-il une valeur de configuration réelle dans le dépôt ? (demandez la
recherche vide). Pourriez-vous suivre `docs/DEPLOYMENT.md` seul ? Le retour arrière a-t-il été
testé, quand, avec quelle preuve ? Tout secret apparu dans le chat a-t-il été renouvelé ? Savez-vous
combien de quota d'intégration continue il vous reste ?

**Livrable.** L'intégration continue une fois par commit, le déploiement qui ne fait
qu'empaqueter, `docs/DEPLOYMENT.md`, le retour arrière testé, le verrou anti-secrets actif, et le
système tournant en production (sans utilisateurs encore).

**Erreurs typiques.** Le déploiement « à la main, vite, parce que c'est un petit changement » :
les petits changements sont ceux qui cassent la production, parce que personne ne les teste. Le
fichier d'exemple de configuration avec des valeurs qui semblent réelles (elles le sont). Et ne pas
tester le retour arrière jusqu'au jour où vous en avez besoin.

**Dans le projet-guide.** Pour Turnera, l'intégration continue lance la batterie (une trentaine de
tests à ce stade, y compris ceux de bout en bout) à chaque push ; le déploiement en test est
automatique à la fusion dans `main` ; la promotion en production est une commande qui empaquette
la version qui est en test et la téléverse, avec la configuration (la clé du prestataire de
messagerie, celle du prestataire de paiement, l'URL de la base) dans un fichier d'environnement sur
le serveur qui n'est pas dans le dépôt. Le retour arrière est la même commande avec la version
précédente. Et le verrou anti-secrets est une vérification à chaque commit qui rejette tout ce qui
ressemble à une clé.

### Leçon 14 — Documentation vivante et manuels qu'une personne peut suivre sans IA

**Ce que vous devez comprendre.** Le système doit pouvoir être utilisé, maintenu et récupéré sans
l'agent et sans vous. Le critère pour le manuel de reprise est concret : **une personne de
confiance qui ne programme pas doit pouvoir le suivre, à trois heures du matin, avec le système en
panne et l'agent hors ligne**. Si une étape dit « consulter le développeur », elle est incomplète.
Et comme régénérer de la documentation avec un modèle est gratuit, la règle devient « dans le même
commit » : chaque changement qui touche ce que l'utilisateur voit, ce que l'opérateur fait ou la
façon de déployer met à jour le manuel dans le même commit.

**La tâche.**

1. Ajoutez la routine au contrat :

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Every change that modifies what the user
> sees, what the operator does, or how the system is deployed, updates the corresponding manual in
> the same commit. If you do not know which manual, ask."

2. Collez :

> Generate three manuals from the system as it is today in the test environment: the user
> manual (screen by screen, with real screenshots, in the user's language, no jargon); the
> maintenance manual (how it is built, where everything is, how to run the test suite, how to
> add a module); and the infrastructure and recovery manual (how to deploy, how to roll back,
> how to restore a backup, what to do if it goes down; written for a person who has to do it by
> hand, without AI, at three in the morning). If for any section you need something only the
> business knows (who is responsible for what, which phone number to call), ask me; do not leave
> a gap and do not invent. Each manual carries a date and the system version. Reply in my
> language.

   Vous lui demandez les trois manuels avec de vraies captures, le critère des trois heures du
   matin pour celui de reprise, qu'il demande ce que seul le métier sait au lieu de laisser des
   trous, et date et version.

3. Le vrai test : donnez le manuel de reprise à quelqu'un qui ne programme pas (le propriétaire, un
   proche) et demandez-lui de suivre la section « c'est tombé » dans l'environnement de test. Là où
   il bloque, il faut corriger le manuel.
4. Après le prochain changement d'écran, vérifiez que le commit a touché le manuel utilisateur.

**Vérification de complétude.** Une capture au hasard correspond-elle à l'environnement de test
d'aujourd'hui ? Quelqu'un qui ne programme pas a-t-il pu suivre la section « c'est tombé » ? Le
dernier commit qui a changé un écran a-t-il touché le manuel ? Y a-t-il des trous du type « [à
compléter] » ? Chaque manuel dit-il pour quelle version il vaut ?

**Livrable.** Les trois manuels avec date et version, et le test avec une personne fait.

**Erreurs typiques.** Générer les manuels une fois et ne pas mettre la routine dans le contrat :
dans deux mois ils ont des captures d'écrans qui n'existent plus. Un manuel de reprise qui commence
par « ouvrir une session avec l'agent ». Et ne pas faire le test avec une personne : c'est la seule
vérification qui compte.

**Dans le projet-guide.** Le manuel utilisateur de Turnera a six écrans avec capture ; celui de
maintenance explique où est chaque module et comment lancer la batterie ; et celui de reprise dit,
dans l'ordre, avec les commandes : comment savoir si le système est tombé, comment le redémarrer,
comment revenir à la version précédente, comment restaurer la base depuis la dernière sauvegarde
(faite chaque nuit : cela aussi sort de cette leçon), et qui appeler. La responsable l'a suivi dans
l'environnement de test et a bloqué à « restaurer la base » parce que la commande supposait un
dossier qu'elle n'avait pas ; le manuel a été corrigé.

### Leçon 15 — L'agent dans le système, et la rétrospective chiffrée

**Ce que vous devez comprendre.** Deux choses ferment le cycle. La première est facultative :
laisser l'agent résident en production, avec un périmètre borné, pour diagnostiquer et assurer le
support sans que vous soyez là. La règle qui l'ordonne est qu'**il agit au nom de quelqu'un** : son
identifiant est rattaché à une personne responsable, et tout ce qu'il fait est journalisé au nom de
cette personne ; ce n'est pas un compte anonyme, c'est un employé avec un chef. La seconde est
obligatoire : la rétrospective chiffrée. Ce que ça a coûté, combien d'éléments, lesquels ont tourné
en rond, quels incidents il y a eu et dans quel échelon ils tombent, et **au moins un changement
proposé à l'échelle**. Une rétrospective qui ne change rien n'était pas une rétrospective.

**La tâche (agent résident, le cas échéant).**

1. Décidez avec le propriétaire si le système a besoin d'un agent résident. Dans Turnera, oui : les
   réceptionnistes auront des questions (« pourquoi ce patient n'a-t-il pas reçu le rappel ? ») que
   l'agent peut résoudre en lisant le journal, sans que personne n'appelle le développeur.
2. Collez :

> We are going to leave you resident in production. First, build the map of the system you will
> need in order to operate it: modules, environments, where each configuration lives, which
> actions are consequential (read `docs/LOCKS.md`), whom to notify. If there are parts of the
> system you cannot see from where you are, tell me; the map must not have hidden gaps. Then
> propose your scope in three levels: read-only and diagnosis; configuration changes with my
> approval; consequential actions behind locks. I choose the level. Your credential acts as the
> person who created it: everything you do is logged under that person's name. Reply in my
> language.

   Vous lui demandez la carte avant d'exploiter, que les trous de la carte soient déclarés, trois
   niveaux de périmètre pour que vous en choisissiez un, et l'identifiant au nom d'une personne.

3. Choisissez le niveau (pour commencer, toujours le premier : lecture seule et diagnostic).
   Clôturez avec :

> Level [1: read-only and diagnosis]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the
> credential (never its value), and the procedure to request my approval. Then prove, with a real
> attempt recorded in the log, that something outside your scope is rejected.

**La tâche (rétrospective, toujours).**

4. Rassemblez les chiffres que vous seul avez : combien d'heures vous y avez consacrées, combien
   vous avez dépensé dans l'outil d'IA, combien de quota d'intégration continue vous avez utilisé.
5. Collez :

> [The project] is over. Do the retrospective with numbers, not impressions: what it cost
> (tokens, quota, my time), how many pending items, which ones took the most rounds and why,
> which incidents happened and which step of the ladder each falls into, and which step failed
> or was missing. If you lack the data for any figure (my time, for instance), ask me for it or
> mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder:
> which step is modified, how, and which incident justifies it. Write it to
> `docs/RETROSPECTIVE_[date].md`. Reply in my language.

   Vous lui demandez des chiffres sourcés, chaque incident rapporté à un échelon (un incident qui ne
   tombe dans aucun est un échelon manquant), qu'il vous demande les chiffres qu'il n'a pas, et une
   proposition concrète de changement de l'échelle.

6. Lisez la proposition de changement. Si elle vous semble valable, envoyez-la au dépôt d'Urazuke
   comme proposition d'amélioration (voir `CONTRIBUTING.md`) : c'est ainsi que la méthode apprend de
   chaque projet.

**Vérification de complétude.** La carte dit-elle ce que l'agent ne peut PAS voir ? Avez-vous vu
dans le journal qu'une action hors périmètre est rejetée ? L'identifiant agit-il au nom d'une
personne ? La rétrospective a-t-elle des chiffres sourcés, ou des adjectifs ? Chaque incident
tombe-t-il dans un échelon ? Y a-t-il au moins une proposition concrète de changement ?

**Livrable.** `docs/RESIDENT_AGENT.md` (le cas échéant) et `docs/RETROSPECTIVE_[date].md`.

**Erreurs typiques.** Donner à l'agent résident un niveau élevé « pour qu'il puisse tout
résoudre » : commencez par la lecture seule et montez quand il y a des preuves. Une rétrospective
qui dit que tout s'est bien passé : rien ne se passe jamais entièrement bien ; elle est écrite pour
vous, pas pour la méthode. Et ne pas envoyer la proposition de changement : l'échelon 15 se clôt
quand l'échelle change, pas quand le document s'écrit.

**Dans le projet-guide.** La rétrospective de Turnera, dans un cours typique : six semaines, une
quarantaine d'heures de l'élève, vingt-huit éléments, ceux qui ont le plus tourné en rond étaient
ceux des messages (fuseaux horaires et le prestataire WhatsApp) ; deux incidents, l'un à
l'échelon 8 (l'état « absent » existait dans l'écran et pas dans le serveur) et l'autre au 13 (un
déploiement en production avec la configuration de test, détecté par la vérification de bout en
bout après le déploiement). Proposition de changement : que la routine de déploiement de
l'échelon 13 exige de montrer la différence de configuration entre test et production avant de
promouvoir, pas seulement « ce qui change ».

---

## La liste de mise en production

Quand les seize leçons sont faites, le système satisfait à cette liste. C'est la définition
opérationnelle de « production grade » dans Urazuke, et elle peut servir de liste de vérification
finale, avec le propriétaire, sans ouvrir le code :

1. Il y a une fiche d'éligibilité avec décision, date et nom (E0).
2. Il y a un contrat de collaboration que l'agent lit à chaque session, et on a testé qu'il le lit
   (E1, E2).
3. Le fichier de projet se lit en cinq minutes et dit ce que le système N'EST PAS (E2).
4. Il y a un dimensionnement avec des données primaires sourcées, des dérivées avec calcul, et le
   scénario « fois dix » (E3).
5. Le squelette a été déployé vide, et le déploiement a été lancé deux fois (E4).
6. Tout changement a son élément en attente, et tout élément clos a sa preuve (E5).
7. Toute règle métier a un propriétaire, une date et des mots textuels (E6).
8. Tout test important a été vu en rouge avant le vert ; il y a des tests de bout en bout qui
   vérifient le backend depuis l'écran (E7).
9. Toute liste a un seul propriétaire ; il y a une carte producteur/consommateur ; il y a un
   registre d'anti-patrons avec vérification automatique (E8).
10. Tout chiffre qui a décidé de quelque chose a un compteur avec test que vous pouvez lancer (E9).
11. Tout rapport sépare vérifié, supposé et angles morts (E10).
12. Il y a eu au moins un audit par une session différente, et ses P0 sont des éléments en attente
    (E11).
13. Toute action à conséquence a un verrou avec test en rouge et un chemin de retour ; les
    automatisations sont passées par le mode à blanc (E12).
14. Les tests tournent une fois par commit ; la configuration est hors du dépôt ; le retour arrière
    a été testé ; aucun secret ne vit dans le dépôt ni dans le chat sans rotation (E13).
15. Il y a trois manuels avec date et version, et une personne qui ne programme pas a suivi celui de
    reprise (E14).
16. Il y a une rétrospective chiffrée et une proposition de changement de l'échelle (E15).

Si les seize donnent « oui », le système est prêt à être mis en service. Si l'une donne « non »,
vous savez déjà quel échelon regravir.

---

## Annexe A — Comment évaluer (pour qui donne le cours ou s'auto-évalue)

Une grille simple, par leçon, avec trois niveaux :

- **Non gravi** : le livrable manque, ou une vérification de complétude donne « non ».
- **Gravi** : le livrable existe et toutes les vérifications donnent « oui ».
- **Gravi avec preuve de jugement** : en plus, l'élève peut raconter un cas où l'agent a mal fait
  quelque chose dans cette leçon (supposé, inventé, surdéclaré) et comment il l'a détecté. C'est le
  véritable objectif du cours : pas l'artefact, mais le réflexe.

Ce qui n'est pas évalué : la qualité du code. Personne ne le lit. On évalue la qualité de la preuve.

## Annexe B — Adaptation du cours à chaque outil

Les prompts sont les mêmes dans n'importe quel outil. Ce qui change, c'est où vont les routines qui
dans le cours s'ajoutent à `docs/WORKING_AGREEMENT.md` :

- Dans **Claude Code**, les routines vont dans le `CLAUDE.md` du projet (ou on y inclut le
  contrat), et elles se lisent d'elles-mêmes à chaque session.
- Dans **Cursor**, elles vont dans `.cursor/rules/`, comme règles toujours actives.
- Dans **Codex CLI** ou **Gemini CLI**, dans `AGENTS.md` ou `GEMINI.md` à la racine.
- Dans **Forge**, le contrat et les routines sont des doctrines, et les prompts d'échelon
  s'injectent d'eux-mêmes au franchissement de chaque porte ; le registre des éléments en attente
  est natif. Le cours avec Forge est le même cours avec moins de copier-coller.

Le test de lecture de la leçon 2 vaut pour tous : si une nouvelle session ne sait pas ce que le
système NE fait PAS, l'outil ne charge pas le fichier où vous avez mis le contrat.

## Annexe C — Ce que ce manuel n'a pas encore

- Une promotion qui l'ait suivi. Les durées, les erreurs typiques et le projet-guide sont écrits à
  partir des trois systèmes d'origine, pas à partir d'élèves. La première promotion les corrigera
  (et c'est, littéralement, l'échelon 15 appliqué au cours).
- Les poids des critères d'éligibilité (leçon 0), qui sont en cours d'élaboration.
