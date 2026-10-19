# Schritt 20 — Monitoring von Ressourcen, Funktionen und Abfragen außerhalb des Bereichs, mit zyklischem Bericht (Schrittvertrag)

**Abschnitt:** Betriebsqualität, nach dem ersten Deployment in die Produktion.
**Wann:** er wird in der Betriebsphase aufgebaut, in derselben Woche wie das erste Deployment in
die Produktion, mit den Schwellenwerten aus der 19 und den Metriken aus der 16; von da an läuft
er allein, und der zyklische Bericht wird in jedem Zyklus mit dem Eigentümer gelesen (wöchentlich
in einem System mit Konsequenzen, monatlich in einem kleinen). Jedes Ereignis außerhalb des
Bereichs tritt als korrektiver offener Posten in die Schleife ein. In einem Altsystem genauso, mit
einem Unterschied: die erste Lesung des Berichts ist die Basislinie, und was am ersten Tag schon
außerhalb des Bereichs lag, wird zu offenen Posten mit ihrer Geschwindigkeitsmarke.
**Form:** ein einziger Durchgang zum Aufbauen; danach zyklische Routine.
**Größe:** minimal in einem kleinen Projekt (ein monatlicher Bericht, ein Alarm für die Platte und
einer für Datenbankfehler); vollständig in einem mit Konsequenzen (Schwellenwerte pro Funktion
und pro Abfrage, Alarme, wöchentlicher Bericht).

## Wozu er dient

Die Tests aus Schritt 19 sagen, wie sich das System an einem Tag verhält, mit einer Last, die ich
gewählt habe. Die Produktion ist jeden Tag, mit der Last, die die Nutzer wählen, mit wachsenden
Daten und mit Änderungen, die jede Woche hereinkommen. Was im Oktober im Bereich lag, liegt im
März außerhalb, ohne dass jemand etwas geändert hat, nur weil die Tabelle gewachsen ist. Diesen
Schritt gibt es, damit man das sieht, **bevor der Nutzer es sieht**: die Ressourcennutzung gegen
die Kapazität, die Antwortzeit jeder Funktion, jedes Endpunkts, jeder Aufgabe und jeder Abfrage,
verglichen mit den Schwellenwerten aus der 19 und mit ihrer eigenen Geschichte; ein Alarm, wenn
etwas aus dem Bereich läuft; und ein zyklischer Bericht, den ich mit dem Eigentümer lese und in
dem jede Abweichung eine Ursache oder einen offenen Posten hat. Die auf das Gemessene gezurrte
Obergrenze [Ref. 37](../REFERENCIAS.md#ref-37) ist der Grundgedanke: der Bereich ist keine Meinung,
er ist die gemessene Zahl plus ein Spielraum; und das Kontingent der Continuous Integration, das
verbrannte, ohne dass jemand hinsah [Ref. 39](../REFERENCIAS.md#ref-39), ist der Fehler, den er
verhindert: eine Ressource, die sich ohne Monitoring verbraucht, wird entdeckt, wenn sie alle
ist.

Zwei Regeln, über die ich nicht verhandle. Ein Alarm, der auslöst und den niemand liest, ist ein
Defekt des Alarms, nicht dessen, der ihn nicht gelesen hat: er wird justiert oder entfernt. Und
ein Schwellenwert wird nicht ohne eine geschriebene, gemessene Begründung angehoben, um einen
Alarm zum Schweigen zu bringen.

**Wenn du Anfänger bist.** *Monitoren* heißt, das System die ganze Zeit maschinell anzusehen und
zu melden, wenn etwas aus dem Normalen läuft. Die *Ressourcen* sind das, was das System
verbraucht: Prozessor, Speicher, Platte, Verbindungen zur Datenbank, und auch Kontingente
externer Dienste (wie viele Nachrichten pro Monat dich der Anbieter senden lässt). „*Außerhalb
des Bereichs*“ heißt über einem *Schwellenwert* (einer festen Grenze, die aus den Tests von
Schritt 19 kam) oder sehr verschieden von der *Basislinie* (dem, was dieselbe Zahl in den letzten
Tagen ergeben hat). Ein *Alarm* ist die Meldung im Moment; der *zyklische Bericht* ist die
Zusammenfassung, die man jede Woche oder jeden Monat in Ruhe liest.

## 1. Benötigter Kontext

Was folgt, ist die generische Liste. Die konkreten Dateien, die du vor jedem Prompt fertig haben
musst, mit ihrem Inhalt und ihrem Mindestzustand, stehen in Abschnitt 2, in dem Block „Bevor du
den Prompt schickst“, der jedem einzelnen vorangeht.

- Die Beobachtbarkeit (16): die Metriken und die Logs, von denen es sich ernährt.
- Die Schwellenwerte aus der 19 und die Budgets aus der 17.
- Die deployte Produktion (13), mit nur lesendem Zugang für das Monitoring.
- Der Alarmkanal und der Zyklus des Berichts: die entscheidest du mit dem Eigentümer.

## 2. Prompts

**Zu Beginn (aufbauen und beweisen):**

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- `docs/OBSERVABILITY.md` (16) und `docs/PERFORMANCE.md` (19), abgeschlossen: die Metriken und die
  Schwellenwerte.
- `docs/PERSISTENCE.md` (17) mit den Budgets pro Pfad.
- Der Alarmkanal, mit dem Eigentümer entschieden: bei wem er ankommt, worüber (E-Mail,
  Messenger), und wer ihn zu welcher Uhrzeit liest. Ein Alarm, der in einem Postfach ankommt, das
  niemand öffnet, ist Dekoration.
- Der Zyklus des Berichts: wöchentlich oder monatlich, und wer ihn mit dir liest.
- Nur lesender Zugang des Monitorings zur Produktion (dem Server, der Datenbank, den Logs), mit
  dem Zugangsschlüssel außerhalb des Chats.
- Der Prozentsatz der Abweichung von der Basislinie, den du als Alarm ansiehst (zum Beispiel 30 %
  mehr als der Durchschnitt der letzten vierzehn Tage), für die Lücke im Prompt.
- Akzeptabler Mindestzustand: es gibt geschriebene Schwellenwerte, einen Kanal mit einer Person,
  die ihn liest, und einen Zyklus.

> We are going to keep this system watched in production. Using the metrics and logs of step 16,
> the budgets of `docs/PERSISTENCE.md` and the thresholds of `docs/PERFORMANCE.md`, set up: (1)
> collection of resource usage (CPU, memory, disk, database connections, queue sizes, external
> quotas) and of the response time of every function, endpoint, job and query, with the
> correlation id, kept with a history; (2) alerts when any of them is out of range: above the
> thresholds, or more than [X] percent over the baseline of the last [N] days, sent to [channel],
> with the rule that an alert that fires without a human reading it is a defect of the alert and
> gets fixed or removed; (3) a cyclic report, [weekly], generated automatically, with: resource
> usage against capacity and its trend, the slowest functions and queries and how they moved
> against the previous period, every out-of-range event with its cause if known, and what you
> propose for each; (4) the rule that every out-of-range event becomes a corrective pending item
> with the measured number as its acceptance criterion, closed with the full routine. Nothing
> here may read or store personal data. Show me the first report generated on real data from the
> test environment, and one alert fired on purpose by exceeding a threshold. Document the
> thresholds, the channel, the cycle and how to silence an alert with a written reason in
> `docs/MONITORING.md`. Reply in my language.

> [de]
> Wir werden dieses System in der Produktion unter Beobachtung halten. Bau mit den Metriken und
> den Logs aus Schritt 16, den Budgets von `docs/PERSISTENCE.md` und den Schwellenwerten von
> `docs/PERFORMANCE.md` auf: (1) die Erfassung der Ressourcennutzung (CPU, Speicher, Platte,
> Verbindungen zur Datenbank, Größe der Warteschlangen, externe Kontingente) und der Antwortzeit
> jeder Funktion, jedes Endpunkts, jeder Aufgabe und jeder Abfrage, mit der Korrelations-ID, mit
> Geschichte aufbewahrt; (2) Alarme, wenn eines davon aus dem Bereich läuft: über den
> Schwellenwerten, oder mehr als [X] Prozent über der Basislinie der letzten [N] Tage, gesendet an
> [Kanal], mit der Regel, dass ein Alarm, der auslöst, ohne dass ein Mensch ihn liest, ein Defekt
> des Alarms ist und repariert oder entfernt wird; (3) einen zyklischen Bericht, [wöchentlich],
> automatisch erzeugt, mit: Ressourcennutzung gegen Kapazität und ihrem Trend, den langsamsten
> Funktionen und Abfragen und wie sie sich gegenüber dem vorigen Zeitraum bewegt haben, jedem
> Ereignis außerhalb des Bereichs mit seiner Ursache, falls bekannt, und dem, was du für jedes
> vorschlägst; (4) die Regel, dass jedes Ereignis außerhalb des Bereichs zu einem korrektiven
> offenen Posten mit der gemessenen Zahl als Abnahmekriterium wird, geschlossen mit der
> vollständigen Routine. Nichts davon darf personenbezogene Daten lesen oder speichern. Zeig mir
> den ersten Bericht, erzeugt mit echten Daten aus der Testumgebung, und einen Alarm, der
> absichtlich durch das Überschreiten eines Schwellenwerts ausgelöst wurde. Dokumentiere die
> Schwellenwerte, den Kanal, den Zyklus und wie man einen Alarm mit einer geschriebenen Begründung
> stummschaltet, in `docs/MONITORING.md`. Antworte in meiner Sprache.

Was ich hier verlange: Erfassung mit Geschichte (ohne Geschichte gibt es keine Basislinie, und
ohne Basislinie gibt es kein „außerhalb des Bereichs“); Alarme gegen zwei Referenzen, den
absoluten Schwellenwert aus der 19 und die relative Abweichung von der eigenen Geschichte; den
zyklischen Bericht in der Form eines Berichts aus Schritt 10 (jede Abweichung mit Ursache oder
mit Vorschlag, nichts von „alles normal“); die Verwandlung jeder Abweichung in einen offenen
Posten mit Zahl; und die zwei Beweise: den ersten Bericht und einen provozierten Alarm.

**Routine jedes Zyklus (gehört in die Arbeitsvereinbarung):**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- Den gerade erzeugten zyklischen Bericht, und eine halbe Stunde von dir mit dem Eigentümer, um
  ihn zu lesen.
- `docs/MONITORING.md` zur Hand, um die Schwellenwerte zu vergleichen.
- Akzeptabler Mindestzustand: du hast den Bericht gelesen, bevor du den Prompt eingefügt hast;
  der Agent liest ihn nicht für dich.

> With every cyclic report of resources and performance: go through it with me, event by event;
> tell me which out-of-range events become pending items now and which can wait, with your
> reason; write the decision with the date in the report itself; and tell me whether any threshold
> must change and why, with the measurement that justifies it. Never raise a threshold to silence
> an alert without a measured reason written down.

> [de]
> Mit jedem zyklischen Bericht über Ressourcen und Leistung: geh ihn mit mir durch, Ereignis für
> Ereignis; sag mir, welche Ereignisse außerhalb des Bereichs jetzt zu offenen Posten werden und
> welche warten können, mit deiner Begründung; schreib die Entscheidung mit dem Datum in den
> Bericht selbst; und sag mir, ob irgendein Schwellenwert sich ändern muss und warum, mit der
> Messung, die es rechtfertigt. Heb niemals einen Schwellenwert an, um einen Alarm zum Schweigen
> zu bringen, ohne eine gemessene, geschriebene Begründung.

Was ich hier verlange: dass der Bericht gelesen wird und entschieden wird, mit Spur; und die
Regel des Schwellenwerts, die verhindert, dass das Monitoring nach und nach stumm wird.

## 3. Erwartetes Ergebnis

- Erfassung von Ressourcen und Antwortzeiten mit Geschichte, ohne personenbezogene Daten.
- Alarme nach Schwellenwert und nach Abweichung, an einen Kanal, den eine Person liest.
- Der zyklische Bericht, allein erzeugt, mit jeder Abweichung begründet oder mit Vorschlag.
- `docs/MONITORING.md` mit Schwellenwerten, Kanal, Zyklus und der Art, einen Alarm mit einer
  geschriebenen Begründung stummzuschalten.
- Die Routine in der Vereinbarung; die Abweichungen als korrektive offene Posten.

## 4. Vollständigkeitsprüfung

- Lass absichtlich einen Schwellenwert in der Testumgebung überschreiten: ist der Alarm bei dir
  angekommen, über den vereinbarten Kanal, mit der Kennung?
- Lies den letzten Bericht: hat jedes Ereignis außerhalb des Bereichs eine Ursache oder einen
  Vorschlag? Ist eines ohne irgendetwas geblieben?
- Gibt es einen offenen Posten für jede Abweichung, die du angehen wolltest, mit der Zahl als
  Kriterium?
- Ist seit der 19 irgendein Schwellenwert angehoben worden? Mit welcher geschriebenen Begründung?
- Erwähnt der Bericht das Kontingent der externen Dienste (Messenger, Continuous Integration)?

## 5. Warnsignale

- Die Alarme lösen jeden Tag aus und niemand liest sie. Man muss ihre Zahl senken, bis jeder
  einzelne etwas bedeutet, und sich nicht an sie gewöhnen.
- Der Bericht sagt drei Zyklen hintereinander „alles normal“. Entweder hat das System keine
  Nutzer, oder der Bericht sieht sich nicht das an, was zählt.
- Ein Schwellenwert wurde angehoben, „damit er aufhört zu melden“. Das ist Schritt 20, der still
  stirbt.
- Das Monitoring speichert personenbezogene Daten, „um diagnostizieren zu können“. Das ist ein
  Datenabfluss mit Uhrzeit.
