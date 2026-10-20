# Passo 8 — I test come lucchetti, provati in rosso (contratto del gradino)

**Fase:** ciclo.
**Quando:** con ogni voce in sospeso, alla sua chiusura: il test in rosso e in verde, la
regressione dei vicini e il test end to end del flusso toccato. La batteria completa end to end di
tutti i flussi, alla chiusura di ogni blocco e prima di ogni deployment in produzione.
**Forma:** un solo invio; l'agente esegue e riporta, tu leggi il rapporto.
**Dimensione:** obbligatorio in ogni progetto. È il cuore del metodo: se c'è un gradino che non si
può negoziare, è questo.

## A cosa serve

Un test che non hai mai visto fallire non sai se prova qualcosa. La regola qui non è "scrivi
test": è "dimostra che il test va in rosso contro il codice vecchio, e poi in verde con quello
nuovo". Evita i test che passano perché non provano niente, e il verde che nasconde un bug
[Ref. 44](../REFERENCIAS.md#ref-44).

Perché questo è più importante con un modello che con un programmatore umano: il modello scrive
il codice e il test **nella stessa sessione, con la stessa comprensione**. Se ha capito male la
richiesta, il test proverà ciò che ha capito, e passerà. Il rosso contro il codice vecchio è
l'unico modo economico di verificare che il test stia guardando ciò che conta: se il codice vecchio
lo passa, il test non distingue il prima dal dopo, e allora non serve. Il caso che lo mostra meglio
è quello dei contatori che non coincidevano [Ref. 26](../REFERENCIAS.md#ref-26).

C'è un'obiezione seria a questo gradino, e la voglio lasciare scritta perché la useranno contro:
lo stesso agente che scrive il test e il codice può **fingere il rosso**. Uno studio pubblicato
nell'agosto del 2026 ha misurato che, quando a un agente si chiede il ciclo "prima il test", a
volte salta il rosso, lo racconta senza averlo eseguito, o implementa prima del test perché passi
al primo colpo (sta nella Parte F del documento principale, quella dei lavori correlati). La mia
risposta ha tre pezzi, e tutti e tre stanno nella scala. Il primo, qui: il rosso non è un
racconto, è una **ricevuta**: il comando esatto, l'identificatore della versione contro cui è
stato eseguito, il numero di test che falliscono e il codice di uscita, tutto incollato così com'è
uscito, in modo che tu possa eseguirlo di nuovo con un solo comando senza capire cosa fa. Il
secondo, nel gradino 13: l'audit da parte di un'altra sessione esegue di nuovo un campione di
quelle ricevute. Il terzo, nel gradino 9: i test di mutazione, che piantano errori di proposito e
contano quanti ne catturano i test; è l'unica misura che, in quello stesso studio, ha distinto i
test che sorvegliano da quelli che decorano.

E la seconda metà: i test end to end. Un test che verifica dalla schermata (clicca, digita, legge)
e controlla l'effetto nel backend (la riga è rimasta, lo stato è cambiato) è quello che sostituisce
la tua lettura del codice. I criteri di accettazione della voce in sospeso ("dato, quando, allora")
sono il suo copione. E si eseguono tre volte su tre scale: il flusso toccato con ogni voce, tutti i
flussi alla chiusura di ogni blocco, e tutti i flussi con la versione esatta prima della
produzione.

## 1. Contesto richiesto

Quello che segue è la lista generica. I file concreti che devi avere pronti prima di ogni
prompt, con il loro contenuto e il loro stato minimo, stanno nella sezione 2, nel blocco "Prima di
inviare il prompt" che precede ciascuno.

- La modifica già implementata (per default i test vengono dopo l'implementazione; "prima il
  test" resta come opzione per perimetri piccoli e ben definiti).
- La voce in sospeso che origina la modifica, con i suoi criteri di accettazione e il suo "come si
  verifica".
- La batteria esistente e il comando per eseguirla (gradino 4).

## 2. Prompt

**Routine (va nel patto di convivenza; si applica a ogni modifica):**

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business con te), non
l'agente:

- La voce in sospeso che si sta chiudendo, con la sua specifica completa in `docs/PENDING.md`; in
  particolare, i suoi criteri di accettazione nella forma "dato, quando, allora" e il suo "come si
  verifica", che sono il copione del test. Se la voce non li ha, torna al gradino 5 prima di
  chiedere il test.
- La modifica già implementata dall'agente (il metodo prova dopo aver implementato, salvo che tu
  scelga "prima il test" per un perimetro piccolo e ben definito).
- La batteria esistente e il comando per eseguirla, annotati in `docs/STATUS.md` (gradino 4).
- L'ambiente di test in esecuzione e accessibile all'agente, con dati di prova sufficienti per il
  flusso che si tocca. Se il flusso ha bisogno di dati che non esistono (un paziente, un
  appuntamento di ieri), caricali tu o chiedigli di crearli come parte del test; ciò che non può
  fare è simularli.
- `docs/WORKING_AGREEMENT.md`, dove va la routine la prima volta.
- Stato minimo accettabile: la specifica ha criteri di accettazione, e la batteria si esegue con
  un comando conosciuto.

> To close this pending item I need evidence, not your word. (1) Write the test that proves what the
> item asks for, following its acceptance criteria. (2) Demonstrate that this test fails against the
> previous code: you may temporarily revert the change, or run the test against the old version, but
> show me the red output as a receipt, not a summary: the exact command, the identifier of the
> version it ran against, the count of failing tests and the exit code, pasted as they came out, so
> that I can rerun it myself with one command. (3) Show me the green output with the change. (4) Run
> the regression suite for the neighbouring items and show me it is still green. (5) Run the
> end-to-end test of the flow this item touches, from the screen to the backend, and show me the
> backend effect. (6) Do not replace with mocks the very part you are trying to test. If testing end
> to end requires something you lack (data, access, an environment), ask me for it; do not simulate
> what you do not have. If the previous version does not have the module at all (the first block of
> a new project), a failure to load is not a red: prove the red by planting one deliberate defect in
> the function you just wrote (an inverted condition, a deleted line), show me the test failing
> against that defect as the same kind of receipt, with the diff of the defect, and then revert it.
> Finally, the commit message says "proved red against [what]" and the test counts.

> [it]
> Per chiudere questa voce in sospeso ho bisogno di prove, non della tua parola. (1) Scrivi il
> test che prova ciò che la voce chiede, seguendo i suoi criteri di accettazione. (2) Dimostra che
> quel test fallisce contro il codice precedente: puoi annullare temporaneamente la modifica, o
> eseguire il test contro la versione vecchia, ma mostrami l'output in rosso come una ricevuta, non
> come un riassunto: il comando esatto, l'identificatore della versione contro cui è stato
> eseguito, il numero di test che falliscono e il codice di uscita, incollati così come sono
> usciti, perché io possa eseguirlo di nuovo con un solo comando. (3) Mostrami l'output in verde
> con la modifica. (4) Esegui la regressione delle voci vicine e mostrami che è ancora in verde.
> (5) Esegui il test end to end del flusso che questa voce tocca, dalla schermata fino al backend,
> e mostrami l'effetto nel backend. (6) Non sostituire con simulazioni proprio la parte che stai
> provando. Se provare end to end richiede qualcosa che non hai (dati, accesso, un ambiente),
> chiedimelo; non simulare ciò che non hai. Se la versione precedente non ha affatto il modulo (il
> primo blocco di un progetto nuovo), un file che non si carica non è un rosso: prova il rosso
> piantando di proposito un difetto nella funzione che hai appena scritto (una condizione
> invertita, una riga cancellata), mostrami il test che fallisce contro quel difetto come lo stesso
> tipo di ricevuta, con il diff del difetto, e poi annullalo. Infine, il messaggio del commit dice
> "provato in rosso contro [cosa]" e i numeri dei test.

**Il rosso del primo blocco.** Nel primo blocco di un progetto nuovo non c'è codice precedente: il test nuovo fallisce perché il modulo non esiste, e quel fallimento non prova che il test distingua un comportamento. Per questo, quando la versione precedente non ha il modulo, il rosso si prova **per mutazione**: l'agente pianta di proposito un difetto nella funzione appena scritta, mostra il test in rosso contro quel difetto (la ricevuta porta il diff del difetto, così vedi che non era banale), lo annulla e mostra il verde. Un solo mutante per elemento in sospeso, eseguito e registrato come qualsiasi altra ricevuta; i test di mutazione su tutta la base restano il rinforzo opzionale del gradino 9. (Decisione D-037, dalla pratica Turnera: sei ricevute di rosso che dicevano solo "il file non si carica".)

Cosa gli sto chiedendo, clausola per clausola: (1) il test, guidato dai criteri di accettazione
della voce; (2) **il rosso dimostrato come ricevuta** (comando, versione, numeri, codice di
uscita), che è la clausola che distingue questo metodo da "scrivi test" e quella che impedisce al
rosso di essere un racconto; (3) il verde; (4) la regressione dei vicini nella stessa sessione,
perché una modifica rompe cose accanto; (5) il test end to end del flusso toccato, con l'effetto
nel backend in vista; (6) non simulare proprio ciò che si prova; e la clausola di completezza
adattata a questo gradino: se manca qualcosa per provare end to end, **chiederlo, non simularlo**.
Il messaggio di commit con i numeri lascia la prova dove vive il codice.

**Alla chiusura di ogni blocco e prima di ogni deployment in produzione:**

**Prima di inviare il prompt**, devi avere questo a portata di mano:

- Tutte le voci in sospeso del blocco chiuse con la routine (rosso, verde, regressione, end to end
  del flusso).
- La versione esatta che si promuoverà, identificata (numero di versione o commit) e distribuita
  nell'ambiente di test; dillo nella chat se non è in `docs/STATUS.md`.
- La lista dei flussi che esistono finora, scritta da te a partire dai casi d'uso dell'albero
  semantico, per confrontarla con ciò che l'agente dirà di aver coperto. Senza la tua lista,
  "tutti i flussi" è ciò che l'agente ricorda.
- Stato minimo accettabile: sai quanti flussi deve percorrere la batteria prima di chiedergli
  quanti ne ha percorsi.

> Run the complete end-to-end suite of every flow that exists so far, in the test environment,
> with the exact version that will be promoted. Show me the counts, and for each flow the
> backend check that proves it. If any flow has no end-to-end test, say so and open a pending
> item for it; do not pass it as covered.

> [it]
> Esegui la batteria completa end to end di tutti i flussi che esistono finora, nell'ambiente di
> test, con la versione esatta che sarà promossa. Mostrami i numeri e, per ogni flusso, la
> verifica nel backend che lo prova. Se qualche flusso non ha un test end to end, dillo e apri una
> voce in sospeso; non farlo passare come coperto.

Cosa gli sto chiedendo: la seconda e la terza scala dei test end to end, con la versione esatta
(non "l'ultima"), con l'effetto nel backend per flusso, e con la clausola di completezza: ciò che
non è coperto si dichiara e diventa voce in sospeso, non si fa passare per coperto.

**Quando l'agente dice che non si può provare:**

**Prima di inviare il prompt**, devi avere questo a portata di mano:

- Il messaggio dell'agente che dice che non si può provare, letto con attenzione: non si può, o
  gli manca qualcosa? Se ciò che manca è un input che hai tu (dati, un accesso, un ambiente),
  daglielo e non mandare questo prompt. Questo prompt è per quando davvero manca qualcosa nel
  sistema (identificatori negli elementi della schermata, una modalità di prova del fornitore
  esterno).
- Stato minimo accettabile: hai distinto tra "mi manca un input" (lo dai) e "il sistema non è
  testabile qui" (questo prompt).

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

> [it]
> Spiega perché non si può provare, cosa bisognerebbe aggiungere perché si possa, e apri una
> voce in sospeso per questo. La modifica non è chiusa finché non si può provare.

Cosa gli sto chiedendo: che "non si può provare" non sia la fine della conversazione ma l'inizio
di una voce in sospeso. La non testabilità è debito, e il debito si registra.

## 3. Risultato atteso

- Il test nuovo nel repository, nominato con la voce in sospeso che chiude.
- Nel rapporto dell'agente e nel messaggio del commit: l'output in rosso come ricevuta (il
  comando, la versione contro cui è stato eseguito, quanti falliscono, il codice di uscita),
  l'output in verde, e la regressione in verde con i suoi numeri.
- Il test end to end del flusso toccato, con la prova che il backend è cambiato (la riga, il
  record, lo stato).
- Alla chiusura di ogni blocco e prima della produzione: la batteria completa end to end in verde,
  per flusso, con la versione esatta.

## 4. Verifica di completezza

- Il rapporto mostra il rosso? Con numeri: "4 su 8 falliscono contro il criterio vecchio". Se
  mostra solo verde, il gradino non è salito.
- Il rosso è una ricevuta o un racconto? Deve avere il comando esatto, la versione contro cui è
  stato eseguito, i numeri e il codice di uscita. Una volta per blocco, scegli una voce in sospeso
  a caso ed esegui tu quel comando: il rosso deve ricomparire.
- La regressione è stata eseguita nella stessa sessione? Quanti test, quanti in verde?
- C'è qualche parte "simulata" (mock) proprio dove sta la modifica? Chiedi all'agente cosa ha
  simulato e perché.
- Il commit cita la voce in sospeso e dice "provato in rosso"?
- Il test di schermata verifica anche l'effetto nel backend?
- Alla chiusura del blocco: ci sono tutti i flussi nella batteria end to end, o ce n'è qualcuno
  che "si copre con gli unitari"?

## 5. Segnali d'allarme

- Tutti i test nuovi della settimana sono passati in verde al primo colpo, e non si è mai mostrato
  un rosso. O l'agente sta omettendo il passo o i test non provano niente.
- La batteria ci mette sempre di più e nessuno sa perché. Di solito è che i test end to end sono
  stati sostituiti via via da simulazioni "perché giri veloce".
- L'agente riporta "i test passano" senza dire quanti. Sempre con i numeri.
- Il rosso arriva raccontato in prosa ("il test è fallito come previsto") senza comando, senza
  versione e senza numeri. Un rosso senza ricevuta vale quanto nessuno.
- Arrivi all'uscita in produzione e la batteria completa end to end si esegue per la prima volta.
  Sono mancate le chiusure di blocco.
