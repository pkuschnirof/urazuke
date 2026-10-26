# Le venticinque domande per il fornitore

Questo foglio è per un momento molto concreto: qualcuno ti sta offrendo di costruirti un sistema, o
te lo sta consegnando, e tu non programmi. Non devi imparare a programmare per questa riunione.
Devi sapere **cosa chiedere che ti mostrino**.

Il metodo completo vive nei contratti dei ventiquattro gradini, e ogni contratto porta la sua
"verifica di completezza senza leggere codice": la lista dei controlli che il proprietario fa su
quello che è stato consegnato. Questo serve mentre il progetto è in corso, ma è distribuito in
trentadue file e nessuno entra in una riunione con quello. Questo foglio è la stessa cosa, riunita e
ordinata per **quello che ti stanno promettendo**. Si stampa e si porta.

## L'unica regola che devi ricordare

**Le risposte che valgono sono quelle che si possono vedere.** Un file, un numero con il comando che
lo produce, una prova che si è vista fallire, un manuale, una firma con la data. Quelle che non si
possono vedere sono promesse, e una promessa non è una risposta: è un'intenzione, detta da qualcuno
che vuole chiudere la riunione.

Non serve che tu capisca quello che ti mostrano. Basta che **esista** e che la persona lo apra
davanti a te. Se per risponderti deve spiegarti perché non ancora, annota la data e torna a chiedere
alla riunione successiva: quello che si ripete due volte senza mostrarsi non comparirà.

Tre frasi che conviene riconoscere, perché significano "non ho quella cosa":

- "Fidati, quello lo facciamo sempre così."
- "Quello si vede alla fine, quando sarà tutto pronto."
- "È nella mia testa / è nel repository, poi te lo mando."

E un chiarimento onesto nell'altra direzione: **un "no" detto con la sua ragione è una buona
risposta**. "Non abbiamo prove di carico perché sono trenta utenti e lo avevamo concordato" è un no
con ragione, ed è esattamente quello che il metodo chiama proporzionalità. Quello che non serve è il
"sì" che non si può vedere.

## Se hai solo dieci minuti

Se la riunione è corta, queste cinque portano più informazione delle venticinque: la **4** (una prova
vista in rosso), la **7** (il piano sono le voci in sospeso), la **13** (il limite che ferma la
costruzione), la **20** (il manuale di ripristino, provato da una persona) e la **24** (il rapporto
che dice cosa non si è potuto verificare). Se quelle cinque si possono vedere, il resto quasi sempre
c'è. Se nessuna si può vedere, il resto quasi mai c'è.

---

## Quello che ti promettono: "te lo consegno funzionante"

**1. Mi puoi mostrare il sistema che gira in un ambiente che non è il tuo computer?**
Cosa si può vedere: un indirizzo che apri tu, sul tuo telefono, con dati di prova. Se funziona solo
sulla macchina di chi l'ha costruito, non esiste ancora come sistema.
*(Gradino 15.)*

**2. Cosa deve essere vero perché tu consideri finita una mia richiesta?**
Cosa si può vedere: scritto, prima di cominciare, per ogni richiesta. Dovrebbe includere "la prova è
passata" e "una persona l'ha usato". Se la risposta è "quando funziona", non c'è criterio: c'è
opinione.
*(Gradino 5, criteri di accettazione.)*

**3. C'è una prova automatica di ogni cosa che mi importa?**
Cosa si può vedere: una corsa della batteria di prove, con numeri, a schermo. Il contenuto non ti
importa: ti importa che ci sia un output e che dica quante sono passate.
*(Gradino 8.)*

**4. Mi puoi mostrare una di quelle prove che **fallisce**?**
Cosa si può vedere: il pezzo di schermo dove la prova è andata in rosso contro il sistema senza la
riparazione, con il comando che l'ha eseguita e la data. È la domanda più importante del foglio: di
una prova che nessuno ha visto fallire non si sa se prova qualcosa. Un sistema può avere mille prove
che passano e non vigilare niente.
*(Gradino 8. Nel metodo si chiama "provato in rosso".)*

**5. Chi, che non sia tu né un programma, ha usato il sistema ed è arrivato fino alla fine?**
Cosa si può vedere: una lista di casi di prova scritti per una persona, con data, con il nome di chi
li ha eseguiti e cosa è successo. Chi ha costruito non può essere l'unico che ha provato, e il
modello prova quello che ha capito, che non sempre è quello che hai chiesto.
*(Gradino 10.)*

**6. Se faccio qualcosa di sbagliato sullo schermo — inserisco due volte, premo il pulsante di
fretta —, cosa succede?**
Cosa si può vedere: la lista delle azioni che non si possono disfare, ognuna con il suo lucchetto e
cosa succede se fallisce a metà strada. La risposta corretta non è mai "quello non dovrebbe
succedere".
*(Gradino 14.)*

## Quello che ti promettono: "so cosa manca e in che ordine"

**7. Dov'è la lista di quello che manca, e posso vederla oggi?**
Cosa si può vedere: un registro di voci in sospeso numerate, con ciascuna scritta in dettaglio e con
la data in cui si è chiusa. **Quella lista è il piano**: se c'è un piano da un'altra parte e una
lista qui, ci sono due piani, e quello che vale è quello che nessuno sta guardando.
*(Gradino 5.)*

**8. Ogni cosa che mi costruirai è scritta prima di costruirla, con le mie parole?**
Cosa si può vedere: la voce in sospeso aperta, con la storia di dove è uscita la richiesta detta come
l'hai detta tu, le regole che si applicano, le schermate e i casi strani. Se sta in una riga, quello
che manca lo inventerà qualcuno.
*(Gradino 5.)*

**9. Quando qualcosa del business non è chiaro, cosa fai?**
Cosa si può vedere: il file delle decisioni, con data e con chi ha deciso ciascuna. La risposta che
cerchi è "te lo chiedo e lo annoto". Un modello che trova un buco nelle regole del business lo riempie
da solo e tira avanti, e sei settimane dopo nessuno sa perché il sistema fa quella cosa.
*(Gradini 1 e 6.)*

**10. È scritto quali cose il sistema **non** farà?**
Cosa si può vedere: una sezione propria, con almeno due voci, nel documento del progetto. Quello che
non è detto è esattamente quello che comparirà costruito in un altro modo.
*(Gradino 2.)*

**11. Chi sono i diversi tipi di persona che useranno questa cosa, ed è scritto cosa può fare
ciascuno?**
Cosa si può vedere: la lista dei profili — chi è ciascuno e cosa viene a fare — e una tabella che
dice cosa può fare ogni profilo. Se c'è un solo profilo chiamato "utente", quasi sempre manca metà: è
la causa più comune del fatto che qualcuno veda un pulsante che non gli spetta, o che qualcuno che ha
il permesso non trovi la schermata.
*(Gradino 2, ingressi previi dell'Allegato H; gradino 8, la matrice.)*

## Quello che ti promettono: "è ben fatto"

**12. Cosa misura una macchina a ogni cambiamento, senza che nessuno si ricordi di guardare?**
Cosa si può vedere: la configurazione della catena di verifica nel repository e il registro dell'ultima
corsa. "Ce lo rivediamo tra noi" non è una risposta: è un'abitudine, e le abitudini cadono la
settimana in cui c'è fretta.
*(Gradini 4 e 9.)*

**13. C'è un limite che, se si supera, **ferma** la costruzione?**
Cosa si può vedere: un file con i limiti e il loro valore misurato di oggi, e una corsa fermata da uno
di essi. La domanda di controllo, che conviene fare così com'è: *avete mai alzato un limite per poter
andare avanti?* Se la risposta è sì e non è scritto perché, il limite è decorativo.
*(Gradino 9.)*

**14. Come sai che il codice lo potrà mantenere un'altra persona?**
Cosa si può vedere: il rapporto per regola, non un numero unico: dimensione di file, dimensione di
funzione, codice ripetuto, codice morto. Un "novantacinque per cento di qualità" non dice cosa
sistemare.
*(Gradino 9 e Allegato H.)*

**15. Le schermate le ha pensate qualcuno, o sono uscite da quello che serviva al programma?**
Cosa si può vedere: il registro delle regole di usabilità con il loro risultato, e le eccezioni spente
con il motivo scritto, chi l'ha autorizzato e quando si rivede. Un sistema può passare tutte le
verifiche tecniche ed essere inusabile: tutto verde, e la persona non trova dove incassare.
*(Allegato H, le ventisette regole di usabilità.)*

**16. Le prove che mi hai mostrato vigilano davvero o decorano?**
Cosa si può vedere: il punteggio di mutazione. È un programma che inserisce errori di proposito e
conta quanti le prove ne acchiappano; il numero esce con il suo comando. Se il tuo sistema ha utenti
reali, questo nel metodo non è opzionale.
*(Gradino 9.)*

## Quello che ti promettono: "non ti farà danno"

**17. Cosa succede ai miei dati se qualcosa si rompe a metà di un'operazione?**
Cosa si può vedere: la tabella delle azioni con la loro reversibilità, e la regola scritta che nel
dubbio il sistema **si ferma** invece di andare avanti. Un addebito duplicato o un'approvazione
automatica che nessuno ha guardato sono il caso tipico.
*(Gradino 14.)*

**18. Ci sono copie di sicurezza, e avete mai provato a ripristinarne una?**
Cosa si può vedere: la data dell'ultimo ripristino **provato**. Una copia che non si è mai
ripristinata non è una copia di sicurezza: è un file di cui nessuno sa niente.
*(Gradino 20, manuale di ripristino.)*

**19. Chi controlla che il sistema non abbia buchi noti, e ogni quanto?**
Cosa si può vedere: la scansione che gira nella catena, con data, e i risultati convertiti in voci in
sospeso. Più una domanda corta e molto rivelatrice: *dove sono conservate le chiavi e le password del
sistema?* Se sono nel codice, hai già un problema.
*(Gradini 18 e 15.)*

**20. Qualcuno che non programma ha ripristinato il sistema da zero seguendo un manuale?**
Cosa si può vedere: il manuale, e il registro di quella prova con tre cose: quanto ha impiegato da
punta a punta, in quale passo esatto si è bloccata la persona, e quali parole non ha capito. Se il
manuale comincia con "apri una sessione con l'agente", non è un manuale per una persona. E finché
quello non esiste, detto senza giri: **il proprietario non è proprietario, è inquilino**. Ha il
sistema, lo paga, e non può entrare senza chiedere il permesso a chi l'ha costruito.
*(Gradino 20.)*

## Quello che ti promettono: "terrà"

**21. Con quali numeri avete dimensionato questa cosa, e da dove sono usciti?**
Cosa si può vedere: quanti utenti contemporaneamente, quante operazioni al giorno, quanto cresce
all'anno, quanto tempo deve restare conservato. E la parte che importa: quei numeri li ha il **tuo
business**, non chi costruisce. Se li ha inventati lui, sono sbagliati.
*(Gradino 3.)*

**22. L'avete provato con il carico che gli darò io, e con dieci volte tanto?**
Cosa si può vedere: il rapporto della corsa, con il punto esatto in cui il sistema è caduto. Sapere
dove si rompe è l'unico modo di sapere quanto margine hai.
*(Gradino 19.)*

**23. Quando il sistema sarà lento tra sei mesi, come farete a sapere perché?**
Cosa si può vedere: i log con identificatore per azione, il rapporto delle query più lente, e gli
allarmi configurati. Se la risposta è "lo vediamo quando succede", lo vedrai prima tu, da un utente
arrabbiato.
*(Gradini 16, 17, 21 e 22.)*

## Quello che ti promettono: "ti dirò la verità"

**24. Quando mi informi che qualcosa è pronto, come distinguo quello che hai provato da quello che
supponi?**
Cosa si può vedere: il rapporto in tre blocchi: **verificato** (con la prova accanto), **creduto** (e
perché non si è provato) e **punti ciechi** (quello che non si può vedere da dove sta). "Pronto" e
basta non è un rapporto. E la seconda parte della domanda vale più della prima: *quali cose di questa
consegna **non** hai potuto verificare?* Se la risposta è "nessuna, tutto verificato", diffida:
nessuno verifica tutto.
*(Gradino 12.)*

**25. Chi rivede il lavoro, oltre a te stesso?**
Cosa si può vedere: un audit fatto da qualcuno — o qualcosa — diverso da chi ha costruito, con i suoi
risultati convertiti in voci in sospeso e con data. Un modello avalla una parte considerevole dei
propri errori, e una persona anche. Chi costruisce non può essere l'unico che verifica.
*(Gradino 13.)*

---

## Cosa fare con le risposte

Annota, accanto a ogni domanda, una di tre cose: **l'ho visto**, **non l'ho ancora visto** (con la
data in cui te l'hanno promesso) o **non esiste e mi ha detto perché** (con la ragione). Non serve che
le venticinque diano "l'ho visto": un progetto piccolo non ha bisogno di prove di carico né di
monitoraggio settimanale, e il metodo lo dice. Quello che sì deve succedere è che **ogni "no" abbia la
sua ragione scritta**, perché un no con ragione è una decisione tua e un no senza ragione è un debito
che pagherai senza averlo scelto.

E un'ultima, che non è numerata perché non è per il fornitore: se qualcuno si scomoda perché chiedi di
vedere le cose, anche quella è informazione.

---

## Da dove esce questo foglio

Le venticinque domande sono la "verifica di completezza senza leggere codice" dei contratti di questo
metodo, riunita: ciascuna cita il gradino da cui esce, così chiunque può andare al contratto e leggere
la versione completa. Sono scritte da zero per questo foglio.

**L'idea che questo dovesse esistere come un foglio non è mia.** È venuta dal primo adattamento del
metodo a un altro formato — il romanzo di Oscar Schmitz "El Arte de Forjar Sistemas", 2026,
accreditato nella Parte F del documento principale —, che l'ha detto meglio di me: il metodo ha la
verifica distribuita nei suoi contratti e gli mancava il pezzo che un proprietario porta a una
riunione. Il criterio in testa a questo foglio — che le risposte che valgono sono quelle che si
possono vedere — è anch'esso di là. La sua versione delle domande è opera sua e ha i suoi diritti
riservati; queste sono altre, scritte dai miei contratti, e per questo si pubblicano con la licenza di
questo repository.
