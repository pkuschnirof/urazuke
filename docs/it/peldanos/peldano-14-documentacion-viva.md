# Passo 14 — Documentazione viva e manuali che una persona può seguire senza IA (contratto del gradino)

**Fase:** esercizio (nasce con il sistema; si mantiene a ogni modifica).
**Forma:** routine; più un invio lungo quando si generano i manuali.
**Dimensione:** proporzionale. Un sistema piccolo ha bisogno, come minimo, del manuale di
infrastruttura e ripristino (come si rialza, come si ripristina); quello dell'utente può essere una
pagina. Ciò che non cambia: se la persona che l'ha costruito sparisce, un'altra deve poter
continuare.

## A cosa serve

Perché il sistema si possa usare, mantenere e ripristinare senza l'agente e senza la persona che
l'ha costruito. Se il giorno in cui l'agente non c'è non si può distribuire, non è finito. Nel
metodo classico la documentazione era cara e invecchiava; qui rigenerarla è gratis, quindi la regola
diventa "nello stesso commit" e "riproducibile a mano". Evita il documento non aggiornato che
provocò un commit nel repository sbagliato, e il file di progetto diventato storia.

Un criterio di qualità per il manuale di ripristino, che serve a giudicarlo senza essere tecnici:
**deve poterlo seguire una persona di fiducia che non programma, alle tre del mattino, con il
sistema giù e l'agente senza connessione**. Se in qualche passo dice "consultare lo sviluppatore"
o "secondo il caso", quel passo è incompleto.

## 1. Contesto richiesto

- Chi sono i lettori di ogni manuale: l'utente finale, chi mantiene, chi gestisce l'infrastruttura.
  Lo sa il business; l'agente chiede se non è chiaro.
- Il sistema in esecuzione nell'ambiente di test, per fare screenshot reali.
- `docs/DEPLOYMENT.md` (gradino 13) e `docs/LOCKS.md` (gradino 12), che sono input.

## 2. Prompt

**Routine (va nel patto di convivenza):**

> Every change that modifies what the user sees, what the operator does, or how the system is
> deployed, updates the corresponding manual in the same commit. If you do not know which
> manual, ask.

Cosa stiamo chiedendo: la regola dello stesso commit, che è l'unica che tiene un manuale
aggiornato, e la domanda quando non è chiaro a quale manuale va.

**Per generare i manuali:**

> Generate three manuals from the system as it is today in the test environment: the user
> manual (screen by screen, with real screenshots, in the user's language, no jargon); the
> maintenance manual (how it is built, where everything is, how to run the test suite, how to
> add a module); and the infrastructure and recovery manual (how to deploy, how to roll back,
> how to restore a backup, what to do if it goes down; written for a person who has to do it by
> hand, without AI, at three in the morning). If for any section you need something only the
> business knows (who is responsible for what, which phone number to call), ask me; do not leave
> a gap and do not invent. Each manual carries a date and the system version. Reply in my
> language.

Cosa stiamo chiedendo: i tre manuali con i loro lettori; screenshot **reali** dell'ambiente di test
(non disegni né descrizioni); il criterio delle tre del mattino per quello di ripristino; la clausola
di completezza nella sua forma per documentare: ciò che solo il business sa si chiede, e **non si
lascia un buco né si inventa**; e data e versione, perché si sappia a quale sistema corrisponde ogni
manuale.

## 3. Risultato atteso

- `docs/USER_MANUAL.md` (o HTML), con screenshot reali e incorporati.
- `docs/MAINTENANCE_MANUAL.md`.
- `docs/INFRASTRUCTURE_AND_RECOVERY_MANUAL.md`: passo per passo, per una persona.
- Ciascuno con data e la versione del sistema che documenta.
- Nei commit che cambiano schermate, esercizio o deployment: il manuale aggiornato.

## 4. Verifica di completezza

- Apri il manuale utente a una schermata a caso: lo screenshot coincide con ciò che c'è oggi
  nell'ambiente di test?
- Il manuale di ripristino lo riusciresti a seguire tu, o qualcuno di fiducia che non programma?
  Leggi la sezione "è caduto": dice cosa fare, in ordine, con i comandi?
- Scegli un commit recente che ha cambiato una schermata: ha toccato il manuale?
- C'è un buco tipo "[da completare]" o "consultare il responsabile"? Lì l'agente doveva chiedere.
- Ogni manuale dice per quale versione del sistema vale?

## 5. Segnali d'allarme

- Il manuale utente ha screenshot di una versione che non esiste più. È stato generato una volta e
  non mantenuto: la regola dello stesso commit non è nel patto o non viene applicata.
- Il manuale di ripristino comincia con "apri una sessione con l'agente". Se l'agente è un
  prerequisito, non è un manuale per una persona.
- Nessuno al di fuori del costruttore ha mai letto il manuale di ripristino. Chiedi a qualcuno di
  seguirlo nell'ambiente di test; ciò che lo blocca è ciò che va corretto.
