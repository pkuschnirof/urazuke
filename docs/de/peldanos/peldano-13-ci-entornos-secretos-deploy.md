# Schritt 13 — Continuous Integration, Umgebungen, Geheimnisse und Deployment als Teil des Produkts (Sprossenvertrag)

**Phase:** Betrieb (wird auf dem Skelett von Sprosse 4 aufgebaut; bei jeder Infrastrukturänderung
überarbeitet).
**Form:** ein Durchgang zum Aufbau; Routine für jedes Deployment.
**Größe:** verpflichtend in jedem Projekt mit Nutzern. In einem kleinen kann „Continuous
Integration“ eine einzige GitHub-Action sein und „Umgebungen“ zwei Ordner auf demselben Server;
nicht verhandelbar ist, dass die Tests von allein laufen, dass die Konfiguration nicht im Repository
liegt und dass es einen Rückweg gibt.

## Wozu sie dient

Damit der Weg in die Produktion ein reproduzierbares Paket ist: die Tests laufen EINMAL, die
Konfiguration lebt außerhalb des Repositories, und Geheimnisse treiben nicht herum. Sie verhindert
die dreimal pro Commit laufenden Tests (2.000 Minuten Kontingent in 16 Tagen), den in einem
Transkript abgedruckten Datenbankschlüssel, das CORS, das nur die erste Domain kannte, und die von
der Testbatterie überschriebene Konfiguration.

Zu den Geheimnissen gibt es eine Regel, die man als Reflex übernehmen sollte, ohne Ausnahme: **ein
Geheimnis, das in einem Chat, einem Log oder einem Commit zu sehen war, ist kein Geheimnis mehr**.
Egal, ob „niemand es gesehen hat“ oder ob „es danach gelöscht wurde“. Es wird rotiert. Die
Rotation kostet zehn Minuten; herauszufinden, ob jemand es benutzt hat, ist unmöglich.

## 1. Benötigter Kontext

- **Erhebung der Umgebungen und Zugänge**, generisch: welche Umgebungen es gibt (Test,
  Produktion), wo sie laufen, wer Zugang hat, wie etwas von einer in die andere befördert wird,
  welche Geheimnisse existieren und wo sie heute leben, wie viel Continuous-Integration-Kontingent es
  gibt. Der Agent bewertet, ob es reicht, und fragt.
- Das Skelett mit seiner Continuous Integration und seinem Deployment in die Testumgebung
  (Sprosse 4).

## 2. Prompts

**Eröffnung:**

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

Was wir verlangen, Klausel für Klausel: die Zugänge vor dem Start; die Tests **genau einmal** pro
Commit (sie dreimal laufen zu lassen hat das Kontingent verbrannt); das Deployment, das nur
verpackt; die Konfiguration außerhalb des Repositories; die Beförderung als wiederholbares
Verfahren; den **getesteten** Rollback (ein nie getesteter Rollback existiert nicht); die Sperre
gegen Geheimnisse in Commits; und die Dokumentation für einen Menschen, was Sprosse 14, auf die
Infrastruktur angewandt, ist.

**Routine jedes Deployments:**

> Before touching production: the test environment is green with the same version; the
> rollback is ready; and tell me what changes in the configuration. After deploying: show me
> the version running in production and an end-to-end check on production, read-only.

Was wir verlangen: die drei Vorbedingungen (Test grün mit derselben Version, Rollback bereit,
Konfigurationsänderungen angekündigt) und die beiden nachträglichen Belege (die laufende Version
und eine Ende-zu-Ende-Prüfung, die nichts schreibt).

**Wenn ein Geheimnis im Chat oder in einem Commit aufgetaucht ist:**

> That secret is compromised: rotate it now, tell me everywhere else it was used, and add the
> check that would have caught it.

Was wir verlangen: sofortige Rotation, Inventar, wo es sonst noch war, und die Prüfung, die es
erkannt hätte, damit es beim nächsten Mal nicht bis in den Chat gelangt.

## 3. Erwartetes Ergebnis

- Continuous Integration, die genau einmal pro Commit läuft, mit dem Link zu einem Lauf.
- Das Deployment, das auf die Integration wartet und nur verpackt; gemessen: wie lange es vorher und
  nachher dauert.
- Die Konfiguration außerhalb des Repositories; im Repo nur ein Beispiel ohne Werte.
- `docs/DEPLOYMENT.md`: wie man ausrollt, befördert und zurückrollt, Schritt für Schritt, für
  einen Menschen.
- Der Rollback mindestens einmal getestet, mit seinem Beleg.
- Die Anti-Geheimnis-Prüfung aktiv (ein Versuch, eines hochzuladen, abgelehnt).
- Eine Aufzeichnung des monatlich verbrauchten Continuous-Integration-Kontingents.

## 4. Vollständigkeitsprüfung

- Wie oft läuft die Batterie pro Commit? Es muss einmal sein. Verlange den Link.
- Gibt es einen echten Konfigurationswert (einen Schlüssel, ein Passwort, eine interne URL) im
  Repository? Bitte den Agenten zu suchen und dir die leere Suche zu zeigen.
- Könntest du `docs/DEPLOYMENT.md` selbst befolgen, ohne den Agenten? Lies es mit dieser Frage.
- Wurde der Rollback getestet? Wann? Welchen Beleg gibt es?
- Wurde während des Projekts ein Geheimnis in den Chat eingefügt? Wenn ja, wurde es rotiert?
- Weißt du, wie viel Continuous-Integration-Kontingent diesen Monat noch übrig ist?

## 5. Warnsignale

- Das Produktions-Deployment erfolgt „von Hand, schnell, weil es eine kleine Änderung ist“. Die
  kleinen Änderungen sind die, die die Produktion brechen, weil sie niemand testet.
- Die Beispiel-Konfigurationsdatei hat Werte, die echt aussehen. Wahrscheinlich sind sie es.
- Niemand kann sagen, wann der Rollback zuletzt getestet wurde.
