# Urazuke — lo sviluppatore junior nell'era successiva alla programmazione a mano: cosa cambia nella sua formazione, con quale obiettivo formarlo e come

Autore: Pablo Kuschniroff, assistito da Claude Code. Versione 1, 18 ottobre 2026. Questo documento
accompagna il [documento principale](ESCALERA_METODOLOGICA.md) del metodo e le due parti del corso
([progetto nuovo](MANUAL_CURSO.md), [progetto ereditato](MANUAL_CURSO_EVOLUTIVO.md)). È scritto
per tre lettori: chi dirige una squadra e deve decidere cosa insegnare a chi entra; chi fa lezione
o mentoring; e il junior stesso, che vuole sapere in cosa diventare. Le parole strane sono nel
glossario del documento principale. Repository pubblico:
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## Perché scrivo questo

Per trent'anni, uno sviluppatore junior si è formato in un modo solo: scrivendo codice sotto
supervisione. Entrava sapendo un linguaggio a metà, gli davano compiti piccoli e circoscritti, un
senior gli revisionava il codice, e in due o tre anni di scrivere e farsi correggere imparava il
mestiere. Il codice era insieme il lavoro e la scuola.

Questo è finito, e non perché i junior non servano più, ma perché **il modello scrive il codice**.
Con il mio metodo, chi costruisce non legge il codice: esige prove. Allora la domanda che mi
fanno, e che mi faccio, è onesta e urgente: se il junior non scrive più il codice, come impara? E
cosa impara? E per diventare cosa?

Ho una risposta, e la scrivo da due posti. Uno, i tre sistemi che ho costruito così, in cui sono
stato l'unico umano e dove ho visto, incidente dopo incidente, quali abilità mi hanno salvato e
quali non mi sono servite. L'altro, gli anni passati a insegnare ingegneria dei sistemi prima che
i modelli esistessero: molto di ciò che oggi bisogna insegnare a un junior è ciò che l'ingegneria
dei sistemi classica ha sempre insegnato e che l'industria ha smesso di praticare quando il
mestiere è diventato "programmare". Il modello ci obbliga a tornare a ciò che il mestiere era
prima che la tastiera lo coprisse.

Un avvertimento per non farmi fraintendere: non sto dicendo che il junior non debba saper
programmare. Sto dicendo che **non si forma più programmando**, e che ciò che deve sapere di
programmazione cambia di natura: da mestiere ad alfabetizzazione.

## Cosa faceva un junior, e cosa fa adesso

| | Prima | Adesso, con il metodo |
|---|---|---|
| **Cosa produce** | Codice, sotto supervisione. | Prove: contratti, alberi semantici, voci in sospeso specificate, verifiche di completezza, decisioni scritte. Il codice lo produce il modello. |
| **Come impara** | Scrivendo e ricevendo correzioni sul codice. | Dirigendo il modello gradino per gradino e ricevendo correzioni sulle prove che ha preteso e su quelle che ha accettato senza pretendere. |
| **Cosa revisiona il senior** | Il suo codice. | Il suo criterio: cosa ha chiesto al modello, cosa ha supposto il modello senza che lui lo rilevasse, cosa ha accettato come "fatto" senza prova. |
| **Qual è il suo errore tipico** | Un bug. | Credere al modello. |
| **Quanto ci mette a essere utile** | Mesi, fino a scrivere codice che non vada riscritto. | Settimane, se entra dal metodo: il primo progetto piccolo con i ventidue gradini lo lascia operativo. |
| **In cosa diventa** | Un programmatore che sa più linguaggi e framework. | Qualcuno che può rispondere di un sistema senza averne scritto una riga: un ingegnere dei sistemi che dirige modelli. |

## L'impatto sui fuochi della formazione

Lo dico prima in una frase e poi lo smonto: **ciò che perde peso è tutto ciò che il modello fa
meglio di un junior di due anni, e ciò che guadagna peso è tutto ciò che il modello fa male e che
il metodo esiste per correggere**. Quella seconda lista non l'ho inventata: è la lista dei
fallimenti del documento delle referenze, guardata al contrario. Ogni fallimento del modello è
un'abilità che l'umano deve avere.

### I fuochi che perdono peso

- **La sintassi e i linguaggi.** Sapere un linguaggio "a memoria" era metà della formazione. Non
  più: il modello scrive in qualunque linguaggio, meglio e più in fretta. Ciò che resta è saperli
  *leggere*, che è un'altra cosa (vedi più avanti).
- **I framework e le librerie.** Conoscere l'API di una libreria era valore di mercato. Il modello
  la conosce tutta, con le sue versioni. Il junior deve sapere che esistono, a cosa servono e
  quando sceglierne una, non come si chiama ogni funzione.
- **La digitazione e la produttività di scrittura.** Scorciatoie dell'editor, completamento
  automatico, generare l'impalcatura a mano. È sparita come fuoco.
- **Il debug riga per riga come mestiere principale.** Continua a esistere, ma cambia di posto:
  adesso è l'ultimo strumento, quando la prova (il log, il test in rosso, il misuratore) non è
  bastata.
- **La memoria di "come si fa una certa cosa".** Pattern, ricette, trucchi. Il modello li ha
  tutti.

### I fuochi che guadagnano peso

Li ordino per il gradino in cui si esercitano, perché quello è il modo di insegnarli.

1. **Ingegneria dei requisiti** (gradini 0, 2, 3, 5). Intervistare un proprietario che non sa cosa
   vuole, scrivere in prosa cosa vuole, nominare i casi d'uso, costruire l'albero semantico del
   business, specificare una voce in sospeso con i suoi criteri di accettazione nella forma
   "dato, quando, allora", distinguere un dato primario da uno derivato e chiedere il primario
   invece di stimarlo. È l'abilità numero uno, ed è quella che l'industria ha smesso di insegnare
   vent'anni fa. Il modello è pessimo in questo per costruzione: riempie i buchi con ciò che è più
   probabile, e ciò che è più probabile non è ciò di cui il business ha bisogno.
2. **Progettazione della verifica** (gradini 7, 9, 10, 19). Non scrivere il test: sapere quale
   test dimostra cosa, perché un test deve vedersi in rosso prima di valere, cos'è una prova end
   to end e cos'è una simulazione che non prova niente, quale numero decide qualcosa e con quale
   strumento si misura, come si legge un rapporto e si distingue ciò che è verificato da ciò che è
   creduto. Il junior deve poter dire "quel test non prova ciò che dici" senza leggere il test.
3. **Lettura delle prove** (tutti i gradini). Leggere un rapporto del modello con diffidenza
   allenata: trovare l'affermazione senza prova, il "dovrebbe funzionare" travestito da
   verificato, il punto cieco non dichiarato, il "fatto" che non lo era
   [Ref. 43](REFERENCIAS.md#ref-43). Questa abilità non esisteva come fuoco di formazione perché
   non c'era nessuno che mentisse con tanta sicurezza e una scrittura così buona.
4. **Dimensionamento ed esercizio** (gradini 3, 4, 13, da 16 a 21). Cos'è un ambiente, come si fa
   un deployment, cos'è l'integrazione continua, cosa si misura in produzione, cos'è un indice, un
   punto di rottura, una soglia di allerta. Prima era territorio di un altro ruolo; adesso il
   junior dirige il modello che lo fa, e deve sapere cosa chiedergli e come verificare che lo
   abbia fatto.
5. **Sicurezza e conseguenza** (gradini 12, 18). Quali azioni del sistema agiscono sul mondo,
   cos'è un lucchetto, cos'è il fail-closed, cos'è una vulnerabilità e perché un aggiornamento di
   dipendenza è una modifica.
6. **Decisione e comunicazione con il proprietario** (gradini 1, 6, 14). Domandare bene, con
   raccomandazione e alternativa; scrivere una decisione con parole testuali, data e proprietario;
   scrivere un manuale che una persona che non programma possa seguire. Il junior è, nel metodo,
   il traduttore tra il proprietario e il modello, e la traduzione si fa nelle due direzioni.
7. **Inglese strumentale.** I prompt del metodo sono in inglese, perché i modelli seguono le
   istruzioni con più precisione in inglese. Non serve parlarlo; serve leggere un prompt e capire
   ogni clausola, e poter scrivere una clausola nuova quando il caso lo richiede.
8. **Il catalogo dei fallimenti del modello.** Riconoscere, dall'odore, ogni forma in cui il
   modello sbaglia: suppone invece di chiedere, inventa un dato primario, riporta più del dovuto,
   fa il "già che ci sono" fuori dal perimetro, rifattorizza ciò che non gli è stato chiesto,
   migliora le tue parole, chiude senza prove, resta in silenzio quando non sa. Le quattro
   correzioni che ho fatto in sessione e che sono diventate regole
   [Ref. 45](REFERENCIAS.md#ref-45) sono l'esempio: ciascuna è un fallimento che un junior formato
   deve rilevare al primo rapporto.
9. **Il costo come budget.** Token, quota di integrazione continua, tempo del proprietario. Il
   junior che non guarda il costo ripete la squadra multi-agente che spendeva il doppio e
   consegnava la metà [Ref. 6](REFERENCIAS.md#ref-6).

### Ciò che il junior deve comunque sapere di programmazione: alfabetizzazione, non mestiere

Qui c'è la sfumatura che mi importa di più, e quella che più si fraintende. Un junior che non ha
mai scritto codice non sa quando il modello mente *nel* codice, e il metodo ha un momento, che
oggi segno come ipotesi nel documento principale, in cui l'umano deve davvero guardare. Per questo
l'alfabetizzazione minima non è negoziabile. La lista:

- **Leggere codice**, non scriverlo: seguire una funzione, capire un condizionale, riconoscere un
  ciclo, vedere dove si fa una query al database. Come leggere un contratto senza essere avvocato.
- **Come gira un sistema**: cos'è un server, un processo, un database, una richiesta HTTP, un
  browser, un'attività pianificata. Dove vive ogni cosa.
- **Git**: cos'è un commit, un ramo, un push, una storia. Quanto basta per leggere la traccia di
  prove che il metodo lascia lì.
- **SQL di base**: leggere una query e capire quale tabella legge e con quale filtro. È la lingua
  dei dati, e dei numeri del gradino 9.
- **Il terminale**: eseguire un comando che il modello ti ha dato e leggerne l'output. Se il
  junior non può eseguire il misuratore, non può verificare il numero.
- **Il debug come ultimo strumento**: quando il log, il test e il misuratore non sono bastati,
  aprire il codice con il modello accanto e leggere insieme.

Si insegna in due o tre settimane, si pratica durante tutto il corso, e non è il mestiere: è
l'alfabetizzazione che permette di esercitarlo.

## Con quale obiettivo formare un junior

Lo dico senza giri di parole, perché dalla chiarezza dell'obiettivo dipende tutto il resto.
L'obiettivo di formare un junior nell'era successiva alla programmazione a mano è formare qualcuno
che **possa rispondere di un sistema in produzione senza averne scritto una riga di codice**: che
possa portare un progetto piccolo attraverso i ventidue gradini da un capo all'altro, dirigendo un
modello, esigendo prove a ogni passo, decidendo con il proprietario, e sapendo in ogni momento
cosa è verificato, cosa è creduto e cosa non si vede. Io lo chiamo, provvisoriamente, *proprietario
tecnico della prova*: quello che non legge il codice e tuttavia può dire, con le prove in mano, che
il sistema fa ciò che il business ha chiesto e continuerà a farlo domani.

Tre conseguenze dell'obiettivo, che ordinano la formazione:

1. **L'artefatto di valutazione è la prova, non il codice.** Un junior si valuta dal patto che ha
   scritto, dall'albero che ha costruito, dalla voce in sospeso che ha specificato, dal rosso che
   ha preteso, dal rapporto che non ha accettato. La rubrica dell'allegato A del manuale del corso
   lo dice già: non salito, salito, salito con prova di criterio. Quel terzo livello, poter
   raccontare un caso in cui il modello ha sbagliato e come lo ha rilevato, è l'obiettivo vero.
2. **Il riflesso si forma con gli incidenti, non con la teoria.** Nessuno impara a diffidare del
   modello leggendo che bisogna diffidare; impara quando il modello gli dice "fatto" e non lo era,
   e lo scopre nell'ambiente di test. Per questo il corso ha prove messe apposta (lasciare una
   domanda senza risposta e vedere cosa fa il modello; lasciare supposizioni nella rilevazione), e
   per questo la formazione deve avere incidenti progettati, non solo compiti che vadano bene.
3. **Il junior si forma nel metodo intero, non in una fase.** La tentazione è metterlo "a fare
   voci in sospeso" nel ciclo, che è la cosa più simile a dargli compiti piccoli di codice. È un
   errore: il ciclo senza l'avvio è costruire sulla sabbia, e il junior che non ha mai fatto un
   gradino 0 o un 3 non capisce perché il 5 ha la forma che ha. I due progetti guida esistono per
   questo: uno nuovo e uno ereditato, da un capo all'altro, i ventidue gradini e le otto stazioni.

## Come formarlo: il piano

Quello che segue è il piano che userei, e che userò con la prima coorte. Dodici settimane di
lavoro parziale, con un mentore, sui due progetti guida del corso, e poi un progetto reale piccolo
con un proprietario vero.

### Settimane 1 e 2: alfabetizzazione e il modello come oggetto di studio

- L'alfabetizzazione di cui sopra: leggere codice, come gira un sistema, git, SQL di base, il
  terminale. Con il modello accanto, che spiega; il junior non scrive, legge ed esegue.
- **Il modello come oggetto di studio**: una settimana di richieste al modello con l'unico scopo
  di vederlo fallire. Chiedergli un dato che non ha e vedere se lo inventa. Dargli una richiesta
  ambigua e vedere se chiede. Chiedergli di chiudere qualcosa e vedere se dice "fatto" senza
  prova. Chiedergli di sistemare un bug senza riprodurlo. Ogni fallimento si annota con il suo
  odore. Alla fine della settimana il junior ha il suo catalogo, ed è il catalogo del documento
  delle referenze, scoperto.
- Lettura del documento principale, con il glossario sottomano, e delle referenze: la storia di
  dove viene ogni regola.

### Settimane da 3 a 8: il progetto nuovo, con mentore

Il manuale del corso, parte 1, tale e quale, sul progetto guida "Turnera" o su un progetto proprio
piccolo. I ventidue gradini. Con tre regole di mentoring:

- **Il mentore revisiona le prove, non il codice.** Legge il patto di convivenza, l'albero
  semantico, la specifica di tre voci in sospeso, il rapporto di chiusura di una voce, il rapporto
  dell'audit, il rapporto della prova di carico. E fa una sola domanda ogni volta: "come fai a
  sapere che questo è vero?". Se la risposta è "perché lo ha detto il modello", il gradino non è
  salito.
- **Il mentore progetta gli incidenti.** Una volta a settimana, senza avvisare, altera qualcosa:
  cambia un dato della rilevazione, mette una supposizione nella volumetria, chiede una modifica
  fuori perimetro attraverso il modello. Il junior deve rilevarlo dalle prove.
- **Il junior tiene il proprio registro dei fallimenti del modello**: ogni volta che lo ha preso,
  che odore aveva, in quale gradino. Alla fine del progetto quel registro è la sua retrospettiva
  personale, e la proposta di modifica alla scala (gradino 15) la scrive lui.

### Settimane da 9 a 11: il progetto ereditato, con meno mentore

Il manuale, parte 2: la Turnera ereditata, o un legacy reale piccolo. Il tratto di normalizzazione
e i primi due blocchi. Qui il mentoring cala: il mentore legge la mappa recuperata e le
discrepanze, il rapporto dell'audit con le sue marche di velocità, e la chiusura del primo bug in
modalità correttiva. L'obiettivo di queste settimane è che il junior impari ciò che il progetto
nuovo non insegna: a leggere un sistema altrui attraverso il modello, a decidere con il
proprietario cosa di ciò che il codice fa è sbagliato e cosa era una regola dimenticata, e a non
riscrivere.

### Settimana 12: il progetto reale, da solo

Un progetto piccolo per davvero, con un proprietario vero che ha quindici minuti al giorno, da un
capo all'altro. Il mentore non interviene; legge la retrospettiva con i numeri alla fine. Se il
junior arriva in produzione con le ventidue condizioni della lista di uscita su "sì", è formato.
Se no, la lista dice esattamente quale gradino risalire, e anche quella è formazione.

### Cosa misura il progresso

Non quante voci in sospeso ha chiuso. Tre cose, in quest'ordine:

1. **Quante volte ha preso il modello**, e in quale gradino. Un junior che in sei settimane non ha
   preso il modello nemmeno una volta non sta guardando: il modello fallisce sempre.
2. **Quanto è costato al proprietario.** Minuti al giorno di domande; se salgono, il junior sta
   trasferendo al proprietario ciò che il metodo chiede a lui di risolvere (gradino 1).
3. **La qualità della sua proposta di modifica alla scala.** È l'indicatore di criterio: un junior
   che propone una modifica concreta, giustificata con un incidente proprio, ha capito il metodo
   come qualcosa di vivo e non come una lista.

## L'impatto sui ruoli e sulla squadra

Lo dico perché chi dirige una squadra me lo chiederà. Se il junior si forma così, la squadra cambia
forma:

- **Il junior** smette di essere "quello che scrive le cose facili" e diventa quello che porta
  avanti un progetto piccolo intero con il metodo. Vale di più prima, ed è più pericoloso prima,
  perché dirige un modello che costruisce in fretta; per questo il metodo è la condizione, non
  un'aggiunta.
- **Il senior** smette di revisionare codice e passa a tre cose: scrivere e mantenere i contratti
  (quello di convivenza, i cancelli, i lucchetti), fare audit con un'altra sessione (gradino 11) e
  decidere ciò che il junior non può decidere (architettura, il "per dieci", cosa blocca). Il suo
  valore si sposta dalla tastiera al criterio, che è dove è sempre stato nei bravi.
- **La squadra si rimpicciolisce e si appiattisce.** Un senior e due o tre junior con il metodo
  portano avanti ciò che prima portava avanti una squadra di otto. L'ho visto nei miei numeri
  quando ho eliminato un'intera squadra di agenti [Ref. 6](REFERENCIAS.md#ref-6): la stessa logica
  vale per gli umani che dirigono modelli.
- **Il proprietario del dominio entra nella squadra.** Con quindici minuti al giorno, ma entra,
  perché il metodo lo richiede. Formare un junior include insegnargli a ottenere quei quindici
  minuti e a non sprecarli.

## I rischi, detti senza addolcirli

- **Il junior che non ha mai scritto codice e non sa quando guardare.** È il rischio principale, e
  lo mitigo con l'alfabetizzazione obbligatoria e con l'esercizio del debug come ultimo strumento.
  Ma lo segno come ipotesi: ancora non so quanto codice bisogna aver scritto per leggere bene
  quello che scrive un altro. Sospetto poco, e sospetto che ciò che conta non sia aver scritto ma
  aver *debuggato*.
- **La dipendenza da uno strumento.** Il metodo è neutro rispetto allo strumento di proposito. Un
  junior formato su un solo strumento impara le sue scorciatoie e non il metodo; la formazione deve
  passare per almeno due.
- **Il costo invisibile.** Un junior con un modello spende token come se fossero gratis. Il budget
  dei token deve far parte della formazione dalla settimana 1, con il numero in vista.
- **L'illusione della velocità.** Il modello costruisce in un pomeriggio ciò che prima richiedeva
  una settimana, e il junior può credere di aver finito. La lista di uscita in produzione, con le
  sue ventidue condizioni, è l'antidoto: "finito" ha una definizione, e non è "funziona".
- **Il mentore che revisiona codice per abitudine.** È il rischio dal lato del senior, ed è serio:
  un mentore che legge il codice insegna al junior che le prove non bastano, che è esattamente il
  contrario del metodo. Il mentore deve formarsi nel metodo prima del junior.

## Cosa resta da elaborare `[ipotesi]`

1. Quanta programmazione bisogna aver fatto per leggere bene il codice di un altro. La mia
   intuizione è che ciò che conta sia aver debuggato, non aver scritto, e che basti poco. Senza
   dati, per ora.
2. Il piano di dodici settimane è scritto a partire dai miei progetti e da ciò che ho insegnato
   prima dei modelli, non a partire da una coorte. La prima lo correggerà, come correggerà il
   corso.
3. Se il "proprietario tecnico della prova" sia un ruolo nuovo o sia l'ingegnere dei sistemi di
   sempre con un altro strumento. Propendo per la seconda, e allora il nome è superfluo; ma il
   mercato avrà bisogno di un nome, e preferisco proporne uno prima che ne proponga uno peggiore.
4. Cosa succede al junior che entra in una squadra che non usa il metodo. Questo documento
   presuppone che la squadra lo adotti; se no, il junior formato così si scontrerà con un senior
   che gli chiede codice. Non ho una risposta, se non che il metodo è pubblicato perché quel
   senior lo legga.
