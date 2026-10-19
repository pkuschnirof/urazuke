# Étape 15 — Intégration continue, environnements, secrets et déploiement comme partie du produit (contrat de l'échelon)

**Tronçon :** mise en production.
**Quand :** la chaîne d'intégration et le déploiement vers l'environnement de test se montent à
l'échelon 4. La clôture vers la production — environnement réel, secrets sur le serveur, promotion,
retour arrière prouvé, verrou contre les secrets — se fait dans le tronçon de mise en production,
après l'audit et les verrous. La routine de chaque déploiement s'applique pendant toute
l'exploitation.
**Forme :** un seul envoi pour le monter ; routine pour chaque déploiement.
**Taille :** obligatoire dans tout projet avec des utilisateurs. Dans un petit projet,
« intégration continue » peut être une seule action GitHub et « environnements » peuvent être
deux dossiers sur le même serveur ; ce qui ne se négocie pas, c'est que les tests tournent seuls,
que la configuration ne soit pas dans le dépôt, et qu'il y ait un retour arrière.

## À quoi il sert

Faites en sorte qu'arriver en production soit un paquet reproductible : les tests tournent UNE
fois, la configuration vit hors du dépôt, et les secrets ne traînent pas. Cela évite les tests
lancés trois fois par commit et le quota brûlé [Ref. 39](../REFERENCIAS.md#ref-39), le déploiement
durci à coups d'éléments en attente pour l'avoir découvert tard
[Ref. 32](../REFERENCIAS.md#ref-32), et les secrets collés dans le chat
[Ref. 42](../REFERENCIAS.md#ref-42).

Sur les secrets, il y a une règle à adopter comme réflexe, sans exception : **un secret qui a été
vu dans un chat, dans un journal ou dans un commit n'est plus un secret**. Peu importe si
« personne ne l'a vu » ou s'il « a été effacé ensuite ». On le fait tourner. La rotation coûte
dix minutes ; savoir si quelqu'un l'a utilisé est impossible.

## 1. Contexte requis

Ce qui suit est la liste générique. Les fichiers concrets que vous devez avoir faits avant chaque
prompt, avec leur contenu et leur état minimum, sont dans la section 2, dans le bloc « Avant
d'envoyer le prompt » qui précède chacun d'eux.
- **Relevé des environnements et des accès**, de façon générique : quels environnements existent
  (test, production), où ils tournent, qui a accès, comment on promeut quelque chose de l'un à
  l'autre, quels secrets existent et où ils vivent aujourd'hui, combien de quota d'intégration
  continue il y a. L'agent évalue si cela suffit et pose des questions.
- Le squelette avec son intégration continue et son déploiement vers le test (échelon 4).

## 2. Prompts

**Initial :**

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous (ou le métier avec vous) qui le
faites, pas l'agent :

- `docs/ENVIRONMENTS_SURVEY.md` (échelon 4), complété avec ce qui manque pour la production : le
  domaine et qui l'administre ; où vont vivre les secrets sur le serveur (fichier d'environnement,
  coffre) et quels ils sont (le nom, jamais la valeur) ; comment on promeut aujourd'hui quelque
  chose du test vers la production, s'il y a quelque chose ; qui peut toucher à la production ;
  combien de quota d'intégration continue vous avez (la limite du forfait de votre fournisseur) et
  combien vous en avez consommé ; comment se ferait un retour arrière aujourd'hui. Le prompt le
  nomme « the environments and access survey » : dites-lui où il est.
- L'accès à la production pour l'agent, décidé par vous : lequel, avec quel identifiant, et
  l'identifiant hors du dépôt et du chat.
- Le squelette avec son intégration continue et son déploiement vers le test qui fonctionnent
  (échelon 4), et `docs/STATUS.md` avec les commandes.
- État minimum acceptable : vous savez où vont vivre les secrets et combien de quota il vous
  reste. Si vous ne connaissez pas le quota, renseignez-vous avant : cet échelon existe en partie
  pour cela.
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
> Évalue si tu as ce qu'il faut pour déployer en production en sécurité (accès, domaine, où
> vivent les secrets, comment revenir en arrière) ; s'il manque quelque chose, demande-le-moi.
> Ensuite monte : (1) l'intégration continue lance la batterie complète exactement une fois par
> commit ; (2) le déploiement attend le résultat de cette exécution et ne fait qu'empaqueter et
> téléverser, sans relancer les tests ; (3) la configuration de chaque environnement vit sur le
> serveur (fichier d'environnement ou coffre), jamais dans le dépôt ; (4) une procédure écrite
> pour promouvoir de l'environnement de test vers la production, qui puisse être lancée deux fois
> sans rien casser ; (5) le retour arrière, prouvé ; (6) une vérification automatique qui empêche
> de committer un secret. Documente tout cela dans `docs/DEPLOYMENT.md` de façon qu'une personne
> puisse le faire à la main sans toi. Réponds dans ma langue.

Ce que je lui demande, clause par clause : les accès avant de commencer ; les tests **une seule
fois** par commit (les lancer trois fois est ce qui a brûlé le quota) ; le déploiement qui ne fait
qu'empaqueter ; la configuration hors du dépôt ; la promotion comme procédure répétable ; le
retour arrière **prouvé** (un retour arrière qui n'a jamais été prouvé n'existe pas) ; le verrou
contre les secrets dans les commits ; et la documentation pour une personne, qui est l'échelon 20
appliqué à l'infrastructure.

**Routine de chaque déploiement :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- `docs/WORKING_AGREEMENT.md`, où va la routine.
- `docs/DEPLOYMENT.md` (le prompt initial de cet échelon), écrit et lu par vous : pourriez-vous le
  suivre tout seul ?
- Avant chaque déploiement réel, en plus : la batterie complète de bout en bout au vert avec la
  version exacte (échelon 8, clôture de bloc), et l'audit fait si c'est le premier déploiement
  (échelon 13).
- État minimum acceptable : le retour arrière a été prouvé au moins une fois avant qu'il y ait des
  utilisateurs.
> Before touching production: the test environment is green with the same version; the
> rollback is ready; and tell me what changes in the configuration. After deploying: show me
> the version running in production and an end-to-end check on production, read-only.

> [fr]
> Avant de toucher à la production : l'environnement de test est au vert avec la même version ;
> le retour arrière est prêt ; et dis-moi ce qui change dans la configuration. Après avoir
> déployé : montre-moi la version qui tourne en production et une vérification de bout en bout
> sur la production, en lecture seule.

Ce que je lui demande : les trois conditions préalables (test au vert avec la même version,
retour arrière prêt, changements de configuration annoncés) et les deux preuves postérieures (la
version qui tourne et une vérification de bout en bout sans rien écrire).

**Si un secret est apparu dans le chat ou dans un commit :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- Le secret identifié : lequel c'est (son nom, jamais sa valeur), où il est apparu (le chat, un
  commit, un journal) et quand. S'il est apparu dans un commit, le commit.
- Votre accès à l'endroit où il se génère (le panneau du fournisseur), au cas où l'agent ne
  pourrait pas le remplacer tout seul. La rotation, vous la faites vous-même ou il la fait avec
  votre identifiant, mais elle ne se reporte pas.
- État minimum acceptable : vous pouvez nommer le secret et dire où il a été vu. Et la règle sans
  exceptions : ce prompt ne s'envoie pas « plus tard ».
> That secret is compromised: rotate it now, tell me everywhere else it was used, and add the
> check that would have caught it.

> [fr]
> Ce secret est compromis : fais-le tourner maintenant, dis-moi partout ailleurs où il a été
> utilisé, et ajoute la vérification qui l'aurait attrapé.

Ce que je lui demande : rotation immédiate, inventaire des autres endroits où il se trouvait, et
la vérification qui l'aurait détecté, pour que la prochaine fois il n'arrive pas jusqu'au chat.

## 3. Résultat attendu

- L'intégration continue qui tourne une seule fois par commit, avec le lien vers une exécution.
- Le déploiement qui attend l'intégration et ne fait qu'empaqueter ; mesuré : combien de temps il
  prend avant et après.
- La configuration hors du dépôt ; dans le dépôt, seulement un exemple sans valeurs.
- `docs/DEPLOYMENT.md` : comment déployer, promouvoir et revenir en arrière, pas à pas, pour une
  personne.
- Le retour arrière prouvé au moins une fois, avec sa preuve.
- La vérification anti-secrets active (une tentative d'en pousser un, refusée).
- Un registre du quota d'intégration continue consommé par mois.

## 4. Vérification de complétude

- Combien de fois la batterie tourne-t-elle par commit ? Ce doit être une. Demandez le lien.
- Y a-t-il une valeur réelle de configuration (une clé, un mot de passe, une URL interne) dans le
  dépôt ? Demandez à l'agent de chercher et de vous montrer la recherche vide.
- Pourriez-vous suivre `docs/DEPLOYMENT.md` tout seul, sans l'agent ? Lisez-le avec cette question.
- Le retour arrière a-t-il été prouvé ? Quand ? Quelle preuve y a-t-il ?
- Un secret a-t-il été collé dans le chat pendant le projet ? Si oui, a-t-il été tourné ?
- Savez-vous combien de quota d'intégration continue il reste ce mois-ci ?

## 5. Signaux d'alarme

- Le déploiement en production se fait « à la main, vite, parce que c'est un petit changement ».
  Les petits changements sont ceux qui cassent la production, parce que personne ne les teste.
- Le fichier d'exemple de la configuration a des valeurs qui ont l'air réelles. Elles le sont
  probablement.
- Personne ne sait dire quand le retour arrière a été prouvé pour la dernière fois.
