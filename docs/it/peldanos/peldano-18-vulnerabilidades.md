# Passo 18 — Scansione e soluzione delle vulnerabilità, nella catena e con un calendario (contratto del gradino)

**Fase:** uscita in produzione.
**Quando:** nella fase di uscita in produzione, dopo il 15 (la scansione gira nell'integrazione
continua) e prima del primo deployment: nessun P0 aperto viene promosso. Poi, a ogni push, e con
un calendario proprio (settimanale) anche se non ci sono push, perché le vulnerabilità nuove
compaiono senza che tu cambi nulla. In un legacy, la prima esecuzione fa parte di N3 (la
dimensione di sicurezza dell'audit) e i rilievi entrano nel backlog con la loro marca di
velocità.
**Forma:** un solo invio per montare ed eseguire; poi, automatico, con un rapporto che leggi tu.
**Dimensione:** obbligatorio in ogni progetto che avrà utenti: la scansione delle dipendenze e
dei segreti non si negozia; l'analisi statica e la linea base di configurazione, proporzionali.

## A cosa serve

L'audit del gradino 13 guarda il sistema con occhi freschi ogni tanto; questo gradino guarda una
cosa sola, la sicurezza, tutto il tempo e a macchina. Sono complementari: l'audit trova ciò che
richiede criterio (una porta di amministratore che nessuno dovrebbe avere
[Ref. 40](../REFERENCIAS.md#ref-40)); la scansione trova ciò che richiede costanza (la dipendenza
che ieri non aveva una vulnerabilità nota e oggi sì [Ref. 41](../REFERENCIAS.md#ref-41)). Il primo
audit di sicurezza formale mi ha convinto che la sicurezza è una routine periodica e non una
lista che si spunta una volta [Ref. 23](../REFERENCIAS.md#ref-23); questo gradino è quella routine
fatta macchina.

E una regola che voglio scritta: **un aggiornamento di dipendenza è una modifica**, ed entra dal
ciclo come qualunque altra. "Ho alzato la versione per chiudere la vulnerabilità" senza
regressione né end to end è il modo più comune di rompere la produzione di venerdì.

**Se sei alle prime armi.** Una *vulnerabilità* è un difetto che qualcuno può usare per entrare,
rubare dati o far fare al sistema qualcosa che non dovrebbe. Ce ne sono di quattro tipi che
questo gradino cerca a macchina. Nelle *dipendenze*: i pezzi di software di altri che il tuo
sistema usa (ci sono basi pubbliche che elencano quali hanno difetti noti, identificati con un
numero CVE). Nel *codice*: l'*analisi statica* legge il codice senza eseguirlo cercando schemi
pericolosi, come un'*injection* (che un utente scriva in un modulo qualcosa che il database
interpreta come un ordine). Nella *storia*: un segreto (una password, una chiave) che una volta è
stato salvato nel repository resta lì anche se dopo è stato cancellato. E nella *configurazione*:
porte aperte che non servivano, password predefinite, *header di sicurezza* (istruzioni che il
server manda al browser per proteggerlo) che mancano.

## 1. Contesto richiesto

Quello che segue è la lista generica. I file concreti che devi avere pronti prima di ogni prompt,
con il loro contenuto e il loro stato minimo, stanno nella sezione 2, nel blocco "Prima di
inviare il prompt" che precede ciascuno.

- L'integrazione continua (gradini 4 e 15), dove gira la scansione.
- La rilevazione degli ambienti: quale server, quale contenitore, quali porte, per la linea base
  di configurazione.
- L'audit precedente (13, o N3), per non riportare ciò che è già noto.
- Il tuo criterio su cosa è P0: ciò che permette di entrare, ciò che espone dati personali, ciò
  che permette di incassare o inviare senza controllo.

## 2. Prompt

**Iniziale (montare, eseguire, proporre):**

**Prima di inviare il prompt**, questo deve esistere, e lo fai tu (o il business con te), non
l'agente:

- L'integrazione continua che gira a ogni push (gradini 4 e 15), con quota sufficiente: la
  scansione aggiunge minuti per esecuzione; informati su quanti te ne restano.
- `docs/ENVIRONMENTS_SURVEY.md` con il server, il contenitore se c'è, le porte esposte e chi
  amministra il dominio, perché l'agente sappia quale linea base applicare.
- `docs/AUDIT_[data].md` (gradino 13 o N3), perché non riporti ciò che è noto.
- Il tuo criterio di P0 in due righe, per il buco del prompt. Per la maggior parte dei sistemi:
  ciò che permette di entrare senza credenziale, ciò che espone dati personali, ciò che permette
  di incassare, inviare o cancellare senza controllo.
- Accesso in lettura dell'agente al server per la linea base di configurazione; se non glielo
  dai, quella parte resta come non scansionata, e lo deve dire.
- Stato minimo accettabile: l'integrazione continua gira, conosci la quota, e hai scritto cosa è
  P0.

> We are going to scan this system for vulnerabilities and fix what matters before production.
> Set up, in continuous integration, on every push and also on a weekly schedule: (1) a scan of
> every dependency against the known vulnerability databases; (2) static analysis of the code for
> the common classes of defect (injection, insecure deserialization, path traversal, weak
> cryptography, hard-coded secrets, insecure defaults); (3) a secrets scan over the whole
> repository history; (4) a check of the server and container configuration against a baseline
> (exposed ports, default credentials, permissions, security headers, transport encryption). Run
> all of it now and write `docs/SECURITY_[date].md` with every finding: where, the risk, the
> evidence, the priority (P0 must be fixed now by my criteria: [criteria]; P1 before production;
> P2 when possible), and whether a fix exists (an upgrade, a patch, a configuration change). If a
> part cannot be scanned from where you are, say so and mark it as not scanned; do not pass it as
> clean. Then propose the fixes for every P0 and P1, one pending item each. Do not apply any
> upgrade yet: an upgrade is a change and goes through the full routine. Reply in my language.

> [it]
> Scansioneremo questo sistema in cerca di vulnerabilità e sistemeremo ciò che conta prima della
> produzione. Predisponi, nell'integrazione continua, a ogni push e anche con un calendario
> settimanale: (1) una scansione di ogni dipendenza contro le basi di vulnerabilità note; (2)
> analisi statica del codice per le classi comuni di difetto (injection, deserializzazione
> insicura, path traversal, crittografia debole, segreti scritti nel codice, valori predefiniti
> insicuri); (3) una scansione dei segreti su tutta la storia del repository; (4) una verifica
> della configurazione del server e del contenitore contro una linea base (porte esposte,
> credenziali predefinite, permessi, header di sicurezza, cifratura del trasporto). Esegui tutto
> adesso e scrivi `docs/SECURITY_[data].md` con ogni rilievo: dove, il rischio, la prova, la
> priorità (P0 va sistemato subito secondo il mio criterio: [criterio]; P1 prima della produzione;
> P2 quando si può), e se esiste una soluzione (un aggiornamento, una patch, una modifica di
> configurazione). Se una parte non si può scansionare da dove sei, dillo e marcala come non
> scansionata; non darla per pulita. Poi proponi le soluzioni per ogni P0 e P1, una voce in
> sospeso ciascuna. Non applicare ancora nessun aggiornamento: un aggiornamento è una modifica e
> passa dalla routine completa. Rispondi nella mia lingua.

Cosa gli sto chiedendo: i quattro strati di scansione (dipendenze, codice, segreti nella storia,
configurazione), nella catena **e con un calendario**, perché le vulnerabilità nuove non aspettano
il tuo prossimo push; il rapporto con la forma del gradino 13, con la clausola di "non
scansionato" invece di "pulito"; il criterio di P0 dato da me; e il divieto di aggiornare senza
passare dal ciclo, che è quello che evita il venerdì rotto.

**Di chiusura (sistemare e trasformare in cancello):**

**Prima di inviare il prompt**, devi avere questo sottomano:

- `docs/SECURITY_[data].md` letto da te, con due rilievi verificati (chiedigli la prova).
- La lista delle soluzioni approvate per il buco del prompt; per ogni aggiornamento di
  dipendenza, la consapevolezza che è una modifica e che eseguirà la regressione e l'end to end.
- Stato minimo accettabile: nessun P0 senza verdetto.

> Fix [list], each as its own pending item, with its test proved red where a test applies (an
> injection that no longer passes, a header that is now present, a secret that is now refused),
> and with the regression suite and the end-to-end suite green after every upgrade. Run the scan
> again and show me it is clean of P0 and P1. Make the scan a gate in `docs/GATES.md`: nothing is
> promoted to production with an open P0, and a new P1 opens a pending item automatically. Record
> the policy, the schedule and what is not covered in `docs/SECURITY.md`.

> [it]
> Sistema [lista], ciascuno come voce in sospeso propria, con il suo test provato in rosso dove un
> test si applica (un'injection che non passa più, un header che adesso c'è, un segreto che adesso
> viene rifiutato), e con la batteria di regressione e quella end to end in verde dopo ogni
> aggiornamento. Esegui di nuovo la scansione e mostrami che è pulita da P0 e P1. Rendi la
> scansione un cancello in `docs/GATES.md`: nulla viene promosso in produzione con un P0 aperto, e
> un P1 nuovo apre automaticamente una voce in sospeso. Registra la politica, il calendario e ciò
> che non è coperto in `docs/SECURITY.md`.

Cosa gli sto chiedendo: una voce in sospeso per soluzione, con il rosso del gradino 8 dove si può
(una vulnerabilità sistemata senza test torna con il prossimo refactor); la scansione ripetuta
come prova; e la conversione in cancello, che è ciò che fa sì che questo gradino resti vivo
quando nessuno lo guarda.

## 3. Risultato atteso

- La scansione in quattro strati che gira a ogni push e settimanalmente.
- `docs/SECURITY_[data].md` con i rilievi e ciò che non è stato scansionato; `docs/SECURITY.md`
  con la politica, il calendario, il cancello e la copertura.
- I P0 e i P1 sistemati, ciascuno con la sua voce in sospeso e il suo test dove si applica.
- Il cancello in `docs/GATES.md`.

## 4. Verifica di completezza

- Chiedigli il link all'ultima esecuzione della scansione: è in verde, e di che data è?
- Il rapporto dice cosa NON ha scansionato?
- Ogni P0 ha la sua voce in sospeso chiusa con prova, o aperta con data?
- Chiedigli di introdurre apposta una dipendenza con vulnerabilità nota in un ramo: la catena va
  in rosso?
- Sai quando gira la prossima scansione programmata?

## 5. Segnali d'allarme

- La scansione è passata pulita al primo colpo in un sistema con più di un mese. Non è quasi mai
  vero: manca uno strato, oppure è stato scansionato solo il ramo e non la storia.
- Sono state aggiornate dieci dipendenze in un commit "per chiudere i rilievi". Quel commit non ha
  né prima né dopo; è il venerdì rotto che aspetta.
- La scansione c'è ma non è un cancello: produce rapporti che nessuno legge.
- C'è un P0 "accettato" senza voce in sospeso né data né firma.
