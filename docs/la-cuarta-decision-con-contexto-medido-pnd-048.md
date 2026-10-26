# La cuarta decisión, con el contexto medido

**La forma de la comprobación que impide que el Anexo H vuelva a desaparecer (`PND-048`).**
Medido el 2026-10-26 sobre el árbol de hoy, con el defecto de `PND-039` puesto.

Lo que te propuse la vez pasada —**(b) «la ficha Y el contrato lo citan»**— fijó la **fuerza** de la
comprobación, y eso sigue en pie. Lo que no fijó es la **forma**, y hay tres cosas que (b) no dice.
Cada una cambia lo que la prueba atrapa, y dos de las tres cambian lo que cuesta mantenerla
para siempre. Las medí.

---

## Primero: la lista de peldaños no se escribe a mano, sale del dato

| peldaño | evaluador del Anexo H que declara | exigible |
|---|---|---|
| 5 | `pendings_profiles` | `required: true` |
| 8 | `profile_matrix` | `required: true` |
| 9 | `heuristics` | `required: true` |
| 10 | `manual_cases_per_profile` | `required: true` |
| 12 | `heuristics` | `required: true` |

Los cuatro nombres salen de `gates/evaluators.json` (son los cuatro que entraron con
`since_schema: 2` y declaran `D-044` a `D-048`). Ninguna de las ocho estaciones `N0..N7` declara
hoy un evaluador del anexo: **0 de 8**. Eso importa más abajo.

---

## Dimensión 1 — En qué se ancla la cita: la palabra o el enlace

Acá está el refinamiento que no tenía la vez pasada, y es el que de verdad decide. «Citar el
anexo» se puede medir de tres maneras, y **las tres dan números distintos sobre el mismo árbol**:

| cómo se mide la cita | fichas (5 × 8 idiomas) | contratos (5 × 8 idiomas) |
|---|---:|---:|
| la palabra en el idioma de cada versión (`Anexo H`, `Annex H`, `Anhang H`, `付録 H`, `附录 H`…) | **0 de 40** | **40 de 40** |
| el token inglés `Annex H` | **0 de 40** | **40 de 40** |
| el enlace al archivo, `ANEXO_HEURISTICAS.md` | **0 de 40** | **16 de 40** (sólo los peldaños 5 y 9) |

La fila del medio explica la de arriba y es la que hay que leer dos veces: los contratos dan
**40 de 40 en los ocho idiomas, idénticos**, porque la cita vive dentro del **prompt en inglés**, y
`build/prompts.mjs` exige que ese prompt sea la misma pieza byte a byte en las ocho versiones. O
sea: la rama «el contrato lo cita» no está verde por casualidad ni por idioma, está verde **por
construcción**, y lo va a seguir estando.

Las tres anclas candidatas, con su costo real:

| ancla | qué cuesta | qué deja |
|---|---|---|
| **(a) la palabra de cada idioma** | una tabla de ocho patrones dentro de la prueba, a mantener para siempre. Una entrada que falte o que esté mal escrita da **verde en silencio** en ese idioma | exactamente el modo de fallar que estamos cerrando, servido de nuevo |
| **(b) el token inglés `Annex H`** | cero vocabulario: funciona en los ocho porque el prompt es inglés en todas las versiones | sirve para el **contrato**. En la **ficha** no, porque ahí la prosa está traducida y obligaría a meter una palabra inglesa en el texto que lee un lector japonés |
| **(c) el enlace `ANEXO_HEURISTICAS.md`** | cero vocabulario: los nombres de archivo no se traducen | sirve para la **ficha**, es **falsable hoy** (0 de 40) y además **le sirve al lector**: `build/md2html.mjs` convierte un enlace relativo `.md` en `.html`, el archivo existe en los ocho idiomas y la portada ya lo enlaza desde que cerró `PND-015` |

**Recomiendo la mezcla, y no es un compromiso tibio: es que las dos piezas son distintas.** En la
**ficha**, el enlace (c): es prosa para una persona, y un enlace es lo único que además de pasar la
compuerta la lleva al anexo en un clic. En el **contrato**, el token inglés (b): la cita ya vive
ahí, cuesta **cero ediciones** y lo que agrega es un **candado** —que nadie la saque en silencio
de las ocho versiones a la vez—.

**Y hay una cosa de ingeniería que conviene saber, porque hace la prueba barata y a prueba de
traducciones:** la prueba no necesita saber cómo se dice «Peldaño» en ocho idiomas. La ficha del
peldaño *N* se encuentra por la línea que cita su contrato —`peldanos/peldano-NN-…`—, que está
**byte a byte igual en los ocho** (verificado en inglés, alemán, japonés y chino). Y se ancla en el
**número**, no en el nombre del archivo, porque de los veinticuatro identificadores del dato hay
**uno que no deriva** a su contrato (el del peldaño 21). Cero vocabulario, cero tabla que se
desactualice.

---

## Dimensión 2 — En cuántos idiomas se exige

| | qué cuesta | qué deja |
|---|---|---|
| **sólo el castellano** | 5 citas | el lector del castellano se entera; los otros siete corpus pueden quedar sin la cita y la compuerta lo acepta |
| **los ocho** | 40 citas, y **cada ancla nueva que entre al dato cuesta ocho ediciones** | la compuerta exige lo que `D-013` ya manda: un cambio en el castellano se replica en las siete en el mismo commit |

**Recomiendo los ocho**, y el argumento no es de principio, es medido: **la deriva ya pasó, y en la
dirección que nadie espera**. Los siete README traducidos **sí** listan el anexo en su tabla de «qué
hay acá»; el README castellano, que es la fuente de verdad, **no lo lista**. Siete de ocho. Una
compuerta que mire sólo el castellano habría dado verde en los siete lugares donde está bien y rojo
en el único que falta — o, peor, al revés.

El costo recurrente es real y es el único argumento honesto a favor de la opción corta: de acá en
adelante, meter un evaluador del anexo en un peldaño nuevo cuesta ocho ediciones del documento
principal. Es el precio de que la prosa no pueda atrasarse respecto del dato.

---

## Dimensión 3 — En qué dirección se lee

Lo que pediste es una dirección: **del dato a la prosa** (un peldaño con evaluador del anexo tiene
que citarlo). La otra dirección cuesta unas seis líneas y **cero ediciones hoy**:

> **de la prosa al dato**: una ficha que enlaza el anexo para un peldaño que **no** tiene evaluador
> del anexo, es rojo.

Eso atrapa lo contrario, que es igual de caro y nadie mira: la prosa prometiéndole al lector una
compuerta que el dato no exige. No es una invención mía: el validador ya tiene esa forma
—`E_ANEXO_HUERFANA` dice «el anexo declara la regla y la compuerta no la tiene»— y es literalmente
el peldaño 11 leído en los dos sentidos. **Recomiendo las dos direcciones.**

---

## Dónde vive la comprobación (acá el costo está en la cadena, no en la prueba)

| casa | qué cuesta | qué deja |
|---|---|---|
| **(a) una prueba en `tests/`** | **cero líneas de la cadena**: el paso «Pruebas» ya corre `node --test` y ya exige `# fail 0` **y** `# pass` mayor que cero | hermana exacta: `tests/pending_resumen.test.mjs`, que es la misma especie —un documento del método que no puede contradecir su propio dato— |
| **(b) dentro de `build/gates_validate.mjs`, como `E_ANEXO_NO_CITADO`** | el validador hoy lee **2** archivos de prosa; pasaría a leer **18** (el documento principal y el README en los ocho). Y una edición de prosa podría **negarse a publicar el dato**, que es algo que a una herramienta consumidora no le importa | niega la publicación, y queda al lado de los ocho códigos `E_ANEXO_*` que ya hacen esta misma simetría |
| **(c) un programa propio con `--check`** | un paso nuevo de la cadena (~8 líneas) que además tiene que **exigir la línea que el programa imprime** (`D-060`), más su propia prueba del guardián de línea de comandos (`PND-001`) | se corre a mano contra otro árbol, como `portal_orphans.mjs`. Acá no hay otro árbol: todo vive en este repositorio |

**Recomiendo (a).** Misma fuerza de compuerta que las otras dos —`main` está protegida y el trabajo
de publicación depende de que «verificar» quede verde—, al costo más bajo, y en el barrio donde el
proyecto ya puso las guardas de este tipo.

**Y una cosa que propongo agregar, que es doctrina del propio proyecto aplicada a nuestra propia
guarda:** si algún día una estación `N0..N7` declara un evaluador del anexo, la prueba tiene que
ponerse **roja diciendo «esta guarda no sabe revisar estaciones»**, no verde. Es exactamente la
semántica que `gates/evaluators.json` declara para `required: true` —«una instalación que no lo sabe
medir no reporta verde: reporta que no lo mide»— y es un agujero que **se anuncia solo** en vez de
esperar a que alguien lo descubra. Hoy no cambia nada: 0 de 8 estaciones.

---

## Lo que propuse para `PND-046` y **no sobrevive la medición**

La vez pasada propuse que esta misma prueba cubriera la regla de `PND-046` —ninguna ficha cita un
caso concreto sin su `[Ref. N]`—. Lo medí antes de escribirlo y **la forma fuerte no es
mecánicamente decidible**. Peor: la forma portable **no atrapa el defecto que vos encontraste**.

- **Por viñeta** («cada “fallo que evita” lleva al menos un `[Ref. N]`»): **22 de 24 en verde**,
  rojo en los peldaños 0 y 10. **El peldaño 20 pasa** —el que vos encontraste—, porque su viñeta
  lleva dos referencias y la cláusula sin respaldo es la primera de tres. Una guarda que da verde
  sobre el defecto que la motivó sería la **sexta guarda dormida**, y la primera que nacería
  dormida a propósito.
- **Por cláusula**: 50 cláusulas en las veinticuatro fichas, **42 con referencia y 8 sin**. Pero
  **5 de esas 8 son categorías de problema, no casos** («el agente que “ayuda” expandiendo el
  alcance», «el que deja deuda para después»), y no deben llevar referencia. **62% de rojos
  falsos.** Una guarda con esa tasa no enseña a escribir la referencia: enseña a inventarla, que
  es peor que no tenerla.
- **Y no viaja**: la estructura de cláusulas **no sobrevive la traducción**. El japonés no separa
  con punto y coma (las veinticuatro fichas colapsan a una cláusula) y el chino parte la del
  peldaño 10 en tres. Así que «peldaño + número de cláusula» **no es una llave independiente del
  idioma**, y una regla por cláusula sólo puede correr sobre el castellano.

Lo que **sí** es decidible, y lo tomo porque sale gratis:

1. **El conjunto de referencias de cada ficha es idéntico en los ocho idiomas: 24 de 24 en verde
   hoy.** Candado libre: atrapa la traducción que se come un `[Ref. N]`, que es un riesgo real
   justamente porque `D-013` manda replicar en el mismo commit.
2. **Cada «fallo que evita» lleva al menos un `[Ref. N]`, o está registrado como genérico con su
   razón.** El registro de excepción no es una concesión: es la misma forma que el anexo exige
   para un interruptor apagado (`D-045`, `D-046`: apagado sin registro es rojo, no la ausencia de
   la regla). Hoy el registro tendría una entrada —el peldaño 0— más la plantilla de la Parte A,
   que no es una ficha.

Y lo digo claro para que no quede escondido en una tabla: **las dos cláusulas sin respaldo del
peldaño 20 y del peldaño 10 las arregla una persona, no una guarda.** Eso es `PND-046` y la
elección sigue siendo tuya caso por caso, porque depende de si la evidencia existe.

---

## La recomendación, armada

Una prueba, `tests/anexo_citado.test.mjs`, que:

1. saca del dato los cuatro evaluadores del anexo y los peldaños que los declaran (hoy 5);
2. exige **el enlace al anexo en la ficha, en los ocho idiomas** (hoy 0 de 40 → rojo, que es lo que
   corresponde);
3. exige **el token inglés `Annex H` en el contrato, en los ocho** (hoy 40 de 40 → candado);
4. lee **la dirección inversa**: una ficha que enlaza el anexo sin que el dato lo exija es rojo;
5. se pone **roja** si una estación declara un evaluador del anexo, porque no sabe revisar
   estaciones;
6. exige la fila del anexo en **la tabla del README de los ocho** (hoy 7 de 8) y que el documento
   principal lo nombre **al menos una vez fuera de las fichas** (hoy 0 de 8, y es la Parte A de
   `M-01`);
7. se lleva los dos candados de referencias de arriba;
8. trae sus **rojos deliberados**, mutando **una copia temporal del árbol real** y no una ruta fija
   —la lección de `PND-037`, que es de esta semana—.

**Lo que cuesta:** la prueba, unas 200 líneas (sus hermanas son de 204 y 288). **Cero líneas de la
cadena. Cero ediciones de los contratos.** El trabajo de edición es el de `M-01`, que ya decidiste:
40 citas en las fichas, una fila en el README castellano y ocho menciones en la Parte A.

**Lo que *no* cuesta, dicho porque es de las cosas que muerden tarde:** nada de esto toca un
prompt, así que `prompts.json` conserva su huella y `corpus_version` se queda en `2026.10.1`. Si
la cita tuviera que vivir **adentro** del prompt, `D-053` obligaría a subir la versión del corpus y
a anotar la huella nueva.

---

## La pregunta, concreta

Si me decís **«la recomendación completa»**, lo tomo como: enlace en la ficha en los ocho, token
inglés en el contrato en los ocho, las dos direcciones, casa en `tests/`, el agujero de las
estaciones que se anuncia solo, más los dos candados de referencias con su registro de excepción.

Si querés algo más corto, los tres diales son independientes y se pueden girar de a uno: **el
ancla** (enlace / palabra), **los idiomas** (los ocho / sólo el castellano) y **la dirección** (las
dos / sólo del dato a la prosa).
