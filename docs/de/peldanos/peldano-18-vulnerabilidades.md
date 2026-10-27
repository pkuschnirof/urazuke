# Schritt 18 — Scannen und Beheben von Schwachstellen, in der Kette und mit Zeitplan (Schrittvertrag)

**Abschnitt:** Produktionsfreigabe.
**Wann:** in der Phase der Produktionsfreigabe, nach der 15 (der Scan läuft in der Continuous
Integration) und vor dem ersten Deployment: kein offenes P0 wird befördert. Danach bei jedem
Push, und mit einem eigenen Zeitplan (wöchentlich), auch wenn es keine Pushes gibt, denn neue
Schwachstellen tauchen auf, ohne dass du irgendetwas änderst. In einem Altsystem ist der erste
Durchlauf Teil von N3 (die Sicherheitsdimension des Audits), und die Befunde kommen mit ihrer
Geschwindigkeitsmarke in das Backlog.
**Form:** ein einziger Durchgang zum Aufbauen und Laufenlassen; danach automatisch, mit einem
Bericht, den du liest.
**Größe:** verpflichtend in jedem Projekt, das Nutzer haben wird: der Scan der Abhängigkeiten und
der Geheimnisse ist nicht verhandelbar; die statische Analyse und die Konfigurations-Basislinie
sind proportional.

## Wozu er dient

Das Audit aus Schritt 13 sieht sich das System hin und wieder mit frischen Augen an; dieser
Schritt sieht sich eine einzige Sache an, die Sicherheit, die ganze Zeit und maschinell. Sie
ergänzen sich: das Audit findet das, was Urteilsvermögen verlangt (eine Administratortür, die
niemand haben dürfte [Ref. 40](../REFERENCIAS.md#ref-40)); der Scan findet das, was Beharrlichkeit
verlangt (die Abhängigkeit, die gestern keine bekannte Schwachstelle hatte und heute schon
[Ref. 41](../REFERENCIAS.md#ref-41)). Das erste formale Sicherheitsaudit hat mich davon überzeugt,
dass Sicherheit eine periodische Routine ist und keine Liste, die man einmal abhakt
[Ref. 23](../REFERENCIAS.md#ref-23); dieser Schritt ist diese Routine, zur Maschine gemacht.

Und eine Regel, die ich geschrieben haben will: **eine Aktualisierung einer Abhängigkeit ist eine
Änderung**, und sie geht durch die Schleife wie jede andere. „Ich habe die Version hochgezogen,
um die Schwachstelle zu schließen“, ohne Regression und ohne Ende-zu-Ende-Prüfung, ist die
häufigste Art, die Produktion an einem Freitag kaputtzumachen.

**Wenn du Anfänger bist.** Eine *Schwachstelle* ist ein Defekt, den jemand nutzen kann, um
einzudringen, Daten zu stehlen oder das System etwas tun zu lassen, was es nicht tun sollte. Es
gibt vier Arten davon, die dieser Schritt maschinell sucht. In den *Abhängigkeiten*: den
Softwarebausteinen anderer, die dein System benutzt (es gibt öffentliche Datenbanken, die
auflisten, welche bekannte Defekte haben, mit einer CVE-Nummer gekennzeichnet). Im *Code*: die
*statische Analyse* liest den Code, ohne ihn auszuführen, und sucht nach gefährlichen Mustern,
etwa einer *Injektion* (dass ein Nutzer in ein Formular etwas schreibt, das die Datenbank als
Befehl auffasst). In der *Historie*: ein Geheimnis (ein Passwort, ein Schlüssel), das irgendwann
im Repository gespeichert wurde, ist immer noch da, auch wenn es später gelöscht wurde. Und in
der *Konfiguration*: offene Ports, die nicht nötig waren, Standardpasswörter, fehlende
*Sicherheits-Header* (Anweisungen, die der Server dem Browser schickt, um ihn zu schützen).

## 1. Benötigter Kontext

Was folgt, ist die generische Liste. Die konkreten Dateien, die du vor jedem Prompt fertig haben
musst, mit ihrem Inhalt und ihrem Mindestzustand, stehen in Abschnitt 2, in dem Block „Bevor du
den Prompt schickst“, der jedem einzelnen vorangeht.

- Die Continuous Integration (Schritt 4 und 15), in der der Scan läuft.
- Die Erhebung der Umgebungen: welcher Server, welcher Container, welche Ports, für die
  Konfigurations-Basislinie.
- Das vorherige Audit (11, oder N3), um nicht schon Bekanntes zu melden.
- Dein Kriterium dafür, was P0 ist: was das Eindringen erlaubt, was personenbezogene Daten
  offenlegt, was das Abbuchen oder Senden ohne Kontrolle erlaubt.

## 2. Prompts

**Zu Beginn (aufbauen, laufen lassen, vorschlagen):**

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- Die Continuous Integration, die bei jedem Push läuft (Schritt 4 und 15), mit ausreichendem
  Kontingent: der Scan fügt pro Durchlauf Minuten hinzu; finde heraus, wie viele dir bleiben.
- `docs/ENVIRONMENTS_SURVEY.md` mit dem Server, dem Container, falls es einen gibt, den
  freigegebenen Ports und der Angabe, wer die Domain verwaltet, damit der Agent weiß, welche
  Basislinie er anwenden soll.
- `docs/AUDIT_[Datum].md` (Schritt 13 oder N3), damit er nichts Bekanntes meldet.
- Dein P0-Kriterium in zwei Zeilen, für die Lücke im Prompt. Für die meisten Systeme: was das
  Eindringen ohne Zugangsdaten erlaubt, was personenbezogene Daten offenlegt, was das Abbuchen,
  Senden oder Löschen ohne Kontrolle erlaubt.
- Lesender Zugang des Agenten zum Server für die Konfigurations-Basislinie; wenn du ihn nicht
  gibst, bleibt dieser Teil ungescannt, und er muss das sagen.
- Akzeptabler Mindestzustand: die Continuous Integration läuft, du kennst das Kontingent, und du
  hast geschrieben, was P0 ist.

> We are going to scan this system for vulnerabilities and fix what matters before production.
> Set up, in continuous integration, on every push and also on a weekly schedule: (1) a scan of
> every dependency against the known vulnerability databases; (2) static analysis of the code for
> the common classes of defect (injection, insecure deserialization, path traversal, weak
> cryptography, hard-coded secrets, insecure defaults); (3) a secrets scan over the whole
> repository history; (4) a check of the server and container configuration against a baseline
> (exposed ports, default credentials, permissions, security headers, transport encryption). Run
> all of it now and write `docs/SECURITY_[date].md` with every finding: where, the risk, the
> evidence, the priority (P0 must be fixed now by my criteria: [criteria]; P1 before production;
> P2 when possible), and whether a fix exists (an upgrade, a patch, a configuration change). If a
> part cannot be scanned from where you are, say so and mark it as not scanned; do not pass it as
> clean. Then propose the fixes for every P0 and P1, one pending item each. Do not apply any
> upgrade yet: an upgrade is a change and goes through the full routine.
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
> Wir werden dieses System nach Schwachstellen durchsuchen und das reparieren, was zählt, bevor es
> in die Produktion geht. Bau in der Continuous Integration auf, bei jedem Push und auch mit einem
> wöchentlichen Zeitplan: (1) einen Scan jeder Abhängigkeit gegen die Datenbanken der bekannten
> Schwachstellen; (2) statische Analyse des Codes auf die gängigen Defektklassen (Injektion,
> unsichere Deserialisierung, Pfaddurchquerung, schwache Kryptografie, im Code geschriebene
> Geheimnisse, unsichere Standardwerte); (3) einen Scan nach Geheimnissen über die gesamte
> Historie des Repositorys; (4) eine Prüfung der Konfiguration des Servers und des Containers
> gegen eine Basislinie (freigegebene Ports, Standard-Zugangsdaten, Berechtigungen,
> Sicherheits-Header, Transportverschlüsselung). Lass das alles jetzt laufen und schreib
> `docs/SECURITY_[Datum].md` mit jedem Befund: wo, das Risiko, der Beleg, die Priorität (P0 muss
> jetzt repariert werden, nach meinem Kriterium: [Kriterium]; P1 vor der Produktion; P2, wenn es
> möglich ist), und ob es eine Reparatur gibt (eine Aktualisierung, ein Patch, eine
> Konfigurationsänderung). Wenn sich ein Teil von dort, wo du bist, nicht scannen lässt, sag es
> und markiere ihn als nicht gescannt; gib ihn nicht als sauber aus. Schlag dann die Reparaturen
> für jedes P0 und P1 vor, je ein offener Posten. Wende noch keine Aktualisierung an: eine
> Aktualisierung ist eine Änderung und geht durch die vollständige Routine. Antworte in meiner
> Sprache.
>
> Wenn du eine Entscheidung von mir brauchst, stelle die Frage mit den vier Teilen von UX-28
> (`docs/ANEXO_HEURISTICAS.md`) und in dieser Reihenfolge: die Daten, die die Frage nötig machen,
> aufgelistet; ein Absatz von höchstens fünf Zeilen, der sie verbindet und die Frage sichtbar
> macht; die Frage selbst mit ihren möglichen Antworten durchnummeriert; und deine Empfehlung.
> Sage es in der technischen Tiefe, die das Projekt in `communication_depth` erklärt hat
> —`beginner`, `decision_maker` oder `technical`—; hat das Projekt keine erklärt, nimm
> `decision_maker`.

Was ich hier verlange: die vier Scan-Schichten (Abhängigkeiten, Code, Geheimnisse in der
Historie, Konfiguration), in der Kette **und mit Zeitplan**, denn neue Schwachstellen warten
nicht auf deinen nächsten Push; den Bericht in der Form von Schritt 13, mit der Klausel „nicht
gescannt“ statt „sauber“; das von mir vorgegebene P0-Kriterium; und das Verbot, ohne Durchgang
durch die Schleife zu aktualisieren, das den kaputten Freitag verhindert.

**Zum Abschluss (reparieren und in ein Tor verwandeln):**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- `docs/SECURITY_[Datum].md`, von dir gelesen, mit zwei überprüften Befunden (verlang den Beleg).
- Die Liste der freigegebenen Reparaturen für die Lücke im Prompt; für jede Aktualisierung einer
  Abhängigkeit das Bewusstsein, dass sie eine Änderung ist und die Regression und die
  Ende-zu-Ende-Batterie laufen lassen wird.
- Akzeptabler Mindestzustand: kein P0 ohne Urteil.

> Fix [list], each as its own pending item, with its test proved red where a test applies (an
> injection that no longer passes, a header that is now present, a secret that is now refused),
> and with the regression suite and the end-to-end suite green after every upgrade. Run the scan
> again and show me it is clean of P0 and P1. Make the scan a gate in `docs/GATES.md`: nothing is
> promoted to production with an open P0, and a new P1 opens a pending item automatically. Record
> the policy, the schedule and what is not covered in `docs/SECURITY.md`.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [de]
> Repariere [Liste], jedes als eigenen offenen Posten, mit seinem rot bewiesenen Test, wo ein Test
> zutrifft (eine Injektion, die nicht mehr durchgeht, ein Header, der jetzt da ist, ein Geheimnis,
> das jetzt abgelehnt wird), und mit der Regression und der Ende-zu-Ende-Batterie in Grün nach
> jeder Aktualisierung. Lass den Scan erneut laufen und zeig mir, dass er frei von P0 und P1 ist.
> Mach aus dem Scan ein Tor in `docs/GATES.md`: nichts wird mit einem offenen P0 in die Produktion
> befördert, und ein neues P1 eröffnet automatisch einen offenen Posten. Halt die Richtlinie, den
> Zeitplan und das, was nicht abgedeckt ist, in `docs/SECURITY.md` fest.
>
> Wenn du eine Entscheidung von mir brauchst, stelle die Frage mit den vier Teilen von UX-28
> (`docs/ANEXO_HEURISTICAS.md`) und in dieser Reihenfolge: die Daten, die die Frage nötig machen,
> aufgelistet; ein Absatz von höchstens fünf Zeilen, der sie verbindet und die Frage sichtbar
> macht; die Frage selbst mit ihren möglichen Antworten durchnummeriert; und deine Empfehlung.
> Sage es in der technischen Tiefe, die das Projekt in `communication_depth` erklärt hat
> —`beginner`, `decision_maker` oder `technical`—; hat das Projekt keine erklärt, nimm
> `decision_maker`.

Was ich hier verlange: ein offener Posten pro Reparatur, mit dem Rot von Schritt 8, wo es möglich
ist (eine ohne Test reparierte Schwachstelle kommt mit dem nächsten Refactor zurück); den
wiederholten Scan als Beleg; und die Verwandlung in ein Tor, die dafür sorgt, dass dieser Schritt
weiterlebt, wenn niemand hinsieht.

## 3. Erwartetes Ergebnis

- Der Scan in vier Schichten, der bei jedem Push und wöchentlich läuft.
- `docs/SECURITY_[Datum].md` mit den Befunden und dem nicht Gescannten; `docs/SECURITY.md` mit der
  Richtlinie, dem Zeitplan, dem Tor und der Abdeckung.
- Die P0 und P1 repariert, jedes mit seinem offenen Posten und seinem Test, wo zutreffend.
- Das Tor in `docs/GATES.md`.

## 4. Vollständigkeitsprüfung

- Verlang den Link zum letzten Durchlauf des Scans: ist er grün, und von welchem Datum ist er?
- Sagt der Bericht, was er NICHT gescannt hat?
- Hat jedes P0 seinen mit Beleg geschlossenen offenen Posten, oder einen offenen mit Datum?
- Verlang von ihm, in einem Zweig absichtlich eine Abhängigkeit mit bekannter Schwachstelle
  einzufügen: wird die Kette rot?
- Weißt du, wann der nächste geplante Scan läuft?

## 5. Warnsignale

- Der Scan war beim ersten Mal sauber, in einem System, das älter als ein Monat ist. Das stimmt
  fast nie: es fehlt eine Schicht, oder es wurde nur der Zweig und nicht die Historie gescannt.
- Zehn Abhängigkeiten wurden in einem Commit aktualisiert, „um die Befunde zu schließen“. Dieser
  Commit hat kein Vorher und kein Nachher; er ist der kaputte Freitag, der schon wartet.
- Der Scan ist da, aber er ist kein Tor: er produziert Berichte, die niemand liest.
- Es gibt ein „akzeptiertes“ P0 ohne offenen Posten, ohne Datum und ohne Unterschrift.
