# Urazuke — der Junior-Entwickler in der Ära nach dem Programmieren von Hand: was sich an seiner Ausbildung ändert, mit welchem Ziel man ihn ausbildet und wie

Autor: Pablo Kuschniroff, unterstützt von Claude Code. Version 1, 18. Oktober 2026. Dieses
Dokument begleitet das [Hauptdokument](ESCALERA_METODOLOGICA.md) der Methode und die zwei Teile
des Kurses ([neues Projekt](MANUAL_CURSO.md), [geerbtes Projekt](MANUAL_CURSO_EVOLUTIVO.md)). Es
ist für drei Leser geschrieben: für den, der ein Team führt und entscheiden muss, was er den
Leuten beibringt, die neu dazukommen; für den, der unterrichtet oder Mentoring macht; und für den
Junior selbst, der wissen will, wozu er werden soll. Die seltsamen Wörter stehen im Glossar des
Hauptdokuments. Öffentliches Repository:
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## Warum ich das schreibe

Dreißig Jahre lang wurde ein Junior-Entwickler auf eine einzige Weise ausgebildet: indem er unter
Aufsicht Code schrieb. Er kam herein und konnte eine Sprache halb, man gab ihm kleine, begrenzte
Aufgaben, ein Senior sah seinen Code durch, und in zwei oder drei Jahren des Schreibens und
Korrigiertwerdens lernte er das Handwerk. Der Code war zugleich die Arbeit und die Schule.

Das ist vorbei, und nicht, weil man keine Juniors mehr bräuchte, sondern weil **das Modell den
Code schreibt**. Mit meiner Methode liest der, der baut, den Code nicht: er verlangt Belege. Also
ist die Frage, die man mir stellt und die ich mir stelle, ehrlich und dringend: wenn der Junior
den Code nicht mehr schreibt, wie lernt er dann? Und was lernt er? Und um was zu werden?

Ich habe eine Antwort, und ich schreibe sie von zwei Orten aus. Der eine sind die drei Systeme,
die ich so gebaut habe, in denen ich der einzige Mensch war und wo ich, Vorfall für Vorfall,
gesehen habe, welche Fähigkeiten mich gerettet haben und welche ich nicht gebraucht habe. Der
andere sind die Jahre, in denen ich Systemtechnik unterrichtet habe, bevor es die Modelle gab:
vieles von dem, was man einem Junior heute beibringen muss, ist das, was die klassische
Systemtechnik immer gelehrt hat und was die Branche nicht mehr praktizierte, als das Handwerk zum
„Programmieren“ wurde. Das Modell zwingt uns, zu dem zurückzukehren, was das Handwerk war, bevor
die Tastatur es verdeckt hat.

Eine Warnung, damit man mich nicht falsch versteht: ich sage nicht, dass der Junior nicht
programmieren können muss. Ich sage, dass er **sich nicht mehr durch Programmieren ausbildet**,
und dass das, was er vom Programmieren wissen muss, seine Natur ändert: vom Handwerk zur
Alphabetisierung.

## Was ein Junior gemacht hat, und was er jetzt macht

| | Früher | Jetzt, mit der Methode |
|---|---|---|
| **Was er produziert** | Code, unter Aufsicht. | Belege: Vereinbarungen, semantische Bäume, spezifizierte offene Posten, Vollständigkeitsprüfungen, geschriebene Entscheidungen. Den Code produziert das Modell. |
| **Wie er lernt** | Indem er schreibt und Korrekturen zum Code bekommt. | Indem er das Modell Schritt für Schritt führt und Korrekturen zu dem Beleg bekommt, den er verlangt hat, und zu dem, den er ohne Verlangen akzeptiert hat. |
| **Was der Senior prüft** | Seinen Code. | Sein Urteilsvermögen: was er vom Modell verlangt hat, was das Modell angenommen hat, ohne dass er es bemerkte, was er ohne Beweis als „fertig“ akzeptiert hat. |
| **Was sein typischer Fehler ist** | Ein Bug. | Dem Modell zu glauben. |
| **Wie lange er braucht, um nützlich zu sein** | Monate, bis er Code schreibt, den man nicht neu schreiben muss. | Wochen, wenn er über die Methode einsteigt: das erste kleine Projekt mit den zweiundzwanzig Schritten macht ihn einsatzfähig. |
| **Wozu er wird** | Zu einem Programmierer, der mehr Sprachen und Frameworks kann. | Zu jemandem, der für ein System geradestehen kann, ohne eine Zeile geschrieben zu haben: ein Systemtechniker, der Modelle führt. |

## Die Auswirkung auf die Schwerpunkte der Ausbildung

Ich sage es zuerst in einem Satz und zerlege es dann: **an Gewicht verliert alles, was das Modell
besser kann als ein Junior mit zwei Jahren Erfahrung, und an Gewicht gewinnt alles, was das
Modell schlecht macht und wozu es die Methode gibt**. Diese zweite Liste habe ich nicht erfunden:
sie ist die Liste der Fehler aus dem Referenzdokument, umgekehrt betrachtet. Jeder Fehler des
Modells ist eine Fähigkeit, die der Mensch haben muss.

### Die Schwerpunkte, die an Gewicht verlieren

- **Die Syntax und die Sprachen.** Eine Sprache „auswendig“ zu können war die Hälfte der
  Ausbildung. Nicht mehr: das Modell schreibt in jeder, besser und schneller. Was bleibt, ist,
  sie *lesen* zu können, was etwas anderes ist (siehe weiter unten).
- **Die Frameworks und die Bibliotheken.** Die API einer Bibliothek zu kennen war Marktwert. Das
  Modell kennt sie ganz, mit ihren Versionen. Der Junior muss wissen, dass es sie gibt, wozu sie
  dienen und wann man eine wählt, nicht, wie jede Funktion heißt.
- **Das Tippen und die Schreibproduktivität.** Tastenkürzel des Editors, Autovervollständigung,
  das Gerüst von Hand erzeugen. Als Schwerpunkt verschwunden.
- **Das zeilenweise Debuggen als Hauptberuf.** Es gibt es weiter, aber es wechselt den Platz:
  jetzt ist es das letzte Werkzeug, wenn der Beleg (das Log, der rote Test, das Messgerät) nicht
  gereicht hat.
- **Das Gedächtnis für „wie macht man dieses und jenes“.** Muster, Rezepte, Tricks. Das Modell hat
  sie alle.

### Die Schwerpunkte, die an Gewicht gewinnen

Ich ordne sie nach dem Schritt, in dem sie geübt werden, denn das ist die Art, sie zu lehren.

1. **Anforderungstechnik** (Schritte 0, 2, 3, 5). Einen Eigentümer interviewen, der nicht weiß,
   was er will, in Prosa schreiben, was er will, Anwendungsfälle benennen, den semantischen Baum
   des Geschäfts bauen, einen offenen Posten mit seinen Abnahmekriterien in der Form „gegeben,
   wenn, dann“ spezifizieren, ein primäres Datum von einem abgeleiteten unterscheiden und das
   primäre verlangen, statt es zu schätzen. Das ist die Fähigkeit Nummer eins, und sie ist die,
   die die Branche vor zwanzig Jahren aufgehört hat zu lehren. Das Modell ist darin von Haus aus
   miserabel: es füllt die Lücken mit dem Wahrscheinlichsten, und das Wahrscheinlichste ist nicht
   das, was das Geschäft braucht.
2. **Entwurf der Verifikation** (Schritte 7, 9, 10, 19). Nicht den Test schreiben: wissen, welcher
   Test was beweist, warum ein Test rot gesehen werden muss, bevor er etwas wert ist, was eine
   Ende-zu-Ende-Prüfung ist und was eine Simulation, die nichts beweist, welche Zahl etwas
   entscheidet und mit welchem Instrument sie gemessen wird, wie man einen Bericht liest und das
   Verifizierte vom Geglaubten unterscheidet. Der Junior muss sagen können „dieser Test beweist
   nicht, was du sagst“, ohne den Test zu lesen.
3. **Lesen von Belegen** (alle Schritte). Einen Bericht des Modells mit trainiertem Misstrauen
   lesen: die Behauptung ohne Beweis finden, das als verifiziert verkleidete „sollte
   funktionieren“, den nicht erklärten blinden Fleck, das „fertig“, das keines war
   [Ref. 43](REFERENCIAS.md#ref-43). Diese Fähigkeit gab es als Ausbildungsschwerpunkt nicht, weil
   es niemanden gab, der mit so viel Sicherheit und so guter Formulierung log.
4. **Dimensionierung und Betrieb** (Schritte 3, 4, 13, 16 bis 21). Was eine Umgebung ist, wie
   deployt wird, was Continuous Integration ist, was in der Produktion gemessen wird, was ein
   Index ist, ein Bruchpunkt, ein Alarm-Schwellenwert. Früher war das das Gebiet einer anderen
   Rolle; jetzt führt der Junior das Modell, das es macht, und er muss wissen, was er von ihm
   verlangen muss und wie er prüft, dass es gemacht wurde.
5. **Sicherheit und Konsequenz** (Schritte 12, 18). Welche Aktionen des Systems auf die Welt
   wirken, was eine Sperre ist, was fail-closed ist, was eine Schwachstelle ist und warum eine
   Aktualisierung einer Abhängigkeit eine Änderung ist.
6. **Entscheidung und Kommunikation mit dem Eigentümer** (Schritte 1, 6, 14). Gut fragen, mit
   Empfehlung und Alternative; eine Entscheidung mit wörtlichen Worten, Datum und Eigentümer
   schreiben; ein Handbuch schreiben, dem eine Person folgen kann, die nicht programmiert. Der
   Junior ist in der Methode der Übersetzer zwischen dem Eigentümer und dem Modell, und die
   Übersetzung geht in beide Richtungen.
7. **Instrumentelles Englisch.** Die Prompts der Methode sind auf Englisch, weil die Modelle
   Anweisungen auf Englisch präziser befolgen. Man muss es nicht sprechen; man muss einen Prompt
   lesen und jede Klausel verstehen können, und eine neue Klausel schreiben können, wenn der Fall
   es verlangt.
8. **Der Katalog der Fehler des Modells.** Jede Art, auf die sich das Modell irrt, am Geruch
   erkennen: es nimmt an, statt zu fragen, es erfindet ein primäres Datum, es meldet zu viel, es
   macht „wo ich schon mal dabei bin“ außerhalb des Umfangs, es refaktoriert, was nicht verlangt
   war, es verbessert deine Worte, es schließt ohne Beleg, es schweigt, wenn es nicht weiß. Die
   vier Korrekturen, die ich in einer Sitzung gemacht habe und die zu Regeln wurden
   [Ref. 45](REFERENCIAS.md#ref-45), sind das Beispiel: jede ist ein Fehler, den ein ausgebildeter
   Junior im ersten Bericht erkennen muss.
9. **Kosten als Budget.** Tokens, Kontingent der Continuous Integration, Zeit des Eigentümers. Der
   Junior, der nicht auf die Kosten schaut, wiederholt das Multi-Agenten-Team, das das Doppelte
   ausgab und die Hälfte lieferte [Ref. 6](REFERENCIAS.md#ref-6).

### Was der Junior sehr wohl vom Programmieren wissen muss: Alphabetisierung, nicht Handwerk

Hier ist die Nuance, die mir am wichtigsten ist und die am meisten missverstanden wird. Ein
Junior, der nie Code geschrieben hat, weiß nicht, wann das Modell *im* Code lügt, und die Methode
hat einen Moment, den ich heute im Hauptdokument als Hypothese markiere, in dem der Mensch sehr
wohl hinsehen muss. Deshalb ist die Mindestalphabetisierung nicht verhandelbar. Die Liste:

- **Code lesen**, nicht schreiben: einer Funktion folgen, eine Bedingung verstehen, eine Schleife
  erkennen, sehen, wo eine Abfrage an die Datenbank gemacht wird. Wie einen Vertrag lesen, ohne
  Anwalt zu sein.
- **Wie ein System läuft**: was ein Server ist, ein Prozess, eine Datenbank, eine HTTP-Anfrage,
  ein Browser, eine geplante Aufgabe. Wo jedes Ding lebt.
- **Git**: was ein Commit ist, ein Zweig, ein Push, eine Historie. So viel, dass er die Belegspur
  lesen kann, die die Methode dort hinterlässt.
- **Grundlegendes SQL**: eine Abfrage lesen und verstehen, welche Tabelle sie liest und mit
  welchem Filter. Es ist die Sprache der Daten, und die der Zahlen von Schritt 9.
- **Das Terminal**: einen Befehl ausführen, den das Modell dir gegeben hat, und seine Ausgabe
  lesen. Wenn der Junior das Messgerät nicht laufen lassen kann, kann er die Zahl nicht prüfen.
- **Debuggen als letztes Werkzeug**: wenn das Log, der Test und das Messgerät nicht gereicht
  haben, den Code mit dem Modell daneben öffnen und gemeinsam lesen.

Das lehrt man in zwei oder drei Wochen, man übt es den ganzen Kurs über, und es ist nicht das
Handwerk: es ist die Alphabetisierung, die es erlaubt, das Handwerk auszuüben.

## Mit welchem Ziel man einen Junior ausbildet

Ich sage es ohne Umschweife, denn von der Klarheit des Ziels hängt alles andere ab. Das Ziel,
einen Junior in der Ära nach dem Programmieren von Hand auszubilden, ist, jemanden auszubilden,
der **für ein System in Produktion geradestehen kann, ohne eine Zeile seines Codes geschrieben zu
haben**: der ein kleines Projekt von Anfang bis Ende über die zweiundzwanzig Schritte bringen
kann, indem er ein Modell führt, ihm bei jedem Schritt Belege abverlangt, mit dem Eigentümer
entscheidet, und jederzeit weiß, was verifiziert ist, was geglaubt ist und was man nicht sieht.
Ich nenne ihn, vorläufig, *technischer Eigentümer des Belegs*: der, der den Code nicht liest und
trotzdem mit Beweisen in der Hand sagen kann, dass das System das tut, was das Geschäft verlangt
hat, und es morgen weiter tun wird.

Drei Konsequenzen aus dem Ziel, die die Ausbildung ordnen:

1. **Das Artefakt der Bewertung ist der Beleg, nicht der Code.** Ein Junior wird an der
   Vereinbarung bewertet, die er geschrieben hat, am Baum, den er gebaut hat, am offenen Posten,
   den er spezifiziert hat, am Rot, das er verlangt hat, am Bericht, den er nicht akzeptiert hat.
   Die Bewertungsmatrix aus Anhang A des Kurshandbuchs sagt es schon: nicht erklommen, erklommen,
   erklommen mit Beleg für Urteilsvermögen. Diese dritte Stufe, einen Fall erzählen zu können, in
   dem sich das Modell geirrt hat und wie er es entdeckt hat, ist das eigentliche Ziel.
2. **Der Reflex bildet sich mit Vorfällen, nicht mit Theorie.** Niemand lernt dem Modell zu
   misstrauen, indem er liest, dass man misstrauen soll; er lernt es, wenn das Modell ihm „fertig“
   sagt und es nicht so war, und er es in der Testumgebung entdeckt. Deshalb hat der Kurs
   absichtliche Proben (eine Frage unbeantwortet lassen und sehen, was das Modell macht; Annahmen
   in der Erhebung lassen), und deshalb muss die Ausbildung entworfene Vorfälle haben, nicht nur
   Aufgaben, die gut ausgehen.
3. **Der Junior bildet sich an der ganzen Methode aus, nicht an einem Abschnitt.** Die Versuchung
   ist, ihn „offene Posten machen“ zu lassen, in der Schleife, was dem Geben kleiner Code-Aufgaben
   am ähnlichsten ist. Das ist ein Fehler: die Schleife ohne den Start ist auf Sand gebaut, und
   der Junior, der nie einen Schritt 0 oder einen 3 gemacht hat, versteht nicht, warum die 5 die
   Form hat, die sie hat. Die beiden Leitprojekte gibt es dafür: eines neu und eines geerbt, von
   Anfang bis Ende, die zweiundzwanzig Schritte und die acht Stationen.

## Wie man ihn ausbildet: der Plan

Was folgt, ist der Plan, den ich benutzen würde und den ich mit der ersten Kohorte benutzen
werde. Zwölf Wochen Teilzeitarbeit, mit einem Mentor, an den beiden Leitprojekten des Kurses, und
danach ein kleines reales Projekt mit einem echten Eigentümer.

### Wochen 1 und 2: Alphabetisierung und das Modell als Studienobjekt

- Die Alphabetisierung von oben: Code lesen, wie ein System läuft, Git, grundlegendes SQL, das
  Terminal. Mit dem Modell daneben, das erklärt; der Junior schreibt nicht, er liest und führt
  aus.
- **Das Modell als Studienobjekt**: eine Woche lang Anfragen an das Modell stellen mit dem
  einzigen Zweck, es scheitern zu sehen. Ein Datum verlangen, das es nicht hat, und sehen, ob es
  das erfindet. Ihm eine mehrdeutige Anfrage geben und sehen, ob es fragt. Verlangen, dass es
  etwas abschließt, und sehen, ob es ohne Beweis „fertig“ sagt. Verlangen, dass es einen Bug
  repariert, ohne ihn zu reproduzieren. Jeder Fehler wird mit seinem Geruch notiert. Am Ende der
  Woche hat der Junior seinen eigenen Katalog, und es ist der Katalog des Referenzdokuments, selbst
  entdeckt.
- Lektüre des Hauptdokuments, mit dem Glossar zur Hand, und der Referenzen: die Geschichte, woher
  jede Regel kommt.

### Wochen 3 bis 8: das neue Projekt, mit Mentor

Das Kurshandbuch, Teil 1, genau so, am Leitprojekt „Turnera“ oder an einem eigenen kleinen
Projekt. Die zweiundzwanzig Schritte. Mit drei Mentoring-Regeln:

- **Der Mentor prüft Belege, nicht Code.** Er liest die Arbeitsvereinbarung, den semantischen
  Baum, die Spezifikation von drei offenen Posten, den Abschlussbericht eines offenen Postens, den
  Auditbericht, den Bericht des Lasttests. Und er stellt jedes Mal eine einzige Frage: „woher
  weißt du, dass das wahr ist?“. Wenn die Antwort lautet „weil das Modell es gesagt hat“, ist der
  Schritt nicht erklommen.
- **Der Mentor entwirft Vorfälle.** Einmal pro Woche verändert er, ohne Vorwarnung, etwas: er
  ändert ein Datum der Erhebung, schmuggelt eine Annahme in die Mengen, verlangt über das Modell
  eine Änderung außerhalb des Umfangs. Der Junior muss das am Beleg erkennen.
- **Der Junior führt sein eigenes Register der Fehler des Modells**: jedes Mal, wenn er es
  erwischt hat, welchen Geruch es hatte, in welchem Schritt. Am Ende des Projekts ist dieses
  Register seine persönliche Retrospektive, und den Vorschlag zur Änderung der Leiter (Schritt 15)
  schreibt er.

### Wochen 9 bis 11: das geerbte Projekt, mit weniger Mentor

Das Handbuch, Teil 2: die geerbte Turnera, oder ein kleines reales Altsystem. Der
Normalisierungsabschnitt und die ersten beiden Blöcke. Hier sinkt das Mentoring: der Mentor liest
die wiedergewonnene Karte und die Diskrepanzen, den Auditbericht mit seinen
Geschwindigkeitsmarken, und den Abschluss des ersten Bugs im korrektiven Modus. Das Ziel dieser
Wochen ist, dass der Junior lernt, was das neue Projekt nicht lehrt: ein fremdes System durch das
Modell hindurch zu lesen, mit dem Eigentümer zu entscheiden, was von dem, was der Code tut,
falsch ist und was eine vergessene Regel war, und nicht neu zu schreiben.

### Woche 12: das reale Projekt, allein

Ein kleines, echtes Projekt, mit einem echten Eigentümer, der fünfzehn Minuten pro Tag hat, von
Anfang bis Ende. Der Mentor greift nicht ein; er liest am Ende die Retrospektive mit Zahlen. Wenn
der Junior mit den zweiundzwanzig Bedingungen der Produktionsreife-Liste auf „ja“ in die
Produktion kommt, ist er ausgebildet. Wenn nicht, sagt die Liste genau, welcher Schritt noch
einmal erklommen werden muss, und auch das ist Ausbildung.

### Was den Fortschritt misst

Nicht, wie viele offene Posten er geschlossen hat. Drei Dinge, in dieser Reihenfolge:

1. **Wie oft er das Modell erwischt hat**, und in welchem Schritt. Ein Junior, der in sechs Wochen
   das Modell kein einziges Mal erwischt hat, schaut nicht hin: das Modell scheitert immer.
2. **Wie viel er den Eigentümer gekostet hat.** Minuten pro Tag an Fragen; wenn sie steigen,
   verlagert der Junior auf den Eigentümer, was die Methode ihm selbst zu lösen aufträgt
   (Schritt 1).
3. **Die Qualität seines Vorschlags zur Änderung der Leiter.** Das ist der Indikator für
   Urteilsvermögen: ein Junior, der eine konkrete Änderung vorschlägt, begründet mit einem eigenen
   Vorfall, hat die Methode als etwas Lebendiges verstanden und nicht als eine Liste.

## Die Auswirkung auf die Rollen und auf das Team

Ich sage es, weil der, der ein Team führt, mich danach fragen wird. Wenn sich der Junior so
ausbildet, ändert das Team seine Form:

- **Der Junior** hört auf, „der zu sein, der das Leichte schreibt“, und wird zu dem, der ein
  kleines Projekt ganz mit der Methode führt. Er ist früher wertvoller, und er ist früher
  gefährlicher, weil er ein Modell führt, das schnell baut; deshalb ist die Methode die Bedingung
  und keine Zugabe.
- **Der Senior** hört auf, Code zu prüfen, und wendet sich drei Dingen zu: die Vereinbarungen
  schreiben und pflegen (die Arbeitsvereinbarung, die Tore, die Sperren), mit einer anderen
  Sitzung auditieren (Schritt 11) und das entscheiden, was der Junior nicht entscheiden kann
  (Architektur, das „mal zehn“, was blockiert). Sein Wert wandert von der Tastatur zum
  Urteilsvermögen, wo er bei den Guten immer schon lag.
- **Das Team wird kleiner und flacher.** Ein Senior und zwei oder drei Juniors mit Methode tragen
  das, was früher ein Team von acht getragen hat. Ich habe es in meinen eigenen Zahlen gesehen,
  als ich ein ganzes Team von Agenten abgeschafft habe [Ref. 6](REFERENCIAS.md#ref-6): dieselbe
  Logik gilt für Menschen, die Modelle führen.
- **Der Eigentümer der Domäne tritt ins Team ein.** Mit fünfzehn Minuten pro Tag, aber er tritt
  ein, weil die Methode es verlangt. Einen Junior auszubilden schließt ein, ihm beizubringen, wie
  er diese fünfzehn Minuten bekommt und wie er sie nicht vergeudet.

## Die Risiken, ungeschönt gesagt

- **Der Junior, der nie Code geschrieben hat und nicht weiß, wann er hinsehen muss.** Das ist das
  Hauptrisiko, und ich mildere es mit der verpflichtenden Alphabetisierung und mit der Übung des
  Debuggens als letztes Werkzeug. Aber ich markiere es als Hypothese: ich weiß noch nicht, wie
  viel Code man geschrieben haben muss, um den gut zu lesen, den ein anderer schreibt. Ich
  vermute, wenig, und ich vermute, dass es nicht darauf ankommt, geschrieben zu haben, sondern
  *debuggt* zu haben.
- **Die Abhängigkeit von einem Werkzeug.** Die Methode ist absichtlich werkzeugneutral. Ein Junior,
  der an einem einzigen Werkzeug ausgebildet wird, lernt dessen Abkürzungen und nicht die Methode;
  die Ausbildung muss durch mindestens zwei gehen.
- **Die unsichtbaren Kosten.** Ein Junior mit einem Modell verbraucht Tokens, als wären sie
  gratis. Das Token-Budget muss ab Woche 1 Teil der Ausbildung sein, mit der Zahl vor Augen.
- **Die Illusion der Geschwindigkeit.** Das Modell baut an einem Nachmittag, was früher eine Woche
  gedauert hat, und der Junior kann glauben, dass er fertig ist. Die Produktionsreife-Liste, mit
  ihren zweiundzwanzig Bedingungen, ist das Gegenmittel: „fertig“ hat eine Definition, und sie
  lautet nicht „es funktioniert“.
- **Der Mentor, der aus Gewohnheit Code prüft.** Das ist das Risiko auf der Seite des Seniors, und
  es ist ernst: ein Mentor, der den Code liest, lehrt den Junior, dass der Beleg nicht reicht, was
  genau das Gegenteil der Methode ist. Der Mentor muss sich vor dem Junior in der Methode
  ausbilden.

## Was noch auszuarbeiten ist `[Hypothese]`

1. Wie viel man programmiert haben muss, um den Code eines anderen gut zu lesen. Meine Intuition
   ist, dass es darauf ankommt, debuggt zu haben, nicht geschrieben zu haben, und dass wenig
   reicht. Noch ohne Daten.
2. Der Zwölf-Wochen-Plan ist aus meinen Projekten und aus dem geschrieben, was ich vor den
   Modellen unterrichtet habe, nicht aus einer Kohorte. Die erste wird ihn korrigieren, genau wie
   den Kurs.
3. Ob der „technische Eigentümer des Belegs“ eine neue Rolle ist oder der Systemtechniker von
   immer mit einem anderen Werkzeug. Ich neige zum Zweiten, und dann ist der Name überflüssig;
   aber der Markt wird einen Namen brauchen, und ich schlage lieber einen vor, bevor er einen
   schlechteren vorschlägt.
4. Was mit dem Junior passiert, der in ein Team kommt, das die Methode nicht benutzt. Dieses
   Dokument nimmt an, dass das Team sie übernimmt; wenn nicht, wird der so ausgebildete Junior mit
   einem Senior zusammenstoßen, der Code von ihm verlangt. Ich habe keine Antwort, außer dass die
   Methode veröffentlicht ist, damit dieser Senior sie liest.
