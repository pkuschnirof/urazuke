# Passo 13 — Integrazione continua, ambienti, segreti e deployment come parte del prodotto (contratto del gradino)

**Fase:** esercizio (si monta sullo scheletro del gradino 4; si rivede a ogni modifica di
infrastruttura).
**Forma:** un solo invio per montarlo; routine per ogni deployment.
**Dimensione:** obbligatorio in ogni progetto con utenti. In uno piccolo, "integrazione continua"
può essere una sola azione di GitHub e "ambienti" possono essere due cartelle sullo stesso server;
ciò che non si negozia è che i test girino da soli, che la configurazione non stia nel repository, e
che ci sia una via del ritorno.

## A cosa serve

Perché arrivare in produzione sia un pacchetto riproducibile: i test girano UNA volta, la
configurazione vive fuori dal repository, e i segreti non girano in giro. Evita i test eseguiti tre
volte per commit (2.000 minuti di quota in 16 giorni), la chiave del database stampata in una
trascrizione, il CORS che conosceva solo il primo dominio, e la configurazione sovrascritta dalla
batteria di test.

Sui segreti c'è una regola che conviene adottare come riflesso, senza eccezioni: **un segreto che è
stato visto in una chat, in un log o in un commit non è più un segreto**. Non importa se "nessuno
l'ha visto" o se "è stato cancellato dopo". Si ruota. La rotazione costa dieci minuti; scoprire se
qualcuno l'ha usato è impossibile.

## 1. Contesto richiesto

- **Rilevazione di ambienti e accessi**, in modo generico: quali ambienti ci sono (test,
  produzione), dove girano, chi ha accesso, come si promuove qualcosa dall'uno all'altro, quali
  segreti esistono e dove vivono oggi, quanta quota di integrazione continua c'è. L'agente valuta se
  basta e chiede.
- Lo scheletro con la sua integrazione continua e il suo deployment nell'ambiente di test
  (gradino 4).

## 2. Prompt

**Iniziale:**

> We are going to close the path to production. Read the environments and access survey.
> Evaluate whether you have what is needed to deploy to production safely (access, domain,
> where the secrets live, how to roll back); if anything is missing, ask me. Then set up: (1)
> continuous integration runs the full test suite exactly once per commit; (2) the deployment
> waits for that run's result and only packages and uploads, without running tests again; (3)
> each environment's configuration lives on the server (environment file or vault), never in the
> repository; (4) a written procedure to promote from the test environment to production, which
> can be run twice without breaking anything; (5) the rollback, tested; (6) an automatic check
> that prevents committing a secret. Document all of it in `docs/DEPLOYMENT.md` so that a person
> can do it by hand without you. Reply in my language.

Cosa stiamo chiedendo, clausola per clausola: gli accessi prima di cominciare; i test **una sola
volta** per commit (eseguirli tre volte è ciò che ha bruciato la quota); il deployment che solo
impacchetta; la configurazione fuori dal repository; la promozione come procedura ripetibile; il
rollback **provato** (un rollback mai provato non esiste); il lucchetto contro i segreti nei
commit; e la documentazione per una persona, che è il gradino 14 applicato all'infrastruttura.

**Routine di ogni deployment:**

> Before touching production: the test environment is green with the same version; the
> rollback is ready; and tell me what changes in the configuration. After deploying: show me
> the version running in production and an end-to-end check on production, read-only.

Cosa stiamo chiedendo: le tre condizioni preliminari (test in verde con la stessa versione,
rollback pronto, cambiamenti di configurazione annunciati) e le due prove successive (la versione in
esecuzione e una verifica end to end senza scrivere nulla).

**Se un segreto è comparso nella chat o in un commit:**

> That secret is compromised: rotate it now, tell me everywhere else it was used, and add the
> check that would have caught it.

Cosa stiamo chiedendo: rotazione immediata, inventario di dove altro stava, e la verifica che lo
avrebbe rilevato, perché la prossima volta non arrivi alla chat.

## 3. Risultato atteso

- L'integrazione continua che gira una sola volta per commit, con il link a un'esecuzione.
- Il deployment che aspetta l'integrazione e solo impacchetta; misurato: quanto impiega prima e
  dopo.
- La configurazione fuori dal repository; nel repo, solo un esempio senza valori.
- `docs/DEPLOYMENT.md`: come distribuire, promuovere e tornare indietro, passo per passo, per una
  persona.
- Il rollback provato almeno una volta, con la sua prova.
- La verifica anti-segreti attiva (un tentativo di caricarne uno, rifiutato).
- Un registro della quota di integrazione continua consumata al mese.

## 4. Verifica di completezza

- Quante volte gira la batteria per ogni commit? Deve essere una. Chiedi il link.
- C'è qualche valore reale di configurazione (una chiave, una password, un URL interno) nel
  repository? Chiedi all'agente di cercare e di mostrarti la ricerca vuota.
- Riusciresti a seguire `docs/DEPLOYMENT.md` da solo, senza l'agente? Leggilo con questa domanda.
- Il rollback è stato provato? Quando? Quale prova c'è?
- È stato incollato qualche segreto nella chat durante il progetto? Se sì, è stato ruotato?
- Sai quanta quota di integrazione continua resta questo mese?

## 5. Segnali d'allarme

- Il deployment in produzione si fa "a mano, veloce, perché è una modifica piccola". Le modifiche
  piccole sono quelle che rompono la produzione, perché nessuno le testa.
- Il file di esempio della configurazione ha valori che sembrano reali. Probabilmente lo sono.
- Nessuno sa dire quando è stata l'ultima volta che si è provato il rollback.
