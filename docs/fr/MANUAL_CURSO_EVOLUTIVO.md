# Urazuke — le cours, partie 2 : le projet hérité. Normaliser un système qui n'est pas né avec la méthode, puis le faire évoluer

Auteur : Pablo Kuschniroff, assisté par Claude Code. Version 1, 18 octobre 2026. Ceci est la
deuxième partie du [manuel du cours](MANUAL_CURSO.md) : elle tient pour acquis que vous avez fait
la première, ou au moins que vous avez lu les leçons 0 à 7, parce qu'ici je ne réexplique pas ce
qu'est un élément en attente, un test au rouge ou un arbre sémantique. La méthode de cette partie
est dans la page du [chemin évolutif-correctif](EVOLUTIVO_CORRECTIVO.md) ; ici il y a la pratique,
avec un second projet-guide. Les mots étranges, dans le glossaire du document principal ; les cas
réels, dans les [références](REFERENCIAS.md). Dépôt public :
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## Avant de commencer

### À qui s'adresse cette partie

À celui qui a fait la première partie et a découvert que, dans la vraie vie, on ne lui donne
presque jamais un dossier vide. On lui donne un système qui tourne déjà, avec des utilisateurs qui
en dépendent, et on lui demande « répare ça » ou « ajoute-lui ceci ». Et aussi à celui qui a
« vibecodé » quelque chose il y a quelques mois, que ça a marché, et qui doit maintenant continuer
à construire dessus sans que ça lui tombe sur la tête. Les deux sont au même endroit : avec un
legacy, même si l'un des deux l'a écrit lui-même.

### Ce que vous aurez à la fin

Le même système dont vous avez hérité, faisant la même chose qu'il faisait, mais avec tout ce que
la méthode tient pour acquis autour de lui : un contrat de collaboration avec les règles du
legacy, la carte récupérée du système avec les marques d'où sort chaque affirmation, la liste des
divergences entre ce que le code fait et ce que le métier croit, un audit converti en file de
travail avec des marques de vitesse, un environnement de test avec des données anonymisées, un
déploiement qui se répète, les secrets hors du code et rotés, une batterie de caractérisation qui
surveille les flux critiques, des verrous sur ce qui agit déjà sur le monde, le dimensionnement
avec des chiffres mesurés, et une file où la dette et la demande du client cohabitent, appariées
par module. Et ensuite, le premier bug corrigé avec son test au rouge et la première
fonctionnalité nouvelle construite avec la méthode complète.

### Le calendrier de cette partie

| Semaine | Leçons | Ce que vous faites en plus |
|---|---|---|
| 1 | N0, N1, N2, N3 | **Lecture.** Rien ne se change. Vous parcourez l'arbre récupéré avec le propriétaire, vous décidez les divergences une par une, vous lisez l'audit. À la clôture : la carte et l'inventaire de la dette. |
| 2 | N4, N5 | **La ceinture.** Environnement de test avec des données anonymisées, déploiement deux fois, secrets rotés, batterie de caractérisation avec son rouge par mutation. Verrous confirmés sur ce qui agit déjà. À la clôture : le système tourne en test et la batterie est au vert. |
| 3 | N6, N7, R1 | **Mesurer, ordonner, corriger.** Dimensionnement mesuré. La file avec les deux marques. Le premier bloc : le bug connu, clos en mode correctif avec ses appariés. |
| 4 | R2 | **Évoluer.** Le second bloc : la fonctionnalité nouvelle, construite avec la méthode complète (leçons 5 à 10 de la première partie), avec la caractérisation comme régression. |
| 5 et 6 | 11, 12, 13, 14, 16, 17, 18, 19 de la première partie | **Mise en production.** Audit périodique, verrous restants, clôture du chemin vers la production, les trois manuels (que le legacy n'avait pas), et les quatre échelons de qualité opérationnelle préalables au déploiement : observabilité complète, persistance avec ce que N6 a mesuré, scan de vulnérabilités comme porte, test de charge avec le point de rupture. |
| 7 | 15, 20, 21 de la première partie | **Exploitation.** Les deux supervisions montées dans la semaine du déploiement, avec la première lecture comme ligne de base du legacy ; agent résident ; rétrospective avec la question propre au legacy : combien a coûté la normalisation. |

### Le projet-guide : « Turnera héritée »

C'est le même cabinet que dans la première partie, deux ans plus tard et dans une autre ligne de
temps : ils n'ont jamais fait Turnera avec la méthode. À la place, le neveu de la responsable leur
a fait en un été une application web, « Turnos », qui fonctionne depuis. Aujourd'hui deux
réceptionnistes et trois praticiens s'en servent tous les jours, il y a quelque vingt mille
rendez-vous enregistrés, et personne ne la comprend en entier : le neveu est parti vivre à
l'étranger et répond à un message toutes les deux semaines.

**Ce qu'il y a.** Un dépôt sur GitHub avec le code (une seule branche, des commits avec des
messages du genre « corrections »), une base de données sur le même serveur où tourne
l'application, le déploiement à la main en copiant les fichiers par FTP, le mot de passe de la
base écrit dans le code, aucun test, un processus programmé sur le serveur qui envoie les rappels
toutes les nuits, et une feuille de calcul que la responsable télécharge tous les mois en se
connectant à la base avec un outil de bureau. Il y a une copie de sauvegarde « automatique » que
personne n'a jamais restaurée.

**Ce qui fait mal.** Deux choses. La première, un bug : parfois un patient reçoit le rappel deux
fois, et parfois aucune ; la responsable ne sait pas quand cela arrive, mais elle a des captures
de patients qui se plaignent. La seconde, ce qui manque : ils veulent demander un acompte par lien
de paiement pour certains rendez-vous, et ils veulent voir combien de rendez-vous, d'absences et
d'annulations il y a eu dans le mois sans télécharger la feuille de calcul.

**Le propriétaire.** La même responsable : du jugement sur le métier, quinze minutes par jour,
elle ne lit pas de code. Et une nouveauté qui compte : elle croit que le système fait des choses
qu'il ne fait pas, et elle ignore des choses que le système fait bel et bien. C'est normal dans un
legacy, et c'est ce que la leçon N2 va mettre au jour.

**Les flux critiques**, dans ses mots : « j'enregistre un rendez-vous », « j'annule un
rendez-vous », « le rappel lui arrive », « je cherche un patient », « je télécharge la feuille du
mois ». Il y en a cinq ; ce sera la batterie de caractérisation.

Avec cela, on a de quoi démarrer. Tout le reste est dans le système, et c'est l'agent qui va le
lire.

---

## Tronçon de normalisation : leçons N0 à N7

Ces huit leçons sont le tronçon que la première partie n'avait pas. Les quatre premières sont de
lecture : rien ne se change, et la tentation de changer quelque chose sera énorme. Les deux
suivantes montent la ceinture. Les deux dernières mesurent et ordonnent. C'est seulement ensuite
qu'on touche à la fonctionnalité.

### Leçon N0 — Éligibilité d'un système existant

**Ce que vous devez comprendre.** Les deux critères excluants sont les mêmes qu'à la leçon 0, mais
ici X2 (écrans pilotables par programme) se répond écran par écran, et si l'un d'eux est au rouge
ce n'est pas un motif de ne pas commencer : c'est le premier élément en attente, et il bloque. On
ajoute quatre critères propres au legacy : s'il y a quelqu'un qui sache comment ça marche, si la
production peut se consulter en lecture seule, s'il existe un test, et si la sauvegarde a déjà été
restaurée une fois. Le dernier est celui que presque tout le monde découvre au rouge.

**Avant d'envoyer le prompt**, de vos mains :

- `docs/INITIAL_SURVEY.md`, court : ce que fait Turnos et pour qui selon la responsable, ce qui
  fait mal (le rappel en double, ce qui manque), qui l'a fait et combien de temps il met à
  répondre, où il tourne, qui a accès, et qu'il y a une sauvegarde « automatique » que personne
  n'a restaurée. Une demi-page.
- `docs/ELIGIBILITY_CRITERIA.md` : la fiche de la leçon 0 avec quatre lignes de plus : quelqu'un
  qui sait, production consultable, tests existants, sauvegarde restaurée. Colonnes vides.
- Un accès en lecture au dépôt pour l'agent et, si vous l'obtenez, un identifiant en lecture seule
  sur la base, hors du chat.

1. Collez-lui :

> We are going to assess whether this existing system can be taken over with the Urazuke method.
> Read the initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`, which for an existing system adds four criteria: whether anyone
> who knows how the system works is available; whether production can be queried read-only;
> whether any automated test exists; and whether a backup exists and has ever been restored. Then
> explore the repository and, if I gave you access, the environment where it runs: change nothing.
> Fill in the sheet criterion by criterion with the answer, its source (survey, code, database,
> configuration, or inferred) and, for the exclusionary criteria X1 and X2, green or red. For X2,
> list every screen and say for each whether it can be driven by a program today and whether the
> effect can be checked in the backend. If a criterion cannot be answered from what you have, ask
> me; do not assume. Do not decide: present me the completed sheet with your reading and your
> doubts, and I will decide. Reply in my language.

> [fr]
> Nous allons évaluer si ce système existant peut être pris en charge avec la méthode Urazuke. Lis
> le relevé initial dans `docs/INITIAL_SURVEY.md` et la fiche de critères dans
> `docs/ELIGIBILITY_CRITERIA.md`, qui pour un système existant ajoute quatre critères : s'il y a
> quelqu'un de disponible qui sache comment le système fonctionne ; si la production peut se
> consulter en lecture seule ; s'il existe un test automatique ; et s'il existe une copie de
> sauvegarde et si elle a déjà été restaurée une fois. Ensuite explore le dépôt et, si je t'ai
> donné l'accès, l'environnement où il tourne : ne change rien. Remplis la fiche critère par
> critère avec la réponse, sa source (relevé, code, base, configuration, ou inféré) et, pour les
> critères excluants X1 et X2, vert ou rouge. Pour X2, liste chaque écran et dis pour chacun s'il
> peut aujourd'hui être piloté par programme et si l'effet peut se vérifier dans le backend. Si un
> critère ne peut pas être répondu avec ce que tu as, demande-le-moi ; ne suppose pas. Ne décide
> pas : présente-moi la fiche complète avec ta lecture et tes doutes, et c'est moi qui déciderai.
> Réponds dans ma langue.

   Vous lui demandez la même chose qu'à la leçon 0, plus trois choses : qu'il explore sans rien
   changer, que chaque réponse dise d'où elle sort, et que X2 se mesure écran par écran.

2. Répondez à ses questions et lisez la fiche. Regardez surtout la ligne de chaque écran dans X2.
3. Décidez.

**Avant d'envoyer le prompt** de clôture : votre décision en une ligne, et une condition qui dans
ce projet est obligatoire : restaurer la sauvegarde sur votre machine avant la leçon N4.

4. Collez-lui le prompt de clôture :

> Decision: [go under this condition: the backup is restored at least once before N4]. Write the
> final sheet to `docs/ELIGIBILITY.md` with the date, who decided, every answer with its source,
> and the conditions if any. If X2 is red for any screen, create `docs/PENDING.md` and open the
> first pending item: make every screen drivable by a program with its backend effect checkable;
> mark it as blocking. Include the questions you asked and my answers.

> [fr]
> Décision : [ça passe à cette condition : la sauvegarde est restaurée au moins une fois avant
> N4]. Écris la fiche finale dans `docs/ELIGIBILITY.md` avec la date, qui a décidé, chaque réponse
> avec sa source, et les conditions s'il y en a. Si X2 est au rouge pour un écran, crée
> `docs/PENDING.md` et ouvre le premier élément en attente : faire que tout écran puisse être
> piloté par programme avec son effet vérifiable dans le backend ; marque-le comme bloquant.
> Inclus les questions que tu as posées et mes réponses.

**Vérification de complétude.** X2 a-t-il une réponse par écran ? Les quatre critères du legacy
ont-ils une réponse avec sa source ? La sauvegarde est-elle restée comme condition avec une date ?

**Livrable.** `docs/ELIGIBILITY.md`, et si nécessaire le premier élément en attente bloquant.

**Erreurs typiques.** Répondre X2 au vert « parce que c'est du web ». Et sauter la condition de la
sauvegarde parce qu'« il y en a une automatique » : à la leçon N4 l'agent va copier la base de
production, et si quelque chose tourne mal, cette sauvegarde que personne n'a éprouvée est tout ce
qu'il y a.

**Dans le projet-guide.** L'agent découvre que sur les six écrans de Turnos, quatre peuvent être
pilotés par programme et deux non (le formulaire de rendez-vous utilise un calendrier sans
identifiants, et la recherche de patients est un champ qui ne répond pas aux événements du
clavier) ; il ouvre l'élément en attente bloquant. Il trouve le processus programmé des rappels,
que la responsable n'a pas mentionné. Il y a une sauvegarde, jamais restaurée : condition. Sur le
neveu : « disponible, toutes les deux semaines », que l'agent propose de lire comme « non
disponible », et il a raison. Ça passe, avec une condition.

### Leçon N1 — Le contrat de collaboration pour un legacy

**Ce que vous devez comprendre.** Aux six règles de la leçon 1 s'en ajoutent cinq qui existent
parce qu'un modèle face à du code d'autrui fait trois choses par réflexe : il le réordonne, il le
« répare » là où il lui semble mauvais, et il suppose que ce que le code fait autrement qu'il ne
l'attendrait est une erreur. Les règles du legacy bloquent ces réflexes : on ne refactorise pas ce
qui n'a pas été demandé, on lit avant de toucher, ce qui est étrange se note au lieu de se
réparer, le comportement actuel est la spécification jusqu'à ce que le propriétaire dise autre
chose, et rien n'entre sans la caractérisation au vert.

**Avant d'envoyer le prompt**, de vos mains :

- Vos préférences de travail, comme à la leçon 1, et une décision de plus : combien de risque vous
  acceptez pendant la normalisation. Pour le cours : l'agent peut déployer tout seul vers
  l'environnement de test ; vers la production, jamais, jusqu'à la leçon 13.
- `docs/ELIGIBILITY.md` clos.

1. Collez-lui :

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

2. Lisez les propositions. Si l'une dit « moderniser le code au fur et à mesure qu'on y touche »,
   rejetez-la avec une raison : c'est la réécriture déguisée.

**Avant d'envoyer le prompt** de clôture : votre verdict sur chaque proposition, avec une raison
d'une ligne, pour les trous du prompt.

3. Clôturez avec le prompt de clôture de la leçon 1, sans changement.

**Vérification de complétude.** Les onze règles sont-elles là, chacune avec la panne qu'elle
évite ? Y a-t-il une proposition qui autorise à refactoriser ou à réécrire ?

**Livrable.** `docs/WORKING_AGREEMENT.md` avec sa date et sa version.

**Erreurs typiques.** Accepter une règle de « nettoyage progressif » parce qu'elle sonne
raisonnable. Elle sonne raisonnable et c'est la façon dont l'agent s'autorise à changer ce qu'on
ne lui a pas demandé.

**Dans le projet-guide.** L'agent propose deux règles à lui qui valent d'être acceptées : « dans
ce système aucun envoi réel ne sort de l'environnement de test : les rappels en test vont dans une
boîte factice », et « la feuille de calcul mensuelle que télécharge la responsable est un
consommateur du système et compte comme contrat ». La seconde, c'est la carte
producteur-consommateur qui pointe avant l'heure, et c'est très bien.

### Leçon N2 — La lecture du système : la carte récupérée et les divergences

**Ce que vous devez comprendre.** C'est la leçon qui donne le plus de valeur par heure de tout le
cours. À la leçon 2, le fichier de projet et l'arbre sortaient du relevé ; ici ils sortent du
système lui-même, et chaque affirmation porte une marque d'où elle sort : `[code]`, `[base]`,
`[configuration]`, `[documentation]`, `[métier]` ou `[inféré]`. Les marques sont ce qui vous
permet de vérifier sans lire de code : vous regardez ce qui est inféré et vous le confirmez ou le
corrigez. Et un document nouveau apparaît, la liste des divergences : tout ce qui ne coïncide pas
entre ce que le code fait, ce que la base impose et ce que le métier croit. Elles ne se résolvent
pas toutes seules : chacune est une décision de votre part, avec sa date. Un legacy a toujours des
divergences ; si la liste sort vide, l'agent n'a pas comparé.

**Avant d'envoyer le prompt**, de vos mains et avec le propriétaire :

- Un accès en lecture pour l'agent à tout : le dépôt entier, le schéma de la base (en lecture
  seule, identifiant hors du chat), la configuration du serveur avec les valeurs des secrets
  masquées, les journaux récents, et ce qu'il y a de documentation (dans Turnos, un courriel du
  neveu avec « comment mettre les changements en ligne »).
- Dans `docs/INITIAL_SURVEY.md`, une section nouvelle écrite avec la responsable : **ce qu'elle
  croit que le système fait**, cas d'utilisation par cas d'utilisation, et les règles dont elle se
  souvient (« un rendez-vous ne peut pas être annulé à moins de deux heures », « le rappel part à
  huit heures du soir »). Ne le vérifiez pas contre le système : cette comparaison est le travail
  de l'agent.
- La liste de ce qui vit hors du dépôt : le processus programmé des rappels et la feuille de
  calcul mensuelle qui se connecte à la base.
- `docs/WORKING_AGREEMENT.md` clos.

1. Collez-lui :

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

   Vous lui demandez de lire tout et de déclarer ce qu'il n'a pas pu lire, le relevé et l'arbre
   avec les marques, les processus tels que le code les implémente (pas tels qu'ils devraient
   être), les processus programmés, et les divergences listées sans être résolues.

2. Parcourez l'arbre avec la responsable, nœud par nœud. Chaque `[inféré]` se confirme ou se
   corrige. Chaque `[code]` se compare à ce qu'elle croit : là où cela ne coïncide pas, il y a une
   divergence que l'agent a peut-être déjà listée, et s'il ne l'a pas listée, c'est vous qui
   l'ajoutez.
3. Décidez chaque divergence avec elle, en une ligne, avec la date. Il y a trois réponses
   possibles : « le système a raison, le métier avait oublié » (cela se confirme comme règle),
   « le système a tort, il faut le changer » (on ouvre un élément en attente), ou « je ne sais
   pas, on verra plus tard » (elle reste ouverte avec une date ; pas trop nombreuses).

**Avant d'envoyer le prompt** de clôture : la liste des nœuds confirmés et corrigés, et la liste
des divergences avec votre décision et la date, une ligne chacune.

4. Clôturez avec :

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

5. **L'épreuve de lecture**, comme à la leçon 2 : nouvelle session, sans contexte, « que ne fait
   PAS ce système ? quel processus tourne tout seul la nuit ? ». Il doit répondre avec la carte.

**Vérification de complétude.** Y a-t-il des nœuds marqués `[inféré]` ? (S'il n'y en a aucun,
l'agent ne distingue pas ce qu'il a lu de ce qu'il a supposé.) Y a-t-il au moins un processus
programmé dans l'arbre ? La liste des divergences a-t-elle plus de zéro entrée ? Chacune a-t-elle
une décision avec sa date, ou est-elle restée ouverte à dessein ? Les marques ont-elles survécu à
la clôture ? L'épreuve de lecture est-elle passée ?

**Livrable.** `docs/INITIAL_SURVEY.md` complet avec les marques, `PROJECT.md`,
`docs/SEMANTIC_TREE.md`, `docs/DISCREPANCIES.md` décidé, `docs/DECISIONS.md` avec les décisions,
`docs/STATUS.md`.

**Erreurs typiques.** Résoudre les divergences « en réparant le code pour qu'il fasse ce que la
responsable dit », sans les décider une par une : plusieurs de ces divergences sont des règles que
le métier a oubliées et que le code se rappelait. Et laisser l'agent effacer les marques à la
clôture « pour que ce soit plus propre » : un arbre sans marques ne se vérifie plus.

**Dans le projet-guide.** L'arbre de Turnos a le domaine Agenda que la responsable attendait, et
deux choses qu'elle n'attendait pas : un état de rendez-vous « reprogrammé » qui existe dans la
base et qu'aucun écran ne montre `[base]`, et un processus programmé qui, en plus d'envoyer les
rappels, efface les rendez-vous annulés de plus d'un an `[code]` ; la responsable ne savait pas
qu'ils s'effaçaient. Les divergences typiques sont au nombre de huit : la règle des deux heures
pour annuler n'existe pas dans le code (on annule toujours) ; le rappel part à huit heures selon
elle et à sept heures selon la configuration ; le téléphone du patient n'est pas obligatoire dans
la base alors qu'elle croit que si ; et ainsi de suite. Celle de l'effacement est celle qui la
surprend le plus, et elle la décide en une minute : « ça, ça ne s'efface plus ». Élément en
attente.

### Leçon N3 — L'audit comme inventaire de la dette

**Ce que vous devez comprendre.** La leçon 11, mais au début au lieu de la fin, et avec un champ
de plus par constat : s'il bloque (il faut le corriger avant tout changement), s'il se paie quand
on touche au module, ou s'il peut attendre. Sans ce champ, un legacy audité a quarante constats et
personne ne sait par lequel commencer. Ce qui bloque, c'est vous qui le décidez, pas l'auditeur :
en général, un secret exposé, un écran qui ne peut pas être piloté, un déploiement qui ne peut pas
se répéter, l'absence de sauvegarde, et ce qui peut abîmer des données ou facturer en trop.

**Avant d'envoyer le prompt**, de vos mains :

- Une nouvelle session de l'agent, avec un clone propre et un fichier d'instructions disant « tu
  es un auditeur ; tu n'as pas lu et tu ne toucheras pas à ce système ». Un accès en lecture seule
  à la base et au serveur.
- `PROJECT.md`, `docs/SEMANTIC_TREE.md` et `docs/DISCREPANCIES.md` de N2, pour qu'il ne redécouvre
  pas ce qui est écrit.
- Votre critère de ce qui bloque, en deux lignes, pour le trou du prompt. Pour Turnos : secret
  exposé, écran non pilotable, déploiement non reproductible, pas de sauvegarde éprouvée, toute
  chose qui efface ou envoie sans contrôle.

1. Collez-lui :

> Audit this system for integrity, security, performance, code quality and deployability, as the
> inventory of what must be normalized before and during its evolution. Read-only: change nothing
> except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires access you
> lack (the database, the logs, the server), tell me and mark that part as not audited; do not
> pass it as fine. Go through all of the code, not a sample, and read `docs/SEMANTIC_TREE.md` and
> `docs/DISCREPANCIES.md` first so that you do not report what is already known. For every
> finding: where it is (file and line), the risk, the evidence that proves it (the command, the
> query, the number), its priority (P0 must be fixed now, P1 soon, P2 when possible), and one more
> field: whether it BLOCKS (must be fixed before any change, by my criteria: [an exposed secret, a
> screen that cannot be driven by a program, a deployment that cannot be repeated, no tested
> backup, anything that deletes or sends without control]), whether it is PAID WHEN TOUCHED (fixed
> together with the first change that enters its module), or whether it CAN WAIT. Grade every
> dimension you audited. End with every finding turned into a proposed pending item, blocking
> ones first. Reply in my language.

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
> avant tout changement, selon mon critère : [un secret exposé, un écran qui ne peut pas être
> piloté par programme, un déploiement qui ne peut pas se répéter, pas de sauvegarde éprouvée,
> toute chose qui efface ou envoie sans contrôle]), s'il SE PAIE QUAND ON Y TOUCHE (corrigé en
> même temps que le premier changement qui entre dans son module), ou s'il PEUT ATTENDRE. Mets une
> note à chaque dimension que tu as auditée. Termine avec chaque constat converti en élément en
> attente proposé, les bloquants d'abord. Réponds dans ma langue.

2. Lisez le rapport. Choisissez deux constats et demandez-lui la preuve. Révisez les marques de
   vitesse : vous pouvez monter ou descendre n'importe laquelle, avec une raison.

**Avant d'envoyer le prompt** de clôture : le rapport lu, les deux constats vérifiés, et la
session du constructeur ouverte (la clôture va au constructeur, pas à l'auditeur).

3. Revenez à la session du constructeur et collez-lui le prompt de clôture de la leçon 11, en
   ajoutant à la fin : « Each pending item keeps the speed mark of its finding. »

**Vérification de complétude.** Dit-il ce qu'il n'a pas pu auditer ? Y a-t-il au moins un
« bloque » ? Chaque constat a-t-il son fichier, sa ligne et sa preuve ? Les bloquants sont-ils
déjà des éléments en attente ?

**Livrable.** `docs/AUDIT_[date].md` avec les marques de vitesse, et les éléments en attente
bloquants ouverts.

**Erreurs typiques.** Tout en « peut attendre », à cause d'un auditeur qui ne veut pas déranger.
Ou tout en « bloque », à cause d'un propriétaire effrayé : alors on ne peut jamais rien commencer.
Entre trois et huit bloquants, c'est la normale dans un petit système.

**Dans le projet-guide.** L'audit de Turnos trouve, comme bloquants : le mot de passe de la base
dans le code (et dans l'historique de git, il faut donc le roter, pas seulement le déplacer) ; le
déploiement par FTP sans registre de la version qui tourne ; le processus programmé qui efface des
rendez-vous sans verrou ; les deux écrans non pilotables. Comme « se paie quand on y touche » : la
recherche de patients sans index (module des patients), la consultation de l'agenda du jour qui
fait une requête par rendez-vous (module de l'agenda), l'envoi des rappels sans idempotence
(module des messages ; c'est la piste du bug). Comme « peut attendre » : une vieille dépendance
sans vulnérabilité connue, et le code dupliqué du format de date à trois endroits.

### Leçon N4 — La ceinture de sécurité

**Ce que vous devez comprendre.** C'est la porte dure de ce chemin : tant que la ceinture n'est
pas au vert, on ne change pas une ligne de fonctionnalité. La ceinture a cinq pièces : un
environnement de test avec des données anonymisées, un déploiement qui se répète, les secrets hors
du code et rotés, l'intégration continue qui fait tourner ce qu'il y a, et la batterie de
caractérisation. Cette dernière est la leçon 7 à l'envers : le test naît au vert, parce qu'il
capture ce que le système fait aujourd'hui, défauts compris, et la preuve qu'il sert à quelque
chose est qu'il passe au rouge quand vous cassez le flux délibérément. Sans ce rouge par mutation,
c'est un test qui passe parce qu'il ne regarde rien.

**Avant d'envoyer le prompt**, de vos mains et avec le propriétaire :

- `docs/ENVIRONMENTS_SURVEY.md`, que l'agent a rédigé en N2 avec les marques et que vous
  complétez : où va tourner l'environnement de test (pour le cours, un service gratuit ou un
  conteneur sur votre machine suffit), comment il se déploie aujourd'hui, où vont vivre les
  secrets sur le serveur.
- La décision d'anonymisation avec la responsable : noms, téléphones, courriels et numéros de
  pièce d'identité des patients se remplacent par des valeurs factices ; les dates et les
  quantités se conservent. C'est une obligation légale, pas un détail technique.
- La liste des flux critiques pour la caractérisation : les cinq de la responsable.
- La sauvegarde restaurée sur votre machine (la condition de N0). Si vous ne l'avez pas fait,
  faites-le maintenant : l'agent va copier la base de production et vous devez savoir qu'il y a un
  retour en arrière.
- Un accès de l'agent au serveur en lecture seule et à l'endroit de l'environnement de test en
  écriture, identifiants hors du chat.

1. Collez-lui :

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

2. C'est une tâche longue, avec des allers-retours. Quand il vous montre la capture, ouvrez
   vous-même l'URL : on doit voir Turnos avec des données. Cherchez un vrai patient par son nom :
   il ne doit pas y être.
3. Rotez chaque secret de la liste qu'il vous a donnée. Vous, dans le panneau qui convient,
   aujourd'hui.

**Avant d'envoyer le prompt** de la batterie : l'environnement de test ouvert par vous, les
secrets rotés, et la liste des cinq flux critiques pour le trou du prompt.

4. Collez-lui :

> We are going to write the characterization tests of these critical flows: [load an
> appointment; cancel an appointment; the reminder reaches the patient; search a patient; download
> the monthly sheet]. A characterization test captures what the system does today, exactly as it
> does it, defects included; it is not a test of what the system should do. For each flow: drive
> it from the screen as a user would and check the effect in the backend (the row, the state, the
> message queued). Every test must pass against the current code. Then prove that each test
> actually watches its flow: break the flow deliberately with a temporary change, show me the red
> output, revert the change, show me the green. If a flow cannot be driven from the screen, do not
> simulate it: say so and open a pending item marked as blocking. If while writing these tests you
> find behaviour that looks wrong, do not fix it: add it to `docs/DISCREPANCIES.md` with the
> evidence. Record the command to run the suite in `docs/STATUS.md`, and make the suite the gate
> for the test environment as `docs/GATES.md` says. Reply in my language.

> [fr]
> Nous allons écrire les tests de caractérisation de ces flux critiques : [enregistrer un
> rendez-vous ; annuler un rendez-vous ; le rappel arrive au patient ; chercher un patient ;
> télécharger la feuille du mois]. Un test de caractérisation capture ce que le système fait
> aujourd'hui, exactement comme il le fait, défauts compris ; ce n'est pas un test de ce que le
> système devrait faire. Pour chaque flux : pilote-le depuis l'écran comme le ferait un
> utilisateur et vérifie l'effet dans le backend (la ligne, l'état, le message mis en file).
> Chaque test doit passer contre le code actuel. Ensuite démontre que chaque test surveille
> vraiment son flux : casse le flux délibérément avec un changement temporaire, montre-moi la
> sortie au rouge, annule le changement, montre-moi le vert. Si un flux ne peut pas être piloté
> depuis l'écran, ne le simule pas : dis-le et ouvre un élément en attente marqué comme bloquant.
> Si en écrivant ces tests tu trouves un comportement qui semble incorrect, ne le répare pas :
> ajoute-le à `docs/DISCREPANCIES.md` avec la preuve. Consigne la commande pour lancer la batterie
> dans `docs/STATUS.md`, et fais de la batterie la porte de l'environnement de test comme le dit
> `docs/GATES.md`. Réponds dans ma langue.

   Vous lui demandez le test qui naît au vert et démontre qu'il sert à quelque chose en passant au
   rouge par mutation ; rien de simulé pour ce qui ne peut pas être piloté ; et ce qui semble
   mauvais, noté comme divergence, pas réparé.

5. Les deux écrans non pilotables (l'élément en attente bloquant de N0) se résolvent ici, avant la
   batterie ou dans le cadre de celle-ci : demandez-lui de clore cet élément avec la routine de la
   leçon 7, et d'écrire ensuite les tests de caractérisation de ces flux.
6. Lancez vous-même la batterie avec la commande de `docs/STATUS.md`. Elle doit être au vert.

**Vérification de complétude.** Avez-vous ouvert l'environnement de test sans y trouver un vrai
nom ? Le déploiement a-t-il tourné deux fois et la deuxième n'a-t-elle rien changé ? La recherche
de secrets dans le dépôt est-elle revenue vide, et avez-vous roté ceux qu'elle a trouvés ? Chacun
des cinq flux a-t-il son test et son rouge par mutation sous les yeux ? Avez-vous lancé la
batterie vous-même ?

**Livrable.** L'environnement de test tournant avec des données anonymisées, `docs/DEPLOYMENT.md`,
`docs/GATES.md`, les secrets rotés, l'intégration continue au vert, et la batterie de
caractérisation au vert avec ses cinq rouges démontrés.

**Erreurs typiques.** Laisser la batterie « pour la semaine prochaine » et commencer à réparer le
bug : la ceinture à moitié faite est la cause numéro un de casser ce qui marchait. Des données de
test « d'exemple » au lieu de la copie anonymisée : les bugs d'un legacy vivent dans les vraies
données (le rappel en double de Turnos n'apparaît qu'avec certains patients). Et déplacer le
secret sans le roter : il était dans l'historique de git ; ce n'est plus un secret.

**Dans le projet-guide.** Le test de caractérisation du rappel est le plus intéressant : il
capture que le processus nocturne envoie un message par rendez-vous du lendemain vers la boîte
factice, et il passe. Pendant qu'il l'écrit, l'agent remarque que si le processus tourne deux fois
il envoie deux fois, et il le note comme divergence avec sa preuve. C'est la piste du bug, et on
ne le répare pas encore : le comportement actuel est la spécification jusqu'à la leçon R1. Le
rouge par mutation : l'agent commente la ligne qui met le message en file, le test échoue, il la
décommente, il passe.

### Leçon N5 — Verrous et carte producteur-consommateur depuis le code

**Ce que vous devez comprendre.** Les leçons 12 et 8, faites par inventaire sur ce qui existe
déjà, avant de rien changer. L'agent va trouver dans le code plus de choses que le métier ne se
rappelle que le système fait vers l'extérieur : envois, effacements, processus nocturnes. La
comparaison entre les deux listes est le résultat. Et chaque verrou porte une proposition de
« maintenant » ou « quand on y touche » : un verrou sur quelque chose qui envoie des messages va
maintenant ; un verrou sur un export mensuel peut attendre le bloc qui touchera ce module.

**Avant d'envoyer le prompt**, de vos mains et avec le propriétaire :

- Dans `docs/INITIAL_SURVEY.md`, la liste de ce que la responsable **sait** que le système fait
  vers l'extérieur : il envoie des rappels, et rien d'autre, selon elle.
- Un accès de l'agent aux tâches planifiées du serveur.
- La liste de ce qui vit hors du dépôt (la feuille mensuelle), pour la carte.
- L'environnement de test de N4 qui tourne.

1. Collez-lui :

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

2. Confirmez verrou par verrou avec la responsable, ainsi que la marque « maintenant » ou « quand
   on y touche » de chacun.

**Avant d'envoyer le prompt** de clôture : le tableau avec votre verdict par ligne, et la liste
des verrous « maintenant » pour le trou du prompt.

3. Clôturez avec le prompt de clôture de la leçon 12, en ne listant que les verrous
   « maintenant » ; les autres restent dans la file avec leur marque.

**Vérification de complétude.** La liste de l'agent a-t-elle plus d'actions que celle de la
responsable ? (Si elle a les mêmes, il n'a pas regardé les tâches planifiées.) Chaque verrou
« maintenant » a-t-il son test au rouge contre la version sans verrou ? La feuille mensuelle
est-elle dans la carte comme consommateur ?

**Livrable.** `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`, `docs/PRODUCER_CONSUMER_MAP.md`,
`docs/LOCKS.md` avec les verrous « maintenant » implémentés et éprouvés.

**Erreurs typiques.** Implémenter tous les verrous maintenant « tant qu'on y est » : c'est la
règle des deux vitesses violée, et c'est une semaine qui n'est pas consacrée au bug que le client
a demandé.

**Dans le projet-guide.** L'agent trouve trois actions que la responsable n'avait pas listées :
l'effacement nocturne des vieux rendez-vous annulés, un courriel que le système envoie au
praticien quand un rendez-vous est annulé (elle ne le savait pas), et l'export qui alimente la
feuille de calcul. Verrous « maintenant » : l'effacement nocturne passe en mode à blanc (il
consigne ce qu'il aurait effacé) jusqu'à ce qu'elle décide, et l'envoi des rappels reçoit une
limite quotidienne. « Quand on y touche » : idempotence de l'envoi (module des messages, entre
avec le bug), confirmation à l'annulation (module de l'agenda). La carte a six contrats, et la
feuille mensuelle est consommatrice de la table des rendez-vous : si quelqu'un lui change une
colonne, la feuille se casse en silence.

### Leçon N6 — Dimensionner avec de vrais chiffres

**Ce que vous devez comprendre.** La leçon 3 avec un avantage : les données primaires sont dans la
base et dans les journaux. Elles ne se demandent pas, elles se mesurent, avec un compteur et son
test (leçon 9). La responsable n'apporte que ce qui n'est nulle part : de combien ils espèrent
croître, et si le système va être vendu à d'autres cabinets.

**Avant d'envoyer le prompt**, de vos mains :

- Un accès en lecture seule à la base de production, ou la copie complète de N4 (l'anonymisation
  n'a touché ni les dates ni les quantités), et aux journaux d'accès.
- Les deux réponses du métier : la croissance attendue (« comme maintenant, peut-être un praticien
  de plus ») et le « fois dix » (« si ça marche, ma sœur a un autre cabinet »).
- Un cas connu pour le test du compteur : le nombre de praticiens, qui est de trois.

1. Collez-lui :

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

2. Lancez vous-même un compteur (celui des lignes par table, par exemple). Il doit vous donner la
   même chose. Refaites un calcul à la main.

**Avant d'envoyer le prompt** de clôture : le calcul refait qui coïncide, et votre décision sur ce
qui ne tient pas le « fois dix », s'il y a quelque chose.

3. Clôturez avec le prompt de clôture de la leçon 3, en choisissant parmi les options qu'il aura
   proposées ou en confirmant que l'existant tient.

**Vérification de complétude.** Y a-t-il un chiffre primaire sans compteur ? En avez-vous lancé un
vous-même ? Le « fois dix » est-il écrit ?

**Livrable.** `docs/VOLUME_SURVEY.md` avec les marques, les compteurs avec leur test,
`docs/SIZING.md`.

**Erreurs typiques.** Accepter « la base est trop grande pour la compter, j'estime à cent mille
environ ». Une grande base se compte avec une requête ; c'est cela, un compteur.

**Dans le projet-guide.** Vingt mille rendez-vous en deux ans, mille par mois et en croissance
lente ; soixante mille messages ; deux utilisatrices au pic ; la base occupe peu de place ; la
requête la plus lente est la recherche de patients par nom (sans index, l'audit le disait déjà).
Le « fois dix » tient partout sauf sur cette recherche et sur l'envoi nocturne, qui prend un temps
proportionnel au nombre de rendez-vous. Décision asymétrique : l'interface d'envoi de messages
passe à une file d'attente, même si aujourd'hui ce n'est pas nécessaire, parce que l'acompte
(leçon R2) va utiliser le même canal.

### Leçon N7 — La file de normalisation, appariée à la demande du client

**Ce que vous devez comprendre.** La leçon 5 avec deux colonnes de plus. Une seule file où
cohabitent la dette (audit, divergences, écrans, verrous en attente, décisions du dimensionnement)
et la demande du client (ce qui échoue, ce qui manque), chaque élément en attente avec sa marque
de vitesse et son type, et chaque élément du client avec la liste de ceux de normalisation qui
touchent le même module et qu'il convient de payer avec lui. C'est la règle « se paie quand on y
touche » rendue opérationnelle.

**Avant d'envoyer le prompt**, de vos mains et avec le propriétaire :

- La demande du client pour cette étape, dans `docs/blocks/STAGE_01_REQUEST.md`, en deux listes
  avec les mots de la responsable. Ce qui échoue : « parfois le rappel arrive deux fois, et
  parfois il n'arrive pas ; j'ai des captures de trois patients de la semaine dernière ». Ce qui
  manque : « je veux demander un acompte par lien de paiement pour les rendez-vous de première
  fois », « je veux voir les chiffres du mois sans télécharger la feuille de calcul ».
- Tous les artefacts de N2 à N6 clos. S'il en manque un, n'ouvrez pas ce prompt.
- Les éléments en attente bloquants de N0, N3 et N4 clos.

1. Collez-lui :

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

2. Lisez la spécification de chaque élément en attente du client comme si vous étiez la
   responsable, comme à la leçon 5. Et révisez les appariements : cela a-t-il du sens de payer
   cette dette avec cette demande ?
3. Ajoutez au contrat la routine de chaque session de la leçon 5, sans changement.

**Vérification de complétude.** Reste-t-il un « bloque » ouvert ? Chaque correctif dit-il comment
il se reproduit avec les mots du client ? Chaque élément en attente du client a-t-il ses
appariés ?

**Livrable.** `docs/PENDING.md` avec tout, et la routine dans le contrat.

**Erreurs typiques.** Une file avec cinquante éléments en « peut attendre » : c'est la réécriture
déguisée en liste. Archivez ce qui ne sera pas payé, et dites-le. Et ouvrir le premier bloc avec
un bloquant ouvert « parce qu'il est petit ».

**Dans le projet-guide.** La file de Turnos se retrouve avec trois éléments en attente du client :
le rappel en double (correctif, module des messages, apparié avec l'idempotence de l'envoi et la
file de messages du dimensionnement), l'acompte (évolutif, nouveau module de paiements, apparié
avec la confirmation à l'annulation parce qu'il touche le même écran), et le rapport mensuel
(évolutif, module des rapports, apparié avec l'index des patients et avec le contrat de la feuille
de calcul, qui se remplace). Et une douzaine d'éléments de normalisation, dont trois « peuvent
attendre » et on le dit.

---

## La boucle sur le legacy : leçons R1 et R2

### Leçon R1 — Le premier bloc : le bug, en mode correctif

**Ce que vous devez comprendre.** Un élément en attente correctif est un bug connu. À la leçon 7
le rouge se fabriquait ; ici le rouge est le bug lui-même : le test qui reproduit la panne, en
pilotant le flux comme l'utilisateur qui l'a signalée, doit échouer contre le code actuel. S'il
n'échoue pas, vous avez reproduit un autre bug. Ce rouge est la preuve que vous réparez la bonne
chose, et il vaut plus que n'importe quelle explication de l'agent sur ce qui « doit être en train
de se passer » [Ref. 22](REFERENCIAS.md#ref-22). Et la cause racine se dit en prose avant de
toucher, parce que parfois la cause racine est une règle métier que personne n'a écrite, et cela,
c'est vous qui le décidez.

**Avant d'envoyer le prompt**, de vos mains :

- L'élément en attente correctif dans `docs/PENDING.md` avec la reproduction dans les mots de la
  responsable, et un cas concret : les trois captures de la semaine dernière, avec le nom
  (factice, en test) des patients et la date. Sans un cas, il n'y a pas de test.
- La batterie de caractérisation au vert, avec la commande dans `docs/STATUS.md`.
- Les appariés de cet élément en attente, listés dedans.
- La responsable prévenue qu'aujourd'hui vous allez lui poser une question de métier.

1. Ouvrez le bloc avec la routine de chaque session : l'agent annonce quel élément en attente il
   prend et relit la spécification.
2. Collez-lui :

> This pending item is a correction: [some patients receive the reminder twice and some receive
> none; three cases from last week are attached in the item]. Before changing anything: (1)
> Reproduce the failure with a test that drives the flow from the screen and checks the effect in
> the backend, and show me that it fails against the current code; that red is the proof that you
> reproduced the right defect. If you cannot reproduce it, tell me what you tried and what you
> need; do not fix what you cannot see. (2) Find the root cause and tell me in prose, with the
> evidence, before fixing. If the root cause is a business rule nobody wrote down, stop and ask me.
> (3) Fix at the root, not where it hurts, and nothing else: anything else you find goes to a
> pending item. (4) Show me the test green, the characterization suite still green, and the
> regression of the neighbouring items. (5) If the fix changes a current behaviour that someone
> may depend on, say so explicitly: that is a decision for me, not a side effect. Close the paired
> normalization items of this module in the same block, each with its own evidence. The commit
> message says "proved red against [version]" and the test counts. Reply in my language.

> [fr]
> Cet élément en attente est une correction : [certains patients reçoivent le rappel deux fois et
> d'autres aucune ; les trois cas de la semaine dernière sont dans l'élément]. Avant de rien
> changer : (1) Reproduis la panne avec un test qui pilote le flux depuis l'écran et vérifie
> l'effet dans le backend, et montre-moi qu'il échoue contre le code actuel ; ce rouge est la
> preuve que tu as reproduit le bon défaut. Si tu ne peux pas le reproduire, dis-moi ce que tu as
> essayé et ce dont tu as besoin ; ne répare pas ce que tu ne peux pas voir. (2) Trouve la cause
> racine et dis-la-moi en prose, avec la preuve, avant de réparer. Si la cause racine est une
> règle métier que personne n'a écrite, arrête-toi et demande-moi. (3) Répare à la racine, pas là
> où ça fait mal, et rien d'autre : tout ce que tu trouves par ailleurs va dans un élément en
> attente. (4) Montre-moi le test au vert, la batterie de caractérisation toujours au vert, et la
> régression des éléments voisins. (5) Si la correction change un comportement actuel dont
> quelqu'un peut dépendre, dis-le explicitement : c'est une décision qui m'appartient, pas un
> effet secondaire. Clos les éléments en attente de normalisation appariés de ce module dans le
> même bloc, chacun avec sa propre preuve. Le message du commit dit « prouvé en rouge contre
> [version] » et les chiffres des tests. Réponds dans ma langue.

   Vous lui demandez la reproduction avant le diagnostic, la cause racine en prose avant de
   toucher, la racine et rien d'autre, la caractérisation comme régression du système entier, et
   qu'un changement de comportement soit une décision de votre part.

3. Lisez la cause racine avant d'autoriser la réparation. S'il vous pose une question de métier,
   décidez-la avec la responsable et répondez avec le format de clôture de la leçon 6.
4. À la clôture : lancez vous-même la batterie de caractérisation. Et utilisez le système dans
   l'environnement de test pendant une demi-heure, comme la réceptionniste : le regard humain ne
   se délègue pas.

**Vérification de complétude.** Avez-vous vu le rouge du test qui reproduit le bug, avec des
chiffres ? La cause racine était-elle écrite en prose avant la réparation ? La caractérisation
est-elle toujours au vert ? Les appariés ont-ils été clos avec leur propre preuve ? Le commit
dit-il « prouvé en rouge » ?

**Livrable.** Le bug clos avec la routine complète, les appariés clos, et la batterie de
caractérisation élargie avec le test du bug.

**Erreurs typiques.** Autoriser la réparation sans lire la cause racine : dans Turnos, la première
hypothèse de l'agent est souvent « le processus tourne deux fois », et c'est la moitié de la
vérité. Et laisser le « tant qu'on y est » ranger le module des messages : règle 7.

**Dans le projet-guide.** Le test reproduit le double envoi avec un rendez-vous qui a été
reprogrammé : le processus nocturne envoie un rappel par ligne de rendez-vous du lendemain, et un
rendez-vous reprogrammé a deux lignes (l'ancienne, à l'état « reprogrammé », qu'aucun écran ne
montre, et la nouvelle). Ceux qui n'en reçoivent aucun sont ceux qui ont été reprogrammés pour
après l'envoi. Cause racine : l'état « reprogrammé » qui est apparu à la leçon N2. La question de
métier : « un rendez-vous reprogrammé est-il un nouveau rendez-vous ou le même rendez-vous ? ». La
responsable décide : le même rendez-vous, avec un historique. La réparation à la racine touche
l'état, pas l'envoi ; l'idempotence appariée se paie dans le même bloc ; le rouge dit « 2 messages
pour 1 rendez-vous » et le vert « 1 message pour 1 rendez-vous ». Et le changement de comportement
se déclare : les rendez-vous reprogrammés cessent d'apparaître deux fois dans la feuille
mensuelle, qui est consommatrice de la table ; la responsable l'approuve.

### Leçon R2 — Le second bloc : l'acompte, en mode évolutif

**Ce que vous devez comprendre.** Le nouveau sur l'ancien se construit avec la méthode complète,
exactement comme aux leçons 5 à 10 de la première partie : spécification dans l'élément en
attente, décisions avec leur date, test au rouge, test de bout en bout, rapport honnête. Deux
différences. La régression des voisins, c'est le système entier, et c'est la batterie de
caractérisation qui le dit. Et quand le bloc entre dans un module, les éléments en attente de
normalisation marqués « se paie quand on y touche » de ce module entrent avec lui, avec leur
propre preuve. On ne fait pas au nouveau module ce que le legacy a fait à l'ancien.

**Avant d'envoyer le prompt**, de vos mains :

- L'élément en attente évolutif de l'acompte dans `docs/PENDING.md`, avec sa spécification
  complète lue par vous, ses appariés, et les décisions de métier que la responsable peut déjà
  prendre : quels rendez-vous portent un acompte, de combien, ce qui se passe s'il n'est pas payé.
- Le relevé des actions à conséquence (N5) avec la ligne « encaisser un acompte » ajoutée, parce
  que c'est une action nouvelle qui agit sur le monde : verrou avant de construire, comme à la
  leçon 12.
- La batterie de caractérisation au vert.

1. Ouvrez le bloc avec le prompt d'ouverture de la leçon 5, sur la demande de l'acompte, et lisez
   la spécification comme la responsable.
2. Avant de construire, le verrou : collez-lui le prompt de clôture de la leçon 12 pour l'action
   « encaisser un acompte », avec le mode à blanc d'abord.
3. Construisez avec la routine de la leçon 7, élément en attente par élément en attente, avec les
   appariés dans le même bloc.
4. À la clôture du bloc : la batterie complète de bout en bout (celle de caractérisation plus les
   tests nouveaux), avec le prompt de clôture de bloc de la leçon 7, et une demi-heure de votre
   part à utiliser le système.

**Vérification de complétude.** L'acompte a-t-il un verrou avec son test au rouge avant que
l'encaissement n'existe ? La caractérisation est-elle toujours au vert après le bloc ? Les
appariés du module ont-ils été payés ? Y a-t-il quelque chose de l'ancien module qui a été
« amélioré » sans élément en attente ?

**Livrable.** L'acompte fonctionnant dans l'environnement de test, en mode à blanc, avec sa
spécification, son verrou, ses tests et son test de bout en bout ; les appariés clos.

**Erreurs typiques.** Construire l'acompte « vite, comme le reste est fait » pour que cela
s'emboîte : le nouveau module naît avec la méthode complète, toujours. Et oublier le verrou parce
que « c'est un lien de paiement, ce n'est pas nous qui encaissons » : le lien s'envoie à un
patient ; c'est une action vers l'extérieur.

**Dans le projet-guide.** L'acompte utilise le même canal que les rappels, qui a maintenant une
file d'attente (la décision asymétrique de N6 qui se rembourse toute seule). Verrou : confirmation
explicite de la réceptionniste et montant fixé par le praticien ; mode à blanc pendant une semaine
en consignant « j'aurais demandé un acompte à ». L'apparié de l'écran d'annulation (la
confirmation) se paie dans ce bloc parce que l'acompte change ce qui se passe à l'annulation. À la
clôture, la batterie lance sept flux : les cinq de caractérisation, celui du bug de R1 et celui de
l'acompte.

---

## Ensuite : mise en production et exploitation

À partir d'ici, le legacy est un système avec méthode, et les leçons 11 à 21 de la première partie
s'appliquent telles quelles, avec quatre remarques. La première porte sur les six échelons de
qualité opérationnelle : l'observabilité minimale et le scan de vulnérabilités sont déjà entrés
avec la ceinture, les mesures de persistance sont déjà en N6, et le test de charge se lance avec
ces volumes avant le premier déploiement ; les deux supervisions démarrent avec la première
lecture comme ligne de base, et ce qui allait déjà mal le premier jour devient un élément en
attente avec sa marque. Les trois autres remarques sont celles-ci. L'audit de la leçon 11 se
compare à celui de N3 : combien de dette a été payée, combien il en reste. Les manuels de la
leçon 14 n'existent souvent pas dans un legacy, et ils se génèrent à partir du système tel qu'il est et des éléments
en attente clos, qui maintenant documentent bel et bien ce qui a été fait. Et la rétrospective de
la leçon 15 a une question propre à ce chemin : combien a coûté la normalisation (en heures, en
jetons, en semaines avant le premier changement), et quelle part de la dette marquée « peut
attendre » a fini par coûter quand même. Cette réponse est celle qui corrigera le calendrier de
cette partie dans la prochaine version.

## Liste de sortie du tronçon de normalisation

Les huit conditions que le propriétaire vérifie sans lire de code, avant d'ouvrir le premier bloc.
Ce sont les mêmes que celles de la page du chemin évolutif-correctif ; je les répète ici parce
qu'elles sont le livrable de cette partie.

1. Tous les intrants des étapes précédentes existent (relevé, éligibilité, contrat, fichier de
   projet, arbre, environnements, volumétrie, dimensionnement, portes), avec leurs marques de
   source, et le propriétaire a confirmé chaque nœud inféré (N2).
2. Chaque divergence a une décision avec sa date, et celles qui changent le système ont un élément
   en attente (N2).
3. L'audit existe et chaque constat a une marque de vitesse (N3).
4. La ceinture est au vert : environnement de test avec données anonymisées, déploiement exécuté
   deux fois, secrets dehors et rotés, intégration continue, batterie de caractérisation avec le
   rouge par mutation démontré (N4).
5. Toute action à conséquence a un verdict, et les verrous « maintenant » ont leur test au rouge
   (N5).
6. Les chiffres primaires sont mesurés avec un compteur et son test, et le « fois dix » est écrit
   (N6).
7. Il ne reste aucun « bloque » ouvert, et chaque élément en attente du client a ses appariés
   (N7).
8. Le contrat a les cinq règles du legacy, et une nouvelle session passe l'épreuve de lecture (N1,
   N2).

## Annexe — Ce que cette partie n'a pas encore

- Une cohorte qui l'ait suivie sur un legacy réel. Turnos héritée est construite à partir de ce
  que j'ai vu dans des systèmes d'autrui en mode diagnostic, pas à partir d'un élève.
- Un dépôt d'exemple de « Turnos » tel que le neveu l'a laissé, pour que l'élève qui n'a pas de
  legacy à lui en ait un à normaliser. C'est l'élément en attente le plus important de cette
  partie.
- Le critère de taille de la batterie de caractérisation pour les grands systèmes, et comment se
  répartit la normalisation par module quand le système en a des dizaines.
