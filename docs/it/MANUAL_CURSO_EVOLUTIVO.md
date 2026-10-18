# Urazuke — il corso, parte 2: il progetto ereditato. Normalizzare un sistema che non è nato con il metodo, e poi farlo evolvere

Autore: Pablo Kuschniroff, assistito da Claude Code. Versione 1, 18 ottobre 2026. Questa è la
seconda parte del [manuale del corso](MANUAL_CURSO.md): dà per scontato che tu abbia fatto la
prima, o almeno che tu abbia letto le lezioni da 0 a 7, perché qui non torno a spiegare cos'è una
voce in sospeso, un test in rosso o un albero semantico. Il metodo di questa parte sta nella
pagina del [percorso evolutivo-correttivo](EVOLUTIVO_CORRECTIVO.md); qui c'è la pratica, con un
secondo progetto guida. Le parole strane, nel glossario del documento principale; i casi reali,
nelle [referenze](REFERENCIAS.md). Repository pubblico:
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## Prima di cominciare

### Per chi è questa parte

Per chi ha fatto la prima parte e ha scoperto che, nella vita reale, quasi mai gli danno una
cartella vuota. Gli danno un sistema che gira già, con utenti che ne dipendono, e gli chiedono
"sistema questo" oppure "aggiungici quello". E anche per chi ha "vibecodato" qualcosa qualche mese
fa, ha funzionato, e adesso deve continuare a costruirci sopra senza che gli crolli. Sono tutti e
due nello stesso posto: con un legacy, anche se uno dei due l'ha scritto lui.

### Cosa avrai alla fine

Lo stesso sistema che hai ereditato, che fa le stesse cose che faceva, ma con tutto ciò che il
metodo dà per scontato attorno: un patto di convivenza con le regole del legacy, la mappa
recuperata del sistema con le marche di dove è uscita ogni affermazione, la lista delle
discrepanze fra ciò che il codice fa e ciò che il business crede, un audit trasformato in backlog
con le marche di velocità, un ambiente di test con dati anonimizzati, un deployment che si ripete,
i segreti fuori dal codice e ruotati, una batteria di caratterizzazione che sorveglia i flussi
critici, lucchetti su ciò che già agisce sul mondo, il dimensionamento con numeri misurati, e un
backlog dove il debito e la richiesta del cliente convivono, abbinati per modulo. E poi, il primo
bug corretto con il suo test in rosso e la prima funzionalità nuova costruita con il metodo
completo.

### Il calendario di questa parte

| Settimana | Lezioni | Cosa fai oltre alle lezioni |
|---|---|---|
| 1 | N0, N1, N2, N3 | **Lettura.** Nulla si cambia. Percorri l'albero recuperato con il proprietario, decidi le discrepanze una per una, leggi l'audit. Alla chiusura: la mappa e l'inventario del debito. |
| 2 | N4, N5 | **La cintura.** Ambiente di test con dati anonimizzati, deployment due volte, segreti ruotati, batteria di caratterizzazione con il suo rosso per mutazione. Lucchetti confermati su ciò che già agisce. Alla chiusura: il sistema gira in test e la batteria è in verde. |
| 3 | N6, N7, R1 | **Misurare, ordinare, correggere.** Dimensionamento misurato. Il backlog con le due marche. Il primo blocco: il bug noto, chiuso in modalità correttiva con i suoi abbinati. |
| 4 | R2 | **Evolvere.** Il secondo blocco: la funzionalità nuova, costruita con il metodo completo (lezioni da 5 a 10 della prima parte), con la caratterizzazione come regressione. |
| 5 e 6 | 11, 12, 13, 14, 15 della prima parte | **Uscita ed esercizio.** Audit periodico, lucchetti restanti, chiusura della catena verso la produzione, i tre manuali (che il legacy non aveva), agente residente, retrospettiva con la domanda propria del legacy: quanto è costato normalizzare. |

### Il progetto guida: "Turnera ereditata"

È lo stesso ambulatorio della prima parte, due anni dopo e su un'altra linea del tempo: Turnera
non l'hanno mai fatta con il metodo. Al suo posto, il nipote della responsabile gli ha fatto in
un'estate un'applicazione web, "Turnos", che funziona da allora. Oggi ha due receptionist e tre
professionisti che la usano tutti i giorni, circa ventimila appuntamenti caricati, e nessuno che
la capisca per intero: il nipote è andato a vivere all'estero e risponde a un messaggio ogni due
settimane.

**Cosa c'è.** Un repository su GitHub con il codice (un solo ramo, commit con messaggi tipo
"sistemazioni"), un database sullo stesso server dove gira l'applicazione, il deployment a mano
copiando i file via FTP, la password del database scritta nel codice, nessun test, un processo
pianificato sul server che manda i promemoria tutte le notti, e un foglio di calcolo che la
responsabile scarica ogni mese collegandosi al database con uno strumento da scrivania. C'è una
copia di backup "automatica" che nessuno ha mai ripristinato.

**Cosa fa male.** Due cose. La prima, un bug: a volte un paziente riceve il promemoria due volte,
e a volte nessuno; la responsabile non sa quando succede, ma ha gli screenshot di pazienti che si
lamentano. La seconda, ciò che manca: vogliono chiedere una caparra con un link di pagamento per
certi appuntamenti, e vogliono vedere quanti appuntamenti, assenze e cancellazioni ci sono stati
nel mese senza scaricare il foglio.

**Il proprietario.** La stessa responsabile: criterio sull'attività, quindici minuti al giorno,
non legge codice. E una novità che conta: lei crede che il sistema faccia cose che non fa, e non
sa di cose che il sistema invece fa. È normale in un legacy, ed è ciò che la lezione N2 porterà
alla luce.

**I flussi critici**, con le sue parole: "carico un appuntamento", "cancello un appuntamento",
"gli arriva il promemoria", "cerco un paziente", "scarico il foglio del mese". Sono cinque;
saranno la batteria di caratterizzazione.

Con questo basta. Tutto il resto è nel sistema, ed è l'agente che lo leggerà.

---

## Tratto di normalizzazione: lezioni da N0 a N7

Queste otto lezioni sono il tratto che la prima parte non aveva. Le prime quattro sono di lettura:
non si cambia nulla, e la tentazione di cambiare qualcosa sarà enorme. Le due successive
costruiscono la cintura. Le ultime due misurano e ordinano. Solo dopo si tocca la funzionalità.

### Lezione N0 — Idoneità di un sistema esistente

**Cosa devi capire.** I due criteri escludenti sono gli stessi della lezione 0, ma qui X2
(schermate operabili da programma) si risponde schermata per schermata, e se qualcuna è in rosso
non è un motivo per non cominciare: è la prima voce in sospeso, e blocca. Si aggiungono quattro
criteri propri del legacy: se c'è qualcuno che sappia come funziona, se la produzione si può
consultare in sola lettura, se esiste qualche test, e se il backup è stato ripristinato qualche
volta. L'ultimo è quello che quasi tutti scoprono essere in rosso.

**Prima di inviare il prompt**, con le tue mani:

- `docs/INITIAL_SURVEY.md`, breve: cosa fa Turnos e per chi secondo la responsabile, cosa fa male
  (il promemoria doppio, ciò che manca), chi l'ha fatto e quanto ci mette a rispondere, dove gira,
  chi ha accesso, e che c'è un backup "automatico" che nessuno ha mai ripristinato. Mezza pagina.
- `docs/ELIGIBILITY_CRITERIA.md`: la scheda della lezione 0 con quattro righe in più: qualcuno che
  sappia, produzione consultabile, test esistenti, backup ripristinato. Colonne vuote.
- Accesso in lettura al repository per l'agente e, se riesci a ottenerla, una credenziale di sola
  lettura al database, fuori dalla chat.

1. Incollagli:

> We are going to assess whether this existing system can be taken over with the Urazuke method.
> Read the initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`, which for an existing system adds four criteria: whether anyone
> who knows how the system works is available; whether production can be queried read-only;
> whether any automated test exists; and whether a backup exists and has ever been restored. Then
> explore the repository and, if I gave you access, the environment where it runs: change nothing.
> Fill in the sheet criterion by criterion with the answer, its source (survey, code, database,
> configuration, or inferred) and, for the exclusionary criteria X1 and X2, green or red. For X2,
> list every screen and say for each whether it can be driven by a program today and whether the
> effect can be checked in the backend. If a criterion cannot be answered from what you have, ask
> me; do not assume. Do not decide: present me the completed sheet with your reading and your
> doubts, and I will decide. Reply in my language.

> [it]
> Valuteremo se questo sistema esistente si può prendere in carico con il metodo Urazuke. Leggi la
> rilevazione iniziale in `docs/INITIAL_SURVEY.md` e la scheda dei criteri in
> `docs/ELIGIBILITY_CRITERIA.md`, che per un sistema esistente aggiunge quattro criteri: se è
> disponibile qualcuno che sappia come funziona il sistema; se la produzione si può interrogare in
> sola lettura; se esiste qualche test automatico; e se esiste una copia di backup ed è mai stata
> ripristinata. Poi esplora il repository e, se ti ho dato accesso, l'ambiente dove gira: non
> cambiare nulla. Compila la scheda criterio per criterio con la risposta, la sua fonte
> (rilevazione, codice, database, configurazione, o dedotto) e, per i criteri escludenti X1 e X2,
> verde o rosso. Per X2, elenca ogni schermata e di' per ciascuna se oggi si può operare da
> programma e se l'effetto si può verificare nel backend. Se a un criterio non si può rispondere
> con ciò che hai, chiedimelo; non supporre. Non decidere: presentami la scheda completa con la
> tua lettura e i tuoi dubbi, e decido io. Rispondi nella mia lingua.

   Gli stai chiedendo la stessa cosa della lezione 0, più tre: che esplori senza cambiare nulla,
   che ogni risposta dica da dove è uscita, e che X2 si misuri schermata per schermata.

2. Rispondi alle sue domande e leggi la scheda. Guarda soprattutto la riga di ogni schermata in
   X2.
3. Decidi.

**Prima di inviare il prompt** di chiusura: la tua decisione in una riga, e una condizione che in
questo progetto è obbligatoria: ripristinare il backup sulla tua macchina prima della lezione N4.

4. Incollagli il prompt di chiusura:

> Decision: [go under this condition: the backup is restored at least once before N4]. Write the
> final sheet to `docs/ELIGIBILITY.md` with the date, who decided, every answer with its source,
> and the conditions if any. If X2 is red for any screen, create `docs/PENDING.md` and open the
> first pending item: make every screen drivable by a program with its backend effect checkable;
> mark it as blocking. Include the questions you asked and my answers.

> [it]
> Decisione: [va con questa condizione: il backup si ripristina almeno una volta prima di N4].
> Scrivi la scheda finale in `docs/ELIGIBILITY.md` con la data, chi ha deciso, ogni risposta con
> la sua fonte, e le condizioni se ci sono. Se X2 è in rosso per qualche schermata, crea
> `docs/PENDING.md` e apri la prima voce in sospeso: fare in modo che ogni schermata si possa
> operare da programma con il suo effetto verificabile nel backend; marcala come bloccante.
> Includi le domande che hai fatto e le mie risposte.

**Verifica di completezza.** X2 ha una risposta per schermata? I quattro criteri del legacy hanno
risposta con la fonte? Il backup è rimasto come condizione con una data?

**Consegna.** `docs/ELIGIBILITY.md`, e se serve la prima voce in sospeso bloccante.

**Errori tipici.** Rispondere X2 in verde "perché è web". E saltare la condizione del backup
perché "ce n'è uno automatico": nella lezione N4 l'agente copierà il database di produzione, e se
qualcosa va storto, quel backup che nessuno ha provato è l'unica cosa che c'è.

**Nel progetto guida.** L'agente scopre che delle sei schermate di Turnos, quattro si possono
operare da programma e due no (il modulo dell'appuntamento usa un calendario senza identificatori,
e la ricerca dei pazienti è un campo che non risponde agli eventi di tastiera); apre la voce in
sospeso bloccante. Trova il processo pianificato dei promemoria, che la responsabile non aveva
menzionato. C'è un backup, mai ripristinato: condizione. Sul nipote: "disponibile, ogni due
settimane", che l'agente propone di leggere come "non disponibile", e ha ragione. Va, con una
condizione.

### Lezione N1 — Il patto di convivenza per un legacy

**Cosa devi capire.** Alle sei regole della lezione 1 se ne aggiungono cinque che esistono perché
un modello di fronte a codice altrui fa tre cose per riflesso: lo riordina, lo "sistema" dove gli
sembra sbagliato, e dà per scontato che ciò che il codice fa in modo diverso da come lui se lo
aspetterebbe sia un errore. Le regole del legacy bloccano quei riflessi: non si rifattorizza ciò
che non è stato chiesto, si legge prima di toccare, ciò che è strano si annota invece di
sistemarlo, il comportamento attuale è la specifica finché il proprietario non dice altro, e nulla
entra senza la caratterizzazione in verde.

**Prima di inviare il prompt**, con le tue mani:

- Le tue preferenze di lavoro, come nella lezione 1, e una decisione in più: quanto rischio
  accetti mentre si normalizza. Per il corso: l'agente può distribuire all'ambiente di test da
  solo; in produzione, mai, fino alla lezione 13.
- `docs/ELIGIBILITY.md` chiuso.

1. Incollagli:

> Before we touch anything, we are going to set the working agreement between you and me for a
> system that already exists and has users. Write `docs/WORKING_AGREEMENT.md` with the six rules
> of the method (my time is sacred; zero technical debt; exact scope; documentation in the same
> commit; never report as done what you have not verified; speak my language), each with one line
> explaining what it prevents, and these five rules for an inherited system: (7) Nothing is
> refactored that was not asked for, and no module is rewritten. (8) Code you do not understand
> is read before it is touched, and what you learn goes into the system map. (9) Anything strange
> you find (a secret in the code, a dead path, a duplicated rule, a query without an index) is
> logged as a pending item with its evidence, never fixed in passing. (10) Current behaviour is
> the specification until the owner says otherwise: a difference between what the code does and
> what the business says is a discrepancy for me to decide, not a bug for you to fix silently.
> (11) No change reaches the test environment without the characterization suite green. Add any
> rules you think this system needs, marked as proposals. If you need to know something about how
> I work in order to write this, ask me.

> [it]
> Prima di toccare qualunque cosa, fisseremo il patto di convivenza fra te e me per un sistema che
> esiste già e ha utenti. Scrivi `docs/WORKING_AGREEMENT.md` con le sei regole del metodo (il mio
> tempo è sacro; zero debito tecnico; ambito esatto; documentazione nello stesso commit; non
> riportare mai come fatto ciò che non hai verificato; parla la mia lingua), ciascuna con una riga
> che spieghi cosa evita, e queste cinque regole per un sistema ereditato: (7) Non si rifattorizza
> nulla che non sia stato chiesto, e non si riscrive nessun modulo. (8) Il codice che non capisci
> si legge prima di toccarlo, e ciò che impari va nella mappa del sistema. (9) Qualunque cosa
> strana tu trovi (un segreto nel codice, un percorso morto, una regola duplicata, una query senza
> indice) si annota come voce in sospeso con la sua prova, non si sistema mai di sfuggita. (10) Il
> comportamento attuale è la specifica finché il proprietario non dice altro: una differenza fra
> ciò che il codice fa e ciò che il business dice è una discrepanza che decido io, non un bug che
> tu sistemi in silenzio. (11) Nessuna modifica arriva all'ambiente di test senza la batteria di
> caratterizzazione in verde. Aggiungi le regole che credi servano a questo sistema, marcate come
> proposte. Se ti serve sapere qualcosa su come lavoro per scrivere questo, chiedimelo.

2. Leggi le proposte. Se una dice "modernizzare il codice man mano che si tocca", rifiutala con
   una motivazione: è la riscrittura travestita.

**Prima di inviare il prompt** di chiusura: il tuo verdetto su ogni proposta, con una motivazione
di una riga, per gli spazi vuoti del prompt.

3. Chiudi con il prompt di chiusura della lezione 1, senza modifiche.

**Verifica di completezza.** Ci sono tutte e undici le regole, ciascuna con il guasto che evita?
C'è qualche proposta che autorizzi a rifattorizzare o riscrivere?

**Consegna.** `docs/WORKING_AGREEMENT.md` con data e versione.

**Errori tipici.** Accettare una regola di "pulizia progressiva" perché suona ragionevole. Suona
ragionevole ed è il modo in cui l'agente si autorizza a cambiare ciò che non gli è stato chiesto.

**Nel progetto guida.** L'agente propone due regole sue che vale la pena accettare: "in questo
sistema nessun invio reale esce dall'ambiente di test: i promemoria in test vanno a una casella
fittizia", e "il foglio mensile che la responsabile scarica è un consumatore del sistema e conta
come contratto". La seconda è la mappa produttore-consumatore che si affaccia in anticipo, e va
bene così.

### Lezione N2 — La lettura del sistema: la mappa recuperata e le discrepanze

**Cosa devi capire.** È la lezione che dà più valore per ora di lavoro di tutto il corso. Nella
lezione 2 il file di progetto e l'albero uscivano dalla rilevazione; qui escono dal sistema
stesso, e ogni affermazione porta una marca di dove è uscita: `[codice]`, `[base]`,
`[configurazione]`, `[documentazione]`, `[business]` o `[dedotto]`. Le marche sono ciò che ti
permette di verificare senza leggere codice: guardi ciò che è dedotto e lo confermi o lo correggi.
E compare un documento nuovo, la lista delle discrepanze: tutto ciò che non coincide fra ciò che
il codice fa, ciò che il database impone e ciò che il business crede. Non si risolvono da sole:
ciascuna è una tua decisione con la data. Un legacy ha sempre discrepanze; se la lista esce vuota,
l'agente non ha confrontato.

**Prima di inviare il prompt**, con le tue mani e con il proprietario:

- Accesso in lettura per l'agente a tutto: il repository intero, lo schema del database (sola
  lettura, credenziale fuori dalla chat), la configurazione del server con i valori dei segreti
  coperti, i log recenti, e quel che c'è di documentazione (in Turnos, un'email del nipote con
  "come caricare le modifiche").
- In `docs/INITIAL_SURVEY.md`, una sezione nuova scritta con la responsabile: **ciò che lei crede
  che il sistema faccia**, caso d'uso per caso d'uso, e le regole che ricorda ("un appuntamento
  non si può cancellare con meno di due ore", "il promemoria parte alle otto di sera"). Non
  verificarlo contro il sistema: quel confronto è il lavoro dell'agente.
- La lista di ciò che vive fuori dal repository: il processo pianificato dei promemoria e il
  foglio mensile che si collega al database.
- `docs/WORKING_AGREEMENT.md` chiuso.

1. Incollagli:

> We are going to recover the map of this system from what exists. Read the whole repository
> (every branch), the database schema (read-only), the configuration of each environment, the
> recent logs and whatever documentation there is; if some part cannot be read from where you are,
> tell me and mark it as a gap; do not fill it by guessing. Then write three things. First,
> complete `docs/INITIAL_SURVEY.md` in the form the method expects (what the system does and for
> whom; what it does NOT do; who uses it; the technology; the environments; what an error costs),
> with every statement tagged by its source: [code], [database], [configuration], [documentation],
> [business] for what the survey already says, or [inferred]. Second, `PROJECT.md`, three hundred
> lines at most, and `docs/SEMANTIC_TREE.md`: the domains and, under each one, the actors, the
> processes (each with trigger, steps, outcome and exceptions as the code actually implements
> them), the entities with the attributes, states and transitions the database and the code
> enforce, the screens, the external integrations and the scheduled jobs; every node tagged the
> same way. Third, `docs/DISCREPANCIES.md`: everything where the code, the database, the
> documentation and what the business says in the survey do not agree, with the evidence on each
> side. Do not resolve any discrepancy and do not fix anything: list them. Create `docs/STATUS.md`
> for the living state. Reply in my language.

> [it]
> Recupereremo la mappa di questo sistema a partire da ciò che esiste. Leggi il repository intero
> (tutti i rami), lo schema del database (sola lettura), la configurazione di ogni ambiente, i log
> recenti e qualunque documentazione ci sia; se qualche parte non si può leggere da dove sei,
> dimmelo e marcala come lacuna; non riempirla indovinando. Poi scrivi tre cose. Primo, completa
> `docs/INITIAL_SURVEY.md` nella forma che il metodo si aspetta (cosa fa il sistema e per chi;
> cosa NON fa; chi lo usa; la tecnologia; gli ambienti; quanto costa un errore), con ogni
> affermazione marcata dalla sua fonte: [codice], [base], [configurazione], [documentazione],
> [business] per ciò che la rilevazione già dice, o [dedotto]. Secondo, `PROJECT.md`, trecento
> righe al massimo, e `docs/SEMANTIC_TREE.md`: i domini e, sotto ciascuno, gli attori, i processi
> (ognuno con innesco, passi, esito ed eccezioni così come il codice li implementa davvero), le
> entità con gli attributi, gli stati e le transizioni che il database e il codice impongono, le
> schermate, le integrazioni esterne e i processi pianificati; ogni nodo marcato allo stesso modo.
> Terzo, `docs/DISCREPANCIES.md`: tutto ciò in cui il codice, il database, la documentazione e ciò
> che il business dice nella rilevazione non concordano, con la prova di ciascun lato. Non
> risolvere nessuna discrepanza e non sistemare nulla: elencale. Crea `docs/STATUS.md` per lo
> stato vivo. Rispondi nella mia lingua.

   Gli stai chiedendo di leggere tutto e dichiarare ciò che non ha potuto leggere, la rilevazione
   e l'albero con le marche, i processi come il codice li implementa (non come dovrebbero essere),
   i processi pianificati, e le discrepanze elencate senza risolverle.

2. Percorri l'albero con la responsabile, nodo per nodo. Ogni `[dedotto]` si conferma o si
   corregge. Ogni `[codice]` si confronta con ciò che lei crede: dove non coincide, c'è una
   discrepanza che forse l'agente ha già elencato, e se non l'ha elencata, la aggiungi tu.
3. Decidi ogni discrepanza con lei, in una riga, con la data. Ci sono tre risposte possibili: "il
   sistema è a posto, il business se n'era dimenticato" (si conferma come regola), "il sistema è
   sbagliato, bisogna cambiarlo" (si apre una voce in sospeso), oppure "non lo so, lo vediamo
   dopo" (resta aperta con una data; non troppe).

**Prima di inviare il prompt** di chiusura: la lista dei nodi confermati e corretti, e la lista
delle discrepanze con la tua decisione e la data, una riga ciascuna.

4. Chiudi con:

> I confirm these nodes: [list]. Correct these: [list]. The discrepancies are decided as follows:
> [one line each: discrepancy, my decision, today's date]. Finalize `docs/INITIAL_SURVEY.md`,
> `PROJECT.md` and `docs/SEMANTIC_TREE.md` with today's date, keeping the source tags. Write each
> discrepancy decision in `docs/DECISIONS.md` with my exact words, and open a pending item in
> `docs/PENDING.md` for every discrepancy where I decided the system must change; for the ones
> where I decided the current behaviour stays, write it next to the node as a confirmed rule. Add
> to `PROJECT.md` the instruction to read this file, the tree and the working agreement at the
> start of every session.

> [it]
> Confermo questi nodi: [lista]. Correggi questi: [lista]. Le discrepanze si decidono così: [una
> riga ciascuna: discrepanza, la mia decisione, la data di oggi]. Chiudi `docs/INITIAL_SURVEY.md`,
> `PROJECT.md` e `docs/SEMANTIC_TREE.md` con la data di oggi, conservando le marche di origine.
> Scrivi ogni decisione su una discrepanza in `docs/DECISIONS.md` con le mie parole esatte, e apri
> una voce in sospeso in `docs/PENDING.md` per ogni discrepanza in cui ho deciso che il sistema
> deve cambiare; per quelle in cui ho deciso che il comportamento attuale resta, scrivilo accanto
> al nodo come regola confermata. Aggiungi a `PROJECT.md` l'istruzione di leggere questo file,
> l'albero e il patto di convivenza all'inizio di ogni sessione.

5. **La prova di lettura**, come nella lezione 2: sessione nuova, senza contesto, "cosa NON fa
   questo sistema? quale processo gira da solo di notte?". Deve rispondere con la mappa.

**Verifica di completezza.** Ci sono nodi marcati `[dedotto]`? (Se non ce n'è nessuno, l'agente
non distingue ciò che ha letto da ciò che ha supposto.) C'è almeno un processo pianificato
nell'albero? La lista delle discrepanze ha più di zero voci? Ciascuna ha una decisione con la data
o è rimasta aperta di proposito? Le marche sono sopravvissute alla chiusura? Ha superato la prova
di lettura?

**Consegna.** `docs/INITIAL_SURVEY.md` completo con le marche, `PROJECT.md`,
`docs/SEMANTIC_TREE.md`, `docs/DISCREPANCIES.md` deciso, `docs/DECISIONS.md` con le decisioni,
`docs/STATUS.md`.

**Errori tipici.** Risolvere le discrepanze "sistemando il codice perché faccia ciò che la
responsabile dice", senza deciderle una per una: parecchie di quelle discrepanze sono regole che
il business ha dimenticato e il codice ricordava. E lasciare che l'agente cancelli le marche alla
chiusura "perché resti più pulito": un albero senza marche non si può più verificare.

**Nel progetto guida.** L'albero di Turnos ha il dominio Agenda che la responsabile si aspettava,
e due cose che non si aspettava: uno stato dell'appuntamento "riprogrammato" che esiste nel
database e che nessuna schermata mostra `[base]`, e un processo pianificato che, oltre a mandare i
promemoria, cancella gli appuntamenti annullati da più di un anno `[codice]`; la responsabile non
sapeva che venissero cancellati. Le discrepanze tipiche sono otto: la regola delle due ore per
cancellare non esiste nel codice (si cancella sempre); il promemoria parte alle otto secondo lei e
alle sette secondo la configurazione; il telefono del paziente non è obbligatorio nel database
anche se lei crede di sì; e così via. Quella della cancellazione è quella che la sorprende di più,
e la decide in un minuto: "quello non si cancella più". Voce in sospeso.

### Lezione N3 — L'audit come inventario del debito

**Cosa devi capire.** La lezione 11, ma all'inizio invece che alla fine, e con un campo in più per
ogni rilievo: se blocca (va risolto prima di qualunque modifica), se si paga quando si tocca il
modulo, o se può aspettare. Senza quel campo, un legacy sottoposto ad audit ha quaranta rilievi e
nessuno sa da quale cominciare. Cosa blocca lo decidi tu, non l'auditor: in generale, un segreto
esposto, una schermata che non si può operare, un deployment che non si può ripetere, la mancanza
di backup, e ciò che può danneggiare dati o far pagare più del dovuto.

**Prima di inviare il prompt**, con le tue mani:

- Una sessione nuova dell'agente, con un clone pulito e un file di istruzioni che dica "sei un
  auditor; non hai letto e non toccherai questo sistema". Accesso in sola lettura al database e al
  server.
- `PROJECT.md`, `docs/SEMANTIC_TREE.md` e `docs/DISCREPANCIES.md` di N2, perché non riscopra ciò
  che è già scritto.
- Il tuo criterio di cosa blocca, in due righe, per lo spazio vuoto del prompt. Per Turnos:
  segreto esposto, schermata non operabile, deployment non ripetibile, nessun backup provato,
  qualunque cosa cancelli o mandi senza controllo.

1. Incollagli:

> Audit this system for integrity, security, performance, code quality and deployability, as the
> inventory of what must be normalized before and during its evolution. Read-only: change nothing
> except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires access you
> lack (the database, the logs, the server), tell me and mark that part as not audited; do not
> pass it as fine. Go through all of the code, not a sample, and read `docs/SEMANTIC_TREE.md` and
> `docs/DISCREPANCIES.md` first so that you do not report what is already known. For every
> finding: where it is (file and line), the risk, the evidence that proves it (the command, the
> query, the number), its priority (P0 must be fixed now, P1 soon, P2 when possible), and one more
> field: whether it BLOCKS (must be fixed before any change, by my criteria: [an exposed secret, a
> screen that cannot be driven by a program, a deployment that cannot be repeated, no tested
> backup, anything that deletes or sends without control]), whether it is PAID WHEN TOUCHED (fixed
> together with the first change that enters its module), or whether it CAN WAIT. Grade every
> dimension you audited. End with every finding turned into a proposed pending item, blocking
> ones first. Reply in my language.

> [it]
> Fai l'audit di questo sistema su integrità, sicurezza, prestazioni, qualità del codice e
> distribuibilità, come inventario di ciò che va normalizzato prima e durante la sua evoluzione.
> Sola lettura: non cambiare nulla, salvo scrivere il tuo rapporto in `docs/AUDIT_[data].md`. Se
> fare l'audit di qualche parte richiede un accesso che non hai (il database, i log, il server),
> dimmelo e marca quella parte come non sottoposta ad audit; non darla per buona. Percorri tutto
> il codice, non un campione, e leggi prima `docs/SEMANTIC_TREE.md` e `docs/DISCREPANCIES.md` per
> non segnalare ciò che è già noto. Per ogni rilievo: dov'è (file e riga), il rischio, la prova
> che lo dimostra (il comando, la query, il numero), la sua priorità (P0 va risolto subito, P1
> presto, P2 quando si può), e un campo in più: se BLOCCA (va risolto prima di qualunque modifica,
> secondo il mio criterio: [un segreto esposto, una schermata che non si può operare da programma,
> un deployment che non si può ripetere, nessun backup provato, qualunque cosa cancelli o mandi
> senza controllo]), se SI PAGA QUANDO SI TOCCA (si risolve insieme alla prima modifica che entra
> nel suo modulo), oppure se PUÒ ASPETTARE. Dai un voto a ogni dimensione di cui hai fatto
> l'audit. Finisci con ogni rilievo trasformato in una voce in sospeso proposta, prima quelle
> bloccanti. Rispondi nella mia lingua.

2. Leggi il rapporto. Scegli due rilievi e chiedigli la prova. Rivedi le marche di velocità: tu
   puoi alzare o abbassare qualunque marca, con una motivazione.

**Prima di inviare il prompt** di chiusura: il rapporto letto, i due rilievi verificati, e la
sessione del costruttore aperta (la chiusura va al costruttore, non all'auditor).

3. Torna alla sessione del costruttore e incollagli il prompt di chiusura della lezione 11,
   aggiungendogli alla fine: "Each pending item keeps the speed mark of its finding."

**Verifica di completezza.** Dice di cosa non ha potuto fare l'audit? C'è almeno un "blocca"? Ogni
rilievo ha file, riga e prova? I bloccanti sono già voci in sospeso?

**Consegna.** `docs/AUDIT_[data].md` con le marche di velocità, e le voci in sospeso bloccanti
aperte.

**Errori tipici.** Tutto in "può aspettare", per un auditor che non vuole disturbare. Oppure tutto
in "blocca", per un proprietario spaventato: allora non si può mai cominciare nulla. Fra tre e
otto bloccanti è la norma in un sistema piccolo.

**Nel progetto guida.** L'audit di Turnos trova, come bloccanti: la password del database nel
codice (e nella storia di git, quindi bisogna ruotarla, non solo spostarla); il deployment via FTP
senza registro di quale versione giri; il processo pianificato che cancella appuntamenti senza
lucchetto; le due schermate non operabili. Come "si paga quando si tocca": la ricerca dei pazienti
senza indice (modulo pazienti), la query dell'agenda del giorno che fa una query per appuntamento
(modulo agenda), l'invio dei promemoria senza idempotenza (modulo messaggi; è la pista del bug).
Come "può aspettare": una dipendenza vecchia senza vulnerabilità note, e il codice duplicato del
formato della data in tre posti.

### Lezione N4 — La cintura di sicurezza

**Cosa devi capire.** È il cancello duro di questo percorso: finché la cintura non è in verde, non
si cambia una riga di funzionalità. La cintura ha cinque pezzi: un ambiente di test con dati
anonimizzati, un deployment che si ripete, i segreti fuori dal codice e ruotati, l'integrazione
continua che esegue quel che c'è, e la batteria di caratterizzazione. Quest'ultima è la lezione 7
al contrario: il test nasce in verde, perché cattura ciò che il sistema fa oggi, difetti inclusi,
e la prova che serve è che va in rosso quando rompi il flusso di proposito. Senza quel rosso per
mutazione, è un test che passa perché non guarda nulla.

**Prima di inviare il prompt**, con le tue mani e con il proprietario:

- `docs/ENVIRONMENTS_SURVEY.md`, che l'agente ha redatto in N2 con le marche e che tu completi:
  dove girerà l'ambiente di test (per il corso basta un servizio gratuito o un contenitore sulla
  tua macchina), come si distribuisce oggi, dove vivranno i segreti sul server.
- La decisione sull'anonimizzazione con la responsabile: nomi, telefoni, email e documenti dei
  pazienti si sostituiscono con valori falsi; le date e le quantità si conservano. È un obbligo di
  legge, non un dettaglio tecnico.
- La lista dei flussi critici per la caratterizzazione: i cinque della responsabile.
- Il backup ripristinato sulla tua macchina (la condizione di N0). Se non l'hai fatto, fallo
  adesso: l'agente copierà il database di produzione e devi sapere che c'è una strada per tornare
  indietro.
- Accesso dell'agente al server in sola lettura e al posto dell'ambiente di test con la scrittura,
  credenziali fuori dalla chat.

1. Incollagli:

> We are going to build the safety belt around this system before changing anything in it. Read
> the environments survey, `docs/AUDIT_[date].md` and `docs/SEMANTIC_TREE.md`. Evaluate whether you
> have what is needed (read access to the server where it runs and to its database, write access
> to where the test environment will run, the way it is deployed today); if anything is missing,
> ask me before starting. Then set up, without touching any functionality: (1) a test environment
> that runs the system exactly as production does, with a copy of the data where the personal
> fields I listed are anonymized; (2) a reproducible deployment to that environment, run twice,
> showing me that the second run changed nothing; (3) every secret found in the repository or in
> the code moved to the server configuration (environment file or vault), with the list of what
> you moved so that I rotate each one; (4) continuous integration running whatever test suite
> exists today, even if it is a single smoke test, on every push; (5) `docs/GATES.md` with the
> gates of this project, including: nothing reaches the test environment without the
> characterization suite green, and nothing reaches production without the full suite green with
> the exact version. Document all of it in `docs/DEPLOYMENT.md` so that a person can do it by hand
> without you. Take a screenshot of the system running in the test environment and show it to me.
> Reply in my language.

> [it]
> Costruiremo la cintura di sicurezza attorno a questo sistema prima di cambiargli qualunque cosa.
> Leggi la rilevazione degli ambienti, `docs/AUDIT_[data].md` e `docs/SEMANTIC_TREE.md`. Valuta se
> hai ciò che serve (accesso in lettura al server dove gira e al suo database, accesso in
> scrittura al posto dove girerà l'ambiente di test, il modo in cui si distribuisce oggi); se
> manca qualcosa, chiedimelo prima di cominciare. Poi allestisci, senza toccare nessuna
> funzionalità: (1) un ambiente di test che esegua il sistema esattamente come la produzione, con
> una copia dei dati in cui i campi personali che ti ho elencato siano anonimizzati; (2) un
> deployment riproducibile verso quell'ambiente, eseguito due volte, mostrandomi che la seconda
> esecuzione non ha cambiato nulla; (3) ogni segreto trovato nel repository o nel codice spostato
> nella configurazione del server (file di ambiente o cassaforte), con la lista di ciò che hai
> spostato perché io ruoti ciascuno; (4) l'integrazione continua che esegue qualunque batteria di
> test esista oggi, anche se è un solo test di fumo, a ogni push; (5) `docs/GATES.md` con i
> cancelli di questo progetto, inclusi: nulla arriva all'ambiente di test senza la batteria di
> caratterizzazione in verde, e nulla arriva in produzione senza la batteria completa in verde con
> la versione esatta. Documenta tutto in `docs/DEPLOYMENT.md` in modo che una persona possa farlo
> a mano senza di te. Fai uno screenshot del sistema che gira nell'ambiente di test e mostramelo.
> Rispondi nella mia lingua.

2. È un compito lungo, con andate e ritorni. Quando ti mostra lo screenshot, apri tu l'URL: si
   deve vedere Turnos con i dati. Cerca un paziente reale per nome: non deve esserci.
3. Ruota ogni segreto della lista che ti ha dato. Tu, nel pannello che serve, oggi.

**Prima di inviare il prompt** della batteria: l'ambiente di test aperto da te, i segreti ruotati,
e la lista dei cinque flussi critici per lo spazio vuoto del prompt.

4. Incollagli:

> We are going to write the characterization tests of these critical flows: [load an
> appointment; cancel an appointment; the reminder reaches the patient; search a patient; download
> the monthly sheet]. A characterization test captures what the system does today, exactly as it
> does it, defects included; it is not a test of what the system should do. For each flow: drive
> it from the screen as a user would and check the effect in the backend (the row, the state, the
> message queued). Every test must pass against the current code. Then prove that each test
> actually watches its flow: break the flow deliberately with a temporary change, show me the red
> output, revert the change, show me the green. If a flow cannot be driven from the screen, do not
> simulate it: say so and open a pending item marked as blocking. If while writing these tests you
> find behaviour that looks wrong, do not fix it: add it to `docs/DISCREPANCIES.md` with the
> evidence. Record the command to run the suite in `docs/STATUS.md`, and make the suite the gate
> for the test environment as `docs/GATES.md` says. Reply in my language.

> [it]
> Scriveremo i test di caratterizzazione di questi flussi critici: [caricare un appuntamento;
> cancellare un appuntamento; il promemoria arriva al paziente; cercare un paziente; scaricare il
> foglio mensile]. Un test di caratterizzazione cattura ciò che il sistema fa oggi, esattamente
> come lo fa, difetti inclusi; non è un test di ciò che il sistema dovrebbe fare. Per ogni flusso:
> operalo dalla schermata come farebbe un utente e verifica l'effetto nel backend (la riga, lo
> stato, il messaggio in coda). Tutti i test devono passare contro il codice attuale. Poi dimostra
> che ogni test sorveglia davvero il suo flusso: rompi il flusso di proposito con una modifica
> temporanea, mostrami l'output in rosso, annulla la modifica, mostrami il verde. Se un flusso non
> si può operare dalla schermata, non simularlo: dillo e apri una voce in sospeso marcata come
> bloccante. Se mentre scrivi questi test trovi un comportamento che sembra sbagliato, non
> sistemarlo: aggiungilo a `docs/DISCREPANCIES.md` con la prova. Registra il comando per eseguire
> la batteria in `docs/STATUS.md`, e fai in modo che la batteria sia il cancello dell'ambiente di
> test come dice `docs/GATES.md`. Rispondi nella mia lingua.

   Gli stai chiedendo il test che nasce in verde e dimostra di servire andando in rosso per
   mutazione; niente simulazioni di ciò che non si può operare; e ciò che sembra sbagliato,
   annotato come discrepanza, non sistemato.

5. Le due schermate non operabili (la voce in sospeso bloccante di N0) si risolvono qui, prima
   della batteria o come parte di essa: chiedigli di chiudere quella voce con la routine della
   lezione 7, e di scrivere poi i test di caratterizzazione di quei flussi.
6. Esegui tu la batteria con il comando di `docs/STATUS.md`. Deve essere in verde.

**Verifica di completezza.** Hai aperto l'ambiente di test e non hai trovato un nome reale? Il
deployment è stato eseguito due volte e la seconda non ha cambiato nulla? La ricerca di segreti
nel repository è tornata vuota, e hai ruotato quelli che ha trovato? Ognuno dei cinque flussi ha
il suo test e il suo rosso per mutazione a vista? Hai eseguito tu la batteria?

**Consegna.** L'ambiente di test che gira con dati anonimizzati, `docs/DEPLOYMENT.md`,
`docs/GATES.md`, i segreti ruotati, l'integrazione continua in verde, e la batteria di
caratterizzazione in verde con i suoi cinque rossi dimostrati.

**Errori tipici.** Lasciare la batteria "alla settimana prossima" e cominciare a sistemare il bug:
la cintura a metà è la causa numero uno di rompere ciò che funzionava. Dati di test "di esempio"
invece della copia anonimizzata: i bug di un legacy vivono nei dati reali (il promemoria doppio di
Turnos compare solo con certi pazienti). E spostare il segreto senza ruotarlo: era nella storia di
git; non è più un segreto.

**Nel progetto guida.** Il test di caratterizzazione del promemoria è il più interessante: cattura
che il processo notturno manda un messaggio per ogni appuntamento del giorno dopo alla casella
fittizia, e passa. Mentre lo scrive, l'agente nota che se il processo viene eseguito due volte
manda due volte, e lo annota come discrepanza con la prova. È la pista del bug, e ancora non si
sistema: il comportamento attuale è la specifica fino alla lezione R1. Il rosso per mutazione:
l'agente commenta la riga che mette il messaggio in coda, il test fallisce, la decommenta, passa.

### Lezione N5 — Lucchetti e mappa produttore-consumatore dal codice

**Cosa devi capire.** Le lezioni 12 e 8, fatte per inventario su ciò che esiste già, prima di
cambiare qualunque cosa. L'agente troverà nel codice più di quanto il business ricordi che il
sistema faccia verso l'esterno: invii, cancellazioni, processi notturni. Il confronto fra le due
liste è il risultato. E ogni lucchetto porta una proposta di "adesso" o "quando si tocca": un
lucchetto su qualcosa che manda messaggi va adesso; uno su un'esportazione mensile può aspettare
il blocco che toccherà quel modulo.

**Prima di inviare il prompt**, con le tue mani e con il proprietario:

- In `docs/INITIAL_SURVEY.md`, la lista di ciò che la responsabile **sa** che il sistema fa verso
  l'esterno: manda promemoria, e nient'altro, secondo lei.
- Accesso dell'agente alle attività pianificate del server.
- La lista di ciò che vive fuori dal repository (il foglio mensile), per la mappa.
- L'ambiente di test di N4 che gira.

1. Incollagli:

> Go through the code, the database triggers and the scheduled jobs of the server looking for
> everything that charges, sends, approves, deletes, notifies outwards or runs on a schedule, and
> write `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` with every statement tagged by its source. Compare
> it with the list the business wrote in `docs/INITIAL_SURVEY.md`: whatever the code does that the
> business did not list, or the other way round, ask me about before going on. For every action:
> what triggers it, whether it can run twice, whether it is reversible, what lock exists today if
> any, and what the way back is. In the same pass, build `docs/PRODUCER_CONSUMER_MAP.md`: for every
> contract in the system (a service, a table, a file format, a list of values), who produces it
> and who consumes it, including the things outside the repository I told you about. If there are
> parts you cannot see, say so instead of leaving them out. Present me the actions table with a
> proposed lock for each (explicit confirmation, double safety, dry-run mode, daily limit, a human
> in the loop) and a proposal of which locks go NOW, before any change, and which can go when the
> module is touched. Do not implement anything yet: I confirm lock by lock. Reply in my language.

> [it]
> Percorri il codice, i trigger del database e le attività pianificate del server cercando tutto
> ciò che incassa, invia, approva, cancella, avvisa verso l'esterno o gira da solo a un orario, e
> scrivi `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` con ogni affermazione marcata dalla sua fonte.
> Confrontalo con la lista che il business ha scritto in `docs/INITIAL_SURVEY.md`: ciò che il
> codice fa e il business non ha elencato, o viceversa, chiedimelo prima di proseguire. Per ogni
> azione: cosa la innesca, se può girare due volte, se è reversibile, che lucchetto ha oggi se ne
> ha uno, e qual è la strada del ritorno. Nella stessa passata, costruisci
> `docs/PRODUCER_CONSUMER_MAP.md`: per ogni contratto del sistema (un servizio, una tabella, un
> formato di file, una lista di valori), chi lo produce e chi lo consuma, incluse le cose fuori
> dal repository di cui ti ho parlato. Se ci sono parti che non puoi vedere, dillo invece di
> lasciarle fuori. Presentami la tabella delle azioni con un lucchetto proposto per ciascuna
> (conferma esplicita, doppia sicurezza, modalità di prova, limite giornaliero, un umano nel
> circuito) e una proposta su quali lucchetti vanno ADESSO, prima di qualunque modifica, e quali
> possono andare quando si tocca il modulo. Non implementare ancora nulla: confermo io lucchetto
> per lucchetto. Rispondi nella mia lingua.

2. Conferma lucchetto per lucchetto con la responsabile, e la marca "adesso" o "quando si tocca"
   di ciascuno.

**Prima di inviare il prompt** di chiusura: la tabella con il tuo verdetto riga per riga, e la
lista dei lucchetti "adesso" per lo spazio vuoto del prompt.

3. Chiudi con il prompt di chiusura della lezione 12, elencando solo i lucchetti "adesso"; gli
   altri restano nel backlog con la loro marca.

**Verifica di completezza.** La lista dell'agente ha più azioni di quella della responsabile? (Se
ha le stesse, non ha guardato le attività pianificate.) Ogni lucchetto "adesso" ha il suo test in
rosso contro la versione senza lucchetto? Il foglio mensile è nella mappa come consumatore?

**Consegna.** `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`, `docs/PRODUCER_CONSUMER_MAP.md`,
`docs/LOCKS.md` con i lucchetti "adesso" implementati e provati.

**Errori tipici.** Implementare tutti i lucchetti adesso "già che ci siamo": è la regola delle due
velocità violata, ed è una settimana che non si dedica al bug che il cliente ha chiesto.

**Nel progetto guida.** L'agente trova tre azioni che la responsabile non aveva elencato: la
cancellazione notturna degli appuntamenti annullati vecchi, un'email che il sistema manda al
professionista quando un appuntamento viene cancellato (lei non lo sapeva), e l'esportazione che
alimenta il foglio. Lucchetti "adesso": la cancellazione notturna passa in modalità di prova
(registra ciò che avrebbe cancellato) finché lei non decide, e l'invio dei promemoria riceve un
limite giornaliero. "Quando si tocca": idempotenza dell'invio (modulo messaggi, entra con il bug),
conferma nella cancellazione (modulo agenda). La mappa ha sei contratti, e il foglio mensile è
consumatore della tabella degli appuntamenti: se qualcuno le cambia una colonna, il foglio si
rompe in silenzio.

### Lezione N6 — Dimensionare con numeri reali

**Cosa devi capire.** La lezione 3 con un vantaggio: i dati primari sono nel database e nei log.
Non si chiedono, si misurano, con un misuratore con test (lezione 9). La responsabile apporta solo
ciò che non è da nessuna parte: quanto si aspettano di crescere, e se il sistema verrà venduto ad
altri ambulatori.

**Prima di inviare il prompt**, con le tue mani:

- Accesso in sola lettura al database di produzione, o la copia completa di N4 (l'anonimizzazione
  non ha toccato date né quantità), e ai log di accesso.
- Le due risposte del business: crescita attesa ("come adesso, forse un professionista in più") e
  il "per dieci" ("se funziona, mia sorella ha un altro ambulatorio").
- Un caso noto per il test del misuratore: il numero di professionisti, che sono tre.

1. Incollagli:

> Before changing anything we are going to size this system with its real numbers. With read-only
> access to the production database (or the complete test copy) and to the logs, measure instead
> of asking: rows per table and growth per month from the timestamps, events per entity, peak
> concurrency from the access logs, data size today and projected at five years, and the slowest
> queries. Write a meter for each number (a script that lives in the repository, with a test
> against a known case I will give you) and show me every number together with the command that
> produces it; audit each meter in both directions (is everything that should be counted, counted?
> does everything counted exist?). Write `docs/VOLUME_SURVEY.md` with every figure tagged
> [database] or [log], and ask me only for what cannot be measured: the growth the business
> expects and whether the system will serve more than one site. Then write `docs/SIZING.md`: what
> breaks first if everything is multiplied by ten, which of the current architecture choices hold
> and which do not, and which asymmetric decisions we take now, before evolving, because they are
> cheap today and expensive later. Do not change any code. Reply in my language.

> [it]
> Prima di cambiare qualunque cosa dimensioneremo questo sistema con i suoi numeri reali. Con
> accesso in sola lettura al database di produzione (o alla copia completa di test) e ai log,
> misura invece di chiedere: righe per tabella e crescita al mese a partire dalle date, eventi per
> entità, concorrenza di picco a partire dai log di accesso, dimensione dei dati oggi e proiettata
> a cinque anni, e le query più lente. Scrivi un misuratore per ogni numero (uno script che vive
> nel repository, con un test contro un caso noto che ti darò) e mostrami ogni numero insieme al
> comando che lo produce; verifica ogni misuratore nelle due direzioni (è contato tutto ciò che
> dovrebbe essere contato? esiste tutto ciò che è contato?). Scrivi `docs/VOLUME_SURVEY.md` con
> ogni cifra marcata [base] o [log], e chiedimi solo ciò che non si può misurare: la crescita che
> il business si aspetta e se il sistema servirà più di un sito. Poi scrivi `docs/SIZING.md`: cosa
> si rompe per primo se tutto si moltiplica per dieci, quali delle scelte architetturali attuali
> reggono e quali no, e quali decisioni asimmetriche prendiamo adesso, prima di evolvere, perché
> oggi sono economiche e dopo costose. Non cambiare nessun codice. Rispondi nella mia lingua.

2. Esegui tu un misuratore (quello delle righe per tabella, per esempio). Ti deve dare lo stesso
   risultato. Rifai un conto a mano.

**Prima di inviare il prompt** di chiusura: il conto rifatto che coincide, e la tua decisione su
ciò che non regge il "per dieci", se c'è qualcosa.

3. Chiudi con il prompt di chiusura della lezione 3, scegliendo fra le opzioni che avrà proposto
   oppure confermando che l'attuale regge.

**Verifica di completezza.** C'è qualche numero primario senza misuratore? Ne hai eseguito uno tu?
È scritto il "per dieci"?

**Consegna.** `docs/VOLUME_SURVEY.md` con le marche, i misuratori con il loro test,
`docs/SIZING.md`.

**Errori tipici.** Accettare "il database è troppo grande per contarlo, stimo centomila". Un
database grande si conta con una query; quello è un misuratore.

**Nel progetto guida.** Ventimila appuntamenti in due anni, mille al mese e in crescita lenta;
sessantamila messaggi; due utenti nel picco; il database occupa poco; la query più lenta è la
ricerca dei pazienti per nome (senza indice, lo diceva già l'audit). Il "per dieci" regge su tutto
tranne che su quella ricerca e sull'invio notturno, che impiega un tempo proporzionale agli
appuntamenti. Decisione asimmetrica: l'interfaccia di invio dei messaggi passa ad avere una coda,
anche se oggi non serve, perché la caparra (lezione R2) userà lo stesso canale.

### Lezione N7 — Il backlog di normalizzazione, abbinato alla richiesta del cliente

**Cosa devi capire.** La lezione 5 con due colonne in più. Una sola coda dove convivono il debito
(audit, discrepanze, schermate, lucchetti in sospeso, decisioni del dimensionamento) e la
richiesta del cliente (ciò che non funziona, ciò che manca), ogni voce con la sua marca di
velocità e il suo tipo, e ogni voce del cliente con la lista di quelle di normalizzazione che
toccano lo stesso modulo e che conviene pagare insieme a lei. Questa è la regola "si paga quando
si tocca" resa operativa.

**Prima di inviare il prompt**, con le tue mani e con il proprietario:

- La richiesta del cliente per questa tappa, in `docs/blocks/STAGE_01_REQUEST.md`, in due liste
  con le parole della responsabile. Ciò che non funziona: "a volte il promemoria arriva due volte,
  e a volte non arriva; ho gli screenshot di tre pazienti della settimana scorsa". Ciò che manca:
  "voglio chiedere una caparra con un link di pagamento per gli appuntamenti di prima visita",
  "voglio vedere i numeri del mese senza scaricare il foglio".
- Tutti gli artefatti da N2 a N6 chiusi. Se ne manca uno, non aprire questo prompt.
- Le voci in sospeso bloccanti di N0, N3 e N4 chiuse.

1. Incollagli:

> We are going to turn the normalization and the client's request for this stage into one queue
> of numbered pending items in `docs/PENDING.md`, each with its full specification as the method
> asks (number, title, node of the semantic tree, origin, description, business rules with
> decision and date or marked as missing, data in and out, screens, edge cases, acceptance
> criteria as given, when, then, how it will be verified, status). Sources for the normalization
> items: `docs/AUDIT_[date].md`, the discrepancies I decided to change, the screens that cannot be
> driven by a program, the secrets to rotate, the locks that are not implemented yet, and the
> decisions in `docs/SIZING.md`; each one keeps its speed mark: BLOCKS, PAID WHEN TOUCHED, or CAN
> WAIT. Sources for the client's items: the client's request for this stage; each one marked
> CORRECTIVE (something that fails today, with the way to reproduce it in the client's words) or
> EVOLUTIVE (something new). For every client item, list the normalization items that touch the
> same modules and should be paid together with it. If the request is ambiguous on any point such
> that you cannot write a verifiable item, ask me; do not resolve it by assuming. Order: blocking
> items first, then the client's items in the priority I gave you, each with its paired
> normalization. Reply in my language.

> [it]
> Trasformeremo la normalizzazione e la richiesta del cliente per questa tappa in una sola coda di
> voci in sospeso numerate in `docs/PENDING.md`, ciascuna con la sua specifica completa come
> chiede il metodo (numero, titolo, nodo dell'albero semantico, origine, descrizione, regole di
> business con decisione e data oppure marcate come mancanti, dati in entrata e in uscita,
> schermate, casi limite, criteri di accettazione nella forma dato, quando, allora, come si
> verificherà, stato). Fonti delle voci di normalizzazione: `docs/AUDIT_[data].md`, le discrepanze
> che ho deciso di cambiare, le schermate che non si possono operare da programma, i segreti da
> ruotare, i lucchetti non ancora implementati, e le decisioni in `docs/SIZING.md`; ciascuna
> conserva la sua marca di velocità: BLOCCA, SI PAGA QUANDO SI TOCCA, oppure PUÒ ASPETTARE. Fonti
> delle voci del cliente: la richiesta del cliente per questa tappa; ciascuna marcata CORRETTIVA
> (qualcosa che oggi non funziona, con il modo di riprodurlo nelle parole del cliente) oppure
> EVOLUTIVA (qualcosa di nuovo). Per ogni voce del cliente, elenca le voci di normalizzazione che
> toccano gli stessi moduli e che conviene pagare insieme a lei. Se la richiesta è ambigua su
> qualche punto al punto che non puoi scrivere una voce verificabile, chiedimelo; non risolverla
> supponendo. Ordine: prima le voci bloccanti, poi quelle del cliente nella priorità che ti ho
> dato, ciascuna con la sua normalizzazione abbinata. Rispondi nella mia lingua.

2. Leggi la specifica di ogni voce del cliente come se fossi la responsabile, proprio come nella
   lezione 5. E rivedi gli abbinamenti: ha senso pagare quel debito con quella richiesta?
3. Aggiungi al patto la routine di ogni sessione della lezione 5, senza modifiche.

**Verifica di completezza.** Resta qualche "blocca" aperto? Ogni correttivo dice come si riproduce
con le parole del cliente? Ogni voce del cliente ha le sue abbinate?

**Consegna.** `docs/PENDING.md` con tutto, e la routine nel patto.

**Errori tipici.** Un backlog con cinquanta voci in "può aspettare": è la riscrittura travestita
da lista. Archivia ciò che non si pagherà e dillo. E aprire il primo blocco con un bloccante
aperto "perché è piccolo".

**Nel progetto guida.** Il backlog di Turnos resta con tre voci del cliente: il promemoria doppio
(correttivo, modulo messaggi, abbinato all'idempotenza dell'invio e alla coda dei messaggi del
dimensionamento), la caparra (evolutivo, modulo nuovo dei pagamenti, abbinata alla conferma nella
cancellazione perché tocca la stessa schermata), e il rapporto mensile (evolutivo, modulo
rapporti, abbinato all'indice dei pazienti e al contratto del foglio, che viene sostituito). E una
dozzina di voci di normalizzazione, di cui tre "possono aspettare" e lo si dice.

---

## Il ciclo sul legacy: lezioni R1 e R2

### Lezione R1 — Il primo blocco: il bug, in modalità correttiva

**Cosa devi capire.** Una voce in sospeso correttiva è un bug noto. Nella lezione 7 il rosso si
fabbricava; qui il rosso è il bug stesso: il test che riproduce il guasto, operando il flusso come
l'utente che l'ha segnalato, deve fallire contro il codice attuale. Se non fallisce, hai
riprodotto un altro bug. Quel rosso è la prova che stai sistemando la cosa giusta, e vale più di
qualunque spiegazione dell'agente su ciò che "deve stare succedendo"
[Ref. 22](REFERENCIAS.md#ref-22). E la causa radice si dice in prosa prima di toccare, perché a
volte la causa radice è una regola di business che nessuno ha scritto, e quella la decidi tu.

**Prima di inviare il prompt**, con le tue mani:

- La voce in sospeso correttiva in `docs/PENDING.md` con la riproduzione nelle parole della
  responsabile, e un caso concreto: i tre screenshot della settimana scorsa, con il nome (falso,
  in test) dei pazienti e la data. Senza un caso, non c'è test.
- La batteria di caratterizzazione in verde, con il comando in `docs/STATUS.md`.
- Le voci abbinate a questa, elencate in essa.
- La responsabile avvisata che oggi le farai una domanda di business.

1. Apri il blocco con la routine di ogni sessione: l'agente annuncia quale voce in sospeso prende
   e rilegge la specifica.
2. Incollagli:

> This pending item is a correction: [some patients receive the reminder twice and some receive
> none; three cases from last week are attached in the item]. Before changing anything: (1)
> Reproduce the failure with a test that drives the flow from the screen and checks the effect in
> the backend, and show me that it fails against the current code; that red is the proof that you
> reproduced the right defect. If you cannot reproduce it, tell me what you tried and what you
> need; do not fix what you cannot see. (2) Find the root cause and tell me in prose, with the
> evidence, before fixing. If the root cause is a business rule nobody wrote down, stop and ask me.
> (3) Fix at the root, not where it hurts, and nothing else: anything else you find goes to a
> pending item. (4) Show me the test green, the characterization suite still green, and the
> regression of the neighbouring items. (5) If the fix changes a current behaviour that someone
> may depend on, say so explicitly: that is a decision for me, not a side effect. Close the paired
> normalization items of this module in the same block, each with its own evidence. The commit
> message says "proved red against [version]" and the test counts. Reply in my language.

> [it]
> Questa voce in sospeso è una correzione: [alcuni pazienti ricevono il promemoria due volte e
> altri nessuno; nella voce ci sono i tre casi della settimana scorsa]. Prima di cambiare
> qualunque cosa: (1) Riproduci il guasto con un test che operi il flusso dalla schermata e
> verifichi l'effetto nel backend, e mostrami che fallisce contro il codice attuale; quel rosso è
> la prova che hai riprodotto il difetto giusto. Se non riesci a riprodurlo, dimmi cosa hai
> provato e cosa ti serve; non sistemare ciò che non puoi vedere. (2) Trova la causa radice e
> dimmela in prosa, con la prova, prima di sistemare. Se la causa radice è una regola di business
> che nessuno ha scritto, fermati e chiedimelo. (3) Sistema alla radice, non dove fa male, e
> nient'altro: qualunque altra cosa tu trovi va in una voce in sospeso. (4) Mostrami il test in
> verde, la batteria di caratterizzazione ancora in verde, e la regressione delle voci vicine. (5)
> Se la correzione cambia un comportamento attuale da cui qualcuno può dipendere, dillo
> esplicitamente: quella è una decisione mia, non un effetto collaterale. Chiudi le voci di
> normalizzazione abbinate di questo modulo nello stesso blocco, ciascuna con la sua prova. Il
> messaggio del commit dice "provato in rosso contro [versione]" e i numeri dei test. Rispondi
> nella mia lingua.

   Gli stai chiedendo la riproduzione prima della diagnosi, la causa radice in prosa prima di
   toccare, la radice e nient'altro, la caratterizzazione come regressione del sistema intero, e
   che un cambio di comportamento sia una tua decisione.

3. Leggi la causa radice prima di autorizzare la correzione. Se ti chiede una regola di business,
   decidila con la responsabile e rispondi con il formato di chiusura della lezione 6.
4. Alla chiusura: esegui tu la batteria di caratterizzazione. E usa il sistema nell'ambiente di
   test per mezz'ora, come la receptionist: lo sguardo umano non si delega.

**Verifica di completezza.** Hai visto il rosso del test che riproduce il bug, con i numeri? La
causa radice era scritta in prosa prima della correzione? La caratterizzazione è ancora in verde?
Le abbinate sono state chiuse con la loro prova? Il commit dice "provato in rosso"?

**Consegna.** Il bug chiuso con la routine completa, le abbinate chiuse, e la batteria di
caratterizzazione ampliata con il test del bug.

**Errori tipici.** Autorizzare la correzione senza leggere la causa radice: in Turnos, la prima
ipotesi dell'agente è di solito "il processo gira due volte" ed è metà della verità. E lasciare
che il "già che ci sono" metta in ordine il modulo dei messaggi: regola 7.

**Nel progetto guida.** Il test riproduce il doppio invio con un appuntamento che era stato
riprogrammato: il processo notturno manda un promemoria per ogni riga di appuntamento del giorno
dopo, e un appuntamento riprogrammato ha due righe (quella vecchia, nello stato "riprogrammato",
che nessuna schermata mostra, e quella nuova). Quelli che non ne ricevono nessuno sono quelli
riprogrammati dopo l'invio. Causa radice: lo stato "riprogrammato" comparso nella lezione N2. La
domanda di business: "un appuntamento riprogrammato è un appuntamento nuovo o lo stesso
appuntamento?". La responsabile decide: lo stesso appuntamento, con uno storico. La correzione
alla radice tocca lo stato, non l'invio; l'idempotenza abbinata si paga nello stesso blocco; il
rosso dice "2 messaggi per 1 appuntamento" e il verde "1 messaggio per 1 appuntamento". E il
cambio di comportamento si dichiara: gli appuntamenti riprogrammati smettono di comparire due
volte nel foglio mensile, che è consumatore della tabella; la responsabile lo approva.

### Lezione R2 — Il secondo blocco: la caparra, in modalità evolutiva

**Cosa devi capire.** Il nuovo sul vecchio si costruisce con il metodo completo, tali e quali le
lezioni da 5 a 10 della prima parte: specifica nella voce in sospeso, decisioni con la data, test
in rosso, prova end to end, rapporto onesto. Due differenze. La regressione delle vicine è il
sistema intero, e la batteria di caratterizzazione è quella che lo dice. E quando il blocco entra
in un modulo, le voci di normalizzazione marcate "si paga quando si tocca" di quel modulo entrano
con lui, con la loro prova. Non si fa al modulo nuovo ciò che il legacy ha fatto a quello vecchio.

**Prima di inviare il prompt**, con le tue mani:

- La voce in sospeso evolutiva della caparra in `docs/PENDING.md`, con la sua specifica completa
  letta da te, le sue abbinate, e le decisioni di business che la responsabile può già prendere:
  quali appuntamenti richiedono la caparra, quanto, cosa succede se non si paga.
- La rilevazione delle azioni con conseguenze (N5) con la riga "incassare la caparra" aggiunta,
  perché è un'azione nuova che agisce sul mondo: lucchetto prima di costruire, come nella lezione
  12.
- La batteria di caratterizzazione in verde.

1. Apri il blocco con il prompt di apertura della lezione 5, sulla richiesta della caparra, e
   leggi la specifica come la responsabile.
2. Prima di costruire, il lucchetto: incollagli il prompt di chiusura della lezione 12 per
   l'azione "incassare la caparra", con la modalità di prova per prima.
3. Costruisci con la routine della lezione 7, voce per voce, con le abbinate nello stesso blocco.
4. Alla chiusura del blocco: la batteria completa end to end (quella di caratterizzazione più i
   test nuovi), con il prompt di chiusura di blocco della lezione 7, e mezz'ora tua a usare il
   sistema.

**Verifica di completezza.** La caparra ha un lucchetto con test in rosso prima che l'incasso
esista? La caratterizzazione è ancora in verde dopo il blocco? Le abbinate del modulo sono state
pagate? C'è qualcosa del modulo vecchio che è stato "migliorato" senza una voce in sospeso?

**Consegna.** La caparra che funziona nell'ambiente di test, in modalità di prova, con la sua
specifica, il suo lucchetto, i suoi test e la sua prova end to end; le abbinate chiuse.

**Errori tipici.** Costruire la caparra "in fretta, come è fatto il resto" perché si incastri: il
modulo nuovo nasce con il metodo completo, sempre. E dimenticare il lucchetto perché "è un link di
pagamento, non incassiamo noi": il link si manda a un paziente; quella è un'azione verso
l'esterno.

**Nel progetto guida.** La caparra usa lo stesso canale dei promemoria, che adesso ha una coda (la
decisione asimmetrica di N6 che si ripaga da sola). Lucchetto: conferma esplicita della
receptionist e importo fissato dal professionista; modalità di prova per una settimana registrando
"avrei chiesto la caparra a". L'abbinata della schermata di cancellazione (la conferma) si paga in
questo blocco perché la caparra cambia cosa succede quando si cancella. Alla chiusura, la batteria
esegue sette flussi: i cinque di caratterizzazione, quello del bug di R1 e quello della caparra.

---

## Dopo: uscita in produzione ed esercizio

Da qui in avanti, il legacy è un sistema con metodo, e le lezioni da 11 a 15 della prima parte si
applicano tali e quali, con tre note. L'audit della lezione 11 si confronta con quello di N3:
quanto debito è stato pagato, quanto resta. I manuali della lezione 14 in un legacy di solito non
esistono, e si generano a partire dal sistema com'è e dalle voci in sospeso chiuse, che adesso sì
documentano ciò che è stato fatto. E la retrospettiva della lezione 15 ha una domanda propria di
questo percorso: quanto è costato normalizzare (in ore, in token, in settimane prima della prima
modifica), e quanto del debito marcato "può aspettare" è finito per costare lo stesso. Quella
risposta è quella che correggerà il calendario di questa parte nella prossima versione.

## Lista di uscita dal tratto di normalizzazione

Le otto condizioni che il proprietario verifica senza leggere codice, prima di aprire il primo
blocco. Sono le stesse della pagina del percorso evolutivo-correttivo; le ripeto qui perché sono
la consegna di questa parte.

1. Esistono tutti gli input delle tappe precedenti (rilevazione, idoneità, patto, file di
   progetto, albero, ambienti, volumi, dimensionamento, cancelli), con le marche di origine, e il
   proprietario ha confermato ogni nodo dedotto (N2).
2. Ogni discrepanza ha una decisione con la data, e quelle che cambiano il sistema hanno una voce
   in sospeso (N2).
3. L'audit esiste e ogni rilievo ha la marca di velocità (N3).
4. La cintura è in verde: ambiente di test con dati anonimizzati, deployment eseguito due volte,
   segreti fuori e ruotati, integrazione continua, batteria di caratterizzazione con il rosso per
   mutazione dimostrato (N4).
5. Ogni azione con conseguenze ha un verdetto, e i lucchetti "adesso" hanno il loro test in rosso
   (N5).
6. I numeri primari sono misurati con misuratore e test, e il "per dieci" è scritto (N6).
7. Non resta nessun "blocca" aperto, e ogni voce del cliente ha le sue abbinate (N7).
8. Il patto ha le cinque regole del legacy, e una sessione nuova supera la prova di lettura (N1,
   N2).

## Allegato — Ciò che questa parte ancora non ha

- Una coorte che l'abbia seguita su un legacy reale. Turnos ereditata è costruita a partire da ciò
  che ho visto in sistemi altrui in modalità diagnostica, non da un allievo.
- Un repository di esempio di "Turnos" così come l'ha lasciato il nipote, perché l'allievo che non
  ha un legacy suo ne abbia uno da normalizzare. È la voce in sospeso più importante di questa
  parte.
- Il criterio sulla dimensione della batteria di caratterizzazione per sistemi grandi, e come si
  distribuisce la normalizzazione per modulo quando il sistema ne ha decine.
