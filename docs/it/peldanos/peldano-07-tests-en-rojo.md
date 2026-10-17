# Passo 7 — I test come lucchetti, provati in rosso (contratto del gradino)

**Fase:** ciclo (ogni modifica).
**Forma:** un solo invio; l'agente esegue e riferisce, il proprietario legge il rapporto.
**Dimensione:** obbligatorio in ogni progetto. È il cuore del metodo: se c'è un gradino che non si
negozia, è questo.

## A cosa serve

Un test che non hai mai visto fallire non sai se prova qualcosa. La regola qui non è "scrivi
test": è "dimostra che il test diventa rosso contro il codice vecchio, e poi verde con il nuovo".
Evita i test che passano perché non provano nulla, e il verde che nasconde un bug.

Perché questo conta più con un modello che con un programmatore umano: il modello scrive il codice e
il test **nella stessa sessione, con la stessa comprensione**. Se ha capito male la richiesta, il
test proverà ciò che ha capito, e passerà. Il rosso contro il codice vecchio è l'unico modo
economico per verificare che il test guarda ciò che conta: se il codice vecchio lo passa, il test
non distingue il prima dal dopo, e allora non serve.

## 1. Contesto richiesto

- La modifica già implementata (di default i test vengono dopo l'implementazione; "prima il test"
  resta un'opzione per perimetri piccoli e ben definiti).
- La voce in sospeso che origina la modifica, con il suo "come si verifica".
- La batteria esistente e il comando per eseguirla (gradino 4).

## 2. Prompt

**Routine (va nel patto di convivenza; si applica a ogni modifica):**

> To close this pending item I need evidence, not your word. (1) Write the test that proves what
> the item asks for. (2) Demonstrate that this test fails against the previous code: you may
> temporarily revert the change, or run the test against the old version, but show me the red
> output. (3) Show me the green output with the change. (4) Run the regression suite for the
> neighbouring items and show me it is still green. (5) Do not replace with mocks the very part
> you are trying to test. If testing end to end requires something you lack (data, access, an
> environment), ask me for it; do not simulate what you do not have. Finally, the commit message
> says "proved red against [what]" and the test counts.

Cosa stiamo chiedendo, clausola per clausola: (1) il test; (2) **il rosso dimostrato**, con
l'output in vista, che è la clausola che distingue questo metodo da "scrivi test"; (3) il verde;
(4) la regressione dei vicini nella stessa sessione, perché una modifica rompe cose accanto; (5)
non simulare proprio ciò che si prova; e la clausola di completezza adattata a questo gradino: se
manca qualcosa per provare end to end, **chiederlo, non simularlo**. Il messaggio di commit con i
numeri lascia la prova dove vive il codice.

**Quando l'agente dice che non si può testare:**

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

Cosa stiamo chiedendo: che "non si può testare" non sia la fine della conversazione ma l'inizio di
una voce in sospeso. La non testabilità è debito, e il debito si registra.

## 3. Risultato atteso

- Il nuovo test nel repository, intitolato con la voce che chiude.
- Nel rapporto dell'agente e nel messaggio del commit: l'output in rosso (quanti falliscono, contro
  quale versione), l'output in verde, e la regressione in verde con i suoi numeri.
- Se è stato provato end to end (schermata → backend), la prova che il backend è cambiato (la riga,
  il record, lo stato).

## 4. Verifica di completezza

- Il rapporto mostra il rosso? Con numeri: "4 su 8 falliscono contro il criterio vecchio". Se
  mostra solo verde, il gradino non è salito.
- La regressione è girata nella stessa sessione? Quanti test, quanti in verde?
- C'è qualche parte "simulata" (mock) proprio dov'è la modifica? Chiedi all'agente cosa ha
  simulato e perché.
- Il commit cita la voce e dice "provato in rosso"?
- Se il test è di schermata, verifica anche l'effetto nel backend?

## 5. Segnali d'allarme

- Tutti i nuovi test della settimana sono passati in verde al primo colpo, e non si è mai mostrato
  un rosso. O l'agente sta saltando il passo o i test non provano nulla.
- La batteria impiega sempre più tempo e nessuno sa perché. Di solito i test end to end sono stati
  sostituiti da simulazioni "perché giri veloce".
- L'agente riferisce "i test passano" senza dire quanti. Sempre con i numeri.
