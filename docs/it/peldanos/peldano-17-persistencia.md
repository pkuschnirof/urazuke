# Passo 17 — Ottimizzazione dello strato di persistenza, misurata prima e dopo (contratto del gradino)

**Fase:** qualità operativa, prima del primo deployment in produzione.
**Quando:** nella fase di uscita in produzione, dopo il 16 (serve vedere le query per misurarle) e
prima del 19 (le prove di rendimento si eseguono sulla persistenza già ottimizzata; altrimenti
misurano il problema che si conosceva già). Si ripete quando un blocco aggiunge una tabella grande
o cambia un flusso critico, e quando il monitoraggio (20) mostra una query fuori range. In un
legacy, le misurazioni escono da N6 e la maggior parte di ciò che si trova si paga "al tocco",
salvo ciò che è già fuori range.
**Forma:** due invii: misurare e proporre; applicare con prima e dopo.
**Dimensione:** proporzionale: in un progetto piccolo, gli indici delle query reali e la fine dei
cicli N+1; in uno con conseguenze, completo, con budget per percorso.

## A cosa serve

Lo strato di persistenza è dove i sistemi muoiono lentamente: funzionano bene con cento record,
accettabilmente con diecimila, e a centomila ogni schermata ci mette venti secondi, e nessuno sa
quando è cominciato. Questo gradino esiste perché quella cosa si decida con i numeri e prima della
produzione, non con le lamentele e dopo. E perché si decida **con il metodo del gradino 9**: ogni
query che il sistema fa si conta e si cronometra con un misuratore che ha il suo test, si cambia
ciò che i numeri dicono, e si misura di nuovo sugli stessi dati. Il primo audit di query senza
indice su un sistema vivo [Ref. 18](../REFERENCIAS.md#ref-18) e il budget di query stretto a ciò che
era stato misurato [Ref. 37](../REFERENCIAS.md#ref-37) sono l'origine di questo gradino; la decisione
dell'interfaccia asincrona dalla riga uno [Ref. 15](../REFERENCIAS.md#ref-15), il suo antecedente
nell'avvio.

Ciò che non è: non è "riscrivere l'accesso ai dati", né scegliere un altro motore. Quello lo ha
deciso il gradino 3. È aggiustare ciò che c'è (indici, paginazione, lotti, retention, dimensione
del pool) a partire da ciò che le query reali fanno.

**Se sei alle prime armi.** Lo *strato di persistenza* è la parte del sistema che salva e legge i
dati, quasi sempre un database. Un *indice* è come l'indice di un libro: senza di esso, per
trovare un appuntamento il database legge l'intera tabella (questo è un *full scan*); con esso, va
dritto. Un *ciclo N+1* è un errore molto comune: per mostrare cento appuntamenti, il sistema fa
una query per la lista e poi altre cento query, una per appuntamento, invece di una sola.
*Paginazione* è mostrare venti alla volta invece di tutto insieme. *Retention* è per quanto tempo
si conserva ogni dato prima di archiviarlo o cancellarlo. E il *pool di connessioni* è la quantità
di "linee aperte" che il sistema tiene con il database nello stesso momento. Niente di tutto
questo richiede che tu legga codice: richiede che tu guardi numeri prima e dopo.

## 1. Contesto richiesto

Quello che segue è la lista generica. I file concreti che devi avere pronti prima di ogni prompt,
con il loro contenuto e il loro stato minimo, stanno nella sezione 2, nel blocco "Prima di
inviare il prompt" che precede ciascuno.

- Il dimensionamento e la volumetria (gradino 3, o N6 in un legacy): i volumi ai quali bisogna
  misurare.
- La mappa produttore-consumatore (gradino 8): cosa consuma ogni tabella.
- L'osservabilità (16): ogni query visibile con il suo tempo.
- L'ambiente di test caricato con dati al volume atteso.

## 2. Prompt

**Iniziale (misurare e proporre):**

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business con te), non
l'agente:

- `docs/SIZING.md` e `docs/VOLUME_SURVEY.md` (gradino 3 o N6), chiusi: i volumi da caricare.
- L'ambiente di test con dati **al volume atteso**, non con dieci record di esempio. Se c'è un
  sistema precedente o la produzione, una copia anonimizzata; se è un progetto nuovo, chiedi
  all'agente di generare dati sintetici con la forma dell'albero semantico e i volumi del
  dimensionamento, e di lasciarlo come script nel repository. Questa è una voce in sospeso
  precedente, non parte di questo prompt.
- `docs/PRODUCER_CONSUMER_MAP.md` (gradino 8), aggiornato.
- Se c'è la produzione: accesso in sola lettura, con la credenziale fuori dalla chat, per misurare
  su dati reali oltre a quelli di test.
- Un caso noto per il test di ogni misuratore (una tabella di cui conosci il numero di righe).
- Stato minimo accettabile: l'ambiente di test ha i volumi del dimensionamento e l'agente può
  vedere ogni query con il suo tempo (gradino 16).

> We are going to optimize the persistence layer with measurements, not opinions. Read
> `docs/SIZING.md`, `docs/VOLUME_SURVEY.md` and `docs/PRODUCER_CONSUMER_MAP.md`. With the test
> environment loaded at the volumes of the sizing (and, if I gave you access, production
> read-only), measure first, with meters that live in the repository and have a test against a
> known case: every query the system runs per screen and per job, with its count and its time;
> the queries that read whole tables; the ones that run once per item; the size and monthly growth
> of every table; the connection pool usage at the peak. Audit each meter in both directions. Show
> me the numbers with the commands that produce them. Then propose, query by query, what to
> change: indexes derived from the real queries, pagination, batching, the elimination of N+1
> loops, retention and archiving per table, pool size; for each change, the expected gain, the
> risk, and which consumers in the map it touches. Do not change anything yet: I approve the list.
> Reply in my language.

> [it]
> Ottimizzeremo lo strato di persistenza con le misurazioni, non con le opinioni. Leggi
> `docs/SIZING.md`, `docs/VOLUME_SURVEY.md` e `docs/PRODUCER_CONSUMER_MAP.md`. Con l'ambiente di
> test caricato ai volumi del dimensionamento (e, se ti ho dato accesso, la produzione in sola
> lettura), misura prima, con misuratori che vivono nel repository e hanno un test contro un caso
> noto: ogni query che il sistema esegue per schermata e per processo, con il suo conteggio e il
> suo tempo; le query che leggono tabelle intere; quelle che girano una volta per elemento; la
> dimensione e la crescita mensile di ogni tabella; l'uso del pool di connessioni al picco.
> Verifica ogni misuratore nelle due direzioni. Mostrami i numeri con i comandi che li producono.
> Poi proponi, query per query, cosa cambiare: indici derivati dalle query reali, paginazione,
> lotti, l'eliminazione dei cicli N+1, retention e archiviazione per tabella, dimensione del pool;
> per ogni modifica, il guadagno atteso, il rischio, e quali consumatori della mappa tocca. Non
> cambiare ancora nulla: la lista la approvo io. Rispondi nella mia lingua.

Cosa gli sto chiedendo: misurare con il metodo del gradino 9 (misuratore con test, verificato
nelle due direzioni, numero con comando) prima di proporre; proporre query per query, con il
guadagno e il rischio, e con i consumatori della mappa che ogni modifica tocca (un indice nuovo
non tocca nessuno; una retention per tabella tocca tutti quelli che leggono quella tabella); e
**non cambiare nulla finché non approvo io**, perché l'ottimizzazione è il luogo dove più si
"migliora" ciò che nessuno ha chiesto.

**Di chiusura (applicare con prima e dopo):**

**Prima di inviare il prompt**, devi avere questo sottomano:

- La lista delle modifiche proposte, letta, con la tua approvazione o il tuo rifiuto per ciascuna;
  quelle rifiutate, con una riga di motivazione. Per quelle che toccano consumatori della mappa,
  la conferma che hai capito cosa cambia per loro.
- Un conto rifatto a mano su un numero della misurazione (righe al mese della tabella più grande,
  per esempio), che coincide.
- Stato minimo accettabile: ogni modifica ha il suo verdetto e sai quale consumatore tocca.

> Apply the approved changes [list], one commit each. For each one show me the meter before and
> after on the same data, the regression suite green, and the end-to-end suite green. Set a budget
> per critical path (queries and time) at the measured value plus a small margin, protected by a
> test that fails if it is exceeded. Update every consumer in the map that a change touches, in
> the same commit. Record the before and after table, the budgets and the retention per table in
> `docs/PERSISTENCE.md`.

> [it]
> Applica le modifiche approvate [lista], un commit ciascuna. Per ognuna mostrami il misuratore
> prima e dopo sugli stessi dati, la regressione in verde, e la batteria end to end in verde.
> Fissa un budget per percorso critico (query e tempo) al valore misurato più un piccolo margine,
> protetto da un test che fallisce se viene superato. Aggiorna ogni consumatore della mappa che
> una modifica tocca, nello stesso commit. Registra la tabella del prima e dopo, i budget e la
> retention per tabella in `docs/PERSISTENCE.md`.

Cosa gli sto chiedendo: un commit per modifica, perché il prima e il dopo siano attribuibili; lo
stesso misuratore sugli stessi dati (se cambiano i dati, il numero non dice niente); il budget
con test, che è ciò che impedisce al ciclo N+1 di tornare tra tre mesi; e la simmetria del gradino
8 applicata alla persistenza.

## 3. Risultato atteso

- I misuratori di query nel repository, con test.
- `docs/PERSISTENCE.md` con la tabella del prima e dopo per ogni modifica, i budget per percorso e
  la retention per tabella.
- Gli indici, la paginazione, i lotti e la retention applicati, un commit ciascuno, con la
  regressione e l'end to end in verde.
- Un test per budget che fallisce se viene superato.

## 4. Verifica di completezza

- Esegui tu un misuratore prima e dopo (l'agente ti dà i due comandi): coincidono con la tabella?
- C'è qualche query che legge una tabella intera in un flusso critico? Perché è rimasta?
- Ogni tabella ha una politica di retention scritta, anche se è "per sempre"?
- I budget hanno un test? Chiedigli di superarne uno apposta e di mostrarti il rosso.
- La schermata più lenta, con i dati al volume, ci mette quanto il dimensionamento si aspettava?

## 5. Segnali d'allarme

- Le misurazioni sono state fatte con i dati di esempio dello scheletro. Tutto è veloce con dieci
  righe.
- L'agente propone di "migrare a un altro database" o di "riscrivere lo strato dati". Quello è il
  gradino 3, e se bisogna tornarci è una decisione tua, non un'ottimizzazione.
- Il numero è migliorato ma l'end to end di un flusso ha smesso di passare. Un indice non rompe un
  flusso; una retention o una paginazione sì: è mancato un consumatore della mappa.
- Non ci sono budget. Senza budget, l'ottimizzazione dura fino al blocco successivo.
