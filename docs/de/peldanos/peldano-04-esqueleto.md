# Schritt 4 — Das Skelett mit seinen Toren (Schrittvertrag)

**Abschnitt:** Start.
**Wann:** einmal, zum Abschluss der ersten Woche, nach der Dimensionierung und vor jeder
Funktionalität. Hier wird die gesamte anfängliche Infrastruktur und die Integrations- und
Deployment-Kette aufgebaut.
**Form:** ein einziger langer Durchgang, mit deiner visuellen Freigabe am Ende.
**Größe:** verpflichtend in jedem Projekt, das Nutzer haben wird. Bei einem wegwerfbaren Prototyp
kann man ihn überspringen; aber wenn der Prototyp überlebt (sie überleben immer), ist dieser
Schritt das Erste, was bezahlt werden muss.

## Wozu er dient

Sorg dafür, dass das System LEER startet, getestet und deployt wird, bevor es Funktionalität hat.
Das Deployment am Ende zu entdecken ist sündhaft teuer: in einem meiner Systeme kam es einen Monat
nach dem Start und kostete fünf offene Posten in Folge [Ref. 32](../REFERENCIAS.md#ref-32). Wenn
das Skelett in der ersten Woche deployt wird, treffen diese Schläge, wenn null Funktionalität auf
dem Spiel steht.

Die allgemeine Idee dahinter: **der Weg in die Produktion ist Teil des Produkts**, keine Formalität
am Ende. Ein System, das auf der Maschine des Programmierers läuft und sich nicht deployen lässt,
ist kein System; es ist eine Demo. Und die einzige Art zu wissen, dass der Weg funktioniert, ist,
ihn zu gehen, solange es noch nichts zu verlieren gibt. Deshalb wird in diesem Schritt alles
aufgebaut, was die Schleife später benutzen wird: das Repository mit seiner Struktur, die
Testumgebung, die Continuous Integration, die die Batterie bei jedem Push laufen lässt, und das
automatische Deployment in die Testumgebung.

## 1. Benötigter Kontext

Was folgt, ist die generische Liste. Die konkreten Dateien, die du vor jedem Prompt fertig haben
musst, mit ihrem Inhalt und ihrem Mindestzustand, stehen in Abschnitt 2, in dem Block „Bevor du
den Prompt schickst“, der jedem einzelnen vorangeht.

- `docs/SIZING.md` (Schritt 3): die gewählte Option definiert das Skelett.
- Erhebung der Umgebungen: wo es laufen wird (Cloud, eigener Server), ob es eine Testumgebung und
  eine Produktionsumgebung gibt, wer Zugang hat, wie heute deployt wird, falls es etwas gibt.
- Die Zugangsdaten des Ortes, an den deployt wird, und sei es ein kostenloser Dienst.
- Die Projektart: neu, Korrektur oder Weiterentwicklung von etwas Bestehendem.

## 2. Prompts

**Zu Beginn:**

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- `docs/ENVIRONMENTS_SURVEY.md`: die Erhebung der Umgebungen, von dir geschrieben. Wo das System
  laufen wird (ein Server, den du schon hast, ein Dienst in der Cloud, welcher); ob es eine
  Testumgebung und eine Produktion geben wird und ob sie schon existieren; wer worauf Zugang hat;
  wie heute deployt wird, falls es etwas gibt (von Hand, ein Skript, gar nicht); die Art des
  Projekts (neu, Korrektur oder Weiterentwicklung von etwas Bestehendem); und die URL oder die
  Domäne, die die Testumgebung haben wird, falls sie schon bekannt ist. Der Prompt nennt sie „the
  environments survey“, ohne Pfad: speichere sie unter diesem Namen oder sag ihm im Chat, wie sie
  heißt.
- Die Zugangsdaten für den Ort, an dem deployt wird, und sei es ein kostenloser Dienst: angelegt,
  von dir einmal getestet (ins Panel einloggen) und außerhalb des Repositorys aufbewahrt (in einer
  Umgebungsdatei auf deiner Maschine oder im Geheimnisverwalter deines Werkzeugs). Dem Agenten
  sagt man, wo sie liegen; man fügt sie ihm nicht in den Chat ein.
- `PROJECT.md` (Schritt 2) und `docs/SIZING.md` (Schritt 3), geschlossen: das Skelett wird auf der
  dort gewählten Option gebaut, und der Agent muss sie lesen.
- Akzeptabler Mindestzustand: du kommst selbst in den Dienst hinein, in dem deployt wird, und die
  Erhebung sagt, welches die Testumgebung ist. Ohne das bleibt das Skelett auf deiner Maschine,
  und der Schritt wird nicht erklommen.

> We are going to build the skeleton of the system, with no functionality at all. Read
> `PROJECT.md`, `docs/SIZING.md` and the environments survey. Evaluate whether you have what is
> needed for the skeleton to run in the test environment (access, URL, deployment method); if
> anything is missing, ask me before starting. Then build: the folder structure; the server and
> the UI starting up; the test structure with one smoke test that passes; continuous
> integration running that test suite on every push; and the deployment to the test
> environment. Declare the gates of the workflow (what must be green to move from one stage to
> the next) in `docs/GATES.md`. When done, take a screenshot of the empty UI running in the
> test environment and show it to me. Do not add any functionality "while you are at it".
> Reply in my language.

> [de]
> Wir werden das Skelett des Systems bauen, ganz ohne Funktionalität. Lies `PROJECT.md`,
> `docs/SIZING.md` und die Umgebungserhebung. Bewerte, ob du hast, was nötig ist, damit das
> Skelett in der Testumgebung läuft (Zugang, URL, Deployment-Methode); wenn etwas fehlt, frag
> mich, bevor du anfängst. Baue dann: die Ordnerstruktur; den Server und die Oberfläche, die
> starten; die Teststruktur mit einem Smoke-Test, der besteht; Continuous Integration, die diese
> Testbatterie bei jedem Push ausführt; und das Deployment in die Testumgebung. Deklariere die
> Tore des Arbeitsablaufs (was grün sein muss, um von einer Etappe zur nächsten zu kommen) in
> `docs/GATES.md`. Wenn du fertig bist, mach einen Screenshot der leeren Oberfläche, die in der
> Testumgebung läuft, und zeig ihn mir. Füge keine Funktionalität „wo du schon dabei bist“ hinzu.
> Antworte in meiner Sprache.

Was ich hier verlange: dass er prüft, ob er die Zugänge hat, bevor er anfängt (ohne das bleibt
das Skelett auf der Maschine des Agenten); die exakte Liste dessen, was ein Skelett ist (Struktur,
Start, ein Test, Continuous Integration, Deployment in die Testumgebung); die Tore schriftlich;
einen echten Screenshot der Testumgebung, der der einzige gültige Beleg dafür ist, dass deployt
wurde; und das ausdrückliche Verbot, Funktionalität hinzuzufügen, denn das Modell neigt zum „wo ich
schon dabei bin“, und das bricht den exakten Umfang.

**Zum Abschluss:**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- Der Screenshot der Testumgebung, den der Agent dir gezeigt hat, und dein eigener Besuch dieser
  URL aus deinem Browser: es muss dasselbe zu sehen sein. Es ist der erste menschliche Blick auf
  das System, und das ist ein Meilenstein.
- Ein Link auf einen grünen Lauf der kontinuierlichen Integration, beim Agenten angefordert und
  von dir geöffnet.
- `docs/GATES.md`, gelesen: jedes Tor hat eine prüfbare Bedingung.
- Akzeptabler Mindestzustand: du hast den leeren Bildschirm unter der echten URL gesehen, mit
  deinen eigenen Augen. Wenn du nur den Screenshot gesehen hast, genehmige nicht.

> Skeleton approved. Record in `docs/STATUS.md` the test environment URL, the command to run
> the tests and the command to deploy, and mark this step as done. Then run the deployment a
> second time and show me that the second run changed nothing.

> [de]
> Skelett freigegeben. Halte in `docs/STATUS.md` die URL der Testumgebung, den Befehl zum
> Ausführen der Tests und den Befehl zum Deployen fest, und markiere diesen Schritt als erledigt.
> Führe dann das Deployment ein zweites Mal aus und zeig mir, dass der zweite Lauf nichts geändert
> hat.

Was ich hier verlange: die drei Befehle dort hinterlassen, wo die nächste Sitzung sie findet, und
beweisen, dass das Deployment wiederholbar ist (es zweimal laufen lassen, ohne etwas zu brechen).
Dieser zweite Lauf ist der Beweis, dass das Verfahren ein Verfahren ist und kein Glück.

## 3. Erwartetes Ergebnis

- Das Repository mit der Struktur, dem Server und dem Bildschirm, die starten.
- Ein grüner Smoke-Test und die Batterie, die in Continuous Integration läuft (mit dem Link zum
  grünen Lauf).
- Das Deployment in die Testumgebung, das funktioniert, mit der URL, und zweimal ausgeführt.
- `docs/GATES.md`: die Liste der Tore, jedes mit der Bedingung zum Passieren.
- Ein Screenshot des leeren Systems, das in der Testumgebung läuft.
- `docs/STATUS.md` aktualisiert mit den drei Befehlen (ausführen, testen, deployen).

## 4. Vollständigkeitsprüfung

- Kannst du die URL der Testumgebung öffnen und den leeren Bildschirm sehen? (Das machst du, nicht
  der Agent.)
- Gibt es einen Link zu einem grünen Lauf der Continuous Integration?
- Wurde das Deployment zweimal ausgeführt, und der zweite Lauf hat nichts gebrochen?
- Sind die Tore mit je einer prüfbaren Bedingung aufgeschrieben?
- Gibt es irgendeine Funktionalität, die du nicht verlangt hast? Wenn ja, hat der Agent den
  exakten Umfang verletzt.

## 5. Warnsignale

- Das Skelett „läuft lokal“, aber das Deployment „sehen wir später“. Nein: das Deployment ist das
  Skelett.
- Der Screenshot stammt von der Maschine des Agenten, nicht aus der Testumgebung. Verlang die URL.
- Die Tore sagen Dinge wie „der Code hat gute Qualität“. Ein Tor ist eine prüfbare Bedingung: „die
  Batterie ist grün“, „das Deployment in die Testumgebung hat funktioniert“.
