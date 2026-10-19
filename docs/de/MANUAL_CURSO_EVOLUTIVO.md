# Urazuke — der Kurs, Teil 2: das geerbte Projekt. Ein System normalisieren, das nicht mit der Methode geboren wurde, und es danach weiterentwickeln

Autor: Pablo Kuschniroff, unterstützt von Claude Code. Version 1, 18. Oktober 2026. Das ist der
zweite Teil des [Kurshandbuchs](MANUAL_CURSO.md): er setzt voraus, dass du den ersten gemacht
hast, oder zumindest, dass du die Lektionen 0 bis 8 gelesen hast, denn hier erkläre ich nicht noch
einmal, was ein offener Posten, ein roter Test oder ein semantischer Baum ist. Die Methode dieses
Teils steht auf der Seite des [evolutiv-korrektiven Weges](EVOLUTIVO_CORRECTIVO.md); hier steht
die Praxis, mit einem zweiten Leitprojekt. Die seltsamen Wörter stehen im Glossar des
Hauptdokuments; die realen Fälle in den [Referenzen](REFERENCIAS.md). Öffentliches Repository:
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## Bevor es losgeht

### Für wen dieser Teil ist

Für den, der den ersten Teil gemacht und dabei entdeckt hat, dass man ihm im wirklichen Leben fast
nie einen leeren Ordner gibt. Man gibt ihm ein System, das schon läuft, mit Nutzern, die davon
abhängen, und verlangt „reparier das“ oder „bau mir das dazu“. Und auch für den, der vor ein paar
Monaten etwas „gevibecodet“ hat, es funktionierte, und der jetzt darauf weiterbauen muss, ohne
dass es ihm zusammenbricht. Beide stehen am selben Ort: vor einem Altsystem, auch wenn einer von
beiden es selbst geschrieben hat.

### Was du am Ende haben wirst

Dasselbe System, das du geerbt hast, das dasselbe tut, was es vorher tat, aber mit allem
drumherum, was die Methode voraussetzt: eine Arbeitsvereinbarung mit den Regeln des Altsystems,
die wiedergewonnene Karte des Systems mit den Marken, woher jede Behauptung stammt, die Liste der
Diskrepanzen zwischen dem, was der Code tut, und dem, was das Geschäft glaubt, ein in ein Backlog
mit Geschwindigkeitsmarken verwandeltes Audit, eine Testumgebung mit anonymisierten Daten, ein
Deployment, das sich wiederholt, die Geheimnisse außerhalb des Codes und rotiert, eine
Charakterisierungsbatterie, die die kritischen Flüsse bewacht, Sperren auf dem, was schon auf die
Welt wirkt, die Dimensionierung mit gemessenen Zahlen, und ein Backlog, in dem die Schuld und die
Anfrage des Kunden zusammenleben, nach Modul gepaart. Und danach der erste Bug, korrigiert mit
seinem roten Test, und die erste neue Funktionalität, gebaut mit der vollständigen Methode.

### Die Reihenfolge dieses Teils

| Etappe | Lektionen | Was du zusätzlich machst |
|---|---|---|
| 1 | N0, N1, N2, N3 | **Lesen.** Nichts wird geändert. Du gehst den wiedergewonnenen Baum mit dem Eigentümer durch, entscheidest die Diskrepanzen eine nach der anderen, liest das Audit. Zum Abschluss: die Karte und das Inventar der Schuld. |
| 2 | N4, N5 | **Der Gurt.** Testumgebung mit anonymisierten Daten, Deployment zweimal, rotierte Geheimnisse, Charakterisierungsbatterie mit ihrem Rot durch Mutation. Bestätigte Sperren auf dem, was schon wirkt. Zum Abschluss: das System läuft im Test und die Batterie ist grün. |
| 3 | N6, N7, R1 | **Messen, ordnen, korrigieren.** Gemessene Dimensionierung. Das Backlog mit den zwei Marken. Der erste Block: der bekannte Bug, im korrektiven Modus geschlossen, mit seinen gepaarten Posten. |
| 4 | R2 | **Weiterentwickeln.** Der zweite Block: die neue Funktionalität, gebaut mit der vollständigen Methode (Lektionen 5 bis 12 des ersten Teils), mit der Charakterisierung als Regression. |
| 5 und 6 | 13, 14, 15, 20, 16, 17, 18, 19 des ersten Teils | **Produktionsfreigabe.** Periodisches Audit, restliche Sperren, Abschluss des Weges in die Produktion, die drei Handbücher (die das Altsystem nicht hatte), und die vier Schritte der Betriebsqualität vor dem Deployment: vollständige Beobachtbarkeit, Persistenz mit dem, was N6 gemessen hat, Schwachstellen-Scan als Tor, Lasttest mit dem Bruchpunkt. |
| 7 | 23, 21, 22 des ersten Teils | **Betrieb.** Die beiden Monitorings, aufgebaut mit dem Deployment, mit der ersten Lesung als Basislinie des Altsystems; residenter Agent; Retrospektive mit der dem Altsystem eigenen Frage: wie viel das Normalisieren gekostet hat. |

### Das Leitprojekt: „Geerbte Turnera“

Es ist dieselbe Praxis wie im ersten Teil, zwei Jahre später und in einer anderen Zeitlinie: sie
haben Turnera nie mit der Methode gebaut. Stattdessen hat ihnen der Neffe der Leiterin in einem
Sommer eine Webanwendung gebaut, „Turnos“, die seitdem funktioniert. Heute benutzen sie zwei
Empfangskräfte und drei Fachkräfte jeden Tag, es sind etwa zwanzigtausend Termine erfasst, und
niemand versteht sie ganz: der Neffe ist ins Ausland gezogen und antwortet alle zwei Wochen auf
eine Nachricht.

**Was es gibt.** Ein Repository auf GitHub mit dem Code (ein einziger Branch, Commits mit
Nachrichten wie „Korrekturen“), eine Datenbank auf demselben Server, auf dem die Anwendung läuft,
das Deployment von Hand durch Kopieren der Dateien per FTP, das Passwort der Datenbank im Code
geschrieben, keine Tests, einen auf dem Server geplanten Prozess, der die Erinnerungen jede Nacht
verschickt, und eine Tabelle, die die Leiterin jeden Monat herunterlädt, indem sie sich mit einem
Desktop-Werkzeug mit der Datenbank verbindet. Es gibt eine „automatische“ Sicherungskopie, die nie
jemand wiederhergestellt hat.

**Was weh tut.** Zwei Dinge. Erstens ein Bug: manchmal bekommt ein Patient die Erinnerung zweimal
und manchmal gar nicht; die Leiterin weiß nicht, wann das passiert, aber sie hat Screenshots von
Patienten, die sich beschweren. Zweitens das, was fehlt: sie wollen für bestimmte Termine eine
Anzahlung per Zahlungslink verlangen, und sie wollen sehen, wie viele Termine, Ausfälle und
Absagen es im Monat gab, ohne die Tabelle herunterzuladen.

**Die Eigentümerin.** Dieselbe Leiterin: Urteilsvermögen über das Geschäft, fünfzehn Minuten am
Tag, liest keinen Code. Und eine Neuigkeit, die zählt: sie glaubt, dass das System Dinge tut, die
es nicht tut, und sie weiß nichts von Dingen, die das System sehr wohl tut. Das ist in einem
Altsystem normal, und es ist das, was die Lektion N2 ans Licht bringen wird.

**Die kritischen Flüsse**, in ihren Worten: „ich trage einen Termin ein“, „ich sage einen Termin
ab“, „die Erinnerung kommt an“, „ich suche einen Patienten“, „ich lade die Monatstabelle
herunter“. Es sind fünf; sie werden die Charakterisierungsbatterie sein.

Damit reicht es. Alles Weitere steht im System, und es ist der Agent, der es lesen wird.

---

## Normalisierungsabschnitt: Lektionen N0 bis N7

Diese acht Lektionen sind der Abschnitt, den der erste Teil nicht hatte. Die ersten vier sind
Lesen: nichts wird geändert, und die Versuchung, etwas zu ändern, wird enorm sein. Die zwei
folgenden bauen den Gurt. Die zwei letzten messen und ordnen. Erst danach wird Funktionalität
angefasst.

### Lektion N0 — Eignung eines bestehenden Systems: Voraussetzungen, die der Agent durch Tun verifiziert

**Was du verstehen musst.** In Lektion 0 beantwortete die Erhebung die Kriterien. Hier gibt es ein
System, und also lassen sich die Kriterien **durch Tun verifizieren**, vom Agenten, ohne dass
jemand eine Meinung abgibt: Kann er eine vollständige Umgebung mit Quellen, Daten und Persistenz
aufbauen? Kann er den Code verstehen? Kann er allein aus dem Code ein Dokument schreiben, das die
ganze Funktionalität beschreibt und das die Leiterin als ihr System wiedererkennt? Kann er die
Bildschirme mit einem Testwerkzeug bedienen und einen Ende-zu-Ende-Test laufen lassen? Lässt es
sich mit heutigen Werkzeugen bauen? Lassen sich die Daten kopieren und anonymisieren, und gibt es
ein Backup, das wiederhergestellt wurde? Haben die Integrationen einen Testmodus? Es sind sieben
Voraussetzungen, und die neue Regel lautet: ein Rot ist kein „geht nicht“, es ist ein
**Vorprojekt**, mit eigenem Umfang, damit das System geeignet wird.

**Bevor du den Prompt schickst**, mit deinen Händen:

- `docs/INITIAL_SURVEY.md`, kurz: was Turnos tut und für wen, laut der Leiterin, was weh tut (die
  doppelte Erinnerung, das, was fehlt), wer es gemacht hat und wie lange er zum Antworten braucht,
  wo es läuft, wer Zugang hat, und dass es ein „automatisches“ Backup gibt, das nie jemand
  wiederhergestellt hat. Eine halbe Seite.
- `docs/ELIGIBILITY_CRITERIA.md`: das Blatt aus Lektion 0 plus die sieben Voraussetzungen des
  Altsystems (kopier sie von der Seite des evolutiv-korrektiven Weges, Station N0), mit drei
  leeren Spalten: grün oder rot, Beleg, Vorprojekt.
- Lesezugang zum Repository, eine Kopie der Datenbank (oder nur lesend die Produktion) und ein
  Ort, an dem der Agent versuchen kann, das System hochzufahren (deine Maschine reicht für den
  Kurs), mit den Zugangsdaten außerhalb des Chats.

1. Füg ihm den anfänglichen Prompt der Station N0 ein (auf der Seite des evolutiv-korrektiven
   Weges), genau so.
2. Es wird dauern: er muss die Umgebung aufbauen, alles lesen, `docs/FUNCTIONALITY_RECOVERED.md`
   schreiben und einen Test laufen lassen. Wenn er fertig ist, lies dieses Dokument mit der
   Leiterin: beschreibt es das System, das sie zu haben glaubt? Was nicht übereinstimmt, notier
   es: das ist die erste Liste der Diskrepanzen.
3. Sieh dir das Blatt an: jede Voraussetzung muss einen Beleg für etwas haben, das der Agent
   getan hat, nicht eine Antwort von dir.

**Bevor du den Prompt schickst** zum Abschluss: deine Entscheidung in einer Zeile und, für jedes
Rot, ob das Vorprojekt jetzt, später oder nie angegangen wird.

4. Füg ihm den Abschluss-Prompt der Station N0 ein.

**Vollständigkeitsprüfung.** Hat jede Voraussetzung einen getanen, nicht einen gesagten Beleg?
Existiert das Dokument der wiedergewonnenen Funktionalität, und hat die Leiterin es
wiedererkannt? Hat er einen echten Ende-zu-Ende-Test laufen lassen? Hat jedes Rot sein Vorprojekt
als blockierenden offenen Posten?

**Ergebnis.** `docs/ELIGIBILITY.md`, `docs/FUNCTIONALITY_RECOVERED.md`, und die blockierenden
offenen Posten der Vorprojekte, falls es welche gibt.

**Typische Fehler.** Ein Grün akzeptieren, das der Agent geantwortet hat, ohne es zu tun („ja, der
Code ist verständlich“). Und ein Rot als Ablehnung behandeln: die Methode verlangt ein Vorprojekt,
keinen Verzicht.

**Im Leitprojekt.** Der Agent baut Turnos auf deiner Maschine mit einer Kopie der Datenbank auf
(grün), versteht den Code bis auf ein Berichtsmodul in einer alten Vorlagensprache (grün, mit
Notiz), schreibt das Funktionalitätsdokument, und die Leiterin entdeckt darin zwei Dinge, von
denen sie nicht wusste, dass das System sie tut (grün: das Dokument ist besser als ihr
Gedächtnis), bedient vier von sechs Bildschirmen und lässt einen Test des Eintragungsflusses
laufen (rot: zwei Bildschirme nicht bedienbar, Vorprojekt: „den Kalender und die Suche bedienbar
machen“), baut mit den heutigen Werkzeugen bis auf eine tote Abhängigkeit des PDF-Generators (rot:
kleines Vorprojekt), kopiert und anonymisiert die Daten (grün), aber das Backup wurde nie
wiederhergestellt (rot: es wiederherzustellen ist das billigste Vorprojekt von allen), und der
Nachrichtenanbieter hat einen Testmodus (grün). Entscheidung: es geht, nach drei kleinen
Vorprojekten.

### Lektion N1 — Die Arbeitsvereinbarung für ein Altsystem

**Was du verstehen musst.** Zu den sechs Regeln aus Lektion 1 kommen fünf hinzu, die es gibt, weil
ein Modell vor fremdem Code drei Dinge reflexhaft tut: es ordnet ihn um, es „repariert“ ihn dort,
wo er ihm falsch erscheint, und es nimmt an, dass das, was der Code anders tut, als es selbst
erwarten würde, ein Fehler ist. Die Regeln des Altsystems blockieren diese Reflexe: es wird nicht
refaktoriert, was nicht verlangt wurde, es wird gelesen, bevor angefasst wird, das Seltsame wird
notiert statt repariert, das aktuelle Verhalten ist die Spezifikation, bis der Eigentümer etwas
anderes sagt, und nichts tritt ein ohne grüne Charakterisierung.

**Bevor du den Prompt schickst**, mit deinen Händen:

- Deine Arbeitsvorlieben, wie in Lektion 1, und eine Entscheidung mehr: wie viel Risiko du während
  der Normalisierung akzeptierst. Für den Kurs: der Agent darf allein in die Testumgebung
  deployen; in die Produktion niemals, bis zur Lektion 15.
- `docs/ELIGIBILITY.md` abgeschlossen.

1. Füg ihm diesen Prompt ein:

> Before we touch anything, we are going to set the working agreement between you and me for a
> system that already exists and has users. Write `docs/WORKING_AGREEMENT.md` with the six rules
> of the method (my time is sacred; zero technical debt; exact scope; documentation in the same
> commit; never report as done what you have not verified; speak my language), each with one line
> explaining what it prevents, and these five rules for an inherited system: (7) Nothing is
> refactored that was not asked for, and no module is rewritten. (8) Code you do not understand
> is read before it is touched, and what you learn goes into the system map. (9) Anything strange
> you find (a secret in the code, a dead path, a duplicated rule, a query without an index) is
> logged as a pending item with its evidence, never fixed in passing. (10) Current behaviour is
> the specification until the owner says otherwise: a difference between what the code does and
> what the business says is a discrepancy for me to decide, not a bug for you to fix silently.
> (11) No change reaches the test environment without the characterization suite green. Add any
> rules you think this system needs, marked as proposals. If you need to know something about how
> I work in order to write this, ask me.

> [de]
> Bevor wir irgendetwas anfassen, werden wir die Arbeitsvereinbarung zwischen dir und mir für ein
> System festlegen, das schon existiert und Nutzer hat. Schreibe `docs/WORKING_AGREEMENT.md` mit
> den sechs Regeln der Methode (meine Zeit ist heilig; null technische Schuld; exakter Umfang;
> Dokumentation im selben Commit; nie als erledigt melden, was du nicht verifiziert hast; sprich
> meine Sprache), jede mit einer Zeile, die erklärt, was sie verhindert, und diesen fünf Regeln
> für ein geerbtes System: (7) Es wird nichts refaktoriert, was nicht verlangt wurde, und kein
> Modul wird neu geschrieben. (8) Code, den du nicht verstehst, wird gelesen, bevor er angefasst
> wird, und was du lernst, kommt in die Karte des Systems. (9) Alles Seltsame, was du findest (ein
> Geheimnis im Code, ein toter Pfad, eine doppelte Regel, eine Abfrage ohne Index), wird als
> offener Posten mit seinem Beleg notiert, nie nebenbei repariert. (10) Das aktuelle Verhalten ist
> die Spezifikation, bis der Eigentümer etwas anderes sagt: ein Unterschied zwischen dem, was der
> Code tut, und dem, was das Geschäft sagt, ist eine Diskrepanz, die ich entscheide, kein Bug, den
> du still reparierst. (11) Keine Änderung erreicht die Testumgebung ohne grüne
> Charakterisierungsbatterie. Füg die Regeln hinzu, die dieses System deiner Meinung nach braucht,
> als Vorschläge markiert. Wenn du etwas darüber wissen musst, wie ich arbeite, um das zu
> schreiben, frag mich.

2. Lies die Vorschläge. Wenn einer sagt „den Code modernisieren, während er angefasst wird“, lehn
   ihn mit Begründung ab: das ist die verkleidete Neuschreibung.

**Bevor du den Prompt schickst** zum Abschluss: dein Urteil über jeden Vorschlag, mit einer Zeile
Begründung, für die Lücken des Prompts.

3. Schließ mit dem Abschluss-Prompt aus Lektion 1 ab, unverändert.

**Vollständigkeitsprüfung.** Stehen die elf Regeln da, jede mit dem Fehler, den sie verhindert?
Gibt es einen Vorschlag, der Refaktorieren oder Neuschreiben erlaubt?

**Ergebnis.** `docs/WORKING_AGREEMENT.md` mit Datum und Version.

**Typische Fehler.** Eine Regel der „fortschreitenden Säuberung“ annehmen, weil sie vernünftig
klingt. Sie klingt vernünftig und ist die Art, wie sich der Agent selbst erlaubt zu ändern, was
man nicht von ihm verlangt hat.

**Im Leitprojekt.** Der Agent schlägt zwei eigene Regeln vor, die es lohnt anzunehmen: „in diesem
System verlässt kein echter Versand die Testumgebung: die Erinnerungen gehen im Test in einen
falschen Posteingang“, und „die Monatstabelle, die die Leiterin herunterlädt, ist ein Konsument
des Systems und zählt als Vertrag“. Die zweite ist die Produzenten-Konsumenten-Karte, die
vorzeitig auftaucht, und das ist gut so.

### Lektion N2 — Das Lesen des Systems: die wiedergewonnene Karte und die Diskrepanzen

**Was du verstehen musst.** Es ist die Lektion, die pro Stunde den meisten Wert des ganzen Kurses
bringt. In Lektion 2 kamen die Projektdatei und der Baum aus der Erhebung; hier kommen sie aus dem
System selbst, und jede Behauptung trägt eine Marke, woher sie stammt: `[Code]`, `[Datenbank]`,
`[Konfiguration]`, `[Dokumentation]`, `[Geschäft]` oder `[erschlossen]`. Die Marken sind das, was
dir erlaubt, ohne Code zu lesen zu prüfen: du schaust dir das Erschlossene an und bestätigst oder
korrigierst es. Und es taucht ein neues Dokument auf, die Liste der Diskrepanzen: alles, was
zwischen dem, was der Code tut, dem, was die Datenbank erzwingt, und dem, was das Geschäft glaubt,
nicht übereinstimmt. Sie lösen sich nicht von allein: jede ist eine Entscheidung von dir mit
Datum. Ein Altsystem hat immer Diskrepanzen; wenn die Liste leer herauskommt, hat der Agent nicht
verglichen.

**Bevor du den Prompt schickst**, mit deinen Händen und mit dem Eigentümer:

- Lesezugang für den Agenten zu allem: das ganze Repository, das Schema der Datenbank (nur lesend,
  Zugangsdaten außerhalb des Chats), die Konfiguration des Servers mit den Werten der Geheimnisse
  verdeckt, die aktuellen Logs, und was es an Dokumentation gibt (in Turnos eine E-Mail des Neffen
  mit „wie man Änderungen hochlädt“).
- In `docs/INITIAL_SURVEY.md` einen neuen Abschnitt, mit der Leiterin geschrieben: **was sie
  glaubt, dass das System tut**, Anwendungsfall für Anwendungsfall, und die Regeln, an die sie
  sich erinnert („ein Termin kann nicht weniger als zwei Stunden vorher abgesagt werden“, „die
  Erinnerung geht um acht Uhr abends raus“). Prüf es nicht gegen das System: dieser Vergleich ist
  die Arbeit des Agenten.
- Die Liste von dem, was außerhalb des Repositorys lebt: der geplante Prozess der Erinnerungen und
  die Monatstabelle, die sich mit der Datenbank verbindet.
- `docs/WORKING_AGREEMENT.md` abgeschlossen.

1. Füg ihm diesen Prompt ein:

> We are going to recover the map of this system from what exists. Read the whole repository
> (every branch), the database schema (read-only), the configuration of each environment, the
> recent logs and whatever documentation there is; if some part cannot be read from where you are,
> tell me and mark it as a gap; do not fill it by guessing. Then write three things. First,
> complete `docs/INITIAL_SURVEY.md` in the form the method expects (what the system does and for
> whom; what it does NOT do; who uses it; the technology; the environments; what an error costs),
> with every statement tagged by its source: [code], [database], [configuration], [documentation],
> [business] for what the survey already says, or [inferred]. Second, `PROJECT.md`, three hundred
> lines at most, and `docs/SEMANTIC_TREE.md`: the domains and, under each one, the actors, the
> processes (each with trigger, steps, outcome and exceptions as the code actually implements
> them), the entities with the attributes, states and transitions the database and the code
> enforce, the screens, the external integrations and the scheduled jobs; every node tagged the
> same way. Third, `docs/DISCREPANCIES.md`: everything where the code, the database, the
> documentation and what the business says in the survey do not agree, with the evidence on each
> side. Do not resolve any discrepancy and do not fix anything: list them. Create `docs/STATUS.md`
> for the living state. Reply in my language.

> [de]
> Wir werden die Karte dieses Systems aus dem wiedergewinnen, was existiert. Lies das ganze
> Repository (alle Branches), das Schema der Datenbank (nur lesend), die Konfiguration jeder
> Umgebung, die aktuellen Logs und die Dokumentation, die es gibt; wenn sich ein Teil von dort
> aus, wo du bist, nicht lesen lässt, sag es mir und markiere ihn als Lücke; füll sie nicht durch
> Raten. Schreibe dann drei Dinge. Erstens, vervollständige `docs/INITIAL_SURVEY.md` in der Form,
> die die Methode erwartet (was das System tut und für wen; was es NICHT tut; wer es benutzt; die
> Technologie; die Umgebungen; was ein Fehler kostet), mit jeder Behauptung nach ihrer Quelle
> markiert: [Code], [Datenbank], [Konfiguration], [Dokumentation], [Geschäft] für das, was die
> Erhebung schon sagt, oder [erschlossen]. Zweitens, `PROJECT.md`, höchstens dreihundert Zeilen,
> und `docs/SEMANTIC_TREE.md`: die Domänen und unter jeder die Akteure, die Prozesse (jeder mit
> Auslöser, Schritten, Ergebnis und Ausnahmen, so wie der Code sie tatsächlich umsetzt), die
> Entitäten mit den Attributen, Zuständen und Übergängen, die die Datenbank und der Code
> erzwingen, die Bildschirme, die externen Integrationen und die geplanten Jobs; jeder Knoten auf
> dieselbe Weise markiert. Drittens, `docs/DISCREPANCIES.md`: alles, worin der Code, die
> Datenbank, die Dokumentation und das, was das Geschäft in der Erhebung sagt, nicht
> übereinstimmen, mit dem Beleg auf jeder Seite. Löse keine Diskrepanz und repariere nichts: liste
> sie auf. Lege `docs/STATUS.md` für den lebendigen Stand an. Antworte in meiner Sprache.

   Du verlangst von ihm, dass er alles liest und erklärt, was er nicht lesen konnte, die Erhebung
   und den Baum mit Marken, die Prozesse so, wie der Code sie umsetzt (nicht wie sie sein
   sollten), die geplanten Prozesse, und die Diskrepanzen ungelöst aufgelistet.

2. Geh den Baum mit der Leiterin durch, Knoten für Knoten. Jedes `[erschlossen]` wird bestätigt
   oder korrigiert. Jedes `[Code]` wird mit dem verglichen, was sie glaubt: wo es nicht
   übereinstimmt, gibt es eine Diskrepanz, die der Agent vielleicht schon aufgelistet hat, und
   wenn er sie nicht aufgelistet hat, fügst du sie hinzu.
3. Entscheide jede Diskrepanz mit ihr, in einer Zeile, mit dem Datum. Es gibt drei mögliche
   Antworten: „das System ist richtig, das Geschäft hatte es vergessen“ (wird als Regel
   bestätigt), „das System ist falsch, es muss geändert werden“ (es wird ein offener Posten
   eröffnet), oder „ich weiß nicht, das sehen wir später“ (bleibt offen mit Datum; nicht zu viele
   davon).

**Bevor du den Prompt schickst** zum Abschluss: die Liste der bestätigten und der korrigierten
Knoten, und die Liste der Diskrepanzen mit deiner Entscheidung und dem Datum, eine Zeile je.

4. Schließ ab mit:

> I confirm these nodes: [list]. Correct these: [list]. The discrepancies are decided as follows:
> [one line each: discrepancy, my decision, today's date]. Finalize `docs/INITIAL_SURVEY.md`,
> `PROJECT.md` and `docs/SEMANTIC_TREE.md` with today's date, keeping the source tags. Write each
> discrepancy decision in `docs/DECISIONS.md` with my exact words, and open a pending item in
> `docs/PENDING.md` for every discrepancy where I decided the system must change; for the ones
> where I decided the current behaviour stays, write it next to the node as a confirmed rule. Add
> to `PROJECT.md` the instruction to read this file, the tree and the working agreement at the
> start of every session.

> [de]
> Ich bestätige diese Knoten: [Liste]. Korrigiere diese: [Liste]. Die Diskrepanzen werden so
> entschieden: [eine Zeile je: Diskrepanz, meine Entscheidung, das heutige Datum]. Schließ
> `docs/INITIAL_SURVEY.md`, `PROJECT.md` und `docs/SEMANTIC_TREE.md` mit dem heutigen Datum ab und
> behalte die Quellenmarken bei. Schreibe jede Entscheidung über eine Diskrepanz in
> `docs/DECISIONS.md` mit meinen exakten Worten, und eröffne einen offenen Posten in
> `docs/PENDING.md` für jede Diskrepanz, bei der ich entschieden habe, dass das System sich ändern
> muss; bei denen, wo ich entschieden habe, dass das aktuelle Verhalten bleibt, schreib es neben
> den Knoten als bestätigte Regel. Füg `PROJECT.md` die Anweisung hinzu, diese Datei, den Baum und
> die Arbeitsvereinbarung zu Beginn jeder Sitzung zu lesen.

5. **Die Leseprobe**, wie in Lektion 2: neue Sitzung, ohne Kontext, „was tut dieses System NICHT?
   welcher Prozess läuft nachts allein?“. Er muss mit der Karte antworten.

**Vollständigkeitsprüfung.** Gibt es Knoten mit der Marke `[erschlossen]`? (Wenn es keinen gibt,
unterscheidet der Agent nicht zwischen dem, was er gelesen, und dem, was er angenommen hat.) Gibt
es mindestens einen geplanten Prozess im Baum? Hat die Liste der Diskrepanzen mehr als null
Einträge? Hat jede eine Entscheidung mit Datum oder ist sie absichtlich offen geblieben? Haben die
Marken den Abschluss überlebt? Hat er die Leseprobe bestanden?

**Ergebnis.** `docs/INITIAL_SURVEY.md` vollständig mit Marken, `PROJECT.md`,
`docs/SEMANTIC_TREE.md`, `docs/DISCREPANCIES.md` entschieden, `docs/DECISIONS.md` mit den
Entscheidungen, `docs/STATUS.md`.

**Typische Fehler.** Die Diskrepanzen lösen, indem „der Code so repariert wird, dass er tut, was
die Leiterin sagt“, ohne sie eine nach der anderen zu entscheiden: mehrere dieser Diskrepanzen
sind Regeln, die das Geschäft vergessen und der Code erinnert hat. Und zulassen, dass der Agent
die Marken beim Abschließen löscht, „damit es sauberer aussieht“: ein Baum ohne Marken lässt sich
nicht mehr prüfen.

**Im Leitprojekt.** Der Baum von Turnos hat die Domäne Agenda, die die Leiterin erwartet hat, und
zwei Dinge, die sie nicht erwartet hat: einen Terminzustand „verschoben“, der in der Datenbank
existiert und den kein Bildschirm anzeigt `[Datenbank]`, und einen geplanten Prozess, der
zusätzlich zum Versenden von Erinnerungen die abgesagten Termine löscht, die älter als ein Jahr
sind `[Code]`; die Leiterin wusste nicht, dass sie gelöscht werden. Die typischen Diskrepanzen
sind acht: die Zwei-Stunden-Regel für das Absagen existiert im Code nicht (es wird immer
abgesagt); die Erinnerung geht ihr zufolge um acht Uhr raus und laut Konfiguration um sieben; die
Telefonnummer des Patienten ist in der Datenbank nicht verpflichtend, obwohl sie glaubt, dass sie
es ist; und so weiter. Die mit dem Löschen überrascht sie am meisten, und sie entscheidet sie in
einer Minute: „das wird nicht mehr gelöscht“. Offener Posten.

### Lektion N3 — Das Audit als Inventar der Schuld

**Was du verstehen musst.** Die Lektion 13, aber am Anfang statt am Ende, und mit einem Feld mehr
pro Befund: ob er blockiert (er muss vor jeder Änderung behoben werden), ob er beim Anfassen des
Moduls bezahlt wird, oder ob er warten kann. Ohne dieses Feld hat ein auditiertes Altsystem
vierzig Befunde und niemand weiß, womit er anfangen soll. Was blockiert, entscheidest du, nicht
der Auditor: im Allgemeinen ein offengelegtes Geheimnis, ein Bildschirm, der sich nicht bedienen
lässt, ein Deployment, das sich nicht wiederholen lässt, das Fehlen eines Backups, und was Daten
beschädigen oder zu viel abbuchen kann.

**Bevor du den Prompt schickst**, mit deinen Händen:

- Eine neue Sitzung des Agenten, mit einem sauberen Klon und einer Anweisungsdatei, die sagt „du
  bist ein Auditor; du hast dieses System nicht gelesen und wirst es nicht anfassen“. Nur lesender
  Zugang zur Datenbank und zum Server.
- `PROJECT.md`, `docs/SEMANTIC_TREE.md` und `docs/DISCREPANCIES.md` aus N2, damit er nicht
  wiederentdeckt, was geschrieben steht.
- Dein Kriterium dafür, was blockiert, in zwei Zeilen, für die Lücke des Prompts. Für Turnos:
  offengelegtes Geheimnis, nicht bedienbarer Bildschirm, nicht wiederholbares Deployment, kein
  erprobtes Backup, alles, was ohne Kontrolle löscht oder versendet.

1. Füg ihm diesen Prompt ein:

> Audit this system for integrity, security, performance, code quality and deployability, as the
> inventory of what must be normalized before and during its evolution. Read-only: change nothing
> except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires access you
> lack (the database, the logs, the server), tell me and mark that part as not audited; do not
> pass it as fine. Go through all of the code, not a sample, and read `docs/SEMANTIC_TREE.md` and
> `docs/DISCREPANCIES.md` first so that you do not report what is already known. For every
> finding: where it is (file and line), the risk, the evidence that proves it (the command, the
> query, the number), its priority (P0 must be fixed now, P1 soon, P2 when possible), and one more
> field: whether it BLOCKS (must be fixed before any change, by my criteria: [an exposed secret, a
> screen that cannot be driven by a program, a deployment that cannot be repeated, no tested
> backup, anything that deletes or sends without control]), whether it is PAID WHEN TOUCHED (fixed
> together with the first change that enters its module), or whether it CAN WAIT. Grade every
> dimension you audited. End with every finding turned into a proposed pending item, blocking
> ones first. Reply in my language.

> [de]
> Auditiere dieses System in Integrität, Sicherheit, Leistung, Codequalität und Deploybarkeit, als
> Inventar dessen, was vor und während seiner Weiterentwicklung normalisiert werden muss. Nur
> lesend: ändere nichts, außer deinen Bericht nach `docs/AUDIT_[Datum].md` zu schreiben. Wenn das
> Auditieren eines Teils einen Zugang verlangt, den du nicht hast (die Datenbank, die Logs, den
> Server), sag es mir und markiere diesen Teil als nicht auditiert; gib ihn nicht als in Ordnung
> aus. Geh den gesamten Code durch, keine Stichprobe, und lies zuerst `docs/SEMANTIC_TREE.md` und
> `docs/DISCREPANCIES.md`, damit du nicht meldest, was schon bekannt ist. Für jeden Befund: wo er
> ist (Datei und Zeile), das Risiko, der Beleg, der ihn beweist (der Befehl, die Abfrage, die
> Zahl), seine Priorität (P0 muss jetzt behoben werden, P1 bald, P2 wenn möglich), und ein Feld
> mehr: ob er BLOCKIERT (muss vor jeder Änderung behoben werden, nach meinem Kriterium: [ein
> offengelegtes Geheimnis, ein Bildschirm, der sich nicht programmatisch bedienen lässt, ein
> Deployment, das sich nicht wiederholen lässt, kein erprobtes Backup, alles, was ohne Kontrolle
> löscht oder versendet]), ob er BEIM ANFASSEN BEZAHLT WIRD (zusammen mit der ersten Änderung
> behoben, die in sein Modul eintritt), oder ob er WARTEN KANN. Gib jeder Dimension, die du
> auditiert hast, eine Note. Schließ damit ab, dass jeder Befund in einen vorgeschlagenen offenen
> Posten verwandelt wird, die blockierenden zuerst. Antworte in meiner Sprache.

2. Lies den Bericht. Wähl zwei Befunde aus und verlang den Beleg. Überprüf die
   Geschwindigkeitsmarken: du kannst jede anheben oder senken, mit Begründung.

**Bevor du den Prompt schickst** zum Abschluss: der gelesene Bericht, die zwei verifizierten
Befunde, und die Sitzung des Konstrukteurs geöffnet (der Abschluss geht an den Konstrukteur, nicht
an den Auditor).

3. Geh zurück in die Sitzung des Konstrukteurs und füg ihm den Abschluss-Prompt aus Lektion 13
   ein, mit der Ergänzung am Ende: „Each pending item keeps the speed mark of its finding.“

**Vollständigkeitsprüfung.** Sagt er, was er nicht auditieren konnte? Gibt es mindestens ein
„blockiert“? Hat jeder Befund Datei, Zeile und Beleg? Sind die blockierenden schon offene Posten?

**Ergebnis.** `docs/AUDIT_[Datum].md` mit Geschwindigkeitsmarken, und die blockierenden offenen
Posten eröffnet.

**Typische Fehler.** Alles auf „kann warten“, wegen eines Auditors, der nicht stören will. Oder
alles auf „blockiert“, wegen eines verängstigten Eigentümers: dann kann nie etwas angefangen
werden. Zwischen drei und acht blockierende sind in einem kleinen System normal.

**Im Leitprojekt.** Das Audit von Turnos findet als blockierend: das Passwort der Datenbank im
Code (und in der Git-Historie, also muss es rotiert und nicht nur verschoben werden); das
Deployment per FTP ohne Aufzeichnung, welche Version läuft; den geplanten Prozess, der Termine
ohne Sperre löscht; die zwei nicht bedienbaren Bildschirme. Als „wird beim Anfassen bezahlt“: die
Patientensuche ohne Index (Modul Patienten), die Abfrage der Tagesagenda, die eine Abfrage pro
Termin macht (Modul Agenda), der Versand der Erinnerungen ohne Idempotenz (Modul Nachrichten; das
ist die Spur des Bugs). Als „kann warten“: eine alte Abhängigkeit ohne bekannte Schwachstelle, und
der doppelte Code der Datumsformatierung an drei Stellen.

### Lektion N4 — Der Sicherheitsgurt

**Was du verstehen musst.** Es ist das harte Tor dieses Weges: solange der Gurt nicht grün ist,
wird keine Zeile Funktionalität geändert. Der Gurt hat fünf Teile: eine Testumgebung mit
anonymisierten Daten, ein Deployment, das sich wiederholt, die Geheimnisse außerhalb des Codes und
rotiert, die Continuous Integration, die laufen lässt, was es gibt, und die
Charakterisierungsbatterie. Letztere ist die Lektion 8 verkehrt herum: der Test wird grün geboren,
denn er erfasst, was das System heute tut, Defekte eingeschlossen, und der Beweis, dass er taugt,
ist, dass er rot wird, wenn du den Fluss absichtlich kaputt machst. Ohne dieses Rot durch Mutation
ist es ein Test, der besteht, weil er nichts ansieht.

**Bevor du den Prompt schickst**, mit deinen Händen und mit dem Eigentümer:

- `docs/ENVIRONMENTS_SURVEY.md`, die der Agent in N2 mit Marken verfasst hat und die du
  vervollständigst: wo die Testumgebung laufen wird (für den Kurs reicht ein kostenloser Dienst
  oder ein Container auf deiner Maschine), wie heute deployt wird, wo die Geheimnisse auf dem
  Server leben werden.
- Die Entscheidung über die Anonymisierung mit der Leiterin: Namen, Telefonnummern,
  E-Mail-Adressen und Ausweisnummern der Patienten werden durch falsche Werte ersetzt; die Daten
  und die Mengen bleiben erhalten. Das ist eine gesetzliche Pflicht, kein technisches Detail.
- Die Liste der kritischen Flüsse für die Charakterisierung: die fünf der Leiterin.
- Das auf deiner Maschine wiederhergestellte Backup (die Bedingung aus N0). Wenn du es nicht
  gemacht hast, mach es jetzt: der Agent wird die Produktionsdatenbank kopieren, und du musst
  wissen, dass es einen Rückweg gibt.
- Zugang des Agenten zum Server nur lesend und zum Ort der Testumgebung mit Schreibrechten,
  Zugangsdaten außerhalb des Chats.

1. Füg ihm diesen Prompt ein:

> We are going to build the safety belt around this system before changing anything in it. Read
> the environments survey, `docs/AUDIT_[date].md` and `docs/SEMANTIC_TREE.md`. Evaluate whether you
> have what is needed (read access to the server where it runs and to its database, write access
> to where the test environment will run, the way it is deployed today); if anything is missing,
> ask me before starting. Then set up, without touching any functionality: (1) a test environment
> that runs the system exactly as production does, with a copy of the data where the personal
> fields I listed are anonymized; (2) a reproducible deployment to that environment, run twice,
> showing me that the second run changed nothing; (3) every secret found in the repository or in
> the code moved to the server configuration (environment file or vault), with the list of what
> you moved so that I rotate each one; (4) continuous integration running whatever test suite
> exists today, even if it is a single smoke test, on every push; (5) `docs/GATES.md` with the
> gates of this project, including: nothing reaches the test environment without the
> characterization suite green, and nothing reaches production without the full suite green with
> the exact version. Document all of it in `docs/DEPLOYMENT.md` so that a person can do it by hand
> without you. Take a screenshot of the system running in the test environment and show it to me.
> Reply in my language.

> [de]
> Wir werden den Sicherheitsgurt um dieses System herum bauen, bevor wir irgendetwas daran ändern.
> Lies die Erhebung der Umgebungen, `docs/AUDIT_[Datum].md` und `docs/SEMANTIC_TREE.md`. Bewerte,
> ob du das Nötige hast (Lesezugang zu dem Server, auf dem es läuft, und zu seiner Datenbank,
> Schreibzugang zu dem Ort, an dem die Testumgebung laufen wird, die Art, wie es heute deployt
> wird); wenn etwas fehlt, bitte mich darum, bevor du anfängst. Richte dann ein, ohne irgendeine
> Funktionalität anzufassen: (1) eine Testumgebung, die das System genau so laufen lässt wie die
> Produktion, mit einer Kopie der Daten, in der die personenbezogenen Felder, die ich aufgelistet
> habe, anonymisiert sind; (2) ein reproduzierbares Deployment in diese Umgebung, zweimal
> ausgeführt, wobei du mir zeigst, dass der zweite Lauf nichts geändert hat; (3) jedes im
> Repository oder im Code gefundene Geheimnis in die Konfiguration des Servers verschoben
> (Umgebungsdatei oder Tresor), mit der Liste dessen, was du verschoben hast, damit ich jedes
> einzelne rotiere; (4) die Continuous Integration, die bei jedem Push die Testbatterie laufen
> lässt, die es heute gibt, und sei es ein einziger Smoke-Test; (5) `docs/GATES.md` mit den Toren
> dieses Projekts, darunter: nichts erreicht die Testumgebung ohne grüne
> Charakterisierungsbatterie, und nichts erreicht die Produktion ohne die vollständige Batterie
> grün mit der exakten Version. Dokumentiere alles in `docs/DEPLOYMENT.md`, so dass eine Person es
> ohne dich von Hand tun kann. Mach einen Screenshot des in der Testumgebung laufenden Systems und
> zeig ihn mir. Antworte in meiner Sprache.

2. Es ist eine lange Aufgabe, mit Hin und Her. Wenn er dir den Screenshot zeigt, öffne du die URL:
   man muss Turnos mit Daten sehen. Such einen echten Patienten mit Namen: er darf nicht da sein.
3. Rotier jedes Geheimnis der Liste, die er dir gegeben hat. Du selbst, in der entsprechenden
   Konsole, heute.

**Bevor du den Prompt schickst** für die Batterie: die von dir geöffnete Testumgebung, die
rotierten Geheimnisse, und die Liste der fünf kritischen Flüsse für die Lücke des Prompts.

4. Füg ihm diesen Prompt ein:

> We are going to write the characterization tests of these critical flows: [load an
> appointment; cancel an appointment; the reminder reaches the patient; search a patient; download
> the monthly sheet]. A characterization test captures what the system does today, exactly as it
> does it, defects included; it is not a test of what the system should do. For each flow: drive
> it from the screen as a user would and check the effect in the backend (the row, the state, the
> message queued). Every test must pass against the current code. Then prove that each test
> actually watches its flow: break the flow deliberately with a temporary change, show me the red
> output, revert the change, show me the green. If a flow cannot be driven from the screen, do not
> simulate it: say so and open a pending item marked as blocking. If while writing these tests you
> find behaviour that looks wrong, do not fix it: add it to `docs/DISCREPANCIES.md` with the
> evidence. Record the command to run the suite in `docs/STATUS.md`, and make the suite the gate
> for the test environment as `docs/GATES.md` says. Reply in my language.

> [de]
> Wir werden die Charakterisierungstests dieser kritischen Flüsse schreiben: [einen Termin
> eintragen; einen Termin absagen; die Erinnerung erreicht den Patienten; einen Patienten suchen;
> die Monatstabelle herunterladen]. Ein Charakterisierungstest erfasst, was das System heute tut,
> genau so, wie es es tut, Defekte eingeschlossen; es ist kein Test dessen, was das System tun
> sollte. Für jeden Fluss: bedien ihn vom Bildschirm aus, wie ein Nutzer es täte, und prüf die
> Wirkung im Backend (die Zeile, den Zustand, die eingereihte Nachricht). Jeder Test muss gegen
> den aktuellen Code bestehen. Beweise dann, dass jeder Test seinen Fluss wirklich bewacht: mach
> den Fluss absichtlich mit einer vorübergehenden Änderung kaputt, zeig mir die rote Ausgabe, mach
> die Änderung rückgängig, zeig mir das Grün. Wenn sich ein Fluss nicht vom Bildschirm aus
> bedienen lässt, simuliere ihn nicht: sag es und eröffne einen als blockierend markierten offenen
> Posten. Wenn du beim Schreiben dieser Tests ein Verhalten findest, das falsch aussieht,
> repariere es nicht: füg es `docs/DISCREPANCIES.md` mit dem Beleg hinzu. Halt den Befehl zum
> Ausführen der Batterie in `docs/STATUS.md` fest, und mach die Batterie zum Tor der Testumgebung,
> wie `docs/GATES.md` es sagt. Antworte in meiner Sprache.

   Du verlangst von ihm den Test, der grün geboren wird und beweist, dass er taugt, indem er durch
   Mutation rot wird; nichts simulieren, was sich nicht bedienen lässt; und was falsch aussieht,
   als Diskrepanz notieren, nicht reparieren.

5. Die zwei nicht bedienbaren Bildschirme (der blockierende offene Posten aus N0) werden hier
   gelöst, vor der Batterie oder als Teil von ihr: verlang von ihm, diesen offenen Posten mit der
   Routine aus Lektion 8 zu schließen, und danach die Charakterisierungstests dieser Flüsse zu
   schreiben.
6. Lass du die Batterie mit dem Befehl aus `docs/STATUS.md` laufen. Sie muss grün sein.

**Vollständigkeitsprüfung.** Hast du die Testumgebung geöffnet und keinen echten Namen gefunden?
Lief das Deployment zweimal und hat der zweite Lauf nichts geändert? Kam die Suche nach
Geheimnissen im Repository leer zurück, und hast du die rotiert, die er gefunden hat? Hat jeder
der fünf Flüsse seinen Test und sein Rot durch Mutation sichtbar? Hast du die Batterie selbst
laufen lassen?

**Ergebnis.** Die Testumgebung, die mit anonymisierten Daten läuft, `docs/DEPLOYMENT.md`,
`docs/GATES.md`, die rotierten Geheimnisse, die Continuous Integration grün, und die
Charakterisierungsbatterie grün mit ihren fünf bewiesenen Rots.

**Typische Fehler.** Die Batterie „auf später“ verschieben und anfangen, den Bug zu
reparieren: der halb fertige Gurt ist die Ursache Nummer eins dafür, kaputt zu machen, was lief.
Testdaten „als Beispiel“ statt der anonymisierten Kopie: die Bugs eines Altsystems leben in den
echten Daten (die doppelte Erinnerung von Turnos tritt nur bei bestimmten Patienten auf). Und das
Geheimnis verschieben, ohne es zu rotieren: es stand in der Git-Historie; es ist kein Geheimnis
mehr.

**Im Leitprojekt.** Der Charakterisierungstest der Erinnerung ist der interessanteste: er erfasst,
dass der nächtliche Prozess eine Nachricht pro Termin des Folgetags in den falschen Posteingang
schickt, und er besteht. Während er ihn schreibt, bemerkt der Agent, dass der Prozess, wenn er
zweimal läuft, zweimal versendet, und er notiert es als Diskrepanz mit dem Beleg. Das ist die Spur
des Bugs, und sie wird noch nicht repariert: das aktuelle Verhalten ist die Spezifikation bis zur
Lektion R1. Das Rot durch Mutation: der Agent kommentiert die Zeile aus, die die Nachricht
einreiht, der Test schlägt fehl, er kommentiert sie wieder ein, er besteht.

### Lektion N5 — Sperren und Produzenten-Konsumenten-Karte aus dem Code

**Was du verstehen musst.** Die Lektionen 14 und 11, als Inventur über dem gemacht, was schon
existiert, bevor etwas geändert wird. Der Agent wird im Code mehr finden, als das Geschäft
erinnert, was das System nach außen tut: Versendungen, Löschungen, nächtliche Prozesse. Der
Vergleich zwischen den zwei Listen ist das Ergebnis. Und jede Sperre trägt einen Vorschlag „jetzt“
oder „beim Anfassen“: eine Sperre auf etwas, das Nachrichten verschickt, kommt jetzt; eine auf
einem monatlichen Export kann auf den Block warten, der dieses Modul anfasst.

**Bevor du den Prompt schickst**, mit deinen Händen und mit dem Eigentümer:

- In `docs/INITIAL_SURVEY.md` die Liste von dem, was die Leiterin **weiß**, dass das System nach
  außen tut: es verschickt Erinnerungen, und sonst nichts, ihr zufolge.
- Zugang des Agenten zu den geplanten Aufgaben des Servers.
- Die Liste von dem, was außerhalb des Repositorys lebt (die Monatstabelle), für die Karte.
- Die Testumgebung aus N4 in Betrieb.

1. Füg ihm diesen Prompt ein:

> Go through the code, the database triggers and the scheduled jobs of the server looking for
> everything that charges, sends, approves, deletes, notifies outwards or runs on a schedule, and
> write `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` with every statement tagged by its source. Compare
> it with the list the business wrote in `docs/INITIAL_SURVEY.md`: whatever the code does that the
> business did not list, or the other way round, ask me about before going on. For every action:
> what triggers it, whether it can run twice, whether it is reversible, what lock exists today if
> any, and what the way back is. In the same pass, build `docs/PRODUCER_CONSUMER_MAP.md`: for every
> contract in the system (a service, a table, a file format, a list of values), who produces it
> and who consumes it, including the things outside the repository I told you about. If there are
> parts you cannot see, say so instead of leaving them out. Present me the actions table with a
> proposed lock for each (explicit confirmation, double safety, dry-run mode, daily limit, a human
> in the loop) and a proposal of which locks go NOW, before any change, and which can go when the
> module is touched. Do not implement anything yet: I confirm lock by lock. Reply in my language.

> [de]
> Geh den Code, die Trigger der Datenbank und die geplanten Jobs des Servers durch und such alles,
> was abbucht, sendet, genehmigt, löscht, nach außen benachrichtigt oder nach einem Zeitplan
> läuft, und schreibe `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` mit jeder Behauptung nach ihrer
> Quelle markiert. Vergleich es mit der Liste, die das Geschäft in `docs/INITIAL_SURVEY.md`
> geschrieben hat: was der Code tut und das Geschäft nicht aufgelistet hat, oder umgekehrt, frag
> mich danach, bevor du weitermachst. Für jede Aktion: was sie auslöst, ob sie zweimal laufen
> kann, ob sie umkehrbar ist, welche Sperre sie heute hat, falls sie eine hat, und was der Rückweg
> ist. Bau im selben Durchgang `docs/PRODUCER_CONSUMER_MAP.md`: für jeden Vertrag des Systems
> (einen Dienst, eine Tabelle, ein Dateiformat, eine Werteliste), wer ihn produziert und wer ihn
> konsumiert, einschließlich der Dinge außerhalb des Repositorys, von denen ich dir erzählt habe.
> Wenn es Teile gibt, die du nicht sehen kannst, sag es, statt sie wegzulassen. Leg mir die
> Tabelle der Aktionen vor, mit einer vorgeschlagenen Sperre für jede (ausdrückliche Bestätigung,
> doppelte Sicherung, Trockenlauf-Modus, Tageslimit, ein Mensch im Kreislauf) und einem Vorschlag,
> welche Sperren JETZT kommen, vor jeder Änderung, und welche kommen können, wenn das Modul
> angefasst wird. Implementier noch nichts: ich bestätige Sperre für Sperre. Antworte in meiner
> Sprache.

2. Bestätige Sperre für Sperre mit der Leiterin, und die Marke „jetzt“ oder „beim Anfassen“ für
   jede.

**Bevor du den Prompt schickst** zum Abschluss: die Tabelle mit deinem Urteil pro Zeile, und die
Liste der Sperren „jetzt“ für die Lücke des Prompts.

3. Schließ mit dem Abschluss-Prompt aus Lektion 14 ab, wobei du nur die Sperren „jetzt“ aufführst;
   die übrigen bleiben im Backlog mit ihrer Marke.

**Vollständigkeitsprüfung.** Hat die Liste des Agenten mehr Aktionen als die der Leiterin? (Wenn
sie dieselben hat, hat er die geplanten Aufgaben nicht angesehen.) Hat jede Sperre „jetzt“ ihren
roten Test gegen die Version ohne Sperre? Steht die Monatstabelle als Konsument in der Karte?

**Ergebnis.** `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`, `docs/PRODUCER_CONSUMER_MAP.md`,
`docs/LOCKS.md` mit den implementierten und geprüften Sperren „jetzt“.

**Typische Fehler.** Alle Sperren jetzt implementieren, „wo wir schon dabei sind“: das ist die
verletzte Regel der zwei Geschwindigkeiten, und es ist Zeit, die nicht dem Bug gewidmet
wird, den der Kunde verlangt hat.

**Im Leitprojekt.** Der Agent findet drei Aktionen, die die Leiterin nicht aufgelistet hat: das
nächtliche Löschen alter abgesagter Termine, eine E-Mail, die das System an die Fachkraft schickt,
wenn ein Termin abgesagt wird (sie wusste es nicht), und den Export, der die Tabelle speist.
Sperren „jetzt“: das nächtliche Löschen geht in den Trockenlauf-Modus über (es protokolliert, was
es gelöscht hätte), bis sie entscheidet, und der Versand der Erinnerungen bekommt ein Tageslimit.
„Beim Anfassen“: Idempotenz des Versands (Modul Nachrichten, tritt mit dem Bug ein), Bestätigung
bei der Absage (Modul Agenda). Die Karte hat sechs Verträge, und die Monatstabelle ist Konsument
der Tabelle der Termine: wenn jemand ihr eine Spalte ändert, bricht die Monatstabelle still
zusammen.

### Lektion N6 — Dimensionieren mit echten Zahlen

**Was du verstehen musst.** Die Lektion 3 mit einem Vorteil: die Primärdaten stehen in der
Datenbank und in den Logs. Sie werden nicht erfragt, sie werden gemessen, mit einem Messgerät mit
Test (Lektion 7). Die Leiterin steuert nur bei, was nirgends steht: wie stark sie zu wachsen
erwarten, und ob das System an andere Praxen verkauft werden wird.

**Bevor du den Prompt schickst**, mit deinen Händen:

- Nur lesenden Zugang zur Produktionsdatenbank, oder die vollständige Kopie aus N4 (die
  Anonymisierung hat weder Daten noch Mengen angetastet), und zu den Zugriffslogs.
- Die zwei Antworten des Geschäfts: erwartetes Wachstum („wie jetzt, vielleicht eine Fachkraft
  mehr“) und das „mal zehn“ („wenn es funktioniert, meine Schwester hat eine andere Praxis“).
- Einen bekannten Fall für den Test des Messgeräts: die Anzahl der Fachkräfte, nämlich drei.

1. Füg ihm diesen Prompt ein:

> Before changing anything we are going to size this system with its real numbers. With read-only
> access to the production database (or the complete test copy) and to the logs, measure instead
> of asking: rows per table and growth per month from the timestamps, events per entity, peak
> concurrency from the access logs, data size today and projected at five years, and the slowest
> queries. Write a meter for each number (a script that lives in the repository, with a test
> against a known case I will give you) and show me every number together with the command that
> produces it; audit each meter in both directions (is everything that should be counted, counted?
> does everything counted exist?). Write `docs/VOLUME_SURVEY.md` with every figure tagged
> [database] or [log], and ask me only for what cannot be measured: the growth the business
> expects and whether the system will serve more than one site. Then write `docs/SIZING.md`: what
> breaks first if everything is multiplied by ten, which of the current architecture choices hold
> and which do not, and which asymmetric decisions we take now, before evolving, because they are
> cheap today and expensive later. Do not change any code. Reply in my language.

> [de]
> Bevor wir irgendetwas ändern, werden wir dieses System mit seinen echten Zahlen dimensionieren.
> Mit nur lesendem Zugang zur Produktionsdatenbank (oder zur vollständigen Testkopie) und zu den
> Logs, miss statt zu fragen: Zeilen pro Tabelle und Wachstum pro Monat aus den Zeitstempeln,
> Ereignisse pro Entität, Nebenläufigkeit in der Spitze aus den Zugriffslogs, Datengröße heute und
> hochgerechnet auf fünf Jahre, und die langsamsten Abfragen. Schreibe ein Messgerät für jede Zahl
> (ein Skript, das im Repository lebt, mit einem Test gegen einen bekannten Fall, den ich dir
> geben werde) und zeig mir jede Zahl zusammen mit dem Befehl, der sie erzeugt; auditiere jedes
> Messgerät in beiden Richtungen (ist alles gezählt, was gezählt werden sollte? existiert alles
> Gezählte?). Schreibe `docs/VOLUME_SURVEY.md` mit jeder Zahl markiert als [Datenbank] oder [Log],
> und frag mich nur nach dem, was sich nicht messen lässt: das Wachstum, das das Geschäft
> erwartet, und ob das System mehr als einen Standort bedienen wird. Schreibe dann
> `docs/SIZING.md`: was zuerst bricht, wenn alles mit zehn multipliziert wird, welche der
> aktuellen Architekturentscheidungen halten und welche nicht, und welche asymmetrischen
> Entscheidungen wir jetzt treffen, vor dem Weiterentwickeln, weil sie heute billig und später
> teuer sind. Ändere keinen Code. Antworte in meiner Sprache.

2. Lass du ein Messgerät laufen (das für Zeilen pro Tabelle zum Beispiel). Es muss dir dasselbe
   ergeben. Rechne eine Zahl von Hand nach.

**Bevor du den Prompt schickst** zum Abschluss: die nachgerechnete Zahl, die übereinstimmt, und
deine Entscheidung über das, was das „mal zehn“ nicht aushält, falls es etwas gibt.

3. Schließ mit dem Abschluss-Prompt aus Lektion 3 ab, wobei du zwischen den vorgeschlagenen
   Optionen wählst oder bestätigst, dass das Aktuelle aushält.

**Vollständigkeitsprüfung.** Gibt es eine Primärzahl ohne Messgerät? Hast du eines selbst laufen
lassen? Steht das „mal zehn“ geschrieben?

**Ergebnis.** `docs/VOLUME_SURVEY.md` mit Marken, die Messgeräte mit Test, `docs/SIZING.md`.

**Typische Fehler.** Akzeptieren: „die Datenbank ist zu groß, um sie zu zählen, ich schätze etwa
hunderttausend“. Eine große Datenbank zählt man mit einer Abfrage; das ist ein Messgerät.

**Im Leitprojekt.** Zwanzigtausend Termine in zwei Jahren, tausend pro Monat und langsam wachsend;
sechzigtausend Nachrichten; zwei Nutzerinnen in der Spitze; die Datenbank belegt wenig; die
langsamste Abfrage ist die Patientensuche nach Namen (ohne Index, das Audit sagte es schon). Das
„mal zehn“ hält überall aus, außer bei dieser Suche und beim nächtlichen Versand, der proportional
zu den Terminen dauert. Asymmetrische Entscheidung: die Schnittstelle für den Nachrichtenversand
bekommt eine Warteschlange, auch wenn es heute nicht nötig ist, denn die Anzahlung (Lektion R2)
wird denselben Kanal benutzen.

### Lektion N7 — Das Normalisierungs-Backlog, gepaart mit der Anfrage des Kunden

**Was du verstehen musst.** Die Lektion 5 mit zwei Spalten mehr. Eine einzige Warteschlange, in
der die Schuld (Audit, Diskrepanzen, Bildschirme, ausstehende Sperren, Entscheidungen der
Dimensionierung) und die Anfrage des Kunden (was fehlschlägt, was fehlt) zusammenleben, jeder
offene Posten mit seiner Geschwindigkeitsmarke und seinem Typ, und jeder offene Posten des Kunden
mit der Liste der Normalisierungsposten, die dasselbe Modul berühren und zusammen mit ihm bezahlt
werden sollten. Das ist die Regel „wird beim Anfassen bezahlt“, operativ gemacht.

**Bevor du den Prompt schickst**, mit deinen Händen und mit dem Eigentümer:

- Die Anfrage des Kunden für diese Etappe, in `docs/blocks/STAGE_01_REQUEST.md`, in zwei Listen
  mit den Worten der Leiterin. Was fehlschlägt: „manchmal kommt die Erinnerung zweimal an und
  manchmal kommt sie nicht an; ich habe Screenshots von drei Patienten aus der vorigen Woche“. Was
  fehlt: „ich will bei Erstterminen eine Anzahlung per Zahlungslink verlangen“, „ich will die
  Zahlen des Monats sehen, ohne die Tabelle herunterzuladen“.
- Alle Artefakte von N2 bis N6 abgeschlossen. Wenn eines fehlt, öffne diesen Prompt nicht.
- Die blockierenden offenen Posten aus N0, N3 und N4 geschlossen.

1. Füg ihm diesen Prompt ein:

> We are going to turn the normalization and the client's request for this stage into one queue
> of numbered pending items in `docs/PENDING.md`, each with its full specification as the method
> asks (number, title, node of the semantic tree, origin, description, business rules with
> decision and date or marked as missing, data in and out, screens, edge cases, acceptance
> criteria as given, when, then, how it will be verified, status). Sources for the normalization
> items: `docs/AUDIT_[date].md`, the discrepancies I decided to change, the screens that cannot be
> driven by a program, the secrets to rotate, the locks that are not implemented yet, and the
> decisions in `docs/SIZING.md`; each one keeps its speed mark: BLOCKS, PAID WHEN TOUCHED, or CAN
> WAIT. Sources for the client's items: the client's request for this stage; each one marked
> CORRECTIVE (something that fails today, with the way to reproduce it in the client's words) or
> EVOLUTIVE (something new). For every client item, list the normalization items that touch the
> same modules and should be paid together with it. If the request is ambiguous on any point such
> that you cannot write a verifiable item, ask me; do not resolve it by assuming. Order: blocking
> items first, then the client's items in the priority I gave you, each with its paired
> normalization. Reply in my language.

> [de]
> Wir werden die Normalisierung und die Anfrage des Kunden für diese Etappe in eine einzige
> Warteschlange nummerierter offener Posten in `docs/PENDING.md` verwandeln, jeder mit seiner
> vollständigen Spezifikation, wie die Methode es verlangt (Nummer, Titel, Knoten des semantischen
> Baums, Ursprung, Beschreibung, Geschäftsregeln mit Entscheidung und Datum oder als fehlend
> markiert, Daten hinein und hinaus, Bildschirme, Randfälle, Abnahmekriterien in der Form gegeben,
> wenn, dann, wie geprüft wird, Status). Quellen für die Normalisierungsposten:
> `docs/AUDIT_[Datum].md`, die Diskrepanzen, bei denen ich entschieden habe zu ändern, die
> Bildschirme, die sich nicht programmatisch bedienen lassen, die zu rotierenden Geheimnisse, die
> noch nicht implementierten Sperren, und die Entscheidungen in `docs/SIZING.md`; jeder behält
> seine Geschwindigkeitsmarke: BLOCKIERT, WIRD BEIM ANFASSEN BEZAHLT oder KANN WARTEN. Quellen für
> die Posten des Kunden: die Anfrage des Kunden für diese Etappe; jeder markiert als KORREKTIV
> (etwas, das heute fehlschlägt, mit der Art, es zu reproduzieren, in den Worten des Kunden) oder
> EVOLUTIV (etwas Neues). Liste für jeden Posten des Kunden die Normalisierungsposten auf, die
> dieselben Module berühren und zusammen mit ihm bezahlt werden sollten. Wenn die Anfrage in
> irgendeinem Punkt so mehrdeutig ist, dass du keinen prüfbaren Posten schreiben kannst, frag
> mich; löse es nicht durch Annahmen. Reihenfolge: zuerst die blockierenden Posten, dann die
> Posten des Kunden in der Priorität, die ich dir gegeben habe, jeder mit seiner gepaarten
> Normalisierung. Antworte in meiner Sprache.

2. Lies die Spezifikation jedes offenen Postens des Kunden, als wärst du die Leiterin, genau wie
   in Lektion 5. Und überprüf die Paarungen: ergibt es Sinn, diese Schuld mit dieser Anfrage zu
   bezahlen?
3. Füg der Arbeitsvereinbarung die Routine jeder Sitzung aus Lektion 5 hinzu, unverändert.

**Vollständigkeitsprüfung.** Bleibt ein „blockiert“ offen? Sagt jeder korrektive Posten, wie er
mit den Worten des Kunden reproduziert wird? Hat jeder offene Posten des Kunden seine gepaarten?

**Ergebnis.** `docs/PENDING.md` mit allem, und die Routine in der Vereinbarung.

**Typische Fehler.** Ein Backlog mit fünfzig offenen Posten auf „kann warten“: das ist die als
Liste verkleidete Neuschreibung. Archivier, was nicht bezahlt werden wird, und sag es. Und den
ersten Block mit einem offenen blockierenden Posten eröffnen, „weil er klein ist“.

**Im Leitprojekt.** Das Backlog von Turnos endet mit drei offenen Posten des Kunden: die doppelte
Erinnerung (korrektiv, Modul Nachrichten, gepaart mit der Idempotenz des Versands und der
Nachrichtenwarteschlange aus der Dimensionierung), die Anzahlung (evolutiv, neues Modul Zahlungen,
gepaart mit der Bestätigung bei der Absage, weil sie denselben Bildschirm berührt), und der
Monatsbericht (evolutiv, Modul Berichte, gepaart mit dem Index der Patienten und mit dem Vertrag
der Monatstabelle, die ersetzt wird). Und etwa zwölf Normalisierungsposten, von denen drei „warten
können“, und das wird gesagt.

---

## Die Schleife über dem Altsystem: Lektionen R1 und R2

### Lektion R1 — Der erste Block: der Bug, im korrektiven Modus

**Was du verstehen musst.** Ein korrektiver offener Posten ist ein bekannter Bug. In Lektion 8
wurde das Rot hergestellt; hier ist das Rot der Bug selbst: der Test, der den Fehler reproduziert,
indem er den Fluss wie der Nutzer bedient, der ihn gemeldet hat, muss gegen den aktuellen Code
fehlschlagen. Wenn er nicht fehlschlägt, hast du einen anderen Bug reproduziert. Dieses Rot ist
der Beweis, dass du das Richtige reparierst, und es ist mehr wert als jede Erklärung des Agenten
darüber, was „wohl passieren muss“ [Ref. 22](REFERENCIAS.md#ref-22). Und die Grundursache wird in
Prosa gesagt, bevor etwas angefasst wird, denn manchmal ist die Grundursache eine Geschäftsregel,
die niemand geschrieben hat, und das entscheidest du.

**Bevor du den Prompt schickst**, mit deinen Händen:

- Den korrektiven offenen Posten in `docs/PENDING.md` mit der Reproduktion in den Worten der
  Leiterin, und einen konkreten Fall: die drei Screenshots aus der vorigen Woche, mit dem
  (falschen, im Test) Namen der Patienten und dem Datum. Ohne einen Fall gibt es keinen Test.
- Die Charakterisierungsbatterie grün, mit dem Befehl in `docs/STATUS.md`.
- Die gepaarten Posten dieses offenen Postens, in ihm aufgelistet.
- Die Leiterin informiert, dass du ihr heute eine Geschäftsfrage stellen wirst.

1. Öffne den Block mit der Routine jeder Sitzung: der Agent kündigt an, welchen offenen Posten er
   nimmt, und liest die Spezifikation erneut.
2. Füg ihm diesen Prompt ein:

> This pending item is a correction: [some patients receive the reminder twice and some receive
> none; three cases from last week are attached in the item]. Before changing anything: (1)
> Reproduce the failure with a test that drives the flow from the screen and checks the effect in
> the backend, and show me that it fails against the current code; that red is the proof that you
> reproduced the right defect. If you cannot reproduce it, tell me what you tried and what you
> need; do not fix what you cannot see. (2) Find the root cause and tell me in prose, with the
> evidence, before fixing. If the root cause is a business rule nobody wrote down, stop and ask me.
> (3) Fix at the root, not where it hurts, and nothing else: anything else you find goes to a
> pending item. (4) Show me the test green, the characterization suite still green, and the
> regression of the neighbouring items. (5) If the fix changes a current behaviour that someone
> may depend on, say so explicitly: that is a decision for me, not a side effect. Close the paired
> normalization items of this module in the same block, each with its own evidence. The commit
> message says "proved red against [version]" and the test counts. Reply in my language.

> [de]
> Dieser offene Posten ist eine Korrektur: [manche Patienten bekommen die Erinnerung zweimal und
> manche gar nicht; die drei Fälle aus der vorigen Woche stehen im offenen Posten]. Bevor du
> irgendetwas änderst: (1) Reproduziere den Fehler mit einem Test, der den Fluss vom Bildschirm
> aus bedient und die Wirkung im Backend prüft, und zeig mir, dass er gegen den aktuellen Code
> fehlschlägt; dieses Rot ist der Beweis, dass du den richtigen Defekt reproduziert hast. Wenn du
> ihn nicht reproduzieren kannst, sag mir, was du versucht hast und was du brauchst; repariere
> nicht, was du nicht sehen kannst. (2) Finde die Grundursache und sag sie mir in Prosa, mit dem
> Beleg, bevor du reparierst. Wenn die Grundursache eine Geschäftsregel ist, die niemand
> aufgeschrieben hat, halt an und frag mich. (3) Repariere an der Wurzel, nicht dort, wo es weh
> tut, und nichts weiter: alles andere, was du findest, kommt in einen offenen Posten. (4) Zeig
> mir den Test grün, die Charakterisierungsbatterie weiterhin grün, und die Regression der
> benachbarten Posten. (5) Wenn die Reparatur ein aktuelles Verhalten ändert, von dem jemand
> abhängen könnte, sag es ausdrücklich: das ist eine Entscheidung für mich, kein Nebeneffekt.
> Schließ die gepaarten Normalisierungsposten dieses Moduls im selben Block, jeden mit seinem
> eigenen Beleg. Die Commit-Nachricht sagt „rot bewiesen gegen [Version]“ und die Testzahlen.
> Antworte in meiner Sprache.

   Du verlangst von ihm die Reproduktion vor der Diagnose, die Grundursache in Prosa vor dem
   Anfassen, die Wurzel und nichts weiter, die Charakterisierung als Regression des ganzen
   Systems, und dass eine Verhaltensänderung eine Entscheidung von dir ist.

3. Lies die Grundursache, bevor du die Reparatur freigibst. Wenn er dich nach einer Geschäftsregel
   fragt, entscheide sie mit der Leiterin und antworte mit dem Abschlussformat aus Lektion 6.
4. Zum Abschluss: lass du die Charakterisierungsbatterie laufen. Und benutz das System in der
   Testumgebung eine Weile, wie die Empfangskraft: der menschliche Blick wird nicht
   delegiert.

**Vollständigkeitsprüfung.** Hast du das Rot des Tests gesehen, der den Bug reproduziert, mit
Zahlen? Stand die Grundursache in Prosa geschrieben, bevor repariert wurde? Ist die
Charakterisierung weiterhin grün? Wurden die gepaarten Posten mit ihrem eigenen Beleg geschlossen?
Sagt der Commit „rot bewiesen“?

**Ergebnis.** Der Bug mit der vollständigen Routine geschlossen, die gepaarten Posten geschlossen,
und die Charakterisierungsbatterie um den Test des Bugs erweitert.

**Typische Fehler.** Die Reparatur freigeben, ohne die Grundursache zu lesen: in Turnos ist die
erste Hypothese des Agenten meist „der Prozess läuft zweimal“, und das ist die halbe Wahrheit. Und
zulassen, dass „wo wir schon dabei sind“ das Modul Nachrichten aufräumt: Regel 7.

**Im Leitprojekt.** Der Test reproduziert den doppelten Versand mit einem Termin, der verschoben
wurde: der nächtliche Prozess schickt eine Erinnerung pro Terminzeile des Folgetags, und ein
verschobener Termin hat zwei Zeilen (die alte, im Zustand „verschoben“, die kein Bildschirm
anzeigt, und die neue). Die, die gar keine bekommen, sind die, die auf nach dem Versand verschoben
wurden. Grundursache: der Zustand „verschoben“, der in der Lektion N2 aufgetaucht ist. Die
Geschäftsfrage: „ist ein verschobener Termin ein neuer Termin oder derselbe Termin?“. Die Leiterin
entscheidet: derselbe Termin, mit Historie. Die Reparatur an der Wurzel berührt den Zustand, nicht
den Versand; die gepaarte Idempotenz wird im selben Block bezahlt; das Rot sagt „2 Nachrichten für
1 Termin“ und das Grün „1 Nachricht für 1 Termin“. Und die Verhaltensänderung wird erklärt: die
verschobenen Termine tauchen nicht mehr zweimal in der Monatstabelle auf, die Konsument der
Tabelle ist; die Leiterin genehmigt es.

### Lektion R2 — Der zweite Block: die Anzahlung, im evolutiven Modus

**Was du verstehen musst.** Das Neue über dem Alten wird mit der vollständigen Methode gebaut,
genau wie in den Lektionen 5 bis 12 des ersten Teils: Spezifikation im offenen Posten,
Entscheidungen mit Datum, roter Test, Ende-zu-Ende-Test, ehrlicher Bericht. Zwei Unterschiede. Die
Regression der Nachbarn ist das ganze System, und die Charakterisierungsbatterie ist die, die es
sagt. Und wenn der Block in ein Modul eintritt, treten die als „wird beim Anfassen bezahlt“
markierten Normalisierungsposten dieses Moduls mit ihm ein, mit ihrem eigenen Beleg. Man tut dem
neuen Modul nicht an, was das Altsystem dem alten angetan hat.

**Bevor du den Prompt schickst**, mit deinen Händen:

- Den evolutiven offenen Posten der Anzahlung in `docs/PENDING.md`, mit seiner vollständigen
  Spezifikation von dir gelesen, seinen gepaarten Posten, und den Geschäftsentscheidungen, die die
  Leiterin schon treffen kann: welche Termine eine Anzahlung tragen, wie viel, was passiert, wenn
  nicht gezahlt wird.
- Die Erhebung der Aktionen mit Konsequenz (N5) mit der hinzugefügten Zeile „Anzahlung einziehen“,
  denn das ist eine neue Aktion, die auf die Welt wirkt: Sperre vor dem Bauen, wie in Lektion 14.
- Die Charakterisierungsbatterie grün.

1. Öffne den Block mit dem Eröffnungs-Prompt aus Lektion 5, über die Anfrage der Anzahlung, und
   lies die Spezifikation wie die Leiterin.
2. Vor dem Bauen die Sperre: füg ihm den Abschluss-Prompt aus Lektion 14 für die Aktion „Anzahlung
   einziehen“ ein, mit Trockenlauf-Modus zuerst.
3. Bau mit der Routine aus Lektion 8, offener Posten für offener Posten, mit den gepaarten Posten
   im selben Block.
4. Zum Abschluss des Blocks: die vollständige Ende-zu-Ende-Batterie (die der Charakterisierung
   plus die neuen Tests), mit dem Blockabschluss-Prompt aus Lektion 8, und eine Weile von
   dir mit dem System.

**Vollständigkeitsprüfung.** Hat die Anzahlung eine Sperre mit rotem Test, bevor das Einziehen
existiert? Ist die Charakterisierung nach dem Block weiterhin grün? Wurden die gepaarten Posten
des Moduls bezahlt? Gibt es etwas am alten Modul, das ohne offenen Posten „verbessert“ wurde?

**Ergebnis.** Die Anzahlung, die in der Testumgebung im Trockenlauf-Modus funktioniert, mit ihrer
Spezifikation, ihrer Sperre, ihren Tests und ihrem Ende-zu-Ende-Test; die gepaarten Posten
geschlossen.

**Typische Fehler.** Die Anzahlung „schnell, so wie der Rest gemacht ist“ bauen, damit sie
hineinpasst: das neue Modul wird mit der vollständigen Methode geboren, immer. Und die Sperre
vergessen, weil „es ein Zahlungslink ist, wir ziehen ja nicht selbst ein“: der Link wird an einen
Patienten geschickt; das ist eine Aktion nach außen.

**Im Leitprojekt.** Die Anzahlung benutzt denselben Kanal wie die Erinnerungen, der jetzt eine
Warteschlange hat (die asymmetrische Entscheidung aus N6, die sich von allein bezahlt macht).
Sperre: ausdrückliche Bestätigung der Empfangskraft und von der Fachkraft festgelegter Betrag;
Trockenlauf-Modus eine Zeit lang, der protokolliert „hätte Anzahlung verlangt von“. Der gepaarte
Posten des Absage-Bildschirms (die Bestätigung) wird in diesem Block bezahlt, weil die Anzahlung
ändert, was beim Absagen passiert. Zum Abschluss lässt die Batterie sieben Flüsse laufen: die fünf
der Charakterisierung, den des Bugs aus R1 und den der Anzahlung.

---

## Danach: Produktionsfreigabe und Betrieb

Ab hier ist das Altsystem ein System mit Methode, und die Lektionen 13 bis 22 des ersten Teils
gelten unverändert, mit vier Anmerkungen. Die erste betrifft die sechs Schritte der
Betriebsqualität: die minimale Beobachtbarkeit und der Schwachstellen-Scan sind schon mit dem
Gurt hereingekommen, die Persistenzmessungen stehen schon in N6, und der Lasttest läuft mit
diesen Volumina vor dem ersten Deployment; die beiden Monitorings starten mit der ersten Lesung
als Basislinie, und was am ersten Tag schon schlecht war, wird zu einem offenen Posten mit seiner
Marke. Die anderen drei Anmerkungen sind diese. Das Audit aus Lektion 13 vergleicht gegen das
aus N3:
wie viel Schuld bezahlt wurde, wie viel bleibt. Die Handbücher aus Lektion 20 gibt es in einem
Altsystem meist nicht, und sie werden aus dem System, wie es ist, und aus den geschlossenen
offenen Posten erzeugt, die jetzt tatsächlich das Erledigte dokumentieren. Und die Retrospektive
aus Lektion 23 hat eine Frage, die diesem Weg eigen ist: wie viel das Normalisieren gekostet hat
(in Stunden, in Token, in Etappen vor der ersten Änderung), und was von der als „kann warten“
markierten Schuld am Ende doch gekostet hat. Diese Antwort ist die, die den Kalender dieses Teils
in der nächsten Version korrigieren wird.

## Ausgangsliste des Normalisierungsabschnitts

Die acht Bedingungen, die der Eigentümer prüft, ohne Code zu lesen, bevor der erste Block geöffnet
wird. Es sind dieselben wie auf der Seite des evolutiv-korrektiven Weges; ich wiederhole sie hier,
weil sie das Ergebnis dieses Teils sind.

1. Es existieren alle Eingaben der vorherigen Etappen (Erhebung, Eignung, Vereinbarung,
   Projektdatei, Baum, Umgebungen, Mengendaten, Dimensionierung, Tore), mit Quellenmarken, und der
   Eigentümer hat jeden erschlossenen Knoten bestätigt (N2).
2. Jede Diskrepanz hat eine Entscheidung mit Datum, und die, die das System ändern, haben einen
   offenen Posten (N2).
3. Das Audit existiert und jeder Befund hat eine Geschwindigkeitsmarke (N3).
4. Der Gurt ist grün: Testumgebung mit anonymisierten Daten, Deployment zweimal gelaufen,
   Geheimnisse draußen und rotiert, Continuous Integration, Charakterisierungsbatterie mit dem
   bewiesenen Rot durch Mutation (N4).
5. Jede Aktion mit Konsequenz hat ein Urteil, und die Sperren „jetzt“ haben ihren roten Test (N5).
6. Die Primärzahlen sind mit Messgerät und Test gemessen, und das „mal zehn“ steht geschrieben
   (N6).
7. Es bleibt kein „blockiert“ offen, und jeder offene Posten des Kunden hat seine gepaarten (N7).
8. Die Vereinbarung hat die fünf Regeln des Altsystems, und eine neue Sitzung besteht die
   Leseprobe (N1, N2).

## Anhang — Was dieser Teil noch nicht hat

- Eine Kohorte, die ihn an einem echten Altsystem durchlaufen hat. Die geerbte Turnera ist aus dem
  gebaut, was ich in fremden Systemen im Diagnosemodus gesehen habe, nicht aus der Erfahrung eines
  Kursteilnehmers.
- Ein Beispiel-Repository von „Turnos“, so wie der Neffe es hinterlassen hat, damit der
  Teilnehmer, der kein eigenes Altsystem hat, eines zum Normalisieren bekommt. Das ist der
  wichtigste offene Posten dieses Teils.
- Das Kriterium für die Größe der Charakterisierungsbatterie bei großen Systemen, und wie sich die
  Normalisierung pro Modul aufteilt, wenn das System Dutzende davon hat.
