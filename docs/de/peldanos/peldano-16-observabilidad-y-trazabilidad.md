# Schritt 16 — Vollständige Beobachtbarkeit und Nachverfolgbarkeit, mit konfigurierbarem Level (Schrittvertrag)

**Abschnitt:** Produktionsfreigabe.
**Wann:** in der Phase der Produktionsfreigabe, nach der 15 (es gibt schon eine Deployment-Kette
und Konfiguration pro Umgebung) und vor den Lasttests (19), denn ohne Beobachtbarkeit sagen die
Lasttests nicht, was kaputtgegangen ist. In einem Altsystem gehört das Mindestniveau
(strukturierte Logs mit konfigurierbarem Level und eine Korrelations-ID) in den Sicherheitsgurt
(N4); das vollständige Niveau hierher. Die Regel „jedes neue Modul loggt und propagiert“ gilt
während des ganzen Betriebs.
**Form:** ein einziger Durchgang; der Agent baut es auf und beweist es; du liest eine echte Spur.
**Größe:** verpflichtend in seinem Mindestniveau in jedem Projekt, das Nutzer haben wird;
vollständig in jedem Projekt mit Konsequenzen.

## Wozu er dient

Wenn in der Produktion etwas schiefgeht, und es wird schiefgehen, will ich einer Aktion vom
Bildschirm bis zur Datenbank und bis zu jedem externen Aufruf folgen können, mit einer einzigen
Kennung, ohne den Code zu öffnen und ohne den Agenten zu bitten, „nachzusehen“. Und ich will das
Detailniveau der Logs in der Produktion in einer Minute hochdrehen können, ohne neu zu deployen,
und danach wieder herunterdrehen. Das ist Beobachtbarkeit: sehen, was das System tut. Und das
Zweite ist Nachverfolgbarkeit: dass jede Aktion mit Konsequenz (abgebucht, gesendet, gelöscht,
genehmigt) eine Spur hinterlässt — wer, wann, was, von wo und mit welchem Ergebnis —, in einer
Aufzeichnung, die die Anwendung nicht bearbeiten kann. Ohne das agiert der residente Agent aus
Schritt 23 blind, das Monitoring der Schritte 21 und 22 hat nichts, wovon es sich ernähren
könnte, und jeder Vorfall wird mit Hypothesen statt mit Belegen diagnostiziert. Der verwaiste
Zug, der eine Stunde dreiundvierzig weiterlebte, wurde über das Log gefunden, nicht über den Code
[Ref. 16](../REFERENCIAS.md#ref-16); und der residente Agent fing genau damit an, Logs zu lesen
[Ref. 13](../REFERENCIAS.md#ref-13).

„Konfigurierbares Level“ ist die Klausel, die das hier von „Logs einbauen“ unterscheidet: das
Level (Fehler, Warnung, Information, Debug, Trace) wird per Konfiguration auf dem Server
geändert, pro Umgebung, ohne Code anzufassen und ohne zu deployen, und die Produktion läuft auf
Information, außer wenn gerade etwas untersucht wird.

**Wenn du Anfänger bist.** Ein *Log-Eintrag* ist eine Zeile, die das System jedes Mal schreibt,
wenn es etwas tut: „10:42:13, Modul Agenda, Nutzer recepcion1, Termin 17 abgesagt“.
*Strukturiert* heißt, dass alle Zeilen dieselben Teile in derselben Reihenfolge haben, damit man
sie maschinell durchsuchen kann. Das *Level* ist, wie viel Detail geschrieben wird: bei „Fehler“
nur das, was fehlgeschlagen ist; bei „Trace“ jeder einzelne Schritt. Die *Korrelations-ID* ist
eine eindeutige Nummer, die jeder Aktion zu Beginn gegeben wird (du hast auf „absagen“ gedrückt)
und die an allem klebt, was diese Aktion auslöst (die Abfrage an die Datenbank, die Nachricht an
den Patienten); so sucht man hinterher diese Nummer und die ganze Geschichte erscheint. Und das
*Audit-Log* ist eine nicht bearbeitbare Liste der wichtigen Aktionen: wer hat was wann getan.

## 1. Benötigter Kontext

Was folgt, ist die generische Liste. Die konkreten Dateien, die du vor jedem Prompt fertig haben
musst, mit ihrem Inhalt und ihrem Mindestzustand, stehen in Abschnitt 2, in dem Block „Bevor du
den Prompt schickst“, der jedem einzelnen vorangeht.

- Die Deployment-Kette und die Konfiguration pro Umgebung (Schritt 15): das Level wird dort
  konfiguriert.
- Die Tabelle der Sperren (Schritt 14): jede Aktion mit Konsequenz ist ein Eintrag des Audit-Logs.
- Die anfängliche Erhebung mit den markierten personenbezogenen Daten: die Logs dürfen sie nicht
  enthalten.
- Wo die Logs und die Metriken leben werden (eine rotierte Datei, ein Dienst): das entscheidest du.

## 2. Prompts

**Zu Beginn:**

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- `docs/DEPLOYMENT.md` (Schritt 15) mit der Art, wie die Konfiguration pro Umgebung gelesen wird:
  das Log-Level wird eine weitere Variable dieser Konfiguration sein.
- `docs/LOCKS.md` (Schritt 14): die Liste der Aktionen mit Konsequenz ist die Liste dessen, was im
  Audit-Log stehen muss.
- In `docs/INITIAL_SURVEY.md` die Liste, welche Daten personenbezogen sind (Namen, Telefonnummern,
  E-Mail-Adressen, Ausweisnummern, Diagnosen), von dir mit dem Eigentümer geschrieben: das ist
  das, was die Logs maskieren müssen. Es ist eine gesetzliche Pflicht, keine Vorliebe.
- Deine Entscheidung, wo die Logs und die Metriken leben: eine rotierte Datei auf dem Server
  reicht für ein kleines Projekt; ein Log-Dienst für eines mit Konsequenzen. Und wie lange sie
  aufbewahrt werden.
- Akzeptabler Mindestzustand: du weißt, welche Daten personenbezogen sind und wo die Logs leben
  werden.

> We are going to make this system observable and traceable, end to end, with a level that I can
> change without redeploying. Read `PROJECT.md`, `docs/SEMANTIC_TREE.md`, `docs/DEPLOYMENT.md` and
> `docs/LOCKS.md`. Evaluate whether you have what is needed (where the logs and metrics will live,
> how configuration is read per environment, which external services are called); if anything is
> missing, ask me. Then set up: (1) structured logging, one record per event, with timestamp,
> level, module, correlation id and actor, with the level configurable per environment at runtime
> (error, warning, info, debug, trace) without a redeploy, and a default of info in production;
> (2) a correlation id created at the entry of every request, job and message, propagated through
> every call and written in every record, so that one id follows an action from the screen to the
> backend, to the database and to every external call; (3) traceability of every consequential
> action in `docs/LOCKS.md`: who, when, what, from where, with which input and which outcome, in
> an audit record the application cannot edit; (4) health and metrics endpoints or files
> (requests, latency, errors, queue sizes, resource usage) that the monitoring of steps 21 and 22
> will read; (5) masking of every personal field listed in `docs/INITIAL_SURVEY.md`, so that no
> log record contains personal data. Show me one real request followed by its id through every
> layer, and show me the level changing in the test environment without a redeploy. Document the
> levels, where to change them and where the records live in `docs/OBSERVABILITY.md`. Reply in my
> language.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [de]
> Wir werden dieses System beobachtbar und nachverfolgbar machen, von Anfang bis Ende, mit einem
> Level, das ich ohne neues Deployment ändern kann. Lies `PROJECT.md`, `docs/SEMANTIC_TREE.md`,
> `docs/DEPLOYMENT.md` und `docs/LOCKS.md`. Beurteile, ob du hast, was nötig ist (wo die Logs und
> die Metriken leben werden, wie die Konfiguration pro Umgebung gelesen wird, welche externen
> Dienste aufgerufen werden); wenn etwas fehlt, frag mich. Bau dann auf: (1) strukturiertes
> Logging, ein Eintrag pro Ereignis, mit Zeitstempel, Level, Modul, Korrelations-ID und Akteur,
> mit dem Level pro Umgebung zur Laufzeit konfigurierbar (Fehler, Warnung, Information, Debug,
> Trace) ohne neues Deployment, und mit Information als Standard in der Produktion; (2) eine
> Korrelations-ID, die am Eingang jeder Anfrage, jeder Aufgabe und jeder Nachricht erzeugt, durch
> jeden Aufruf weitergegeben und in jeden Eintrag geschrieben wird, sodass eine einzige ID einer
> Aktion vom Bildschirm bis zum Backend, zur Datenbank und zu jedem externen Aufruf folgt; (3)
> Nachverfolgbarkeit jeder Aktion mit Konsequenz aus `docs/LOCKS.md`: wer, wann, was, von wo, mit
> welcher Eingabe und mit welchem Ergebnis, in einem Audit-Eintrag, den die Anwendung nicht
> bearbeiten kann; (4) Endpunkte oder Dateien für Gesundheit und Metriken (Anfragen, Latenz,
> Fehler, Größe der Warteschlangen, Ressourcennutzung), die das Monitoring der Schritte 21 und 22
> lesen wird; (5) Maskierung jedes personenbezogenen Feldes, das in `docs/INITIAL_SURVEY.md`
> aufgelistet ist, sodass kein Log-Eintrag personenbezogene Daten enthält. Zeig mir eine echte
> Anfrage, der über jede Schicht hinweg ihre ID folgt, und zeig mir das Level, das sich in der
> Testumgebung ohne neues Deployment ändert. Dokumentiere die Level, wo man sie ändert und wo die
> Einträge leben, in `docs/OBSERVABILITY.md`.
>
> Wenn du eine Entscheidung von mir brauchst, stelle die Frage mit den vier Teilen von UX-28
> (`docs/ANEXO_HEURISTICAS.md`) und in dieser Reihenfolge: die Daten, die die Frage nötig machen,
> aufgelistet; ein Absatz von höchstens fünf Zeilen, der sie verbindet und die Frage sichtbar
> macht; die Frage selbst mit ihren möglichen Antworten durchnummeriert; und deine Empfehlung.
> Sage es in der technischen Tiefe, die das Projekt in `communication_depth` erklärt hat
> —`beginner`, `decision_maker` oder `technical`—; hat das Projekt keine erklärt, nimm
> `decision_maker`.
>
> Antworte in meiner Sprache.

Was ich hier verlange: die fünf Teile, und zwei Beweise, die der Beleg dieses Schritts sind:
**eine echte Kennung, der durch alle Schichten gefolgt wird** (wenn er sie nicht zeigen kann, ist
die Weitergabe irgendwo kaputt) und **das Level, das sich ohne Deployment ändert** (wenn man
deployen muss, ist es nicht konfigurierbar). Das Audit-Log der Aktionen mit Konsequenz muss aus
der Anwendung heraus unveränderlich sein, denn eine Spur, die die Anwendung löschen kann, ist
keine Spur. Und die Maskierung der personenbezogenen Daten steht im selben Prompt, weil die Logs
der Ort sind, an dem die meisten personenbezogenen Daten abfließen, ohne dass jemand es
entschieden hat.

**Routine (gehört in die Arbeitsvereinbarung):**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- `docs/OBSERVABILITY.md`, von dir gelesen: verstehst du, wie man das Level hochdreht und wo man
  einen Log-Eintrag liest?
- `docs/WORKING_AGREEMENT.md`, wohin die Routine gehört.
- Akzeptabler Mindestzustand: du hast das Level einmal selbst hoch- und wieder heruntergedreht, in
  der Testumgebung.

> Every new module, job or integration writes structured log records with the correlation id and
> the actor at the level that corresponds, masks personal data, propagates the id to every call it
> makes, and records every consequential action in the audit trail. A pending item that adds one
> of those is not closed without showing one real id followed end to end through the new code.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [de]
> Jedes neue Modul, jede neue Aufgabe und jede neue Integration schreibt strukturierte
> Log-Einträge mit der Korrelations-ID und dem Akteur auf dem Level, das dazu passt, maskiert die
> personenbezogenen Daten, gibt die ID an jeden Aufruf weiter, den sie macht, und hält jede Aktion
> mit Konsequenz im Audit-Log fest. Ein offener Posten, der eines davon hinzufügt, wird nicht
> geschlossen, ohne eine echte ID zu zeigen, der von Anfang bis Ende durch den neuen Code gefolgt
> wurde.
>
> Wenn du eine Entscheidung von mir brauchst, stelle die Frage mit den vier Teilen von UX-28
> (`docs/ANEXO_HEURISTICAS.md`) und in dieser Reihenfolge: die Daten, die die Frage nötig machen,
> aufgelistet; ein Absatz von höchstens fünf Zeilen, der sie verbindet und die Frage sichtbar
> macht; die Frage selbst mit ihren möglichen Antworten durchnummeriert; und deine Empfehlung.
> Sage es in der technischen Tiefe, die das Projekt in `communication_depth` erklärt hat
> —`beginner`, `decision_maker` oder `technical`—; hat das Projekt keine erklärt, nimm
> `decision_maker`.

Was ich hier verlange: dass sich die Beobachtbarkeit nicht mit jedem neuen Modul verschlechtert,
was immer passiert, wenn es keine Regel ist: das Modul aus Monat drei loggt nichts und ist genau
das, das ausfällt.

## 3. Erwartetes Ergebnis

- Strukturierte Logs mit pro Umgebung konfigurierbarem Level, ohne Deployment geändert.
- Eine Korrelations-ID in jedem Log-Eintrag, weitergegeben vom Bildschirm bis zur Datenbank und zu
  den externen Aufrufen.
- Ein unveränderliches Audit-Log der Aktionen mit Konsequenz.
- Endpunkte oder Dateien für Gesundheit und Metriken, dokumentiert.
- Keine personenbezogenen Daten in den Logs.
- `docs/OBSERVABILITY.md` und die Routine in der Vereinbarung.

## 4. Vollständigkeitsprüfung (die machst du, ohne Code zu lesen)

- Verlang von ihm die Kennung einer echten Anfrage und such sie selbst in den Logs: erscheint sie
  im Bildschirm, im Backend, in der Datenbank und im externen Aufruf, falls es einen gab?
- Dreh das Level in der Testumgebung auf Debug, mach eine Aktion, schau in die Logs, dreh es
  wieder herunter. Musstest du deployen? Dann ist der Schritt nicht erklommen.
- Such einen Testnamen oder eine Testtelefonnummer in den Logs: sie dürfen nicht da sein.
- Mach eine Aktion mit Konsequenz in der Testumgebung (absagen, an den falschen Posteingang
  senden): steht sie im Audit-Log, mit wer, wann, was und Ergebnis?
- Reicht dir `docs/OBSERVABILITY.md`, um nachts um drei allein einen Log-Eintrag zu finden?

## 5. Warnsignale

- Der Agent zeigt „Logs“, aber jedes Modul schreibt in einem anderen Format. Das ist nicht
  strukturiert; niemand wird sie durchsuchen können.
- Die Kennung erscheint im Backend, aber nicht in den externen Aufrufen oder in den geplanten
  Aufgaben. Das sind genau die Orte, an denen die Vorfälle verloren gehen.
- Das Level der Produktion ist „erst mal“ auf Debug geblieben. Die Platte läuft voll und Daten
  fließen ab.
- Das Audit-Log der Aktionen mit Konsequenz lebt in derselben Tabelle wie die übrigen Daten, und
  die Anwendung kann es löschen.
