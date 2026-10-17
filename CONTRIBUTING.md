# Cómo contribuir

Gracias por querer mejorar el método. Para que las mejoras mantengan la calidad del original,
el proceso es corto pero estricto. Está pensado para que **nada llegue a `main` sin revisión y
autorización de los mantenedores**, y para que el repositorio no se llene de ramas.

## El principio

Este método se construyó con una regla: cada peldaño existe porque hubo un golpe real que lo
justificó, y cada afirmación cita su evidencia. **Las mejoras entran con la misma regla.** Una
propuesta de cambio a la escalera tiene que decir qué incidente, qué proyecto o qué medición la
justifica. "Me parece mejor así" no alcanza; "en mi proyecto pasó esto, y el peldaño 9 no lo
cubría" sí.

## Cómo proponer una mejora

1. **Abrí un issue primero**, contando el caso: qué pasó, en qué peldaño cae (o en ninguno, que
   es lo más interesante), y qué cambio proponés. Así conversamos antes de que escribas mucho.
2. **Trabajá en un fork**, no en una rama de este repositorio. Los colaboradores no tienen
   permiso de escritura acá; es a propósito, para que no quede un bosque de ramas. Tu fork es
   tu espacio de trabajo.
3. **Mandá un pull request** desde tu fork hacia `main`, citando el issue. Un pull request, un
   cambio: no mezcles una corrección de glosario con un peldaño nuevo.
4. **Esperá la revisión.** Un mantenedor la hace; puede pedir cambios. La fusión la hacemos
   nosotros, nunca el autor del cambio.

## Qué revisamos

- Que el cambio trae su evidencia (caso real, medición, incidente).
- Que respeta el estilo del proyecto (ver `CLAUDE.md`): prosa explicada, lenguaje de todos los
  días, caracteres latinos con tildes y eñes, cada sigla en el glosario.
- Que los contratos de peldaño conservan sus cuatro secciones y la cláusula de completitud del
  prompt ("evaluá si alcanza, pedí lo que falte, no estimes").
- Que no se nombra a ningún cliente real ni se incluye información de terceros.
- Que los HTML no se editaron a mano (se regeneran con `node build/build.mjs`).

## Lo que no hace falta

No hace falta pedir permiso para traducir el método, usarlo en un curso propio o adaptarlo a tu
organización: la licencia CC BY-SA 4.0 ya lo permite, con atribución y compartiendo igual. Lo que
este documento regula es qué entra en **este** repositorio.

## Mantenedores

Los que figuran en `.github/CODEOWNERS`. Son los únicos que pueden fusionar en `main`.
