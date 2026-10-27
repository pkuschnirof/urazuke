# Schritt 22 — Fehler-Monitoring und zyklischer Bericht: kein Fehler ohne offenen Posten (Schrittvertrag)

**Abschnitt:** Betrieb.
**Wann:** er wird in der Betriebsphase aufgebaut, mit dem ersten Deployment,
zusammen mit der 21, auf den Logs der 16; von da an läuft er allein, mit Alarmen im Moment und
einem zyklischen Bericht, der mit dem Eigentümer gelesen wird. Jeder neue Fehler tritt als
korrektiver offener Posten in die Schleife ein und wird mit dem Test geschlossen, der ihn rot
reproduziert. In einem Altsystem ist die erste Lesung die Basislinie: die Fehler, die am ersten
Tag schon existierten, werden zu offenen Posten mit ihrer Geschwindigkeitsmarke, und keiner
bleibt als „bekannt“ ohne einen offenen Posten, der sagt, warum er toleriert wird und bis wann.
**Form:** ein einziger Durchgang zum Aufbauen; danach zyklische Routine.
**Größe:** verpflichtend in jedem Projekt mit Nutzern: die zentrale Erfassung und der Bericht sind
nicht verhandelbar; die Alarme im Moment sind proportional.

## Wozu er dient

Ein System in Produktion erzeugt Fehler, die kein Nutzer meldet: der, der den weißen Bildschirm
gesehen und es noch einmal versucht hat, der der nächtlichen Aufgabe, die fehlschlug und auf die
niemand schaut, der des externen Aufrufs, der einen Fehler zurückgab und den der Code
verschluckt hat. Wenn ich sie nicht erfasse, existieren sie nicht, bis sie zu sehr existieren.
Dieser Schritt ist das Gegenstück zur 20: jene wacht über die Leistung, dieser über die Fehler,
und beide enden am selben Ort, in der Schleife, als korrektive offene Posten. Die Grundregeln
sind zwei. **Kein Fehler ohne offenen Posten**: ein neuer Fehler eröffnet einen, und er wird mit
dem Test geschlossen, der ihn rot reproduziert, wie es der korrektive Modus des evolutiven Wegs
verlangt. Und **es gibt keinen „bekannten Fehler“** ohne einen offenen Posten, der sagt, warum er
toleriert wird und bis wann; „diesen Fehler gab es schon immer“ ist der Satz, mit dem ein System
verrottet. Der Authentifizierungsfehler, der als Erfolg gemeldet wurde
[Ref. 43](../REFERENCIAS.md#ref-43), und die vier Runden bis zur Grundursache
[Ref. 22](../REFERENCIAS.md#ref-22) sind die beiden Vorläufer: der erste davon, dass sich Fehler
verstecken, wenn man sie nicht maschinell erfasst; der zweite davon, dass ein Fehler ohne
Reproduktion mehrmals repariert wird.

**Wenn du Anfänger bist.** Ein *Fehler* ist alles, was das System zu tun versuchte und nicht
konnte: ein Bildschirm, der nicht geladen hat, eine nächtliche Aufgabe, die abgebrochen ist, ein
Aufruf an einen anderen Dienst, der fehlgeschlagen ist. Eine *unbehandelte Ausnahme* ist ein
Fehler, den der Code nicht vorgesehen hat und der abbricht, was er gerade tat. Einen Fehler zu
*erfassen* heißt, ihn mit all seinen Daten (wann, in welcher Version, mit welcher Kennung, dem
*Stack*, also der Liste der Programmschritte bis zum Fehlschlag) an einem einzigen zentralen Ort
zu speichern, statt ihn auf dem Bildschirm eines Nutzers verloren gehen zu lassen. *Gruppieren*
heißt, die tausend Male, die derselbe Fehler passiert ist, in einem einzigen Eintrag mit einem
Zähler zusammenzufassen. Und die *Fehlerrate pro Fluss* ist: von hundert Malen, die jemand einen
Termin eingetragen hat, wie viele fehlgeschlagen sind.

## 1. Benötigter Kontext

Was folgt, ist die generische Liste. Die konkreten Dateien, die du vor jedem Prompt fertig haben
musst, mit ihrem Inhalt und ihrem Mindestzustand, stehen in Abschnitt 2, in dem Block „Bevor du
den Prompt schickst“, der jedem einzelnen vorangeht.

- Die Beobachtbarkeit (16): die Fehler kommen mit Korrelations-ID, Version und Akteur an.
- Die Tabelle der Sperren (14): die Fehler in Aktionen mit Konsequenz sind sofortiger Alarm.
- Die deployte Produktion (15), mit dem Browser des Nutzers in der Erfassung eingeschlossen.
- Der Alarmkanal und der Zyklus des Berichts, geteilt mit der 21.

## 2. Prompts

**Zu Beginn (aufbauen und beweisen):**

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- `docs/OBSERVABILITY.md` (16), abgeschlossen: die Fehler müssen mit Kennung, Version, Umgebung
  und Akteur herauskommen.
- `docs/LOCKS.md` (14): die Liste der Aktionen mit Konsequenz, deren Fehler Alarm im Moment sind.
- Der Kanal und der Zyklus des Berichts, dieselben wie in Schritt 21, mit dem Eigentümer
  entschieden; und die Zahl der Vorkommen pro Stunde eines bekannten Fehlers, ab der du einen
  Alarm willst, für die Lücke im Prompt.
- Wo die Fehler gespeichert werden und wie lange (derselbe Ort wie die Logs, oder ein Dienst zur
  Fehlererfassung), von dir entschieden, mit der Regel, dass sie keine personenbezogenen Daten
  enthalten.
- Akzeptabler Mindestzustand: die Fehler kommen schon mit Kennung heraus (16), und es gibt einen
  Kanal mit einer Person, die ihn liest.

> We are going to make sure that no error in production goes unseen. Using the records of step 16,
> set up: (1) centralized capture of every error and unhandled exception in the backend, in the jobs
> and in the user's browser, with the correlation id, the version, the environment, the actor (never
> personal data) and the stack; (2) grouping of errors by cause, so that one defect is one entry,
> with its count, first and last occurrence, versions affected and the flows it touches; (3) alerts
> to [channel] for every new error type, for a known error that crosses [N] occurrences per hour,
> and for any error inside a consequential action of `docs/LOCKS.md`; (4) a cyclic report, [weekly],
> generated automatically, with: new errors, recurring errors and their trend, the errors fixed in
> the period with their pending item, the error rate per flow against the previous period, and what
> you propose for each open one; (5) the rule that every new error type opens a corrective pending
> item, closed with the test that reproduces it in red, and that there is no "known error" without a
> pending item that says why it is tolerated and until when. Show me one error provoked on purpose
> in the test environment, in the browser, followed by its id to the backend record, the alert and
> the report. Tag every captured error with its source, and keep the errors of the tools that watch
> the system (the panel, the resident agent, the monitoring itself) apart from the errors of the
> system: the report lists them in a separate section, and only the system's errors open pending
> items. Document it in `docs/MONITORING.md`.
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
> Wir werden sicherstellen, dass kein Fehler in der Produktion ungesehen bleibt. Bau mit den
> Einträgen aus Schritt 16 auf: (1) die zentrale Erfassung jedes Fehlers und jeder unbehandelten
> Ausnahme im Backend, in den Aufgaben und im Browser des Nutzers, mit der Korrelations-ID, der
> Version, der Umgebung, dem Akteur (niemals personenbezogene Daten) und dem Stack; (2) die
> Gruppierung der Fehler nach Ursache, sodass ein Defekt ein Eintrag ist, mit seiner Anzahl,
> erstem und letztem Vorkommen, betroffenen Versionen und den Flüssen, die er berührt; (3) Alarme
> an [Kanal] für jeden neuen Fehlertyp, für einen bekannten Fehler, der [N] Vorkommen pro Stunde
> überschreitet, und für jeden Fehler innerhalb einer Aktion mit Konsequenz aus `docs/LOCKS.md`;
> (4) einen zyklischen Bericht, [wöchentlich], automatisch erzeugt, mit: neuen Fehlern,
> wiederkehrenden Fehlern und ihrem Trend, den im Zeitraum reparierten Fehlern mit ihrem offenen
> Posten, der Fehlerrate pro Fluss gegenüber dem vorigen Zeitraum, und dem, was du für jeden
> offenen vorschlägst; (5) die Regel, dass jeder neue Fehlertyp einen korrektiven offenen Posten
> eröffnet, geschlossen mit dem Test, der ihn rot reproduziert, und dass es keinen „bekannten
> Fehler“ ohne einen offenen Posten gibt, der sagt, warum er toleriert wird und bis wann. Zeig mir
> einen absichtlich in der Testumgebung provozierten Fehler, im Browser, dem seine ID bis zum
> Backend-Eintrag, zum Alarm und zum Bericht folgt. Kennzeichne jeden erfassten Fehler mit seiner
> Quelle und halte die Fehler der Werkzeuge, die das System beobachten (das Panel, der residente
> Agent, das Monitoring selbst), von den Fehlern des Systems getrennt: der Bericht führt sie in
> einem eigenen Abschnitt auf, und nur die Fehler des Systems öffnen offene Punkte. Dokumentiere es
> in `docs/MONITORING.md`.
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

**Die Fehler des Werkzeugs sind nicht die Fehler des Systems.** Die zentrale Erfassung trennt nach Quelle: die Fehler des Systems und die der Werkzeuge, die es beobachten (das Panel, der residente Agent, das Monitoring selbst), werden unter verschiedenen Quellen gespeichert, der Bericht führt sie in getrennten Abschnitten auf, und nur die Fehler des Systems öffnen offene Punkte. In der Übung Turnera öffnete der erste zyklische Bericht sechs "Bugs", die das Forge-Panel im Gespräch mit einem abgeschalteten Server waren. (Entscheidung D-038.)

Was ich hier verlange: die Erfassung an den drei Orten, an denen sich die Fehler verstecken
(Backend, Aufgaben, Browser), mit der Kennung aus der 16, um ihnen folgen zu können; die
Gruppierung, ohne die der Bericht eine Liste von zehntausend Zeilen ist; die drei Alarme, die
zählen (neu, wiederkehrend und wachsend, mit Konsequenz); den Bericht mit der Rate pro Fluss, die
die Zahl ist, die der Eigentümer versteht; die zwei Regeln; und den Beweis von Anfang bis Ende,
vom Browser bis zum Bericht.

**Routine jedes Zyklus (gehört in die Arbeitsvereinbarung):**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- Den gerade erzeugten zyklischen Fehlerbericht, von dir gelesen.
- `docs/PENDING.md` zur Hand, um zu prüfen, dass die wiederkehrenden Fehler einen offenen Posten
  haben.
- Akzeptabler Mindestzustand: du hast den Bericht gelesen, bevor du den Prompt eingefügt hast.

> With every cyclic error report: go through it with me; open the corrective pending items for
> the new errors, each with the way to reproduce it; confirm that every recurring error has a
> pending item or a written reason with a date; and tell me which errors disappeared and why,
> with the commit that fixed each one. An error that disappeared without a fix is not solved: it
> is hiding, and it stays in the report until its cause is known.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [de]
> Mit jedem zyklischen Fehlerbericht: geh ihn mit mir durch; eröffne die korrektiven offenen
> Posten für die neuen Fehler, jeden mit der Art, ihn zu reproduzieren; bestätige, dass jeder
> wiederkehrende Fehler einen offenen Posten oder eine geschriebene Begründung mit Datum hat; und
> sag mir, welche Fehler verschwunden sind und warum, mit dem Commit, der jeden einzelnen
> repariert hat. Ein Fehler, der ohne Reparatur verschwunden ist, ist nicht gelöst: er versteckt
> sich, und er bleibt im Bericht, bis seine Ursache bekannt ist.
>
> Wenn du eine Entscheidung von mir brauchst, stelle die Frage mit den vier Teilen von UX-28
> (`docs/ANEXO_HEURISTICAS.md`) und in dieser Reihenfolge: die Daten, die die Frage nötig machen,
> aufgelistet; ein Absatz von höchstens fünf Zeilen, der sie verbindet und die Frage sichtbar
> macht; die Frage selbst mit ihren möglichen Antworten durchnummeriert; und deine Empfehlung.
> Sage es in der technischen Tiefe, die das Projekt in `communication_depth` erklärt hat
> —`beginner`, `decision_maker` oder `technical`—; hat das Projekt keine erklärt, nimm
> `decision_maker`.

Was ich hier verlange: die Disziplin des Zyklus, und die Regel des Fehlers, der verschwindet, die
die kontraintuitivste ist und die am meisten wert ist: ein Fehler, der von allein ging, kommt von
allein zurück.

## 3. Erwartetes Ergebnis

- Zentrale Fehlererfassung im Backend, in den Aufgaben und im Browser, nach Ursache gruppiert,
  ohne personenbezogene Daten.
- Alarme bei neuem Fehler, bei wiederkehrendem, der wächst, und bei Fehlern mit Konsequenz.
- Der zyklische Bericht mit der Fehlerrate pro Fluss.
- `docs/MONITORING.md` vollständig (zusammen mit der 21); die Routine in der Vereinbarung.
- Ein offener Posten für jeden offenen Fehler; keiner „bekannt“ ohne offenen Posten.

## 4. Vollständigkeitsprüfung

- Provozier selbst einen Fehler im Browser in der Testumgebung (eine Aktion, von der du weißt,
  dass sie fehlschlägt): ist er in der Erfassung mit deiner Kennung erschienen, und ist der Alarm
  bei dir angekommen?
- Lies den letzten Bericht: gibt es irgendeinen wiederkehrenden Fehler ohne offenen Posten und
  ohne Begründung?
- Nimm einen „reparierten“ Fehler aus dem Bericht: hat sein offener Posten den Test, der ihn rot
  reproduziert hat?
- Ist die Fehlerrate pro Fluss da, und ist sie gegenüber dem vorigen Zeitraum gesunken oder
  gestiegen?
- Such ein personenbezogenes Datum in der Fehlererfassung: es darf nicht da sein.

## 5. Warnsignale

- Null Fehler in der Produktion während eines Monats mit echten Nutzern. So ein System gibt es
  nicht; die Erfassung sieht den Browser oder die Aufgaben nicht.
- Ein Fehler mit tausend Vorkommen und einem Kommentar „bekannt, stört nicht“. Ohne offenen
  Posten, ohne Datum.
- Die Fehler werden „repariert“, indem der Dienst neu gestartet wird. Sie verschwinden und kommen
  zurück.
- Den Fehlerbericht und den Ressourcenbericht lesen verschiedene Leute, und niemand kreuzt sie:
  die langsame Abfrage aus der 21 ist die Ursache für den abgelaufenen Timeout aus der 22.
