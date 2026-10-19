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
diversi; fa parte del gradino 23. Quando un contratto cita un caso reale, lo fa con una marca
`[Ref. N]` che rimanda al [documento delle referenze](../REFERENCIAS.md); la procedura resta
pulita e il dettaglio è a un clic.

| Gradino | File | Fase | Quando |
|---|---|---|---|
| 0 — Questo progetto si può affrontare così? | `peldano-00-elegibilidad.md` | avvio | prima di tutto |
| 1 — Il patto di convivenza | `peldano-01-contrato-de-convivencia.md` | avvio | dopo l'idoneità |
| 2 — Definizione del progetto e lettura obbligatoria | `peldano-02-definicion-y-lectura.md` | avvio | dopo il patto; si mantiene sempre |
| 3 — Dimensionare prima dell'architettura | `peldano-03-dimensionar.md` | avvio | dopo la definizione, prima dello scheletro |
| 4 — Lo scheletro con i suoi cancelli | `peldano-04-esqueleto.md` | avvio | chiusura dell'avvio |
| 5 — Il piano sono le voci in sospeso | `peldano-05-pendientes.md` | ciclo | all'apertura di ogni blocco; ogni sessione |
| 6 — Le decisioni si scrivono accanto al codice | `peldano-06-decisiones.md` | ciclo | ogni volta che manca una regola |
| 7 — Misurare prima di costruire | `peldano-07-medir.md` | ciclo | prima di costruire su un numero |
| 8 — I test come lucchetti, provati in rosso | `peldano-08-tests-en-rojo.md` | ciclo | alla chiusura di ogni voce in sospeso |
| 9 — Qualità del codice verificata dalla macchina | `peldano-09-calidad-de-codigo.md` | ciclo | si monta all'apertura del primo blocco; gira a ogni commit |
| 10 — Casi di prova manuale insieme alla funzionalità | `peldano-10-casos-de-prueba-manual.md` | ciclo | con ogni voce in sospeso; esecuzione umana alla chiusura di ogni blocco, nell'accettazione e dopo ogni deployment |
| 11 — Simmetria produttore/consumatore e anti-pattern | `peldano-11-simetria-y-antipatrones.md` | ciclo | a ogni modifica di contratto |
| 12 — Verifica onesta e rapporto proporzionato | `peldano-12-verificacion-honesta.md` | ciclo | in ogni rapporto |
| 13 — L'audit periodico come input del piano | `peldano-13-auditoria.md` | uscita in produzione | prima della produzione; poi, periodico |
| 14 — Fail-closed, lucchetti e zero danno silenzioso | `peldano-14-fail-closed.md` | uscita in produzione | prima di costruire ciò che agisce sul mondo |
| 15 — Integrazione continua, ambienti, segreti e deployment | `peldano-15-ci-entornos-secretos-deploy.md` | uscita in produzione | chiusura verso la produzione; routine a ogni deployment |
| 16 — Osservabilità e tracciabilità totali, con livello configurabile | `peldano-16-observabilidad-y-trazabilidad.md` | uscita in produzione | uscita in produzione, dopo il 15 e prima del 19 |
| 17 — Ottimizzazione dello strato di persistenza | `peldano-17-persistencia.md` | uscita in produzione | uscita in produzione, dopo il 16 e prima del 19; si ripete quando una query esce dal range |
| 18 — Scansione e soluzione delle vulnerabilità | `peldano-18-vulnerabilidades.md` | uscita in produzione | prima del primo deployment; poi, a ogni push e settimanale |
| 19 — Prove di rendimento e punto di rottura | `peldano-19-rendimiento-y-punto-de-ruptura.md` | uscita in produzione | prima del primo deployment; prima di ogni deployment che cambi architettura, persistenza o un flusso critico |
| 20 — Documentazione viva e manuali senza IA | `peldano-20-documentacion-viva.md` | uscita in produzione | alla chiusura di ogni blocco; completi prima della produzione |
| 21 — Monitoraggio di risorse e rendimento, rapporto ciclico | `peldano-21-monitoreo-de-recursos-y-rendimiento.md` | esercizio | con il primo deployment; poi, gira da solo e si legge a ogni ciclo |
| 22 — Monitoraggio degli errori, rapporto ciclico | `peldano-22-monitoreo-de-errores.md` | esercizio | con il primo deployment, insieme al 21 |
| 23 — L'agente residente e la retrospettiva con i numeri | `peldano-23-agente-residente-y-retrospectiva.md` | esercizio | all'entrata in esercizio; alla chiusura di ogni tappa |

Fasi: **avvio** si sale una volta per progetto; **ciclo** si ripete a ogni modifica; **esercizio**
quando il sistema è già vivo. Il 23 torna allo 0 per il progetto successivo. La linea del tempo
completa, con ciò che succede tra un gradino e l'altro, è nella Parte B del documento principale.
I nomi dei file restano in spagnolo in tutte le lingue perché gli strumenti di build li
riconoscano.
