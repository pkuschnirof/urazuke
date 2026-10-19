# Schritt 10 — Die manuellen Testfälle werden zusammen mit der Funktionalität geschrieben, und Menschen führen sie aus (Schrittvertrag)

**Abschnitt:** Schleife.
**Wann:** bei jedem offenen Posten, beim Schließen, nach dem roten Test (8) und nach der Qualität
(9): der Agent schreibt die manuellen Testfälle des Flusses, den er berührt hat. Sie werden von
Menschen in drei Momenten ausgeführt: beim Abschluss jedes Blocks (die menschlichen Tests), vor
dem ersten Deployment in die Produktion (die Abnahmetests mit dem Eigentümer) und nach jedem
Deployment, in einem nur lesenden Durchgang. Jede Ausführung, die fehlschlägt, speist eine
Anforderung als korrektiven offenen Posten in die Schleife zurück.
**Form:** Routine bei jedem offenen Posten; danach menschliche Ausführung pro Zyklus.
**Größe:** verpflichtend in jedem Projekt mit Nutzern: der manuelle Testfall ist der einzige Test,
den das Modell weder schreibt noch ausführt.

## Wozu er dient

Die Methode hat automatische Tests im Überfluss: den roten Test, die Regression, das Ende zu Ende
in drei Maßstäben. Alle schreibt und alle lässt das Modell laufen, und alle prüfen das, was das
Modell verstanden hat. Es fehlt der Test, den eine Person mit ihren eigenen Augen und ihren eigenen
Händen macht, einem geschriebenen Drehbuch folgend, und der findet, was kein Test findet: den
Knopf, der dort ist, wo er nicht hingehört, die Meldung, die man nicht versteht, den Fluss, der
technisch läuft und menschlich nichts taugt. Der menschliche Blick und die menschlichen Tests
standen schon in der Zeitlinie; was fehlte, war, dass sie ein **Drehbuch** haben, und dass dieses
Drehbuch derselbe schreibt, der die Funktionalität gebaut hat, im selben Moment, aus den
Abnahmekriterien des offenen Postens. Ohne Drehbuch ist der menschliche Test „spiel ein bisschen
mit dem System“, und was gefunden wird, hängt von der Tageslaune ab. Mit Drehbuch wird er jedes
Mal gleich ausgeführt, es wird festgehalten, was passiert ist, und was fehlschlägt, kehrt als
Anforderung in die Schleife zurück. Das ist der Schluss des Kreises, den das Prozessbild zeigt:
die manuelle Ausführung der Testfälle speist Anforderungen in die Entwicklung zurück.

Ein manueller Testfall hat immer dieselbe Form: eine Kennung; der offene Posten, aus dem er
stammt; die Vorbedingung (was vorher existieren muss: ein Patient, ein Termin von gestern); die
Schritte, nummeriert, jeder mit dem, was die Person tut, und dem, was sie sehen muss; das erwartete
Ergebnis am Schluss, einschließlich der Wirkung im Backend, die eine Person verifizieren kann (ein
Datensatz, der erscheint, eine Nachricht im falschen Postfach); die zu benutzenden Testdaten; und
der Platz für das Ergebnis jeder Ausführung: Datum, wer, bestanden oder fehlgeschlagen, Anmerkung.

**Wenn du Anfänger bist.** Ein *manueller Testfall* ist ein Rezept, damit eine Person eine
Funktionalität prüft: was vorzubereiten ist, was Schritt für Schritt zu tun ist, und was bei jedem
Schritt passieren muss. Er wird so geschrieben, dass ihm jeder gleich folgen kann, ohne zu wissen,
wie das System gemacht ist. Einen Fall *auszuführen* heißt, dem Rezept zu folgen und zu notieren,
ob er bestanden hat oder fehlgeschlagen ist. *Vorbedingung* ist das, was vor dem Anfang existieren
muss. Und *zurückspeisen* heißt, dass das, was die Person falsch gefunden hat, als neue Bitte auf
die Liste der offenen Posten zurückkehrt, mit ihren Worten.

## 1. Benötigter Kontext

Was folgt, ist die generische Liste. Die konkreten Dateien, die du vor jedem Prompt fertig haben
musst, mit ihrem Inhalt und ihrem Mindestzustand, stehen in Abschnitt 2, in dem Block „Bevor du
den Prompt schickst“, der jedem einzelnen vorangeht.

- Der offene Posten, der gerade geschlossen wird, mit seinen Abnahmekriterien „gegeben, wenn,
  dann“ (Schritt 5): sie sind der Rohstoff des Falls.
- Die Testumgebung mit Daten, damit man den Schritten wirklich folgen kann.
- Wer die Fälle ausführen wird (der Eigentümer, ein Nutzer des Vertrauens) und wann (Abschluss des
  Blocks, Abnahme, nach jedem Deployment).

## 2. Prompts

**Routine bei jedem offenen Posten (kommt in die Arbeitsvereinbarung):**

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- Der offene Posten mit seinen Abnahmekriterien in `docs/PENDING.md` (Schritt 5), bereits gebaut
  und mit dem roten Test und grüner Qualität (Schritte 8 und 9).
- `docs/MANUAL_TESTS.md` angelegt, und sei es leer, mit dem Format des Falls in der Kopfzeile:
  Kennung, offener Posten, Vorbedingung, Schritte (Handlung und sichtbares Ergebnis), erwartetes
  Ergebnis mit der von einer Person verifizierbaren Wirkung im Backend, Testdaten, und die Tabelle
  der Ausführungen (Datum, wer, bestanden oder fehlgeschlagen, Anmerkung).
- Die Entscheidung, wer ausführt und wann, geschrieben in `PROJECT.md` oder in der Vereinbarung:
  für ein kleines Projekt der Eigentümer beim Abschluss jedes Blocks und vor dem ersten Deployment.
- `docs/WORKING_AGREEMENT.md`, wo die Routine hinkommt.
- Akzeptabler Mindestzustand: die Datei existiert mit ihrem Format, und der offene Posten hat
  Abnahmekriterien.

> Every pending item that changes what a user sees or does is closed with its manual test cases
> written in `docs/MANUAL_TESTS.md`, derived from its acceptance criteria: one case per flow the
> item touches, with an id, the pending item, the precondition, the numbered steps (what the
> person does and what they must see), the expected result including a backend effect a person
> can verify without tools, the test data to use, and an empty execution table (date, who,
> passed or failed, observation). Write them for a person who does not know how the system is
> built. Keep the cases of closed items up to date: when a flow changes, its cases change in the
> same commit. Never mark a case as executed yourself: execution is human.

> [de]
> Jeder offene Posten, der ändert, was ein Nutzer sieht oder tut, wird mit seinen manuellen
> Testfällen in `docs/MANUAL_TESTS.md` geschlossen, abgeleitet aus seinen Abnahmekriterien: ein
> Fall pro Fluss, den der Posten berührt, mit einer Kennung, dem offenen Posten, der Vorbedingung,
> den nummerierten Schritten (was die Person tut und was sie sehen muss), dem erwarteten Ergebnis
> einschließlich einer Wirkung im Backend, die eine Person ohne Werkzeuge verifizieren kann, den
> zu benutzenden Testdaten und einer leeren Ausführungstabelle (Datum, wer, bestanden oder
> fehlgeschlagen, Anmerkung). Schreib sie für eine Person, die nicht weiß, wie das System gebaut
> ist. Halt die Fälle der geschlossenen Posten aktuell: wenn sich ein Fluss ändert, ändern sich
> seine Fälle im selben Commit. Markiere nie selbst einen Fall als ausgeführt: die Ausführung ist
> menschlich.

Was ich hier verlange: dass der Fall aus den Abnahmekriterien kommt (so prüft er, was verlangt
wurde, und nicht, was das Modell verstanden hat); dass er für jemanden geschrieben ist, der nicht
weiß, wie das System funktioniert, was der Unterschied zwischen einem Testfall und einer
technischen Notiz ist; dass er die von einer Person verifizierbare Wirkung im Backend enthält,
damit der manuelle Test auch auf die andere Seite des Bildschirms schaut; dass die Fälle im selben
Commit gepflegt werden, genau wie die Dokumentation; und **dass das Modell sie nie ausführt**, denn
vom Modell ausgeführt sind sie ein weiterer Test, und der Witz ist, dass eine Person sie ausführt.

**Für eine Ausführung (Abschluss eines Blocks, Abnahme, nach einem Deployment):**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- Die erfolgte Ausführung: eine Person ist den Fällen aus `docs/MANUAL_TESTS.md` in der
  Testumgebung gefolgt (oder in der Produktion, nur lesend, nach einem Deployment) und hat in der
  Tabelle jedes Falls Datum, wer, bestanden oder fehlgeschlagen und die Anmerkung notiert. Das
  macht die Person, von Hand, bevor du den Prompt einfügst; der Agent macht es nicht.
- Die losen Anmerkungen, die in keinen Fall passen (was gestört hat, was man nicht verstanden hat),
  am Ende der Datei notiert, mit Datum.
- Akzeptabler Mindestzustand: alle Fälle des Umfangs haben ein Ergebnis von heute, und sei es
  „konnte nicht ausgeführt werden“ mit der Begründung.

> Read the executions of today in `docs/MANUAL_TESTS.md`. For every case that failed, and for
> every loose observation at the end of the file, open a corrective pending item in
> `docs/PENDING.md` with the person's words as the way to reproduce it, hanging from the node of
> the semantic tree it touches; do not fix anything now. For every case that passed, nothing. Then
> tell me, flow by flow, how many cases passed and how many failed, compared with the previous
> execution, and which failures repeat. If a case could not be executed, tell me why and whether
> the case or the system is the problem. Reply in my language.

> [de]
> Lies die Ausführungen von heute in `docs/MANUAL_TESTS.md`. Für jeden Fall, der fehlgeschlagen
> ist, und für jede lose Anmerkung am Ende der Datei öffne einen korrektiven offenen Posten in
> `docs/PENDING.md` mit den Worten der Person als Art, ihn zu reproduzieren, aufgehängt an dem
> Knoten des semantischen Baums, den er berührt; repariere jetzt nichts. Für jeden Fall, der
> bestanden hat, nichts. Dann sag mir, Fluss für Fluss, wie viele Fälle bestanden haben und wie
> viele fehlgeschlagen sind, verglichen mit der vorherigen Ausführung, und welche Fehlschläge sich
> wiederholen. Wenn ein Fall nicht ausgeführt werden konnte, sag mir warum und ob das Problem der
> Fall oder das System ist. Antworte in meiner Sprache.

Was ich hier verlange: die Rückspeisung, operativ gemacht: jeder menschliche Fehlschlag ist ein
korrektiver offener Posten, mit den Worten der Person (nicht denen des Modells) als Reproduktion,
und am Baum aufgehängt; den Vergleich mit der vorherigen Ausführung, der dir sagt, ob das System
zwischen den Blöcken besser oder schlechter wird; und die Unterscheidung zwischen „der Fall ist
schlecht geschrieben“ und „das System ist schlecht“, denn das sind zwei verschiedene offene Posten.

## 3. Erwartetes Ergebnis

- `docs/MANUAL_TESTS.md` mit einem Fall pro Fluss, den jeder geschlossene offene Posten berührt
  hat, im Format, für eine Person geschrieben.
- Die festgehaltenen Ausführungen, mit Datum und wer, in jedem Zyklus.
- Ein korrektiver offener Posten pro Fehlschlag und pro Anmerkung.
- Die Routine in der Vereinbarung.

## 4. Vollständigkeitsprüfung (die machst du, ohne Code zu lesen)

- Nimm einen beliebigen Fall und folg ihm selbst in der Testumgebung, ohne den Agenten etwas zu
  fragen: hast du es geschafft? Wenn du fragen musstest, ist der Fall nicht für eine Person
  geschrieben.
- Hat jeder geschlossene offene Posten, der einen Bildschirm berührt, seinen Fall? Verlang die
  Liste der Posten ohne Fall.
- Sagt der Fall, welche Wirkung auf der anderen Seite des Bildschirms zu verifizieren ist, und wie
  eine Person sie verifiziert?
- Hat die letzte Ausführung bei jedem Fall Datum und Namen? Gibt es ein „bestanden“ ohne Datum?
- Hat jeder Fehlschlag der letzten Ausführung seinen offenen Posten, mit den Worten der Person?

## 5. Warnsignale

- Der Agent hat die Fälle als ausgeführt markiert. Er hat sie ausgeführt, und das ist dasselbe,
  wie sie nicht auszuführen.
- Die Fälle sind Kopien des automatischen Tests in Prosa. Ein manueller Fall muss ansehen, was der
  Test nicht ansieht: was man sieht, was man versteht, was stört.
- Alle Fälle bestehen in allen Ausführungen. Menschen finden immer etwas; wenn sie nichts finden,
  folgen sie dem Drehbuch nicht, oder das Drehbuch verlangt nicht hinzusehen.
- Die Fehlschläge werden „im Moment repariert“, ohne offenen Posten. Die Worte der Person gehen
  verloren und auch die Spur davon, was sich wiederholt hat.
