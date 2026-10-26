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

## Drei verschiedene Dinge: eine Methode, ein Protokoll, ein Werkzeug

Ich stelle das nach vorne, weil es das teuerste Missverständnis dieses Projekts ist, und ich habe
es gemessen: Ich habe die veröffentlichte Website einem fremden Assistenten gegeben, und er hat
die drei Dinge in einen Sack geworfen, geschlossen, dass das Ganze die Erzählung eines Produkts
sei, und mir angeboten, meinen Code zu analysieren. Er hat eine Methode nach Code gefragt. Es sind
drei verschiedene Naturen, und es lohnt sich, sie von Anfang an zu trennen.

**Die Methode ist Urazuke, und sie ist das, was Sie hier lesen.** Sie sagt, was zu tun ist und in
welcher Reihenfolge, was von demjenigen zu fordern ist, der baut (ein Mensch oder ein Modell), und
wie man ohne eine einzige Zeile Code zu lesen erkennt, dass vollständig und nicht halb geliefert
wurde. Sie ist Verfahren und Kriterium, nichts weiter. Sie wird mit dem Assistenten angewandt, den
man zur Hand hat, mit dem, der nächstes Jahr erscheint, oder mit Bleistift, Papier und einem Team
aus Menschen. Sie liegt hier vollständig und unter freier Lizenz: die vierundzwanzig Schritte, ihre
Verträge und ihre Prompts.

**Das Protokoll ist NAC3, und es ist etwas anderes.** Es ist ein Vertrag, damit die Bildschirme
einer Anwendung von einem Programm gesteuert werden können (jedes Element der Oberfläche mit seiner
Kennung und seinen Methoden) und, zum gleichen Preis, von einem Menschen gesteuert werden können,
der einen Screenreader oder die Stimme benutzt: ein Agent und ein Mensch, die dieselbe Oberfläche
mit derselben Würde bedienen. Die Methode benutzt es als **Mittel** für eine konkrete Sache: damit
die Ende-zu-Ende-Tests den Bildschirm allein durchlaufen. Es ist keine Bedingung der Methode. Das
Kriterium der Methode ist neutral und steht in Schritt 0 so geschrieben: dass die Oberfläche von
einem Programm ausgeführt werden kann, mit jeder Technologie, die das erlaubt.

**Das Werkzeug ist Yujin-Forge, und es ist eine Implementierung.** Es automatisiert die Methode
(die Gates, das Einspielen der Prompts) und es spricht das Protokoll. Es ist *ein* Weg, Urazuke
anzuwenden, nicht *der* Weg. Wenn es Ihnen nicht passt oder Sie es nicht wollen, bleibt die Methode
genauso vollständig.

Und das ist keine Absichtserklärung: **es steht im Datum und es ist messbar.** Die mechanische
Definition der Gates, die die Methode für jeden Konsumenten veröffentlicht, nennt kein Werkzeug und
kein Protokoll, auch nicht meine eigenen. Es gibt einen automatischen Test, der das auf jeder
Fläche fordert, auf der sich ein Name einschleichen könnte (die Quellen, die zwei veröffentlichten
Dateien, ihr Index und das erzeugte Dokument), und jeder kann es heute in einer Sekunde an der
ausgelieferten Datei prüfen:

```
curl -s https://yujin.app/urazuke/api/gates.json | grep -o -i -E "forge|nac-?3|yujin" | wc -l
```

Es liefert **0** (gemessen am 2026-10-26). Irgendein Werkzeug kann die Gates der Methode
implementieren, ohne irgendein Protokoll und ohne irgendein anderes Werkzeug zu übernehmen.

## Die These in einem Satz

Die KI unterbricht die Methode nicht: sie setzt sie fort. Die Branche hat vor zwanzig Jahren
aufgehört, dem Autor des Codes zu vertrauen, und gelernt, Belege zu verlangen, statt ihn zu lesen;
das Modell ist der nächste Autor, nicht der erste unzuverlässige. Das einzig Neue ist, dass dieser
Autor auch die Belege herstellt, und deshalb muss der Beleg sich selbst beweisen.

## Was hier liegt

| Datei | Was es ist |
|---|---|
| `ESCALERA_METODOLOGICA.md` | Das Hauptdokument: die These, woher die Methode kommt, die Zeitlinie (wann jeder Schritt erklommen wird und was dazwischen passiert: Infrastruktur, CI/CD, Anforderungsaufnahme, Entwicklung, Ende-zu-Ende-Tests, menschlicher Blick, menschliche Tests), die vierundzwanzig Schritte mit ihrer Karte (die sechs der Betriebsqualität: Beobachtbarkeit, Persistenz, Schwachstellen, Leistung und die zwei Monitorings), was noch fehlt, die verwandten Arbeiten (was es Ähnliches auf der Welt gibt und worin sich diese Methode unterscheidet), und das Glossar. |
| `EVOLUTIVO_CORRECTIVO.md` | Der Weg für ein System, das schon existiert und nicht mit der Methode geboren wurde: die drei Anwendungsfälle der Methode, das Prinzip des Normalisierens ohne Neuschreiben, die acht Normalisierungsstationen (N0 bis N7) mit ihren Verträgen und Prompts, die Schleife im korrektiven und im evolutiven Modus, und die Ausgangsliste des Abschnitts. |
| `REFERENCIAS.md` | Die realen Fälle hinter der Methode, nummeriert („Ref. N“), mit Datum und Beleg, damit die Verfahren sauber bleiben und das Detail einen Klick entfernt ist. Enthält die Chronologien der drei Systeme und die Tabelle der Fehlschläge pro Schritt. |
| `peldanos/peldano-NN-*.md` | Der Vertrag jedes Schritts: wann, benötigter Kontext, Prompts auf Englisch mit ihrer Übersetzung und, vor jedem einzelnen, der Block „Bevor du den Prompt schickst“ mit den Dateien, die du selbst bauen musst, und ihrem Inhalt; erwartetes Ergebnis, Vollständigkeitsprüfung ohne Code zu lesen, Warnsignale. |
| `peldanos/README.md` | Der Index der Verträge. |
| `PREGUNTAS_AL_PROVEEDOR.md` | Die fünfundzwanzig Fragen an den Anbieter: die Vollständigkeitsprüfung der Verträge, zusammengefasst in einem Blatt, das ein Eigentümer, der noch nie Software beauftragt hat, zu einem Treffen mitnimmt. Gruppiert nach dem, was ihm versprochen wird, jede mit der Antwort, die man **sehen** kann, und dem Schritt, aus dem sie kommt. |
| `MANUAL_CURSO.md` | Der Kurs: die Reihenfolge, vierundzwanzig Lektionen mit praktischen Aufgaben und Prompts, Leitprojekt („Turnera“), Produktionsreife-Liste. |
| `MANUAL_CURSO_EVOLUTIVO.md` | Teil 2 des Kurses: das geerbte Leitprojekt („Geerbte Turnera“), zehn Lektionen (N0 bis N7, R1 und R2), um ein Altsystem zu normalisieren und es danach zu korrigieren und weiterzuentwickeln. |
| `../DECISIONES.md` | Die Entscheidungen des Projekts, mit Datum und wörtlichen Worten. Die Methode wird auf sich selbst angewendet. Nur auf Spanisch. |
| `TRABAJO_COLABORATIVO.md` | Wie die Methode angewendet wird, wenn mehrere Entwickler, jeder mit seinem Agenten, auf demselben Branch arbeiten: die sieben Regeln des geteilten Branches, wie die Schritte verteilt werden, und die Prompts. |
| `CAPACITACION_JUNIOR.md` | Die Auswirkung der Methode auf die Ausbildung der Junior-Entwickler: welche Schwerpunkte an Gewicht verlieren, welche gewinnen, mit welchem Ziel und wie man einen Junior in der Ära nach dem Programmieren von Hand ausbildet. |
| `ANEXO_HEURISTICAS.md` | Anhang H, querliegend zum Konstruktionszyklus: achtzehn Regeln zur Codequalität und siebenundzwanzig zur Benutzbarkeit, jede mit stabiler Kennung, Schweregrad, benanntem Prüfer und vom Eigentümer erklärten Schwellenwerten; Gruppierung nach funktionaler Konvergenz, Profile und die Matrix, aus der Menü, Routing und Berechtigungen abgeleitet werden; zwei Schalter und die Abnahmeprüfungen, die beweisen, dass das Gate wirklich wacht. |
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
(`docs/zh/`). Jeder Ordner hat sein README, das Hauptdokument, die Referenzen, die vierundzwanzig
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
schreibt auf `main`. Der Prozess steht in `CONTRIBUTING.md`. Schritt 23 der Methode verlangt, dass
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
