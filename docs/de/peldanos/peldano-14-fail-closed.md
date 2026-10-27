# Schritt 14 — Fail-closed, Sperren und null stiller Schaden (Schrittvertrag)

**Abschnitt:** Produktionsfreigabe.
**Wann:** im Abschnitt der Produktionsfreigabe, BEVOR irgendeine Funktionalität gebaut wird, die
abbucht, sendet, genehmigt oder löscht; wird mit jeder neuen Aktion mit Konsequenzen überprüft.
Neue Automatisierungen starten im Trockenlauf und werden freigeschaltet, nachdem man ihr Protokoll
ein paar Tage angesehen hat.
**Form:** Gespräch: der Agent listet die Aktionen mit Konsequenz auf, du bestätigst, welche eine
Sperre bekommen und welcher Art.
**Größe:** verpflichtend, sobald das System etwas Unumkehrbares tut (abbuchen, senden, löschen,
genehmigen). Ein reines Lesesystem kann ihn überspringen; in dem Moment, in dem es seinen ersten
Knopf bekommt, der auf die Welt wirkt, wird dieser Schritt zum wichtigsten.

## Wozu er dient

Sorg dafür, dass das System bei Zweifel oder Fehler NICHT handelt, und dass es das sagt. Das
klingt offensichtlich und ist das Gegenteil von dem, was Software standardmäßig tut, nämlich im
Zweifel weiterzumachen. Es verhindert die doppelte Abbuchung, die automatische Genehmigung ohne
einen Menschen, das `git add -A`, das ein Zugangsgeheimnis hochlädt, und das Löschen von
Kundendaten. Die Sperren, die ich bei der Krankenkasse eingebaut habe, sind das Vorbild: der
Panikknopf mit doppelter Sicherung, der automatische Genehmiger im Trockenlauf, der Wächter mit
Schutzvorrichtungen [Ref. 28](../REFERENCIAS.md#ref-28); und der Reflex, dass ein Fehler eine Zeile
ohne ihren Knopf lässt, statt die ganze Liste zu brechen [Ref. 25](../REFERENCIAS.md#ref-25).

Das Prinzip hat einen Namen, „fail-closed“, und stammt aus der physischen Sicherheit: eine
Sicherheitstür, die geschlossen bleibt, wenn der Strom ausfällt. Das Gegenteil, „fail-open“, ist
die Tür, die aufgeht. In Software sind die meisten Dinge standardmäßig fail-open: wenn die
Validierung fehlschlägt, läuft der Code weiter; wenn der Dienst nicht antwortet, wird angenommen,
alles sei in Ordnung. Die Methode kehrt den Standard um: **im Zweifel nein**. Und das gilt sowohl
für das System als auch für den Agenten, der es betreibt.

## 1. Benötigter Kontext

Was folgt, ist die generische Liste. Die konkreten Dateien, die du vor jedem Prompt fertig haben
musst, mit ihrem Inhalt und ihrem Mindestzustand, stehen in Abschnitt 2, in dem Block „Bevor du
den Prompt schickst“, der jedem einzelnen vorangeht.

- **Erhebung der Aktionen mit Konsequenz**, so generisch benannt: was das System tut, das
  abbucht, sendet, genehmigt, löscht oder jemanden außerhalb benachrichtigt; was passiert, wenn
  es zweimal getan wird; was passiert, wenn es falsch getan wird; wie es rückgängig gemacht wird.
  Das weiß das Geschäft; der Agent bewertet, ob die Liste vollständig ist, und fragt. Der
  semantische Baum hilft: jeder Prozess mit Konsequenz steht dort.
- Welche Aktionen der Agent selbst am System ausführen kann (wenn er eingebettet ist).

## 2. Prompts

**Zu Beginn:**

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`: die Erhebung der Aktionen mit Konsequenz, geschrieben
  mit dem Eigentümer der Domäne. Was das System tut oder tun wird, das kassiert, verschickt,
  genehmigt, löscht oder jemandem draußen Bescheid gibt; und für jede Aktion: was passiert, wenn
  sie zweimal gemacht wird, was passiert, wenn sie falsch gemacht wird, wie man sie rückgängig
  macht, und wer sie machen können sollte. Die Prozesse des semantischen Baums geben dir die
  Ausgangsliste: geh sie einen nach dem anderen durch. Der Prompt nennt sie „the survey of
  consequential actions“, ohne Pfad: speichere sie unter diesem Namen oder sag ihm im Chat, wo sie
  liegt.
- Wenn der Agent eingebettet oder resident sein wird: welche Aktionen er selbst am System
  ausführen darf, in einem eigenen Abschnitt derselben Erhebung.
- `docs/SEMANTIC_TREE.md`, aktuell.
- Akzeptabler Mindestzustand: jeder Prozess des Baums, der auf die Welt wirkt, steht auf der Liste
  mit seinem „was passiert, wenn er zweimal gemacht wird“.

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [de]
> Wir werden entscheiden, welche Aktionen des Systems eine Sperre brauchen. Lies die Erhebung
> der Aktionen mit Konsequenz und geh den Code durch auf der Suche nach allem, was abbucht,
> sendet, genehmigt, löscht oder nach außen benachrichtigt. Vergleiche die beiden Listen: wenn
> der Code Aktionen hat, die die Erhebung nicht erwähnt, oder umgekehrt, frag mich, bevor du
> weitermachst. Schlag für jede Aktion vor: ob sie umkehrbar ist, welche Sperre sie bekommt
> (explizite Bestätigung, doppelte Sicherung, Trockenlauf, Tageslimit, ein Mensch im Kreislauf),
> und was der Rückweg ist, wenn es schiefgeht. Allgemeine Regel: bei jedem Zweifel oder Fehler
> auf dem Weg wird die Aktion NICHT ausgeführt und der Grund wird protokolliert. Lege mir die
> Tabelle vor; ich bestätige Sperre für Sperre.
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

Was ich hier verlange: den Abgleich zwischen dem, was das Geschäft gesagt hat, und dem, was der
Code tut (dort tauchen die Aktionen auf, an die sich niemand erinnerte); die Vollständigkeitsklausel
in ihrer Form für diesen Schritt: die Unterschiede zwischen den beiden Listen werden erfragt, nicht
aufgelöst; für jede Aktion Umkehrbarkeit, Sperre und Rückweg; und die allgemeine Regel des
Fail-closed im Prompt ausgeschrieben, damit sie in der Tabelle und im Code bleibt.

**Zum Abschluss:**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- Die Tabelle, die der Agent vorgelegt hat, Sperre für Sperre mit dem Eigentümer gelesen; für jede
  Zeile deine Bestätigung oder deine Änderung, geschrieben für die Lücken [list], [X] und [Y] des
  Prompts.
- Akzeptabler Mindestzustand: es gibt keine Zeile ohne Urteil. Eine nicht bestätigte Sperre ist
  eine Sperre, die nicht umgesetzt wird.

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [de]
> Ich bestätige die Sperren [Liste]; ändere [X] in [Y]. Setze sie um, mit einem Test pro Sperre,
> der beweist, dass unter der Zweifelsbedingung die Aktion NICHT stattfindet (rot bewiesen gegen
> die Version ohne die Sperre). Halte die endgültige Tabelle in `docs/LOCKS.md` fest. Und für jede
> neue Automatisierung: erst Trockenlauf, mit Protokoll dessen, was sie getan hätte, bis ich sie
> freischalte.
>
> Wenn du eine Entscheidung von mir brauchst, stelle die Frage mit den vier Teilen von UX-28
> (`docs/ANEXO_HEURISTICAS.md`) und in dieser Reihenfolge: die Daten, die die Frage nötig machen,
> aufgelistet; ein Absatz von höchstens fünf Zeilen, der sie verbindet und die Frage sichtbar
> macht; die Frage selbst mit ihren möglichen Antworten durchnummeriert; und deine Empfehlung.
> Sage es in der technischen Tiefe, die das Projekt in `communication_depth` erklärt hat
> —`beginner`, `decision_maker` oder `technical`—; hat das Projekt keine erklärt, nimm
> `decision_maker`.

Was ich hier verlange: den Test pro Sperre, **rot bewiesen** (ohne die Sperre fand die Aktion
statt; mit der Sperre nicht), was Schritt 8 angewandt auf die Sicherheit ist; die endgültige
Tabelle; und die Regel des Trockenlaufs für jede neue Automatisierung, die es erlaubt zu sehen,
was sie getan hätte, bevor man sie handeln lässt.

## 3. Erwartetes Ergebnis

- `docs/LOCKS.md`: eine Zeile pro Aktion mit Konsequenz: was sie tut, ob sie umkehrbar ist, die
  Sperre, der Rückweg, wer sie freigegeben hat und wann.
- Ein Test pro Sperre, rot bewiesen, der prüft, dass die Aktion im Zweifel nicht stattfindet.
- Die neuen Automatisierungen, die im Trockenlauf starten, mit dem Protokoll „hätte getan“.
- Wenn der Agent eingebettet ist: seine Berechtigungen schriftlich (was er lesen darf, was er
  ändern darf, was eine Freigabe erfordert).

## 4. Vollständigkeitsprüfung

- Steht jede Aktion, die abbucht, sendet, genehmigt oder löscht, in der Tabelle? Denk dir eine
  aus, die nicht drin ist, und frag.
- Hat jede Sperre ihren roten Test? („Ohne die Sperre fand die Aktion statt; mit der Sperre
  nicht.“)
- Hat jede unumkehrbare Aktion einen aufgeschriebenen Rückweg? Wenn nicht, braucht sie eine
  doppelte Sicherung.
- Sind die neuen Automatisierungen im Trockenlauf gestartet? Hast du das Protokoll „hätte getan“
  gesehen, bevor du sie freigeschaltet hast?
- Was passiert, wenn der eingebettete Agent etwas außerhalb seiner Berechtigungen versucht? Bitte
  ihn, es zu versuchen und dir die Ablehnung im Log zu zeigen.

## 5. Warnsignale

- Eine Automatisierung ist von „existiert nicht“ zu „läuft allein“ übergegangen, ohne eine
  Trockenlaufphase.
- Das Log hat keinen einzigen Eintrag „Aktion wegen Zweifel nicht ausgeführt“. Entweder zweifelt
  das System nie (unmöglich) oder es macht im Zweifel weiter.
- Eine Sperre lässt sich mit einem Parameter „für Tests“ umgehen. Dieser Parameter wird in der
  Produktion gesetzt bleiben.
