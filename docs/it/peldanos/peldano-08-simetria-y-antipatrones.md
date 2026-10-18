# Passo 8 — Simmetria tra produttore e consumatore, e il registro degli anti-pattern (contratto del gradino)

**Fase:** ciclo.
**Quando:** con ogni voce in sospeso che tocca un contratto tra due parti del sistema. La mappa dei
contratti si costruisce all'apertura del secondo blocco funzionale, quando ci sono già una
schermata e un server. Il registro degli anti-pattern cresce ogni volta che qualcosa si rompe per
la seconda volta.
**Forma:** automatica dentro il ciclo; più un file che cresce a ogni colpo.
**Dimensione:** la simmetria è obbligatoria sempre; la mappa produttore/consumatore è opzionale in
un progetto di un solo modulo, e obbligatoria appena ci sono una schermata e un server separati.

## A cosa serve

Quando cambi un'estremità (il server, il robot, lo schema del database), fai in modo che l'altra
estremità (la schermata, il contatore, il consumatore) cambi nello stesso commit. Altrimenti, prima
o poi divergono, e l'utente vede un numero da una parte e un altro numero dall'altra
[Ref. 26](../REFERENCIAS.md#ref-26). E gli errori che hai già pagato una volta, annotali per non
pagarli due volte [Ref. 2](../REFERENCIAS.md#ref-2).

Il principio generale che c'è dietro, che ho imposto alla Mutua e che vale per qualunque sistema
[Ref. 27](../REFERENCIAS.md#ref-27): **ogni lista ha un solo proprietario**. Le colonne di una
tabella, gli stati possibili di un ordine, le cause per cui qualcosa aspetta: le definisce una sola
parte del sistema (il produttore) e tutte le altre le leggono da lì. Appena ci sono due copie della
stessa lista, una è disallineata; resta solo da scoprire quale. L'albero semantico del gradino 2 è
il primo posto in cui quelle liste si dichiarano: gli stati di un'entità stanno lì, e il codice
deve leggerli da una sola fonte.

## 1. Contesto richiesto

- Una mappa di quali parti del sistema consumano cosa: quali schermate leggono quali servizi, quali
  processi scrivono quali tabelle. Se non esiste, il primo prompt la costruisce.
- Il registro degli anti-pattern `docs/GOTCHAS.md`, anche se è vuoto.

## 2. Prompt

**Per costruire la mappa (una volta):**

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

> [it]
> Costruisci `docs/PRODUCER_CONSUMER_MAP.md`: per ogni contratto del sistema (un servizio, una
> tabella, un formato di file, una lista di valori), chi lo produce e chi lo consuma. Se ci sono
> parti del sistema a cui non puoi accedere o che non capisci, dimmelo invece di lasciarle fuori
> dalla mappa. Rispondi nella mia lingua.

Cosa gli sto chiedendo: l'inventario dei contratti con i loro due lati, e la clausola di
completezza nella sua forma per questo gradino: ciò che non si vede si dichiara, non si omette. Una
mappa con buchi nascosti è peggio di nessuna mappa.

**Routine (va nel patto di convivenza):**

> Before closing any change that touches a contract, look up every consumer in the map and
> update them in the same commit. Always prefer that the producer defines the list (columns,
> causes, states) and the consumer reads it, rather than each keeping its own copy. If the map
> does not have that relationship, add it.

> [it]
> Prima di chiudere qualunque modifica che tocchi un contratto, cerca nella mappa ogni consumatore
> e aggiornali nello stesso commit. Preferisci sempre che il produttore definisca la lista
> (colonne, cause, stati) e il consumatore la legga, invece che ciascuno tenga la propria copia. Se
> la mappa non ha quella relazione, aggiungila.

Cosa gli sto chiedendo: la simmetria come riflesso (cercare l'altro lato prima di chiudere), la
regola della lista con un solo proprietario, e che la mappa si mantenga da sola man mano che la si
usa.

**Quando qualcosa si rompe per la seconda volta:**

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

> [it]
> Questo ci è già successo. Registralo in `docs/GOTCHAS.md` con: che odore ha (il segnale
> precoce), la causa radice, la correzione, e come rilevarlo la prossima volta prima che faccia
> male. E aggiungi, se si può, un test o una verifica automatica che lo rilevi.

Cosa gli sto chiedendo: il formato fisso di un anti-pattern (odore, causa radice, correzione,
rilevamento precoce) e, soprattutto, la verifica automatica: un anti-pattern annotato e non
automatizzato si ripeterà quando cambia la persona o la sessione.

## 3. Risultato atteso

- `docs/PRODUCER_CONSUMER_MAP.md`: la lista dei contratti con produttore e consumatori.
- In ogni commit che tocca un contratto: i consumatori aggiornati, nominati nel messaggio.
- `docs/GOTCHAS.md`: una voce per anti-pattern, con le quattro parti (odore, causa radice,
  correzione, come rilevarlo prima), e la data della prima volta.

## 4. Verifica di completezza

- Scegli un contratto della mappa e chiedi all'agente di mostrarti dove lo legge ogni consumatore.
  Se qualcuno ha la propria copia della lista, c'è debito.
- C'è un numero che si mostra in due schermate diverse? Confronta: danno lo stesso risultato?
- Ogni voce di GOTCHAS ha le quattro parti?
- Si è ripetuto un errore che era già in GOTCHAS? Se sì, manca la verifica automatica.

## 5. Segnali d'allarme

- Lo stesso valore compare scritto a mano in più di un file ("IN SOSPESO", "APPROVATA" nel server
  e nella schermata). Due copie; una divergerà.
- Una modifica al server si è chiusa con il test del server in verde e nessuno ha toccato la
  schermata.
- GOTCHAS ha voci senza la parte "come rilevarlo prima". Sono aneddoti, non anti-pattern.
