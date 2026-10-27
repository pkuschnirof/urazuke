# Étape 18 — Scan et résolution des vulnérabilités, dans la chaîne et avec un calendrier (contrat de l'échelon)

**Tronçon :** mise en production.
**Quand :** dans la phase de mise en production, après le 13 (le scan tourne dans l'intégration
continue) et avant le premier déploiement : aucun P0 ouvert n'est promu. Ensuite, à chaque push, et
avec un calendrier propre (hebdomadaire) même s'il n'y a pas de push, parce que les nouvelles
vulnérabilités apparaissent sans que vous ne changiez rien. Dans un système hérité, la première
passe fait partie de N3 (la dimension sécurité de l'audit) et les constats entrent dans le backlog
avec leur marque de vitesse.
**Forme :** un seul envoi pour monter le dispositif et le lancer ; ensuite, automatique, avec un
rapport que vous lisez.
**Taille :** obligatoire dans tout projet qui va avoir des utilisateurs : le scan des dépendances et
celui des secrets ne se négocient pas ; l'analyse statique et la ligne de base de configuration,
proportionnelles.

## À quoi il sert

L'audit de l'échelon 13 regarde le système avec un œil neuf de temps en temps ; cet échelon regarde
une seule chose, la sécurité, tout le temps et par machine. Ils sont complémentaires : l'audit
trouve ce qui demande du jugement (une porte d'administrateur que personne ne devrait avoir
[Ref. 40](../REFERENCIAS.md#ref-40)) ; le scan trouve ce qui demande de la constance (la dépendance
qui hier n'avait pas de vulnérabilité connue et aujourd'hui si
[Ref. 41](../REFERENCIAS.md#ref-41)). Le premier audit de sécurité formel m'a convaincu que la
sécurité est une routine périodique et non une liste que l'on coche une fois
[Ref. 23](../REFERENCIAS.md#ref-23) ; cet échelon est cette routine rendue machine.

Et une règle que je veux écrite : **une mise à jour de dépendance est un changement**, et elle entre
par la boucle comme n'importe quel autre. « J'ai monté la version pour fermer la vulnérabilité »
sans régression ni bout en bout est la façon la plus courante de casser la production un vendredi.

**Si vous débutez.** Une *vulnérabilité* est un défaut que quelqu'un peut utiliser pour entrer,
voler des données ou faire que le système fasse quelque chose qu'il ne devrait pas. Il y en a de
quatre types que cet échelon cherche par machine. Dans les *dépendances* : les morceaux de logiciel
d'autres gens que votre système utilise (il existe des bases publiques qui listent ceux qui ont des
défauts connus, identifiés par un numéro CVE). Dans le *code* : l'*analyse statique* lit le code
sans l'exécuter en cherchant des motifs dangereux, comme une *injection* (qu'un utilisateur écrive
dans un formulaire quelque chose que la base interprète comme un ordre). Dans l'*historique* : un
secret (un mot de passe, une clé) qui a un jour été enregistré dans le dépôt y reste même s'il a été
effacé ensuite. Et dans la *configuration* : des ports ouverts dont on n'avait pas besoin, des mots
de passe par défaut, des *en-têtes de sécurité* (instructions que le serveur envoie au navigateur
pour le protéger) qui manquent.

## 1. Contexte requis

Ce qui suit est la liste générique. Les fichiers concrets que vous devez avoir faits avant chaque
prompt, avec leur contenu et leur état minimum, sont dans la section 2, dans le bloc « Avant
d'envoyer le prompt » qui précède chacun d'eux.

- L'intégration continue (échelons 4 et 15), où tourne le scan.
- Le relevé des environnements : quel serveur, quel conteneur, quels ports, pour la ligne de base
  de configuration.
- L'audit précédent (11, ou N3), pour ne pas rapporter ce qui est déjà connu.
- Votre critère sur ce qu'est un P0 : ce qui permet d'entrer, ce qui expose des données
  personnelles, ce qui permet de facturer ou d'envoyer sans contrôle.

## 2. Prompts

**Initial (monter, lancer, proposer) :**

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous (ou le métier avec vous) qui le
faites, pas l'agent :

- L'intégration continue qui tourne à chaque push (échelons 4 et 15), avec un quota suffisant : le
  scan ajoute des minutes par passage ; renseignez-vous sur ce qu'il vous reste.
- `docs/ENVIRONMENTS_SURVEY.md` avec le serveur, le conteneur s'il y en a un, les ports exposés et
  qui administre le domaine, pour que l'agent sache quelle ligne de base appliquer.
- `docs/AUDIT_[date].md` (échelon 13 ou N3), pour qu'il ne rapporte pas ce qui est connu.
- Votre critère de P0 en deux lignes, pour le trou du prompt. Pour la plupart des systèmes : ce qui
  permet d'entrer sans identifiant, ce qui expose des données personnelles, ce qui permet de
  facturer, d'envoyer ou d'effacer sans contrôle.
- Un accès en lecture de l'agent au serveur pour la ligne de base de configuration ; si vous ne le
  lui donnez pas, cette partie reste comme non scannée, et il doit le dire.
- État minimum acceptable : l'intégration continue tourne, vous connaissez le quota, et vous avez
  écrit ce qu'est un P0.

> We are going to scan this system for vulnerabilities and fix what matters before production.
> Set up, in continuous integration, on every push and also on a weekly schedule: (1) a scan of
> every dependency against the known vulnerability databases; (2) static analysis of the code for
> the common classes of defect (injection, insecure deserialization, path traversal, weak
> cryptography, hard-coded secrets, insecure defaults); (3) a secrets scan over the whole
> repository history; (4) a check of the server and container configuration against a baseline
> (exposed ports, default credentials, permissions, security headers, transport encryption). Run
> all of it now and write `docs/SECURITY_[date].md` with every finding: where, the risk, the
> evidence, the priority (P0 must be fixed now by my criteria: [criteria]; P1 before production;
> P2 when possible), and whether a fix exists (an upgrade, a patch, a configuration change). If a
> part cannot be scanned from where you are, say so and mark it as not scanned; do not pass it as
> clean. Then propose the fixes for every P0 and P1, one pending item each. Do not apply any
> upgrade yet: an upgrade is a change and goes through the full routine.
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
> Nous allons scanner ce système à la recherche de vulnérabilités et corriger ce qui compte avant la
> production. Mets en place, dans l'intégration continue, à chaque push et aussi selon un calendrier
> hebdomadaire : (1) un scan de chaque dépendance contre les bases de vulnérabilités connues ; (2)
> une analyse statique du code pour les classes communes de défaut (injection, désérialisation non
> sûre, traversée de chemins, cryptographie faible, secrets écrits en dur, valeurs par défaut non
> sûres) ; (3) un scan des secrets sur tout l'historique du dépôt ; (4) une vérification de la
> configuration du serveur et du conteneur contre une ligne de base (ports exposés, identifiants par
> défaut, permissions, en-têtes de sécurité, chiffrement du transport). Lance tout cela maintenant
> et écris `docs/SECURITY_[date].md` avec chaque constat : où, le risque, la preuve, la priorité (un
> P0 doit être corrigé tout de suite selon mon critère : [critère] ; un P1 avant la production ; un
> P2 quand ce sera possible), et s'il existe une correction (une mise à jour, un correctif, un
> changement de configuration). Si une partie ne peut pas être scannée depuis où tu es, dis-le et
> marque-la comme non scannée ; ne la donne pas pour propre. Ensuite propose les corrections pour
> chaque P0 et P1, un élément en attente chacune. N'applique encore aucune mise à jour : une mise à
> jour est un changement et passe par la routine complète.
>
> Quand tu as besoin d'une décision de ma part, demande-la avec les quatre parties de l'UX-28
> (`docs/ANEXO_HEURISTICAS.md`) et dans cet ordre : les données qui rendent la question
> nécessaire, énumérées ; un paragraphe de cinq lignes au plus qui les relie et laisse voir la
> question ; la question avec ses réponses possibles numérotées ; et ta recommandation. Dis-le à
> la profondeur technique que le projet a déclarée dans `communication_depth` —`beginner`,
> `decision_maker` ou `technical`— ; si le projet n'en a déclaré aucune, utilise `decision_maker`.
>
> Réponds dans ma langue.

Ce que je lui demande : les quatre couches de scan (dépendances, code, secrets dans l'historique,
configuration), dans la chaîne **et avec un calendrier**, parce que les nouvelles vulnérabilités
n'attendent pas votre prochain push ; le rapport avec la forme de l'échelon 13, avec la clause du
« non scanné » au lieu de « propre » ; le critère de P0 donné par moi ; et l'interdiction de mettre
à jour sans passer par la boucle, qui est celle qui évite le vendredi cassé.

**De clôture (corriger et transformer en porte) :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- `docs/SECURITY_[date].md` lu par vous, avec deux constats vérifiés (demandez-lui la preuve).
- La liste des corrections approuvées pour le trou du prompt ; pour chaque mise à jour de
  dépendance, la conscience que c'est un changement et que la régression et le bout en bout vont
  tourner.
- État minimum acceptable : aucun P0 sans verdict.

> Fix [list], each as its own pending item, with its test proved red where a test applies (an
> injection that no longer passes, a header that is now present, a secret that is now refused),
> and with the regression suite and the end-to-end suite green after every upgrade. Run the scan
> again and show me it is clean of P0 and P1. Make the scan a gate in `docs/GATES.md`: nothing is
> promoted to production with an open P0, and a new P1 opens a pending item automatically. Record
> the policy, the schedule and what is not covered in `docs/SECURITY.md`.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [fr]
> Corrige [liste], chacune comme son propre élément en attente, avec son test prouvé en rouge là où
> un test s'applique (une injection qui ne passe plus, un en-tête qui est maintenant présent, un
> secret qui est maintenant refusé), et avec la suite de régression et la batterie de bout en bout
> au vert après chaque mise à jour. Relance le scan et montre-moi qu'il est propre de P0 et de P1.
> Fais du scan une porte dans `docs/GATES.md` : rien n'est promu en production avec un P0 ouvert, et
> un nouveau P1 ouvre un élément en attente automatiquement. Consigne la politique, le calendrier et
> ce qui n'est pas couvert dans `docs/SECURITY.md`.
>
> Quand tu as besoin d'une décision de ma part, demande-la avec les quatre parties de l'UX-28
> (`docs/ANEXO_HEURISTICAS.md`) et dans cet ordre : les données qui rendent la question
> nécessaire, énumérées ; un paragraphe de cinq lignes au plus qui les relie et laisse voir la
> question ; la question avec ses réponses possibles numérotées ; et ta recommandation. Dis-le à
> la profondeur technique que le projet a déclarée dans `communication_depth` —`beginner`,
> `decision_maker` ou `technical`— ; si le projet n'en a déclaré aucune, utilise `decision_maker`.

Ce que je lui demande : un élément en attente par correction, avec le rouge de l'échelon 8 là où
c'est possible (une vulnérabilité corrigée sans test revient au prochain remaniement) ; le scan
relancé comme preuve ; et la transformation en porte, qui est ce qui fait que cet échelon reste
vivant quand personne ne le regarde.

## 3. Résultat attendu

- Le scan en quatre couches qui tourne à chaque push et chaque semaine.
- `docs/SECURITY_[date].md` avec les constats et ce qui n'a pas été scanné ; `docs/SECURITY.md` avec
  la politique, le calendrier, la porte et la couverture.
- Les P0 et P1 corrigés, chacun avec son élément en attente et son test là où il s'applique.
- La porte dans `docs/GATES.md`.

## 4. Vérification de complétude

- Demandez-lui le lien vers la dernière passe du scan : est-elle au vert, et de quelle date ?
- Le rapport dit-il ce qu'il n'a PAS scanné ?
- Chaque P0 a-t-il son élément en attente clos avec sa preuve, ou ouvert avec une date ?
- Demandez-lui d'introduire exprès une dépendance avec une vulnérabilité connue dans une branche :
  la chaîne passe-t-elle au rouge ?
- Savez-vous quand tourne le prochain scan programmé ?

## 5. Signaux d'alarme

- Le scan est passé propre du premier coup sur un système de plus d'un mois. Ce n'est presque jamais
  vrai : il manque une couche, ou on n'a scanné que la branche et pas l'historique.
- Dix dépendances ont été mises à jour dans un commit « pour fermer les constats ». Ce commit n'a ni
  avant ni après ; c'est le vendredi cassé qui attend.
- Le scan est là mais ce n'est pas une porte : il produit des rapports que personne ne lit.
- Il y a un P0 « accepté » sans élément en attente, sans date et sans signature.
