# Schritt 6 — Entscheidungen werden neben dem Code festgehalten (Schrittvertrag)

**Abschnitt:** Schleife.
**Wann:** in jeder Sitzung der Schleife, jedes Mal, wenn der Agent auf eine nicht aufgeschriebene
Geschäftsregel oder auf eine Verzweigung stößt, die ändert, was der Nutzer sieht. Meist sind es
zwei oder drei pro Block. Auch im Start (Schritte 0 und 3) und in der Produktionsfreigabe (14 und
15).
**Form:** kurzes Gespräch: der Agent erkennt, dass eine Entscheidung ansteht, fragt und hält sie
schriftlich fest.
**Größe:** verpflichtend in jedem Projekt. In einem kleinen kann das Register eine Tabelle mit zehn
Zeilen sein; worauf es ankommt, ist, dass die Geschäftsregeln einen Eigentümer haben.

## Wozu er dient

Sorg dafür, dass jede Geschäftsregel und jede strukturelle Entscheidung einen Eigentümer, ein
Datum und einen Ort hat. Sonst weiß in sechs Wochen niemand, ob „genehmigt plus Saldo kehrt in die
Warteschlange zurück“ eine Entscheidung des Kunden oder ein Einfall des Agenten war. Und vermeide
das Schlimmste: den Agenten, der Domänenregeln erfindet, weil sie ihm vernünftig erschienen.

Das hat eine Konsequenz, die ich laut aussprechen will: das Modell, wenn es auf eine Lücke in den
Regeln stößt, **füllt sie**. Es hält nicht inne; es ergänzt mit dem, was ihm am wahrscheinlichsten
erscheint, und tut das mit derselben Selbstverständlichkeit, mit der es alles andere schreibt.
Deshalb lautet die Routine dieses Schritts nicht „schreib die Entscheidungen auf“, sondern „halt
an und frag, wenn eine fehlt“. Das Zweite ist das Schwierige, und es ist das, was in der
Vereinbarung verlangt werden muss. Die Praxis, die Regel im Commit festzuhalten, mit meinen Worten
und dem Datum, habe ich bei der Krankenkasse durchgesetzt [Ref. 29](../REFERENCIAS.md#ref-29), und
die, Entscheidungen vor dem Bauen einzufrieren, stammt aus meinem Werkzeug
[Ref. 5](../REFERENCIAS.md#ref-5).

## 1. Benötigter Kontext

Was folgt, ist die generische Liste. Die konkreten Dateien, die du vor jedem Prompt fertig haben
musst, mit ihrem Inhalt und ihrem Mindestzustand, stehen in Abschnitt 2, in dem Block „Bevor du
den Prompt schickst“, der jedem einzelnen vorangeht.

- Das Gespräch mit dem Eigentümer: es ist der einzige Kontext. Der Agent kann keine
  Geschäftsregeln entscheiden.
- Ein vereinbarter Ort, an dem die Entscheidungen geschrieben werden: die Commit-Nachricht, die
  Spezifikation des offenen Postens und ein Register `docs/DECISIONS.md`.

## 2. Prompts

**Routine (gehört in die Arbeitsvereinbarung):**

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- `docs/WORKING_AGREEMENT.md` (Schritt 1), wo die Routine hinkommt.
- `docs/DECISIONS.md`, angelegt, und sei sie leer, mit dem Format in der Kopfzeile: Datum, wer
  entschieden hat, die wörtlichen Worte, der offene Posten, der sie brauchte. Du legst sie an oder
  bittest den Agenten in derselben Sitzung darum; wichtig ist, dass der vereinbarte Ort vor der
  ersten Entscheidung existiert.
- Du, verfügbar. Diese Routine funktioniert nur, wenn jemand in Stunden und nicht in Wochen
  antwortet, sobald der Agent anhält und fragt. Wenn der Eigentümer der Domäne eine andere Person
  ist, vereinbare mit ihm den Kanal und die Antwortzeit, bevor du den Prompt einfügst.
- Akzeptabler Mindestzustand: das Register existiert, und es gibt jemanden, der entscheidet.

> Whenever implementing something requires a business rule that is not written down, or you
> must choose between two approaches that change what the user sees, stop and ask me, in prose,
> with your recommendation and the alternative. Do not implement the one you prefer. When I
> decide, write the decision with my name and the date in the commit message, in the pending
> item's specification and in `docs/DECISIONS.md`, with the exact words I used. If I do not
> answer and you must move on, implement the most reversible option and mark it "decision by
> omission, pending confirmation", so that I can review it.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [de]
> Wann immer die Umsetzung von etwas eine Geschäftsregel erfordert, die nicht aufgeschrieben ist,
> oder du zwischen zwei Ansätzen wählen musst, die ändern, was der Nutzer sieht, halt an und frag
> mich, in Prosa, mit deiner Empfehlung und der Alternative. Setze nicht den um, den du
> bevorzugst. Wenn ich entscheide, schreib die Entscheidung mit meinem Namen und dem Datum in die
> Commit-Nachricht, in die Spezifikation des offenen Postens und in `docs/DECISIONS.md`, mit den
> exakten Worten, die ich verwendet habe. Wenn ich nicht antworte und du weitermachen musst,
> setze die am besten umkehrbare Option um und markiere sie als „Entscheidung durch Unterlassung,
> Bestätigung ausstehend“, damit ich sie prüfen kann.
>
> Wenn du eine Entscheidung von mir brauchst, stelle die Frage mit den vier Teilen von UX-28
> (`docs/ANEXO_HEURISTICAS.md`) und in dieser Reihenfolge: die Daten, die die Frage nötig machen,
> aufgelistet; ein Absatz von höchstens fünf Zeilen, der sie verbindet und die Frage sichtbar
> macht; die Frage selbst mit ihren möglichen Antworten durchnummeriert; und deine Empfehlung.
> Sage es in der technischen Tiefe, die das Projekt in `communication_depth` erklärt hat
> —`beginner`, `decision_maker` oder `technical`—; hat das Projekt keine erklärt, nimm
> `decision_maker`.

Was ich hier verlange: dass er **anhält** vor einer nicht aufgeschriebenen Regel oder einer
sichtbaren Verzweigung; dass er mit Empfehlung und Alternative fragt (damit du in zehn Sekunden
entscheidest, nicht in zehn Minuten); dass er die Entscheidung mit deinen wörtlichen Worten an den
drei Orten festhält (dem Commit, dem offenen Posten, dem Register), nicht mit einer
„verbesserten“ Paraphrase; und, für den Fall, dass du nicht antwortest, die am besten umkehrbare
Option, markiert als „durch Unterlassung“, was erlaubt weiterzumachen, ohne dass die Entscheidung
verschwindet.

**Zum Abschluss (jede Entscheidung):**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- Die Frage des Agenten, gelesen, mit seiner Empfehlung und seiner Alternative.
- Deine Entscheidung, mit dem Eigentümer der Domäne abgestimmt, falls du es nicht selbst bist, in
  einem Satz mit deinen exakten Worten formuliert, denen, die für immer bleiben sollen (sie werden
  im Commit, im offenen Posten und im Register stehen), und das Datum.
- Akzeptabler Mindestzustand: der Satz ist geschrieben, bevor du den Prompt einfügst; er wird
  nicht im Chat improvisiert. Eine später umformulierte Regel ist eine andere Regel.

> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [de]
> Regel: [exakter Wortlaut]. Von mir entschieden, [Datum]. Schreib sie auf und mach weiter.
>
> Wenn du eine Entscheidung von mir brauchst, stelle die Frage mit den vier Teilen von UX-28
> (`docs/ANEXO_HEURISTICAS.md`) und in dieser Reihenfolge: die Daten, die die Frage nötig machen,
> aufgelistet; ein Absatz von höchstens fünf Zeilen, der sie verbindet und die Frage sichtbar
> macht; die Frage selbst mit ihren möglichen Antworten durchnummeriert; und deine Empfehlung.
> Sage es in der technischen Tiefe, die das Projekt in `communication_depth` erklärt hat
> —`beginner`, `decision_maker` oder `technical`—; hat das Projekt keine erklärt, nimm
> `decision_maker`.

Was ich hier verlange: das Mindestformat einer Entscheidung: die wörtliche Regel, wer, wann. Drei
Dinge; ohne eines der drei ist es keine registrierte Entscheidung.

## 3. Erwartetes Ergebnis

- `docs/DECISIONS.md`: eine Zeile oder ein Absatz pro Entscheidung, mit Datum, wer entschieden
  hat, dem wörtlichen Satz, dem offenen Posten oder Commit, in dem sie angewendet wurde, und ob sie
  „durch Unterlassung“ war.
- In der Spezifikation jedes betroffenen offenen Postens: die Regel mit ihrer Entscheidung und
  ihrem Datum.
- In jedem Commit, der eine Geschäftsregel umsetzt: der Ursprungssatz.

## 4. Vollständigkeitsprüfung

- Öffne drei Commits, die Geschäftsregeln berühren: zitiert jeder, wer entschieden hat und wann?
- Gibt es unbestätigte Entscheidungen „durch Unterlassung“? Bestätige sie oder mach sie
  rückgängig; lass sie nicht liegen.
- Gibt es eine Regel im System, die du nicht als deine erkennst? Wenn ja, hat der Agent sie
  erfunden: das ist ein Versagen des Schritts, wird als offener Posten geschrieben und geprüft.
- Sind die Sätze wörtlich oder vom Agenten „verbessert“? Es müssen deine sein.

## 5. Warnsignale

- Eine Arbeitswoche ist vergangen und das Entscheidungsregister ist nicht gewachsen. Entweder war
  die Arbeit rein mechanisch (selten) oder der Agent hat allein entschieden.
- Die registrierten Entscheidungen sind alle im selben polierten Stil verfasst. Es sind Paraphrasen
  des Agenten, nicht deine Worte.
- Ein Nutzer des Systems fragt „warum tut es das?“ und niemand findet die Entscheidung.
