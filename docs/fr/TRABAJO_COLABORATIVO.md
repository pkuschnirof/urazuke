# Urazuke — travail collaboratif : plusieurs développeurs, chacun avec son agent, sur une même branche

Auteur : Pablo Kuschniroff, assisté par Claude Code. Version 1, 19 octobre 2026. Ce document
complète le [document principal](ESCALERA_METODOLOGICA.md) : il dit comment s'applique la méthode
quand il n'y a pas un seul humain avec un seul agent, mais plusieurs développeurs, chacun avec le
sien, travaillant sur le même dépôt et sur la même branche. Les mots étranges sont dans le
glossaire du document principal. Dépôt public :
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## Le problème, dit sans détour

La méthode est écrite au singulier : le propriétaire, l'agent, l'élément en attente. Mes trois
systèmes, je les ai construits ainsi, un humain et un modèle. Mais une équipe qui adopte la
méthode n'a pas un humain : elle en a trois, ou cinq, chacun avec sa session d'agent ouverte sur
le même code, et dans la plupart des petites équipes, sur la **même branche**, parce que la forêt
de branches à longue vie est la façon la plus sûre de faire que deux semaines de travail
s'intègrent un vendredi dans les cris. Travailler sur une branche partagée peut se faire bien, et
l'industrie le fait depuis des années avec des règles connues (des commits petits et intégrés
plusieurs fois par jour, l'intégration continue comme arbitre, les fonctionnalités à moitié faites
cachées derrière un interrupteur). Ce qui change avec la méthode, c'est que ces règles ne sont plus
respectées par des personnes qui lisent le code des autres : elles le sont par des agents qui ne
se voient pas entre eux, et il faut donc les écrire là où chaque agent les lira.

Ce qui suit, ce sont les règles, et ensuite les prompts. Je n'ajoute pas d'échelons : les
vingt-quatre sont les mêmes. J'ajoute ce dont chaque échelon a besoin pour être gravi par
plusieurs à la fois.

**Si vous débutez.** Une *branche* est une copie du code où l'on travaille ; la *branche partagée*
(on l'appelle en général *main* ou *trunk*) est la seule qui compte, celle qui se déploie.
*Intégrer*, c'est mettre votre changement dans cette branche ; un *conflit*, c'est quand deux
personnes ont changé la même ligne et que l'outil ne sait pas laquelle vaut. Un *interrupteur de
fonctionnalité* est une clé de configuration qui laisse une fonctionnalité éteinte même si le code
est déjà là, pour pouvoir intégrer à moitié sans que l'utilisateur la voie. Et *réclamer* un
élément en attente, c'est y inscrire votre nom pour que personne d'autre ne le prenne.

## Les sept règles de la branche partagée

1. **L'élément en attente est l'unité de propriété.** Personne ne travaille sans un élément en
   attente réclamé à son nom dans `docs/PENDING.md`, et un élément en attente a un seul
   propriétaire à la fois. Deux personnes ne prennent pas deux éléments qui touchent le même module
   en même temps ; si cela ne peut pas s'éviter, elles se préviennent et la seconde attend que la
   première intègre. L'agent, en commençant la session, lit les éléments réclamés par d'autres et
   n'y touche pas.
2. **Intégrer petit et souvent.** Un élément en attente se découpe en changements qui s'intègrent à
   la branche partagée plusieurs fois par jour, jamais à la fin de la semaine. Avant chaque
   intégration : récupérer ce que les autres ont fait, lancer toute la batterie, et seulement
   ensuite pousser. Un changement qui ne peut pas s'intégrer dans la journée est un élément en
   attente mal découpé : on le redécoupe.
3. **L'intégration continue est l'arbitre, pas l'humain.** Personne n'intègre avec la chaîne au
   rouge, et personne ne discute pour savoir si un changement « casse » : c'est la batterie qui le
   dit, la porte de qualité (9) et la caractérisation s'il s'agit d'un legacy. Celui qui met la
   branche partagée au rouge la répare avant toute autre chose, ou annule son changement.
4. **Ce qui est à moitié fait va derrière un interrupteur.** Une fonctionnalité qui prend plus
   d'une journée s'intègre quand même, éteinte par configuration, avec son interrupteur noté dans
   l'élément en attente, et s'allume quand l'élément se clôt avec sa preuve. Ainsi personne
   n'attend personne pour intégrer.
5. **Les listes ont un seul propriétaire, et la carte dit lequel.** La carte
   producteur-consommateur (11) est le détecteur de conflits de l'équipe : avant de toucher un
   contrat entre parties, on regarde qui le consomme, et les consommateurs se mettent à jour dans
   le même changement, même s'ils appartiennent à quelqu'un d'autre. L'arbre sémantique (2) est la
   carte partagée, et c'est celui qui ajoute un nœud qui le change, dans le même commit.
6. **Les décisions s'écrivent avec un nom, et valent pour tous.** Une règle métier décidée par un
   développeur avec le propriétaire va dans `docs/DECISIONS.md` sur le moment, parce que l'agent
   d'à côté en aura besoin le même après-midi et ne la devinera pas. Le contrat de collaboration
   (1) est unique pour l'équipe ; personne n'a de règles à soi que les autres ne lisent pas.
7. **On relit la preuve, pas le code, et c'est quelqu'un d'autre qui la relit.** Un élément en
   attente est clos par son propriétaire avec la routine complète (8, 9, 10, 12), et il est déclaré
   clos par une autre personne de l'équipe qui lit le rapport : le rouge, le vert, la régression,
   la qualité, le cas manuel. Personne ne clôt ses propres éléments en attente, et personne ne lit
   le code pour les clore.

Et une règle sur les agents, qui est celle qui change vraiment par rapport à une équipe sans
modèles : **chaque agent travaille au nom d'une personne**, avec son propre contexte de session, et
la seule chose qu'ils partagent est ce qui est écrit dans le dépôt. Il n'y a pas de mémoire commune
en dehors des fichiers. C'est pourquoi l'état vivant (`docs/STATUS.md`), les éléments en attente et
les décisions s'écrivent sur le moment, et non « à la fin de la journée » : l'agent du collègue va
les lire dans cinq minutes.

## Comment se répartissent les échelons dans une équipe

| Échelon | Qui le gravit | Ce qui change en équipe |
|---|---|---|
| 0 à 4, démarrage | Une seule personne, celle qui mène, avec le propriétaire. | Cela se fait une fois et avant que les autres n'entrent. Le squelette (4) inclut la chaîne d'intégration qui sera l'arbitre, et les portes (`docs/GATES.md`) incluent celles de la branche partagée. |
| 1, contrat | Le meneur l'écrit ; tous le signent. | On ajoute les sept règles ci-dessus comme routines. Un seul fichier pour l'équipe. |
| 5, éléments en attente | Le meneur ouvre le bloc avec le propriétaire ; chacun réclame. | L'élément en attente porte un champ « réclamé par » et « modules qu'il touche ». Deux éléments qui touchent le même module ne se réclament pas en même temps. |
| 6, décisions | Celui qui en a besoin, avec le propriétaire. | Cela s'écrit sur le moment, pas à la fin de la journée. |
| 7 à 12, la boucle | Chacun, avec son agent, sur son élément en attente. | Avant d'intégrer : récupérer, tout lancer, pousser. Ce qui est à moitié fait, derrière un interrupteur. Le rapport (12) est lu par un autre. |
| 9, qualité | Une seule configuration pour tous. | Personne n'a d'exceptions à soi au linter. |
| 10, cas de test manuel | Ils sont écrits par le propriétaire de l'élément ; ils sont exécutés par un autre. | Celui qui n'a pas construit la fonctionnalité est celui qui la teste le mieux. |
| 11, symétrie | Celui qui touche un contrat met à jour les consommateurs, quels qu'en soient les propriétaires. | La carte est le détecteur de conflits. |
| 13, audit | Une session distincte de toutes celles qui ont construit. | En équipe c'est plus facile : l'auditeur est celui qui n'a pas touché ce module. |
| 14 à 20, mise en production | Le meneur coordonne ; chaque échelon a un responsable. | Une personne promeut en production ; les autres non. |
| 21 à 23, exploitation | Un responsable de la supervision par cycle, à tour de rôle. | Le rapport cyclique est lu par toute l'équipe ; les éléments en attente qui en sortent se réclament comme n'importe quels autres. |

## Les prompts

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous (ou le meneur de l'équipe) qui le
faites, pas l'agent :

- `docs/WORKING_AGREEMENT.md` (échelon 1), clos, un seul pour l'équipe, avec la liste des membres
  et de leurs noms d'utilisateur dans le dépôt.
- `docs/PENDING.md` (échelon 5) avec le champ « réclamé par » et « modules qu'il touche » dans
  chaque élément en attente, même s'ils sont vides.
- La décision de l'équipe sur l'interrupteur de fonctionnalité : où il se déclare (la configuration
  du serveur, un fichier) et comment il se nomme, écrite dans `PROJECT.md`.
- La chaîne d'intégration (échelons 4 et 15) avec la batterie et la porte de qualité (9) comme
  condition de fusion dans la branche partagée, configurée sur la plateforme du dépôt (personne ne
  peut pousser avec la chaîne au rouge).
- État minimum acceptable : il y a un contrat unique, les éléments en attente ont les deux champs,
  et la plateforme refuse un push avec la chaîne au rouge.

**Routine de la branche partagée (va dans le contrat de collaboration) :**

> We work as a team on one shared branch, each person with their own agent session, and the only
> shared memory is what is written in the repository. Rules: (1) At the start of every session,
> read `docs/STATUS.md`, `docs/DECISIONS.md` and `docs/PENDING.md`; never touch a pending item
> claimed by someone else, and never take one that touches a module another claimed item touches.
> (2) Before every integration into the shared branch: pull the others' changes, run the full
> suite and the quality gate, and only then push; integrate several times a day, never at the end
> of the week. (3) Never push with the pipeline red; whoever turns it red fixes it before anything
> else or reverts. (4) Anything that cannot be finished and integrated today goes behind a feature
> switch, off by default, noted in the pending item. (5) Before touching a contract between parts
> (a service, a table, a list of values), look up its consumers in `docs/PRODUCER_CONSUMER_MAP.md`
> and update them in the same change, whoever owns them. (6) Every business decision goes to
> `docs/DECISIONS.md` the moment it is taken, with the person's name and the date. (7) Update
> `docs/STATUS.md` with what you are doing when you start and when you stop, so that the others'
> agents see it.
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
> Nous travaillons en équipe sur une seule branche partagée, chaque personne avec sa propre
> session d'agent, et la seule mémoire partagée est ce qui est écrit dans le dépôt. Règles :
> (1) Au début de chaque session, lis `docs/STATUS.md`, `docs/DECISIONS.md` et
> `docs/PENDING.md` ; ne touche jamais à un élément en attente réclamé par un autre, et ne prends
> jamais un élément qui touche un module que touche un autre élément réclamé. (2) Avant chaque
> intégration dans la branche partagée : récupère les changements des autres, lance la batterie
> complète et la porte de qualité, et seulement ensuite pousse ; intègre plusieurs fois par jour,
> jamais à la fin de la semaine. (3) Ne pousse jamais avec la chaîne au rouge ; celui qui la met au
> rouge la répare avant toute autre chose ou annule. (4) Tout ce qui ne peut pas être terminé et
> intégré aujourd'hui va derrière un interrupteur de fonctionnalité, éteint par défaut, noté dans
> l'élément en attente. (5) Avant de toucher un contrat entre parties (un service, une table, une
> liste de valeurs), cherche ses consommateurs dans `docs/PRODUCER_CONSUMER_MAP.md` et mets-les à
> jour dans le même changement, quels qu'en soient les propriétaires. (6) Toute décision métier va
> dans `docs/DECISIONS.md` au moment où elle est prise, avec le nom de la personne et la date.
> (7) Mets à jour `docs/STATUS.md` avec ce que tu es en train de faire quand tu commences et quand
> tu t'arrêtes, pour que les agents des autres le voient.
>
> Quand tu as besoin d'une décision de ma part, demande-la avec les quatre parties de l'UX-28
> (`docs/ANEXO_HEURISTICAS.md`) et dans cet ordre : les données qui rendent la question
> nécessaire, énumérées ; un paragraphe de cinq lignes au plus qui les relie et laisse voir la
> question ; la question avec ses réponses possibles numérotées ; et ta recommandation. Dis-le à
> la profondeur technique que le projet a déclarée dans `communication_depth` —`beginner`,
> `decision_maker` ou `technical`— ; si le projet n'en a déclaré aucune, utilise `decision_maker`.
>
> Réponds dans ma langue.

Ce que je lui demande : les sept règles transformées en routine de l'agent, parce que l'agent ne
voit pas les autres agents et qu'il ne respectera que ce qu'il lit ; la lecture obligatoire au
début de la session, qui est ce qui remplace la conversation de couloir ; l'intégration petite et
fréquente avec la batterie comme condition ; l'interrupteur pour ce qui est à moitié fait ; la
carte comme détecteur de conflits ; et l'état vivant écrit sur le moment.

**En réclamant un élément en attente :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- L'élément en attente que vous voulez prendre, choisi par vous dans la file, et un coup d'œil à
  ceux qui sont réclamés par d'autres : l'un d'eux touche-t-il le même module ?
- Votre nom d'utilisateur dans le dépôt, celui qui restera dans le champ « réclamé par ».
- État minimum acceptable : vous savez quels modules votre élément touche et que personne ne les a
  réclamés.

> I am taking pending item [PND-NNN]. Before anything: list the pending items claimed by others
> and tell me whether any of them touches the same modules as mine, by the "modules it touches"
> field and by the producer-consumer map; if there is an overlap, stop and tell me, do not start.
> If there is none, write my name in the "claimed by" field with today's date, write in
> `docs/STATUS.md` what I am starting, re-read the item's specification, and tell me which
> contracts of the map this item will touch and who consumes them.
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
> Je prends l'élément en attente [PND-NNN]. Avant tout : liste les éléments en attente réclamés par
> d'autres et dis-moi si l'un d'eux touche les mêmes modules que le mien, d'après le champ
> « modules qu'il touche » et d'après la carte producteur-consommateur ; s'il y a chevauchement,
> arrête-toi et dis-le-moi, ne commence pas. S'il n'y en a pas, écris mon nom dans le champ
> « réclamé par » avec la date d'aujourd'hui, écris dans `docs/STATUS.md` ce que je commence,
> relis la spécification de l'élément, et dis-moi quels contrats de la carte cet élément va
> toucher et qui les consomme.
>
> Quand tu as besoin d'une décision de ma part, demande-la avec les quatre parties de l'UX-28
> (`docs/ANEXO_HEURISTICAS.md`) et dans cet ordre : les données qui rendent la question
> nécessaire, énumérées ; un paragraphe de cinq lignes au plus qui les relie et laisse voir la
> question ; la question avec ses réponses possibles numérotées ; et ta recommandation. Dis-le à
> la profondeur technique que le projet a déclarée dans `communication_depth` —`beginner`,
> `decision_maker` ou `technical`— ; si le projet n'en a déclaré aucune, utilise `decision_maker`.
>
> Réponds dans ma langue.

Ce que je lui demande : la vérification du chevauchement avant de commencer, qui est le moment pas
cher pour éviter un conflit ; la réclamation écrite ; et la liste des consommateurs que je vais
toucher, pour savoir dès le départ à qui je change quelque chose.

**En intégrant :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- L'élément en attente avec sa routine de clôture faite ou, s'il est à moitié fait, l'interrupteur
  noté.
- La certitude que la branche partagée est au vert à cet instant (si elle est au rouge, on répare
  cela d'abord, quel qu'en soit l'auteur).
- État minimum acceptable : vous savez si vous intégrez quelque chose de terminé ou quelque chose
  à moitié fait derrière un interrupteur.

> We are going to integrate into the shared branch. Pull the others' changes first and tell me
> what came in and whether anything touches my modules. Resolve conflicts, if any, by reading
> both sides and asking me when a business rule is involved; never by keeping mine. Run the full
> suite, the quality gate and, if this is an inherited system, the characterization suite, and
> show me the counts. If anything is red, stop: tell me what and whose change it comes from. If
> this item is not finished, confirm the feature switch is off by default and say so in the
> commit message. Then push, show me the pipeline green on the shared branch, and update
> `docs/STATUS.md` and the pending item.
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
> Nous allons intégrer dans la branche partagée. Récupère d'abord les changements des autres et
> dis-moi ce qui est arrivé et si quelque chose touche mes modules. Résous les conflits, s'il y en
> a, en lisant les deux côtés et en me demandant quand une règle métier est en jeu ; jamais en
> gardant le mien. Lance la batterie complète, la porte de qualité et, s'il s'agit d'un système
> hérité, la batterie de caractérisation, et montre-moi les chiffres. Si quelque chose est au
> rouge, arrête-toi : dis-moi quoi et de quel changement de qui cela vient. Si cet élément n'est
> pas terminé, confirme que l'interrupteur est éteint par défaut et dis-le dans le message du
> commit. Ensuite pousse, montre-moi la chaîne au vert sur la branche partagée, et mets à jour
> `docs/STATUS.md` et l'élément en attente.
>
> Quand tu as besoin d'une décision de ma part, demande-la avec les quatre parties de l'UX-28
> (`docs/ANEXO_HEURISTICAS.md`) et dans cet ordre : les données qui rendent la question
> nécessaire, énumérées ; un paragraphe de cinq lignes au plus qui les relie et laisse voir la
> question ; la question avec ses réponses possibles numérotées ; et ta recommandation. Dis-le à
> la profondeur technique que le projet a déclarée dans `communication_depth` —`beginner`,
> `decision_maker` ou `technical`— ; si le projet n'en a déclaré aucune, utilise `decision_maker`.
>
> Réponds dans ma langue.

Ce que je lui demande : récupérer avant de pousser ; résoudre les conflits en lisant les deux
côtés et sans « gagner » (le réflexe du modèle face à un conflit est de garder sa version) ; la
batterie comme condition ; la chaîne au vert sur la branche partagée comme preuve, et non sur la
machine de l'agent ; et l'état vivant à jour.

## Vérification de complétude (c'est le meneur qui la fait, sans lire de code)

- Prenez trois éléments en attente clos cette semaine : ont-ils été clos par quelqu'un d'autre que
  leur propriétaire, en lisant le rapport ?
- Combien de fois par jour a-t-on intégré dans la branche partagée ? Demandez l'historique ; si
  c'est une fois par semaine, la règle 2 n'est pas respectée.
- Y a-t-il eu un conflit cette semaine ? Comment a-t-il été résolu, et y a-t-il un élément en
  attente de la carte pour cela ?
- Y a-t-il une fonctionnalité à moitié faite sans interrupteur dans la branche partagée ?
- `docs/STATUS.md` dit-il ce que chacun est en train de faire aujourd'hui ?

## Signaux d'alarme

- Chaque développeur a son propre contrat de collaboration « parce qu'il travaille autrement ».
  Les agents vont suivre des règles différentes sur le même code.
- Les intégrations s'accumulent pour le vendredi. C'est la forêt de branches, sans les branches.
- Quelqu'un lit le code du collègue pour approuver son élément en attente. La méthode s'est
  dégradée en relecture de code, qui est ce que le modèle fait moins bien que la preuve.
- Un conflit a été résolu « en gardant la version la plus récente ». Une règle métier s'est perdue
  sans que personne ne l'ait décidé.
- L'agent d'une personne a clos un élément en attente réclamé par une autre. La lecture au début de
  la session n'est pas dans le contrat, ou le contrat ne se lit pas.

## Ce qu'il reste à élaborer `[hypothèse]`

1. Ces règles viennent de la pratique connue de l'industrie sur les branches partagées et de ce que
   la méthode exige ; je ne les ai pas éprouvées avec une équipe de plusieurs agents travaillant en
   même temps. La première équipe qui les utilisera va les corriger, et la rétrospective (23) doit
   demander combien il y a eu de conflits et combien auraient pu être évités avec la carte.
2. Je ne sais pas combien de personnes une branche partagée supporte avec la méthode avant qu'une
   autre forme de travail ne devienne nécessaire. Mon intuition est que c'est plus que ce qu'elle
   supportait sans la méthode, parce que l'élément en attente spécifié et la carte enlèvent la
   moitié des motifs de conflit.
3. Dans Forge, le registre d'éléments en attente natif et le graphe de connaissance font la
   réclamation et la détection de chevauchement tout seuls ; dans les autres outils, cela se fait à
   la main avec les champs de l'élément en attente. Je n'ai pas encore éprouvé combien cela change
   en pratique.
