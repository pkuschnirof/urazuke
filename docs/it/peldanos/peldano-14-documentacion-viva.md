# Passo 14 — Documentazione viva e manuali che una persona può seguire senza IA (contratto del gradino)

**Fase:** esercizio.
**Quando:** il manuale utente cresce con ogni blocco funzionale, alla chiusura, con le schermate
nuove; alimentato dalle voci in sospeso chiuse, che sono la documentazione di ciò che è stato
fatto. I tre manuali completi si generano nella fase di uscita in produzione, dopo il 13, e la
prova con una persona che non programma si fa prima del primo deployment. La routine dello stesso
commit vale per tutto l'esercizio.
**Forma:** routine; più un invio lungo quando si generano i manuali.
**Dimensione:** proporzionale. Un sistema piccolo ha bisogno, come minimo, del manuale di
infrastruttura e ripristino; quello utente può essere una pagina. Ciò che non cambia: se la
persona che l'ha costruito sparisce, un'altra deve poter andare avanti.

## A cosa serve

Fai in modo che il sistema si possa usare, mantenere e ripristinare senza l'agente e senza di te.
Se il giorno in cui non c'è l'agente non si può distribuire, non è finito. Nel metodo classico la
documentazione era cara e invecchiava; qui rigenerarla è gratis, quindi la regola diventa "nello
stesso commit" e "riproducibile a mano". I manuali che ho scritto per la Mutua con quel criterio
sono il modello [Ref. 24](../REFERENCIAS.md#ref-24); e il file di progetto che è diventato uno
storico di migliaia di righe è il controesempio [Ref. 41](../REFERENCIAS.md#ref-41).

Un criterio di qualità per il manuale di ripristino, che serve a giudicarlo senza essere tecnici:
**deve poterlo seguire una persona di fiducia che non programma, alle tre del mattino, con il
sistema giù e l'agente senza connessione**. Se in qualche passo dice "consultare lo sviluppatore"
o "a seconda del caso", quel passo è incompleto.

E una fonte da non sprecare: le voci in sospeso chiuse. Ognuna porta la sua specifica, la sua
decisione, la sua prova e la sua data. Il manuale utente non si scrive da zero alla fine: si
compone, blocco per blocco, a partire dalle voci in sospeso che si sono chiuse, e il diario delle
modifiche esce direttamente da loro.

## 1. Contesto richiesto

Quello che segue è la lista generica. I file concreti che devi avere pronti prima di ogni
prompt, con il loro contenuto e il loro stato minimo, stanno nella sezione 2, nel blocco "Prima di
inviare il prompt" che precede ciascuno.

- Chi sono i lettori di ogni manuale: l'utente finale, chi mantiene, chi opera l'infrastruttura.
  Lo sa il business; l'agente chiede se non è chiaro.
- Il sistema in esecuzione nell'ambiente di test, per fare schermate reali.
- Le voci in sospeso chiuse del blocco, con la loro documentazione di chiusura (gradino 5).
- `docs/DEPLOYMENT.md` (gradino 13) e `docs/LOCKS.md` (gradino 12), che sono input.

## 2. Prompt

**Routine (va nel patto di convivenza):**

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business con te), non
l'agente:

- `docs/WORKING_AGREEMENT.md`, dove va la routine.
- La decisione di quali manuali avrà il sistema e per chi è ciascuno (l'utente finale, chi
  mantiene, chi opera l'infrastruttura), scritta in `PROJECT.md` o detta nella chat, perché "il
  manuale corrispondente" abbia senso.
- Stato minimo accettabile: c'è una lista di manuali, ciascuno con il suo lettore.

> Every change that modifies what the user sees, what the operator does, or how the system is
> deployed, updates the corresponding manual in the same commit. At the close of every
> functional block, add to the user manual the screens and flows of the pending items closed
> in that block, with real screenshots from the test environment, and add their entries to the
> changelog. If you do not know which manual, ask.

> [it]
> Ogni modifica che cambia ciò che l'utente vede, ciò che l'operatore fa, o come si distribuisce
> il sistema, aggiorna il manuale corrispondente nello stesso commit. Alla chiusura di ogni blocco
> funzionale, aggiungi al manuale utente le schermate e i flussi delle voci in sospeso chiuse in
> quel blocco, con schermate reali dell'ambiente di test, e aggiungi le loro voci al diario delle
> modifiche. Se non sai a quale manuale va, chiedi.

Cosa gli sto chiedendo: la regola dello stesso commit, che è l'unica che mantiene un manuale
aggiornato; la chiusura del blocco come momento in cui le voci in sospeso chiuse diventano manuale
e diario delle modifiche; e la domanda quando non è chiaro a quale manuale va.

**Per generare i manuali:**

**Prima di inviare il prompt**, devi avere questo a portata di mano:

- Il sistema in esecuzione nell'ambiente di test con dati realistici, non vuoto: gli screenshot
  escono da lì.
- Le voci in sospeso chiuse con la loro documentazione di chiusura (gradino 5), che sono la fonte
  del manuale utente e del diario delle modifiche.
- `docs/DEPLOYMENT.md` (gradino 13) e `docs/LOCKS.md` (gradino 12), che sono l'input del manuale
  di infrastruttura e ripristino.
- Ciò che solo il business sa, preparato per quando l'agente lo chiederà: chi è responsabile di
  cosa, a che numero si telefona quando va giù, chi fa la copia di backup, in che lingua legge
  l'utente.
- Stato minimo accettabile: ci sono dati nell'ambiente di test, e sai chi chiamare alle tre del
  mattino.

> Generate three manuals from the system as it is today in the test environment: the user
> manual (screen by screen, with real screenshots, in the user's language, no jargon); the
> maintenance manual (how it is built, where everything is, how to run the test suite, how to
> add a module); and the infrastructure and recovery manual (how to deploy, how to roll back,
> how to restore a backup, what to do if it goes down; written for a person who has to do it by
> hand, without AI, at three in the morning). If for any section you need something only the
> business knows (who is responsible for what, which phone number to call), ask me; do not leave
> a gap and do not invent. Each manual carries a date and the system version. Reply in my
> language.

> [it]
> Genera tre manuali a partire dal sistema così com'è oggi nell'ambiente di test: il manuale
> utente (schermata per schermata, con schermate reali, nella lingua dell'utente, senza gergo); il
> manuale di manutenzione (come è costruito, dove sta ogni cosa, come eseguire la batteria, come
> aggiungere un modulo); e il manuale di infrastruttura e ripristino (come distribuire, come
> tornare indietro, come ripristinare un backup, cosa fare se va giù; scritto per una persona che
> deve farlo a mano, senza IA, alle tre del mattino). Se per qualche sezione ti serve qualcosa che
> solo il business sa (chi è responsabile di cosa, a quale telefono chiamare), chiedimelo; non
> lasciare un buco e non inventare. Ogni manuale porta una data e la versione del sistema.
> Rispondi nella mia lingua.

Cosa gli sto chiedendo: i tre manuali con i loro lettori; schermate **reali** dell'ambiente di
test (non disegni né descrizioni); il criterio delle tre del mattino per quello di ripristino; la
clausola di completezza nella sua forma per documentare: ciò che solo il business sa si chiede, e
**non si lascia un buco né si inventa**; e data e versione, perché si sappia a quale sistema
corrisponde ogni manuale.

## 3. Risultato atteso

- `docs/USER_MANUAL.md` (o HTML), con schermate reali e incorporate, cresciuto blocco per blocco.
- `docs/MAINTENANCE_MANUAL.md`.
- `docs/INFRASTRUCTURE_AND_RECOVERY_MANUAL.md`: passo per passo, per una persona.
- `docs/CHANGELOG.md`, alimentato dalle voci in sospeso chiuse.
- Ciascuno con la data e la versione del sistema che documenta.
- Nei commit che cambiano schermate, esercizio o deployment: il manuale aggiornato.

## 4. Verifica di completezza

- Apri il manuale utente su una schermata a caso: la schermata coincide con ciò che c'è oggi
  nell'ambiente di test?
- Il manuale di ripristino lo potresti seguire tu, o qualcuno di fiducia che non programma? Leggi
  la sezione "è andato giù": dice cosa fare, in ordine, con i comandi?
- Scegli un commit recente che ha cambiato una schermata: ha toccato il manuale?
- Il diario delle modifiche ha una voce per ogni voce in sospeso chiusa dell'ultimo blocco?
- C'è un buco tipo "[completare]" o "consultare il responsabile"? Lì l'agente doveva chiedere.
- Ogni manuale dice per quale versione del sistema vale?

## 5. Segnali d'allarme

- Il manuale utente ha schermate di una versione che non esiste più. È stato generato una volta e
  non mantenuto: la regola dello stesso commit non è nel patto o non si sta applicando.
- Il manuale di ripristino comincia con "apri una sessione con l'agente". Se l'agente è un
  prerequisito, non è un manuale per una persona.
- Nessuno fuori dal costruttore ha mai letto il manuale di ripristino. Chiedi a qualcuno di
  seguirlo nell'ambiente di test; ciò che lo blocca è ciò che va corretto.
