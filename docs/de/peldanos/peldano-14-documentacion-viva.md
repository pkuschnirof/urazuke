# Schritt 14 — Lebendige Dokumentation und Handbücher, denen ein Mensch ohne KI folgen kann (Sprossenvertrag)

**Phase:** Betrieb (entsteht mit dem System; wird bei jeder Änderung gepflegt).
**Form:** Routine; plus ein langer Durchgang, wenn die Handbücher erzeugt werden.
**Größe:** proportional. Ein kleines System braucht mindestens das Infrastruktur- und
Wiederherstellungshandbuch (wie man es hochfährt, wie man wiederherstellt); das Benutzerhandbuch
kann eine Seite sein. Was sich nicht ändert: wenn die Person, die es gebaut hat, verschwindet, muss
eine andere weitermachen können.

## Wozu sie dient

Damit das System ohne den Agenten und ohne die Person, die es gebaut hat, benutzt, gewartet und
wiederhergestellt werden kann. Wenn an dem Tag, an dem der Agent nicht da ist, nicht ausgerollt
werden kann, ist es nicht fertig. In der klassischen Methode war Dokumentation teuer und alterte;
hier ist das Neuerzeugen kostenlos, also wird die Regel zu „im selben Commit“ und „von Hand
reproduzierbar“. Sie verhindert das veraltete Dokument, das einen Commit im falschen Repository
verursachte, und die zur Geschichte gewordene Projektdatei.

Ein Qualitätskriterium für das Wiederherstellungshandbuch, mit dem man es beurteilen kann, ohne
Techniker zu sein: **eine Vertrauensperson, die nicht programmiert, muss ihm folgen können, um drei
Uhr morgens, mit ausgefallenem System und ohne Verbindung zum Agenten**. Wenn ein Schritt sagt
„den Entwickler fragen“ oder „je nach Fall“, ist dieser Schritt unvollständig.

## 1. Benötigter Kontext

- Wer die Leser jedes Handbuchs sind: der Endnutzer, der Wartende, der Infrastrukturbetreiber. Das
  Geschäft weiß es; der Agent fragt, wenn es unklar ist.
- Das in der Testumgebung laufende System, um echte Screenshots zu machen.
- `docs/DEPLOYMENT.md` (Sprosse 13) und `docs/LOCKS.md` (Sprosse 12), die Input sind.

## 2. Prompts

**Routine (gehört in die Arbeitsvereinbarung):**

> Every change that modifies what the user sees, what the operator does, or how the system is
> deployed, updates the corresponding manual in the same commit. If you do not know which
> manual, ask.

Was wir verlangen: die Regel des selben Commits, die einzige, die ein Handbuch aktuell hält, und
die Frage, wenn unklar ist, in welches Handbuch es gehört.

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

Was wir verlangen: die drei Handbücher mit ihren Lesern; **echte** Screenshots aus der
Testumgebung (keine Zeichnungen oder Beschreibungen); das Drei-Uhr-morgens-Kriterium für das
Wiederherstellungshandbuch; die Vollständigkeitsklausel in ihrer Dokumentationsform: was nur das
Geschäft weiß, wird erfragt, und **es wird keine Lücke gelassen und nichts erfunden**; und Datum
und Version, damit man weiß, zu welchem System jedes Handbuch gehört.

## 3. Erwartetes Ergebnis

- `docs/USER_MANUAL.md` (oder HTML), mit echten, eingebetteten Screenshots.
- `docs/MAINTENANCE_MANUAL.md`.
- `docs/INFRASTRUCTURE_AND_RECOVERY_MANUAL.md`: Schritt für Schritt, für einen Menschen.
- Jedes mit Datum und der Version des Systems, das es dokumentiert.
- In den Commits, die Bildschirme, Betrieb oder Deployment ändern: das aktualisierte Handbuch.

## 4. Vollständigkeitsprüfung

- Öffne das Benutzerhandbuch bei einem zufälligen Bildschirm: stimmt der Screenshot mit dem
  überein, was heute in der Testumgebung ist?
- Könntest du, oder eine Vertrauensperson, die nicht programmiert, dem Wiederherstellungshandbuch
  folgen? Lies den Abschnitt „es ist ausgefallen“: sagt er, was zu tun ist, in Reihenfolge, mit
  den Befehlen?
- Wähle einen kürzlichen Commit, der einen Bildschirm geändert hat: hat er das Handbuch berührt?
- Gibt es eine Lücke wie „[auszufüllen]“ oder „den Verantwortlichen fragen“? Dort hätte der Agent
  fragen müssen.
- Sagt jedes Handbuch, für welche Systemversion es gilt?

## 5. Warnsignale

- Das Benutzerhandbuch hat Screenshots einer Version, die nicht mehr existiert. Es wurde einmal
  erzeugt und nicht gepflegt: die Regel des selben Commits steht nicht in der Vereinbarung oder
  wird nicht angewendet.
- Das Wiederherstellungshandbuch beginnt mit „eine Sitzung mit dem Agenten öffnen“. Wenn der Agent
  Voraussetzung ist, ist es kein Handbuch für einen Menschen.
- Niemand außer dem Erbauer hat je das Wiederherstellungshandbuch gelesen. Bitte jemanden, ihm in
  der Testumgebung zu folgen; woran er hängen bleibt, ist, was zu beheben ist.
