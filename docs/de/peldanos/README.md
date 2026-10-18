# Die Schrittverträge

Eine Datei pro Schritt. Alle haben dasselbe Gerüst, und zwar mit Absicht, damit du sie vergleichen
kannst und damit mit der Zeit der Reflex, sie zu lesen, automatisch wird: die Kopfzeile mit dem
Abschnitt, dem Wann, der Form und der Größe (verpflichtend oder proportional); wozu er dient; (1)
der benötigte Kontext, generisch benannt; (2) die Prompts, **auf Englisch**, jeder mit seiner
Übersetzung und darunter der Erklärung, was ich vom Modell verlange und warum jede Klausel dort
steht; (3) das erwartete Ergebnis mit seinen Merkmalen; (4) die Vollständigkeitsprüfung, die du
machst, ohne Code zu lesen; (5) die Warnsignale, die Symptome eines schlecht erklommenen Schritts.

Die englischen Prompts sind ein einziges Stück, identisch in den acht Fassungen des Dokuments;
`node build/build.mjs` extrahiert sie nach `prompts/` und prüft, dass keine Übersetzung sie
verändert hat. Die Übersetzung, die jeden Prompt begleitet, ist dafür da, dass du ihn verstehst;
dem Modell wird das Englische eingefügt.

Ich habe sie aus dem geschrieben, was ich in drei Systemen getan habe, die heute in Produktion
sind; eins zu eins ausgeführt habe ich sie noch nicht. Das erste Projekt, das sie von Anfang bis
Ende nutzt, wird mehrere korrigieren; das ist Teil von Schritt 15. Wenn ein Vertrag einen realen
Fall zitiert, tut er das mit einer Marke `[Ref. N]`, die auf das
[Referenzdokument](../REFERENCIAS.md) verweist; das Verfahren bleibt sauber, und das Detail ist
einen Klick entfernt.

| Schritt | Datei | Abschnitt | Wann |
|---|---|---|---|
| 0 — Lässt sich dieses Projekt so angehen? | `peldano-00-elegibilidad.md` | Start | erste Woche, vor allem anderen |
| 1 — Die Arbeitsvereinbarung | `peldano-01-contrato-de-convivencia.md` | Start | erste Woche, nach der Eignung |
| 2 — Projektdefinition und Pflichtlektüre | `peldano-02-definicion-y-lectura.md` | Start | erste Woche; wird immer gepflegt |
| 3 — Dimensionieren vor der Architektur | `peldano-03-dimensionar.md` | Start | erste Woche, vor dem Skelett |
| 4 — Das Skelett mit seinen Toren | `peldano-04-esqueleto.md` | Start | Abschluss der ersten Woche |
| 5 — Der Plan sind die offenen Posten | `peldano-05-pendientes.md` | Schleife | beim Öffnen jedes Blocks; jede Sitzung |
| 6 — Entscheidungen werden neben dem Code festgehalten | `peldano-06-decisiones.md` | Schleife | jedes Mal, wenn eine Regel fehlt |
| 7 — Tests als Sperren, rot bewiesen | `peldano-07-tests-en-rojo.md` | Schleife | beim Schließen jedes offenen Postens |
| 8 — Produzent/Konsument-Symmetrie und Anti-Muster | `peldano-08-simetria-y-antipatrones.md` | Schleife | bei jeder Vertragsänderung |
| 9 — Messen vor dem Bauen | `peldano-09-medir.md` | Schleife | bevor auf einer Zahl gebaut wird |
| 10 — Ehrliche Verifikation und verhältnismäßiger Bericht | `peldano-10-verificacion-honesta.md` | Schleife | in jedem Bericht |
| 11 — Das periodische Audit als Input für den Plan | `peldano-11-auditoria.md` | Betrieb | vor der Produktion; danach periodisch |
| 12 — Fail-closed, Sperren und null stiller Schaden | `peldano-12-fail-closed.md` | Betrieb | bevor gebaut wird, was auf die Welt wirkt |
| 13 — Continuous Integration, Umgebungen, Geheimnisse und Deployment | `peldano-13-ci-entornos-secretos-deploy.md` | Betrieb | Abschluss Richtung Produktion; Routine bei jedem Deployment |
| 14 — Lebendige Dokumentation und Handbücher ohne KI | `peldano-14-documentacion-viva.md` | Betrieb | beim Abschluss jedes Blocks; vollständig vor der Produktion |
| 15 — Der residente Agent und die Retrospektive mit Zahlen | `peldano-15-agente-residente-y-retrospectiva.md` | Betrieb und Abschluss | beim Eintritt in den Betrieb; beim Abschluss jeder Etappe |

Abschnitte: **Start** wird einmal pro Projekt erklommen; **Schleife** wiederholt sich bei jeder
Änderung; **Betrieb**, wenn das System schon lebt. Die 15 kehrt zur 0 für das nächste Projekt
zurück. Die vollständige Zeitlinie, mit dem, was zwischen Schritt und Schritt passiert, steht in
Teil B des Hauptdokuments.
