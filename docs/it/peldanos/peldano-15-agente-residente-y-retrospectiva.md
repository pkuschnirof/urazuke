# Passo 15 — L'agente dentro il sistema, e la retrospettiva con i numeri (contratto del gradino)

**Fase:** esercizio e chiusura.
**Quando:** l'agente residente, all'entrata in esercizio, dopo il primo deployment in produzione.
La retrospettiva, alla chiusura di ogni tappa e del progetto; torna al gradino 0 per il progetto
successivo.
**Forma:** due parti: una conversazione per definire il perimetro dell'agente residente, e un invio
lungo per la retrospettiva.
**Dimensione:** l'agente residente è opzionale (molti sistemi non ne hanno bisogno; quelli con
utenti che chiedono supporto, sì). La retrospettiva è obbligatoria in ogni progetto, anche se è di
una pagina: senza di essa il metodo non impara.

## A cosa serve

Due cose che chiudono lo stesso ciclo. Primo: lascia l'agente residente in produzione, con
perimetro limitato, per diagnosticare, operare e dare supporto senza che tu debba esserci
[Ref. 13](../REFERENCIAS.md#ref-13). Secondo: rivedi il metodo stesso con i numeri, e lascia che
ciò che si impara cambi la scala. Evita l'agente che opera senza mappa del sistema, e il metodo che
si ripete uguale progetto dopo progetto senza imparare. La retrospettiva con i numeri che mi ha
portato a eliminare un'intera squadra di agenti è il modello della seconda
[Ref. 6](../REFERENCIAS.md#ref-6).

Sull'agente residente, la regola che ordina tutto: **agisce a nome di qualcuno**. La sua
credenziale è associata a una persona responsabile, e tutto ciò che fa resta registrato a nome di
quella persona. Non è un account di sistema anonimo: è un dipendente con un capo. Questo definisce
il suo perimetro (ciò che quella persona gli ha autorizzato) e la sua tracciabilità (chi risponde
di ciò che ha fatto).

## 1. Contesto richiesto

Quello che segue è la lista generica. I file concreti che devi avere pronti prima di ogni
prompt, con il loro contenuto e il loro stato minimo, stanno nella sezione 2, nel blocco "Prima di
inviare il prompt" che precede ciascuno.

Per l'agente residente:
- Cosa può fare l'agente in produzione e cosa no: leggere, diagnosticare, cambiare configurazione,
  eseguire azioni. Lo decidi tu.
- Come si identifica l'agente davanti al sistema (una credenziale propria, associata a una persona
  responsabile).
- A chi avvisa quando trova qualcosa che non può risolvere (ticket, email).

Per la retrospettiva:
- Gli incidenti del progetto, i costi (token, quota, il tuo tempo), le voci in sospeso che hanno
  fatto più giri, e le date.

## 2. Prompt

**Per l'agente residente (iniziale):**

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business con te), non
l'agente:

- La decisione di lasciare un agente residente, presa con il proprietario e scritta: per cosa
  (supporto, diagnosi) e con quali limiti iniziali.
- Una credenziale propria per l'agente in produzione, creata da te, associata a una persona
  responsabile con nome, con il perimetro minimo (sola lettura, per cominciare); il valore, fuori
  dalla chat e dal repository.
- `docs/LOCKS.md` (gradino 12) e `docs/DEPLOYMENT.md` (gradino 13), aggiornati: il prompt gli
  chiede di leggere il primo.
- A chi avvisa l'agente quando trova qualcosa che non può risolvere: un canale (ticket, email)
  deciso da te.
- Stato minimo accettabile: la credenziale esiste, ha un proprietario umano, ed è in sola
  lettura.

> We are going to leave you resident in production. First, build the map of the system you will
> need in order to operate it: modules, environments, where each configuration lives, which
> actions are consequential (read `docs/LOCKS.md`), whom to notify. If there are parts of the
> system you cannot see from where you are, tell me; the map must not have hidden gaps. Then
> propose your scope in three levels: read-only and diagnosis; configuration changes with my
> approval; consequential actions behind locks. I choose the level. Your credential acts as the
> person who created it: everything you do is logged under that person's name. Reply in my
> language.

> [it]
> Ti lasceremo residente in produzione. Prima, costruisci la mappa del sistema di cui avrai
> bisogno per operarlo: moduli, ambienti, dove vive ogni configurazione, quali azioni hanno
> conseguenze (leggi `docs/LOCKS.md`), chi avvisare. Se ci sono parti del sistema che non puoi
> vedere da dove sei, dimmelo; la mappa non può avere buchi nascosti. Poi proponi il tuo perimetro
> in tre livelli: sola lettura e diagnosi; modifiche di configurazione con la mia approvazione;
> azioni con conseguenze dietro lucchetti. Io scelgo il livello. La tua credenziale agisce come la
> persona che l'ha creata: tutto ciò che fai resta registrato a nome di quella persona. Rispondi
> nella mia lingua.

Cosa gli sto chiedendo: la mappa del sistema prima di operare (operare senza mappa è il fallimento
che questo gradino evita); la clausola di completezza nella sua forma: **i buchi della mappa si
dichiarano, non si nascondono**; i tre livelli di perimetro perché tu ne scelga uno e non un
"dipende"; e la regola della credenziale a nome di una persona.

**Per l'agente residente (di chiusura):**

**Prima di inviare il prompt**, devi avere questo a portata di mano:

- La mappa e i tre livelli che l'agente ha proposto, letti da te, e la tua scelta del livello (per
  cominciare, sempre il primo).
- Un'azione concreta fuori dal perimetro scelto, pensata da te, perché l'agente la tenti e tu veda
  il rifiuto nel log (con il livello 1, per esempio: cambiare una configurazione).
- Stato minimo accettabile: hai scelto il livello e sai quale tentativo deve fallire.

> Level [X]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the credential (never its
> value), and the procedure to request my approval. Then prove, with a real attempt recorded in
> the log, that something outside your scope is rejected.

> [it]
> Livello [X]. Scrivi in `docs/RESIDENT_AGENT.md` la mappa, il perimetro, la credenziale (mai il
> suo valore), e la procedura per chiedere la mia approvazione. Poi dimostra, con un tentativo
> reale registrato nel log, che qualcosa fuori dal tuo perimetro viene rifiutato.

Cosa gli sto chiedendo: il documento dell'agente residente (senza il valore della credenziale,
mai), e la prova in rosso del perimetro: un tentativo reale, registrato, di fare qualcosa fuori dal
livello, rifiutato. È il gradino 7 applicato ai permessi.

**Per la retrospettiva:**

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business con te), non
l'agente:

- I numeri che hai solo tu, raccolti prima: quante ore ci hai dedicato (dal tuo calendario, non a
  memoria), quanto hai speso nello strumento di IA (la fattura o il pannello dei consumi), quanta
  quota di integrazione continua si è usata, e le date di inizio e di fine della tappa. Scrivili
  in `docs/RETROSPECTIVE_INPUTS.md`, o daglieli nella chat quando li chiede.
- La lista degli incidenti della tappa, come li ricordi tu, con data approssimativa, per
  confrontare con ciò che l'agente ricava dalle voci in sospeso e dai commit. Ciò che tu ricordi e
  l'agente non trova è un buco di documentazione, e vale la pena annotarlo.
- `docs/PENDING.md` con le voci chiuse documentate (gradino 5) e `docs/DECISIONS.md` (gradino 6),
  che sono la fonte dei numeri.
- Stato minimo accettabile: le ore e i soldi sono annotati con la loro fonte. Senza di ciò, la
  retrospettiva si fa con gli aggettivi.

> [The stage / the project] is over. Do the retrospective with numbers, not impressions: what it
> cost (tokens, quota, my time), how many pending items, which ones took the most rounds and why,
> which incidents happened and which step of the ladder each falls into, and which step failed
> or was missing. If you lack the data for any figure (my time, for instance), ask me for it or
> mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder:
> which step is modified, how, and which incident justifies it. Write it to
> `docs/RETROSPECTIVE_[date].md`. Reply in my language.

> [it]
> [La tappa / il progetto] è finita. Fai la retrospettiva con i numeri, non con le impressioni:
> quanto è costata (token, quota, il mio tempo), quante voci in sospeso, quali hanno fatto più giri
> e perché, quali incidenti ci sono stati e in quale gradino della scala cade ciascuno, e quale
> gradino ha fallito o mancava. Se non hai il dato per qualche cifra (il mio tempo, per esempio),
> chiedimelo o marcalo come stima; non inventarlo. Termina con una proposta concreta di modifica
> alla scala: quale gradino si modifica, come, e quale incidente lo giustifica. Scrivila in
> `docs/RETROSPECTIVE_[data].md`. Rispondi nella mia lingua.

Cosa gli sto chiedendo: numeri con la fonte (costi, voci in sospeso, giri, incidenti); ogni
incidente ricondotto a un gradino, perché un incidente che non cade in nessuno è un gradino che
manca; la clausola di completezza per i numeri che non ha (chiedere o marcare come stima); e
**almeno una proposta concreta di modifica alla scala**, perché una retrospettiva che non cambia
nulla non è stata una retrospettiva.

## 3. Risultato atteso

- `docs/RESIDENT_AGENT.md`: mappa del sistema, perimetro scelto, credenziale associata a una
  persona, procedura di approvazione, e la prova di rifiuto registrata nel log.
- `docs/RETROSPECTIVE_[data].md`: i numeri con la loro fonte, gli incidenti ricondotti ai gradini,
  e almeno una proposta di modifica alla scala con la sua giustificazione.

## 4. Verifica di completezza

- La mappa del sistema dice cosa NON può vedere l'agente? Se non lo dice, ha buchi nascosti.
- Hai provato (o visto nel log) che un'azione fuori dal perimetro viene rifiutata?
- La credenziale dell'agente agisce a nome di una persona identificabile?
- La retrospettiva ha numeri con la fonte, o aggettivi? ("È costata molto" non è un numero.)
- Ogni incidente cade in un gradino? Se uno non cade in nessuno, manca un gradino: quella è la
  proposta di modifica.
- C'è almeno una proposta concreta di modifica alla scala? Se la retrospettiva non cambia nulla,
  non è stata una retrospettiva.

## 5. Segnali d'allarme

- L'agente residente "ha bisogno" di un livello di permessi più alto ogni settimana. Controlla se
  ciò che chiede serve a risolvere problemi del sistema o i suoi stessi limiti.
- La retrospettiva dice che è andato tutto bene. Non va mai tutto bene; è scritta per te, non per
  il metodo.
- Due progetti di fila hanno avuto lo stesso incidente e la scala non è cambiata tra l'uno e
  l'altro. Il gradino 15 non si sta chiudendo: si scrive la retrospettiva e non si applica.
