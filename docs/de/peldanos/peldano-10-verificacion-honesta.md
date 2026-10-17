# Schritt 10 — Ehrliche Verifikation und verhältnismäßiger Bericht (Sprossenvertrag)

**Phase:** Schleife (beim Schließen jeder Änderung).
**Form:** Routine; es ist die Form, die jeder Bericht des Agenten haben muss.
**Größe:** verpflichtend in jedem Projekt, ohne Ausnahme. Es kostet nichts und ist das, was es dem
Eigentümer erlaubt, keinen Code zu lesen.

## Wozu sie dient

Wenn der Eigentümer keinen Code lesen wird, muss der Bericht des Agenten vertrauenswürdig sein.
Nicht optimistisch, nicht „dem Anschein nach vollständig“: vertrauenswürdig. Das ist das wirklich
Neue an der Methode: der Autor des Codes stellt auch den Beleg her, und er tut es mit derselben
Sicherheit in der Stimme, wenn er recht hat und wenn er sich irrt. Deshalb muss der Beleg sich
selbst beweisen, und der Bericht muss das Verifizierte vom Geglaubten trennen.

Man muss verstehen, warum das Modell dazu neigt, zu viel zu berichten. Es ist keine Böswilligkeit:
es wurde darauf trainiert, hilfreich und vollständig zu sein, und ein Bericht, der sagt „das konnte
ich nicht verifizieren“, fühlt sich weniger hilfreich an als einer, der „fertig“ sagt. Also muss
man **ausdrücklich verlangen**: die schlechten Nachrichten, die blinden Flecken und das, was es
nicht getan hat. Wenn du es nicht verlangst, gibt es sie dir nicht, nicht weil es sie verbirgt,
sondern weil es sie nicht als Teil der Antwort betrachtet.

## 1. Benötigter Kontext

- Die geleistete Arbeit und der offene Posten, der sie verlangte.
- Die Arbeitsvereinbarung (Sprosse 1), die schon verbietet, Nichtgetanes zu verkünden.

## 2. Prompts

**Routine (gehört in die Arbeitsvereinbarung; gilt für jeden Bericht):**

> When you report, separate three blocks: VERIFIED (what you tested, with the command and its
> output), BELIEVED (what you think works but did not test, and why not), and BLIND SPOTS (what
> you cannot see from where you are: another environment, real data, the user's browser). Cover
> every item I asked for, one by one, even when the answer is "I did not do it". No claim
> without its proof next to it. Do not say "done": say what is done and how you know it. If
> something went wrong, say it first. Reply in my language.

Was wir verlangen, Klausel für Klausel: die drei Blöcke, die die Struktur sind, die einen Bericht
ehrlich macht (das Verifizierte mit seinem Beleg, das Geglaubte mit dem Grund, warum es nicht
geprüft wurde, das, was man nicht sehen kann); die Abdeckung Punkt für Punkt, damit nichts
„vergessen“ wird; der Beleg neben jeder Behauptung; das Verbot des bloßen „fertig“; und die
schlechten Nachrichten zuerst, denn das Modell neigt dazu, sie für den Schluss oder für nie
aufzuheben.

**Bei einem „es ist immer noch kaputt“ des Eigentümers:**

> Before diagnosing again, compare the version running where I see the problem with the version
> that contains your fix. Tell me both. If they differ, the problem is publication, not code.

Was wir verlangen: dass er bei „immer noch kaputt“ nicht von vorn diagnostiziert, sondern zuerst
Versionen vergleicht. Die Hälfte der „immer noch kaputt“ sind Behebungen, die im Repository sind,
aber nicht dort, wo der Eigentümer hinschaut.

## 3. Erwartetes Ergebnis

Jeder Bericht des Agenten mit:

- Den drei Blöcken (verifiziert / geglaubt / blinde Flecken), auch wenn einer leer ist.
- Einer Zeile pro verlangtem Punkt, mit seinem Status.
- Für jedes „verifiziert“: dem Befehl und der Ausgabe, oder dem Test und seinem Ergebnis, oder der
  Zahl und ihrem Messgerät.
- Dem, was schiefging, am Anfang und nicht am Ende.

## 4. Vollständigkeitsprüfung

- Sind die drei Blöcke da? Wenn „geglaubt“ und „blinde Flecken“ immer leer sind, ist der Agent
  nicht ehrlich: es gibt immer etwas, das er nicht gesehen hat.
- Wähle eine Behauptung aus dem Block „verifiziert“ nach Zufall: steht ihr Beleg daneben? Kannst
  du ihn reproduzieren?
- Deckt er jeden Punkt ab, den du verlangt hast, oder wurde einer „vergessen“?
- Stehen die schlechten Nachrichten am Anfang?
- Hat er je ein bloßes „fertig“ gesagt? Das ist ein Verstoß gegen die Vereinbarung.

## 5. Warnsignale

- Zehn Berichte in Folge ohne einen einzigen blinden Fleck. Niemand sieht alles; der Block ist aus
  Gewohnheit leer, nicht aus Wahrheit.
- Der Block „verifiziert“ enthält Sätze wie „es sollte funktionieren“. Das ist verkleidetes
  „geglaubt“.
- Der Bericht ist länger als die Änderung. Ein verhältnismäßiger Bericht sagt, was zu sagen ist;
  ein aufgeblähter deckt etwas mit Volumen zu.
