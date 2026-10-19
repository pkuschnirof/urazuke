# Die Schrittverträge

Eine Datei pro Schritt. Alle haben dasselbe Gerüst, und zwar mit Absicht, damit du sie vergleichen
kannst und damit mit der Zeit der Reflex, sie zu lesen, automatisch wird: die Kopfzeile mit dem
Abschnitt, dem Wann, der Form und der Größe (verpflichtend oder proportional); wozu er dient; (1)
der benötigte Kontext, generisch benannt; (2) die Prompts, **auf Englisch**, jeder mit einem
Block **„Bevor du den Prompt schickst“** davor (die Dateien und die Eingaben, die du selbst
fertig haben musst, bevor du ihn einfügst, mit ihrem Inhalt und ihrem Mindestzustand), gefolgt
von seiner Übersetzung und, darunter, von der Erklärung, was ich vom Modell verlange und warum
jede Klausel dort steht; (3) das erwartete Ergebnis mit seinen Merkmalen; (4) die
Vollständigkeitsprüfung, die du machst, ohne Code zu lesen; (5) die Warnsignale, die Symptome
eines schlecht erklommenen Schritts.

Die englischen Prompts sind ein einziges Stück, identisch in den acht Fassungen des Dokuments;
`node build/build.mjs` extrahiert sie nach `prompts/` und prüft, dass keine Übersetzung sie
verändert hat. Die Übersetzung, die jeden Prompt begleitet, ist dafür da, dass du ihn verstehst;
dem Modell wird das Englische eingefügt.

Ich habe sie aus dem geschrieben, was ich in drei Systemen getan habe, die heute in Produktion
sind; eins zu eins ausgeführt habe ich sie noch nicht. Das erste Projekt, das sie von Anfang bis
Ende nutzt, wird mehrere korrigieren; das ist Teil von Schritt 23. Wenn ein Vertrag einen realen
Fall zitiert, tut er das mit einer Marke `[Ref. N]`, die auf das
[Referenzdokument](../REFERENCIAS.md) verweist; das Verfahren bleibt sauber, und das Detail ist
einen Klick entfernt.

| Schritt | Datei | Abschnitt | Wann |
|---|---|---|---|
| 0 — Lässt sich dieses Projekt so angehen? | `peldano-00-elegibilidad.md` | Start | vor allem anderen |
| 1 — Die Arbeitsvereinbarung | `peldano-01-contrato-de-convivencia.md` | Start | nach der Eignung |
| 2 — Projektdefinition und Pflichtlektüre | `peldano-02-definicion-y-lectura.md` | Start | nach der Vereinbarung; wird immer gepflegt |
| 3 — Dimensionieren vor der Architektur | `peldano-03-dimensionar.md` | Start | nach der Definition, vor dem Skelett |
| 4 — Das Skelett mit seinen Toren | `peldano-04-esqueleto.md` | Start | Abschluss des Starts |
| 5 — Der Plan sind die offenen Posten | `peldano-05-pendientes.md` | Schleife | beim Öffnen jedes Blocks; jede Sitzung |
| 6 — Entscheidungen werden neben dem Code festgehalten | `peldano-06-decisiones.md` | Schleife | jedes Mal, wenn eine Regel fehlt |
| 7 — Messen vor dem Bauen | `peldano-07-medir.md` | Schleife | bevor auf einer Zahl gebaut wird |
| 8 — Tests als Sperren, rot bewiesen | `peldano-08-tests-en-rojo.md` | Schleife | beim Schließen jedes offenen Postens |
| 9 — Maschinell verifizierte Code-Qualität | `peldano-09-calidad-de-codigo.md` | Schleife | wird beim Öffnen des ersten Blocks aufgebaut; läuft bei jedem Commit |
| 10 — Manuelle Testfälle zusammen mit der Funktionalität | `peldano-10-casos-de-prueba-manual.md` | Schleife | bei jedem offenen Posten; menschliche Ausführung beim Abschluss jedes Blocks, bei der Abnahme und nach jedem Deployment |
| 11 — Produzent/Konsument-Symmetrie und Anti-Muster | `peldano-11-simetria-y-antipatrones.md` | Schleife | bei jeder Vertragsänderung |
| 12 — Ehrliche Verifikation und verhältnismäßiger Bericht | `peldano-12-verificacion-honesta.md` | Schleife | in jedem Bericht |
| 13 — Das periodische Audit als Input für den Plan | `peldano-13-auditoria.md` | Produktionsfreigabe | vor der Produktion; danach periodisch |
| 14 — Fail-closed, Sperren und null stiller Schaden | `peldano-14-fail-closed.md` | Produktionsfreigabe | bevor gebaut wird, was auf die Welt wirkt |
| 15 — Continuous Integration, Umgebungen, Geheimnisse und Deployment | `peldano-15-ci-entornos-secretos-deploy.md` | Produktionsfreigabe | Abschluss Richtung Produktion; Routine bei jedem Deployment |
| 16 — Vollständige Beobachtbarkeit und Nachverfolgbarkeit, mit konfigurierbarem Level | `peldano-16-observabilidad-y-trazabilidad.md` | Produktionsfreigabe | Produktionsfreigabe, nach der 15 und vor der 19 |
| 17 — Optimierung der Persistenzschicht | `peldano-17-persistencia.md` | Produktionsfreigabe | Produktionsfreigabe, nach der 16 und vor der 19; wiederholt sich, wenn eine Abfrage aus dem Bereich läuft |
| 18 — Scannen und Beheben von Schwachstellen | `peldano-18-vulnerabilidades.md` | Produktionsfreigabe | vor dem ersten Deployment; danach bei jedem Push und wöchentlich |
| 19 — Lasttests und Bruchpunkt | `peldano-19-rendimiento-y-punto-de-ruptura.md` | Produktionsfreigabe | vor dem ersten Deployment; vor jedem Deployment, das Architektur, Persistenz oder einen kritischen Fluss ändert |
| 20 — Lebendige Dokumentation und Handbücher ohne KI | `peldano-20-documentacion-viva.md` | Produktionsfreigabe | beim Abschluss jedes Blocks; vollständig vor der Produktion |
| 21 — Monitoring von Ressourcen und Leistung, zyklischer Bericht | `peldano-21-monitoreo-de-recursos-y-rendimiento.md` | Betrieb | mit dem ersten Deployment; danach läuft es allein und wird pro Zyklus gelesen |
| 22 — Fehler-Monitoring, zyklischer Bericht | `peldano-22-monitoreo-de-errores.md` | Betrieb | mit dem ersten Deployment, zusammen mit der 21 |
| 23 — Der residente Agent und die Retrospektive mit Zahlen | `peldano-23-agente-residente-y-retrospectiva.md` | Betrieb | beim Eintritt in den Betrieb; beim Abschluss jeder Etappe |

Abschnitte: **Start** wird einmal pro Projekt erklommen; **Schleife** wiederholt sich bei jeder
Änderung; **Betrieb**, wenn das System schon lebt. Die 23 kehrt zur 0 für das nächste Projekt
zurück. Die vollständige Zeitlinie, mit dem, was zwischen Schritt und Schritt passiert, steht in
Teil B des Hauptdokuments.
