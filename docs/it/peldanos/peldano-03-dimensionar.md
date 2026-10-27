# Passo 3 — Dimensionare prima di progettare l'architettura (contratto del gradino)

**Fase:** avvio.
**Quando:** una volta, dopo la definizione e prima di montare lo scheletro; si rifà se il
business cambia di scala.
**Forma:** conversazione: l'agente calcola e presenta opzioni; tu scegli.
**Dimensione:** obbligatorio sempre, ma proporzionale: in un progetto piccolo il dimensionamento
può essere mezza pagina e una sola decisione ("sta in SQLite per anni"). Ciò che non può è non
farsi, perché la domanda "quanto crescerà?" costa cinque minuti e la risposta sbagliata costa
settimane.

## A cosa serve

Prendi le decisioni strutturali —quale motore di database, se l'interfaccia è sincrona o asincrona,
quanta concorrenza— con i numeri e non a gusto. È il gradino che costa più caro saltare, e lo dico
con cognizione di causa: in uno dei miei sistemi sono partito con file JSON e quando ho misurato è
risultato che avrebbe generato 3,4 milioni di righe all'anno; cambiare l'interfaccia dopo è
costato un'intera tappa di reingegnerizzazione [Ref. 15](../REFERENCIAS.md#ref-15).

C'è un punto chiave che vale la pena tenere presente: **ci sono dati che solo il business ha**
(quante entità, quanti eventi per entità, quanti operatori nel picco, quanto bisogna conservare) e
il modello non li può inferire. Ciò che può inferire è il derivato. Per questo il prompt gli esige
di valutare se i dati primari sono completi e di chiedere quelli che mancano, invece di stimarli
con la faccia sicura. Chi sa cosa gli manca per calcolare è il modello, non un modulo da compilare.

E una seconda idea che voglio che tu porti via: le **decisioni asimmetriche**. Ci sono decisioni
che costano pochissimo se le prendi e risultano inutili, e moltissimo se non le prendi e risultano
necessarie. L'interfaccia di persistenza asincrona dalla riga uno è l'esempio canonico: se il
motore finisce per essere sincrono, è avanzato un `await`; se finisce per essere asincrono e non
l'hai previsto, bisogna riscrivere tutto. Quelle decisioni prendile sempre quando sono economiche,
anche se oggi non servono.

## 1. Contesto richiesto

Quello che segue è la lista generica. I file concreti che devi avere pronti prima di ogni
prompt, con il loro contenuto e il loro stato minimo, stanno nella sezione 2, nel blocco "Prima di
inviare il prompt" che precede ciascuno.

- **Rilevazione dei dati di volumetria** del business, nominata così in forma generica: entità
  principali e loro crescita, eventi per entità, operatori simultanei e orario del picco, tempo di
  conservazione dei dati, carichi eccezionali (campagne, chiusure), crescita attesa. La rilevazione
  è per natura incompleta; l'agente valuta e chiede.
- Se c'è un sistema precedente: accesso in lettura al suo database per ricavare numeri reali
  invece di stime.
- `PROJECT.md` e l'albero semantico (gradino 2): le entità dell'albero sono quelle da
  dimensionare.

## 2. Prompt

**Iniziale:**

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business con te), non
l'agente:

- `docs/VOLUME_SURVEY.md`: la rilevazione di volumetria, scritta con il proprietario del dominio
  (o con te stesso, se il progetto è tuo). Per ogni entità principale dell'albero semantico:
  quante ce ne sono oggi, quante se ne aggiungono al mese, quanti eventi genera ciascuna (un
  appuntamento genera tre messaggi; un'autorizzazione genera tante consultazioni); quante persone
  operano nel picco e a che ora è il picco; quanto tempo si conservano i dati; quali carichi
  eccezionali ci sono (campagne, chiusure di mese, il lunedì dopo un festivo); quale crescita si
  aspettano e se il sistema si potrebbe vendere ad altri. E la cosa più importante: per ogni
  numero, da dove viene ("l'ha detto la responsabile", "contato nel quaderno di settembre",
  "supposto"). Le supposizioni si marcano come supposizioni; non si travestono da dato.
- `PROJECT.md` e `docs/SEMANTIC_TREE.md` (gradino 2), chiusi: le entità da dimensionare sono
  quelle dell'albero.
- Se c'è un sistema precedente con database: un accesso in sola lettura perché l'agente ricavi
  numeri reali invece di stime, con la stringa di connessione conservata fuori dal repository e il
  nome della variabile annotato nella rilevazione.
- Stato minimo accettabile: ogni entità dell'albero ha almeno un numero con la sua fonte, anche se
  diversi dicono "supposto". L'agente ti chiederà le supposizioni; quella richiesta è il gradino
  che funziona.

> Before proposing any architecture we are going to size the system. Read `PROJECT.md` and the
> volume survey in `docs/VOLUME_SURVEY.md`. Distinguish primary data (facts only the business
> knows) from derived data (what can be computed from the primary data). Evaluate whether the
> primary data is complete enough to compute what follows; if any primary figure is missing, or
> is marked as an assumption, ask me for all the missing figures before going on. Never estimate
> a primary figure. If a previous system can be queried, use its real numbers and state where
> each came from. With the primary data complete, compute, showing the arithmetic: rows per year
> for the three largest tables, peak concurrency, data size at five years, and what breaks first
> if everything is multiplied by ten. Then present three options for persistence and concurrency,
> each with the cost of migrating to the others later. Do not choose: I choose. Do not write code.
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
> Prima di proporre qualunque architettura dimensioneremo il sistema. Leggi `PROJECT.md` e la
> rilevazione di volumetria in `docs/VOLUME_SURVEY.md`. Distingui i dati primari (fatti che solo
> il business conosce) dai derivati (ciò che si può calcolare a partire dai primari). Valuta se i
> dati primari sono abbastanza completi per calcolare ciò che segue; se manca qualche dato
> primario, o è marcato come supposizione, chiedimi tutti quelli che mancano prima di proseguire.
> Non stimare mai un dato primario. Se si può interrogare un sistema precedente, usa i suoi numeri
> reali e di' da dove viene ciascuno. Con i primari completi, calcola, mostrando il conto: righe
> all'anno delle tre tabelle più grandi, concorrenza nel picco, dimensione dei dati a cinque anni,
> e cosa si rompe per primo se tutto si moltiplica per dieci. Poi presenta tre opzioni di
> persistenza e concorrenza, ciascuna con il costo di migrare alle altre più avanti. Non scegliere:
> scelgo io. Non scrivere codice.
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

Cosa gli sto chiedendo, clausola per clausola: distinguere primari da derivati (è la distinzione
che evita l'invenzione); **chiedere i primari che mancano e non stimarli mai**; usare numeri reali
del sistema precedente quando esiste, con la loro fonte; calcolare il derivato con il conto in
vista, perché tu possa rifarlo; lo scenario "per dieci", che è ciò che rivela cosa si rompe per
primo; tre opzioni con il costo di migrare tra di esse, perché la decisione non è solo "quale" ma
"quanto costa sbagliare"; e che non scelga né scriva codice, perché questo gradino è di decisione,
non di costruzione.

**Di chiusura:**

**Prima di inviare il prompt**, devi avere questo a portata di mano:

- Le tre opzioni che l'agente ha presentato, lette, e almeno un conto rifatto a mano da te (righe
  all'anno della tabella più grande, per esempio): ti deve dare lo stesso risultato.
- I dati primari che ti ha chiesto, procurati davvero (nel quaderno, chiedendolo al proprietario)
  e dati nella chat; nessuno stimato da te per cavartela.
- La tua scelta, con la lettera dell'opzione e una ragione di una riga, decisa da te e, se c'è un
  proprietario, con lui.
- Stato minimo accettabile: il conto rifatto coincide, le supposizioni si sono convertite in dati
  con fonte, e l'opzione è scelta. Se il conto non coincide, non chiudere: chiedi.

> I choose option [B]. Record in `docs/SIZING.md`: the primary data with its source, the derived
> data with its arithmetic, the three options, the chosen one and why, and the decisions we are
> taking "just in case" even though they are not needed today (for example: the persistence
> interface is asynchronous from line one, even if the first engine is synchronous). Include the
> questions you asked and my answers.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [it]
> Scelgo l'opzione [B]. Registra in `docs/SIZING.md`: i dati primari con la loro fonte, i derivati
> con il loro conto, le tre opzioni, quella scelta e perché, e le decisioni che prendiamo "per
> sicurezza" anche se oggi non servono (per esempio: l'interfaccia di persistenza è asincrona dalla
> riga uno, anche se il primo motore è sincrono). Includi le domande che hai fatto e le mie
> risposte.
>
> Quando hai bisogno di una decisione da parte mia, chiedila con le quattro parti della UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e in questo ordine: i dati che rendono necessaria la domanda,
> elencati; un paragrafo di non più di cinque righe che li colleghi e lasci vedere
> l'interrogativo; la domanda con le sue possibili risposte numerate; e la tua raccomandazione.
> Dillo alla profondità tecnica che il progetto ha dichiarato in `communication_depth`
> —`beginner`, `decision_maker` o `technical`—; se il progetto non ne ha dichiarata nessuna, usa
> `decision_maker`.

Cosa gli sto chiedendo: il registro completo, con fonti e conti; quella scelta e la ragione; e le
decisioni asimmetriche scritte, perché se restano implicite non si rispettano.

## 3. Risultato atteso

Un file `docs/SIZING.md` con:

- Data e chi ha deciso.
- Tabella dei dati primari: valore, fonte (riferito dal business / misurato nel sistema
  precedente), data. Nessuno con fonte "supposizione".
- Tabella dei dati derivati: valore, da quali primari viene, il conto.
- Lo scenario "per dieci": cosa si rompe per primo.
- Le tre opzioni numerate, con il costo di migrare tra di esse.
- Quella scelta e la ragione, in una o due frasi.
- Le decisioni asimmetriche, elencate.
- Le domande che l'agente ha fatto e le risposte.

## 4. Verifica di completezza

- C'è qualche dato primario con fonte "supposizione" o senza fonte? Se c'è, il gradino non è
  salito: l'agente doveva chiederlo.
- Ogni dato derivato mostra da quali primari viene e con quale conto? Puoi rifare un conto a mano
  e ti torna?
- Ci sono tre opzioni e una scelta con ragione scritta?
- Dice cosa succede se la volumetria si moltiplica per dieci?
- Le decisioni asimmetriche sono scritte, o sono rimaste implicite?
- L'agente ha chiesto? Se ha presentato numeri senza aver fatto una sola domanda, diffida.

## 5. Segnali d'allarme

- I tre scenari delle opzioni portano alla stessa conclusione. L'agente aveva già scelto e ha
  montato le altre due per adempiere.
- Un numero derivato ha più precisione dei primari da cui viene ("1.234.567 righe" a partire da
  "circa 5.000 famiglie"). La precisione è falsa.
- Lo scenario "per dieci" dice "non succede niente". Succede sempre qualcosa; se non l'ha trovato,
  non l'ha cercato.
