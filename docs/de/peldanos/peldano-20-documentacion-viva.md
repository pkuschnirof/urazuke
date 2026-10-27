# Schritt 20 — Lebendige Dokumentation und Handbücher, denen eine Person ohne KI folgen kann (Schrittvertrag)

**Abschnitt:** Produktionsfreigabe.
**Wann:** das Benutzerhandbuch wächst mit jedem Funktionsblock, beim Abschluss, mit den neuen
Bildschirmen; gespeist von den geschlossenen Posten, die die Dokumentation des Erledigten sind. Die
drei vollständigen Handbücher werden im Abschnitt der Produktionsfreigabe erzeugt, nach Schritt
15, und der Test mit einer Person, die nicht programmiert, findet vor dem ersten Deployment statt.
Die Routine des selben Commits gilt im ganzen Betrieb.
**Form:** Routine; plus ein langer Durchgang, wenn die Handbücher erzeugt werden.
**Größe:** proportional. Ein kleines System braucht mindestens das Infrastruktur- und
Wiederherstellungshandbuch; das Benutzerhandbuch kann eine Seite sein. Was sich nicht ändert: wenn
die Person, die es gebaut hat, verschwindet, muss eine andere weitermachen können.

## Wozu er dient

Sorg dafür, dass das System ohne den Agenten und ohne dich benutzt, gewartet und wiederhergestellt
werden kann. Wenn es an dem Tag, an dem es keinen Agenten gibt, nicht deployt werden kann, ist es
nicht fertig. In der klassischen Methode war Dokumentation teuer und alterte; hier ist sie neu zu
erzeugen gratis, also wird die Regel zu „im selben Commit“ und „von Hand reproduzierbar“. Die
Handbücher, die ich für die Krankenkasse mit diesem Kriterium geschrieben habe, sind das Vorbild
[Ref. 24](../REFERENCIAS.md#ref-24); und die Projektdatei, die zu einer Historie von tausenden
Zeilen wurde, ist das Gegenbeispiel [Ref. 41](../REFERENCIAS.md#ref-41).

Ein Qualitätskriterium für das Wiederherstellungshandbuch, das erlaubt, es ohne Technikkenntnis zu
beurteilen: **eine Vertrauensperson, die nicht programmiert, muss ihm folgen können, um drei Uhr
morgens, mit ausgefallenem System und dem Agenten ohne Verbindung**. Wenn in irgendeinem Schritt
„mit dem Entwickler abklären“ oder „je nach Fall“ steht, ist dieser Schritt unvollständig.

Und diese Probe **hinterlässt drei Dinge schriftlich**, denn wenn sie nichts hinterlässt, ist die
Schranke erfüllt, ohne irgendetwas zu messen — was die billigste Art ist, eine dekorative Schranke zu
haben. Die drei sind: die **gemessene Zeit** von Ende zu Ende (wann die Person anfing, wann das
System wieder funktionierte), die **genaue Stelle, an der sie hängen blieb** (der Schritt des
Handbuchs, mit ihren Worten, nicht mit deinen), und **jedes Wort, das sie nicht verstanden hat**. Die
drei gehen mit Datum und mit dem Namen dessen, der die Probe gemacht hat. Und jedes Wort, das sie
nicht verstanden hat, **eröffnet einen offenen Posten**: entweder wird es im Handbuch erklärt, oder
die Sache wird im ganzen System umbenannt. Diese Liste von Wörtern ist außerdem der beste Zufluss für
das Benutzerglossar von Schritt 2, und die Retrospektive von Schritt 23 benutzt sie als
Änderungsvorschlag.

Ohne diese Handbücher, in einem Wort gesagt, das keine Erklärung braucht: **der Eigentümer ist kein
Eigentümer, er ist Mieter**. Er hat das System, er bezahlt es, und er kommt nicht hinein, ohne den um
Erlaubnis zu bitten, der es gebaut hat.

Und eine Quelle, die man nicht ungenutzt lassen darf: die geschlossenen Posten. Jeder bringt seine
Spezifikation, seine Entscheidung, seinen Beleg und sein Datum mit. Das Benutzerhandbuch wird
nicht am Ende von null geschrieben: es wird, Block für Block, aus den geschlossenen Posten
zusammengesetzt, und das Änderungsprotokoll entsteht direkt aus ihnen.

## 1. Benötigter Kontext

Was folgt, ist die generische Liste. Die konkreten Dateien, die du vor jedem Prompt fertig haben
musst, mit ihrem Inhalt und ihrem Mindestzustand, stehen in Abschnitt 2, in dem Block „Bevor du
den Prompt schickst“, der jedem einzelnen vorangeht.

- Wer die Leser jedes Handbuchs sind: der Endnutzer, der Wartende, der Betreiber der
  Infrastruktur. Das weiß das Geschäft; der Agent fragt, wenn es nicht klar ist.
- Das System, das in der Testumgebung läuft, um echte Screenshots zu machen.
- Die geschlossenen Posten des Blocks, mit ihrer Abschlussdokumentation (Schritt 5).
- `docs/DEPLOYMENT.md` (Schritt 15) und `docs/LOCKS.md` (Schritt 14), die Eingaben sind.

## 2. Prompts

**Routine (gehört in die Arbeitsvereinbarung):**

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- `docs/WORKING_AGREEMENT.md`, wo die Routine hinkommt.
- Die Entscheidung, welche Handbücher das System haben wird und für wen jedes ist (der Endnutzer,
  der Wartende, der die Infrastruktur betreibt), geschrieben in `PROJECT.md` oder im Chat gesagt,
  damit „das entsprechende Handbuch“ einen Sinn hat.
- Akzeptabler Mindestzustand: es gibt eine Liste von Handbüchern, jedes mit seinem Leser.

> Every change that modifies what the user sees, what the operator does, or how the system is
> deployed, updates the corresponding manual in the same commit. At the close of every
> functional block, add to the user manual the screens and flows of the pending items closed
> in that block, with real screenshots from the test environment, and add their entries to the
> changelog. If you do not know which manual, ask.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [de]
> Jede Änderung, die verändert, was der Nutzer sieht, was der Betreiber tut oder wie das System
> deployt wird, aktualisiert das entsprechende Handbuch im selben Commit. Beim Abschluss jedes
> Funktionsblocks füge dem Benutzerhandbuch die Bildschirme und Flüsse der in diesem Block
> geschlossenen Posten hinzu, mit echten Screenshots aus der Testumgebung, und füge ihre
> Einträge dem Änderungsprotokoll hinzu. Wenn du nicht weißt, in welches Handbuch, frag.
>
> Wenn du eine Entscheidung von mir brauchst, stelle die Frage mit den vier Teilen von UX-28
> (`docs/ANEXO_HEURISTICAS.md`) und in dieser Reihenfolge: die Daten, die die Frage nötig machen,
> aufgelistet; ein Absatz von höchstens fünf Zeilen, der sie verbindet und die Frage sichtbar
> macht; die Frage selbst mit ihren möglichen Antworten durchnummeriert; und deine Empfehlung.
> Sage es in der technischen Tiefe, die das Projekt in `communication_depth` erklärt hat
> —`beginner`, `decision_maker` oder `technical`—; hat das Projekt keine erklärt, nimm
> `decision_maker`.

Was ich hier verlange: die Regel des selben Commits, die einzige, die ein Handbuch aktuell hält;
den Blockabschluss als Moment, in dem die geschlossenen Posten zu Handbuch und Änderungsprotokoll
werden; und die Frage, wenn nicht klar ist, in welches Handbuch es gehört.

**Zum Erzeugen der Handbücher:**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- Das System, in der Testumgebung laufend, mit realistischen Daten, nicht leer: die Screenshots
  kommen von dort.
- Die geschlossenen offenen Posten mit ihrer Abschlussdokumentation (Schritt 5), die die Quelle
  des Benutzerhandbuchs und des Änderungstagebuchs sind.
- `docs/DEPLOYMENT.md` (Schritt 15) und `docs/LOCKS.md` (Schritt 14), die die Eingabe des
  Infrastruktur- und Wiederherstellungshandbuchs sind.
- Was nur das Geschäft weiß, vorbereitet für den Moment, in dem der Agent fragt: wer für was
  verantwortlich ist, welche Telefonnummer man anruft, wenn es ausfällt, wer die Sicherungskopie
  macht, in welcher Sprache der Nutzer liest.
- Akzeptabler Mindestzustand: es gibt Daten in der Testumgebung, und du weißt, wen man um drei Uhr
  morgens anruft.

> Generate three manuals from the system as it is today in the test environment: the user
> manual (screen by screen, with real screenshots, in the user's language, no jargon); the
> maintenance manual (how it is built, where everything is, how to run the test suite, how to
> add a module); and the infrastructure and recovery manual (how to deploy, how to roll back,
> how to restore a backup, what to do if it goes down; written for a person who has to do it by
> hand, without AI, at three in the morning). If for any section you need something only the
> business knows (who is responsible for what, which phone number to call), ask me; do not leave
> a gap and do not invent. Each manual carries a date and the system version. Reply in my
> language.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

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
> Systemversion.
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

Was ich hier verlange: die drei Handbücher mit ihren Lesern; **echte** Screenshots aus der
Testumgebung (keine Zeichnungen oder Beschreibungen); das Kriterium der drei Uhr morgens für das
Wiederherstellungshandbuch; die Vollständigkeitsklausel in ihrer Form fürs Dokumentieren: was nur
das Geschäft weiß, wird erfragt, und **es wird keine Lücke gelassen und nichts erfunden**; und
Datum und Version, damit man weiß, zu welchem System jedes Handbuch gehört.

## 3. Erwartetes Ergebnis

- `docs/USER_MANUAL.md` (oder HTML), mit echten, eingebetteten Screenshots, das Block für Block
  gewachsen ist.
- `docs/MAINTENANCE_MANUAL.md`.
- `docs/INFRASTRUCTURE_AND_RECOVERY_MANUAL.md`: Schritt für Schritt, für eine Person.
- `docs/CHANGELOG.md`, gespeist von den geschlossenen Posten.
- Jedes mit Datum und der Version des Systems, das es dokumentiert.
- In den Commits, die Bildschirme, Betrieb oder Deployment ändern: das aktualisierte Handbuch.
- **Der Eintrag der Probe des Wiederherstellungshandbuchs**, mit vier Dingen: dem Datum und dem Namen
  dessen, der sie gemacht hat; der gemessenen Zeit von Ende zu Ende; dem genauen Schritt, an dem sie
  hängen blieb, mit ihren Worten; und der Liste der Wörter, die sie nicht verstanden hat. Plus ein
  offener Posten für jedes dieser Wörter. Wo das geschrieben wird, ist deine Wahl — am Ende des
  Wiederherstellungshandbuchs selbst reicht —; was nicht optional ist, ist, dass es existiert.

## 4. Vollständigkeitsprüfung

- Öffne das Benutzerhandbuch bei einem zufälligen Bildschirm: stimmt der Screenshot mit dem
  überein, was heute in der Testumgebung ist?
- Könntest du dem Wiederherstellungshandbuch folgen, oder jemand aus deinem Vertrauen, der nicht
  programmiert? Lies den Abschnitt „es ist ausgefallen“: sagt er, was zu tun ist, in Reihenfolge,
  mit den Befehlen?
- Wähl einen jüngeren Commit, der einen Bildschirm geändert hat: hat er das Handbuch angefasst?
- Hat das Änderungsprotokoll einen Eintrag für jeden geschlossenen Posten des letzten Blocks?
- Gibt es eine Lücke vom Typ „[ergänzen]“ oder „mit dem Verantwortlichen abklären“? Dort hätte
  der Agent fragen müssen.
- Sagt jedes Handbuch, für welche Version des Systems es gilt?
- Hat die Probe des Wiederherstellungshandbuchs ihren Eintrag hinterlassen: wie lange sie dauerte, wo
  die Person hängen blieb und welche Wörter sie nicht verstanden hat, mit Datum und Namen? Und von
  diesen Wörtern: hat jedes einen offenen Posten eröffnet? Wenn der Eintrag „die Probe wurde gemacht"
  sagt und nichts weiter, kann die Probe nicht wiederholt oder verglichen werden: die Schranke ist
  auf dem Papier erfüllt.

## 5. Warnsignale

- Das Benutzerhandbuch hat Screenshots einer Version, die nicht mehr existiert. Es wurde einmal
  erzeugt und nicht gepflegt: die Regel des selben Commits steht nicht in der Vereinbarung oder
  wird nicht angewendet.
- Das Wiederherstellungshandbuch beginnt mit „öffne eine Sitzung mit dem Agenten“. Wenn der Agent
  Voraussetzung ist, ist es kein Handbuch für eine Person.
- Niemand außer dem Bauenden hat je das Wiederherstellungshandbuch gelesen. Bitte jemanden, ihm in
  der Testumgebung zu folgen; woran er hängen bleibt, ist das, was zu reparieren ist.
- Die Probe wurde gemacht und nicht festgehalten, oder festgehalten als „ging gut". Dann kann niemand
  sagen, wie lange sie dauerte und wo sie nahe daran war, nicht zu klappen, und das nächste Mal fängt
  man bei null an.
- Der Eintrag hat kein einziges Wort auf der Liste der nicht verstandenen. Das passiert ab und zu und
  ist wahr; es passiert immer und bedeutet, dass niemand gefragt hat.
