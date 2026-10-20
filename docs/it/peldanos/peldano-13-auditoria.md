# Passo 13 — L'audit periodico come input del piano (contratto del gradino)

**Fase:** uscita in produzione.
**Quando:** obbligatorio prima del primo deployment in produzione; apre la fase di uscita. Poi, in
esercizio, ogni uno o due mesi secondo il ritmo di cambiamento, e alla chiusura di ogni tappa
grande.
**Forma:** un solo invio lungo, idealmente a un agente diverso da quello che costruisce.
**Dimensione:** obbligatorio prima del primo deployment in produzione, in qualunque progetto; poi,
proporzionale al ritmo di cambiamento (un sistema che cambia tutte le settimane si sottopone ad
audit ogni mese; uno stabile, ogni sei).

## A cosa serve

Guarda il sistema intero con occhi freschi ogni tanto, e converti ciò che vedi in voci in sospeso.
L'audit non è un rapporto che si archivia: è piano. Evita la password scritta nel codice che
nessuno aveva visto, le query che leggono tabelle intere [Ref. 18](../REFERENCIAS.md#ref-18), la
vulnerabilità nota in una dipendenza, il componente di migliaia di righe
[Ref. 41](../REFERENCIAS.md#ref-41). Ed è l'indipendenza del controllo di qualità portata un passo
più in dentro: chi fa l'audit non è chi ha costruito.

Sull'indipendenza: non serve un'altra azienda né un altro strumento. Basta **un'altra sessione,
con un altro file di istruzioni, che non abbia partecipato alla costruzione**. Ciò che cerchi è
che l'auditor non condivida i presupposti del costruttore. Un modello che ha costruito un modulo
"sa" che la password scritta nel codice era provvisoria; un modello che lo vede per la prima volta
la riporta per quello che è. Così sono state rilevate due porte di amministratore che il costruttore
aveva lasciato in un giorno [Ref. 40](../REFERENCIAS.md#ref-40).

Se puoi scegliere, che sia anche **un modello diverso** da quello che ha costruito, non solo
un'altra sessione dello stesso: uno studio del 2026 ha misurato che una sessione pulita con un
modello diverso trova più errori di due sessioni dello stesso modello
([arXiv 2610.01471](https://arxiv.org/abs/2610.01471)). Non è un cancello duro, perché a volte il
modello del costruttore è l'unico disponibile; è una preferenza che vale la pena esercitare quando
si può, e più il sistema è critico, più vale la pena esercitarla.

## 1. Contesto richiesto

Quello che segue è la lista generica. I file concreti che devi avere pronti prima di ogni
prompt, con il loro contenuto e il loro stato minimo, stanno nella sezione 2, nel blocco "Prima di
inviare il prompt" che precede ciascuno.

- Il repository completo, in sola lettura.
- La produzione o l'ambiente di test, in sola lettura (database, log).
- L'audit precedente, se c'è stato, per misurare cosa è cambiato.
- Il perimetro: integrità, sicurezza, prestazioni, qualità del codice, o tutto.
- `docs/PENDING.md` con le voci in sospeso chiuse nell'ultimo ciclo e le loro ricevute, perché
  l'auditor scelga quali riprodurre.

## 2. Prompt

**Iniziale (a un agente diverso dal costruttore, se si può):**

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business con te), non
l'agente:

- Una sessione nuova dell'agente, diversa da quella del costruttore: un clone pulito del
  repository in un'altra cartella e, se il tuo strumento lo permette, un file di istruzioni
  diverso che dica solo "sei un auditor; non hai costruito tu questo sistema". Senza questo,
  l'auditor condivide i presupposti del costruttore e li conferma.
- Accesso in sola lettura per quella sessione all'ambiente di test o alla produzione: database,
  log. Credenziali in sola lettura, fuori dal repository, con il nome della variabile detto nella
  chat.
- Il perimetro, deciso da te, per lo spazio [scope]: integrità, sicurezza, prestazioni, qualità
  del codice, o tutto.
- L'audit precedente, se c'è stato (`docs/AUDIT_[data]` della volta scorsa), perché misuri cosa è
  cambiato.
- Stato minimo accettabile: la sessione dell'auditor non è quella del costruttore, e ha la sola
  lettura.

> Audit this system for [scope]. Read-only: change nothing except writing your report to
> `docs/AUDIT_[date].md`. If auditing some part requires access you lack (the database, the
> log, an environment), tell me and mark that part as not audited; do not pass it as fine. Go
> through all of the code, not a sample. Pick two or three pending items closed in the last cycle
> and reproduce their receipts literally: rerun the exact red-then-green commands they cite
> against the commits they name, and say for each one whether it reproduces or not. A receipt you
> only read is not a receipt you audited. For every finding: where it is (file and line), what
> the risk is, what evidence proves it (the command, the query, the number), and its priority:
> P0 must be fixed now, P1 soon, P2 when possible. Give a grade to every dimension you audited.
> End with the list of P0 findings turned into proposed pending items. Reply in my language.

> [it]
> Fai l'audit di questo sistema su [perimetro]. Sola lettura: non cambiare nulla tranne scrivere
> il tuo rapporto in `docs/AUDIT_[data].md`. Se fare l'audit di qualche parte richiede un accesso
> che non hai (il database, il log, un ambiente), dimmelo e marca quella parte come non sottoposta
> ad audit; non darla per buona. Percorri tutto il codice, non un campione. Scegli due o tre voci
> in sospeso chiuse nell'ultimo ciclo e riproduci le loro ricevute alla lettera: rilancia i comandi
> esatti di rosso e poi verde che citano, contro i commit che nominano, e dimmi per ciascuna se si
> riproduce o no. Una ricevuta che hai solo letto non è una ricevuta che hai sottoposto ad audit.
> Per ogni rilievo: dove sta (file e riga), qual è il rischio, quale prova lo dimostra (il comando,
> la query, il numero), e la sua priorità: P0 va corretto subito, P1 presto, P2 quando si può. Dai
> un voto a ogni dimensione di cui hai fatto l'audit. Termina con la lista dei rilievi P0 convertiti
> in voci in sospeso proposte. Rispondi nella mia lingua.

Cosa gli sto chiedendo, clausola per clausola: sola lettura (l'auditor non corregge; propone); la
clausola di completezza nella sua forma per l'audit: **ciò che non si è potuto verificare si
dichiara, non si approva per omissione**; tutto il codice e non un campione, perché i rilievi gravi
di solito stanno dove nessuno guarda; **la riproduzione letterale di due o tre ricevute**, perché
l'audit verifichi prove invece di limitarsi a leggerle (è la clausola che chiude il buco di D-033:
un rosso raccontato non è un rosso sottoposto ad audit); ogni rilievo con posizione, rischio, prova
e priorità, perché sia azionabile senza rileggere il rapporto; voti per dimensione, per confrontare
con l'audit precedente; e i P0 già convertiti in voci in sospeso proposte.

**Di chiusura (al costruttore):**

**Prima di inviare il prompt**, devi avere questo a portata di mano:

- `docs/AUDIT_[data].md`, letto da te, e due rilievi a caso verificati con l'auditor (chiedigli il
  comando, la riga; deve poterli mostrare).
- La sessione del costruttore aperta: questo prompt va al costruttore, non all'auditor, con la
  data del file messa nello spazio.
- Stato minimo accettabile: hai letto il rapporto, sai quanti P0 e P1 ci sono, e conterai le voci
  in sospeso che apre.

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.

> [it]
> Leggi `docs/AUDIT_[data].md`. Apri una voce in sospeso per ogni P0 e P1, citando il rilievo. Se
> non sei d'accordo con qualcuno, dimmelo con la prova contraria; non ignorarlo.

Cosa gli sto chiedendo: che l'audit si converta in voci in sospeso (altrimenti è un rapporto che si
archivia), e che il disaccordo sia esplicito e con prove, non silenzioso.

## 3. Risultato atteso

- `docs/AUDIT_[data].md` con: perimetro, cosa si è potuto verificare e cosa no (e perché), i
  rilievi con posizione, rischio, prova e priorità, un voto per dimensione, il risultato della
  riproduzione di due o tre ricevute dell'ultimo ciclo, e la lista delle voci in sospeso proposte.
- In `docs/PENDING.md`: una voce in sospeso per ogni P0 e P1, citando il rilievo.

## 4. Verifica di completezza

- Il rapporto dice cosa NON ha potuto verificare? Se dice di aver verificato tutto, diffida.
- Scegli due rilievi: hanno file e riga, e una prova che puoi riprodurre?
- Il rapporto dice quali ricevute ha riprodotto, con il comando e il risultato, o dice solo di
  averle lette?
- Ogni P0 ha la sua voce in sospeso aperta prima di dare l'audit per chiuso?
- I voti per dimensione si potranno confrontare con l'audit precedente?
- Ha fatto l'audit lo stesso agente che ha costruito? Se è così, chiedi un secondo sguardo sui P0.

## 5. Segnali d'allarme

- L'audit non ha trovato nessun P0. In un sistema di più di tre mesi, non è quasi mai vero; più
  probabile è che il perimetro fosse piccolo o che l'auditor condividesse i presupposti.
- I rilievi non hanno la riga del file. Sono opinioni, non rilievi.
- Il rapporto dice che le ricevute "sono state riviste" senza mostrare il comando eseguito né il
  suo output. Una ricevuta letta e una riprodotta non sono la stessa cosa, e solo la seconda chiude
  l'obiezione di D-033.
- Sono passate due settimane e i P0 sono ancora senza voce in sospeso. L'audit è stato archiviato.
