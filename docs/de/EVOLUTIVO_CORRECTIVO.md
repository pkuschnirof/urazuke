# Urazuke — der evolutiv-korrektive Weg: ein System normalisieren, das nicht mit der Methode geboren wurde, und danach die Leiter erklimmen

Autor: Pablo Kuschniroff, unterstützt von Claude Code. Version 1, 18. Oktober 2026. Diese Seite
ist die zweite Hälfte der Methode: das [Hauptdokument](ESCALERA_METODOLOGICA.md) beschreibt den
Weg eines neuen Projekts, und hier beschreibe ich, was ich tue, wenn das System schon existiert,
ein anderer es gemacht hat (oder ich selbst es gemacht habe, „vibecodend“, ohne Beleg), und es
jetzt korrigiert oder weiterentwickelt werden muss. Die seltsamen Wörter stehen im Glossar des
Hauptdokuments; die realen Fälle in den [Referenzen](REFERENCIAS.md). Öffentliches Repository:
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## Warum es diese Seite gibt

Als ich die Leiter schrieb, schrieb ich sie mit Blick auf den leeren Ordner: Schritt 0
entscheidet, ob das Projekt angegangen wird, Schritt 4 deployt das Skelett ohne Funktionalität,
und erst in Schritt 5 erscheint das erste Ding, das der Nutzer sehen wird. Das ist der saubere
Fall, und es ist der, der am besten lehrt. Aber es ist nicht der häufigste Fall. In der Praxis
gibt es in den meisten Fällen, in denen mich jemand ruft, ein System, das schon läuft, mit
Nutzern, die davon abhängen, gemacht von jemandem, der nicht mehr da ist, oder von einem Modell,
von dem niemand einen Beleg verlangt hat, und die Anfrage lautet „reparier das“ oder „bau mir das
dazu“. Mein eigenes Werkzeug ist in fremde Systeme im Diagnosemodus hineingegangen, lange bevor
die Leiter geschrieben war [Ref. 11](REFERENCIAS.md#ref-11), und das erste Mal, dass sich die
Methode aus einem System in Produktion gespeist hat, geschah beim Blick auf eines, das schon
existierte [Ref. 12](REFERENCIAS.md#ref-12).

Und hier gibt es eine Falle, die ich benennen will, bevor ich weitermache: die Versuchung vor
einem Altsystem ist, zwischen zwei Extremen zu wählen, die beide falsch sind. Das eine ist „ich
schreibe es mit der Methode neu, von null“: es klingt sauber und endet fast immer in einem zweiten
System, das es nie schafft, das erste zu ersetzen. Das andere ist „ich wende einfach die Schleife
an, dafür gibt es ja die Schritte 5 bis 12“: es klingt pragmatisch und heißt, auf Sand zu bauen,
denn die Schleife setzt voraus, dass es eine Vereinbarung gibt, eine Karte, eine Testumgebung,
eine Batterie, die läuft, und ein Deployment, das sich wiederholt. Nichts davon existiert in einem
System, das nicht mit der Methode geboren wurde. Dieser Weg ist der, der in der Mitte verläuft:
**zuerst wird normalisiert, ohne neu zu schreiben, und danach wird die Leiter erklommen**.

## Die Anwendungsfälle der Methode

Die Methode hat drei Anwendungsfälle, und es lohnt sich zu wissen, in welchem du steckst, bevor du
den Agenten öffnest, denn es ändert sich, wo man einsteigt.

| Fall | Ausgangspunkt | Wo man einsteigt | Was es vor der ersten Funktionalität gibt | Wo es geschrieben steht |
|---|---|---|---|---|
| **Neues Projekt** | Leerer Ordner und ein Eigentümer mit einer Anfrage. | Schritt 0, und von dort die vierundzwanzig der Reihe nach. | Der ganze Startabschnitt vor der ersten Funktionalität. | Das Hauptdokument, die vierundzwanzig Verträge und das Kurshandbuch. |
| **Evolutiv-korrektiv über einem System, das mit der Methode gemacht wurde** | Das System hat die Leiter schon erklommen: es hat Vereinbarung, Karte, mit Beleg geschlossene offene Posten, Batterie, Deployment und Handbücher. | Schritt 5: ein Block wird geöffnet und die Schleife durchlaufen; die 13 periodisch; die 23 beim Abschluss der Etappe. | Keiner: es ist Schritt 23, der für die nächste Etappe zur 0 zurückkehrt, und das steht schon in Teil B des Hauptdokuments. | Das Hauptdokument (Phase 4, Betrieb). |
| **Evolutiv-korrektiv über einem System, das ohne die Methode gemacht wurde** | Ein System, das läuft, mit Nutzern, ohne eines dieser Artefakte oder mit einigen halb fertig. | Der Normalisierungsabschnitt dieser Seite (N0 bis N7), und erst danach die Schleife, im korrektiven oder im evolutiven Modus. | Der ganze Normalisierungsabschnitt, bevor die erste Zeile Funktionalität angefasst wird. | Diese Seite und das Kurshandbuch, Teil 2. |

Was draußen bleibt, benannt, damit es nicht verwechselt wird: die **technologische Migration**
(die Plattform, die Sprache, die Datenbank wechseln) ist kein Anwendungsfall der Methode; sie ist
ein anderes Projekt, und sie fällt im Allgemeinen unter die Ausschlusskriterien von Schritt 0
[Ref. 46](REFERENCIAS.md#ref-46). Wenn das System, das du erbst, kein zugängliches Repository hat
oder seine Bildschirme sich nicht programmatisch bedienen lassen und auch nicht bedienbar gemacht
werden können, ist das Angemessene nicht, es zu normalisieren, sondern ein neues Projekt, das es
ersetzt, mit dem ganzen Schritt 0.

Und eine Klarstellung, die für den dritten Fall gilt: es ist egal, ob das Altsystem von einem
anderen Team ist oder deines. Ein System, das du vor drei Monaten mit einem Modell gebaut hast,
ohne Beleg, ist genauso ein Altsystem wie das, was ein Auftragnehmer vor drei Jahren gemacht hat.
Es ändert sich der Aufwand, es zu lesen, nicht der Weg.

## Das Prinzip: normalisieren ohne neu zu schreiben, mit allen Eingaben

Normalisieren heißt, das System in den Zustand zu bringen, den die Methode beim Öffnen der
Schleife voraussetzt. Und ich tue es mit drei Regeln, über die ich nicht verhandle.

Und etwas, das den drei Regeln vorausgeht: auf diesem Weg gibt es ebenfalls keine Fristen. Die
Methode ist ein Prozess, keine Versprechung von Geschwindigkeit; ein Altsystem zu normalisieren
dauert, was das Altsystem verlangt, und das Einzige, was ich festlege, sind die Reihenfolge und
die Tore.

**Erstens: es wird nicht neu geschrieben.** Die Normalisierung fasst keine Funktionalität an. Sie
legt um das System herum, was ihm fehlt (die Vereinbarung, die Karte, die Testumgebung, die
Batterie, das wiederholbare Deployment, die Sperren auf dem, was schon auf die Welt wirkt), und
lässt das System dasselbe tun, was es vorher tat. Ein Altsystem geht häufiger an der Begeisterung
des „ich räume alles auf“ kaputt als an dem Bug, der zu beheben war.

**Zweitens: zwei Geschwindigkeiten.** Es gibt einen Teil der Schuld, der vor jeder Änderung
bezahlt wird, und den nenne ich den **Sicherheitsgurt**: das System in einer Testumgebung mit
realitätsnahen Daten laufen lassen können, es wiederholbar deployen, die Geheimnisse außerhalb des
Codes haben, und eine Charakterisierungsbatterie der kritischen Flüsse haben, die rot wird, wenn
sich davon etwas ändert. Der Gurt ist ein **hartes Tor**: ohne ihn wird nichts geändert, mit einer
einzigen schriftlichen Ausnahme für den Notfall in der Produktion, die ich weiter unten erkläre.
Der Rest der Schuld wird **beim Anfassen** bezahlt: wenn ein Block in ein Modul eintritt, treten
die Normalisierungsposten dieses Moduls mit ihm ein. Niemals „ein allgemeines Aufräumen“ vor dem
Anfangen.

**Drittens: alle Eingaben der vorherigen Etappen müssen existieren, auch wenn sie durch
Selbsterschließung wiedergewonnen werden müssen.** Das ist die Regel, die diesen Weg von „einfach
die Schleife anwenden“ unterscheidet. Jeder Schritt des Startabschnitts erzeugt ein Artefakt, das
die folgenden Schritte lesen: die Ersterhebung, das Eignungsblatt, die Arbeitsvereinbarung, die
Projektdatei, der semantische Baum, die Erhebung der Mengendaten, die Dimensionierung, die
Erhebung der Umgebungen, die Tore. Im neuen Projekt schreibt der Eigentümer diese Eingaben mit dem
Agenten aus der Aufnahme heraus. Im Altsystem hat sie niemand geschrieben, und die Schleife kann
ohne sie nicht anlaufen. Die Lösung ist nicht, sie zu überspringen: der Agent soll sie **aus dem
System selbst wiedergewinnen**, indem er den Code liest, das Schema der Datenbank, die
Konfiguration der Umgebungen, die Logs und das, was es an Dokumentation gibt, und jede Behauptung
dieser Dokumente trägt eine Marke, woher sie stammt. Die Marken, die ich benutze, sind fünf:
`[Code]`, `[Datenbank]`, `[Konfiguration]`, `[Dokumentation]` und `[erschlossen]`, dazu
`[Geschäft]` für das, was der Eigentümer bestätigt oder korrigiert hat. Ein wiedergewonnenes
Dokument mit Marken ist ein Dokument, das sich prüfen lässt, ohne Code zu lesen: der Eigentümer
schaut sich die mit `[erschlossen]` markierten Behauptungen an und bestätigt oder korrigiert sie,
und er schaut sich die mit `[Code]` markierten an, um zu sehen, ob das System tut, was er glaubt,
dass es tut. Was nicht übereinstimmt, ist eine **Diskrepanz**, und die Diskrepanzen sind das Gold
der Normalisierung: sie sind die Bugs, die niemand gemeldet hat, und die Regeln, die niemand
entschieden hat.

### Die Tabelle der wiedergewonnenen Eingaben

Damit es nicht abstrakt bleibt, hier jede Eingabe des Startabschnitts, wo sie im neuen Projekt
entsteht, und wie sie auf dem evolutiv-korrektiven Weg beschafft wird.

| Eingabe | Im neuen Projekt erzeugt sie | Auf dem evolutiv-korrektiven Weg | Wer bestätigt |
|---|---|---|---|
| `docs/INITIAL_SURVEY.md` | Der Eigentümer, von Hand, in der Aufnahme (Schritt 0 und 2). | Der Agent verfasst sie aus dem Code, der Datenbank und der Konfiguration, mit Quellenmarken, in N2; der Eigentümer ergänzt, was nur das Geschäft weiß. | Der Eigentümer, Behauptung für Behauptung bei allem `[erschlossen]`. |
| `docs/ELIGIBILITY_CRITERIA.md` und `docs/ELIGIBILITY.md` | Schritt 0. | N0, mit vier weiteren Kriterien, die dem Altsystem eigen sind. | Der Eigentümer entscheidet. |
| `docs/WORKING_AGREEMENT.md` | Schritt 1. | N1, mit fünf weiteren Regeln, die dem Altsystem eigen sind. | Der Eigentümer. |
| `PROJECT.md`, `docs/SEMANTIC_TREE.md`, `docs/STATUS.md` | Schritt 2, aus der Erhebung. | N2, aus dem System, mit Marken; dazu die Liste der Diskrepanzen. | Der Eigentümer geht den Baum durch und entscheidet jede Diskrepanz. |
| `docs/AUDIT_[Datum].md` | Schritt 13, am Ende. | N3, am Anfang: es ist das Inventar der Schuld. | Der Eigentümer liest und verifiziert zwei Befunde. |
| `docs/ENVIRONMENTS_SURVEY.md`, die Testumgebung, die Continuous Integration, das wiederholbare Deployment, `docs/GATES.md` | Schritt 4 und 15. | N4, der Sicherheitsgurt, mit der Charakterisierungsbatterie. | Der Eigentümer sieht den Screenshot und den zweiten Lauf des Deployments. |
| `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`, `docs/PRODUCER_CONSUMER_MAP.md` | Schritt 14 und 11. | N5, durch Inventur des Codes und der Datenbank. | Der Eigentümer bestätigt Sperre für Sperre. |
| `docs/VOLUME_SURVEY.md`, `docs/SIZING.md` | Schritt 3, mit Zahlen, die das Geschäft liefert. | N6, mit in der Datenbank und in den Logs gemessenen Zahlen (Schritt 7 auf die Dimensionierung angewendet). | Der Eigentümer steuert nur bei, was sich nicht messen lässt. |
| `docs/PENDING.md` | Schritt 5, aus der Anfrage des Kunden. | N7, aus dem Audit, den Diskrepanzen und der Anfrage des Kunden, mit der Marke „blockiert / wird beim Anfassen bezahlt / kann warten“. | Der Eigentümer ordnet. |
| `docs/DECISIONS.md`, `docs/GOTCHAS.md`, `docs/LOCKS.md`, `docs/DEPLOYMENT.md` | Schritte 6, 11, 14, 15. | Sie werden leer angelegt oder in N2, N4 und N5 ausgefüllt, und sie wachsen in der Schleife wie im neuen Projekt. | Der Eigentümer. |

Wenn am Ende von N7 eine dieser Dateien fehlt, ist der Abschnitt nicht erklommen. Es spielt keine
Rolle, dass das System „funktioniert“: die Schleife wird sie in der ersten Sitzung brauchen.

## Der Normalisierungsabschnitt: die acht Stationen

Ich nenne sie Stationen und nicht Schritte, und ich nummeriere sie N0 bis N7, damit sie nicht mit
den vierundzwanzig der Leiter verwechselt werden. Es sind keine neuen Schritte: es sind die
Schritte des Starts und drei aus dem Betrieb (die 11, die 13 und die 14), in anderer Reihenfolge
und mit anderem Eingang. Im neuen Projekt ist der Eingang die Erhebung; hier ist der Eingang das
System, und das Lesen übernimmt der Agent.

| Station | Ursprungsschritte | Was sich gegenüber dem neuen Projekt ändert |
|---|---|---|
| N0 — Eignung eines bestehenden Systems | 0 | Sieben Voraussetzungen, die der Agent durch Tun verifiziert; jede rote wird zu einem Vorprojekt, nicht zu einer Ablehnung. |
| N1 — Die Arbeitsvereinbarung für ein Altsystem | 1 | Fünf Regeln mehr: nicht refaktorieren, was nicht verlangt wurde, lesen bevor angefasst wird, notieren statt nebenbei reparieren, das aktuelle Verhalten ist die Spezifikation, nichts tritt ein ohne grüne Charakterisierung. |
| N2 — Das Lesen des Systems | 2 | Die Erhebung, die Projektdatei und der Baum entstehen aus dem Code mit Quellenmarken; es erscheint die Liste der Diskrepanzen. |
| N3 — Das Audit als Inventar | 13 | Es kommt zuerst, nicht zuletzt, und jeder Befund sagt, ob er blockiert, ob er beim Anfassen bezahlt wird, oder ob er warten kann. |
| N4 — Der Sicherheitsgurt | 4, 8, 15 | Testumgebung mit Daten, wiederholbares Deployment, Geheimnisse draußen, Continuous Integration, und die Charakterisierungsbatterie. Hartes Tor. |
| N5 — Sperren und Karte aus dem Code | 14, 11 | Inventar von allem, was auf die Welt wirkt, und von allen Verträgen zwischen Teilen, bevor etwas geändert wird. |
| N6 — Dimensionieren mit echten Zahlen | 3, 7 | Die Primärzahlen werden gemessen, nicht erfragt; der Eigentümer steuert nur bei, was nicht in der Datenbank steht. |
| N7 — Das Normalisierungs-Backlog | 5 | Die Schuld und die Anfrage des Kunden in einer einzigen Warteschlange, mit der Geschwindigkeitsmarke und der Paarung nach Modul. |

Die Reihenfolge ist wichtig. N3 kommt vor N4, weil das Audit sagt, was in den Gurt hineingehört
(die Geheimnisse, die es gefunden hat, die Bildschirme, die sich nicht bedienen lassen, das
Deployment, das sich nicht wiederholen lässt). N5 kommt nach dem Gurt, weil das Inventarisieren
von Aktionen mit Konsequenz verlangt, dass man das System an einem Ort laufen lassen kann, an dem
ein Fehler nichts kostet. N6 kommt zuletzt, weil es auf der Testumgebung mit Daten misst, die erst
seit N4 existiert. Und N7 schließt ab, weil es alles Vorherige in einer einzigen Warteschlange
zusammenführt.

### Die Reihenfolge der Normalisierung

Es gibt keine Fristen: jede Etappe dauert, was das System verlangt, und das Einzige, was feststeht,
ist die Reihenfolge.

| Etappe | Stationen | Was sonst passiert |
|---|---|---|
| 1 | N0, N1, N2, N3 | Lesen des Systems mit dem Eigentümer daneben, der Knoten bestätigt und Diskrepanzen entscheidet. Nichts wird geändert. Zum Abschluss der Etappe: die wiedergewonnene Karte und das Inventar der Schuld. |
| 2 | N4, N5 | Der Gurt: Testumgebung mit Daten, zweimal wiederholtes Deployment, rotierte Geheimnisse, Charakterisierungsbatterie der kritischen Flüsse. Bestätigte Sperren auf dem, was schon wirkt. Zum Abschluss: das System läuft im Test und die Batterie ist grün. |
| 3 | N6, N7, und der erste Block | Gemessene Dimensionierung. Das geordnete Backlog. Es wird der erste Block mit Schritt 5 geöffnet, korrektiv oder evolutiv, mit seinen gepaarten Normalisierungsposten. Ab hier ist es die Schleife wie immer. |

Wenn das System groß ist, wächst die Etappe 1 (es gibt mehr zu lesen) und die
Charakterisierungsbatterie der Etappe 2 (es gibt mehr Flüsse). Was nicht wächst, ist N7: ein
Normalisierungs-Backlog, das sich nicht in einem Zug schreiben lässt, ist ein Backlog, das niemand
pflegen wird.

---

### N0 — Eignung eines bestehenden Systems: die Voraussetzungen, die ein Modell verifizieren kann

- **Absicht**: entscheiden, ob dieses System mit der Methode übernommen werden kann, bevor es
  angefasst wird, mit Kriterien, die nicht von einer menschlichen Einschätzung abhängen, sondern
  davon, was ein Frontier-Modell mit dem System tun kann und was nicht. Wenn eine Voraussetzung
  nicht erfüllt ist, ist das kein „geht nicht“: es ist ein **eigenes Projekt**, vorher, damit das
  System geeignet wird.
- **Wann**: einmal, vor allem anderen.
- **Eingaben**: die kurze Ersterhebung, Lesezugang zum Repository und, wenn möglich, zu der
  Umgebung, in der es läuft, und zu seiner Datenbank.
- **Artefakt**: `docs/ELIGIBILITY.md` mit der Entscheidung und den sieben ausschließenden
  Voraussetzungen des Altsystems, jede vom Agenten mit Beleg verifiziert, nicht von einer Person
  erklärt:
  1. **Es lässt sich eine vollständige Umgebung des Systems aufbauen**, mit all seinen Quellen,
     seinem Datenmodell und seiner Persistenz, aus dem Repository und einer Kopie der Daten.
  2. **Der Code ist für ein Frontier-Modell verständlich und handhabbar**: der Agent kann ihn
     ganz lesen und erklären, was jedes Modul tut, ohne zu erfinden.
  3. **Aus dem Code heraus kann das Modell die vollständige Funktionalität des Systems in einem
     Dokument beschreiben**, in einer Form, die ein Endnutzer als sein System wiedererkennt und
     akzeptiert.
  4. **Das Frontend lässt sich von Testwerkzeugen durchlaufen**, um Ende-zu-Ende-Tests zu
     erzeugen, mit jedem Element zugänglich und der Wirkung im Backend prüfbar (das ist X2).
  5. **Das System lässt sich mit heute verfügbaren Werkzeugen aus den Quellen bauen und
     ausführen**: die Abhängigkeiten lösen sich auf, die Versionen existieren, nichts hängt von
     einer verlorenen Binärdatei ab.
  6. **Die Produktionsdaten lassen sich kopieren und anonymisieren** für eine Testumgebung, und
     es gibt eine Sicherungskopie, die mindestens einmal wiederhergestellt wurde.
  7. **Die externen Integrationen haben einen Testmodus oder lassen sich am Rand isolieren** (ein
     falsches Postfach, ein Anbieter im Trockenlauf), damit die Aktionen mit Konsequenz ohne
     Konsequenzen geprüft werden können.
- **Tor**: alle sieben grün, mit dem Beleg des Agenten (die aufgebaute Umgebung, das
  geschriebene Funktionalitätsdokument, ein laufender Ende-zu-Ende-Test eines Flusses). Jedes Rot
  wird zu einem Vorprojekt mit seinem eigenen Ausgangskriterium.
- **Wer entscheidet**: der Agent verifiziert und legt den Beleg vor; der Eigentümer entscheidet,
  ob er die Vorprojekte angeht oder nicht.

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- `docs/INITIAL_SURVEY.md`, die kurze Fassung, die du am ersten Tag schreiben kannst: was das
  System tut und für wen, laut dem Geschäft; was heute weh tut (der Bug, der die Anfrage auslöst,
  das, was fehlt); wer es gemacht hat und ob er verfügbar ist; wo es läuft; wer auf was Zugriff
  hat; ob es ein Backup gibt und wer es macht. Eine halbe Seite, absichtlich unvollständig: in N2
  wird der Agent sie aus dem System vervollständigen.
- `docs/ELIGIBILITY_CRITERIA.md`: das Blatt von Schritt 0 (X1, X2 und die gewichtenden Kriterien)
  plus die sieben Voraussetzungen des Altsystems von oben, jede mit drei leeren Spalten: grün oder
  rot, der Beleg (was der Agent getan hat, um es zu verifizieren) und das Vorprojekt, falls sie
  rot ist.
- Lesezugang zum Repository für den Agenten, Zugang zu einer Kopie der Daten (oder nur lesend zur
  Produktion) und zu einem Ort, an dem er versuchen kann, die Umgebung aufzubauen, mit den
  Zugangsdaten außerhalb des Chats. Ohne das lassen sich die Voraussetzungen 1, 5 und 6 nicht
  verifizieren und bleiben rot.
- Akzeptabler Mindestzustand: der Agent kann das Repository klonen und hat einen Ort, an dem er
  versuchen kann, das System hochzufahren.

**Anfangs:**

> We are going to assess whether this existing system can be taken over with the Urazuke method,
> with prerequisites that you verify by doing, not by asking. Read the initial survey in
> `docs/INITIAL_SURVEY.md` and the criteria sheet in `docs/ELIGIBILITY_CRITERIA.md`. Then, changing
> nothing in the system, verify each prerequisite with evidence: (1) try to set up a complete
> environment of the system from the repository and a copy of the data, with its sources, data
> model and persistence, and tell me exactly what you could and could not bring up; (2) read the
> whole code and tell me whether you can understand and work with it, module by module, naming
> what you cannot understand; (3) from the code alone, write `docs/FUNCTIONALITY_RECOVERED.md`: the
> complete functionality of the system described for an end user, screen by screen and process by
> process, marking what you inferred; (4) list every screen and say whether it can be driven by a
> test tool with each element accessible and the backend effect checkable, and prove it by writing
> and running one end-to-end test of one flow; (5) try to build and run the system from the sources
> with today's tools and report every dependency that does not resolve; (6) check whether the
> production data can be copied and anonymized into a test environment and whether a backup exists
> and has ever been restored; (7) list every external integration and say whether it has a test
> mode or can be isolated at the edge. For each prerequisite: green or red, the evidence (what you
> did and what happened), and, if red, what project would make it green. Do not decide: present me
> the sheet, and I decide. Reply in my language.

> [de]
> Wir werden bewerten, ob dieses bestehende System mit der Urazuke-Methode übernommen werden kann,
> mit Voraussetzungen, die du durch Tun verifizierst, nicht durch Fragen. Lies die Ersterhebung in
> `docs/INITIAL_SURVEY.md` und das Kriterienblatt in `docs/ELIGIBILITY_CRITERIA.md`. Verifiziere
> danach, ohne irgendetwas am System zu ändern, jede Voraussetzung mit Beleg: (1) versuch, eine
> vollständige Umgebung des Systems aus dem Repository und einer Kopie der Daten aufzubauen, mit
> seinen Quellen, seinem Datenmodell und seiner Persistenz, und sag mir genau, was du hochfahren
> konntest und was nicht; (2) lies den ganzen Code und sag mir, ob du ihn verstehen und mit ihm
> arbeiten kannst, Modul für Modul, und benenn, was du nicht verstehst; (3) schreib allein aus dem
> Code `docs/FUNCTIONALITY_RECOVERED.md`: die vollständige Funktionalität des Systems, für einen
> Endnutzer beschrieben, Bildschirm für Bildschirm und Prozess für Prozess, und markier, was du
> erschlossen hast; (4) liste jeden Bildschirm auf und sag, ob er sich mit einem Testwerkzeug
> bedienen lässt, mit jedem Element zugänglich und der Wirkung im Backend prüfbar, und beweis es,
> indem du einen Ende-zu-Ende-Test eines Flusses schreibst und laufen lässt; (5) versuch, das
> System mit den heutigen Werkzeugen aus den Quellen zu bauen und auszuführen, und melde jede
> Abhängigkeit, die sich nicht auflöst; (6) prüf, ob sich die Produktionsdaten in eine
> Testumgebung kopieren und anonymisieren lassen und ob eine Sicherungskopie existiert, die jemals
> wiederhergestellt wurde; (7) liste jede externe Integration auf und sag, ob sie einen Testmodus
> hat oder sich am Rand isolieren lässt. Für jede Voraussetzung: grün oder rot, der Beleg (was du
> getan hast und was passiert ist) und, falls rot, welches Projekt sie grün machen würde.
> Entscheide nicht: leg mir das Blatt vor, und ich entscheide. Antworte in meiner Sprache.

Was ich hier verlange: dass die Voraussetzungen **durch Tun** verifiziert werden (aufbauen, lesen,
das Dokument schreiben, einen Test laufen lassen), denn ein Frontier-Modell kann alle vier Dinge
tun, und damit hört die Eignung auf, eine Meinung zu sein; das Dokument der wiedergewonnenen
Funktionalität, das der stärkste Beweis dafür ist, dass der Code handhabbar ist, und das außerdem
der erste Entwurf dessen ist, was N2 in die Karte verwandeln wird; und dass jedes Rot mit dem
Projekt kommt, das es grün macht, denn eine fehlende Voraussetzung ist keine Ablehnung, sondern
eine Vorarbeit mit eigenem Umfang.

**Bevor du den Prompt schickst** zum Abschluss: deine Entscheidung in einer Zeile, getroffen nach
dem Lesen des Blatts mit dem Beleg jeder Voraussetzung; und, für jedes Rot, deine Entscheidung,
ob das Vorprojekt jetzt, später oder nie angegangen wird (und dann ist das System nicht geeignet).

**Zum Abschluss:**

> Decision: [go / go after these prerequisite projects: … / no-go]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, each prerequisite with its colour and its
> evidence, and, for every red one, the prerequisite project as a pending item in `docs/PENDING.md`
> marked as blocking, with its own acceptance criterion: the prerequisite verified green. Include
> the questions you asked and my answers.

> [de]
> Entscheidung: [go / go nach diesen Vorprojekten: … / no-go]. Schreibe das endgültige Blatt nach
> `docs/ELIGIBILITY.md` mit dem Datum, wer entschieden hat, jeder Voraussetzung mit ihrer Farbe und
> ihrem Beleg und, für jede rote, dem Vorprojekt als offenem Posten in `docs/PENDING.md`, als
> blockierend markiert, mit seinem eigenen Abnahmekriterium: die Voraussetzung grün verifiziert.
> Nimm die Fragen auf, die du gestellt hast, und meine Antworten.

Vollständigkeitsprüfung: hat jede Voraussetzung einen Beleg für etwas, das der Agent **getan**
hat, und nicht eine Antwort von dir? Existiert `docs/FUNCTIONALITY_RECOVERED.md`, und hast du es
wie der Eigentümer gelesen: beschreibt es das System, das er zu haben glaubt? Hat er einen echten
Ende-zu-Ende-Test eines Flusses laufen lassen? Hat jedes Rot sein Vorprojekt mit
Ausgangskriterium? Warnsignal: alle an einem Nachmittag grün, für ein System, das niemand
versteht. Der Agent hat geantwortet, statt zu tun.

---

### N1 — Die Arbeitsvereinbarung für ein Altsystem

- **Absicht**: die Regeln festlegen, bevor irgendetwas angefasst wird, mit fünf Regeln mehr als
  Schritt 1, nämlich denen, die ein geerbtes System braucht, damit der Agent es nicht auf eigene
  Faust „verbessert“.
- **Wann**: nach N0, bevor irgendetwas gelesen wird.
- **Eingaben**: deine Arbeitsvorlieben, wie in Schritt 1.
- **Artefakt**: `docs/WORKING_AGREEMENT.md` mit den sechs Regeln der Methode und den fünf des
  Altsystems.
- **Tor**: die Vereinbarung hat Datum und Version, und die Projektdatei (wenn sie in N2 existiert)
  ordnet an, sie zu lesen.
- **Wer entscheidet**: der Eigentümer.

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- Deine Arbeitsvorlieben, in einer kurzen Liste, wie in Schritt 1: Sprache, wie viel er dich
  fragen soll, welche Autonomie du ihm gibst, was du nicht tolerierst.
- Eine Entscheidung von dir über das Risikoniveau, das du während der Normalisierung akzeptierst:
  ob der Agent auf eigene Faust in die Testumgebung deployen darf oder nicht (in die Produktion
  niemals, bis N4 abgeschlossen und Schritt 15 erklommen ist).
- `docs/ELIGIBILITY.md` (N0), abgeschlossen.
- Akzeptabler Mindestzustand: du kannst die Fragen von Schritt 1 und die zum Risiko beantworten.

**Anfangs:**

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

Was ich hier verlange: die sechs Regeln wie immer, und fünf, die es gibt, weil ein Modell vor
fremdem Code drei Dinge reflexhaft tut: es ordnet ihn um, es „repariert“ ihn dort, wo er ihm
falsch erscheint, und es nimmt an, dass das, was der Code tut, ein Fehler ist, wenn es von dem
abweicht, was es selbst erwarten würde. Die Regeln 7, 9 und 10 blockieren genau diese drei
Reflexe. Die Regel 8 verwandelt das Lesen in Karte, damit das, was der Agent über ein Modul lernt,
beim Schließen der Sitzung nicht verloren geht. Die 11 ist der Sicherheitsgurt als Regel
geschrieben, damit er existiert, bevor die Batterie existiert.

**Zum Abschluss:** der Abschluss-Prompt von Schritt 1, unverändert: du nimmst die Vorschläge an
oder lehnst sie mit Begründung ab, und die Vereinbarung bekommt Datum und Version.

Warnsignal: der Agent schlägt als Regel „den Code modernisieren, während er angefasst wird“ vor.
Diese Regel ist die verkleidete Neuschreibung; lehn sie mit schriftlicher Begründung ab.

---

### N2 — Das Lesen des Systems: die wiedergewonnene Karte und die Diskrepanzen

- **Absicht**: dass die Karte existiert, die Schritt 2 in einem neuen Projekt erzeugt, aber aus
  dem System selbst gezogen, mit Quellenmarken, und mit der Liste von allem, was zwischen dem
  Code, der Datenbank, der Dokumentation und dem, was das Geschäft glaubt, nicht übereinstimmt. Es
  ist Schritt 2 durch Reverse Engineering, und es ist der Schritt, der pro Stunde den meisten Wert
  des ganzen Weges bringt.
- **Wann**: nach N1, mit dem Eigentümer verfügbar zum
  Bestätigen.
- **Eingaben**: das vollständige Repository, das Schema der Datenbank nur lesend, die
  Konfiguration jeder Umgebung, die Logs, falls es welche gibt, die Dokumentation, die existiert,
  und die kurze Erhebung aus N0.
- **Artefakt**: `docs/INITIAL_SURVEY.md` mit Marken vervollständigt; `PROJECT.md`;
  `docs/SEMANTIC_TREE.md` mit jedem Knoten markiert; `docs/STATUS.md`; und die Liste der
  Diskrepanzen, jede vom Eigentümer entschieden und in `docs/DECISIONS.md` geschrieben.
- **Tor**: kein Knoten `[erschlossen]` ohne Urteil des Eigentümers; keine Diskrepanz ohne
  Entscheidung oder ohne offenen Posten; die Leseprobe von Schritt 2 bestanden.
- **Wer entscheidet**: der Eigentümer, Diskrepanz für Diskrepanz.

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- Lesezugang für den Agenten zu allem, was sich lesen lässt: das ganze Repository (alle Branches,
  nicht nur der Hauptbranch), das Schema der Datenbank (ein nur lesender Zugang, außerhalb des
  Chats), die Konfiguration jeder Umgebung (die Umgebungsdateien mit den Werten der Geheimnisse
  verdeckt, oder die Liste der Variablen ohne ihre Werte), die aktuellen Logs, falls es welche
  gibt, und jede Dokumentation, und sei es eine alte E-Mail oder ein veraltetes Handbuch.
- `docs/INITIAL_SURVEY.md` aus N0, mit einem neuen Abschnitt, von dir mit dem Eigentümer
  geschrieben: **was das Geschäft glaubt, dass das System tut**, in seinen Worten, Anwendungsfall
  für Anwendungsfall, und die Geschäftsregeln, an die es sich erinnert („ein Termin kann nicht
  weniger als zwei Stunden vorher abgesagt werden“). Prüf es nicht gegen das System: genau diesen
  Vergleich wird der Agent machen, und die Unterschiede sind die Diskrepanzen.
- `docs/WORKING_AGREEMENT.md` (N1), abgeschlossen.
- Eine von dir geschriebene Liste von dem, was außerhalb des Repositorys lebt und das System
  berührt: ein Roboter, eine Tabelle, die die Datenbank ausliest, ein auf dem Server geplanter
  Prozess, ein anderes System, das eine Tabelle konsumiert. Der Agent wird es aus dem Code nicht
  sehen.
- Akzeptabler Mindestzustand: der Agent kann den Code und das Schema der Datenbank lesen, und die
  Erhebung hat mindestens drei Anwendungsfälle und drei Regeln in den Worten des Geschäfts.

**Anfangs:**

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

Was ich hier verlange: dass er alles liest und erklärt, was er nicht lesen konnte (die
Vollständigkeitsklausel in ihrer Altsystem-Form: die Lücke wird markiert, nicht gefüllt); dass die
Erhebung und der Baum mit **Quellenmarken** an jeder Behauptung herauskommen, denn diese Marke ist
das, was dir erlaubt, ohne Code zu lesen zu prüfen; dass die Prozesse und die Zustände die sind,
**die der Code umsetzt**, nicht die, die sein sollten, denn das aktuelle Verhalten ist die
Spezifikation (Regel 10 der Vereinbarung); dass er die geplanten Prozesse einschließt, die niemand
erinnert und die am meisten Schaden anrichten; und dass die Diskrepanzen mit dem Beleg jeder Seite
und **ungelöst** aufgelistet bleiben, denn sie zu lösen heißt zu entscheiden, und entscheiden ist
deine Sache.

**Bevor du den Prompt schickst** zum Abschluss: der mit dem Eigentümer Knoten für Knoten
durchgegangene Baum, mit der Liste der bestätigten und der korrigierten Knoten; und die Liste der
Diskrepanzen, jede mit der Entscheidung des Eigentümers in einer Zeile und dem Datum (das System
ist richtig und das Geschäft hatte es vergessen; das System ist falsch und wird geändert; oder sie
bleibt offen mit Datum, und nicht zu viele davon).

**Zum Abschluss:**

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

Was ich hier verlange: dass die Entscheidung über jede Diskrepanz an den drei üblichen Orten
landet (das Entscheidungsregister, der offene Posten, falls etwas zu ändern ist, der Baum, falls
bestätigt wird), und dass die Quellenmarken beim Abschließen **nicht gelöscht werden**: ein Baum,
der die Marken verloren hat, ist ein Baum, der sich nicht mehr prüfen lässt.

Vollständigkeitsprüfung: geh den Baum als Eigentümer durch: gibt es einen Entitätszustand, den das
Geschäft nie benutzt hat? Wenn er `[Code]` markiert ist, hat das System ihn, auch wenn ihn niemand
benutzt, und das ist eine Diskrepanz. Gibt es einen geplanten Prozess im Baum? Wenn es keinen
gibt, frag den Agenten, wo er gesucht hat. Hat jede Diskrepanz eine Entscheidung mit Datum? Hat er
die Leseprobe von Schritt 2 bestanden (eine neue Sitzung weiß, was das System NICHT tut)?
Warnsignale: der Baum hat nichts mit `[erschlossen]` markiert (der Agent unterscheidet nicht
zwischen dem, was er gelesen, und dem, was er angenommen hat); die Liste der Diskrepanzen ist leer
(in einem Altsystem ist sie nie leer: der Agent hat schlecht verglichen oder gar nicht
verglichen); die Projektdatei überschreitet die dreihundert Zeilen, weil „es viel zu dokumentieren
gab“ (das gehört in den Baum, und was passiert ist, gehört in den lebendigen Stand
[Ref. 41](REFERENCIAS.md#ref-41)).

---

### N3 — Das Audit als Inventar der Schuld

- **Absicht**: Schritt 13, aber am Anfang und mit einer zusätzlichen Frage pro Befund: blockiert
  er, wird er beim Anfassen des Moduls bezahlt, oder kann er warten? Der Bericht ist kein Bericht:
  er ist der Rohstoff des Gurts (N4) und des Backlogs (N7). In meinem ersten Projekt, das mit der
  schon geschriebenen Methode anlief, verwandelte sich die Serie der frühen Audits direkt in
  offene Posten [Ref. 30](REFERENCIAS.md#ref-30); hier mache ich dasselbe an einem fremden System.
- **Wann**: nach N2, in einer anderen Sitzung als der, die das System gelesen
  hat, wenn das möglich ist.
- **Eingaben**: das Repository nur lesend, die Umgebung, in der es läuft, nur lesend, die
  wiedergewonnene Karte (N2).
- **Artefakt**: `docs/AUDIT_[Datum].md` mit jedem Befund markiert als „blockiert / wird beim
  Anfassen bezahlt / kann warten“.
- **Tor**: kein Befund ohne Geschwindigkeitsmarke; die blockierenden haben einen offenen Posten,
  bevor N4 beginnt.
- **Wer entscheidet**: der Eigentümer, über die Geschwindigkeitsmarken.

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- Eine neue Sitzung des Agenten, wenn dein Werkzeug es erlaubt, mit einem sauberen Klon und einer
  Anweisungsdatei, die sagt „du bist ein Auditor; du hast dieses System nicht gelesen und wirst es
  nicht anfassen“, damit er nicht die Annahmen der Sitzung von N2 teilt. Wenn das nicht geht,
  dieselbe Sitzung, aber wisse es.
- Nur lesender Zugang zu der Umgebung, in der das System läuft (Datenbank, Logs, Konfiguration),
  mit nur lesenden Zugangsdaten außerhalb des Chats.
- Die wiedergewonnene Karte aus N2 (`PROJECT.md`, `docs/SEMANTIC_TREE.md`) und
  `docs/DISCREPANCIES.md`, damit der Auditor nicht noch einmal entdeckt, was schon geschrieben
  steht.
- Dein Kriterium dafür, was „blockiert“ bedeutet: im Allgemeinen ein offengelegtes Geheimnis, ein
  Bildschirm, der sich nicht programmatisch bedienen lässt, ein Deployment, das sich nicht
  wiederholen lässt, das Fehlen eines Backups, und alles, was Daten beschädigen oder zu viel
  abbuchen kann. Schreib es in zwei Zeilen auf, um es ihm zu geben.
- Akzeptabler Mindestzustand: der Auditor hat nur Lesezugang und weiß, was du als blockierend
  ansiehst.

**Anfangs:**

> Audit this system for integrity, security, performance, code quality and deployability, as the
> inventory of what must be normalized before and during its evolution. Read-only: change nothing
> except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires access you
> lack (the database, the logs, the server), tell me and mark that part as not audited; do not
> pass it as fine. Go through all of the code, not a sample, and read `docs/SEMANTIC_TREE.md` and
> `docs/DISCREPANCIES.md` first so that you do not report what is already known. For every
> finding: where it is (file and line), the risk, the evidence that proves it (the command, the
> query, the number), its priority (P0 must be fixed now, P1 soon, P2 when possible), and one more
> field: whether it BLOCKS (must be fixed before any change, by my criteria: [criteria]), whether
> it is PAID WHEN TOUCHED (fixed together with the first change that enters its module), or whether
> it CAN WAIT. Grade every dimension you audited. End with every finding turned into a proposed
> pending item, blocking ones first. Reply in my language.

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
> mehr: ob er BLOCKIERT (muss vor jeder Änderung behoben werden, nach meinem Kriterium:
> [Kriterium]), ob er BEIM ANFASSEN BEZAHLT WIRD (zusammen mit der ersten Änderung behoben, die in
> sein Modul eintritt), oder ob er WARTEN KANN. Gib jeder Dimension, die du auditiert hast, eine
> Note. Schließ damit ab, dass jeder Befund in einen vorgeschlagenen offenen Posten verwandelt
> wird, die blockierenden zuerst. Antworte in meiner Sprache.

Was ich hier verlange: das Audit von Schritt 13 mit der hinzugefügten Dimension „Deploybarkeit“
(denn in einem Altsystem ist das Deployment meist das erste Problem) und mit dem
Geschwindigkeitsfeld, das einen Bericht in einen Plan verwandelt: ohne dieses Feld hat ein
auditiertes Altsystem vierzig Befunde und niemand weiß, womit er anfangen soll. Das Kriterium, was
blockiert, gebe ich vor, nicht der Auditor, denn es hängt von den Konsequenzen des Geschäfts ab.

**Zum Abschluss:** der Abschluss-Prompt von Schritt 13, an den Konstrukteur, mit einer Ergänzung:
die offenen Posten, die er eröffnet, tragen die Geschwindigkeitsmarke des Befunds.

Prüfung: sagt der Bericht, was er NICHT auditieren konnte? Gibt es mindestens einen Befund mit der
Marke „blockiert“? (In einem Altsystem gibt es immer einen; wenn nicht, hat der Auditor weder die
Geheimnisse noch das Deployment angesehen.) Haben zwei zufällige Befunde Datei, Zeile und
reproduzierbaren Beleg? Warnsignal: alles steht auf „kann warten“. Das ist ein Auditor, der nicht
stören will.

---

### N4 — Der Sicherheitsgurt

- **Absicht**: dass um das System herum und ohne seine Funktionalität anzufassen das existiert,
  was es sicher macht, es zu ändern: eine Testumgebung mit realitätsnahen Daten, ein Deployment,
  das sich wiederholt, die Geheimnisse außerhalb des Codes, die Continuous Integration, die laufen
  lässt, was es gibt, und die **Charakterisierungsbatterie** der kritischen Flüsse. Es ist Schritt
  4, die erste Hälfte von Schritt 15 und eine umgekehrte Form von Schritt 8, zusammen und vor
  jeder Änderung. Es ist ein **hartes Tor**: solange der Gurt nicht grün ist, wird keine Zeile
  Funktionalität geändert.
- **Wann**: nach N3, vor jeder Änderung.
- **Eingaben**: die Erhebung der Umgebungen (in N2 wiedergewonnen und von dir bestätigt), der
  Bericht aus N3 mit seinen blockierenden Befunden, der semantische Baum mit den Prozessen, und
  Zugang zum Server und zur Datenbank.
- **Artefakt**: die Testumgebung, die mit anonymisierten Daten läuft; `docs/DEPLOYMENT.md` mit dem
  zweimal wiederholten Deployment in den Test; die Geheimnisse in der Konfiguration des Servers
  und rotiert; die Continuous Integration grün; `docs/GATES.md`; und die
  Charakterisierungsbatterie grün, mit dem bewiesenen Rot für jeden Fluss.
- **Tor**: Screenshot des im Test laufenden Systems, von dir gesehen; zweiter Lauf des Deployments
  ohne Änderungen; Suche nach Geheimnissen im Repository leer; Charakterisierungsbatterie grün und
  jeder Test durch Mutation rot bewiesen.
- **Wer entscheidet**: der Eigentümer, darüber, welche Flüsse kritisch sind, und über die
  Anonymisierung der Daten.

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- `docs/ENVIRONMENTS_SURVEY.md`, die der Agent in N2 mit Marken verfasst hat und die du
  vervollständigt hast: wo es heute läuft, wie es heute deployt wird (und sei es „ich kopiere die
  Dateien per FTP“), wo die Geheimnisse auf dem Server leben werden, wer Zugang hat, und wo die
  Testumgebung laufen wird (ein eigener Server, ein Container, ein Cloud-Konto; wenn du nichts
  hast, sag es, und der Agent schlägt das Einfachste vor). Der Prompt nennt sie „the environments
  survey“; sag ihm, wo sie liegt.
- Zugang des Agenten zum Produktionsserver nur lesend (um die Datenbank und die Konfiguration zu
  kopieren) und zu dem Ort, an dem die Testumgebung laufen wird, mit Schreibrechten, mit den
  Zugangsdaten außerhalb des Chats.
- Deine Entscheidung über die **Anonymisierung** der Testdaten: welche Felder personenbezogene
  Daten sind (Namen, Telefonnummern, E-Mail-Adressen, Ausweisnummern) und wie sie ersetzt werden.
  Das entscheidest du, weil es eine gesetzliche Pflicht ist und keine technische Vorliebe.
- Die Liste der **kritischen Flüsse** für die Charakterisierung, von dir aus den Prozessen des
  semantischen Baums geschrieben: die, die dem Geschäft Geld oder Vertrauen kosten, wenn sie sich
  ungewollt ändern. Zwischen vier und acht für ein kleines System. Nicht „alle“: alle heißt keine.
- `docs/AUDIT_[Datum].md` (N3), damit der Agent weiß, welche Geheimnisse er gefunden hat und
  welche Bildschirme sich nicht bedienen lassen.
- Ein mindestens einmal wiederhergestelltes Backup der Produktion, und sei es auf deiner Maschine,
  bevor der Agent den Server anfasst. Es ist die Bedingung aus N0, die hier fällig wird.
- Akzeptabler Mindestzustand: du weißt, wo die Testumgebung laufen wird, du hast die Liste der
  kritischen Flüsse, du hast die Anonymisierung entschieden und ein Backup wiederhergestellt.

**Für die Umgebung, das Deployment und die Geheimnisse:**

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

Was ich hier verlange: das Skelett von Schritt 4, um etwas herum gebaut, das schon existiert, mit
der halben Schritt 15 vorgezogen (Geheimnisse draußen, Deployment dokumentiert), denn in einem
Altsystem sind die Geheimnisse im Code die Regel und nicht die Ausnahme
[Ref. 42](REFERENCIAS.md#ref-42); die Anonymisierung als Teil der Umgebung und nicht als Detail;
und die Tore geschrieben, bevor die Batterie existiert, damit die Batterie schon als Tor geboren
wird.

**Bevor du den Prompt schickst** für die Batterie: die Testumgebung von dir geöffnet mit den
anonymisierten Daten; die Geheimnisse der Liste rotiert, heute; die Liste der kritischen Flüsse
für die Lücke des Prompts; und, falls N0 rote Bildschirme hinterlassen hat, der blockierende
offene Posten, der sie bedienbar macht, geschlossen vorher oder als Teil dieser Batterie.

**Für die Charakterisierungsbatterie:**

> We are going to write the characterization tests of these critical flows: [list]. A
> characterization test captures what the system does today, exactly as it does it, defects
> included; it is not a test of what the system should do. For each flow: drive it from the
> screen as a user would and check the effect in the backend (the row, the state, the message
> queued). Every test must pass against the current code. Then prove that each test actually
> watches its flow: break the flow deliberately with a temporary change, show me the red output,
> revert the change, show me the green. If a flow cannot be driven from the screen, do not
> simulate it: say so and open a pending item marked as blocking. If while writing these tests you
> find behaviour that looks wrong, do not fix it: add it to `docs/DISCREPANCIES.md` with the
> evidence. Record the command to run the suite in `docs/STATUS.md`, and make the suite the gate
> for the test environment as `docs/GATES.md` says. Reply in my language.

> [de]
> Wir werden die Charakterisierungstests dieser kritischen Flüsse schreiben: [Liste]. Ein
> Charakterisierungstest erfasst, was das System heute tut, genau so, wie es es tut, Defekte
> eingeschlossen; es ist kein Test dessen, was das System tun sollte. Für jeden Fluss: bedien ihn
> vom Bildschirm aus, wie ein Nutzer es täte, und prüf die Wirkung im Backend (die Zeile, den
> Zustand, die eingereihte Nachricht). Jeder Test muss gegen den aktuellen Code bestehen. Beweise
> dann, dass jeder Test seinen Fluss wirklich bewacht: mach den Fluss absichtlich mit einer
> vorübergehenden Änderung kaputt, zeig mir die rote Ausgabe, mach die Änderung rückgängig, zeig
> mir das Grün. Wenn sich ein Fluss nicht vom Bildschirm aus bedienen lässt, simuliere ihn nicht:
> sag es und eröffne einen als blockierend markierten offenen Posten. Wenn du beim Schreiben
> dieser Tests ein Verhalten findest, das falsch aussieht, repariere es nicht: füg es
> `docs/DISCREPANCIES.md` mit dem Beleg hinzu. Halt den Befehl zum Ausführen der Batterie in
> `docs/STATUS.md` fest, und mach die Batterie zum Tor der Testumgebung, wie `docs/GATES.md` es
> sagt. Antworte in meiner Sprache.

Was ich hier verlange: Schritt 8 verkehrt herum. Im neuen Projekt wird der Test rot geboren und
geht mit der Änderung auf Grün; hier wird der Test grün geboren, denn er erfasst, was da ist, und
der Beweis, dass er taugt, ist, dass er **rot wird, wenn du den Fluss absichtlich kaputt machst**.
Ohne diese bewiesene Mutation ist ein Charakterisierungstest ein Test, der besteht, weil er nichts
ansieht, und das ist dasselbe Problem wie das Grün, das einen Bug verbirgt
[Ref. 44](REFERENCIAS.md#ref-44). Und die zwei Disziplinklauseln: was sich nicht bedienen lässt,
wird erklärt und blockiert, und was falsch aussieht, wird als Diskrepanz notiert und nicht
repariert, denn bis der Eigentümer entscheidet, ist das aktuelle Verhalten die Spezifikation.

Vollständigkeitsprüfung: hast du selbst die URL der Testumgebung geöffnet und das System mit Daten
gesehen? Hast du einen echten Namen in diesen Daten gesucht und ihn nicht gefunden? Lief das
Deployment zweimal und hat der zweite Lauf nichts geändert? Hast du die Suche nach Geheimnissen im
Repository verlangt und kam sie leer zurück? Hast du jedes Geheimnis der Liste rotiert? Hat jeder
kritische Fluss seinen Test, und hat jeder Test sein Rot durch Mutation sichtbar? Warnsignale: die
Charakterisierungsbatterie bestand ganz „auf Anhieb“ und es wurde nie ein Rot gezeigt; die
Testumgebung läuft „auf der Maschine des Agenten“ und nicht an einem Ort, den du öffnen kannst;
die Testdaten sind „ein paar Beispieldatensätze“ statt einer anonymisierten Kopie (die Bugs eines
Altsystems leben in den echten Daten, nicht in den Beispieldaten).

---

### N5 — Sperren und Produzenten-Konsumenten-Karte aus dem Code

- **Absicht**: wissen, bevor irgendetwas geändert wird, was das System tut, das auf die Welt wirkt
  (abbuchen, senden, genehmigen, löschen, benachrichtigen, nachts allein laufen) und wer jeden
  Vertrag zwischen Teilen produziert und konsumiert. Im neuen Projekt wird das vor dem Bauen
  entschieden (Schritt 14) und beim Bauen kartiert (Schritt 11). Im Altsystem ist es schon gebaut,
  und niemand erinnert es vollständig. Eine evolutive Änderung kann eine Aktion mit Konsequenz
  auslösen, die schlief, und eine korrektive Änderung kann einen Konsumenten veraltet
  zurücklassen.
- **Wann**: nach dem Gurt, denn Aktionen zu inventarisieren verlangt, das System
  dort laufen lassen zu können, wo ein Fehler nichts kostet.
- **Eingaben**: der Code, die Datenbank, die geplanten Prozesse des Servers, der semantische Baum,
  und die Liste von dem, was außerhalb des Repositorys lebt.
- **Artefakt**: `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` mit Quellenmarken,
  `docs/PRODUCER_CONSUMER_MAP.md`, und nach dem Abschluss `docs/LOCKS.md` mit den Sperren, die
  jetzt kommen, und denen, die später kommen.
- **Tor**: keine Aktion mit Konsequenz ohne Urteil des Eigentümers; die als „jetzt“ markierten
  Sperren implementiert mit ihrem roten Test vor dem ersten Block.
- **Wer entscheidet**: der Eigentümer, Sperre für Sperre.

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- Mit dem Eigentümer eine geschriebene Liste von dem, was das Geschäft **weiß**, dass das System
  nach außen tut: was es abbucht, was es verschickt, wen es benachrichtigt, was es löscht, was
  allein läuft. Sie kommt in einen Abschnitt von `docs/INITIAL_SURVEY.md`. Der Agent wird im Code
  mehr finden, als das Geschäft erinnert; der Vergleich zwischen den beiden Listen ist das
  Ergebnis.
- Zugang des Agenten zu den geplanten Prozessen des Servers (die Liste der geplanten Aufgaben oder
  das Äquivalent deiner Plattform), denn die automatischen Versendungen leben meist dort und nicht
  im Code.
- Die Liste von dem, was außerhalb des Repositorys lebt (N2), für die Karte.
- Die Testumgebung aus N4 in Betrieb, damit er eine Aktion auslösen und sehen kann, was passiert,
  ohne echte Konsequenzen.
- Akzeptabler Mindestzustand: das Geschäft hat seine Liste geschrieben und der Agent kann die
  geplanten Aufgaben sehen.

**Anfangs:**

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

Was ich hier verlange: das Inventar der Schritte 14 und 11 in einem Durchgang, denn sie durchlaufen
denselben Code; den Vergleich zwischen dem, was das Geschäft erinnert, und dem, was der Code tut,
wo die Versendungen auftauchen, an die sich niemand erinnerte; und den Vorschlag **jetzt oder beim
Anfassen** für jede Sperre, der die Regel der zwei Geschwindigkeiten auf den Schutz angewendet
ist: eine Sperre auf einer Aktion, die abbucht, kommt jetzt; eine Sperre auf einem monatlichen
Export kann auf den Block warten, der dieses Modul anfasst.

**Zum Abschluss:** der Abschluss-Prompt von Schritt 14, mit den als „jetzt“ markierten Sperren,
jede mit ihrem roten Test gegen die Version ohne Sperre; die übrigen bleiben im Backlog mit ihrer
Marke.

Warnsignal: der Agent hat genau dieselben Aktionen gefunden, die das Geschäft aufgelistet hat. In
einem Altsystem passiert das nie; es fehlte der Blick auf die geplanten Aufgaben oder auf die
Trigger der Datenbank.

---

### N6 — Dimensionieren mit echten Zahlen

- **Absicht**: Schritt 3, aber mit dem enormen Vorteil des Altsystems: die Primärdaten muss man
  nicht erfragen, sie stehen in der Datenbank und in den Logs. Sie werden mit Schritt 7 gemessen
  (ein Messgerät mit Test, in zwei Richtungen auditiert), und der Eigentümer steuert nur bei, was
  nirgends steht: wie stark sie zu wachsen erwarten und ob das System an andere verkauft werden
  wird.
- **Wann**: nach N5, bevor der erste Block geöffnet wird.
- **Eingaben**: die Produktionsdatenbank nur lesend oder die vollständige Testkopie, die Logs, der
  semantische Baum mit den Entitäten.
- **Artefakt**: `docs/VOLUME_SURVEY.md` mit jeder Zahl markiert als `[Datenbank]` oder `[Log]` und
  ihrem Befehl, die Messgeräte im Repository mit ihrem Test, und `docs/SIZING.md` mit dem „mal
  zehn“ und den asymmetrischen Entscheidungen, die vor dem Weiterentwickeln zu treffen sind.
- **Tor**: keine Primärzahl ohne Messgerät; eine von dir nachgerechnete Zahl, die übereinstimmt.
- **Wer entscheidet**: der Eigentümer, über das erwartete Wachstum und die asymmetrischen
  Entscheidungen.

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- Nur lesenden Zugang zur Produktionsdatenbank (oder die vollständige Kopie aus N4, wenn die
  Anonymisierung weder die Daten noch die Mengen angetastet hat) und zu den Zugriffs- oder
  Anwendungslogs, mit den Zugangsdaten außerhalb des Chats.
- Die zwei Antworten, die nur das Geschäft hat, aufgeschrieben: wie stark sie in den nächsten zwei
  Jahren zu wachsen erwarten, und ob das System an mehr als einem Ort benutzt werden wird (das
  „mal zehn“).
- Einen bekannten Fall für den Test jedes Messgeräts: zum Beispiel die Anzahl der Datensätze einer
  kleinen Tabelle, die du von Hand zählen kannst.
- Akzeptabler Mindestzustand: der Agent kann die Datenbank abfragen und du hast die zwei
  Antworten.

**Anfangs:**

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

Was ich hier verlange: messen statt fragen, was das Altsystem erlaubt und das neue Projekt nicht;
das Messgerät mit Test und das Audit in zwei Richtungen aus Schritt 7, denn Messgeräte lügen
[Ref. 35](REFERENCIAS.md#ref-35), [Ref. 36](REFERENCIAS.md#ref-36); und die Dimensionierung als
Tor vor dem Weiterentwickeln [Ref. 14](REFERENCIAS.md#ref-14): wenn die aktuelle Architektur das
„mal zehn“ nicht aushält und die Anfrage des Kunden genau das Wachsen ist, weiß man das jetzt und
nicht im dritten Block.

**Zum Abschluss:** der Abschluss-Prompt von Schritt 3, bei dem du zwischen den Optionen wählst,
die er für das vorgeschlagen hat, was nicht aushält, oder bestätigst, dass das Aktuelle aushält.

Warnsignal: eine „ungefähre“ Zahl ohne Marke „ungefähr“. Wenn sie in der Datenbank steht, wird sie
gemessen; wenn sie nicht darin steht, wird sie erfragt; eine dritte Möglichkeit gibt es nicht.

---

### N7 — Das Normalisierungs-Backlog, gepaart mit der Anfrage des Kunden

- **Absicht**: eine einzige Warteschlange offener Posten, mit vollständiger Spezifikation, in der
  die Schuld (was aus dem Audit, den Diskrepanzen, den nicht bedienbaren Bildschirmen, den
  ausstehenden Sperren, den Entscheidungen der Dimensionierung kam) und die Anfrage des Kunden
  (was zu korrigieren und was hinzuzufügen ist) zusammenleben, jeder mit seiner
  Geschwindigkeitsmarke und nach Modul gepaart. Es ist Schritt 5 mit zwei Spalten mehr.
- **Wann**: zum Abschluss des Abschnitts. Danach die Schleife.
- **Eingaben**: `docs/AUDIT_[Datum].md`, `docs/DISCREPANCIES.md` mit den Entscheidungen,
  `docs/LOCKS.md`, `docs/SIZING.md`, der semantische Baum, und die Anfrage des Kunden für diese
  Etappe.
- **Artefakt**: `docs/PENDING.md` mit allen spezifizierten offenen Posten, markiert als „blockiert
  / wird beim Anfassen bezahlt / kann warten“ und „korrektiv / evolutiv / Normalisierung“, und die
  Paarung nach Modul.
- **Tor**: vor dem ersten Block bleibt kein als „blockiert“ markierter offener Posten offen; jeder
  offene Posten des Kunden hat die Normalisierungsposten aufgelistet, die mit ihm eintreten.
- **Wer entscheidet**: der Eigentümer, über die Reihenfolge.

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- Die Anfrage des Kunden für diese Etappe, in Prosa und mit seinen Worten, getrennt in zwei
  Listen: was **heute fehlschlägt** (jede Sache mit der Art, sie zu reproduzieren, was passiert
  und was passieren sollte, laut dem Geschäft) und was **fehlt** (das Neue). Sie kommt in
  `docs/blocks/STAGE_01_REQUEST.md` oder wohin du willst; der Prompt sagt „the client's request
  for this stage“, also sag ihm, wo sie liegt. Wenn der Eigentümer Prioritäten genannt hat, auch
  die.
- Alle Artefakte von N2 bis N6 abgeschlossen: der Baum, das Audit, die entschiedenen Diskrepanzen,
  die Sperren, die Dimensionierung. Wenn eines fehlt, öffne diesen Prompt nicht: das Backlog wird
  unvollständig herauskommen, und du wirst nicht wissen, was ihm fehlt.
- Die blockierenden offenen Posten, die schon existieren (aus N0, N3 und N4), geschlossen oder mit
  Datum in Arbeit.
- Akzeptabler Mindestzustand: die Anfrage des Kunden liegt in zwei Listen mit seinen Worten vor,
  und die Artefakte der vorherigen Stationen existieren.

**Anfangs:**

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

Was ich hier verlange: den vollständigen Schritt 5 (die detaillierte Spezifikation lebt in jedem
offenen Posten, auch in denen der Normalisierung), mit den zwei Marken, die diesen Weg ausmachen:
die Geschwindigkeit, die sagt, wann jede Schuld bezahlt wird, und der Typ, der sagt, wie sie
geschlossen wird (ein korrektiver wird mit dem Test geschlossen, der den Fehler reproduziert; ein
evolutiver mit dem aus Schritt 8). Und die **Paarung nach Modul**, die die Regel „wird beim
Anfassen bezahlt“ operativ macht: wenn ich den Block „die Anzahlung“ öffne, treten die
Normalisierungsposten des Zahlungsmoduls mit ihm ein, und nicht vorher und nicht nachher.

**Zum Abschluss:** die Routine jeder Sitzung aus Schritt 5, unverändert, in der
Arbeitsvereinbarung.

Vollständigkeitsprüfung: bleibt ein „blockiert“ offen? Dann wird der erste Block nicht geöffnet.
Sagt jeder korrektive Posten, wie er reproduziert wird, mit den Worten des Kunden? Hat jeder
offene Posten des Kunden seine Liste der gepaarten, und sei sie leer? Warnsignal: das Backlog hat
mehr als fünfzig Normalisierungsposten auf „kann warten“. Das ist keine registrierte Schuld: das
ist die als Liste verkleidete Neuschreibung. Archivier, was nie bezahlt werden wird, und sag es.

---

## Die Schleife über einem geerbten System: korrektiver Modus und evolutiver Modus

Nach N7 trifft der Weg auf die Leiter: die Schritte 5 bis 12 werden mit jedem offenen Posten
erklommen, genau wie im neuen Projekt, mit denselben Verträgen und denselben Prompts. Aber es gibt
zwei Nuancen, die einen eigenen Abschnitt wert sind, denn sie sind das, was „ein Altsystem mit
Methode anfassen“ von „ein Altsystem vorsichtig anfassen“ unterscheidet.

### Der korrektive Modus: das Rot ist natürlich

Ein korrektiver offener Posten ist ein Bug: etwas, das heute fehlschlägt, und der Kunde weiß es.
In Schritt 8 des neuen Projekts wird das Rot hergestellt (der Test wird geschrieben, gegen den
alten Code ausgeführt, man sieht ihn fehlschlagen). Im korrektiven Modus **ist das Rot der Bug
selbst**: der Test, der den Fehler reproduziert, indem er den Fluss vom Bildschirm aus bedient wie
der Nutzer, der ihn gemeldet hat, muss gegen den aktuellen Code fehlschlagen. Wenn er nicht
fehlschlägt, hast du nicht den Bug reproduziert, den man dir gemeldet hat; du hast einen anderen
reproduziert. Dieses Rot ist der Beweis, dass du das Richtige reparierst, und es ist mehr wert als
jede Erklärung des Agenten darüber, „was wohl passieren muss“. Der Fall der vier Runden bis zur
Grundursache [Ref. 22](REFERENCIAS.md#ref-22) ist der, der mich gelehrt hat, dass ohne
geschriebene Reproduktion jede Runde ein anderes Symptom repariert.

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- Den korrektiven offenen Posten in `docs/PENDING.md` (N7), mit der Art, ihn zu reproduzieren, in
  den Worten des Kunden: was er getan hat, was passiert ist, was er erwartet hat. Wenn der Kunde
  ihn nicht zu reproduzieren weiß, besorg dir zuerst einen Fall (einen Datensatz, ein Datum, einen
  Screenshot); ohne Reproduktion gibt es keinen Test, und ohne Test gibt es keinen Abschluss.
- Die Charakterisierungsbatterie (N4) grün in der Testumgebung, mit dem Befehl in
  `docs/STATUS.md`.
- Die mit diesem gepaarten Normalisierungsposten, in dem offenen Posten aufgelistet.
- Deine Bereitschaft zu entscheiden: wenn sich die Grundursache als eine Geschäftsregel entpuppt,
  die niemand geschrieben hat (das kommt häufig vor), wird der Agent anhalten und fragen, und
  jemand muss an diesem Tag antworten.
- Akzeptabler Mindestzustand: du kannst den Bug in der Testumgebung von Hand reproduzieren.

**Zum Schließen eines korrektiven offenen Postens:**

> This pending item is a correction: [what fails, in the client's words, and how to reproduce
> it]. Before changing anything: (1) Reproduce the failure with a test that drives the flow from
> the screen and checks the effect in the backend, and show me that it fails against the current
> code; that red is the proof that you reproduced the right defect. If you cannot reproduce it,
> tell me what you tried and what you need; do not fix what you cannot see. (2) Find the root
> cause and tell me in prose, with the evidence, before fixing. If the root cause is a business
> rule nobody wrote down, stop and ask me. (3) Fix at the root, not where it hurts, and nothing
> else: anything else you find goes to a pending item. (4) Show me the test green, the
> characterization suite still green, and the regression of the neighbouring items. (5) If the
> fix changes a current behaviour that someone may depend on, say so explicitly: that is a decision
> for me, not a side effect. Close the paired normalization items of this module in the same
> block, each with its own evidence. The commit message says "proved red against [version]" and
> the test counts. Reply in my language.

> [de]
> Dieser offene Posten ist eine Korrektur: [was fehlschlägt, in den Worten des Kunden, und wie es
> zu reproduzieren ist]. Bevor du irgendetwas änderst: (1) Reproduziere den Fehler mit einem Test,
> der den Fluss vom Bildschirm aus bedient und die Wirkung im Backend prüft, und zeig mir, dass er
> gegen den aktuellen Code fehlschlägt; dieses Rot ist der Beweis, dass du den richtigen Defekt
> reproduziert hast. Wenn du ihn nicht reproduzieren kannst, sag mir, was du versucht hast und was
> du brauchst; repariere nicht, was du nicht sehen kannst. (2) Finde die Grundursache und sag sie
> mir in Prosa, mit dem Beleg, bevor du reparierst. Wenn die Grundursache eine Geschäftsregel ist,
> die niemand aufgeschrieben hat, halt an und frag mich. (3) Repariere an der Wurzel, nicht dort,
> wo es weh tut, und nichts weiter: alles andere, was du findest, kommt in einen offenen Posten.
> (4) Zeig mir den Test grün, die Charakterisierungsbatterie weiterhin grün, und die Regression
> der benachbarten Posten. (5) Wenn die Reparatur ein aktuelles Verhalten ändert, von dem jemand
> abhängen könnte, sag es ausdrücklich: das ist eine Entscheidung für mich, kein Nebeneffekt.
> Schließ die gepaarten Normalisierungsposten dieses Moduls im selben Block, jeden mit seinem
> eigenen Beleg. Die Commit-Nachricht sagt „rot bewiesen gegen [Version]“ und die Testzahlen.
> Antworte in meiner Sprache.

Was ich hier verlange: die Reproduktion **vor** der Diagnose, denn ein Modell diagnostiziert mit
großer Sicherheit, was es nicht reproduziert hat; die Grundursache in Prosa vor dem Anfassen,
damit du eine Reparatur stoppen kannst, die daneben zielt; die Wurzel und nichts weiter, denn in
einem Altsystem ist „wenn ich schon dabei bin“ die häufigste Art, kaputt zu machen, was lief; die
grüne Charakterisierung als Regression des ganzen Systems; und die Klausel 5, die die
Verhaltensänderung in eine Entscheidung verwandelt. Und die Paarung: die Schuld dieses Moduls wird
jetzt bezahlt, mit ihrem Beleg, nicht „später“.

### Der evolutive Modus: die Charakterisierung ist die Regression

Ein evolutiver offener Posten ist etwas Neues auf etwas, das existiert. Er wird mit dem Prompt von
Schritt 5 geöffnet, mit Schritt 6 und 8 genau so gebaut, und der einzige Unterschied ist, was „die
Regression der Nachbarn“ bedeutet: hier sind die Nachbarn das ganze System, und die
Charakterisierungsbatterie ist die, die sagt, dass das, was lief, weiter läuft. Zwei Regeln mehr.
Erstens: wenn der Block in ein Modul eintritt, treten die als „wird beim Anfassen bezahlt“
markierten Normalisierungsposten dieses Moduls mit ihm ein, mit ihrem eigenen Beleg; das ist die
Regel der zwei Geschwindigkeiten. Zweitens: das Neue wird schon mit der vollständigen Methode
geboren, das heißt, mit seiner Spezifikation im offenen Posten, seinem roten Test, seinem
Ende-zu-Ende-Test und seiner Sperre, falls es auf die Welt wirkt. Man tut dem neuen Modul nicht
an, was das Altsystem dem alten angetan hat.

### Die Ausnahme: der Notfall in der Produktion

Der Gurt ist ein hartes Tor, und ein hartes Tor braucht seine schriftliche Ausnahme, denn wenn ich
sie nicht schreibe, wird die Ausnahme an dem Tag erfunden, an dem um elf Uhr nachts etwas
abstürzt. Die Ausnahme ist diese: wenn die Produktion steht oder Daten beschädigt und der Gurt
noch nicht vollständig ist, macht man das Minimum, das den Schaden stoppt, mit dem Rückweg von
Hand und mit dem informierten Eigentümer, und **am selben Tag** wird der korrektive offene Posten
eröffnet und mit der vollständigen Routine geschlossen: der Test, der ihn in Rot reproduziert, die
Grundursache, die Regression. Eine Notfallreparatur, die nicht wieder durch die Schleife eintritt,
ist Schuld, die mit Zinsen eingetrieben wird.

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben: die Bestätigung, dass es ein
echter Notfall ist (Produktion steht oder beschädigt Daten, nicht „der Kunde ist nervös“), den
informierten Eigentümer, und den Rückweg (das Backup aus N0 oder die vorherige Version) zur Hand.

**Für einen Notfall:**

> This is an urgent fix on production: [what is happening]. Do the minimum that stops the damage,
> on a branch, with the rollback ready before you deploy, and tell me exactly what you changed and
> what you did not verify. Do not touch anything else. Then, today, open the corrective pending
> item in `docs/PENDING.md` with what happened, and we close it with the full routine: the test
> that reproduces it in red, the root cause, the fix at the root, the characterization suite and
> the regression green. Reply in my language.

> [de]
> Das ist eine dringende Reparatur in der Produktion: [was gerade passiert]. Mach das Minimum, das
> den Schaden stoppt, auf einem Branch, mit dem Rückweg bereit, bevor du deployst, und sag mir
> genau, was du geändert und was du nicht verifiziert hast. Fass nichts anderes an. Danach, heute
> noch, eröffne den korrektiven offenen Posten in `docs/PENDING.md` mit dem, was passiert ist, und
> wir schließen ihn mit der vollständigen Routine: der Test, der ihn in Rot reproduziert, die
> Grundursache, die Reparatur an der Wurzel, die Charakterisierungsbatterie und die Regression
> grün. Antworte in meiner Sprache.

Was ich hier verlange: das Minimum, mit dem Rückweg vorher und nicht nachher, und mit dem
ehrlichen Bericht über das Nichtverifizierte (Schritt 12); und die Pflicht, am selben Tag wieder
durch die Schleife einzutreten, was eine Ausnahme von einer Gewohnheit unterscheidet.

## Die sechs Schritte der Betriebsqualität (16 bis 19, 21 und 22) in einem Altsystem

Die Schritte 16 bis 19, 21 und 22 des Hauptdokuments (Beobachtbarkeit und Nachverfolgbarkeit,
Persistenz, Schwachstellen, Leistung und die beiden Monitorings) gelten für beide
Anwendungsfälle, und in
einem Altsystem haben sie einen präzisen Platz, denn bei mehreren von ihnen ist die halbe Arbeit
schon vom Normalisierungsabschnitt erledigt:

- **16, Beobachtbarkeit und Nachverfolgbarkeit**: das Mindestniveau (strukturierte Logs mit
  konfigurierbarem Level und eine Korrelations-ID in den kritischen Flüssen) gehört in den
  Sicherheitsgurt (N4), denn ohne es sagt die Charakterisierungsbatterie nicht, was
  kaputtgegangen ist. Das vollständige Niveau, mit dem unveränderlichen Audit-Log der Aktionen
  mit Konsequenz, die N5 inventarisiert hat, wird vor dem ersten Deployment nach der
  Normalisierung erklommen.
- **17, Persistenz**: die Messungen sind in N6 schon gemacht. Was aus ihnen folgt, kommt mit
  seiner Marke in das Backlog (N7): was schon außerhalb der Toleranz des Geschäfts liegt,
  „blockiert“ oder „jetzt“; der Rest „wird beim Anfassen bezahlt“ und kommt mit dem Block herein,
  der dieses Modul berührt.
- **18, Schwachstellen**: der erste Durchlauf ist die Sicherheitsdimension des Audits von N3, und
  der Scan in der Kette ist Teil des Gurts (N4), denn ein Altsystem hat fast immer alte
  Abhängigkeiten und Geheimnisse in der Historie. Die P0 blockieren; der Rest kommt ins Backlog.
- **19, Leistung**: er läuft mit den in N6 gemessenen Volumina, auf der Persistenz, die in dem
  schon korrigiert wurde, was blockierte, vor dem ersten Deployment nach der Normalisierung. In
  einem Altsystem entdeckt er meist, dass der Bruchpunkt näher liegt, als das Geschäft glaubt.
- **21 und 22, Monitoring**: sie werden mit dem ersten Deployment aufgebaut, genau wie
  im neuen Projekt, mit einem Unterschied: die erste Lesung des Berichts ist die Basislinie des
  Altsystems, und die Abweichungen und die Fehler, die am ersten Tag schon existierten, werden zu
  offenen Posten mit ihrer Geschwindigkeitsmarke. Keiner bleibt als „bekannt“ ohne offenen Posten.

In der Praxis sind die vier vor dem Deployment eine weitere Etappe der Normalisierung, vor dem
ersten evolutiven Block oder zusammen mit ihm, je nach Dringlichkeit der Anfrage, und die beiden
Monitorings werden mit dem Deployment aufgebaut.

## Wann das System normalisiert ist

Nie ganz, und das ist gut so: die als „wird beim Anfassen bezahlt“ markierte Schuld wird über
Monate bezahlt, Modul für Modul, und die als „kann warten“ markierte wird manchmal nie bezahlt,
und das muss man sagen. Was sehr wohl einen genauen Moment hat, ist der **Abschluss des
Abschnitts**, nämlich dann, wenn der erste Block geöffnet wird. Das ist die Liste:

1. Es existieren alle Eingaben aus der Tabelle der wiedergewonnenen Eingaben, mit Quellenmarken,
   und der Eigentümer hat jeden Knoten `[erschlossen]` des Baums bestätigt (N2).
2. Jede Diskrepanz hat eine Entscheidung mit Datum, und die, die das System ändern, haben einen
   offenen Posten (N2).
3. Das Audit existiert und jeder Befund hat eine Geschwindigkeitsmarke (N3).
4. Der Gurt ist grün: Testumgebung mit anonymisierten Daten, die du geöffnet hast; Deployment
   zweimal gelaufen; Suche nach Geheimnissen leer und die gefundenen rotiert; Continuous
   Integration grün; Charakterisierungsbatterie grün mit dem bewiesenen Rot durch Mutation für
   jeden kritischen Fluss (N4).
5. Jede Aktion mit Konsequenz hat ein Urteil, und die als „jetzt“ markierten Sperren haben ihren
   roten Test (N5).
6. Die Primärzahlen sind mit Messgerät und Test gemessen, und das „mal zehn“ steht geschrieben
   (N6).
7. Es bleibt kein als „blockiert“ markierter offener Posten offen, und jeder offene Posten des
   Kunden hat seine gepaarten (N7).
8. Die Arbeitsvereinbarung hat die fünf Regeln des Altsystems, und eine neue Sitzung besteht die
   Leseprobe (N1, N2).

Wenn alle acht „ja“ ergeben, ist das System so weit normalisiert, wie dieser Weg es verlangt, und
was folgt, ist die Leiter wie immer. Die Phasen 3 und 4 des Hauptdokuments (Produktionsfreigabe
und Betrieb) gelten unverändert: das periodische Audit, die Handbücher (die es in einem Altsystem
meist nicht gibt und die mit Schritt 20 aus dem System, wie es ist, erzeugt werden), der residente
Agent, und die Retrospektive mit Zahlen, die in einem Altsystem eine eigene Frage hat: wie viel
das Normalisieren gekostet hat, und was von der als „kann warten“ markierten Schuld am Ende doch
gekostet hat.

## Warnsignale des ganzen Weges

- Der Agent schlägt vor, ein Modul neu zu schreiben, „weil das einfacher ist, als es zu
  verstehen“. Das ist die verletzte Regel 7 der Vereinbarung; in einem Altsystem ist Verstehen die
  Arbeit.
- Man hat angefangen, Funktionalität zu ändern, mit halb fertigem Gurt („die Batterie machen wir
  später fertig“). Später kommt nie, und die erste Änderung ohne Batterie ist die, die kaputt
  macht, wovon niemand wusste, dass es existiert.
- Die Liste der Diskrepanzen wurde gelöst, indem „der Code so repariert wurde, dass er tut, was
  das Geschäft sagt“, ohne dass der Eigentümer jede einzelne entschieden hat. Einige dieser
  Diskrepanzen sind Regeln, die das Geschäft vergessen und der Code erinnert hat.
- Das Normalisierungs-Backlog wächst schneller, als es bezahlt wird. Es ist falsch markiert: es
  gibt Dinge auf „wird beim Anfassen bezahlt“, die „kann warten“ sind, oder es gibt Module, die
  angefasst werden, ohne ihre Schuld zu bezahlen.
- Die Zahlen der Dimensionierung stammen aus einer Schätzung, „weil die Datenbank zu groß ist, um
  sie zu zählen“. Eine große Datenbank zählt man mit einer Abfrage; das ist ein Messgerät.
- Eine Notfallreparatur ist nicht wieder durch die Schleife eingetreten. Zähl, wie viele es im
  Monat gab; wenn es mehr als eine ist, ist der Gurt kein Tor, sondern Dekoration.

## Was noch auszuarbeiten ist `[Hypothese]`

1. Die sieben Voraussetzungen von N0 werden durch Tun verifiziert, und das macht sie kalibrierbar:
   jedes Altsystem, das durch N0 geht, hinterlässt sein Blatt mit Beleg. Was fehlt, ist die
   Kasuistik: wie viele Altsysteme an welcher Voraussetzung scheitern und was das Vorprojekt
   kostet, das sie grün macht. Es ist keine Hypothese mehr über das Kriterium; es ist eine
   Rechnung, die ich noch nicht habe.
2. Die Größe der Charakterisierungsbatterie: zwischen vier und acht Flüssen ist das, was bei mir
   in kleinen Systemen funktioniert hat; in einem großen weiß ich nicht, ob das Kriterium pro
   Fluss, pro Modul oder nach dem Geld läuft, das auf dem Spiel steht.
3. Wie sich die Normalisierung in einem großen System aufteilt: ich vermute, dass das Lesen (N2)
   ganz gemacht wird, der Gurt (N4) aber pro Modul aufgebaut wird, in dem Maß, in dem jedes Modul
   angefasst werden soll, und dass das harte Tor dann hart pro Modul wird und nicht pro System.
   Ich habe es nicht erprobt.
4. Was mit einem Altsystem passiert, das von einem Modell mit halber Methode gebaut wurde
   (Vereinbarung ja, Tests nein): ob dieser Weg ganz gegangen wird oder ob es eine Abkürzung gibt.
   Meine Intuition ist, dass es keine Abkürzung gibt und dass die Abkürzung genau der Fehler ist,
   aber es ist Intuition.
