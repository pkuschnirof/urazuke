# Passo 9 — Misurare prima di costruire, con uno strumento che a sua volta si verifica (contratto del gradino)

**Fase:** ciclo (ogni volta che un numero alimenta una decisione).
**Forma:** un solo invio per misurazione; a volte una conversazione quando l'ipotesi è del
proprietario.
**Dimensione:** proporzionale. In un progetto piccolo, "misurare" può essere contare con un comando
e annotare il numero con la data; il cricchetto e il budget di query sono per sistemi con volume.
Ciò che non cambia con la dimensione: nessun numero che decide qualcosa esce da un'impressione.

## A cosa serve

Perché ogni numero che alimenta una decisione esca da un programma con test, e non da una ricerca
di testo, da un'impressione, né da "mi sembra che siano un centinaio". E perché lo strumento stesso
sia sottoposto ad audit, perché i misuratori mentono: in Kikan uno non vedeva 84 chiamate con il
contatore a zero, e un altro diceva 27 quando erano 44. Le cinque regole sono: misuratore con
guardia; se lo strumento non esiste si costruisce; si fa l'audit in due direzioni; l'approssimato si
segna; e chi esegue verifica i numeri di chi ha pianificato.

C'è una ragione di fondo perché questo gradino esista: il modello è molto bravo a produrre
affermazioni con numero ("ci sono circa 120 cicli di questo tipo") e quelle affermazioni suonano
esattamente uguali quando sono misurate e quando sono stimate. Il proprietario non ha modo di
distinguerle dal tono. L'unico modo è esigere lo strumento: "con cosa l'hai misurato? mostrami il
comando". Se non c'è un comando, è un'impressione, per quanti decimali abbia.

## 1. Contesto richiesto

- L'ipotesi, del proprietario o dell'agente: "credo che il problema sia X", "devono essere un
  centinaio".
- Accesso a ciò che si vuole misurare: il codice, il database in sola lettura, il log.
- I misuratori che già esistono nel repository, se ci sono.

## 2. Prompt

**Iniziale:**

> Before building anything, we are going to measure. The hypothesis is: [X]. Write a meter (a
> script that lives in the repository) that measures [the quantity], and a test for the meter
> that checks it against a known case where the answer is known in advance. If measuring
> requires access or data you lack, ask me; do not approximate silently. If some part can only
> be approximated, mark it as approximate and tell me the margin. Run the meter, show me the
> number together with the command that produces it, and audit it in both directions: from the
> code to the measurement (is everything that should be counted, counted?) and from the
> measurement to the code (does everything counted actually exist?). Only then propose what to
> build. Reply in my language.

Cosa stiamo chiedendo, clausola per clausola: il misuratore **nel repository** (non un comando
sciolto che si perde); il **test del misuratore** contro un caso noto (la guardia); la clausola di
completezza nella sua forma per misurare (chiedere l'accesso, non approssimare in silenzio); segnare
l'approssimato con il suo margine; il numero **con il comando** che lo produce, perché il
proprietario possa eseguirlo; l'audit in due direzioni, che è ciò che ha smascherato i due
misuratori che mentivano; e l'ordine: prima misurare, poi proporre.

**Quando c'è un budget:**

> Set the budget for [queries / loops / time] on this path at the measured value plus a small
> margin, and protect it with a test that fails if it is exceeded. Tell me the number and the
> margin.

Cosa stiamo chiedendo: che il budget sia il misurato più poco, non un numero tondo, e che abbia un
test che fallisce se viene superato. Così una regressione di prestazioni compare nella batteria e
non in produzione.

**Quando chi ha pianificato ha dato numeri (regola cinque):**

> Before executing the plan, verify every number the plan asserts with the meter. If any does
> not match, stop and tell me; do not execute on a wrong number.

Cosa stiamo chiedendo: che chi esegue non si fidi dei numeri di chi ha pianificato, anche se è lo
stesso modello in un'altra sessione. In Kikan, tre affermazioni su quattro del piano erano
sbagliate; dove c'era uno strumento, il numero era esatto.

## 3. Risultato atteso

- Il misuratore nel repository (`tools/measure_*.py`, `scripts/meter-*.mjs` o simile), con il suo
  test.
- Il numero, con il comando che lo produce e la data.
- L'audit in due direzioni, scritto in due o tre righe.
- L'approssimato segnato come tale, con il suo margine.
- Se c'è un budget: il valore, il margine, e il test che lo protegge.
- Nel commit: "measured: [number] with [meter]".

## 4. Verifica di completezza

- Riesci a eseguire tu il comando del misuratore e ti dà lo stesso numero? (Lo esegui tu; non
  serve capirlo, solo eseguirlo.)
- Il misuratore ha un test? Contro quale caso noto?
- C'è un numero nel rapporto senza misuratore dietro? Chiedi da dove viene.
- L'approssimato è segnato?
- Se il piano portava numeri, l'agente li ha verificati prima di eseguire e ti ha detto quali non
  tornavano?

## 5. Segnali d'allarme

- Un numero è cambiato tra due rapporti senza che il codice cambiasse. Uno dei due non è stato
  misurato.
- Il misuratore dà zero. Quasi mai è zero; quasi sempre il misuratore non vede qualcosa (in Kikan,
  due volte).
- L'agente propone di costruire "mentre misura", per guadagnare tempo. L'ordine è il metodo: prima
  il numero, poi il piano.
