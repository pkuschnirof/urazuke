# Schritt 1 — Die Arbeitsvereinbarung (Schrittvertrag)

**Abschnitt:** Start.
**Wann:** ein einziges Mal, unmittelbar nach der Eignung; wird überarbeitet,
wenn ein Rückschlag es verlangt.
**Form:** ein einziger Durchgang, mit einer Anpassungsrunde von dir.
**Größe:** verpflichtend in jedem Projekt. Es ist der billigste Schritt von allen und der, der am
meisten Frustration vermeidet.

## Wozu er dient

Leg vor der ersten Zeile Code schriftlich fest, wie du und der Agent arbeiten werden. Es sieht aus
wie eine Formalität und ist keine: es ist das, was verhindert, dass der Agent „hilft“, indem er den
Umfang ausweitet, Schulden für später liegen lässt oder als erledigt meldet, was er zu erledigt
glaubt. In meinem Werkzeug heißt diese Datei `SQ.md` (Qualitätsstandards); der Name ist egal, der
Inhalt nicht.

Denk es dir so: der Agent ist ein neuer Mitarbeiter, der jeden Morgen ohne Erinnerung an gestern
ankommt. Die Vereinbarung ist das, was du ihm am ersten Tag sagst, und das, was er jeden Tag
wieder lesen wird. Wenn du sie nicht aufschreibst, wirst du es ihm jedes Mal sagen müssen, und
jedes Mal ein bisschen anders. Ich habe sie zum ersten Mal geschrieben, als ich zwei Wochen lang in
jeder Sitzung dasselbe wiederholt hatte [Ref. 1](../REFERENCIAS.md#ref-1), und nichts von dem, was
ich hineinschrieb, war neu in der Systemtechnik; neu war, es für jemanden ohne Gedächtnis
aufschreiben zu müssen.

## 1. Benötigter Kontext

Was folgt, ist die generische Liste. Die konkreten Dateien, die du vor jedem Prompt fertig haben
musst, mit ihrem Inhalt und ihrem Mindestzustand, stehen in Abschnitt 2, in dem Block „Bevor du
den Prompt schickst“, der jedem einzelnen vorangeht.

- Keiner aus dem Projekt: es ist die erste Datei.
- Von dir: deine Arbeitsvorlieben (Sprache, wie du gefragt werden willst, was du als Verschwendung
  deiner Zeit betrachtest, welches Maß an Autonomie du dem Agenten gibst).

## 2. Prompts

**Zu Beginn:**

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- Nichts vom Projekt: es ist die erste Datei, die geschrieben wird. Wenn du Schritt 0 schon
  gemacht hast, existiert `docs/ELIGIBILITY.md`, und es ist gut, wenn der Agent sie sieht, aber
  nötig ist es nicht.
- Deine Arbeitsvorlieben, vor dem Anfangen durchdacht und in einer kurzen Liste notiert, die du
  zur Hand hast (auf einem Zettel oder in `docs/MY_PREFERENCES.md`, wenn du willst, dass sie im
  Repository bleibt): in welcher Sprache du das Gespräch willst; wie viel er dich fragen soll
  (wenig und mit Empfehlung, oder viel); was du als Verschwendung deiner Zeit ansiehst; wie viel
  Autonomie du ihm gibst (darf er allein committen? darf er allein in die Testumgebung deployen?
  in die Produktion nie?); was du nicht duldest. Der Agent wird dich danach fragen; die Liste ist
  dafür da, dass du in einer Zeile antwortest und nicht improvisierst.
- Der Projektordner angelegt und der Agent darin geöffnet.
- Akzeptabler Mindestzustand: du kannst jede einzelne dieser fünf Fragen beantworten. Die
  Vereinbarung, die dabei herauskommt, wird so gut sein wie deine Antworten.

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
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [de]
> Bevor wir Code schreiben, legen wir die Arbeitsvereinbarung zwischen dir und mir fest. Schreibe
> `docs/WORKING_AGREEMENT.md` mit mindestens diesen Regeln, jede mit einer Zeile, die erklärt, was
> sie verhindert: (1) Meine Zeit ist heilig: frag mich nicht, was du allein lösen kannst, und wenn
> du fragst, frag in Prosa, mit deiner Empfehlung. (2) Null technische Schulden: was bricht, wird
> an der Wurzel behoben, mit seinem Regressionstest, in derselben Sitzung. (3) Exakter Umfang:
> nicht mehr und nicht weniger als verlangt; wenn du etwas anderes siehst, trag es als offenen
> Posten ein, tu es nicht. (4) Die Dokumentation wird im selben Commit wie die Änderung
> aktualisiert. (5) Melde nie als erledigt, was du nicht verifiziert hast; trenne immer, was du
> verifiziert hast, von dem, was du glaubst. (6) Sprich meine Sprache. Füge die Regeln hinzu, die
> dieses Projekt deiner Meinung nach braucht, als Vorschläge markiert. Wenn du etwas darüber
> wissen musst, wie ich arbeite, um das zu schreiben, frag mich.
>
> Wenn du eine Entscheidung von mir brauchst, stelle die Frage mit den vier Teilen von UX-28
> (`docs/ANEXO_HEURISTICAS.md`) und in dieser Reihenfolge: die Daten, die die Frage nötig machen,
> aufgelistet; ein Absatz von höchstens fünf Zeilen, der sie verbindet und die Frage sichtbar
> macht; die Frage selbst mit ihren möglichen Antworten durchnummeriert; und deine Empfehlung.
> Sage es in der technischen Tiefe, die das Projekt in `communication_depth` erklärt hat
> —`beginner`, `decision_maker` oder `technical`—; hat das Projekt keine erklärt, nimm
> `decision_maker`.

Was ich hier verlange: die sechs Mindestregeln, jede mit dem Fehler, den sie verhindert (das ist
es, was sie zu Regeln macht und nicht zu Ratschlägen); dass er projekteigene Regeln vorschlägt,
sie aber als Vorschläge markiert, damit du sie annimmst oder ablehnst; und dass er fragt, was er
über dich wissen muss. Eine Vereinbarung, die ohne eine einzige Frage verfasst wurde, ist
verdächtig: der Agent kennt die Person nicht, mit der er arbeiten wird.

**Zum Abschluss:**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- Der Entwurf von `docs/WORKING_AGREEMENT.md`, den der Agent geschrieben hat, von dir ganz
  gelesen. Für jede Regel, die er vorgeschlagen hat, dein Urteil: du nimmst sie an oder lehnst sie
  ab, und wenn du sie ablehnst, mit einer Begründung in einer Zeile. Das kommt in die Lücken [X,
  Y] und [Z] des Prompts, und die füllst du.
- Die Antworten auf das, was er dich darüber gefragt hat, wie du arbeitest, bereits im Chat
  gegeben.
- Akzeptabler Mindestzustand: keine vorgeschlagene Regel bleibt ohne Urteil. Eine Regel, die du
  weder angenommen noch abgelehnt hast, bleibt in der Vereinbarung, als hättest du sie angenommen.

> I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the
> agreement with today's date and a version number. Then add to the project file the
> instruction to read this agreement at the start of every session.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [de]
> Ich akzeptiere die Regeln 1 bis 6 und deine Vorschläge [X, Y]; ich lehne [Z] ab, weil [Grund].
> Schließe die Vereinbarung mit dem heutigen Datum und einer Versionsnummer ab. Füge dann der
> Projektdatei die Anweisung hinzu, diese Vereinbarung zu Beginn jeder Sitzung zu lesen.
>
> Wenn du eine Entscheidung von mir brauchst, stelle die Frage mit den vier Teilen von UX-28
> (`docs/ANEXO_HEURISTICAS.md`) und in dieser Reihenfolge: die Daten, die die Frage nötig machen,
> aufgelistet; ein Absatz von höchstens fünf Zeilen, der sie verbindet und die Frage sichtbar
> macht; die Frage selbst mit ihren möglichen Antworten durchnummeriert; und deine Empfehlung.
> Sage es in der technischen Tiefe, die das Projekt in `communication_depth` erklärt hat
> —`beginner`, `decision_maker` oder `technical`—; hat das Projekt keine erklärt, nimm
> `decision_maker`.

Was ich hier verlange: dass er die Vereinbarung mit Datum und Version abschließt und sie in die
Projektdatei einhängt, damit sie in jeder Sitzung gelesen wird. Ohne dieses Einhängen existiert die
Vereinbarung, aber sie wirkt nicht.

## 3. Erwartetes Ergebnis

Eine Datei `docs/WORKING_AGREEMENT.md` (oder `SQ.md`, oder `CONTRATO.md`) mit:

- Datum und Version.
- Jeder Regel nummeriert, in ein oder zwei Sätzen, mit dem Fehler, den sie verhindert.
- Den projekteigenen Regeln, als solche markiert.
- Einer Fußzeile, die sagt, dass der Agent Änderungen vorschlägt, die Vereinbarung aber nicht allein
  bearbeitet.

Und eine Zeile in der Projektdatei (`PROJECT.md` oder `CLAUDE.md`), die anordnet, sie zu Beginn
jeder Sitzung zu lesen.

## 4. Vollständigkeitsprüfung

- Sind die sechs Mindestregeln da, jede mit dem Fehler, den sie verhindert?
- Ist irgendeine Regel als Absichtserklärung geschrieben („versuchen, …“, „nach Möglichkeit …“)?
  Wenn ja, taugt sie nichts: Regeln werden eingehalten oder nicht.
- Ordnet die Projektdatei an, sie in jeder Sitzung zu lesen?
- Hat dir der Agent mindestens eine Frage dazu gestellt, wie du arbeitest? Wenn er alles verfasst
  hat, ohne etwas zu fragen, ist das verdächtig: er kennt dich nicht.

## 5. Warnsignale

- Die Vereinbarung hat mehr als zwanzig Regeln. Niemand, weder Mensch noch Modell, hält zwanzig
  Regeln ein; sechs oder acht werden eingehalten.
- Eine Regel sagt „der Agent darf diese Vereinbarung ändern, wenn er es für nötig hält“. Nein.
- Zwei Wochen später tut der Agent etwas, das die Vereinbarung verbietet, und niemand merkt es. Die
  Vereinbarung wird nicht gelesen: prüf das Einhängen in der Projektdatei.
