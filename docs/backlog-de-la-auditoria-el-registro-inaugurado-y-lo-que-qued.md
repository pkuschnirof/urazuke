# El registro de pendientes del método, inaugurado

**24 de octubre de 2026.** El paso 0 de la auditoría está cumplido: el backlog existe, completo, y la compuerta queda del lado tuyo. Ninguno de los veintidós hallazgos está arreglado.

---

## Lo que hay esperando tu aprobación

| | qué es | estado de la cadena |
|---|---|---|
| **#4** | el nivel de datos no nombra herramientas ni protocolos (D-055) | verde |
| **#5** | el guardián de línea de comandos: dos pasos de la cadena corrían en vacío | verde, **y ahora los dos pasos imprimen en Linux** |
| **#6** | el registro de pendientes del método: 34 entradas | verde |

En este repositorio la publicación **es** la fusión, y la fusión es tuya: `main` está protegida.

---

## Los dos guardianes dormidos: medido despierto

Eran **dos**, como te corregí. Ahora están arreglados y lo verifiqué donde importa, que es Linux. De la corrida de la integración continua sobre la rama:

```
compuertas: validado (24 peldanos, 8 estaciones, 45 reglas)
docs/COMPUERTAS.md: coincide con los datos
# pass 165
# fail 0
```

Esas dos líneas son nuevas: en la corrida anterior sobre `main`, esos dos pasos imprimían **cero**. Y ahora cada paso **exige** su propia línea: uno que no imprimió nada se reporta en rojo diciendo que no corrió. Es el mismo criterio que el repositorio ya le aplicaba a las pruebas, aplicado a los otros dos lugares donde faltaba.

Probado en rojo primero: con el idiom anterior, 3 de las 7 pruebas nuevas caen, y son las correctas.

---

## El registro: 34 entradas

`docs/PENDING.md` **no existía**, aunque el método lo nombra en el contrato del peldaño 5, en el camino evolutivo-correctivo, en las dos partes del manual y en la tabla de la escalera. Ahora existe, y el peldaño 5 queda ejercido sobre el propio método.

| grupo | lo que la persona vino a hacer | abiertos | bloqueantes |
|---|---|---:|---:|
| **G-API** | encontrar la definición y consumirla con confianza | 13 | 7 |
| **G-ALCANCE** | llegar al material publicado | 3 | 1 |
| **G-IDIOMA** | leer el método en su idioma | 13 | 4 |
| **G-PUBLICACION** | que lo servido sea lo último | 1 | 1 |
| **G-ECOSISTEMA** | entender qué es cada cosa | 1 | 1 |

Cada entrada trae lo que el peldaño 5 pide **y** lo que la auditoría pidió: la evidencia del auditor pegada tal cual, **mi reproducción de hoy con su salida**, los perfiles afectados con un criterio de aceptación por perfil, la severidad, quién decide, en qué repositorio se arregla y de qué otro pendiente depende.

**Tres ya cerradas con evidencia:** el guardián, cuál es el árbol del portal, y el nivel de datos sin herramientas.

---

## Tus seis decisiones, anotadas en su entrada

- Dirección versionada inmutable: **sí, sin purga nunca**.
- Firma criptográfica: **diferida**, escrita honesta en el archivo, con su pendiente creado.
- Las dos claves fuera de la huella: **cubrir las dos**.
- Catálogo de textos por identificador: **sí, en diez idiomas**.
- Corpus: **diez idiomas** (árabe e hindi). Es la única donde mi recomendación escrita era la otra, y queda dicho en la entrada con el costo permanente a la vista: **cada cambio futuro del método cuesta un 25% más, para siempre**.
- El índice: **sin versión ni huella propias**, y diciéndolo en su propio texto.

---

## El orden que el registro deja fijado, y por qué

1. **La publicación atrasada.** Es precondición de *todo* el trabajo de portada: seis entradas se apoyan en ella. Hoy la página servida dice **"tres tramos"** sin JavaScript y **"cuatro tramos"** con JavaScript: se contradice sola, y los rastreadores de inteligencia artificial —a los que el sitio invita por nombre— leen la primera. Probablemente es por eso que un asistente ajeno leyó mal el método.
2. **La configuración que se borra sola.** El trabajo de publicación vacía los dos directorios antes de llenarlos, así que lo que se configure adentro se evapora en la publicación siguiente. Es precondición de poder abrir la API a las herramientas de navegador.
3. **El índice de la API.** Es la raíz: siete entradas se apoyan en él.

---

## Una corrección mía que quedó escrita en el registro

Te dije que la auditoría había contado mal los evaluadores: veintinueve donde había treinta y siete. **El auditor tenía razón.** Son 29 en los veinticuatro peldaños; 37 es la suma con las ocho estaciones, que es otra cosa. Lo usé para caracterizar su rigor y no correspondía, así que está anotado en la entrada que corresponde.

---

## La tensión de método, dicha para que quede

Esto se trabaja con la normalización abierta y **en rojo**, y la normalización prohíbe tocar el sistema. Es un evolutivo-correctivo deliberado por encima del tramo, por decisión tuya. N0 no avanza mientras tanto, y está bien: lo que no se puede es no haberlo dicho.
