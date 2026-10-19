# Passo 5 — Il piano sono le voci in sospeso: la specifica dettagliata vive in ciascuna (contratto del gradino)

**Fase:** ciclo.
**Quando:** il registro si crea all'apertura del primo blocco funzionale, appena finisce l'avvio;
ogni blocco nuovo parte convertendo la richiesta del cliente in voci in sospeso specificate; la
routine si usa in ogni sessione per tutto il progetto; la documentazione della voce fatta si
scrive alla sua chiusura, nella stessa sessione.
**Forma:** un solo invio all'apertura di ogni blocco; poi, routine di ogni sessione.
**Dimensione:** obbligatorio in ogni progetto. È il gradino che rende seguibili tutti gli altri:
senza voci in sospeso numerate e specificate non c'è dove appendere né la specifica né la prova.

## A cosa serve

Abbi una sola coda di lavoro, con ordine e con cancello, che sia la verità del progetto. Non c'è
"piano" da una parte e "compiti" dall'altra: la lista delle voci in sospeso È il piano. Evita la
specifica lunga che viene superata in due settimane e resta obsoleta
[Ref. 17](../REFERENCIAS.md#ref-17), e il lavoro di cui nessuno sa perché è stato fatto
[Ref. 7](../REFERENCIAS.md#ref-7).

Ma c'è di più, ed è ciò che distingue questo gradino da una lista di compiti qualunque. Nel metodo
classico esisteva un documento di specifica dei requisiti, lungo, che descriveva tutto ciò che il
sistema doveva fare e che invecchiava prima di essere finito. Qui quel documento si scompone: **la
specifica dettagliata vive in ogni voce in sospeso**. Una voce ben scritta porta: il nodo
dell'albero semantico da cui pende; la storia utente o il caso d'uso che la origina, con le parole
del cliente; la descrizione dettagliata; le regole di business applicabili, con la loro decisione e
la loro data; i dati che entrano ed escono; le schermate interessate, con il prototipo se c'è; i
casi limite e le eccezioni; i criteri di accettazione nella forma "dato, quando, allora"; e come si
verifica. La somma delle voci in sospeso è la specifica del sistema, e la tracciabilità (requisito
→ voce → test → commit) non è una matrice a parte: è la voce stessa.

E la terza cosa, che chiude il cerchio: **le voci in sospeso chiuse sono documentazione**. Quando
una voce si chiude, non si cancella né si archivia vuota: resta con la sua specifica, la decisione
che l'ha originata, la prova con cui è stata chiusa (i numeri del rosso e del verde, lo screenshot,
il numero misurato), il commit e la data. La coda delle voci chiuse è lo storico funzionale del
sistema: cosa è stato costruito, perché, quando e come è stato provato. Da lì escono il diario
delle modifiche, le sezioni nuove del manuale, e la risposta a "perché il sistema fa questo?" sei
mesi dopo.

## 1. Contesto richiesto

Quello che segue è la lista generica. I file concreti che devi avere pronti prima di ogni
prompt, con il loro contenuto e il loro stato minimo, stanno nella sezione 2, nel blocco "Prima di
inviare il prompt" che precede ciascuno.

- La richiesta del cliente per il blocco, in prosa, così come la direbbe lui, con le sue
  ambiguità. Se nell'acquisizione hai fatto casi d'uso o storie utente, meglio: sono l'unità
  naturale di un blocco.
- L'albero semantico (gradino 2), per appendere ogni voce al suo nodo.
- Gli audit e i rilievi delle prove umane, se ce ne sono già stati.
- `PROJECT.md` e `docs/STATUS.md`.

## 2. Prompt

**Per aprire un blocco:**

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business con te), non
l'agente:

- La richiesta del cliente per questo blocco, scritta in prosa, così come la direbbe lui, con le
  sue ambiguità. Va in `docs/INITIAL_SURVEY.md` sotto un titolo con il nome del blocco, o in un
  file proprio (per esempio `docs/blocks/BLOCK_01_REQUEST.md`); il prompt dice "the client's
  request for this block" senza percorso, quindi digli nella chat dov'è. Se nell'acquisizione hai
  scritto casi d'uso o storie utente, vanno lì: sono l'unità naturale del blocco. Se il
  proprietario ti ha dato una priorità, anche quella. Non "migliorarla" tu: le ambiguità sono ciò
  che l'agente deve chiedere.
- `docs/SEMANTIC_TREE.md` (gradino 2), aggiornato: ogni voce in sospeso penderà da un nodo di lì.
- `PROJECT.md` e `docs/STATUS.md` (gradino 2), aggiornati.
- Se ci sono stati audit (gradino 13) o prove umane (la vista umana alla chiusura del blocco
  precedente): i loro rilievi, in `docs/AUDIT_[data].md` o annotati nello stato vivo, perché sono
  voci candidate per questo blocco.
- Stato minimo accettabile: la richiesta del blocco è scritta con le parole del cliente, e
  l'albero ha i nodi di quel blocco, o la richiesta lascia vedere quali mancano.

> We are going to turn everything that must be done in this block into numbered pending items,
> each one carrying its full specification. Read `PROJECT.md`, `docs/SEMANTIC_TREE.md`, the
> client's request for this block, and whatever is in `docs/STATUS.md`. If the request is
> ambiguous on any point such that you cannot write a verifiable pending item for it, ask me; do
> not resolve it by assuming. Then create or extend `docs/PENDING.md` with one item per thing to
> do, each with: number (PND-001 onwards); one-line title; the node of the semantic tree it hangs
> from; the user story or use case that originates it, in the client's words; the detailed
> description; the business rules that apply, each with its decision and date, or marked as
> "rule missing, asked"; the data in and out; the screens affected; the edge cases and
> exceptions; the acceptance criteria in the form "given, when, then"; how it will be verified
> as done; and status. If a node the item needs does not exist in the tree, propose it and mark
> it. Order the items by the priority I gave you; if I gave none, propose an order and tell me
> why. Reply in my language.

> [it]
> Convertiremo tutto ciò che c'è da fare in questo blocco in voci in sospeso numerate, ciascuna
> con la sua specifica completa. Leggi `PROJECT.md`, `docs/SEMANTIC_TREE.md`, la richiesta del
> cliente per questo blocco, e ciò che c'è in `docs/STATUS.md`. Se la richiesta è ambigua su
> qualche punto al punto che non puoi scrivere una voce verificabile, chiedimelo; non risolverlo
> supponendo. Poi crea o estendi `docs/PENDING.md` con una voce per cosa da fare, ciascuna con:
> numero (da PND-001 in poi); titolo di una riga; il nodo dell'albero semantico da cui pende; la
> storia utente o il caso d'uso che la origina, con le parole del cliente; la descrizione
> dettagliata; le regole di business che si applicano, ciascuna con la sua decisione e data, o
> marcata come "regola mancante, chiesta"; i dati che entrano ed escono; le schermate
> interessate; i casi limite e le eccezioni; i criteri di accettazione nella forma "dato, quando,
> allora"; come si verificherà che è fatta; e lo stato. Se un nodo di cui la voce ha bisogno non
> esiste nell'albero, proponilo e marcalo. Ordinale per la priorità che ti ho dato; se non te ne
> ho data nessuna, proponi un ordine e dimmi perché. Rispondi nella mia lingua.

Cosa gli sto chiedendo: che converta la richiesta in voci verificabili e che **chieda quando la
richiesta non permette di scriverne una verificabile** (l'ambiguità si risolve chiedendo, non
scegliendo); la specifica completa di ogni voce, campo per campo, che è l'ingegneria dei requisiti
classica scomposta in unità piccole; il nodo dell'albero da cui pende, che è ciò che ti permette di
rilevare una voce fuori perimetro; le regole di business con la loro decisione o marcate come
mancanti, che è l'aggancio con il gradino 6; i criteri di accettazione nella forma classica, che
sono il copione del test end to end del gradino 8; e un ordine proposto con la sua ragione, perché
tu lo confermi o lo cambi.

**Routine di ogni sessione (va nel patto di convivenza):**

**Prima di inviare il prompt**, devi avere questo a portata di mano:

- `docs/PENDING.md` con il blocco specificato e letto da te, voce per voce, come se fossi il
  cliente, con le tue correzioni già fatte (è il compito più importante del gradino, e quello che
  dà più tentazione di saltare).
- `docs/WORKING_AGREEMENT.md` (gradino 1), dove questa routine si aggiunge.
- Stato minimo accettabile: nessuna voce in sospeso ha una specifica di una riga. Se ce l'ha, non
  cominciare a costruire: falla completare prima.

> Before touching any code, open `docs/PENDING.md`, tell me which item you are taking and why,
> and re-read its specification. Every commit cites its pending item. A pending item is closed
> with written evidence (the test counts red and green, the screenshot, the measured number),
> never with "done". When you close it, keep it in the register with its full specification and
> add: the evidence, the commit, the date, and any decision that was taken along the way; that
> record is the documentation of what was built. If along the way you see something that is not
> on the list, add it as a new pending item with its specification; do not do it.

> [it]
> Prima di toccare codice, apri `docs/PENDING.md`, dimmi quale voce prendi e perché, e rileggi la
> sua specifica. Ogni commit cita la sua voce in sospeso. Una voce si chiude con prova scritta (i
> numeri del test in rosso e in verde, lo screenshot, il numero misurato), mai con "fatto".
> Quando la chiudi, lasciala nel registro con la sua specifica completa e aggiungi: la prova, il
> commit, la data, e qualunque decisione sia stata presa lungo la strada; quel registro è la
> documentazione di ciò che è stato costruito. Se lungo la strada vedi qualcosa che non è nella
> lista, aggiungilo come voce nuova con la sua specifica; non farlo.

Cosa gli sto chiedendo: la disciplina di ogni sessione: annunciare cosa si prende e rileggere la
specifica (l'agente parte senza memoria, e la specifica è la sua memoria della voce), citare la
voce in ogni commit, chiudere con prova, **documentare la voce fatta** nello stesso registro, e
**annotare invece di fare** ciò che compare fuori dalla lista. Quest'ultima clausola è quella che
protegge il perimetro esatto quando il modello "vede qualcos'altro".

## 3. Risultato atteso

`docs/PENDING.md` (o lo strumento che usa il tuo progetto) con, per voce:

- Numero, titolo, stato (aperta / in corso / chiusa), data di apertura e di chiusura.
- Il nodo dell'albero semantico.
- La storia o il caso d'uso di origine, con le parole del cliente.
- La specifica dettagliata: descrizione, regole di business con decisione e data, dati,
  schermate, casi limite, criteri di accettazione, come si verifica.
- Alla chiusura: la prova, il commit, la data, le decisioni prese lungo la strada.

E la routine nel patto di convivenza.

## 4. Verifica di completezza

- Leggi la specifica di una voce a caso come se fossi il cliente: descrive ciò che hai chiesto,
  con le tue parole di origine? I criteri di accettazione sono quelli che useresti tu per dire "va
  bene"? C'è un caso limite che conosci e non c'è?
- Ogni voce pende da un nodo dell'albero? Ce n'è qualcuna appesa a un nodo che non riconosci?
- Ogni voce dice come si verifica? Una voce senza verifica non si può chiudere.
- Ci sono regole di business marcate come "mancante, chiesta" che non ti hanno chiesto?
- Ci sono voci "chiuse" senza prova né commit? Se ci sono, riaprile. Quelle chiuse conservano la
  loro specifica e la loro documentazione di chiusura?
- Prendi tre commit a caso: citano la loro voce?
- È comparso nel codice qualcosa che non ha una voce? Lì l'agente è uscito dal perimetro.

## 5. Segnali d'allarme

- Una voce è "in corso" da più di tre sessioni. O sono tre voci, o è bloccata da una decisione che
  nessuno ha preso (gradino 6).
- Ci sono più voci chiuse in un giorno che commit quel giorno. Si stanno chiudendo senza prova.
- Le specifiche sono di una riga. L'agente le ha scritte per adempiere, non per costruirci sopra;
  inventerà ciò che manca nel momento di costruire.
- La lista ha più di cinquanta voci aperte. Non è un piano, è un inventario di ansie: bisogna dare
  priorità e archiviare.
- Qualcuno chiede perché il sistema fa una certa cosa e la risposta non è in nessuna voce chiusa.
  La documentazione del fatto non si sta scrivendo.
