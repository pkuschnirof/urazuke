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

## La tesis en una frase

La IA no interrumpe el método: lo continúa. La industria dejó de confiar en el autor del código
hace veinte años y aprendió a exigir evidencia en vez de leerlo; el modelo es el siguiente autor,
no el primero desconfiable. Lo único nuevo es que este autor también fabrica la evidencia, y por
eso la evidencia tiene que probarse a sí misma.

## Qué hay acá

| Archivo | Qué es |
|---|---|
| `docs/ESCALERA_METODOLOGICA.md` | El documento principal: la tesis, de dónde sale el método, la línea de tiempo (cuándo se sube cada peldaño y qué pasa entre medio: infraestructura, CI/CD, ingesta de requerimientos, desarrollo, pruebas de punta a punta, vista humana, pruebas humanas), los dieciséis peldaños con su ficha, lo que falta, y el glosario. |
| `docs/REFERENCIAS.md` | Los casos reales detrás del método, numerados ("Ref. N"), con fecha y evidencia, para que los procedimientos queden limpios y el detalle siga a un clic. Incluye las cronologías de los tres sistemas y la tabla de fallos por peldaño. |
| `docs/peldanos/peldano-NN-*.md` | El contrato de cada peldaño: cuándo, contexto requerido, prompts en inglés con su traducción y, antes de cada uno, el bloque "Antes de enviar el prompt" con los archivos que tenés que construir vos y su contenido; resultado esperado, verificación de completitud sin leer código, señales de alarma. |
| `docs/peldanos/README.md` | El índice de los contratos. |
| `docs/MANUAL_CURSO.md` | El curso: calendario, dieciséis lecciones con tareas prácticas y prompts, proyecto guía ("Turnera"), lista de salida a producción. |
| `docs/DECISIONES.md` | Las decisiones del proyecto, con fecha y palabras textuales. El método se aplica a sí mismo. |
| `docs/PLAN_CURSO_MENTORING.md` | El borrador del plan comercial del curso y el mentoring. |
| `docs/html/` | Las versiones HTML para lectura cómoda, con el botón que traduce cada prompt. No se editan a mano. |
| `build/` | El conversor de markdown a HTML, el extractor y verificador de prompts, y el script que arma todo. |
| `prompts/` | Los prompts en inglés extraídos de los contratos, generados; no se editan a mano. |

## Cómo leerlo

Empezá por `docs/ESCALERA_METODOLOGICA.md`, o por su HTML en `docs/html/`. Si te encontrás con
una palabra rara, el glosario está al final. Después, el contrato del peldaño que te interese, y
el manual del curso si querés aplicarlo.

## Cómo regenerar los HTML

```
node build/build.mjs
```

Verifica que los prompts en inglés sean idénticos en las ocho versiones y produce, para cada
idioma, `ESCALERA_METODOLOGICA.html`, `REFERENCIAS.html`, `MANUAL_CURSO.html` y
`CONTRATOS_DE_PELDANO.html` (el castellano en `docs/html/`, los demás en `docs/html/<idioma>/`).

## Idiomas

El castellano es la fuente de verdad. La documentación existe en los ocho idiomas de NAC3:
castellano (`docs/`), inglés (`docs/en/`), portugués (`docs/pt/`), francés (`docs/fr/`), alemán
(`docs/de/`), italiano (`docs/it/`), japonés (`docs/ja/`) y chino (`docs/zh/`). Cada carpeta tiene
su README, el documento principal, las referencias, los dieciséis contratos y el manual-curso. Los
prompts para el modelo son una sola pieza en inglés, idéntica en todas las versiones, con su
traducción al idioma del documento al lado; `node build/prompts.mjs --check` falla si una
traducción los alteró. El nombre no se traduce; el subtítulo sí: *the evidence method*, *o método
da evidência*, *la méthode de la preuve*, *die Nachweis-Methode*, *il metodo del riscontro*,
裏付けの方法, 验证方法.

Las decisiones (`docs/DECISIONES.md`) y el plan del curso quedan solo en castellano porque citan
palabras textuales.

## Licencia y cómo contribuir

El método se publica bajo **Creative Commons Atribución-CompartirIgual 4.0** (`LICENSE`): se puede
usar, traducir y adaptar, con atribución y compartiendo igual. Las mejoras a **este** repositorio
entran por pull request desde un fork, con su evidencia, y las fusiona un mantenedor después de
revisarlas; nadie más escribe en `main`. El proceso está en `CONTRIBUTING.md`. El peldaño 15 del
método pide que cada retrospectiva termine en una propuesta concreta de cambio a la escalera; esa
es la forma esperada de contribuir.

Los clientes de los sistemas de origen están anonimizados ("la Obra Social", "la Asociación");
los números, las fechas y los commits son reales.

## Estilo de este proyecto

Distinto del resto de mis repositorios, y a propósito: primera persona, prosa explicada, lenguaje
de todos los días, caracteres latinos con tildes y eñes, y un glosario para cada sigla y cada
expresión coloquial. Está escrito para personas que no vivieron los proyectos. Ver `CLAUDE.md`.
