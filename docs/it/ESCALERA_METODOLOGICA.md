# Urazuke, il metodo del riscontro — la scala metodologica (versione 3)

Conversazione tra Pablo e Sumi, 17 ottobre 2026 (versione 1 di mattina; versione 2 di pomeriggio,
con la tesi di apertura, i contratti di gradino e il repository proprio; versione 3 con il nome, i
contratti arricchiti, i prompt in inglese, la guida per dimensione di progetto e la guida per
strumento). Questo è un documento di lavoro: continueremo a elaborarlo in più passate, quindi nulla
di ciò che dice è ancora dottrina. È, semplicemente, il primo distillato onesto di ciò che abbiamo
fatto davvero in tre repository che oggi sono in produzione, con persone reali che li usano.

Una nota di stile, perché conta: questo documento è scritto per persone che non hanno vissuto
questi progetti. Per questo spiega le cose con calma, ripete quando serve, usa il linguaggio di
tutti i giorni, e ha alla fine un **glossario** con ogni sigla e ogni espressione colloquiale che
compare. Se a un certo punto ti imbatti in una parola strana — "cricchetto", "lucchetto", "PND",
"fail-closed" — vai al glossario; c'è tutto.

Questa è la versione italiana. Lo spagnolo è la fonte della verità; se le due divergono, prevale la
versione spagnola e questa viene corretta. I prompt per il modello sono identici in tutte le lingue.

## Il nome

**Urazuke** (裏付け) è una parola giapponese che indica il sostegno di cui dispone un'affermazione:
ciò che la regge da dietro (letteralmente, "la fodera sul retro"). Il verbo *urazukeru* significa
"sostenere con prove". Pablo l'ha scelta il 17 ottobre 2026 ("Andiamo con Urazuke"), dopo che la
verifica dei nomi aveva scartato Hashigo, Kaidan e Shōko per collisioni con aziende e progetti
esistenti. Il nome non si traduce; il sottotitolo, "il metodo del riscontro", sì: *el método de la
evidencia*, *the evidence method*, *o método da evidência*, *la méthode de la preuve*, *die
Nachweis-Methode*, 裏付けの方法, 验证方法. In questo documento, "la scala" è la struttura del metodo —
i suoi sedici gradini — e "Urazuke" è il metodo intero.

## Di cosa si tratta?

Pablo l'ha detto chiaramente: non vuole insegnare uno strumento, vuole insegnare **il metodo**.
L'idea è che chiunque, con qualunque strumento di intelligenza artificiale che serva a programmare,
possa "vibecodare" (cioè costruire software conversando con un'IA invece di digitare il codice a
mano) e che ciò che ne esce sia robusto, pronto per la produzione, e — questo è l'importante —
**senza che il proprietario del progetto debba rivedere una sola riga di codice**.

Suona ambizioso, e lo è. Ma abbiamo qualcosa che quasi nessuno ha: tre sistemi reali costruiti
esattamente così e che oggi funzionano con clienti veri. Quindi la domanda non è "si potrà?", ma
"cosa abbiamo fatto, in che ordine, e cosa di tutto questo è ciò che ha fatto davvero la
differenza?".

Questa scala è la risposta a quella domanda. E servirà da base per tre cose: la documentazione del
metodo, la pratica che faranno gli allievi, e i manuali. Più avanti, inoltre, la esporteremo come
"flusso di esecuzione di progetto" dentro Forge, perché lo strumento guidi il metodo invece che uno
debba ricordarselo.

## Da dove viene tutto questo (le fonti)

Ho rilevato i tre repository in sola lettura, senza toccare nulla:

- **`[repository yujin-forge]`** (lo strumento Forge e, soprattutto, il luogo in cui il metodo è
  nato): 1.090 commit tra il 10 maggio e il 14 ottobre 2026. Lì ci sono il documento degli standard
  di qualità (`docs/SQ.md`), le 31 dottrine in `docs/doctrine/`, il registro degli anti-pattern
  (`docs/GOTCHAS.md`), il paper in cui si decise di chiudere la squadra multi-agente
  (`docs/PAPER_SUMI_VS_AGENTIC.md`), le decisioni congelate del direttore
  (`docs/DIRECTOR_DECISIONS_2026_06_04.md`), il piano del registro delle voci in sospeso
  (`docs/PENDING_REGISTRY_PLAN.md`) e il testo delle regole SQ da 1 a 9 che Forge inietta nel
  cervello a ogni turno (`src/chat/server.ts`).
- **`[repository Autorizzazioni]`** (il primo sistema in produzione, per un ente sanitario): 469
  commit tra l'11 giugno e il 9 ottobre, 641 voci in sospeso e tutte chiuse. Include il documento di
  progettazione iniziale, le lezioni apprese sul cloud di Google, diversi audit e i manuali.
- **`[repository Kikan]`** (il secondo sistema in produzione, lo sportello omnicanale e le campagne
  dell'Associazione): 442 commit tra il 21 agosto e il 16 ottobre, 37 tag, la serie di audit AUD-*,
  19 documenti di voci in sospeso, il documento della reingegnerizzazione della persistenza
  (`docs/REINGENIERIA_PERSISTENCIA_SQL.md`, con le sue tappe da E1 a E12 e la famosa sezione 11.b),
  l'integrazione continua e il deployment, e i due rapporti di questa settimana (integrità il 14
  ottobre, qualità il 15).
- La mia memoria delle correzioni che Pablo mi ha fatto in questi mesi ("misuratore con guardia",
  "misura l'ipotesi", "valida con il log", "guarda prima quale versione è pubblicata").

**Sui nomi.** I clienti dei due sistemi in produzione sono anonimizzati: li chiamiamo "la Mutua"
(con il suo "Autorizzatore") e "l'Associazione", e i loro sistemi "Autorizzazioni" e "Kikan". I
numeri, le date e i commit sono reali; i nomi delle organizzazioni restano riservati finché non ne
avremo il permesso. I percorsi locali dei repository di origine compaiono come `[repository …]`.

Una convenzione che vale per tutto il documento: **ogni affermazione cita il commit o il documento
in cui sta la prova**. E quando qualcosa è una mia interpretazione e non un fatto verificato, lo
segno con l'etichetta `[ipotesi]`, perché si distingua a colpo d'occhio ciò che è provato da ciò che
sto proponendo.

## L'IA non interrompe il metodo: lo continua

Questa è la tesi che apre il documento, e la mettiamo per prima perché disinnesca l'obiezione più
comune prima che compaia: "come fai a fidarti di codice scritto da una macchina?".

La risposta è che **l'industria ha smesso di fidarsi dell'autore del codice già vent'anni fa**.
Quando il grosso della scrittura è passato a team junior, esternalizzati o a rotazione, la revisione
riga per riga è diventata impossibile da sostenere. E ciò che è cresciuto al suo posto è tutto ciò
che oggi diamo per scontato: i test automatizzati, l'integrazione continua, i criteri di
accettazione, le pipeline che non lasciano passare nulla senza il verde, lo "shift left" dei test,
il controllo qualità come funzione indipendente. Quella è stata la risposta dell'ingegneria dei
sistemi a "chi scrive non è affidabile": non leggergli il codice, esigergli prove.

Quindi mettere un modello di intelligenza artificiale a scrivere non è un salto nel vuoto. È
cambiare un autore di cui già non ci fidavamo con un altro di cui non ci fidiamo nemmeno, e per il
quale **avevamo già montato l'apparato di verifica**. Questo dovrebbe tranquillizzare, non
inquietare. E in più il nuovo autore è più economico, più veloce, e — a differenza del junior — non
si offende quando gli chiedi di provare in rosso.

Per questo questo metodo si appoggia, senza nasconderlo, sull'ingegneria dei sistemi classica. Lo
scheletro è quello di sempre: rilevazione, requisiti, dimensionamento, progettazione, costruzione,
test, deployment, esercizio, audit. Non poteva essere altrimenti, perché i problemi sono quelli di
sempre: non sapere quanti dati ci saranno, non sapere cosa vuole il cliente, non sapere se ciò che
è stato costruito è ciò che è stato chiesto. L'IA non ha cambiato i problemi; ha cambiato chi fa
ogni parte e a quale costo. Persino il criterio di idoneità X2 (vedi gradino 0) è ingegneria
classica: testabilità come condizione del contratto.

### Cosa è vecchio e cosa è nuovo in tutto questo

Il vecchio, e che conviene dire che è vecchio: lo scheletro di tappe, l'indipendenza di chi verifica
da chi costruisce, i test come prova, la documentazione come parte del prodotto, la rilevazione
prima della progettazione.

Ciò che cambia davvero, ed è dove sta la nostra parte, sono tre cose:

1. **Dove va lo sforzo dell'umano.** Nel metodo classico l'umano scrive la specifica, scrive il
   codice, e un altro umano lo rivede. Qui l'umano fa solo due cose: **decide, e verifica
   artefatti**. Tutto il resto — redigere, costruire, testare, misurare, documentare — lo fa il
   modello. Per questo ogni gradino termina in una "verifica di completezza senza leggere codice":
   è il luogo esatto in cui l'umano resta indispensabile, e nessun altro.

2. **L'autore fabbrica anche la prova.** Questo è l'unico punto davvero nuovo, ed è la sfumatura che
   giustifica tre gradini interi. Il junior scriveva codice dubbio, ma non fabbricava la prova: i
   test e le misurazioni li montava un altro, o almeno un altro li guardava. Il modello, invece,
   produce il codice *e* il test *e* il misuratore *e* il rapporto, nella stessa sessione, con la
   stessa sicurezza nella voce quando ha ragione e quando ha torto. L'abbiamo visto: il misuratore
   che ha mentito due volte, l'errore di autenticazione riferito come "successo", le tre affermazioni
   su quattro che erano sbagliate. Quindi "rivedere la prova invece del codice" resta il principio
   corretto, ma **la prova deve dimostrare se stessa**: il test visto in rosso (gradino 7), lo
   strumento con la sua guardia (gradino 9), il rapporto che separa il verificato dal creduto
   (gradino 10), l'auditor diverso dal costruttore (gradino 11). Non è un'inquietudine nuova: è la
   stessa disciplina di indipendenza del controllo qualità, portata un passo più dentro.

3. **Il costo degli artefatti.** Nel metodo classico la documentazione era cara, quindi si faceva
   una volta e invecchiava. Qui rigenerarla è gratis, quindi la regola diventa "nello stesso commit"
   e "riproducibile a mano, senza IA". Ciò che prima era un ideale irraggiungibile diventa un
   cancello.

Per il corso e per la presentazione pubblica, questo definisce il posizionamento con onestà: non è
"il nuovo modo di programmare"; è **ingegneria dei sistemi applicata a un costruttore che non si
stanca e a cui non si può credere**. A chi viene dai sistemi suona familiare e abbassa la
diffidenza ("questo lo sai già fare"); a chi viene dal vibecoding dà ciò che non ha, che è proprio lo
scheletro. E ci differenzia dagli strumenti che vendono velocità e omettono l'intero scheletro.

---

## Parte A — Rilevazione: i momenti e le tappe che hanno contato

### A.1 yujin-forge: dove il metodo è nato (da maggio a ottobre 2026)

C'è qualcosa di fondamentale da dire subito, perché cambia il modo di leggere tutto il resto: **il
metodo non è stato progettato prima e applicato dopo**. È stato il contrario. Ogni regola è stata
scritta *dopo* un colpo, nello stesso repository in cui quel colpo si è vissuto, e molte volte lo
stesso giorno. Nessuna dottrina è nata in astratto, in una riunione davanti a una lavagna. Tutte
hanno un incidente dietro e un commit di nascita. Questa è, credo, la cosa più onesta e più preziosa
che abbiamo da raccontare.

Ecco la sequenza, in ordine:

| Data | Momento | Cosa è cambiato nel metodo | Prova |
|---|---|---|---|
| 25 maggio | Nascono le SQ (gli standard di qualità) | È il primo "patto di convivenza" tra l'umano e l'agente. Dice cose come: il tempo dell'umano è sacro; niente debito tecnico (ciò che si rompe si corregge alla radice); tutto in ASCII; la documentazione sempre aggiornata; e il perimetro esatto, né più né meno di quanto chiesto. | `2219f7a docs: add SQ.md` |
| 27 maggio | Primo registro GOTCHAS | Gli errori che si ripetono cominciano a essere annotati in un formato fisso: come puzza, qual è la causa radice, come è stato corretto, e come rilevarlo la prossima volta prima che faccia male. | `73f4029` (gotchas doc) |
| 2 giugno | Cancelli (gate) e G-DOC, iniettati solo quando servono | Compaiono i cancelli espliciti del flusso di lavoro, numerati da G1 a G9. E un dettaglio intelligente: la dottrina entra nel prompt dell'agente solo nel momento in cui si applica, non sempre, per non sprecare contesto. | `5b47475` |
| 4 giugno | Si riformula la politica di test | Fino ad allora si insisteva con "prima il test, poi il codice" (TDD) per tutto. Si scopre che non serve universalmente: di default i test vengono *dopo* l'implementazione, il TDD resta un'opzione per perimetri piccoli e ben definiti, lo scheletro deve essere in verde come cancello, e si aggiunge una protezione contro i cicli (quando l'agente gira a vuoto senza avanzare, scatta una finestra modale che ferma tutto). | `a9f59c7`, `docs/doctrine/testing-policy.md` |
| 4 giugno | Si congelano le decisioni del direttore | Prima di uno sprint, tre decisioni si scrivono e si numerano (D1, D2, D3). Qui nasce la pratica di "la decisione si scrive prima di costruire". | `docs/DIRECTOR_DECISIONS_2026_06_04.md` |
| 5 giugno | RIPROGETTAZIONE: si chiude la squadra multi-agente | Questo è un momento enorme. C'era una squadra di cinque agenti (direttore, analista, programmatore, tester, costruttore di scheletri) che si passavano il lavoro. Si fece un esperimento misurato: quella squadra spese 60 dollari e 73 minuti e consegnò qualcosa a metà; una sola sessione con un solo agente impiegò 90 minuti e consegnò qualcosa di pubblicabile. Si eliminò l'intera squadra. È il primo caso di "retrospettiva con un numero in mano, e riprogettazione". | `7584f8b`, `docs/PAPER_SUMI_VS_AGENTIC.md` |
| 6 giugno | Registro delle voci in sospeso | Il piano di lavoro passa a ESSERE la lista delle voci in sospeso: una coda canonica, con comandi per gestirla, che si aggiorna a ogni sessione. Non c'è più "piano" da una parte e "compiti" dall'altra. | `4fc82c6`, `docs/PENDING_REGISTRY_PLAN.md` |
| 10 giugno | Dottrine obbligatorie + onestà di verifica + tipi di flusso | La dottrina smette di essere facoltativa: va come blocco obbligatorio in ogni prompt. Nasce l'"onestà di verifica": verificare che la rete diventi davvero rossa quando deve, dichiarare i punti ciechi, e fare affermazioni proporzionate a ciò che è stato verificato. E si separano tre tipi di flusso: progetto nuovo (greenfield), correzione, ed evoluzione. | `7ab9d8a`, `2c552c0`, `docs/doctrine/verification-honesty.md`, `workflow-kinds.md` |
| 14–21 giugno | Piloti automatici di 24 e 48 ore | L'agente lavora da solo per un giorno o due con un mandato scritto: commit e push per ogni pezzo, senza chiedere, e l'umano riceve un riassunto. Si prova che il metodo regge un'autonomia lunga. | memoria `feedback_autopilot_mandate`, `project_autonomous_multisession_interrupt` |
| 5 e 10 luglio | Scala di concorrenza e modalità diagnostica | L'agente entra in sistemi in produzione altrui in modalità diagnostica: sola lettura, limitato, senza toccare nulla. | `docs/doctrine/diagnostic-mode.md` |
| 22 luglio | Irrobustimento delle prestazioni | Si estraggono pattern di scala dal sistema della Mutua (per esempio, quello delle due transazioni; e "misurare prima di toccare"). Per la prima volta il metodo si alimenta di un sistema già in produzione. | `873339c` |
| 14 agosto | Forge Embed vivo nella produzione della Mutua | L'agente diventa RESIDENTE dentro il sistema del cliente: con una mappa del sistema obbligatoria, con la regola "prima la soluzione operativa", e con la capacità di aprire ticket. | la memoria dell'assistente residente in produzione |
| 10 e 11 ottobre | Modalità esercizio + dimensionamento (G9) | Si dimensiona prima di costruire, scegliendo tra opzioni fisse, e il dimensionamento resta registrato come un cancello in più. | `c602725`, `0bd1b05`, `docs/doctrine/sizing.md` |
| 13 ottobre | Interfaccia di persistenza | Una decisione "asimmetrica" (costa poco se sbagli, costa moltissimo se non la prendi): l'interfaccia con il database è asincrona dalla riga uno, anche se il primo motore è sincrono. Cambiarla dopo è costato un'intera tappa della reingegnerizzazione (E6: tre batterie di test). | `7391cc5`, `docs/doctrine/persistence-interface.md` |
| 14 ottobre | Il turno orfano di 1 ora e 43 → versione 1.18.0 | Un fallimento del metodo, e brutto: l'agente ha lavorato un'ora e quarantatré minuti invisibile per l'umano, e in quel lasso ha fatto sei commit. Corretto alla radice: un cane da guardia del silenzio, un guinzaglio tra processi, e 28 test. | `b80a659`, CHANGELOG 1.18.0 |

Cosa si legge in questa tabella? Che in cinque mesi il metodo è passato da "regole di cortesia"
(le SQ, che sono quasi buone maniere di convivenza) a "cancelli misurati" (dimensionamento, budget
di query, onestà di verifica). E che ogni gradino ha una data di nascita e un colpo che l'ha
giustificato. È questo che lo rende insegnabile: non è teoria, è cicatrice.

### A.2 Autorizzazioni: il metodo sotto carico reale (da giugno a ottobre 2026)

Questo è stato il primo sistema con utenti veri, con soldi in gioco e con dati sanitari. Sono 641
voci in sospeso, tutte chiuse. E qui è successo qualcosa di diverso: il metodo ha imparato a
**gestire l'esercizio**, non solo a costruire. Una cosa è che un sistema funzioni quando lo provi
tu; un'altra molto diversa è che continui a funzionare alle tre del mattino con un robot che approva
ordini.

| Data | Momento | Cosa ha portato | Prova |
|---|---|---|---|
| 11 giugno | Avvio con un documento di progettazione (l'"opzione C") | C'è stata una specifica iniziale. E il repository l'ha "superata" rapidissimamente: ciò che è stato costruito era molto più di ciò che diceva la carta. Lezione: la specifica vale come punto di partenza, ma il piano vivo sono le voci in sospeso. | il documento di progettazione iniziale |
| 23 giugno | Audit delle query senza indice | Il primo audit di "full scan" (query che leggono l'intera tabella perché non c'è indice) su un sistema vivo. E i rilievi si convertono in voci in sospeso, non in un rapporto che si archivia. | documento di audit del 23 giugno |
| 24 giugno | Lezioni apprese sul cloud di Google | Gli errori di infrastruttura si scrivono come lezioni per non ripeterli. | documento lezioni GCP |
| 26 giugno | Manuale utente | Il manuale nasce insieme al sistema, non alla fine quando nessuno si ricorda più nulla. | manuale del 26 giugno |
| 13 luglio | Backup di secondo livello | Due livelli di backup prima di fidarsi del sistema: uno locale e un altro nello storage di Google. | commit backup livello 2 |
| 14 luglio | La saga del PND-300 (quattro giri di causa radice) | Un bug tornato tre volte finché non si è trovata la causa vera. Qui "la correzione è alla radice o non è correzione" smette di essere una bella frase e diventa pratica obbligatoria. | PND-300 |
| 16 luglio | Audit di sicurezza | La sicurezza si tratta come un audit periodico che genera voci in sospeso, non come una checklist che si spunta una volta all'inizio. | documento di audit del 16 luglio |
| 26 e 29 luglio | Manuale interno RPAForce + manuale di disaster recovery | Tutto l'operativo (distribuire, ripristinare, mantenere) resta documentato in forma "riproducibile a mano, senza IA". Se domani non c'è agente, una persona può seguire il manuale. | `6444ce6 (pnd442)`, `a30cee3 (pnd459)` |
| 27 luglio | Il "fail-closed" come riflesso | Se una tabella non esiste o una ricerca fallisce, la riga resta semplicemente senza il suo pulsante; non si rompe mai l'intero elenco. Nel dubbio, non agire e non rompere. | `e18406d (pnd452)` |
| 6 e 7 agosto | Contatori verificati contro la produzione (1.355 contro 1.234) | Questo è, per me, l'esempio più completo di "verificare con uno strumento". Un contatore mostrava 1.355 approvazioni e la query mostrava 1.234. Si è verificata la causa radice direttamente sulla produzione (in sola lettura), si è scomposta la differenza numero per numero (145 in più, 24 in meno, 145 − 24 = 121), si è scritto un test provato in ROSSO contro il criterio vecchio, e lo script di diagnosi è rimasto nel repository per la prossima volta. | `ab3e529 (pnd517)`, `1f5feb9 (pnd514)` |
| 6 agosto | Simmetria produttore/consumatore dal vivo | La "causa di attesa" che vede l'utente si calcola con gli STESSI cancelli con cui il robot decide (regola SQ 7); e la lista delle colonne la definisce il server e il frontend la consuma. Così non possono divergere. | `50fe968 (pnd510)`, `7251129 (pnd509)` |
| 7 agosto | Pulsante di emergenza con lucchetto dedicato | Lucchetti: doppia sicurezza, modalità di prova (dry-run) dell'approvatore automatico, una sentinella che spinge con guardie. | `0954740 (pnd524)` |
| 10 agosto | Regole di dominio scritte nel commit | Testuale: "regola Pablo: approvata + saldo = torna", "decisione Pablo 2026-08-10". La decisione di business resta con data e proprietario, attaccata al codice che la implementa. | `0ae3ae6 (pnd550)` |

Cosa si legge qui? Che in questo repository il metodo ha guadagnato i suoi gradini OPERATIVI: il
fail-closed, i lucchetti, i backup, i manuali che una persona può seguire senza IA, gli audit
periodici, e la verifica contro la produzione con uno strumento e non a occhio.

### A.3 Kikan: il metodo maturo (da agosto a ottobre 2026)

Il secondo sistema in produzione, e il primo costruito con tutto ciò che precede già scritto dal
primo giorno. Qui compaiono i gradini della **misurazione** e dell'**integrazione e deployment
continui**: è il repository in cui, per la prima volta, misurare viene sistematicamente prima di
costruire.

| Data | Momento | Cosa ha portato | Prova |
|---|---|---|---|
| 21 agosto | Avvio | Il progetto parte con un `CLAUDE.md` operativo (il file che l'agente legge all'inizio) e con le voci in sospeso come piano dal primo giorno. | primo commit |
| 28 e 29 agosto | Serie di audit AUD-* → 19 documenti di voci in sospeso | Un audit sistematico precoce che si converte direttamente nel piano di lavoro. | documenti PND del 28 e 29 agosto |
| 28 agosto | Integrazione continua (CI) | I test girano su GitHub dalla prima settimana. | `ci.yml` |
| 23 e 24 settembre | Deployment + configurazione solo sul server + Node 22 fisso | Il deployment è un pacchetto; la configurazione vive nell'ambiente, non nel repository; e la versione del runtime resta inchiodata. | `deploy.yml`, `bb801ed` |
| dal 30 settembre al 4 ottobre | Il deployment si irrobustisce a colpi di voci in sospeso | L'URL pubblico in entrambi gli ambienti; ricaricare il servizio prima di riavviare e prima di tornare indietro; una fixture che RICONCILIA invece di duplicare; il materiale del cliente fuori dall'albero specchiato. Cinque voci in sospeso di fila sulla stessa cosa: il deployment scoperto tardi fa pagare il suo prezzo. | `f85c3c9`, `513c8d0 (PND-108)`, `076df76 (PND-134)`, `9d76af8 (PND-130)` |
| 3 ottobre | Isolare la configurazione | La batteria di test non sporca più la configurazione che viaggia nel deployment. | `0bd20a8 (PND-107)` |
| 4 e 8 ottobre | Promozione da UAT a PROD | Un circuito esplicito per passare configurazione e campagne dall'ambiente di test a quello di produzione. | `4eb5ad7 (PND-027)`, `7658e2e` |
| 11 ottobre | REINGEGNERIZZAZIONE, tappa 1: lo schema derivato dal CODICE, con lucchetto | L'inventario di tabelle e campi si deriva dal codice stesso, con un test che lo protegge, e si apre sulla lavagna (la bacheca condivisa con Pablo). | `6113319`, `68819ce` |
| dall'11 al 13 ottobre | Tappa 6: il cricchetto statico, tre batterie passate ad asincrono | Il "cricchetto" è un contatore di chiamate al database senza `await` (senza aspettare il risultato), che può solo scendere, mai salire. Ed è successo qualcosa di bellissimo da raccontare: si è scoperto DUE volte che il misuratore non vedeva parti del codice (70 chiamate, e poi 84, con il contatore a zero). | `06b2734`, `f6e5221`, `2fc6239`, `1d55a93` |
| 13 ottobre | Misuratori che mentivano | Testuale dai commit: "il misuratore di E7.5 mentiva su una base con l'ALTER già applicato"; "sono 44, non 27". Il metodo impara qualcosa di nuovo: **anche lo strumento va verificato**. | `880ac0f`, `f955620` |
| 14 ottobre | Tappa 8: l'interruttore, il budget di query e la guardia di rientro | Il cambio di motore di database è un interruttore per ambiente; ogni percorso dell'applicazione ha un budget di query misurato e protetto da un test. | `5926b3f`, `10ada00` |
| 14 ottobre | Tappa 9: il tetto si stringe sul misurato (63 su 60) | Il budget non è un numero inventato: è ciò che si è misurato più un margine piccolo. | `0730082`, `7f5f1af` |
| 14 ottobre | Sezione 11.b: le cinque regole | Misuratore con guardia; costruire lo strumento se non esiste; audit in due direzioni; segnare l'approssimato; e chi esegue verifica chi ha pianificato. Con una frase che dice tutto: "tre affermazioni su quattro erano sbagliate; dove c'era uno strumento, esatto". | `docs/REINGENIERIA_PERSISTENCIA_SQL.md` 11.b |
| 14 ottobre | Tappe 10 e 12 + integrità esterna | Il pacchetto REALE porta gli script di migrazione; la conservazione dei dati si dichiara per tabella e si limita in produzione; e un rapporto di integrità fatto da un terzo (io, Sumi) che Forge assorbe come voci in sospeso. | `f72b15a`, `b266f11`, `INTEGRIDAD_..._10_14.md` |
| 14 ottobre | Il deployment solo impacchetta (gate-ci) | I test girano UNA sola volta (in CI); il deployment aspetta quel risultato e impacchetta. Da 16-27 minuti per commit, a 11. | `39497b0` |
| 15 ottobre | PND-223 ritirata in 24 ore / PND-257 | Si sono create due porte di amministratore in un solo giorno. Una revisione esterna l'ha rilevato; se n'è ritirata una ed è rimasta una via unica. Il metodo regge il "disfare in fretta" senza drammi. | `69bdab2`, `20fdbe7`, `1558ee4` |
| 15 ottobre | Audit di qualità | Voti per dimensione; una vulnerabilità nota in una dipendenza; un componente di 2.679 righe; un `CLAUDE.md` di 9.661 righe. Input per il prossimo piano. | `AUDITORIA_CALIDAD_CODIGO_2026_10_15.md` |

Cosa si legge qui? Che Kikan è il primo repository in cui la MISURAZIONE precede la costruzione in
modo sistematico (dimensionamento, cricchetto, budget), e in cui deployment e integrazione continua
si trattano come parte del prodotto e non come una pratica burocratica.

### A.4 I pattern che si ripetono nei tre repository

Se si guardano i tre repository insieme, ci sono dieci cose che compaiono di continuo. Queste sono,
in fondo, il metodo:

1. **Colpo → regola scritta lo stesso giorno.** Nessuna dottrina è nata in astratto. Ciascuna ha un
   commit di nascita e un incidente dietro.
2. **Il piano sono le voci in sospeso.** Voci numerate (PND-nnn) nei tre repository; la specifica
   è il punto di partenza, la coda delle voci in sospeso è la verità.
3. **La decisione si scrive accanto al codice, con proprietario e data.** "Regola Pablo",
   "decisione Pablo 2026-08-10", le decisioni del direttore, e in Kikan la "decisione per
   omissione" (quando Pablo non ha risposto e l'agente ha scelto, l'ha lasciata segnata come tale).
4. **Il test si prova in rosso.** Non basta che sia in verde: bisogna dimostrare che il test
   fallisce contro il codice vecchio. Se non l'hai mai visto rosso, non sai se prova qualcosa.
5. **Misurare con uno strumento, e verificare lo strumento.** Uno script con test che viaggia nel
   repository; il misuratore ha mentito due volte e si è corretto il misuratore prima del codice.
6. **Fail-closed e lucchetti.** Nulla si rompe in silenzio; nel dubbio, non fare.
7. **Audit periodico → voci in sospeso.** Full scan a giugno, sicurezza a luglio, AUD-* ad agosto,
   integrità e qualità a ottobre. L'audit non è rapporto: è piano.
8. **Documentazione e manuali nascono con il sistema**, e si mantengono nello stesso commit della
   modifica.
9. **L'agente opera dentro il sistema** (diagnosi → esercizio → residente) con permessi limitati e
   approvazioni; l'umano approva, non digita.
10. **Retrospettiva con numero → riprogettazione.** La squadra multi-agente è stata chiusa con 60
    dollari e 73 minuti contro 90 minuti; il deployment è stato spezzato con 16-27 minuti contro
    11; e questa scala stessa è esattamente questo.

E ora i fallimenti, perché senza di essi questo sarebbe propaganda e non una rilevazione: il turno
orfano di un'ora e quarantatré (14 ottobre); un errore di autenticazione riferito come "successo";
due porte di amministratore in 24 ore; 23 push in un giorno che hanno bruciato la quota di GitHub
Actions; la chiave del database stampata in una trascrizione; un `CLAUDE.md` diventato un registro
di modifiche di 9.661 righe; l'app mobile di Forge che perde le schede; e i misuratori che hanno
mentito due volte. Tutto questo è successo. E tutto questo è nella scala, perché è da lì che
vengono i gradini.

---
## Parte B — La scala, versione 3

### Come leggere ogni gradino

Ogni gradino ha sette parti, sempre le stesse, perché si possano confrontare:

- **Intenzione**: cosa cerca, in una frase.
- **Input**: cosa deve esistere prima per poterlo salire.
- **Artefatto**: cosa resta scritto o eseguibile quando si sale. Sempre qualcosa di concreto: un
  file, un test, uno script.
- **Cancello**: cosa deve essere vero per passare al successivo. Se non si soddisfa, non si sale.
- **Chi decide**: il proprietario del progetto, l'agente, o nessuno perché è automatico.
- **Fallimento che evita**: il colpo reale che l'ha originato. È questo che lo rende credibile.
- **Prova**: il commit o il documento in cui sta.

Due chiarimenti importanti. Primo: **la scala è neutrale rispetto allo strumento**. Ogni artefatto
è un file, un test o uno script; nessuno richiede Forge. Forge li automatizza (i cancelli, i
comandi, il registro delle voci in sospeso), ma il gradino esiste senza Forge. Secondo: **i gradini
non sono strettamente sequenziali**. Ci sono tre fasi: quelli da 0 a 4 sono di avvio e si salgono
una volta per progetto; quelli da 5 a 10 sono il ciclo che si ripete a ogni modifica; e quelli da
11 a 15 sono di esercizio, quando il sistema è già vivo. Il 15 chiude il ciclo e torna allo 0 per il
progetto successivo.

### Come si esegue ogni gradino: il contratto

La scheda di sette parti dice cosa cerca ogni gradino e cosa lascia. Ma un gradino si capisce
davvero solo quando si vede **come si chiede, cosa deve tornare e come so che è tornato completo**.
Per questo ogni gradino ha, oltre alla scheda, un **contratto** in un file proprio dentro
`peldanos/`, sempre con le stesse cinque sezioni:

1. **Contesto richiesto** — nominato in modo generico ("rilevazione dei dati di volumetria",
   "accesso in lettura al sistema precedente", "la lista delle azioni con conseguenze reali"), senza
   scendere nel dettaglio dell'ingegneria dei sistemi. Le rilevazioni sono per natura incomplete;
   non proviamo a renderle complete con un modulo.
2. **Prompt** — ciò che si dà al modello, testuale. Quello iniziale e, quando il gradino è una
   conversazione, quello di chiusura. Tutti portano la stessa clausola, che è il cuore della
   faccenda: *il modello valuta se il contesto basta; se non basta, chiede tutto ciò che manca prima
   di proseguire; e non stima né inventa un dato che solo il business ha*. Chi sa cosa gli manca per
   calcolare è il modello, non un modulo.
3. **Risultato atteso** — le caratteristiche dettagliate dell'artefatto: quale file, quali sezioni,
   cosa deve avere ciascuna, cosa non può mancare.
4. **Verifica di completezza** — la lista di controlli che il proprietario fa sull'artefatto,
   **senza leggere codice**. Se uno dà "no", il gradino non è salito.
5. **Segnali d'allarme** — due o tre sintomi che il gradino è stato salito male anche se sembra
   salito. Sono quelli che si vedono settimane dopo, quando fa già male.

E nell'intestazione di ogni contratto, oltre alla fase e alla forma, la **dimensione**: se il
gradino è obbligatorio in ogni progetto o proporzionale, e cosa significa "proporzionale" in uno
piccolo.

**I prompt sono in inglese.** È una decisione (D-013) e ha tre ragioni: lo stesso contenuto in
spagnolo occupa tra il 30 e il 50 % di token in più; la capacità dei modelli di seguire istruzioni è
meglio calibrata in inglese, così un prompt in inglese tollera meglio la brevità senza diventare
ambiguo; e il vocabolario del mestiere (test, commit, rollback, mock) è inglese. Sotto ogni prompt
c'è la spiegazione, nella lingua del lettore, di cosa stiamo chiedendo e perché ogni clausola è lì:
il prompt è un unico pezzo identico nelle otto versioni del documento; la spiegazione è ciò che si
traduce. E tutti terminano con "Reply in my language", perché il prompt è in inglese ma la
conversazione non deve esserlo.

Questi sedici contratti sono, inoltre, ciò che poi si esporta in Forge: oggi Forge inietta una
dottrina quando si attraversa un cancello; il contratto del gradino *è* quella dottrina, e il
prompt *è* ciò che si inietta. Scriverli per il corso e scriverli per il flusso di Forge è lo stesso
lavoro.

### Cosa è obbligatorio e cosa è proporzionale, secondo la dimensione del progetto

Una domanda che spunta subito: "tutto questo per un sistema piccolo?". La risposta è che sedici
gradini non sono sedici settimane; diversi si salgono in un'ora, e quelli proporzionali si
restringono con il progetto. Ciò che non si restringe è la lista di quelli che non si negoziano.
Questa tabella è una proposta `[ipotesi]` da confermare con il primo progetto che userà il metodo
dall'inizio alla fine:

| Gradino | Progetto piccolo (un proprietario, pochi utenti, niente soldi in gioco) | Progetto con utenti e conseguenze |
|---|---|---|
| 0 Idoneità | obbligatorio (un'ora) | obbligatorio |
| 1 Patto | obbligatorio (mezz'ora) | obbligatorio |
| 2 Definizione | obbligatorio, cinquanta righe bastano | obbligatorio |
| 3 Dimensionare | obbligatorio, mezza pagina e una decisione | obbligatorio, completo |
| 4 Scheletro | obbligatorio se avrà utenti | obbligatorio |
| 5 Voci in sospeso | obbligatorio | obbligatorio |
| 6 Decisioni | obbligatorio | obbligatorio |
| 7 Test in rosso | obbligatorio | obbligatorio |
| 8 Simmetria | la regola sì; la mappa, facoltativa | obbligatorio con mappa |
| 9 Misurare | proporzionale: contare e annotare | obbligatorio, con misuratori e budget |
| 10 Verifica onesta | obbligatorio | obbligatorio |
| 11 Audit | uno, prima della produzione | periodico |
| 12 Fail-closed | facoltativo se è di sola lettura | obbligatorio |
| 13 Integrazione e deployment | minimo: test da soli, configurazione fuori, rollback | obbligatorio, completo |
| 14 Documentazione | minimo: ripristino | i tre manuali |
| 15 Residente e retrospettiva | retrospettiva di una pagina | entrambi |

In sintesi: ci sono nove gradini che non si negoziano in nessun progetto (0, 1, 2, 3, 5, 6, 7, 10
e la retrospettiva del 15), e sette che si dimensionano con il progetto.

### Come si usa con qualunque strumento

Il metodo è neutrale rispetto allo strumento; ciò che cambia da uno all'altro è **dove si mette
ogni artefatto** perché il modello lo legga. La corrispondenza, per gli strumenti più usati a fine
2026:

| Artefatto del metodo | Claude Code | Cursor | Codex CLI / Gemini CLI | Forge |
|---|---|---|---|---|
| Patto di convivenza (G1) e routine (G5, G6, G7, G8, G10, G14) | `CLAUDE.md` del progetto | `.cursor/rules/` | `AGENTS.md` / `GEMINI.md` | dottrine iniettate per cancello |
| Definizione del progetto (G2) | `CLAUDE.md` + `docs/STATUS.md` | uguale, in regole e doc | uguale | `PROJECT.md` + `.forge/sumi-context.md` |
| Registro delle voci in sospeso (G5) | `docs/PENDING.md` o issue | uguale | uguale | registro nativo delle voci in sospeso con verbi |
| Prompt di gradino (tutti) | si incollano nella chat salendo il gradino | uguale | uguale | si iniettano attraversando il cancello |
| Cancelli (G4) | `docs/GATES.md`, manuale | uguale | uguale | da G1 a G9, automatici |
| Misuratori e budget (G9) | script nel repository con test | uguale | uguale | uguale, più il cricchetto statico |

La colonna di Forge è quella che automatizza di più; le altre tre funzionano altrettanto bene se il
proprietario fa a mano ciò che Forge fa da solo: incollare il prompt del gradino al momento giusto
ed esigere la verifica di completezza prima di passare al successivo. Questa è, di fatto, la pratica
del corso.

### Passo 0 — Questo progetto si può affrontare così? (l'idoneità)

Questo gradino ha una storia particolare. Pablo l'ha detto il 17 ottobre: c'è qualcosa di previo a
tutto, che non sta in nessun repository perché è sempre arrivato già deciso — la decisione di **se
un progetto si affronta con questo metodo o no**. È un criterio che viveva nella sua testa, e che
elaboreremo insieme. Quindi tutto ciò che segue in questo gradino è, in parte, confermato da lui, e
in parte ipotesi mia per cominciare la conversazione. Lo distinguo con cura.

- **Intenzione**: decidere se un progetto si affronta con questo metodo, e con un agente davanti, o
  no, PRIMA di aprire il repository. Perché se entri in un progetto che non regge, il metodo degrada
  in "programmare con l'IA" e lì sì che il proprietario finisce per leggere codice.
- **Input**: la richiesta del cliente, il dominio del business, i dati, la tecnologia, gli ambienti
  disponibili, e chi sarà il proprietario.
- **Artefatto**: una scheda di idoneità di una pagina, con i criteri valutati e la decisione: va,
  non va, o va con condizioni.
- **Cancello**: i criteri escludenti sono tutti in verde, e il punteggio di quelli che pesano
  supera la soglia (soglia che ancora non abbiamo definito).
- **Chi decide**: oggi, Pablo. L'idea è che il metodo permetta a un'altra persona di deciderlo con
  la stessa scheda.
- **Fallimento che evita**: infilarsi in un progetto in cui l'agente non può verificarsi da solo, o
  in cui non c'è un proprietario del dominio che decida, e finire con l'umano che rivede codice riga
  per riga.
- **Contratto (come si esegue)**: `peldanos/peldano-00-elegibilidad.md`.

**I due criteri escludenti che Pablo ha confermato (17 ottobre).** E attenzione a questo dettaglio,
che mi sembra molto fine: vengono dai progetti che Pablo ha *rifiutato*, non da quelli che ha
accettato. I "no" definiscono il confine meglio dei "sì".

| # | Criterio escludente | Parole di Pablo, testuali (tradotte) | Perché uccide il metodo |
|---|---|---|---|
| X1 | Tecnologia ereditata senza repository accessibile, o con repository che non seguono uno standard | "Tecnologie legacy senza repo accessibile o con repo non standard" | Senza un repository standard non c'è dove lasciare la prova: niente voci in sospeso citate nei commit (gradino 5), né test che viaggino con il codice (7), né integrazione e deployment come pacchetto (13), né documentazione nello stesso commit (14). L'agente lavora alla cieca e non lascia traccia verificabile. |
| X2 | Tecnologia che non si può provare end to end: non si possono eseguire le schermate e accedere a ogni elemento dell'interfaccia con i suoi diversi metodi, validando che la modifica sia arrivata al backend | "Non possiamo testare l'end to end dalla schermata validando le modifiche nel backend"; e poi: "NAC3 non è obbligatorio. SÌ a testare dall'esecuzione delle schermate e dall'accesso a ogni elemento dell'interfaccia con i suoi diversi metodi" | Senza quella verifica da schermata a backend l'agente non può provarsi da solo (gradini 7, 9 e 10), e allora il proprietario dovrebbe leggere codice — che è proprio ciò che il metodo promette di evitare. |

Una precisazione che Pablo ha fatto e che vale oro per la neutralità di strumento: **NAC3 (il
protocollo che Forge usa perché le schermate si possano operare da programma) NON è condizione; è
il mezzo con cui oggi ci riusciamo**. Il criterio neutrale resta così: l'interfaccia si può
eseguire da programma, e ogni elemento della schermata è accessibile con i suoi diversi metodi
(cliccare, digitare, leggerne lo stato), in modo che un test possa percorrere la schermata e poi
verificare l'effetto nel backend. Una tecnologia la cui interfaccia non espone i suoi elementi a un
"driver" (come Playwright, per esempio) resta fuori, anche se ha un repository.

E una lettura mia su questi due: in fondo sono **la stessa condizione vista da due lati**. L'agente
deve potersi verificare da solo, end to end, e lasciare la prova nel repository. X1 è la metà "dove
resta la prova?"; X2 è la metà "come si produce la prova?". Questo trasforma due delle mie ipotesi
qui sotto (D3 e D8) in conseguenze di X1 e X2, non in criteri a parte.

`[ipotesi]` **Criteri candidati che vedo nei tre casi.** Questi vanno confermati, pesati e
completati con Pablo; di sicuro mancano quelli che stanno nella sua testa.

| # | Criterio candidato | Come si è visto nei casi | Escludente? |
|---|---|---|---|
| D1 | C'è un proprietario del dominio con criterio e con tempo per decidere (non per programmare) | Pablo in tutti e tre; "regola Pablo", "decisione Pablo" con data | `[?]` |
| D2 | C'è un "oracolo" di verità verificabile: dati reali, un sistema esterno, produzione in sola lettura | la Mutua e il suo Autorizzatore come oracolo (il caso 1.355 contro 1.234); produzione in sola lettura | `[?]` |
| D3 | L'agente può provare da solo: accesso ad ambienti di test, integrazione continua, dati di test | UAT nei due progetti dell'Associazione; un seminatore di dati anonimizzati (pnd511) | assorbito da X2 |
| D4 | La tecnologia rientra in ciò che l'agente padroneggia senza inventare (Node, Python, SQL, React) | tutti e tre | `[?]` |
| D5 | L'errore ha conseguenze reali (soldi, salute, esercizio), il che giustifica il fail-closed | la Mutua (salute, addebiti), l'Associazione (famiglie) | `[?]` |
| D6 | La volumetria si può conoscere dal primo giorno (dimensionamento G9) | Kikan: 3,4 milioni di righe all'anno; la Mutua: 7.819 righe | `[?]` |
| D7 | Il cliente tollera un tempo di maturazione e un umano nel circuito (non tutto automatico dal primo giorno) | l'approvatore automatico con modalità di prova; l'umano nel circuito alla Mutua | `[?]` |
| D8 | Progetto nuovo, o ereditato ma verificabile con audit (se c'è legacy: si fa l'audit prima, e zero "fallback" al legacy) | SQ 0.2; lo strumento di migrazione di Forge | assorbito da X1 |
| D9 | Il perimetro sta in un repository e un proprietario (senza coordinamento tra più team) | tutti e tre | `[?]` |
| D10 | I segreti e gli accessi si possono isolare (cassaforte, file di ambiente, permessi limitati) | `forge-embed.env`, la chiave API associata a chi l'ha creata | `[?]` |

**Domande da elaborare insieme**: da D1 a D10, quali altri sono escludenti e quali pesano? Che peso
ha ciascuno? Quali altri progetti Pablo ha rifiutato e perché? E, molto importante, ci sono criteri
di business (margine, relazione con il cliente, tempo disponibile di Pablo) che non escono da
nessun repository e che pure decidono?

### Passo 1 — Il patto di convivenza (le regole prima del codice)

Prima di scrivere una sola riga, umano e agente si mettono d'accordo su come lavoreranno. Sembra
una formalità, e non lo è: è ciò che evita l'80 % delle frustrazioni del primo mese.

- **Intenzione**: fissare come lavorano l'umano e l'agente prima della prima riga di codice.
- **Input**: nulla; è il primo file del progetto.
- **Artefatto**: un documento di standard di qualità (in Forge si chiama `SQ.md`, ma può chiamarsi
  come vuoi) che dica, come minimo: il tempo dell'umano è sacro (non si spende in cose che l'agente
  può risolvere da solo); zero debito tecnico, cioè quando qualcosa si rompe si corregge alla radice
  e si aggiunge la regressione nella stessa sessione; il perimetro è esatto, né più né meno di quanto
  chiesto; si parla nella lingua dell'utente; la documentazione si aggiorna nello stesso commit; e
  non si annuncia mai come fatto qualcosa che non è stato fatto.
- **Cancello**: il patto è nel repository e si legge a ogni sessione.
- **Chi decide**: il proprietario. L'agente può proporre modifiche, ma non modifica il patto per
  conto suo.
- **Fallimento che evita**: l'agente che "aiuta" allargando il perimetro perché gli è sembrata una
  buona idea; quello che lascia debito "per dopo" (e il dopo non arriva mai); e quello che riferisce
  come fatto ciò che *crede* di aver fatto.
- **Prova**: `2219f7a` (25 maggio); le regole SQ da 1 a 9 in `src/chat/server.ts`; `docs/SQ.md`,
  sezioni da 0.1 a 0.11.
- **Contratto (come si esegue)**: `peldanos/peldano-01-contrato-de-convivencia.md`.

### Passo 2 — La definizione del progetto e la lettura obbligatoria

Ogni sessione dell'agente parte da zero: non si ricorda di ieri. Dunque bisogna dargli una mappa, e
bisogna obbligarlo a leggerla prima di toccare qualunque cosa.

- **Intenzione**: che ogni sessione cominci sapendo cos'è il progetto, in che stato è e quali
  decisioni sono già state prese.
- **Input**: il patto (gradino 1) e la richiesta del cliente.
- **Artefatto**: un file di progetto operativo (`PROJECT.md` o `CLAUDE.md`), e qui un'enfasi:
  BREVE. È il programma, non la storia. Più un file di stato vivo (in Forge,
  `.forge/sumi-context.md`) con la specifica attuale, la porzione su cui si sta lavorando, le
  decisioni recenti e i dubbi aperti. E una memoria delle decisioni.
- **Cancello**: l'agente legge la mappa prima di toccare codice. In Forge è una regola esplicita:
  "leggi prima il grafo della conoscenza".
- **Chi decide**: il proprietario definisce; l'agente mantiene aggiornato.
- **Fallimento che evita**: due, ben concreti. Uno: lavoro da buttare per non aver letto la mappa
  (mi è successo il 12 giugno ed è costato un pomeriggio). Due: il `CLAUDE.md` di Kikan cresciuto
  fino a 9.661 righe e 789 kilobyte, impossibile da leggere per chiunque — il file operativo e il
  libro dei casi devono essere file distinti.
- **Prova**: SQ 1.1 (lettura obbligatoria); memoria `feedback_read_knowledge_graph_first`;
  `AUDITORIA_CALIDAD_CODIGO_2026_10_15.md`.
- **Contratto (come si esegue)**: `peldanos/peldano-02-definicion-y-lectura.md`.

### Passo 3 — Dimensionare prima di progettare l'architettura

Questo è il gradino che costa di più saltare, e lo sappiamo perché l'abbiamo saltato.

- **Intenzione**: che le decisioni strutturali (quale motore di database, se l'interfaccia è
  sincrona o asincrona, quanta concorrenza) si prendano con i numeri e non a gusto.
- **Input**: una rilevazione dei dati di volumetria fatta con il business (entità, eventi,
  operatori nel picco, conservazione, carichi eccezionali), per natura incompleta; e accesso in
  lettura al sistema precedente se esiste. Ci sono dati che **solo il business ha** e che il modello
  non può inferire: per questo il prompt gli esige di valutare se sono completi e di chiedere quelli
  che mancano, invece di stimarli con la faccia di chi è sicuro.
- **Artefatto**: un registro di dimensionamento con opzioni FISSE (non una lista aperta: tre o
  quattro opzioni concrete) e quella scelta. In Forge è il cancello G9. E le decisioni
  "asimmetriche" dichiarate esplicitamente — per esempio, "l'interfaccia di persistenza è asincrona
  dalla riga uno anche se il primo motore è sincrono", perché se sbagli costa poco e se non lo fai
  costa una fortuna.
- **Cancello**: il dimensionamento è registrato prima di montare lo scheletro.
- **Chi decide**: il proprietario sceglie tra le opzioni fisse; l'agente le presenta con i numeri.
- **Fallimento che evita**: quello di Kikan. Si è partiti con uno storage in file JSON, e quando si
  è misurato è risultato che il sistema avrebbe generato 3,4 milioni di righe all'anno. Cambiare
  l'interfaccia di persistenza dopo è costato la tappa E6 della reingegnerizzazione: tre batterie di
  test intere passate ad asincrono, più di una settimana.
- **Prova**: `0bd1b05` (dimensionamento, 11 ottobre); `7391cc5` (interfaccia di persistenza, 13
  ottobre); SQ 1.2 e 1.3; `docs/doctrine/sizing.md` (i "quattro buchi", più il quinto).
- **Contratto (come si esegue)**: `peldanos/peldano-03-dimensionar.md`.

### Passo 4 — Lo scheletro con i suoi cancelli

Prima che il sistema faccia qualcosa di utile, deve partire, provarsi e distribuirsi VUOTO. Sì,
vuoto. Perché scoprire il deployment alla fine è carissimo.

- **Intenzione**: avere un sistema che parte, si prova e si distribuisce senza ancora nessuna
  funzionalità.
- **Input**: il dimensionamento (gradino 3) e il tipo di flusso (progetto nuovo, correzione, o
  evoluzione di qualcosa che già esiste).
- **Artefatto**: lo scheletro con l'integrazione continua in verde, la struttura dei test montata,
  un deployment in un ambiente di test che funziona, e i cancelli da G1 a G9 dichiarati.
- **Cancello**: lo scheletro è in verde, l'integrazione continua gira, e il deployment
  nell'ambiente di test funziona con zero funzionalità.
- **Chi decide**: l'agente esegue; il proprietario approva visivamente (con uno screenshot o una
  prova automatizzata che lo generi).
- **Fallimento che evita**: in Kikan il deployment è arrivato il 23 settembre, un mese dopo
  l'avvio, e tra il 30 settembre e il 4 ottobre ci sono state cinque voci in sospeso di fila solo
  perché il deployment funzionasse bene. Se lo scheletro fosse stato distribuito vuoto la prima
  settimana, quei cinque colpi sarebbero caduti con zero funzionalità in gioco.
- **Prova**: `docs/doctrine/gates.md`; `workflow-kinds.md` (progetto nuovo, passi 6 di 18); la
  politica di test, "scaffold gate green"; `ci.yml` di Kikan, 28 agosto.
- **Contratto (come si esegue)**: `peldanos/peldano-04-esqueleto.md`.

### Passo 5 — Il piano sono le voci in sospeso

Qui c'è un'idea che, quando la afferri, non la molli più: non c'è "piano" da una parte e "lista di
compiti" dall'altra. **La lista delle voci in sospeso È il piano.**

- **Intenzione**: un'unica coda di lavoro, con ordine e con cancello, che sia la verità del
  progetto.
- **Input**: la specifica iniziale, gli audit, le richieste del cliente, e i colpi.
- **Artefatto**: un registro di voci in sospeso numerate (PND-001, PND-002…), ciascuna con titolo,
  stato, la decisione che l'ha originata e il test che la chiude. E ogni commit cita la sua voce.
- **Cancello**: nessuna modifica entra senza una voce in sospeso; e la voce si chiude con prova, non
  con "fatto".
- **Chi decide**: il proprietario dà la priorità; l'agente propone ed esegue in ordine.
- **Fallimento che evita**: la specifica che "viene superata" e resta obsoleta in due settimane (è
  successo ad Autorizzazioni con il suo documento di progettazione iniziale); e il lavoro di cui,
  sei mesi dopo, nessuno sa perché è stato fatto.
- **Prova**: `4fc82c6` (6 giugno); `docs/PENDING_REGISTRY_PLAN.md`; 641 voci in sospeso in
  Autorizzazioni; 19 documenti di voci in sospeso in Kikan; memoria
  `project_pending_registry_is_plan`.
- **Contratto (come si esegue)**: `peldanos/peldano-05-pendientes.md`.

### Passo 6 — Le decisioni si scrivono accanto al codice

Ogni regola di business e ogni decisione strutturale deve avere un proprietario, una data e un
luogo in cui è scritta. Altrimenti, in sei settimane nessuno sa se "approvata più saldo torna in
coda" era una decisione del cliente o un'idea dell'agente.

- **Intenzione**: che ogni regola di dominio o decisione strutturale abbia proprietario, data e
  luogo.
- **Input**: la conversazione con il proprietario.
- **Artefatto**: la decisione scritta nel commit, nel documento della voce in sospeso, o in un
  registro delle decisioni. E quando il proprietario non ha risposto e l'agente ha dovuto scegliere,
  resta segnata come "decisione per omissione" perché possa essere rivista.
- **Cancello**: una regola di business non entra nel codice senza la sua frase d'origine.
- **Chi decide**: il proprietario. Sempre. Senza eccezioni.
- **Fallimento che evita**: discutere sei settimane dopo perché qualcosa è così; e, peggio,
  l'agente che inventa regole di dominio perché gli sembravano ragionevoli.
- **Prova**: `0ae3ae6 (pnd550)`, con il testo "regola Pablo" e "decisione Pablo 2026-08-10"
  dentro il commit; `docs/DIRECTOR_DECISIONS_2026_06_04.md`; SQ 7 (memoria delle decisioni).
- **Contratto (come si esegue)**: `peldanos/peldano-06-decisiones.md`.

### Passo 7 — I test come lucchetti, provati in rosso

Un test che non hai mai visto fallire non sai se prova qualcosa. Per questo qui la regola non è
"scrivi test"; è "dimostra che il test diventa rosso contro il codice vecchio".

- **Intenzione**: che ogni comportamento che conta abbia un test che FALLISCE se si rompe, e che si
  sappia, con certezza, che fallisce.
- **Input**: la modifica già implementata (di default i test vengono dopo l'implementazione; "prima
  il test" resta un'opzione per perimetri piccoli).
- **Artefatto**: il nuovo test, più la regressione delle voci in sospeso vicine eseguita nella
  stessa sessione. E nel commit, testuale: "provato in ROSSO contro il criterio vecchio",
  "verificato ROSSO 4 su 8".
- **Cancello**: rosso dimostrato → verde → regressione in verde. E l'agente non simula se stesso
  (non sostituisce con simulazioni le parti che vuole proprio provare).
- **Chi decide**: l'agente esegue e riferisce; il proprietario non rivede il test, rivede il
  rapporto.
- **Fallimento che evita**: i test che passano perché non provano nulla; e il verde che nasconde un
  bug — ci è successo che un'intera batteria "morisse" per mancanza di memoria e sembrasse un test
  che fallisce (`1d7a20b`).
- **Prova**: `docs/doctrine/testing-policy.md` (4 giugno); `ab3e529 (pnd517)`; `0ae3ae6
  (pnd550)`; `e18406d (pnd452)`, "rossa senza il try/except".
- **Contratto (come si esegue)**: `peldanos/peldano-07-tests-en-rojo.md`.

### Passo 8 — Simmetria tra produttore e consumatore, e il registro degli anti-pattern

Quando cambi un'estremità (il server, il robot, lo schema del database), l'altra estremità (la
schermata, il contatore, il consumatore) deve cambiare nello stesso commit. Altrimenti, presto o
tardi divergono, e l'utente vede un numero da una parte e un altro numero dall'altra.

- **Intenzione**: che una modifica a un'estremità trascini l'altra, sempre, nello stesso commit.
- **Input**: qualunque modifica di contratto tra due parti del sistema.
- **Artefatto**: il server definisce la lista (le colonne, le cause, i cancelli) e il consumatore
  la legge da lì, invece di averne una copia propria. Più il registro GOTCHAS: ogni anti-pattern con
  il suo odore, la sua causa radice, la sua correzione e come rilevarlo prima.
- **Cancello**: è automatico (regola SQ 14): l'agente cerca l'altra parte prima di dare per chiusa
  una modifica.
- **Chi decide**: nessuno; è automatico.
- **Fallimento che evita**: il contatore che non coincide con la query (1.355 contro 1.234); la
  deriva tra la versione web e quella mobile (GOTCHAS G-2); due copie dello stesso modulo che si
  desincronizzano (G-3; in Kikan ci sono 8 moduli duplicati tra web e mobile, rilevati nell'audit).
- **Prova**: SQ 14; `docs/GOTCHAS.md` (27 maggio); `50fe968 (pnd510)`; `7251129 (pnd509)`.
- **Contratto (come si esegue)**: `peldanos/peldano-08-simetria-y-antipatrones.md`.

### Passo 9 — Misurare prima di costruire, con uno strumento che a sua volta si verifica

Questo è, per me, il gradino più "adulto" di tutti, e quello che ha impiegato più tempo a comparire.
La regola è: ogni numero che alimenta una decisione esce da un programma con test. Non da un
`grep`, non da un'impressione, non da "mi sembra che siano un centinaio".

- **Intenzione**: che ogni numero che alimenta una decisione esca da uno strumento con test, e che
  lo strumento stesso sia sottoposto ad audit.
- **Input**: un'ipotesi (del proprietario o dell'agente) su una causa, una quantità o un costo.
- **Artefatto**: un "misuratore con guardia" (uno script più un test che lo protegge) che viaggia
  nel repository; un budget per percorso (quante query, quanti cicli) stretto sul misurato più un
  margine piccolo; e un "cricchetto", un contatore che può solo scendere.
- **Cancello**: le cinque regole della sezione 11.b di Kikan: (1) misuratore con guardia; (2) se lo
  strumento non esiste, si costruisce; (3) si fa l'audit in due direzioni (dal codice alla misura e
  dalla misura al codice); (4) l'approssimato si segna come approssimato; e (5) chi esegue verifica
  i numeri di chi ha pianificato.
- **Chi decide**: il numero. Il proprietario porta l'ipotesi; l'agente la misura prima di
  costruire. E un'osservazione da mesi di lavoro con Pablo: di solito ha ragione sul sintomo, e la
  causa di solito sta accanto a dove lui la colloca — per questo si misura, non si discute.
- **Fallimento che evita**: i "121 cicli" che erano 79; le "27 corse" che erano 44; il misuratore
  che mentiva perché la base aveva già applicata una modifica di schema; il cricchetto con il
  contatore a zero che non vedeva 84 chiamate.
- **Prova**: `REINGENIERIA_PERSISTENCIA_SQL.md`, sezione 11.b; `880ac0f`, `f955620`,
  `1d55a93`, `0730082` (63 su 60); `_diag_pnd517_counters.py`; memorie
  `feedback_medidor_con_guarda`, `feedback_medir_la_hipotesis`,
  `feedback_validar_limites_con_el_log`.
- **Contratto (come si esegue)**: `peldanos/peldano-09-medir.md`.

### Passo 10 — Verifica onesta e rapporto proporzionato

Se il proprietario non leggerà codice, il rapporto dell'agente deve essere affidabile. Non
"ottimista", non "completo in apparenza": affidabile. E questo ha delle regole.

- **Intenzione**: che il rapporto dell'agente sia affidabile senza che il proprietario legga codice.
- **Input**: il lavoro fatto.
- **Artefatto**: un rapporto che separa chiaramente il "verificato" dal "creduto"; che dichiara i
  suoi punti ciechi (ciò che non ha potuto provare); che copre ogni voce di ciò che è stato chiesto,
  una per una; e che cita la prova (il log, il test, il numero).
- **Cancello**: nessuna affermazione senza la sua prova. "Fatto" si dice solo con la disciplina del
  "fatto" (SQ 5). E davanti a un "è ancora rotto", la prima cosa è confrontare quale versione è
  pubblicata con quale ha la correzione, prima di tornare a diagnosticare.
- **Chi decide**: il proprietario si fida, o chiede la prova. Non rivede mai il codice.
- **Fallimento che evita**: l'errore di autenticazione che Forge ha riferito come "successo" (14
  ottobre); annunciare lavoro non fatto (SQ 9c); e l'agente che dice "corretto" quando la correzione
  sta nel repository ma non è ancora stata pubblicata.
- **Prova**: `docs/doctrine/verification-honesty.md` (10 giugno); SQ 9a, 9b e 9c; SQ 5; memoria
  `feedback_check_published_version_first`.
- **Contratto (come si esegue)**: `peldanos/peldano-10-verificacion-honesta.md`.

### Passo 11 — L'audit periodico come input del piano

Ogni tanto bisogna guardare l'intero sistema con occhi freschi. E ciò che si vede non va in un
rapporto che si archivia: va nella coda delle voci in sospeso.

- **Intenzione**: guardare il sistema completo ogni tanto e convertire ciò che si vede in voci in
  sospeso.
- **Input**: l'intero repository, e la produzione in sola lettura.
- **Artefatto**: un rapporto con rilievi graduati (P0 l'urgente, P1, P2…; o voti per dimensione)
  che termina in voci in sospeso numerate. Idealmente fatto da un auditor diverso dal costruttore:
  nel nostro caso, io (Sumi) faccio l'audit di ciò che Forge costruisce, e Forge assorbe i rilievi.
- **Cancello**: ogni rilievo P0 ha una voce in sospeso aperta prima di dare l'audit per chiuso.
- **Chi decide**: il proprietario dà la priorità ai rilievi.
- **Fallimento che evita**: una password di superamministratore scritta a fuoco nel codice che
  nessuno aveva visto; 264 query che leggevano tabelle intere; una vulnerabilità nota in una
  dipendenza; un componente di schermata di 2.679 righe.
- **Prova**: full scan del 23 giugno e sicurezza del 16 luglio (Autorizzazioni); AUD-* → 19 voci
  in sospeso (Kikan, 28 agosto); `INTEGRIDAD_..._10_14.md`, assorbito in `b266f11`;
  `AUDITORIA_CALIDAD_..._10_15.md`.
- **Contratto (come si esegue)**: `peldanos/peldano-11-auditoria.md`.

### Passo 12 — Fail-closed, lucchetti e zero danno silenzioso

Nel dubbio o nel guasto, il sistema NON agisce. E lo dice. Suona ovvio, ma è il contrario di ciò
che il software fa di default, che nel dubbio va avanti.

- **Intenzione**: che il sistema, davanti a un dubbio o a un guasto, non agisca, e avvisi.
- **Input**: qualunque azione con conseguenze (addebitare, inviare, approvare, cancellare).
- **Artefatto**: lucchetti (doppia sicurezza, pulsante di emergenza), una modalità di prova prima
  di automatizzare davvero, una sentinella che spinge con guardie, permessi e approvazioni espliciti
  per l'agente, e ricerche che, se falliscono, non rompono la schermata.
- **Cancello**: ogni azione irreversibile ha lucchetto e una via del ritorno documentata.
- **Chi decide**: il proprietario approva il lucchetto; il sistema non lo salta mai.
- **Fallimento che evita**: un doppio addebito; un'approvazione automatica senza passare da un
  umano; un `git add -A` che carica un token nel repository; cancellare dati del cliente.
- **Prova**: `0954740 (pnd524)`; `e18406d (pnd452)`; l'approvatore automatico in modalità di
  prova; SQ 0.3 (zero danno silenzioso); i verbi NAC3 con approvazione.
- **Contratto (come si esegue)**: `peldanos/peldano-12-fail-closed.md`.

### Passo 13 — Integrazione continua, ambienti, segreti e deployment come parte del prodotto

Arrivare in produzione deve essere un pacchetto riproducibile: i test girano UNA volta, la
configurazione vive fuori dal repository, e i segreti non girano in giro.

- **Intenzione**: che arrivare in produzione sia un pacchetto riproducibile, con i test eseguiti una
  sola volta e la configurazione fuori dal repository.
- **Input**: lo scheletro (gradino 4) e i test (gradino 7).
- **Artefatto**: un'integrazione continua che esegue la batteria; un deployment che aspetta il
  risultato di quell'integrazione e solo impacchetta e carica; la configurazione solo sul server (in
  un file di ambiente o in una cassaforte); una promozione esplicita dall'ambiente di test a quello
  di produzione; una procedura (runbook) che si può eseguire due volte senza rompere nulla; e la
  quota di minuti di integrazione continua sorvegliata.
- **Cancello**: l'ambiente di test in verde prima di toccare la produzione; il rollback provato; e
  nessun segreto nel repository né nella chat — se se ne è incollato uno per errore, si ruota.
- **Chi decide**: il proprietario promuove in produzione; l'agente prepara tutto.
- **Fallimento che evita**: i test eseguiti tre volte per ogni commit (da 16 a 27 minuti ciascuno;
  2.000 minuti in 16 giorni, quota bruciata); la chiave del database stampata in una trascrizione;
  il CORS derivato solo dal primo nome di dominio del server; la configurazione sovrascritta dalla
  batteria di test (PND-107).
- **Prova**: `39497b0` (gate-ci); `0bd20a8 (PND-107)`; `513c8d0 (PND-108)`; `7658e2e`
  (promozione); memorie `project_kikan_deploy_solo_empaqueta` e
  `project_embed_apikey_environmentfile`.
- **Contratto (come si esegue)**: `peldanos/peldano-13-ci-entornos-secretos-deploy.md`.

### Passo 14 — Documentazione viva e manuali che una persona può seguire senza IA

Il sistema deve potersi usare, mantenere e ripristinare senza l'agente e senza la persona che l'ha
costruito. Se il giorno in cui l'agente non c'è non si può distribuire, non è finito.

- **Intenzione**: che il sistema si possa usare, mantenere e ripristinare senza l'agente e senza il
  costruttore.
- **Input**: ogni modifica (in Forge, il cancello G-DOC).
- **Artefatto**: il manuale utente, quello di manutenzione, il manuale interno di infrastruttura
  "riproducibile a mano, senza IA", quello di disaster recovery, e il diario delle modifiche. Tutto
  nello stesso commit della modifica che l'ha motivato.
- **Cancello**: la documentazione è aggiornata (SQ 4); il manuale si rigenera insieme al sistema.
- **Chi decide**: l'agente mantiene; il proprietario legge il manuale, non il codice.
- **Fallimento che evita**: un documento di gestione dei repository non aggiornato che ha provocato
  un commit nel repository sbagliato; e il `CLAUDE.md` convertito in registro delle modifiche.
- **Prova**: SQ 3.3, 3.4 e 6; il manuale del 26 giugno; `6444ce6 (pnd442)`; `a30cee3 (pnd459)`;
  il manuale di Kikan con immagini incorporate del 16 ottobre.
- **Contratto (come si esegue)**: `peldanos/peldano-14-documentacion-viva.md`.

### Passo 15 — L'agente dentro il sistema, e la retrospettiva con i numeri

L'ultimo gradino ha due parti che sembrano diverse ma chiudono lo stesso ciclo. Primo: l'agente
resta residente in produzione, con perimetro limitato. Secondo: il metodo stesso si rivede con i
numeri, e ciò che si impara torna al gradino 0 per il progetto successivo.

- **Intenzione**: che l'agente resti residente in produzione con perimetro limitato (diagnosi →
  esercizio → supporto), e che il metodo si riveda con i numeri.
- **Input**: il sistema in produzione, gli incidenti, i costi.
- **Artefatto**: l'agente incorporato con una mappa del sistema obbligatoria, permessi limitati, una
  chiave API che agisce come la persona che l'ha creata, e ticket. Più una retrospettiva scritta
  con misurazioni (un paper, un rapporto) che cambia il metodo e torna al gradino 0.
- **Cancello**: l'agente incorporato non può fare ciò che il proprietario non ha approvato; e la
  retrospettiva produce almeno una modifica alla scala.
- **Chi decide**: il proprietario.
- **Fallimento che evita**: la squadra multi-agente che spendeva il doppio e consegnava la metà
  (chiusa con i numeri il 5 giugno); e l'agente che opera dentro un sistema senza averne una mappa.
- **Prova**: `docs/PAPER_SUMI_VS_AGENTIC.md`; `7584f8b`; `1c7c0b5` (l'incorporato, PND-147);
  `c602725` (modalità esercizio); `20fdbe7` e `1558ee4` (PND-257 e PND-223); la memoria
  dell'assistente residente in produzione.
- **Contratto (come si esegue)**: `peldanos/peldano-15-agente-residente-y-retrospectiva.md`.

---

## Parte C — I fallimenti reali, e quale gradino copre ciascuno

Questa tabella è, in un certo senso, la prova della scala: ogni colpo che ci siamo presi deve cadere
in qualche gradino. Se c'è un colpo che non cade in nessuno, manca un gradino.

| Fallimento (e quando è successo) | Gradino che lo copre | È chiuso? |
|---|---|---|
| La squadra multi-agente: 60 dollari e 73 minuti per una consegna a metà (5 giugno) | 15, retrospettiva con numeri | sì (riprogettato) |
| Lavoro scartato per non aver letto la mappa (12 giugno) | 2, lettura obbligatoria | sì |
| PND-300: tre correzioni che non erano alla radice (14 luglio) | 1, zero debito / 9, misurare | sì (al quarto giro) |
| Il contatore 1.355 contro 1.234 (7 agosto) | 9, strumento / 8, simmetria | sì |
| 3,4 milioni di righe all'anno su file JSON, interfaccia sincrona (11 ottobre) | 3, dimensionare | sì (tappe da E1 a E12) |
| Misuratori che mentivano: 27 che erano 44, il cricchetto a zero (13 ottobre) | 9, verificare lo strumento | sì |
| Il turno orfano di 1 ora e 43, sei commit invisibili (14 ottobre) | 10, verifica onesta / 12, fail-closed | sì (versione 1.18.0) |
| Test eseguiti tre volte per commit; quota di GitHub Actions bruciata (14 ottobre) | 13, integrazione come prodotto | sì (gate-ci); la quota deve essere aumentata da Pablo |
| Due porte di amministratore in 24 ore (15 ottobre) | 11, audit esterno / 12, lucchetti | sì (PND-223 ritirata) |
| La chiave di MariaDB e le chiavi `yerp_` incollate nella chat (14 e 16 ottobre) | 13, segreti | la rotazione è in sospeso da Pablo |
| "reported error: success" (14 ottobre) | 10, rapporto proporzionato | in sospeso (è una correzione di una riga) |
| Il `CLAUDE.md` di 9.661 righe (15 ottobre) | 2, file operativo contro libro dei casi | in sospeso |
| CORS derivato dal primo nome di dominio; la procedura guidata di configurazione di UAT dava errore 500 (16 ottobre) | 13, deployment / 8, simmetria | il prompt per Forge è consegnato; in sospeso l'applicazione |
| Forge Mobile perde le schede (16 ottobre) | 10 / 12 | diagnosi fatta; correzione in sospeso |

---

## Parte D — Cosa manca da elaborare (per la prossima passata)

Fatto nella versione 2 (17 ottobre, pomeriggio): la tesi di apertura ("l'IA non interrompe il
metodo: lo continua"), i sedici contratti di gradino in `peldanos/`, e il repository proprio del
metodo. Fatto nella versione 3: il nome, i contratti arricchiti (dimensione, segnali d'allarme,
prompt in inglese con spiegazione), la guida per dimensione di progetto e la guida per strumento.
Resta:

1. **Il gradino 0 completo**: la lista reale dei criteri (quelli di Pablo più le mie ipotesi),
   quali escludono e quali pesano, i pesi, la soglia, e i progetti rifiutati come controesempi.
   Abbiamo già X1 e X2; manca il resto.
2. **L'ordine e il raggruppamento**: la scala ha tre fasi (avvio, da 0 a 4; ciclo, da 5 a 10;
   esercizio, da 11 a 15). Bisogna confermare se si insegna così o se conviene cominciare dal
   ciclo, che è ciò che un allievo userà tutti i giorni.
3. **Un nome memorabile per ogni gradino**, in una frase, per i manuali e le pubblicazioni.
4. ~~Cosa è minimo e cosa è facoltativo secondo la dimensione del progetto~~ — **proposto** nella
   tabella "Cosa è obbligatorio e cosa è proporzionale", segnata come ipotesi finché un progetto non
   la confermi.
5. **La mappatura su Forge**: quali gradini sono già cancelli o comandi (da G1 a G9, il registro
   delle voci in sospeso, il dimensionamento, le dottrine) e quali mancano per poter esportare la
   scala come flusso di esecuzione.
6. **La pratica**: il manuale-corso (`MANUAL_CURSO.md`), con un compito pratico per gradino che un
   allievo possa ripetere nel proprio repository fino ad avere l'applicazione in produzione. In
   corso.
7. **Ciò che NON è nella scala e dovrebbe esserci** `[ipotesi]`: la gestione del costo dei token e
   delle quote come budget esplicito (oggi è reattiva: lo scopriamo quando brucia); la rotazione dei
   segreti come routine e non come incidente; e un criterio per quando l'umano SÌ deve guardare il
   codice — oggi la risposta è "mai", ma i due rapporti di questa settimana suggeriscono che ci sono
   momenti puntuali in cui conviene.
8. ~~Il nome~~ — **fatto**: Urazuke, il metodo del riscontro (D-014, 17 ottobre).
9. ~~La presentazione pubblica su yujin.app~~ — **fatto** (17 ottobre, sera): la sottopagina
   `yujin.app/urazuke` (repository `pkuschnirof/rpaforce`, cartella `web/yujin.app/urazuke/`), con
   la landing nelle dieci lingue di interfaccia del sito, i tre documenti HTML nelle otto lingue
   del metodo, e una scheda in evidenza nella home di yujin.app. Resta da pubblicarla con un push
   su `main` di quel repository e, quando questo repository si aprirà, collegarlo da lì.
10. **Provare i contratti su un progetto reale.** I sedici prompt sono scritti a partire da ciò che
    abbiamo fatto, non eseguiti così come sono. Il primo progetto che li userà dall'inizio alla fine
    ne correggerà diversi; fa parte del gradino 15.

---

## Glossario

Ogni sigla, ogni nome proprio e ogni espressione colloquiale che compare in questo documento,
spiegata. In ordine alfabetico. Alcune voci sono termini spagnoli che compaiono in nomi di file o
messaggi di commit dei repository di origine; si mantengono perché la prova possa essere seguita.

**A suon di botte** — Imparare qualcosa perché è andata male, non perché qualcuno l'ha spiegato
prima. Si usa nel senso di "queste regole si sono imparate a suon di botte".

**Agente** — Un programma di intelligenza artificiale che non solo risponde a domande ma esegue
azioni: legge file, scrive codice, esegue comandi, fa commit. In questo documento, "l'agente" è
Forge o Sumi (vedi sotto).

**Anonimizzazione** — In questo documento i clienti reali si chiamano "la Mutua", "l'Autorizzatore"
e "l'Associazione", e i loro sistemi "Autorizzazioni" e "Kikan". È voluto: i nomi restano riservati
finché non avremo il permesso di usarli.

**Anti-pattern** — Un modo di fare le cose che sembra ragionevole ma che si sa che finisce male. Il
contrario di un "pattern" (una buona pratica comprovata).

**Artefatto** — Qualcosa di concreto che viene prodotto: un file, un test, uno script, un
documento. Nella scala, ogni gradino lascia un artefatto.

**Asincrono / sincrono (async / sync)** — Una chiamata sincrona aspetta il risultato prima di
proseguire; una asincrona lascia il compito in corso e prosegue, e poi raccoglie il risultato. I
database reali in Node sono asincroni; per questo l'interfaccia deve esserlo dall'inizio.

**Associazione (l')** — Così questo documento chiama il cliente del sistema Kikan (il suo nome
reale resta riservato): un'associazione civile che assiste famiglie e aveva bisogno di uno
sportello omnicanale (più canali di contatto in un solo posto) e di campagne.

**AUD-*** — La serie di audit numerati che si sono fatti in Kikan ad agosto (AUD-1, AUD-2…), e che
hanno generato voci in sospeso.

**Autorizzatore (l')** — Così questo documento chiama il sistema della Mutua che riceve gli ordini
e restituisce un verdetto (approvata, respinta). Per noi funziona da "oracolo": la verità contro
cui si verificano i contatori.

**Autorizzazioni** — Nome con cui questo documento chiama il primo sistema in produzione (quello
reale resta riservato): automazione (RPA) della gestione degli ordini della Mutua per un ente
sanitario, con un umano nel circuito.

**AutoApprovatore** — Nel sistema di Autorizzazioni, il robot che approva ordini automaticamente
secondo regole. Prima è girato in "modalità di prova" (vedi dry-run) prima di lasciarlo agire.

**Autopilot (pilota automatico)** — Un mandato scritto perché l'agente lavori da solo per ore (24 o
48) facendo commit e push senza chiedere, e consegni un riassunto alla fine.

**await** — In JavaScript, la parola che indica "aspetta il risultato di questa chiamata
asincrona". Una chiamata al database senza `await` è un bug silenzioso: il codice prosegue prima di
avere il dato.

**Backend** — La parte del sistema che non si vede: il server, la logica, il database. Il contrario
di "frontend" (la schermata).

**Batteria (di test)** — L'insieme completo dei test di un progetto, eseguiti tutti insieme.

**Bruciare la quota** — Esaurire il budget di qualcosa (minuti di integrazione continua, token
dell'IA) prima del tempo.

**Cancello (gate)** — Una condizione che deve essere soddisfatta per poter avanzare. Se non si
soddisfa, non si passa. In Forge sono numerati da G1 a G9.

**Cassaforte (vault)** — Un luogo cifrato in cui si conservano segreti (chiavi, password) invece di
lasciarli in file di testo.

**Causa radice** — Il motivo reale di un problema, in opposizione al sintomo. Correggere il sintomo
fa tornare il problema; correggere la causa radice, no.

**CI (integrazione continua)** — Un servizio (qui, GitHub Actions) che esegue i test
automaticamente ogni volta che si carica codice.

**CLAUDE.md / PROJECT.md** — Il file che l'agente legge all'inizio di ogni sessione per sapere
cos'è il progetto e come lavorarci.

**Colpo** — Un incidente, un errore che ha fatto male. "Colpo → regola" è il pattern di nascita di
tutte le dottrine.

**Commit** — Un punto salvato nella storia del codice, con un messaggio che spiega cosa è cambiato e
perché. Ogni commit ha un identificatore breve (per esempio `2219f7a`).

**Concorrenza** — Quante cose succedono contemporaneamente nel sistema (utenti simultanei, processi
in parallelo).

**CORS** — Un meccanismo di sicurezza dei browser che decide da quali domini si può chiamare un
server. Mal configurato, blocca chiamate legittime con errori confusi.

**Cricchetto** — Un meccanismo che gira solo in un senso. In Kikan, un contatore di chiamate senza
`await` che può solo scendere: se sale, il test fallisce.

**CVE** — Un identificatore pubblico di una vulnerabilità di sicurezza nota in un componente
software.

**Debito tecnico** — Ciò che resta fatto male "da sistemare dopo". Il metodo lo vieta: ciò che si
rompe si corregge alla radice nella stessa sessione.

**Dottrina** — In Forge, un documento breve che fissa come si fa qualcosa (come si testa, come si
verifica, come si dimensiona). Ce ne sono 31. È la forma che il metodo prende dentro lo strumento.

**Driver (criterio)** — Un fattore che spinge una decisione in un senso o nell'altro. Nel gradino
0, i driver sono i fattori che decidono se un progetto è idoneo.

**Dry-run (modalità di prova)** — Eseguire un processo "a secco": fa tutto tranne l'azione finale.
L'AutoApprovatore è girato così all'inizio, mostrando cosa avrebbe approvato senza approvare nulla.

**E1–E12** — Le dodici tappe della reingegnerizzazione della persistenza di Kikan (il passaggio
dallo storage in file JSON a un database MariaDB).

**Incorporato (embed, Forge Embedded)** — Forge installato dentro il sistema del cliente, come
assistente residente, con permessi limitati.

**End to end (E2E, da un capo all'altro)** — Provare il sistema completo, dalla schermata fino al
database, come lo userebbe una persona.

**Ambiente** — Un'installazione separata del sistema. Quelli abituali: sviluppo (la macchina del
programmatore), UAT (test del cliente) e PROD (produzione, quella vera).

**Scheletro (scaffold)** — La struttura iniziale di un progetto, senza funzionalità: parte, ha
test vuoti, si distribuisce.

**Fail-closed** — "Fallisce chiuso": davanti al dubbio o all'errore, il sistema non agisce. Il
contrario di "fail-open", che davanti al dubbio va avanti.

**Fallback (al legacy)** — Tornare a un percorso vecchio quando il nuovo fallisce. Il metodo lo
vieta (SQ 0.2): se c'è un sistema vecchio, si sottopone ad audit e si migra; non si lascia come rete
di sicurezza silenziosa.

**Fixture** — Dati di test che si caricano prima di eseguire un test o un deployment.

**Flip (interruttore)** — Una modifica di configurazione che sceglie tra due percorsi (per
esempio, il motore vecchio o quello nuovo) senza toccare codice.

**Forge (Yujin Forge)** — Lo strumento che Pablo ha costruito: uno strato sopra Claude Code che gli
aggiunge il metodo (dottrine, cancelli, voci in sospeso, un pannello di chat, un'app mobile, e la
modalità incorporata). `yf` è il suo comando.

**Frontend** — La parte visibile del sistema: le schermate.

**Full scan** — Una query al database che legge l'intera tabella perché non ha un indice che la
aiuti. Con tabelle piccole non si nota; con milioni di righe, butta giù il sistema.

**G-DOC** — In Forge, il cancello che esige che la documentazione si aggiorni nello stesso commit
della modifica.

**gate-ci** — Il job del deployment di Kikan che aspetta che l'integrazione continua finisca in
verde prima di impacchettare. Creato il 14 ottobre.

**GCP** — Google Cloud Platform, il cloud in cui girano i server dei due sistemi dell'Associazione.

**GOTCHAS** — Un file che registra "trappole" note: errori che abbiamo già pagato una volta, con
il loro odore, la loro causa radice, la loro correzione e come rilevarli prima.

**Greenfield / brownfield** — Un progetto nuovo da zero (greenfield, "campo verde") contro uno che
parte da qualcosa di esistente (brownfield, "campo dismesso").

**Grep** — Un comando che cerca testo nei file. "Misuratore, non grep" significa: un numero
importante non si ottiene contando con una ricerca di testo, ma con un programma con test.

**Heap** — La memoria che un programma usa. "La batteria moriva per heap" vuol dire che i test
finivano la memoria e sembrava che fallissero.

**HITL (human in the loop, umano nel circuito)** — Un progetto in cui una persona approva prima
che il sistema agisca. In Autorizzazioni, l'approvatore manuale.

**Orfano (turno orfano)** — Un processo che continua a girare quando chi l'ha lanciato l'ha già
perso di vista. Il 14 ottobre un turno di Forge ha lavorato così per un'ora e quarantatré.

**Indice** — Una struttura ausiliaria del database che rende veloce una ricerca. Senza indice, la
query è un full scan.

**IPC (guinzaglio tra processi)** — Un canale tra due processi. In Forge 1.18.0 si è usato come
"guinzaglio": se il processo padre muore, il figlio lo viene a sapere e si spegne.

**JSON (storage in)** — Conservare i dati in file di testo in formato JSON invece che in un
database. Serve per cominciare; non serve per milioni di righe.

**Kikan** — Il sistema di sportello omnicanale e campagne dell'Associazione, il secondo sistema in
produzione.

**Legacy (ereditato)** — Un sistema vecchio ancora in uso.

**Log** — Il registro di ciò che un programma va facendo. "Valida con il log" significa: non
fidarti di ciò che l'agente dice di aver fatto, guarda il registro.

**Lucchetto** — Una protezione che impedisce che un'azione pericolosa avvenga senza una condizione
esplicita. Per esempio, il pulsante di emergenza ha un lucchetto dedicato: non si può premere per
sbaglio.

**MariaDB** — Il motore di database SQL che Kikan usa in produzione.

**Mentire (un misuratore)** — Quando uno strumento restituisce un numero sbagliato perché non vede
parte di ciò che deve misurare. Ci è successo due volte.

**Mese tre** — Espressione nostra per il momento in cui un sistema costruito in fretta comincia a
mostrare i suoi problemi: quando ha già dati veri e utenti veri.

**Misuratore con guardia** — Uno script che misura qualcosa (quante query, quanti cicli) e che ha un
test proprio che verifica che il misuratore misuri bene. "Con guardia" vuol dire "protetto da un
test".

**Mock (simulare)** — Sostituire una parte reale del sistema con una simulazione durante un test.
"Non simulare se stesso" significa non simulare proprio la parte che si vuole provare.

**Mutua (la)** — Così questo documento chiama l'ente di assistenza sanitaria cliente del primo
sistema in produzione (il suo nome reale resta riservato).

**NAC3** — Il protocollo di Forge che fa sì che le schermate di un'applicazione si possano operare
da programma (ogni elemento dell'interfaccia ha un identificatore e dei metodi). Permette il test
end to end. Pablo ha chiarito che non è obbligatorio per il metodo: è il mezzo, non la condizione.

**Node (Node 22)** — L'ambiente in cui gira il JavaScript del server. "Node 22 fisso" vuol dire che
la versione è stata inchiodata perché tutti gli ambienti usino la stessa.

**Oracolo** — Una fonte di verità esterna contro cui si può verificare un risultato. Per i
contatori della Mutua, l'oracolo è l'Autorizzatore.

**P0, P1, P2** — Livelli di priorità di un rilievo: P0 è ciò che va risolto subito.

**Paper** — Un documento di analisi con misurazioni e conclusioni. Il `PAPER_SUMI_VS_AGENTIC` è
quello che ha giustificato la chiusura della squadra multi-agente.

**Sovrascrivere (una configurazione)** — Scrivere sopra qualcosa per sbaglio. "La batteria
sovrascriveva la configurazione del deployment" era il PND-107.

**Lavagna (la bacheca)** — La bacheca condivisa di Forge in cui l'agente lascia rapporti perché
Pablo li legga.

**Playwright** — Uno strumento che controlla un browser da programma per provare schermate come
farebbe una persona.

**PND (voce in sospeso)** — Una voce numerata della coda di lavoro (PND-001, PND-002…). In questo
metodo, le voci in sospeso SONO il piano.

**Budget di query** — Il massimo di query al database che un percorso dell'applicazione può fare,
misurato e protetto da un test. Se una modifica lo supera, il test fallisce.

**Provato in rosso** — Un test di cui si è dimostrato che FALLISCE contro il codice vecchio prima
che la correzione lo metta in verde. Se non l'hai mai visto rosso, non sai se prova qualcosa.

**PROD (produzione)** — L'ambiente vero, quello che usa il cliente.

**Promozione (UAT → PROD)** — Passare qualcosa (configurazione, campagne) dall'ambiente di test a
quello di produzione in modo controllato.

**Pull / push** — Scaricare e caricare codice sul repository remoto (GitHub).

**Modale R8** — In Forge, la finestra che ferma tutto quando l'agente entra in un ciclo senza
avanzare.

**Regressione** — Un test che verifica che qualcosa che già funzionava continui a funzionare dopo
una modifica.

**Relay** — Il servizio intermediario che collega l'app mobile di Forge alla sessione desktop.

**Repository (repo)** — Il luogo in cui vive il codice con tutta la sua storia. "Repo standard"
vuol dire uno gestito con Git e con una struttura riconoscibile.

**Conservazione (retention)** — Quanto tempo si conservano i dati di ogni tabella prima di
cancellarli.

**Rollback (via del ritorno)** — Tornare alla versione precedente quando un deployment va male.

**RPAForce** — Il marchio di Pablo sotto cui si consegnano questi sistemi.

**Runbook** — Una procedura operativa scritta passo per passo, perché chiunque possa seguirla.
"Idempotente" vuol dire che si può eseguire due volte senza rompere nulla.

**SDD** — Un documento di progettazione software scritto prima di costruire.

**Seminatore (seeder)** — Uno script che carica dati di test in un ambiente.

**Shift left** — Spostare i test più presto nel processo di sviluppo, verso la "sinistra" della
linea del tempo, invece di lasciarli per la fine.

**Smell (odore)** — Un segnale che qualcosa non va nel codice, prima che fallisca.

**SQ (Standards of Quality, standard di qualità)** — Il patto di convivenza tra umano e agente in
Forge. Numerati: SQ 1 (il tempo dell'utente è sacro), SQ 2 (zero debito), SQ 3 (ASCII), SQ 4
(documentazione aggiornata), SQ 5 (perimetro esatto), SQ 6 (lingua dell'utente), SQ 7 (simmetria
produttore/consumatore), SQ 8 (autonomia), SQ 9 (verificare prima di affermare). E nel documento
lungo, le sezioni da 0.1 a 0.11.

**SQL** — Il linguaggio dei database relazionali.

**Stringere il tetto** — Abbassare un limite (un budget, un massimo consentito) finché resti appena
sopra il misurato, perché qualunque peggioramento faccia fallire un test.

**Sumi (Sumi-Forge)** — Il nome della sessione di Claude Code che lavora con Pablo nel repository
di Forge; quella che scrive questo documento. Forge è il prodotto; Sumi è chi lo costruisce e fa
l'audit di ciò che Forge fa in altri progetti.

**Tag** — Un'etichetta su un commit che segna una versione (per esempio, v1.18.0).

**TDD** — "Prima il test, poi il codice". Il metodo lo lascia come opzione per perimetri piccoli,
non come regola universale.

**Token** — Due sensi. Nell'IA: l'unità con cui si misura (e si fattura) il testo che il modello
elabora. Nella sicurezza: una credenziale di accesso. "Un `git add -A` con un token" è caricare una
credenziale nel repository per errore.

**Turno** — Un giro della conversazione con l'agente: l'utente chiede, l'agente lavora e risponde.

**UAT** — L'ambiente in cui il cliente prova prima della produzione.

**Urazuke** (裏付け) — Il nome del metodo. In giapponese, il sostegno di cui dispone
un'affermazione, ciò che la regge da dietro; *urazukeru*, sostenere con prove. Si pronuncia
u-ra-ZU-ke. Non si traduce.

**Vibecoding / vibecoder** — Costruire software conversando con un'IA, descrivendo ciò che si
vuole, invece di scrivere il codice a mano. Un vibecoder è chi lo fa.

**Sentinella** — In Autorizzazioni, il processo che controlla periodicamente cosa è rimasto
bloccato e lo spinge, con guardie per non spingere due volte.

**Volumetria** — Quanti dati il sistema gestirà: righe all'anno, utenti, picchi.

**Watchdog (cane da guardia del silenzio)** — Un processo che controlla se un altro continua a dare
segni di vita, e lo uccide se resta zitto troppo a lungo. Forge 1.18.0 l'ha aggiunto perché un
turno non possa più restare orfano.

**yerp_** — Il prefisso delle chiavi API di Kikan.

**yf** — Il comando di Forge nel terminale.

**Yujin** — L'ecosistema di cui Forge è il prodotto commerciale.
