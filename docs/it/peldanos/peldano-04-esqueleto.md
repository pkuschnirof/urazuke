# Passo 4 — Lo scheletro con i suoi cancelli (contratto del gradino)

**Fase:** avvio.
**Quando:** una volta, alla chiusura dell'avvio, dopo il dimensionamento e prima di
qualunque funzionalità. È qui che si fa tutta l'infrastruttura iniziale e la catena di
integrazione e deployment.
**Forma:** un solo invio lungo, con approvazione visiva tua alla fine.
**Dimensione:** obbligatorio in ogni progetto che avrà utenti. In un prototipo usa e getta si può
saltare; ma se il prototipo sopravvive (sopravvivono sempre), questo gradino è la prima cosa da
pagare.

## A cosa serve

Fa' che il sistema parta, si provi e si distribuisca VUOTO prima di avere funzionalità. Scoprire il
deployment alla fine è carissimo: in uno dei miei sistemi è arrivato un mese dopo l'avvio ed è
costato cinque voci in sospeso di fila [Ref. 32](../REFERENCIAS.md#ref-32). Se lo scheletro si
distribuisce nell'avvio, quei colpi si prendono con zero funzionalità in gioco.

L'idea generale dietro: **la strada verso la produzione è parte del prodotto**, non una pratica
della fine. Un sistema che funziona sulla macchina del programmatore e non si può distribuire non
è un sistema; è una demo. E l'unico modo di sapere che la strada funziona è percorrerla quando
ancora non c'è niente da perdere. Per questo in questo gradino si monta tutto ciò che poi userà il
ciclo: il repository con la sua struttura, l'ambiente di test, l'integrazione continua che esegue
la batteria a ogni push, e il deployment automatico all'ambiente di test.

## 1. Contesto richiesto

Quello che segue è la lista generica. I file concreti che devi avere pronti prima di ogni
prompt, con il loro contenuto e il loro stato minimo, stanno nella sezione 2, nel blocco "Prima di
inviare il prompt" che precede ciascuno.

- `docs/SIZING.md` (gradino 3): l'opzione scelta definisce lo scheletro.
- Rilevazione degli ambienti: dove girerà (cloud, server proprio), se c'è un ambiente di test e
  uno di produzione, chi ha accesso, come si distribuisce oggi se c'è qualcosa.
- Le credenziali del posto in cui si distribuirà, anche se è un servizio gratuito.
- Il tipo di progetto: nuovo, correzione o evoluzione di qualcosa di esistente.

## 2. Prompt

**Iniziale:**

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business con te), non
l'agente:

- `docs/ENVIRONMENTS_SURVEY.md`: la rilevazione degli ambienti, scritta da te. Dove girerà il
  sistema (un server che hai già, un servizio in cloud, quale); se ci sarà un ambiente di test e
  uno di produzione, e se esistono già; chi ha accesso a cosa; come si distribuisce oggi se c'è
  qualcosa (a mano, uno script, niente); il tipo di progetto (nuovo, correzione o evoluzione di
  qualcosa di esistente); e l'URL o il dominio che avrà l'ambiente di test, se già si sa. Il
  prompt lo nomina come "the environments survey", senza percorso: salvalo con questo nome, o
  digli nella chat come si chiama.
- Le credenziali del posto in cui si distribuirà, anche se è un servizio gratuito: create, provate
  da te una volta (entrando nel pannello), e conservate fuori dal repository (in un file di
  ambiente della tua macchina o nel gestore di segreti del tuo strumento). All'agente si dice dove
  sono; non gliele si incollano nella chat.
- `PROJECT.md` (gradino 2) e `docs/SIZING.md` (gradino 3), chiusi: lo scheletro si costruisce
  sull'opzione scelta lì, e l'agente la deve leggere.
- Stato minimo accettabile: puoi entrare tu nel servizio in cui si distribuirà, e la rilevazione
  dice qual è l'ambiente di test. Senza questo, lo scheletro resta sulla tua macchina e il gradino
  non si sale.

> We are going to build the skeleton of the system, with no functionality at all. Read
> `PROJECT.md`, `docs/SIZING.md` and the environments survey. Evaluate whether you have what is
> needed for the skeleton to run in the test environment (access, URL, deployment method); if
> anything is missing, ask me before starting. Then build: the folder structure; the server and
> the UI starting up; the test structure with one smoke test that passes; continuous
> integration running that test suite on every push; and the deployment to the test
> environment. Declare the gates of the workflow (what must be green to move from one stage to
> the next) in `docs/GATES.md`. When done, take a screenshot of the empty UI running in the
> test environment and show it to me. Do not add any functionality "while you are at it".
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
> Costruiremo lo scheletro del sistema, senza nessuna funzionalità. Leggi `PROJECT.md`,
> `docs/SIZING.md` e la rilevazione degli ambienti. Valuta se hai ciò che serve perché lo
> scheletro giri nell'ambiente di test (accesso, URL, modo di distribuire); se manca qualcosa,
> chiedimelo prima di cominciare. Poi costruisci: la struttura delle cartelle; il server e
> l'interfaccia che partono; la struttura dei test con un test di fumo che passa; l'integrazione
> continua che esegue quella batteria a ogni push; e il deployment all'ambiente di test. Dichiara i
> cancelli del flusso (cosa deve essere in verde per passare da una tappa alla successiva) in
> `docs/GATES.md`. Quando hai finito, fai uno screenshot dell'interfaccia vuota che gira
> nell'ambiente di test e mostramelo. Non aggiungere nessuna funzionalità "già che ci sei".
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

Cosa gli sto chiedendo: che verifichi di avere gli accessi prima di cominciare (senza quello lo
scheletro resta sulla macchina dell'agente); la lista esatta di ciò che è uno scheletro
(struttura, avvio, un test, integrazione continua, deployment in test); i cancelli scritti; uno
screenshot reale dell'ambiente di test, che è l'unica prova valida che è stato distribuito; e il
divieto esplicito di aggiungere funzionalità, perché il modello tende al "già che ci sono" e
quello rompe il perimetro esatto.

**Di chiusura:**

**Prima di inviare il prompt**, devi avere questo a portata di mano:

- Lo screenshot dell'ambiente di test che l'agente ti ha mostrato, e la tua visita a quell'URL dal
  tuo browser: si deve vedere la stessa cosa. È la prima vista umana del sistema, ed è una pietra
  miliare.
- Un link a un'esecuzione dell'integrazione continua in verde, chiesto all'agente e aperto da te.
- `docs/GATES.md`, letto: ogni cancello ha una condizione verificabile.
- Stato minimo accettabile: hai visto la schermata vuota all'URL reale, con i tuoi occhi. Se hai
  visto solo lo screenshot, non approvare.

> Skeleton approved. Record in `docs/STATUS.md` the test environment URL, the command to run
> the tests and the command to deploy, and mark this step as done. Then run the deployment a
> second time and show me that the second run changed nothing.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [it]
> Scheletro approvato. Registra in `docs/STATUS.md` l'URL dell'ambiente di test, il comando per
> eseguire i test e il comando per distribuire, e marca questo passo come fatto. Poi esegui il
> deployment una seconda volta e mostrami che la seconda esecuzione non ha cambiato niente.
>
> Quando hai bisogno di una decisione da parte mia, chiedila con le quattro parti della UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e in questo ordine: i dati che rendono necessaria la domanda,
> elencati; un paragrafo di non più di cinque righe che li colleghi e lasci vedere
> l'interrogativo; la domanda con le sue possibili risposte numerate; e la tua raccomandazione.
> Dillo alla profondità tecnica che il progetto ha dichiarato in `communication_depth`
> —`beginner`, `decision_maker` o `technical`—; se il progetto non ne ha dichiarata nessuna, usa
> `decision_maker`.

Cosa gli sto chiedendo: lasciare i tre comandi dove la prossima sessione li troverà, e provare che
il deployment è ripetibile (eseguirlo due volte senza rompere niente). Quella seconda esecuzione è
la prova che la procedura è una procedura e non una fortuna.

## 3. Risultato atteso

- Il repository con la struttura, il server e la schermata che partono.
- Un test di fumo in verde e la batteria che gira in integrazione continua (con il link
  all'esecuzione in verde).
- Il deployment all'ambiente di test funzionante, con l'URL, ed eseguito due volte.
- `docs/GATES.md`: la lista dei cancelli, ciascuno con la condizione per passare.
- Uno screenshot del sistema vuoto che gira nell'ambiente di test.
- `docs/STATUS.md` aggiornato con i tre comandi (eseguire, testare, distribuire).

## 4. Verifica di completezza

- Puoi aprire l'URL dell'ambiente di test e vedere la schermata vuota? (Lo fai tu, non l'agente.)
- C'è un link a un'esecuzione di integrazione continua in verde?
- Il deployment è stato eseguito due volte e la seconda non ha rotto niente?
- I cancelli sono scritti con una condizione verificabile ciascuno?
- C'è qualche funzionalità che non hai chiesto? Se c'è, l'agente ha violato il perimetro esatto.

## 5. Segnali d'allarme

- Lo scheletro "funziona in locale" ma il deployment "lo vediamo dopo". No: il deployment è lo
  scheletro.
- Lo screenshot è della macchina dell'agente, non dell'ambiente di test. Chiedi l'URL.
- I cancelli dicono cose come "il codice ha buona qualità". Un cancello è una condizione
  verificabile: "la batteria è in verde", "il deployment in test ha funzionato".
