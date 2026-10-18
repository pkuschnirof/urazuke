# Schritt 2 — Die Projektdefinition, der semantische Baum und die Pflichtlektüre (Schrittvertrag)

**Abschnitt:** Start.
**Wann:** wird einmal geschrieben, in der ersten Woche, nach der Vereinbarung; der semantische
Baum und der lebende Zustand werden während des ganzen Projekts gepflegt, mit jedem Block und jeder
neuen Entscheidung.
**Form:** Gespräch: der Agent verfasst, fragt nach dem, was fehlt, du korrigierst.
**Größe:** verpflichtend in jedem Projekt. In einem kleinen kann die Projektdatei fünfzig Zeilen
haben und der semantische Baum zwanzig Knoten; was sie nicht können, ist nicht zu existieren.

## Wozu er dient

Jede Sitzung des Agenten beginnt bei null: er erinnert sich nicht an gestern. Gib ihm eine Karte,
kurz, die ihm sagt, was das Projekt ist, in welchem Zustand es ist und welche Entscheidungen
schon getroffen wurden, und zwing ihn, sie zu lesen, bevor er irgendetwas anfasst. Der Fehler, den
das verhindert, ist ein doppelter: wegwerfbare Arbeit, weil die Karte nicht gelesen wurde
[Ref. 9](../REFERENCIAS.md#ref-9), und die Karte, die wächst, bis sie unlesbar wird
[Ref. 41](../REFERENCIAS.md#ref-41). Die praktische Regel: **die Projektdatei ist das Programm,
nicht die Historie**. Was passiert ist, gehört woandershin.

Die Karte hat zwei Teile, und der zweite ist der, der die meiste Arbeit leistet. Der erste ist die
Projektdatei: was das System ist, für wen, was es NICHT ist, die getroffenen Entscheidungen. Der
zweite ist der **semantische Baum**: das System als Baum zerlegt, mit den Domänen und unter jeder
ihre Akteure, ihre Prozesse (die Anwendungsfälle), ihre Entitäten mit ihren Zuständen, ihre
Bildschirme und ihre Integrationen; und an jedem Knoten hängen die offenen Posten und die
Entscheidungen, die ihn betreffen. Der Baum entsteht aus der Erhebung, die du mit den klassischen
Methoden der Anforderungstechnik gemacht hast (Interviews, Anwendungsfälle, Domänenmodell), der
Agent baut ihn, du korrigierst ihn, und er ist das, was dem Modell den exakten Kontext des Knotens
gibt, den es anfassen wird, ohne das ganze Projekt lesen zu müssen. Und er ist das, was dir
erlaubt, ohne Code zu lesen zu prüfen, dass das System, das der Agent versteht, das ist, das das
Geschäft verlangt hat.

## 1. Benötigter Kontext

Was folgt, ist die generische Liste. Die konkreten Dateien, die du vor jedem Prompt fertig haben
musst, mit ihrem Inhalt und ihrem Mindestzustand, stehen in Abschnitt 2, in dem Block „Bevor du
den Prompt schickst“, der jedem einzelnen vorangeht.

- Erhebung des Geschäfts: was der Kunde tut, wer das System benutzt, welches Problem es löst, was
  es nicht tun soll. Mit den Interviews, den Anwendungsfällen oder User Stories, die du benennen
  kannst, und den Entitäten des Geschäfts mit ihren Zuständen, auch wenn sie unvollständig sind.
- Die Arbeitsvereinbarung (Schritt 1).
- Wenn es ein Vorgängersystem gibt: Lesezugang zu seinem Code oder seiner Dokumentation.
- Die schon getroffenen Entscheidungen, falls es welche gibt, und sei es mündlich.

## 2. Prompts

**Zu Beginn:**

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- `docs/INITIAL_SURVEY.md` (Schritt 0), ergänzt um die Erhebung des Geschäfts. Du schreibst sie
  aus den Interviews der Aufnahme; wenn du eine Methode benutzt hast (Interviews, Anwendungsfälle,
  User Stories, Bildschirmprototypen), sag welche und füge das Ergebnis ein. Sie muss enthalten:
  was der Kunde macht; wer das System benutzt (die Akteure, mit Rollennamen); welches Problem es
  löst; was es NICHT tun soll, in einem eigenen Abschnitt, und sei es mit zwei Punkten; die
  Anwendungsfälle oder User Stories, die der Eigentümer nennt, mit seinen Worten, und seien es
  zehn Zeilen; die Entitäten des Geschäfts mit ihren Zuständen („ein Termin ist offen, bestätigt,
  storniert“), auch wenn sie unvollständig sind; die Zeichnungen oder die Fotos der Bildschirme,
  falls es welche gibt; die externen Integrationen (Messaging, Zahlungen, ein anderes System); und
  die bereits getroffenen Entscheidungen, auch wenn sie mündlich waren, mit Datum und mit dem, der
  sie getroffen hat.
- `docs/WORKING_AGREEMENT.md` (Schritt 1), geschlossen mit Datum und Version.
- Wenn es ein Vorgängersystem gibt: Lesezugang zu seinem Code oder zu seiner Dokumentation, mit
  dem Pfad oder dem Link in der Erhebung notiert.
- Akzeptabler Mindestzustand: die Erhebung hat den Abschnitt „was es NICHT ist“ mit mindestens
  zwei Punkten, mindestens einen Anwendungsfall mit den Worten des Eigentümers, und mindestens
  eine Entität mit ihren Zuständen. Ohne das wird der Baum, der herauskommt, erfunden sein, und du
  wirst nichts haben, womit du ihn vergleichen kannst.

> We are going to define the project in writing. Read the business survey in
> `docs/INITIAL_SURVEY.md` and the working agreement in `docs/WORKING_AGREEMENT.md`. Evaluate
> whether the survey is sufficient to describe the system, its users, its domain and its
> boundaries; if it is not, ask me for what is missing before writing anything. Then write two
> things. First, `PROJECT.md`, three hundred lines at most, with: what the system is and for
> whom; what it is NOT; the main modules as a list; the decisions already made, each with its
> date; and the instruction to read this file and the semantic tree at the start of every
> session. Second, `docs/SEMANTIC_TREE.md`: the system as a tree, with the domains at the top
> level and, under each one, its actors, its processes (the use cases, each with actor, trigger,
> steps, outcome and exceptions), its entities with their attributes, states and transitions,
> its screens, and its external integrations. Mark every node you inferred rather than read in
> the survey, so that I can confirm or correct it. Separately, create `docs/STATUS.md` for the
> living state (what is being worked on, what is open): that file changes every day; the other
> two change only when the system changes. Reply in my language.

> [de]
> Wir werden das Projekt schriftlich definieren. Lies die Geschäftserhebung in
> `docs/INITIAL_SURVEY.md` und die Arbeitsvereinbarung in `docs/WORKING_AGREEMENT.md`. Bewerte,
> ob die Erhebung ausreicht, um das System, seine Nutzer, seine Domäne und seine Grenzen zu
> beschreiben; wenn nicht, bitte mich um das Fehlende, bevor du irgendetwas schreibst. Schreibe
> dann zwei Dinge. Erstens `PROJECT.md`, höchstens dreihundert Zeilen, mit: was das System ist
> und für wen; was es NICHT ist; die Hauptmodule als Liste; die bereits getroffenen
> Entscheidungen, jede mit ihrem Datum; und die Anweisung, diese Datei und den semantischen Baum
> zu Beginn jeder Sitzung zu lesen. Zweitens `docs/SEMANTIC_TREE.md`: das System als Baum, mit
> den Domänen auf der obersten Ebene und unter jeder ihre Akteure, ihre Prozesse (die
> Anwendungsfälle, jeder mit Akteur, Auslöser, Schritten, Ergebnis und Ausnahmen), ihre Entitäten
> mit ihren Attributen, Zuständen und Übergängen, ihre Bildschirme und ihre externen
> Integrationen. Markiere jeden Knoten, den du erschlossen statt in der Erhebung gelesen hast,
> damit ich ihn bestätigen oder korrigieren kann. Lege getrennt davon `docs/STATUS.md` für den
> lebenden Zustand an (woran gearbeitet wird, was offen ist): diese Datei ändert sich jeden Tag;
> die anderen beiden ändern sich nur, wenn sich das System ändert. Antworte in meiner Sprache.

Was ich hier verlange: dass er die Erhebung bewertet und fragt, bevor er verfasst; dass die
Projektdatei **kurz** ist (die Obergrenze von dreihundert Zeilen ist willkürlich, aber nötig: ohne
Obergrenze wächst sie); dass sie explizit sagt, was das System **nicht** ist, denn was nicht gesagt
ist, wird das Modell erfinden; dass die Entscheidungen ein Datum haben; dass er den
**semantischen Baum** mit der vollständigen Struktur baut (Domänen, Akteure, Anwendungsfälle mit
ihren Teilen, Entitäten mit Zuständen und Übergängen, Bildschirme, Integrationen), der das
Domänenmodell der Anforderungstechnik in Baumform ist; dass er **markiert, was er erschlossen
hat**, denn dort verstecken sich die Erfindungen; und dass er den lebenden Zustand in eine andere
Datei trennt, damit die Karte nicht zur Historie wird.

**Zum Abschluss:**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- `PROJECT.md`, von dir ganz gelesen (es muss in fünf Minuten hineingehen), mit deinen notierten
  Korrekturen: was nicht stimmt, was nicht deins ist, was zu viel ist.
- `docs/SEMANTIC_TREE.md`, Knoten für Knoten durchgegangen, als wärst du der Kunde: jeder als
  erschlossen markierte Knoten hat dein Urteil (bestätigt oder korrigiert), und du hast die
  fehlenden Akteure notiert, die Zustände, die das Geschäft nicht benutzt, die Bildschirme, die
  niemand verlangt hat.
- Die Liste der Korrekturen, geschrieben, die in die Lücke [list] des Prompts kommt. Wenn die
  Liste beim ersten Mal leer ist, misstraue deiner Lesart, nicht dem Agenten.
- Akzeptabler Mindestzustand: kein als „erschlossen“ markierter Knoten bleibt ohne dein Urteil.

> Apply these corrections: [list]. Finalize `PROJECT.md` and `docs/SEMANTIC_TREE.md` with
> today's date. Add to the working agreement two rules: the change history never goes into
> `PROJECT.md` (it goes to `docs/STATUS.md` or to the pending-items register); and every pending
> item must hang from a node of the semantic tree, and the tree is updated in the same commit
> whenever a block adds or changes a node.

> [de]
> Wende diese Korrekturen an: [Liste]. Schließe `PROJECT.md` und `docs/SEMANTIC_TREE.md` mit dem
> heutigen Datum ab. Füge der Arbeitsvereinbarung zwei Regeln hinzu: die Änderungshistorie kommt
> nie in `PROJECT.md` (sie geht nach `docs/STATUS.md` oder ins Register der offenen Posten); und
> jeder offene Posten muss an einem Knoten des semantischen Baums hängen, und der Baum wird im
> selben Commit aktualisiert, wann immer ein Block einen Knoten hinzufügt oder ändert.

Was ich hier verlange: deine Korrekturen (vor allem an den Knoten, die er als erschlossen
markiert hat), das Datum, und zwei neue Regeln in der Vereinbarung: die, die die Projektdatei
davor schützt, zur Historie zu werden, und die, die jeden offenen Posten an einen Knoten des Baums
bindet, was den Baum lebendig hält und dir erlaubt, in zehn Sekunden einen offenen Posten außerhalb
des Umfangs zu erkennen.

## 3. Erwartetes Ergebnis

- `PROJECT.md` (oder `CLAUDE.md`): kurz, Pflichtlektüre, mit was es ist, für wen, was es nicht
  ist, Modulen, Entscheidungen mit Datum, und der Anweisung, sie zusammen mit dem Baum zu lesen.
  Höchstens dreihundert Zeilen.
- `docs/SEMANTIC_TREE.md`: der semantische Baum, mit den erschlossenen Knoten markiert, bis du sie
  bestätigst, und, ab dem ersten Block, den offenen Posten und Entscheidungen an ihren Knoten.
- `docs/STATUS.md`: lebender Zustand, getrennt von den vorigen.
- In allen dreien ein Datum der letzten Aktualisierung.
- In der Vereinbarung die zwei neuen Regeln.

## 4. Vollständigkeitsprüfung

- Passt `PROJECT.md` in eine Lektüre von fünf Minuten? Wenn nicht, ist es falsch: es ist das
  Programm, nicht die Historie.
- Sagt es explizit, was das System NICHT tut? (Was fehlt, ist das, was der Agent erfinden wird.)
- Geh den semantischen Baum durch, als wärst du der Kunde: sind alle Akteure da, die du kennst?
  Hat jede Entität die Zustände, die das Geschäft verwendet, nicht mehr und nicht weniger? Gibt es
  einen Knoten, den du nicht erkennst? Das ist eine Erfindung: korrigier ihn jetzt.
- Sind die erschlossenen Knoten markiert? Hast du sie alle bestätigt oder korrigiert?
- Hat jede Entscheidung ein Datum und wer sie getroffen hat?
- Hat der Agent etwas über das Geschäft gefragt, bevor er verfasst hat? Wenn er nichts gefragt
  hat, prüf, was er angenommen hat.
- Ist der lebende Zustand in einer anderen Datei?
- Die Leseprobe: schließ die Sitzung, öffne eine neue und frag ihn, was das System NICHT tut und
  an welchem Knoten des Baums ein bestimmter Bildschirm hängt. Wenn er mit der Karte antwortet,
  funktioniert das Einhängen.

## 5. Warnsignale

- Die Projektdatei ist in einem Monat um mehr als 20 % gewachsen. Etwas, das kein Programm ist,
  kommt hinein.
- Der Agent beginnt eine Sitzung damit, etwas vorzuschlagen, das schon entschieden und
  aufgeschrieben ist. Er hat die Karte nicht gelesen: das Einhängen der Pflichtlektüre hat
  versagt.
- Der Abschnitt „was es nicht ist“ ist leer oder sagt „nichts Besonderes“. Jedes System hat
  Grenzen; wenn sie nicht aufgeschrieben sind, wird das Modell sie überschreiten.
- Es gibt offene Posten, die an keinem Knoten des Baums hängen. Entweder ist der Baum veraltet oder
  diese Posten liegen außerhalb des Umfangs; beides muss man sich ansehen.
- Eine Entität des Baums hat einen Zustand, den das Geschäft nie benannt hat. Das Modell hat ihn
  erfunden, weil er ihm logisch erschien, und wird darauf bauen.
