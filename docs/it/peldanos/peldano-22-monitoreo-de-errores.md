# Passo 22 — Monitoraggio degli errori e rapporto ciclico: nessun errore senza voce in sospeso (contratto del gradino)

**Fase:** esercizio.
**Quando:** si monta nella fase di esercizio, con il primo deployment, insieme al 21, sui
registri del 16; da allora gira da solo, con allerte sul momento e un rapporto
ciclico che si legge con il proprietario. Ogni errore nuovo entra nel ciclo come voce in sospeso
correttiva e si chiude con il test che lo riproduce in rosso. In un legacy, la prima lettura è la
linea base: gli errori che esistevano già il primo giorno diventano voci in sospeso con la loro
marca di velocità, e nessuno resta come "noto" senza una voce in sospeso che dica perché si
tollera e fino a quando.
**Forma:** un solo invio per montare; poi, routine ciclica.
**Dimensione:** obbligatorio in ogni progetto con utenti: la cattura centralizzata e il rapporto
non si negoziano; le allerte sul momento, proporzionali.

## A cosa serve

Un sistema in produzione produce errori che nessun utente segnala: quello di chi ha visto la
schermata bianca ed è tornato a provare, quello del processo notturno che è fallito e nessuno
guarda, quello della chiamata esterna che ha restituito un errore e il codice si è ingoiato. Se
non li catturo, non esistono finché non esistono troppo. Questo gradino è la controparte del 21:
quello sorveglia il rendimento, questo sorveglia gli errori, e tutti e due finiscono nello stesso
posto, il ciclo, come voci in sospeso correttive. Le regole di fondo sono due. **Nessun errore
senza voce in sospeso**: un errore nuovo ne apre una, e si chiude con il test che lo riproduce in
rosso, come chiede la modalità correttiva del percorso evolutivo. E **non esiste l'"errore noto"**
senza una voce in sospeso che dica perché si tollera e fino a quando; "quell'errore c'è sempre
stato" è la frase con cui un sistema marcisce. L'errore di autenticazione riportato come successo
[Ref. 43](../REFERENCIAS.md#ref-43) e i quattro giri fino alla causa radice
[Ref. 22](../REFERENCIAS.md#ref-22) sono i due antecedenti: il primo, del fatto che gli errori si
nascondono se non li si cattura a macchina; il secondo, del fatto che un errore senza
riproduzione si sistema più volte.

**Se sei alle prime armi.** Un *errore* è qualunque cosa che il sistema ha provato a fare e non ha
potuto: una schermata che non si è caricata, un processo notturno che si è interrotto, una
chiamata a un altro servizio che è fallita. Un'*eccezione non gestita* è un errore che il codice
non aveva previsto e che interrompe ciò che stava facendo. *Catturare* un errore è salvarlo con
tutti i suoi dati (quando, in quale versione, con quale identificatore, lo *stack*, che è la
lista dei passi del programma fino al guasto) in un solo posto centrale, invece di lasciarlo
perdere nella schermata di un utente. *Raggruppare* è mettere insieme le mille volte in cui è
successo lo stesso errore in un'unica voce con un contatore. E il *tasso di errore per flusso* è,
su cento volte che qualcuno ha caricato un appuntamento, quante sono fallite.

## 1. Contesto richiesto

Quello che segue è la lista generica. I file concreti che devi avere pronti prima di ogni prompt,
con il loro contenuto e il loro stato minimo, stanno nella sezione 2, nel blocco "Prima di
inviare il prompt" che precede ciascuno.

- L'osservabilità (16): gli errori arrivano con identificatore di correlazione, versione e attore.
- La tabella dei lucchetti (14): gli errori nelle azioni con conseguenza sono allerta immediata.
- La produzione distribuita (15), con il browser dell'utente incluso nella cattura.
- Il canale delle allerte e il ciclo del rapporto, condivisi con il 21.

## 2. Prompt

**Iniziale (montare e dimostrare):**

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business con te), non
l'agente:

- `docs/OBSERVABILITY.md` (16) chiuso: gli errori devono uscire con identificatore, versione,
  ambiente e attore.
- `docs/LOCKS.md` (14): la lista delle azioni con conseguenza, i cui errori sono allerta sul
  momento.
- Il canale e il ciclo del rapporto, gli stessi del gradino 21, decisi con il proprietario; e il
  numero di occorrenze all'ora di un errore noto a partire dal quale vuoi un'allerta, per il buco
  del prompt.
- Dove si conservano gli errori e per quanto tempo (lo stesso posto dei registri, o un servizio
  di cattura degli errori), deciso da te, con la regola che non contengono dati personali.
- Stato minimo accettabile: gli errori escono già con identificatore (16) e c'è un canale con una
  persona che lo legge.

> We are going to make sure that no error in production goes unseen. Using the records of step 16,
> set up: (1) centralized capture of every error and unhandled exception in the backend, in the
> jobs and in the user's browser, with the correlation id, the version, the environment, the
> actor (never personal data) and the stack; (2) grouping of errors by cause, so that one defect
> is one entry, with its count, first and last occurrence, versions affected and the flows it
> touches; (3) alerts to [channel] for every new error type, for a known error that crosses [N]
> occurrences per hour, and for any error inside a consequential action of `docs/LOCKS.md`; (4) a
> cyclic report, [weekly], generated automatically, with: new errors, recurring errors and their
> trend, the errors fixed in the period with their pending item, the error rate per flow against
> the previous period, and what you propose for each open one; (5) the rule that every new error
> type opens a corrective pending item, closed with the test that reproduces it in red, and that
> there is no "known error" without a pending item that says why it is tolerated and until when.
> Show me one error provoked on purpose in the test environment, in the browser, followed by its
> id to the backend record, the alert and the report. Document it in `docs/MONITORING.md`. Reply
> in my language.

> [it]
> Ci assicureremo che nessun errore in produzione passi inosservato. Usando i record del gradino
> 16, predisponi: (1) la cattura centralizzata di ogni errore ed eccezione non gestita nel
> backend, nei processi e nel browser dell'utente, con l'identificatore di correlazione, la
> versione, l'ambiente, l'attore (mai dati personali) e lo stack; (2) il raggruppamento degli
> errori per causa, in modo che un difetto sia una voce, con il suo conteggio, la prima e
> l'ultima occorrenza, le versioni interessate e i flussi che tocca; (3) allerte a [canale] per
> ogni tipo di errore nuovo, per un errore noto che supera [N] occorrenze all'ora, e per qualunque
> errore dentro un'azione con conseguenza di `docs/LOCKS.md`; (4) un rapporto ciclico,
> [settimanale], generato automaticamente, con: errori nuovi, errori ricorrenti e la loro
> tendenza, gli errori sistemati nel periodo con la loro voce in sospeso, il tasso di errore per
> flusso rispetto al periodo precedente, e cosa proponi per ciascuno di quelli aperti; (5) la
> regola che ogni tipo di errore nuovo apre una voce in sospeso correttiva, chiusa con il test che
> lo riproduce in rosso, e che non esiste nessun "errore noto" senza una voce in sospeso che dica
> perché si tollera e fino a quando. Mostrami un errore provocato apposta nell'ambiente di test,
> nel browser, seguito dal suo identificatore fino al record del backend, all'allerta e al
> rapporto. Documentalo in `docs/MONITORING.md`. Rispondi nella mia lingua.

Cosa gli sto chiedendo: la cattura nei tre posti dove gli errori si nascondono (backend,
processi, browser), con l'identificatore del 16 per poterli seguire; il raggruppamento, senza il
quale il rapporto è una lista di diecimila righe; le tre allerte che contano (nuovo, ricorrente
che cresce, con conseguenza); il rapporto con il tasso per flusso, che è il numero che il
proprietario capisce; le due regole; e la dimostrazione da un capo all'altro, dal browser al
rapporto.

**Routine di ogni ciclo (va nel patto di convivenza):**

**Prima di inviare il prompt**, devi avere questo sottomano:

- Il rapporto ciclico degli errori appena generato, letto da te.
- `docs/PENDING.md` sottomano, per verificare che i ricorrenti abbiano la loro voce in sospeso.
- Stato minimo accettabile: hai letto il rapporto prima di incollare il prompt.

> With every cyclic error report: go through it with me; open the corrective pending items for
> the new errors, each with the way to reproduce it; confirm that every recurring error has a
> pending item or a written reason with a date; and tell me which errors disappeared and why,
> with the commit that fixed each one. An error that disappeared without a fix is not solved: it
> is hiding, and it stays in the report until its cause is known.

> [it]
> Con ogni rapporto ciclico degli errori: percorrilo con me; apri le voci in sospeso correttive
> degli errori nuovi, ciascuna con il modo di riprodurlo; conferma che ogni errore ricorrente ha
> una voce in sospeso o una ragione scritta con una data; e dimmi quali errori sono spariti e
> perché, con il commit che ha sistemato ciascuno. Un errore sparito senza una correzione non è
> risolto: si sta nascondendo, e resta nel rapporto finché non se ne conosce la causa.

Cosa gli sto chiedendo: la disciplina del ciclo, e la regola dell'errore che sparisce, che è la
più controintuitiva e quella che vale di più: un errore che se n'è andato da solo torna da solo.

## 3. Risultato atteso

- Cattura centralizzata degli errori in backend, processi e browser, raggruppati per causa, senza
  dati personali.
- Allerte per errore nuovo, ricorrente che cresce, e con conseguenza.
- Il rapporto ciclico con il tasso di errore per flusso.
- `docs/MONITORING.md` completo (con il 21); la routine nel patto.
- Una voce in sospeso per ogni errore aperto; nessuno "noto" senza voce in sospeso.

## 4. Verifica di completezza

- Provoca tu un errore nel browser in test (un'azione che sai che fallisce): è comparso nella
  cattura con il tuo identificatore, e ti è arrivata l'allerta?
- Leggi l'ultimo rapporto: c'è qualche errore ricorrente senza voce in sospeso né ragione?
- Prendi un errore "sistemato" del rapporto: la voce in sospeso ha il test che lo ha riprodotto in
  rosso?
- Il tasso di errore per flusso c'è, ed è sceso o salito rispetto al periodo precedente?
- Cerca un dato personale nella cattura degli errori: non ci deve essere.

## 5. Segnali d'allarme

- Zero errori in produzione per un mese con utenti reali. Non esiste un sistema così; la cattura
  non sta vedendo il browser o i processi.
- Un errore con mille occorrenze e un commento "noto, non influisce". Senza voce in sospeso, senza
  data.
- Gli errori si "sistemano" riavviando il servizio. Spariscono e tornano.
- Il rapporto degli errori e quello delle risorse li legge gente diversa e nessuno li incrocia: la
  query lenta del 21 è la causa del timeout del 22.
