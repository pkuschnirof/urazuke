# Schritt 9 — Messen vor dem Bauen, mit einem Instrument, das selbst geprüft wird (Sprossenvertrag)

**Phase:** Schleife (jedes Mal, wenn eine Zahl eine Entscheidung speist).
**Form:** ein Durchgang pro Messung; manchmal ein Gespräch, wenn die Hypothese vom Eigentümer
stammt.
**Größe:** proportional. In einem kleinen Projekt kann „messen“ heißen, mit einem Befehl zu zählen
und die Zahl mit Datum zu notieren; die Ratsche und das Abfragebudget sind für Systeme mit Volumen.
Was sich mit der Größe nicht ändert: keine Zahl, die etwas entscheidet, stammt aus einem Eindruck.

## Wozu sie dient

Damit jede Zahl, die eine Entscheidung speist, aus einem Programm mit Test stammt und nicht aus
einer Textsuche, einem Eindruck oder „ich glaube, es sind so um die hundert“. Und damit das
Instrument selbst geprüft wird, denn Messgeräte lügen: in Kikan sah eines 84 Aufrufe nicht, mit dem
Zähler auf null, und ein anderes sagte 27, als es 44 waren. Die fünf Regeln lauten: Messgerät mit
Schutz; wenn das Instrument nicht existiert, wird es gebaut; in beide Richtungen prüfen;
Näherungen markieren; und wer ausführt, prüft die Zahlen dessen, der geplant hat.

Es gibt einen tiefen Grund für diese Sprosse: das Modell ist sehr gut darin, Behauptungen mit Zahl
zu produzieren („es gibt etwa 120 Schleifen dieser Art“), und diese Behauptungen klingen genau
gleich, ob gemessen oder geschätzt. Der Eigentümer hat keine Möglichkeit, sie am Ton zu
unterscheiden. Die einzige Art ist, das Instrument zu verlangen: „womit hast du es gemessen? zeig
mir den Befehl“. Wenn es keinen Befehl gibt, ist es ein Eindruck, so viele Dezimalstellen er auch
hat.

## 1. Benötigter Kontext

- Die Hypothese, vom Eigentümer oder vom Agenten: „ich glaube, das Problem ist X“, „es müssen so
  um die hundert sein“.
- Zugang zu dem, was gemessen werden soll: der Code, die Datenbank nur lesend, das Log.
- Die Messgeräte, die es im Repository schon gibt, falls vorhanden.

## 2. Prompts

**Eröffnung:**

> Before building anything, we are going to measure. The hypothesis is: [X]. Write a meter (a
> script that lives in the repository) that measures [the quantity], and a test for the meter
> that checks it against a known case where the answer is known in advance. If measuring
> requires access or data you lack, ask me; do not approximate silently. If some part can only
> be approximated, mark it as approximate and tell me the margin. Run the meter, show me the
> number together with the command that produces it, and audit it in both directions: from the
> code to the measurement (is everything that should be counted, counted?) and from the
> measurement to the code (does everything counted actually exist?). Only then propose what to
> build. Reply in my language.

Was wir verlangen, Klausel für Klausel: das Messgerät **im Repository** (keinen losen Befehl, der
verloren geht); den **Test des Messgeräts** gegen einen bekannten Fall (den Schutz); die
Vollständigkeitsklausel in ihrer Messform (den Zugang erfragen, nicht stillschweigend nähern);
Näherungen mit ihrer Spanne markieren; die Zahl **mit dem Befehl**, der sie erzeugt, damit der
Eigentümer ihn ausführen kann; die Prüfung in beide Richtungen, die die beiden lügenden Messgeräte
enttarnt hat; und die Reihenfolge: erst messen, dann vorschlagen.

**Wenn es ein Budget gibt:**

> Set the budget for [queries / loops / time] on this path at the measured value plus a small
> margin, and protect it with a test that fails if it is exceeded. Tell me the number and the
> margin.

Was wir verlangen: dass das Budget das Gemessene plus wenig ist, keine runde Zahl, und dass es einen
Test hat, der fehlschlägt, wenn es überschritten wird. So taucht eine Leistungsregression in der
Batterie auf und nicht in der Produktion.

**Wenn der Planende Zahlen geliefert hat (Regel fünf):**

> Before executing the plan, verify every number the plan asserts with the meter. If any does
> not match, stop and tell me; do not execute on a wrong number.

Was wir verlangen: dass der Ausführende den Zahlen des Planenden nicht vertraut, auch wenn es
dasselbe Modell in einer anderen Sitzung ist. In Kikan waren drei von vier Behauptungen des Plans
falsch; wo ein Instrument existierte, war die Zahl exakt.

## 3. Erwartetes Ergebnis

- Das Messgerät im Repository (`tools/measure_*.py`, `scripts/meter-*.mjs` oder ähnlich), mit
  seinem Test.
- Die Zahl, mit dem Befehl, der sie erzeugt, und dem Datum.
- Die Prüfung in beide Richtungen, in zwei oder drei Zeilen aufgeschrieben.
- Näherungen als solche markiert, mit ihrer Spanne.
- Falls es ein Budget gibt: der Wert, die Spanne und der Test, der es schützt.
- Im Commit: „measured: [number] with [meter]“.

## 4. Vollständigkeitsprüfung

- Kannst du selbst den Befehl des Messgeräts ausführen und bekommst dieselbe Zahl? (Du führst ihn
  aus; du musst ihn nicht verstehen, nur ausführen.)
- Hat das Messgerät einen Test? Gegen welchen bekannten Fall?
- Gibt es im Bericht eine Zahl ohne Messgerät dahinter? Frag, woher sie stammt.
- Sind Näherungen markiert?
- Falls der Plan Zahlen enthielt, hat der Agent sie vor der Ausführung geprüft und dir gesagt,
  welche nicht stimmten?

## 5. Warnsignale

- Eine Zahl hat sich zwischen zwei Berichten geändert, ohne dass der Code sich geändert hat. Eine
  der beiden wurde nicht gemessen.
- Das Messgerät zeigt null. Es ist fast nie null; fast immer sieht das Messgerät etwas nicht (in
  Kikan zweimal).
- Der Agent schlägt vor, „während des Messens“ zu bauen, um Zeit zu sparen. Die Reihenfolge ist
  die Methode: erst die Zahl, dann der Plan.
