# Schritt 0 — Lässt sich dieses Projekt so angehen? (Sprossenvertrag)

**Phase:** Start (einmal pro Projekt, vor dem Öffnen des Repositories).
**Form:** Gespräch (der Agent bewertet und fragt; der Eigentümer entscheidet).
**Größe:** verpflichtend in jedem Projekt, so klein es auch sei. Dauert eine Stunde; spart Monate.
**Stand:** in Ausarbeitung mit Pablo. Die Ausschlusskriterien X1 und X2 sind bestätigt; die
gewichteten Kriterien (D1 bis D10) sind noch Hypothesen ohne Gewicht.

## Wozu sie dient

Um sich nicht in ein Projekt zu begeben, in dem die Methode nicht funktionieren kann. Wenn der Agent
sich nicht selbst von Anfang bis Ende verifizieren kann, oder wenn es keinen Fachbereichs-Eigentümer
gibt, der entscheidet, verkommt die Methode zu „Programmieren mit KI“, und der Mensch liest am Ende
Code. Diese Sprosse ist die Eingangstür: man geht einmal hindurch, und wenn man nicht hindurchkommt,
weiß man es besser vorher als nachher.

Es gibt einen Grundgedanken, den man ausdrücklich sagen sollte: **die Methode taugt nicht für jedes
Projekt, und das ist kein Mangel**. Eine Methode, die verspricht, für alles zu taugen, sagt nichts.
Was diese Sprosse tut, ist, die Grenze schriftlich festzuhalten, damit die Entscheidung, einzusteigen
oder nicht, eine Entscheidung ist und keine Hoffnung.

## 1. Benötigter Kontext

Generisch benannt; der Agent bewertet, ob es reicht, und fragt nach dem, was fehlt.

- Erhebung der Anfrage: was der Kunde will, für wen, und was heute ohne das System passiert.
- Technologische Erhebung: welche Technologie existiert oder vorgeschlagen wird, ob es ein
  Vorgängersystem gibt, ob dieses System ein Repository hat und wie es verwaltet wird.
- Erhebung der Testbarkeit: ob die Bildschirme programmatisch bedient werden können und ob jedes
  Element der Oberfläche mit seinen verschiedenen Methoden erreichbar ist (Klick, Eingabe,
  Zustandsabfrage), sodass ein Test den Bildschirm durchläuft und die Wirkung im Backend prüft.
- Wer der Fachbereichs-Eigentümer ist und wie viel Zeit er zum Entscheiden hat.
- Welche Folge ein Fehler hat (Geld, Gesundheit, Betrieb, keine).
- Umgebungen und Zugänge: ob es eine Testumgebung geben wird, ob der Agent darauf zugreifen kann,
  ob die Produktion nur lesend abgefragt werden kann.

## 2. Prompts

Die Prompts sind auf Englisch, der Sprache, in der Modelle Anweisungen am präzisesten und mit den
wenigsten Tokens befolgen. Unter jedem steht die Erklärung auf Deutsch, was wir verlangen und warum
jede Klausel dort steht.

**Eröffnung:**

> We are going to assess whether this project can be run with the Urazuke method. Read the
> initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`. First, evaluate whether the survey is sufficient to answer
> every criterion. If any criterion cannot be answered from the survey, ask me for the missing
> information before going on; do not assume. Then fill in the sheet criterion by criterion:
> the answer, where it comes from, and for each exclusionary criterion whether it is green or
> red. Do not decide: present me the completed sheet with your reading and your doubts, and I
> will decide. Reply in my language.

Was wir verlangen: dass er die beiden Eingaben liest (die Erhebung und das Kriterienblatt); dass er
**vor dem Antworten bewertet, ob die Erhebung ausreicht**, und, wenn nicht, fragt statt anzunehmen
(das ist die zentrale Klausel aller Prompts der Methode); dass er das Blatt mit der Quelle jeder
Antwort ausfüllt, damit sie später nachvollziehbar ist; dass er die Ausschlusskriterien grün oder
rot markiert; und dass er **nicht entscheidet**, weil die Eignung der Eigentümer entscheidet. Die
letzte Zeile bittet ihn, in der Sprache des Eigentümers zu antworten, denn der Prompt ist auf
Englisch, das Gespräch muss es aber nicht sein.

**Abschluss:**

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.

Was wir verlangen: dass die Entscheidung mit Datum und Eigentümer schriftlich festgehalten wird
(Sprosse 6), mit den Bedingungen, falls es welche gibt, und mit der Spur der Fragen und Antworten,
die der Beleg dafür ist, dass nichts angenommen wurde.

## 3. Erwartetes Ergebnis

Eine Datei `docs/ELIGIBILITY.md` (oder der Name, den das Projekt verwendet), eine Seite, mit:

- Datum und wer entschieden hat.
- Die beiden Ausschlusskriterien mit ihrer Antwort und ihrer Quelle:
  - X1: es gibt ein zugängliches, standardmäßig verwaltetes Repository (oder das Projekt ist neu).
  - X2: die Oberfläche lässt sich programmatisch bedienen und jedes Element ist mit seinen
    verschiedenen Methoden erreichbar, mit Prüfung der Wirkung im Backend.
- Die gewichteten Kriterien (D1 bis D10 der Leiter, sobald sie festgelegt sind), jedes mit Antwort,
  Quelle und Gewicht.
- Die Entscheidung: go, no-go oder go unter Bedingungen, mit den Bedingungen schriftlich.
- Die Fragen, die der Agent gestellt hat, und die Antworten, damit die Spur bleibt.

## 4. Vollständigkeitsprüfung (macht der Eigentümer, ohne Code zu lesen)

- Haben die beiden Ausschlusskriterien eine ausdrückliche Antwort und eine Quelle? Wenn eines rot
  ist, lautet die Entscheidung „no-go“, oder gibt es eine Bedingung, die es auflöst?
- Ist ein Kriterium mit „ich nehme an, ja“ oder „wahrscheinlich“ beantwortet? Wenn ja, ist die
  Sprosse nicht erklommen: der Agent hätte fragen müssen.
- Ist die Entscheidung mit Datum und Namen festgehalten?
- Sind die Bedingungen (falls vorhanden) überprüfbar? („Lesezugriff auf die Produktion vor
  Sprosse 3 haben“ ja; „dass der Kunde mitarbeitet“ nein.)

## 5. Warnsignale

- Der Agent hat das ganze Blatt ausgefüllt, ohne eine einzige Frage zu stellen. Entweder war die
  Erhebung perfekt (das ist sie nie) oder er hat angenommen.
- Die Entscheidung lautet „go unter Bedingungen“ und die Bedingungen sind mehr als drei.
  Wahrscheinlich ist es ein „no-go“, das niemand aussprechen will.
- Kriterium X2 wurde mit „ja, mit etwas Arbeit“ beantwortet. Wenn die Bildschirme heute nicht
  programmatisch bedient werden können, ist dieses „etwas Arbeit“ das ganze Projekt.
