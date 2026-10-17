# Passo 6 — Le decisioni si scrivono accanto al codice (contratto del gradino)

**Fase:** ciclo (ogni volta che compare una regola di business o una decisione strutturale).
**Forma:** breve conversazione: l'agente rileva che c'è una decisione, chiede, e la lascia scritta.
**Dimensione:** obbligatorio in ogni progetto. In uno piccolo il registro può essere una tabella di
dieci righe; ciò che conta è che le regole di business abbiano un proprietario.

## A cosa serve

Perché ogni regola di business e ogni decisione strutturale abbia un proprietario, una data e un
luogo. Altrimenti, in sei settimane nessuno sa se "approvata più saldo torna in coda" era una
decisione del cliente o un'idea dell'agente. Ed evita il peggio: l'agente che inventa regole di
dominio perché gli sembravano ragionevoli.

Questo ha una conseguenza che vale la pena dire ad alta voce: il modello, quando trova un buco nelle
regole, **lo riempie**. Non si ferma; completa con ciò che gli sembra più probabile, e lo fa con la
stessa naturalezza con cui scrive il resto. Per questo la routine di questo gradino non è "scrivi
le decisioni" ma "fermati e chiedi quando ne manca una". La seconda è quella difficile, ed è quella
da esigere nel patto.

## 1. Contesto richiesto

- La conversazione con il proprietario: è l'unico contesto. L'agente non può decidere regole di
  business.
- Un luogo concordato dove si scrivono le decisioni: il messaggio del commit, il documento della
  voce in sospeso, o un registro `docs/DECISIONS.md`.

## 2. Prompt

**Routine (va nel patto di convivenza):**

> Whenever implementing something requires a business rule that is not written down, or you
> must choose between two approaches that change what the user sees, stop and ask me, in prose,
> with your recommendation and the alternative. Do not implement the one you prefer. When I
> decide, write the decision with my name and the date in the commit message and in
> `docs/DECISIONS.md`, with the exact words I used. If I do not answer and you must move on,
> implement the most reversible option and mark it "decision by omission, pending confirmation",
> so that I can review it.

Cosa stiamo chiedendo: che **si fermi** davanti a una regola non scritta o a una biforcazione
visibile; che chieda con raccomandazione e alternativa (perché il proprietario decida in dieci
secondi, non in dieci minuti); che registri la decisione con le parole testuali del proprietario,
non con una parafrasi "migliorata"; e, per quando il proprietario non risponde, l'opzione più
reversibile segnata come "per omissione", che è ciò che permette di proseguire senza che la
decisione sparisca.

**Di chiusura (ogni decisione):**

> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.

Cosa stiamo chiedendo: il formato minimo di una decisione: la regola testuale, chi, quando. Tre
cose; senza una delle tre non è una decisione registrata.

## 3. Risultato atteso

- `docs/DECISIONS.md`: una riga o un paragrafo per decisione, con data, chi ha deciso, la frase
  testuale, la voce o il commit in cui è stata applicata, e se è stata "per omissione".
- In ogni commit che implementa una regola di business: la frase d'origine ("regola del
  proprietario: approvata + saldo = torna in coda", "decisione del proprietario 2026-08-10").

## 4. Verifica di completezza

- Apri tre commit che toccano regole di business: ciascuno cita chi ha deciso e quando?
- Ci sono decisioni "per omissione" non confermate? Confermale o annullale; non lasciarle.
- C'è una regola nel sistema che non riconosci come tua? Se c'è, l'agente l'ha inventata: è un
  fallimento del gradino, si scrive come voce in sospeso e si rivede.
- Le frasi sono testuali o "migliorate" dall'agente? Devono essere le tue.

## 5. Segnali d'allarme

- È passata una settimana di lavoro e il registro delle decisioni non è cresciuto. O il lavoro è
  stato puramente meccanico (raro) o l'agente ha deciso da solo.
- Le decisioni registrate sono tutte redatte con lo stesso stile levigato. Sono parafrasi
  dell'agente, non le tue parole.
- Un utente del sistema chiede "perché fa questo?" e nessuno trova la decisione.
