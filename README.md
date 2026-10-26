# Urazuke — el método de la evidencia

*Urazuke* (裏付け) es una palabra japonesa que nombra el respaldo que tiene una afirmación: lo
que la sostiene por detrás. El verbo, *urazukeru*, es "respaldar con pruebas". Ese es el método.

Un método para construir software con inteligencia artificial que salga robusto, listo para
producción, **sin que el dueño del proyecto tenga que leer una sola línea de código**. Lo
destilé de tres sistemas reales que hoy están en producción, apoyado en la ingeniería de sistemas
de siempre y en lo que esos sistemas me mostraron sobre dónde los modelos la aplican de manera
frágil.

Autor: Pablo Kuschniroff, asistido por Claude Code. Publicado bajo Creative Commons BY-SA 4.0.
Repositorio público: [github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).
Presentación pública: [yujin.app/urazuke](https://yujin.app/urazuke/).

## Tres cosas distintas: un método, un protocolo, una herramienta

Lo pongo arriba porque es el malentendido más caro que tiene este proyecto, y lo medí: le pasé el
sitio publicado a un asistente ajeno y metió las tres cosas en una sola bolsa, concluyó que todo
junto era la narrativa de un producto y se ofreció a analizarme el código. Le pidió código a un
método. Son tres naturalezas distintas y conviene separarlas de entrada.

**El método es Urazuke, y es esto que estás leyendo.** Dice qué hacer y en qué orden, qué exigirle
a quien construye —sea una persona o un modelo— y cómo saber, sin leer una línea de código, que
entregó completo y no a medias. Es procedimiento y es criterio, nada más. Se aplica con el
asistente que tengas a mano, con el que salga el año que viene, o con lápiz, papel y un equipo de
personas. Está acá entero y bajo licencia libre: los veinticuatro peldaños, sus contratos y sus
prompts.

**El protocolo es NAC3, y es otra cosa.** Es un contrato para que las pantallas de una aplicación
se puedan operar por programa —cada elemento de la interfaz con su identificador y sus métodos— y,
por el mismo precio, las pueda operar una persona que usa un lector de pantalla o la voz: un
agente y una persona navegando la misma interfaz con la misma dignidad. El método lo usa como
**medio** para una cosa puntual: que las pruebas de punta a punta recorran la pantalla solas. No es
una condición del método. El criterio del método es neutral y está escrito así en el peldaño 0:
que la interfaz se pueda ejecutar por programa, con cualquier tecnología que lo permita.

**La herramienta es Yujin-Forge, y es una implementación.** Automatiza el método —las compuertas,
la inyección de los prompts— y habla el protocolo. Es *una* manera de aplicar Urazuke, no *la*
manera. Si no te sirve, o no la querés, el método te queda igual de completo.

Y esto no es una declaración de buena voluntad: **está en el dato y se puede medir.** La definición
mecánica de las compuertas que el método publica para cualquier consumidor no nombra ninguna
herramienta ni ningún protocolo, ni los míos. Hay una prueba automática que lo exige sobre cada
superficie donde podría colarse —las fuentes, los dos archivos publicados, su índice y el
documento generado—, y cualquiera lo comprueba hoy, en un segundo, sobre el archivo servido:

```
curl -s https://yujin.app/urazuke/api/gates.json | grep -o -i -E "forge|nac-?3|yujin" | wc -l
```

Devuelve **0** (medido el 2026-10-26). Una herramienta cualquiera puede implementar las compuertas
del método sin adoptar ningún protocolo y sin adoptar ninguna otra herramienta.

## La tesis en una frase

La IA no interrumpe el método: lo continúa. La industria dejó de confiar en el autor del código
hace veinte años y aprendió a exigir evidencia en vez de leerlo; el modelo es el siguiente autor,
no el primero desconfiable. Lo único nuevo es que este autor también fabrica la evidencia, y por
eso la evidencia tiene que probarse a sí misma.

## Qué hay acá

| Archivo | Qué es |
|---|---|
| `docs/ESCALERA_METODOLOGICA.md` | El documento principal: la tesis, de dónde sale el método, la línea de tiempo (cuándo se sube cada peldaño y qué pasa entre medio: infraestructura, CI/CD, ingesta de requerimientos, desarrollo, pruebas de punta a punta, vista humana, pruebas humanas), los veinticuatro peldaños con su ficha (los seis de calidad operativa —16 a 19, 21 y 22— antes y después del primer despliegue: observabilidad, persistencia, vulnerabilidades, rendimiento, y los dos monitoreos), lo que falta, los trabajos relacionados (qué existe parecido en el mundo y en qué se distingue este método), y el glosario. |
| `docs/EVOLUTIVO_CORRECTIVO.md` | El camino para un sistema que ya existe y no nació con el método: los tres casos de uso del método, el principio de normalizar sin reescribir, las ocho estaciones de normalización (N0 a N7) con sus contratos y prompts, el bucle en modo correctivo y evolutivo, y la lista de salida del tramo. |
| `docs/REFERENCIAS.md` | Los casos reales detrás del método, numerados ("Ref. N"), con fecha y evidencia, para que los procedimientos queden limpios y el detalle siga a un clic. Incluye las cronologías de los tres sistemas y la tabla de fallos por peldaño. |
| `docs/peldanos/peldano-NN-*.md` | El contrato de cada peldaño: cuándo, contexto requerido, prompts en inglés con su traducción y, antes de cada uno, el bloque "Antes de enviar el prompt" con los archivos que tenés que construir vos y su contenido; resultado esperado, verificación de completitud sin leer código, señales de alarma. |
| `docs/peldanos/README.md` | El índice de los contratos. |
| `docs/MANUAL_CURSO.md` | El curso: calendario, veinticuatro lecciones con tareas prácticas y prompts, proyecto guía ("Turnera"), lista de salida a producción. |
| `docs/MANUAL_CURSO_EVOLUTIVO.md` | La parte 2 del curso: el proyecto guía heredado ("Turnera heredada"), diez lecciones (N0 a N7, R1 y R2) para normalizar un legado y después corregirlo y evolucionarlo. |
| `docs/DECISIONES.md` | Las decisiones del proyecto, con fecha y palabras textuales. El método se aplica a sí mismo. |
| `docs/EVALUACIONES_DE_IA.md` | Cuatro IAs evaluaron el método por su cuenta, con la regla de citar textual o no afirmar; esto cuenta qué dijeron, dónde se equivocaron y por qué, y qué de lo que encontraron era real. |
| `docs/TRABAJO_COLABORATIVO.md` | Cómo se aplica el método cuando varios desarrolladores, cada uno con su agente, trabajan sobre la misma rama: las siete reglas de la rama compartida, cómo se reparten los peldaños, y los prompts. |
| `docs/CAPACITACION_JUNIOR.md` | El impacto del método en la formación de los desarrolladores junior: qué focos pierden peso, cuáles ganan, con qué objetivo y cómo capacitar a un junior en la era posterior a la programación a mano. |
| `docs/PLAN_CURSO_MENTORING.md` | El borrador del plan comercial del curso y el mentoring. |
| `docs/html/` | Las versiones HTML para lectura cómoda, con el botón que traduce cada prompt. No se editan a mano. |
| `build/` | El conversor de markdown a HTML, el extractor y verificador de prompts, y el script que arma todo. |
| `prompts/` | Los prompts en inglés extraídos de los contratos, generados; no se editan a mano. |

## Cómo leerlo

Empezá por `docs/ESCALERA_METODOLOGICA.md`, o por su HTML en `docs/html/`. Si te encontrás con
una palabra rara, el glosario está al final. Después, el contrato del peldaño que te interese, y
el manual del curso si querés aplicarlo. Si lo que tenés no es una carpeta vacía sino un sistema
que ya corre y hay que corregir o hacer crecer, el camino es `docs/EVOLUTIVO_CORRECTIVO.md` y la
parte 2 del manual.

## Cómo regenerar los HTML

```
node build/build.mjs
```

Verifica que los prompts en inglés sean idénticos en las ocho versiones (los de los contratos y
los del camino evolutivo-correctivo) y produce, para cada idioma, `ESCALERA_METODOLOGICA.html`,
`REFERENCIAS.html`, `EVOLUTIVO_CORRECTIVO.html`, `MANUAL_CURSO.html`, `MANUAL_CURSO_EVOLUTIVO.html`,
`CAPACITACION_JUNIOR.html`, `TRABAJO_COLABORATIVO.html` y `CONTRATOS_DE_PELDANO.html` (el castellano en `docs/html/`, los demás en `docs/html/<idioma>/`).

## Idiomas

El castellano es la fuente de verdad. La documentación existe en los ocho idiomas de NAC3:
castellano (`docs/`), inglés (`docs/en/`), portugués (`docs/pt/`), francés (`docs/fr/`), alemán
(`docs/de/`), italiano (`docs/it/`), japonés (`docs/ja/`) y chino (`docs/zh/`). Cada carpeta tiene
su README, el documento principal, las referencias, los veinticuatro contratos, el camino
evolutivo-correctivo y las dos partes del manual-curso. Los
prompts para el modelo son una sola pieza en inglés, idéntica en todas las versiones, con su
traducción al idioma del documento al lado; `node build/prompts.mjs --check` falla si una
traducción los alteró. El nombre no se traduce; el subtítulo sí: *the evidence method*, *o método
da evidência*, *la méthode de la preuve*, *die Nachweis-Methode*, *il metodo del riscontro*,
裏付けの方法, 验证方法.

Las decisiones (`docs/DECISIONES.md`), el plan del curso y `docs/EVALUACIONES_DE_IA.md` quedan
solo en castellano porque citan palabras textuales.

## Licencia y cómo contribuir

El método se publica bajo **Creative Commons Atribución-CompartirIgual 4.0** (`LICENSE`): se puede
usar, traducir y adaptar, con atribución y compartiendo igual. Las mejoras a **este** repositorio
entran por pull request desde un fork, con su evidencia, y las fusiona un mantenedor después de
revisarlas; nadie más escribe en `main`. El proceso está en `CONTRIBUTING.md`. El peldaño 23 del
método pide que cada retrospectiva termine en una propuesta concreta de cambio a la escalera; esa
es la forma esperada de contribuir.

Los clientes de los sistemas de origen están anonimizados ("la Obra Social", "la Asociación");
los números, las fechas y los commits son reales.

## Estilo de este proyecto

Distinto del resto de mis repositorios, y a propósito: primera persona, prosa explicada, lenguaje
de todos los días, caracteres latinos con tildes y eñes, y un glosario para cada sigla y cada
expresión coloquial. Está escrito para personas que no vivieron los proyectos. Ver `CLAUDE.md`.
