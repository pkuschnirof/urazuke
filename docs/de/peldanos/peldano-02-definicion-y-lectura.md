# Schritt 2 — Die Projektdefinition und die Pflichtlektüre (Sprossenvertrag)

**Phase:** Start (einmal; während des ganzen Projekts aktuell gehalten).
**Form:** Gespräch (der Agent entwirft, fragt nach dem Fehlenden, der Eigentümer korrigiert).
**Größe:** verpflichtend in jedem Projekt. In einem kleinen kann die Projektdatei fünfzig Zeilen
haben; was sie nicht kann, ist nicht existieren.

## Wozu sie dient

Jede Sitzung des Agenten beginnt bei null: er erinnert sich nicht an gestern. Also braucht er eine
Karte, eine kurze, die ihm sagt, was das Projekt ist, in welchem Zustand es ist und welche
Entscheidungen schon getroffen wurden. Und er braucht die Pflicht, sie zu lesen, bevor er irgendetwas
anfasst. Der Fehlschlag, den sie verhindert, ist doppelt: Wegwerfarbeit, weil die Karte nicht
gelesen wurde, und die Karte, die wächst, bis sie unlesbar ist (in einem der Ursprungssysteme
erreichte die Projektdatei 9.661 Zeilen, und in diesem Zustand liest sie niemand, auch das Modell
nicht).

Die praktische Regel aus diesem Rückschlag: **die Projektdatei ist das Programm, nicht die
Geschichte**. Was passiert ist, gehört woandershin (das Register der offenen Posten, der lebende
Status, das Journal); die Projektdatei sagt, was das System ist, für wen, was es nicht ist, und was
entschieden wurde.

## 1. Benötigter Kontext

- Erhebung des Geschäfts: was der Kunde tut, wer das System nutzt, welches Problem es löst, was
  es nicht tun darf.
- Die Arbeitsvereinbarung (Sprosse 1).
- Falls ein Vorgängersystem existiert: Lesezugriff auf seinen Code oder seine Dokumentation.
- Die bereits getroffenen Entscheidungen, falls vorhanden, auch wenn nur mündlich.

## 2. Prompts

**Eröffnung:**

> We are going to define the project in writing. Read the business survey in
> `docs/INITIAL_SURVEY.md` and the working agreement in `docs/WORKING_AGREEMENT.md`. Evaluate
> whether the survey is sufficient to describe the system, its users and its boundaries; if it
> is not, ask me for what is missing before writing anything. Then write `PROJECT.md`, three
> hundred lines at most, with: what the system is and for whom; what it is NOT; the main
> modules as a list; the decisions already made, each with its date; and the instruction to
> read this file and the working agreement at the start of every session. Separately, create
> `docs/STATUS.md` for the living state (what is being worked on, what is open): that file
> changes every day; `PROJECT.md` almost never does. Reply in my language.

Was wir verlangen: dass er die Erhebung bewertet und fragt, bevor er entwirft; dass die
Projektdatei **kurz** ist (die Obergrenze von dreihundert Zeilen ist willkürlich, aber nötig: ohne
Obergrenze wächst sie); dass er ausdrücklich sagt, was das System **nicht** ist, weil das Ungesagte
das ist, was das Modell erfinden wird; dass die Entscheidungen ein Datum haben; und dass er den
lebenden Status in eine andere Datei auslagert, damit die Projektdatei nicht zur Geschichte wird.

**Abschluss:**

> Apply these corrections: [list]. Finalize `PROJECT.md` with today's date. Add to the working
> agreement that the change history never goes into `PROJECT.md`: it goes to `docs/STATUS.md`
> or to the pending-items register.

Was wir verlangen: die Korrekturen des Eigentümers, das Datum und eine neue Regel in der
Vereinbarung, die die Projektdatei davor schützt, zum Changelog zu werden. Diese Regel fehlte im
Fall der 9.661 Zeilen.

## 3. Erwartetes Ergebnis

- `PROJECT.md` (oder `CLAUDE.md`): kurz, Pflichtlektüre, mit was es ist, für wen, was es nicht ist,
  Module, Entscheidungen mit Datum, und der Anweisung, es zu lesen. Höchstens dreihundert Zeilen.
- `docs/STATUS.md`: lebender Status, getrennt vom Vorigen.
- In beiden ein Datum der letzten Aktualisierung.
- In der Vereinbarung die Regel, dass die Geschichte nicht in `PROJECT.md` gehört.

## 4. Vollständigkeitsprüfung

- Lässt sich `PROJECT.md` in fünf Minuten lesen? Wenn nicht, ist es falsch: es ist das Programm,
  nicht die Geschichte.
- Sagt es ausdrücklich, was das System NICHT tut? (Was fehlt, wird der Agent erfinden.)
- Hat jede Entscheidung ein Datum und den, der sie getroffen hat?
- Hat der Agent etwas zum Geschäft gefragt, bevor er entwarf? Wenn er nichts gefragt hat, prüfe,
  was er angenommen hat.
- Ist der lebende Status in einer anderen Datei?

## 5. Warnsignale

- Die Projektdatei ist in einem Monat um mehr als 20 % gewachsen. Etwas, das kein Programm ist,
  kommt hinein.
- Der Agent beginnt eine Sitzung und schlägt etwas vor, das schon entschieden und aufgeschrieben
  ist. Er hat die Karte nicht gelesen: die Einhängung der Pflichtlektüre hat versagt.
- Der Abschnitt „was es nicht ist“ ist leer oder sagt „nichts Besonderes“. Jedes System hat
  Grenzen; wenn sie nicht aufgeschrieben sind, wird das Modell sie überschreiten.
