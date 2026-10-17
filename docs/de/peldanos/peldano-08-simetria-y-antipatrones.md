# Schritt 8 — Symmetrie zwischen Produzent und Konsument, und das Anti-Muster-Register (Sprossenvertrag)

**Phase:** Schleife (jede Änderung, die einen Vertrag zwischen zwei Teilen berührt).
**Form:** automatisch in der Schleife; plus eine Datei, die mit jedem Rückschlag wächst.
**Größe:** die Symmetrie ist immer verpflichtend; die Produzent/Konsument-Karte ist in einem
Ein-Modul-Projekt optional und verpflichtend, sobald es einen Bildschirm und einen Server getrennt
gibt.

## Wozu sie dient

Wenn du ein Ende änderst (den Server, den Roboter, das Datenbankschema), muss das andere Ende (der
Bildschirm, der Zähler, der Konsument) im selben Commit mitgeändert werden. Sonst driften sie früher
oder später auseinander, und der Nutzer sieht eine Zahl auf der einen und eine andere auf der
anderen Seite (der Fall 1.355 gegen 1.234). Und die Fehler, die wir schon einmal bezahlt haben,
werden notiert, um sie nicht zweimal zu bezahlen.

Das allgemeine Prinzip dahinter: **jede Liste hat einen einzigen Eigentümer**. Die Spalten einer
Tabelle, die möglichen Zustände eines Auftrags, die Gründe, warum etwas wartet: ein einziger Teil
des Systems (der Produzent) definiert sie, und alle anderen lesen sie von dort. Sobald es zwei
Kopien derselben Liste gibt, ist eine der beiden veraltet; es fehlt nur noch zu wissen, welche.

## 1. Benötigter Kontext

- Eine Karte, welche Teile des Systems was konsumieren: welche Bildschirme welche Dienste lesen,
  welche Prozesse welche Tabellen schreiben. Wenn sie nicht existiert, baut der erste Prompt sie.
- Das Anti-Muster-Register `docs/GOTCHAS.md`, auch wenn es leer ist.

## 2. Prompts

**Zum Bau der Karte (einmal):**

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

Was wir verlangen: das Inventar der Verträge mit ihren beiden Seiten, und die
Vollständigkeitsklausel in ihrer Form für diese Sprosse: was man nicht sieht, wird erklärt, nicht
weggelassen. Eine Karte mit verdeckten Lücken ist schlimmer als keine Karte.

**Routine (gehört in die Arbeitsvereinbarung):**

> Before closing any change that touches a contract, look up every consumer in the map and
> update them in the same commit. Always prefer that the producer defines the list (columns,
> causes, states) and the consumer reads it, rather than each keeping its own copy. If the map
> does not have that relationship, add it.

Was wir verlangen: die Symmetrie als Reflex (die andere Seite suchen, bevor geschlossen wird), die
Regel der Liste mit einem einzigen Eigentümer, und dass die Karte sich beim Gebrauch selbst pflegt.

**Wenn etwas zum zweiten Mal bricht:**

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

Was wir verlangen: das feste Format eines Anti-Musters (Geruch, Grundursache, Behebung, frühe
Erkennung) und, am wichtigsten, die automatische Prüfung: ein notiertes, aber nicht automatisiertes
Anti-Muster wiederholt sich, wenn die Person oder die Sitzung wechselt.

## 3. Erwartetes Ergebnis

- `docs/PRODUCER_CONSUMER_MAP.md`: die Liste der Verträge mit Produzent und Konsumenten.
- In jedem Commit, der einen Vertrag berührt: die aktualisierten Konsumenten, in der Nachricht
  benannt.
- `docs/GOTCHAS.md`: ein Eintrag pro Anti-Muster, mit den vier Teilen (Geruch, Grundursache,
  Behebung, wie man es vorher erkennt), und dem Datum des ersten Mals.

## 4. Vollständigkeitsprüfung

- Wähle einen Vertrag aus der Karte und bitte den Agenten, dir zu zeigen, wo jeder Konsument ihn
  liest. Wenn einer seine eigene Kopie der Liste hat, gibt es Schuld.
- Gibt es eine Zahl, die auf zwei verschiedenen Bildschirmen angezeigt wird? Vergleiche: sind sie
  gleich?
- Hat jeder GOTCHAS-Eintrag die vier Teile?
- Hat sich ein Fehler wiederholt, der schon in GOTCHAS stand? Wenn ja, fehlt die automatische
  Prüfung.

## 5. Warnsignale

- Derselbe Wert steht von Hand getippt in mehr als einer Datei („AUSSTEHEND“, „GENEHMIGT“ im Server
  und im Bildschirm). Zwei Kopien; eine wird abdriften.
- Eine Serveränderung wurde mit grünem Servertest geschlossen und niemand hat den Bildschirm
  angefasst.
- GOTCHAS hat Einträge ohne den Teil „wie man es vorher erkennt“. Das sind Anekdoten, keine
  Anti-Muster.
