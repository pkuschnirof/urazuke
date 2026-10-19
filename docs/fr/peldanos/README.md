# Les contrats d'échelon

Un fichier par échelon. Tous ont le même squelette, et ils l'ont à dessein, pour que vous puissiez
les comparer et pour qu'avec le temps le réflexe de les lire devienne automatique : l'en-tête avec
le tronçon, le quand, la forme et la taille (obligatoire ou proportionnel) ; à quoi il sert ; (1) le
contexte requis, nommé de façon générique ; (2) les prompts, **en anglais**, chacun précédé d'un
bloc **« Avant d'envoyer le prompt »** (les fichiers et les intrants que vous devez avoir faits
vous-même avant de le coller, avec leur contenu et leur état minimum), suivi de sa traduction et,
en dessous, de l'explication de ce que je demande au modèle et de pourquoi chaque clause est là ;
(3) le résultat attendu, avec ses caractéristiques ; (4) la vérification de complétude, que vous
faites sans lire de code ; (5) les signaux d'alarme, les symptômes d'un échelon mal gravi.

Les prompts en anglais sont une pièce unique, identique dans les huit versions du document ;
`node build/build.mjs` les extrait vers `prompts/` et vérifie qu'aucune traduction ne les a
altérés. La traduction qui accompagne chaque prompt est là pour que vous le compreniez ; au modèle,
on colle l'anglais.

Je les ai écrits à partir de ce que j'ai fait dans trois systèmes qui sont aujourd'hui en
production ; je ne les ai pas encore exécutés tels quels. Le premier projet qui les utilisera de
bout en bout en corrigera plusieurs ; cela fait partie de l'échelon 23. Quand un contrat cite un cas
réel, il le fait avec une marque `[Ref. N]` qui renvoie au
[document de références](../REFERENCIAS.md) ; la procédure reste propre et le détail reste à un
clic.

| Échelon | Fichier | Tronçon | Quand |
|---|---|---|---|
| 0 — Ce projet peut-il être abordé ainsi ? | `peldano-00-elegibilidad.md` | démarrage | avant tout le reste |
| 1 — Le contrat de collaboration | `peldano-01-contrato-de-convivencia.md` | démarrage | après l'éligibilité |
| 2 — Définition du projet et lecture obligatoire | `peldano-02-definicion-y-lectura.md` | démarrage | après le contrat ; se maintient toujours |
| 3 — Dimensionner avant l'architecture | `peldano-03-dimensionar.md` | démarrage | après la définition, avant le squelette |
| 4 — Le squelette avec ses portes | `peldano-04-esqueleto.md` | démarrage | clôture du démarrage |
| 5 — Le plan, ce sont les éléments en attente | `peldano-05-pendientes.md` | boucle | à l'ouverture de chaque bloc ; chaque session |
| 6 — Les décisions s'écrivent à côté du code | `peldano-06-decisiones.md` | boucle | chaque fois qu'une règle manque |
| 7 — Mesurer avant de construire | `peldano-07-medir.md` | boucle | avant de construire sur un nombre |
| 8 — Les tests comme verrous, prouvés en rouge | `peldano-08-tests-en-rojo.md` | boucle | à la clôture de chaque élément en attente |
| 9 — Qualité du code vérifiée par machine | `peldano-09-calidad-de-codigo.md` | boucle | se monte à l'ouverture du premier bloc ; tourne à chaque commit |
| 10 — Cas de test manuel avec la fonctionnalité | `peldano-10-casos-de-prueba-manual.md` | boucle | avec chaque élément en attente ; exécution humaine à la clôture de chaque bloc, à l'acceptation et après chaque déploiement |
| 11 — Symétrie producteur/consommateur et anti-patrons | `peldano-11-simetria-y-antipatrones.md` | boucle | à chaque changement de contrat |
| 12 — Vérification honnête et rapport proportionné | `peldano-12-verificacion-honesta.md` | boucle | à chaque rapport |
| 13 — L'audit périodique comme intrant du plan | `peldano-13-auditoria.md` | mise en production | avant la production ; ensuite, périodique |
| 14 — Fail-closed, verrous et zéro dommage silencieux | `peldano-14-fail-closed.md` | mise en production | avant de construire ce qui agit sur le monde |
| 15 — Intégration continue, environnements, secrets et déploiement | `peldano-15-ci-entornos-secretos-deploy.md` | mise en production | clôture vers la production ; routine à chaque déploiement |
| 16 — Observabilité et traçabilité totales, avec un niveau configurable | `peldano-16-observabilidad-y-trazabilidad.md` | mise en production | mise en production, après le 15 et avant le 19 |
| 17 — Optimisation de la couche de persistance | `peldano-17-persistencia.md` | mise en production | mise en production, après le 16 et avant le 19 ; se répète quand une requête sort de la plage |
| 18 — Scan et résolution des vulnérabilités | `peldano-18-vulnerabilidades.md` | mise en production | avant le premier déploiement ; ensuite, à chaque push et chaque semaine |
| 19 — Tests de performance et point de rupture | `peldano-19-rendimiento-y-punto-de-ruptura.md` | mise en production | avant le premier déploiement ; avant chaque déploiement qui change l'architecture, la persistance ou un flux critique |
| 20 — Documentation vivante et manuels sans IA | `peldano-20-documentacion-viva.md` | mise en production | à la clôture de chaque bloc ; complets avant la production |
| 21 — Supervision des ressources et de la performance, rapport cyclique | `peldano-21-monitoreo-de-recursos-y-rendimiento.md` | exploitation | avec le premier déploiement ; ensuite, elle tourne seule et se lit par cycle |
| 22 — Supervision des erreurs, rapport cyclique | `peldano-22-monitoreo-de-errores.md` | exploitation | avec le premier déploiement, avec le 21 |
| 23 — L'agent résident et la rétrospective chiffrée | `peldano-23-agente-residente-y-retrospectiva.md` | exploitation | à l'entrée en exploitation ; à la clôture de chaque étape |

Tronçons : **démarrage** se gravit une fois par projet ; **boucle** se répète à chaque changement ;
**exploitation** quand le système est déjà vivant. Le 23 revient au 0 pour le projet suivant. La
ligne de temps complète, avec ce qui se passe entre un échelon et le suivant, est dans la Partie B
du document principal. Les noms de fichiers restent en espagnol dans toutes les langues pour que
l'outillage de build les reconnaisse.
