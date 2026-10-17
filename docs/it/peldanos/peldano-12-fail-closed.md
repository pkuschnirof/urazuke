# Passo 12 — Fail-closed, lucchetti e zero danno silenzioso (contratto del gradino)

**Fase:** esercizio (si progetta prima che il sistema agisca sul mondo; si rivede a ogni nuova
azione con conseguenze).
**Forma:** conversazione: l'agente elenca le azioni con conseguenze, il proprietario conferma quali
portano lucchetto e di che tipo.
**Dimensione:** obbligatorio appena il sistema fa qualcosa di irreversibile (addebitare, inviare,
cancellare, approvare). Un sistema di sola lettura può saltarlo; nel momento in cui guadagna il suo
primo pulsante che agisce sul mondo, questo gradino diventa il più importante.

## A cosa serve

Perché il sistema, davanti a un dubbio o a un guasto, NON agisca, e lo dica. Suona ovvio ed è il
contrario di ciò che il software fa di default, che davanti al dubbio va avanti. Evita il doppio
addebito, l'approvazione automatica senza passare da un umano, il `git add -A` che carica una
credenziale, e la cancellazione dei dati del cliente.

Il principio ha un nome, "fail-closed", e viene dalla sicurezza fisica: una porta di sicurezza che
resta chiusa quando manca la corrente. Il contrario, "fail-open", è la porta che si apre. Nel
software la maggior parte delle cose è fail-open di default: se la validazione fallisce, il codice
prosegue; se il servizio non risponde, si assume che vada tutto bene. Il metodo inverte il default:
**nel dubbio, no**. E si applica tanto al sistema quanto all'agente che lo gestisce.

## 1. Contesto richiesto

- **Rilevazione delle azioni con conseguenze**, nominata così in modo generico: cosa fa il sistema
  che addebita, invia, approva, cancella, o avvisa qualcuno all'esterno; cosa succede se si fa due
  volte; cosa succede se si fa male; come si annulla. Lo sa il business; l'agente valuta se la
  lista è completa e chiede.
- Quali azioni può fare l'agente stesso sul sistema (se è incorporato).

## 2. Prompt

**Iniziale:**

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock. Reply in my language.

Cosa stiamo chiedendo: il confronto tra ciò che il business ha detto e ciò che il codice fa (lì
compaiono le azioni che nessuno ricordava); la clausola di completezza nella sua forma per questo
gradino: le differenze tra le due liste si chiedono, non si risolvono; per ogni azione,
reversibilità, lucchetto e via del ritorno; e la regola generale del fail-closed scritta nel
prompt, perché resti nella tabella e nel codice.

**Di chiusura:**

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.

Cosa stiamo chiedendo: il test per lucchetto **provato in rosso** (senza il lucchetto, l'azione
avveniva; con il lucchetto, no), che è il gradino 7 applicato alla sicurezza; la tabella finale; e la
regola della modalità di prova per ogni automazione nuova, che è ciò che permette di vedere cosa
avrebbe fatto prima di lasciarla fare.

## 3. Risultato atteso

- `docs/LOCKS.md`: una riga per azione con conseguenze: cosa fa, se è reversibile, il lucchetto,
  la via del ritorno, chi l'ha approvata e quando.
- Un test per lucchetto, provato in rosso, che verifica che nel dubbio l'azione non avviene.
- Le automazioni nuove che partono in modalità di prova, con il registro di "avrebbe fatto".
- Se l'agente è incorporato: i suoi permessi scritti (cosa può leggere, cosa può cambiare, cosa
  richiede approvazione).

## 4. Verifica di completezza

- Ogni azione che addebita, invia, approva o cancella è nella tabella? Pensane una che non c'è e
  chiedi.
- Ogni lucchetto ha il suo test in rosso? ("Senza il lucchetto, l'azione avveniva; con il
  lucchetto, no.")
- Ogni azione irreversibile ha una via del ritorno scritta? Se non ce l'ha, serve una doppia
  sicurezza.
- Le automazioni nuove sono partite in modalità di prova? Hai visto il registro di "avrebbe
  fatto" prima di abilitarle?
- Cosa succede se l'agente incorporato tenta qualcosa fuori dai suoi permessi? Chiedigli di
  provarci e di mostrarti il rifiuto nel log.

## 5. Segnali d'allarme

- Un'automazione è passata da "non esiste" a "gira da sola" senza un periodo di modalità di prova.
- Il log non ha nessuna voce di "azione non eseguita per dubbio". O il sistema non dubita mai
  (impossibile) o quando dubita va avanti.
- Un lucchetto si può aggirare con un parametro "per i test". Quel parametro resterà attivo in
  produzione.
