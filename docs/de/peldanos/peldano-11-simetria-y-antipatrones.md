# Schritt 11 — Symmetrie zwischen Produzent und Konsument, und das Register der Anti-Muster (Schrittvertrag)

**Abschnitt:** Schleife.
**Wann:** mit jedem offenen Posten, der einen Vertrag zwischen zwei Teilen des Systems berührt. Die
Vertragskarte wird beim Öffnen des zweiten Funktionsblocks gebaut, wenn es schon Bildschirm und
Server gibt. Das Register der Anti-Muster wächst jedes Mal, wenn etwas zum zweiten Mal bricht.
**Form:** automatisch innerhalb der Schleife; plus eine Datei, die mit jedem Rückschlag wächst.
**Größe:** die Symmetrie ist immer verpflichtend; die Produzent/Konsument-Karte ist in einem
Projekt mit einem einzigen Modul optional und verpflichtend, sobald es einen Bildschirm und einen
Server getrennt gibt.

## Wozu er dient

Wenn du ein Ende änderst (den Server, den Roboter, das Datenbankschema), sorg dafür, dass das
andere Ende (der Bildschirm, der Zähler, der Konsument) sich im selben Commit ändert. Sonst
driften sie früher oder später auseinander, und der Nutzer sieht auf der einen Seite eine Zahl und
auf der anderen eine andere [Ref. 26](../REFERENCIAS.md#ref-26). Und die Fehler, die du schon
einmal bezahlt hast, schreib auf, um sie nicht zweimal zu bezahlen
[Ref. 2](../REFERENCIAS.md#ref-2).

Das allgemeine Prinzip dahinter, das ich bei der Krankenkasse durchgesetzt habe und das für jedes
System gilt [Ref. 27](../REFERENCIAS.md#ref-27): **jede Liste hat einen einzigen Eigentümer**. Die
Spalten einer Tabelle, die möglichen Zustände eines Auftrags, die Gründe, warum etwas wartet: ein
einziger Teil des Systems (der Produzent) definiert sie, und alle anderen lesen sie von dort.
Sobald es zwei Kopien derselben Liste gibt, ist eine veraltet; man weiß nur noch nicht, welche.
Der semantische Baum von Schritt 2 ist der erste Ort, an dem diese Listen deklariert werden: die
Zustände einer Entität stehen dort, und der Code muss sie aus einer einzigen Quelle lesen.

## 1. Benötigter Kontext

Was folgt, ist die generische Liste. Die konkreten Dateien, die du vor jedem Prompt fertig haben
musst, mit ihrem Inhalt und ihrem Mindestzustand, stehen in Abschnitt 2, in dem Block „Bevor du
den Prompt schickst“, der jedem einzelnen vorangeht.

- Eine Karte, welche Teile des Systems was konsumieren: welche Bildschirme welche Dienste lesen,
  welche Prozesse welche Tabellen schreiben. Wenn sie nicht existiert, baut der erste Prompt sie.
- Das Register der Anti-Muster `docs/GOTCHAS.md`, auch wenn es leer ist.

## 2. Prompts

**Zum Bauen der Karte (einmal):**

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- Das System mit mindestens einem gebauten Funktionsblock: ohne Verträge zwischen Teilen gibt es
  keine Karte zu machen.
- `docs/SEMANTIC_TREE.md` aktuell: die Listen (Zustände, Typen, Ursachen) sind dort deklariert,
  und die Karte muss mit dem Baum übereinstimmen.
- Eine von dir geschriebene Liste der Teile, die außerhalb des Repositorys leben und etwas vom
  System erzeugen oder verbrauchen (ein Roboter, eine Tabelle, die die Datenbank liest, ein
  Prozess eines anderen Teams), damit der Agent sie in die Karte aufnimmt, auch wenn er sie nicht
  sieht. Wenn es keine gibt, sag es.
- Akzeptabler Mindestzustand: der Agent kann das ganze Repository lesen, und du hast ihm gesagt,
  was es draußen gibt.

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

> [de]
> Baue `docs/PRODUCER_CONSUMER_MAP.md`: für jeden Vertrag im System (einen Dienst, eine Tabelle,
> ein Dateiformat, eine Werteliste), wer ihn produziert und wer ihn konsumiert. Wenn es Teile des
> Systems gibt, auf die du nicht zugreifen kannst oder die du nicht verstehst, sag es mir, statt
> sie aus der Karte wegzulassen. Antworte in meiner Sprache.

Was ich hier verlange: das Inventar der Verträge mit ihren zwei Seiten, und die
Vollständigkeitsklausel in ihrer Form für diesen Schritt: was nicht gesehen wird, wird erklärt,
nicht weggelassen. Eine Karte mit versteckten Löchern ist schlimmer als keine Karte.

**Routine (gehört in die Arbeitsvereinbarung):**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- `docs/PRODUCER_CONSUMER_MAP.md`, gebaut und von dir geprüft: such dir einen Vertrag aus und
  prüfe, dass die beiden Seiten die sind, die du kennst.
- `docs/WORKING_AGREEMENT.md`, wo die Routine hinkommt.
- Akzeptabler Mindestzustand: die Karte existiert und hat mindestens die Verträge des ersten
  Blocks.

> Before closing any change that touches a contract, look up every consumer in the map and
> update them in the same commit. Always prefer that the producer defines the list (columns,
> causes, states) and the consumer reads it, rather than each keeping its own copy. If the map
> does not have that relationship, add it.

> [de]
> Bevor du eine Änderung schließt, die einen Vertrag berührt, such in der Karte jeden Konsumenten
> und aktualisiere sie im selben Commit. Bevorzuge immer, dass der Produzent die Liste definiert
> (Spalten, Gründe, Zustände) und der Konsument sie liest, statt dass jeder seine eigene Kopie
> hält. Wenn die Karte diese Beziehung nicht hat, füge sie hinzu.

Was ich hier verlange: die Symmetrie als Reflex (die andere Seite suchen, bevor geschlossen
wird), die Regel der Liste mit einem einzigen Eigentümer, und dass die Karte sich von selbst
pflegt, während sie benutzt wird.

**Wenn etwas zum zweiten Mal bricht:**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- Der Beleg, dass es das zweite Mal ist: der offene Posten oder der Commit vom ersten Mal, von dir
  aufgespürt (such in den geschlossenen offenen Posten von `docs/PENDING.md`), um ihn zusammen mit
  dem Prompt einzufügen. Ohne diesen Verweis wird der Agent ein generisches Anti-Muster
  festhalten, das zum Erkennen von gar nichts taugt.
- `docs/GOTCHAS.md`, angelegt, und sei sie leer, mit dem Format in der Kopfzeile: Geruch,
  Grundursache, Behebung, wie man es vorher erkennt.
- Akzeptabler Mindestzustand: du kannst das erste Mal mit Datum oder mit der Nummer des offenen
  Postens benennen.

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

> [de]
> Das ist uns schon einmal passiert. Halte es in `docs/GOTCHAS.md` fest mit: wie es riecht (das
> frühe Zeichen), der Grundursache, der Behebung, und wie man es nächstes Mal erkennt, bevor es
> wehtut. Und füge, wenn möglich, einen Test oder eine automatische Prüfung hinzu, die es erkennt.

Was ich hier verlange: das feste Format eines Anti-Musters (Geruch, Grundursache, Behebung,
Früherkennung) und vor allem die automatische Prüfung: ein notiertes, aber nicht automatisiertes
Anti-Muster wird sich wiederholen, wenn die Person oder die Sitzung wechselt.

## 3. Erwartetes Ergebnis

- `docs/PRODUCER_CONSUMER_MAP.md`: die Liste der Verträge mit Produzent und Konsumenten.
- In jedem Commit, der einen Vertrag berührt: die Konsumenten aktualisiert, in der Nachricht
  benannt.
- `docs/GOTCHAS.md`: ein Eintrag pro Anti-Muster, mit den vier Teilen (Geruch, Grundursache,
  Behebung, wie man es vorher erkennt), und dem Datum des ersten Mals.

## 4. Vollständigkeitsprüfung

- Wähl einen Vertrag aus der Karte und bitte den Agenten, dir zu zeigen, wo jeder Konsument ihn
  liest. Wenn einer seine eigene Kopie der Liste hat, gibt es Schulden.
- Gibt es eine Zahl, die auf zwei verschiedenen Bildschirmen gezeigt wird? Vergleich: stimmen sie
  überein?
- Hat jeder Eintrag in GOTCHAS die vier Teile?
- Hat sich ein Fehler wiederholt, der schon in GOTCHAS stand? Wenn ja, fehlt die automatische
  Prüfung.

## 5. Warnsignale

- Derselbe Wert steht von Hand geschrieben in mehr als einer Datei („AUSSTEHEND“, „GENEHMIGT“ im
  Server und im Bildschirm). Zwei Kopien; eine wird abweichen.
- Eine Änderung am Server wurde mit grünem Servertest geschlossen und niemand hat den Bildschirm
  angefasst.
- GOTCHAS hat Einträge ohne den Teil „wie man es vorher erkennt“. Das sind Anekdoten, keine
  Anti-Muster.
