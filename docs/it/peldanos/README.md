# I contratti di gradino

Un file per gradino. Hanno tutti lo stesso scheletro, e ce l'hanno di proposito, perché tu possa
confrontarli e perché, col tempo, il riflesso di leggerli diventi automatico: l'intestazione con la
fase, il quando, la forma e la dimensione (obbligatorio o proporzionale); a cosa serve; (1) il
contesto richiesto, nominato in forma generica; (2) i prompt, **in inglese**, ciascuno preceduto
da un blocco **"Prima di inviare il prompt"** (i file e gli input che devi avere pronti tu prima
di incollarlo, con il loro contenuto e il loro stato minimo), seguito dalla sua traduzione e,
sotto, dalla spiegazione di cosa sto chiedendo al modello e perché ogni clausola è lì; (3) il
risultato atteso, con le sue caratteristiche; (4) la verifica di completezza, che fai senza
leggere codice; (5) i segnali d'allarme, i sintomi di un gradino salito male.

I prompt in inglese sono un unico pezzo, identico nelle otto versioni del documento;
`node build/build.mjs` li estrae in `prompts/` e verifica che nessuna traduzione li abbia
alterati. La traduzione che accompagna ogni prompt è perché tu lo capisca; al modello si incolla
l'inglese.

Li ho scritti a partire da ciò che ho fatto in tre sistemi che oggi sono in produzione, non li ho
ancora eseguiti così come sono. Il primo progetto che li userà dall'inizio alla fine ne correggerà
diversi; fa parte del gradino 15. Quando un contratto cita un caso reale, lo fa con una marca
`[Ref. N]` che rimanda al [documento delle referenze](../REFERENCIAS.md); la procedura resta
pulita e il dettaglio è a un clic.

| Gradino | File | Fase | Quando |
|---|---|---|---|
| 0 — Questo progetto si può affrontare così? | `peldano-00-elegibilidad.md` | avvio | prima settimana, prima di tutto |
| 1 — Il patto di convivenza | `peldano-01-contrato-de-convivencia.md` | avvio | prima settimana, dopo l'idoneità |
| 2 — Definizione del progetto e lettura obbligatoria | `peldano-02-definicion-y-lectura.md` | avvio | prima settimana; si mantiene sempre |
| 3 — Dimensionare prima dell'architettura | `peldano-03-dimensionar.md` | avvio | prima settimana, prima dello scheletro |
| 4 — Lo scheletro con i suoi cancelli | `peldano-04-esqueleto.md` | avvio | chiusura della prima settimana |
| 5 — Il piano sono le voci in sospeso | `peldano-05-pendientes.md` | ciclo | all'apertura di ogni blocco; ogni sessione |
| 6 — Le decisioni si scrivono accanto al codice | `peldano-06-decisiones.md` | ciclo | ogni volta che manca una regola |
| 7 — I test come lucchetti, provati in rosso | `peldano-07-tests-en-rojo.md` | ciclo | alla chiusura di ogni voce in sospeso |
| 8 — Simmetria produttore/consumatore e anti-pattern | `peldano-08-simetria-y-antipatrones.md` | ciclo | a ogni modifica di contratto |
| 9 — Misurare prima di costruire | `peldano-09-medir.md` | ciclo | prima di costruire su un numero |
| 10 — Verifica onesta e rapporto proporzionato | `peldano-10-verificacion-honesta.md` | ciclo | in ogni rapporto |
| 11 — L'audit periodico come input del piano | `peldano-11-auditoria.md` | esercizio | prima della produzione; poi, periodico |
| 12 — Fail-closed, lucchetti e zero danno silenzioso | `peldano-12-fail-closed.md` | esercizio | prima di costruire ciò che agisce sul mondo |
| 13 — Integrazione continua, ambienti, segreti e deployment | `peldano-13-ci-entornos-secretos-deploy.md` | esercizio | chiusura verso la produzione; routine a ogni deployment |
| 14 — Documentazione viva e manuali senza IA | `peldano-14-documentacion-viva.md` | esercizio | alla chiusura di ogni blocco; completi prima della produzione |
| 15 — L'agente residente e la retrospettiva con i numeri | `peldano-15-agente-residente-y-retrospectiva.md` | esercizio e chiusura | all'entrata in esercizio; alla chiusura di ogni tappa |
| 16 — Osservabilità e tracciabilità totali, con livello configurabile | `peldano-16-observabilidad-y-trazabilidad.md` | qualità operativa | uscita in produzione, dopo il 13 e prima del 19 |
| 17 — Ottimizzazione dello strato di persistenza | `peldano-17-persistencia.md` | qualità operativa | uscita in produzione, dopo il 16 e prima del 19; si ripete quando una query esce dal range |
| 18 — Scansione e soluzione delle vulnerabilità | `peldano-18-vulnerabilidades.md` | qualità operativa | prima del primo deployment; poi, a ogni push e settimanale |
| 19 — Prove di rendimento e punto di rottura | `peldano-19-rendimiento-y-punto-de-ruptura.md` | qualità operativa | prima del primo deployment; prima di ogni deployment che cambi architettura, persistenza o un flusso critico |
| 20 — Monitoraggio di risorse e rendimento, rapporto ciclico | `peldano-20-monitoreo-de-recursos-y-rendimiento.md` | qualità operativa | settimana del primo deployment; poi, gira da solo e si legge a ogni ciclo |
| 21 — Monitoraggio degli errori, rapporto ciclico | `peldano-21-monitoreo-de-errores.md` | qualità operativa | settimana del primo deployment, insieme al 20 |

Fasi: **avvio** si sale una volta per progetto; **ciclo** si ripete a ogni modifica; **esercizio**
quando il sistema è già vivo. Il 15 torna allo 0 per il progetto successivo. La linea del tempo
completa, con ciò che succede tra un gradino e l'altro, è nella Parte B del documento principale.
I nomi dei file restano in spagnolo in tutte le lingue perché gli strumenti di build li
riconoscano.
