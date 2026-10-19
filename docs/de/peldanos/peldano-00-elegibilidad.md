# Schritt 0 — Lässt sich dieses Projekt so angehen? (Schrittvertrag)

**Abschnitt:** Start.
**Wann:** ein einziges Mal, bevor das Repository geöffnet wird und vor allem anderen.
**Form:** Gespräch: der Agent bewertet und fragt; du entscheidest.
**Größe:** verpflichtend in jedem Projekt, so klein es auch sei.
**Stand:** die Ausschlusskriterien X1 und X2 sind geschlossen; die gewichtenden Kriterien (D1 bis
D10) kalibriere ich noch und markiere sie als Hypothese.

## Wozu er dient

Steig in kein Projekt ein, in dem die Methode nicht funktionieren kann. Wenn der Agent sich nicht
von Ende zu Ende selbst wird prüfen können, oder wenn es keinen Eigentümer der Domäne gibt, der
entscheidet, verkommt die Methode zu „mit KI programmieren“, und am Ende liest du Code. Dieser
Schritt ist die Eingangstür: man geht einmal hindurch, und wenn man nicht hindurchgeht, weiß man
das besser vorher als nachher.

Und eine Grundidee, die ich dir klar mitgeben will: **die Methode taugt nicht für jedes Projekt,
und das ist kein Mangel**. Eine Methode, die verspricht, für alles zu taugen, sagt gar nichts. Was
dieser Schritt tut, ist die Grenze schriftlich festzulegen, damit die Entscheidung, einzusteigen
oder nicht, eine Entscheidung ist und keine Hoffnung. Die beiden Ausschlusskriterien stammen aus
Projekten, die ich abgelehnt habe, nicht aus denen, die ich angenommen habe
[Ref. 46](../REFERENCIAS.md#ref-46).

## 1. Benötigter Kontext

Was folgt, ist die generische Liste. Die konkreten Dateien, die du vor jedem Prompt fertig haben
musst, mit ihrem Inhalt und ihrem Mindestzustand, stehen in Abschnitt 2, in dem Block „Bevor du
den Prompt schickst“, der jedem einzelnen vorangeht.

Generisch benannt; der Agent bewertet, ob er ausreicht, und fragt nach dem, was fehlt.

- Erhebung der Anfrage: was der Kunde will, für wen, und was heute ohne das System passiert.
- Technologische Erhebung: welche Technologie vorhanden ist oder vorgeschlagen wird, ob es ein
  Vorgängersystem gibt, ob dieses System ein Repository hat und wie es verwaltet wird.
- Erhebung der Testbarkeit: ob die Bildschirme programmatisch ausgeführt werden können und ob
  jedes Element der Oberfläche mit seinen verschiedenen Methoden zugänglich ist (Klick, Tippen,
  Zustand lesen), so dass ein Test den Bildschirm durchläuft und die Wirkung im Backend prüft.
- Wer der Eigentümer der Domäne ist und wie viel Zeit er zum Entscheiden hat.
- Welche Konsequenz ein Fehler hat (Geld, Gesundheit, Betrieb, keine).
- Umgebungen und Zugänge: ob es eine Testumgebung geben wird, ob der Agent Zugang hat, ob es eine
  nur lesend abfragbare Produktion gibt.

## 2. Prompts

Die Prompts sind auf Englisch, der Sprache, in der die Modelle Anweisungen am präzisesten und mit
den wenigsten Tokens befolgen. Jeder bringt seine Übersetzung mit (im HTML über einen Knopf) und
darunter die Erklärung, was ich verlange und warum jede Klausel dort steht. Dem Modell wird das
Englische eingefügt.

**Zu Beginn:**

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- `docs/INITIAL_SURVEY.md`: die Ersterhebung. Du schreibst sie selbst, von Hand, nachdem du mit
  dem Kunden gesprochen hast (sie ist das Ergebnis der Aufnahme aus Phase 0). Eine halbe bis eine
  Seite, in Prosa, nicht als Formular, mit sechs Dingen: (1) die Anfrage: was der Kunde will, mit
  seinen Worten, für wen, und was heute ohne das System passiert (das Heft, die Tabelle, die
  Person, die es von Hand macht); (2) die Technologie: was vorhanden ist oder vorgeschlagen wird,
  ob es ein Vorgängersystem gibt, ob dieses System ein Repository hat und wie es verwaltet wird
  (Branches, wer pusht, ob es Tests gibt); (3) die Testbarkeit: ob die Bildschirme programmatisch
  bedient werden können und ob jedes Element der Oberfläche gefunden, geklickt, getippt und
  gelesen werden kann; wenn du es nicht weißt, sag es; (4) der Eigentümer der Domäne: wer er ist,
  mit Namen und Rolle, und wie viel Zeit er pro Woche zum Entscheiden hat; (5) die Konsequenz
  eines Fehlers: Geld, Gesundheit, Betrieb, keine; (6) die Umgebungen: ob es eine Testumgebung
  geben wird, ob der Agent darauf zugreifen kann, ob es eine nur lesend abfragbare Produktion
  gibt. Was du nicht weißt, bleibt als „ich weiß es nicht“ geschrieben: fülle es nicht selbst aus,
  damit der Agent nicht fragt, denn der Witz dieses Schritts ist zu sehen, was er fragt.
- `docs/ELIGIBILITY_CRITERIA.md`: das Kriterienblatt. Du kopierst es aus dem Hauptdokument (die
  Karte von Schritt 0: die beiden Ausschlusskriterien X1 und X2 und die gewichtenden Kriterien D1
  bis D10), mit einer leeren Spalte für die Antwort, einer für die Quelle und einer für grün oder
  rot. Fülle es nicht selbst aus: das macht der Agent.
- Der Projektordner, angelegt, mit dem Agenten darin geöffnet und noch nichts weiter darin als
  diese beiden Dateien innerhalb von `docs/`.
- Akzeptabler Mindestzustand: die beiden Dateien existieren, die Erhebung berührt die sechs Dinge,
  auch wenn mehrere „ich weiß es nicht“ sagen, und der Agent steht in diesem Ordner.

> We are going to assess whether this project can be run with the Urazuke method. Read the
> initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`. First, evaluate whether the survey is sufficient to answer
> every criterion. If any criterion cannot be answered from the survey, ask me for the missing
> information before going on; do not assume. Then fill in the sheet criterion by criterion:
> the answer, where it comes from, and for each exclusionary criterion whether it is green or
> red. Do not decide: present me the completed sheet with your reading and your doubts, and I
> will decide. Reply in my language.

> [de]
> Wir werden bewerten, ob dieses Projekt mit der Urazuke-Methode angegangen werden kann. Lies die
> Ersterhebung in `docs/INITIAL_SURVEY.md` und das Kriterienblatt in
> `docs/ELIGIBILITY_CRITERIA.md`. Bewerte zuerst, ob die Erhebung ausreicht, um jedes Kriterium
> zu beantworten. Wenn sich ein Kriterium aus der Erhebung nicht beantworten lässt, bitte mich um
> die fehlende Information, bevor du weitermachst; nimm nichts an. Fülle dann das Blatt Kriterium
> für Kriterium aus: die Antwort, woher sie stammt, und für jedes Ausschlusskriterium, ob es grün
> oder rot ist. Entscheide nicht: lege mir das ausgefüllte Blatt mit deiner Lesart und deinen
> Zweifeln vor, und ich entscheide. Antworte in meiner Sprache.

Was ich hier verlange: dass er die beiden Eingaben liest (die Erhebung und das Kriterienblatt);
dass er **vor dem Antworten bewertet, ob die Erhebung ausreicht**, und, wenn sie nicht ausreicht,
fragt statt anzunehmen (das ist die zentrale Klausel aller Prompts der Methode); dass er das Blatt
mit der Quelle jeder Antwort ausfüllt, damit sie sich später nachverfolgen lässt; dass er die
Ausschlusskriterien grün oder rot markiert; und dass er **nicht entscheidet**, weil die Eignung
ich entscheide. Die letzte Zeile bittet ihn, in meiner Sprache zu antworten, denn der Prompt ist
auf Englisch, aber das Gespräch muss es nicht sein.

**Zum Abschluss:**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- Deine Entscheidung, in einer Zeile, getroffen, nachdem du das vollständige Blatt gelesen hast,
  das der Agent vorgelegt hat: go, no-go oder go mit Bedingungen. Wenn es Bedingungen gibt,
  schreib sie auf, bevor du den Prompt einfügst, jede prüfbar („Lesezugang zur Produktion vor
  Schritt 3“ ja; „dass der Kunde mitwirkt“ nein), und nicht mehr als drei.
- Die Antworten, die du auf die Fragen des Agenten gegeben hast, gegeben in genau dieser
  Chat-Sitzung: der Prompt verlangt von ihm, sie in das endgültige Blatt aufzunehmen, und wenn die
  Sitzung eine andere ist, hat er sie nicht.
- Akzeptabler Mindestzustand: jedes Kriterium des Blattes hat eine Antwort und eine sichtbare
  Quelle, und du hast bereits entschieden. Wenn du noch zweifelst, schick den Abschluss nicht:
  frag weiter.

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.

> [de]
> Entscheidung: [go / no-go / go unter diesen Bedingungen: …]. Schreibe das endgültige Blatt nach
> `docs/ELIGIBILITY.md` mit dem Datum, wer entschieden hat, der Antwort auf jedes Kriterium mit
> ihrer Quelle, und den Bedingungen, falls es welche gibt. Nimm die Fragen auf, die du gestellt
> hast, und meine Antworten.

Was ich hier verlange: dass er die Entscheidung schriftlich hinterlässt, mit Datum und
Eigentümer (Schritt 6), mit den Bedingungen, falls es welche gibt, und mit der Spur aus Fragen und
Antworten, die der Beleg dafür ist, dass er nichts angenommen hat.

## 3. Erwartetes Ergebnis

Eine Datei `docs/ELIGIBILITY.md` (oder der Name, den dein Projekt verwendet), eine Seite lang, mit:

- Datum und wer entschieden hat.
- Den beiden Ausschlusskriterien mit ihrer Antwort und ihrer Quelle:
  - X1: es gibt ein zugängliches, standardmäßig verwaltetes Repository (oder das Projekt ist neu).
  - X2: die Oberfläche lässt sich programmatisch ausführen und jedes Element ist mit seinen
    verschiedenen Methoden zugänglich, mit Prüfung der Wirkung im Backend.
- Den gewichtenden Kriterien, jedes mit Antwort, Quelle und Gewicht (sobald das Gewicht kalibriert
  ist).
- Der Entscheidung: go, no-go oder go mit Bedingungen, und die Bedingungen ausgeschrieben.
- Den Fragen, die der Agent gestellt hat, und den Antworten, damit die Spur bleibt.

## 4. Vollständigkeitsprüfung (du machst sie, ohne Code zu lesen)

- Haben die beiden Ausschlusskriterien eine explizite Antwort und eine Quelle? Wenn eines rot ist,
  lautet die Entscheidung „no-go“ oder gibt es eine Bedingung, die es auflöst?
- Ist irgendein Kriterium mit „ich nehme an, ja“ oder „wahrscheinlich“ beantwortet? Wenn ja, ist
  der Schritt nicht erklommen: der Agent hätte fragen müssen.
- Ist die Entscheidung mit Datum und Namen festgehalten?
- Sind die Bedingungen (falls es welche gibt) prüfbar? („Lesezugang zur Produktion vor Schritt 3
  haben“ ja; „dass der Kunde mitwirkt“ nein.)

## 5. Warnsignale

- Der Agent hat das ganze Blatt ausgefüllt, ohne eine einzige Frage zu stellen. Entweder war die
  Erhebung perfekt (das ist sie nie) oder er hat angenommen.
- Die Entscheidung lautet „go mit Bedingungen“ und die Bedingungen sind mehr als drei.
  Wahrscheinlich ist es ein „no-go“, das man nicht aussprechen will.
- Das Kriterium X2 wurde mit „ja, mit ein bisschen Arbeit“ beantwortet. Wenn sich die Bildschirme
  heute nicht programmatisch bedienen lassen, ist dieses „bisschen Arbeit“ das ganze Projekt.
