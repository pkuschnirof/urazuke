# Las veinticinco preguntas para el proveedor

Esta hoja es para un momento muy concreto: alguien te está ofreciendo construirte un sistema, o te
lo está entregando, y vos no programás. No tenés que aprender a programar para esta reunión. Tenés
que saber **qué pedir que te muestren**.

El método completo vive en los contratos de los veinticuatro peldaños, y cada contrato trae su
"verificación de completitud sin leer código": la lista de comprobaciones que hace el dueño sobre lo
que se entregó. Eso sirve mientras el proyecto está en marcha, pero está repartido en treinta y dos
archivos y nadie entra con eso a una reunión. Esta hoja es lo mismo, juntado y ordenado por **lo que
te están prometiendo**. Se imprime y se lleva.

## La única regla que tenés que recordar

**Las respuestas que valen son las que se pueden ver.** Un archivo, un número con el comando que lo
produce, una prueba que se vio fallar, un manual, una firma con fecha. Las que no se pueden ver son
promesas, y una promesa no es una respuesta: es una intención, dicha por alguien que quiere cerrar
la reunión.

No hace falta que entiendas lo que te muestran. Alcanza con que **exista** y con que la persona lo
abra adelante tuyo. Si para contestarte tiene que explicarte por qué todavía no, tomá nota de la
fecha y volvé a preguntar en la reunión siguiente: lo que se repite dos veces sin mostrarse no va a
aparecer.

Tres frases que conviene reconocer, porque significan "no tengo eso":

- "Confiá en mí, eso siempre lo hacemos así."
- "Eso se ve al final, cuando esté todo listo."
- "Está en mi cabeza / lo tengo en el repositorio, después te lo mando."

Y una aclaración honesta en la otra dirección: **un "no" dicho con su razón es una buena respuesta**.
"No tenemos pruebas de carga porque son treinta usuarios y lo acordamos así" es un no con razón, y
es exactamente lo que el método llama proporcionalidad. Lo que no sirve es el "sí" que no se puede
ver.

## Si sólo tenés diez minutos

Si la reunión es corta, estas cinco traen más información que las veinticinco: la **4** (una prueba
vista en rojo), la **7** (el plan son los pendientes), la **13** (el límite que frena la
construcción), la **20** (el manual de recuperación, probado por una persona) y la **24** (el reporte
que dice lo que no se pudo verificar). Si esas cinco se pueden ver, lo demás casi siempre está. Si
ninguna se puede ver, lo demás casi nunca está.

---

## Lo que te prometen: "te lo entrego funcionando"

**1. ¿Me puede mostrar el sistema andando en un entorno que no es su computadora?**
Lo que se puede ver: una dirección que abrís vos, en tu teléfono, con datos de prueba. Si sólo
funciona en la máquina del que lo construyó, todavía no existe como sistema.
*(Peldaño 15.)*

**2. ¿Qué tiene que ser verdad para que usted considere terminado un pedido mío?**
Lo que se puede ver: escrito, antes de empezar, por cada pedido. Debería incluir "la prueba pasó" y
"una persona lo usó". Si la respuesta es "cuando funcione", no hay criterio: hay opinión.
*(Peldaño 5, criterios de aceptación.)*

**3. ¿Hay una prueba automática de cada cosa que me importa?**
Lo que se puede ver: una corrida de la batería de pruebas, con números, en pantalla. No te importa
el contenido: te importa que haya salida y que diga cuántas pasaron.
*(Peldaño 8.)*

**4. ¿Me puede mostrar una de esas pruebas **fallando**?**
Lo que se puede ver: el pedazo de pantalla donde la prueba se puso en rojo contra el sistema sin el
arreglo, con el comando que la corrió y la fecha. Es la pregunta más importante de la hoja: una
prueba que nadie vio fallar no se sabe si prueba algo. Un sistema puede tener mil pruebas que pasan
y no vigilar nada.
*(Peldaño 8. En el método se llama "probado en rojo".)*

**5. ¿Quién, que no sea usted ni un programa, usó el sistema y llegó hasta el final?**
Lo que se puede ver: una lista de casos de prueba escritos para una persona, con fecha, con el
nombre de quien los ejecutó y qué pasó. El que construyó no puede ser el único que probó, y el
modelo prueba lo que entendió, que no siempre es lo que pediste.
*(Peldaño 10.)*

**6. Si yo hago algo mal en la pantalla —cargo dos veces, aprieto el botón apurado—, ¿qué pasa?**
Lo que se puede ver: la lista de las acciones que no se pueden deshacer, cada una con su candado y
qué pasa si falla a mitad de camino. La respuesta correcta nunca es "no debería pasar".
*(Peldaño 14.)*

## Lo que te prometen: "sé lo que falta y en qué orden"

**7. ¿Dónde está la lista de lo que falta, y puedo verla hoy?**
Lo que se puede ver: un registro de pendientes numerados, con cada uno escrito en detalle y con la
fecha en que se cerró. **Esa lista es el plan**: si hay un plan en otro lado y una lista por acá, hay
dos planes, y el que vale es el que nadie está mirando.
*(Peldaño 5.)*

**8. ¿Cada cosa que me va a construir está escrita antes de construirla, con mis palabras?**
Lo que se puede ver: el pendiente abierto, con la historia de dónde salió el pedido dicha como lo
dijiste vos, las reglas que aplican, las pantallas y los casos raros. Si está en una línea, lo que
falta lo va a inventar alguien.
*(Peldaño 5.)*

**9. Cuando algo del negocio no está claro, ¿qué hace usted?**
Lo que se puede ver: el archivo de decisiones, con fecha y con quién decidió cada una. La respuesta
que buscás es "te pregunto y lo anoto". Un modelo que encuentra un hueco en las reglas lo llena solo
y sigue, y seis semanas después nadie sabe por qué el sistema hace eso.
*(Peldaños 1 y 6.)*

**10. ¿Está escrito qué cosas el sistema **no** va a hacer?**
Lo que se puede ver: una sección propia, con al menos dos ítems, en el documento del proyecto. Lo
que no está dicho es exactamente lo que va a aparecer construido de otra manera.
*(Peldaño 2.)*

**11. ¿Quiénes son los distintos tipos de persona que van a usar esto, y está escrito qué puede
hacer cada uno?**
Lo que se puede ver: la lista de perfiles —quién es cada uno y qué viene a hacer— y una tabla que
dice qué puede hacer cada perfil. Si hay un solo perfil llamado "usuario", casi siempre falta la
mitad: es la causa más común de que alguien vea un botón que no le corresponde, o de que alguien que
sí tiene el permiso no encuentre la pantalla.
*(Peldaño 2, entradas previas del Anexo H; peldaño 8, la matriz.)*

## Lo que te prometen: "está bien hecho"

**12. ¿Qué mide una máquina en cada cambio, sin que nadie se acuerde de mirarlo?**
Lo que se puede ver: la configuración de la cadena de verificación en el repositorio y el registro
de la última corrida. "Lo revisamos entre nosotros" no es una respuesta: es una costumbre, y las
costumbres se caen la semana que hay apuro.
*(Peldaños 4 y 9.)*

**13. ¿Hay un límite que, si se pasa, **frena** la construcción?**
Lo que se puede ver: un archivo con los límites y su valor medido de hoy, y una corrida frenada por
uno de ellos. La pregunta de control, que conviene hacer tal cual: *¿alguna vez subieron un límite
para poder seguir?* Si la respuesta es sí y no está escrito por qué, el límite es decorativo.
*(Peldaño 9.)*

**14. ¿Cómo sabe que el código lo va a poder mantener otra persona?**
Lo que se puede ver: el reporte por regla, no un número único: tamaño de archivo, tamaño de función,
código repetido, código muerto. Un "noventa y cinco por ciento de calidad" no dice qué arreglar.
*(Peldaño 9 y Anexo H.)*

**15. ¿Las pantallas las pensó alguien, o salieron de lo que el programa necesitaba?**
Lo que se puede ver: el registro de las reglas de usabilidad con su resultado, y las excepciones
apagadas con el motivo escrito, quién lo autorizó y cuándo se revisa. Un sistema puede pasar todas
las verificaciones técnicas y ser inusable: todo verde, y la persona no encuentra dónde cobrar.
*(Anexo H, las veintisiete reglas de usabilidad.)*

**16. Las pruebas que me mostró, ¿vigilan de verdad o decoran?**
Lo que se puede ver: el puntaje de mutación. Es un programa que mete errores a propósito y cuenta
cuántos atrapan las pruebas; el número sale con su comando. Si tu sistema tiene usuarios reales,
esto no es opcional en el método.
*(Peldaño 9.)*

## Lo que te prometen: "no te va a hacer daño"

**17. ¿Qué pasa con mis datos si algo se rompe a mitad de una operación?**
Lo que se puede ver: la tabla de acciones con su reversibilidad, y la regla escrita de que ante la
duda el sistema **se frena** en vez de seguir. Un cobro duplicado o una aprobación automática que
nadie miró son el caso típico.
*(Peldaño 14.)*

**18. ¿Hay copias de respaldo, y alguna vez probaron restaurar una?**
Lo que se puede ver: la fecha de la última restauración **probada**. Una copia que nunca se restauró
no es una copia de respaldo: es un archivo del que nadie sabe nada.
*(Peldaño 20, manual de recuperación.)*

**19. ¿Quién revisa que el sistema no tenga agujeros conocidos, y cada cuánto?**
Lo que se puede ver: el escaneo corriendo en la cadena, con fecha, y los hallazgos convertidos en
pendientes. Más una pregunta corta y muy reveladora: *¿dónde están guardadas las claves y las
contraseñas del sistema?* Si están en el código, ya tenés un problema.
*(Peldaños 18 y 15.)*

**20. ¿Alguien que no programa recuperó el sistema desde cero siguiendo un manual?**
Lo que se puede ver: el manual, y el registro de esa prueba con tres cosas: cuánto tardó de punta a
punta, en qué paso exacto se trabó la persona, y qué palabras no entendió. Si el manual arranca con
"abrí una sesión con el agente", no es un manual para una persona. Y mientras eso no exista, dicho
sin vueltas: **el dueño no es dueño, es inquilino**. Tiene el sistema, lo paga, y no puede entrar sin
pedirle permiso a quien lo construyó.
*(Peldaño 20.)*

## Lo que te prometen: "va a aguantar"

**21. ¿Con qué números dimensionaron esto, y de dónde salieron?**
Lo que se puede ver: cuántos usuarios a la vez, cuántas operaciones por día, cuánto crece por año,
cuánto tiene que durar guardado. Y la parte que importa: esos números los tiene **tu negocio**, no el
que construye. Si los inventó él, están mal.
*(Peldaño 3.)*

**22. ¿Lo probaron con la carga que yo le voy a dar, y con diez veces más?**
Lo que se puede ver: el reporte de la corrida, con el punto exacto donde el sistema se cayó. Saber
dónde se rompe es la única forma de saber cuánto margen tenés.
*(Peldaño 19.)*

**23. Cuando el sistema esté lento en seis meses, ¿cómo van a saber por qué?**
Lo que se puede ver: los registros con identificador por acción, el reporte de las consultas más
lentas, y las alertas configuradas. Si la respuesta es "lo vemos cuando pase", lo vas a ver vos
primero, por un usuario enojado.
*(Peldaños 16, 17, 21 y 22.)*

## Lo que te prometen: "te voy a decir la verdad"

**24. Cuando me informa que algo está listo, ¿cómo distingo lo que probó de lo que supone?**
Lo que se puede ver: el reporte en tres bloques: **verificado** (con la prueba al lado),
**creído** (y por qué no se probó) y **puntos ciegos** (lo que no se puede ver desde donde está).
"Listo" a secas no es un reporte. Y la segunda parte de la pregunta vale más que la primera: *¿qué
cosas de este entregable **no** pudo verificar?* Si la respuesta es "ninguna, todo verificado",
desconfiá: nadie verifica todo.
*(Peldaño 12.)*

**25. ¿Quién revisa el trabajo, además de usted mismo?**
Lo que se puede ver: una auditoría hecha por alguien —o algo— distinto del que construyó, con sus
hallazgos convertidos en pendientes y con fecha. Un modelo avala una parte considerable de sus
propios errores, y una persona también. El que construye no puede ser el único que verifica.
*(Peldaño 13.)*

---

## Qué hacer con las respuestas

Anotá, al lado de cada pregunta, una de tres cosas: **lo vi**, **no lo vi todavía** (con la fecha en
que te lo prometieron) o **no existe y me dijo por qué** (con la razón). No hace falta que las
veinticinco den "lo vi": un proyecto chico no necesita pruebas de carga ni monitoreo semanal, y el
método lo dice. Lo que sí tiene que pasar es que **cada "no" tenga su razón escrita**, porque un no
con razón es una decisión tuya y un no sin razón es una deuda que vas a pagar sin haberla elegido.

Y una última, que no está numerada porque no es para el proveedor: si alguien se incomoda porque le
pedís ver las cosas, eso también es información.

---

## De dónde sale esta hoja

Las veinticinco preguntas son la "verificación de completitud sin leer código" de los contratos de
este método, juntada: cada una cita el peldaño del que sale, así que cualquiera puede ir al contrato
y leer la versión completa. Están escritas de cero para esta hoja.

**La idea de que esto tenía que existir como una hoja no es mía.** Vino de la primera adaptación del
método a otro formato —la novela de Oscar Schmitz "El Arte de Forjar Sistemas", 2026, acreditada en
la Parte F del documento principal—, que lo dijo mejor que yo: el método tiene la verificación
repartida en sus contratos y le faltaba la pieza que un dueño se lleva a una reunión. El criterio del
frente de esta hoja —que las respuestas que valen son las que se pueden ver— es también de ahí. Su
versión de las preguntas es su obra y tiene sus derechos reservados; estas son otras, escritas desde
mis contratos, y por eso se publican con la licencia de este repositorio.
