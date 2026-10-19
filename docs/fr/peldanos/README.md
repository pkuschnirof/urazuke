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
bout en bout en corrigera plusieurs ; cela fait partie de l'échelon 15. Quand un contrat cite un cas
réel, il le fait avec une marque `[Ref. N]` qui renvoie au
[document de références](../REFERENCIAS.md) ; la procédure reste propre et le détail reste à un
clic.

| Échelon | Fichier | Tronçon | Quand |
|---|---|---|---|
| 0 — Ce projet peut-il être abordé ainsi ? | `peldano-00-elegibilidad.md` | démarrage | première semaine, avant tout le reste |
| 1 — Le contrat de collaboration | `peldano-01-contrato-de-convivencia.md` | démarrage | première semaine, après l'éligibilité |
| 2 — Définition du projet et lecture obligatoire | `peldano-02-definicion-y-lectura.md` | démarrage | première semaine ; se maintient toujours |
| 3 — Dimensionner avant l'architecture | `peldano-03-dimensionar.md` | démarrage | première semaine, avant le squelette |
| 4 — Le squelette avec ses portes | `peldano-04-esqueleto.md` | démarrage | clôture de la première semaine |
| 5 — Le plan, ce sont les éléments en attente | `peldano-05-pendientes.md` | boucle | à l'ouverture de chaque bloc ; chaque session |
| 6 — Les décisions s'écrivent à côté du code | `peldano-06-decisiones.md` | boucle | chaque fois qu'une règle manque |
| 7 — Les tests comme verrous, prouvés en rouge | `peldano-07-tests-en-rojo.md` | boucle | à la clôture de chaque élément en attente |
| 8 — Symétrie producteur/consommateur et anti-patrons | `peldano-08-simetria-y-antipatrones.md` | boucle | à chaque changement de contrat |
| 9 — Mesurer avant de construire | `peldano-09-medir.md` | boucle | avant de construire sur un nombre |
| 10 — Vérification honnête et rapport proportionné | `peldano-10-verificacion-honesta.md` | boucle | à chaque rapport |
| 11 — L'audit périodique comme intrant du plan | `peldano-11-auditoria.md` | exploitation | avant la production ; ensuite, périodique |
| 12 — Fail-closed, verrous et zéro dommage silencieux | `peldano-12-fail-closed.md` | exploitation | avant de construire ce qui agit sur le monde |
| 13 — Intégration continue, environnements, secrets et déploiement | `peldano-13-ci-entornos-secretos-deploy.md` | exploitation | clôture vers la production ; routine à chaque déploiement |
| 14 — Documentation vivante et manuels sans IA | `peldano-14-documentacion-viva.md` | exploitation | à la clôture de chaque bloc ; complets avant la production |
| 15 — L'agent résident et la rétrospective chiffrée | `peldano-15-agente-residente-y-retrospectiva.md` | exploitation et clôture | à l'entrée en exploitation ; à la clôture de chaque étape |
| 16 — Observabilité et traçabilité totales, avec un niveau configurable | `peldano-16-observabilidad-y-trazabilidad.md` | qualité opérationnelle | mise en production, après le 13 et avant le 19 |
| 17 — Optimisation de la couche de persistance | `peldano-17-persistencia.md` | qualité opérationnelle | mise en production, après le 16 et avant le 19 ; se répète quand une requête sort de la plage |
| 18 — Scan et résolution des vulnérabilités | `peldano-18-vulnerabilidades.md` | qualité opérationnelle | avant le premier déploiement ; ensuite, à chaque push et chaque semaine |
| 19 — Tests de performance et point de rupture | `peldano-19-rendimiento-y-punto-de-ruptura.md` | qualité opérationnelle | avant le premier déploiement ; avant chaque déploiement qui change l'architecture, la persistance ou un flux critique |
| 20 — Supervision des ressources et de la performance, rapport cyclique | `peldano-20-monitoreo-de-recursos-y-rendimiento.md` | qualité opérationnelle | semaine du premier déploiement ; ensuite, elle tourne seule et se lit par cycle |
| 21 — Supervision des erreurs, rapport cyclique | `peldano-21-monitoreo-de-errores.md` | qualité opérationnelle | semaine du premier déploiement, avec le 20 |

Tronçons : **démarrage** se gravit une fois par projet ; **boucle** se répète à chaque changement ;
**exploitation** quand le système est déjà vivant. Le 15 revient au 0 pour le projet suivant. La
ligne de temps complète, avec ce qui se passe entre un échelon et le suivant, est dans la Partie B
du document principal. Les noms de fichiers restent en espagnol dans toutes les langues pour que
l'outillage de build les reconnaisse.
