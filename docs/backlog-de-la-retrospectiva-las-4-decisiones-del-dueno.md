# La retrospectiva del peldaño 23, en el registro

**Fecha:** 2026-10-26 · **Estado:** PASO 0 cerrado. Nada del método tocado todavía.

Las diez entradas están en `docs/PENDING.md` como **PND-039 a PND-048**, en un grupo de convergencia nuevo. El resumen está recontado por máquina: **48 entradas, 28 abiertas, 20 cerradas, 5 bloqueantes**. Suite en verde, 220 pruebas, 0 fallos — y probada en rojo contra dos mutaciones, porque un verde que nadie vio caer no demuestra nada.

---

## Tres cosas que medí y no coinciden con lo que me pediste

Ninguna cambia el trabajo de fondo. Las tres habrían roto algo si las hubiera seguido al pie de la letra.

**1. La numeración arranca en PND-039, no en PND-038.** El enunciado dice «hoy tiene 37 entradas, numerá desde PND-038». Son 38: `PND-038` nació ayer, con la compuerta de las portadas que no invocaba nadie, y está cerrada. Si hubiera numerado desde 038 el registro habría tenido dos entradas con el mismo id, y su propia prueba lo habría dicho —«PND-038 aparece dos veces»—.

**2. La retrospectiva es D-061, no D-060.** `D-060` también se usó ayer, para la decisión de la guarda dormida, y está commiteada. Las decisiones son append-only: no se puede reutilizar un número.

**3. C-02 está mal acotado, y eso agranda el arreglo.** Vos decís que el «fallo que evita» del peldaño 20 es el único de los veinticuatro sin su referencia. Contado por máquina: **22 de 24 la llevan**, y la ficha del peldaño 20 **lleva dos** —`Ref. 41` y `Ref. 24`—. Lo que está sin respaldo es **una clausula de tres**, la primera. Y no es la única: la ficha del **peldaño 10** cita un caso concreto, con protagonista y lugar («el menú desplegable incómodo que ningún test vio y la encargada sí, en el proyecto guía del curso»), y no tiene ninguna referencia. Arreglar sólo la que viste dejaba la otra viva. La tercera sin referencia es la del peldaño 0, y a mi juicio no la necesita: no cita ningún caso, nombra una categoría de problema.

---

## El hallazgo que cambia el trabajo: la comprobación que pediste ya está en verde

Pediste algo que falle si un peldaño con un evaluador del Anexo H en el dato «no lo cita en su ficha **o** en su contrato». Medido:

| peldaño | ancla en el dato | el contrato lo cita | la ficha lo cita |
|---|---|---:|---:|
| 5 | `pendings_profiles` | 4 menciones | **0** |
| 8 | `profile_matrix` | 2 menciones | **0** |
| 9 | `heuristics` | 3 menciones | **0** |
| 10 | `manual_cases_per_profile` | 1 mención | **0** |
| 12 | `heuristics` | 1 mención | **0** |

Las cinco anclas son `required: true` y entraron con `since_schema: 2`. Los contratos las citan, **5 de 5**. Las fichas, **0 de 5**.

Así que con la regla «ficha **o** contrato» la comprobación da **verde hoy, con el defecto puesto**. Es una disyunción donde una de las dos ramas siempre se cumple: eso no es una compuerta, es un verde garantizado. Es la **quinta guarda dormida** del proyecto, y la primera que se detecta *antes* de escribirla — las otras cuatro se descubrieron después de haber confiado en ellas.

Por eso la comprobación salió como entrada propia (`PND-048`) y su forma vuelve a vos.

---

## Las cuatro decisiones, con opciones y costo

### Decisión 1 — Las dos entradas previas en la ficha del peldaño 2 *(M-01, punto c)*

Lo medido primero. El dato publicado del peldaño 2 ya trae dos preguntas de verificación que entraron con `since_schema: 2`: si el glosario del usuario está escrito, y si la lista de perfiles está escrita. Y en la prosa: la ficha del peldaño 2 y su contrato tienen **cero menciones** de «perfil» y **cero** de «glosario». El informe marca esa omisión como la de **gravedad alta más cara** (`O-01`): de esas dos entradas se derivan la matriz, el menú, los permisos y los guiones de prueba.

| | qué cuesta | qué deja |
|---|---|---|
| **(a) En la ficha y en el contrato** | la ficha del 2 y el contrato del 2, en los ocho idiomas. Si el cambio toca el prompt del contrato, es una pieza en inglés idéntica en las ocho versiones y el verificador lo exige | cierra la asimetría en los dos lados: el lector se entera y el prompt que manda lo pide |
| **(b) Sólo en la ficha** | la mitad | el lector se entera y el prompt que manda sigue sin pedirlo — media compuerta |
| **(c) Nada** | cero | la omisión de gravedad alta queda; `PND-039` arregla que el anexo se encuentre, pero no el lugar donde nacen sus insumos |

**Recomiendo (a).** Es el único de los cinco peldaños ancla donde el dato va adelante de la prosa en **las dos** piezas, y es de donde se deriva todo lo demás del anexo.

### Decisión 2 — La proporcionalidad: shu-ha-ri *(M-04)*

Medido: el documento principal tiene **cero** apariciones de vocabulario de budō. El único documento del repositorio que lo usa es el informe de validación, y es porque cita los títulos de los capítulos del libro.

| | qué cuesta | qué deja |
|---|---|---|
| **(a) La idea, con palabras del método** | un párrafo antes de la tabla de la Parte D, en ocho idiomas | contesta «¿todo esto para un sistema chico?» antes de la tabla, y se entiende sin haber leído una novela |
| **(b) La idea con el vocabulario y su atribución** | lo mismo, más tres nociones a explicar y a traducir a ocho idiomas (incluidos japonés y chino, donde la palabra no es exótica y el efecto cambia) | gana una mnemotecnia y ata la respuesta del método al aparato de otra obra |
| **(c) Nada** | cero | la respuesta sigue siendo una tabla de veinticuatro filas marcada `[hipótesis]` |

**Coincido con tu recomendación: (a).** El argumento medido que la sostiene: la Parte F cita los trabajos ajenos **con su enlace**, no absorbiéndolos. Y la pregunta que esto contesta es la primera que hace un dueño de un sistema chico: hacerle depender la respuesta de un marco prestado es caro justo donde no conviene.

### Decisión 3 — Las veinticinco preguntas para el proveedor, y la licencia *(M-05)*

**Lo que no verifiqué, dicho antes que nada:** no tengo el libro. Que su página de créditos diga «© 2026 Oscar Schmitz» sin conceder licencia es tu lectura, y la decisión se toma sobre ella, no sobre la mía.

Lo que sí medí: la «verificación de completitud sin leer código» es la sección 4 de cada contrato, y está en los **veinticuatro peldaños y las ocho estaciones**. Ningún documento del corpus las junta en una hoja.

| | qué cuesta | qué deja |
|---|---|---|
| **(a) Pedirle permiso y acreditarlo** | una conversación con un tercero, de plazo incierto, y el resultado no lo controlás vos. Si dice sí, entra texto con derechos reservados dentro de una obra BY-SA: hay que escribir la excepción y mantenerla | la pieza del libro tal cual, que ya está bien escrita |
| **(b) Escribirlas de cero desde tus contratos** | un documento nuevo del corpus en ocho idiomas, su fila en el arreglo literal de `build/build.mjs` —si no está ahí, el documento existe y **no se publica**— y un pendiente propio para enlazarlo desde la portada, porque la publicación no toca la landing (D-052) | una pieza **propia**, sin deuda de licencia, y con algo que la del libro no tiene: cada pregunta cita el contrato del que sale, así que de la pregunta se puede ir al peldaño que produce su evidencia |
| **(c) No hacerlo** | cero | el método sigue sin la hoja que un dueño se lleva a una reunión |

**Coincido con tu recomendación: (b)**, y agrego el argumento que la medición da. No es escribir de cero: es **cosechar** treinta y dos listas que ya existen. Y el resultado es mejor que el original para lo que el método necesita, porque es trazable.

Si sale (b), hay un efecto secundario que conviene saber de antemano: en cuanto el documento se genere, el chequeo de huérfanas lo va a nombrar por su nombre hasta que la portada lo enlace. Eso es correcto — es exactamente para lo que se escribió —, pero aparece como un aviso en la publicación y no hay que leerlo como un error.

### Decisión 4 — La forma de la comprobación *(PND-048)*

| | qué cuesta | qué atrapa |
|---|---|---|
| **(a) «la ficha lo cita»** | mantener el documento principal en ocho idiomas cada vez que una ancla nueva entre al dato | el defecto de hoy: 5 de 5 en rojo |
| **(b) «la ficha Y el contrato lo citan»** | lo mismo que (a); los contratos ya cumplen 5 de 5, así que el costo adicional hoy es cero | el defecto de hoy, **y** fija el 5 de 5 que los contratos ya tienen, para que un cambio futuro no lo saque en silencio |
| **(c) «la ficha O el contrato», como lo pediste** | cero | **nada**: verde hoy |

**Recomiendo (b).** Cuesta lo mismo que (a) y guarda el doble. Y propongo que la misma prueba cubra la regla de `PND-046` —ninguna ficha cita un caso concreto sin su `[Ref. N]`—, porque es la misma asimetría: lo que la prosa afirma contra lo que el método exige poder auditar.

---

## Dónde hay que mirar primero: PND-039

De las diez, es la única con severidad **bloquea**, y es el quinto bloqueante abierto del registro.

El Anexo H son 45 reglas, obligatorias, con cinco anclas que son evaluadores exigibles en el dato que el método publica. El documento principal **no lo nombra ni una vez** en sus 143.274 caracteres, y el README castellano tampoco.

Lo que la hace distinta de una corazonada sobre la claridad de un documento: un lector real, medido. El autor del libro reprodujo seis cifras seguidas de tus referencias sin un error —prueba de que leyó con cuidado— y omitió veintisiete de las cuarenta y cinco reglas, la lista de perfiles, la matriz y las cinco anclas completas. **No se le pasaron: nunca supo que estaban.** Su proyecto guía quedaría detenido en cinco peldaños de tus propias compuertas publicadas.

Y un hallazgo que no estaba en el pedido: el README **castellano** es el único de los ocho sin la fila del anexo en su tabla de «Qué hay acá». Las siete traducciones la tienen. Es D-013 al revés — la regla dice que un cambio en el castellano se replica en las siete, y acá las siete llevan una fila que la fuente de verdad no tiene. Así que el punto (b) no es «agregar una fila»: es alinear la fuente con sus traducciones, o quedan nueve versiones con dos redacciones.

---

## Lo que el grupo nuevo costó, dicho porque es el tipo de cosa que el registro guarda

Abrí **G-METODO** —«aplicar el método completo, sin que falte una parte que el método exige»— en vez de meter las diez entradas en uno de los cinco que ya había. La tentación era G-ALCANCE, porque el síntoma se parece, y conviene no caer: `PND-015` era «el archivo no está enlazado», un defecto de transporte, ya cerrado; `PND-039` es «el archivo está enlazado y el documento que la gente lee no lo nombra». Mismo síntoma para el lector, trabajo distinto.

El grupo nuevo no fue una fila: la prueba del registro lleva la lista de grupos **cerrada** en una constante, y una entrada con un grupo que no esté ahí se reporta como «grupo no reconocido». Así que entró en tres lugares a la vez — la tabla de grupos, la constante de la prueba y la tabla del resumen — o el registro se contradecía solo. Toqué **una línea** de la prueba, y lo dejé anotado ahí mismo.

Y tres perfiles nuevos, **P6, P7 y P8**: lector que entra por el documento principal, lector que adapta el método a otro formato (el caso que originó todo esto) y dueño de proyecto que aplica el método. Ninguno de los cinco los cubría: `P3` es «lector humano que llega por la portada», y el que no encuentra el Anexo H llega por el documento principal, que es otra puerta. Para la herramienta que compila las compuertas reusé `P1` tal cual.

---

## Lo que me falta de tu pedido

Tu mensaje llegó cortado en una quincena de lugares. Reconstruí todo lo que el informe o el repositorio permitían reconstruir sin inventar, y lo apliqué. Queda **una** cosa que reconstruí y conviene que confirmes, porque de ella salen los criterios de aceptación de las diez entradas:

> «Los perfiles que yo veo acá son: **[…] el documento principal**, lector que adapta el método a otro formato (es el caso que lo originó), herramienta consumidora que compila las compuertas, y dueño de pro\[yecto\]».

El primero perdió su sujeto. Lo leí como **«lector humano que entra por el documento principal»**, que es el que no encuentra el Anexo H. Si querías decir otra cosa —por ejemplo «el documento principal como artefacto», que sería un nodo y no un perfil—, decímelo y corrijo los criterios.

Lo demás que reconstruí y que doy por bueno: las cinco anclas en 5/8/9/10/12; «usabilidad» y «matriz de perfiles»; que las fichas lleven el enlace; que los cinco grupos sean los que el registro ya tiene; que `docs/practica` era donde había que buscar M-06; que una mejora que cambie una definición mecánica sube `catalog_version` y anota su huella; y que el peldaño 23 pide la propuesta de cambio con el incidente que la justifica.

---

## Dos cosas de la máquina, no del método

**El acceso de GitHub en texto plano sigue ahí.** Lo avisé el 24. Hoy, buscando los árboles para re-verificar lo del protocolo, volvió a aparecer: una copia vieja de otro repositorio tiene el permiso guardado dentro de su configuración, legible por cualquiera que abra el archivo. No lo repito acá. Hasta que lo revoques desde GitHub, sigue abierto, y conviene hacerlo hoy.

**Y hay dos clones del repositorio del portal en esta máquina**, los dos apuntando al mismo remoto, en lugares distintos. Es el mismo peligro que el proyecto ya tiene registrado dos veces —`PND-021` («cuál es el árbol realmente desplegado») y `PND-037` («la prueba miraba un árbol clavado a una ruta local»)—, en su tercera forma. No le abrí entrada porque no es trabajo del método; queda dicho para que no te sorprenda.
