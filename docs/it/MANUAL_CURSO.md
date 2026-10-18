# Urazuke — il corso. Manuale con compiti pratici, gradino per gradino, fino all'applicazione in produzione

Autore: Pablo Kuschniroff, assistito da Claude Code. Versione 2, 18 ottobre 2026. È un documento
di lavoro del progetto Urazuke: lo correggerò con la prima coorte che lo userà. Questa è la
versione italiana; lo spagnolo è la fonte della verità. È scritto in linguaggio di tutti i giorni,
e ogni sigla o espressione strana sta nel glossario del documento principale
(`ESCALERA_METODOLOGICA.md`). Quando cito un caso reale lo faccio con un segno `[Ref. N]` che porta
al [documento delle referenze](REFERENCIAS.md); il manuale resta pulito e il dettaglio, a un clic.
Il repository pubblico del metodo è
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## Prima di cominciare

### Per chi è questo corso

Per chi vuole costruire software con l'intelligenza artificiale **e vuole che quel software venga
usato davvero**, da gente vera, per mesi. Non è un corso di programmazione: non imparerai un
linguaggio né un framework. Non è nemmeno un corso di "prompt": non imparerai trucchi perché il
modello scriva meglio. È un corso di **metodo**: cosa fare in che ordine, cosa chiedere al modello
in ogni momento, cosa deve consegnarti, e come sapere — senza leggere codice — che ciò che ti ha
consegnato è completo.

Ti serve se sei una di queste persone:

- Hai un'attività, uno studio, una piccola società di consulenza, e vuoi il tuo sistema senza
  assumere un team di sviluppo.
- Sei un consulente o un freelance dell'automazione e i tuoi clienti ti chiedono "qualcosa di più"
  di un robot.
- Sai programmare, ma vuoi che il modello faccia il lavoro pesante e tenerti le decisioni.
- Hai già "vibecodato" qualcosa, ha funzionato due settimane, e al mese tre ti è crollato.

Non ti serve se ciò che vuoi è un prototipo per la demo di venerdì. Per quello ci sono strumenti
più rapidi, e questo metodo ti sembrerà lento. Il metodo è per ciò che deve continuare a funzionare
dopo la demo.

### Cosa avrai alla fine

Un'applicazione tua, in produzione, con: test che si sono visti fallire prima di passare; prove
end to end di tutti i flussi; deployment riproducibile con rollback; configurazione e segreti fuori
dal repository; le decisioni di business scritte con la data; un albero semantico del sistema e la
specifica dettagliata di ogni cosa costruita, nelle sue voci in sospeso; lucchetti su tutto ciò che
addebita, invia o cancella; tre manuali che una persona può seguire senza IA; un audit fatto da un
agente diverso da quello che ha costruito; e una retrospettiva con i numeri. Questo è ciò che qui
chiamo "production grade": non è che funzioni, è che **si può sostenere**.

E avrai qualcos'altro, che è ciò che davvero ti porti a casa: il riflesso di non credere al
modello senza prove, e di sapere esattamente quale prova chiedergli a ogni passo.

### Di cosa hai bisogno

1. **Uno strumento di IA per programmare.** Uno qualunque che possa leggere e scrivere file nel tuo
   repository ed eseguire comandi: Claude Code, Cursor, Codex CLI, Gemini CLI, Forge. Il metodo
   non dipende da quale; il documento principale ha una tabella di dove va ogni artefatto in ogni
   strumento. In questo manuale dico "l'agente" per riferirmi a quello che usi.
2. **Un account su GitHub** (o equivalente) e nozioni minime di cos'è un repository, un commit e
   un push. Se non le hai, dedicaci un pomeriggio prima di cominciare; qualunque tutorial
   introduttivo basta. Non serve altro.
3. **Un progetto.** L'ideale è che sia tuo: un sistema di cui hai bisogno o che un cliente ti ha
   chiesto, con utenti che lo useranno. Se non ne hai uno, usa il **progetto guida** che descrivo
   sotto; è pensato per passare per i sedici gradini senza saltarne nessuno.
4. **Tempo.** Il corso ha sedici lezioni, una per gradino, e un calendario che ti dice in quale
   settimana cade ogni cosa (vedi "Il calendario del corso"). Un progetto piccolo, da un capo
   all'altro, sono tra sei e otto settimane di lavoro parziale.
5. **Un proprietario del dominio con tempo per decidere.** Se il progetto è tuo, sei tu. Se è di
   un cliente, è il cliente, e deve sapere che dovrà rispondere a domande per tutto il progetto.
   Questo punto non è negoziabile: senza un proprietario che decida, decide il modello, e lì il
   metodo si rompe.

### Come si segue il corso

Ogni lezione ha la stessa struttura:

- **Cosa devi capire**: il concetto, spiegato come si spiega a una persona.
- **Il compito**: passo per passo, con il prompt esatto che darai all'agente (in inglese, perché i
  modelli seguono le istruzioni con più precisione in inglese; ciascuno ha la sua traduzione, e
  sotto è spiegato cosa gli stai chiedendo) e cosa fare con ciò che ti restituisce. Prima di ogni
  prompt c'è un blocco che dice **"Prima di inviare il prompt"**: i file e gli input che devi aver
  fatto tu, con le tue mani, prima di incollarlo. Non saltarlo: il prompt nomina quei file, e se
  non esistono o sono vuoti, l'agente se li inventerà o te li chiederà.
- **La verifica di completezza**: la lista di domande che ti fai su ciò che l'agente ha consegnato,
  senza aprire il codice. Se una dà "no", la lezione non è finita.
- **La consegna**: il file o la prova che deve esistere alla fine.
- **Errori tipici**: ciò che succede a quasi tutti la prima volta.
- **Nel progetto guida**: come si vede questa lezione applicata al progetto di esempio.

Una regola per tutto il corso: **non avanzare al gradino successivo con una verifica in "no"**. La
tentazione del "dopo lo sistemo" è esattamente ciò che il metodo esiste per evitare. Se un gradino
non si sale completo, quello successivo si costruisce sulla sabbia.

### Il calendario del corso: quando si fa ogni cosa

Il documento principale ha, nella sua Parte B, la linea del tempo completa del metodo. Qui la
traduco nel calendario del corso per un progetto piccolo come il progetto guida. Le settimane sono
indicative; ciò che non è indicativo è l'ordine e, soprattutto, cosa succede tra una lezione e
l'altra.

| Settimana | Lezioni | Cosa fai oltre alle lezioni |
|---|---|---|
| 0 (due o tre giorni) | nessuna | **Acquisizione**: intervisti il proprietario e scrivi in prosa cosa vuole, per chi, cosa succede oggi, cosa ha conseguenze, quali numeri solo lui conosce. Nomini i casi d'uso che puoi ("la receptionist carica un appuntamento"), disegni le schermate principali anche a mano, ed elenchi le entità del business con i loro stati. Incompleto di proposito. |
| 1 | 0, 1, 2, 3, 4 | **Avvio, di seguito.** Idoneità, patto, definizione con albero semantico, dimensionamento, e lo scheletro con **tutta l'infrastruttura e la catena di integrazione e deployment**: repository, ambiente di test, integrazione continua, primo deployment vuoto. Alla chiusura, apri l'URL e vedi la schermata vuota. |
| 2 | 5, 6, 7 | **Primo blocco funzionale** (l'agenda di base). Apri il blocco convertendo la richiesta in voci in sospeso specificate. Con ogni voce: decisioni, test in rosso, prova end to end del flusso, screenshot della schermata che guardi tu. Alla chiusura del blocco: batteria completa end to end, e tu usi il sistema nell'ambiente di test seguendo i flussi del blocco. |
| 3 | 8, 9, 10 | **Secondo blocco** (pazienti e ricerca). Le tre lezioni restanti del ciclo si imparano su questo blocco. Stessa chiusura: end to end di tutti i flussi, prove umane, manuale utente con le schermate nuove. |
| 4 | 11, 12 | **Uscita in produzione, prima metà.** Audit da parte di un'altra sessione. Lucchetti. E solo dopo, il **terzo blocco** (promemoria e caparra), costruito con il ciclo completo e lasciato in modalità di prova. |
| 5 | 13, 14 | **Uscita in produzione, seconda metà.** Chiusura della catena verso la produzione con rollback provato. I tre manuali; qualcuno che non programma segue quello di ripristino. **Test di accettazione** tuoi o del proprietario su tutti i flussi. Primo deployment in produzione senza utenti. |
| 6 | 15 | **Esercizio.** Abiliti i promemoria dopo aver guardato il registro della modalità di prova. Agente residente. Retrospettiva con i numeri e proposta di modifica alla scala. |

Se il tuo progetto è più grande, ciò che si allunga sono le settimane 2 e 3 (più blocchi), non la 1
né la 4 e la 5. E se a un certo punto ti ritrovi a fare infrastruttura nella settimana 3, o a
eseguire la batteria end to end per la prima volta nella settimana 5, torna al calendario: qualcosa
è stato saltato.

### Il progetto guida: "Turnera"

Se non hai un progetto tuo, usa questo. È piccolo, ma ha tutto ciò che serve perché nessuno dei
sedici gradini sia per finta: utenti reali, dati personali, messaggi che escono nel mondo, e soldi.

**L'attività.** Un ambulatorio (può essere uno studio, un parrucchiere, un'officina: qualunque
posto che dà appuntamenti). Oggi gli appuntamenti si annotano su un quaderno e si confermano via
WhatsApp a mano. Si perdono appuntamenti perché la gente si dimentica, ci sono doppi appuntamenti
perché due persone hanno annotato su quaderni diversi, e nessuno sa quanti appuntamenti sono stati
cancellati il mese scorso.

**Cosa vogliono.** Un'agenda web dove le due receptionist e i tre professionisti vedano gli
appuntamenti; promemoria automatici 24 ore prima, via WhatsApp o email; la possibilità di chiedere
una caparra tramite link di pagamento per certi appuntamenti; e un paio di numeri a fine mese
(quanti appuntamenti, quante assenze, quante caparre).

**Il proprietario.** La responsabile dell'ambulatorio. Ha criterio sull'attività (sa quali
appuntamenti richiedono caparra, con quanto anticipo si può cancellare, cosa si dice a un paziente
che è mancato tre volte) e ha quindici minuti al giorno per rispondere a domande. Non programma, e
non leggerà codice.

**I numeri che solo lei conosce.** Circa quaranta appuntamenti al giorno, duecentocinquanta giorni
all'anno. Circa tre messaggi per appuntamento (conferma, promemoria, a volte riprogrammazione). I
dati dei pazienti si conservano cinque anni. Il picco è il lunedì mattina, con le due receptionist
che caricano contemporaneamente. E una domanda a cui lei non sa rispondere e che conta: se questo
funziona, lo venderanno ad altri ambulatori? (La risposta cambia il dimensionamento di dieci volte.)

**Ciò che ha conseguenze.** Inviare un promemoria (se si manda due volte, dà fastidio; se si manda
al numero sbagliato, è un problema di privacy). Addebitare una caparra (soldi). Cancellare un
appuntamento (irreversibile per il paziente che lo perde). Cancellare un paziente (dati personali).

**I casi d'uso che nomina la responsabile**, così come li dice lei: "carico un appuntamento",
"cerco un paziente", "cancello un appuntamento", "al paziente arriva il promemoria", "gli chiedo la
caparra", "vedo quanti appuntamenti ci sono stati questo mese". Sono sei; saranno i flussi end to
end.

Con questo basta per cominciare. Tutto il resto lo chiederà l'agente, ed è parte dell'esercizio
che lo chieda.

---

## Fase di avvio: lezioni da 0 a 4

Queste cinque lezioni si fanno una volta per progetto, nella settimana 1, prima di scrivere
funzionalità. Sono quelle che danno più tentazione di saltare ("voglio vedere qualcosa che
funziona"), e sono quelle che costa più caro saltare. Falle di seguito, e solo dopo apri il ciclo.

### Lezione 0 — Questo progetto si può affrontare così?

**Cosa devi capire.** Il metodo non serve per qualunque progetto, e saperlo prima di cominciare è
la prima decisione di qualità. Ci sono due condizioni senza le quali non funziona: che ci sia un
repository standard dove lasciare la prova (X1), e che le schermate si possano operare da programma
per provare end to end, dalla schermata fino al backend (X2). Se una qualsiasi delle due manca,
l'agente non potrà verificarsi da solo, e allora finirai per leggere codice tu, che è proprio ciò
che il metodo promette di evitare. Entrambe le ho tratte da progetti che ho rifiutato
[Ref. 46](REFERENCIAS.md#ref-46). Poi ci sono criteri che pesano (se c'è un proprietario con tempo,
se l'errore ha conseguenze, se si può provare in un ambiente a parte, ecc.), che sto ancora
calibrando.

Per il progetto guida le due condizioni sono soddisfatte: è un progetto nuovo (non c'è legacy) e lo
costruiremo con un'interfaccia web operabile da programma. Per un progetto tuo, questa lezione può
finire in "non va", e quello è un risultato valido del corso.

**Il compito.**

**Prima di inviare il prompt**, con le tue mani (l'agente non può farlo per te):

- `docs/INITIAL_SURVEY.md`: lo scrivi a mano, a partire dall'acquisizione della settimana 0: cosa
  vuole il cliente, per chi, cosa succede oggi senza il sistema, che tecnologia c'è o si propone,
  se c'è un sistema precedente e se ha un repository, se le schermate si potranno operare da
  programma, chi è il proprietario e quanto tempo ha, che conseguenza ha un errore, quali
  ambienti ci saranno. Mezza pagina. Non importa che sia incompleto; anzi, è parte dell'esercizio
  che lo sia, e ciò che non sai lo scrivi come "non lo so".
- `docs/ELIGIBILITY_CRITERIA.md`: copia la scheda dei criteri del documento principale (gli
  escludenti X1 e X2 e i candidati), con le colonne della risposta, della fonte e del verde o
  rosso vuote. Non compilarla tu: la compila l'agente.
- La cartella del progetto, ancora vuota tranne quei due file, con l'agente aperto lì.
- Il contenuto completo di ogni file è nel contratto del gradino 0, nello stesso blocco.

1. Incollagli questo prompt:

> We are going to assess whether this project can be run with the Urazuke method. Read the
> initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`. First, evaluate whether the survey is sufficient to answer
> every criterion. If any criterion cannot be answered from the survey, ask me for the missing
> information before going on; do not assume. Then fill in the sheet criterion by criterion:
> the answer, where it comes from, and for each exclusionary criterion whether it is green or
> red. Do not decide: present me the completed sheet with your reading and your doubts, and I
> will decide. Reply in my language.

> [it]
> Valuteremo se questo progetto si può affrontare con il metodo Urazuke. Leggi la rilevazione
> iniziale in `docs/INITIAL_SURVEY.md` e la scheda dei criteri in `docs/ELIGIBILITY_CRITERIA.md`.
> Prima, valuta se la rilevazione basta per rispondere a ogni criterio. Se a qualche criterio non
> si può rispondere con la rilevazione, chiedimi le informazioni mancanti prima di proseguire; non
> supporre. Poi compila la scheda criterio per criterio: la risposta, da dove viene, e per ogni
> criterio escludente se è in verde o in rosso. Non decidere: presentami la scheda completa con la
> tua lettura e i tuoi dubbi, e decido io. Rispondi nella mia lingua.

   Gli stai chiedendo di leggere i due file, di **valutare se la rilevazione basta e di chiedere
   ciò che manca prima di rispondere** (questa clausola si ripete in tutti i prompt del corso; è
   il cuore del metodo), di compilare la scheda dicendo da dove viene ogni risposta, e di non
   decidere: la decisione è tua.

2. Rispondi alle sue domande. Se non te ne ha fatta nessuna, diffida e chiedigli cosa ha supposto.
3. Quando ti presenta la scheda, leggila e decidi.

**Prima di inviare il prompt** di chiusura: la tua decisione in una riga (va, non va, o va con
condizioni, ciascuna condizione verificabile e non più di tre), e le risposte che hai dato alle
sue domande in questa stessa sessione, perché il prompt gli chiede di includerle.

4. Incollagli il prompt di chiusura:

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.

> [it]
> Decisione: [va / non va / va con queste condizioni: …]. Scrivi la scheda finale in
> `docs/ELIGIBILITY.md` con la data, chi ha deciso, la risposta a ogni criterio con la sua fonte,
> e le condizioni se ci sono. Includi le domande che hai fatto e le mie risposte.

**Verifica di completezza.** Apri `docs/ELIGIBILITY.md` e chiediti: i due escludenti hanno una
risposta esplicita e una fonte? C'è qualche criterio a cui si è risposto con "probabilmente"? (Se
c'è, l'agente doveva chiedere.) La decisione ha data e nome? Le condizioni, se ci sono, si possono
verificare? Ci sono le domande che ha fatto e le tue risposte?

**Consegna.** `docs/ELIGIBILITY.md`, di una pagina.

**Errori tipici.** Scrivere la rilevazione "completa" perché l'agente non chieda: ti perdi
l'esercizio e, peggio, ti abitui a fare il lavoro del modello. Rispondere "va" con cinque
condizioni: è un "non va" travestito. E il più comune: saltare la lezione perché "è ovvio che va".
L'ovvio è ciò che non si scrive, e ciò che non si scrive è ciò su cui poi si discute.

**Nel progetto guida.** L'agente dovrebbe chiedere, come minimo, se l'interfaccia sarà web o
mobile (perché X2 dipende da questo), se c'è un sistema precedente anche solo un Excel, e quale
canale di messaggi si userà (WhatsApp ha requisiti che l'email non ha). La scheda finisce in "va",
con una condizione ragionevole: avere il canale di messaggi definito prima del gradino 12.

### Lezione 1 — Il patto di convivenza

**Cosa devi capire.** L'agente arriva a ogni sessione senza memoria della precedente. È come un
collaboratore nuovo ogni mattina. Il patto di convivenza è ciò che gli dici il primo giorno e ciò
che rileggerà tutti i giorni: come lavori, cosa non tolleri, che livello di autonomia gli dai.
Senza patto, gli ripeterai le stesse cose a ogni sessione, e ogni volta un po' diverse. Io l'ho
scritto per la prima volta dopo due settimane passate a ripetermi [Ref. 1](REFERENCIAS.md#ref-1).

Le sei regole minime hanno ciascuna un fallimento alle spalle: "il mio tempo è sacro" evita che ti
consulti per ogni dettaglio; "zero debito" evita il "dopo lo sistemo"; "perimetro esatto" evita
che "già che c'è" ti aggiunga cose; "documentazione nello stesso commit" evita i manuali vecchi;
"mai riportare come fatto ciò che non è verificato" evita il "fatto" che non lo era; "parla la mia
lingua" evita che ti risponda in inglese perché il prompt era in inglese.

**Il compito.**

**Prima di inviare il prompt**, con le tue mani:

- Le tue preferenze di lavoro, pensate per cinque minuti e annotate in una lista breve (su un
  foglio, o in `docs/MY_PREFERENCES.md`): preferisci che ti chieda molto o poco? In che lingua?
  Che livello di autonomia gli dai (commit da solo, deployment in test da solo, produzione mai)?
  Cosa ti fa uscire dai gangheri nel lavorare con altre persone? Glielo racconterai quando
  chiederà; la lista serve a non improvvisare.
- La cartella del progetto con l'agente aperto lì. Nient'altro: è il primo file del progetto.

1. Incollagli questo prompt:

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

> [it]
> Prima di scrivere codice, fisseremo il patto di convivenza tra te e me. Scrivi
> `docs/WORKING_AGREEMENT.md` con almeno queste regole, ciascuna con una riga che spieghi cosa
> evita: (1) Il mio tempo è sacro: non chiedermi ciò che puoi risolvere da solo, e quando chiedi,
> chiedi in prosa, con la tua raccomandazione. (2) Zero debito tecnico: ciò che si rompe si
> corregge alla radice, con il suo test di regressione, nella stessa sessione. (3) Perimetro
> esatto: né più né meno di ciò che è stato chiesto; se vedi qualcos'altro, annotalo come voce in
> sospeso, non farlo. (4) La documentazione si aggiorna nello stesso commit della modifica. (5)
> Non riportare mai come fatto qualcosa che non hai verificato; separa sempre ciò che hai
> verificato da ciò che credi. (6) Parla la mia lingua. Aggiungi le regole che pensi servano a
> questo progetto, segnate come proposte. Se hai bisogno di sapere qualcosa su come lavoro per
> scrivere questo, chiedimelo.

   Gli stai chiedendo le sei regole con il fallimento che ciascuna evita, regole proprie segnate
   come proposte perché tu le accetti o le respinga, e che ti faccia domande su di te.

2. Rispondi alle sue domande. Leggi le proposte: accetta quelle che ti servono, respingi quelle
   che no, sempre con una ragione di una riga.

**Prima di inviare il prompt** di chiusura: il tuo verdetto su ogni proposta dell'agente, scritto:
quali accetti [X, Y], quali respingi [Z] e perché, in una riga ciascuna. Va negli spazi del
prompt, e li riempi tu.

3. Chiudi con:

> I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the
> agreement with today's date and a version number. Then add to the project file the
> instruction to read this agreement at the start of every session.

> [it]
> Accetto le regole da 1 a 6 e le tue proposte [X, Y]; respingo [Z] perché [ragione]. Chiudi il
> patto con la data di oggi e un numero di versione. Poi aggiungi al file di progetto
> l'istruzione di leggere questo patto all'inizio di ogni sessione.

   Se non c'è ancora un file di progetto (lo fai nella lezione 2), ne creerà uno minimo con
   quell'istruzione; va bene.

**Verifica di completezza.** Ci sono le sei regole, ciascuna con il fallimento che evita? Ce n'è
qualcuna scritta come aspirazione ("cercare di…")? Il file di progetto ordina di leggerlo
all'inizio di ogni sessione? Ti ha fatto almeno una domanda su come lavori?

**Consegna.** `docs/WORKING_AGREEMENT.md` con data e versione, agganciato al file di progetto.

**Errori tipici.** Accettare venti regole perché suonano tutte bene: nessuno ne rispetta venti; sei
o otto si rispettano. Lasciare una regola che dica che l'agente può cambiare il patto: no. E il più
silenzioso: non provare mai se lo legge. Nella lezione 2 vedrai come.

**Nel progetto guida.** Una regola propria che l'agente di solito propone per Turnera, e che vale
la pena accettare: "non mando mai un messaggio reale a un paziente da un ambiente che non sia la
produzione; in test, i messaggi vanno in una casella finta". È il gradino 12 che si affaccia
presto.

### Lezione 2 — La definizione del progetto, l'albero semantico e la lettura obbligatoria

**Cosa devi capire.** Il file di progetto (`PROJECT.md`, o `CLAUDE.md`, o il nome che usa il tuo
strumento) è la mappa che l'agente legge all'inizio di ogni sessione. Deve essere **corto**: cos'è
il sistema, per chi, cosa NON è, i moduli, le decisioni prese con la data, e l'ordine di leggere
il patto. Ciò che è successo ogni giorno non va lì: va nello stato vivo (`docs/STATUS.md`) e nel
registro delle voci in sospeso. Uno dei miei sistemi ha lasciato crescere questo file fino a più
di novemila righe; in quello stato, non lo legge nessuno, e nemmeno il modello
[Ref. 41](REFERENCIAS.md#ref-41).

Ma la mappa ha un secondo pezzo, ed è quello che fa più lavoro: l'**albero semantico**. È il
sistema scomposto come un albero: i domini al primo livello, e sotto ciascuno i suoi attori, i suoi
processi (i casi d'uso che hai nominato nell'acquisizione, con attore, innesco, passi, risultato ed
eccezioni), le sue entità con i loro attributi e i loro stati, le sue schermate e le sue
integrazioni esterne. È il modello di dominio dell'ingegneria dei requisiti di sempre, messo in
forma di albero perché il modello lo legga. Da ogni nodo penderanno le voci in sospeso e le
decisioni che lo toccano. Il suo valore è doppio: dà all'agente il contesto esatto del nodo che
toccherà, e dà a te un modo per verificare, senza leggere codice, che il sistema che l'agente
capisce è quello che il business ha chiesto. Se l'albero ha uno stato che il business non ha mai
nominato, il modello l'ha inventato, e lo vedrai prima che ci costruisca sopra.

La sezione "cosa NON è" resta la più importante e quella che tutti lasciano vuota. Ciò che non è
scritto è ciò che il modello inventerà quando si troverà davanti a un buco.

**Il compito.**

**Prima di inviare il prompt**, con le tue mani:

- `docs/INITIAL_SURVEY.md`, completato con ciò che hai imparato nella lezione 0 (le risposte alle
  domande dell'agente) e con la rilevazione del business: chi usa il sistema, che problema
  risolve, una sezione "cosa NON deve fare il sistema" anche solo con due voci, i casi d'uso che
  nomina il proprietario con le sue parole, le entità con i loro stati, i disegni delle schermate
  anche se sono foto di un foglio, le integrazioni esterne, e le decisioni già prese, con la
  data. Se hai usato un metodo di acquisizione (interviste, casi d'uso, storie utente,
  prototipi), di' quale e incolla il risultato.
- `docs/WORKING_AGREEMENT.md`, chiuso (lezione 1).
- Se c'è un sistema precedente, accesso in lettura al suo codice o alla sua documentazione,
  annotato nella rilevazione.

1. Incollagli:

> We are going to define the project in writing. Read the business survey in
> `docs/INITIAL_SURVEY.md` and the working agreement in `docs/WORKING_AGREEMENT.md`. Evaluate
> whether the survey is sufficient to describe the system, its users, its domain and its
> boundaries; if it is not, ask me for what is missing before writing anything. Then write two
> things. First, `PROJECT.md`, three hundred lines at most, with: what the system is and for
> whom; what it is NOT; the main modules as a list; the decisions already made, each with its
> date; and the instruction to read this file and the semantic tree at the start of every
> session. Second, `docs/SEMANTIC_TREE.md`: the system as a tree, with the domains at the top
> level and, under each one, its actors, its processes (the use cases, each with actor, trigger,
> steps, outcome and exceptions), its entities with their attributes, states and transitions,
> its screens, and its external integrations. Mark every node you inferred rather than read in
> the survey, so that I can confirm or correct it. Separately, create `docs/STATUS.md` for the
> living state (what is being worked on, what is open): that file changes every day; the other
> two change only when the system changes. Reply in my language.

> [it]
> Definiremo il progetto per iscritto. Leggi la rilevazione del business in
> `docs/INITIAL_SURVEY.md` e il patto di convivenza in `docs/WORKING_AGREEMENT.md`. Valuta se la
> rilevazione basta per descrivere il sistema, i suoi utenti, il suo dominio e i suoi confini; se
> non basta, chiedimi ciò che manca prima di scrivere qualsiasi cosa. Poi scrivi due cose. Primo,
> `PROJECT.md`, di trecento righe al massimo, con: cos'è il sistema e per chi; cosa NON è; i
> moduli principali come lista; le decisioni già prese, ciascuna con la sua data; e l'istruzione
> di leggere questo file e l'albero semantico all'inizio di ogni sessione. Secondo,
> `docs/SEMANTIC_TREE.md`: il sistema come un albero, con i domini al primo livello e, sotto
> ciascuno, i suoi attori, i suoi processi (i casi d'uso, ciascuno con attore, innesco, passi,
> risultato ed eccezioni), le sue entità con i loro attributi, stati e transizioni, le sue
> schermate e le sue integrazioni esterne. Segna ogni nodo che hai inferito invece di leggerlo
> nella rilevazione, perché io lo confermi o lo corregga. A parte, crea `docs/STATUS.md` per lo
> stato vivo (a cosa si sta lavorando, cosa è aperto): quel file cambia tutti i giorni; gli altri
> due cambiano solo quando cambia il sistema. Rispondi nella mia lingua.

   Gli stai chiedendo di chiedere prima di redigere, un file di progetto corto con la sezione
   "cosa non è", l'albero semantico con la sua struttura completa e con i nodi inferiti segnati, e
   lo stato vivo in un altro file.

2. Leggi `PROJECT.md` per intero. Deve starci in cinque minuti. Correggi ciò che non è vero o non
   è tuo.
3. Percorri l'albero semantico come se fossi il cliente. Guarda ogni nodo segnato come inferito e
   confermalo o correggilo. Cerca attori che mancano, stati di entità che il business non usa,
   schermate che non hai chiesto.

**Prima di inviare il prompt** di chiusura: `PROJECT.md` letto per intero da te, l'albero percorso
nodo per nodo con un verdetto per ogni nodo inferito, e la lista delle correzioni scritta per lo
spazio [lista] del prompt. Se la lista è vuota la prima volta, diffida della tua lettura.

4. Chiudi con:

> Apply these corrections: [list]. Finalize `PROJECT.md` and `docs/SEMANTIC_TREE.md` with
> today's date. Add to the working agreement two rules: the change history never goes into
> `PROJECT.md` (it goes to `docs/STATUS.md` or to the pending-items register); and every pending
> item must hang from a node of the semantic tree, and the tree is updated in the same commit
> whenever a block adds or changes a node.

> [it]
> Applica queste correzioni: [lista]. Chiudi `PROJECT.md` e `docs/SEMANTIC_TREE.md` con la data
> di oggi. Aggiungi al patto di convivenza due regole: lo storico delle modifiche non va mai in
> `PROJECT.md` (va in `docs/STATUS.md` o nel registro delle voci in sospeso); e ogni voce in
> sospeso deve pendere da un nodo dell'albero semantico, e l'albero si aggiorna nello stesso
> commit ogni volta che un blocco aggiunge o cambia un nodo.

5. **La prova di lettura.** Chiudi la sessione dell'agente e aprine una nuova. Senza dirgli altro,
   chiedigli: "Cosa non deve fare questo sistema? E da quale nodo dell'albero pende la schermata
   dell'agenda?". Se ti risponde con ciò che dicono `PROJECT.md` e l'albero, l'aggancio funziona.
   Se ti risponde qualunque altra cosa, non sta leggendo la mappa: controlla come il tuo strumento
   carica il file di progetto.

**Verifica di completezza.** `PROJECT.md` si legge in cinque minuti? Dice cosa NON fa il sistema?
L'albero ha tutti gli attori che tu conosci, e ogni entità ha gli stati che il business usa, né
più né meno? Hai confermato o corretto tutti i nodi inferiti? Ogni decisione ha la data e chi l'ha
presa? L'agente ha chiesto qualcosa prima di redigere? Lo stato vivo è in un altro file? Ha
superato la prova di lettura?

**Consegna.** `PROJECT.md` (massimo trecento righe), `docs/SEMANTIC_TREE.md` con i nodi
confermati, `docs/STATUS.md`, e la prova di lettura superata.

**Errori tipici.** Incollare in `PROJECT.md` tutta la specifica che già avevi: è il programma, non
la specifica. Lasciare "cosa non è" vuoto. Accettare l'albero senza percorrerlo: il modello
inferisce stati e schermate con una naturalezza che fa paura, e ogni nodo inventato è funzionalità
che costruirà senza che nessuno gliel'abbia chiesta. E non fare la prova di lettura: è l'unico modo
per sapere che il gradino 1 e il 2 stanno agendo e non solo esistendo.

**Nel progetto guida.** In "cosa NON è" di Turnera dovrebbero esserci, come minimo: non è un
sistema di cartella clinica (non conserva dati medici), non è un gateway di pagamento (usa un link
di pagamento di un fornitore, non elabora carte), e non manda messaggi di marketing (solo conferme
e promemoria). L'albero ha un dominio "Agenda" con gli attori receptionist e professionista, i
processi "caricare appuntamento", "cancellare appuntamento" e "cercare paziente", le entità
Appuntamento (con stati in attesa, confermato, cancellato, assente) e Paziente, e le schermate
"agenda del giorno" e "scheda del paziente"; un dominio "Messaggi" con il processo "inviare
promemoria", l'entità Messaggio e l'integrazione con il fornitore di WhatsApp; e un dominio
"Pagamenti" con "chiedere caparra" e l'integrazione con il fornitore di pagamenti. Se l'agente ti
aggiunge uno stato "riprogrammato" all'appuntamento, chiedigli da dove l'ha preso: la responsabile
non l'ha nominato. Forse serve, forse no; lo decidi tu, non lui.

### Lezione 3 — Dimensionare prima di progettare l'architettura

**Cosa devi capire.** Ci sono decisioni che, prese male, costano settimane: quale database, se le
chiamate al database sono sincrone o asincrone, quante persone possono usare il sistema
contemporaneamente. E tutte dipendono da numeri che **solo il business ha**: quanti appuntamenti al
giorno, quanti messaggi per appuntamento, quanti anni si conserva. Il modello non può inferire
quei numeri; può inferire ciò che ne deriva (righe all'anno, dimensione a cinque anni). Per questo
il prompt gli impone di distinguere dati primari da derivati, e di **chiedere i primari che mancano
invece di stimarli**. Quando il modello stima un dato primario, lo fa con la stessa faccia sicura
di quando calcola; e non hai modo di distinguerli dal tono. A me non averlo fatto in tempo è
costato un'intera tappa di reingegnerizzazione [Ref. 15](REFERENCIAS.md#ref-15).

C'è inoltre un tipo di decisione che conviene prendere sempre: le **asimmetriche**, economiche se
avanzano e carissime se mancano. L'esempio canonico è fare l'interfaccia con il database asincrona
dal primo giorno anche se il primo database è un file: se non cambi mai database, è avanzato un
`await`; se cambi, ti sei risparmiato di riscrivere tutto.

**Il compito.**

**Prima di inviare il prompt**, con le tue mani e con il proprietario:

- `docs/VOLUME_SURVEY.md`: siediti con il proprietario (o con te stesso, se il progetto è tuo) e
  scrivi le entità principali (quelle dell'albero semantico) e quante ce ne sono, quante se ne
  aggiungono al mese, quanti eventi per entità, quante persone operano nel picco e quando è il
  picco, per quanto si conservano i dati, se ci sono carichi eccezionali, che crescita si
  aspettano. Per ogni numero, annota da dove viene: "l'ha detto la responsabile", "contato nel
  quaderno di settembre", "supposto". Lasciane alcuni in "supposto" di proposito: vedrai cosa fa
  l'agente con quelli.
- `PROJECT.md` e `docs/SEMANTIC_TREE.md`, chiusi (lezione 2).
- Se c'è un sistema precedente con database, un accesso in sola lettura perché l'agente ricavi
  numeri reali, con la stringa di connessione fuori dal repository.

1. Incollagli:

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

> [it]
> Prima di proporre qualunque architettura dimensioneremo il sistema. Leggi `PROJECT.md` e la
> rilevazione di volumetria in `docs/VOLUME_SURVEY.md`. Distingui i dati primari (fatti che solo
> il business conosce) dai derivati (ciò che si può calcolare a partire dai primari). Valuta se i
> dati primari sono abbastanza completi per calcolare ciò che segue; se manca qualche dato
> primario, o è segnato come supposizione, chiedimi tutti quelli che mancano prima di proseguire.
> Non stimare mai un dato primario. Se si può interrogare un sistema precedente, usa i suoi numeri
> reali e di' da dove viene ciascuno. Con i primari completi, calcola, mostrando il conto: righe
> all'anno delle tre tabelle più grandi, concorrenza nel picco, dimensione dei dati a cinque anni,
> e cosa si rompe per primo se tutto si moltiplica per dieci. Poi presenta tre opzioni di
> persistenza e concorrenza, ciascuna con il costo di migrare alle altre più avanti. Non
> scegliere: scelgo io. Non scrivere codice. Rispondi nella mia lingua.

   Gli stai chiedendo: distinguere primari da derivati; **chiederti i primari che mancano o sono
   in "supposto", e non stimarli mai**; calcolare il derivato con il conto in vista; lo scenario
   "per dieci"; tre opzioni con il costo di passare dall'una all'altra; e che non scelga.

2. Se ti chiede i "supposti", bene: quello era l'esercizio. Procurati i numeri (chiedi al
   proprietario, conta nel quaderno) e daglieli. Se non te li ha chiesti e ha calcolato lo stesso,
   fermati e chiedigli cosa ha fatto con i supposti: è un fallimento del gradino e conviene vederlo
   ora.
3. Leggi le tre opzioni. Rifai un conto a mano (per esempio, righe all'anno della tabella più
   grande): deve darti lo stesso. Scegli.

**Prima di inviare il prompt** di chiusura: i supposti convertiti in dati con fonte, un conto
rifatto a mano da te che coincide con quello dell'agente, e l'opzione scelta con una ragione di
una riga.

4. Chiudi con:

> I choose option [B]. Record in `docs/SIZING.md`: the primary data with its source, the derived
> data with its arithmetic, the three options, the chosen one and why, and the decisions we are
> taking "just in case" even though they are not needed today (for example: the persistence
> interface is asynchronous from line one, even if the first engine is synchronous). Include the
> questions you asked and my answers.

> [it]
> Scelgo l'opzione [B]. Registra in `docs/SIZING.md`: i dati primari con la loro fonte, i
> derivati con il loro conto, le tre opzioni, quella scelta e perché, e le decisioni che prendiamo
> "per sicurezza" anche se oggi non servono (per esempio: l'interfaccia di persistenza è asincrona
> dalla riga uno, anche se il primo motore è sincrono). Includi le domande che hai fatto e le mie
> risposte.

**Verifica di completezza.** C'è qualche dato primario con fonte "supposto" o senza fonte? Ogni
dato derivato mostra il conto, e ti torna se lo rifai? Ci sono tre opzioni e una scelta con una
ragione? Dice cosa succede "per dieci"? Le decisioni asimmetriche sono scritte? Ti ha fatto
domande?

**Consegna.** `docs/SIZING.md`.

**Errori tipici.** Completare la rilevazione con numeri inventati da te perché l'agente non chieda
(è lo stesso errore della lezione 0, ed è peggio qui perché quei numeri decidono l'architettura).
Scegliere l'opzione "più potente" per sicurezza: il costo di migrare sta nella tabella proprio
perché tu scelga la più piccola che regga il "per dieci". E non scrivere le decisioni
asimmetriche: se non sono scritte, nella lezione 4 l'agente non le rispetterà.

**Nel progetto guida.** Primari: 40 appuntamenti/giorno × 250 giorni = 10.000 appuntamenti/anno; 3
messaggi per appuntamento = 30.000 messaggi/anno; 5 anni di conservazione; picco di due
receptionist simultanee. Il "per dieci" è la domanda se si vende ad altri ambulatori: 100.000
appuntamenti e 300.000 messaggi all'anno. Le tre opzioni tipiche: un file SQLite (basta per un
ambulatorio per anni, non regge il per dieci con più persone che scrivono), PostgreSQL fin
dall'inizio (regge tutto, costa un po' più di infrastruttura), o SQLite adesso con l'interfaccia
asincrona e una migrazione prevista a PostgreSQL (l'asimmetrica). Per il corso scegliamo la terza:
è quella che insegna di più.

### Lezione 4 — Lo scheletro con i suoi cancelli

**Cosa devi capire.** Prima che il sistema faccia qualcosa di utile, deve partire, provarsi e
distribuirsi **vuoto**. Sembra una perdita di tempo ("distribuire cosa, se non c'è niente?") ed è
il contrario: il cammino verso la produzione è parte del prodotto, e l'unico modo per sapere che
funziona è percorrerlo quando ancora non c'è niente da perdere. In uno dei miei sistemi il
deployment è arrivato un mese dopo l'avvio ed è costato cinque voci in sospeso di seguito
[Ref. 32](REFERENCIAS.md#ref-32); con lo scheletro distribuito la prima settimana, quei cinque
colpi si sarebbero presi a vuoto.

Questa lezione è, inoltre, **dove si fa tutta l'infrastruttura e la catena di integrazione e
deployment** del progetto. Non la toccherai più fino alla lezione 13, e nel frattempo costruirai
tutta la funzionalità sopra di essa. Per questo occupa la maggior parte della settimana 1.

I **cancelli** sono le condizioni per passare da una tappa all'altra ("la batteria è in verde",
"il deployment in test ha funzionato"). Scriverli adesso, anche se sembrano ovvi, è ciò che poi
permette di dire "questo non passa" senza discutere.

**Il compito.**

**Prima di inviare il prompt**, con le tue mani:

- `docs/ENVIRONMENTS_SURVEY.md`: dove girerà il sistema (un server che hai già, un servizio nel
  cloud), se ci sarà un ambiente di test e uno di produzione, chi ha accesso a cosa, come si
  distribuisce oggi se c'è qualcosa, e il tipo di progetto (nuovo, correzione o evoluzione). Se
  non hai niente, dillo: l'agente ti proporrà l'opzione più semplice. Il prompt lo nomina "the
  environments survey", senza percorso: digli come si chiama.
- Le credenziali del posto dove si farà il deployment, anche se è un servizio gratuito: create,
  provate da te entrando nel pannello, e conservate fuori dal repository; all'agente dici dove
  sono, non gliele incolli nella chat. Senza, lo scheletro resta sulla tua macchina e la lezione
  non si può finire.
- `PROJECT.md` e `docs/SIZING.md`, chiusi (lezioni 2 e 3).

1. Incollagli:

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

> [it]
> Costruiremo lo scheletro del sistema, senza nessuna funzionalità. Leggi `PROJECT.md`,
> `docs/SIZING.md` e la rilevazione degli ambienti. Valuta se hai il necessario perché lo
> scheletro giri nell'ambiente di test (accesso, URL, modo di distribuire); se manca qualcosa,
> chiedimelo prima di cominciare. Poi costruisci: la struttura delle cartelle; il server e
> l'interfaccia che partono; la struttura dei test con un test di fumo che passa; l'integrazione
> continua che esegue quella batteria a ogni push; e il deployment nell'ambiente di test. Dichiara
> i cancelli del flusso (cosa deve essere in verde per passare da una tappa alla successiva) in
> `docs/GATES.md`. Quando hai finito, fai uno screenshot dell'interfaccia vuota che gira
> nell'ambiente di test e mostramelo. Non aggiungere nessuna funzionalità "già che ci sei".
> Rispondi nella mia lingua.

   Gli stai chiedendo di verificare gli accessi prima di cominciare, la lista esatta di ciò che è
   uno scheletro, i cancelli scritti, uno screenshot reale dell'ambiente di test, e il divieto di
   aggiungere funzionalità.

2. Questo compito è lungo (una o due ore di lavoro dell'agente) e avrà andirivieni: credenziali che
   mancano, un servizio che chiede di confermare l'email, ecc. È normale. Ciò che non è normale è
   che ti dica "fatto" senza lo screenshot dell'ambiente di test.
3. Quando ti mostra lo screenshot, apri tu l'URL nel tuo browser. Si deve vedere la stessa cosa. È
   il primo sguardo umano sul sistema, ed è una pietra miliare.

**Prima di inviare il prompt** di chiusura: la tua visita all'URL dell'ambiente di test fatta, il
link all'esecuzione dell'integrazione continua in verde aperto da te, e `docs/GATES.md` letto, con
una condizione verificabile per cancello.

4. Chiudi con:

> Skeleton approved. Record in `docs/STATUS.md` the test environment URL, the command to run
> the tests and the command to deploy, and mark this step as done. Then run the deployment a
> second time and show me that the second run changed nothing.

> [it]
> Scheletro approvato. Registra in `docs/STATUS.md` l'URL dell'ambiente di test, il comando per
> eseguire i test e il comando per distribuire, e segna questo passo come fatto. Poi esegui il
> deployment una seconda volta e mostrami che la seconda esecuzione non ha cambiato nulla.

**Verifica di completezza.** Hai aperto tu l'URL dell'ambiente di test e visto la schermata vuota?
C'è un link a un'esecuzione di integrazione continua in verde? Il deployment è stato eseguito due
volte e la seconda non ha rotto nulla? I cancelli hanno ciascuno una condizione verificabile? C'è
qualche funzionalità che non hai chiesto?

**Consegna.** Il repository con lo scheletro, l'integrazione continua in verde, l'URL
dell'ambiente di test funzionante, `docs/GATES.md`, e `docs/STATUS.md` con i tre comandi.

**Errori tipici.** Accettare "funziona in locale, il deployment lo vediamo dopo": no, il
deployment è lo scheletro. Accettare uno screenshot della macchina dell'agente invece
dell'ambiente di test. E lasciare che "già che c'è" ti aggiunga una schermata di login, un menu, un
logo: ogni cosa che entra senza voce in sospeso è perimetro che è scappato.

**Nel progetto guida.** Lo scheletro di Turnera è una pagina web che dice "Turnera — versione
0.0.1" che gira su un URL pubblico di un ambiente di test, un server che risponde "ok" su una rotta
di salute, un test di fumo che chiama quella rotta, l'integrazione continua che esegue quel test a
ogni push, e il deployment automatico nell'ambiente di test. I cancelli: "batteria in verde per
fondere", "ambiente di test in verde per promuovere in produzione", "rollback provato per il primo
deployment in produzione". Niente di più. Ed è strano quanto sia soddisfacente vedere quella pagina
vuota su un URL reale.

---

## Fase del ciclo: lezioni da 5 a 10

Queste sei lezioni sono quelle che userai **a ogni modifica**, per tutto il progetto. Si imparano
nelle settimane 2 e 3 sui primi due blocchi funzionali, e si praticano fino alla fine. L'idea è che
finita la fase tu abbia il riflesso: aprire un blocco convertendo la richiesta in voci in sospeso
specificate, prenderne una, costruire, provare in rosso, eseguire la prova end to end del flusso,
aggiornare l'altro lato, misurare ciò che c'è da misurare, riportare separando il verificato dal
creduto, documentare la voce chiusa, e alla chiusura del blocco usare il sistema tu stesso. Quel
riflesso è il metodo.

Per praticarle avrai bisogno di funzionalità reale. Nel progetto guida, il primo blocco è l'agenda
di base: vedere gli appuntamenti del giorno, caricare un appuntamento, cancellarlo. Il secondo,
pazienti e ricerca. Niente messaggi né pagamenti ancora; quello viene dopo i lucchetti (lezione
12).
### Lezione 5 — Il piano sono le voci in sospeso, e la specifica dettagliata vive in ciascuna

**Cosa devi capire.** Non c'è un "piano" da una parte e una "lista di compiti" dall'altra: **la
lista delle voci in sospeso è il piano**. Ma ci sono altre due idee, e sono quelle che distinguono
questo metodo da una lista di cose da fare qualunque.

La prima: la **specifica dettagliata vive in ogni voce in sospeso**. Nel metodo classico c'era un
documento di specifica dei requisiti, lungo, che invecchiava prima di essere finito. Qui si
scompone: ogni voce porta il nodo dell'albero semantico da cui pende, la storia utente o il caso
d'uso che la origina con le parole del cliente, la descrizione dettagliata, le regole di business
applicabili con la loro decisione e la loro data, i dati che entrano ed escono, le schermate
coinvolte, i casi limite, i criteri di accettazione nella forma "dato, quando, allora", e come si
verifica. Leggere la specifica di una voce in sospeso è il punto più vicino a leggere codice a cui
arriverai, ed è esattamente la distanza giusta: è lì che tu ti accorgi che l'agente ha capito
un'altra cosa, prima che costruisca.

La seconda: **le voci in sospeso chiuse sono documentazione**. Quando una voce si chiude, resta con
la sua specifica, la decisione che l'ha originata, la prova con cui è stata chiusa, il commit e la
data. La coda delle voci chiuse è lo storico funzionale del sistema, e da lì escono il diario
delle modifiche e le sezioni nuove del manuale. E la regola d'oro per l'agente: ciò che compare
fuori dalla lista si annota come voce nuova, con la sua specifica, non si fa.

**Il compito.**

**Prima di inviare il prompt**, con le tue mani:

- La richiesta del cliente per il primo blocco di funzionalità, scritta in
  `docs/INITIAL_SURVEY.md` sotto un titolo con il nome del blocco, o in un file a parte (per
  esempio `docs/blocks/BLOCK_01_REQUEST.md`; il prompt dice "the client's request for this block"
  senza percorso, quindi digli dov'è), così come la direbbe il cliente, con le sue ambiguità. Per
  Turnera: "voglio vedere gli appuntamenti del giorno, caricarne uno nuovo e cancellare". Se
  nell'acquisizione hai scritto i casi d'uso, incolla anche quelli: sono l'unità naturale del
  blocco. Se il proprietario ti ha dato una priorità, anche quella.
- `docs/SEMANTIC_TREE.md`, `PROJECT.md` e `docs/STATUS.md`, aggiornati (lezione 2).

1. Incollagli:

> We are going to turn everything that must be done in this block into numbered pending items,
> each one carrying its full specification. Read `PROJECT.md`, `docs/SEMANTIC_TREE.md`, the
> client's request for this block, and whatever is in `docs/STATUS.md`. If the request is
> ambiguous on any point such that you cannot write a verifiable pending item for it, ask me; do
> not resolve it by assuming. Then create or extend `docs/PENDING.md` with one item per thing to
> do, each with: number (PND-001 onwards); one-line title; the node of the semantic tree it hangs
> from; the user story or use case that originates it, in the client's words; the detailed
> description; the business rules that apply, each with its decision and date, or marked as
> "rule missing, asked"; the data in and out; the screens affected; the edge cases and
> exceptions; the acceptance criteria in the form "given, when, then"; how it will be verified
> as done; and status. If a node the item needs does not exist in the tree, propose it and mark
> it. Order the items by the priority I gave you; if I gave none, propose an order and tell me
> why. Reply in my language.

> [it]
> Convertiremo tutto ciò che va fatto in questo blocco in voci in sospeso numerate, ciascuna
> con la sua specifica completa. Leggi `PROJECT.md`, `docs/SEMANTIC_TREE.md`, la richiesta del
> cliente per questo blocco, e ciò che c'è in `docs/STATUS.md`. Se la richiesta è ambigua in
> qualche punto in modo che tu non possa scrivere una voce verificabile, chiedimelo; non
> risolverlo supponendo. Poi crea o estendi `docs/PENDING.md` con una voce per cosa da fare,
> ciascuna con: numero (da PND-001 in poi); titolo di una riga; il nodo dell'albero semantico da
> cui pende; la storia utente o il caso d'uso che la origina, con le parole del cliente; la
> descrizione dettagliata; le regole di business che si applicano, ciascuna con la sua decisione
> e data, o segnata come "regola mancante, chiesta"; i dati che entrano ed escono; le schermate
> coinvolte; i casi limite e le eccezioni; i criteri di accettazione nella forma "dato, quando,
> allora"; come si verificherà che è fatta; e lo stato. Se un nodo di cui la voce ha bisogno non
> esiste nell'albero, proponilo e segnalo. Ordinale per la priorità che ti ho dato; se non te ne
> ho data nessuna, proponi un ordine e dimmi perché. Rispondi nella mia lingua.

   Gli stai chiedendo di convertire la richiesta in voci verificabili, di **chiedere quando la
   richiesta non permette di scriverne una verificabile**, la specifica completa di ciascuna
   campo per campo, il nodo dell'albero da cui pende, le regole di business con la loro decisione
   o segnate come mancanti, i criteri di accettazione che poi saranno il copione del test, e un
   ordine con la sua ragione.

2. Rispondi alle domande (per Turnera chiederà, per esempio, cos'è "il giorno": quello di oggi, o
   uno qualsiasi che si scelga?; cancellare cancella o marca?). Quelle domande sono decisioni di
   business; nella lezione 6 vedrai dove si scrivono.
3. **Leggi la specifica di ogni voce in sospeso** come se fossi il cliente. Questo è il compito
   più importante della lezione, e quello che dà più tentazione di saltare. Descrive ciò che hai
   chiesto, con le tue parole? I criteri di accettazione sono quelli che useresti tu per dire "va
   bene"? C'è un caso limite che tu conosci e non c'è? Pende dal nodo giusto? Correggi prima che
   si costruisca qualsiasi cosa.
**Prima di inviare il prompt** della routine: `docs/PENDING.md` con il blocco specificato e letto
da te voce per voce, con le tue correzioni fatte (nessuna voce con una specifica di una riga), e
`docs/WORKING_AGREEMENT.md`, dove la routine si aggiunge.

4. Aggiungi al patto di convivenza la routine di ogni sessione. Incollagli:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before touching any code, open
> `docs/PENDING.md`, tell me which item you are taking and why, and re-read its specification.
> Every commit cites its pending item. A pending item is closed with written evidence (the test
> counts red and green, the screenshot, the measured number), never with 'done'. When you close
> it, keep it in the register with its full specification and add: the evidence, the commit, the
> date, and any decision that was taken along the way; that record is the documentation of what
> was built. If along the way you see something that is not on the list, add it as a new pending
> item with its specification; do not do it."

> [it]
> Aggiungi questa routine a `docs/WORKING_AGREEMENT.md`: "Prima di toccare codice, apri
> `docs/PENDING.md`, dimmi quale voce prendi e perché, e rileggi la sua specifica. Ogni commit
> cita la sua voce in sospeso. Una voce si chiude con prove scritte (i numeri del test in rosso e
> in verde, lo screenshot, il numero misurato), mai con 'fatto'. Quando la chiudi, lasciala nel
> registro con la sua specifica completa e aggiungi: la prova, il commit, la data, e qualunque
> decisione sia stata presa lungo la strada; quel registro è la documentazione di ciò che è stato
> costruito. Se lungo la strada vedi qualcosa che non è nella lista, aggiungilo come voce nuova
> con la sua specifica; non farlo."

5. Adesso sì, comincia a costruire. Chiedigli di prendere la prima voce in sospeso. Da qui in poi,
   ogni sessione comincia con "quale voce prendi e perché", e ogni chiusura lascia la voce
   documentata.

**Verifica di completezza.** Leggi la specifica di una voce a caso: ha tutti i campi, e descrive
ciò che hai chiesto tu? Ogni voce pende da un nodo dell'albero che riconosci? Ciascuna dice come si
verifica? Ci sono regole segnate "mancante, chiesta" che non ti hanno chiesto? Ci sono voci chiuse
senza prova né commit? Quelle chiuse conservano la loro specifica e la loro documentazione di
chiusura? Prendi tre commit a caso: citano la loro voce? È comparso nel codice qualcosa senza voce?

**Consegna.** `docs/PENDING.md` con il primo blocco specificato, la routine nel patto, e la prima
voce in corso.

**Errori tipici.** Accettare specifiche di una riga: l'agente le ha scritte per adempiere, e
inventerà ciò che manca nel momento di costruire. Non leggere le specifiche: è l'unico momento in
cui puoi intercettare un malinteso prima che costi. Lasciare che l'agente chiuda voci senza prove
perché "l'ho già visto funzionare". Lasciare che chiuda senza documentare: sei mesi dopo nessuno sa
perché il sistema fa quello che fa. E quello che costa di più correggere: lasciare che faccia "una
cosina in più" fuori dalla lista. La prima volta che glielo lasci fare, hai perso il perimetro
esatto.

**Nel progetto guida.** Il primo blocco di Turnera sono circa sei voci in sospeso, che pendono dal
dominio "Agenda" dell'albero: PND-001 vedere gli appuntamenti di un giorno; PND-002 caricare un
appuntamento con paziente, professionista, data e ora; PND-003 impedire due appuntamenti dello
stesso professionista alla stessa ora; PND-004 cancellare un appuntamento (marcare, non cancellare:
decisione della lezione 6); PND-005 cercare un paziente per nome o telefono; PND-006 la
registrazione di un paziente con i dati minimi. La specifica di PND-003, per esempio, dice: nodo
Agenda → processo "caricare appuntamento" → entità Appuntamento; storia: "non possono esserci due
appuntamenti dello stesso professionista alla stessa ora, mi è successo due volte con il quaderno"
(parole della responsabile); regola: "doppio appuntamento solo se il professionista l'ha
abilitato" (decisione in sospeso, chiesta); dati: professionista, data, ora di inizio, durata;
schermata: modulo di caricamento; casi limite: appuntamenti che si sovrappongono parzialmente,
appuntamenti di durata diversa; criteri di accettazione: "dato un appuntamento del Dott. A alle
10:00, quando provo a caricarne un altro del Dott. A alle 10:00, allora la schermata avvisa e il
database non lo salva"; verifica: test end to end del modulo più query al database. Questa è una
specifica.

### Lezione 6 — Le decisioni si scrivono accanto al codice

**Cosa devi capire.** Il modello, quando trova un buco nelle regole di business, **lo riempie**.
Non si ferma a chiedere; completa con ciò che gli sembra più probabile, con la stessa naturalezza
con cui scrive il resto. Per questo questa lezione non è "scrivi le decisioni" ma "esigi che si
fermi e chieda quando ne manca una". E quando decidi, la decisione si scrive con le tue parole
testuali, il tuo nome e la data, nel commit, nella specifica della voce in sospeso e in un
registro. Io lo faccio dal primo sistema [Ref. 29](REFERENCIAS.md#ref-29); sei settimane dopo,
quando qualcuno chiederà "perché cancellare non cancella?", la risposta è scritta ed è tua.

**Il compito.**

**Prima di inviare il prompt**, con le tue mani:

- `docs/WORKING_AGREEMENT.md` (lezione 1), dove va la routine.
- `docs/DECISIONS.md`, creato anche se vuoto, con il formato nell'intestazione: data, chi ha
  deciso, le parole testuali, la voce in sospeso che la richiedeva.
- Un accordo con il proprietario del dominio, se non sei tu, sul canale e sul tempo in cui
  risponde: la routine funziona solo se qualcuno decide in ore, non in settimane.

1. Aggiungi al patto la routine delle decisioni. Incollagli:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Whenever implementing something requires a
> business rule that is not written down, or you must choose between two approaches that change
> what the user sees, stop and ask me, in prose, with your recommendation and the alternative. Do
> not implement the one you prefer. When I decide, write the decision with my name and the date
> in the commit message, in the pending item's specification and in `docs/DECISIONS.md`, with
> the exact words I used. If I do not answer and you must move on, implement the most reversible
> option and mark it 'decision by omission, pending confirmation', so that I can review it."

> [it]
> Aggiungi questa routine a `docs/WORKING_AGREEMENT.md`: "Ogni volta che implementare qualcosa
> richiede una regola di business che non è scritta, o devi scegliere tra due approcci che
> cambiano ciò che l'utente vede, fermati e chiedimelo, in prosa, con la tua raccomandazione e
> l'alternativa. Non implementare quella che preferisci. Quando io decido, scrivi la decisione
> con il mio nome e la data nel messaggio del commit, nella specifica della voce in sospeso e in
> `docs/DECISIONS.md`, con le parole esatte che ho usato. Se non rispondo e devi proseguire,
> implementa l'opzione più reversibile e segnala come 'decisione per omissione, in attesa di
> conferma', perché io la riveda."

   Gli stai chiedendo di fermarsi davanti a una regola non scritta, di chiedere con
   raccomandazione e alternativa (perché tu possa decidere in dieci secondi), di registrare le
   tue parole testuali nei tre posti, e quando non rispondi di scegliere la più reversibile e
   segnarla.

2. Continua a costruire le voci del blocco. Ogni volta che ti chiede una regola di business,
   decidi e rispondi con il formato di chiusura.

**Prima di inviare il prompt** di chiusura: la domanda dell'agente letta con la sua
raccomandazione e la sua alternativa, e la tua decisione redatta in una frase con le parole esatte
che vuoi restino per sempre, consultata con il proprietario se non sei tu, con la data. Non si
improvvisa nella chat.

3. Incollagli:

> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.

> [it]
> Regola: [testo esatto]. Decisa da me, [data]. Annotala e prosegui.

4. Fai la prova contraria, una volta, di proposito: lascia una domanda senza risposta per una
   sessione e guarda cosa fa. Deve scegliere la più reversibile e segnarla "per omissione". Se ha
   scelto ciò che gli pareva e non l'ha segnato, è un fallimento del gradino: correggilo nel
   patto.

**Verifica di completezza.** Apri tre commit che toccano regole di business: citano chi ha deciso e
quando? La regola sta anche nella specifica della voce? Ci sono decisioni "per omissione" senza
conferma? C'è qualche regola nel sistema che non riconosci come tua? Le frasi sono testuali o
"migliorate"?

**Consegna.** `docs/DECISIONS.md` che cresce, con almeno cinque decisioni del primo blocco, e i
commit e le voci in sospeso che le citano.

**Errori tipici.** Rispondere alle domande via chat e non esigere che restino scritte: alla terza
sessione nessuno se le ricorda più. Lasciare che l'agente "migliori" le tue parole: una regola
parafrasata è una regola diversa. E il più grave: scoprire in produzione una regola che nessuno ha
deciso. Quando succede (succederà), non è un bug: è un fallimento del gradino 6, e si corregge nel
patto, non solo nel codice.

**Nel progetto guida.** Decisioni tipiche del primo blocco di Turnera: "cancellare marca
l'appuntamento come cancellato e salva chi e quando; non si cancella nulla"; "un professionista non
può avere due appuntamenti alla stessa ora, ma sì due pazienti in un appuntamento doppio se il
professionista l'ha abilitato"; "il telefono del paziente è obbligatorio; l'email no". Ciascuna con
la data e con il nome della responsabile, e ciascuna incollata nella specifica della voce in
sospeso che ne aveva bisogno.

### Lezione 7 — I test come lucchetti, provati in rosso, e le prove end to end

**Cosa devi capire.** Questa è la lezione centrale del corso. Di un test che non hai mai visto
fallire non sai se prova qualcosa. Il modello scrive il codice e il test nella stessa sessione, con
la stessa comprensione: se ha capito male la richiesta, il test prova ciò che ha capito, e passa.
L'unico modo economico per sapere che il test guarda ciò che conta è **vederlo in rosso contro il
codice vecchio**: se anche il codice di prima della modifica lo passa, il test non distingue il
prima dal dopo, e allora non serve. Per questo la richiesta non è "scrivi test" ma "mostrami il
rosso, poi il verde, poi la regressione". Il caso che lo mostra meglio è quello dei contatori che
non coincidevano [Ref. 26](REFERENCIAS.md#ref-26).

E la seconda idea, che è importante quanto la prima: le prove end to end. Un test che verifica
dalla schermata (clicca, digita, legge) e controlla l'effetto nel backend (la riga è rimasta, lo
stato è cambiato) è quello che sostituisce la tua lettura del codice. I criteri di accettazione
della voce in sospeso ("dato, quando, allora") sono il suo copione. E si eseguono **tre volte, a
tre scale**: il flusso toccato, con ogni voce; tutti i flussi che esistono, alla chiusura di ogni
blocco; e tutti i flussi con la versione esatta, prima di ogni deployment in produzione. Se fai
solo la terza, arrivi alla fine con un sistema che nessuno ha provato end to end per settimane.

**Il compito.**

**Prima di inviare il prompt**, con le tue mani:

- `docs/WORKING_AGREEMENT.md`, dove va la routine.
- La voce in sospeso che si chiuderà, con i suoi criteri di accettazione "dato, quando, allora" e
  il suo "come si verifica" in `docs/PENDING.md`: sono il copione del test. Se non li ha, torna
  alla lezione 5 prima di chiedere il test.
- La batteria e il comando per eseguirla in `docs/STATUS.md` (lezione 4), e l'ambiente di test in
  esecuzione, con dati sufficienti per il flusso che si tocca; se mancano dati, caricali tu o
  chiedigli di crearli come parte del test, ma che non li simuli.

1. Aggiungi al patto la routine delle prove. Incollagli:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "To close a pending item I need evidence,
> not your word. (1) Write the test that proves what the item asks for, following its acceptance
> criteria. (2) Demonstrate that this test fails against the previous code: you may temporarily
> revert the change, or run the test against the old version, but show me the red output. (3)
> Show me the green output with the change. (4) Run the regression suite for the neighbouring
> items and show me it is still green. (5) Run the end-to-end test of the flow this item
> touches, from the screen to the backend, and show me the backend effect. (6) Do not replace
> with mocks the very part you are trying to test. If testing end to end requires something you
> lack (data, access, an environment), ask me for it; do not simulate what you do not have.
> Finally, the commit message says 'proved red against [what]' and the test counts."

> [it]
> Aggiungi questa routine a `docs/WORKING_AGREEMENT.md`: "Per chiudere una voce in sospeso ho
> bisogno di prove, non della tua parola. (1) Scrivi il test che prova ciò che la voce chiede,
> seguendo i suoi criteri di accettazione. (2) Dimostra che quel test fallisce contro il codice
> precedente: puoi annullare temporaneamente la modifica, o eseguire il test contro la versione
> vecchia, ma mostrami l'output in rosso. (3) Mostrami l'output in verde con la modifica. (4)
> Esegui la regressione delle voci vicine e mostrami che è ancora in verde. (5) Esegui la prova
> end to end del flusso che questa voce tocca, dalla schermata fino al backend, e mostrami
> l'effetto nel backend. (6) Non sostituire con simulazioni proprio la parte che stai provando.
> Se provare end to end richiede qualcosa che non hai (dati, accesso, un ambiente), chiedimelo;
> non simulare ciò che non hai. Infine, il messaggio del commit dice 'provato in rosso contro
> [cosa]' e i numeri dei test."

   Gli stai chiedendo il test guidato dai criteri di accettazione, **il rosso dimostrato con
   l'output in vista**, il verde, la regressione delle voci vicine, la prova end to end del flusso
   con l'effetto nel backend, niente simulazioni proprio di ciò che si prova, e di chiedere ciò
   che manca invece di simularlo.

2. Prendi la voce del doppio appuntamento (PND-003 in Turnera, o l'equivalente nel tuo progetto:
   una regola che impedisce qualcosa). Chiedigli di chiuderla con la routine. Leggi il rapporto:
   deve esserci un output in rosso con i numeri ("1 su 1 fallisce contro la versione senza la
   regola"), poi il verde, e la prova end to end: un browser controllato da programma che apre la
   schermata, prova a caricare il doppio appuntamento, legge l'avviso, e controlla nel database
   che non è stato salvato.
3. Se ti dice che non può provare end to end perché la schermata non si può operare da programma,
   fermati: è X2 che fallisce, e va sistemato adesso (aggiungere identificatori agli elementi
   della schermata) prima di proseguire.

**Prima di inviare il prompt**: distingui se gli manca un input che hai tu (dati, un accesso, un
ambiente: daglielo e non mandare questo prompt) o se davvero il sistema non è testabile lì (questo
prompt).

4. Incollagli:

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

> [it]
> Spiega perché non si può provare, cosa bisognerebbe aggiungere perché si possa, e apri una
> voce in sospeso per quello. La modifica non è chiusa finché non si può provare.

5. **Alla chiusura del blocco**, quando le sei voci sono chiuse, esegui la batteria completa.

**Prima di inviare il prompt** della batteria: le sei voci chiuse con la routine, la versione
esatta che si promuoverà identificata e distribuita nell'ambiente di test, e la tua lista dei
flussi che esistono (ricavata dai casi d'uso dell'albero semantico), per confrontarla con ciò che
l'agente dirà di aver coperto.

6. Incollagli:

> Run the complete end-to-end suite of every flow that exists so far, in the test environment,
> with the exact version that will be promoted. Show me the counts, and for each flow the
> backend check that proves it. If any flow has no end-to-end test, say so and open a pending
> item for it; do not pass it as covered.

> [it]
> Esegui la batteria completa end to end di tutti i flussi che esistono finora, nell'ambiente di
> test, con la versione esatta che sarà promossa. Mostrami i numeri e, per ogni flusso, la
> verifica nel backend che lo prova. Se qualche flusso non ha una prova end to end, dillo e apri
> una voce in sospeso; non darlo per coperto.

7. E dopo di questo, **usa il sistema tu**. Apri l'ambiente di test e fai ciò che farebbe la
   receptionist: carica un appuntamento, prova il doppio appuntamento, cancella, cerca. Ciò che ti
   dà fastidio, ciò che non capisci, ciò che sta dove non dovrebbe: annotalo come voce in sospeso.
   Questa mezz'ora trova ciò che nessun test trova.

**Verifica di completezza.** Il rapporto mostra il rosso, con i numeri? La regressione è stata
eseguita nella stessa sessione, con i numeri? La prova end to end verifica anche il backend? C'è
qualche parte simulata proprio dove sta la modifica? Il commit dice "provato in rosso"? Alla
chiusura del blocco: ci sono tutti i flussi nella batteria end to end? Hai usato il sistema tu e
annotato ciò che hai trovato?

**Consegna.** Almeno tre voci in sospeso chiuse con la routine completa (rosso, verde,
regressione, end to end), la batteria completa end to end del blocco in verde, e le voci in
sospeso uscite dalle tue prove umane.

**Errori tipici.** Accettare "i test passano" senza numeri e senza rosso. Accettare che la
batteria si "acceleri" sostituendo le prove end to end con simulazioni. Lasciar passare un "non si
può provare" senza aprire la voce in sospeso. E chiudere il blocco senza usarlo tu: lo sguardo
umano non si delega.

**Nel progetto guida.** Il rosso del doppio appuntamento si vede così: l'agente toglie
temporaneamente la regola, esegue il test, e l'output dice che il test è fallito perché il secondo
appuntamento è stato salvato. Rimette la regola, esegue, verde. Poi la regressione: i test di
PND-001 e PND-002 sono ancora in verde. E quello end to end: un browser controllato da programma
carica il modulo, preme "salva", legge il messaggio "quell'orario è già occupato", e una query al
database conferma che c'è un solo appuntamento a quell'ora. Alla chiusura del blocco, la batteria
end to end percorre i tre flussi che esistono (vedere il giorno, caricare, cancellare), e la
responsabile carica dieci appuntamenti di prova e scopre che l'ora si sceglie con un menu a
tendina scomodo. Voce in sospeso nuova. Quando vedrai quel rapporto per la prima volta, capirai a
cosa serve tutto il metodo.

### Lezione 8 — Simmetria tra produttore e consumatore, e il registro degli anti-pattern

**Cosa devi capire.** Quando cambi un capo del sistema (il server, il database, un robot), l'altro
capo (la schermata, un contatore, un report) deve cambiare nello stesso commit. Se no, divergono, e
l'utente vede un numero da una parte e un altro dall'altra [Ref. 26](REFERENCIAS.md#ref-26). Il
principio che lo evita è semplice da enunciare e difficile da sostenere: **ogni lista ha un solo
proprietario**. Gli stati possibili di un appuntamento, le colonne di un report, le cause per cui
qualcosa aspetta: le definisce una sola parte (il produttore) e le altre le leggono da lì
[Ref. 27](REFERENCIAS.md#ref-27). L'albero semantico è il primo posto in cui quelle liste si
dichiarano. Appena ci sono due copie, una è vecchia; resta solo da sapere quale.

La seconda metà della lezione è il registro degli anti-pattern (GOTCHAS): gli errori che ti sei
già mangiato una volta, annotati con il loro odore, la loro causa radice, la loro correzione e come
rilevarli prima [Ref. 2](REFERENCIAS.md#ref-2). L'importante non è annotarli: è aggiungere la
verifica automatica che li rilevi, perché un anti-pattern annotato e non automatizzato si ripete
quando cambia la sessione.

**Il compito.**

**Prima di inviare il prompt**, con le tue mani:

- Almeno un blocco funzionale costruito: senza contratti tra le parti non c'è mappa da fare.
- `docs/SEMANTIC_TREE.md` aggiornato: le liste (stati, tipi, cause) sono dichiarate lì, e la mappa
  deve coincidere con l'albero.
- Una lista scritta da te di ciò che vive fuori dal repository e produce o consuma qualcosa del
  sistema (un robot, un foglio di calcolo, un processo di un'altra squadra), o la constatazione
  che non c'è nulla.

1. Chiedigli la mappa dei contratti:

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

> [it]
> Costruisci `docs/PRODUCER_CONSUMER_MAP.md`: per ogni contratto del sistema (un servizio, una
> tabella, un formato di file, una lista di valori), chi lo produce e chi lo consuma. Se ci sono
> parti del sistema a cui non puoi accedere o che non capisci, dimmelo invece di lasciarle fuori
> dalla mappa. Rispondi nella mia lingua.

   Gli stai chiedendo l'inventario dei contratti con i loro due lati, e che ciò che non vede lo
   dichiari invece di ometterlo.

**Prima di inviare il prompt** della routine: la mappa rivista da te (scegli un contratto e
verifica che i due lati siano quelli che conosci) e `docs/WORKING_AGREEMENT.md`.

2. Aggiungi la routine al patto:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before closing any change that touches a
> contract, look up every consumer in the map and update them in the same commit. Always prefer
> that the producer defines the list (columns, causes, states) and the consumer reads it, rather
> than each keeping its own copy. If the map does not have that relationship, add it."

> [it]
> Aggiungi questa routine a `docs/WORKING_AGREEMENT.md`: "Prima di chiudere qualunque modifica
> che tocchi un contratto, cerca nella mappa ogni consumatore e aggiornali nello stesso commit.
> Preferisci sempre che il produttore definisca la lista (colonne, cause, stati) e il consumatore
> la legga, invece che ciascuno tenga la propria copia. Se la mappa non ha quella relazione,
> aggiungila."

3. Fai la prova della lista: scegli una lista che compare nella schermata (in Turnera, gli stati
   di un appuntamento: in attesa, confermato, cancellato, assente) e chiedi all'agente di
   mostrarti dove è definita e dove viene letta. Se ci sono due definizioni, chiedigli di
   lasciarne una sola, e che coincida con l'albero semantico.
4. La prima volta che qualcosa si rompe per la seconda volta (succederà nelle prossime
   settimane), registralo.

**Prima di inviare il prompt**: la voce in sospeso o il commit della prima volta, individuato da
te tra quelle chiuse di `docs/PENDING.md`, per incollarglielo insieme al prompt (senza quel
riferimento l'anti-pattern esce generico); e `docs/GOTCHAS.md` creato anche se vuoto, con il
formato nell'intestazione: odore, causa radice, correzione, come rilevarlo prima.

5. Incollagli:

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

> [it]
> Questo ci è già successo. Registralo in `docs/GOTCHAS.md` con: come odora (il segnale precoce),
> la causa radice, la correzione, e come rilevarlo la prossima volta prima che faccia male. E
> aggiungi, se si può, un test o una verifica automatica che lo rilevi.

**Verifica di completezza.** Scegli un contratto della mappa: ogni consumatore lo legge dal
produttore o ha la propria copia? C'è un numero che compare in due schermate e danno lo stesso
risultato? Gli stati delle entità coincidono tra il codice e l'albero semantico? Ogni voce di
GOTCHAS ha le quattro parti? Si è ripetuto qualcosa che era già annotato?

**Consegna.** `docs/PRODUCER_CONSUMER_MAP.md`, la routine nel patto, e `docs/GOTCHAS.md` (anche se
parte con una sola voce).

**Errori tipici.** Fare la mappa una volta e non guardarla più: deve crescere con ogni contratto
nuovo. Annotare anti-pattern come aneddoti ("una volta è successo che…") senza la parte "come
rilevarlo prima". E il classico: lo stesso testo di uno stato scritto a mano nel server e nella
schermata; il giorno che uno cambia, l'altro resta.

**Nel progetto guida.** La mappa di Turnera ha, all'inizio, quattro o cinque contratti: la lista
degli stati dell'appuntamento (la definisce il server, la leggono la schermata e il report
mensile); la tabella degli appuntamenti (la scrive il caricamento, la leggono l'agenda del giorno
e il report); la tabella dei pazienti; e, più avanti, la coda dei messaggi (la scrive l'agenda, la
legge chi invia). Il primo GOTCHA di solito è di date: l'agenda mostrava l'appuntamento nel giorno
sbagliato perché il server salvava in un fuso orario e la schermata mostrava in un altro. Odore:
"l'appuntamento delle 23 compare domani". Causa radice: due fusi orari. Correzione: uno solo, nel
server. Rilevamento: un test con un appuntamento alle 23:30.

### Lezione 9 — Misurare prima di costruire, con uno strumento che a sua volta si verifica

**Cosa devi capire.** Il modello produce affermazioni con un numero ("ci sono circa 120 query di
quel tipo") e suonano esattamente uguali quando sono misurate e quando sono stimate. Tu non puoi
distinguerle dal tono. L'unico modo è esigere lo strumento: "con cosa l'hai misurato? mostrami il
comando". La regola del gradino è che **nessun numero che decide qualcosa esce da un'impressione**:
esce da un misuratore che vive nel repository, che ha un test che lo verifica contro un caso noto,
e che tu puoi eseguire.

E c'è qualcos'altro, che ho imparato a suon di colpi ed è il motivo per cui ho tardato a
formalizzare questa regola che davo per ovvia: anche i misuratori mentono. In uno dei miei sistemi,
un misuratore dava zero perché non vedeva una parte del codice, e un altro diceva 27 quando erano
44 [Ref. 35](REFERENCIAS.md#ref-35), [Ref. 36](REFERENCIAS.md#ref-36). Per questo l'audit in due
direzioni: dal codice alla misura (tutto ciò che dovrebbe essere contato è contato?) e dalla misura
al codice (tutto ciò che è contato esiste davvero?).

In un progetto piccolo, "misurare" è modesto: contare quante query fa una schermata al
caricamento, quanto ci mette il report mensile, quanti messaggi sono stati mandati ieri. Non serve
un cricchetto né un budget per percorso. Ciò che serve sì è che il numero abbia un comando dietro.

**Il compito.**

**Prima di inviare il prompt**, con le tue mani:

- L'ipotesi, in una frase. In Turnera, una buona: "l'agenda del giorno fa una query al database
  per ogni appuntamento che mostra" (il classico ciclo N+1). Se non è vera, meglio: vedrai come
  si verifica un'ipotesi falsa. Va nello spazio del prompt, insieme alla quantità da misurare.
- Un caso noto per il test del misuratore, in cui tu sai la risposta in anticipo ("con zero
  appuntamenti deve contare esattamente le query di base").
- Accesso a ciò che si misura (il database in sola lettura se sono dati reali, il log) e i
  misuratori che esistono già nel repository, nominati.

1. Incollagli:

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

> [it]
> Prima di costruire qualunque cosa, misureremo. L'ipotesi è: [l'agenda del giorno fa una query al
> database per ogni appuntamento che mostra]. Scrivi un misuratore (uno script che vive nel
> repository) che misuri [il numero di query che l'agenda del giorno fa per un giorno con N
> appuntamenti], e un test per il misuratore che lo verifichi contro un caso noto in cui la
> risposta si conosce in anticipo. Se misurare richiede accesso o dati che non hai, chiedimeli;
> non approssimare in silenzio. Se qualche parte si può solo approssimare, marcala come
> approssimata e dimmi il margine. Esegui il misuratore, mostrami il numero insieme al comando che
> lo produce, e verificalo nelle due direzioni: dal codice alla misurazione (è contato tutto ciò
> che dovrebbe essere contato?) e dalla misurazione al codice (esiste davvero tutto ciò che è
> contato?). Solo allora proponi cosa costruire. Rispondi nella mia lingua.

   Gli stai chiedendo il misuratore nel repository, il test del misuratore, di chiedere ciò che
   gli manca invece di approssimare, di marcare l'approssimato, il numero con il comando, l'audit
   in due direzioni, e l'ordine: prima misurare, poi proporre.

2. Esegui tu il comando che ti ha dato. Deve darti lo stesso numero. Non serve che tu capisca lo
   script; sì che lo esegua.
3. Se l'ipotesi era vera e l'agente propone di sistemarlo, chiedigli un budget.

**Prima di inviare il prompt** del budget: il numero misurato, eseguito da te con il comando che
ti ha dato (ti deve dare lo stesso), e il margine che sei disposto a dare, deciso da te: un po'
più di ciò che hai misurato, non il doppio per sicurezza.

4. Incollagli:

> Set the budget for [queries] on this path at the measured value plus a small margin, and
> protect it with a test that fails if it is exceeded. Tell me the number and the margin.

> [it]
> Fissa il budget di [query] su questo percorso al valore misurato più un margine piccolo, e
> proteggilo con un test che fallisca se viene superato. Dimmi il numero e il margine.

   Così, se qualcuno rimette il ciclo tra tre mesi, la batteria lo rileva.

**Prima di inviare il prompt** della regola cinque: `docs/WORKING_AGREEMENT.md`, e un misuratore
già esistente per ogni quantità che un piano possa affermare; se non c'è misuratore, prima il
prompt iniziale di questa lezione.

5. Aggiungi al patto la regola cinque, per quando un piano porta numeri:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before executing a plan that asserts
> numbers, verify every number with the meter. If any does not match, stop and tell me; do not
> execute on a wrong number."

> [it]
> Aggiungi questa routine a `docs/WORKING_AGREEMENT.md`: "Prima di eseguire un piano che afferma
> numeri, verifica ogni numero con il misuratore. Se qualcuno non coincide, fermati e dimmelo; non
> eseguire su un numero sbagliato."

**Verifica di completezza.** Hai eseguito il misuratore e ti ha dato lo stesso risultato? Ha un
test, contro quale caso noto? C'è qualche numero nel rapporto senza misuratore dietro?
L'approssimato è marcato? C'è un budget con test?

**Consegna.** Un misuratore nel repository con il suo test, un numero con il suo comando e la data
in `docs/STATUS.md` o nella voce in sospeso, e (se serviva) un budget protetto da un test.

**Errori tipici.** Accettare il numero senza eseguire il comando: metà del valore di questa
lezione sta nel fatto che lo esegua tu. Un misuratore che dà zero: non è quasi mai zero; quasi
sempre non sta vedendo qualcosa. E lasciare che l'agente "sistemi mentre misura": l'ordine è il
metodo.

**Nel progetto guida.** Il misuratore di Turnera è uno script che carica un giorno con 10, 50 e
200 appuntamenti in un database di test, apre l'agenda di quel giorno contando le query, e scrive
i tre numeri. Il test del misuratore verifica che con 0 appuntamenti conti esattamente le query di
base (diciamo, 2). Se c'era il ciclo, i numeri sono 12, 52 e 202; si sistema, diventano 3, 3 e 3,
e il budget resta a 4 con un test che fallisce se l'agenda fa più di 4 query per qualunque
quantità di appuntamenti.

### Lezione 10 — Verifica onesta e rapporto proporzionato

**Cosa devi capire.** Se tu non leggerai codice, il rapporto dell'agente deve essere affidabile, e
questo non succede da solo. Il modello è stato addestrato per essere utile e completo, e un
rapporto che dice "questo non l'ho potuto verificare" sembra meno utile di uno che dice "fatto".
Allora bisogna **chiedergli esplicitamente** le cattive notizie, i punti ciechi e ciò che non ha
fatto. Se non glielo chiedi, non te lo dà; non perché lo nasconda, ma perché non lo considera parte
della risposta. A me hanno riportato un errore di autenticazione con la dicitura "success"
[Ref. 43](REFERENCIAS.md#ref-43).

La struttura che lo rende onesto sono tre blocchi: **verificato** (con la prova accanto),
**creduto** (ciò che pensa che funzioni e perché non l'ha provato), e **punti ciechi** (ciò che
non può vedere da dove si trova). E una regola: le cattive notizie per prime.

**Il compito.**

**Prima di inviare il prompt**, con le tue mani:

- `docs/WORKING_AGREEMENT.md`, dove va la routine.
- L'abitudine di annotare, in ogni sessione, la lista di ciò che hai chiesto: il prompt gli esige
  di coprire ogni voce una per una, e tu devi sapere quante erano.

1. Aggiungi al patto la routine del rapporto:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "When you report, separate three blocks:
> VERIFIED (what you tested, with the command and its output), BELIEVED (what you think works but
> did not test, and why not), and BLIND SPOTS (what you cannot see from where you are: another
> environment, real data, the user's browser). Cover every item I asked for, one by one, even when
> the answer is 'I did not do it'. No claim without its proof next to it. Do not say 'done': say
> what is done and how you know it. If something went wrong, say it first."

> [it]
> Aggiungi questa routine a `docs/WORKING_AGREEMENT.md`: "Quando riporti, separa tre blocchi:
> VERIFICATO (ciò che hai provato, con il comando e il suo output), CREDUTO (ciò che pensi che
> funzioni ma non hai provato, e perché no), e PUNTI CIECHI (ciò che non puoi vedere da dove ti
> trovi: un altro ambiente, dati reali, il browser dell'utente). Copri ogni voce che ti ho
> chiesto, una per una, anche quando la risposta è 'non l'ho fatto'. Nessuna affermazione senza
> la sua prova accanto. Non dire 'fatto': di' cosa è fatto e come lo sai. Se qualcosa è andato
> male, dillo per primo."

2. Chiedigli di chiudere la prossima voce in sospeso e leggi il rapporto con la lista di verifica
   qui sotto. La prima volta, quasi di sicuro, il blocco "punti ciechi" sarà vuoto. Chiedigli:
   "cosa non puoi vedere da dove ti trovi?". Deve esserci qualcosa (il tuo browser, l'ambiente di
   produzione, i dati reali). Se insiste che niente, insisti tu.
3. Pratica l'"è ancora rotto". Chiedigli qualcosa di piccolo, verifica nell'ambiente di test, e se
   per qualunque ragione non vedi la modifica (è comune: il deployment tarda, o non è stato
   fatto), digli "è ancora rotto".

**Prima di inviare il prompt**: la tua verifica annotata (a quale URL hai guardato, quale versione
mostra il sistema, cosa hai fatto, cosa ti aspettavi, cosa è successo) e il commit o la versione
che l'agente ha detto contenesse la correzione, copiato dal suo rapporto. Senza di ciò, l'"è
ancora rotto" è un'impressione.

4. Incollagli:

> Before diagnosing again, compare the version running where I see the problem with the version
> that contains your fix. Tell me both. If they differ, the problem is publication, not code.

> [it]
> Prima di diagnosticare di nuovo, confronta la versione che gira dove io vedo il problema con la
> versione che contiene la tua correzione. Dimmi entrambe. Se sono diverse, il problema è di
> pubblicazione, non di codice.

   La metà degli "è ancora rotto" sono correzioni che stanno nel repository e non nel posto dove
   tu guardi [Ref. 45](REFERENCIAS.md#ref-45). Questa clausola ti fa risparmiare ore.

**Verifica di completezza.** Ci sono i tre blocchi? Hai scelto un'affermazione di "verificato" a
caso e ha la sua prova accanto, e l'hai potuta riprodurre? Copre ogni voce di ciò che hai chiesto?
Le cattive notizie sono all'inizio? Ha detto "fatto" e basta qualche volta?

**Consegna.** La routine nel patto e tre rapporti consecutivi con i tre blocchi, uno dei quali con
un punto cieco reale.

**Errori tipici.** Leggere solo il blocco "verificato" e saltare gli altri due: gli altri due sono
quelli che ti proteggono. Accettare "dovrebbe funzionare" dentro "verificato": quello è "creduto"
travestito. E abituarsi a rapporti sempre più lunghi: un rapporto gonfiato sta coprendo qualcosa
con il volume.

**Nel progetto guida.** Un buon rapporto di chiusura di PND-004 (cancellare un appuntamento) in
Turnera: "VERIFICATO: il test di cancellazione passa (1/1, provato in rosso contro la versione che
cancellava fisicamente); regressione 6/6; end to end del flusso 'cancellare' in verde, con la riga
marcata nel database; nell'ambiente di test, l'appuntamento 17 del 3 novembre risulta cancellato
da 'reception1' alle 10:42 (screenshot). CREDUTO: il report mensile conterà bene le cancellazioni,
ma non l'ho provato perché il report è PND-011 e ancora non esiste. PUNTI CIECHI: non posso vedere
come appare lo stato 'cancellato' sul cellulare della receptionist; provalo tu."

---

## Fase di esercizio: lezioni da 11 a 15

Queste cinque lezioni sono quelle che trasformano "funziona" in "si può sostenere". Si fanno
nelle settimane 4 e 5, quando i primi due blocchi sono costruiti con il ciclo e provati da te
nell'ambiente di test, e prima che il sistema agisca sul mondo (mandi messaggi, addebiti) o abbia
utenti reali. Nel progetto guida, è il momento di aggiungere i promemoria e la caparra, e per
questo la lezione 12 (lucchetti) va prima di costruire quelle funzionalità, non dopo.

### Lezione 11 — L'audit periodico come input del piano

**Cosa devi capire.** Ogni tanto bisogna guardare il sistema intero con occhi freschi, e ciò che
si vede non va in un rapporto che si archivia: va nella lista delle voci in sospeso. La parte
importante è "occhi freschi": chi fa l'audit non deve essere chi ha costruito, perché ne condivide
le supposizioni. Un modello che ha costruito un modulo "sa" che la password scritta nel codice era
provvisoria; un modello che lo vede per la prima volta la riporta per ciò che è. Così si sono
trovate due porte di amministratore che il costruttore aveva lasciato in un giorno
[Ref. 40](REFERENCIAS.md#ref-40). Non serve un'altra azienda: basta **un'altra sessione, con un
altro file di istruzioni, che non abbia partecipato**.

**Il compito.**

**Prima di inviare il prompt**, con le tue mani:

- Una sessione nuova dell'agente in una copia pulita del repository (clonalo in un'altra
  cartella). Se il tuo strumento lo permette, dagli un file di istruzioni diverso, che dica solo
  "sei un auditor; non hai costruito questo sistema".
- Accesso in sola lettura per quella sessione all'ambiente di test (database, log), con
  credenziali in sola lettura fuori dal repository.
- Il perimetro deciso da te per lo spazio del prompt, e l'audit precedente, se c'è stato.

1. Incollagli:

> Audit this system for [integrity, security, performance and code quality]. Read-only: change
> nothing except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires
> access you lack (the database, the log, an environment), tell me and mark that part as not
> audited; do not pass it as fine. Go through all of the code, not a sample. For every finding:
> where it is (file and line), what the risk is, what evidence proves it (the command, the
> query, the number), and its priority: P0 must be fixed now, P1 soon, P2 when possible. Give a
> grade to every dimension you audited. End with the list of P0 findings turned into proposed
> pending items. Reply in my language.

> [it]
> Fai l'audit di questo sistema su [integrità, sicurezza, prestazioni e qualità del codice]. Sola
> lettura: non cambiare niente salvo scrivere il tuo rapporto in `docs/AUDIT_[data].md`. Se fare
> l'audit di qualche parte richiede un accesso che non hai (il database, il log, un ambiente),
> dimmelo e marca quella parte come non verificata; non darla per buona. Percorri tutto il codice,
> non un campione. Per ogni rilievo: dov'è (file e riga), qual è il rischio, quale prova lo
> dimostra (il comando, la query, il numero), e la sua priorità: P0 va sistemato subito, P1
> presto, P2 quando si può. Dai un voto a ogni dimensione di cui hai fatto l'audit. Termina con
> la lista dei rilievi P0 convertiti in voci in sospeso proposte. Rispondi nella mia lingua.

   Gli stai chiedendo sola lettura, di dichiarare ciò che non ha potuto verificare invece di
   approvarlo per omissione, tutto il codice e non un campione, ogni rilievo con posizione,
   rischio, prova e priorità, voti per dimensione, e i P0 già come voci in sospeso proposte.

2. Leggi il rapporto. Scegli due rilievi e chiedi all'auditor di mostrarti la prova (il comando,
   la riga). Deve poterlo fare.

**Prima di inviare il prompt** di chiusura: il rapporto letto da te, i due rilievi verificati con
l'auditor, e la sessione del costruttore aperta (questo prompt va al costruttore, non
all'auditor), con la data del file nello spazio.

3. Torna alla sessione del costruttore e incollagli:

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.

> [it]
> Leggi `docs/AUDIT_[data].md`. Apri una voce in sospeso per ogni P0 e P1, citando il rilievo. Se
> non sei d'accordo con qualcuno, dimmelo con la prova contraria; non ignorarlo.

4. Ripeti questa lezione prima del primo deployment in produzione (lezione 13) e, poi, ogni uno o
   due mesi.

**Verifica di completezza.** Il rapporto dice cosa NON ha potuto verificare? Due rilievi a caso
hanno file, riga e prova riproducibile? Ogni P0 ha la sua voce in sospeso aperta? I voti si
potranno confrontare con il prossimo audit? L'audit l'ha fatto una sessione diversa da quella che
ha costruito?

**Consegna.** `docs/AUDIT_[data].md` e le voci in sospeso P0/P1 aperte.

**Errori tipici.** Fare l'audit con la stessa sessione che ha costruito: confermerà le proprie
supposizioni. Accettare un rapporto senza nessun P0 in un sistema di più di un mese: non è quasi
mai vero. E archiviare il rapporto senza aprire le voci in sospeso: lì l'audit non è servito a
niente.

**Nel progetto guida.** Il primo audit di Turnera di solito trova: dati dei pazienti nel log
(telefoni stampati quando si inviano messaggi: P0); la ricerca dei pazienti per nome senza indice
(P1, si noterà a 5.000 pazienti); il modulo dell'appuntamento che non valida che la data sia
futura (P1); e qualche dipendenza con una vulnerabilità nota (P1). Quattro voci in sospeso nuove,
tutte con file e riga.

### Lezione 12 — Fail-closed, lucchetti e zero danno silenzioso

**Cosa devi capire.** Il software, per default, davanti al dubbio va avanti: se la validazione
fallisce, il codice continua; se il servizio non risponde, si assume che tutto vada bene. È
"fail-open", come una porta che si apre quando va via la luce. Il metodo inverte il default:
**davanti al dubbio, no**. Ogni azione con conseguenze (addebitare, inviare, cancellare,
approvare) porta un lucchetto, ha una via del ritorno scritta, e ogni automazione nuova parte in
modalità di prova, registrando ciò che avrebbe fatto, finché tu non la abiliti. I lucchetti che ho
messo nel mio primo sistema sono il modello [Ref. 28](REFERENCIAS.md#ref-28).

Questa lezione va **prima** di costruire le funzionalità che agiscono sul mondo. In Turnera, prima
dei promemoria e della caparra, che sono il terzo blocco.

**Il compito.**

**Prima di inviare il prompt**, con le tue mani e con il proprietario:

- `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`: cosa fa o farà il sistema che addebita, invia, approva,
  cancella o avvisa qualcuno di fuori; e per ogni azione, cosa succede se si fa due volte, cosa
  succede se si fa male, come si annulla, chi dovrebbe poterla fare. I processi dell'albero
  semantico ti danno la lista di partenza. Il prompt lo nomina "the survey of consequential
  actions", senza percorso: digli dov'è.
- `docs/SEMANTIC_TREE.md`, aggiornato.

1. Incollagli:

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock. Reply in my language.

> [it]
> Decideremo quali azioni del sistema hanno bisogno di un lucchetto. Leggi la rilevazione delle
> azioni con conseguenze, e percorri il codice cercando tutto ciò che addebita, invia, approva,
> cancella o avvisa verso l'esterno. Confronta le due liste: se il codice ha azioni che la
> rilevazione non menziona, o viceversa, chiedimelo prima di proseguire. Per ogni azione proponi:
> se è reversibile, quale lucchetto porta (conferma esplicita, doppia sicura, modalità di prova,
> limite giornaliero, un umano nel circuito), e qual è la via del ritorno se va male. Regola
> generale: davanti a qualunque dubbio o fallimento lungo il percorso, l'azione NON si esegue e si
> registra il motivo. Presentami la tabella; io confermo lucchetto per lucchetto. Rispondi nella
> mia lingua.

   Gli stai chiedendo di confrontare ciò che il business ha detto con ciò che il codice fa (lì
   compaiono le azioni che nessuno ricordava), di chiedere le differenze, e per ogni azione la
   reversibilità, il lucchetto e la via del ritorno, con la regola del fail-closed scritta.

2. Conferma lucchetto per lucchetto, con il proprietario.

**Prima di inviare il prompt** di chiusura: per ogni riga della tabella, la tua conferma o il tuo
cambiamento, scritti per gli spazi del prompt; nessuna riga senza verdetto, perché un lucchetto
non confermato è un lucchetto che non si implementa.

3. Chiudi con:

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.

> [it]
> Confermo i lucchetti [lista]; cambia [X] in [Y]. Implementali con un test per lucchetto che
> provi che, nella condizione di dubbio, l'azione NON avviene (provato in rosso contro la versione
> senza il lucchetto). Registra la tabella finale in `docs/LOCKS.md`. E per ogni automazione
> nuova: modalità di prova per prima, registrando ciò che avrebbe fatto, finché non la abilito io.

4. Adesso apri il terzo blocco (i promemoria, la caparra) con la lezione 5, costruiscilo con il
   ciclo completo delle lezioni da 5 a 10, e lascialo in modalità di prova. Guarda per qualche
   giorno il registro di "avrebbe mandato" prima di abilitare l'invio reale.

**Verifica di completezza.** Ogni azione che addebita, invia, approva o cancella è nella tabella?
Ogni lucchetto ha il suo test in rosso? Ogni azione irreversibile ha una via del ritorno scritta?
Le automazioni nuove sono partite in modalità di prova e hai visto il registro prima di
abilitarle?

**Consegna.** `docs/LOCKS.md`, un test per lucchetto provato in rosso, e le automazioni in
modalità di prova con il loro registro.

**Errori tipici.** Abilitare l'invio reale "per provare con un messaggio al mio telefono": la
modalità di prova esiste proprio per quello. Un lucchetto che si salta con un parametro "per i
test": quel parametro resterà impostato in produzione. E non guardare il registro di "avrebbe
fatto": è l'unica finestra per vedere un errore prima che arrivi a un paziente.

**Nel progetto guida.** La tabella dei lucchetti di Turnera: inviare promemoria (non reversibile;
lucchetto: idempotenza per appuntamento, un solo invio per appuntamento e canale, limite di 200 al
giorno, modalità di prova per prima; ritorno: nessuno, per questo il limite); addebitare la
caparra (reversibile con rimborso; lucchetto: conferma esplicita della receptionist, importo
fissato dal professionista; ritorno: rimborso tramite il provider di pagamento); cancellare un
appuntamento (irreversibile per il paziente; lucchetto: conferma e registrazione di chi; ritorno:
ricreare l'appuntamento); cancellare un paziente (irreversibile; lucchetto: doppia conferma, solo
la responsabile, e solo se non ha appuntamenti futuri; ritorno: nessuno, per questo doppia). Ogni
lucchetto con un test che mostra che, senza il lucchetto, l'azione avveniva.

### Lezione 13 — Integrazione continua, ambienti, segreti e deployment come parte del prodotto

**Cosa devi capire.** Arrivare in produzione deve essere un pacchetto riproducibile: i test girano
**una** volta, il deployment impacchetta e carica soltanto, la configurazione vive nel server e non
nel repository, c'è una procedura per promuovere da test a produzione che si può eseguire due
volte, e il rollback è **provato** (un rollback che non è mai stato provato non esiste). A me i
test eseguiti tre volte per commit hanno bruciato la quota di integrazione continua
[Ref. 39](REFERENCIAS.md#ref-39). Sui segreti, una regola senza eccezioni: **un segreto che si è
visto in una chat, in un log o in un commit non è più un segreto**; si ruota, e basta
[Ref. 42](REFERENCIAS.md#ref-42).

Hai già buona parte di questo dallo scheletro (lezione 4): l'integrazione continua e il deployment
in test. Questa lezione lo completa verso la produzione.

**Il compito.**

**Prima di inviare il prompt**, con le tue mani:

- `docs/ENVIRONMENTS_SURVEY.md` (lezione 4), completato con ciò che manca per la produzione: il
  dominio e chi lo amministra, dove vivranno i segreti e quali sono (il nome, mai il valore), chi
  può toccare la produzione, come si farebbe oggi un rollback, e quanta quota di integrazione
  continua hai (se usi GitHub Actions, guarda il limite del piano). Il prompt lo nomina "the
  environments and access survey": digli dov'è.
- L'accesso alla produzione per l'agente, deciso da te, con la credenziale fuori dal repository e
  dalla chat.
- Lo scheletro con la sua integrazione continua e il suo deployment in test funzionanti (lezione
  4).

1. Incollagli:

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

> [it]
> Chiuderemo il percorso verso la produzione. Leggi la rilevazione di ambienti e accessi. Valuta
> se hai ciò che serve per distribuire in produzione in sicurezza (accesso, dominio, dove vivono i
> segreti, come tornare indietro); se manca qualcosa, chiedimelo. Poi monta: (1) l'integrazione
> continua esegue la batteria completa esattamente una volta per commit; (2) il deployment aspetta
> il risultato di quell'esecuzione e impacchetta e carica soltanto, senza rieseguire i test; (3)
> la configurazione di ogni ambiente vive nel server (file di ambiente o cassaforte), mai nel
> repository; (4) una procedura scritta per promuovere dall'ambiente di test alla produzione, che
> si possa eseguire due volte senza rompere niente; (5) il rollback, provato; (6) una verifica
> automatica che impedisca di caricare un segreto in un commit. Documenta tutto in
> `docs/DEPLOYMENT.md` in modo che una persona possa farlo a mano senza di te. Rispondi nella mia
> lingua.

   Gli stai chiedendo gli accessi prima di cominciare, i test una sola volta per commit, il
   deployment che impacchetta soltanto, la configurazione fuori, la promozione ripetibile, il
   rollback provato, il lucchetto contro i segreti, e la documentazione per una persona.

2. Prima del primo deployment in produzione, fai l'audit della lezione 11 se non l'hai fatto, ed
   esegui la batteria completa end to end di tutti i flussi con la versione esatta che promuoverai
   (il prompt di chiusura del blocco della lezione 7).

**Prima di inviare il prompt** della routine: `docs/DEPLOYMENT.md` scritto e letto da te (lo
potresti seguire da solo?), e `docs/WORKING_AGREEMENT.md`.

3. Aggiungi al patto la routine del deployment:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before touching production: the test
> environment is green with the same version; the rollback is ready; and tell me what changes in
> the configuration. After deploying: show me the version running in production and an
> end-to-end check on production, read-only."

> [it]
> Aggiungi questa routine a `docs/WORKING_AGREEMENT.md`: "Prima di toccare la produzione:
> l'ambiente di test è in verde con la stessa versione; il rollback è pronto; e dimmi cosa cambia
> nella configurazione. Dopo il deployment: mostrami la versione che gira in produzione e una
> verifica end to end sulla produzione, in sola lettura."

4. Fai il primo deployment in produzione, con il sistema ancora senza utenti reali. E poi **prova
   il rollback**: chiedigli di tornare alla versione precedente e di mostrarti che sta girando, e
   poi di tornare a quella nuova.
5. Se in qualche momento del corso hai incollato un segreto nella chat (una chiave API, una
   password), ruotalo.

**Prima di inviare il prompt**: il segreto identificato (il suo nome, mai il suo valore), dove è
comparso e quando, e il tuo accesso al pannello dove si genera, nel caso l'agente non possa
ruotarlo da solo. Questo prompt non si manda "più tardi".

6. Incollagli:

> That secret is compromised: rotate it now, tell me everywhere else it was used, and add the
> check that would have caught it.

> [it]
> Quel segreto è compromesso: ruotalo adesso, dimmi in quali altri posti è stato usato, e
> aggiungi la verifica che l'avrebbe intercettato.

**Verifica di completezza.** Quante volte gira la batteria per commit? (una; chiedi il link). C'è
qualche valore reale di configurazione nel repository? (chiedigli la ricerca vuota). Potresti
seguire `docs/DEPLOYMENT.md` da solo? Il rollback è stato provato, quando, con quale prova? È
stato ruotato ogni segreto comparso nella chat? Sai quanta quota di integrazione continua ti
resta?

**Consegna.** L'integrazione continua una volta per commit, il deployment che impacchetta
soltanto, `docs/DEPLOYMENT.md`, il rollback provato, il lucchetto anti-segreti attivo, e il
sistema che gira in produzione (ancora senza utenti).

**Errori tipici.** Il deployment "a mano, veloce, perché è una modifica piccola": le modifiche
piccole rompono la produzione perché nessuno le prova. Il file di esempio della configurazione con
valori che sembrano reali (lo sono). E non provare il rollback fino al giorno in cui ti serve.

**Nel progetto guida.** Per Turnera, l'integrazione continua esegue la batteria (una trentina di
test a questo punto, inclusi i sei flussi end to end) a ogni push; il deployment in test è
automatico alla fusione in `main`; la promozione in produzione è un comando che impacchetta la
versione che sta in test e la carica, con la configurazione (la chiave del provider di messaggi,
quella del provider di pagamento, la URL del database) in un file di ambiente nel server che non
sta nel repository. Il rollback è lo stesso comando con la versione precedente. E il lucchetto
anti-segreti è una verifica a ogni commit che rifiuta qualunque cosa che sembri una chiave.

### Lezione 14 — Documentazione viva e manuali che una persona può seguire senza IA

**Cosa devi capire.** Il sistema deve potersi usare, mantenere e ripristinare senza l'agente e
senza di te. Il criterio per il manuale di ripristino è concreto: **deve poterlo seguire una
persona di fiducia che non programma, alle tre del mattino, con il sistema giù e l'agente senza
connessione**. Se un passo dice "consultare lo sviluppatore", è incompleto. E siccome rigenerare
la documentazione con un modello è gratis, la regola diventa "nello stesso commit": ogni modifica
che tocca ciò che l'utente vede, ciò che l'operatore fa o come si distribuisce, aggiorna il manuale
nello stesso commit. I manuali che ho scritto per il mio primo sistema con quel criterio sono il
modello [Ref. 24](REFERENCIAS.md#ref-24).

E una fonte che hai già: le voci in sospeso chiuse. Se hai documentato ogni chiusura come chiede
la lezione 5, il manuale utente non si scrive da zero: si monta a partire dalle voci che si sono
chiuse, blocco per blocco, e il diario delle modifiche esce direttamente da esse.

**Il compito.**

**Prima di inviare il prompt**, con le tue mani:

- `docs/WORKING_AGREEMENT.md`, dove va la routine.
- La lista dei manuali che avrà il sistema, ciascuno con il suo lettore (l'utente finale, chi
  mantiene, chi opera l'infrastruttura), scritta in `PROJECT.md` o detta nella chat.

1. Aggiungi la routine al patto:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Every change that modifies what the user
> sees, what the operator does, or how the system is deployed, updates the corresponding manual
> in the same commit. At the close of every functional block, add to the user manual the screens
> and flows of the pending items closed in that block, with real screenshots from the test
> environment, and add their entries to the changelog. If you do not know which manual, ask."

> [it]
> Aggiungi questa routine a `docs/WORKING_AGREEMENT.md`: "Ogni modifica che cambia ciò che
> l'utente vede, ciò che l'operatore fa, o come si distribuisce il sistema, aggiorna il manuale
> corrispondente nello stesso commit. Alla chiusura di ogni blocco funzionale, aggiungi al manuale
> utente le schermate e i flussi delle voci in sospeso chiuse in quel blocco, con screenshot reali
> dell'ambiente di test, e aggiungi le loro voci al diario delle modifiche. Se non sai a quale
> manuale va, chiedi."

**Prima di inviare il prompt** dei manuali: il sistema in esecuzione nell'ambiente di test con
dati realistici (gli screenshot escono da lì), le voci in sospeso chiuse con la loro
documentazione (lezione 5), `docs/DEPLOYMENT.md` e `docs/LOCKS.md` aggiornati, e ciò che solo il
business sa, preparato per quando chiederà: chi è responsabile di cosa, a quale telefono si chiama
alle tre del mattino, chi fa la copia di backup.

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

> [it]
> Genera tre manuali a partire dal sistema così com'è oggi nell'ambiente di test: il manuale
> utente (schermata per schermata, con screenshot reali, nella lingua dell'utente, senza gergo);
> il manuale di manutenzione (com'è costruito, dove sta ogni cosa, come eseguire la batteria, come
> aggiungere un modulo); e il manuale di infrastruttura e ripristino (come distribuire, come
> tornare indietro, come ripristinare un backup, cosa fare se va giù; scritto per una persona che
> deve farlo a mano, senza IA, alle tre del mattino). Se per qualche sezione ti serve qualcosa che
> solo il business sa (chi è responsabile di cosa, a quale telefono chiamare), chiedimelo; non
> lasciare un buco e non inventare. Ogni manuale porta la data e la versione del sistema.
> Rispondi nella mia lingua.

   Gli stai chiedendo i tre manuali con screenshot reali, il criterio delle tre del mattino per
   quello di ripristino, di chiedere ciò che solo il business sa invece di lasciare buchi, e data
   e versione.

3. La prova reale: dai il manuale di ripristino a qualcuno che non programma (il proprietario, un
   familiare) e chiedigli di seguire la sezione "è andato giù" nell'ambiente di test. Dove si
   blocca, bisogna sistemare il manuale.
4. Dopo la prossima modifica di schermata, verifica che il commit abbia toccato il manuale utente.
5. E adesso i **test di accettazione**: il proprietario usa il sistema intero nell'ambiente di
   test, con dati realistici, seguendo i sei flussi, prima che entri il primo utente reale. Ciò
   che trova sono voci in sospeso; con quelle chiuse, il sistema è accettato.

**Verifica di completezza.** Uno screenshot a caso coincide con l'ambiente di test di oggi?
Qualcuno che non programma è riuscito a seguire la sezione "è andato giù"? L'ultimo commit che ha
cambiato una schermata ha toccato il manuale? Il diario delle modifiche ha una voce per ogni voce
in sospeso chiusa? Ci sono buchi tipo "[completare]"? Ogni manuale dice per quale versione vale? Il
proprietario ha fatto i test di accettazione su tutti i flussi?

**Consegna.** I tre manuali con data e versione, la prova con una persona fatta, e i test di
accettazione chiusi.

**Errori tipici.** Generare i manuali una volta e non mettere la routine nel patto: dopo due mesi
hanno screenshot di schermate che non esistono più. Un manuale di ripristino che comincia con
"apri una sessione con l'agente". E non fare la prova con una persona: è l'unica verifica che
vale.

**Nel progetto guida.** Il manuale utente di Turnera ha sei schermate con screenshot, montate a
partire dalle voci in sospeso chiuse dei tre blocchi; quello di manutenzione spiega dove sta ogni
modulo e come eseguire la batteria; e quello di ripristino dice, in ordine, con i comandi: come
sapere se il sistema è giù, come riavviarlo, come tornare alla versione precedente, come
ripristinare il database dall'ultimo backup (che si fa tutte le notti: anche questo esce da questa
lezione), e chi chiamare. La responsabile l'ha seguito nell'ambiente di test e si è bloccata su
"ripristinare il database" perché il comando dava per scontata una cartella che lei non aveva; si
è sistemato il manuale.

### Lezione 15 — L'agente dentro il sistema, e la retrospettiva con i numeri

**Cosa devi capire.** Due cose chiudono il ciclo. La prima è opzionale: lasciare l'agente
residente in produzione, con perimetro limitato, per diagnosticare e dare supporto senza che tu ci
sia [Ref. 13](REFERENCIAS.md#ref-13). La regola che lo ordina è che **agisce a nome di qualcuno**:
la sua credenziale è associata a una persona responsabile, e tutto ciò che fa resta registrato a
nome di quella persona; non è un account anonimo, è un dipendente con un capo. La seconda è
obbligatoria: la retrospettiva con i numeri. Cosa è costato, quante voci in sospeso, quali hanno
fatto più giri, che incidenti ci sono stati e in quale gradino cadono, e **almeno una modifica
proposta alla scala**. Una retrospettiva che non cambia niente non è stata una retrospettiva;
quella che mi ha portato a eliminare un'intera squadra di agenti è il modello
[Ref. 6](REFERENCIAS.md#ref-6).

**Il compito (agente residente, se serve).**

**Prima di inviare il prompt**, con le tue mani e con il proprietario:

- La decisione se il sistema ha bisogno di un agente residente, e per cosa. In Turnera sì: le
  receptionist avranno domande ("perché a questo paziente non è arrivato il promemoria?") a cui
  l'agente può rispondere leggendo il log, senza che nessuno chiami lo sviluppatore.
- Una credenziale propria per l'agente in produzione, creata da te, associata a una persona
  responsabile con nome, in sola lettura per cominciare, con il valore fuori dalla chat e dal
  repository.
- `docs/LOCKS.md` e `docs/DEPLOYMENT.md` aggiornati, e il canale (ticket, email) attraverso cui
  avvisa ciò che non può risolvere.

1. Incollagli:

> We are going to leave you resident in production. First, build the map of the system you will
> need in order to operate it: modules, environments, where each configuration lives, which
> actions are consequential (read `docs/LOCKS.md`), whom to notify. If there are parts of the
> system you cannot see from where you are, tell me; the map must not have hidden gaps. Then
> propose your scope in three levels: read-only and diagnosis; configuration changes with my
> approval; consequential actions behind locks. I choose the level. Your credential acts as the
> person who created it: everything you do is logged under that person's name. Reply in my
> language.

> [it]
> Ti lasceremo residente in produzione. Prima, costruisci la mappa del sistema di cui avrai
> bisogno per operarlo: moduli, ambienti, dove vive ogni configurazione, quali azioni hanno
> conseguenze (leggi `docs/LOCKS.md`), chi avvisare. Se ci sono parti del sistema che non puoi
> vedere da dove ti trovi, dimmelo; la mappa non può avere buchi nascosti. Poi proponi il tuo
> perimetro su tre livelli: sola lettura e diagnosi; modifiche di configurazione con la mia
> approvazione; azioni con conseguenze dietro lucchetti. Il livello lo scelgo io. La tua
> credenziale agisce come la persona che l'ha creata: tutto ciò che fai resta registrato a nome
> di quella persona. Rispondi nella mia lingua.

   Gli stai chiedendo la mappa prima di operare, che i buchi della mappa li dichiari, tre livelli
   di perimetro perché tu ne scelga uno, e la credenziale a nome di una persona.

2. Scegli il livello (per cominciare, sempre il primo: sola lettura e diagnosi).

**Prima di inviare il prompt** di chiusura: la mappa e i tre livelli letti, il livello scelto, e
un'azione concreta fuori da quel perimetro pensata da te, perché l'agente la tenti e tu veda il
rifiuto nel log.

3. Chiudi con:

> Level [1: read-only and diagnosis]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the
> credential (never its value), and the procedure to request my approval. Then prove, with a real
> attempt recorded in the log, that something outside your scope is rejected.

> [it]
> Livello [1: sola lettura e diagnosi]. Scrivi in `docs/RESIDENT_AGENT.md` la mappa, il
> perimetro, la credenziale (mai il suo valore), e la procedura per chiedere la mia approvazione.
> Poi dimostra, con un tentativo reale registrato nel log, che qualcosa fuori dal tuo perimetro
> viene rifiutato.

**Il compito (retrospettiva, sempre).**

**Prima di inviare il prompt**, con le tue mani:

- I numeri che solo tu hai, in `docs/RETROSPECTIVE_INPUTS.md` o pronti per la chat: quante ore ci
  hai dedicato (dal tuo calendario, non a memoria), quanto hai speso nello strumento di IA (la
  fattura), quanta quota di integrazione continua hai usato, e le date di inizio e di fine.
- La lista degli incidenti come li ricordi tu, con data approssimativa, per confrontarla con ciò
  che l'agente ricava dalle voci in sospeso e dai commit.
- `docs/PENDING.md` con le voci chiuse documentate e `docs/DECISIONS.md`, che sono la fonte dei
  numeri.

4. Incollagli:

> [The project] is over. Do the retrospective with numbers, not impressions: what it cost
> (tokens, quota, my time), how many pending items, which ones took the most rounds and why,
> which incidents happened and which step of the ladder each falls into, and which step failed
> or was missing. If you lack the data for any figure (my time, for instance), ask me for it or
> mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder:
> which step is modified, how, and which incident justifies it. Write it to
> `docs/RETROSPECTIVE_[date].md`. Reply in my language.

> [it]
> [Il progetto] è finito. Fai la retrospettiva con i numeri, non con le impressioni: cosa è
> costato (token, quota, il mio tempo), quante voci in sospeso, quali hanno fatto più giri e
> perché, che incidenti ci sono stati e in quale gradino della scala cade ciascuno, e quale
> gradino ha fallito o mancava. Se non hai il dato per qualche cifra (il mio tempo, per esempio),
> chiedimelo o marcalo come stima; non inventarlo. Termina con una proposta concreta di modifica
> alla scala: quale gradino si modifica, come, e quale incidente lo giustifica. Scrivila in
> `docs/RETROSPECTIVE_[data].md`. Rispondi nella mia lingua.

   Gli stai chiedendo numeri con fonte, ogni incidente mappato su un gradino (un incidente che
   non cade in nessuno è un gradino che manca), di chiederti i numeri che non ha, e una proposta
   concreta di modifica alla scala.

5. Leggi la proposta di modifica. Se ti sembra valida, mandala al
   [repository di Urazuke](https://github.com/pkuschnirof/urazuke) come proposta di miglioramento
   (vedi `CONTRIBUTING.md`): è il modo in cui il metodo impara da ogni progetto.

**Verifica di completezza.** La mappa dice cosa NON può vedere l'agente? Hai visto nel log che
un'azione fuori dal perimetro viene rifiutata? La credenziale agisce a nome di una persona? La
retrospettiva ha numeri con fonte, o aggettivi? Ogni incidente cade in un gradino? C'è almeno una
proposta concreta di modifica?

**Consegna.** `docs/RESIDENT_AGENT.md` (se serve) e `docs/RETROSPECTIVE_[data].md`.

**Errori tipici.** Dare all'agente residente un livello alto "perché possa risolvere tutto":
comincia dalla sola lettura e sali quando ci sono prove. Una retrospettiva che dice che è andato
tutto bene: non va mai tutto bene; è scritta per te, non per il metodo. E non mandare la proposta
di modifica: il gradino 15 si chiude quando la scala cambia, non quando il documento si scrive.

**Nel progetto guida.** La retrospettiva di Turnera, in un corso tipico: sei settimane, una
quarantina di ore dell'allievo, ventotto voci in sospeso, quelle che hanno fatto più giri sono
state quelle dei messaggi (fusi orari e il provider di WhatsApp); due incidenti, uno nel gradino 8
(lo stato "assente" esisteva nella schermata e non nel server, e nemmeno nell'albero semantico) e
un altro nel 13 (un deployment in produzione con la configurazione di test, rilevato dalla
verifica end to end dopo il deployment). Proposta di modifica: che la routine di deployment del
gradino 13 esiga di mostrare la differenza di configurazione tra test e produzione prima di
promuovere, non solo "cosa cambia".

---

## La lista di uscita in produzione

Quando le sedici lezioni sono fatte, il sistema soddisfa questa lista. È la definizione operativa
di "production grade" in Urazuke, e si può usare come lista di verifica finale, con il
proprietario, senza aprire il codice:

1. C'è una scheda di idoneità con decisione, data e nome (P0).
2. C'è un patto di convivenza che l'agente legge in ogni sessione, e si è provato che lo legge
   (P1, P2).
3. Il file di progetto si legge in cinque minuti e dice cosa NON è il sistema; c'è un albero
   semantico confermato dal proprietario, e ogni voce in sospeso pende da un nodo (P2).
4. C'è un dimensionamento con dati primari con fonte, derivati con il conto, e lo scenario "per
   dieci" (P3).
5. Lo scheletro è stato distribuito vuoto nella prima settimana, con la catena di integrazione e
   deployment, e il deployment è stato eseguito due volte (P4).
6. Ogni modifica ha la sua voce in sospeso con specifica dettagliata, e ogni voce chiusa conserva
   la sua specifica e la sua prova: è la documentazione di ciò che è stato fatto (P5).
7. Ogni regola di business ha proprietario, data e parole testuali, nel commit, nella voce in
   sospeso e nel registro (P6).
8. Ogni test importante si è visto in rosso prima del verde; ogni flusso ha la sua prova end to
   end che verifica il backend dalla schermata; la batteria completa è stata eseguita alla
   chiusura di ogni blocco e prima della produzione (P7).
9. Ogni lista ha un solo proprietario; c'è una mappa produttore/consumatore; c'è un registro degli
   anti-pattern con verifica automatica (P8).
10. Ogni numero che ha deciso qualcosa ha un misuratore con test che tu puoi eseguire (P9).
11. Ogni rapporto separa verificato, creduto e punti ciechi (P10).
12. C'è stato almeno un audit da parte di una sessione diversa, e i suoi P0 sono voci in sospeso
    (P11).
13. Ogni azione con conseguenze ha un lucchetto con test in rosso e via del ritorno; le automazioni
    sono passate per la modalità di prova (P12).
14. I test girano una volta per commit; la configurazione è fuori dal repository; il rollback è
    stato provato; nessun segreto vive nel repository né nella chat senza essere ruotato (P13).
15. Ci sono tre manuali con data e versione, montati dalle voci in sospeso chiuse; una persona che
    non programma ha seguito quello di ripristino; il proprietario ha fatto i test di accettazione
    su tutti i flussi (P14).
16. C'è una retrospettiva con i numeri e una proposta di modifica alla scala (P15).

Se tutte e sedici danno "sì", il sistema è pronto per entrare in esercizio. Se qualcuna dà "no",
sai già quale gradino risalire.

---

## Allegato A — Come valutare (per chi tiene il corso o si autovaluta)

Una griglia di valutazione semplice, per lezione, con tre livelli:

- **Non salito**: manca la consegna, o qualche verifica di completezza dà "no".
- **Salito**: la consegna esiste e tutte le verifiche danno "sì".
- **Salito con prova di criterio**: in più, l'allievo sa raccontare un caso in cui l'agente ha
  fatto qualcosa di sbagliato in quella lezione (ha supposto, inventato, riportato di più) e come
  l'ha rilevato. Questo è l'obiettivo reale del corso: non l'artefatto, ma il riflesso.

Ciò che non si valuta: la qualità del codice. Nessuno la legge. Si valuta la qualità della prova.

## Allegato B — Adattamento del corso a ogni strumento

I prompt sono gli stessi in qualunque strumento. Ciò che cambia è dove vanno le routine che nel
corso si aggiungono a `docs/WORKING_AGREEMENT.md`:

- In **Claude Code**, le routine vanno nel `CLAUDE.md` del progetto (o si include il patto da lì),
  e si leggono da sole in ogni sessione.
- In **Cursor**, vanno in `.cursor/rules/`, come regole sempre attive.
- In **Codex CLI** o **Gemini CLI**, in `AGENTS.md` o `GEMINI.md` nella radice.
- In **Forge**, il patto e le routine sono dottrine, i prompt di gradino si iniettano da soli
  all'attraversamento di ogni cancello, il registro delle voci in sospeso è nativo e l'albero
  semantico è il grafo di conoscenza del progetto. Il corso con Forge è lo stesso corso con meno
  copia e incolla.

La prova di lettura della lezione 2 vale per tutti: se una sessione nuova non sa cosa NON fa il
sistema, lo strumento non sta caricando il file in cui hai messo il patto.

## Allegato C — Ciò che questo manuale ancora non ha

- Una coorte che l'abbia seguito. I tempi del calendario, gli errori tipici e il progetto guida
  sono scritti a partire dai miei tre sistemi, non da allievi. La prima coorte li correggerà (e
  questo è, letteralmente, il gradino 15 applicato al corso).
- I pesi dei criteri di idoneità (lezione 0), che sto calibrando.
- Un esempio completo di `docs/PENDING.md` del progetto guida, con le ventotto voci in sospeso
  specificate e chiuse, perché un allievo veda com'è la documentazione di ciò che è stato fatto
  alla fine di un progetto.
