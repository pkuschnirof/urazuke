# Schritt 13 — Das periodische Audit als Input für den Plan (Schrittvertrag)

**Abschnitt:** Produktionsfreigabe.
**Wann:** verpflichtend vor dem ersten Deployment in die Produktion; es eröffnet den Abschnitt der
Produktionsfreigabe. Danach, im Betrieb, alle ein bis zwei Monate je nach Änderungstempo, und beim
Abschluss jeder großen Etappe.
**Form:** ein einziger langer Durchgang, idealerweise an einen anderen Agenten als den, der baut.
**Größe:** verpflichtend vor dem ersten Deployment in die Produktion, in jedem Projekt; danach
proportional zum Änderungstempo (ein System, das sich jede Woche ändert, wird jeden Monat
auditiert; ein stabiles alle sechs).

## Wozu er dient

Schau dir ab und zu das ganze System mit frischen Augen an, und verwandle, was du siehst, in
offene Posten. Das Audit ist kein Bericht, der abgelegt wird: es ist Plan. Es verhindert das im
Code geschriebene Passwort, das niemand gesehen hatte, die Abfragen, die ganze Tabellen lesen
[Ref. 18](../REFERENCIAS.md#ref-18), die bekannte Schwachstelle in einer Abhängigkeit, die
Komponente mit tausenden Zeilen [Ref. 41](../REFERENCIAS.md#ref-41). Und es ist die Unabhängigkeit
der Qualitätskontrolle, einen Schritt weiter nach innen getragen: wer auditiert, ist nicht der,
der gebaut hat.

Zur Unabhängigkeit: es braucht weder eine andere Firma noch ein anderes Werkzeug. Es reicht
**eine andere Sitzung, mit einer anderen Anweisungsdatei, die am Bau nicht beteiligt war**. Was du
suchst, ist, dass der Auditor die Annahmen des Bauenden nicht teilt. Ein Modell, das ein Modul
gebaut hat, „weiß“, dass das hartkodierte Passwort provisorisch war; ein Modell, das es zum ersten
Mal sieht, meldet es als das, was es ist. So wurden zwei Administrator-Türen entdeckt, die der
Bauende an einem Tag hinterlassen hatte [Ref. 40](../REFERENCIAS.md#ref-40).

## 1. Benötigter Kontext

Was folgt, ist die generische Liste. Die konkreten Dateien, die du vor jedem Prompt fertig haben
musst, mit ihrem Inhalt und ihrem Mindestzustand, stehen in Abschnitt 2, in dem Block „Bevor du
den Prompt schickst“, der jedem einzelnen vorangeht.

- Das vollständige Repository, nur lesend.
- Die Produktion oder die Testumgebung, nur lesend (Datenbank, Logs).
- Das vorherige Audit, falls es eines gab, um zu messen, was sich geändert hat.
- Der Umfang: Integrität, Sicherheit, Leistung, Codequalität, oder alles.

## 2. Prompts

**Zu Beginn (an einen anderen Agenten als den Bauenden, wenn möglich):**

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- Eine neue Sitzung des Agenten, verschieden von der des Bauenden: ein sauberer Klon des
  Repositorys in einem anderen Ordner und, wenn dein Werkzeug es erlaubt, eine andere
  Anweisungsdatei, die nur sagt „du bist ein Auditor; du hast dieses System nicht gebaut“. Ohne
  das teilt der Auditor die Annahmen des Bauenden und bestätigt sie.
- Nur lesender Zugang für diese Sitzung zur Testumgebung oder zur Produktion: Datenbank, Logs. Nur
  lesende Zugangsdaten, außerhalb des Repositorys, mit dem Namen der Variablen im Chat gesagt.
- Der Umfang, von dir entschieden, für die Lücke [scope]: Integrität, Sicherheit, Leistung,
  Codequalität, oder alles.
- Das vorige Audit, falls es eines gab (`docs/AUDIT_[Datum]` vom letzten Mal), damit er misst, was
  sich geändert hat.
- Akzeptabler Mindestzustand: die Sitzung des Auditors ist nicht die des Bauenden, und sie hat nur
  Lesezugang.

> Audit this system for [scope]. Read-only: change nothing except writing your report to
> `docs/AUDIT_[date].md`. If auditing some part requires access you lack (the database, the
> log, an environment), tell me and mark that part as not audited; do not pass it as fine. Go
> through all of the code, not a sample. For every finding: where it is (file and line), what
> the risk is, what evidence proves it (the command, the query, the number), and its priority:
> P0 must be fixed now, P1 soon, P2 when possible. Give a grade to every dimension you audited.
> End with the list of P0 findings turned into proposed pending items. Reply in my language.

> [de]
> Auditiere dieses System auf [Umfang]. Nur lesend: ändere nichts, außer deinen Bericht nach
> `docs/AUDIT_[Datum].md` zu schreiben. Wenn das Auditieren eines Teils einen Zugang erfordert,
> den du nicht hast (die Datenbank, das Log, eine Umgebung), sag es mir und markiere diesen Teil
> als nicht auditiert; lass ihn nicht als in Ordnung durchgehen. Geh den ganzen Code durch, nicht
> eine Stichprobe. Für jeden Befund: wo er ist (Datei und Zeile), was das Risiko ist, welcher
> Beleg ihn beweist (der Befehl, die Abfrage, die Zahl), und seine Priorität: P0 muss jetzt
> behoben werden, P1 bald, P2 wenn möglich. Gib jeder auditierten Dimension eine Note. Schließe
> mit der Liste der P0-Befunde, umgewandelt in vorgeschlagene offene Posten. Antworte in meiner
> Sprache.

Was ich hier verlange, Klausel für Klausel: nur lesend (der Auditor behebt nicht; er schlägt
vor); die Vollständigkeitsklausel in ihrer Form fürs Auditieren: **was nicht verifiziert werden
konnte, wird erklärt, nicht durch Unterlassung freigegeben**; den ganzen Code und nicht eine
Stichprobe, denn die schweren Befunde liegen meist dort, wo niemand hinschaut; jeden Befund mit
Ort, Risiko, Beleg und Priorität, damit er umsetzbar ist, ohne den Bericht erneut zu lesen; Noten
pro Dimension, zum Vergleich mit dem vorherigen Audit; und die P0 schon in vorgeschlagene offene
Posten umgewandelt.

**Zum Abschluss (an den Bauenden):**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- `docs/AUDIT_[Datum].md`, von dir gelesen, und zwei zufällige Befunde mit dem Auditor verifiziert
  (verlang den Befehl, die Zeile; er muss sie zeigen können).
- Die Sitzung des Bauenden geöffnet: dieser Prompt geht an den Bauenden, nicht an den Auditor, mit
  dem Datum der Datei in der Lücke.
- Akzeptabler Mindestzustand: du hast den Bericht gelesen, du weißt, wie viele P0 und P1 es gibt,
  und du wirst die offenen Posten zählen, die er aufmacht.

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.

> [de]
> Lies `docs/AUDIT_[Datum].md`. Öffne einen offenen Posten für jeden P0 und P1, mit Verweis auf
> den Befund. Wenn du mit einem nicht einverstanden bist, sag es mir mit dem Gegenbeleg;
> ignoriere ihn nicht.

Was ich hier verlange: dass das Audit zu offenen Posten wird (sonst ist es ein Bericht, der
abgelegt wird), und dass der Widerspruch explizit und mit Beleg erfolgt, nicht stillschweigend.

## 3. Erwartetes Ergebnis

- `docs/AUDIT_[Datum].md` mit: Umfang, was verifiziert werden konnte und was nicht (und warum),
  den Befunden mit Ort, Risiko, Beleg und Priorität, einer Note pro Dimension, und der Liste der
  vorgeschlagenen offenen Posten.
- In `docs/PENDING.md`: ein offener Posten für jeden P0 und P1, mit Verweis auf den Befund.

## 4. Vollständigkeitsprüfung

- Sagt der Bericht, was er NICHT verifizieren konnte? Wenn er sagt, er habe alles verifiziert, sei
  misstrauisch.
- Wähl zwei Befunde: haben sie Datei und Zeile, und einen Beleg, den du reproduzieren kannst?
- Hat jeder P0 seinen offenen Posten, bevor das Audit als abgeschlossen gilt?
- Werden sich die Noten pro Dimension mit dem vorherigen Audit vergleichen lassen?
- Hat derselbe Agent auditiert, der gebaut hat? Wenn ja, verlang einen zweiten Blick auf die P0.

## 5. Warnsignale

- Das Audit hat keinen einzigen P0 gefunden. In einem System, das älter als drei Monate ist, ist
  das fast nie wahr; wahrscheinlicher ist, dass der Umfang klein war oder der Auditor die Annahmen
  teilte.
- Die Befunde haben keine Dateizeile. Das sind Meinungen, keine Befunde.
- Zwei Wochen sind vergangen und die P0 haben immer noch keinen offenen Posten. Das Audit wurde
  abgelegt.
