# Passo 0 — Questo progetto si può affrontare così? (contratto del gradino)

**Fase:** avvio (una volta per progetto, prima di aprire il repository).
**Forma:** conversazione (l'agente valuta e chiede; il proprietario decide).
**Dimensione:** obbligatorio in ogni progetto, per quanto piccolo. Richiede un'ora; fa risparmiare
mesi.
**Stato:** in elaborazione con Pablo. I criteri escludenti X1 e X2 sono confermati; i criteri che
pesano (da D1 a D10) sono ancora ipotesi senza peso.

## A cosa serve

A non infilarsi in un progetto in cui il metodo non può funzionare. Se l'agente non potrà
verificarsi da solo dall'inizio alla fine, o se non c'è un proprietario del dominio che decide, il
metodo degrada in "programmare con l'IA" e l'umano finisce per leggere codice. Questo gradino è la
porta d'ingresso: la si attraversa una volta, e se non la si può attraversare, meglio saperlo prima
che dopo.

C'è un'idea di fondo che conviene dire esplicitamente: **il metodo non serve per qualunque
progetto, e questo non è un difetto**. Un metodo che promette di servire per tutto non sta dicendo
niente. Ciò che fa questo gradino è mettere il confine per iscritto, perché la decisione di entrare
o no sia una decisione e non una speranza.

## 1. Contesto richiesto

Nominato in modo generico; l'agente valuta se basta e chiede ciò che manca.

- Rilevazione della richiesta: cosa vuole il cliente, per chi, e cosa succede oggi senza il
  sistema.
- Rilevazione tecnologica: quale tecnologia esiste o si propone, se esiste un sistema precedente,
  se quel sistema ha un repository e come è gestito.
- Rilevazione di testabilità: se le schermate si possono eseguire da programma e se ogni elemento
  dell'interfaccia è accessibile con i suoi diversi metodi (clic, digitazione, lettura di stato), in
  modo che un test percorra la schermata e verifichi l'effetto nel backend.
- Chi è il proprietario del dominio e quanto tempo ha per decidere.
- Quale conseguenza ha un errore (denaro, salute, esercizio, nessuna).
- Ambienti e accessi: se ci sarà un ambiente di test, se l'agente può accedervi, se la produzione è
  consultabile in sola lettura.

## 2. Prompt

I prompt sono in inglese, la lingua in cui i modelli seguono le istruzioni con più precisione e
meno token. Sotto ciascuno, la spiegazione in italiano di cosa stiamo chiedendo e perché ogni
clausola è lì.

**Iniziale:**

> We are going to assess whether this project can be run with the Urazuke method. Read the
> initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`. First, evaluate whether the survey is sufficient to answer
> every criterion. If any criterion cannot be answered from the survey, ask me for the missing
> information before going on; do not assume. Then fill in the sheet criterion by criterion:
> the answer, where it comes from, and for each exclusionary criterion whether it is green or
> red. Do not decide: present me the completed sheet with your reading and your doubts, and I
> will decide. Reply in my language.

Cosa stiamo chiedendo: che legga i due input (la rilevazione e la scheda dei criteri); che **prima
di rispondere valuti se la rilevazione basta** e, se non basta, chieda invece di supporre (questa
è la clausola centrale di tutti i prompt del metodo); che compili la scheda con la fonte di ogni
risposta, perché si possa poi rintracciare; che segni gli escludenti in verde o in rosso; e che
**non decida**, perché l'idoneità la decide il proprietario. L'ultima riga gli chiede di rispondere
nella lingua del proprietario, perché il prompt è in inglese ma la conversazione non deve esserlo.

**Di chiusura:**

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.

Cosa stiamo chiedendo: che lasci la decisione scritta con data e proprietario (gradino 6), con le
condizioni se ce ne sono, e con la traccia di domande e risposte, che è la prova che non ha
supposto nulla.

## 3. Risultato atteso

Un file `docs/ELIGIBILITY.md` (o il nome che usa il progetto), di una pagina, con:

- Data e chi ha deciso.
- I due criteri escludenti con la loro risposta e la loro fonte:
  - X1: c'è un repository accessibile e gestito in modo standard (o il progetto è nuovo).
  - X2: l'interfaccia si può eseguire da programma e ogni elemento è accessibile con i suoi
    diversi metodi, con verifica dell'effetto nel backend.
- I criteri che pesano (i D1–D10 della scala, quando saranno chiusi), ciascuno con risposta, fonte
  e peso.
- La decisione: va, non va, o va con condizioni, e le condizioni scritte.
- Le domande che l'agente ha fatto e le risposte, perché resti la traccia.

## 4. Verifica di completezza (la fa il proprietario, senza leggere codice)

- I due escludenti hanno risposta esplicita e fonte? Se uno è in rosso, la decisione è "non va" o
  c'è una condizione che lo risolve?
- C'è un criterio con risposta "suppongo di sì" o "probabilmente"? Se c'è, il gradino non è
  salito: l'agente doveva chiedere.
- La decisione è scritta con data e nome?
- Le condizioni (se ci sono) sono verificabili? ("Avere accesso in lettura alla produzione prima
  del gradino 3" sì; "che il cliente collabori" no.)

## 5. Segnali d'allarme

- L'agente ha compilato l'intera scheda senza fare una sola domanda. O la rilevazione era perfetta
  (non lo è mai) o ha supposto.
- La decisione è "va con condizioni" e le condizioni sono più di tre. Probabilmente è un "non va"
  che nessuno vuole dire.
- Al criterio X2 si è risposto "sì, con un po' di lavoro". Se le schermate non si possono operare
  da programma oggi, quel "po' di lavoro" è l'intero progetto.
