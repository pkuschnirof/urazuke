# Die fünfundzwanzig Fragen an den Anbieter

Dieses Blatt ist für einen sehr konkreten Moment: jemand bietet dir an, dir ein System zu bauen,
oder übergibt es dir, und du programmierst nicht. Du musst für dieses Treffen nicht programmieren
lernen. Du musst wissen, **was du dir zeigen lassen sollst**.

Die vollständige Methode lebt in den Verträgen der vierundzwanzig Schritte, und jeder Vertrag bringt
seine „Vollständigkeitsprüfung ohne Code zu lesen" mit: die Liste der Kontrollen, die der Eigentümer
an dem Gelieferten vornimmt. Das taugt, solange das Projekt läuft, aber es ist auf zweiunddreißig
Dateien verteilt, und niemand geht damit in ein Treffen. Dieses Blatt ist dasselbe,
zusammengefasst und geordnet nach **dem, was dir versprochen wird**. Man druckt es aus und nimmt es
mit.

## Die einzige Regel, die du dir merken musst

**Die Antworten, die zählen, sind die, die man sehen kann.** Eine Datei, eine Zahl mit dem Befehl,
der sie erzeugt, ein Test, den man scheitern gesehen hat, ein Handbuch, eine Unterschrift mit Datum.
Die, die man nicht sehen kann, sind Versprechen, und ein Versprechen ist keine Antwort: es ist eine
Absicht, gesagt von jemandem, der das Treffen abschließen will.

Du musst nicht verstehen, was man dir zeigt. Es reicht, dass es **existiert** und dass die Person es
vor dir öffnet. Wenn sie dir, um zu antworten, erklären muss, warum noch nicht, notiere das Datum und
frag beim nächsten Treffen wieder: was zweimal wiederholt und nicht gezeigt wird, wird nicht
auftauchen.

Drei Sätze, die man erkennen sollte, weil sie „das habe ich nicht" bedeuten:

- „Vertrau mir, das machen wir immer so."
- „Das sieht man am Ende, wenn alles fertig ist."
- „Das habe ich im Kopf / das liegt im Repository, ich schicke es dir nachher."

Und eine ehrliche Klarstellung in der anderen Richtung: **ein „Nein" mit seinem Grund ist eine gute
Antwort.** „Wir haben keine Lasttests, weil es dreißig Benutzer sind und wir das so abgesprochen
haben" ist ein Nein mit Grund, und es ist genau das, was die Methode Angemessenheit nennt. Was nichts
taugt, ist das „Ja", das man nicht sehen kann.

## Wenn du nur zehn Minuten hast

Wenn das Treffen kurz ist, bringen diese fünf mehr Information als die fünfundzwanzig: die **4** (ein
rot gesehener Test), die **7** (der Plan sind die offenen Posten), die **13** (der Grenzwert, der die
Konstruktion anhält), die **20** (das Wiederherstellungshandbuch, von einer Person erprobt) und die
**24** (der Bericht, der sagt, was nicht verifiziert werden konnte). Wenn diese fünf zu sehen sind,
ist der Rest fast immer da. Wenn keine davon zu sehen ist, ist der Rest fast nie da.

---

## Was man dir versprochen hat: „ich liefere es funktionierend"

**1. Kannst du mir das System laufend zeigen, in einer Umgebung, die nicht dein Computer ist?**
Was man sehen kann: eine Adresse, die du selbst öffnest, auf deinem Telefon, mit Testdaten. Wenn es
nur auf der Maschine dessen läuft, der es gebaut hat, existiert es als System noch nicht.
*(Schritt 15.)*

**2. Was muss wahr sein, damit du eine Anforderung von mir als fertig betrachtest?**
Was man sehen kann: geschrieben, vor dem Anfang, für jede Anforderung. Sie sollte „der Test ist
durchgelaufen" und „eine Person hat es benutzt" enthalten. Wenn die Antwort „wenn es funktioniert"
lautet, gibt es kein Kriterium: es gibt eine Meinung.
*(Schritt 5, Abnahmekriterien.)*

**3. Gibt es einen automatischen Test für jede Sache, die mir wichtig ist?**
Was man sehen kann: ein Durchlauf der Testbatterie, mit Zahlen, auf dem Bildschirm. Der Inhalt ist
dir egal: dir ist wichtig, dass es eine Ausgabe gibt und dass sie sagt, wie viele durchgelaufen sind.
*(Schritt 8.)*

**4. Kannst du mir einen dieser Tests **scheitern** zeigen?**
Was man sehen kann: das Stück Bildschirm, auf dem der Test gegen das System ohne die Reparatur rot
wurde, mit dem Befehl, der ihn gefahren hat, und dem Datum. Es ist die wichtigste Frage des Blatts:
von einem Test, den niemand scheitern gesehen hat, weiß man nicht, ob er etwas beweist. Ein System
kann tausend Tests haben, die durchlaufen, und nichts bewachen.
*(Schritt 8. In der Methode heißt das „rot erprobt".)*

**5. Wer, außer dir und einem Programm, hat das System benutzt und ist bis zum Ende gekommen?**
Was man sehen kann: eine Liste von Testfällen, die für eine Person geschrieben sind, mit Datum, mit
dem Namen dessen, der sie ausgeführt hat, und was passiert ist. Der, der gebaut hat, kann nicht der
Einzige sein, der getestet hat, und das Modell testet, was es verstanden hat, was nicht immer das
ist, was du verlangt hast.
*(Schritt 10.)*

**6. Wenn ich auf dem Bildschirm etwas falsch mache — zweimal eingebe, den Knopf hastig drücke —,
was passiert?**
Was man sehen kann: die Liste der Aktionen, die man nicht rückgängig machen kann, jede mit ihrem
Schloss und was passiert, wenn sie auf halbem Weg scheitert. Die richtige Antwort ist niemals „das
sollte nicht passieren".
*(Schritt 14.)*

## Was man dir verspricht: „ich weiß, was fehlt und in welcher Reihenfolge"

**7. Wo ist die Liste von dem, was fehlt, und kann ich sie heute sehen?**
Was man sehen kann: ein Register numerierter offener Posten, jeder im Detail geschrieben und mit dem
Datum, an dem er geschlossen wurde. **Diese Liste ist der Plan**: wenn es woanders einen Plan und
hier eine Liste gibt, gibt es zwei Pläne, und der, der zählt, ist der, den niemand anschaut.
*(Schritt 5.)*

**8. Ist jede Sache, die du mir bauen wirst, vor dem Bauen geschrieben, mit meinen Worten?**
Was man sehen kann: der offene Posten, mit der Geschichte, woher die Anforderung kam, so gesagt, wie
du sie gesagt hast, den Regeln, die gelten, den Bildschirmen und den seltsamen Fällen. Wenn er in
einer Zeile steht, wird jemand das Fehlende erfinden.
*(Schritt 5.)*

**9. Wenn etwas am Geschäft nicht klar ist, was machst du?**
Was man sehen kann: die Entscheidungsdatei, mit Datum und mit wem jede entschieden hat. Die Antwort,
die du suchst, ist „ich frage dich und notiere es". Ein Modell, das eine Lücke in den Geschäftsregeln
findet, füllt sie allein und macht weiter, und sechs Wochen später weiß niemand, warum das System das
tut.
*(Schritte 1 und 6.)*

**10. Ist geschrieben, welche Dinge das System **nicht** tun wird?**
Was man sehen kann: ein eigener Abschnitt, mit mindestens zwei Punkten, im Projektdokument. Was nicht
gesagt ist, ist genau das, was anders gebaut auftauchen wird.
*(Schritt 2.)*

**11. Wer sind die verschiedenen Arten von Person, die das benutzen werden, und ist geschrieben, was
jede tun kann?**
Was man sehen kann: die Profilliste — wer jeder ist und was er zu tun kommt — und eine Tabelle, die
sagt, was jedes Profil tun kann. Wenn es ein einziges Profil namens „Benutzer" gibt, fehlt fast immer
die Hälfte: es ist die häufigste Ursache dafür, dass jemand einen Knopf sieht, der ihm nicht zusteht,
oder dass jemand, der die Berechtigung hat, den Bildschirm nicht findet.
*(Schritt 2, die Voreingaben von Anhang H; Schritt 8, die Matrix.)*

## Was man dir verspricht: „es ist gut gemacht"

**12. Was misst eine Maschine bei jeder Änderung, ohne dass sich jemand daran erinnern muss
hinzuschauen?**
Was man sehen kann: die Konfiguration der Prüfkette im Repository und das Protokoll des letzten
Durchlaufs. „Wir schauen es uns untereinander an" ist keine Antwort: es ist eine Gewohnheit, und
Gewohnheiten fallen in der Woche, in der es eilig ist.
*(Schritte 4 und 9.)*

**13. Gibt es einen Grenzwert, der, wenn er überschritten wird, die Konstruktion **anhält**?**
Was man sehen kann: eine Datei mit den Grenzwerten und ihrem heute gemessenen Wert, und ein
Durchlauf, der von einem davon angehalten wurde. Die Kontrollfrage, die man wörtlich stellen sollte:
*habt ihr jemals einen Grenzwert angehoben, um weitermachen zu können?* Wenn die Antwort ja ist und
nicht geschrieben steht, warum, ist der Grenzwert Dekoration.
*(Schritt 9.)*

**14. Woher weißt du, dass eine andere Person den Code pflegen können wird?**
Was man sehen kann: der Bericht pro Regel, keine einzige Zahl: Dateigröße, Funktionsgröße,
wiederholter Code, toter Code. Eine „Qualität von fünfundneunzig Prozent" sagt nicht, was zu
reparieren ist.
*(Schritt 9 und Anhang H.)*

**15. Hat über die Bildschirme jemand nachgedacht, oder sind sie aus dem herausgekommen, was das
Programm brauchte?**
Was man sehen kann: das Protokoll der Benutzbarkeitsregeln mit ihrem Ergebnis, und die abgeschalteten
Ausnahmen mit dem geschriebenen Grund, wer es genehmigt hat und wann es überprüft wird. Ein System
kann alle technischen Prüfungen bestehen und unbenutzbar sein: alles grün, und die Person findet
nicht, wo sie abrechnen soll.
*(Anhang H, die siebenundzwanzig Benutzbarkeitsregeln.)*

**16. Bewachen die Tests, die du mir gezeigt hast, wirklich, oder dekorieren sie?**
Was man sehen kann: der Mutationswert. Es ist ein Programm, das absichtlich Fehler einbaut und zählt,
wie viele die Tests erwischen; die Zahl kommt mit ihrem Befehl heraus. Wenn dein System echte Nutzer
hat, ist das in der Methode nicht optional.
*(Schritt 9.)*

## Was man dir verspricht: „es wird dir nicht schaden"

**17. Was passiert mit meinen Daten, wenn mitten in einem Vorgang etwas kaputtgeht?**
Was man sehen kann: die Tabelle der Aktionen mit ihrer Umkehrbarkeit, und die geschriebene Regel,
dass das System im Zweifel **anhält**, statt weiterzumachen. Eine doppelte Abbuchung oder eine
automatische Genehmigung, die niemand angeschaut hat, sind der typische Fall.
*(Schritt 14.)*

**18. Gibt es Sicherungskopien, und habt ihr jemals erprobt, eine wiederherzustellen?**
Was man sehen kann: das Datum der letzten **erprobten** Wiederherstellung. Eine Kopie, die nie
wiederhergestellt wurde, ist keine Sicherungskopie: sie ist eine Datei, von der niemand etwas weiß.
*(Schritt 20, Wiederherstellungshandbuch.)*

**19. Wer prüft, dass das System keine bekannten Löcher hat, und wie oft?**
Was man sehen kann: der Scan, der in der Kette läuft, mit Datum, und die Befunde in offene Posten
verwandelt. Plus eine kurze und sehr aufschlussreiche Frage: *wo sind die Schlüssel und die
Passwörter des Systems gespeichert?* Wenn sie im Code sind, hast du schon ein Problem.
*(Schritte 18 und 15.)*

**20. Hat jemand, der nicht programmiert, das System von null aus nach einem Handbuch
wiederhergestellt?**
Was man sehen kann: das Handbuch, und das Protokoll dieser Probe mit drei Dingen: wie lange sie von
Ende zu Ende dauerte, an welchem genauen Schritt die Person hängen blieb, und welche Wörter sie nicht
verstanden hat. Wenn das Handbuch mit „öffne eine Sitzung mit dem Agenten" anfängt, ist es kein
Handbuch für eine Person. Und solange das nicht existiert, ohne Umschweife gesagt: **der Eigentümer
ist kein Eigentümer, er ist Mieter**. Er hat das System, er bezahlt es, und er kommt nicht hinein,
ohne den um Erlaubnis zu bitten, der es gebaut hat.
*(Schritt 20.)*

## Was man dir verspricht: „es wird halten"

**21. Mit welchen Zahlen habt ihr das dimensioniert, und woher kommen sie?**
Was man sehen kann: wie viele Benutzer gleichzeitig, wie viele Vorgänge pro Tag, wie viel es pro Jahr
wächst, wie lange es gespeichert bleiben muss. Und der Teil, der wichtig ist: diese Zahlen hat **dein
Geschäft**, nicht der, der baut. Wenn er sie erfunden hat, sind sie falsch.
*(Schritt 3.)*

**22. Habt ihr es mit der Last erprobt, die ich ihm geben werde, und mit zehnmal mehr?**
Was man sehen kann: der Bericht des Durchlaufs, mit der genauen Stelle, an der das System umgefallen
ist. Zu wissen, wo es bricht, ist die einzige Art zu wissen, wie viel Spielraum du hast.
*(Schritt 19.)*

**23. Wenn das System in sechs Monaten langsam ist, wie werdet ihr wissen, warum?**
Was man sehen kann: die strukturierten Protokolle mit einer Kennung pro Aktion, der Bericht der
langsamsten Abfragen, und die konfigurierten Alarme. Wenn die Antwort „wir schauen, wenn es passiert"
lautet, wirst du es zuerst sehen, durch einen wütenden Benutzer.
*(Schritte 16, 17, 21 und 22.)*

## Was man dir verspricht: „ich sage dir die Wahrheit"

**24. Wenn du mir mitteilst, dass etwas fertig ist, wie unterscheide ich, was du erprobt hast, von
dem, was du annimmst?**
Was man sehen kann: der Bericht in drei Blöcken: **verifiziert** (mit dem Beweis daneben),
**geglaubt** (und warum es nicht erprobt wurde) und **blinde Flecken** (was man von dort, wo er
steht, nicht sehen kann). Ein bloßes „fertig" ist kein Bericht. Und der zweite Teil der Frage ist
mehr wert als der erste: *welche Dinge dieser Lieferung konntest du **nicht** verifizieren?* Wenn die
Antwort „keine, alles verifiziert" lautet, sei misstrauisch: niemand verifiziert alles.
*(Schritt 12.)*

**25. Wer prüft die Arbeit, außer dir selbst?**
Was man sehen kann: eine Prüfung, die von jemandem — oder etwas — anderem als dem gemacht wurde, der
gebaut hat, mit ihren Befunden in offene Posten verwandelt und mit Datum. Ein Modell bestätigt einen
erheblichen Teil seiner eigenen Fehler, und eine Person auch. Der, der baut, kann nicht der Einzige
sein, der verifiziert.
*(Schritt 13.)*

---

## Was mit den Antworten zu tun ist

Notiere neben jeder Frage eines von drei Dingen: **gesehen**, **noch nicht gesehen** (mit dem Datum,
an dem es dir versprochen wurde) oder **existiert nicht und man hat mir gesagt, warum** (mit dem
Grund). Es müssen nicht alle fünfundzwanzig „gesehen" ergeben: ein kleines Projekt braucht keine
Lasttests und keine wöchentliche Überwachung, und die Methode sagt das. Was aber passieren muss, ist,
dass **jedes „Nein" seinen geschriebenen Grund hat**, denn ein Nein mit Grund ist eine Entscheidung
von dir und ein Nein ohne Grund ist eine Schuld, die du bezahlen wirst, ohne sie gewählt zu haben.

Und eine letzte, die nicht numeriert ist, weil sie nicht für den Anbieter ist: wenn es jemandem
unangenehm wird, weil du darum bittest, die Dinge zu sehen, ist das auch Information.

---

## Woher dieses Blatt kommt

Die fünfundzwanzig Fragen sind die „Vollständigkeitsprüfung ohne Code zu lesen" der Verträge dieser
Methode, zusammengefasst: jede nennt den Schritt, aus dem sie kommt, sodass jeder zum Vertrag gehen
und die vollständige Version lesen kann. Sie sind für dieses Blatt von null geschrieben.

**Die Idee, dass das als Blatt existieren musste, ist nicht meine.** Sie kam von der ersten
Übertragung der Methode in ein anderes Format — dem Roman von Oscar Schmitz „El Arte de Forjar
Sistemas", 2026, in Teil F des Hauptdokuments mit Quellenangabe —, der es besser gesagt hat als ich:
die Methode hat die Prüfung auf ihre Verträge verteilt, und ihr fehlte das Stück, das ein Eigentümer
zu einem Treffen mitnimmt. Das Kriterium am Kopf dieses Blatts — dass die Antworten, die zählen, die
sind, die man sehen kann — ist auch von dort. Seine Version der Fragen ist sein Werk und seine Rechte
sind vorbehalten; diese sind andere, aus meinen Verträgen geschrieben, und darum werden sie unter der
Lizenz dieses Repositorys veröffentlicht.
