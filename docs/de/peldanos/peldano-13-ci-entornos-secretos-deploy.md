# Schritt 13 — Continuous Integration, Umgebungen, Geheimnisse und Deployment als Teil des Produkts (Schrittvertrag)

**Abschnitt:** Betrieb.
**Wann:** die Integrationskette und das Deployment in die Testumgebung werden in Schritt 4
aufgebaut. Der Abschluss Richtung Produktion —echte Umgebung, Geheimnisse auf dem Server,
Beförderung, getestetes Rollback, Sperre gegen Geheimnisse— geschieht im Abschnitt der
Produktionsfreigabe, nach dem Audit und den Sperren. Die Routine jedes Deployments gilt im ganzen
Betrieb.
**Form:** ein einziger Durchgang zum Aufbauen; Routine für jedes Deployment.
**Größe:** verpflichtend in jedem Projekt mit Nutzern. In einem kleinen kann „Continuous
Integration“ eine einzige GitHub-Action sein und „Umgebungen“ können zwei Ordner auf demselben
Server sein; was nicht verhandelbar ist: dass die Tests von allein laufen, dass die Konfiguration
nicht im Repository ist, und dass es ein Rollback gibt.

## Wozu er dient

Sorg dafür, dass der Weg in die Produktion ein reproduzierbares Paket ist: die Tests laufen EINMAL,
die Konfiguration lebt außerhalb des Repositorys, und die Geheimnisse kursieren nicht herum. Es
verhindert die dreimal pro Commit gelaufenen Tests und das verbrannte Kontingent
[Ref. 39](../REFERENCIAS.md#ref-39), das Schlag für Schlag mit offenen Posten gehärtete
Deployment, weil es spät entdeckt wurde [Ref. 32](../REFERENCIAS.md#ref-32), und die in den Chat
eingefügten Geheimnisse [Ref. 42](../REFERENCIAS.md#ref-42).

Zu den Geheimnissen gibt es eine Regel, die du als Reflex übernehmen sollst, ohne Ausnahmen: **ein
Geheimnis, das in einem Chat, in einem Log oder in einem Commit zu sehen war, ist kein Geheimnis
mehr**. Es ist egal, ob „es niemand gesehen hat“ oder ob „es danach gelöscht wurde“. Es wird
rotiert. Die Rotation kostet zehn Minuten; herauszufinden, ob jemand es benutzt hat, ist unmöglich.

## 1. Benötigter Kontext

Was folgt, ist die generische Liste. Die konkreten Dateien, die du vor jedem Prompt fertig haben
musst, mit ihrem Inhalt und ihrem Mindestzustand, stehen in Abschnitt 2, in dem Block „Bevor du
den Prompt schickst“, der jedem einzelnen vorangeht.

- **Erhebung der Umgebungen und Zugänge**, generisch: welche Umgebungen es gibt (Test,
  Produktion), wo sie laufen, wer Zugang hat, wie etwas von einer in die andere befördert wird,
  welche Geheimnisse existieren und wo sie heute leben, wie viel Kontingent an Continuous
  Integration es gibt. Der Agent bewertet, ob es reicht, und fragt.
- Das Skelett mit seiner Continuous Integration und seinem Deployment in die Testumgebung
  (Schritt 4).

## 2. Prompts

**Zu Beginn:**

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- `docs/ENVIRONMENTS_SURVEY.md` (Schritt 4), ergänzt um das, was für die Produktion fehlt: die
  Domäne und wer sie verwaltet; wo die Geheimnisse auf dem Server leben werden (Umgebungsdatei,
  Tresor) und welche es sind (der Name, nie der Wert); wie heute etwas von der Testumgebung in die
  Produktion befördert wird, falls es etwas gibt; wer die Produktion anfassen darf; wie viel
  Kontingent an kontinuierlicher Integration du hast (das Limit des Plans deines Anbieters) und
  wie viel du verbraucht hast; wie heute ein Rollback gemacht würde. Der Prompt nennt sie „the
  environments and access survey“: sag ihm, wo sie liegt.
- Der Zugang zur Produktion für den Agenten, von dir entschieden: welcher, mit welchen
  Zugangsdaten, und die Zugangsdaten außerhalb des Repositorys und des Chats.
- Das Skelett mit seiner kontinuierlichen Integration und seinem Deployment in die Testumgebung,
  funktionierend (Schritt 4), und `docs/STATUS.md` mit den Befehlen.
- Akzeptabler Mindestzustand: du weißt, wo die Geheimnisse leben werden und wie viel Kontingent
  dir bleibt. Wenn du das Kontingent nicht kennst, finde es vorher heraus: dieser Schritt
  existiert zum Teil deswegen.

> We are going to close the path to production. Read the environments and access survey.
> Evaluate whether you have what is needed to deploy to production safely (access, domain,
> where the secrets live, how to roll back); if anything is missing, ask me. Then set up: (1)
> continuous integration runs the full test suite exactly once per commit; (2) the deployment
> waits for that run's result and only packages and uploads, without running tests again; (3)
> each environment's configuration lives on the server (environment file or vault), never in the
> repository; (4) a written procedure to promote from the test environment to production, which
> can be run twice without breaking anything; (5) the rollback, tested; (6) an automatic check
> that prevents committing a secret. Document all of it in `docs/DEPLOYMENT.md` so that a person
> can do it by hand without you. Reply in my language.

> [de]
> Wir werden den Weg in die Produktion abschließen. Lies die Erhebung der Umgebungen und Zugänge.
> Bewerte, ob du hast, was nötig ist, um sicher in die Produktion zu deployen (Zugang, Domain, wo
> die Geheimnisse leben, wie man zurückrollt); wenn etwas fehlt, frag mich. Richte dann ein: (1)
> die Continuous Integration führt die vollständige Testbatterie genau einmal pro Commit aus; (2)
> das Deployment wartet auf das Ergebnis dieses Laufs und verpackt und lädt nur hoch, ohne die
> Tests erneut auszuführen; (3) die Konfiguration jeder Umgebung lebt auf dem Server
> (Umgebungsdatei oder Tresor), nie im Repository; (4) ein schriftliches Verfahren, um von der
> Testumgebung in die Produktion zu befördern, das zweimal laufen kann, ohne etwas zu brechen; (5)
> das Rollback, getestet; (6) eine automatische Prüfung, die verhindert, dass ein Geheimnis
> committet wird. Dokumentiere alles in `docs/DEPLOYMENT.md`, so dass eine Person es von Hand
> ohne dich tun kann. Antworte in meiner Sprache.

Was ich hier verlange, Klausel für Klausel: die Zugänge, bevor begonnen wird; die Tests **ein
einziges Mal** pro Commit (sie dreimal laufen zu lassen ist das, was das Kontingent verbrannt
hat); das Deployment, das nur verpackt; die Konfiguration außerhalb des Repositorys; die Beförderung
als wiederholbares Verfahren; das **getestete** Rollback (ein Rollback, das nie getestet wurde,
existiert nicht); die Sperre gegen Geheimnisse in den Commits; und die Dokumentation für eine
Person, die Schritt 14 angewandt auf die Infrastruktur ist.

**Routine jedes Deployments:**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- `docs/WORKING_AGREEMENT.md`, wo die Routine hinkommt.
- `docs/DEPLOYMENT.md` (der anfängliche Prompt dieses Schritts), geschrieben und von dir gelesen:
  könntest du ihm allein folgen?
- Vor jedem echten Deployment außerdem: die vollständige Ende-zu-Ende-Batterie grün mit der
  exakten Version (Schritt 7, Abschluss des Blocks), und das Audit gemacht, wenn es das erste
  Deployment ist (Schritt 11).
- Akzeptabler Mindestzustand: das Rollback wurde mindestens einmal getestet, bevor es Nutzer gibt.

> Before touching production: the test environment is green with the same version; the
> rollback is ready; and tell me what changes in the configuration. After deploying: show me
> the version running in production and an end-to-end check on production, read-only.

> [de]
> Bevor du die Produktion anfasst: die Testumgebung ist grün mit derselben Version; das Rollback
> ist bereit; und sag mir, was sich in der Konfiguration ändert. Nach dem Deployen: zeig mir die
> Version, die in der Produktion läuft, und eine Ende-zu-Ende-Prüfung auf der Produktion, nur
> lesend.

Was ich hier verlange: die drei Vorbedingungen (Testumgebung grün mit derselben Version, Rollback
bereit, Konfigurationsänderungen angekündigt) und die zwei nachträglichen Beweise (die laufende
Version und eine Ende-zu-Ende-Prüfung, ohne etwas zu schreiben).

**Wenn ein Geheimnis im Chat oder in einem Commit aufgetaucht ist:**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- Das identifizierte Geheimnis: welches es ist (sein Name, nie sein Wert), wo es aufgetaucht ist
  (der Chat, ein Commit, ein Log) und wann. Wenn es in einem Commit aufgetaucht ist, der Commit.
- Dein Zugang zu dem Ort, an dem es erzeugt wird (das Panel des Anbieters), für den Fall, dass der
  Agent es nicht allein rotieren kann. Die Rotation machst du oder macht er mit deinen
  Zugangsdaten, aber sie wird nicht aufgeschoben.
- Akzeptabler Mindestzustand: du kannst das Geheimnis benennen und sagen, wo es gesehen wurde. Und
  die Regel ohne Ausnahmen: dieser Prompt wird nicht „später“ geschickt.

> That secret is compromised: rotate it now, tell me everywhere else it was used, and add the
> check that would have caught it.

> [de]
> Dieses Geheimnis ist kompromittiert: rotiere es jetzt, sag mir, wo überall es sonst verwendet
> wurde, und füge die Prüfung hinzu, die es abgefangen hätte.

Was ich hier verlange: sofortige Rotation, Inventar, wo es sonst noch war, und die Prüfung, die es
erkannt hätte, damit es nächstes Mal nicht in den Chat gelangt.

## 3. Erwartetes Ergebnis

- Die Continuous Integration, die ein einziges Mal pro Commit läuft, mit dem Link zu einem Lauf.
- Das Deployment, das auf die Integration wartet und nur verpackt; gemessen: wie lange es vorher
  und nachher dauert.
- Die Konfiguration außerhalb des Repositorys; im Repo nur ein Beispiel ohne Werte.
- `docs/DEPLOYMENT.md`: wie man deployt, befördert und zurückrollt, Schritt für Schritt, für eine
  Person.
- Das Rollback mindestens einmal getestet, mit seinem Beleg.
- Die Anti-Geheimnis-Prüfung aktiv (ein Versuch, eines hochzuladen, abgelehnt).
- Eine Aufzeichnung des pro Monat verbrauchten Kontingents an Continuous Integration.

## 4. Vollständigkeitsprüfung

- Wie oft läuft die Batterie pro Commit? Es muss einmal sein. Verlang den Link.
- Gibt es einen echten Konfigurationswert (einen Schlüssel, ein Passwort, eine interne URL) im
  Repository? Bitte den Agenten zu suchen und dir die leere Suche zu zeigen.
- Könntest du `docs/DEPLOYMENT.md` allein befolgen, ohne den Agenten? Lies es mit dieser Frage.
- Wurde das Rollback getestet? Wann? Welchen Beleg gibt es?
- Wurde während des Projekts ein Geheimnis in den Chat eingefügt? Wenn ja, wurde es rotiert?
- Weißt du, wie viel Kontingent an Continuous Integration diesen Monat noch übrig ist?

## 5. Warnsignale

- Das Deployment in die Produktion wird „von Hand, schnell, weil es eine kleine Änderung ist“
  gemacht. Die kleinen Änderungen sind die, die die Produktion brechen, weil niemand sie testet.
- Die Beispieldatei der Konfiguration hat Werte, die echt aussehen. Wahrscheinlich sind sie es.
- Niemand kann sagen, wann das Rollback zuletzt getestet wurde.
