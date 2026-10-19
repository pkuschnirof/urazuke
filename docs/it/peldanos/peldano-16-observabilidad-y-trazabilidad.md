# Passo 16 — Osservabilità e tracciabilità totali, con livello configurabile (contratto del gradino)

**Fase:** qualità operativa, prima del primo deployment in produzione.
**Quando:** nella fase di uscita in produzione, dopo il 13 (c'è già la catena di deployment e la
configurazione per ambiente) e prima delle prove di rendimento (19), perché senza osservabilità
le prove di rendimento non dicono cosa si è rotto. In un legacy, il livello minimo (registri
strutturati con livello configurabile e un identificatore di correlazione) entra nella cintura di
sicurezza (N4); il livello completo, qui. La regola "ogni modulo nuovo registra e propaga" vige
durante tutto l'esercizio.
**Forma:** un solo invio; l'agente costruisce e dimostra; tu leggi una traccia reale.
**Dimensione:** obbligatorio nel suo livello minimo in ogni progetto che avrà utenti; completo in
qualunque progetto con conseguenze.

## A cosa serve

Quando qualcosa fallirà in produzione, e fallirà, voglio poter seguire un'azione dalla schermata
fino al database e fino a ogni chiamata esterna, con un solo identificatore, senza aprire il
codice e senza chiedere all'agente di "controllare". E voglio poter alzare il livello di dettaglio
dei registri in produzione, in un minuto, senza rifare il deployment, e riabbassarlo dopo. Questa
è l'osservabilità: vedere ciò che il sistema fa. E la seconda cosa è la tracciabilità: che ogni
azione con conseguenza (ha incassato, ha inviato, ha cancellato, ha approvato) lasci una traccia
di chi, quando, cosa, da dove e con quale risultato, in un registro che l'applicazione non può
modificare. Senza questo, l'agente residente del gradino 15 opera alla cieca, il monitoraggio dei
gradini 20 e 21 non ha di che alimentarsi, e ogni incidente si diagnostica con ipotesi invece che
con prove. Il turno orfano che è rimasto vivo un'ora e quarantatré si è trovato dal log, non dal
codice [Ref. 16](../REFERENCIAS.md#ref-16); e l'agente residente è partito, appunto, leggendo log
[Ref. 13](../REFERENCIAS.md#ref-13).

"Livello configurabile" è la clausola che distingue questo dal "mettere dei log": il livello
(errore, avviso, informazione, debug, traccia) si cambia per configurazione sul server, per
ambiente, senza toccare codice né rifare il deployment, e la produzione gira su informazione
salvo quando si sta investigando qualcosa.

**Se sei alle prime armi.** Un *registro* (log) è una riga che il sistema scrive ogni volta che fa
qualcosa: "10:42:13, modulo agenda, utente reception1, appuntamento 17 cancellato". *Strutturato*
vuol dire che tutte le righe hanno le stesse parti nello stesso ordine, perché si possano cercare
a macchina. Il *livello* è quanto dettaglio si scrive: in "errore" solo ciò che è fallito; in
"traccia", ogni passo. L'*identificatore di correlazione* è un numero unico che si dà a ogni
azione quando comincia (hai premuto "cancella") e che viaggia attaccato a tutto ciò che
quell'azione provoca (la query al database, il messaggio al paziente), così dopo si cerca quel
numero e compare la storia completa. E l'*audit* è una lista che non si può modificare delle
azioni importanti: chi ha fatto cosa e quando.

## 1. Contesto richiesto

Quello che segue è la lista generica. I file concreti che devi avere pronti prima di ogni prompt,
con il loro contenuto e il loro stato minimo, stanno nella sezione 2, nel blocco "Prima di
inviare il prompt" che precede ciascuno.

- La catena di deployment e la configurazione per ambiente (gradino 13): il livello si configura
  lì.
- La tabella dei lucchetti (gradino 12): ogni azione con conseguenza è una voce dell'audit.
- La rilevazione iniziale con i dati personali segnati: i registri non possono contenerli.
- Dove vivranno i registri e le metriche (un file ruotato, un servizio): lo decidi tu.

## 2. Prompt

**Iniziale:**

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business con te), non
l'agente:

- `docs/DEPLOYMENT.md` (gradino 13) con il modo in cui si legge la configurazione per ambiente:
  il livello di registro sarà una variabile in più di quella configurazione.
- `docs/LOCKS.md` (gradino 12): la lista delle azioni con conseguenza è la lista di ciò che deve
  restare nell'audit.
- In `docs/INITIAL_SURVEY.md`, la lista di quali dati sono personali (nomi, telefoni, email,
  documenti, diagnosi), scritta da te con il proprietario: è ciò che i registri devono mascherare.
  È un obbligo di legge, non una preferenza.
- La tua decisione su dove vivono i registri e le metriche: un file ruotato sul server basta per
  un progetto piccolo; un servizio di log, per uno con conseguenze. E per quanto tempo si
  conservano.
- Stato minimo accettabile: sai quali dati sono personali e dove vivranno i registri.

> We are going to make this system observable and traceable, end to end, with a level that I can
> change without redeploying. Read `PROJECT.md`, `docs/SEMANTIC_TREE.md`, `docs/DEPLOYMENT.md` and
> `docs/LOCKS.md`. Evaluate whether you have what is needed (where the logs and metrics will live,
> how configuration is read per environment, which external services are called); if anything is
> missing, ask me. Then set up: (1) structured logging, one record per event, with timestamp,
> level, module, correlation id and actor, with the level configurable per environment at runtime
> (error, warning, info, debug, trace) without a redeploy, and a default of info in production;
> (2) a correlation id created at the entry of every request, job and message, propagated through
> every call and written in every record, so that one id follows an action from the screen to the
> backend, to the database and to every external call; (3) traceability of every consequential
> action in `docs/LOCKS.md`: who, when, what, from where, with which input and which outcome, in
> an audit record the application cannot edit; (4) health and metrics endpoints or files
> (requests, latency, errors, queue sizes, resource usage) that the monitoring of steps 20 and 21
> will read; (5) masking of every personal field listed in `docs/INITIAL_SURVEY.md`, so that no
> log record contains personal data. Show me one real request followed by its id through every
> layer, and show me the level changing in the test environment without a redeploy. Document the
> levels, where to change them and where the records live in `docs/OBSERVABILITY.md`. Reply in my
> language.

> [it]
> Faremo in modo che questo sistema sia osservabile e tracciabile, da un capo all'altro, con un
> livello che io possa cambiare senza rifare il deployment. Leggi `PROJECT.md`,
> `docs/SEMANTIC_TREE.md`, `docs/DEPLOYMENT.md` e `docs/LOCKS.md`. Valuta se hai ciò che serve
> (dove vivranno i log e le metriche, come si legge la configurazione per ambiente, quali servizi
> esterni vengono chiamati); se manca qualcosa, chiedimelo. Poi predisponi: (1) registro
> strutturato, un record per evento, con data e ora, livello, modulo, identificatore di
> correlazione e attore, con il livello configurabile per ambiente a tempo di esecuzione (errore,
> avviso, informazione, debug, traccia) senza rifare il deployment, e con informazione come valore
> predefinito in produzione; (2) un identificatore di correlazione creato all'ingresso di ogni
> richiesta, processo e messaggio, propagato attraverso ogni chiamata e scritto in ogni record, in
> modo che un solo identificatore segua un'azione dalla schermata al backend, al database e a ogni
> chiamata esterna; (3) la tracciabilità di ogni azione con conseguenza di `docs/LOCKS.md`: chi,
> quando, cosa, da dove, con quale input e con quale esito, in un record di audit che
> l'applicazione non può modificare; (4) endpoint o file di salute e metriche (richieste, latenza,
> errori, dimensione delle code, uso delle risorse) che il monitoraggio dei gradini 20 e 21
> leggerà; (5) il mascheramento di ogni campo personale elencato in `docs/INITIAL_SURVEY.md`, in
> modo che nessun record di log contenga dati personali. Mostrami una richiesta reale seguita dal
> suo identificatore attraverso ogni strato, e mostrami il livello che cambia nell'ambiente di
> test senza rifare il deployment. Documenta i livelli, dove cambiarli e dove vivono i record in
> `docs/OBSERVABILITY.md`. Rispondi nella mia lingua.

Cosa gli sto chiedendo: i cinque pezzi, e due dimostrazioni che sono la prova del gradino: **un
identificatore reale seguito attraverso tutti gli strati** (se non lo può mostrare, la
propagazione è rotta da qualche parte) e **il livello che cambia senza deployment** (se bisogna
fare il deployment, non è configurabile). L'audit delle azioni con conseguenza deve essere
immutabile dall'applicazione, perché una traccia che l'applicazione può cancellare non è una
traccia. E il mascheramento dei dati personali va nello stesso prompt perché i registri sono il
luogo dove più dati personali si disperdono senza che nessuno lo decida.

**Routine (va nel patto di convivenza):**

**Prima di inviare il prompt**, devi avere questo sottomano:

- `docs/OBSERVABILITY.md` letto da te: capisci come alzare il livello e dove leggere un registro?
- `docs/WORKING_AGREEMENT.md`, dove va la routine.
- Stato minimo accettabile: hai alzato e riabbassato il livello tu, una volta, nell'ambiente di
  test.

> Every new module, job or integration writes structured log records with the correlation id and
> the actor at the level that corresponds, masks personal data, propagates the id to every call it
> makes, and records every consequential action in the audit trail. A pending item that adds one
> of those is not closed without showing one real id followed end to end through the new code.

> [it]
> Ogni modulo, processo o integrazione nuova scrive record di log strutturati con l'identificatore
> di correlazione e l'attore al livello che corrisponde, maschera i dati personali, propaga
> l'identificatore a ogni chiamata che fa, e registra ogni azione con conseguenza nella traccia di
> audit. Una voce in sospeso che aggiunge uno di questi non si chiude senza mostrare un
> identificatore reale seguito da un capo all'altro attraverso il codice nuovo.

Cosa gli sto chiedendo: che l'osservabilità non si degradi con ogni modulo nuovo, che è ciò che
succede sempre se non è una regola: il modulo del terzo mese non registra niente ed è proprio
quello che fallisce.

## 3. Risultato atteso

- Registri strutturati con livello configurabile per ambiente, cambiati senza deployment.
- Un identificatore di correlazione in ogni record, propagato dalla schermata al database e alle
  chiamate esterne.
- Un registro di audit immutabile delle azioni con conseguenza.
- Endpoint o file di salute e metriche, documentati.
- Nessun dato personale nei registri.
- `docs/OBSERVABILITY.md` e la routine nel patto.

## 4. Verifica di completezza (la fai tu, senza leggere codice)

- Chiedigli l'identificatore di una richiesta reale e cercalo tu nei registri: compare nella
  schermata, nel backend, nel database e nella chiamata esterna, se c'è stata?
- Alza il livello a debug nell'ambiente di test, fai un'azione, guarda i registri, riabbassalo.
  Hai dovuto fare il deployment? Allora non è salito.
- Cerca un nome o un telefono di prova nei registri: non ci deve essere.
- Fai un'azione con conseguenza in test (cancellare, inviare alla casella finta): è rimasta
  nell'audit con chi, quando, cosa ed esito?
- `docs/OBSERVABILITY.md` ti basta per trovare un registro da solo alle tre del mattino?

## 5. Segnali d'allarme

- L'agente mostra dei "log" ma ogni modulo scrive in un formato diverso. Non è strutturato;
  nessuno potrà cercarli.
- L'identificatore compare nel backend ma non nelle chiamate esterne o nelle attività pianificate.
  Sono proprio i posti dove gli incidenti si perdono.
- Il livello di produzione è rimasto su debug "per ora". Si riempie il disco e si disperdono dati.
- L'audit delle azioni con conseguenza vive nella stessa tabella del resto dei dati e
  l'applicazione può cancellarla.
