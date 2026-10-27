# Passo 2 — La definizione del progetto, l'albero semantico e la lettura obbligatoria (contratto del gradino)

**Fase:** avvio.
**Quando:** si scrive una volta, dopo il patto; l'albero semantico e lo
stato vivo si mantengono aggiornati per tutto il progetto, con ogni blocco e ogni decisione nuova.
**Forma:** conversazione: l'agente redige, chiede ciò che manca, tu correggi.
**Dimensione:** obbligatorio in ogni progetto. In uno piccolo, il file di progetto può avere
cinquanta righe e l'albero semantico venti nodi; ciò che non possono è non esistere.

## A cosa serve

Ogni sessione dell'agente parte da zero: non si ricorda di ieri. Dagli una mappa, corta, che gli
dica cos'è il progetto, in che stato è e quali decisioni sono già state prese, e obbligalo a
leggerla prima di toccare qualunque cosa. Il fallimento che evita è doppio: lavoro da buttare per
non aver letto la mappa [Ref. 9](../REFERENCIAS.md#ref-9), e la mappa che cresce fino a diventare
illeggibile [Ref. 41](../REFERENCIAS.md#ref-41). La regola pratica: **il file di progetto è il
programma, non lo storico**. Ciò che è successo va da un'altra parte.

La mappa ha due pezzi, e il secondo è quello che fa più lavoro. Il primo è il file di progetto:
cos'è il sistema, per chi, cosa NON è, le decisioni prese. Il secondo è l'**albero semantico**: il
sistema scomposto come un albero, con i domini, e sotto ciascuno i suoi attori, i suoi processi (i
casi d'uso), le sue entità con i loro stati, le sue schermate e le sue integrazioni; e da ogni nodo
pendono le voci in sospeso e le decisioni che lo toccano. L'albero nasce dalla rilevazione che hai
fatto con i metodi classici dell'ingegneria dei requisiti (interviste, casi d'uso, modello di
dominio), lo costruisce l'agente, lo correggi tu, ed è ciò che dà al modello il contesto esatto del
nodo che toccherà senza dover leggere tutto il progetto. Ed è ciò che permette a te di verificare,
senza leggere codice, che il sistema che l'agente capisce sia quello che il business ha chiesto.

## 1. Contesto richiesto

Quello che segue è la lista generica. I file concreti che devi avere pronti prima di ogni
prompt, con il loro contenuto e il loro stato minimo, stanno nella sezione 2, nel blocco "Prima di
inviare il prompt" che precede ciascuno.

- Rilevazione del business: cosa fa il cliente, chi usa il sistema, che problema risolve, cosa non
  deve fare. Con le interviste, i casi d'uso o le storie utente che riesci a nominare, e le entità
  del business con i loro stati, anche se incompleti.
- Il patto di convivenza (gradino 1).
- Se esiste un sistema precedente: accesso in lettura al suo codice o alla sua documentazione.
- Le decisioni già prese, se ce ne sono, anche solo a voce.
- Le parole che il business usa davvero per ogni cosa, e chi sono i diversi tipi di persona che
  useranno il sistema. Sono i due **ingressi previi** dell'[Allegato H](../ANEXO_HEURISTICAS.md), e
  questo gradino è dove si scrivono: senza di essi, la matrice di profili del gradino 8 si inventa e
  le regole di usabilità non hanno con cosa confrontarsi.

## 2. Prompt

**Iniziale:**

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business con te), non
l'agente:

- `docs/INITIAL_SURVEY.md` (gradino 0), completato con la rilevazione del business. La scrivi tu a
  partire dalle interviste dell'acquisizione; se hai usato un metodo (interviste, casi d'uso,
  storie utente, prototipi di schermata), di' quale e incolla il risultato. Deve avere: cosa fa il
  cliente; chi usa il sistema (gli attori, con il nome del ruolo); che problema risolve; cosa NON
  deve fare, in una sezione propria, anche se ha due voci; i casi d'uso o le storie utente che
  nomina il proprietario, con le sue parole, anche se sono dieci righe; le entità del business con
  i loro stati ("un appuntamento è in attesa, confermato, cancellato"), anche se incomplete; i
  disegni o le foto delle schermate, se ci sono; le integrazioni esterne (messaggistica,
  pagamenti, un altro sistema); e le decisioni già prese, anche se sono state a voce, con la data
  e chi le ha prese.
- `docs/WORKING_AGREEMENT.md` (gradino 1), chiuso con data e versione.
- Se esiste un sistema precedente: accesso in lettura al suo codice o alla sua documentazione, con
  il percorso o il link annotato nella rilevazione.
- Stato minimo accettabile: la rilevazione ha la sezione "cosa NON è" con almeno due voci, almeno
  un caso d'uso con le parole del proprietario, e almeno un'entità con i suoi stati. Senza questo,
  l'albero che ne uscirà sarà inventato, e tu non avrai con cosa confrontarlo.
- E per i due ingressi previi dell'Allegato H: nella rilevazione, gli attori nominati **con la parola
  che usa il business** (se la receptionist si chiama "la ragazza del banco", quello è il dato, non
  "utente operativo"), e qualunque lista di tipi di utente che esista già, anche se è in una mail. Se
  non hai né una cosa né l'altra, dillo: l'agente le deve **chiedere**, non inventare.

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
> the survey, so that I can confirm or correct it. Third, the two prior inputs that Annex H
> needs before a single screen exists: the user glossary, with the words people actually use
> for each thing as the business says them and not as the system calls them; and the list of
> profiles, saying who each one is and what they come to do. Take both from the survey, ask
> me for whatever is not in it instead of inventing it, write them as `docs/GLOSSARY.md` and
> `docs/PROFILES.md`, name them in `PROJECT.md`, and mark what you inferred there too. Separately, create
> `docs/STATUS.md` for the living state (what is being worked on, what is open): that file
> changes every day; the other two change only when the system changes.
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
> Definiremo il progetto per iscritto. Leggi la rilevazione del business in
> `docs/INITIAL_SURVEY.md` e il patto di convivenza in `docs/WORKING_AGREEMENT.md`. Valuta se la
> rilevazione basta per descrivere il sistema, i suoi utenti, il suo dominio e i suoi confini; se
> non basta, chiedimi ciò che manca prima di scrivere qualunque cosa. Poi scrivi due cose. Primo,
> `PROJECT.md`, di trecento righe al massimo, con: cos'è il sistema e per chi; cosa NON è; i moduli
> principali come lista; le decisioni già prese, ciascuna con la sua data; e l'istruzione di
> leggere questo file e l'albero semantico all'inizio di ogni sessione. Secondo,
> `docs/SEMANTIC_TREE.md`: il sistema come un albero, con i domini al primo livello e, sotto
> ciascuno, i suoi attori, i suoi processi (i casi d'uso, ciascuno con attore, innesco, passi,
> risultato ed eccezioni), le sue entità con i loro attributi, stati e transizioni, le sue
> schermate e le sue integrazioni esterne. Marca ogni nodo che hai inferito invece di averlo letto
> nella rilevazione, perché io lo confermi o lo corregga. Terzo, i due ingressi previi di cui l'Allegato H ha
> bisogno prima che esista una sola schermata: il glossario dell'utente, con le parole che la gente
> usa davvero per ogni cosa, come le dice il business e non come le chiama il sistema; e la lista dei
> profili, dicendo chi è ciascuno e cosa viene a fare. Prendi entrambi dalla rilevazione, chiedimi
> quello che non c'è invece di inventarlo, scrivili in `docs/GLOSSARY.md` e `docs/PROFILES.md`,
> nominali in `PROJECT.md` e marca anche lì quello che hai inferito.
> A parte, crea `docs/STATUS.md` per lo
> stato vivo (su cosa si sta lavorando, cosa è aperto): quel file cambia tutti i giorni; gli altri
> due cambiano solo quando cambia il sistema.
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

Cosa gli sto chiedendo: che valuti la rilevazione e chieda prima di redigere; che il file di
progetto sia **corto** (il tetto di trecento righe è arbitrario ma necessario: senza tetto,
cresce); che dica esplicitamente cosa il sistema **non** è, perché ciò che non è detto è ciò che il
modello inventerà; che le decisioni abbiano una data; che costruisca l'**albero semantico** con la
struttura completa (domini, attori, casi d'uso con le loro parti, entità con stati e transizioni,
schermate, integrazioni), che è il modello di dominio dell'ingegneria dei requisiti messo in forma
di albero; che **marchi ciò che ha inferito**, perché è lì che si nascondono le invenzioni; e che
separi lo stato vivo in un altro file, perché la mappa non si trasformi in storico.

E i due ingressi previi dell'Allegato H, che sono quelli che fanno sì che il gradino 2 non sia solo
una mappa per il modello. Il **glossario dell'utente** è la lista di parole che la gente usa
davvero: "appuntamento", non "prenotazione d'agenda"; "la ragazza del banco", non "utente
operativo". Serve per due cose che vengono dopo: nominare i gruppi del menu con lavori dell'utente,
e far sì che il testo delle schermate dica quello che la gente dice. La **lista dei profili** è chi
è ciascuno e cosa viene a fare, ed è la colonna da cui esce la matrice del gradino 8; se non è
scritta qui, al gradino 5 si inventa, e una matrice inventata è la causa del fatto che qualcuno veda
un pulsante che non gli spetta. Gli chiedo esplicitamente di **chiederle** invece di dedurle, perché
sono dati del business e non del sistema; e di marcare l'inferito, per lo stesso motivo che
nell'albero.

**Di chiusura:**

**Prima di inviare il prompt**, devi avere questo a portata di mano:

- `PROJECT.md`, letto per intero da te (deve stare in cinque minuti), con le tue correzioni
  annotate: ciò che non è vero, ciò che non è tuo, ciò che è di troppo.
- `docs/SEMANTIC_TREE.md`, percorso nodo per nodo come se fossi il cliente: ogni nodo marcato come
  inferito ha il tuo verdetto (confermato o corretto), e hai annotato gli attori che mancano, gli
  stati che il business non usa, le schermate che nessuno ha chiesto.
- La lista delle correzioni, scritta, che va nello spazio [list] del prompt. Se la lista è vuota
  la prima volta, diffida della tua lettura, non dell'agente.
- Stato minimo accettabile: nessun nodo marcato "inferito" resta senza il tuo verdetto.

> Apply these corrections: [list]. Finalize `PROJECT.md` and `docs/SEMANTIC_TREE.md` with
> today's date. Add to the working agreement two rules: the change history never goes into
> `PROJECT.md` (it goes to `docs/STATUS.md` or to the pending-items register); and every pending
> item must hang from a node of the semantic tree, and the tree is updated in the same commit
> whenever a block adds or changes a node.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [it]
> Applica queste correzioni: [lista]. Chiudi `PROJECT.md` e `docs/SEMANTIC_TREE.md` con la data
> di oggi. Aggiungi al patto di convivenza due regole: lo storico delle modifiche non va mai in
> `PROJECT.md` (va in `docs/STATUS.md` o nel registro delle voci in sospeso); e ogni voce in
> sospeso deve pendere da un nodo dell'albero semantico, e l'albero si aggiorna nello stesso
> commit ogni volta che un blocco aggiunge o cambia un nodo.
>
> Quando hai bisogno di una decisione da parte mia, chiedila con le quattro parti della UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e in questo ordine: i dati che rendono necessaria la domanda,
> elencati; un paragrafo di non più di cinque righe che li colleghi e lasci vedere
> l'interrogativo; la domanda con le sue possibili risposte numerate; e la tua raccomandazione.
> Dillo alla profondità tecnica che il progetto ha dichiarato in `communication_depth`
> —`beginner`, `decision_maker` o `technical`—; se il progetto non ne ha dichiarata nessuna, usa
> `decision_maker`.

Cosa gli sto chiedendo: le tue correzioni (soprattutto ai nodi che ha marcato come inferiti), la
data, e due regole nuove nel patto: quella che protegge il file di progetto dal diventare storico,
e quella che lega ogni voce in sospeso a un nodo dell'albero, che è ciò che mantiene l'albero vivo
e ciò che ti permette di rilevare in dieci secondi una voce fuori perimetro.

## 3. Risultato atteso

- `PROJECT.md` (o `CLAUDE.md`): corto, di lettura obbligatoria, con cos'è, per chi, cosa non è,
  moduli, decisioni con data, e l'ordine di leggerlo insieme all'albero. Massimo trecento righe.
- `docs/SEMANTIC_TREE.md`: l'albero semantico, con i nodi inferiti marcati finché non li confermi,
  e, dal primo blocco, le voci in sospeso e le decisioni che pendono dai loro nodi.
- `docs/STATUS.md`: stato vivo, separato dai precedenti.
- I due ingressi previi dell'Allegato H, scritti e nominati in `PROJECT.md`: il **glossario
  dell'utente** (le parole che la gente usa davvero per ogni cosa) e la **lista dei profili** (chi è
  ciascuno e cosa viene a fare), con l'inferito marcato. Il metodo dichiara il nome di quei due file
  — `docs/GLOSSARY.md` e `docs/PROFILES.md` —, come dichiara quello degli altri tre: un cancello non
  può guardare un file di cui nessuno sa il nome, e finché non lo ha dichiarato, la matrice del
  gradino 8 poteva continuare a inventarsi contro una lista che niente obbligava a esistere. Quello
  che esige resta lo stesso: che esistano, che si possano trovare dal file di progetto e che ci
  siano prima del gradino 5.
- In tutti e tre, una data di ultimo aggiornamento.
- Nel patto, le due regole nuove.
- Nel file di progetto, una riga che dica con quale versione del metodo lavora il progetto: la
  `catalog_version` che hai fissato e l'impronta di contenuto che quella versione dichiara. È
  quello che permette, fra un anno, di sapere contro quale definizione ogni gradino ha avuto il suo
  verde, e quello che fa di un aumento di versione una decisione e non un incidente.

## 4. Verifica di completezza

- `PROJECT.md` sta in una lettura di cinque minuti? Se no, è sbagliato: è il programma, non lo
  storico.
- Dice esplicitamente cosa NON fa il sistema? (Ciò che manca è ciò che l'agente inventerà.)
- Percorri l'albero semantico come se fossi il cliente: ci sono tutti gli attori che conosci? Ogni
  entità ha gli stati che il business usa, né più né meno? C'è qualche nodo che non riconosci?
  Quello è un'invenzione: correggilo adesso.
- I nodi inferiti sono marcati? Li hai confermati o corretti tutti?
- Ogni decisione ha una data e chi l'ha presa?
- L'agente ha chiesto qualcosa sul business prima di redigere? Se non ha chiesto niente, controlla
  cosa ha supposto.
- Lo stato vivo è in un altro file?
- La prova di lettura: chiudi la sessione, aprine una nuova, e chiedigli cosa NON fa il sistema e
  da quale nodo dell'albero pende la tale schermata. Se risponde con la mappa, l'aggancio
  funziona.
- È scritto il glossario dell'utente, con le parole che la gente usa davvero per ogni cosa? Leggilo
  e cerca una parola che tu non diresti: se c'è, l'ha scritta il sistema e non il business.
- È scritta la lista dei profili, dicendo chi è ciascuno e cosa viene a fare? Conta i profili con le
  dita del tuo business: se manca uno, manca una riga della matrice del gradino 8 e una tornata di
  casi di prova del 10.
- È scritto con quale versione del metodo lavora il progetto, con la sua impronta? Se non c'è, il
  giorno in cui la definizione cambi nessuno potrà dire se i gradini chiusi sono ancora chiusi.

## 5. Segnali d'allarme

- Il file di progetto è cresciuto più del 20 % in un mese. Sta entrando qualcosa che non è
  programma.
- L'agente inizia una sessione proponendo qualcosa che è già stato deciso ed è scritto. Non ha
  letto la mappa: l'aggancio di lettura obbligatoria è fallito.
- La sezione "cosa non è" è vuota o dice "niente in particolare". Ogni sistema ha dei limiti; se
  non sono scritti, il modello li attraverserà.
- Ci sono voci in sospeso che non pendono da nessun nodo dell'albero. O l'albero è rimasto vecchio
  o quelle voci sono fuori perimetro; entrambe le cose vanno guardate.
- Un'entità dell'albero ha uno stato che il business non ha mai nominato. Il modello l'ha inventato
  perché gli è sembrato logico, e ci costruirà sopra.
- Il glossario dell'utente ha le stesse parole dell'albero semantico. Non è un glossario dell'utente:
  è il vocabolario del sistema copiato due volte. Chiedi al business come lo chiama.
- La lista dei profili ha un solo profilo, "utente". Quasi mai è vero, ed è il modo più comune di
  arrivare al gradino 8 con una matrice di una riga che non protegge niente.
