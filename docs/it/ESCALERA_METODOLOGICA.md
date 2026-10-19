# Urazuke, il metodo del riscontro — la scala metodologica (versione 4)

Autore: Pablo Kuschniroff, assistito da Claude Code. Versione 4, 18 ottobre 2026. Questo è un
documento di lavoro che continuerò a rifinire con ogni progetto che lo userà; nulla di ciò che
dice è ancora dottrina chiusa, anche se è, per quanto ne so, il primo distillato onesto di un
metodo che ha già tre sistemi in produzione alle spalle.

Prima di entrare nel merito, un'avvertenza su come è scritto, perché conta. L'ho scritto per
persone che non hanno vissuto questi progetti con me: gente che vuole costruire software con
l'intelligenza artificiale e che quel software duri, non gente che vuole imparare a programmare né
collezionare trucchi di prompt. Per questo mi prendo il tempo di spiegare, ripeto quando serve,
uso il linguaggio di tutti i giorni, e lascio alla fine un **glossario** con ogni sigla e ogni
espressione colloquiale che mi scappa. Se a un certo punto ti imbatti in una parola strana —
"cricchetto", "lucchetto", "fail-closed", "PND" —, vai al glossario; c'è tutto. E quando leggi un
segno come [Ref. 26](REFERENCIAS.md#ref-26), sappi che è una scorciatoia verso un caso reale che
racconto nel documento delle referenze, con la sua data e la sua prova; puoi ignorarlo senza
perdere il filo o seguirlo se ti interessa il dettaglio.

Il repository pubblico del metodo è
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke). Lì ci sono questo
documento, i contratti di ogni gradino, il manuale del corso e le referenze, nelle otto lingue di
NAC3.

## Il nome

**Urazuke** (裏付け) è una parola giapponese che indica il sostegno di cui dispone un'affermazione:
ciò che la regge da dietro (letteralmente, "la fodera sul retro"). Il verbo *urazukeru* significa
"sostenere con prove". L'ho scelta il 17 ottobre 2026, dopo aver scartato diversi nomi per
collisioni con aziende e progetti esistenti, e l'ho scelta perché dice esattamente ciò che il
metodo chiede: che ogni affermazione del modello arrivi con il suo riscontro, e che il riscontro
si possa verificare senza leggere il codice. Il nome non si traduce; il sottotitolo, "il metodo
del riscontro", sì: *el método de la evidencia*, *the evidence method*, *o método da evidência*,
*la méthode de la preuve*, *die Nachweis-Methode*, 裏付けの方法, 验证方法. In questo documento, "la
scala" è la struttura del metodo — i suoi ventidue gradini — e "Urazuke" è il metodo intero.

## Di cosa si tratta

Voglio essere chiaro su ciò che sto insegnando e su ciò che non insegno. Non sto insegnando uno
strumento. Sto insegnando un **metodo**: cosa fare in quale ordine, cosa chiedere al modello in
ogni momento, cosa deve consegnarti, e come sapere — senza leggere codice — che ciò che ti ha
consegnato è completo. La scommessa è che chiunque, con qualunque strumento di intelligenza
artificiale che serva a programmare, possa costruire software conversando con un modello invece
di digitare il codice a mano, e che ciò che ne esce sia robusto, pronto per la produzione e,
questo è l'importante, **non richieda che il proprietario del progetto riveda una sola riga di
codice**.

Suona ambizioso, e lo è. Ma ho qualcosa che quasi nessuno ha: tre sistemi reali che ho costruito
esattamente così, che oggi funzionano con clienti veri, e da cui ho estratto ogni regola che
segue. Quindi la domanda che mi faccio non è "si potrà?", perché si è già potuto. La domanda è
"cosa ho fatto, in che ordine, e cosa di tutto questo è ciò che ha fatto davvero la differenza?".
Questa scala è la mia risposta, ed è la base di tre cose: la documentazione del metodo, la
pratica che faranno gli allievi del corso, e i manuali. Più avanti la esporterò come flusso di
esecuzione dentro il mio strumento, perché sia lo strumento a guidare il metodo e non la memoria
di ciascuno.

## Da dove viene il metodo, e cosa non voglio che venga frainteso

C'è una lettura facile di tutto questo che voglio smontare prima che si installi: quella secondo
cui il metodo è una collezione di cerotti che ho messo dopo ogni colpo. Non è così, e ci tengo a
dirlo con precisione perché cambia come va letto ogni gradino.

Il metodo nasce da due fattori che si sono combinati, e nessuno dei due basta da solo. Il primo è
**la mia conoscenza dell'ingegneria dei sistemi**. Sono molti anni che applico ciò che chiunque
venga dai sistemi riconosce subito: rilevazione prima di progettare, requisiti scritti,
dimensionamento con numeri, progettazione, costruzione, test come prova, deployment riproducibile,
esercizio, audit periodico, documentazione come parte del prodotto. La maggior parte di ciò che
esigo nei ventidue gradini è ciò che ho sempre esatto in un progetto condotto bene. Non l'ho
inventato per i modelli; l'ho portato da prima.

Il secondo fattore è ciò che gli incidenti di questi cinque mesi mi hanno mostrato, uno dopo
l'altro: **dove i modelli applicano quei principi in modo fragile**. Un modello sa perfettamente
cos'è un test, cos'è una causa radice, cos'è un dimensionamento; se glielo chiedi, te lo spiega
meglio di molti ingegneri. Ma in pratica dice di aver provato e non ha provato, stima con faccia
sicura un dato che solo il business ha, riempie un buco nelle regole di business con ciò che gli è
sembrato ragionevole, riporta più del dovuto perché è stato addestrato per essere utile, e
costruisce un misuratore che mente senza accorgersene. Ciascuno di quei casi, che racconto nelle
[referenze](REFERENCIAS.md), mi ha detto esattamente dove bisognava stringere: dove un principio
che per me era ovvio doveva trasformarsi in una clausola esplicita del prompt, in un cancello, in
una verifica che io faccio senza leggere codice.

Quindi, quando in un gradino dico "questo l'ho imposto dopo il tale incidente", non sto dicendo
che il principio è nato lì. Sto dicendo che lì ho constatato che il modello non lo applicava da
solo, e che bisognava esigerglielo per iscritto. Il metodo è ingegneria dei sistemi di sempre,
applicata con la rigidità che serve per un costruttore che non si stanca e a cui non si può
credere senza prove. Le cicatrici sono la prova di dove serve la rigidità, non l'origine dei
principi.

## I tre casi d'uso del metodo

Prima di proseguire, una biforcazione che nelle prime versioni non c'era e che un lettore mi ha
chiesto a ragione. Questo documento descrive la scala guardando una cartella vuota: il gradino 0
decide se il progetto si affronta, il 4 distribuisce lo scheletro senza funzionalità, il 5 apre il
primo blocco. È il caso più chiaro per imparare, e non è il più frequente. Il metodo ha tre casi
d'uso, e conviene sapere in quale ti trovi prima di aprire l'agente, perché cambia da dove si
entra:

1. **Progetto nuovo.** Cartella vuota e un proprietario con una richiesta. Si entra dal gradino 0
   e si salgono i ventidue in ordine. È ciò che descrive questo documento, con i suoi contratti e il
   manuale del corso.
2. **Evolutivo-correttivo su un sistema fatto con il metodo.** Il sistema ha già salito la scala:
   ha contratto, mappa, voci in sospeso chiuse con prove, batteria, deployment e manuali. Si entra
   dal gradino 5, aprendo un blocco, e si segue il ciclo; l'11 periodico; il 15 alla chiusura di
   ogni tappa. È la fase 4 della linea del tempo (Parte B).
3. **Evolutivo-correttivo su un sistema fatto senza il metodo.** Un sistema che gira, con utenti,
   fatto da un altro o da sé stessi senza prove, che bisogna correggere o far crescere. Non si
   entra dallo 0 né dal 5: si entra da un **tratto di normalizzazione** di otto stazioni (da N0 a
   N7) che recupera, per autoscoperta e con le marche di origine, tutti gli input che i gradini
   dell'avvio producono, costruisce una cintura di sicurezza attorno al sistema senza riscriverlo,
   e solo dopo apre il ciclo in modalità correttiva o evolutiva. Quel percorso sta in una pagina
   propria, il [percorso evolutivo-correttivo](EVOLUTIVO_CORRECTIVO.md), e ha la sua parte del
   corso con un secondo progetto guida.

Ciò che resta fuori, nominato: la migrazione tecnologica non è un caso d'uso del metodo; è un
altro progetto, e in generale cade nei criteri escludenti del gradino 0.

## L'IA non interrompe il metodo: lo continua

Questa è la tesi che apre tutto, e la metto per prima perché smonta l'obiezione più comune prima
che compaia: "come fai a fidarti di codice che ha scritto una macchina?".

La mia risposta è che **l'industria ha già smesso di fidarsi dell'autore del codice vent'anni fa**.
Quando il grosso della scrittura è passato a team junior, esternalizzati o a rotazione, la
revisione riga per riga è diventata impossibile da sostenere. E ciò che è cresciuto al suo posto è
tutto quello che oggi diamo per scontato: i test automatizzati, l'integrazione continua, i criteri
di accettazione, le pipeline che non lasciano passare nulla senza verde, lo "shift left" dei test,
il controllo di qualità come funzione indipendente. Quella è stata la risposta dell'ingegneria dei
sistemi a "chi scrive non è affidabile": non leggergli il codice, esigergli prove.

Mettere un modello a scrivere, allora, non è un salto nel vuoto. È cambiare un autore di cui già
non ci fidavamo con un altro di cui nemmeno, e per il quale **avevamo già montato l'apparato di
verifica**. Questo dovrebbe tranquillizzare, non inquietare. E per di più il nuovo autore è più
economico, più veloce, e — a differenza del junior — non si offende quando gli chiedi di provare in
rosso.

Per questo questo metodo si appoggia, senza nasconderlo, all'ingegneria dei sistemi classica. Lo
scheletro è quello di sempre. Non poteva essere altrimenti, perché i problemi sono quelli di
sempre: non sapere quanti dati ci saranno, non sapere cosa vuole il cliente, non sapere se ciò che
si è costruito è ciò che era stato chiesto. L'IA non ha cambiato i problemi; ha cambiato chi fa
ogni parte e a quale costo. Perfino il criterio di idoneità X2 del gradino 0 è ingegneria
classica: testabilità come condizione di contratto.

### Cosa è vecchio e cosa è nuovo in tutto questo

Il vecchio, e conviene dire che è vecchio: lo scheletro delle fasi, l'indipendenza di chi verifica
rispetto a chi costruisce, i test come prova, la documentazione come parte del prodotto, la
rilevazione prima della progettazione.

Ciò che sì cambia, ed è dove sta il mio contributo, sono tre cose:

1. **Dove va lo sforzo dell'umano.** Nel metodo classico l'umano scrive la specifica, scrive il
   codice, e un altro umano lo rivede. Qui l'umano fa due cose soltanto: **decide, e verifica
   artefatti**. Tutto il resto — redigere, costruire, provare, misurare, documentare — lo fa il
   modello. Per questo ogni gradino termina in una "verifica di completezza senza leggere codice":
   è il punto esatto in cui l'umano resta imprescindibile, e nessun altro.

2. **L'autore fabbrica anche la prova.** Questo è l'unico punto genuinamente nuovo, ed è la
   sfumatura che giustifica tre gradini interi. Il junior scriveva codice dubbio, ma non fabbricava
   la prova: i test e le misurazioni li montava un altro, o almeno un altro li guardava. Il
   modello, invece, produce il codice *e* il test *e* il misuratore *e* il rapporto, nella stessa
   sessione, con la stessa sicurezza nella voce quando è giusto e quando è sbagliato. L'ho visto:
   il misuratore che ha mentito due volte [Ref. 36](REFERENCIAS.md#ref-36), l'errore di
   autenticazione riportato come "successo" [Ref. 43](REFERENCIAS.md#ref-43), le tre affermazioni
   su quattro che erano sbagliate. Allora "rivedere le prove invece del codice" continua a essere
   il principio corretto, ma **la prova deve dimostrare se stessa**: il test visto in rosso
   (gradino 7), lo strumento con la sua guardia (gradino 9), il rapporto che separa il verificato
   dal creduto (gradino 10), l'auditor diverso dal costruttore (gradino 11). Non è una
   preoccupazione nuova: è la stessa disciplina di indipendenza del controllo di qualità, portata
   un passo più dentro.

3. **Il costo degli artefatti.** Nel metodo classico la documentazione era cara, quindi si faceva
   una volta e invecchiava. Qui rigenerarla è gratis, quindi la regola diventa "nello stesso
   commit" e "riproducibile a mano, senza IA". Ciò che prima era un ideale irraggiungibile diventa
   un cancello.

Per il corso e per la presentazione pubblica, questo definisce il posizionamento con onestà: non è
"il nuovo modo di programmare"; è **ingegneria dei sistemi applicata a un costruttore che non si
stanca e a cui non si può credere**. A chi viene dai sistemi suona familiare e gli abbassa la
diffidenza; a chi viene dal vibecoding dà ciò che non ha, che è proprio lo scheletro. E mi
differenzia dagli strumenti che vendono velocità e omettono lo scheletro intero.

---

## Parte A — Come leggere ogni gradino

Ogni gradino ha otto parti, sempre le stesse, perché si possano confrontare:

- **Intenzione**: cosa cerca, in una frase.
- **Quando**: in quale momento del progetto si sale, e se si sale una volta o si ripete. Questa
  parte è nuova nella versione 4 e la spiego in dettaglio nella Parte B, perché un metodo senza
  linea del tempo è una lista di buone intenzioni.
- **Input**: cosa deve esistere prima per poterlo salire.
- **Artefatto**: cosa resta scritto o eseguibile quando si sale. È sempre qualcosa di concreto: un
  file, un test, uno script.
- **Cancello**: cosa deve essere vero per passare al successivo. Se non si soddisfa, non si sale.
- **Chi decide**: il proprietario del progetto, l'agente, o nessuno perché è automatico.
- **Fallimento che evita**: il tipo di problema che il gradino previene, con una referenza breve
  al caso reale in cui l'ho constatato.
- **Contratto**: il file in cui c'è come si esegue: contesto, prompt, risultato, verifica, segnali
  d'allarme.

Due chiarimenti importanti. Primo: **la scala è neutrale rispetto allo strumento**. Ogni artefatto
è un file, un test o uno script; nessuno esige il mio strumento né nessun altro. Forge li
automatizza (i cancelli, i comandi, il registro delle voci in sospeso), ma il gradino esiste
senza Forge. Secondo: **i gradini non sono strettamente sequenziali**. Ci sono quattro fasi:
quelli dallo 0 al 4 sono di avvio e si salgono una volta per progetto; quelli dal 5 al 10 sono il
ciclo che si ripete con ogni modifica; quelli dall'11 al 15 sono di esercizio, quando il sistema
è già vivo; e quelli dal 16 al 21 sono di qualità operativa: quattro che si salgono prima del
primo deployment in produzione (osservabilità, persistenza, vulnerabilità, rendimento) e due che
sorvegliano il sistema una volta distribuito (monitoraggio di risorse e di errori). Il 15 chiude
il ciclo e torna allo 0 per il progetto successivo. Ma "non strettamente
sequenziali" non vuol dire "in qualunque ordine": la Parte B dice esattamente quando si sale
ciascuno e cosa succede nel mezzo.

---

## Parte B — La linea del tempo: quando si sale ogni gradino e cosa succede nel mezzo

Questa parte non esisteva nelle versioni precedenti, e la sua assenza era un difetto serio: il
metodo diceva cosa fare e come verificarlo, ma non diceva **quando**. E "quando" è la metà di un
metodo. Un lettore che lo prendesse alla lettera poteva salire i ventidue gradini uno dopo l'altro e
chiedersi in quale momento si fanno, allora, l'infrastruttura, la catena di integrazione e
deployment continui, l'acquisizione dei requisiti, lo sviluppo della funzionalità, le prove end to
end di tutti i flussi, lo sguardo umano sulle schermate, e le prove umane di accettazione. Tutto
questo succede, e succede in momenti precisi, tra i gradini e dentro di essi. Qui lo scrivo.

### B.1 Le cinque fasi di un progetto

Un progetto condotto con questo metodo passa per cinque fasi. Le tre del mezzo sono quelle che
corrispondono alle fasi della scala (la quarta fase, qualità operativa, si ripartisce tra la fase
3 e la 4); le due agli estremi sono l'acquisizione iniziale e la
vita in produzione, che il metodo copre comunque anche se non sono "gradini" in sé.

| Fase | Durata tipica in un progetto piccolo | Gradini che si salgono | Cos'altro succede in quella fase |
|---|---|---|---|
| 0. Acquisizione | da due giorni a una settimana, in parallelo con la fase 1 | nessuno ancora; è la materia prima dello 0, del 2, del 3 e del 5 | Rilevazione del business con il proprietario, con i metodi classici dell'ingegneria dei requisiti (vedi B.5): interviste, casi d'uso o storie utente, modello di dominio, prototipi di schermata. Si scrive in prosa, incompleta apposta; l'agente la completa chiedendo. |
| 1. Avvio | una settimana, di fila | 0, 1, 2, 3, 4 | Idoneità, patto, definizione, dimensionamento. E **tutta l'infrastruttura iniziale**: il repository, l'ambiente di test, l'integrazione continua, il primo deployment con il sistema vuoto. |
| 2. Ciclo | da tre a sei settimane, in blocchi funzionali da una a due settimane | 5, 6, 7, 8, 9, 10 con ogni modifica | Sviluppo funzionale blocco per blocco; test in rosso; prove end to end del flusso appena costruito; sguardo umano su ogni schermata nuova; alla chiusura di ogni blocco, prove umane nell'ambiente di test. |
| 3. Uscita in produzione | da una a due settimane | 11, 12, 13, 14, e i quattro di qualità operativa precedenti al deployment: 16, 17, 18, 19 | Audit da parte di un'altra sessione; lucchetti su tutto ciò che agisce sul mondo; chiusura della catena di deployment in produzione con rollback provato; i tre manuali; test di accettazione con il proprietario su tutti i flussi. |
| 4. Esercizio | finché il sistema vive | 15; 20 e 21 montati nella settimana del primo deployment; il ciclo (da 5 a 10) per ogni evoluzione; 11 e 18 periodici | Agente residente; audit ogni uno o due mesi; ogni modifica nuova entra dal ciclo completo ed esce dalla catena di deployment; retrospettiva alla chiusura di ogni tappa. |

Questa tabella è quella del progetto nuovo. Quando il sistema esiste già e non è nato con il
metodo, le fasi 0 e 1 si sostituiscono con il tratto di normalizzazione (tre settimane per un
sistema piccolo: lettura, cintura, misurare e ordinare) che sta nel
[percorso evolutivo-correttivo](EVOLUTIVO_CORRECTIVO.md); le fasi 2, 3 e 4 sono le stesse.

I tempi sono per un progetto piccolo, della dimensione del progetto guida del corso. In un
progetto con utenti e conseguenze, il ciclo si allunga e le fasi 1 e 3 restano quasi uguali,
perché ciò che cresce è la funzionalità, non l'infrastruttura né la chiusura.

### B.2 Cosa succede tra un gradino e l'altro

Qui c'è ciò che mancava. Per ogni fase, quali compiti di ogni tipo si fanno e in quale momento
esatto rispetto ai gradini. Leggi la tabella per righe: ogni riga è un tipo di lavoro, e ogni
cella dice quando si fa dentro quella fase.

| Tipo di lavoro | Avvio (gradini da 0 a 4) | Ciclo (gradini da 5 a 10, per blocco) | Uscita in produzione (da 11 a 14 e da 16 a 19) | Esercizio (15, 20, 21 e ciclo) |
|---|---|---|---|---|
| **Acquisizione dei requisiti** | Prima del gradino 0: rilevazione in prosa con il proprietario, con interviste, casi d'uso e modello di dominio. Si completa nel 2 (definizione e albero semantico) e nel 3 (volumetria). | All'apertura di ogni blocco: la richiesta del cliente per quel blocco, così come la direbbe lui, si trasforma in voci in sospeso con **specifica dettagliata** (gradino 5): descrizione, criteri di accettazione, regole applicabili, dati, schermate, casi limite. Le domande che l'agente fa sono l'acquisizione fine. | Prima del 12: rilevazione delle azioni con conseguenza. Prima del 13: rilevazione di ambienti e accessi. | Ogni richiesta nuova entra come voce in sospeso specificata, appesa al suo nodo dell'albero semantico; l'agente residente raccoglie ciò che gli utenti chiedono. |
| **Infrastruttura** | Tutta quella iniziale, nel gradino 4: repository, struttura, ambiente di test, credenziali, dominio di test. Non si costruisce funzionalità finché lo scheletro vuoto non è distribuito. | Nessuna, salvo che un blocco la esiga (una coda, un servizio esterno). Se la esige, è una voce in sospeso con il suo test. | Nel 13: ambiente di produzione, segreti sul server, dominio reale, backup, monitoraggio minimo. | Le modifiche di infrastruttura entrano dal ciclo e dal 13; mai "a mano, in fretta". |
| **Catena CI/CD** | Nel gradino 4: l'integrazione continua esegue la batteria a ogni push fin dalla prima settimana, e il deployment all'ambiente di test è automatico alla fusione. | Funziona da sola. Ogni commit la attraversa; se non è in verde, il blocco non si chiude. | Nel 13 si completa: il deployment in produzione aspetta il risultato dell'integrazione e si limita a impacchettare; la promozione è una procedura scritta; il rollback si prova. | Ogni deployment segue la routine del 13: test in verde con la stessa versione, rollback pronto, verifica end to end in produzione dopo. |
| **Sviluppo funzionale** | Nessuno. Lo scheletro si distribuisce vuoto apposta. | È il centro del ciclo: l'agente prende una voce in sospeso (5), chiede le regole di business che mancano (6), costruisce, e chiude con prove (7, 8, 9, 10). Blocco per blocco, dal basilare a ciò che ha conseguenze. | Ciò che agisce sul mondo (incassare, inviare) si costruisce nel ciclo **dopo** il gradino 12, con i suoi lucchetti, e parte in modalità di prova. | Le evoluzioni entrano dal ciclo. |
| **Test automatici** | Un test di fumo che passa, nel 4. È il seme della batteria. | Con ogni voce in sospeso: il test provato in rosso (7), la regressione dei vicini nella stessa sessione, e **una prova end to end del flusso appena costruito**, dalla schermata fino al backend. Alla chiusura di un blocco: la batteria completa end to end di **tutti** i flussi esistenti, nell'ambiente di test. | Prima del primo deployment in produzione: la batteria completa end to end di tutti i flussi, in verde, con la stessa versione che si promuoverà. Dopo il deployment: una verifica end to end sulla produzione, in sola lettura. | Con ogni modifica, lo stesso del ciclo. |
| **Sguardo umano sulle schermate** | Alla chiusura del 4: il proprietario apre l'URL dell'ambiente di test e vede la schermata vuota. Sembra banale ed è la prima volta che qualcuno che non è l'agente guarda il sistema. | **Con ogni voce in sospeso che tocca una schermata**: l'agente consegna una schermata catturata dall'ambiente di test e il proprietario la guarda. Dieci secondi. È il modo più economico di trovare ciò che nessun test trova: che il pulsante è dove non deve, che il testo dice un'altra cosa, che il flusso non è quello che il business immaginava. | Nel 14: le catture del manuale utente sono l'ultimo sguardo umano sistematico prima della produzione. | Ogni schermata nuova o modificata, come nel ciclo. |
| **Prove umane** | Nessuna ancora, salvo aprire la schermata vuota. | **Alla chiusura di ogni blocco funzionale**: il proprietario, o un utente di fiducia, usa il sistema nell'ambiente di test come lo userebbe davvero, seguendo i flussi del blocco. Ciò che trova si annota come voci in sospeso. Non si apre il blocco successivo con rilievi umani senza voce in sospeso. | Prima del primo deployment in produzione: **test di accettazione** del proprietario su tutti i flussi, con dati di test realistici, nell'ambiente di test. E nel 14, una persona che non programma segue il manuale di ripristino. | Con ogni evoluzione, alla chiusura del suo blocco. |
| **Decisioni del proprietario** | Nello 0 (va o non va), nell'1 (il patto), nel 2 (cosa NON è), nel 3 (l'opzione di architettura). | Ogni volta che l'agente si ferma per una regola di business non scritta (6). Di solito sono due o tre per blocco. | Nel 12 (lucchetto per lucchetto), nel 13 (promuovere in produzione), nel 15 (il livello dell'agente residente). | Quelle che emergono; sempre scritte. |

Un dettaglio che voglio sottolineare perché è dove sbaglia di più chi viene dal vibecoding: **le
prove end to end di tutti i flussi non sono una sola volta alla fine**. Sono tre volte, su tre
scale. Con ogni voce in sospeso, il flusso che quella voce ha toccato. Alla chiusura di ogni
blocco, tutti i flussi che esistono fino a lì. E prima della produzione, tutti i flussi con la
versione esatta che si promuoverà. Se fai solo la terza, arrivi alla fine con un sistema che
nessuno ha provato end to end per settimane e l'uscita in produzione si trasforma in una
settimana di aggiustamenti.

### B.3 Il ritmo del ciclo: un blocco funzionale tipico

Un blocco funzionale è un insieme di tra quattro e otto voci in sospeso correlate, che insieme
fanno qualcosa che il business può usare: "l'agenda di base", "i promemoria", "il rapporto
mensile". Un blocco dura tra una e due settimane in un progetto piccolo. Così si vede da dentro:

1. **Apertura del blocco (mezza giornata).** Il proprietario racconta, in prosa, cosa vuole per
   questo blocco. L'agente lo trasforma in voci in sospeso numerate, con il loro "come si
   verifica", e chiede ciò che non basta per scrivere una voce verificabile (gradino 5). Il
   proprietario dà le priorità.
2. **Ogni voce in sospeso (da due ore a un giorno).** L'agente annuncia quale voce prende e
   perché. Costruisce. Se lungo la strada compare una regola di business che non è scritta, si
   ferma e chiede (6). Quando finisce, chiude con la routine del 7: test provato in rosso, verde,
   regressione dei vicini; una prova end to end del flusso toccato; e, se la modifica ha toccato un
   contratto tra due parti del sistema, l'altro lato aggiornato nello stesso commit (8). Se la voce
   dipendeva da un numero — quante query, quanto ci mette —, prima si è misurato con uno strumento
   con test (9). E il rapporto separa il verificato dal creduto e dichiara i punti ciechi (10). Il
   proprietario legge il rapporto e guarda la cattura della schermata. Non legge codice.
3. **Chiusura del blocco (da mezza giornata a un giorno).** La batteria completa end to end in
   verde nell'ambiente di test. Il proprietario o un utente di fiducia usa il sistema seguendo i
   flussi del blocco. Ciò che trova si annota come voci in sospeso. Si aggiorna il manuale utente
   con le schermate nuove (14, nello stesso commit). Solo allora si apre il blocco successivo.

In una giornata tipica del ciclo, il proprietario investe tra quindici e trenta minuti: rispondere
a due o tre domande di regole di business, leggere due o tre rapporti, guardare due o tre catture.
Questo è tutto ciò che il metodo gli chiede. Se sta investendo di più, o l'agente sta chiedendo ciò
che potrebbe risolvere da solo (gradino 1), o il proprietario sta leggendo codice (e allora
qualcosa del gradino 7 o del 10 non sta funzionando).

### B.4 I momenti umani

Riassumo in una lista i momenti in cui un umano, il proprietario o qualcuno di sua fiducia, deve
guardare o usare il sistema. Sono pochi, stanno in momenti precisi, e nessuno si può delegare
all'agente:

- **Fine dell'avvio**: aprire l'URL dell'ambiente di test e vedere il sistema vuoto.
- **Con ogni voce in sospeso che tocca una schermata**: guardare la cattura reale dell'ambiente di
  test.
- **Alla chiusura di ogni blocco**: usare il sistema nell'ambiente di test seguendo i flussi del
  blocco.
- **Prima del primo deployment in produzione**: test di accettazione su tutti i flussi.
- **Nel gradino 14**: una persona che non programma segue il manuale di ripristino nell'ambiente di
  test.
- **Dopo ogni deployment in produzione**: verificare che la versione che gira è quella voluta, e
  fare una passata in sola lettura sui flussi critici.
- **Prima del primo deployment, nel 19**: leggere i numeri della prova di carico con la tolleranza
  del business accanto, e il punto di rottura.
- **In ogni ciclo del monitoraggio (20 e 21)**: leggere il rapporto ciclico con l'agente e
  decidere quale scostamento e quale errore diventano voci in sospeso. Mezz'ora per ciclo.

Tutto il resto — i test, le misurazioni, gli audit, la documentazione — lo fa il modello e l'umano
lo verifica dall'artefatto, non dal codice.

### B.5 Come entrano i requisiti: dalla rilevazione all'albero semantico e alle voci in sospeso

Voglio soffermarmi su questo perché è dove l'ingegneria dei sistemi classica ha più da dire e dove
il vibecoding la ignora con più entusiasmo. Un requisito non è una frase del cliente in una chat.
È una frase del cliente **elaborata** con metodi che esistono da decenni e che continuano a valere
con un modello davanti, perché il modello è molto bravo ad applicarli se glielo chiedi e molto
scarso ad applicarli se non lo fai.

I metodi che uso, e che il metodo esige in ogni fase:

- **Interviste con il proprietario**, aperte, in prosa, registrate. Sono la fase 0. Non cerco che
  siano complete: cerco che l'agente rilevi cosa manca loro.
- **Casi d'uso o storie utente**, uno per flusso che il business sa nominare: "la receptionist
  carica un appuntamento", "il paziente riceve il promemoria". Ciascuno ha attore, evento
  scatenante, passi, risultato ed eccezioni. Sono l'unità con cui si apre un blocco funzionale.
- **Modello di dominio**: le entità del business, i loro attributi, i loro stati possibili e le
  transizioni tra stati. È il cuore dell'albero semantico (vedi sotto) ed è ciò che evita che il
  modello inventi stati che il business non ha.
- **Criteri di accettazione** per storia, nella forma "dato tale situazione, quando succede tale
  cosa, allora si vede tale risultato". Sono quelli che si trasformano nel "come si verifica" di
  ogni voce in sospeso e, dopo, nel test end to end.
- **Prototipi di schermata**, anche se sono un disegno. Lo sguardo umano sulle schermate comincia
  qui, prima che esista codice.
- **Tracciabilità**: ogni requisito si può seguire fino alla voce in sospeso che lo implementa, al
  test che lo prova e al commit che l'ha chiuso. Nel metodo la tracciabilità non è una matrice a
  parte: è la voce in sospeso stessa, che cita la sua origine e la sua prova.

**L'albero semantico.** È l'artefatto che ordina tutto questo ed è la mappa che l'agente legge in
ogni sessione (gradino 2). È un albero, non una lista: il sistema alla radice; sotto, i domini o
moduli; sotto ciascuno, i suoi attori, i suoi processi (i casi d'uso), le sue entità con i loro
stati, le sue schermate e le sue integrazioni esterne; e appese a ogni nodo, le voci in sospeso
che lo toccano e le decisioni che lo riguardano. Lo costruisce l'agente a partire dalla
rilevazione, lo correggi tu, e cresce con ogni blocco. Il suo valore è doppio: dà al modello il
contesto esatto del nodo che sta per toccare senza dover leggere tutto il progetto, e dà a te un
modo di verificare che il sistema che l'agente capisce è quello che il business ha chiesto, senza
leggere codice. Quando una voce in sospeso non è appesa a nessun nodo, o l'albero è incompleto o
la voce è fuori perimetro; entrambe le cose si vedono in dieci secondi.

**La specifica dettagliata vive nella voce in sospeso.** Nel metodo classico c'era un documento di
specifica dei requisiti, lungo, che invecchiava. Qui quel documento si scompone: ogni voce in
sospeso porta la propria specifica completa, e la somma delle voci in sospeso è la specifica del
sistema. Una voce ben scritta ha: titolo; il nodo dell'albero semantico a cui è appesa; la storia
o il caso d'uso che la origina, con le parole del cliente; la descrizione dettagliata di ciò che
si chiede; le regole di business applicabili, con la loro decisione e la loro data; i dati che
entrano ed escono; le schermate interessate, con il prototipo se c'è; i casi limite e le
eccezioni; i criteri di accettazione; e come si verifica. L'agente la redige a partire dalla tua
richiesta in prosa, chiede ciò che non basta per specificare, e tu la leggi prima che si
costruisca. Leggere la specifica di una voce in sospeso è il più vicino che sarai mai a leggere
codice, ed è esattamente la distanza giusta.

**Le voci in sospeso chiuse sono documentazione.** Questo è ciò che chiude il cerchio. Quando una
voce in sospeso si chiude, non si cancella né si archivia vuota: resta con la sua specifica, la
decisione che l'ha originata, la prova con cui è stata chiusa (i numeri del rosso e del verde, la
cattura della schermata, il numero misurato), il commit, e la data. La coda delle voci in sospeso
chiuse è, allora, lo storico funzionale del sistema: cosa si è costruito, perché, quando, e come
si è provato. Da lì escono il diario delle modifiche, le sezioni nuove del manuale utente e,
quando qualcuno chiede sei mesi dopo "perché il sistema fa questo?", la risposta. Il manuale del
corso insegna a esigere questa documentazione alla chiusura di ogni voce in sospeso, nella stessa
sessione, come parte della routine del gradino 5.

---

## Parte C — I ventidue gradini

### Passo 0 — Questo progetto si può affrontare così? (l'idoneità)

C'è qualcosa di previo a tutto, che non sta in nessun repository perché è sempre arrivato già
deciso: la decisione di **se un progetto si affronta con questo metodo o no**. È un criterio che
ho vissuto nella mia testa per mesi e che sto finendo di scrivere. I due criteri escludenti li ho
già chiari, e vengono dai progetti che ho rifiutato, non da quelli che ho accettato
[Ref. 46](REFERENCIAS.md#ref-46): i "no" definiscono il confine meglio dei "sì". I criteri che
pesano li sto ancora calibrando, e così li segno.

- **Intenzione**: decidere se un progetto si affronta con questo metodo, e con un agente davanti,
  o no, PRIMA di aprire il repository. Perché se entri in un progetto che non regge, il metodo
  degrada in "programmare con l'IA" e lì sì che il proprietario finisce per leggere codice.
- **Quando**: una sola volta, nella prima settimana, prima di qualunque altra cosa. Un'ora di
  lavoro; fa risparmiare mesi. Se il sistema esiste già, questo gradino si sale nella sua versione
  per i legacy (la stazione N0 del [percorso evolutivo-correttivo](EVOLUTIVO_CORRECTIVO.md)), con
  quattro criteri in più e X2 misurato schermata per schermata.
- **Input**: la richiesta del cliente, il dominio del business, i dati, la tecnologia, gli
  ambienti disponibili, e chi sarà il proprietario.
- **Artefatto**: una scheda di idoneità di una pagina, con i criteri valutati e la decisione: va,
  non va, o va con condizioni.
- **Cancello**: i criteri escludenti sono tutti in verde, e il punteggio di quelli che pesano
  supera la soglia (soglia che non ho ancora definito).
- **Chi decide**: il proprietario. Oggi sono io; l'idea è che il metodo permetta che lo decida
  un'altra persona con la stessa scheda.
- **Fallimento che evita**: infilarsi in un progetto in cui l'agente non può verificarsi da solo,
  o in cui non c'è un proprietario del dominio che decida, e finire con l'umano che rivede codice
  riga per riga.
- **Contratto**: `peldanos/peldano-00-elegibilidad.md`.

**I due criteri escludenti.**

| # | Criterio escludente | Perché uccide il metodo |
|---|---|---|
| X1 | Tecnologia ereditata senza repository accessibile, o con repository che non seguono uno standard | Senza un repository standard non c'è dove lasciare la prova: niente voci in sospeso citate nei commit (gradino 5), né test che viaggino con il codice (7), né integrazione e deployment come pacchetto (13), né documentazione nello stesso commit (14). L'agente lavora alla cieca e non lascia traccia verificabile. |
| X2 | Tecnologia che non si può provare end to end: non si possono eseguire le schermate e accedere a ogni elemento dell'interfaccia con i suoi diversi metodi, validando che la modifica sia arrivata al backend | Senza quella verifica da schermata a backend l'agente non può provarsi da solo (gradini 7, 9 e 10), e allora il proprietario dovrebbe leggere codice, che è proprio ciò che il metodo promette di evitare. |

Una precisazione che vale oro per la neutralità di strumento: **NAC3 (il protocollo che il mio
strumento usa perché le schermate si possano operare da programma) NON è condizione; è il mezzo
con cui oggi ci riesco**. Il criterio neutrale resta così: l'interfaccia si può eseguire da
programma, e ogni elemento della schermata è accessibile con i suoi diversi metodi (cliccare,
digitare, leggerne lo stato), in modo che un test possa percorrere la schermata e poi verificare
l'effetto nel backend. Una tecnologia la cui interfaccia non espone i suoi elementi a un "driver"
(come Playwright, per esempio) resta fuori, anche se ha un repository.

E una lettura che mi sembra importante: in fondo X1 e X2 sono **la stessa condizione vista da due
lati**. L'agente deve potersi verificare da solo, end to end, e lasciare la prova nel repository.
X1 è la metà "dove resta la prova?"; X2 è la metà "come si produce la prova?".

`[ipotesi]` **Criteri che pesano, ancora senza peso.** Li lascio segnati come ipotesi finché non
li calibro con i primi progetti che useranno il metodo end to end.

| # | Criterio candidato | Come si è visto nei casi | Escludente? |
|---|---|---|---|
| D1 | C'è un proprietario del dominio con criterio e con tempo per decidere (non per programmare) | nei tre sistemi, con le decisioni scritte con data | `[?]` |
| D2 | C'è un "oracolo" di verità verificabile: dati reali, un sistema esterno, produzione in sola lettura | la Mutua e il suo Autorizzatore come oracolo [Ref. 26](REFERENCIAS.md#ref-26) | `[?]` |
| D4 | La tecnologia rientra in ciò che l'agente padroneggia senza inventare (Node, Python, SQL, React) | tutti e tre | `[?]` |
| D5 | L'errore ha conseguenze reali (soldi, salute, esercizio), il che giustifica il fail-closed | la Mutua (salute, addebiti), l'Associazione (famiglie) | `[?]` |
| D6 | La volumetria si può conoscere dal primo giorno | Kikan: 3,4 milioni di righe all'anno [Ref. 15](REFERENCIAS.md#ref-15) | `[?]` |
| D7 | Il cliente tollera un tempo di maturazione e un umano nel circuito | l'approvatore automatico con modalità di prova [Ref. 28](REFERENCIAS.md#ref-28) | `[?]` |
| D9 | Il perimetro sta in un repository e un proprietario | tutti e tre | `[?]` |
| D10 | I segreti e gli accessi si possono isolare (cassaforte, file di ambiente, permessi limitati) | la chiave API associata a chi l'ha creata [Ref. 13](REFERENCIAS.md#ref-13) | `[?]` |

Due criteri che avevo nelle versioni precedenti (che l'agente possa provare da solo, e che il
progetto sia nuovo o verificabile con audit) li ho assorbiti rispettivamente in X2 e in X1,
perché sono conseguenze e non criteri a parte.

### Passo 1 — Il patto di convivenza (le regole prima del codice)

Prima di scrivere una sola riga, metti per iscritto come lavorerete tu e l'agente. Sembra una
formalità, e non lo è: è ciò che evita l'ottanta per cento delle frustrazioni del mese uno. Pensa
che l'agente arriva ogni mattina senza memoria di ieri; ciò che non è scritto glielo dovrai
ripetere ogni volta, e ogni volta un po' diverso.

- **Intenzione**: fissare come lavorano l'umano e l'agente prima della prima riga di codice.
- **Quando**: una sola volta, nella prima settimana, immediatamente dopo l'idoneità. Mezz'ora. Si
  rivede quando un colpo lo esige.
- **Input**: nulla del progetto; è il primo file. Da te: le tue preferenze di lavoro.
- **Artefatto**: un documento di standard di qualità che dica, come minimo: il tempo dell'umano è
  sacro (non lo si spende in cose che l'agente può risolvere da solo); zero debito tecnico, cioè,
  quando qualcosa si rompe si corregge alla radice e si aggiunge la regressione nella stessa
  sessione; il perimetro è esatto, né più né meno di ciò che è stato chiesto; si parla nella
  lingua dell'utente; la documentazione si aggiorna nello stesso commit; e non si annuncia mai
  come fatto qualcosa che non è stato fatto.
- **Cancello**: il patto è nel repository e si legge in ogni sessione.
- **Chi decide**: il proprietario. L'agente può proporre modifiche, ma non edita il patto per
  conto suo.
- **Fallimento che evita**: l'agente che "aiuta" espandendo il perimetro perché gli è sembrata una
  buona idea; quello che lascia debito "per dopo" (e il dopo non arriva mai); e quello che
  riporta come fatto ciò che *crede* di aver fatto. L'ho scritto per la prima volta quando erano
  due settimane che ripetevo le stesse cose in ogni sessione [Ref. 1](REFERENCIAS.md#ref-1).
- **Contratto**: `peldanos/peldano-01-contrato-de-convivencia.md`.

### Passo 2 — La definizione del progetto e la lettura obbligatoria

Ogni sessione dell'agente parte da zero. Dagli una mappa, breve, e obbligalo a leggerla prima di
toccare qualsiasi cosa. Le due metà contano allo stesso modo: una mappa che nessuno legge non
agisce, e una mappa lunga non la legge nessuno.

- **Intenzione**: che ogni sessione parta sapendo cos'è il progetto, in che stato è e quali
  decisioni sono già state prese.
- **Quando**: si scrive una volta, nella prima settimana, dopo il patto; si mantiene aggiornata
  per tutto il progetto, con ogni decisione nuova.
- **Input**: il patto (gradino 1) e la rilevazione del business.
- **Artefatto**: un file di progetto operativo, e qui va un'enfasi: BREVE. È il programma, non lo
  storico. Più l'**albero semantico** del sistema (vedi B.5): domini, attori, processi, entità con
  i loro stati, schermate e integrazioni, con le voci in sospeso e le decisioni appese a ogni nodo.
  Più un file di stato vivo con ciò su cui si sta lavorando e i dubbi aperti.
- **Cancello**: l'agente legge il file di progetto e l'albero semantico prima di toccare codice, e
  si è provato che li legge.
- **Chi decide**: il proprietario definisce; l'agente lo mantiene aggiornato.
- **Fallimento che evita**: due, ben concreti. Lavoro da buttare per non aver letto la mappa
  [Ref. 9](REFERENCIAS.md#ref-9). E il file di progetto che cresce fino a diventare illeggibile
  [Ref. 41](REFERENCIAS.md#ref-41): il file operativo e il libro dei casi devono essere file
  distinti.
- **Contratto**: `peldanos/peldano-02-definicion-y-lectura.md`.

### Passo 3 — Dimensionare prima di progettare l'architettura

Questo è il gradino che costa più caro saltare, e lo so perché l'ho saltato. Le decisioni
strutturali si prendono con numeri, e i numeri primari li ha il business, non il modello.

- **Intenzione**: che le decisioni strutturali (quale motore di database, se l'interfaccia è
  sincrona o asincrona, quanta concorrenza) si prendano con numeri e non con il gusto.
- **Quando**: una volta, nella prima settimana, prima di montare lo scheletro; si rifà se il
  business cambia scala. Mezza pagina e una decisione in un progetto piccolo.
- **Input**: una rilevazione di dati di volumetria fatta con il business, per natura incompleta; e
  accesso in lettura al sistema precedente se esiste. Ci sono dati che **solo il business ha** e
  che il modello non può inferire: per questo il prompt gli esige di valutare se sono completi e
  di chiedere quelli che mancano, invece di stimarli con faccia sicura.
- **Artefatto**: un registro di dimensionamento con opzioni FISSE (tre o quattro opzioni concrete)
  e quella scelta; e le decisioni "asimmetriche" dichiarate esplicitamente, per esempio
  "l'interfaccia di persistenza è asincrona dalla riga uno anche se il primo motore è sincrono",
  perché se ti sbagli costa poco e se non lo fai costa una fortuna.
- **Cancello**: il dimensionamento è registrato prima di montare lo scheletro.
- **Chi decide**: il proprietario sceglie tra le opzioni fisse; l'agente le presenta con numeri.
- **Fallimento che evita**: partire con uno storage che non regge la volumetria e scoprirlo
  quando cambiare l'interfaccia costa un'intera tappa di reingegnerizzazione
  [Ref. 15](REFERENCIAS.md#ref-15).
- **Contratto**: `peldanos/peldano-03-dimensionar.md`.

### Passo 4 — Lo scheletro con i suoi cancelli

Prima che il sistema faccia qualcosa di utile, deve partire, testarsi e distribuirsi VUOTO. Sì,
vuoto. Perché il cammino verso la produzione è parte del prodotto, e l'unico modo di sapere che
funziona è percorrerlo quando ancora non c'è nulla da perdere. Questo è il gradino in cui si fa
**tutta l'infrastruttura iniziale e la catena di integrazione e deployment**, e per questo occupa
la maggior parte della prima settimana.

- **Intenzione**: avere un sistema che parte, si prova e si distribuisce senza nessuna
  funzionalità ancora.
- **Quando**: una volta, alla fine della prima settimana, dopo il dimensionamento e prima di
  qualunque funzionalità. È la chiusura della fase di avvio.
- **Input**: il dimensionamento (gradino 3), la rilevazione degli ambienti, e le credenziali del
  posto in cui si distribuirà.
- **Artefatto**: lo scheletro con l'integrazione continua in verde, la struttura di test montata
  con un test di fumo, un deployment su un ambiente di test che funziona e si è eseguito due
  volte, e i cancelli del flusso dichiarati per iscritto.
- **Cancello**: lo scheletro è in verde, l'integrazione continua gira, e il deployment
  all'ambiente di test funziona con zero funzionalità. Il proprietario ha aperto l'URL e ha visto
  la schermata vuota.
- **Chi decide**: l'agente esegue; il proprietario approva visivamente.
- **Fallimento che evita**: scoprire il deployment un mese dopo l'avvio e pagare cinque voci in
  sospeso di fila perché funzioni, con funzionalità in gioco [Ref. 32](REFERENCIAS.md#ref-32).
- **Contratto**: `peldanos/peldano-04-esqueleto.md`.

### Passo 5 — Il piano sono le voci in sospeso

Qui c'è un'idea che, quando la afferri, non la lasci più: non c'è un "piano" da una parte e una
"lista di compiti" dall'altra. **La lista delle voci in sospeso È il piano.** E ogni voce dice
come si verifica, perché è quello che tu guarderai invece di guardare il codice.

- **Intenzione**: un'unica coda di lavoro, con ordine e con cancello, che sia la verità del
  progetto.
- **Quando**: si crea all'apertura del primo blocco funzionale, appena finisce l'avvio; si usa in
  ogni sessione per tutto il progetto. Ogni blocco nuovo parte trasformando la richiesta del
  cliente in voci in sospeso.
- **Input**: la richiesta del cliente per il blocco, gli audit, e i rilievi delle prove umane.
- **Artefatto**: un registro di voci in sospeso numerate, ciascuna con la sua **specifica
  dettagliata** (vedi B.5): il nodo dell'albero semantico a cui è appesa, la storia di origine con
  le parole del cliente, la descrizione, le regole di business applicabili, i dati, le schermate,
  i casi limite, i criteri di accettazione e come si verifica. E, alla chiusura, la
  **documentazione della voce fatta**: la prova, il commit, la data, ciò che è stato deciso lungo
  la strada. Le voci in sospeso chiuse sono lo storico funzionale del sistema.
- **Cancello**: nessuna modifica entra senza voce in sospeso specificata; e la voce si chiude con
  prova documentata, non con "fatto".
- **Chi decide**: il proprietario dà le priorità; l'agente propone ed esegue in ordine.
- **Fallimento che evita**: la specifica che "viene superata" e resta obsoleta in due settimane
  [Ref. 17](REFERENCIAS.md#ref-17); e il lavoro di cui sei mesi dopo nessuno sa perché è stato
  fatto [Ref. 7](REFERENCIAS.md#ref-7).
- **Contratto**: `peldanos/peldano-05-pendientes.md`.

### Passo 6 — Le decisioni si scrivono accanto al codice

Il modello, quando trova un buco nelle regole di business, lo riempie. Non si ferma a chiedere;
completa con ciò che gli sembra più probabile, con la stessa naturalezza con cui scrive il resto.
Per questo questo gradino non è "scrivi le decisioni" ma "esigigli che si fermi e chieda quando ne
manca una", e quando decidi, la decisione resta con le tue parole, il tuo nome e la data.

- **Intenzione**: che ogni regola di dominio o decisione strutturale abbia proprietario, data e
  luogo.
- **Quando**: in ogni sessione del ciclo, ogni volta che l'agente si imbatte in una regola non
  scritta. Di solito sono due o tre per blocco funzionale. Anche nell'avvio (gradini 0 e 3) e
  nell'uscita in produzione (12 e 13).
- **Input**: la conversazione con il proprietario. È l'unico input.
- **Artefatto**: la decisione scritta nel commit e in un registro delle decisioni, con le parole
  testuali. Se il proprietario non ha risposto e l'agente ha dovuto scegliere, resta segnata come
  "decisione per omissione" da rivedere.
- **Cancello**: una regola di business non entra nel codice senza la sua frase di origine.
- **Chi decide**: il proprietario. Sempre. Senza eccezioni.
- **Fallimento che evita**: discutere sei settimane dopo perché qualcosa è così; e, peggio,
  l'agente che inventa regole di dominio perché gli sono sembrate ragionevoli. La pratica di
  scrivere la regola nel commit con data e proprietario viene dalla Mutua
  [Ref. 29](REFERENCIAS.md#ref-29), e quella di congelare le decisioni prima di costruire, dal mio
  strumento [Ref. 5](REFERENCIAS.md#ref-5).
- **Contratto**: `peldanos/peldano-06-decisiones.md`.

### Passo 7 — I test come lucchetti, provati in rosso

Un test che non hai mai visto fallire non sai se prova qualcosa. Per questo qui la regola non è
"scrivi test"; è "dimostra che il test si mette in rosso contro il codice vecchio, poi in verde, e
poi che la regressione resta in verde". E le prove end to end, dalla schermata fino al backend,
sono quelle che sostituiscono la tua lettura del codice.

- **Intenzione**: che ogni comportamento che conta abbia un test che FALLISCE se si rompe, e che
  si sappia con certezza che fallisce.
- **Quando**: con ogni voce in sospeso del ciclo, alla chiusura. La prova end to end del flusso
  toccato, nella stessa chiusura. La batteria completa end to end, alla chiusura di ogni blocco e
  prima di ogni deployment in produzione.
- **Input**: la modifica già implementata e la voce in sospeso con il suo "come si verifica".
- **Artefatto**: il test nuovo, l'output in rosso e in verde con i numeri, la regressione dei
  vicini nella stessa sessione, e il commit che dice contro cosa si è provato in rosso.
- **Cancello**: rosso dimostrato, verde, regressione in verde. E l'agente non simula proprio la
  parte che vuole provare.
- **Chi decide**: l'agente esegue e riporta; il proprietario legge il rapporto, non il test.
- **Fallimento che evita**: i test che passano perché non provano nulla, e il verde che nasconde
  un bug [Ref. 44](REFERENCIAS.md#ref-44). Il caso dei contatori è l'esempio completo di un test
  provato in rosso contro il criterio vecchio [Ref. 26](REFERENCIAS.md#ref-26).
- **Contratto**: `peldanos/peldano-07-tests-en-rojo.md`.

### Passo 8 — Simmetria tra produttore e consumatore, e il registro degli anti-pattern

Quando cambi un capo (il server, il database, un robot), l'altro capo (la schermata, un
contatore, un rapporto) deve cambiare nello stesso commit. Il principio che lo sostiene è che
**ogni lista ha un solo proprietario**. E gli errori che hai già pagato una volta si annotano con
la loro verifica automatica, per non pagarli due volte.

- **Intenzione**: che una modifica a un capo trascini l'altro, sempre, nello stesso commit.
- **Quando**: con ogni voce in sospeso che tocca un contratto tra due parti del sistema; la mappa
  dei contratti si costruisce all'apertura del secondo blocco funzionale, quando ci sono già
  schermata e server; il registro degli anti-pattern cresce ogni volta che qualcosa si rompe per
  la seconda volta.
- **Input**: la mappa di chi produce e chi consuma ogni contratto; il registro degli anti-pattern.
- **Artefatto**: il server definisce la lista e il consumatore la legge; la mappa
  produttore/consumatore; il registro degli anti-pattern con odore, causa radice, correzione e
  rilevamento precoce.
- **Cancello**: automatico: l'agente cerca l'altro lato prima di dare per chiusa una modifica.
- **Chi decide**: nessuno; è automatico.
- **Fallimento che evita**: il contatore che non coincide con la query
  [Ref. 26](REFERENCIAS.md#ref-26); due copie dello stesso modulo che si desincronizzano
  [Ref. 41](REFERENCIAS.md#ref-41). La soluzione della fonte unica l'ho imposta alla Mutua
  [Ref. 27](REFERENCIAS.md#ref-27).
- **Contratto**: `peldanos/peldano-08-simetria-y-antipatrones.md`.

### Passo 9 — Misurare prima di costruire, con uno strumento che a sua volta si verifica

Questo è, per me, il gradino più adulto di tutti, e quello che ho impiegato più tempo a
formalizzare perché davo per scontato che un modello l'avrebbe applicato da solo. Non lo applica.
La regola è: nessun numero che decide qualcosa esce da un'impressione; esce da un misuratore che
vive nel repository, che ha un test, e che tu puoi eseguire. E anche il misuratore si verifica,
perché i misuratori mentono.

- **Intenzione**: che ogni numero che alimenta una decisione esca da uno strumento con test, e che
  lo strumento stesso venga sottoposto ad audit.
- **Quando**: nel ciclo, ogni volta che una voce in sospeso dipende da un numero o da un'ipotesi
  di causa, PRIMA di costruire. Nell'avvio, il dimensionamento è il primo caso. In un progetto
  piccolo, "misurare" è contare con un comando e annotare il numero con la data.
- **Input**: l'ipotesi, del proprietario o dell'agente, e l'accesso a ciò che si vuole misurare.
- **Artefatto**: il misuratore con guardia nel repository; il numero con il suo comando e la sua
  data; l'audit in due direzioni; l'approssimato segnato; e, se del caso, un budget per percorso
  stretto sul misurato e protetto da un test.
- **Cancello**: le cinque regole: misuratore con guardia; se lo strumento non esiste si
  costruisce; si sottopone ad audit in due direzioni; l'approssimato si segna; e chi esegue
  verifica i numeri di chi ha pianificato.
- **Chi decide**: il numero. Il proprietario porta l'ipotesi; l'agente la misura prima di
  costruire.
- **Fallimento che evita**: i misuratori che mentivano e il piano con tre numeri su quattro
  sbagliati [Ref. 36](REFERENCIAS.md#ref-36); il cricchetto a zero che non vedeva 84 chiamate
  [Ref. 35](REFERENCIAS.md#ref-35). Le regole le ho scritte io, in sessione, prima che fossero
  dottrina [Ref. 45](REFERENCIAS.md#ref-45).
- **Contratto**: `peldanos/peldano-09-medir.md`.

### Passo 10 — Verifica onesta e rapporto proporzionato

Se non leggerai codice, il rapporto dell'agente deve essere affidabile, e questo non succede da
solo. Il modello è stato addestrato per essere utile e completo, e un rapporto che dice "questo
non l'ho potuto verificare" sembra meno utile di uno che dice "fatto". Quindi esigigli
esplicitamente le cattive notizie, i punti ciechi e ciò che non ha fatto.

- **Intenzione**: che il rapporto dell'agente sia affidabile senza che il proprietario legga
  codice.
- **Quando**: in ogni rapporto, di ogni voce in sospeso, per tutto il progetto. È la forma che
  deve avere tutto ciò che l'agente ti dice.
- **Input**: il lavoro fatto e la voce in sospeso che lo chiedeva.
- **Artefatto**: un rapporto con tre blocchi: verificato (con la prova accanto), creduto (e perché
  non si è provato), punti ciechi (ciò che non può vedere da dove sta). Copre ogni elemento
  chiesto. Le cattive notizie prima.
- **Cancello**: nessuna affermazione senza la sua prova. "Fatto" non si dice e basta. Davanti a
  un "è ancora rotto", prima si confronta la versione pubblicata con quella che ha la correzione.
- **Chi decide**: il proprietario si fida, o chiede la prova. Non rivede mai codice.
- **Fallimento che evita**: l'errore riportato come successo e i rapporti che dichiaravano
  verificato ciò che non lo era [Ref. 43](REFERENCIAS.md#ref-43); il turno che ha lavorato
  invisibile per un'ora e quarantatré [Ref. 16](REFERENCIAS.md#ref-16). La regola di onestà di
  verifica l'ho scritta a giugno [Ref. 8](REFERENCIAS.md#ref-8).
- **Contratto**: `peldanos/peldano-10-verificacion-honesta.md`.

### Passo 11 — L'audit periodico come input del piano

Ogni tanto bisogna guardare il sistema intero con occhi freschi, e ciò che si vede non va in un
rapporto che si archivia: va nella coda delle voci in sospeso. La parte importante è "occhi
freschi": che faccia l'audit qualcuno che non ha costruito, perché chi ha costruito condivide le
proprie assunzioni. Basta un'altra sessione del modello, con un altro file di istruzioni.

- **Intenzione**: guardare il sistema completo ogni tanto e trasformare ciò che si vede in voci in
  sospeso.
- **Quando**: obbligatorio prima del primo deployment in produzione (apre la fase di uscita). In
  esercizio, ogni uno o due mesi secondo il ritmo di cambiamento, e alla chiusura di ogni tappa
  grande.
- **Input**: il repository intero e la produzione in sola lettura.
- **Artefatto**: un rapporto con rilievi graduati, ciascuno con posizione, rischio, prova e
  priorità; voti per dimensione; e i rilievi urgenti già trasformati in voci in sospeso.
- **Cancello**: ogni rilievo urgente ha una voce in sospeso aperta prima di dare l'audit per
  chiuso.
- **Chi decide**: il proprietario dà le priorità ai rilievi.
- **Fallimento che evita**: query che leggono tabelle intere [Ref. 18](REFERENCIAS.md#ref-18); due
  porte di amministratore che nessuno ha visto finché non le ha guardate un altro
  [Ref. 40](REFERENCIAS.md#ref-40); una vulnerabilità nota e un componente enorme
  [Ref. 41](REFERENCIAS.md#ref-41).
- **Contratto**: `peldanos/peldano-11-auditoria.md`.

### Passo 12 — Fail-closed, lucchetti e zero danno silenzioso

Davanti al dubbio o al fallimento, il sistema NON agisce. E lo dice. Suona ovvio, ma è il
contrario di ciò che il software fa per default, che davanti al dubbio va avanti. Questo gradino
va **prima** di costruire le funzionalità che agiscono sul mondo, non dopo.

- **Intenzione**: che il sistema, davanti a un dubbio o a un fallimento, non agisca, e avvisi.
- **Quando**: nella fase di uscita in produzione, prima di costruire qualunque funzionalità che
  incassi, invii, approvi o cancelli; si rivede con ogni azione nuova con conseguenze. Le
  automazioni nuove partono in modalità di prova e si abilitano dopo aver guardato il loro
  registro per qualche giorno.
- **Input**: la rilevazione delle azioni con conseguenza, fatta con il proprietario.
- **Artefatto**: la tabella dei lucchetti: ogni azione con la sua reversibilità, il suo lucchetto,
  la sua via del ritorno; un test per lucchetto provato in rosso; le automazioni nuove in
  modalità di prova.
- **Cancello**: ogni azione irreversibile ha lucchetto e via del ritorno documentata.
- **Chi decide**: il proprietario approva lucchetto per lucchetto; il sistema non li salta mai.
- **Fallimento che evita**: un doppio addebito, un'approvazione automatica senza passare per un
  umano, la cancellazione di dati del cliente. I lucchetti della Mutua sono il modello
  [Ref. 28](REFERENCIAS.md#ref-28); il riflesso di non rompere l'elenco intero, anche
  [Ref. 25](REFERENCIAS.md#ref-25).
- **Contratto**: `peldanos/peldano-12-fail-closed.md`.

### Passo 13 — Integrazione continua, ambienti, segreti e deployment come parte del prodotto

Arrivare in produzione deve essere un pacchetto riproducibile: i test girano UNA volta, il
deployment si limita a impacchettare e caricare, la configurazione vive sul server e non nel
repository, e il rollback è provato. Buona parte di questo esiste già dallo scheletro; questo
gradino lo completa verso la produzione.

- **Intenzione**: che arrivare in produzione sia un pacchetto riproducibile, con i test eseguiti
  una sola volta e la configurazione fuori dal repository.
- **Quando**: la catena di integrazione e il deployment all'ambiente di test si montano nel
  gradino 4. La chiusura verso la produzione — ambiente reale, segreti, promozione, rollback
  provato, lucchetto contro i segreti — si fa nella fase di uscita, dopo l'audit e i lucchetti.
  La routine di ogni deployment si applica per tutto l'esercizio.
- **Input**: la rilevazione di ambienti e accessi; lo scheletro con la sua integrazione.
- **Artefatto**: l'integrazione continua che esegue la batteria una volta per commit; il
  deployment che aspetta quel risultato e si limita a impacchettare; la configurazione solo sul
  server; la procedura di promozione scritta e ripetibile; il rollback provato; la verifica che
  impedisce di caricare un segreto.
- **Cancello**: test in verde con la stessa versione prima di toccare la produzione; rollback
  provato; nessun segreto nel repository né nella chat senza ruotarlo.
- **Chi decide**: il proprietario promuove in produzione; l'agente prepara tutto.
- **Fallimento che evita**: test eseguiti tre volte per commit e la quota bruciata
  [Ref. 39](REFERENCIAS.md#ref-39); il deployment indurito a colpi di voci in sospeso per averlo
  scoperto tardi [Ref. 32](REFERENCIAS.md#ref-32); segreti incollati nella chat
  [Ref. 42](REFERENCIAS.md#ref-42).
- **Contratto**: `peldanos/peldano-13-ci-entornos-secretos-deploy.md`.

### Passo 14 — Documentazione viva e manuali che una persona può seguire senza IA

Il sistema deve potersi usare, mantenere e ripristinare senza l'agente e senza di te. Se il
giorno in cui non c'è l'agente non si può distribuire, non è finito. E siccome rigenerare
documentazione con un modello è gratis, la regola diventa "nello stesso commit".

- **Intenzione**: che il sistema si possa usare, mantenere e ripristinare senza l'agente e senza
  il costruttore.
- **Quando**: il manuale utente cresce con ogni blocco funzionale, alla chiusura, con le schermate
  nuove. I tre manuali completi si generano nella fase di uscita in produzione, dopo il 13, e la
  prova con una persona che non programma si fa prima del primo deployment. La routine dello
  stesso commit vige per tutto l'esercizio.
- **Input**: il sistema che gira nell'ambiente di test; gli artefatti del 12 e del 13.
- **Artefatto**: il manuale utente con catture reali, quello di manutenzione, e quello di
  infrastruttura e ripristino scritto per una persona che deve farlo a mano alle tre di notte;
  ciascuno con data e versione.
- **Cancello**: la documentazione è aggiornata nello stesso commit; qualcuno che non programma ha
  seguito il manuale di ripristino.
- **Chi decide**: l'agente mantiene; il proprietario legge il manuale, non il codice.
- **Fallimento che evita**: il documento non aggiornato che ha provocato un commit nel repository
  sbagliato; il file di progetto trasformato in storico [Ref. 41](REFERENCIAS.md#ref-41). I
  manuali riproducibili a mano sono quelli della Mutua [Ref. 24](REFERENCIAS.md#ref-24).
- **Contratto**: `peldanos/peldano-14-documentacion-viva.md`.

### Passo 15 — L'agente dentro il sistema, e la retrospettiva con i numeri

L'ultimo gradino ha due parti che chiudono lo stesso ciclo. Primo: l'agente resta residente in
produzione, con perimetro limitato, agendo a nome di una persona. Secondo: il metodo stesso si
rivede con numeri, e ciò che si impara torna al gradino 0 per il progetto successivo.

- **Intenzione**: che l'agente resti residente in produzione con perimetro limitato, e che il
  metodo si riveda con numeri.
- **Quando**: l'agente residente, all'entrata in esercizio, dopo il primo deployment in
  produzione. La retrospettiva, alla chiusura di ogni tappa e del progetto; è obbligatoria anche
  se è di una pagina.
- **Input**: il sistema in produzione, gli incidenti, i costi.
- **Artefatto**: il documento dell'agente residente con la sua mappa del sistema, il suo
  perimetro, la sua credenziale a nome di una persona e la prova che ciò che è fuori perimetro
  viene rifiutato; e la retrospettiva con numeri con fonte, ogni incidente mappato a un gradino, e
  almeno una proposta concreta di modifica alla scala.
- **Cancello**: l'agente non può fare ciò che il proprietario non ha approvato; la retrospettiva
  produce almeno una modifica alla scala.
- **Chi decide**: il proprietario.
- **Fallimento che evita**: l'agente che opera senza mappa; e il metodo che si ripete uguale
  progetto dopo progetto senza imparare. La retrospettiva con i numeri che ha ucciso la squadra
  multi-agente è il modello [Ref. 6](REFERENCIAS.md#ref-6); l'agente residente, quello della Mutua
  [Ref. 13](REFERENCIAS.md#ref-13).
- **Contratto**: `peldanos/peldano-15-agente-residente-y-retrospectiva.md`.

---

### I sei gradini di qualità operativa (da 16 a 21)

I sedici gradini precedenti fanno sì che il sistema sia ben costruito e si possa sostenere. Questi
sei fanno qualcosa di diverso e che io avevo lasciato implicito, perché nei miei progetti lo
facevo senza nominarlo: che il sistema si possa **vedere** mentre gira, che regga il volume per
cui è stato dimensionato, che non abbia buchi noti, e che, una volta in produzione, nessuno venga
a sapere di un problema da un utente arrabbiato. Quattro si salgono prima del primo deployment in
produzione, in quest'ordine: osservabilità (16), persistenza (17), vulnerabilità (18) e rendimento
(19). Due si montano nella settimana del primo deployment e girano da soli da allora: il
monitoraggio di risorse e rendimento (20) e quello degli errori (21). I due monitoraggi finiscono
nello stesso posto di tutto il resto: il ciclo, come voci in sospeso correttive. E i sei valgono
per i due casi d'uso: in un progetto nuovo, nel posto che dice il loro "quando"; in un legacy, con
le differenze che segna ogni scheda e che sono dettagliate nel percorso evolutivo-correttivo.

Se sei alle prime armi, ogni contratto di questi sei comincia con un paragrafo che spiega le sue
parole (registro, indice, vulnerabilità, latenza, soglia) nel linguaggio di tutti i giorni, e il
glossario le ha tutte.

### Passo 16 — Osservabilità e tracciabilità totali, con livello configurabile

Quando qualcosa fallirà in produzione voglio seguire un'azione dalla schermata fino al database
con un solo identificatore, senza aprire il codice; voglio poter alzare il dettaglio dei registri
in produzione in un minuto, senza rifare il deployment; e voglio che ogni azione con conseguenza
lasci una traccia che l'applicazione non possa cancellare.

- **Intenzione**: che il sistema si possa vedere mentre gira (osservabilità) e che ogni azione
  importante abbia la sua traccia (tracciabilità), con un livello di dettaglio che si cambia per
  configurazione.
- **Quando**: nell'uscita in produzione, dopo il 13 e prima del 19. In un legacy, il livello
  minimo entra nella cintura di sicurezza (N4) e quello completo qui. La regola "ogni modulo nuovo
  registra e propaga" vige durante tutto l'esercizio.
- **Input**: la configurazione per ambiente (13), la tabella dei lucchetti (12), la lista dei dati
  personali della rilevazione, e la decisione su dove vivono i registri.
- **Artefatto**: registri strutturati con livello configurabile senza deployment; un
  identificatore di correlazione in ogni record, dalla schermata al database; un audit immutabile
  delle azioni con conseguenza; endpoint di salute e metriche; `docs/OBSERVABILITY.md`.
- **Cancello**: un identificatore reale seguito attraverso tutti gli strati; il livello cambiato
  senza deployment; nessun dato personale nei registri.
- **Chi decide**: il proprietario decide dove vivono i registri, per quanto si conservano e cosa è
  dato personale; l'agente costruisce.
- **Fallimento che evita**: il processo che è rimasto vivo un'ora e quarantatré e si è trovato dal
  log [Ref. 16](REFERENCIAS.md#ref-16); l'agente residente che opera alla cieca se non ci sono
  registri da leggere [Ref. 13](REFERENCIAS.md#ref-13).
- **Contratto**: `peldanos/peldano-16-observabilidad-y-trazabilidad.md`.

### Passo 17 — Ottimizzazione dello strato di persistenza, misurata prima e dopo

Il database è dove i sistemi muoiono lentamente: bene con cento record, male con centomila, e
nessuno sa quando è cominciato. Qui si decide con i numeri, prima della produzione, e con il
metodo del gradino 9: misurare, cambiare, misurare di nuovo sugli stessi dati.

- **Intenzione**: che le query reali del sistema, ai volumi del dimensionamento, rientrino in ciò
  che il business tollera, con budget che impediscano loro di uscirne di nuovo.
- **Quando**: nell'uscita in produzione, dopo il 16 e prima del 19; si ripete quando un blocco
  aggiunge una tabella grande o il monitoraggio (20) mostra una query fuori range. In un legacy,
  le misurazioni escono da N6 e quasi tutto si paga "al tocco".
- **Input**: il dimensionamento (3 o N6), la mappa produttore-consumatore (8), l'osservabilità
  (16), e l'ambiente di test caricato al volume atteso.
- **Artefatto**: misuratori di query con test; `docs/PERSISTENCE.md` con la tabella del prima e
  dopo per ogni modifica, i budget per percorso e la retention per tabella; un test per budget.
- **Cancello**: nessuna query che legga una tabella intera in un flusso critico; ogni budget con
  il suo test; la schermata più lenta dentro ciò che il dimensionamento si aspettava.
- **Chi decide**: il proprietario approva la lista delle modifiche, una per una; l'agente misura e
  applica.
- **Fallimento che evita**: le query che leggevano tabelle intere in un sistema vivo
  [Ref. 18](REFERENCIAS.md#ref-18); il budget che si è dovuto stringere a ciò che era stato
  misurato [Ref. 37](REFERENCIAS.md#ref-37); i milioni di righe su file
  [Ref. 15](REFERENCIAS.md#ref-15).
- **Contratto**: `peldanos/peldano-17-persistencia.md`.

### Passo 18 — Scansione e soluzione delle vulnerabilità, nella catena e con un calendario

L'audit (11) guarda il sistema intero con criterio, ogni tanto; questo gradino guarda una cosa
sola, la sicurezza, tutto il tempo e a macchina: dipendenze, codice, segreti nella storia e
configurazione del server. E una regola: un aggiornamento di dipendenza è una modifica, ed entra
dal ciclo.

- **Intenzione**: che nessuna vulnerabilità nota arrivi in produzione, e che quelle nuove si
  rilevino da sole anche se nessuno tocca il sistema.
- **Quando**: nell'uscita in produzione, dopo il 13 e prima del primo deployment; poi, a ogni push
  e con un calendario settimanale. In un legacy, la prima esecuzione fa parte di N3.
- **Input**: l'integrazione continua (4 e 13), la rilevazione degli ambienti, l'audit precedente,
  e il criterio del proprietario su cosa è urgente.
- **Artefatto**: la scansione in quattro strati che gira nella catena e con un calendario;
  `docs/SECURITY_[data].md` con i rilievi e ciò che non è stato scansionato; `docs/SECURITY.md`
  con la politica; il cancello in `docs/GATES.md`; i P0 e i P1 sistemati con la loro voce in
  sospeso.
- **Cancello**: nessun P0 aperto viene promosso in produzione; un P1 nuovo apre una voce in
  sospeso da solo.
- **Chi decide**: il proprietario definisce cosa è P0 e approva le soluzioni; l'agente monta ed
  esegue.
- **Fallimento che evita**: la vulnerabilità nota comparsa nell'audit di qualità
  [Ref. 41](REFERENCIAS.md#ref-41); le porte di amministratore che ha visto solo un'altra sessione
  [Ref. 40](REFERENCIAS.md#ref-40); la sicurezza trattata come una lista che si spunta una volta
  [Ref. 23](REFERENCIAS.md#ref-23).
- **Contratto**: `peldanos/peldano-18-vulnerabilidades.md`.

### Passo 19 — Prove di rendimento in volume e punto di rottura

Il gradino 3 ha dimensionato con i conti; questo verifica i conti con il sistema in esecuzione: al
volume atteso, al "per dieci", e finché qualcosa non si rompe. Il punto di rottura è il numero più
utile della fase, perché da lì escono le soglie di allerta del 20.

- **Intenzione**: sapere come si comporta il sistema al volume atteso, al "per dieci", e dove e
  perché si rompe, prima che entri il primo utente.
- **Quando**: nell'uscita in produzione, dopo il 16 e il 17, prima del primo deployment; si ripete
  prima di ogni deployment che cambi l'architettura, la persistenza o un flusso critico. In un
  legacy, con i volumi misurati in N6.
- **Input**: il dimensionamento, l'osservabilità accesa, la persistenza ottimizzata, i flussi
  critici e la tolleranza del business per la schermata più usata.
- **Artefatto**: lo script di carico nel repository, con test; `docs/PERFORMANCE_[data].md` con le
  tre esecuzioni, il punto di rottura e la diagnosi; `docs/PERFORMANCE.md` con le soglie e il
  cancello; una voce in sospeso per ogni collo di bottiglia.
- **Cancello**: la schermata più usata dentro la tolleranza al volume atteso, o una voce in
  sospeso con il numero; il punto di rottura scritto con cosa si rompe.
- **Chi decide**: il proprietario dà la tolleranza e decide fino a quale volume si sistemano i
  colli di bottiglia adesso.
- **Fallimento che evita**: il carico reale che si è conosciuto solo guardando la produzione
  [Ref. 12](REFERENCIAS.md#ref-12); il punto di rottura che si è travestito da test fallito
  [Ref. 44](REFERENCIAS.md#ref-44); il dimensionamento come cancello
  [Ref. 14](REFERENCIAS.md#ref-14).
- **Contratto**: `peldanos/peldano-19-rendimiento-y-punto-de-ruptura.md`.

### Passo 20 — Monitoraggio di risorse, funzioni e query fuori range, con rapporto ciclico

Le prove del 19 dicono come si comporta il sistema un giorno; la produzione è tutti i giorni, con
i dati che crescono. Questo gradino sorveglia l'uso delle risorse e il tempo di risposta di ogni
funzione e di ogni query contro le soglie del 19 e contro la propria storia, avvisa quando
qualcosa esce dal range, e produce un rapporto ciclico che si legge con il proprietario. Ogni
scostamento è una voce in sospeso.

- **Intenzione**: vedere un problema di risorse o di rendimento prima che lo veda l'utente, e che
  ogni scostamento abbia una causa o una voce in sospeso.
- **Quando**: si monta nella settimana del primo deployment in produzione; da allora gira da solo,
  e il rapporto si legge a ogni ciclo (settimanale con conseguenze, mensile in un progetto
  piccolo). In un legacy, la prima lettura è la linea base.
- **Input**: le metriche del 16, i budget del 17, le soglie del 19, la produzione in sola lettura,
  e il canale e il ciclo decisi con il proprietario.
- **Artefatto**: raccolta con storia; allerte per soglia e per scostamento; il rapporto ciclico
  generato da solo; `docs/MONITORING.md`; la routine di lettura nel patto.
- **Cancello**: un'allerta provocata è arrivata al canale; il primo rapporto ha ogni scostamento
  con causa o proposta; nessuna soglia è salita senza una ragione scritta.
- **Chi decide**: il proprietario decide il canale, il ciclo e quale scostamento si affronta
  adesso; l'agente monta e propone.
- **Fallimento che evita**: il tetto che si è dovuto stringere a ciò che era stato misurato
  [Ref. 37](REFERENCIAS.md#ref-37); la quota che si è bruciata senza che nessuno guardasse
  [Ref. 39](REFERENCIAS.md#ref-39).
- **Contratto**: `peldanos/peldano-20-monitoreo-de-recursos-y-rendimiento.md`.

### Passo 21 — Monitoraggio degli errori e rapporto ciclico: nessun errore senza voce in sospeso

Un sistema in produzione produce errori che nessuno segnala. Questo gradino li cattura nei tre
posti dove si nascondono (il backend, i processi, il browser dell'utente), li raggruppa, avvisa di
quelli nuovi e di quelli che crescono, e produce un rapporto ciclico. Due regole: nessun errore
senza voce in sospeso, e non esiste l'"errore noto" senza una voce in sospeso che dica perché si
tollera e fino a quando.

- **Intenzione**: che nessun errore in produzione passi inosservato, e che ciascuno si chiuda con
  il test che lo riproduce in rosso.
- **Quando**: si monta nella settimana del primo deployment, insieme al 20; da allora gira da
  solo, con allerte sul momento e rapporto ciclico. In un legacy, gli errori che esistevano già il
  primo giorno diventano voci in sospeso con la loro marca di velocità.
- **Input**: i registri del 16, la tabella dei lucchetti (12), la produzione con il browser
  incluso, il canale e il ciclo del 20.
- **Artefatto**: cattura centralizzata e raggruppata, senza dati personali; allerte per errore
  nuovo, ricorrente che cresce e con conseguenza; il rapporto ciclico con il tasso di errore per
  flusso; `docs/MONITORING.md`; la routine nel patto.
- **Cancello**: un errore provocato nel browser seguito fino al rapporto; nessun errore ricorrente
  senza voce in sospeso né ragione con data.
- **Chi decide**: il proprietario legge il rapporto e decide cosa si affronta; l'agente cattura,
  raggruppa e propone.
- **Fallimento che evita**: l'errore di autenticazione riportato come successo
  [Ref. 43](REFERENCIAS.md#ref-43); i quattro giri fino alla causa radice per non avere l'errore
  riprodotto [Ref. 22](REFERENCIAS.md#ref-22).
- **Contratto**: `peldanos/peldano-21-monitoreo-de-errores.md`.

## Parte D — Come si esegue, quanto si esige, e con quale strumento

### Come si esegue ogni gradino: il contratto

La scheda in otto parti dice cosa cerca ogni gradino, quando si sale e cosa lascia. Ma un gradino
si capisce davvero solo quando si vede **come si chiede, cosa deve tornare e come so che è
tornato completo**. Per questo ogni gradino ha, oltre alla scheda, un **contratto** in un file
proprio dentro `peldanos/`, sempre con le stesse cinque sezioni:

1. **Contesto richiesto**, nominato in forma generica ("rilevazione dei dati di volumetria",
   "accesso in lettura al sistema precedente", "la lista delle azioni con conseguenza reale"),
   senza scendere nel dettaglio dell'ingegneria dei sistemi. Le rilevazioni sono per natura
   incomplete; non cerco di renderle complete con un modulo.
2. **Prompt**, quelli che si danno al modello, testuali. Quello iniziale e, quando il gradino è
   una conversazione, quello di chiusura. Tutti portano la stessa clausola, che è il cuore della
   faccenda: *il modello valuta se il contesto basta; se non basta, chiede tutto ciò che manca
   prima di proseguire; e non stima né inventa un dato che solo il business ha*. Chi sa cosa gli
   manca per calcolare è il modello, non un modulo. E ogni prompt è preceduto da un blocco che
   dice **"Prima di inviare il prompt"**: i file e gli input che tu (o il business con te) devi
   aver costruito prima di incollarlo, con il loro nome, il loro contenuto e lo stato minimo
   accettabile. Il prompt li nomina, il blocco ti dice come devono essere fatti; senza quel
   blocco, il prompt menziona file che nessuno ti ha detto come scrivere.
3. **Risultato atteso**: le caratteristiche dettagliate dell'artefatto.
4. **Verifica di completezza**: la lista dei controlli che il proprietario fa sull'artefatto,
   **senza leggere codice**. Se uno dà "no", il gradino non è salito.
5. **Segnali d'allarme**: due o tre sintomi che il gradino è stato salito male anche se sembra
   salito.

E nell'intestazione di ogni contratto: la fase, il quando, la forma e la dimensione (se è
obbligatorio in ogni progetto o proporzionale).

**I prompt sono in inglese, e ciascuno porta la sua traduzione.** È una decisione che ho preso per
tre ragioni: lo stesso contenuto in spagnolo occupa tra il 30 e il 50 % di token in più; la
capacità di seguire istruzioni dei modelli è calibrata meglio in inglese, quindi un prompt in
inglese tollera meglio la brevità senza diventare ambiguo; e il vocabolario del mestiere (test,
commit, rollback, mock) è inglese. Ma non voglio che l'inglese sia una barriera per leggere il
metodo: sotto ogni prompt va la spiegazione di cosa sto chiedendo e perché ogni clausola è lì, e
nella versione HTML c'è un pulsante che mostra il prompt tradotto nella lingua del documento. Il
prompt che si incolla al modello è l'inglese; la traduzione è perché tu lo capisca. E tutti
terminano con "Reply in my language", perché il prompt è in inglese ma la conversazione non ha
motivo di esserlo.

### Cosa è obbligatorio e cosa è proporzionale, secondo la dimensione del progetto

Una domanda che compare subito: "tutto questo per un sistema piccolo?". La risposta è che ventidue
gradini non sono ventidue settimane; diversi si salgono in un'ora, e quelli che sono proporzionali
si rimpiccioliscono con il progetto. Ciò che non si rimpicciolisce è la lista di quelli che non si
negoziano. Questa tabella è una proposta `[ipotesi]` da confermare con il primo progetto che userà
il metodo end to end:

| Gradino | Progetto piccolo (un proprietario, pochi utenti, senza soldi in gioco) | Progetto con utenti e conseguenze |
|---|---|---|
| 0 Idoneità | obbligatorio (un'ora) | obbligatorio |
| 1 Patto | obbligatorio (mezz'ora) | obbligatorio |
| 2 Definizione | obbligatorio, cinquanta righe bastano | obbligatorio |
| 3 Dimensionare | obbligatorio, mezza pagina e una decisione | obbligatorio, completo |
| 4 Scheletro | obbligatorio se avrà utenti | obbligatorio |
| 5 Voci in sospeso | obbligatorio | obbligatorio |
| 6 Decisioni | obbligatorio | obbligatorio |
| 7 Test in rosso | obbligatorio | obbligatorio |
| 8 Simmetria | la regola sì; la mappa, opzionale | obbligatorio con mappa |
| 9 Misurare | proporzionale: contare e annotare | obbligatorio, con misuratori e budget |
| 10 Verifica onesta | obbligatorio | obbligatorio |
| 11 Audit | uno, prima della produzione | periodico |
| 12 Fail-closed | opzionale se è in sola lettura | obbligatorio |
| 13 Integrazione e deployment | minimo: test da soli, configurazione fuori, rollback | obbligatorio, completo |
| 14 Documentazione | minimo: ripristino | i tre manuali |
| 15 Residente e retrospettiva | retrospettiva di una pagina | entrambi |
| 16 Osservabilità e tracciabilità | minimo: registri strutturati con livello configurabile e un identificatore per azione | obbligatorio, completo, con audit immutabile |
| 17 Persistenza | proporzionale: gli indici delle query reali e la fine dei cicli N+1 | obbligatorio, con budget per percorso |
| 18 Vulnerabilità | obbligatorio: dipendenze e segreti nella catena | obbligatorio, i quattro strati e con un calendario |
| 19 Rendimento | proporzionale: un'esecuzione al volume atteso e una al "per dieci" | obbligatorio, con punto di rottura e soglie |
| 20 Monitoraggio delle risorse | minimo: un rapporto mensile e due allerte (disco, database) | obbligatorio, con soglie per funzione e rapporto settimanale |
| 21 Monitoraggio degli errori | obbligatorio: cattura centralizzata e rapporto | obbligatorio, con allerte sul momento |

In sintesi: ci sono undici gradini che non si negoziano in nessun progetto (0, 1, 2, 3, 5, 6, 7,
10, la retrospettiva del 15, la scansione delle dipendenze del 18 e la cattura degli errori del
21), e undici che si dimensionano con il progetto.

### Come si usa con qualunque strumento

Il metodo è neutrale rispetto allo strumento; ciò che cambia tra uno e l'altro è **dove si mette
ogni artefatto** perché il modello lo legga. La corrispondenza, per gli strumenti più usati a fine
2026:

| Artefatto del metodo | Claude Code | Cursor | Codex CLI / Gemini CLI | Forge |
|---|---|---|---|---|
| Patto di convivenza (P1) e routine (P5, P6, P7, P8, P10, P14) | `CLAUDE.md` del progetto | `.cursor/rules/` | `AGENTS.md` / `GEMINI.md` | dottrine iniettate per cancello |
| Definizione del progetto (P2) | `CLAUDE.md` + `docs/STATUS.md` | uguale, in regole e docs | uguale | `PROJECT.md` + file di contesto |
| Registro delle voci in sospeso (P5) | `docs/PENDING.md` o issue | uguale | uguale | registro delle voci in sospeso nativo con verbi |
| Prompt di gradino (tutti) | si incollano nella chat quando si sale il gradino | uguale | uguale | si iniettano all'attraversamento del cancello |
| Cancelli (P4) | `docs/GATES.md`, manuale | uguale | uguale | da G1 a G9, automatici |
| Misuratori e budget (P9) | script nel repo con test | uguale | uguale | uguale, più il cricchetto statico |

La colonna di Forge è quella che automatizza di più; le altre tre funzionano altrettanto bene se
il proprietario fa a mano ciò che Forge fa da solo: incollare il prompt del gradino nel momento
giusto ed esigere la verifica di completezza prima di passare al successivo. Questa è, di fatto,
la pratica del corso.

---

## Parte E — Ciò che manca da elaborare

1. **Il gradino 0 completo**: i pesi dei criteri che pesano, la soglia, e altri progetti rifiutati
   come controesempi. Ho X1 e X2; manca il resto.
2. **Un nome memorabile per ogni gradino**, in una frase, per i manuali e le pubblicazioni.
3. **L'esportazione in Forge**: quali gradini sono già cancelli o comandi e quali mancano per
   poter eseguire la scala come flusso di esecuzione.
4. **Provare i contratti in un progetto reale end to end.** I prompt dei ventidue contratti sono
   scritti a partire da ciò che ho fatto, non eseguiti tali e quali. Il primo progetto che li
   userà per intero ne correggerà diversi; fa parte del gradino 15.
5. **La prima coorte del corso**, che correggerà i tempi della linea del tempo e gli errori
   tipici, che oggi sono scritti a partire dai miei progetti e non dagli allievi.
6. **Il percorso evolutivo-correttivo provato su un legacy reale da un capo all'altro.** Le otto
   stazioni sono scritte a partire da ciò che ho fatto in sistemi altrui in modalità diagnostica e
   dai gradini riordinati, non da una normalizzazione completa eseguita con quei prompt.
7. **Ciò che NON è nella scala e dovrebbe esserci** `[ipotesi]`: la gestione del costo di token e
   quote come budget esplicito (oggi è reattiva); la rotazione dei segreti come routine e non come
   incidente; e un criterio per quando l'umano SÌ deve guardare il codice, perché oggi la risposta
   è "mai" e sospetto che ci siano momenti puntuali in cui conviene.

---

## Glossario

Ogni sigla, ogni nome proprio e ogni espressione colloquiale che compare in questo documento,
spiegata. In ordine alfabetico. Alcune voci sono termini che compaiono in nomi di file o messaggi
di commit dei repository di origine; le mantengo perché la prova si possa seguire.

**A suon di colpi** — Imparare qualcosa perché è andata male, non perché qualcuno l'ha spiegato
prima. Lo uso nel senso di "queste regole si sono imparate a suon di colpi", e in questo documento
chiarisco che non è tutta la verità: i principi li portavo da prima; i colpi hanno mostrato dove
il modello non li applica.

**Agente** — Un programma di intelligenza artificiale che non si limita a rispondere a domande ma
esegue azioni: legge file, scrive codice, esegue comandi, fa commit. In questo documento,
"l'agente" è Claude Code o lo strumento che usi.

**Allerta** — Un avviso automatico, sul momento, del fatto che un numero è uscito dal range (una
soglia superata, un errore nuovo). Regola del metodo: un'allerta che scatta e nessuno legge è un
difetto dell'allerta, e si aggiusta o si elimina.

**Analisi statica** — Leggere il codice a macchina, senza eseguirlo, cercando schemi pericolosi
noti (un'injection, una chiave scritta nel codice). È uno dei quattro strati della scansione
delle vulnerabilità del gradino 18.

**Anonimizzazione** — In questo documento i clienti reali si chiamano "la Mutua",
"l'Autorizzatore" e "l'Associazione", e i loro sistemi "Autorizzazioni" e "Kikan". È apposta: i
nomi restano riservati finché non avrò il permesso di usarli.

**Anti-pattern** — Un modo di fare le cose che sembra ragionevole ma che si sa che finisce male.
Il contrario di un "pattern" (una buona pratica comprovata).

**Albero semantico** — La mappa del sistema in forma di albero: il sistema alla radice; sotto, i
domini; sotto, attori, processi, entità con i loro stati, schermate e integrazioni; e da ogni nodo
pendono le voci in sospeso e le decisioni che lo toccano. Lo costruisce l'agente, lo correggi tu,
ed è ciò che l'agente legge prima di toccare codice. Vedi B.5.

**Stringere il tetto** — Abbassare un limite (un budget, un massimo consentito) finché resti
appena sopra il misurato, perché qualunque peggioramento faccia fallire un test.

**Approvatore automatico** — In Autorizzazioni, il robot che approva ordini automaticamente
secondo regole. Prima è girato in "modalità di prova" (vedi dry-run) prima di lasciarlo agire.

**Artefatto** — Qualcosa di concreto che viene prodotto: un file, un test, uno script, un
documento. Nella scala, ogni gradino lascia un artefatto.

**Asincrono / sincrono (async / sync)** — Una chiamata sincrona aspetta il risultato prima di
proseguire; una asincrona lascia il compito in corso e prosegue, e poi raccoglie il risultato. I
database reali in Node sono asincroni; per questo l'interfaccia deve esserlo dall'inizio.

**Autoscoperta** — Nel percorso evolutivo-correttivo, il modo di ottenere gli input che nessuno ha
scritto: l'agente li recupera leggendo il sistema stesso (il codice, lo schema del database, la
configurazione, i log, la documentazione che c'è) e marca ogni affermazione con la sua fonte
(`[codice]`, `[base]`, `[configurazione]`, `[documentazione]`, `[dedotto]`, e `[business]` per ciò
che il proprietario ha confermato). Ciò che non si può leggere si marca come lacuna, non si
riempie.

**Associazione (l')** — Così chiamo in questo documento il cliente del sistema Kikan (il suo nome
reale resta riservato): un'associazione civile che assiste famiglie e aveva bisogno di uno
sportello omnicanale e di campagne.

**AUD-*** — La serie di audit numerati che si sono fatti in Kikan ad agosto, e che hanno generato
voci in sospeso.

**Autorizzatore (l')** — Così chiamo il sistema della Mutua che riceve gli ordini e restituisce un
verdetto (approvata, respinta). Per noi funziona da "oracolo": la verità contro cui si verificano
i contatori.

**Autorizzazioni** — Nome con cui chiamo il primo sistema in produzione (quello reale resta
riservato): automazione della gestione degli ordini della Mutua per un ente sanitario, con un
umano nel circuito.

**await** — In JavaScript, la parola che indica "aspetta il risultato di questa chiamata
asincrona". Una chiamata al database senza `await` è un bug silenzioso: il codice prosegue prima
di avere il dato.

**Backend** — La parte del sistema che non si vede: il server, la logica, il database. Il
contrario di "frontend" (la schermata).

**Batteria (di test)** — L'insieme completo dei test di un progetto, eseguiti tutti insieme.

**Blocco funzionale** — Un insieme di tra quattro e otto voci in sospeso correlate che insieme
fanno qualcosa che il business può usare. È l'unità di lavoro del ciclo; dura tra una e due
settimane in un progetto piccolo.

**Cassaforte (vault)** — Un luogo cifrato in cui si conservano segreti (chiavi, password) invece
di lasciarli in file di testo.

**Lucchetto** — Una protezione che impedisce che un'azione pericolosa avvenga senza una condizione
esplicita. Per esempio, il pulsante di emergenza ha un lucchetto dedicato: non si può premere per
sbaglio.

**Ciclo N+1** — Un errore di persistenza molto comune: per mostrare cento elementi, il sistema fa
una query per la lista e poi altre cento, una per elemento, invece di una o due. Si rileva
contando le query (gradino 9) e si corregge nel gradino 17.

**Header di sicurezza** — Istruzioni che il server manda al browser in ogni risposta per
proteggerlo (non incorporare la pagina in un altro sito, usare solo cifratura, ecc.). Se mancano,
la scansione del gradino 18 li riporta.

**Qualità operativa (fase)** — La quarta fase della scala, gradini da 16 a 21: quattro che si
salgono prima del primo deployment in produzione (osservabilità, persistenza, vulnerabilità,
rendimento) e due che sorvegliano il sistema una volta distribuito (monitoraggio delle risorse e
degli errori).

**Percorso evolutivo-correttivo** — Il terzo caso d'uso del metodo: prendere un sistema che esiste
già e non è nato con il metodo, normalizzarlo senza riscriverlo (otto stazioni, da N0 a N7) e solo
dopo salire la scala in modalità correttiva (sistemare ciò che non funziona) o evolutiva
(aggiungere ciò che manca). Ha una pagina propria.

**Caratterizzazione (test di)** — Un test che cattura ciò che il sistema fa oggi, esattamente come
lo fa, difetti inclusi; non ciò che dovrebbe fare. Nasce in verde, e la prova che serve è che va
in rosso quando si rompe il flusso di proposito (una mutazione). È la batteria che protegge un
legacy mentre lo si cambia. Il termine viene dalla letteratura sul codice ereditato; io lo uso
tale e quale.

**Causa radice** — Il motivo reale di un problema, in opposizione al sintomo. Correggere il
sintomo fa tornare il problema; correggere la causa radice, no.

**CI (integrazione continua)** — Un servizio (qui, GitHub Actions) che esegue i test
automaticamente ogni volta che si carica codice. CI/CD aggiunge il deployment automatico.

**Cintura di sicurezza** — Nel percorso evolutivo-correttivo, ciò che deve esistere attorno a un
legacy prima di cambiargli una riga: un ambiente di test con dati anonimizzati, un deployment che
si ripete, i segreti fuori dal codice e ruotati, l'integrazione continua che esegue quel che c'è,
e la batteria di caratterizzazione. È un cancello duro, con una sola eccezione scritta (l'urgenza
in produzione).

**CLAUDE.md / PROJECT.md** — Il file che l'agente legge all'inizio di ogni sessione per sapere
cos'è il progetto e come lavorarci.

**Claude Code** — Lo strumento di Anthropic con cui ho lavorato a questi progetti e con cui ho
scritto questo documento: una sessione di un modello con accesso al repository, che legge,
scrive, esegue e fa commit.

**Commit** — Un punto salvato nella storia del codice, con un messaggio che spiega cosa è cambiato
e perché. Ogni commit ha un identificatore breve (per esempio `2219f7a`).

**Cancello (gate)** — Una condizione che deve essere soddisfatta per poter avanzare. Se non si
soddisfa, non si passa. In Forge sono numerati da G1 a G9.

**Concorrenza** — Quante cose succedono contemporaneamente nel sistema (utenti simultanei,
processi in parallelo).

**CORS** — Un meccanismo di sicurezza dei browser che decide da quali domini si può chiamare un
server. Mal configurato, blocca chiamate legittime con errori confusi.

**Criteri di accettazione** — Le condizioni, scritte nella forma "dato tale situazione, quando
succede tale cosa, allora si vede tale risultato", che definiscono quando un requisito è
soddisfatto. Nel metodo sono il "come si verifica" di ogni voce in sospeso e il copione del test
end to end.

**CVE** — Un identificatore pubblico di una vulnerabilità di sicurezza nota in un componente
software.

**Debito tecnico** — Ciò che resta fatto male "da sistemare dopo". Il metodo lo vieta: ciò che si
rompe si corregge alla radice nella stessa sessione.

**Discrepanza** — Nella lettura di un sistema ereditato, un punto in cui non coincidono il codice,
il database, la documentazione e ciò che il business crede che il sistema faccia. Si elenca con la
prova di ciascun lato e la decide il proprietario, una per una: a volte il sistema è sbagliato, e
a volte il business aveva dimenticato una regola che il codice ricordava.

**Dottrina** — In Forge, un documento breve che fissa come si fa qualcosa (come si testa, come si
verifica, come si dimensiona). È la forma che il metodo prende dentro lo strumento.

**Driver (criterio)** — Un fattore che spinge una decisione in un senso o nell'altro. Nel gradino
0, i driver sono i fattori che decidono se un progetto è idoneo.

**Dry-run (modalità di prova)** — Eseguire un processo "a secco": fa tutto tranne l'azione finale.
L'approvatore automatico è girato così all'inizio, mostrando cosa avrebbe approvato senza
approvare nulla.

**Incorporato (embed)** — Forge installato dentro il sistema del cliente, come assistente
residente, con permessi limitati.

**End to end (E2E, da un capo all'altro)** — Provare il sistema completo, dalla schermata fino al
database, come lo userebbe una persona.

**Ambiente** — Un'installazione separata del sistema. Quelli abituali: sviluppo (la macchina del
programmatore), UAT (test del cliente) e PROD (produzione, quella vera).

**Specifica dei requisiti** — Nel metodo classico, un documento lungo che descriveva tutto ciò che
il sistema doveva fare. In questo metodo si scompone: ogni voce in sospeso porta la sua specifica
dettagliata completa, e la somma delle voci in sospeso è la specifica del sistema. Vedi B.5.

**Stazione (da N0 a N7)** — Ciascuno degli otto passi del tratto di normalizzazione del percorso
evolutivo-correttivo. Le chiamo stazioni e non gradini perché non si confondano con i ventidue
della scala: non sono gradini nuovi, sono quelli dell'avvio (e l'8, l'11 e il 12) in un altro
ordine e con un altro ingresso.

**Scheletro (scaffold)** — La struttura iniziale di un progetto, senza funzionalità: parte, ha
test vuoti, si distribuisce.

**Eccezione non gestita** — Un errore che il codice non aveva previsto e che interrompe ciò che
stava facendo. Il gradino 21 le cattura tutte, nel backend, nei processi e nel browser.

**Fail-closed** — "Fallisce chiuso": davanti al dubbio o all'errore, il sistema non agisce. Il
contrario di "fail-open", che davanti al dubbio va avanti.

**Fallback (al legacy)** — Tornare a un percorso vecchio quando il nuovo fallisce. Il metodo lo
vieta: se c'è un sistema vecchio, si sottopone ad audit e si migra; non si lascia come rete di
sicurezza silenziosa.

**Fixture** — Dati di test che si caricano prima di eseguire un test o un deployment.

**Flip (interruttore)** — Una modifica di configurazione che sceglie tra due percorsi (per
esempio, il motore vecchio o quello nuovo) senza toccare codice.

**Forge (Yujin Forge)** — Lo strumento che ho costruito: uno strato sopra Claude Code che gli
aggiunge il metodo (dottrine, cancelli, voci in sospeso, un pannello di chat, un'app mobile, e la
modalità incorporata).

**Frontend** — La parte visibile del sistema: le schermate.

**Full scan** — Una query al database che legge l'intera tabella perché non ha un indice che la
aiuti. Con tabelle piccole non si nota; con milioni di righe, butta giù il sistema.

**G-DOC** — In Forge, il cancello che esige che la documentazione si aggiorni nello stesso commit
della modifica.

**gate-ci** — Il job del deployment di Kikan che aspetta che l'integrazione continua finisca in
verde prima di impacchettare.

**GCP** — Google Cloud Platform, il cloud in cui girano i server dei due sistemi
dell'Associazione.

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
perso di vista.

**Indice** — Una struttura ausiliaria del database che rende veloce una ricerca. Senza indice, la
query è un full scan.

**Identificatore di correlazione** — Un numero unico che si dà a ogni azione quando comincia (un
clic, un processo notturno, un messaggio che arriva) e che viaggia attaccato a tutto ciò che
quell'azione provoca, fino al database e alle chiamate esterne. Cercando quel numero nei registri
compare la storia completa dell'azione. È il centro del gradino 16.

**Indice (di database)** — Come l'indice di un libro: una struttura che il database mantiene per
trovare righe senza leggere l'intera tabella. Senza indice, la query fa un *full scan*. Gli indici
si derivano dalle query reali, non si indovinano (gradino 17).

**Acquisizione dei requisiti** — Il momento in cui la richiesta del business entra nel metodo:
prima in prosa, con il proprietario, e poi trasformata in voci in sospeso verificabili
dall'agente, che chiede ciò che manca.

**Injection** — Una vulnerabilità in cui ciò che un utente scrive in un modulo finisce
interpretato dal sistema come un ordine (per esempio, una query al database). L'analisi statica
del gradino 18 la cerca; il test in rosso della correzione dimostra che non succede più.

**IPC (guinzaglio tra processi)** — Un canale tra due processi. In Forge si è usato come
"guinzaglio": se il processo padre muore, il figlio lo viene a sapere e si spegne.

**JSON (storage in)** — Conservare i dati in file di testo in formato JSON invece che in un
database. Serve per cominciare; non serve per milioni di righe.

**Kikan** — Il sistema di sportello omnicanale e campagne dell'Associazione, il secondo sistema in
produzione.

**Latenza** — Quanto ci mette un'azione a rispondere. Si guardano la mediana (metà delle azioni
ci ha messo meno) e il percentile 95 (il 95 % ci ha messo meno; il restante 5 % sono gli utenti
che si lamentano). Gradini 19 e 20.

**Legacy (ereditato)** — Un sistema vecchio ancora in uso.

**Linea base** — Ciò che un numero dava normalmente (per esempio, la media degli ultimi
quattordici giorni). "Fuori range" nel gradino 20 è sopra una soglia fissa o molto diverso dalla
linea base.

**Linea del tempo** — La Parte B di questo documento: quando si sale ogni gradino e quali compiti
di infrastruttura, acquisizione, sviluppo, test e sguardo umano succedono nel mezzo.

**Log** — Il registro di ciò che un programma va facendo. "Valida con il log" significa: non
fidarti di ciò che l'agente dice di aver fatto, guarda il registro.

**MariaDB** — Il motore di database SQL che Kikan usa in produzione.

**Misuratore con guardia** — Uno script che misura qualcosa (quante query, quanti cicli) e che ha
un test proprio che verifica che il misuratore misuri bene. "Con guardia" vuol dire "protetto da
un test".

**Mentire (un misuratore)** — Quando uno strumento restituisce un numero sbagliato perché non vede
parte di ciò che deve misurare. Ci è successo due volte.

**Mese tre** — Espressione mia per il momento in cui un sistema costruito in fretta comincia a
mostrare i suoi problemi: quando ha già dati veri e utenti veri.

**Mock (simulare)** — Sostituire una parte reale del sistema con una simulazione durante un test.
"Non simulare se stesso" significa non simulare proprio la parte che si vuole provare.

**Mutazione (rosso per)** — Il modo di dimostrare che un test di caratterizzazione sorveglia
qualcosa: rompere il flusso di proposito con una modifica temporanea, vedere il test in rosso,
annullare, vedere il verde. Un test di caratterizzazione senza il suo rosso per mutazione è un
test che passa perché non guarda nulla.

**NAC3** — Il protocollo di Forge che fa sì che le schermate di un'applicazione si possano operare
da programma (ogni elemento dell'interfaccia ha un identificatore e dei metodi). Permette il test
end to end. Non è obbligatorio per il metodo: è il mezzo, non la condizione.

**Livello di registro** — Quanto dettaglio il sistema scrive nei suoi registri: errore (solo ciò
che è fallito), avviso, informazione (il normale in produzione), debug e traccia. Nel metodo il
livello si cambia per configurazione, per ambiente, senza rifare il deployment (gradino 16).

**Node (Node 22)** — L'ambiente in cui gira il JavaScript del server. "Node 22 fisso" vuol dire
che la versione è stata inchiodata perché tutti gli ambienti usino la stessa.

**Normalizzazione** — Portare un sistema che non è nato con il metodo allo stato che il metodo dà
per scontato quando si apre il ciclo, senza toccarne la funzionalità. Si fa a due velocità: la
cintura di sicurezza prima di qualunque modifica, e il resto del debito **man mano che si tocca**
ogni modulo (le voci in sospeso di normalizzazione marcate "si paga quando si tocca" entrano con
il blocco che entra nel loro modulo). Mai "una settimana di pulizia generale".

**Osservabilità** — Che il sistema si possa vedere mentre gira: registri strutturati con livello
configurabile, un identificatore di correlazione per azione, metriche di salute. Senza
osservabilità, ogni incidente si diagnostica con ipotesi invece che con prove. Gradino 16.

**Mutua (la)** — Così chiamo l'ente sanitario cliente del primo sistema in produzione (il suo
nome reale resta riservato).

**Oracolo** — Una fonte di verità esterna contro cui si può verificare un risultato.

**P0, P1, P2** — Livelli di priorità di un rilievo: P0 è ciò che va risolto subito.

**Pilota automatico** — Un mandato scritto perché l'agente lavori da solo per ore (24 o 48)
facendo commit e push senza chiedere, e consegni un riassunto alla fine.

**Sovrascrivere (una configurazione)** — Scrivere sopra qualcosa per sbaglio.

**Lavagna (la bacheca)** — La bacheca condivisa di Forge in cui l'agente lascia rapporti perché io
li legga.

**Playwright** — Uno strumento che controlla un browser da programma per provare schermate come
farebbe una persona.

**PND (voce in sospeso)** — Una voce numerata della coda di lavoro (PND-001, PND-002…). In questo
metodo, le voci in sospeso SONO il piano, ciascuna porta la sua specifica dettagliata, e le voci
in sospeso chiuse sono la documentazione di ciò che è stato fatto.

**Paginazione** — Mostrare o elaborare i dati a porzioni (venti alla volta, mille alla volta)
invece che tutti insieme. Una delle correzioni tipiche del gradino 17.

**Percentile 95** — Il valore sotto il quale resta il 95 % delle misurazioni. In latenza: "il
95 % delle azioni ci ha messo meno di questo". È il numero che conta, perché la media nasconde
quelli che hanno aspettato molto.

**Pool di connessioni** — La quantità di "linee aperte" che il sistema mantiene con il database
nello stesso momento. Se si esaurisce, le azioni aspettano o falliscono; di solito è la prima
cosa che si rompe in una prova di carico.

**Voce in sospeso chiusa (documentazione del fatto)** — Una voce in sospeso che alla chiusura
conserva la sua specifica, la decisione che l'ha originata, la prova con cui è stata chiusa, il
commit e la data. La coda delle voci in sospeso chiuse è lo storico funzionale del sistema.

**Budget di query** — Il massimo di query al database che un percorso dell'applicazione può fare,
misurato e protetto da un test.

**Provato in rosso** — Un test di cui si è dimostrato che FALLISCE contro il codice vecchio prima
che la correzione lo metta in verde.

**PROD (produzione)** — L'ambiente vero, quello che usa il cliente.

**Promozione (UAT → PROD)** — Passare qualcosa dall'ambiente di test a quello di produzione in
modo controllato.

**Prova di carico** — Un programma, conservato nel repository e con il suo test, che simula molti
utenti che usano il sistema contemporaneamente per misurare rendimento, latenza ed errori, e per
trovare il punto di rottura. Gradino 19.

**Test di accettazione** — Le prove che fa il proprietario, o un utente di fiducia, usando il
sistema come lo userebbe davvero, prima di accettarlo per la produzione. Sono umane; non le fa
l'agente.

**Punto di rottura** — Il carico esatto al quale qualcosa del sistema smette di funzionare, e
cos'è quel qualcosa (le connessioni al database, la memoria, una coda). Si trova alzando il
carico scalino per scalino (gradino 19), e da lì escono le soglie di allerta del 20.

**Pull / push** — Scaricare e caricare codice sul repository remoto (GitHub).

**Ref. N** — Una referenza breve a un caso reale, spiegato nel documento delle referenze con la
sua data e la sua prova. Serve perché le procedure restino pulite e il dettaglio resti
disponibile.

**Registro (log) strutturato** — Una riga che il sistema scrive ogni volta che fa qualcosa, con
sempre le stesse parti nello stesso ordine (data e ora, livello, modulo, identificatore di
correlazione, attore, messaggio), perché si possa cercare a macchina. Gradino 16.

**Rendimento (throughput)** — Quante azioni al secondo regge il sistema. Si misura con la prova
di carico (19) e si sorveglia nel monitoraggio (20).

**Rapporto ciclico** — Il riassunto che il monitoraggio (20 e 21) genera da solo ogni settimana o
ogni mese, con gli scostamenti e gli errori del periodo, e che il proprietario legge con l'agente
per decidere cosa diventa voce in sospeso. Il contrario di un'allerta: si legge con calma.

**Regressione** — Un test che verifica che qualcosa che già funzionava continui a funzionare dopo
una modifica.

**Repository (repo)** — Il luogo in cui vive il codice con tutta la sua storia. "Repo standard"
vuol dire uno gestito con Git e con una struttura riconoscibile.

**Conservazione (retention)** — Quanto tempo si conservano i dati di ogni tabella prima di
cancellarli.

**Rollback** — Tornare alla versione precedente quando un deployment va male.

**RPAForce** — Il mio marchio, sotto cui si consegnano questi sistemi.

**Runbook** — Una procedura operativa scritta passo per passo. "Idempotente" vuol dire che si può
eseguire due volte senza rompere nulla.

**Seminatore (seeder)** — Uno script che carica dati di test in un ambiente.

**Shift left** — Spostare i test più presto nel processo di sviluppo.

**Smell (odore)** — Un segnale che qualcosa non va nel codice, prima che fallisca.

**SQ (standard di qualità)** — Il patto di convivenza tra umano e agente in Forge.

**SQL** — Il linguaggio dei database relazionali.

**Tasso di errore per flusso** — Su cento volte che qualcuno ha usato un flusso (caricare un
appuntamento), quante sono fallite. È il numero del rapporto degli errori (21) che il
proprietario capisce senza spiegazioni.

**Tag** — Un'etichetta su un commit che segna una versione.

**TDD** — "Prima il test, poi il codice". Il metodo lo lascia come opzione per perimetri piccoli,
non come regola universale.

**Token** — Due sensi. Nell'IA: l'unità con cui si misura (e si fattura) il testo che il modello
elabora. Nella sicurezza: una credenziale di accesso.

**Fase** — Ciascuno dei quattro gruppi di gradini: avvio (da 0 a 4), ciclo (da 5 a 10),
esercizio (da 11 a 15) e qualità operativa (da 16 a 21).

**Tracciabilità** — Due sensi, entrambi nel metodo. Nei requisiti: poter seguire un requisito
fino alla voce in sospeso che lo implementa, al test che lo prova e al commit che l'ha chiuso; non
è una matrice a parte, è la voce in sospeso stessa. Nell'esercizio (gradino 16): che ogni azione
con conseguenza lasci una traccia di chi, quando, cosa, da dove e con quale risultato, in un audit
che l'applicazione non può modificare, e che un identificatore di correlazione permetta di seguire
qualunque azione dalla schermata al database.

**Cricchetto** — Un meccanismo che gira solo in un senso. In Kikan, un contatore di chiamate senza
`await` che può solo scendere: se sale, il test fallisce.

**Turno** — Un giro della conversazione con l'agente: l'utente chiede, l'agente lavora e risponde.

**UAT** — L'ambiente in cui il cliente prova prima della produzione.

**Soglia** — Un numero limite a partire dal quale il monitoraggio avvisa. Nel metodo non si mette
"a occhio": esce dal punto di rottura (19) con un margine, e non si alza per far tacere
un'allerta senza una ragione misurata e scritta (20).

**Urazuke** (裏付け) — Il nome del metodo. In giapponese, il sostegno di cui dispone
un'affermazione, ciò che la regge da dietro; *urazukeru*, sostenere con prove. Si pronuncia
u-ra-ZU-ke. Non si traduce.

**Vibecoding / vibecoder** — Costruire software conversando con un'IA, descrivendo ciò che si
vuole, invece di scrivere il codice a mano. Un vibecoder è chi lo fa.

**Sentinella** — In Autorizzazioni, il processo che controlla periodicamente cosa è rimasto
bloccato e lo spinge, con guardie per non spingere due volte.

**Sguardo umano sulle schermate** — L'abitudine che il proprietario guardi una cattura reale di
ogni schermata nuova o modificata, nell'ambiente di test, con ogni voce in sospeso che la tocca.
Dieci secondi che trovano ciò che nessun test trova.

**Vulnerabilità** — Un difetto che qualcuno può usare per entrare, rubare dati o far fare al
sistema qualcosa che non dovrebbe. Quelle note in pezzi di software di altri si pubblicano con un
numero CVE. Il gradino 18 le cerca a macchina in quattro strati e le tratta come voci in sospeso.

**Volumetria** — Quanti dati il sistema gestirà: righe all'anno, utenti, picchi.

**Watchdog (sentinella del silenzio)** — Un processo che controlla se un altro continua a dare
segni di vita, e lo uccide se resta zitto troppo a lungo.

**Yujin** — L'ecosistema di cui Forge è il prodotto commerciale.
