# Schritt 7 — Messen vor dem Bauen, mit einem Instrument, das ebenfalls geprüft wird (Schrittvertrag)

**Abschnitt:** Schleife.
**Wann:** jedes Mal, wenn ein offener Posten von einer Zahl oder einer Ursachenhypothese abhängt,
BEVOR gebaut wird. Im Start ist die Dimensionierung der erste Fall. In einem kleinen Projekt heißt
„messen“: mit einem Befehl zählen und die Zahl mit dem Datum notieren.
**Form:** ein einziger Durchgang pro Messung; manchmal ein Gespräch, wenn die Hypothese deine ist.
**Größe:** proportional. Die Ratsche und das Abfragebudget sind für Systeme mit Volumen. Was sich
mit der Größe nicht ändert: keine Zahl, die etwas entscheidet, stammt aus einem Eindruck.

## Wozu er dient

Sorg dafür, dass jede Zahl, die eine Entscheidung speist, aus einem Programm mit Test stammt und
nicht aus einer Textsuche, einem Eindruck oder einem „ich glaube, es sind so an die hundert“. Und
sorg dafür, dass das Instrument selbst auditiert wird, denn Messgeräte lügen: eines von meinen sah
84 Aufrufe nicht, mit dem Zähler auf null, und ein anderes sagte 27, wo es 44 waren
[Ref. 35](../REFERENCIAS.md#ref-35), [Ref. 36](../REFERENCIAS.md#ref-36). Die fünf Regeln, die ich
danach geschrieben habe, sind: Messgerät mit Schutz; wenn das Instrument nicht existiert, wird es
gebaut; es wird in zwei Richtungen auditiert; das Näherungsweise wird markiert; und wer ausführt,
verifiziert die Zahlen dessen, der geplant hat.

Dieser Schritt ist der, den ich am spätesten formalisiert habe, und aus einem Grund, der es wert
ist, erzählt zu werden: ich ging davon aus, dass ein Modell etwas so Grundlegendes der Ingenieurs-
kunst wie „miss, bevor du anfasst“ von allein anwenden würde. Tut es nicht. Das Modell ist sehr gut
darin, Behauptungen mit Zahl zu produzieren („es gibt etwa 120 Schleifen dieser Art“), und diese
Behauptungen klingen exakt gleich, wenn sie gemessen sind und wenn sie geschätzt sind. Du hast
keine Möglichkeit, sie am Tonfall zu unterscheiden. Die einzige Art ist, das Instrument zu
verlangen: „womit hast du das gemessen? zeig mir den Befehl“. Wenn es keinen Befehl gibt, ist es
ein Eindruck, so viele Nachkommastellen er auch hat. Die Regeln habe ich in der Sitzung
durchgesetzt, indem ich den Agenten korrigierte, bevor sie Doktrin wurden
[Ref. 45](../REFERENCIAS.md#ref-45).

## 1. Benötigter Kontext

Was folgt, ist die generische Liste. Die konkreten Dateien, die du vor jedem Prompt fertig haben
musst, mit ihrem Inhalt und ihrem Mindestzustand, stehen in Abschnitt 2, in dem Block „Bevor du
den Prompt schickst“, der jedem einzelnen vorangeht.

- Die Hypothese, deine oder die des Agenten: „ich glaube, das Problem ist X“, „es müssten so an
  die hundert sein“.
- Zugang zu dem, was gemessen werden soll: der Code, die Datenbank nur lesend, das Log.
- Die Messgeräte, die es im Repository schon gibt, falls vorhanden.

## 2. Prompts

**Zu Beginn:**

**Bevor du den Prompt schickst**, muss das hier existieren, und du (oder das Geschäft mit dir)
machst es, nicht der Agent:

- Die Hypothese, in einem Satz geschrieben, deine eigene oder vom Agenten übernommen: „ich glaube,
  die Tagesagenda macht eine Datenbankabfrage pro angezeigtem Termin“, „das müssten so hundert
  Schleifen sein“. Sie kommt in die Lücke [X] des Prompts, und die zu messende Größe in die andere
  Lücke.
- Zugang zu dem, was gemessen wird: der Code (den hat er schon); die Datenbank nur lesend, wenn
  die Messung über echte Daten geht, mit der Verbindungszeichenfolge außerhalb des Repositorys und
  dem Namen der Variablen im Chat gesagt; das Log, mit seinem Pfad.
- Die Messgeräte, die es im Repository schon gibt, falls es welche gibt, benannt, damit der Agent
  sie wiederverwendet, statt ein weiteres zu bauen.
- Ein bekannter Fall für den Test des Messgeräts: eine Situation, in der du die Antwort vorher
  kennst („bei null Terminen muss es genau die zwei Basisabfragen zählen“). Wenn dir keiner
  einfällt, bitte den Agenten, einen vorzuschlagen, aber validiere ihn selbst: ein Messgerät, das
  gegen einen Fall verifiziert wurde, den das Messgerät selbst erfunden hat, ist nicht
  verifiziert.
- Akzeptabler Mindestzustand: die Hypothese passt in einen Satz, und es gibt einen bekannten Fall,
  mit dem sich das Instrument prüfen lässt.

> Before building anything, we are going to measure. The hypothesis is: [X]. Write a meter (a
> script that lives in the repository) that measures [the quantity], and a test for the meter
> that checks it against a known case where the answer is known in advance. If measuring
> requires access or data you lack, ask me; do not approximate silently. If some part can only
> be approximated, mark it as approximate and tell me the margin. Run the meter, show me the
> number together with the command that produces it, and audit it in both directions: from the
> code to the measurement (is everything that should be counted, counted?) and from the
> measurement to the code (does everything counted actually exist?). Only then propose what to
> build. Reply in my language.

> [de]
> Bevor wir irgendetwas bauen, messen wir. Die Hypothese ist: [X]. Schreib ein Messgerät (ein
> Skript, das im Repository lebt), das [die Größe] misst, und einen Test für das Messgerät, der
> es gegen einen bekannten Fall prüft, bei dem die Antwort im Voraus bekannt ist. Wenn das Messen
> Zugang oder Daten erfordert, die dir fehlen, frag mich; nähere nicht stillschweigend an. Wenn
> sich ein Teil nur annähern lässt, markiere ihn als Näherung und nenn mir die Toleranz. Lass das
> Messgerät laufen, zeig mir die Zahl zusammen mit dem Befehl, der sie erzeugt, und auditiere sie
> in beide Richtungen: vom Code zur Messung (ist alles gezählt, was gezählt werden sollte?) und
> von der Messung zum Code (existiert alles Gezählte wirklich?). Erst dann schlag vor, was zu
> bauen ist. Antworte in meiner Sprache.

Was ich hier verlange, Klausel für Klausel: das Messgerät **im Repository** (keinen losen Befehl,
der verloren geht); den **Test des Messgeräts** gegen einen bekannten Fall (den Schutz); die
Vollständigkeitsklausel in ihrer Form fürs Messen (um den Zugang bitten, nicht stillschweigend
annähern); das Näherungsweise mit seiner Toleranz markieren; die Zahl **mit dem Befehl**, der sie
erzeugt, damit du ihn ausführen kannst; das Audit in zwei Richtungen, das meine zwei lügenden
Messgeräte entlarvt hat; und die Reihenfolge: erst messen, dann vorschlagen.

**Wenn es ein Budget gibt:**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- Die gemessene Zahl, die du selbst mit dem Befehl laufen lassen hast, den der Agent dir gegeben
  hat, und die dasselbe ergeben hat. Wenn du ihn nicht laufen lassen hast, setz kein Budget
  darauf.
- Der Spielraum, den du zu geben bereit bist, von dir entschieden: ein wenig mehr als das
  Gemessene, nicht das Doppelte „für alle Fälle“.
- Akzeptabler Mindestzustand: du hast das Messgerät selbst laufen lassen.

> Set the budget for [queries / loops / time] on this path at the measured value plus a small
> margin, and protect it with a test that fails if it is exceeded. Tell me the number and the
> margin.

> [de]
> Setze das Budget für [Abfragen / Schleifen / Zeit] auf diesem Pfad auf den gemessenen Wert
> plus eine kleine Marge, und schütze es mit einem Test, der fehlschlägt, wenn es überschritten
> wird. Nenn mir die Zahl und die Marge.

Was ich hier verlange: dass das Budget das Gemessene plus wenig ist, keine runde Zahl, und dass es
einen Test hat, der fehlschlägt, wenn es überschritten wird. So taucht eine Leistungsregression in
der Batterie auf und nicht in der Produktion [Ref. 37](../REFERENCIAS.md#ref-37).

**Wenn derjenige, der geplant hat, Zahlen geliefert hat (Regel fünf):**

**Bevor du den Prompt schickst**, musst du das hier zur Hand haben:

- Ein Plan des Agenten mit Zahlen darin („es gibt 121 Schleifen“, „es sind 27 Abfragen“), sichtbar
  im Gespräch.
- Das Messgerät, das diese Größe misst, bereits vorhanden (der anfängliche Prompt dieses
  Schritts). Wenn es für diese Zahl kein Messgerät gibt, zuerst der anfängliche Prompt und dann
  dieser.
- Akzeptabler Mindestzustand: für jede Zahl des Plans weißt du, mit welchem Messgerät sie geprüft
  wird.

> Before executing the plan, verify every number the plan asserts with the meter. If any does
> not match, stop and tell me; do not execute on a wrong number.

> [de]
> Bevor du den Plan ausführst, verifiziere jede Zahl, die der Plan behauptet, mit dem Messgerät.
> Wenn eine nicht übereinstimmt, halt an und sag es mir; führe nicht auf einer falschen Zahl aus.

Was ich hier verlange: dass derjenige, der ausführt, den Zahlen dessen, der geplant hat, nicht
vertraut, auch wenn es dasselbe Modell in einer anderen Sitzung ist. In meinem Fall waren drei von
vier Behauptungen des Plans falsch; wo es ein Instrument gab, war die Zahl exakt.

## 3. Erwartetes Ergebnis

- Das Messgerät im Repository (`tools/measure_*.py`, `scripts/meter-*.mjs` oder ähnlich), mit
  seinem Test.
- Die Zahl, mit dem Befehl, der sie erzeugt, und dem Datum.
- Das Audit in zwei Richtungen, in zwei oder drei Zeilen geschrieben.
- Das Näherungsweise als solches markiert, mit seiner Toleranz.
- Wenn es ein Budget gibt: der Wert, die Marge und der Test, der es schützt.
- Im Commit: "measured: [number] with [meter]".

## 4. Vollständigkeitsprüfung

- Kannst du den Befehl des Messgeräts selbst ausführen, und er gibt dir dieselbe Zahl? (Du führst
  ihn aus; du musst ihn nicht verstehen, nur ausführen.)
- Hat das Messgerät einen Test? Gegen welchen bekannten Fall?
- Gibt es im Bericht eine Zahl ohne Messgerät dahinter? Frag, woher sie stammt.
- Ist das Näherungsweise markiert?
- Wenn der Plan Zahlen mitbrachte: hat der Agent sie vor dem Ausführen verifiziert und dir
  gesagt, welche nicht stimmten?

## 5. Warnsignale

- Eine Zahl hat sich zwischen zwei Berichten geändert, ohne dass sich der Code geändert hat. Eine
  der beiden wurde nicht gemessen.
- Das Messgerät liefert null. Es ist fast nie null; fast immer sieht das Messgerät etwas nicht.
- Der Agent schlägt vor, „während des Messens“ zu bauen, um Zeit zu gewinnen. Die Reihenfolge ist
  die Methode: erst die Zahl, dann der Plan.
