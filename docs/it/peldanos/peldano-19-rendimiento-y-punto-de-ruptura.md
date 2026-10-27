# Passo 19 — Prove di rendimento in volume e punto di rottura (contratto del gradino)

**Fase:** uscita in produzione.
**Quando:** nella fase di uscita in produzione, dopo il 16 (senza osservabilità non si sa cosa si
è rotto) e dopo il 17 (sulla persistenza già ottimizzata), e prima del primo deployment in
produzione. Si ripete prima di ogni deployment che cambi l'architettura, la persistenza o un
flusso critico, e quando il dimensionamento cambia (lo si vende a un altro cliente, il volume
raddoppia). In un legacy, si esegue con i volumi misurati in N6, prima del primo deployment
successivo alla normalizzazione.
**Forma:** un solo invio; l'agente carica, misura e rompe; tu leggi i numeri e il punto di
rottura.
**Dimensione:** proporzionale: in un progetto piccolo, un'esecuzione al volume atteso e una al
"per dieci"; in uno con conseguenze, completo, con il punto di rottura trovato e le soglie
registrate per il monitoraggio.

## A cosa serve

Il gradino 3 ha dimensionato con i conti; questo gradino verifica i conti con il sistema reale in
esecuzione. Voglio sapere tre cose prima che entri il primo utente: come si comporta il sistema
al volume che il business ha dichiarato (la schermata più usata risponde in un tempo che il
proprietario tollererebbe?), come si comporta al "per dieci" (regge, o cosa smette di reggere per
primo?), e **dove si rompe**: il carico esatto al quale qualcosa cede, e cos'è quel qualcosa (le
connessioni al database, la memoria, una coda, un blocco). Il punto di rottura è il numero più
utile di tutta la fase, perché da lì escono le soglie di allerta del gradino 21: un'allerta messa
"a occhio" avvisa tardi o avvisa sempre; un'allerta messa sotto il punto di rottura misurato, con
un margine, avvisa quando c'è ancora tempo. Gli schemi di scala che ho ricavato da un sistema in
produzione [Ref. 12](../REFERENCIAS.md#ref-12) e la batteria che moriva per memoria e sembrava un
test fallito [Ref. 44](../REFERENCIAS.md#ref-44) sono i due antecedenti: il primo, del misurare il
carico reale; il secondo, del fatto che un punto di rottura non trovato in tempo si traveste da
altro.

**Se sei alle prime armi.** Una *prova di carico* è un programma che simula molti utenti che usano
il sistema nello stesso momento, per vedere cosa succede. Il *rendimento* (throughput) è quante
azioni al secondo regge. La *latenza* è quanto ci mette un'azione a rispondere; si guarda la
*mediana* (metà delle azioni ci ha messo meno di questo) e il *percentile 95* (il 95 % ci ha messo
meno di questo; il restante 5 % sono gli utenti che si lamentano). Il *punto di rottura* è la
quantità di carico alla quale qualcosa smette di funzionare: non "diventa lento" ma "le
connessioni al database si sono esaurite" o "la memoria si è riempita". E una *soglia* è un numero
limite a partire dal quale il monitoraggio avvisa.

## 1. Contesto richiesto

Quello che segue è la lista generica. I file concreti che devi avere pronti prima di ogni prompt,
con il loro contenuto e il loro stato minimo, stanno nella sezione 2, nel blocco "Prima di
inviare il prompt" che precede ciascuno.

- Il dimensionamento (gradino 3 o N6): il volume atteso e il "per dieci".
- L'osservabilità (16) accesa, per vedere cosa si rompe.
- La persistenza ottimizzata (17) con i suoi budget.
- Un ambiente di test simile alla produzione nelle risorse, o la consapevolezza di in cosa
  differisce.
- I flussi critici (quelli dell'albero semantico, o quelli della caratterizzazione in un legacy).

## 2. Prompt

**Iniziale (caricare, misurare, rompere):**

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business con te), non
l'agente:

- `docs/SIZING.md` con il volume atteso (utenti concorrenti al picco, eventi all'ora, righe per
  tabella) e il "per dieci": sono i due scalini di carico.
- La lista dei flussi critici per il buco del prompt, scritta da te a partire dall'albero
  semantico: quelli che si usano di più e quelli che hanno conseguenze. Tra tre e sei.
- Un ambiente di test con risorse comparabili alla produzione o, se non è possibile, annotato in
  `docs/ENVIRONMENTS_SURVEY.md` in cosa differisce (metà della memoria, un altro motore), perché
  i numeri si leggano con quella correzione.
- Dati al volume atteso nell'ambiente di test (lo stesso script del gradino 17).
- La tua tolleranza, con il proprietario: quanto può metterci la schermata più usata perché il
  business lo consideri accettabile (due secondi, cinque). Senza quel numero, i risultati non si
  possono giudicare.
- Stato minimo accettabile: conosci i due scalini di carico, i flussi critici e la tolleranza.

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
> diagnosis of the first bottleneck.
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
> Scopriremo come si comporta questo sistema ai volumi di `docs/SIZING.md`, e dove si rompe.
> Nell'ambiente di test, con l'osservabilità del gradino 16 accesa e i dati caricati al volume
> atteso: (1) scrivi uno script di carico che viva nel repository e operi i flussi critici
> [lista] dalla schermata o dall'API come farebbero gli utenti, con un numero di utenti
> concorrenti e una durata configurabili, e con un test che provi che lo script esercita davvero
> ogni flusso (l'effetto nel backend compare); (2) eseguilo al volume atteso e mostrami, per
> flusso: rendimento, latenza mediana e percentile 95, tasso di errore, e l'uso delle risorse del
> server e del database durante l'esecuzione; (3) eseguilo a dieci volte il volume atteso e
> mostrami lo stesso; (4) alza il carico scalino per scalino finché qualcosa non si rompe, e dimmi
> esattamente cosa si è rotto per primo (connessioni al database, memoria, una coda, un blocco, il
> disco) e a quale carico: quello è il punto di rottura; (5) confronta ogni numero con i budget di
> `docs/PERSISTENCE.md`, con la tolleranza che ti ho dato ([tolleranza] per la schermata più
> usata) e con le ipotesi del dimensionamento, e dimmi quale ipotesi era sbagliata, se ce n'era
> una. Non ottimizzare ancora nulla. Scrivi `docs/PERFORMANCE_[data].md` con i numeri, i comandi,
> il punto di rottura e la tua diagnosi del primo collo di bottiglia.
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

Cosa gli sto chiedendo: uno script di carico che è un misuratore come gli altri (vive nel
repository e ha il suo test, perché uno script di carico che non esercita il flusso misura
l'aria); tre esecuzioni (atteso, per dieci, fino a rompere); i numeri con i comandi; il confronto
con i budget, la tolleranza del business e le ipotesi del dimensionamento, che è dove si scopre
che il gradino 3 si era sbagliato in qualcosa; e **niente ottimizzazioni per ora**, perché
ottimizzare senza leggere la diagnosi è cambiare ciò che non era.

**Di chiusura (soglie e voci in sospeso):**

**Prima di inviare il prompt**, devi avere questo sottomano:

- `docs/PERFORMANCE_[data].md` letto da te, con la tolleranza del business accanto: la schermata
  più usata rientra nel tollerabile al volume atteso? E al "per dieci"?
- Con il proprietario, la decisione sul "per dieci": se il business pensa di crescere, i colli di
  bottiglia sotto il "per dieci" sono voci in sospeso adesso; se no, possono aspettare, con una
  data.
- Stato minimo accettabile: hai letto il punto di rottura e hai deciso quali colli di bottiglia si
  sistemano adesso.

> Record in `docs/PERFORMANCE.md`: the expected volume, the ten-times volume, the breaking point
> with what breaks, and the alert thresholds that monitoring (step 21) will use, set below the
> breaking point with a margin and above the expected volume. Open a pending item for each
> bottleneck that sits below [ten times the expected volume / the volume I decided], with the
> measured number as its acceptance criterion. Make the load test a gate in `docs/GATES.md`: it
> reruns before every deployment that changes the architecture, the persistence or a critical
> flow, and its results are archived with date and version. Show me the first run archived.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [it]
> Registra in `docs/PERFORMANCE.md`: il volume atteso, il volume per dieci, il punto di rottura
> con cosa si rompe, e le soglie di allerta che il monitoraggio (gradino 21) userà, fissate sotto
> il punto di rottura con un margine e sopra il volume atteso. Apri una voce in sospeso per ogni
> collo di bottiglia che resti sotto [dieci volte il volume atteso / il volume che ho deciso], con
> il numero misurato come suo criterio di accettazione. Rendi la prova di carico un cancello in
> `docs/GATES.md`: si riesegue prima di ogni deployment che cambia l'architettura, la persistenza
> o un flusso critico, e i suoi risultati si archiviano con data e versione. Mostrami la prima
> esecuzione archiviata.
>
> Quando hai bisogno di una decisione da parte mia, chiedila con le quattro parti della UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e in questo ordine: i dati che rendono necessaria la domanda,
> elencati; un paragrafo di non più di cinque righe che li colleghi e lasci vedere
> l'interrogativo; la domanda con le sue possibili risposte numerate; e la tua raccomandazione.
> Dillo alla profondità tecnica che il progetto ha dichiarato in `communication_depth`
> —`beginner`, `decision_maker` o `technical`—; se il progetto non ne ha dichiarata nessuna, usa
> `decision_maker`.

Cosa gli sto chiedendo: le soglie di allerta derivate dal punto di rottura, che è l'aggancio con
il gradino 21; i colli di bottiglia come voci in sospeso con il numero come criterio (così si
chiudono con una prova e non con "adesso va meglio"); e la prova di carico come cancello
archiviato, perché tra sei mesi si possa confrontare.

## 3. Risultato atteso

- Lo script di carico nel repository, con test.
- `docs/PERFORMANCE_[data].md` con le tre esecuzioni, i numeri, il punto di rottura e la diagnosi;
  `docs/PERFORMANCE.md` con le soglie e il cancello.
- Una voce in sospeso per ogni collo di bottiglia sotto il volume deciso.
- La prova di carico come cancello prima dei deployment che la richiedono.

## 4. Verifica di completezza

- La schermata più usata, al volume atteso, ci mette meno della tolleranza del proprietario? Se
  no, c'è una voce in sospeso aperta con quel numero.
- Il punto di rottura dice cosa si è rotto e a quale carico, o dice "il sistema è diventato
  lento"?
- Le soglie di `docs/PERFORMANCE.md` stanno sotto il punto di rottura e sopra l'atteso?
- Esegui tu lo script al volume atteso con il comando che ti ha dato: i numeri si somigliano?
- L'ambiente di test differisce dalla produzione nelle risorse, ed è annotato in cosa?

## 5. Segnali d'allarme

- "Regge il per dieci senza problemi" senza un punto di rottura. Se non ha trovato dove si rompe,
  non ha alzato abbastanza il carico.
- Lo script di carico colpisce l'API ma non passa dalla schermata, in un sistema dove è la
  schermata a caricare. Misura un'altra cosa.
- I risultati sono di un'esecuzione sulla macchina dell'agente, non nell'ambiente di test.
- Sono stati sistemati colli di bottiglia durante la prova, "già che c'ero". Adesso non sai quale
  numero corrisponde a quale versione.
