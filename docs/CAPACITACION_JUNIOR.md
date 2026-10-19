# Urazuke — el desarrollador junior en la era posterior a la programación a mano: qué cambia en su formación, con qué objetivo capacitarlo y cómo

Autor: Pablo Kuschniroff, asistido por Claude Code. Versión 1, 18 de octubre de 2026. Este
documento acompaña al [documento principal](ESCALERA_METODOLOGICA.md) del método y a las dos
partes del curso ([proyecto nuevo](MANUAL_CURSO.md), [proyecto heredado](MANUAL_CURSO_EVOLUTIVO.md)).
Está escrito para tres lectores: el que dirige un equipo y tiene que decidir qué le enseña a la
gente que entra; el que da clases o mentoría; y el junior mismo, que quiere saber en qué
convertirse. Las palabras raras están en el glosario del documento principal. Repositorio público:
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## Por qué escribo esto

Durante treinta años, un desarrollador junior se formó de una sola manera: escribiendo código
bajo supervisión. Entraba sabiendo un lenguaje a medias, le daban tareas chicas y acotadas, un
senior le revisaba el código, y en dos o tres años de escribir y que le corrijan aprendía el
oficio. El código era a la vez el trabajo y la escuela.

Eso se terminó, y no porque los juniors ya no hagan falta, sino porque **el modelo escribe el
código**. Con mi método, el que construye no lee el código: exige evidencia. Entonces la pregunta
que me hacen, y que me hago, es honesta y urgente: si el junior ya no escribe el código, ¿cómo
aprende? ¿Y qué aprende? ¿Y para convertirse en qué?

Tengo una respuesta, y la escribo desde dos lugares. Uno, los tres sistemas que construí así, en
los que yo fui el único humano y donde vi, incidente por incidente, qué habilidades me salvaron
y cuáles no me hicieron falta. El otro, los años de enseñar ingeniería de sistemas antes de que
existieran los modelos: mucho de lo que hoy hay que enseñarle a un junior es lo que la ingeniería
de sistemas clásica siempre enseñó y la industria dejó de practicar cuando el oficio se volvió
"programar". El modelo nos obliga a volver a lo que era el oficio antes de que el teclado lo
tapara.

Una advertencia para no malinterpretarme: no estoy diciendo que el junior no tenga que saber
programar. Estoy diciendo que **ya no se forma programando**, y que lo que tiene que saber de
programación cambia de naturaleza: de oficio a alfabetización.

## Qué hacía un junior, y qué hace ahora

| | Antes | Ahora, con el método |
|---|---|---|
| **Qué produce** | Código, bajo supervisión. | Evidencia: contratos, árboles semánticos, pendientes especificados, verificaciones de completitud, decisiones escritas. El código lo produce el modelo. |
| **Cómo aprende** | Escribiendo y recibiendo correcciones sobre el código. | Dirigiendo al modelo peldaño por peldaño y recibiendo correcciones sobre la evidencia que exigió y la que aceptó sin exigir. |
| **Qué revisa el senior** | Su código. | Su criterio: qué le pidió al modelo, qué supuso el modelo sin que él lo detectara, qué aceptó como "listo" sin prueba. |
| **Cuál es su error típico** | Un bug. | Creerle al modelo. |
| **Cuánto tarda en ser útil** | Meses, hasta escribir código que no haya que reescribir. | Semanas, si entra por el método: el primer proyecto chico con los veintidós peldaños lo deja operativo. |
| **En qué se convierte** | En un programador que sabe más lenguajes y frameworks. | En alguien que puede responder por un sistema sin haber escrito una línea: un ingeniero de sistemas que dirige modelos. |

## El impacto en los focos de capacitación

Lo digo primero en una frase y después lo desarmo: **lo que pierde peso es todo lo que el modelo
hace mejor que un junior de dos años, y lo que gana peso es todo lo que el modelo hace mal y el
método existe para corregir**. Esa segunda lista no la inventé: es la lista de los fallos del
documento de referencias, mirada al revés. Cada fallo del modelo es una habilidad que el humano
tiene que tener.

### Los focos que pierden peso

- **La sintaxis y los lenguajes.** Saber un lenguaje "de memoria" era la mitad de la formación.
  Ya no: el modelo escribe en cualquiera, mejor y más rápido. Lo que queda es saber *leerlos*,
  que es otra cosa (ver más abajo).
- **Los frameworks y las bibliotecas.** Conocer la API de una biblioteca era valor de mercado. El
  modelo la conoce entera, con sus versiones. El junior tiene que saber que existen, para qué
  sirven y cuándo elegir una, no cómo se llama cada función.
- **El tipeo y la productividad de escritura.** Atajos del editor, autocompletado, generar el
  andamiaje a mano. Desapareció como foco.
- **La depuración línea por línea como oficio principal.** Sigue existiendo, pero cambia de lugar:
  ahora es la última herramienta, cuando la evidencia (el log, el test en rojo, el medidor) no
  alcanzó.
- **La memoria de "cómo se hace tal cosa".** Patrones, recetas, trucos. El modelo los tiene todos.

### Los focos que ganan peso

Los ordeno por el peldaño donde se ejercitan, porque esa es la forma de enseñarlos.

1. **Ingeniería de requerimientos** (peldaños 0, 2, 3, 5). Entrevistar a un dueño que no sabe lo
   que quiere, escribir en prosa lo que quiere, nombrar casos de uso, armar el árbol semántico
   del negocio, especificar un pendiente con sus criterios de aceptación en la forma "dado,
   cuando, entonces", distinguir un dato primario de uno derivado y pedir el primario en vez de
   estimarlo. Es la habilidad número uno, y es la que la industria dejó de enseñar hace veinte
   años. El modelo es pésimo en esto por diseño: completa los huecos con lo más probable, y lo
   más probable no es lo que el negocio necesita.
2. **Diseño de la verificación** (peldaños 7, 9, 10, 19). No escribir el test: saber qué test
   demuestra qué, por qué un test tiene que verse en rojo antes de valer, qué es una prueba de
   punta a punta y qué es una simulación que no prueba nada, qué número decide algo y con qué
   instrumento se mide, cómo se lee un reporte y se distingue lo verificado de lo creído. El
   junior tiene que poder decir "ese test no prueba lo que decís" sin leer el test.
3. **Lectura de evidencia** (todos los peldaños). Leer un reporte del modelo con desconfianza
   entrenada: encontrar la afirmación sin prueba, el "debería funcionar" disfrazado de
   verificado, el punto ciego no declarado, el "listo" que no era [Ref. 43](REFERENCIAS.md#ref-43).
   Esta habilidad no existía como foco de formación porque no había nadie que mintiera con tanta
   seguridad y tan buena redacción.
4. **Dimensionamiento y operación** (peldaños 3, 4, 13, 16 a 21). Qué es un entorno, cómo se
   despliega, qué es la integración continua, qué se mide en producción, qué es un índice, un
   punto de ruptura, un umbral de alerta. Antes era territorio de otro rol; ahora el junior
   dirige al modelo que lo hace, y tiene que saber qué pedirle y cómo verificar que lo hizo.
5. **Seguridad y consecuencia** (peldaños 12, 18). Qué acciones del sistema actúan sobre el
   mundo, qué es un candado, qué es fail-closed, qué es una vulnerabilidad y por qué una
   actualización de dependencia es un cambio.
6. **Decisión y comunicación con el dueño** (peldaños 1, 6, 14). Preguntar bien, con
   recomendación y alternativa; escribir una decisión con palabras textuales, fecha y dueño;
   escribir un manual que una persona que no programa pueda seguir. El junior es, en el método,
   el traductor entre el dueño y el modelo, y la traducción se hace en los dos sentidos.
7. **Inglés instrumental.** Los prompts del método están en inglés, porque los modelos siguen
   instrucciones con más precisión en inglés. No hace falta hablarlo; hace falta leer un prompt
   y entender cada cláusula, y poder escribir una cláusula nueva cuando el caso lo pide.
8. **El catálogo de fallos del modelo.** Reconocer, por su olor, cada forma en que el modelo se
   equivoca: supone en vez de preguntar, inventa un dato primario, reporta de más, hace "ya que
   estoy" fuera del alcance, refactoriza lo que no se pidió, mejora tus palabras, cierra sin
   evidencia, se queda en silencio cuando no sabe. Las cuatro correcciones que hice en sesión y
   que se volvieron reglas [Ref. 45](REFERENCIAS.md#ref-45) son el ejemplo: cada una es un fallo
   que un junior formado tiene que detectar en el primer reporte.
9. **Costo como presupuesto.** Tokens, cuota de integración continua, tiempo del dueño. El
   junior que no mira el costo repite el equipo multiagente que gastaba el doble y entregaba la
   mitad [Ref. 6](REFERENCIAS.md#ref-6).

### Lo que el junior sí tiene que saber de programación: alfabetización, no oficio

Acá está el matiz que más me importa, y el que más se malinterpreta. Un junior que nunca escribió
código no sabe cuándo el modelo miente *en* el código, y el método tiene un momento, que hoy marco
como hipótesis en el documento principal, en que el humano sí tiene que mirar. Por eso la
alfabetización mínima no es negociable. La lista:

- **Leer código**, no escribirlo: seguir una función, entender un condicional, reconocer un bucle,
  ver dónde se hace una consulta a la base. Como leer un contrato sin ser abogado.
- **Cómo corre un sistema**: qué es un servidor, un proceso, una base de datos, una petición HTTP,
  un navegador, una tarea programada. Dónde vive cada cosa.
- **Git**: qué es un commit, una rama, un push, un historial. Lo suficiente para leer el rastro de
  evidencia que el método deja ahí.
- **SQL básico**: leer una consulta y entender qué tabla lee y con qué filtro. Es el idioma de
  los datos, y de los números del peldaño 9.
- **La terminal**: correr un comando que el modelo te dio y leer su salida. Si el junior no puede
  correr el medidor, no puede verificar el número.
- **Depuración como última herramienta**: cuando el log, el test y el medidor no alcanzaron, abrir
  el código con el modelo al lado y leer juntos.

Se enseña en dos o tres semanas, se practica durante todo el curso, y no es el oficio: es la
alfabetización que permite ejercerlo.

## Con qué objetivo capacitar a un junior

Lo digo sin rodeos, porque de la claridad del objetivo depende todo lo demás. El objetivo de
capacitar a un junior en la era posterior a la programación a mano es formar a alguien que
**pueda responder por un sistema en producción sin haber escrito una línea de su código**: que
pueda llevar un proyecto chico por los veintidós peldaños de punta a punta, dirigiendo a un
modelo, exigiéndole evidencia en cada paso, decidiendo con el dueño, y sabiendo en todo momento
qué está verificado, qué está creído y qué no se ve. Yo lo llamo, provisoriamente, *dueño
técnico de la evidencia*: el que no lee el código y sin embargo puede decir, con pruebas en la
mano, que el sistema hace lo que el negocio pidió y va a seguir haciéndolo mañana.

Tres consecuencias del objetivo, que ordenan la capacitación:

1. **El artefacto de evaluación es la evidencia, no el código.** Un junior se evalúa por el
   contrato que escribió, el árbol que armó, el pendiente que especificó, el rojo que exigió, el
   reporte que no aceptó. La rúbrica del anexo A del manual del curso ya lo dice: no subido,
   subido, subido con evidencia de criterio. Ese tercer nivel, poder contar un caso en que el
   modelo se equivocó y cómo lo detectó, es el objetivo de verdad.
2. **El reflejo se forma con incidentes, no con teoría.** Nadie aprende a desconfiar del modelo
   leyendo que hay que desconfiar; aprende cuando el modelo le dice "listo" y no era, y lo
   descubre en el entorno de prueba. Por eso el curso tiene pruebas a propósito (dejar una
   pregunta sin contestar y ver qué hace el modelo; dejar supuestos en el relevamiento), y por
   eso la capacitación tiene que tener incidentes diseñados, no solo tareas que salgan bien.
3. **El junior se forma en el método entero, no en un tramo.** La tentación es ponerlo "a hacer
   pendientes" en el bucle, que es lo más parecido a darle tareas chicas de código. Es un error:
   el bucle sin el arranque es construir sobre arena, y el junior que nunca hizo un peldaño 0 o
   un 3 no entiende por qué el 5 tiene la forma que tiene. Los dos proyectos guía existen para
   eso: uno nuevo y uno heredado, de punta a punta, los veintidós peldaños y las ocho estaciones.

## Cómo capacitarlo: el plan

Lo que sigue es el plan que usaría, y que voy a usar con la primera cohorte. Doce semanas de
trabajo parcial, con un mentor, sobre los dos proyectos guía del curso, y después un proyecto real
chico con un dueño de verdad.

### Semanas 1 y 2: alfabetización y el modelo como objeto de estudio

- La alfabetización de arriba: leer código, cómo corre un sistema, git, SQL básico, la terminal.
  Con el modelo al lado, explicando; el junior no escribe, lee y corre.
- **El modelo como objeto de estudio**: una semana de hacerle pedidos al modelo con el único
  propósito de verlo fallar. Pedirle un dato que no tiene y ver si lo inventa. Darle un pedido
  ambiguo y ver si pregunta. Pedirle que cierre algo y ver si dice "listo" sin prueba. Pedirle
  que arregle un bug sin reproducirlo. Cada fallo se anota con su olor. Al final de la semana el
  junior tiene su propio catálogo, y es el catálogo del documento de referencias, descubierto.
- Lectura del documento principal, con el glosario a mano, y de las referencias: la historia de
  dónde sale cada regla.

### Semanas 3 a 8: el proyecto nuevo, con mentor

El manual del curso, parte 1, tal cual, sobre el proyecto guía "Turnera" o sobre un proyecto
propio chico. Los veintidós peldaños. Con tres reglas de mentoría:

- **El mentor revisa evidencia, no código.** Lee el contrato de convivencia, el árbol semántico,
  la especificación de tres pendientes, el reporte de cierre de un pendiente, el informe de la
  auditoría, el reporte de la prueba de carga. Y hace una sola pregunta cada vez: "¿cómo sabés
  que esto es cierto?". Si la respuesta es "porque el modelo lo dijo", el peldaño no está subido.
- **El mentor diseña incidentes.** Una vez por semana, sin avisar, altera algo: cambia un dato
  del relevamiento, mete un supuesto en la volumetría, pide un cambio fuera del alcance a través
  del modelo. El junior tiene que detectarlo por la evidencia.
- **El junior lleva su propio registro de fallos del modelo**: cada vez que lo atrapó, qué olor
  tenía, en qué peldaño. Al final del proyecto ese registro es su retrospectiva personal, y la
  propuesta de cambio a la escalera (peldaño 15) la escribe él.

### Semanas 9 a 11: el proyecto heredado, con menos mentor

El manual, parte 2: la Turnera heredada, o un legado real chico. El tramo de normalización y los
dos primeros bloques. Acá la mentoría baja: el mentor lee el mapa recuperado y las discrepancias,
el informe de la auditoría con sus marcas de velocidad, y el cierre del primer bug en modo
correctivo. El objetivo de estas semanas es que el junior aprenda lo que el proyecto nuevo no
enseña: a leer un sistema ajeno a través del modelo, a decidir con el dueño qué de lo que el
código hace está mal y qué era una regla olvidada, y a no reescribir.

### Semana 12: el proyecto real, solo

Un proyecto chico de verdad, con un dueño de verdad que tiene quince minutos por día, de punta
a punta. El mentor no interviene; lee la retrospectiva con números al final. Si el junior llega
a producción con las veintidós condiciones de la lista de salida en "sí", está formado. Si no,
la lista dice exactamente qué peldaño volver a subir, y eso también es formación.

### Qué mide el progreso

No cuántos pendientes cerró. Tres cosas, en este orden:

1. **Cuántas veces atrapó al modelo**, y en qué peldaño. Un junior que en seis semanas no atrapó
   al modelo ninguna vez no está mirando: el modelo falla siempre.
2. **Cuánto le costó al dueño.** Minutos por día de preguntas; si suben, el junior está
   trasladando al dueño lo que el método le pide resolver a él (peldaño 1).
3. **La calidad de su propuesta de cambio a la escalera.** Es el indicador de criterio: un junior
   que propone un cambio concreto, justificado con un incidente propio, entendió el método como
   algo vivo y no como una lista.

## El impacto en los roles y en el equipo

Lo digo porque el que dirige un equipo me lo va a preguntar. Si el junior se forma así, el equipo
cambia de forma:

- **El junior** deja de ser "el que escribe lo fácil" y pasa a ser el que lleva un proyecto chico
  entero con el método. Es más valioso antes, y es más peligroso antes, porque dirige un modelo
  que construye rápido; por eso el método es la condición, no un agregado.
- **El senior** deja de revisar código y pasa a tres cosas: escribir y mantener los contratos (el
  de convivencia, las compuertas, los candados), auditar con otra sesión (peldaño 11) y decidir
  lo que el junior no puede decidir (arquitectura, el "por diez", qué bloquea). Su valor se mueve
  del teclado al criterio, que es donde siempre estuvo en los buenos.
- **El equipo se achica y se aplana.** Un senior y dos o tres juniors con método llevan lo que
  antes llevaba un equipo de ocho. Lo vi en mis propios números cuando eliminé un equipo entero
  de agentes [Ref. 6](REFERENCIAS.md#ref-6): la misma lógica aplica a los humanos que dirigen
  modelos.
- **El dueño del dominio entra al equipo.** Con quince minutos por día, pero entra, porque el
  método lo requiere. Capacitar a un junior incluye enseñarle a conseguir esos quince minutos y
  a no gastarlos.

## Los riesgos, dichos sin suavizar

- **El junior que nunca escribió código y no sabe cuándo mirar.** Es el riesgo principal, y lo
  mitigo con la alfabetización obligatoria y con el ejercicio de depuración como última
  herramienta. Pero lo marco como hipótesis: todavía no sé cuánto código hay que haber escrito
  para leer bien el que escribe otro. Sospecho que poco, y sospecho que lo que importa no es
  haber escrito sino haber *depurado*.
- **La dependencia de una herramienta.** El método es neutral de herramienta a propósito. Un
  junior formado en una sola herramienta aprende sus atajos y no el método; la formación tiene
  que pasar por al menos dos.
- **El costo invisible.** Un junior con un modelo gasta tokens como si fueran gratis. El
  presupuesto de tokens tiene que ser parte de la formación desde la semana 1, con el número a la
  vista.
- **La ilusión de velocidad.** El modelo construye en una tarde lo que antes llevaba una semana,
  y el junior puede creer que terminó. La lista de salida a producción, con sus veintidós
  condiciones, es el antídoto: "terminado" tiene una definición, y no es "funciona".
- **El mentor que revisa código por costumbre.** Es el riesgo del lado del senior, y es serio: un
  mentor que lee el código le enseña al junior que la evidencia no alcanza, que es exactamente lo
  contrario del método. El mentor tiene que formarse en el método antes que el junior.

## Lo que falta elaborar `[hipótesis]`

1. Cuánta programación hay que haber hecho para leer bien el código de otro. Mi intuición es que
   lo que importa es haber depurado, no haber escrito, y que alcanza con poco. Sin datos todavía.
2. El plan de doce semanas está escrito desde mis proyectos y desde lo que enseñé antes de los
   modelos, no desde una cohorte. La primera lo va a corregir, igual que al curso.
3. Si el "dueño técnico de la evidencia" es un rol nuevo o es el ingeniero de sistemas de siempre
   con otra herramienta. Me inclino por lo segundo, y entonces el nombre sobra; pero el mercado
   va a necesitar un nombre, y prefiero proponer uno antes de que proponga uno peor.
4. Qué pasa con el junior que entra a un equipo que no usa el método. Este documento asume que
   el equipo lo adopta; si no, el junior formado así va a chocar con un senior que le pide código.
   No tengo respuesta, salvo que el método está publicado para que ese senior lo lea.
