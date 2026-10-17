# Passo 15 — L'agente dentro il sistema, e la retrospettiva con i numeri (contratto del gradino)

**Fase:** esercizio (quando il sistema è già in produzione) e chiusura (torna al gradino 0 per il
progetto successivo).
**Forma:** due parti: una conversazione per definire il perimetro dell'agente residente, e un
invio lungo per la retrospettiva.
**Dimensione:** l'agente residente è facoltativo (molti sistemi non ne hanno bisogno; quelli con
utenti che chiedono supporto, sì). La retrospettiva è obbligatoria in ogni progetto, anche se di una
pagina: senza di essa il metodo non impara.

## A cosa serve

Due cose che chiudono lo stesso ciclo. Primo: l'agente resta residente in produzione, con perimetro
limitato, per diagnosticare, gestire e dare supporto senza che il costruttore debba esserci.
Secondo: il metodo stesso si rivede con i numeri, e ciò che si impara cambia la scala. Evita
l'agente che gestisce senza mappa del sistema, e il metodo che si ripete uguale progetto dopo
progetto senza imparare (la squadra multi-agente è stata chiusa con una retrospettiva: 60 dollari e
73 minuti contro 90 minuti).

Sull'agente residente, la regola che ordina tutto: **agisce a nome di qualcuno**. La sua
credenziale è associata a una persona responsabile, e tutto ciò che fa resta registrato a nome di
quella persona. Non è un account di sistema anonimo: è un dipendente con un capo. Questo definisce
il suo perimetro (ciò che quella persona gli ha autorizzato) e la sua tracciabilità (chi risponde di
ciò che ha fatto).

## 1. Contesto richiesto

Per l'agente residente:
- Cosa può fare l'agente in produzione e cosa no: leggere, diagnosticare, cambiare configurazione,
  eseguire azioni. Lo decide il proprietario.
- Come l'agente si identifica davanti al sistema (una credenziale propria, associata a una persona
  responsabile).
- Chi avvisa quando trova qualcosa che non può risolvere (ticket, email).

Per la retrospettiva:
- Gli incidenti del progetto, i costi (token, quota, tempo del proprietario), le voci in sospeso che
  hanno fatto più giri, e le date.

## 2. Prompt

**Per l'agente residente (iniziale):**

> We are going to leave you resident in production. First, build the map of the system you will
> need in order to operate it: modules, environments, where each configuration lives, which
> actions are consequential (read `docs/LOCKS.md`), whom to notify. If there are parts of the
> system you cannot see from where you are, tell me; the map must not have hidden gaps. Then
> propose your scope in three levels: read-only and diagnosis; configuration changes with my
> approval; consequential actions behind locks. I choose the level. Your credential acts as the
> person who created it: everything you do is logged under that person's name. Reply in my
> language.

Cosa stiamo chiedendo: la mappa del sistema prima di operare (operare senza mappa è il fallimento
che questo gradino evita); la clausola di completezza nella sua forma: **i buchi della mappa si
dichiarano, non si nascondono**; i tre livelli di perimetro perché il proprietario ne scelga uno e
non un "dipende"; e la regola della credenziale a nome di una persona.

**Per l'agente residente (di chiusura):**

> Level [X]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the credential (never its
> value), and the procedure to request my approval. Then prove, with a real attempt recorded in
> the log, that something outside your scope is rejected.

Cosa stiamo chiedendo: il documento dell'agente residente (senza il valore della credenziale, mai),
e la prova in rosso del perimetro: un tentativo reale, registrato, di fare qualcosa fuori dal
livello, rifiutato. È il gradino 7 applicato ai permessi.

**Per la retrospettiva:**

> [The stage / the project] is over. Do the retrospective with numbers, not impressions: what it
> cost (tokens, quota, my time), how many pending items, which ones took the most rounds and why,
> which incidents happened and which step of the ladder each falls into, and which step failed
> or was missing. If you lack the data for any figure (my time, for instance), ask me for it or
> mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder:
> which step is modified, how, and which incident justifies it. Write it to
> `docs/RETROSPECTIVE_[date].md`. Reply in my language.

Cosa stiamo chiedendo: numeri con fonte (costi, voci, giri, incidenti); ogni incidente ricondotto a
un gradino, perché un incidente che non cade in nessuno è un gradino che manca; la clausola di
completezza per i numeri che non ha (chiedere o segnare come stima); e **almeno una proposta
concreta di modifica alla scala**, perché una retrospettiva che non cambia nulla non è stata una
retrospettiva.

## 3. Risultato atteso

- `docs/RESIDENT_AGENT.md`: mappa del sistema, perimetro scelto, credenziale associata a una
  persona, procedura di approvazione, e la prova di rifiuto registrata nel log.
- `docs/RETROSPECTIVE_[date].md`: i numeri con la loro fonte, gli incidenti ricondotti ai gradini,
  e almeno una proposta di modifica alla scala con la sua giustificazione.

## 4. Verifica di completezza

- La mappa del sistema dice cosa l'agente NON può vedere? Se non lo dice, ha buchi nascosti.
- Hai provato (o visto nel log) che un'azione fuori dal perimetro viene rifiutata?
- La credenziale dell'agente agisce a nome di una persona identificabile?
- La retrospettiva ha numeri con fonte, o aggettivi? ("È costato molto" non è un numero.)
- Ogni incidente cade in un gradino? Se uno non cade in nessuno, manca un gradino: quella è la
  proposta di modifica.
- C'è almeno una proposta concreta di modifica alla scala? Se la retrospettiva non cambia nulla,
  non è stata una retrospettiva.

## 5. Segnali d'allarme

- L'agente residente "ha bisogno" di un livello di permessi più alto ogni settimana. Controlla se
  ciò che chiede serve a risolvere problemi del sistema o i suoi stessi limiti.
- La retrospettiva dice che è andato tutto bene. Non va mai tutto bene; è scritta per il
  proprietario, non per il metodo.
- Due progetti di fila hanno avuto lo stesso incidente e la scala non è cambiata tra l'uno e
  l'altro. Il gradino 15 non si sta chiudendo: si scrive la retrospettiva e non si applica.
