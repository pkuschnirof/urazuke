# Passo 4 — Lo scheletro con i suoi cancelli (contratto del gradino)

**Fase:** avvio (una volta).
**Forma:** un solo invio lungo, con approvazione visiva del proprietario alla fine.
**Dimensione:** obbligatorio in ogni progetto che avrà utenti. In un prototipo usa-e-getta si può
saltare; ma se il prototipo sopravvive (sopravvivono sempre), questo gradino è la prima cosa da
pagare.

## A cosa serve

Perché il sistema parta, si provi e si distribuisca VUOTO prima di avere funzionalità. Scoprire il
deployment alla fine è carissimo: in Kikan arrivò un mese dopo l'avvio e costò cinque voci in sospeso
di fila. Se lo scheletro si distribuisce la prima settimana, quei colpi cadono con zero funzionalità
in gioco.

L'idea generale dietro: **il cammino verso la produzione fa parte del prodotto**, non è una pratica
finale. Un sistema che funziona sulla macchina del programmatore e non si può distribuire non è un
sistema; è una demo. E l'unico modo per sapere che il cammino funziona è percorrerlo quando non c'è
ancora nulla da perdere.

## 1. Contesto richiesto

- `docs/SIZING.md` (gradino 3): l'opzione scelta definisce lo scheletro.
- Rilevazione degli ambienti: dove girerà (cloud, server proprio), se c'è un ambiente di test e
  uno di produzione, chi ha accesso, come si distribuisce oggi se c'è qualcosa.
- Il tipo di progetto: nuovo (greenfield), correzione o evoluzione di qualcosa di esistente.

## 2. Prompt

**Iniziale:**

> We are going to build the skeleton of the system, with no functionality at all. Read
> `PROJECT.md`, `docs/SIZING.md` and the environments survey. Evaluate whether you have what is
> needed for the skeleton to run in the test environment (access, URL, deployment method); if
> anything is missing, ask me before starting. Then build: the folder structure; the server and
> the UI starting up; the test structure with one smoke test that passes; continuous
> integration running that test suite on every push; and the deployment to the test
> environment. Declare the gates of the workflow (what must be green to move from one stage to
> the next) in `docs/GATES.md`. When done, take a screenshot of the empty UI running in the
> test environment and show it to me. Do not add any functionality "while you are at it".
> Reply in my language.

Cosa stiamo chiedendo: che verifichi di avere gli accessi prima di cominciare (senza quelli lo
scheletro resta sulla macchina dell'agente); la lista esatta di cos'è uno scheletro (struttura,
avvio, un test, integrazione continua, deployment in test); i cancelli scritti; uno screenshot reale
dell'ambiente di test, che è l'unica prova valida che è stato distribuito; e il divieto esplicito di
aggiungere funzionalità, perché il modello tende al "già che ci sono" e questo rompe il perimetro
esatto.

**Di chiusura:**

> Skeleton approved. Record in `docs/STATUS.md` the test environment URL, the command to run
> the tests and the command to deploy, and mark this step as done. Then run the deployment a
> second time and show me that the second run changed nothing.

Cosa stiamo chiedendo: lasciare i tre comandi dove la prossima sessione li troverà, e provare che
il deployment è ripetibile (eseguirlo due volte senza rompere nulla). Quella seconda esecuzione è la
prova che la procedura è una procedura e non fortuna.

## 3. Risultato atteso

- Il repository con la struttura, il server e la schermata che partono.
- Un test di fumo in verde e la batteria che gira in integrazione continua (con il link
  all'esecuzione in verde).
- Il deployment nell'ambiente di test funzionante, con l'URL, ed eseguito due volte.
- `docs/GATES.md`: la lista dei cancelli, ciascuno con la condizione per passare.
- Uno screenshot del sistema vuoto che gira nell'ambiente di test.
- `docs/STATUS.md` aggiornato con i tre comandi (eseguire, testare, distribuire).

## 4. Verifica di completezza

- Riesci ad aprire l'URL dell'ambiente di test e vedere la schermata vuota? (Lo fai tu, non
  l'agente.)
- C'è un link a un'esecuzione di integrazione continua in verde?
- Il deployment è stato eseguito due volte e la seconda non ha rotto nulla?
- I cancelli sono scritti con una condizione verificabile ciascuno?
- C'è qualche funzionalità che non hai chiesto? Se c'è, l'agente ha violato il perimetro esatto.

## 5. Segnali d'allarme

- Lo scheletro "funziona in locale" ma il deployment "lo vediamo dopo". No: il deployment è lo
  scheletro.
- Lo screenshot è della macchina dell'agente, non dell'ambiente di test. Chiedi l'URL.
- I cancelli dicono cose come "il codice ha buona qualità". Un cancello è una condizione
  verificabile: "la batteria è in verde", "il deployment in test ha funzionato".
