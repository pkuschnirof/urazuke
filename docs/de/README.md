# Urazuke — die Nachweis-Methode

*Urazuke* (裏付け) ist ein japanisches Wort für den Rückhalt, den eine Behauptung hat: das, was sie
von hinten stützt. Das Verb *urazukeru* bedeutet „mit Belegen untermauern“. Das ist die Methode.

Eine Methode, um Software mit künstlicher Intelligenz zu bauen, die robust und produktionsreif
herauskommt, **ohne dass der Projekteigentümer je eine einzige Zeile Code lesen muss**. Destilliert
aus drei realen Systemen, die heute in Produktion sind, Rückschläge inklusive.

Dieser Ordner enthält die deutsche Fassung der Methode. Spanisch ist die Quelle der Wahrheit; wenn
beide Fassungen voneinander abweichen, gilt die spanische und die deutsche wird korrigiert.

## Die These in einem Satz

KI unterbricht die Methode nicht: sie setzt sie fort. Die Branche hat vor zwanzig Jahren aufgehört,
dem Autor des Codes zu vertrauen, und gelernt, Belege zu verlangen statt ihn zu lesen; das Modell
ist der nächste Autor, nicht der erste unzuverlässige. Das einzig wirklich Neue ist, dass dieser
Autor auch die Belege selbst herstellt, und deshalb muss der Beleg sich selbst beweisen.

## Was hier liegt

| Datei | Was es ist |
|---|---|
| `ESCALERA_METODOLOGICA.md` | Das Hauptdokument: die These, die Erhebung der drei Ursprungs-Repositories (Momente und Meilensteine mit ihren Commits), die sechzehn Sprossen der Leiter mit ihrer Karte, die realen Fehlschläge den Sprossen zugeordnet, was noch fehlt, und das Glossar. |
| `peldanos/peldano-NN-*.md` | Der Vertrag jeder Sprosse: benötigter Kontext, die Prompts (auf Englisch, eine einzige Quelle, in allen Sprachen identisch), das erwartete Ergebnis, die Vollständigkeitsprüfung und die Warnsignale. Das ist, was ein Lernender ausführt und was später nach Forge exportiert wird. |
| `peldanos/README.md` | Der Index der Verträge, mit der Phase jedes einzelnen. |
| `MANUAL_CURSO.md` | Der Kurs: sechzehn Lektionen, eine pro Sprosse, mit dem erklärten Konzept, der praktischen Aufgabe Schritt für Schritt mit den Prompts, der Vollständigkeitsprüfung, dem Ergebnis, den typischen Fehlern und dem Beispiel am Leitprojekt („Turnera“). Endet mit der Produktionsreife-Liste. |

Das Entscheidungsregister (`../DECISIONES.md`) bleibt nur auf Spanisch, weil es die wörtlichen
Aussagen des Eigentümers zitiert.

## Wie man es liest

Beginne mit `ESCALERA_METODOLOGICA.md` oder mit seinem HTML in `../html/de/`. Wenn dir ein
seltsames Wort begegnet, steht das Glossar am Ende. Danach der Vertrag der Sprosse, die dich
interessiert.

## Sprachen

Spanisch ist die Quelle der Wahrheit. Die Dokumentation existiert in den acht NAC3-Sprachen
(Spanisch, Englisch, Portugiesisch, Französisch, Deutsch, Italienisch, Japanisch und Chinesisch).
Die Prompts für das Modell sind ein einziges Stück auf Englisch, in allen Fassungen identisch, in
der Sprache des Lesers erklärt. Der Name wird nicht übersetzt; der Untertitel schon: *el método de
la evidencia*, *the evidence method*, *o método da evidência*, *la méthode de la preuve*, *die
Nachweis-Methode*, *il metodo del riscontro*, 裏付けの方法, 验证方法.

## Lizenz und Mitwirken

Die Methode wird unter **Creative Commons Namensnennung – Weitergabe unter gleichen Bedingungen
4.0** (`../../LICENSE`) veröffentlicht: man darf sie nutzen, übersetzen und anpassen, mit
Namensnennung und unter derselben Lizenz. Verbesserungen an **diesem** Repository kommen per Pull
Request aus einem Fork, mit ihrem Beleg, und werden von einem Maintainer nach Prüfung gemergt;
niemand sonst schreibt auf `main`. Der Prozess steht in `../../CONTRIBUTING.md`.

Die Kunden der Ursprungssysteme sind anonymisiert („die Krankenkasse“, „der Verein“); die Zahlen,
Daten und Commits sind echt.

## Herkunft

Pablo Kuschnirof (RPAForce / Yujin) und Sumi (die Claude-Code-Sitzung, die mit ihm arbeitet), aus
`yujin-forge`, `Autorisierungen` und `Kikan`. Oktober 2026.
