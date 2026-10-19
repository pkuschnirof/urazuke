# Étape 19 — Tests de performance en volume et point de rupture (contrat de l'échelon)

**Tronçon :** qualité opérationnelle, avant le premier déploiement en production.
**Quand :** dans la phase de mise en production, après le 16 (sans observabilité on ne sait pas ce
qui a cassé) et après le 17 (sur une persistance déjà optimisée), et avant le premier déploiement
en production. On le répète avant chaque déploiement qui change l'architecture, la persistance ou
un flux critique, et quand le dimensionnement change (on le vend à un autre client, le volume
double). Dans un système hérité, on le lance avec les volumes mesurés en N6, avant le premier
déploiement postérieur à la normalisation.
**Forme :** un seul envoi ; l'agent charge, mesure et casse ; vous lisez les chiffres et le point de
rupture.
**Taille :** proportionnelle : dans un petit projet, une passe au volume attendu et une au « fois
dix » ; dans un projet à conséquences, complète, avec le point de rupture trouvé et les seuils
consignés pour la supervision.

## À quoi il sert

L'échelon 3 a dimensionné avec des calculs ; cet échelon vérifie les calculs avec le système réel
qui tourne. Je veux savoir trois choses avant que le premier utilisateur n'entre : comment se
comporte le système au volume que le métier a annoncé (l'écran le plus utilisé répond-il dans ce que
le propriétaire tolérerait ?), comment il se comporte au « fois dix » (tient-il, ou qu'est-ce qui
cesse de tenir en premier ?), et **où il casse** : la charge exacte à laquelle quelque chose cède,
et quelle est cette chose (les connexions à la base, la mémoire, une file, un verrouillage). Le
point de rupture est le chiffre le plus utile de tout le tronçon, parce que c'est de lui que
sortent les seuils d'alerte de l'échelon 20 : une alerte posée « à vue de nez » prévient trop tard
ou prévient toujours ; une alerte posée sous le point de rupture mesuré, avec une marge, prévient
quand il est encore temps. Les motifs d'échelle que j'ai tirés d'un système en production
[Ref. 12](../REFERENCIAS.md#ref-12) et la batterie qui mourait par la mémoire et ressemblait à un
test raté [Ref. 44](../REFERENCIAS.md#ref-44) sont les deux antécédents : le premier, de mesurer la
charge réelle ; le second, du fait qu'un point de rupture non trouvé à temps se déguise en autre
chose.

**Si vous débutez.** Un *test de charge* est un programme qui simule beaucoup d'utilisateurs se
servant du système en même temps, pour voir ce qui se passe. Le *débit* (throughput) est le nombre
d'actions par seconde que le système supporte. La *latence* est le temps que met une action à
répondre ; on regarde la *médiane* (la moitié des actions a mis moins que cela) et le *centile 95*
(95 % ont mis moins que cela ; les 5 % restants sont les utilisateurs qui se plaignent). Le *point
de rupture* est la quantité de charge à laquelle quelque chose cesse de fonctionner : non pas « ça
devient lent » mais « les connexions à la base sont épuisées » ou « la mémoire s'est remplie ». Et
un *seuil* est un chiffre limite à partir duquel la supervision prévient.

## 1. Contexte requis

Ce qui suit est la liste générique. Les fichiers concrets que vous devez avoir faits avant chaque
prompt, avec leur contenu et leur état minimum, sont dans la section 2, dans le bloc « Avant
d'envoyer le prompt » qui précède chacun d'eux.

- Le dimensionnement (échelon 3 ou N6) : le volume attendu et le « fois dix ».
- L'observabilité (16) allumée, pour voir ce qui casse.
- La persistance optimisée (17) avec ses budgets.
- Un environnement de test proche de la production en ressources, ou la conscience de ce en quoi il
  diffère.
- Les flux critiques (ceux de l'arbre sémantique, ou ceux de la caractérisation dans un système
  hérité).

## 2. Prompts

**Initial (charger, mesurer, casser) :**

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous (ou le métier avec vous) qui le
faites, pas l'agent :

- `docs/SIZING.md` avec le volume attendu (utilisateurs simultanés au pic, événements par heure,
  lignes par table) et le « fois dix » : ce sont les deux paliers de charge.
- La liste des flux critiques pour le trou du prompt, écrite par vous à partir de l'arbre
  sémantique : ceux qui sont le plus utilisés et ceux qui ont des conséquences. Entre trois et six.
- Un environnement de test avec des ressources comparables à la production, ou, si ce n'est pas
  possible, noté dans `docs/ENVIRONMENTS_SURVEY.md` en quoi il diffère (la moitié de la mémoire, un
  autre moteur), pour que les chiffres se lisent avec cette correction.
- Des données au volume attendu dans l'environnement de test (le même script que l'échelon 17).
- Votre tolérance, avec le propriétaire : combien de temps peut mettre l'écran le plus utilisé pour
  que le métier le considère acceptable (deux secondes, cinq). Sans ce chiffre, les résultats ne
  peuvent pas être jugés.
- État minimum acceptable : vous connaissez les deux paliers de charge, les flux critiques et la
  tolérance.

> We are going to find out how this system behaves at the volumes of `docs/SIZING.md`, and where
> it breaks. In the test environment, with the observability of step 16 on and the data loaded at
> the expected volume: (1) write a load script that lives in the repository and drives the
> critical flows [list] from the screen or the API as users would, with a configurable number of
> concurrent users and duration, and with a test that proves the script really exercises each
> flow (the backend effect appears); (2) run it at the expected volume and show me, per flow:
> throughput, median and 95th percentile latency, error rate, and the resource usage of the
> server and the database during the run; (3) run it at ten times the expected volume and show me
> the same; (4) raise the load step by step until something breaks, and tell me exactly what
> broke first (database connections, memory, a queue, a lock, the disk) and at which load: that
> is the breaking point; (5) compare every number with the budgets of `docs/PERSISTENCE.md`, with
> the tolerance I gave you ([tolerance] for the most used screen) and with the sizing assumptions,
> and tell me which assumption was wrong, if any. Do not optimize anything yet. Write
> `docs/PERFORMANCE_[date].md` with the numbers, the commands, the breaking point and your
> diagnosis of the first bottleneck. Reply in my language.

> [fr]
> Nous allons découvrir comment ce système se comporte aux volumes de `docs/SIZING.md`, et où il
> casse. Dans l'environnement de test, avec l'observabilité de l'échelon 16 allumée et les données
> chargées au volume attendu : (1) écris un script de charge qui vive dans le dépôt et pilote les
> flux critiques [liste] depuis l'écran ou l'API comme le feraient des utilisateurs, avec un nombre
> d'utilisateurs simultanés et une durée configurables, et avec un test qui prouve que le script
> exerce vraiment chaque flux (l'effet sur le backend apparaît) ; (2) lance-le au volume attendu et
> montre-moi, par flux : le débit, la latence médiane et au centile 95, le taux d'erreur, et l'usage
> des ressources du serveur et de la base pendant la passe ; (3) lance-le à dix fois le volume
> attendu et montre-moi la même chose ; (4) monte la charge palier par palier jusqu'à ce que quelque
> chose casse, et dis-moi exactement ce qui a cassé en premier (connexions à la base, mémoire, une
> file, un verrouillage, le disque) et à quelle charge : c'est ça, le point de rupture ; (5) compare
> chaque chiffre avec les budgets de `docs/PERSISTENCE.md`, avec la tolérance que je t'ai donnée
> ([tolérance] pour l'écran le plus utilisé) et avec les hypothèses du dimensionnement, et dis-moi
> quelle hypothèse était fausse, s'il y en a une. N'optimise rien encore. Écris
> `docs/PERFORMANCE_[date].md` avec les chiffres, les commandes, le point de rupture et ton
> diagnostic du premier goulot d'étranglement. Réponds dans ma langue.

Ce que je lui demande : un script de charge qui est un compteur de plus (il vit dans le dépôt et a
un test, parce qu'un script de charge qui n'exerce pas le flux mesure du vent) ; trois passes
(attendu, fois dix, jusqu'à casser) ; les chiffres avec leurs commandes ; la comparaison avec les
budgets, la tolérance du métier et les hypothèses du dimensionnement, qui est là où l'on découvre
que l'échelon 3 s'est trompé sur quelque chose ; et **rien à optimiser pour l'instant**, parce
qu'optimiser sans lire le diagnostic, c'est changer ce qui n'était pas en cause.

**De clôture (seuils et éléments en attente) :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- `docs/PERFORMANCE_[date].md` lu par vous, avec la tolérance du métier à côté : l'écran le plus
  utilisé entre-t-il dans le tolérable au volume attendu ? Et au « fois dix » ?
- Avec le propriétaire, la décision sur le « fois dix » : si le métier prévoit de grandir, les
  goulots d'étranglement sous le « fois dix » sont des éléments en attente maintenant ; sinon, ils
  peuvent attendre, avec une date.
- État minimum acceptable : vous avez lu le point de rupture et décidé quels goulots d'étranglement
  se corrigent maintenant.

> Record in `docs/PERFORMANCE.md`: the expected volume, the ten-times volume, the breaking point
> with what breaks, and the alert thresholds that monitoring (step 20) will use, set below the
> breaking point with a margin and above the expected volume. Open a pending item for each
> bottleneck that sits below [ten times the expected volume / the volume I decided], with the
> measured number as its acceptance criterion. Make the load test a gate in `docs/GATES.md`: it
> reruns before every deployment that changes the architecture, the persistence or a critical
> flow, and its results are archived with date and version. Show me the first run archived.

> [fr]
> Consigne dans `docs/PERFORMANCE.md` : le volume attendu, le volume fois dix, le point de rupture
> avec ce qui casse, et les seuils d'alerte que la supervision (échelon 20) va utiliser, fixés sous
> le point de rupture avec une marge et au-dessus du volume attendu. Ouvre un élément en attente
> pour chaque goulot d'étranglement situé sous [dix fois le volume attendu / le volume que j'ai
> décidé], avec le chiffre mesuré comme critère d'acceptation. Fais du test de charge une porte dans
> `docs/GATES.md` : il se relance avant chaque déploiement qui change l'architecture, la persistance
> ou un flux critique, et ses résultats sont archivés avec leur date et leur version. Montre-moi la
> première passe archivée.

Ce que je lui demande : les seuils d'alerte dérivés du point de rupture, qui est l'accroche avec
l'échelon 20 ; les goulots d'étranglement comme éléments en attente avec le chiffre pour critère
(ainsi ils se closent avec une preuve et non avec « maintenant ça marche mieux ») ; et le test de
charge comme porte archivée, pour que dans six mois on puisse comparer.

## 3. Résultat attendu

- Le script de charge dans le dépôt, avec son test.
- `docs/PERFORMANCE_[date].md` avec les trois passes, les chiffres, le point de rupture et le
  diagnostic ; `docs/PERFORMANCE.md` avec les seuils et la porte.
- Un élément en attente par goulot d'étranglement sous le volume décidé.
- Le test de charge comme porte avant les déploiements qui l'exigent.

## 4. Vérification de complétude

- L'écran le plus utilisé, au volume attendu, met-il moins que la tolérance du propriétaire ? Sinon,
  il y a un élément en attente ouvert avec ce chiffre.
- Le point de rupture dit-il ce qui a cassé et à quelle charge, ou dit-il « le système est devenu
  lent » ?
- Les seuils de `docs/PERFORMANCE.md` sont-ils sous le point de rupture et au-dessus de l'attendu ?
- Lancez vous-même le script au volume attendu avec la commande qu'il vous a donnée : les chiffres
  se ressemblent-ils ?
- L'environnement de test diffère-t-il de la production en ressources, et est-ce noté comment ?

## 5. Signaux d'alarme

- « Il tient le fois dix sans problème » sans point de rupture. S'il n'a pas trouvé où ça casse, il
  n'a pas monté la charge assez haut.
- Le script de charge tape sur l'API mais ne passe pas par l'écran, dans un système où c'est l'écran
  qui charge. Il mesure autre chose.
- Les résultats viennent d'une passe sur la machine de l'agent, pas dans l'environnement de test.
- Des goulots d'étranglement ont été corrigés pendant le test, « tant qu'on y était ». Maintenant
  vous ne savez plus quel chiffre correspond à quelle version.
