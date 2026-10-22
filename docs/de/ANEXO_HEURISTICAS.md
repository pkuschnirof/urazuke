# Anhang H — Heuristiken für Codequalität und Benutzbarkeit

**Status: GENEHMIGT — FORM UND ANFANGSSEVERITÄTEN.** Es bleibt keine Entscheidung offen. Die Form (D-043 und D-044), die Schalter (D-045 und D-046), das Dashboard (D-047) und die Anfangsschweregrade mit dem Gewicht der Barrierefreiheit (D-048, Abschnitt 10) sind entschieden. Offen ist nur noch der Kalender: die Übersetzung liegt auf Deutsch, Englisch, Portugiesisch, Französisch und Italienisch vor; Japanisch und Chinesisch fehlen noch, und erst mit ihnen tritt der Text in die Prompts-API ein. Datum: 2026-10-22.

Register der Entscheidungen dieses Anhangs: `docs/DECISIONES.md`, D-043 bis D-048. Das Compliance-Dashboard (Abschnitt 12) wurde in D-047 mit zwei Kennzahlen entschieden. Die Implementierungsarbeit lebt in PND-002.

## 1. Was heute fehlt und warum

Stufe 9 misst den Code bereits, und sie tut es mit einem Gate, das nicht durchlässt: ein einziger Formatierer, Größengrenzen (dreihundert Zeilen pro Datei, vierzig pro Funktion), Komplexität pro Funktion, duplizierter Code, toter Code, deklarierte und genutzte Abhängigkeiten, Abdeckung mit Sperrklinke und Mutationstests, wo es echte Nutzer gibt. Die Zahl wird in `docs/CODE_QUALITY.md` festgehalten. Das ist gelöst.

Nicht gelöst ist die andere Hälfte des Produkts. Ich habe den Korpus der Stufen geprüft: es gibt keine einzige Erwähnung von Benutzbarkeit, von Personen/Profilen oder von funktionaler Gruppierung. Die Oberfläche stützt sich heute auf zwei Dinge: den Screenshot, den der Eigentümer zehn Sekunden ansieht, und die manuellen Testfälle. Beide sind gut, beide sind menschlich, teuer und vergesslich. Ein System kann das Qualitätsgate mit Auszeichnung bestehen und trotzdem unbenutzbar sein: alles grün, und die Person findet nicht, wo sie kassiert.

Und es gibt ein Problem zweiter Schicht, das technisch ist, aber in der Oberfläche sichtbar wird: wenn dasselbe Produkt mehrere Profile nutzen (Verwaltung, Betrieb, Auskunft, Kunde), werden die Funktionalitäten an drei verschiedenen Stellen freigeschaltet — Datenbank, Menü und Routen-Guard —, die zu verschiedenen Zeitpunkten geschrieben werden und sich von selbst entkoppeln. Das Symptom ist immer dasselbe: jemand sieht eine Schaltfläche, die ihm nicht zusteht, oder schlimmer, jemand mit der Berechtigung findet die Bildschirmseite nicht.

Die beiden folgenden Heuristiken greifen diese zwei Dinge mit derselben Form an: ein kurzer Katalog prüfbarer Aussagen, wenige Instrumente, die sie selbst messen, und ein Weg der erklärten Ausnahme für den Fall, dass das Projekt ausbrechen muss.

## 2. Das Modell: drei Schichten, eine einzige Form der Regel

Die Versuchung ist, eine Regelliste zu schreiben und sie an den Stack des ersten Projekts zu binden. Das altert schlecht: die React-Regel gilt nicht in Angular, die Angular-Regel gilt nicht in einem Server mit Templates, und in zwei Jahren ist die halbe Liste tot. Der Vorschlag trennt drei Schichten.

**Schicht 1 — Agnostischer Kern (nicht verhandelbar).** Aussagen über Ergebnisse, nicht über Werkzeuge. „Es gibt einen einzigen Formatierer und niemand diskutiert mit ihm" gilt in TypeScript, PHP oder Go gleichermaßen. Der Kern wird mit stabilen Kennungen aufgelistet und ändert sich von Projekt zu Projekt nicht.

**Schicht 2 — Adapter pro Stack (konfigurierbar).** Für jede Regel des Kerns erklärt jede Frontend-Familie, *womit* sie gemessen wird und *mit welchem Schwellenwert*. Ein React-Projekt mit Vite, eines mit Next, eines mit Angular, eines mit Server und Templates, eines mobil und eines auf der Kommandozeile sind sechs verschiedene Adapter desselben Kerns. Hier lebt alles, was der Nutzer als „konfigurierbar pro Frontend" verlangt hat.

**Schicht 3 — Entscheidungen des Projekts (erklärt).** Die konkreten Schwellenwerte und die Ausnahmen. Sie werden nicht erfunden: sie werden beim Eigentümer erfragt und aufgeschrieben, genauso wie die Dimensionierung in der Architekturstufe. Ist ein Schwellenwert nicht erklärt, gilt der des Adapters, und das wird als solches registriert.

Jede Regel wird immer mit demselben Datensatz aus sechs Feldern geschrieben:

| Feld | Was es enthält |
|---|---|
| `id` | Stabile Kennung (`CQ-07`, `UX-12`). Wird niemals wiederverwendet. |
| Aussage | Ein einziger Satz im Imperativ über ein beobachtbares Ergebnis. |
| Warum | Der konkrete Schaden, den sie verhindert. Gibt es keinen Schaden, ist die Regel überflüssig. |
| Wie geprüft | Das Instrument: automatisches Gate, Abfrage der Matrix, End-to-End-Test oder manueller Fall. |
| Schweregrad | `BLOCKIERT` (das Gate wird rot und der Block wird nicht geschlossen), `WARNT` (öffnet einen offenen Punkt), `REGISTRIERT` (bleibt nur im Dokument). |
| Gilt für | Profile, in denen sie greift. Außerhalb läuft sie nicht, und das ist keine Ausnahme: das ist Geltungsbereich. |

**Die Ausnahme wird erklärt, niemals weggelassen.** Eine Regel wird mit einem Register aus vier Feldern abgeschaltet: Kennung, Begründung in einer Zeile, wer sie genehmigt (der Eigentümer, nicht der Agent) und Datum der Überprüfung. Eine abgeschaltete Regel ohne Register ist ein Fehler des Gates, keine Entscheidung. Es ist dasselbe Kriterium, das die Methode bereits anwendet, um eine „zum Bestehen" erhöhte Grenze nicht zu akzeptieren.

## 3. Die vier Instrumente

Keine Heuristik nützt etwas, wenn ihre Prüfung eine Meinung ist. Es sind vier, und jede Regel erklärt, zu welchem sie gehört.

1. **Automatisches Gate.** Läuft bei jedem Push und beim Schließen eines Blocks. Liefert grün oder rot. Es ist billig, wiederholbar und diskutiert nicht. Es misst alles, was sich zählen lässt.
2. **Abfrage der Matrix.** Die Matrix der Funktionalitäten pro Profil (siehe B2) ist ein deklaratives Artefakt; Menü, Routing und Berechtigungen werden aus ihr abgeleitet. Die Matrix prüfen heißt die Oberfläche prüfen. Das ist das Stück, das einen Teil der Benutzbarkeit in etwas maschinell Prüfbares verwandelt.
3. **End-to-End-Test pro Profil.** Für jedes erklärte Profil ein Skript, das als dieses Profil eintritt und die Menge der erreichbaren Funktionalitäten mit der Zeile der Matrix vergleicht: *weder weniger noch mehr*. Es ist der Test, der die beiden typischen Entkopplungen fängt (die überflüssige Schaltfläche und die fehlende Bildschirmseite).
4. **Manueller Fall.** Was keine Maschine beurteilt: ob die Gruppierung verständlich ist, ob die Aufgabe ohne Hilfe abgeschlossen wird, ob der Text in der Sprache des Nutzers ist. Er wird mit Personen ausgeführt und registriert, wie es Stufe 10 bereits verlangt.

## 4. Teil A — Codequalität

Der Kern erweitert Stufe 9: er ersetzt sie nicht und widerspricht ihr nicht, er gibt jedem bereits gemessenen Punkt Namen, Schweregrad und Adapter und fügt hinzu, was heute fehlt — die Oberfläche als Code betrachtet.

| id | Familie | Aussage | Geprüft durch | Schweregrad |
|---|---|---|---|---|
| CQ-01 | Form | Es gibt einen einzigen Formatierer, er läuft ohne Eingriff und lässt keine Diskussion zu. | Gate | BLOCKIERT |
| CQ-02 | Form | Es gibt einen einzigen Linter pro Repository und seine Regeln sind für alle dieselben; eine Regel wird mit schriftlicher Begründung abgeschaltet, niemals in einer verstreuten Datei. | Gate | BLOCKIERT |
| CQ-03 | Größe | Keine Datei überschreitet die erklärte Grenze (Start bei 300 Zeilen) und keine Funktion die ihre (Start bei 40). | Gate | BLOCKIERT |
| CQ-04 | Komplexität | Keine Funktion überschreitet die erklärte Grenze der Pfade. | Gate | BLOCKIERT |
| CQ-05 | Duplizierung | Keine neue Duplizierung kommt hinein: der kopierte Block wird extrahiert oder begründet. | Gate | BLOCKIERT |
| CQ-06 | Toter Code | Es gibt keinen toten Code: Funktionen, Variablen, Importe, Zweige und ungenutzte Abhängigkeiten. | Gate | BLOCKIERT |
| CQ-07 | Typen | Erlaubt die Sprache Typen, nutzt das Projekt sie ernsthaft; der Typ „irgendein" ist eine erklärte Ausnahme, keine Gewohnheit. | Gate | WARNT |
| CQ-08 | Tests | Die Abdeckung sinkt nicht: die Zahl von heute ist der Boden von morgen. | Gate | BLOCKIERT |
| CQ-09 | Tests | Mit echten Nutzern wird der Mutationswert pro Block gemessen, und jeder überlebende Mutant in neuem Code öffnet einen offenen Punkt. | Gate + Register | BLOCKIERT |
| CQ-10 | Abhängigkeiten | Jede Abhängigkeit ist deklariert, wird genutzt und bringt keinen Fremdbaum mit, der unverhältnismäßig zu ihrem Beitrag ist. | Gate | WARNT |
| CQ-11 | Geheimnisse | Es gibt keine Zugangsdaten, Schlüssel oder Verbindungszeichenfolgen im Repository, auch nicht in der neuen Historie. | Gate | BLOCKIERT |
| CQ-12 | Oberfläche | Die Oberfläche entscheidet nicht: keine Bildschirmseite und keine Komponente enthält Geschäftsregeln (was erlaubt ist, wie viel es kostet, welcher Zustand folgt). Sie leben in der Domäne und die Ansicht fragt sie ab. | Prüfung beim Abschluss + manueller Fall | BLOCKIERT |
| CQ-13 | Oberfläche | Jeder Aufruf an den Server geht über einen einzigen typisierten Client; keine Bildschirmseite baut ihre Anfrage von Hand. | Gate (Suche) | BLOCKIERT |
| CQ-14 | Oberfläche | Es gibt einen einzigen Ort für den geteilten Zustand; die Verdopplung von Zustand zwischen Bildschirmseiten ist ein Fehler, keine Abkürzung. | Prüfung beim Abschluss | BLOCKIERT |
| CQ-15 | Oberfläche | Jeder sichtbare Text kommt aus einem Übersetzungskatalog; keine Nutzerzeichenkette steht im Bauteil geschrieben. | Gate (Suche) | BLOCKIERT |
| CQ-16 | Oberfläche | Jedes interaktive Element trägt eine stabile Kennung und eine Rolle, damit der automatische Test es über den Namen findet und nicht über die Position. | Gate (Suche) | BLOCKIERT |
| CQ-17 | Oberfläche | Alle Farben, Abstände und Schriften kommen aus Tokens; kein magischer Wert steht frei im Stylesheet. | Gate (Suche) | BLOCKIERT |
| CQ-18 | Oberfläche | Die grundlegende Barrierefreiheit wird selbst geprüft: Kontrast, Feldbeschriftungen, sichtbarer Fokus, Tastaturnavigation in den Hauptabläufen, Bilder mit Alternativtext. | Gate | WARNT |

Die Regeln CQ-12 bis CQ-18 sind die, die „Codequalität" an der Front bedeutsam machen. Ohne sie kann das Projekt neunzig Prozent Mutation haben und eine Bildschirmseite, die die Summe mit ihrer eigenen Arithmetik in einer Komponente berechnet: das Schlechteste beider Welten, denn die duplizierte Berechnung besteht alle Tests des Backends.

**Anfangsschweregrade (D-048).** Vom ersten Tag an blockieren die vierzehn Regeln, die einen Prüfer haben und nicht von einem zu diskutierenden Schwellenwert abhängen: CQ-01 bis CQ-06, CQ-08 und CQ-11 bis CQ-17. CQ-09 blockiert, wo es echte Nutzer gibt, denn dort wird gemessen. Es warnen drei, und nur drei: CQ-07 (Typen), CQ-10 (Abhängigkeiten) und CQ-18 (Barrierefreiheit), weil sie verlangen, dass das Projekt zuerst kalibriert. Formatierer, Linter, Größe und Komplexität **werden nicht gelockert**: Stufe 9 blockiert sie heute bereits, und dies erweitert sie, ersetzt sie nicht; die geerbte Schuld wird mit einer erklärten Ausnahme oder mit der Grundlinie der Sperrklinke gelöst, niemals durch Senken des Schweregrads. Und CQ-12 und CQ-14 sind die beiden einzigen Regeln dieser Tabelle, die mit menschlichem und nicht mit maschinellem Rot blockieren: sie werden beim Abschluss des offenen Punktes geprüft und mit dem manuellen Fall vor Augen, genau wie UX-22 und UX-27, nicht bei jedem Commit. Kann das Projekt diesen Abschluss nicht tragen, sinkt die Regel per registrierter Entscheidung auf WARNT, nicht aus Vergessenheit.

**Adapter pro Frontend-Familie.** Ein Beispiel, wie Schicht 2 instanziiert wird (die Namen sind illustrativ; das Projekt wählt und schreibt sie):

| Konzept | Single-Page-Anwendung (React, Vue, Angular) | Server mit Templates | Natives Mobile | Kommandozeile |
|---|---|---|---|---|
| CQ-12 Domäne in der Ansicht | Lint-Regel über Größe und Abhängigkeiten von Komponenten + Prüfung | Prüfung des Controllers | Prüfung des View-Modells | Prüfung der Befehlsschicht |
| CQ-13 einziger Client | Generierung aus dem API-Vertrag | Einziger Dienst des Servers | Generierter Client | Einziger Client des SDK |
| CQ-15 Texte | Katalog + Regel, die sichtbare Literale verbietet | Katalog der Template-Engine | Ressourcenkatalog | Katalog |
| CQ-16 Kennungen | Deklarative Attribute pro Element | Kennungen im Markup | Kennungen der Barrierefreiheit | Stabile Ausgabe |
| CQ-17 Tokens | Tokens im Stylesheet, ohne freie Werte | Dasselbe | Dasselbe | Nicht anwendbar |
| CQ-18 Barrierefreiheit | Automatischer Analysator im Gate | Analysator über das erzeugte HTML | Analysator der Barrierefreiheit | Nicht anwendbar |

Was sich zwischen den Spalten ändert, ist das Werkzeug und der Schwellenwert. Was sich nicht ändert, ist die Aussage. Das macht die Heuristik agnostisch, ohne sie dekorativ zu machen.

## 5. Teil B — Benutzbarkeit

Fünf Familien. Die erste und die zweite sind die, die der Eigentümer ausdrücklich verlangt hat; die anderen drei gibt es, weil ohne sie die Gruppierung und die Profile genauso verfallen, nur langsamer.

### B1 — Gruppierung nach funktionaler Konvergenz

Die Mutterregel: **eine Funktionalität wird nach dem gruppiert, was die Person zu tun gekommen ist, nicht nach dem Modul, aus dem sie stammt.** Der Code organisiert sich nach Entitäten („Rechnung", „Kunde", „Zahlung"); die Personen nicht. Niemand tritt ins System, um „Entitäten zu verwalten": man tritt ein, um zu kassieren, zu versenden, den Monat abzuschließen. Zeigt das Menü die Entitäten, wird die Person zur Übersetzerin. Das Menü *ist* die Arbeit.

| id | Aussage | Geprüft durch | Schweregrad |
|---|---|---|---|
| UX-01 | Jede Menügruppe wird mit einer Arbeit des Nutzers benannt (in seinem Wortschatz, mit dem Glossar des Projekts), niemals mit einem technischen Modul oder einer Datenentität. | Manueller Fall + Prüfung der Matrix | WARNT |
| UX-02 | Jede Funktionalität hat genau ein kanonisches Zuhause. Dient sie zwei Gruppen, wird ein Zuhause gewählt und aus der anderen verlinkt; der Eintrag wird nicht dupliziert. | Abfrage der Matrix | BLOCKIERT |
| UX-03 | Es gibt keine Waisen: jede erklärte Funktionalität ist vom Einstiegsbildschirm aus in nicht mehr als drei Schritten erreichbar. | Automatischer Routendurchlauf | BLOCKIERT |
| UX-04 | Die Größe einer Gruppe ist vernünftig: weniger als drei Funktionalitäten zeigt eine Gruppe, die keine war; mehr als sieben zeigt eine Schublade. | Abfrage der Matrix | WARNT |
| UX-05 | Jede Gruppe hat einen Einstiegsbildschirm, der sagt, was dort getan wird, und was die Hauptaktion ist. Es gibt keine Gruppen, die direkt in eine leere Tabelle öffnen. | Manueller Fall | WARNT |
| UX-06 | Abläufe, die die Person häufig macht, leben zusammen: wenn „eine Zahlung erfassen" und „das Konto des Kunden sehen" in derselben Sitzung genutzt werden, teilen sie die Gruppe. | Manueller Fall (Aufgabentest) | REGISTRIERT |
| UX-07 | Der Test des ersten Klicks: der Eigentümer nennt vor einer konkreten Aufgabe („wo kassierst du eine Zahlung?") einen Ort. Nennt er zwei, gibt es Duplizierung; nennt er keinen, gibt es eine Waise. Er läuft beim Abschluss jedes Blocks. | Manueller Fall | WARNT |

### B2 — Profile und pro Profil freigeschaltete Funktionalitäten

Hier liegt das Stück mit dem größten Ertrag, und der Grund ist ein ingenieurtechnischer, kein gestalterischer: **die Freischaltung wird einmal erklärt, in einer Matrix, und alles andere leitet sich aus ihr ab.** Heute ist der klassische Fehler, die Berechtigung dreimal zu schreiben (im Menü, im Routen-Guard und im Datenfilter) und dass die drei auseinanderlaufen. Mit der Matrix als einzigem Produzenten sind Menü, Routing, Serverberechtigungen und Testskripte Konsumenten, und die Produzenten/Konsumenten-Symmetrie, die die Methode bereits verlangt, wird von selbst prüfbar.

Die Matrix hat vier Spalten und eine Zeile pro Funktionalität: *Funktionalität*, *Zuhause* (die Gruppe aus B1), *Profile, die sie haben*, *Einstiegsroute*. Nichts weiter.

| id | Aussage | Geprüft durch | Schweregrad |
|---|---|---|---|
| UX-08 | Jede Funktionalität erklärt in der Matrix, welche Profile sie haben. Eine Funktionalität ohne Profil existiert nicht: entweder wird ihr ein Profil zugewiesen oder sie wird gelöscht. | Abfrage der Matrix | BLOCKIERT |
| UX-09 | Jedes erklärte Profil hat mindestens eine Funktionalität und einen eigenen Einstiegspunkt. Ein leeres Profil ist ein Profil, das beim Entwerfen niemand genutzt hat. | Abfrage der Matrix | BLOCKIERT |
| UX-10 | Die Navigation wird aus der Matrix erzeugt. Ein von Hand geschriebenes Menü ist ein Fehler, keine Abkürzung. | Gate (Suche) | BLOCKIERT |
| UX-11 | Verbergen ist nicht Schützen: jede Route prüft die Berechtigung auf der Serverseite, zusätzlich zum Verbergen des Eintrags. Die Adresse von Hand zu schreiben reicht nicht, um hineinzukommen. | End-to-End-Test | BLOCKIERT |
| UX-12 | Weder weniger noch mehr: pro Profil ist die Menge der erreichbaren Funktionalitäten genau die seiner Zeile in der Matrix. | End-to-End-Test pro Profil | BLOCKIERT |
| UX-13 | Die Ablehnung wird erklärt: tritt eine Person in eine Funktionalität ein, die ihr nicht zusteht, sieht sie eine Meldung, die sagt, warum, und an wen sie sich für den Zugang wenden soll. Niemals ein leerer Bildschirm, niemals eine graue Schaltfläche ohne Grund. | Manueller Fall | WARNT |
| UX-14 | Dieselbe Schaltfläche bedeutet für alle dasselbe: teilen zwei Profile die Beschriftung, teilen sie die Wirkung. Ändert sich die Wirkung je nach Profil, ändert sich die Beschriftung oder die Funktionalität wird in zwei geteilt. | Manueller Fall | WARNT |
| UX-15 | Auch die Daten werden pro Profil gefiltert: wer die Liste sieht, sieht die Zeilen, die ihm zustehen, nicht die vollständige Liste mit den im Browser versteckten Zeilen. | End-to-End-Test + Prüfung des Servers | BLOCKIERT |
| UX-16 | Die Matrix und das Benutzerhandbuch werden im selben offenen Punkt wie die Funktionalität aktualisiert. Eine neue Funktionalität ohne Zeile in der Matrix wird nicht geschlossen. | Abschluss des offenen Punktes | BLOCKIERT |

### B3 — Zustände, und was die Person sieht, wenn etwas fehlt

Die meisten Reklamationen von „es geht nicht" sind Bildschirmseiten, die nicht sagen konnten „es gibt nichts", „es lädt" oder „es ist fehlgeschlagen". Vier Zustände, immer, in jeder Liste und jeder Detailansicht.

| id | Aussage | Geprüft durch | Schweregrad |
|---|---|---|---|
| UX-17 | Jede Liste hat vier gelöste Zustände: mit Daten, leer, ladend und mit Fehler. Die leere unterscheidet „es gibt noch nichts" von „deine Suche hat nichts gefunden". | Manueller Fall + Prüfung | WARNT |
| UX-18 | Während etwas dauert, sieht man, dass es arbeitet, und man kann abbrechen, wenn es lange dauert. Eine Schaltfläche, die nichts antwortet, ist die Beschwerde Nummer eins. | Manueller Fall | WARNT |
| UX-19 | Der Fehler sagt, was passiert ist, was man tun kann, und löscht nicht das Eingetragene. Weder ein technischer Code allein noch ein „es ist ein Fehler aufgetreten". | Manueller Fall | WARNT |

### B4 — Aktionen und Fehler

| id | Aussage | Geprüft durch | Schweregrad |
|---|---|---|---|
| UX-20 | Eine Bildschirmseite hat eine offensichtliche Hauptaktion; der Rest ist sekundär und sieht so aus. | Manueller Fall | WARNT |
| UX-21 | Jede destruktive Aktion verlangt eine Bestätigung, die das betroffene Objekt nennt, und wo es möglich ist, wird sie rückgängig gemacht statt bestätigt. | Manueller Fall | WARNT |
| UX-22 | Ein fehlschlagendes Formular behält das Eingetragene und markiert das problematische Feld an der Stelle des Feldes. | Manueller Fall | BLOCKIERT |
| UX-23 | Keine Aktion lässt die Bildschirmseite ohne Ausweg: nach dem Speichern, Löschen oder Abbrechen weiß die Person, wo sie geblieben ist und wie es weitergeht. | Manueller Fall | WARNT |

### B5 — Sprache und Barrierefreiheit

| id | Aussage | Geprüft durch | Schweregrad |
|---|---|---|---|
| UX-24 | Die Oberfläche spricht die Sprache des Glossars des Projekts: dasselbe Objekt heißt gleich auf der Bildschirmseite, im Handbuch und in der E-Mail. Ein Synonym ist ein Defekt. | Manueller Fall + Prüfung | WARNT |
| UX-25 | Alles ist ohne Maus und mit Screenreader in den Hauptabläufen machbar; der Fokus ist immer sichtbar und bleibt nicht gefangen. | Gate (CQ-18) + manueller Fall | WARNT |
| UX-26 | Zustände werden nicht nur durch Farbe mitgeteilt; jedes informative Bild hat Alternativtext; die Texte sind bei normaler Größe ohne Zoom lesbar. | Gate (CQ-18) | WARNT |
| UX-27 | Jeder offene Punkt, der eine Bildschirmseite berührt, liefert den echten Screenshot der Testumgebung, und der Eigentümer sieht ihn an, bevor geschlossen wird. Der Screenshot ist weder optional noch ein Mockup. | Abschluss des offenen Punktes | BLOCKIERT |

## 6. Wo es einhakt, und welche Artefakte entstehen

Der Anhang erfindet keine neuen Stufen: er hängt sich an die, die es gibt. Das vermeidet doppelte Gates und vermeidet das übliche Schicksal von Benutzbarkeitslisten, nämlich einmal gelesen zu werden.

**Wo er hingehört (D-043).** Er ist querliegend zu den vier Abschnitten, mit dem Hauptgewicht im Konstruktionszyklus (Stufen 5 bis 12), wo entschieden und gebaut wird. Er ist keine eigene Stufe: eine numerierte Stufe würde die Leiter umnumerieren, die Schrittanzahl verändern und den Anhang der Pflichtübersetzung der Verträge in die acht Sprachen unterwerfen, bevor die Konstruktion grün durchlaufen kann, ohne ein Gate hinzuzufügen, das der Zyklus nicht schon hat.

**Wie er einhakt (D-044).** Eine kanonische Quelle, fünf Anker und zwei vorherige Eingänge. Der Text der Regeln lebt nur hier und die Prompts zitieren ihn; sie kopieren ihn niemals. Die fünfundvierzig Regeln in die acht Prompts des Zyklus zu wiederholen verwässert sie (sie konkurrieren mit der eigenen Arbeit jeder Stufe und der Agent befolgt sie jedes Mal anders), leitet sie ab (zwei Kopien desselben Textes entkoppeln sich von selbst, was genau das Antimuster ist, das Stufe 11 verfolgt) und macht sie nicht querliegender: querliegend wird eine Regel dadurch, dass jeder Block durch dasselbe Gate geht, nicht dadurch, dass die Regel überall geschrieben steht.

| Moment | Was hinzukommt | Warum dort |
|---|---|---|
| **Vorheriger Eingang 1** — Definition des Geltungsbereichs | Das Glossar des Nutzers | Ohne Glossar haben UX-01 und UX-24 nichts, wogegen sie vergleichen könnten. |
| **Vorheriger Eingang 2** — Definition des Geltungsbereichs | Die Liste der Profile | Ohne die Liste wird die Matrix aus B2 in Stufe 5 erfunden, und alles, was aus ihr abgeleitet wird, entsteht ohne Grundlage. |
| **Anker 1** — Stufe 5 (der Plan) | Jeder offene Punkt, der eine Bildschirmseite berührt, erklärt drei Dinge: zu welcher Konvergenzgruppe er gehört (B1), welche Profile sie haben und welche Abnahmekriterien profilbezogen sind („gegeben das Profil X, die Person kann Y tun und kann Z nicht tun"). Ohne diese Erklärung besteht der offene Punkt die Stufe nicht. | Hier *entstehen* die Gruppierung und die Profile: das sind Planungsentscheidungen, keine Codeentscheidungen. Es ist der Anker mit dem größten Ertrag und der, den es heute nicht gibt. |
| **Anker 2** — Stufe 8 (Tests in Rot) | Die Matrix wird zu einem Test, der zuerst fehlschlagen muss: pro Profil das Erreichbare gegen seine Zeile (UX-11, UX-12, UX-15). | Ohne das ist die Matrix ein Dokument, das niemand ansieht. |
| **Anker 3** — Stufe 9 (Qualität) | Der vollständige CQ-Katalog mit seinem Adapter und seinen erklärten Schwellenwerten; `docs/CODE_QUALITY.md` berichtet pro Regel, nicht als einzelne Zahl. Und die Matrix als Gate (UX-02, UX-03, UX-08, UX-09, UX-10, UX-16). | Es ist der einzige Ort, an dem der Text wörtlich als Direktive eintritt, und es ist das Gate, das in jedem Block mit Sperrklinke läuft. |
| **Anker 4** — Stufe 10 (manuelle Fälle) | Jeder Fall wird **einmal pro betroffenem Profil** ausgeführt, abgeleitet aus der Matrix und nicht von Hand geschrieben. Ein mit einem einzigen Profil ausgeführter Fall zählt nicht als ausgeführt. | Die manuellen Fälle sind die einzige menschliche Prüfung der Methode; werden sie nicht pro Profil geöffnet, wird die Hälfte von B2 nie angesehen. |
| **Anker 5** — Stufe 12 (Prüfung und ehrlicher Bericht) | Der Bericht sagt, was gemessen wurde, was bei „warnt" blieb und welche Regel abgeschaltet ist, mit ihrer Begründung, ihrem Genehmiger und ihrem Datum der Überprüfung. | Null stiller Schaden: eine abgeschaltete Gruppe kann nicht als erfüllt gelesen werden. |
| Benutzerhandbuch | Wird nach den Gruppen von B1 gegliedert und erklärt pro Gruppe, welche Profile hineingehen. | Handbuch und Menü werden mit denselben Worten benannt, sonst bricht das Glossar. |
| Abschluss jedes Blocks | Test des ersten Klicks (UX-07), Screenshot der echten Umgebung (UX-27) und die beiden End-to-End-Tests der Matrix. | Es sind die drei Prüfungen, die sich nicht automatisieren lassen. |

**Status (D-049).** Die fünf Anker sind bereits eingehakt: der Anfangsprompt der Stufen 5, 8, 9, 10 und 12 zitiert diesen Anhang in acht Sprachen, mit einer einzigen englischen Formulierung, die in allen identisch ist, und ihrer lokalen Übersetzung daneben. Das Dokument wird mit dem Rest der Methode auf der Seite veröffentlicht, auf Spanisch; sein Eintritt in die Prompts-API wartet auf die Übersetzung in die acht Sprachen (D-043).

Die Stufen 6, 7 und 11 erhalten höchstens eine Zeile: die 6 registriert bereits Schwellenwerte und Ausnahmen als Entscheidungen (es ist der natürliche Ort der erklärten Ausnahme), und die 11 ist die, in der der Fall der viermal geschriebenen Matrix mit voller Wucht eintritt. Ihnen wird kein eigener Text hinzugefügt, um sie nicht zu verwässern.

Drei Artefakte, alle in `docs/`: `CODE_QUALITY.md` (erweitert), `USABILITY.md` (neu, mit dem Ergebnis pro Regel und den erklärten Ausnahmen) und `PROFILE_MATRIX.md` (die Matrix, die zugleich Dokument und Quelle des Menüs ist).

## 7. Konfiguration

Eine einzige Datei pro Projekt erklärt Schicht 2 und Schicht 3. Beispiel mit der vorgeschlagenen Form, nicht mit endgültigen Werten:

```json
{
  "version": 1,
  "frontend": "react-vite",
  "gemessen_von": {
    "format": "prettier",
    "lint": "eslint",
    "typen": "tsc",
    "komplexitaet": "eslint-complexity",
    "duplizierung": "jscpd",
    "toter_code": "knip",
    "abdeckung": "vitest-coverage",
    "mutation": "stryker",
    "barrierefreiheit": "axe-core"
  },
  "schwellenwerte": {
    "zeilen_pro_datei": 300,
    "zeilen_pro_funktion": 40,
    "pfade_pro_funktion": 10,
    "mindestabdeckung": 0,
    "mutationsziel": 0
  },
  "ausnahmen": [
    {
      "regel": "CQ-17",
      "begruendung": "geerbter druckbarer Bericht, ohne Tokens",
      "genehmigt_von": "Eigentuemer",
      "pruefen_am": "2027-01-31"
    }
  ]
}
```

Die beiden Nullen sind absichtlich und sind der Teil, der zählt: die Mindestabdeckung setzt die Sperrklinke mit dem Gemessenen, und das Mutationsziel setzt der Eigentümer, wenn das Projekt Nutzer hat. Stehen sie auf null und hat sie niemand erklärt, meldet das Gate sie als nicht erklärten Schwellenwert, statt ihn zu erfinden.

## 8. Die beiden Bausteine in der Form, die die Methode nutzt

**Codequalität.**

> Set up and maintain the code-quality gate for this project, configured for its frontend family. The core rules are the same in every project; what changes is how each one is measured and at which threshold. Install one formatter and one linter with a single shared configuration; enforce size limits per file and per function, complexity per function, duplication, dead code, declared-and-used dependencies, type checking where the language allows it, coverage with a ratchet, and secret scanning. Where the project has real users, add mutation testing scoped to the changed lines and record the score per block. Then extend the gate to the frontend itself: no business rule inside a screen, one typed client for every server call, one home for shared state, no user-visible string outside the translation catalogue, a stable identifier and role on every interactive element, styling only through tokens, and automatic basic accessibility checks. Every rule has a stable id, a severity (blocks, warns, records) and a named verifier. Thresholds and exceptions are declared by the owner in one configuration file; a rule switched off without a written exception is a gate failure, not a decision. Report the result per rule in `docs/CODE_QUALITY.md`, not as a single number.

> [de]
> Richte das Codequalitäts-Gate dieses Projekts ein und halte es instand, konfiguriert für seine Frontend-Familie. Die Regeln des Kerns sind in jedem Projekt dieselben; was sich ändert, ist womit jede gemessen wird und mit welchem Schwellenwert. Installiere einen einzigen Formatierer und einen einzigen Linter mit gemeinsamer Konfiguration; erzwinge Größengrenzen pro Datei und pro Funktion, Komplexität pro Funktion, Duplizierung, toten Code, deklarierte und genutzte Abhängigkeiten, Typprüfung wo die Sprache es erlaubt, Abdeckung mit Sperrklinke und Secret-Scanning. Wo das Projekt echte Nutzer hat, füge Mutationstests beschränkt auf die geänderten Zeilen hinzu und registriere den Wert pro Block. Erweitere danach das Gate auf die Front: keine Geschäftsregel innerhalb einer Bildschirmseite, ein einziger typisierter Client für jeden Serveraufruf, ein einziger Ort für den geteilten Zustand, kein sichtbarer Text außerhalb des Übersetzungskatalogs, stabile Kennung und Rolle an jedem interaktiven Element, Stile nur über Tokens und automatische Prüfung der grundlegenden Barrierefreiheit. Jede Regel hat eine stabile Kennung, einen Schweregrad (blockiert, warnt, registriert) und einen benannten Prüfer. Die Schwellenwerte und die Ausnahmen erklärt der Eigentümer in einer Konfigurationsdatei; eine abgeschaltete Regel ohne schriftliche Ausnahme ist ein Fehler des Gates, keine Entscheidung. Berichte das Ergebnis pro Regel in `docs/CODE_QUALITY.md`, nicht als einzelne Zahl.

**Benutzbarkeit.**

> Build the usability criteria for this project before writing the first screen, and enforce them where the method already has hooks. Group functionality by what the person came to do, never by the internal module or the data entity: every menu group is named with a user job in the project glossary, every functionality has exactly one canonical home, no functionality is orphaned, and every group is reachable in no more than three steps from the entry screen. Then declare accessibility in one matrix and derive everything from it: each functionality lists the profiles that have it, each functionality has at least one profile, each profile has at least one functionality and its own entry point, the navigation is generated from the matrix instead of written by hand, and every route checks the permission on the server because hiding an entry is not protecting it. Verify the matrix per profile with an end-to-end check that compares what is reachable with the matrix row: neither less nor more. Require the four states on every list (with data, empty, loading, error), a visible working indicator with the option to cancel long operations, an error message that says what happened and what to do without losing entered data, a primary action per screen, confirmation or undo for destructive actions, and a form that keeps what was typed. Run each manual test case once per affected profile, run the first-click check at the close of every block, and require a real screenshot of the test environment on every item that touches a screen. Record the result per rule, with owner-declared exceptions, in `docs/USABILITY.md`, and keep the matrix in `docs/PROFILE_MATRIX.md` as the single source of truth.

> [de]
> Baue die Benutzbarkeitskriterien des Projekts, bevor du die erste Bildschirmseite schreibst, und erzwinge sie dort, wo die Methode bereits Einhängepunkte hat. Gruppiere die Funktionalitäten nach dem, was die Person zu tun gekommen ist, niemals nach dem internen Modul oder der Datenentität: jede Menügruppe wird mit einer Arbeit des Nutzers im Glossar des Projekts benannt, jede Funktionalität hat genau ein kanonisches Zuhause, keine bleibt Waise und jede Gruppe ist vom Einstiegsbildschirm aus in nicht mehr als drei Schritten erreichbar. Danach erklärst du die Barrierefreiheit in einer einzigen Matrix und leitest alles aus ihr ab: jede Funktionalität zählt auf, welche Profile sie haben, jede Funktionalität hat mindestens ein Profil, jedes Profil hat mindestens eine Funktionalität und einen eigenen Einstiegspunkt, die Navigation wird aus der Matrix erzeugt statt von Hand geschrieben, und jede Route prüft die Berechtigung auf der Serverseite, weil einen Eintrag zu verbergen nicht heißt, ihn zu schützen. Prüfe die Matrix pro Profil mit einem End-to-End-Test, der das Erreichbare gegen die Zeile der Matrix vergleicht: weder weniger noch mehr. Verlange die vier Zustände in jeder Liste (mit Daten, leer, ladend, mit Fehler), einen sichtbaren Indikator laufender Arbeit mit Abbruchmöglichkeit bei langen Vorgängen, eine Fehlermeldung, die sagt, was passiert ist und was zu tun ist, ohne das Eingetragene zu verlieren, eine Hauptaktion pro Bildschirmseite, Bestätigung oder Rückgängigmachen bei destruktiven Aktionen und ein Formular, das das Geschriebene behält. Führe jeden manuellen Testfall einmal pro betroffenem Profil aus, führe den Test des ersten Klicks beim Abschluss jedes Blocks aus und verlange einen echten Screenshot der Testumgebung bei jedem offenen Punkt, der eine Bildschirmseite berührt. Registriere das Ergebnis pro Regel, mit den vom Eigentümer erklärten Ausnahmen, in `docs/USABILITY.md`, und halte die Matrix in `docs/PROFILE_MATRIX.md` als einzige Quelle der Wahrheit.

## 9. Was dieser Vorschlag nicht tut

- **Er fügt keine Stufe hinzu.** Es sind fünfundvierzig querliegende Regeln (18 zu Qualität und 27 zu Benutzbarkeit), keine neue Etappe. Sie hängen an den Stufen, die es bereits gibt.
- **Er erfindet keine Punktzahl.** Eine Zahl „Benutzbarkeit 78" sagt nicht, was zu reparieren ist, und wird in die falsche Richtung optimiert. Es wird pro Regel berichtet. Abschnitt 12 schlägt zwei abgeleitete Kennzahlen vor, aber sie sind eine Auszählung von Regeln mit ihrer Begründung — keine Note für Qualität oder Benutzbarkeit — und sie ermächtigen nicht, irgendetwas zu schließen.
- **Er ersetzt nicht den Eigentümer.** Der Test des ersten Klicks, der Screenshot und der Aufgabentest bleiben menschlich: sie sind das einzige Instrument, das „es funktioniert" von „es dient" unterscheidet.
- **Er bringt keine Schwellenwerte ab Werk.** Die des Adapters sind ein erklärter Ausgangspunkt; das Projekt, das seine eigenen nicht erklärt, erbt sie, und das wird als solches registriert.
- **Er verspricht nicht, dass das Gate die schlechte Gruppierung erkennt.** Eine Maschine kann prüfen, dass es keine Duplizierung und keine Waisen gibt; heißt die Gruppe „Verwaltung", muss es eine Person sehen.

## 10. Die Entscheidungen: was entschieden wurde und was fehlt

### Entschieden

| # | Entscheidung | Register |
|---|---|---|
| 1 | **Querliegend zum Konstruktionszyklus, keine eigene Stufe.** Die Leiter wird nicht umnumeriert, die Schrittanzahl ändert sich nicht, und der Anhang erbt nicht die Pflicht, einen Stufenvertrag zu übersetzen. | D-043 |
| 2 | **Eine kanonische Quelle mit fünf Ankern und zwei vorherigen Eingängen,** statt die fünfundvierzig Regeln in die acht Prompts des Zyklus zu kopieren. | D-044 |
| 3 | **Zwei unabhängige Schalter** (Qualität und Benutzbarkeit), drei Zustände pro Regel (blockiert, warnt, abgeschaltet), Adapter pro Frontend-Familie, Schwellenwerte und Ausnahmen vom Eigentümer erklärt. | D-045 |
| 4 | **Disziplin des Schalters:** er lebt in der Konfiguration des Projekts und nicht im Prompt; abschalten gilt nur als registrierte Entscheidung mit Begründung, Genehmiger und Datum der Überprüfung; das Abschalten ist im Bericht beobachtbar; und der Schalter wird durch Ein- und Ausschalten geprüft. | D-046 |
| 5 | **Anfangsschweregrade, Regel für Regel festgelegt:** in Qualität blockieren vierzehn (CQ-01 bis CQ-06, CQ-08, CQ-11 bis CQ-17), CQ-09 blockiert, wo es echte Nutzer gibt, und drei warnen (CQ-07, CQ-10, CQ-18). In Benutzbarkeit blockieren elf (UX-02, UX-03, UX-08 bis UX-12, UX-15, UX-16, UX-22, UX-27), UX-06 registriert nur und der Rest warnt. Weder „alles blockiert" — das Projekt startet nicht — noch „alles warnt" — die Heuristik ist Dekoration. | D-048 |
| 6 | **Die Barrierefreiheit beginnt mit Warnen und steigt per Erklärung des Eigentümers zum Blockieren,** wenn das Produkt Endnutzer außerhalb der Organisation hat. Der Default wird nicht erfunden: der Aufstieg wird erklärt, mit demselben Mechanismus wie jeder Schwellenwert (D-045). | D-048 |

### In D-048 geschlossen, und die beiden Korrekturen, die es mitbringt

Die beiden Fragen, die das Schreiben der Prompts blockierten, sind beantwortet: die erste in Zeile 5 und die zweite in Zeile 6. Aber die Empfehlung, die genehmigt wurde, hatte zwei Sachfehler, und sie stehen hier, damit sie nicht zurückkommen:

1. **Der Zählfehler.** Wo dieser Anhang „siebenundzwanzig Regeln" sagte, ist die richtige Zahl **fünfundvierzig**: 18 zu Qualität (CQ-01 bis CQ-18) und 27 zu Benutzbarkeit (UX-01 bis UX-27). Die alte Zahl kam aus einem Entwurf, der nur die Hälfte zählte. Korrigiert in den Abschnitten 6 und 9 und in D-048 vermerkt; der Text von D-044 bleibt so erhalten, wie er geschrieben wurde, weil eine Entscheidung ein Register ist und nicht umgeschrieben wird.
2. **Formatierer, Linter, Größe und Komplexität werden nicht gelockert.** Eine frühere Fassung dieser Empfehlung schickte sie zu „warnt", um Projekte mit geerbter Schuld nicht zu blockieren. Das kann nicht sein: Stufe 9 blockiert sie heute bereits, und diese Erweiterung erweitert sie, ersetzt sie nicht. Die geerbte Schuld wird mit einer erklärten Ausnahme gelöst — mit Begründung und Datum der Überprüfung — oder mit der Grundlinie der Sperrklinke, nicht durch Senken des Schweregrads der Regel.

Und eine erklärte Einschränkung, weil sie die einzige ihrer Art ist: **CQ-12 und CQ-14 blockieren mit menschlichem Rot.** Kein Werkzeug prüft, dass eine Bildschirmseite keine Geschäftsregeln entscheidet. Sie werden beim Abschluss des offenen Punktes geprüft, mit dem manuellen Fall vor Augen und demselben Kriterium wie UX-22 und UX-27; kann das Projekt diesen Abschluss nicht tragen, sinken sie per registrierter Entscheidung auf WARNT. Eine Regel, die blockiert und die niemand prüft, ist schlimmer als eine Regel, die warnt.

### Kalender, keine Entscheidung

**Die Übersetzung.** Der Anhang tritt auf Spanisch ein und wird als Referenz gelesen; an dem Tag, an dem sein Prompt in `docs/html/api/prompts.json` eintritt, verlangt `build/prompts.mjs`, dass der Text in den acht Sprachen Byte für Byte identisch ist, sonst schlägt die Konstruktion fehl. Zu entscheiden gibt es nichts mehr: der Text wurde mit den Schweregraden in D-048 festgeschrieben. Was bleibt, ist Kalender: übersetzen und in der API veröffentlichen.

## 11. Wie geprüft wird, dass das Gate wirklich wacht

Eine Heuristik, die nichts ändert, wenn man sie ein- oder ausschaltet, ist kein Gate, sondern Dekoration. Die Abnahmeprüfung der Implementierung (PND-002) ist ein Fixture-Projekt mit absichtlichen Verstößen jeder Familie:

| Szenario | Verlangtes Ergebnis |
|---|---|
| Qualität eingeschaltet, mit Verstoß | Rot, mit Nennung der Regel und der Datei, in der der Verstoß liegt. |
| Qualität abgeschaltet **mit Register** | Grün, und der Bericht **sagt**, dass sie abgeschaltet ist, seit wann und wer es genehmigt hat. |
| Qualität abgeschaltet **ohne Register** | Rot. Abschalten ohne schriftliche Begründung ist ein Fehler, kein Fehlen einer Regel. |
| Benutzbarkeit eingeschaltet, mit einem Profil, das zu viel erreicht | Rot in UX-12, mit Nennung des Profils und der Funktionalität. |
| Benutzbarkeit eingeschaltet, mit einer Funktionalität ohne Zeile in der Matrix | Rot in UX-08 beim Schließen des offenen Punktes (UX-16). |
| Beide Gruppen abgeschaltet | Grün in beiden, mit den beiden Abschaltzeilen im Bericht. |
| Es wird ein Verstoß einer Regel gepflanzt, die **warnt** | Grün, und es öffnet sich ein offener Punkt, der die Regel und die Datei nennt: warnen heißt nicht genehmigen. |
| Es wird ein Verstoß einer Regel gepflanzt, die **blockiert** | Rot, mit Nennung von Regel, Datei und Abhilfe. Und es gibt kein Dashboard: der Durchschnitt schließt keine Blöcke. |
| Dashboard: eine Regel wird **mit Register** abgeschaltet | Die Erfüllung kann steigen, aber die **Abdeckung des Gates sinkt**, und die Kennzahl wird mit der Begründung veröffentlicht, die es erklärt. Mit einer einzigen Kennzahl bliebe dieses Szenario unbemerkt; es ist der Beweis, dass die zwei Kennzahlen einen Grund haben (D-047). |
| Dashboard: zwei Läufe mit verschiedenen Regelwerken | Die beiden Kennzahlen werden mit ihrem Fingerabdruck gezeigt (Version des Katalogs, aktive und abgeschaltete Regeln, Adapter, Werkzeugversionen) und **nicht als fortlaufende Reihe gezeichnet**: es sind zwei verschiedene Maßstäbe, und das zu sagen gehört zum Ergebnis. |
| Dashboard: ungültiges Regelwerk (abgeschaltete Regel ohne Register) | Es werden keine Kennzahlen ausgegeben. Die Ausgabe ist rot, nicht ein Dashboard mit Sternchen. |
| Dashboard: hohe Erfüllung mit einer blockierenden Regel in Rot | Der Block **schließt nicht**. Das Dashboard mittelt; das Grün entscheidet jede Regel, eine nach der anderen. |
| Dashboard: der Prozentsatz steigt durch Berühren nur des Automatischen | Der Prozentsatz steigt und die Linie der menschlichen Prüfung bewegt sich nicht; sie wird getrennt berichtet und der Bericht summiert die beiden Dinge nicht in einer einzigen Zahl. |

Angesehen wird nicht nur die Farbe: angesehen wird, dass die beiden Abschaltzeilen im Bericht **existieren**. Ein grünes Ergebnis ohne diese Zeile ist der einzige Fehler, den diese Prüfung nicht von selbst an der Farbe erkennt, und deshalb wird sie durch Lesen der Ausgabe geprüft.

## 12. Das Compliance-Dashboard (ENTSCHIEDEN: zwei Kennzahlen, D-047)

**Status.** Entschieden am 2026-10-22 in D-047: das Dashboard geht mit zwei Kennzahlen, mit dem Fingerabdruck des Regelwerks, mit Sperrklinke, mit dem Menschlichen außerhalb des Prozentsatzes und mit der Pflichtbegründung. Es ermächtigt nicht, Blöcke zu schließen. Was folgt, ist die Spezifikation, die die Implementierung (PND-002) erfüllen muss.

**Was es ist.** Ein deterministisches Derivat des Ergebnisses pro Regel, das das Gate bereits ausgegeben hat. Es misst nichts Neues und beurteilt nichts Neues: es zählt. Könnte das Dashboard das Urteil einer Regel ändern, gäbe es zwei Quellen der Wahrheit für dasselbe, und genau das bekämpft der Anhang in UX-10 (die Navigation wird aus der Matrix abgeleitet) und in CQ-14 (ein einziger Ort für den Zustand).

**Was es nicht ist.** Es ist kein Abnahmekriterium. Keine Kennzahl ermächtigt, einen Block zu schließen: Grün oder Rot entscheidet jede blockierende Regel, eine nach der anderen. Das Dashboard beschreibt die Tendenz und zeigt, was anzusehen ist. Beginnt man, es als Schließschwelle zu nutzen, dient es nicht mehr, denn der kürzeste Weg, eine Zahl zu erhöhen, ist das Abschalten von Regeln.

**Zwei Kennzahlen, niemals eine.**

| Kennzahl | Formel | Was sie misst | Wie sie sich bewegt |
|---|---|---|---|
| **Erfüllung** | bestandene Regeln ÷ aktive Regeln | wie sauber das ist, was angesehen wird | steigt, wenn repariert wird |
| **Abdeckung des Gates** | aktive Regeln ÷ im Katalog erklärte Regeln | wie viel des Anhangs wirklich hinsieht | sinkt, wenn eine Regel abgeschaltet wird |

Der Grund, dass es zwei sind: eine Regel abzuschalten **hebt** die Erfüllung und **senkt** die Abdeckung. Mit einer einzigen Kennzahl ist Abschalten gratis und das Dashboard belohnt Blindheit. Mit zwei Kennzahlen, die sich in entgegengesetzte Richtungen bewegen, verschwindet die Abkürzung: um ein besseres Dashboard zu zeigen, muss Code repariert werden, nicht eine Regel abgeschaltet. Und die Abdeckung lässt sich nicht erhöhen, ohne zu messen.

**Der Fingerabdruck des Regelwerks.** Jeder Eintrag behält, mit welchem Maßstab er berechnet wurde: Version des Katalogs, aktive und abgeschaltete Regeln, Frontend-Adapter und Werkzeugversionen. Ohne das sind eine 82 von gestern und eine 91 von heute nicht dieselbe Messung, obwohl sie gleich geschrieben werden: es sind zwei verschiedene Regelwerke und die Reihe ist falsch. Zwei Kennzahlen ohne Fingerabdruck erzeugen eine Illusion von Fortschritt, die schlimmer ist als kein Dashboard. Ändert sich der Fingerabdruck, wird der Eintrag als **nicht vergleichbar** markiert oder die Historie wird mit dem geltenden Maßstab neu berechnet; niemals wird sie ohne diesen Hinweis daneben gezeichnet.

**Sperrklinke.** Die Erfüllung sinkt von einem Block zum nächsten nicht ohne eine registrierte Entscheidung, die es erklärt. Es ist derselbe Mechanismus, den die Testabdeckung in CQ-08 bereits hat: die Zahl von heute ist der Boden von morgen. Sinken ist nicht verboten; sinken ohne Register schon.

**Was nicht in die Rechnung eingeht.** Was nur eine Person beurteilen kann — der Test des ersten Klicks (UX-07), der Aufgabentest (UX-06), der Screenshot (UX-27) und alle manuellen Fälle — wird als bestanden oder fehlgeschlagen registriert, pro Block, mit Name und Datum, und getrennt als Abdeckung der menschlichen Prüfung berichtet. Es geht nicht in den Erfüllungsprozentsatz ein. Mischt man sie, ist das Ergebnis eine Zahl, die sechzig Prozent Messung und vierzig Prozent Meinung ist, und niemand kann sagen, was was ist. Deshalb gilt Abschnitt 9 weiter: das Dashboard erfindet keine Benutzbarkeitsnote, es zählt Regeln.

**Wie es falsifiziert wird.** Erweitert die Abnahmeprüfung aus Abschnitt 11:

| Szenario | Verlangtes Ergebnis |
|---|---|
| Es wird ein Verstoß einer blockierenden Regel gepflanzt | Die Erfüllung sinkt um genau eine Regel über die aktiven, und das Rot erscheint mit Nennung der Regel. |
| Eine Regel wird mit Register abgeschaltet | Die Erfüllung kann steigen; die Abdeckung sinkt um eine Regel über die erklärten; der Bericht nennt die Regel, die Begründung und das Datum der Überprüfung. |
| Es wird ohne Register abgeschaltet | Rot, und es wird kein Dashboard ausgegeben: ein ungültiges Regelwerk erzeugt keine Kennzahlen. |
| Derselbe Baum und dieselbe Konfiguration, zwei Läufe | Dieselbe Kennzahl, identisch. |
| Die Konfiguration ändert sich zwischen zwei Blöcken | Die beiden Einträge werden als nicht vergleichbar markiert, oder die Historie wird mit dem geltenden Maßstab neu berechnet. |
| Das Dashboard wird als Schließkriterium genutzt | Unsachgemäße Nutzung, kein gültiges Szenario: das Grün entscheidet die Regel, nicht der Durchschnitt. |

**Wo es erscheint.** Im ehrlichen Bericht der Stufe 12 (Anker 5), und in dieser Reihenfolge: zuerst das binäre Urteil des Gates, dann die zwei Kennzahlen, dann was abgeschaltet ist und bis wann, dann die Bewegung gegen den vorigen Block mit ihrer genannten Ursache. Immer mit der Begründung: *sank um vier Punkte: CQ-15, drei Zeichenketten außerhalb des Katalogs auf der Kassiervorderseite*. Eine Kennzahl ohne Begründung ist Rauschen; die Begründung ist das, was sie für einen Eigentümer handlungsfähig macht, der keinen Code liest.

**Erklärtes Risiko.** Das Dashboard wird der Eigentümer lesen, der keinen Code liest, und deshalb wird er wollen, dass es steigt. Die Zahl wird zum Ziel, und das Ziel verdrängt den Zweck. Die Verteidigungen sind die oben, und es sind fünf: zwei Kennzahlen, die sich beim Abschalten widersprechen, der Fingerabdruck, der das Vergleichen verschiedener Maßstäbe verhindert, die Sperrklinke, die ohne Register nicht sinken lässt, das Menschliche außerhalb des Prozentsatzes und die Pflichtbegründung, mit dem Gate, über das nicht per Durchschnitt verhandelt wird. Fällt eine der fünf, wird das Dashboard abgeschaltet: ein schlecht genutztes Dashboard richtet mehr Schaden an, als keines zu haben.

## 13. Register

Jede Entscheidung dieses Anhangs steht in `docs/DECISIONES.md` mit Datum, Autor, wörtlichem Zitat und betroffenen Dateien: D-043 (Form), D-044 (Mechanismus), D-045 (Schalter), D-046 (Disziplin des Schalters), D-047 (das Dashboard mit zwei Kennzahlen). Die Implementierung und ihre Abnahmekriterien leben in PND-002.

Es bleibt keine Entscheidung offen: die Form (D-043 und D-044), die Schalter (D-045 und D-046), das Dashboard (D-047) und die Anfangsschweregrade mit dem Gewicht der Barrierefreiheit (D-048) sind entschieden. Was überlebt, ist Kalender: die Übersetzung in die acht Sprachen, wenn dieser Text in die Prompts-API eintritt.
