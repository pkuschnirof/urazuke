# Urazuke — il metodo del riscontro

*Urazuke* (裏付け) è una parola giapponese che indica il sostegno di cui dispone un'affermazione:
ciò che la regge da dietro. Il verbo, *urazukeru*, significa "sostenere con prove". Questo è il
metodo.

Un metodo per costruire software con l'intelligenza artificiale che risulti robusto, pronto per la
produzione, **senza che il proprietario del progetto debba leggere una sola riga di codice**.
Distillato da tre sistemi reali che oggi sono in produzione, colpi duri compresi.

Questa cartella contiene la versione italiana del metodo. Lo spagnolo è la fonte della verità; se
le due versioni divergono, prevale quella spagnola e quella italiana viene corretta.

## La tesi in una frase

L'IA non interrompe il metodo: lo continua. L'industria ha smesso di fidarsi dell'autore del codice
vent'anni fa e ha imparato a esigere prove invece di leggerlo; il modello è l'autore successivo,
non il primo di cui diffidare. L'unica cosa davvero nuova è che questo autore fabbrica anche le
prove, e per questo la prova deve dimostrare se stessa.

## Cosa c'è qui

| File | Cos'è |
|---|---|
| `ESCALERA_METODOLOGICA.md` | Il documento principale: la tesi, la rilevazione dei tre repository di origine (momenti e tappe con i loro commit), i sedici gradini della scala con la loro scheda, i fallimenti reali ricondotti ai gradini, ciò che manca ancora, e il glossario. |
| `peldanos/peldano-NN-*.md` | Il contratto di ogni gradino: contesto richiesto, i prompt (in inglese, fonte unica, identici in tutte le lingue), il risultato atteso, la verifica di completezza e i segnali d'allarme. È ciò che un allievo esegue e ciò che poi verrà esportato in Forge. |
| `peldanos/README.md` | L'indice dei contratti, con la fase di ciascuno. |
| `MANUAL_CURSO.md` | Il corso: sedici lezioni, una per gradino, con il concetto spiegato, il compito pratico passo per passo con i prompt, la verifica di completezza, il risultato da consegnare, gli errori tipici e l'esempio sul progetto guida ("Turnera"). Termina con la lista di messa in produzione. |

Il registro delle decisioni (`../DECISIONES.md`) resta solo in spagnolo, perché cita le parole
testuali del proprietario.

## Come leggerlo

Comincia da `ESCALERA_METODOLOGICA.md`, oppure dal suo HTML in `../html/it/`. Se incontri una
parola strana, il glossario è alla fine. Poi il contratto del gradino che ti interessa.

## Lingue

Lo spagnolo è la fonte della verità. La documentazione esiste nelle otto lingue di NAC3 (spagnolo,
inglese, portoghese, francese, tedesco, italiano, giapponese e cinese). I prompt per il modello
sono un unico pezzo in inglese, identico in tutte le versioni, spiegato nella lingua del lettore. Il
nome non si traduce; il sottotitolo sì: *el método de la evidencia*, *the evidence method*, *o
método da evidência*, *la méthode de la preuve*, *die Nachweis-Methode*, *il metodo del riscontro*,
裏付けの方法, 验证方法.

## Licenza e come contribuire

Il metodo è pubblicato con licenza **Creative Commons Attribuzione – Condividi allo stesso modo
4.0** (`../../LICENSE`): si può usare, tradurre e adattare, con attribuzione e con la stessa
licenza. I miglioramenti a **questo** repository entrano tramite pull request da un fork, con la
loro prova, e vengono integrati da un manutentore dopo la revisione; nessun altro scrive su
`main`. Il processo è in `../../CONTRIBUTING.md`.

I clienti dei sistemi di origine sono anonimizzati ("la Mutua", "l'Associazione"); i numeri, le
date e i commit sono reali.

## Origine

Pablo Kuschnirof (RPAForce / Yujin) e Sumi (la sessione di Claude Code che lavora con lui), a
partire da `yujin-forge`, `Autorizzazioni` e `Kikan`. Ottobre 2026.
