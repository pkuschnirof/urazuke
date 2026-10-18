# Passo 1 — Il patto di convivenza (contratto del gradino)

**Fase:** avvio.
**Quando:** una sola volta, nella prima settimana, immediatamente dopo l'idoneità; si rivede
quando un colpo lo esige. Mezz'ora.
**Forma:** un solo invio, con un giro di aggiustamento tuo.
**Dimensione:** obbligatorio in ogni progetto. È il gradino più economico di tutti e quello che
evita più frustrazione.

## A cosa serve

Metti per iscritto, prima della prima riga di codice, come lavorerete tu e l'agente. Sembra una
formalità e non lo è: è ciò che evita che l'agente "aiuti" espandendo il perimetro, lasci debito
per dopo, o riporti come fatto ciò che crede di aver fatto. Nel mio strumento questo file si chiama
`SQ.md` (standard di qualità); il nome non conta, il contenuto sì.

Pensala così: l'agente è un collaboratore nuovo che arriva ogni mattina senza memoria di ieri. Il
patto è ciò che gli dici il primo giorno, e ciò che rileggerà ogni giorno. Se non lo scrivi,
dovrai dirglielo ogni volta, e lo dirai diverso ogni volta. Io l'ho scritto per la prima volta
quando erano due settimane che ripetevo la stessa cosa in ogni sessione
[Ref. 1](../REFERENCIAS.md#ref-1), e niente di quello che ci ho messo era nuovo nell'ingegneria dei
sistemi; la novità era doverlo scrivere per qualcuno senza memoria.

## 1. Contesto richiesto

- Nessuno del progetto: è il primo file.
- Tuo: le tue preferenze di lavoro (lingua, come vuoi che ti si facciano le domande, cosa consideri
  una perdita del tuo tempo, che livello di autonomia dai all'agente).

## 2. Prompt

**Iniziale:**

> Before we write any code, we are going to set the working agreement between you and me.
> Write `docs/WORKING_AGREEMENT.md` with at least these rules, each with one line explaining
> what it prevents: (1) My time is sacred: do not ask me what you can resolve on your own, and
> when you do ask, ask in prose, with your recommendation. (2) Zero technical debt: whatever
> breaks is fixed at the root, with its regression test, in the same session. (3) Exact scope:
> no more and no less than what was asked; if you see something else, log it as a pending item,
> do not do it. (4) Documentation is updated in the same commit as the change. (5) Never report
> as done something you have not verified; always separate what you verified from what you
> believe. (6) Speak my language. Add any rules you think this project needs, marked as
> proposals. If you need to know something about how I work in order to write this, ask me.

> [it]
> Prima di scrivere codice, fisseremo il patto di convivenza tra te e me. Scrivi
> `docs/WORKING_AGREEMENT.md` con almeno queste regole, ciascuna con una riga che spieghi cosa
> evita: (1) Il mio tempo è sacro: non chiedermi ciò che puoi risolvere da solo, e quando chiedi,
> chiedi in prosa, con la tua raccomandazione. (2) Zero debito tecnico: ciò che si rompe si
> corregge alla radice, con il suo test di regressione, nella stessa sessione. (3) Perimetro
> esatto: né più né meno di ciò che è stato chiesto; se vedi qualcos'altro, annotalo come voce in
> sospeso, non farlo. (4) La documentazione si aggiorna nello stesso commit della modifica. (5) Non
> riportare mai come fatto qualcosa che non hai verificato; separa sempre ciò che hai verificato da
> ciò che credi. (6) Parla la mia lingua. Aggiungi le regole che ritieni che questo progetto
> richieda, marcate come proposte. Se hai bisogno di sapere qualcosa su come lavoro per scrivere
> questo, chiedimelo.

Cosa gli sto chiedendo: le sei regole minime, ciascuna con il fallimento che evita (è questo che
le rende regole e non consigli); che proponga regole proprie del progetto ma le marchi come
proposte, perché tu le accetti o le rifiuti; e che chieda ciò che ha bisogno di sapere su di te. Un
patto redatto senza una sola domanda è sospetto: l'agente non conosce la persona con cui lavorerà.

**Di chiusura:**

> I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the
> agreement with today's date and a version number. Then add to the project file the
> instruction to read this agreement at the start of every session.

> [it]
> Accetto le regole da 1 a 6 e le tue proposte [X, Y]; rifiuto [Z] perché [ragione]. Chiudi il
> patto con la data di oggi e un numero di versione. Poi aggiungi al file di progetto l'istruzione
> di leggere questo patto all'inizio di ogni sessione.

Cosa gli sto chiedendo: che chiuda il patto con data e versione, e che lo agganci al file di
progetto perché venga letto in ogni sessione. Senza quell'aggancio il patto esiste ma non agisce.

## 3. Risultato atteso

Un file `docs/WORKING_AGREEMENT.md` (o `SQ.md`, o `CONTRATO.md`) con:

- Data e versione.
- Ogni regola numerata, in una o due frasi, con il fallimento che evita.
- Le regole proprie del progetto, marcate come tali.
- Una riga in fondo che dica che l'agente propone modifiche ma non modifica il patto da solo.

E una riga nel file di progetto (`PROJECT.md` o `CLAUDE.md`) che ordini di leggerlo all'inizio di
ogni sessione.

## 4. Verifica di completezza

- Ci sono le sei regole minime, ciascuna con il fallimento che evita?
- C'è qualche regola scritta come aspirazione ("cercare di…", "per quanto possibile…")? Se c'è,
  non serve: le regole si rispettano o no.
- Il file di progetto ordina di leggerlo in ogni sessione?
- L'agente ti ha fatto almeno una domanda su come lavori? Se ha redatto tutto senza chiedere
  niente, è sospetto: non ti conosce.

## 5. Segnali d'allarme

- Il patto ha più di venti regole. Nessuno, né umano né modello, rispetta venti regole; se ne
  rispettano sei o otto.
- Una regola dice "l'agente può modificare questo patto quando lo ritiene necessario". No.
- Due settimane dopo, l'agente fa qualcosa che il patto vieta e nessuno se ne accorge. Il patto
  non viene letto: controlla l'aggancio nel file di progetto.
