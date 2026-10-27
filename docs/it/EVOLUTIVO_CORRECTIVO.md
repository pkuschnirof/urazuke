# Urazuke — il percorso evolutivo-correttivo: normalizzare un sistema che non è nato con il metodo, e poi salire la scala

Autore: Pablo Kuschniroff, assistito da Claude Code. Versione 1, 18 ottobre 2026. Questa pagina è
la seconda metà del metodo: il [documento principale](ESCALERA_METODOLOGICA.md) descrive il
percorso di un progetto nuovo, e qui descrivo cosa faccio quando il sistema esiste già, l'ha fatto
un altro (o l'ho fatto io stesso, "vibecodando" senza prove), e adesso bisogna correggerlo o farlo
crescere. Le parole strane stanno nel glossario del documento principale; i casi reali, nelle
[referenze](REFERENCIAS.md). Repository pubblico:
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## Perché questa pagina esiste

Quando ho scritto la scala l'ho scritta guardando la cartella vuota: il gradino 0 decide se il
progetto si affronta, il 4 distribuisce lo scheletro senza funzionalità, e solo nel 5 compare la
prima cosa che l'utente vedrà. È il caso pulito, ed è quello che insegna meglio. Ma non è il caso
più frequente. Nella pratica, la maggior parte delle volte che qualcuno mi chiama c'è un sistema
che gira già, con utenti che ne dipendono, fatto da qualcuno che non c'è più o da un modello a cui
nessuno ha chiesto prove, e la richiesta è "sistema questo" oppure "aggiungici quello". Il mio
stesso strumento è entrato in sistemi altrui in modalità diagnostica molto prima che la scala
fosse scritta [Ref. 11](REFERENCIAS.md#ref-11), e la prima volta che il metodo si è alimentato di
un sistema in produzione è stato guardandone uno che già esisteva
[Ref. 12](REFERENCIAS.md#ref-12).

E qui c'è una trappola che voglio nominare prima di andare avanti: la tentazione, di fronte a un
legacy, è scegliere fra due estremi che sono sbagliati entrambi. Uno è "lo riscrivo con il metodo,
da zero": suona pulito, e quasi sempre finisce in un secondo sistema che non arriva a sostituire
il primo. L'altro è "gli applico direttamente il ciclo, che per questo ci sono i gradini dal 5 al
12": suona pragmatico, ed è costruire sulla sabbia, perché il ciclo dà per scontato che esistano
un contratto, una mappa, un ambiente di test, una batteria che gira e un deployment che si ripete.
Niente di tutto questo esiste in un sistema che non è nato con il metodo. Questo percorso è quello
che passa in mezzo: **prima si normalizza, senza riscrivere, e poi si sale la scala**.

## I casi d'uso del metodo

Il metodo ha tre casi d'uso, e conviene sapere in quale ti trovi prima di aprire l'agente, perché
cambia da dove si entra.

| Caso | Punto di partenza | Da dove si entra | Cosa c'è prima della prima funzionalità | Dov'è scritto |
|---|---|---|---|---|
| **Progetto nuovo** | Cartella vuota e un proprietario con una richiesta. | Gradino 0, e di lì i ventiquattro in ordine. | Il tratto di avvio intero prima della prima funzionalità. | Il documento principale, i ventiquattro contratti e il manuale del corso. |
| **Evolutivo-correttivo su un sistema fatto con il metodo** | Il sistema ha già salito la scala: ha contratto, mappa, voci in sospeso chiuse con prove, batteria, deployment e manuali. | Gradino 5: si apre un blocco e si segue il ciclo; il 13 periodico; il 23 alla chiusura della tappa. | Nessuno: è il gradino 23 che torna allo 0 per la tappa successiva, ed è già nella Parte B del documento principale. | Il documento principale (fase 4, esercizio). |
| **Evolutivo-correttivo su un sistema fatto senza il metodo** | Un sistema che gira, con utenti, senza nessuno di quegli artefatti o con alcuni a metà. | Il tratto di normalizzazione di questa pagina (da N0 a N7), e solo dopo il ciclo, in modalità correttiva o evolutiva. | Il tratto di normalizzazione intero, prima di toccare la prima riga di funzionalità. | Questa pagina e il manuale del corso, parte 2. |

Ciò che resta fuori, nominato perché non ci si confonda: la **migrazione tecnologica** (cambiare
piattaforma, linguaggio, database) non è un caso d'uso del metodo; è un altro progetto, e in
generale cade nei criteri escludenti del gradino 0 [Ref. 46](REFERENCIAS.md#ref-46). Se il sistema
che erediti non ha un repository accessibile o le sue schermate non si possono operare da
programma né si possono rendere operabili, ciò che è corretto non è normalizzarlo ma un progetto
nuovo che lo sostituisca, con il gradino 0 per intero.

E una precisazione che vale per il terzo caso: è lo stesso se il legacy è di un altro team o è
tuo. Un sistema che hai costruito con un modello, senza prove, tre mesi fa, è esattamente tanto
legacy quanto quello che ha fatto un fornitore tre anni fa. Cambia la fatica di leggerlo, non il
percorso.

## Il principio: normalizzare senza riscrivere, con tutti gli input

Normalizzare è portare il sistema allo stato che il metodo dà per scontato quando si apre il
ciclo. E lo faccio con tre regole che non negozio.

E una cosa prima delle tre regole: anche in questo percorso non ci sono scadenze. Il metodo è un
processo, non una promessa di velocità; normalizzare un legacy richiede il tempo che il legacy
chiede, e l'unica cosa che fisso è l'ordine e i cancelli.

**Prima: non si riscrive.** La normalizzazione non tocca la funzionalità. Mette attorno al sistema
ciò che gli manca (il contratto, la mappa, l'ambiente di test, la batteria, il deployment
ripetibile, i lucchetti su ciò che già agisce sul mondo) e lascia il sistema a fare le stesse cose
che faceva. Un legacy si rompe più spesso per l'entusiasmo di "mettere tutto in ordine" che per il
bug che bisognava sistemare.

**Seconda: due velocità.** C'è una parte del debito che si paga prima di qualunque modifica, e la
chiamo la **cintura di sicurezza**: poter eseguire il sistema in un ambiente di test con dati
simili a quelli reali, distribuirlo in modo ripetibile, avere i segreti fuori dal codice, e avere
una batteria di caratterizzazione dei flussi critici che va in rosso se una di queste cose cambia.
La cintura è un **cancello duro**: non si cambia nulla senza di essa, con una sola eccezione
scritta per l'urgenza in produzione, che spiego più sotto. Il resto del debito si paga **man mano
che si tocca**: quando un blocco entra in un modulo, le voci in sospeso di normalizzazione di quel
modulo entrano con lui. Mai "una pulizia generale" prima di cominciare.

**Terza: tutti gli input delle tappe precedenti devono esistere, anche se bisogna recuperarli per
autoscoperta.** Questa è la regola che distingue questo percorso da "applicare il ciclo e via".
Ogni gradino del tratto di avvio produce un artefatto che i gradini successivi leggono: la
rilevazione iniziale, la scheda di idoneità, il patto di convivenza, il file di progetto, l'albero
semantico, la rilevazione dei volumi, il dimensionamento, la rilevazione degli ambienti, i
cancelli. Nel progetto nuovo quegli input li scrive il proprietario con l'agente a partire
dall'acquisizione. Nel legacy non li ha scritti nessuno, e il ciclo non può partire senza. La
soluzione non è saltarli: è che l'agente li **recuperi dal sistema stesso**, leggendo il codice,
lo schema del database, la configurazione degli ambienti, i log e quel che c'è di documentazione,
e che ogni affermazione di quei documenti porti una marca di dove è uscita. Le marche che uso sono
cinque: `[codice]`, `[base]`, `[configurazione]`, `[documentazione]` e `[dedotto]`, più
`[business]` per ciò che il proprietario ha confermato o corretto. Un documento recuperato con le
marche è un documento che si può verificare senza leggere codice: il proprietario guarda le
affermazioni marcate `[dedotto]` e le conferma o le corregge, e guarda quelle marcate `[codice]`
per vedere se il sistema fa ciò che lui crede che faccia. Ciò che non coincide è una
**discrepanza**, e le discrepanze sono l'oro della normalizzazione: sono i bug che nessuno ha
segnalato e le regole che nessuno ha deciso.

### La tabella degli input recuperati

Perché non resti sul vago, qui c'è ogni input del tratto di avvio, dove nasce nel progetto nuovo,
e come si ottiene nel percorso evolutivo-correttivo.

| Input | Nel progetto nuovo lo produce | Nel percorso evolutivo-correttivo | Chi conferma |
|---|---|---|---|
| `docs/INITIAL_SURVEY.md` | Il proprietario, a mano, nell'acquisizione (gradini 0 e 2). | L'agente lo redige dal codice, dal database e dalla configurazione, con le marche di origine, in N2; il proprietario aggiunge ciò che solo il business sa. | Il proprietario, affermazione per affermazione su ciò che è `[dedotto]`. |
| `docs/ELIGIBILITY_CRITERIA.md` e `docs/ELIGIBILITY.md` | Gradino 0. | N0, con quattro criteri in più propri del legacy. | Il proprietario decide. |
| `docs/WORKING_AGREEMENT.md` | Gradino 1. | N1, con cinque regole in più proprie del legacy. | Il proprietario. |
| `PROJECT.md`, `docs/SEMANTIC_TREE.md`, `docs/STATUS.md` | Gradino 2, dalla rilevazione. | N2, dal sistema, con le marche; più la lista delle discrepanze. | Il proprietario percorre l'albero e decide ogni discrepanza. |
| `docs/AUDIT_[data].md` | Gradino 13, alla fine. | N3, all'inizio: è l'inventario del debito. | Il proprietario legge e verifica due rilievi. |
| `docs/ENVIRONMENTS_SURVEY.md`, l'ambiente di test, l'integrazione continua, il deployment ripetibile, `docs/GATES.md` | Gradini 4 e 13. | N4, la cintura di sicurezza, con la batteria di caratterizzazione. | Il proprietario vede lo screenshot e la seconda esecuzione del deployment. |
| `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`, `docs/PRODUCER_CONSUMER_MAP.md` | Gradini 14 e 11. | N5, per inventario del codice e del database. | Il proprietario conferma lucchetto per lucchetto. |
| `docs/VOLUME_SURVEY.md`, `docs/SIZING.md` | Gradino 3, con numeri che dà il business. | N6, con numeri misurati nel database e nei log (gradino 7 applicato al dimensionamento). | Il proprietario apporta solo ciò che non si può misurare. |
| `docs/PENDING.md` | Gradino 5, dalla richiesta del cliente. | N7, dall'audit, dalle discrepanze e dalla richiesta del cliente, con la marca "blocca / si paga quando si tocca / può aspettare". | Il proprietario ordina. |
| `docs/DECISIONS.md`, `docs/GOTCHAS.md`, `docs/LOCKS.md`, `docs/DEPLOYMENT.md` | Gradini 6, 11, 14, 15. | Si creano vuoti o si completano in N2, N4 e N5, e crescono nel ciclo come nel progetto nuovo. | Il proprietario. |

Se alla fine di N7 manca uno di questi file, il tratto non è salito. Non importa che il sistema
"funzioni": il ciclo ne avrà bisogno nella prima sessione.

## Il tratto di normalizzazione: le otto stazioni

Le chiamo stazioni e non gradini, e le numero da N0 a N7, perché non si confondano con i
ventiquattro della scala. Non sono gradini nuovi: sono i gradini dell'avvio e tre
dell'esercizio (l'11, il 13 e il 14), in un altro ordine e con un altro ingresso. Nel progetto
nuovo l'ingresso è la rilevazione; qui l'ingresso è il sistema, e la lettura la fa l'agente.

| Stazione | Gradini di origine | Cosa cambia rispetto al progetto nuovo |
|---|---|---|
| N0 — Idoneità di un sistema esistente | 0 | Quattro criteri in più; X2 si misura schermata per schermata; se è in rosso, è la prima voce in sospeso, non una condizione. |
| N1 — Il patto di convivenza per un legacy | 1 | Cinque regole in più: non rifattorizzare ciò che non è stato chiesto, leggere prima di toccare, annotare invece di sistemare di sfuggita, il comportamento attuale è la specifica, nulla entra senza la caratterizzazione in verde. |
| N2 — La lettura del sistema | 2 | La rilevazione, il file di progetto e l'albero escono dal codice con le marche di origine; compare la lista delle discrepanze. |
| N3 — L'audit come inventario | 13 | Va per primo, non per ultimo, e ogni rilievo dice se blocca, se si paga quando si tocca, o se può aspettare. |
| N4 — La cintura di sicurezza | 4, 7, 13 | Ambiente di test con dati, deployment ripetibile, segreti fuori, integrazione continua, e la batteria di caratterizzazione. Cancello duro. |
| N5 — Lucchetti e mappa dal codice | 14, 11 | Inventario di tutto ciò che agisce sul mondo e di tutti i contratti fra le parti, prima di cambiare qualunque cosa. |
| N6 — Dimensionare con numeri reali | 3, 7 | I primari si misurano, non si chiedono; il proprietario apporta solo ciò che non è nel database. |
| N7 — Il backlog di normalizzazione | 5 | Il debito e la richiesta del cliente, in una sola coda, con la marca di velocità e l'abbinamento per modulo. |

L'ordine conta. N3 va prima di N4 perché l'audit dice cosa deve entrare nella cintura (i segreti
che ha trovato, le schermate che non si possono operare, il deployment che non si può ripetere).
N5 va dopo la cintura perché inventariare azioni con conseguenze richiede di poter eseguire il
sistema in un posto dove sbagliare non costi. N6 va alla fine perché misura sull'ambiente di test
con dati, che esiste solo da N4. E N7 chiude perché mette insieme tutto quello che precede in una
sola coda.

### L'ordine della normalizzazione

Non ci sono scadenze: ogni tappa dura quanto il sistema chiede, e l'unica cosa fissa è l'ordine.

| Tappa | Stazioni | Cos'altro succede |
|---|---|---|
| 1 | N0, N1, N2, N3 | Lettura del sistema con il proprietario accanto, che conferma i nodi e decide le discrepanze. Nulla si cambia. Alla chiusura della tappa: la mappa recuperata e l'inventario del debito. |
| 2 | N4, N5 | La cintura: ambiente di test con dati, deployment ripetuto due volte, segreti ruotati, batteria di caratterizzazione dei flussi critici. Lucchetti confermati su ciò che già agisce. Alla chiusura: il sistema gira in test e la batteria è in verde. |
| 3 | N6, N7, e il primo blocco | Dimensionamento misurato. Il backlog ordinato. Si apre il primo blocco con il gradino 5, correttivo o evolutivo, con le sue voci in sospeso di normalizzazione abbinate. Da qui in avanti è il ciclo di sempre. |

Se il sistema è grande, ciò che cresce è la tappa 1 (c'è più da leggere) e la batteria di
caratterizzazione della tappa 2 (ci sono più flussi). Non cresce N7: un backlog di normalizzazione
che non si può scrivere in una sola seduta è un backlog che nessuno manterrà.

---

### N0 — Idoneità di un sistema esistente: i prerequisiti che un modello può verificare

- **Intenzione**: decidere se questo sistema si può prendere con il metodo, prima di toccarlo, con
  criteri che non dipendono da una valutazione umana ma da ciò che un modello di frontiera può
  fare o non fare con il sistema. Se un prerequisito non è soddisfatto, non è un "non va": è un
  **progetto a sé**, precedente, perché il sistema diventi idoneo.
- **Quando**: una volta sola, prima di qualunque altra cosa.
- **Input**: la rilevazione iniziale breve, accesso in lettura al repository e, se si può,
  all'ambiente dove gira e al suo database.
- **Artefatto**: `docs/ELIGIBILITY.md` con la decisione e i sette prerequisiti escludenti del
  legacy, ciascuno verificato dall'agente con prove, non dichiarato da una persona:
  1. **Si può montare un ambiente completo del sistema**, con tutti i suoi sorgenti, il suo
     modello di dati e la sua persistenza, dal repository e da una copia dei dati.
  2. **Il codice è comprensibile e affrontabile da un modello di frontiera**: l'agente lo può
     leggere per intero e spiegare cosa fa ogni modulo senza inventare.
  3. **A partire dal codice, il modello può descrivere in un documento la funzionalità completa
     del sistema**, in una forma che un utente finale riconosca come il suo sistema e accetti.
  4. **Il frontend può essere percorso da strumenti di test** per generare test end to end, con
     ogni elemento accessibile e l'effetto nel backend verificabile (è X2).
  5. **Il sistema si può costruire ed eseguire dai sorgenti con gli strumenti disponibili oggi**:
     le dipendenze si risolvono, le versioni esistono, nulla dipende da un binario perduto.
  6. **I dati di produzione si possono copiare e anonimizzare** per un ambiente di test, e c'è una
     copia di backup che è stata ripristinata almeno una volta.
  7. **Le integrazioni esterne hanno una modalità di prova o si possono isolare al bordo** (una
     casella finta, un fornitore in modalità di prova), perché le azioni con conseguenze si
     provino senza conseguenze.
- **Cancello**: i sette in verde, con la prova dell'agente (l'ambiente montato, il documento di
  funzionalità scritto, un test end to end di un flusso che gira). Ogni rosso diventa un progetto
  precedente con la sua voce in sospeso di uscita.
- **Chi decide**: l'agente verifica e presenta le prove; il proprietario decide se affronta i
  progetti precedenti o no.

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business insieme a te),
non l'agente:

- `docs/INITIAL_SURVEY.md`, la versione breve che puoi scrivere il primo giorno: cosa fa il
  sistema e per chi, secondo il business; cosa fa male oggi (il bug che motiva la richiesta, ciò
  che manca); chi l'ha fatto e se è disponibile; dove gira; chi ha accesso a cosa; se c'è un
  backup e chi lo fa. Mezza pagina, incompleta di proposito: in N2 l'agente la completerà a
  partire dal sistema.
- `docs/ELIGIBILITY_CRITERIA.md`: la scheda del gradino 0 (X1, X2 e quelli che pesano) più i sette
  prerequisiti del legacy qui sopra, ciascuno con tre colonne vuote: verde o rosso, la prova (cosa
  ha fatto l'agente per verificarlo), e il progetto precedente se è in rosso.
- Accesso in lettura al repository per l'agente, accesso a una copia dei dati (o alla produzione in
  sola lettura) e a un posto dove possa provare a montare l'ambiente, con le credenziali fuori
  dalla chat. Senza questo, i prerequisiti 1, 5 e 6 non si possono verificare e restano in rosso.
- Stato minimo accettabile: l'agente può clonare il repository e ha un posto dove provare a
  tirare su il sistema.

**Iniziale:**

> We are going to assess whether this existing system can be taken over with the Urazuke method,
> with prerequisites that you verify by doing, not by asking. Read the initial survey in
> `docs/INITIAL_SURVEY.md` and the criteria sheet in `docs/ELIGIBILITY_CRITERIA.md`. Then, changing
> nothing in the system, verify each prerequisite with evidence: (1) try to set up a complete
> environment of the system from the repository and a copy of the data, with its sources, data
> model and persistence, and tell me exactly what you could and could not bring up; (2) read the
> whole code and tell me whether you can understand and work with it, module by module, naming
> what you cannot understand; (3) from the code alone, write `docs/FUNCTIONALITY_RECOVERED.md`: the
> complete functionality of the system described for an end user, screen by screen and process by
> process, marking what you inferred; (4) list every screen and say whether it can be driven by a
> test tool with each element accessible and the backend effect checkable, and prove it by writing
> and running one end-to-end test of one flow; (5) try to build and run the system from the sources
> with today's tools and report every dependency that does not resolve; (6) check whether the
> production data can be copied and anonymized into a test environment and whether a backup exists
> and has ever been restored; (7) list every external integration and say whether it has a test
> mode or can be isolated at the edge. For each prerequisite: green or red, the evidence (what you
> did and what happened), and, if red, what project would make it green. Do not decide: present me
> the sheet, and I decide.
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
> Valuteremo se questo sistema esistente si può prendere in carico con il metodo Urazuke, con
> prerequisiti che verifichi facendo, non chiedendo. Leggi la rilevazione iniziale in
> `docs/INITIAL_SURVEY.md` e la scheda dei criteri in `docs/ELIGIBILITY_CRITERIA.md`. Poi, senza
> cambiare nulla nel sistema, verifica ogni prerequisito con una prova: (1) prova a montare un
> ambiente completo del sistema dal repository e da una copia dei dati, con i suoi sorgenti, il suo
> modello di dati e la sua persistenza, e dimmi esattamente cosa sei riuscito a tirare su e cosa
> no; (2) leggi tutto il codice e dimmi se riesci a capirlo e a lavorarci, modulo per modulo,
> nominando ciò che non capisci; (3) solo a partire dal codice, scrivi
> `docs/FUNCTIONALITY_RECOVERED.md`: la funzionalità completa del sistema descritta per un utente
> finale, schermata per schermata e processo per processo, marcando ciò che hai dedotto; (4) elenca
> ogni schermata e di' se si può operare con uno strumento di test con ogni elemento accessibile e
> l'effetto nel backend verificabile, e dimostralo scrivendo ed eseguendo un test end to end di un
> flusso; (5) prova a costruire ed eseguire il sistema dai sorgenti con gli strumenti di oggi e
> riporta ogni dipendenza che non si risolve; (6) verifica se i dati di produzione si possono
> copiare e anonimizzare in un ambiente di test e se esiste una copia di backup che sia mai stata
> ripristinata; (7) elenca ogni integrazione esterna e di' se ha una modalità di prova o si può
> isolare al bordo. Per ogni prerequisito: verde o rosso, la prova (cosa hai fatto e cosa è
> successo) e, se è in rosso, quale progetto lo porterebbe in verde. Non decidere: presentami la
> scheda, e decido io.
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

Cosa gli sto chiedendo: che i prerequisiti si verifichino **facendo** (montare, leggere, scrivere
il documento, eseguire un test), perché un modello di frontiera può fare tutte e quattro le cose e
allora l'idoneità smette di essere un'opinione; il documento di funzionalità recuperata, che è la
prova più forte del fatto che il codice è affrontabile, e che per di più è la prima bozza di ciò
che N2 trasformerà nella mappa; e che ogni rosso arrivi con il progetto che lo porta in verde,
perché un prerequisito che manca non è un rifiuto ma un lavoro precedente con un suo perimetro.

**Prima di inviare il prompt** di chiusura: la tua decisione in una riga, presa dopo aver letto la
scheda con la prova di ogni prerequisito; e, per ogni rosso, la tua decisione se il progetto
precedente si affronta adesso, dopo, o mai (e allora il sistema non è idoneo).

**Di chiusura:**

> Decision: [go / go after these prerequisite projects: … / no-go]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, each prerequisite with its colour and its
> evidence, and, for every red one, the prerequisite project as a pending item in `docs/PENDING.md`
> marked as blocking, with its own acceptance criterion: the prerequisite verified green. Include
> the questions you asked and my answers.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [it]
> Decisione: [va / va dopo questi progetti precedenti: … / non va]. Scrivi la scheda finale in
> `docs/ELIGIBILITY.md` con la data, chi ha deciso, ogni prerequisito con il suo colore e la sua
> prova, e, per ciascuno in rosso, il progetto precedente come voce in sospeso in
> `docs/PENDING.md` marcata come bloccante, con il suo criterio di accettazione: il prerequisito
> verificato in verde. Includi le domande che hai fatto e le mie risposte.
>
> Quando hai bisogno di una decisione da parte mia, chiedila con le quattro parti della UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e in questo ordine: i dati che rendono necessaria la domanda,
> elencati; un paragrafo di non più di cinque righe che li colleghi e lasci vedere
> l'interrogativo; la domanda con le sue possibili risposte numerate; e la tua raccomandazione.
> Dillo alla profondità tecnica che il progetto ha dichiarato in `communication_depth`
> —`beginner`, `decision_maker` o `technical`—; se il progetto non ne ha dichiarata nessuna, usa
> `decision_maker`.

Verifica di completezza: ogni prerequisito ha la prova di qualcosa che l'agente **ha fatto**, non
una risposta tua? Esiste `docs/FUNCTIONALITY_RECOVERED.md`, e l'hai letto come il proprietario:
descrive il sistema che lui crede di avere? Ha eseguito un test end to end reale di un flusso?
Ogni rosso ha il suo progetto precedente con il criterio di uscita? Segnale d'allarme: tutti in
verde in un pomeriggio per un sistema che nessuno capisce. L'agente ha risposto invece di fare.

---

### N1 — Il patto di convivenza per un legacy

- **Intenzione**: fissare le regole prima di toccare qualunque cosa, con cinque regole in più
  rispetto al gradino 1, che sono quelle di cui un sistema ereditato ha bisogno perché l'agente
  non lo "migliori" per conto suo.
- **Quando**: dopo N0, prima di leggere qualunque cosa.
- **Input**: le tue preferenze di lavoro, come nel gradino 1.
- **Artefatto**: `docs/WORKING_AGREEMENT.md` con le sei regole del metodo e le cinque del legacy.
- **Cancello**: il patto ha data e versione, e il file di progetto (quando esisterà, in N2) ordina
  di leggerlo.
- **Chi decide**: il proprietario.

**Prima di inviare il prompt**, devi avere questo sottomano:

- Le tue preferenze di lavoro, in un elenco breve, come nel gradino 1: lingua, quanto vuoi che ti
  chieda, che autonomia gli dai, cosa non tolleri.
- Una tua decisione sul livello di rischio che accetti mentre si normalizza: se l'agente può o no
  distribuire all'ambiente di test per conto suo (in produzione, mai, fino a N4 chiusa e al
  gradino 15 salito).
- `docs/ELIGIBILITY.md` (N0), chiuso.
- Stato minimo accettabile: sai rispondere alle domande del gradino 1 e a quella del rischio.

**Iniziale:**

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
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

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
>
> Quando hai bisogno di una decisione da parte mia, chiedila con le quattro parti della UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e in questo ordine: i dati che rendono necessaria la domanda,
> elencati; un paragrafo di non più di cinque righe che li colleghi e lasci vedere
> l'interrogativo; la domanda con le sue possibili risposte numerate; e la tua raccomandazione.
> Dillo alla profondità tecnica che il progetto ha dichiarato in `communication_depth`
> —`beginner`, `decision_maker` o `technical`—; se il progetto non ne ha dichiarata nessuna, usa
> `decision_maker`.

Cosa gli sto chiedendo: le sei regole di sempre, e cinque che esistono perché un modello di fronte
a codice altrui fa tre cose per riflesso: lo riordina, lo "sistema" dove gli sembra sbagliato, e
dà per scontato che ciò che il codice fa sia un errore quando differisce da ciò che lui si
aspetterebbe. Le regole 7, 9 e 10 bloccano esattamente questi tre riflessi. La regola 8 trasforma
la lettura in mappa, perché ciò che l'agente impara di un modulo non si perda alla chiusura della
sessione. L'11 è la cintura di sicurezza scritta come regola, perché esista prima che esista la
batteria.

**Di chiusura:** il prompt di chiusura del gradino 1, senza modifiche: accetti e rifiuti le
proposte con una motivazione, e il patto resta con data e versione.

Segnale d'allarme: l'agente propone come regola "modernizzare il codice man mano che si tocca".
Quella regola è la riscrittura travestita; rifiutala con una motivazione scritta.

---

### N2 — La lettura del sistema: la mappa recuperata e le discrepanze

- **Intenzione**: che esista la mappa che il gradino 2 produce in un progetto nuovo, ma ricavata
  dal sistema stesso, con le marche di origine, e con la lista di tutto ciò che non coincide fra
  il codice, il database, la documentazione e ciò che il business crede. È il gradino 2 fatto per
  ingegneria inversa, ed è il passo che dà più valore per ora di lavoro di tutto il percorso.
- **Quando**: dopo N1, con il proprietario disponibile a confermare.
- **Input**: il repository completo, lo schema del database in sola lettura, la configurazione di
  ogni ambiente, i log se ci sono, la documentazione che esiste, e la rilevazione breve di N0.
- **Artefatto**: `docs/INITIAL_SURVEY.md` completato con le marche; `PROJECT.md`;
  `docs/SEMANTIC_TREE.md` con ogni nodo marcato; `docs/STATUS.md`; e la lista delle discrepanze,
  ciascuna decisa dal proprietario e scritta in `docs/DECISIONS.md`.
- **Cancello**: nessun nodo `[dedotto]` senza verdetto del proprietario; nessuna discrepanza senza
  decisione o senza voce in sospeso; la prova di lettura del gradino 2 superata.
- **Chi decide**: il proprietario, discrepanza per discrepanza.

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business insieme a te),
non l'agente:

- Accesso in lettura per l'agente a tutto ciò che si può leggere: il repository intero (tutti i
  rami, non solo quello principale), lo schema del database (una credenziale di sola lettura,
  fuori dalla chat), la configurazione di ogni ambiente (i file di ambiente con i valori dei
  segreti coperti, o la lista delle variabili senza i loro valori), i log recenti se esistono, e
  qualunque documentazione, anche se è una vecchia email o un manuale non aggiornato.
- `docs/INITIAL_SURVEY.md` di N0, con una sezione nuova, scritta da te con il proprietario: **ciò
  che il business crede che il sistema faccia**, con le sue parole, caso d'uso per caso d'uso, e
  le regole di business che ricorda ("un appuntamento non si può cancellare con meno di due ore").
  Non verificarlo contro il sistema: proprio quel confronto lo farà l'agente, e le differenze sono
  le discrepanze.
- `docs/WORKING_AGREEMENT.md` (N1), chiuso.
- Una lista scritta da te di ciò che vive fuori dal repository e tocca il sistema: un robot, un
  foglio di calcolo che legge il database, un processo pianificato sul server, un altro sistema
  che consuma una tabella. L'agente non lo vedrà dal codice.
- Stato minimo accettabile: l'agente può leggere il codice e lo schema del database, e la
  rilevazione ha almeno tre casi d'uso e tre regole nelle parole del business.

**Iniziale:**

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
> for the living state.
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
> stato vivo.
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

Cosa gli sto chiedendo: che legga tutto e dichiari ciò che non ha potuto leggere (la clausola di
completezza nella sua forma da legacy: la lacuna si marca, non si riempie); che la rilevazione e
l'albero escano con le **marche di origine** su ogni affermazione, perché quella marca è ciò che
ti permette di verificare senza leggere codice; che i processi e gli stati siano **quelli che il
codice implementa**, non quelli che dovrebbero essere, perché il comportamento attuale è la
specifica (regola 10 del patto); che includa i processi pianificati, che sono quelli che nessuno
ricorda e quelli che fanno più danno; e che le discrepanze restino elencate con la prova di
ciascun lato e **senza risolverle**, perché risolverle è decidere, e decidere spetta a te.

**Prima di inviare il prompt** di chiusura: l'albero percorso con il proprietario nodo per nodo,
con la lista dei nodi confermati e quella dei corretti; e la lista delle discrepanze, ciascuna con
la decisione del proprietario in una riga e la data (il sistema è a posto e il business se n'era
dimenticato; il sistema è sbagliato e si cambia; oppure resta aperta con una data, e non troppe).

**Di chiusura:**

> I confirm these nodes: [list]. Correct these: [list]. The discrepancies are decided as follows:
> [one line each: discrepancy, my decision, today's date]. Finalize `docs/INITIAL_SURVEY.md`,
> `PROJECT.md` and `docs/SEMANTIC_TREE.md` with today's date, keeping the source tags. Write each
> discrepancy decision in `docs/DECISIONS.md` with my exact words, and open a pending item in
> `docs/PENDING.md` for every discrepancy where I decided the system must change; for the ones
> where I decided the current behaviour stays, write it next to the node as a confirmed rule. Add
> to `PROJECT.md` the instruction to read this file, the tree and the working agreement at the
> start of every session.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [it]
> Confermo questi nodi: [lista]. Correggi questi: [lista]. Le discrepanze si decidono così: [una
> riga ciascuna: discrepanza, la mia decisione, la data di oggi]. Chiudi `docs/INITIAL_SURVEY.md`,
> `PROJECT.md` e `docs/SEMANTIC_TREE.md` con la data di oggi, conservando le marche di origine.
> Scrivi ogni decisione su una discrepanza in `docs/DECISIONS.md` con le mie parole esatte, e apri
> una voce in sospeso in `docs/PENDING.md` per ogni discrepanza in cui ho deciso che il sistema
> deve cambiare; per quelle in cui ho deciso che il comportamento attuale resta, scrivilo accanto
> al nodo come regola confermata. Aggiungi a `PROJECT.md` l'istruzione di leggere questo file,
> l'albero e il patto di convivenza all'inizio di ogni sessione.
>
> Quando hai bisogno di una decisione da parte mia, chiedila con le quattro parti della UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e in questo ordine: i dati che rendono necessaria la domanda,
> elencati; un paragrafo di non più di cinque righe che li colleghi e lasci vedere
> l'interrogativo; la domanda con le sue possibili risposte numerate; e la tua raccomandazione.
> Dillo alla profondità tecnica che il progetto ha dichiarato in `communication_depth`
> —`beginner`, `decision_maker` o `technical`—; se il progetto non ne ha dichiarata nessuna, usa
> `decision_maker`.

Cosa gli sto chiedendo: che la decisione su ogni discrepanza resti nei tre posti di sempre (il
registro delle decisioni, la voce in sospeso se bisogna cambiare, l'albero se si conferma), e che
le marche di origine **non si cancellino** alla chiusura: un albero che ha perso le marche è un
albero che non si può più verificare.

Verifica di completezza: percorri l'albero come il proprietario: c'è uno stato di un'entità che il
business non ha mai usato? Se è marcato `[codice]`, il sistema ce l'ha anche se nessuno lo usa, ed
è una discrepanza. C'è un processo pianificato nell'albero? Se non ce n'è nessuno, chiedi
all'agente dove ha cercato. Ogni discrepanza ha una decisione con la data? Ha superato la prova di
lettura del gradino 2 (una sessione nuova sa cosa NON fa il sistema)? Segnali d'allarme: l'albero
non ha nulla marcato `[dedotto]` (l'agente non sta distinguendo ciò che ha letto da ciò che ha
supposto); la lista delle discrepanze è vuota (non è mai vuota in un legacy: l'agente ha
confrontato male o non ha confrontato); il file di progetto supera le trecento righe perché "c'era
molto da documentare" (quello va nell'albero, e ciò che è successo va nello stato vivo
[Ref. 41](REFERENCIAS.md#ref-41)).

---

### N3 — L'audit come inventario del debito

- **Intenzione**: il gradino 13, ma all'inizio e con una domanda in più per ogni rilievo: blocca,
  si paga quando si tocca il modulo, o può aspettare? Il rapporto non è un rapporto: è la materia
  prima della cintura (N4) e del backlog (N7). Nel mio primo progetto partito con il metodo già
  scritto, la serie di audit precoci si è trasformata direttamente in voci in sospeso
  [Ref. 30](REFERENCIAS.md#ref-30); qui faccio lo stesso su un sistema altrui.
- **Quando**: dopo N2, in una sessione diversa da quella che ha letto il sistema se si può.
- **Input**: il repository in sola lettura, l'ambiente dove gira in sola lettura, la mappa
  recuperata (N2).
- **Artefatto**: `docs/AUDIT_[data].md` con ogni rilievo marcato "blocca / si paga quando si tocca
  / può aspettare".
- **Cancello**: nessun rilievo senza marca di velocità; quelli che bloccano hanno una voce in
  sospeso aperta prima di cominciare N4.
- **Chi decide**: il proprietario, sulle marche di velocità.

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business insieme a te),
non l'agente:

- Una sessione nuova dell'agente, se il tuo strumento lo permette, con un clone pulito e un file
  di istruzioni che dica "sei un auditor; non hai letto e non toccherai questo sistema", perché
  non condivida i presupposti della sessione di N2. Se non si può, la stessa sessione, ma sappilo.
- Accesso in sola lettura all'ambiente dove gira il sistema (database, log, configurazione), con
  credenziali di sola lettura fuori dalla chat.
- La mappa recuperata di N2 (`PROJECT.md`, `docs/SEMANTIC_TREE.md`) e `docs/DISCREPANCIES.md`,
  perché l'auditor non riscopra ciò che è già scritto.
- Il tuo criterio su cosa significa "blocca": in generale, un segreto esposto, una schermata che
  non si può operare da programma, un deployment che non si può ripetere, la mancanza di backup, e
  qualunque cosa possa danneggiare dati o far pagare più del dovuto. Scrivilo in due righe per
  darglielo.
- Stato minimo accettabile: l'auditor ha la sola lettura e sa cosa consideri bloccante.

**Iniziale:**

> Audit this system for integrity, security, performance, code quality and deployability, as the
> inventory of what must be normalized before and during its evolution. Read-only: change nothing
> except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires access you
> lack (the database, the logs, the server), tell me and mark that part as not audited; do not
> pass it as fine. Go through all of the code, not a sample, and read `docs/SEMANTIC_TREE.md` and
> `docs/DISCREPANCIES.md` first so that you do not report what is already known. For every
> finding: where it is (file and line), the risk, the evidence that proves it (the command, the
> query, the number), its priority (P0 must be fixed now, P1 soon, P2 when possible), and one more
> field: whether it BLOCKS (must be fixed before any change, by my criteria: [criteria]), whether
> it is PAID WHEN TOUCHED (fixed together with the first change that enters its module), or whether
> it CAN WAIT. Grade every dimension you audited. End with every finding turned into a proposed
> pending item, blocking ones first.
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
> Fai l'audit di questo sistema su integrità, sicurezza, prestazioni, qualità del codice e
> distribuibilità, come inventario di ciò che va normalizzato prima e durante la sua evoluzione.
> Sola lettura: non cambiare nulla, salvo scrivere il tuo rapporto in `docs/AUDIT_[data].md`. Se
> fare l'audit di qualche parte richiede un accesso che non hai (il database, i log, il server),
> dimmelo e marca quella parte come non sottoposta ad audit; non darla per buona. Percorri tutto
> il codice, non un campione, e leggi prima `docs/SEMANTIC_TREE.md` e `docs/DISCREPANCIES.md` per
> non segnalare ciò che è già noto. Per ogni rilievo: dov'è (file e riga), il rischio, la prova
> che lo dimostra (il comando, la query, il numero), la sua priorità (P0 va risolto subito, P1
> presto, P2 quando si può), e un campo in più: se BLOCCA (va risolto prima di qualunque modifica,
> secondo il mio criterio: [criterio]), se SI PAGA QUANDO SI TOCCA (si risolve insieme alla prima
> modifica che entra nel suo modulo), oppure se PUÒ ASPETTARE. Dai un voto a ogni dimensione di
> cui hai fatto l'audit. Finisci con ogni rilievo trasformato in una voce in sospeso proposta,
> prima quelle bloccanti.
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

Cosa gli sto chiedendo: l'audit del gradino 13 con la dimensione "distribuibilità" aggiunta
(perché in un legacy il deployment è di solito il primo problema) e con il campo di velocità, che
è ciò che trasforma un rapporto in un piano: senza quel campo, un legacy sottoposto ad audit ha
quaranta rilievi e nessuno sa da quale cominciare. Il criterio di cosa blocca lo do io, non
l'auditor, perché dipende dalle conseguenze per il business.

**Di chiusura:** il prompt di chiusura del gradino 13, al costruttore, con un'aggiunta: le voci in
sospeso che apre portano la marca di velocità del rilievo.

Verifica: il rapporto dice di cosa NON ha potuto fare l'audit? C'è almeno un rilievo marcato
"blocca"? (In un legacy ce n'è sempre; se non c'è, l'auditor non ha guardato i segreti né il
deployment.) Due rilievi a caso hanno file, riga e prova riproducibile? Segnale d'allarme: è tutto
in "può aspettare". È un auditor che non vuole disturbare.

---

### N4 — La cintura di sicurezza

- **Intenzione**: che esista, attorno al sistema e senza toccarne la funzionalità, ciò che rende
  sicuro cambiarlo: un ambiente di test con dati simili a quelli reali, un deployment che si
  ripete, i segreti fuori dal codice, l'integrazione continua che esegue quel che c'è, e la
  **batteria di caratterizzazione** dei flussi critici. È il gradino 4, la prima metà del 15 e una
  forma rovesciata dell'8, insieme e prima di qualunque modifica. È un **cancello duro**: finché la
  cintura non è in verde, non si cambia una riga di funzionalità.
- **Quando**: dopo N3, prima di qualunque modifica.
- **Input**: la rilevazione degli ambienti (recuperata in N2 e confermata da te), il rapporto di
  N3 con i suoi rilievi bloccanti, l'albero semantico con i processi, e l'accesso al server e al
  database.
- **Artefatto**: l'ambiente di test che gira con dati anonimizzati; `docs/DEPLOYMENT.md` con il
  deployment in test ripetuto due volte; i segreti nella configurazione del server e ruotati;
  l'integrazione continua in verde; `docs/GATES.md`; e la batteria di caratterizzazione in verde,
  con il rosso dimostrato per ogni flusso.
- **Cancello**: screenshot del sistema che gira in test visto da te; seconda esecuzione del
  deployment senza modifiche; ricerca di segreti nel repository vuota; batteria di
  caratterizzazione in verde e ogni test provato in rosso per mutazione.
- **Chi decide**: il proprietario, su quali flussi sono critici e sull'anonimizzazione dei dati.

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business insieme a te),
non l'agente:

- `docs/ENVIRONMENTS_SURVEY.md`, che l'agente ha redatto in N2 con le marche e tu hai completato:
  dove gira oggi, come si distribuisce oggi (anche se è "copio i file via FTP"), dove vivranno i
  segreti sul server, chi ha accesso, e dove girerà l'ambiente di test (un server a parte, un
  contenitore, un account cloud; se non hai nulla, dillo e l'agente propone la cosa più semplice).
  Il prompt lo chiama "the environments survey"; digli dov'è.
- Accesso dell'agente al server di produzione in sola lettura (per copiare il database e la
  configurazione) e al posto dove girerà l'ambiente di test con permessi di scrittura, con le
  credenziali fuori dalla chat.
- La tua decisione sull'**anonimizzazione** dei dati di test: quali campi sono dati personali
  (nomi, telefoni, email, documenti) e come si sostituiscono. Lo decidi tu perché è un obbligo di
  legge, non una preferenza tecnica.
- La lista dei **flussi critici** per la caratterizzazione, scritta da te a partire dai processi
  dell'albero semantico: quelli che, se cambiano senza volerlo, costano soldi o fiducia al
  business. Fra quattro e otto per un sistema piccolo. Non "tutti": tutti è nessuno.
- `docs/AUDIT_[data].md` (N3), perché l'agente sappia quali segreti ha trovato e quali schermate
  non si possono operare.
- Un backup di produzione ripristinato almeno una volta, anche solo sulla tua macchina, prima che
  l'agente tocchi il server. È la condizione di N0 che scade qui.
- Stato minimo accettabile: sai dove girerà l'ambiente di test, hai la lista dei flussi critici,
  hai deciso l'anonimizzazione e hai ripristinato un backup.

**Per l'ambiente, il deployment e i segreti:**

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

Cosa gli sto chiedendo: lo scheletro del gradino 4 costruito attorno a qualcosa che esiste già,
con metà del gradino 15 anticipata (segreti fuori, deployment documentato) perché in un legacy i
segreti nel codice sono la regola e non l'eccezione [Ref. 42](REFERENCIAS.md#ref-42);
l'anonimizzazione come parte dell'ambiente e non come un dettaglio; e i cancelli scritti prima che
esista la batteria, perché la batteria nasca già essendo cancello.

**Prima di inviare il prompt** della batteria: l'ambiente di test aperto da te con i dati
anonimizzati; i segreti della lista ruotati, oggi; la lista dei flussi critici per lo spazio vuoto
del prompt; e, se N0 ha lasciato schermate in rosso, la voce in sospeso bloccante che le rende
operabili chiusa prima o come parte di questa batteria.

**Per la batteria di caratterizzazione:**

> We are going to write the characterization tests of these critical flows: [list]. A
> characterization test captures what the system does today, exactly as it does it, defects
> included; it is not a test of what the system should do. For each flow: drive it from the
> screen as a user would and check the effect in the backend (the row, the state, the message
> queued). Every test must pass against the current code. Then prove that each test actually
> watches its flow: break the flow deliberately with a temporary change, show me the red output,
> revert the change, show me the green. If a flow cannot be driven from the screen, do not
> simulate it: say so and open a pending item marked as blocking. If while writing these tests you
> find behaviour that looks wrong, do not fix it: add it to `docs/DISCREPANCIES.md` with the
> evidence. Record the command to run the suite in `docs/STATUS.md`, and make the suite the gate
> for the test environment as `docs/GATES.md` says.
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
> Scriveremo i test di caratterizzazione di questi flussi critici: [lista]. Un test di
> caratterizzazione cattura ciò che il sistema fa oggi, esattamente come lo fa, difetti inclusi;
> non è un test di ciò che il sistema dovrebbe fare. Per ogni flusso: operalo dalla schermata come
> farebbe un utente e verifica l'effetto nel backend (la riga, lo stato, il messaggio in coda).
> Tutti i test devono passare contro il codice attuale. Poi dimostra che ogni test sorveglia
> davvero il suo flusso: rompi il flusso di proposito con una modifica temporanea, mostrami
> l'output in rosso, annulla la modifica, mostrami il verde. Se un flusso non si può operare dalla
> schermata, non simularlo: dillo e apri una voce in sospeso marcata come bloccante. Se mentre
> scrivi questi test trovi un comportamento che sembra sbagliato, non sistemarlo: aggiungilo a
> `docs/DISCREPANCIES.md` con la prova. Registra il comando per eseguire la batteria in
> `docs/STATUS.md`, e fai in modo che la batteria sia il cancello dell'ambiente di test come dice
> `docs/GATES.md`.
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

Cosa gli sto chiedendo: il gradino 8 al contrario. Nel progetto nuovo il test nasce in rosso e
passa al verde con la modifica; qui il test nasce in verde, perché cattura ciò che c'è, e la prova
che serve è che **va in rosso quando rompi il flusso di proposito**. Senza quella mutazione
dimostrata, un test di caratterizzazione è un test che passa perché non guarda nulla, che è lo
stesso problema del verde che nasconde un bug [Ref. 44](REFERENCIAS.md#ref-44). E le due clausole
di disciplina: ciò che non si può operare si dichiara e blocca, e ciò che sembra sbagliato si
annota come discrepanza, non si sistema, perché finché il proprietario non decide, il
comportamento attuale è la specifica.

Verifica di completezza: hai aperto tu l'URL dell'ambiente di test e hai visto il sistema con i
dati? Hai cercato un nome reale in quei dati e non c'è? Il deployment è stato eseguito due volte e
la seconda non ha cambiato nulla? Hai chiesto la ricerca di segreti nel repository ed è tornata
vuota? Hai ruotato ogni segreto della lista? Ogni flusso critico ha il suo test, e ogni test ha il
suo rosso per mutazione a vista? Segnali d'allarme: la batteria di caratterizzazione è passata per
intero "al primo colpo" e non si è mai visto un rosso; l'ambiente di test gira "sulla macchina
dell'agente" e non in un posto che tu possa aprire; i dati di test sono "qualche record di
esempio" invece di una copia anonimizzata (i bug di un legacy vivono nei dati reali, non in quelli
di esempio).

---

### N5 — Lucchetti e mappa produttore-consumatore dal codice

- **Intenzione**: sapere, prima di cambiare qualunque cosa, cosa fa il sistema che agisce sul
  mondo (incassa, invia, approva, cancella, avvisa, gira da solo di notte) e chi produce e consuma
  ogni contratto fra le parti. Nel progetto nuovo questo si decide prima di costruire (gradino 14)
  e si mappa man mano che si costruisce (gradino 11). Nel legacy è già costruito, e nessuno lo
  ricorda per intero. Una modifica evolutiva può innescare un'azione con conseguenze che era
  addormentata, e una modifica correttiva può lasciare un consumatore disallineato.
- **Quando**: dopo la cintura, perché inventariare azioni richiede di poter
  eseguire il sistema dove sbagliare non costi.
- **Input**: il codice, il database, i processi pianificati del server, l'albero semantico, e la
  lista di ciò che vive fuori dal repository.
- **Artefatto**: `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` con le marche di origine,
  `docs/PRODUCER_CONSUMER_MAP.md`, e dopo la chiusura `docs/LOCKS.md` con i lucchetti che vanno
  adesso e quelli che vanno dopo.
- **Cancello**: nessuna azione con conseguenze senza verdetto del proprietario; i lucchetti
  marcati "adesso" implementati con il loro test in rosso prima del primo blocco.
- **Chi decide**: il proprietario, lucchetto per lucchetto.

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business insieme a te),
non l'agente:

- Con il proprietario, una lista scritta di ciò che il business **sa** che il sistema fa verso
  l'esterno: cosa incassa, cosa manda, chi avvisa, cosa cancella, cosa gira da solo. Va in una
  sezione di `docs/INITIAL_SURVEY.md`. L'agente troverà nel codice più di quanto il business
  ricordi; il confronto fra le due liste è il risultato.
- Accesso dell'agente ai processi pianificati del server (la lista delle attività pianificate o
  l'equivalente della tua piattaforma), perché gli invii automatici di solito vivono lì e non nel
  codice.
- La lista di ciò che vive fuori dal repository (N2), per la mappa.
- L'ambiente di test di N4 che gira, perché possa innescare un'azione e vedere cosa succede senza
  conseguenze reali.
- Stato minimo accettabile: il business ha scritto la sua lista e l'agente può vedere le attività
  pianificate.

**Iniziale:**

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
> module is touched. Do not implement anything yet: I confirm lock by lock.
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
> per lucchetto.
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

Cosa gli sto chiedendo: l'inventario dei gradini 14 e 11 in una passata sola, perché percorrono lo
stesso codice; il confronto fra ciò che il business ricorda e ciò che il codice fa, che è dove
compaiono gli invii di cui nessuno si ricordava; e la proposta di **adesso o quando si tocca** per
ogni lucchetto, che è la regola delle due velocità applicata alla protezione: un lucchetto su
un'azione che incassa va adesso; un lucchetto su un'esportazione mensile può aspettare il blocco
che toccherà quel modulo.

**Di chiusura:** il prompt di chiusura del gradino 14, con i lucchetti marcati "adesso", ciascuno
con il suo test in rosso contro la versione senza lucchetto; gli altri restano nel backlog con la
loro marca.

Segnale d'allarme: l'agente ha trovato esattamente le stesse azioni che il business ha elencato.
In un legacy non succede mai; è mancato di guardare le attività pianificate o i trigger del
database.

---

### N6 — Dimensionare con numeri reali

- **Intenzione**: il gradino 3, ma con il vantaggio enorme del legacy: i dati primari non bisogna
  chiederli, sono nel database e nei log. Si misurano con il gradino 7 (un misuratore con test,
  verificato nelle due direzioni) e il proprietario apporta solo ciò che non è da nessuna parte:
  quanto si aspettano di crescere e se il sistema verrà venduto ad altri.
- **Quando**: dopo N5, prima di aprire il primo blocco.
- **Input**: il database di produzione in sola lettura o la copia completa di test, i log,
  l'albero semantico con le entità.
- **Artefatto**: `docs/VOLUME_SURVEY.md` con ogni numero marcato `[base]` o `[log]` e il suo
  comando, i misuratori nel repository con il loro test, e `docs/SIZING.md` con il "per dieci" e
  le decisioni asimmetriche che conviene prendere prima di evolvere.
- **Cancello**: nessun numero primario senza misuratore; un conto rifatto da te che coincide.
- **Chi decide**: il proprietario, sulla crescita attesa e sulle decisioni asimmetriche.

**Prima di inviare il prompt**, devi avere questo sottomano:

- Accesso in sola lettura al database di produzione (o la copia completa di N4, se
  l'anonimizzazione non ha toccato le date né le quantità) e ai log di accesso o di applicazione,
  con la credenziale fuori dalla chat.
- Le due risposte che solo il business ha, scritte: quanto si aspettano di crescere nei prossimi
  due anni, e se il sistema verrà usato in più di un posto (il "per dieci").
- Un caso noto per il test di ogni misuratore: per esempio, il numero di record di una tabella
  piccola che puoi contare a mano.
- Stato minimo accettabile: l'agente può interrogare il database e tu hai le due risposte.

**Iniziale:**

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
> cheap today and expensive later. Do not change any code.
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
> oggi sono economiche e dopo costose. Non cambiare nessun codice.
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

Cosa gli sto chiedendo: misurare invece di chiedere, che è ciò che il legacy permette e il
progetto nuovo no; il misuratore con test e la verifica nelle due direzioni del gradino 7, perché
i misuratori mentono [Ref. 35](REFERENCIAS.md#ref-35), [Ref. 36](REFERENCIAS.md#ref-36); e il
dimensionamento come cancello prima di evolvere [Ref. 14](REFERENCIAS.md#ref-14): se
l'architettura attuale non regge il "per dieci" e la richiesta del cliente è proprio crescere,
questo si sa adesso e non al terzo blocco.

**Di chiusura:** il prompt di chiusura del gradino 3, scegliendo fra le opzioni che avrà proposto
per ciò che non regge, oppure confermando che l'attuale regge.

Segnale d'allarme: un numero "approssimativo" senza la marca di approssimato. Se è nel database,
si misura; se non c'è, si chiede; non c'è una terza opzione.

---

### N7 — Il backlog di normalizzazione, abbinato alla richiesta del cliente

- **Intenzione**: una sola coda di voci in sospeso, con specifica completa, dove convivono il
  debito (ciò che è uscito dall'audit, le discrepanze, le schermate non operabili, i lucchetti in
  sospeso, le decisioni del dimensionamento) e la richiesta del cliente (ciò che va corretto e ciò
  che va aggiunto), ciascuno con la sua marca di velocità e abbinati per modulo. È il gradino 5
  con due colonne in più.
- **Quando**: alla chiusura del tratto. Dopo, il ciclo.
- **Input**: `docs/AUDIT_[data].md`, `docs/DISCREPANCIES.md` con le decisioni, `docs/LOCKS.md`,
  `docs/SIZING.md`, l'albero semantico, e la richiesta del cliente per questa tappa.
- **Artefatto**: `docs/PENDING.md` con tutte le voci in sospeso specificate, marcate "blocca / si
  paga quando si tocca / può aspettare" e "correttivo / evolutivo / normalizzazione", e
  l'abbinamento per modulo.
- **Cancello**: non resta aperta nessuna voce in sospeso marcata "blocca" prima del primo blocco;
  ogni voce del cliente ha elencate quelle di normalizzazione che entrano con lei.
- **Chi decide**: il proprietario, sull'ordine.

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business insieme a te),
non l'agente:

- La richiesta del cliente per questa tappa, in prosa e con le sue parole, separata in due liste:
  ciò che **oggi non funziona** (ogni cosa con come si riproduce, cosa succede e cosa dovrebbe
  succedere, secondo il business) e ciò che **manca** (il nuovo). Va in
  `docs/blocks/STAGE_01_REQUEST.md` o dove preferisci; il prompt dice "the client's request for
  this stage", quindi digli dov'è. Se il proprietario ha dato delle priorità, anche quelle.
- Tutti gli artefatti da N2 a N6 chiusi: l'albero, l'audit, le discrepanze decise, i lucchetti, il
  dimensionamento. Se ne manca uno, non aprire questo prompt: il backlog uscirà incompleto e non
  saprai cosa gli manca.
- Le voci in sospeso bloccanti che esistono già (da N0, N3 e N4) chiuse o in corso con una data.
- Stato minimo accettabile: la richiesta del cliente è in due liste con le sue parole, e gli
  artefatti delle stazioni precedenti esistono.

**Iniziale:**

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
> normalization.
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
> dato, ciascuna con la sua normalizzazione abbinata.
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

Cosa gli sto chiedendo: il gradino 5 completo (la specifica dettagliata vive in ogni voce in
sospeso, anche in quelle di normalizzazione), con le due marche che fanno questo percorso: la
velocità, che dice quando si paga ogni debito, e il tipo, che dice come si chiude (un correttivo
si chiude con il test che riproduce il guasto; un evolutivo, con quello del gradino 8). E
l'**abbinamento per modulo**, che è la regola "si paga quando si tocca" resa operativa: quando
apro il blocco della "caparra", le voci di normalizzazione del modulo dei pagamenti entrano con
lui, e non prima né dopo.

**Di chiusura:** la routine di ogni sessione del gradino 5, senza modifiche, nel patto di
convivenza.

Verifica di completezza: resta qualche "blocca" aperto? Allora il primo blocco non si apre. Ogni
correttivo dice come si riproduce, con le parole del cliente? Ogni voce del cliente ha la sua
lista di abbinate, anche se vuota? Segnale d'allarme: il backlog ha più di cinquanta voci di
normalizzazione in "può aspettare". Non è debito registrato: è la riscrittura travestita da lista.
Archivia ciò che non si pagherà mai e dillo.

---

## Il ciclo su un sistema ereditato: modalità correttiva e modalità evolutiva

Finito N7, il percorso si ricongiunge con la scala: i gradini dal 5 al 12 si salgono con ogni voce
in sospeso, come nel progetto nuovo, con gli stessi contratti e gli stessi prompt. Ma ci sono due
sfumature che meritano un paragrafo, perché sono quelle che distinguono "toccare un legacy con
metodo" da "toccare un legacy con cautela".

### La modalità correttiva: il rosso è naturale

Una voce in sospeso correttiva è un bug: qualcosa che oggi non funziona e il cliente lo sa. Nel
gradino 8 del progetto nuovo, il rosso si fabbrica (si scrive il test, si esegue contro il codice
vecchio, lo si vede fallire). Nel correttivo il rosso **è il bug stesso**: il test che riproduce
il guasto, operando il flusso dalla schermata come l'utente che l'ha segnalato, deve fallire
contro il codice attuale. Se non fallisce, non hai riprodotto il bug che ti hanno segnalato; ne
hai riprodotto un altro. Quel rosso è la prova che stai sistemando la cosa giusta, e vale più di
qualunque spiegazione dell'agente su "ciò che deve stare succedendo". Il caso dei quattro giri
fino alla causa radice [Ref. 22](REFERENCIAS.md#ref-22) è quello che mi ha insegnato che senza una
riproduzione scritta, ogni giro sistema un sintomo diverso.

**Prima di inviare il prompt**, devi avere questo sottomano:

- La voce in sospeso correttiva in `docs/PENDING.md` (N7), con il modo di riprodurla nelle parole
  del cliente: cosa ha fatto, cosa è successo, cosa si aspettava. Se il cliente non sa riprodurlo,
  procurati prima un caso (un record, una data, uno screenshot); senza riproduzione non c'è test,
  e senza test non c'è chiusura.
- La batteria di caratterizzazione (N4) in verde nell'ambiente di test, con il comando in
  `docs/STATUS.md`.
- Le voci di normalizzazione abbinate a questa, elencate nella voce stessa.
- La tua disponibilità a decidere: se la causa radice risulta essere una regola di business che
  nessuno ha scritto (succede spesso), l'agente si fermerà e chiederà, e qualcuno deve rispondere
  quel giorno.
- Stato minimo accettabile: sai riprodurre il bug a mano nell'ambiente di test.

**Per chiudere una voce in sospeso correttiva:**

> This pending item is a correction: [what fails, in the client's words, and how to reproduce
> it]. Before changing anything: (1) Reproduce the failure with a test that drives the flow from
> the screen and checks the effect in the backend, and show me that it fails against the current
> code; that red is the proof that you reproduced the right defect. If you cannot reproduce it,
> tell me what you tried and what you need; do not fix what you cannot see. (2) Find the root
> cause and tell me in prose, with the evidence, before fixing. If the root cause is a business
> rule nobody wrote down, stop and ask me. (3) Fix at the root, not where it hurts, and nothing
> else: anything else you find goes to a pending item. (4) Show me the test green, the
> characterization suite still green, and the regression of the neighbouring items. (5) If the
> fix changes a current behaviour that someone may depend on, say so explicitly: that is a decision
> for me, not a side effect. Close the paired normalization items of this module in the same
> block, each with its own evidence. The commit message says "proved red against [version]" and
> the test counts.
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
> Questa voce in sospeso è una correzione: [cosa non funziona, nelle parole del cliente, e come
> riprodurlo]. Prima di cambiare qualunque cosa: (1) Riproduci il guasto con un test che operi il
> flusso dalla schermata e verifichi l'effetto nel backend, e mostrami che fallisce contro il
> codice attuale; quel rosso è la prova che hai riprodotto il difetto giusto. Se non riesci a
> riprodurlo, dimmi cosa hai provato e cosa ti serve; non sistemare ciò che non puoi vedere. (2)
> Trova la causa radice e dimmela in prosa, con la prova, prima di sistemare. Se la causa radice è
> una regola di business che nessuno ha scritto, fermati e chiedimelo. (3) Sistema alla radice,
> non dove fa male, e nient'altro: qualunque altra cosa tu trovi va in una voce in sospeso. (4)
> Mostrami il test in verde, la batteria di caratterizzazione ancora in verde, e la regressione
> delle voci vicine. (5) Se la correzione cambia un comportamento attuale da cui qualcuno può
> dipendere, dillo esplicitamente: quella è una decisione mia, non un effetto collaterale. Chiudi
> le voci di normalizzazione abbinate di questo modulo nello stesso blocco, ciascuna con la sua
> prova. Il messaggio del commit dice "provato in rosso contro [versione]" e i numeri dei test.
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

Cosa gli sto chiedendo: la riproduzione **prima** della diagnosi, perché un modello diagnostica
con molta sicurezza ciò che non ha riprodotto; la causa radice in prosa prima di toccare, perché
tu possa fermare una correzione che punta male; la radice e nient'altro, perché in un legacy "già
che ci sono" è il modo più comune di rompere ciò che funzionava; la caratterizzazione in verde
come regressione del sistema intero; e la clausola 5, che trasforma il cambio di comportamento in
una decisione. E l'abbinamento: il debito di questo modulo si paga adesso, con la sua prova, non
"dopo".

### La modalità evolutiva: la caratterizzazione è la regressione

Una voce in sospeso evolutiva è qualcosa di nuovo su qualcosa che esiste. Si apre con il prompt
del gradino 5, si costruisce con il 6 e il 7 tali e quali, e l'unica differenza è cosa significa
"la regressione delle vicine": qui le vicine sono il sistema intero, e la batteria di
caratterizzazione è quella che dice che ciò che funzionava continua a funzionare. Due regole in
più. Prima: quando il blocco entra in un modulo, le voci di normalizzazione marcate "si paga
quando si tocca" di quel modulo entrano con lui, con la loro prova; è la regola delle due
velocità. Seconda: il nuovo nasce già con il metodo completo, cioè con la sua specifica nella voce
in sospeso, il suo test in rosso, la sua prova end to end e il suo lucchetto se agisce sul mondo.
Non si fa al modulo nuovo ciò che il legacy ha fatto a quello vecchio.

### L'eccezione: l'urgenza in produzione

La cintura è un cancello duro, e un cancello duro ha bisogno della sua eccezione scritta, perché
se non la scrivo, l'eccezione se la inventano il giorno in cui qualcosa cade alle undici di sera.
L'eccezione è questa: se la produzione è giù o sta danneggiando dati e la cintura non è ancora
completa, si fa il minimo che fermi il danno, con il ritorno indietro a mano e con il proprietario
avvisato, e **lo stesso giorno** si apre la voce in sospeso correttiva e la si chiude con la
routine completa: il test che la riproduce in rosso, la causa radice, la regressione. Una
correzione d'urgenza che non rientra dal ciclo è debito che si riscuote con gli interessi.

**Prima di inviare il prompt**, devi avere questo sottomano: la conferma che è un'urgenza vera
(produzione giù o che danneggia dati, non "il cliente è nervoso"), il proprietario avvisato, e il
modo di tornare indietro (il backup di N0 o la versione precedente) pronto.

**Per un'urgenza:**

> This is an urgent fix on production: [what is happening]. Do the minimum that stops the damage,
> on a branch, with the rollback ready before you deploy, and tell me exactly what you changed and
> what you did not verify. Do not touch anything else. Then, today, open the corrective pending
> item in `docs/PENDING.md` with what happened, and we close it with the full routine: the test
> that reproduces it in red, the root cause, the fix at the root, the characterization suite and
> the regression green.
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
> Questa è una correzione urgente in produzione: [cosa sta succedendo]. Fai il minimo che fermi il
> danno, su un ramo, con il rollback pronto prima di distribuire, e dimmi esattamente cosa hai
> cambiato e cosa non hai verificato. Non toccare nient'altro. Poi, oggi stesso, apri la voce in
> sospeso correttiva in `docs/PENDING.md` con ciò che è successo, e la chiudiamo con la routine
> completa: il test che la riproduce in rosso, la causa radice, la correzione alla radice, la
> batteria di caratterizzazione e la regressione in verde.
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

Cosa gli sto chiedendo: il minimo, con il ritorno indietro prima e non dopo, e con il rapporto
onesto di ciò che non è stato verificato (gradino 12); e l'obbligo di rientrare dal ciclo lo
stesso giorno, che è ciò che separa un'eccezione da un'abitudine.

## I sei gradini di qualità operativa (16-19, 21 e 22) in un legacy

I gradini 16, 17, 18, 19, 21 e 22 del documento principale (osservabilità e tracciabilità,
persistenza, vulnerabilità, rendimento, e i due monitoraggi) valgono per i due casi d'uso, e in
un legacy hanno una collocazione precisa, perché diversi di essi hanno già metà del lavoro fatto
dal tratto di normalizzazione:

- **16, osservabilità e tracciabilità**: il livello minimo (registri strutturati con livello
  configurabile e un identificatore di correlazione nei flussi critici) entra nella cintura di
  sicurezza (N4), perché senza di esso la batteria di caratterizzazione non dice cosa si è rotto.
  Il livello completo, con l'audit immutabile delle azioni con conseguenza che N5 ha
  inventariato, si sale prima del primo deployment successivo alla normalizzazione.
- **17, persistenza**: le misurazioni sono già fatte in N6. Ciò che ne esce entra nel backlog (N7)
  con la sua marca: ciò che è già fuori dalla tolleranza del business, "blocca" o "adesso"; il
  resto, "si paga al tocco", ed entra con il blocco che tocca quel modulo.
- **18, vulnerabilità**: la prima esecuzione è la dimensione di sicurezza dell'audit di N3, e la
  scansione nella catena fa parte della cintura (N4), perché un legacy ha quasi sempre dipendenze
  vecchie e segreti nella storia. I P0 bloccano; il resto, al backlog.
- **19, rendimento**: si esegue con i volumi misurati in N6, sulla persistenza già corretta in ciò
  che bloccava, prima del primo deployment successivo alla normalizzazione. In un legacy di solito
  scopre che il punto di rottura è più vicino di quanto il business creda.
- **21 e 22, monitoraggio**: si montano con il primo deployment, come nel progetto
  nuovo, con una differenza: la prima lettura del rapporto è la linea base del legacy, e gli
  scostamenti e gli errori che esistevano già il primo giorno diventano voci in sospeso con la
  loro marca di velocità. Nessuno resta come "noto" senza voce in sospeso.

In pratica, i quattro precedenti al deployment sono una tappa in più della normalizzazione, prima
del primo blocco evolutivo o insieme a esso a seconda dell'urgenza della richiesta, e i due
monitoraggi si montano con il deployment.

## Quando il sistema è normalizzato

Mai del tutto, ed è giusto che sia così: il debito marcato "si paga quando si tocca" si paga nel
corso dei mesi, modulo per modulo, e quello marcato "può aspettare" a volte non si paga mai, e
bisogna dirlo. Ciò che invece ha un momento preciso è la **chiusura del tratto**, che è quando si
apre il primo blocco. Questa è la lista:

1. Esistono tutti gli input della tabella degli input recuperati, con le marche di origine, e il
   proprietario ha confermato ogni nodo `[dedotto]` dell'albero (N2).
2. Ogni discrepanza ha una decisione con la data, e quelle che cambiano il sistema hanno una voce
   in sospeso (N2).
3. L'audit esiste e ogni rilievo ha la marca di velocità (N3).
4. La cintura è in verde: ambiente di test con dati anonimizzati che hai aperto tu; deployment
   eseguito due volte; ricerca di segreti vuota e quelli trovati ruotati; integrazione continua in
   verde; batteria di caratterizzazione in verde con il rosso per mutazione dimostrato per ogni
   flusso critico (N4).
5. Ogni azione con conseguenze ha un verdetto, e i lucchetti marcati "adesso" hanno il loro test
   in rosso (N5).
6. I numeri primari sono misurati con misuratore e test, e il "per dieci" è scritto (N6).
7. Non resta aperta nessuna voce in sospeso marcata "blocca", e ogni voce del cliente ha le sue
   abbinate (N7).
8. Il patto di convivenza ha le cinque regole del legacy, e una sessione nuova supera la prova di
   lettura (N1, N2).

Se le otto danno "sì", il sistema è normalizzato fin dove questo percorso lo esige, e ciò che
segue è la scala di sempre. Le fasi 3 e 4 del documento principale (uscita in produzione ed
esercizio) si applicano tali e quali: l'audit periodico, i manuali (che in un legacy di solito non
esistono, e si generano con il gradino 20 a partire dal sistema com'è), l'agente residente, e la
retrospettiva con i numeri, che in un legacy ha una domanda sua: quanto è costato normalizzare, e
quanto del debito che abbiamo marcato "può aspettare" è finito per costare lo stesso.

## Segnali d'allarme del percorso intero

- L'agente propone di riscrivere un modulo "perché così è più facile che capirlo". È la regola 7
  del patto violata; in un legacy, capire è il lavoro.
- Si è cominciato a cambiare funzionalità con la cintura a metà ("la batteria la finiamo dopo").
  Dopo non arriva mai, e la prima modifica senza batteria è quella che rompe ciò che nessuno
  sapeva che esistesse.
- La lista delle discrepanze è stata risolta "sistemando il codice perché faccia ciò che il
  business dice" senza che il proprietario decidesse ciascuna. Alcune di quelle discrepanze sono
  regole che il business ha dimenticato e il codice ricordava.
- Il backlog di normalizzazione cresce più in fretta di quanto si paghi. È marcato male: ci sono
  cose in "si paga quando si tocca" che sono "può aspettare", oppure ci sono moduli che si toccano
  senza pagare il loro debito.
- I numeri del dimensionamento sono usciti da una stima "perché il database è troppo grande per
  contarlo". Un database grande si conta con una query; quello è un misuratore.
- Una correzione d'urgenza non è rientrata dal ciclo. Conta quante ce ne sono state nel mese; se
  sono più di una, la cintura non è un cancello, è decorazione.

## Cosa resta da elaborare `[ipotesi]`

1. I sette prerequisiti di N0 si verificano facendo, e questo li rende calibrabili: ogni legacy
   che passa da N0 lascia la sua scheda con le prove. Ciò che manca è la casistica: quanti legacy
   falliscono ogni prerequisito e quanto costa il progetto precedente che lo porta in verde. Non è
   più un'ipotesi sul criterio; è un conto che ancora non ho.
2. La dimensione della batteria di caratterizzazione: fra quattro e otto flussi è ciò che ha
   funzionato per me in sistemi piccoli; in uno grande non so se il criterio sia per flusso, per
   modulo o per denaro in gioco.
3. Come si distribuisce la normalizzazione in un sistema grande: sospetto che la lettura (N2) si
   faccia intera ma che la cintura (N4) si monti per modulo, man mano che ogni modulo sta per
   essere toccato, e che il cancello duro diventi duro per modulo e non per sistema. Non l'ho
   provato.
4. Cosa succede con un legacy costruito da un modello con il metodo a metà (patto sì, test no): se
   questo percorso si percorre intero o se c'è una scorciatoia. La mia intuizione è che non ci sia
   scorciatoia, e che la scorciatoia sia proprio l'errore, ma è intuizione.
