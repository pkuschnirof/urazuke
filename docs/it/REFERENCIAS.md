# Urazuke — Referenze: i casi dietro il metodo

Autore: Pablo Kuschniroff, assistito da Claude Code. Versione 4, 18 ottobre 2026.

Questo documento esiste per una cosa sola: che le procedure e i manuali del metodo restino puliti.
Quando nel documento principale, in un contratto di gradino o in una lezione del corso affermo
qualcosa del tipo "questo l'ho imparato a suon di colpi" o "questo l'ho imposto perché il modello
lo applicava male", non voglio sporcare la spiegazione con date, identificatori di commit e numeri
di voci in sospeso. Metto una marca corta, `[Ref. N]`, e chi ha voglia di indagare il caso viene
qui e lo trova con la sua data, la sua prova e la mia lettura di ciò che è successo. Chi non ha
voglia, continua a leggere senza inciampare.

Due precisazioni prima di cominciare. La prima: i tre sistemi da cui escono questi casi sono reali
e oggi sono in produzione, con gente vera che li usa. I clienti sono anonimizzati, e li chiamo "la
Mutua" (con il suo "Autorizzatore") e "l'Associazione"; i loro sistemi li chiamo "Autorizzazioni" e
"Kikan". Il terzo repository è lo strumento in cui è nato il metodo, yujin-forge, che è mio e porta
il suo nome. I numeri, le date e gli identificatori di commit sono reali; se un giorno avrò il
permesso dei clienti, metterò i nomi.

La seconda precisazione è più importante, e la ripeto nel documento principale perché non voglio
che venga fraintesa: **il metodo non è uscito soltanto dalla casistica dei fallimenti**. È uscito
da due cose che si sono combinate. Da un lato, dalla mia conoscenza dell'ingegneria dei sistemi,
che applico da molto prima che esistessero questi modelli; la maggior parte di ciò che chiedo nei
gradini è ciò che ho sempre chiesto in un progetto ben condotto. Dall'altro lato, dal fatto che gli
incidenti di questi cinque mesi mi hanno mostrato, uno dopo l'altro, **dove i modelli applicano
quei principi in modo fragile**: dove dicono di aver provato e non hanno provato, dove stimano con
la faccia sicura, dove riempiono un buco di regole di business con una trovata, dove riportano di
più. I casi che seguono sono, quindi, la prova di dove bisogna stringere, non l'origine di tutto il
metodo. Leggeteli con quella lente.

---

## Come citare

In qualunque documento del metodo, `[Ref. 26]` rimanda alla voce "Ref. 26" di questo file. Le
voci sono raggruppate per sistema di origine e, dentro ogni gruppo, in ordine cronologico. Alla
fine ci sono tre cronologie complete, nel caso qualcuno voglia vedere la sequenza intera, e una
tabella che mappa ogni fallimento al gradino che lo copre.

---

## A. yujin-forge: dove si è formato il metodo (da maggio a ottobre 2026)

### Ref. 1 — Nascono gli standard di qualità (25 maggio)

Ho scritto il primo documento di standard di qualità, `SQ.md`, il 25 maggio (commit `2219f7a`). È
il primo "patto di convivenza" tra l'umano e l'agente, e l'ho scritto perché erano due settimane
che ripetevo al modello le stesse cose in ogni sessione: che il mio tempo è sacro e non si spende
in ciò che può risolvere da solo; che non si lascia debito tecnico, ciò che si rompe si corregge
alla radice; che la documentazione si mantiene aggiornata; che il perimetro è esatto, né più né
meno di ciò che è stato chiesto. Niente di tutto questo è nuovo nell'ingegneria dei sistemi. La
novità è stata doverlo scrivere per un collaboratore che ogni mattina arriva senza memoria di
ieri. È l'origine del gradino 1.

### Ref. 2 — Il primo registro degli anti-pattern (27 maggio)

Il 27 maggio (commit `73f4029`) ho aperto `GOTCHAS.md`: un file in cui ogni errore che si è
ripetuto resta annotato con un formato fisso, come odora, qual è la causa radice, come è stato
corretto, e come rilevarlo la prossima volta prima che faccia male. L'ho aperto perché il modello
commetteva lo stesso errore in sessioni diverse senza nessuna memoria di averlo commesso prima. È
la metà "anti-pattern" del gradino 8.

### Ref. 3 — I cancelli del flusso, iniettati solo quando servono (2 giugno)

Il 2 giugno (commit `5b47475`) ho definito cancelli espliciti nel flusso di lavoro, numerati da G1
a G9, e un cancello di documentazione, G-DOC, che esige che la documentazione si aggiorni nello
stesso commit della modifica. E ho preso una decisione che si è rivelata importante: la dottrina di
ogni cancello entra nel prompt dell'agente solo nel momento in cui si applica, non sempre, perché
il contesto è finito e ciò che si inietta di troppo si paga in attenzione. È l'antecedente diretto
dell'idea di "contratto di gradino" che si inietta all'attraversamento del cancello.

### Ref. 4 — La politica di testing si riformula (4 giugno)

Fino al 4 giugno insistevo con "prima il test, poi il codice" per tutto. Quel giorno (commit
`a9f59c7`, documento `testing-policy.md`) ho accettato che non serve universalmente: per default i
test vengono dopo l'implementazione, il test-prima resta come opzione per perimetri piccoli e ben
definiti, lo scheletro deve essere in verde come cancello, e ho aggiunto una protezione contro i
cicli, una finestra modale che ferma tutto quando l'agente gira a vuoto senza avanzare. Lo
racconto perché mostra che il metodo si corregge anche da solo quando una mia regola risulta
troppo rigida.

### Ref. 5 — Le decisioni si congelano prima di costruire (4 giugno)

Prima di uno sprint grande ho scritto e numerato tre decisioni strutturali (D1, D2, D3) in un
documento di decisioni del 4 giugno. È stata la prima volta che ho formalizzato qualcosa che ho
sempre fatto nei progetti classici: la decisione si scrive prima di costruire, con la data, perché
dopo nessuno la discuta a memoria. È l'antecedente del gradino 6.

### Ref. 6 — Elimino la squadra multi-agente con un numero in mano (5 giugno)

Avevo una squadra di cinque agenti (direttore, analista, programmatore, tester, montatore di
scheletri) che si passavano il lavoro tra loro. Ho fatto un esperimento misurato: quella squadra
ha speso 60 dollari e 73 minuti e ha consegnato qualcosa a metà; una sola sessione con un solo
agente ci ha messo 90 minuti e ha consegnato qualcosa di pubblicabile. Il 5 giugno (commit
`7584f8b`, documentato in un paper interno) ho eliminato la squadra intera. È il primo caso di
"retrospettiva con un numero in mano, e riprogettazione", ed è il motivo per cui il gradino 15
esige numeri e non impressioni.

### Ref. 7 — Il piano diventa la lista delle voci in sospeso (6 giugno)

Il 6 giugno (commit `4fc82c6`, piano del registro delle voci in sospeso) il piano di lavoro è
diventato la coda delle voci in sospeso: una lista canonica, numerata, con comandi per gestirla,
che si aggiorna a ogni sessione. Ha smesso di esserci un "piano" da una parte e dei "compiti"
dall'altra. È l'origine del gradino 5.

### Ref. 8 — Onestà di verifica e tipi di flusso (10 giugno)

Il 10 giugno (commit `7ab9d8a` e `2c552c0`, documenti `verification-honesty.md` e
`workflow-kinds.md`) ho reso obbligatoria la dottrina in ogni prompt e ho scritto la regola di
"onestà di verifica": verificare che la rete vada davvero in rosso quando deve andarci, dichiarare
i punti ciechi, e fare affermazioni proporzionate a ciò che si è verificato. Ho separato inoltre
tre tipi di flusso: progetto nuovo, correzione ed evoluzione. È l'origine del gradino 10 e della
metà "rosso" del gradino 7.

### Ref. 9 — Lavoro buttato per non aver letto la mappa (12 giugno)

Il 12 giugno una sessione ha cominciato a costruire senza leggere il grafo di conoscenza del
progetto, e il lavoro di un intero pomeriggio è stato da buttare perché contraddiceva decisioni
che erano già scritte. Da lì la regola di lettura obbligatoria del gradino 2: la mappa esiste, ma
se non si obbliga a leggerla, non agisce.

### Ref. 10 — Piloti automatici di 24 e 48 ore (dal 14 al 21 giugno)

Tra il 14 e il 21 giugno ho lasciato l'agente lavorare da solo per un giorno, e poi due, con un
mandato scritto: commit e push per ogni pezzo, senza chiedere, e io ricevevo un riassunto. Lo
racconto perché prova che il metodo regge un'autonomia lunga quando il patto di convivenza e il
registro delle voci in sospeso sono fatti bene; e perché è stato lì che ho imparato a leggere i
riassunti con diffidenza, che è il gradino 10.

### Ref. 11 — Modalità diagnostica su sistemi altrui (luglio)

A luglio (documento `diagnostic-mode.md`) l'agente ha cominciato a entrare in sistemi produttivi
di clienti in modalità diagnostica: sola lettura, perimetro limitato, senza toccare niente. È il
primo livello di perimetro dell'agente residente del gradino 15.

### Ref. 12 — Pattern di prestazioni presi dalla produzione della Mutua (22 luglio)

Il 22 luglio (commit `873339c`) ho incorporato nello strumento pattern di scala estratti dal
sistema della Mutua: quello delle due transazioni e, soprattutto, "misurare prima di toccare". È
stata la prima volta che il metodo si è alimentato di un sistema che era già in produzione, ed è
un antecedente del gradino 9.

### Ref. 13 — L'agente resta residente nella produzione della Mutua (14 agosto)

Il 14 agosto l'agente è rimasto installato dentro il sistema del cliente, come assistente
residente, con tre regole: una mappa del sistema obbligatoria prima di operare, "prima la
soluzione operativa" quando qualcosa fallisce, e la capacità di aprire ticket. È l'origine della
prima metà del gradino 15.

### Ref. 14 — Il dimensionamento come cancello (10 e 11 ottobre)

Il 10 e l'11 ottobre (commit `c602725` e `0bd1b05`, documento `sizing.md`) ho formalizzato il
dimensionamento prima di costruire, scegliendo tra opzioni fisse, e l'ho registrato come un
cancello in più (G9). L'ho formalizzato tardi, dopo il colpo di Kikan che racconto nella referenza
15, ed è proprio quella la lezione del gradino 3.

### Ref. 15 — L'interfaccia di persistenza asincrona dalla riga uno (13 ottobre)

Il 13 ottobre (commit `7391cc5`, documento `persistence-interface.md`) ho scritto la regola per
cui l'interfaccia con il database è asincrona dalla prima riga, anche se il primo motore è
sincrono. È una decisione "asimmetrica": costa poco se hai sbagliato e costa moltissimo se non la
prendi. Lo so perché in Kikan non l'ho presa in tempo e cambiarla dopo è costato un'intera tappa
della reingegnerizzazione, la E6, con tre batterie di test passate ad asincrono. È un caso del
gradino 3.

### Ref. 16 — Il turno orfano di un'ora e quarantatré (14 ottobre)

Il 14 ottobre l'agente ha lavorato un'ora e quarantatré minuti invisibile per me, e ha fatto sei
commit in quel lasso di tempo. È stato un fallimento del metodo, e brutto. L'ho corretto alla
radice nella versione 1.18.0 (commit `b80a659`): una sentinella del silenzio che uccide il turno
se smette di dare segni di vita, un guinzaglio tra processi perché il figlio muoia con il padre, e
28 test. Ricade nel gradino 10 (il rapporto deve essere visibile) e nel 12 (davanti al dubbio, il
sistema non prosegue).

---

## B. Autorizzazioni: il metodo sotto carico reale (da giugno a ottobre 2026)

### Ref. 17 — Il progetto iniziale che il repository ha superato (11 giugno)

Autorizzazioni è partito con un documento di progettazione (l'"opzione C"). Il repository l'ha
superato rapidissimamente: ciò che è stato costruito è stato molto più di ciò che diceva la carta.
La lezione che mi è rimasta, e che sta nel gradino 5, è che la specifica vale come punto di
partenza e il piano vivo sono le voci in sospeso.

### Ref. 18 — Il primo audit delle query senza indice (23 giugno)

Il 23 giugno ho fatto il primo audit dei "full scan" (query che leggono l'intera tabella perché
non c'è un indice) su un sistema vivo. I rilievi sono diventati voci in sospeso, non un rapporto
archiviato. È l'origine del gradino 11.

### Ref. 19 — Lezioni dal cloud di Google (24 giugno)

Gli errori di infrastruttura delle prime settimane nel cloud di Google sono rimasti scritti come
lezioni per non ripeterli. È la prima versione di ciò che poi è stato il manuale di infrastruttura
del gradino 14.

### Ref. 20 — Il manuale utente nasce insieme al sistema (26 giugno)

Il 26 giugno c'era già il manuale utente, con il sistema costruito a metà. L'ho fatto così di
proposito: nei progetti classici il manuale si scriveva alla fine, quando ormai nessuno si
ricordava di niente; con un modello che lo rigenera gratis, non c'è scusa perché non nasca con il
sistema. Gradino 14.

### Ref. 21 — Copia di backup di secondo livello (13 luglio)

Prima di fidarmi del sistema con dati reali ho messo due livelli di backup: uno locale e un altro
nello storage di Google. Gradino 13 e manuale di ripristino del 14.

### Ref. 22 — PND-300: quattro giri fino alla causa radice (14 luglio)

Un bug è tornato tre volte finché non si è trovata la causa reale, il 14 luglio. Ogni "correzione"
precedente era stata sul sintomo. Qui "la correzione è alla radice o non è correzione", che era
già nel patto di convivenza, ha smesso di essere una frase ed è diventata pratica: bisogna misurare
l'ipotesi prima di toccare. Gradini 1 e 9.

### Ref. 23 — Audit di sicurezza (16 luglio)

Il 16 luglio ho fatto il primo audit di sicurezza formale, con rilievi convertiti in voci in
sospeso. È stato quello che mi ha convinto a trattare la sicurezza come un audit periodico e non
come una lista che si spunta una volta all'inizio. Gradino 11.

### Ref. 24 — Manuale interno e manuale di ripristino in caso di disastro (26 e 29 luglio)

Il 26 e il 29 luglio (commit `6444ce6`, voce 442, e `a30cee3`, voce 459) ho lasciato documentato
tutto l'operativo, distribuire, ripristinare, mantenere, in forma "riproducibile a mano, senza
IA". Il criterio che ho usato, e che sta nel gradino 14, è che se domani non c'è l'agente, una
persona di fiducia che non programma possa seguire il manuale.

### Ref. 25 — Il fail-closed come riflesso (27 luglio)

Il 27 luglio (commit `e18406d`, voce 452): se una tabella non esiste o una ricerca fallisce, la
riga semplicemente resta senza il suo pulsante; non si rompe mai l'intero elenco. Davanti al
dubbio, non agire e non rompere. E il test di quella correzione è stato provato in rosso "senza il
try/except", cioè si è dimostrato che senza la protezione l'elenco si rompeva. Gradini 7 e 12.

### Ref. 26 — I contatori che non coincidevano: 1.355 contro 1.234 (6 e 7 agosto)

Questo è, per me, l'esempio più completo di "verificare con lo strumento". Un contatore della
schermata mostrava 1.355 approvazioni e la query al database ne mostrava 1.234. Il 6 e il 7 agosto
(commit `ab3e529`, voce 517, e `1f5feb9`, voce 514) si è verificata la causa radice direttamente
sulla produzione in sola lettura, si è scomposta la differenza numero per numero (145 in più, 24
in meno; 145 meno 24 fa 121), si è scritto un test che è stato provato IN ROSSO contro il criterio
vecchio, e lo script di diagnosi è rimasto nel repository per la prossima volta. Gradini 7, 8 e 9.

### Ref. 27 — Simmetria tra produttore e consumatore (6 agosto)

Il 6 agosto (commit `50fe968`, voce 510, e `7251129`, voce 509) ho imposto che la "causa di
attesa" che vede l'utente si calcoli con gli STESSI cancelli con cui il robot decide, e che la
lista delle colonne della griglia la definisca il server e il frontend la consumi. Così non possono
divergere. È la regola "ogni lista ha un solo proprietario" del gradino 8.

### Ref. 28 — Pulsante di emergenza con lucchetto, modalità di prova dell'approvatore, sentinella con guardie (7 agosto)

Il 7 agosto (commit `0954740`, voce 524) sono rimasti i lucchetti del sistema: un pulsante di
emergenza con doppia sicura, l'approvatore automatico che gira prima in modalità di prova (fa
tutto tranne approvare, e registra ciò che avrebbe approvato), e una sentinella che spinge ciò che
è bloccato con guardie per non spingere due volte. Gradino 12.

### Ref. 29 — Le regole di dominio scritte nel commit (10 agosto)

Il 10 agosto (commit `0ae3ae6`, voce 550) il messaggio del commit dice, testuale: "regola Pablo:
approvata + saldo = torna", "decisione Pablo 2026-08-10". La decisione di business è rimasta con
data e con proprietario, attaccata al codice che la implementa. Gradino 6.

---

## C. Kikan: il metodo maturo (da agosto a ottobre 2026)

### Ref. 30 — Avvio con il metodo già scritto, e la serie di audit AUD-* (dal 21 al 29 agosto)

Kikan è stato il primo progetto partito con tutto quanto sopra già scritto dal primo giorno: un
file di progetto operativo e voci in sospeso come piano dal primo commit (21 agosto). Il 28 e il
29 agosto ho fatto una serie di audit precoci (AUD-1, AUD-2…) che si è convertita direttamente in
19 documenti di voci in sospeso. Gradini 2, 5 e 11.

### Ref. 31 — Integrazione continua dalla prima settimana; deployment come pacchetto (28 agosto, 23 e 24 settembre)

I test hanno girato su GitHub dalla prima settimana (`ci.yml`, 28 agosto). Il deployment è
arrivato il 23 settembre (`deploy.yml`, commit `bb801ed`): un pacchetto, con la configurazione che
vive sul server e non nel repository, e la versione del runtime inchiodata. Che il deployment sia
arrivato un mese dopo l'avvio è l'errore che motiva il gradino 4.

### Ref. 32 — Il deployment si indurisce a colpi di voci in sospeso (dal 30 settembre al 4 ottobre)

Tra il 30 settembre e il 4 ottobre ci sono state cinque voci in sospeso di fila solo perché il
deployment funzionasse bene: l'URL pubblico nei due ambienti (`f85c3c9`), ricaricare il servizio
prima di riavviare e prima di tornare indietro (`513c8d0`, voce 108), una fixture che riconcilia
invece di duplicare (`076df76`, voce 134), il materiale del cliente fuori dall'albero che viene
replicato (`9d76af8`, voce 130), e la batteria di test che non sporca più la configurazione che
viaggia nel deployment (`0bd20a8`, voce 107, 3 ottobre). Se lo scheletro fosse stato distribuito
vuoto la prima settimana, quei cinque colpi si sarebbero presi con zero funzionalità in gioco.
Gradini 4 e 13.

### Ref. 33 — Promozione da UAT a produzione (4 e 8 ottobre)

Il 4 e l'8 ottobre (commit `4eb5ad7`, voce 027, e `7658e2e`) è rimasto un circuito esplicito per
passare configurazione e campagne dall'ambiente di test a quello di produzione. Gradino 13.

### Ref. 34 — Lo schema derivato dal codice, con lucchetto (11 ottobre)

Nella tappa 1 della reingegnerizzazione della persistenza (commit `6113319` e `68819ce`)
l'inventario di tabelle e campi è stato derivato dal codice stesso, con un test che lo protegge, ed
è stato aperto sulla lavagna condivisa perché io lo rivedessi. È una lista con un solo
proprietario, il codice. Gradino 8.

### Ref. 35 — Il cricchetto statico, e il misuratore che non vedeva (dall'11 al 13 ottobre)

Nella tappa 6 della reingegnerizzazione (commit `06b2734`, `f6e5221`, `2fc6239`, `1d55a93`) ho
messo un "cricchetto": un contatore di chiamate al database senza `await`, cioè senza aspettare il
risultato, che può solo scendere e mai salire. Ed è successa una cosa che vale la pena raccontare:
si è scoperto DUE volte che il misuratore non vedeva parti del codice. Prima 70 chiamate, poi 84,
con il contatore a zero. Se lo strumento non si verifica, il numero tranquillizza e mente. Gradino
9.

### Ref. 36 — I misuratori che mentivano e le cinque regole della sezione 11.b (13 e 14 ottobre)

Testuale dai commit del 13 ottobre (`880ac0f`, `f955620`): "il misuratore di E7.5 mentiva su un
database con l'ALTER già applicato"; "sono 44, non 27". E qualche giorno prima, un piano affermava
che c'erano 121 cicli di un certo tipo e chi ha eseguito ne ha misurati 79. Da tutto questo ho
scritto la sezione 11.b del documento di reingegnerizzazione, con le cinque regole che oggi sono
il gradino 9: misuratore con guardia; se lo strumento non esiste si costruisce; si fa l'audit in
due direzioni; l'approssimato si marca; e chi esegue verifica i numeri di chi ha pianificato. Con
la frase che lo riassume: "tre asserzioni su quattro erano sbagliate; dove c'era lo strumento,
esatto".

### Ref. 37 — Budget di query e il tetto stretto sul misurato (14 ottobre)

Nella tappa 8 (commit `5926b3f`, `10ada00`) ogni percorso dell'applicazione è rimasto con un
budget di query al database misurato e protetto da un test, e il cambio di motore di database è
rimasto come un interruttore per ambiente. Nella tappa 9 (`0730082`, `7f5f1af`) il tetto è stato
stretto sul misurato più un margine piccolo: 63 su 60. Il budget non è un numero inventato. Gradino
9.

### Ref. 38 — Conservazione per tabella, e un rapporto di integrità fatto da un'altra sessione (14 ottobre)

Nelle tappe 10 e 12 (commit `f72b15a`, `b266f11`) il pacchetto reale ha cominciato a portare gli
script di migrazione, la conservazione dei dati è stata dichiarata per tabella e limitata in
produzione, e un rapporto di integrità fatto da una sessione diversa di Claude Code, che non aveva
costruito il sistema, è stato assorbito come voci in sospeso. È l'auditor diverso dal costruttore
del gradino 11.

### Ref. 39 — Il deployment solo impacchetta, e la quota che si è bruciata (14 ottobre)

I test giravano tre volte per ogni commit, tra 16 e 27 minuti ogni volta; in 16 giorni si sono
consumati 2.000 minuti di quota di GitHub Actions, e un giorno da 23 push l'ha finita di bruciare.
Il 14 ottobre (commit `39497b0`) ho spezzato il circuito: i test girano UNA sola volta,
nell'integrazione continua; il deployment aspetta quel risultato e solo impacchetta. Da 16-27
minuti per commit, a 11. Gradino 13.

### Ref. 40 — Due porte di amministratore in ventiquattro ore (15 ottobre)

Il 15 ottobre si sono create due porte di amministratore in un solo giorno (voci 223 e 257). Una
revisione esterna l'ha rilevato; ne ho ritirata una (commit `69bdab2`, `20fdbe7`, `1558ee4`) ed è
rimasta un'unica via. Lo racconto come prova che il metodo regge il "disfare in fretta" senza
drammi, e del perché l'audit lo deve fare qualcuno che non ha costruito. Gradini 11 e 12.

### Ref. 41 — L'audit di qualità: una vulnerabilità, un componente enorme, un file di progetto di 9.661 righe (15 ottobre)

L'audit di qualità del 15 ottobre ha trovato una vulnerabilità nota in una dipendenza, un
componente di schermata di 2.679 righe, otto moduli duplicati tra la versione web e quella mobile,
e un `CLAUDE.md` che era cresciuto fino a 9.661 righe e 789 kilobyte, un file che a quel punto non
legge nessuno, nemmeno il modello. Da lì la regola del gradino 2: il file di progetto è il
programma, non lo storico, e il libro dei casi va a parte. Gradini 2, 8 e 11.

### Ref. 42 — Segreti incollati nella chat (14 e 16 ottobre)

Il 14 ottobre una chiave del database è rimasta stampata in una trascrizione, e il 16 alcune
chiavi API sono comparse incollate nella chat. Nessuna delle due è stata "vista da nessuno", ed
entrambe vanno ruotate lo stesso, perché un segreto che è stato in una chat, in un log o in un
commit non è più un segreto. Gradino 13.

### Ref. 43 — Tre rapporti che non erano ciò che dicevano (dal 14 al 16 ottobre)

Tre casi piccoli e molto illustrativi del gradino 10. Il 14 ottobre un errore di autenticazione è
stato riportato dallo strumento con la dicitura "success". Il 16 il CORS del server è stato
derivato solo dal primo nome di dominio, e l'assistente di configurazione dell'ambiente di test
dava un errore 500 che il rapporto non menzionava. E l'applicazione mobile perdeva le schede in
condizioni che il rapporto dichiarava verificate. Tutti e tre si correggono con la stessa regola:
separare il verificato dal creduto e dichiarare i punti ciechi.

### Ref. 44 — La batteria che moriva per memoria e sembrava un test fallito

Un'intera batteria di test è "morta" per mancanza di memoria (commit `1d7a20b`), e il rapporto
l'ha letta come un test che falliva. Finché non si è guardato l'output completo non si è capito che
non era fallito nessun test: era caduto il processo. È il motivo per cui il gradino 7 chiede i
numeri del rosso e del verde, non solo il verdetto.

---

## D. Ciò che ho imposto in sessione, e ciò che ho rifiutato

### Ref. 45 — Quattro correzioni che ho fatto in sessione e che poi sono diventate regole (ottobre)

Ci sono regole del metodo che non sono uscite da un commit ma da correzioni che ho fatto
all'agente in piena sessione, e che poi ho formalizzato. Le cito perché mostrano il secondo fattore
dell'origine del metodo, il mio criterio di ingegneria davanti all'applicazione fragile del
modello. "Misuratore con guardia, non grep": un numero che alimenta una decisione si misura con un
programma con test, non con una ricerca di testo. "Misura l'ipotesi, non solo il sintomo": quando
io porto una causa in forma di impressione, bisogna misurarla prima di costruire, perché di solito
ho ragione sul sintomo e la causa di solito sta lì accanto. "Valida i limiti con il log, non con la
prosa": un rifiuto del modello non prova che il limite sia applicato; bisogna forzare l'invocazione
e leggere il registro. E "confronta prima la versione pubblicata": davanti a un "è ancora rotto",
guardare quale versione gira dove io vedo il problema prima di tornare a diagnosticare. Gradini 9
e 10.

### Ref. 46 — I progetti che ho rifiutato, e da dove vengono i criteri escludenti (17 ottobre)

I due criteri escludenti del gradino 0 non vengono dai progetti che ho accettato ma da quelli che
ho rifiutato. Ho rifiutato tecnologie ereditate senza repository accessibile o con repository che
non seguono uno standard, perché senza repository non c'è dove lasciare la prova. E ho rifiutato
tecnologie che non si possono provare end to end, dove non si possono eseguire le schermate e
accedere a ogni elemento dell'interfaccia con i suoi diversi metodi validando che la modifica sia
arrivata al backend. Ho chiarito in quel momento, e lo sostengo, che NAC3 non è obbligatorio: lo è
testare dall'esecuzione delle schermate.

---

## E. Cronologie complete

Le metto nel caso qualcuno voglia vedere la sequenza intera e non un caso isolato. Ogni riga porta
la prova così com'è nei repository.

### E.1 yujin-forge

| Data | Momento | Cosa è cambiato | Prova |
|---|---|---|---|
| 25 maggio | Nascono gli standard di qualità | Primo patto di convivenza: tempo dell'umano, zero debito, documentazione aggiornata, perimetro esatto | `2219f7a` |
| 27 maggio | Primo registro degli anti-pattern | Formato fisso: odore, causa radice, correzione, rilevamento precoce | `73f4029` |
| 2 giugno | Cancelli da G1 a G9 e G-DOC | La dottrina entra nel prompt solo quando si applica | `5b47475` |
| 4 giugno | Politica di testing riformulata | Test dopo l'implementazione per default; scheletro in verde; protezione contro i cicli | `a9f59c7`, `testing-policy.md` |
| 4 giugno | Decisioni congelate prima dello sprint | D1, D2, D3 scritte e numerate | documento di decisioni del 4 giugno |
| 5 giugno | Si elimina la squadra multi-agente | 60 dollari e 73 minuti contro 90 minuti | `7584f8b` |
| 6 giugno | Il piano sono le voci in sospeso | Coda canonica, numerata, aggiornata a ogni sessione | `4fc82c6` |
| 10 giugno | Dottrine obbligatorie; onestà di verifica; tipi di flusso | Rosso reale, punti ciechi, affermazioni proporzionate | `7ab9d8a`, `2c552c0` |
| dal 14 al 21 giugno | Piloti automatici di 24 e 48 ore | Autonomia lunga con mandato scritto | note di sessione |
| 5 e 10 luglio | Modalità diagnostica | Sola lettura su sistemi altrui | `diagnostic-mode.md` |
| 22 luglio | Indurimento delle prestazioni | Pattern di scala presi dalla produzione | `873339c` |
| 14 agosto | Agente residente in produzione | Mappa del sistema, soluzione operativa prima, ticket | note di sessione |
| 10 e 11 ottobre | Dimensionamento come cancello | Opzioni fisse, registrate | `c602725`, `0bd1b05` |
| 13 ottobre | Interfaccia di persistenza asincrona | Decisione asimmetrica | `7391cc5` |
| 14 ottobre | Turno orfano di 1 h 43 → 1.18.0 | Sentinella del silenzio, guinzaglio tra processi, 28 test | `b80a659` |

### E.2 Autorizzazioni

| Data | Momento | Cosa ha apportato | Prova |
|---|---|---|---|
| 11 giugno | Documento di progettazione iniziale | Superato dal repository in settimane | documento di progettazione |
| 23 giugno | Audit delle query senza indice | Rilievi convertiti in voci in sospeso | documento di audit |
| 24 giugno | Lezioni dal cloud di Google | Errori di infrastruttura scritti come lezioni | documento di lezioni |
| 26 giugno | Manuale utente | Nasce con il sistema | manuale |
| 13 luglio | Backup di secondo livello | Locale e nel cloud | commit di backup |
| 14 luglio | PND-300, quattro giri | Correzione alla radice o non è correzione | voce 300 |
| 16 luglio | Audit di sicurezza | Periodico, genera voci in sospeso | documento di audit |
| 26 e 29 luglio | Manuali interno e di ripristino | Riproducibili a mano, senza IA | `6444ce6`, `a30cee3` |
| 27 luglio | Fail-closed come riflesso | La riga resta senza pulsante; l'elenco non si rompe | `e18406d` |
| 6 e 7 agosto | Contatori 1.355 contro 1.234 | Causa radice sulla produzione, test in rosso, script nel repo | `ab3e529`, `1f5feb9` |
| 6 agosto | Simmetria produttore/consumatore | Una sola fonte per cause e colonne | `50fe968`, `7251129` |
| 7 agosto | Pulsante di emergenza, modalità di prova, sentinella | Lucchetti | `0954740` |
| 10 agosto | Regole di dominio nel commit | Con data e proprietario | `0ae3ae6` |

### E.3 Kikan

| Data | Momento | Cosa ha apportato | Prova |
|---|---|---|---|
| 21 agosto | Avvio con il metodo scritto | File di progetto e voci in sospeso dal primo giorno | primo commit |
| 28 e 29 agosto | Serie AUD-* | 19 documenti di voci in sospeso | documenti di voci in sospeso |
| 28 agosto | Integrazione continua | Test su GitHub dalla prima settimana | `ci.yml` |
| 23 e 24 settembre | Deployment come pacchetto | Configurazione sul server; runtime fisso | `deploy.yml`, `bb801ed` |
| dal 30 settembre al 4 ottobre | Deployment indurito | Cinque voci in sospeso di fila | `f85c3c9`, `513c8d0`, `076df76`, `9d76af8`, `0bd20a8` |
| 4 e 8 ottobre | Promozione da UAT a PROD | Circuito esplicito | `4eb5ad7`, `7658e2e` |
| 11 ottobre | Schema derivato dal codice | Con lucchetto, aperto sulla lavagna | `6113319`, `68819ce` |
| dall'11 al 13 ottobre | Cricchetto statico | Il misuratore non vedeva: 70, poi 84 | `06b2734`, `f6e5221`, `2fc6239`, `1d55a93` |
| 13 ottobre | Misuratori che mentivano | "sono 44, non 27" | `880ac0f`, `f955620` |
| 14 ottobre | Budget di query; tetto 63 su 60 | Misurato più un margine | `5926b3f`, `10ada00`, `0730082`, `7f5f1af` |
| 14 ottobre | Le cinque regole di 11.b | Misuratore con guardia, audit in due direzioni | documento di reingegnerizzazione, 11.b |
| 14 ottobre | Conservazione per tabella; integrità esterna | Rapporto di un'altra sessione assorbito come voci in sospeso | `f72b15a`, `b266f11` |
| 14 ottobre | Il deployment solo impacchetta | Da 16-27 minuti a 11 | `39497b0` |
| 15 ottobre | Due porte di amministratore | Una ritirata in 24 ore | `69bdab2`, `20fdbe7`, `1558ee4` |
| 15 ottobre | Audit di qualità | Vulnerabilità, componente di 2.679 righe, file di 9.661 righe | documento di audit |

---

## F. Ogni fallimento, e il gradino che lo copre

Questa tabella è, in un certo senso, la prova della scala: ogni colpo deve ricadere in qualche
gradino. Se ne comparisse uno che non ricade in nessuno, mancherebbe un gradino.

| Fallimento | Referenza | Gradino che lo copre | Stato |
|---|---|---|---|
| La squadra multi-agente che spendeva il doppio e consegnava la metà | Ref. 6 | 15, retrospettiva con i numeri | chiuso |
| Lavoro buttato per non aver letto la mappa | Ref. 9 | 2, lettura obbligatoria | chiuso |
| PND-300: tre correzioni che non erano alla radice | Ref. 22 | 1, zero debito; 9, misurare | chiuso |
| Contatori 1.355 contro 1.234 | Ref. 26 | 9, strumento; 8, simmetria | chiuso |
| 3,4 milioni di righe all'anno su file JSON | Ref. 15 | 3, dimensionare | chiuso |
| Misuratori che mentivano; cricchetto a zero | Ref. 35 e 36 | 9, verificare lo strumento | chiuso |
| Turno orfano di 1 h 43 | Ref. 16 | 10 e 12 | chiuso |
| Test tre volte per commit; quota bruciata | Ref. 39 | 13 | chiuso; la quota va ampliata |
| Due porte di amministratore in 24 ore | Ref. 40 | 11 e 12 | chiuso |
| Segreti incollati nella chat | Ref. 42 | 13 | rotazione in sospeso |
| Errore di autenticazione riportato come successo | Ref. 43 | 10 | in sospeso, una riga |
| File di progetto di 9.661 righe | Ref. 41 | 2 | in sospeso |
| CORS del primo dominio; assistente di configurazione con errore 500 | Ref. 43 | 13 e 8 | applicazione in sospeso |
| L'applicazione mobile perde le schede | Ref. 43 | 10 e 12 | diagnosi fatta; correzione in sospeso |
| Query senza indice su un sistema vivo | Ref. 18 | 11 e 17 | chiuso |
| Audit di sicurezza fatto una volta, non come routine | Ref. 23 | 11 e 18 | chiuso; il calendario è nuovo |
| Tetto stretto a ciò che era stato misurato; quota bruciata senza che nessuno guardasse | Refs. 37 e 39 | 9, 13 e 20 | chiuso |
| Il turno orfano si è trovato dal log, non dal codice | Ref. 16 | 16 e 21 | chiuso |
