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

Wenn du wählen kannst, soll es außerdem **ein anderes Modell** sein als das, das gebaut hat, und
nicht nur eine andere Sitzung desselben: eine Studie von 2026 hat gemessen, dass eine saubere
Sitzung mit einem anderen Modell mehr Fehler findet als zwei Sitzungen desselben Modells
([arXiv 2610.01471](https://arxiv.org/abs/2610.01471)). Aber diese Vorliebe hat einen
**Mindeststand an Fähigkeit**, und ich sage es, weil ich es gemessen habe: ein anderes Modell
findet mehr **nur dann, wenn dieses Modell die Arbeit leisten kann**. Unterhalb einer bestimmten
Fähigkeit hört die Vielfalt auf, ein Vorteil zu sein, und wird zu einem Kosten, denn einen falschen
Befund zu prüfen kostet fast so viel, wie ihn selbst gesucht zu haben. Die Reihenfolge ist also
diese: zuerst **ein anderes Modell, wenn es der Aufgabe gewachsen ist**; wenn es das nicht ist,
**eine andere Sitzung desselben Modells, und die Abweichung erklärt** in der Zeile `Auditor:` des
Berichts; und **niemals** ein Auditor, der danach ausgewählt wurde, welcher Schlüssel gerade
geladen ist oder welche Zeitüberschreitung er übersteht. Wenn ihn eine Grenze des Werkzeugs
ausgewählt hat, sagt der Bericht es mit diesen Worten: das ist der Fall `tool_constraint` des
Schlüssels `auditor_choice`, und er existiert, weil eine Beschränkung des Werkzeugs sich als
technische Wahl verkleidet und das Einzige, was sie entblößt, ist, sie nennen zu müssen. Dass das
Modell des Erbauers das einzig verfügbare ist, ist kein Versagen der Methode: es ist eine erklärte
Abweichung, und eine erklärte Abweichung kann auditiert werden. (Entscheidung D-079, über das
Experiment vom 2026-11-02: der Auditor auf einem anderen Modell lieferte vier der neun Befunde, die
er selbst angekündigt hatte, und sein einziger P0 war falsch, weil er ein Dezimalkomma falsch las;
der auf demselben Modell, der von der Vorliebe abwich und es in seiner ersten Zeile erklärte,
lieferte siebzehn, und keiner erwies sich als falsch, als sie einer nach dem anderen geprüft
wurden.)

## 1. Benötigter Kontext

Was folgt, ist die generische Liste. Die konkreten Dateien, die du vor jedem Prompt fertig haben
musst, mit ihrem Inhalt und ihrem Mindestzustand, stehen in Abschnitt 2, in dem Block „Bevor du
den Prompt schickst“, der jedem einzelnen vorangeht.

- Das vollständige Repository, nur lesend.
- Die Produktion oder die Testumgebung, nur lesend (Datenbank, Logs).
- Das vorherige Audit, falls es eines gab, um zu messen, was sich geändert hat.
- Der Umfang: Integrität, Sicherheit, Leistung, Codequalität, oder alles.
- `docs/PENDING.md` mit den im letzten Zyklus abgeschlossenen offenen Posten und ihren Belegen,
  damit der Auditor auswählen kann, welche er reproduziert.
- Das Register der Belege des ganzen letzten Zyklus: die funktionalen Commits, die mit ihren
  Belegen abgeschlossenen offenen Posten und die archivierten Belege, die eine Mutation tragen. Das
  ist nicht dasselbe wie der vorige Punkt: dort wählt der Auditor zwei oder drei Belege zum
  Reproduzieren, und hier muss er das ganze Register zählen können.

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
- Wer auditieren wird und warum dieser, von dir entschieden: ein anderes Modell, wenn es der
  Aufgabe gewachsen ist, eine andere Sitzung desselben, wenn es das nicht ist, und niemals das,
  das übrig blieb, weil es der gerade geladene Schlüssel war oder das einzige, das die
  Zeitüberschreitung überstand. Der Prompt verlangt, dass es das im Bericht erklärt, aber die
  Entscheidung ist deine: wenn du sie nicht triffst, trifft sie das Werkzeug.
- Akzeptabler Mindestzustand: die Sitzung des Auditors ist nicht die des Bauenden, und sie hat nur
  Lesezugang.

> Audit this system for [scope]. Read-only: change nothing except writing your report to
> `docs/AUDIT_[date].md`. If auditing some part requires access you lack (the database, the
> log, an environment), tell me and mark that part as not audited; do not pass it as fine. Go
> through all of the code, not a sample. Pick two or three pending items closed in the last cycle
> and reproduce their receipts literally: rerun the exact red-then-green commands they cite
> against the commits they name, and say for each one whether it reproduces or not. A receipt you
> only read is not a receipt you audited. For every finding: where it is (file and line), what
> the risk is, what evidence proves it (the command, the query, the number), and its priority:
> P0 must be fixed now, P1 soon, P2 when possible. Give a grade to every dimension you audited.
> End with the list of P0 findings turned into proposed pending items.
>
> This report carries declarations that a gate reads, each one under its fixed key, so write the
> key in English even when the report is in my language. `auditor_choice`: which case applies and
> who decided it -- `different_model` if you are a model other than the one that built this
> system; `same_model_declared` if you are the same model because no other one was up to the
> task; `tool_constraint` if what chose you was a key that happened to be loaded, a timeout or
> any other limit of the tool, and then say so with those words. In the `Auditor:` line, the
> model that built and the model that audits. `evidence_register_health`: the health of the
> register of the evidence, which is a dimension of this audit and is not optional -- how many
> functional commits carry no receipt of any kind; how many pending items closed as shipped lack
> their receipts, and of those how many have the reason written; and of the receipts that carry
> a mutation, how many can be applied again. Each of those figures measured by a program, with
> the command next to it, and a figure you could not measure declared as not measured and never
> as zero. If the register of the evidence is broken, every other finding in this report rests
> on data nobody can reproduce. `findings_by_destination`: every finding assigned to one
> destination -- `product` if the defect is in the audited system, `method` if it is in the
> method being followed, `tool` if it is in the tool that runs it -- with the register where its
> pending item goes. A finding whose destination nobody assigned leaves this audit open.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [de]
> Auditiere dieses System auf [Umfang]. Nur lesend: ändere nichts, außer deinen Bericht nach
> `docs/AUDIT_[Datum].md` zu schreiben. Wenn das Auditieren eines Teils einen Zugang erfordert,
> den du nicht hast (die Datenbank, das Log, eine Umgebung), sag es mir und markiere diesen Teil
> als nicht auditiert; lass ihn nicht als in Ordnung durchgehen. Geh den ganzen Code durch, nicht
> eine Stichprobe. Wähl zwei oder drei offene Posten, die im letzten Zyklus abgeschlossen wurden,
> und reproduziere ihre Belege wortwörtlich: lass die genauen Rot-dann-Grün-Befehle, die sie
> zitieren, erneut gegen die Commits laufen, die sie nennen, und sag für jeden, ob er sich
> reproduzieren lässt oder nicht. Ein Beleg, den du nur gelesen hast, ist kein Beleg, den du
> auditiert hast. Für jeden Befund: wo er ist (Datei und Zeile), was das Risiko ist, welcher
> Beleg ihn beweist (der Befehl, die Abfrage, die Zahl), und seine Priorität: P0 muss jetzt
> behoben werden, P1 bald, P2 wenn möglich. Gib jeder auditierten Dimension eine Note. Schließe
> mit der Liste der P0-Befunde, umgewandelt in vorgeschlagene offene Posten. Antworte in meiner
> Sprache.
>
> Dieser Bericht trägt Erklärungen, die ein Tor liest, jede unter ihrem festen Schlüssel,
> also schreib den Schlüssel auf Englisch, auch wenn der Bericht in meiner Sprache ist.
> `auditor_choice`: welcher Fall zutrifft und wer es entschieden hat — `different_model`, wenn du
> ein anderes Modell bist als das, das dieses System gebaut hat; `same_model_declared`, wenn du
> dasselbe Modell bist, weil kein anderes der Aufgabe gewachsen war; `tool_constraint`, wenn dich
> ein Schlüssel ausgewählt hat, der gerade geladen war, eine Zeitüberschreitung oder irgendeine
> andere Grenze des Werkzeugs, und dann sag es mit diesen Worten. In der Zeile `Auditor:` das
> Modell, das gebaut hat, und das Modell, das auditiert. `evidence_register_health`: die
> Gesundheit des Registers der Belege, die eine Dimension dieses Audits ist und nicht optional —
> wie viele funktionale Commits keinen einzigen Beleg tragen; wie vielen als geliefert
> abgeschlossenen offenen Posten ihre Belege fehlen, und bei wie vielen davon der Grund
> geschrieben steht; und von den Belegen, die eine Mutation tragen, wie viele sich erneut anwenden
> lassen. Jede dieser Zahlen von einem Programm gemessen, mit dem Befehl daneben, und eine Zahl,
> die du nicht messen konntest, als nicht gemessen erklärt und niemals als null. Wenn das Register
> der Belege kaputt ist, ruht jeder andere Befund dieses Berichts auf Daten, die niemand
> reproduzieren kann. `findings_by_destination`: jeder Befund einem Ziel zugeordnet — `product`,
> wenn der Defekt im auditierten System liegt, `method`, wenn er in der befolgten Methode liegt,
> `tool`, wenn er im Werkzeug liegt, das sie ausführt — mit dem Register, in das sein offener
> Posten geht. Ein Befund, dessen Ziel niemand zugeordnet hat, lässt dieses Audit offen.
>
> Wenn du eine Entscheidung von mir brauchst, stelle die Frage mit den vier Teilen von UX-28
> (`docs/ANEXO_HEURISTICAS.md`) und in dieser Reihenfolge: die Daten, die die Frage nötig machen,
> aufgelistet; ein Absatz von höchstens fünf Zeilen, der sie verbindet und die Frage sichtbar
> macht; die Frage selbst mit ihren möglichen Antworten durchnummeriert; und deine Empfehlung.
> Sage es in der technischen Tiefe, die das Projekt in `communication_depth` erklärt hat
> —`beginner`, `decision_maker` oder `technical`—; hat das Projekt keine erklärt, nimm
> `decision_maker`.

Was ich hier verlange, Klausel für Klausel: nur lesend (der Auditor behebt nicht; er schlägt
vor); die Vollständigkeitsklausel in ihrer Form fürs Auditieren: **was nicht verifiziert werden
konnte, wird erklärt, nicht durch Unterlassung freigegeben**; den ganzen Code und nicht eine
Stichprobe, denn die schweren Befunde liegen meist dort, wo niemand hinschaut; **die wortwörtliche
Reproduktion von zwei oder drei Belegen**, damit das Audit Beweise verifiziert statt sie nur zu
lesen (das ist die Klausel, die die D-033-Lücke schließt: ein erzähltes Rot ist kein auditiertes
Rot); jeden Befund mit Ort, Risiko, Beleg und Priorität, damit er umsetzbar ist, ohne den Bericht
erneut zu lesen; Noten pro Dimension, zum Vergleich mit dem vorherigen Audit; und die P0 schon in
vorgeschlagene offene Posten umgewandelt.

Und was die zwei Entscheidungen vom November hinzufügen, gesondert gesagt, weil beide die Arbeit
des Auditors verändern und nicht nur ihre Formulierung: die **drei Erklärungen mit festem
Schlüssel**, weil „vollständig“ und „auditiert“ keine Eigenschaften sind, die man einem in freier
Prosa geschriebenen Bericht ablesen kann (D-079 und D-080); die **Gesundheit des Registers der
Belege** als verpflichtende Dimension, weil sie die einzige ist, die alle anderen auditiert — wenn
das Register der Belege kaputt ist, ruht jeder andere Befund des Berichts auf Daten, die niemand
reproduzieren kann, und dann ist der ganze Bericht weniger wert, als seine Noten sagen —; und das
**Ziel jedes Befundes**, denn ein Defekt der Methode, der im Register des Produkts eingetragen
wird, ist ein Defekt, den niemals jemand behebt: der Eigentümer des Produkts kann die Methode nicht
reparieren, und wer es könnte, hat davon nie erfahren.

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
>
> Open each one in the register of the destination the report assigned to it: the product
> register for `product`, and for `method` and for `tool` the register of the method or the
> register of the tool, never the product's. If a finding arrives with no destination, ask me
> for it before opening anything.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [de]
> Lies `docs/AUDIT_[Datum].md`. Öffne einen offenen Posten für jeden P0 und P1, mit Verweis auf
> den Befund. Wenn du mit einem nicht einverstanden bist, sag es mir mit dem Gegenbeleg;
> ignoriere ihn nicht.
>
> Öffne jeden im Register des Ziels, das der Bericht ihm zugeordnet hat: das Register des
> Produkts für `product`, und für `method` und für `tool` das Register der Methode oder das des
> Werkzeugs, niemals das des Produkts. Wenn ein Befund ohne Ziel ankommt, frag mich danach, bevor
> du irgendetwas öffnest.
>
> Wenn du eine Entscheidung von mir brauchst, stelle die Frage mit den vier Teilen von UX-28
> (`docs/ANEXO_HEURISTICAS.md`) und in dieser Reihenfolge: die Daten, die die Frage nötig machen,
> aufgelistet; ein Absatz von höchstens fünf Zeilen, der sie verbindet und die Frage sichtbar
> macht; die Frage selbst mit ihren möglichen Antworten durchnummeriert; und deine Empfehlung.
> Sage es in der technischen Tiefe, die das Projekt in `communication_depth` erklärt hat
> —`beginner`, `decision_maker` oder `technical`—; hat das Projekt keine erklärt, nimm
> `decision_maker`.

Was ich hier verlange: dass das Audit zu offenen Posten wird (sonst ist es ein Bericht, der
abgelegt wird), und dass der Widerspruch explizit und mit Beleg erfolgt, nicht stillschweigend.

Und, seit D-080, dass jeder offene Posten im Register seines Ziels eröffnet wird. Der Erbauer ist
der, der die Hände im Produkt hat, also der, der am leichtesten alles ins Register des Produkts
schickt; ein Befund, der ohne Ziel ankommt, wird dich gefragt, bevor irgendetwas eröffnet wird.

## 3. Erwartetes Ergebnis

- `docs/AUDIT_[Datum].md` mit: Umfang, was verifiziert werden konnte und was nicht (und warum),
  den Befunden mit Ort, Risiko, Beleg und Priorität, einer Note pro Dimension, dem Ergebnis der
  Reproduktion von zwei oder drei Belegen aus dem letzten Zyklus, und der Liste der vorgeschlagenen
  offenen Posten.
- In `docs/PENDING.md`: ein offener Posten für jeden P0 und P1, mit Verweis auf den Befund.
- In demselben Bericht die drei Erklärungen, die ein Tor lesen kann, jede mit ihrem Schlüssel auf
  Englisch: `auditor_choice` (welcher Fall zutrifft und wer es entschieden hat),
  `evidence_register_health` (die Zahlen des Registers der Belege, jede mit dem Befehl, der sie
  gemessen hat, und „nicht gemessen“, wenn nicht gemessen werden konnte) und
  `findings_by_destination` (jeder Befund mit seinem Ziel).
- Im Register jedes Ziels: ein offener Posten für jeden P0 und P1. Die des Produkts im Register des
  Produkts, die der Methode in dem der Methode, die des Werkzeugs in dem des Werkzeugs.

## 4. Vollständigkeitsprüfung

- Sagt der Bericht, was er NICHT verifizieren konnte? Wenn er sagt, er habe alles verifiziert, sei
  misstrauisch.
- Wähl zwei Befunde: haben sie Datei und Zeile, und einen Beleg, den du reproduzieren kannst?
- Sagt der Bericht, welche Belege er reproduziert hat, mit dem Befehl und dem Ergebnis, oder sagt
  er nur, er habe sie gelesen?
- Hat jeder P0 seinen offenen Posten, bevor das Audit als abgeschlossen gilt?
- Werden sich die Noten pro Dimension mit dem vorherigen Audit vergleichen lassen?
- Hat derselbe Agent auditiert, der gebaut hat? Wenn ja, verlang einen zweiten Blick auf die P0.
- Sagt der Bericht, wer auditiert hat und warum dieser? Wenn der Grund ist, dass es das einzige
  geladene war oder das einzige, das die Zeitüberschreitung überstand, ist das `tool_constraint`
  und es muss so geschrieben stehen.
- Stehen die Zahlen der Gesundheit des Registers der Belege da, jede mit dem Befehl, der sie
  gemessen hat? Eine Zahl, die nicht gemessen werden konnte, sagt „nicht gemessen“; eine Null, die
  „es gibt keinen“ nicht von „ich konnte nicht hinsehen“ unterscheidet, ist keine Zahl (CQ-19, der
  Nenner).
- Hat jeder Befund ein Ziel, und wurde sein offener Posten im Register dieses Ziels eröffnet?

## 5. Warnsignale

- Das Audit hat keinen einzigen P0 gefunden. In einem System, das älter als drei Monate ist, ist
  das fast nie wahr; wahrscheinlicher ist, dass der Umfang klein war oder der Auditor die Annahmen
  teilte.
- Die Befunde haben keine Dateizeile. Das sind Meinungen, keine Befunde.
- Der Bericht sagt, die Belege „wurden überprüft“, ohne den ausgeführten Befehl oder seine
  Ausgabe zu zeigen. Ein gelesener Beleg und ein reproduzierter Beleg sind nicht dasselbe, und nur
  der zweite schließt den D-033-Einwand.
- Zwei Wochen sind vergangen und die P0 haben immer noch keinen offenen Posten. Das Audit wurde
  abgelegt.
- Der Bericht lobt die Unabhängigkeit des Auditors und sagt nicht, welcher Fall von
  `auditor_choice` zutrifft. Wenn das Werkzeug den Auditor ausgewählt hat und nicht du, ist das
  genau der Fall, den niemand von sich aus hinschreibt.
- Die Gesundheit des Registers der Belege kommt als Null und ohne Befehl zurück. Eine Null ohne den
  Befehl, der sie erzeugt hat, ist ein „ich konnte nicht hinsehen“, als gute Nachricht verkleidet.
- Alle Befunde kamen mit dem Ziel `product` heraus. In einer Kontrolle, die das System mit der
  Methode und dem Werkzeug im Einsatz anschaut, ist es unwahrscheinlich, dass keiner von der
  Methode oder vom Werkzeug ist: wahrscheinlicher ist, dass niemand nach dem Ziel gefragt hat.
