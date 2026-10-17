# CLAUDE.md — instrucciones para el agente en este repositorio

Este es el repositorio de **Urazuke, el método de la evidencia** (裏付け: el respaldo que tiene una
afirmación). Es el repositorio del método, no de un producto. No hay código
de aplicación: hay documentos, contratos de peldaño y un conversor a HTML.

## Qué leer primero

1. `README.md`.
2. `docs/ESCALERA_METODOLOGICA.md` — el documento principal. Su "Parte D" es la lista de lo que
   falta; es el plan de trabajo de este repositorio.
3. `docs/peldanos/README.md` — el índice de los contratos.
4. `docs/DECISIONES.md` — las decisiones del proyecto, con las palabras textuales de Pablo. Toda
   decisión nueva se agrega ahí, el mismo día.

## Reglas de estilo (distintas del resto de Yujin, a propósito)

- **Caracteres latinos**: tildes, eñes, signos de apertura. NO la convención ASCII de los otros
  repositorios. Pablo lo pidió el 2026-10-17 para este proyecto.
- **Prosa explicada y coloquial**: el lector no vivió los proyectos. Explicar completo, con
  calificativos e interjecciones si hacen falta; no "lenguaje como fórmula lógica". Definir cada
  sigla la primera vez.
- **Glosario obligatorio**: toda sigla, nombre propio o expresión coloquial que aparezca en
  `docs/ESCALERA_METODOLOGICA.md` tiene que estar en su glosario, en orden alfabético.
- **Evidencia citada**: cada afirmación sobre lo que pasó cita commit o documento del repositorio
  de origen. Lo que es interpretación va marcado `[hipótesis]`.
- **Las palabras de Pablo van textuales** cuando se cita una decisión suya.

## Reglas de trabajo

- Los HTML de `docs/html/` se regeneran con `node build/build.mjs`; nunca se editan a mano. El
  markdown es la única fuente.
- Cada contrato de peldaño tiene exactamente cinco secciones numeradas: contexto requerido,
  prompts, resultado esperado, verificación de completitud, señales de alarma. Más un encabezado
  con tramo, forma y tamaño, y un "Para qué sirve". No agregar secciones sin acordarlo con Pablo.
- Los prompts van EN INGLÉS, en bloque de cita (`> `), y cada uno seguido de un párrafo "Qué le
  estamos pidiendo" en el idioma del documento. Terminan con "Reply in my language". Son una sola
  pieza idéntica en las ocho versiones: `node build/build.mjs` los extrae a `prompts/` desde la
  fuente en castellano y falla si una traducción los alteró.
- Todo prompt de contrato lleva la cláusula de completitud: el modelo evalúa si el contexto
  alcanza, pide lo que falte, y no estima ni inventa un dato que solo el negocio tiene.
- El peldaño 0 (elegibilidad) se elabora CON Pablo: los criterios X1 y X2 están confirmados; los
  D1 a D10 son hipótesis sin peso. No cerrarlos solo.
- Repositorios de origen (solo lectura desde acá): `[repositorio yujin-forge]`, `[repositorio Kikan]`,
  `[repositorio Autorizaciones]`.

## Publicación

- El nombre es Urazuke (decisión D-014, 2026-10-17). No se traduce; el subtítulo sí. La
  publicación como código abierto colaborativo es cuando Pablo diga que la elaboración terminó;
  hasta entonces, repositorio privado.
- Idiomas (D-013): castellano como fuente de verdad; traducción a los otros siete idiomas de
  NAC3; los prompts para el modelo son UNA pieza en inglés, idéntica en todas las versiones,
  explicada en el idioma del lector.
- Los clientes están anonimizados: "la Obra Social" (con "el Autorizador") y "la Asociación";
  sus sistemas, "Autorizaciones" y "Kikan". **Los nombres reales no se escriben en este
  repositorio**, ni en los documentos ni en los mensajes de commit. Las rutas locales de los
  repositorios de origen tampoco (están en la memoria de Sumi).
- Licencia: CC BY-SA 4.0 (`LICENSE`). Gobernanza: `CONTRIBUTING.md` + `.github/CODEOWNERS`;
  en GitHub, `main` protegida (pull request + aprobación de un propietario, sin excepciones),
  ramas de contribuidores solo en forks, borrado automático de la rama al fusionar.
- La presentación pública va en yujin.app (repositorio `pkuschnirof/rpaforce`, carpeta
  `C:\RPAForce\web\yujin.app\`), multilingüe, con NAC3.
