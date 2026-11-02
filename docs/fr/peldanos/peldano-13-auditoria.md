# Étape 13 — L'audit périodique comme intrant du plan (contrat de l'échelon)

**Tronçon :** mise en production.
**Quand :** obligatoire avant le premier déploiement en production ; il ouvre le tronçon de mise en
production. Ensuite, en exploitation, tous les un ou deux mois selon le rythme de changement, et à
la clôture de chaque grande étape.
**Forme :** un seul envoi long, idéalement à un agent différent de celui qui construit.
**Taille :** obligatoire avant le premier déploiement en production, dans tout projet ; ensuite,
proportionnel au rythme de changement (un système qui change toutes les semaines s'audite tous les
mois ; un système stable, tous les six).

## À quoi il sert

Regardez le système entier avec des yeux neufs de temps en temps, et convertissez ce que vous voyez
en éléments en attente. L'audit n'est pas un rapport qu'on archive : c'est du plan. Il évite le mot
de passe écrit dans le code que personne n'avait vu, les requêtes qui lisent des tables entières
[Ref. 18](../REFERENCIAS.md#ref-18), la vulnérabilité connue dans une dépendance, le composant de
milliers de lignes [Ref. 41](../REFERENCIAS.md#ref-41). Et c'est l'indépendance du contrôle de
qualité portée un cran plus loin : celui qui audite n'est pas celui qui a construit.

Sur l'indépendance : pas besoin d'une autre entreprise ni d'un autre outil. Il suffit d'**une autre
session, avec un autre fichier d'instructions, qui n'ait pas participé à la construction**. Ce que
vous cherchez, c'est que l'auditeur ne partage pas les présupposés du constructeur. Un modèle qui a
construit un module « sait » que le mot de passe codé en dur était provisoire ; un modèle qui le
voit pour la première fois le rapporte pour ce qu'il est. C'est ainsi qu'ont été détectées deux
portes d'administrateur que le constructeur avait laissées en une journée
[Ref. 40](../REFERENCIAS.md#ref-40).

Si tu peux choisir, que ce soit en plus **un modèle différent** de celui qui a construit, et pas
seulement une autre session du même : une étude de 2026 a mesuré qu'une session propre avec un
modèle différent trouve plus d'erreurs que deux sessions du même modèle
([arXiv 2610.01471](https://arxiv.org/abs/2610.01471)). Mais cette préférence a un **plancher de
capacité**, et je le dis parce que je l'ai mesuré : un autre modèle trouve plus **seulement si ce
modèle peut faire le travail**. En dessous d'une certaine capacité, la diversité cesse d'être un
avantage et devient un coût, parce que vérifier un constat faux coûte presque autant que l'avoir
cherché soi-même. L'ordre est donc celui-ci : d'abord, **un autre modèle, s'il est à la hauteur de
la tâche** ; s'il ne l'est pas, **une autre session du même modèle, en déclarant l'écart** dans la
ligne `Auditor:` du rapport ; et **jamais** un auditeur choisi par la clé qui se trouve chargée ou
par le délai qu'il supporte. Si c'est une limite de l'outil qui l'a choisi, le rapport le dit avec
ces mots : c'est le cas `tool_constraint` de la clé `auditor_choice`, et il existe parce qu'une
contrainte de l'outil se déguise en choix technique, et la seule chose qui la met à nu est d'avoir
à la nommer. Que le modèle du constructeur soit le seul disponible n'est pas un échec de la
méthode : c'est un écart déclaré, et un écart déclaré peut être audité. (Décision D-079, sur
l'expérience du 2026-11-02 : l'auditeur d'un autre modèle a livré quatre des neuf constats qu'il
avait lui-même annoncés, et son unique P0 était faux parce qu'il avait mal lu une virgule décimale ;
celui du même modèle, s'écartant de la préférence et le déclarant dans sa première ligne, en a
livré dix-sept, et aucun ne s'est révélé faux quand ils ont été vérifiés un par un.)

## 1. Contexte requis

Ce qui suit est la liste générique. Les fichiers concrets que vous devez avoir faits avant chaque
prompt, avec leur contenu et leur état minimum, sont dans la section 2, dans le bloc « Avant
d'envoyer le prompt » qui précède chacun d'eux.
- Le dépôt complet, en lecture seule.
- La production ou l'environnement de test, en lecture seule (base de données, journaux).
- L'audit précédent, s'il y en a eu un, pour mesurer ce qui a changé.
- Le périmètre : intégrité, sécurité, performance, qualité du code, ou tout.
- `docs/PENDING.md` avec les éléments en attente clos au dernier cycle et leurs reçus, pour que
  l'auditeur choisisse lesquels reproduire.
- Le registre de la preuve du dernier cycle complet : les commits fonctionnels, les éléments en
  attente clos avec leurs reçus, et les reçus archivés qui portent une mutation. Ce n'est pas la
  même chose que le point précédent : là, l'auditeur choisit deux ou trois reçus à reproduire, et
  ici il doit pouvoir compter le registre entier.

## 2. Prompts

**Initial (à un agent différent du constructeur, si possible) :**

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous (ou le métier avec vous) qui le
faites, pas l'agent :

- Une session nouvelle de l'agent, différente de celle du constructeur : un clone propre du dépôt
  dans un autre dossier et, si votre outil le permet, un fichier d'instructions différent qui dise
  seulement « tu es un auditeur ; tu n'as pas construit ce système ». Sans cela, l'auditeur
  partage les présupposés du constructeur et il les confirme.
- Un accès en lecture seule pour cette session à l'environnement de test ou à la production : base
  de données, journaux. Des identifiants en lecture seule, hors du dépôt, avec le nom de la
  variable dit dans le chat.
- Le périmètre, décidé par vous, pour le trou [scope] : intégrité, sécurité, performance, qualité
  du code, ou tout.
- L'audit précédent, s'il y en a eu (`docs/AUDIT_[date]` de la fois d'avant), pour qu'il mesure ce
  qui a changé.
- Qui va auditer et pourquoi celui-là, décidé par toi : un autre modèle s'il est à la hauteur de la
  tâche, une autre session du même s'il ne l'est pas, et jamais celui qui est resté parce que
  c'était la clé qui se trouvait chargée ou le seul qui supportait le délai. Le prompt lui demande
  de le déclarer dans le rapport, mais la décision est la tienne : si tu ne la prends pas, l'outil
  la prend.
- État minimum acceptable : la session de l'auditeur n'est pas celle du constructeur, et elle n'a
  que la lecture.
> Audit this system for [scope]. Read-only: change nothing except writing your report to
> `docs/AUDIT_[date].md`. If auditing some part requires access you lack (the database, the
> log, an environment), tell me and mark that part as not audited; do not pass it as fine. Go
> through all of the code, not a sample. Pick two or three pending items closed in the last cycle
> and reproduce their receipts literally: rerun the exact red-then-green commands they cite
> against the commits they name, and say for each one whether it reproduces or not. A receipt you
> only read is not a receipt you audited. For every finding: where it is (file and line), what
> the risk is, what evidence proves it (the command, the query, the number), and its priority:
> P0 must be fixed now, P1 soon, P2 when possible. Give a grade to every dimension you audited.
> End with the list of P0 findings turned into proposed pending items.
>
> This report carries declarations that a gate reads, each one under its fixed key, so write the
> key in English even when the report is in my language. `auditor_choice`: which case applies and
> who decided it -- `different_model` if you are a model other than the one that built this
> system; `same_model_declared` if you are the same model because no other one was up to the
> task; `tool_constraint` if what chose you was a key that happened to be loaded, a timeout or
> any other limit of the tool, and then say so with those words. In the `Auditor:` line, the
> model that built and the model that audits. `evidence_register_health`: the health of the
> register of the evidence, which is a dimension of this audit and is not optional -- how many
> functional commits carry no receipt of any kind; how many pending items closed as shipped lack
> their receipts, and of those how many have the reason written; and of the receipts that carry
> a mutation, how many can be applied again. Each of those figures measured by a program, with
> the command next to it, and a figure you could not measure declared as not measured and never
> as zero. If the register of the evidence is broken, every other finding in this report rests
> on data nobody can reproduce. `findings_by_destination`: every finding assigned to one
> destination -- `product` if the defect is in the audited system, `method` if it is in the
> method being followed, `tool` if it is in the tool that runs it -- with the register where its
> pending item goes. A finding whose destination nobody assigned leaves this audit open.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [fr]
> Audite ce système sur [périmètre]. Lecture seule : ne change rien sauf écrire ton rapport dans
> `docs/AUDIT_[date].md`. Si auditer une partie requiert un accès que tu n'as pas (la base de
> données, le journal, un environnement), dis-le-moi et marque cette partie comme non auditée ; ne
> la fais pas passer pour bonne. Parcours tout le code, pas un échantillon. Choisis deux ou trois
> éléments en attente clos au dernier cycle et reproduis leurs reçus tels quels : relance les
> commandes exactes de rouge puis vert qu'ils citent, contre les commits qu'ils nomment, et dis
> pour chacun s'il se reproduit ou non. Un reçu que tu as seulement lu n'est pas un reçu que tu as
> audité. Pour chaque constat : où il est (fichier et ligne), quel est le risque, quelle preuve le
> démontre (la commande, la requête, le chiffre), et sa priorité : P0 doit être corrigé maintenant,
> P1 bientôt, P2 quand on pourra. Donne une note à chaque dimension que tu as auditée. Termine par
> la liste des constats P0 convertis en éléments en attente proposés.
>
> Ce rapport porte des déclarations qu'une porte lit, chacune sous sa clé fixe, alors écris la
> clé en anglais même si le rapport est dans ma langue. `auditor_choice` : quel cas s'applique et
> qui l'a décidé — `different_model` si tu es un modèle autre que celui qui a construit ce
> système ; `same_model_declared` si tu es le même modèle parce qu'aucun autre n'était à la
> hauteur de la tâche ; `tool_constraint` si ce qui t'a choisi était une clé qui se trouvait
> chargée, un délai d'expiration ou toute autre limite de l'outil, et alors dis-le avec ces mots.
> Dans la ligne `Auditor:`, le modèle qui a construit et le modèle qui audite.
> `evidence_register_health` : la santé du registre de la preuve, qui est une dimension de cet
> audit et n'est pas optionnelle — combien de commits fonctionnels n'ont aucun reçu ; combien
> d'éléments en attente clos comme livrés n'ont pas leurs reçus, et parmi ceux-là combien ont le
> motif écrit ; et parmi les reçus qui portent une mutation, combien s'appliquent de nouveau.
> Chacun de ces chiffres mesuré par un programme, avec la commande à côté, et un chiffre que tu
> n'as pas pu mesurer déclaré comme non mesuré et jamais comme zéro. Si le registre de la preuve
> est cassé, tous les autres constats de ce rapport reposent sur des données que personne ne peut
> reproduire. `findings_by_destination` : chaque constat assigné à une destination — `product` si
> le défaut est dans le système audité, `method` s'il est dans la méthode suivie, `tool` s'il est
> dans l'outil qui l'exécute — avec le registre où va son élément en attente. Un constat dont
> personne n'a assigné la destination laisse cet audit ouvert.
>
> Quand tu as besoin d'une décision de ma part, demande-la avec les quatre parties de l'UX-28
> (`docs/ANEXO_HEURISTICAS.md`) et dans cet ordre : les données qui rendent la question
> nécessaire, énumérées ; un paragraphe de cinq lignes au plus qui les relie et laisse voir la
> question ; la question avec ses réponses possibles numérotées ; et ta recommandation. Dis-le à
> la profondeur technique que le projet a déclarée dans `communication_depth` —`beginner`,
> `decision_maker` ou `technical`— ; si le projet n'en a déclaré aucune, utilise `decision_maker`.
>
> Réponds dans ma langue.

Ce que je lui demande, clause par clause : lecture seule (l'auditeur ne corrige pas ; il
propose) ; la clause de complétude sous sa forme pour auditer : **ce qui n'a pas pu être vérifié se
déclare, on ne l'approuve pas par omission** ; tout le code et non un échantillon, parce que les
constats graves sont souvent là où personne ne regarde ; **la reproduction littérale de deux ou
trois reçus**, pour que l'audit vérifie des preuves au lieu de se contenter de les lire (c'est la
clause qui ferme le trou de D-033 : un rouge raconté n'est pas un rouge audité) ; chaque constat
avec emplacement, risque, preuve et priorité, pour qu'il soit actionnable sans relire le rapport ;
des notes par dimension, pour comparer avec l'audit précédent ; et les P0 déjà convertis en
éléments en attente proposés.

Et ce que les deux décisions de novembre ajoutent, dit à part parce que les deux changent le
travail de l'auditeur et pas seulement sa rédaction : les **trois déclarations avec une clé fixe**,
parce que « complet » et « audité » ne sont pas des propriétés qu'on peut lire d'un rapport écrit
en prose libre (D-079 et D-080) ; la **santé du registre de la preuve** comme dimension
obligatoire, parce que c'est la seule qui audite toutes les autres — si le registre de la preuve
est cassé, tous les autres constats du rapport reposent sur des données que personne ne peut
reproduire, et alors le rapport entier vaut moins que ce que ses notes disent — ; et la
**destination de chaque constat**, parce qu'un défaut de la méthode consigné dans le registre du
produit est un défaut que personne ne corrigera jamais : le propriétaire du produit ne peut pas
corriger la méthode, et celui qui pouvait ne l'a jamais su.

**De clôture (au constructeur) :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- `docs/AUDIT_[date].md`, lu par vous, et deux constats au hasard vérifiés avec l'auditeur
  (demandez-lui la commande, la ligne ; il doit pouvoir les montrer).
- La session du constructeur ouverte : ce prompt va au constructeur, pas à l'auditeur, avec la
  date du fichier mise dans le trou.
- État minimum acceptable : vous avez lu le rapport, vous savez combien il y a de P0 et de P1, et
  vous allez compter les éléments en attente qu'il ouvre.
> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.
>
> Open each one in the register of the destination the report assigned to it: the product
> register for `product`, and for `method` and for `tool` the register of the method or the
> register of the tool, never the product's. If a finding arrives with no destination, ask me
> for it before opening anything.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [fr]
> Lis `docs/AUDIT_[date].md`. Ouvre un élément en attente pour chaque P0 et P1, en citant le
> constat. Si tu n'es pas d'accord avec l'un d'eux, dis-le-moi avec la preuve contraire ; ne
> l'ignore pas.
>
> Ouvre chacun dans le registre de la destination que le rapport lui a assignée : le registre du
> produit pour `product`, et pour `method` et pour `tool` le registre de la méthode ou celui de
> l'outil, jamais celui du produit. Si un constat arrive sans destination, demande-la-moi avant
> d'ouvrir quoi que ce soit.
>
> Quand tu as besoin d'une décision de ma part, demande-la avec les quatre parties de l'UX-28
> (`docs/ANEXO_HEURISTICAS.md`) et dans cet ordre : les données qui rendent la question
> nécessaire, énumérées ; un paragraphe de cinq lignes au plus qui les relie et laisse voir la
> question ; la question avec ses réponses possibles numérotées ; et ta recommandation. Dis-le à
> la profondeur technique que le projet a déclarée dans `communication_depth` —`beginner`,
> `decision_maker` ou `technical`— ; si le projet n'en a déclaré aucune, utilise `decision_maker`.

Ce que je lui demande : que l'audit se convertisse en éléments en attente (sinon, c'est un rapport
qu'on archive), et que le désaccord soit explicite et avec preuve, pas silencieux.

Et, depuis D-080, que chaque élément en attente soit ouvert dans le registre de sa destination. Le
constructeur est celui qui a les mains dans le produit, donc celui qui envoie le plus facilement
tout dans le registre du produit ; un constat qui arrive sans destination se demande à toi avant
d'ouvrir quoi que ce soit.

## 3. Résultat attendu

- `docs/AUDIT_[date].md` avec : le périmètre, ce qui a pu être vérifié et ce qui ne l'a pas été (et
  pourquoi), les constats avec emplacement, risque, preuve et priorité, une note par dimension, le
  résultat de la reproduction de deux ou trois reçus du dernier cycle, et la liste des éléments en
  attente proposés.
- Dans `docs/PENDING.md` : un élément en attente pour chaque P0 et P1, citant le constat.
- Dans ce même rapport, les trois déclarations qu'une porte peut lire, chacune avec sa clé en
  anglais : `auditor_choice` (quel cas s'applique et qui l'a décidé), `evidence_register_health`
  (les chiffres du registre de la preuve, chacun avec la commande qui l'a mesuré, et « non mesuré »
  quand on n'a pas pu mesurer) et `findings_by_destination` (chaque constat avec sa destination).
- Dans le registre de chaque destination : un élément en attente pour chaque P0 et P1. Ceux du
  produit dans le registre du produit, ceux de la méthode dans celui de la méthode, ceux de
  l'outil dans celui de l'outil.

## 4. Vérification de complétude

- Le rapport dit-il ce qu'il N'A PAS pu vérifier ? S'il dit avoir tout vérifié, méfiez-vous.
- Choisissez deux constats : ont-ils un fichier et une ligne, et une preuve que vous pouvez
  reproduire ?
- Le rapport dit-il quels reçus il a reproduits, avec la commande et le résultat, ou dit-il
  seulement qu'il les a lus ?
- Chaque P0 a-t-il son élément en attente ouvert avant de déclarer l'audit clos ?
- Les notes par dimension pourront-elles être comparées avec l'audit précédent ?
- Est-ce le même agent qui a construit qui a audité ? Si oui, demandez un second regard sur les P0.
- Le rapport dit-il qui a audité et pourquoi celui-là ? Si la raison est qu'il était le seul
  chargé ou le seul qui supportait le délai, c'est `tool_constraint` et cela doit être écrit ainsi.
- Les chiffres de la santé du registre de la preuve sont-ils là, chacun avec la commande qui l'a
  mesuré ? Un chiffre qu'on n'a pas pu mesurer dit « non mesuré » ; un zéro qui ne distingue pas
  « il n'y en a aucun » de « je n'ai pas pu regarder » n'est pas un chiffre (CQ-19, le
  dénominateur).
- Chaque constat a-t-il une destination, et son élément en attente a-t-il été ouvert dans le
  registre de cette destination ?

## 5. Signaux d'alarme

- L'audit n'a trouvé aucun P0. Dans un système de plus de trois mois, ce n'est presque jamais
  vrai ; il est plus probable que le périmètre était petit ou que l'auditeur partageait les
  présupposés.
- Les constats n'ont pas de ligne de fichier. Ce sont des opinions, pas des constats.
- Le rapport dit que les reçus « ont été vérifiés » sans montrer la commande exécutée ni sa
  sortie. Un reçu lu et un reçu reproduit ne sont pas la même chose, et seul le second ferme
  l'objection de D-033.
- Deux semaines ont passé et les P0 n'ont toujours pas d'élément en attente. L'audit a été archivé.
- Le rapport fait l'éloge de l'indépendance de l'auditeur et ne dit pas quel cas de
  `auditor_choice` s'applique. Quand c'est l'outil qui a choisi l'auditeur et pas toi, c'est
  justement le cas que personne n'écrit de lui-même.
- La santé du registre de la preuve revient à zéro et sans commande. Un zéro sans la commande qui
  l'a produit est un « je n'ai pas pu regarder » déguisé en bonne nouvelle.
- Tous les constats sont sortis avec la destination `product`. Dans un contrôle qui regarde le
  système avec la méthode et l'outil en usage, qu'aucun ne soit de la méthode ni de l'outil est
  improbable : le plus probable est que personne ne s'est posé la question de la destination.
