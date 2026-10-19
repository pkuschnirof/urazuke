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

Cosa gli sto chiedendo: che il caso esca dai criteri di accettazione (così prova ciò che è stato
chiesto, non ciò che il modello ha capito); che sia scritto per qualcuno che non sa come funziona
il sistema, che è la differenza tra un caso di prova e una nota tecnica; che includa l'effetto nel
backend verificabile da una persona, perché anche la prova manuale guardi dall'altro lato dello
schermo; che i casi si mantengano nello stesso commit, come la documentazione; e **che il modello
non li esegua mai**, perché eseguiti dal modello sono un test in più, e il bello è che li esegua
una persona.

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
> the case or the system is the problem. Reply in my language.

> [it]
> Leggi le esecuzioni di oggi in `docs/MANUAL_TESTS.md`. Per ogni caso che è fallito, e per ogni
> osservazione sparsa alla fine del file, apri una voce in sospeso correttiva in `docs/PENDING.md`
> con le parole della persona come modo di riprodurlo, appesa al nodo dell'albero semantico che
> tocca; non sistemare niente adesso. Per ogni caso che è passato, niente. Poi dimmi, flusso per
> flusso, quanti casi sono passati e quanti sono falliti, confrontato con l'esecuzione precedente,
> e quali fallimenti si ripetono. Se un caso non si è potuto eseguire, dimmi perché e se il
> problema è il caso o il sistema. Rispondi nella mia lingua.

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

## 4. Verifica di completezza (la fai tu, senza leggere codice)

- Prendi un caso a caso e seguilo tu nell'ambiente di test senza chiedere niente all'agente: ci
  sei riuscito? Se hai dovuto chiedere, il caso non è scritto per una persona.
- Ogni voce in sospeso chiusa che tocca una schermata ha il suo caso? Chiedigli la lista delle
  voci senza caso.
- Il caso dice quale effetto verificare dall'altro lato dello schermo, e come lo verifica una
  persona?
- L'ultima esecuzione ha data e nome in ogni caso? Ce n'è qualcuno "passato" senza data?
- Ogni fallimento dell'ultima esecuzione ha la sua voce in sospeso, con le parole della persona?

## 5. Segnali d'allarme

- L'agente ha marcato i casi come eseguiti. Li ha eseguiti lui, che è lo stesso che non eseguirli.
- I casi sono copie del test automatico in prosa. Un caso manuale deve guardare ciò che il test
  non guarda: ciò che si vede, ciò che si capisce, ciò che dà fastidio.
- Tutti i casi passano in tutte le esecuzioni. Le persone trovano sempre qualcosa; se non trovano
  niente, non stanno seguendo il copione o il copione non chiede di guardare.
- I fallimenti si "sistemano" sul momento, senza voce in sospeso. Si perdono le parole della
  persona e la traccia di cosa si è ripetuto.
