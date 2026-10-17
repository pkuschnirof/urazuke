# Passo 2 — La definizione del progetto e la lettura obbligatoria (contratto del gradino)

**Fase:** avvio (una volta; si tiene aggiornata per tutto il progetto).
**Forma:** conversazione (l'agente redige, chiede ciò che manca, il proprietario corregge).
**Dimensione:** obbligatorio in ogni progetto. In uno piccolo, il file di progetto può avere
cinquanta righe; ciò che non può è non esistere.

## A cosa serve

Ogni sessione dell'agente parte da zero: non si ricorda di ieri. Dunque gli serve una mappa, breve,
che gli dica cos'è il progetto, in che stato è e quali decisioni sono già state prese. E gli serve
l'obbligo di leggerla prima di toccare qualunque cosa. Il fallimento che evita è doppio: lavoro da
buttare per non aver letto la mappa, e la mappa che cresce fino a diventare illeggibile (in uno dei
sistemi di origine il file di progetto arrivò a 9.661 righe, e in quello stato non lo legge nessuno,
nemmeno il modello).

La regola pratica che esce da quel colpo: **il file di progetto è il programma, non la storia**.
Ciò che è successo va altrove (il registro delle voci in sospeso, lo stato vivo, il diario); il file
di progetto dice cos'è il sistema, per chi, cosa non è, e cosa si è deciso.

## 1. Contesto richiesto

- Rilevazione del business: cosa fa il cliente, chi usa il sistema, quale problema risolve, cosa
  non deve fare.
- Il patto di convivenza (gradino 1).
- Se esiste un sistema precedente: accesso in lettura al suo codice o alla sua documentazione.
- Le decisioni già prese, se ce ne sono, anche solo a voce.

## 2. Prompt

**Iniziale:**

> We are going to define the project in writing. Read the business survey in
> `docs/INITIAL_SURVEY.md` and the working agreement in `docs/WORKING_AGREEMENT.md`. Evaluate
> whether the survey is sufficient to describe the system, its users and its boundaries; if it
> is not, ask me for what is missing before writing anything. Then write `PROJECT.md`, three
> hundred lines at most, with: what the system is and for whom; what it is NOT; the main
> modules as a list; the decisions already made, each with its date; and the instruction to
> read this file and the working agreement at the start of every session. Separately, create
> `docs/STATUS.md` for the living state (what is being worked on, what is open): that file
> changes every day; `PROJECT.md` almost never does. Reply in my language.

Cosa stiamo chiedendo: che valuti la rilevazione e chieda prima di redigere; che il file di
progetto sia **breve** (il tetto di trecento righe è arbitrario ma necessario: senza tetto, cresce);
che dica esplicitamente cosa il sistema **non** è, perché ciò che non è detto è ciò che il modello
inventerà; che le decisioni abbiano una data; e che separi lo stato vivo in un altro file, perché il
file di progetto non diventi storia.

**Di chiusura:**

> Apply these corrections: [list]. Finalize `PROJECT.md` with today's date. Add to the working
> agreement that the change history never goes into `PROJECT.md`: it goes to `docs/STATUS.md`
> or to the pending-items register.

Cosa stiamo chiedendo: le correzioni del proprietario, la data, e una regola nuova nel patto che
protegga il file di progetto dal diventare changelog. Quella regola è ciò che mancava nel caso delle
9.661 righe.

## 3. Risultato atteso

- `PROJECT.md` (o `CLAUDE.md`): breve, a lettura obbligatoria, con cos'è, per chi, cosa non è,
  moduli, decisioni con data, e l'ordine di leggerlo. Massimo trecento righe.
- `docs/STATUS.md`: stato vivo, separato dal precedente.
- In entrambi, una data di ultimo aggiornamento.
- Nel patto, la regola che la storia non va in `PROJECT.md`.

## 4. Verifica di completezza

- `PROJECT.md` sta in una lettura di cinque minuti? Se no, è sbagliato: è il programma, non la
  storia.
- Dice esplicitamente cosa il sistema NON fa? (Ciò che manca è ciò che l'agente inventerà.)
- Ogni decisione ha una data e chi l'ha presa?
- L'agente ha chiesto qualcosa sul business prima di redigere? Se non ha chiesto nulla, controlla
  cosa ha supposto.
- Lo stato vivo è in un altro file?

## 5. Segnali d'allarme

- Il file di progetto è cresciuto di oltre il 20 % in un mese. Qualcosa che non è programma sta
  entrando.
- L'agente comincia una sessione proponendo qualcosa che è già deciso e scritto. Non ha letto la
  mappa: l'aggancio della lettura obbligatoria ha fallito.
- La sezione "cosa non è" è vuota o dice "niente in particolare". Ogni sistema ha dei limiti; se
  non sono scritti, il modello li oltrepasserà.
