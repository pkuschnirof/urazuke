# Schritt 7 — Tests als Sperren, rot bewiesen (Schrittvertrag)

**Abschnitt:** Schleife.
**Wann:** mit jedem offenen Posten, beim Schließen: der Test in Rot und in Grün, die Regression der
Nachbarn und der Ende-zu-Ende-Test des berührten Flusses. Die vollständige Ende-zu-Ende-Batterie
aller Flüsse beim Abschluss jedes Blocks und vor jedem Deployment in die Produktion.
**Form:** ein einziger Durchgang; der Agent führt aus und berichtet, du liest den Bericht.
**Größe:** verpflichtend in jedem Projekt. Es ist das Herz der Methode: wenn es einen Schritt gibt,
der nicht verhandelbar ist, dann dieser.

## Wozu er dient

Von einem Test, den du nie hast fehlschlagen sehen, weißt du nicht, ob er etwas beweist. Die Regel
hier lautet nicht „schreib Tests“: sie lautet „beweise, dass der Test gegen den alten Code rot wird,
und danach grün mit dem neuen“. Das verhindert die Tests, die bestehen, weil sie nichts prüfen, und
das Grün, das einen Bug versteckt [Ref. 44](../REFERENCIAS.md#ref-44).

Warum das mit einem Modell wichtiger ist als mit einem menschlichen Programmierer: das Modell
schreibt den Code und den Test **in derselben Sitzung, mit demselben Verständnis**. Wenn es die
Anfrage falsch verstanden hat, wird der Test prüfen, was es verstanden hat, und er wird bestehen.
Das Rot gegen den alten Code ist die einzige billige Art zu prüfen, dass der Test auf das schaut,
was zählt: wenn der alte Code ihn besteht, unterscheidet der Test das Vorher nicht vom Nachher,
und dann taugt er nichts. Der Fall, der das am besten zeigt, ist der der Zähler, die nicht
übereinstimmten [Ref. 26](../REFERENCIAS.md#ref-26).

Und die zweite Hälfte: die Ende-zu-Ende-Tests. Ein Test, der vom Bildschirm aus prüft (klickt,
tippt, liest) und die Wirkung im Backend kontrolliert (die Zeile ist da, der Zustand hat sich
geändert), ist der, der deine Lektüre des Codes ersetzt. Die Abnahmekriterien des offenen Postens
(„gegeben, wenn, dann“) sind sein Drehbuch. Und sie laufen dreimal, in drei Maßstäben: der
berührte Fluss mit jedem offenen Posten, alle Flüsse beim Abschluss jedes Blocks, und alle Flüsse
mit der exakten Version vor der Produktion.

## 1. Benötigter Kontext

Was folgt, ist die generische Liste. Die konkreten Dateien, die du vor jedem Prompt fertig haben
musst, mit ihrem Inhalt und ihrem Mindestzustand, stehen in Abschnitt 2, in dem Block „Bevor du
den Prompt schickst“, der jedem einzelnen vorangeht.

- Die bereits umgesetzte Änderung (standardmäßig kommen die Tests nach der Umsetzung; „erst der
  Test“ bleibt als Option für kleine, gut abgegrenzte Umfänge).
- Der offene Posten, der die Änderung auslöst, mit seinen Abnahmekriterien und seinem „wie wird
  geprüft“.
- Die bestehende Batterie und der Befehl, sie auszuführen (Schritt 4).

## 2. Prompts

**Routine (gehört in die Arbeitsvereinbarung; gilt bei jeder Änderung):**

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- Der offene Posten, der gerade geschlossen wird, mit seiner vollständigen Spezifikation in
  `docs/PENDING.md`; insbesondere seine Abnahmekriterien in der Form „gegeben, wenn, dann“ und
  sein „wie es geprüft wird“, die das Drehbuch des Tests sind. Wenn der offene Posten sie nicht
  hat, geh zurück zu Schritt 5, bevor du den Test verlangst.
- Die vom Agenten bereits umgesetzte Änderung (die Methode testet nach dem Umsetzen, außer du
  wählst „zuerst der Test“ für einen kleinen und gut umrissenen Umfang).
- Die bestehende Batterie und der Befehl, um sie laufen zu lassen, notiert in `docs/STATUS.md`
  (Schritt 4).
- Die Testumgebung, laufend und für den Agenten erreichbar, mit genügend Testdaten für den Ablauf,
  der angefasst wird. Wenn der Ablauf Daten braucht, die es nicht gibt (ein Patient, ein Termin
  von gestern), lade sie selbst hoch oder bitte ihn, sie als Teil des Tests anzulegen; was er
  nicht darf, ist sie zu simulieren.
- `docs/WORKING_AGREEMENT.md`, wo die Routine beim ersten Mal hinkommt.
- Akzeptabler Mindestzustand: die Spezifikation hat Abnahmekriterien, und die Batterie läuft mit
  einem bekannten Befehl.

> To close this pending item I need evidence, not your word. (1) Write the test that proves what
> the item asks for, following its acceptance criteria. (2) Demonstrate that this test fails
> against the previous code: you may temporarily revert the change, or run the test against the
> old version, but show me the red output. (3) Show me the green output with the change. (4) Run
> the regression suite for the neighbouring items and show me it is still green. (5) Run the
> end-to-end test of the flow this item touches, from the screen to the backend, and show me the
> backend effect. (6) Do not replace with mocks the very part you are trying to test. If testing
> end to end requires something you lack (data, access, an environment), ask me for it; do not
> simulate what you do not have. Finally, the commit message says "proved red against [what]"
> and the test counts.

> [de]
> Um diesen offenen Posten zu schließen, brauche ich Belege, nicht dein Wort. (1) Schreib den
> Test, der beweist, was der Posten verlangt, nach seinen Abnahmekriterien. (2) Zeige, dass
> dieser Test gegen den vorherigen Code fehlschlägt: du kannst die Änderung vorübergehend
> zurücknehmen oder den Test gegen die alte Version laufen lassen, aber zeig mir die rote Ausgabe.
> (3) Zeig mir die grüne Ausgabe mit der Änderung. (4) Lass die Regression der benachbarten
> Posten laufen und zeig mir, dass sie weiter grün ist. (5) Lass den Ende-zu-Ende-Test des
> Flusses laufen, den dieser Posten berührt, vom Bildschirm bis zum Backend, und zeig mir die
> Wirkung im Backend. (6) Ersetze nicht ausgerechnet den Teil durch Mocks, den du prüfen willst.
> Wenn das Ende-zu-Ende-Testen etwas erfordert, das dir fehlt (Daten, Zugang, eine Umgebung),
> bitte mich darum; simuliere nicht, was du nicht hast. Zum Schluss sagt die Commit-Nachricht
> „rot bewiesen gegen [was]“ und die Testzahlen.

Was ich hier verlange, Klausel für Klausel: (1) den Test, geführt von den Abnahmekriterien des
offenen Postens; (2) **das bewiesene Rot**, mit der Ausgabe vor Augen, die Klausel, die diese
Methode von „schreib Tests“ unterscheidet; (3) das Grün; (4) die Regression der Nachbarn in
derselben Sitzung, denn eine Änderung bricht Dinge nebenan; (5) den Ende-zu-Ende-Test des
berührten Flusses, mit der Wirkung im Backend vor Augen; (6) nicht ausgerechnet das simulieren, was
geprüft wird; und die Vollständigkeitsklausel, angepasst an diesen Schritt: wenn etwas fehlt, um
Ende zu Ende zu testen, **darum bitten, nicht simulieren**. Die Commit-Nachricht mit den Zahlen
hinterlässt den Beleg dort, wo der Code lebt.

**Beim Abschluss jedes Blocks und vor jedem Deployment in die Produktion:**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- Alle offenen Posten des Blocks mit der Routine geschlossen (rot, grün, Regression, Ende zu Ende
  des Ablaufs).
- Die exakte Version, die befördert wird, identifiziert (Versionsnummer oder Commit) und in der
  Testumgebung deployt; sag sie ihm im Chat, wenn sie nicht in `docs/STATUS.md` steht.
- Die Liste der Abläufe, die es bis jetzt gibt, von dir aus den Anwendungsfällen des semantischen
  Baums geschrieben, um sie mit dem zu vergleichen, was der Agent abgedeckt zu haben sagt. Ohne
  deine Liste ist „alle Abläufe“ das, woran sich der Agent erinnert.
- Akzeptabler Mindestzustand: du weißt, wie viele Abläufe die Batterie durchlaufen muss, bevor du
  ihn fragst, wie viele er durchlaufen hat.

> Run the complete end-to-end suite of every flow that exists so far, in the test environment,
> with the exact version that will be promoted. Show me the counts, and for each flow the
> backend check that proves it. If any flow has no end-to-end test, say so and open a pending
> item for it; do not pass it as covered.

> [de]
> Lass die vollständige Ende-zu-Ende-Batterie aller bisher existierenden Flüsse laufen, in der
> Testumgebung, mit der exakten Version, die befördert werden soll. Zeig mir die Zahlen und für
> jeden Fluss die Backend-Prüfung, die ihn beweist. Wenn ein Fluss keinen Ende-zu-Ende-Test hat,
> sag es und öffne einen offenen Posten dafür; lass ihn nicht als abgedeckt durchgehen.

Was ich hier verlange: den zweiten und dritten Maßstab der Ende-zu-Ende-Tests, mit der exakten
Version (nicht „der neuesten“), mit der Wirkung im Backend pro Fluss, und mit der
Vollständigkeitsklausel: was nicht abgedeckt ist, wird erklärt und wird zum offenen Posten, es
geht nicht als abgedeckt durch.

**Wenn der Agent sagt, dass sich etwas nicht testen lässt:**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- Die Nachricht des Agenten, dass sich etwas nicht testen lässt, aufmerksam gelesen: geht es
  nicht, oder fehlt ihm etwas? Wenn das Fehlende eine Eingabe ist, die du hast (Daten, ein Zugang,
  eine Umgebung), gib sie ihm und schick diesen Prompt nicht. Dieser Prompt ist für den Fall, dass
  wirklich etwas im System fehlt (Bezeichner an den Elementen des Bildschirms, ein Testmodus des
  externen Anbieters).
- Akzeptabler Mindestzustand: du hast zwischen „mir fehlt eine Eingabe“ (die gibst du) und „das
  System ist hier nicht testbar“ (dieser Prompt) unterschieden.

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

> [de]
> Erkläre, warum es sich nicht testen lässt, was hinzugefügt werden müsste, damit es geht, und
> öffne einen offenen Posten dafür. Die Änderung ist nicht geschlossen, bis sie sich testen lässt.

Was ich hier verlange: dass „lässt sich nicht testen“ nicht das Ende des Gesprächs ist, sondern
der Anfang eines offenen Postens. Nicht-Testbarkeit ist Schuld, und Schulden werden registriert.

## 3. Erwartetes Ergebnis

- Der neue Test im Repository, benannt nach dem offenen Posten, den er schließt.
- Im Bericht des Agenten und in der Commit-Nachricht: die rote Ausgabe (wie viele fehlschlagen,
  gegen welche Version), die grüne Ausgabe und die grüne Regression mit ihren Zahlen.
- Der Ende-zu-Ende-Test des berührten Flusses, mit dem Beleg, dass sich das Backend geändert hat
  (die Zeile, der Eintrag, der Zustand).
- Beim Abschluss jedes Blocks und vor der Produktion: die vollständige Ende-zu-Ende-Batterie in
  Grün, pro Fluss, mit der exakten Version.

## 4. Vollständigkeitsprüfung

- Zeigt der Bericht das Rot? Mit Zahlen: „4 von 8 schlagen gegen das alte Kriterium fehl“. Wenn
  er nur Grün zeigt, ist der Schritt nicht erklommen.
- Lief die Regression in derselben Sitzung? Wie viele Tests, wie viele grün?
- Gibt es einen „simulierten“ Teil (Mock) genau dort, wo die Änderung ist? Frag den Agenten, was
  er simuliert hat und warum.
- Zitiert der Commit den offenen Posten und sagt „rot bewiesen“?
- Prüft der Bildschirmtest auch die Wirkung im Backend?
- Beim Abschluss des Blocks: sind alle Flüsse in der Ende-zu-Ende-Batterie, oder gibt es einen,
  der „durch die Unit-Tests abgedeckt wird“?

## 5. Warnsignale

- Alle neuen Tests der Woche waren auf Anhieb grün, und nie wurde ein Rot gezeigt. Entweder lässt
  der Agent den Schritt aus oder die Tests prüfen nichts.
- Die Batterie dauert immer länger und niemand weiß, warum. Meist wurden die Ende-zu-Ende-Tests
  nach und nach durch Simulationen ersetzt, „damit es schnell läuft“.
- Der Agent berichtet „die Tests bestehen“, ohne zu sagen, wie viele. Immer mit Zahlen.
- Du kommst zur Produktionsfreigabe und die vollständige Ende-zu-Ende-Batterie läuft zum ersten
  Mal. Die Blockabschlüsse haben gefehlt.
