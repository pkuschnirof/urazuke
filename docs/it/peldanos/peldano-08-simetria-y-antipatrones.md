# Passo 8 — Simmetria tra produttore e consumatore, e il registro degli anti-pattern (contratto del gradino)

**Fase:** ciclo (ogni modifica che tocca un contratto tra due parti).
**Forma:** automatica nel ciclo; più un file che cresce a ogni colpo duro.
**Dimensione:** la simmetria è sempre obbligatoria; la mappa produttore/consumatore è facoltativa
in un progetto a modulo singolo, e obbligatoria appena ci sono una schermata e un server separati.

## A cosa serve

Quando cambi un'estremità (il server, il robot, lo schema del database), l'altra estremità (la
schermata, il contatore, il consumatore) deve cambiare nello stesso commit. Altrimenti, presto o
tardi divergono, e l'utente vede un numero da una parte e un altro numero dall'altra (il caso 1.355
contro 1.234). E gli errori che abbiamo già pagato una volta si annotano per non pagarli due volte.

Il principio generale dietro: **ogni lista ha un solo proprietario**. Le colonne di una tabella,
gli stati possibili di un ordine, le cause per cui qualcosa attende: le definisce una sola parte
del sistema (il produttore) e tutte le altre le leggono da lì. Appena ci sono due copie della
stessa lista, una delle due è disallineata; manca solo sapere quale.

## 1. Contesto richiesto

- Una mappa di quali parti del sistema consumano cosa: quali schermate leggono quali servizi,
  quali processi scrivono quali tabelle. Se non esiste, il primo prompt la costruisce.
- Il registro degli anti-pattern `docs/GOTCHAS.md`, anche se vuoto.

## 2. Prompt

**Per costruire la mappa (una volta):**

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

Cosa stiamo chiedendo: l'inventario dei contratti con le loro due parti, e la clausola di
completezza nella sua forma per questo gradino: ciò che non si vede si dichiara, non si omette. Una
mappa con buchi nascosti è peggio di nessuna mappa.

**Routine (va nel patto di convivenza):**

> Before closing any change that touches a contract, look up every consumer in the map and
> update them in the same commit. Always prefer that the producer defines the list (columns,
> causes, states) and the consumer reads it, rather than each keeping its own copy. If the map
> does not have that relationship, add it.

Cosa stiamo chiedendo: la simmetria come riflesso (cercare l'altra parte prima di chiudere), la
regola della lista con un solo proprietario, e che la mappa si mantenga da sola man mano che si usa.

**Quando qualcosa si rompe per la seconda volta:**

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

Cosa stiamo chiedendo: il formato fisso di un anti-pattern (odore, causa radice, correzione,
rilevamento precoce) e, soprattutto, la verifica automatica: un anti-pattern annotato e non
automatizzato si ripeterà quando cambia la persona o la sessione.

## 3. Risultato atteso

- `docs/PRODUCER_CONSUMER_MAP.md`: la lista dei contratti con produttore e consumatori.
- In ogni commit che tocca un contratto: i consumatori aggiornati, nominati nel messaggio.
- `docs/GOTCHAS.md`: una voce per anti-pattern, con le quattro parti (odore, causa radice,
  correzione, come rilevarlo prima), e la data della prima volta.

## 4. Verifica di completezza

- Scegli un contratto dalla mappa e chiedi all'agente di mostrarti dove ogni consumatore lo legge.
  Se qualcuno ha la propria copia della lista, c'è debito.
- C'è un numero mostrato su due schermate diverse? Confronta: sono uguali?
- Ogni voce di GOTCHAS ha le quattro parti?
- Si è ripetuto un errore già in GOTCHAS? Se sì, manca la verifica automatica.

## 5. Segnali d'allarme

- Lo stesso valore compare scritto a mano in più di un file ("IN SOSPESO", "APPROVATA" nel server
  e nella schermata). Due copie; una divergerà.
- Una modifica al server è stata chiusa con il test del server in verde e nessuno ha toccato la
  schermata.
- GOTCHAS ha voci senza la parte "come rilevarlo prima". Sono aneddoti, non anti-pattern.
