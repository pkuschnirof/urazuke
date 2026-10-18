# Schritt 10 — Ehrliche Verifikation und verhältnismäßiger Bericht (Schrittvertrag)

**Abschnitt:** Schleife.
**Wann:** in jedem Bericht, zu jedem offenen Posten, während des ganzen Projekts. Es ist die Form,
die alles haben muss, was der Agent dir sagt.
**Form:** Routine; es ist die Form, die jeder Bericht des Agenten haben muss.
**Größe:** verpflichtend in jedem Projekt, ohne Ausnahmen. Es kostet nichts und ist das, was dem
Eigentümer erlaubt, keinen Code zu lesen.

## Wozu er dient

Wenn du keinen Code lesen wirst, muss der Bericht des Agenten vertrauenswürdig sein. Nicht
optimistisch, nicht „dem Anschein nach vollständig“: vertrauenswürdig. Das ist das genuin Neue an
der Methode: der Autor des Codes stellt auch die Belege her, und er tut das mit derselben
Sicherheit in der Stimme, wenn es richtig ist und wenn es falsch ist. Deshalb muss der Beleg sich
selbst beweisen, und der Bericht muss das Verifizierte vom Geglaubten trennen. Die Regel habe ich im
Juni geschrieben [Ref. 8](../REFERENCIAS.md#ref-8), und ich habe sie im Oktober wieder gebraucht,
als ein Authentifizierungsfehler mit der Aufschrift „success“ gemeldet wurde
[Ref. 43](../REFERENCIAS.md#ref-43).

Versteh, warum das Modell dazu neigt, zu viel zu berichten. Es ist keine böse Absicht: es wurde
darauf trainiert, nützlich und vollständig zu sein, und ein Bericht, der sagt „das konnte ich
nicht verifizieren“, fühlt sich weniger nützlich an als einer, der „erledigt“ sagt. Also
**verlang ausdrücklich** die schlechten Nachrichten, die blinden Flecken und das, was er nicht
getan hat. Wenn du es nicht verlangst, gibt er es dir nicht, nicht weil er es verbirgt, sondern
weil er es nicht als Teil der Antwort betrachtet.

## 1. Benötigter Kontext

- Die erledigte Arbeit und der offene Posten, der sie verlangt hat.
- Die Arbeitsvereinbarung (Schritt 1), die schon verbietet, Nicht-Erledigtes anzukündigen.

## 2. Prompts

**Routine (gehört in die Arbeitsvereinbarung; gilt bei jedem Bericht):**

> When you report, separate three blocks: VERIFIED (what you tested, with the command and its
> output), BELIEVED (what you think works but did not test, and why not), and BLIND SPOTS (what
> you cannot see from where you are: another environment, real data, the user's browser). Cover
> every item I asked for, one by one, even when the answer is "I did not do it". No claim
> without its proof next to it. Do not say "done": say what is done and how you know it. If
> something went wrong, say it first. Reply in my language.

> [de]
> Wenn du berichtest, trenne drei Blöcke: VERIFIZIERT (was du getestet hast, mit dem Befehl und
> seiner Ausgabe), GEGLAUBT (was du für funktionierend hältst, aber nicht getestet hast, und
> warum nicht), und BLINDE FLECKEN (was du von dort, wo du bist, nicht sehen kannst: eine andere
> Umgebung, echte Daten, der Browser des Nutzers). Decke jeden Punkt ab, den ich verlangt habe,
> einen nach dem anderen, auch wenn die Antwort „ich habe es nicht getan“ lautet. Keine
> Behauptung ohne ihren Beweis daneben. Sag nicht „erledigt“: sag, was erledigt ist und woher du
> es weißt. Wenn etwas schiefgegangen ist, sag es zuerst. Antworte in meiner Sprache.

Was ich hier verlange, Klausel für Klausel: die drei Blöcke, die die Struktur sind, die einen
Bericht ehrlich macht (das Verifizierte mit seinem Beweis, das Geglaubte mit dem Grund, warum es
nicht getestet wurde, das, was er nicht sehen kann); die Abdeckung Punkt für Punkt, damit nichts
„vergessen“ wird; den Beweis neben jeder Behauptung; das Verbot des bloßen „erledigt“; und die
schlechten Nachrichten zuerst, denn das Modell neigt dazu, sie für den Schluss oder für nie
aufzuheben.

**Bei einem „ist immer noch kaputt“ von dir:**

> Before diagnosing again, compare the version running where I see the problem with the version
> that contains your fix. Tell me both. If they differ, the problem is publication, not code.

> [de]
> Bevor du erneut diagnostizierst, vergleiche die Version, die dort läuft, wo ich das Problem
> sehe, mit der Version, die deine Behebung enthält. Nenn mir beide. Wenn sie sich unterscheiden,
> ist das Problem die Veröffentlichung, nicht der Code.

Was ich hier verlange: dass er bei einem „ist immer noch kaputt“ nicht von null neu diagnostiziert,
sondern zuerst Versionen vergleicht. Die Hälfte der „ist immer noch kaputt“ sind Behebungen, die
im Repository sind, aber nicht an dem Ort, wo du hinschaust [Ref. 45](../REFERENCIAS.md#ref-45).

## 3. Erwartetes Ergebnis

Jeder Bericht des Agenten mit:

- Den drei Blöcken (verifiziert / geglaubt / blinde Flecken), auch wenn einer leer ist.
- Einer Zeile pro verlangtem Punkt, mit seinem Status.
- Für jedes „verifiziert“: der Befehl und die Ausgabe, oder der Test und sein Ergebnis, oder die
  Zahl und ihr Messgerät.
- Dem, was schiefgegangen ist, am Anfang und nicht am Ende.

## 4. Vollständigkeitsprüfung

- Sind die drei Blöcke da? Wenn „geglaubt“ und „blinde Flecken“ immer leer sind, ist der Agent
  nicht ehrlich: es gibt immer etwas, das er nicht gesehen hat.
- Wähl nach Zufall eine Behauptung aus dem Block „verifiziert“: hat sie ihren Beweis daneben?
  Kannst du ihn reproduzieren?
- Deckt er jeden Punkt dessen ab, was du verlangt hast, oder gibt es einen, der „vergessen“
  wurde?
- Stehen die schlechten Nachrichten am Anfang?
- Hat er irgendwann einfach nur „erledigt“ gesagt? Das ist ein Verstoß gegen die Vereinbarung.

## 5. Warnsignale

- Zehn Berichte in Folge ohne einen einzigen blinden Fleck. Niemand sieht alles; der Block ist aus
  Gewohnheit leer, nicht aus Wahrheit.
- Der Block „verifiziert“ enthält Sätze wie „sollte funktionieren“. Das ist verkleidetes
  „geglaubt“.
- Der Bericht ist länger als die Änderung. Ein verhältnismäßiger Bericht sagt, was zu sagen ist;
  ein aufgeblähter verdeckt etwas mit Volumen.
