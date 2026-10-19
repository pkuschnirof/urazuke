# Urazuke — lavoro collaborativo: più sviluppatori, ciascuno con il suo agente, su uno stesso ramo

Autore: Pablo Kuschniroff, assistito da Claude Code. Versione 1, 19 ottobre 2026. Questo documento
completa il [documento principale](ESCALERA_METODOLOGICA.md): dice come si applica il metodo
quando non c'è un solo umano con un solo agente, ma più sviluppatori, ciascuno con il suo, che
lavorano sullo stesso repository e sullo stesso ramo. Le parole strane stanno nel glossario del
documento principale. Repository pubblico:
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## Il problema, detto senza giri di parole

Il metodo è scritto al singolare: il proprietario, l'agente, la voce in sospeso. I miei tre
sistemi li ho costruiti così, un umano e un modello. Ma una squadra che adotta il metodo non ha un
umano: ne ha tre, o cinque, ciascuno con la sua sessione di agente aperta sullo stesso codice, e
nella maggior parte delle squadre piccole, sullo **stesso ramo**, perché la foresta di rami di
lunga vita è il modo più sicuro di far sì che due settimane di lavoro si integrino un venerdì
sera a suon di urla. Lavorare su un ramo condiviso si può fare bene, e l'industria lo fa da anni
con regole note (commit piccoli e integrati più volte al giorno, l'integrazione continua come
arbitro, le funzionalità a metà nascoste dietro un interruttore). Ciò che cambia con il metodo è
che quelle regole non le rispettano più persone che leggono il codice degli altri: le rispettano
agenti che non si vedono fra loro, e allora bisogna scriverle dove ogni agente le legga.

Quello che segue sono le regole, e poi i prompt. Non aggiungo gradini: i ventiquattro sono gli
stessi. Aggiungo ciò di cui ogni gradino ha bisogno perché lo salgano in più persone alla volta.

**Se sei alle prime armi.** Un *ramo* è una copia del codice su cui si lavora; il *ramo condiviso*
(di solito si chiama *main* o *trunk*) è l'unico che conta, quello che si distribuisce.
*Integrare* è mettere la tua modifica in quel ramo; *conflitto* è quando due persone hanno
cambiato la stessa riga e lo strumento non sa quale vale. Un *interruttore di funzionalità* è una
chiave di configurazione che lascia una funzionalità spenta anche se il codice c'è già, per poter
integrare a metà senza che l'utente la veda. E *reclamare* una voce in sospeso è scriverci sopra
il tuo nome perché nessun altro la prenda.

## Le sette regole del ramo condiviso

1. **La voce in sospeso è l'unità di proprietà.** Nessuno lavora senza una voce in sospeso
   reclamata a suo nome in `docs/PENDING.md`, e una voce ha un solo proprietario alla volta. Due
   persone non prendono due voci che toccano lo stesso modulo nello stesso momento; se non si può
   evitare, se lo dicono e la seconda aspetta che la prima integri. L'agente, all'inizio della
   sessione, legge le voci reclamate da altri e non le tocca.
2. **Integrare piccolo e spesso.** Una voce in sospeso si spezza in modifiche che si integrano nel
   ramo condiviso più volte al giorno, mai alla fine della settimana. Prima di ogni integrazione:
   portarsi quello degli altri, eseguire la batteria intera, e solo dopo caricare. Una modifica
   che non si può integrare in un giorno è una voce tagliata male: si taglia di nuovo.
3. **L'integrazione continua è l'arbitro, non l'umano.** Nessuno integra con la catena in rosso, e
   nessuno discute se una modifica "rompe": lo dicono la batteria, il cancello di qualità (9) e la
   caratterizzazione se è un legacy. Chi mette in rosso il ramo condiviso lo sistema prima di
   qualunque altra cosa, oppure annulla la sua modifica.
4. **Ciò che è a metà va dietro un interruttore.** Una funzionalità che richiede più di un giorno
   si integra lo stesso, spenta per configurazione, con il suo interruttore annotato nella voce in
   sospeso, e si accende quando la voce si chiude con le prove. Così nessuno aspetta nessuno per
   integrare.
5. **Le liste hanno un solo proprietario, e la mappa dice quale.** La mappa produttore-consumatore
   (11) è il rilevatore di conflitti della squadra: prima di toccare un contratto fra le parti, si
   guarda chi lo consuma, e i consumatori si aggiornano nella stessa modifica, anche se sono di
   un'altra persona. L'albero semantico (2) è la mappa condivisa, e lo cambia chi aggiunge un
   nodo, nello stesso commit.
6. **Le decisioni si scrivono con un nome, e valgono per tutti.** Una regola di business decisa da
   uno sviluppatore con il proprietario va in `docs/DECISIONS.md` sul momento, perché l'agente
   accanto ne avrà bisogno quello stesso pomeriggio e non la indovinerà. Il patto di convivenza
   (1) è uno solo per la squadra; nessuno ha regole proprie che gli altri non leggono.
7. **Si rivedono le prove, non il codice, e le rivede un altro.** Una voce in sospeso la chiude il
   suo proprietario con la routine completa (8, 9, 10, 12), e la dà per chiusa un'altra persona
   della squadra leggendo il rapporto: il rosso, il verde, la regressione, la qualità, il caso
   manuale. Nessuno si chiude le proprie voci in sospeso, e nessuno legge il codice per chiuderle.

E una regola sugli agenti, che è quella che cambia davvero rispetto a una squadra senza modelli:
**ogni agente lavora a nome di una persona**, con il suo contesto di sessione, e l'unica cosa che
condividono è ciò che sta scritto nel repository. Non c'è memoria comune fuori dai file. Per
questo lo stato vivo (`docs/STATUS.md`), le voci in sospeso e le decisioni si scrivono sul
momento, non "a fine giornata": l'agente del collega le leggerà fra cinque minuti.

## Come si distribuiscono i gradini in una squadra

| Gradino | Chi lo sale | Cosa cambia in squadra |
|---|---|---|
| da 0 a 4, avvio | Una sola persona, quella che guida, con il proprietario. | Si fa una volta e prima che entri il resto. Lo scheletro (4) include la catena di integrazione che sarà l'arbitro, e i cancelli (`docs/GATES.md`) includono quelli del ramo condiviso. |
| 1, patto | Il capofila lo scrive; tutti lo firmano. | Si aggiungono le sette regole qui sopra come routine. Un solo file per la squadra. |
| 5, voci in sospeso | Il capofila apre il blocco con il proprietario; ciascuno reclama. | La voce porta un campo "reclamata da" e "moduli che tocca". Due voci che toccano lo stesso modulo non si reclamano insieme. |
| 6, decisioni | Chi ne ha bisogno, con il proprietario. | Si scrive sul momento, non a fine giornata. |
| da 7 a 12, il ciclo | Ciascuno, con il suo agente, sulla sua voce in sospeso. | Prima di integrare: portare, eseguire tutto, caricare. Ciò che è a metà, dietro un interruttore. Il rapporto (12) lo legge un altro. |
| 9, qualità | Una sola configurazione per tutti. | Nessuno ha eccezioni proprie al linter. |
| 10, casi di prova manuale | Li scrive il proprietario della voce in sospeso; li esegue un altro. | Chi non ha costruito la funzionalità è quello che la prova meglio. |
| 11, simmetria | Chi tocca un contratto aggiorna i consumatori, di chiunque siano. | La mappa è il rilevatore di conflitti. |
| 13, audit | Una sessione diversa da tutte quelle che hanno costruito. | In squadra è più facile: l'auditor è quello che non ha toccato quel modulo. |
| da 14 a 20, uscita | Il capofila coordina; ogni gradino ha un responsabile. | Una persona promuove in produzione; gli altri no. |
| da 21 a 23, esercizio | Un responsabile del monitoraggio per ciclo, a rotazione. | Il rapporto ciclico lo legge la squadra intera; le voci in sospeso che ne escono si reclamano come qualunque altra. |

## I prompt

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il capofila della squadra),
non l'agente:

- `docs/WORKING_AGREEMENT.md` (gradino 1), chiuso, uno solo per la squadra, con la lista dei
  membri e i loro nomi utente nel repository.
- `docs/PENDING.md` (gradino 5) con il campo "reclamata da" e "moduli che tocca" in ogni voce in
  sospeso, anche se sono vuoti.
- La decisione della squadra sull'interruttore di funzionalità: dove si dichiara (la
  configurazione del server, un file) e come si chiama, scritta in `PROJECT.md`.
- La catena di integrazione (gradini 4 e 15) con la batteria e il cancello di qualità (9) come
  condizione di fusione nel ramo condiviso, configurata nella piattaforma del repository (nessuno
  può caricare con la catena in rosso).
- Stato minimo accettabile: c'è un patto unico, le voci in sospeso hanno i due campi, e la
  piattaforma rifiuta un push con la catena in rosso.

**Routine del ramo condiviso (va nel patto di convivenza):**

> We work as a team on one shared branch, each person with their own agent session, and the only
> shared memory is what is written in the repository. Rules: (1) At the start of every session,
> read `docs/STATUS.md`, `docs/DECISIONS.md` and `docs/PENDING.md`; never touch a pending item
> claimed by someone else, and never take one that touches a module another claimed item touches.
> (2) Before every integration into the shared branch: pull the others' changes, run the full
> suite and the quality gate, and only then push; integrate several times a day, never at the end
> of the week. (3) Never push with the pipeline red; whoever turns it red fixes it before anything
> else or reverts. (4) Anything that cannot be finished and integrated today goes behind a feature
> switch, off by default, noted in the pending item. (5) Before touching a contract between parts
> (a service, a table, a list of values), look up its consumers in `docs/PRODUCER_CONSUMER_MAP.md`
> and update them in the same change, whoever owns them. (6) Every business decision goes to
> `docs/DECISIONS.md` the moment it is taken, with the person's name and the date. (7) Update
> `docs/STATUS.md` with what you are doing when you start and when you stop, so that the others'
> agents see it. Reply in my language.

> [it]
> Lavoriamo in squadra su un solo ramo condiviso, ogni persona con la propria sessione di agente,
> e l'unica memoria condivisa è ciò che sta scritto nel repository. Regole: (1) All'inizio di ogni
> sessione, leggi `docs/STATUS.md`, `docs/DECISIONS.md` e `docs/PENDING.md`; non toccare mai una
> voce in sospeso reclamata da un altro, e non prendere mai una voce che tocchi un modulo toccato
> da un'altra voce reclamata. (2) Prima di ogni integrazione nel ramo condiviso: porta le
> modifiche degli altri, esegui la batteria completa e il cancello di qualità, e solo dopo carica;
> integra più volte al giorno, mai alla fine della settimana. (3) Non caricare mai con la catena
> in rosso; chi la mette in rosso la sistema prima di qualunque altra cosa oppure annulla. (4)
> Tutto ciò che non si può finire e integrare oggi va dietro un interruttore di funzionalità,
> spento in modo predefinito, annotato nella voce in sospeso. (5) Prima di toccare un contratto
> fra le parti (un servizio, una tabella, una lista di valori), cerca i suoi consumatori in
> `docs/PRODUCER_CONSUMER_MAP.md` e aggiornali nella stessa modifica, di chiunque siano. (6) Ogni
> decisione di business va in `docs/DECISIONS.md` nel momento in cui si prende, con il nome della
> persona e la data. (7) Aggiorna `docs/STATUS.md` con ciò che stai facendo quando cominci e
> quando smetti, perché gli agenti degli altri lo vedano. Rispondi nella mia lingua.

Cosa gli sto chiedendo: le sette regole trasformate in routine dell'agente, perché l'agente non
vede gli altri agenti e rispetterà solo ciò che legge; la lettura obbligatoria all'inizio della
sessione, che è ciò che sostituisce la chiacchierata in corridoio; l'integrazione piccola e spessa
con la batteria come condizione; l'interruttore per ciò che è a metà; la mappa come rilevatore di
conflitti; e lo stato vivo scritto sul momento.

**Nel reclamare una voce in sospeso:**

**Prima di inviare il prompt**, devi avere questo sottomano:

- La voce in sospeso che vuoi prendere, scelta da te dal backlog, e un'occhiata a quelle reclamate
  da altri: qualcuna tocca lo stesso modulo?
- Il tuo nome utente nel repository, quello che resterà nel campo "reclamata da".
- Stato minimo accettabile: sai quali moduli tocca la tua voce in sospeso e che nessuno li ha
  reclamati.

> I am taking pending item [PND-NNN]. Before anything: list the pending items claimed by others
> and tell me whether any of them touches the same modules as mine, by the "modules it touches"
> field and by the producer-consumer map; if there is an overlap, stop and tell me, do not start.
> If there is none, write my name in the "claimed by" field with today's date, write in
> `docs/STATUS.md` what I am starting, re-read the item's specification, and tell me which
> contracts of the map this item will touch and who consumes them. Reply in my language.

> [it]
> Prendo la voce in sospeso [PND-NNN]. Prima di tutto: elenca le voci in sospeso reclamate da
> altri e dimmi se qualcuna tocca gli stessi moduli della mia, in base al campo "moduli che tocca"
> e alla mappa produttore-consumatore; se c'è sovrapposizione, fermati e dimmelo, non cominciare.
> Se non ce n'è, scrivi il mio nome nel campo "reclamata da" con la data di oggi, scrivi in
> `docs/STATUS.md` cosa comincio, rileggi la specifica della voce, e dimmi quali contratti della
> mappa toccherà questa voce e chi li consuma. Rispondi nella mia lingua.

Cosa gli sto chiedendo: la verifica della sovrapposizione prima di cominciare, che è il momento
economico per evitare un conflitto; il reclamo scritto; e la lista dei consumatori che toccherò,
per sapere fin dall'inizio a chi sto cambiando qualcosa.

**Nell'integrare:**

**Prima di inviare il prompt**, devi avere questo sottomano:

- La voce in sospeso con la sua routine di chiusura fatta oppure, se è a metà, l'interruttore
  annotato.
- La certezza che il ramo condiviso è in verde proprio adesso (se è in rosso, prima si sistema
  quello, di chiunque sia).
- Stato minimo accettabile: sai se integri qualcosa di finito o qualcosa a metà dietro un
  interruttore.

> We are going to integrate into the shared branch. Pull the others' changes first and tell me
> what came in and whether anything touches my modules. Resolve conflicts, if any, by reading
> both sides and asking me when a business rule is involved; never by keeping mine. Run the full
> suite, the quality gate and, if this is an inherited system, the characterization suite, and
> show me the counts. If anything is red, stop: tell me what and whose change it comes from. If
> this item is not finished, confirm the feature switch is off by default and say so in the
> commit message. Then push, show me the pipeline green on the shared branch, and update
> `docs/STATUS.md` and the pending item. Reply in my language.

> [it]
> Integriamo nel ramo condiviso. Porta prima le modifiche degli altri e dimmi cosa è entrato e se
> qualcosa tocca i miei moduli. Risolvi i conflitti, se ce ne sono, leggendo entrambi i lati e
> chiedendomelo quando c'è di mezzo una regola di business; mai tenendo il mio. Esegui la batteria
> completa, il cancello di qualità e, se è un sistema ereditato, la batteria di caratterizzazione,
> e mostrami i numeri. Se qualcosa è in rosso, fermati: dimmi cosa e da quale modifica di chi
> viene. Se questa voce in sospeso non è finita, conferma che l'interruttore è spento in modo
> predefinito e dillo nel messaggio del commit. Poi carica, mostrami la catena in verde sul ramo
> condiviso, e aggiorna `docs/STATUS.md` e la voce in sospeso. Rispondi nella mia lingua.

Cosa gli sto chiedendo: portare prima di caricare; risolvere i conflitti leggendo entrambi i lati
e non "vincendo" (il riflesso del modello davanti a un conflitto è tenersi la sua versione); la
batteria come condizione; la catena in verde sul ramo condiviso come prova, non sulla macchina
dell'agente; e lo stato vivo aggiornato.

## Verifica di completezza (la fa il capofila, senza leggere codice)

- Prendi tre voci in sospeso chiuse questa settimana: le ha chiuse qualcuno diverso dal loro
  proprietario, leggendo il rapporto?
- Quante volte al giorno si è integrato nel ramo condiviso? Chiedi lo storico; se è una volta alla
  settimana, la regola 2 non si rispetta.
- C'è stato un conflitto questa settimana? Come si è risolto, e c'è una voce in sospeso della
  mappa per questo?
- C'è qualche funzionalità a metà senza interruttore nel ramo condiviso?
- `docs/STATUS.md` dice cosa sta facendo ciascuno oggi?

## Segnali d'allarme

- Ogni sviluppatore ha il suo patto di convivenza "perché lavora in modo diverso". Gli agenti
  seguiranno regole diverse sullo stesso codice.
- Le integrazioni si accumulano per il venerdì. È la foresta di rami, senza i rami.
- Qualcuno legge il codice del collega per approvare la sua voce in sospeso. Il metodo è degradato
  a revisione del codice, che è ciò che il modello fa peggio delle prove.
- Un conflitto si è risolto "tenendo la versione più nuova". Una regola di business si è persa
  senza che nessuno lo decidesse.
- L'agente di una persona ha chiuso una voce in sospeso reclamata da un'altra. La lettura
  all'inizio della sessione non è nel patto, oppure il patto non si legge.

## Cosa resta da elaborare `[ipotesi]`

1. Queste regole vengono dalla pratica nota dell'industria sui rami condivisi e da ciò che il
   metodo esige; non le ho provate con una squadra di più agenti che lavorano insieme. La prima
   squadra che le userà le correggerà, e la retrospettiva (23) deve chiedere quanti conflitti ci
   sono stati e quanti si sarebbero potuti evitare con la mappa.
2. Non so quante persone regga un ramo condiviso con il metodo prima che serva un'altra forma di
   lavoro. La mia intuizione è che ne regga più di quante ne reggeva senza il metodo, perché la
   voce in sospeso specificata e la mappa tolgono la metà dei motivi di conflitto.
3. In Forge, il registro nativo delle voci in sospeso e il grafo di conoscenza fanno il reclamo e
   il rilevamento della sovrapposizione da soli; negli altri strumenti si fa a mano con i campi
   della voce in sospeso. Non ho ancora provato quanto questo cambi nella pratica.
