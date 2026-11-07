# Anexo H — Heurísticas de calidad de código y de usabilidad

**Estado: APROBADO Y EN PRODUCCIÓN.** No queda ninguna decisión abierta: la forma (D-043 y D-044), los interruptores (D-045 y D-046), el tablero (D-047) y las severidades iniciales con el peso de la accesibilidad (D-048, sección 10) están decididos. El documento está publicado en los ocho idiomas del método y sus dos prompts forman parte de la API de prompts: desde ahí, `build/prompts.mjs` exige el texto inglés idéntico byte a byte en los ocho o la construcción falla. Fecha: 2026-10-22.

Registro de las decisiones de este anexo: `docs/DECISIONES.md`, D-043 a D-048. El tablero de cumplimiento (sección 12) quedó decidido con dos cifras en D-047. El trabajo de implementación vive en PND-002.

## 1. Qué falta hoy, y por qué

El peldaño 9 ya mide el código y lo hace con una compuerta que no deja pasar: un formateador único, límites de tamaño (trescientas líneas por archivo, cuarenta por función), complejidad por función, código duplicado, código muerto, dependencias declaradas y usadas, cobertura con trinquete y pruebas de mutación donde hay usuarios reales. El número queda escrito en `docs/CODE_QUALITY.md`. Eso está resuelto.

Lo que no está resuelto es la otra mitad del producto. Verifiqué el corpus de peldaños: no hay una sola mención a usabilidad, a personas/perfiles ni a agrupación funcional. La interfaz se sostiene hoy en dos cosas: la captura que el dueño mira diez segundos y los casos de prueba manual. Las dos son buenas y las dos son humanas, caras y olvidadizas. Un sistema puede pasar la compuerta de calidad con honores y ser inusable: todo verde, y la persona no encuentra dónde cobrar.

Y hay un problema de segunda capa que sí es técnico pero se nota en la interfaz: cuando el mismo producto lo usan varios perfiles (administración, operación, consulta, cliente), las funcionalidades se habilitan en tres lugares distintos —la base, el menú y el guard de la ruta— que se escriben en momentos distintos y se desincronizan solos. El síntoma es siempre el mismo: alguien ve un botón que no le corresponde, o peor, alguien que sí tiene el permiso no encuentra la pantalla.

Las dos heurísticas que siguen atacan esas dos cosas con la misma forma: un catálogo corto de enunciados verificables, unos pocos instrumentos que los miden solos, y una vía de excepción declarada para cuando el proyecto necesita salirse.

## 2. El modelo: tres capas, una sola forma de regla

La tentación es hacer una lista de reglas y atarla al stack del primer proyecto. Eso envejece mal: la regla de React no aplica en Angular, la de Angular no aplica en un servidor con plantillas, y en dos años media lista queda muerta. La propuesta separa tres capas.

**Capa 1 — Núcleo agnóstico (no se negocia).** Enunciados sobre resultados, no sobre herramientas. "Hay un solo formateador y nadie discute con él" aplica igual en TypeScript, PHP o Go. El núcleo se enumera con identificadores estables y no cambia de proyecto en proyecto.

**Capa 2 — Adaptador por stack (configurable).** Para cada regla del núcleo, cada familia de frontend declara *con qué* se mide y *con qué umbral*. Un proyecto React con Vite, uno Next, uno Angular, uno de servidor con plantillas, uno mobile y uno de línea de comandos son seis adaptadores distintos del mismo núcleo. Acá vive todo lo que el usuario pidió como "configurable por frontend".

**Capa 3 — Decisiones del proyecto (declaradas).** Los umbrales concretos y las exenciones. No se inventan: se piden al dueño y quedan escritas, igual que el dimensionamiento del peldaño de arquitectura. Si un umbral no está declarado, corre el del adaptador y queda registrado como tal.

Cada regla se escribe siempre con la misma ficha de seis campos:

| Campo | Qué contiene |
|---|---|
| `id` | Identificador estable (`CQ-07`, `UX-12`). No se reutiliza nunca. |
| Enunciado | Una sola oración, en imperativo, sobre un resultado observable. |
| Por qué | El daño concreto que evita. Si no hay daño, la regla sobra. |
| Cómo se verifica | El instrumento: compuerta automática, consulta a la matriz, prueba de extremo a extremo o caso manual. |
| Severidad | `BLOQUEA` (la compuerta da rojo y no se cierra el bloque), `AVISA` (abre un pendiente), `REGISTRA` (solo queda en el documento). |
| Aplica a | Perfiles donde rige. Fuera de ellos no corre, y eso no es una excepción: es alcance. |

**La excepción se declara, nunca se omite.** Una regla se apaga con un registro de cuatro campos: identificador, motivo en una línea, quién lo autoriza (el dueño, no el agente) y fecha de revisión. Una regla apagada sin registro es un fallo de la compuerta, no una decisión. Es el mismo criterio que el método ya usa para no aceptar un límite subido "para pasar".

**Una regla puede tener caras, y se apaga una sola (D-078).** Una cara es un corte del mismo enunciado con identificador propio —`CQ-19.1`, `CQ-19.2`—, append-only como el de las reglas y nunca reciclado. Existen por una razón mecánica y no de redacción: sin identificador no se puede apagar una sola, y una regla que sólo se puede apagar entera empuja a apagar de más. El registro de apagado es el mismo de arriba, con el identificador de una cara en el lugar del de una regla, y un registro cuyo identificador no resuelve ni a una regla ni a una cara es un apagado colgante, que es rojo. Tres cosas de esto no se negocian. Una regla con cualquier cara apagada **no se informa como cumplida**: el reporte dice "CQ-19: tres de cuatro caras, una apagada con su motivo" y nunca un porcentaje solo, que es el criterio del apagado observable aplicado adentro de una regla. La cuenta de caras **se deriva** del dato y no se escribe, como cualquier cifra que vive al lado del nombre de una colección. Y el tablero de la sección 12 cuenta caras y no reglas para una regla que las tiene, o el porcentaje miente. Hoy `CQ-18` tiene cinco comprobaciones sin identificador, así que es la única regla con caras no direccionables: darles identificador es agregar y no renombrar, y es trabajo aparte.

## 3. Los cuatro instrumentos

Ninguna heurística sirve si su verificación es una opinión. Son cuatro, y cada regla declara a cuál pertenece.

1. **Compuerta automática.** Corre en cada push y en el cierre de bloque. Devuelve verde o rojo. Es barata, es repetible y no discute. Mide todo lo que se puede contar.
2. **Consulta a la matriz.** La matriz de funcionalidades por perfil (ver B2) es un artefacto declarativo; el menú, el ruteo y los permisos se derivan de ella. Comprobar la matriz es comprobar la interfaz. Es la pieza que convierte una parte de la usabilidad en algo verificable por máquina.
3. **Prueba de extremo a extremo por perfil.** Para cada perfil declarado, un guion que entra como ese perfil y compara el conjunto de funcionalidades alcanzables contra la fila de la matriz: *ni de menos ni de más*. Es la prueba que atrapa las dos desincronizaciones típicas (el botón que sobra y la pantalla que falta).
4. **Caso manual.** Lo que ninguna máquina juzga: si la agrupación se entiende, si la tarea se completa sin ayuda, si el texto está en el idioma del usuario. Se ejecuta con personas y se registra, como ya manda el peldaño 10.

## 4. Parte A — Calidad de código

El núcleo extiende el peldaño 9: no lo reemplaza ni lo contradice, le pone nombre, severidad y adaptador a cada cosa que ya se mide, y agrega lo que hoy falta, que es la interfaz vista como código.

| id | Familia | Enunciado | Verifica | Severidad |
|---|---|---|---|---|
| CQ-01 | Forma | Hay un solo formateador, corre sin intervención y no admite discusión. | Compuerta | BLOQUEA |
| CQ-02 | Forma | Hay un solo linter por repositorio y sus reglas son las mismas para todo el mundo; se apaga una regla con motivo escrito, nunca en un archivo suelto. | Compuerta | BLOQUEA |
| CQ-03 | Tamaño | Ningún archivo supera el límite declarado (arranca en 300 líneas) y ninguna función el suyo (arranca en 40). | Compuerta | BLOQUEA |
| CQ-04 | Complejidad | Ninguna función supera el límite de caminos declarado. | Compuerta | BLOQUEA |
| CQ-05 | Duplicación | No entra duplicación nueva: el bloque copiado se extrae o se justifica. | Compuerta | BLOQUEA |
| CQ-06 | Muertos | No hay código muerto: funciones, variables, importaciones, ramas y dependencias sin uso. | Compuerta | BLOQUEA |
| CQ-07 | Tipos | Si el lenguaje permite tipos, el proyecto los usa en serio; el tipo "cualquiera" es una excepción declarada, no un hábito. | Compuerta | AVISA |
| CQ-08 | Pruebas | La cobertura no baja: el número de hoy es el piso de mañana. | Compuerta | BLOQUEA |
| CQ-09 | Pruebas | Con usuarios reales, el puntaje de mutación se mide por bloque y cada mutante que sobrevive en código nuevo abre un pendiente. | Compuerta + registro | BLOQUEA |
| CQ-10 | Dependencias | Toda dependencia está declarada, se usa y no trae un árbol de terceros desproporcionado a lo que aporta. | Compuerta | AVISA |
| CQ-11 | Secretos | No hay credenciales, claves ni cadenas de conexión en el repositorio, ni en el historial nuevo. | Compuerta | BLOQUEA |
| CQ-12 | Interfaz | La interfaz no decide: ninguna pantalla ni componente contiene reglas de negocio (qué se puede, cuánto sale, qué estado sigue). Vive en el dominio y la vista lo consulta. | Revisión al cierre + caso manual | BLOQUEA |
| CQ-13 | Interfaz | Cada llamada al servidor pasa por un cliente único y tipado; ninguna pantalla arma su propia petición a mano. | Compuerta (búsqueda) | BLOQUEA |
| CQ-14 | Interfaz | Hay un solo lugar donde vive el estado compartido; la duplicación de estado entre pantallas es un fallo, no un atajo. | Revisión al cierre | BLOQUEA |
| CQ-15 | Interfaz | Todo texto visible sale de un catálogo de traducciones; ninguna cadena de usuario queda escrita dentro del componente. | Compuerta (búsqueda) | BLOQUEA |
| CQ-16 | Interfaz | Todo elemento interactivo lleva identificador estable y rol, para que la prueba automática lo encuentre por nombre y no por posición. | Compuerta (búsqueda) | BLOQUEA |
| CQ-17 | Interfaz | Todos los colores, espaciados y tipografías salen de tokens; ningún valor mágico suelto en la hoja de estilos. | Compuerta (búsqueda) | BLOQUEA |
| CQ-18 | Interfaz | La accesibilidad básica se verifica sola: contraste, etiquetas en los campos, foco visible, navegación por teclado en los flujos principales, imágenes con texto alternativo. | Compuerta | AVISA |
| CQ-19 | Recibo | Todo instrumento con el que el proyecto decide declara las condiciones en que su número vale: qué conjunto esperaba recorrer y cuánto recorrió, de qué depende, y qué informa cuando no pudo mirar. Un instrumento cuyo silencio se lee igual que la salud no mide: tranquiliza. | Compuerta + caso manual | BLOQUEA |
| CQ-20 | Privilegio | Una verificación corre con el privilegio mínimo para verificar y con ninguno más, y que no pudo hacer daño se mide, no se promete. | Compuerta + caso manual | BLOQUEA |
| CQ-21 | Alcance | Toda verificación declara hasta dónde llegó su corrida, y lo que quedó más allá de ese punto se cuenta como no verificado y nunca como sano: un doble que ninguna corrida atraviesa, un artefacto que nadie corrió y un paso que ninguna ejecución alcanzó no dicen que lo de adelante ande, dicen que nadie lo miró. | Compuerta + caso manual | BLOQUEA |
| CQ-22 | Contraste | Un número que el proyecto mide contra un requisito que el proyecto declaró se contrasta, y el resultado del contraste es el veredicto: una medición que existe y que nadie comparó con su umbral no verificó nada. Que la medición exista es el principio de la verificación y no su final. | Compuerta + caso manual | BLOQUEA |
| CQ-23 | Procedencia | Un veredicto vale por dónde corrió, cuándo corrió y dónde quedó escrito: sobre el árbol que queda, después del último cambio que afecta lo que mide, sobre artefactos de este trabajo, y con su salida en un lugar que sobrevive a la corrida. Un verde que no puede decir esas cuatro cosas no es un verde viejo: es el verde de otra cosa. | Compuerta + caso manual | BLOQUEA |
| CQ-24 | Registro | Un registro contesta la pregunta para la que existe, sobre todo su recorrido: los campos con los que se contesta esa pregunta los escribe el camino que produce el hecho, y el tramo que quedó fuera de su alcance se informa como fuera de alcance y nunca como cero. | Compuerta + caso manual | BLOQUEA |

Las reglas CQ-12 a CQ-18 son las que hacen que "calidad de código" signifique algo en el frente. Sin ellas, el proyecto puede tener mutación al noventa por ciento y una pantalla que calcula el total con su propia aritmética en un componente: el peor de los dos mundos, porque el cálculo duplicado pasa todas las pruebas del backend.

**Las dos reglas del recibo, y de dónde salieron (D-078).** CQ-19 y CQ-20 entraron el 2026-11-01 y no salieron de una idea: salieron de once fallos medidos en un experimento que estaba midiendo otra cosa. Todos tenían la misma forma —un instrumento que no pudo mirar y lo informó igual que la salud, o que miró menos de lo que creía haber mirado— y aparecieron por once caminos distintos, lo que hace muy improbable que sea el defecto de un programa. Lo que los vuelve dos reglas y no once es que se les puede hacer la misma pregunta: *¿cuál es el denominador de este número, y qué informa este instrumento cuando no pudo mirar?* CQ-19 es sobre lo que un instrumento **informa**; CQ-20 es sobre el **privilegio** con el que corre, que es parte de la verificación y no un detalle de operación. Cada una entra con sus caras, que es la forma que la sección 2 describe.

#### Las cuatro caras de CQ-19

| id | Cara | Enunciado |
|---|---|---|
| CQ-19.1 | El denominador | Toda medición que recorre un conjunto declara cuántos elementos esperaba recorrer al lado de cuántos recorrió, y falla cerrado cuando recorrió menos. No alcanza con distinguir el cero que es "no hay" del cero que es "no pude mirar": hay que distinguir el "menos porque no miré todo", que es el que se lee igual que la salud. |
| CQ-19.2 | La independencia | Ningún instrumento depende del recurso que mide. Cuando no se puede evitar, su informe declara de qué depende, y la caída de esa dependencia se informa como "no pude mirar" y nunca como salud. |
| CQ-19.3 | El universo, en las dos direcciones | Todo filtro, búsqueda o selección declara el universo sobre el que corrió: "no encontré nada" y "no corrí" son dos resultados distintos y no se escriben igual, y un filtro que devolvió de más tampoco se aplicó. Una cifra que decide se mide dos veces, de dos formas distintas, antes de usarse. |
| CQ-19.4 | El hermano laxo | Cuando un control tiene contraparte en la cadena, o son el mismo instrumento con la misma configuración, o la diferencia está declarada: qué mide cada uno, cuál manda, y qué puede pasar uno y fallar el otro. Un control local más permisivo que el que decide es un verde que miente. |

**En qué se diferencia del recibo del peldaño 8.** Son el mismo concepto sobre objetos distintos, y por eso llevan el mismo nombre: el recibo del peldaño 8 es un artefacto que un plan produce —el rojo con su comando exacto, su versión, sus números y su código de salida, pegado tal cual—, y el recibo del instrumento es la condición que un número trae al lado para poder leerse. Uno se exige una vez por candado; el otro, cada vez que una cifra decide algo. Dicho al revés, que es como se chequea sin pensar: si lo que tenés delante es un test, pedí el recibo del peldaño 8; si es un número, pedí el de CQ-19.

#### Las dos caras de CQ-20

| id | Cara | Enunciado |
|---|---|---|
| CQ-20.1 | El efecto no declarado | Un comando que se presenta como de sólo lectura corre sin permiso de escribir, y el privilegio con el que corrió se declara al lado de su resultado. Un instrumento que escribe mientras dice que no deja al dueño decidiendo sobre un estado que el propio instrumento cambió. |
| CQ-20.2 | La sonda que sólo es inofensiva cuando falla | Una sonda que ejerce una operación destructiva para comprobar que está impedida corre donde su sentencia no puede aterrizar, y su informe prueba que el estado quedó idéntico contándolo antes y después. Una sonda cuyo daño depende de que el impedimento funcione no verifica el impedimento: lo apuesta. |

La pareja de CQ-20 con la rutina del rojo del peldaño 8 se lee sola: el rojo primero exige que una prueba **pueda** detectar; CQ-20 exige que al detectar **no rompa**.

**La regla del alcance, y por qué es una y no tres (D-087).** CQ-21 entró el 2026-11-03 y tampoco salió de una idea: salió de tres defectos medidos en el mismo experimento, en el segundo lote, y los tres tenían una forma que se dice en una línea —**un artefacto correcto que no llega al único lugar donde produce efecto**—. El caso de prueba escrito que nadie ejecutó. El caso corregido que nadie volvió a correr. Y el puerto doblado que ninguna prueba atravesó, que es el que vale la mitad del precio: un brazo del experimento construyó su vista sobre un puerto con su doble, que es lo que el método empuja a hacer para que la vista sea verificable, y ese puerto escuchaba un solo tipo de evento mientras cuatro de los cinco controles emitían otro. **Cuatro controles muertos en un navegador, con ochenta y un archivos de prueba en verde encima**, y entre ellos uno que afirmaba exactamente lo que estaba roto, verde porque recorría los oyentes del nodo falso y los llamaba a mano. En los ochenta y un archivos no había un solo apretón de botón. Lo que los vuelve una regla y no tres es que se les puede hacer la misma pregunta: *¿hasta dónde llegó esta corrida, y qué parte del artefacto quedó sin atravesar?*

Y hay que decir de dónde viene la redacción, porque no es mía. La mía pedía *"al menos una prueba que lo atraviese de verdad, contra la implementación real"*, y el brazo la aceptó y mostró con su propio código que **no alcanza**: una de sus pruebas ya corría la implementación real, contra un documento de mentira que invocaba al oyente sin mirar el evento. Atravesaba el adaptador de verdad y seguía sin ver el defecto. La que quedó es la suya, y es la de `CQ-21.1`: el otro lado tiene que ser **el otro lado de verdad**. Su costo también lo midió él, que es la objeción que esta cara va a recibir: **una corrida, quince segundos y seis décimas, cero paquetes nuevos**.

#### Las cuatro caras de CQ-21

| id | Cara | Enunciado |
|---|---|---|
| CQ-21.1 | El otro lado de verdad | Todo puerto con doble de prueba tiene al menos una corrida que lo atraviesa hasta el otro lado de verdad, y el otro lado es lo que el puerto está doblando: si ahí hay un navegador, un sistema operativo, una base o la red, no hay forma de cumplirla sin eso, y ninguna cantidad de dobles fieles la sustituye. |
| CQ-21.2 | Escrito no es corrido | Un artefacto de verificación que nadie corrió cuenta cero y no media verificación, y su cifra viaja al informe donde se decide y no sólo al archivo donde el artefacto vive: un número que hay que ir a buscar no frena a nadie. |
| CQ-21.3 | El caso vuelve entero | Una ejecución informa hasta qué paso llegó, y los pasos que no alcanzó no pasaron ni fallaron: cuando se arregla lo que falló, el caso vuelve a correr entero y deja una fila de ejecución nueva posterior al arreglo, y una corrección no se cierra con la verificación del paso que falló. |
| CQ-21.4 | El rojo llegó a la afirmación | Un rojo prueba lo que dice probar sólo si la corrida llegó hasta la afirmación: un rojo que es una excepción —el código mutado no compila, el archivo no se parsea, el entorno no arrancó— no falsó nada, porque la afirmación ni pasó ni falló, y declarar cazada una mutación por ese rojo es dar veredicto sobre un paso que la corrida nunca alcanzó. |

**En qué se diferencia de `CQ-19.1`, que es la pregunta que va a hacer el primer lector.** Son dos ejes y no el mismo dicho dos veces. `CQ-19.1` mira el **ancho**: de los elementos que un instrumento esperaba recorrer, cuántos recorrió. `CQ-21` mira el **fondo**: hasta qué capa, o hasta qué paso, llegó **una** corrida. Y se distinguen porque el caso del puerto los separa solo: los ochenta y un archivos corrieron los ochenta y uno, así que el denominador estaba perfecto y el fondo era cero. Un número puede tener su denominador completo y no haber tocado nunca la capa donde el defecto vive. Dicho al revés, que es como se chequea sin pensar: si la duda es *cuántos de cuántos*, es `CQ-19.1`; si la duda es *hasta dónde*, es `CQ-21`.

**Y lo que esta regla no promete, dicho acá y no cuando falle.** Ninguna compuerta puede verificar que la corrida que un proyecto declara atraviesa el puerto **de verdad**: lo que una máquina mira es la declaración —que el puerto esté en el inventario del peldaño 11, con su adaptador, su doble y la corrida que lo atraviesa nombrando qué hay del otro lado— y lo que decide si eso es cierto es una persona leyendo el comando. Esa es toda la compuerta que hay, y es más de lo que había: hasta el 2026-11-03 un proyecto con un puerto doblado y ninguna corrida que lo atravesara salía **exactamente igual** que uno que la tenía, y lo medí con el evaluador real sobre dos árboles que sólo diferían en eso. Lo mismo vale para `CQ-21.3`: que la fila nueva cubra *todos* los pasos lo dice quien ejecutó, no un programa. La cifra es mecánica; la verdad de la cifra es del dueño.

**Y la cuarta cara llegó después, el 2026-11-07, con D-089.** `CQ-21.4` no estaba el día que la regla entró y la trajo un defecto que encontró una compuerta y no una persona: el verificador de anclas de mutación de un brazo del experimento halló una mutación **declarada cazada porque la prueba se había puesto en rojo**, y la prueba se había puesto en rojo por un error de tipo y no por una afirmación fallada —el código mutado explotaba antes de llegar a la afirmación—. El rojo era real y no probaba lo que decía probar. El mismo día, en otro sistema, una guarda plantaba un mutante con los finales de línea del otro sistema operativo, el corredor no parseaba el archivo, y el recibo **le echaba la culpa al mutante**. Entra como cara de esta regla y no como regla propia porque la pregunta que la detecta es la de `CQ-21` palabra por palabra: la corrida no llegó hasta la afirmación, así que la afirmación es un paso que la corrida no alcanzó, y el enunciado de la regla ya dice que un paso que ninguna ejecución alcanzó no pasó ni falló. La pregunta mecánica, que se hace sin herramientas: **el rojo es una afirmación fallada, o es una excepción?** Es, además, la pareja exacta de la rutina del rojo del peldaño 8: el rojo primero exige que una prueba **pueda** detectar, `CQ-20` que al detectar **no rompa**, y `CQ-21.4` que el rojo que se exhibe como prueba **haya llegado hasta donde prueba algo**.

**Las tres reglas del tercer lote, y por qué son tres y no diez (D-089).** CQ-22, CQ-23 y CQ-24 entraron el 2026-11-07 y vienen de diez hallazgos: nueve que el brazo C1 del experimento A/B dejó al cerrar los veinticuatro peldaños —veintidós de veinticuatro sin override, que es la cifra correcta— y uno que no salió del brazo sino de un análisis de plataformas de herramientas. El dueño los trajo con una línea que es la que vuelve a casi todos una sola familia: **no aceptes «la medición existe» como criterio**. Y la familia se parte en tres al preguntarle a cada hallazgo qué es lo que nadie mira. *¿Contra qué se contrasta este número, y quién decidió?* es `CQ-22`. *¿Este veredicto es de este trabajo, y sigue existiendo?* es `CQ-23`. *¿Este registro puede contestar la pregunta para la que existe, sobre todo su recorrido?* es `CQ-24`. Las tres preguntas se pueden hacer a mano y las tres tienen respuesta falsable; por eso son reglas y no advertencias.

**CQ-22, el contraste, y el caso que la midió.** El peldaño 19 del brazo —pruebas de rendimiento en volumen y punto de ruptura— **cerró en verde con su requisito no funcional incumplido**: p95 de 557 a 911 milisegundos contra un techo declarado de 300, a doscientos simultáneos, con el pozo de conexiones de un módulo saturado desde veinte personas. Y la compuerta que lo dejó pasar **tiene razón en lo que mide**: verifica que el recibo exista, que cubra los cuatro flujos y que traiga sus umbrales o la imposibilidad escrita. Palabras del brazo, que es el que lo encontró: *"ninguna compuerta de la escalera pregunta si el número pasa"*. Eso es lo que esta regla cierra, y la consecuencia hay que decirla entera porque es grande: hasta el 2026-11-07 una escalera de veinticuatro peldaños se podía cerrar **completa**, con todos sus requisitos no funcionales incumplidos, y cada compuerta teniendo razón una por una.

La regla entra con **cuatro caras y no con una**, y cada una viene de una mitad distinta del mismo agujero. `CQ-22.2` es la mitad estructural y es la que el dueño pidió explícita: el requisito del caso decía *"p95 < 300 ms"* y **no decía a qué concurrencia**, así que el mismo sistema pasa a veinte personas y falla a doscientas, y un umbral sin su condición no se puede contrastar contra nada. `CQ-22.3` es la del peor caso, un peldaño más arriba: el manual de infraestructura y recuperación del brazo, cuatrocientas nueve líneas escritas *"para las tres de la mañana"*, declara en su sección 6, textual, **«No hay respaldos. Ninguno. De nada.»**, con el comando de verificación transcripto —y el peldaño 20 cerró en verde, porque la compuerta verifica que el manual exista y declare lo que no sabe, no que el respaldo exista—. Esa diferencia es la que esta cara marca y no se negocia: para el p95 la imposibilidad escrita es una salida legítima, porque hay sistemas donde la carga no se puede medir; *"no hay respaldos"*, escrito con toda la honestidad del mundo, **no puede cerrar un peldaño**. Un p95 que no pasa es un sistema lento y se descubre con usuarios enojados; un respaldo que no existe es un sistema del que no se puede volver, y se descubre el día que hace falta, que es el peor momento. Y `CQ-22.4` es la cara que el décimo hallazgo pidió con su propio cuidado escrito: si la exigencia termina siendo *"que exista un inventario"*, nace con el defecto que todo este lote viene a arreglar.

**CQ-23, la procedencia, y la medición que la ordena.** Tres de los diez hallazgos son el mismo veredicto mirado desde tres lados. El primero: una compuerta que **no es ciega y que no corre**. Un commit entró con una regla en rojo porque la cadena se había corrido **antes** de escribir el documento que la rompía, y el árbol estaba veintisiete commits adelantado, así que el gancho que mira el árbol que de verdad queda no corrió ninguna de las dos veces. El verde era **cierto y era viejo**. El segundo: dos corridas de la misma cadena en el mismo proyecto con resultados opuestos, y la diferencia era una sola cosa —una quedó en un registro en disco, ciento diez líneas con treinta y siete compuertas y cuatro en rojo, y la otra viajaba adentro de la respuesta y se perdió entera—. El tercero: un peldaño **en verde y sin hacer**, cuyos dos chequeos los resolvían los mismos dos archivos del peldaño anterior, con el pendiente del peldaño en cero entradas de trabajo; ninguna compuerta lo detectó y lo paró el brazo, negándose a aceptar su propio verde.

De los tres, la redacción de `CQ-23.3` es del brazo y hay que acreditarlo: *"la pregunta que lo detecta es una sola y se puede hacer a mano: qué archivo de esta lista no existía antes de empezar? Si la respuesta es ninguno, el verde es de otro."* La mía habría hablado de «artefactos propios del peldaño» y no le habría dado al lector una pregunta que puede hacer sin herramientas. Es la segunda vez que pasa —`CQ-21.1` también es suya— y conviene que quede escrito.

**CQ-24, el registro, y los dos defectos independientes que lo volvieron familia.** El titular del experimento era *"veinticuatro peldaños cerrados, cero cierres forzados"*, informado tres veces el mismo día y escrito en tres documentos. El brazo fue a verificarlo antes de copiarlo, y sobre los ciento noventa y cinco elementos de su registro midió esto: **cero** con el campo de forzado escrito, **veintiocho** que nombran la palabra en su prosa, **diez** cierres que la prosa declara forzados por el dueño bajo nueve autorizaciones, y de ésos **dos** que son tareas de la escalera —las dos con el motivo de cierre en «entregado» y ningún campo de forzado—. El campo existe para un momento exacto, el peldaño 23, y su propio esquema dice que es obligatorio *"para que la retrospectiva pueda contar los cierres forzados por motivo"*; en el único proyecto que llegó hasta ahí **nunca se escribió**, y la cuenta hubo que hacerla leyendo prosa, que es justo lo que el mecanismo venía a evitar. Hay un corolario que vale solo: la lista de nueve autorizaciones de la retrospectiva **omitía una**, porque se armó con una búsqueda de la palabra «override» y la prosa de ese elemento no la usa —un recuento por palabra sobre prosa libre es un instrumento que no puede garantizar su propia población, que es `CQ-19.3`—.

Lo que lo convirtió en regla y no en un arreglo fue la **segunda ocurrencia, independiente**, medida el mismo día del lote y en otro sistema escrito por otro autor: el programa de arranque de un panel escribía en su registro, que es de sólo agregar, un campo de motivo **constante** —*"arranque de la serie 2: el panel viejo tenía 1.23.5 en memoria"*—, cierto del primer arranque y falso de los tres siguientes, que quedaron archivados para siempre con un motivo que no era el suyo. El campo existía, se llenaba en cada fila, y mentía. Dos ocurrencias independientes del mismo patrón son una familia y no un descuido, así que `CQ-24.1` está redactada para la familia —*un campo obligatorio cuyo valor no se deriva del hecho que dice registrar*— y no para el campo que la trajo.

`CQ-24.2` es el otro hallazgo y es más barato de arreglar de lo que parece. Lo midió el brazo al escribir su retrospectiva: los **doce** primeros anti-patrones de su registro entraron **en un solo commit en el peldaño 11** y describen los peldaños 00 a 11, de los cuales los peldaños 00 a 04 informan **cero incidentes**. Sus palabras: *"tu pregunta —en qué paso cae cada incidente— no se puede contestar bien para el primer quinto del recorrido, que es donde se toman las decisiones más caras de deshacer."* El dueño ofreció dos salidas —que los registros nazcan en el peldaño 01, o que las filas retroactivas se marquen como tales— y la cara toma **las dos en una**, en ese orden, porque la primera evita el problema de raíz y la segunda es la que se puede cumplir en un legado donde el registro ya nació tarde. Y queda dicho que la primera sola no alcanza: un registro que existe desde el peldaño 01 y que nadie escribe informa cero igual.

**Y lo que estas tres reglas no prometen, dicho acá y no cuando fallen.** Ninguna compuerta puede verificar que el número que un proyecto declara sea el que midió, ni que la condición que un umbral declara sea la que gobierna el requisito, ni que una fila retroactiva esté marcada con honestidad. Lo que una máquina mira es la **declaración** —el veredicto al lado de la cifra, la condición al lado del umbral, el denominador de un inventario y la decisión de cada entrada, la fecha de un veredicto contra la del último cambio, el peldaño en que un registro nació— y la verdad de la declaración la decide una persona leyendo. Es la misma frontera que `CQ-21` escribió en su sección y vale repetirla: la cifra es mecánica, la verdad de la cifra es del dueño. Lo que cambia respecto de no tener la regla es que antes el silencio y la salud se escribían igual.

#### Las cuatro caras de CQ-22

| id | Cara | Enunciado |
|---|---|---|
| CQ-22.1 | El número contra su umbral | Toda cifra que un requisito declarado gobierna llega con su umbral al lado y con su veredicto —pasa o no pasa—, y la que no pasa es roja y no «medida». La imposibilidad escrita sigue valiendo como salida; el silencio no. |
| CQ-22.2 | El umbral con su condición | Un umbral declara la condición en la que vale —a qué volumen, a qué concurrencia, en qué entorno, sobre qué datos— y un umbral sin su condición se reporta como no declarado: el mismo sistema pasa a veinte personas y falla a doscientas, así que sin la condición no hay nada contra qué contrastar. La condición es una decisión del dueño y no se supone. |
| CQ-22.3 | La ausencia declarada no cierra | Una salvaguarda que el método exige y que no existe no cierra su peldaño por estar honestamente declarada. La diferencia con la imposibilidad escrita es mecánica: si lo que falta es el número, la honestidad alcanza y la medición queda pendiente; si lo que falta es la salvaguarda, no falta un número —falta el camino de vuelta—, y eso es un rojo con su proyecto previo. |
| CQ-22.4 | Cada entrada con su decisión | Un inventario que el método exige cierra con una decisión por entrada —aceptada, acotada o rechazada, con quién y cuándo—, y no con la lista existiendo. Un inventario completo cuyas entradas nadie resolvió es la misma medición que nadie contrastó, con otra forma. |

#### Las tres caras de CQ-23

| id | Cara | Enunciado |
|---|---|---|
| CQ-23.1 | Posterior al último cambio | Un veredicto es posterior al último cambio que afecta lo que mide, y corrió sobre el árbol que queda. Un verde cierto y viejo se lee igual que uno vigente; y una compuerta que mira el árbol definitivo y sólo corre al publicar deja un verde con fecha de vencimiento que nadie revalida. |
| CQ-23.2 | La salida sobrevive a la corrida | Toda verificación que puede durar más que el turno que la lanzó deja su veredicto donde el turno siguiente lo lee. Una salida que viaja adentro de la respuesta muere con ella, y lo que se pierde no es el trabajo —ése quedó— sino el veredicto, que es lo único por lo que se corrió. |
| CQ-23.3 | El artefacto es de este trabajo | De los artefactos con los que un paso cierra, al menos uno nació en él, y la pregunta que lo detecta se hace a mano y sin herramientas: cuál de esta lista no existía antes de empezar? Si la respuesta es «ninguno», el verde es de otro paso, y la compuerta midió bien el artefacto equivocado. |

#### Las dos caras de CQ-24

| id | Cara | Enunciado |
|---|---|---|
| CQ-24.1 | El campo lo escribe el hecho | Un campo obligatorio cuyo valor no se deriva del hecho que dice registrar puede ser cierto de sí mismo y falso del hecho: lo escribe el camino que produce el hecho, o el método declara que ese campo no es el registro del hecho y dice cuál lo es. Un campo constante, o vacío mientras el hecho ocurre y contado en la prosa de al lado, deja una cuenta que hay que hacer leyendo, que es justo lo que el campo venía a evitar. |
| CQ-24.2 | El registro nace antes del trabajo | Un registro que empieza a mitad del recorrido no puede contestar por el tramo anterior, y su cero ahí se lee como «no pasó nada». Nace antes del trabajo que registra, o las filas escritas hacia atrás se marcan como tales y el tramo sin registro se informa como no registrado y nunca como limpio. |


**Severidades iniciales (D-048).** Bloquean desde el día uno las reglas que tienen verificador y que no dependen de un umbral que haya que discutir: CQ-01 a CQ-06, CQ-08, CQ-11 a CQ-17, CQ-19, CQ-20, CQ-21, CQ-22, CQ-23 y CQ-24. CQ-09 bloquea donde hay usuarios reales, que es donde se mide. Avisan tres, y sólo tres: CQ-07 (tipos), CQ-10 (dependencias) y CQ-18 (accesibilidad), porque son las que necesitan que el proyecto calibre primero. El formateador, el linter, el tamaño y la complejidad **no se aflojan**: el peldaño 9 ya los bloquea hoy, y esto lo extiende, no lo reemplaza; la deuda heredada se resuelve con una excepción declarada o con la línea base del trinquete, nunca bajando la severidad. Y CQ-12 y CQ-14 son las dos únicas reglas de esta tabla que bloquean con rojo humano y no de máquina: se verifican al cierre del pendiente y con el caso manual delante, igual que UX-22 y UX-27, no en cada commit. Si el proyecto no puede sostener ese cierre, la regla baja a AVISA por decisión registrada, no por olvido.

**Adaptador por familia de frontend.** Un ejemplo de cómo se instancia la capa 2 (los nombres son ilustrativos; el proyecto elige y lo escribe):

| Concepto | Aplicación de una sola página (React, Vue, Angular) | Servidor con plantillas | Mobile nativo | Línea de comandos |
|---|---|---|---|---|
| CQ-12 dominio en la vista | Regla de lint sobre tamaño y dependencias de componentes + revisión | Revisión del controlador | Revisión del modelo de vista | Revisión de la capa de comandos |
| CQ-13 cliente único | Generación desde el contrato de la API | Servicio único del servidor | Cliente generado | Cliente único del SDK |
| CQ-15 textos | Catálogo + regla que prohíbe literales visibles | Catálogo del motor de plantillas | Catálogo de recursos | Catálogo |
| CQ-16 identificadores | Atributos declarativos por elemento | Identificadores en el marcado | Identificadores de accesibilidad | Salida estable |
| CQ-17 tokens | Tokens en la hoja de estilos, sin valores sueltos | Igual | Igual | No aplica |
| CQ-18 accesibilidad | Analizador automático en la compuerta | Analizador sobre el HTML generado | Analizador de accesibilidad | No aplica |

Lo que cambia entre columnas es la herramienta y el umbral. Lo que no cambia es el enunciado. Eso es lo que hace la heurística agnóstica sin volverla decorativa.

## 5. Parte B — Usabilidad

Seis familias. La primera y la segunda son las que el dueño pidió explícitamente; las tres siguientes existen porque sin ellas la agrupación y los perfiles se degradan igual, más lento. La sexta nació después, el 2026-10-27 (D-070), y es de otra clase: las cinco primeras son sobre la pantalla que el sistema le muestra a una persona, y la sexta es sobre la conversación en la que el sistema se construye.

### B1 — Agrupación por convergencia funcional

La regla madre: **una funcionalidad se agrupa por lo que la persona vino a hacer, no por el módulo del que salió.** El código se organiza por entidades ("Factura", "Cliente", "Pago"); las personas no. Nadie entra al sistema a "gestionar entidades": entra a cobrar, a despachar, a cerrar el mes. Si el menú muestra las entidades, la persona hace de traductora. El menú *es* el trabajo.

| id | Enunciado | Verifica | Severidad |
|---|---|---|---|
| UX-01 | Cada grupo del menú se nombra con un trabajo del usuario (en su vocabulario, con el glosario del proyecto), nunca con un módulo técnico ni con una entidad de datos. | Caso manual + revisión de la matriz | AVISA |
| UX-02 | Cada funcionalidad tiene exactamente una casa canónica. Si sirve a dos grupos, se elige una casa y desde la otra se enlaza; no se duplica la entrada. | Consulta a la matriz | BLOQUEA |
| UX-03 | No hay huérfanas: toda funcionalidad declarada es alcanzable desde la pantalla de entrada en no más de tres pasos. | Recorrido automático de rutas | BLOQUEA |
| UX-04 | El tamaño de un grupo es razonable: menos de tres funcionalidades indica un grupo que no era grupo; más de siete indica un cajón. | Consulta a la matriz | AVISA |
| UX-05 | Todo grupo tiene una pantalla de entrada que dice qué se hace ahí y cuál es la acción principal. No hay grupos que se abren directo en una tabla vacía. | Caso manual | AVISA |
| UX-06 | Los flujos que la persona hace seguido viven juntos: si "cargar un pago" y "ver la cuenta del cliente" se usan en la misma sesión, comparten grupo. | Caso manual (prueba de tarea) | REGISTRA |
| UX-07 | La prueba del primer clic: el dueño, frente a una tarea concreta ("¿dónde cobrás un pago?"), nombra un lugar. Si nombra dos, hay duplicación; si no nombra ninguno, hay huérfana. Se corre al cierre de cada bloque. | Caso manual | AVISA |

### B2 — Perfiles y funcionalidades habilitadas por perfil

Acá está la pieza que más rinde, y la razón es de ingeniería, no de diseño: **la habilitación se declara una vez, en una matriz, y todo lo demás se deriva de ella.** Hoy el error clásico es escribir el permiso tres veces (en el menú, en el guard de la ruta y en el filtro de datos) y que las tres se separen. Con la matriz como único productor, el menú, el ruteo, los permisos del servidor y los guiones de prueba son consumidores, y la simetría productor/consumidor que el método ya exige se vuelve verificable sola.

La matriz tiene cuatro columnas y una fila por funcionalidad: *funcionalidad*, *casa* (el grupo de B1), *perfiles que la tienen*, *ruta de entrada*. Nada más.

| id | Enunciado | Verifica | Severidad |
|---|---|---|---|
| UX-08 | Toda funcionalidad declara en la matriz qué perfiles la tienen. Una funcionalidad sin perfil no existe: o se le asigna perfil o se borra. | Consulta a la matriz | BLOQUEA |
| UX-09 | Todo perfil declarado tiene al menos una funcionalidad y un punto de entrada propio. Un perfil vacío es un perfil que nadie usó al diseñar. | Consulta a la matriz | BLOQUEA |
| UX-10 | La navegación se genera desde la matriz. Un menú escrito a mano es un fallo, no un atajo. | Compuerta (búsqueda) | BLOQUEA |
| UX-11 | Ocultar no es proteger: toda ruta verifica el permiso del lado del servidor además de esconder la entrada. Escribir la dirección a mano no alcanza para entrar. | Prueba de extremo a extremo | BLOQUEA |
| UX-12 | Ni de menos ni de más: por cada perfil, el conjunto de funcionalidades alcanzables es exactamente el de su fila en la matriz. | Prueba de extremo a extremo por perfil | BLOQUEA |
| UX-13 | La negativa se explica: si una persona entra a una funcionalidad que no le corresponde, ve un mensaje que dice por qué y a quién pedirle acceso. Nunca una pantalla en blanco, nunca un botón gris sin razón. | Caso manual | AVISA |
| UX-14 | El mismo botón significa lo mismo para todos: si dos perfiles comparten etiqueta, comparten efecto. Si el efecto cambia según el perfil, la etiqueta cambia o la funcionalidad se separa en dos. | Caso manual | AVISA |
| UX-15 | Los datos también se filtran por perfil: quien ve la lista ve las filas que le corresponden, no la lista completa con las filas escondidas en el navegador. | Prueba de extremo a extremo + revisión del servidor | BLOQUEA |
| UX-16 | La matriz y el manual de usuario se actualizan en el mismo pendiente que la funcionalidad. Una funcionalidad nueva sin fila en la matriz no se cierra. | Cierre de pendiente | BLOQUEA |

### B3 — Estados, y qué ve la persona cuando algo no está

La mayoría de los reclamos de "no anda" son pantallas que no supieron decir "no hay nada", "está cargando" o "falló". Cuatro estados, siempre, en toda lista y toda pantalla de detalle.

| id | Enunciado | Verifica | Severidad |
|---|---|---|---|
| UX-17 | Toda lista tiene cuatro estados resueltos: con datos, vacía, cargando y con error. La vacía distingue "todavía no hay" de "tu búsqueda no encontró". | Caso manual + revisión | AVISA |
| UX-18 | Mientras algo demora, se ve que está trabajando y se puede cancelar si es largo. Un botón que no responde nada es la queja número uno. | Caso manual | AVISA |
| UX-19 | El error dice qué pasó, qué se puede hacer y no borra lo cargado. Ni un código técnico solo, ni un "ocurrió un error". | Caso manual | AVISA |

### B4 — Acciones y errores

| id | Enunciado | Verifica | Severidad |
|---|---|---|---|
| UX-20 | Una pantalla tiene una acción principal evidente; el resto son secundarias y se ven como tales. | Caso manual | AVISA |
| UX-21 | Toda acción destructiva pide confirmación nombrando el objeto afectado, y cuando se puede se deshace en lugar de confirmar. | Caso manual | AVISA |
| UX-22 | Un formulario que falla conserva lo cargado y marca el campo con problema, en el lugar del campo. | Caso manual | BLOQUEA |
| UX-23 | Ninguna acción deja la pantalla sin salida: después de guardar, borrar o cancelar, la persona sabe dónde quedó y cómo seguir. | Caso manual | AVISA |

### B5 — Lenguaje y accesibilidad

| id | Enunciado | Verifica | Severidad |
|---|---|---|---|
| UX-24 | La interfaz habla el idioma del glosario del proyecto: el mismo objeto se llama igual en la pantalla, en el manual y en el correo. Un sinónimo es un defecto. | Caso manual + revisión | AVISA |
| UX-25 | Todo se puede hacer sin mouse y con lector de pantalla en los flujos principales; el foco se ve siempre y no queda atrapado. | Compuerta (CQ-18) + caso manual | AVISA |
| UX-26 | Los estados no se comunican solo por color; toda imagen informativa tiene texto alternativo; los textos se leen a tamaño normal sin zoom. | Compuerta (CQ-18) | AVISA |
| UX-27 | Cada pendiente que toca una pantalla entrega la captura real del entorno de prueba, y el dueño la mira antes de cerrar. La captura no es opcional ni es un maqueta. | Cierre de pendiente | BLOQUEA |

### B6 — La pregunta al dueño

El método le ordena al modelo **preguntar** en más de la mitad de sus prompts: veintidós veces, en quince de los veintisiete archivos del corpus publicado. Y hasta el 2026-10-27 no decía en ninguna parte **cómo se pregunta**, así que la forma quedaba a la improvisación y el dueño recibía la pregunta suelta: sin los datos que la justifican, sin opciones y sin recomendación. Es la misma asimetría que persigue el peldaño 11 —algo exigido de un lado y no definido del otro—, en la dirección que más caro sale: hacia la persona que decide. El método ya hizo esto dos veces, y por eso esta regla no es una ocurrencia: el peldaño 8 no se conformó con «mostrame el rojo» y definió qué es un recibo; el peldaño 12 no se conformó con «reportá» y separó verificado de creído.

| id | Enunciado | Verifica | Severidad |
|---|---|---|---|
| UX-28 | Cuando el agente necesita una decisión del dueño, la pregunta llega con sus cuatro partes y en este orden: los datos que la hacen necesaria, enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la pregunta con sus respuestas posibles enumeradas; y la recomendación del agente. Y a la profundidad técnica que el proyecto declaró. Una pregunta suelta le deja al dueño el trabajo de reconstruir por qué se la hacen. | Revisión del dueño al cierre del pendiente | AVISA |

**Los tres niveles de profundidad, y de dónde salen.** El proyecto declara uno y el agente habla en ese nivel: `beginner` (lenguaje de todos los días, orientado al resultado, sin nombres de archivo ni jerga), `decision_maker` (números medidos y consecuencias, sin rutas de archivo: el que el método usa por defecto) y `technical` (archivo, línea y comando). No se inventaron para esta regla: el nivel principiante ya es la forma de todo el método (D-025) y la distinción entre hablarle al dueño y hablarle a quien construye ya estaba en la práctica. El nombre del parámetro y los tres valores viven en el nivel de datos, en `project_config.communication_depth`, porque es lo que una herramienta consumidora tiene que leer sin adivinar.

**Lo que esta regla no promete, y conviene decirlo acá y no cuando falle.** Una compuerta puede verificar que la cláusula esté en los setenta y dos prompts y en los ocho idiomas —y lo hace—; ninguna prueba puede verificar que una pregunta concreta que un modelo escribió un martes tenga sus cuatro partes. Eso lo juzga el dueño, que es por qué la regla avisa y no bloquea, y por qué su verificación dice «revisión del dueño». Una regla que bloquea y que nadie puede verificar es peor que una regla que avisa: es la misma limitación declarada que ya tienen CQ-12 y CQ-14.

## 6. Dónde se engancha, y qué artefactos produce

El anexo no inventa peldaños nuevos: se cuelga de los que existen. Eso evita duplicar compuertas y evita el destino habitual de las listas de usabilidad, que es ser leídas una vez.

**Dónde va (D-043).** Es transversal a los cuatro tramos, con el peso principal en el Bucle de Construcción (peldaños 5 a 12), que es donde se decide y se construye. No es un peldaño propio: un peldaño numerado obligaría a renumerar la escalera, alteraría el conteo de pasos y sometería el anexo a la traducción obligatoria de los contratos a los ocho idiomas antes de que la construcción pueda pasar en verde, sin agregar ninguna compuerta que el bucle no tenga ya.

**Cómo se engancha (D-044).** Una fuente canónica, cinco anclas y dos entradas previas. El texto de las reglas vive solo acá y los prompts lo citan; nunca lo copian. Repetir las reglas dentro de los ocho prompts del bucle las diluye (compiten con el trabajo propio de cada peldaño y el agente las obedece distinto cada vez), las deriva (dos copias del mismo texto se desincronizan solas, que es el antipatrón que persigue el peldaño 11) y no las vuelve más transversales: lo que vuelve transversal a una regla es que cada bloque pase por la misma compuerta, no que la regla esté escrita en todas partes.

**La única regla que sí entra en el prompt, y por qué (D-070).** UX-28 es la excepción escrita a lo de arriba, y conviene decir en qué se diferencia de las demás: esas son exigencias sobre **el sistema que se construye**, y la compuerta las mide sobre artefactos que el proyecto deja escritos; UX-28 es una exigencia sobre **la conversación en la que se construye**, y la única manera de que el modelo la obedezca es que esté en lo que el modelo lee. Entra acotada —nombra las cuatro partes y el parámetro, y nada más— en una sola redacción inglesa idéntica en los ocho idiomas, que es la misma regla que ya rige a todos los prompts; el enunciado completo sigue viviendo una sola vez, acá. Lo que esta excepción **no** autoriza es copiar ninguna de las otras: el argumento de D-044 sigue en pie entero para todo lo que una compuerta puede mirar.

| Momento | Qué se agrega | Por qué ahí |
|---|---|---|
| **Entrada previa 1** — definición del alcance | El glosario del usuario, en `docs/GLOSSARY.md` | Sin glosario, UX-01 y UX-24 no tienen contra qué comparar. |
| **Entrada previa 2** — definición del alcance | La lista de perfiles, en `docs/PROFILES.md` | Sin la lista, la matriz de B2 se inventa en el peldaño 5 y todo lo que se deriva de ella nace sin fundamento. |
| **Ancla 1** — peldaño 5 (el plan) | Todo pendiente que toca una pantalla declara tres cosas: a qué grupo de convergencia pertenece (B1), qué perfiles la tienen y qué criterios de aceptación son por perfil ("dado el perfil X, la persona puede hacer Y y no puede hacer Z"). Sin esa declaración el pendiente no pasa el peldaño. | Acá *nacen* la agrupación y los perfiles: son decisiones de planificación, no de código. Es el ancla de mayor rendimiento y la que hoy no existe. |
| **Ancla 2** — peldaño 8 (tests en rojo) | La matriz se convierte en un test que primero se ve fallar: por cada perfil, lo alcanzable contra su fila (UX-11, UX-12, UX-15). | Sin esto la matriz es un documento que nadie mira. |
| **Ancla 3** — peldaño 9 (calidad) | El catálogo CQ completo con su adaptador y sus umbrales declarados; `docs/CODE_QUALITY.md` reporta por regla, no por número único. Y la matriz como compuerta (UX-02, UX-03, UX-08, UX-09, UX-10, UX-16). | Es el único lugar donde el texto entra literal como directiva, y es la compuerta que corre en cada bloque con trinquete. |
| **Ancla 4** — peldaño 10 (casos manuales) | Cada caso se ejecuta **una vez por perfil afectado**, derivado de la matriz y no escrito a mano. Un caso corrido con un solo perfil no cuenta como ejecutado. | Los casos manuales son la única verificación humana del método; si no se abren por perfil, la mitad de B2 nunca se mira. |
| **Ancla 5** — peldaño 12 (verificación y reporte honesto) | El reporte dice qué se midió, qué quedó en avisa y qué regla está apagada, con su motivo, su autor y su fecha de revisión. | Cero daño silencioso: un grupo apagado no puede leerse como cumplido. |
| Manual de usuario | Se organiza por los grupos de B1 y declara, por grupo, qué perfiles entran. | El manual y el menú se nombran con las mismas palabras o el glosario se rompe. |
| Cierre de cada bloque | Prueba del primer clic (UX-07), captura del entorno real (UX-27) y las dos pruebas de extremo a extremo de la matriz. | Son las tres verificaciones que no se pueden automatizar. |

**Estado (D-049).** Las cinco anclas están enganchadas: el prompt inicial de los peldaños 5, 8, 9, 10 y 12 cita este anexo en los ocho idiomas, con una sola redacción inglesa idéntica en todos y su traducción local al lado. El documento se publica en el sitio con el resto del método en los ocho idiomas, y sus dos prompts entraron en `docs/html/api/prompts.json` como contrato `anexo-h`: desde ahí `build/prompts.mjs` los compara byte a byte en los ocho o la construcción falla.

Los peldaños 6, 7 y 11 reciben a lo sumo una línea: el 6 ya registra umbrales y excepciones como decisiones (es el lugar natural de la excepción declarada), y el 11 es donde entra a los golpes el caso de la matriz escrita en cuatro lugares. No se les agrega texto propio para no diluirlos.

Tres artefactos, todos en `docs/`: `CODE_QUALITY.md` (extendido), `USABILITY.md` (nuevo, con el resultado por regla y las excepciones declaradas) y `PROFILE_MATRIX.md` (la matriz, que es a la vez documento y fuente del menú).

## 7. Configuración

Un solo archivo por proyecto declara capa 2 y capa 3. Ejemplo con la forma propuesta, no con valores definitivos:

```json
{
  "frontend": "react-vite",
  "real_users": true,
  "communication_depth": "decision_maker",
  "measured_by": {
    "format": "prettier",
    "lint": "eslint",
    "types": "tsc",
    "complexity": "eslint-complexity",
    "duplication": "jscpd",
    "dead": "knip",
    "coverage": "vitest-coverage",
    "mutation": "stryker",
    "accessibility": "axe-core"
  },
  "tools": {
    "eslint": "9.12.0",
    "vitest": "2.1.3",
    "stryker": "8.6.0"
  },
  "thresholds": {
    "lines_per_file": 300,
    "lines_per_function": 40,
    "paths_per_function": 10,
    "minimum_coverage": 0,
    "mutation_target": 0,
    "end_users_outside_the_organisation": false,
    "acceptable_data_loss_window": "1h"
  },
  "switches": {
    "code_quality": true,
    "usability": true
  },
  "switched_off": [
    {
      "rule": "CQ-17",
      "reason": "informe imprimible heredado, sin tokens",
      "authorized_by": "dueño",
      "review_date": "2027-01-31"
    }
  ]
}
```

**Las claves de ese archivo son nivel de datos y no se traducen** (D-051, D-075): van en inglés, en ASCII puro, con el nombre exacto que el dato declara —las ocho de primer nivel, las cuatro del registro de apagado (`gates/schema.json#project_config`) y los identificadores de umbral (`gates/adapters.json`)— e **idénticas en los ocho idiomas**. En el idioma del lector van los **valores** que escribe una persona: el motivo de un apagado, por ejemplo. Se escribió medido el 2026-10-29: hasta ese día el ejemplo llevaba las claves traducidas —cuatro vocabularios distintos en los ocho idiomas y ochenta y siete nombres para veinticuatro casilleros— y un apagado escrito como el ejemplo lo enseñaba pasaba por la propia compuerta del método **en verde**, con la regla apagada y el registro de cuatro campos de D-046 sin mirar, porque la compuerta lee `switched_off` y el ejemplo decía `exceptions`. `build/claves_configuracion.mjs` lo exige ahora.

Las nueve claves de dentro de `measured_by` son las únicas **ilustrativas**, y eso es una decisión y no un descuido: el método **no abarca con qué se mide cada regla**, que queda a criterio de quien mide (decisión del dueño, 2026-10-29). Y `end_users_outside_the_organisation` es el umbral de la escalada de CQ-18 (D-048, D-076): en `true` la regla bloquea, en `false` la escalada queda **declinada y registrada**, y sin declarar se reporta como umbral no declarado —que es «escalada pendiente, nadie la miró» y no lo mismo que haberla declinado—. No se usa `real_users` para esto: una herramienta interna puede tener doscientos usuarios reales y ninguno fuera de la organización. Y `acceptable_data_loss_window` es el umbral de `CQ-22` para el ensayo de destrucción y restitución del peldaño 20 (D-089): es el período de pérdida de datos que el dueño declara aceptable, y **lo contesta él, no el método ni el agente**. El valor del ejemplo es ilustrativo como todos los de arriba; lo que no es ilustrativo es que sin esa respuesta la cadencia del respaldo no se puede contrastar contra nada —una copia por hora, una por día y ninguna son igual de defendibles— y la compuerta lo reporta como umbral no declarado.

`communication_depth` es el parámetro de UX-28 y toma uno de tres valores —`beginner`, `decision_maker`, `technical`—. Si el proyecto no lo declara, el agente usa `decision_maker` y lo dice: el default se declara, no se adivina.

Los dos ceros son deliberados y son la parte que importa: la cobertura mínima la fija el trinquete con lo medido, y el objetivo de mutación lo fija el dueño cuando el proyecto tiene usuarios. Si están en cero y nadie los declaró, la compuerta lo reporta como umbral no declarado en vez de inventarlo.

## 8. Las dos piezas, en la forma que usa el método

**Calidad de código.**

> Set up and maintain the code-quality gate for this project, configured for its frontend family. The core rules are the same in every project; what changes is how each one is measured and at which threshold. Install one formatter and one linter with a single shared configuration; enforce size limits per file and per function, complexity per function, duplication, dead code, declared-and-used dependencies, type checking where the language allows it, coverage with a ratchet, and secret scanning. Where the project has real users, add mutation testing scoped to the changed lines and record the score per block. Then extend the gate to the frontend itself: no business rule inside a screen, one typed client for every server call, one home for shared state, no user-visible string outside the translation catalogue, a stable identifier and role on every interactive element, styling only through tokens, and automatic basic accessibility checks. Every rule has a stable id, a severity (blocks, warns, records) and a named verifier. Thresholds and exceptions are declared by the owner in one configuration file; a rule switched off without a written exception is a gate failure, not a decision. Report the result per rule in `docs/CODE_QUALITY.md`, not as a single number.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [es]
> Montá y mantené la compuerta de calidad de código del proyecto, configurada para su familia de frontend. Las reglas del núcleo son las mismas en todo proyecto; lo que cambia es con qué se mide cada una y con qué umbral. Instalá un solo formateador y un solo linter con configuración compartida; hacé cumplir límites de tamaño por archivo y por función, complejidad por función, duplicación, código muerto, dependencias declaradas y usadas, verificación de tipos donde el lenguaje lo permita, cobertura con trinquete y escaneo de secretos. Donde el proyecto tenga usuarios reales, agregá pruebas de mutación acotadas a las líneas cambiadas y registrá el puntaje por bloque. Después extendé la compuerta al frente: ninguna regla de negocio dentro de una pantalla, un cliente tipado único para toda llamada al servidor, un solo lugar para el estado compartido, ningún texto visible fuera del catálogo de traducciones, identificador estable y rol en todo elemento interactivo, estilos solo por tokens y verificación automática de accesibilidad básica. Cada regla tiene identificador estable, severidad (bloquea, avisa, registra) y verificador nombrado. Los umbrales y las excepciones los declara el dueño en un archivo de configuración; una regla apagada sin excepción escrita es un fallo de la compuerta, no una decisión. Reportá el resultado por regla en `docs/CODE_QUALITY.md`, no como un número único.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.

**Usabilidad.**

> Build the usability criteria for this project before writing the first screen, and enforce them where the method already has hooks. Group functionality by what the person came to do, never by the internal module or the data entity: every menu group is named with a user job in the project glossary, every functionality has exactly one canonical home, no functionality is orphaned, and every group is reachable in no more than three steps from the entry screen. Then declare accessibility in one matrix and derive everything from it: each functionality lists the profiles that have it, each functionality has at least one profile, each profile has at least one functionality and its own entry point, the navigation is generated from the matrix instead of written by hand, and every route checks the permission on the server because hiding an entry is not protecting it. Verify the matrix per profile with an end-to-end check that compares what is reachable with the matrix row: neither less nor more. Require the four states on every list (with data, empty, loading, error), a visible working indicator with the option to cancel long operations, an error message that says what happened and what to do without losing entered data, a primary action per screen, confirmation or undo for destructive actions, and a form that keeps what was typed. Run each manual test case once per affected profile, run the first-click check at the close of every block, and require a real screenshot of the test environment on every item that touches a screen. Record the result per rule, with owner-declared exceptions, in `docs/USABILITY.md`, and keep the matrix in `docs/PROFILE_MATRIX.md` as the single source of truth.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [es]
> Armá los criterios de usabilidad del proyecto antes de escribir la primera pantalla, y hacelos cumplir donde el método ya tiene enganches. Agrupá las funcionalidades por lo que la persona vino a hacer, nunca por el módulo interno ni por la entidad de datos: cada grupo del menú se nombra con un trabajo del usuario en el glosario del proyecto, cada funcionalidad tiene exactamente una casa canónica, ninguna queda huérfana y todo grupo se alcanza en no más de tres pasos desde la pantalla de entrada. Después declarás la accesibilidad en una sola matriz y derivás todo de ella: cada funcionalidad enumera qué perfiles la tienen, cada funcionalidad tiene al menos un perfil, cada perfil tiene al menos una funcionalidad y un punto de entrada propio, la navegación se genera desde la matriz en lugar de escribirse a mano, y toda ruta verifica el permiso del lado del servidor porque esconder una entrada no es protegerla. Verificá la matriz por perfil con una prueba de extremo a extremo que compare lo alcanzable contra la fila de la matriz: ni de menos ni de más. Exigí los cuatro estados en toda lista (con datos, vacía, cargando, con error), un indicador visible de trabajo en curso con opción de cancelar lo largo, un mensaje de error que diga qué pasó y qué hacer sin perder lo cargado, una acción principal por pantalla, confirmación o deshacer en las acciones destructivas y un formulario que conserve lo escrito. Corré cada caso de prueba manual una vez por perfil afectado, corré la prueba del primer clic al cierre de cada bloque y exigí una captura real del entorno de prueba en todo pendiente que toque una pantalla. Registrá el resultado por regla, con las excepciones declaradas por el dueño, en `docs/USABILITY.md`, y mantené la matriz en `docs/PROFILE_MATRIX.md` como fuente única de verdad.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.

## 9. Lo que esta propuesta no hace

- **No agrega un peldaño.** Son reglas transversales —de calidad del código y de usabilidad—, no una etapa nueva. Cuelgan de los peldaños que ya existen. **Cuántas son no lo dice esta prosa: lo declara el dato publicado** (`heuristics.counts`), que es la única copia que no se vence (D-090).
- **No inventa un puntaje.** Un número de "usabilidad 78" no dice qué arreglar y se optimiza en la dirección equivocada. Se reporta por regla. La sección 12 propone dos cifras derivadas, pero son un recuento de reglas con su asiento —no una nota de calidad ni de usabilidad— y no autorizan a cerrar nada.
- **No reemplaza al dueño.** La prueba del primer clic, la captura y la prueba de tarea siguen siendo humanas: son el único instrumento que distingue "funciona" de "sirve".
- **No trae umbrales de fábrica.** Los del adaptador son un punto de partida declarado; el proyecto que no declare los suyos los hereda y queda registrado como tal.
- **No promete que la compuerta detecte la mala agrupación.** Una máquina puede verificar que no haya duplicación ni huérfanas; si el grupo se llama "Gestión", lo tiene que ver una persona.

## 10. Las decisiones: qué quedó resuelto y qué falta

### Resueltas

| # | Decisión | Registro |
|---|---|---|
| 1 | **Transversal al Bucle de Construcción, no peldaño propio.** No se renumera la escalera, no se altera el conteo de pasos y el anexo no hereda la obligación de traducir un contrato de peldaño. | D-043 |
| 2 | **Una fuente canónica con cinco anclas y dos entradas previas,** en lugar de copiar las cuarenta y cinco reglas dentro de los ocho prompts del bucle. | D-044 |
| 3 | **Dos interruptores independientes** (calidad y usabilidad), tres estados por regla (bloquea, avisa, apagada), adaptador por familia de frontend, umbrales y excepciones declarados por el dueño. | D-045 |
| 4 | **Disciplina del interruptor:** vive en la configuración del proyecto y no en el prompt; apagar solo vale como decisión registrada con motivo, autor y fecha de revisión; el apagado es observable en el reporte; y el interruptor se prueba prendiendo y apagando. | D-046 |
| 5 | **Severidades iniciales, fijadas regla por regla:** en calidad bloquean catorce (CQ-01 a CQ-06, CQ-08, CQ-11 a CQ-17), CQ-09 bloquea donde hay usuarios reales, y avisan tres (CQ-07, CQ-10, CQ-18). En usabilidad bloquean once (UX-02, UX-03, UX-08 a UX-12, UX-15, UX-16, UX-22, UX-27), UX-06 solo registra y el resto avisa. Ni "todo bloquea" —el proyecto no arranca— ni "todo avisa" —la heurística es un adorno—. | D-048 |
| 6 | **La accesibilidad arranca avisando y escala a bloqueante por declaración del dueño** cuando el producto tiene usuarios finales fuera de la organización. El default no se inventa: la escalada se declara, con el mismo mecanismo que cualquier umbral (D-045). | D-048 |
| 7 | **La forma de la pregunta es una regla con identificador (UX-28), y entra en los prompts.** El método ordenaba preguntar veintidós veces y no decía cómo; la forma son cuatro partes en orden y un nivel de profundidad declarado por el proyecto. Es la excepción escrita a D-044, acotada y argumentada en la sección 6. | D-070 |

### Cerrado en D-048, y las dos correcciones que arrastra

Las dos preguntas que trababan la escritura de los prompts ya están respondidas: la 1 quedó en la fila 5 y la 2 en la fila 6. Pero la recomendación que se aprobó tenía dos errores de hecho, y quedan escritos acá para que no vuelvan:

1. **El defecto del conteo.** Donde este anexo decía "veintisiete reglas" el número correcto es **cuarenta y cinco**: 18 de calidad (CQ-01 a CQ-18) y 27 de usabilidad (UX-01 a UX-27). La cifra vieja venía de un borrador que solo contaba la mitad. Corregido en las secciones 6 y 9 y anotado en D-048; el texto de D-044 se conserva tal como se escribió, porque una decisión es un registro y no se reescribe.
2. **El formateador, el linter, el tamaño y la complejidad no se aflojan.** Una versión anterior de esta recomendación los mandaba a "avisa" para no trabar proyectos con deuda heredada. No puede ser: el peldaño 9 ya los bloquea hoy, y esta extensión lo extiende, no lo reemplaza. La deuda heredada se resuelve con una excepción declarada —con motivo y fecha de revisión— o con la línea base del trinquete, no bajando la severidad de la regla.

**Y desde el 2026-11-07 son cincuenta y dos.** CQ-22, CQ-23 y CQ-24 entraron con D-089 y la cuenta pasó a 24 de calidad y 28 de usabilidad; son la cuarta, la quinta y la sexta regla con **caras**, y en el mismo cambio CQ-21 recibió su cuarta cara, que es la primera vez que una regla publicada gana una cara después de haber entrado.

**Y desde el 2026-11-03 son cuarenta y nueve.** CQ-21 entró con D-087 y la cuenta pasó a 21 de calidad y 28 de usabilidad; es la tercera regla con **caras** y la primera que entra con el límite de lo que puede verificar escrito en su propia sección.

**Y desde el 2026-11-01 son cuarenta y ocho.** CQ-19 y CQ-20 entraron con D-078 y la cuenta pasó a 20 de calidad y 28 de usabilidad; son las dos primeras reglas con **caras**, que es la forma que la sección 2 describe.

**Y desde el 2026-10-27 son cuarenta y seis.** UX-28 entró con D-070 y la cuenta pasó a 18 de calidad y 28 de usabilidad. La nota de arriba se conserva tal como se escribió —dice cuál era el número correcto el día que se corrigió el defecto del conteo— porque una corrección también es un registro; lo que cambia con una regla nueva es la cuenta, no la historia de la cuenta.

Y una limitación declarada, porque es la única de su clase: **CQ-12 y CQ-14 bloquean con rojo humano.** Ninguna herramienta prueba que una pantalla no decide reglas de negocio. Se verifican al cierre del pendiente, con el caso manual delante y el mismo criterio que UX-22 y UX-27; si el proyecto no puede sostener ese cierre, bajan a AVISA por decisión registrada. Una regla que bloquea y que nadie verifica es peor que una regla que avisa.

### Pendiente de calendario, no de decisión

**La traducción.** Hecha: el anexo existe en los ocho idiomas y sus dos prompts forman parte de la API de prompts, con el texto inglés idéntico byte a byte en las ocho versiones (lo exige D-043 y lo verifica `build/prompts.mjs` en cada construcción). El castellano sigue siendo el canónico: si alguna vez una traducción y el castellano discrepan, gana el castellano y la traducción se corrige en el mismo cambio.

## 11. Cómo se comprueba que la compuerta vigila

Una heurística que no cambia nada cuando se la prende o se la apaga no es una compuerta, es decoración. La prueba de aceptación de la implementación (PND-002) es un proyecto fixture con violaciones deliberadas de cada familia:

| Escenario | Resultado exigido |
|---|---|
| Calidad encendida, con violación | Rojo, nombrando la regla y el archivo donde está la violación. |
| Calidad apagada **con registro** | Verde, y el reporte **dice** que está apagada, desde cuándo y quién lo autorizó. |
| Calidad apagada **sin registro** | Rojo. Apagar sin motivo escrito es un fallo, no una ausencia de regla. |
| Usabilidad encendida, con perfil que alcanza de más | Rojo en UX-12, con el perfil y la funcionalidad nombrados. |
| Usabilidad encendida, con funcionalidad sin fila en la matriz | Rojo en UX-08 al cerrar el pendiente (UX-16). |
| Ambos grupos apagados | Verde en ambos, con las dos líneas de apagado en el reporte. |
| Se planta una violación de una regla que **avisa** | Verde, y se abre un pendiente que nombra la regla y el archivo: avisar no es aprobar. |
| Se planta una violación de una regla que **bloquea** | Rojo, con regla, archivo y remedio nombrados. Y no hay tablero: el promedio no cierra bloques. |
| Tablero: se apaga una regla **con registro** | El cumplimiento puede subir, pero la **cobertura de la compuerta baja** y la cifra se publica con el asiento que lo explica. Con una sola cifra este escenario pasaría inadvertido; es la prueba de que las dos cifras existen por un motivo (D-047). |
| Tablero: dos corridas con reglamentos distintos | Las dos cifras se muestran con su huella (versión del catálogo, reglas activas y apagadas, adaptador, versiones de herramientas) y **no se grafican como una serie continua**: son dos varas distintas y decirlo es parte del resultado. |
| Tablero: reglamento inválido (regla apagada sin registro) | No emite cifras. La salida es rojo, no un tablero con un asterisco. |
| Tablero: cumplimiento alto con una regla que bloquea en rojo | El bloque **no cierra**. El tablero promedia; el verde lo decide cada regla, una por una. |
| Tablero: mejora el porcentaje por tocar solo lo automático | El porcentaje sube y la línea de verificación humana no se mueve; se reporta aparte y el reporte no suma las dos cosas en un número único. |

Lo que se mira no es solo el color: se mira que las dos líneas de apagado **existan** en el reporte. Un resultado verde sin esa línea es el único fallo que esta prueba no puede detectar sola por color, y por eso se verifica leyendo la salida.

## 12. El tablero de cumplimiento (DECIDIDO: dos cifras, D-047)

**Estado.** Decidido el 2026-10-22 en D-047: el tablero va con dos cifras, con la huella del reglamento, con trinquete, con lo humano fuera del porcentaje y con el asiento obligatorio. No autoriza a cerrar bloques. Lo que sigue es la especificación que la implementación (PND-002) tiene que cumplir.

**Qué es.** Un derivado determinista del resultado por regla que la compuerta ya emitió. No mide nada nuevo ni juzga nada nuevo: cuenta. Si el tablero pudiera cambiar el veredicto de una regla habría dos fuentes de verdad para lo mismo, que es exactamente lo que el anexo combate en UX-10 (la navegación se deriva de la matriz) y en CQ-14 (un solo lugar para el estado).

**Qué no es.** No es un criterio de aceptación. Ninguna cifra autoriza a cerrar un bloque: el verde o el rojo lo decide cada regla que bloquea, una por una. El tablero describe la tendencia y señala qué mirar. Si empieza a usarse como umbral de cierre, dejó de servir, porque el camino más corto para subir un número es apagar reglas.

**Dos cifras, nunca una.**

| Cifra | Fórmula | Qué mide | Cómo se mueve |
|---|---|---|---|
| **Cumplimiento** | reglas que pasan ÷ reglas activas | qué tan limpio está lo que se está mirando | sube cuando se arregla |
| **Cobertura de la compuerta** | reglas activas ÷ reglas declaradas en el catálogo | cuánto del anexo está realmente mirando | baja cuando se apaga una regla |

La razón de que sean dos: apagar una regla **sube** el cumplimiento y **baja** la cobertura. Con una sola cifra apagar es gratis y el tablero premia la ceguera. Con dos cifras que se mueven en direcciones opuestas, el atajo desaparece: para mostrar un tablero mejor hay que arreglar código, no apagar reglas. Y la cobertura no se puede subir sin medir.

**La huella del reglamento.** Cada registro guarda con qué vara se calculó: versión del catálogo, reglas activas y apagadas, adaptador de frontend y versiones de las herramientas. Sin eso, un 82 de ayer y un 91 de hoy no son la misma medida aunque se escriban igual: son dos reglamentos distintos y la serie es falsa. Dos cifras sin huella producen una ilusión de progreso, que es peor que no tener tablero. Si la huella cambia, el registro se marca como **no comparable** o el histórico se recalcula con la vara vigente; nunca se grafica junto sin decirlo.

**Trinquete.** El cumplimiento no baja de un bloque al siguiente sin una decisión registrada que lo explique. Es el mismo mecanismo que ya tiene la cobertura de pruebas en CQ-08: el número de hoy es el piso de mañana. Bajar no está prohibido; bajar sin registro, sí.

**Lo que no entra en la cuenta.** Lo que sólo puede juzgar una persona —la prueba del primer clic (UX-07), la prueba de tarea (UX-06), la captura (UX-27), la forma de la pregunta (UX-28) y todos los casos manuales— se registra como pasado o fallado, por bloque, con nombre y fecha, y se reporta aparte como cobertura de verificación humana. No entra en el porcentaje de cumplimiento. Si se mezclan, el resultado es un número que es sesenta por ciento medición y cuarenta por ciento opinión, y nadie puede decir cuál es cuál. Por eso la sección 9 sigue valiendo: el tablero no inventa una nota de usabilidad, cuenta reglas.

**Cómo se falsifica.** Amplía la prueba de aceptación de la sección 11:

| Escenario | Resultado exigido |
|---|---|
| Se planta una violación de una regla que bloquea | El cumplimiento baja en exactamente una regla sobre las activas, y aparece el rojo con la regla nombrada. |
| Se apaga una regla con registro | El cumplimiento puede subir; la cobertura baja en una regla sobre las declaradas; el reporte nombra la regla, el motivo y la fecha de revisión. |
| Se apaga sin registro | Rojo, y no se emite tablero: un reglamento inválido no produce cifras. |
| Mismo árbol y misma configuración, dos corridas | La misma cifra, idéntica. |
| Cambia la configuración entre dos bloques | Los dos registros quedan marcados como no comparables, o el histórico se recalcula con la vara vigente. |
| El tablero se usa como criterio de cierre | Uso indebido, no escenario válido: el verde lo decide la regla, no el promedio. |

**Dónde aparece.** En el reporte honesto del peldaño 12 (ancla 5), y en este orden: primero el veredicto binario de la compuerta, después las dos cifras, después qué está apagado y hasta cuándo, después el movimiento contra el bloque anterior con su causa nombrada. Siempre con el asiento: *bajó cuatro puntos: CQ-15, tres cadenas fuera del catálogo en la pantalla de cobro*. Una cifra sin asiento es ruido; el asiento es lo que la vuelve accionable para un dueño que no lee código.

**Riesgo declarado.** El tablero lo va a leer el dueño, que no lee código, y por eso va a querer que suba. El número se convierte en el objetivo, y el objetivo desplaza al propósito. Las defensas son las de arriba, y son cinco: dos cifras que se contradicen al apagarse, la huella que impide comparar varas distintas, el trinquete que no deja bajar sin registro, lo humano fuera del porcentaje y el asiento obligatorio, con la compuerta que no se negocia por promedio. Si alguna de las cinco se cae, el tablero se apaga: un tablero mal usado hace más daño que no tenerlo.

## 13. Registro

Toda decisión de este anexo queda en `docs/DECISIONES.md` con fecha, autor, cita textual y archivos de impacto: D-043 (forma), D-044 (mecanismo), D-045 (interruptores), D-046 (disciplina del interruptor), D-047 (el tablero con dos cifras). La implementación y sus criterios de aceptación viven en PND-002.

No queda ninguna decisión abierta: la forma (D-043 y D-044), los interruptores (D-045 y D-046), el tablero (D-047) y las severidades iniciales con el peso de la accesibilidad (D-048) están decididas. El texto viaja en los ocho idiomas y forma parte de la API de prompts, que cierra el único punto que quedaba en el calendario.
