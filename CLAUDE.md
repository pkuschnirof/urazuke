# CLAUDE.md

Este repositorio es el proyecto del método Urazuke: el documento principal (la escalera
metodológica), las referencias a los casos reales, los contratos de cada peldaño, el manual del
curso, el registro de decisiones y el plan del curso y el mentoring. El autor es Pablo
Kuschniroff, asistido por Claude Code. Se publica bajo CC BY-SA 4.0 y se presenta en
yujin.app/urazuke.

## Estilo (distinto del resto de los repositorios de Yujin)

- **Voz**: primera persona del autor (Pablo), imperativo hacia el lector ("exigile", "no
  avances"), verbosa, con complejidad y matices; tiene que leerse como un escrito humano, no como
  un informe de un asistente. Nunca "el usuario pidió", nunca "Sumi"; cuando hace falta nombrar a
  la herramienta, es "Claude Code" o "el agente".
- Prosa explicada, lenguaje de todos los días, interjecciones y calificativos cuando ayudan.
- Caracteres latinos con tildes y eñes (NO ASCII-only, al revés que en los otros repos). Eso vale
  para la **prosa** del método; el nivel de datos de las compuertas (`gates/`, la API publicada y
  `docs/COMPUERTAS.md`) va en inglés y en ASCII puro, porque no es prosa y no está traducido (D-051).
- Cada sigla y cada expresión coloquial que aparece se explica en el glosario del documento
  principal.
- Los casos reales (fechas, commits, pendientes, incidentes) NO van en los procedimientos ni en
  los manuales: van en `docs/REFERENCIAS.md`, numerados "Ref. N", y los demás documentos los
  citan con `[Ref. N](REFERENCIAS.md#ref-N)` (desde `docs/peldanos/`, `../REFERENCIAS.md`). El
  conversor convierte esos enlaces a `REFERENCIAS.html#ref-N`.
- El origen del método se presenta siempre como la combinación de dos factores: la ingeniería de
  sistemas clásica que el autor aplica desde antes, y los incidentes que mostraron dónde los
  modelos la aplican de manera frágil. Nunca como "todo salió de los fallos".
- Lo que es interpretación y no hecho verificado se marca `[hipótesis]`.
- **Nivel principiante** (D-025): todo se explica para alguien que no programa. Cada término
  técnico se explica en lenguaje de todos los días la primera vez que aparece en un documento y
  entra al glosario; los contratos de los peldaños de calidad operativa (16 a 22) llevan un
  párrafo "Si sos principiante" después de "Para qué sirve", y los nuevos tienen que llevarlo.

## Estructura de los contratos (`docs/peldanos/`)

Encabezado con tramo, **cuándo**, forma y tamaño; "Para qué sirve"; y cinco secciones: (1)
contexto requerido, genérico, sin formularios, con un párrafo que remite a los bloques de la
sección 2; (2) prompts en inglés, cada uno **precedido** por un bloque que empieza con `**Antes de
enviar el prompt**` (párrafo + lista: los archivos e insumos que el lector construye antes de
pegarlo, con nombre, contenido, quién lo hace y estado mínimo aceptable; D-022) y **seguido** de su
traducción en un bloque `> [es]` (o `> [xx]` en cada traducción) y de "Qué le estoy pidiendo";
(3) resultado esperado; (4) verificación de completitud sin leer código; (5) señales de alarma.
Todos los prompts llevan la cláusula de completitud (evaluá si alcanza, pedí lo que falte, no
estimes) y terminan con "Reply in my language". Son UNA pieza en inglés, idéntica en las ocho
versiones; `build/prompts.mjs` la extrae y falla si una traducción la alteró. Los bloques `> [xx]`
no cuentan como prompts; el HTML los muestra con un botón "Traducir". El conversor reconoce la
etiqueta del bloque "antes" en cada idioma (`RE_ANTES` en `build/md2html.mjs`) y lo dibuja en una
caja propia; en las traducciones, la etiqueta es la del idioma, con la misma forma. El manual
tiene el mismo bloque antes de cada prompt de cada lección.

## Los peldaños de calidad operativa (16 a 22)

Cuarto tramo (D-025): 16 observabilidad y trazabilidad con nivel configurable; 17 optimización de
la persistencia medida antes y después; 18 escaneo y solución de vulnerabilidades en la cadena y
con calendario; 19 pruebas de rendimiento en volumen y punto de ruptura; 21 monitoreo de recursos,
funciones y consultas fuera de rango con reporte cíclico; 22 monitoreo de errores con reporte
cíclico. 16 a 19 van en la fase 3 (antes del primer despliegue); 21 y 22 en la fase 4. Valen para
los dos casos de uso; el camino evolutivo-correctivo dice cómo se ubican en un legado. La escalera
tiene veinticuatro peldaños y cuatro tramos; "dieciséis" y "veintidós" ya no aparecen como cuenta de peldaños.

## Los casos de uso y el camino evolutivo-correctivo

El método tiene tres casos de uso (D-023): proyecto nuevo (la escalera tal cual), evolutivo-
correctivo sobre un sistema hecho con el método (se entra por el peldaño 5), y
evolutivo-correctivo sobre un sistema hecho sin el método, que lleva un tramo de normalización
previo: `docs/EVOLUTIVO_CORRECTIVO.md`, con ocho estaciones N0 a N7 (no se llaman peldaños), sus
contratos y prompts con la misma estructura que los contratos de peldaño (bloque "Antes de enviar
el prompt", prompt EN, `> [xx]`, "Qué le estoy pidiendo"), el bucle en modo correctivo y
evolutivo, y la lista de salida del tramo. Reglas de ese camino que no se negocian: no se
reescribe; el cinturón de seguridad es compuerta dura (con la excepción escrita de la urgencia);
y todos los insumos de las etapas previas tienen que existir, recuperados por autodescubrimiento
con marcas de fuente (`[código]`, `[base]`, `[configuración]`, `[documentación]`, `[negocio]`,
`[inferido]`) cuando nadie los escribió. La parte 2 del curso (`docs/MANUAL_CURSO_EVOLUTIVO.md`)
tiene el proyecto guía heredado "Turnera heredada" y las lecciones N0 a N7, R1 y R2.
`build/prompts.mjs` también verifica los prompts de `EVOLUTIVO_CORRECTIVO.md` en los ocho idiomas.

## El rojo como recibo, las pruebas de mutación y los trabajos relacionados

D-033: en el peldaño 8 el rojo es un recibo (comando exacto, versión contra la que corrió,
cantidad de fallos, código de salida, pegados tal cual) y no un relato; el peldaño 9 tiene un
tercer prompt, opcional, de pruebas de mutación. Es la respuesta escrita a la objeción de que el
agente puede fingir el rojo. D-034: la Parte F del documento principal, "Trabajos relacionados",
compara el método con lo publicado hasta octubre de 2026, con enlaces; se mantiene en los ocho
idiomas y se amplía cuando aparece algo nuevo. Los trabajos ajenos se citan ahí con su enlace,
no como "Ref. N" (las referencias son solo los casos propios).

## La línea de tiempo

La Parte B del documento principal dice cuándo se sube cada peldaño y qué pasa entre medio
(ingesta de requerimientos con sus métodos, infraestructura, CI/CD, desarrollo, pruebas de punta a
punta en tres escalas, vista humana de las pantallas, pruebas humanas). Cada ficha de peldaño y
cada contrato tienen su "Cuándo". El manual tiene el calendario del curso. Cualquier cambio en una
de estas tres piezas se replica en las otras dos.

## Publicación

- Nombre: Urazuke (D-014). No se traduce; el subtítulo sí.
- Idiomas (D-013): castellano como fuente de verdad (`docs/`); las otras siete versiones de NAC3
  en `docs/<idioma>/` (en, pt, fr, de, it, ja, zh), cada una con README, documento principal,
  referencias, veinticuatro contratos, camino evolutivo-correctivo, las dos partes del manual-curso y el documento sobre la capacitación del junior. Un cambio en el castellano se replica en las
  siete traducciones en el mismo commit.
- **Lo que queda fuera del corpus traducido va en inglés** (D-051), que es el idioma canónico de la
  profesión, y traducir para que un usuario final entienda mejor es responsabilidad de quien
  consume. Hoy eso aplica al nivel de datos de las compuertas (`gates/`, `docs/html/api/gates.json`)
  y a `docs/COMPUERTAS.md`. Los documentos que siguen en castellano por ser voz del autor o fuente
  primaria —`DECISIONES.md`, `EVALUACIONES_DE_IA.md`, `PLAN_CURSO_MENTORING.md`, `docs/practica/`—
  quedan explícitamente fuera de esa regla hasta que el dueño decida otra cosa.
- Los clientes están anonimizados: "la Obra Social" (con "el Autorizador") y "la Asociación"; sus
  sistemas, "Autorizaciones" y "Kikan". **Los nombres reales no se escriben en este repositorio**,
  ni en los documentos ni en los mensajes de commit. Las rutas locales de los repositorios de
  origen tampoco.
- Licencia: CC BY-SA 4.0 (`LICENSE`). Gobernanza: `CONTRIBUTING.md` + `.github/CODEOWNERS`;
  `main` protegida (pull request + aprobación de un propietario).
- Presentación pública: `yujin.app/urazuke` vive en el repositorio `pkuschnirof/rpaforce`, en
  `yujin.app/urazuke/`: landing con i18n propio (diez idiomas de interfaz), el extremo canónico
  de la API en `yujin.app/urazuke/api/` (lo que una herramienta pide por red) y la copia de
  `docs/html/` en `yujin.app/urazuke/docs/` (que arrastra su propia copia de `api/`). El push a
  `main` de ese repositorio despliega a producción.
- **La copia ya no se hace a mano** (D-052): el trabajo `publicar` de
  `.github/workflows/compuertas.yml` la hace solo en cada fusión a `main`, después de que las
  verificaciones queden verdes, y espeja `docs/html/` sobre los dos destinos de arriba. Lo que el
  método dejó de generar desaparece del portal y queda nombrado en el registro de la corrida. La
  credencial es una clave de despliegue del repositorio del portal, guardada como el secreto
  `PORTAL_DEPLOY_KEY` de este repositorio: alcanza a ese repositorio y a ningún otro, y se revoca
  desde sus ajustes. Si el secreto falta, el trabajo falla diciéndolo; no se saltea en silencio.
  La compuerta humana es la de siempre: `main` protegida, con pull request y aprobación de un
  propietario. **Lo que el disparador no hace**: tocar la landing. Un documento nuevo se publica y
  queda accesible por su URL, pero no aparece enlazado hasta que alguien lo agregue al índice y al
  i18n de la landing, que viven en el repositorio del portal.

## Las compuertas como datos (`gates/`)

D-050: el método es el dueño de la definición mecánica de las compuertas (qué artefacto tiene que
existir en cada peldaño, qué tiene que decir, con qué estrategia se verifica) y la publica en
`docs/html/api/gates.json`; Yujin-Forge es consumidor, igual que con los prompts. La fuente es
`gates/`, mantenida **a mano** porque es datos y no prosa: `catalog.json` (la versión declarada),
`schema.json` (el esquema, que el validador interpreta), `evaluators.json` (el vocabulario cerrado
y append-only), `steps.json` (24 peldaños), `stations.json` (N0 a N7), `heuristics.json` (las 45
reglas del Anexo H) y `adapters.json` (las familias de frontend y los umbrales).
`baseline_forge.json` es el congelado de lo que la herramienta tenía compilado el día del cambio:
es la referencia del test de diferencia cero y **no se edita nunca**.

Reglas que no se negocian, y que el validador hace cumplir (`node build/gates_validate.mjs`):

- **La base no se edita.** Una entrada sin `since_schema` viene del congelado y tiene que seguir
  siendo idéntica. Un requisito nuevo entra como entrada **nueva** con su `since_schema`. Si de
  verdad hay que cambiar un requisito existente, es un cambio del método y va con su decisión.
- **Una sola copia de cada texto.** El enunciado de las 45 reglas vive sólo en el Anexo H;
  `heuristics.json` lleva el puntero (`statement_source` para la ruta, una vez, y `section` +
  `row` por regla) y el build **extrae** el texto de `docs/en/ANEXO_HEURISTICAS.md`, que es la
  versión que se publica. El validador rechaza un enunciado transcrito, una severidad que no
  coincida con el anexo y una regla del anexo que la compuerta no tenga.
- **El castellano sigue siendo la fuente de verdad del anexo.** La construcción contrasta las dos
  versiones y falla (`E_ANEXO_TRADUCCION`) si no llevan las mismas reglas, las mismas severidades
  y el mismo agrupamiento por familia. Lo que **no** se verifica por máquina, y queda dicho, es si
  la redacción inglesa sigue diciendo lo que dice la castellana.
- **Ids append-only.** Peldaños, estaciones, reglas (`CQ-*`, `UX-*`) y nombres de evaluador se
  agregan: no se reciclan, no se renombran, no cambian de significado.
- **Nada inventado.** Un umbral que el dueño no declaró se publica con valor nulo y
  `declarado: false`. Los únicos dos que el anexo declara son 300 líneas por archivo y 40 por
  función.
- **La versión.** `catalog_version` la declara el método a mano (`2026.10.1`); el archivo publicado
  viaja con una huella `sha256` del contenido canonicalizado que el consumidor **recalcula**. El
  identificador de git es informativo: se calcula antes de guardar, así que siempre nombra al
  cambio anterior al que lo contiene.
- **El nivel de datos está en inglés y en ASCII puro** (D-051): nombres de campo, enumeraciones y
  prosa explicativa de `gates/`, el publicado `gates.json` y el documento generado. Es lo que no
  está traducido, y lo que no está traducido va en el idioma canónico de la profesión; traducir
  para el usuario final es trabajo del consumidor. **La excepción es la base congelada**: su texto
  sigue en el castellano en que quedó congelado y el campo `tramo` conserva su nombre, porque la
  base no se edita. Hay un test que lo exige, para que nadie «termine de traducir» por encima de
  la diferencia cero.
- **El contrato con el consumidor se declara, no se adivina**: `schema.json` lleva los nombres de
  campo de la configuración de proyecto (`project_config`), el vocabulario de veredicto
  (`enums.verdict`) y las situaciones de una regla, y el validador exige que el registro de
  apagado sea el mismo en el catálogo y en la configuración que lo consume.
- **La huella no deja claves en el limbo.** Toda clave del publicado está cubierta por
  `hash_covers` o excluida en `hash_excludes`, y el validador lo verifica (`E_HUELLA`): una clave
  que no esté en ninguna de las dos viajaría sin protección.
- `docs/COMPUERTAS.md` **se genera** (`node build/gates_doc.mjs`), **en inglés**, y la construcción
  falla si lo que hay en disco no coincide con los datos. No se edita a mano. Queda fuera del
  corpus traducido: es documentación de herramienta (D-051), y su HTML se marca `lang="en"`.
- `build/gates_reference.mjs` es el evaluador de referencia del grupo de heurísticas: la semántica
  del veredicto, ejecutable, con el fixture de violaciones deliberadas en `tests/fixture/`.

## Build

`node build/build.mjs`: verifica los prompts, valida y publica las compuertas, verifica que
`docs/COMPUERTAS.md` coincida con los datos, y genera, por idioma, `ESCALERA_METODOLOGICA.html`,
`REFERENCIAS.html`, `EVOLUTIVO_CORRECTIVO.html`, `MANUAL_CURSO.html`, `MANUAL_CURSO_EVOLUTIVO.html`
y `CONTRATOS_DE_PELDANO.html`. `build/split.mjs` parte un
archivo con marcas `<!-- file: … -->` en contratos individuales.

`node --test` (a secas, que descubre los archivos de prueba solo): las pruebas de las compuertas
(sin dependencias, node pelado). **No se usa el patrón entre comillas**: medido que en un intérprete
que no lo expande corre CERO pruebas y devuelve éxito, y un verde con cero pruebas no es un verde.
Incluyen el test de diferencia cero contra el congelado, los rojos deliberados del validador, el
fixture que prende y apaga el interruptor y el test de idioma del nivel de datos (D-051). `node build/api_check.mjs` regenera lo publicado y falla
si no coincide con lo commiteado, y `node build/api_check.mjs --huella` recalcula sólo la huella de
lo commiteado sin regenerar nada (es lo que usa el paso de publicación, porque regenerar reescribe
`generated_at` y publicaría algo distinto de lo que quedó en `main`).
`.github/workflows/compuertas.yml` corre todo eso en cada cambio y, en `main` y sólo con todo en
verde, publica en el repositorio del portal (D-052).
