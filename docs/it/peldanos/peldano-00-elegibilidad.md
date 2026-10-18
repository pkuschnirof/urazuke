# Passo 0 — Questo progetto si può affrontare così? (contratto del gradino)

**Fase:** avvio.
**Quando:** una sola volta, nella prima settimana, prima di aprire il repository e prima di
qualunque altra cosa. Un'ora di lavoro.
**Forma:** conversazione: l'agente valuta e chiede; tu decidi.
**Dimensione:** obbligatorio in ogni progetto, per quanto piccolo. Richiede un'ora; fa risparmiare
mesi.
**Stato:** i criteri escludenti X1 e X2 sono chiusi; i criteri che pesano (da D1 a D10) li sto
ancora calibrando e li marco come ipotesi.

## A cosa serve

Non infilarti in un progetto in cui il metodo non può funzionare. Se l'agente non potrà
verificarsi da solo end to end, o se non c'è un proprietario del dominio che decida, il metodo
degrada a "programmare con l'IA" e tu finisci per leggere codice. Questo gradino è la porta
d'ingresso: si attraversa una volta, e se non si attraversa, meglio saperlo prima che dopo.

E un'idea di fondo che voglio che tu abbia chiara: **il metodo non serve per qualunque progetto, e
questo non è un difetto**. Un metodo che promette di servire per tutto non sta dicendo niente. Ciò
che questo gradino fa è mettere il confine per iscritto, perché la decisione di entrare o non
entrare sia una decisione e non una speranza. I due criteri escludenti vengono da progetti che ho
rifiutato, non da quelli che ho accettato [Ref. 46](../REFERENCIAS.md#ref-46).

## 1. Contesto richiesto

Quello che segue è la lista generica. I file concreti che devi avere pronti prima di ogni
prompt, con il loro contenuto e il loro stato minimo, stanno nella sezione 2, nel blocco "Prima di
inviare il prompt" che precede ciascuno.

Nominato in forma generica; l'agente valuta se basta e chiede ciò che manca.

- Rilevazione della richiesta: cosa vuole il cliente, per chi, e cosa succede oggi senza il
  sistema.
- Rilevazione tecnologica: che tecnologia c'è o si propone, se esiste un sistema precedente, se
  quel sistema ha un repository e come è gestito.
- Rilevazione di testabilità: se le schermate si possono eseguire da programma e se ogni elemento
  dell'interfaccia è accessibile con i suoi diversi metodi (clic, digitazione, lettura dello
  stato), in modo che un test percorra la schermata e verifichi l'effetto nel backend.
- Chi è il proprietario del dominio e quanto tempo ha per decidere.
- Che conseguenza ha un errore (soldi, salute, esercizio, niente).
- Ambienti e accessi: se ci sarà un ambiente di test, se l'agente può accedervi, se c'è una
  produzione consultabile in sola lettura.

## 2. Prompt

I prompt sono in inglese, che è la lingua in cui i modelli seguono le istruzioni con più
precisione e meno token. Ciascuno porta la sua traduzione (nell'HTML, con un pulsante), e sotto la
spiegazione di cosa gli sto chiedendo e perché ogni clausola è lì. Al modello si incolla l'inglese.

**Iniziale:**

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business con te), non
l'agente:

- `docs/INITIAL_SURVEY.md`: la rilevazione iniziale. La scrivi tu, a mano, dopo aver parlato con
  il cliente (è il risultato dell'acquisizione della fase 0). Da mezza pagina a una pagina, in
  prosa, non in forma di modulo, con sei cose: (1) la richiesta: cosa vuole il cliente, con le sue
  parole, per chi, e cosa succede oggi senza il sistema (il quaderno, il foglio di calcolo, la
  persona che lo fa a mano); (2) la tecnologia: cosa c'è o cosa si propone, se esiste un sistema
  precedente, se quel sistema ha un repository e come è gestito (rami, chi carica, se ci sono
  test); (3) la testabilità: se le schermate si possono eseguire da programma, e se ogni elemento
  dell'interfaccia si può trovare, cliccare, digitare e leggere; se non lo sai, dillo; (4) il
  proprietario del dominio: chi è, con nome e ruolo, e quanto tempo ha a settimana per decidere;
  (5) la conseguenza di un errore: soldi, salute, esercizio, niente; (6) gli ambienti: se ce ne
  sarà uno di test, se l'agente potrà accedervi, se c'è una produzione consultabile in sola
  lettura. Ciò che non sai resta scritto come "non lo so": non completarlo tu perché l'agente non
  chieda, perché il bello del gradino è vedere cosa chiede.
- `docs/ELIGIBILITY_CRITERIA.md`: la scheda dei criteri. La copi dal documento principale (la
  scheda del gradino 0: i due escludenti X1 e X2 e i criteri da D1 a D10 che pesano), con una
  colonna vuota per la risposta, un'altra per la fonte e un'altra per il verde o il rosso. Non
  compilarla tu: la compila l'agente.
- La cartella del progetto, creata, con l'agente aperto lì e ancora senza nient'altro che quei due
  file dentro `docs/`.
- Stato minimo accettabile: i due file esistono, la rilevazione tocca le sei cose anche se diverse
  dicono "non lo so", e l'agente è posizionato nella cartella.

> We are going to assess whether this project can be run with the Urazuke method. Read the
> initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`. First, evaluate whether the survey is sufficient to answer
> every criterion. If any criterion cannot be answered from the survey, ask me for the missing
> information before going on; do not assume. Then fill in the sheet criterion by criterion:
> the answer, where it comes from, and for each exclusionary criterion whether it is green or
> red. Do not decide: present me the completed sheet with your reading and your doubts, and I
> will decide. Reply in my language.

> [it]
> Valuteremo se questo progetto si può affrontare con il metodo Urazuke. Leggi la rilevazione
> iniziale in `docs/INITIAL_SURVEY.md` e la scheda dei criteri in `docs/ELIGIBILITY_CRITERIA.md`.
> Prima, valuta se la rilevazione basta per rispondere a ogni criterio. Se a qualche criterio non
> si può rispondere con la rilevazione, chiedimi le informazioni che mancano prima di proseguire;
> non supporre. Poi compila la scheda criterio per criterio: la risposta, da dove viene, e per
> ogni criterio escludente se è in verde o in rosso. Non decidere: presentami la scheda completa
> con la tua lettura e i tuoi dubbi, e decido io. Rispondi nella mia lingua.

Cosa gli sto chiedendo: che legga i due input (la rilevazione e la scheda dei criteri); che
**prima di rispondere valuti se la rilevazione basta** e, se non basta, chieda invece di supporre
(questa è la clausola centrale di tutti i prompt del metodo); che compili la scheda con la fonte di
ogni risposta, perché dopo si possa rintracciare; che marchi gli escludenti in verde o in rosso; e
che **non decida**, perché l'idoneità la decido io. L'ultima riga gli chiede di rispondere nella
mia lingua, perché il prompt è in inglese ma la conversazione non ha motivo di esserlo.

**Di chiusura:**

**Prima di inviare il prompt**, devi avere questo a portata di mano:

- La tua decisione, in una riga, presa dopo aver letto la scheda completa che l'agente ha
  presentato: va, non va, o va con condizioni. Se ci sono condizioni, scrivile prima di incollare
  il prompt, ciascuna verificabile ("accesso in lettura alla produzione prima del gradino 3" sì;
  "che il cliente collabori" no), e non più di tre.
- Le risposte che hai dato alle domande dell'agente, date in questa stessa sessione di chat: il
  prompt gli chiede di includerle nella scheda finale, e se la sessione è un'altra, non le ha.
- Stato minimo accettabile: ogni criterio della scheda ha risposta e fonte a vista, e tu hai già
  deciso. Se hai ancora dubbi, non mandare la chiusura: continua a chiedere.

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.

> [it]
> Decisione: [va / non va / va con queste condizioni: …]. Scrivi la scheda finale in
> `docs/ELIGIBILITY.md` con la data, chi ha deciso, la risposta a ogni criterio con la sua fonte,
> e le condizioni se ci sono. Includi le domande che hai fatto e le mie risposte.

Cosa gli sto chiedendo: che lasci la decisione scritta con data e proprietario (gradino 6), con le
condizioni se ci sono, e con la traccia di domande e risposte, che è la prova che non ha supposto
niente.

## 3. Risultato atteso

Un file `docs/ELIGIBILITY.md` (o il nome che usa il tuo progetto), di una pagina, con:

- Data e chi ha deciso.
- I due criteri escludenti con la loro risposta e la loro fonte:
  - X1: c'è un repository accessibile e gestito in modo standard (o il progetto è nuovo).
  - X2: l'interfaccia si può eseguire da programma e ogni elemento è accessibile con i suoi diversi
    metodi, con verifica dell'effetto nel backend.
- I criteri che pesano, ciascuno con risposta, fonte e peso (quando il peso sarà calibrato).
- La decisione: va, non va, o va con condizioni, e le condizioni scritte.
- Le domande che l'agente ha fatto e le risposte, perché resti la traccia.

## 4. Verifica di completezza (la fai tu, senza leggere codice)

- I due escludenti hanno risposta esplicita e fonte? Se uno è in rosso, la decisione è "non va" o
  ha una condizione che lo risolve?
- C'è qualche criterio con risposta "suppongo di sì" o "probabilmente"? Se c'è, il gradino non è
  salito: l'agente doveva chiedere.
- La decisione è scritta con data e con nome?
- Le condizioni (se ci sono) sono verificabili? ("Avere accesso in lettura alla produzione prima
  del gradino 3" sì; "che il cliente collabori" no.)

## 5. Segnali d'allarme

- L'agente ha compilato la scheda intera senza fare una sola domanda. O la rilevazione era
  perfetta (non lo è mai) o ha supposto.
- La decisione è "va con condizioni" e le condizioni sono più di tre. Probabilmente è un "non va"
  che non si vuole dire.
- Al criterio X2 si è risposto "sì, con un po' di lavoro". Se le schermate non si possono operare
  da programma oggi, quel "po' di lavoro" è il progetto intero.
