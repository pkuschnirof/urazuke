# Passo 7 — Misurare prima di costruire, con uno strumento che a sua volta si verifica (contratto del gradino)

**Fase:** ciclo.
**Quando:** ogni volta che una voce in sospeso dipende da un numero o da un'ipotesi di causa, PRIMA
di costruire. Nell'avvio, il dimensionamento è il primo caso. In un progetto piccolo, "misurare"
è contare con un comando e annotare il numero con la data.
**Forma:** un solo invio per misurazione; a volte una conversazione quando l'ipotesi è tua.
**Dimensione:** proporzionale. Il cricchetto e il budget di query sono per sistemi con volume. Ciò
che non cambia con la dimensione: nessun numero che decide qualcosa esce da un'impressione.

## A cosa serve

Fai in modo che ogni numero che alimenta una decisione esca da un programma con test, e non da una
ricerca di testo, da un'impressione, né da "mi sembra che siano un centinaio". E fai in modo che lo
strumento stesso venga sottoposto ad audit, perché i misuratori mentono: uno dei miei non vedeva 84
chiamate con il contatore a zero, e un altro diceva 27 quando erano 44
[Ref. 35](../REFERENCIAS.md#ref-35), [Ref. 36](../REFERENCIAS.md#ref-36). Le cinque regole che ho
scritto dopo quell'episodio sono: misuratore con guardia; se lo strumento non esiste si costruisce;
si fa l'audit in due direzioni; l'approssimato si marca; e chi esegue verifica i numeri di chi ha
pianificato.

Questo è il gradino che ho impiegato più tempo a formalizzare, e per una ragione che vale la pena
raccontare: davo per scontato che un modello applicasse da solo qualcosa di così basilare
nell'ingegneria come "misura prima di toccare". Non lo applica. Il modello è bravissimo a produrre
affermazioni con un numero ("ci sono circa 120 cicli di quel tipo") e quelle affermazioni suonano
esattamente uguali quando sono misurate e quando sono stimate. Non hai modo di distinguerle dal
tono. L'unico modo è esigere lo strumento: "con cosa l'hai misurato? mostrami il comando". Se non
c'è comando, è un'impressione, per quanti decimali abbia. Le regole le ho imposte io in sessione,
correggendo l'agente, prima che diventassero dottrina [Ref. 45](../REFERENCIAS.md#ref-45).

## 1. Contesto richiesto

Quello che segue è la lista generica. I file concreti che devi avere pronti prima di ogni
prompt, con il loro contenuto e il loro stato minimo, stanno nella sezione 2, nel blocco "Prima di
inviare il prompt" che precede ciascuno.

- L'ipotesi, tua o dell'agente: "credo che il problema sia X", "dovrebbero essere un centinaio".
- Accesso a ciò che si vuole misurare: il codice, il database in sola lettura, il log.
- I misuratori che già esistono nel repository, se ce ne sono.

## 2. Prompt

**Iniziale:**

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business con te), non
l'agente:

- L'ipotesi, scritta in una frase, tua o presa dall'agente: "credo che l'agenda faccia una
  consultazione al database per ogni appuntamento", "dovrebbero essere un centinaio di cicli". Va
  nello spazio [X] del prompt, e la quantità da misurare nell'altro spazio.
- Accesso a ciò che si misurerà: il codice (ce l'ha già); il database in sola lettura, se la
  misura è su dati reali, con la stringa di connessione fuori dal repository e il nome della
  variabile detto nella chat; il log, con il suo percorso.
- I misuratori che già esistono nel repository, se ce ne sono, nominati, perché l'agente li
  riutilizzi invece di farne un altro.
- Un caso noto per il test del misuratore: una situazione in cui tu sai la risposta in anticipo
  ("con zero appuntamenti deve contare esattamente le due consultazioni di base"). Se non ti viene
  in mente, chiedi all'agente di proporlo, ma validalo tu: un misuratore verificato contro un caso
  che il misuratore stesso ha inventato non è verificato.
- Stato minimo accettabile: l'ipotesi sta in una frase e c'è un caso noto con cui verificare lo
  strumento.

> Before building anything, we are going to measure. The hypothesis is: [X]. Write a meter (a
> script that lives in the repository) that measures [the quantity], and a test for the meter
> that checks it against a known case where the answer is known in advance. If measuring
> requires access or data you lack, ask me; do not approximate silently. If some part can only
> be approximated, mark it as approximate and tell me the margin. Run the meter, show me the
> number together with the command that produces it, and audit it in both directions: from the
> code to the measurement (is everything that should be counted, counted?) and from the
> measurement to the code (does everything counted actually exist?). Only then propose what to
> build.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [it]
> Prima di costruire qualsiasi cosa, misuriamo. L'ipotesi è: [X]. Scrivi un misuratore (uno
> script che vive nel repository) che misuri [la quantità], e un test per il misuratore che lo
> verifichi contro un caso noto in cui la risposta si sa in anticipo. Se misurare richiede accessi
> o dati che non hai, chiedimeli; non approssimare in silenzio. Se qualche parte si può solo
> approssimare, marcala come approssimata e dimmi il margine. Esegui il misuratore, mostrami il
> numero insieme al comando che lo produce, e fanne l'audit in entrambe le direzioni: dal codice
> alla misurazione (è contato tutto ciò che dovrebbe essere contato?) e dalla misurazione al
> codice (esiste davvero tutto ciò che è stato contato?). Solo allora proponi cosa costruire.
>
> Quando hai bisogno di una decisione da parte mia, chiedila con le quattro parti della UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e in questo ordine: i dati che rendono necessaria la domanda,
> elencati; un paragrafo di non più di cinque righe che li colleghi e lasci vedere
> l'interrogativo; la domanda con le sue possibili risposte numerate; e la tua raccomandazione.
> Dillo alla profondità tecnica che il progetto ha dichiarato in `communication_depth`
> —`beginner`, `decision_maker` o `technical`—; se il progetto non ne ha dichiarata nessuna, usa
> `decision_maker`.
>
> Rispondi nella mia lingua.

Cosa gli sto chiedendo, clausola per clausola: il misuratore **nel repository** (non un comando
sciolto che si perde); il **test del misuratore** contro un caso noto (la guardia); la clausola di
completezza nella sua forma per misurare (chiedere l'accesso, non approssimare in silenzio);
marcare l'approssimato con il suo margine; il numero **con il comando** che lo produce, perché tu
possa eseguirlo; l'audit in due direzioni, che è ciò che ha smascherato i miei due misuratori che
mentivano; e l'ordine: prima misurare, poi proporre.

**Quando c'è un budget:**

**Prima di inviare il prompt**, devi avere questo a portata di mano:

- Il numero misurato, che hai eseguito tu stesso con il comando che l'agente ti ha dato, e che ti
  ha dato lo stesso risultato. Se non l'hai eseguito, non fissare un budget su di esso.
- Il margine che sei disposto a dare, deciso da te: un po' più di ciò che è stato misurato, non il
  doppio "per sicurezza".
- Stato minimo accettabile: il misuratore l'hai eseguito tu.

> Set the budget for [queries / loops / time] on this path at the measured value plus a small
> margin, and protect it with a test that fails if it is exceeded. Tell me the number and the
> margin.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [it]
> Fissa il budget di [query / cicli / tempo] su questo percorso al valore misurato più un margine
> piccolo, e proteggilo con un test che fallisca se viene superato. Dimmi il numero e il margine.
>
> Quando hai bisogno di una decisione da parte mia, chiedila con le quattro parti della UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e in questo ordine: i dati che rendono necessaria la domanda,
> elencati; un paragrafo di non più di cinque righe che li colleghi e lasci vedere
> l'interrogativo; la domanda con le sue possibili risposte numerate; e la tua raccomandazione.
> Dillo alla profondità tecnica che il progetto ha dichiarato in `communication_depth`
> —`beginner`, `decision_maker` o `technical`—; se il progetto non ne ha dichiarata nessuna, usa
> `decision_maker`.

Cosa gli sto chiedendo: che il budget sia il misurato più poco, non un numero tondo, e che abbia un
test che fallisca se viene superato. Così una regressione di prestazioni compare nella batteria e
non in produzione [Ref. 37](../REFERENCIAS.md#ref-37).

**Quando chi ha pianificato ha dato numeri (regola cinque):**

**Prima di inviare il prompt**, devi avere questo a portata di mano:

- Un piano dell'agente con dei numeri dentro ("ci sono 121 cicli", "sono 27 consultazioni"), a
  vista nella conversazione.
- Il misuratore che misura quella quantità, già esistente (il prompt iniziale di questo gradino).
  Se non c'è misuratore per quel numero, prima il prompt iniziale e poi questo.
- Stato minimo accettabile: per ogni numero del piano sai con quale misuratore si verifica.

> Before executing the plan, verify every number the plan asserts with the meter. If any does
> not match, stop and tell me; do not execute on a wrong number.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [it]
> Prima di eseguire il piano, verifica con il misuratore ogni numero che il piano afferma. Se
> qualcuno non coincide, fermati e dimmelo; non eseguire su un numero sbagliato.
>
> Quando hai bisogno di una decisione da parte mia, chiedila con le quattro parti della UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e in questo ordine: i dati che rendono necessaria la domanda,
> elencati; un paragrafo di non più di cinque righe che li colleghi e lasci vedere
> l'interrogativo; la domanda con le sue possibili risposte numerate; e la tua raccomandazione.
> Dillo alla profondità tecnica che il progetto ha dichiarato in `communication_depth`
> —`beginner`, `decision_maker` o `technical`—; se il progetto non ne ha dichiarata nessuna, usa
> `decision_maker`.

Cosa gli sto chiedendo: che chi esegue non si fidi dei numeri di chi ha pianificato, anche se è lo
stesso modello in un'altra sessione. Nel mio caso, tre affermazioni su quattro del piano erano
sbagliate; dove c'era uno strumento, il numero era esatto.

## 3. Risultato atteso

- Il misuratore nel repository (`tools/measure_*.py`, `scripts/meter-*.mjs` o simile), con il suo
  test.
- Il numero, con il comando che lo produce e la data.
- L'audit in due direzioni, scritto in due o tre righe.
- L'approssimato marcato come tale, con il suo margine.
- Se c'è un budget: il valore, il margine, e il test che lo protegge.
- Nel commit: "measured: [number] with [meter]".

## 4. Verifica di completezza

- Puoi eseguire tu il comando del misuratore e ti dà lo stesso numero? (Lo esegui tu; non serve
  capirlo, solo eseguirlo.)
- Il misuratore ha un test? Contro quale caso noto?
- C'è qualche numero nel rapporto senza un misuratore dietro? Chiedi da dove è uscito.
- L'approssimato è marcato?
- Se il piano portava numeri, l'agente li ha verificati prima di eseguire e ti ha detto quali non
  tornavano?

## 5. Segnali d'allarme

- Un numero è cambiato tra due rapporti senza che il codice cambiasse. Uno dei due non è stato
  misurato.
- Il misuratore dà zero. Non è quasi mai zero; quasi sempre il misuratore non sta vedendo qualcosa.
- L'agente propone di costruire "mentre misura", per guadagnare tempo. L'ordine è il metodo: prima
  il numero, poi il piano.
