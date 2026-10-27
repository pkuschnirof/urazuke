# Revisión semántica de los nueve idiomas de la interfaz

**Fecha:** 2026-10-27 · **Pendientes:** `PND-026` a `PND-034` (uno por idioma) · **Repositorio del
arreglo:** el del portal (`yujin.app/urazuke/i18n/`) · **Quién la hizo:** la hizo un modelo, y lo
digo acá arriba porque cambia cómo se lee: no es la lectura de un hablante nativo contratado para
esto, es una revisión máquina-asistida que el dueño autorizó como entregable el 2026-10-27. Lo que
sí es verificable sin creerme nada está marcado **[medido]**: va con el comando que lo reproduce.

## Qué se revisó, y contra qué

Las **245 claves** de cada uno de los nueve idiomas de la interfaz de la portada, leídas contra las
245 castellanas. El castellano no se revisa contra sí mismo: es la fuente de verdad. Lo que se
buscaba es lo que la máquina no puede ver sola y la auditoría externa pidió por eso mismo: falsos
amigos (el caso italiano de *tramonti* por *tramo* es el ejemplar), números que no coincidan,
términos del glosario traducidos de dos maneras distintas **dentro del mismo archivo**, y cualquier
frase que diga algo que la castellana no dice.

**[medido]** Paridad y vacíos, antes de empezar: 245 claves en los diez archivos, cero faltantes,
cero vacías.

```
ar 39.988 B · de 33.254 B · en 30.864 B · es 32.128 B · fr 34.226 B
hi 62.412 B · it 31.695 B · ja 35.547 B · pt 31.682 B · zh 27.716 B   (245 claves cada uno)
```

## Lo primero: dos defectos que no son de ninguna traducción

Las nueve entradas comparan cada idioma contra el castellano. Al hacerlo aparecieron dos cosas que
están mal **en el castellano**, y por lo tanto están mal, fielmente traducidas, en los diez. Van
con pendiente propio porque no se arreglan en una traducción.

**La portada dice dos veces que la retrospectiva es el peldaño 15, y una línea más arriba dice que
es el 23** (`PND-057`). En `faq.a6`: «el peldaño 15 pide que cada retrospectiva termine en una
propuesta concreta de cambio a la escalera». En `paths.c2.p`: «Es el 15 volviendo al 0». Y en
`ladder.lede`, en la misma página: «El 23 cierra el ciclo y vuelve al 0». El documento principal no
tiene duda: el 23 es *El agente residente y la retrospectiva con número*, y el 15 es *Integración
continua, entornos, secretos y despliegue*. Es un resto de cuando la escalera tenía dieciséis
peldaños. **[medido]** El 15 aparece en esas dos claves en los **diez** idiomas: la comprobación
busca los números de dos cifras de `faq.a6` y de `paths.c2.p` en los diez catálogos y devuelve `15`
en los veinte casos.

**La entrada de la tabla del material promete cinco documentos por idioma y la tabla tiene diez
columnas** (`PND-058`). `material.lede` dice «Tres documentos por idioma» y «desde la versión 5,
dos documentos más»; la tabla que sigue lista `material.col2` a `material.col11`: documento
principal, contratos, manual-curso, referencias, camino evolutivo, curso parte 2, junior, en
equipo, anexo de heurísticas y preguntas al proveedor. Un lector que confía en la entrada no se
entera de que existen el anexo de las cuarenta y cinco reglas ni la hoja de las veinticinco
preguntas. Ya estaba viejo antes de la columna de la hoja; lo digo porque la columna la agregué yo
anteayer y no revisé el párrafo que la presenta.

## Dos errores de número, y uno es ilegible

**[medido]** `origin.h2`, el título de la sección «De dónde sale», dice en castellano «cuarenta y
seis casos documentados». Siete idiomas lo dicen bien. **El japonés y el chino dicen `四二十四`**,
que no es un número: no es 46, no es 44, no es 24, no se lee. En un título.

```
es cuarenta y seis · ar ست وأربعون · de sechsundvierzig · en forty-six · fr quarante-six
hi छियालीस · it quarantasei · pt quarenta e seis
ja 四二十四   <-- no es un numero
zh 四二十四   <-- no es un numero
```

**[medido]** `origin.f2.p` dice en castellano «Partí el despliegue con **veinticuatro** a
veintisiete minutos contra once». El japonés dice `16〜27分` y el chino `16 到 27 分钟`. Los otros
siete dicen veinticuatro. Es una cifra de una retrospectiva real: el método la publica como
evidencia y en dos idiomas está cambiada.

Los dos están en los mismos dos idiomas y en claves vecinas, así que lo más probable es que salgan
de la misma pasada de edición. Eso no los hace menos graves: la cifra equivocada es justo la que el
método usa para decir que mide.

## Los nueve, uno por uno

Cada lista es «corrección propuesta → la que recomiendo». Donde digo *una sola palabra* es que el
mismo objeto está traducido de dos maneras en el mismo archivo, que es el defecto que el propio
Anexo H prohíbe en UX-24 para la interfaz de un sistema: un sinónimo es un defecto.

### PND-026 — árabe (ar)

1. **`الاستعادة` por «retrospectiva»** (`step.23`, `phase.4.p`, `origin.f2.h`, `faq.a6`).
   `الاستعادة` es *recuperación*: «la recuperación con números», y en `faq.a6` «que cada
   recuperación termine en una propuesta». En `tramo4.p` y `nine.li9` el mismo concepto está
   traducido `المراجعة الختامية`. → una sola forma, y que signifique *mirar atrás*:
   `المراجعة الاستعادية`.
2. **`الأدلة` por «manuales»** (`tramo3.p`, `phase.3.p`). `الأدلة` es también el plural de
   `الدليل`, que es *la evidencia*, que es la palabra del título de la página (`منهج الدليل`). «Los
   tres manuales» se lee «las tres evidencias». En `paths.c2.p` sí está desambiguado
   (`أدلة استخدام`). → `الكتيبات` o `أدلة الاستخدام`.
3. **`خط الإنتاج` por «la cadena»** (`step.18`, `nine.li10`, `nine.li12`). Literalmente es *la línea
   de producción*, en una página que habla todo el tiempo del *entorno de producción*: «escanear
   vulnerabilidades en la línea de producción». Y conviven otras tres formas para lo mismo:
   `سلسلة` (`phase.1.p`, `phase.3.p`, `phase.4.p`), `خطوط الأنابيب` (`thesis.body`) y `المسار`
   (`tramo3.p`). → una sola.
4. **`المحفزات` por «los prompts»** (`material.api`), donde el resto del archivo dice
   `الموجِّهات`. `المحفزات` es *estímulos*. → `الموجِّهات`.
5. **`مقاطع` y `مراحل` para «tramo»** (`what.is.li2` y `ladder.h2`), y `مراحل` es además lo que la
   línea de tiempo usa para sus cinco *fases*: la página termina con cuatro `مراحل` y cinco
   `مراحل` que son otra cosa. → `مقاطع` en los dos lugares del tramo.
6. **[medido] Las flechas de los botones apuntan en las dos direcciones.** Cuatro claves con
   `&rarr;` y cuatro con `&larr;`, en una página que se lee de derecha a izquierda:

```
ar | rarr: nav.read, hero.cta1, tools.t4, closing.cta1
   | larr: paths.cta1, paths.cta2, junior.cta, collab.cta
es | rarr: las ocho
```
   → una sola dirección para las ocho; cuál, lo decide quien diseñó la página.
7. Menor, de concordancia: `origin.f2.p` dice `بأربع وعشرون` donde el caso pide `بأربع وعشرين`.

### PND-027 — alemán (de)

1. **[medido] La página trata al lector de «du» y de «Sie» a la vez**, y las dos formas conviven
   dentro de la misma sección:

```
du  : paths.lede, prompt.antes, prompt.tr, material.api, faq.a5 ("deines Systems")
Sie : reqs.h2, reqs.f1.p, reqs.f2.p, course.f1.h, course.f3.p, material.h2, faq.a1, closing.*
```
   El castellano tiene una sola voz. → elegir una, y recomiendo **«Sie»**, que es la que usan el
   cierre y las preguntas frecuentes.
2. **«pendiente» tiene dos formas**: `offener Posten` (`tramo2.p`, `step.22`, `paths.c2.p`,
   `collab.lede`) y `offener Punkt` (`step.5`, `nine.li5`, `phase.2.p`, `prompt.antes`,
   `reqs.*`). Y `offener Posten` es, en alemán corriente, una *factura impagada*. → `offener
   Punkt` en todas.
3. **«compuerta» tiene dos formas**: `Gate` (`step.4`, `thesis.k3.p`, `tools.t4`, `faq.a3`) y `Tor`
   (`step.9`, `paths.c3.p`, `faq.a5`, `material.api`, `material.toolsdocs`). → una.
4. **«candado» tiene dos formas**: `Sperren` (`tramo3.p`) y `Schlösser` (`step.8`, `step.14`,
   `phase.3.p`). → una.
5. **«la cadena» tiene dos formas**: `Pipeline` y `Kette`, repartidas sin criterio visible. → una.
6. **«contrato de convivencia» tiene tres**: `Zusammenarbeitsvereinbarung` (`step.1`, `nine.li2`),
   `Arbeitsvereinbarung` (`paths.c2.p`) y `Vereinbarung` suelta (`phase.1.p`, `tools.t1`). → una.
7. **«evidencia» tiene dos**: `Nachweis` (todo el archivo) y `Evidenz` (`material.practica`). →
   `Nachweis`.
8. `paths.c3.p` dice `die Schuld wird bezahlt` para «la deuda pagada». `die Schuld` es la *culpa*.
   → `die Schulden` o `die technische Schuld`.

### PND-028 — inglés (en)

1. **`thesis.k2.p` ablanda la afirmación.** El castellano dice «Un test que nunca viste fallar **no
   sabés si** prueba algo» —es una afirmación sobre lo que uno puede saber—. El inglés dice «A test
   you never saw fail **may prove nothing**», que es una afirmación sobre lo que el test hace, y
   deja la puerta abierta a que sí pruebe. → «A test you never saw fail — you cannot know whether
   it proves anything.» (El alemán copia el mismo ablandamiento, punto 1 de su lista; el francés,
   el italiano, el japonés, el chino, el portugués, el árabe y el hindi conservan el sentido.)
2. Lo demás está bien, y conviene decirlo con su comprobación: el vocabulario coincide con el del
   corpus inglés publicado, que es lo que un lector que pasa de la portada al documento tiene que
   reconocer. **[medido]** `grep -c "stretch" docs/en/ESCALERA_METODOLOGICA.md` → 19, y la portada
   usa *stretch* para «tramo» y *step* para «peldaño», como el corpus.
3. Hereda los dos defectos del castellano (el peldaño 15, la entrada del material).

### PND-029 — francés (fr)

1. **«peldaño» tiene dos formas**: `marche` (casi todo el archivo) y `échelon` (`phase.3.p`,
   `paths.c1.p`, `paths.c2.p`, `material.practica`). → `marche`.
2. **«candado» tiene dos formas**: `verrous` (`tramo3.p`) y `cadenas` (`step.8`, `step.14`,
   `phase.3.p`). → una.
3. **`prompt.antes` trata al lector de «tu»** («quels fichiers **tu** construis») en una página que
   lo trata de «vous» en todas las demás claves. El prompt mismo (`prompt.tr`) habla de «tu» al
   agente, y eso está bien: es el modelo. El bloque de antes le habla a la persona. → «vous».
4. **«línea de tiempo» tiene dos formas**: `chronologie` (`timeline.eyebrow`, `meta.description`) y
   `ligne du temps` (`timeline.lede`). → una.
5. `origin.f1.h` traduce «lo obvio» como `l'évidence`. En francés es correcto —*lo evidente*—, pero
   en esta página `évidence` choca de frente con `preuve`, que es la palabra del título
   (`la méthode de la preuve`). Un lector lee «donde el modelo falla al aplicar la evidencia». →
   `à appliquer ce qui est évident`.

### PND-030 — hindi (hi)

1. **«método» tiene dos formas**: `विधि` (título, `meta.*`, `hero.*`, `nav.*`, `tools.t4`,
   `material.note`) y `पद्धति` (`ladder.lede`, `timeline.lede`, `paths.h2`, `paths.lede`,
   `paths.c2.h`, `paths.c3.h`, `collab.lede`, `junior.lede`, `material.api`). Es la palabra del
   título de la página. → una.
2. **«evidencia» tiene dos formas**: `प्रमाण` (la del título, `प्रमाण-विधि`) y `साक्ष्य`
   (`paths.c2.p`, `paths.c3.p`, `collab.lede`). → `प्रमाण`.
3. **«compuerta» tiene dos formas**: `गेट` (`step.4`, `step.9`, `thesis.k3.p`, `paths.c3.p`,
   `tools.t4`) y `द्वार` (`material.api`, `material.toolsdocs`). → `गेट`.
4. **«la cadena» tiene dos formas**: `पाइपलाइन` y `शृंखला`. → una.
5. `step.15` y `nine.li10` traducen «secretos» como `रहस्य`, que es *misterio*. El término del
   oficio es `सीक्रेट्स` o `गोपनीय कुंजियाँ`. → cambiar.

### PND-031 — italiano (it)

1. **«compuerta» tiene dos formas**: `cancello` (`step.4`, `step.9`, `thesis.k3.p`, `paths.c3.p`,
   `tools.t4`, `faq.a3`, `faq.a5`) y `porte` (`material.api`, `material.toolsdocs`). → `cancelli`.
2. **«pendiente» tiene dos formas**: `voce in sospeso` (todo el archivo) y `il pendente`
   (`prompt.antes`), que en italiano es *un colgante*. → `la voce in sospeso`.
3. **`timeline.e2e.tag`: «Tres escalas» → `Tre scale`.** `scala` es la palabra que esta misma
   página usa para *la escalera* (`nav.ladder`, `ladder.h2`, `paths.lede`). El lector lee «tres
   escaleras» en una sección que habla de tres magnitudes. → `Tre livelli` o `Tre ampiezze`.
4. **«tramo» traducido `fase`** (`what.is.li2`, `ladder.h2`), que es también lo que la línea de
   tiempo usa para sus cinco fases: la página tiene «quattro fasi» y «cinque fasi» hablando de
   cosas distintas. Es, además, consecuencia directa del arreglo de `PND-017`, que cambió
   *tramonti* por *fasi*. → `tratti` o `sezioni`.
5. `material.practica` agrega «(in spagnolo)», que el castellano no dice (ver la nota común abajo).

### PND-032 — japonés (ja)

1. **`origin.h2` dice `四二十四`**, que no es un número. Tiene que decir `四十六`. Ver arriba.
2. **`origin.f2.p` dice `16〜27分`** donde la cifra real es veinticuatro a veintisiete. Ver arriba.
3. **«pendiente» tiene dos formas**: `保留項目` (`step.5`, `nine.li5`, `phase.2.p`,
   `timeline.e2e.p`, `prompt.tr`, `reqs.*`) y `保留事項` (`tramo2.p`, `step.22`, `paths.c2.p`,
   `collab.lede`, `prompt.antes`). Están incluso en claves vecinas: `prompt.antes` usa una y
   `prompt.tr` la otra. → una.
4. **«retrospectiva» tiene dos formas**: `振り返り` (`step.23`, `phase.4.p`, `origin.f2.h`) y
   `レトロスペクティブ` (`tramo4.p`, `nine.li9`). → una.
5. **«tramo» traducido `フェーズ`** (`what.is.li2`) y `区間` (`ladder.h2`), y `フェーズ` es lo que la
   línea de tiempo usa para sus cinco fases. → `区間` en los dos.
6. **«la cadena» tiene dos formas**: `パイプライン` y `チェーン`. → una.

### PND-033 — portugués (pt)

1. **[medido] `prompt.antes` está en portugués europeo y el resto del archivo en brasileño.**

```
prompt.antes : "o ambiente de teste a correr", "que ficheiros constroes tu"
el resto     : "voce", "arquivo", "rodar o teste", "me mostre"
```
   Y deja «archivo» con dos palabras en el mismo archivo: `ficheiros` acá y `arquivo` en
   `tools.h2` y `contract.c3.p`. → una variedad y una palabra.
2. **«pendiente» tiene dos formas**: `pendência` (todo el archivo) y `o pendente`
   (`prompt.antes`). → `pendência`.
3. **«la cadena» tiene dos formas**: `esteira` (`tramo3.p`, `step.18`, `nine.li10`, `nine.li12`,
   `timeline.lede`) y `cadeia` (`phase.1.p`, `phase.3.p`, `phase.4.p`). → una.
4. Cinco claves quedaron idénticas al castellano —`contract.c1.h`, `contract.c3.h`,
   `material.col2`, `material.col7`, `material.col10`—; las revisé una por una y las cinco son
   portugués válido con la misma grafía. No hay nada que corregir, y queda dicho para que la
   próxima comprobación mecánica no las vuelva a levantar como sospechosas.

### PND-034 — chino (zh)

1. **`origin.h2` dice `四二十四`**, que no es un número. Tiene que decir `四十六`. Ver arriba.
2. **`origin.f2.p` dice `16 到 27 分钟`** donde la cifra real es veinticuatro. Ver arriba.
3. **«retrospectiva» tiene dos formas**: `复盘` (`step.23`, `phase.4.p`, `origin.f2.h`) y `回顾`
   (`tramo4.p`, `nine.li9`). → una.
4. **«pendiente» tiene dos formas**: `待办项` (todo el archivo) y `待办事项` (`prompt.antes`). →
   `待办项`.
5. **«tramo» traducido `阶段`** (`what.is.li2`, `ladder.h2`), que es lo mismo que usa la línea de
   tiempo para sus cinco fases: «四个阶段» y «五个阶段» son cosas distintas con el mismo nombre. →
   `区段` o `段落`.
6. **«la cadena» tiene dos formas**: `流水线` y `链路`. → una.

## Lo que aparece en varios idiomas a la vez

**`prompt.antes` es la clave que más se desvía, y en cinco idiomas.** El italiano le pone
*pendente*, el portugués la escribe en portugués europeo con *pendente*, el francés cambia a «tu»,
el japonés usa `保留事項` contra el `保留項目` de la clave siguiente, el chino `待办事项` contra
`待办项`. Cinco idiomas, el mismo defecto de forma: es la clave que entró después, traducida en otra
pasada, sin el glosario de la primera. No es una coincidencia que convenga olvidar: dice que
**agregar una clave a la interfaz tiene que traer su glosario**, o la clave nueva habla otro idioma
que el resto de la página.

**«La cadena» se parte en dos en seis idiomas** (de, pt, ja, zh, ar, hi): la palabra de la
tubería de integración por un lado y la palabra de «cadena» por el otro, repartidas sin criterio. El
castellano usa una sola. El francés es el único que mantiene una (`chaîne`).

**«(en español)» agregado en nueve de nueve.** `material.practica` cierra, en todos los idiomas
—incluido el inglés—, con una aclaración que el castellano no tiene: que la evidencia de los dos
manuales de práctica está en castellano. Es verdad y le sirve al lector. Pero es una frase que la
fuente de verdad no dice, y la regla del repositorio es que el castellano manda. → recomiendo
**agregarla al castellano** y dejar las nueve como están: es más honesto que borrar nueve
aclaraciones correctas.

## Lo que esta revisión no es

- **No es la revisión de un hablante nativo.** Lo de arriba son dos clases de cosa muy distintas y
  conviene no mezclarlas: lo marcado **[medido]** se reproduce con un comando y no depende de mi
  juicio (los números, las flechas, el du/Sie, las dos variedades del portugués, las dos formas de
  una misma palabra); lo demás es juicio de traducción, y un hablante nativo puede estar en
  desacuerdo con una recomendación concreta sin que el hallazgo deje de ser un hallazgo.
- **No toca el corpus.** Son las 245 cadenas de la interfaz de la portada. El corpus —los treinta y
  cuatro documentos, cientos de miles de caracteres— es otro trabajo y todavía no tiene entrada,
  porque primero hay que decidir si se revisa todo o sólo lo que cambió.
- **No arregló nada el día que se escribió, y hoy arregló la mitad medida.** El 2026-10-27, el
  mismo día, el dueño eligió aplicar sólo lo que se reproduce con un comando —números, flechas,
  registro— y dejar el juicio de traducción para después. Entraron veintiún cambios en seis
  idiomas: los dos números del japonés y del chino, las ocho flechas del árabe en una sola
  dirección más su concordancia, las cinco claves alemanas que trataban al lector de «du», el
  `prompt.antes` francés y la variedad del `prompt.antes` portugués. Lo horneado lo confirma: 8 ←
  y 0 → en árabe contra 8 → y 0 ← en castellano, `四十六` en los dos títulos, `24〜27分` y
  `24 到 27 分钟`. Quedan **veintisiete** hallazgos de juicio, que son los de abajo sin marca
  `[medido]`. Dos cosas a medias, dichas: el alemán conserva «du» en `prompt.tr` a propósito
  —le habla al modelo, no a la persona, el mismo criterio que el francés ya aplicaba— y el
  hallazgo #2 del portugués no entró aunque vive en la clave que sí se tocó, porque es elección
  de término.
- **Y los arreglos siguen sin publicar.** Viven en el repositorio del portal, y ahí empujar **es**
  publicar: son las diez portadas horneadas en diez idiomas. El criterio de aceptación de las nueve
  entradas es sobre lo que el lector lee, así que ninguna puede cerrar con la lista ni con el
  commit: cierran cuando la corrección está **servida**. Están en curso.
