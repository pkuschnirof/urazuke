# Peldaño 9 — Calidad del código verificada por máquina, con compuerta (contrato del peldaño)

**Tramo:** bucle.
**Cuándo:** se monta una vez, al abrir el primer bloque funcional (apenas termina el arranque), y
desde entonces corre solo en cada commit, como compuerta de la integración continua; cada
pendiente se cierra con la calidad en verde, después del test en rojo (8) y antes del caso de
prueba manual (10). Al cierre de cada bloque y antes de cada despliegue, el reporte de calidad se
lee con el dueño. En un legado, la primera corrida es la línea base y los hallazgos entran al
backlog con su marca de velocidad.
**Forma:** un solo tiro para montar; después, rutina de cada cambio y lectura por bloque.
**Tamaño:** obligatorio en su nivel mínimo en todo proyecto (un linter y un límite de tamaño en
la cadena); completo, con pruebas de mutación incluidas, en cualquier proyecto con usuarios. Las
pruebas de mutación quedan como refuerzo opcional solo cuando no hay usuarios reales (una
herramienta interna, un prototipo que nadie más corre).

## Para qué sirve

El dueño no lee el código, y ese es el punto del método. Pero el código existe, lo va a mantener
alguien (el próximo agente, el próximo desarrollador), y un código que funciona hoy y es ilegible
mañana es deuda que se cobra en el mes tres. Si nadie lo lee, **lo tiene que mirar una máquina**:
herramientas que, en cada commit, miden lo que un revisor humano miraría y lo convierten en un
número con un límite. Yo lo hice en todos mis proyectos, sin nombrarlo como peldaño, y una
auditoría de calidad me devolvió un componente de más de dos mil líneas y un archivo de proyecto
de casi diez mil [Ref. 41](../REFERENCIAS.md#ref-41): ninguno de los dos habría pasado un límite de
tamaño escrito. El trinquete estático, que impide que un número de calidad empeore
[Ref. 35](../REFERENCIAS.md#ref-35), es la forma que le doy a este peldaño.

Lo que se mide por máquina, en orden de importancia: que el código respete un estilo único (el
*linter* y el *formateador*); que ninguna función ni ningún archivo pase de un tamaño; que la
*complejidad* de cada función quede bajo un límite; que no haya código duplicado ni código
muerto; que las dependencias estén declaradas y usadas; que la *cobertura* de los tests no baje
nunca (el trinquete); y, si el lenguaje lo permite, que los tipos cierren. Nada de esto reemplaza
el test en rojo: un código impecable puede estar equivocado. Lo que evita es el código correcto
que nadie puede volver a tocar.

Y la pieza que dejo de tratar como refuerzo opcional en cualquier proyecto con usuarios: las
**pruebas de mutación**. Las dejé como "opcional, recomendado" en una versión anterior de este
documento, y una evaluación externa del método me hizo notar la contradicción: si la Parte F dice
que la mutación es, hasta donde sé, la única medida que distinguió en los estudios de 2026 los
tests que vigilan de los que decoran, no tiene sentido dejarla afuera de "completo" justo en los
proyectos donde un test decorativo más le hace daño a alguien. Una herramienta planta errores a
propósito en el código (cambia un "mayor" por "mayor
o igual", borra una línea, invierte una condición) y corre los tests; cada error que los tests no
atrapan es un *mutante que sobrevive*, y la proporción de atrapados es el puntaje. Es la medida
que complementa al rojo demostrado del peldaño 8: el rojo prueba que un test vigila el cambio de
hoy; la mutación mide cuánto vigila la batería entera. Y es, hasta donde sé, la única que en los
estudios de 2026 distinguió los tests que prueban de los que decoran (Parte F del documento
principal).

**Si sos principiante.** Un *linter* es un programa que lee el código y marca lo que está mal
escrito o es peligroso (una variable que no se usa, una comparación que siempre da lo mismo), como
el corrector ortográfico de un procesador de texto. Un *formateador* lo acomoda con un estilo
único (sangrías, espacios) para que todo el código parezca escrito por la misma mano. La
*complejidad* de una función es cuántos caminos distintos puede tomar (cada "si" la aumenta);
una función con cuarenta caminos no la entiende nadie. *Código duplicado* es el mismo bloque
copiado en dos lugares: el día que se arregla uno, el otro queda mal. La *cobertura* es qué
porcentaje del código es ejecutado por algún test. Y un *trinquete* es un mecanismo que solo
deja mejorar: el número de hoy es el piso de mañana. Las *pruebas de mutación* son un programa
que rompe el código a propósito, de a un cambio chico por vez, y mira si algún test se da cuenta;
si ninguno se da cuenta, ese pedazo de código no está vigilado.

## 1. Contexto requerido

Lo que sigue es la lista genérica. Los archivos concretos que tenés que tener hechos antes de cada
prompt, con su contenido y su estado mínimo, están en la sección 2, en el bloque "Antes de enviar
el prompt" que precede a cada uno.

- La integración continua corriendo en cada push (peldaño 4).
- El primer bloque funcional abierto, con al menos un pendiente construido: sin código no hay
  calidad que medir.
- Tu decisión sobre los límites, o la disposición a aceptar los que el agente proponga, con razón.
- La auditoría anterior (13, o N3 en un legado), si hubo.

## 2. Prompts

**Inicial (montar la compuerta):**

**Antes de enviar el prompt**, esto tiene que existir, y lo hacés vos (o el negocio con vos), no
el agente:

- La integración continua corriendo en cada push (peldaño 4), y cuánta cuota te queda: las
  verificaciones de calidad agregan minutos.
- Al menos un pendiente del primer bloque construido y cerrado con el peldaño 8, para que haya
  código real que medir y no el esqueleto vacío.
- Tu decisión sobre dos límites, escrita en una línea: el tamaño máximo de un archivo y de una
  función (para empezar, trescientas líneas y cuarenta), y si la cobertura solo puede subir. Lo
  demás lo propone el agente y lo aprobás.
- En un legado: `docs/AUDIT_[fecha].md` (N3), para que el agente no reporte lo conocido y la
  primera corrida sea la línea base.
- Estado mínimo aceptable: la cadena corre, hay código de un pendiente cerrado, y escribiste los
  dos límites.

> We are going to make the code quality verified by machine, because nobody is going to read the
> code. Set up, in continuous integration, on every push: (1) a linter and a formatter with one
> configuration for the whole repository, failing the build on any violation; (2) limits on the
> size of every file and every function ([file lines] and [function lines]) and on the complexity
> of every function, failing the build when exceeded; (3) detection of duplicated code and of dead
> code (unused functions, variables, imports, dependencies); (4) a test coverage report with a
> ratchet: the measured coverage of today becomes the floor, and the build fails if it drops; (5)
> type checking if the language allows it. Run all of it now on the current code and write
> `docs/CODE_QUALITY.md` with: the tools, the configuration, every limit with its current measured
> value, and the list of what fails today with where it is. Do not fix anything yet: what fails
> today becomes pending items, and I decide which limits apply now and which are raised with a
> date. Make the whole set a gate in `docs/GATES.md`: nothing is merged with quality red. Reply in
> my language.

> [es]
> Vamos a hacer que la calidad del código se verifique por máquina, porque nadie va a leer el
> código. Armá, en la integración continua, en cada push: (1) un linter y un formateador con una
> sola configuración para todo el repositorio, que hagan fallar la construcción ante cualquier
> violación; (2) límites al tamaño de cada archivo y de cada función ([líneas por archivo] y
> [líneas por función]) y a la complejidad de cada función, que hagan fallar la construcción al
> superarse; (3) detección de código duplicado y de código muerto (funciones, variables,
> importaciones y dependencias sin uso); (4) un reporte de cobertura de tests con trinquete: la
> cobertura medida hoy pasa a ser el piso, y la construcción falla si baja; (5) verificación de
> tipos si el lenguaje lo permite. Corré todo ahora sobre el código actual y escribí
> `docs/CODE_QUALITY.md` con: las herramientas, la configuración, cada límite con su valor medido
> actual, y la lista de lo que hoy falla con dónde está. No arregles nada todavía: lo que hoy falla
> se convierte en pendientes, y yo decido qué límites aplican ya y cuáles se suben con fecha. Hacé
> del conjunto una compuerta en `docs/GATES.md`: nada se fusiona con la calidad en rojo. Respondé
> en mi idioma.

Qué le estoy pidiendo: las cinco verificaciones que un revisor humano haría, hechas por máquina y
con la construcción en rojo como consecuencia, porque una verificación que no bloquea es un
consejo; los límites con su valor medido, para que el límite salga del número y no de una
opinión; el trinquete de cobertura, que es la pieza que hace que la calidad no se degrade sola;
y **no arreglar nada todavía**, porque en un sistema con código ya escrito la primera corrida
siempre da rojo y la decisión de qué se arregla ahora y qué se tolera con fecha es mía.

**Rutina (va en el contrato de convivencia):**

**Antes de enviar el prompt**, tenés que tener esto a mano:

- `docs/CODE_QUALITY.md` leído por vos: ¿entendés cada límite y por qué está?
- Tu decisión sobre la lista de lo que hoy falla: qué se arregla ahora (un pendiente cada uno) y
  qué se tolera con fecha, escrita en el mismo archivo.
- `docs/WORKING_AGREEMENT.md`, donde va la rutina.
- Estado mínimo aceptable: la compuerta está en verde o cada rojo tiene pendiente o fecha.

> Every pending item is closed with the quality gate green: linter, formatter, size and
> complexity limits, no new duplication, no dead code, coverage at or above the ratchet. A quality
> failure is fixed in the same commit, never silenced with an exception, and a limit is never
> raised to pass; if a limit must change, say so with the reason and I decide. At the close of
> every block, show me `docs/CODE_QUALITY.md` with the numbers of the block against the previous
> one.

> [es]
> Todo pendiente se cierra con la compuerta de calidad en verde: linter, formateador, límites de
> tamaño y complejidad, sin duplicación nueva, sin código muerto, cobertura igual o mayor que el
> trinquete. Un fallo de calidad se arregla en el mismo commit, nunca se silencia con una
> excepción, y un límite nunca se sube para pasar; si un límite tiene que cambiar, decilo con la
> razón y decido yo. Al cierre de cada bloque, mostrame `docs/CODE_QUALITY.md` con los números del
> bloque contra el anterior.

Qué le estoy pidiendo: que la calidad sea parte del cierre de cada pendiente y no una tarea
aparte; la prohibición de silenciar (un modelo frente a un linter en rojo tiende a agregar la
excepción en vez de arreglar, porque es más rápido) y de subir el límite; y la lectura por bloque,
que es el único momento en que vos mirás los números.

**Obligatorio en cualquier proyecto con usuarios (opcional solo sin usuarios reales): pruebas de
mutación.**

**Antes de enviar el prompt**, tenés que tener esto a mano:

- La compuerta de calidad montada y en verde, con la cobertura medida en `docs/CODE_QUALITY.md`.
- Al menos un bloque funcional cerrado con el peldaño 8, para que haya tests que mutar.
- Tu decisión sobre el alcance, escrita en una línea: todo el código (caro, y solo tiene sentido
  una vez, como línea base) o solo las líneas cambiadas por cada pendiente (lo normal).
- Estado mínimo aceptable: hay cobertura medida y hay un bloque cerrado.

> Add mutation testing to the quality gate, [on the whole codebase | only on the lines changed by
> each pending item]: a tool that plants small deliberate bugs in the code (a flipped condition, a
> deleted line, a changed operator) and runs the tests. Run it now and write in
> `docs/CODE_QUALITY.md`: the tool, the scope, the number of mutants planted, how many the tests
> killed, how many survived and where. Do not fix anything yet: every surviving mutant in code
> that matters becomes a pending item for a test that catches it, and I decide which ones matter.
> From now on, report the mutation score at the close of every block next to the coverage, and
> treat a drop as a quality failure. Reply in my language.

> [es]
> Agregá pruebas de mutación a la compuerta de calidad, [en todo el código | solo en las líneas
> cambiadas por cada pendiente]: una herramienta que planta errores chicos a propósito en el
> código (una condición invertida, una línea borrada, un operador cambiado) y corre los tests.
> Corrélo ahora y escribí en `docs/CODE_QUALITY.md`: la herramienta, el alcance, la cantidad de
> mutantes plantados, cuántos mataron los tests, cuántos sobrevivieron y dónde. No arregles nada
> todavía: cada mutante que sobrevive en código que importa se convierte en un pendiente para un
> test que lo atrape, y yo decido cuáles importan. De acá en adelante, reportá el puntaje de
> mutación al cierre de cada bloque junto a la cobertura, y tratá una baja como un fallo de
> calidad. Respondé en mi idioma.

Qué le estoy pidiendo: la medida que la cobertura no da (la cobertura dice qué código se ejecutó;
la mutación dice qué código está vigilado); el alcance acotado a las líneas cambiadas, que es lo
que hace que el costo se pueda pagar en cada pendiente; **no arreglar nada todavía**, porque
decidir qué mutante importa es mío; y el puntaje al cierre de cada bloque, junto a la cobertura,
con una baja tratada como rojo.

## 3. Resultado esperado

- El linter, el formateador, los límites, la detección de duplicación y código muerto, la
  cobertura con trinquete y los tipos, corriendo en cada push y en rojo cuando corresponde.
- `docs/CODE_QUALITY.md` con herramientas, configuración, límites con valor medido, y la lista de
  lo que falla con su pendiente o su fecha.
- La compuerta en `docs/GATES.md` y la rutina en el contrato.
- En cualquier proyecto con usuarios: el puntaje de mutación en `docs/CODE_QUALITY.md`, por
  bloque, junto a la cobertura, y un pendiente por cada mutante que sobrevive en código que
  importa.

## 4. Verificación de completitud (la hacés vos, sin leer código)

- Pedile el enlace a la última corrida de la cadena: ¿la calidad está en verde?
- Pedile que meta a propósito, en una rama, una función de cien líneas y una variable sin usar:
  ¿la cadena se pone en rojo por las dos cosas?
- ¿La cobertura de hoy es mayor o igual que la del cierre del bloque anterior? Pedí los dos
  números.
- ¿Hay alguna excepción al linter en el código? Pedile la lista; cada una tiene que tener razón
  escrita.
- ¿Subió algún límite desde la primera corrida? ¿Con qué razón y quién lo decidió?
- Si el proyecto tiene usuarios reales: ¿están corriendo las pruebas de mutación? Si no, ¿qué razón
  escrita justifica no tenerlas?
- Si hay pruebas de mutación: ¿cuántos mutantes sobrevivieron en el último bloque, y cada uno
  tiene pendiente o razón escrita?

## 5. Señales de alarma

- La calidad pasó en verde a la primera sobre código ya escrito. Casi nunca es verdad: los límites
  están demasiado flojos.
- El agente propone "desactivar esta regla porque es muy estricta". A veces tiene razón; siempre
  tiene que pasar por vos con la razón escrita.
- La cobertura sube porque se agregaron tests que no prueban nada (el verde que esconde un bug,
  peldaño 8). El trinquete mide cantidad; el rojo demostrado mide calidad. Van juntos.
- Un archivo creció hasta el límite y se partió en dos archivos con el mismo contenido. Es la
  duplicación disfrazada de cumplimiento.
- La cobertura es alta y el puntaje de mutación es bajo. Son tests que ejecutan el código sin
  verificar nada: el caso exacto que el rojo demostrado del peldaño 8 intenta evitar.
- El proyecto tiene usuarios reales y nadie corrió las pruebas de mutación ni escribió por qué no.
  "Es opcional" dejó de ser una razón válida para un proyecto con usuarios.
