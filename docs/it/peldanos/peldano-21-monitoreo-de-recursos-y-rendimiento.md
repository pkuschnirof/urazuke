# Passo 21 — Monitoraggio di risorse, funzioni e query fuori range, con rapporto ciclico (contratto del gradino)

**Fase:** esercizio.
**Quando:** si monta nella fase di esercizio, con il primo deployment in produzione, con le
soglie del 19 e le metriche del 16; da allora gira da solo, e il rapporto
ciclico si legge con il proprietario a ogni ciclo (settimanale in un sistema con conseguenze,
mensile in uno piccolo). Ogni evento fuori range entra nel ciclo come voce in sospeso correttiva.
In un legacy, uguale, con una differenza: la prima lettura del rapporto è la linea base, e ciò
che era già fuori range il primo giorno diventa voci in sospeso con la loro marca di velocità.
**Forma:** un solo invio per montare; poi, routine ciclica.
**Dimensione:** minimo in un progetto piccolo (un rapporto mensile, un'allerta sul disco e una
sugli errori del database); completo in uno con conseguenze (soglie per funzione e per query,
allerte, rapporto settimanale).

## A cosa serve

Le prove del gradino 19 dicono come si comporta il sistema un giorno, con un carico che ho scelto
io. La produzione è tutti i giorni, con il carico che scelgono gli utenti, con i dati che
crescono, e con modifiche che entrano ogni settimana. Ciò che era in range a ottobre esce dal
range a marzo senza che nessuno cambi nulla, solo perché la tabella è cresciuta. Questo gradino
esiste perché quella cosa si veda **prima che la veda l'utente**: l'uso delle risorse contro la
capacità, il tempo di risposta di ogni funzione, ogni punto di ingresso, ogni processo e ogni
query, confrontato con le soglie del 19 e con la propria storia; un'allerta quando qualcosa esce
dal range; e un rapporto ciclico che io leggo con il proprietario, dove ogni scostamento ha una
causa o una voce in sospeso. Il tetto stretto a ciò che era stato misurato
[Ref. 37](../REFERENCIAS.md#ref-37) è l'idea di fondo: il range non è un'opinione, è il numero
misurato più un margine; e la quota di integrazione continua che si è bruciata senza che nessuno
guardasse [Ref. 39](../REFERENCIAS.md#ref-39) è il fallimento che evita: una risorsa che si consuma
senza monitoraggio si scopre quando finisce.

Due regole che non negozio. Un'allerta che scatta e nessuno legge è un difetto dell'allerta, non
di chi non l'ha letta: si aggiusta o si elimina. E una soglia non si alza per far tacere
un'allerta senza una ragione misurata e scritta.

**Se sei alle prime armi.** *Monitorare* è guardare il sistema tutto il tempo a macchina e
avvisare quando qualcosa esce dal normale. Le *risorse* sono ciò che il sistema consuma:
processore, memoria, disco, connessioni al database, e anche le quote di servizi esterni (quanti
messaggi al mese ti lascia mandare il provider). "*Fuori range*" vuol dire sopra una *soglia* (un
limite fisso, uscito dalle prove del gradino 19) o molto diverso dalla *linea base* (ciò che
quello stesso numero dava negli ultimi giorni). Un'*allerta* è l'avviso sul momento; il *rapporto
ciclico* è il riassunto che si legge ogni settimana o ogni mese con calma.

## 1. Contesto richiesto

Quello che segue è la lista generica. I file concreti che devi avere pronti prima di ogni prompt,
con il loro contenuto e il loro stato minimo, stanno nella sezione 2, nel blocco "Prima di
inviare il prompt" che precede ciascuno.

- L'osservabilità (16): le metriche e i registri di cui si alimenta.
- Le soglie del 19 e i budget del 17.
- La produzione distribuita (15), con accesso in sola lettura per il monitoraggio.
- Il canale delle allerte e il ciclo del rapporto: li decidi tu con il proprietario.

## 2. Prompt

**Iniziale (montare e dimostrare):**

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business con te), non
l'agente:

- `docs/OBSERVABILITY.md` (16) e `docs/PERFORMANCE.md` (19) chiusi: le metriche e le soglie.
- `docs/PERSISTENCE.md` (17) con i budget per percorso.
- Il canale delle allerte, deciso con il proprietario: a chi arriva, da dove (email, messaggistica),
  e chi la legge a che ora. Un'allerta che arriva in una casella che nessuno apre è decorazione.
- Il ciclo del rapporto: settimanale o mensile, e chi lo legge con te.
- Accesso in sola lettura del monitoraggio alla produzione (il server, il database, i registri),
  con la credenziale fuori dalla chat.
- La percentuale di scostamento sulla linea base che consideri un allarme (per esempio, 30 % in
  più della media degli ultimi quattordici giorni), per il buco del prompt.
- Stato minimo accettabile: ci sono soglie scritte, un canale con una persona che lo legge, e un
  ciclo.

> We are going to keep this system watched in production. Using the metrics and logs of step 16, the
> budgets of `docs/PERSISTENCE.md` and the thresholds of `docs/PERFORMANCE.md`, set up: (1)
> collection of resource usage (CPU, memory, disk, database connections, queue sizes, external
> quotas) and of the response time of every function, endpoint, job and query, with the correlation
> id, kept with a history; (2) alerts when any of them is out of range: above the thresholds, or
> more than [X] percent over the baseline of the last [N] days, sent to [channel], with the rule
> that an alert that fires without a human reading it is a defect of the alert and gets fixed or
> removed; (3) a cyclic report, [weekly], generated automatically, with: resource usage against
> capacity and its trend, the slowest functions and queries and how they moved against the previous
> period, every out-of-range event with its cause if known, and what you propose for each; (4) the
> rule that every out-of-range event becomes a corrective pending item with the measured number as
> its acceptance criterion, closed with the full routine. Nothing here may read or store personal
> data. Show me the first report generated on real data from the test environment, and one alert
> fired on purpose by exceeding a threshold. The row counts that revalidate the sizing carry their
> own verifiable window: the first and the last timestamp read from the database or the log, never a
> number typed by hand; a window typed by hand is marked as such in the report and only warns, it
> never opens a pending item on its own. Document the thresholds, the channel, the cycle and how to
> silence an alert with a written reason in `docs/MONITORING.md`. Reply in my language.

> [it]
> Terremo questo sistema sorvegliato in produzione. Usando le metriche e i log del gradino 16, i
> budget di `docs/PERSISTENCE.md` e le soglie di `docs/PERFORMANCE.md`, predisponi: (1) la
> raccolta dell'uso delle risorse (CPU, memoria, disco, connessioni al database, dimensione delle
> code, quote esterne) e del tempo di risposta di ogni funzione, endpoint, processo e query, con
> l'identificatore di correlazione, conservata con la sua storia; (2) allerte quando una qualsiasi
> di esse è fuori range: sopra le soglie, o più del [X] per cento sopra la linea base degli ultimi
> [N] giorni, inviate a [canale], con la regola che un'allerta che scatta senza che un umano la
> legga è un difetto dell'allerta e si aggiusta o si elimina; (3) un rapporto ciclico,
> [settimanale], generato automaticamente, con: uso delle risorse contro capacità e la sua
> tendenza, le funzioni e le query più lente e come si sono mosse rispetto al periodo precedente,
> ogni evento fuori range con la sua causa se nota, e cosa proponi per ciascuno; (4) la regola che
> ogni evento fuori range diventa una voce in sospeso correttiva con il numero misurato come suo
> criterio di accettazione, chiusa con la routine completa. Niente di tutto questo può leggere o
> conservare dati personali. Mostrami il primo rapporto generato su dati reali dell'ambiente di
> test, e un'allerta fatta scattare apposta superando una soglia. Documenta le soglie, il canale,
> il ciclo e come silenziare un'allerta con una ragione scritta in `docs/MONITORING.md`. Rispondi
> nella mia lingua.
> I conteggi di righe che riconvalidano il dimensionamento portano la propria finestra verificabile: la prima e l'ultima data lette dal database o dal log, mai un numero scritto a mano; una finestra scritta a mano è segnata come tale nel report e si limita ad avvisare, non apre mai da sola un elemento in sospeso.

**La finestra della misurazione.** Il report ciclico confronta le righe osservate per anno con quanto dichiarato al gradino 3. Un numero corretto con una finestra sbagliata apre un elemento in sospeso falso: nella pratica Turnera ereditata, 30.000 righe di tre anni passate come se fossero di uno. Per questo la misurazione porta la sua finestra **verificabile**: il primo e l'ultimo record letti dal database o dal log, non un numero scritto a mano. Se lo strumento non può leggere il database, lo dichiara come punto cieco; una finestra scritta a mano è segnata come tale nel report e si limita ad avvisare, non apre mai da sola un elemento in sospeso. (Decisione D-039.)

Cosa gli sto chiedendo: raccolta con storia (senza storia non c'è linea base, e senza linea base
non c'è "fuori range"); allerte contro due riferimenti, la soglia assoluta del 19 e lo
scostamento relativo sulla propria storia; il rapporto ciclico con la forma di un rapporto del
gradino 12 (ogni scostamento con causa o con proposta, niente "tutto normale"); la conversione di
ogni scostamento in voce in sospeso con numero; e le due dimostrazioni: il primo rapporto e
un'allerta provocata.

**Routine di ogni ciclo (va nel patto di convivenza):**

**Prima di inviare il prompt**, devi avere questo sottomano:

- Il rapporto ciclico appena generato, e un po' di tempo tuo con il proprietario per leggerlo.
- `docs/MONITORING.md` sottomano, per confrontare le soglie.
- Stato minimo accettabile: hai letto il rapporto prima di incollare il prompt; l'agente non lo
  legge al posto tuo.

> With every cyclic report of resources and performance: go through it with me, event by event;
> tell me which out-of-range events become pending items now and which can wait, with your
> reason; write the decision with the date in the report itself; and tell me whether any threshold
> must change and why, with the measurement that justifies it. Never raise a threshold to silence
> an alert without a measured reason written down.

> [it]
> Con ogni rapporto ciclico di risorse e rendimento: percorrilo con me, evento per evento; dimmi
> quali eventi fuori range diventano voci in sospeso adesso e quali possono aspettare, con la tua
> ragione; scrivi la decisione con la data nel rapporto stesso; e dimmi se qualche soglia deve
> cambiare e perché, con la misurazione che lo giustifica. Non alzare mai una soglia per
> silenziare un'allerta senza una ragione misurata e scritta.

Cosa gli sto chiedendo: che il rapporto si legga e si decida, con una traccia; e la regola della
soglia, che è quella che evita che il monitoraggio diventi silenzioso un po' alla volta.

## 3. Risultato atteso

- Raccolta di risorse e tempi di risposta con storia, senza dati personali.
- Allerte per soglia e per scostamento, a un canale che una persona legge.
- Il rapporto ciclico, generato da solo, con ogni scostamento con causa o proposta.
- `docs/MONITORING.md` con soglie, canale, ciclo e come silenziare con una ragione.
- La routine nel patto; gli scostamenti come voci in sospeso correttive.

## 4. Verifica di completezza

- Chiedi che si superi una soglia apposta in test: ti è arrivata l'allerta, dal canale
  concordato, con l'identificatore?
- Leggi l'ultimo rapporto: ogni evento fuori range ha una causa o una proposta? Qualcuno è rimasto
  senza niente?
- C'è una voce in sospeso per ogni scostamento che hai deciso di affrontare, con il numero come
  criterio?
- Qualche soglia è salita dal 19? Con quale ragione scritta?
- Il rapporto menziona la quota dei servizi esterni (messaggistica, integrazione continua)?

## 5. Segnali d'allarme

- Le allerte scattano tutti i giorni e nessuno le legge. Bisogna abbassarne il numero finché
  ciascuna non significhi qualcosa, non abituarsi.
- Il rapporto dice "tutto normale" per tre cicli di fila. O il sistema non ha utenti, o il
  rapporto non guarda ciò che conta.
- Una soglia è salita "perché smetta di avvisare". È il gradino 21 che muore in silenzio.
- Il monitoraggio conserva dati personali "per poter diagnosticare". È una fuga di dati con
  orario.
