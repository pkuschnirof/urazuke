# Étape 13 — Intégration continue, environnements, secrets et déploiement comme partie du produit (contrat de l'échelon)

**Phase :** exploitation (se monte sur le squelette de l'échelon 4 ; se révise à chaque changement
d'infrastructure).
**Forme :** un seul envoi pour le monter ; routine pour chaque déploiement.
**Taille :** obligatoire dans tout projet avec des utilisateurs. Dans un petit, « intégration
continue » peut être une seule action GitHub et « environnements » deux dossiers sur le même
serveur ; ce qui ne se négocie pas, c'est que les tests tournent seuls, que la configuration ne soit
pas dans le dépôt, et qu'il y ait un chemin de retour.

## À quoi il sert

À ce qu'arriver en production soit un paquet reproductible : les tests tournent UNE fois, la
configuration vit hors du dépôt, et les secrets ne traînent pas. Il évite les tests qui tournent
trois fois par commit (2 000 minutes de quota en 16 jours), la clé de la base imprimée dans une
transcription, le CORS qui ne connaissait que le premier domaine, et la configuration écrasée par
la batterie de tests.

Sur les secrets il y a une règle à adopter comme un réflexe, sans exception : **un secret qui a été
vu dans un chat, un journal ou un commit n'est plus un secret**. Peu importe que « personne ne l'ait
vu » ou qu'il « ait été effacé après ». On le fait tourner. La rotation coûte dix minutes ; savoir si
quelqu'un l'a utilisé est impossible.

## 1. Contexte requis

- **Relevé des environnements et des accès**, de façon générique : quels environnements existent
  (test, production), où ils tournent, qui a accès, comment on promeut quelque chose de l'un à
  l'autre, quels secrets existent et où ils vivent aujourd'hui, combien de quota d'intégration
  continue il y a. L'agent évalue si cela suffit et demande.
- Le squelette avec son intégration continue et son déploiement dans l'environnement de test
  (échelon 4).

## 2. Prompts

**Initial :**

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

Ce que nous demandons, clause par clause : les accès avant de commencer ; les tests **une seule
fois** par commit (les lancer trois fois est ce qui a brûlé le quota) ; le déploiement qui ne fait
qu'empaqueter ; la configuration hors du dépôt ; la promotion comme procédure répétable ; le retour
arrière **testé** (un retour arrière jamais testé n'existe pas) ; le verrou contre les secrets dans
les commits ; et la documentation pour une personne, qui est l'échelon 14 appliqué à
l'infrastructure.

**Routine de chaque déploiement :**

> Before touching production: the test environment is green with the same version; the
> rollback is ready; and tell me what changes in the configuration. After deploying: show me
> the version running in production and an end-to-end check on production, read-only.

Ce que nous demandons : les trois conditions préalables (test au vert avec la même version, retour
arrière prêt, changements de configuration annoncés) et les deux preuves postérieures (la version
qui tourne et une vérification de bout en bout sans rien écrire).

**Si un secret est apparu dans le chat ou dans un commit :**

> That secret is compromised: rotate it now, tell me everywhere else it was used, and add the
> check that would have caught it.

Ce que nous demandons : rotation immédiate, inventaire des autres endroits où il était, et la
vérification qui l'aurait détecté, pour que la prochaine fois il n'arrive pas jusqu'au chat.

## 3. Résultat attendu

- L'intégration continue tournant une seule fois par commit, avec le lien vers une exécution.
- Le déploiement qui attend l'intégration et ne fait qu'empaqueter ; mesuré : combien de temps il
  prend avant et après.
- La configuration hors du dépôt ; dans le dépôt, seulement un exemple sans valeurs.
- `docs/DEPLOYMENT.md` : comment déployer, promouvoir et revenir en arrière, pas à pas, pour une
  personne.
- Le retour arrière testé au moins une fois, avec sa preuve.
- La vérification anti-secrets active (une tentative d'en téléverser un, rejetée).
- Un relevé du quota d'intégration continue consommé par mois.

## 4. Vérification de complétude

- Combien de fois la batterie tourne-t-elle par commit ? Ce doit être une. Demandez le lien.
- Y a-t-il une valeur de configuration réelle (une clé, un mot de passe, une URL interne) dans le
  dépôt ? Demandez à l'agent de chercher et de vous montrer la recherche vide.
- Pourriez-vous suivre `docs/DEPLOYMENT.md` vous-même, sans l'agent ? Lisez-le avec cette question.
- Le retour arrière a-t-il été testé ? Quand ? Quelle preuve y a-t-il ?
- Un secret a-t-il été collé dans le chat pendant le projet ? Si oui, a-t-il été renouvelé ?
- Savez-vous combien de quota d'intégration continue il reste ce mois-ci ?

## 5. Signaux d'alarme

- Le déploiement en production se fait « à la main, vite, parce que c'est un petit changement ».
  Les petits changements sont ceux qui cassent la production, parce que personne ne les teste.
- Le fichier d'exemple de configuration a des valeurs qui semblent réelles. Elles le sont
  probablement.
- Personne ne peut dire quand le retour arrière a été testé pour la dernière fois.
