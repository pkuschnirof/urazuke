# Passo 3 — Dimensionare prima di progettare l'architettura (contratto del gradino)

**Fase:** avvio (una volta; si rifà se il business cambia scala).
**Forma:** conversazione (l'agente calcola e presenta opzioni; il proprietario sceglie).
**Dimensione:** sempre obbligatorio, ma proporzionale: in un progetto piccolo il dimensionamento
può essere mezza pagina e una sola decisione ("sta in SQLite per anni"). Ciò che non può è essere
saltato, perché la domanda "quanto crescerà?" costa cinque minuti e la risposta sbagliata costa
settimane.

## A cosa serve

Perché le decisioni strutturali — quale motore di database, se l'interfaccia è sincrona o
asincrona, quanta concorrenza — si prendano con i numeri e non a gusto. È il gradino che costa di
più saltare: in Kikan si partì con file JSON e quando si misurò risultò che il sistema generava 3,4
milioni di righe all'anno; cambiare l'interfaccia dopo costò un'intera tappa di reingegnerizzazione.

Un punto chiave, emerso elaborando questo contratto: **ci sono dati che solo il business ha**
(quante entità, quanti eventi per entità, quanti operatori nel picco, quanto conservare) e il
modello non può inferirli. Ciò che può inferire è il derivato. Per questo il prompt gli esige di
valutare se i dati primari sono completi e chiedere quelli che mancano, invece di stimarli con la
faccia di chi è sicuro. Chi sa cosa gli manca per calcolare è il modello, non un modulo.

E una seconda idea che vale la pena nominare: le **decisioni asimmetriche**. Ci sono decisioni che
costano pochissimo se le prendi e risultano inutili, e moltissimo se non le prendi e risultano
necessarie. L'interfaccia di persistenza asincrona dalla riga uno è l'esempio canonico: se il
motore finisce per essere sincrono, è avanzato un `await`; se finisce per essere asincrono e non
l'avevi previsto, bisogna riscrivere tutto. Quelle decisioni si prendono sempre quando sono
economiche, anche se oggi non servono.

## 1. Contesto richiesto

- **Rilevazione dei dati di volumetria** del business, nominata così in modo generico: entità
  principali e loro crescita, eventi per entità, operatori simultanei e orario del picco, tempo di
  conservazione dei dati, carichi eccezionali (campagne, chiusure), crescita attesa. La rilevazione
  è per natura incompleta; l'agente valuta e chiede.
- Se c'è un sistema precedente: accesso in lettura alla sua base dati per ricavare numeri reali
  invece di stime.
- `PROJECT.md` (gradino 2).

## 2. Prompt

**Iniziale:**

> Before proposing any architecture we are going to size the system. Read `PROJECT.md` and the
> volume survey in `docs/VOLUME_SURVEY.md`. Distinguish primary data (facts only the business
> knows) from derived data (what can be computed from the primary data). Evaluate whether the
> primary data is complete enough to compute what follows; if any primary figure is missing, or
> is marked as an assumption, ask me for all the missing figures before going on. Never estimate
> a primary figure. If a previous system can be queried, use its real numbers and state where
> each came from. With the primary data complete, compute, showing the arithmetic: rows per year
> for the three largest tables, peak concurrency, data size at five years, and what breaks first
> if everything is multiplied by ten. Then present three options for persistence and concurrency,
> each with the cost of migrating to the others later. Do not choose: I choose. Do not write code.
> Reply in my language.

Cosa stiamo chiedendo, clausola per clausola: distinguere primari da derivati (la distinzione che
evita l'invenzione); **chiedere i primari che mancano e non stimarli mai**; usare numeri reali del
sistema precedente quando esiste, con la loro fonte; calcolare il derivato con il conto in vista,
perché il proprietario possa rifarlo; lo scenario "per dieci", che è ciò che rivela cosa si rompe
per primo; tre opzioni con il costo di migrare tra loro, perché la decisione non è solo "quale" ma
"quanto costa sbagliare"; e che non scelga né scriva codice, perché questo gradino è di decisione,
non di costruzione.

**Di chiusura:**

> I choose option [B]. Record in `docs/SIZING.md`: the primary data with its source, the derived
> data with its arithmetic, the three options, the chosen one and why, and the decisions we are
> taking "just in case" even though they are not needed today (for example: the persistence
> interface is asynchronous from line one, even if the first engine is synchronous). Include the
> questions you asked and my answers.

Cosa stiamo chiedendo: la registrazione completa, con fonti e conti; la scelta e la ragione; e le
decisioni asimmetriche scritte, perché se restano implicite non si rispettano.

## 3. Risultato atteso

Un file `docs/SIZING.md` con:

- Data e chi ha deciso.
- Tabella dei dati primari: valore, fonte (riferito dal business / misurato nel sistema
  precedente), data. Nessuno con fonte "supposto".
- Tabella dei dati derivati: valore, da quali primari deriva, il conto.
- Lo scenario "per dieci": cosa si rompe per primo.
- Le tre opzioni numerate, con il costo di migrare tra loro.
- La scelta e la ragione, in una o due frasi.
- Le decisioni asimmetriche (economiche se sbagli, carissime se non le prendi), elencate.
- Le domande che l'agente ha fatto e le risposte.

## 4. Verifica di completezza

- C'è un dato primario con fonte "supposto" o senza fonte? Se c'è, il gradino non è salito:
  l'agente doveva chiederlo.
- Ogni dato derivato mostra da quali primari deriva e con quale conto? Riesci a rifare un conto a
  mano e ti torna?
- Ci sono tre opzioni e una scelta con ragione scritta?
- Dice cosa succede se la volumetria si moltiplica per dieci?
- Le decisioni asimmetriche sono scritte, o sono rimaste implicite?
- L'agente ha chiesto? Se ha presentato numeri senza fare una sola domanda, diffida.

## 5. Segnali d'allarme

- Le tre opzioni portano alla stessa conclusione. L'agente aveva già scelto e ha montato le altre
  due per forma.
- Un numero derivato ha più precisione dei primari da cui deriva ("1.234.567 righe" a partire da
  "circa 5.000 famiglie"). La precisione è falsa.
- Lo scenario "per dieci" dice "non succede niente". Succede sempre qualcosa; se non l'ha trovato,
  non l'ha cercato.
