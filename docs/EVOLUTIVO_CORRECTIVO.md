# Urazuke — el camino evolutivo-correctivo: normalizar un sistema que no nació con el método, y después subir la escalera

Autor: Pablo Kuschniroff, asistido por Claude Code. Versión 1, 18 de octubre de 2026. Esta página
es la segunda mitad del método: el [documento principal](ESCALERA_METODOLOGICA.md) describe el
camino de un proyecto nuevo, y acá describo qué hago cuando el sistema ya existe, lo hizo otro (o
lo hice yo mismo, "vibecodeando" sin evidencia), y ahora hay que corregirlo o hacerlo crecer. Las
palabras raras están en el glosario del documento principal; los casos reales, en las
[referencias](REFERENCIAS.md). Repositorio público:
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## Por qué esta página existe

Cuando escribí la escalera la escribí mirando la carpeta vacía: el peldaño 0 decide si el proyecto
se encara, el 4 despliega el esqueleto sin funcionalidad, y recién en el 5 aparece la primera cosa
que el usuario va a ver. Es el caso limpio, y es el que mejor enseña. Pero no es el caso más
frecuente. En la práctica, la mayoría de las veces que alguien me llama hay un sistema que ya
corre, con usuarios que dependen de él, hecho por alguien que ya no está o por un modelo al que
nadie le pidió evidencia, y el pedido es "arreglá esto" o "agregale aquello". Mi propia
herramienta entró a sistemas ajenos en modo diagnóstico mucho antes de que la escalera estuviera
escrita [Ref. 11](REFERENCIAS.md#ref-11), y la primera vez que el método se alimentó de un sistema
en producción fue mirando uno que ya existía [Ref. 12](REFERENCIAS.md#ref-12).

Y acá hay una trampa que quiero nombrar antes de seguir: la tentación, frente a un legado, es
elegir entre dos extremos que están los dos mal. Uno es "lo reescribo con el método, de cero":
suena limpio, y casi siempre termina en un segundo sistema que no llega a reemplazar al primero.
El otro es "le aplico el bucle directamente, que para eso están los peldaños 5 a 12": suena
pragmático, y es construir sobre arena, porque el bucle da por supuesto que existe un contrato, un
mapa, un entorno de prueba, una batería que corre y un despliegue que se repite. Nada de eso
existe en un sistema que no nació con el método. Este camino es el que va por el medio: **primero
se normaliza, sin reescribir, y después se sube la escalera**.

## Los casos de uso del método

El método tiene tres casos de uso, y conviene saber en cuál estás antes de abrir el agente, porque
cambia por dónde se entra.

| Caso | Punto de partida | Por dónde se entra | Qué hay antes de la primera funcionalidad | Dónde está escrito |
|---|---|---|---|---|
| **Proyecto nuevo** | Carpeta vacía y un dueño con un pedido. | Peldaño 0, y de ahí los veinticuatro en orden. | El tramo de arranque entero antes de la primera funcionalidad. | El documento principal, los veinticuatro contratos y el manual del curso. |
| **Evolutivo-correctivo sobre un sistema hecho con el método** | El sistema ya subió la escalera: tiene contrato, mapa, pendientes cerrados con evidencia, batería, despliegue y manuales. | Peldaño 5: se abre un bloque y se sigue el bucle; el 13 periódico; el 23 al cierre de la etapa. | Ninguna: es el peldaño 23 volviendo al 0 para la etapa siguiente, que ya está en la Parte B del documento principal. | El documento principal (fase 4, operación). |
| **Evolutivo-correctivo sobre un sistema hecho sin el método** | Un sistema que corre, con usuarios, sin ninguno de esos artefactos o con algunos a medias. | El tramo de normalización de esta página (N0 a N7), y recién después el bucle, en modo correctivo o evolutivo. | El tramo de normalización entero, antes de tocar la primera línea de funcionalidad. | Esta página y el manual del curso, parte 2. |

Lo que queda afuera, nombrado para que no se confunda: la **migración tecnológica** (cambiar de
plataforma, de lenguaje, de base de datos) no es un caso de uso del método; es otro proyecto, y en
general cae en los criterios excluyentes del peldaño 0 [Ref. 46](REFERENCIAS.md#ref-46). Si el
sistema que heredás no tiene repositorio accesible o sus pantallas no se pueden operar por
programa ni se pueden hacer operables, lo que corresponde no es normalizarlo sino un proyecto
nuevo que lo reemplace, con el peldaño 0 entero.

Y una aclaración que vale para el tercer caso: da lo mismo si el legado es de otro equipo o es
tuyo. Un sistema que construiste con un modelo, sin evidencia, hace tres meses, es exactamente
tan legado como el que hizo un contratista hace tres años. Cambia el esfuerzo de leerlo, no el
camino.

## El principio: normalizar sin reescribir, con todos los insumos

Normalizar es llevar el sistema al estado que el método da por supuesto al abrir el bucle. Y lo
hago con tres reglas que no negocio.

Y algo previo a las tres reglas: en este camino tampoco hay plazos. El método es un proceso, no
una promesa de velocidad; normalizar un legado tarda lo que el legado pida, y lo único que fijo es
el orden y las compuertas.

**Primera: no se reescribe.** La normalización no toca funcionalidad. Pone alrededor del sistema
lo que le falta (el contrato, el mapa, el entorno de prueba, la batería, el despliegue repetible,
los candados sobre lo que ya actúa sobre el mundo) y deja el sistema haciendo lo mismo que hacía.
Un legado se rompe más seguido por el entusiasmo de "ordenarlo todo" que por el bug que había que
arreglar.

**Segunda: dos velocidades.** Hay una parte de la deuda que se paga antes de cualquier cambio, y
la llamo el **cinturón de seguridad**: poder correr el sistema en un entorno de prueba con datos
parecidos a los reales, desplegarlo de forma repetible, tener los secretos fuera del código, y
tener una batería de caracterización de los flujos críticos que se pone en rojo si algo de eso
cambia. El cinturón es una **compuerta dura**: nada se cambia sin él, con una sola excepción
escrita para la urgencia en producción, que más abajo explico. El resto de la deuda se paga **a
medida que se toca**: cuando un bloque entra a un módulo, los pendientes de normalización de ese
módulo entran con él. Nunca "una limpieza general" antes de empezar.

**Tercera: todos los insumos de las etapas previas tienen que existir, aunque haya que
recuperarlos por autodescubrimiento.** Esta es la regla que distingue este camino de "aplicar el
bucle y ya". Cada peldaño del tramo de arranque produce un artefacto que los peldaños siguientes
leen: el relevamiento inicial, la ficha de elegibilidad, el contrato de convivencia, el archivo de
proyecto, el árbol semántico, el relevamiento de volumetría, el dimensionamiento, el relevamiento
de entornos, las compuertas. En el proyecto nuevo esos insumos los escribe el dueño con el agente a
partir de la ingesta. En el legado nadie los escribió, y el bucle no puede arrancar sin ellos. La
solución no es saltearlos: es que el agente los **recupere del sistema mismo**, leyendo el código,
el esquema de la base, la configuración de los entornos, los logs y lo que haya de documentación,
y que cada afirmación de esos documentos lleve una marca de dónde salió. Las marcas que uso son
cinco: `[código]`, `[base]`, `[configuración]`, `[documentación]` e `[inferido]`, más `[negocio]`
para lo que el dueño confirmó o corrigió. Un documento recuperado con marcas es un documento que
se puede verificar sin leer código: el dueño mira las afirmaciones marcadas `[inferido]` y las
confirma o las corrige, y mira las marcadas `[código]` para ver si el sistema hace lo que él cree
que hace. Lo que no coincide es una **discrepancia**, y las discrepancias son el oro de la
normalización: son los bugs que nadie reportó y las reglas que nadie decidió.

### La tabla de insumos recuperados

Para que no quede en abstracto, acá está cada insumo del tramo de arranque, dónde nace en el
proyecto nuevo, y cómo se consigue en el camino evolutivo-correctivo.

| Insumo | En el proyecto nuevo lo produce | En el camino evolutivo-correctivo | Quién confirma |
|---|---|---|---|
| `docs/INITIAL_SURVEY.md` | El dueño, a mano, en la ingesta (peldaño 0 y 2). | El agente lo redacta desde el código, la base y la configuración, con marcas de fuente, en N2; el dueño agrega lo que solo el negocio sabe. | El dueño, afirmación por afirmación en lo `[inferido]`. |
| `docs/ELIGIBILITY_CRITERIA.md` y `docs/ELIGIBILITY.md` | Peldaño 0. | N0, con cuatro criterios más propios del legado. | El dueño decide. |
| `docs/WORKING_AGREEMENT.md` | Peldaño 1. | N1, con cinco reglas más propias del legado. | El dueño. |
| `PROJECT.md`, `docs/SEMANTIC_TREE.md`, `docs/STATUS.md` | Peldaño 2, desde el relevamiento. | N2, desde el sistema, con marcas; más la lista de discrepancias. | El dueño recorre el árbol y decide cada discrepancia. |
| `docs/AUDIT_[fecha].md` | Peldaño 13, al final. | N3, al principio: es el inventario de la deuda. | El dueño lee y verifica dos hallazgos. |
| `docs/ENVIRONMENTS_SURVEY.md`, el entorno de prueba, la integración continua, el despliegue repetible, `docs/GATES.md` | Peldaño 4 y 13. | N4, el cinturón de seguridad, con la batería de caracterización. | El dueño ve la captura y la segunda corrida del despliegue. |
| `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`, `docs/PRODUCER_CONSUMER_MAP.md` | Peldaño 14 y 11. | N5, por inventario del código y la base. | El dueño confirma candado por candado. |
| `docs/VOLUME_SURVEY.md`, `docs/SIZING.md` | Peldaño 3, con números que da el negocio. | N6, con números medidos en la base y los logs (peldaño 7 aplicado al dimensionamiento). | El dueño aporta solo lo que no se puede medir. |
| `docs/PENDING.md` | Peldaño 5, desde el pedido del cliente. | N7, desde la auditoría, las discrepancias y el pedido del cliente, con la marca "bloquea / se paga al tocar / puede esperar". | El dueño ordena. |
| `docs/DECISIONS.md`, `docs/GOTCHAS.md`, `docs/LOCKS.md`, `docs/DEPLOYMENT.md` | Peldaños 6, 11, 14, 15. | Se crean vacíos o se completan en N2, N4 y N5, y crecen en el bucle como en el proyecto nuevo. | El dueño. |

Si al terminar N7 falta alguno de estos archivos, el tramo no está subido. No importa que el
sistema "funcione": el bucle lo va a necesitar en la primera sesión.

## El tramo de normalización: las ocho estaciones

Las llamo estaciones y no peldaños, y las numero N0 a N7, para que no se confundan con los
veinticuatro de la escalera. No son peldaños nuevos: son los peldaños del arranque y tres de la
operación (el 11, el 13 y el 14), en otro orden y con otra entrada. En el proyecto nuevo la
entrada es el relevamiento; acá la entrada es el sistema, y la lectura la hace el agente.

| Estación | Peldaños de origen | Qué cambia respecto del proyecto nuevo |
|---|---|---|
| N0 — Elegibilidad de un sistema existente | 0 | Cuatro criterios más; X2 se mide pantalla por pantalla; si está en rojo, es el primer pendiente, no una condición. |
| N1 — El contrato de convivencia para un legado | 1 | Cinco reglas más: no refactorizar lo no pedido, leer antes de tocar, anotar en vez de arreglar de paso, el comportamiento actual es la especificación, nada entra sin la caracterización en verde. |
| N2 — La lectura del sistema | 2 | El relevamiento, el archivo de proyecto y el árbol salen del código con marcas de fuente; aparece la lista de discrepancias. |
| N3 — La auditoría como inventario | 13 | Va primero, no última, y cada hallazgo dice si bloquea, si se paga al tocar, o si puede esperar. |
| N4 — El cinturón de seguridad | 4, 7, 13 | Entorno de prueba con datos, despliegue repetible, secretos afuera, integración continua, y la batería de caracterización. Compuerta dura. |
| N5 — Candados y mapa desde el código | 14, 11 | Inventario de todo lo que actúa sobre el mundo y de todos los contratos entre partes, antes de cambiar nada. |
| N6 — Dimensionar con números reales | 3, 7 | Los primarios se miden, no se preguntan; el dueño aporta solo lo que no está en la base. |
| N7 — El backlog de normalización | 5 | La deuda y el pedido del cliente, en una sola cola, con la marca de velocidad y el emparejamiento por módulo. |

El orden importa. N3 va antes que N4 porque la auditoría dice qué tiene que entrar en el cinturón
(los secretos que encontró, las pantallas que no se pueden operar, el despliegue que no se puede
repetir). N5 va después del cinturón porque inventariar acciones con consecuencia requiere poder
correr el sistema en un lugar donde equivocarse no cueste. N6 va al final porque mide sobre el
entorno de prueba con datos, que recién existe desde N4. Y N7 cierra porque junta todo lo
anterior en una sola cola.

### El orden de la normalización

No hay plazos: cada etapa dura lo que el sistema pida, y lo único fijo es el orden.

| Etapa | Estaciones | Qué más pasa |
|---|---|---|
| 1 | N0, N1, N2, N3 | Lectura del sistema con el dueño al lado, confirmando nodos y decidiendo discrepancias. Nada se cambia. Al cierre de la etapa: el mapa recuperado y el inventario de deuda. |
| 2 | N4, N5 | El cinturón: entorno de prueba con datos, despliegue repetido dos veces, secretos rotados, batería de caracterización de los flujos críticos. Candados confirmados sobre lo que ya actúa. Al cierre: el sistema corre en prueba y la batería está en verde. |
| 3 | N6, N7, y el primer bloque | Dimensionamiento medido. El backlog ordenado. Se abre el primer bloque con el peldaño 5, correctivo o evolutivo, con sus pendientes de normalización emparejados. De acá en adelante es el bucle de siempre. |

Si el sistema es grande, lo que crece es la etapa 1 (hay más que leer) y la batería de
caracterización de la etapa 2 (hay más flujos). No crece N7: un backlog de normalización que no se
puede escribir de una sentada es un backlog que nadie va a mantener.

---

### N0 — Elegibilidad de un sistema existente: los prerrequisitos que un modelo puede verificar

- **Intención**: decidir si este sistema se puede tomar con el método, antes de tocarlo, con
  criterios que no dependen de una evaluación humana sino de lo que un modelo de frontera puede
  hacer o no hacer con el sistema. Si un prerrequisito no se cumple, no es un "no va": es un
  **proyecto en sí mismo**, previo, para que el sistema se vuelva elegible.
- **Cuándo**: una vez, antes de cualquier otra cosa.
- **Entradas**: el relevamiento inicial corto, acceso de lectura al repositorio y, si se puede, al
  entorno donde corre y a su base.
- **Artefacto**: `docs/ELIGIBILITY.md` con la decisión y los siete prerrequisitos excluyentes del
  legado, cada uno verificado por el agente con evidencia, no declarado por una persona:
  1. **Se puede montar un ambiente completo del sistema**, con todos sus fuentes, su modelo de
     datos y su persistencia, desde el repositorio y una copia de los datos.
  2. **El código es entendible y abordable por un modelo de frontera**: el agente puede leerlo
     entero y explicar qué hace cada módulo sin inventar.
  3. **A partir del código, el modelo puede describir en un documento la funcionalidad completa
     del sistema**, en una forma que un usuario final reconozca como su sistema y acepte.
  4. **El frontend puede ser recorrido por herramientas de prueba** para generar tests de punta a
     punta, con cada elemento accesible y el efecto en el backend verificable (es X2).
  5. **El sistema se puede construir y ejecutar desde los fuentes con herramientas disponibles
     hoy**: las dependencias se resuelven, las versiones existen, nada depende de un binario
     perdido.
  6. **Los datos de producción se pueden copiar y anonimizar** para un entorno de prueba, y hay
     una copia de respaldo que se restauró al menos una vez.
  7. **Las integraciones externas tienen un modo de prueba o se pueden aislar en el borde** (una
     bandeja falsa, un proveedor en modo de ensayo), para que las acciones con consecuencia se
     prueben sin consecuencias.
- **Compuerta**: los siete en verde, con la evidencia del agente (el ambiente montado, el
  documento de funcionalidad escrito, un test de punta a punta de un flujo corriendo). Cada rojo
  se convierte en un proyecto previo con su propio pendiente de salida.
- **Quién decide**: el agente verifica y presenta la evidencia; el dueño decide si encara los
  proyectos previos o no.

**Antes de enviar el prompt**, esto tiene que existir, y lo hacés vos (o el negocio con vos), no
el agente:

- `docs/INITIAL_SURVEY.md`, la versión corta que podés escribir el primer día: qué hace el sistema
  y para quién, según el negocio; qué duele hoy (el bug que motiva el pedido, lo que falta); quién
  lo hizo y si está disponible; dónde corre; quién tiene acceso a qué; si hay respaldo y quién lo
  hace. Media página, incompleta a propósito: en N2 el agente la va a completar desde el sistema.
- `docs/ELIGIBILITY_CRITERIA.md`: la ficha del peldaño 0 (X1, X2 y los que ponderan) más los siete
  prerrequisitos del legado de arriba, cada uno con tres columnas vacías: verde o rojo, la evidencia
  (qué hizo el agente para verificarlo), y el proyecto previo si está en rojo.
- Acceso de lectura al repositorio para el agente, acceso a una copia de los datos (o a producción
  en solo lectura) y a un lugar donde pueda intentar montar el ambiente, con las credenciales fuera
  del chat. Sin esto, los prerrequisitos 1, 5 y 6 no se pueden verificar y quedan en rojo.
- Estado mínimo aceptable: el agente puede clonar el repositorio y tiene un lugar donde intentar
  levantar el sistema.

**Inicial:**

> We are going to assess whether this existing system can be taken over with the Urazuke method,
> with prerequisites that you verify by doing, not by asking. Read the initial survey in
> `docs/INITIAL_SURVEY.md` and the criteria sheet in `docs/ELIGIBILITY_CRITERIA.md`. Then, changing
> nothing in the system, verify each prerequisite with evidence: (1) try to set up a complete
> environment of the system from the repository and a copy of the data, with its sources, data
> model and persistence, and tell me exactly what you could and could not bring up; (2) read the
> whole code and tell me whether you can understand and work with it, module by module, naming
> what you cannot understand; (3) from the code alone, write `docs/FUNCTIONALITY_RECOVERED.md`: the
> complete functionality of the system described for an end user, screen by screen and process by
> process, marking what you inferred; (4) list every screen and say whether it can be driven by a
> test tool with each element accessible and the backend effect checkable, and prove it by writing
> and running one end-to-end test of one flow; (5) try to build and run the system from the sources
> with today's tools and report every dependency that does not resolve; (6) check whether the
> production data can be copied and anonymized into a test environment and whether a backup exists
> and has ever been restored; (7) list every external integration and say whether it has a test
> mode or can be isolated at the edge. For each prerequisite: green or red, the evidence (what you
> did and what happened), and, if red, what project would make it green. Do not decide: present me
> the sheet, and I decide.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [es]
> Vamos a evaluar si este sistema existente se puede tomar con el método Urazuke, con
> prerrequisitos que verificás haciendo, no preguntando. Leé el relevamiento inicial en
> `docs/INITIAL_SURVEY.md` y la ficha de criterios en `docs/ELIGIBILITY_CRITERIA.md`. Después, sin
> cambiar nada en el sistema, verificá cada prerrequisito con evidencia: (1) intentá montar un
> ambiente completo del sistema desde el repositorio y una copia de los datos, con sus fuentes, su
> modelo de datos y su persistencia, y decime exactamente qué pudiste levantar y qué no; (2) leé
> todo el código y decime si podés entenderlo y trabajar con él, módulo por módulo, nombrando lo
> que no entendés; (3) solo a partir del código, escribí `docs/FUNCTIONALITY_RECOVERED.md`: la
> funcionalidad completa del sistema descripta para un usuario final, pantalla por pantalla y
> proceso por proceso, marcando lo que inferiste; (4) listá cada pantalla y decí si se puede operar
> con una herramienta de prueba con cada elemento accesible y el efecto en el backend verificable,
> y demostralo escribiendo y corriendo un test de punta a punta de un flujo; (5) intentá construir
> y ejecutar el sistema desde los fuentes con las herramientas de hoy y reportá cada dependencia
> que no se resuelva; (6) verificá si los datos de producción se pueden copiar y anonimizar a un
> entorno de prueba y si existe una copia de respaldo que alguna vez se restauró; (7) listá cada
> integración externa y decí si tiene un modo de prueba o se puede aislar en el borde. Para cada
> prerrequisito: verde o rojo, la evidencia (qué hiciste y qué pasó) y, si está en rojo, qué
> proyecto lo pondría en verde. No decidas: presentame la ficha, y decido yo.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.
>
> Respondé en mi idioma.

Qué le estoy pidiendo: que los prerrequisitos se verifiquen **haciendo** (montar, leer, escribir el
documento, correr un test), porque un modelo de frontera puede hacer las cuatro cosas y entonces
la elegibilidad deja de ser una opinión; el documento de funcionalidad recuperada, que es la
prueba más fuerte de que el código es abordable, y que además es el primer borrador de lo que N2
va a convertir en el mapa; y que cada rojo venga con el proyecto que lo pone en verde, porque un
prerrequisito que falta no es un rechazo sino un trabajo previo con su propio alcance.

**Antes de enviar el prompt** de cierre: tu decisión en una línea, tomada después de leer la ficha
con la evidencia de cada prerrequisito; y, para cada rojo, tu decisión de si se encara el proyecto
previo ahora, después, o nunca (y entonces el sistema no es elegible).

**De cierre:**

> Decision: [go / go after these prerequisite projects: … / no-go]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, each prerequisite with its colour and its
> evidence, and, for every red one, the prerequisite project as a pending item in `docs/PENDING.md`
> marked as blocking, with its own acceptance criterion: the prerequisite verified green. Include
> the questions you asked and my answers.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [es]
> Decisión: [va / va después de estos proyectos previos: … / no va]. Escribí la ficha final en
> `docs/ELIGIBILITY.md` con la fecha, quién decidió, cada prerrequisito con su color y su evidencia,
> y, por cada uno en rojo, el proyecto previo como pendiente en `docs/PENDING.md` marcado como
> bloqueante, con su propio criterio de aceptación: el prerrequisito verificado en verde. Incluí
> las preguntas que hiciste y mis respuestas.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.

Verificación de completitud: ¿cada prerrequisito tiene evidencia de algo que el agente **hizo**, no
una respuesta tuya? ¿Existe `docs/FUNCTIONALITY_RECOVERED.md`, y lo leíste como el dueño: describe
el sistema que él cree tener? ¿Corrió un test de punta a punta real de un flujo? ¿Cada rojo tiene
su proyecto previo con criterio de salida? Señal de alarma: todos en verde en una tarde para un
sistema que nadie entiende. El agente contestó en vez de hacer.

---

### N1 — El contrato de convivencia para un legado

- **Intención**: fijar las reglas antes de tocar nada, con cinco reglas más que el peldaño 1, que
  son las que un sistema heredado necesita para que el agente no lo "mejore" por su cuenta.
- **Cuándo**: después de N0, antes de leer nada.
- **Entradas**: tus preferencias de trabajo, como en el peldaño 1.
- **Artefacto**: `docs/WORKING_AGREEMENT.md` con las seis reglas del método y las cinco del
  legado.
- **Compuerta**: el contrato tiene fecha y versión, y el archivo de proyecto (cuando exista, en N2)
  ordena leerlo.
- **Quién decide**: el dueño.

**Antes de enviar el prompt**, tenés que tener esto a mano:

- Tus preferencias de trabajo, en una lista corta, como en el peldaño 1: idioma, cuánto querés
  que te pregunte, qué autonomía le das, qué no tolerás.
- Una decisión tuya sobre el nivel de riesgo que aceptás mientras se normaliza: si el agente
  puede o no desplegar al entorno de prueba por su cuenta (a producción, nunca, hasta N4 cerrado y
  el peldaño 15 subido).
- `docs/ELIGIBILITY.md` (N0), cerrado.
- Estado mínimo aceptable: sabés contestar las preguntas del peldaño 1 y la del riesgo.

**Inicial:**

> Before we touch anything, we are going to set the working agreement between you and me for a
> system that already exists and has users. Write `docs/WORKING_AGREEMENT.md` with the six rules
> of the method (my time is sacred; zero technical debt; exact scope; documentation in the same
> commit; never report as done what you have not verified; speak my language), each with one line
> explaining what it prevents, and these five rules for an inherited system: (7) Nothing is
> refactored that was not asked for, and no module is rewritten. (8) Code you do not understand
> is read before it is touched, and what you learn goes into the system map. (9) Anything strange
> you find (a secret in the code, a dead path, a duplicated rule, a query without an index) is
> logged as a pending item with its evidence, never fixed in passing. (10) Current behaviour is
> the specification until the owner says otherwise: a difference between what the code does and
> what the business says is a discrepancy for me to decide, not a bug for you to fix silently.
> (11) No change reaches the test environment without the characterization suite green. Add any
> rules you think this system needs, marked as proposals. If you need to know something about how
> I work in order to write this, ask me.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [es]
> Antes de tocar nada, vamos a fijar el contrato de convivencia entre vos y yo para un sistema que
> ya existe y tiene usuarios. Escribí `docs/WORKING_AGREEMENT.md` con las seis reglas del método
> (mi tiempo es sagrado; cero deuda técnica; alcance exacto; documentación en el mismo commit;
> nunca reportar como hecho lo no verificado; hablá mi idioma), cada una con una línea que explique
> qué evita, y estas cinco reglas para un sistema heredado: (7) No se refactoriza nada que no se
> haya pedido, y no se reescribe ningún módulo. (8) El código que no entendés se lee antes de
> tocarse, y lo que aprendés va al mapa del sistema. (9) Cualquier cosa rara que encuentres (un
> secreto en el código, un camino muerto, una regla duplicada, una consulta sin índice) se anota
> como pendiente con su evidencia, nunca se arregla de paso. (10) El comportamiento actual es la
> especificación hasta que el dueño diga otra cosa: una diferencia entre lo que el código hace y lo
> que el negocio dice es una discrepancia que decido yo, no un bug que vos arreglás en silencio.
> (11) Ningún cambio llega al entorno de prueba sin la batería de caracterización en verde. Agregá
> las reglas que creas que este sistema necesita, marcadas como propuestas. Si necesitás saber algo
> sobre cómo trabajo para escribir esto, preguntame.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.

Qué le estoy pidiendo: las seis reglas de siempre, y cinco que existen porque un modelo frente a
un código ajeno hace tres cosas por reflejo: lo reordena, lo "arregla" donde le parece mal, y
asume que lo que el código hace es un error cuando difiere de lo que él esperaría. Las reglas 7,
9 y 10 bloquean exactamente esos tres reflejos. La regla 8 convierte la lectura en mapa, para que
lo que el agente aprende de un módulo no se pierda al cerrar la sesión. La 11 es el cinturón de
seguridad escrito como regla, para que exista antes de que exista la batería.

**De cierre:** el prompt de cierre del peldaño 1, sin cambios: aceptás y rechazás las propuestas
con razón, y el contrato queda con fecha y versión.

Señal de alarma: el agente propone como regla "modernizar el código a medida que se toca". Esa
regla es la reescritura disfrazada; rechazala con razón escrita.

---

### N2 — La lectura del sistema: el mapa recuperado y las discrepancias

- **Intención**: que exista el mapa que el peldaño 2 produce en un proyecto nuevo, pero sacado del
  sistema mismo, con marcas de fuente, y con la lista de todo lo que no coincide entre el código,
  la base, la documentación y lo que el negocio cree. Es el peldaño 2 hecho por ingeniería
  inversa, y es el paso que más valor da por hora de todo el camino.
- **Cuándo**: después de N1, con el dueño disponible para confirmar.
- **Entradas**: el repositorio completo, el esquema de la base en solo lectura, la configuración
  de cada entorno, los logs si hay, la documentación que exista, y el relevamiento corto de N0.
- **Artefacto**: `docs/INITIAL_SURVEY.md` completado con marcas; `PROJECT.md`;
  `docs/SEMANTIC_TREE.md` con cada nodo marcado; `docs/STATUS.md`; y la lista de discrepancias,
  cada una decidida por el dueño y escrita en `docs/DECISIONS.md`.
- **Compuerta**: ningún nodo `[inferido]` sin veredicto del dueño; ninguna discrepancia sin
  decisión o sin pendiente; la prueba de lectura del peldaño 2 pasada.
- **Quién decide**: el dueño, discrepancia por discrepancia.

**Antes de enviar el prompt**, esto tiene que existir, y lo hacés vos (o el negocio con vos), no
el agente:

- Acceso de lectura para el agente a todo lo que se pueda leer: el repositorio entero (todas las
  ramas, no solo la principal), el esquema de la base de datos (una credencial de solo lectura,
  fuera del chat), la configuración de cada entorno (los archivos de entorno con los valores de
  los secretos tapados, o la lista de variables sin sus valores), los logs recientes si existen,
  y cualquier documentación, aunque sea un correo viejo o un manual desactualizado.
- `docs/INITIAL_SURVEY.md` de N0, con una sección nueva, escrita por vos con el dueño: **lo que el
  negocio cree que el sistema hace**, en sus palabras, caso de uso por caso de uso, y las reglas
  de negocio que recuerda ("un turno no se puede cancelar con menos de dos horas"). No lo
  verifiques contra el sistema: justamente esa comparación la va a hacer el agente, y las
  diferencias son las discrepancias.
- `docs/WORKING_AGREEMENT.md` (N1), cerrado.
- Una lista escrita por vos de lo que vive fuera del repositorio y toca el sistema: un robot, una
  planilla que lee la base, un proceso programado en el servidor, otro sistema que consume una
  tabla. El agente no lo va a ver desde el código.
- Estado mínimo aceptable: el agente puede leer el código y el esquema de la base, y el
  relevamiento tiene al menos tres casos de uso y tres reglas en palabras del negocio.

**Inicial:**

> We are going to recover the map of this system from what exists. Read the whole repository
> (every branch), the database schema (read-only), the configuration of each environment, the
> recent logs and whatever documentation there is; if some part cannot be read from where you are,
> tell me and mark it as a gap; do not fill it by guessing. Then write three things. First,
> complete `docs/INITIAL_SURVEY.md` in the form the method expects (what the system does and for
> whom; what it does NOT do; who uses it; the technology; the environments; what an error costs),
> with every statement tagged by its source: [code], [database], [configuration], [documentation],
> [business] for what the survey already says, or [inferred]. Second, `PROJECT.md`, three hundred
> lines at most, and `docs/SEMANTIC_TREE.md`: the domains and, under each one, the actors, the
> processes (each with trigger, steps, outcome and exceptions as the code actually implements
> them), the entities with the attributes, states and transitions the database and the code
> enforce, the screens, the external integrations and the scheduled jobs; every node tagged the
> same way. Third, `docs/DISCREPANCIES.md`: everything where the code, the database, the
> documentation and what the business says in the survey do not agree, with the evidence on each
> side. Do not resolve any discrepancy and do not fix anything: list them. Create `docs/STATUS.md`
> for the living state.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [es]
> Vamos a recuperar el mapa de este sistema a partir de lo que existe. Leé el repositorio entero
> (todas las ramas), el esquema de la base de datos (solo lectura), la configuración de cada
> entorno, los logs recientes y la documentación que haya; si alguna parte no se puede leer desde
> donde estás, decímelo y marcala como hueco; no lo rellenes adivinando. Después escribí tres
> cosas. Primero, completá `docs/INITIAL_SURVEY.md` en la forma que el método espera (qué hace el
> sistema y para quién; qué NO hace; quién lo usa; la tecnología; los entornos; qué cuesta un
> error), con cada afirmación marcada por su fuente: [código], [base], [configuración],
> [documentación], [negocio] para lo que el relevamiento ya dice, o [inferido]. Segundo,
> `PROJECT.md`, de trescientas líneas como máximo, y `docs/SEMANTIC_TREE.md`: los dominios y, bajo
> cada uno, los actores, los procesos (cada uno con disparador, pasos, resultado y excepciones tal
> como el código los implementa de verdad), las entidades con los atributos, estados y transiciones
> que la base y el código imponen, las pantallas, las integraciones externas y los procesos
> programados; cada nodo marcado de la misma forma. Tercero, `docs/DISCREPANCIES.md`: todo aquello
> en lo que el código, la base, la documentación y lo que el negocio dice en el relevamiento no
> coinciden, con la evidencia de cada lado. No resuelvas ninguna discrepancia y no arregles nada:
> listalas. Creá `docs/STATUS.md` para el estado vivo.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.
>
> Respondé en mi idioma.

Qué le estoy pidiendo: que lea todo y declare lo que no pudo leer (la cláusula de completitud en
su forma de legado: el hueco se marca, no se rellena); que el relevamiento y el árbol salgan con
**marcas de fuente** en cada afirmación, porque esa marca es lo que te permite verificar sin leer
código; que los procesos y los estados sean **los que el código implementa**, no los que deberían
ser, porque el comportamiento actual es la especificación (regla 10 del contrato); que incluya
los procesos programados, que son los que nadie recuerda y los que más daño hacen; y que las
discrepancias queden listadas con la evidencia de cada lado y **sin resolver**, porque resolverlas
es decidir, y decidir es tuyo.

**Antes de enviar el prompt** de cierre: el árbol recorrido con el dueño nodo por nodo, con la
lista de nodos confirmados y la de corregidos; y la lista de discrepancias, cada una con la
decisión del dueño en una línea y la fecha (el sistema está bien y el negocio se había olvidado;
el sistema está mal y se cambia; o queda abierta con fecha, y no demasiadas).

**De cierre:**

> I confirm these nodes: [list]. Correct these: [list]. The discrepancies are decided as follows:
> [one line each: discrepancy, my decision, today's date]. Finalize `docs/INITIAL_SURVEY.md`,
> `PROJECT.md` and `docs/SEMANTIC_TREE.md` with today's date, keeping the source tags. Write each
> discrepancy decision in `docs/DECISIONS.md` with my exact words, and open a pending item in
> `docs/PENDING.md` for every discrepancy where I decided the system must change; for the ones
> where I decided the current behaviour stays, write it next to the node as a confirmed rule. Add
> to `PROJECT.md` the instruction to read this file, the tree and the working agreement at the
> start of every session.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [es]
> Confirmo estos nodos: [lista]. Corregí estos: [lista]. Las discrepancias se deciden así: [una
> línea cada una: discrepancia, mi decisión, la fecha de hoy]. Cerrá `docs/INITIAL_SURVEY.md`,
> `PROJECT.md` y `docs/SEMANTIC_TREE.md` con la fecha de hoy, conservando las marcas de fuente.
> Escribí cada decisión sobre una discrepancia en `docs/DECISIONS.md` con mis palabras exactas, y
> abrí un pendiente en `docs/PENDING.md` por cada discrepancia en la que decidí que el sistema
> tiene que cambiar; en las que decidí que el comportamiento actual se queda, escribilo junto al
> nodo como regla confirmada. Agregá a `PROJECT.md` la instrucción de leer este archivo, el árbol y
> el contrato de convivencia al empezar cada sesión.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.

Qué le estoy pidiendo: que la decisión sobre cada discrepancia quede en los tres lugares de
siempre (el registro de decisiones, el pendiente si hay que cambiar, el árbol si se confirma), y
que las marcas de fuente **no se borren** al cerrar: un árbol que perdió las marcas es un árbol
que ya no se puede verificar.

Verificación de completitud: recorré el árbol como el dueño: ¿hay un estado de entidad que el
negocio nunca usó? Si está marcado `[código]`, el sistema lo tiene aunque nadie lo use, y es una
discrepancia. ¿Hay un proceso programado en el árbol? Si no hay ninguno, preguntale al agente
dónde buscó. ¿Cada discrepancia tiene decisión con fecha? ¿Pasó la prueba de lectura del peldaño
2 (una sesión nueva sabe qué NO hace el sistema)? Señales de alarma: el árbol no tiene nada
marcado `[inferido]` (el agente no está distinguiendo lo que leyó de lo que supuso); la lista de
discrepancias está vacía (nunca está vacía en un legado: el agente comparó mal o no comparó); el
archivo de proyecto pasa las trescientas líneas porque "había mucho que documentar" (eso va al
árbol, y lo que pasó va al estado vivo [Ref. 41](REFERENCIAS.md#ref-41)).

---

### N3 — La auditoría como inventario de la deuda

- **Intención**: el peldaño 13, pero al principio y con una pregunta más por hallazgo: ¿bloquea,
  se paga al tocar el módulo, o puede esperar? El informe no es un informe: es la materia prima
  del cinturón (N4) y del backlog (N7). En mi primer proyecto que arrancó con el método ya
  escrito, la serie de auditorías tempranas se convirtió directamente en pendientes
  [Ref. 30](REFERENCIAS.md#ref-30); acá hago lo mismo sobre un sistema ajeno.
- **Cuándo**: después de N2, en una sesión distinta de la que leyó el sistema si se puede.
- **Entradas**: el repositorio en solo lectura, el entorno donde corre en solo lectura, el mapa
  recuperado (N2).
- **Artefacto**: `docs/AUDIT_[fecha].md` con cada hallazgo marcado "bloquea / se paga al tocar /
  puede esperar".
- **Compuerta**: ningún hallazgo sin marca de velocidad; los que bloquean tienen pendiente abierto
  antes de empezar N4.
- **Quién decide**: el dueño, sobre las marcas de velocidad.

**Antes de enviar el prompt**, esto tiene que existir, y lo hacés vos (o el negocio con vos), no
el agente:

- Una sesión nueva del agente, si tu herramienta lo permite, con un clon limpio y un archivo de
  instrucciones que diga "sos un auditor; no leíste ni vas a tocar este sistema", para que no
  comparta los supuestos de la sesión de N2. Si no se puede, la misma sesión, pero sabelo.
- Acceso de solo lectura al entorno donde corre el sistema (base, logs, configuración), con
  credenciales de solo lectura fuera del chat.
- El mapa recuperado de N2 (`PROJECT.md`, `docs/SEMANTIC_TREE.md`) y `docs/DISCREPANCIES.md`,
  para que el auditor no vuelva a descubrir lo que ya está escrito.
- Tu criterio sobre qué significa "bloquea": en general, un secreto expuesto, una pantalla que no
  se puede operar por programa, un despliegue que no se puede repetir, la falta de respaldo, y
  cualquier cosa que pueda dañar datos o cobrar de más. Escribilo en dos líneas para dárselo.
- Estado mínimo aceptable: el auditor tiene solo lectura y sabe qué considerás bloqueante.

**Inicial:**

> Audit this system for integrity, security, performance, code quality and deployability, as the
> inventory of what must be normalized before and during its evolution. Read-only: change nothing
> except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires access you
> lack (the database, the logs, the server), tell me and mark that part as not audited; do not
> pass it as fine. Go through all of the code, not a sample, and read `docs/SEMANTIC_TREE.md` and
> `docs/DISCREPANCIES.md` first so that you do not report what is already known. For every
> finding: where it is (file and line), the risk, the evidence that proves it (the command, the
> query, the number), its priority (P0 must be fixed now, P1 soon, P2 when possible), and one more
> field: whether it BLOCKS (must be fixed before any change, by my criteria: [criteria]), whether
> it is PAID WHEN TOUCHED (fixed together with the first change that enters its module), or whether
> it CAN WAIT. Grade every dimension you audited. End with every finding turned into a proposed
> pending item, blocking ones first.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [es]
> Auditá este sistema en integridad, seguridad, rendimiento, calidad de código y desplegabilidad,
> como inventario de lo que hay que normalizar antes y durante su evolución. Solo lectura: no
> cambies nada salvo escribir tu informe en `docs/AUDIT_[fecha].md`. Si auditar alguna parte
> requiere un acceso que no tenés (la base, los logs, el servidor), decímelo y marcá esa parte como
> no auditada; no la des por buena. Recorré todo el código, no una muestra, y leé antes
> `docs/SEMANTIC_TREE.md` y `docs/DISCREPANCIES.md` para no reportar lo que ya se sabe. Para cada
> hallazgo: dónde está (archivo y línea), el riesgo, la evidencia que lo prueba (el comando, la
> consulta, el número), su prioridad (P0 hay que arreglarlo ya, P1 pronto, P2 cuando se pueda), y
> un campo más: si BLOQUEA (hay que arreglarlo antes de cualquier cambio, según mi criterio:
> [criterio]), si SE PAGA AL TOCAR (se arregla junto con el primer cambio que entre a su módulo), o
> si PUEDE ESPERAR. Poné una nota a cada dimensión que auditaste. Terminá con cada hallazgo
> convertido en pendiente propuesto, los bloqueantes primero.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.
>
> Respondé en mi idioma.

Qué le estoy pidiendo: la auditoría del peldaño 13 con la dimensión "desplegabilidad" agregada
(porque en un legado el despliegue suele ser el primer problema) y con el campo de velocidad, que
es lo que convierte un informe en un plan: sin ese campo, un legado auditado tiene cuarenta
hallazgos y nadie sabe por cuál empezar. El criterio de qué bloquea lo doy yo, no el auditor,
porque depende de las consecuencias del negocio.

**De cierre:** el prompt de cierre del peldaño 13, al constructor, con un agregado: los
pendientes que abra llevan la marca de velocidad del hallazgo.

Verificación: ¿el informe dice qué NO pudo auditar? ¿Hay al menos un hallazgo marcado "bloquea"?
(En un legado, siempre hay; si no hay, el auditor no miró los secretos ni el despliegue.) ¿Dos
hallazgos al azar tienen archivo, línea y evidencia reproducible? Señal de alarma: todo está en
"puede esperar". Es un auditor que no quiere molestar.

---

### N4 — El cinturón de seguridad

- **Intención**: que exista, alrededor del sistema y sin tocar su funcionalidad, lo que hace
  seguro cambiarlo: un entorno de prueba con datos parecidos a los reales, un despliegue que se
  repite, los secretos fuera del código, la integración continua corriendo lo que haya, y la
  **batería de caracterización** de los flujos críticos. Es el peldaño 4, la primera mitad del
  15 y una forma invertida del 8, juntos y antes de cualquier cambio. Es una **compuerta dura**:
  hasta que el cinturón no está en verde, no se cambia una línea de funcionalidad.
- **Cuándo**: después de N3, antes de cualquier cambio.
- **Entradas**: el relevamiento de entornos (recuperado en N2 y confirmado por vos), el informe de
  N3 con sus hallazgos bloqueantes, el árbol semántico con los procesos, y acceso al servidor y a
  la base.
- **Artefacto**: el entorno de prueba corriendo con datos anonimizados; `docs/DEPLOYMENT.md` con
  el despliegue a prueba repetido dos veces; los secretos en la configuración del servidor y
  rotados; la integración continua en verde; `docs/GATES.md`; y la batería de caracterización en
  verde, con el rojo demostrado para cada flujo.
- **Compuerta**: captura del sistema corriendo en prueba vista por vos; segunda corrida del
  despliegue sin cambios; búsqueda de secretos en el repositorio vacía; batería de caracterización
  en verde y cada test probado en rojo por mutación.
- **Quién decide**: el dueño, sobre qué flujos son críticos y sobre la anonimización de los datos.

**Antes de enviar el prompt**, esto tiene que existir, y lo hacés vos (o el negocio con vos), no
el agente:

- `docs/ENVIRONMENTS_SURVEY.md`, que el agente redactó en N2 con marcas y vos completaste: dónde
  corre hoy, cómo se despliega hoy (aunque sea "copio los archivos por FTP"), dónde van a vivir los
  secretos en el servidor, quién tiene acceso, y dónde va a correr el entorno de prueba (un
  servidor aparte, un contenedor, una cuenta de nube; si no tenés nada, decilo y el agente propone
  lo más simple). El prompt lo nombra "the environments survey"; decile dónde está.
- Acceso del agente al servidor de producción en solo lectura (para copiar la base y la
  configuración) y al lugar donde va a correr el entorno de prueba con permisos de escritura, con
  las credenciales fuera del chat.
- Tu decisión sobre la **anonimización** de los datos de prueba: qué campos son datos personales
  (nombres, teléfonos, correos, documentos) y cómo se reemplazan. Lo decidís vos porque es una
  obligación legal, no una preferencia técnica.
- La lista de **flujos críticos** para la caracterización, escrita por vos a partir de los
  procesos del árbol semántico: los que, si cambian sin querer, le cuestan plata o confianza al
  negocio. Entre cuatro y ocho para un sistema chico. No "todos": todos es ninguno.
- `docs/AUDIT_[fecha].md` (N3), para que el agente sepa qué secretos encontró y qué pantallas no
  se pueden operar.
- Un respaldo de producción restaurado al menos una vez, aunque sea en tu máquina, antes de que
  el agente toque el servidor. Es la condición del N0 que vence acá.
- Estado mínimo aceptable: sabés dónde va a correr el entorno de prueba, tenés la lista de flujos
  críticos, decidiste la anonimización y restauraste un respaldo.

**Para el entorno, el despliegue y los secretos:**

> We are going to build the safety belt around this system before changing anything in it. Read
> the environments survey, `docs/AUDIT_[date].md` and `docs/SEMANTIC_TREE.md`. Evaluate whether you
> have what is needed (read access to the server where it runs and to its database, write access
> to where the test environment will run, the way it is deployed today); if anything is missing,
> ask me before starting. Then set up, without touching any functionality: (1) a test environment
> that runs the system exactly as production does, with a copy of the data where the personal
> fields I listed are anonymized; (2) a reproducible deployment to that environment, run twice,
> showing me that the second run changed nothing; (3) every secret found in the repository or in
> the code moved to the server configuration (environment file or vault), with the list of what
> you moved so that I rotate each one; (4) continuous integration running whatever test suite
> exists today, even if it is a single smoke test, on every push; (5) `docs/GATES.md` with the
> gates of this project, including: nothing reaches the test environment without the
> characterization suite green, and nothing reaches production without the full suite green with
> the exact version. Document all of it in `docs/DEPLOYMENT.md` so that a person can do it by hand
> without you. Take a screenshot of the system running in the test environment and show it to me.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [es]
> Vamos a construir el cinturón de seguridad alrededor de este sistema antes de cambiarle nada.
> Leé el relevamiento de entornos, `docs/AUDIT_[fecha].md` y `docs/SEMANTIC_TREE.md`. Evaluá si
> tenés lo necesario (acceso de lectura al servidor donde corre y a su base, acceso de escritura a
> donde va a correr el entorno de prueba, la forma en que se despliega hoy); si falta algo,
> pedímelo antes de empezar. Después armá, sin tocar ninguna funcionalidad: (1) un entorno de prueba
> que corra el sistema exactamente como producción, con una copia de los datos donde los campos
> personales que te listé estén anonimizados; (2) un despliegue reproducible a ese entorno, corrido
> dos veces, mostrándome que la segunda corrida no cambió nada; (3) todo secreto encontrado en el
> repositorio o en el código movido a la configuración del servidor (archivo de entorno o bóveda),
> con la lista de lo que moviste para que yo rote cada uno; (4) la integración continua corriendo
> la batería que exista hoy, aunque sea un solo test de humo, en cada push; (5) `docs/GATES.md` con
> las compuertas de este proyecto, incluidas: nada llega al entorno de prueba sin la batería de
> caracterización en verde, y nada llega a producción sin la batería completa en verde con la
> versión exacta. Documentá todo en `docs/DEPLOYMENT.md` de modo que una persona lo pueda hacer a
> mano sin vos. Sacá una captura del sistema corriendo en el entorno de prueba y mostrámela.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.
>
> Respondé en mi idioma.

Qué le estoy pidiendo: el esqueleto del peldaño 4 construido alrededor de algo que ya existe, con
la mitad del peldaño 15 adelantada (secretos afuera, despliegue documentado) porque en un legado
los secretos en el código son la regla y no la excepción [Ref. 42](REFERENCIAS.md#ref-42); la
anonimización como parte del entorno y no como un detalle; y las compuertas escritas antes de que
exista la batería, para que la batería nazca ya siendo compuerta.

**Antes de enviar el prompt** de la batería: el entorno de prueba abierto por vos con los datos
anonimizados; los secretos de la lista rotados, hoy; la lista de flujos críticos para el hueco del
prompt; y, si N0 dejó pantallas en rojo, el pendiente bloqueante que las hace operables cerrado
antes o como parte de esta batería.

**Para la batería de caracterización:**

> We are going to write the characterization tests of these critical flows: [list]. A
> characterization test captures what the system does today, exactly as it does it, defects
> included; it is not a test of what the system should do. For each flow: drive it from the
> screen as a user would and check the effect in the backend (the row, the state, the message
> queued). Every test must pass against the current code. Then prove that each test actually
> watches its flow: break the flow deliberately with a temporary change, show me the red output,
> revert the change, show me the green. If a flow cannot be driven from the screen, do not
> simulate it: say so and open a pending item marked as blocking. If while writing these tests you
> find behaviour that looks wrong, do not fix it: add it to `docs/DISCREPANCIES.md` with the
> evidence. Record the command to run the suite in `docs/STATUS.md`, and make the suite the gate
> for the test environment as `docs/GATES.md` says.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [es]
> Vamos a escribir los tests de caracterización de estos flujos críticos: [lista]. Un test de
> caracterización captura lo que el sistema hace hoy, exactamente como lo hace, defectos
> incluidos; no es un test de lo que el sistema debería hacer. Para cada flujo: operalo desde la
> pantalla como lo haría un usuario y verificá el efecto en el backend (la fila, el estado, el
> mensaje encolado). Todos los tests tienen que pasar contra el código actual. Después demostrá
> que cada test de verdad vigila su flujo: rompé el flujo a propósito con un cambio temporal,
> mostrame la salida en rojo, revertí el cambio, mostrame el verde. Si un flujo no se puede operar
> desde la pantalla, no lo simules: decilo y abrí un pendiente marcado como bloqueante. Si mientras
> escribís estos tests encontrás un comportamiento que parece incorrecto, no lo arregles: agregalo
> a `docs/DISCREPANCIES.md` con la evidencia. Registrá el comando para correr la batería en
> `docs/STATUS.md`, y hacé que la batería sea la compuerta del entorno de prueba como dice
> `docs/GATES.md`.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.
>
> Respondé en mi idioma.

Qué le estoy pidiendo: el peldaño 8 al revés. En el proyecto nuevo el test nace en rojo y pasa a
verde con el cambio; acá el test nace en verde, porque captura lo que hay, y la prueba de que
sirve es que **se pone en rojo cuando rompés el flujo a propósito**. Sin esa mutación demostrada,
un test de caracterización es un test que pasa porque no mira nada, que es el mismo problema que
el verde que esconde un bug [Ref. 44](REFERENCIAS.md#ref-44). Y las dos cláusulas de disciplina:
lo que no se puede operar se declara y bloquea, y lo que parece mal se anota como discrepancia,
no se arregla, porque hasta que el dueño no decida, el comportamiento actual es la
especificación.

Verificación de completitud: ¿abriste vos la URL del entorno de prueba y viste el sistema con
datos? ¿Buscaste un nombre real en esos datos y no está? ¿El despliegue corrió dos veces y la
segunda no cambió nada? ¿Pediste la búsqueda de secretos en el repositorio y vino vacía? ¿Rotaste
cada secreto de la lista? ¿Cada flujo crítico tiene su test, y cada test tiene su rojo por
mutación a la vista? Señales de alarma: la batería de caracterización pasó entera "a la primera" y
nunca se mostró un rojo; el entorno de prueba corre "en la máquina del agente" y no en un lugar
que vos puedas abrir; los datos de prueba son "unos pocos registros de ejemplo" en vez de una
copia anonimizada (los bugs de un legado viven en los datos reales, no en los de ejemplo).

---

### N5 — Candados y mapa productor-consumidor desde el código

- **Intención**: saber, antes de cambiar nada, qué hace el sistema que actúa sobre el mundo
  (cobra, envía, aprueba, borra, avisa, corre solo de noche) y quién produce y consume cada
  contrato entre partes. En el proyecto nuevo esto se decide antes de construir (peldaño 14) y se
  mapea a medida que se construye (peldaño 11). En el legado ya está construido, y nadie lo
  recuerda entero. Un cambio evolutivo puede disparar una acción con consecuencia que estaba
  dormida, y un cambio correctivo puede dejar un consumidor desactualizado.
- **Cuándo**: después del cinturón, porque inventariar acciones requiere poder
  correr el sistema donde equivocarse no cueste.
- **Entradas**: el código, la base, los procesos programados del servidor, el árbol semántico, y la
  lista de lo que vive fuera del repositorio.
- **Artefacto**: `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` con marcas de fuente,
  `docs/PRODUCER_CONSUMER_MAP.md`, y después del cierre `docs/LOCKS.md` con los candados que van
  ahora y los que van después.
- **Compuerta**: ninguna acción con consecuencia sin veredicto del dueño; los candados marcados
  "ahora" implementados con su test en rojo antes del primer bloque.
- **Quién decide**: el dueño, candado por candado.

**Antes de enviar el prompt**, esto tiene que existir, y lo hacés vos (o el negocio con vos), no
el agente:

- Con el dueño, una lista escrita de lo que el negocio **sabe** que el sistema hace hacia afuera:
  qué cobra, qué manda, a quién avisa, qué borra, qué corre solo. Va en una sección de
  `docs/INITIAL_SURVEY.md`. El agente va a encontrar en el código más de lo que el negocio
  recuerda; la comparación entre las dos listas es el resultado.
- Acceso del agente a los procesos programados del servidor (la lista de tareas programadas o el
  equivalente de tu plataforma), porque los envíos automáticos suelen vivir ahí y no en el
  código.
- La lista de lo que vive fuera del repositorio (N2), para el mapa.
- El entorno de prueba de N4 corriendo, para que pueda disparar una acción y ver qué pasa sin
  consecuencias reales.
- Estado mínimo aceptable: el negocio escribió su lista y el agente puede ver las tareas
  programadas.

**Inicial:**

> Go through the code, the database triggers and the scheduled jobs of the server looking for
> everything that charges, sends, approves, deletes, notifies outwards or runs on a schedule, and
> write `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` with every statement tagged by its source. Compare
> it with the list the business wrote in `docs/INITIAL_SURVEY.md`: whatever the code does that the
> business did not list, or the other way round, ask me about before going on. For every action:
> what triggers it, whether it can run twice, whether it is reversible, what lock exists today if
> any, and what the way back is. In the same pass, build `docs/PRODUCER_CONSUMER_MAP.md`: for every
> contract in the system (a service, a table, a file format, a list of values), who produces it
> and who consumes it, including the things outside the repository I told you about. If there are
> parts you cannot see, say so instead of leaving them out. Present me the actions table with a
> proposed lock for each (explicit confirmation, double safety, dry-run mode, daily limit, a human
> in the loop) and a proposal of which locks go NOW, before any change, and which can go when the
> module is touched. Do not implement anything yet: I confirm lock by lock.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [es]
> Recorré el código, los disparadores de la base y las tareas programadas del servidor buscando
> todo lo que cobra, envía, aprueba, borra, avisa hacia afuera o corre solo con un horario, y
> escribí `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` con cada afirmación marcada por su fuente.
> Comparalo con la lista que el negocio escribió en `docs/INITIAL_SURVEY.md`: lo que el código hace
> y el negocio no listó, o al revés, preguntámelo antes de seguir. Para cada acción: qué la
> dispara, si puede correr dos veces, si es reversible, qué candado tiene hoy si tiene alguno, y
> cuál es el camino de vuelta. En la misma pasada, construí `docs/PRODUCER_CONSUMER_MAP.md`: para
> cada contrato del sistema (un servicio, una tabla, un formato de archivo, una lista de valores),
> quién lo produce y quién lo consume, incluidas las cosas fuera del repositorio que te conté. Si
> hay partes que no podés ver, decilo en vez de dejarlas afuera. Presentame la tabla de acciones
> con un candado propuesto para cada una (confirmación explícita, doble seguro, modo de ensayo,
> límite diario, un humano en el circuito) y una propuesta de qué candados van AHORA, antes de
> cualquier cambio, y cuáles pueden ir cuando se toque el módulo. No implementes nada todavía: yo
> confirmo candado por candado.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.
>
> Respondé en mi idioma.

Qué le estoy pidiendo: el inventario de los peldaños 14 y 11 en una pasada, porque recorren el
mismo código; la comparación entre lo que el negocio recuerda y lo que el código hace, que es
donde aparecen los envíos de los que nadie se acordaba; y la propuesta de **ahora o al tocar**
para cada candado, que es la regla de las dos velocidades aplicada a la protección: un candado
sobre una acción que cobra va ahora; un candado sobre una exportación mensual puede esperar al
bloque que toque ese módulo.

**De cierre:** el prompt de cierre del peldaño 14, con los candados marcados "ahora", cada uno con
su test en rojo contra la versión sin candado; los demás quedan en el backlog con su marca.

Señal de alarma: el agente encontró exactamente las mismas acciones que el negocio listó. En un
legado nunca pasa; faltó mirar las tareas programadas o los disparadores de la base.

---

### N6 — Dimensionar con números reales

- **Intención**: el peldaño 3, pero con la ventaja enorme del legado: los datos primarios no hay
  que preguntarlos, están en la base y en los logs. Se miden con el peldaño 7 (un medidor con
  test, auditado en dos direcciones) y el dueño aporta solo lo que no está en ningún lado: cuánto
  esperan crecer y si el sistema se va a vender a otros.
- **Cuándo**: después de N5, antes de abrir el primer bloque.
- **Entradas**: la base de producción en solo lectura o la copia completa de prueba, los logs, el
  árbol semántico con las entidades.
- **Artefacto**: `docs/VOLUME_SURVEY.md` con cada número marcado `[base]` o `[log]` y su comando,
  los medidores en el repositorio con su test, y `docs/SIZING.md` con el "por diez" y las
  decisiones asimétricas que conviene tomar antes de evolucionar.
- **Compuerta**: ningún número primario sin medidor; una cuenta rehecha por vos que coincide.
- **Quién decide**: el dueño, sobre el crecimiento esperado y las decisiones asimétricas.

**Antes de enviar el prompt**, tenés que tener esto a mano:

- Acceso de solo lectura a la base de producción (o la copia completa de N4, si la anonimización
  no tocó las fechas ni las cantidades) y a los logs de acceso o de aplicación, con la credencial
  fuera del chat.
- Las dos respuestas que solo el negocio tiene, escritas: cuánto esperan crecer en los próximos
  dos años, y si el sistema se va a usar en más de un lugar (el "por diez").
- Un caso conocido para el test de cada medidor: por ejemplo, la cantidad de registros de una
  tabla chica que podés contar a mano.
- Estado mínimo aceptable: el agente puede consultar la base y vos tenés las dos respuestas.

**Inicial:**

> Before changing anything we are going to size this system with its real numbers. With read-only
> access to the production database (or the complete test copy) and to the logs, measure instead
> of asking: rows per table and growth per month from the timestamps, events per entity, peak
> concurrency from the access logs, data size today and projected at five years, and the slowest
> queries. Write a meter for each number (a script that lives in the repository, with a test
> against a known case I will give you) and show me every number together with the command that
> produces it; audit each meter in both directions (is everything that should be counted, counted?
> does everything counted exist?). Write `docs/VOLUME_SURVEY.md` with every figure tagged
> [database] or [log], and ask me only for what cannot be measured: the growth the business
> expects and whether the system will serve more than one site. Then write `docs/SIZING.md`: what
> breaks first if everything is multiplied by ten, which of the current architecture choices hold
> and which do not, and which asymmetric decisions we take now, before evolving, because they are
> cheap today and expensive later. Do not change any code.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [es]
> Antes de cambiar nada vamos a dimensionar este sistema con sus números reales. Con acceso de
> solo lectura a la base de producción (o a la copia completa de prueba) y a los logs, medí en vez
> de preguntar: filas por tabla y crecimiento por mes a partir de las fechas, eventos por entidad,
> concurrencia en el pico a partir de los logs de acceso, tamaño de los datos hoy y proyectado a
> cinco años, y las consultas más lentas. Escribí un medidor por cada número (un script que vive
> en el repositorio, con un test contra un caso conocido que te voy a dar) y mostrame cada número
> junto con el comando que lo produce; auditá cada medidor en las dos direcciones (¿está contado
> todo lo que debería contarse? ¿existe todo lo contado?). Escribí `docs/VOLUME_SURVEY.md` con cada
> cifra marcada [base] o [log], y pedime solo lo que no se puede medir: el crecimiento que el
> negocio espera y si el sistema va a servir a más de un lugar. Después escribí `docs/SIZING.md`:
> qué se rompe primero si todo se multiplica por diez, cuáles de las decisiones de arquitectura
> actuales aguantan y cuáles no, y qué decisiones asimétricas tomamos ahora, antes de evolucionar,
> porque hoy son baratas y después caras. No cambies ningún código.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.
>
> Respondé en mi idioma.

Qué le estoy pidiendo: medir en vez de preguntar, que es lo que el legado permite y el proyecto
nuevo no; el medidor con test y la auditoría en dos direcciones del peldaño 7, porque los medidores
mienten [Ref. 35](REFERENCIAS.md#ref-35), [Ref. 36](REFERENCIAS.md#ref-36); y el dimensionamiento
como compuerta antes de evolucionar [Ref. 14](REFERENCIAS.md#ref-14): si la arquitectura actual no
aguanta el "por diez" y el pedido del cliente es justamente crecer, eso se sabe ahora y no en el
tercer bloque.

**De cierre:** el prompt de cierre del peldaño 3, eligiendo entre las opciones que haya propuesto
para lo que no aguanta, o confirmando que lo actual aguanta.

Señal de alarma: un número "aproximado" sin marca de aproximado. Si está en la base, se mide; si no
está, se pide; no hay tercera opción.

---

### N7 — El backlog de normalización, emparejado con el pedido del cliente

- **Intención**: una sola cola de pendientes, con especificación completa, donde conviven la deuda
  (lo que salió de la auditoría, las discrepancias, las pantallas no operables, los candados
  pendientes, las decisiones del dimensionamiento) y el pedido del cliente (lo que hay que corregir
  y lo que hay que agregar), cada uno con su marca de velocidad y emparejados por módulo. Es el
  peldaño 5 con dos columnas más.
- **Cuándo**: al cierre del tramo. Después, el bucle.
- **Entradas**: `docs/AUDIT_[fecha].md`, `docs/DISCREPANCIES.md` con las decisiones,
  `docs/LOCKS.md`, `docs/SIZING.md`, el árbol semántico, y el pedido del cliente para esta etapa.
- **Artefacto**: `docs/PENDING.md` con todos los pendientes especificados, marcados "bloquea / se
  paga al tocar / puede esperar" y "correctivo / evolutivo / normalización", y el emparejamiento
  por módulo.
- **Compuerta**: no queda ningún pendiente marcado "bloquea" abierto antes del primer bloque;
  cada pendiente del cliente tiene listados los de normalización que entran con él.
- **Quién decide**: el dueño, sobre el orden.

**Antes de enviar el prompt**, esto tiene que existir, y lo hacés vos (o el negocio con vos), no
el agente:

- El pedido del cliente para esta etapa, en prosa y con sus palabras, separado en dos listas: lo
  que **falla hoy** (cada cosa con cómo se reproduce, qué pasa y qué debería pasar, según el
  negocio) y lo que **falta** (lo nuevo). Va en `docs/blocks/STAGE_01_REQUEST.md` o donde
  prefieras; el prompt dice "the client's request for this stage", así que decile dónde está. Si
  el dueño dio prioridades, también.
- Todos los artefactos de N2 a N6 cerrados: el árbol, la auditoría, las discrepancias decididas,
  los candados, el dimensionamiento. Si falta alguno, no abras este prompt: el backlog va a salir
  incompleto y no vas a saber qué le falta.
- Los pendientes bloqueantes que ya existen (de N0, N3 y N4) cerrados o en curso con fecha.
- Estado mínimo aceptable: el pedido del cliente está en dos listas con sus palabras, y los
  artefactos de las estaciones anteriores existen.

**Inicial:**

> We are going to turn the normalization and the client's request for this stage into one queue
> of numbered pending items in `docs/PENDING.md`, each with its full specification as the method
> asks (number, title, node of the semantic tree, origin, description, business rules with
> decision and date or marked as missing, data in and out, screens, edge cases, acceptance
> criteria as given, when, then, how it will be verified, status). Sources for the normalization
> items: `docs/AUDIT_[date].md`, the discrepancies I decided to change, the screens that cannot be
> driven by a program, the secrets to rotate, the locks that are not implemented yet, and the
> decisions in `docs/SIZING.md`; each one keeps its speed mark: BLOCKS, PAID WHEN TOUCHED, or CAN
> WAIT. Sources for the client's items: the client's request for this stage; each one marked
> CORRECTIVE (something that fails today, with the way to reproduce it in the client's words) or
> EVOLUTIVE (something new). For every client item, list the normalization items that touch the
> same modules and should be paid together with it. If the request is ambiguous on any point such
> that you cannot write a verifiable item, ask me; do not resolve it by assuming. Order: blocking
> items first, then the client's items in the priority I gave you, each with its paired
> normalization.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [es]
> Vamos a convertir la normalización y el pedido del cliente para esta etapa en una sola cola de
> pendientes numerados en `docs/PENDING.md`, cada uno con su especificación completa como pide el
> método (número, título, nodo del árbol semántico, origen, descripción, reglas de negocio con
> decisión y fecha o marcadas como faltantes, datos que entran y salen, pantallas, casos borde,
> criterios de aceptación en la forma dado, cuando, entonces, cómo se verifica, estado). Fuentes de
> los pendientes de normalización: `docs/AUDIT_[fecha].md`, las discrepancias en las que decidí
> cambiar, las pantallas que no se pueden operar por programa, los secretos a rotar, los candados
> que todavía no están implementados, y las decisiones de `docs/SIZING.md`; cada uno conserva su
> marca de velocidad: BLOQUEA, SE PAGA AL TOCAR, o PUEDE ESPERAR. Fuentes de los pendientes del
> cliente: el pedido del cliente para esta etapa; cada uno marcado CORRECTIVO (algo que hoy falla,
> con la forma de reproducirlo en palabras del cliente) o EVOLUTIVO (algo nuevo). Para cada
> pendiente del cliente, listá los pendientes de normalización que tocan los mismos módulos y
> conviene pagar junto con él. Si el pedido es ambiguo en algún punto de modo que no puedas escribir
> un pendiente verificable, preguntame; no lo resuelvas suponiendo. Orden: primero los que
> bloquean, después los del cliente en la prioridad que te di, cada uno con su normalización
> emparejada.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.
>
> Respondé en mi idioma.

Qué le estoy pidiendo: el peldaño 5 completo (la especificación detallada vive en cada pendiente,
también en los de normalización), con las dos marcas que hacen a este camino: la velocidad, que
dice cuándo se paga cada deuda, y el tipo, que dice cómo se cierra (un correctivo se cierra con el
test que reproduce la falla; un evolutivo, con el del peldaño 8). Y el **emparejamiento por
módulo**, que es la regla "se paga al tocar" hecha operativa: cuando abro el bloque de "la seña",
los pendientes de normalización del módulo de pagos entran con él, y no antes ni después.

**De cierre:** la rutina de cada sesión del peldaño 5, sin cambios, en el contrato de convivencia.

Verificación de completitud: ¿queda algún "bloquea" abierto? Entonces el primer bloque no se abre.
¿Cada correctivo dice cómo se reproduce, con las palabras del cliente? ¿Cada pendiente del cliente
tiene su lista de emparejados, aunque sea vacía? Señal de alarma: el backlog tiene más de cincuenta
pendientes de normalización en "puede esperar". No es deuda registrada: es la reescritura
disfrazada de lista. Archivá lo que no se va a pagar nunca y decilo.

---

## El bucle sobre un sistema heredado: modo correctivo y modo evolutivo

Terminado N7, el camino se junta con la escalera: los peldaños 5 a 12 se suben con cada
pendiente, igual que en el proyecto nuevo, con los mismos contratos y los mismos prompts. Pero hay
dos matices que valen un apartado, porque son los que distinguen "tocar un legado con método" de
"tocar un legado con cuidado".

### El modo correctivo: el rojo es natural

Un pendiente correctivo es un bug: algo que hoy falla y el cliente lo sabe. En el peldaño 8 del
proyecto nuevo, el rojo se fabrica (se escribe el test, se corre contra el código viejo, se ve
fallar). En el correctivo el rojo **es el bug mismo**: el test que reproduce la falla, operando el
flujo desde la pantalla como el usuario que la reportó, tiene que fallar contra el código actual.
Si no falla, no reprodujiste el bug que te reportaron; reprodujiste otro. Ese rojo es la prueba
de que estás arreglando lo correcto, y vale más que cualquier explicación del agente sobre "lo que
debe estar pasando". El caso de las cuatro rondas hasta la causa raíz
[Ref. 22](REFERENCIAS.md#ref-22) es el que me enseñó que sin reproducción escrita, cada ronda
arregla un síntoma distinto.

**Antes de enviar el prompt**, tenés que tener esto a mano:

- El pendiente correctivo en `docs/PENDING.md` (N7), con la forma de reproducirlo en palabras del
  cliente: qué hizo, qué pasó, qué esperaba. Si el cliente no sabe reproducirlo, primero conseguí
  un caso (un registro, una fecha, una captura); sin reproducción no hay test, y sin test no hay
  cierre.
- La batería de caracterización (N4) en verde en el entorno de prueba, con el comando en
  `docs/STATUS.md`.
- Los pendientes de normalización emparejados con este, listados en el pendiente.
- Tu disposición a decidir: si la causa raíz resulta ser una regla de negocio que nadie escribió
  (pasa seguido), el agente va a frenar y preguntar, y alguien tiene que contestar ese día.
- Estado mínimo aceptable: sabés reproducir el bug a mano en el entorno de prueba.

**Para cerrar un pendiente correctivo:**

> This pending item is a correction: [what fails, in the client's words, and how to reproduce
> it]. Before changing anything: (1) Reproduce the failure with a test that drives the flow from
> the screen and checks the effect in the backend, and show me that it fails against the current
> code; that red is the proof that you reproduced the right defect. If you cannot reproduce it,
> tell me what you tried and what you need; do not fix what you cannot see. (2) Find the root
> cause and tell me in prose, with the evidence, before fixing. If the root cause is a business
> rule nobody wrote down, stop and ask me. (3) Fix at the root, not where it hurts, and nothing
> else: anything else you find goes to a pending item. (4) Show me the test green, the
> characterization suite still green, and the regression of the neighbouring items. (5) If the
> fix changes a current behaviour that someone may depend on, say so explicitly: that is a decision
> for me, not a side effect. Close the paired normalization items of this module in the same
> block, each with its own evidence. The commit message says "proved red against [version]" and
> the test counts.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [es]
> Este pendiente es una corrección: [qué falla, en palabras del cliente, y cómo reproducirlo].
> Antes de cambiar nada: (1) Reproducí la falla con un test que opere el flujo desde la pantalla
> y verifique el efecto en el backend, y mostrame que falla contra el código actual; ese rojo es la
> prueba de que reprodujiste el defecto correcto. Si no podés reproducirlo, decime qué probaste y
> qué necesitás; no arregles lo que no podés ver. (2) Encontrá la causa raíz y decímela en prosa,
> con la evidencia, antes de arreglar. Si la causa raíz es una regla de negocio que nadie escribió,
> frená y preguntame. (3) Arreglá en la raíz, no donde duele, y nada más: cualquier otra cosa que
> encuentres va a un pendiente. (4) Mostrame el test en verde, la batería de caracterización
> todavía en verde, y la regresión de los pendientes vecinos. (5) Si el arreglo cambia un
> comportamiento actual del que alguien puede depender, decilo explícitamente: eso es una decisión
> mía, no un efecto secundario. Cerrá los pendientes de normalización emparejados de este módulo en
> el mismo bloque, cada uno con su propia evidencia. El mensaje del commit dice "probado en rojo
> contra [versión]" y los números de los tests.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.
>
> Respondé en mi idioma.

Qué le estoy pidiendo: la reproducción **antes** del diagnóstico, porque un modelo diagnostica con
mucha seguridad lo que no reprodujo; la causa raíz en prosa antes de tocar, para que vos puedas
frenar un arreglo que apunta mal; la raíz y nada más, porque en un legado "ya que estoy" es la
forma más común de romper lo que andaba; la caracterización en verde como regresión del sistema
entero; y la cláusula 5, que convierte el cambio de comportamiento en decisión. Y el
emparejamiento: la deuda de este módulo se paga ahora, con su evidencia, no "después".

### El modo evolutivo: la caracterización es la regresión

Un pendiente evolutivo es algo nuevo sobre algo que existe. Se abre con el prompt del peldaño 5,
se construye con el 6 y el 8 tal cual, y la única diferencia es qué significa "la regresión de
los vecinos": acá los vecinos son el sistema entero, y la batería de caracterización es la que
dice que lo que andaba sigue andando. Dos reglas más. Primera: cuando el bloque entra a un módulo,
los pendientes de normalización marcados "se paga al tocar" de ese módulo entran con él, con su
propia evidencia; es la regla de las dos velocidades. Segunda: lo nuevo nace ya con el método
completo, es decir, con su especificación en el pendiente, su test en rojo, su prueba de punta a
punta y su candado si actúa sobre el mundo. No se le hace al módulo nuevo lo que el legado le hizo
al viejo.

### La excepción: la urgencia en producción

El cinturón es una compuerta dura, y una compuerta dura necesita su excepción escrita, porque si
no la escribo, la excepción se inventa el día que algo se cae a las once de la noche. La
excepción es esta: si producción está caída o está dañando datos y el cinturón todavía no está
completo, se hace el mínimo que detenga el daño, con la vuelta atrás a mano y con el dueño
avisado, y **el mismo día** se abre el pendiente correctivo y se cierra con la rutina completa: el
test que lo reproduce en rojo, la causa raíz, la regresión. Un arreglo de urgencia que no vuelve
a entrar por el bucle es deuda que se cobra con intereses.

**Antes de enviar el prompt**, tenés que tener esto a mano: la confirmación de que es una
urgencia de verdad (producción caída o dañando datos, no "el cliente está nervioso"), el dueño
avisado, y la forma de volver atrás (el respaldo de N0 o la versión anterior) a mano.

**Para una urgencia:**

> This is an urgent fix on production: [what is happening]. Do the minimum that stops the damage,
> on a branch, with the rollback ready before you deploy, and tell me exactly what you changed and
> what you did not verify. Do not touch anything else. Then, today, open the corrective pending
> item in `docs/PENDING.md` with what happened, and we close it with the full routine: the test
> that reproduces it in red, the root cause, the fix at the root, the characterization suite and
> the regression green.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [es]
> Esto es un arreglo urgente en producción: [qué está pasando]. Hacé lo mínimo que detenga el
> daño, en una rama, con la vuelta atrás lista antes de desplegar, y decime exactamente qué
> cambiaste y qué no verificaste. No toques nada más. Después, hoy mismo, abrí el pendiente
> correctivo en `docs/PENDING.md` con lo que pasó, y lo cerramos con la rutina completa: el test que
> lo reproduce en rojo, la causa raíz, el arreglo en la raíz, la batería de caracterización y la
> regresión en verde.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.
>
> Respondé en mi idioma.

Qué le estoy pidiendo: el mínimo, con la vuelta atrás antes y no después, y con el reporte honesto
de lo no verificado (peldaño 12); y la obligación de volver a entrar por el bucle el mismo día,
que es lo que separa una excepción de un hábito.

## Los seis peldaños de calidad operativa (16 a 19, 21 y 22) en un legado

Los peldaños 16 a 19, 21 y 22 del documento principal (observabilidad y trazabilidad, persistencia,
vulnerabilidades, rendimiento, y los dos monitoreos) valen para los dos casos de uso, y en un
legado tienen una ubicación precisa, porque varios de ellos ya tienen la mitad del trabajo hecho
por el tramo de normalización:

- **16, observabilidad y trazabilidad**: el nivel mínimo (registros estructurados con nivel
  configurable y un identificador de correlación en los flujos críticos) entra en el cinturón de
  seguridad (N4), porque sin él la batería de caracterización no dice qué se rompió. El nivel
  completo, con la auditoría inmutable de las acciones con consecuencia que N5 inventarió, se sube
  antes del primer despliegue posterior a la normalización.
- **17, persistencia**: las mediciones ya están hechas en N6. Lo que sale de ellas entra al backlog
  (N7) con su marca: lo que ya está fuera de la tolerancia del negocio, "bloquea" o "ahora"; el
  resto, "se paga al tocar", y entra con el bloque que toque ese módulo.
- **18, vulnerabilidades**: la primera corrida es la dimensión de seguridad de la auditoría de N3,
  y el escaneo en la cadena es parte del cinturón (N4), porque un legado casi siempre tiene
  dependencias viejas y secretos en el historial. Los P0 bloquean; el resto, al backlog.
- **19, rendimiento**: se corre con los volúmenes medidos en N6, sobre la persistencia ya
  corregida en lo que bloqueaba, antes del primer despliegue posterior a la normalización. En un
  legado suele descubrir que el punto de ruptura está más cerca de lo que el negocio cree.
- **21 y 22, monitoreo**: se montan con el primer despliegue, igual que en el proyecto
  nuevo, con una diferencia: la primera lectura del reporte es la línea base del legado, y los
  desvíos y los errores que ya existían el primer día se vuelven pendientes con su marca de
  velocidad. Ninguno queda como "conocido" sin pendiente.

En la práctica, los cuatro previos al despliegue son una etapa más de la normalización, antes del
primer bloque evolutivo o junto con él según la urgencia del pedido, y los dos monitoreos se montan
con el despliegue.

## Cuándo el sistema está normalizado

Nunca del todo, y está bien que así sea: la deuda marcada "se paga al tocar" se paga a lo largo de
meses, módulo por módulo, y la marcada "puede esperar" a veces no se paga nunca, y hay que decirlo.
Lo que sí tiene un momento preciso es el **cierre del tramo**, que es cuando se abre el primer
bloque. Esa es la lista:

1. Existen todos los insumos de la tabla de insumos recuperados, con marcas de fuente, y el dueño
   confirmó cada nodo `[inferido]` del árbol (N2).
2. Cada discrepancia tiene decisión con fecha, y las que cambian el sistema tienen pendiente (N2).
3. La auditoría existe y cada hallazgo tiene marca de velocidad (N3).
4. El cinturón está en verde: entorno de prueba con datos anonimizados que vos abriste; despliegue
   corrido dos veces; búsqueda de secretos vacía y los encontrados rotados; integración continua
   en verde; batería de caracterización en verde con el rojo por mutación demostrado para cada
   flujo crítico (N4).
5. Toda acción con consecuencia tiene veredicto, y los candados marcados "ahora" tienen su test
   en rojo (N5).
6. Los números primarios están medidos con medidor y test, y el "por diez" está escrito (N6).
7. No queda ningún pendiente marcado "bloquea" abierto, y cada pendiente del cliente tiene sus
   emparejados (N7).
8. El contrato de convivencia tiene las cinco reglas del legado, y una sesión nueva pasa la prueba
   de lectura (N1, N2).

Si las ocho dan "sí", el sistema está normalizado hasta donde este camino lo exige, y lo que sigue
es la escalera de siempre. Las fases 3 y 4 del documento principal (salida a producción y
operación) se aplican tal cual: la auditoría periódica, los manuales (que en un legado suelen no
existir, y se generan con el peldaño 20 a partir del sistema como está), el agente residente, y la
retrospectiva con números, que en un legado tiene una pregunta propia: cuánto costó normalizar, y
qué de la deuda que marcamos "puede esperar" terminó costando igual.

## Señales de alarma del camino entero

- El agente propone reescribir un módulo "porque así es más fácil que entenderlo". Es la regla 7
  del contrato violada; en un legado, entender es el trabajo.
- Se empezó a cambiar funcionalidad con el cinturón a medias ("la batería la terminamos después").
  Después no llega nunca, y el primer cambio sin batería es el que rompe lo que nadie sabía que
  existía.
- La lista de discrepancias se resolvió "arreglando el código para que haga lo que el negocio
  dice" sin que el dueño decidiera cada una. Algunas de esas discrepancias son reglas que el
  negocio olvidó y el código recordaba.
- El backlog de normalización crece más rápido de lo que se paga. Está mal marcado: hay cosas en
  "se paga al tocar" que son "puede esperar", o hay módulos que se tocan sin pagar su deuda.
- Los números del dimensionamiento salieron de una estimación "porque la base es muy grande para
  contarla". Una base grande se cuenta con una consulta; eso es un medidor.
- Un arreglo de urgencia no volvió a entrar por el bucle. Contá cuántos hubo en el mes; si son
  más de uno, el cinturón no es compuerta, es decoración.

## Lo que falta elaborar `[hipótesis]`

1. Los siete prerrequisitos de N0 se verifican haciendo, y eso los hace calibrables: cada legado
   que pase por N0 deja su ficha con evidencia. Lo que falta es la casuística: cuántos legados
   fallan cada prerrequisito y cuánto cuesta el proyecto previo que lo pone en verde. Ya no es una
   hipótesis sobre el criterio; es una cuenta que todavía no tengo.
2. El tamaño de la batería de caracterización: entre cuatro y ocho flujos es lo que me funcionó
   en sistemas chicos; en uno grande no sé si el criterio es por flujo, por módulo o por plata en
   juego.
3. Cómo se reparte la normalización en un sistema grande: sospecho que la lectura (N2) se hace
   entera pero el cinturón (N4) se arma por módulo, a medida que cada módulo va a ser tocado, y
   que la compuerta dura pasa a ser dura por módulo y no por sistema. No lo probé.
4. Qué pasa con un legado construido por un modelo con el método a medias (contrato sí, tests no):
   si este camino se recorre entero o si hay un atajo. Mi intuición es que no hay atajo, y que el
   atajo es justamente el error, pero es intuición.
