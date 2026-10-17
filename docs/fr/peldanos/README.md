# Les contrats d'échelon

Un fichier par échelon. Chacun a le même squelette : l'en-tête avec la phase, la forme et la taille
(obligatoire ou proportionnel) ; à quoi il sert ; (1) le contexte requis, nommé de façon générique ;
(2) les prompts, **en anglais**, chacun suivi de l'explication dans la langue du lecteur de ce que
nous demandons et pourquoi chaque clause est là ; (3) le résultat attendu, avec ses
caractéristiques ; (4) la vérification de complétude, que fait le propriétaire sans lire de code ;
(5) les signaux d'alarme, les symptômes d'un échelon mal gravi.

Les prompts en anglais sont une pièce unique, identique dans toutes les versions du document dans
les huit langues ; `node build/build.mjs` les extrait vers `prompts/` et vérifie qu'aucune
traduction ne les a altérés.

Ils sont écrits à partir de ce que nous avons fait dans les trois dépôts, pas encore exécutés tels
quels. Le premier projet qui les utilisera de bout en bout en corrigera plusieurs : cela fait partie
de l'échelon 15.

| Échelon | Fichier | Phase | Forme |
|---|---|---|---|
| 0 — Ce projet peut-il être abordé ainsi ? | `peldano-00-elegibilidad.md` | démarrage | conversation (en cours d'élaboration avec Pablo) |
| 1 — Le contrat de collaboration | `peldano-01-contrato-de-convivencia.md` | démarrage | un seul envoi + ajustement |
| 2 — Définition du projet et lecture obligatoire | `peldano-02-definicion-y-lectura.md` | démarrage | conversation |
| 3 — Dimensionner avant l'architecture | `peldano-03-dimensionar.md` | démarrage | conversation |
| 4 — Le squelette avec ses portes | `peldano-04-esqueleto.md` | démarrage | un envoi long + approbation visuelle |
| 5 — Le plan, ce sont les éléments en attente | `peldano-05-pendientes.md` | boucle | un envoi + routine |
| 6 — Les décisions s'écrivent à côté du code | `peldano-06-decisiones.md` | boucle | courte conversation, à chaque fois |
| 7 — Les tests comme verrous, prouvés en rouge | `peldano-07-tests-en-rojo.md` | boucle | routine de chaque changement |
| 8 — Symétrie producteur/consommateur et anti-patrons | `peldano-08-simetria-y-antipatrones.md` | boucle | automatique + un fichier qui grandit |
| 9 — Mesurer avant de construire | `peldano-09-medir.md` | boucle | un envoi par mesure |
| 10 — Vérification honnête et rapport proportionné | `peldano-10-verificacion-honesta.md` | boucle | routine de tout rapport |
| 11 — L'audit périodique comme intrant du plan | `peldano-11-auditoria.md` | exploitation | un envoi long, auditeur différent |
| 12 — Fail-closed, verrous et zéro dommage silencieux | `peldano-12-fail-closed.md` | exploitation | conversation |
| 13 — Intégration continue, environnements, secrets et déploiement | `peldano-13-ci-entornos-secretos-deploy.md` | exploitation | un envoi + routine de déploiement |
| 14 — Documentation vivante et manuels sans IA | `peldano-14-documentacion-viva.md` | exploitation | routine + un envoi long |
| 15 — L'agent résident et la rétrospective chiffrée | `peldano-15-agente-residente-y-retrospectiva.md` | exploitation et clôture | deux parties |

Phases : **démarrage** se gravit une fois par projet ; **boucle** se répète à chaque changement ;
**exploitation** quand le système est déjà vivant. Le 15 revient au 0 pour le projet suivant. Les
noms de fichiers restent en espagnol dans toutes les langues pour que l'outillage de build les
reconnaisse.
