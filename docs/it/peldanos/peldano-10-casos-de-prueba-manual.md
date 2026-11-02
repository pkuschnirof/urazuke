# Passo 10 — I casi di prova manuale si scrivono insieme alla funzionalità, e li eseguono le persone (contratto del gradino)

**Fase:** ciclo.
**Quando:** con ogni voce in sospeso, alla sua chiusura, dopo il test in rosso (8) e la qualità
(9): l'agente scrive i casi di prova manuale del flusso che ha toccato. Si eseguono da parte di
persone in tre momenti: alla chiusura di ogni blocco (le prove umane), prima del primo deployment
in produzione (le prove di accettazione con il proprietario), e dopo ogni deployment, in una
passata di sola lettura. Ogni esecuzione che fallisce reimmette un requisito nel ciclo come voce
in sospeso correttiva.
**Forma:** routine di ogni voce in sospeso; poi, esecuzione umana per ciclo.
**Dimensione:** obbligatorio in ogni progetto con utenti: il caso di prova manuale è l'unica prova
che il modello non scrive né esegue.

## A cosa serve

Il metodo ha prove automatiche in abbondanza: il test in rosso, la regressione, l'end to end in
tre scale. Le scrive e le esegue tutte il modello, e tutte provano ciò che il modello ha capito.
Manca la prova che fa una persona con i propri occhi e le proprie mani, seguendo un copione
scritto, e che trova ciò che nessun test trova: il pulsante che sta dove non deve, il messaggio
che non si capisce, il flusso che tecnicamente va e umanamente non serve. La vista umana e le
prove umane erano già nella linea del tempo; ciò che mancava era che avessero un **copione**, e
che il copione lo scrivesse lo stesso che ha costruito la funzionalità, nello stesso momento, a
partire dai criteri di accettazione della voce in sospeso. Senza copione, la prova umana è "gioca
un po' con il sistema", e ciò che si trova dipende dall'umore del giorno. Con copione, si esegue
uguale ogni volta, si registra cosa è successo, e ciò che fallisce torna nel ciclo come requisito.
È la chiusura del circuito che il grafico del processo mostra: l'esecuzione manuale dei casi di
prova reimmette requisiti nello sviluppo.

Un caso di prova manuale ha sempre la stessa forma: un identificatore; la voce in sospeso che lo
origina; la precondizione (cosa deve esistere prima: un paziente, un appuntamento di ieri); i
passi, numerati, ciascuno con ciò che la persona fa e ciò che deve vedere; il risultato atteso
alla fine, incluso l'effetto nel backend che una persona può verificare (un record che compare, un
messaggio nella casella finta); i dati di prova da usare; e lo spazio per il risultato di ogni
esecuzione: data, chi, passato o fallito, osservazione.

**Se sei alle prime armi.** Un *caso di prova manuale* è una ricetta perché una persona provi una
funzionalità: cosa preparare, cosa fare passo per passo, e cosa deve succedere a ogni passo. Si
scrive perché chiunque la segua allo stesso modo, senza sapere com'è fatto il sistema. *Eseguire*
un caso è seguire la ricetta e annotare se è passato o fallito. *Precondizione* è ciò che deve
esistere prima di cominciare. E *reimmettere* vuol dire che ciò che la persona ha trovato sbagliato
torna nella lista delle voci in sospeso come una richiesta nuova, con le sue parole.

Due cose in più sono entrate con D-082, e sono due e non una. La prima: **la persona esegue per
accettare e l'agente percorre per trovare difetti**, e il metodo chiede le due. La percorrenza
agentica —che l'agente apra ogni schermo, guardi quello che c'è sopra, lo usi e segua il flusso da
uno al successivo, come farebbe una persona— non sostituisce l'esecuzione umana e non è nemmeno la
prova da un capo all'altro del gradino 8: quella da capo a capo percorre un cammino che qualcuno ha
scelto, e la percorrenza cerca quello che nessuno ha pensato di provare. La chiedo perché l'ho
misurata: di tutto quello che un agente ha fatto in un ciclo completo, la percorrenza è stata
**quello che ha trovato più difetti di interfaccia**, e il metodo non la chiedeva; se la chiedeva
l'agente a se stesso. Va in `docs/SCREEN_WALKTHROUGH.md`, con il suo denominatore: quanti schermi
ha il sistema, quanti ne ha percorsi e quanti difetti ha trovato. Uno schermo in cui non è potuto
entrare si conta nel totale e si nomina con la sua ragione; tirarlo fuori dal denominatore perché il
numero venga bello è esattamente quello che proibisce `CQ-19.1` dell'Allegato H.

E la seconda, che è il limite di questo gradino detto in faccia: **scrivere i casi e che una persona
li esegua sono due stati distinti, e il secondo il metodo non lo può obbligare.** Nessun programma
può verificare che una persona ha seguito un copione con le sue mani, e un cancello che lo esigesse
si potrebbe soddisfare solo mentendo. Allora il gradino esige quello che si può verificare —la
dichiarazione— e il debito resta in vista: `cases_written`, `cases_executed_by_a_person` e
`execution_debt` in testa a `docs/MANUAL_TESTS.md`, e la seconda cifra la muove un'esecuzione
firmata e mai la lettura dell'agente. La dichiarazione **non aggiunge un cancello nuovo**: quello che il
gradino esige in più è che il debito sia scritto, non che la cifra sia maggiore di zero, perché
obbligare una persona è quello che il metodo non può fare. Quello che **ferma**, e c'era già
dall'ancora 4 dell'Allegato H, è che un caso che nessuno ha corso per profilo non è un caso
eseguito: l'ho misurato il 2026-11-02 con il valutatore reale e un'installazione che implementa
quell'ancora va in rosso dicendo che il registro dei casi firmati è vuoto. Quindi quello che mancava
non era un blocco: era che il debito fosse **leggibile** —la sua cifra e il nome di chi lo deve— al
posto di un registro vuoto che dice «nessuno ha firmato» senza dire chi doveva firmare né da quando.
E conviene sapere, per leggere questo gradino, da dove è uscita la misura che l'ha aperto: il
progetto che è avanzato con la tabella vuota correva il **congelato** dello schema 1, dove l'unico
controllo del gradino 10 è che il file esista. L'ho misurato il 2026-11-02 in un progetto reale: i tredici casi
scritti, la tabella di esecuzioni vuota, il gradino in verde, e un documento di conformità che
affermava sei criteri come verificati il cui verificatore era una persona che non li ha mai
eseguiti. L'agente aveva fatto esattamente quello che il gradino diceva. Il buco era del gradino.

## 1. Contesto richiesto

Quello che segue è la lista generica. I file concreti che devi avere pronti prima di ogni prompt,
con il loro contenuto e il loro stato minimo, stanno nella sezione 2, nel blocco "Prima di
inviare il prompt" che precede ciascuno.

- La voce in sospeso che si sta chiudendo, con i suoi criteri di accettazione "dato, quando,
  allora" (gradino 5): sono la materia prima del caso.
- L'ambiente di test con i dati, perché i passi si possano seguire davvero.
- Chi eseguirà i casi (il proprietario, un utente di fiducia) e quando (chiusura di blocco,
  accettazione, dopo ogni deployment).

## 2. Prompt

**Routine di ogni voce in sospeso (va nel patto di convivenza):**

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business con te), non
l'agente:

- La voce in sospeso con i suoi criteri di accettazione in `docs/PENDING.md` (gradino 5), già
  costruita e con il test in rosso e la qualità in verde (gradini 8 e 9).
- `docs/MANUAL_TESTS.md` creato, anche se vuoto, con il formato del caso nell'intestazione:
  identificatore, voce in sospeso, precondizione, passi (azione e risultato visibile), risultato
  atteso con l'effetto nel backend verificabile da una persona, dati di prova, e la tabella delle
  esecuzioni (data, chi, passato o fallito, osservazione).
- La decisione su chi esegue e quando, scritta in `PROJECT.md` o nel patto: per un progetto
  piccolo, il proprietario alla chiusura di ogni blocco e prima del primo deployment.
- `docs/WORKING_AGREEMENT.md`, dove va la routine.
- Stato minimo accettabile: il file esiste con il suo formato e la voce in sospeso ha criteri di
  accettazione.

> Every pending item that changes what a user sees or does is closed with its manual test cases
> written in `docs/MANUAL_TESTS.md`, derived from its acceptance criteria: one case per flow the
> item touches, with an id, the pending item, the precondition, the numbered steps (what the
> person does and what they must see), the expected result including a backend effect a person
> can verify without tools, the test data to use, and an empty execution table (date, who,
> passed or failed, observation). Write them for a person who does not know how the system is
> built. Keep the cases of closed items up to date: when a flow changes, its cases change in the
> same commit. Never mark a case as executed yourself: execution is human.
>
> Every manual case also runs once per affected profile, and it is derived
> from `docs/PROFILE_MATRIX.md` instead of being written by hand: a case run
> with a single profile is not an executed case (Annex H, anchor 4). At the
> close of each block add the two human checks no machine replaces: the
> first-click check, where I name the place I would look for a task and you
> compare that with the menu, and the real screenshot of the test
> environment.
>
> `docs/MANUAL_TESTS.md` carries at its head three declarations that a gate reads, each one under
> its fixed key in English even when the file is in my language, because what this step owes is not
> the same as what it can prove. `cases_written`: how many cases are written.
> `cases_executed_by_a_person`: how many of those a person signed in their execution table, with a
> date and a name; you keep the first figure, and the second one moves only when a person executes
> -- never from your own reading of the system. `execution_debt`: `none` when the two figures are
> the same, or `pending_verifier` and then the cases nobody has executed yet, with who owes each
> execution and since when. That debt is not a gate of its own: what this step asks you for is the
> declaration and not a figure above zero, because the method cannot make a person execute. But it
> is never silent either, and a step that advances with its debt declared is honest in a way that a
> step advancing while it looks complete is not.
>
> And walk the screens yourself, which is a different thing from the execution a person owes and
> never a replacement for it: you walk to find defects, a person executes to accept. Go through
> every screen the system has as a person would -- open it, look at what is on it, use it, and
> follow the flow from one screen to the next -- and write `docs/SCREEN_WALKTHROUGH.md` with
> `screens_total`, how many screens the system has; `screens_walked`, how many of them you actually
> walked; and `walkthrough_findings`, how many defects the walk found. A screen you could not reach
> is counted in the total and named with its reason: taking it out of the denominator so that the
> figure reads better is the one thing this file must never do. For every defect: the screen, what
> you saw, what you expected instead, and the pending item you opened for it.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [it]
> Ogni voce in sospeso che cambia ciò che un utente vede o fa si chiude con i suoi casi di prova
> manuale scritti in `docs/MANUAL_TESTS.md`, derivati dai suoi criteri di accettazione: un caso per
> flusso che la voce tocca, con un identificatore, la voce in sospeso, la precondizione, i passi
> numerati (cosa fa la persona e cosa deve vedere), il risultato atteso incluso un effetto nel
> backend che una persona possa verificare senza strumenti, i dati di prova da usare, e una tabella
> di esecuzioni vuota (data, chi, passato o fallito, osservazione). Scrivili per una persona che non
> sa com'è fatto il sistema. Tieni aggiornati i casi delle voci chiuse: quando un flusso cambia, i
> suoi casi cambiano nello stesso commit. Non marcare mai un caso come eseguito da te: l'esecuzione
> è umana.
>
> Ogni caso manuale viene inoltre eseguito una volta per profilo
> interessato, ed è derivato da `docs/PROFILE_MATRIX.md` invece di essere
> scritto a mano: un caso eseguito con un solo profilo non è un caso
> eseguito (Allegato H, ancora 4). Alla chiusura di ogni blocco aggiungi le
> due verifiche umane che nessuna macchina sostituisce: quella del primo
> clic, in cui io nomino il luogo dove cercherei un compito e tu confronti
> questo con il menu, e la cattura reale dell'ambiente di test.
>
> `docs/MANUAL_TESTS.md` porta in testa tre dichiarazioni che un cancello legge, ognuna sotto la sua
> chiave fissa in inglese anche se il file è nella mia lingua, perché quello che questo gradino deve
> non è la stessa cosa di quello che può provare. `cases_written`: quanti casi sono scritti.
> `cases_executed_by_a_person`: quanti di quelli una persona ha firmato nella sua tabella di
> esecuzioni, con data e con nome; la prima cifra la tieni tu, e la seconda si muove solo quando una
> persona esegue —mai dalla tua lettura del sistema—. `execution_debt`: `none` quando le due cifre
> sono la stessa, oppure `pending_verifier` e allora i casi che nessuno ha ancora eseguito, con chi
> deve ogni esecuzione e da quando. Quel debito non è un cancello a sé: quello che questo gradino ti
> chiede è la dichiarazione e non una cifra maggiore di zero, perché il metodo non può obbligare una
> persona a eseguire. Ma non è nemmeno mai silenzioso, e un gradino che avanza con il suo debito
> dichiarato è onesto in un modo in cui non lo è uno che avanza sembrando completo.
>
> E percorri gli schermi tu stesso, che è un'altra cosa rispetto all'esecuzione che dobbiamo a una
> persona e mai un sostituto di quella: tu percorri per trovare difetti, una persona esegue per
> accettare. Passa per ogni schermo che il sistema ha come farebbe una persona —aprilo, guarda
> quello che c'è sopra, usalo, e segui il flusso da uno schermo al successivo— e scrivi
> `docs/SCREEN_WALKTHROUGH.md` con `screens_total`, quanti schermi ha il sistema; `screens_walked`,
> quanti di quelli hai percorso davvero; e `walkthrough_findings`, quanti difetti ha trovato la
> percorrenza. Uno schermo in cui non sei potuto entrare si conta nel totale e si nomina con la sua
> ragione: tirarlo fuori dal denominatore perché la cifra si legga meglio è l'unica cosa che questo
> file non può fare mai. Per ogni difetto: lo schermo, cosa hai visto, cosa ti aspettavi invece, e la
> voce in sospeso che hai aperto per quello.
>
> Quando hai bisogno di una decisione da parte mia, chiedila con le quattro parti della UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e in questo ordine: i dati che rendono necessaria la domanda,
> elencati; un paragrafo di non più di cinque righe che li colleghi e lasci vedere
> l'interrogativo; la domanda con le sue possibili risposte numerate; e la tua raccomandazione.
> Dillo alla profondità tecnica che il progetto ha dichiarato in `communication_depth`
> —`beginner`, `decision_maker` o `technical`—; se il progetto non ne ha dichiarata nessuna, usa
> `decision_maker`.

Cosa gli sto chiedendo: che il caso esca dai criteri di accettazione (così prova ciò che è stato
chiesto, non ciò che il modello ha capito); che sia scritto per qualcuno che non sa come funziona
il sistema, che è la differenza tra un caso di prova e una nota tecnica; che includa l'effetto nel
backend verificabile da una persona, perché anche la prova manuale guardi dall'altro lato dello
schermo; che i casi si mantengano nello stesso commit, come la documentazione; e **che il modello
non li esegua mai**, perché eseguiti dal modello sono un test in più, e il bello è che li esegua
una persona.

E quello che aggiunge D-082: che l'agente **percorra gli schermi per conto suo**, che è quello che
trova più difetti di interfaccia e quello che il metodo non chiedeva; e che il file dei casi porti
in testa la differenza tra lo scritto e l'eseguito, perché un gradino che avanza con debito avanzi
**dicendolo**. La percorrenza non sostituisce l'esecuzione umana: la rende più corta, perché la
persona non incontra più i difetti che l'agente avrebbe potuto vedere guardando.

**Per un'esecuzione (chiusura di blocco, accettazione, dopo un deployment):**

**Prima di inviare il prompt**, devi avere questo sottomano:

- L'esecuzione fatta: una persona ha seguito i casi di `docs/MANUAL_TESTS.md` nell'ambiente di
  test (o in produzione, in sola lettura, dopo un deployment) e ha annotato nella tabella di ogni
  caso la data, chi, passato o fallito, e l'osservazione. Questo lo fa la persona, a mano, prima
  di incollare il prompt; l'agente non lo fa.
- Le osservazioni sparse che non entrano in nessun caso (ciò che ha dato fastidio, ciò che non si
  è capito), annotate alla fine del file con la data.
- Stato minimo accettabile: tutti i casi del perimetro hanno il risultato di oggi, anche se è
  "non si è potuto eseguire" con la sua ragione.

> Read the executions of today in `docs/MANUAL_TESTS.md`. For every case that failed, and for
> every loose observation at the end of the file, open a corrective pending item in
> `docs/PENDING.md` with the person's words as the way to reproduce it, hanging from the node of
> the semantic tree it touches; do not fix anything now. For every case that passed, nothing. Then
> tell me, flow by flow, how many cases passed and how many failed, compared with the previous
> execution, and which failures repeat. If a case could not be executed, tell me why and whether
> the case or the system is the problem.
>
> Then refresh the three declarations at the head of the file: `cases_written`,
> `cases_executed_by_a_person` counted from the signed execution tables and from nothing else, and
> `execution_debt` with who still owes which execution and since when.
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
> Leggi le esecuzioni di oggi in `docs/MANUAL_TESTS.md`. Per ogni caso che è fallito, e per ogni
> osservazione sparsa alla fine del file, apri una voce in sospeso correttiva in `docs/PENDING.md`
> con le parole della persona come modo di riprodurlo, appesa al nodo dell'albero semantico che
> tocca; non sistemare niente adesso. Per ogni caso che è passato, niente. Poi dimmi, flusso per
> flusso, quanti casi sono passati e quanti sono falliti, confrontato con l'esecuzione precedente,
> e quali fallimenti si ripetono. Se un caso non si è potuto eseguire, dimmi perché e se il
> problema è il caso o il sistema.
>
> Poi aggiorna le tre dichiarazioni in testa al file: `cases_written`,
> `cases_executed_by_a_person` contata dalle tabelle di esecuzione firmate e da nient'altro, e
> `execution_debt` con chi deve ancora quale esecuzione e da quando.
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

Cosa gli sto chiedendo: la reimmissione resa operativa: ogni fallimento umano è una voce in sospeso
correttiva, con le parole della persona (non quelle del modello) come riproduzione, e appesa
all'albero; il confronto con l'esecuzione precedente, che è ciò che ti dice se il sistema migliora
o si degrada tra un blocco e l'altro; e la distinzione tra "il caso è scritto male" e "il sistema è
sbagliato", che sono due voci in sospeso diverse.

## 3. Risultato atteso

- `docs/MANUAL_TESTS.md` con un caso per flusso toccato da ogni voce in sospeso chiusa, nel
  formato, scritto per una persona.
- Le esecuzioni registrate, con data e chi, in ogni ciclo.
- Una voce in sospeso correttiva per ogni fallimento e per ogni osservazione.
- La routine nel patto.
- `docs/SCREEN_WALKTHROUGH.md` con la percorrenza dell'agente: `screens_total`, `screens_walked` e
  `walkthrough_findings`, e ogni difetto con il suo schermo, quello che si è visto, quello che si
  aspettava e la sua voce in sospeso.
- In testa a `docs/MANUAL_TESTS.md`, le tre dichiarazioni che un cancello legge: `cases_written`,
  `cases_executed_by_a_person` —che muove solo un'esecuzione firmata— e `execution_debt` a `none` o
  a `pending_verifier`, con chi deve ogni esecuzione e da quando.

## 4. Verifica di completezza (la fai tu, senza leggere codice)

- Prendi un caso a caso e seguilo tu nell'ambiente di test senza chiedere niente all'agente: ci
  sei riuscito? Se hai dovuto chiedere, il caso non è scritto per una persona.
- Ogni voce in sospeso chiusa che tocca una schermata ha il suo caso? Chiedigli la lista delle
  voci senza caso.
- Il caso dice quale effetto verificare dall'altro lato dello schermo, e come lo verifica una
  persona?
- L'ultima esecuzione ha data e nome in ogni caso? Ce n'è qualcuno "passato" senza data?
- Ogni fallimento dell'ultima esecuzione ha la sua voce in sospeso, con le parole della persona?
- `cases_executed_by_a_person` esce dalle tabelle firmate e non dalla lettura dell'agente? Prendi un
  caso contato come eseguito e cerca la data e il nome nella sua tabella.
- Se c'è debito, `execution_debt` dice chi lo deve e da quando? Un debito senza nome non è un
  debito: è una dimenticanza con la formattazione.
- La percorrenza conta gli schermi che non è riuscita ad aprire dentro il totale, con la loro
  ragione? Uno `screens_walked` uguale al totale, in un sistema con schermi dietro un profilo che
  l'agente non ha, è una cifra inventata.
- I difetti della percorrenza hanno la loro voce in sospeso, come i fallimenti umani?

## 5. Segnali d'allarme

- L'agente ha marcato i casi come eseguiti. Li ha eseguiti lui, che è lo stesso che non eseguirli.
- I casi sono copie del test automatico in prosa. Un caso manuale deve guardare ciò che il test
  non guarda: ciò che si vede, ciò che si capisce, ciò che dà fastidio.
- Tutti i casi passano in tutte le esecuzioni. Le persone trovano sempre qualcosa; se non trovano
  niente, non stanno seguendo il copione o il copione non chiede di guardare.
- I fallimenti si "sistemano" sul momento, senza voce in sospeso. Si perdono le parole della
  persona e la traccia di cosa si è ripetuto.
- Il gradino figura compiuto e `cases_executed_by_a_person` è a zero. Non è un errore: è il debito,
  ed è in vista proprio perché non si legga come compimento.
- La percorrenza dell'agente non ha trovato niente e il sistema ha schermi nuovi. Percorrere non è
  aprire: se non ci sono rilievi, molto probabilmente ha guardato lo schermo e non l'ha usato.
- La percorrenza comincia a usarsi come scusa per non eseguire i casi. Sono due cose con due scopi,
  e quella che accetta è quella della persona.
