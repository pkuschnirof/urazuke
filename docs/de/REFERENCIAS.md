# Urazuke — Referenzen: die Fälle hinter der Methode

Autor: Pablo Kuschniroff, unterstützt von Claude Code. Version 4, 18. Oktober 2026.

Dieses Dokument existiert für eine Sache: damit die Verfahren und die Handbücher der Methode
sauber bleiben. Wenn ich im Hauptdokument, in einem Schrittvertrag oder in einer Lektion des
Kurses etwas behaupte wie „das habe ich auf die harte Tour gelernt“ oder „das habe ich
durchgesetzt, weil das Modell es schlecht anwandte“, will ich die Erklärung nicht mit Daten,
Commit-Kennungen und Nummern offener Posten verschmutzen. Ich setze eine kurze Marke, `[Ref. N]`,
und wer Lust hat, den Fall zu untersuchen, kommt hierher und findet ihn mit seinem Datum, seinem
Beleg und meiner Lesart dessen, was passiert ist. Wer keine Lust hat, liest weiter, ohne zu
stolpern.

Zwei Klarstellungen, bevor es losgeht. Die erste: die drei Systeme, aus denen diese Fälle stammen,
sind echt und heute in Produktion, mit echten Menschen, die sie benutzen. Die Kunden sind
anonymisiert, und ich nenne sie „die Krankenkasse“ (mit ihrem „Autorisierer“) und „der Verein“;
ihre Systeme nenne ich „Autorizaciones“ und „Kikan“. Das dritte Repository ist das Werkzeug, in dem
die Methode entstand, yujin-forge, das meines ist und seinen Namen trägt. Die Zahlen, die Daten und
die Commit-Kennungen sind echt; wenn ich eines Tages die Erlaubnis der Kunden habe, setze ich die
Namen ein.

Die zweite Klarstellung ist wichtiger, und ich wiederhole sie im Hauptdokument, weil ich nicht
will, dass sie missverstanden wird: **die Methode ist nicht nur aus der Kasuistik der Fehlschläge
entstanden**. Sie ist aus zwei Dingen entstanden, die sich verbunden haben. Einerseits aus meinem
eigenen Wissen über Systemtechnik, das ich seit lange vor diesen Modellen anwende; das meiste von
dem, was ich in den Schritten verlange, ist das, was ich in einem gut geführten Projekt immer
verlangt habe. Andererseits daraus, dass die Vorfälle dieser fünf Monate mir einer nach dem anderen
gezeigt haben, **wo die Modelle diese Prinzipien brüchig anwenden**: wo sie sagen, sie hätten
getestet, und nicht getestet haben, wo sie mit sicherer Miene schätzen, wo sie eine Lücke in den
Geschäftsregeln mit einem Einfall füllen, wo sie zu viel berichten. Die folgenden Fälle sind also
der Beweis dafür, wo nachgezogen werden muss, nicht der Ursprung der ganzen Methode. Lest sie mit
dieser Brille.

---

## Wie zitiert wird

In jedem Dokument der Methode verweist `[Ref. 26]` auf den Eintrag „Ref. 26“ dieser Datei. Die
Einträge sind nach Ursprungssystem gruppiert und innerhalb jeder Gruppe chronologisch geordnet. Am
Ende stehen drei vollständige Chronologien, falls jemand die ganze Abfolge sehen will, und eine
Tabelle, die jeden Fehlschlag dem Schritt zuordnet, der ihn abdeckt.

---

## A. yujin-forge: wo sich die Methode formte (Mai bis Oktober 2026)

### Ref. 1 — Die Qualitätsstandards entstehen (25. Mai)

Ich schrieb das erste Dokument der Qualitätsstandards, `SQ.md`, am 25. Mai (Commit `2219f7a`).
Es ist die erste „Arbeitsvereinbarung“ zwischen Mensch und Agent, und ich schrieb sie, weil ich
zwei Wochen lang dem Modell in jeder Sitzung dieselben Dinge wiederholt hatte: dass meine Zeit
heilig ist und nicht für das verbraucht wird, was es allein lösen kann; dass keine technischen
Schulden liegen bleiben, was bricht, wird an der Wurzel behoben; dass die Dokumentation aktuell
gehalten wird; dass der Umfang exakt ist, nicht mehr und nicht weniger als verlangt. Nichts davon
ist neu in der Systemtechnik. Neu war, es für einen Mitarbeiter aufschreiben zu müssen, der jeden
Morgen ohne Erinnerung an gestern ankommt. Es ist der Ursprung von Schritt 1.

### Ref. 2 — Das erste Register der Anti-Muster (27. Mai)

Am 27. Mai (Commit `73f4029`) eröffnete ich `GOTCHAS.md`: eine Datei, in der jeder Fehler, der sich
wiederholt hat, mit einem festen Format notiert wird: wie er riecht, was die Grundursache ist, wie
er behoben wurde, und wie man ihn nächstes Mal erkennt, bevor es wehtut. Ich eröffnete sie, weil
das Modell in verschiedenen Sitzungen denselben Fehler beging, ohne jede Erinnerung daran, ihn
schon einmal begangen zu haben. Es ist die Hälfte „Anti-Muster“ von Schritt 11.

### Ref. 3 — Die Tore des Arbeitsablaufs, nur injiziert, wenn sie zutreffen (2. Juni)

Am 2. Juni (Commit `5b47475`) definierte ich explizite Tore im Arbeitsablauf, nummeriert G1 bis G9,
und ein Dokumentationstor, G-DOC, das verlangt, dass die Dokumentation im selben Commit wie die
Änderung aktualisiert wird. Und ich traf eine Entscheidung, die sich als wichtig erwies: die
Doktrin jedes Tors tritt nur in dem Moment in den Prompt des Agenten ein, in dem sie zutrifft, nicht
immer, denn der Kontext ist endlich, und was zu viel injiziert wird, bezahlt man mit Aufmerksamkeit.
Es ist der direkte Vorläufer der Idee des „Schrittvertrags“, der beim Durchschreiten des Tors
injiziert wird.

### Ref. 4 — Die Testpolitik wird neu gefasst (4. Juni)

Bis zum 4. Juni bestand ich auf „erst der Test, dann der Code“ für alles. An diesem Tag (Commit
`a9f59c7`, Dokument `testing-policy.md`) akzeptierte ich, dass das nicht universell taugt:
standardmäßig kommen die Tests nach der Umsetzung, das Test-zuerst bleibt eine Option für kleine,
gut definierte Umfänge, das Skelett muss als Tor grün sein, und ich fügte einen Schleifenschutz
hinzu, ein Modal, das alles anhält, wenn der Agent sich im Kreis dreht, ohne voranzukommen. Ich
erzähle das, weil es zeigt, dass die Methode sich auch selbst korrigiert, wenn eine meiner Regeln
sich als zu starr erweist.

### Ref. 5 — Die Entscheidungen werden vor dem Bauen eingefroren (4. Juni)

Vor einem großen Sprint schrieb und nummerierte ich drei strukturelle Entscheidungen (D1, D2, D3)
in einem Entscheidungsdokument vom 4. Juni. Es war das erste Mal, dass ich etwas formalisierte, das
ich in klassischen Projekten immer getan hatte: die Entscheidung wird vor dem Bauen geschrieben,
mit Datum, damit sie später niemand aus dem Gedächtnis diskutiert. Es ist der Vorläufer von
Schritt 6.

### Ref. 6 — Ich schaffe das Multi-Agenten-Team ab, mit einer Zahl in der Hand (5. Juni)

Ich hatte ein Team aus fünf Agenten (Direktor, Analyst, Programmierer, Tester, Skelettbauer), die
sich Arbeit gegenseitig zuschoben. Ich machte ein gemessenes Experiment: dieses Team gab 60 Dollar
und 73 Minuten aus und lieferte etwas Halbfertiges; eine einzige Sitzung mit einem einzigen
Agenten brauchte 90 Minuten und lieferte etwas Veröffentlichbares. Am 5. Juni (Commit `7584f8b`,
dokumentiert in einem internen Papier) schaffte ich das ganze Team ab. Es ist der erste Fall von
„Retrospektive mit einer Zahl in der Hand, und Neuentwurf“, und es ist der Grund, warum Schritt 23
Zahlen verlangt und keine Eindrücke.

### Ref. 7 — Der Plan wird zur Liste der offenen Posten (6. Juni)

Am 6. Juni (Commit `4fc82c6`, Plan des Registers der offenen Posten) wurde der Arbeitsplan ZUR
Warteschlange der offenen Posten: eine kanonische, nummerierte Liste, mit Befehlen zu ihrer
Verwaltung, die in jeder Sitzung aufgefrischt wird. Es gab keinen „Plan“ auf der einen und
„Aufgaben“ auf der anderen Seite mehr. Es ist der Ursprung von Schritt 5.

### Ref. 8 — Verifikationsehrlichkeit und Arbeitsablauf-Typen (10. Juni)

Am 10. Juni (Commits `7ab9d8a` und `2c552c0`, Dokumente `verification-honesty.md` und
`workflow-kinds.md`) machte ich die Doktrin in jedem Prompt verpflichtend und schrieb die Regel der
„Verifikationsehrlichkeit“: prüfen, dass das Netz wirklich rot wird, wenn es rot werden muss, die
blinden Flecken erklären, und Behauptungen aufstellen, die dem Geprüften angemessen sind. Außerdem
trennte ich drei Arbeitsablauf-Typen: neues Projekt, Korrektur und Weiterentwicklung. Es ist der
Ursprung von Schritt 12 und der Hälfte „rot“ von Schritt 8.

### Ref. 9 — Verworfene Arbeit, weil die Karte nicht gelesen wurde (12. Juni)

Am 12. Juni begann eine Sitzung zu bauen, ohne den Wissensgraphen des Projekts zu lesen, und die
Arbeit eines ganzen Nachmittags war wegwerfbar, weil sie Entscheidungen widersprach, die schon
aufgeschrieben waren. Daher die Regel der Pflichtlektüre von Schritt 2: die Karte existiert, aber
wenn man nicht gezwungen wird, sie zu lesen, wirkt sie nicht.

### Ref. 10 — Autopiloten von 24 und 48 Stunden (14. bis 21. Juni)

Zwischen dem 14. und 21. Juni ließ ich den Agenten einen Tag lang allein arbeiten, und dann zwei,
mit einem schriftlichen Mandat: Commit und Push für jedes Stück, ohne zu fragen, und ich bekam eine
Zusammenfassung. Ich erzähle das, weil es beweist, dass die Methode lange Autonomie aushält, wenn
die Arbeitsvereinbarung und das Register der offenen Posten gut gemacht sind; und weil ich dort
gelernt habe, Zusammenfassungen mit Misstrauen zu lesen, was Schritt 12 ist.

### Ref. 11 — Diagnosemodus auf fremden Systemen (Juli)

Im Juli (Dokument `diagnostic-mode.md`) begann der Agent, in Produktionssysteme von Kunden im
Diagnosemodus einzutreten: nur lesend, begrenzt, ohne etwas anzufassen. Es ist die erste Stufe des
Umfangs des residenten Agenten von Schritt 23.

### Ref. 12 — Leistungsmuster, übernommen aus der Produktion der Krankenkasse (22. Juli)

Am 22. Juli (Commit `873339c`) nahm ich ins Werkzeug Skalierungsmuster auf, die aus dem System der
Krankenkasse extrahiert wurden: das der zwei Transaktionen und vor allem „messen, bevor man
anfasst“. Es war das erste Mal, dass sich die Methode aus einem System nährte, das schon in
Produktion war, und es ist ein Vorläufer von Schritt 7.

### Ref. 13 — Der Agent wird resident in der Produktion der Krankenkasse (14. August)

Am 14. August wurde der Agent innerhalb des Systems des Kunden installiert, als residenter
Assistent, mit drei Regeln: eine verpflichtende Systemkarte vor dem Betreiben, „zuerst die
betriebliche Lösung“, wenn etwas ausfällt, und die Fähigkeit, Tickets zu eröffnen. Es ist der
Ursprung der ersten Hälfte von Schritt 23.

### Ref. 14 — Die Dimensionierung als Tor (10. und 11. Oktober)

Am 10. und 11. Oktober (Commits `c602725` und `0bd1b05`, Dokument `sizing.md`) formalisierte ich
die Dimensionierung vor dem Bauen, mit Wahl aus festen Optionen, und hielt sie als ein weiteres Tor
fest (G9). Ich formalisierte sie spät, nach dem Rückschlag bei Kikan, den ich in Referenz 15
erzähle, und genau das ist die Lektion von Schritt 3.

### Ref. 15 — Die Persistenzschnittstelle asynchron ab der ersten Zeile (13. Oktober)

Am 13. Oktober (Commit `7391cc5`, Dokument `persistence-interface.md`) schrieb ich die Regel, dass
die Schnittstelle zur Datenbank ab der ersten Zeile asynchron ist, auch wenn die erste Engine
synchron ist. Es ist eine „asymmetrische“ Entscheidung: sie kostet wenig, wenn du dich irrst, und
sehr viel, wenn du sie nicht triffst. Ich weiß das, weil ich sie bei Kikan nicht rechtzeitig
getroffen habe und das spätere Ändern eine ganze Etappe der Neuentwicklung kostete, die E6, mit
drei Testbatterien auf asynchron umgestellt. Es ist ein Fall von Schritt 3.

### Ref. 16 — Der verwaiste Zug von einer Stunde dreiundvierzig (14. Oktober)

Am 14. Oktober arbeitete der Agent eine Stunde und dreiundvierzig Minuten lang für mich unsichtbar
und machte in dieser Zeit sechs Commits. Es war ein Versagen der Methode, und ein hässliches. Ich
behob es an der Wurzel in Version 1.18.0 (Commit `b80a659`): ein Stille-Wachhund, der den Zug
beendet, wenn er keine Lebenszeichen mehr gibt, eine Leine zwischen Prozessen, damit das Kind mit
dem Elternprozess stirbt, und 28 Tests. Es fällt in Schritt 12 (der Bericht muss sichtbar sein)
und in 12 (im Zweifel macht das System nicht weiter).

---

## B. Autorizaciones: die Methode unter echter Last (Juni bis Oktober 2026)

### Ref. 17 — Der anfängliche Entwurf, den das Repository überholte (11. Juni)

Autorizaciones begann mit einem Entwurfsdokument (die „Option C“). Das Repository überholte es
rasend schnell: das Gebaute war weit mehr, als das Papier sagte. Die Lektion, die mir blieb und die
in Schritt 5 steht, ist, dass die Spezifikation als Ausgangspunkt taugt und der lebende Plan die
offenen Posten sind.

### Ref. 18 — Das erste Audit der Abfragen ohne Index (23. Juni)

Am 23. Juni machte ich das erste Audit von „Full Scans“ (Abfragen, die die ganze Tabelle lesen,
weil es keinen Index gibt) an einem lebenden System. Die Befunde wurden zu offenen Posten, nicht zu
einem abgelegten Bericht. Es ist der Ursprung von Schritt 13.

### Ref. 19 — Lektionen aus der Google-Cloud (24. Juni)

Die Infrastrukturfehler der ersten Wochen in der Google-Cloud wurden als Lektionen aufgeschrieben,
um sie nicht zu wiederholen. Es ist die erste Fassung dessen, was später das Infrastrukturhandbuch
von Schritt 20 wurde.

### Ref. 20 — Das Benutzerhandbuch entsteht zusammen mit dem System (26. Juni)

Am 26. Juni gab es schon ein Benutzerhandbuch, bei halb gebautem System. Ich machte das mit
Absicht so: in den klassischen Projekten wurde das Handbuch am Ende geschrieben, wenn sich niemand
mehr an etwas erinnerte; mit einem Modell, das es gratis neu erzeugt, gibt es keine Entschuldigung
dafür, dass es nicht mit dem System entsteht. Schritt 20.

### Ref. 21 — Backup in zweiter Schicht (13. Juli)

Bevor ich dem System mit echten Daten vertraute, legte ich zwei Backup-Schichten an: eine lokale
und eine im Google-Speicher. Schritt 15 und Wiederherstellungshandbuch von 20.

### Ref. 22 — PND-300: vier Runden bis zur Grundursache (14. Juli)

Ein Bug kam dreimal zurück, bis am 14. Juli die wirkliche Ursache gefunden wurde. Jede vorherige
„Behebung“ hatte am Symptom angesetzt. Hier hörte „die Behebung ist an der Wurzel oder sie ist
keine Behebung“, was schon in der Arbeitsvereinbarung stand, auf, ein Satz zu sein, und wurde zur
Praxis: man muss die Hypothese messen, bevor man anfasst. Schritte 1 und 7.

### Ref. 23 — Sicherheitsaudit (16. Juli)

Am 16. Juli machte ich das erste formale Sicherheitsaudit, mit Befunden, die zu offenen Posten
wurden. Es war das, das mich überzeugte, Sicherheit als periodisches Audit zu behandeln und nicht
als Liste, die einmal am Anfang abgehakt wird. Schritt 13.

### Ref. 24 — Internes Handbuch und Handbuch zur Wiederherstellung nach Katastrophen (26. und 29. Juli)

Am 26. und 29. Juli (Commits `6444ce6`, offener Posten 442, und `a30cee3`, offener Posten 459)
ließ ich alles Betriebliche dokumentiert, deployen, wiederherstellen, warten, in der Form „von
Hand reproduzierbar, ohne KI“. Das Kriterium, das ich verwendete und das in Schritt 20 steht, ist,
dass, wenn es morgen keinen Agenten gibt, eine Vertrauensperson, die nicht programmiert, dem
Handbuch folgen kann.

### Ref. 25 — Das Fail-closed als Reflex (27. Juli)

Am 27. Juli (Commit `e18406d`, offener Posten 452): wenn eine Tabelle nicht existiert oder eine
Suche fehlschlägt, bleibt die Zeile einfach ohne ihren Knopf; nie bricht die ganze Liste. Im
Zweifel nicht handeln und nicht brechen. Und der Test dieser Korrektur wurde rot bewiesen „ohne
das try/except“, das heißt, es wurde gezeigt, dass ohne den Schutz die Liste brach. Schritte 8 und
14.

### Ref. 26 — Die Zähler, die nicht übereinstimmten: 1.355 gegen 1.234 (6. und 7. August)

Das ist für mich das vollständigste Beispiel für „mit Instrument verifizieren“. Ein Zähler auf dem
Bildschirm zeigte 1.355 Genehmigungen und die Abfrage an die Datenbank zeigte 1.234. Am 6. und 7.
August (Commits `ab3e529`, offener Posten 517, und `1f5feb9`, offener Posten 514) wurde die
Grundursache direkt auf der nur lesend zugänglichen Produktion verifiziert, die Differenz Zahl
für Zahl zerlegt (145 zu viel, 24 zu wenig; 145 minus 24 sind 121), ein Test geschrieben, der ROT
gegen das alte Kriterium bewiesen wurde, und das Diagnoseskript blieb im Repository für das nächste
Mal. Schritte 8, 11 und 7.

### Ref. 27 — Symmetrie zwischen Produzent und Konsument (6. August)

Am 6. August (Commits `50fe968`, offener Posten 510, und `7251129`, offener Posten 509) setzte ich
durch, dass der „Wartegrund“, den der Nutzer sieht, mit DENSELBEN Toren berechnet wird, mit denen
der Roboter entscheidet, und dass die Spaltenliste des Rasters vom Server definiert und vom Frontend
konsumiert wird. So können sie nicht auseinanderdriften. Es ist die Regel „jede Liste hat einen
einzigen Eigentümer“ von Schritt 11.

### Ref. 28 — Panikknopf mit Sperre, Trockenlauf des Genehmigers, Wächter mit Schutzvorrichtungen (7. August)

Am 7. August (Commit `0954740`, offener Posten 524) standen die Sperren des Systems: ein Panikknopf
mit doppelter Sicherung, der automatische Genehmiger, der zuerst im Trockenlauf lief (er tut alles
außer genehmigen und protokolliert, was er genehmigt hätte), und ein Wächter, der Hängengebliebenes
anstößt, mit Schutzvorrichtungen, um nicht zweimal anzustoßen. Schritt 14.

### Ref. 29 — Die Domänenregeln, im Commit geschrieben (10. August)

Am 10. August (Commit `0ae3ae6`, offener Posten 550) sagt die Commit-Nachricht wörtlich: „regla
Pablo: aprobada + saldo = vuelve“, „decisión Pablo 2026-08-10“. Die Geschäftsentscheidung blieb mit
Datum und Eigentümer, direkt am Code, der sie umsetzt. Schritt 6.

---

## C. Kikan: die reife Methode (August bis Oktober 2026)

### Ref. 30 — Start mit der schon geschriebenen Methode, und die Audit-Serie AUD-* (21. bis 29. August)

Kikan war das erste Projekt, das mit allem Vorherigen schon vom ersten Tag an geschrieben begann:
eine betriebliche Projektdatei und offene Posten als Plan vom ersten Commit an (21. August). Am 28.
und 29. August machte ich eine Serie früher Audits (AUD-1, AUD-2 …), die direkt zu 19 Dokumenten
offener Posten wurde. Schritte 2, 5 und 13.

### Ref. 31 — Continuous Integration ab der ersten Woche; Deployment als Paket (28. August, 23. und 24. September)

Die Tests liefen ab der ersten Woche auf GitHub (`ci.yml`, 28. August). Das Deployment kam am 23.
September (`deploy.yml`, Commit `bb801ed`): ein Paket, mit der Konfiguration, die auf dem
Server lebt und nicht im Repository, und der Runtime-Version festgenagelt. Dass das Deployment
einen Monat nach dem Start kam, ist der Fehler, der Schritt 4 motiviert.

### Ref. 32 — Das Deployment wird Schlag für Schlag mit offenen Posten gehärtet (30. September bis 4. Oktober)

Zwischen dem 30. September und dem 4. Oktober gab es fünf offene Posten in Folge, nur damit das
Deployment richtig funktionierte: die öffentliche URL in beiden Umgebungen (`f85c3c9`), den Dienst
vor dem Neustart und vor dem Zurückrollen neu laden (`513c8d0`, offener Posten 108), eine Fixture,
die abgleicht statt zu duplizieren (`076df76`, offener Posten 134), das Material des Kunden
außerhalb des gespiegelten Baums (`9d76af8`, offener Posten 130), und die Testbatterie, die die im
Deployment mitreisende Konfiguration nicht mehr verschmutzt (`0bd20a8`, offener Posten 107, 3.
Oktober). Wäre das Skelett in der ersten Woche leer deployt worden, hätten diese fünf Schläge
mit null Funktionalität auf dem Spiel getroffen. Schritte 4 und 15.

### Ref. 33 — Beförderung von UAT in die Produktion (4. und 8. Oktober)

Am 4. und 8. Oktober (Commits `4eb5ad7`, offener Posten 027, und `7658e2e`) stand ein expliziter
Kreislauf, um Konfiguration und Kampagnen von der Testumgebung in die Produktion zu bringen.
Schritt 15.

### Ref. 34 — Das aus dem Code abgeleitete Schema, mit Sperre (11. Oktober)

In Etappe 1 der Persistenz-Neuentwicklung (Commits `6113319` und `68819ce`) wurde das Inventar der
Tabellen und Felder aus dem Code selbst abgeleitet, mit einem Test, der es schützt, und am geteilten
Board eröffnet, damit ich es prüfe. Es ist eine Liste mit einem einzigen Eigentümer, dem Code.
Schritt 11.

### Ref. 35 — Die statische Ratsche, und das Messgerät, das nicht sah (11. bis 13. Oktober)

In Etappe 6 der Neuentwicklung (Commits `06b2734`, `f6e5221`, `2fc6239`, `1d55a93`) baute ich eine
„Ratsche“ ein: einen Zähler von Datenbankaufrufen ohne `await`, also ohne auf das Ergebnis zu
warten, der nur sinken und nie steigen kann. Und es passierte etwas, das es wert ist, erzählt zu
werden: ZWEIMAL wurde entdeckt, dass das Messgerät Teile des Codes nicht sah. Zuerst 70 Aufrufe,
dann 84, mit dem Zähler auf null. Wenn das Instrument nicht geprüft wird, beruhigt die Zahl und
lügt. Schritt 7.

### Ref. 36 — Die lügenden Messgeräte und die fünf Regeln von Abschnitt 11.b (13. und 14. Oktober)

Wörtlich aus den Commits vom 13. Oktober (`880ac0f`, `f955620`): „das Messgerät von E7.5 log über
eine Datenbank mit dem schon angewendeten ALTER“; „es sind 44, nicht 27“. Und ein paar Tage zuvor
behauptete ein Plan, es gebe 121 Schleifen eines bestimmten Typs, und wer ausführte, maß 79. Aus
all dem schrieb ich Abschnitt 11.b des Neuentwicklungsdokuments, mit den fünf Regeln, die heute
Schritt 7 sind: Messgerät mit Schutz; wenn das Instrument nicht existiert, wird es gebaut; es wird
in zwei Richtungen auditiert; das Näherungsweise wird markiert; und wer ausführt, verifiziert die
Zahlen dessen, der geplant hat. Mit dem Satz, der es zusammenfasst: „drei von vier Behauptungen
waren falsch; wo es ein Instrument gab, exakt“.

### Ref. 37 — Abfragebudget und die auf das Gemessene gezurrte Obergrenze (14. Oktober)

In Etappe 8 (Commits `5926b3f`, `10ada00`) bekam jeder Pfad der Anwendung ein gemessenes und durch
einen Test geschütztes Budget an Datenbankabfragen, und der Wechsel der Datenbank-Engine wurde zu
einem Schalter pro Umgebung. In Etappe 9 (`0730082`, `7f5f1af`) wurde die Obergrenze auf das
Gemessene plus eine kleine Marge gezurrt: 63 über 60. Das Budget ist keine erfundene Zahl.
Schritt 7.

### Ref. 38 — Aufbewahrung pro Tabelle, und ein Integritätsbericht von einer anderen Sitzung (14. Oktober)

In den Etappen 10 und 12 (Commits `f72b15a`, `b266f11`) brachte das echte Paket die
Migrationsskripte mit, die Datenaufbewahrung wurde pro Tabelle deklariert und in der Produktion
begrenzt, und ein Integritätsbericht, erstellt von einer anderen Sitzung von Claude Code, die das
System nicht gebaut hatte, wurde als offene Posten aufgenommen. Es ist der vom Bauenden
verschiedene Auditor von Schritt 13.

### Ref. 39 — Das Deployment verpackt nur, und das Kontingent, das verbrannte (14. Oktober)

Die Tests liefen dreimal pro Commit, jedes Mal zwischen 16 und 27 Minuten; in 16 Tagen wurden
2.000 Minuten Kontingent von GitHub Actions verbraucht, und ein Tag mit 23 Pushes verbrannte es
endgültig. Am 14. Oktober (Commit `39497b0`) teilte ich den Kreislauf: die Tests laufen EIN
einziges Mal, in der Continuous Integration; das Deployment wartet auf dieses Ergebnis und verpackt
nur. Von 16 bis 27 Minuten pro Commit auf 11. Schritt 15.

### Ref. 40 — Zwei Administrator-Türen in vierundzwanzig Stunden (15. Oktober)

Am 15. Oktober wurden an einem einzigen Tag zwei Administrator-Türen angelegt (offene Posten 223
und 257). Eine externe Prüfung entdeckte es; ich entfernte eine (Commits `69bdab2`, `20fdbe7`,
`1558ee4`) und es blieb ein einziger Weg. Ich erzähle das als Beleg dafür, dass die Methode
„schnelles Rückgängigmachen“ ohne Drama aushält, und dafür, warum das Audit jemand machen muss, der
nicht gebaut hat. Schritte 13 und 14.

### Ref. 41 — Das Qualitätsaudit: eine Schwachstelle, eine riesige Komponente, eine Projektdatei mit 9.661 Zeilen (15. Oktober)

Das Qualitätsaudit vom 15. Oktober fand eine bekannte Schwachstelle in einer Abhängigkeit, eine
Bildschirmkomponente mit 2.679 Zeilen, acht zwischen Web- und Mobilversion duplizierte Module, und
eine `CLAUDE.md`, die auf 9.661 Zeilen und 789 Kilobyte gewachsen war, eine Datei, die in diesem
Zustand niemand liest, auch nicht das Modell. Daher die Regel von Schritt 2: die Projektdatei ist
das Programm, nicht die Historie, und das Fallbuch gehört getrennt. Schritte 2, 11 und 13.

### Ref. 42 — In den Chat eingefügte Geheimnisse (14. und 16. Oktober)

Am 14. Oktober blieb ein Datenbankschlüssel in einem Transkript abgedruckt, und am 16. tauchten
API-Schlüssel in den Chat eingefügt auf. Keines von beiden wurde „von jemandem gesehen“, und beide
müssen trotzdem rotiert werden, denn ein Geheimnis, das in einem Chat, in einem Log oder in einem
Commit war, ist kein Geheimnis mehr. Schritt 15.

### Ref. 43 — Drei Berichte, die nicht waren, was sie sagten (14. bis 16. Oktober)

Drei kleine und sehr anschauliche Fälle für Schritt 12. Am 14. Oktober wurde ein
Authentifizierungsfehler vom Werkzeug mit der Aufschrift „success“ gemeldet. Am 16. wurde das CORS
des Servers nur aus dem ersten Domainnamen abgeleitet, und der Konfigurationsassistent der
Testumgebung gab einen Fehler 500, den der Bericht nicht erwähnte. Und die mobile Anwendung verlor
die Tabs unter Bedingungen, die der Bericht als verifiziert erklärte. Alle drei werden mit derselben
Regel korrigiert: das Verifizierte vom Geglaubten trennen und die blinden Flecken erklären.

### Ref. 44 — Die Batterie, die am Speicher starb und wie ein fehlgeschlagener Test aussah

Eine ganze Testbatterie „starb“ aus Speichermangel (Commit `1d7a20b`), und der Bericht las es als
einen Test, der fehlschlug. Erst als man sich die vollständige Ausgabe ansah, verstand man, dass
kein einziger Test fehlgeschlagen war: der Prozess war abgestürzt. Das ist der Grund, warum
Schritt 8 die Zahlen des Rot und des Grün verlangt, nicht nur das Urteil.

---

## D. Was ich in der Sitzung durchgesetzt habe, und was ich abgelehnt habe

### Ref. 45 — Vier Korrekturen, die ich in der Sitzung machte und die später Regeln wurden (Oktober)

Es gibt Regeln der Methode, die nicht aus einem Commit stammen, sondern aus Korrekturen, die ich
dem Agenten mitten in der Sitzung machte und die ich später formalisierte. Ich zitiere sie, weil
sie den zweiten Faktor des Ursprungs der Methode zeigen, mein eigenes Ingenieurskriterium gegenüber
der brüchigen Anwendung des Modells. „Messgerät mit Schutz, nicht grep“: eine Zahl, die eine
Entscheidung speist, wird mit einem Programm mit Test gemessen, nicht mit einer Textsuche. „Miss
die Hypothese, nicht nur das Symptom“: wenn ich eine Ursache in Form eines Eindrucks mitbringe,
muss man sie messen, bevor man baut, denn ich habe meist beim Symptom recht, und die Ursache liegt
meist daneben. „Prüf die Grenzen mit dem Log, nicht mit der Prosa“: eine Weigerung des Modells
beweist nicht, dass die Grenze angewendet wird; man muss den Aufruf erzwingen und die Aufzeichnung
lesen. Und „vergleich zuerst die veröffentlichte Version“: bei einem „ist immer noch kaputt“
nachsehen, welche Version dort läuft, wo ich das Problem sehe, bevor man erneut diagnostiziert.
Schritte 7 und 12.

### Ref. 46 — Die Projekte, die ich abgelehnt habe, und woher die Ausschlusskriterien stammen (17. Oktober)

Die beiden Ausschlusskriterien von Schritt 0 stammen nicht aus den Projekten, die ich angenommen
habe, sondern aus denen, die ich abgelehnt habe. Ich lehnte Alttechnologien ohne zugängliches
Repository oder mit Repositories, die keinem Standard folgen, ab, denn ohne Repository gibt es
keinen Ort, an dem der Beleg hinterlassen werden kann. Und ich lehnte Technologien ab, die sich
nicht Ende zu Ende testen lassen, bei denen man die Bildschirme nicht ausführen und auf jedes
Element der Oberfläche mit seinen verschiedenen Methoden zugreifen kann, um zu prüfen, dass die
Änderung im Backend angekommen ist. Ich stellte damals klar, und ich bleibe dabei, dass NAC3 nicht
verpflichtend ist: verpflichtend ist, aus der Ausführung der Bildschirme heraus zu testen.

---

## E. Vollständige Chronologien

Ich setze sie hierher, falls jemand die ganze Abfolge sehen will und nicht einen losen Fall. Jede
Zeile bringt den Beleg so, wie er in den Repositories steht.

### E.1 yujin-forge

| Datum | Moment | Was sich änderte | Beleg |
|---|---|---|---|
| 25. Mai | Die Qualitätsstandards entstehen | Erste Arbeitsvereinbarung: Zeit des Menschen, null Schulden, Dokumentation aktuell, exakter Umfang | `2219f7a` |
| 27. Mai | Erstes Register der Anti-Muster | Festes Format: Geruch, Grundursache, Behebung, Früherkennung | `73f4029` |
| 2. Juni | Tore G1 bis G9 und G-DOC | Die Doktrin tritt nur in den Prompt ein, wenn sie zutrifft | `5b47475` |
| 4. Juni | Testpolitik neu gefasst | Tests nach der Umsetzung standardmäßig; Skelett grün; Schleifenschutz | `a9f59c7`, `testing-policy.md` |
| 4. Juni | Entscheidungen vor dem Sprint eingefroren | D1, D2, D3 geschrieben und nummeriert | Entscheidungsdokument vom 4. Juni |
| 5. Juni | Das Multi-Agenten-Team wird abgeschafft | 60 Dollar und 73 Minuten gegen 90 Minuten | `7584f8b` |
| 6. Juni | Der Plan sind die offenen Posten | Kanonische, nummerierte Warteschlange, pro Sitzung aufgefrischt | `4fc82c6` |
| 10. Juni | Verpflichtende Doktrinen; Verifikationsehrlichkeit; Arbeitsablauf-Typen | Echtes Rot, blinde Flecken, angemessene Behauptungen | `7ab9d8a`, `2c552c0` |
| 14. bis 21. Juni | Autopiloten von 24 und 48 Stunden | Lange Autonomie mit schriftlichem Mandat | Sitzungsnotizen |
| 5. und 10. Juli | Diagnosemodus | Nur lesend auf fremden Systemen | `diagnostic-mode.md` |
| 22. Juli | Leistungshärtung | Skalierungsmuster aus der Produktion übernommen | `873339c` |
| 14. August | Residenter Agent in Produktion | Systemkarte, betriebliche Lösung zuerst, Tickets | Sitzungsnotizen |
| 10. und 11. Oktober | Dimensionierung als Tor | Feste Optionen, festgehalten | `c602725`, `0bd1b05` |
| 13. Oktober | Asynchrone Persistenzschnittstelle | Asymmetrische Entscheidung | `7391cc5` |
| 14. Oktober | Verwaister Zug von 1 h 43 → 1.18.0 | Stille-Wachhund, Leine zwischen Prozessen, 28 Tests | `b80a659` |

### E.2 Autorizaciones

| Datum | Moment | Was es beitrug | Beleg |
|---|---|---|---|
| 11. Juni | Anfängliches Entwurfsdokument | In Wochen vom Repository überholt | Entwurfsdokument |
| 23. Juni | Audit der Abfragen ohne Index | Befunde in offene Posten verwandelt | Auditdokument |
| 24. Juni | Lektionen aus der Google-Cloud | Infrastrukturfehler als Lektionen aufgeschrieben | Lektionsdokument |
| 26. Juni | Benutzerhandbuch | Entsteht mit dem System | Handbuch |
| 13. Juli | Backup in zweiter Schicht | Lokal und in der Cloud | Backup-Commit |
| 14. Juli | PND-300, vier Runden | Behebung an der Wurzel oder keine Behebung | offener Posten 300 |
| 16. Juli | Sicherheitsaudit | Periodisch, erzeugt offene Posten | Auditdokument |
| 26. und 29. Juli | Internes und Wiederherstellungshandbuch | Von Hand reproduzierbar, ohne KI | `6444ce6`, `a30cee3` |
| 27. Juli | Fail-closed als Reflex | Die Zeile bleibt ohne Knopf; die Liste bricht nicht | `e18406d` |
| 6. und 7. August | Zähler 1.355 gegen 1.234 | Grundursache auf der Produktion, roter Test, Skript im Repo | `ab3e529`, `1f5feb9` |
| 6. August | Produzent/Konsument-Symmetrie | Eine einzige Quelle für Gründe und Spalten | `50fe968`, `7251129` |
| 7. August | Panikknopf, Trockenlauf, Wächter | Sperren | `0954740` |
| 10. August | Domänenregeln im Commit | Mit Datum und Eigentümer | `0ae3ae6` |

### E.3 Kikan

| Datum | Moment | Was es beitrug | Beleg |
|---|---|---|---|
| 21. August | Start mit der geschriebenen Methode | Projektdatei und offene Posten vom ersten Tag an | erster Commit |
| 28. und 29. August | Serie AUD-* | 19 Dokumente offener Posten | Dokumente offener Posten |
| 28. August | Continuous Integration | Tests auf GitHub ab der ersten Woche | `ci.yml` |
| 23. und 24. September | Deployment als Paket | Konfiguration auf dem Server; feste Runtime | `deploy.yml`, `bb801ed` |
| 30. September bis 4. Oktober | Gehärtetes Deployment | Fünf offene Posten in Folge | `f85c3c9`, `513c8d0`, `076df76`, `9d76af8`, `0bd20a8` |
| 4. und 8. Oktober | Beförderung UAT nach PROD | Expliziter Kreislauf | `4eb5ad7`, `7658e2e` |
| 11. Oktober | Aus dem Code abgeleitetes Schema | Mit Sperre, am Board eröffnet | `6113319`, `68819ce` |
| 11. bis 13. Oktober | Statische Ratsche | Das Messgerät sah nicht: 70, dann 84 | `06b2734`, `f6e5221`, `2fc6239`, `1d55a93` |
| 13. Oktober | Lügende Messgeräte | „es sind 44, nicht 27“ | `880ac0f`, `f955620` |
| 14. Oktober | Abfragebudget; Obergrenze 63 über 60 | Gemessen plus eine Marge | `5926b3f`, `10ada00`, `0730082`, `7f5f1af` |
| 14. Oktober | Die fünf Regeln von 11.b | Messgerät mit Schutz, Audit in zwei Richtungen | Neuentwicklungsdokument, 11.b |
| 14. Oktober | Aufbewahrung pro Tabelle; externe Integrität | Bericht einer anderen Sitzung als offene Posten aufgenommen | `f72b15a`, `b266f11` |
| 14. Oktober | Das Deployment verpackt nur | Von 16–27 Minuten auf 11 | `39497b0` |
| 15. Oktober | Zwei Administrator-Türen | Eine in 24 Stunden entfernt | `69bdab2`, `20fdbe7`, `1558ee4` |
| 15. Oktober | Qualitätsaudit | Schwachstelle, Komponente mit 2.679 Zeilen, Datei mit 9.661 Zeilen | Auditdokument |

---

## F. Jeder Fehlschlag, und der Schritt, der ihn abdeckt

Diese Tabelle ist in gewisser Weise der Beweis der Leiter: jeder Schlag muss in irgendeinen Schritt
fallen. Tauchte einer auf, der in keinen fällt, würde ein Schritt fehlen.

| Fehlschlag | Referenz | Schritt, der ihn abdeckt | Stand |
|---|---|---|---|
| Das Multi-Agenten-Team, das das Doppelte ausgab und die Hälfte lieferte | Ref. 6 | 23, Retrospektive mit Zahlen | geschlossen |
| Verworfene Arbeit, weil die Karte nicht gelesen wurde | Ref. 9 | 2, Pflichtlektüre | geschlossen |
| PND-300: drei Behebungen, die nicht an der Wurzel waren | Ref. 22 | 1, null Schulden; 7, messen | geschlossen |
| Zähler 1.355 gegen 1.234 | Ref. 26 | 7, Instrument; 11, Symmetrie | geschlossen |
| 3,4 Millionen Zeilen pro Jahr auf JSON-Dateien | Ref. 15 | 3, dimensionieren | geschlossen |
| Lügende Messgeräte; Ratsche auf null | Refs. 35 und 36 | 7, das Instrument prüfen | geschlossen |
| Verwaister Zug von 1 h 43 | Ref. 16 | 12 und 14 | geschlossen |
| Tests dreimal pro Commit; verbranntes Kontingent | Ref. 39 | 15 | geschlossen; das Kontingent muss erweitert werden |
| Zwei Administrator-Türen in 24 Stunden | Ref. 40 | 13 und 14 | geschlossen |
| In den Chat eingefügte Geheimnisse | Ref. 42 | 15 | Rotation ausstehend |
| Authentifizierungsfehler als Erfolg gemeldet | Ref. 43 | 12 | ausstehend, eine Zeile |
| Projektdatei mit 9.661 Zeilen | Ref. 41 | 2 | ausstehend |
| CORS der ersten Domain; Konfigurationsassistent mit Fehler 500 | Ref. 43 | 15 und 11 | Anwendung ausstehend |
| Die mobile Anwendung verliert Tabs | Ref. 43 | 12 und 14 | Diagnose gemacht; Korrektur ausstehend |
| Abfragen ohne Index auf einem lebenden System | Ref. 18 | 13 und 17 | geschlossen |
| Sicherheitsaudit einmal gemacht, nicht als Routine | Ref. 23 | 13 und 18 | geschlossen; der Zeitplan ist neu |
| Obergrenze auf das Gemessene gezurrt; Kontingent verbrannt, ohne dass jemand hinsah | Refs. 37 und 39 | 7, 15 und 21 | geschlossen |
| Der verwaiste Zug wurde über das Log gefunden, nicht über den Code | Ref. 16 | 16 und 22 | geschlossen |
