# La funcionalidad de este sistema, recuperada desde el código

Artefacto del prerrequisito 3 de la estación N0 del camino evolutivo-correctivo
([`EVOLUTIVO_CORRECTIVO.md`](EVOLUTIVO_CORRECTIVO.md)). Lo escribió el agente leyendo el
sistema, sin preguntarle nada a nadie, para que el dueño lo lea y diga si éste es el sistema
que cree tener.

- **Fecha**: 24 de octubre de 2026.
- **Qué se leyó**: el árbol commiteado en `main`, `f49b267`, clonado en limpio desde el
  repositorio público. Los 12 archivos de `build/` (2.064 líneas), los 8 de `tests/` (1.101
  líneas, 158 pruebas), los 8 archivos de datos de `gates/` (128 KB), el flujo de integración
  continua, y la salida real de cada programa al correrlo.
- **Marcas de fuente**: `[código]` es lo que está escrito en el sistema y se puede señalar con
  el dedo; `[corrido]` es lo que se verificó ejecutándolo y mirando la salida; `[inferido]` es
  interpretación del agente y puede estar mal. Este documento **no** usa la prosa del método
  como fuente: el prerrequisito pide la funcionalidad reconstruida desde el código.
- **Lo que este documento no es**: no es el mapa del sistema (eso es la estación N2, y éste es
  su primer borrador), y no decide nada sobre la elegibilidad (eso es `ELIGIBILITY.md`).

---

## 1. Qué hace este sistema, en una frase

Toma la prosa de un método escrita a mano en ocho idiomas, más una definición de compuertas
escrita como datos, y produce tres cosas que después publica en un sitio público: documentos
legibles para una persona, dos extremos en JSON para que otra herramienta los consuma, y la
negativa a publicar cualquiera de los dos si no cumplen las reglas que el propio sistema hace
cumplir. `[código]` `[corrido]`

No es una aplicación con usuarios: no hay registro, ni sesión, ni base de datos, ni formulario
que grabe algo. Todo lo que el sistema conserva vive en archivos de texto dentro del
repositorio, y el repositorio es su única base de datos. `[código]`

## 2. Quién lo usa, y para qué

1. **Una persona que lee el método.** Entra a un documento publicado y lo lee: índice, cuerpo,
   tablas, los prompts para pegarle a un agente, y un botón para ver cada prompt traducido a su
   idioma. `[código]`
2. **Una herramienta que aplica el método** (Yujin Forge, u otra). No lee la prosa: le pide al
   sitio dos archivos JSON — las compuertas y los prompts — y los usa para saber qué tiene que
   exigir en cada peldaño. `[código]`
3. **Quien mantiene el método** (el autor). Escribe la prosa y los datos, corre la construcción,
   y lo que pasa las verificaciones queda publicado solo. `[código]` `[corrido]`

---

## 3. Las pantallas

El sistema no tiene pantallas de aplicación: tiene **documentos**. Son 76 páginas HTML
autocontenidas (sin archivos sueltos de estilos ni de guiones: cada página se trae todo
adentro). `[corrido]`

### 3.1 El documento de lectura (76 páginas)

Todas las páginas son la misma pantalla con distinto contenido. Lo que una persona ve y puede
hacer en ella: `[código]` `[corrido]`

| Lo que se ve | Qué hace |
|---|---|
| El título y, pegado abajo, el **índice** | Lista las secciones y los peldaños; cada línea es un enlace que salta a su parte del documento. En japonés y chino los enlaces también funcionan, porque el identificador conserva los caracteres propios. |
| El **cuerpo** del documento | Párrafos, tablas con desplazamiento lateral en pantalla angosta, listas, citas, código, imágenes y diagramas. |
| La **ficha de un peldaño** | La lista que sigue al título de un peldaño se dibuja como una ficha encuadrada, con cada rótulo destacado. |
| La **caja "Antes de enviar el prompt"** | Un recuadro azul, distinto del prompt, con lo que el lector tiene que tener listo antes de pegarlo. Se reconoce en los ocho idiomas. |
| El **prompt** | Un recuadro dorado con la pieza en inglés, lista para copiar. |
| El botón **"Traducir al castellano"** (o al idioma de la página) | Muestra la traducción del prompt y oculta el original; el botón pasa a decir "Ver el original en inglés" y vuelve a alternar. En la versión inglesa no aparece, porque no hay nada que traducir. |
| Los **enlaces a los casos reales** ("Ref. 7") | Se dibujan como una pastilla y llevan al documento de referencias, en el idioma de la página. |
| El **pie** | El enlace al repositorio público y la licencia. |
| La **versión impresa** | Al imprimir sale en A4, cada sección arranca en página nueva, los botones desaparecen y las traducciones ocultas se imprimen visibles. |

**Cuántas hay, y en qué idioma** `[corrido]`

- En castellano, 11 documentos: la escalera metodológica, las referencias, el camino
  evolutivo-correctivo, las dos partes del manual del curso, la capacitación del junior, el
  trabajo colaborativo, las evaluaciones de otras inteligencias artificiales, el anexo de
  heurísticas, las compuertas, y los contratos de peldaño (los 24 contratos en un solo
  documento).
- En cada uno de los otros siete idiomas (inglés, portugués, francés, alemán, italiano, japonés
  y chino), los mismos 9 documentos: quedan afuera "las compuertas" (se publica una sola vez, en
  inglés) y "las evaluaciones de IA" (es cita textual y no se traduce).
- Dos manuales de práctica, sólo en castellano, con sus capturas y su evidencia adjunta.

**Lo que ninguna página tiene**: campos de entrada, botones que graben algo, login, carrito,
estado que sobreviva al recargar. La única interacción que cambia lo que se ve es el botón de
traducción, y se olvida al recargar. `[código]`

### 3.2 Los dos extremos de datos (lo que ve una herramienta)

No son pantallas para una persona, pero son la cara del sistema para su otro usuario.
`[código]` `[corrido]`

| Extremo | Qué entrega | Hoy |
|---|---|---|
| `api/gates.json` | La definición mecánica de las compuertas: 24 peldaños, 8 estaciones, 45 reglas de calidad y usabilidad con su enunciado, 12 evaluadores, los adaptadores por familia de frontend y el contrato de configuración que el consumidor tiene que escribir. | Catálogo `2026.10.2`, huella `3bd03ac3bf79…`, 100 KB |
| `api/prompts.json` | Los 72 prompts del método en inglés, agrupados en 27 contratos, con el título de cada peldaño. | Corpus `2026.10.1`, huella `3459750db1d7…`, 64 KB |

Los dos viajan con dos datos que el consumidor usa para saber qué tiene en la mano: una
**versión declarada a mano** por el método (lo que un proyecto congela) y una **huella del
contenido** que el consumidor **recalcula** sobre el archivo y compara. Si sólo la leyera, una
copia congelada editada a mano o cortada por una fusión pasaría desapercibida. `[código]`

---

## 4. Los procesos

### P1 — Construir el sitio

Un comando, 4,7 segundos, sin red y sin instalar nada. `[corrido]`

Lo que hace, en orden: verifica que los prompts en inglés sean idénticos en los ocho idiomas;
publica el extremo de prompts; valida las compuertas y publica su extremo; exige que el
documento de compuertas siga coincidiendo con los datos; y recién entonces convierte cada
markdown a HTML, idioma por idioma, armando además el documento de los 24 contratos como una
sola pieza. Si cualquiera de las verificaciones falla, se detiene y no escribe nada del sitio.
`[código]`

Dos cosas que conviene saber, porque no son obvias:

- Volver a construir sobre un árbol limpio **no cambia nada**, salvo la fecha de generación y el
  identificador de cambio de los dos JSON publicados. Eso es a propósito, y es la razón de que
  exista un modo de verificación que no regenera. `[corrido]`
- La construcción **no toca la landing** del sitio público. Un documento nuevo queda accesible
  por su dirección, pero no aparece enlazado hasta que alguien lo agregue al índice, que vive en
  otro repositorio. `[código]`

### P2 — Los prompts tienen que ser la misma pieza en los ocho idiomas

Extrae los prompts de los contratos en castellano, los escribe en inglés en `prompts/`, y
después abre cada traducción y exige que tenga **exactamente** los mismos prompts, palabra por
palabra, normalizando sólo los cortes de línea. Si una traducción alteró un prompt, o le falta
uno, la construcción se cae y dice en qué idioma, en qué peldaño y en qué número de prompt.
`[código]`

Los bloques de traducción del prompt (los que el lector ve con el botón) **no cuentan** como
prompts: el sistema los distingue por su etiqueta de idioma. `[código]`

### P3 — Validar las compuertas, y no publicar nada si hay un solo error

El validador interpreta el esquema (no lo recita) y revisa doce cosas, con 41 códigos de error
estables, cada uno con qué pasó, dónde y cómo se arregla. Lo que exige, dicho para alguien que
no programa: `[código]`

1. **La forma**: cada campo es del tipo que el esquema declara y no sobra ni falta ninguno.
2. **Los identificadores**: únicos, en orden, 24 peldaños y 8 estaciones exactas, y nunca
   reciclados ni renombrados.
3. **Diferencia cero contra la base**: todo lo que venía del congelado tiene que seguir siendo
   idéntico, carácter por carácter. Un requisito nuevo entra como entrada nueva, marcada.
4. **El vocabulario de evaluadores** es cerrado y sólo crece; un nombre no declarado es un
   error, no una extensión.
5. **Las anclas** apuntan a peldaños que existen y están enganchadas de verdad.
6. **Una sola copia de cada texto**: el enunciado de las 45 reglas se **extrae** del anexo de
   heurísticas; transcribirlo en los datos es un error. Y las dos versiones del anexo
   (castellano, que es la fuente de verdad, e inglés, que es la que se publica) tienen que
   llevar las mismas reglas con las mismas severidades.
7. **El tablero no se afloja**: dos cifras y nunca una, ninguna autoriza a cerrar un bloque, y
   un reglamento inválido no emite cifras.
8. **ASCII puro** en el nivel de datos.
9. **La huella no deja claves en el limbo**: toda clave publicada está cubierta o excluida
   explícitamente.
10. **Una versión es un contenido, y uno solo**: si cambió algo cubierto por la huella, la
    versión sube. El registro de versiones es sólo-agregar y una huella ya publicada no se
    edita.
11. **La declaración de idioma dice la verdad**: el publicado es bilingüe (la base congelada no
    se traduce), y el sistema verifica que todo texto que la regla llama castellano esté literal
    en el congelado y que ninguno de los que llama inglés se lea como castellano.
12. **La configuración de un proyecto** (si se le pasa una): cada grupo declara su interruptor,
    cada regla apagada trae motivo, autor y fecha de revisión, y un umbral que nadie declaró se
    reporta como no declarado en vez de inventarse.

### P4 — El documento de las compuertas se genera, no se escribe

El documento en inglés que explica las compuertas sale de los datos. Hay un modo de
verificación que compara carácter por carácter lo que hay en disco contra lo que dan los datos,
y falla si alguien editó el documento a mano. `[código]`

### P5 — El veredicto de las heurísticas

El sistema no mide código: recibe el resultado regla por regla ya medido y decide **qué
significa** ese conjunto. Esto está en el repositorio del método, y no sólo en la herramienta,
para que "verde" no lo defina cada herramienta por su cuenta. `[código]`

Devuelve uno de cuatro veredictos — `green`, `red`, `not_measured`, `invalid_ruleset` — y con
él: `[código]`

- las reglas en rojo con el archivo donde falló cada una;
- las que avisan (abren un pendiente) y las que sólo registran;
- las que esta instalación **no midió**, que no se leen como verdes;
- las apagadas, cada una con su motivo, quién lo autorizó y la fecha de revisión; apagar sin ese
  registro no es "una regla menos", es rojo y no se emite tablero;
- las que quedan fuera de alcance por la familia de frontend (hay seis: react-vite, next,
  angular, plantillas de servidor, móvil nativo y línea de comandos) o porque la regla sólo
  aplica con usuarios reales;
- dos cifras: cumplimiento (sólo lo que juzga una máquina) y cobertura de compuerta sobre las 45
  reglas declaradas.

De los cinco umbrales del adaptador, hoy sólo dos están declarados (300 líneas por archivo y 40
por función); los otros tres se publican con valor nulo y marcados como no declarados.
`[corrido]`

### P6 — Verificar que lo publicado sea lo que dan las fuentes

Dos modos: `[código]` `[corrido]`

- El completo regenera los dos JSON y los compara contra lo commiteado, dejando afuera a
  propósito la fecha de generación y el identificador de cambio (que se calcula antes de
  guardar, así que siempre nombra al cambio anterior).
- El modo de sólo huella **no regenera nada**: lee los archivos commiteados y recalcula su
  huella, igual que haría un consumidor. Existe porque en el momento de publicar no se puede
  regenerar sin reescribir la fecha y terminar publicando algo distinto de lo que quedó en
  `main`.

### P7 — Publicar, y verificar que producción lo sirva

En cada cambio y en cada pedido de fusión, la cadena corre las cinco verificaciones y exige que
el árbol quede limpio. Si todo está verde **y** el cambio entró a `main`, un segundo trabajo
copia el sitio al repositorio del portal: exige la credencial (y falla diciéndolo si falta, en
vez de saltearse en silencio), recalcula la huella de lo que va a copiar, comprueba que haya
sitio para publicar, y espeja los dos directorios — así lo que el método dejó de generar
desaparece del portal en vez de quedar ahí para siempre — con una guarda que se niega a borrar
nada fuera del árbol del método. `[código]`

Después pregunta a producción si sirve las dos huellas y distingue tres situaciones: coincide
(verde), contesta y sirve **otra** huella (aviso, y dice cuál), o no se pudo leer (rojo, con el
código HTTP o el error de red a la vista). El rojo dice que la publicación ocurrió y falta la
evidencia, no que se publicó mal. `[código]`

Corrido hoy contra producción: las dos huellas coinciden, `2026.10.2` y `2026.10.1`, HTTP 200.
`[corrido]`

### P8 — Partir las traducciones

Una herramienta de mantenimiento: toma un archivo con los contratos traducidos pegados uno tras
otro y los parte en los archivos individuales. `[código]`

---

## 5. Lo que el sistema se niega a hacer

Esto es, para un lector, la parte más importante: la funcionalidad de este sistema **es en buena
medida su negativa**. `[inferido]`, sobre comportamiento `[código]`

- No publica nada si hay un solo error de validación.
- No deja editar la base congelada: un requisito nuevo entra como entrada nueva.
- No deja que dos contenidos distintos viajen bajo la misma versión declarada.
- No inventa un umbral que el dueño no declaró: lo publica como no declarado.
- No deja transcribir dos veces el mismo texto: el enunciado de una regla vive en un solo lugar.
- No deja que la declaración de idioma sea falsa.
- No deja una clave publicada sin protección de la huella.
- No deja editar a mano un documento generado.
- No lee como verde una regla que la instalación no midió, ni una regla apagada sin registro.
- No publica si falta la credencial del portal, y no se saltea el paso en silencio.

## 6. Los límites del sistema

- **No tiene base de datos, ni usuarios, ni sesión.** Su estado es el repositorio. `[código]`
- **No tiene dependencias**: no hay `package.json` ni `node_modules`; todo corre con Node 22
  pelado. `[corrido]`
- **La construcción no usa red** a propósito; la verificación contra producción es un programa
  aparte, justamente por eso. `[código]`
- **No mide código**: el evaluador de heurísticas recibe lo medido. Quien mide es la herramienta
  consumidora. `[código]`
- **No administra la landing** del sitio público ni su índice. `[código]`
- **Ocho de los 76 documentos** piden una biblioteca de diagramas a un proveedor externo cuando
  el lector los abre. Si ese proveedor no responde, el diagrama se ve como texto crudo; el resto
  del documento se lee igual. `[corrido]`

## 7. Lo que inferí, y puede estar mal

1. Que el usuario que importa, del lado de los datos, es una herramienta que aplica el método, y
   que la razón de publicarlos es que deje de llevarlos compilados adentro. El código lo dice en
   sus comentarios, pero el propósito es interpretación mía. `[inferido]`
2. Que los dos manuales de práctica y las evaluaciones de otras IA son material de apoyo y no
   parte del método; lo deduzco de que no se traducen y de que no aparecen en la cadena de
   verificaciones. `[inferido]`
3. Que `AIevaluation.md`, `DECISIONES.md` y `PLAN_CURSO_MENTORING.md` son documentos internos:
   están en el repositorio y **no** se convierten a HTML ni se publican. `[código]` para el
   hecho, `[inferido]` para el "internos". `[?]` para el dueño: ¿es a propósito?
4. Que la traducción de un prompt que el lector ve con el botón se escribe a mano en cada idioma
   y nadie verifica que diga lo mismo que el inglés. El sistema verifica que el **inglés** sea
   idéntico en las ocho versiones; sobre la fidelidad de la traducción no hay ninguna
   comprobación por máquina. `[código]` para la ausencia, `[inferido]` para que sea deliberado.
5. Que el sistema asume que quien lo corre trabaja en Windows. No está declarado en ningún lado;
   lo deduzco de tres programas que detectan si se los llamó desde la línea de comandos con una
   fórmula que sólo acierta en Windows, y de que esos mismos tres no hacen nada cuando la cadena
   los corre en Linux. Esto está documentado como hallazgo en la ficha de elegibilidad.
   `[corrido]`

---

## 8. Para el dueño: lo que hay que mirar de este documento

La pregunta de completitud de la estación N0 es una sola: **¿éste es el sistema que creés
tener?** No hace falta leer código para contestarla. Las tres cosas donde más probable es que yo
haya errado:

1. ¿Falta alguna pantalla o algún proceso que exista y yo no haya encontrado?
2. ¿Hay algo en la sección 5 ("lo que se niega a hacer") que **no** debería ser una negativa, o
   alguna que falte?
3. ¿Las cinco inferencias de la sección 7 son correctas?
