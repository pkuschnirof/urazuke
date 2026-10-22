# Schritt 9 — Maschinell verifizierte Code-Qualität, mit Tor (Schrittvertrag)

**Abschnitt:** Schleife.
**Wann:** wird einmal aufgebaut, beim Öffnen des ersten Funktionsblocks (sobald der Start fertig
ist), und läuft von da an allein bei jedem Commit, als Tor der Continuous Integration; jeder
offene Posten wird mit der Qualität in Grün geschlossen, nach dem roten Test (8) und vor dem
manuellen Testfall (10). Beim Abschluss jedes Blocks und vor jedem Deployment wird der
Qualitätsbericht mit dem Eigentümer gelesen. In einem Altsystem ist der erste Lauf die Basislinie,
und die Funde kommen mit ihrer Geschwindigkeitsmarke ins Backlog.
**Form:** ein einziger Durchgang zum Aufbauen; danach Routine bei jeder Änderung und Lektüre pro
Block.
**Größe:** verpflichtend in seinem Mindestniveau in jedem Projekt (ein Linter und eine
Größenbeschränkung in der Kette); vollständig, Mutationstests eingeschlossen, in jedem Projekt mit
Nutzern. Die Mutationstests bleiben nur dann eine optionale Verstärkung, wenn es keine echten
Nutzer gibt (ein internes Werkzeug, ein Prototyp, den sonst niemand ausführt).

## Wozu er dient

Der Eigentümer liest den Code nicht, und genau das ist der Sinn der Methode. Aber der Code
existiert, irgendjemand wird ihn pflegen (der nächste Agent, der nächste Entwickler), und ein
Code, der heute funktioniert und morgen unlesbar ist, ist Schuld, die im dritten Monat eingetrieben
wird. Wenn ihn niemand liest, **muss ihn eine Maschine ansehen**: Werkzeuge, die bei jedem Commit
messen, was ein menschlicher Prüfer ansehen würde, und es in eine Zahl mit einer Grenze verwandeln.
Ich habe das in all meinen Projekten gemacht, ohne es Schritt zu nennen, und ein Qualitätsaudit
brachte mir eine Komponente mit mehr als zweitausend Zeilen und eine Projektdatei mit fast
zehntausend zurück [Ref. 41](../REFERENCIAS.md#ref-41): keine von beiden hätte eine geschriebene
Größenbeschränkung bestanden. Die statische Ratsche, die verhindert, dass eine Qualitätszahl
schlechter wird [Ref. 35](../REFERENCIAS.md#ref-35), ist die Form, die ich diesem Schritt gebe.

Was maschinell gemessen wird, nach Wichtigkeit geordnet: dass der Code einen einzigen Stil achtet
(der *Linter* und der *Formatierer*); dass keine Funktion und keine Datei eine Größe überschreitet;
dass die *Komplexität* jeder Funktion unter einer Grenze bleibt; dass es keinen duplizierten und
keinen toten Code gibt; dass die Abhängigkeiten deklariert und benutzt sind; dass die *Abdeckung*
der Tests nie sinkt (die Ratsche); und, wenn die Sprache es erlaubt, dass die Typen aufgehen.
Nichts davon ersetzt den roten Test: ein makelloser Code kann falsch sein. Was es verhindert, ist
der korrekte Code, den niemand mehr anfassen kann.

Und das, was ich in jedem Projekt mit Nutzern nicht mehr als optionale Verstärkung behandle: die
**Mutationstests**. Ich hatte sie in einer früheren Version dieses Dokuments als „optional,
empfohlen“ belassen, und eine externe Bewertung der Methode machte mich auf den Widerspruch
aufmerksam: Wenn Teil F sagt, dass die Mutation, soweit ich weiß, das einzige Maß ist, das in den
Studien von 2026 die Tests, die beweisen, von denen unterschied, die nur dekorieren, ergibt es
keinen Sinn, sie ausgerechnet in den Projekten aus dem „Vollständig“ auszulassen, in denen ein
dekorativer Test mehr jemandem schadet. Ein Werkzeug pflanzt absichtlich Fehler in den Code (ändert ein „größer“ in
„größer oder gleich“, löscht eine Zeile, kehrt eine Bedingung um) und lässt die Tests laufen; jeder
Fehler, den die Tests nicht fangen, ist ein *überlebender Mutant*, und der Anteil der gefangenen
ist die Punktzahl. Es ist das Maß, das das bewiesene Rot aus Schritt 8 ergänzt: das Rot beweist,
dass ein Test die Änderung von heute bewacht; die Mutation misst, wie viel die ganze Batterie
bewacht. Und es ist, soweit ich weiß, das einzige, das in den Studien von 2026 die Tests, die
prüfen, von denen unterschieden hat, die dekorieren (Teil F des Hauptdokuments).

**Wenn du Anfänger bist.** Ein *Linter* ist ein Programm, das den Code liest und markiert, was
schlecht geschrieben oder gefährlich ist (eine Variable, die nicht benutzt wird, ein Vergleich, der
immer dasselbe ergibt), wie die Rechtschreibprüfung einer Textverarbeitung. Ein *Formatierer* rückt
ihn in einem einzigen Stil zurecht (Einrückungen, Leerzeichen), damit der ganze Code aussieht, als
hätte ihn dieselbe Hand geschrieben. Die *Komplexität* einer Funktion ist, wie viele verschiedene
Wege sie nehmen kann (jedes „wenn“ erhöht sie); eine Funktion mit vierzig Wegen versteht niemand.
*Duplizierter Code* ist derselbe Block, an zwei Stellen kopiert: an dem Tag, an dem man den einen
repariert, bleibt der andere kaputt. Die *Abdeckung* ist, welcher Prozentsatz des Codes von
irgendeinem Test ausgeführt wird. Und eine *Ratsche* ist ein Mechanismus, der nur Verbesserung
zulässt: die Zahl von heute ist der Boden von morgen. Die *Mutationstests* sind ein Programm, das
den Code absichtlich kaputt macht, mit je einer kleinen Änderung auf einmal, und schaut, ob
irgendein Test es merkt; wenn keiner es merkt, ist dieses Stück Code nicht bewacht.

## 1. Benötigter Kontext

Was folgt, ist die generische Liste. Die konkreten Dateien, die du vor jedem Prompt fertig haben
musst, mit ihrem Inhalt und ihrem Mindestzustand, stehen in Abschnitt 2, in dem Block „Bevor du
den Prompt schickst“, der jedem einzelnen vorangeht.

- Die Continuous Integration, die bei jedem Push läuft (Schritt 4).
- Der erste Funktionsblock geöffnet, mit mindestens einem gebauten offenen Posten: ohne Code gibt
  es keine Qualität zu messen.
- Deine Entscheidung über die Grenzen, oder die Bereitschaft, die anzunehmen, die der Agent mit
  Begründung vorschlägt.
- Das vorherige Audit (13, oder N3 in einem Altsystem), falls es eines gab.

## 2. Prompts

**Zu Beginn (das Tor aufbauen):**

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- Die Continuous Integration, die bei jedem Push läuft (Schritt 4), und wie viel Kontingent dir
  bleibt: die Qualitätsprüfungen fügen Minuten hinzu.
- Mindestens ein offener Posten des ersten Blocks gebaut und mit Schritt 8 geschlossen, damit es
  echten Code zu messen gibt und nicht das leere Skelett.
- Deine Entscheidung über zwei Grenzen, in einer Zeile geschrieben: die maximale Größe einer Datei
  und einer Funktion (zum Anfangen dreihundert Zeilen und vierzig), und ob die Abdeckung nur
  steigen darf. Den Rest schlägt der Agent vor und du genehmigst es.
- In einem Altsystem: `docs/AUDIT_[Datum].md` (N3), damit der Agent nichts Bekanntes meldet und
  der erste Lauf die Basislinie ist.
- Akzeptabler Mindestzustand: die Kette läuft, es gibt Code aus einem geschlossenen Posten, und du
  hast die zwei Grenzen aufgeschrieben.

> We are going to make the code quality verified by machine, because nobody is going to read the
> code. Set up, in continuous integration, on every push: (1) a linter and a formatter with one
> configuration for the whole repository, failing the build on any violation; (2) limits on the
> size of every file and every function ([file lines] and [function lines]) and on the complexity
> of every function, failing the build when exceeded; (3) detection of duplicated code and of dead
> code (unused functions, variables, imports, dependencies); (4) a test coverage report with a
> ratchet: the measured coverage of today becomes the floor, and the build fails if it drops; (5)
> type checking if the language allows it. Run all of it now on the current code and write
> `docs/CODE_QUALITY.md` with: the tools, the configuration, every limit with its current measured
> value, and the list of what fails today with where it is. Do not fix anything yet: what fails
> today becomes pending items, and I decide which limits apply now and which are raised with a
> date. Make the whole set a gate in `docs/GATES.md`: nothing is merged with quality red.
>
> Extend this gate to the screen frontier, as Annex H section 4 declares: no
> business rule inside a screen, one typed client for every server call, one
> home for shared state, no user-visible string outside the translation
> catalogue, a stable identifier and role on every interactive element,
> styling only through tokens, and automatic basic accessibility checks.
> Every rule carries its stable id, its severity and its named verifier; the
> thresholds and the exceptions are declared by me in the project
> configuration file, and a rule switched off with no written exception is a
> failure of the gate, not a decision. `docs/CODE_QUALITY.md` and
> `docs/USABILITY.md` report result by result, never as a single number. The
> catalogue is `docs/ANEXO_HEURISTICAS.md`: cite it, do not copy it.
>
> Reply in my language.

> [de]
> Wir werden die Code-Qualität maschinell verifizieren lassen, denn niemand wird den Code lesen.
> Bau in der Continuous Integration, bei jedem Push, Folgendes auf: (1) einen Linter und einen
> Formatierer mit einer einzigen Konfiguration für das ganze Repository, die den Build bei jedem
> Verstoß fehlschlagen lassen; (2) Grenzen für die Größe jeder Datei und jeder Funktion
> ([Zeilen pro Datei] und [Zeilen pro Funktion]) und für die Komplexität jeder Funktion, die den
> Build beim Überschreiten fehlschlagen lassen; (3) Erkennung von dupliziertem Code und von totem
> Code (ungenutzte Funktionen, Variablen, Importe, Abhängigkeiten); (4) einen Bericht über die
> Testabdeckung mit Ratsche: die heute gemessene Abdeckung wird zum Boden, und der Build schlägt
> fehl, wenn sie sinkt; (5) Typprüfung, wenn die Sprache es erlaubt. Lass das alles jetzt über den
> aktuellen Code laufen und schreib `docs/CODE_QUALITY.md` mit: den Werkzeugen, der Konfiguration,
> jeder Grenze mit ihrem aktuell gemessenen Wert, und der Liste dessen, was heute fehlschlägt, mit
> dem Ort. Repariere noch nichts: was heute fehlschlägt, wird zu offenen Posten, und ich
> entscheide, welche Grenzen jetzt gelten und welche mit einem Datum angehoben werden. Mach aus
> dem Ganzen ein Tor in `docs/GATES.md`: nichts wird mit roter Qualität zusammengeführt.
>
> Erweitere dieses Tor bis an die Bildschirmgrenze, wie Abschnitt 4 von
> Anhang H es erklärt: keine Geschäftsregel in einem Bildschirm, ein
> einziger typisierter Client für jeden Serveraufruf, ein einziger Ort für
> geteilten Zustand, kein sichtbarer Text außerhalb des
> Übersetzungskatalogs, stabile Kennung und Rolle an jedem interaktiven
> Element, Stile nur über Tokens und automatische grundlegende
> Barrierefreiheitsprüfungen. Jede Regel trägt ihre stabile Kennung, ihre
> Schwere und ihren benannten Prüfer; Schwellen und Ausnahmen erkläre ich in
> der Konfigurationsdatei des Projekts, und eine abgeschaltete Regel ohne
> schriftliche Ausnahme ist ein Ausfall des Tors, keine Entscheidung.
> `docs/CODE_QUALITY.md` und `docs/USABILITY.md` berichten Ergebnis für
> Ergebnis, nie als eine einzige Zahl. Der Katalog ist
> `docs/ANEXO_HEURISTICAS.md`: zitiere ihn, kopiere ihn nicht.
>
> Antworte in meiner Sprache.

Was ich hier verlange: die fünf Prüfungen, die ein menschlicher Prüfer machen würde, maschinell
gemacht und mit dem roten Build als Konsequenz, denn eine Prüfung, die nicht blockiert, ist ein
Ratschlag; die Grenzen mit ihrem gemessenen Wert, damit die Grenze aus der Zahl kommt und nicht
aus einer Meinung; die Abdeckungs-Ratsche, die das Stück ist, das verhindert, dass die Qualität
von allein verfällt; und **noch nichts zu reparieren**, denn in einem System mit bereits
geschriebenem Code ist der erste Lauf immer rot, und die Entscheidung, was jetzt repariert und was
mit Datum toleriert wird, ist meine.

**Routine (kommt in die Arbeitsvereinbarung):**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- `docs/CODE_QUALITY.md`, von dir gelesen: verstehst du jede Grenze und warum sie da ist?
- Deine Entscheidung über die Liste dessen, was heute fehlschlägt: was jetzt repariert wird (je
  ein offener Posten) und was mit Datum toleriert wird, in dieselbe Datei geschrieben.
- `docs/WORKING_AGREEMENT.md`, wo die Routine hinkommt.
- Akzeptabler Mindestzustand: das Tor ist grün, oder jedes Rot hat einen offenen Posten oder ein
  Datum.

> Every pending item is closed with the quality gate green: linter, formatter, size and
> complexity limits, no new duplication, no dead code, coverage at or above the ratchet. A quality
> failure is fixed in the same commit, never silenced with an exception, and a limit is never
> raised to pass; if a limit must change, say so with the reason and I decide. At the close of
> every block, show me `docs/CODE_QUALITY.md` with the numbers of the block against the previous
> one.

> [de]
> Jeder offene Posten wird mit grünem Qualitätstor geschlossen: Linter, Formatierer, Grenzen für
> Größe und Komplexität, keine neue Duplizierung, kein toter Code, Abdeckung gleich hoch wie die
> Ratsche oder höher. Ein Qualitätsfehler wird im selben Commit repariert, nie mit einer Ausnahme
> zum Schweigen gebracht, und eine Grenze wird nie angehoben, um durchzukommen; wenn eine Grenze
> sich ändern muss, sag es mit der Begründung, und ich entscheide. Beim Abschluss jedes Blocks
> zeig mir `docs/CODE_QUALITY.md` mit den Zahlen des Blocks gegen die des vorherigen.

Was ich hier verlange: dass die Qualität Teil des Abschlusses jedes offenen Postens ist und keine
getrennte Aufgabe; das Verbot, sie zum Schweigen zu bringen (ein Modell vor einem roten Linter
neigt dazu, die Ausnahme hinzuzufügen, statt zu reparieren, weil das schneller geht) und die
Grenze anzuheben; und die Lektüre pro Block, die der einzige Moment ist, in dem du die Zahlen
ansiehst.

**Verpflichtend in jedem Projekt mit Nutzern (optional nur ohne echte Nutzer): Mutationstests.**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- Das Qualitätstor aufgebaut und grün, mit der in `docs/CODE_QUALITY.md` gemessenen Abdeckung.
- Mindestens ein Funktionsblock mit Schritt 8 geschlossen, damit es Tests gibt, die mutiert
  werden können.
- Deine Entscheidung über den Umfang, in einer Zeile geschrieben: der ganze Code (teuer, und nur
  einmal sinnvoll, als Basislinie) oder nur die von jedem offenen Posten geänderten Zeilen (das
  Normale).
- Akzeptabler Mindestzustand: es gibt eine gemessene Abdeckung und einen geschlossenen Block.

> Add mutation testing to the quality gate, [on the whole codebase | only on the lines changed by
> each pending item]: a tool that plants small deliberate bugs in the code (a flipped condition, a
> deleted line, a changed operator) and runs the tests. Run it now and write in
> `docs/CODE_QUALITY.md`: the tool, the scope, the number of mutants planted, how many the tests
> killed, how many survived and where. Do not fix anything yet: every surviving mutant in code
> that matters becomes a pending item for a test that catches it, and I decide which ones matter.
> From now on, report the mutation score at the close of every block next to the coverage, and
> treat a drop as a quality failure. Reply in my language.


> [de]
> Füge dem Qualitätstor Mutationstests hinzu, [auf dem ganzen Code | nur auf den von jedem offenen
> Posten geänderten Zeilen]: ein Werkzeug, das absichtlich kleine Fehler in den Code pflanzt (eine
> umgekehrte Bedingung, eine gelöschte Zeile, einen geänderten Operator) und die Tests laufen
> lässt. Lass es jetzt laufen und schreib in `docs/CODE_QUALITY.md`: das Werkzeug, den Umfang, die
> Zahl der gepflanzten Mutanten, wie viele die Tests getötet haben, wie viele überlebt haben und
> wo. Repariere noch nichts: jeder überlebende Mutant in Code, der zählt, wird zu einem offenen
> Posten für einen Test, der ihn fängt, und ich entscheide, welche zählen. Von jetzt an berichte
> die Mutationspunktzahl beim Abschluss jedes Blocks neben der Abdeckung, und behandle einen
> Rückgang als Qualitätsfehler. Antworte in meiner Sprache.

Was ich hier verlange: das Maß, das die Abdeckung nicht gibt (die Abdeckung sagt, welcher Code
ausgeführt wurde; die Mutation sagt, welcher Code bewacht ist); den Umfang, beschränkt auf die
geänderten Zeilen, was dafür sorgt, dass sich die Kosten bei jedem offenen Posten bezahlen lassen;
**noch nichts zu reparieren**, denn zu entscheiden, welcher Mutant zählt, ist meine Sache; und die
Punktzahl beim Abschluss jedes Blocks, neben der Abdeckung, mit einem Rückgang, der als Rot
behandelt wird.

## 3. Erwartetes Ergebnis

- Der Linter, der Formatierer, die Grenzen, die Erkennung von Duplizierung und totem Code, die
  Abdeckung mit Ratsche und die Typen, laufend bei jedem Push und rot, wenn es sein muss.
- `docs/CODE_QUALITY.md` mit Werkzeugen, Konfiguration, Grenzen mit gemessenem Wert, und der Liste
  dessen, was fehlschlägt, mit seinem offenen Posten oder seinem Datum.
- Das Tor in `docs/GATES.md` und die Routine in der Vereinbarung.
- In jedem Projekt mit Nutzern: die Mutationspunktzahl in `docs/CODE_QUALITY.md`, pro Block, neben
  der Abdeckung, und ein offener Posten für jeden überlebenden Mutanten in Code, der zählt.

## 4. Vollständigkeitsprüfung (die machst du, ohne Code zu lesen)

- Verlang den Link zum letzten Lauf der Kette: ist die Qualität grün?
- Verlang, dass er absichtlich, in einem Zweig, eine Funktion mit hundert Zeilen und eine
  ungenutzte Variable einbaut: wird die Kette wegen beider Dinge rot?
- Ist die Abdeckung von heute größer oder gleich der beim Abschluss des vorherigen Blocks? Verlang
  beide Zahlen.
- Gibt es irgendeine Linter-Ausnahme im Code? Verlang die Liste; jede muss eine geschriebene
  Begründung haben.
- Ist seit dem ersten Lauf irgendeine Grenze angehoben worden? Mit welcher Begründung und wer hat
  das entschieden?
- Wenn das Projekt echte Nutzer hat: laufen die Mutationstests? Wenn nicht, welche geschriebene
  Begründung rechtfertigt, sie nicht zu haben?
- Wenn es Mutationstests gibt: wie viele Mutanten haben im letzten Block überlebt, und hat jeder
  einen offenen Posten oder eine geschriebene Begründung?

## 5. Warnsignale

- Die Qualität war auf Anhieb grün über bereits geschriebenem Code. Das stimmt fast nie: die
  Grenzen sind viel zu locker.
- Der Agent schlägt vor, „diese Regel abzuschalten, weil sie zu streng ist“. Manchmal hat er
  recht; immer muss es über dich gehen, mit geschriebener Begründung.
- Die Abdeckung steigt, weil Tests hinzugefügt wurden, die nichts prüfen (das Grün, das einen Bug
  versteckt, Schritt 8). Die Ratsche misst Menge; das bewiesene Rot misst Qualität. Sie gehören
  zusammen.
- Eine Datei ist bis an die Grenze gewachsen und wurde in zwei Dateien mit demselben Inhalt
  geteilt. Das ist Duplizierung, als Einhaltung verkleidet.
- Die Abdeckung ist hoch und die Mutationspunktzahl niedrig. Das sind Tests, die den Code
  ausführen, ohne etwas zu prüfen: genau der Fall, den das bewiesene Rot aus Schritt 8 verhindern
  will.
- Das Projekt hat echte Nutzer, und niemand hat die Mutationstests laufen lassen oder
  aufgeschrieben, warum nicht. „Es ist optional“ ist für ein Projekt mit Nutzern keine gültige
  Begründung mehr.
