# Schritt 17 — Optimierung der Persistenzschicht, vorher und nachher gemessen (Schrittvertrag)

**Abschnitt:** Betriebsqualität, vor dem ersten Deployment in die Produktion.
**Wann:** in der Phase der Produktionsfreigabe, nach der 16 (man muss die Abfragen sehen können,
um sie zu messen) und vor der 19 (die Lasttests laufen auf der bereits optimierten Persistenz;
sonst messen sie das Problem, das man schon kannte). Er wiederholt sich, wenn ein Block eine
große Tabelle hinzufügt oder einen kritischen Fluss ändert, und wenn das Monitoring (20) eine
Abfrage außerhalb des Bereichs zeigt. In einem Altsystem stammen die Messungen aus N6, und das
meiste von dem, was man findet, wird „beim Anfassen“ bezahlt, außer dem, was schon außerhalb des
Bereichs liegt.
**Form:** zwei Durchgänge: messen und vorschlagen; anwenden mit Vorher und Nachher.
**Größe:** proportional: in einem kleinen Projekt die Indizes der echten Abfragen und das Ende der
N+1-Schleifen; in einem mit Konsequenzen vollständig, mit Budgets pro Pfad.

## Wozu er dient

Die Persistenzschicht ist der Ort, an dem Systeme langsam sterben: sie laufen gut mit hundert
Datensätzen, annehmbar mit zehntausend, und bei hunderttausend braucht jeder Bildschirm zwanzig
Sekunden, und niemand weiß, wann das angefangen hat. Diesen Schritt gibt es, damit das mit Zahlen
und vor der Produktion entschieden wird, nicht mit Beschwerden und danach. Und damit es **mit der
Methode von Schritt 9** entschieden wird: jede Abfrage, die das System macht, wird mit einem
Messgerät gezählt und gestoppt, das einen Test hat, es wird geändert, was die Zahlen sagen, und
es wird auf denselben Daten noch einmal gemessen. Das erste Audit der Abfragen ohne Index auf
einem lebenden System [Ref. 18](../REFERENCIAS.md#ref-18) und das auf das Gemessene gezurrte
Abfragebudget [Ref. 37](../REFERENCIAS.md#ref-37) sind der Ursprung dieses Schritts; die
Entscheidung für die asynchrone Schnittstelle ab Zeile eins
[Ref. 15](../REFERENCIAS.md#ref-15), sein Vorläufer beim Start.

Was er nicht ist: er ist nicht „den Datenzugriff neu schreiben“ und auch nicht eine andere
Datenbank wählen. Das hat Schritt 3 entschieden. Er ist das Justieren dessen, was da ist (Indizes,
Paginierung, Stapel, Retention, Größe des Verbindungspools), ausgehend von dem, was die echten
Abfragen tun.

**Wenn du Anfänger bist.** Die *Persistenzschicht* ist der Teil des Systems, der die Daten
speichert und liest, fast immer eine Datenbank. Ein *Index* ist wie das Register eines Buches:
ohne ihn liest die Datenbank die ganze Tabelle, um einen Termin zu finden (das ist ein *Full
Scan*); mit ihm geht sie direkt hin. Eine *N+1-Schleife* ist ein sehr häufiger Fehler: um hundert
Termine anzuzeigen, macht das System eine Abfrage für die Liste und danach hundert weitere
Abfragen, eine pro Termin, statt einer einzigen. *Paginierung* heißt, immer zwanzig auf einmal zu
zeigen statt alles zusammen. *Retention* ist, wie lange jedes Datum aufbewahrt wird, bevor es
archiviert oder gelöscht wird. Und der *Verbindungspool* ist die Anzahl der „offenen Leitungen“,
die das System gleichzeitig zur Datenbank hat. Nichts davon verlangt, dass du Code liest: es
verlangt, dass du Zahlen vorher und nachher ansiehst.

## 1. Benötigter Kontext

Was folgt, ist die generische Liste. Die konkreten Dateien, die du vor jedem Prompt fertig haben
musst, mit ihrem Inhalt und ihrem Mindestzustand, stehen in Abschnitt 2, in dem Block „Bevor du
den Prompt schickst“, der jedem einzelnen vorangeht.

- Die Dimensionierung und die Mengen (Schritt 3, oder N6 in einem Altsystem): die Volumina, bei
  denen gemessen werden muss.
- Die Produzenten-Konsumenten-Karte (Schritt 8): was jede Tabelle konsumiert.
- Die Beobachtbarkeit (16): jede Abfrage mit ihrer Zeit sichtbar.
- Die Testumgebung, geladen mit Daten im erwarteten Volumen.

## 2. Prompts

**Zu Beginn (messen und vorschlagen):**

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- `docs/SIZING.md` und `docs/VOLUME_SURVEY.md` (Schritt 3 oder N6), abgeschlossen: die zu ladenden
  Volumina.
- Die Testumgebung mit Daten **im erwarteten Volumen**, nicht mit zehn Beispieldatensätzen. Wenn
  es ein Vorgängersystem oder eine Produktion gibt, eine anonymisierte Kopie; wenn es ein neues
  Projekt ist, verlang vom Agenten, dass er synthetische Daten in der Form des semantischen Baums
  und mit den Volumina der Dimensionierung erzeugt und das als Skript im Repository hinterlässt.
  Das ist ein vorheriger offener Posten, nicht Teil dieses Prompts.
- `docs/PRODUCER_CONSUMER_MAP.md` (Schritt 8), auf dem neuesten Stand.
- Wenn es eine Produktion gibt: nur lesender Zugang, mit dem Zugangsschlüssel außerhalb des Chats,
  um zusätzlich zu den Testdaten auf echten Daten zu messen.
- Ein bekannter Fall für den Test jedes Messgeräts (eine Tabelle, deren Zeilenzahl du kennst).
- Akzeptabler Mindestzustand: die Testumgebung hat die Volumina der Dimensionierung, und der Agent
  kann jede Abfrage mit ihrer Zeit sehen (Schritt 16).

> We are going to optimize the persistence layer with measurements, not opinions. Read
> `docs/SIZING.md`, `docs/VOLUME_SURVEY.md` and `docs/PRODUCER_CONSUMER_MAP.md`. With the test
> environment loaded at the volumes of the sizing (and, if I gave you access, production
> read-only), measure first, with meters that live in the repository and have a test against a
> known case: every query the system runs per screen and per job, with its count and its time;
> the queries that read whole tables; the ones that run once per item; the size and monthly growth
> of every table; the connection pool usage at the peak. Audit each meter in both directions. Show
> me the numbers with the commands that produce them. Then propose, query by query, what to
> change: indexes derived from the real queries, pagination, batching, the elimination of N+1
> loops, retention and archiving per table, pool size; for each change, the expected gain, the
> risk, and which consumers in the map it touches. Do not change anything yet: I approve the list.
> Reply in my language.

> [de]
> Wir werden die Persistenzschicht mit Messungen optimieren, nicht mit Meinungen. Lies
> `docs/SIZING.md`, `docs/VOLUME_SURVEY.md` und `docs/PRODUCER_CONSUMER_MAP.md`. Mit der
> Testumgebung, geladen mit den Volumina der Dimensionierung (und, wenn ich dir Zugang gegeben
> habe, der Produktion nur lesend), miss zuerst, mit Messgeräten, die im Repository leben und
> einen Test gegen einen bekannten Fall haben: jede Abfrage, die das System pro Bildschirm und pro
> Aufgabe macht, mit ihrer Anzahl und ihrer Zeit; die Abfragen, die ganze Tabellen lesen; die, die
> einmal pro Element laufen; die Größe und das monatliche Wachstum jeder Tabelle; die Nutzung des
> Verbindungspools in der Spitze. Auditiere jedes Messgerät in beide Richtungen. Zeig mir die
> Zahlen mit den Befehlen, die sie erzeugen. Schlag dann, Abfrage für Abfrage, vor, was zu ändern
> ist: Indizes, abgeleitet aus den echten Abfragen, Paginierung, Stapelverarbeitung, die
> Beseitigung der N+1-Schleifen, Retention und Archivierung pro Tabelle, Größe des Pools; für jede
> Änderung den erwarteten Gewinn, das Risiko, und welche Konsumenten der Karte sie berührt. Ändere
> noch nichts: ich gebe die Liste frei. Antworte in meiner Sprache.

Was ich hier verlange: messen mit der Methode von Schritt 9 (Messgerät mit Test, in beide
Richtungen auditiert, Zahl mit Befehl), bevor vorgeschlagen wird; Abfrage für Abfrage
vorschlagen, mit dem Gewinn und dem Risiko, und mit den Konsumenten der Karte, die jede Änderung
berührt (ein neuer Index berührt niemanden; eine Retention pro Tabelle berührt alle, die diese
Tabelle lesen); und **nichts ändern, bis ich zustimme**, denn die Optimierung ist der Ort, an dem
am meisten „verbessert“ wird, was niemand verlangt hat.

**Zum Abschluss (anwenden, mit Vorher und Nachher):**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- Die Liste der vorgeschlagenen Änderungen, gelesen, mit deiner Zustimmung oder Ablehnung zu jeder
  einzelnen; die abgelehnten mit einer Begründung in einer Zeile. Für die, die Konsumenten der
  Karte berühren, die Bestätigung, dass du verstehst, was sich für sie ändert.
- Eine von Hand nachgerechnete Zahl aus der Messung (Zeilen pro Monat der größten Tabelle zum
  Beispiel), die übereinstimmt.
- Akzeptabler Mindestzustand: jede Änderung hat ein Urteil, und du verstehst, welchen Konsumenten
  sie berührt.

> Apply the approved changes [list], one commit each. For each one show me the meter before and
> after on the same data, the regression suite green, and the end-to-end suite green. Set a budget
> per critical path (queries and time) at the measured value plus a small margin, protected by a
> test that fails if it is exceeded. Update every consumer in the map that a change touches, in
> the same commit. Record the before and after table, the budgets and the retention per table in
> `docs/PERSISTENCE.md`.

> [de]
> Wende die freigegebenen Änderungen [Liste] an, ein Commit pro Stück. Zeig mir für jede das
> Messgerät vorher und nachher auf denselben Daten, die Regression in Grün und die
> Ende-zu-Ende-Batterie in Grün. Setz ein Budget pro kritischem Pfad (Abfragen und Zeit) auf den
> gemessenen Wert plus einen kleinen Spielraum, geschützt durch einen Test, der fehlschlägt, wenn
> es überschritten wird. Aktualisiere im selben Commit jeden Konsumenten der Karte, den eine
> Änderung berührt. Halt die Tabelle von Vorher und Nachher, die Budgets und die Retention pro
> Tabelle in `docs/PERSISTENCE.md` fest.

Was ich hier verlange: ein Commit pro Änderung, damit das Vorher und das Nachher zuordenbar sind;
dasselbe Messgerät auf denselben Daten (wenn sich die Daten ändern, sagt die Zahl nichts); das
Budget mit Test, das verhindert, dass die N+1-Schleife in drei Monaten zurückkommt; und die
Symmetrie von Schritt 8, angewandt auf die Persistenz.

## 3. Erwartetes Ergebnis

- Die Messgeräte für Abfragen im Repository, mit Test.
- `docs/PERSISTENCE.md` mit der Tabelle von Vorher und Nachher pro Änderung, den Budgets pro Pfad
  und der Retention pro Tabelle.
- Die Indizes, die Paginierung, die Stapel und die Retention angewandt, ein Commit pro Stück, mit
  der Regression und der Ende-zu-Ende-Batterie in Grün.
- Ein Test pro Budget, der fehlschlägt, wenn es überschritten wird.

## 4. Vollständigkeitsprüfung

- Lass selbst ein Messgerät vorher und nachher laufen (der Agent gibt dir beide Befehle):
  stimmen sie mit der Tabelle überein?
- Gibt es irgendeine Abfrage, die in einem kritischen Fluss eine ganze Tabelle liest? Warum ist
  sie geblieben?
- Hat jede Tabelle eine geschriebene Retention-Regel, und sei es „für immer“?
- Haben die Budgets einen Test? Verlang von ihm, eines absichtlich zu überschreiten und dir das
  Rot zu zeigen.
- Braucht der langsamste Bildschirm, mit den Daten im Volumen, so lange, wie es die Dimensionierung
  erwartet hat?

## 5. Warnsignale

- Die Messungen wurden mit den Beispieldaten des Skeletts gemacht. Mit zehn Zeilen ist alles
  schnell.
- Der Agent schlägt vor, „auf eine andere Datenbank zu migrieren“ oder „die Datenschicht neu zu
  schreiben“. Das ist Schritt 3, und wenn man dorthin zurück muss, ist das deine Entscheidung,
  keine Optimierung.
- Die Zahl hat sich verbessert, aber die Ende-zu-Ende-Prüfung eines Flusses geht nicht mehr durch.
  Ein Index bricht keinen Fluss; eine Retention oder eine Paginierung schon: da fehlte ein
  Konsument der Karte.
- Es gibt keine Budgets. Ohne Budget hält die Optimierung bis zum nächsten Block.
