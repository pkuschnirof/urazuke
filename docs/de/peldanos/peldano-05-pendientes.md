# Schritt 5 — Der Plan sind die offenen Posten (Sprossenvertrag)

**Phase:** Schleife (bei jeder Änderung, während des ganzen Projekts).
**Form:** ein Durchgang beim Anlegen; danach Routine jeder Sitzung.
**Größe:** verpflichtend in jedem Projekt. Es ist die Sprosse, die alle anderen nachvollziehbar
macht: ohne nummerierte offene Posten gibt es keinen Ort, an dem der Beleg hängt.

## Wozu sie dient

Damit es eine einzige Arbeitswarteschlange gibt, geordnet und mit Tor, die die Wahrheit des
Projekts ist. Es gibt keinen „Plan“ auf der einen und „Aufgaben“ auf der anderen Seite: die Liste
der offenen Posten IST der Plan. Sie verhindert die Spezifikation, die in zwei Wochen überholt ist
und veraltet, und die Arbeit, von der niemand weiß, warum sie gemacht wurde.

Ein gut geschriebener offener Posten hat drei Dinge, die ein Eintrag auf einer To-do-Liste
normalerweise nicht hat: woher er kommt (die Entscheidung oder Anfrage, die ihn ausgelöst hat), wie
geprüft wird, dass er erledigt ist, und den Beleg, mit dem er geschlossen wurde. Das Erste
verhindert, dass die Arbeit ihren Grund verliert; das Zweite, dass sie mit „fertig“ geschlossen
wird; das Dritte ist, was der Eigentümer anschaut, statt den Code anzuschauen.

## 1. Benötigter Kontext

- Die Spezifikation oder die ursprüngliche Anfrage des Kunden, so unvollständig sie auch sei.
- Die Audits, falls es schon welche gab.
- `PROJECT.md` und `docs/STATUS.md`.

## 2. Prompts

**Zum Anlegen des Registers:**

> We are going to turn everything that must be done into numbered pending items. Read
> `PROJECT.md`, the client's request and whatever is in `docs/STATUS.md`. If the request is
> ambiguous on any point such that you cannot write a verifiable pending item for it, ask me;
> do not resolve it by assuming. Create `docs/PENDING.md` with one item per thing to do: number
> (PND-001 onwards), one-line title, what is requested, which decision originates it (or
> "client request, date"), how it will be verified as done, and status. Order them by the
> priority I gave you; if I gave none, propose an order and tell me why. Reply in my language.

Was wir verlangen: dass er die Anfrage in überprüfbare Posten verwandelt und **fragt, wenn die
Anfrage nicht ausreicht, um einen überprüfbaren zu schreiben** (Mehrdeutigkeit löst man durch
Fragen, nicht durch Wählen); die Felder jedes Postens, insbesondere „wie wird geprüft“, das es
später erlaubt, ihn mit Beleg zu schließen; und eine vorgeschlagene Reihenfolge mit Begründung, die
der Eigentümer bestätigt oder ändert.

**Routine jeder Sitzung (gehört in die Arbeitsvereinbarung oder in `PROJECT.md`):**

> Before touching any code, open `docs/PENDING.md`, tell me which item you are taking and why.
> Every commit cites its pending item. A pending item is closed with written evidence (the test,
> the screenshot, the number), never with "done". If along the way you see something that is not
> on the list, add it as a new pending item; do not do it.

Was wir verlangen: die Disziplin jeder Sitzung: ankündigen, was genommen wird, den Posten in jedem
Commit zitieren, mit Beleg schließen, und **notieren statt tun**, was außerhalb der Liste auftaucht.
Diese letzte Klausel ist die, die den exakten Umfang schützt, wenn das Modell „noch etwas sieht“.

## 3. Erwartetes Ergebnis

`docs/PENDING.md` (oder das Werkzeug, das das Projekt nutzt) mit, pro Posten:

- Nummer, Titel, Status (offen / in Arbeit / geschlossen), Öffnungs- und Schließdatum.
- Was verlangt wird, in zwei oder drei Sätzen.
- Herkunft: die Entscheidung oder die Anfrage, mit Datum.
- Wie geprüft wird, dass es erledigt ist: der Test, der Bildschirm, die Zahl.
- Beim Schließen: der Beleg und der Commit.

Und die Routine in der Vereinbarung oder in `PROJECT.md`.

## 4. Vollständigkeitsprüfung

- Sagt jeder Posten, wie er geprüft wird? Ein Posten ohne Prüfung kann nicht geschlossen werden.
- Gibt es „geschlossene“ Posten ohne Beleg und Commit? Wenn ja, öffne sie wieder.
- Nimm drei Commits nach Zufall: zitieren sie ihren Posten?
- Ist im Code etwas aufgetaucht, das keinen Posten hat? Dort hat der Agent den Umfang verlassen.
- Hat der Agent dich zu den mehrdeutigen Punkten der Anfrage gefragt, oder sie allein gelöst?

## 5. Warnsignale

- Ein Posten ist seit mehr als drei Sitzungen „in Arbeit“. Entweder sind es drei Posten, oder er
  ist durch eine Entscheidung blockiert, die niemand getroffen hat (Sprosse 6).
- An einem Tag werden mehr Posten geschlossen als Commits gemacht. Sie werden ohne Beleg
  geschlossen.
- Die Liste hat mehr als fünfzig offene Posten. Das ist kein Plan, das ist ein Inventar von
  Ängsten: priorisieren und archivieren.
