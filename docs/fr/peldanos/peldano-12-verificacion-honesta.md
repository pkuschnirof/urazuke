# Étape 12 — Vérification honnête et rapport proportionné (contrat de l'échelon)

**Tronçon :** boucle.
**Quand :** dans chaque rapport, de chaque élément en attente, pendant tout le projet. C'est la
forme que doit avoir tout ce que l'agent vous dit.
**Forme :** routine ; c'est la forme que doit avoir chaque rapport de l'agent.
**Taille :** obligatoire dans tout projet, sans exception. Cela ne coûte rien et c'est ce qui
permet au propriétaire de ne pas lire de code.

## À quoi il sert

Si vous n'allez pas lire de code, le rapport de l'agent doit être fiable. Pas optimiste, pas
« complet en apparence » : fiable. C'est ce qu'il y a de véritablement nouveau dans la méthode :
l'auteur du code fabrique aussi la preuve, et il le fait avec la même assurance dans la voix quand
c'est juste et quand c'est faux. C'est pourquoi la preuve doit se prouver elle-même, et le rapport
doit séparer le vérifié du cru. La règle, je l'ai écrite en juin [Ref. 8](../REFERENCIAS.md#ref-8),
et j'en ai eu de nouveau besoin en octobre, quand une erreur d'authentification a été rapportée
avec la mention « success » [Ref. 43](../REFERENCIAS.md#ref-43).

Comprenez pourquoi le modèle a tendance à rapporter plus qu'il ne faut. Ce n'est pas de la
mauvaise foi : c'est qu'il a été entraîné pour être utile et complet, et un rapport qui dit « ça,
je n'ai pas pu le vérifier » se sent moins utile qu'un rapport qui dit « c'est fait ». Alors
**demandez-lui explicitement** les mauvaises nouvelles, les angles morts et ce qu'il n'a pas fait.
Si vous ne le lui demandez pas, il ne vous le donne pas, non parce qu'il le cache mais parce qu'il
ne le considère pas comme faisant partie de la réponse.

## 1. Contexte requis

Ce qui suit est la liste générique. Les fichiers concrets que vous devez avoir faits avant chaque
prompt, avec leur contenu et leur état minimum, sont dans la section 2, dans le bloc « Avant
d'envoyer le prompt » qui précède chacun d'eux.
- Le travail fait et l'élément en attente qui le demandait.
- Le contrat de collaboration (échelon 1), qui interdit déjà d'annoncer ce qui n'est pas fait.

## 2. Prompts

**Routine (va dans le contrat de collaboration ; s'applique à chaque rapport) :**

**Avant d'envoyer le prompt**, ceci doit exister, et c'est vous (ou le métier avec vous) qui le
faites, pas l'agent :

- `docs/WORKING_AGREEMENT.md` (échelon 1), où va la routine.
- La liste de ce que vous avez demandé dans la session, écrite par vous (les items de la demande),
  pour confronter le rapport : le prompt lui demande de couvrir chaque item un par un, et vous
  devez savoir combien il y en avait.
- État minimum acceptable : rien de plus. Cette routine se colle une fois et vaut pour toujours.
> When you report, separate three blocks: VERIFIED (what you tested, with the command and its
> output), BELIEVED (what you think works but did not test, and why not), and BLIND SPOTS (what
> you cannot see from where you are: another environment, real data, the user's browser). Cover
> every item I asked for, one by one, even when the answer is "I did not do it". No claim
> without its proof next to it. Do not say "done": say what is done and how you know it. If
> something went wrong, say it first.
>
> When you report, also report the Annex H groups: what was measured, what
> only warns and why, and which rule is switched off with its reason, who
> authorised it and its review date. Report the two dashboard figures with
> the fingerprint they were computed with (catalogue version, active and
> switched-off rules, frontend adapter, tool versions) and with the account
> of any movement. No figure closes a block: the green is decided rule by
> rule, and a switched-off rule with no written exception turns the whole
> report red.
>
> Reply in my language.

> [fr]
> Quand tu rapportes, sépare trois blocs : VÉRIFIÉ (ce que tu as testé, avec la commande et sa
> sortie), CRU (ce que tu penses qui fonctionne mais que tu n'as pas testé, et pourquoi), et
> ANGLES MORTS (ce que tu ne peux pas voir d'où tu es : un autre environnement, des données
> réelles, le navigateur de l'utilisateur). Couvre chaque point que je t'ai demandé, un par un,
> même quand la réponse est « je ne l'ai pas fait ». Aucune affirmation sans sa preuve à côté. Ne
> dis pas « c'est fait » : dis ce qui est fait et comment tu le sais. Si quelque chose a mal
> tourné, dis-le en premier.
>
> Quand vous rendez compte, rendez compte aussi des groupes de l'Annexe H :
> ce qui a été mesuré, ce qui ne fait qu'avertir et pourquoi, et quelle
> règle est éteinte, avec son motif, qui l'a autorisée et sa date de
> révision. Rendez compte des deux chiffres du tableau avec l'empreinte avec
> laquelle ils ont été calculés (version du catalogue, règles actives et
> éteintes, adaptateur de frontend, versions des outils) et avec le relevé
> de tout mouvement. Aucun chiffre ne clôt un bloc : le vert se décide règle
> par règle, et une règle éteinte sans exception écrite rend tout le rapport
> rouge.
>
> Réponds dans ma langue.

Ce que je lui demande, clause par clause : les trois blocs, qui sont la structure qui rend un
rapport honnête (le vérifié avec sa preuve, le cru avec la raison pour laquelle on ne l'a pas
testé, ce qu'il ne peut pas voir) ; la couverture point par point, pour que rien ne « s'oublie » ;
la preuve à côté de chaque affirmation ; l'interdiction du « c'est fait » tout court ; et les
mauvaises nouvelles en premier, parce que le modèle a tendance à les laisser pour la fin ou pour
jamais.

**Face à un « c'est toujours cassé » de votre part :**

**Avant d'envoyer le prompt**, vous devez avoir ceci sous la main :

- Votre vérification, faite là où vous regardez (l'environnement de test, votre navigateur), avec
  ce que vous avez vu, noté : à quelle URL, quelle version affiche le système s'il l'affiche, ce
  que vous avez fait, ce que vous attendiez, ce qui s'est passé.
- Le numéro de version ou le commit dont l'agent a dit qu'il contenait la correction, copié de son
  rapport précédent.
- État minimum acceptable : vous pouvez lui dire « je regarde sur [URL], je vois la version [N],
  je fais [ceci], il se passe [cela] ». Sans cela, le « c'est toujours cassé » est une impression,
  et l'agent va diagnostiquer une impression.
> Before diagnosing again, compare the version running where I see the problem with the version
> that contains your fix. Tell me both. If they differ, the problem is publication, not code.

> [fr]
> Avant de diagnostiquer à nouveau, compare la version qui tourne là où je vois le problème avec
> la version qui contient ta correction. Dis-moi les deux. Si elles diffèrent, le problème est de
> publication, pas de code.

Ce que je lui demande : que face à un « c'est toujours cassé » il ne diagnostique pas à nouveau
depuis zéro mais compare d'abord les versions. La moitié des « c'est toujours cassé » sont des
corrections qui sont dans le dépôt mais pas à l'endroit où vous regardez
[Ref. 45](../REFERENCIAS.md#ref-45).

## 3. Résultat attendu

Chaque rapport de l'agent avec :

- Les trois blocs (vérifié / cru / angles morts), même si l'un d'eux est vide.
- Une ligne pour chaque point demandé, avec son état.
- Pour chaque « vérifié » : la commande et la sortie, ou le test et son résultat, ou le chiffre et
  son compteur.
- Ce qui a mal tourné, au début et non à la fin.

## 4. Vérification de complétude

- Les trois blocs y sont-ils ? Si « cru » et « angles morts » sont toujours vides, l'agent n'est
  pas honnête : il y a toujours quelque chose qu'il n'a pas vu.
- Choisissez au hasard une affirmation du bloc « vérifié » : a-t-elle sa preuve à côté ? Pouvez-vous
  la reproduire ?
- Couvre-t-il chaque point de ce que vous avez demandé, ou y en a-t-il un qui « s'est oublié » ?
- Les mauvaises nouvelles sont-elles au début ?
- A-t-il dit « c'est fait » tout court, une seule fois ? C'est une violation du contrat.

## 5. Signaux d'alarme

- Dix rapports d'affilée sans aucun angle mort. Personne ne voit tout ; le bloc est vide par
  habitude, pas par vérité.
- Le bloc « vérifié » contient des phrases comme « ça devrait fonctionner ». C'est du « cru »
  déguisé.
- Le rapport est plus long que le changement. Un rapport proportionné dit ce qu'il y a à dire ; un
  rapport gonflé cache quelque chose sous le volume.
