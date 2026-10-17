# Passo 5 — Il piano sono le voci in sospeso (contratto del gradino)

**Fase:** ciclo (si usa a ogni modifica, per tutto il progetto).
**Forma:** un solo invio alla creazione; poi, routine di ogni sessione.
**Dimensione:** obbligatorio in ogni progetto. È il gradino che rende tracciabili tutti gli altri:
senza voci in sospeso numerate non c'è dove appendere la prova.

## A cosa serve

Perché ci sia un'unica coda di lavoro, con ordine e con cancello, che sia la verità del progetto.
Non c'è "piano" da una parte e "compiti" dall'altra: la lista delle voci in sospeso È il piano.
Evita la specifica che viene superata in due settimane e resta obsoleta, e il lavoro di cui nessuno
sa perché è stato fatto.

Una voce in sospeso ben scritta ha tre cose che una voce di una lista di cose da fare di solito non
ha: da dove viene (la decisione o la richiesta che l'ha originata), come si verifica che è fatta, e
la prova con cui è stata chiusa. La prima evita che il lavoro perda la sua ragione; la seconda evita
che si chiuda con "fatto"; la terza è ciò che il proprietario guarda invece di guardare il codice.

## 1. Contesto richiesto

- La specifica o la richiesta iniziale del cliente, per quanto incompleta.
- Gli audit, se ce ne sono già stati.
- `PROJECT.md` e `docs/STATUS.md`.

## 2. Prompt

**Per creare il registro:**

> We are going to turn everything that must be done into numbered pending items. Read
> `PROJECT.md`, the client's request and whatever is in `docs/STATUS.md`. If the request is
> ambiguous on any point such that you cannot write a verifiable pending item for it, ask me;
> do not resolve it by assuming. Create `docs/PENDING.md` with one item per thing to do: number
> (PND-001 onwards), one-line title, what is requested, which decision originates it (or
> "client request, date"), how it will be verified as done, and status. Order them by the
> priority I gave you; if I gave none, propose an order and tell me why. Reply in my language.

Cosa stiamo chiedendo: che converta la richiesta in voci verificabili e che **chieda quando la
richiesta non permette di scriverne una verificabile** (l'ambiguità si risolve chiedendo, non
scegliendo); i campi di ogni voce, in particolare "come si verifica", che è ciò che poi permette di
chiuderla con una prova; e un ordine proposto con la sua ragione, perché il proprietario lo
confermi o lo cambi.

**Routine di ogni sessione (va nel patto di convivenza o in `PROJECT.md`):**

> Before touching any code, open `docs/PENDING.md`, tell me which item you are taking and why.
> Every commit cites its pending item. A pending item is closed with written evidence (the test,
> the screenshot, the number), never with "done". If along the way you see something that is not
> on the list, add it as a new pending item; do not do it.

Cosa stiamo chiedendo: la disciplina di ogni sessione: annunciare cosa si prende, citare la voce in
ogni commit, chiudere con una prova, e **annotare invece di fare** ciò che compare fuori dalla
lista. Quest'ultima clausola è quella che protegge il perimetro esatto quando il modello "vede
qualcos'altro".

## 3. Risultato atteso

`docs/PENDING.md` (o lo strumento che usa il progetto) con, per voce:

- Numero, titolo, stato (aperta / in corso / chiusa), data di apertura e di chiusura.
- Cosa si chiede, in due o tre frasi.
- Origine: la decisione o la richiesta, con data.
- Come si verifica che è fatta: il test, la schermata, il numero.
- Alla chiusura: la prova e il commit.

E la routine nel patto o in `PROJECT.md`.

## 4. Verifica di completezza

- Ogni voce dice come si verifica? Una voce senza verifica non si può chiudere.
- Ci sono voci "chiuse" senza prova né commit? Se ci sono, riaprile.
- Prendi tre commit a caso: citano la loro voce?
- È comparso nel codice qualcosa che non ha una voce? Lì l'agente è uscito dal perimetro.
- L'agente ti ha chiesto dei punti ambigui della richiesta, o li ha risolti da solo?

## 5. Segnali d'allarme

- Una voce è "in corso" da più di tre sessioni. O sono tre voci, o è bloccata da una decisione che
  nessuno ha preso (gradino 6).
- Ci sono più voci chiuse in un giorno che commit in quel giorno. Si stanno chiudendo senza prova.
- La lista ha più di cinquanta voci aperte. Non è un piano, è un inventario di ansie: bisogna
  dare priorità e archiviare.
