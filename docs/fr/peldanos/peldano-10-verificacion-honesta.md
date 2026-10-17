# Étape 10 — Vérification honnête et rapport proportionné (contrat de l'échelon)

**Phase :** boucle (à la clôture de chaque changement).
**Forme :** routine ; c'est la forme que doit avoir tout rapport de l'agent.
**Taille :** obligatoire dans tout projet, sans exception. Cela ne coûte rien et c'est ce qui permet
au propriétaire de ne pas lire de code.

## À quoi il sert

Si le propriétaire ne va pas lire de code, le rapport de l'agent doit être fiable. Pas optimiste,
pas « complet en apparence » : fiable. C'est ce qui est véritablement nouveau dans la méthode :
l'auteur du code fabrique aussi la preuve, et il le fait avec la même assurance dans la voix quand
il a raison et quand il a tort. C'est pourquoi la preuve doit se prouver elle-même, et le rapport
doit séparer le vérifié du supposé.

Il faut comprendre pourquoi le modèle tend à surdéclarer. Ce n'est pas de la mauvaise foi : il a
été entraîné pour être utile et complet, et un rapport qui dit « je n'ai pas pu vérifier ceci »
semble moins utile qu'un rapport qui dit « fait ». Il faut donc **demander explicitement** les
mauvaises nouvelles, les angles morts et ce qu'il n'a pas fait. Si vous ne le demandez pas, il ne
vous le donnera pas, non parce qu'il le cache mais parce qu'il ne le considère pas comme une partie
de la réponse.

## 1. Contexte requis

- Le travail effectué et l'élément en attente qui le demandait.
- Le contrat de collaboration (échelon 1), qui interdit déjà d'annoncer ce qui n'a pas été fait.

## 2. Prompts

**Routine (va dans le contrat de collaboration ; s'applique à tout rapport) :**

> When you report, separate three blocks: VERIFIED (what you tested, with the command and its
> output), BELIEVED (what you think works but did not test, and why not), and BLIND SPOTS (what
> you cannot see from where you are: another environment, real data, the user's browser). Cover
> every item I asked for, one by one, even when the answer is "I did not do it". No claim
> without its proof next to it. Do not say "done": say what is done and how you know it. If
> something went wrong, say it first. Reply in my language.

Ce que nous demandons, clause par clause : les trois blocs, qui sont la structure qui rend un
rapport honnête (le vérifié avec sa preuve, le supposé avec la raison de ne pas l'avoir testé, ce
qu'on ne peut pas voir) ; la couverture point par point, pour que rien ne soit « oublié » ; la
preuve à côté de chaque affirmation ; l'interdiction du « fait » tout court ; et les mauvaises
nouvelles d'abord, parce que le modèle tend à les laisser pour la fin ou pour jamais.

**Face à un « c'est toujours cassé » du propriétaire :**

> Before diagnosing again, compare the version running where I see the problem with the version
> that contains your fix. Tell me both. If they differ, the problem is publication, not code.

Ce que nous demandons : que face à « toujours cassé » il ne rediagnostique pas de zéro mais compare
d'abord les versions. La moitié des « toujours cassé » sont des correctifs qui sont dans le dépôt
mais pas à l'endroit où le propriétaire regarde.

## 3. Résultat attendu

Chaque rapport de l'agent avec :

- Les trois blocs (vérifié / supposé / angles morts), même si l'un est vide.
- Une ligne par point demandé, avec son état.
- Pour chaque « vérifié » : la commande et la sortie, ou le test et son résultat, ou le chiffre et
  son compteur.
- Ce qui a mal tourné, au début et non à la fin.

## 4. Vérification de complétude

- Les trois blocs sont-ils là ? Si « supposé » et « angles morts » sont toujours vides, l'agent
  n'est pas honnête : il y a toujours quelque chose qu'il n'a pas vu.
- Choisissez une affirmation du bloc « vérifié » au hasard : sa preuve est-elle à côté ?
  Pouvez-vous la reproduire ?
- Couvre-t-il chaque point que vous avez demandé, ou l'un a-t-il été « oublié » ?
- Les mauvaises nouvelles sont-elles au début ?
- A-t-il déjà dit « fait » tout court ? C'est une violation du contrat.

## 5. Signaux d'alarme

- Dix rapports d'affilée sans un seul angle mort. Personne ne voit tout ; le bloc est vide par
  habitude, pas par vérité.
- Le bloc « vérifié » contient des phrases comme « ça devrait fonctionner ». C'est du « supposé »
  déguisé.
- Le rapport est plus long que le changement. Un rapport proportionné dit ce qu'il faut dire ; un
  rapport gonflé couvre quelque chose avec du volume.
