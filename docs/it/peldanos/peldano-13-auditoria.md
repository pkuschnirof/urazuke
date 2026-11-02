# Passo 13 — L'audit periodico come input del piano (contratto del gradino)

**Fase:** uscita in produzione.
**Quando:** obbligatorio prima del primo deployment in produzione; apre la fase di uscita. Poi, in
esercizio, ogni uno o due mesi secondo il ritmo di cambiamento, e alla chiusura di ogni tappa
grande.
**Forma:** un solo invio lungo, idealmente a un agente diverso da quello che costruisce.
**Dimensione:** obbligatorio prima del primo deployment in produzione, in qualunque progetto; poi,
proporzionale al ritmo di cambiamento (un sistema che cambia tutte le settimane si sottopone ad
audit ogni mese; uno stabile, ogni sei).

## A cosa serve

Guarda il sistema intero con occhi freschi ogni tanto, e converti ciò che vedi in voci in sospeso.
L'audit non è un rapporto che si archivia: è piano. Evita la password scritta nel codice che
nessuno aveva visto, le query che leggono tabelle intere [Ref. 18](../REFERENCIAS.md#ref-18), la
vulnerabilità nota in una dipendenza, il componente di migliaia di righe
[Ref. 41](../REFERENCIAS.md#ref-41). Ed è l'indipendenza del controllo di qualità portata un passo
più in dentro: chi fa l'audit non è chi ha costruito.

Sull'indipendenza: non serve un'altra azienda né un altro strumento. Basta **un'altra sessione,
con un altro file di istruzioni, che non abbia partecipato alla costruzione**. Ciò che cerchi è
che l'auditor non condivida i presupposti del costruttore. Un modello che ha costruito un modulo
"sa" che la password scritta nel codice era provvisoria; un modello che lo vede per la prima volta
la riporta per quello che è. Così sono state rilevate due porte di amministratore che il costruttore
aveva lasciato in un giorno [Ref. 40](../REFERENCIAS.md#ref-40).

Se puoi scegliere, che sia anche **un modello diverso** da quello che ha costruito, non solo
un'altra sessione dello stesso: uno studio del 2026 ha misurato che una sessione pulita con un
modello diverso trova più errori di due sessioni dello stesso modello
([arXiv 2610.01471](https://arxiv.org/abs/2610.01471)). Ma quella preferenza ha un **pavimento di
capacità**, e lo dico perché l'ho misurato: un altro modello trova di più **solo se quel modello
può fare il lavoro**. Sotto una certa capacità la diversità smette di essere un vantaggio e diventa
un costo, perché verificare un rilievo falso costa quasi quanto averlo cercato tu. Quindi l'ordine
è questo: prima, **un altro modello, se è all'altezza del compito**; se non lo è, **un'altra
sessione dello stesso modello, dichiarando lo scostamento** nella riga `Auditor:` del rapporto; e
**mai** un auditor scelto da quale chiave è caricata o da quale tempo scaduto regge. Se l'ha scelto
un limite dello strumento, il rapporto lo dice con quelle parole: è il caso `tool_constraint` della
chiave `auditor_choice`, ed esiste perché la restrizione dello strumento si traveste da scelta
tecnica e l'unica cosa che la mette a nudo è doverla nominare. Che il modello del costruttore sia
l'unico disponibile non è un fallimento del metodo: è uno scostamento dichiarato, e uno
scostamento dichiarato si può sottoporre ad audit. (Decisione D-079, sull'esperimento del
2026-11-02: l'auditor di un altro modello ha consegnato quattro dei nove rilievi che lui stesso
aveva annunciato, e il suo unico P0 era falso per aver letto male una virgola decimale; quello
dello stesso modello, scostandosi dalla preferenza e dichiarandolo nella sua prima riga, ne ha
consegnati diciassette, e nessuno è risultato falso verificandoli uno per uno.)

## 1. Contesto richiesto

Quello che segue è la lista generica. I file concreti che devi avere pronti prima di ogni
prompt, con il loro contenuto e il loro stato minimo, stanno nella sezione 2, nel blocco "Prima di
inviare il prompt" che precede ciascuno.

- Il repository completo, in sola lettura.
- La produzione o l'ambiente di test, in sola lettura (database, log).
- L'audit precedente, se c'è stato, per misurare cosa è cambiato.
- Il perimetro: integrità, sicurezza, prestazioni, qualità del codice, o tutto.
- `docs/PENDING.md` con le voci in sospeso chiuse nell'ultimo ciclo e le loro ricevute, perché
  l'auditor scelga quali riprodurre.
- Il registro della prova dell'ultimo ciclo completo: i commit funzionali, le voci in sospeso
  chiuse con le loro ricevute, e le ricevute con mutazione archiviate. Non è la stessa cosa del
  punto precedente: là l'auditor sceglie due o tre ricevute da riprodurre, e qui deve poter contare
  il registro intero.

## 2. Prompt

**Iniziale (a un agente diverso dal costruttore, se si può):**

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business con te), non
l'agente:

- Una sessione nuova dell'agente, diversa da quella del costruttore: un clone pulito del
  repository in un'altra cartella e, se il tuo strumento lo permette, un file di istruzioni
  diverso che dica solo "sei un auditor; non hai costruito tu questo sistema". Senza questo,
  l'auditor condivide i presupposti del costruttore e li conferma.
- Accesso in sola lettura per quella sessione all'ambiente di test o alla produzione: database,
  log. Credenziali in sola lettura, fuori dal repository, con il nome della variabile detto nella
  chat.
- Il perimetro, deciso da te, per lo spazio [scope]: integrità, sicurezza, prestazioni, qualità
  del codice, o tutto.
- L'audit precedente, se c'è stato (`docs/AUDIT_[data]` della volta scorsa), perché misuri cosa è
  cambiato.
- Chi farà l'audit e perché quello, deciso da te: un altro modello se è all'altezza del compito,
  un'altra sessione dello stesso se non lo è, e mai quello che è rimasto perché era la chiave che
  era caricata o il solo che reggeva il tempo scaduto. Il prompt gli chiede di dichiararlo nel
  rapporto, ma la decisione è tua: se non la prendi, la prende lo strumento.
- Stato minimo accettabile: la sessione dell'auditor non è quella del costruttore, e ha la sola
  lettura.

> Audit this system for [scope]. Read-only: change nothing except writing your report to
> `docs/AUDIT_[date].md`. If auditing some part requires access you lack (the database, the
> log, an environment), tell me and mark that part as not audited; do not pass it as fine. Go
> through all of the code, not a sample. Pick two or three pending items closed in the last cycle
> and reproduce their receipts literally: rerun the exact red-then-green commands they cite
> against the commits they name, and say for each one whether it reproduces or not. A receipt you
> only read is not a receipt you audited. For every finding: where it is (file and line), what
> the risk is, what evidence proves it (the command, the query, the number), and its priority:
> P0 must be fixed now, P1 soon, P2 when possible. Give a grade to every dimension you audited.
> End with the list of P0 findings turned into proposed pending items.
>
> This report carries declarations that a gate reads, each one under its fixed key, so write the
> key in English even when the report is in my language. `auditor_choice`: which case applies and
> who decided it -- `different_model` if you are a model other than the one that built this
> system; `same_model_declared` if you are the same model because no other one was up to the
> task; `tool_constraint` if what chose you was a key that happened to be loaded, a timeout or
> any other limit of the tool, and then say so with those words. In the `Auditor:` line, the
> model that built and the model that audits. `evidence_register_health`: the health of the
> register of the evidence, which is a dimension of this audit and is not optional -- how many
> functional commits carry no receipt of any kind; how many pending items closed as shipped lack
> their receipts, and of those how many have the reason written; and of the receipts that carry
> a mutation, how many can be applied again. Each of those figures measured by a program, with
> the command next to it, and a figure you could not measure declared as not measured and never
> as zero. If the register of the evidence is broken, every other finding in this report rests
> on data nobody can reproduce. `findings_by_destination`: every finding assigned to one
> destination -- `product` if the defect is in the audited system, `method` if it is in the
> method being followed, `tool` if it is in the tool that runs it -- with the register where its
> pending item goes. A finding whose destination nobody assigned leaves this audit open.
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
> Fai l'audit di questo sistema su [perimetro]. Sola lettura: non cambiare nulla tranne scrivere
> il tuo rapporto in `docs/AUDIT_[data].md`. Se fare l'audit di qualche parte richiede un accesso
> che non hai (il database, il log, un ambiente), dimmelo e marca quella parte come non sottoposta
> ad audit; non darla per buona. Percorri tutto il codice, non un campione. Scegli due o tre voci
> in sospeso chiuse nell'ultimo ciclo e riproduci le loro ricevute alla lettera: rilancia i comandi
> esatti di rosso e poi verde che citano, contro i commit che nominano, e dimmi per ciascuna se si
> riproduce o no. Una ricevuta che hai solo letto non è una ricevuta che hai sottoposto ad audit.
> Per ogni rilievo: dove sta (file e riga), qual è il rischio, quale prova lo dimostra (il comando,
> la query, il numero), e la sua priorità: P0 va corretto subito, P1 presto, P2 quando si può. Dai
> un voto a ogni dimensione di cui hai fatto l'audit. Termina con la lista dei rilievi P0 convertiti
> in voci in sospeso proposte.
>
> Questo rapporto porta dichiarazioni che un cancello legge, ognuna sotto la sua chiave fissa,
> quindi scrivi la chiave in inglese anche se il rapporto è nella mia lingua. `auditor_choice`:
> quale caso si applica e chi l'ha deciso —`different_model` se sei un modello diverso da quello
> che ha costruito questo sistema; `same_model_declared` se sei lo stesso modello perché nessun
> altro era all'altezza del compito; `tool_constraint` se ciò che ti ha scelto è stata una chiave
> che era caricata, un tempo scaduto o qualunque altro limite dello strumento, e allora dillo con
> quelle parole. Nella riga `Auditor:`, il modello che ha costruito e il modello che fa l'audit.
> `evidence_register_health`: la salute del registro della prova, che è una dimensione di questo
> audit e non è opzionale —quanti commit funzionali non hanno nessuna ricevuta; quante voci in
> sospeso chiuse come consegnate non hanno le loro ricevute, e di quelle quante hanno il motivo
> scritto; e delle ricevute che portano una mutazione, quante si applicano di nuovo—. Ognuna di
> queste cifre misurata da un programma, con il comando accanto, e una cifra che non hai potuto
> misurare dichiarata come non misurata e mai come zero. Se il registro della prova è rotto, tutti
> gli altri rilievi di questo rapporto si appoggiano su dati che nessuno può riprodurre.
> `findings_by_destination`: ogni rilievo assegnato a una destinazione —`product` se il difetto è
> del sistema sottoposto ad audit, `method` se è del metodo che si sta seguendo, `tool` se è dello
> strumento che lo esegue— con il registro dove va la sua voce in sospeso. Un rilievo la cui
> destinazione nessuno ha assegnato lascia questo audit aperto.
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

Cosa gli sto chiedendo, clausola per clausola: sola lettura (l'auditor non corregge; propone); la
clausola di completezza nella sua forma per l'audit: **ciò che non si è potuto verificare si
dichiara, non si approva per omissione**; tutto il codice e non un campione, perché i rilievi gravi
di solito stanno dove nessuno guarda; **la riproduzione letterale di due o tre ricevute**, perché
l'audit verifichi prove invece di limitarsi a leggerle (è la clausola che chiude il buco di D-033:
un rosso raccontato non è un rosso sottoposto ad audit); ogni rilievo con posizione, rischio, prova
e priorità, perché sia azionabile senza rileggere il rapporto; voti per dimensione, per confrontare
con l'audit precedente; e i P0 già convertiti in voci in sospeso proposte.

E quello che le due decisioni di novembre aggiungono, detto a parte perché entrambe cambiano il
lavoro dell'auditor e non solo la sua stesura: le **tre dichiarazioni con chiave fissa**, perché
"completo" e "sottoposto ad audit" non sono proprietà che si possano leggere da un rapporto scritto
in prosa libera (D-079 e D-080); la **salute del registro della prova** come dimensione
obbligatoria, perché è la sola che sottopone ad audit tutte le altre —se il registro della prova è
rotto, tutti gli altri rilievi del rapporto si appoggiano su dati che nessuno può riprodurre, e
allora il rapporto intero vale meno di quanto dicono i suoi voti—; e la **destinazione di ogni
rilievo**, perché un difetto del metodo annotato nel registro del prodotto è un difetto che
nessuno correggerà mai: il proprietario del prodotto non può correggere il metodo, e chi poteva non
l'ha mai saputo.

**Di chiusura (al costruttore):**

**Prima di inviare il prompt**, devi avere questo a portata di mano:

- `docs/AUDIT_[data].md`, letto da te, e due rilievi a caso verificati con l'auditor (chiedigli il
  comando, la riga; deve poterli mostrare).
- La sessione del costruttore aperta: questo prompt va al costruttore, non all'auditor, con la
  data del file messa nello spazio.
- Stato minimo accettabile: hai letto il rapporto, sai quanti P0 e P1 ci sono, e conterai le voci
  in sospeso che apre.

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.
>
> Open each one in the register of the destination the report assigned to it: the product
> register for `product`, and for `method` and for `tool` the register of the method or the
> register of the tool, never the product's. If a finding arrives with no destination, ask me
> for it before opening anything.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [it]
> Leggi `docs/AUDIT_[data].md`. Apri una voce in sospeso per ogni P0 e P1, citando il rilievo. Se
> non sei d'accordo con qualcuno, dimmelo con la prova contraria; non ignorarlo.
>
> Apri ciascuna nel registro della destinazione che il rapporto le ha assegnato: il registro del
> prodotto per `product`, e per `method` e per `tool` il registro del metodo o quello dello
> strumento, mai quello del prodotto. Se un rilievo arriva senza destinazione, chiedimela prima
> di aprire nulla.
>
> Quando hai bisogno di una decisione da parte mia, chiedila con le quattro parti della UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e in questo ordine: i dati che rendono necessaria la domanda,
> elencati; un paragrafo di non più di cinque righe che li colleghi e lasci vedere
> l'interrogativo; la domanda con le sue possibili risposte numerate; e la tua raccomandazione.
> Dillo alla profondità tecnica che il progetto ha dichiarato in `communication_depth`
> —`beginner`, `decision_maker` o `technical`—; se il progetto non ne ha dichiarata nessuna, usa
> `decision_maker`.

Cosa gli sto chiedendo: che l'audit si converta in voci in sospeso (altrimenti è un rapporto che si
archivia), e che il disaccordo sia esplicito e con prove, non silenzioso.

E, da D-080, che ogni voce in sospeso si apra nel registro della sua destinazione. Il costruttore è
quello che ha le mani nel prodotto, quindi è quello che più facilmente manda tutto al registro del
prodotto; un rilievo che arriva senza destinazione si chiede a te prima di aprire nulla.

## 3. Risultato atteso

- `docs/AUDIT_[data].md` con: perimetro, cosa si è potuto verificare e cosa no (e perché), i
  rilievi con posizione, rischio, prova e priorità, un voto per dimensione, il risultato della
  riproduzione di due o tre ricevute dell'ultimo ciclo, e la lista delle voci in sospeso proposte.
- In `docs/PENDING.md`: una voce in sospeso per ogni P0 e P1, citando il rilievo.
- In quello stesso rapporto, le tre dichiarazioni che un cancello può leggere, ognuna con la sua
  chiave in inglese: `auditor_choice` (quale caso si applica e chi l'ha deciso),
  `evidence_register_health` (le cifre del registro della prova, ognuna con il comando che l'ha
  misurata, e "non misurata" quando non si è potuto misurare) e `findings_by_destination` (ogni
  rilievo con la sua destinazione).
- Nel registro di ogni destinazione: una voce in sospeso per ogni P0 e P1. Quelle del prodotto nel
  registro del prodotto, quelle del metodo in quello del metodo, quelle dello strumento in quello
  dello strumento.

## 4. Verifica di completezza

- Il rapporto dice cosa NON ha potuto verificare? Se dice di aver verificato tutto, diffida.
- Scegli due rilievi: hanno file e riga, e una prova che puoi riprodurre?
- Il rapporto dice quali ricevute ha riprodotto, con il comando e il risultato, o dice solo di
  averle lette?
- Ogni P0 ha la sua voce in sospeso aperta prima di dare l'audit per chiuso?
- I voti per dimensione si potranno confrontare con l'audit precedente?
- Ha fatto l'audit lo stesso agente che ha costruito? Se è così, chiedi un secondo sguardo sui P0.
- Il rapporto dice chi ha fatto l'audit e perché quello? Se la ragione è che era il solo che era
  caricato o il solo che reggeva il tempo scaduto, quello è `tool_constraint` e deve stare scritto
  così.
- Ci sono le cifre della salute del registro della prova, ognuna con il comando che l'ha misurata?
  Una cifra che non si è potuta misurare dice "non misurata"; uno zero che non distingue "non ce
  n'è nessuno" da "non ho potuto guardare" non è una cifra (CQ-19, il denominatore).
- Ogni rilievo ha destinazione, e la sua voce in sospeso è stata aperta nel registro di quella
  destinazione?

## 5. Segnali d'allarme

- L'audit non ha trovato nessun P0. In un sistema di più di tre mesi, non è quasi mai vero; più
  probabile è che il perimetro fosse piccolo o che l'auditor condividesse i presupposti.
- I rilievi non hanno la riga del file. Sono opinioni, non rilievi.
- Il rapporto dice che le ricevute "sono state riviste" senza mostrare il comando eseguito né il
  suo output. Una ricevuta letta e una riprodotta non sono la stessa cosa, e solo la seconda chiude
  l'obiezione di D-033.
- Sono passate due settimane e i P0 sono ancora senza voce in sospeso. L'audit è stato archiviato.
- Il rapporto elogia l'indipendenza dell'auditor e non dice quale caso di `auditor_choice` si
  applica. Quando l'auditor l'ha scelto lo strumento e non tu, è proprio il caso che nessuno
  scrive da solo.
- La salute del registro della prova torna a zero e senza comando. Uno zero senza il comando che
  l'ha prodotto è un "non ho potuto guardare" travestito da buona notizia.
- Tutti i rilievi sono usciti con destinazione `product`. In un controllo che guarda il sistema con
  il metodo e lo strumento in uso, che nessuno sia del metodo né dello strumento è improbabile: più
  probabile è che nessuno si sia chiesto la destinazione.
