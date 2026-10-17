# Schritt 11 — Das periodische Audit als Input für den Plan (Sprossenvertrag)

**Phase:** Betrieb (hin und wieder: beim Abschluss einer großen Etappe, vor einem wichtigen
Deployment, oder alle ein bis zwei Monate).
**Form:** ein einziger langer Durchgang, idealerweise durch einen anderen Agenten als den, der
baut.
**Größe:** verpflichtend vor dem ersten Produktions-Deployment, in jedem Projekt; danach
proportional zum Änderungstempo (ein System, das sich jede Woche ändert, wird jeden Monat auditiert;
ein stabiles alle sechs).

## Wozu sie dient

Um hin und wieder das ganze System mit frischen Augen anzusehen und das Gesehene in offene Posten zu
verwandeln. Das Audit ist kein Bericht, der abgelegt wird: es ist Plan. Es verhindert das
fest eincodierte Passwort, das niemand sah, die 264 Abfragen, die ganze Tabellen lasen, die bekannte
Schwachstelle in einer Abhängigkeit, die 2.679-Zeilen-Komponente. Und es ist die Unabhängigkeit der
Qualitätssicherung, einen Schritt weiter nach innen getragen: wer auditiert, ist nicht der, der
gebaut hat.

Zur Unabhängigkeit: es braucht weder eine andere Firma noch ein anderes Werkzeug. Es genügt **eine
andere Sitzung, mit einer anderen Anweisungsdatei, die am Bau nicht beteiligt war**. Gesucht wird,
dass der Prüfer die Annahmen des Erbauers nicht teilt. Ein Modell, das ein Modul gebaut hat,
„weiß“, dass das fest eincodierte Passwort vorläufig war; ein Modell, das es zum ersten Mal sieht,
meldet es als das, was es ist.

## 1. Benötigter Kontext

- Das vollständige Repository, nur lesend.
- Produktion oder die Testumgebung, nur lesend (Datenbank, Logs).
- Das vorherige Audit, falls es eines gab, um zu messen, was sich geändert hat.
- Der Umfang: Integrität, Sicherheit, Leistung, Codequalität oder alles.

## 2. Prompts

**Eröffnung (an einen anderen Agenten als den Erbauer, wenn möglich):**

> Audit this system for [scope]. Read-only: change nothing except writing your report to
> `docs/AUDIT_[date].md`. If auditing some part requires access you lack (the database, the
> log, an environment), tell me and mark that part as not audited; do not pass it as fine. Go
> through all of the code, not a sample. For every finding: where it is (file and line), what
> the risk is, what evidence proves it (the command, the query, the number), and its priority:
> P0 must be fixed now, P1 soon, P2 when possible. Give a grade to every dimension you audited.
> End with the list of P0 findings turned into proposed pending items. Reply in my language.

Was wir verlangen, Klausel für Klausel: nur lesend (der Prüfer behebt nicht; er schlägt vor); die
Vollständigkeitsklausel in ihrer Auditform: **was nicht auditiert werden konnte, wird erklärt,
nicht durch Unterlassung gutgeheißen**; den ganzen Code und keine Stichprobe, denn die schweren
Befunde liegen meist dort, wo niemand hinschaut; jeden Befund mit Ort, Risiko, Beleg und Priorität,
damit er handhabbar ist, ohne den Bericht nochmals zu lesen; Noten pro Dimension, um mit dem
vorherigen Audit zu vergleichen; und die P0-Befunde bereits als vorgeschlagene offene Posten.

**Abschluss (an den Erbauer):**

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.

Was wir verlangen: dass das Audit zu offenen Posten wird (sonst ist es ein Bericht, der abgelegt
wird), und dass Widerspruch ausdrücklich und belegt ist, nicht stillschweigend.

## 3. Erwartetes Ergebnis

- `docs/AUDIT_[date].md` mit: Umfang, was auditiert werden konnte und was nicht (und warum), die
  Befunde mit Ort, Risiko, Beleg und Priorität, eine Note pro Dimension und die Liste der
  vorgeschlagenen offenen Posten.
- In `docs/PENDING.md`: ein Posten pro P0 und P1, mit Verweis auf den Befund.

## 4. Vollständigkeitsprüfung

- Sagt der Bericht, was er NICHT auditieren konnte? Wenn er sagt, er habe alles auditiert, sei
  misstrauisch.
- Wähle zwei Befunde: haben sie Datei und Zeile und einen Beleg, den du reproduzieren kannst?
- Hat jedes P0 seinen offenen Posten, bevor das Audit als abgeschlossen gilt?
- Lassen sich die Noten pro Dimension mit dem vorherigen Audit vergleichen?
- Hat derselbe Agent auditiert, der gebaut hat? Wenn ja, verlange einen zweiten Blick auf die P0.

## 5. Warnsignale

- Das Audit hat kein P0 gefunden. Bei einem System mit mehr als drei Monaten Lebensdauer ist das
  fast nie wahr; wahrscheinlicher war der Umfang klein oder der Prüfer teilte Annahmen.
- Die Befunde haben keine Dateizeile. Das sind Meinungen, keine Befunde.
- Zwei Wochen sind vergangen und die P0 haben immer noch keinen offenen Posten. Das Audit wurde
  abgelegt.
