# Schritt 7 — Tests als Sperren, rot bewiesen (Sprossenvertrag)

**Phase:** Schleife (jede Änderung).
**Form:** ein einziger Durchgang; der Agent führt aus und berichtet, der Eigentümer liest den
Bericht.
**Größe:** verpflichtend in jedem Projekt. Es ist das Herz der Methode: wenn es eine Sprosse gibt,
die nicht verhandelbar ist, dann diese.

## Wozu sie dient

Bei einem Test, den du nie hast fehlschlagen sehen, weißt du nicht, ob er etwas beweist. Die Regel
lautet hier nicht „schreib Tests“: sie lautet „zeig, dass der Test gegen den alten Code rot wird,
und dann grün mit dem neuen“. Sie verhindert Tests, die bestehen, weil sie nichts beweisen, und das
Grün, das einen Bug verbirgt.

Warum das bei einem Modell wichtiger ist als bei einem menschlichen Programmierer: das Modell
schreibt den Code und den Test **in derselben Sitzung, mit demselben Verständnis**. Wenn es die
Anfrage falsch verstanden hat, prüft der Test, was es verstanden hat, und er besteht. Das Rot gegen
den alten Code ist die einzige billige Art zu prüfen, dass der Test auf das schaut, was zählt: wenn
der alte Code ihn besteht, unterscheidet der Test nicht das Vorher vom Nachher, und dann taugt er
nichts.

## 1. Benötigter Kontext

- Die bereits umgesetzte Änderung (standardmäßig kommen die Tests nach der Umsetzung; „Test
  zuerst“ bleibt eine Option für kleine, gut abgegrenzte Umfänge).
- Der offene Posten, der die Änderung auslöst, mit seinem „wie wird geprüft“.
- Die bestehende Batterie und der Befehl, sie laufen zu lassen (Sprosse 4).

## 2. Prompts

**Routine (gehört in die Arbeitsvereinbarung; gilt bei jeder Änderung):**

> To close this pending item I need evidence, not your word. (1) Write the test that proves what
> the item asks for. (2) Demonstrate that this test fails against the previous code: you may
> temporarily revert the change, or run the test against the old version, but show me the red
> output. (3) Show me the green output with the change. (4) Run the regression suite for the
> neighbouring items and show me it is still green. (5) Do not replace with mocks the very part
> you are trying to test. If testing end to end requires something you lack (data, access, an
> environment), ask me for it; do not simulate what you do not have. Finally, the commit message
> says "proved red against [what]" and the test counts.

Was wir verlangen, Klausel für Klausel: (1) den Test; (2) **das bewiesene Rot**, mit sichtbarer
Ausgabe, das ist die Klausel, die diese Methode von „schreib Tests“ unterscheidet; (3) das Grün; (4)
die Regression der Nachbarn in derselben Sitzung, weil eine Änderung Dinge nebenan bricht; (5)
nicht genau das mocken, was geprüft wird; und die Vollständigkeitsklausel, an diese Sprosse
angepasst: wenn etwas fehlt, um Ende-zu-Ende zu testen, **es erfragen, nicht simulieren**. Die
Commit-Nachricht mit den Zahlen hinterlässt den Beleg dort, wo der Code lebt.

**Wenn der Agent sagt, es lasse sich nicht testen:**

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

Was wir verlangen: dass „es lässt sich nicht testen“ nicht das Ende des Gesprächs ist, sondern der
Anfang eines offenen Postens. Nicht-Testbarkeit ist Schuld, und Schuld wird festgehalten.

## 3. Erwartetes Ergebnis

- Der neue Test im Repository, benannt nach dem Posten, den er schließt.
- Im Bericht des Agenten und in der Commit-Nachricht: die rote Ausgabe (wie viele fehlschlagen,
  gegen welche Version), die grüne Ausgabe und die Regression in Grün mit ihren Zahlen.
- Falls Ende-zu-Ende getestet wurde (Bildschirm → Backend), der Beleg, dass das Backend sich
  geändert hat (die Zeile, der Datensatz, der Zustand).

## 4. Vollständigkeitsprüfung

- Zeigt der Bericht das Rot? Mit Zahlen: „4 von 8 schlagen gegen das alte Kriterium fehl“. Wenn er
  nur Grün zeigt, ist die Sprosse nicht erklommen.
- Lief die Regression in derselben Sitzung? Wie viele Tests, wie viele grün?
- Ist ein Teil genau dort „simuliert“ (gemockt), wo die Änderung liegt? Frag den Agenten, was er
  simuliert hat und warum.
- Zitiert der Commit den Posten und sagt er „rot bewiesen“?
- Wenn der Test ein Bildschirmtest ist, prüft er auch die Wirkung im Backend?

## 5. Warnsignale

- Alle neuen Tests der Woche sind auf Anhieb grün geworden, und nie wurde ein Rot gezeigt.
  Entweder überspringt der Agent den Schritt, oder die Tests beweisen nichts.
- Die Batterie dauert immer länger und niemand weiß, warum. Meist wurden die Ende-zu-Ende-Tests
  durch Simulationen ersetzt, „damit es schnell läuft“.
- Der Agent berichtet „die Tests bestehen“, ohne zu sagen, wie viele. Immer mit Zahlen.
