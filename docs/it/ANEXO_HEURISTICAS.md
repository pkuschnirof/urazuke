# Allegato H — Euristiche di qualità del codice e di usabilità

**Stato: APPROVATO — FORMA E SEVERITÀ INIZIALI.** Non resta nessuna decisione aperta. La forma (D-043 e D-044), gli interruttori (D-045 e D-046), il cruscotto (D-047) e le severità iniziali con il peso dell'accessibilità (D-048, sezione 10) sono decise. Resta solo il calendario: la traduzione esiste in tedesco, inglese, portoghese, francese e italiano; mancano giapponese e cinese, e solo con loro il testo entra nell'API dei prompt. Data: 2026-10-22.

Registro delle decisioni di questo allegato: `docs/DECISIONES.md`, da D-043 a D-048. Il cruscotto di conformità (sezione 12) è stato deciso con due cifre in D-047. Il lavoro di implementazione vive in PND-002.

## 1. Cosa manca oggi, e perché

Il gradino 9 misura già il codice, e lo fa con un cancello che non lascia passare: un solo formattatore, limiti di dimensione (trecento righe per file, quaranta per funzione), complessità per funzione, codice duplicato, codice morto, dipendenze dichiarate e usate, copertura con cricchetto e prove di mutazione dove ci sono utenti reali. Il numero resta scritto in `docs/CODE_QUALITY.md`. Questo è risolto.

Non è risolta l'altra metà del prodotto. Ho verificato il corpus dei gradini: non c'è una sola menzione di usabilità, di persone/profili né di raggruppamento funzionale. L'interfaccia oggi si regge su due cose: la cattura che il proprietario guarda dieci secondi e i casi di prova manuale. Sono entrambe buone ed entrambe umane, care e smemorate. Un sistema può superare il cancello di qualità con lode ed essere inusabile: tutto verde, e la persona non trova dove incassare.

E c'è un problema di secondo livello che è tecnico ma si nota nell'interfaccia: quando lo stesso prodotto lo usano più profili (amministrazione, operatività, consultazione, cliente), le funzionalità si abilitano in tre posti diversi — il database, il menu e la guardia della rotta — che si scrivono in momenti diversi e si disallineano da soli. Il sintomo è sempre lo stesso: qualcuno vede un pulsante che non gli spetta, o peggio, qualcuno che ha il permesso non trova la schermata.

Le due euristiche che seguono attaccano queste due cose con la stessa forma: un catalogo corto di enunciati verificabili, pochi strumenti che li misurano da soli, e una via di eccezione dichiarata per quando il progetto ha bisogno di uscire.

## 2. Il modello: tre strati, una sola forma della regola

La tentazione è fare un elenco di regole e legarlo allo stack del primo progetto. Invecchia male: la regola di React non vale in Angular, quella di Angular non vale in un server con template, e in due anni metà elenco è morto. La proposta separa tre strati.

**Strato 1 — Nucleo agnostico (non si negozia).** Enunciati su risultati, non su strumenti. "C'è un solo formattatore e nessuno discute con lui" vale uguale in TypeScript, PHP o Go. Il nucleo si enumera con identificatori stabili e non cambia da progetto a progetto.

**Strato 2 — Adattatore per stack (configurabile).** Per ogni regola del nucleo, ogni famiglia di frontend dichiara *con cosa* si misura e *con quale soglia*. Un progetto React con Vite, uno Next, uno Angular, uno con server e template, uno mobile e uno da riga di comando sono sei adattatori diversi dello stesso nucleo. Qui vive tutto quello che l'utente ha chiesto come "configurabile per frontend".

**Strato 3 — Decisioni del progetto (dichiarate).** Le soglie concrete e le esenzioni. Non si inventano: si chiedono al proprietario e restano scritte, come il dimensionamento nel gradino di architettura. Se una soglia non è dichiarata, vale quella dell'adattatore e resta registrata come tale.

Ogni regola si scrive sempre con la stessa scheda di sei campi:

| Campo | Cosa contiene |
|---|---|
| `id` | Identificatore stabile (`CQ-07`, `UX-12`). Non si riusa mai. |
| Enunciato | Una sola frase, all'imperativo, su un risultato osservabile. |
| Perché | Il danno concreto che evita. Se non c'è danno, la regola avanza. |
| Come si verifica | Lo strumento: cancello automatico, interrogazione della matrice, prova end-to-end o caso manuale. |
| Severità | `BLOCCA` (il cancello dà rosso e il blocco non si chiude), `AVVISA` (apre una pendenza), `REGISTRA` (resta solo nel documento). |
| Vale per | Profili in cui vige. Fuori da quelli non corre, e non è un'eccezione: è perimetro. |

**L'eccezione si dichiara, mai si omette.** Una regola si spegne con un registro di quattro campi: identificatore, motivo in una riga, chi la autorizza (il proprietario, non l'agente) e data di revisione. Una regola spenta senza registro è un guasto del cancello, non una decisione. È lo stesso criterio che il metodo già usa per non accettare un limite alzato "per passare".

## 3. I quattro strumenti

Nessuna euristica serve se la sua verifica è un'opinione. Sono quattro, e ogni regola dichiara a quale appartiene.

1. **Cancello automatico.** Corre a ogni push e alla chiusura del blocco. Restituisce verde o rosso. È economico, è ripetibile e non discute. Misura tutto quello che si può contare.
2. **Interrogazione della matrice.** La matrice delle funzionalità per profilo (vedi B2) è un artefatto dichiarativo; il menu, il routing e i permessi derivano da lei. Verificare la matrice è verificare l'interfaccia. È il pezzo che trasforma una parte dell'usabilità in qualcosa verificabile dalla macchina.
3. **Prova end-to-end per profilo.** Per ogni profilo dichiarato, uno script che entra come quel profilo e confronta l'insieme delle funzionalità raggiungibili con la riga della matrice: *né meno né più*. È la prova che cattura i due disallineamenti tipici (il pulsante che avanza e la schermata che manca).
4. **Caso manuale.** Ciò che nessuna macchina giudica: se il raggruppamento si capisce, se l'attività si completa senza aiuto, se il testo è nella lingua dell'utente. Si esegue con persone e si registra, come già ordina il gradino 10.

## 4. Parte A — Qualità del codice

Il nucleo estende il gradino 9: non lo sostituisce né lo contraddice, dà nome, severità e adattatore a ogni cosa che già si misura, e aggiunge quello che oggi manca, cioè l'interfaccia vista come codice.

| id | Famiglia | Enunciato | Verifica | Severità |
|---|---|---|---|---|
| CQ-01 | Forma | C'è un solo formattatore, corre senza intervento e non ammette discussione. | Cancello | BLOCCA |
| CQ-02 | Forma | C'è un solo linter per repository e le sue regole sono le stesse per tutti; una regola si spegne con motivo scritto, mai in un file sparso. | Cancello | BLOCCA |
| CQ-03 | Dimensione | Nessun file supera il limite dichiarato (parte da 300 righe) e nessuna funzione il suo (parte da 40). | Cancello | BLOCCA |
| CQ-04 | Complessità | Nessuna funzione supera il limite di percorsi dichiarato. | Cancello | BLOCCA |
| CQ-05 | Duplicazione | Non entra duplicazione nuova: il blocco copiato si estrae o si giustifica. | Cancello | BLOCCA |
| CQ-06 | Morti | Non c'è codice morto: funzioni, variabili, importazioni, rami e dipendenze senza uso. | Cancello | BLOCCA |
| CQ-07 | Tipi | Se il linguaggio permette i tipi, il progetto li usa sul serio; il tipo "qualunque" è un'eccezione dichiarata, non un'abitudine. | Cancello | AVVISA |
| CQ-08 | Prove | La copertura non scende: il numero di oggi è il pavimento di domani. | Cancello | BLOCCA |
| CQ-09 | Prove | Con utenti reali, il punteggio di mutazione si misura per blocco e ogni mutante che sopravvive in codice nuovo apre una pendenza. | Cancello + registro | BLOCCA |
| CQ-10 | Dipendenze | Ogni dipendenza è dichiarata, si usa e non porta un albero di terzi sproporzionato a ciò che apporta. | Cancello | AVVISA |
| CQ-11 | Segreti | Non ci sono credenziali, chiavi né stringhe di connessione nel repository, nemmeno nella storia nuova. | Cancello | BLOCCA |
| CQ-12 | Interfaccia | L'interfaccia non decide: nessuna schermata né componente contiene regole di business (cosa si può, quanto costa, quale stato segue). Vivono nel dominio e la vista le interroga. | Revisione alla chiusura + caso manuale | BLOCCA |
| CQ-13 | Interfaccia | Ogni chiamata al server passa da un client unico e tipizzato; nessuna schermata costruisce la propria richiesta a mano. | Cancello (ricerca) | BLOCCA |
| CQ-14 | Interfaccia | C'è un solo posto dove vive lo stato condiviso; la duplicazione di stato fra schermate è un guasto, non una scorciatoia. | Revisione alla chiusura | BLOCCA |
| CQ-15 | Interfaccia | Ogni testo visibile esce da un catalogo di traduzioni; nessuna stringa utente resta scritta dentro il componente. | Cancello (ricerca) | BLOCCA |
| CQ-16 | Interfaccia | Ogni elemento interattivo porta identificatore stabile e ruolo, perché la prova automatica lo trovi per nome e non per posizione. | Cancello (ricerca) | BLOCCA |
| CQ-17 | Interfaccia | Tutti i colori, le spaziature e i caratteri escono da token; nessun valore magico sparso nel foglio di stile. | Cancello (ricerca) | BLOCCA |
| CQ-18 | Interfaccia | L'accessibilità di base si verifica da sola: contrasto, etichette nei campi, fuoco visibile, navigazione da tastiera nei flussi principali, immagini con testo alternativo. | Cancello | AVVISA |

Le regole da CQ-12 a CQ-18 sono quelle che fanno significare qualcosa a "qualità del codice" sul fronte. Senza di loro, il progetto può avere mutazione al novanta per cento e una schermata che calcola il totale con la propria aritmetica in un componente: il peggio dei due mondi, perché il calcolo duplicato passa tutte le prove del backend.

**Severità iniziali (D-048).** Bloccano dal primo giorno le quattordici regole che hanno un verificatore e che non dipendono da una soglia da discutere: da CQ-01 a CQ-06, CQ-08 e da CQ-11 a CQ-17. CQ-09 blocca dove ci sono utenti reali, che è dove si misura. Avvisano tre, e solo tre: CQ-07 (tipi), CQ-10 (dipendenze) e CQ-18 (accessibilità), perché sono quelle che hanno bisogno che il progetto prima calibri. Il formattatore, il linter, la dimensione e la complessità **non si allentano**: il gradino 9 già li blocca oggi, e questo lo estende, non lo sostituisce; il debito ereditato si risolve con un'eccezione dichiarata o con la linea base del cricchetto, mai abbassando la severità. E CQ-12 e CQ-14 sono le due uniche regole di questa tabella che bloccano con rosso umano e non di macchina: si verificano alla chiusura della pendenza e con il caso manuale davanti, come UX-22 e UX-27, non a ogni commit. Se il progetto non può sostenere quella chiusura, la regola scende ad AVVISA per decisione registrata, non per dimenticanza.

**Adattatore per famiglia di frontend.** Un esempio di come si istanzia lo strato 2 (i nomi sono illustrativi; il progetto sceglie e lo scrive):

| Concetto | Applicazione a pagina singola (React, Vue, Angular) | Server con template | Mobile nativo | Riga di comando |
|---|---|---|---|---|
| CQ-12 dominio nella vista | Regola di lint su dimensione e dipendenze dei componenti + revisione | Revisione del controller | Revisione del modello di vista | Revisione dello strato dei comandi |
| CQ-13 client unico | Generazione dal contratto dell'API | Servizio unico del server | Client generato | Client unico dell'SDK |
| CQ-15 testi | Catalogo + regola che vieta i letterali visibili | Catalogo del motore di template | Catalogo di risorse | Catalogo |
| CQ-16 identificatori | Attributi dichiarativi per elemento | Identificatori nel markup | Identificatori di accessibilità | Uscita stabile |
| CQ-17 token | Token nel foglio di stile, senza valori sparsi | Uguale | Uguale | Non applicabile |
| CQ-18 accessibilità | Analizzatore automatico nel cancello | Analizzatore sull'HTML generato | Analizzatore di accessibilità | Non applicabile |

Quello che cambia fra le colonne è lo strumento e la soglia. Quello che non cambia è l'enunciato. È questo che rende l'euristica agnostica senza farla diventare decorativa.

## 5. Parte B — Usabilità

Cinque famiglie. La prima e la seconda sono quelle che il proprietario ha chiesto esplicitamente; le altre tre esistono perché senza di loro il raggruppamento e i profili si degradano uguale, più lentamente.

### B1 — Raggruppamento per convergenza funzionale

La regola madre: **una funzionalità si raggruppa per quello che la persona è venuta a fare, non per il modulo da cui è uscita.** Il codice si organizza per entità ("Fattura", "Cliente", "Pagamento"); le persone no. Nessuno entra nel sistema per "gestire entità": entra per incassare, per spedire, per chiudere il mese. Se il menu mostra le entità, la persona fa da traduttrice. Il menu *è* il lavoro.

| id | Enunciato | Verifica | Severità |
|---|---|---|---|
| UX-01 | Ogni gruppo del menu si nomina con un lavoro dell'utente (nel suo vocabolario, con il glossario del progetto), mai con un modulo tecnico né con un'entità di dati. | Caso manuale + revisione della matrice | AVVISA |
| UX-02 | Ogni funzionalità ha esattamente una casa canonica. Se serve a due gruppi, si sceglie una casa e dall'altra si collega; la voce non si duplica. | Interrogazione della matrice | BLOCCA |
| UX-03 | Non ci sono orfane: ogni funzionalità dichiarata è raggiungibile dalla schermata d'ingresso in non più di tre passi. | Percorso automatico delle rotte | BLOCCA |
| UX-04 | La dimensione di un gruppo è ragionevole: meno di tre funzionalità indica un gruppo che non era un gruppo; più di sette indica un cassetto. | Interrogazione della matrice | AVVISA |
| UX-05 | Ogni gruppo ha una schermata d'ingresso che dice cosa si fa lì e qual è l'azione principale. Non ci sono gruppi che si aprono direttamente su una tabella vuota. | Caso manuale | AVVISA |
| UX-06 | I flussi che la persona fa spesso vivono insieme: se "caricare un pagamento" e "vedere il conto del cliente" si usano nella stessa sessione, condividono il gruppo. | Caso manuale (prova di attività) | REGISTRA |
| UX-07 | La prova del primo clic: il proprietario, davanti a un'attività concreta ("dove incassi un pagamento?"), nomina un posto. Se ne nomina due, c'è duplicazione; se non ne nomina nessuno, c'è un'orfana. Si corre alla chiusura di ogni blocco. | Caso manuale | AVVISA |

### B2 — Profili e funzionalità abilitate per profilo

Qui c'è il pezzo che rende di più, e la ragione è di ingegneria, non di disegno: **l'abilitazione si dichiara una volta, in una matrice, e tutto il resto deriva da lei.** Oggi l'errore classico è scrivere il permesso tre volte (nel menu, nella guardia della rotta e nel filtro dei dati) e che le tre si separino. Con la matrice come unico produttore, il menu, il routing, i permessi del server e gli script di prova sono consumatori, e la simmetria produttore/consumatore che il metodo già esige diventa verificabile da sola.

La matrice ha quattro colonne e una riga per funzionalità: *funzionalità*, *casa* (il gruppo di B1), *profili che la hanno*, *rotta d'ingresso*. Nient'altro.

| id | Enunciato | Verifica | Severità |
|---|---|---|---|
| UX-08 | Ogni funzionalità dichiara nella matrice quali profili la hanno. Una funzionalità senza profilo non esiste: o le si assegna un profilo o si cancella. | Interrogazione della matrice | BLOCCA |
| UX-09 | Ogni profilo dichiarato ha almeno una funzionalità e un punto d'ingresso proprio. Un profilo vuoto è un profilo che nessuno ha usato progettando. | Interrogazione della matrice | BLOCCA |
| UX-10 | La navigazione si genera dalla matrice. Un menu scritto a mano è un guasto, non una scorciatoia. | Cancello (ricerca) | BLOCCA |
| UX-11 | Nascondere non è proteggere: ogni rotta verifica il permesso lato server oltre a nascondere la voce. Scrivere l'indirizzo a mano non basta per entrare. | Prova end-to-end | BLOCCA |
| UX-12 | Né meno né più: per ogni profilo, l'insieme delle funzionalità raggiungibili è esattamente quello della sua riga nella matrice. | Prova end-to-end per profilo | BLOCCA |
| UX-13 | Il rifiuto si spiega: se una persona entra in una funzionalità che non le spetta, vede un messaggio che dice perché e a chi chiedere l'accesso. Mai una schermata bianca, mai un pulsante grigio senza ragione. | Caso manuale | AVVISA |
| UX-14 | Lo stesso pulsante significa la stessa cosa per tutti: se due profili condividono l'etichetta, condividono l'effetto. Se l'effetto cambia secondo il profilo, l'etichetta cambia o la funzionalità si separa in due. | Caso manuale | AVVISA |
| UX-15 | Anche i dati si filtrano per profilo: chi vede l'elenco vede le righe che gli spettano, non l'elenco completo con le righe nascoste nel browser. | Prova end-to-end + revisione del server | BLOCCA |
| UX-16 | La matrice e il manuale utente si aggiornano nella stessa pendenza della funzionalità. Una funzionalità nuova senza riga nella matrice non si chiude. | Chiusura della pendenza | BLOCCA |

### B3 — Stati, e cosa vede la persona quando qualcosa manca

La maggior parte dei reclami di "non funziona" sono schermate che non hanno saputo dire "non c'è niente", "sta caricando" o "è fallito". Quattro stati, sempre, in ogni elenco e in ogni schermata di dettaglio.

| id | Enunciato | Verifica | Severità |
|---|---|---|---|
| UX-17 | Ogni elenco ha quattro stati risolti: con dati, vuoto, in caricamento e con errore. Il vuoto distingue "non c'è ancora" da "la tua ricerca non ha trovato". | Caso manuale + revisione | AVVISA |
| UX-18 | Mentre qualcosa tarda, si vede che sta lavorando e si può annullare se è lungo. Un pulsante che non risponde niente è la lamentela numero uno. | Caso manuale | AVVISA |
| UX-19 | L'errore dice cosa è successo, cosa si può fare e non cancella quello che è stato caricato. Né un codice tecnico da solo, né un "si è verificato un errore". | Caso manuale | AVVISA |

### B4 — Azioni ed errori

| id | Enunciato | Verifica | Severità |
|---|---|---|---|
| UX-20 | Una schermata ha un'azione principale evidente; le altre sono secondarie e si vedono come tali. | Caso manuale | AVVISA |
| UX-21 | Ogni azione distruttiva chiede conferma nominando l'oggetto colpito, e quando si può si annulla invece di confermare. | Caso manuale | AVVISA |
| UX-22 | Un modulo che fallisce conserva quello che è stato caricato e segna il campo con problema, nel posto del campo. | Caso manuale | BLOCCA |
| UX-23 | Nessuna azione lascia la schermata senza uscita: dopo aver salvato, cancellato o annullato, la persona sa dove è rimasta e come proseguire. | Caso manuale | AVVISA |

### B5 — Linguaggio e accessibilità

| id | Enunciato | Verifica | Severità |
|---|---|---|---|
| UX-24 | L'interfaccia parla la lingua del glossario del progetto: lo stesso oggetto si chiama uguale nella schermata, nel manuale e nell'email. Un sinonimo è un difetto. | Caso manuale + revisione | AVVISA |
| UX-25 | Tutto si può fare senza mouse e con lettore di schermo nei flussi principali; il fuoco si vede sempre e non resta intrappolato. | Cancello (CQ-18) + caso manuale | AVVISA |
| UX-26 | Gli stati non si comunicano solo con il colore; ogni immagine informativa ha testo alternativo; i testi si leggono a dimensione normale senza zoom. | Cancello (CQ-18) | AVVISA |
| UX-27 | Ogni pendenza che tocca una schermata consegna la cattura reale dell'ambiente di prova, e il proprietario la guarda prima di chiudere. La cattura non è opzionale né è una bozza. | Chiusura della pendenza | BLOCCA |

## 6. Dove si aggancia, e quali artefatti produce

L'allegato non inventa gradini nuovi: si appende a quelli che esistono. Questo evita di duplicare cancelli ed evita il destino abituale degli elenchi di usabilità, che è essere letti una volta.

**Dove va (D-043).** È trasversale ai quattro tratti, con il peso principale nel Ciclo di Costruzione (gradini da 5 a 12), che è dove si decide e si costruisce. Non è un gradino proprio: un gradino numerato obbligherebbe a rinumerare la scala, altererebbe il conteggio dei passi e sottoporrebbe l'allegato alla traduzione obbligatoria dei contratti nelle otto lingue prima che la costruzione possa passare in verde, senza aggiungere nessun cancello che il ciclo non abbia già.

**Come si aggancia (D-044).** Una fonte canonica, cinque ancore e due ingressi precedenti. Il testo delle regole vive solo qui e i prompt lo citano; non lo copiano mai. Ripetere le quarantacinque regole dentro gli otto prompt del ciclo le diluisce (competono con il lavoro proprio di ogni gradino e l'agente le obbedisce diversamente ogni volta), le deriva (due copie dello stesso testo si disallineano da sole, che è l'antipattern che persegue il gradino 11) e non le rende più trasversali: quello che rende trasversale una regola è che ogni blocco passi per lo stesso cancello, non che la regola sia scritta dappertutto.

| Momento | Cosa si aggiunge | Perché lì |
|---|---|---|
| **Ingresso precedente 1** — definizione del perimetro | Il glossario dell'utente | Senza glossario, UX-01 e UX-24 non hanno con cosa confrontarsi. |
| **Ingresso precedente 2** — definizione del perimetro | L'elenco dei profili | Senza l'elenco, la matrice di B2 si inventa al gradino 5 e tutto ciò che ne deriva nasce senza fondamento. |
| **Ancora 1** — gradino 5 (il piano) | Ogni pendenza che tocca una schermata dichiara tre cose: a quale gruppo di convergenza appartiene (B1), quali profili la hanno e quali criteri di accettazione sono per profilo ("dato il profilo X, la persona può fare Y e non può fare Z"). Senza quella dichiarazione la pendenza non supera il gradino. | Qui *nascono* il raggruppamento e i profili: sono decisioni di pianificazione, non di codice. È l'ancora di maggior resa e quella che oggi non esiste. |
| **Ancora 2** — gradino 8 (prove in rosso) | La matrice diventa una prova che prima si vede fallire: per ogni profilo, il raggiungibile contro la sua riga (UX-11, UX-12, UX-15). | Senza questo la matrice è un documento che nessuno guarda. |
| **Ancora 3** — gradino 9 (qualità) | Il catalogo CQ completo con il suo adattatore e le sue soglie dichiarate; `docs/CODE_QUALITY.md` riporta per regola, non per numero unico. E la matrice come cancello (UX-02, UX-03, UX-08, UX-09, UX-10, UX-16). | È l'unico posto dove il testo entra letterale come direttiva, ed è il cancello che corre in ogni blocco con cricchetto. |
| **Ancora 4** — gradino 10 (casi manuali) | Ogni caso si esegue **una volta per profilo colpito**, derivato dalla matrice e non scritto a mano. Un caso corso con un solo profilo non conta come eseguito. | I casi manuali sono l'unica verifica umana del metodo; se non si aprono per profilo, metà di B2 non si guarda mai. |
| **Ancora 5** — gradino 12 (verifica e resoconto onesto) | Il resoconto dice cosa si è misurato, cosa è rimasto in avvisa e quale regola è spenta, con il suo motivo, il suo autore e la sua data di revisione. | Zero danno silenzioso: un gruppo spento non può leggersi come adempiuto. |
| Manuale utente | Si organizza per i gruppi di B1 e dichiara, per gruppo, quali profili entrano. | Manuale e menu si nominano con le stesse parole o il glossario si rompe. |
| Chiusura di ogni blocco | Prova del primo clic (UX-07), cattura dell'ambiente reale (UX-27) e le due prove end-to-end della matrice. | Sono le tre verifiche che non si possono automatizzare. |

**Stato (D-049).** Le cinque ancore sono già agganciate: il prompt iniziale dei gradini 5, 8, 9, 10 e 12 cita questo allegato in otto lingue, con una sola redazione inglese identica in tutte e la sua traduzione locale accanto. Il documento si pubblica nel sito con il resto del metodo, in castigliano; il suo ingresso nell'API dei prompt aspetta la traduzione nelle otto lingue (D-043).

I gradini 6, 7 e 11 ricevono al massimo una riga: il 6 già registra soglie ed eccezioni come decisioni (è il posto naturale dell'eccezione dichiarata), e l'11 è dove entra a colpi il caso della matrice scritta in quattro posti. Non si aggiunge loro testo proprio per non diluirli.

Tre artefatti, tutti in `docs/`: `CODE_QUALITY.md` (esteso), `USABILITY.md` (nuovo, con il risultato per regola e le eccezioni dichiarate) e `PROFILE_MATRIX.md` (la matrice, che è insieme documento e fonte del menu).

## 7. Configurazione

Un solo file per progetto dichiara strato 2 e strato 3. Esempio con la forma proposta, non con valori definitivi:

```json
{
  "version": 1,
  "frontend": "react-vite",
  "misurato_da": {
    "formato": "prettier",
    "lint": "eslint",
    "tipi": "tsc",
    "complessita": "eslint-complexity",
    "duplicazione": "jscpd",
    "morti": "knip",
    "copertura": "vitest-coverage",
    "mutazione": "stryker",
    "accessibilita": "axe-core"
  },
  "soglie": {
    "righe_per_file": 300,
    "righe_per_funzione": 40,
    "percorsi_per_funzione": 10,
    "copertura_minima": 0,
    "obiettivo_mutazione": 0
  },
  "eccezioni": [
    {
      "regola": "CQ-17",
      "motivo": "report stampabile ereditato, senza token",
      "autorizza": "proprietario",
      "rivedere": "2027-01-31"
    }
  ]
}
```

Gli due zeri sono deliberati e sono la parte che conta: la copertura minima la fissa il cricchetto con il misurato, e l'obiettivo di mutazione lo fissa il proprietario quando il progetto ha utenti. Se stanno a zero e nessuno li ha dichiarati, il cancello lo riporta come soglia non dichiarata invece di inventarla.

## 8. I due pezzi, nella forma che usa il metodo

**Qualità del codice.**

> Set up and maintain the code-quality gate for this project, configured for its frontend family. The core rules are the same in every project; what changes is how each one is measured and at which threshold. Install one formatter and one linter with a single shared configuration; enforce size limits per file and per function, complexity per function, duplication, dead code, declared-and-used dependencies, type checking where the language allows it, coverage with a ratchet, and secret scanning. Where the project has real users, add mutation testing scoped to the changed lines and record the score per block. Then extend the gate to the frontend itself: no business rule inside a screen, one typed client for every server call, one home for shared state, no user-visible string outside the translation catalogue, a stable identifier and role on every interactive element, styling only through tokens, and automatic basic accessibility checks. Every rule has a stable id, a severity (blocks, warns, records) and a named verifier. Thresholds and exceptions are declared by the owner in one configuration file; a rule switched off without a written exception is a gate failure, not a decision. Report the result per rule in `docs/CODE_QUALITY.md`, not as a single number.

> [it]
> Prepara e mantieni il cancello di qualità del codice del progetto, configurato per la sua famiglia di frontend. Le regole del nucleo sono le stesse in ogni progetto; quello che cambia è con cosa si misura ciascuna e con quale soglia. Installa un solo formattatore e un solo linter con configurazione condivisa; fai rispettare limiti di dimensione per file e per funzione, complessità per funzione, duplicazione, codice morto, dipendenze dichiarate e usate, verifica dei tipi dove il linguaggio lo permette, copertura con cricchetto e scansione dei segreti. Dove il progetto ha utenti reali, aggiungi prove di mutazione limitate alle righe cambiate e registra il punteggio per blocco. Poi estendi il cancello al fronte: nessuna regola di business dentro una schermata, un client tipizzato unico per ogni chiamata al server, un solo posto per lo stato condiviso, nessun testo visibile fuori dal catalogo delle traduzioni, identificatore stabile e ruolo su ogni elemento interattivo, stili solo tramite token e verifica automatica dell'accessibilità di base. Ogni regola ha identificatore stabile, severità (blocca, avvisa, registra) e verificatore nominato. Le soglie e le eccezioni le dichiara il proprietario in un file di configurazione; una regola spenta senza eccezione scritta è un guasto del cancello, non una decisione. Riporta il risultato per regola in `docs/CODE_QUALITY.md`, non come numero unico.

**Usabilità.**

> Build the usability criteria for this project before writing the first screen, and enforce them where the method already has hooks. Group functionality by what the person came to do, never by the internal module or the data entity: every menu group is named with a user job in the project glossary, every functionality has exactly one canonical home, no functionality is orphaned, and every group is reachable in no more than three steps from the entry screen. Then declare accessibility in one matrix and derive everything from it: each functionality lists the profiles that have it, each functionality has at least one profile, each profile has at least one functionality and its own entry point, the navigation is generated from the matrix instead of written by hand, and every route checks the permission on the server because hiding an entry is not protecting it. Verify the matrix per profile with an end-to-end check that compares what is reachable with the matrix row: neither less nor more. Require the four states on every list (with data, empty, loading, error), a visible working indicator with the option to cancel long operations, an error message that says what happened and what to do without losing entered data, a primary action per screen, confirmation or undo for destructive actions, and a form that keeps what was typed. Run each manual test case once per affected profile, run the first-click check at the close of every block, and require a real screenshot of the test environment on every item that touches a screen. Record the result per rule, with owner-declared exceptions, in `docs/USABILITY.md`, and keep the matrix in `docs/PROFILE_MATRIX.md` as the single source of truth.

> [it]
> Costruisci i criteri di usabilità del progetto prima di scrivere la prima schermata, e falli rispettare dove il metodo ha già agganci. Raggruppa le funzionalità per quello che la persona è venuta a fare, mai per il modulo interno né per l'entità di dati: ogni gruppo del menu si nomina con un lavoro dell'utente nel glossario del progetto, ogni funzionalità ha esattamente una casa canonica, nessuna resta orfana e ogni gruppo si raggiunge in non più di tre passi dalla schermata d'ingresso. Poi dichiari l'accessibilità in una sola matrice e ne derivi tutto: ogni funzionalità elenca quali profili la hanno, ogni funzionalità ha almeno un profilo, ogni profilo ha almeno una funzionalità e un punto d'ingresso proprio, la navigazione si genera dalla matrice invece di scriverla a mano, e ogni rotta verifica il permesso lato server perché nascondere una voce non è proteggerla. Verifica la matrice per profilo con una prova end-to-end che confronti il raggiungibile con la riga della matrice: né meno né più. Esigi i quattro stati in ogni elenco (con dati, vuoto, in caricamento, con errore), un indicatore visibile di lavoro in corso con possibilità di annullare quello lungo, un messaggio di errore che dica cosa è successo e cosa fare senza perdere il caricato, un'azione principale per schermata, conferma o annulla nelle azioni distruttive e un modulo che conservi lo scritto. Esegui ogni caso di prova manuale una volta per profilo colpito, esegui la prova del primo clic alla chiusura di ogni blocco ed esigi una cattura reale dell'ambiente di prova in ogni pendenza che tocchi una schermata. Registra il risultato per regola, con le eccezioni dichiarate dal proprietario, in `docs/USABILITY.md`, e mantieni la matrice in `docs/PROFILE_MATRIX.md` come fonte unica di verità.

## 9. Cosa questa proposta non fa

- **Non aggiunge un gradino.** Sono quarantacinque regole trasversali (18 di qualità e 27 di usabilità), non una tappa nuova. Si appendono ai gradini che già esistono.
- **Non inventa un punteggio.** Un numero di "usabilità 78" non dice cosa aggiustare e si ottimizza nella direzione sbagliata. Si riporta per regola. La sezione 12 propone due cifre derivate, ma sono un conteggio di regole con la sua motivazione — non un voto di qualità né di usabilità — e non autorizzano a chiudere niente.
- **Non sostituisce il proprietario.** La prova del primo clic, la cattura e la prova di attività restano umane: sono l'unico strumento che distingue "funziona" da "serve".
- **Non porta soglie di fabbrica.** Quelle dell'adattatore sono un punto di partenza dichiarato; il progetto che non dichiara le sue eredita quelle e resta registrato come tale.
- **Non promette che il cancello rilevi il raggruppamento sbagliato.** Una macchina può verificare che non ci sia duplicazione né orfane; se il gruppo si chiama "Gestione", lo deve vedere una persona.

## 10. Le decisioni: cosa è rimasto risolto e cosa manca

### Risolte

| # | Decisione | Registro |
|---|---|---|
| 1 | **Trasversale al Ciclo di Costruzione, non gradino proprio.** La scala non si rinumera, il conteggio dei passi non si altera e l'allegato non eredita l'obbligo di tradurre un contratto di gradino. | D-043 |
| 2 | **Una fonte canonica con cinque ancore e due ingressi precedenti,** invece di copiare le quarantacinque regole dentro gli otto prompt del ciclo. | D-044 |
| 3 | **Due interruttori indipendenti** (qualità e usabilità), tre stati per regola (blocca, avvisa, spenta), adattatore per famiglia di frontend, soglie ed eccezioni dichiarate dal proprietario. | D-045 |
| 4 | **Disciplina dell'interruttore:** vive nella configurazione del progetto e non nel prompt; spegnere vale solo come decisione registrata con motivo, autore e data di revisione; lo spegnimento è osservabile nel resoconto; e l'interruttore si prova accendendo e spegnendo. | D-046 |
| 5 | **Severità iniziali, fissate regola per regola:** in qualità bloccano quattordici (da CQ-01 a CQ-06, CQ-08, da CQ-11 a CQ-17), CQ-09 blocca dove ci sono utenti reali e avvisano tre (CQ-07, CQ-10, CQ-18). In usabilità bloccano undici (UX-02, UX-03, da UX-08 a UX-12, UX-15, UX-16, UX-22, UX-27), UX-06 solo registra e il resto avvisa. Né "tutto blocca" — il progetto non parte — né "tutto avvisa" — l'euristica è un ornamento. | D-048 |
| 6 | **L'accessibilità parte avvisando e sale a bloccante per dichiarazione del proprietario** quando il prodotto ha utenti finali fuori dell'organizzazione. Il default non si inventa: la salita si dichiara, con lo stesso meccanismo di ogni soglia (D-045). | D-048 |

### Chiuso in D-048, e le due correzioni che porta con sé

Le due domande che bloccavano la scrittura dei prompt hanno già risposta: la 1 nella riga 5 e la 2 nella riga 6. Ma la raccomandazione approvata aveva due errori di fatto, e restano scritti qui perché non tornino:

1. **Il difetto del conteggio.** Dove questo allegato diceva "ventisette regole" il numero corretto è **quarantacinque**: 18 di qualità (da CQ-01 a CQ-18) e 27 di usabilità (da UX-01 a UX-27). La cifra vecchia veniva da una bozza che ne contava solo metà. Corretto nelle sezioni 6 e 9 e annotato in D-048; il testo di D-044 si conserva come è stato scritto, perché una decisione è un registro e non si riscrive.
2. **Il formattatore, il linter, la dimensione e la complessità non si allentano.** Una versione precedente di questa raccomandazione li mandava ad "avvisa" per non bloccare progetti con debito ereditato. Non può essere: il gradino 9 già li blocca oggi, e questa estensione lo estende, non lo sostituisce. Il debito ereditato si risolve con un'eccezione dichiarata — con motivo e data di revisione — o con la linea base del cricchetto, non abbassando la severità della regola.

E una limitazione dichiarata, perché è l'unica della sua classe: **CQ-12 e CQ-14 bloccano con rosso umano.** Nessuno strumento prova che una schermata non decida regole di business. Si verificano alla chiusura della pendenza, con il caso manuale davanti e lo stesso criterio di UX-22 e UX-27; se il progetto non può sostenere quella chiusura, scendono ad AVVISA per decisione registrata. Una regola che blocca e che nessuno verifica è peggio di una regola che avvisa.

### Pendente di calendario, non di decisione

**La traduzione.** L'allegato entra in castigliano e si legge come riferimento; il giorno in cui il suo prompt entra in `docs/html/api/prompts.json`, `build/prompts.mjs` esige che il testo sia identico byte a byte nelle otto lingue o la costruzione fallisce. Non c'è più niente da decidere: il testo è stato fissato con le severità in D-048. Quello che resta è di calendario: tradurre e pubblicare nell'API.

## 11. Come si verifica che il cancello vigili

Un'euristica che non cambia niente quando la si accende o la si spegne non è un cancello, è decorazione. La prova di accettazione dell'implementazione (PND-002) è un progetto fixture con violazioni deliberate di ogni famiglia:

| Scenario | Risultato esatto |
|---|---|
| Qualità accesa, con violazione | Rosso, nominando la regola e il file dove sta la violazione. |
| Qualità spenta **con registro** | Verde, e il resoconto **dice** che è spenta, da quando e chi l'ha autorizzata. |
| Qualità spenta **senza registro** | Rosso. Spegnere senza motivo scritto è un guasto, non un'assenza di regola. |
| Usabilità accesa, con profilo che raggiunge troppo | Rosso in UX-12, con il profilo e la funzionalità nominati. |
| Usabilità accesa, con funzionalità senza riga nella matrice | Rosso in UX-08 alla chiusura della pendenza (UX-16). |
| Entrambi i gruppi spenti | Verde in entrambi, con le due righe di spegnimento nel resoconto. |
| Si pianta una violazione di una regola che **avvisa** | Verde, e si apre una pendenza che nomina la regola e il file: avvisare non è approvare. |
| Si pianta una violazione di una regola che **blocca** | Rosso, con regola, file e rimedio nominati. E non c'è cruscotto: la media non chiude blocchi. |
| Cruscotto: si spegne una regola **con registro** | La conformità può salire, ma la **copertura del cancello scende** e la cifra si pubblica con la motivazione che lo spiega. Con una sola cifra questo scenario passerebbe inosservato; è la prova che le due cifre esistono per un motivo (D-047). |
| Cruscotto: due corse con regolamenti diversi | Le due cifre si mostrano con la loro impronta (versione del catalogo, regole attive e spente, adattatore, versioni degli strumenti) e **non si graficano come serie continua**: sono due metri diversi e dirlo fa parte del risultato. |
| Cruscotto: regolamento non valido (regola spenta senza registro) | Non emette cifre. L'uscita è rossa, non un cruscotto con un asterisco. |
| Cruscotto: conformità alta con una regola che blocca in rosso | Il blocco **non si chiude**. Il cruscotto fa la media; il verde lo decide ogni regola, una per una. |
| Cruscotto: la percentuale migliora toccando solo l'automatico | La percentuale sale e la linea di verifica umana non si muove; si riporta a parte e il resoconto non somma le due cose in un numero unico. |

Quello che si guarda non è solo il colore: si guarda che le due righe di spegnimento **esistano** nel resoconto. Un risultato verde senza quella riga è l'unico guasto che questa prova non può rilevare da sola per colore, e per questo si verifica leggendo l'uscita.

## 12. Il cruscotto di conformità (DECISO: due cifre, D-047)

**Stato.** Deciso il 2026-10-22 in D-047: il cruscotto va con due cifre, con l'impronta del regolamento, con cricchetto, con l'umano fuori dalla percentuale e con la motivazione obbligatoria. Non autorizza a chiudere blocchi. Quello che segue è la specifica che l'implementazione (PND-002) deve rispettare.

**Cos'è.** Un derivato deterministico del risultato per regola che il cancello ha già emesso. Non misura niente di nuovo né giudica niente di nuovo: conta. Se il cruscotto potesse cambiare il verdetto di una regola ci sarebbero due fonti di verità per la stessa cosa, che è esattamente quello che l'allegato combatte in UX-10 (la navigazione deriva dalla matrice) e in CQ-14 (un solo posto per lo stato).

**Cosa non è.** Non è un criterio di accettazione. Nessuna cifra autorizza a chiudere un blocco: il verde o il rosso lo decide ogni regola che blocca, una per una. Il cruscotto descrive la tendenza e segnala cosa guardare. Se si comincia a usarlo come soglia di chiusura, ha smesso di servire, perché la via più corta per alzare un numero è spegnere regole.

**Due cifre, mai una.**

| Cifra | Formula | Cosa misura | Come si muove |
|---|---|---|---|
| **Conformità** | regole che passano ÷ regole attive | quanto è pulito quello che si sta guardando | sale quando si aggiusta |
| **Copertura del cancello** | regole attive ÷ regole dichiarate nel catalogo | quanto dell'allegato sta davvero guardando | scende quando si spegne una regola |

La ragione per cui sono due: spegnere una regola **alza** la conformità e **abbassa** la copertura. Con una sola cifra spegnere è gratis e il cruscotto premia la cecità. Con due cifre che si muovono in direzioni opposte, la scorciatoia sparisce: per mostrare un cruscotto migliore bisogna aggiustare codice, non spegnere regole. E la copertura non si può alzare senza misurare.

**L'impronta del regolamento.** Ogni registrazione conserva con quale metro è stata calcolata: versione del catalogo, regole attive e spente, adattatore di frontend e versioni degli strumenti. Senza questo, un 82 di ieri e un 91 di oggi non sono la stessa misura anche se si scrivono uguale: sono due regolamenti diversi e la serie è falsa. Due cifre senza impronta producono un'illusione di progresso, che è peggio di non avere cruscotto. Se l'impronta cambia, la registrazione si marca come **non confrontabile** o lo storico si ricalcola con il metro vigente; mai si grafica accanto senza dirlo.

**Cricchetto.** La conformità non scende da un blocco al successivo senza una decisione registrata che lo spieghi. È lo stesso meccanismo che la copertura delle prove ha già in CQ-08: il numero di oggi è il pavimento di domani. Scendere non è proibito; scendere senza registro, sì.

**Cosa non entra nel conto.** Quello che solo una persona può giudicare — la prova del primo clic (UX-07), la prova di attività (UX-06), la cattura (UX-27) e tutti i casi manuali — si registra come passato o fallito, per blocco, con nome e data, e si riporta a parte come copertura di verifica umana. Non entra nella percentuale di conformità. Se si mescolano, il risultato è un numero che è sessanta per cento misurazione e quaranta per cento opinione, e nessuno può dire quale sia quale. Per questo la sezione 9 vale ancora: il cruscotto non inventa un voto di usabilità, conta regole.

**Come si falsifica.** Amplia la prova di accettazione della sezione 11:

| Scenario | Risultato esatto |
|---|---|
| Si pianta una violazione di una regola che blocca | La conformità scende esattamente di una regola sulle attive, e appare il rosso con la regola nominata. |
| Si spegne una regola con registro | La conformità può salire; la copertura scende di una regola sulle dichiarate; il resoconto nomina la regola, il motivo e la data di revisione. |
| Si spegne senza registro | Rosso, e non si emette cruscotto: un regolamento non valido non produce cifre. |
| Stesso albero e stessa configurazione, due corse | La stessa cifra, identica. |
| Cambia la configurazione fra due blocchi | Le due registrazioni restano marcate come non confrontabili, o lo storico si ricalcola con il metro vigente. |
| Il cruscotto si usa come criterio di chiusura | Uso indebito, non scenario valido: il verde lo decide la regola, non la media. |

**Dove appare.** Nel resoconto onesto del gradino 12 (ancora 5), e in questo ordine: prima il verdetto binario del cancello, poi le due cifre, poi cosa è spento e fino a quando, poi il movimento contro il blocco precedente con la sua causa nominata. Sempre con la motivazione: *è scesa di quattro punti: CQ-15, tre stringhe fuori dal catalogo nella schermata di incasso*. Una cifra senza motivazione è rumore; la motivazione è quello che la rende azionabile per un proprietario che non legge codice.

**Rischio dichiarato.** Il cruscotto lo leggerà il proprietario, che non legge codice, e per questo vorrà che salga. Il numero diventa l'obiettivo, e l'obiettivo sposta lo scopo. Le difese sono quelle sopra, e sono cinque: due cifre che si contraddicono quando si spegne, l'impronta che impedisce di confrontare metri diversi, il cricchetto che non lascia scendere senza registro, l'umano fuori dalla percentuale e la motivazione obbligatoria, con il cancello che non si negozia per media. Se una delle cinque cade, il cruscotto si spegne: un cruscotto usato male fa più danno che non averlo.

## 13. Registro

Ogni decisione di questo allegato resta in `docs/DECISIONES.md` con data, autore, citazione testuale e file di impatto: D-043 (forma), D-044 (meccanismo), D-045 (interruttori), D-046 (disciplina dell'interruttore), D-047 (il cruscotto con due cifre). L'implementazione e i suoi criteri di accettazione vivono in PND-002.

Non resta nessuna decisione aperta: la forma (D-043 e D-044), gli interruttori (D-045 e D-046), il cruscotto (D-047) e le severità iniziali con il peso dell'accessibilità (D-048) sono decise. Quello che sopravvive è di calendario: la traduzione nelle otto lingue quando questo testo entra nell'API dei prompt.
