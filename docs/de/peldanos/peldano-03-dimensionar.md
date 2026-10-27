# Schritt 3 — Dimensionieren, bevor die Architektur entworfen wird (Schrittvertrag)

**Abschnitt:** Start.
**Wann:** einmal, nach der Definition und bevor das Skelett gebaut wird; wird
neu gemacht, wenn das Geschäft seine Größenordnung ändert.
**Form:** Gespräch: der Agent rechnet und legt Optionen vor; du wählst.
**Größe:** immer verpflichtend, aber proportional: in einem kleinen Projekt kann die Dimensionierung
eine halbe Seite und eine einzige Entscheidung sein („passt jahrelang in SQLite“). Was sie nicht
kann, ist nicht gemacht zu werden, denn die Frage „wie stark wird es wachsen?“ kostet fünf Minuten
und die falsche Antwort kostet Wochen.

## Wozu er dient

Triff die strukturellen Entscheidungen —welche Datenbank-Engine, ob die Schnittstelle synchron
oder asynchron ist, wie viel Nebenläufigkeit— mit Zahlen und nicht nach Geschmack. Es ist der
Schritt, dessen Überspringen am teuersten kommt, und ich sage das aus eigener Erfahrung: in einem
meiner Systeme habe ich mit JSON-Dateien angefangen, und als ich maß, stellte sich heraus, dass es
3,4 Millionen Zeilen pro Jahr erzeugen würde; die Schnittstelle danach zu ändern kostete eine ganze
Etappe der Neuentwicklung [Ref. 15](../REFERENCIAS.md#ref-15).

Es gibt einen Schlüsselpunkt, den du im Kopf behalten solltest: **es gibt Daten, die nur das
Geschäft hat** (wie viele Entitäten, wie viele Ereignisse pro Entität, wie viele Operatoren in der
Spitze, wie lange aufbewahrt werden muss), und das Modell kann sie nicht erschließen. Was es
erschließen kann, ist das Abgeleitete. Deshalb verlangt der Prompt von ihm, zu bewerten, ob die
Primärdaten vollständig sind, und die fehlenden zu erfragen, statt sie mit sicherer Miene zu
schätzen. Wer weiß, was ihm zum Rechnen fehlt, ist das Modell, nicht ein Formular.

Und eine zweite Idee, die du mitnehmen sollst: die **asymmetrischen Entscheidungen**. Es gibt
Entscheidungen, die sehr wenig kosten, wenn du sie triffst und sie sich als unnötig erweisen, und
sehr viel, wenn du sie nicht triffst und sie sich als nötig erweisen. Die Persistenzschnittstelle
asynchron ab der ersten Zeile ist das kanonische Beispiel: wenn die Engine am Ende synchron ist,
war ein `await` zu viel; wenn sie am Ende asynchron ist und du es nicht vorgesehen hast, muss alles
neu geschrieben werden. Diese Entscheidungen triff immer, wenn sie billig sind, auch wenn sie heute
nicht nötig sind.

## 1. Benötigter Kontext

Was folgt, ist die generische Liste. Die konkreten Dateien, die du vor jedem Prompt fertig haben
musst, mit ihrem Inhalt und ihrem Mindestzustand, stehen in Abschnitt 2, in dem Block „Bevor du
den Prompt schickst“, der jedem einzelnen vorangeht.

- **Erhebung der Mengendaten** des Geschäfts, so generisch benannt: Hauptentitäten und ihr
  Wachstum, Ereignisse pro Entität, gleichzeitige Operatoren und Zeitpunkt der Spitze,
  Aufbewahrungsdauer der Daten, Ausnahmelasten (Kampagnen, Abschlüsse), erwartetes Wachstum. Die
  Erhebung ist von Natur aus unvollständig; der Agent bewertet und fragt.
- Wenn es ein Vorgängersystem gibt: Lesezugang zu seiner Datenbank, um echte Zahlen statt
  Schätzungen zu holen.
- `PROJECT.md` und der semantische Baum (Schritt 2): die Entitäten des Baums sind die, die
  dimensioniert werden müssen.

## 2. Prompts

**Zu Beginn:**

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- `docs/VOLUME_SURVEY.md`: die Erhebung der Mengendaten, geschrieben mit dem Eigentümer der Domäne
  (oder mit dir selbst, wenn das Projekt deines ist). Für jede Hauptentität des semantischen
  Baums: wie viele es heute gibt, wie viele pro Monat dazukommen, wie viele Ereignisse jede
  erzeugt (ein Termin erzeugt drei Nachrichten; eine Genehmigung erzeugt so und so viele
  Abfragen); wie viele Personen zur Spitzenzeit arbeiten und wann die Spitze ist; wie lange die
  Daten aufbewahrt werden; welche außergewöhnlichen Lasten es gibt (Kampagnen, Monatsabschlüsse,
  der Montag nach einem Feiertag); welches Wachstum sie erwarten und ob sich das System an andere
  verkaufen ließe. Und das Wichtigste: für jede Zahl, woher sie kommt („das hat die Leiterin
  gesagt“, „im Heft vom September gezählt“, „angenommen“). Annahmen werden als Annahmen markiert;
  sie werden nicht als Daten verkleidet.
- `PROJECT.md` und `docs/SEMANTIC_TREE.md` (Schritt 2), geschlossen: die Entitäten, die
  dimensioniert werden müssen, sind die des Baums.
- Wenn es ein Vorgängersystem mit Datenbank gibt: ein nur lesender Zugang, damit der Agent echte
  Zahlen zieht statt Schätzungen, mit der Verbindungszeichenfolge außerhalb des Repositorys und
  dem Namen der Variablen in der Erhebung notiert.
- Akzeptabler Mindestzustand: jede Entität des Baums hat mindestens eine Zahl mit ihrer Quelle,
  auch wenn mehrere „angenommen“ sagen. Der Agent wird dich nach den Annahmen fragen; diese
  Nachfrage ist der Schritt, der funktioniert.

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
> Bevor wir irgendeine Architektur vorschlagen, dimensionieren wir das System. Lies `PROJECT.md`
> und die Mengenerhebung in `docs/VOLUME_SURVEY.md`. Unterscheide Primärdaten (Fakten, die nur
> das Geschäft kennt) von abgeleiteten Daten (was sich aus den Primärdaten berechnen lässt).
> Bewerte, ob die Primärdaten vollständig genug sind, um das Folgende zu berechnen; wenn eine
> Primärzahl fehlt oder als Annahme markiert ist, bitte mich um alle fehlenden Zahlen, bevor du
> weitermachst. Schätze nie eine Primärzahl. Wenn ein Vorgängersystem abgefragt werden kann,
> verwende seine echten Zahlen und gib an, woher jede stammt. Mit vollständigen Primärdaten
> berechne, mit sichtbarer Rechnung: Zeilen pro Jahr für die drei größten Tabellen,
> Nebenläufigkeit in der Spitze, Datenvolumen nach fünf Jahren, und was zuerst bricht, wenn alles
> mit zehn multipliziert wird. Lege dann drei Optionen für Persistenz und Nebenläufigkeit vor,
> jede mit den Kosten, später zu den anderen zu migrieren. Wähle nicht: ich wähle. Schreibe
> keinen Code.
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

Was ich hier verlange, Klausel für Klausel: Primärdaten von abgeleiteten unterscheiden (das ist
die Unterscheidung, die die Erfindung verhindert); **die fehlenden Primärdaten erfragen und sie
nie schätzen**; echte Zahlen des Vorgängersystems verwenden, wenn es eines gibt, mit ihrer Quelle;
das Abgeleitete mit sichtbarer Rechnung berechnen, damit du sie nachrechnen kannst; das Szenario
„mal zehn“, das zeigt, was zuerst bricht; drei Optionen mit den Kosten, zwischen ihnen zu
migrieren, denn die Entscheidung ist nicht nur „welche“, sondern „wie viel kostet es, sich zu
irren“; und dass er weder wählt noch Code schreibt, denn dieser Schritt ist einer der Entscheidung,
nicht des Bauens.

**Zum Abschluss:**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- Die drei Optionen, die der Agent vorgelegt hat, gelesen, und mindestens eine Rechnung von dir
  von Hand nachgerechnet (zum Beispiel Zeilen pro Jahr der größten Tabelle): sie muss dasselbe
  ergeben.
- Die Primärdaten, die er von dir verlangt hat, wirklich beschafft (im Heft gezählt, beim
  Eigentümer nachgefragt) und im Chat gegeben; keines von dir geschätzt, um aus der Sache
  herauszukommen.
- Deine Wahl, mit dem Buchstaben der Option und einer Begründung in einer Zeile, von dir
  entschieden und, wenn es einen Eigentümer gibt, mit ihm.
- Akzeptabler Mindestzustand: die nachgerechnete Rechnung stimmt überein, die Annahmen sind zu
  Daten mit Quelle geworden, und die Option ist gewählt. Wenn die Rechnung nicht übereinstimmt,
  schließ nicht ab: frag.

> I choose option [B]. Record in `docs/SIZING.md`: the primary data with its source, the derived
> data with its arithmetic, the three options, the chosen one and why, and the decisions we are
> taking "just in case" even though they are not needed today (for example: the persistence
> interface is asynchronous from line one, even if the first engine is synchronous). Include the
> questions you asked and my answers.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [de]
> Ich wähle Option [B]. Halte in `docs/SIZING.md` fest: die Primärdaten mit ihrer Quelle, die
> abgeleiteten Daten mit ihrer Rechnung, die drei Optionen, die gewählte und warum, und die
> Entscheidungen, die wir „vorsichtshalber“ treffen, obwohl sie heute nicht nötig sind (zum
> Beispiel: die Persistenzschnittstelle ist ab der ersten Zeile asynchron, auch wenn die erste
> Engine synchron ist). Nimm die Fragen auf, die du gestellt hast, und meine Antworten.
>
> Wenn du eine Entscheidung von mir brauchst, stelle die Frage mit den vier Teilen von UX-28
> (`docs/ANEXO_HEURISTICAS.md`) und in dieser Reihenfolge: die Daten, die die Frage nötig machen,
> aufgelistet; ein Absatz von höchstens fünf Zeilen, der sie verbindet und die Frage sichtbar
> macht; die Frage selbst mit ihren möglichen Antworten durchnummeriert; und deine Empfehlung.
> Sage es in der technischen Tiefe, die das Projekt in `communication_depth` erklärt hat
> —`beginner`, `decision_maker` oder `technical`—; hat das Projekt keine erklärt, nimm
> `decision_maker`.

Was ich hier verlange: die vollständige Aufzeichnung, mit Quellen und Rechnungen; die gewählte
Option und den Grund; und die asymmetrischen Entscheidungen ausgeschrieben, denn wenn sie implizit
bleiben, werden sie nicht eingehalten.

## 3. Erwartetes Ergebnis

Eine Datei `docs/SIZING.md` mit:

- Datum und wer entschieden hat.
- Tabelle der Primärdaten: Wert, Quelle (vom Geschäft mitgeteilt / im Vorgängersystem gemessen),
  Datum. Keiner mit Quelle „Annahme“.
- Tabelle der abgeleiteten Daten: Wert, aus welchen Primärdaten er stammt, die Rechnung.
- Das Szenario „mal zehn“: was zuerst bricht.
- Die drei nummerierten Optionen, mit den Kosten, zwischen ihnen zu migrieren.
- Die gewählte und der Grund, in ein oder zwei Sätzen.
- Die asymmetrischen Entscheidungen, aufgelistet.
- Die Fragen, die der Agent gestellt hat, und die Antworten.

## 4. Vollständigkeitsprüfung

- Gibt es ein Primärdatum mit Quelle „Annahme“ oder ohne Quelle? Wenn ja, ist der Schritt nicht
  erklommen: der Agent hätte es erfragen müssen.
- Zeigt jedes abgeleitete Datum, aus welchen Primärdaten es stammt und mit welcher Rechnung? Kannst
  du eine Rechnung von Hand nachrechnen, und sie stimmt?
- Gibt es drei Optionen und eine gewählte mit schriftlichem Grund?
- Sagt es, was passiert, wenn die Menge mit zehn multipliziert wird?
- Sind die asymmetrischen Entscheidungen aufgeschrieben, oder blieben sie implizit?
- Hat der Agent gefragt? Wenn er Zahlen vorgelegt hat, ohne eine einzige Frage gestellt zu haben,
  sei misstrauisch.

## 5. Warnsignale

- Die drei Optionsszenarien führen zur selben Schlussfolgerung. Der Agent hatte schon gewählt und
  die anderen zwei der Form halber gebaut.
- Eine abgeleitete Zahl hat mehr Präzision als die Primärdaten, aus denen sie stammt („1.234.567
  Zeilen“ aus „etwa 5.000 Familien“). Die Präzision ist falsch.
- Das Szenario „mal zehn“ sagt „passiert nichts“. Es passiert immer etwas; wenn er es nicht
  gefunden hat, hat er nicht gesucht.
