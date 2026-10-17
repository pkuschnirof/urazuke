# Urazuke, die Nachweis-Methode — die methodische Leiter (Version 3)

Gespräch zwischen Pablo und Sumi, 17. Oktober 2026 (Version 1 am Vormittag; Version 2 am
Nachmittag, mit der Eröffnungsthese, den Sprossenverträgen und dem eigenen Repository; Version 3
mit dem Namen, den angereicherten Verträgen, den Prompts auf Englisch, dem Leitfaden nach
Projektgröße und dem Leitfaden nach Werkzeug). Dies ist ein Arbeitsdokument: wir werden es in
mehreren Durchgängen weiter ausarbeiten, also ist nichts darin schon Doktrin. Es ist schlicht das
erste ehrliche Destillat dessen, was wir in drei Repositories tatsächlich getan haben, die heute in
Produktion sind, mit echten Menschen, die sie benutzen.

Eine Anmerkung zum Stil, weil sie wichtig ist: dieses Dokument ist für Menschen geschrieben, die
diese Projekte nicht miterlebt haben. Deshalb erklärt es die Dinge in Ruhe, wiederholt, wenn es
nötig ist, verwendet Alltagssprache und hat am Ende ein **Glossar** mit jeder Abkürzung und jedem
umgangssprachlichen Ausdruck, der vorkommt. Wenn du irgendwann auf ein seltsames Wort stößt —
„Ratsche“, „Sperre“, „PND“, „fail-closed“ —, geh ins Glossar; da steht alles.

Dies ist die deutsche Fassung. Spanisch ist die Quelle der Wahrheit; wenn beide voneinander
abweichen, gilt die spanische und diese wird korrigiert. Die Prompts für das Modell sind in allen
Sprachen identisch.

## Der Name

**Urazuke** (裏付け) ist ein japanisches Wort für den Rückhalt, den eine Behauptung hat: das, was
sie von hinten stützt (wörtlich „das Futter auf der Rückseite“). Das Verb *urazukeru* bedeutet
„mit Belegen untermauern“. Pablo wählte es am 17. Oktober 2026 („Gehen wir mit Urazuke“), nachdem
die Namensprüfung Hashigo, Kaidan und Shōko wegen Kollisionen mit bestehenden Firmen und Projekten
ausgeschlossen hatte. Der Name wird nicht übersetzt; der Untertitel „die Nachweis-Methode“ schon:
*el método de la evidencia*, *the evidence method*, *o método da evidência*, *la méthode de la
preuve*, *il metodo del riscontro*, 裏付けの方法, 验证方法. In diesem Dokument ist „die Leiter“ die
Struktur der Methode — ihre sechzehn Sprossen — und „Urazuke“ die ganze Methode.

## Worum geht es hier?

Pablo hat es klar gesagt: er will kein Werkzeug lehren, er will **die Methode** lehren. Die Idee
ist, dass jeder, mit jedem Werkzeug der künstlichen Intelligenz, das programmieren kann,
„vibecoden“ kann (das heißt, Software bauen, indem man mit einer KI spricht, statt den Code von
Hand zu tippen), und dass das, was herauskommt, robust ist, produktionsreif, und — das ist das
Wichtige — **ohne dass der Projekteigentümer eine einzige Zeile Code prüfen muss**.

Das klingt ehrgeizig, und das ist es. Aber wir haben etwas, das fast niemand hat: drei reale
Systeme, die genau so gebaut wurden und heute mit echten Kunden funktionieren. Die Frage ist also
nicht „geht das?“, sondern „was haben wir getan, in welcher Reihenfolge, und was davon hat
wirklich den Unterschied gemacht?“.

Diese Leiter ist die Antwort auf diese Frage. Und sie wird die Grundlage für drei Dinge sein: die
Dokumentation der Methode, die Übungen der Lernenden und die Handbücher. Später werden wir sie
außerdem als „Projekt-Ausführungsfluss“ in Forge exportieren, damit das Werkzeug die Methode
führt, statt dass man sie im Kopf behalten muss.

## Woher das alles kommt (die Quellen)

Ich habe die drei Repositories nur lesend erhoben, ohne etwas anzufassen:

- **`[Repository yujin-forge]`** (das Werkzeug Forge und vor allem der Ort, an dem die Methode
  entstand): 1.090 Commits zwischen dem 10. Mai und dem 14. Oktober 2026. Dort liegen das
  Dokument der Qualitätsstandards (`docs/SQ.md`), die 31 Doktrinen in `docs/doctrine/`, das
  Anti-Muster-Register (`docs/GOTCHAS.md`), das Papier, in dem die Multi-Agenten-Crew beendet
  wurde (`docs/PAPER_SUMI_VS_AGENTIC.md`), die eingefrorenen Entscheidungen des Direktors
  (`docs/DIRECTOR_DECISIONS_2026_06_04.md`), der Plan des Registers der offenen Posten
  (`docs/PENDING_REGISTRY_PLAN.md`) und der Text der Regeln SQ 1 bis 9, die Forge dem Gehirn in
  jedem Zug injiziert (`src/chat/server.ts`).
- **`[Repository Autorisierungen]`** (das erste Produktionssystem, für eine Gesundheitseinrichtung):
  469 Commits zwischen dem 11. Juni und dem 9. Oktober, 641 offene Posten, alle geschlossen. Es
  enthält das anfängliche Entwurfsdokument, die Lektionen aus der Google-Cloud, mehrere Audits und
  die Handbücher.
- **`[Repository Kikan]`** (das zweite Produktionssystem, der Omnikanal-Servicedesk und die
  Kampagnen des Vereins): 442 Commits zwischen dem 21. August und dem 16. Oktober, 37 Tags, die
  Audit-Serie AUD-*, 19 Dokumente offener Posten, das Dokument der Persistenz-Neuentwicklung
  (`docs/REINGENIERIA_PERSISTENCIA_SQL.md`, mit seinen Etappen E1 bis E12 und dem berühmten
  Abschnitt 11.b), Continuous Integration und Deployment, und die beiden Berichte dieser Woche
  (Integrität am 14. Oktober, Qualität am 15.).
- Meine eigene Erinnerung an die Korrekturen, die Pablo mir in diesen Monaten gegeben hat
  („Messgerät mit Schutz“, „miss die Hypothese“, „prüf mit dem Log“, „schau zuerst, welche
  Version veröffentlicht ist“).

**Zu den Namen.** Die Kunden der beiden Produktionssysteme sind anonymisiert: wir nennen sie „die
Krankenkasse“ (mit ihrem „Autorisierer“) und „der Verein“, und ihre Systeme „Autorisierungen“ und
„Kikan“. Die Zahlen, Daten und Commits sind echt; die Namen der Organisationen bleiben bis zu
ihrer Erlaubnis zurückgehalten. Die lokalen Pfade der Ursprungs-Repositories erscheinen als
`[Repository …]`.

Eine Konvention, die für das ganze Dokument gilt: **jede Behauptung zitiert den Commit oder das
Dokument, in dem der Beleg liegt**. Und wenn etwas meine Interpretation ist und keine geprüfte
Tatsache, markiere ich es mit dem Etikett `[Hypothese]`, damit auf den ersten Blick unterscheidbar
ist, was bewiesen ist und was ich vorschlage.

## KI unterbricht die Methode nicht: sie setzt sie fort

Das ist die These, die das Dokument eröffnet, und wir stellen sie an den Anfang, weil sie den
häufigsten Einwand entschärft, bevor er auftaucht: „wie willst du Code vertrauen, den eine Maschine
geschrieben hat?“.

Die Antwort ist, dass **die Branche schon vor zwanzig Jahren aufgehört hat, dem Autor des Codes zu
vertrauen**. Als der Großteil des Schreibens an Junior-, ausgelagerte oder wechselnde Teams
überging, wurde die Zeile-für-Zeile-Prüfung unmöglich durchzuhalten. Und an ihrer Stelle wuchs
alles, was wir heute für selbstverständlich halten: automatisierte Tests, Continuous Integration,
Abnahmekriterien, Pipelines, die nichts ohne Grün durchlassen, das „Shift left“ des Testens, die
Qualitätssicherung als unabhängige Funktion. Das war die Antwort der Systemtechnik auf „wer
schreibt, ist nicht vertrauenswürdig“: seinen Code nicht lesen, Belege von ihm verlangen.

Ein Modell der künstlichen Intelligenz schreiben zu lassen ist also kein Sprung ins Leere. Es ist,
einen Autor, dem wir schon nicht mehr vertrauten, durch einen anderen zu ersetzen, dem wir auch
nicht vertrauen, und für den **wir den Prüfapparat bereits gebaut hatten**. Das sollte beruhigen,
nicht beunruhigen. Und obendrein ist der neue Autor billiger, schneller und — anders als der
Junior — nicht beleidigt, wenn man ihn bittet, rot zu beweisen.

Deshalb stützt sich diese Methode, ohne es zu verbergen, auf die klassische Systemtechnik. Das
Gerüst ist das übliche: Erhebung, Anforderungen, Dimensionierung, Entwurf, Bau, Test, Deployment,
Betrieb, Audit. Es konnte nicht anders sein, denn die Probleme sind die üblichen: nicht zu wissen,
wie viele Daten es geben wird, nicht zu wissen, was der Kunde will, nicht zu wissen, ob das Gebaute
das Verlangte ist. Die KI hat die Probleme nicht verändert; sie hat verändert, wer welchen Teil
macht und zu welchen Kosten. Sogar das Eignungskriterium X2 (siehe Sprosse 0) ist klassische
Technik: Testbarkeit als Vertragsbedingung.

### Was alt und was neu daran ist

Das Alte, von dem man sagen sollte, dass es alt ist: das Etappengerüst, die Unabhängigkeit dessen,
der prüft, von dem, der baut, Tests als Beleg, Dokumentation als Teil des Produkts, die Erhebung
vor dem Entwurf.

Was sich tatsächlich ändert, und wo unser Anteil liegt, sind drei Dinge:

1. **Wohin der Aufwand des Menschen geht.** In der klassischen Methode schreibt der Mensch die
   Spezifikation, schreibt den Code, und ein anderer Mensch prüft ihn. Hier tut der Mensch nur zwei
   Dinge: **er entscheidet und er prüft Artefakte**. Alles andere — entwerfen, bauen, testen,
   messen, dokumentieren — macht das Modell. Deshalb endet jede Sprosse in einer
   „Vollständigkeitsprüfung ohne Code zu lesen“: das ist genau der Ort, an dem der Mensch
   unverzichtbar bleibt, und kein anderer.

2. **Der Autor stellt auch den Beleg her.** Das ist der einzige wirklich neue Punkt, und es ist
   die Nuance, die drei ganze Sprossen rechtfertigt. Der Junior schrieb zweifelhaften Code, aber er
   stellte den Beleg nicht her: die Tests und Messungen baute jemand anders, oder zumindest schaute
   jemand anders darauf. Das Modell dagegen produziert den Code *und* den Test *und* das Messgerät
   *und* den Bericht, in derselben Sitzung, mit derselben Sicherheit in der Stimme, wenn es recht
   hat und wenn es sich irrt. Wir haben es gesehen: das Messgerät, das zweimal log, der als
   „Erfolg“ gemeldete Authentifizierungsfehler, die drei von vier Behauptungen, die falsch waren.
   „Belege statt Code prüfen“ bleibt also das richtige Prinzip, aber **der Beleg muss sich selbst
   beweisen**: der rot gesehene Test (Sprosse 7), das Instrument mit seinem Schutz (Sprosse 9),
   der Bericht, der Verifiziertes von Geglaubtem trennt (Sprosse 10), der vom Erbauer verschiedene
   Prüfer (Sprosse 11). Das ist keine neue Sorge: es ist dieselbe Disziplin der Unabhängigkeit der
   Qualitätssicherung, einen Schritt weiter nach innen getragen.

3. **Die Kosten der Artefakte.** In der klassischen Methode war Dokumentation teuer, also wurde
   sie einmal gemacht und alterte. Hier ist das Neuerzeugen kostenlos, also wird die Regel zu „im
   selben Commit“ und „von Hand reproduzierbar, ohne KI“. Was früher ein unerreichbares Ideal war,
   wird zu einem Tor.

Für den Kurs und die öffentliche Präsentation definiert das die Positionierung ehrlich: es ist
nicht „die neue Art zu programmieren“; es ist **Systemtechnik, angewandt auf einen Erbauer, der
nicht müde wird und dem man nicht glauben kann**. Für die, die aus der Systemwelt kommen, klingt es
vertraut und senkt ihr Misstrauen („das kannst du schon“); denen, die vom Vibecoding kommen, gibt
es, was ihnen fehlt, nämlich genau das Gerüst. Und es unterscheidet uns von den Werkzeugen, die
Geschwindigkeit verkaufen und das ganze Gerüst weglassen.

---

## Teil A — Erhebung: die Momente und Meilensteine, die zählten

### A.1 yujin-forge: wo die Methode entstand (Mai bis Oktober 2026)

Es gibt etwas Grundlegendes, das gleich zu Beginn gesagt werden muss, weil es die Lesart von allem
anderen verändert: **die Methode wurde nicht zuerst entworfen und dann angewendet**. Es war
umgekehrt. Jede Regel wurde *nach* einem Rückschlag geschrieben, im selben Repository, in dem
dieser Rückschlag erlebt wurde, und oft am selben Tag. Keine Doktrin entstand abstrakt, in einem
Whiteboard-Meeting. Alle haben einen Vorfall hinter sich und einen Geburts-Commit. Das ist, glaube
ich, das Ehrlichste und Wertvollste, was wir zu erzählen haben.

Hier die Abfolge, in Reihenfolge:

| Datum | Moment | Was sich in der Methode änderte | Beleg |
|---|---|---|---|
| 25. Mai | Die SQ (die Qualitätsstandards) entstehen | Es ist die erste „Arbeitsvereinbarung“ zwischen Mensch und Agent. Sie sagt Dinge wie: die Zeit des Menschen ist heilig; keine technischen Schulden (was bricht, wird an der Wurzel behoben); alles in ASCII; die Dokumentation immer aktuell; und der exakte Umfang, nicht mehr und nicht weniger als verlangt. | `2219f7a docs: add SQ.md` |
| 27. Mai | Erstes GOTCHAS-Register | Wiederkehrende Fehler werden in einem festen Format notiert: wie es riecht, was die Grundursache ist, wie es behoben wurde, und wie man es beim nächsten Mal erkennt, bevor es wehtut. | `73f4029` (gotchas doc) |
| 2. Juni | Tore (Gates) und G-DOC, nur injiziert, wenn sie zutreffen | Die expliziten Tore des Arbeitsablaufs erscheinen, nummeriert G1 bis G9. Und ein kluges Detail: die Doktrin tritt nur in dem Moment in den Prompt des Agenten ein, in dem sie zutrifft, nicht immer, um keinen Kontext zu verschwenden. | `5b47475` |
| 4. Juni | Die Testpolitik wird neu gefasst | Bis dahin bestand man auf „erst der Test, dann der Code“ (TDD) für alles. Man entdeckt, dass das nicht universell taugt: standardmäßig kommen die Tests *nach* der Umsetzung, TDD bleibt eine Option für kleine, gut abgegrenzte Umfänge, das Skelett muss als Tor grün sein, und ein Schleifenschutz wird hinzugefügt (wenn der Agent sich im Kreis dreht, ohne voranzukommen, springt ein Modal auf, das alles anhält). | `a9f59c7`, `docs/doctrine/testing-policy.md` |
| 4. Juni | Die Entscheidungen des Direktors werden eingefroren | Vor einem Sprint werden drei Entscheidungen aufgeschrieben und nummeriert (D1, D2, D3). Hier entsteht die Praxis „die Entscheidung wird vor dem Bauen aufgeschrieben“. | `docs/DIRECTOR_DECISIONS_2026_06_04.md` |
| 5. Juni | NEUENTWURF: die Multi-Agenten-Crew wird beendet | Das ist ein riesiger Moment. Es gab eine Crew aus fünf Agenten (Direktor, Analyst, Programmierer, Tester, Skelettbauer), die sich Arbeit zuschoben. Es wurde ein gemessenes Experiment gemacht: diese Crew gab 60 Dollar und 73 Minuten aus und lieferte Halbfertiges; eine einzige Sitzung mit einem einzigen Agenten brauchte 90 Minuten und lieferte Veröffentlichbares. Die ganze Crew wurde abgeschafft. Es ist der erste Fall von „Retrospektive mit einer Zahl in der Hand, und Neuentwurf“. | `7584f8b`, `docs/PAPER_SUMI_VS_AGENTIC.md` |
| 6. Juni | Register der offenen Posten | Der Arbeitsplan wird ZUR Liste der offenen Posten: eine kanonische Warteschlange, mit Befehlen zu ihrer Verwaltung, in jeder Sitzung aufgefrischt. Es gibt keinen „Plan“ auf der einen und „Aufgaben“ auf der anderen Seite mehr. | `4fc82c6`, `docs/PENDING_REGISTRY_PLAN.md` |
| 10. Juni | Verpflichtende Doktrinen + Verifikationsehrlichkeit + Arbeitsablauf-Arten | Die Doktrin ist nicht mehr optional: sie geht als Pflichtblock in jeden Prompt. Die „Verifikationsehrlichkeit“ entsteht: prüfen, dass das Netz wirklich rot wird, wenn es soll, blinde Flecken erklären, Behauptungen im Verhältnis zum Geprüften machen. Und drei Arten von Arbeitsablauf werden getrennt: neues Projekt (Greenfield), Korrektur und Weiterentwicklung. | `7ab9d8a`, `2c552c0`, `docs/doctrine/verification-honesty.md`, `workflow-kinds.md` |
| 14. bis 21. Juni | Autopiloten von 24 und 48 Stunden | Der Agent arbeitet ein oder zwei Tage allein unter einem schriftlichen Mandat: Commit und Push pro Stück, ohne zu fragen, und der Mensch erhält eine Zusammenfassung. Es wird bewiesen, dass die Methode lange Autonomie aushält. | Erinnerung `feedback_autopilot_mandate`, `project_autonomous_multisession_interrupt` |
| 5. und 10. Juli | Nebenläufigkeitsskala und Diagnosemodus | Der Agent betritt fremde Produktionssysteme im Diagnosemodus: nur lesend, begrenzt, ohne etwas anzufassen. | `docs/doctrine/diagnostic-mode.md` |
| 22. Juli | Leistungshärtung | Skalierungsmuster werden aus dem System der Krankenkasse extrahiert (zum Beispiel das der zwei Transaktionen; und „messen, bevor man anfasst“). Zum ersten Mal nährt sich die Methode aus einem System, das schon in Produktion ist. | `873339c` |
| 14. August | Forge Embed live in der Produktion der Krankenkasse | Der Agent wird RESIDENT im System des Kunden: mit einer verpflichtenden Systemkarte, mit der Regel „zuerst die betriebliche Lösung“ und mit der Fähigkeit, Tickets zu eröffnen. | die Erinnerung an den residenten Assistenten in Produktion |
| 10. und 11. Oktober | Betriebsmodus + Dimensionierung (G9) | Es wird vor dem Bauen dimensioniert, mit Wahl aus festen Optionen, und die Dimensionierung wird als weiteres Tor festgehalten. | `c602725`, `0bd1b05`, `docs/doctrine/sizing.md` |
| 13. Oktober | Persistenzschnittstelle | Eine „asymmetrische“ Entscheidung (sie kostet wenig, wenn du dich irrst, sehr viel, wenn du sie nicht triffst): die Schnittstelle zur Datenbank ist ab Zeile eins asynchron, auch wenn die erste Engine synchron ist. Sie später zu ändern kostete eine ganze Etappe der Neuentwicklung (E6: drei Testbatterien). | `7391cc5`, `docs/doctrine/persistence-interface.md` |
| 14. Oktober | Der verwaiste Zug von 1 Stunde 43 → Version 1.18.0 | Ein Fehlschlag der Methode, und ein hässlicher: der Agent arbeitete eine Stunde und dreiundvierzig Minuten unsichtbar für den Menschen und machte in dieser Zeit sechs Commits. An der Wurzel behoben: ein Stille-Wachhund, eine Leine zwischen Prozessen und 28 Tests. | `b80a659`, CHANGELOG 1.18.0 |

Was liest man in dieser Tabelle? Dass die Methode in fünf Monaten von „Höflichkeitsregeln“ (den
SQ, die fast Umgangsformen des Zusammenlebens sind) zu „gemessenen Toren“ (Dimensionierung,
Abfragebudget, Verifikationsehrlichkeit) überging. Und dass jede Sprosse ein Geburtsdatum und einen
Rückschlag hat, der sie rechtfertigte. Das macht sie lehrbar: es ist keine Theorie, es ist
Narbengewebe.

### A.2 Autorisierungen: die Methode unter realer Last (Juni bis Oktober 2026)

Das war das erste System mit echten Nutzern, mit Geld im Spiel und mit Gesundheitsdaten. Es sind
641 offene Posten, alle geschlossen. Und hier passierte etwas anderes: die Methode lernte zu
**betreiben**, nicht nur zu bauen. Es ist eine Sache, dass ein System funktioniert, wenn du es
selbst testest; eine ganz andere, dass es um drei Uhr morgens weiterläuft, während ein Roboter
Aufträge genehmigt.

| Datum | Moment | Was es beitrug | Beleg |
|---|---|---|---|
| 11. Juni | Start mit einem Entwurfsdokument (die „Option C“) | Es gab eine anfängliche Spezifikation. Und das Repository „überholte“ sie sehr schnell: was gebaut wurde, war weit mehr, als das Papier sagte. Lektion: die Spezifikation taugt als Ausgangspunkt, aber der lebende Plan sind die offenen Posten. | das anfängliche Entwurfsdokument |
| 23. Juni | Audit der Abfragen ohne Index | Das erste Audit von „Full Scans“ (Abfragen, die die ganze Tabelle lesen, weil kein Index da ist) an einem lebenden System. Und die Befunde werden zu offenen Posten, nicht zu einem Bericht, der abgelegt wird. | Auditdokument vom 23. Juni |
| 24. Juni | Lektionen aus der Google-Cloud | Infrastrukturfehler werden als Lektionen aufgeschrieben, um sie nicht zu wiederholen. | GCP-Lektionen-Dokument |
| 26. Juni | Benutzerhandbuch | Das Handbuch entsteht zusammen mit dem System, nicht am Ende, wenn sich niemand mehr an etwas erinnert. | Handbuch vom 26. Juni |
| 13. Juli | Sicherung der zweiten Ebene | Zwei Backup-Ebenen, bevor man dem System vertraut: eine lokal und eine im Google-Speicher. | Commit Backup Ebene 2 |
| 14. Juli | Die Saga von PND-300 (vier Runden Grundursache) | Ein Bug, der dreimal wiederkam, bis die wahre Ursache gefunden wurde. Hier hört „die Behebung ist an der Wurzel oder sie ist keine Behebung“ auf, ein schöner Satz zu sein, und wird zur Pflichtpraxis. | PND-300 |
| 16. Juli | Sicherheitsaudit | Sicherheit wird als periodisches Audit behandelt, das offene Posten erzeugt, nicht als Checkliste, die einmal am Anfang abgehakt wird. | Auditdokument vom 16. Juli |
| 26. und 29. Juli | Internes RPAForce-Handbuch + Notfallwiederherstellungshandbuch | Alles Betriebliche (ausrollen, wiederherstellen, warten) wird „von Hand reproduzierbar, ohne KI“ dokumentiert. Wenn morgen kein Agent da ist, kann ein Mensch dem Handbuch folgen. | `6444ce6 (pnd442)`, `a30cee3 (pnd459)` |
| 27. Juli | „Fail-closed“ als Reflex | Wenn eine Tabelle nicht existiert oder eine Suche fehlschlägt, bleibt die Zeile einfach ohne ihren Knopf; nie bricht die ganze Liste. Im Zweifel nicht handeln und nicht brechen. | `e18406d (pnd452)` |
| 6. und 7. August | Gegen die Produktion geprüfte Zähler (1.355 gegen 1.234) | Das ist für mich das vollständigste Beispiel für „mit Instrument prüfen“. Ein Zähler zeigte 1.355 Genehmigungen und die Abfrage zeigte 1.234. Die Grundursache wurde direkt an der Produktion geprüft (nur lesend), die Differenz Zahl für Zahl zerlegt (145 zu viel, 24 zu wenig, 145 − 24 = 121), ein Test geschrieben und gegen das alte Kriterium ROT bewiesen, und das Diagnoseskript blieb fürs nächste Mal im Repository. | `ab3e529 (pnd517)`, `1f5feb9 (pnd514)` |
| 6. August | Produzent/Konsument-Symmetrie live | Der „Wartegrund“, den der Nutzer sieht, wird mit DENSELBEN Toren berechnet, mit denen der Roboter entscheidet (Regel SQ 7); und die Spaltenliste wird vom Server definiert und vom Frontend konsumiert. So können sie nicht auseinanderdriften. | `50fe968 (pnd510)`, `7251129 (pnd509)` |
| 7. August | Panikknopf mit eigener Sperre | Sperren: doppelte Sicherung, Trockenlauf (Dry-run) des automatischen Genehmigers, ein Wächter, der mit Schutzvorrichtungen anstößt. | `0954740 (pnd524)` |
| 10. August | Fachregeln im Commit festgehalten | Wörtlich: „Regel Pablo: genehmigt + Guthaben = zurück“, „Entscheidung Pablo 2026-08-10“. Die Geschäftsentscheidung bleibt mit Datum und Eigentümer, direkt am Code, der sie umsetzt. | `0ae3ae6 (pnd550)` |

Was liest man hier? Dass die Methode in diesem Repository ihre BETRIEBLICHEN Sprossen gewann:
Fail-closed, Sperren, Backups, Handbücher, denen ein Mensch ohne KI folgen kann, periodische
Audits und die Prüfung gegen die Produktion mit einem Instrument statt nach Augenmaß.

### A.3 Kikan: die reife Methode (August bis Oktober 2026)

Das zweite Produktionssystem und das erste, das mit allem Vorherigen gebaut wurde, das vom ersten
Tag an aufgeschrieben war. Hier erscheinen die Sprossen des **Messens** und der **kontinuierlichen
Integration und Auslieferung**: es ist das Repository, in dem zum ersten Mal das Messen systematisch
vor dem Bauen kommt.

| Datum | Moment | Was es beitrug | Beleg |
|---|---|---|---|
| 21. August | Start | Das Projekt beginnt mit einer betrieblichen `CLAUDE.md` (der Datei, die der Agent beim Start liest) und mit offenen Posten als Plan vom ersten Tag an. | erster Commit |
| 28. und 29. August | Audit-Serie AUD-* → 19 Dokumente offener Posten | Ein frühes, systematisches Audit, das direkt zum Arbeitsplan wird. | PND-Dokumente vom 28. und 29. August |
| 28. August | Continuous Integration (CI) | Die Tests laufen ab der ersten Woche auf GitHub. | `ci.yml` |
| 23. und 24. September | Deployment + Konfiguration nur auf dem Server + Node 22 fixiert | Das Deployment ist ein Paket; die Konfiguration lebt in der Umgebung, nicht im Repository; und die Runtime-Version ist festgenagelt. | `deploy.yml`, `bb801ed` |
| 30. September bis 4. Oktober | Das Deployment wird Schlag für Schlag gehärtet | Die öffentliche URL in beiden Umgebungen; den Dienst vor dem Neustart und vor dem Zurückrollen neu laden; eine Fixture, die ABGLEICHT statt zu duplizieren; das Material des Kunden außerhalb des gespiegelten Baums. Fünf offene Posten in Folge zum selben Thema: spät entdecktes Deployment fordert seinen Preis. | `f85c3c9`, `513c8d0 (PND-108)`, `076df76 (PND-134)`, `9d76af8 (PND-130)` |
| 3. Oktober | Konfiguration isolieren | Die Testbatterie verschmutzt die im Deployment mitreisende Konfiguration nicht mehr. | `0bd20a8 (PND-107)` |
| 4. und 8. Oktober | Beförderung von UAT nach PROD | Ein expliziter Kreislauf, um Konfiguration und Kampagnen von der Testumgebung in die Produktion zu bringen. | `4eb5ad7 (PND-027)`, `7658e2e` |
| 11. Oktober | NEUENTWICKLUNG, Etappe 1: das aus dem CODE abgeleitete Schema, mit Sperre | Das Inventar der Tabellen und Felder wird aus dem Code selbst abgeleitet, mit einem Test, der es schützt, und am Board (dem mit Pablo geteilten Board) eröffnet. | `6113319`, `68819ce` |
| 11. bis 13. Oktober | Etappe 6: die statische Ratsche, drei Batterien auf asynchron umgestellt | Die „Ratsche“ ist ein Zähler von Datenbankaufrufen ohne `await` (ohne auf das Ergebnis zu warten), der nur sinken kann, nie steigen. Und es passierte etwas Großartiges zum Erzählen: ZWEIMAL wurde entdeckt, dass das Messgerät Teile des Codes nicht sah (70 Aufrufe, und später 84, mit dem Zähler auf null). | `06b2734`, `f6e5221`, `2fc6239`, `1d55a93` |
| 13. Oktober | Messgeräte, die logen | Wörtlich aus den Commits: „das Messgerät von E7.5 log auf einer Datenbank mit bereits angewandtem ALTER“; „es sind 44, nicht 27“. Die Methode lernt etwas Neues: **auch das Instrument muss geprüft werden**. | `880ac0f`, `f955620` |
| 14. Oktober | Etappe 8: der Schalter, das Abfragebudget und der Wiedereintrittsschutz | Der Wechsel der Datenbank-Engine ist ein Schalter pro Umgebung; jeder Pfad der Anwendung hat ein gemessenes, durch einen Test geschütztes Abfragebudget. | `5926b3f`, `10ada00` |
| 14. Oktober | Etappe 9: die Obergrenze wird auf das Gemessene gezurrt (63 über 60) | Das Budget ist keine erfundene Zahl: es ist das Gemessene plus eine kleine Spanne. | `0730082`, `7f5f1af` |
| 14. Oktober | Abschnitt 11.b: die fünf Regeln | Messgerät mit Schutz; das Instrument bauen, wenn es nicht existiert; in beide Richtungen prüfen; Näherungen markieren; und wer ausführt, prüft den, der geplant hat. Mit einem Satz, der alles sagt: „drei von vier Behauptungen waren falsch; wo ein Instrument war, exakt“. | `docs/REINGENIERIA_PERSISTENCIA_SQL.md` 11.b |
| 14. Oktober | Etappen 10 und 12 + externe Integrität | Das ECHTE Paket bringt die Migrationsskripte mit; die Datenaufbewahrung wird pro Tabelle deklariert und in der Produktion begrenzt; und ein Integritätsbericht von einem Dritten (mir, Sumi), den Forge als offene Posten aufnimmt. | `f72b15a`, `b266f11`, `INTEGRIDAD_..._10_14.md` |
| 14. Oktober | Das Deployment verpackt nur noch (gate-ci) | Die Tests laufen EINMAL (in CI); das Deployment wartet auf das Ergebnis und verpackt. Von 16–27 Minuten pro Commit auf 11. | `39497b0` |
| 15. Oktober | PND-223 binnen 24 Stunden zurückgezogen / PND-257 | An einem einzigen Tag wurden zwei Administrator-Türen geschaffen. Eine externe Prüfung entdeckte es; eine wurde zurückgezogen und ein einziger Weg blieb. Die Methode hält „schnell rückgängig machen“ ohne Drama aus. | `69bdab2`, `20fdbe7`, `1558ee4` |
| 15. Oktober | Qualitätsaudit | Noten pro Dimension; eine bekannte Schwachstelle in einer Abhängigkeit; eine 2.679-Zeilen-Komponente; eine `CLAUDE.md` mit 9.661 Zeilen. Input für den nächsten Plan. | `AUDITORIA_CALIDAD_CODIGO_2026_10_15.md` |

Was liest man hier? Dass Kikan das erste Repository ist, in dem das MESSEN dem Bauen systematisch
vorausgeht (Dimensionierung, Ratsche, Budget), und in dem Deployment und Continuous Integration als
Teil des Produkts behandelt werden und nicht als Formalität.

### A.4 Die Muster, die sich in den drei Repositories wiederholen

Betrachtet man die drei Repos zusammen, gibt es zehn Dinge, die immer wieder auftauchen. Das ist,
im Kern, die Methode:

1. **Rückschlag → Regel am selben Tag aufgeschrieben.** Keine Doktrin entstand abstrakt. Jede hat
   einen Geburts-Commit und einen Vorfall dahinter.
2. **Der Plan sind die offenen Posten.** Nummerierte Posten (PND-nnn) in den drei Repos; die
   Spezifikation ist der Ausgangspunkt, die Warteschlange der offenen Posten die Wahrheit.
3. **Die Entscheidung wird neben dem Code festgehalten, mit Eigentümer und Datum.** „Regel
   Pablo“, „Entscheidung Pablo 2026-08-10“, die Entscheidungen des Direktors und in Kikan die
   „Entscheidung durch Unterlassung“ (wenn Pablo nicht antwortete und der Agent wählte, ließ er es
   als solche markiert).
4. **Der Test wird rot bewiesen.** Es reicht nicht, dass er grün ist: es muss gezeigt werden, dass
   der Test gegen den alten Code fehlschlägt. Wenn du ihn nie rot gesehen hast, weißt du nicht, ob
   er etwas beweist.
5. **Mit Instrument messen, und das Instrument prüfen.** Ein Skript mit Test, das im Repo
   mitreist; das Messgerät log zweimal und das Messgerät wurde vor dem Code behoben.
6. **Fail-closed und Sperren.** Nichts bricht stillschweigend; im Zweifel nicht handeln.
7. **Periodisches Audit → offene Posten.** Full-Scan im Juni, Sicherheit im Juli, AUD-* im August,
   Integrität und Qualität im Oktober. Das Audit ist kein Bericht: es ist Plan.
8. **Dokumentation und Handbücher entstehen mit dem System** und werden im selben Commit wie die
   Änderung gepflegt.
9. **Der Agent betreibt innerhalb des Systems** (Diagnose → Betrieb → resident) mit begrenzten
   Berechtigungen und Genehmigungen; der Mensch genehmigt, er tippt nicht.
10. **Retrospektive mit Zahl → Neuentwurf.** Die Multi-Agenten-Crew wurde mit 60 Dollar und 73
    Minuten gegen 90 Minuten beendet; das Deployment wurde mit 16–27 Minuten gegen 11 aufgeteilt;
    und diese Leiter selbst ist genau das.

Und nun die Fehlschläge, denn ohne sie wäre das Propaganda und keine Erhebung: der verwaiste Zug von
einer Stunde dreiundvierzig (14. Oktober); ein als „Erfolg“ gemeldeter Authentifizierungsfehler;
zwei Administrator-Türen in 24 Stunden; 23 Pushes an einem Tag, die das Kontingent von GitHub
Actions verbrannten; der in einem Transkript abgedruckte Datenbankschlüssel; eine `CLAUDE.md`, die
zu einem Änderungsprotokoll mit 9.661 Zeilen wurde; die Forge-Mobile-App, die ihre Tabs verliert;
und die Messgeräte, die zweimal logen. All das ist passiert. Und all das steht in der Leiter, denn
daher kommen die Sprossen.

---

## Teil B — Die Leiter, Version 3

### Wie man jede Sprosse liest

Jede Sprosse hat sieben Teile, immer dieselben, damit man sie vergleichen kann:

- **Absicht**: was sie sucht, in einem Satz.
- **Eingaben**: was vorher existieren muss, um sie erklimmen zu können.
- **Artefakt**: was geschrieben oder ausführbar zurückbleibt, wenn sie erklommen ist. Immer etwas
  Konkretes: eine Datei, ein Test, ein Skript.
- **Tor**: was wahr sein muss, um zur nächsten zu gelangen. Wenn es nicht erfüllt ist, steigt man
  nicht.
- **Wer entscheidet**: der Projekteigentümer, der Agent oder niemand, weil es automatisch ist.
- **Fehlschlag, den sie verhindert**: der reale Rückschlag, der sie hervorbrachte. Das macht sie
  glaubwürdig.
- **Beleg**: der Commit oder das Dokument, wo es steht.

Zwei wichtige Klarstellungen. Erstens: **die Leiter ist werkzeugneutral**. Jedes Artefakt ist eine
Datei, ein Test oder ein Skript; keines verlangt Forge. Forge automatisiert sie (die Tore, die
Befehle, das Register der offenen Posten), aber die Sprosse existiert ohne Forge. Zweitens: **die
Sprossen sind nicht streng sequenziell**. Es gibt drei Phasen: 0 bis 4 sind Start und werden
einmal pro Projekt erklommen; 5 bis 10 sind die Schleife, die sich bei jeder Änderung wiederholt;
und 11 bis 15 sind Betrieb, wenn das System schon lebt. Die 15 schließt den Kreislauf und kehrt zur
0 für das nächste Projekt zurück.

### Wie jede Sprosse ausgeführt wird: der Vertrag

Die siebenteilige Karte sagt, was jede Sprosse sucht und was sie hinterlässt. Aber eine Sprosse
versteht man erst ganz, wenn man sieht, **wie man sie verlangt, was zurückkommen muss und woran ich
erkenne, dass es vollständig zurückkam**. Deshalb hat jede Sprosse neben der Karte einen
**Vertrag** in einer eigenen Datei in `peldanos/`, immer mit denselben fünf Abschnitten:

1. **Benötigter Kontext** — generisch benannt („Erhebung der Mengendaten“, „Lesezugriff auf das
   Vorgängersystem“, „die Liste der folgenreichen Aktionen“), ohne ins Detail der Systemtechnik zu
   gehen. Erhebungen sind von Natur aus unvollständig; wir versuchen nicht, sie mit einem Formular
   vollständig zu machen.
2. **Prompt(s)** — was man dem Modell gibt, wörtlich. Der eröffnende und, wenn die Sprosse ein
   Gespräch ist, der abschließende. Alle tragen dieselbe Klausel, die der Kern der Sache ist: *das
   Modell bewertet, ob der Kontext ausreicht; wenn nicht, fragt es nach allem Fehlenden, bevor es
   weitermacht; und es schätzt oder erfindet keine Angabe, die nur das Geschäft hat*. Wer weiß,
   was ihm zum Rechnen fehlt, ist das Modell, nicht ein Formular.
3. **Erwartetes Ergebnis** — die detaillierten Merkmale des Artefakts: welche Datei, welche
   Abschnitte, was jeder enthalten muss, was nicht fehlen darf.
4. **Vollständigkeitsprüfung** — die Liste der Prüfungen, die der Eigentümer am Artefakt
   durchführt, **ohne Code zu lesen**. Wenn eine „nein“ ergibt, ist die Sprosse nicht erklommen.
5. **Warnsignale** — zwei oder drei Symptome dafür, dass die Sprosse schlecht erklommen wurde,
   obwohl sie erklommen scheint. Es sind die, die man Wochen später sieht, wenn es schon wehtut.

Und in der Kopfzeile jedes Vertrags, neben Phase und Form, die **Größe**: ob die Sprosse in jedem
Projekt verpflichtend oder proportional ist, und was „proportional“ in einem kleinen bedeutet.

**Die Prompts sind auf Englisch.** Das ist eine Entscheidung (D-013) und hat drei Gründe:
derselbe Inhalt braucht auf Spanisch zwischen 30 und 50 % mehr Tokens; die Fähigkeit der Modelle,
Anweisungen zu befolgen, ist auf Englisch besser kalibriert, sodass ein englischer Prompt Kürze
besser verträgt, ohne mehrdeutig zu werden; und das Fachvokabular (test, commit, rollback, mock)
ist Englisch. Unter jedem Prompt steht die Erklärung in der Sprache des Lesers, was wir verlangen
und warum jede Klausel dort steht: der Prompt ist ein einziges, in den acht Fassungen des Dokuments
identisches Stück; die Erklärung ist das, was übersetzt wird. Und alle enden mit „Reply in my
language“, denn der Prompt ist auf Englisch, das Gespräch muss es aber nicht sein.

Diese sechzehn Verträge sind außerdem das, was später nach Forge exportiert wird: heute injiziert
Forge eine Doktrin, wenn ein Tor durchschritten wird; der Sprossenvertrag *ist* diese Doktrin, und
der Prompt *ist* das, was injiziert wird. Sie für den Kurs zu schreiben und sie für den Forge-Fluss
zu schreiben ist dieselbe Arbeit.

### Was verpflichtend und was proportional ist, je nach Projektgröße

Eine Frage, die sofort auftaucht: „das alles für ein kleines System?“. Die Antwort ist, dass
sechzehn Sprossen nicht sechzehn Wochen sind; mehrere werden in einer Stunde erklommen, und die
proportionalen schrumpfen mit dem Projekt. Was nicht schrumpft, ist die Liste der nicht
verhandelbaren. Diese Tabelle ist ein Vorschlag `[Hypothese]`, der mit dem ersten Projekt bestätigt
werden soll, das die Methode von Anfang bis Ende anwendet:

| Sprosse | Kleines Projekt (ein Eigentümer, wenige Nutzer, kein Geld im Spiel) | Projekt mit Nutzern und Konsequenzen |
|---|---|---|
| 0 Eignung | verpflichtend (eine Stunde) | verpflichtend |
| 1 Vereinbarung | verpflichtend (eine halbe Stunde) | verpflichtend |
| 2 Definition | verpflichtend, fünfzig Zeilen reichen | verpflichtend |
| 3 Dimensionieren | verpflichtend, eine halbe Seite und eine Entscheidung | verpflichtend, vollständig |
| 4 Skelett | verpflichtend, wenn es Nutzer haben wird | verpflichtend |
| 5 Offene Posten | verpflichtend | verpflichtend |
| 6 Entscheidungen | verpflichtend | verpflichtend |
| 7 Tests in Rot | verpflichtend | verpflichtend |
| 8 Symmetrie | die Regel ja; die Karte optional | verpflichtend mit Karte |
| 9 Messen | proportional: zählen und notieren | verpflichtend, mit Messgeräten und Budgets |
| 10 Ehrliche Verifikation | verpflichtend | verpflichtend |
| 11 Audit | eines, vor der Produktion | periodisch |
| 12 Fail-closed | optional, wenn nur lesend | verpflichtend |
| 13 Integration und Deployment | Minimum: Tests allein, Konfiguration draußen, Rollback | verpflichtend, vollständig |
| 14 Dokumentation | Minimum: Wiederherstellung | die drei Handbücher |
| 15 Resident und Retrospektive | einseitige Retrospektive | beides |

Kurz: es gibt neun Sprossen, die in keinem Projekt verhandelbar sind (0, 1, 2, 3, 5, 6, 7, 10 und
die Retrospektive der 15), und sieben, die mit dem Projekt dimensioniert werden.

### Wie man sie mit jedem Werkzeug verwendet

Die Methode ist werkzeugneutral; was sich von einem Werkzeug zum anderen ändert, ist, **wohin man
jedes Artefakt legt**, damit das Modell es liest. Die Entsprechung für die Ende 2026 meistgenutzten
Werkzeuge:

| Artefakt der Methode | Claude Code | Cursor | Codex CLI / Gemini CLI | Forge |
|---|---|---|---|---|
| Arbeitsvereinbarung (S1) und Routinen (S5, S6, S7, S8, S10, S14) | `CLAUDE.md` des Projekts | `.cursor/rules/` | `AGENTS.md` / `GEMINI.md` | pro Tor injizierte Doktrinen |
| Projektdefinition (S2) | `CLAUDE.md` + `docs/STATUS.md` | dito, in Regeln und Docs | dito | `PROJECT.md` + `.forge/sumi-context.md` |
| Register der offenen Posten (S5) | `docs/PENDING.md` oder Issues | dito | dito | natives Register offener Posten mit Verben |
| Sprossen-Prompts (alle) | beim Erklimmen der Sprosse in den Chat eingefügt | dito | dito | beim Durchschreiten des Tors injiziert |
| Tore (S4) | `docs/GATES.md`, manuell | dito | dito | G1 bis G9, automatisch |
| Messgeräte und Budgets (S9) | Skripte im Repo mit Test | dito | dito | dito, plus die statische Ratsche |

Die Forge-Spalte ist die, die am meisten automatisiert; die anderen drei funktionieren genauso gut,
wenn der Eigentümer von Hand tut, was Forge allein tut: den Prompt der Sprosse im richtigen Moment
einfügen und die Vollständigkeitsprüfung verlangen, bevor es zur nächsten geht. Das ist tatsächlich
die Praxis des Kurses.

### Schritt 0 — Lässt sich dieses Projekt so angehen? (die Eignung)

Diese Sprosse hat eine besondere Geschichte. Pablo sagte es am 17. Oktober: es gibt etwas, das
allem vorausgeht und in keinem Repository steht, weil es immer schon entschieden ankam — die
Entscheidung, **ob ein Projekt mit dieser Methode angegangen wird oder nicht**. Es ist ein
Kriterium, das in seinem Kopf lebte und das wir gemeinsam ausarbeiten werden. Alles, was in dieser
Sprosse folgt, ist also teils von ihm bestätigt, teils meine Hypothese, um das Gespräch zu
beginnen. Ich unterscheide das sorgfältig.

- **Absicht**: zu entscheiden, ob ein Projekt mit dieser Methode und mit einem Agenten an der Spitze
  angegangen wird oder nicht, BEVOR das Repository geöffnet wird. Denn wenn du ein Projekt
  betrittst, das sich nicht eignet, verkommt die Methode zu „Programmieren mit KI“, und dann liest
  der Eigentümer doch Code.
- **Eingaben**: die Anfrage des Kunden, der Fachbereich, die Daten, die Technologie, die
  verfügbaren Umgebungen und wer der Eigentümer sein wird.
- **Artefakt**: ein einseitiges Eignungsblatt mit den bewerteten Kriterien und der Entscheidung:
  go, no-go oder go unter Bedingungen.
- **Tor**: die Ausschlusskriterien sind alle grün, und die Punktzahl der gewichteten übersteigt die
  Schwelle (eine Schwelle, die wir noch nicht definiert haben).
- **Wer entscheidet**: heute Pablo. Die Idee ist, dass die Methode es einer anderen Person erlaubt,
  es mit demselben Blatt zu entscheiden.
- **Fehlschlag, den sie verhindert**: sich in ein Projekt zu begeben, in dem der Agent sich nicht
  selbst verifizieren kann oder in dem es keinen Fachbereichs-Eigentümer gibt, der entscheidet, und
  am Ende mit dem Menschen dazustehen, der Code Zeile für Zeile prüft.
- **Vertrag (wie sie ausgeführt wird)**: `peldanos/peldano-00-elegibilidad.md`.

**Die beiden Ausschlusskriterien, die Pablo bestätigt hat (17. Oktober).** Und man beachte dieses
Detail, das ich sehr fein finde: sie stammen aus den Projekten, die Pablo *abgelehnt* hat, nicht
aus denen, die er angenommen hat. Die „Neins“ definieren die Grenze besser als die „Jas“.

| # | Ausschlusskriterium | Pablos Worte, wörtlich (übersetzt) | Warum es die Methode tötet |
|---|---|---|---|
| X1 | Altsystem ohne zugängliches Repository oder mit Repositories, die keinem Standard folgen | „Legacy-Technologien ohne zugängliches Repo oder mit nicht standardkonformen Repos“ | Ohne Standard-Repository gibt es keinen Ort, an dem der Beleg hinterlassen werden kann: keine in Commits zitierten offenen Posten (Sprosse 5), keine mit dem Code reisenden Tests (7), keine Integration und kein Deployment als Paket (13), keine Dokumentation im selben Commit (14). Der Agent arbeitet blind und hinterlässt keine prüfbare Spur. |
| X2 | Technologie, die nicht Ende-zu-Ende testbar ist: die Bildschirme lassen sich nicht ausführen und jedes Element der Oberfläche nicht mit seinen verschiedenen Methoden erreichen, um zu validieren, dass die Änderung im Backend ankam | „Wir können das End-to-End nicht vom Bildschirm aus testen und die Änderungen im Backend validieren“; und später: „NAC3 ist nicht verpflichtend. JA zum Testen aus der Ausführung der Bildschirme und dem Zugriff auf jedes Element der Oberfläche mit seinen verschiedenen Methoden“ | Ohne diese Prüfung vom Bildschirm zum Backend kann der Agent sich nicht selbst beweisen (Sprossen 7, 9 und 10), und dann müsste der Eigentümer Code lesen — genau das, was die Methode zu vermeiden verspricht. |

Eine Präzisierung, die Pablo gemacht hat und die für die Werkzeugneutralität Gold wert ist: **NAC3
(das Protokoll, das Forge nutzt, damit Bildschirme programmatisch bedient werden können) ist KEINE
Bedingung; es ist das Mittel, mit dem wir es heute erreichen**. Das neutrale Kriterium lautet: die
Oberfläche lässt sich programmatisch ausführen, und jedes Element des Bildschirms ist mit seinen
verschiedenen Methoden erreichbar (klicken, tippen, seinen Zustand lesen), sodass ein Test den
Bildschirm durchlaufen und danach die Wirkung im Backend prüfen kann. Eine Technologie, deren
Oberfläche ihre Elemente keinem „Driver“ (wie etwa Playwright) preisgibt, bleibt draußen, auch wenn
sie ein Repository hat.

Und eine Lesart von mir zu diesen beiden: im Grunde sind sie **dieselbe Bedingung von zwei Seiten
betrachtet**. Der Agent muss sich selbst verifizieren können, Ende-zu-Ende, und den Beleg im
Repository hinterlassen. X1 ist die Hälfte „wo bleibt der Beleg?“; X2 ist die Hälfte „wie wird der
Beleg erzeugt?“. Das macht zwei meiner Hypothesen unten (D3 und D8) zu Konsequenzen von X1 und X2
und nicht zu eigenen Kriterien.

`[Hypothese]` **Kandidatenkriterien, die ich in den drei Fällen sehe.** Diese müssen mit Pablo
bestätigt, gewichtet und ergänzt werden; die aus seinem Kopf fehlen sicher.

| # | Kandidatenkriterium | Wie es sich in den Fällen zeigte | Ausschließend? |
|---|---|---|---|
| D1 | Es gibt einen Fachbereichs-Eigentümer mit Urteilsvermögen und Zeit zum Entscheiden (nicht zum Programmieren) | Pablo in allen dreien; „Regel Pablo“, „Entscheidung Pablo“ mit Datum | `[?]` |
| D2 | Es gibt ein „Orakel“ prüfbarer Wahrheit: echte Daten, ein externes System, Produktion nur lesend | die Krankenkasse und ihr Autorisierer als Orakel (der Fall 1.355 gegen 1.234); Produktion nur lesend | `[?]` |
| D3 | Der Agent kann allein testen: Zugang zu Testumgebungen, Continuous Integration, Testdaten | UAT in den beiden Projekten des Vereins; ein Sämaschine anonymisierter Daten (pnd511) | von X2 aufgesogen |
| D4 | Die Technologie liegt innerhalb dessen, was der Agent beherrscht, ohne zu erfinden (Node, Python, SQL, React) | alle drei | `[?]` |
| D5 | Der Fehler hat reale Konsequenzen (Geld, Gesundheit, Betrieb), was Fail-closed rechtfertigt | die Krankenkasse (Gesundheit, Abbuchungen), der Verein (Familien) | `[?]` |
| D6 | Die Menge lässt sich ab dem ersten Tag erkennen (Dimensionierung G9) | Kikan: 3,4 Millionen Zeilen pro Jahr; die Krankenkasse: 7.819 Zeilen | `[?]` |
| D7 | Der Kunde toleriert eine Reifezeit und einen Menschen im Kreislauf (nicht alles automatisch am ersten Tag) | der automatische Genehmiger mit Trockenlauf; der Mensch im Kreislauf bei der Krankenkasse | `[?]` |
| D8 | Neues Projekt oder Altsystem, aber auditierbar (wenn es Legacy gibt: zuerst auditieren, und null „Fallback“ auf das Legacy) | SQ 0.2; das Migrationswerkzeug von Forge | von X1 aufgesogen |
| D9 | Der Umfang passt in ein Repository und einen Eigentümer (ohne Koordination über mehrere Teams) | alle drei | `[?]` |
| D10 | Geheimnisse und Zugänge lassen sich isolieren (Tresor, Umgebungsdatei, begrenzte Berechtigungen) | `forge-embed.env`, der API-Schlüssel, der seinem Ersteller zugeordnet ist | `[?]` |

**Fragen zur gemeinsamen Ausarbeitung**: von D1 bis D10, welche weiteren sind ausschließend und
welche gewichten? Welches Gewicht hat jedes? Welche anderen Projekte hat Pablo abgelehnt und warum?
Und, sehr wichtig, gibt es Geschäftskriterien (Marge, Beziehung zum Kunden, Pablos verfügbare
Zeit), die aus keinem Repository stammen und ebenfalls entscheiden?

### Schritt 1 — Die Arbeitsvereinbarung (die Regeln vor dem Code)

Bevor eine einzige Zeile geschrieben wird, einigen sich Mensch und Agent darauf, wie sie arbeiten
werden. Es sieht nach einer Formalität aus, und das ist es nicht: es ist das, was 80 % der
Frustrationen des ersten Monats verhindert.

- **Absicht**: festzulegen, wie Mensch und Agent arbeiten, bevor die erste Codezeile entsteht.
- **Eingaben**: nichts; es ist die erste Datei des Projekts.
- **Artefakt**: ein Dokument der Qualitätsstandards (in Forge heißt es `SQ.md`, aber es kann heißen,
  wie du willst), das mindestens sagt: die Zeit des Menschen ist heilig (sie wird nicht für Dinge
  verbraucht, die der Agent allein lösen kann); null technische Schulden, das heißt, wenn etwas
  bricht, wird es an der Wurzel behoben und die Regression in derselben Sitzung hinzugefügt; der
  Umfang ist exakt, nicht mehr und nicht weniger als verlangt; man spricht die Sprache des Nutzers;
  die Dokumentation wird im selben Commit aktualisiert; und nie wird etwas als erledigt verkündet,
  was nicht erledigt wurde.
- **Tor**: die Vereinbarung liegt im Repository und wird in jeder Sitzung gelesen.
- **Wer entscheidet**: der Eigentümer. Der Agent kann Änderungen vorschlagen, bearbeitet die
  Vereinbarung aber nicht allein.
- **Fehlschlag, den sie verhindert**: der Agent, der „hilft“, indem er den Umfang ausweitet, weil es
  ihm eine gute Idee schien; der, der Schulden „für später“ liegen lässt (und das Später kommt nie);
  und der, der als erledigt meldet, was er *glaubt* erledigt zu haben.
- **Beleg**: `2219f7a` (25. Mai); die Regeln SQ 1 bis 9 in `src/chat/server.ts`; `docs/SQ.md`,
  Abschnitte 0.1 bis 0.11.
- **Vertrag (wie sie ausgeführt wird)**: `peldanos/peldano-01-contrato-de-convivencia.md`.

### Schritt 2 — Die Projektdefinition und die Pflichtlektüre

Jede Sitzung des Agenten beginnt bei null: er erinnert sich nicht an gestern. Also muss man ihm eine
Karte geben, und man muss ihn zwingen, sie zu lesen, bevor er irgendetwas anfasst.

- **Absicht**: dass jede Sitzung beginnt, indem sie weiß, was das Projekt ist, in welchem Zustand
  es ist und welche Entscheidungen schon getroffen wurden.
- **Eingaben**: die Vereinbarung (Sprosse 1) und die Anfrage des Kunden.
- **Artefakt**: eine betriebliche Projektdatei (`PROJECT.md` oder `CLAUDE.md`), und hier eine
  Betonung: KURZ. Es ist das Programm, nicht die Geschichte. Dazu eine Datei des lebenden Status
  (in Forge `.forge/sumi-context.md`) mit der aktuellen Spezifikation, dem Abschnitt, an dem
  gearbeitet wird, den jüngsten Entscheidungen und den offenen Fragen. Und ein
  Entscheidungsgedächtnis.
- **Tor**: der Agent liest die Karte, bevor er Code anfasst. In Forge ist das eine ausdrückliche
  Regel: „lies zuerst den Wissensgraphen“.
- **Wer entscheidet**: der Eigentümer definiert; der Agent hält aktuell.
- **Fehlschlag, den sie verhindert**: zwei, ganz konkrete. Erstens: Wegwerfarbeit, weil die Karte
  nicht gelesen wurde (passierte mir am 12. Juni und kostete einen Nachmittag). Zweitens: Kikans
  `CLAUDE.md`, die auf 9.661 Zeilen und 789 Kilobyte wuchs, für niemanden lesbar — die
  betriebliche Datei und das Fallbuch müssen verschiedene Dateien sein.
- **Beleg**: SQ 1.1 (Pflichtlektüre); Erinnerung `feedback_read_knowledge_graph_first`;
  `AUDITORIA_CALIDAD_CODIGO_2026_10_15.md`.
- **Vertrag (wie sie ausgeführt wird)**: `peldanos/peldano-02-definicion-y-lectura.md`.

### Schritt 3 — Dimensionieren, bevor die Architektur entworfen wird

Das ist die Sprosse, deren Überspringen am teuersten ist, und wir wissen es, weil wir sie
übersprungen haben.

- **Absicht**: dass die strukturellen Entscheidungen (welche Datenbank-Engine, ob die
  Schnittstelle synchron oder asynchron ist, wie viel Nebenläufigkeit) mit Zahlen getroffen werden
  und nicht nach Geschmack.
- **Eingaben**: eine mit dem Geschäft erstellte Erhebung der Mengendaten (Entitäten, Ereignisse,
  Bediener zur Spitzenzeit, Aufbewahrung, Sonderlasten), von Natur aus unvollständig; und
  Lesezugriff auf das Vorgängersystem, falls es existiert. Es gibt Daten, die **nur das Geschäft
  hat** und die das Modell nicht herleiten kann: deshalb verlangt der Prompt, dass es bewertet, ob
  sie vollständig sind, und die fehlenden erfragt, statt sie mit sicherer Miene zu schätzen.
- **Artefakt**: eine Dimensionierungsaufzeichnung mit FESTEN Optionen (keine offene Liste: drei
  oder vier konkrete Optionen) und der gewählten. In Forge ist das Tor G9. Und die „asymmetrischen“
  Entscheidungen ausdrücklich erklärt — zum Beispiel „die Persistenzschnittstelle ist ab Zeile eins
  asynchron, auch wenn die erste Engine synchron ist“, denn wenn du dich irrst, kostet es wenig, und
  wenn du es nicht tust, kostet es ein Vermögen.
- **Tor**: die Dimensionierung ist festgehalten, bevor das Skelett gebaut wird.
- **Wer entscheidet**: der Eigentümer wählt aus den festen Optionen; der Agent präsentiert sie mit
  Zahlen.
- **Fehlschlag, den sie verhindert**: der von Kikan. Man begann mit einer Speicherung in
  JSON-Dateien, und als gemessen wurde, stellte sich heraus, dass das System 3,4 Millionen Zeilen
  pro Jahr erzeugen würde. Die Persistenzschnittstelle danach zu ändern kostete Etappe E6 der
  Neuentwicklung: drei ganze Testbatterien auf asynchron umgestellt, mehr als eine Woche.
- **Beleg**: `0bd1b05` (Dimensionierung, 11. Oktober); `7391cc5` (Persistenzschnittstelle,
  13. Oktober); SQ 1.2 und 1.3; `docs/doctrine/sizing.md` (die „vier Löcher“, plus das fünfte).
- **Vertrag (wie sie ausgeführt wird)**: `peldanos/peldano-03-dimensionar.md`.

### Schritt 4 — Das Skelett mit seinen Toren

Bevor das System etwas Nützliches tut, muss es starten, getestet und LEER ausgerollt werden. Ja,
leer. Denn das Deployment am Ende zu entdecken ist sehr teuer.

- **Absicht**: ein System zu haben, das startet, getestet und ausgerollt wird, noch ohne jede
  Funktionalität.
- **Eingaben**: die Dimensionierung (Sprosse 3) und die Art des Arbeitsablaufs (neues Projekt,
  Korrektur oder Weiterentwicklung von etwas Bestehendem).
- **Artefakt**: das Skelett mit grüner Continuous Integration, der aufgebauten Teststruktur, einem
  funktionierenden Deployment in eine Testumgebung und den deklarierten Toren G1 bis G9.
- **Tor**: das Skelett ist grün, Continuous Integration läuft, und das Deployment in die
  Testumgebung funktioniert mit null Funktionalität.
- **Wer entscheidet**: der Agent führt aus; der Eigentümer gibt visuell frei (mit einem
  Screenshot oder einem automatisierten Test, der einen erzeugt).
- **Fehlschlag, den sie verhindert**: in Kikan kam das Deployment am 23. September, einen Monat
  nach dem Start, und zwischen dem 30. September und dem 4. Oktober gab es fünf offene Posten in
  Folge nur dafür, dass das Deployment ordentlich funktioniert. Wäre das Skelett in der ersten
  Woche leer ausgerollt worden, wären diese fünf Schläge bei null Funktionalität im Spiel gefallen.
- **Beleg**: `docs/doctrine/gates.md`; `workflow-kinds.md` (neues Projekt, Schritte 6 von 18); die
  Testpolitik, „scaffold gate green“; Kikans `ci.yml`, 28. August.
- **Vertrag (wie sie ausgeführt wird)**: `peldanos/peldano-04-esqueleto.md`.

### Schritt 5 — Der Plan sind die offenen Posten

Hier gibt es eine Idee, die man, einmal begriffen, nicht mehr loslässt: es gibt keinen „Plan“ auf
der einen und keine „Aufgabenliste“ auf der anderen Seite. **Die Liste der offenen Posten IST der
Plan.**

- **Absicht**: eine einzige Arbeitswarteschlange, geordnet und mit Tor, die die Wahrheit des
  Projekts ist.
- **Eingaben**: die anfängliche Spezifikation, die Audits, die Anfragen des Kunden und die
  Rückschläge.
- **Artefakt**: ein Register nummerierter offener Posten (PND-001, PND-002 …), jeder mit Titel,
  Status, der Entscheidung, die ihn auslöste, und dem Test, der ihn schließt. Und jeder Commit
  zitiert seinen offenen Posten.
- **Tor**: keine Änderung geht ohne offenen Posten hinein; und der Posten wird mit Beleg
  geschlossen, nicht mit „fertig“.
- **Wer entscheidet**: der Eigentümer priorisiert; der Agent schlägt vor und führt der Reihe nach
  aus.
- **Fehlschlag, den sie verhindert**: die Spezifikation, die „überholt“ wird und in zwei Wochen
  veraltet (passierte Autorisierungen mit seinem anfänglichen Entwurfsdokument); und die Arbeit, von
  der sechs Monate später niemand weiß, warum sie gemacht wurde.
- **Beleg**: `4fc82c6` (6. Juni); `docs/PENDING_REGISTRY_PLAN.md`; 641 offene Posten in
  Autorisierungen; 19 Dokumente offener Posten in Kikan; Erinnerung
  `project_pending_registry_is_plan`.
- **Vertrag (wie sie ausgeführt wird)**: `peldanos/peldano-05-pendientes.md`.

### Schritt 6 — Entscheidungen werden neben dem Code festgehalten

Jede Geschäftsregel und jede strukturelle Entscheidung muss einen Eigentümer, ein Datum und einen
Ort haben, an dem sie steht. Sonst weiß in sechs Wochen niemand, ob „genehmigt plus Guthaben geht
zurück in die Warteschlange“ eine Kundenentscheidung oder ein Einfall des Agenten war.

- **Absicht**: dass jede Fachregel oder strukturelle Entscheidung Eigentümer, Datum und Ort hat.
- **Eingaben**: das Gespräch mit dem Eigentümer.
- **Artefakt**: die Entscheidung, festgehalten im Commit, im Dokument des offenen Postens oder in
  einem Entscheidungsregister. Und wenn der Eigentümer nicht antwortete und der Agent wählen
  musste, als „Entscheidung durch Unterlassung“ markiert, damit sie überprüft werden kann.
- **Tor**: eine Geschäftsregel kommt nicht ohne ihren Ursprungssatz in den Code.
- **Wer entscheidet**: der Eigentümer. Immer. Ohne Ausnahme.
- **Fehlschlag, den sie verhindert**: sechs Wochen später darüber zu streiten, warum etwas so ist;
  und, schlimmer, der Agent, der Fachregeln erfindet, weil sie ihm vernünftig erschienen.
- **Beleg**: `0ae3ae6 (pnd550)`, mit dem Text „Regel Pablo“ und „Entscheidung Pablo 2026-08-10“
  im Commit; `docs/DIRECTOR_DECISIONS_2026_06_04.md`; SQ 7 (Entscheidungsgedächtnis).
- **Vertrag (wie sie ausgeführt wird)**: `peldanos/peldano-06-decisiones.md`.

### Schritt 7 — Tests als Sperren, rot bewiesen

Bei einem Test, den du nie hast fehlschlagen sehen, weißt du nicht, ob er etwas beweist. Deshalb
lautet die Regel hier nicht „schreib Tests“; sie lautet „zeig, dass der Test gegen den alten Code
rot wird“.

- **Absicht**: dass jedes Verhalten, das zählt, einen Test hat, der FEHLSCHLÄGT, wenn es bricht,
  und dass man mit Gewissheit weiß, dass er fehlschlägt.
- **Eingaben**: die bereits umgesetzte Änderung (standardmäßig kommen Tests nach der Umsetzung;
  „Test zuerst“ bleibt eine Option für kleine Umfänge).
- **Artefakt**: der neue Test, plus die Regression der benachbarten offenen Posten in derselben
  Sitzung. Und im Commit, wörtlich: „ROT bewiesen gegen das alte Kriterium“, „ROT verifiziert 4 von
  8“.
- **Tor**: Rot bewiesen → Grün → Regression grün. Und der Agent mockt sich nicht selbst (er
  ersetzt nicht durch Simulationen genau die Teile, die er prüfen will).
- **Wer entscheidet**: der Agent führt aus und berichtet; der Eigentümer prüft nicht den Test, er
  prüft den Bericht.
- **Fehlschlag, den sie verhindert**: Tests, die bestehen, weil sie nichts beweisen; und das Grün,
  das einen Bug verbirgt — uns passierte es, dass eine ganze Batterie aus Speichermangel „starb“ und
  wie ein fehlschlagender Test aussah (`1d7a20b`).
- **Beleg**: `docs/doctrine/testing-policy.md` (4. Juni); `ab3e529 (pnd517)`; `0ae3ae6
  (pnd550)`; `e18406d (pnd452)`, „rot ohne das try/except“.
- **Vertrag (wie sie ausgeführt wird)**: `peldanos/peldano-07-tests-en-rojo.md`.

### Schritt 8 — Symmetrie zwischen Produzent und Konsument, und das Anti-Muster-Register

Wenn du ein Ende änderst (den Server, den Roboter, das Datenbankschema), muss das andere Ende (der
Bildschirm, der Zähler, der Konsument) im selben Commit mitgeändert werden. Sonst driften sie früher
oder später auseinander, und der Nutzer sieht eine Zahl auf der einen und eine andere auf der
anderen Seite.

- **Absicht**: dass eine Änderung an einem Ende das andere mitzieht, immer, im selben Commit.
- **Eingaben**: jede Vertragsänderung zwischen zwei Teilen des Systems.
- **Artefakt**: der Server definiert die Liste (die Spalten, die Gründe, die Tore) und der
  Konsument liest sie von dort, statt eine eigene Kopie zu halten. Dazu das GOTCHAS-Register: jedes
  Anti-Muster mit seinem Geruch, seiner Grundursache, seiner Behebung und wie man es vorher erkennt.
- **Tor**: es ist automatisch (Regel SQ 14): der Agent sucht die andere Seite, bevor er eine
  Änderung als abgeschlossen betrachtet.
- **Wer entscheidet**: niemand; es ist automatisch.
- **Fehlschlag, den sie verhindert**: der Zähler, der nicht mit der Abfrage übereinstimmt (1.355
  gegen 1.234); die Drift zwischen Web- und Mobilversion (GOTCHAS G-2); zwei Kopien desselben
  Moduls, die auseinanderlaufen (G-3; in Kikan gibt es 8 zwischen Web und Mobil duplizierte Module,
  im Audit entdeckt).
- **Beleg**: SQ 14; `docs/GOTCHAS.md` (27. Mai); `50fe968 (pnd510)`; `7251129 (pnd509)`.
- **Vertrag (wie sie ausgeführt wird)**: `peldanos/peldano-08-simetria-y-antipatrones.md`.

### Schritt 9 — Messen vor dem Bauen, mit einem Instrument, das selbst geprüft wird

Das ist für mich die „erwachsenste“ Sprosse von allen und die, die am längsten brauchte, um
aufzutauchen. Die Regel lautet: jede Zahl, die eine Entscheidung speist, stammt aus einem Programm
mit Test. Nicht aus einem `grep`, nicht aus einem Eindruck, nicht aus „ich glaube, es sind so um
die hundert“.

- **Absicht**: dass jede Zahl, die eine Entscheidung speist, aus einem Instrument mit Test stammt
  und dass das Instrument selbst geprüft wird.
- **Eingaben**: eine Hypothese (vom Eigentümer oder vom Agenten) über eine Ursache, eine Menge oder
  Kosten.
- **Artefakt**: ein „Messgerät mit Schutz“ (ein Skript plus ein Test, der es schützt), das im
  Repository mitreist; ein Budget pro Pfad (wie viele Abfragen, wie viele Schleifen), auf das
  Gemessene plus eine kleine Spanne gezurrt; und eine „Ratsche“, ein Zähler, der nur sinken kann.
- **Tor**: die fünf Regeln aus Kikans Abschnitt 11.b: (1) Messgerät mit Schutz; (2) wenn das
  Instrument nicht existiert, wird es gebaut; (3) in beide Richtungen prüfen (vom Code zur Messung
  und von der Messung zum Code); (4) Näherungen als Näherungen markieren; und (5) wer ausführt,
  prüft die Zahlen dessen, der geplant hat.
- **Wer entscheidet**: die Zahl. Der Eigentümer bringt die Hypothese; der Agent misst sie vor dem
  Bauen. Und eine Beobachtung aus Monaten der Arbeit mit Pablo: er hat beim Symptom meist recht,
  und die Ursache liegt meist direkt neben der Stelle, wo er sie vermutet — deshalb misst man,
  statt zu diskutieren.
- **Fehlschlag, den sie verhindert**: die „121 Schleifen“, die 79 waren; die „27 Wettläufe“, die
  44 waren; das Messgerät, das log, weil die Datenbank schon eine Schemaänderung angewendet hatte;
  die Ratsche mit dem Zähler auf null, die 84 Aufrufe nicht sah.
- **Beleg**: `REINGENIERIA_PERSISTENCIA_SQL.md`, Abschnitt 11.b; `880ac0f`, `f955620`,
  `1d55a93`, `0730082` (63 über 60); `_diag_pnd517_counters.py`; Erinnerungen
  `feedback_medidor_con_guarda`, `feedback_medir_la_hipotesis`,
  `feedback_validar_limites_con_el_log`.
- **Vertrag (wie sie ausgeführt wird)**: `peldanos/peldano-09-medir.md`.

### Schritt 10 — Ehrliche Verifikation und verhältnismäßiger Bericht

Wenn der Eigentümer keinen Code lesen wird, muss der Bericht des Agenten vertrauenswürdig sein.
Nicht „optimistisch“, nicht „dem Anschein nach vollständig“: vertrauenswürdig. Und das hat Regeln.

- **Absicht**: dass der Bericht des Agenten vertrauenswürdig ist, ohne dass der Eigentümer Code
  liest.
- **Eingaben**: die geleistete Arbeit.
- **Artefakt**: ein Bericht, der klar „verifiziert“ von „geglaubt“ trennt; der seine blinden
  Flecken erklärt (was er nicht prüfen konnte); der jeden Punkt des Verlangten abdeckt, einen nach
  dem anderen; und der den Beleg zitiert (das Log, den Test, die Zahl).
- **Tor**: keine Behauptung ohne ihren Beleg. „Fertig“ sagt man nur mit der Disziplin des „fertig“
  (SQ 5). Und bei einem „es ist immer noch kaputt“ ist das Erste, zu vergleichen, welche Version
  veröffentlicht ist und welche die Behebung enthält, bevor neu diagnostiziert wird.
- **Wer entscheidet**: der Eigentümer vertraut oder verlangt den Beleg. Er prüft nie den Code.
- **Fehlschlag, den sie verhindert**: der Authentifizierungsfehler, den Forge als „Erfolg“ meldete
  (14. Oktober); nicht geleistete Arbeit zu verkünden (SQ 9c); und der Agent, der „behoben“ sagt,
  wenn die Behebung im Repository liegt, aber noch nicht veröffentlicht wurde.
- **Beleg**: `docs/doctrine/verification-honesty.md` (10. Juni); SQ 9a, 9b und 9c; SQ 5;
  Erinnerung `feedback_check_published_version_first`.
- **Vertrag (wie sie ausgeführt wird)**: `peldanos/peldano-10-verificacion-honesta.md`.

### Schritt 11 — Das periodische Audit als Input für den Plan

Hin und wieder muss man das ganze System mit frischen Augen betrachten. Und was man sieht, geht nicht
in einen Bericht, der abgelegt wird: es geht in die Warteschlange der offenen Posten.

- **Absicht**: hin und wieder das vollständige System zu betrachten und das Gesehene in offene
  Posten zu verwandeln.
- **Eingaben**: das ganze Repository und die Produktion nur lesend.
- **Artefakt**: ein Bericht mit gestuften Befunden (P0 das Dringende, P1, P2 …; oder Noten pro
  Dimension), der in nummerierten offenen Posten endet. Idealerweise von einem Prüfer, der nicht der
  Erbauer ist: in unserem Fall auditiere ich (Sumi), was Forge baut, und Forge nimmt die Befunde
  auf.
- **Tor**: jeder P0-Befund hat einen offenen Posten, bevor das Audit als abgeschlossen gilt.
- **Wer entscheidet**: der Eigentümer priorisiert die Befunde.
- **Fehlschlag, den sie verhindert**: ein im Code fest eingebranntes Superadministrator-Passwort,
  das niemand gesehen hatte; 264 Abfragen, die ganze Tabellen lasen; eine bekannte Schwachstelle in
  einer Abhängigkeit; eine Bildschirmkomponente mit 2.679 Zeilen.
- **Beleg**: Full-Scan vom 23. Juni und Sicherheit vom 16. Juli (Autorisierungen); AUD-* → 19
  offene Posten (Kikan, 28. August); `INTEGRIDAD_..._10_14.md`, aufgenommen in `b266f11`;
  `AUDITORIA_CALIDAD_..._10_15.md`.
- **Vertrag (wie sie ausgeführt wird)**: `peldanos/peldano-11-auditoria.md`.

### Schritt 12 — Fail-closed, Sperren und null stiller Schaden

Bei Zweifel oder Ausfall handelt das System NICHT. Und es sagt es. Das klingt selbstverständlich,
ist aber das Gegenteil dessen, was Software standardmäßig tut, nämlich bei Zweifel weiterzumachen.

- **Absicht**: dass das System bei Zweifel oder Ausfall nicht handelt und warnt.
- **Eingaben**: jede folgenreiche Aktion (abbuchen, senden, genehmigen, löschen).
- **Artefakt**: Sperren (doppelte Sicherung, Panikknopf), ein Trockenlauf, bevor wirklich
  automatisiert wird, ein Wächter, der mit Schutzvorrichtungen anstößt, ausdrückliche
  Berechtigungen und Genehmigungen für den Agenten, und Suchen, die, wenn sie fehlschlagen, den
  Bildschirm nicht brechen.
- **Tor**: jede unumkehrbare Aktion hat eine Sperre und einen dokumentierten Rückweg.
- **Wer entscheidet**: der Eigentümer genehmigt die Sperre; das System überspringt sie nie.
- **Fehlschlag, den sie verhindert**: eine doppelte Abbuchung; eine automatische Genehmigung, ohne
  einen Menschen zu passieren; ein `git add -A`, das ein Token ins Repository hochlädt; das Löschen
  von Kundendaten.
- **Beleg**: `0954740 (pnd524)`; `e18406d (pnd452)`; der automatische Genehmiger im Trockenlauf;
  SQ 0.3 (null stiller Schaden); die NAC3-Verben mit Genehmigung.
- **Vertrag (wie sie ausgeführt wird)**: `peldanos/peldano-12-fail-closed.md`.

### Schritt 13 — Continuous Integration, Umgebungen, Geheimnisse und Deployment als Teil des Produkts

Der Weg in die Produktion muss ein reproduzierbares Paket sein: die Tests laufen EINMAL, die
Konfiguration lebt außerhalb des Repositories, und Geheimnisse treiben nicht herum.

- **Absicht**: dass der Weg in die Produktion ein reproduzierbares Paket ist, mit nur einmal
  laufenden Tests und der Konfiguration außerhalb des Repositories.
- **Eingaben**: das Skelett (Sprosse 4) und die Tests (Sprosse 7).
- **Artefakt**: eine Continuous Integration, die die Batterie laufen lässt; ein Deployment, das auf
  das Ergebnis dieser Integration wartet und nur verpackt und hochlädt; die Konfiguration nur auf
  dem Server (in einer Umgebungsdatei oder einem Tresor); eine ausdrückliche Beförderung von der
  Testumgebung in die Produktion; ein Verfahren (Runbook), das zweimal laufen kann, ohne etwas zu
  brechen; und das überwachte Kontingent an Continuous-Integration-Minuten.
- **Tor**: die Testumgebung grün, bevor die Produktion angefasst wird; der Rollback getestet; und
  kein Geheimnis im Repository oder im Chat — wenn eines versehentlich eingefügt wurde, wird es
  rotiert.
- **Wer entscheidet**: der Eigentümer befördert in die Produktion; der Agent bereitet alles vor.
- **Fehlschlag, den sie verhindert**: die dreimal pro Commit laufenden Tests (je 16 bis 27 Minuten;
  2.000 Minuten in 16 Tagen, Kontingent verbrannt); der in einem Transkript abgedruckte
  Datenbankschlüssel; das nur aus dem ersten Domainnamen des Servers abgeleitete CORS; die von der
  Testbatterie überschriebene Konfiguration (PND-107).
- **Beleg**: `39497b0` (gate-ci); `0bd20a8 (PND-107)`; `513c8d0 (PND-108)`; `7658e2e`
  (Beförderung); Erinnerungen `project_kikan_deploy_solo_empaqueta` und
  `project_embed_apikey_environmentfile`.
- **Vertrag (wie sie ausgeführt wird)**: `peldanos/peldano-13-ci-entornos-secretos-deploy.md`.

### Schritt 14 — Lebendige Dokumentation und Handbücher, denen ein Mensch ohne KI folgen kann

Das System muss ohne den Agenten und ohne die Person, die es gebaut hat, benutzt, gewartet und
wiederhergestellt werden können. Wenn an dem Tag, an dem der Agent nicht da ist, nicht ausgerollt
werden kann, ist es nicht fertig.

- **Absicht**: dass das System ohne den Agenten und ohne den Erbauer benutzt, gewartet und
  wiederhergestellt werden kann.
- **Eingaben**: jede Änderung (in Forge das Tor G-DOC).
- **Artefakt**: das Benutzerhandbuch, das Wartungshandbuch, das interne Infrastrukturhandbuch
  „von Hand reproduzierbar, ohne KI“, das Notfallwiederherstellungshandbuch und das
  Änderungsjournal. Alles im selben Commit wie die Änderung, die es ausgelöst hat.
- **Tor**: die Dokumentation ist aktuell (SQ 4); das Handbuch wird zusammen mit dem System neu
  erzeugt.
- **Wer entscheidet**: der Agent pflegt; der Eigentümer liest das Handbuch, nicht den Code.
- **Fehlschlag, den sie verhindert**: ein veraltetes Repository-Verwaltungsdokument, das einen
  Commit im falschen Repository verursachte; und die in ein Änderungsprotokoll verwandelte
  `CLAUDE.md`.
- **Beleg**: SQ 3.3, 3.4 und 6; das Handbuch vom 26. Juni; `6444ce6 (pnd442)`; `a30cee3
  (pnd459)`; Kikans Handbuch mit eingebetteten Bildern vom 16. Oktober.
- **Vertrag (wie sie ausgeführt wird)**: `peldanos/peldano-14-documentacion-viva.md`.

### Schritt 15 — Der Agent im System, und die Retrospektive mit Zahlen

Die letzte Sprosse hat zwei Teile, die verschieden aussehen, aber denselben Kreislauf schließen.
Erstens: der Agent bleibt resident in der Produktion, mit begrenztem Umfang. Zweitens: die Methode
selbst wird mit Zahlen überprüft, und das Gelernte kehrt zu Sprosse 0 für das nächste Projekt
zurück.

- **Absicht**: dass der Agent resident in der Produktion bleibt, mit begrenztem Umfang (Diagnose →
  Betrieb → Support), und dass die Methode mit Zahlen überprüft wird.
- **Eingaben**: das System in Produktion, die Vorfälle, die Kosten.
- **Artefakt**: der eingebettete Agent mit verpflichtender Systemkarte, begrenzten Berechtigungen,
  einem API-Schlüssel, der als die Person handelt, die ihn erstellt hat, und Tickets. Dazu eine
  schriftliche Retrospektive mit Messung (ein Papier, ein Bericht), die die Methode ändert und zu
  Sprosse 0 zurückkehrt.
- **Tor**: der eingebettete Agent kann nicht tun, was der Eigentümer nicht genehmigt hat; und die
  Retrospektive bringt mindestens eine Änderung an der Leiter hervor.
- **Wer entscheidet**: der Eigentümer.
- **Fehlschlag, den sie verhindert**: die Multi-Agenten-Crew, die das Doppelte ausgab und die
  Hälfte lieferte (am 5. Juni mit Zahlen beendet); und der Agent, der innerhalb eines Systems
  betreibt, ohne eine Karte dieses Systems zu haben.
- **Beleg**: `docs/PAPER_SUMI_VS_AGENTIC.md`; `7584f8b`; `1c7c0b5` (das Embed, PND-147);
  `c602725` (Betriebsmodus); `20fdbe7` und `1558ee4` (PND-257 und PND-223); die Erinnerung an den
  residenten Assistenten in Produktion.
- **Vertrag (wie sie ausgeführt wird)**: `peldanos/peldano-15-agente-residente-y-retrospectiva.md`.

---

## Teil C — Die realen Fehlschläge, und welche Sprosse jeden abdeckt

Diese Tabelle ist gewissermaßen der Beweis der Leiter: jeder Rückschlag, den wir einstecken mussten,
muss in irgendeine Sprosse fallen. Gibt es einen, der in keine fällt, fehlt eine Sprosse.

| Fehlschlag (und wann er passierte) | Sprosse, die ihn abdeckt | Geschlossen? |
|---|---|---|
| Die Multi-Agenten-Crew: 60 Dollar und 73 Minuten für eine halbfertige Lieferung (5. Juni) | 15, Retrospektive mit Zahlen | ja (neu entworfen) |
| Weggeworfene Arbeit, weil die Karte nicht gelesen wurde (12. Juni) | 2, Pflichtlektüre | ja |
| PND-300: drei Behebungen, die nicht an der Wurzel waren (14. Juli) | 1, null Schulden / 9, messen | ja (in der vierten Runde) |
| Der Zähler 1.355 gegen 1.234 (7. August) | 9, Instrument / 8, Symmetrie | ja |
| 3,4 Millionen Zeilen pro Jahr auf JSON-Dateien, synchrone Schnittstelle (11. Oktober) | 3, dimensionieren | ja (Etappen E1 bis E12) |
| Messgeräte, die logen: 27, die 44 waren, die Ratsche auf null (13. Oktober) | 9, das Instrument prüfen | ja |
| Der verwaiste Zug von 1 Stunde 43, sechs unsichtbare Commits (14. Oktober) | 10, ehrliche Verifikation / 12, fail-closed | ja (Version 1.18.0) |
| Tests dreimal pro Commit; GitHub-Actions-Kontingent verbrannt (14. Oktober) | 13, Integration als Produkt | ja (gate-ci); das Kontingent muss Pablo erhöhen |
| Zwei Administrator-Türen in 24 Stunden (15. Oktober) | 11, externes Audit / 12, Sperren | ja (PND-223 zurückgezogen) |
| Der MariaDB-Schlüssel und die `yerp_`-Schlüssel in den Chat eingefügt (14. und 16. Oktober) | 13, Geheimnisse | die Rotation steht bei Pablo aus |
| „reported error: success“ (14. Oktober) | 10, verhältnismäßiger Bericht | ausstehend (eine Ein-Zeilen-Behebung) |
| Die `CLAUDE.md` mit 9.661 Zeilen (15. Oktober) | 2, betriebliche Datei gegen Fallbuch | ausstehend |
| CORS aus dem ersten Domainnamen abgeleitet; der UAT-Einrichtungsassistent lieferte Fehler 500 (16. Oktober) | 13, Deployment / 8, Symmetrie | der Prompt für Forge ist geliefert; Anwendung ausstehend |
| Forge Mobile verliert seine Tabs (16. Oktober) | 10 / 12 | Diagnose gemacht; Behebung ausstehend |

---

## Teil D — Was noch auszuarbeiten ist (für den nächsten Durchgang)

Erledigt in Version 2 (17. Oktober, Nachmittag): die Eröffnungsthese („KI unterbricht die Methode
nicht: sie setzt sie fort“), die sechzehn Sprossenverträge in `peldanos/` und das eigene
Repository der Methode. Erledigt in Version 3: der Name, die angereicherten Verträge (Größe,
Warnsignale, englische Prompts mit Erklärung), der Leitfaden nach Projektgröße und der Leitfaden nach
Werkzeug. Es bleibt:

1. **Sprosse 0 vollständig**: die reale Liste der Kriterien (Pablos plus meine Hypothesen), welche
   ausschließen und welche gewichten, die Gewichte, die Schwelle und die abgelehnten Projekte als
   Gegenbeispiele. X1 und X2 haben wir schon; der Rest fehlt.
2. **Reihenfolge und Gruppierung**: die Leiter hat drei Phasen (Start, 0 bis 4; Schleife, 5 bis
   10; Betrieb, 11 bis 15). Zu bestätigen ist, ob so gelehrt wird oder ob es besser ist, mit der
   Schleife zu beginnen, die ein Lernender täglich benutzen wird.
3. **Ein einprägsamer Name für jede Sprosse**, in einem Satz, für die Handbücher und die
   Veröffentlichungen.
4. ~~Was minimal und was optional ist je nach Projektgröße~~ — **vorgeschlagen** in der Tabelle
   „Was verpflichtend und was proportional ist“, als Hypothese markiert, bis ein Projekt sie
   bestätigt.
5. **Die Abbildung auf Forge**: welche Sprossen schon Tore oder Befehle sind (G1 bis G9, das
   Register der offenen Posten, die Dimensionierung, die Doktrinen) und welche fehlen, um die
   Leiter als Ausführungsfluss zu exportieren.
6. **Die Praxis**: das Kurshandbuch (`MANUAL_CURSO.md`), mit einer praktischen Aufgabe pro
   Sprosse, die ein Lernender in seinem eigenen Repository wiederholen kann, bis die Anwendung in
   Produktion ist. In Arbeit.
7. **Was NICHT in der Leiter ist und sein sollte** `[Hypothese]`: der Umgang mit Token-Kosten und
   Kontingenten als explizites Budget (heute ist es reaktiv: wir erfahren es, wenn es verbrennt);
   die Rotation von Geheimnissen als Routine und nicht als Vorfall; und ein Kriterium dafür, wann
   der Mensch DOCH Code anschauen muss — heute lautet die Antwort „nie“, aber die beiden Berichte
   dieser Woche deuten darauf hin, dass es bestimmte Momente gibt, in denen es sich lohnt.
8. ~~Der Name~~ — **erledigt**: Urazuke, die Nachweis-Methode (D-014, 17. Oktober).
9. ~~Die öffentliche Präsentation auf yujin.app~~ — **erledigt** (17. Oktober, abends): die
   Unterseite `yujin.app/urazuke` (Repository `pkuschnirof/rpaforce`, Ordner
   `web/yujin.app/urazuke/`), mit der Landing in den zehn Oberflächensprachen der Website, den drei
   HTML-Dokumenten in den acht Sprachen der Methode und einer hervorgehobenen Karte auf der
   Startseite von yujin.app. Bleibt: sie mit einem Push auf `main` jenes Repositorys zu
   veröffentlichen und, sobald dieses Repository öffnet, es von dort zu verlinken.
10. **Die Verträge an einem realen Projekt erproben.** Die sechzehn Prompts sind aus dem
    geschrieben, was wir getan haben, nicht eins zu eins ausgeführt. Das erste Projekt, das sie von
    Anfang bis Ende nutzt, wird mehrere korrigieren; das ist Teil von Sprosse 15.

---

## Glossar

Jede Abkürzung, jeder Eigenname und jeder umgangssprachliche Ausdruck, der in diesem Dokument
vorkommt, erklärt. In alphabetischer Reihenfolge. Einige Einträge sind spanische Begriffe, die in
Dateinamen oder Commit-Nachrichten der Ursprungs-Repositories vorkommen; sie werden beibehalten,
damit der Beleg nachverfolgt werden kann.

**Agent** — Ein Programm der künstlichen Intelligenz, das nicht nur Fragen beantwortet, sondern
Aktionen ausführt: Dateien liest, Code schreibt, Befehle ausführt, Commits macht. In diesem
Dokument ist „der Agent“ Forge oder Sumi (siehe unten).

**Anonymisierung** — In diesem Dokument heißen die realen Kunden „die Krankenkasse“, „der
Autorisierer“ und „der Verein“, und ihre Systeme „Autorisierungen“ und „Kikan“. Das ist Absicht:
die Namen bleiben zurückgehalten, bis wir die Erlaubnis haben, sie zu nennen.

**Anti-Muster** — Eine Art, Dinge zu tun, die vernünftig aussieht, von der man aber weiß, dass sie
schlecht endet. Das Gegenteil eines „Musters“ (einer bewährten guten Praxis).

**Artefakt** — Etwas Konkretes, das produziert wird: eine Datei, ein Test, ein Skript, ein
Dokument. In der Leiter hinterlässt jede Sprosse ein Artefakt.

**Asynchron / synchron (async / sync)** — Ein synchroner Aufruf wartet auf das Ergebnis, bevor er
weitermacht; ein asynchroner setzt die Aufgabe in Gang und macht weiter, um das Ergebnis später
abzuholen. Echte Datenbanken in Node sind asynchron; deshalb muss die Schnittstelle es von Anfang an
sein.

**AUD-*** — Die Serie nummerierter Audits, die im August in Kikan durchgeführt wurden (AUD-1,
AUD-2 …) und offene Posten erzeugten.

**Auf die harte Tour** — Etwas lernen, weil es schiefging, nicht, weil es jemand vorher erklärt
hat. Verwendet im Sinne von „diese Regeln wurden auf die harte Tour gelernt“.

**Autopilot** — Ein schriftliches Mandat, damit der Agent stundenlang (24 oder 48) allein
arbeitet, Commits und Pushes macht, ohne zu fragen, und am Ende eine Zusammenfassung liefert.

**Autorisierer (der)** — So nennt dieses Dokument das System der Krankenkasse, das Aufträge
entgegennimmt und ein Urteil zurückgibt (genehmigt, abgelehnt). Für uns fungiert es als „Orakel“:
die Wahrheit, gegen die die Zähler geprüft werden.

**Autorisierungen** — Name, den dieses Dokument dem ersten Produktionssystem gibt (der echte bleibt
zurückgehalten): robotische Automatisierung (RPA) der Bearbeitung der Aufträge der Krankenkasse für
eine Gesundheitseinrichtung, mit einem Menschen im Kreislauf.

**Automatischer Genehmiger** — Im System Autorisierungen der Roboter, der Aufträge nach Regeln
automatisch genehmigt. Er lief zuerst im „Trockenlauf“ (siehe Dry-run), bevor man ihn handeln ließ.

**await** — In JavaScript das Schlüsselwort, das „warte auf das Ergebnis dieses asynchronen
Aufrufs“ bedeutet. Ein Datenbankaufruf ohne `await` ist ein stiller Bug: der Code macht weiter,
bevor er die Daten hat.

**Backend** — Der Teil des Systems, den man nicht sieht: der Server, die Logik, die Datenbank. Das
Gegenteil von „Frontend“ (dem Bildschirm).

**Batterie (von Tests)** — Die vollständige Menge der Tests eines Projekts, alle zusammen
ausgeführt.

**CI (Continuous Integration)** — Ein Dienst (hier GitHub Actions), der die Tests automatisch
ausführt, jedes Mal, wenn Code hochgeladen wird.

**CLAUDE.md / PROJECT.md** — Die Datei, die der Agent zu Beginn jeder Sitzung liest, um zu
wissen, was das Projekt ist und wie darin zu arbeiten ist.

**Commit** — Ein gespeicherter Punkt in der Geschichte des Codes, mit einer Nachricht, die erklärt,
was sich geändert hat und warum. Jeder Commit hat eine kurze Kennung (zum Beispiel `2219f7a`).

**CORS** — Ein Sicherheitsmechanismus der Browser, der entscheidet, von welchen Domains aus ein
Server aufgerufen werden darf. Falsch konfiguriert, blockiert er legitime Aufrufe mit verwirrenden
Fehlern.

**CVE** — Eine öffentliche Kennung einer bekannten Sicherheitsschwachstelle in einer
Softwarekomponente.

**Doktrin** — In Forge ein kurzes Dokument, das festlegt, wie etwas getan wird (wie getestet,
wie verifiziert, wie dimensioniert wird). Es gibt 31. Es ist die Form, die die Methode innerhalb des
Werkzeugs annimmt.

**Driver (Kriterium)** — Ein Faktor, der eine Entscheidung in die eine oder andere Richtung
schiebt. Bei Sprosse 0 sind die Driver die Faktoren, die entscheiden, ob ein Projekt geeignet ist.

**Dry-run (Trockenlauf)** — Einen Prozess „trocken“ laufen lassen: er tut alles außer der
endgültigen Aktion. Der automatische Genehmiger lief zuerst so und zeigte, was er genehmigt hätte,
ohne etwas zu genehmigen.

**E1 bis E12** — Die zwölf Etappen der Persistenz-Neuentwicklung von Kikan (der Wechsel von der
Speicherung in JSON-Dateien zu einer MariaDB-Datenbank).

**Eingebettet (embed, Forge Embedded)** — Forge, installiert im System des Kunden, als residenter
Assistent, mit begrenzten Berechtigungen.

**End to end (E2E, Ende-zu-Ende)** — Das vollständige System testen, vom Bildschirm bis zur
Datenbank, so wie ein Mensch es benutzen würde.

**Fail-closed** — „Fällt geschlossen aus“: bei Zweifel oder Fehler handelt das System nicht. Das
Gegenteil von „fail-open“, das bei Zweifel weitermacht.

**Fallback (auf das Legacy)** — Auf einen alten Pfad zurückgreifen, wenn der neue versagt. Die
Methode verbietet es (SQ 0.2): wenn es ein altes System gibt, wird es auditiert und migriert; es
wird nicht als stilles Sicherheitsnetz belassen.

**Fixture** — Testdaten, die geladen werden, bevor ein Test oder ein Deployment läuft.

**Flip (Schalter)** — Eine Konfigurationsänderung, die zwischen zwei Pfaden wählt (zum Beispiel
der alten oder der neuen Engine), ohne Code anzufassen.

**Forge (Yujin Forge)** — Das Werkzeug, das Pablo gebaut hat: eine Schicht über Claude Code, die
die Methode hinzufügt (Doktrinen, Tore, offene Posten, ein Chat-Panel, eine Mobil-App und den
eingebetteten Modus). `yf` ist sein Befehl.

**Frontend** — Der sichtbare Teil des Systems: die Bildschirme.

**Full Scan** — Eine Datenbankabfrage, die die ganze Tabelle liest, weil sie keinen Index hat, der
ihr hilft. Bei kleinen Tabellen merkt man es nicht; bei Millionen Zeilen bringt es das System zu
Fall.

**G-DOC** — In Forge das Tor, das verlangt, dass die Dokumentation im selben Commit wie die
Änderung aktualisiert wird.

**gate-ci** — Der Job im Deployment von Kikan, der wartet, bis Continuous Integration grün
beendet ist, bevor verpackt wird. Erstellt am 14. Oktober.

**GCP** — Google Cloud Platform, die Cloud, in der die Server der beiden Systeme des Vereins
laufen.

**GOTCHAS** — Eine Datei, die bekannte „Fallen“ festhält: Fehler, die wir schon einmal bezahlt
haben, mit ihrem Geruch, ihrer Grundursache, ihrer Behebung und wie man sie vorher erkennt.

**Greenfield / Brownfield** — Ein neues Projekt von null (Greenfield, „grüne Wiese“) gegenüber
einem, das von etwas Bestehendem ausgeht (Brownfield, „Brachland“).

**Grep** — Ein Befehl, der Text in Dateien sucht. „Ein Messgerät, nicht grep“ bedeutet: eine
wichtige Zahl erhält man nicht, indem man mit einer Textsuche zählt, sondern mit einem Programm mit
Test.

**Grundursache** — Der wirkliche Grund eines Problems, im Gegensatz zum Symptom. Das Symptom zu
beheben lässt das Problem zurückkehren; die Grundursache zu beheben nicht.

**Heap** — Der Speicher, den ein Programm benutzt. „Die Batterie starb am Heap“ heißt, dass den
Tests der Speicher ausging und es so aussah, als würden sie fehlschlagen.

**HITL (human in the loop, Mensch im Kreislauf)** — Ein Entwurf, bei dem eine Person genehmigt,
bevor das System handelt. In Autorisierungen der manuelle Genehmiger.

**Index** — Eine Hilfsstruktur der Datenbank, die eine Suche schnell macht. Ohne Index ist die
Abfrage ein Full Scan.

**IPC (Leine zwischen Prozessen)** — Ein Kanal zwischen zwei Prozessen. In Forge 1.18.0 wurde er
als „Leine“ verwendet: stirbt der Elternprozess, erfährt es das Kind und schaltet sich ab.

**JSON (Speicherung in)** — Die Daten in Textdateien im JSON-Format halten statt in einer
Datenbank. Zum Anfangen gut; für Millionen Zeilen unbrauchbar.

**Kikan** — Das Omnikanal-Servicedesk- und Kampagnensystem des Vereins, das zweite
Produktionssystem.

**Krankenkasse (die)** — So nennt dieses Dokument den Gesundheitsversicherer, der Kunde des ersten
Produktionssystems ist (sein echter Name bleibt zurückgehalten).

**Legacy (Altsystem)** — Ein altes System, das noch in Gebrauch ist.

**Log** — Die Aufzeichnung dessen, was ein Programm nach und nach tut. „Prüf mit dem Log“
bedeutet: vertraue nicht dem, was der Agent sagt, getan zu haben, schau in die Aufzeichnung.

**Lügen (ein Messgerät)** — Wenn ein Instrument eine falsche Zahl liefert, weil es einen Teil
dessen, was es messen soll, nicht sieht. Uns ist das zweimal passiert.

**MariaDB** — Die SQL-Datenbank-Engine, die Kikan in Produktion verwendet.

**Messgerät mit Schutz** — Ein Skript, das etwas misst (wie viele Abfragen, wie viele Schleifen)
und einen eigenen Test hat, der prüft, dass das Messgerät richtig misst. „Mit Schutz“ heißt „durch
einen Test geschützt“.

**Mock (mocken)** — Einen echten Teil des Systems während eines Tests durch eine Simulation
ersetzen. „Sich nicht selbst mocken“ heißt, nicht genau den Teil zu simulieren, den man prüfen
will.

**Monat drei** — Unser Ausdruck für den Moment, in dem ein schnell gebautes System seine Probleme
zu zeigen beginnt: wenn es echte Daten und echte Nutzer hat.

**NAC3** — Das Protokoll von Forge, das die Bildschirme einer Anwendung programmatisch bedienbar
macht (jedes Element der Oberfläche hat eine Kennung und Methoden). Es ermöglicht das
Ende-zu-Ende-Testen. Pablo hat klargestellt, dass es für die Methode nicht verpflichtend ist: es
ist das Mittel, nicht die Bedingung.

**Node (Node 22)** — Die Umgebung, in der serverseitiges JavaScript läuft. „Node 22 fixiert“
bedeutet, dass die Version festgenagelt wurde, damit alle Umgebungen dieselbe verwenden.

**Obergrenze zurren** — Ein Limit (ein Budget, ein erlaubtes Maximum) senken, bis es knapp über
dem Gemessenen liegt, damit jede Verschlechterung einen Test fehlschlagen lässt.

**Orakel** — Eine externe Quelle der Wahrheit, gegen die ein Ergebnis geprüft werden kann. Für die
Zähler der Krankenkasse ist das Orakel der Autorisierer.

**P0, P1, P2** — Prioritätsstufen eines Befunds: P0 ist das, was sofort zu lösen ist.

**Papier** — Ein Analysedokument mit Messungen und Schlussfolgerungen. Das `PAPER_SUMI_VS_AGENTIC`
ist das, das die Beendigung der Multi-Agenten-Crew rechtfertigte.

**Playwright** — Ein Werkzeug, das einen Browser programmatisch steuert, um Bildschirme so zu
testen, wie ein Mensch es tun würde.

**PND (offener Posten)** — Ein nummerierter Eintrag der Arbeitswarteschlange (PND-001,
PND-002 …). In dieser Methode SIND die offenen Posten der Plan.

**Abfragebudget** — Die maximale Anzahl von Datenbankabfragen, die ein Pfad der Anwendung machen
darf, gemessen und durch einen Test geschützt. Überschreitet eine Änderung es, schlägt der Test
fehl.

**Rot bewiesen** — Ein Test, von dem gezeigt wurde, dass er gegen den alten Code FEHLSCHLÄGT, bevor
die Behebung ihn grün macht. Wenn du ihn nie rot gesehen hast, weißt du nicht, ob er etwas beweist.

**PROD (Produktion)** — Die echte Umgebung, die der Kunde benutzt.

**Beförderung (UAT → PROD)** — Etwas (Konfiguration, Kampagnen) kontrolliert von der Testumgebung
in die Produktion bringen.

**Pull / Push** — Code vom bzw. zum entfernten Repository (GitHub) herunter- und hochladen.

**R8-Modal** — In Forge das Fenster, das alles anhält, wenn der Agent in eine Schleife ohne
Fortschritt gerät.

**Ratsche** — Ein Mechanismus, der sich nur in eine Richtung dreht. In Kikan ein Zähler von
Aufrufen ohne `await`, der nur sinken kann: steigt er, schlägt der Test fehl.

**Regression** — Ein Test, der prüft, dass etwas, das schon funktionierte, nach einer Änderung
weiter funktioniert.

**Relay** — Der Vermittlungsdienst, der die Forge-Mobil-App mit der Desktop-Sitzung verbindet.

**Repository (Repo)** — Der Ort, an dem der Code mit seiner ganzen Geschichte lebt.
„Standard-Repo“ heißt eines, das mit Git verwaltet wird und eine erkennbare Struktur hat.

**Retention (Aufbewahrung)** — Wie lange die Daten jeder Tabelle aufbewahrt werden, bevor sie
gelöscht werden.

**Rollback (Rückweg)** — Zur vorherigen Version zurückkehren, wenn ein Deployment schiefgeht.

**RPAForce** — Pablos Marke, unter der diese Systeme geliefert werden.

**Runbook** — Ein Schritt für Schritt aufgeschriebenes Betriebsverfahren, dem jeder folgen kann.
„Idempotent“ heißt, es kann zweimal laufen, ohne etwas zu brechen.

**Rückschlag** — Ein Vorfall, ein Fehler, der wehtat. „Rückschlag → Regel“ ist das
Entstehungsmuster aller Doktrinen.

**SDD** — Ein Softwareentwurfsdokument, das vor dem Bauen geschrieben wird.

**Sämaschine (Seeder)** — Ein Skript, das Testdaten in eine Umgebung lädt.

**Shift left** — Das Testen im Entwicklungsprozess nach vorn verlagern, nach „links“ auf dem
Zeitstrahl, statt es für den Schluss aufzuheben.

**Smell (Geruch)** — Ein Zeichen, dass im Code etwas nicht stimmt, bevor er versagt.

**Sperre** — Ein Schutz, der verhindert, dass eine gefährliche Aktion ohne ausdrückliche Bedingung
stattfindet. Der Panikknopf zum Beispiel hat eine eigene Sperre: er kann nicht versehentlich gedrückt
werden.

**SQ (Standards of Quality, Qualitätsstandards)** — Die Arbeitsvereinbarung zwischen Mensch und
Agent in Forge. Nummeriert: SQ 1 (die Zeit des Nutzers ist heilig), SQ 2 (null Schulden), SQ 3
(ASCII), SQ 4 (Dokumentation aktuell), SQ 5 (exakter Umfang), SQ 6 (Sprache des Nutzers), SQ 7
(Produzent/Konsument-Symmetrie), SQ 8 (Autonomie), SQ 9 (prüfen, bevor man behauptet). Und im
langen Dokument die Abschnitte 0.1 bis 0.11.

**SQL** — Die Sprache der relationalen Datenbanken.

**Sumi (Sumi-Forge)** — Der Name der Claude-Code-Sitzung, die mit Pablo im Forge-Repository
arbeitet; die, die dieses Dokument schreibt. Forge ist das Produkt; Sumi ist die, die es baut und
auditiert, was Forge in anderen Projekten tut.

**Tag** — Eine Markierung auf einem Commit, die eine Version kennzeichnet (zum Beispiel v1.18.0).

**TDD** — „Erst der Test, dann der Code“. Die Methode behält es als Option für kleine Umfänge,
nicht als universelle Regel.

**Technische Schuld** — Was schlecht gemacht „zum späteren Reparieren“ liegen bleibt. Die Methode
verbietet sie: was bricht, wird in derselben Sitzung an der Wurzel behoben.

**Token** — Zwei Bedeutungen. In der KI: die Einheit, in der der vom Modell verarbeitete Text
gemessen (und berechnet) wird. In der Sicherheit: ein Zugangsgeheimnis. „Ein `git add -A` mit einem
Token“ heißt, versehentlich ein Zugangsgeheimnis ins Repository hochzuladen.

**Tor (Gate)** — Eine Bedingung, die erfüllt sein muss, um weiterzukommen. Ist sie nicht erfüllt,
kommt man nicht durch. In Forge sind sie G1 bis G9 nummeriert.

**Tresor (Vault)** — Ein verschlüsselter Ort, an dem Geheimnisse (Schlüssel, Passwörter)
aufbewahrt werden, statt sie in Textdateien zu lassen.

**Tafel (das Board)** — Das geteilte Board in Forge, auf dem der Agent Berichte hinterlässt,
damit Pablo sie liest.

**UAT** — Die Umgebung, in der der Kunde vor der Produktion testet.

**Überschreiben (eine Konfiguration)** — Versehentlich über etwas drüberschreiben. „Die Batterie
überschrieb die Deployment-Konfiguration“ war PND-107.

**Urazuke** (裏付け) — Der Name der Methode. Auf Japanisch der Rückhalt, den eine Behauptung hat,
das, was sie von hinten stützt; *urazukeru*, mit Belegen untermauern. Ausgesprochen u-ra-SU-ke.
Wird nicht übersetzt.

**Verein (der)** — So nennt dieses Dokument den Kunden des Systems Kikan (sein echter Name bleibt
zurückgehalten): ein gemeinnütziger Verein, der Familien betreut und einen Omnikanal-Servicedesk
(mehrere Kontaktkanäle an einem Ort) und Kampagnen brauchte.

**Vibecoding / Vibecoder** — Software bauen, indem man mit einer KI spricht und beschreibt, was
man will, statt den Code von Hand zu schreiben. Ein Vibecoder ist, wer das tut.

**Wächter** — In Autorisierungen der Prozess, der regelmäßig prüft, was hängen geblieben ist, und
es anstößt, mit Schutzvorrichtungen, um nicht zweimal anzustoßen.

**Menge (Volumetrie)** — Wie viele Daten das System handhaben wird: Zeilen pro Jahr, Nutzer,
Spitzen.

**Watchdog (Stille-Wachhund)** — Ein Prozess, der beobachtet, ob ein anderer noch Lebenszeichen
gibt, und ihn beendet, wenn er zu lange still bleibt. Forge 1.18.0 fügte einen hinzu, damit ein Zug
nicht mehr verwaisen kann.

**Kontingent verbrennen** — Das Budget von etwas (Continuous-Integration-Minuten, KI-Tokens)
vorzeitig aufbrauchen.

**Zug** — Eine Runde des Gesprächs mit dem Agenten: der Nutzer bittet, der Agent arbeitet und
antwortet.

**yerp_** — Das Präfix der API-Schlüssel von Kikan.

**yf** — Der Befehl von Forge im Terminal.

**Yujin** — Das Ökosystem, dessen kommerzielles Produkt Forge ist.
