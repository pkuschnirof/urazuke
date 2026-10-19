# Urazuke — der Kurs. Handbuch mit praktischen Aufgaben, Schritt für Schritt, bis zur Anwendung in Produktion

Autor: Pablo Kuschniroff, unterstützt von Claude Code. Version 2, 18. Oktober 2026. Es ist ein
Arbeitsdokument des Projekts Urazuke: ich werde es mit der ersten Kohorte korrigieren, die es
benutzt. Es ist in der Sprache des Alltags geschrieben, und jede Abkürzung oder jeder seltsame
Ausdruck steht im Glossar des Hauptdokuments (`ESCALERA_METODOLOGICA.md`). Wenn ich einen realen
Fall zitiere, tue ich das mit einer Marke `[Ref. N]`, die zum [Referenzdokument](REFERENCIAS.md)
führt; das Handbuch bleibt sauber, und das Detail ist einen Klick entfernt. Das öffentliche
Repository der Methode ist
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## Bevor es losgeht

### Für wen dieser Kurs ist

Für jemanden, der Software mit künstlicher Intelligenz bauen will **und will, dass diese Software
wirklich benutzt wird**, von echten Menschen, monatelang. Es ist kein Programmierkurs: du wirst
keine Sprache und kein Framework lernen. Es ist auch kein „Prompt“-Kurs: du wirst keine Tricks
lernen, damit das Modell besser schreibt. Es ist ein Kurs über **Methode**: darüber, was in
welcher Reihenfolge zu tun ist, was man in jedem Moment vom Modell verlangt, was es dir liefern
muss, und wie du —ohne Code zu lesen— weißt, dass das, was es dir geliefert hat, vollständig ist.

Er nützt dir, wenn du eine dieser Personen bist:

- Du hast ein Geschäft, eine Praxis, eine kleine Beratungsfirma, und willst dein eigenes System,
  ohne ein Entwicklungsteam zu engagieren.
- Du bist Berater oder Freelancer für Automatisierung, und deine Kunden verlangen „etwas mehr“ als
  einen Roboter.
- Du kannst programmieren, willst aber, dass das Modell die schwere Arbeit macht und du dir die
  Entscheidungen behältst.
- Du hast schon etwas „gevibecodet“, es hat zwei Wochen funktioniert, und im Monat drei ist es dir
  abgestürzt.

Er nützt dir nicht, wenn du einen Prototyp für eine Demo am Freitag willst. Dafür gibt es
schnellere Werkzeuge, und diese Methode wird dir langsam vorkommen. Die Methode ist für das, was
nach der Demo weiter funktionieren muss.

### Was du am Ende haben wirst

Eine eigene Anwendung, die in Produktion läuft, mit: Tests, die man hat fehlschlagen sehen, bevor
sie bestanden; Ende-zu-Ende-Tests aller Flüsse; reproduzierbares Deployment mit Rollback;
Konfiguration und Geheimnisse außerhalb des Repositorys; die Geschäftsentscheidungen schriftlich
mit Datum; ein semantischer Baum des Systems und die detaillierte Spezifikation jeder Sache, die
gebaut wurde, in ihren offenen Posten; Sperren auf allem, was abbucht, sendet oder löscht; drei
Handbücher, denen eine Person ohne KI folgen kann; ein Audit, gemacht von einem anderen Agenten
als dem, der gebaut hat; und eine Retrospektive mit Zahlen. Das ist es, was ich hier „production
grade“ nenne: nicht, dass es funktioniert, sondern dass es **sich halten lässt**.

Und du wirst noch etwas haben, das das ist, was du wirklich mitnimmst: den Reflex, dem Modell ohne
Beleg nicht zu glauben, und genau zu wissen, welchen Beleg du in jedem Schritt von ihm verlangen
musst.

### Was du brauchst

1. **Ein KI-Werkzeug zum Programmieren.** Irgendeines, das Dateien in deinem Repository lesen und
   schreiben und Befehle ausführen kann: Claude Code, Cursor, Codex CLI, Gemini CLI, Forge. Die
   Methode hängt nicht davon ab, welches; das Hauptdokument hat eine Tabelle, wohin jedes Artefakt
   in jedem Werkzeug gehört. In diesem Handbuch sage ich „der Agent“, um das zu bezeichnen, das du
   benutzt.
2. **Ein Konto bei GitHub** (oder Gleichwertiges) und Grundkenntnisse darüber, was ein Repository,
   ein Commit und ein Push ist. Wenn du sie nicht hast, widme ihnen einen Nachmittag, bevor du
   anfängst; jedes Einführungstutorial reicht. Mehr braucht es nicht.
3. **Ein Projekt.** Ideal ist, dass es deines ist: ein System, das du brauchst oder das ein Kunde
   von dir verlangt hat, mit Nutzern, die es benutzen werden. Wenn du keines hast, nimm das
   **Leitprojekt**, das ich unten beschreibe; es ist so gedacht, dass es durch die vierundzwanzig
   Schritte geht, ohne einen zu überspringen. Wenn das, was du hast, ein System ist, das schon
   existiert und korrigiert oder weiterentwickelt werden muss, lehrt dich dieser erste Teil die
   Methode an einem neuen Projekt, und [Teil 2 des Kurses](MANUAL_CURSO_EVOLUTIVO.md) lehrt dich,
   es zuerst zu normalisieren, mit einem zweiten geerbten Leitprojekt.
4. **Zeit.** Der Kurs hat vierundzwanzig Lektionen, eine pro Schritt, und eine Reihenfolge, die
   dir sagt, in welche Etappe jede Sache fällt (siehe „Die Reihenfolge des Kurses“). Ich gebe
   dir absichtlich keine Fristen: die Methode ist ein Prozess, keine Versprechung von
   Geschwindigkeit, und wie lange jede Etappe dauert, bestimmt die Größe deines Projekts. Was
   ich dir sehr wohl gebe, ist die Reihenfolge, und die ist nicht verhandelbar.
5. **Einen Eigentümer der Domäne mit Zeit zum Entscheiden.** Wenn das Projekt deines ist, bist du
   das. Wenn es das eines Kunden ist, ist es der Kunde, und er muss wissen, dass er während des
   ganzen Projekts Fragen beantworten müssen wird. Dieser Punkt ist nicht verhandelbar: ohne
   Eigentümer, der entscheidet, entscheidet das Modell, und dann bricht die Methode.

### Wie der Kurs abläuft

Jede Lektion hat dieselbe Struktur:

- **Was du verstehen musst**: das Konzept, erklärt, wie man es einem Menschen erklärt.
- **Die Aufgabe**: Schritt für Schritt, mit dem exakten Prompt, den du dem Agenten geben wirst
  (auf Englisch, weil die Modelle Anweisungen auf Englisch präziser befolgen; jeder bringt seine
  Übersetzung mit, und darunter ist erklärt, was du verlangst) und was mit dem zu tun ist, was er
  dir zurückgibt. Vor jedem Prompt steht ein Block, der **„Bevor du den Prompt schickst“** heißt:
  die Dateien und die Eingaben, die du selbst, mit deinen Händen, gemacht haben musst, bevor du
  ihn einfügst. Überspring ihn nicht: der Prompt nennt diese Dateien, und wenn sie nicht
  existieren oder leer sind, wird der Agent sie erfinden oder dich nach ihnen fragen.
- **Die Vollständigkeitsprüfung**: die Liste der Fragen, die du dir über das stellst, was der Agent
  geliefert hat, ohne den Code zu öffnen. Wenn eine „nein“ ergibt, ist die Lektion nicht beendet.
- **Das Ergebnis**: die Datei oder der Beleg, der am Ende existieren muss.
- **Typische Fehler**: was fast allen beim ersten Mal passiert.
- **Im Leitprojekt**: wie diese Lektion auf das Beispielprojekt angewendet aussieht.

Eine Regel für den ganzen Kurs: **geh nicht zum nächsten Schritt mit einer Prüfung auf „nein“**.
Die Versuchung des „das repariere ich später“ ist genau das, wozu die Methode existiert, um es zu
vermeiden. Wenn ein Schritt nicht vollständig erklommen wird, wird der nächste auf Sand gebaut.

### Die Reihenfolge des Kurses: wann jede Sache gemacht wird

Das Hauptdokument hat in seinem Teil B die vollständige Zeitlinie der Methode. Hier übersetze ich
sie in die Reihenfolge des Kurses für das Leitprojekt. Es sind Etappen, keine Wochen: jede dauert,
was dein Projekt verlangt, und was nicht verhandelbar ist, ist die Reihenfolge und vor allem, was
zwischen Lektion und Lektion passiert.

| Etappe | Lektionen | Was du zusätzlich zu den Lektionen machst |
|---|---|---|
| 0 | keine | **Aufnahme**: du interviewst den Eigentümer und schreibst in Prosa auf, was er will, für wen, was heute passiert, was Konsequenzen hat, welche Zahlen nur er weiß. Du benennst die Anwendungsfälle, die du kannst („die Empfangskraft trägt einen Termin ein“), zeichnest die Hauptbildschirme, und sei es von Hand, und listest die Entitäten des Geschäfts mit ihren Zuständen. Absichtlich unvollständig. |
| 1 | 0, 1, 2, 3, 4 | **Start, am Stück.** Eignung, Vereinbarung, Definition mit semantischem Baum, Dimensionierung, und das Skelett mit **der gesamten Infrastruktur und der Integrations- und Deployment-Kette**: Repository, Testumgebung, Continuous Integration, erstes leeres Deployment. Zum Abschluss öffnest du die URL und siehst den leeren Bildschirm. |
| 2 | 5, 6, 8, 10 | **Erster Funktionsblock** (die Grundagenda). Du öffnest den Block, indem du die Anfrage in spezifizierte offene Posten verwandelst. Mit jedem offenen Posten: Entscheidungen, roter Test, Ende-zu-Ende-Test des Flusses, Screenshot des Bildschirms, den du dir ansiehst. Beim Abschluss des Blocks: vollständige Ende-zu-Ende-Batterie, und du benutzt das System in der Testumgebung entlang der Flüsse des Blocks. |
| 3 | 7, 9, 11, 12 | **Zweiter Block** (Patienten und Suche). Die vier restlichen Lektionen der Schleife werden an diesem Block gelernt. Derselbe Abschluss: Ende zu Ende aller Flüsse, menschliche Tests, Benutzerhandbuch mit den neuen Bildschirmen. |
| 4 | 13, 14 | **Produktionsfreigabe, erste Hälfte.** Audit durch eine andere Sitzung. Sperren. Und erst danach der **dritte Block** (Erinnerungen und Anzahlung), gebaut mit der vollständigen Schleife und im Trockenlauf belassen. |
| 5 | 15, 16, 17, 18, 19, 20 | **Produktionsfreigabe, zweite Hälfte.** Abschluss der Kette in die Produktion mit getestetem Rollback. Beobachtbarkeit mit konfigurierbarem Level, Persistenz vorher und nachher gemessen, Schwachstellen-Scan als Tor, Lasttest mit dem Bruchpunkt. Die drei Handbücher; jemand, der nicht programmiert, folgt dem Wiederherstellungshandbuch. **Abnahmetests** von dir oder vom Eigentümer über alle Flüsse. Erstes Deployment in die Produktion ohne Nutzer. |
| 6 | 21, 22, 23 | **Betrieb.** Du schaltest die Erinnerungen frei, nachdem du das Trockenlauf-Protokoll angesehen hast. Die beiden Monitorings, aufgebaut mit dem Deployment: Ressourcen und Leistung, Fehler; der erste zyklische Bericht mit der Eigentümerin gelesen. Residenter Agent. Retrospektive mit Zahlen und Änderungsvorschlag für die Leiter. |

Wenn dein Projekt größer ist, wachsen die Etappen 2 und 3 (mehr Blöcke), nicht die 1 und nicht
die 4 und 5. Und wenn du dich irgendwann dabei ertappst, in Etappe 3 Infrastruktur zu machen oder
in Etappe 5 die Ende-zu-Ende-Batterie zum ersten Mal laufen zu lassen, geh zur Reihenfolge
zurück: etwas wurde übersprungen.

### Das Leitprojekt: „Turnera“

Wenn du kein eigenes Projekt hast, nimm dieses. Es ist klein, hat aber alles, was nötig ist, damit
keiner der vierundzwanzig Schritte nur zum Schein ist: echte Nutzer, personenbezogene Daten,
Nachrichten, die in die Welt hinausgehen, und Geld.

**Das Geschäft.** Eine Praxis (es kann eine Kanzlei, ein Friseursalon, eine Werkstatt sein: jeder
Ort, der Termine vergibt). Heute werden die Termine in ein Heft eingetragen und per WhatsApp von
Hand bestätigt. Termine gehen verloren, weil die Leute es vergessen, es gibt Doppelbuchungen, weil
zwei Personen in verschiedene Hefte eingetragen haben, und niemand weiß, wie viele Termine im
letzten Monat abgesagt wurden.

**Was sie wollen.** Eine Web-Agenda, in der die zwei Empfangskräfte und die drei Fachkräfte die
Termine sehen; automatische Erinnerungen 24 Stunden vorher, per WhatsApp oder E-Mail; die
Möglichkeit, für bestimmte Termine eine Anzahlung per Zahlungslink zu verlangen; und ein paar
Zahlen am Monatsende (wie viele Termine, wie viele Ausfälle, wie viele Anzahlungen).

**Die Eigentümerin.** Die Leiterin der Praxis. Sie hat Urteilsvermögen über das Geschäft (sie
weiß, welche Termine eine Anzahlung brauchen, wie lange vorher man absagen kann, was man einem
Patienten sagt, der dreimal nicht erschienen ist) und hat fünfzehn Minuten am Tag, um Fragen zu
beantworten. Sie programmiert nicht und wird keinen Code lesen.

**Die Zahlen, die nur sie weiß.** Etwa vierzig Termine am Tag, zweihundertfünfzig Tage im Jahr.
Etwa drei Nachrichten pro Termin (Bestätigung, Erinnerung, manchmal Verschiebung). Die Daten der
Patienten werden fünf Jahre aufbewahrt. Die Spitze ist Montagmorgen, mit den zwei Empfangskräften,
die gleichzeitig eintragen. Und eine Frage, die sie nicht beantworten kann und die wichtig ist:
wenn das funktioniert, werden sie es an andere Praxen verkaufen? (Die Antwort ändert die
Dimensionierung um das Zehnfache.)

**Was Konsequenzen hat.** Eine Erinnerung senden (wird sie zweimal gesendet, stört es; wird sie an
die falsche Nummer gesendet, ist es ein Datenschutzproblem). Eine Anzahlung einziehen (Geld). Einen
Termin absagen (unumkehrbar für den Patienten, der ihn verliert). Einen Patienten löschen
(personenbezogene Daten).

**Die Anwendungsfälle, die die Leiterin benennt**, so wie sie sie sagt: „ich trage einen Termin
ein“, „ich suche einen Patienten“, „ich sage einen Termin ab“, „der Patient bekommt die
Erinnerung“, „ich verlange die Anzahlung“, „ich sehe, wie viele Termine es diesen Monat gab“. Es
sind sechs; sie werden die Ende-zu-Ende-Flüsse sein.

Damit reicht es zum Anfangen. Alles Weitere wird der Agent fragen, und es ist Teil der Übung, dass
er es fragt.

---

## Startabschnitt: Lektionen 0 bis 4

Diese fünf Lektionen werden einmal pro Projekt gemacht, in Etappe 1, bevor Funktionalität
geschrieben wird. Sie sind die, bei denen die Versuchung zu überspringen am größten ist („ich will
etwas laufen sehen“), und die, deren Überspringen am teuersten kommt. Mach sie am Stück, und öffne
erst danach die Schleife.

### Lektion 0 — Lässt sich dieses Projekt so angehen?

**Was du verstehen musst.** Die Methode taugt nicht für jedes Projekt, und das vor dem Anfangen zu
wissen ist die erste Qualitätsentscheidung. Es gibt zwei Bedingungen, ohne die sie nicht
funktioniert: dass es ein Standard-Repository gibt, in dem der Beleg hinterlassen wird (X1), und
dass sich die Bildschirme programmatisch bedienen lassen, um Ende zu Ende zu testen, vom
Bildschirm bis zum Backend (X2). Wenn eine der beiden fehlt, wird sich der Agent nicht selbst
prüfen können, und dann wirst am Ende du Code lesen, was genau das ist, was die Methode zu
vermeiden verspricht. Beide habe ich aus Projekten gezogen, die ich abgelehnt habe
[Ref. 46](REFERENCIAS.md#ref-46). Danach gibt es gewichtende Kriterien (ob es einen Eigentümer mit
Zeit gibt, ob der Fehler Konsequenzen hat, ob sich in einer getrennten Umgebung testen lässt usw.),
die ich noch kalibriere.

Für das Leitprojekt sind beide Bedingungen erfüllt: es ist ein neues Projekt (es gibt kein
Altsystem), und wir werden es mit einer programmatisch bedienbaren Weboberfläche bauen. Bei einem
eigenen Projekt kann diese Lektion mit „no-go“ enden, und das ist ein gültiges Ergebnis des Kurses.

**Die Aufgabe.**

**Bevor du den Prompt schickst**, mit deinen Händen (der Agent kann das nicht für dich tun):

- `docs/INITIAL_SURVEY.md`: das schreibst du von Hand, aus der Aufnahme der Etappe 0: was der Kunde
  will, für wen, was heute ohne das System passiert, welche Technologie es gibt oder vorgeschlagen
  wird, ob es ein Vorgängersystem gibt und ob es ein Repository hat, ob sich die Bildschirme
  programmatisch werden bedienen lassen, wer der Eigentümer ist und wie viel Zeit er hat, welche
  Konsequenz ein Fehler hat, welche Umgebungen es geben wird. Eine halbe Seite. Es ist egal, ob es
  unvollständig ist; tatsächlich ist es Teil der Übung, dass es unvollständig ist, und was du
  nicht weißt, schreibst du als „ich weiß es nicht“.
- `docs/ELIGIBILITY_CRITERIA.md`: kopier das Kriterienblatt aus dem Hauptdokument (die
  Ausschlusskriterien X1 und X2 und die Kandidaten), mit den Spalten für Antwort, Quelle und grün
  oder rot leer. Füll es nicht selbst aus: das macht der Agent.
- Den Projektordner, noch leer bis auf diese zwei Dateien, mit dem Agenten darin geöffnet.
- Der vollständige Inhalt jeder Datei steht im Vertrag von Schritt 0, im selben Block.

1. Füg ihm diesen Prompt ein:

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

   Du verlangst von ihm, dass er die zwei Dateien liest, dass er **bewertet, ob die Erhebung
   ausreicht, und nach dem Fehlenden fragt, bevor er antwortet** (diese Klausel wiederholt sich in
   allen Prompts des Kurses; sie ist das Herz der Methode), dass er das Blatt ausfüllt und sagt,
   woher jede Antwort stammt, und dass er nicht entscheidet: die Entscheidung ist deine.

2. Beantworte seine Fragen. Wenn er dir keine gestellt hat, sei misstrauisch und frag ihn, was er
   angenommen hat.
3. Wenn er dir das Blatt vorlegt, lies es und entscheide.

**Bevor du den Prompt schickst** zum Abschluss: deine Entscheidung in einer Zeile (go, no-go oder
go mit Bedingungen, jede Bedingung prüfbar und nicht mehr als drei), und die Antworten, die du auf
seine Fragen gegeben hast, in genau dieser Sitzung, denn der Prompt verlangt von ihm, sie
aufzunehmen.

4. Füg ihm den Abschluss-Prompt ein:

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.

> [de]
> Entscheidung: [go / no-go / go unter diesen Bedingungen: …]. Schreibe das endgültige Blatt nach
> `docs/ELIGIBILITY.md` mit dem Datum, wer entschieden hat, der Antwort auf jedes Kriterium mit
> ihrer Quelle, und den Bedingungen, falls es welche gibt. Nimm die Fragen auf, die du gestellt
> hast, und meine Antworten.

**Vollständigkeitsprüfung.** Öffne `docs/ELIGIBILITY.md` und frag dich: haben die zwei
Ausschlusskriterien eine explizite Antwort und Quelle? Gibt es ein Kriterium, das mit
„wahrscheinlich“ beantwortet ist? (Wenn ja, hätte der Agent fragen müssen.) Hat die Entscheidung
Datum und Namen? Lassen sich die Bedingungen, falls es welche gibt, prüfen? Stehen die Fragen, die
er gestellt hat, und deine Antworten drin?

**Ergebnis.** `docs/ELIGIBILITY.md`, eine Seite lang.

**Typische Fehler.** Die Erhebung „vollständig“ schreiben, damit der Agent nicht fragt: du
verpasst die Übung und, schlimmer, gewöhnst dich daran, die Arbeit des Modells zu machen. „Go“ mit
fünf Bedingungen antworten: das ist ein verkleidetes „no-go“. Und der häufigste: die Lektion
überspringen, weil „es offensichtlich ist, dass es geht“. Das Offensichtliche ist das, was nicht
aufgeschrieben wird, und was nicht aufgeschrieben wird, ist das, worüber später diskutiert wird.

**Im Leitprojekt.** Der Agent sollte mindestens fragen, ob die Oberfläche Web oder mobil sein
wird (denn X2 hängt davon ab), ob es ein Vorgängersystem gibt, und sei es ein Excel, und welcher
Nachrichtenkanal verwendet werden soll (WhatsApp hat Anforderungen, die E-Mail nicht hat). Das
Blatt endet mit „go“, mit einer vernünftigen Bedingung: den Nachrichtenkanal vor Schritt 14
festgelegt zu haben.

### Lektion 1 — Die Arbeitsvereinbarung

**Was du verstehen musst.** Der Agent kommt in jede Sitzung ohne Erinnerung an die vorherige. Er
ist wie ein neuer Mitarbeiter jeden Morgen. Die Arbeitsvereinbarung ist das, was du ihm am ersten
Tag sagst und was er jeden Tag wieder lesen wird: wie du arbeitest, was du nicht tolerierst,
welches Maß an Autonomie du ihm gibst. Ohne Vereinbarung wirst du ihm in jeder Sitzung dieselben
Dinge wiederholen, und jedes Mal ein bisschen anders. Ich habe sie zum ersten Mal geschrieben, nach
zwei Wochen des Mich-Wiederholens [Ref. 1](REFERENCIAS.md#ref-1).

Die sechs Mindestregeln haben jede einen Fehler hinter sich: „meine Zeit ist heilig“ verhindert,
dass er dich zu jedem Detail befragt; „null Schulden“ verhindert das „das repariere ich später“;
„exakter Umfang“ verhindert, dass er dir „wo er schon dabei ist“ Dinge hinzufügt; „Dokumentation
im selben Commit“ verhindert die alten Handbücher; „nie als erledigt melden, was nicht verifiziert
ist“ verhindert das „erledigt“, das keines war; „sprich meine Sprache“ verhindert, dass er dir auf
Englisch antwortet, weil der Prompt auf Englisch war.

**Die Aufgabe.**

**Bevor du den Prompt schickst**, mit deinen Händen:

- Deine Arbeitsvorlieben, fünf Minuten durchdacht und in einer kurzen Liste notiert (auf einem
  Zettel oder in `docs/MY_PREFERENCES.md`): willst du lieber viel oder wenig gefragt werden? In
  welcher Sprache? Wie viel Autonomie gibst du ihm (Commits allein, Deployment in die Testumgebung
  allein, Produktion nie)? Was bringt dich bei der Arbeit mit anderen Menschen aus der Fassung? Du
  wirst es ihm erzählen, wenn er fragt; die Liste ist dafür da, dass du nicht improvisierst.
- Den Projektordner mit dem Agenten darin geöffnet. Mehr nicht: es ist die erste Datei des
  Projekts.

1. Füg ihm diesen Prompt ein:

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

   Du verlangst von ihm die sechs Regeln mit dem Fehler, den jede verhindert, eigene Regeln als
   Vorschläge markiert, damit du sie annimmst oder ablehnst, und dass er dich über dich befragt.

2. Beantworte seine Fragen. Lies die Vorschläge: nimm die an, die dir nützen, lehn die ab, die
   nicht, immer mit einem einzeiligen Grund.

**Bevor du den Prompt schickst** zum Abschluss: dein Urteil über jeden Vorschlag des Agenten,
geschrieben: welche du annimmst [X, Y], welche du ablehnst [Z] und warum, je eine Zeile. Das kommt
in die Lücken des Prompts, und die füllst du.

3. Schließ ab mit:

> I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the
> agreement with today's date and a version number. Then add to the project file the
> instruction to read this agreement at the start of every session.

> [de]
> Ich akzeptiere die Regeln 1 bis 6 und deine Vorschläge [X, Y]; ich lehne [Z] ab, weil [Grund].
> Schließe die Vereinbarung mit dem heutigen Datum und einer Versionsnummer ab. Füge dann der
> Projektdatei die Anweisung hinzu, diese Vereinbarung zu Beginn jeder Sitzung zu lesen.

   Wenn es noch keine Projektdatei gibt (die machst du in Lektion 2), wird er eine minimale mit
   dieser Anweisung anlegen; das ist in Ordnung.

**Vollständigkeitsprüfung.** Sind die sechs Regeln da, jede mit dem Fehler, den sie verhindert?
Ist eine als Absichtserklärung geschrieben („versuchen, …“)? Ordnet die Projektdatei an, sie zu
Beginn jeder Sitzung zu lesen? Hat er dir mindestens eine Frage dazu gestellt, wie du arbeitest?

**Ergebnis.** `docs/WORKING_AGREEMENT.md` mit Datum und Version, eingehängt in die Projektdatei.

**Typische Fehler.** Zwanzig Regeln annehmen, weil alle gut klingen: niemand hält zwanzig ein;
sechs oder acht werden eingehalten. Eine Regel stehen lassen, die sagt, dass der Agent die
Vereinbarung ändern darf: nein. Und der leiseste: nie prüfen, ob er sie liest. In Lektion 2 wirst
du sehen, wie.

**Im Leitprojekt.** Eine eigene Regel, die der Agent für Turnera meist vorschlägt und die es wert
ist, angenommen zu werden: „ich sende nie eine echte Nachricht an einen Patienten aus einer
Umgebung, die nicht Produktion ist; in der Testumgebung gehen die Nachrichten in einen falschen
Postausgang“. Das ist Schritt 14, der früh hereinschaut.

### Lektion 2 — Die Projektdefinition, der semantische Baum und die Pflichtlektüre

**Was du verstehen musst.** Die Projektdatei (`PROJECT.md`, oder `CLAUDE.md`, oder der Name, den
dein Werkzeug verwendet) ist die Karte, die der Agent zu Beginn jeder Sitzung liest. Sie muss
**kurz** sein: was das System ist, für wen, was es NICHT ist, die Module, die getroffenen
Entscheidungen mit Datum, und die Anweisung, die Vereinbarung zu lesen. Was jeden Tag passiert ist,
gehört nicht hinein: es gehört in den lebenden Zustand (`docs/STATUS.md`) und ins Register der
offenen Posten. Eines meiner Systeme ließ diese Datei auf über neuntausend Zeilen wachsen; in
diesem Zustand liest sie niemand, auch nicht das Modell [Ref. 41](REFERENCIAS.md#ref-41).

Aber die Karte hat einen zweiten Teil, und das ist der, der die meiste Arbeit leistet: der
**semantische Baum**. Es ist das System als Baum zerlegt: die Domänen auf der ersten Ebene, und
unter jeder ihre Akteure, ihre Prozesse (die Anwendungsfälle, die du in der Aufnahme benannt hast,
mit Akteur, Auslöser, Schritten, Ergebnis und Ausnahmen), ihre Entitäten mit ihren Attributen und
ihren Zuständen, ihre Bildschirme und ihre externen Integrationen. Es ist das Domänenmodell der
Anforderungstechnik von jeher, in Baumform gebracht, damit das Modell es liest. An jedem Knoten
werden die offenen Posten und die Entscheidungen hängen, die ihn berühren. Sein Wert ist doppelt:
er gibt dem Agenten den exakten Kontext des Knotens, den er anfassen wird, und er gibt dir eine
Art, ohne Code zu lesen zu prüfen, dass das System, das der Agent versteht, das ist, das das
Geschäft verlangt hat. Wenn der Baum einen Zustand hat, den das Geschäft nie benannt hat, hat das
Modell ihn erfunden, und du wirst es sehen, bevor es darauf baut.

Der Abschnitt „was es NICHT ist“ bleibt der wichtigste und der, den alle leer lassen. Was nicht
aufgeschrieben ist, ist das, was das Modell erfinden wird, wenn es auf eine Lücke stößt.

**Die Aufgabe.**

**Bevor du den Prompt schickst**, mit deinen Händen:

- `docs/INITIAL_SURVEY.md`, vervollständigt mit dem, was du in Lektion 0 gelernt hast (die
  Antworten auf die Fragen des Agenten) und mit der Erhebung des Geschäfts: wer das System
  benutzt, welches Problem es löst, ein Abschnitt „was das System NICHT tun soll“, und seien es
  zwei Punkte, die Anwendungsfälle, die der Eigentümer benennt, mit seinen Worten, die Entitäten
  mit ihren Zuständen, die Zeichnungen der Bildschirme, und seien es Fotos eines Blatts Papier,
  die externen Integrationen, und die bereits getroffenen Entscheidungen, mit Datum. Wenn du eine
  Aufnahmemethode benutzt hast (Interviews, Anwendungsfälle, User Stories, Prototypen), sag welche
  und füg das Ergebnis ein.
- `docs/WORKING_AGREEMENT.md`, geschlossen (Lektion 1).
- Wenn es ein Vorgängersystem gibt, Lesezugang zu seinem Code oder zu seiner Dokumentation, in der
  Erhebung notiert.

1. Füg ihm ein:

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

   Du verlangst von ihm, dass er fragt, bevor er verfasst, eine kurze Projektdatei mit dem
   Abschnitt „was es nicht ist“, den semantischen Baum mit seiner vollständigen Struktur und mit
   den erschlossenen Knoten markiert, und den lebenden Zustand in einer anderen Datei.

2. Lies `PROJECT.md` ganz. Es muss in fünf Minuten passen. Korrigier, was nicht wahr ist oder
   nicht deins.
3. Geh den semantischen Baum durch, als wärst du der Kunde. Sieh dir jeden als erschlossen
   markierten Knoten an und bestätige oder korrigiere ihn. Such nach Akteuren, die fehlen,
   Entitätszuständen, die das Geschäft nicht verwendet, Bildschirmen, die du nicht verlangt hast.

**Bevor du den Prompt schickst** zum Abschluss: `PROJECT.md` von dir ganz gelesen, der Baum Knoten
für Knoten durchgegangen mit einem Urteil für jeden erschlossenen Knoten, und die Liste der
Korrekturen geschrieben für die Lücke [Liste] des Prompts. Wenn die Liste beim ersten Mal leer
ist, misstraue deiner Lesart.

4. Schließ ab mit:

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

5. **Die Leseprobe.** Schließ die Sitzung des Agenten und öffne eine neue. Ohne ihm etwas weiter
   zu sagen, frag ihn: „Was soll dieses System nicht tun? Und an welchem Knoten des Baums hängt
   der Bildschirm der Agenda?“. Wenn er dir mit dem antwortet, was `PROJECT.md` und der Baum
   sagen, funktioniert das Einhängen. Wenn er dir irgendetwas anderes antwortet, liest er die Karte
   nicht: prüf, wie dein Werkzeug die Projektdatei lädt.

**Vollständigkeitsprüfung.** Lässt sich `PROJECT.md` in fünf Minuten lesen? Sagt es, was das
System NICHT tut? Hat der Baum alle Akteure, die du kennst, und hat jede Entität die Zustände, die
das Geschäft verwendet, nicht mehr und nicht weniger? Hast du alle erschlossenen Knoten bestätigt
oder korrigiert? Hat jede Entscheidung ein Datum und wer sie getroffen hat? Hat der Agent etwas
gefragt, bevor er verfasst hat? Ist der lebende Zustand in einer anderen Datei? Hat er die
Leseprobe bestanden?

**Ergebnis.** `PROJECT.md` (höchstens dreihundert Zeilen), `docs/SEMANTIC_TREE.md` mit den
bestätigten Knoten, `docs/STATUS.md`, und die bestandene Leseprobe.

**Typische Fehler.** In `PROJECT.md` die ganze Spezifikation einfügen, die du schon hattest: es ist
das Programm, nicht die Spezifikation. „Was es nicht ist“ leer lassen. Den Baum annehmen, ohne ihn
durchzugehen: das Modell erschließt Zustände und Bildschirme mit einer Selbstverständlichkeit, die
Angst macht, und jeder erfundene Knoten ist Funktionalität, die es bauen wird, ohne dass sie jemand
verlangt hat. Und die Leseprobe nicht machen: sie ist die einzige Art zu wissen, dass Schritt 1 und
2 wirken und nicht nur existieren.

**Im Leitprojekt.** Unter „was es NICHT ist“ von Turnera sollten mindestens stehen: es ist kein
System für Krankenakten (es speichert keine medizinischen Daten), es ist kein Zahlungsanbieter (es
nutzt einen Zahlungslink eines Anbieters, es verarbeitet keine Karten), und es sendet keine
Marketing-Nachrichten (nur Bestätigungen und Erinnerungen). Der Baum hat eine Domäne „Agenda“ mit
den Akteuren Empfangskraft und Fachkraft, den Prozessen „Termin eintragen“, „Termin absagen“ und
„Patient suchen“, den Entitäten Termin (mit den Zuständen ausstehend, bestätigt, abgesagt,
nicht erschienen) und Patient, und den Bildschirmen „Tagesagenda“ und „Patientenakte“; eine
Domäne „Nachrichten“ mit dem Prozess „Erinnerung senden“, der Entität Nachricht und der
Integration mit dem WhatsApp-Anbieter; und eine Domäne „Zahlungen“ mit „Anzahlung verlangen“ und
der Integration mit dem Zahlungsanbieter. Wenn der Agent dir einen Zustand „verschoben“ beim
Termin hinzufügt, frag ihn, woher er den hat: die Leiterin hat ihn nicht genannt. Vielleicht
braucht es ihn, vielleicht nicht; das entscheidest du, nicht er.

### Lektion 3 — Dimensionieren, bevor die Architektur entworfen wird

**Was du verstehen musst.** Es gibt Entscheidungen, die, falsch getroffen, Wochen kosten: welche
Datenbank, ob die Aufrufe an die Datenbank synchron oder asynchron sind, wie viele Leute das
System gleichzeitig benutzen können. Und alle hängen von Zahlen ab, die **nur das Geschäft hat**:
wie viele Termine am Tag, wie viele Nachrichten pro Termin, wie viele Jahre aufbewahrt wird. Das
Modell kann diese Zahlen nicht erschließen; es kann erschließen, was sich aus ihnen ableitet
(Zeilen pro Jahr, Größe in fünf Jahren). Deshalb verlangt der Prompt von ihm, Primärdaten von
abgeleiteten zu unterscheiden und **die fehlenden Primärdaten zu erfragen, statt sie zu
schätzen**. Wenn das Modell ein Primärdatum schätzt, tut es das mit derselben sicheren Miene wie
beim Rechnen; und du hast keine Möglichkeit, es am Tonfall zu unterscheiden. Mich hat es eine
ganze Etappe der Neuentwicklung gekostet, das nicht rechtzeitig getan zu haben
[Ref. 15](REFERENCIAS.md#ref-15).

Es gibt außerdem eine Art von Entscheidung, die man immer treffen sollte: die **asymmetrischen**,
billig, wenn sie überflüssig sind, und sündhaft teuer, wenn sie fehlen. Das kanonische Beispiel
ist, die Schnittstelle zur Datenbank vom ersten Tag an asynchron zu machen, auch wenn die erste
Datenbank eine Datei ist: wenn du die Datenbank nie wechselst, war ein `await` zu viel; wenn du
wechselst, hast du dir erspart, alles neu zu schreiben.

**Die Aufgabe.**

**Bevor du den Prompt schickst**, mit deinen Händen und mit dem Eigentümer:

- `docs/VOLUME_SURVEY.md`: setz dich mit dem Eigentümer zusammen (oder mit dir selbst, wenn das
  Projekt deins ist) und schreib die Hauptentitäten (die des semantischen Baums) und wie viele es
  gibt, wie viele pro Monat hinzukommen, wie viele Ereignisse pro Entität, wie viele Personen in
  der Spitze arbeiten und wann die Spitze ist, wie lange die Daten aufbewahrt werden, ob es
  Ausnahmelasten gibt, welches Wachstum sie erwarten. Für jede Zahl notier, woher sie stammt: „hat
  die Leiterin gesagt“, „im Heft vom September gezählt“, „Annahme“. Lass einige absichtlich auf
  „Annahme“: du wirst sehen, was der Agent mit ihnen macht.
- `PROJECT.md` und `docs/SEMANTIC_TREE.md`, geschlossen (Lektion 2).
- Wenn es ein Vorgängersystem mit Datenbank gibt, einen nur lesenden Zugang, damit der Agent echte
  Zahlen zieht, mit der Verbindungszeichenfolge außerhalb des Repositorys.

1. Füg ihm ein:

> Before proposing any architecture we are going to size the system. Read `PROJECT.md` and the
> volume survey in `docs/VOLUME_SURVEY.md`. Distinguish primary data (facts only the business
> knows) from derived data (what can be computed from the primary data). Evaluate whether the
> primary data is complete enough to compute what follows; if any primary figure is missing, or
> is marked as an assumption, ask me for all the missing figures before going on. Never estimate
> a primary figure. If a previous system can be queried, use its real numbers and state where
> each came from. With the primary data complete, compute, showing the arithmetic: rows per year
> for the three largest tables, peak concurrency, data size at five years, and what breaks first
> if everything is multiplied by ten. Then present three options for persistence and concurrency,
> each with the cost of migrating to the others later. Do not choose: I choose. Do not write code.
> Reply in my language.

> [de]
> Bevor wir irgendeine Architektur vorschlagen, dimensionieren wir das System. Lies `PROJECT.md`
> und die Mengenerhebung in `docs/VOLUME_SURVEY.md`. Unterscheide Primärdaten (Fakten, die nur
> das Geschäft kennt) von abgeleiteten Daten (was sich aus den Primärdaten berechnen lässt).
> Bewerte, ob die Primärdaten vollständig genug sind, um das Folgende zu berechnen; wenn eine
> Primärzahl fehlt oder als Annahme markiert ist, bitte mich um alle fehlenden Zahlen, bevor du
> weitermachst. Schätze nie eine Primärzahl. Wenn ein Vorgängersystem abgefragt werden kann,
> verwende seine echten Zahlen und gib an, woher jede stammt. Mit vollständigen Primärdaten
> berechne, mit sichtbarer Rechnung: Zeilen pro Jahr für die drei größten Tabellen,
> Nebenläufigkeit in der Spitze, Datenvolumen nach fünf Jahren, und was zuerst bricht, wenn alles
> mit zehn multipliziert wird. Lege dann drei Optionen für Persistenz und Nebenläufigkeit vor,
> jede mit den Kosten, später zu den anderen zu migrieren. Wähle nicht: ich wähle. Schreibe
> keinen Code. Antworte in meiner Sprache.

   Du verlangst von ihm: Primärdaten von abgeleiteten unterscheiden; **dich um die Primärdaten
   bitten, die fehlen oder auf „Annahme“ stehen, und sie nie schätzen**; das Abgeleitete mit
   sichtbarer Rechnung berechnen; das Szenario „mal zehn“; drei Optionen mit den Kosten, von einer
   zur anderen zu wechseln; und dass er nicht wählt.

2. Wenn er dich um die „Annahmen“ bittet, gut: das war die Übung. Besorg die Zahlen (frag den
   Eigentümer, zähl im Heft) und gib sie ihm. Wenn er dich nicht darum gebeten und trotzdem
   gerechnet hat, halt an und frag ihn, was er mit den Annahmen gemacht hat: das ist ein Versagen
   des Schritts, und es lohnt sich, es jetzt zu sehen.
3. Lies die drei Optionen. Rechne eine Rechnung von Hand nach (zum Beispiel Zeilen pro Jahr der
   größten Tabelle): es muss dasselbe herauskommen. Wähle.

**Bevor du den Prompt schickst** zum Abschluss: die Annahmen, in Daten mit Quelle verwandelt, eine
von dir von Hand nachgerechnete Rechnung, die mit der des Agenten übereinstimmt, und die gewählte
Option mit einer Begründung in einer Zeile.

4. Schließ ab mit:

> I choose option [B]. Record in `docs/SIZING.md`: the primary data with its source, the derived
> data with its arithmetic, the three options, the chosen one and why, and the decisions we are
> taking "just in case" even though they are not needed today (for example: the persistence
> interface is asynchronous from line one, even if the first engine is synchronous). Include the
> questions you asked and my answers.

> [de]
> Ich wähle Option [B]. Halte in `docs/SIZING.md` fest: die Primärdaten mit ihrer Quelle, die
> abgeleiteten Daten mit ihrer Rechnung, die drei Optionen, die gewählte und warum, und die
> Entscheidungen, die wir „vorsichtshalber“ treffen, obwohl sie heute nicht nötig sind (zum
> Beispiel: die Persistenzschnittstelle ist ab der ersten Zeile asynchron, auch wenn die erste
> Engine synchron ist). Nimm die Fragen auf, die du gestellt hast, und meine Antworten.

**Vollständigkeitsprüfung.** Gibt es ein Primärdatum mit Quelle „Annahme“ oder ohne Quelle? Zeigt
jedes abgeleitete Datum die Rechnung, und stimmt sie, wenn du sie nachrechnest? Gibt es drei
Optionen und eine gewählte mit Grund? Sagt es, was „mal zehn“ passiert? Sind die asymmetrischen
Entscheidungen aufgeschrieben? Hat er dich gefragt?

**Ergebnis.** `docs/SIZING.md`.

**Typische Fehler.** Die Erhebung mit von dir erfundenen Zahlen vervollständigen, damit der Agent
nicht fragt (das ist derselbe Fehler wie in Lektion 0, und er ist hier schlimmer, weil diese
Zahlen die Architektur entscheiden). Die „leistungsfähigste“ Option vorsichtshalber wählen: die
Migrationskosten stehen genau deshalb in der Tabelle, damit du die kleinste wählst, die das „mal
zehn“ aushält. Und die asymmetrischen Entscheidungen nicht aufschreiben: wenn sie nicht
aufgeschrieben sind, wird der Agent sie in Lektion 4 nicht einhalten.

**Im Leitprojekt.** Primärdaten: 40 Termine/Tag × 250 Tage = 10.000 Termine/Jahr; 3 Nachrichten
pro Termin = 30.000 Nachrichten/Jahr; 5 Jahre Aufbewahrung; Spitze von zwei gleichzeitigen
Empfangskräften. Das „mal zehn“ ist die Frage, ob es an andere Praxen verkauft wird: 100.000
Termine und 300.000 Nachrichten pro Jahr. Die drei typischen Optionen: eine SQLite-Datei (reicht
für eine Praxis jahrelang, hält das „mal zehn“ mit mehreren Schreibenden nicht aus), PostgreSQL von
Anfang an (hält alles aus, kostet etwas mehr Infrastruktur), oder SQLite jetzt mit der asynchronen
Schnittstelle und einer vorgesehenen Migration zu PostgreSQL (die asymmetrische). Für den Kurs
wählen wir die dritte: sie lehrt am meisten.

### Lektion 4 — Das Skelett mit seinen Toren

**Was du verstehen musst.** Bevor das System etwas Nützliches tut, muss es **leer** starten,
getestet und deployt werden. Es wirkt wie Zeitverschwendung („was deployen, wenn es nichts
gibt?“) und ist das Gegenteil: der Weg in die Produktion ist Teil des Produkts, und die einzige
Art zu wissen, dass er funktioniert, ist, ihn zu gehen, solange es noch nichts zu verlieren gibt.
In einem meiner Systeme kam das Deployment einen Monat nach dem Start und kostete fünf offene
Posten in Folge [Ref. 32](REFERENCIAS.md#ref-32); mit dem im Start deployten Skelett
hätten diese fünf Schläge ins Leere getroffen.

Diese Lektion ist außerdem **der Ort, an dem die gesamte Infrastruktur und die Integrations- und
Deployment-Kette** des Projekts gemacht wird. Du wirst sie bis Lektion 15 nicht wieder anfassen,
und dazwischen wirst du die ganze Funktionalität darauf bauen. Deshalb nimmt sie den größten Teil
der Etappe 1 ein.

Die **Tore** sind die Bedingungen, um von einer Etappe zur anderen zu kommen („die Batterie ist
grün“, „das Deployment in die Testumgebung hat funktioniert“). Sie jetzt aufzuschreiben, auch wenn
sie offensichtlich wirken, ist das, was später erlaubt, „das geht nicht durch“ zu sagen, ohne zu
diskutieren.

**Die Aufgabe.**

**Bevor du den Prompt schickst**, mit deinen Händen:

- `docs/ENVIRONMENTS_SURVEY.md`: wo das System laufen wird (ein Server, den du schon hast, ein
  Cloud-Dienst), ob es eine Testumgebung und eine Produktionsumgebung geben wird, wer Zugang zu
  was hat, wie heute deployt wird, wenn es etwas gibt, und die Art des Projekts (neu, Korrektur
  oder Weiterentwicklung). Wenn du nichts hast, sag es: der Agent wird dir die einfachste Option
  vorschlagen. Der Prompt nennt sie „the environments survey“, ohne Pfad: sag ihm, wie sie heißt.
- Die Zugangsdaten des Ortes, an den deployt wird, und sei es ein kostenloser Dienst: angelegt,
  von dir geprüft, indem du ins Panel gehst, und außerhalb des Repositorys aufbewahrt; dem Agenten
  sagst du, wo sie liegen, du fügst sie ihm nicht in den Chat ein. Ohne das bleibt das Skelett auf
  deiner Maschine, und die Lektion lässt sich nicht beenden.
- `PROJECT.md` und `docs/SIZING.md`, geschlossen (Lektionen 2 und 3).

1. Füg ihm ein:

> We are going to build the skeleton of the system, with no functionality at all. Read
> `PROJECT.md`, `docs/SIZING.md` and the environments survey. Evaluate whether you have what is
> needed for the skeleton to run in the test environment (access, URL, deployment method); if
> anything is missing, ask me before starting. Then build: the folder structure; the server and
> the UI starting up; the test structure with one smoke test that passes; continuous
> integration running that test suite on every push; and the deployment to the test
> environment. Declare the gates of the workflow (what must be green to move from one stage to
> the next) in `docs/GATES.md`. When done, take a screenshot of the empty UI running in the
> test environment and show it to me. Do not add any functionality "while you are at it".
> Reply in my language.

> [de]
> Wir werden das Skelett des Systems bauen, ganz ohne Funktionalität. Lies `PROJECT.md`,
> `docs/SIZING.md` und die Umgebungserhebung. Bewerte, ob du hast, was nötig ist, damit das
> Skelett in der Testumgebung läuft (Zugang, URL, Deployment-Methode); wenn etwas fehlt, frag
> mich, bevor du anfängst. Baue dann: die Ordnerstruktur; den Server und die Oberfläche, die
> starten; die Teststruktur mit einem Smoke-Test, der besteht; Continuous Integration, die diese
> Testbatterie bei jedem Push ausführt; und das Deployment in die Testumgebung. Deklariere die
> Tore des Arbeitsablaufs (was grün sein muss, um von einer Etappe zur nächsten zu kommen) in
> `docs/GATES.md`. Wenn du fertig bist, mach einen Screenshot der leeren Oberfläche, die in der
> Testumgebung läuft, und zeig ihn mir. Füge keine Funktionalität „wo du schon dabei bist“ hinzu.
> Antworte in meiner Sprache.

   Du verlangst von ihm, dass er die Zugänge prüft, bevor er anfängt, die exakte Liste dessen, was
   ein Skelett ist, die Tore schriftlich, einen echten Screenshot aus der Testumgebung, und das
   Verbot, Funktionalität hinzuzufügen.

2. Diese Aufgabe ist lang und wird Hin und Her haben:
   Zugangsdaten, die fehlen, ein Dienst, der verlangt, die E-Mail zu bestätigen, usw. Das ist
   normal. Was nicht normal ist, ist, dass er dir „erledigt“ sagt ohne den Screenshot aus der
   Testumgebung.
3. Wenn er dir den Screenshot zeigt, öffne du die URL in deinem Browser. Es muss dasselbe zu sehen
   sein. Es ist der erste menschliche Blick auf das System, und es ist ein Meilenstein.

**Bevor du den Prompt schickst** zum Abschluss: dein Besuch der URL der Testumgebung gemacht, der
Link auf den grünen Lauf der Continuous Integration von dir geöffnet, und `docs/GATES.md` gelesen,
mit einer prüfbaren Bedingung pro Tor.

4. Schließ ab mit:

> Skeleton approved. Record in `docs/STATUS.md` the test environment URL, the command to run
> the tests and the command to deploy, and mark this step as done. Then run the deployment a
> second time and show me that the second run changed nothing.

> [de]
> Skelett freigegeben. Halte in `docs/STATUS.md` die URL der Testumgebung, den Befehl zum
> Ausführen der Tests und den Befehl zum Deployen fest, und markiere diesen Schritt als erledigt.
> Führe dann das Deployment ein zweites Mal aus und zeig mir, dass der zweite Lauf nichts geändert
> hat.

**Vollständigkeitsprüfung.** Hast du selbst die URL der Testumgebung geöffnet und den leeren
Bildschirm gesehen? Gibt es einen Link zu einem grünen Lauf der Continuous Integration? Wurde das
Deployment zweimal ausgeführt, und der zweite Lauf hat nichts gebrochen? Hat jedes Tor eine
prüfbare Bedingung? Gibt es irgendeine Funktionalität, die du nicht verlangt hast?

**Ergebnis.** Das Repository mit dem Skelett, die Continuous Integration grün, die URL der
Testumgebung, die funktioniert, `docs/GATES.md`, und `docs/STATUS.md` mit den drei Befehlen.

**Typische Fehler.** „Läuft lokal, das Deployment sehen wir später“ akzeptieren: nein, das
Deployment ist das Skelett. Einen Screenshot von der Maschine des Agenten statt aus der
Testumgebung akzeptieren. Und zulassen, dass er dir „wo er schon dabei ist“ einen
Login-Bildschirm, ein Menü, ein Logo hinzufügt: jede Sache, die ohne offenen Posten hereinkommt,
ist Umfang, der entwischt ist.

**Im Leitprojekt.** Das Skelett von Turnera ist eine Webseite, die „Turnera — Version 0.0.1“ sagt
und unter einer öffentlichen URL einer Testumgebung läuft, ein Server, der auf einer Health-Route
„ok“ antwortet, ein Smoke-Test, der diese Route aufruft, die Continuous Integration, die diesen
Test bei jedem Push laufen lässt, und das automatische Deployment in die Testumgebung. Die Tore:
„Batterie grün zum Mergen“, „Testumgebung grün zum Befördern in die Produktion“, „Rollback
getestet für das erste Deployment in die Produktion“. Mehr nicht. Und es ist seltsam, wie
befriedigend es ist, diese leere Seite unter einer echten URL zu sehen.

---

## Schleifenabschnitt: Lektionen 5 bis 12

Diese acht Lektionen sind die, die du **mit jeder Änderung** benutzen wirst, während des ganzen
Projekts. Sie werden in den Etappen 2 und 3 an den ersten zwei Funktionsblöcken gelernt und bis
zum Ende geübt. Sie stehen in der Reihenfolge, in der sie bei jedem offenen Posten gemacht werden:
einen Block öffnen, indem die Anfrage in spezifizierte offene Posten verwandelt wird, einen
nehmen, entscheiden, was fehlt, messen, was zu messen ist, bauen, rot und Ende zu Ende beweisen,
das Qualitätstor passieren, die manuellen Testfälle schreiben, die andere Seite aktualisieren, und
berichten und dabei das Verifizierte vom Geglaubten trennen. Beim Abschluss des Blocks führst du
die manuellen Testfälle selbst aus. Dieser Reflex ist die Methode.

Um sie zu üben, wirst du echte Funktionalität brauchen. Im Leitprojekt ist der erste Block die
Grundagenda: die Termine des Tages sehen, einen Termin eintragen, ihn absagen. Der zweite:
Patienten und Suche. Noch keine Nachrichten und keine Zahlungen; das kommt nach den Sperren
(Lektion 14).

### Lektion 5 — Der Plan sind die offenen Posten, und die detaillierte Spezifikation lebt in jedem einzelnen

**Was du verstehen musst.** Es gibt keinen „Plan“ auf der einen und keine „Aufgabenliste“ auf
der anderen Seite: **die Liste der offenen Posten ist der Plan**. Aber es gibt zwei weitere Ideen,
und sie sind es, die diese Methode von einer beliebigen Aufgabenliste unterscheiden.

Die erste: die **detaillierte Spezifikation lebt in jedem offenen Posten**. In der klassischen
Methode gab es ein Anforderungsspezifikationsdokument, lang, das alterte, bevor es fertig war.
Hier wird es zerlegt: jeder offene Posten bringt den Knoten des semantischen Baums mit, an dem er
hängt, die User Story oder den Anwendungsfall, der ihn auslöst, mit den Worten des Kunden, die
detaillierte Beschreibung, die anwendbaren Geschäftsregeln mit ihrer Entscheidung und ihrem
Datum, die Daten, die hinein- und hinausgehen, die betroffenen Bildschirme, die Randfälle, die
Abnahmekriterien in der Form „gegeben, wenn, dann“, und wie geprüft wird. Die Spezifikation eines
offenen Postens zu lesen ist das Nächste, was du dem Lesen von Code kommen wirst, und es ist genau
die richtige Distanz: dort erkennst du, dass der Agent etwas anderes verstanden hat, bevor er
baut.

Die zweite: **die geschlossenen Posten sind Dokumentation**. Wenn ein offener Posten geschlossen
wird, bleibt er mit seiner Spezifikation, der Entscheidung, die ihn ausgelöst hat, dem Beleg, mit
dem er geschlossen wurde, dem Commit und dem Datum. Die Warteschlange der geschlossenen Posten ist
die funktionale Historie des Systems, und daraus entstehen das Änderungsprotokoll und die neuen
Abschnitte des Handbuchs. Und die goldene Regel für den Agenten: was außerhalb der Liste auftaucht,
wird als neuer offener Posten notiert, mit seiner Spezifikation, nicht getan.

**Die Aufgabe.**

**Bevor du den Prompt schickst**, mit deinen Händen:

- Die Anfrage des Kunden für den ersten Funktionsblock, geschrieben in `docs/INITIAL_SURVEY.md`
  unter einer Überschrift mit dem Namen des Blocks, oder in einer separaten Datei (zum Beispiel
  `docs/blocks/BLOCK_01_REQUEST.md`; der Prompt sagt „the client's request for this block“ ohne
  Pfad, also sag ihm, wo sie liegt), so wie der Kunde sie sagen würde, mit ihren Mehrdeutigkeiten.
  Für Turnera: „ich will die Termine des Tages sehen, einen neuen eintragen und absagen“. Wenn du
  in der Aufnahme die Anwendungsfälle aufgeschrieben hast, füg sie auch ein: sie sind die
  natürliche Einheit des Blocks. Wenn der Eigentümer dir eine Priorität genannt hat, auch.
- `docs/SEMANTIC_TREE.md`, `PROJECT.md` und `docs/STATUS.md`, auf dem neuesten Stand (Lektion 2).

1. Füg ihm ein:

> We are going to turn everything that must be done in this block into numbered pending items,
> each one carrying its full specification. Read `PROJECT.md`, `docs/SEMANTIC_TREE.md`, the
> client's request for this block, and whatever is in `docs/STATUS.md`. If the request is
> ambiguous on any point such that you cannot write a verifiable pending item for it, ask me; do
> not resolve it by assuming. Then create or extend `docs/PENDING.md` with one item per thing to
> do, each with: number (PND-001 onwards); one-line title; the node of the semantic tree it hangs
> from; the user story or use case that originates it, in the client's words; the detailed
> description; the business rules that apply, each with its decision and date, or marked as
> "rule missing, asked"; the data in and out; the screens affected; the edge cases and
> exceptions; the acceptance criteria in the form "given, when, then"; how it will be verified
> as done; and status. If a node the item needs does not exist in the tree, propose it and mark
> it. Order the items by the priority I gave you; if I gave none, propose an order and tell me
> why. Reply in my language.

> [de]
> Wir werden alles, was in diesem Block zu tun ist, in nummerierte offene Posten verwandeln,
> jeder mit seiner vollständigen Spezifikation. Lies `PROJECT.md`, `docs/SEMANTIC_TREE.md`, die
> Anfrage des Kunden für diesen Block und was in `docs/STATUS.md` steht. Wenn die Anfrage in
> irgendeinem Punkt so mehrdeutig ist, dass du keinen prüfbaren offenen Posten dafür schreiben
> kannst, frag mich; löse es nicht durch Annahmen. Lege dann `docs/PENDING.md` an oder erweitere
> es mit einem Eintrag pro Sache, die zu tun ist, jeder mit: Nummer (ab PND-001); einzeiligem
> Titel; dem Knoten des semantischen Baums, an dem er hängt; der User Story oder dem
> Anwendungsfall, der ihn auslöst, in den Worten des Kunden; der detaillierten Beschreibung; den
> anwendbaren Geschäftsregeln, jede mit ihrer Entscheidung und ihrem Datum, oder markiert als
> „Regel fehlt, nachgefragt“; den Daten, die hinein- und hinausgehen; den betroffenen
> Bildschirmen; den Randfällen und Ausnahmen; den Abnahmekriterien in der Form „gegeben, wenn,
> dann“; wie geprüft wird, dass er erledigt ist; und dem Status. Wenn ein Knoten, den der Eintrag
> braucht, im Baum nicht existiert, schlag ihn vor und markiere ihn. Ordne die Einträge nach der
> Priorität, die ich dir gegeben habe; wenn ich keine gegeben habe, schlag eine Reihenfolge vor
> und sag mir, warum. Antworte in meiner Sprache.

   Du verlangst von ihm, dass er die Anfrage in prüfbare Einträge verwandelt, dass er **fragt,
   wenn die Anfrage nicht ausreicht, um einen prüfbaren zu schreiben**, die vollständige
   Spezifikation jedes einzelnen Feld für Feld, den Knoten des Baums, an dem er hängt, die
   Geschäftsregeln mit ihrer Entscheidung oder als fehlend markiert, die Abnahmekriterien, die
   später das Drehbuch des Tests sein werden, und eine Reihenfolge mit ihrem Grund.

2. Beantworte die Fragen (für Turnera wird er zum Beispiel fragen, was „der Tag“ ist: der heutige,
   oder ein beliebiger, den man wählt?; löscht Absagen oder markiert es?). Diese Fragen sind
   Geschäftsentscheidungen; in Lektion 6 wirst du sehen, wo sie aufgeschrieben werden.
3. **Lies die Spezifikation jedes offenen Postens**, als wärst du der Kunde. Das ist die wichtigste
   Aufgabe der Lektion, und die, bei der die Versuchung zu überspringen am größten ist. Beschreibt
   sie, was du verlangt hast, mit deinen Worten? Sind die Abnahmekriterien die, die du verwenden
   würdest, um „so ist es richtig“ zu sagen? Gibt es einen Randfall, den du kennst und der nicht
   drin ist? Hängt er am richtigen Knoten? Korrigier, bevor irgendetwas gebaut wird.

**Bevor du den Prompt schickst** der Routine: `docs/PENDING.md` mit dem spezifizierten Block, von
dir Posten für Posten gelesen, mit deinen Korrekturen gemacht (kein offener Posten mit einer
Spezifikation von einer Zeile), und `docs/WORKING_AGREEMENT.md`, wo die Routine hinzugefügt wird.

4. Füg der Arbeitsvereinbarung die Routine jeder Sitzung hinzu. Füg ihm ein:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before touching any code, open
> `docs/PENDING.md`, tell me which item you are taking and why, and re-read its specification.
> Every commit cites its pending item. A pending item is closed with written evidence (the test
> counts red and green, the screenshot, the measured number), never with 'done'. When you close
> it, keep it in the register with its full specification and add: the evidence, the commit, the
> date, and any decision that was taken along the way; that record is the documentation of what
> was built. If along the way you see something that is not on the list, add it as a new pending
> item with its specification; do not do it."

> [de]
> Füge diese Routine zu `docs/WORKING_AGREEMENT.md` hinzu: „Bevor du Code anfasst, öffne
> `docs/PENDING.md`, sag mir, welchen Posten du nimmst und warum, und lies seine Spezifikation
> noch einmal. Jeder Commit zitiert seinen offenen Posten. Ein offener Posten wird mit
> schriftlichem Beleg geschlossen (die Testzahlen in Rot und Grün, der Screenshot, die gemessene
> Zahl), nie mit ‚erledigt‘. Wenn du ihn schließt, lass ihn mit seiner vollständigen
> Spezifikation im Register und füge hinzu: den Beleg, den Commit, das Datum und jede
> Entscheidung, die unterwegs getroffen wurde; dieser Eintrag ist die Dokumentation dessen, was
> gebaut wurde. Wenn du unterwegs etwas siehst, das nicht auf der Liste steht, füge es als neuen
> offenen Posten mit seiner Spezifikation hinzu; tu es nicht.“

5. Jetzt ja, fang an zu bauen. Bitte ihn, den ersten offenen Posten zu nehmen. Ab hier beginnt
   jede Sitzung mit „welchen Posten nimmst du und warum“, und jeder Abschluss lässt den Posten
   dokumentiert zurück.

**Vollständigkeitsprüfung.** Lies die Spezifikation eines zufälligen offenen Postens: hat sie alle
Felder, und beschreibt sie, was du verlangt hast? Hängt jeder offene Posten an einem Knoten des
Baums, den du erkennst? Sagt jeder, wie er geprüft wird? Gibt es Regeln, die als „fehlt,
nachgefragt“ markiert sind, nach denen du nicht gefragt wurdest? Gibt es geschlossene Posten ohne
Beleg und Commit? Behalten die geschlossenen ihre Spezifikation und ihre Abschlussdokumentation?
Nimm drei Commits nach Zufall: zitieren sie ihren Posten? Ist im Code etwas ohne offenen Posten
aufgetaucht?

**Ergebnis.** `docs/PENDING.md` mit dem ersten Block spezifiziert, die Routine in der
Vereinbarung, und der erste offene Posten in Arbeit.

**Typische Fehler.** Einzeilige Spezifikationen akzeptieren: der Agent hat sie der Form halber
geschrieben und wird beim Bauen erfinden, was fehlt. Die Spezifikationen nicht lesen: es ist der
einzige Moment, in dem du ein Missverständnis abfangen kannst, bevor es kostet. Den Agenten offene
Posten ohne Beleg schließen lassen, weil „ich es schon habe funktionieren sehen“. Ihn ohne
Dokumentation schließen lassen: sechs Monate später weiß niemand, warum das System tut, was es
tut. Und der, der am schwersten zu korrigieren ist: ihn „eine Kleinigkeit mehr“ außerhalb der
Liste machen lassen. Beim ersten Mal, dass du es zulässt, hast du den exakten Umfang verloren.

**Im Leitprojekt.** Der erste Block von Turnera sind etwa sechs offene Posten, an der Domäne
„Agenda“ des Baums hängend: PND-001 die Termine eines Tages sehen; PND-002 einen Termin eintragen
mit Patient, Fachkraft, Datum und Uhrzeit; PND-003 zwei Termine derselben Fachkraft zur selben
Uhrzeit verhindern; PND-004 einen Termin absagen (markieren, nicht löschen: Entscheidung aus
Lektion 6); PND-005 einen Patienten nach Name oder Telefon suchen; PND-006 die Anlage eines
Patienten mit den Mindestdaten. Die Spezifikation von PND-003 zum Beispiel sagt: Knoten Agenda →
Prozess „Termin eintragen“ → Entität Termin; Story: „es darf keine zwei Termine derselben
Fachkraft zur selben Uhrzeit geben, das ist mir mit dem Heft zweimal passiert“ (Worte der
Leiterin); Regel: „Doppeltermin nur, wenn die Fachkraft ihn freigegeben hat“ (Entscheidung
ausstehend, nachgefragt); Daten: Fachkraft, Datum, Beginnzeit, Dauer; Bildschirm:
Eintragungsformular; Randfälle: Termine, die sich teilweise überlappen, Termine unterschiedlicher
Dauer; Abnahmekriterien: „gegeben ein Termin von Dr. A um 10:00, wenn ich versuche, einen weiteren
von Dr. A um 10:00 einzutragen, dann warnt der Bildschirm und die Datenbank speichert ihn nicht“;
Prüfung: Ende-zu-Ende-Test des Formulars plus Datenbankabfrage. Das ist eine Spezifikation.

### Lektion 6 — Entscheidungen werden neben dem Code festgehalten

**Was du verstehen musst.** Das Modell, wenn es eine Lücke in den Geschäftsregeln findet, **füllt
sie**. Es hält nicht inne, um zu fragen; es ergänzt mit dem, was ihm am wahrscheinlichsten
erscheint, mit derselben Selbstverständlichkeit, mit der es alles andere schreibt. Deshalb lautet
diese Lektion nicht „schreib die Entscheidungen auf“, sondern „verlang von ihm, dass er anhält
und fragt, wenn eine fehlt“. Und wenn du entscheidest, wird die Entscheidung mit deinen wörtlichen
Worten, deinem Namen und dem Datum geschrieben, im Commit, in der Spezifikation des offenen
Postens und in einem Register. Ich mache das seit dem ersten System
[Ref. 29](REFERENCIAS.md#ref-29); sechs Wochen später, wenn jemand fragt „warum löscht Absagen
nicht?“, ist die Antwort aufgeschrieben und sie ist deine.

**Die Aufgabe.**

**Bevor du den Prompt schickst**, mit deinen Händen:

- `docs/WORKING_AGREEMENT.md` (Lektion 1), wo die Routine hinkommt.
- `docs/DECISIONS.md`, angelegt, auch wenn leer, mit dem Format in der Kopfzeile: Datum, wer
  entschieden hat, die wörtlichen Worte, der offene Posten, der sie brauchte.
- Eine Abmachung mit dem Eigentümer der Domäne, wenn du es nicht selbst bist, über den Kanal und
  die Zeit, in der er antwortet: die Routine funktioniert nur, wenn jemand in Stunden entscheidet
  und nicht in Wochen.

1. Füg der Vereinbarung die Entscheidungsroutine hinzu. Füg ihm ein:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Whenever implementing something requires a
> business rule that is not written down, or you must choose between two approaches that change
> what the user sees, stop and ask me, in prose, with your recommendation and the alternative. Do
> not implement the one you prefer. When I decide, write the decision with my name and the date
> in the commit message, in the pending item's specification and in `docs/DECISIONS.md`, with
> the exact words I used. If I do not answer and you must move on, implement the most reversible
> option and mark it 'decision by omission, pending confirmation', so that I can review it."

> [de]
> Füge diese Routine zu `docs/WORKING_AGREEMENT.md` hinzu: „Wann immer die Umsetzung von etwas
> eine Geschäftsregel erfordert, die nicht aufgeschrieben ist, oder du zwischen zwei Ansätzen
> wählen musst, die ändern, was der Nutzer sieht, halt an und frag mich, in Prosa, mit deiner
> Empfehlung und der Alternative. Setze nicht den um, den du bevorzugst. Wenn ich entscheide,
> schreib die Entscheidung mit meinem Namen und dem Datum in die Commit-Nachricht, in die
> Spezifikation des offenen Postens und in `docs/DECISIONS.md`, mit den exakten Worten, die ich
> verwendet habe. Wenn ich nicht antworte und du weitermachen musst, setze die am besten
> umkehrbare Option um und markiere sie als ‚Entscheidung durch Unterlassung, Bestätigung
> ausstehend‘, damit ich sie prüfen kann.“

   Du verlangst von ihm, dass er vor einer nicht geschriebenen Regel anhält, dass er mit
   Empfehlung und Alternative fragt (damit du in zehn Sekunden entscheiden kannst), dass er deine
   wörtlichen Worte an den drei Orten festhält, und dass er, wenn du nicht antwortest, das am
   besten Umkehrbare wählt und es markiert.

2. Bau die offenen Posten des Blocks weiter. Jedes Mal, wenn er dich nach einer Geschäftsregel
   fragt, entscheide und antworte mit dem Abschlussformat.

**Bevor du den Prompt schickst** zum Abschluss: die Frage des Agenten gelesen, mit seiner
Empfehlung und seiner Alternative, und deine Entscheidung in einem Satz formuliert, mit den exakten
Worten, die für immer bleiben sollen, mit dem Eigentümer abgestimmt, wenn du es nicht selbst bist,
mit dem Datum. Das wird nicht im Chat improvisiert.

3. Füg ihm ein:

> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.

> [de]
> Regel: [exakter Wortlaut]. Von mir entschieden, [Datum]. Schreib sie auf und mach weiter.

4. Mach die Gegenprobe, einmal, absichtlich: lass eine Frage eine Sitzung lang unbeantwortet und
   schau, was er tut. Er muss das am besten Umkehrbare wählen und es „durch Unterlassung“
   markieren. Wenn er gewählt hat, was ihm richtig schien, und es nicht markiert hat, ist das ein
   Versagen des Schritts: korrigier es in der Vereinbarung.

**Vollständigkeitsprüfung.** Öffne drei Commits, die Geschäftsregeln berühren: zitieren sie, wer
entschieden hat und wann? Steht die Regel auch in der Spezifikation des offenen Postens? Gibt es
unbestätigte Entscheidungen „durch Unterlassung“? Gibt es eine Regel im System, die du nicht als
deine erkennst? Sind die Sätze wörtlich oder „verbessert“?

**Ergebnis.** `docs/DECISIONS.md`, wachsend, mit mindestens fünf Entscheidungen des ersten Blocks,
und die Commits und die offenen Posten, die sie zitieren.

**Typische Fehler.** Die Fragen per Chat beantworten und nicht verlangen, dass sie aufgeschrieben
werden: in der dritten Sitzung erinnert sich niemand mehr. Den Agenten deine Worte „verbessern“
lassen: eine paraphrasierte Regel ist eine andere Regel. Und der schwerwiegendste: in der
Produktion eine Regel entdecken, die niemand entschieden hat. Wenn das passiert (es wird
passieren), ist es kein Bug: es ist ein Versagen von Schritt 6, und es wird in der Vereinbarung
behoben, nicht nur im Code.

**Im Leitprojekt.** Typische Entscheidungen des ersten Blocks von Turnera: „Absagen markiert den
Termin als abgesagt und speichert, wer und wann; es wird nichts gelöscht“; „eine Fachkraft kann
nicht zwei Termine zur selben Uhrzeit haben, wohl aber zwei Patienten in einem Doppeltermin, wenn
die Fachkraft ihn freigegeben hat“; „das Telefon des Patienten ist Pflicht; die E-Mail nicht“.
Jede mit Datum und dem Namen der Leiterin, und jede in die Spezifikation des offenen Postens
eingefügt, der sie brauchte.

### Lektion 7 — Messen vor dem Bauen, mit einem Instrument, das ebenfalls geprüft wird

**Was du verstehen musst.** Das Modell produziert Behauptungen mit Zahl („es gibt etwa 120
Abfragen dieser Art“), und sie klingen exakt gleich, wenn sie gemessen und wenn sie geschätzt
sind. Du kannst sie nicht am Tonfall unterscheiden. Die einzige Art ist, das Instrument zu
verlangen: „womit hast du das gemessen? zeig mir den Befehl“. Die Regel des Schritts lautet, dass
**keine Zahl, die etwas entscheidet, aus einem Eindruck stammt**: sie stammt aus einem Messgerät,
das im Repository lebt, das einen Test hat, der es gegen einen bekannten Fall prüft, und das du
ausführen kannst.

Und da ist noch etwas, das ich auf die harte Tour gelernt habe und das der Grund ist, warum ich so
spät dran war, diese Regel zu formalisieren, die ich für offensichtlich hielt: Messgeräte lügen
auch. In einem meiner Systeme lieferte ein Messgerät null, weil es einen Teil des Codes nicht sah,
und ein anderes sagte 27, wo es 44 waren [Ref. 35](REFERENCIAS.md#ref-35),
[Ref. 36](REFERENCIAS.md#ref-36). Deshalb das Audit in zwei Richtungen: vom Code zur Messung (ist
alles gezählt, was gezählt werden sollte?) und von der Messung zum Code (existiert alles Gezählte
wirklich?).

In einem kleinen Projekt ist „messen“ bescheiden: zählen, wie viele Abfragen ein Bildschirm beim
Laden macht, wie lange der Monatsbericht dauert, wie viele Nachrichten gestern gesendet wurden. Es
braucht keine Ratsche und kein Budget pro Pfad. Was es sehr wohl braucht, ist, dass hinter der
Zahl ein Befehl steht.

**Die Aufgabe.**

**Bevor du den Prompt schickst**, mit deinen Händen:

- Die Hypothese, in einem Satz. In Turnera eine gute: „die Tagesagenda macht eine Datenbankabfrage
  pro Termin, den sie anzeigt“ (die klassische N+1-Schleife). Wenn sie nicht stimmt, umso besser:
  du wirst sehen, wie eine falsche Hypothese geprüft wird. Sie kommt in die Lücke des Prompts,
  zusammen mit der zu messenden Größe.
- Einen bekannten Fall für den Test des Messgeräts, bei dem du die Antwort im Voraus weißt („mit
  null Terminen muss es genau die Grundabfragen zählen“).
- Zugang zu dem, was gemessen wird (die Datenbank nur lesend, wenn es echte Daten sind, das Log),
  und die Messgeräte, die es im Repository schon gibt, benannt.

1. Füg ihm ein:

> Before building anything, we are going to measure. The hypothesis is: [the day view runs one
> database query per appointment shown]. Write a meter (a script that lives in the repository)
> that measures [the number of queries the day view runs for a day with N appointments], and a
> test for the meter that checks it against a known case where the answer is known in advance.
> If measuring requires access or data you lack, ask me; do not approximate silently. If some
> part can only be approximated, mark it as approximate and tell me the margin. Run the meter,
> show me the number together with the command that produces it, and audit it in both
> directions: from the code to the measurement (is everything that should be counted, counted?)
> and from the measurement to the code (does everything counted actually exist?). Only then
> propose what to build. Reply in my language.

> [de]
> Bevor wir irgendetwas bauen, messen wir. Die Hypothese ist: [die Tagesansicht führt eine
> Datenbankabfrage pro angezeigtem Termin aus]. Schreib ein Messgerät (ein Skript, das im
> Repository lebt), das [die Anzahl der Abfragen, die die Tagesansicht für einen Tag mit N
> Terminen ausführt] misst, und einen Test für das Messgerät, der es gegen einen bekannten Fall
> prüft, bei dem die Antwort im Voraus bekannt ist. Wenn das Messen Zugang oder Daten erfordert,
> die dir fehlen, frag mich; nähere nicht stillschweigend an. Wenn sich ein Teil nur annähern
> lässt, markiere ihn als Näherung und nenn mir die Toleranz. Lass das Messgerät laufen, zeig mir
> die Zahl zusammen mit dem Befehl, der sie erzeugt, und auditiere sie in beide Richtungen: vom
> Code zur Messung (ist alles gezählt, was gezählt werden sollte?) und von der Messung zum Code
> (existiert alles Gezählte wirklich?). Erst dann schlag vor, was zu bauen ist. Antworte in meiner
> Sprache.

   Du verlangst von ihm das Messgerät im Repository, den Test des Messgeräts, um das Fehlende zu
   bitten, statt anzunähern, das Näherungsweise zu markieren, die Zahl mit dem Befehl, das Audit
   in zwei Richtungen, und die Reihenfolge: erst messen, dann vorschlagen.

2. Führ den Befehl, den er dir gegeben hat, selbst aus. Er muss dir dieselbe Zahl liefern. Du
   musst das Skript nicht verstehen; du musst es ausführen.
3. Wenn die Hypothese stimmte und der Agent vorschlägt, es zu beheben, verlang von ihm ein Budget.

**Bevor du den Prompt schickst** des Budgets: die gemessene Zahl, von dir mit dem Befehl
ausgeführt, den er dir gegeben hat (es muss dasselbe herauskommen), und die Marge, die du zu geben
bereit bist, von dir entschieden: ein wenig mehr als das Gemessene, nicht das Doppelte für alle
Fälle.

4. Füg ihm ein:

> Set the budget for [queries] on this path at the measured value plus a small margin, and
> protect it with a test that fails if it is exceeded. Tell me the number and the margin.

> [de]
> Setze das Budget für [Abfragen] auf diesem Pfad auf den gemessenen Wert plus eine kleine Marge,
> und schütze es mit einem Test, der fehlschlägt, wenn es überschritten wird. Nenn mir die Zahl
> und die Marge.

   So entdeckt die Batterie es, wenn jemand in drei Monaten die Schleife wieder einbaut.

**Bevor du den Prompt schickst** der fünften Regel: `docs/WORKING_AGREEMENT.md`, und ein schon
existierendes Messgerät für jede Größe, die ein Plan behaupten kann; wenn es kein Messgerät gibt,
zuerst der anfängliche Prompt dieser Lektion.

5. Füg der Vereinbarung die fünfte Regel hinzu, für den Fall, dass ein Plan Zahlen mitbringt:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before executing a plan that asserts
> numbers, verify every number with the meter. If any does not match, stop and tell me; do not
> execute on a wrong number."

> [de]
> Füge diese Routine zu `docs/WORKING_AGREEMENT.md` hinzu: „Bevor du einen Plan ausführst, der
> Zahlen behauptet, verifiziere jede Zahl mit dem Messgerät. Wenn eine nicht übereinstimmt, halt
> an und sag es mir; führe nicht auf einer falschen Zahl aus.“

**Vollständigkeitsprüfung.** Hast du das Messgerät ausgeführt, und es hat dir dasselbe geliefert?
Hat es einen Test, gegen welchen bekannten Fall? Gibt es im Bericht eine Zahl ohne Messgerät
dahinter? Ist das Näherungsweise markiert? Gibt es ein Budget mit Test?

**Ergebnis.** Ein Messgerät im Repository mit seinem Test, eine Zahl mit ihrem Befehl und Datum in
`docs/STATUS.md` oder im offenen Posten, und (falls es passte) ein durch einen Test geschütztes
Budget.

**Typische Fehler.** Die Zahl akzeptieren, ohne den Befehl auszuführen: die Hälfte des Werts
dieser Lektion liegt darin, dass du ihn ausführst. Ein Messgerät, das null liefert: es ist fast nie
null; fast immer sieht es etwas nicht. Und den Agenten „beheben lassen, während er misst“: die
Reihenfolge ist die Methode.

**Im Leitprojekt.** Das Messgerät von Turnera ist ein Skript, das einen Tag mit 10, 50 und 200
Terminen in eine Testdatenbank lädt, die Agenda dieses Tages öffnet und dabei die Abfragen zählt,
und die drei Zahlen schreibt. Der Test des Messgeräts prüft, dass es mit 0 Terminen genau die
Grundabfragen zählt (sagen wir 2). Wenn es eine Schleife gab, sind die Zahlen 12, 52 und 202; man
behebt es, sie werden zu 3, 3 und 3, und das Budget bleibt bei 4 mit einem Test, der fehlschlägt,
wenn die Agenda für irgendeine Anzahl von Terminen mehr als 4 Abfragen macht.

### Lektion 8 — Tests als Sperren, rot bewiesen, und die Ende-zu-Ende-Tests

**Was du verstehen musst.** Das ist die zentrale Lektion des Kurses. Von einem Test, den du nie
hast fehlschlagen sehen, weißt du nicht, ob er etwas beweist. Das Modell schreibt den Code und den
Test in derselben Sitzung, mit demselben Verständnis: wenn es die Anfrage falsch verstanden hat,
prüft der Test, was es verstanden hat, und besteht. Die einzige billige Art zu wissen, dass der
Test auf das schaut, was zählt, ist, **ihn rot gegen den alten Code zu sehen**: wenn der Code von
vor der Änderung ihn auch besteht, unterscheidet der Test das Vorher nicht vom Nachher, und dann
taugt er nichts. Deshalb lautet die Anfrage nicht „schreib Tests“, sondern „zeig mir das Rot, dann
das Grün, dann die Regression“. Der Fall, der das am besten zeigt, ist der der Zähler, die nicht
übereinstimmten [Ref. 26](REFERENCIAS.md#ref-26).

Und die zweite Idee, die so wichtig ist wie die erste: die Ende-zu-Ende-Tests. Ein Test, der vom
Bildschirm aus prüft (klickt, tippt, liest) und die Wirkung im Backend kontrolliert (die Zeile ist
da, der Zustand hat sich geändert), ist der, der deine Lektüre des Codes ersetzt. Die
Abnahmekriterien des offenen Postens („gegeben, wenn, dann“) sind sein Drehbuch. Und sie laufen
**dreimal, in drei Maßstäben**: der berührte Fluss mit jedem offenen Posten; alle Flüsse, die es
gibt, beim Abschluss jedes Blocks; und alle Flüsse mit der exakten Version vor jedem Deployment in
die Produktion. Wenn du nur das dritte machst, kommst du am Ende mit einem System an, das
wochenlang niemand Ende zu Ende getestet hat.

**Die Aufgabe.**

**Bevor du den Prompt schickst**, mit deinen Händen:

- `docs/WORKING_AGREEMENT.md` (Lektion 1), wo die Routine hinkommt.
- Den offenen Posten, der geschlossen werden soll, mit seinen Abnahmekriterien „gegeben, wenn,
  dann“ und seinem „wie geprüft wird“ in `docs/PENDING.md`: sie sind das Drehbuch des Tests. Wenn
  er sie nicht hat, geh zurück zu Lektion 5, bevor du den Test verlangst.
- Die Batterie und den Befehl, um sie laufen zu lassen, in `docs/STATUS.md` (Lektion 4), und die
  Testumgebung laufend, mit genügend Daten für den Fluss, der berührt wird; wenn Daten fehlen, lade
  sie selbst hoch oder bitte ihn, sie als Teil des Tests anzulegen, aber er darf sie nicht
  simulieren.

1. Füg der Vereinbarung die Belegroutine hinzu. Füg ihm ein:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "To close a pending item I need evidence, not
> your word. (1) Write the test that proves what the item asks for, following its acceptance
> criteria. (2) Demonstrate that this test fails against the previous code: you may temporarily
> revert the change, or run the test against the old version, but show me the red output as a
> receipt, not a summary: the exact command, the identifier of the version it ran against, the count
> of failing tests and the exit code, pasted as they came out, so that I can rerun it myself with
> one command. (3) Show me the green output with the change. (4) Run the regression suite for the
> neighbouring items and show me it is still green. (5) Run the end-to-end test of the flow this
> item touches, from the screen to the backend, and show me the backend effect. (6) Do not replace
> with mocks the very part you are trying to test. If testing end to end requires something you lack
> (data, access, an environment), ask me for it; do not simulate what you do not have. Finally, the
> commit message says 'proved red against [what]' and the test counts."

> [de]
> Füge diese Routine zu `docs/WORKING_AGREEMENT.md` hinzu: „Um einen offenen Posten zu
> schließen, brauche ich Belege, nicht dein Wort. (1) Schreib den Test, der beweist, was der
> Posten verlangt, nach seinen Abnahmekriterien. (2) Zeige, dass dieser Test gegen den vorherigen
> Code fehlschlägt: du kannst die Änderung vorübergehend zurücknehmen oder den Test gegen die
> alte Version laufen lassen, aber zeig mir die rote Ausgabe als Beleg, nicht als
> Zusammenfassung: den exakten Befehl, die Kennung der Version, gegen die er lief, die Zahl der
> fehlschlagenden Tests und den Exit-Code, so eingefügt, wie sie herauskamen, damit ich es selbst
> mit einem einzigen Befehl noch einmal laufen lassen kann. (3) Zeig mir die grüne Ausgabe mit
> der Änderung. (4) Lass die Regression der benachbarten Posten laufen und zeig mir, dass sie
> weiter grün ist. (5) Lass den Ende-zu-Ende-Test des Flusses laufen, den dieser Posten berührt,
> vom Bildschirm bis zum Backend, und zeig mir die Wirkung im Backend. (6) Ersetze nicht
> ausgerechnet den Teil durch Mocks, den du prüfen willst. Wenn das Ende-zu-Ende-Testen etwas
> erfordert, das dir fehlt (Daten, Zugang, eine Umgebung), bitte mich darum; simuliere nicht, was
> du nicht hast. Zum Schluss sagt die Commit-Nachricht ‚rot bewiesen gegen [was]‘ und die
> Testzahlen.“

   Du verlangst von ihm den von den Abnahmekriterien geführten Test, **das bewiesene Rot als
   Beleg** (den Befehl, die Version, die Zahlen und den Exit-Code, damit du es selbst noch einmal
   laufen lassen kannst), das Grün, die Regression der Nachbarn, den Ende-zu-Ende-Test des Flusses
   mit der Wirkung im Backend, nichts ausgerechnet dort zu simulieren, wo geprüft wird, und um das
   Fehlende zu bitten, statt es zu simulieren.

2. Nimm den offenen Posten der Doppelbuchung (PND-003 in Turnera, oder das Äquivalent in deinem
   Projekt: eine Regel, die etwas verhindert). Bitte ihn, ihn mit der Routine zu schließen. Lies
   den Bericht: es muss eine rote Ausgabe mit Zahlen geben („1 von 1 schlägt gegen die Version
   ohne die Regel fehl“), dann das Grün, und den Ende-zu-Ende-Test: ein programmatisch gesteuerter
   Browser, der den Bildschirm öffnet, versucht, die Doppelbuchung einzutragen, die Warnung liest
   und in der Datenbank prüft, dass nichts gespeichert wurde.
3. Wenn er dir sagt, dass er nicht Ende zu Ende testen kann, weil sich der Bildschirm nicht
   programmatisch bedienen lässt, halt an: das ist X2, das versagt, und es muss jetzt behoben
   werden (Kennungen zu den Elementen des Bildschirms hinzufügen), bevor es weitergeht.

**Bevor du den Prompt schickst**: unterscheide, ob ihm eine Eingabe fehlt, die du hast (Daten, ein
Zugang, eine Umgebung: gib sie ihm und schick diesen Prompt nicht), oder ob das System dort
wirklich nicht testbar ist (dieser Prompt).

4. Füg ihm ein:

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

> [de]
> Erkläre, warum es sich nicht testen lässt, was hinzugefügt werden müsste, damit es geht, und
> öffne einen offenen Posten dafür. Die Änderung ist nicht geschlossen, bis sie sich testen lässt.

5. **Beim Abschluss des Blocks**, wenn die sechs offenen Posten geschlossen sind, lass die
   vollständige Batterie laufen.

**Bevor du den Prompt schickst** der Batterie: die sechs offenen Posten mit der Routine
geschlossen, die exakte Version, die befördert werden soll, identifiziert und in der Testumgebung
deployt, und deine eigene Liste der Flüsse, die es gibt (aus den Anwendungsfällen des semantischen
Baums), um sie mit dem zu vergleichen, was der Agent abgedeckt zu haben sagt.

6. Füg ihm ein:

> Run the complete end-to-end suite of every flow that exists so far, in the test environment,
> with the exact version that will be promoted. Show me the counts, and for each flow the
> backend check that proves it. If any flow has no end-to-end test, say so and open a pending
> item for it; do not pass it as covered.

> [de]
> Lass die vollständige Ende-zu-Ende-Batterie aller bisher existierenden Flüsse laufen, in der
> Testumgebung, mit der exakten Version, die befördert werden soll. Zeig mir die Zahlen und für
> jeden Fluss die Backend-Prüfung, die ihn beweist. Wenn ein Fluss keinen Ende-zu-Ende-Test hat,
> sag es und öffne einen offenen Posten dafür; lass ihn nicht als abgedeckt durchgehen.

7. Und danach **benutz das System selbst**. Öffne die Testumgebung und tu, was die Empfangskraft
   tun würde: trag einen Termin ein, versuch die Doppelbuchung, sag ab, such. Was dich stört, was
   du nicht verstehst, was steht, wo es nicht hingehört: notier es als offenen Posten. Diese Weile
   findet, was kein Test findet.

**Vollständigkeitsprüfung.** Zeigt der Bericht das Rot, mit Zahlen? Lief die Regression in
derselben Sitzung, mit Zahlen? Prüft der Ende-zu-Ende-Test auch das Backend? Gibt es einen
simulierten Teil genau dort, wo die Änderung ist? Sagt der Commit „rot bewiesen“? Beim Abschluss
des Blocks: sind alle Flüsse in der Ende-zu-Ende-Batterie? Hast du das System selbst benutzt und
notiert, was du gefunden hast?

**Ergebnis.** Mindestens drei offene Posten, geschlossen mit der vollständigen Routine (Rot, Grün,
Regression, Ende zu Ende), die vollständige Ende-zu-Ende-Batterie des Blocks grün, und die offenen
Posten, die aus deinen menschlichen Tests entstanden sind.

**Typische Fehler.** „Die Tests bestehen“ ohne Zahlen und ohne Rot akzeptieren. Akzeptieren, dass
die Batterie „beschleunigt“ wird, indem die Ende-zu-Ende-Tests durch Simulationen ersetzt werden.
Ein „lässt sich nicht testen“ durchgehen lassen, ohne den offenen Posten zu öffnen. Und den Block
schließen, ohne ihn selbst zu benutzen: der menschliche Blick wird nicht delegiert.

**Im Leitprojekt.** Das Rot der Doppelbuchung sieht so aus: der Agent entfernt vorübergehend die
Regel, lässt den Test laufen, und die Ausgabe sagt, dass der Test fehlgeschlagen ist, weil der
zweite Termin gespeichert wurde. Er setzt die Regel wieder ein, lässt laufen, grün. Dann die
Regression: die Tests von PND-001 und PND-002 sind weiter grün. Und der Ende-zu-Ende-Test: ein
programmatisch gesteuerter Browser füllt das Formular aus, drückt „speichern“, liest die Nachricht
„diese Uhrzeit ist schon belegt“, und eine Datenbankabfrage bestätigt, dass es nur einen Termin zu
dieser Uhrzeit gibt. Beim Abschluss des Blocks durchläuft die Ende-zu-Ende-Batterie die drei
Flüsse, die es gibt (den Tag sehen, eintragen, absagen), und die Leiterin trägt zehn Testtermine
ein und entdeckt, dass die Uhrzeit mit einem unbequemen Dropdown-Menü gewählt wird. Neuer offener
Posten. Wenn du diesen Bericht zum ersten Mal siehst, wirst du verstehen, wofür die ganze Methode
da ist.

**Was sich am 19. Oktober 2026 geändert hat (D-037).** Im ersten Block eines neuen Projekts gibt es keinen vorherigen Code: der neue Test schlägt fehl, weil das Modul nicht existiert, und dieses Rot beweist nichts. Seit diesem Tag wird, wenn die vorherige Version das Modul nicht hat, das Rot **durch Mutation** bewiesen: der Agent pflanzt absichtlich einen Fehler in die gerade geschriebene Funktion, zeigt den Test rot gegen diesen Fehler (der Beleg trägt den Diff), macht ihn rückgängig und zeigt das Grün. In Forge schließt ein Rot, das nur "die Datei lädt nicht" sagt, den offenen Punkt nicht mehr. Ein Mutant pro Punkt; Mutationstests über die ganze Codebasis bleiben die optionale Verstärkung der Lektion 9.

### Lektion 9 — Maschinell verifizierte Code-Qualität

**Was du verstehen musst.** Du liest den Code nicht, und das ist in Ordnung; aber der Code
existiert, und jemand wird ihn pflegen. Wenn ihn niemand liest, muss ihn eine Maschine ansehen:
ein *Linter* (wie die Rechtschreibprüfung einer Textverarbeitung, aber für Code), ein
*Formatierer* (ein einziger Stil für alles), Grenzen für die Größe von Dateien und Funktionen,
Grenzen für die *Komplexität* (wie viele Wege eine Funktion hat), Erkennung von dupliziertem und
totem Code, und die *Abdeckung* der Tests mit einer *Ratsche* (die von heute ist der Boden von
morgen). Alles in der Continuous Integration, rot, wenn es verletzt wird. Ich habe das in all
meinen Projekten gemacht; ein Audit brachte mir eine Komponente mit mehr als zweitausend Zeilen
zurück, weil keine Grenze sie gestoppt hatte [Ref. 41](REFERENCIAS.md#ref-41).

**Bevor du den Prompt schickst**, mit deinen Händen:

- Die laufende Continuous Integration (Lektion 4) und mindestens ein offener Posten des Blocks,
  mit Lektion 8 geschlossen, damit es echten Code zu messen gibt.
- Deine zwei Grenzen, in einer Zeile: für Turnera dreihundert Zeilen pro Datei und vierzig pro
  Funktion, und die Abdeckung steigt nur.

1. Füg ihm den anfänglichen Prompt des Vertrags von Schritt 9 ein (in `docs/peldanos/`), mit
   deinen Grenzen in den Lücken.
2. Lies `docs/CODE_QUALITY.md`. Es wird eine Liste dessen geben, was heute fehlschlägt;
   entscheide, was sofort repariert wird (je ein offener Posten) und was mit Datum toleriert wird,
   und schreib es in dieselbe Datei.

**Bevor du den Prompt schickst** für die Routine: `docs/CODE_QUALITY.md` gelesen und mit deinen
Entscheidungen, und `docs/WORKING_AGREEMENT.md`.

3. Füg der Vereinbarung die Routine von Schritt 9 hinzu, eingepackt in „Add this routine to
   `docs/WORKING_AGREEMENT.md`:“ wie die anderen.
4. Verlang, dass er absichtlich, in einem Zweig, eine Funktion mit hundert Zeilen und eine
   ungenutzte Variable einbaut: die Kette muss wegen beider Dinge rot werden.

**Vollständigkeitsprüfung.** Hat der letzte Lauf der Kette die Qualität in Grün? Ist der Test
mit dem Zweig rot geworden? Gibt es Linter-Ausnahmen, und hat jede eine geschriebene Begründung?
Ist die Abdeckung von heute größer oder gleich der von gestern?

**Ergebnis.** Das Qualitätstor in der Kette, `docs/CODE_QUALITY.md` mit Grenzen und Werten, und
die Routine in der Vereinbarung.

**Typische Fehler.** Den Agenten „diese Regel abschalten lassen, weil sie zu streng ist“, ohne
dass es über dich geht. Eine Grenze anheben, damit es durchgeht. Und Abdeckung mit Qualität
verwechseln: die Abdeckung zählt Tests, das Rot aus Lektion 8 sagt, ob sie etwas beweisen.

**Optionale Verstärkung.** Wenn der Block geschlossen ist, hat der Vertrag von Schritt 9 einen
dritten Prompt, den der *Mutationstests*: ein Werkzeug macht den Code absichtlich kaputt, mit je
einer kleinen Änderung auf einmal, und zählt, wie viele dieser Fehler die Tests fangen. Das ist
das Maß, das die Abdeckung nicht gibt, und das, was auf den Einwand antwortet, dass der Agent das
Rot vortäuschen kann. In Turnera machen wir es beim Abschluss des zweiten Blocks, nur auf den
geänderten Zeilen.

**Im Leitprojekt.** Der erste Lauf von Turnera wird in drei Dingen rot: das Terminformular hat
eine Funktion mit 70 Zeilen (wird in zwei geteilt: offener Posten), es gibt zwei Kopien des
Datumsformats (nur eine, im Server: offener Posten), und die Abdeckung liegt bei 61 %. Die Ratsche
steht auf 61 und steigt mit jedem offenen Posten. Beim Abschluss des Blocks: 74 %.

### Lektion 10 — Die manuellen Testfälle werden zusammen mit der Funktionalität geschrieben

**Was du verstehen musst.** Alle Tests, die wir bis hierher gesehen haben, schreibt und lässt das
Modell laufen, und sie prüfen, was das Modell verstanden hat. Es fehlt der Test, den eine Person
mit ihren Augen und ihren Händen macht, einem *Drehbuch* folgend: ein manueller Testfall, mit
Vorbedingung, Schritten, erwartetem Ergebnis und einer Tabelle, um jede Ausführung zu notieren.
Das Drehbuch schreibt der Agent zusammen mit jedem offenen Posten, aus den Abnahmekriterien; du
führst es aus (oder die Leiterin) beim Abschluss jedes Blocks, vor dem ersten Deployment und nach
jedem Deployment; und was fehlschlägt, kehrt als korrektiver offener Posten in die Schleife
zurück, mit deinen Worten. Es ist der menschliche Blick mit Drehbuch, und es ist der Schluss des
Kreises im Prozessbild: die manuelle Ausführung speist Anforderungen zurück.

**Bevor du den Prompt schickst**, mit deinen Händen:

- `docs/MANUAL_TESTS.md` angelegt, und sei es leer, mit dem Format in der Kopfzeile (kopier es
  aus dem Vertrag von Schritt 10).
- Die Entscheidung, wer ausführt und wann, in der Vereinbarung geschrieben: für den Kurs du beim
  Abschluss jedes Blocks und die Leiterin vor dem ersten Deployment.
- Ein offener Posten des Blocks, mit den Lektionen 8 und 9 geschlossen.

1. Füg der Vereinbarung die Routine von Schritt 10 hinzu (im Vertrag, „Routine bei jedem offenen
   Posten“), eingepackt wie die anderen. Von jetzt an wird jeder offene Posten, der einen
   Bildschirm berührt, mit seinem Fall geschlossen.
2. Verlang, dass er die Fälle der schon geschlossenen Posten des Blocks schreibt. Nimm einen
   beliebigen und folg ihm selbst in der Testumgebung, ohne etwas zu fragen: wenn du fragen
   musstest, ist der Fall nicht für eine Person geschrieben; lass ihn neu schreiben.
3. Beim Abschluss des Blocks führ alle Fälle des Blocks selbst aus, von Hand, und notier bei
   jedem das Datum, deinen Namen, bestanden oder fehlgeschlagen, und die Anmerkung. Was dich
   stört und in keinen Fall fällt, notier es am Ende der Datei.

**Bevor du den Prompt schickst** für die Ausführung: deine Ausführungen in der Datei notiert,
Fall für Fall, und die losen Anmerkungen am Ende.

4. Füg ihm den Ausführungs-Prompt des Vertrags von Schritt 10 ein. Jeder Fehlschlag muss als
   korrektiver offener Posten mit deinen Worten zurückkommen.

**Vollständigkeitsprüfung.** Konntest du einem Fall folgen, ohne zu fragen? Hat jeder geschlossene
offene Posten, der einen Bildschirm berührt, seinen Fall? Sagt jeder Fall, was auf der anderen
Seite des Bildschirms zu verifizieren ist? Hat die Ausführung bei jedem Fall Datum und Namen? Hat
jeder Fehlschlag seinen offenen Posten mit deinen Worten?

**Ergebnis.** `docs/MANUAL_TESTS.md` mit einem Fall pro Fluss des Blocks, die erste Ausführung
festgehalten, und ein offener Posten pro Fehlschlag.

**Typische Fehler.** Den Agenten die Fälle als ausgeführt markieren lassen. Fälle, die der
automatische Test in Prosa sind. Und die Fehlschläge im Moment reparieren, ohne offenen Posten:
deine Worte gehen verloren und auch die Spur davon, was sich wiederholt.

**Im Leitprojekt.** Die Fälle des ersten Blocks von Turnera sind sechs: die Tagesagenda sehen,
einen Termin eintragen, einen Überbuchungstermin versuchen, absagen, einen Patienten suchen, einen
Patienten anlegen. In der ersten Ausführung schlagen zwei fehl: der zum Absagen (die Agenda
aktualisiert sich erst beim Neuladen der Seite; Anmerkung der Leiterin: „ich dachte, es wäre nicht
abgesagt worden“) und der zum Suchen (bei zwei Patienten mit demselben Nachnamen zeigt er nur
einen). Zwei korrektive offene Posten, mit ihren Worten. Das unbequeme Auswahlmenü für die
Uhrzeit, das kein Test sah, erscheint als lose Anmerkung.

### Lektion 11 — Symmetrie zwischen Produzent und Konsument, und das Register der Anti-Muster

**Was du verstehen musst.** Wenn du ein Ende des Systems änderst (den Server, die Datenbank, einen
Roboter), muss sich das andere Ende (der Bildschirm, ein Zähler, ein Bericht) im selben Commit
ändern. Sonst driften sie auseinander, und der Nutzer sieht auf der einen Seite eine Zahl und auf
der anderen eine andere [Ref. 26](REFERENCIAS.md#ref-26). Das Prinzip, das das verhindert, ist
einfach auszusprechen und schwer durchzuhalten: **jede Liste hat einen einzigen Eigentümer**. Die
möglichen Zustände eines Termins, die Spalten eines Berichts, die Gründe, warum etwas wartet: ein
einziger Teil (der Produzent) definiert sie, und die anderen lesen sie von dort
[Ref. 27](REFERENCIAS.md#ref-27). Der semantische Baum ist der erste Ort, an dem diese Listen
deklariert werden. Sobald es zwei Kopien gibt, ist eine veraltet; man weiß nur noch nicht, welche.

Die zweite Hälfte der Lektion ist das Register der Anti-Muster (GOTCHAS): die Fehler, die du schon
einmal ausgebadet hast, notiert mit ihrem Geruch, ihrer Grundursache, ihrer Behebung und wie man
sie vorher erkennt [Ref. 2](REFERENCIAS.md#ref-2). Das Wichtige ist nicht, sie zu notieren: es
ist, die automatische Prüfung hinzuzufügen, die sie erkennt, denn ein notiertes, aber nicht
automatisiertes Anti-Muster wiederholt sich, wenn die Sitzung wechselt.

**Die Aufgabe.**

**Bevor du den Prompt schickst**, mit deinen Händen:

- Mindestens einen gebauten Funktionsblock: ohne Verträge zwischen Teilen gibt es keine Karte zu
  machen.
- `docs/SEMANTIC_TREE.md` auf dem neuesten Stand: die Listen (Zustände, Typen, Gründe) sind dort
  deklariert, und die Karte muss mit dem Baum übereinstimmen.
- Eine von dir geschriebene Liste dessen, was außerhalb des Repositorys lebt und etwas vom System
  produziert oder konsumiert (ein Roboter, eine Tabelle, ein Prozess eines anderen Teams), oder
  die Feststellung, dass es nichts gibt.

1. Bitte ihn um die Vertragskarte:

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

> [de]
> Baue `docs/PRODUCER_CONSUMER_MAP.md`: für jeden Vertrag im System (einen Dienst, eine Tabelle,
> ein Dateiformat, eine Werteliste), wer ihn produziert und wer ihn konsumiert. Wenn es Teile des
> Systems gibt, auf die du nicht zugreifen kannst oder die du nicht verstehst, sag es mir, statt
> sie aus der Karte wegzulassen. Antworte in meiner Sprache.

   Du verlangst von ihm das Inventar der Verträge mit ihren zwei Seiten, und dass er, was er nicht
   sieht, erklärt, statt es wegzulassen.

**Bevor du den Prompt schickst** der Routine: die von dir geprüfte Karte (wähl einen Vertrag und
prüf, dass die beiden Seiten die sind, die du kennst) und `docs/WORKING_AGREEMENT.md`.

2. Füg die Routine der Vereinbarung hinzu:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before closing any change that touches a
> contract, look up every consumer in the map and update them in the same commit. Always prefer
> that the producer defines the list (columns, causes, states) and the consumer reads it, rather
> than each keeping its own copy. If the map does not have that relationship, add it."

> [de]
> Füge diese Routine zu `docs/WORKING_AGREEMENT.md` hinzu: „Bevor du eine Änderung schließt, die
> einen Vertrag berührt, such in der Karte jeden Konsumenten und aktualisiere sie im selben
> Commit. Bevorzuge immer, dass der Produzent die Liste definiert (Spalten, Gründe, Zustände) und
> der Konsument sie liest, statt dass jeder seine eigene Kopie hält. Wenn die Karte diese
> Beziehung nicht hat, füge sie hinzu.“

3. Mach die Listenprobe: wähl eine Liste, die auf dem Bildschirm erscheint (in Turnera die
   Zustände eines Termins: ausstehend, bestätigt, abgesagt, nicht erschienen), und bitte den
   Agenten, dir zu zeigen, wo sie definiert ist und wo sie gelesen wird. Wenn es zwei Definitionen
   gibt, bitte ihn, nur eine zu lassen, und dass sie mit dem semantischen Baum übereinstimmt.
4. Beim ersten Mal, dass etwas zum zweiten Mal bricht (das wird passieren),
   halt es fest.

**Bevor du den Prompt schickst**: den offenen Posten oder den Commit des ersten Mals, von dir
zwischen den geschlossenen Posten von `docs/PENDING.md` aufgespürt, um ihn zusammen mit dem Prompt
einzufügen (ohne diesen Verweis kommt das Anti-Muster generisch heraus); und `docs/GOTCHAS.md`
angelegt, auch wenn leer, mit dem Format in der Kopfzeile: Geruch, Grundursache, Behebung, wie man
es vorher erkennt.

5. Füg ihm ein:

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

> [de]
> Das ist uns schon einmal passiert. Halte es in `docs/GOTCHAS.md` fest mit: wie es riecht (das
> frühe Zeichen), der Grundursache, der Behebung, und wie man es nächstes Mal erkennt, bevor es
> wehtut. Und füge, wenn möglich, einen Test oder eine automatische Prüfung hinzu, die es erkennt.

**Vollständigkeitsprüfung.** Wähl einen Vertrag aus der Karte: liest jeder Konsument ihn vom
Produzenten oder hat er seine Kopie? Gibt es eine Zahl, die auf zwei Bildschirmen gezeigt wird und
übereinstimmt? Stimmen die Zustände der Entitäten zwischen dem Code und dem semantischen Baum
überein? Hat jeder Eintrag in GOTCHAS die vier Teile? Hat sich etwas wiederholt, das schon notiert
war?

**Ergebnis.** `docs/PRODUCER_CONSUMER_MAP.md`, die Routine in der Vereinbarung, und
`docs/GOTCHAS.md` (auch wenn es mit einem einzigen Eintrag beginnt).

**Typische Fehler.** Die Karte einmal machen und nie wieder ansehen: sie muss mit jedem neuen
Vertrag wachsen. Anti-Muster als Anekdoten notieren („einmal ist es passiert, dass …“) ohne den
Teil „wie man es vorher erkennt“. Und der Klassiker: derselbe Text eines Zustands von Hand im Server
und im Bildschirm geschrieben; an dem Tag, an dem einer sich ändert, bleibt der andere.

**Im Leitprojekt.** Die Karte von Turnera hat anfangs vier oder fünf Verträge: die Liste der
Terminzustände (der Server definiert sie, der Bildschirm und der Monatsbericht lesen sie); die
Termintabelle (die Eintragung schreibt sie, die Tagesagenda und der Bericht lesen sie); die
Patiententabelle; und später die Nachrichtenwarteschlange (die Agenda schreibt sie, der Versender
liest sie). Das erste GOTCHA ist meist eines mit Datumsangaben: die Agenda zeigte den Termin am
falschen Tag, weil der Server in einer Zeitzone speicherte und der Bildschirm in einer anderen
anzeigte. Geruch: „der Termin um 23 Uhr erscheint morgen“. Grundursache: zwei Zeitzonen. Behebung:
eine einzige, auf dem Server. Erkennung: ein Test mit einem Termin um 23:30.

### Lektion 12 — Ehrliche Verifikation und verhältnismäßiger Bericht

**Was du verstehen musst.** Wenn du keinen Code lesen wirst, muss der Bericht des Agenten
vertrauenswürdig sein, und das passiert nicht von allein. Das Modell wurde darauf trainiert,
nützlich und vollständig zu sein, und ein Bericht, der sagt „das konnte ich nicht verifizieren“,
fühlt sich weniger nützlich an als einer, der „erledigt“ sagt. Also muss man ihm **ausdrücklich**
die schlechten Nachrichten, die blinden Flecken und das, was er nicht getan hat, abverlangen. Wenn
du es nicht verlangst, gibt er es dir nicht; nicht weil er es verbirgt, sondern weil er es nicht
als Teil der Antwort betrachtet. Mir wurde ein Authentifizierungsfehler mit der Aufschrift
„success“ gemeldet [Ref. 43](REFERENCIAS.md#ref-43).

Die Struktur, die ihn ehrlich macht, sind drei Blöcke: **verifiziert** (mit dem Beweis daneben),
**geglaubt** (was er für funktionierend hält und warum er es nicht getestet hat), und **blinde
Flecken** (was er von dort, wo er ist, nicht sehen kann). Und eine Regel: die schlechten
Nachrichten zuerst.

**Die Aufgabe.**

**Bevor du den Prompt schickst**, mit deinen Händen:

- `docs/WORKING_AGREEMENT.md`, wo die Routine hinkommt.
- Die Gewohnheit, in jeder Sitzung die Liste dessen zu notieren, was du verlangt hast: der Prompt
  verlangt von ihm, jeden Punkt einzeln abzudecken, und du musst wissen, wie viele es waren.

1. Füg der Vereinbarung die Berichtsroutine hinzu:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "When you report, separate three blocks:
> VERIFIED (what you tested, with the command and its output), BELIEVED (what you think works but
> did not test, and why not), and BLIND SPOTS (what you cannot see from where you are: another
> environment, real data, the user's browser). Cover every item I asked for, one by one, even when
> the answer is 'I did not do it'. No claim without its proof next to it. Do not say 'done': say
> what is done and how you know it. If something went wrong, say it first."

> [de]
> Füge diese Routine zu `docs/WORKING_AGREEMENT.md` hinzu: „Wenn du berichtest, trenne drei
> Blöcke: VERIFIZIERT (was du getestet hast, mit dem Befehl und seiner Ausgabe), GEGLAUBT (was du
> für funktionierend hältst, aber nicht getestet hast, und warum nicht), und BLINDE FLECKEN (was
> du von dort, wo du bist, nicht sehen kannst: eine andere Umgebung, echte Daten, der Browser des
> Nutzers). Decke jeden Punkt ab, den ich verlangt habe, einen nach dem anderen, auch wenn die
> Antwort ‚ich habe es nicht getan‘ lautet. Keine Behauptung ohne ihren Beweis daneben. Sag nicht
> ‚erledigt‘: sag, was erledigt ist und woher du es weißt. Wenn etwas schiefgegangen ist, sag es
> zuerst.“

2. Bitte ihn, den nächsten offenen Posten zu schließen, und lies den Bericht mit der Prüfliste
   unten. Beim ersten Mal wird der Block „blinde Flecken“ fast sicher leer sein. Frag ihn: „was
   kannst du von dort, wo du bist, nicht sehen?“. Es muss etwas geben (dein Browser, die
   Produktionsumgebung, die echten Daten). Wenn er darauf besteht, dass nichts, besteh du.
3. Üb das „ist immer noch kaputt“. Bitte ihn um etwas Kleines, prüf in der Testumgebung, und wenn
   du aus irgendeinem Grund die Änderung nicht siehst (das ist häufig: das Deployment dauert, oder
   wurde nicht gemacht), sag ihm „ist immer noch kaputt“.

**Bevor du den Prompt schickst**: deine notierte Prüfung (unter welcher URL du geschaut hast,
welche Version das System zeigt, was du gemacht hast, was du erwartet hast, was passiert ist) und
den Commit oder die Version, von der der Agent gesagt hat, dass sie die Behebung enthält, aus
seinem Bericht kopiert. Ohne das ist das „ist immer noch kaputt“ ein Eindruck.

4. Füg ihm ein:

> Before diagnosing again, compare the version running where I see the problem with the version
> that contains your fix. Tell me both. If they differ, the problem is publication, not code.

> [de]
> Bevor du erneut diagnostizierst, vergleiche die Version, die dort läuft, wo ich das Problem
> sehe, mit der Version, die deine Behebung enthält. Nenn mir beide. Wenn sie sich unterscheiden,
> ist das Problem die Veröffentlichung, nicht der Code.

   Die Hälfte der „ist immer noch kaputt“ sind Behebungen, die im Repository sind und nicht an
   dem Ort, wo du hinschaust [Ref. 45](REFERENCIAS.md#ref-45). Diese Klausel spart dir Stunden.

**Vollständigkeitsprüfung.** Sind die drei Blöcke da? Hast du nach Zufall eine Behauptung aus
„verifiziert“ gewählt, und sie hat ihren Beweis daneben, und du konntest ihn reproduzieren? Deckt
er jeden Punkt dessen ab, was du verlangt hast? Stehen die schlechten Nachrichten am Anfang? Hat
er irgendwann einfach nur „erledigt“ gesagt?

**Ergebnis.** Die Routine in der Vereinbarung und drei aufeinanderfolgende Berichte mit den drei
Blöcken, einer davon mit einem echten blinden Fleck.

**Typische Fehler.** Nur den Block „verifiziert“ lesen und die anderen zwei überspringen: die
anderen zwei sind die, die dich schützen. „Sollte funktionieren“ innerhalb von „verifiziert“
akzeptieren: das ist verkleidetes „geglaubt“. Und sich an immer längere Berichte gewöhnen: ein
aufgeblähter Bericht verdeckt etwas mit Volumen.

**Im Leitprojekt.** Ein guter Abschlussbericht von PND-004 (einen Termin absagen) in Turnera:
„VERIFIZIERT: der Absagetest besteht (1/1, rot bewiesen gegen die Version, die löschte);
Regression 6/6; Ende zu Ende des Flusses ‚absagen‘ grün, mit der in der Datenbank markierten
Zeile; in der Testumgebung erscheint der Termin 17 vom 3. November als abgesagt durch ‚recepcion1‘
um 10:42 (Screenshot). GEGLAUBT: der Monatsbericht wird die Absagen richtig zählen, aber ich habe
es nicht getestet, weil der Bericht PND-011 ist und noch nicht existiert. BLINDE FLECKEN: ich kann
nicht sehen, wie der Zustand ‚abgesagt‘ auf dem Handy der Empfangskraft aussieht; prüf du es.“

---

## Abschnitt Produktionsfreigabe: Lektionen 13 bis 20

Diese acht Lektionen sind die, die „funktioniert“ in „lässt sich halten“ verwandeln, und sie
werden einmal gemacht, der Reihe nach, wenn die ersten zwei Blöcke mit der Schleife gebaut und von
dir in der Testumgebung getestet sind, und bevor das System auf die Welt wirkt (Nachrichten
sendet, abbucht) oder echte Nutzer hat. Im Leitprojekt ist das der Moment, die Erinnerungen und
die Anzahlung hinzuzufügen, und deshalb kommt Lektion 14 (Sperren) vor dem Bau dieser
Funktionalitäten, nicht danach. Die vier der Betriebsqualität (16 bis 19) sind die, die ich
machte, ohne sie zu benennen; wenn du Anfänger bist, hat jeder ihrer Verträge einen Absatz „Wenn
du Anfänger bist“, der seine Wörter erklärt; lies ihn vor der Lektion.

### Lektion 13 — Das periodische Audit als Input für den Plan

**Was du verstehen musst.** Ab und zu muss man sich das ganze System mit frischen Augen ansehen,
und was man sieht, geht nicht in einen Bericht, der abgelegt wird: es geht in die Liste der offenen
Posten. Der wichtige Teil ist „frische Augen“: wer auditiert, darf nicht der sein, der gebaut hat,
denn er teilt seine Annahmen. Ein Modell, das ein Modul gebaut hat, „weiß“, dass das im Code
geschriebene Passwort provisorisch war; ein Modell, das es zum ersten Mal sieht, meldet es als
das, was es ist. So wurden zwei Administrator-Türen gefunden, die der Bauende an einem Tag
hinterlassen hatte [Ref. 40](REFERENCIAS.md#ref-40). Es braucht keine andere Firma: es reicht
**eine andere Sitzung, mit einer anderen Anweisungsdatei, die nicht beteiligt war**.

**Die Aufgabe.**

**Bevor du den Prompt schickst**, mit deinen Händen:

- Eine neue Sitzung des Agenten in einer sauberen Kopie des Repositorys (klon es in einen anderen
  Ordner). Wenn dein Werkzeug es erlaubt, gib ihm eine andere Anweisungsdatei, die nur sagt „du
  bist ein Auditor; du hast dieses System nicht gebaut“.
- Lesezugang für diese Sitzung zur Testumgebung (Datenbank, Logs), mit nur lesenden Zugangsdaten
  außerhalb des Repositorys.
- Den von dir entschiedenen Umfang für die Lücke des Prompts, und das vorige Audit, falls es eines
  gab.

1. Füg ihm ein:

> Audit this system for [integrity, security, performance and code quality]. Read-only: change
> nothing except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires
> access you lack (the database, the log, an environment), tell me and mark that part as not
> audited; do not pass it as fine. Go through all of the code, not a sample. For every finding:
> where it is (file and line), what the risk is, what evidence proves it (the command, the
> query, the number), and its priority: P0 must be fixed now, P1 soon, P2 when possible. Give a
> grade to every dimension you audited. End with the list of P0 findings turned into proposed
> pending items. Reply in my language.

> [de]
> Auditiere dieses System auf [Integrität, Sicherheit, Leistung und Codequalität]. Nur lesend:
> ändere nichts, außer deinen Bericht nach `docs/AUDIT_[Datum].md` zu schreiben. Wenn das
> Auditieren eines Teils einen Zugang erfordert, den du nicht hast (die Datenbank, das Log, eine
> Umgebung), sag es mir und markiere diesen Teil als nicht auditiert; lass ihn nicht als in
> Ordnung durchgehen. Geh den ganzen Code durch, nicht eine Stichprobe. Für jeden Befund: wo er
> ist (Datei und Zeile), was das Risiko ist, welcher Beleg ihn beweist (der Befehl, die Abfrage,
> die Zahl), und seine Priorität: P0 muss jetzt behoben werden, P1 bald, P2 wenn möglich. Gib
> jeder auditierten Dimension eine Note. Schließe mit der Liste der P0-Befunde, umgewandelt in
> vorgeschlagene offene Posten. Antworte in meiner Sprache.

   Du verlangst von ihm nur lesend, dass er erklärt, was er nicht auditieren konnte, statt es
   durch Unterlassung freizugeben, den ganzen Code und nicht eine Stichprobe, jeden Befund mit
   Ort, Risiko, Beleg und Priorität, Noten pro Dimension, und die P0 schon als vorgeschlagene
   offene Posten.

2. Lies den Bericht. Wähl zwei Befunde und bitte den Auditor, dir den Beleg zu zeigen (den Befehl,
   die Zeile). Er muss es können.

**Bevor du den Prompt schickst** zum Abschluss: den Bericht von dir gelesen, die zwei Befunde mit
dem Auditor verifiziert, und die Sitzung des Bauenden geöffnet (dieser Prompt geht an den Bauenden,
nicht an den Auditor), mit dem Datum der Datei in der Lücke.

3. Geh zurück zur Sitzung des Bauenden und füg ihm ein:

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.

> [de]
> Lies `docs/AUDIT_[Datum].md`. Öffne einen offenen Posten für jeden P0 und P1, mit Verweis auf
> den Befund. Wenn du mit einem nicht einverstanden bist, sag es mir mit dem Gegenbeleg;
> ignoriere ihn nicht.

4. Wiederhol diese Lektion vor dem ersten Deployment in die Produktion (Lektion 15) und danach
   alle ein bis zwei Monate.

**Vollständigkeitsprüfung.** Sagt der Bericht, was er NICHT auditieren konnte? Haben zwei
zufällige Befunde Datei, Zeile und reproduzierbaren Beleg? Hat jeder P0 seinen offenen Posten?
Werden sich die Noten mit dem nächsten Audit vergleichen lassen? Hat eine andere Sitzung auditiert
als die, die gebaut hat?

**Ergebnis.** `docs/AUDIT_[Datum].md` und die geöffneten offenen Posten P0/P1.

**Typische Fehler.** Mit derselben Sitzung auditieren, die gebaut hat: sie wird ihre eigenen
Annahmen bestätigen. Einen Bericht ohne einen einzigen P0 in einem System akzeptieren, das älter
als einen Monat ist: das ist fast nie wahr. Und den Bericht ablegen, ohne die offenen Posten zu
öffnen: dann hat das Audit zu nichts gedient.

**Im Leitprojekt.** Das erste Audit von Turnera findet meist: Patientendaten im Log (beim Senden
von Nachrichten abgedruckte Telefonnummern: P0); die Patientensuche nach Name ohne Index (P1, wird
sich bei 5.000 Patienten bemerkbar machen); das Terminformular ohne Validierung, dass das Datum in
der Zukunft liegt (P1); und irgendeine Abhängigkeit mit einer bekannten Schwachstelle (P1). Vier
neue offene Posten, alle mit Datei und Zeile.

### Lektion 14 — Fail-closed, Sperren und null stiller Schaden

**Was du verstehen musst.** Software macht standardmäßig im Zweifel weiter: wenn die Validierung
fehlschlägt, läuft der Code weiter; wenn der Dienst nicht antwortet, wird angenommen, alles sei in
Ordnung. Das ist „fail-open“, wie eine Tür, die aufgeht, wenn der Strom ausfällt. Die Methode
kehrt den Standard um: **im Zweifel nein**. Jede Aktion mit Konsequenz (abbuchen, senden, löschen,
genehmigen) trägt eine Sperre, hat einen aufgeschriebenen Rückweg, und jede neue Automatisierung
startet im Trockenlauf und protokolliert, was sie getan hätte, bis du sie freischaltest. Die
Sperren, die ich in mein erstes System eingebaut habe, sind das Vorbild
[Ref. 28](REFERENCIAS.md#ref-28).

Diese Lektion kommt **vor** dem Bau der Funktionalitäten, die auf die Welt wirken. In Turnera vor
den Erinnerungen und der Anzahlung, die der dritte Block sind.

**Die Aufgabe.**

**Bevor du den Prompt schickst**, mit deinen Händen und mit dem Eigentümer:

- `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`: was das System tut oder tun wird, das abbucht, sendet,
  genehmigt, löscht oder jemanden außerhalb benachrichtigt; und für jede Aktion, was passiert, wenn
  sie zweimal getan wird, was passiert, wenn sie falsch getan wird, wie sie rückgängig gemacht
  wird, wer sie tun können sollte. Die Prozesse des semantischen Baums geben dir die Ausgangsliste.
  Der Prompt nennt sie „the survey of consequential actions“, ohne Pfad: sag ihm, wo sie liegt.
- `docs/SEMANTIC_TREE.md`, auf dem neuesten Stand.

1. Füg ihm ein:

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock. Reply in my language.

> [de]
> Wir werden entscheiden, welche Aktionen des Systems eine Sperre brauchen. Lies die Erhebung
> der Aktionen mit Konsequenz und geh den Code durch auf der Suche nach allem, was abbucht,
> sendet, genehmigt, löscht oder nach außen benachrichtigt. Vergleiche die beiden Listen: wenn
> der Code Aktionen hat, die die Erhebung nicht erwähnt, oder umgekehrt, frag mich, bevor du
> weitermachst. Schlag für jede Aktion vor: ob sie umkehrbar ist, welche Sperre sie bekommt
> (explizite Bestätigung, doppelte Sicherung, Trockenlauf, Tageslimit, ein Mensch im Kreislauf),
> und was der Rückweg ist, wenn es schiefgeht. Allgemeine Regel: bei jedem Zweifel oder Fehler
> auf dem Weg wird die Aktion NICHT ausgeführt und der Grund wird protokolliert. Lege mir die
> Tabelle vor; ich bestätige Sperre für Sperre. Antworte in meiner Sprache.

   Du verlangst von ihm, dass er vergleicht, was das Geschäft gesagt hat, mit dem, was der Code
   tut (dort tauchen die Aktionen auf, an die sich niemand erinnerte), dass er die Unterschiede
   erfragt, und für jede Aktion die Umkehrbarkeit, die Sperre und den Rückweg, mit der Regel des
   Fail-closed ausgeschrieben.

2. Bestätige Sperre für Sperre, mit dem Eigentümer.

**Bevor du den Prompt schickst** zum Abschluss: für jede Zeile der Tabelle deine Bestätigung oder
deine Änderung, geschrieben für die Lücken des Prompts; keine Zeile ohne Urteil, denn eine nicht
bestätigte Sperre ist eine Sperre, die nicht umgesetzt wird.

3. Schließ ab mit:

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.

> [de]
> Ich bestätige die Sperren [Liste]; ändere [X] in [Y]. Setze sie um, mit einem Test pro Sperre,
> der beweist, dass unter der Zweifelsbedingung die Aktion NICHT stattfindet (rot bewiesen gegen
> die Version ohne die Sperre). Halte die endgültige Tabelle in `docs/LOCKS.md` fest. Und für jede
> neue Automatisierung: erst Trockenlauf, mit Protokoll dessen, was sie getan hätte, bis ich sie
> freischalte.

4. Jetzt öffne den dritten Block (die Erinnerungen, die Anzahlung) mit Lektion 5, bau ihn mit der
   vollständigen Schleife der Lektionen 5 bis 12, und lass ihn im Trockenlauf. Sieh dir ein paar
   Tage lang das Protokoll „hätte gesendet“ an, bevor du den echten Versand freischaltest.

**Vollständigkeitsprüfung.** Steht jede Aktion, die abbucht, sendet, genehmigt oder löscht, in der
Tabelle? Hat jede Sperre ihren roten Test? Hat jede unumkehrbare Aktion einen aufgeschriebenen
Rückweg? Sind die neuen Automatisierungen im Trockenlauf gestartet, und hast du das Protokoll
gesehen, bevor du sie freigeschaltet hast?

**Ergebnis.** `docs/LOCKS.md`, ein Test pro Sperre, rot bewiesen, und die Automatisierungen im
Trockenlauf mit ihrem Protokoll.

**Typische Fehler.** Den echten Versand freischalten, „um mit einer Nachricht an mein eigenes
Telefon zu testen“: der Trockenlauf existiert genau dafür. Eine Sperre, die sich mit einem
Parameter „für Tests“ umgehen lässt: dieser Parameter wird in der Produktion gesetzt bleiben. Und
das Protokoll „hätte getan“ nicht ansehen: es ist das einzige Fenster, um einen Fehler zu sehen,
bevor er einen Patienten erreicht.

**Im Leitprojekt.** Die Sperrentabelle von Turnera: Erinnerung senden (nicht umkehrbar; Sperre:
Idempotenz pro Termin, ein einziger Versand pro Termin und Kanal, Limit von 200 pro Tag, erst
Trockenlauf; Rückweg: keiner, deshalb das Limit); Anzahlung einziehen (umkehrbar durch
Rückerstattung; Sperre: explizite Bestätigung der Empfangskraft, Betrag von der Fachkraft
festgelegt; Rückweg: Rückerstattung durch den Zahlungsanbieter); Termin absagen (unumkehrbar für
den Patienten; Sperre: Bestätigung und Protokollierung, wer; Rückweg: den Termin neu anlegen);
Patient löschen (unumkehrbar; Sperre: doppelte Bestätigung, nur die Leiterin, und nur, wenn er
keine zukünftigen Termine hat; Rückweg: keiner, deshalb doppelt). Jede Sperre mit einem Test, der
zeigt, dass ohne die Sperre die Aktion stattfand.

### Lektion 15 — Continuous Integration, Umgebungen, Geheimnisse und Deployment als Teil des Produkts

**Was du verstehen musst.** In die Produktion zu kommen muss ein reproduzierbares Paket sein: die
Tests laufen **einmal**, das Deployment verpackt nur und lädt hoch, die Konfiguration lebt auf dem
Server und nicht im Repository, es gibt ein Verfahren, um von der Testumgebung in die Produktion zu
befördern, das zweimal laufen kann, und das Rollback ist **getestet** (ein Rollback, das nie
getestet wurde, existiert nicht). Mir haben die dreimal pro Commit gelaufenen Tests das Kontingent
der Continuous Integration verbrannt [Ref. 39](REFERENCIAS.md#ref-39). Zu den Geheimnissen eine
Regel ohne Ausnahmen: **ein Geheimnis, das in einem Chat, in einem Log oder in einem Commit zu
sehen war, ist kein Geheimnis mehr**; es wird rotiert, Punkt [Ref. 42](REFERENCIAS.md#ref-42).

Einen guten Teil davon hast du schon seit dem Skelett (Lektion 4): die Continuous Integration und
das Deployment in die Testumgebung. Diese Lektion vervollständigt ihn Richtung Produktion.

**Die Aufgabe.**

**Bevor du den Prompt schickst**, mit deinen Händen:

- `docs/ENVIRONMENTS_SURVEY.md` (Lektion 4), vervollständigt mit dem, was für die Produktion fehlt:
  die Domain und wer sie verwaltet, wo die Geheimnisse leben werden und welche es sind (der Name,
  nie der Wert), wer die Produktion anfassen darf, wie heute ein Rollback gemacht würde, und wie
  viel Kontingent an Continuous Integration du hast (wenn du GitHub Actions benutzt, sieh dir das
  Limit des Plans an). Der Prompt nennt sie „the environments and access survey“: sag ihm, wo sie
  liegt.
- Den Zugang zur Produktion für den Agenten, von dir entschieden, mit der Zugangsberechtigung
  außerhalb des Repositorys und des Chats.
- Das Skelett mit seiner Continuous Integration und seinem Deployment in die Testumgebung,
  funktionierend (Lektion 4).

1. Füg ihm ein:

> We are going to close the path to production. Read the environments and access survey.
> Evaluate whether you have what is needed to deploy to production safely (access, domain,
> where the secrets live, how to roll back); if anything is missing, ask me. Then set up: (1)
> continuous integration runs the full test suite exactly once per commit; (2) the deployment
> waits for that run's result and only packages and uploads, without running tests again; (3)
> each environment's configuration lives on the server (environment file or vault), never in the
> repository; (4) a written procedure to promote from the test environment to production, which
> can be run twice without breaking anything; (5) the rollback, tested; (6) an automatic check
> that prevents committing a secret. Document all of it in `docs/DEPLOYMENT.md` so that a person
> can do it by hand without you. Reply in my language.

> [de]
> Wir werden den Weg in die Produktion abschließen. Lies die Erhebung der Umgebungen und Zugänge.
> Bewerte, ob du hast, was nötig ist, um sicher in die Produktion zu deployen (Zugang, Domain, wo
> die Geheimnisse leben, wie man zurückrollt); wenn etwas fehlt, frag mich. Richte dann ein: (1)
> die Continuous Integration führt die vollständige Testbatterie genau einmal pro Commit aus; (2)
> das Deployment wartet auf das Ergebnis dieses Laufs und verpackt und lädt nur hoch, ohne die
> Tests erneut auszuführen; (3) die Konfiguration jeder Umgebung lebt auf dem Server
> (Umgebungsdatei oder Tresor), nie im Repository; (4) ein schriftliches Verfahren, um von der
> Testumgebung in die Produktion zu befördern, das zweimal laufen kann, ohne etwas zu brechen; (5)
> das Rollback, getestet; (6) eine automatische Prüfung, die verhindert, dass ein Geheimnis
> committet wird. Dokumentiere alles in `docs/DEPLOYMENT.md`, so dass eine Person es von Hand
> ohne dich tun kann. Antworte in meiner Sprache.

   Du verlangst von ihm die Zugänge, bevor begonnen wird, die Tests ein einziges Mal pro Commit,
   das Deployment, das nur verpackt, die Konfiguration draußen, die wiederholbare Beförderung, das
   getestete Rollback, die Sperre gegen Geheimnisse, und die Dokumentation für eine Person.

2. Vor dem ersten Deployment in die Produktion mach das Audit von Lektion 13, falls du es nicht
   gemacht hast, und lass die vollständige Ende-zu-Ende-Batterie aller Flüsse mit der exakten
   Version laufen, die du befördern wirst (der Blockabschluss-Prompt von Lektion 8).

**Bevor du den Prompt schickst** der Routine: `docs/DEPLOYMENT.md` geschrieben und von dir gelesen
(könntest du ihm allein folgen?), und `docs/WORKING_AGREEMENT.md`.

3. Füg der Vereinbarung die Deployment-Routine hinzu:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before touching production: the test
> environment is green with the same version; the rollback is ready; and tell me what changes in
> the configuration. After deploying: show me the version running in production and an
> end-to-end check on production, read-only."

> [de]
> Füge diese Routine zu `docs/WORKING_AGREEMENT.md` hinzu: „Bevor du die Produktion anfasst: die
> Testumgebung ist grün mit derselben Version; das Rollback ist bereit; und sag mir, was sich in
> der Konfiguration ändert. Nach dem Deployen: zeig mir die Version, die in der Produktion läuft,
> und eine Ende-zu-Ende-Prüfung auf der Produktion, nur lesend.“

4. Mach das erste Deployment in die Produktion, mit dem System noch ohne echte Nutzer. Und danach
   **teste das Rollback**: bitte ihn, zur vorherigen Version zurückzukehren und dir zu zeigen, dass
   sie läuft, und danach zur neuen zurückzukehren.
5. Wenn du irgendwann im Kurs ein Geheimnis in den Chat eingefügt hast (einen API-Schlüssel, ein
   Passwort), rotier es.

**Bevor du den Prompt schickst**: das identifizierte Geheimnis (sein Name, nie sein Wert), wo es
aufgetaucht ist und wann, und dein Zugang zu dem Panel, in dem es erzeugt wird, für den Fall, dass
der Agent es nicht allein rotieren kann. Dieser Prompt wird nicht „später“ geschickt.

6. Füg ihm ein:

> That secret is compromised: rotate it now, tell me everywhere else it was used, and add the
> check that would have caught it.

> [de]
> Dieses Geheimnis ist kompromittiert: rotiere es jetzt, sag mir, wo überall es sonst verwendet
> wurde, und füge die Prüfung hinzu, die es abgefangen hätte.

**Vollständigkeitsprüfung.** Wie oft läuft die Batterie pro Commit? (einmal; verlang den Link).
Gibt es einen echten Konfigurationswert im Repository? (verlang von ihm die leere Suche). Könntest
du `docs/DEPLOYMENT.md` allein befolgen? Wurde das Rollback getestet, wann, mit welchem Beleg?
Wurde jedes Geheimnis rotiert, das im Chat aufgetaucht ist? Weißt du, wie viel Kontingent an
Continuous Integration dir bleibt?

**Ergebnis.** Die Continuous Integration einmal pro Commit, das Deployment, das nur verpackt,
`docs/DEPLOYMENT.md`, das getestete Rollback, die aktive Anti-Geheimnis-Sperre, und das System,
das in der Produktion läuft (noch ohne Nutzer).

**Typische Fehler.** Das Deployment „von Hand, schnell, weil es eine kleine Änderung ist“: die
kleinen Änderungen brechen die Produktion, weil niemand sie testet. Die Beispieldatei der
Konfiguration mit Werten, die echt aussehen (sie sind es). Und das Rollback nicht testen bis zu dem
Tag, an dem du es brauchst.

**Im Leitprojekt.** Für Turnera lässt die Continuous Integration die Batterie (etwa 30 Tests zu
diesem Zeitpunkt, einschließlich der sechs Ende-zu-Ende-Flüsse) bei jedem Push laufen; das
Deployment in die Testumgebung ist beim Mergen in `main` automatisch; die Beförderung in die
Produktion ist ein Befehl, der die Version verpackt, die in der Testumgebung ist, und sie
hochlädt, mit der Konfiguration (der Schlüssel des Nachrichtenanbieters, der des
Zahlungsanbieters, die URL der Datenbank) in einer Umgebungsdatei auf dem Server, die nicht im
Repository ist. Das Rollback ist derselbe Befehl mit der vorherigen Version. Und die
Anti-Geheimnis-Sperre ist eine Prüfung bei jedem Commit, die alles ablehnt, was wie ein Schlüssel
aussieht.

### Lektion 16 — Beobachtbarkeit und Nachverfolgbarkeit, mit konfigurierbarem Level

**Was du verstehen musst.** Wenn in der Produktion etwas schiefgeht, wirst du wissen wollen, was
passiert ist, ohne den Code zu öffnen und ohne dass der Agent „nachsieht“: eine Nummer suchen und
die ganze Geschichte dieser Aktion erscheinen lassen, vom Bildschirm bis zur Datenbank. Das ist
ein *strukturiertes Log* mit einer *Korrelations-ID*. Und du wirst das Detail dessen, was das
System schreibt, eine Minute lang hochdrehen wollen, während du untersuchst, ohne neu zu
deployen: das ist das *konfigurierbare Level*. Die *Nachverfolgbarkeit* ist die andere Hälfte:
jede Aktion mit Konsequenz (abgebucht, gesendet, gelöscht) landet in einer Liste, die die
Anwendung nicht bearbeiten kann, mit wer, wann und was. Ohne das agiert der residente Agent aus
Lektion 23 blind, und die Monitorings der Lektionen 21 und 22 haben nichts anzusehen
[Ref. 16](REFERENCIAS.md#ref-16).

**Bevor du den Prompt schickst**, mit deinen Händen und mit der Eigentümerin:

- `docs/DEPLOYMENT.md` (Lektion 15), mit der Art, wie die Konfiguration pro Umgebung gelesen
  wird: das Level wird eine weitere Variable sein.
- `docs/LOCKS.md` (Lektion 14): die Liste der Aktionen, die im Audit-Log stehen müssen.
- In `docs/INITIAL_SURVEY.md` die Liste, welche Daten personenbezogen sind (in Turnera: Name,
  Telefonnummer, E-Mail-Adresse und Ausweisnummer der Patientin), mit der Leiterin geschrieben.
  Die Logs müssen sie maskieren; es ist eine gesetzliche Pflicht.
- Deine Entscheidung, wo die Logs leben und wie lange sie aufbewahrt werden. Für den Kurs: eine
  rotierte Datei auf dem Server, neunzig Tage.

1. Füg ihm den Anfangs-Prompt des Vertrags von Schritt 16 ein (in `docs/peldanos/`), genau so.
2. Wenn er dir die Kennung einer echten Anfrage zeigt, such sie selbst in den Logs der
   Testumgebung: sie muss im Bildschirm, im Backend, in der Datenbank und im Aufruf an den
   Nachrichtenanbieter erscheinen.
3. Dreh das Level selbst auf Debug, mach eine Aktion, schau nach, dreh es wieder herunter. Wenn
   du deployen musstest, ist der Schritt nicht erklommen.
4. Such „Juan“ (oder irgendeinen Testnamen) in den Logs: er darf nicht da sein.

**Bevor du den Prompt schickst** der Routine: `docs/OBSERVABILITY.md` von dir gelesen, und das
Level einmal von dir hoch- und wieder heruntergedreht.

5. Füg der Vereinbarung die Routine von Schritt 16 hinzu (im Vertrag, „Routine“), eingepackt in
   „Add this routine to `docs/WORKING_AGREEMENT.md`:“ wie die übrigen.

**Vollständigkeitsprüfung.** Bist du selbst einer Kennung durch alle Schichten gefolgt? Hast du
das Level ohne Deployment geändert? Steht irgendein personenbezogenes Datum in den Logs? Ist die
Absage eines Termins in der Testumgebung mit wer und wann im Audit-Log gelandet? Reicht dir
`docs/OBSERVABILITY.md`, um allein einen Log-Eintrag zu finden?

**Ergebnis.** Strukturierte Logs mit konfigurierbarem Level, die weitergegebene Kennung, das
Audit-Log der Aktionen mit Konsequenz, `docs/OBSERVABILITY.md`, und die Routine in der
Vereinbarung.

**Typische Fehler.** „Logs“ akzeptieren, die jedes Modul anders schreibt. Die Produktion „erst
mal“ auf Debug lassen. Und dass die Kennung nicht bis zur nächtlichen Aufgabe der Erinnerungen
kommt, was genau der Ort ist, an dem die Vorfälle verloren gehen.

**Im Leitprojekt.** Die Kennung von „Termin 17 absagen“ erscheint im Klick, im Server, in der
markierten Zeile der Datenbank und in der E-Mail an die Fachkraft. Das Audit-Log sagt:
„recepcion1 hat den Termin 17 um 10:42 aus der Tagesagenda abgesagt; Ergebnis: ok“. Die Leiterin
dreht das Level auf Trace, um zu sehen, warum eine Erinnerung sich verspätet hat, findet es, und
dreht es wieder herunter.

### Lektion 17 — Optimierung der Persistenzschicht, vorher und nachher gemessen

**Was du verstehen musst.** Die Datenbank ist der Ort, an dem Systeme langsam sterben: gut mit
hundert Terminen, schlecht mit hunderttausend. Ein *Index* ist wie der eines Buches: ohne ihn
liest die Datenbank die ganze Tabelle, um einen Termin zu finden. Eine *N+1-Schleife* ist, hundert
Abfragen zu machen, um hundert Termine anzuzeigen, statt einer. Diese Lektion wendet Lektion 7 auf
die Datenbank an: jede Abfrage mit einem Messgerät mit Test messen, ändern, was die Zahlen sagen,
auf denselben Daten noch einmal messen, und ein Budget mit Test hinterlassen, damit es nicht
zurückkommt [Ref. 18](REFERENCIAS.md#ref-18), [Ref. 37](REFERENCIAS.md#ref-37). Es ist nicht, die
Datenbank neu zu schreiben oder sie zu wechseln: das war Lektion 3.

**Bevor du den Prompt schickst**, mit deinen Händen:

- `docs/SIZING.md` und `docs/VOLUME_SURVEY.md` (Lektion 3): die zu ladenden Volumina.
- Die Testumgebung mit Daten **im erwarteten Volumen**: für Turnera zehntausend Termine und
  dreißigtausend Nachrichten eines Jahres, erzeugt von einem Skript, das der Agent im Repository
  hinterlässt (verlang es als vorherigen offenen Posten, mit der Form des semantischen Baums).
- `docs/PRODUCER_CONSUMER_MAP.md` (Lektion 11), auf dem neuesten Stand.
- Ein bekannter Fall für den Test des Messgeräts: die Tabelle der Fachkräfte hat drei Zeilen.

1. Füg ihm den Anfangs-Prompt des Vertrags von Schritt 17 ein.
2. Lies die Liste der vorgeschlagenen Änderungen so, wie die Leiterin eine Liste von Reparaturen
   der Praxis lesen würde: verstehst du, was jede gewinnt und welches Risiko sie hat? Gib eine
   nach der anderen frei oder lehn sie ab. Rechne eine Zahl von Hand nach (Zeilen pro Monat der
   Terminetabelle).

**Bevor du den Prompt schickst** zum Abschluss: die Liste mit deinem Urteil pro Änderung und die
nachgerechnete Zahl, die übereinstimmt.

3. Füg ihm den Abschluss-Prompt des Vertrags von Schritt 17 ein, mit der freigegebenen Liste.
4. Lass selbst ein Messgerät vorher und nachher laufen, mit den beiden Befehlen, die er dir
   gegeben hat.

**Vollständigkeitsprüfung.** Stimmen deine Durchläufe mit der Tabelle von `docs/PERSISTENCE.md`
überein? Bleibt irgendeine Abfrage, die in einem kritischen Fluss eine ganze Tabelle liest? Hat
jede Tabelle eine geschriebene Retention? Haben die Budgets einen Test (verlang von ihm, eines zu
überschreiten und dir das Rot zu zeigen)?

**Ergebnis.** Die Messgeräte mit Test, `docs/PERSISTENCE.md` mit Vorher und Nachher, die Budgets
mit Test, und die Batterie in Grün.

**Typische Fehler.** Mit den zehn Datensätzen des Skeletts messen. „Besser migrieren wir auf eine
andere Datenbank“ akzeptieren. Und eine Zahl verbessern und dabei die monatliche Tabelle kaputt
machen, die diese Tabelle las: da fehlte die Karte.

**Im Leitprojekt.** Die Tagesagenda machte eine Abfrage pro Termin (die Schleife aus Lektion 7):
52 Abfragen für 50 Termine werden zu 3. Die Patientensuche nach Namen las die ganze Tabelle: ein
Index senkt sie von 800 Millisekunden auf 4 bei zehntausend Patientinnen. Retention: die
Nachrichten werden nach einem Jahr archiviert; die Termine nie. Budget: 4 Abfragen für die
Agenda, mit Test.

### Lektion 18 — Scannen und Beheben von Schwachstellen

**Was du verstehen musst.** Eine *Schwachstelle* ist ein Defekt, den jemand nutzen kann, um
einzudringen, Daten zu stehlen oder das System tun zu lassen, was es nicht soll. Das Audit
(Lektion 13) sucht sie mit Urteilsvermögen, hin und wieder; diese Lektion sucht sie maschinell,
die ganze Zeit, in vier Schichten: die *Abhängigkeiten* (Bausteine anderer, die dein System
benutzt, mit ihren veröffentlichten bekannten Defekten), den Code (*statische Analyse*), die
Geheimnisse in der Historie des Repositorys, und die Konfiguration des Servers. Und eine Regel:
eine Abhängigkeit zu aktualisieren ist eine Änderung und geht durch die Schleife; „ich habe die
Version hochgezogen, um den Befund zu schließen“, ohne Regression, ist die häufigste Art, die
Produktion an einem Freitag kaputtzumachen [Ref. 41](REFERENCIAS.md#ref-41),
[Ref. 23](REFERENCIAS.md#ref-23).

**Bevor du den Prompt schickst**, mit deinen Händen:

- Die laufende Continuous Integration (Lektion 4 und 15), und wie viel Kontingent dir bleibt: der
  Scan fügt Minuten hinzu.
- `docs/ENVIRONMENTS_SURVEY.md` mit dem Server, den Ports und der Angabe, wer die Domain
  verwaltet.
- `docs/AUDIT_[Datum].md` (Lektion 13), damit er Bekanntes nicht wiederholt.
- Dein P0-Kriterium, in zwei Zeilen: für Turnera das, was ohne Zugangsdaten hineinlässt, was
  Patientendaten offenlegt, was erlaubt, ohne Kontrolle Nachrichten zu senden oder abzubuchen.

1. Füg ihm den Anfangs-Prompt des Vertrags von Schritt 18 ein, mit deinem Kriterium in der Lücke.
2. Lies `docs/SECURITY_[Datum].md`. Wähl zwei Befunde und verlang den Beleg. Sagt es, was es
   NICHT gescannt hat?

**Bevor du den Prompt schickst** zum Abschluss: die Liste der freigegebenen Reparaturen; für jede
Aktualisierung einer Abhängigkeit das Bewusstsein, dass die Regression und die Ende-zu-Ende-
Batterie laufen werden.

3. Füg ihm den Abschluss-Prompt des Vertrags von Schritt 18 ein.
4. Verlang von ihm, absichtlich, in einem Zweig, eine Abhängigkeit mit bekannter Schwachstelle
   einzufügen: die Kette muss rot werden.

**Vollständigkeitsprüfung.** Ist der letzte Durchlauf des Scans grün, und von welchem Datum? Hat
jedes P0 seinen mit Beleg geschlossenen offenen Posten? Ist der Scan ein Tor in `docs/GATES.md`?
Weißt du, wann der nächste geplante Scan läuft?

**Ergebnis.** Der Scan in vier Schichten in der Kette und mit Zeitplan,
`docs/SECURITY_[Datum].md`, `docs/SECURITY.md`, die reparierten P0 und P1, das Tor.

**Typische Fehler.** Ein Scan, der „beim ersten Mal sauber“ ist, in einem System, das älter als
ein Monat ist: da fehlte eine Schicht. Zehn Abhängigkeiten in einem Commit aktualisiert. Ein
„akzeptiertes“ P0 ohne offenen Posten und ohne Datum.

**Im Leitprojekt.** Der Scan von Turnera findet: eine Abhängigkeit des PDF-Generators mit einer
bekannten Schwachstelle (P1, wird mit Regression und Ende-zu-Ende-Prüfung aktualisiert); den
Header, der das Einbetten der Agenda in eine andere Website verhindert, fehlend (P1, eine Zeile
Konfiguration, mit Test); einen Testschlüssel des Zahlungsanbieters in der Historie des
Repositorys (P0: er wird rotiert, auch wenn er nur zum Testen war); und einen Port der Datenbank,
der auf dem Testserver zur Welt offen steht (P0: er wird geschlossen). Der Scan bleibt als Tor
und läuft montags.

### Lektion 19 — Lasttests im Volumen und Bruchpunkt

**Was du verstehen musst.** Lektion 3 hat mit Rechnungen dimensioniert; diese überprüft sie mit
dem laufenden System. Ein *Lasttest* simuliert viele Nutzer gleichzeitig. Man sieht sich den
*Durchsatz* an (Aktionen pro Sekunde), die *Latenz* (wie lange jede Aktion braucht; den Median
und das *95. Perzentil*, das ist das, was die sehen, die sich beschweren) und die Fehlerrate, im
erwarteten Volumen und beim „mal zehn“. Und danach wird die Last hochgefahren, bis etwas bricht:
der *Bruchpunkt* ist nicht „es wird langsam“, sondern „die Verbindungen zur Datenbank waren bei
180 Nutzerinnen erschöpft“. Diese Zahl ist die nützlichste des Abschnitts, denn aus ihr kommen die
*Schwellenwerte* für die Alarme von Lektion 21 [Ref. 12](REFERENCIAS.md#ref-12),
[Ref. 44](REFERENCIAS.md#ref-44).

**Bevor du den Prompt schickst**, mit deinen Händen und mit der Eigentümerin:

- `docs/SIZING.md` mit dem erwarteten Volumen und dem „mal zehn“: für Turnera zwei Nutzerinnen in
  der Spitze und vierzig Termine pro Tag; mal zehn, zwanzig Nutzerinnen und vierhundert Termine.
- Die kritischen Flüsse für die Lücke im Prompt: einen Termin eintragen, die Tagesagenda ansehen,
  eine Patientin suchen, der nächtliche Versand der Erinnerungen.
- Die Toleranz der Leiterin für den meistbenutzten Bildschirm (die Tagesagenda): „wenn er länger
  als zwei Sekunden braucht, beschweren sich die Mädchen“.
- Die Testumgebung mit den Daten im Volumen (Lektion 17) und, wenn sie sich in den Ressourcen von
  der Produktion unterscheidet, in `docs/ENVIRONMENTS_SURVEY.md` notiert, wie.
- Die Beobachtbarkeit aus Lektion 16 eingeschaltet.

1. Füg ihm den Anfangs-Prompt des Vertrags von Schritt 19 ein, mit den Flüssen und der Toleranz
   in den Lücken.
2. Lies `docs/PERFORMANCE_[Datum].md` mit der Toleranz daneben: bleibt die Tagesagenda im
   erwarteten Volumen unter zwei Sekunden? Und beim mal zehn? Was ist zuerst gebrochen und bei
   welcher Last?
3. Entscheide mit der Leiterin, bis zu welchem Volumen die Flaschenhälse jetzt repariert werden:
   wenn sie es an andere Praxen verkaufen wollen, ist das „mal zehn“ jetzt; wenn nicht, mit Datum.

**Bevor du den Prompt schickst** zum Abschluss: der gelesene Bericht, die Entscheidung über das
„mal zehn“.

4. Füg ihm den Abschluss-Prompt des Vertrags von Schritt 19 ein.
5. Lass selbst das Skript im erwarteten Volumen laufen, mit dem Befehl, den er dir gegeben hat:
   die Zahlen müssen sich ähneln.

**Vollständigkeitsprüfung.** Bleibt der meistbenutzte Bildschirm in der Toleranz, oder gibt es
einen offenen Posten mit der Zahl? Sagt der Bruchpunkt, was gebrochen ist und bei welcher Last?
Liegen die Schwellenwerte aus `docs/PERFORMANCE.md` unter dem Bruchpunkt und über dem erwarteten
Volumen? Ist der Test ein Tor, und ist der erste Durchlauf archiviert?

**Ergebnis.** Das Lastskript mit Test, `docs/PERFORMANCE_[Datum].md`, `docs/PERFORMANCE.md` mit
Schwellenwerten und Tor, und ein offener Posten pro Flaschenhals.

**Typische Fehler.** „Es hält das mal zehn ohne Probleme aus“ ohne Bruchpunkt: er hat die Last
nicht weit genug hochgefahren. Ein Skript, das auf die API geht und nicht auf den Bildschirm.
Während des Tests Flaschenhälse reparieren, „wo man schon mal dabei war“.

**Im Leitprojekt.** Im erwarteten Volumen antwortet die Agenda in 300 Millisekunden; beim mal
zehn in 1,4 Sekunden; der nächtliche Versand von 400 Erinnerungen braucht 50 Sekunden. Der
Bruchpunkt: bei 180 gleichzeitigen Nutzerinnen ist der Verbindungspool (10) erschöpft und die
Aktionen fangen an fehlzuschlagen. Schwellenwerte: Alarm, wenn die Agenda über 1,5 Sekunden geht
oder wenn die benutzten Verbindungen über 7 gehen. Offener Posten: der nächtliche Versand in
Stapeln zu 50, denn die Leiterin will es tatsächlich verkaufen.

### Lektion 20 — Lebendige Dokumentation und Handbücher, denen eine Person ohne KI folgen kann

**Was du verstehen musst.** Das System muss sich ohne den Agenten und ohne dich benutzen, warten
und wiederherstellen lassen. Das Kriterium für das Wiederherstellungshandbuch ist konkret: **eine
Vertrauensperson, die nicht programmiert, muss ihm folgen können, um drei Uhr morgens, mit
ausgefallenem System und dem Agenten ohne Verbindung**. Wenn ein Schritt sagt „mit dem Entwickler
abklären“, ist er unvollständig. Und da Dokumentation mit einem Modell neu zu erzeugen gratis ist,
wird die Regel zu „im selben Commit“: jede Änderung, die berührt, was der Nutzer sieht, was der
Betreiber tut oder wie deployt wird, aktualisiert das Handbuch im selben Commit. Die Handbücher,
die ich für mein erstes System mit diesem Kriterium geschrieben habe, sind das Vorbild
[Ref. 24](REFERENCIAS.md#ref-24).

Und eine Quelle, die du schon hast: die geschlossenen Posten. Wenn du jeden Abschluss so
dokumentiert hast, wie Lektion 5 es verlangt, wird das Benutzerhandbuch nicht von null geschrieben:
es wird aus den geschlossenen Posten zusammengesetzt, Block für Block, und das Änderungsprotokoll
entsteht direkt aus ihnen.

**Die Aufgabe.**

**Bevor du den Prompt schickst**, mit deinen Händen:

- `docs/WORKING_AGREEMENT.md`, wo die Routine hinkommt.
- Die Liste der Handbücher, die das System haben wird, jedes mit seinem Leser (der Endnutzer, der
  Wartende, der die Infrastruktur betreibt), geschrieben in `PROJECT.md` oder im Chat gesagt.

1. Füg die Routine der Vereinbarung hinzu:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Every change that modifies what the user
> sees, what the operator does, or how the system is deployed, updates the corresponding manual
> in the same commit. At the close of every functional block, add to the user manual the screens
> and flows of the pending items closed in that block, with real screenshots from the test
> environment, and add their entries to the changelog. If you do not know which manual, ask."

> [de]
> Füge diese Routine zu `docs/WORKING_AGREEMENT.md` hinzu: „Jede Änderung, die verändert, was
> der Nutzer sieht, was der Betreiber tut oder wie das System deployt wird, aktualisiert das
> entsprechende Handbuch im selben Commit. Beim Abschluss jedes Funktionsblocks füge dem
> Benutzerhandbuch die Bildschirme und Flüsse der in diesem Block geschlossenen Posten hinzu, mit
> echten Screenshots aus der Testumgebung, und füge ihre Einträge dem Änderungsprotokoll hinzu.
> Wenn du nicht weißt, in welches Handbuch, frag.“

**Bevor du den Prompt schickst** der Handbücher: das System laufend in der Testumgebung mit
realistischen Daten (die Screenshots kommen von dort), die geschlossenen Posten mit ihrer
Dokumentation (Lektion 5), `docs/DEPLOYMENT.md` und `docs/LOCKS.md` auf dem neuesten Stand, und
was nur das Geschäft weiß, vorbereitet für den Moment, in dem er fragt: wer wofür verantwortlich
ist, welche Telefonnummer man um drei Uhr morgens anruft, wer die Sicherungskopie macht.

2. Füg ihm ein:

> Generate three manuals from the system as it is today in the test environment: the user
> manual (screen by screen, with real screenshots, in the user's language, no jargon); the
> maintenance manual (how it is built, where everything is, how to run the test suite, how to
> add a module); and the infrastructure and recovery manual (how to deploy, how to roll back,
> how to restore a backup, what to do if it goes down; written for a person who has to do it by
> hand, without AI, at three in the morning). If for any section you need something only the
> business knows (who is responsible for what, which phone number to call), ask me; do not leave
> a gap and do not invent. Each manual carries a date and the system version. Reply in my
> language.

> [de]
> Erzeuge drei Handbücher aus dem System, wie es heute in der Testumgebung ist: das
> Benutzerhandbuch (Bildschirm für Bildschirm, mit echten Screenshots, in der Sprache des
> Nutzers, ohne Fachjargon); das Wartungshandbuch (wie es gebaut ist, wo alles liegt, wie man die
> Testbatterie ausführt, wie man ein Modul hinzufügt); und das Infrastruktur- und
> Wiederherstellungshandbuch (wie man deployt, wie man zurückrollt, wie man ein Backup
> wiederherstellt, was zu tun ist, wenn es ausfällt; geschrieben für eine Person, die es von
> Hand tun muss, ohne KI, um drei Uhr morgens). Wenn du für einen Abschnitt etwas brauchst, das
> nur das Geschäft weiß (wer wofür verantwortlich ist, welche Telefonnummer anzurufen ist), frag
> mich; lass keine Lücke und erfinde nichts. Jedes Handbuch trägt ein Datum und die
> Systemversion. Antworte in meiner Sprache.

   Du verlangst von ihm die drei Handbücher mit echten Screenshots, das Kriterium der drei Uhr
   morgens für das Wiederherstellungshandbuch, dass er fragt, was nur das Geschäft weiß, statt
   Lücken zu lassen, und Datum und Version.

3. Die echte Probe: gib das Wiederherstellungshandbuch jemandem, der nicht programmiert (dem
   Eigentümer, einem Familienmitglied), und bitte ihn, dem Abschnitt „es ist ausgefallen“ in der
   Testumgebung zu folgen. Wo er hängen bleibt, muss das Handbuch repariert werden.
4. Nach der nächsten Bildschirmänderung prüf, dass der Commit das Benutzerhandbuch angefasst hat.
5. Und jetzt die **Abnahmetests**: der Eigentümer benutzt das ganze System in der Testumgebung,
   mit realistischen Daten, entlang der sechs Flüsse, bevor der erste echte Nutzer hereinkommt. Was
   er findet, sind offene Posten; sind sie geschlossen, ist das System abgenommen.

**Vollständigkeitsprüfung.** Stimmt ein zufälliger Screenshot mit der heutigen Testumgebung
überein? Konnte jemand, der nicht programmiert, dem Abschnitt „es ist ausgefallen“ folgen? Hat der
letzte Commit, der einen Bildschirm geändert hat, das Handbuch angefasst? Hat das Änderungsprotokoll
einen Eintrag für jeden geschlossenen Posten? Gibt es Lücken vom Typ „[ergänzen]“? Sagt jedes
Handbuch, für welche Version es gilt? Hat der Eigentümer die Abnahmetests über alle Flüsse gemacht?

**Ergebnis.** Die drei Handbücher mit Datum und Version, die Probe mit einer Person gemacht, und
die Abnahmetests abgeschlossen.

**Typische Fehler.** Die Handbücher einmal erzeugen und die Routine nicht in die Vereinbarung
setzen: nach zwei Monaten haben sie Screenshots von Bildschirmen, die nicht mehr existieren. Ein
Wiederherstellungshandbuch, das mit „öffne eine Sitzung mit dem Agenten“ beginnt. Und die Probe mit
einer Person nicht machen: sie ist die einzige Prüfung, die zählt.

**Im Leitprojekt.** Das Benutzerhandbuch von Turnera hat sechs Bildschirme mit Screenshot,
zusammengesetzt aus den geschlossenen Posten der drei Blöcke; das Wartungshandbuch erklärt, wo
jedes Modul liegt und wie man die Batterie ausführt; und das Wiederherstellungshandbuch sagt, in
Reihenfolge, mit den Befehlen: wie man erkennt, ob das System ausgefallen ist, wie man es neu
startet, wie man zur vorherigen Version zurückkehrt, wie man die Datenbank aus dem letzten Backup
wiederherstellt (das jede Nacht gemacht wird: auch das kommt aus dieser Lektion), und wen man
anruft. Die Leiterin folgte ihm in der Testumgebung und blieb bei „Datenbank wiederherstellen“
hängen, weil der Befehl einen Ordner voraussetzte, den sie nicht hatte; das Handbuch wurde
repariert.

## Betriebsabschnitt: Lektionen 21 bis 23

Diese drei Lektionen beginnen mit dem ersten Deployment in die Produktion und enden nicht: die
beiden Monitorings werden mit ihm aufgebaut und laufen von da an allein, und die Retrospektive
schließt jede Etappe und kehrt zur 0 für die nächste zurück.

### Lektion 21 — Monitoring von Ressourcen und Leistung, mit zyklischem Bericht

**Was du verstehen musst.** Lektion 19 sagt, wie sich das System an einem Tag verhält; die
Produktion ist jeden Tag, mit wachsenden Daten. *Monitoren* heißt, maschinell und die ganze Zeit
die Nutzung der *Ressourcen* anzusehen (Prozessor, Speicher, Platte, Verbindungen, Kontingent des
Nachrichtenanbieters) und die Antwortzeit jeder Funktion und jeder Abfrage, und zu melden, wenn
etwas aus dem Bereich läuft: über einem *Schwellenwert* (denen aus Lektion 19) oder sehr
verschieden von der *Basislinie* (dem, was es bisher ergeben hat). Ein *Alarm* meldet im Moment;
der *zyklische Bericht* wird jede Woche oder jeden Monat in Ruhe gelesen. Zwei Regeln: ein Alarm,
den niemand liest, ist ein Defekt des Alarms; und ein Schwellenwert wird nicht angehoben, um
einen Alarm zum Schweigen zu bringen, ohne eine gemessene, geschriebene Begründung
[Ref. 37](REFERENCIAS.md#ref-37), [Ref. 39](REFERENCIAS.md#ref-39).

**Bevor du den Prompt schickst**, mit deinen Händen und mit der Eigentümerin:

- `docs/OBSERVABILITY.md` (16), `docs/PERSISTENCE.md` (17) und `docs/PERFORMANCE.md` (19),
  abgeschlossen.
- Der Alarmkanal, mit der Leiterin entschieden: bei wem er ankommt und worüber. Für den Kurs: an
  deine E-Mail und an deinen Messenger.
- Der Zyklus: monatlich für Turnera; wöchentlich, wenn jeden Tag Geld im Spiel wäre.
- Die Abweichung, die du als Alarm ansiehst: 30 % über dem Durchschnitt der letzten vierzehn Tage.
- Nur lesender Zugang des Monitorings zur Produktion, mit dem Zugangsschlüssel außerhalb des
  Chats.

1. Füg ihm den Anfangs-Prompt des Vertrags von Schritt 21 ein, mit dem Kanal, dem Zyklus und der
   Abweichung in den Lücken.
2. Verlang von ihm, absichtlich einen Schwellenwert in der Testumgebung zu überschreiten: der
   Alarm muss über den Kanal bei dir ankommen.
3. Lies den ersten Bericht: jedes Ereignis außerhalb des Bereichs muss eine Ursache oder einen
   Vorschlag haben.

**Bevor du den Prompt schickst** der Routine: der erste Bericht, von dir gelesen.

4. Füg der Vereinbarung die Routine von Schritt 21 hinzu, eingepackt in „Add this routine to
   `docs/WORKING_AGREEMENT.md`:“.

**Vollständigkeitsprüfung.** Ist der provozierte Alarm bei dir angekommen? Hat der Bericht jede
Abweichung mit Ursache oder Vorschlag? Gibt es einen offenen Posten für jede Abweichung, die du
angehen wolltest, mit der Zahl als Kriterium? Ist seit Lektion 19 ein Schwellenwert angehoben
worden, und mit welcher Begründung? Sieht sich der Bericht das Kontingent des
Nachrichtenanbieters an?

**Ergebnis.** Erfassung mit Geschichte, Alarme, der zyklische Bericht, `docs/MONITORING.md`, die
Routine in der Vereinbarung.

**Typische Fehler.** Jeden Tag Alarme, die niemand liest. Drei Berichte hintereinander, die „alles
normal“ sagen. Ein Schwellenwert, der angehoben wurde, „damit er aufhört zu melden“.
Personenbezogene Daten, gespeichert „um zu diagnostizieren“.

**Im Leitprojekt.** Der erste Monatsbericht von Turnera sagt: Platte zu 40 %, Speicher stabil,
die Tagesagenda bei 320 Millisekunden im Median (Basislinie), die Patientensuche ist von 4 auf 9
Millisekunden gestiegen (die Tabelle wächst; im Bereich), und das Nachrichtenkontingent bei 60 %
(Vorschlag: bei 80 % melden). Eine Abweichung: die monatliche Auswertung der Leiterin brauchte am
Ersten 11 Sekunden (Vorschlag: sie nachts vorberechnen; offener Posten).

**Was sich am 19. Oktober 2026 geändert hat (D-039).** Die Messung, die die Dimensionierung neu bestätigt, trägt ihr überprüfbares Fenster: den ersten und den letzten aus der Datenbank gelesenen Datensatz, keine von Hand getippte Zahl. In der Praxis lösten 30.000 Zeilen aus drei Jahren, als ein Jahr übergeben, einen Fehlalarm aus. Ein von Hand getipptes Fenster wird im Bericht als solches markiert und warnt nur.

### Lektion 22 — Fehler-Monitoring und zyklischer Bericht

**Was du verstehen musst.** Ein System in Produktion erzeugt Fehler, die niemand meldet: die
Empfangskraft, die den weißen Bildschirm gesehen und es noch einmal versucht hat, die nächtliche
Aufgabe, die abgebrochen ist. Diese Lektion *erfasst* sie an den drei Orten, an denen sie sich
verstecken (das Backend, die Aufgaben und der Browser), *gruppiert* sie (tausendmal derselbe
Fehler ist ein Eintrag mit einem Zähler), meldet die neuen und die, die wachsen, und erzeugt
einen Bericht mit der *Fehlerrate pro Fluss* (von hundert eingetragenen Terminen, wie viele
fehlgeschlagen sind). Zwei Regeln: kein Fehler ohne offenen Posten, und es gibt keinen „bekannten
Fehler“ ohne einen offenen Posten, der sagt, warum er toleriert wird und bis wann
[Ref. 43](REFERENCIAS.md#ref-43), [Ref. 22](REFERENCIAS.md#ref-22).

**Bevor du den Prompt schickst**, mit deinen Händen:

- `docs/OBSERVABILITY.md` (16): die Fehler kommen schon mit Kennung, Version und Akteur heraus.
- `docs/LOCKS.md` (14): die Fehler in Aktionen mit Konsequenz sind sofortiger Alarm.
- Der Kanal und der Zyklus aus Lektion 21, und die Zahl der Vorkommen pro Stunde eines bekannten
  Fehlers, ab der du einen Alarm willst: für Turnera zehn.
- Wo die Fehler gespeichert werden und wie lange, ohne personenbezogene Daten.

1. Füg ihm den Anfangs-Prompt des Vertrags von Schritt 22 ein, mit dem Kanal, dem Zyklus und der
   Zahl in den Lücken.
2. Provozier selbst einen Fehler im Browser, in der Testumgebung (ein unmögliches Datum im
   Terminformular zum Beispiel): er muss mit deiner Kennung in der Erfassung erscheinen, und der
   Alarm muss bei dir ankommen, wenn er neu ist.

**Bevor du den Prompt schickst** der Routine: der erste Fehlerbericht von dir gelesen, und
`docs/PENDING.md` zur Hand.

3. Füg der Vereinbarung die Routine von Schritt 22 hinzu, eingepackt wie die übrigen.
4. Mit dem ersten Bericht: eröffne die korrektiven offenen Posten der neuen Fehler, jeden mit
   seiner Reproduktion, und schließ sie mit der Routine von Lektion 8 (dem Test, der ihn rot
   reproduziert).

**Vollständigkeitsprüfung.** Ist dein provozierter Fehler in der Erfassung, im Alarm und im
Bericht angekommen? Gibt es einen wiederkehrenden Fehler ohne offenen Posten und ohne Begründung
mit Datum? Hat ein „reparierter“ Fehler aus dem Bericht den roten Test in seinem offenen Posten?
Ist die Fehlerrate pro Fluss da, und mit dem vorigen Zeitraum verglichen? Gibt es
personenbezogene Daten in der Erfassung?

**Ergebnis.** Die zentrale und gruppierte Erfassung, die Alarme, der zyklische Bericht mit der
Rate pro Fluss, `docs/MONITORING.md` vollständig, die Routine in der Vereinbarung, und ein
offener Posten pro Fehler.

**Typische Fehler.** „Null Fehler in einem Monat“ mit echten Nutzern: die Erfassung sieht den
Browser oder die Aufgaben nicht. Ein Fehler mit tausend Vorkommen und dem Kommentar „bekannt,
stört nicht“. Fehler, die sich durch einen Neustart „reparieren“. Und den Fehlerbericht lesen,
ohne ihn mit dem der Ressourcen zu kreuzen: die langsame Abfrage des einen ist der abgelaufene
Timeout des anderen.

**Im Leitprojekt.** Der erste Bericht von Turnera hat drei Fehler: einen im Browser (die Agenda
schlägt fehl, wenn der Name der Fachkraft einen Apostroph hat; 14 Mal; offener Posten, Test in
Rot), einen in der nächtlichen Aufgabe (der Nachrichtenanbieter gab eine Nacht lang einen Fehler
zurück; 1 Mal; offener Posten, um mit Protokollierung erneut zu versuchen), und einen „bekannten“
des Neffen in der monatlichen Tabelle (offener Posten mit Datum: er wird durch den Bericht aus
Lektion R2 in Teil 2 ersetzt). Fehlerrate: 0,3 % bei „Termin eintragen“, 0 % bei den übrigen.

**Was sich am 19. Oktober 2026 geändert hat (D-038).** Die Fehlererfassung trennt nach Quelle: die Fehler des Systems und die der Werkzeuge, die es beobachten (das Panel, der residente Agent, das Monitoring selbst), stehen in getrennten Abschnitten des Berichts, und nur die Fehler des Systems öffnen offene Punkte. In der Praxis öffnete der erste zyklische Bericht sechs "Bugs", die das Werkzeug im Gespräch mit einem abgeschalteten Server waren.

### Lektion 23 — Der Agent im System, und die Retrospektive mit Zahlen

**Was du verstehen musst.** Zwei Dinge schließen den Kreis. Das erste ist optional: den Agenten
resident in der Produktion lassen, mit begrenztem Umfang, um zu diagnostizieren und Support zu
geben, ohne dass du da bist [Ref. 13](REFERENCIAS.md#ref-13). Die Regel, die das ordnet, ist, dass
**er im Namen von jemandem handelt**: sein Zugangsschlüssel ist einer verantwortlichen Person
zugeordnet, und alles, was er tut, wird unter dem Namen dieser Person protokolliert; es ist kein
anonymes Konto, es ist ein Angestellter mit Chef. Das zweite ist verpflichtend: die Retrospektive
mit Zahlen. Was es gekostet hat, wie viele offene Posten, welche Runden gedreht haben, welche
Vorfälle es gab und in welchen Schritt sie fallen, und **mindestens ein vorgeschlagener Wechsel an
der Leiter**. Eine Retrospektive, die nichts ändert, war keine Retrospektive; die, die mich dazu
brachte, ein ganzes Team von Agenten abzuschaffen, ist das Vorbild [Ref. 6](REFERENCIAS.md#ref-6).

**Die Aufgabe (residenter Agent, falls zutreffend).**

**Bevor du den Prompt schickst**, mit deinen Händen und mit dem Eigentümer:

- Die Entscheidung, ob das System einen residenten Agenten braucht, und wofür. In Turnera ja: die
  Empfangskräfte werden Fragen haben („warum ist die Erinnerung bei diesem Patienten nicht
  angekommen?“), die der Agent durch Lesen des Logs beantworten kann, ohne dass jemand den
  Entwickler anruft.
- Eine eigene Zugangsberechtigung für den Agenten in der Produktion, von dir angelegt, einer
  verantwortlichen Person mit Namen zugeordnet, nur lesend für den Anfang, mit dem Wert außerhalb
  des Chats und des Repositorys.
- `docs/LOCKS.md` und `docs/DEPLOYMENT.md` auf dem neuesten Stand, und der Kanal (Ticket, E-Mail),
  über den er meldet, was er nicht lösen kann.

1. Füg ihm ein:

> We are going to leave you resident in production. First, build the map of the system you will
> need in order to operate it: modules, environments, where each configuration lives, which
> actions are consequential (read `docs/LOCKS.md`), whom to notify. If there are parts of the
> system you cannot see from where you are, tell me; the map must not have hidden gaps. Then
> propose your scope in three levels: read-only and diagnosis; configuration changes with my
> approval; consequential actions behind locks. I choose the level. Your credential acts as the
> person who created it: everything you do is logged under that person's name. Reply in my
> language.

> [de]
> Wir werden dich resident in der Produktion lassen. Baue zuerst die Karte des Systems, die du
> brauchen wirst, um es zu betreiben: Module, Umgebungen, wo jede Konfiguration lebt, welche
> Aktionen Konsequenzen haben (lies `docs/LOCKS.md`), wen du benachrichtigen musst. Wenn es Teile
> des Systems gibt, die du von dort, wo du bist, nicht sehen kannst, sag es mir; die Karte darf
> keine versteckten Lücken haben. Schlag dann deinen Umfang in drei Stufen vor: nur lesend und
> Diagnose; Konfigurationsänderungen mit meiner Freigabe; Aktionen mit Konsequenz hinter Sperren.
> Ich wähle die Stufe. Dein Zugangsschlüssel handelt als die Person, die ihn erstellt hat: alles,
> was du tust, wird unter dem Namen dieser Person protokolliert. Antworte in meiner Sprache.

   Du verlangst von ihm die Karte vor dem Betreiben, dass er die Lücken der Karte erklärt, drei
   Umfangsstufen, damit du eine wählst, und den Zugangsschlüssel im Namen einer Person.

2. Wähl die Stufe (zum Anfangen immer die erste: nur lesend und Diagnose).

**Bevor du den Prompt schickst** zum Abschluss: die Karte und die drei Stufen gelesen, die Stufe
gewählt, und eine konkrete Aktion außerhalb dieses Umfangs von dir ausgedacht, damit der Agent sie
versucht und du die Ablehnung im Log siehst.

3. Schließ ab mit:

> Level [1: read-only and diagnosis]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the
> credential (never its value), and the procedure to request my approval. Then prove, with a real
> attempt recorded in the log, that something outside your scope is rejected.

> [de]
> Stufe [1: nur lesend und Diagnose]. Schreib in `docs/RESIDENT_AGENT.md` die Karte, den Umfang,
> den Zugangsschlüssel (nie seinen Wert) und das Verfahren, um meine Freigabe anzufordern.
> Beweise dann, mit einem echten, im Log aufgezeichneten Versuch, dass etwas außerhalb deines
> Umfangs abgelehnt wird.

**Die Aufgabe (Retrospektive, immer).**

**Bevor du den Prompt schickst**, mit deinen Händen:

- Die Zahlen, die nur du hast, in `docs/RETROSPECTIVE_INPUTS.md` oder bereit für den Chat: wie
  viele Stunden du investiert hast (aus deinem Kalender, nicht aus dem Gedächtnis), wie viel du für
  das KI-Werkzeug ausgegeben hast (die Rechnung), wie viel Kontingent an Continuous Integration du
  verbraucht hast, und die Anfangs- und Enddaten.
- Die Liste der Vorfälle, so wie du sie erinnerst, mit ungefährem Datum, um sie mit dem zu
  vergleichen, was der Agent aus den offenen Posten und den Commits zieht.
- `docs/PENDING.md` mit den dokumentierten geschlossenen Posten und `docs/DECISIONS.md`, die die
  Quelle der Zahlen sind.

4. Füg ihm ein:

> [The project] is over. Do the retrospective with numbers, not impressions: what it cost
> (tokens, quota, my time), how many pending items, which ones took the most rounds and why,
> which incidents happened and which step of the ladder each falls into, and which step failed
> or was missing. If you lack the data for any figure (my time, for instance), ask me for it or
> mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder:
> which step is modified, how, and which incident justifies it. Write it to
> `docs/RETROSPECTIVE_[date].md`. Reply in my language.

> [de]
> [Das Projekt] ist vorbei. Mach die Retrospektive mit Zahlen, nicht mit Eindrücken: was es
> gekostet hat (Tokens, Kontingent, meine Zeit), wie viele offene Posten, welche die meisten
> Runden gebraucht haben und warum, welche Vorfälle es gab und in welchen Schritt der Leiter
> jeder fällt, und welcher Schritt versagt hat oder gefehlt hat. Wenn dir für eine Zahl die Daten
> fehlen (meine Zeit zum Beispiel), bitte mich darum oder markiere sie als Schätzung; erfinde sie
> nicht. Schließe mit einem konkreten Vorschlag, die Leiter zu ändern: welcher Schritt geändert
> wird, wie, und welcher Vorfall es rechtfertigt. Schreib es nach `docs/RETROSPECTIVE_[Datum].md`.
> Antworte in meiner Sprache.

   Du verlangst von ihm Zahlen mit Quelle, jeden Vorfall einem Schritt zugeordnet (ein Vorfall,
   der in keinen fällt, ist ein Schritt, der fehlt), dass er dich um die Zahlen bittet, die er
   nicht hat, und einen konkreten Vorschlag, die Leiter zu ändern.

5. Lies den Änderungsvorschlag. Wenn er dir gültig erscheint, schick ihn an das
   [Urazuke-Repository](https://github.com/pkuschnirof/urazuke) als Verbesserungsvorschlag (siehe
   `CONTRIBUTING.md`): das ist die Art, wie die Methode aus jedem Projekt lernt.

**Vollständigkeitsprüfung.** Sagt die Karte, was der Agent NICHT sehen kann? Hast du im Log
gesehen, dass eine Aktion außerhalb des Umfangs abgelehnt wird? Handelt der Zugangsschlüssel im
Namen einer Person? Hat die Retrospektive Zahlen mit Quelle, oder Adjektive? Fällt jeder Vorfall in
einen Schritt? Gibt es mindestens einen konkreten Änderungsvorschlag?

**Ergebnis.** `docs/RESIDENT_AGENT.md` (falls zutreffend) und `docs/RETROSPECTIVE_[Datum].md`.

**Typische Fehler.** Dem residenten Agenten eine hohe Stufe geben, „damit er alles lösen kann“:
fang mit nur lesend an und steig auf, wenn es Belege gibt. Eine Retrospektive, die sagt, dass
alles gut gelaufen ist: es läuft nie alles gut; sie ist für dich geschrieben, nicht für die
Methode. Und den Änderungsvorschlag nicht schicken: Schritt 23 schließt, wenn sich die Leiter
ändert, nicht wenn das Dokument geschrieben wird.

**Im Leitprojekt.** Die Retrospektive von Turnera, in einem typischen Kurs: etwa
vierzig Stunden des Teilnehmers, achtundzwanzig offene Posten, die meisten Runden drehten die der
Nachrichten (Zeitzonen und der WhatsApp-Anbieter); zwei Vorfälle, einer in Schritt 11 (der Zustand
„nicht erschienen“ existierte im Bildschirm und nicht im Server, und auch nicht im semantischen
Baum) und einer in 15 (ein Deployment in die Produktion mit der Testkonfiguration, entdeckt durch
die Ende-zu-Ende-Prüfung nach dem Deployment). Änderungsvorschlag: dass die Deployment-Routine von
Schritt 15 verlangt, die Konfigurationsdifferenz zwischen Test und Produktion vor dem Befördern zu
zeigen, nicht nur „was sich ändert“.

---

## Die Produktionsreife-Liste

Wenn die vierundzwanzig Lektionen gemacht sind, erfüllt das System diese Liste. Sie ist die
betriebliche Definition von „production grade“ in Urazuke, und sie lässt sich als abschließende
Prüfliste verwenden, mit dem Eigentümer, ohne den Code zu öffnen:

1. Es gibt ein Eignungsblatt mit Entscheidung, Datum und Namen (S0).
2. Es gibt eine Arbeitsvereinbarung, die der Agent in jeder Sitzung liest, und es wurde geprüft,
   dass er sie liest (S1, S2).
3. Die Projektdatei lässt sich in fünf Minuten lesen und sagt, was das System NICHT ist; es gibt
   einen vom Eigentümer bestätigten semantischen Baum, und jeder offene Posten hängt an einem
   Knoten (S2).
4. Es gibt eine Dimensionierung mit Primärdaten mit Quelle, abgeleiteten mit Rechnung, und dem
   Szenario „mal zehn“ (S3).
5. Das Skelett wurde im Start leer deployt, mit der Integrations- und Deployment-Kette,
   und das Deployment lief zweimal (S4).
6. Jede Änderung hat ihren offenen Posten mit detaillierter Spezifikation, und jeder geschlossene
   Posten behält seine Spezifikation und seinen Beleg: das ist die Dokumentation des Erledigten
   (S5).
7. Jede Geschäftsregel hat Eigentümer, Datum und wörtliche Worte, im Commit, im offenen Posten und
   im Register (S6).
8. Jede Zahl, die etwas entschieden hat, hat ein Messgerät mit Test, das du ausführen kannst (S7).
9. Jeder wichtige Test wurde rot gesehen, bevor er grün war; jeder Fluss hat seinen
   Ende-zu-Ende-Test, der das Backend vom Bildschirm aus prüft; die vollständige Batterie lief beim
   Abschluss jedes Blocks und vor der Produktion (S8).
10. Die Code-Qualität wird bei jedem Commit maschinell verifiziert, sie ist ein Tor, und die
   Abdeckung ist nie gesunken (S9).
11. Jede Funktionalität hat ihre manuellen Testfälle, für eine Person geschrieben; sie wurden
   beim Abschluss jedes Blocks und bei der Abnahme ausgeführt, mit Datum und Namen; jeder
   Fehlschlag kam als offener Posten zurück (S10).
12. Jede Liste hat einen einzigen Eigentümer; es gibt eine Produzent/Konsument-Karte; es gibt ein
   Register der Anti-Muster mit automatischer Prüfung (S11).
13. Jeder Bericht trennt verifiziert, geglaubt und blinde Flecken (S12).
14. Es gab mindestens ein Audit durch eine andere Sitzung, und seine P0 sind offene Posten (S13).
15. Jede Aktion mit Konsequenz hat eine Sperre mit rotem Test und Rückweg; die Automatisierungen
    sind durch den Trockenlauf gegangen (S14).
16. Die Tests laufen einmal pro Commit; die Konfiguration ist außerhalb des Repositorys; das
    Rollback wurde getestet; kein Geheimnis lebt im Repository oder im Chat ohne Rotation (S15).
17. Die Logs sind strukturiert, mit konfigurierbarem Level ohne Deployment, mit einer Kennung,
    die jeder Aktion vom Bildschirm bis zur Datenbank folgt; die Aktionen mit Konsequenz landen
    in einem unveränderlichen Audit-Log; keine personenbezogenen Daten in den Logs (S16).
18. Die echten Abfragen wurden im erwarteten Volumen gemessen, mit Vorher und Nachher korrigiert,
    und es gibt Budgets mit Test pro kritischem Pfad (S17).
19. Der Schwachstellen-Scan läuft bei jedem Push und mit Zeitplan, er ist ein Tor, und es gibt
    kein offenes P0 (S18).
20. Es gibt einen Lasttest mit Test, gelaufen im erwarteten Volumen und beim „mal zehn“, mit dem
    geschriebenen Bruchpunkt und den daraus abgeleiteten Schwellenwerten (S19).
21. Es gibt drei Handbücher mit Datum und Version, zusammengesetzt aus den geschlossenen Posten;
    eine Person, die nicht programmiert, ist dem Wiederherstellungshandbuch gefolgt; der Eigentümer
    hat die Abnahmetests über alle Flüsse gemacht (S20).
22. Die Ressourcennutzung und die Antwortzeiten werden mit Alarmen und zyklischem Bericht
    überwacht, und jede Abweichung hat eine Ursache oder einen offenen Posten (S21).
23. Die Fehler werden im Backend, in den Aufgaben und im Browser erfasst, gruppiert, pro Zyklus
    mit der Rate pro Fluss berichtet, und keiner bleibt ohne offenen Posten (S22).
24. Es gibt eine Retrospektive mit Zahlen und einen Änderungsvorschlag für die Leiter (S23).

Wenn alle vierundzwanzig „ja“ ergeben, ist das System bereit für die Einführung. Wenn eine „nein“
ergibt, weißt du schon, welchen Schritt du noch einmal erklimmen musst.

---

## Und danach: Teil 2, das geerbte Projekt

Dieser erste Teil lehrt die Methode an einem leeren Ordner, weil das die klarste Art ist, sie zu
lernen. Aber im wirklichen Leben gibt man dir fast nie einen leeren Ordner: man gibt dir ein
System, das schon läuft, und verlangt „reparier das“ oder „bau mir das dazu“. [Teil 2 des
Kurses](MANUAL_CURSO_EVOLUTIVO.md) nimmt dieselbe Praxis in einer anderen Zeitlinie, mit einer
Anwendung, die ihnen ein Neffe in einem Sommer gebaut hat und die niemand ganz versteht, und lehrt
den Normalisierungsabschnitt des [evolutiv-korrektiven Weges](EVOLUTIVO_CORRECTIVO.md): acht
Lektionen, um die Eingaben wiederzugewinnen, die die Methode voraussetzt, den Sicherheitsgurt zu
bauen und die Schuld zu ordnen, und zwei weitere, um den ersten Bug zu korrigieren und die erste
neue Funktionalität mit der vollständigen Methode zu bauen.

## Anhang A — Wie bewertet wird (für den, der den Kurs hält oder sich selbst bewertet)

Eine einfache Rubrik, pro Lektion, mit drei Stufen:

- **Nicht erklommen**: das Ergebnis fehlt, oder eine Vollständigkeitsprüfung ergibt „nein“.
- **Erklommen**: das Ergebnis existiert und alle Prüfungen ergeben „ja“.
- **Erklommen mit Beleg des Urteilsvermögens**: zusätzlich kann der Teilnehmer einen Fall
  erzählen, in dem der Agent in dieser Lektion etwas falsch gemacht hat (angenommen, erfunden, zu
  viel berichtet) und wie er es entdeckt hat. Das ist das eigentliche Ziel des Kurses: nicht das
  Artefakt, sondern der Reflex.

Was nicht bewertet wird: die Qualität des Codes. Niemand liest ihn. Bewertet wird die Qualität des
Belegs.

## Anhang B — Anpassung des Kurses an jedes Werkzeug

Die Prompts sind in jedem Werkzeug dieselben. Was sich ändert, ist, wohin die Routinen gehen, die
im Kurs zu `docs/WORKING_AGREEMENT.md` hinzugefügt werden:

- In **Claude Code** gehen die Routinen in die `CLAUDE.md` des Projekts (oder die Vereinbarung
  wird von dort eingebunden), und sie werden in jeder Sitzung von allein gelesen.
- In **Cursor** gehen sie nach `.cursor/rules/`, als immer aktive Regeln.
- In **Codex CLI** oder **Gemini CLI** in `AGENTS.md` oder `GEMINI.md` im Wurzelverzeichnis.
- In **Forge** sind die Vereinbarung und die Routinen Doktrinen, die Schritt-Prompts werden beim
  Durchschreiten jedes Tors von allein injiziert, das Register der offenen Posten ist nativ, und
  der semantische Baum ist der Wissensgraph des Projekts. Der Kurs mit Forge ist derselbe Kurs mit
  weniger Kopieren und Einfügen.

Die Leseprobe von Lektion 2 gilt für alle: wenn eine neue Sitzung nicht weiß, was das System NICHT
tut, lädt das Werkzeug die Datei nicht, in die du die Vereinbarung gelegt hast.

## Anhang C — Was dieses Handbuch noch nicht hat

- Eine Kohorte, die es durchlaufen hat. Die Reihenfolge der Etappen, die typischen Fehler und das
  Leitprojekt sind aus meinen drei Systemen geschrieben, nicht aus Teilnehmern. Die erste Kohorte
  wird sie korrigieren (und das ist, wörtlich, Schritt 23 angewandt auf den Kurs).
- Die Gewichte der Eignungskriterien (Lektion 0), die ich kalibriere.
- Ein vollständiges Beispiel von `docs/PENDING.md` des Leitprojekts, mit den achtundzwanzig
  spezifizierten und geschlossenen offenen Posten, damit ein Teilnehmer sieht, wie die
  Dokumentation des Erledigten am Ende eines Projekts aussieht.
