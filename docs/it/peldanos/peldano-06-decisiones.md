# Passo 6 — Le decisioni si scrivono accanto al codice (contratto del gradino)

**Fase:** ciclo.
**Quando:** in ogni sessione del ciclo, ogni volta che l'agente si imbatte in una regola di
business non scritta o in una biforcazione che cambia ciò che l'utente vede. Di solito sono due o
tre per blocco. Anche nell'avvio (gradini 0 e 3) e nell'uscita in produzione (12 e 13).
**Forma:** conversazione breve: l'agente rileva che c'è una decisione, chiede, e la lascia
scritta.
**Dimensione:** obbligatorio in ogni progetto. In uno piccolo il registro può essere una tabella
di dieci righe; ciò che conta è che le regole di business abbiano un proprietario.

## A cosa serve

Fa' che ogni regola di business e ogni decisione strutturale abbia proprietario, data e luogo.
Altrimenti, in sei settimane nessuno sa se "approvata più saldo torna in coda" è stata una
decisione del cliente o un'idea dell'agente. Ed evita il peggio: l'agente che inventa regole di
dominio perché gli sono sembrate ragionevoli.

Questo ha una conseguenza che voglio dire ad alta voce: il modello, quando si trova davanti a un
buco nelle regole, **lo riempie**. Non si ferma; completa con ciò che gli sembra più probabile, e
lo fa con la stessa naturalezza con cui scrive il resto. Per questo la routine di questo gradino
non è "scrivi le decisioni" ma "fermati e chiedi quando ne manca una". La seconda è la parte
difficile, ed è ciò che bisogna esigere nel patto. La pratica di lasciare la regola scritta nel
commit, con le mie parole e la data, l'ho imposta alla Mutua [Ref. 29](../REFERENCIAS.md#ref-29),
e quella di congelare le decisioni prima di costruire viene dal mio strumento
[Ref. 5](../REFERENCIAS.md#ref-5).

## 1. Contesto richiesto

Quello che segue è la lista generica. I file concreti che devi avere pronti prima di ogni
prompt, con il loro contenuto e il loro stato minimo, stanno nella sezione 2, nel blocco "Prima di
inviare il prompt" che precede ciascuno.

- La conversazione con il proprietario: è l'unico contesto. L'agente non può decidere regole di
  business.
- Un luogo concordato dove si scrivono le decisioni: il messaggio del commit, la specifica della
  voce in sospeso, e un registro `docs/DECISIONS.md`.

## 2. Prompt

**Routine (va nel patto di convivenza):**

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business con te), non
l'agente:

- `docs/WORKING_AGREEMENT.md` (gradino 1), dove va la routine.
- `docs/DECISIONS.md`, creato anche se vuoto, con il formato nell'intestazione: data, chi ha
  deciso, le parole testuali, la voce in sospeso che la richiedeva. Lo crei tu o lo chiedi
  all'agente nella stessa sessione; ciò che importa è che il luogo concordato esista prima della
  prima decisione.
- Tu, disponibile. Questa routine funziona solo se, quando l'agente si ferma e chiede, qualcuno
  risponde in ore e non in settimane. Se il proprietario del dominio è un'altra persona, concorda
  con lui il canale e il tempo di risposta prima di incollare il prompt.
- Stato minimo accettabile: il registro esiste e c'è qualcuno che decide.

> Whenever implementing something requires a business rule that is not written down, or you
> must choose between two approaches that change what the user sees, stop and ask me, in prose,
> with your recommendation and the alternative. Do not implement the one you prefer. When I
> decide, write the decision with my name and the date in the commit message, in the pending
> item's specification and in `docs/DECISIONS.md`, with the exact words I used. If I do not
> answer and you must move on, implement the most reversible option and mark it "decision by
> omission, pending confirmation", so that I can review it.

> [it]
> Ogni volta che implementare qualcosa richiede una regola di business che non è scritta, o devi
> scegliere tra due approcci che cambiano ciò che l'utente vede, fermati e chiedimelo, in prosa,
> con la tua raccomandazione e l'alternativa. Non implementare quella che preferisci. Quando io
> decido, scrivi la decisione con il mio nome e la data nel messaggio del commit, nella specifica
> della voce in sospeso e in `docs/DECISIONS.md`, con le parole esatte che ho usato. Se non
> rispondo e devi proseguire, implementa l'opzione più reversibile e marcala come "decisione per
> omissione, in attesa di conferma", perché io la riveda.

Cosa gli sto chiedendo: che si **fermi** davanti a una regola non scritta o a una biforcazione
visibile; che chieda con raccomandazione e alternativa (perché tu decida in dieci secondi, non in
dieci minuti); che registri la decisione con le tue parole testuali nei tre posti (il commit, la
voce in sospeso, il registro), non con una parafrasi "migliorata"; e, per quando non rispondi,
l'opzione più reversibile marcata come "per omissione", che è ciò che permette di proseguire senza
che la decisione sparisca.

**Di chiusura (ogni decisione):**

**Prima di inviare il prompt**, devi avere questo a portata di mano:

- La domanda dell'agente, letta, con la sua raccomandazione e la sua alternativa.
- La tua decisione, consultata con il proprietario del dominio se non sei tu, formulata in una
  frase con le tue parole esatte, quelle che vuoi restino per sempre (saranno nel commit, nella
  voce in sospeso e nel registro), e la data.
- Stato minimo accettabile: la frase è scritta prima di incollare il prompt, non si improvvisa
  nella chat. Una regola parafrasata dopo è una regola diversa.

> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.

> [it]
> Regola: [testo esatto]. Decisa da me, [data]. Annotala e prosegui.

Cosa gli sto chiedendo: il formato minimo di una decisione: la regola testuale, chi, quando. Tre
cose; senza una delle tre non è una decisione registrata.

## 3. Risultato atteso

- `docs/DECISIONS.md`: una riga o un paragrafo per decisione, con data, chi ha deciso, la frase
  testuale, la voce in sospeso o il commit in cui è stata applicata, e se è stata "per omissione".
- Nella specifica di ogni voce in sospeso interessata: la regola con la sua decisione e data.
- In ogni commit che implementa una regola di business: la frase di origine.

## 4. Verifica di completezza

- Apri tre commit che toccano regole di business: ciascuno cita chi ha deciso e quando?
- Ci sono decisioni "per omissione" senza conferma? Confermale o annullale; non lasciarle.
- C'è qualche regola nel sistema che non riconosci come tua? Se c'è, l'agente l'ha inventata: è un
  fallimento del gradino, si scrive come voce in sospeso e si rivede.
- Le frasi sono testuali o "migliorate" dall'agente? Devono essere le tue.

## 5. Segnali d'allarme

- È passata una settimana di lavoro e il registro delle decisioni non è cresciuto. O il lavoro è
  stato puramente meccanico (raro) o l'agente ha deciso da solo.
- Le decisioni registrate sono tutte redatte con lo stesso stile levigato. Sono parafrasi
  dell'agente, non le tue parole.
- Un utente del sistema chiede "perché fa questo?" e nessuno trova la decisione.
