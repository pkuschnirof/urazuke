# Schritt 6 — Entscheidungen werden neben dem Code festgehalten (Sprossenvertrag)

**Phase:** Schleife (jedes Mal, wenn eine Geschäftsregel oder eine strukturelle Entscheidung
auftaucht).
**Form:** kurzes Gespräch: der Agent erkennt, dass es eine Entscheidung gibt, fragt und hält sie
fest.
**Größe:** verpflichtend in jedem Projekt. In einem kleinen kann das Register eine Tabelle mit zehn
Zeilen sein; worauf es ankommt, ist, dass Geschäftsregeln einen Eigentümer haben.

## Wozu sie dient

Damit jede Geschäftsregel und jede strukturelle Entscheidung einen Eigentümer, ein Datum und einen
Ort hat. Sonst weiß in sechs Wochen niemand, ob „genehmigt plus Guthaben geht zurück in die
Warteschlange“ eine Kundenentscheidung oder ein Einfall des Agenten war. Und sie verhindert das
Schlimmste: den Agenten, der Fachregeln erfindet, weil sie ihm vernünftig erschienen.

Das hat eine Folge, die man laut aussprechen sollte: wenn das Modell auf eine Lücke in den Regeln
stößt, **füllt es sie**. Es hält nicht an; es ergänzt mit dem, was ihm am wahrscheinlichsten
erscheint, und zwar mit derselben Selbstverständlichkeit, mit der es alles andere schreibt. Deshalb
lautet die Routine dieser Sprosse nicht „schreib die Entscheidungen auf“, sondern „halt an und frag,
wenn eine fehlt“. Das Zweite ist das Schwierige, und das muss in der Vereinbarung verlangt werden.

## 1. Benötigter Kontext

- Das Gespräch mit dem Eigentümer: es ist der einzige Kontext. Der Agent kann keine
  Geschäftsregeln entscheiden.
- Ein vereinbarter Ort, an dem Entscheidungen festgehalten werden: die Commit-Nachricht, das
  Dokument des offenen Postens oder ein Register `docs/DECISIONS.md`.

## 2. Prompts

**Routine (gehört in die Arbeitsvereinbarung):**

> Whenever implementing something requires a business rule that is not written down, or you
> must choose between two approaches that change what the user sees, stop and ask me, in prose,
> with your recommendation and the alternative. Do not implement the one you prefer. When I
> decide, write the decision with my name and the date in the commit message and in
> `docs/DECISIONS.md`, with the exact words I used. If I do not answer and you must move on,
> implement the most reversible option and mark it "decision by omission, pending confirmation",
> so that I can review it.

Was wir verlangen: dass er bei einer nicht aufgeschriebenen Regel oder einer sichtbaren Gabelung
**anhält**; dass er mit Empfehlung und Alternative fragt (damit der Eigentümer in zehn Sekunden
entscheidet, nicht in zehn Minuten); dass er die Entscheidung mit den wörtlichen Worten des
Eigentümers festhält, nicht mit einer „verbesserten“ Umschreibung; und, für den Fall, dass der
Eigentümer nicht antwortet, die am leichtesten umkehrbare Option, als „durch Unterlassung“
markiert, was es erlaubt weiterzumachen, ohne dass die Entscheidung verschwindet.

**Abschluss (jede Entscheidung):**

> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.

Was wir verlangen: das Minimalformat einer Entscheidung: die wörtliche Regel, wer, wann. Drei
Dinge; ohne eines der drei ist es keine festgehaltene Entscheidung.

## 3. Erwartetes Ergebnis

- `docs/DECISIONS.md`: eine Zeile oder ein Absatz pro Entscheidung, mit Datum, wer entschieden hat,
  dem wörtlichen Satz, dem Posten oder Commit, in dem sie angewendet wurde, und ob sie „durch
  Unterlassung“ war.
- In jedem Commit, der eine Geschäftsregel umsetzt: der Ursprungssatz („Regel des Eigentümers:
  genehmigt + Guthaben = zurück in die Warteschlange“, „Entscheidung des Eigentümers 2026-08-10“).

## 4. Vollständigkeitsprüfung

- Öffne drei Commits, die Geschäftsregeln berühren: zitiert jeder, wer wann entschieden hat?
- Gibt es unbestätigte Entscheidungen „durch Unterlassung“? Bestätige oder verwirf sie; lass sie
  nicht liegen.
- Gibt es eine Regel im System, die du nicht als deine erkennst? Wenn ja, hat der Agent sie
  erfunden: das ist ein Fehlschlag der Sprosse, wird als offener Posten notiert und überprüft.
- Sind die Sätze wörtlich oder vom Agenten „verbessert“? Es müssen deine sein.

## 5. Warnsignale

- Eine Arbeitswoche ist vergangen und das Entscheidungsregister ist nicht gewachsen. Entweder war
  die Arbeit rein mechanisch (selten) oder der Agent hat allein entschieden.
- Die festgehaltenen Entscheidungen sind alle im selben polierten Stil verfasst. Es sind
  Umschreibungen des Agenten, nicht deine Worte.
- Ein Nutzer des Systems fragt „warum macht es das?“ und niemand findet die Entscheidung.
