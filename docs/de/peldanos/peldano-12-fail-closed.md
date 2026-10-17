# Schritt 12 — Fail-closed, Sperren und null stiller Schaden (Sprossenvertrag)

**Phase:** Betrieb (wird entworfen, bevor das System auf die Welt wirkt; wird bei jeder neuen
folgenreichen Aktion überarbeitet).
**Form:** Gespräch: der Agent listet die folgenreichen Aktionen, der Eigentümer bestätigt, welche
eine Sperre bekommen und welcher Art.
**Größe:** verpflichtend, sobald das System etwas Unumkehrbares tut (abbuchen, senden, löschen,
genehmigen). Ein reines Lesesystem kann sie überspringen; in dem Moment, in dem es seinen ersten
Knopf bekommt, der auf die Welt wirkt, wird diese Sprosse zur wichtigsten.

## Wozu sie dient

Damit das System bei Zweifel oder Ausfall NICHT handelt, und es sagt. Das klingt selbstverständlich
und ist das Gegenteil dessen, was Software standardmäßig tut, nämlich bei Zweifel weiterzumachen.
Sie verhindert die doppelte Abbuchung, die automatische Genehmigung ohne Mensch im Kreislauf, das
`git add -A`, das ein Zugangsgeheimnis hochlädt, und das Löschen von Kundendaten.

Das Prinzip hat einen Namen, „fail-closed“, und kommt aus der physischen Sicherheit: eine
Sicherheitstür, die geschlossen bleibt, wenn der Strom ausfällt. Das Gegenteil, „fail-open“, ist
die Tür, die aufgeht. In Software sind die meisten Dinge standardmäßig fail-open: wenn die
Validierung fehlschlägt, läuft der Code weiter; wenn der Dienst nicht antwortet, wird angenommen,
dass alles in Ordnung ist. Die Methode kehrt den Standard um: **im Zweifel nein**. Und das gilt
sowohl für das System als auch für den Agenten, der es betreibt.

## 1. Benötigter Kontext

- **Erhebung der folgenreichen Aktionen**, generisch so benannt: was das System tut, das abbucht,
  sendet, genehmigt, löscht oder jemanden außerhalb benachrichtigt; was passiert, wenn es zweimal
  getan wird; was passiert, wenn es falsch getan wird; wie es rückgängig gemacht wird. Das Geschäft
  weiß es; der Agent bewertet, ob die Liste vollständig ist, und fragt.
- Welche Aktionen der Agent selbst am System vornehmen darf (wenn er eingebettet ist).

## 2. Prompts

**Eröffnung:**

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock. Reply in my language.

Was wir verlangen: den Vergleich zwischen dem, was das Geschäft gesagt hat, und dem, was der Code
tut (dort tauchen die Aktionen auf, an die sich niemand erinnerte); die Vollständigkeitsklausel in
ihrer Form für diese Sprosse: Unterschiede zwischen den beiden Listen werden erfragt, nicht
aufgelöst; für jede Aktion Umkehrbarkeit, Sperre und Rückweg; und die allgemeine Fail-closed-Regel
im Prompt, damit sie in der Tabelle und im Code bleibt.

**Abschluss:**

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.

Was wir verlangen: den Test pro Sperre, **rot bewiesen** (ohne die Sperre geschah die Aktion; mit
der Sperre nicht), was Sprosse 7, auf Sicherheit angewandt, ist; die endgültige Tabelle; und die
Trockenlauf-Regel für jede neue Automatisierung, die es erlaubt zu sehen, was sie getan hätte,
bevor man sie machen lässt.

## 3. Erwartetes Ergebnis

- `docs/LOCKS.md`: eine Zeile pro folgenreicher Aktion: was sie tut, ob sie umkehrbar ist, die
  Sperre, der Rückweg, wer sie wann genehmigt hat.
- Ein Test pro Sperre, rot bewiesen, der prüft, dass im Zweifel die Aktion nicht geschieht.
- Neue Automatisierungen, die im Trockenlauf starten, mit dem Protokoll „hätte getan“.
- Wenn der Agent eingebettet ist: seine Berechtigungen schriftlich (was er lesen darf, was er
  ändern darf, was Genehmigung braucht).

## 4. Vollständigkeitsprüfung

- Steht jede Aktion, die abbucht, sendet, genehmigt oder löscht, in der Tabelle? Denk an eine,
  die nicht drinsteht, und frag.
- Hat jede Sperre ihren roten Test? („Ohne die Sperre geschah die Aktion; mit der Sperre nicht.“)
- Hat jede unumkehrbare Aktion einen schriftlichen Rückweg? Wenn nicht, braucht sie doppelte
  Sicherung.
- Sind die neuen Automatisierungen im Trockenlauf gestartet? Hast du das Protokoll „hätte getan“
  gesehen, bevor du sie freigeschaltet hast?
- Was passiert, wenn der eingebettete Agent etwas außerhalb seiner Berechtigungen versucht? Bitte
  ihn, es zu versuchen und dir die Ablehnung im Log zu zeigen.

## 5. Warnsignale

- Eine Automatisierung ging von „existiert nicht“ zu „läuft allein“ ohne Trockenlaufphase.
- Das Log hat keinen einzigen Eintrag „Aktion wegen Zweifel nicht ausgeführt“. Entweder zweifelt
  das System nie (unmöglich) oder es macht bei Zweifel weiter.
- Eine Sperre lässt sich mit einem Parameter „für Tests“ umgehen. Dieser Parameter wird in der
  Produktion gesetzt bleiben.
