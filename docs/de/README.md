# Urazuke — die Nachweis-Methode

*Urazuke* (裏付け) ist ein japanisches Wort für den Rückhalt, den eine Behauptung hat: das, was sie
von hinten stützt. Das Verb *urazukeru* bedeutet „mit Belegen untermauern“. Das ist die Methode.

Eine Methode, um Software mit künstlicher Intelligenz zu bauen, die robust und produktionsreif
herauskommt, **ohne dass der Projekteigentümer je eine einzige Zeile Code lesen muss**. Ich habe
sie aus drei realen Systemen destilliert, die heute in Produktion sind, gestützt auf die
Systemtechnik von jeher und auf das, was mir diese Systeme darüber gezeigt haben, wo die Modelle
sie brüchig anwenden.

Autor: Pablo Kuschniroff, unterstützt von Claude Code. Veröffentlicht unter Creative Commons
BY-SA 4.0. Öffentliche Präsentation: [yujin.app/urazuke](https://yujin.app/urazuke/).

Dieser Ordner enthält die deutsche Fassung der Methode. Spanisch ist die Quelle der Wahrheit; wenn
beide Fassungen voneinander abweichen, gilt die spanische, und die deutsche wird korrigiert.

## Die These in einem Satz

Die KI unterbricht die Methode nicht: sie setzt sie fort. Die Branche hat vor zwanzig Jahren
aufgehört, dem Autor des Codes zu vertrauen, und gelernt, Belege zu verlangen, statt ihn zu lesen;
das Modell ist der nächste Autor, nicht der erste unzuverlässige. Das einzig Neue ist, dass dieser
Autor auch die Belege herstellt, und deshalb muss der Beleg sich selbst beweisen.

## Was hier liegt

| Datei | Was es ist |
|---|---|
| `ESCALERA_METODOLOGICA.md` | Das Hauptdokument: die These, woher die Methode kommt, die Zeitlinie (wann jeder Schritt erklommen wird und was dazwischen passiert: Infrastruktur, CI/CD, Anforderungsaufnahme, Entwicklung, Ende-zu-Ende-Tests, menschlicher Blick, menschliche Tests), die sechzehn Schritte mit ihrer Karte, was noch fehlt, und das Glossar. |
| `EVOLUTIVO_CORRECTIVO.md` | Der Weg für ein System, das schon existiert und nicht mit der Methode geboren wurde: die drei Anwendungsfälle der Methode, das Prinzip des Normalisierens ohne Neuschreiben, die acht Normalisierungsstationen (N0 bis N7) mit ihren Verträgen und Prompts, die Schleife im korrektiven und im evolutiven Modus, und die Ausgangsliste des Abschnitts. |
| `REFERENCIAS.md` | Die realen Fälle hinter der Methode, nummeriert („Ref. N“), mit Datum und Beleg, damit die Verfahren sauber bleiben und das Detail einen Klick entfernt ist. Enthält die Chronologien der drei Systeme und die Tabelle der Fehlschläge pro Schritt. |
| `peldanos/peldano-NN-*.md` | Der Vertrag jedes Schritts: wann, benötigter Kontext, Prompts auf Englisch mit ihrer Übersetzung und, vor jedem einzelnen, der Block „Bevor du den Prompt schickst“ mit den Dateien, die du selbst bauen musst, und ihrem Inhalt; erwartetes Ergebnis, Vollständigkeitsprüfung ohne Code zu lesen, Warnsignale. |
| `peldanos/README.md` | Der Index der Verträge. |
| `MANUAL_CURSO.md` | Der Kurs: Kalender, sechzehn Lektionen mit praktischen Aufgaben und Prompts, Leitprojekt („Turnera“), Produktionsreife-Liste. |
| `MANUAL_CURSO_EVOLUTIVO.md` | Teil 2 des Kurses: das geerbte Leitprojekt („Geerbte Turnera“), zehn Lektionen (N0 bis N7, R1 und R2), um ein Altsystem zu normalisieren und es danach zu korrigieren und weiterzuentwickeln. |
| `../DECISIONES.md` | Die Entscheidungen des Projekts, mit Datum und wörtlichen Worten. Die Methode wird auf sich selbst angewendet. Nur auf Spanisch. |
| `../PLAN_CURSO_MENTORING.md` | Der Entwurf des kommerziellen Plans für den Kurs und das Mentoring. Nur auf Spanisch. |
| `../html/de/` | Die HTML-Fassungen zum bequemen Lesen, mit dem Knopf, der jeden Prompt übersetzt. Werden nicht von Hand bearbeitet. |
| `../../build/` | Der Konverter von Markdown nach HTML, der Extraktor und Prüfer der Prompts, und das Skript, das alles baut. |
| `../../prompts/` | Die aus den Verträgen extrahierten englischen Prompts, generiert; werden nicht von Hand bearbeitet. |

## Wie man es liest

Beginne mit `ESCALERA_METODOLOGICA.md`, oder mit seinem HTML in `../html/de/`. Wenn dir ein
seltsames Wort begegnet, steht das Glossar am Ende. Danach der Vertrag des Schritts, der dich
interessiert, und das Kurshandbuch, wenn du sie anwenden willst. Wenn das, was du hast, kein
leerer Ordner ist, sondern ein System, das schon läuft und korrigiert oder vergrößert werden muss,
ist der Weg `EVOLUTIVO_CORRECTIVO.md` und Teil 2 des Handbuchs.

## Wie die HTML neu erzeugt werden

```
node build/build.mjs
```

Prüft, dass die englischen Prompts in den acht Fassungen identisch sind (die der Verträge und die
des evolutiv-korrektiven Weges), und erzeugt für jede Sprache `ESCALERA_METODOLOGICA.html`,
`REFERENCIAS.html`, `EVOLUTIVO_CORRECTIVO.html`, `MANUAL_CURSO.html`,
`MANUAL_CURSO_EVOLUTIVO.html` und `CONTRATOS_DE_PELDANO.html` (das Spanische in `docs/html/`, die
anderen in `docs/html/<Sprache>/`).

## Sprachen

Spanisch ist die Quelle der Wahrheit. Die Dokumentation existiert in den acht Sprachen von NAC3:
Spanisch (`docs/`), Englisch (`docs/en/`), Portugiesisch (`docs/pt/`), Französisch (`docs/fr/`),
Deutsch (`docs/de/`), Italienisch (`docs/it/`), Japanisch (`docs/ja/`) und Chinesisch
(`docs/zh/`). Jeder Ordner hat sein README, das Hauptdokument, die Referenzen, die sechzehn
Verträge, den evolutiv-korrektiven Weg und die zwei Teile des Kurshandbuchs. Die Prompts für das
Modell sind ein einziges Stück auf Englisch, identisch in allen Fassungen, mit ihrer Übersetzung
in die Sprache des Dokuments daneben;
`node build/prompts.mjs --check` schlägt fehl, wenn eine Übersetzung sie verändert hat. Der Name
wird nicht übersetzt; der Untertitel schon: *the evidence method*, *o método da evidência*, *la
méthode de la preuve*, *die Nachweis-Methode*, *il metodo del riscontro*, 裏付けの方法, 验证方法.

Die Entscheidungen (`docs/DECISIONES.md`) und der Kursplan bleiben nur auf Spanisch, weil sie
wörtliche Aussagen zitieren.

## Lizenz und Mitwirken

Die Methode wird unter **Creative Commons Namensnennung – Weitergabe unter gleichen Bedingungen
4.0** (`LICENSE`) veröffentlicht: man darf sie nutzen, übersetzen und anpassen, mit Namensnennung
und unter derselben Lizenz. Verbesserungen an **diesem** Repository kommen per Pull Request aus
einem Fork, mit ihrem Beleg, und werden von einem Maintainer nach Prüfung gemergt; niemand sonst
schreibt auf `main`. Der Prozess steht in `CONTRIBUTING.md`. Schritt 15 der Methode verlangt, dass
jede Retrospektive in einem konkreten Änderungsvorschlag für die Leiter endet; das ist die
erwartete Form, beizutragen.

Die Kunden der Ursprungssysteme sind anonymisiert („die Krankenkasse“, „der Verein“); die Zahlen,
die Daten und die Commits sind echt.

## Stil dieses Projekts

Anders als der Rest meiner Repositories, und mit Absicht: erste Person, erklärte Prosa, Sprache
des Alltags, lateinische Zeichen mit Akzenten und Umlauten, und ein Glossar für jede Abkürzung und
jeden umgangssprachlichen Ausdruck. Es ist für Menschen geschrieben, die die Projekte nicht erlebt
haben. Siehe `CLAUDE.md`.

Das öffentliche Repository der Methode ist
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).
