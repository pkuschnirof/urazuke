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

Zwei weitere Dinge kamen mit D-082 herein, und es sind zwei und nicht eines. Das erste: **die
Person führt aus, um abzunehmen, und der Agent geht durch, um Defekte zu finden**, und die Methode
verlangt beides. Der agentische Durchgang — dass der Agent jeden Bildschirm öffnet, ansieht, was
darauf ist, ihn benutzt und dem Fluss von einem Bildschirm zum nächsten folgt, wie es eine Person
täte — ersetzt die menschliche Ausführung nicht, und er ist auch nicht der Ende-zu-Ende-Test von
Schritt 8: der Ende-zu-Ende-Test geht einen Weg, den jemand gewählt hat, und der Durchgang sucht
das, woran niemand beim Testen gedacht hat. Ich verlange ihn, weil ich ihn gemessen habe: von allem,
was ein Agent in einem vollen Zyklus tat, war der Durchgang **das, was die meisten
Oberflächendefekte fand**, und die Methode verlangte ihn nicht; der Agent verlangte ihn von sich
selbst. Er geht nach `docs/SCREEN_WALKTHROUGH.md`, mit seinem Nenner: wie viele Bildschirme das
System hat, wie viele er durchging und wie viele Defekte er fand. Ein Bildschirm, in den er nicht
hineinkam, wird im Gesamtwert gezählt und mit seinem Grund benannt; ihn aus dem Nenner zu nehmen,
damit die Zahl schöner aussieht, ist genau das, was `CQ-19.1` des Anhangs H verbietet.

Und das zweite, das die Grenze dieses Schritts ins Gesicht gesagt ist: **die Fälle zu schreiben und
dass eine Person sie ausführt, sind zwei verschiedene Zustände, und den zweiten kann die Methode
nicht erzwingen.** Kein Programm kann verifizieren, dass eine Person ein Skript mit ihren eigenen
Händen befolgt hat, und ein Tor, das es verlangte, könnte nur durch Lügen befriedigt werden. Also
verlangt der Schritt, was verifizierbar ist — die Erklärung — und die Schuld bleibt im Blickfeld:
`cases_written`, `cases_executed_by_a_person` und `execution_debt` am Kopf von
`docs/MANUAL_TESTS.md`, und die zweite Zahl bewegt eine abgezeichnete Ausführung und niemals das
Lesen des Agenten. Die Erklärung **fügt kein neues Tor hinzu**: was der Schritt zusätzlich verlangt, ist, dass die
Schuld geschrieben steht, nicht dass die Zahl über null liegt, denn eine Person zu zwingen ist das,
was die Methode nicht kann. Was **anhält**, und schon seit Anker 4 des Anhangs H da war, ist, dass
ein Fall, den niemand pro Profil gespielt hat, kein ausgeführter Fall ist: ich habe es am 2026-11-02
mit dem echten Evaluator gemessen, und eine Installation, die diesen Anker implementiert, geht auf
rot und sagt, dass das Register der abgezeichneten Fälle leer ist. Es fehlte also keine Sperre: es
fehlte, dass die Schuld **lesbar** ist — ihre Zahl und der Name dessen, der sie schuldet — statt
eines leeren Registers, das „niemand hat abgezeichnet“ sagt, ohne zu sagen, wer abzeichnen sollte
und seit wann. Und es lohnt sich zu wissen, um diesen Schritt zu lesen, woher die Messung kam, die
ihn aufgemacht hat: das Projekt, das mit der leeren Tabelle voranging, lief auf dem **Gefrorenen**
von Schema 1, wo die einzige Prüfung von Schritt 10 ist, dass die Datei existiert. Ich habe es am 2026-11-02 in einem echten Projekt gemessen: die dreizehn Fälle
geschrieben, die Ausführungstabelle leer, der Schritt grün, und ein Konformitätsdokument, das sechs
Kriterien als verifiziert behauptete, deren Prüfer eine Person war, die sie nie ausgeführt hat. Der
Agent hatte genau das getan, was der Schritt sagte. Das Loch war das des Schritts.

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
>
> Every manual case also runs once per affected profile, and it is derived
> from `docs/PROFILE_MATRIX.md` instead of being written by hand: a case run
> with a single profile is not an executed case (Annex H, anchor 4). At the
> close of each block add the two human checks no machine replaces: the
> first-click check, where I name the place I would look for a task and you
> compare that with the menu, and the real screenshot of the test
> environment.
>
> `docs/MANUAL_TESTS.md` carries at its head three declarations that a gate reads, each one under
> its fixed key in English even when the file is in my language, because what this step owes is not
> the same as what it can prove. `cases_written`: how many cases are written.
> `cases_executed_by_a_person`: how many of those a person signed in their execution table, with a
> date and a name; you keep the first figure, and the second one moves only when a person executes
> -- never from your own reading of the system. `execution_debt`: `none` when the two figures are
> the same, or `pending_verifier` and then the cases nobody has executed yet, with who owes each
> execution and since when. That debt is not a gate of its own: what this step asks you for is the
> declaration and not a figure above zero, because the method cannot make a person execute. But it
> is never silent either, and a step that advances with its debt declared is honest in a way that a
> step advancing while it looks complete is not.
>
> And walk the screens yourself, which is a different thing from the execution a person owes and
> never a replacement for it: you walk to find defects, a person executes to accept. Go through
> every screen the system has as a person would -- open it, look at what is on it, use it, and
> follow the flow from one screen to the next -- and write `docs/SCREEN_WALKTHROUGH.md` with
> `screens_total`, how many screens the system has; `screens_walked`, how many of them you actually
> walked; and `walkthrough_findings`, how many defects the walk found. A screen you could not reach
> is counted in the total and named with its reason: taking it out of the denominator so that the
> figure reads better is the one thing this file must never do. For every defect: the screen, what
> you saw, what you expected instead, and the pending item you opened for it.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

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
>
> Jeder manuelle Fall läuft außerdem einmal pro betroffenem Profil, und er
> wird aus `docs/PROFILE_MATRIX.md` abgeleitet statt von Hand geschrieben:
> ein Fall, der mit einem einzigen Profil gelaufen ist, ist kein
> ausgeführter Fall (Anhang H, Anker 4). Beim Abschluss jedes Blocks füge
> die zwei menschlichen Prüfungen hinzu, die keine Maschine ersetzt: die
> Prüfung des ersten Klicks, bei der ich den Ort nenne, an dem ich eine
> Aufgabe suchen würde, und du das mit dem Menü vergleichst, und den echten
> Screenshot der Testumgebung.
>
> `docs/MANUAL_TESTS.md` trägt an seinem Kopf drei Erklärungen, die ein Tor liest, jede unter ihrem
> festen Schlüssel auf Englisch, auch wenn die Datei in meiner Sprache ist, denn was dieser Schritt
> schuldet, ist nicht dasselbe wie das, was sie beweisen kann. `cases_written`: wie viele Fälle
> geschrieben sind. `cases_executed_by_a_person`: wie viele davon eine Person in ihrer
> Ausführungstabelle abgezeichnet hat, mit Datum und Namen; die erste Zahl hältst du, und die zweite
> bewegt sich nur, wenn eine Person ausführt — niemals aus deinem eigenen Lesen des Systems.
> `execution_debt`: `none`, wenn die zwei Zahlen dieselbe sind, oder `pending_verifier` und dann die
> Fälle, die noch niemand ausgeführt hat, mit wem jede Ausführung schuldet und seit wann. Diese
> Schuld ist kein eigenes Tor: was dieser Schritt von dir verlangt, ist die Erklärung und keine Zahl
> über null, denn die Methode kann eine Person nicht zum Ausführen zwingen. Aber sie ist auch nie
> stumm, und ein Schritt, der mit seiner erklärten Schuld vorangeht, ist ehrlich auf eine Weise, wie
> es ein Schritt nicht ist, der vorangeht und dabei vollständig aussieht.
>
> Und geh die Bildschirme selbst durch, was etwas anderes ist als die Ausführung, die wir einer
> Person schulden, und niemals ein Ersatz dafür: du gehst durch, um Defekte zu finden, eine Person
> führt aus, um abzunehmen. Geh durch jeden Bildschirm, den das System hat, wie es eine Person täte
> — öffne ihn, schau an, was darauf ist, benutze ihn, und folge dem Fluss von einem Bildschirm zum
> nächsten — und schreib `docs/SCREEN_WALKTHROUGH.md` mit `screens_total`, wie viele Bildschirme das
> System hat; `screens_walked`, wie viele davon du wirklich durchgegangen bist; und
> `walkthrough_findings`, wie viele Defekte der Durchgang gefunden hat. Ein Bildschirm, in den du
> nicht hineinkamst, wird im Gesamtwert gezählt und mit seinem Grund benannt: ihn aus dem Nenner zu
> nehmen, damit die Zahl besser zu lesen ist, ist das Einzige, was diese Datei niemals tun darf. Zu
> jedem Defekt: der Bildschirm, was du gesehen hast, was du stattdessen erwartet hast, und der offene
> Posten, den du dafür geöffnet hast.
>
> Wenn du eine Entscheidung von mir brauchst, stelle die Frage mit den vier Teilen von UX-28
> (`docs/ANEXO_HEURISTICAS.md`) und in dieser Reihenfolge: die Daten, die die Frage nötig machen,
> aufgelistet; ein Absatz von höchstens fünf Zeilen, der sie verbindet und die Frage sichtbar
> macht; die Frage selbst mit ihren möglichen Antworten durchnummeriert; und deine Empfehlung.
> Sage es in der technischen Tiefe, die das Projekt in `communication_depth` erklärt hat
> —`beginner`, `decision_maker` oder `technical`—; hat das Projekt keine erklärt, nimm
> `decision_maker`.

Was ich hier verlange: dass der Fall aus den Abnahmekriterien kommt (so prüft er, was verlangt
wurde, und nicht, was das Modell verstanden hat); dass er für jemanden geschrieben ist, der nicht
weiß, wie das System funktioniert, was der Unterschied zwischen einem Testfall und einer
technischen Notiz ist; dass er die von einer Person verifizierbare Wirkung im Backend enthält,
damit der manuelle Test auch auf die andere Seite des Bildschirms schaut; dass die Fälle im selben
Commit gepflegt werden, genau wie die Dokumentation; und **dass das Modell sie nie ausführt**, denn
vom Modell ausgeführt sind sie ein weiterer Test, und der Witz ist, dass eine Person sie ausführt.

Und was D-082 hinzufügt: dass der Agent **die Bildschirme auf eigene Faust durchgeht**, was die
meisten Oberflächendefekte findet und was die Methode nicht verlangte; und dass die Datei der Fälle
an ihrem Kopf den Unterschied zwischen dem Geschriebenen und dem Ausgeführten trägt, damit ein
Schritt, der mit Schuld vorangeht, **es sagend** vorangeht. Der Durchgang ersetzt die menschliche
Ausführung nicht: er macht sie kürzer, weil die Person nicht mehr auf die Defekte stößt, die der
Agent durch Hinsehen hätte finden können.

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
> the case or the system is the problem.
>
> Then refresh the three declarations at the head of the file: `cases_written`,
> `cases_executed_by_a_person` counted from the signed execution tables and from nothing else, and
> `execution_debt` with who still owes which execution and since when.
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
> Lies die Ausführungen von heute in `docs/MANUAL_TESTS.md`. Für jeden Fall, der fehlgeschlagen
> ist, und für jede lose Anmerkung am Ende der Datei öffne einen korrektiven offenen Posten in
> `docs/PENDING.md` mit den Worten der Person als Art, ihn zu reproduzieren, aufgehängt an dem
> Knoten des semantischen Baums, den er berührt; repariere jetzt nichts. Für jeden Fall, der
> bestanden hat, nichts. Dann sag mir, Fluss für Fluss, wie viele Fälle bestanden haben und wie
> viele fehlgeschlagen sind, verglichen mit der vorherigen Ausführung, und welche Fehlschläge sich
> wiederholen. Wenn ein Fall nicht ausgeführt werden konnte, sag mir warum und ob das Problem der
> Fall oder das System ist.
>
> Dann aktualisiere die drei Erklärungen am Kopf der Datei: `cases_written`,
> `cases_executed_by_a_person`, gezählt aus den abgezeichneten Ausführungstabellen und aus nichts
> sonst, und `execution_debt` mit wem noch welche Ausführung schuldet und seit wann.
>
> Wenn du eine Entscheidung von mir brauchst, stelle die Frage mit den vier Teilen von UX-28
> (`docs/ANEXO_HEURISTICAS.md`) und in dieser Reihenfolge: die Daten, die die Frage nötig machen,
> aufgelistet; ein Absatz von höchstens fünf Zeilen, der sie verbindet und die Frage sichtbar
> macht; die Frage selbst mit ihren möglichen Antworten durchnummeriert; und deine Empfehlung.
> Sage es in der technischen Tiefe, die das Projekt in `communication_depth` erklärt hat
> —`beginner`, `decision_maker` oder `technical`—; hat das Projekt keine erklärt, nimm
> `decision_maker`.
>
> Antworte in meiner Sprache.

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
- `docs/SCREEN_WALKTHROUGH.md` mit dem Durchgang des Agenten: `screens_total`, `screens_walked` und
  `walkthrough_findings`, und jeder Defekt mit seinem Bildschirm, was gesehen wurde, was erwartet
  war und seinem offenen Posten.
- Am Kopf von `docs/MANUAL_TESTS.md` die drei Erklärungen, die ein Tor liest: `cases_written`,
  `cases_executed_by_a_person` — die nur eine abgezeichnete Ausführung bewegt — und
  `execution_debt` auf `none` oder auf `pending_verifier`, mit wem jede Ausführung schuldet und seit
  wann.

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
- Kommt `cases_executed_by_a_person` aus den abgezeichneten Tabellen und nicht aus dem Lesen des
  Agenten? Nimm einen als ausgeführt gezählten Fall und such das Datum und den Namen in seiner
  Tabelle.
- Wenn es Schuld gibt, sagt `execution_debt`, wer sie schuldet und seit wann? Eine Schuld ohne
  Namen ist keine Schuld: sie ist ein Versäumnis mit Formatierung.
- Zählt der Durchgang die Bildschirme, die er nicht öffnen konnte, im Gesamtwert, mit ihrem Grund?
  Ein `screens_walked` gleich dem Gesamtwert, in einem System mit Bildschirmen hinter einem Profil,
  das der Agent nicht hat, ist eine erfundene Zahl.
- Haben die Defekte des Durchgangs ihren offenen Posten, genau wie die menschlichen Fehlschläge?

## 5. Warnsignale

- Der Agent hat die Fälle als ausgeführt markiert. Er hat sie ausgeführt, und das ist dasselbe,
  wie sie nicht auszuführen.
- Die Fälle sind Kopien des automatischen Tests in Prosa. Ein manueller Fall muss ansehen, was der
  Test nicht ansieht: was man sieht, was man versteht, was stört.
- Alle Fälle bestehen in allen Ausführungen. Menschen finden immer etwas; wenn sie nichts finden,
  folgen sie dem Drehbuch nicht, oder das Drehbuch verlangt nicht hinzusehen.
- Die Fehlschläge werden „im Moment repariert“, ohne offenen Posten. Die Worte der Person gehen
  verloren und auch die Spur davon, was sich wiederholt hat.
- Der Schritt erscheint als erfüllt und `cases_executed_by_a_person` steht auf null. Das ist kein
  Fehler: das ist die Schuld, und sie ist im Blickfeld, gerade damit sie nicht als Erfüllung
  gelesen wird.
- Der Durchgang des Agenten fand nichts, und das System hat neue Bildschirme. Durchgehen ist nicht
  Öffnen: wenn es keine Befunde gibt, hat er wahrscheinlich den Bildschirm angesehen und nicht
  benutzt.
- Der Durchgang fängt an, als Ausrede zu dienen, die Fälle nicht auszuführen. Es sind zwei Dinge
  mit zwei Zwecken, und das, was abnimmt, ist das der Person.
