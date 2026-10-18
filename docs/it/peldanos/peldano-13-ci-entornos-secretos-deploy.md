# Passo 13 — Integrazione continua, ambienti, segreti e deployment come parte del prodotto (contratto del gradino)

**Fase:** esercizio.
**Quando:** la catena di integrazione e il deployment all'ambiente di test si montano nel gradino
4. La chiusura verso la produzione —ambiente reale, segreti sul server, promozione, rollback
provato, lucchetto contro i segreti— si fa nella fase di uscita, dopo l'audit e dopo i lucchetti.
La routine di ogni deployment si applica per tutto l'esercizio.
**Forma:** un solo invio per montarlo; routine per ogni deployment.
**Dimensione:** obbligatorio in ogni progetto con utenti. In uno piccolo, "integrazione continua"
può essere una sola action di GitHub e "ambienti" possono essere due cartelle sullo stesso server;
ciò che non si negozia è che i test girino da soli, che la configurazione non stia nel repository,
e che ci sia un rollback.

## A cosa serve

Fai in modo che arrivare in produzione sia un pacchetto riproducibile: i test girano UNA volta, la
configurazione vive fuori dal repository, e i segreti non vanno in giro. Evita i test eseguiti tre
volte per commit e la quota bruciata [Ref. 39](../REFERENCIAS.md#ref-39), il deployment irrobustito
a colpi di voci in sospeso per averlo scoperto tardi [Ref. 32](../REFERENCIAS.md#ref-32), e i
segreti incollati nella chat [Ref. 42](../REFERENCIAS.md#ref-42).

Sui segreti c'è una regola che devi adottare come riflesso, senza eccezioni: **un segreto che è
stato visto in una chat, in un log o in un commit non è più un segreto**. Non importa se "nessuno
l'ha visto" o se "è stato cancellato dopo". Si ruota. La rotazione costa dieci minuti; scoprire se
qualcuno l'ha usato è impossibile.

## 1. Contesto richiesto

Quello che segue è la lista generica. I file concreti che devi avere pronti prima di ogni
prompt, con il loro contenuto e il loro stato minimo, stanno nella sezione 2, nel blocco "Prima di
inviare il prompt" che precede ciascuno.

- **Rilevazione di ambienti e accessi**, in forma generica: quali ambienti ci sono (test,
  produzione), dove girano, chi ha accesso, come si promuove qualcosa dall'uno all'altro, quali
  segreti esistono e dove vivono oggi, quanta quota di integrazione continua c'è. L'agente valuta
  se basta e chiede.
- Lo scheletro con la sua integrazione continua e il suo deployment in test (gradino 4).

## 2. Prompt

**Iniziale:**

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business con te), non
l'agente:

- `docs/ENVIRONMENTS_SURVEY.md` (gradino 4), completato con ciò che manca per la produzione: il
  dominio e chi lo amministra; dove vivranno i segreti sul server (file di ambiente, vault) e
  quali sono (il nome, mai il valore); come si promuove oggi qualcosa da test a produzione, se c'è
  qualcosa; chi può toccare la produzione; quanta quota di integrazione continua hai (il limite
  del piano del tuo fornitore) e quanta ne hai consumata; come si farebbe oggi un rollback. Il
  prompt la nomina "the environments and access survey": digli dov'è.
- L'accesso alla produzione per l'agente, deciso da te: quale, con quale credenziale, e la
  credenziale fuori dal repository e dalla chat.
- Lo scheletro con la sua integrazione continua e il suo deployment in test funzionanti (gradino
  4), e `docs/STATUS.md` con i comandi.
- Stato minimo accettabile: sai dove vivranno i segreti e quanta quota ti resta. Se non sai la
  quota, informati prima: questo gradino esiste in parte per questo.

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

> [it]
> Chiudiamo il percorso verso la produzione. Leggi la rilevazione di ambienti e accessi. Valuta se
> hai ciò che serve per distribuire in produzione in sicurezza (accesso, dominio, dove vivono i
> segreti, come tornare indietro); se manca qualcosa, chiedimelo. Poi predisponi: (1)
> l'integrazione continua esegue la batteria completa esattamente una volta per commit; (2) il
> deployment aspetta il risultato di quell'esecuzione e si limita a impacchettare e caricare, senza
> rieseguire i test; (3) la configurazione di ogni ambiente vive sul server (file di ambiente o
> cassaforte), mai nel repository; (4) una procedura scritta per promuovere dall'ambiente di test
> alla produzione, che si possa eseguire due volte senza rompere nulla; (5) il rollback, provato;
> (6) una verifica automatica che impedisca di committare un segreto. Documenta tutto in
> `docs/DEPLOYMENT.md` in modo che una persona possa farlo a mano senza di te. Rispondi nella mia
> lingua.

Cosa gli sto chiedendo, clausola per clausola: gli accessi prima di cominciare; i test **una sola
volta** per commit (eseguirli tre volte è ciò che ha bruciato la quota); il deployment che si
limita a impacchettare; la configurazione fuori dal repository; la promozione come procedura
ripetibile; il rollback **provato** (un rollback che non è mai stato provato non esiste); il
lucchetto contro i segreti nei commit; e la documentazione per una persona, che è il gradino 14
applicato all'infrastruttura.

**Routine di ogni deployment:**

**Prima di inviare il prompt**, devi avere questo a portata di mano:

- `docs/WORKING_AGREEMENT.md`, dove va la routine.
- `docs/DEPLOYMENT.md` (il prompt iniziale di questo gradino), scritto e letto da te: lo potresti
  seguire da solo?
- Prima di ogni deployment reale, inoltre: la batteria completa end to end in verde con la
  versione esatta (gradino 7, chiusura di blocco), e l'audit fatto se è il primo deployment
  (gradino 11).
- Stato minimo accettabile: il rollback è stato provato almeno una volta prima che ci siano
  utenti.

> Before touching production: the test environment is green with the same version; the
> rollback is ready; and tell me what changes in the configuration. After deploying: show me
> the version running in production and an end-to-end check on production, read-only.

> [it]
> Prima di toccare la produzione: l'ambiente di test è in verde con la stessa versione; il
> rollback è pronto; e dimmi cosa cambia nella configurazione. Dopo il deployment: mostrami la
> versione che gira in produzione e una verifica end to end sulla produzione, in sola lettura.

Cosa gli sto chiedendo: le tre condizioni preliminari (test in verde con la stessa versione,
rollback pronto, modifiche di configurazione annunciate) e le due prove successive (la versione in
esecuzione e una verifica end to end senza scrivere nulla).

**Se un segreto è comparso nella chat o in un commit:**

**Prima di inviare il prompt**, devi avere questo a portata di mano:

- Il segreto identificato: qual è (il suo nome, mai il suo valore), dove è comparso (la chat, un
  commit, un log) e quando. Se è comparso in un commit, il commit.
- Il tuo accesso al posto in cui si genera (il pannello del fornitore), nel caso l'agente non
  possa ruotarlo da solo. La rotazione la fai tu o la fa lui con la tua credenziale, ma non si
  rimanda.
- Stato minimo accettabile: sai nominare il segreto e dove è stato visto. E la regola senza
  eccezioni: questo prompt non si manda "più tardi".

> That secret is compromised: rotate it now, tell me everywhere else it was used, and add the
> check that would have caught it.

> [it]
> Quel segreto è compromesso: ruotalo adesso, dimmi in quali altri posti è stato usato, e aggiungi
> la verifica che l'avrebbe intercettato.

Cosa gli sto chiedendo: rotazione immediata, inventario di dove altro stava, e la verifica che lo
avrebbe rilevato, perché la prossima volta non arrivi alla chat.

## 3. Risultato atteso

- L'integrazione continua che gira una sola volta per commit, con il link a un'esecuzione.
- Il deployment che aspetta l'integrazione e si limita a impacchettare; misurato: quanto ci mette
  prima e dopo.
- La configurazione fuori dal repository; nel repo, solo un esempio senza valori.
- `docs/DEPLOYMENT.md`: come distribuire, promuovere e tornare indietro, passo per passo, per una
  persona.
- Il rollback provato almeno una volta, con la sua prova.
- La verifica anti-segreti attiva (un tentativo di caricarne uno, respinto).
- Un registro della quota di integrazione continua consumata per mese.

## 4. Verifica di completezza

- Quante volte gira la batteria per ogni commit? Deve essere una. Chiedi il link.
- C'è qualche valore reale di configurazione (una chiave, una password, una URL interna) nel
  repository? Chiedi all'agente di cercare e di mostrarti la ricerca vuota.
- Potresti seguire `docs/DEPLOYMENT.md` da solo, senza l'agente? Leggilo con quella domanda.
- Il rollback è stato provato? Quando? Che prova c'è?
- È stato incollato qualche segreto nella chat durante il progetto? Se sì, è stato ruotato?
- Sai quanta quota di integrazione continua resta questo mese?

## 5. Segnali d'allarme

- Il deployment in produzione si fa "a mano, veloce, perché è una modifica piccola". Le modifiche
  piccole sono quelle che rompono la produzione, perché nessuno le prova.
- Il file di esempio della configurazione ha valori che sembrano reali. Probabilmente lo sono.
- Nessuno sa dire quando è stata l'ultima volta che si è provato il rollback.
