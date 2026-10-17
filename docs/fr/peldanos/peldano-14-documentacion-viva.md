# Étape 14 — Documentation vivante et manuels qu'une personne peut suivre sans IA (contrat de l'échelon)

**Phase :** exploitation (naît avec le système ; s'entretient à chaque changement).
**Forme :** routine ; plus un envoi long quand on génère les manuels.
**Taille :** proportionnel. Un petit système a besoin, au minimum, du manuel d'infrastructure et de
reprise (comment on le relance, comment on restaure) ; celui de l'utilisateur peut tenir en une
page. Ce qui ne change pas : si la personne qui l'a construit disparaît, une autre doit pouvoir
continuer.

## À quoi il sert

À ce que le système puisse être utilisé, maintenu et récupéré sans l'agent et sans la personne qui
l'a construit. Si, le jour où l'agent n'est pas là, on ne peut pas déployer, ce n'est pas terminé.
Dans la méthode classique la documentation coûtait cher et vieillissait ; ici la régénérer est
gratuit, donc la règle devient « dans le même commit » et « reproductible à la main ». Il évite le
document périmé qui a provoqué un commit dans le mauvais dépôt, et le fichier de projet transformé
en historique.

Un critère de qualité pour le manuel de reprise, qui permet de le juger sans être technicien :
**une personne de confiance qui ne programme pas doit pouvoir le suivre, à trois heures du matin,
avec le système en panne et l'agent hors ligne**. Si une étape dit « consulter le développeur » ou
« selon le cas », cette étape est incomplète.

## 1. Contexte requis

- Qui sont les lecteurs de chaque manuel : l'utilisateur final, celui qui maintient, celui qui
  exploite l'infrastructure. Le métier le sait ; l'agent demande si ce n'est pas clair.
- Le système tournant dans l'environnement de test, pour prendre de vraies captures.
- `docs/DEPLOYMENT.md` (échelon 13) et `docs/LOCKS.md` (échelon 12), qui sont des intrants.

## 2. Prompts

**Routine (va dans le contrat de collaboration) :**

> Every change that modifies what the user sees, what the operator does, or how the system is
> deployed, updates the corresponding manual in the same commit. If you do not know which
> manual, ask.

Ce que nous demandons : la règle du même commit, qui est la seule qui maintient un manuel à jour,
et la question quand on ne sait pas dans quel manuel cela va.

**Pour générer les manuels :**

> Generate three manuals from the system as it is today in the test environment: the user
> manual (screen by screen, with real screenshots, in the user's language, no jargon); the
> maintenance manual (how it is built, where everything is, how to run the test suite, how to
> add a module); and the infrastructure and recovery manual (how to deploy, how to roll back,
> how to restore a backup, what to do if it goes down; written for a person who has to do it by
> hand, without AI, at three in the morning). If for any section you need something only the
> business knows (who is responsible for what, which phone number to call), ask me; do not leave
> a gap and do not invent. Each manual carries a date and the system version. Reply in my
> language.

Ce que nous demandons : les trois manuels avec leurs lecteurs ; des captures **réelles** de
l'environnement de test (pas des dessins ni des descriptions) ; le critère des trois heures du
matin pour celui de reprise ; la clause de complétude sous sa forme pour documenter : ce que seul le
métier sait se demande, et **on ne laisse pas de trou et on n'invente pas** ; et date et version,
pour qu'on sache à quel système correspond chaque manuel.

## 3. Résultat attendu

- `docs/USER_MANUAL.md` (ou HTML), avec des captures réelles et intégrées.
- `docs/MAINTENANCE_MANUAL.md`.
- `docs/INFRASTRUCTURE_AND_RECOVERY_MANUAL.md` : pas à pas, pour une personne.
- Chacun avec la date et la version du système qu'il documente.
- Dans les commits qui changent écrans, exploitation ou déploiement : le manuel mis à jour.

## 4. Vérification de complétude

- Ouvrez le manuel utilisateur à un écran au hasard : la capture correspond-elle à ce qu'il y a
  aujourd'hui dans l'environnement de test ?
- Le manuel de reprise, pourriez-vous le suivre, vous ou quelqu'un de confiance qui ne programme
  pas ? Lisez la section « c'est tombé » : dit-elle quoi faire, dans l'ordre, avec les commandes ?
- Choisissez un commit récent qui a changé un écran : a-t-il touché le manuel ?
- Y a-t-il un trou du type « [à compléter] » ou « consulter le responsable » ? C'est là que l'agent
  devait demander.
- Chaque manuel dit-il pour quelle version du système il vaut ?

## 5. Signaux d'alarme

- Le manuel utilisateur a des captures d'une version qui n'existe plus. Il a été généré une fois et
  pas entretenu : la règle du même commit n'est pas dans le contrat ou n'est pas appliquée.
- Le manuel de reprise commence par « ouvrir une session avec l'agent ». Si l'agent est un
  prérequis, ce n'est pas un manuel pour une personne.
- Personne en dehors du constructeur n'a jamais lu le manuel de reprise. Demandez à quelqu'un de le
  suivre dans l'environnement de test ; ce qui le bloque est ce qu'il faut corriger.
