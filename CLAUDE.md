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
- Caracteres latinos con tildes y eñes (NO ASCII-only, al revés que en los otros repos).
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
  referencias, dieciséis contratos y manual-curso. Un cambio en el castellano se replica en las
  siete traducciones en el mismo commit.
- Los clientes están anonimizados: "la Obra Social" (con "el Autorizador") y "la Asociación"; sus
  sistemas, "Autorizaciones" y "Kikan". **Los nombres reales no se escriben en este repositorio**,
  ni en los documentos ni en los mensajes de commit. Las rutas locales de los repositorios de
  origen tampoco.
- Licencia: CC BY-SA 4.0 (`LICENSE`). Gobernanza: `CONTRIBUTING.md` + `.github/CODEOWNERS`;
  `main` protegida (pull request + aprobación de un propietario).
- Presentación pública: `yujin.app/urazuke` vive en el repositorio `pkuschnirof/rpaforce`
  (`web/yujin.app/urazuke/`): landing con i18n propio (diez idiomas de interfaz) y copia de
  `docs/html/` en `urazuke/docs/`. Al regenerar los HTML acá, copiarlos allá. Su push a `main`
  despliega a producción.

## Build

`node build/build.mjs`: verifica los prompts y genera, por idioma, `ESCALERA_METODOLOGICA.html`,
`REFERENCIAS.html`, `MANUAL_CURSO.html` y `CONTRATOS_DE_PELDANO.html`. `build/split.mjs` parte un
archivo con marcas `<!-- file: … -->` en contratos individuales.
