# Passo 11 — L'audit periodico come input del piano (contratto del gradino)

**Fase:** esercizio (ogni tanto: alla chiusura di una tappa grande, prima di un deployment
importante, o ogni uno o due mesi).
**Forma:** un solo invio lungo, idealmente affidato a un agente diverso da quello che costruisce.
**Dimensione:** obbligatorio prima del primo deployment in produzione, in qualunque progetto; dopo,
proporzionale al ritmo di cambiamento (un sistema che cambia ogni settimana si sottopone ad audit
ogni mese; uno stabile, ogni sei).

## A cosa serve

Per guardare l'intero sistema con occhi freschi ogni tanto, e convertire ciò che si vede in voci in
sospeso. L'audit non è un rapporto che si archivia: è piano. Evita la password scritta nel codice
che nessuno aveva visto, le 264 query che leggevano tabelle intere, la vulnerabilità nota in una
dipendenza, il componente di 2.679 righe. Ed è l'indipendenza del controllo qualità portata un
passo più dentro: chi fa l'audit non è chi ha costruito.

Sull'indipendenza: non serve un'altra azienda né un altro strumento. Basta **un'altra sessione, con
un altro file di istruzioni, che non abbia partecipato alla costruzione**. Ciò che si cerca è che
l'auditor non condivida i presupposti del costruttore. Un modello che ha costruito un modulo "sa"
che la password hardcoded era provvisoria; un modello che lo vede per la prima volta la segnala per
ciò che è.

## 1. Contesto richiesto

- Il repository completo, in sola lettura.
- La produzione o l'ambiente di test, in sola lettura (database, log).
- L'audit precedente, se c'è stato, per misurare cosa è cambiato.
- Il perimetro: integrità, sicurezza, prestazioni, qualità del codice, o tutto.

## 2. Prompt

**Iniziale (a un agente diverso dal costruttore, se possibile):**

> Audit this system for [scope]. Read-only: change nothing except writing your report to
> `docs/AUDIT_[date].md`. If auditing some part requires access you lack (the database, the
> log, an environment), tell me and mark that part as not audited; do not pass it as fine. Go
> through all of the code, not a sample. For every finding: where it is (file and line), what
> the risk is, what evidence proves it (the command, the query, the number), and its priority:
> P0 must be fixed now, P1 soon, P2 when possible. Give a grade to every dimension you audited.
> End with the list of P0 findings turned into proposed pending items. Reply in my language.

Cosa stiamo chiedendo, clausola per clausola: sola lettura (l'auditor non corregge; propone); la
clausola di completezza nella sua forma per l'audit: **ciò che non si è potuto verificare si
dichiara, non si approva per omissione**; tutto il codice e non un campione, perché i rilievi gravi
di solito stanno dove nessuno guarda; ogni rilievo con posizione, rischio, prova e priorità, perché
sia azionabile senza rileggere il rapporto; voti per dimensione, per confrontare con l'audit
precedente; e i P0 già convertiti in voci in sospeso proposte.

**Di chiusura (al costruttore):**

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.

Cosa stiamo chiedendo: che l'audit si converta in voci in sospeso (altrimenti è un rapporto che si
archivia), e che il disaccordo sia esplicito e con prove, non silenzioso.

## 3. Risultato atteso

- `docs/AUDIT_[date].md` con: perimetro, cosa si è potuto verificare e cosa no (e perché), i
  rilievi con posizione, rischio, prova e priorità, un voto per dimensione, e la lista delle voci in
  sospeso proposte.
- In `docs/PENDING.md`: una voce per ogni P0 e P1, citando il rilievo.

## 4. Verifica di completezza

- Il rapporto dice cosa NON ha potuto verificare? Se dice di aver verificato tutto, diffida.
- Scegli due rilievi: hanno file e riga, e una prova che puoi riprodurre?
- Ogni P0 ha la sua voce aperta prima di dare l'audit per chiuso?
- I voti per dimensione si possono confrontare con l'audit precedente?
- Ha fatto l'audit lo stesso agente che ha costruito? Se è così, chiedi un secondo sguardo sui P0.

## 5. Segnali d'allarme

- L'audit non ha trovato nessun P0. In un sistema con più di tre mesi di vita, quasi mai è vero;
  più probabile che il perimetro fosse piccolo o l'auditor condividesse i presupposti.
- I rilievi non hanno la riga del file. Sono opinioni, non rilievi.
- Sono passate due settimane e i P0 sono ancora senza voce in sospeso. L'audit è stato archiviato.
