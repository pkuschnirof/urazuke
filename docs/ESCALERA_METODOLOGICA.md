# Urazuke, el método de la evidencia — la escalera metodológica (versión 4)

Autor: Pablo Kuschniroff, asistido por Claude Code. Versión 4, 18 de octubre de 2026. Este es un
documento de trabajo que voy a seguir puliendo con cada proyecto que lo use; nada de lo que dice
es doctrina cerrada todavía, aunque sí es, hasta donde yo sé, el primer destilado honesto de un
método que ya tiene tres sistemas en producción a sus espaldas.

Antes de entrar en materia, una advertencia sobre cómo está escrito, porque importa. Lo escribí
para personas que no vivieron estos proyectos conmigo: gente que quiere construir software con
inteligencia artificial y que ese software dure, no gente que quiere aprender a programar ni
coleccionar trucos de prompts. Por eso me tomo el tiempo de explicar, repito cuando hace falta,
uso el lenguaje de todos los días, y dejo al final un **glosario** con cada sigla y cada expresión
coloquial que se me escapa. Si en algún momento te topás con una palabra rara —"trinquete",
"candado", "fail-closed", "PND"—, andá al glosario; está todo ahí. Y cuando leas una marca como
[Ref. 26](REFERENCIAS.md#ref-26), sabé que es un atajo a un caso real que cuento en el documento
de referencias, con su fecha y su evidencia; podés ignorarla sin perder el hilo o seguirla si te
interesa el detalle.

El repositorio público del método es
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke). Ahí están este
documento, los contratos de cada peldaño, el manual del curso y las referencias, en los ocho
idiomas de NAC3.

## El nombre

**Urazuke** (裏付け) es una palabra japonesa que nombra el respaldo que tiene una afirmación: lo
que la sostiene por detrás (literalmente, "el forro de atrás"). El verbo *urazukeru* es
"respaldar con pruebas". La elegí el 17 de octubre de 2026, después de descartar varios nombres
por colisiones con empresas y proyectos existentes, y la elegí porque dice exactamente lo que el
método pide: que cada afirmación del modelo venga con su respaldo, y que el respaldo se pueda
verificar sin leer el código. El nombre no se traduce; el subtítulo, "el método de la evidencia",
sí: *the evidence method*, *o método da evidência*, *la méthode de la preuve*, *die
Nachweis-Methode*, *il metodo del riscontro*, 裏付けの方法, 验证方法. En este documento, "la
escalera" es la estructura del método —sus dieciséis peldaños— y "Urazuke" es el método entero.

## De qué se trata

Quiero ser claro sobre lo que estoy enseñando y lo que no. No estoy enseñando una herramienta.
Estoy enseñando un **método**: qué hacer en qué orden, qué pedirle al modelo en cada momento, qué
tiene que entregarte, y cómo saber —sin leer código— que lo que te entregó está completo. La
apuesta es que cualquier persona, con cualquier herramienta de inteligencia artificial que sirva
para programar, pueda construir software conversando con un modelo en vez de tipear el código a
mano, y que lo que salga sea robusto, esté listo para producción y, esto es lo importante,
**no requiera que el dueño del proyecto revise una sola línea de código**.

Suena ambicioso, y lo es. Pero tengo algo que casi nadie tiene: tres sistemas reales que construí
exactamente así, que hoy funcionan con clientes de verdad, y de los que extraje cada regla que
sigue. Así que la pregunta que me hago no es "¿se podrá?", porque ya se pudo. La pregunta es
"¿qué hice, en qué orden, y qué de todo eso es lo que realmente hizo la diferencia?". Esta
escalera es mi respuesta, y es la base de tres cosas: la documentación del método, la práctica que
van a hacer los alumnos del curso, y los manuales. Más adelante la voy a exportar como un flujo
de ejecución dentro de mi herramienta, para que sea la herramienta la que guíe el método y no la
memoria de uno.

## De dónde sale el método, y qué no quiero que se malinterprete

Hay una lectura fácil de todo esto que quiero desarmar antes de que se instale: la de que el
método es una colección de parches que fui poniendo después de cada golpe. No es así, y me
importa decirlo con precisión porque cambia cómo hay que leer cada peldaño.

El método sale de dos factores que se combinaron, y ninguno de los dos alcanza solo. El primero es
**mi propio conocimiento de la ingeniería de sistemas**. Llevo muchos años aplicando lo que
cualquiera que venga de sistemas reconoce enseguida: relevamiento antes de diseñar, requisitos
escritos, dimensionamiento con números, diseño, construcción, pruebas como evidencia, despliegue
reproducible, operación, auditoría periódica, documentación como parte del producto. La mayor
parte de lo que exijo en los dieciséis peldaños es lo que siempre exigí en un proyecto bien
llevado. No lo inventé para los modelos; lo traje de antes.

El segundo factor es lo que los incidentes de estos cinco meses me mostraron, uno tras otro:
**dónde los modelos aplican esos principios de manera frágil**. Un modelo sabe perfectamente qué es
un test, qué es una causa raíz, qué es un dimensionamiento; si le preguntás, te lo explica mejor
que muchos ingenieros. Pero en la práctica dice que probó y no probó, estima con cara de seguro un
dato que solo el negocio tiene, llena un hueco en las reglas de negocio con lo que le pareció
razonable, reporta de más porque fue entrenado para ser útil, y construye un medidor que miente
sin darse cuenta. Cada uno de esos casos, que cuento en las [referencias](REFERENCIAS.md), me dijo
exactamente dónde había que apretar: dónde un principio que para mí era obvio necesitaba
convertirse en una cláusula explícita del prompt, en una compuerta, en una verificación que yo
hago sin leer código.

Entonces, cuando en un peldaño digo "esto lo impuse después de tal incidente", no estoy diciendo
que el principio nació ahí. Estoy diciendo que ahí comprobé que el modelo no lo aplicaba solo, y
que había que exigírselo por escrito. El método es ingeniería de sistemas de siempre, aplicada con
la rigidez que hace falta para un constructor que no se cansa y al que no se le puede creer sin
evidencia. Las cicatrices son la prueba de dónde hace falta la rigidez, no el origen de los
principios.

## Los tres casos de uso del método

Antes de seguir, una bifurcación que en las primeras versiones no estaba y que un lector me pidió
con razón. Este documento describe la escalera mirando una carpeta vacía: el peldaño 0 decide si
el proyecto se encara, el 4 despliega el esqueleto sin funcionalidad, el 5 abre el primer bloque.
Es el caso más claro para aprender, y no es el más frecuente. El método tiene tres casos de uso, y
conviene saber en cuál estás antes de abrir el agente, porque cambia por dónde se entra:

1. **Proyecto nuevo.** Carpeta vacía y un dueño con un pedido. Se entra por el peldaño 0 y se
   suben los dieciséis en orden. Es lo que describe este documento, con sus contratos y el manual
   del curso.
2. **Evolutivo-correctivo sobre un sistema hecho con el método.** El sistema ya subió la escalera:
   tiene contrato, mapa, pendientes cerrados con evidencia, batería, despliegue y manuales. Se
   entra por el peldaño 5, abriendo un bloque, y se sigue el bucle; el 11 periódico; el 15 al
   cierre de cada etapa. Es la fase 4 de la línea de tiempo (Parte B).
3. **Evolutivo-correctivo sobre un sistema hecho sin el método.** Un sistema que corre, con
   usuarios, hecho por otro o por uno mismo sin evidencia, al que hay que corregir o hacer crecer.
   No se entra por el 0 ni por el 5: se entra por un **tramo de normalización** de ocho estaciones
   (N0 a N7) que recupera, por autodescubrimiento y con marcas de fuente, todos los insumos que
   los peldaños del arranque producen, arma un cinturón de seguridad alrededor del sistema sin
   reescribirlo, y recién después abre el bucle en modo correctivo o evolutivo. Ese camino está
   en una página propia, el [camino evolutivo-correctivo](EVOLUTIVO_CORRECTIVO.md), y tiene su
   parte del curso con un segundo proyecto guía.

Lo que queda afuera, nombrado: la migración tecnológica no es un caso de uso del método; es otro
proyecto, y en general cae en los criterios excluyentes del peldaño 0.

## La IA no interrumpe el método: lo continúa

Esta es la tesis que abre todo, y la pongo primero porque desarma la objeción más común antes de
que aparezca: "¿cómo vas a confiar en código que escribió una máquina?".

Mi respuesta es que **la industria ya dejó de confiar en el autor del código hace veinte años**.
Cuando el grueso de la escritura pasó a equipos junior, tercerizados o rotativos, la revisión
línea por línea se volvió imposible de sostener. Y lo que creció en su lugar fue todo lo que hoy
damos por sentado: los tests automatizados, la integración continua, los criterios de aceptación,
los pipelines que no dejan pasar nada sin verde, el "shift left" de las pruebas, el control de
calidad como función independiente. Esa fue la respuesta de la ingeniería de sistemas a "el que
escribe no es confiable": no leerle el código, exigirle evidencia.

Poner a un modelo a escribir, entonces, no es un salto al vacío. Es cambiar un autor en el que ya
no confiábamos por otro en el que tampoco, y para el cual **ya teníamos armado el aparato de
verificación**. Eso debería tranquilizar, no inquietar. Y encima el nuevo autor es más barato, más
rápido, y —a diferencia del junior— no se ofende cuando le pedís que pruebe en rojo.

Por eso este método se apoya, sin disimulo, en la ingeniería de sistemas clásica. El esqueleto es
el de siempre. No podía ser de otra manera, porque los problemas son los de siempre: no saber
cuántos datos va a haber, no saber qué quiere el cliente, no saber si lo que se construyó es lo
que se pidió. La IA no cambió los problemas; cambió quién hace cada parte y a qué costo. Hasta el
criterio de elegibilidad X2 del peldaño 0 es ingeniería clásica: testeabilidad como condición de
contrato.

### Qué es viejo y qué es nuevo en esto

Lo viejo, y conviene decir que es viejo: el esqueleto de etapas, la independencia del que verifica
respecto del que construye, los tests como evidencia, la documentación como parte del producto, el
relevamiento antes del diseño.

Lo que sí cambia, y es donde está mi aporte, son tres cosas:

1. **Dónde va el esfuerzo del humano.** En el método clásico el humano escribe la especificación,
   escribe el código, y otro humano lo revisa. Acá el humano hace dos cosas solamente: **decide, y
   verifica artefactos**. Todo lo demás —redactar, construir, probar, medir, documentar— lo hace el
   modelo. Por eso cada peldaño termina en una "verificación de completitud sin leer código": es
   el lugar exacto donde el humano sigue siendo imprescindible, y ninguno más.

2. **El autor también fabrica la evidencia.** Este es el único punto genuinamente nuevo, y es el
   matiz que justifica tres peldaños enteros. El junior escribía código dudoso, pero no fabricaba
   la evidencia: los tests y las mediciones los armaba otro, o al menos otro los miraba. El modelo,
   en cambio, produce el código *y* el test *y* el medidor *y* el reporte, en la misma sesión, con
   la misma seguridad en la voz cuando está bien y cuando está mal. Lo vi: el medidor que mintió
   dos veces [Ref. 36](REFERENCIAS.md#ref-36), el error de autenticación reportado como "éxito"
   [Ref. 43](REFERENCIAS.md#ref-43), las tres de cuatro aseveraciones que estaban mal. Entonces
   "revisar evidencia en vez de código" sigue siendo el principio correcto, pero **la evidencia
   tiene que probarse a sí misma**: el test visto en rojo (peldaño 7), el instrumento con su
   guarda (peldaño 9), el reporte que separa lo verificado de lo creído (peldaño 10), el auditor
   distinto del constructor (peldaño 11). No es una inquietud nueva: es la misma disciplina de
   independencia del control de calidad, llevada un paso más adentro.

3. **El costo de los artefactos.** En el método clásico la documentación era cara, entonces se
   hacía una vez y envejecía. Acá regenerarla es gratis, entonces la regla pasa a ser "en el mismo
   commit" y "reproducible a mano, sin IA". Lo que antes era un ideal incumplible pasa a ser una
   compuerta.

Para el curso y para la presentación pública, esto define el posicionamiento con honestidad: no es
"la nueva forma de programar"; es **ingeniería de sistemas aplicada a un constructor que no se
cansa y al que no se le puede creer**. A los que vienen de sistemas les suena familiar y les baja
la desconfianza; a los que vienen del vibecoding les da lo que no tienen, que es justamente el
esqueleto. Y me diferencia de las herramientas que venden velocidad y omiten el esqueleto entero.

---

## Parte A — Cómo leer cada peldaño

Cada peldaño tiene ocho partes, siempre las mismas, para que se puedan comparar:

- **Intención**: qué busca, en una frase.
- **Cuándo**: en qué momento del proyecto se sube, y si se sube una vez o se repite. Esta parte
  es nueva en la versión 4 y la explico en detalle en la Parte B, porque un método sin línea de
  tiempo es una lista de buenas intenciones.
- **Entradas**: qué tiene que existir antes para poder subirlo.
- **Artefacto**: qué queda escrito o ejecutable cuando se sube. Siempre es algo concreto: un
  archivo, un test, un script.
- **Compuerta**: qué tiene que ser verdad para pasar al siguiente. Si no se cumple, no se sube.
- **Quién decide**: el dueño del proyecto, el agente, o nadie porque es automático.
- **Fallo que evita**: el tipo de problema que el peldaño previene, con una referencia corta al
  caso real donde lo comprobé.
- **Contrato**: el archivo donde está cómo se ejecuta: contexto, prompts, resultado, verificación,
  señales de alarma.

Dos aclaraciones importantes. Primero: **la escalera es neutral respecto de la herramienta**. Cada
artefacto es un archivo, un test o un script; ninguno exige mi herramienta ni ninguna otra. Forge
los automatiza (las compuertas, los comandos, el registro de pendientes), pero el peldaño existe
sin Forge. Segundo: **los peldaños no son estrictamente secuenciales**. Hay tres tramos: los del 0
al 4 son de arranque y se suben una vez por proyecto; los del 5 al 10 son el bucle que se repite
con cada cambio; y los del 11 al 15 son de operación, cuando el sistema ya está vivo. El 15 cierra
el ciclo y vuelve al 0 para el próximo proyecto. Pero "no estrictamente secuenciales" no quiere
decir "en cualquier orden": la Parte B dice exactamente cuándo se sube cada uno y qué pasa en el
medio.

---

## Parte B — La línea de tiempo: cuándo se sube cada peldaño y qué pasa entre medio

Esta parte no existía en las versiones anteriores, y su ausencia era un defecto serio: el método
decía qué hacer y cómo verificarlo, pero no decía **cuándo**. Y "cuándo" es la mitad de un método.
Un lector que se lo tomara al pie de la letra podía subir los dieciséis peldaños uno tras otro y
preguntarse en qué momento se hace, entonces, la infraestructura, la cadena de integración y
despliegue continuos, la ingesta de los requerimientos, el desarrollo de la funcionalidad, las
pruebas de punta a punta de todos los flujos, la mirada humana sobre las pantallas, y las pruebas
humanas de aceptación. Todo eso pasa, y pasa en momentos precisos, entre los peldaños y dentro de
ellos. Acá lo escribo.

### B.1 Las cinco fases de un proyecto

Un proyecto llevado con este método pasa por cinco fases. Las tres del medio son las que
corresponden a los tres tramos de la escalera; las dos de los extremos son la ingesta inicial y la
vida en producción, que el método también cubre aunque no sean "peldaños" en sí.

| Fase | Duración típica en un proyecto chico | Peldaños que se suben | Qué más pasa en esa fase |
|---|---|---|---|
| 0. Ingesta | de dos días a una semana, en paralelo con la fase 1 | ninguno todavía; es la materia prima del 0, el 2, el 3 y el 5 | Relevamiento del negocio con el dueño, con los métodos clásicos de la ingeniería de requerimientos (ver B.5): entrevistas, casos de uso o historias de usuario, modelo de dominio, prototipos de pantalla. Se escribe en prosa, incompleto a propósito; el agente lo completa preguntando. |
| 1. Arranque | una semana, de corrido | 0, 1, 2, 3, 4 | Elegibilidad, contrato, definición, dimensionamiento. Y **toda la infraestructura inicial**: el repositorio, el entorno de prueba, la integración continua, el primer despliegue con el sistema vacío. |
| 2. Bucle | de tres a seis semanas, en bloques funcionales de una a dos semanas | 5, 6, 7, 8, 9, 10 con cada cambio | Desarrollo funcional bloque por bloque; tests en rojo; pruebas de punta a punta del flujo recién construido; mirada humana sobre cada pantalla nueva; al cierre de cada bloque, pruebas humanas en el entorno de prueba. |
| 3. Salida a producción | una semana | 11, 12, 13, 14 | Auditoría por otra sesión; candados sobre todo lo que actúa sobre el mundo; cierre de la cadena de despliegue a producción con vuelta atrás probada; los tres manuales; pruebas de aceptación con el dueño sobre todos los flujos. |
| 4. Operación | mientras el sistema viva | 15, y el bucle (5 a 10) para cada evolución; 11 periódico | Agente residente; auditoría cada uno o dos meses; cada cambio nuevo entra por el bucle completo y sale por la cadena de despliegue; retrospectiva al cierre de cada etapa. |

Esta tabla es la del proyecto nuevo. Cuando el sistema ya existe y no nació con el método, las
fases 0 y 1 se reemplazan por el tramo de normalización (tres semanas para un sistema chico:
lectura, cinturón, medir y ordenar) que está en el [camino evolutivo-correctivo](EVOLUTIVO_CORRECTIVO.md);
las fases 2, 3 y 4 son las mismas.

Los tiempos son para un proyecto chico, del tamaño del proyecto guía del curso. En un proyecto
con usuarios y consecuencias, el bucle se alarga y las fases 1 y 3 se mantienen casi iguales,
porque lo que crece es la funcionalidad, no la infraestructura ni el cierre.

### B.2 Qué pasa entre peldaño y peldaño

Acá está lo que faltaba. Para cada fase, qué tareas de cada tipo se hacen y en qué momento exacto
respecto de los peldaños. Leé la tabla por filas: cada fila es un tipo de trabajo, y cada celda
dice cuándo se hace dentro de esa fase.

| Tipo de trabajo | Arranque (peldaños 0 a 4) | Bucle (peldaños 5 a 10, por bloque) | Salida a producción (11 a 14) | Operación (15 y bucle) |
|---|---|---|---|---|
| **Ingesta de requerimientos** | Antes del peldaño 0: relevamiento en prosa con el dueño, con entrevistas, casos de uso y modelo de dominio. Se completa en el 2 (definición y árbol semántico) y en el 3 (volumetría). | Al abrir cada bloque: el pedido del cliente para ese bloque, tal como lo diría él, se convierte en pendientes con **especificación detallada** (peldaño 5): descripción, criterios de aceptación, reglas aplicables, datos, pantallas, casos borde. Las preguntas que el agente hace son la ingesta fina. | Antes del 12: relevamiento de las acciones con consecuencia. Antes del 13: relevamiento de entornos y accesos. | Cada pedido nuevo entra como pendiente especificado, colgado de su nodo del árbol semántico; el agente residente recoge lo que los usuarios piden. |
| **Infraestructura** | Toda la inicial, en el peldaño 4: repositorio, estructura, entorno de prueba, credenciales, dominio de prueba. No se construye funcionalidad hasta que el esqueleto vacío está desplegado. | Ninguna, salvo que un bloque la exija (una cola, un servicio externo). Si la exige, es un pendiente con su test. | En el 13: entorno de producción, secretos en el servidor, dominio real, backups, monitoreo mínimo. | Cambios de infraestructura entran por el bucle y por el 13; nunca "a mano, rápido". |
| **Cadena CI/CD** | En el peldaño 4: la integración continua corre la batería en cada push desde la primera semana, y el despliegue al entorno de prueba es automático al fusionar. | Funciona sola. Cada commit la atraviesa; si no está en verde, el bloque no cierra. | En el 13 se completa: el despliegue a producción espera el resultado de la integración y solo empaqueta; la promoción es un procedimiento escrito; la vuelta atrás se prueba. | Cada despliegue sigue la rutina del 13: prueba en verde con la misma versión, vuelta atrás lista, verificación de punta a punta en producción después. |
| **Desarrollo funcional** | Ninguno. El esqueleto se despliega vacío a propósito. | Es el centro del bucle: el agente toma un pendiente (5), pregunta las reglas de negocio que faltan (6), construye, y cierra con evidencia (7, 8, 9, 10). Bloque por bloque, de lo básico a lo que tiene consecuencias. | Lo que actúa sobre el mundo (cobrar, enviar) se construye en el bucle **después** del peldaño 12, con sus candados, y arranca en modo de ensayo. | Las evoluciones entran por el bucle. |
| **Pruebas automáticas** | Un test de humo que pasa, en el 4. Es la semilla de la batería. | Con cada pendiente: el test probado en rojo (7), la regresión de los vecinos en la misma sesión, y **una prueba de punta a punta del flujo recién construido**, desde la pantalla hasta el backend. Al cerrar un bloque: la batería completa de punta a punta de **todos** los flujos existentes, en el entorno de prueba. | Antes del primer despliegue a producción: la batería completa de punta a punta de todos los flujos, en verde, con la misma versión que se va a promover. Después del despliegue: una verificación de punta a punta sobre producción, en solo lectura. | Con cada cambio, lo mismo que en el bucle. |
| **Vista humana de las pantallas** | Al cierre del 4: el dueño abre la URL del entorno de prueba y ve la pantalla vacía. Parece trivial y es la primera vez que alguien que no es el agente mira el sistema. | **Con cada pendiente que toca una pantalla**: el agente entrega una captura real del entorno de prueba y el dueño la mira. Diez segundos. Es la forma más barata de encontrar lo que ningún test encuentra: que el botón está donde no debe, que el texto dice otra cosa, que el flujo no es el que el negocio imaginaba. | En el 14: las capturas del manual de usuario son la última mirada humana sistemática antes de producción. | Cada pantalla nueva o cambiada, igual que en el bucle. |
| **Pruebas humanas** | Ninguna todavía, salvo abrir la pantalla vacía. | **Al cierre de cada bloque funcional**: el dueño, o un usuario de confianza, usa el sistema en el entorno de prueba como lo usaría de verdad, siguiendo los flujos del bloque. Lo que encuentra se anota como pendientes. No se abre el bloque siguiente con hallazgos humanos sin pendiente. | Antes del primer despliegue a producción: **pruebas de aceptación** del dueño sobre todos los flujos, con datos de prueba realistas, en el entorno de prueba. Y en el 14, una persona que no programa sigue el manual de recuperación. | Con cada evolución, al cierre de su bloque. |
| **Decisiones del dueño** | En el 0 (va o no va), el 1 (el contrato), el 2 (qué NO es), el 3 (la opción de arquitectura). | Cada vez que el agente frena por una regla de negocio no escrita (6). Suelen ser dos o tres por bloque. | En el 12 (candado por candado), en el 13 (promover a producción), en el 15 (el nivel del agente residente). | Las que surjan; siempre escritas. |

Un detalle que quiero subrayar porque es donde más se equivoca la gente que viene del vibecoding:
**las pruebas de punta a punta de todos los flujos no son una sola vez al final**. Son tres veces,
en tres escalas. Con cada pendiente, el flujo que ese pendiente tocó. Al cierre de cada bloque,
todos los flujos que existen hasta ahí. Y antes de producción, todos los flujos con la versión
exacta que se va a promover. Si solo hacés la tercera, llegás al final con un sistema que nadie
probó de punta a punta durante semanas y la salida a producción se convierte en una semana de
arreglos.

### B.3 El ritmo del bucle: un bloque funcional típico

Un bloque funcional es un conjunto de entre cuatro y ocho pendientes relacionados, que juntos
hacen algo que el negocio puede usar: "la agenda básica", "los recordatorios", "el reporte
mensual". Un bloque dura entre una y dos semanas en un proyecto chico. Así se ve por dentro:

1. **Apertura del bloque (medio día).** El dueño cuenta, en prosa, qué quiere para este bloque. El
   agente lo convierte en pendientes numerados, con su "cómo se verifica", y pregunta lo que no da
   para escribir un pendiente verificable (peldaño 5). El dueño prioriza.
2. **Cada pendiente (de dos horas a un día).** El agente anuncia qué pendiente toma y por qué.
   Construye. Si en el camino aparece una regla de negocio que no está escrita, frena y pregunta
   (6). Cuando termina, cierra con la rutina del 7: test probado en rojo, verde, regresión de los
   vecinos; una prueba de punta a punta del flujo tocado; y, si el cambio tocó un contrato entre
   dos partes del sistema, el otro lado actualizado en el mismo commit (8). Si el pendiente
   dependía de un número —cuántas consultas, cuánto tarda—, primero se midió con un instrumento
   con test (9). Y el reporte separa lo verificado de lo creído y declara los puntos ciegos (10).
   El dueño lee el reporte y mira la captura de la pantalla. No lee código.
3. **Cierre del bloque (medio día a un día).** La batería completa de punta a punta en verde en el
   entorno de prueba. El dueño o un usuario de confianza usa el sistema siguiendo los flujos del
   bloque. Lo que encuentra se anota como pendientes. Se actualiza el manual de usuario con las
   pantallas nuevas (14, en el mismo commit). Recién entonces se abre el bloque siguiente.

En un día típico del bucle, el dueño invierte entre quince y treinta minutos: contestar dos o
tres preguntas de reglas de negocio, leer dos o tres reportes, mirar dos o tres capturas. Eso es
todo lo que el método le pide. Si está invirtiendo más, o el agente está preguntando lo que
podría resolver solo (peldaño 1), o el dueño está leyendo código (y entonces algo del peldaño 7 o
del 10 no está funcionando).

### B.4 Los hitos humanos

Resumo en una lista los momentos en que un humano, el dueño o alguien de su confianza, tiene que
mirar o usar el sistema. Son pocos, están en momentos precisos, y ninguno se puede delegar al
agente:

- **Fin del arranque**: abrir la URL del entorno de prueba y ver el sistema vacío.
- **Con cada pendiente que toca una pantalla**: mirar la captura real del entorno de prueba.
- **Al cierre de cada bloque**: usar el sistema en el entorno de prueba siguiendo los flujos del
  bloque.
- **Antes del primer despliegue a producción**: pruebas de aceptación sobre todos los flujos.
- **En el peldaño 14**: una persona que no programa sigue el manual de recuperación en el entorno
  de prueba.
- **Después de cada despliegue a producción**: verificar que la versión que corre es la que se
  quería, y hacer una pasada de solo lectura por los flujos críticos.

Todo lo demás —los tests, las mediciones, las auditorías, la documentación— lo hace el modelo y el
humano lo verifica por el artefacto, no por el código.

### B.5 Cómo entran los requerimientos: del relevamiento al árbol semántico y a los pendientes

Quiero detenerme en esto porque es donde la ingeniería de sistemas clásica tiene más que decir y
donde el vibecoding la ignora con más entusiasmo. Un requerimiento no es una frase del cliente en
un chat. Es una frase del cliente **procesada** por métodos que existen desde hace décadas y que
siguen valiendo con un modelo al frente, porque el modelo es muy bueno aplicándolos si se lo pedís
y muy malo aplicándolos si no.

Los métodos que uso, y que el método exige en cada fase:

- **Entrevistas con el dueño**, abiertas, en prosa, registradas. Son la fase 0. No intento que
  sean completas: intento que el agente detecte qué les falta.
- **Casos de uso o historias de usuario**, uno por flujo que el negocio puede nombrar: "la
  recepcionista carga un turno", "el paciente recibe el recordatorio". Cada uno tiene actor,
  disparador, pasos, resultado y excepciones. Son la unidad con la que se abre un bloque funcional.
- **Modelo de dominio**: las entidades del negocio, sus atributos, sus estados posibles y las
  transiciones entre estados. Es el corazón del árbol semántico (ver abajo) y lo que evita que el
  modelo invente estados que el negocio no tiene.
- **Criterios de aceptación** por historia, en la forma "dado tal situación, cuando pasa tal cosa,
  entonces se ve tal resultado". Son los que se convierten en el "cómo se verifica" de cada
  pendiente y, después, en el test de punta a punta.
- **Prototipos de pantalla**, aunque sean un dibujo. La vista humana de las pantallas empieza
  acá, antes de que exista código.
- **Trazabilidad**: cada requerimiento se puede seguir hasta el pendiente que lo implementa, el
  test que lo prueba y el commit que lo cerró. En el método la trazabilidad no es una matriz
  aparte: es el pendiente mismo, que cita su origen y su evidencia.

**El árbol semántico.** Es el artefacto que ordena todo esto y es el mapa que el agente lee en cada
sesión (peldaño 2). Es un árbol, no una lista: el sistema en la raíz; debajo, los dominios o
módulos; debajo de cada uno, sus actores, sus procesos (los casos de uso), sus entidades con sus
estados, sus pantallas y sus integraciones externas; y colgando de cada nodo, los pendientes que
lo tocan y las decisiones que lo afectan. Lo construye el agente a partir del relevamiento, lo
corregís vos, y crece con cada bloque. Su valor es doble: le da al modelo el contexto exacto del
nodo que va a tocar sin tener que leer todo el proyecto, y te da a vos una forma de verificar que
el sistema que el agente entiende es el que el negocio pidió, sin leer código. Cuando un
pendiente no cuelga de ningún nodo, o el árbol está incompleto o el pendiente está fuera de
alcance; las dos cosas se ven en diez segundos.

**La especificación detallada vive en el pendiente.** En el método clásico había un documento de
especificación de requerimientos, largo, que envejecía. Acá ese documento se descompone: cada
pendiente lleva su propia especificación completa, y la suma de los pendientes es la
especificación del sistema. Un pendiente bien escrito tiene: título; el nodo del árbol semántico
del que cuelga; la historia o caso de uso que lo origina, con las palabras del cliente; la
descripción detallada de lo que se pide; las reglas de negocio aplicables, con su decisión y su
fecha; los datos que entran y salen; las pantallas afectadas, con el prototipo si lo hay; los
casos borde y las excepciones; los criterios de aceptación; y cómo se verifica. El agente lo
redacta a partir de tu pedido en prosa, pregunta lo que no da para especificar, y vos lo leés
antes de que se construya. Leer una especificación de pendiente es lo más cerca que vas a estar de
leer código, y es exactamente la distancia correcta.

**Los pendientes cerrados son documentación.** Esto es lo que cierra el círculo. Cuando un
pendiente se cierra, no se borra ni se archiva vacío: queda con su especificación, la decisión
que lo originó, la evidencia con la que se cerró (los números del rojo y del verde, la captura de
la pantalla, el número medido), el commit, y la fecha. La cola de pendientes cerrados es, entonces,
el historial funcional del sistema: qué se construyó, por qué, cuándo, y cómo se probó. De ahí
salen el diario de cambios, las secciones nuevas del manual de usuario y, cuando alguien pregunta
seis meses después "¿por qué el sistema hace esto?", la respuesta. El manual del curso enseña a
exigir esta documentación al cierre de cada pendiente, en la misma sesión, como parte de la rutina
del peldaño 5.

---

## Parte C — Los dieciséis peldaños

### Peldaño 0 — ¿Este proyecto se puede encarar así? (la elegibilidad)

Hay algo previo a todo, que no está en ningún repositorio porque siempre llegó decidido: la
decisión de **si un proyecto se encara con este método o no**. Es un criterio que viví en mi cabeza
durante meses y que estoy terminando de escribir. Los dos criterios excluyentes ya los tengo
claros, y salen de los proyectos que rechacé, no de los que acepté [Ref. 46](REFERENCIAS.md#ref-46):
los "no" definen la frontera mejor que los "sí". Los criterios que ponderan todavía los estoy
calibrando, y así lo marco.

- **Intención**: decidir si un proyecto se encara con este método, y con un agente al frente, o
  no, ANTES de abrir el repositorio. Porque si entrás a un proyecto que no da, el método se
  degrada a "programar con IA" y ahí sí el dueño termina leyendo código.
- **Cuándo**: una sola vez, en la primera semana, antes de cualquier otra cosa. Una hora de
  trabajo; ahorra meses. Si el sistema ya existe, este peldaño se sube en su versión para legados
  (la estación N0 del [camino evolutivo-correctivo](EVOLUTIVO_CORRECTIVO.md)), con cuatro
  criterios más y X2 medido pantalla por pantalla.
- **Entradas**: el pedido del cliente, el dominio del negocio, los datos, la tecnología, los
  entornos disponibles, y quién va a ser el dueño.
- **Artefacto**: una ficha de elegibilidad de una página, con los criterios puntuados y la
  decisión: va, no va, o va con condiciones.
- **Compuerta**: los criterios excluyentes están todos en verde, y el puntaje de los que ponderan
  supera el umbral (umbral que todavía no definí).
- **Quién decide**: el dueño. Hoy soy yo; la idea es que el método permita que lo decida otra
  persona con la misma ficha.
- **Fallo que evita**: meterse en un proyecto donde el agente no puede verificarse solo, o donde
  no hay un dueño del dominio que decida, y terminar con el humano revisando código línea por
  línea.
- **Contrato**: `peldanos/peldano-00-elegibilidad.md`.

**Los dos criterios excluyentes.**

| # | Criterio excluyente | Por qué mata el método |
|---|---|---|
| X1 | Tecnología heredada sin repositorio accesible, o con repositorios que no siguen un estándar | Sin un repositorio estándar no hay dónde dejar la evidencia: no hay pendientes citados en los commits (peldaño 5), ni tests que viajen con el código (7), ni integración y despliegue como paquete (13), ni documentación en el mismo commit (14). El agente trabaja a ciegas y no deja rastro verificable. |
| X2 | Tecnología que no se puede probar de punta a punta: no se pueden ejecutar las pantallas y acceder a cada elemento de la interfaz con sus distintos métodos, validando que el cambio llegó al backend | Sin esa verificación de pantalla a backend el agente no puede probarse solo (peldaños 7, 9 y 10), y entonces el dueño tendría que leer código, que es justamente lo que el método promete evitar. |

Una precisión que vale oro para la neutralidad de herramienta: **NAC3 (el protocolo que usa mi
herramienta para que las pantallas se puedan operar por programa) NO es condición; es el medio con
el que hoy lo logro**. El criterio neutral queda así: la interfaz se puede ejecutar por programa,
y cada elemento de la pantalla es accesible con sus distintos métodos (hacer clic, tipear, leer su
estado), de modo que un test pueda recorrer la pantalla y después verificar el efecto en el
backend. Una tecnología cuya interfaz no expone sus elementos a un "driver" (como Playwright, por
ejemplo) queda afuera, aunque tenga repositorio.

Y una lectura que me parece importante: en el fondo X1 y X2 son **la misma condición vista de dos
lados**. El agente tiene que poder verificarse solo, de punta a punta, y dejar la evidencia en el
repositorio. X1 es la mitad "¿dónde queda la evidencia?"; X2 es la mitad "¿cómo se produce la
evidencia?".

`[hipótesis]` **Criterios que ponderan, todavía sin peso.** Los dejo marcados como hipótesis
hasta que los calibre con los primeros proyectos que usen el método de punta a punta.

| # | Criterio candidato | Cómo se vio en los casos | ¿Excluyente? |
|---|---|---|---|
| D1 | Hay un dueño del dominio con criterio y con tiempo para decidir (no para programar) | en los tres sistemas, con las decisiones escritas con fecha | `[?]` |
| D2 | Hay un "oráculo" de verdad verificable: datos reales, un sistema externo, producción en solo lectura | la Obra Social y su Autorizador como oráculo [Ref. 26](REFERENCIAS.md#ref-26) | `[?]` |
| D4 | La tecnología está dentro de lo que el agente domina sin inventar (Node, Python, SQL, React) | los tres | `[?]` |
| D5 | El error tiene consecuencia real (plata, salud, operación), lo que justifica el fail-closed | la Obra Social (salud, cobros), la Asociación (familias) | `[?]` |
| D6 | La volumetría se puede conocer desde el día uno | Kikan: 3,4 millones de filas por año [Ref. 15](REFERENCIAS.md#ref-15) | `[?]` |
| D7 | El cliente tolera un tiempo de maduración y un humano en el circuito | el aprobador automático con modo de ensayo [Ref. 28](REFERENCIAS.md#ref-28) | `[?]` |
| D9 | El alcance cabe en un repositorio y un dueño | los tres | `[?]` |
| D10 | Los secretos y accesos se pueden aislar (bóveda, archivo de entorno, permisos acotados) | la clave de API mapeada a quien la creó [Ref. 13](REFERENCIAS.md#ref-13) | `[?]` |

Dos criterios que tenía en versiones anteriores (que el agente pueda probar solo, y que el
proyecto sea nuevo o auditable) los absorbí en X2 y X1 respectivamente, porque son consecuencias y
no criterios aparte.

### Peldaño 1 — El contrato de convivencia (las reglas antes del código)

Antes de escribir una sola línea, poné por escrito cómo van a trabajar vos y el agente. Parece
una formalidad, y no lo es: es lo que evita el ochenta por ciento de las frustraciones del mes
uno. Pensá que el agente llega cada mañana sin memoria de ayer; lo que no esté escrito se lo vas a
tener que repetir cada vez, y cada vez un poco distinto.

- **Intención**: fijar cómo trabajan el humano y el agente antes de la primera línea de código.
- **Cuándo**: una sola vez, en la primera semana, inmediatamente después de la elegibilidad. Media
  hora. Se revisa cuando un golpe lo exige.
- **Entradas**: nada del proyecto; es el primer archivo. De vos: tus preferencias de trabajo.
- **Artefacto**: un documento de estándares de calidad que diga, como mínimo: el tiempo del humano
  es sagrado (no se lo gasta en cosas que el agente puede resolver solo); cero deuda técnica, es
  decir, cuando algo se rompe se arregla de raíz y se agrega la regresión en la misma sesión; el
  alcance es exacto, ni más ni menos de lo pedido; se habla en el idioma del usuario; la
  documentación se actualiza en el mismo commit; y jamás se anuncia como hecho algo que no se hizo.
- **Compuerta**: el contrato está en el repositorio y se lee en cada sesión.
- **Quién decide**: el dueño. El agente puede proponer cambios, pero no edita el contrato por su
  cuenta.
- **Fallo que evita**: el agente que "ayuda" expandiendo el alcance porque le pareció buena idea;
  el que deja deuda "para después" (y el después nunca llega); y el que reporta como hecho lo que
  *cree* que hizo. Lo escribí por primera vez cuando llevaba dos semanas repitiendo lo mismo en
  cada sesión [Ref. 1](REFERENCIAS.md#ref-1).
- **Contrato**: `peldanos/peldano-01-contrato-de-convivencia.md`.

### Peldaño 2 — La definición del proyecto y la lectura obligatoria

Cada sesión del agente arranca de cero. Dale un mapa, corto, y obligalo a leerlo antes de tocar
nada. Las dos mitades importan por igual: un mapa que nadie lee no actúa, y un mapa largo no lo
lee nadie.

- **Intención**: que cada sesión arranque sabiendo qué es el proyecto, en qué estado está y qué
  decisiones ya se tomaron.
- **Cuándo**: se escribe una vez, en la primera semana, después del contrato; se mantiene al día
  durante todo el proyecto, con cada decisión nueva.
- **Entradas**: el contrato (peldaño 1) y el relevamiento del negocio.
- **Artefacto**: un archivo de proyecto operativo, y acá va un énfasis: CORTO. Es el programa, no
  el historial. Más el **árbol semántico** del sistema (ver B.5): dominios, actores, procesos,
  entidades con sus estados, pantallas e integraciones, con los pendientes y las decisiones
  colgando de cada nodo. Más un archivo de estado vivo con lo que se está trabajando y las dudas
  abiertas.
- **Compuerta**: el agente lee el archivo de proyecto y el árbol semántico antes de tocar código,
  y se probó que los lee.
- **Quién decide**: el dueño define; el agente lo mantiene al día.
- **Fallo que evita**: dos, bien concretos. Trabajo descartable por no haber leído el mapa
  [Ref. 9](REFERENCIAS.md#ref-9). Y el archivo de proyecto que crece hasta volverse ilegible
  [Ref. 41](REFERENCIAS.md#ref-41): el archivo operativo y el libro de casos tienen que ser archivos
  distintos.
- **Contrato**: `peldanos/peldano-02-definicion-y-lectura.md`.

### Peldaño 3 — Dimensionar antes de diseñar la arquitectura

Este es el peldaño que más caro cuesta saltearse, y lo sé porque me lo salteé. Las decisiones
estructurales se toman con números, y los números primarios los tiene el negocio, no el modelo.

- **Intención**: que las decisiones estructurales (qué motor de base de datos, si la interfaz es
  sincrónica o asincrónica, cuánta concurrencia) se tomen con números y no con gusto.
- **Cuándo**: una vez, en la primera semana, antes de armar el esqueleto; se rehace si el negocio
  cambia de escala. Media página y una decisión en un proyecto chico.
- **Entradas**: un relevamiento de datos de volumetría hecho con el negocio, por naturaleza
  incompleto; y acceso de lectura al sistema anterior si existe. Hay datos que **solo el negocio
  tiene** y el modelo no puede inferir: por eso el prompt le exige evaluar si están completos y
  pedir los que falten, en vez de estimarlos con cara de seguro.
- **Artefacto**: un registro de dimensionamiento con opciones FIJAS (tres o cuatro opciones
  concretas) y la elegida; y las decisiones "asimétricas" declaradas explícitamente, por ejemplo
  "la interfaz de persistencia es asincrónica desde la línea uno aunque el primer motor sea
  sincrónico", porque si estás equivocado cuesta poco y si no lo hacés cuesta una fortuna.
- **Compuerta**: el dimensionamiento está registrado antes de armar el esqueleto.
- **Quién decide**: el dueño elige entre las opciones fijas; el agente las presenta con números.
- **Fallo que evita**: arrancar con un almacenamiento que no aguanta la volumetría y descubrirlo
  cuando cambiar la interfaz cuesta una etapa entera de reingeniería
  [Ref. 15](REFERENCIAS.md#ref-15).
- **Contrato**: `peldanos/peldano-03-dimensionar.md`.

### Peldaño 4 — El esqueleto con sus compuertas

Antes de que el sistema haga algo útil, tiene que arrancar, testearse y desplegarse VACÍO. Sí,
vacío. Porque el camino a producción es parte del producto, y la única forma de saber que
funciona es recorrerlo cuando todavía no hay nada que perder. Este es el peldaño donde se hace
**toda la infraestructura inicial y la cadena de integración y despliegue**, y por eso ocupa la
mayor parte de la primera semana.

- **Intención**: tener un sistema que arranca, se prueba y se despliega sin ninguna funcionalidad
  todavía.
- **Cuándo**: una vez, al final de la primera semana, después del dimensionamiento y antes de
  cualquier funcionalidad. Es el cierre del tramo de arranque.
- **Entradas**: el dimensionamiento (peldaño 3), el relevamiento de entornos, y las credenciales
  del lugar donde se va a desplegar.
- **Artefacto**: el esqueleto con la integración continua en verde, la estructura de tests armada
  con un test de humo, un despliegue a un entorno de prueba que funciona y se corrió dos veces, y
  las compuertas del flujo declaradas por escrito.
- **Compuerta**: el esqueleto está en verde, la integración continua corre, y el despliegue al
  entorno de prueba funciona con cero funcionalidad. El dueño abrió la URL y vio la pantalla vacía.
- **Quién decide**: el agente ejecuta; el dueño aprueba visualmente.
- **Fallo que evita**: descubrir el despliegue un mes después del arranque y pagar cinco
  pendientes seguidos para que funcione, con funcionalidad en juego
  [Ref. 32](REFERENCIAS.md#ref-32).
- **Contrato**: `peldanos/peldano-04-esqueleto.md`.

### Peldaño 5 — El plan son los pendientes

Acá hay una idea que, cuando la agarrás, no la soltás más: no hay "plan" por un lado y "lista de
tareas" por el otro. **La lista de pendientes ES el plan.** Y cada pendiente dice cómo se verifica,
porque eso es lo que vos vas a mirar en vez de mirar el código.

- **Intención**: una única cola de trabajo, con orden y con compuerta, que sea la verdad del
  proyecto.
- **Cuándo**: se crea al abrir el primer bloque funcional, apenas termina el arranque; se usa en
  cada sesión durante todo el proyecto. Cada bloque nuevo arranca convirtiendo el pedido del
  cliente en pendientes.
- **Entradas**: el pedido del cliente para el bloque, las auditorías, y los hallazgos de las
  pruebas humanas.
- **Artefacto**: un registro de pendientes numerados, cada uno con su **especificación detallada**
  (ver B.5): el nodo del árbol semántico del que cuelga, la historia de origen con las palabras del
  cliente, la descripción, las reglas de negocio aplicables, los datos, las pantallas, los casos
  borde, los criterios de aceptación y cómo se verifica. Y, al cerrarse, la **documentación del
  pendiente hecho**: la evidencia, el commit, la fecha, lo que quedó decidido en el camino. Los
  pendientes cerrados son el historial funcional del sistema.
- **Compuerta**: ningún cambio entra sin pendiente especificado; y el pendiente se cierra con
  evidencia documentada, no con "listo".
- **Quién decide**: el dueño prioriza; el agente propone y ejecuta en orden.
- **Fallo que evita**: la especificación que "se supera" y queda obsoleta en dos semanas
  [Ref. 17](REFERENCIAS.md#ref-17); y el trabajo del que seis meses después nadie sabe por qué se
  hizo [Ref. 7](REFERENCIAS.md#ref-7).
- **Contrato**: `peldanos/peldano-05-pendientes.md`.

### Peldaño 6 — Las decisiones se escriben junto al código

El modelo, cuando encuentra un hueco en las reglas de negocio, lo llena. No se detiene a
preguntar; completa con lo que le parece más probable, con la misma naturalidad con la que escribe
lo demás. Por eso este peldaño no es "escribí las decisiones" sino "exigile que frene y pregunte
cuando falte una", y cuando decidís, la decisión queda con tus palabras, tu nombre y la fecha.

- **Intención**: que cada regla de dominio o decisión estructural tenga dueño, fecha y lugar.
- **Cuándo**: en cada sesión del bucle, cada vez que el agente se topa con una regla no escrita.
  Suelen ser dos o tres por bloque funcional. También en el arranque (peldaños 0 y 3) y en la salida
  a producción (12 y 13).
- **Entradas**: la conversación con el dueño. Es el único insumo.
- **Artefacto**: la decisión escrita en el commit y en un registro de decisiones, con las palabras
  textuales. Si el dueño no contestó y el agente tuvo que elegir, queda marcada como "decisión por
  omisión" para revisarla.
- **Compuerta**: una regla de negocio no entra al código sin su frase de origen.
- **Quién decide**: el dueño. Siempre. Sin excepciones.
- **Fallo que evita**: discutir seis semanas después por qué algo es así; y, peor, el agente
  inventando reglas de dominio porque le parecieron razonables. La práctica de escribir la regla en
  el commit con fecha y dueño viene de la Obra Social [Ref. 29](REFERENCIAS.md#ref-29), y la de
  congelar decisiones antes de construir, de mi herramienta [Ref. 5](REFERENCIAS.md#ref-5).
- **Contrato**: `peldanos/peldano-06-decisiones.md`.

### Peldaño 7 — Tests como candados, probados en rojo

Un test que nunca viste fallar no sabés si prueba algo. Por eso acá la regla no es "escribí
tests"; es "demostrá que el test se pone en rojo contra el código viejo, después en verde, y
después que la regresión sigue en verde". Y las pruebas de punta a punta, desde la pantalla hasta
el backend, son las que reemplazan tu lectura del código.

- **Intención**: que cada comportamiento que importa tenga un test que FALLA si se rompe, y que se
  sepa con certeza que falla.
- **Cuándo**: con cada pendiente del bucle, al cerrarlo. La prueba de punta a punta del flujo
  tocado, en el mismo cierre. La batería completa de punta a punta, al cierre de cada bloque y
  antes de cada despliegue a producción.
- **Entradas**: el cambio ya implementado y el pendiente con su "cómo se verifica".
- **Artefacto**: el test nuevo, la salida en rojo y en verde con números, la regresión de los
  vecinos en la misma sesión, y el commit que dice contra qué se probó en rojo.
- **Compuerta**: rojo demostrado, verde, regresión en verde. Y el agente no simula justamente la
  parte que quiere probar.
- **Quién decide**: el agente ejecuta y reporta; el dueño lee el reporte, no el test.
- **Fallo que evita**: los tests que pasan porque no prueban nada, y el verde que esconde un bug
  [Ref. 44](REFERENCIAS.md#ref-44). El caso de los contadores es el ejemplo completo de un test
  probado en rojo contra el criterio viejo [Ref. 26](REFERENCIAS.md#ref-26).
- **Contrato**: `peldanos/peldano-07-tests-en-rojo.md`.

### Peldaño 8 — Simetría entre productor y consumidor, y el registro de anti-patrones

Cuando cambiás una punta (el servidor, la base, un robot), la otra punta (la pantalla, un
contador, un reporte) tiene que cambiar en el mismo commit. El principio que lo sostiene es que
**toda lista tiene un solo dueño**. Y los errores que ya pagaste una vez se anotan con su
verificación automática, para no pagarlos dos veces.

- **Intención**: que un cambio en una punta arrastre la otra, siempre, en el mismo commit.
- **Cuándo**: con cada pendiente que toca un contrato entre dos partes del sistema; el mapa de
  contratos se construye al abrir el segundo bloque funcional, cuando ya hay pantalla y servidor; el
  registro de anti-patrones crece cada vez que algo se rompe por segunda vez.
- **Entradas**: el mapa de quién produce y quién consume cada contrato; el registro de
  anti-patrones.
- **Artefacto**: el servidor define la lista y el consumidor la lee; el mapa productor/consumidor;
  el registro de anti-patrones con olor, causa raíz, arreglo y detección temprana.
- **Compuerta**: automática: el agente busca el otro lado antes de dar por cerrado un cambio.
- **Quién decide**: nadie; es automático.
- **Fallo que evita**: el contador que no coincide con la consulta [Ref. 26](REFERENCIAS.md#ref-26);
  dos copias del mismo módulo que se desincronizan [Ref. 41](REFERENCIAS.md#ref-41). La solución de
  una sola fuente la impuse en la Obra Social [Ref. 27](REFERENCIAS.md#ref-27).
- **Contrato**: `peldanos/peldano-08-simetria-y-antipatrones.md`.

### Peldaño 9 — Medir antes de construir, con un instrumento que también se verifica

Este es, para mí, el peldaño más adulto de todos, y el que más tardé en formalizar porque daba por
sentado que un modelo lo aplicaría solo. No lo aplica. La regla es: ningún número que decide algo
sale de una impresión; sale de un medidor que vive en el repositorio, que tiene un test, y que vos
podés correr. Y el medidor también se verifica, porque los medidores mienten.

- **Intención**: que todo número que alimenta una decisión salga de un instrumento con test, y
  que el instrumento mismo se audite.
- **Cuándo**: en el bucle, cada vez que un pendiente depende de un número o de una hipótesis de
  causa, ANTES de construir. En el arranque, el dimensionamiento es el primer caso. En un proyecto
  chico, "medir" es contar con un comando y anotar el número con la fecha.
- **Entradas**: la hipótesis, del dueño o del agente, y acceso a lo que se quiere medir.
- **Artefacto**: el medidor con guarda en el repositorio; el número con su comando y su fecha; la
  auditoría en dos direcciones; lo aproximado marcado; y, si corresponde, un presupuesto por camino
  apretado a lo medido y protegido por un test.
- **Compuerta**: las cinco reglas: medidor con guarda; si el instrumento no existe se construye; se
  audita en dos direcciones; lo aproximado se marca; y el que ejecuta verifica los números del que
  planificó.
- **Quién decide**: el número. El dueño trae la hipótesis; el agente la mide antes de construir.
- **Fallo que evita**: los medidores que mentían y el plan con tres de cuatro números mal
  [Ref. 36](REFERENCIAS.md#ref-36); el trinquete en cero que no veía 84 llamadas
  [Ref. 35](REFERENCIAS.md#ref-35). Las reglas las escribí yo, en sesión, antes de que fueran
  doctrina [Ref. 45](REFERENCIAS.md#ref-45).
- **Contrato**: `peldanos/peldano-09-medir.md`.

### Peldaño 10 — Verificación honesta y reporte proporcional

Si no vas a leer código, el reporte del agente tiene que ser confiable, y eso no pasa solo. El
modelo fue entrenado para ser útil y completo, y un reporte que dice "esto no lo pude verificar"
se siente menos útil que uno que dice "listo". Entonces exigile explícitamente las malas noticias,
los puntos ciegos y lo que no hizo.

- **Intención**: que el reporte del agente sea confiable sin que el dueño lea código.
- **Cuándo**: en cada reporte, de cada pendiente, durante todo el proyecto. Es la forma que tiene
  que tener todo lo que el agente te dice.
- **Entradas**: el trabajo hecho y el pendiente que lo pedía.
- **Artefacto**: un reporte con tres bloques: verificado (con la prueba al lado), creído (y por
  qué no se probó), puntos ciegos (lo que no puede ver desde donde está). Cubre cada ítem pedido.
  Las malas noticias primero.
- **Compuerta**: ninguna afirmación sin su prueba. "Listo" no se dice a secas. Ante un "sigue
  roto", primero se compara la versión publicada con la que tiene el arreglo.
- **Quién decide**: el dueño confía, o pide la prueba. Nunca revisa código.
- **Fallo que evita**: el error reportado como éxito y los reportes que declaraban verificado lo
  que no lo estaba [Ref. 43](REFERENCIAS.md#ref-43); el turno que trabajó invisible una hora
  cuarenta y tres [Ref. 16](REFERENCIAS.md#ref-16). La regla de honestidad de verificación la
  escribí en junio [Ref. 8](REFERENCIAS.md#ref-8).
- **Contrato**: `peldanos/peldano-10-verificacion-honesta.md`.

### Peldaño 11 — La auditoría periódica como insumo del plan

Cada tanto hay que mirar el sistema entero con ojos frescos, y lo que se vea no va a un informe
que se archiva: va a la cola de pendientes. La parte importante es "ojos frescos": que audite
alguien que no construyó, porque el que construyó comparte sus propios supuestos. Alcanza con otra
sesión del modelo, con otro archivo de instrucciones.

- **Intención**: mirar el sistema completo cada tanto y convertir lo que se ve en pendientes.
- **Cuándo**: obligatoria antes del primer despliegue a producción (abre el tramo de salida). En
  operación, cada uno o dos meses según el ritmo de cambio, y al cierre de cada etapa grande.
- **Entradas**: el repositorio entero y la producción en solo lectura.
- **Artefacto**: un informe con hallazgos graduados, cada uno con ubicación, riesgo, evidencia y
  prioridad; notas por dimensión; y los hallazgos urgentes ya convertidos en pendientes.
- **Compuerta**: cada hallazgo urgente tiene un pendiente abierto antes de dar la auditoría por
  cerrada.
- **Quién decide**: el dueño prioriza los hallazgos.
- **Fallo que evita**: consultas que leen tablas enteras [Ref. 18](REFERENCIAS.md#ref-18); dos
  puertas de administrador que nadie vio hasta que las miró otro
  [Ref. 40](REFERENCIAS.md#ref-40); una vulnerabilidad conocida y un componente enorme
  [Ref. 41](REFERENCIAS.md#ref-41).
- **Contrato**: `peldanos/peldano-11-auditoria.md`.

### Peldaño 12 — Fail-closed, candados y cero daño silencioso

Ante la duda o el fallo, el sistema NO actúa. Y lo dice. Suena obvio, pero es lo contrario de lo
que el software hace por defecto, que ante la duda sigue adelante. Este peldaño va **antes** de
construir las funcionalidades que actúan sobre el mundo, no después.

- **Intención**: que el sistema, ante una duda o un fallo, no actúe, y avise.
- **Cuándo**: en el tramo de salida a producción, antes de construir cualquier funcionalidad que
  cobre, envíe, apruebe o borre; se revisa con cada acción nueva con consecuencias. Las
  automatizaciones nuevas arrancan en modo de ensayo y se habilitan después de mirar su registro
  unos días.
- **Entradas**: el relevamiento de las acciones con consecuencia, hecho con el dueño.
- **Artefacto**: la tabla de candados: cada acción con su reversibilidad, su candado, su camino de
  vuelta; un test por candado probado en rojo; las automatizaciones nuevas en modo de ensayo.
- **Compuerta**: toda acción irreversible tiene candado y camino de vuelta documentado.
- **Quién decide**: el dueño aprueba candado por candado; el sistema no los saltea nunca.
- **Fallo que evita**: un doble cobro, una aprobación automática sin pasar por un humano, el
  borrado de datos del cliente. Los candados de la Obra Social son el modelo
  [Ref. 28](REFERENCIAS.md#ref-28); el reflejo de no romper el listado entero, también
  [Ref. 25](REFERENCIAS.md#ref-25).
- **Contrato**: `peldanos/peldano-12-fail-closed.md`.

### Peldaño 13 — Integración continua, entornos, secretos y despliegue como parte del producto

Llegar a producción tiene que ser un paquete reproducible: los tests corren UNA vez, el despliegue
solo empaqueta y sube, la configuración vive en el servidor y no en el repositorio, y la vuelta
atrás está probada. Buena parte de esto ya existe desde el esqueleto; este peldaño lo completa
hacia producción.

- **Intención**: que llegar a producción sea un paquete reproducible, con los tests corridos una
  sola vez y la configuración fuera del repositorio.
- **Cuándo**: la cadena de integración y el despliegue al entorno de prueba se montan en el
  peldaño 4. El cierre hacia producción —entorno real, secretos, promoción, vuelta atrás probada,
  candado contra secretos— se hace en el tramo de salida, después de la auditoría y de los
  candados. La rutina de cada despliegue se aplica en toda la operación.
- **Entradas**: el relevamiento de entornos y accesos; el esqueleto con su integración.
- **Artefacto**: la integración continua que corre la batería una vez por commit; el despliegue
  que espera ese resultado y solo empaqueta; la configuración solo en el servidor; el
  procedimiento de promoción escrito y repetible; la vuelta atrás probada; la verificación que
  impide subir un secreto.
- **Compuerta**: prueba en verde con la misma versión antes de tocar producción; vuelta atrás
  probada; ningún secreto en el repositorio ni en el chat sin rotar.
- **Quién decide**: el dueño promueve a producción; el agente prepara todo.
- **Fallo que evita**: tests corridos tres veces por commit y la cuota fundida
  [Ref. 39](REFERENCIAS.md#ref-39); el despliegue endurecido a golpe de pendientes por haberlo
  descubierto tarde [Ref. 32](REFERENCIAS.md#ref-32); secretos pegados en el chat
  [Ref. 42](REFERENCIAS.md#ref-42).
- **Contrato**: `peldanos/peldano-13-ci-entornos-secretos-deploy.md`.

### Peldaño 14 — Documentación viva y manuales que una persona puede seguir sin IA

El sistema tiene que poder usarse, mantenerse y recuperarse sin el agente y sin vos. Si el día que
no hay agente no se puede desplegar, no está terminado. Y como regenerar documentación con un
modelo es gratis, la regla pasa a ser "en el mismo commit".

- **Intención**: que el sistema se pueda usar, mantener y recuperar sin el agente y sin el
  constructor.
- **Cuándo**: el manual de usuario crece con cada bloque funcional, al cierre, con las pantallas
  nuevas. Los tres manuales completos se generan en el tramo de salida a producción, después del
  13, y la prueba con una persona que no programa se hace antes del primer despliegue. La rutina
  del mismo commit rige durante toda la operación.
- **Entradas**: el sistema corriendo en el entorno de prueba; los artefactos del 12 y el 13.
- **Artefacto**: el manual de usuario con capturas reales, el de mantenimiento, y el de
  infraestructura y recuperación escrito para una persona que tiene que hacerlo a mano a las tres
  de la mañana; cada uno con fecha y versión.
- **Compuerta**: la documentación está al día en el mismo commit; alguien que no programa siguió el
  manual de recuperación.
- **Quién decide**: el agente mantiene; el dueño lee el manual, no el código.
- **Fallo que evita**: el documento desactualizado que provocó un commit en el repositorio
  equivocado; el archivo de proyecto convertido en historial [Ref. 41](REFERENCIAS.md#ref-41). Los
  manuales reproducibles a mano son los de la Obra Social [Ref. 24](REFERENCIAS.md#ref-24).
- **Contrato**: `peldanos/peldano-14-documentacion-viva.md`.

### Peldaño 15 — El agente adentro del sistema, y la retrospectiva con número

El último peldaño tiene dos partes que cierran el mismo ciclo. Primero: el agente queda residente
en producción, con alcance acotado, actuando a nombre de una persona. Segundo: el método mismo se
revisa con números, y lo que se aprende vuelve al peldaño 0 para el próximo proyecto.

- **Intención**: que el agente quede residente en producción con alcance acotado, y que el método
  se revise con números.
- **Cuándo**: el agente residente, al entrar en operación, después del primer despliegue a
  producción. La retrospectiva, al cierre de cada etapa y del proyecto; es obligatoria aunque sea
  de una página.
- **Entradas**: el sistema en producción, los incidentes, los costos.
- **Artefacto**: el documento del agente residente con su mapa del sistema, su alcance, su
  credencial a nombre de una persona y la prueba de que lo que está fuera del alcance se rechaza; y
  la retrospectiva con números con fuente, cada incidente mapeado a un peldaño, y al menos una
  propuesta concreta de cambio a la escalera.
- **Compuerta**: el agente no puede hacer lo que el dueño no aprobó; la retrospectiva produce al
  menos un cambio a la escalera.
- **Quién decide**: el dueño.
- **Fallo que evita**: el agente que opera sin mapa; y el método que se repite igual proyecto tras
  proyecto sin aprender. La retrospectiva con número que mató al equipo multiagente es el modelo
  [Ref. 6](REFERENCIAS.md#ref-6); el agente residente, el de la Obra Social
  [Ref. 13](REFERENCIAS.md#ref-13).
- **Contrato**: `peldanos/peldano-15-agente-residente-y-retrospectiva.md`.

---

## Parte D — Cómo se ejecuta, cuánto se exige, y con qué herramienta

### Cómo se ejecuta cada peldaño: el contrato

La ficha de ocho partes dice qué busca cada peldaño, cuándo se sube y qué deja. Pero un peldaño se
entiende cabalmente recién cuando se ve **cómo se pide, qué tiene que volver y cómo sé que volvió
completo**. Por eso cada peldaño tiene, además de la ficha, un **contrato** en un archivo propio
dentro de `peldanos/`, siempre con las mismas cinco secciones:

1. **Contexto requerido**, nombrado en forma genérica ("relevamiento de datos de volumetría",
   "acceso de lectura al sistema anterior", "la lista de acciones con consecuencia real"), sin bajar
   al detalle de la ingeniería de sistemas. Los relevamientos son por naturaleza incompletos; no
   intento hacerlos completos con un formulario.
2. **Prompts**, los que se le dan al modelo, textuales. El inicial y, cuando el peldaño es una
   conversación, el de cierre. Todos llevan la misma cláusula, que es el corazón del asunto: *el
   modelo evalúa si el contexto alcanza; si no alcanza, pide todo lo que falte antes de seguir; y
   no estima ni inventa un dato que solo el negocio tiene*. El que sabe qué le falta para calcular
   es el modelo, no un formulario. Y cada prompt viene precedido de un bloque que dice **"Antes de
   enviar el prompt"**: los archivos y los insumos que vos (o el negocio con vos) tenés que haber
   construido antes de pegarlo, con su nombre, su contenido y el estado mínimo aceptable. El prompt
   los nombra, el bloque te dice cómo tienen que estar hechos; sin ese bloque, el prompt menciona
   archivos que nadie te dijo cómo escribir.
3. **Resultado esperado**: las características detalladas del artefacto.
4. **Verificación de completitud**: la lista de comprobaciones que hace el dueño sobre el
   artefacto, **sin leer código**. Si una da "no", el peldaño no está subido.
5. **Señales de alarma**: dos o tres síntomas de que el peldaño se subió mal aunque parezca subido.

Y en el encabezado de cada contrato: el tramo, el cuándo, la forma y el tamaño (si es obligatorio
en todo proyecto o proporcional).

**Los prompts están en inglés, y cada uno trae su traducción.** Es una decisión que tomé por tres
razones: el mismo contenido en castellano ocupa entre un 30 y un 50 % más de tokens; la capacidad
de seguir instrucciones de los modelos está mejor calibrada en inglés, así que un prompt en inglés
tolera mejor la brevedad sin volverse ambiguo; y el vocabulario del oficio (test, commit,
rollback, mock) es inglés. Pero no quiero que el inglés sea una barrera para leer el método: debajo
de cada prompt va la explicación de qué estoy pidiendo y por qué cada cláusula está ahí, y en la
versión HTML hay un botón que muestra el prompt traducido al idioma del documento. El prompt que
se le pega al modelo es el inglés; la traducción es para que vos lo entiendas. Y todos terminan
con "Reply in my language", porque el prompt está en inglés pero la conversación no tiene por qué
estarlo.

### Qué es obligatorio y qué es proporcional, según el tamaño del proyecto

Una pregunta que aparece enseguida: "¿todo esto para un sistema chico?". La respuesta es que
dieciséis peldaños no son dieciséis semanas; varios se suben en una hora, y los que son
proporcionales se achican con el proyecto. Lo que no se achica es la lista de los que no se
negocian. Esta tabla es una propuesta `[hipótesis]` para confirmar con el primer proyecto que use
el método de punta a punta:

| Peldaño | Proyecto chico (un dueño, pocos usuarios, sin dinero en juego) | Proyecto con usuarios y consecuencias |
|---|---|---|
| 0 Elegibilidad | obligatorio (una hora) | obligatorio |
| 1 Contrato | obligatorio (media hora) | obligatorio |
| 2 Definición | obligatorio, cincuenta líneas alcanzan | obligatorio |
| 3 Dimensionar | obligatorio, media página y una decisión | obligatorio, completo |
| 4 Esqueleto | obligatorio si va a tener usuarios | obligatorio |
| 5 Pendientes | obligatorio | obligatorio |
| 6 Decisiones | obligatorio | obligatorio |
| 7 Tests en rojo | obligatorio | obligatorio |
| 8 Simetría | la regla sí; el mapa, opcional | obligatorio con mapa |
| 9 Medir | proporcional: contar y anotar | obligatorio, con medidores y presupuestos |
| 10 Verificación honesta | obligatorio | obligatorio |
| 11 Auditoría | una, antes de producción | periódica |
| 12 Fail-closed | opcional si es solo lectura | obligatorio |
| 13 Integración y despliegue | mínimo: tests solos, configuración afuera, vuelta atrás | obligatorio, completo |
| 14 Documentación | mínimo: recuperación | los tres manuales |
| 15 Residente y retrospectiva | retrospectiva de una página | ambos |

En resumen: hay nueve peldaños que no se negocian en ningún proyecto (0, 1, 2, 3, 5, 6, 7, 10 y
la retrospectiva del 15), y siete que se dimensionan con el proyecto.

### Cómo se usa con cualquier herramienta

El método es neutral de herramienta; lo que cambia entre una y otra es **dónde se pone cada
artefacto** para que el modelo lo lea. La correspondencia, para las herramientas más usadas a
fines de 2026:

| Artefacto del método | Claude Code | Cursor | Codex CLI / Gemini CLI | Forge |
|---|---|---|---|---|
| Contrato de convivencia (P1) y rutinas (P5, P6, P7, P8, P10, P14) | `CLAUDE.md` del proyecto | `.cursor/rules/` | `AGENTS.md` / `GEMINI.md` | doctrinas inyectadas por compuerta |
| Definición del proyecto (P2) | `CLAUDE.md` + `docs/STATUS.md` | igual, en reglas y docs | igual | `PROJECT.md` + archivo de contexto |
| Registro de pendientes (P5) | `docs/PENDING.md` o issues | igual | igual | registro de pendientes nativo con verbos |
| Prompts de peldaño (todos) | se pegan en el chat al subir el peldaño | igual | igual | se inyectan al cruzar la compuerta |
| Compuertas (P4) | `docs/GATES.md`, manual | igual | igual | G1 a G9, automáticas |
| Medidores y presupuestos (P9) | scripts en el repo con test | igual | igual | igual, más el trinquete estático |

La columna de Forge es la que automatiza más; las otras tres funcionan igual de bien si el dueño
hace a mano lo que Forge hace solo: pegar el prompt del peldaño en el momento correcto y exigir la
verificación de completitud antes de pasar al siguiente. Esa es, de hecho, la práctica del curso.

---

## Parte E — Lo que falta elaborar

1. **El peldaño 0 completo**: los pesos de los criterios que ponderan, el umbral, y más proyectos
   rechazados como contraejemplos. Tengo X1 y X2; falta lo demás.
2. **Un nombre memorable para cada peldaño**, en una frase, para los manuales y las publicaciones.
3. **La exportación a Forge**: qué peldaños ya son compuertas o comandos y cuáles faltan para poder
   correr la escalera como flujo de ejecución.
4. **Probar los contratos en un proyecto real de punta a punta.** Los dieciséis prompts están
   escritos a partir de lo que hice, no ejecutados tal cual. El primer proyecto que los use completo
   va a corregir varios; es parte del peldaño 15.
5. **La primera cohorte del curso**, que va a corregir los tiempos de la línea de tiempo y los
   errores típicos, que hoy están escritos desde mis proyectos y no desde alumnos.
6. **El camino evolutivo-correctivo probado en un legado real de punta a punta.** Las ocho
   estaciones están escritas desde lo que hice en sistemas ajenos en modo diagnóstico y desde
   los peldaños reordenados, no desde una normalización completa ejecutada con esos prompts.
7. **Lo que NO está en la escalera y debería estar** `[hipótesis]`: la gestión del costo de tokens y
   cuotas como presupuesto explícito (hoy es reactiva); la rotación de secretos como rutina y no
   como incidente; y un criterio para cuándo el humano SÍ tiene que mirar el código, porque hoy la
   respuesta es "nunca" y sospecho que hay momentos puntuales en que conviene.

---

## Glosario

Cada sigla, cada nombre propio y cada expresión coloquial que aparece en este documento, explicada.
En orden alfabético. Algunas entradas son términos que aparecen en nombres de archivo o mensajes de
commit de los repositorios de origen; las mantengo para que la evidencia se pueda seguir.

**A los golpes** — Aprender algo porque salió mal, no porque alguien lo explicó antes. Lo uso en el
sentido de "estas reglas se aprendieron a los golpes", y en este documento aclaro que no es toda
la verdad: los principios los traía de antes; los golpes mostraron dónde el modelo no los aplica.

**Agente** — Un programa de inteligencia artificial que no solo responde preguntas sino que
ejecuta acciones: lee archivos, escribe código, corre comandos, hace commits. En este documento,
"el agente" es Claude Code o la herramienta que uses.

**Anonimización** — En este documento los clientes reales se llaman "la Obra Social", "el
Autorizador" y "la Asociación", y sus sistemas "Autorizaciones" y "Kikan". Es a propósito: los
nombres quedan reservados hasta que tenga permiso para usarlos.

**Anti-patrón** — Una forma de hacer las cosas que parece razonable pero que se sabe que termina
mal. Lo contrario de un "patrón" (una buena práctica comprobada).

**Árbol semántico** — El mapa del sistema en forma de árbol: el sistema en la raíz; debajo, los
dominios; debajo, actores, procesos, entidades con sus estados, pantallas e integraciones; y de
cada nodo cuelgan los pendientes y las decisiones que lo tocan. Lo construye el agente, lo corregís
vos, y es lo que el agente lee antes de tocar código. Ver B.5.

**Apretar el techo** — Bajar un límite (un presupuesto, un máximo permitido) hasta que quede apenas
por encima de lo medido, para que cualquier empeoramiento haga fallar un test.

**Aprobador automático** — En Autorizaciones, el robot que aprueba órdenes automáticamente según
reglas. Primero corrió en "modo de ensayo" (ver dry-run) antes de dejarlo actuar.

**Artefacto** — Algo concreto que se produce: un archivo, un test, un script, un documento. En la
escalera, cada peldaño deja un artefacto.

**Asincrónico / sincrónico (async / sync)** — Una llamada sincrónica espera el resultado antes de
seguir; una asincrónica deja la tarea andando y sigue, y después recoge el resultado. Las bases de
datos reales en Node son asincrónicas; por eso la interfaz tiene que serlo desde el principio.

**Autodescubrimiento** — En el camino evolutivo-correctivo, la forma de conseguir los insumos
que nadie escribió: el agente los recupera leyendo el sistema mismo (el código, el esquema de la
base, la configuración, los logs, la documentación que haya) y marca cada afirmación con su fuente
(`[código]`, `[base]`, `[configuración]`, `[documentación]`, `[inferido]`, y `[negocio]` para lo que
el dueño confirmó). Lo que no se puede leer se marca como hueco, no se rellena.

**Asociación (la)** — Así llamo en este documento al cliente del sistema Kikan (su nombre real
queda reservado): una asociación civil que atiende familias y necesitaba una mesa de entrada
omnicanal y campañas.

**AUD-*** — La serie de auditorías numeradas que se hicieron en Kikan en agosto, y que generaron
pendientes.

**Autorizador (el)** — Así llamo al sistema de la Obra Social que recibe las órdenes y devuelve un
veredicto (aprobada, rechazada). Para nosotros funciona de "oráculo": la verdad contra la que se
verifican los contadores.

**Autorizaciones** — Nombre con el que llamo al primer sistema en producción (el real queda
reservado): automatización de la gestión de órdenes de la Obra Social para un ente de salud, con
un humano en el circuito.

**await** — En JavaScript, la palabra que indica "esperá el resultado de esta llamada
asincrónica". Una llamada a la base sin `await` es un bug silencioso: el código sigue antes de
tener el dato.

**Backend** — La parte del sistema que no se ve: el servidor, la lógica, la base de datos. Lo
contrario de "frontend" (la pantalla).

**Batería (de tests)** — El conjunto completo de tests de un proyecto, corrido todo junto.

**Bloque funcional** — Un conjunto de entre cuatro y ocho pendientes relacionados que juntos hacen
algo que el negocio puede usar. Es la unidad de trabajo del bucle; dura entre una y dos semanas
en un proyecto chico.

**Bóveda (vault)** — Un lugar cifrado donde se guardan secretos (claves, contraseñas) en vez de
dejarlos en archivos de texto.

**Candado** — Una protección que impide que una acción peligrosa ocurra sin una condición
explícita. Por ejemplo, el botón de pánico tiene un candado dedicado: no se puede apretar por
accidente.

**Camino evolutivo-correctivo** — El tercer caso de uso del método: tomar un sistema que ya
existe y no nació con el método, normalizarlo sin reescribirlo (ocho estaciones, N0 a N7) y recién
después subir la escalera en modo correctivo (arreglar lo que falla) o evolutivo (agregar lo que
falta). Tiene página propia.

**Caracterización (test de)** — Un test que captura lo que el sistema hace hoy, exactamente como
lo hace, defectos incluidos; no lo que debería hacer. Nace en verde, y la prueba de que sirve es
que se pone en rojo cuando se rompe el flujo a propósito (una mutación). Es la batería que
protege un legado mientras se lo cambia. El término viene de la literatura sobre código heredado;
yo lo uso tal cual.

**Causa raíz** — El motivo real de un problema, en oposición al síntoma. Arreglar el síntoma hace
que el problema vuelva; arreglar la causa raíz, no.

**CI (integración continua)** — Un servicio (acá, GitHub Actions) que corre los tests
automáticamente cada vez que se sube código. CI/CD agrega el despliegue automático.

**Cinturón de seguridad** — En el camino evolutivo-correctivo, lo que tiene que existir
alrededor de un legado antes de cambiarle una línea: un entorno de prueba con datos anonimizados,
un despliegue que se repite, los secretos fuera del código y rotados, la integración continua
corriendo lo que haya, y la batería de caracterización. Es una compuerta dura, con una sola
excepción escrita (la urgencia en producción).

**CLAUDE.md / PROJECT.md** — El archivo que el agente lee al empezar cada sesión para saber qué es
el proyecto y cómo trabajar en él.

**Claude Code** — La herramienta de Anthropic con la que trabajé estos proyectos y con la que
escribí este documento: una sesión de un modelo con acceso al repositorio, que lee, escribe,
ejecuta y hace commits.

**Commit** — Un punto guardado en la historia del código, con un mensaje que explica qué cambió y
por qué. Cada commit tiene un identificador corto (por ejemplo `2219f7a`).

**Compuerta (gate)** — Una condición que tiene que cumplirse para poder avanzar. Si no se cumple,
no se pasa. En Forge están numeradas G1 a G9.

**Concurrencia** — Cuántas cosas pasan al mismo tiempo en el sistema (usuarios simultáneos,
procesos en paralelo).

**CORS** — Un mecanismo de seguridad de los navegadores que decide desde qué dominios se puede
llamar a un servidor. Mal configurado, bloquea llamadas legítimas con errores confusos.

**Criterios de aceptación** — Las condiciones, escritas en la forma "dado tal situación, cuando
pasa tal cosa, entonces se ve tal resultado", que definen cuándo un requerimiento está cumplido.
En el método son el "cómo se verifica" de cada pendiente y el guion del test de punta a punta.

**CVE** — Un identificador público de una vulnerabilidad de seguridad conocida en un componente de
software.

**Deuda técnica** — Lo que queda mal hecho "para arreglar después". El método la prohíbe: lo que se
rompe se arregla de raíz en la misma sesión.

**Discrepancia** — En la lectura de un sistema heredado, un punto en el que no coinciden el
código, la base de datos, la documentación y lo que el negocio cree que el sistema hace. Se lista
con la evidencia de cada lado y la decide el dueño, una por una: a veces el sistema está mal, y a
veces el negocio se había olvidado de una regla que el código recordaba.

**Doctrina** — En Forge, un documento corto que fija cómo se hace algo (cómo se testea, cómo se
verifica, cómo se dimensiona). Es la forma que toma el método adentro de la herramienta.

**Driver (criterio)** — Un factor que empuja una decisión para un lado o para otro. En el peldaño
0, los drivers son los factores que deciden si un proyecto es elegible.

**Dry-run (modo de ensayo)** — Correr un proceso "en seco": hace todo menos la acción final. El
aprobador automático corrió así al principio, mostrando qué habría aprobado sin aprobar nada.

**Embebido (embed)** — Forge instalado adentro del sistema del cliente, como asistente residente,
con permisos acotados.

**End to end (E2E, de punta a punta)** — Probar el sistema completo, desde la pantalla hasta la
base de datos, como lo usaría una persona.

**Entorno** — Una instalación separada del sistema. Los habituales: desarrollo (la máquina del
programador), UAT (prueba del cliente) y PROD (producción, el de verdad).

**Especificación de requerimientos** — En el método clásico, un documento largo que describía
todo lo que el sistema debía hacer. En este método se descompone: cada pendiente lleva su
especificación detallada completa, y la suma de los pendientes es la especificación del sistema.
Ver B.5.

**Estación (N0 a N7)** — Cada uno de los ocho pasos del tramo de normalización del camino
evolutivo-correctivo. Las llamo estaciones y no peldaños para que no se confundan con los dieciséis
de la escalera: no son peldaños nuevos, son los del arranque (y el 8, el 11 y el 12) en otro orden
y con otra entrada.

**Esqueleto (scaffold)** — La estructura inicial de un proyecto, sin funcionalidad: arranca, tiene
tests vacíos, se despliega.

**Fail-closed** — "Falla cerrado": ante la duda o el error, el sistema no actúa. Lo contrario de
"fail-open", que ante la duda sigue adelante.

**Fallback (al legado)** — Volver a un camino viejo cuando el nuevo falla. El método lo prohíbe:
si hay sistema viejo, se audita y se migra; no se deja como red de seguridad silenciosa.

**Fixture** — Datos de prueba que se cargan antes de correr un test o un despliegue.

**Flip (interruptor)** — Un cambio de configuración que elige entre dos caminos (por ejemplo, el
motor viejo o el nuevo) sin tocar código.

**Forge (Yujin Forge)** — La herramienta que construí: una capa sobre Claude Code que le agrega el
método (doctrinas, compuertas, pendientes, un panel de chat, una app móvil, y el modo embebido).

**Frontend** — La parte visible del sistema: las pantallas.

**Full scan** — Una consulta a la base de datos que lee la tabla entera porque no tiene un índice
que la ayude. Con tablas chicas no se nota; con millones de filas, tumba el sistema.

**G-DOC** — En Forge, la compuerta que exige que la documentación se actualice en el mismo commit
que el cambio.

**gate-ci** — El trabajo del despliegue de Kikan que espera a que la integración continua termine
en verde antes de empaquetar.

**GCP** — Google Cloud Platform, la nube donde corren los servidores de los dos sistemas de la
Asociación.

**GOTCHAS** — Un archivo que registra "trampas" conocidas: errores que ya pagamos una vez, con su
olor, su causa raíz, su arreglo y cómo detectarlos antes.

**Greenfield / brownfield** — Un proyecto nuevo desde cero (greenfield, "campo verde") contra uno
que parte de algo existente (brownfield, "campo usado").

**Grep** — Un comando que busca texto en archivos. "Medidor, no grep" significa: un número
importante no se saca contando con una búsqueda de texto, sino con un programa con test.

**Heap** — La memoria que usa un programa. "La batería moría por heap" quiere decir que los tests
se quedaban sin memoria y parecía que fallaban.

**HITL (human in the loop, humano en el circuito)** — Un diseño donde una persona aprueba antes
de que el sistema actúe. En Autorizaciones, el aprobador manual.

**Huérfano (turno huérfano)** — Un proceso que sigue corriendo cuando el que lo lanzó ya le perdió
el rastro.

**Índice** — Una estructura auxiliar de la base de datos que hace rápida una búsqueda. Sin índice,
la consulta es un full scan.

**Ingesta de requerimientos** — El momento en que el pedido del negocio entra al método: primero
en prosa, con el dueño, y después convertido en pendientes verificables por el agente, que
pregunta lo que falta.

**IPC (correa entre procesos)** — Un canal entre dos procesos. En Forge se usó como "correa": si
el proceso padre muere, el hijo se entera y se apaga.

**JSON (almacenamiento en)** — Guardar los datos en archivos de texto con formato JSON en vez de en
una base de datos. Sirve para arrancar; no sirve para millones de filas.

**Kikan** — El sistema de mesa de entrada omnicanal y campañas de la Asociación, el segundo sistema
en producción.

**Legado (legacy)** — Un sistema viejo que sigue en uso.

**Línea de tiempo** — La Parte B de este documento: cuándo se sube cada peldaño y qué tareas de
infraestructura, ingesta, desarrollo, pruebas y mirada humana pasan entre medio.

**Log** — El registro de lo que un programa va haciendo. "Validá con el log" significa: no confíes
en lo que el agente dice que hizo, mirá el registro.

**MariaDB** — El motor de base de datos SQL que usa Kikan en producción.

**Medidor con guarda** — Un script que mide algo (cuántas consultas, cuántos bucles) y que tiene un
test propio que verifica que el medidor mide bien. "Con guarda" quiere decir "protegido por un
test".

**Mentir (un medidor)** — Cuando un instrumento devuelve un número equivocado porque no ve parte de
lo que tiene que medir. Nos pasó dos veces.

**Mes tres** — Expresión mía para el momento en que un sistema construido a las apuradas empieza a
mostrar sus problemas: cuando ya tiene datos de verdad y usuarios de verdad.

**Mock (simular)** — Reemplazar una parte real del sistema por una simulación durante un test. "No
mockear a sí mismo" significa no simular justamente la parte que se quiere probar.

**Mutación (rojo por)** — La forma de demostrar que un test de caracterización vigila algo:
romper el flujo a propósito con un cambio temporal, ver el test en rojo, revertir, ver el verde. Un
test de caracterización sin su rojo por mutación es un test que pasa porque no mira nada.

**NAC3** — El protocolo de Forge que hace que las pantallas de una aplicación se puedan operar por
programa (cada elemento de la interfaz tiene un identificador y métodos). Permite el test de punta
a punta. No es obligatorio para el método: es el medio, no la condición.

**Node (Node 22)** — El entorno donde corre el JavaScript del servidor. "Node 22 fijo" quiere decir
que se clavó la versión para que todos los entornos usen la misma.

**Normalización** — Llevar un sistema que no nació con el método al estado que el método da por
supuesto al abrir el bucle, sin tocar su funcionalidad. Se hace en dos velocidades: el cinturón de
seguridad antes de cualquier cambio, y el resto de la deuda **a medida que se toca** cada módulo
(los pendientes de normalización marcados "se paga al tocar" entran con el bloque que entra a su
módulo). Nunca "una semana de limpieza general".

**Obra Social (la)** — Así llamo al ente de salud cliente del primer sistema en producción (su
nombre real queda reservado).

**Oráculo** — Una fuente de verdad externa contra la que se puede verificar un resultado.

**P0, P1, P2** — Niveles de prioridad de un hallazgo: P0 es lo que hay que resolver ya.

**Piloto automático** — Un mandato escrito para que el agente trabaje solo durante horas (24 o 48)
haciendo commits y pushes sin preguntar, y entregue un resumen al final.

**Pisar (una configuración)** — Escribir encima de algo por accidente.

**Pizarrón (el tablero)** — El tablero compartido de Forge donde el agente deja informes para que
yo los lea.

**Playwright** — Una herramienta que controla un navegador por programa para probar pantallas como
lo haría una persona.

**PND (pendiente)** — Un ítem numerado de la cola de trabajo (PND-001, PND-002…). En este método,
los pendientes SON el plan, cada uno lleva su especificación detallada, y los pendientes cerrados
son la documentación de lo hecho.

**Pendiente cerrado (documentación del hecho)** — Un pendiente que al cerrarse conserva su
especificación, la decisión que lo originó, la evidencia con la que se cerró, el commit y la
fecha. La cola de pendientes cerrados es el historial funcional del sistema.

**Presupuesto de consultas** — El máximo de consultas a la base que un camino de la aplicación
puede hacer, medido y protegido por un test.

**Probado en rojo** — Un test del que se demostró que FALLA contra el código viejo antes de que el
arreglo lo ponga en verde.

**PROD (producción)** — El entorno de verdad, el que usa el cliente.

**Promoción (UAT → PROD)** — Pasar algo del entorno de prueba al de producción de forma controlada.

**Pruebas de aceptación** — Las pruebas que hace el dueño, o un usuario de confianza, usando el
sistema como lo usaría de verdad, antes de aceptarlo para producción. Son humanas; no las hace el
agente.

**Pull / push** — Bajar y subir código al repositorio remoto (GitHub).

**Ref. N** — Una referencia corta a un caso real, explicado en el documento de referencias con su
fecha y su evidencia. Está para que los procedimientos queden limpios y el detalle siga disponible.

**Regresión** — Un test que verifica que algo que ya funcionaba sigue funcionando después de un
cambio.

**Repositorio (repo)** — El lugar donde vive el código con toda su historia. "Repo estándar" quiere
decir uno manejado con Git y con una estructura reconocible.

**Retención (retention)** — Cuánto tiempo se guardan los datos de cada tabla antes de borrarlos.

**Rollback (vuelta atrás)** — Volver a la versión anterior cuando un despliegue sale mal.

**RPAForce** — Mi marca, bajo la que se entregan estos sistemas.

**Runbook** — Un procedimiento operativo escrito paso a paso. "Idempotente" quiere decir que se
puede correr dos veces sin romper nada.

**Sembrador (seeder)** — Un script que carga datos de prueba en un entorno.

**Shift left** — Mover las pruebas más temprano en el proceso de desarrollo.

**Smell (olor)** — Una señal de que algo anda mal en el código, antes de que falle.

**SQ (estándares de calidad)** — El contrato de convivencia entre humano y agente en Forge.

**SQL** — El lenguaje de las bases de datos relacionales.

**Tag** — Una etiqueta sobre un commit que marca una versión.

**TDD** — "Primero el test, después el código". El método lo deja como opción para alcances
chicos, no como regla universal.

**Token** — Dos sentidos. En IA: la unidad con la que se mide (y se cobra) el texto que procesa el
modelo. En seguridad: una credencial de acceso.

**Tramo** — Cada uno de los tres grupos de peldaños: arranque (0 a 4), bucle (5 a 10), operación
(11 a 15).

**Trazabilidad** — Poder seguir un requerimiento hasta el pendiente que lo implementa, el test
que lo prueba y el commit que lo cerró. En el método no es una matriz aparte: es el pendiente
mismo, que cita su origen y su evidencia.

**Trinquete** — Un mecanismo que solo gira para un lado. En Kikan, un contador de llamadas sin
`await` que solo puede bajar: si sube, el test falla.

**Turno** — Una vuelta de la conversación con el agente: el usuario pide, el agente trabaja y
contesta.

**UAT** — El entorno donde el cliente prueba antes de producción.

**Urazuke** (裏付け) — El nombre del método. En japonés, el respaldo que tiene una afirmación, lo
que la sostiene por detrás; *urazukeru*, respaldar con pruebas. Se pronuncia u-ra-ZU-ke. No se
traduce.

**Vibecoding / vibecoder** — Construir software conversando con una IA, describiendo lo que se
quiere, en vez de escribir el código a mano. Un vibecoder es quien lo hace.

**Vigía** — En Autorizaciones, el proceso que revisa periódicamente qué quedó trabado y lo empuja,
con guardas para no empujar dos veces.

**Vista humana de las pantallas** — El hábito de que el dueño mire una captura real de cada
pantalla nueva o cambiada, en el entorno de prueba, con cada pendiente que la toca. Diez segundos
que encuentran lo que ningún test encuentra.

**Volumetría** — Cuántos datos va a manejar el sistema: filas por año, usuarios, picos.

**Watchdog (vigía de silencio)** — Un proceso que revisa si otro sigue dando señales de vida, y lo
mata si se queda callado demasiado tiempo.

**Yujin** — El ecosistema del que Forge es el producto comercial.
