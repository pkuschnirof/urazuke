# Schritt 19 — Lasttests im Volumen und Bruchpunkt (Schrittvertrag)

**Abschnitt:** Produktionsfreigabe.
**Wann:** in der Phase der Produktionsfreigabe, nach der 16 (ohne Beobachtbarkeit weiß man nicht,
was kaputtgegangen ist) und nach der 17 (auf der bereits optimierten Persistenz), und vor dem
ersten Deployment in die Produktion. Er wiederholt sich vor jedem Deployment, das die
Architektur, die Persistenz oder einen kritischen Fluss ändert, und wenn sich die Dimensionierung
ändert (es wird an einen weiteren Kunden verkauft, das Volumen verdoppelt sich). In einem
Altsystem läuft er mit den in N6 gemessenen Volumina, vor dem ersten Deployment nach der
Normalisierung.
**Form:** ein einziger Durchgang; der Agent lädt, misst und bricht; du liest die Zahlen und den
Bruchpunkt.
**Größe:** proportional: in einem kleinen Projekt ein Durchlauf im erwarteten Volumen und einer im
„mal zehn“; in einem mit Konsequenzen vollständig, mit gefundenem Bruchpunkt und mit den für das
Monitoring festgehaltenen Schwellenwerten.

## Wozu er dient

Schritt 3 hat mit Rechnungen dimensioniert; dieser Schritt überprüft die Rechnungen mit dem echten
laufenden System. Ich will drei Dinge wissen, bevor der erste Nutzer hereinkommt: wie sich das
System bei dem Volumen verhält, das das Geschäft genannt hat (antwortet der meistbenutzte
Bildschirm in dem, was der Eigentümer tolerieren würde?), wie es sich beim „mal zehn“ verhält
(hält es aus, oder was hält als Erstes nicht mehr?), und **wo es bricht**: die genaue Last, bei
der etwas nachgibt, und was dieses Etwas ist (die Verbindungen zur Datenbank, der Speicher, eine
Warteschlange, eine Blockade). Der Bruchpunkt ist die nützlichste Zahl des ganzen Abschnitts, denn
aus ihm kommen die Alarm-Schwellenwerte von Schritt 21: ein „nach Augenmaß“ gesetzter Alarm meldet
zu spät oder meldet immer; ein Alarm, der unter dem gemessenen Bruchpunkt gesetzt ist, mit einem
Spielraum, meldet, solange noch Zeit ist. Die Skalierungsmuster, die ich aus einem System in
Produktion gezogen habe [Ref. 12](../REFERENCIAS.md#ref-12), und die Batterie, die am Speicher
starb und wie ein fehlgeschlagener Test aussah [Ref. 44](../REFERENCIAS.md#ref-44), sind die
beiden
Vorläufer: der erste vom Messen der echten Last; der zweite davon, dass sich ein nicht
rechtzeitig gefundener Bruchpunkt als etwas anderes verkleidet.

**Wenn du Anfänger bist.** Ein *Lasttest* ist ein Programm, das viele Nutzer simuliert, die das
System gleichzeitig benutzen, um zu sehen, was passiert. *Durchsatz* (throughput) ist, wie viele
Aktionen pro Sekunde es aushält. *Latenz* ist, wie lange eine Aktion zum Antworten braucht; man
sieht sich den *Median* an (die Hälfte der Aktionen brauchte weniger als das) und das *95.
Perzentil* (95 % brauchten weniger als das; die restlichen 5 % sind die Nutzer, die sich
beschweren). Der *Bruchpunkt* ist die Lastmenge, bei der etwas aufhört zu funktionieren: nicht
„es wird langsam“, sondern „die Verbindungen zur Datenbank waren erschöpft“ oder „der Speicher
war voll“. Und ein *Schwellenwert* ist eine Grenzzahl, ab der das Monitoring meldet.

## 1. Benötigter Kontext

Was folgt, ist die generische Liste. Die konkreten Dateien, die du vor jedem Prompt fertig haben
musst, mit ihrem Inhalt und ihrem Mindestzustand, stehen in Abschnitt 2, in dem Block „Bevor du
den Prompt schickst“, der jedem einzelnen vorangeht.

- Die Dimensionierung (Schritt 3 oder N6): das erwartete Volumen und das „mal zehn“.
- Die Beobachtbarkeit (16) eingeschaltet, um zu sehen, was bricht.
- Die optimierte Persistenz (17) mit ihren Budgets.
- Eine Testumgebung, die der Produktion in den Ressourcen ähnlich ist, oder das Bewusstsein
  darüber, worin sie sich unterscheidet.
- Die kritischen Flüsse (die des semantischen Baums, oder die der Charakterisierung in einem
  Altsystem).

## 2. Prompts

**Zu Beginn (laden, messen, brechen):**

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- `docs/SIZING.md` mit dem erwarteten Volumen (gleichzeitige Nutzer in der Spitze, Ereignisse pro
  Stunde, Zeilen pro Tabelle) und dem „mal zehn“: das sind die beiden Laststufen.
- Die Liste der kritischen Flüsse für die Lücke im Prompt, von dir aus dem semantischen Baum
  geschrieben: die, die am meisten benutzt werden, und die, die Konsequenzen haben. Zwischen drei
  und sechs.
- Eine Testumgebung mit Ressourcen, die mit der Produktion vergleichbar sind, oder, wenn das nicht
  möglich ist, in `docs/ENVIRONMENTS_SURVEY.md` notiert, worin sie sich unterscheidet (die Hälfte
  des Speichers, eine andere Datenbank), damit die Zahlen mit dieser Korrektur gelesen werden.
- Daten im erwarteten Volumen in der Testumgebung (dasselbe Skript wie in Schritt 17).
- Deine Toleranz, mit dem Eigentümer: wie lange der meistbenutzte Bildschirm brauchen darf, damit
  das Geschäft es als annehmbar ansieht (zwei Sekunden, fünf). Ohne diese Zahl lassen sich die
  Ergebnisse nicht beurteilen.
- Akzeptabler Mindestzustand: du kennst die beiden Laststufen, die kritischen Flüsse und die
  Toleranz.

> We are going to find out how this system behaves at the volumes of `docs/SIZING.md`, and where
> it breaks. In the test environment, with the observability of step 16 on and the data loaded at
> the expected volume: (1) write a load script that lives in the repository and drives the
> critical flows [list] from the screen or the API as users would, with a configurable number of
> concurrent users and duration, and with a test that proves the script really exercises each
> flow (the backend effect appears); (2) run it at the expected volume and show me, per flow:
> throughput, median and 95th percentile latency, error rate, and the resource usage of the
> server and the database during the run; (3) run it at ten times the expected volume and show me
> the same; (4) raise the load step by step until something breaks, and tell me exactly what
> broke first (database connections, memory, a queue, a lock, the disk) and at which load: that
> is the breaking point; (5) compare every number with the budgets of `docs/PERSISTENCE.md`, with
> the tolerance I gave you ([tolerance] for the most used screen) and with the sizing assumptions,
> and tell me which assumption was wrong, if any. Do not optimize anything yet. Write
> `docs/PERFORMANCE_[date].md` with the numbers, the commands, the breaking point and your
> diagnosis of the first bottleneck.
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
> Wir werden herausfinden, wie sich dieses System bei den Volumina von `docs/SIZING.md` verhält,
> und wo es bricht. In der Testumgebung, mit der Beobachtbarkeit aus Schritt 16 eingeschaltet und
> den Daten im erwarteten Volumen geladen: (1) schreib ein Lastskript, das im Repository lebt und
> die kritischen Flüsse [Liste] vom Bildschirm oder von der API aus bedient, so wie es die Nutzer
> tun würden, mit einer konfigurierbaren Anzahl gleichzeitiger Nutzer und einer konfigurierbaren
> Dauer, und mit einem Test, der beweist, dass das Skript jeden Fluss wirklich ausübt (die Wirkung
> im Backend erscheint); (2) lass es im erwarteten Volumen laufen und zeig mir, pro Fluss:
> Durchsatz, mediane Latenz und 95. Perzentil, Fehlerrate, und die Ressourcennutzung des Servers
> und der Datenbank während des Durchlaufs; (3) lass es beim Zehnfachen des erwarteten Volumens
> laufen und zeig mir dasselbe; (4) fahr die Last Stufe für Stufe hoch, bis etwas bricht, und sag
> mir genau, was zuerst gebrochen ist (Verbindungen zur Datenbank, Speicher, eine Warteschlange,
> eine Blockade, die Platte) und bei welcher Last: das ist der Bruchpunkt; (5) vergleich jede Zahl
> mit den Budgets von `docs/PERSISTENCE.md`, mit der Toleranz, die ich dir gegeben habe
> ([Toleranz] für den meistbenutzten Bildschirm) und mit den Annahmen der Dimensionierung, und sag
> mir, welche Annahme falsch war, falls eine. Optimiere noch nichts. Schreib
> `docs/PERFORMANCE_[Datum].md` mit den Zahlen, den Befehlen, dem Bruchpunkt und deiner Diagnose
> des ersten Flaschenhalses.
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

Was ich hier verlange: ein Lastskript, das ein weiteres Messgerät ist (es lebt im Repository und
hat einen Test, denn ein Lastskript, das den Fluss nicht ausübt, misst die Luft); drei Durchläufe
(erwartet, mal zehn, bis es bricht); die Zahlen mit Befehlen; den Vergleich mit den Budgets, der
Toleranz des Geschäfts und den Annahmen der Dimensionierung, und genau da entdeckt man, dass sich
Schritt 3 in etwas geirrt hat; und **noch nichts optimieren**, denn optimieren, ohne die Diagnose
gelesen zu haben, heißt das zu ändern, was es nicht war.

**Zum Abschluss (Schwellenwerte und offene Posten):**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- `docs/PERFORMANCE_[Datum].md`, von dir gelesen, mit der Toleranz des Geschäfts daneben: bleibt
  der meistbenutzte Bildschirm im erwarteten Volumen im Tolerierbaren? Und beim „mal zehn“?
- Mit dem Eigentümer die Entscheidung über das „mal zehn“: wenn das Geschäft zu wachsen plant,
  sind die Flaschenhälse unterhalb des „mal zehn“ jetzt offene Posten; wenn nicht, können sie
  warten, mit Datum.
- Akzeptabler Mindestzustand: du hast den Bruchpunkt gelesen und entschieden, welche Flaschenhälse
  jetzt repariert werden.

> Record in `docs/PERFORMANCE.md`: the expected volume, the ten-times volume, the breaking point
> with what breaks, and the alert thresholds that monitoring (step 21) will use, set below the
> breaking point with a margin and above the expected volume. Open a pending item for each
> bottleneck that sits below [ten times the expected volume / the volume I decided], with the
> measured number as its acceptance criterion. Make the load test a gate in `docs/GATES.md`: it
> reruns before every deployment that changes the architecture, the persistence or a critical
> flow, and its results are archived with date and version. Show me the first run archived.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [de]
> Halt in `docs/PERFORMANCE.md` fest: das erwartete Volumen, das zehnfache Volumen, den Bruchpunkt
> mit dem, was bricht, und die Alarm-Schwellenwerte, die das Monitoring (Schritt 21) benutzen
> wird, gesetzt unter den Bruchpunkt mit einem Spielraum und über das erwartete Volumen. Eröffne
> einen offenen Posten für jeden Flaschenhals, der unterhalb von [dem Zehnfachen des erwarteten
> Volumens / dem Volumen, das ich entschieden habe] liegt, mit der gemessenen Zahl als
> Abnahmekriterium. Mach aus dem Lasttest ein Tor in `docs/GATES.md`: er läuft vor jedem
> Deployment erneut, das die Architektur, die Persistenz oder einen kritischen Fluss ändert, und
> seine Ergebnisse werden mit Datum und Version archiviert. Zeig mir den ersten archivierten
> Durchlauf.
>
> Wenn du eine Entscheidung von mir brauchst, stelle die Frage mit den vier Teilen von UX-28
> (`docs/ANEXO_HEURISTICAS.md`) und in dieser Reihenfolge: die Daten, die die Frage nötig machen,
> aufgelistet; ein Absatz von höchstens fünf Zeilen, der sie verbindet und die Frage sichtbar
> macht; die Frage selbst mit ihren möglichen Antworten durchnummeriert; und deine Empfehlung.
> Sage es in der technischen Tiefe, die das Projekt in `communication_depth` erklärt hat
> —`beginner`, `decision_maker` oder `technical`—; hat das Projekt keine erklärt, nimm
> `decision_maker`.

Was ich hier verlange: die Alarm-Schwellenwerte, abgeleitet aus dem Bruchpunkt, was die
Verzahnung mit Schritt 21 ist; die Flaschenhälse als offene Posten mit der Zahl als Kriterium (so
werden sie mit Belegen geschlossen und nicht mit „jetzt läuft es besser“); und den Lasttest als
archiviertes Tor, damit man in sechs Monaten vergleichen kann.

## 3. Erwartetes Ergebnis

- Das Lastskript im Repository, mit Test.
- `docs/PERFORMANCE_[Datum].md` mit den drei Durchläufen, den Zahlen, dem Bruchpunkt und der
  Diagnose; `docs/PERFORMANCE.md` mit den Schwellenwerten und dem Tor.
- Ein offener Posten pro Flaschenhals unterhalb des entschiedenen Volumens.
- Der Lasttest als Tor vor den Deployments, die ihn verlangen.

## 4. Vollständigkeitsprüfung

- Braucht der meistbenutzte Bildschirm im erwarteten Volumen weniger als die Toleranz des
  Eigentümers? Wenn nicht, gibt es einen offenen Posten mit dieser Zahl.
- Sagt der Bruchpunkt, was gebrochen ist und bei welcher Last, oder sagt er „das System wurde
  langsam“?
- Liegen die Schwellenwerte aus `docs/PERFORMANCE.md` unter dem Bruchpunkt und über dem erwarteten
  Volumen?
- Lass selbst das Skript im erwarteten Volumen laufen, mit dem Befehl, den er dir gegeben hat:
  ähneln sich die Zahlen?
- Unterscheidet sich die Testumgebung in den Ressourcen von der Produktion, und ist notiert, wie?

## 5. Warnsignale

- „Es hält das mal zehn ohne Probleme aus“ ohne einen Bruchpunkt. Wenn er nicht gefunden hat, wo
  es bricht, hat er die Last nicht weit genug hochgefahren.
- Das Lastskript geht auf die API, aber nicht über den Bildschirm, in einem System, in dem der
  Bildschirm das ist, was lädt. Es misst etwas anderes.
- Die Ergebnisse stammen aus einem Durchlauf auf der Maschine des Agenten, nicht in der
  Testumgebung.
- Während des Tests wurden Flaschenhälse repariert, „wo man schon mal dabei war“. Jetzt weißt du
  nicht, welche Zahl zu welcher Version gehört.
