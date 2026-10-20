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
> date. Make the whole set a gate in `docs/GATES.md`: nothing is merged with quality red. Reply in
> my language.

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
> niente viene unito con la qualità in rosso. Rispondi nella mia lingua.

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

> [it]
> Ogni voce in sospeso si chiude con il cancello di qualità in verde: linter, formattatore, limiti
> di dimensione e complessità, senza duplicazione nuova, senza codice morto, copertura uguale o
> maggiore del cricchetto. Un fallimento di qualità si sistema nello stesso commit, non si zittisce
> mai con un'eccezione, e un limite non si alza mai per passare; se un limite deve cambiare, dillo
> con la ragione e decido io. Alla chiusura di ogni blocco, mostrami `docs/CODE_QUALITY.md` con i
> numeri del blocco contro quelli del precedente.

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
> treat a drop as a quality failure. Reply in my language.

> [it]
> Aggiungi i test di mutazione al cancello di qualità, [su tutto il codice | solo sulle righe
> cambiate da ogni voce in sospeso]: uno strumento che pianta piccoli errori di proposito nel
> codice (una condizione invertita, una riga cancellata, un operatore cambiato) ed esegue i test.
> Eseguilo adesso e scrivi in `docs/CODE_QUALITY.md`: lo strumento, la portata, il numero di
> mutanti piantati, quanti ne hanno uccisi i test, quanti sono sopravvissuti e dove. Non sistemare
> ancora niente: ogni mutante che sopravvive in codice che conta diventa una voce in sospeso per un
> test che lo catturi, e decido io quali contano. D'ora in poi, riporta il punteggio di mutazione
> alla chiusura di ogni blocco accanto alla copertura, e tratta un calo come un fallimento di
> qualità. Rispondi nella mia lingua.

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
