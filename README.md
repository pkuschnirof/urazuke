# Escalera metodológica (nombre provisorio)

Un método para construir software con inteligencia artificial que salga robusto, listo para
producción, **sin que el dueño del proyecto tenga que leer una sola línea de código**. Destilado
de tres sistemas reales que hoy están en producción, con los golpes incluidos.

Este repositorio es el proyecto del método en sí: el documento principal, los contratos de cada
peldaño, el plan del curso y el mentoring, y más adelante la presentación pública. **Nombre
definitivo y publicación como código abierto colaborativo: cuando terminemos de elaborarlo.**
Hasta entonces el repositorio es privado y el nombre es provisorio.

## La tesis en una frase

La IA no interrumpe el método: lo continúa. La industria dejó de confiar en el autor del código
hace veinte años y aprendió a exigir evidencia en vez de leerlo; el modelo es el siguiente autor,
no el primero desconfiable. Lo único nuevo es que este autor también fabrica la evidencia, y por
eso la evidencia tiene que probarse a sí misma.

## Qué hay acá

| Archivo | Qué es |
|---|---|
| `docs/ESCALERA_METODOLOGICA.md` | El documento principal: la tesis, el relevamiento de los tres repositorios (momentos e hitos con su commit), los dieciséis peldaños con su ficha, los fallos reales mapeados a peldaños, lo que falta, y el glosario. |
| `docs/peldanos/peldano-NN-*.md` | El contrato de cada peldaño: contexto requerido, prompts textuales, resultado esperado y verificación de completitud. Es lo que un alumno ejecuta y lo que después se exporta a Forge. |
| `docs/peldanos/README.md` | El índice de los contratos, con el tramo de cada uno. |
| `docs/PLAN_CURSO_MENTORING.md` | El borrador del curso, el mentoring y el plan de LinkedIn. |
| `docs/html/` | Las versiones HTML para lectura cómoda, generadas con `node build/build.mjs`. No se editan a mano. |
| `build/` | El conversor de markdown a HTML y el script que arma los HTML. |

## Cómo leerlo

Empezá por `docs/ESCALERA_METODOLOGICA.md`, o por su HTML en `docs/html/`. Si te encontrás con
una palabra rara, el glosario está al final. Después, el contrato del peldaño que te interese.

## Cómo regenerar los HTML

```
node build/build.mjs
```

Produce `docs/html/ESCALERA_METODOLOGICA.html` y `docs/html/CONTRATOS_DE_PELDANO.html`.

## Licencia y cómo contribuir

El método se publica bajo **Creative Commons Atribución-CompartirIgual 4.0** (`LICENSE`): se puede
usar, traducir y adaptar, con atribución y compartiendo igual. Las mejoras a **este** repositorio
entran por pull request desde un fork, con su evidencia, y las fusiona un mantenedor después de
revisarlas; nadie más escribe en `main`. El proceso está en `CONTRIBUTING.md`.

Los clientes de los sistemas de origen están anonimizados ("la Obra Social", "la Asociación");
los números, las fechas y los commits son reales.

## Estilo de este proyecto

Distinto del resto de los repositorios de Yujin, y a propósito: prosa explicada, lenguaje de todos
los días, caracteres latinos con tildes y eñes, y un glosario para cada sigla y cada expresión
coloquial. Está escrito para personas que no vivieron los proyectos. Ver `CLAUDE.md`.

## Origen

Pablo Kuschnirof (RPAForce / Yujin) y Sumi (la sesión de Claude Code que trabaja con él), a partir
de `yujin-forge`, `Autorizaciones` y `Kikan`. Octubre de 2026.
