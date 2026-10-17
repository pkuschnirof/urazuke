# Schritt 1 — Die Arbeitsvereinbarung (Sprossenvertrag)

**Phase:** Start (einmal pro Projekt; überarbeitet, wenn ein Rückschlag es verlangt).
**Form:** ein einziger Durchgang, mit einer Anpassungsrunde des Eigentümers.
**Größe:** verpflichtend in jedem Projekt. Es ist die billigste Sprosse von allen und die, die am
meisten Frust erspart.

## Wozu sie dient

Damit Mensch und Agent vereinbaren, wie sie arbeiten werden, bevor die erste Codezeile entsteht.
Es sieht nach einer Formalität aus und ist keine: es ist das, was verhindert, dass der Agent
„hilft“, indem er den Umfang ausweitet, Schulden für später liegen lässt oder als erledigt meldet,
was er glaubt erledigt zu haben. In Forge heißt diese Datei `SQ.md` (Qualitätsstandards); der Name
ist egal, der Inhalt nicht.

Eine Art, es zu verstehen: der Agent ist ein neuer Kollege, der jeden Morgen ohne Erinnerung an
gestern ankommt. Die Vereinbarung ist das, was du ihm am ersten Tag sagst und was er jeden Tag
wieder lesen wird. Wenn du es nicht aufschreibst, wirst du es jedes Mal sagen müssen, und jedes Mal
anders.

## 1. Benötigter Kontext

- Nichts aus dem Projekt: es ist die erste Datei.
- Vom Eigentümer: seine Arbeitspräferenzen (Sprache, wie er gefragt werden will, was er als
  Zeitverschwendung ansieht, wie viel Autonomie er dem Agenten gibt).

## 2. Prompts

**Eröffnung:**

> Before we write any code, we are going to set the working agreement between you and me.
> Write `docs/WORKING_AGREEMENT.md` with at least these rules, each with one line explaining
> what it prevents: (1) My time is sacred: do not ask me what you can resolve on your own, and
> when you do ask, ask in prose, with your recommendation. (2) Zero technical debt: whatever
> breaks is fixed at the root, with its regression test, in the same session. (3) Exact scope:
> no more and no less than what was asked; if you see something else, log it as a pending item,
> do not do it. (4) Documentation is updated in the same commit as the change. (5) Never report
> as done something you have not verified; always separate what you verified from what you
> believe. (6) Speak my language. Add any rules you think this project needs, marked as
> proposals. If you need to know something about how I work in order to write this, ask me.

Was wir verlangen: die sechs Mindestregeln, jede mit dem Fehlschlag, den sie verhindert (das macht
sie zu Regeln und nicht zu Ratschlägen); dass er projektspezifische Regeln vorschlägt, sie aber als
Vorschläge markiert, damit der Eigentümer sie annimmt oder ablehnt; und dass er fragt, was er über
den Eigentümer wissen muss. Eine Vereinbarung, die ohne eine einzige Frage verfasst wurde, ist
verdächtig: der Agent kennt die Person nicht, mit der er arbeiten wird.

**Abschluss:**

> I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the
> agreement with today's date and a version number. Then add to the project file the
> instruction to read this agreement at the start of every session.

Was wir verlangen: dass er die Vereinbarung mit Datum und Version abschließt und sie in die
Projektdatei einhängt, damit sie in jeder Sitzung gelesen wird. Ohne diese Einhängung existiert die
Vereinbarung, wirkt aber nicht.

## 3. Erwartetes Ergebnis

Eine Datei `docs/WORKING_AGREEMENT.md` (oder `SQ.md` oder `CONTRATO.md`) mit:

- Datum und Version.
- Jede Regel nummeriert, in ein oder zwei Sätzen, mit dem Fehlschlag, den sie verhindert.
- Die projektspezifischen Regeln, als solche markiert.
- Eine Zeile am Ende, die sagt, dass der Agent Änderungen vorschlägt, die Vereinbarung aber nicht
  allein bearbeitet.

Und eine Zeile in der Projektdatei (`PROJECT.md` oder `CLAUDE.md`), die anordnet, sie zu Beginn
jeder Sitzung zu lesen.

## 4. Vollständigkeitsprüfung

- Sind die sechs Mindestregeln da, jede mit dem Fehlschlag, den sie verhindert?
- Ist eine Regel als Absichtserklärung formuliert („versuchen…“, „nach Möglichkeit…“)? Wenn ja,
  taugt sie nichts: Regeln werden eingehalten oder nicht.
- Ordnet die Projektdatei an, sie in jeder Sitzung zu lesen?
- Hat der Agent dir mindestens eine Frage dazu gestellt, wie du arbeitest? Wenn er alles ohne zu
  fragen verfasst hat, ist das verdächtig: er kennt dich nicht.

## 5. Warnsignale

- Die Vereinbarung hat mehr als zwanzig Regeln. Niemand, weder Mensch noch Modell, hält zwanzig
  Regeln ein; sechs bis acht werden eingehalten.
- Eine Regel sagt „der Agent darf diese Vereinbarung ändern, wann immer er es für nötig hält“.
  Nein.
- Zwei Wochen später tut der Agent etwas, was die Vereinbarung verbietet, und niemand merkt es.
  Die Vereinbarung wird nicht gelesen: prüfe die Einhängung in der Projektdatei.
