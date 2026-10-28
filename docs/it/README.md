# Urazuke — il metodo del riscontro

*Urazuke* (裏付け) è una parola giapponese che indica il sostegno di cui dispone un'affermazione:
ciò che la regge da dietro. Il verbo, *urazukeru*, significa "sostenere con prove". Questo è il
metodo.

Un metodo per costruire software con l'intelligenza artificiale che risulti robusto, pronto per la
produzione, **senza che il proprietario del progetto debba leggere una sola riga di codice**. L'ho
distillato da tre sistemi reali che oggi sono in produzione, appoggiandomi all'ingegneria dei
sistemi di sempre e a ciò che quei sistemi mi hanno mostrato su dove i modelli la applicano in modo
fragile.

Autore: Pablo Kuschniroff, assistito da Claude Code. Pubblicato con licenza Creative Commons BY-SA
4.0. Presentazione pubblica: [yujin.app/urazuke](https://yujin.app/urazuke/). Repository:
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

Questa cartella contiene la versione italiana del metodo. Lo spagnolo è la fonte della verità; se
le due versioni divergono, prevale quella spagnola e quella italiana viene corretta.

## Tre cose distinte: un metodo, un protocollo, uno strumento

Lo metto in alto perché è il fraintendimento più costoso che questo progetto abbia, e l'ho
misurato: ho passato il sito pubblicato a un assistente estraneo, e lui ha messo le tre cose nello
stesso sacco, ha concluso che tutto insieme era la narrazione di un prodotto e si è offerto di
analizzarmi il codice. Ha chiesto codice a un metodo. Sono tre nature distinte, e conviene
separarle da subito.

**Il metodo è Urazuke, ed è questo che stai leggendo.** Dice cosa fare e in che ordine, cosa
esigere da chi costruisce (una persona o un modello) e come sapere, senza leggere una sola riga di
codice, che ha consegnato completo e non a metà. È procedura ed è criterio, nient'altro. Si applica
con l'assistente che hai a portata di mano, con quello che uscirà l'anno prossimo, o con matita,
carta e una squadra di persone. È qui per intero e sotto licenza libera: i ventiquattro gradini, i
loro contratti e i loro prompt.

**Il protocollo è NAC3, ed è un'altra cosa.** È un contratto perché le schermate di
un'applicazione si possano pilotare da programma (ogni elemento dell'interfaccia con il suo
identificatore e i suoi metodi) e, allo stesso prezzo, le possa pilotare una persona che usa un
lettore di schermo o la voce: un agente e una persona che navigano la stessa interfaccia con la
stessa dignità. Il metodo lo usa come **mezzo** per una cosa precisa: che i test da punta a punta
percorrano la schermata da soli. Non è una condizione del metodo. Il criterio del metodo è neutro
ed è scritto così nel gradino 0: che l'interfaccia si possa eseguire da programma, con qualunque
tecnologia lo permetta.

**Lo strumento è Yujin-Forge, ed è un'implementazione.** Automatizza il metodo (le comporte,
l'iniezione dei prompt) e parla il protocollo. È *un* modo di applicare Urazuke, non *il* modo. Se
non ti serve, o non lo vuoi, il metodo ti resta altrettanto completo.

E questa non è una dichiarazione di buona volontà: **sta nel dato e si può misurare.** La
definizione meccanica delle comporte che il metodo pubblica per qualunque consumatore non nomina
nessuno strumento né nessun protocollo, nemmeno i miei. C'è un test automatico che lo esige su ogni
superficie dove un nome potrebbe infilarsi (le fonti, i file pubblicati, il loro indice e il
documento generato), e chiunque può verificarlo oggi, in un secondo, sul file servito:

```
curl -s https://yujin.app/urazuke/api/gates.json | grep -o -i -E "forge|nac-?3|yujin" | wc -l
```

Restituisce **0** (misurato il 2026-10-26). Qualunque strumento può implementare le comporte del
metodo senza adottare nessun protocollo e senza adottare nessun altro strumento.

## La tesi in una frase

L'IA non interrompe il metodo: lo continua. L'industria ha smesso di fidarsi dell'autore del codice
vent'anni fa e ha imparato a esigere prove invece di leggerlo; il modello è l'autore successivo,
non il primo di cui diffidare. L'unica cosa nuova è che questo autore fabbrica anche le prove, e
per questo la prova deve dimostrare se stessa.

## Cosa c'è qui

| File | Cos'è |
|---|---|
| `ESCALERA_METODOLOGICA.md` | Il documento principale: la tesi, da dove viene il metodo, la linea del tempo (quando si sale ogni gradino e cosa succede nel mezzo: infrastruttura, CI/CD, acquisizione dei requisiti, sviluppo, test end to end, sguardo umano, prove umane), i ventiquattro gradini con la loro scheda (gli ultimi sei, di qualità operativa: osservabilità, persistenza, vulnerabilità, rendimento, e i due monitoraggi), ciò che manca, i lavori correlati (cosa esiste di simile nel mondo e in cosa si distingue questo metodo), e il glossario. |
| `EVOLUTIVO_CORRECTIVO.md` | Il percorso per un sistema che esiste già e non è nato con il metodo: i tre casi d'uso del metodo, il principio di normalizzare senza riscrivere, le otto stazioni di normalizzazione (da N0 a N7) con i loro contratti e prompt, il ciclo in modalità correttiva ed evolutiva, e la lista di uscita dal tratto. |
| `REFERENCIAS.md` | I casi reali dietro il metodo, numerati ("Ref. N"), con data e prova, perché le procedure restino pulite e il dettaglio sia a un clic. Include le cronologie dei tre sistemi e la tabella dei fallimenti per gradino. |
| `peldanos/peldano-NN-*.md` | Il contratto di ogni gradino: quando, contesto richiesto, prompt in inglese con la loro traduzione e, prima di ciascuno, il blocco "Prima di inviare il prompt" con i file che devi costruire tu e il loro contenuto; risultato atteso, verifica di completezza senza leggere codice, segnali d'allarme. |
| `peldanos/README.md` | L'indice dei contratti. |
| `PREGUNTAS_AL_PROVEEDOR.md` | Le venticinque domande per il fornitore: la verifica di completezza dei contratti, riunita in un foglio che un proprietario che non ha mai commissionato software porta a una riunione. Raggruppate per quello che gli stanno promettendo, ciascuna con la risposta che si può **vedere** e il gradino da cui esce. |
| `MANUAL_CURSO.md` | Il corso: calendario, ventiquattro lezioni con compiti pratici e prompt, progetto guida ("Turnera"), lista di uscita in produzione. |
| `MANUAL_CURSO_EVOLUTIVO.md` | La parte 2 del corso: il progetto guida ereditato ("Turnera ereditata"), dieci lezioni (da N0 a N7, R1 e R2) per normalizzare un legacy e poi correggerlo e farlo evolvere. |
| `../DECISIONES.md` | Le decisioni del progetto, con data e parole testuali. Il metodo si applica a se stesso. Solo in spagnolo. |
| `TRABAJO_COLABORATIVO.md` | Come si applica il metodo quando più sviluppatori, ciascuno con il suo agente, lavorano sullo stesso ramo: le sette regole del ramo condiviso, come si distribuiscono i gradini, e i prompt. |
| `CAPACITACION_JUNIOR.md` | L'impatto del metodo sulla formazione degli sviluppatori junior: quali fuochi perdono peso, quali ne guadagnano, con quale obiettivo e come formare un junior nell'era successiva alla programmazione a mano. |
| `ANEXO_HEURISTICAS.md` | Allegato H, trasversale al Ciclo di Costruzione: diciotto regole di qualità del codice e ventisette di usabilità, ciascuna con identificatore stabile, severità, verificatore nominato e soglie dichiarate dal proprietario; raggruppamento per convergenza funzionale, profili e la matrice da cui derivano menu, routing e permessi; due interruttori e le prove di accettazione che dimostrano che il cancello vigila davvero. |
| `../PLAN_CURSO_MENTORING.md` | La bozza del piano commerciale del corso e del mentoring. Solo in spagnolo. |
| `../html/it/` | Le versioni HTML per una lettura comoda, con il pulsante che traduce ogni prompt. Non si modificano a mano. |
| `../../build/` | Il convertitore da markdown a HTML, l'estrattore e verificatore dei prompt, e lo script che costruisce tutto. |
| `../../prompts/` | I prompt in inglese estratti dai contratti, generati; non si modificano a mano. |

## Come leggerlo

Comincia da `ESCALERA_METODOLOGICA.md`, oppure dal suo HTML in `../html/it/`. Se incontri una
parola strana, il glossario è alla fine. Poi il contratto del gradino che ti interessa, e il
manuale del corso se vuoi applicarlo. Se ciò che hai non è una cartella vuota ma un sistema che
gira già e bisogna correggere o far crescere, il percorso è `EVOLUTIVO_CORRECTIVO.md` e la parte 2
del manuale.

## Come rigenerare gli HTML

```
node build/build.mjs
```

Verifica che i prompt in inglese siano identici nelle otto versioni (quelli dei contratti e quelli
del percorso evolutivo-correttivo) e produce, per ogni lingua, `ESCALERA_METODOLOGICA.html`,
`REFERENCIAS.html`, `EVOLUTIVO_CORRECTIVO.html`, `MANUAL_CURSO.html`,
`MANUAL_CURSO_EVOLUTIVO.html`, `CAPACITACION_JUNIOR.html`, `TRABAJO_COLABORATIVO.html` e
`CONTRATOS_DE_PELDANO.html` (lo spagnolo in `docs/html/`, le altre lingue in
`docs/html/<lingua>/`).

## Lingue

Lo spagnolo è la fonte della verità; questa versione italiana è una traduzione. La documentazione
esiste nelle otto lingue che il metodo dichiara
per conto proprio: spagnolo (`docs/`), inglese (`docs/en/`), portoghese
(`docs/pt/`), francese (`docs/fr/`), tedesco (`docs/de/`), italiano (`docs/it/`), giapponese
(`docs/ja/`) e cinese (`docs/zh/`). Ogni cartella ha il suo README, il documento principale, le
referenze, i ventiquattro contratti, il percorso evolutivo-correttivo e le due parti del
manuale-corso. I prompt per il modello sono un unico pezzo in inglese, identico in tutte le
versioni, con la traduzione nella lingua del documento accanto;
`node build/prompts.mjs --check` fallisce se una traduzione li ha alterati. Il nome non si
traduce; il sottotitolo sì: *the evidence method*, *o método da evidência*,
*la méthode de la preuve*, *die Nachweis-Methode*, *il metodo del riscontro*, 裏付けの方法,
验证方法.

Le decisioni (`docs/DECISIONES.md`) e il piano del corso restano solo in spagnolo perché citano
parole testuali.

## Licenza e come contribuire

Il metodo è pubblicato con licenza **Creative Commons Attribuzione – Condividi allo stesso modo
4.0** (`LICENSE`): si può usare, tradurre e adattare, con attribuzione e condividendo allo stesso
modo. I miglioramenti a **questo** repository entrano tramite pull request da un fork, con la loro
prova, e li integra un manutentore dopo averli revisionati; nessun altro scrive su `main`. Il
processo è in `CONTRIBUTING.md`. Il gradino 23 del metodo chiede che ogni retrospettiva finisca
in una proposta concreta di modifica alla scala; questa è la forma attesa di contribuire.

I clienti dei sistemi di origine sono anonimizzati ("la Mutua", "l'Associazione"); i numeri, le
date e i commit sono reali.

## Stile di questo progetto

Diverso dal resto dei miei repository, e di proposito: prima persona, prosa spiegata, linguaggio
di tutti i giorni, caratteri latini con accenti, e un glossario per ogni sigla e ogni espressione
colloquiale. È scritto per persone che non hanno vissuto i progetti. Vedi `CLAUDE.md`.
