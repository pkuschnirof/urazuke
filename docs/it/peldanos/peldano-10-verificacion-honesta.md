# Passo 10 — Verifica onesta e rapporto proporzionato (contratto del gradino)

**Fase:** ciclo (alla chiusura di ogni modifica).
**Forma:** routine; è la forma che deve avere ogni rapporto dell'agente.
**Dimensione:** obbligatorio in ogni progetto, senza eccezioni. Non costa nulla ed è ciò che
permette al proprietario di non leggere codice.

## A cosa serve

Se il proprietario non leggerà codice, il rapporto dell'agente deve essere affidabile. Non
ottimista, non "completo in apparenza": affidabile. Questo è ciò che c'è di davvero nuovo nel
metodo: l'autore del codice fabbrica anche la prova, e lo fa con la stessa sicurezza nella voce
quando ha ragione e quando ha torto. Per questo la prova deve dimostrare se stessa, e il rapporto
deve separare il verificato dal creduto.

Bisogna capire perché il modello tende a riferire di più. Non è malafede: è che è stato addestrato
a essere utile e completo, e un rapporto che dice "questo non ho potuto verificarlo" sembra meno
utile di uno che dice "fatto". Quindi bisogna **chiedergli esplicitamente** le cattive notizie, i
punti ciechi e ciò che non ha fatto. Se non glielo chiedi, non te lo dà, non perché lo nasconda ma
perché non lo considera parte della risposta.

## 1. Contesto richiesto

- Il lavoro fatto e la voce in sospeso che lo chiedeva.
- Il patto di convivenza (gradino 1), che già vieta di annunciare il non fatto.

## 2. Prompt

**Routine (va nel patto di convivenza; si applica a ogni rapporto):**

> When you report, separate three blocks: VERIFIED (what you tested, with the command and its
> output), BELIEVED (what you think works but did not test, and why not), and BLIND SPOTS (what
> you cannot see from where you are: another environment, real data, the user's browser). Cover
> every item I asked for, one by one, even when the answer is "I did not do it". No claim
> without its proof next to it. Do not say "done": say what is done and how you know it. If
> something went wrong, say it first. Reply in my language.

Cosa stiamo chiedendo, clausola per clausola: i tre blocchi, che sono la struttura che rende onesto
un rapporto (il verificato con la sua prova, il creduto con la ragione per cui non è stato provato,
ciò che non si può vedere); la copertura voce per voce, perché nulla "si dimentichi"; la prova
accanto a ogni affermazione; il divieto del "fatto" secco; e le cattive notizie per prime, perché il
modello tende a lasciarle per la fine o per mai.

**Davanti a un "è ancora rotto" del proprietario:**

> Before diagnosing again, compare the version running where I see the problem with the version
> that contains your fix. Tell me both. If they differ, the problem is publication, not code.

Cosa stiamo chiedendo: che davanti a "è ancora rotto" non torni a diagnosticare da zero ma prima
confronti le versioni. La metà degli "è ancora rotto" sono correzioni che stanno nel repository ma
non nel posto dove il proprietario guarda.

## 3. Risultato atteso

Ogni rapporto dell'agente con:

- I tre blocchi (verificato / creduto / punti ciechi), anche se qualcuno è vuoto.
- Una riga per ogni voce richiesta, con il suo stato.
- Per ogni "verificato": il comando e l'output, o il test e il suo risultato, o il numero e il suo
  misuratore.
- Ciò che è andato storto, all'inizio e non alla fine.

## 4. Verifica di completezza

- Ci sono i tre blocchi? Se "creduto" e "punti ciechi" sono sempre vuoti, l'agente non è onesto:
  c'è sempre qualcosa che non ha visto.
- Scegli a caso un'affermazione del blocco "verificato": ha la sua prova accanto? Riesci a
  riprodurla?
- Copre ogni voce di ciò che hai chiesto, o ce n'è una che "si è dimenticata"?
- Le cattive notizie sono all'inizio?
- Ha mai detto "fatto" secco? È una violazione del patto.

## 5. Segnali d'allarme

- Dieci rapporti di fila senza nessun punto cieco. Nessuno vede tutto; il blocco è vuoto per
  abitudine, non per verità.
- Il blocco "verificato" contiene frasi come "dovrebbe funzionare". È "creduto" travestito.
- Il rapporto è più lungo della modifica. Un rapporto proporzionato dice ciò che va detto; uno
  gonfiato sta coprendo qualcosa con il volume.
