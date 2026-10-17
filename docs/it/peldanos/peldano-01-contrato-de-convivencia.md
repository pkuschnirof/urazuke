# Passo 1 — Il patto di convivenza (contratto del gradino)

**Fase:** avvio (una volta per progetto; si rivede quando un colpo duro lo esige).
**Forma:** un solo invio, con un giro di aggiustamento del proprietario.
**Dimensione:** obbligatorio in ogni progetto. È il gradino più economico di tutti e quello che
evita più frustrazione.

## A cosa serve

Perché umano e agente concordino come lavoreranno prima della prima riga di codice. Sembra una
formalità e non lo è: è ciò che impedisce all'agente di "aiutare" allargando il perimetro, di
lasciare debito per dopo, o di riferire come fatto ciò che crede di aver fatto. In Forge questo
file si chiama `SQ.md` (standard di qualità); il nome non importa, il contenuto sì.

Un modo per capirlo: l'agente è un collega nuovo che arriva ogni mattina senza memoria di ieri. Il
patto è ciò che gli dici il primo giorno, e ciò che rileggerà ogni giorno. Se non lo scrivi, dovrai
dirglielo ogni volta, e lo dirai ogni volta in modo diverso.

## 1. Contesto richiesto

- Nulla del progetto: è il primo file.
- Del proprietario: le sue preferenze di lavoro (lingua, come vuole che gli si chieda, cosa
  considera una perdita di tempo, quale livello di autonomia dà all'agente).

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

Cosa stiamo chiedendo: le sei regole minime, ciascuna con il fallimento che evita (è questo che le
rende regole e non consigli); che proponga regole proprie del progetto ma le segni come proposte,
perché il proprietario le accetti o le rifiuti; e che chieda ciò che ha bisogno di sapere sul
proprietario. Un patto redatto senza una sola domanda è sospetto: l'agente non conosce la persona
con cui lavorerà.

**Di chiusura:**

> I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the
> agreement with today's date and a version number. Then add to the project file the
> instruction to read this agreement at the start of every session.

Cosa stiamo chiedendo: che chiuda il patto con data e versione, e che lo agganci al file di
progetto perché venga letto a ogni sessione. Senza quell'aggancio il patto esiste ma non agisce.

## 3. Risultato atteso

Un file `docs/WORKING_AGREEMENT.md` (o `SQ.md`, o `CONTRATO.md`) con:

- Data e versione.
- Ogni regola numerata, in una o due frasi, con il fallimento che evita.
- Le regole proprie del progetto, segnate come tali.
- Una riga in fondo che dice che l'agente propone modifiche ma non modifica il patto da solo.

E una riga nel file di progetto (`PROJECT.md` o `CLAUDE.md`) che ordini di leggerlo all'inizio di
ogni sessione.

## 4. Verifica di completezza

- Ci sono le sei regole minime, ciascuna con il fallimento che evita?
- C'è una regola scritta come aspirazione ("cercare di…", "per quanto possibile…")? Se c'è, non
  serve: le regole si rispettano o no.
- Il file di progetto ordina di leggerlo a ogni sessione?
- L'agente ti ha fatto almeno una domanda su come lavori? Se ha redatto tutto senza chiedere nulla,
  è sospetto: non ti conosce.

## 5. Segnali d'allarme

- Il patto ha più di venti regole. Nessuno, né umano né modello, rispetta venti regole; sei o otto
  si rispettano.
- Una regola dice "l'agente può modificare questo patto quando lo ritiene necessario". No.
- Due settimane dopo, l'agente fa qualcosa che il patto vieta e nessuno se ne accorge. Il patto non
  viene letto: controlla l'aggancio nel file di progetto.
