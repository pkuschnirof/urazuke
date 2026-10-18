# Schritt 5 — Der Plan sind die offenen Posten: die detaillierte Spezifikation lebt in jedem einzelnen (Schrittvertrag)

**Abschnitt:** Schleife.
**Wann:** das Register wird beim Öffnen des ersten Funktionsblocks angelegt, sobald der Start
abgeschlossen ist; jeder neue Block beginnt damit, die Anfrage des Kunden in spezifizierte offene
Posten zu verwandeln; die Routine wird in jeder Sitzung während des ganzen Projekts verwendet; die
Dokumentation des erledigten Postens wird beim Schließen geschrieben, in derselben Sitzung.
**Form:** ein einziger Durchgang beim Öffnen jedes Blocks; danach Routine jeder Sitzung.
**Größe:** verpflichtend in jedem Projekt. Es ist der Schritt, der alle anderen nachvollziehbar
macht: ohne nummerierte und spezifizierte offene Posten gibt es keinen Ort, an dem die
Spezifikation oder der Beleg hängen kann.

## Wozu er dient

Hab eine einzige Arbeitswarteschlange, geordnet und mit Tor, die die Wahrheit des Projekts ist. Es
gibt keinen „Plan“ auf der einen und „Aufgaben“ auf der anderen Seite: die Liste der offenen Posten
IST der Plan. Das verhindert die lange Spezifikation, die nach zwei Wochen überholt ist und
veraltet [Ref. 17](../REFERENCIAS.md#ref-17), und die Arbeit, von der niemand weiß, warum sie
gemacht wurde [Ref. 7](../REFERENCIAS.md#ref-7).

Aber da ist mehr, und es ist das, was diesen Schritt von einer beliebigen Aufgabenliste
unterscheidet. In der klassischen Methode gab es ein Anforderungsspezifikationsdokument, lang, das
alles beschrieb, was das System tun sollte, und das alterte, bevor es fertig war. Hier wird dieses
Dokument zerlegt: **die detaillierte Spezifikation lebt in jedem offenen Posten**. Ein gut
geschriebener offener Posten bringt mit: den Knoten des semantischen Baums, an dem er hängt; die
User Story oder den Anwendungsfall, der ihn auslöst, mit den Worten des Kunden; die detaillierte
Beschreibung; die anwendbaren Geschäftsregeln, mit ihrer Entscheidung und ihrem Datum; die Daten,
die hinein- und hinausgehen; die betroffenen Bildschirme, mit dem Prototyp, falls es einen gibt;
die Randfälle und die Ausnahmen; die Abnahmekriterien in der Form „gegeben, wenn, dann“; und wie
geprüft wird. Die Summe der offenen Posten ist die Spezifikation des Systems, und die
Nachverfolgbarkeit (Anforderung → offener Posten → Test → Commit) ist keine separate Matrix: sie
ist der offene Posten selbst.

Und das Dritte, das den Kreis schließt: **die geschlossenen Posten sind Dokumentation**. Wenn ein
offener Posten geschlossen wird, wird er nicht gelöscht und nicht leer archiviert: er bleibt mit
seiner Spezifikation, der Entscheidung, die ihn ausgelöst hat, dem Beleg, mit dem er geschlossen
wurde (die Zahlen des Rot und des Grün, der Screenshot, die gemessene Zahl), dem Commit und dem
Datum. Die Warteschlange der geschlossenen Posten ist die funktionale Historie des Systems: was
gebaut wurde, warum, wann und wie es getestet wurde. Daraus entstehen das Änderungsprotokoll, die
neuen Abschnitte des Handbuchs und die Antwort auf „warum tut das System das?“ sechs Monate
später.

## 1. Benötigter Kontext

Was folgt, ist die generische Liste. Die konkreten Dateien, die du vor jedem Prompt fertig haben
musst, mit ihrem Inhalt und ihrem Mindestzustand, stehen in Abschnitt 2, in dem Block „Bevor du
den Prompt schickst“, der jedem einzelnen vorangeht.

- Die Anfrage des Kunden für den Block, in Prosa, so wie er sie sagen würde, mit ihren
  Mehrdeutigkeiten. Wenn du in der Aufnahme Anwendungsfälle oder User Stories gemacht hast, umso
  besser: sie sind die natürliche Einheit eines Blocks.
- Der semantische Baum (Schritt 2), um jeden offenen Posten an seinen Knoten zu hängen.
- Die Audits und die Befunde der menschlichen Tests, falls es schon welche gab.
- `PROJECT.md` und `docs/STATUS.md`.

## 2. Prompts

**Zum Öffnen eines Blocks:**

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- Die Anfrage des Kunden für diesen Block, in Prosa geschrieben, so wie er sie sagen würde, mit
  ihren Mehrdeutigkeiten. Sie kommt in `docs/INITIAL_SURVEY.md` unter eine Überschrift mit dem
  Namen des Blocks oder in eine eigene Datei (zum Beispiel `docs/blocks/BLOCK_01_REQUEST.md`); der
  Prompt sagt „the client's request for this block“ ohne Pfad, also sag ihm im Chat, wo sie liegt.
  Wenn du in der Aufnahme Anwendungsfälle oder User Stories geschrieben hast, gehören sie dorthin:
  sie sind die natürliche Einheit des Blocks. Wenn der Eigentümer dir eine Priorität genannt hat,
  auch. „Verbessere“ sie nicht selbst: die Mehrdeutigkeiten sind genau das, wonach der Agent
  fragen muss.
- `docs/SEMANTIC_TREE.md` (Schritt 2), aktuell: jeder offene Posten wird an einem Knoten von dort
  hängen.
- `PROJECT.md` und `docs/STATUS.md` (Schritt 2), aktuell.
- Wenn es Audits (Schritt 11) oder menschliche Tests gab (der menschliche Blick beim Abschluss des
  vorigen Blocks): ihre Befunde, in `docs/AUDIT_[Datum].md` oder im lebendigen Stand notiert, denn
  sie sind Kandidaten für offene Posten dieses Blocks.
- Akzeptabler Mindestzustand: die Anfrage des Blocks ist mit den Worten des Kunden geschrieben,
  und der Baum hat die Knoten dieses Blocks, oder die Anfrage lässt erkennen, welche fehlen.

> We are going to turn everything that must be done in this block into numbered pending items,
> each one carrying its full specification. Read `PROJECT.md`, `docs/SEMANTIC_TREE.md`, the
> client's request for this block, and whatever is in `docs/STATUS.md`. If the request is
> ambiguous on any point such that you cannot write a verifiable pending item for it, ask me; do
> not resolve it by assuming. Then create or extend `docs/PENDING.md` with one item per thing to
> do, each with: number (PND-001 onwards); one-line title; the node of the semantic tree it hangs
> from; the user story or use case that originates it, in the client's words; the detailed
> description; the business rules that apply, each with its decision and date, or marked as
> "rule missing, asked"; the data in and out; the screens affected; the edge cases and
> exceptions; the acceptance criteria in the form "given, when, then"; how it will be verified
> as done; and status. If a node the item needs does not exist in the tree, propose it and mark
> it. Order the items by the priority I gave you; if I gave none, propose an order and tell me
> why. Reply in my language.

> [de]
> Wir werden alles, was in diesem Block zu tun ist, in nummerierte offene Posten verwandeln,
> jeder mit seiner vollständigen Spezifikation. Lies `PROJECT.md`, `docs/SEMANTIC_TREE.md`, die
> Anfrage des Kunden für diesen Block und was in `docs/STATUS.md` steht. Wenn die Anfrage in
> irgendeinem Punkt so mehrdeutig ist, dass du keinen prüfbaren offenen Posten dafür schreiben
> kannst, frag mich; löse es nicht durch Annahmen. Lege dann `docs/PENDING.md` an oder erweitere
> es mit einem Eintrag pro Sache, die zu tun ist, jeder mit: Nummer (ab PND-001); einzeiligem
> Titel; dem Knoten des semantischen Baums, an dem er hängt; der User Story oder dem
> Anwendungsfall, der ihn auslöst, in den Worten des Kunden; der detaillierten Beschreibung; den
> anwendbaren Geschäftsregeln, jede mit ihrer Entscheidung und ihrem Datum, oder markiert als
> „Regel fehlt, nachgefragt“; den Daten, die hinein- und hinausgehen; den betroffenen
> Bildschirmen; den Randfällen und Ausnahmen; den Abnahmekriterien in der Form „gegeben, wenn,
> dann“; wie geprüft wird, dass er erledigt ist; und dem Status. Wenn ein Knoten, den der Eintrag
> braucht, im Baum nicht existiert, schlag ihn vor und markiere ihn. Ordne die Einträge nach der
> Priorität, die ich dir gegeben habe; wenn ich keine gegeben habe, schlag eine Reihenfolge vor
> und sag mir, warum. Antworte in meiner Sprache.

Was ich hier verlange: dass er die Anfrage in prüfbare Einträge verwandelt und **fragt, wenn die
Anfrage nicht ausreicht, um einen prüfbaren zu schreiben** (Mehrdeutigkeit wird durch Fragen
gelöst, nicht durch Wählen); die vollständige Spezifikation jedes offenen Postens, Feld für Feld,
die die klassische Anforderungstechnik ist, in kleine Einheiten zerlegt; den Knoten des Baums, an
dem er hängt, der es dir erlaubt, einen offenen Posten außerhalb des Umfangs zu erkennen; die
Geschäftsregeln mit ihrer Entscheidung oder als fehlend markiert, was die Verbindung zu Schritt 6
ist; die Abnahmekriterien in der klassischen Form, die das Drehbuch des Ende-zu-Ende-Tests von
Schritt 7 sind; und eine vorgeschlagene Reihenfolge mit ihrem Grund, damit du sie bestätigst oder
änderst.

**Routine jeder Sitzung (gehört in die Arbeitsvereinbarung):**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- `docs/PENDING.md` mit dem spezifizierten Block, von dir gelesen, offener Posten für offener
  Posten, als wärst du der Kunde, mit deinen Korrekturen schon gemacht (das ist die wichtigste
  Aufgabe des Schritts und die, bei der die Versuchung, sie zu überspringen, am größten ist).
- `docs/WORKING_AGREEMENT.md` (Schritt 1), wo diese Routine hinzugefügt wird.
- Akzeptabler Mindestzustand: kein offener Posten hat eine Spezifikation von einer Zeile. Wenn er
  eine hat, fang nicht an zu bauen: lass sie zuerst vervollständigen.

> Before touching any code, open `docs/PENDING.md`, tell me which item you are taking and why,
> and re-read its specification. Every commit cites its pending item. A pending item is closed
> with written evidence (the test counts red and green, the screenshot, the measured number),
> never with "done". When you close it, keep it in the register with its full specification and
> add: the evidence, the commit, the date, and any decision that was taken along the way; that
> record is the documentation of what was built. If along the way you see something that is not
> on the list, add it as a new pending item with its specification; do not do it.

> [de]
> Bevor du Code anfasst, öffne `docs/PENDING.md`, sag mir, welchen Posten du nimmst und warum,
> und lies seine Spezifikation noch einmal. Jeder Commit zitiert seinen offenen Posten. Ein
> offener Posten wird mit schriftlichem Beleg geschlossen (die Testzahlen in Rot und Grün, der
> Screenshot, die gemessene Zahl), nie mit „erledigt“. Wenn du ihn schließt, lass ihn mit seiner
> vollständigen Spezifikation im Register und füge hinzu: den Beleg, den Commit, das Datum und
> jede Entscheidung, die unterwegs getroffen wurde; dieser Eintrag ist die Dokumentation dessen,
> was gebaut wurde. Wenn du unterwegs etwas siehst, das nicht auf der Liste steht, füge es als
> neuen offenen Posten mit seiner Spezifikation hinzu; tu es nicht.

Was ich hier verlange: die Disziplin jeder Sitzung: ankündigen, was genommen wird, und die
Spezifikation noch einmal lesen (der Agent startet ohne Gedächtnis, und die Spezifikation ist sein
Gedächtnis des offenen Postens), den Posten in jedem Commit zitieren, mit Beleg schließen, **den
erledigten Posten dokumentieren** im selben Register, und **notieren statt tun**, was außerhalb
der Liste auftaucht. Diese letzte Klausel ist die, die den exakten Umfang schützt, wenn das Modell
„noch etwas sieht“.

## 3. Erwartetes Ergebnis

`docs/PENDING.md` (oder das Werkzeug, das dein Projekt nutzt) mit, pro offenem Posten:

- Nummer, Titel, Status (offen / in Arbeit / geschlossen), Öffnungs- und Schließdatum.
- Dem Knoten des semantischen Baums.
- Der User Story oder dem Anwendungsfall des Ursprungs, mit den Worten des Kunden.
- Der detaillierten Spezifikation: Beschreibung, Geschäftsregeln mit Entscheidung und Datum,
  Daten, Bildschirme, Randfälle, Abnahmekriterien, wie geprüft wird.
- Beim Schließen: der Beleg, der Commit, das Datum, die unterwegs getroffenen Entscheidungen.

Und die Routine in der Arbeitsvereinbarung.

## 4. Vollständigkeitsprüfung

- Lies die Spezifikation eines zufälligen offenen Postens, als wärst du der Kunde: beschreibt sie,
  was du verlangt hast, mit deinen ursprünglichen Worten? Sind die Abnahmekriterien die, die du
  verwenden würdest, um „so ist es richtig“ zu sagen? Gibt es einen Randfall, den du kennst und
  der nicht drin ist?
- Hängt jeder offene Posten an einem Knoten des Baums? Hängt einer an einem Knoten, den du nicht
  erkennst?
- Sagt jeder offene Posten, wie er geprüft wird? Ein Posten ohne Prüfung kann nicht geschlossen
  werden.
- Gibt es Geschäftsregeln, die als „fehlt, nachgefragt“ markiert sind, nach denen du nicht gefragt
  wurdest?
- Gibt es „geschlossene“ Posten ohne Beleg und Commit? Wenn ja, öffne sie wieder. Behalten die
  geschlossenen ihre Spezifikation und ihre Abschlussdokumentation?
- Nimm drei Commits nach Zufall: zitieren sie ihren Posten?
- Ist im Code etwas aufgetaucht, das keinen offenen Posten hat? Dort hat der Agent den Umfang
  verlassen.

## 5. Warnsignale

- Ein offener Posten ist seit mehr als drei Sitzungen „in Arbeit“. Entweder sind es drei Posten,
  oder er ist durch eine Entscheidung blockiert, die niemand getroffen hat (Schritt 6).
- An einem Tag werden mehr Posten geschlossen als Commits gemacht. Sie werden ohne Beleg
  geschlossen.
- Die Spezifikationen sind einzeilig. Der Agent hat sie der Form halber geschrieben, nicht um
  darauf zu bauen; er wird beim Bauen erfinden, was fehlt.
- Die Liste hat mehr als fünfzig offene Posten. Das ist kein Plan, das ist ein Inventar von
  Ängsten: priorisieren und archivieren.
- Jemand fragt, warum das System etwas tut, und die Antwort steht in keinem geschlossenen Posten.
  Die Dokumentation des Erledigten wird nicht geschrieben.
