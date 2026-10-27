# Passo 14 — Fail-closed, lucchetti e zero danno silenzioso (contratto del gradino)

**Fase:** uscita in produzione.
**Quando:** nella fase di uscita in produzione, PRIMA di costruire qualunque funzionalità che
addebiti, invii, approvi o cancelli; si rivede con ogni nuova azione con conseguenze. Le
automazioni nuove partono in modalità di prova e si abilitano dopo averne guardato il registro per
qualche giorno.
**Forma:** conversazione: l'agente elenca le azioni con conseguenze, tu confermi quali portano un
lucchetto e di che tipo.
**Dimensione:** obbligatorio appena il sistema fa qualcosa di irreversibile (addebitare, inviare,
cancellare, approvare). Un sistema di sola lettura può saltarlo; nel momento in cui guadagna il suo
primo pulsante che agisce sul mondo, questo gradino diventa il più importante.

## A cosa serve

Fai in modo che il sistema, davanti a un dubbio o a un guasto, NON agisca, e che lo dica. Suona
ovvio ed è il contrario di ciò che il software fa per default, che davanti al dubbio va avanti.
Evita il doppio addebito, l'approvazione automatica senza passare da un umano, il `git add -A` che
carica una credenziale, e la cancellazione dei dati del cliente. I lucchetti che ho messo alla
Mutua sono il modello: il pulsante di emergenza con doppia sicura, l'approvatore automatico in
modalità di prova, la sentinella con guardie [Ref. 28](../REFERENCIAS.md#ref-28); e il riflesso
per cui un guasto lascia una riga senza il suo pulsante invece di rompere l'intero elenco
[Ref. 25](../REFERENCIAS.md#ref-25).

Il principio ha un nome, "fail-closed", e viene dalla sicurezza fisica: una porta di sicurezza che
resta chiusa quando va via la luce. Il contrario, "fail-open", è la porta che si apre. Nel
software la maggior parte delle cose sono fail-open per default: se la validazione fallisce, il
codice prosegue; se il servizio non risponde, si assume che vada tutto bene. Il metodo inverte il
default: **nel dubbio, no**. E si applica tanto al sistema quanto all'agente che lo opera.

## 1. Contesto richiesto

Quello che segue è la lista generica. I file concreti che devi avere pronti prima di ogni
prompt, con il loro contenuto e il loro stato minimo, stanno nella sezione 2, nel blocco "Prima di
inviare il prompt" che precede ciascuno.

- **Rilevazione delle azioni con conseguenze**, nominata così in forma generica: cosa fa il
  sistema che addebita, invia, approva, cancella, o avvisa qualcuno all'esterno; cosa succede se si
  fa due volte; cosa succede se si fa male; come si annulla. Lo sa il business; l'agente valuta se
  la lista è completa e chiede. L'albero semantico aiuta: ogni processo con conseguenze sta lì.
- Quali azioni può fare l'agente stesso sul sistema (se è incorporato).

## 2. Prompt

**Iniziale:**

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business con te), non
l'agente:

- `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`: la rilevazione delle azioni con conseguenze, scritta con
  il proprietario del dominio. Cosa fa o farà il sistema che addebita, invia, approva, cancella, o
  avvisa qualcuno all'esterno; e per ogni azione: cosa succede se si fa due volte, cosa succede se
  si fa male, come si annulla, e chi dovrebbe poterla fare. I processi dell'albero semantico ti
  danno la lista di partenza: percorrili uno per uno. Il prompt la nomina "the survey of
  consequential actions", senza percorso: salvala con questo nome o digli nella chat dov'è.
- Se l'agente sarà incorporato o residente: quali azioni può fare lui stesso sul sistema, in una
  sezione a parte della stessa rilevazione.
- `docs/SEMANTIC_TREE.md`, aggiornato.
- Stato minimo accettabile: ogni processo dell'albero che agisce sul mondo è nella lista con il
  suo "cosa succede se si fa due volte".

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [it]
> Decidiamo quali azioni del sistema hanno bisogno di un lucchetto. Leggi la rilevazione delle
> azioni con conseguenze, e percorri il codice cercando tutto ciò che addebita, invia, approva,
> cancella o avvisa verso l'esterno. Confronta le due liste: se il codice ha azioni che la
> rilevazione non menziona, o viceversa, chiedimi prima di proseguire. Per ogni azione proponi: se
> è reversibile, quale lucchetto le spetta (conferma esplicita, doppia sicura, modalità di prova,
> limite giornaliero, un umano nel circuito), e qual è la via del ritorno se va male. Regola
> generale: davanti a qualunque dubbio o guasto lungo il percorso, l'azione NON si esegue e si
> registra il motivo. Presentami la tabella; io confermo lucchetto per lucchetto. Rispondi nella
> mia lingua.
>
> Quando hai bisogno di una decisione da parte mia, chiedila con le quattro parti della UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e in questo ordine: i dati che rendono necessaria la domanda,
> elencati; un paragrafo di non più di cinque righe che li colleghi e lasci vedere
> l'interrogativo; la domanda con le sue possibili risposte numerate; e la tua raccomandazione.
> Dillo alla profondità tecnica che il progetto ha dichiarato in `communication_depth`
> —`beginner`, `decision_maker` o `technical`—; se il progetto non ne ha dichiarata nessuna, usa
> `decision_maker`.

Cosa gli sto chiedendo: l'incrocio tra ciò che il business ha detto e ciò che il codice fa (lì
compaiono le azioni che nessuno ricordava); la clausola di completezza nella sua forma per questo
gradino: le differenze tra le due liste si chiedono, non si risolvono; per ogni azione,
reversibilità, lucchetto e via del ritorno; e la regola generale del fail-closed scritta nel
prompt, perché resti nella tabella e nel codice.

**Di chiusura:**

**Prima di inviare il prompt**, devi avere questo a portata di mano:

- La tabella che l'agente ha presentato, letta lucchetto per lucchetto con il proprietario; per
  ogni riga, la tua conferma o il tuo cambiamento, scritti per gli spazi [list], [X] e [Y] del
  prompt.
- Stato minimo accettabile: non c'è riga senza verdetto. Un lucchetto non confermato è un
  lucchetto che non si implementerà.

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [it]
> Confermo i lucchetti [lista]; cambia [X] in [Y]. Implementali con un test per lucchetto che
> provi che, nella condizione di dubbio, l'azione NON avviene (provato in rosso contro la versione
> senza il lucchetto). Registra la tabella finale in `docs/LOCKS.md`. E per ogni automazione nuova:
> prima la modalità di prova, registrando ciò che avrebbe fatto, finché non la abilito io.
>
> Quando hai bisogno di una decisione da parte mia, chiedila con le quattro parti della UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e in questo ordine: i dati che rendono necessaria la domanda,
> elencati; un paragrafo di non più di cinque righe che li colleghi e lasci vedere
> l'interrogativo; la domanda con le sue possibili risposte numerate; e la tua raccomandazione.
> Dillo alla profondità tecnica che il progetto ha dichiarato in `communication_depth`
> —`beginner`, `decision_maker` o `technical`—; se il progetto non ne ha dichiarata nessuna, usa
> `decision_maker`.

Cosa gli sto chiedendo: il test per lucchetto **provato in rosso** (senza il lucchetto, l'azione
avveniva; con il lucchetto, no), che è il gradino 8 applicato alla sicurezza; la tabella finale; e
la regola della modalità di prova per ogni automazione nuova, che è ciò che permette di vedere cosa
avrebbe fatto prima di lasciarla fare.

## 3. Risultato atteso

- `docs/LOCKS.md`: una riga per azione con conseguenze: cosa fa, se è reversibile, il lucchetto,
  la via del ritorno, chi l'ha approvato e quando.
- Un test per lucchetto, provato in rosso, che verifica che nel dubbio l'azione non avviene.
- Le automazioni nuove che partono in modalità di prova, con il registro di "avrebbe fatto".
- Se l'agente è incorporato: i suoi permessi scritti (cosa può leggere, cosa può cambiare, cosa
  richiede approvazione).

## 4. Verifica di completezza

- Ogni azione che addebita, invia, approva o cancella sta nella tabella? Pensane una che non c'è
  e chiedi.
- Ogni lucchetto ha il suo test in rosso? ("Senza il lucchetto, l'azione avveniva; con il
  lucchetto, no.")
- Ogni azione irreversibile ha una via del ritorno scritta? Se non ce l'ha, ha bisogno di una
  doppia sicura.
- Le automazioni nuove sono partite in modalità di prova? Hai visto il registro di "avrebbe
  fatto" prima di abilitarle?
- Cosa succede se l'agente incorporato tenta qualcosa fuori dai suoi permessi? Chiedigli di
  provarci e di mostrarti il rifiuto nel log.

## 5. Segnali d'allarme

- Un'automazione è passata da "non esiste" a "gira da sola" senza un periodo di modalità di prova.
- Il log non ha nessuna voce di "azione non eseguita per dubbio". O il sistema non dubita mai
  (impossibile) o quando dubita va avanti.
- Un lucchetto si può saltare con un parametro "per i test". Quel parametro resterà impostato in
  produzione.
