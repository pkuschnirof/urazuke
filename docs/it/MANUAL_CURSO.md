# Urazuke — il corso. Manuale con compiti pratici, gradino per gradino, fino all'applicazione in produzione

Versione 1, 17 ottobre 2026. È un documento di lavoro del progetto Urazuke: verrà corretto con la
prima classe che lo userà. È scritto in un linguaggio di tutti i giorni, e ogni sigla o espressione
strana è nel glossario del documento principale (`ESCALERA_METODOLOGICA.md`). Questa è la versione
italiana; lo spagnolo è la fonte della verità. I prompt per il modello sono in inglese e sono
identici in tutte le lingue.

## Prima di cominciare

### Per chi è questo corso

Per chi vuole costruire software con l'intelligenza artificiale **e vuole che quel software venga
usato davvero**, da persone vere, per mesi. Non è un corso di programmazione: non imparerai un
linguaggio né un framework. Non è nemmeno un corso di "prompt": non imparerai trucchi perché il
modello scriva meglio. È un corso di **metodo**: cosa fare in quale ordine, cosa chiedere al modello
in ogni momento, cosa deve consegnarti, e come sapere, senza leggere codice, che ciò che ti ha
consegnato è completo.

Ti serve se sei una di queste persone:

- Hai un'attività, uno studio, una piccola società di consulenza, e vuoi un sistema tuo senza
  assumere un team di sviluppo.
- Sei un consulente o un freelance dell'automazione e i tuoi clienti ti chiedono "qualcosa di più"
  di un robot.
- Sai programmare, ma vuoi che il modello faccia il lavoro pesante e tenerti le decisioni.
- Hai già "vibecodato" qualcosa, ha funzionato due settimane, e al terzo mese ti è crollato.

Non ti serve se ciò che vuoi è un prototipo per la demo di venerdì. Per quello ci sono strumenti
più rapidi, e questo metodo ti sembrerà lento. Il metodo è per ciò che deve continuare a funzionare
dopo la demo.

### Cosa avrai alla fine

Un'applicazione tua, in produzione, con: test che sono stati visti fallire prima di passare;
deployment riproducibile con rollback; configurazione e segreti fuori dal repository; le decisioni
di business scritte con data; lucchetti su tutto ciò che addebita, invia o cancella; tre manuali
che una persona può seguire senza IA; un audit fatto da un agente diverso da quello che ha
costruito; e una retrospettiva con i numeri. È questo che qui chiamiamo "production grade": non è
che funziona, è che **si può sostenere**.

E avrai qualcos'altro, che è ciò che davvero ti porti via: il riflesso di non credere al modello
senza prove, e di sapere esattamente quali prove chiedergli a ogni passo.

### Di cosa hai bisogno

1. **Uno strumento di IA per programmare.** Qualunque strumento capace di leggere e scrivere file
   nel tuo repository ed eseguire comandi: Claude Code, Cursor, Codex CLI, Gemini CLI, Forge. Il
   metodo non dipende da quale; il documento principale ha una tabella di dove va ogni artefatto in
   ogni strumento. In questo manuale diciamo "l'agente" per riferirci a quello che usi.
2. **Un account GitHub** (o equivalente) e nozioni minime di cosa sono un repository, un commit e
   un push. Se non le hai, dedicaci un pomeriggio prima di cominciare; qualunque tutorial
   introduttivo basta. Non serve altro.
3. **Un progetto.** L'ideale è che sia tuo: un sistema di cui hai bisogno o che un cliente ti ha
   chiesto, con utenti che lo useranno. Se non ne hai uno, usa il **progetto guida** descritto
   sotto; è pensato per passare per i sedici gradini senza saltarne nessuno.
4. **Tempo.** Il corso ha sedici lezioni, una per gradino. Quelle di avvio (da 0 a 4) richiedono da
   una a tre ore ciascuna; quelle del ciclo (da 5 a 10) si imparano in un pomeriggio e si praticano
   per tutto il progetto; quelle di esercizio (da 11 a 15) richiedono da due a quattro ore
   ciascuna. Un progetto piccolo, da cima a fondo, sono tra quattro e otto settimane di lavoro a
   tempo parziale.
5. **Un proprietario del dominio con tempo per decidere.** Se il progetto è tuo, sei tu. Se è di un
   cliente, è il cliente, e deve sapere che dovrà rispondere a domande per tutto il progetto.
   Questo punto non è negoziabile: senza un proprietario che decida, decide il modello, e lì il
   metodo si rompe.

### Come si segue il corso

Ogni lezione ha la stessa struttura:

- **Cosa devi capire**: il concetto, spiegato come lo si spiega a una persona.
- **Il compito**: passo per passo, con il prompt esatto che darai all'agente (in inglese, perché i
  modelli seguono le istruzioni con più precisione in inglese; sotto ciascuno è spiegato in
  italiano cosa gli stai chiedendo) e cosa fare con ciò che ti restituisce.
- **La verifica di completezza**: la lista di domande che ti fai su ciò che l'agente ha
  consegnato, senza aprire il codice. Se una dà "no", la lezione non è finita.
- **Il risultato da consegnare**: il file o la prova che deve esistere alla fine.
- **Errori tipici**: ciò che succede a quasi tutti la prima volta.
- **Nel progetto guida**: come si presenta questa lezione applicata al progetto di esempio.

Una regola per tutto il corso: **non passare al gradino successivo con una verifica su "no"**. La
tentazione del "lo sistemo dopo" è esattamente ciò che il metodo esiste per evitare. Se un gradino
non si sale completo, il successivo si costruisce sulla sabbia.

### Il progetto guida: "Turnera"

Se non hai un progetto tuo, usa questo. È piccolo, ma ha tutto ciò che serve perché nessuno dei
sedici gradini sia finto: utenti reali, dati personali, messaggi che escono nel mondo, e soldi.

**L'attività.** Uno studio medico (può essere uno studio professionale, un parrucchiere,
un'officina: qualunque posto che dà appuntamenti). Oggi gli appuntamenti si annotano su un
quaderno e si confermano a mano via WhatsApp. Si perdono appuntamenti perché la gente si dimentica,
ci sono sovrapposizioni perché due persone hanno annotato su quaderni diversi, e nessuno sa quanti
appuntamenti sono stati cancellati il mese scorso.

**Cosa vogliono.** Un'agenda web dove le due receptionist e i tre professionisti vedano gli
appuntamenti; promemoria automatici 24 ore prima, via WhatsApp o email; la possibilità di
chiedere una caparra tramite link di pagamento per certi appuntamenti; e un paio di numeri a fine
mese (quanti appuntamenti, quante assenze, quante caparre).

**La proprietaria.** La responsabile dello studio. Ha criterio sull'attività (sa quali
appuntamenti richiedono caparra, con quanto anticipo si può cancellare, cosa si dice a un paziente
che è mancato tre volte) e ha quindici minuti al giorno per rispondere a domande. Non programma, e
non leggerà codice.

**I numeri che solo lei sa.** Circa quaranta appuntamenti al giorno, duecentocinquanta giorni
all'anno. Circa tre messaggi per appuntamento (conferma, promemoria, a volte riprogrammazione). I
dati dei pazienti si conservano cinque anni. Il picco è il lunedì mattina, con le due receptionist
che caricano contemporaneamente. E una domanda a cui lei non sa rispondere e che conta: se
funziona, lo venderanno ad altri studi? (La risposta cambia il dimensionamento di dieci volte.)

**Ciò che ha conseguenze.** Inviare un promemoria (se si manda due volte, infastidisce; se si
manda al numero sbagliato, è un problema di privacy). Incassare una caparra (soldi). Cancellare un
appuntamento (irreversibile per il paziente che lo perde). Cancellare un paziente (dati
personali).

Con questo basta per partire. Tutto il resto lo chiederà l'agente, e fa parte dell'esercizio che
lo chieda.

---

## Fase di avvio: lezioni da 0 a 4

Queste cinque lezioni si fanno una volta per progetto, prima di scrivere funzionalità. Sono quelle
che danno più tentazione di saltare ("voglio vedere qualcosa che funziona"), e sono quelle che
costa più caro saltare. Un consiglio pratico: falle in una settimana, di fila, e solo dopo apri il
ciclo.

### Lezione 0 — Questo progetto si può affrontare così?

**Cosa devi capire.** Il metodo non serve per qualunque progetto, e saperlo prima di cominciare è
la prima decisione di qualità. Ci sono due condizioni senza le quali non funziona: che ci sia un
repository standard in cui lasciare la prova (X1), e che le schermate si possano operare da
programma per provare end to end, dalla schermata fino al backend (X2). Se una delle due manca,
l'agente non potrà verificarsi da solo, e allora finirai per leggere codice tu, che è proprio ciò
che il metodo promette di evitare. Poi ci sono criteri che pesano (se c'è un proprietario con
tempo, se l'errore ha conseguenze, se si può provare in un ambiente a parte, ecc.), che stiamo
ancora calibrando con i primi progetti.

Per il progetto guida le due condizioni sono soddisfatte: è un progetto nuovo (non c'è legacy) e
lo costruiremo con un'interfaccia web operabile da programma. Per un progetto tuo, questa lezione
può finire con "non va", e questo è un risultato valido del corso.

**Il compito.**

1. Scrivi, a mano, in un file `docs/INITIAL_SURVEY.md`, ciò che sai del progetto: cosa vuole il
   cliente, per chi, cosa succede oggi senza il sistema, quale tecnologia c'è o si propone, se c'è
   un sistema precedente e se ha un repository, chi è il proprietario e quanto tempo ha, quale
   conseguenza ha un errore, quali ambienti ci saranno. Mezza pagina. Non importa che sia
   incompleto; anzi, fa parte dell'esercizio che sia incompleto.
2. Copia la scheda dei criteri del documento principale (gli escludenti X1 e X2 e i candidati da
   D1 a D10) in `docs/ELIGIBILITY_CRITERIA.md`.
3. Apri l'agente nella cartella del progetto (ancora vuota salvo quei due file) e incollagli
   questo prompt:

> We are going to assess whether this project can be run with the Urazuke method. Read the
> initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`. First, evaluate whether the survey is sufficient to answer
> every criterion. If any criterion cannot be answered from the survey, ask me for the missing
> information before going on; do not assume. Then fill in the sheet criterion by criterion:
> the answer, where it comes from, and for each exclusionary criterion whether it is green or
> red. Do not decide: present me the completed sheet with your reading and your doubts, and I
> will decide. Reply in my language.

   Gli stai chiedendo di leggere i due file, di **valutare se la rilevazione basta e chiedere ciò
   che manca prima di rispondere** (questa clausola si ripete in tutti i prompt del corso; è il
   cuore del metodo), di completare la scheda dicendo da dove viene ogni risposta, e di non
   decidere: la decisione è tua.

4. Rispondi alle sue domande. Se non te ne ha fatta nessuna, diffida e chiedigli cosa ha supposto.
5. Quando ti presenta la scheda, leggila e decidi. Poi incollagli il prompt di chiusura:

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.

**Verifica di completezza.** Apri `docs/ELIGIBILITY.md` e chiediti: i due escludenti hanno
risposta esplicita e fonte? C'è qualche criterio risposto con "probabilmente"? (Se c'è, l'agente
doveva chiedere.) La decisione ha data e nome? Le condizioni, se ci sono, si possono verificare?
Ci sono le domande che ha fatto e le tue risposte?

**Risultato da consegnare.** `docs/ELIGIBILITY.md`, di una pagina.

**Errori tipici.** Scrivere la rilevazione "completa" perché l'agente non chieda: ti perdi
l'esercizio e, peggio, ti abitui a fare il lavoro del modello. Rispondere "va" con cinque
condizioni: è un "non va" travestito. E il più comune: saltare la lezione perché "è ovvio che va".
L'ovvio è ciò che non si scrive, e ciò che non si scrive è ciò che poi si discute.

**Nel progetto guida.** L'agente dovrebbe chiedere, come minimo, se l'interfaccia sarà web o
mobile (perché X2 dipende da questo), se c'è un sistema precedente anche solo un Excel, e quale
canale di messaggi si userà (WhatsApp ha requisiti che l'email non ha). La scheda finisce con
"va", con una condizione ragionevole: avere il canale di messaggi definito prima del gradino 12.

### Lezione 1 — Il patto di convivenza

**Cosa devi capire.** L'agente arriva a ogni sessione senza memoria della precedente. È come un
collaboratore nuovo ogni mattina. Il patto di convivenza è ciò che gli dici il primo giorno e ciò
che rileggerà tutti i giorni: come lavori, cosa non tolleri, quale livello di autonomia gli dai.
Senza patto, gli ripeterai le stesse cose ogni sessione, e ogni volta un po' diverse.

Le sei regole minime hanno ciascuna un fallimento dietro: "il mio tempo è sacro" evita che ti
consulti per ogni dettaglio; "zero debito" evita il "lo sistemo dopo"; "perimetro esatto" evita che
"già che c'è" ti aggiunga cose; "documentazione nello stesso commit" evita i manuali vecchi; "mai
riferire come fatto il non verificato" evita il "fatto" che non lo era; "parla la mia lingua" evita
che ti risponda in inglese perché il prompt era in inglese.

**Il compito.**

1. Pensa cinque minuti a come lavori: preferisci che ti chieda molto o poco? In quale lingua? Cosa
   ti fa perdere la pazienza nel lavorare con altre persone? Annotalo in una lista breve; glielo
   racconterai quando chiederà.
2. Incollagli questo prompt:

> Before we write any code, we are going to set the working agreement between you and me.
> Write `docs/WORKING_AGREEMENT.md` with at least these rules, each with one line explaining
> what it prevents: (1) My time is sacred: do not ask me what you can resolve on your own, and
> when you do ask, ask in prose, with your recommendation. (2) Zero technical debt: whatever
> breaks is fixed at the root, with its regression test, in the same session. (3) Exact scope:
> no more and no less than what was asked; if you see something else, log it as a pending item,
> do not do it. (4) Documentation is updated in the same commit as the change. (5) Never report
> as done something you have not verified; always separate what you verified from what you
> believe. (6) Speak my language. Add any rules you think this project needs, marked as
> proposals. If you need to know something about how I work in order to write this, ask me.

   Gli stai chiedendo le sei regole con il fallimento che ciascuna evita, regole proprie segnate
   come proposte perché tu le accetti o le rifiuti, e che ti faccia domande su di te.

3. Rispondi alle sue domande. Leggi le proposte: accetta quelle che ti servono, rifiuta quelle
   che no, sempre con una ragione di una riga.
4. Chiudi con:

> I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the
> agreement with today's date and a version number. Then add to the project file the
> instruction to read this agreement at the start of every session.

   Se ancora non c'è un file di progetto (lo fai nella lezione 2), ne creerà uno minimo con
   quell'istruzione; va bene.

**Verifica di completezza.** Ci sono le sei regole, ciascuna con il fallimento che evita? Ce n'è
qualcuna scritta come aspirazione ("cercare di…")? Il file di progetto ordina di leggerlo
all'inizio di ogni sessione? Ti ha fatto almeno una domanda su come lavori?

**Risultato da consegnare.** `docs/WORKING_AGREEMENT.md` con data e versione, agganciato al file
di progetto.

**Errori tipici.** Accettare venti regole perché suonano tutte bene: nessuno ne rispetta venti; sei
o otto si rispettano. Lasciare una regola che dica che l'agente può cambiare il patto: no. E il
più silenzioso: non provare mai se lo legge. Nella lezione 2 vedrai come.

**Nel progetto guida.** Una regola propria che l'agente di solito propone per Turnera, e che vale
la pena accettare: "non invio mai un messaggio reale a un paziente da un ambiente che non sia la
produzione; in prova, i messaggi vanno in una casella finta". È il gradino 12 che si affaccia
presto.

### Lezione 2 — La definizione del progetto e la lettura obbligatoria

**Cosa devi capire.** Il file di progetto (`PROJECT.md`, o `CLAUDE.md`, o il nome che usa il tuo
strumento) è la mappa che l'agente legge all'inizio di ogni sessione. Deve essere **corto**: cos'è
il sistema, per chi, cosa NON è, i moduli, le decisioni prese con data, e l'ordine di leggere il
patto. Ciò che è successo ogni giorno non va lì: va nello stato vivo (`docs/STATUS.md`) e nel
registro delle voci in sospeso. Uno dei sistemi di origine del metodo ha lasciato crescere questo
file fino a 9.661 righe; in quello stato non lo legge nessuno, e nemmeno il modello.

La sezione "cosa NON è" è la più importante e quella che tutti lasciano vuota. Ciò che non è
scritto è ciò che il modello inventerà quando si imbatterà in un buco.

**Il compito.**

1. Completa `docs/INITIAL_SURVEY.md` con ciò che hai imparato nella lezione 0 (le risposte alle
   domande dell'agente). Aggiungi una sezione "cosa NON deve fare il sistema", anche solo con due
   voci.
2. Incollagli:

> We are going to define the project in writing. Read the business survey in
> `docs/INITIAL_SURVEY.md` and the working agreement in `docs/WORKING_AGREEMENT.md`. Evaluate
> whether the survey is sufficient to describe the system, its users and its boundaries; if it
> is not, ask me for what is missing before writing anything. Then write `PROJECT.md`, three
> hundred lines at most, with: what the system is and for whom; what it is NOT; the main
> modules as a list; the decisions already made, each with its date; and the instruction to
> read this file and the working agreement at the start of every session. Separately, create
> `docs/STATUS.md` for the living state (what is being worked on, what is open): that file
> changes every day; `PROJECT.md` almost never does. Reply in my language.

   Gli stai chiedendo di chiedere prima di redigere, un file di progetto corto con la sezione
   "cosa non è", decisioni con data, e lo stato vivo in un altro file.

3. Leggi `PROJECT.md` per intero. Deve starci in cinque minuti. Correggi ciò che non è vero o non
   è tuo.
4. Chiudi con:

> Apply these corrections: [list]. Finalize `PROJECT.md` with today's date. Add to the working
> agreement that the change history never goes into `PROJECT.md`: it goes to `docs/STATUS.md`
> or to the pending-items register.

5. **La prova di lettura.** Chiudi la sessione dell'agente e aprine una nuova. Senza dirgli altro,
   chiedigli: "Cosa non deve fare questo sistema?". Se ti risponde con ciò che dice `PROJECT.md`,
   l'aggancio funziona. Se ti risponde qualunque altra cosa, non sta leggendo la mappa: controlla
   come il tuo strumento carica il file di progetto.

**Verifica di completezza.** `PROJECT.md` si legge in cinque minuti? Dice cosa NON fa il sistema?
Ogni decisione ha data e chi l'ha presa? L'agente ha chiesto qualcosa prima di redigere? Lo stato
vivo è in un altro file? Ha superato la prova di lettura?

**Risultato da consegnare.** `PROJECT.md` (massimo trecento righe) e `docs/STATUS.md`, e la
prova di lettura superata.

**Errori tipici.** Incollare in `PROJECT.md` tutta la specifica che già avevi: è il programma, non
la specifica. Lasciare "cosa non è" vuoto. E non fare la prova di lettura: è l'unico modo di sapere
che i gradini 1 e 2 stanno agendo e non solo esistendo.

**Nel progetto guida.** In "cosa NON è" di Turnera dovrebbero esserci, come minimo: non è un
sistema di cartelle cliniche (non conserva dati medici), non è un gateway di pagamento (usa un
link di pagamento di un fornitore, non elabora carte), e non manda messaggi di marketing (solo
conferme e promemoria). Ognuno di quei tre "no" ti risparmia una conversazione di mezz'ora più
avanti.

### Lezione 3 — Dimensionare prima di progettare l'architettura

**Cosa devi capire.** Ci sono decisioni che, prese male, costano settimane: quale database, se le
chiamate al database sono sincrone o asincrone, quante persone possono usare il sistema
contemporaneamente. E tutte dipendono da numeri che **solo il business ha**: quanti appuntamenti al
giorno, quanti messaggi per appuntamento, quanti anni si conserva. Il modello non può inferire
quei numeri; può inferire ciò che ne deriva (righe all'anno, dimensione in cinque anni). Per questo
il prompt gli esige di distinguere i dati primari dai derivati, e di **chiedere i primari che
mancano invece di stimarli**. Quando il modello stima un dato primario, lo fa con la stessa faccia
sicura di quando calcola; e non hai modo di distinguerlo dal tono.

C'è inoltre un tipo di decisione che conviene prendere sempre: le **asimmetriche**, economiche se
avanzano e carissime se mancano. L'esempio canonico è fare l'interfaccia con il database asincrona
dal primo giorno anche se il primo database è un file: se non cambi mai database, è avanzato un
`await`; se cambi, ti sei risparmiato di riscrivere tutto.

**Il compito.**

1. Siediti con la proprietaria (o con te stesso, se il progetto è tuo) e scrivi
   `docs/VOLUME_SURVEY.md`: le entità principali e quante sono, quante se ne aggiungono al mese,
   quanti eventi per entità, quante persone operano nel picco e quando è il picco, quanto si
   conservano i dati, se ci sono carichi eccezionali, quale crescita si aspettano. Per ogni numero,
   annota da dove viene: "l'ha detto la responsabile", "contato sul quaderno di settembre",
   "supposto". Lasciane alcuni su "supposto" apposta: vedrai cosa fa l'agente con quelli.
2. Incollagli:

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
> Reply in my language.

   Gli stai chiedendo: distinguere primari da derivati; **chiederti i primari che mancano o sono
   su "supposto", e non stimarli mai**; calcolare il derivato con il conto in vista; lo scenario
   "per dieci"; tre opzioni con il costo di passare dall'una all'altra; e di non scegliere.

3. Se ti chiede i "supposti", bene: quello era l'esercizio. Procurati i numeri (chiedi alla
   proprietaria, conta sul quaderno) e daglieli. Se non te li ha chiesti e ha calcolato lo stesso,
   fermati e chiedigli cosa ha fatto con i supposti: è un fallimento del gradino e conviene vederlo
   ora.
4. Leggi le tre opzioni. Rifai un conto a mano (per esempio, righe all'anno della tabella più
   grande): deve darti lo stesso. Scegli.
5. Chiudi con:

> I choose option [B]. Record in `docs/SIZING.md`: the primary data with its source, the derived
> data with its arithmetic, the three options, the chosen one and why, and the decisions we are
> taking "just in case" even though they are not needed today (for example: the persistence
> interface is asynchronous from line one, even if the first engine is synchronous). Include the
> questions you asked and my answers.

**Verifica di completezza.** C'è qualche dato primario con fonte "supposto" o senza fonte? Ogni
dato derivato mostra il conto, e ti torna se lo rifai? Ci sono tre opzioni e una scelta con
ragione? Dice cosa succede "per dieci"? Le decisioni asimmetriche sono scritte? Ti ha chiesto?

**Risultato da consegnare.** `docs/SIZING.md`.

**Errori tipici.** Completare la rilevazione con numeri inventati da te perché l'agente non
chieda (è lo stesso errore della lezione 0, ed è peggio qui perché quei numeri decidono
l'architettura). Scegliere l'opzione "più potente" per sicurezza: il costo di migrare è nella
tabella proprio perché tu scelga la più piccola che regga il "per dieci". E non scrivere le
decisioni asimmetriche: se non sono scritte, nella lezione 4 l'agente non le rispetterà.

**Nel progetto guida.** Primari: 40 appuntamenti/giorno × 250 giorni = 10.000 appuntamenti/anno;
3 messaggi per appuntamento = 30.000 messaggi/anno; 5 anni di conservazione; picco di due
receptionist simultanee. Il "per dieci" è la domanda se si vende ad altri studi: 100.000
appuntamenti e 300.000 messaggi all'anno. Le tre opzioni tipiche: un file SQLite (basta per uno
studio per anni, non regge il per dieci con più persone che scrivono), PostgreSQL dall'inizio
(regge tutto, costa un po' di più di infrastruttura), o SQLite ora con l'interfaccia asincrona e
una migrazione prevista a PostgreSQL (l'asimmetrica). Per il corso scegliamo la terza: è quella
che insegna di più.

### Lezione 4 — Lo scheletro con i suoi cancelli

**Cosa devi capire.** Prima che il sistema faccia qualcosa di utile, deve partire, provarsi e
distribuirsi **vuoto**. Sembra una perdita di tempo ("distribuire cosa, se non c'è nulla?") ed è il
contrario: il percorso verso la produzione è parte del prodotto, e l'unico modo di sapere che
funziona è percorrerlo quando ancora non c'è nulla da perdere. In uno dei sistemi di origine il
deployment è arrivato un mese dopo l'avvio ed è costato cinque voci in sospeso di fila; con lo
scheletro distribuito la prima settimana, quei cinque colpi sarebbero caduti nel vuoto.

I **cancelli** sono le condizioni per passare da una tappa all'altra ("la batteria è in verde",
"il deployment in prova ha funzionato"). Scriverli ora, anche se sembrano ovvi, è ciò che poi
permette di dire "questo non passa" senza discutere.

**Il compito.**

1. Scrivi `docs/ENVIRONMENTS_SURVEY.md`: dove girerà il sistema (un server che già hai, un
   servizio nel cloud), se ci saranno un ambiente di prova e uno di produzione, chi ha accesso a
   cosa, e come si distribuisce oggi se c'è qualcosa. Se non hai nulla, dillo: l'agente ti proporrà
   l'opzione più semplice.
2. Assicurati di avere le credenziali del posto in cui si distribuirà, anche se è un servizio
   gratuito. Senza quelle, lo scheletro resta sulla tua macchina e la lezione non si può finire.
3. Incollagli:

> We are going to build the skeleton of the system, with no functionality at all. Read
> `PROJECT.md`, `docs/SIZING.md` and the environments survey. Evaluate whether you have what is
> needed for the skeleton to run in the test environment (access, URL, deployment method); if
> anything is missing, ask me before starting. Then build: the folder structure; the server and
> the UI starting up; the test structure with one smoke test that passes; continuous
> integration running that test suite on every push; and the deployment to the test
> environment. Declare the gates of the workflow (what must be green to move from one stage to
> the next) in `docs/GATES.md`. When done, take a screenshot of the empty UI running in the
> test environment and show it to me. Do not add any functionality "while you are at it".
> Reply in my language.

   Gli stai chiedendo di verificare gli accessi prima di cominciare, la lista esatta di cosa è
   uno scheletro, i cancelli scritti, uno screenshot reale dell'ambiente di prova, e il divieto di
   aggiungere funzionalità.

4. Questo compito è lungo (una o due ore di lavoro dell'agente) e avrà andirivieni: credenziali
   che mancano, un servizio che chiede di confermare l'email, ecc. È normale. Ciò che non è normale
   è che ti dica "fatto" senza lo screenshot dell'ambiente di prova.
5. Quando ti mostra lo screenshot, apri tu l'URL nel browser. Deve vedersi la stessa cosa.
6. Chiudi con:

> Skeleton approved. Record in `docs/STATUS.md` the test environment URL, the command to run
> the tests and the command to deploy, and mark this step as done. Then run the deployment a
> second time and show me that the second run changed nothing.

**Verifica di completezza.** Hai aperto tu l'URL dell'ambiente di prova e visto la schermata
vuota? C'è un link a un'esecuzione di integrazione continua in verde? Il deployment è stato
eseguito due volte e la seconda non ha rotto nulla? I cancelli hanno ciascuno una condizione
verificabile? C'è qualche funzionalità che non hai chiesto?

**Risultato da consegnare.** Il repository con lo scheletro, l'integrazione continua in verde,
l'URL dell'ambiente di prova funzionante, `docs/GATES.md`, e `docs/STATUS.md` con i tre comandi.

**Errori tipici.** Accettare "funziona in locale, il deployment lo vediamo dopo": no, il
deployment è lo scheletro. Accettare uno screenshot della macchina dell'agente invece
dell'ambiente di prova. E lasciare che "già che c'è" ti aggiunga una schermata di login, un menu,
un logo: ogni cosa che entra senza voce in sospeso è perimetro che è scappato.

**Nel progetto guida.** Lo scheletro di Turnera è una pagina web che dice "Turnera — versione
0.0.1" in esecuzione su un URL pubblico di un ambiente di prova, un server che risponde "ok" su
una rotta di salute, un test di fumo che chiama quella rotta, l'integrazione continua che esegue
quel test a ogni push, e il deployment automatico nell'ambiente di prova. I cancelli: "batteria in
verde per fare il merge", "ambiente di prova in verde per promuovere in produzione", "rollback
provato per il primo deployment in produzione". Nient'altro. Ed è strano quanto sia soddisfacente
vedere quella pagina vuota su un URL reale.

---

## Fase del ciclo: lezioni da 5 a 10

Queste sei lezioni sono quelle che userai **a ogni modifica**, per tutto il progetto. Si imparano
in un pomeriggio, ma si praticano per settimane. L'idea è che alla fine della fase tu abbia il
riflesso: prendere una voce in sospeso, costruire, provare in rosso, aggiornare l'altra parte,
misurare ciò che va misurato, e riferire separando il verificato dal creduto. Quel riflesso è il
metodo.

Per praticarle avrai bisogno di funzionalità reale. Nel progetto guida, il primo blocco di voci in
sospeso è l'agenda di base: vedere gli appuntamenti del giorno, caricare un appuntamento,
cancellarlo. Niente messaggi né pagamenti ancora; quelli vengono dopo i lucchetti (lezione 12).
### Lezione 5 — Il piano sono le voci in sospeso

**Cosa devi capire.** Non c'è un "piano" da una parte e una "lista di compiti" dall'altra: **la
lista delle voci in sospeso è il piano**. Ogni voce ha un numero, da dove viene (la decisione o la
richiesta che l'ha originata), come si verifica che è fatta, e, quando si chiude, la prova.
Quest'ultima è ciò che guarderai invece di guardare il codice. E una regola d'oro per l'agente:
ciò che compare fuori dalla lista si annota come voce nuova, non si fa.

**Il compito.**

1. Scrivi in `docs/INITIAL_SURVEY.md` (o in un file a parte) la richiesta del cliente per il
   primo blocco di funzionalità, così come la direbbe il cliente, con le sue ambiguità. Per
   Turnera: "voglio vedere gli appuntamenti del giorno, caricarne uno nuovo e cancellare".
2. Incollagli:

> We are going to turn everything that must be done into numbered pending items. Read
> `PROJECT.md`, the client's request and whatever is in `docs/STATUS.md`. If the request is
> ambiguous on any point such that you cannot write a verifiable pending item for it, ask me;
> do not resolve it by assuming. Create `docs/PENDING.md` with one item per thing to do: number
> (PND-001 onwards), one-line title, what is requested, which decision originates it (or
> "client request, date"), how it will be verified as done, and status. Order them by the
> priority I gave you; if I gave none, propose an order and tell me why. Reply in my language.

   Gli stai chiedendo di convertire la richiesta in voci verificabili, di **chiedere quando la
   richiesta non permette di scriverne una verificabile**, e di proporre un ordine con la sua
   ragione.

3. Rispondi alle domande (per Turnera chiederà, per esempio, cos'è "il giorno": quello di oggi, o
   uno qualunque che si scelga?; cancellare elimina o marca?). Quelle domande sono decisioni di
   business; nella lezione 6 vedrai dove si scrivono.
4. Aggiungi al patto di convivenza la routine di ogni sessione. Incollagli:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before touching any code, open
> `docs/PENDING.md`, tell me which item you are taking and why. Every commit cites its pending
> item. A pending item is closed with written evidence (the test, the screenshot, the number),
> never with 'done'. If along the way you see something that is not on the list, add it as a new
> pending item; do not do it."

5. Ora sì, comincia a costruire. Chiedigli di prendere la prima voce in sospeso. Da qui in poi,
   ogni sessione comincia con "quale voce prendi e perché".

**Verifica di completezza.** Ogni voce dice come si verifica? Ci sono voci chiuse senza prova né
commit? Prendi tre commit a caso: citano la loro voce? È comparso nel codice qualcosa senza voce?
Ti ha chiesto dell'ambiguo?

**Risultato da consegnare.** `docs/PENDING.md` con il primo blocco, la routine nel patto, e la
prima voce in corso.

**Errori tipici.** Scrivere voci senza "come si verifica" ("migliorare la schermata degli
appuntamenti"): non si possono chiudere, e allora si chiudono con "fatto". Lasciare che l'agente
chiuda voci senza prova perché "l'ho già visto funzionare". E quello che costa di più correggere:
lasciare che faccia "una cosina in più" fuori dalla lista. La prima volta che glielo lasci fare,
hai perso il perimetro esatto.

**Nel progetto guida.** Il primo blocco di Turnera sono circa sei voci: PND-001 vedere gli
appuntamenti di un giorno; PND-002 caricare un appuntamento con paziente, professionista, data e
ora; PND-003 impedire due appuntamenti dello stesso professionista alla stessa ora; PND-004
cancellare un appuntamento (marcare, non eliminare: decisione della lezione 6); PND-005 cercare un
paziente per nome o telefono; PND-006 la registrazione di un paziente con i dati minimi. Ciascuna
con la sua verifica: "si vede nella schermata e resta nel database", "al tentativo di
sovrapposizione la schermata avvisa e il database non lo salva", ecc.

### Lezione 6 — Le decisioni si scrivono accanto al codice

**Cosa devi capire.** Il modello, quando trova un buco nelle regole di business, **lo riempie**.
Non si ferma a chiedere; completa con ciò che gli sembra più probabile, con la stessa naturalezza
con cui scrive il resto. Per questo questa lezione non è "scrivi le decisioni" ma "esigi che si
fermi e chieda quando ne manca una". E quando decidi, la decisione si scrive con le tue parole
testuali, il tuo nome e la data, nel commit e in un registro. Sei settimane dopo, quando qualcuno
chiederà "perché cancellare non elimina?", la risposta è scritta ed è tua.

**Il compito.**

1. Aggiungi al patto la routine delle decisioni. Incollagli:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Whenever implementing something requires a
> business rule that is not written down, or you must choose between two approaches that change
> what the user sees, stop and ask me, in prose, with your recommendation and the alternative. Do
> not implement the one you prefer. When I decide, write the decision with my name and the date
> in the commit message and in `docs/DECISIONS.md`, with the exact words I used. If I do not
> answer and you must move on, implement the most reversible option and mark it 'decision by
> omission, pending confirmation', so that I can review it."

   Gli stai chiedendo di fermarsi davanti a una regola non scritta, di chiedere con
   raccomandazione e alternativa (perché tu possa decidere in dieci secondi), di registrare le tue
   parole testuali, e, quando non rispondi, di scegliere la più reversibile e segnarla.

2. Continua a costruire le voci del blocco. Ogni volta che ti chiede una regola di business,
   decidi e rispondi con il formato di chiusura:

> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.

3. Fai la prova contraria, una volta, apposta: lascia una domanda senza risposta per una sessione
   e guarda cosa fa. Deve scegliere la più reversibile e segnarla "per omissione". Se ha scelto
   ciò che gli pareva e non l'ha segnato, è un fallimento del gradino: correggilo nel patto.

**Verifica di completezza.** Apri tre commit che toccano regole di business: citano chi ha deciso
e quando? Ci sono decisioni "per omissione" non confermate? C'è qualche regola nel sistema che non
riconosci come tua? Le frasi sono testuali o "migliorate"?

**Risultato da consegnare.** `docs/DECISIONS.md` che cresce, con almeno cinque decisioni del
primo blocco, e i commit che le citano.

**Errori tipici.** Rispondere alle domande in chat e non esigere che restino scritte: alla terza
sessione nessuno si ricorda più. Lasciare che l'agente "migliori" le tue parole: una regola
parafrasata è una regola diversa. E il più grave: scoprire in produzione una regola che nessuno ha
deciso. Quando succede (succederà), non è un bug: è un fallimento del gradino 6, e si corregge nel
patto, non solo nel codice.

**Nel progetto guida.** Decisioni tipiche del primo blocco di Turnera: "cancellare marca
l'appuntamento come cancellato e salva chi e quando; non si elimina nulla"; "un professionista
non può avere due appuntamenti alla stessa ora, ma sì due pazienti in un appuntamento doppio se il
professionista l'ha abilitato"; "il telefono del paziente è obbligatorio; l'email no". Ciascuna
con data e con il nome della responsabile.

### Lezione 7 — I test come lucchetti, provati in rosso

**Cosa devi capire.** Questa è la lezione centrale del corso. Un test che non hai mai visto fallire
non sai se prova qualcosa. Il modello scrive il codice e il test nella stessa sessione, con la
stessa comprensione: se ha capito male la richiesta, il test prova ciò che ha capito, e passa.
L'unico modo economico di sapere che il test guarda ciò che conta è **vederlo in rosso contro il
codice vecchio**: se anche il codice di prima della modifica lo passa, il test non distingue il
prima dal dopo, e allora non serve. Per questo la richiesta non è "scrivi test" ma "mostrami il
rosso, poi il verde, poi la regressione".

E una seconda idea: le prove end to end. Un test che verifica dalla schermata (clicca, digita,
legge) e controlla l'effetto nel backend (la riga è rimasta, lo stato è cambiato) è quello che
sostituisce la tua lettura del codice. È il criterio X2 della lezione 0 trasformato in pratica.

**Il compito.**

1. Aggiungi al patto la routine della prova. Incollagli:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "To close a pending item I need evidence,
> not your word. (1) Write the test that proves what the item asks for. (2) Demonstrate that this
> test fails against the previous code: you may temporarily revert the change, or run the test
> against the old version, but show me the red output. (3) Show me the green output with the
> change. (4) Run the regression suite for the neighbouring items and show me it is still green.
> (5) Do not replace with mocks the very part you are trying to test. If testing end to end
> requires something you lack (data, access, an environment), ask me for it; do not simulate what
> you do not have. Finally, the commit message says 'proved red against [what]' and the test
> counts."

   Gli stai chiedendo il test, **il rosso dimostrato con l'output in vista**, il verde, la
   regressione dei vicini nella stessa sessione, niente simulazione proprio di ciò che si prova, e
   di chiedere ciò che manca per provare end to end invece di simularlo.

2. Prendi la voce della sovrapposizione (PND-003 in Turnera, o l'equivalente nel tuo progetto:
   una regola che impedisce qualcosa). Chiedigli di chiuderla con la routine. Leggi il rapporto:
   deve esserci un output in rosso con numeri ("1 su 1 fallisce contro la versione senza la
   regola") e poi il verde.
3. Chiedigli un test end to end per quella stessa voce: che apra la schermata, tenti di caricare
   la sovrapposizione, legga l'avviso, e controlli nel database che non è stata salvata. Se ti dice
   che non può perché la schermata non si può operare da programma, fermati: è X2 che fallisce, e
   va sistemato ora (aggiungere identificatori agli elementi della schermata) prima di continuare.
4. Quando l'agente dice che qualcosa "non si può provare", incollagli:

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

**Verifica di completezza.** Il rapporto mostra il rosso, con numeri? La regressione è girata
nella stessa sessione, con numeri? C'è qualche parte simulata proprio dove c'è la modifica? Il
commit dice "provato in rosso"? Il test di schermata verifica anche il backend?

**Risultato da consegnare.** Almeno tre voci chiuse con la routine completa (rosso, verde,
regressione), una delle quali con un test end to end.

**Errori tipici.** Accettare "i test passano" senza numeri e senza rosso. Accettare che la
batteria si "acceleri" sostituendo le prove end to end con simulazioni. E lasciar passare un "non
si può provare" senza aprire la voce: la non testabilità è debito, e il debito si registra.

**Nel progetto guida.** Il rosso della sovrapposizione si vede così: l'agente toglie
temporaneamente la regola, esegue il test, e l'output dice che il test è fallito perché il secondo
appuntamento è stato salvato. Rimette la regola, esegue, verde. Poi la regressione: i test di
PND-001 e PND-002 restano in verde. E quello end to end: un browser controllato da programma carica
il modulo, preme "salva", legge il messaggio "quell'orario è già occupato", e una query al database
conferma che c'è un solo appuntamento a quell'ora. Quando vedrai quel rapporto per la prima volta,
capirai a cosa serve tutto il metodo.

### Lezione 8 — Simmetria tra produttore e consumatore, e il registro degli anti-pattern

**Cosa devi capire.** Quando cambi un'estremità del sistema (il server, il database, un robot),
l'altra estremità (la schermata, un contatore, un report) deve cambiare nello stesso commit.
Altrimenti divergono, e l'utente vede un numero da una parte e un altro dall'altra. Il principio
che lo evita è semplice da enunciare e difficile da sostenere: **ogni lista ha un solo
proprietario**. Gli stati possibili di un appuntamento, le colonne di un report, le cause per cui
qualcosa attende: le definisce una sola parte (il produttore) e le altre le leggono da lì. Appena ci
sono due copie, una è disallineata; manca solo sapere quale.

La seconda metà della lezione è il registro degli anti-pattern (GOTCHAS): gli errori che hai già
pagato una volta, annotati con il loro odore, la loro causa radice, la loro correzione e come
rilevarli prima. L'importante non è annotarli: è aggiungere la verifica automatica che li rilevi,
perché un anti-pattern annotato e non automatizzato si ripete quando cambia la sessione.

**Il compito.**

1. Chiedigli la mappa dei contratti:

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

   Gli stai chiedendo l'inventario dei contratti con le loro due parti, e che ciò che non vede lo
   dichiari invece di ometterlo.

2. Aggiungi la routine al patto:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before closing any change that touches a
> contract, look up every consumer in the map and update them in the same commit. Always prefer
> that the producer defines the list (columns, causes, states) and the consumer reads it, rather
> than each keeping its own copy. If the map does not have that relationship, add it."

3. Fai la prova della lista: scegli una lista che compare nella schermata (in Turnera, gli stati di
   un appuntamento: in attesa, confermato, cancellato, assente) e chiedi all'agente di mostrarti
   dove è definita e dove si legge. Se ci sono due definizioni, chiedigli di lasciarne una sola.
4. La prima volta che qualcosa si rompe per la seconda volta (succederà nelle prossime settimane),
   incollagli:

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

**Verifica di completezza.** Scegli un contratto della mappa: ogni consumatore lo legge dal
produttore o ha la sua copia? C'è un numero mostrato su due schermate che dia lo stesso? Ogni voce
di GOTCHAS ha le quattro parti? Si è ripetuto qualcosa che era già annotato?

**Risultato da consegnare.** `docs/PRODUCER_CONSUMER_MAP.md`, la routine nel patto, e
`docs/GOTCHAS.md` (anche se parte con una sola voce).

**Errori tipici.** Fare la mappa una volta e non guardarla più: deve crescere con ogni contratto
nuovo. Annotare anti-pattern come aneddoti ("una volta è successo che…") senza la parte "come
rilevarlo prima". E il classico: lo stesso testo di uno stato scritto a mano nel server e nella
schermata; il giorno in cui uno cambia, l'altro resta.

**Nel progetto guida.** La mappa di Turnera ha, all'inizio, quattro o cinque contratti: la lista
degli stati di appuntamento (la definisce il server, la leggono la schermata e il report mensile);
la tabella degli appuntamenti (la scrive il caricamento, la leggono l'agenda del giorno e il
report); la tabella dei pazienti; e, più avanti, la coda dei messaggi (la scrive l'agenda, la legge
l'inviatore). Il primo GOTCHA di solito è di date: l'agenda mostrava l'appuntamento nel giorno
sbagliato perché il server salvava in un fuso orario e la schermata mostrava in un altro. Odore:
"l'appuntamento delle 23 compare domani". Causa radice: due fusi orari. Correzione: uno solo, nel
server. Rilevamento: un test con un appuntamento alle 23:30.

### Lezione 9 — Misurare prima di costruire, con uno strumento che a sua volta si verifica

**Cosa devi capire.** Il modello produce affermazioni con numero ("ci sono circa 120 query di
quel tipo") e suonano esattamente uguali quando sono misurate e quando sono stimate. Tu non puoi
distinguerle dal tono. L'unico modo è esigere lo strumento: "con cosa l'hai misurato? mostrami il
comando". La regola del gradino è che **nessun numero che decide qualcosa esce da un'impressione**:
esce da un misuratore che vive nel repository, che ha un test che lo verifica contro un caso noto,
e che tu puoi eseguire.

E c'è qualcos'altro, che abbiamo imparato a suon di botte: anche i misuratori mentono. In uno dei
sistemi di origine, un misuratore dava zero perché non vedeva una parte del codice, e un altro
diceva 27 quando erano 44. Per questo l'audit in due direzioni: dal codice alla misura (tutto ciò
che dovrebbe essere contato è contato?) e dalla misura al codice (tutto ciò che è contato esiste
davvero?).

In un progetto piccolo, "misurare" è modesto: contare quante query fa una schermata quando si
carica, quanto impiega il report mensile, quanti messaggi sono stati inviati ieri. Non serve un
cricchetto né un budget per percorso. Ciò che serve è che il numero abbia un comando dietro.

**Il compito.**

1. Scegli un'ipotesi. In Turnera, una buona: "l'agenda del giorno fa una query al database per
   ogni appuntamento che mostra" (il classico ciclo N+1). Se non è vera, meglio: vedrai come si
   verifica un'ipotesi falsa.
2. Incollagli:

> Before building anything, we are going to measure. The hypothesis is: [the day view runs one
> database query per appointment shown]. Write a meter (a script that lives in the repository)
> that measures [the number of queries the day view runs for a day with N appointments], and a
> test for the meter that checks it against a known case where the answer is known in advance.
> If measuring requires access or data you lack, ask me; do not approximate silently. If some
> part can only be approximated, mark it as approximate and tell me the margin. Run the meter,
> show me the number together with the command that produces it, and audit it in both
> directions: from the code to the measurement (is everything that should be counted, counted?)
> and from the measurement to the code (does everything counted actually exist?). Only then
> propose what to build. Reply in my language.

   Gli stai chiedendo il misuratore nel repository, il test del misuratore, di chiedere ciò che gli
   manca invece di approssimare, di segnare l'approssimato, il numero con il comando, l'audit in
   due direzioni, e l'ordine: prima misurare, poi proporre.

3. Esegui tu il comando che ti ha dato. Deve darti lo stesso numero. Non serve che tu capisca lo
   script; serve che tu lo esegua.
4. Se l'ipotesi era vera e l'agente propone di sistemarlo, chiedigli un budget:

> Set the budget for [queries] on this path at the measured value plus a small margin, and
> protect it with a test that fails if it is exceeded. Tell me the number and the margin.

   Così, se qualcuno rimette il ciclo tra tre mesi, la batteria lo rileva.

5. Aggiungi al patto la regola cinque, per quando un piano porta numeri:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before executing a plan that asserts
> numbers, verify every number with the meter. If any does not match, stop and tell me; do not
> execute on a wrong number."

**Verifica di completezza.** Hai eseguito il misuratore e ti ha dato lo stesso? Ha un test, contro
quale caso noto? C'è qualche numero nel rapporto senza misuratore dietro? L'approssimato è segnato?
C'è un budget con test?

**Risultato da consegnare.** Un misuratore nel repository con il suo test, un numero con il suo
comando e data in `docs/STATUS.md` o nella voce in sospeso, e (se corrispondeva) un budget
protetto da un test.

**Errori tipici.** Accettare il numero senza eseguire il comando: metà del valore di questa
lezione sta nel fatto che lo esegua tu. Un misuratore che dà zero: quasi mai è zero; quasi sempre
non sta vedendo qualcosa. E lasciare che l'agente "sistemi mentre misura": l'ordine è il metodo.

**Nel progetto guida.** Il misuratore di Turnera è uno script che carica un giorno con 10, 50 e
200 appuntamenti in un database di prova, apre l'agenda di quel giorno contando le query, e scrive
i tre numeri. Il test del misuratore verifica che con 0 appuntamenti conta esattamente le query di
base (diciamo, 2). Se c'era il ciclo, i numeri sono 12, 52 e 202; si sistema, diventano 3, 3 e 3,
e il budget resta a 4 con un test che fallisce se l'agenda fa più di 4 query per qualunque numero
di appuntamenti.

### Lezione 10 — Verifica onesta e rapporto proporzionato

**Cosa devi capire.** Se tu non leggerai codice, il rapporto dell'agente deve essere affidabile, e
questo non succede da solo. Il modello è stato addestrato per essere utile e completo, e un
rapporto che dice "questo non ho potuto verificarlo" sembra meno utile di uno che dice "fatto".
Quindi bisogna **chiedergli esplicitamente** le cattive notizie, i punti ciechi e ciò che non ha
fatto. Se non glielo chiedi, non te lo dà; non perché lo nasconda, ma perché non lo considera parte
della risposta.

La struttura che lo rende onesto sono tre blocchi: **verificato** (con la prova accanto),
**creduto** (ciò che pensa funzioni e perché non l'ha provato), e **punti ciechi** (ciò che non
può vedere da dove si trova). E una regola: le cattive notizie prima.

**Il compito.**

1. Aggiungi al patto la routine del rapporto:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "When you report, separate three blocks:
> VERIFIED (what you tested, with the command and its output), BELIEVED (what you think works but
> did not test, and why not), and BLIND SPOTS (what you cannot see from where you are: another
> environment, real data, the user's browser). Cover every item I asked for, one by one, even when
> the answer is 'I did not do it'. No claim without its proof next to it. Do not say 'done': say
> what is done and how you know it. If something went wrong, say it first."

2. Chiedigli di chiudere la prossima voce in sospeso e leggi il rapporto con la lista di verifica
   qui sotto. La prima volta, quasi sicuramente, il blocco "punti ciechi" sarà vuoto. Chiedigli:
   "cosa non puoi vedere da dove sei?". Deve esserci qualcosa (il tuo browser, l'ambiente di
   produzione, i dati reali). Se insiste che niente, insisti tu.
3. Pratica il "è ancora rotto". Chiedigli qualcosa di piccolo, verifica nell'ambiente di prova, e
   se per qualunque ragione non vedi la modifica (è comune: il deployment è lento, o non è stato
   fatto), digli "è ancora rotto" e incollagli:

> Before diagnosing again, compare the version running where I see the problem with the version
> that contains your fix. Tell me both. If they differ, the problem is publication, not code.

   La metà degli "è ancora rotto" sono correzioni che stanno nel repository e non nel posto dove
   tu guardi. Questa clausola ti risparmia ore.

**Verifica di completezza.** Ci sono i tre blocchi? Hai scelto a caso un'affermazione di
"verificato" e ha la sua prova accanto, e l'hai potuta riprodurre? Copre ogni voce di ciò che hai
chiesto? Le cattive notizie sono all'inizio? Ha mai detto "fatto" secco?

**Risultato da consegnare.** La routine nel patto e tre rapporti consecutivi con i tre blocchi,
uno dei quali con un punto cieco reale.

**Errori tipici.** Leggere solo il blocco "verificato" e saltare gli altri due: gli altri due sono
quelli che ti proteggono. Accettare "dovrebbe funzionare" dentro "verificato": è "creduto"
travestito. E abituarsi a rapporti sempre più lunghi: un rapporto gonfiato sta coprendo qualcosa
con il volume.

**Nel progetto guida.** Un buon rapporto di chiusura di PND-004 (cancellare un appuntamento) in
Turnera: "VERIFICATO: il test di cancellazione passa (1/1, provato in rosso contro la versione che
eliminava); regressione 6/6; nell'ambiente di prova, l'appuntamento 17 del 3 novembre risulta
cancellato da 'reception1' alle 10:42 (screenshot). CREDUTO: il report mensile conterà bene le
cancellazioni, ma non l'ho provato perché il report è PND-011 e ancora non esiste. PUNTI CIECHI:
non posso vedere come appare lo stato 'cancellato' sul cellulare della receptionist; provalo tu."

---

## Fase di esercizio: lezioni da 11 a 15

Queste cinque lezioni sono quelle che trasformano "funziona" in "si può sostenere". Si fanno
quando il primo blocco di funzionalità è costruito con il ciclo, e prima che il sistema agisca sul
mondo (mandi messaggi, incassi) o abbia utenti reali. Nel progetto guida, è il momento di
aggiungere i promemoria e la caparra, e per questo la lezione 12 (lucchetti) va prima di costruire
quelle funzionalità, non dopo.

### Lezione 11 — L'audit periodico come input del piano

**Cosa devi capire.** Ogni tanto bisogna guardare l'intero sistema con occhi freschi, e ciò che si
vede non va in un rapporto che si archivia: va nella lista delle voci in sospeso. La parte
importante è "occhi freschi": chi fa l'audit non deve essere chi ha costruito, perché ne condivide
i presupposti. Un modello che ha costruito un modulo "sa" che la password scritta nel codice era
provvisoria; un modello che lo vede per la prima volta la segnala per ciò che è. Non serve un'altra
azienda: basta **un'altra sessione, con un altro file di istruzioni, che non abbia partecipato**.

**Il compito.**

1. Apri una sessione nuova dell'agente in una copia pulita del repository (clonalo in un'altra
   cartella). Se il tuo strumento lo permette, dagli un file di istruzioni diverso, che dica solo
   "sei un auditor; non hai costruito questo sistema". Dagli accesso in sola lettura all'ambiente
   di prova.
2. Incollagli:

> Audit this system for [integrity, security, performance and code quality]. Read-only: change
> nothing except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires
> access you lack (the database, the log, an environment), tell me and mark that part as not
> audited; do not pass it as fine. Go through all of the code, not a sample. For every finding:
> where it is (file and line), what the risk is, what evidence proves it (the command, the
> query, the number), and its priority: P0 must be fixed now, P1 soon, P2 when possible. Give a
> grade to every dimension you audited. End with the list of P0 findings turned into proposed
> pending items. Reply in my language.

   Gli stai chiedendo sola lettura, di dichiarare ciò che non ha potuto verificare invece di
   approvarlo per omissione, tutto il codice e non un campione, ogni rilievo con posizione,
   rischio, prova e priorità, voti per dimensione, e i P0 già come voci in sospeso proposte.

3. Leggi il rapporto. Scegli due rilievi e chiedi all'auditor di mostrarti la prova (il comando,
   la riga). Deve poterlo fare.
4. Torna alla sessione del costruttore e incollagli:

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.

5. Ripeti questa lezione prima del primo deployment in produzione (lezione 13) e, dopo, ogni uno
   o due mesi.

**Verifica di completezza.** Il rapporto dice cosa NON ha potuto verificare? Due rilievi a caso
hanno file, riga e prova riproducibile? Ogni P0 ha la sua voce aperta? I voti si potranno
confrontare con il prossimo audit? Ha fatto l'audit una sessione diversa da quella che ha
costruito?

**Risultato da consegnare.** `docs/AUDIT_[data].md` e le voci P0/P1 aperte.

**Errori tipici.** Fare l'audit con la stessa sessione che ha costruito: confermerà i propri
presupposti. Accettare un rapporto senza nessun P0 in un sistema con più di un mese di vita: quasi
mai è vero. E archiviare il rapporto senza aprire le voci: lì l'audit non è servito a nulla.

**Nel progetto guida.** Il primo audit di Turnera di solito trova: dati di pazienti nel log
(telefoni stampati all'invio dei messaggi: P0); la ricerca di pazienti per nome senza indice (P1,
si noterà a 5.000 pazienti); il modulo di appuntamento senza validare che la data sia futura (P1);
e qualche dipendenza con una vulnerabilità nota (P1). Quattro voci nuove, tutte con file e riga.

### Lezione 12 — Fail-closed, lucchetti e zero danno silenzioso

**Cosa devi capire.** Il software, di default, davanti al dubbio va avanti: se la validazione
fallisce, il codice prosegue; se il servizio non risponde, si assume che vada tutto bene. È
"fail-open", come una porta che si apre quando va via la luce. Il metodo inverte il default: **nel
dubbio, no**. Ogni azione con conseguenze (incassare, inviare, cancellare, approvare) porta un
lucchetto, ha una via del ritorno scritta, e ogni automazione nuova parte in modalità di prova,
registrando ciò che avrebbe fatto, finché non la abiliti tu.

Questa lezione va **prima** di costruire le funzionalità che agiscono sul mondo. In Turnera, prima
dei promemoria e della caparra.

**Il compito.**

1. Scrivi `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` con la proprietaria: cosa fa o farà il sistema
   che incassa, invia, approva, cancella o avvisa qualcuno all'esterno; cosa succede se si fa due
   volte; cosa succede se si fa male; come si annulla.
2. Incollagli:

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock. Reply in my language.

   Gli stai chiedendo di confrontare ciò che il business ha detto con ciò che il codice fa (lì
   compaiono le azioni che nessuno ricordava), di chiedere le differenze, e per ogni azione la
   reversibilità, il lucchetto e la via del ritorno, con la regola del fail-closed scritta.

3. Conferma lucchetto per lucchetto. Chiudi con:

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.

4. Ora costruisci le funzionalità con conseguenze (i promemoria, la caparra) con il ciclo delle
   lezioni da 5 a 10, e lasciale in modalità di prova. Guarda per qualche giorno il registro di
   "avrebbe inviato" prima di abilitare l'invio reale.

**Verifica di completezza.** Ogni azione che incassa, invia, approva o cancella è nella tabella?
Ogni lucchetto ha il suo test in rosso? Ogni azione irreversibile ha una via del ritorno scritta?
Le automazioni nuove sono partite in modalità di prova e hai visto il registro prima di
abilitarle?

**Risultato da consegnare.** `docs/LOCKS.md`, un test per lucchetto provato in rosso, e le
automazioni in modalità di prova con il loro registro.

**Errori tipici.** Abilitare l'invio reale "per provare con un messaggio al mio telefono": la
modalità di prova esiste proprio per quello. Un lucchetto che si aggira con un parametro "per i
test": quel parametro resterà attivo in produzione. E non guardare il registro di "avrebbe fatto":
è l'unica finestra per vedere un errore prima che arrivi a un paziente.

**Nel progetto guida.** La tabella dei lucchetti di Turnera: inviare promemoria (non reversibile;
lucchetto: idempotenza per appuntamento, un solo invio per appuntamento e canale, limite di 200 al
giorno, modalità di prova prima; ritorno: nessuno, per questo il limite); incassare caparra
(reversibile con rimborso; lucchetto: conferma esplicita della receptionist, importo fissato dal
professionista; ritorno: rimborso tramite il fornitore di pagamenti); cancellare appuntamento
(irreversibile per il paziente; lucchetto: conferma e registro di chi; ritorno: ricreare
l'appuntamento); cancellare paziente (irreversibile; lucchetto: doppia conferma, solo la
responsabile, e solo se non ha appuntamenti futuri; ritorno: nessuno, per questo doppia). Ogni
lucchetto con un test che mostra che, senza il lucchetto, l'azione avveniva.

### Lezione 13 — Integrazione continua, ambienti, segreti e deployment come parte del prodotto

**Cosa devi capire.** Arrivare in produzione deve essere un pacchetto riproducibile: i test girano
**una** volta, il deployment solo impacchetta e carica, la configurazione vive sul server e non nel
repository, c'è una procedura per promuovere da prova a produzione che si può eseguire due volte, e
il rollback è **provato** (un rollback mai provato non esiste). Sui segreti, una regola senza
eccezioni: **un segreto che è stato visto in una chat, in un log o in un commit non è più un
segreto**; si ruota, e basta.

Hai già buona parte di questo dallo scheletro (lezione 4). Questa lezione lo completa verso la
produzione.

**Il compito.**

1. Completa `docs/ENVIRONMENTS_SURVEY.md` con ciò che manca per la produzione: il dominio, dove
   vivranno i segreti, quanta quota di integrazione continua hai (se usi GitHub Actions, guarda il
   limite del piano: uno dei sistemi di origine l'ha bruciata eseguendo i test tre volte per
   commit).
2. Incollagli:

> We are going to close the path to production. Read the environments and access survey.
> Evaluate whether you have what is needed to deploy to production safely (access, domain,
> where the secrets live, how to roll back); if anything is missing, ask me. Then set up: (1)
> continuous integration runs the full test suite exactly once per commit; (2) the deployment
> waits for that run's result and only packages and uploads, without running tests again; (3)
> each environment's configuration lives on the server (environment file or vault), never in the
> repository; (4) a written procedure to promote from the test environment to production, which
> can be run twice without breaking anything; (5) the rollback, tested; (6) an automatic check
> that prevents committing a secret. Document all of it in `docs/DEPLOYMENT.md` so that a person
> can do it by hand without you. Reply in my language.

   Gli stai chiedendo gli accessi prima di cominciare, i test una sola volta per commit, il
   deployment che solo impacchetta, la configurazione fuori, la promozione ripetibile, il rollback
   provato, il lucchetto contro i segreti, e la documentazione per una persona.

3. Prima del primo deployment in produzione, fai l'audit della lezione 11 se non l'hai fatto.
4. Aggiungi al patto la routine di deployment:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before touching production: the test
> environment is green with the same version; the rollback is ready; and tell me what changes in
> the configuration. After deploying: show me the version running in production and an
> end-to-end check on production, read-only."

5. Fai il primo deployment in produzione, con il sistema ancora senza utenti reali. E poi **prova
   il rollback**: chiedigli di tornare alla versione precedente e di mostrarti che è in esecuzione,
   e poi di tornare alla nuova.
6. Se in qualche momento del corso hai incollato un segreto nella chat (una chiave API, una
   password), incollagli:

> That secret is compromised: rotate it now, tell me everywhere else it was used, and add the
> check that would have caught it.

**Verifica di completezza.** Quante volte gira la batteria per commit? (una; chiedi il link). C'è
qualche valore reale di configurazione nel repository? (chiedigli la ricerca vuota). Riusciresti a
seguire `docs/DEPLOYMENT.md` da solo? Il rollback è stato provato, quando, con quale prova? È stato
ruotato ogni segreto comparso nella chat? Sai quanta quota di integrazione continua ti resta?

**Risultato da consegnare.** L'integrazione continua una volta per commit, il deployment che solo
impacchetta, `docs/DEPLOYMENT.md`, il rollback provato, il lucchetto anti-segreti attivo, e il
sistema in produzione (ancora senza utenti).

**Errori tipici.** Il deployment "a mano, veloce, perché è una modifica piccola": le modifiche
piccole rompono la produzione perché nessuno le prova. Il file di esempio della configurazione con
valori che sembrano reali (lo sono). E non provare il rollback fino al giorno in cui ti serve.

**Nel progetto guida.** Per Turnera, l'integrazione continua esegue la batteria (circa 30 test a
questo punto, inclusi quelli end to end) a ogni push; il deployment in prova è automatico al merge
su `main`; la promozione in produzione è un comando che impacchetta la versione che è in prova e la
carica, con la configurazione (la chiave del fornitore di messaggi, quella del fornitore di
pagamenti, l'URL del database) in un file di ambiente sul server che non è nel repository. Il
rollback è lo stesso comando con la versione precedente. E il lucchetto anti-segreti è una verifica
a ogni commit che rifiuta qualunque cosa sembri una chiave.

### Lezione 14 — Documentazione viva e manuali che una persona può seguire senza IA

**Cosa devi capire.** Il sistema deve potersi usare, mantenere e ripristinare senza l'agente e
senza di te. Il criterio per il manuale di ripristino è concreto: **deve poterlo seguire una persona
di fiducia che non programma, alle tre del mattino, con il sistema giù e l'agente senza
connessione**. Se un passo dice "consultare lo sviluppatore", è incompleto. E siccome rigenerare
documentazione con un modello è gratis, la regola diventa "nello stesso commit": ogni modifica che
tocca ciò che l'utente vede, ciò che l'operatore fa o come si distribuisce, aggiorna il manuale
nello stesso commit.

**Il compito.**

1. Aggiungi la routine al patto:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Every change that modifies what the user
> sees, what the operator does, or how the system is deployed, updates the corresponding manual in
> the same commit. If you do not know which manual, ask."

2. Incollagli:

> Generate three manuals from the system as it is today in the test environment: the user
> manual (screen by screen, with real screenshots, in the user's language, no jargon); the
> maintenance manual (how it is built, where everything is, how to run the test suite, how to
> add a module); and the infrastructure and recovery manual (how to deploy, how to roll back,
> how to restore a backup, what to do if it goes down; written for a person who has to do it by
> hand, without AI, at three in the morning). If for any section you need something only the
> business knows (who is responsible for what, which phone number to call), ask me; do not leave
> a gap and do not invent. Each manual carries a date and the system version. Reply in my
> language.

   Gli stai chiedendo i tre manuali con screenshot reali, il criterio delle tre del mattino per
   quello di ripristino, di chiedere ciò che solo il business sa invece di lasciare buchi, e data e
   versione.

3. La prova reale: dai il manuale di ripristino a qualcuno che non programma (la proprietaria, un
   familiare) e chiedigli di seguire la sezione "è caduto" nell'ambiente di prova. Dove si blocca,
   va sistemato il manuale.
4. Dopo la prossima modifica di schermata, verifica che il commit abbia toccato il manuale utente.

**Verifica di completezza.** Uno screenshot a caso coincide con l'ambiente di prova di oggi?
Qualcuno che non programma è riuscito a seguire la sezione "è caduto"? L'ultimo commit che ha
cambiato una schermata ha toccato il manuale? Ci sono buchi tipo "[da completare]"? Ogni manuale
dice per quale versione vale?

**Risultato da consegnare.** I tre manuali con data e versione, e la prova con una persona fatta.

**Errori tipici.** Generare i manuali una volta e non mettere la routine nel patto: dopo due mesi
hanno screenshot di schermate che non esistono più. Un manuale di ripristino che comincia con
"apri una sessione con l'agente". E non fare la prova con una persona: è l'unica verifica che
vale.

**Nel progetto guida.** Il manuale utente di Turnera ha sei schermate con screenshot; quello di
manutenzione spiega dove sta ogni modulo e come eseguire la batteria; e quello di ripristino dice,
in ordine, con i comandi: come sapere se il sistema è giù, come riavviarlo, come tornare alla
versione precedente, come ripristinare il database dall'ultimo backup (che si fa tutte le notti:
anche questo esce da questa lezione), e chi chiamare. La responsabile l'ha seguito nell'ambiente di
prova e si è bloccata su "ripristinare il database" perché il comando assumeva una cartella che lei
non aveva; è stato sistemato il manuale.

### Lezione 15 — L'agente dentro il sistema, e la retrospettiva con i numeri

**Cosa devi capire.** Due cose chiudono il ciclo. La prima è facoltativa: lasciare l'agente
residente in produzione, con perimetro limitato, per diagnosticare e dare supporto senza che tu ci
sia. La regola che lo ordina è che **agisce a nome di qualcuno**: la sua credenziale è associata a
una persona responsabile, e tutto ciò che fa resta registrato a nome di quella persona; non è un
account anonimo, è un dipendente con un capo. La seconda è obbligatoria: la retrospettiva con i
numeri. Cosa è costato, quante voci in sospeso, quali hanno fatto più giri, quali incidenti ci sono
stati e in quale gradino cadono, e **almeno una modifica proposta alla scala**. Una retrospettiva
che non cambia nulla non è stata una retrospettiva.

**Il compito (agente residente, se corrisponde).**

1. Decidi con la proprietaria se il sistema ha bisogno di un agente residente. In Turnera sì: le
   receptionist avranno domande ("perché a questo paziente non è arrivato il promemoria?") a cui
   l'agente può rispondere leggendo il log, senza che nessuno chiami lo sviluppatore.
2. Incollagli:

> We are going to leave you resident in production. First, build the map of the system you will
> need in order to operate it: modules, environments, where each configuration lives, which
> actions are consequential (read `docs/LOCKS.md`), whom to notify. If there are parts of the
> system you cannot see from where you are, tell me; the map must not have hidden gaps. Then
> propose your scope in three levels: read-only and diagnosis; configuration changes with my
> approval; consequential actions behind locks. I choose the level. Your credential acts as the
> person who created it: everything you do is logged under that person's name. Reply in my
> language.

   Gli stai chiedendo la mappa prima di operare, di dichiarare i buchi della mappa, tre livelli di
   perimetro perché tu ne scelga uno, e la credenziale a nome di una persona.

3. Scegli il livello (per cominciare, sempre il primo: sola lettura e diagnosi). Chiudi con:

> Level [1: read-only and diagnosis]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the
> credential (never its value), and the procedure to request my approval. Then prove, with a real
> attempt recorded in the log, that something outside your scope is rejected.

**Il compito (retrospettiva, sempre).**

4. Raccogli i numeri che solo tu hai: quante ore ci hai dedicato, quanto hai speso nello strumento
   di IA, quanta quota di integrazione continua hai usato.
5. Incollagli:

> [The project] is over. Do the retrospective with numbers, not impressions: what it cost
> (tokens, quota, my time), how many pending items, which ones took the most rounds and why,
> which incidents happened and which step of the ladder each falls into, and which step failed
> or was missing. If you lack the data for any figure (my time, for instance), ask me for it or
> mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder:
> which step is modified, how, and which incident justifies it. Write it to
> `docs/RETROSPECTIVE_[date].md`. Reply in my language.

   Gli stai chiedendo numeri con fonte, ogni incidente ricondotto a un gradino (un incidente che
   non cade in nessuno è un gradino che manca), di chiederti i numeri che non ha, e una proposta
   concreta di modifica alla scala.

6. Leggi la proposta di modifica. Se ti sembra valida, mandala al repository di Urazuke come
   proposta di miglioramento (vedi `CONTRIBUTING.md`): è il modo in cui il metodo impara da ogni
   progetto.

**Verifica di completezza.** La mappa dice cosa NON può vedere l'agente? Hai visto nel log che
un'azione fuori dal perimetro viene rifiutata? La credenziale agisce a nome di una persona? La
retrospettiva ha numeri con fonte, o aggettivi? Ogni incidente cade in un gradino? C'è almeno una
proposta concreta di modifica?

**Risultato da consegnare.** `docs/RESIDENT_AGENT.md` (se corrisponde) e
`docs/RETROSPECTIVE_[data].md`.

**Errori tipici.** Dare all'agente residente un livello alto "perché possa risolvere tutto":
comincia dalla sola lettura e sali quando c'è una prova. Una retrospettiva che dice che è andato
tutto bene: non va mai tutto bene; è scritta per te, non per il metodo. E non mandare la proposta
di modifica: il gradino 15 si chiude quando la scala cambia, non quando il documento si scrive.

**Nel progetto guida.** La retrospettiva di Turnera, in un corso tipico: sei settimane, circa
quaranta ore dell'allievo, ventotto voci in sospeso, quelle che hanno fatto più giri sono state
quelle dei messaggi (fusi orari e il fornitore di WhatsApp); due incidenti, uno nel gradino 8 (lo
stato "assente" esisteva nella schermata e non nel server) e uno nel 13 (un deployment in
produzione con la configurazione di prova, rilevato dalla verifica end to end dopo il deployment).
Proposta di modifica: che la routine di deployment del gradino 13 esiga di mostrare la differenza
di configurazione tra prova e produzione prima di promuovere, non solo "cosa cambia".

---

## La lista di uscita in produzione

Quando le sedici lezioni sono fatte, il sistema soddisfa questa lista. È la definizione operativa
di "production grade" in Urazuke, e si può usare come lista di verifica finale, con la
proprietaria, senza aprire il codice:

1. C'è una scheda di idoneità con decisione, data e nome (G0).
2. C'è un patto di convivenza che l'agente legge a ogni sessione, e si è provato che lo legge (G1,
   G2).
3. Il file di progetto si legge in cinque minuti e dice cosa NON è il sistema (G2).
4. C'è un dimensionamento con dati primari con fonte, derivati con conto, e lo scenario "per
   dieci" (G3).
5. Lo scheletro è stato distribuito vuoto, e il deployment è stato eseguito due volte (G4).
6. Ogni modifica ha la sua voce in sospeso, e ogni voce chiusa ha la sua prova (G5).
7. Ogni regola di business ha proprietario, data e parole testuali (G6).
8. Ogni test importante è stato visto in rosso prima del verde; ci sono prove end to end che
   verificano il backend dalla schermata (G7).
9. Ogni lista ha un solo proprietario; c'è una mappa produttore/consumatore; c'è un registro degli
   anti-pattern con verifica automatica (G8).
10. Ogni numero che ha deciso qualcosa ha un misuratore con test che tu puoi eseguire (G9).
11. Ogni rapporto separa verificato, creduto e punti ciechi (G10).
12. C'è stato almeno un audit da una sessione diversa, e i suoi P0 sono voci in sospeso (G11).
13. Ogni azione con conseguenze ha un lucchetto con test in rosso e via del ritorno; le
    automazioni sono passate per la modalità di prova (G12).
14. I test girano una volta per commit; la configurazione è fuori dal repository; il rollback è
    stato provato; nessun segreto vive nel repository né nella chat senza essere ruotato (G13).
15. Ci sono tre manuali con data e versione, e una persona che non programma ha seguito quello di
    ripristino (G14).
16. C'è una retrospettiva con i numeri e una proposta di modifica alla scala (G15).

Se le sedici danno "sì", il sistema è pronto per essere implementato. Se una dà "no", sai già
quale gradino risalire.

---

## Allegato A — Come valutare (per chi tiene il corso o si autovaluta)

Una rubrica semplice, per lezione, con tre livelli:

- **Non salito**: manca il risultato da consegnare, o qualche verifica di completezza dà "no".
- **Salito**: il risultato esiste e tutte le verifiche danno "sì".
- **Salito con prova di criterio**: inoltre, l'allievo sa raccontare un caso in cui l'agente ha
  fatto qualcosa di sbagliato in quella lezione (ha supposto, inventato, riferito di più) e come
  l'ha rilevato. Questo è l'obiettivo reale del corso: non l'artefatto, ma il riflesso.

Ciò che non si valuta: la qualità del codice. Nessuno la legge. Si valuta la qualità della prova.

## Allegato B — Adattamento del corso a ogni strumento

I prompt sono gli stessi in qualunque strumento. Ciò che cambia è dove vanno le routine che nel
corso si aggiungono a `docs/WORKING_AGREEMENT.md`:

- In **Claude Code**, le routine vanno nel `CLAUDE.md` del progetto (o si include il patto da lì),
  e si leggono da sole a ogni sessione.
- In **Cursor**, vanno in `.cursor/rules/`, come regole sempre attive.
- In **Codex CLI** o **Gemini CLI**, in `AGENTS.md` o `GEMINI.md` nella radice.
- In **Forge**, il patto e le routine sono dottrine, e i prompt di gradino si iniettano da soli
  attraversando ogni cancello; il registro delle voci in sospeso è nativo. Il corso con Forge è lo
  stesso corso con meno copia e incolla.

La prova di lettura della lezione 2 vale per tutti: se una sessione nuova non sa cosa NON fa il
sistema, lo strumento non sta caricando il file in cui hai messo il patto.

## Allegato C — Ciò che questo manuale ancora non ha

- Una classe che l'abbia seguito. I tempi, gli errori tipici e il progetto guida sono scritti a
  partire dai tre sistemi di origine, non da allievi. La prima classe li correggerà (e questo è,
  letteralmente, il gradino 15 applicato al corso).
- I pesi dei criteri di idoneità (lezione 0), che si stanno elaborando.
- La verifica che le versioni nelle altre lingue restino allineate con lo spagnolo a ogni modifica.
