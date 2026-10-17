# Schritt 3 — Dimensionieren, bevor die Architektur entworfen wird (Sprossenvertrag)

**Phase:** Start (einmal; wird wiederholt, wenn das Geschäft die Größenordnung wechselt).
**Form:** Gespräch (der Agent rechnet und präsentiert Optionen; der Eigentümer wählt).
**Größe:** immer verpflichtend, aber proportional: in einem kleinen Projekt kann die
Dimensionierung eine halbe Seite und eine einzige Entscheidung sein („passt jahrelang in SQLite“).
Was sie nicht kann, ist übersprungen werden, denn die Frage „wie sehr wird es wachsen?“ kostet fünf
Minuten und die falsche Antwort kostet Wochen.

## Wozu sie dient

Damit die strukturellen Entscheidungen — welche Datenbank-Engine, ob die Schnittstelle synchron oder
asynchron ist, wie viel Nebenläufigkeit — mit Zahlen getroffen werden und nicht nach Geschmack. Es
ist die teuerste Sprosse zum Überspringen: in Kikan begann man mit JSON-Dateien, und als gemessen
wurde, stellte sich heraus, dass das System 3,4 Millionen Zeilen pro Jahr erzeugte; die
Schnittstelle danach zu ändern kostete eine ganze Etappe der Neuentwicklung.

Ein Schlüsselpunkt, der beim Ausarbeiten dieses Vertrags auftauchte: **es gibt Daten, die nur das
Geschäft hat** (wie viele Entitäten, wie viele Ereignisse pro Entität, wie viele Bediener zur
Spitzenzeit, wie lange aufbewahren), und das Modell kann sie nicht herleiten. Was es herleiten kann,
ist das Abgeleitete. Deshalb verlangt der Prompt, dass es bewertet, ob die Primärdaten vollständig
sind, und die fehlenden erfragt, statt sie mit sicherer Miene zu schätzen. Wer weiß, was ihm zum
Rechnen fehlt, ist das Modell, nicht ein Formular.

Und ein zweiter Gedanke, der es wert ist, benannt zu werden: die **asymmetrischen Entscheidungen**.
Es gibt Entscheidungen, die sehr wenig kosten, wenn du sie triffst und sie sich als unnötig
erweisen, und sehr viel, wenn du sie nicht triffst und sie sich als nötig erweisen. Die
Persistenzschnittstelle asynchron ab Zeile eins ist das kanonische Beispiel: wenn die Engine am Ende
synchron ist, war ein `await` zu viel; wenn sie asynchron wird und du es nicht vorgesehen hast, muss
alles neu geschrieben werden. Diese Entscheidungen trifft man immer, wenn sie billig sind, auch wenn
sie heute nicht nötig sind.

## 1. Benötigter Kontext

- **Erhebung der Mengendaten** des Geschäfts, generisch so benannt: Hauptentitäten und ihr
  Wachstum, Ereignisse pro Entität, gleichzeitige Bediener und Spitzenzeit, Aufbewahrungsdauer der
  Daten, Sonderlasten (Kampagnen, Abschlüsse), erwartetes Wachstum. Die Erhebung ist von Natur aus
  unvollständig; der Agent bewertet und fragt.
- Falls ein Vorgängersystem existiert: Lesezugriff auf seine Datenbank, um echte Zahlen statt
  Schätzungen zu holen.
- `PROJECT.md` (Sprosse 2).

## 2. Prompts

**Eröffnung:**

> Before proposing any architecture we are going to size the system. Read `PROJECT.md` and the
> volume survey in `docs/VOLUME_SURVEY.md`. Distinguish primary data (facts only the business
> knows) from derived data (what can be computed from the primary data). Evaluate whether the
> primary data is complete enough to compute what follows; if any primary figure is missing, or
> is marked as an assumption, ask me for all the missing figures before going on. Never estimate
> a primary figure. If a previous system can be queried, use its real numbers and state where
> each came from. With the primary data complete, compute, showing the arithmetic: rows per year
> for the three largest tables, peak concurrency, data size at five years, and what breaks first
> if everything is multiplied by ten. Then present three options for persistence and concurrency,
> each with the cost of migrating to the others later. Do not choose: I choose. Do not write code.
> Reply in my language.

Was wir verlangen, Klausel für Klausel: Primär- von abgeleiteten Daten unterscheiden (die
Unterscheidung, die das Erfinden verhindert); **die fehlenden Primärdaten erfragen und nie
schätzen**; echte Zahlen des Vorgängersystems verwenden, wenn es eines gibt, mit ihrer Quelle; das
Abgeleitete mit sichtbarer Rechnung berechnen, damit der Eigentümer sie nachrechnen kann; das
„mal zehn“-Szenario, das zeigt, was zuerst bricht; drei Optionen mit den Kosten der Migration
zwischen ihnen, denn die Entscheidung ist nicht nur „welche“, sondern „was kostet ein Irrtum“; und
dass er weder wählt noch Code schreibt, denn diese Sprosse ist eine Entscheidungs-, keine
Bausprosse.

**Abschluss:**

> I choose option [B]. Record in `docs/SIZING.md`: the primary data with its source, the derived
> data with its arithmetic, the three options, the chosen one and why, and the decisions we are
> taking "just in case" even though they are not needed today (for example: the persistence
> interface is asynchronous from line one, even if the first engine is synchronous). Include the
> questions you asked and my answers.

Was wir verlangen: die vollständige Aufzeichnung mit Quellen und Rechnungen; die gewählte Option
und den Grund; und die asymmetrischen Entscheidungen schriftlich, denn wenn sie implizit bleiben,
werden sie nicht eingehalten.

## 3. Erwartetes Ergebnis

Eine Datei `docs/SIZING.md` mit:

- Datum und wer entschieden hat.
- Tabelle der Primärdaten: Wert, Quelle (vom Geschäft genannt / im Vorgängersystem gemessen),
  Datum. Keiner mit Quelle „Annahme“.
- Tabelle der abgeleiteten Daten: Wert, aus welchen Primärdaten er stammt, die Rechnung.
- Das „mal zehn“-Szenario: was zuerst bricht.
- Die drei nummerierten Optionen mit den Kosten der Migration zwischen ihnen.
- Die gewählte und der Grund, in ein oder zwei Sätzen.
- Die asymmetrischen Entscheidungen (billig, wenn du dich irrst, sehr teuer, wenn du sie nicht
  triffst), aufgelistet.
- Die Fragen, die der Agent gestellt hat, und die Antworten.

## 4. Vollständigkeitsprüfung

- Gibt es ein Primärdatum mit Quelle „Annahme“ oder ohne Quelle? Wenn ja, ist die Sprosse nicht
  erklommen: der Agent hätte es erfragen müssen.
- Zeigt jedes abgeleitete Datum, aus welchen Primärdaten es stammt und mit welcher Rechnung?
  Kannst du eine Rechnung von Hand nachvollziehen und kommst auf dasselbe?
- Gibt es drei Optionen und eine gewählte mit schriftlichem Grund?
- Sagt es, was passiert, wenn die Menge sich verzehnfacht?
- Sind die asymmetrischen Entscheidungen aufgeschrieben, oder blieben sie implizit?
- Hat der Agent gefragt? Wenn er Zahlen vorgelegt hat, ohne eine einzige Frage gestellt zu haben,
  sei misstrauisch.

## 5. Warnsignale

- Alle drei Optionen führen zum selben Schluss. Der Agent hatte schon gewählt und die anderen
  beiden zum Schein aufgesetzt.
- Ein abgeleiteter Wert hat mehr Präzision als die Primärdaten, aus denen er stammt („1.234.567
  Zeilen“ aus „etwa 5.000 Familien“). Die Präzision ist falsch.
- Das „mal zehn“-Szenario sagt „nichts passiert“. Es passiert immer etwas; wenn er es nicht
  gefunden hat, hat er nicht gesucht.
