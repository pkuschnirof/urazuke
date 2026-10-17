# Schritt 4 — Das Skelett mit seinen Toren (Sprossenvertrag)

**Phase:** Start (einmal).
**Form:** ein einziger langer Durchgang, mit visueller Freigabe des Eigentümers am Ende.
**Größe:** verpflichtend in jedem Projekt, das Nutzer haben wird. Bei einem Wegwerf-Prototyp kann
man es überspringen; aber wenn der Prototyp überlebt (sie überleben immer), ist diese Sprosse das
Erste, was zu bezahlen ist.

## Wozu sie dient

Damit das System startet, getestet und LEER ausgerollt wird, bevor es Funktionalität hat. Das
Deployment am Ende zu entdecken ist sehr teuer: in Kikan kam es einen Monat nach dem Start und
kostete fünf offene Posten in Folge. Wenn das Skelett in der ersten Woche ausgerollt wird, treffen
diese Schläge bei null Funktionalität im Spiel.

Der allgemeine Gedanke dahinter: **der Weg in die Produktion ist Teil des Produkts**, keine
Formalität am Ende. Ein System, das auf dem Rechner des Programmierers läuft und nicht ausgerollt
werden kann, ist kein System; es ist eine Demo. Und die einzige Art zu wissen, dass der Weg
funktioniert, ist, ihn zu gehen, wenn noch nichts zu verlieren ist.

## 1. Benötigter Kontext

- `docs/SIZING.md` (Sprosse 3): die gewählte Option bestimmt das Skelett.
- Erhebung der Umgebungen: wo es laufen wird (Cloud, eigener Server), ob es eine Test- und eine
  Produktionsumgebung gibt, wer Zugang hat, wie heute ausgerollt wird, falls etwas existiert.
- Die Art des Projekts: neu (Greenfield), Korrektur oder Weiterentwicklung von Bestehendem.

## 2. Prompts

**Eröffnung:**

> We are going to build the skeleton of the system, with no functionality at all. Read
> `PROJECT.md`, `docs/SIZING.md` and the environments survey. Evaluate whether you have what is
> needed for the skeleton to run in the test environment (access, URL, deployment method); if
> anything is missing, ask me before starting. Then build: the folder structure; the server and
> the UI starting up; the test structure with one smoke test that passes; continuous
> integration running that test suite on every push; and the deployment to the test
> environment. Declare the gates of the workflow (what must be green to move from one stage to
> the next) in `docs/GATES.md`. When done, take a screenshot of the empty UI running in the
> test environment and show it to me. Do not add any functionality "while you are at it".
> Reply in my language.

Was wir verlangen: dass er vor dem Start prüft, ob er die Zugänge hat (ohne das bleibt das Skelett
auf dem Rechner des Agenten); die genaue Liste dessen, was ein Skelett ist (Struktur, Start, ein
Test, Continuous Integration, Deployment nach Test); die Tore schriftlich; einen echten Screenshot
der Testumgebung, der der einzige gültige Beleg dafür ist, dass ausgerollt wurde; und das
ausdrückliche Verbot, Funktionalität hinzuzufügen, denn das Modell neigt zum „wo ich schon dabei
bin“, und das bricht den exakten Umfang.

**Abschluss:**

> Skeleton approved. Record in `docs/STATUS.md` the test environment URL, the command to run
> the tests and the command to deploy, and mark this step as done. Then run the deployment a
> second time and show me that the second run changed nothing.

Was wir verlangen: die drei Befehle dort zu hinterlassen, wo die nächste Sitzung sie findet, und
zu beweisen, dass das Deployment wiederholbar ist (es zweimal laufen lassen, ohne etwas zu
brechen). Dieser zweite Lauf ist der Beweis, dass das Verfahren ein Verfahren ist und kein Glück.

## 3. Erwartetes Ergebnis

- Das Repository mit der Struktur, dem startenden Server und Bildschirm.
- Ein Smoke-Test in Grün und die Batterie in Continuous Integration laufend (mit dem Link zum
  grünen Lauf).
- Das Deployment in die Testumgebung funktionierend, mit der URL, und zweimal gelaufen.
- `docs/GATES.md`: die Liste der Tore, jedes mit der Bedingung zum Passieren.
- Ein Screenshot des leeren Systems in der Testumgebung.
- `docs/STATUS.md` aktualisiert mit den drei Befehlen (starten, testen, ausrollen).

## 4. Vollständigkeitsprüfung

- Kannst du die URL der Testumgebung öffnen und den leeren Bildschirm sehen? (Du tust das, nicht
  der Agent.)
- Gibt es einen Link zu einem grünen Continuous-Integration-Lauf?
- Wurde das Deployment zweimal ausgeführt, und hat der zweite Lauf nichts gebrochen?
- Sind die Tore mit je einer überprüfbaren Bedingung aufgeschrieben?
- Gibt es Funktionalität, die du nicht verlangt hast? Wenn ja, hat der Agent den exakten Umfang
  verletzt.

## 5. Warnsignale

- Das Skelett „läuft lokal“, aber das Deployment „sehen wir später“. Nein: das Deployment ist das
  Skelett.
- Der Screenshot stammt vom Rechner des Agenten, nicht aus der Testumgebung. Verlange die URL.
- Die Tore sagen Dinge wie „der Code hat gute Qualität“. Ein Tor ist eine überprüfbare Bedingung:
  „die Batterie ist grün“, „das Deployment nach Test hat funktioniert“.
