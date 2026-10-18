# Schritt 14 — Lebendige Dokumentation und Handbücher, denen eine Person ohne KI folgen kann (Schrittvertrag)

**Abschnitt:** Betrieb.
**Wann:** das Benutzerhandbuch wächst mit jedem Funktionsblock, beim Abschluss, mit den neuen
Bildschirmen; gespeist von den geschlossenen Posten, die die Dokumentation des Erledigten sind. Die
drei vollständigen Handbücher werden im Abschnitt der Produktionsfreigabe erzeugt, nach Schritt
13, und der Test mit einer Person, die nicht programmiert, findet vor dem ersten Deployment statt.
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

Und eine Quelle, die man nicht ungenutzt lassen darf: die geschlossenen Posten. Jeder bringt seine
Spezifikation, seine Entscheidung, seinen Beleg und sein Datum mit. Das Benutzerhandbuch wird
nicht am Ende von null geschrieben: es wird, Block für Block, aus den geschlossenen Posten
zusammengesetzt, und das Änderungsprotokoll entsteht direkt aus ihnen.

## 1. Benötigter Kontext

- Wer die Leser jedes Handbuchs sind: der Endnutzer, der Wartende, der Betreiber der
  Infrastruktur. Das weiß das Geschäft; der Agent fragt, wenn es nicht klar ist.
- Das System, das in der Testumgebung läuft, um echte Screenshots zu machen.
- Die geschlossenen Posten des Blocks, mit ihrer Abschlussdokumentation (Schritt 5).
- `docs/DEPLOYMENT.md` (Schritt 13) und `docs/LOCKS.md` (Schritt 12), die Eingaben sind.

## 2. Prompts

**Routine (gehört in die Arbeitsvereinbarung):**

> Every change that modifies what the user sees, what the operator does, or how the system is
> deployed, updates the corresponding manual in the same commit. At the close of every
> functional block, add to the user manual the screens and flows of the pending items closed
> in that block, with real screenshots from the test environment, and add their entries to the
> changelog. If you do not know which manual, ask.

> [de]
> Jede Änderung, die verändert, was der Nutzer sieht, was der Betreiber tut oder wie das System
> deployt wird, aktualisiert das entsprechende Handbuch im selben Commit. Beim Abschluss jedes
> Funktionsblocks füge dem Benutzerhandbuch die Bildschirme und Flüsse der in diesem Block
> geschlossenen Posten hinzu, mit echten Screenshots aus der Testumgebung, und füge ihre
> Einträge dem Änderungsprotokoll hinzu. Wenn du nicht weißt, in welches Handbuch, frag.

Was ich hier verlange: die Regel des selben Commits, die einzige, die ein Handbuch aktuell hält;
den Blockabschluss als Moment, in dem die geschlossenen Posten zu Handbuch und Änderungsprotokoll
werden; und die Frage, wenn nicht klar ist, in welches Handbuch es gehört.

**Zum Erzeugen der Handbücher:**

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

## 5. Warnsignale

- Das Benutzerhandbuch hat Screenshots einer Version, die nicht mehr existiert. Es wurde einmal
  erzeugt und nicht gepflegt: die Regel des selben Commits steht nicht in der Vereinbarung oder
  wird nicht angewendet.
- Das Wiederherstellungshandbuch beginnt mit „öffne eine Sitzung mit dem Agenten“. Wenn der Agent
  Voraussetzung ist, ist es kein Handbuch für eine Person.
- Niemand außer dem Bauenden hat je das Wiederherstellungshandbuch gelesen. Bitte jemanden, ihm in
  der Testumgebung zu folgen; woran er hängen bleibt, ist das, was zu reparieren ist.
