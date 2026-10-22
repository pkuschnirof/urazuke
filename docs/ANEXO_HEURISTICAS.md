# Anexo H — Heurísticas de calidad de código y de usabilidad

**Estado: APROBADO — FORMA Y SEVERIDADES INICIALES.** No queda ninguna decisión abierta. La forma (D-043 y D-044), los interruptores (D-045 y D-046), el tablero (D-047) y las severidades iniciales con el peso de la accesibilidad (D-048, sección 10) están decididos. Lo único pendiente es de calendario: la traducción a los ocho idiomas cuando el texto entre en la API de prompts. Fecha: 2026-10-22.

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

Las reglas CQ-12 a CQ-18 son las que hacen que "calidad de código" signifique algo en el frente. Sin ellas, el proyecto puede tener mutación al noventa por ciento y una pantalla que calcula el total con su propia aritmética en un componente: el peor de los dos mundos, porque el cálculo duplicado pasa todas las pruebas del backend.

**Severidades iniciales (D-048).** Bloquean desde el día uno las catorce reglas que tienen verificador y que no dependen de un umbral que haya que discutir: CQ-01 a CQ-06, CQ-08 y CQ-11 a CQ-17. CQ-09 bloquea donde hay usuarios reales, que es donde se mide. Avisan tres, y sólo tres: CQ-07 (tipos), CQ-10 (dependencias) y CQ-18 (accesibilidad), porque son las que necesitan que el proyecto calibre primero. El formateador, el linter, el tamaño y la complejidad **no se aflojan**: el peldaño 9 ya los bloquea hoy, y esto lo extiende, no lo reemplaza; la deuda heredada se resuelve con una excepción declarada o con la línea base del trinquete, nunca bajando la severidad. Y CQ-12 y CQ-14 son las dos únicas reglas de esta tabla que bloquean con rojo humano y no de máquina: se verifican al cierre del pendiente y con el caso manual delante, igual que UX-22 y UX-27, no en cada commit. Si el proyecto no puede sostener ese cierre, la regla baja a AVISA por decisión registrada, no por olvido.

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

Cinco familias. La primera y la segunda son las que el dueño pidió explícitamente; las otras tres existen porque sin ellas la agrupación y los perfiles se degradan igual, más lento.

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

## 6. Dónde se engancha, y qué artefactos produce

El anexo no inventa peldaños nuevos: se cuelga de los que existen. Eso evita duplicar compuertas y evita el destino habitual de las listas de usabilidad, que es ser leídas una vez.

**Dónde va (D-043).** Es transversal a los cuatro tramos, con el peso principal en el Bucle de Construcción (peldaños 5 a 12), que es donde se decide y se construye. No es un peldaño propio: un peldaño numerado obligaría a renumerar la escalera, alteraría el conteo de pasos y sometería el anexo a la traducción obligatoria de los contratos a los ocho idiomas antes de que la construcción pueda pasar en verde, sin agregar ninguna compuerta que el bucle no tenga ya.

**Cómo se engancha (D-044).** Una fuente canónica, cinco anclas y dos entradas previas. El texto de las reglas vive solo acá y los prompts lo citan; nunca lo copian. Repetir las cuarenta y cinco reglas dentro de los ocho prompts del bucle las diluye (compiten con el trabajo propio de cada peldaño y el agente las obedece distinto cada vez), las deriva (dos copias del mismo texto se desincronizan solas, que es el antipatrón que persigue el peldaño 11) y no las vuelve más transversales: lo que vuelve transversal a una regla es que cada bloque pase por la misma compuerta, no que la regla esté escrita en todas partes.

| Momento | Qué se agrega | Por qué ahí |
|---|---|---|
| **Entrada previa 1** — definición del alcance | El glosario del usuario | Sin glosario, UX-01 y UX-24 no tienen contra qué comparar. |
| **Entrada previa 2** — definición del alcance | La lista de perfiles | Sin la lista, la matriz de B2 se inventa en el peldaño 5 y todo lo que se deriva de ella nace sin fundamento. |
| **Ancla 1** — peldaño 5 (el plan) | Todo pendiente que toca una pantalla declara tres cosas: a qué grupo de convergencia pertenece (B1), qué perfiles la tienen y qué criterios de aceptación son por perfil ("dado el perfil X, la persona puede hacer Y y no puede hacer Z"). Sin esa declaración el pendiente no pasa el peldaño. | Acá *nacen* la agrupación y los perfiles: son decisiones de planificación, no de código. Es el ancla de mayor rendimiento y la que hoy no existe. |
| **Ancla 2** — peldaño 8 (tests en rojo) | La matriz se convierte en un test que primero se ve fallar: por cada perfil, lo alcanzable contra su fila (UX-11, UX-12, UX-15). | Sin esto la matriz es un documento que nadie mira. |
| **Ancla 3** — peldaño 9 (calidad) | El catálogo CQ completo con su adaptador y sus umbrales declarados; `docs/CODE_QUALITY.md` reporta por regla, no por número único. Y la matriz como compuerta (UX-02, UX-03, UX-08, UX-09, UX-10, UX-16). | Es el único lugar donde el texto entra literal como directiva, y es la compuerta que corre en cada bloque con trinquete. |
| **Ancla 4** — peldaño 10 (casos manuales) | Cada caso se ejecuta **una vez por perfil afectado**, derivado de la matriz y no escrito a mano. Un caso corrido con un solo perfil no cuenta como ejecutado. | Los casos manuales son la única verificación humana del método; si no se abren por perfil, la mitad de B2 nunca se mira. |
| **Ancla 5** — peldaño 12 (verificación y reporte honesto) | El reporte dice qué se midió, qué quedó en avisa y qué regla está apagada, con su motivo, su autor y su fecha de revisión. | Cero daño silencioso: un grupo apagado no puede leerse como cumplido. |
| Manual de usuario | Se organiza por los grupos de B1 y declara, por grupo, qué perfiles entran. | El manual y el menú se nombran con las mismas palabras o el glosario se rompe. |
| Cierre de cada bloque | Prueba del primer clic (UX-07), captura del entorno real (UX-27) y las dos pruebas de extremo a extremo de la matriz. | Son las tres verificaciones que no se pueden automatizar. |

Los peldaños 6, 7 y 11 reciben a lo sumo una línea: el 6 ya registra umbrales y excepciones como decisiones (es el lugar natural de la excepción declarada), y el 11 es donde entra a los golpes el caso de la matriz escrita en cuatro lugares. No se les agrega texto propio para no diluirlos.

Tres artefactos, todos en `docs/`: `CODE_QUALITY.md` (extendido), `USABILITY.md` (nuevo, con el resultado por regla y las excepciones declaradas) y `PROFILE_MATRIX.md` (la matriz, que es a la vez documento y fuente del menú).

## 7. Configuración

Un solo archivo por proyecto declara capa 2 y capa 3. Ejemplo con la forma propuesta, no con valores definitivos:

```json
{
  "version": 1,
  "frontend": "react-vite",
  "medido_por": {
    "formato": "prettier",
    "lint": "eslint",
    "tipos": "tsc",
    "complejidad": "eslint-complexity",
    "duplicacion": "jscpd",
    "muertos": "knip",
    "cobertura": "vitest-coverage",
    "mutacion": "stryker",
    "accesibilidad": "axe-core"
  },
  "umbrales": {
    "lineas_por_archivo": 300,
    "lineas_por_funcion": 40,
    "caminos_por_funcion": 10,
    "cobertura_minima": 0,
    "mutacion_objetivo": 0
  },
  "excepciones": [
    {
      "regla": "CQ-17",
      "motivo": "informe imprimible heredado, sin tokens",
      "autoriza": "dueño",
      "revisar": "2027-01-31"
    }
  ]
}
```

Los dos ceros son deliberados y son la parte que importa: la cobertura mínima la fija el trinquete con lo medido, y el objetivo de mutación lo fija el dueño cuando el proyecto tiene usuarios. Si están en cero y nadie los declaró, la compuerta lo reporta como umbral no declarado en vez de inventarlo.

## 8. Las dos piezas, en la forma que usa el método

**Calidad de código.**

> Set up and maintain the code-quality gate for this project, configured for its frontend family. The core rules are the same in every project; what changes is how each one is measured and at which threshold. Install one formatter and one linter with a single shared configuration; enforce size limits per file and per function, complexity per function, duplication, dead code, declared-and-used dependencies, type checking where the language allows it, coverage with a ratchet, and secret scanning. Where the project has real users, add mutation testing scoped to the changed lines and record the score per block. Then extend the gate to the frontend itself: no business rule inside a screen, one typed client for every server call, one home for shared state, no user-visible string outside the translation catalogue, a stable identifier and role on every interactive element, styling only through tokens, and automatic basic accessibility checks. Every rule has a stable id, a severity (blocks, warns, records) and a named verifier. Thresholds and exceptions are declared by the owner in one configuration file; a rule switched off without a written exception is a gate failure, not a decision. Report the result per rule in `docs/CODE_QUALITY.md`, not as a single number.
>
> [es] Montá y mantené la compuerta de calidad de código del proyecto, configurada para su familia de frontend. Las reglas del núcleo son las mismas en todo proyecto; lo que cambia es con qué se mide cada una y con qué umbral. Instalá un solo formateador y un solo linter con configuración compartida; hacé cumplir límites de tamaño por archivo y por función, complejidad por función, duplicación, código muerto, dependencias declaradas y usadas, verificación de tipos donde el lenguaje lo permita, cobertura con trinquete y escaneo de secretos. Donde el proyecto tenga usuarios reales, agregá pruebas de mutación acotadas a las líneas cambiadas y registrá el puntaje por bloque. Después extendé la compuerta al frente: ninguna regla de negocio dentro de una pantalla, un cliente tipado único para toda llamada al servidor, un solo lugar para el estado compartido, ningún texto visible fuera del catálogo de traducciones, identificador estable y rol en todo elemento interactivo, estilos solo por tokens y verificación automática de accesibilidad básica. Cada regla tiene identificador estable, severidad (bloquea, avisa, registra) y verificador nombrado. Los umbrales y las excepciones los declara el dueño en un archivo de configuración; una regla apagada sin excepción escrita es un fallo de la compuerta, no una decisión. Reportá el resultado por regla en `docs/CODE_QUALITY.md`, no como un número único.

**Usabilidad.**

> Build the usability criteria for this project before writing the first screen, and enforce them where the method already has hooks. Group functionality by what the person came to do, never by the internal module or the data entity: every menu group is named with a user job in the project glossary, every functionality has exactly one canonical home, no functionality is orphaned, and every group is reachable in no more than three steps from the entry screen. Then declare accessibility in one matrix and derive everything from it: each functionality lists the profiles that have it, each functionality has at least one profile, each profile has at least one functionality and its own entry point, the navigation is generated from the matrix instead of written by hand, and every route checks the permission on the server because hiding an entry is not protecting it. Verify the matrix per profile with an end-to-end check that compares what is reachable with the matrix row: neither less nor more. Require the four states on every list (with data, empty, loading, error), a visible working indicator with the option to cancel long operations, an error message that says what happened and what to do without losing entered data, a primary action per screen, confirmation or undo for destructive actions, and a form that keeps what was typed. Run each manual test case once per affected profile, run the first-click check at the close of every block, and require a real screenshot of the test environment on every item that touches a screen. Record the result per rule, with owner-declared exceptions, in `docs/USABILITY.md`, and keep the matrix in `docs/PROFILE_MATRIX.md` as the single source of truth.
>
> [es] Armá los criterios de usabilidad del proyecto antes de escribir la primera pantalla, y hacelos cumplir donde el método ya tiene enganches. Agrupá las funcionalidades por lo que la persona vino a hacer, nunca por el módulo interno ni por la entidad de datos: cada grupo del menú se nombra con un trabajo del usuario en el glosario del proyecto, cada funcionalidad tiene exactamente una casa canónica, ninguna queda huérfana y todo grupo se alcanza en no más de tres pasos desde la pantalla de entrada. Después declarás la accesibilidad en una sola matriz y derivás todo de ella: cada funcionalidad enumera qué perfiles la tienen, cada funcionalidad tiene al menos un perfil, cada perfil tiene al menos una funcionalidad y un punto de entrada propio, la navegación se genera desde la matriz en lugar de escribirse a mano, y toda ruta verifica el permiso del lado del servidor porque esconder una entrada no es protegerla. Verificá la matriz por perfil con una prueba de extremo a extremo que compare lo alcanzable contra la fila de la matriz: ni de menos ni de más. Exigí los cuatro estados en toda lista (con datos, vacía, cargando, con error), un indicador visible de trabajo en curso con opción de cancelar lo largo, un mensaje de error que diga qué pasó y qué hacer sin perder lo cargado, una acción principal por pantalla, confirmación o deshacer en las acciones destructivas y un formulario que conserve lo escrito. Corré cada caso de prueba manual una vez por perfil afectado, corré la prueba del primer clic al cierre de cada bloque y exigí una captura real del entorno de prueba en todo pendiente que toque una pantalla. Registrá el resultado por regla, con las excepciones declaradas por el dueño, en `docs/USABILITY.md`, y mantené la matriz en `docs/PROFILE_MATRIX.md` como fuente única de verdad.

## 9. Lo que esta propuesta no hace

- **No agrega un peldaño.** Son cuarenta y cinco reglas transversales (18 de calidad y 27 de usabilidad), no una etapa nueva. Cuelgan de los peldaños que ya existen.
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

### Cerrado en D-048, y las dos correcciones que arrastra

Las dos preguntas que trababan la escritura de los prompts ya están respondidas: la 1 quedó en la fila 5 y la 2 en la fila 6. Pero la recomendación que se aprobó tenía dos errores de hecho, y quedan escritos acá para que no vuelvan:

1. **El defecto del conteo.** Donde este anexo decía "veintisiete reglas" el número correcto es **cuarenta y cinco**: 18 de calidad (CQ-01 a CQ-18) y 27 de usabilidad (UX-01 a UX-27). La cifra vieja venía de un borrador que solo contaba la mitad. Corregido en las secciones 6 y 9 y anotado en D-048; el texto de D-044 se conserva tal como se escribió, porque una decisión es un registro y no se reescribe.
2. **El formateador, el linter, el tamaño y la complejidad no se aflojan.** Una versión anterior de esta recomendación los mandaba a "avisa" para no trabar proyectos con deuda heredada. No puede ser: el peldaño 9 ya los bloquea hoy, y esta extensión lo extiende, no lo reemplaza. La deuda heredada se resuelve con una excepción declarada —con motivo y fecha de revisión— o con la línea base del trinquete, no bajando la severidad de la regla.

Y una limitación declarada, porque es la única de su clase: **CQ-12 y CQ-14 bloquean con rojo humano.** Ninguna herramienta prueba que una pantalla no decide reglas de negocio. Se verifican al cierre del pendiente, con el caso manual delante y el mismo criterio que UX-22 y UX-27; si el proyecto no puede sostener ese cierre, bajan a AVISA por decisión registrada. Una regla que bloquea y que nadie verifica es peor que una regla que avisa.

### Pendiente de calendario, no de decisión

**La traducción.** El anexo entra en castellano y se lee como referencia; el día que su prompt entre en `docs/html/api/prompts.json`, `build/prompts.mjs` exige que el texto sea idéntico byte a byte en los ocho idiomas o la construcción falla. Ya no hay nada que decidir: el texto quedó fijado con las severidades en D-048. Lo que resta es de calendario: traducir y publicar en la API.

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

**Lo que no entra en la cuenta.** Lo que sólo puede juzgar una persona —la prueba del primer clic (UX-07), la prueba de tarea (UX-06), la captura (UX-27) y todos los casos manuales— se registra como pasado o fallado, por bloque, con nombre y fecha, y se reporta aparte como cobertura de verificación humana. No entra en el porcentaje de cumplimiento. Si se mezclan, el resultado es un número que es sesenta por ciento medición y cuarenta por ciento opinión, y nadie puede decir cuál es cuál. Por eso la sección 9 sigue valiendo: el tablero no inventa una nota de usabilidad, cuenta reglas.

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

No queda ninguna decisión abierta: la forma (D-043 y D-044), los interruptores (D-045 y D-046), el tablero (D-047) y las severidades iniciales con el peso de la accesibilidad (D-048) están decididas. Lo que sobrevive es de calendario: la traducción a los ocho idiomas cuando este texto entre en la API de prompts.
