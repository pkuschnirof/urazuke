# Die Sprossenverträge

Eine Datei pro Sprosse. Jede hat dasselbe Gerüst: die Kopfzeile mit Phase, Form und Größe
(verpflichtend oder proportional); wozu sie dient; (1) benötigter Kontext, generisch benannt; (2)
die Prompts, **auf Englisch**, jeder gefolgt von der Erklärung in der Sprache des Lesers, was wir
verlangen und warum jede Klausel dort steht; (3) das erwartete Ergebnis mit seinen Merkmalen; (4)
die Vollständigkeitsprüfung, die der Eigentümer ohne Code zu lesen durchführt; (5) die Warnsignale,
die Symptome einer schlecht erklommenen Sprosse.

Die englischen Prompts sind ein einziges Stück, identisch in allen Fassungen des Dokuments in den
acht Sprachen; `node build/build.mjs` extrahiert sie nach `prompts/` und prüft, dass keine
Übersetzung sie verändert hat.

Sie sind aus dem geschrieben, was wir in den drei Repositories getan haben, noch nicht eins zu eins
ausgeführt. Das erste Projekt, das sie von Anfang bis Ende nutzt, wird mehrere korrigieren: das ist
Teil von Sprosse 15.

| Sprosse | Datei | Phase | Form |
|---|---|---|---|
| 0 — Lässt sich dieses Projekt so angehen? | `peldano-00-elegibilidad.md` | Start | Gespräch (in Ausarbeitung mit Pablo) |
| 1 — Die Arbeitsvereinbarung | `peldano-01-contrato-de-convivencia.md` | Start | ein Durchgang + Anpassung |
| 2 — Projektdefinition und Pflichtlektüre | `peldano-02-definicion-y-lectura.md` | Start | Gespräch |
| 3 — Dimensionieren vor der Architektur | `peldano-03-dimensionar.md` | Start | Gespräch |
| 4 — Das Skelett mit seinen Toren | `peldano-04-esqueleto.md` | Start | ein langer Durchgang + visuelle Freigabe |
| 5 — Der Plan sind die offenen Posten | `peldano-05-pendientes.md` | Schleife | ein Durchgang + Routine |
| 6 — Entscheidungen werden neben dem Code festgehalten | `peldano-06-decisiones.md` | Schleife | kurzes Gespräch, jedes Mal |
| 7 — Tests als Sperren, rot bewiesen | `peldano-07-tests-en-rojo.md` | Schleife | Routine jeder Änderung |
| 8 — Produzent/Konsument-Symmetrie und Anti-Muster | `peldano-08-simetria-y-antipatrones.md` | Schleife | automatisch + eine wachsende Datei |
| 9 — Messen vor dem Bauen | `peldano-09-medir.md` | Schleife | ein Durchgang pro Messung |
| 10 — Ehrliche Verifikation und verhältnismäßiger Bericht | `peldano-10-verificacion-honesta.md` | Schleife | Routine jedes Berichts |
| 11 — Das periodische Audit als Input für den Plan | `peldano-11-auditoria.md` | Betrieb | ein langer Durchgang, anderer Prüfer |
| 12 — Fail-closed, Sperren und null stiller Schaden | `peldano-12-fail-closed.md` | Betrieb | Gespräch |
| 13 — Continuous Integration, Umgebungen, Geheimnisse und Deployment | `peldano-13-ci-entornos-secretos-deploy.md` | Betrieb | ein Durchgang + Deployment-Routine |
| 14 — Lebendige Dokumentation und Handbücher ohne KI | `peldano-14-documentacion-viva.md` | Betrieb | Routine + ein langer Durchgang |
| 15 — Der residente Agent und die Retrospektive mit Zahlen | `peldano-15-agente-residente-y-retrospectiva.md` | Betrieb und Abschluss | zwei Teile |

Phasen: **Start** wird einmal pro Projekt erklommen; **Schleife** wiederholt sich bei jeder
Änderung; **Betrieb**, wenn das System schon lebt. Die 15 kehrt zur 0 für das nächste Projekt
zurück. Die Dateinamen bleiben in allen Sprachen auf Spanisch, damit die Build-Werkzeuge sie
erkennen.
