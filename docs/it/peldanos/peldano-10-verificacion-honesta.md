# Passo 10 — Verifica onesta e rapporto proporzionato (contratto del gradino)

**Fase:** ciclo.
**Quando:** in ogni rapporto, di ogni voce in sospeso, per tutto il progetto. È la forma che deve
avere tutto ciò che l'agente ti dice.
**Forma:** routine; è la forma che deve avere ogni rapporto dell'agente.
**Dimensione:** obbligatorio in ogni progetto, senza eccezioni. Non costa nulla ed è ciò che
permette al proprietario di non leggere codice.

## A cosa serve

Se non leggerai codice, il rapporto dell'agente deve essere affidabile. Non ottimista, non
"completo in apparenza": affidabile. Questo è ciò che c'è di genuinamente nuovo nel metodo:
l'autore del codice fabbrica anche la prova, e lo fa con la stessa sicurezza nella voce quando è
giusto e quando è sbagliato. Per questo la prova deve dimostrare se stessa, e il rapporto deve
separare il verificato dal creduto. La regola l'ho scritta a giugno
[Ref. 8](../REFERENCIAS.md#ref-8), e ne ho avuto di nuovo bisogno a ottobre, quando un errore di
autenticazione è stato riportato con la dicitura "success" [Ref. 43](../REFERENCIAS.md#ref-43).

Capisci perché il modello tende a riportare più del dovuto. Non è malafede: è che è stato
addestrato per essere utile e completo, e un rapporto che dice "questo non sono riuscito a
verificarlo" sembra meno utile di uno che dice "fatto". Quindi **chiedigli esplicitamente** le
cattive notizie, i punti ciechi e ciò che non ha fatto. Se non glielo chiedi, non te lo dà, non
perché lo nasconda ma perché non lo considera parte della risposta.

## 1. Contesto richiesto

- Il lavoro fatto e la voce in sospeso che lo chiedeva.
- Il patto di convivenza (gradino 1), che già vieta di annunciare ciò che non è stato fatto.

## 2. Prompt

**Routine (va nel patto di convivenza; si applica a ogni rapporto):**

> When you report, separate three blocks: VERIFIED (what you tested, with the command and its
> output), BELIEVED (what you think works but did not test, and why not), and BLIND SPOTS (what
> you cannot see from where you are: another environment, real data, the user's browser). Cover
> every item I asked for, one by one, even when the answer is "I did not do it". No claim
> without its proof next to it. Do not say "done": say what is done and how you know it. If
> something went wrong, say it first. Reply in my language.

> [it]
> Quando riferisci, separa tre blocchi: VERIFICATO (ciò che hai provato, con il comando e il suo
> output), CREDUTO (ciò che pensi funzioni ma non hai provato, e perché no), e PUNTI CIECHI (ciò
> che non puoi vedere da dove sei: un altro ambiente, dati reali, il browser dell'utente). Copri
> ogni punto che ti ho chiesto, uno per uno, anche quando la risposta è "non l'ho fatto". Nessuna
> affermazione senza la sua prova accanto. Non dire "fatto": di' cosa è fatto e come lo sai. Se
> qualcosa è andato storto, dillo per primo. Rispondi nella mia lingua.

Cosa gli sto chiedendo, clausola per clausola: i tre blocchi, che sono la struttura che rende
onesto un rapporto (il verificato con la sua prova, il creduto con la ragione per cui non è stato
provato, ciò che non può vedere); la copertura punto per punto, perché nulla "si dimentichi"; la
prova accanto a ogni affermazione; il divieto del "fatto" secco; e le cattive notizie per prime,
perché il modello tende a lasciarle per la fine o per mai.

**Davanti a un tuo "è ancora rotto":**

> Before diagnosing again, compare the version running where I see the problem with the version
> that contains your fix. Tell me both. If they differ, the problem is publication, not code.

> [it]
> Prima di diagnosticare di nuovo, confronta la versione che gira dove io vedo il problema con la
> versione che contiene la tua correzione. Dimmele entrambe. Se sono diverse, il problema è di
> pubblicazione, non di codice.

Cosa gli sto chiedendo: che davanti a un "è ancora rotto" non torni a diagnosticare da zero ma
prima confronti le versioni. La metà degli "è ancora rotto" sono correzioni che stanno nel
repository ma non nel posto in cui tu guardi [Ref. 45](../REFERENCIAS.md#ref-45).

## 3. Risultato atteso

Ogni rapporto dell'agente con:

- I tre blocchi (verificato / creduto / punti ciechi), anche se qualcuno è vuoto.
- Una riga per ogni punto chiesto, con il suo stato.
- Per ogni "verificato": il comando e l'output, o il test e il suo risultato, o il numero e il suo
  misuratore.
- Ciò che è andato storto, all'inizio e non alla fine.

## 4. Verifica di completezza

- Ci sono i tre blocchi? Se "creduto" e "punti ciechi" sono sempre vuoti, l'agente non sta essendo
  onesto: c'è sempre qualcosa che non ha visto.
- Scegli a caso un'affermazione del blocco "verificato": ha la sua prova accanto? La puoi
  riprodurre?
- Copre ogni punto di ciò che hai chiesto, o ce n'è uno che "si è dimenticato"?
- Le cattive notizie sono all'inizio?
- Ha detto "fatto" secco qualche volta? È una violazione del patto.

## 5. Segnali d'allarme

- Dieci rapporti di fila senza nessun punto cieco. Nessuno vede tutto; il blocco è vuoto per
  abitudine, non per verità.
- Il blocco "verificato" ha frasi come "dovrebbe funzionare". È "creduto" travestito.
- Il rapporto è più lungo della modifica. Un rapporto proporzionato dice ciò che va detto; uno
  gonfiato sta coprendo qualcosa con il volume.
