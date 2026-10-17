# I contratti di gradino

Un file per gradino. Ciascuno ha lo stesso scheletro: l'intestazione con fase, forma e dimensione
(obbligatorio o proporzionale); a cosa serve; (1) contesto richiesto, nominato in modo generico;
(2) i prompt, **in inglese**, ciascuno seguito dalla spiegazione nella lingua del lettore di cosa
stiamo chiedendo e perché ogni clausola è lì; (3) il risultato atteso, con le sue caratteristiche;
(4) la verifica di completezza, che il proprietario fa senza leggere codice; (5) i segnali
d'allarme, i sintomi di un gradino salito male.

I prompt in inglese sono un unico pezzo, identico in tutte le versioni del documento nelle otto
lingue; `node build/build.mjs` li estrae in `prompts/` e verifica che nessuna traduzione li abbia
alterati.

Sono scritti a partire da ciò che abbiamo fatto nei tre repository, non ancora eseguiti così come
sono. Il primo progetto che li userà dall'inizio alla fine ne correggerà diversi: fa parte del
gradino 15.

| Gradino | File | Fase | Forma |
|---|---|---|---|
| 0 — Questo progetto si può affrontare così? | `peldano-00-elegibilidad.md` | avvio | conversazione (in elaborazione con Pablo) |
| 1 — Il patto di convivenza | `peldano-01-contrato-de-convivencia.md` | avvio | un solo invio + aggiustamento |
| 2 — Definizione del progetto e lettura obbligatoria | `peldano-02-definicion-y-lectura.md` | avvio | conversazione |
| 3 — Dimensionare prima dell'architettura | `peldano-03-dimensionar.md` | avvio | conversazione |
| 4 — Lo scheletro con i suoi cancelli | `peldano-04-esqueleto.md` | avvio | un invio lungo + approvazione visiva |
| 5 — Il piano sono le voci in sospeso | `peldano-05-pendientes.md` | ciclo | un invio + routine |
| 6 — Le decisioni si scrivono accanto al codice | `peldano-06-decisiones.md` | ciclo | breve conversazione, ogni volta |
| 7 — I test come lucchetti, provati in rosso | `peldano-07-tests-en-rojo.md` | ciclo | routine di ogni modifica |
| 8 — Simmetria produttore/consumatore e anti-pattern | `peldano-08-simetria-y-antipatrones.md` | ciclo | automatica + un file che cresce |
| 9 — Misurare prima di costruire | `peldano-09-medir.md` | ciclo | un invio per misurazione |
| 10 — Verifica onesta e rapporto proporzionato | `peldano-10-verificacion-honesta.md` | ciclo | routine di ogni rapporto |
| 11 — L'audit periodico come input del piano | `peldano-11-auditoria.md` | esercizio | un invio lungo, auditor diverso |
| 12 — Fail-closed, lucchetti e zero danno silenzioso | `peldano-12-fail-closed.md` | esercizio | conversazione |
| 13 — Integrazione continua, ambienti, segreti e deployment | `peldano-13-ci-entornos-secretos-deploy.md` | esercizio | un invio + routine di deployment |
| 14 — Documentazione viva e manuali senza IA | `peldano-14-documentacion-viva.md` | esercizio | routine + un invio lungo |
| 15 — L'agente residente e la retrospettiva con i numeri | `peldano-15-agente-residente-y-retrospectiva.md` | esercizio e chiusura | due parti |

Fasi: **avvio** si sale una volta per progetto; **ciclo** si ripete a ogni modifica; **esercizio**
quando il sistema è già vivo. Il 15 torna allo 0 per il progetto successivo. I nomi dei file
restano in spagnolo in tutte le lingue perché gli strumenti di build li riconoscano.
