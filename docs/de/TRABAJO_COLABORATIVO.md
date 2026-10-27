# Urazuke — kollaboratives Arbeiten: mehrere Entwickler, jeder mit seinem Agenten, auf einem einzigen Branch

Autor: Pablo Kuschniroff, assistiert von Claude Code. Version 1, 19. Oktober 2026. Dieses
Dokument ergänzt das [Hauptdokument](ESCALERA_METODOLOGICA.md): es sagt, wie die Methode
angewendet wird, wenn es nicht einen einzigen Menschen mit einem einzigen Agenten gibt, sondern
mehrere Entwickler, jeder mit seinem, die auf demselben Repository und auf demselben Branch
arbeiten. Die seltsamen Wörter stehen im Glossar des Hauptdokuments. Öffentliches Repository:
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## Das Problem, ohne Umschweife gesagt

Die Methode ist im Singular geschrieben: der Eigentümer, der Agent, der offene Posten. Meine drei
Systeme habe ich so gebaut, ein Mensch und ein Modell. Aber ein Team, das die Methode übernimmt,
hat nicht einen Menschen: es hat drei oder fünf, jeder mit seiner offenen Agentensitzung auf
demselben Code, und in den meisten kleinen Teams auf **demselben Branch**, denn der Wald aus
langlebigen Branches ist der sicherste Weg dahin, dass sich zwei Wochen Arbeit an einem Freitag
unter Geschrei integrieren. Auf einem geteilten Branch zu arbeiten lässt sich gut machen, und die
Branche tut es seit Jahren mit bekannten Regeln (kleine Commits, mehrmals täglich integriert, die
Continuous Integration als Schiedsrichter, halbfertige Funktionalitäten hinter einem Schalter
versteckt). Was sich mit der Methode ändert, ist, dass diese Regeln nicht mehr von Personen
eingehalten werden, die den Code der anderen lesen: sie werden von Agenten eingehalten, die
einander nicht sehen, und also muss man sie dort aufschreiben, wo jeder Agent sie liest.

Was folgt, sind die Regeln und danach die Prompts. Ich füge keine Schritte hinzu: die
vierundzwanzig sind dieselben. Ich füge hinzu, was jeder Schritt braucht, damit ihn mehrere
gleichzeitig erklimmen.

**Wenn du Anfänger bist.** Ein *Branch* ist eine Kopie des Codes, in der gearbeitet wird; der
*geteilte Branch* (meist *main* oder *trunk* genannt) ist der einzige, der zählt, der, der
deployt wird. *Integrieren* heißt, deine Änderung in diesen Branch zu bringen; ein *Konflikt* ist,
wenn zwei Personen dieselbe Zeile geändert haben und das Werkzeug nicht weiß, welche gilt. Ein
*Funktionsschalter* ist ein Konfigurationsschlüssel, der eine Funktionalität ausgeschaltet lässt,
obwohl der Code schon da ist, damit man halbfertig integrieren kann, ohne dass der Nutzer sie
sieht. Und einen offenen Posten zu *beanspruchen* heißt, deinen Namen in ihn zu schreiben, damit
ihn niemand sonst nimmt.

## Die sieben Regeln des geteilten Branches

1. **Der offene Posten ist die Eigentumseinheit.** Niemand arbeitet ohne einen auf seinen Namen
   beanspruchten offenen Posten in `docs/PENDING.md`, und ein offener Posten hat jeweils nur einen
   Eigentümer. Zwei Personen nehmen nicht gleichzeitig zwei offene Posten, die dasselbe Modul
   berühren; wenn es sich nicht vermeiden lässt, sagen sie es sich, und die zweite wartet, bis die
   erste integriert hat. Der Agent liest zu Beginn der Sitzung die von anderen beanspruchten
   offenen Posten und fasst sie nicht an.
2. **Klein und oft integrieren.** Ein offener Posten wird in Änderungen zerlegt, die mehrmals
   täglich in den geteilten Branch integriert werden, nie am Ende der Woche. Vor jeder Integration:
   das der anderen holen, die ganze Batterie laufen lassen, und erst danach hochladen. Eine
   Änderung, die sich nicht an einem Tag integrieren lässt, ist ein schlecht geschnittener offener
   Posten: er wird neu geschnitten.
3. **Die Continuous Integration ist der Schiedsrichter, nicht der Mensch.** Niemand integriert mit
   roter Kette, und niemand diskutiert, ob eine Änderung „etwas kaputt macht“: das sagen die
   Batterie, das Qualitätstor (9) und die Charakterisierung, wenn es ein Altsystem ist. Wer den
   geteilten Branch rot macht, repariert ihn vor allem anderen, oder er nimmt seine Änderung
   zurück.
4. **Was halbfertig ist, kommt hinter einen Schalter.** Eine Funktionalität, die länger als einen
   Tag dauert, wird trotzdem integriert, per Konfiguration ausgeschaltet, mit ihrem Schalter im
   offenen Posten notiert, und sie wird eingeschaltet, wenn der Posten mit Beleg geschlossen wird.
   So wartet niemand auf jemanden, um zu integrieren.
5. **Die Listen haben einen einzigen Eigentümer, und die Karte sagt, welchen.** Die
   Produzenten-Konsumenten-Karte (11) ist der Konfliktdetektor des Teams: bevor ein Vertrag
   zwischen Teilen angefasst wird, schaut man nach, wer ihn konsumiert, und die Konsumenten werden
   in derselben Änderung aktualisiert, auch wenn sie von jemand anderem sind. Der semantische Baum
   (2) ist die geteilte Karte, und sie ändert derjenige, der einen Knoten hinzufügt, im selben
   Commit.
6. **Die Entscheidungen werden mit Namen aufgeschrieben und gelten für alle.** Eine Geschäftsregel,
   die ein Entwickler mit dem Eigentümer entscheidet, kommt sofort nach `docs/DECISIONS.md`, denn
   der Agent nebenan wird sie noch am selben Nachmittag brauchen und wird sie nicht erraten. Die
   Arbeitsvereinbarung (1) ist eine einzige für das Team; niemand hat eigene Regeln, die die
   anderen nicht lesen.
7. **Es wird Beleg geprüft, nicht Code, und es prüft ein anderer.** Einen offenen Posten schließt
   sein Eigentümer mit der vollständigen Routine (8, 9, 10, 12), und als geschlossen erklärt ihn
   eine andere Person des Teams, indem sie den Bericht liest: das Rot, das Grün, die Regression,
   die Qualität, den manuellen Fall. Niemand schließt seine eigenen offenen Posten, und niemand
   liest den Code, um sie zu schließen.

Und eine Regel über die Agenten, die das ist, was sich gegenüber einem Team ohne Modelle wirklich
ändert: **jeder Agent arbeitet im Namen einer Person**, mit seinem eigenen Sitzungskontext, und
das Einzige, was sie teilen, ist das, was im Repository geschrieben steht. Es gibt kein
gemeinsames Gedächtnis außerhalb der Dateien. Deshalb werden der lebende Zustand
(`docs/STATUS.md`), die offenen Posten und die Entscheidungen im Moment geschrieben, nicht „am Ende
des Tages“: der Agent des Kollegen wird sie in fünf Minuten lesen.

## Wie sich die Schritte in einem Team verteilen

| Schritt | Wer ihn erklimmt | Was sich im Team ändert |
|---|---|---|
| 0 bis 4, Start | Eine einzige Person, die, die führt, mit dem Eigentümer. | Wird einmal gemacht, bevor die anderen dazukommen. Das Skelett (4) umfasst die Integrationskette, die der Schiedsrichter sein wird, und die Tore (`docs/GATES.md`) umfassen die des geteilten Branches. |
| 1, Vereinbarung | Der Leiter schreibt sie; alle unterschreiben. | Die sieben Regeln von oben kommen als Routinen hinzu. Eine einzige Datei für das Team. |
| 5, offene Posten | Der Leiter öffnet den Block mit dem Eigentümer; jeder beansprucht. | Der offene Posten trägt ein Feld „beansprucht von“ und „berührte Module“. Zwei Posten, die dasselbe Modul berühren, werden nicht gleichzeitig beansprucht. |
| 6, Entscheidungen | Wer sie braucht, mit dem Eigentümer. | Wird im Moment geschrieben, nicht am Ende des Tages. |
| 7 bis 12, die Schleife | Jeder, mit seinem Agenten, auf seinem offenen Posten. | Vor dem Integrieren: holen, alles laufen lassen, hochladen. Was halbfertig ist, hinter einen Schalter. Den Bericht (12) liest ein anderer. |
| 9, Qualität | Eine einzige Konfiguration für alle. | Niemand hat eigene Linter-Ausnahmen. |
| 10, manuelle Testfälle | Der Eigentümer des Postens schreibt sie; ein anderer führt sie aus. | Wer die Funktionalität nicht gebaut hat, prüft sie am besten. |
| 11, Symmetrie | Wer einen Vertrag anfasst, aktualisiert die Konsumenten, wem auch immer sie gehören. | Die Karte ist der Konfliktdetektor. |
| 13, Audit | Eine andere Sitzung als alle, die gebaut haben. | Im Team ist es einfacher: der Auditor ist der, der dieses Modul nicht angefasst hat. |
| 14 bis 20, Freigabe | Der Leiter koordiniert; jeder Schritt hat einen Verantwortlichen. | Eine Person befördert in die Produktion; die anderen nicht. |
| 21 bis 23, Betrieb | Ein Monitoring-Verantwortlicher pro Zyklus, rotierend. | Den zyklischen Bericht liest das ganze Team; die offenen Posten, die daraus entstehen, werden wie jeder andere beansprucht. |

## Die Prompts

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder der Teamleiter) machst
es, nicht der Agent:

- `docs/WORKING_AGREEMENT.md` (Schritt 1), abgeschlossen, eine einzige für das Team, mit der Liste
  der Mitglieder und ihrer Benutzernamen im Repository.
- `docs/PENDING.md` (Schritt 5) mit dem Feld „beansprucht von“ und „berührte Module“ in jedem
  offenen Posten, auch wenn sie leer sind.
- Die Entscheidung des Teams über den Funktionsschalter: wo er deklariert wird (die
  Serverkonfiguration, eine Datei) und wie er benannt wird, geschrieben in `PROJECT.md`.
- Die Integrationskette (Schritt 4 und 15) mit der Batterie und dem Qualitätstor (9) als
  Merge-Bedingung im geteilten Branch, in der Plattform des Repositorys konfiguriert (niemand kann
  mit roter Kette hochladen).
- Akzeptabler Mindestzustand: es gibt eine einzige Vereinbarung, die offenen Posten haben die zwei
  Felder, und die Plattform weist einen Push mit roter Kette zurück.

**Routine des geteilten Branches (kommt in die Arbeitsvereinbarung):**

> We work as a team on one shared branch, each person with their own agent session, and the only
> shared memory is what is written in the repository. Rules: (1) At the start of every session,
> read `docs/STATUS.md`, `docs/DECISIONS.md` and `docs/PENDING.md`; never touch a pending item
> claimed by someone else, and never take one that touches a module another claimed item touches.
> (2) Before every integration into the shared branch: pull the others' changes, run the full
> suite and the quality gate, and only then push; integrate several times a day, never at the end
> of the week. (3) Never push with the pipeline red; whoever turns it red fixes it before anything
> else or reverts. (4) Anything that cannot be finished and integrated today goes behind a feature
> switch, off by default, noted in the pending item. (5) Before touching a contract between parts
> (a service, a table, a list of values), look up its consumers in `docs/PRODUCER_CONSUMER_MAP.md`
> and update them in the same change, whoever owns them. (6) Every business decision goes to
> `docs/DECISIONS.md` the moment it is taken, with the person's name and the date. (7) Update
> `docs/STATUS.md` with what you are doing when you start and when you stop, so that the others'
> agents see it.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [de]
> Wir arbeiten als Team auf einem einzigen geteilten Branch, jede Person mit ihrer eigenen
> Agentensitzung, und das einzige gemeinsame Gedächtnis ist das, was im Repository geschrieben
> steht. Regeln: (1) Lies zu Beginn jeder Sitzung `docs/STATUS.md`, `docs/DECISIONS.md` und
> `docs/PENDING.md`; fass nie einen von jemand anderem beanspruchten offenen Posten an, und nimm
> nie einen, der ein Modul berührt, das ein anderer beanspruchter Posten berührt. (2) Vor jeder
> Integration in den geteilten Branch: hol die Änderungen der anderen, lass die ganze Batterie und
> das Qualitätstor laufen, und lade erst danach hoch; integriere mehrmals täglich, nie am Ende der
> Woche. (3) Lade nie mit roter Kette hoch; wer sie rot macht, repariert sie vor allem anderen oder
> nimmt sie zurück. (4) Alles, was heute nicht fertig und integriert werden kann, kommt hinter
> einen Funktionsschalter, standardmäßig aus, im offenen Posten notiert. (5) Bevor du einen Vertrag
> zwischen Teilen anfasst (einen Dienst, eine Tabelle, eine Werteliste), schlag seine Konsumenten
> in `docs/PRODUCER_CONSUMER_MAP.md` nach und aktualisiere sie in derselben Änderung, wem auch
> immer sie gehören. (6) Jede Geschäftsentscheidung kommt in dem Moment, in dem sie getroffen wird,
> nach `docs/DECISIONS.md`, mit dem Namen der Person und dem Datum. (7) Aktualisiere
> `docs/STATUS.md` mit dem, was du tust, wenn du anfängst und wenn du aufhörst, damit die Agenten
> der anderen es sehen.
>
> Wenn du eine Entscheidung von mir brauchst, stelle die Frage mit den vier Teilen von UX-28
> (`docs/ANEXO_HEURISTICAS.md`) und in dieser Reihenfolge: die Daten, die die Frage nötig machen,
> aufgelistet; ein Absatz von höchstens fünf Zeilen, der sie verbindet und die Frage sichtbar
> macht; die Frage selbst mit ihren möglichen Antworten durchnummeriert; und deine Empfehlung.
> Sage es in der technischen Tiefe, die das Projekt in `communication_depth` erklärt hat
> —`beginner`, `decision_maker` oder `technical`—; hat das Projekt keine erklärt, nimm
> `decision_maker`.
>
> Antworte in meiner Sprache.

Was ich hier verlange: die sieben Regeln als Routine des Agenten, denn der Agent sieht die anderen
Agenten nicht und wird nur erfüllen, was er liest; die Pflichtlektüre zu Beginn der Sitzung, die
das ersetzt, was sonst das Gespräch auf dem Flur wäre; die kleine und häufige Integration mit der
Batterie als Bedingung; den Schalter für das, was halbfertig ist; die Karte als Konfliktdetektor;
und den lebenden Zustand, im Moment geschrieben.

**Beim Beanspruchen eines offenen Postens:**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- Den offenen Posten, den du nehmen willst, von dir aus dem Backlog gewählt, und einen Blick auf
  die von anderen beanspruchten: berührt einer dasselbe Modul?
- Deinen Benutzernamen im Repository, der im Feld „beansprucht von“ stehen wird.
- Akzeptabler Mindestzustand: du weißt, welche Module dein offener Posten berührt und dass sie
  niemand beansprucht hat.

> I am taking pending item [PND-NNN]. Before anything: list the pending items claimed by others
> and tell me whether any of them touches the same modules as mine, by the "modules it touches"
> field and by the producer-consumer map; if there is an overlap, stop and tell me, do not start.
> If there is none, write my name in the "claimed by" field with today's date, write in
> `docs/STATUS.md` what I am starting, re-read the item's specification, and tell me which
> contracts of the map this item will touch and who consumes them.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [de]
> Ich nehme den offenen Posten [PND-NNN]. Zuallererst: liste die von anderen beanspruchten offenen
> Posten auf und sag mir, ob einer von ihnen dieselben Module berührt wie meiner, nach dem Feld
> „berührte Module“ und nach der Produzenten-Konsumenten-Karte; wenn es eine Überschneidung gibt,
> halt an und sag es mir, fang nicht an. Wenn es keine gibt, schreib meinen Namen in das Feld
> „beansprucht von“ mit dem heutigen Datum, schreib in `docs/STATUS.md`, was ich anfange, lies die
> Spezifikation des Postens noch einmal, und sag mir, welche Verträge der Karte dieser Posten
> berühren wird und wer sie konsumiert.
>
> Wenn du eine Entscheidung von mir brauchst, stelle die Frage mit den vier Teilen von UX-28
> (`docs/ANEXO_HEURISTICAS.md`) und in dieser Reihenfolge: die Daten, die die Frage nötig machen,
> aufgelistet; ein Absatz von höchstens fünf Zeilen, der sie verbindet und die Frage sichtbar
> macht; die Frage selbst mit ihren möglichen Antworten durchnummeriert; und deine Empfehlung.
> Sage es in der technischen Tiefe, die das Projekt in `communication_depth` erklärt hat
> —`beginner`, `decision_maker` oder `technical`—; hat das Projekt keine erklärt, nimm
> `decision_maker`.
>
> Antworte in meiner Sprache.

Was ich hier verlange: die Prüfung auf Überschneidung vor dem Anfangen, die der billige Moment
ist, einen Konflikt zu vermeiden; den geschriebenen Anspruch; und die Liste der Konsumenten, die
ich anfassen werde, um von Anfang an zu wissen, wem ich etwas ändere.

**Beim Integrieren:**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- Den offenen Posten mit erledigter Abschlussroutine oder, wenn er halbfertig ist, den notierten
  Schalter.
- Die Gewissheit, dass der geteilte Branch gerade jetzt grün ist (wenn er rot ist, wird zuerst das
  repariert, wem auch immer es gehört).
- Akzeptabler Mindestzustand: du weißt, ob du etwas Fertiges integrierst oder etwas Halbfertiges
  hinter einem Schalter.

> We are going to integrate into the shared branch. Pull the others' changes first and tell me
> what came in and whether anything touches my modules. Resolve conflicts, if any, by reading
> both sides and asking me when a business rule is involved; never by keeping mine. Run the full
> suite, the quality gate and, if this is an inherited system, the characterization suite, and
> show me the counts. If anything is red, stop: tell me what and whose change it comes from. If
> this item is not finished, confirm the feature switch is off by default and say so in the
> commit message. Then push, show me the pipeline green on the shared branch, and update
> `docs/STATUS.md` and the pending item.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [de]
> Wir werden in den geteilten Branch integrieren. Hol zuerst die Änderungen der anderen und sag
> mir, was hereingekommen ist und ob etwas meine Module berührt. Löse die Konflikte, falls es
> welche gibt, indem du beide Seiten liest und mich fragst, wenn eine Geschäftsregel im Spiel ist;
> nie, indem du meine behältst. Lass die ganze Batterie laufen, das Qualitätstor und, wenn es ein
> geerbtes System ist, die Charakterisierungsbatterie, und zeig mir die Zahlen. Wenn etwas rot ist,
> halt an: sag mir, was und aus wessen Änderung es kommt. Wenn dieser Posten nicht fertig ist,
> bestätige, dass der Funktionsschalter standardmäßig aus ist, und sag es in der Commit-Nachricht.
> Lade danach hoch, zeig mir die Kette grün auf dem geteilten Branch, und aktualisiere
> `docs/STATUS.md` und den offenen Posten.
>
> Wenn du eine Entscheidung von mir brauchst, stelle die Frage mit den vier Teilen von UX-28
> (`docs/ANEXO_HEURISTICAS.md`) und in dieser Reihenfolge: die Daten, die die Frage nötig machen,
> aufgelistet; ein Absatz von höchstens fünf Zeilen, der sie verbindet und die Frage sichtbar
> macht; die Frage selbst mit ihren möglichen Antworten durchnummeriert; und deine Empfehlung.
> Sage es in der technischen Tiefe, die das Projekt in `communication_depth` erklärt hat
> —`beginner`, `decision_maker` oder `technical`—; hat das Projekt keine erklärt, nimm
> `decision_maker`.
>
> Antworte in meiner Sprache.

Was ich hier verlange: holen vor dem Hochladen; die Konflikte lösen, indem beide Seiten gelesen
werden, und nicht „gewinnen“ (der Reflex des Modells vor einem Konflikt ist, seine Version zu
behalten); die Batterie als Bedingung; die grüne Kette auf dem geteilten Branch als Beleg, nicht
auf der Maschine des Agenten; und den lebenden Zustand auf dem neuesten Stand.

## Vollständigkeitsprüfung (die macht der Leiter, ohne Code zu lesen)

- Nimm drei diese Woche geschlossene offene Posten: hat sie jemand anderes als ihr Eigentümer
  geschlossen, indem er den Bericht gelesen hat?
- Wie oft pro Tag wurde in den geteilten Branch integriert? Verlang die Historie; wenn es einmal
  pro Woche ist, wird Regel 2 nicht eingehalten.
- Gab es diese Woche einen Konflikt? Wie wurde er gelöst, und gibt es deswegen einen offenen Posten
  für die Karte?
- Gibt es irgendeine halbfertige Funktionalität ohne Schalter im geteilten Branch?
- Sagt `docs/STATUS.md`, was jeder heute tut?

## Warnsignale

- Jeder Entwickler hat seine eigene Arbeitsvereinbarung, „weil er anders arbeitet“. Die Agenten
  werden verschiedenen Regeln über demselben Code folgen.
- Die Integrationen stauen sich auf den Freitag. Das ist der Wald aus Branches, ohne die Branches.
- Jemand liest den Code des Kollegen, um seinen offenen Posten freizugeben. Die Methode ist zur
  Code-Review verkommen, und das ist genau das, was das Modell schlechter macht als den Beleg.
- Ein Konflikt wurde gelöst, indem „die neuere Version behalten“ wurde. Eine Geschäftsregel ist
  verloren gegangen, ohne dass es jemand entschieden hat.
- Der Agent einer Person hat einen von einer anderen beanspruchten offenen Posten geschlossen. Die
  Lektüre zu Beginn der Sitzung steht nicht in der Vereinbarung, oder die Vereinbarung wird nicht
  gelesen.

## Was noch auszuarbeiten ist `[Hypothese]`

1. Diese Regeln kommen aus der bekannten Praxis der Branche zu geteilten Branches und aus dem, was
   die Methode verlangt; ich habe sie nicht mit einem Team aus mehreren gleichzeitig arbeitenden
   Agenten erprobt. Das erste Team, das sie benutzt, wird sie korrigieren, und die Retrospektive
   (23) muss fragen, wie viele Konflikte es gab und wie viele sich mit der Karte hätten vermeiden
   lassen.
2. Ich weiß nicht, wie viele Personen ein geteilter Branch mit der Methode aushält, bevor eine
   andere Arbeitsform nötig wird. Meine Intuition ist: mehr, als er ohne die Methode aushielt,
   denn der spezifizierte offene Posten und die Karte nehmen die Hälfte der Konfliktgründe weg.
3. In Forge erledigen das native Register der offenen Posten und der Wissensgraph den Anspruch und
   die Erkennung von Überschneidungen von allein; in den anderen Werkzeugen macht man es von Hand
   mit den Feldern des offenen Postens. Ich habe noch nicht erprobt, wie viel das in der Praxis
   ändert.
