# Étape 20 — Documentation vivante et manuels qu'une personne peut suivre sans IA (contrat de l'échelon)

**Tronçon :** mise en production.
**Quand :** le manuel utilisateur grandit avec chaque bloc fonctionnel, à sa clôture, avec les
nouveaux écrans ; alimenté par les éléments en attente clos, qui sont la documentation de ce qui a
été fait. Les trois manuels complets se génèrent dans le tronçon de mise en production, après le
13, et le test avec une personne qui ne programme pas se fait avant le premier déploiement. La
routine du même commit régit toute l'exploitation.
**Forme :** routine ; plus un envoi long quand on génère les manuels.
**Taille :** proportionnel. Un petit système a besoin, au minimum, du manuel d'infrastructure et de
reprise ; celui de l'utilisateur peut tenir en une page. Ce qui ne change pas : si la personne qui
l'a construit disparaît, une autre doit pouvoir prendre la suite.

## À quoi il sert

Faites en sorte que le système puisse être utilisé, maintenu et remis sur pied sans l'agent et sans
vous. Si le jour où il n'y a pas d'agent on ne peut pas déployer, ce n'est pas terminé. Dans la
méthode classique, la documentation était chère et vieillissait ; ici, la régénérer est gratuit,
alors la règle devient « dans le même commit » et « reproductible à la main ». Les manuels que j'ai
écrits pour la Mutuelle avec ce critère sont le modèle [Ref. 24](../REFERENCIAS.md#ref-24) ; et le
fichier de projet devenu un historique de milliers de lignes est le contre-exemple
[Ref. 41](../REFERENCIAS.md#ref-41).

Un critère de qualité pour le manuel de reprise, qui sert à le juger sans être technicien : **il
doit pouvoir être suivi par une personne de confiance qui ne programme pas, à trois heures du
matin, avec le système tombé et l'agent hors ligne**. Si à une étape il dit « consulter le
développeur » ou « selon le cas », cette étape est incomplète.

Et cette épreuve **laisse trois choses écrites**, parce que si elle ne laisse rien, la barrière est
remplie sans rien mesurer — ce qui est la façon la moins chère d'avoir une barrière décorative. Les
trois sont : le **temps mesuré** de bout en bout (quand la personne a commencé, quand le système a
refonctionné), le **point exact où elle s'est bloquée** (l'étape du manuel, avec ses mots, pas avec
les vôtres), et **chaque mot qu'elle n'a pas compris**. Les trois vont avec la date et le nom de qui
a fait l'épreuve. Et chaque mot qu'elle n'a pas compris **ouvre un élément en attente** : soit on
l'explique dans le manuel, soit on change le nom de la chose dans tout le système. Cette liste de
mots est, de plus, le meilleur intrant du glossaire de l'utilisateur de l'échelon 2, et la
rétrospective de l'échelon 23 l'emploie comme proposition de changement.

Sans ces manuels, dit en un mot qui n'a pas besoin d'explication : **le propriétaire n'est pas
propriétaire, il est locataire**. Il a le système, il le paie, et il ne peut pas entrer sans demander
la permission à qui l'a construit.

Et une source qu'il ne faut pas gaspiller : les éléments en attente clos. Chacun apporte sa
spécification, sa décision, sa preuve et sa date. Le manuel utilisateur ne s'écrit pas de zéro à
la fin : il se monte, bloc par bloc, à partir des éléments qui ont été clos, et le journal des
modifications en sort directement.

## 1. Contexte requis

Ce qui suit est la liste générique. Les fichiers concrets que vous devez avoir faits avant chaque
prompt, avec leur contenu et leur état minimum, sont dans la section 2, dans le bloc « Avant
d'envoyer le prompt » qui précède chacun d'eux.
- Qui sont les lecteurs de chaque manuel : l'utilisateur final, celui qui maintient, celui qui
  exploite l'infrastructure. C'est le métier qui le sait ; l'agent demande si ce n'est pas clair.
- Le système qui tourne dans l'environnement de test, pour prendre des captures réelles.
- Les éléments en attente clos du bloc, avec leur documentation de clôture (échelon 5).
- `docs/DEPLOYMENT.md` (échelon 15) et `docs/LOCKS.md` (échelon 14), qui sont des intrants.

## 2. Prompts

**Routine (va dans le contrat de collaboration) :**

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous (ou le métier avec vous) qui le
faites, pas l'agent :

- `docs/WORKING_AGREEMENT.md`, où va la routine.
- La décision de quels manuels aura le système et pour qui est chacun (l'utilisateur final, celui
  qui maintient, celui qui exploite l'infrastructure), écrite dans `PROJECT.md` ou dite dans le
  chat, pour que « le manuel correspondant » ait un sens.
- État minimum acceptable : il y a une liste de manuels, chacun avec son lecteur.
> Every change that modifies what the user sees, what the operator does, or how the system is
> deployed, updates the corresponding manual in the same commit. At the close of every
> functional block, add to the user manual the screens and flows of the pending items closed
> in that block, with real screenshots from the test environment, and add their entries to the
> changelog. If you do not know which manual, ask.

> [fr]
> Tout changement qui modifie ce que l'utilisateur voit, ce que l'opérateur fait, ou la façon dont
> le système se déploie, met à jour le manuel correspondant dans le même commit. À la clôture de
> chaque bloc fonctionnel, ajoute au manuel utilisateur les écrans et les flux des éléments en
> attente clos dans ce bloc, avec des captures réelles de l'environnement de test, et ajoute leurs
> entrées au journal des modifications. Si tu ne sais pas dans quel manuel ça va, demande.

Ce que je lui demande : la règle du même commit, qui est la seule qui maintient un manuel à
jour ; la clôture de bloc comme moment où les éléments clos deviennent manuel et journal des
modifications ; et la question quand on ne sait pas clairement dans quel manuel ça va.

**Pour générer les manuels :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- Le système qui tourne dans l'environnement de test avec des données réalistes, pas vide : les
  captures sortent de là.
- Les éléments en attente clos avec leur documentation de clôture (échelon 5), qui sont la source
  du manuel de l'utilisateur et du journal des modifications.
- `docs/DEPLOYMENT.md` (échelon 15) et `docs/LOCKS.md` (échelon 14), qui sont l'intrant du manuel
  d'infrastructure et de récupération.
- Ce que seul le métier sait, préparé pour quand l'agent posera la question : qui est responsable
  de quoi, à quel téléphone on appelle quand ça tombe, qui fait la copie de sauvegarde, dans
  quelle langue lit l'utilisateur.
- État minimum acceptable : il y a des données dans l'environnement de test, et vous savez qui
  appeler à trois heures du matin.
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

Ce que je lui demande : les trois manuels avec leurs lecteurs ; des captures **réelles** de
l'environnement de test (pas des dessins ni des descriptions) ; le critère des trois heures du
matin pour celui de reprise ; la clause de complétude sous sa forme pour documenter : ce que seul
le métier sait se demande, et **on ne laisse pas de trou et on n'invente pas** ; et date et
version, pour qu'on sache à quel système correspond chaque manuel.

## 3. Résultat attendu

- `docs/USER_MANUAL.md` (ou HTML), avec des captures réelles et intégrées, qui a grandi bloc par
  bloc.
- `docs/MAINTENANCE_MANUAL.md`.
- `docs/INFRASTRUCTURE_AND_RECOVERY_MANUAL.md` : pas à pas, pour une personne.
- `docs/CHANGELOG.md`, alimenté par les éléments en attente clos.
- Chacun avec une date et la version du système qu'il documente.
- Dans les commits qui changent des écrans, l'exploitation ou le déploiement : le manuel mis à
  jour.
- **Le registre de l'épreuve du manuel de reprise**, avec quatre choses : la date et le nom de qui
  l'a faite ; le temps mesuré de bout en bout ; l'étape exacte où elle s'est bloquée, avec ses mots ;
  et la liste des mots qu'elle n'a pas compris. Plus un élément en attente ouvert pour chacun de ces
  mots. Où ça s'écrit, c'est votre choix — à la fin du manuel de reprise lui-même, ça suffit — ; ce
  qui n'est pas facultatif, c'est que ça existe.

## 4. Vérification de complétude

- Ouvrez le manuel utilisateur sur un écran au hasard : la capture coïncide-t-elle avec ce qu'il y
  a aujourd'hui dans l'environnement de test ?
- Le manuel de reprise, pourriez-vous le suivre vous-même, ou quelqu'un de confiance qui ne
  programme pas ? Lisez la section « il est tombé » : dit-elle quoi faire, dans l'ordre, avec les
  commandes ?
- Choisissez un commit récent qui a changé un écran : a-t-il touché au manuel ?
- Le journal des modifications a-t-il une entrée pour chaque élément clos du dernier bloc ?
- Y a-t-il un trou du type « [à compléter] » ou « consulter le responsable » ? Là, l'agent devait
  poser la question.
- Chaque manuel dit-il pour quelle version du système il vaut ?
- L'épreuve du manuel de reprise a-t-elle laissé son registre : combien de temps elle a pris, où la
  personne s'est bloquée et quels mots elle n'a pas compris, avec la date et le nom ? Et de ces mots,
  chacun a-t-il ouvert un élément en attente ? Si le registre dit « l'épreuve a été faite » et rien
  de plus, l'épreuve ne peut pas se répéter ni se comparer : la barrière est remplie sur le papier.

## 5. Signaux d'alarme

- Le manuel utilisateur a des captures d'une version qui n'existe plus. Il a été généré une fois
  et pas entretenu : la règle du même commit n'est pas dans le contrat ou n'est pas appliquée.
- Le manuel de reprise commence par « ouvrez une session avec l'agent ». Si l'agent est un
  prérequis, ce n'est pas un manuel pour une personne.
- Personne en dehors du constructeur n'a jamais lu le manuel de reprise. Demandez à quelqu'un de
  le suivre dans l'environnement de test ; ce qui le bloque est ce qu'il faut corriger.
- L'épreuve a été faite et n'a pas été enregistrée, ou a été enregistrée comme « ça s'est bien
  passé ». Alors personne ne peut dire combien de temps elle a pris ni où elle a été près de ne pas
  marcher, et la prochaine fois on repart de zéro.
- Le registre n'a pas un seul mot dans la liste de ceux qui n'ont pas été compris. Ça arrive de temps
  en temps et c'est vrai ; ça arrive toujours et ça veut dire que personne n'a demandé.
