# Schritt 15 — Der Agent im System, und die Retrospektive mit Zahlen (Sprossenvertrag)

**Phase:** Betrieb (wenn das System schon in Produktion ist) und Abschluss (kehrt zu Sprosse 0 für
das nächste Projekt zurück).
**Form:** zwei Teile: ein Gespräch zur Festlegung des Umfangs des residenten Agenten, und ein langer
Durchgang für die Retrospektive.
**Größe:** der residente Agent ist optional (viele Systeme brauchen keinen; die, deren Nutzer
Support verlangen, schon). Die Retrospektive ist in jedem Projekt verpflichtend, auch wenn sie eine
Seite lang ist: ohne sie lernt die Methode nicht.

## Wozu sie dient

Zwei Dinge, die denselben Kreislauf schließen. Erstens: der Agent bleibt resident in der
Produktion, mit begrenztem Umfang, um zu diagnostizieren, zu betreiben und Support zu leisten, ohne
dass der Erbauer da sein muss. Zweitens: die Methode selbst wird mit Zahlen überprüft, und das
Gelernte ändert die Leiter. Sie verhindert den Agenten, der ohne Karte des Systems betreibt, und
die Methode, die sich Projekt für Projekt unverändert wiederholt, ohne zu lernen (die
Multi-Agenten-Crew wurde durch eine Retrospektive beendet: 60 Dollar und 73 Minuten gegen
90 Minuten).

Zum residenten Agenten die Regel, die alles ordnet: **er handelt im Namen von jemandem**. Sein
Zugangsgeheimnis ist einer verantwortlichen Person zugeordnet, und alles, was er tut, wird unter dem
Namen dieser Person protokolliert. Er ist kein anonymes Systemkonto: er ist ein Angestellter mit
Chef. Das bestimmt seinen Umfang (was diese Person ihm erlaubt hat) und seine Nachvollziehbarkeit
(wer für das einsteht, was er getan hat).

## 1. Benötigter Kontext

Für den residenten Agenten:
- Was der Agent in der Produktion tun darf und was nicht: lesen, diagnostizieren, Konfiguration
  ändern, Aktionen ausführen. Der Eigentümer entscheidet.
- Wie der Agent sich gegenüber dem System ausweist (ein eigenes Zugangsgeheimnis, einer
  verantwortlichen Person zugeordnet).
- Wen er benachrichtigt, wenn er etwas findet, das er nicht lösen kann (Tickets, E-Mail).

Für die Retrospektive:
- Die Vorfälle des Projekts, die Kosten (Tokens, Kontingent, Zeit des Eigentümers), die offenen
  Posten, die die meisten Runden brauchten, und die Daten.

## 2. Prompts

**Für den residenten Agenten (Eröffnung):**

> We are going to leave you resident in production. First, build the map of the system you will
> need in order to operate it: modules, environments, where each configuration lives, which
> actions are consequential (read `docs/LOCKS.md`), whom to notify. If there are parts of the
> system you cannot see from where you are, tell me; the map must not have hidden gaps. Then
> propose your scope in three levels: read-only and diagnosis; configuration changes with my
> approval; consequential actions behind locks. I choose the level. Your credential acts as the
> person who created it: everything you do is logged under that person's name. Reply in my
> language.

Was wir verlangen: die Karte des Systems vor dem Betreiben (ohne Karte zu betreiben ist der
Fehlschlag, den diese Sprosse verhindert); die Vollständigkeitsklausel in ihrer Form: **Lücken der
Karte werden erklärt, nicht verdeckt**; die drei Umfangsstufen, damit der Eigentümer eine wählt und
nicht „kommt darauf an“; und die Regel des Zugangsgeheimnisses im Namen einer Person.

**Für den residenten Agenten (Abschluss):**

> Level [X]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the credential (never its
> value), and the procedure to request my approval. Then prove, with a real attempt recorded in
> the log, that something outside your scope is rejected.

Was wir verlangen: das Dokument des residenten Agenten (ohne den Wert des Zugangsgeheimnisses,
niemals) und den roten Beweis des Umfangs: ein echter, protokollierter Versuch, etwas außerhalb der
Stufe zu tun, abgelehnt. Das ist Sprosse 7, auf Berechtigungen angewandt.

**Für die Retrospektive:**

> [The stage / the project] is over. Do the retrospective with numbers, not impressions: what it
> cost (tokens, quota, my time), how many pending items, which ones took the most rounds and why,
> which incidents happened and which step of the ladder each falls into, and which step failed
> or was missing. If you lack the data for any figure (my time, for instance), ask me for it or
> mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder:
> which step is modified, how, and which incident justifies it. Write it to
> `docs/RETROSPECTIVE_[date].md`. Reply in my language.

Was wir verlangen: Zahlen mit Quelle (Kosten, Posten, Runden, Vorfälle); jeden Vorfall einer
Sprosse zugeordnet, denn ein Vorfall, der in keine fällt, ist eine fehlende Sprosse; die
Vollständigkeitsklausel für die Zahlen, die er nicht hat (fragen oder als Schätzung markieren); und
**mindestens einen konkreten Änderungsvorschlag für die Leiter**, denn eine Retrospektive, die
nichts ändert, war keine Retrospektive.

## 3. Erwartetes Ergebnis

- `docs/RESIDENT_AGENT.md`: Karte des Systems, gewählter Umfang, einer Person zugeordnetes
  Zugangsgeheimnis, Genehmigungsverfahren und der im Log protokollierte Ablehnungsbeweis.
- `docs/RETROSPECTIVE_[date].md`: die Zahlen mit ihrer Quelle, die Vorfälle den Sprossen
  zugeordnet, und mindestens ein Änderungsvorschlag für die Leiter mit seiner Begründung.

## 4. Vollständigkeitsprüfung

- Sagt die Karte des Systems, was der Agent NICHT sehen kann? Wenn nicht, hat sie verdeckte
  Lücken.
- Hast du getestet (oder im Log gesehen), dass eine Aktion außerhalb des Umfangs abgelehnt wird?
- Handelt das Zugangsgeheimnis des Agenten im Namen einer identifizierbaren Person?
- Hat die Retrospektive Zahlen mit Quelle oder Adjektive? („Es hat viel gekostet“ ist keine Zahl.)
- Fällt jeder Vorfall in eine Sprosse? Wenn einer in keine fällt, fehlt eine Sprosse: das ist der
  Änderungsvorschlag.
- Gibt es mindestens einen konkreten Änderungsvorschlag für die Leiter? Wenn die Retrospektive
  nichts ändert, war sie keine Retrospektive.

## 5. Warnsignale

- Der residente Agent „braucht“ jede Woche eine höhere Berechtigungsstufe. Prüfe, ob das, was er
  verlangt, dazu dient, Probleme des Systems zu lösen oder seine eigenen Grenzen.
- Die Retrospektive sagt, alles sei gut gelaufen. Es läuft nie alles gut; sie ist für den
  Eigentümer geschrieben, nicht für die Methode.
- Zwei aufeinanderfolgende Projekte hatten denselben Vorfall und die Leiter hat sich dazwischen
  nicht geändert. Sprosse 15 wird nicht geschlossen: die Retrospektive wird geschrieben und nicht
  angewendet.
