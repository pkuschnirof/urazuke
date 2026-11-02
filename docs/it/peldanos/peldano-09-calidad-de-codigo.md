# Passo 9 — Qualità del codice verificata dalla macchina, con cancello (contratto del gradino)

**Fase:** ciclo.
**Quando:** si monta una volta, all'apertura del primo blocco funzionale (appena finisce l'avvio),
e da allora gira da solo a ogni commit, come cancello dell'integrazione continua; ogni voce in
sospeso si chiude con la qualità in verde, dopo il test in rosso (8) e prima del caso di prova
manuale (10). Alla chiusura di ogni blocco e prima di ogni deployment, il rapporto di qualità si
legge con il proprietario. In un legacy, la prima esecuzione è la linea base e i rilievi entrano
nel backlog con la loro marca di velocità.
**Forma:** un solo invio per montarlo; poi, routine di ogni modifica e lettura per blocco.
**Dimensione:** obbligatorio nel suo livello minimo in ogni progetto (un linter e un limite di
dimensione nella catena); completo, test di mutazione inclusi, in qualunque progetto con utenti. I
test di mutazione restano un rinforzo opzionale solo senza utenti reali (uno strumento interno, un
prototipo che nessun altro esegue).

## A cosa serve

Il proprietario non legge il codice, e quello è il punto del metodo. Ma il codice esiste, lo
manterrà qualcuno (il prossimo agente, il prossimo sviluppatore), e un codice che oggi funziona e
domani è illeggibile è debito che si paga al terzo mese. Se nessuno lo legge, **lo deve guardare
una macchina**: strumenti che, a ogni commit, misurano ciò che guarderebbe un revisore umano e lo
convertono in un numero con un limite. Io l'ho fatto in tutti i miei progetti, senza chiamarlo
gradino, e un audit di qualità mi ha restituito un componente di più di duemila righe e un file di
progetto di quasi diecimila [Ref. 41](../REFERENCIAS.md#ref-41): nessuno dei due avrebbe superato
un limite di dimensione scritto. Il cricchetto statico, che impedisce a un numero di qualità di
peggiorare [Ref. 35](../REFERENCIAS.md#ref-35), è la forma che do a questo gradino.

Ciò che si misura a macchina, in ordine di importanza: che il codice rispetti uno stile unico (il
*linter* e il *formattatore*); che nessuna funzione e nessun file superi una dimensione; che la
*complessità* di ogni funzione resti sotto un limite; che non ci sia codice duplicato né codice
morto; che le dipendenze siano dichiarate e usate; che la *copertura* dei test non scenda mai (il
cricchetto); e, se il linguaggio lo permette, che i tipi tornino. Niente di tutto questo sostituisce
il test in rosso: un codice impeccabile può essere sbagliato. Ciò che evita è il codice corretto
che nessuno può più toccare.

E ciò che smetto di trattare come rinforzo opzionale in qualunque progetto con utenti: i **test di
mutazione**. Li avevo lasciati come "opzionali, raccomandati" in una versione precedente di questo
documento, e una valutazione esterna del metodo mi ha fatto notare la contraddizione: se la Parte F
dice che la mutazione è, per quanto ne so, l'unica misura che negli studi del 2026 ha distinto i
test che provano da quelli che decorano, non ha senso lasciarla fuori dal "completo" proprio nei
progetti dove un test decorativo in più fa danno a qualcuno. Uno strumento pianta errori di
proposito nel codice (cambia un "maggiore" in
"maggiore o uguale", cancella una riga, inverte una condizione) ed esegue i test; ogni errore che
i test non catturano è un *mutante che sopravvive*, e la proporzione di quelli catturati è il
punteggio. È la misura che completa il rosso dimostrato del gradino 8: il rosso prova che un test
sorveglia la modifica di oggi; la mutazione misura quanto sorveglia la batteria intera. Ed è, per
quanto ne so, l'unica che negli studi del 2026 ha distinto i test che provano da quelli che
decorano (Parte F del documento principale).

**Se sei alle prime armi.** Un *linter* è un programma che legge il codice e segnala ciò che è
scritto male o è pericoloso (una variabile che non si usa, un confronto che dà sempre lo stesso
risultato), come il correttore ortografico di un elaboratore di testi. Un *formattatore* lo
sistema con uno stile unico (rientri, spazi) perché tutto il codice sembri scritto dalla stessa
mano. La *complessità* di una funzione è quanti percorsi diversi può prendere (ogni "se" la
aumenta); una funzione con quaranta percorsi non la capisce nessuno. *Codice duplicato* è lo
stesso blocco copiato in due posti: il giorno in cui se ne sistema uno, l'altro resta sbagliato.
La *copertura* è quale percentuale del codice viene eseguita da qualche test. E un *cricchetto* è
un meccanismo che lascia solo migliorare: il numero di oggi è il pavimento di domani. I *test di
mutazione* sono un programma che rompe il codice di proposito, una piccola modifica alla volta, e
guarda se qualche test se ne accorge; se nessuno se ne accorge, quel pezzo di codice non è
sorvegliato.

**E una colonna che mancava, che entra con D-084: il documento di conformità dice chi ha verificato
ogni criterio.** `docs/CODE_QUALITY.md` e `docs/USABILITY.md` riferiscono risultato per risultato
dall'ancora 3, e fino al 2026-11-02 non dicevano **chi lo ha detto**, così un criterio che verifica
un programma e un criterio che giudica una persona si leggevano uguale. Non è un'ipotesi: nel ciclo
che ho misurato, un documento di conformità ha dovuto correggersi e **sei** criteri sono passati da
«verificato» a «non verificabile», rimanendone uno solo verificato, perché il verificatore degli
altri era una persona che non ha mai eseguito i casi. L'agente non ha mentito: il documento non
aveva dove dire di chi era il criterio.

Quello che entra è la dichiarazione con il suo denominatore, che è lo stesso pezzo che `CQ-19.1`
chiede a qualsiasi strumento: `criteria_total` —quante regole del catalogo si applicano al progetto,
contando quelle che nessuno ha verificato—, `criteria_verified_by_a_program`,
`criteria_verified_by_a_person` —firmate, con nome e data— e `verification_debt`. E, criterio per
criterio, `verified_by` con lo **strumento che il catalogo già dichiara** per quella regola: non lo
sceglie l'agente, esce dal dato, che da quando esiste dice che un `manual_case` lo giudica una
persona e restituisce «passato o fallito, con un nome e una data». La regola che questo lascia: un
criterio il cui strumento è `manual_case` e che non ha firma si scrive `not_verifiable` e mai come
compiuto. Un criterio che deve giudicare una persona e che nessuno ha giudicato non è un criterio in
regola: è un criterio che aspetta la sua persona, e deve leggersi così.

## 1. Contesto richiesto

Quello che segue è la lista generica. I file concreti che devi avere pronti prima di ogni prompt,
con il loro contenuto e il loro stato minimo, stanno nella sezione 2, nel blocco "Prima di
inviare il prompt" che precede ciascuno.

- L'integrazione continua che gira a ogni push (gradino 4).
- Il primo blocco funzionale aperto, con almeno una voce in sospeso costruita: senza codice non
  c'è qualità da misurare.
- La tua decisione sui limiti, o la disponibilità ad accettare quelli che l'agente propone, con la
  loro ragione.
- L'audit precedente (13, o N3 in un legacy), se c'è stato.

## 2. Prompt

**Iniziale (montare il cancello):**

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business con te), non
l'agente:

- L'integrazione continua che gira a ogni push (gradino 4), e quanta quota ti resta: le verifiche
  di qualità aggiungono minuti.
- Almeno una voce in sospeso del primo blocco costruita e chiusa con il gradino 8, perché ci sia
  codice reale da misurare e non lo scheletro vuoto.
- La tua decisione su due limiti, scritta in una riga: la dimensione massima di un file e di una
  funzione (per cominciare, trecento righe e quaranta), e se la copertura può solo salire. Il
  resto lo propone l'agente e tu lo approvi.
- In un legacy: `docs/AUDIT_[data].md` (N3), perché l'agente non riporti ciò che è noto e la prima
  esecuzione sia la linea base.
- Stato minimo accettabile: la catena gira, c'è il codice di una voce in sospeso chiusa, e hai
  scritto i due limiti.

> We are going to make the code quality verified by machine, because nobody is going to read the
> code. Set up, in continuous integration, on every push: (1) a linter and a formatter with one
> configuration for the whole repository, failing the build on any violation; (2) limits on the
> size of every file and every function ([file lines] and [function lines]) and on the complexity
> of every function, failing the build when exceeded; (3) detection of duplicated code and of dead
> code (unused functions, variables, imports, dependencies); (4) a test coverage report with a
> ratchet: the measured coverage of today becomes the floor, and the build fails if it drops; (5)
> type checking if the language allows it. Run all of it now on the current code and write
> `docs/CODE_QUALITY.md` with: the tools, the configuration, every limit with its current measured
> value, and the list of what fails today with where it is. Do not fix anything yet: what fails
> today becomes pending items, and I decide which limits apply now and which are raised with a
> date. Make the whole set a gate in `docs/GATES.md`: nothing is merged with quality red.
>
> Extend this gate to the screen frontier, as Annex H section 4 declares: no
> business rule inside a screen, one typed client for every server call, one
> home for shared state, no user-visible string outside the translation
> catalogue, a stable identifier and role on every interactive element,
> styling only through tokens, and automatic basic accessibility checks.
> Every rule carries its stable id, its severity and its named verifier; the
> thresholds and the exceptions are declared by me in the project
> configuration file, and a rule switched off with no written exception is a
> failure of the gate, not a decision. `docs/CODE_QUALITY.md` and
> `docs/USABILITY.md` report result by result, never as a single number. The
> catalogue is `docs/ANEXO_HEURISTICAS.md`: cite it, do not copy it.
>
> And the compliance documents say who verified, which is not the same thing as what was verified.
> `docs/CODE_QUALITY.md` and `docs/USABILITY.md` carry at their head four declarations, each one under
> its fixed key in English even when the file is in my language: `criteria_total`, how many rules of
> the catalogue apply to this project, counting the ones nobody has verified yet;
> `criteria_verified_by_a_program`, how many of those a program verified, with the command next to the
> figure; `criteria_verified_by_a_person`, how many a person signed, with a name and a date; and
> `verification_debt`, `none` when every criterion has its verifier, or `pending_verifier` and then the
> criteria nobody has verified yet, with who owes each verification and since when. Then, criterion by
> criterion, `verified_by` with the instrument the catalogue declares for that rule -- `auto_gate`,
> `matrix_query`, `e2e_per_profile` or `manual_case` -- read from the data and never chosen by you. And
> the rule this exists for: a criterion whose instrument is `manual_case` and carries no signature is
> written `not_verifiable`, never as met. A criterion a person has to judge and nobody judged is not a
> criterion in good standing: it is a criterion waiting for its person, and it has to read that way.
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
> Faremo in modo che la qualità del codice si verifichi a macchina, perché nessuno leggerà il
> codice. Monta, nell'integrazione continua, a ogni push: (1) un linter e un formattatore con una
> sola configurazione per tutto il repository, che facciano fallire la costruzione davanti a
> qualunque violazione; (2) limiti alla dimensione di ogni file e di ogni funzione ([righe per
> file] e [righe per funzione]) e alla complessità di ogni funzione, che facciano fallire la
> costruzione quando vengono superati; (3) rilevamento di codice duplicato e di codice morto
> (funzioni, variabili, importazioni e dipendenze senza uso); (4) un rapporto di copertura dei test
> con cricchetto: la copertura misurata oggi diventa il pavimento, e la costruzione fallisce se
> scende; (5) verifica dei tipi se il linguaggio lo permette. Esegui tutto adesso sul codice
> attuale e scrivi `docs/CODE_QUALITY.md` con: gli strumenti, la configurazione, ogni limite con il
> suo valore misurato attuale, e la lista di ciò che oggi fallisce con dove si trova. Non
> sistemare ancora niente: ciò che oggi fallisce diventa voci in sospeso, e decido io quali limiti
> valgono subito e quali si alzano con una data. Fa' dell'insieme un cancello in `docs/GATES.md`:
> niente viene unito con la qualità in rosso.
>
> Estendi questo cancello al confine della schermata, come dichiara la
> sezione 4 dell'Allegato H: nessuna regola di business dentro una
> schermata, un solo client tipizzato per ogni chiamata al server, un solo
> posto per lo stato condiviso, nessun testo visibile fuori dal catalogo
> delle traduzioni, identificatore e ruolo stabili su ogni elemento
> interattivo, stili solo tramite token e controlli automatici di
> accessibilità di base. Ogni regola porta il suo identificatore stabile, la
> sua severità e il suo verificatore con nome; le soglie e le eccezioni le
> dichiaro io nel file di configurazione del progetto, e una regola spenta
> senza eccezione scritta è un guasto del cancello, non una decisione.
> `docs/CODE_QUALITY.md` e `docs/USABILITY.md` rendicontano risultato per
> risultato, mai come un unico numero. Il catalogo è
> `docs/ANEXO_HEURISTICAS.md`: citalo, non copiarlo.
>
> E i documenti di conformità dicono chi ha verificato, che non è la stessa cosa di che cosa si è
> verificato. `docs/CODE_QUALITY.md` e `docs/USABILITY.md` portano in testa quattro dichiarazioni,
> ognuna sotto la sua chiave fissa in inglese anche se il file è nella mia lingua: `criteria_total`,
> quante regole del catalogo si applicano a questo progetto, contando quelle che nessuno ha ancora
> verificato; `criteria_verified_by_a_program`, quante di quelle ha verificato un programma, con il
> comando accanto alla cifra; `criteria_verified_by_a_person`, quante ne ha firmate una persona, con
> nome e data; e `verification_debt`, `none` quando ogni criterio ha il suo verificatore, o
> `pending_verifier` e allora i criteri che nessuno ha ancora verificato, con chi deve ogni verifica e
> da quando. Poi, criterio per criterio, `verified_by` con lo strumento che il catalogo dichiara per
> quella regola —`auto_gate`, `matrix_query`, `e2e_per_profile` o `manual_case`—, letto dal dato e mai
> scelto da te. E la regola per cui questo esiste: un criterio il cui strumento è `manual_case` e che
> non porta firma si scrive `not_verifiable`, mai come compiuto. Un criterio che deve giudicare una
> persona e che nessuno ha giudicato non è un criterio in regola: è un criterio che aspetta la sua
> persona, e deve leggersi così.
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

Cosa gli sto chiedendo: le cinque verifiche che farebbe un revisore umano, fatte a macchina e con
la costruzione in rosso come conseguenza, perché una verifica che non blocca è un consiglio; i
limiti con il loro valore misurato, perché il limite esca dal numero e non da un'opinione; il
cricchetto di copertura, che è il pezzo che fa sì che la qualità non si degradi da sola; e **non
sistemare ancora niente**, perché in un sistema con codice già scritto la prima esecuzione dà
sempre rosso e la decisione su cosa si sistema adesso e cosa si tollera con una data è mia.

**Routine (va nel patto di convivenza):**

**Prima di inviare il prompt**, devi avere questo sottomano:

- `docs/CODE_QUALITY.md` letto da te: capisci ogni limite e perché c'è?
- La tua decisione sulla lista di ciò che oggi fallisce: cosa si sistema adesso (una voce in
  sospeso per ciascuno) e cosa si tollera con una data, scritta nello stesso file.
- `docs/WORKING_AGREEMENT.md`, dove va la routine.
- Stato minimo accettabile: il cancello è in verde oppure ogni rosso ha la sua voce in sospeso o
  la sua data.

> Every pending item is closed with the quality gate green: linter, formatter, size and
> complexity limits, no new duplication, no dead code, coverage at or above the ratchet. A quality
> failure is fixed in the same commit, never silenced with an exception, and a limit is never
> raised to pass; if a limit must change, say so with the reason and I decide. At the close of
> every block, show me `docs/CODE_QUALITY.md` with the numbers of the block against the previous
> one.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [it]
> Ogni voce in sospeso si chiude con il cancello di qualità in verde: linter, formattatore, limiti
> di dimensione e complessità, senza duplicazione nuova, senza codice morto, copertura uguale o
> maggiore del cricchetto. Un fallimento di qualità si sistema nello stesso commit, non si zittisce
> mai con un'eccezione, e un limite non si alza mai per passare; se un limite deve cambiare, dillo
> con la ragione e decido io. Alla chiusura di ogni blocco, mostrami `docs/CODE_QUALITY.md` con i
> numeri del blocco contro quelli del precedente.
>
> Quando hai bisogno di una decisione da parte mia, chiedila con le quattro parti della UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e in questo ordine: i dati che rendono necessaria la domanda,
> elencati; un paragrafo di non più di cinque righe che li colleghi e lasci vedere
> l'interrogativo; la domanda con le sue possibili risposte numerate; e la tua raccomandazione.
> Dillo alla profondità tecnica che il progetto ha dichiarato in `communication_depth`
> —`beginner`, `decision_maker` o `technical`—; se il progetto non ne ha dichiarata nessuna, usa
> `decision_maker`.

Cosa gli sto chiedendo: che la qualità sia parte della chiusura di ogni voce in sospeso e non un
compito a parte; il divieto di zittire (un modello davanti a un linter in rosso tende ad aggiungere
l'eccezione invece di sistemare, perché è più veloce) e di alzare il limite; e la lettura per
blocco, che è l'unico momento in cui i numeri li guardi tu.

**Obbligatorio in qualunque progetto con utenti (opzionale solo senza utenti reali): test di
mutazione.**

**Prima di inviare il prompt**, devi avere questo sottomano:

- Il cancello di qualità montato e in verde, con la copertura misurata in `docs/CODE_QUALITY.md`.
- Almeno un blocco funzionale chiuso con il gradino 8, perché ci siano test da mutare.
- La tua decisione sulla portata, scritta in una riga: tutto il codice (caro, e ha senso solo una
  volta, come linea base) o solo le righe cambiate da ogni voce in sospeso (il normale).
- Stato minimo accettabile: c'è una copertura misurata e c'è un blocco chiuso.

> Add mutation testing to the quality gate, [on the whole codebase | only on the lines changed by
> each pending item]: a tool that plants small deliberate bugs in the code (a flipped condition, a
> deleted line, a changed operator) and runs the tests. Run it now and write in
> `docs/CODE_QUALITY.md`: the tool, the scope, the number of mutants planted, how many the tests
> killed, how many survived and where. Do not fix anything yet: every surviving mutant in code
> that matters becomes a pending item for a test that catches it, and I decide which ones matter.
> From now on, report the mutation score at the close of every block next to the coverage, and
> treat a drop as a quality failure.
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
> Aggiungi i test di mutazione al cancello di qualità, [su tutto il codice | solo sulle righe
> cambiate da ogni voce in sospeso]: uno strumento che pianta piccoli errori di proposito nel
> codice (una condizione invertita, una riga cancellata, un operatore cambiato) ed esegue i test.
> Eseguilo adesso e scrivi in `docs/CODE_QUALITY.md`: lo strumento, la portata, il numero di
> mutanti piantati, quanti ne hanno uccisi i test, quanti sono sopravvissuti e dove. Non sistemare
> ancora niente: ogni mutante che sopravvive in codice che conta diventa una voce in sospeso per un
> test che lo catturi, e decido io quali contano. D'ora in poi, riporta il punteggio di mutazione
> alla chiusura di ogni blocco accanto alla copertura, e tratta un calo come un fallimento di
> qualità.
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

Cosa gli sto chiedendo: la misura che la copertura non dà (la copertura dice quale codice è stato
eseguito; la mutazione dice quale codice è sorvegliato); la portata limitata alle righe cambiate,
che è ciò che rende il costo pagabile a ogni voce in sospeso; **non sistemare ancora niente**,
perché decidere quale mutante conta spetta a me; e il punteggio alla chiusura di ogni blocco,
accanto alla copertura, con un calo trattato come rosso.

## 3. Risultato atteso

- Il linter, il formattatore, i limiti, il rilevamento di duplicazione e codice morto, la
  copertura con cricchetto e i tipi, che girano a ogni push e vanno in rosso quando serve.
- `docs/CODE_QUALITY.md` con strumenti, configurazione, limiti con valore misurato, e la lista di
  ciò che fallisce con la sua voce in sospeso o la sua data.
- Il cancello in `docs/GATES.md` e la routine nel patto.
- In qualunque progetto con utenti: il punteggio di mutazione in `docs/CODE_QUALITY.md`, per
  blocco, accanto alla copertura, e una voce in sospeso per ogni mutante che sopravvive in codice
  che conta.

- In testa a `docs/CODE_QUALITY.md` e a `docs/USABILITY.md`: `criteria_total`,
  `criteria_verified_by_a_program`, `criteria_verified_by_a_person` e `verification_debt`; e,
  criterio per criterio, `verified_by` con lo strumento che il catalogo dichiara per quella regola.

## 4. Verifica di completezza (la fai tu, senza leggere codice)

- Chiedigli il link all'ultima esecuzione della catena: la qualità è in verde?
- Chiedigli di inserire apposta, in un ramo, una funzione di cento righe e una variabile senza
  uso: la catena va in rosso per entrambe le cose?
- La copertura di oggi è maggiore o uguale a quella della chiusura del blocco precedente? Chiedi i
  due numeri.
- C'è qualche eccezione al linter nel codice? Chiedigli la lista; ciascuna deve avere la sua
  ragione scritta.
- È salito qualche limite dalla prima esecuzione? Con quale ragione e chi l'ha deciso?
- Se il progetto ha utenti reali: i test di mutazione stanno girando? Se no, quale ragione scritta
  giustifica non averli?
- Se ci sono test di mutazione: quanti mutanti sono sopravvissuti nell'ultimo blocco, e ciascuno
  ha la sua voce in sospeso o la sua ragione scritta?
- Ogni strumento della catena viene con la sua ricevuta: quanti elementi si aspettava di percorrere
  accanto a quanti ne ha percorsi, da che cosa dipende, e che cosa informa quando non ha potuto
  guardare? Chiedi una corsa in cui lo strumento non ha potuto guardare: se quel risultato si legge
  come il verde, CQ-19 non è adempiuta, qualunque cosa dica la percentuale.

- Prendi un criterio che si legge come compiuto e chiedi chi lo ha detto: se il suo strumento è
  `manual_case`, ci devono essere un nome e una data. Se non ci sono, quel criterio non è compiuto:
  sta aspettando la sua persona, e il documento deve dire `not_verifiable`.
- `criteria_total` conta anche le regole che nessuno ha ancora guardato? Un totale uguale alla somma
  di quello che è stato verificato è il denominatore sistemato che `CQ-19.1` proibisce.

## 5. Segnali d'allarme

- La qualità è passata in verde al primo colpo su codice già scritto. Non è quasi mai vero: i
  limiti sono troppo larghi.
- L'agente propone di "disattivare questa regola perché è troppo severa". A volte ha ragione;
  sempre deve passare da te con la ragione scritta.
- La copertura sale perché sono stati aggiunti test che non provano niente (il verde che nasconde
  un bug, gradino 8). Il cricchetto misura la quantità; il rosso dimostrato misura la qualità.
  Vanno insieme.
- Un file è cresciuto fino al limite ed è stato spezzato in due file con lo stesso contenuto. È la
  duplicazione travestita da adempimento.
- La copertura è alta e il punteggio di mutazione è basso. Sono test che eseguono il codice senza
  verificare niente: il caso esatto che il rosso dimostrato del gradino 8 cerca di evitare.
- Il progetto ha utenti reali e nessuno ha eseguito i test di mutazione né ha scritto perché no.
  "È opzionale" ha smesso di essere una ragione valida per un progetto con utenti.
- Il documento di conformità ha tutti i suoi criteri come compiuti e nessuna firma. La cosa più
  probabile non è che il sistema sia impeccabile: è che si è contato come verificato quello che
  nessuno ha verificato. Chiedi i nomi e le date, criterio per criterio.
