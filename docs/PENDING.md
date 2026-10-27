# Pendientes del proyecto Urazuke

Este es el registro de pendientes del peldaño 5 aplicado al propio método: una sola cola de
trabajo, con orden y con compuerta, que es la verdad del proyecto. No hay plan por un lado y
tareas por otro; **la lista de pendientes es el plan**, y la especificación detallada vive en cada
pendiente.

**Por qué nace hoy, 24 de octubre de 2026, y no antes.** El método venía pidiéndole este archivo a
todos sus lectores —lo nombran el contrato del peldaño 5, el camino evolutivo-correctivo, las dos
partes del manual-curso y la tabla de la escalera— y no lo tenía. El registro se inaugura con el
trabajo que había: un hallazgo de la normalización, ya cerrado, y los veintidós hallazgos de una
auditoría externa de la publicación. Que el método haya trabajado un año sin su propio registro es,
en sí, el dato que más conviene no olvidar.

**La compuerta que está abierta ahora mismo.** La auditoría externa pidió que el backlog se
construyera **antes** de tocar una línea y que el dueño lo apruebe. Ese es el estado: de los
hallazgos U-01 a U-22 **no se tocó ninguno** salvo los que figuran cerrados con su evidencia
medida. El dueño aprobó este archivo el 2026-10-24 y autorizó, en ese orden, el nivel de datos sin
herramientas (PND-023), la publicación atrasada del portal (PND-018 y PND-020, que son el mismo
evento) y, con un "adelante con lo que sigue", el orden que este registro fijó: la configuración
del servidor que el espejo borraba sola (PND-013) y el índice de la interfaz de datos (PND-002,
con PND-006 y PND-007, que se cierran con él) y, con otro "adelante con lo que sigue", el grupo del
alcance (PND-014, PND-015 y PND-003, más PND-017, que había que corregir antes de hornear). El
resto de la lista sigue esperando su turno; nada se arregla fuera del orden acordado.

**Dónde vive, y por qué acá.** La auditoría pidió un archivo satélite,
`docs/PENDIENTES_AUDITORIA_2026-10.md`. El dueño decidió lo contrario (2026-10-24): va **en el
registro por defecto del repositorio**, que es el que el método manda. Un archivo aparte habría
hecho nacer el registro canónico como apéndice de una auditoría ajena.

**Sobre la numeración.** `PND-nnn` es la numeración **de este registro**, que es la del método.
La herramienta que asiste el trabajo lleva su propia cola con su propia numeración; cuando una
entrada de acá tiene su espejo allá, se cita como `herramienta: PND-nnn`. Son dos registros
distintos y los números **no se corresponden**.

**Un aviso que no es de este proyecto y queda escrito para que no se pierda.** El 2026-10-24,
buscando el árbol del portal, apareció en esta máquina una copia vieja de otro repositorio con un
acceso personal de GitHub guardado en texto plano en la configuración del control de versiones. Se
avisó al dueño el mismo día para que lo revoque. No es trabajo del método y por eso no tiene
entrada acá, pero hasta que esté revocado sigue abierto.

---

## Cómo se lee una entrada

Cada entrada lleva, además de los campos que pide el peldaño 5, los que pidió la auditoría:

- **Qué está mal** — en una frase.
- **Evidencia del auditor** — pegada tal cual, sin reescribir.
- **Mi reproducción** — la comprobación corrida de nuevo, con fecha y con la salida propia. Cuando
  el auditor midió mal, se dice; cuando algo ya no se reproduce, se cierra como *ya no aplica* con
  la prueba.
- **Grupo de convergencia** — el de abajo (Anexo H, B1).
- **Perfiles afectados** y **criterio de aceptación por perfil** — en la forma "dado el perfil X,
  esta persona puede hacer Y".
- **Severidad** — *bloquea* / *avisa* / *registra*.
- **Quién decide** — el dueño cuando la decisión es suya; si no, el trabajo se hace y se reporta.
- **Repositorio** — el del método, el del portal, o los dos.
- **Decisión del dueño** — cuando ya la tomó, con su fecha y sus palabras.
- **Depende de** — qué otro pendiente tiene que estar antes.
- **Estado** — abierto / en curso / cerrado.

## Los grupos de convergencia (Anexo H, B1)

La regla madre de B1 es que una funcionalidad se agrupa por **lo que la persona vino a hacer**. El
método tiene siete cosas que alguien viene a hacer: cinco en su interfaz pública, una en el
contenido mismo del método y una en su registro de versiones.

| grupo | lo que la persona vino a hacer |
|---|---|
| **G-API** | encontrar la definición de las compuertas y consumirla con confianza |
| **G-ALCANCE** | llegar al material que el método publica |
| **G-IDIOMA** | leer el método en su idioma |
| **G-PUBLICACION** | que lo que está servido sea lo último que el método produjo |
| **G-ECOSISTEMA** | entender qué es cada cosa: el método, el protocolo, la herramienta |
| **G-METODO** | aplicar el método completo, sin que falte una parte que el método exige |
| **G-TRAZABILIDAD** | reconstruir, desde el registro, qué cambió, por qué y con qué pendiente |

*Nota de lectura:* la auditoría dijo "hay cuatro grupos" y después presentó **cinco**. Se adopta
el cinco: el quinto grupo es real y no es un sobrante de los otros cuatro.

*El sexto nació el 2026-10-26*, con la retrospectiva del peldaño 23 sobre la validación del libro
(`PND-039` a `PND-048`). Los cinco primeros son de la **interfaz publicada** —cómo se llega al
material, si lo servido es lo último, si el dato se puede consumir, si se lee en el idioma de cada
uno, si se entiende qué es cada cosa—. El sexto es del **contenido del método**: si lo que el
lector recibe está completo, es consistente y se puede aplicar. La fundamentación larga está al
abrir su sección.

*Y el séptimo nació el mismo 2026-10-26*, al final del día y de un desvío propio (`PND-050`): un
commit llevó ocho documentos que su mensaje no nombra. Lo que alguien viene a hacer ahí no es
consumir la API ni leer el método: es **reconstruir qué cambió y por qué**, que es lo único que
hace auditable todo lo demás. Ninguno de los seis anteriores lo cubre —los cinco primeros son de la
interfaz publicada y el sexto es del contenido del método—, y meterlo en G-METODO habría dejado la
definición de ese grupo diciendo algo falso, con la lista cerrada de la prueba dando el visto bueno.
El precio está dicho en el propio test: abrir un grupo toca tres lugares a la vez (esta tabla, la
constante de `tests/pending_resumen.test.mjs` y la tabla del resumen).

## Los perfiles (Anexo H, B2)

| perfil | quién es | por dónde entra |
|---|---|---|
| **P1** | herramienta consumidora que corre en un servidor | pide los archivos de la API por red |
| **P2** | herramienta consumidora que corre en un navegador | igual, pero sujeta a la política de origen |
| **P3** | lector humano que llega por la portada | `https://yujin.app/urazuke/` |
| **P4** | rastreador que no ejecuta JavaScript | la portada, el mapa del sitio, el archivo de permisos |
| **P5** | auditor que quiere probar que su copia es la buena | la API, más el registro de versiones del repositorio |
| **P6** | lector humano que entra por el documento principal | `ESCALERA_METODOLOGICA.md` y su HTML |
| **P7** | lector que adapta el método a otro formato | el corpus entero, para producir otra obra |
| **P8** | dueño de proyecto que aplica el método | las fichas, los contratos y las compuertas |

*P6, P7 y P8 nacieron el 2026-10-26*, con el grupo G-METODO. Los cinco primeros entran por la
**interfaz publicada**; estos tres entran por el **contenido**, y por eso ninguno de los cinco los
cubría: P3 es «lector humano que llega por la portada», y el que no encuentra el Anexo H llega por
el documento principal, que es otra puerta y otro recorrido. P7 es, literalmente, el caso que
originó esas entradas: alguien que leyó el corpus para producir otra obra. Y P1 se reusa tal cual
para la herramienta que compila las compuertas, porque es la misma que pide los archivos por red.

## El árbol semántico: no existe todavía

El peldaño 5 pide que cada pendiente cuelgue de un nodo del árbol semántico del peldaño 2.
Medido el 2026-10-24: **no existe `docs/SEMANTIC_TREE.md`**, ni `PROJECT.md`, ni `docs/STATUS.md`,
ni `docs/INITIAL_SURVEY.md`, ni `docs/PROFILE_MATRIX.md`. Así que los nodos de abajo quedan
**propuestos**, marcados `[nodo propuesto]`, y se confirman cuando el árbol se escriba —que es
parte del tramo de normalización en curso, no de este backlog.

| nodo propuesto | qué contiene |
|---|---|
| `interfaz-publica/api` | los archivos que una herramienta pide por red, su índice y su identidad |
| `interfaz-publica/portada` | la portada, el mapa del sitio, el i18n de la interfaz |
| `corpus/idiomas` | el conjunto de idiomas del corpus y su declaración |
| `corpus/anexo-h` | el anexo de heurísticas y su extracción al nivel de datos |
| `cadena/verificacion` | las verificaciones del flujo y sus guardianes |
| `cadena/publicacion` | el trabajo que publica y lo que verifica después |
| `identidad/ecosistema` | la distinción entre método, protocolo y herramienta |
| `corpus/escalera` | el documento principal, sus partes y las veinticuatro fichas |
| `corpus/contratos` | los contratos de peldaño y de estación |
| `corpus/referencias` | los casos propios reales y la tabla de fallos |
| `corpus/hoja-del-dueno` | lo que un dueño se lleva a una reunión con un proveedor |
| `proyecto/instrucciones` | `CLAUDE.md`, que un agente lee como instrucción |
| `proyecto/registro` | el registro de versiones y el de pendientes: qué cambió y por qué |

---

# Cerrados

## PND-001 — El guardián de línea de comandos era de Windows y dos pasos de la cadena corrían en vacío

- **Nodo:** `cadena/verificacion` [nodo propuesto]
- **Origen:** hallazgo del peldaño N0 (elegibilidad del sistema existente), prerrequisito 5.
  No es de la auditoría externa. **Herramienta: PND-037.**
- **Grupo:** G-PUBLICACION · **Severidad:** bloquea · **Repositorio:** método
- **Estado: CERRADO** el 2026-10-24.

**Qué estaba mal.** Los tres programas con modo de línea de comandos detectaban esa invocación
pegando `file:///` adelante de `argv[1]` y comparándolo contra `import.meta.url`; en POSIX
`argv[1]` ya empieza con una barra, así que la comparación nunca daba y el programa salía con
éxito sin hacer nada.

**Qué costaba.** En la corrida 39956832685 (`main`, **verde**, `ubuntu-latest`) los pasos *Validar
las compuertas contra su esquema y contra el Anexo H* y *Exigir que `docs/COMPUERTAS.md` coincida
con los datos* imprimieron **cero líneas**. Dos de las cinco verificaciones de la cadena eran
ceremonia: se podía editar a mano el documento generado y la cadena seguía en verde, y la
validación contra el esquema sólo ocurría de rebote dentro de `build/build.mjs`.

**Criterio de aceptación por perfil.**

- *P5 (auditor):* dado el perfil auditor, esta persona puede leer el registro de una corrida y ver
  que cada verificación de la cadena imprimió lo que comprobó.

**Evidencia de cierre.** Probado en rojo primero contra el idiom anterior: 3 de 7 pruebas en rojo,
y son las que tienen que caer (la de POSIX, la de los caracteres escapados y la que rechaza el
idiom en `build/`). En verde con el arreglo, árbol limpio: `node --test` = **165 pruebas, 0
fallos** (eran 158). Los cinco pasos de la cadena, cada uno diciendo su línea. Los dos pasos del
flujo exigen además la línea que el programa imprime: un paso que no imprimió nada no corrió.

**Commit / pull request:** pull request **#5**, fusionado en `main` el 2026-10-24 como `0c7d79a`.
Rebasado sobre la fusion de PND-023 antes de entrar: la cadena, con los dos cambios juntos,
imprimio sus cinco lineas y dio **169 pruebas, 0 fallos** (corrida 40115555290, `ubuntu-latest`).

**Decisión tomada en el camino:** el guardián se centraliza en `esLineaDeComandos()` de
`build/gates_lib.mjs` y recibe la ruta por argumento, para que la prueba pueda ejercitar la
plataforma ajena. Un verde en Windows no vuelve a tapar un no-op en Linux.

---

## PND-021 — Cuál es el árbol del portal realmente desplegado *(era U-20)*

- **Nodo:** `cadena/publicacion` [nodo propuesto]
- **Grupo:** G-PUBLICACION · **Severidad:** bloquea · **Repositorio:** los dos
- **Estado: CERRADO** el 2026-10-24 — resuelto con evidencia. Era precondición de todo el trabajo
  en el portal.

**Qué pedía.** La auditoría no pudo resolver desde afuera si el árbol desplegado era
`pkuschnirof/rpaforce` o `pkuschnirof/rpaforce-crm`, y pidió evidencia antes de escribir ahí.

**Evidencia del auditor.**

> el árbol local que tiene la portada apunta a un remoto llamado rpaforce-crm, y el workflow del
> método publica en pkuschnirof/rpaforce, en la ruta yujin.app/urazuke/. Averiguá cuál es el árbol
> realmente desplegado y confirmámelo con evidencia antes de escribir ahí. No empujes a ciegas.

**Mi reproducción (2026-10-24).** El árbol desplegado es **`pkuschnirof/rpaforce`**, y la portada
del método vive en `yujin.app/urazuke/` de ese repositorio. La página de producción es
byte-idéntica al `index.html` commiteado ahí salvo una línea que inyecta el hosting.
`pkuschnirof/rpaforce-crm` no contiene `yujin.app/urazuke`. La confusión del auditor tiene una
causa concreta y vale anotarla: la portada vive en un repositorio **anidado dentro de otro**, y el
remoto que se lee desde la carpeta padre no es el del hijo.

**Criterio de aceptación por perfil.**

- *P3, P4:* dado cualquiera de los dos perfiles, lo que esa persona lee en producción sale del
  árbol que este registro nombra, y de ningún otro.

---

## PND-023 — El nivel de datos nombraba una herramienta *(era U-22, más lo que la auditoría no vio)*

- **Nodo:** `identidad/ecosistema` [nodo propuesto]
- **Grupo:** G-ECOSISTEMA · **Severidad:** bloquea · **Repositorio:** método
- **Decisión del dueño (2026-10-24):** *"Esto todavía NO lo está viendo nadie. Podemos tocarlo
  fuera de proceso y publicar sin referencias a herramientas ni protocolos propietarios ni
  públicos como prioridad 1 y antes que nada. Método es método."* Quedó escrita como **D-055**.
- **Estado: CERRADO** el 2026-10-24.

**Qué estaba mal, y era más grande de lo que la auditoría vio.** La auditoría dedicó su hallazgo
a una ruta citada en una nota y propuso, como *"la prueba más fuerte que tenés"* contra la objeción
de que el ecosistema es la narrativa de un producto, que en los datos publicados no hay ni una
mención de las herramientas. La primera mitad era cierta —cero menciones del protocolo— y la
segunda era **falsa**: el peldaño de dimensionamiento publicaba, como pregunta de verificación del
dueño, *"¿El registro de dimensionamiento de Forge está admisible?"*. Un artefacto de una
herramienta, exigido por una compuerta, en el nivel de datos. Y estaba en la **base congelada**,
la parte que por regla no se toca.

**Mi reproducción (2026-10-24), sobre lo que produccion sirve hoy.**

```
menciones de 'forge' en gates.json: 3   |   menciones de 'nac3': 0
```

Buscando con una lista cerrada en vez de con intuición aparecieron **cinco** referencias, no
cuatro: el nombre de la herramienta, uno de sus comandos, un identificador de compuerta `G<n>`, y
la ruta del archivo que lo llevaba en el nombre.

**Criterio de aceptación por perfil.**

- *P1, P2 (herramientas consumidoras):* dada una herramienta consumidora cualquiera, esa
  herramienta puede leer la definición completa sin encontrar adentro el nombre de otra
  herramienta, que se leería como una dependencia que no existe.
- *P5 (auditor):* dado el perfil auditor, esta persona puede recorrer el payload de las fuentes,
  los dos archivos publicados y el documento generado con una lista cerrada de patrones y no
  encontrar ninguno.

**Evidencia de cierre.** `tests/gates_neutralidad.test.mjs` recorre las tres superficies contra
una lista cerrada y verifica además que cada patrón detecte su propio caso. Probada **en rojo**
contra lo publicado hoy: falla 3 de 4 y nombra los tres caminos por los que se colaba. En verde
con el arreglo: suite entera en **162 pruebas, 0 fallos**, también en la integración continua
sobre Linux. Dos de las fuentes se editaron **en sincronía con el congelado** para que la prueba de
diferencia cero siga siendo demostrable; es la primera excepción autorizada a la regla de no tocar
la base, acotada a dos textos, y está escrita como tal. La versión declarada subió a `2026.10.3`
con su huella anotada en el registro, sin tocar las anteriores.

**Pull request:** **#4**, fusionado en `main` el 2026-10-24 como `fd8561c`.

**Lo que no se tocó, a propósito, y está dicho en la decisión:** la prosa del método sigue
comparando herramientas por su nombre (la Parte E, los manuales de práctica), porque ahí nombrarlas
es información para el lector y no una dependencia del dato. Neutralizar eso también es otra
decisión, y es grande: más de sesenta archivos en ocho idiomas.

---

# Abiertos — G-API: encontrar la definición y consumirla con confianza

## PND-002 — La API no tiene índice: no hay cómo descubrirla *(era U-01)*

- **Nodo:** `interfaz-publica/api` [nodo propuesto]
- **Grupo:** G-API · **Severidad:** bloquea · **Quién decide:** se hace y se reporta
- **Repositorio:** método (el generador) · **Estado: CERRADO** el 2026-10-24.

**Qué está mal.** Los dos archivos de la API se sirven bien y no hay ningún recurso que los liste,
así que un consumidor que no leyó el repositorio no tiene por dónde empezar.

**Evidencia del auditor.**

> ```
> GET https://yujin.app/urazuke/api/            -> 403
> GET https://yujin.app/urazuke/api/index.json  -> 404
> GET https://yujin.app/urazuke/api/gates.json  -> 200, 100167 bytes
> GET https://yujin.app/urazuke/api/prompts.json-> 200,  64161 bytes
> ```

**Mi reproducción (2026-10-24 16:59 UTC).** Idéntica, byte por byte en los tamaños:

```
https://yujin.app/urazuke/api/                 403 13
https://yujin.app/urazuke/api/index.json       404 13
https://yujin.app/urazuke/api/gates.json       200 100167
https://yujin.app/urazuke/api/prompts.json     200 64161
```

**Especificación.** Escribir `build/index_api.mjs`, que **genera** `docs/html/api/index.json`. Es
un generado como los otros dos: no se edita a mano nunca. Declara, por recurso: nombre, URL
canónica absoluta, tipo de medio, tamaño, el **nombre** del campo de versión que usa
(`catalog_version` para las compuertas, `corpus_version` para los prompts) con su valor, y el
`content_hash` que el recurso declara, con algoritmo y forma canónica, para que un consumidor sepa
qué va a recalcular antes de bajar nada.

**Datos que entran:** `docs/html/api/gates.json` y `docs/html/api/prompts.json` ya generados.
**Datos que salen:** `docs/html/api/index.json`.
**Casos borde:** un recurso listado que no existe en disco; un recurso en `docs/html/api/` que el
índice no lista; el índice citando una huella que ya no es la del recurso.

**Criterio de aceptación por perfil.**

- *P1 (servidor):* dado el perfil herramienta en servidor, esta persona pide una sola URL y obtiene
  la lista completa de recursos con su versión y su huella, y **no** necesita leer el repositorio
  para saber qué existe.
- *P5 (auditor):* dado el perfil auditor, esta persona sabe, antes de bajar nada, qué huella va a
  tener que recalcular y sobre qué forma canónica.

**Cómo se verifica.**

```
curl -s https://yujin.app/urazuke/api/index.json | head      -> el índice
node build/api_check.mjs                                     -> verde, nombrando los TRES archivos
node build/api_check.mjs --huella                             -> verde, y dice que el índice cita las huellas vivas
```

**Trabajo que arrastra, y no es opcional.**

- `build/api_check.mjs` cubre el archivo nuevo en sus **dos** modos. En el normal: regenerar el
  índice y exigir que coincida con lo commiteado, con `generated_at` fuera de la comparación. En
  `--huella`: exigir que las versiones y las huellas que el índice **cita** sean las que los dos
  recursos declaran de verdad. Un índice que cita una huella vieja es peor que no tener índice,
  porque le miente al consumidor con cara de dato verificado.
- `build/portal_verify.mjs` pregunta también por el índice. **No** se mete a la fuerza en
  `clasificar()`: esa función se apoya en `content_hash.value` y el índice no lo tiene. Va una
  comprobación aparte que conserve el vocabulario de tres estados —*coincide*, *otra_huella*,
  *ilegible*— y el criterio de salida de hoy, donde el rojo gana sobre la demora.
- Pruebas con `node --test` a secas, sin patrón entre comillas. Rojos deliberados: índice que cita
  una huella que ya no es la del recurso; recurso listado que no existe en disco; recurso en
  `docs/html/api/` que el índice no lista; índice con un carácter fuera de ASCII o en castellano
  (viola D-051).
- El índice va **en inglés y en ASCII puro**: es nivel de datos, aplica D-051 sin excepción.
- `docs/html/api/index.json` entra a la lista del paso *Sanidad de lo generado* del flujo. El paso
  de copia no se toca: ya copia `docs/html/api/.` completo.
- La decisión se registra en `docs/DECISIONES.md` y `CLAUDE.md` dice que la API publica **tres**
  archivos, que el índice es generado, y que no lleva versión ni huella propia, con el por qué.

**Depende de:** nada. Es el primero de este grupo: casi todo lo demás del grupo se apoya en él.

**Avance (2026-10-24, decisión D-056).** Construido: `build/index_api.mjs` genera
`docs/html/api/index.json` con los dos recursos, su dirección canónica absoluta, su tipo de medio,
su tamaño, el nombre y el valor de su campo de versión, la huella que declaran con algoritmo y forma
canónica, y el puntero a su registro de versiones. No lleva versión ni huella propias y lo dice en
`identity` (la confirmación que la auditoría pidió). `build/api_check.mjs` lo cubre en sus dos
modos, `build/portal_verify.mjs` lo pregunta a producción con el mismo vocabulario de tres estados
y el paso *Sanidad de lo generado* del flujo lo nombra. Veintiuna pruebas nuevas, nueve de ellas
rojos deliberados. Recibo de los rojos de punta a punta, corrido hoy:

```
ROJO 1 (el indice cita una huella vieja):  api_check --huella -> exit 1, [E_INDICE_HUELLA]
ROJO 2 (no hay indice):                    api_check --huella -> exit 1, "falta docs/html/api/index.json"
ROJO 3 (un recurso publicado sin listar):  index_api -> exit 1, [E_INDICE_NO_LISTA], no publica nada
verde restaurado:                          api_check --huella -> exit 0, nombrando los TRES archivos
```

Falta, y es lo único: que la fusión lo publique y que producción lo sirva. Medido hoy antes de
fusionar: `https://yujin.app/urazuke/api/index.json` sigue en 404, y los dos recursos en
`coincide`. **Se cierra con esa medición, no antes.**


**CIERRE (2026-10-24), medido contra producción.** Publicado en `e286902` (este repositorio) y
espejado por la publicación automática en `pkuschnirof/rpaforce` `f89d273`. Medición propia después
de que produccion lo sirviera:

```
GET https://yujin.app/urazuke/api/index.json   200, 4818 bytes
   recursos: gates.json 2026.10.3 100112B | prompts.json 2026.10.1 64161B
   canonica: https://yujin.app/urazuke/api/
   registro: https://github.com/pkuschnirof/urazuke/blob/main/gates/catalog.json
node build/api_check.mjs                       verde, nombrando los TRES archivos
node build/api_check.mjs --huella              verde: el indice cita las huellas vivas
node build/portal_verify.mjs --rondas 1        los tres en "coincide"
node --test                                    192 pruebas, 0 fallos
```

**Criterio por perfil, verificado.** *P1:* una sola dirección devuelve la lista completa con versión
y huella, sin leer el repositorio — comprobado bajando sólo esa dirección. *P5:* antes de bajar nada
se sabe qué se va a recalcular y sobre qué forma canónica (`sha256`, `hex_lower`,
`json_sorted_keys_codepoint_no_whitespace_utf8`) y a qué registro contrastar la versión.

**Un dato del paso de verificación que vale guardar:** produccion contestó 404 en las dos primeras
vueltas y `coincide` en la tercera, un minuto después de empujar. Eso es el despliegue del portal
—otro flujo— y es exactamente la situación que D-054 separó del rojo: antes habría salido con el
mismo texto que una lectura imposible.

**Lo que NO cierra con esto, y es de otra entrada:** `https://yujin.app/urazuke/api/` sigue
contestando 403. El documento del directorio es configuración del servidor y va en PND-013.

---

## PND-003 — La portada no nombra la API *(era U-02)*

- **Nodo:** `interfaz-publica/portada` [nodo propuesto]
- **Grupo:** G-API (el arreglo vive en G-ALCANCE) · **Severidad:** bloquea
- **Quién decide:** se hace y se reporta · **Repositorio:** portal · **Estado: CERRADO** el 2026-10-24.

**Qué está mal.** La portada no menciona la API en ninguna parte, así que un consumidor que llega
por el sitio no se entera de que existe.

**Evidencia del auditor.**

> la única aparición de la cadena "api" en el HTML, local y en producción, es
> fonts.googleapis.com. Ni "gates.json" ni "prompts.json" aparecen. Un consumidor que no leyó
> GitHub no tiene cómo llegar.

**Mi reproducción (2026-10-24), sobre los 65.491 bytes que sirve producción.**

```
gates.json             0
prompts.json           0
urazuke/api            0
'api' aparece en:      fonts.googleapis.com (2 veces, la hoja de estilo de las tipografías)
```

**Criterio de aceptación por perfil.**

- *P1, P2:* dada una herramienta consumidora, esa persona encuentra la dirección de la API
  partiendo únicamente de la portada.
- *P3 (lector humano):* dado el perfil lector, esta persona ve que las compuertas se publican como
  datos y puede ir a verlas, sin tener que saber que existe un repositorio.
- *P4 (rastreador):* dado el perfil rastreador sin JavaScript, el enlace a la API está en el HTML
  servido, no sólo después de ejecutar el conmutador de idioma.

**Cómo se verifica.** `curl -s https://yujin.app/urazuke/ | grep -c "gates.json"` → mayor que 0.

**Depende de:** PND-002 (el índice es lo que conviene enlazar, no los dos archivos sueltos) y
PND-020 (hoy la portada publicada está atrasada: tocarla antes de destrabar eso publica sobre una
versión vieja).

**Cómo se cerró (2026-10-24).** La portada horneada nombra la interfaz de datos en los diez
idiomas, y lo que se enlaza es el **directorio** —que desde PND-013 y PND-035 contesta con el
índice— más los dos recursos por su nombre. Medido sobre los 70.395 bytes que sirve producción
después del commit `63682dd` del portal:

```
gates.json             2
prompts.json           2
urazuke/api/           1   href="api/"
```

y el párrafo, tal como lo lee quien no ejecuta nada:

```
...falta leer el repositorio: la interfaz de datos está en <a href="api/">yujin.app/urazuke/api/</a>.
Su índice lista cada recurso con su dirección canónica, su versión y su huella:
<a href="api/gates.json">gates.json</a> ... <a href="api/prompts.json">prompts.json</a>
```

**Criterio por perfil, verificado.** *P1 y P2:* partiendo sólo de la portada se llega al directorio,
y de ahí al índice, que es lo que dice qué bajar y qué huella recalcular; es la razón por la que
este pendiente esperaba a PND-002 en vez de enlazar los dos archivos sueltos. *P3:* el enlace está
en el bloque que explica que las compuertas se publican como dato, no escondido en el pie. *P4:* el
enlace viaja **horneado** en el HTML servido, y en las nueve portadas por idioma es absoluto, no
relativo:

```
/urazuke/en/   href="/urazuke/api/"  href="/urazuke/api/gates.json"  href="/urazuke/api/prompts.json"
/urazuke/ar/   idem
/urazuke/ja/   idem
```

Esas tres rutas absolutas son, además, un defecto propio cazado en el camino: la primera versión
apuntaba un nivel demasiado abajo desde las páginas por idioma y lo detuvo el verificador del
portal. La lista de rutas que hay que absolutizar quedó en un solo lugar del generador.

---

## PND-004 — Falta CORS: ninguna herramienta de navegador puede leer la API *(era U-03)*

- **Nodo:** `interfaz-publica/api` [nodo propuesto]
- **Grupo:** G-API · **Severidad:** bloquea · **Quién decide:** se hace y se reporta
- **Repositorio:** portal (configuración del servidor) · **Estado: CERRADO** el 2026-10-24.

**Qué está mal.** La API no devuelve ninguna cabecera de acceso entre orígenes, así que el
navegador le niega la lectura a cualquier herramienta que corra ahí, aunque la encuentre.

**Evidencia del auditor.**

> pedí gates.json con un Origin ajeno y no vuelve ninguna cabecera Access-Control-*. Ninguna
> herramienta de navegador puede leer la API aunque la encuentre. Es dato público bajo CC BY-SA:
> no hay nada que la ausencia de CORS proteja.

**Mi reproducción (2026-10-24).** Pedido con `Origin: https://example.com`; cabeceras que vuelven:

```
HTTP/1.1 200 OK
Last-Modified: Fri, 23 Oct 2026 12:23:17 GMT
ETag: "2dc125d-18747-65e810b801740"
Vary: Accept-Encoding
Content-Type: application/json

cabeceras Access-Control-*: 0
```

**Criterio de aceptación por perfil.**

- *P2 (navegador):* dado el perfil herramienta en navegador, esta persona puede pedir los tres
  archivos desde cualquier origen y leer la respuesta.

**Cómo se verifica.**

```
curl -s -D - -o /dev/null -H "Origin: https://example.com" \
     https://yujin.app/urazuke/api/gates.json | grep -i access-control   -> la cabecera
```

**Depende de:** **PND-013** sin excepción. La configuración tiene que vivir un nivel arriba de los
directorios que el espejo vacía, o se borra en la próxima publicación.

**Avance (2026-10-24, decisión D-056).** Escrito en el repositorio del portal: `yujin.app/urazuke/.htaccess` sirve `Access-Control-Allow-Origin: *`, los métodos y las cabeceras permitidas, `Access-Control-Expose-Headers` con `ETag`, `Last-Modified` y `Content-Length`, y `Access-Control-Max-Age`, acotado a los `.json`. Falta que el dueño lo commitee y lo empuje: en ese repositorio `main` no está protegida y un empujón despliega en caliente, así que el commit es suyo. Medición de hoy, **antes**: seis comprobaciones en rojo con `node build/api_headers.mjs`.

**Iteración (2026-10-24, tarde).** El dueño commiteó y empujó (`fd1270e`), el despliegue del portal cerró **en verde** y la cabecera **no apareció**: medido con `node build/api_headers.mjs` después de ese despliegue, `access-control-allow-origin` sigue sin volver en ninguno de los tres recursos. La causa no estaba en el archivo sino en el transporte del portal, y es **PND-035**. Este pendiente no se cierra hasta que las siete comprobaciones queden en verde contra producción.

**CIERRE (2026-10-24), medido contra producción.** El arreglo del transporte (PND-035) se empujó al
portal (`75a2e64`); el despliegue cerró en verde en 21 segundos (corrida `40132538551`) y esta vez
la configuración **llegó** al servidor. Medición propia después de ese despliegue, con
`node build/api_headers.mjs`:

```
OK    index.json: un navegador de otro origen puede leerla -- access-control-allow-origin: *
OK    gates.json: un navegador de otro origen puede leerla -- access-control-allow-origin: *
OK    prompts.json: un navegador de otro origen puede leerla -- access-control-allow-origin: *
```

Las cabeceras completas que vuelven hoy en los tres recursos, pedidas con un `Origin` ajeno:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, HEAD, OPTIONS
Access-Control-Allow-Headers: Accept, Content-Type, If-None-Match, If-Modified-Since
Access-Control-Expose-Headers: ETag, Last-Modified, Content-Length
Access-Control-Max-Age: 86400
```

**Criterio por perfil, verificado.** *P2:* una herramienta que corre en un navegador puede pedir los
tres archivos desde cualquier origen y leer la respuesta. Y puede hacer la petición condicional, que
es lo que `Access-Control-Expose-Headers` agrega y nadie pidió: sin esa cabecera el navegador le
entrega el cuerpo y le esconde el `ETag`, así que la herramienta tendría que bajar el archivo
entero cada vez para saber si cambió.

---

## PND-005 — Falta Cache-Control: nada dice cuánto vale la copia *(era U-04)*

- **Nodo:** `interfaz-publica/api` [nodo propuesto]
- **Grupo:** G-API · **Severidad:** avisa · **Quién decide:** se hace y se reporta
- **Repositorio:** portal (configuración del servidor) · **Estado: CERRADO** el 2026-10-24.

**Qué está mal.** Vuelven `ETag` y `Last-Modified`, que sirven para la petición condicional, y
nada dice cuánto tiempo una copia sigue siendo buena.

**Evidencia del auditor.**

> Vuelven ETag y Last-Modified, que sirven para la petición condicional, pero nada dice cuánto
> vale la copia.

**Mi reproducción (2026-10-24).** Confirmado: en las cinco cabeceras que vuelven no hay
`Cache-Control` (ver la salida de PND-004).

**Criterio de aceptación por perfil.**

- *P1 (servidor):* dado el perfil herramienta en servidor, esa persona sabe, por la respuesta,
  cuánto tiempo puede guardar la copia sin volver a preguntar.
- *P2:* ídem, y el navegador no revalida en cada carga.

**Depende de:** PND-013.

**Avance (2026-10-24, decisión D-056).** Escrito en el mismo archivo: `Cache-Control: public, max-age=300, must-revalidate` para los `.json`. Los cinco minutos son decisión de la publicación y no declaración del método, y están escritos como tal: la copia vieja es **detectable** por la huella, así que una de cinco minutos es inofensiva. Falta el empujón del dueño.

**Iteración (2026-10-24, tarde).** Igual que PND-004: el archivo se empujó, el despliegue cerró en verde y `cache-control` sigue sin volver en ninguno de los tres recursos. Causa común en **PND-035**.

**CIERRE (2026-10-24), medido contra producción.** Mismo despliegue (`75a2e64`, corrida
`40132538551`). `node build/api_headers.mjs`:

```
OK    index.json: dice cuanto vale la copia -- cache-control: public, max-age=300, must-revalidate
OK    gates.json: dice cuanto vale la copia -- cache-control: public, max-age=300, must-revalidate
OK    prompts.json: dice cuanto vale la copia -- cache-control: public, max-age=300, must-revalidate
```

**Criterio por perfil, verificado.** *P1:* la respuesta dice cuánto tiempo vale la copia —cinco
minutos— así que la herramienta sabe cuándo volver a preguntar sin adivinar y sin preguntar
siempre. *P2:* ídem, y el navegador deja de revalidar en cada carga; `must-revalidate` impide que
una copia vencida se sirva sin preguntar, que es el único riesgo real de poner un plazo.

Los cinco minutos siguen siendo decisión de la publicación y no declaración del método, y están
escritos como tal en el archivo: una copia vieja es **detectable** por la huella, así que el costo
de equivocarse en el plazo es una revalidación, no un dato incorrecto que nadie puede notar.

---

## PND-006 — Dos URLs para el mismo recurso, sin canónica declarada *(era U-05)*

- **Nodo:** `interfaz-publica/api` [nodo propuesto]
- **Grupo:** G-API · **Severidad:** avisa · **Quién decide:** se hace y se reporta
- **Repositorio:** método (el índice) · **Estado: CERRADO** el 2026-10-24.

**Qué está mal.** El mismo recurso se sirve en dos direcciones y ninguna de las dos dice cuál es
la canónica.

**Evidencia del auditor.**

> Verificado byte a byte: /urazuke/api/gates.json y /urazuke/docs/api/gates.json son idénticos
> hoy. El espejo las arrastra juntas, así que hoy no duele; el día que una se atrase, duele.
> index.json tiene que declarar cuál es la canónica, y con eso este hallazgo se cierra solo.

**Mi reproducción (2026-10-24), con el matiz que corrige la causa.**

```
3e8c68d7b933faf4f2ec6458585d9a42bd5239e666062d1c79f4df138ab060dd  /urazuke/api/gates.json
3e8c68d7b933faf4f2ec6458585d9a42bd5239e666062d1c79f4df138ab060dd  /urazuke/docs/api/gates.json
```

Idénticas, y la causa no es que falte una declaración: es que el trabajo de publicación **copia lo
mismo a los dos destinos** en la misma corrida, así que no pueden desincronizarse mientras ese
trabajo siga siendo el único que escribe ahí. Lo que falta igual es la declaración, porque el
consumidor no puede saber eso desde afuera.

**Criterio de aceptación por perfil.**

- *P5 (auditor):* dado el perfil auditor, esta persona sabe cuál de las dos direcciones es la
  canónica y puede citarla, sin tener que comparar las dos copias para adivinarlo.

**Depende de:** PND-002. Se cierra con él.

**Avance (2026-10-24, decisión D-056).** El índice declara `canonical_base` = `https://yujin.app/urazuke/api/` y, aparte, `mirrors[0]` con el espejo que arrastra el sitio legible, con la nota de por qué no pueden desincronizarse mientras la publicación sea el único que escribe ahí. Cada recurso lleva su dirección absoluta bajo la canónica, y hay una prueba que lo exige. Se cierra con PND-002, contra producción.


**CIERRE (2026-10-24).** El índice publicado declara `canonical_base` =
`https://yujin.app/urazuke/api/` y, aparte, `mirrors[0].base` = `https://yujin.app/urazuke/docs/api/`
con la nota de por qué no pueden desincronizarse mientras la publicación sea el único que escribe
ahí. Cada recurso lleva su dirección absoluta bajo la canónica, y hay una prueba que lo exige
(`tests/api_indice.test.mjs`). Verificado en producción: la respuesta de
`https://yujin.app/urazuke/api/index.json` trae las dos bases y las dos direcciones absolutas.

**Criterio por perfil, verificado.** *P5:* el auditor sabe cuál de las dos citar sin comparar las
copias. **Commit:** `e286902`, publicado en `pkuschnirof/rpaforce` `f89d273`. Decisión D-056.

---

## PND-007 — El archivo publicado no apunta a su registro de versiones *(era U-06)*

- **Nodo:** `interfaz-publica/api` [nodo propuesto]
- **Grupo:** G-API · **Severidad:** bloquea · **Quién decide:** se hace y se reporta
- **Repositorio:** método · **Estado: CERRADO** el 2026-10-24.

**Qué está mal.** El par *(versión → huella)*, que es el único ancla de confianza que vive fuera
del archivo, no está referenciado desde lo publicado.

**Evidencia del auditor.**

> Declara `source` (el repositorio) y nada más. El par (versión -> huella) que es el único ancla
> de confianza fuera del archivo vive en gates/catalog.json#changelog y en prompts/catalog.json, y
> lo publicado no lo referencia. Agregá el puntero al registro en index.json. Ojo: NO lo metas
> dentro de gates.json ni de prompts.json, porque si cae bajo hash_covers obligás a subir versión
> por agregar un enlace, y si queda fuera del hash es una clave que puede mentir. En el índice es
> donde corresponde.

**Mi reproducción (2026-10-24).** Las claves que lo publicado trae:

```
source: https://github.com/pkuschnirof/urazuke
hash_excludes: generated_at, git_commit, git_commit_note, source, license, content_hash, what, counts
```

El razonamiento del auditor sobre dónde ponerlo es correcto y se adopta tal cual: el puntero va en
el índice, no adentro de los dos archivos.

**Criterio de aceptación por perfil.**

- *P5 (auditor):* dado el perfil auditor, esta persona llega desde el archivo publicado al registro
  que vive en otro alojamiento, y puede contrastar la huella contra una fuente que no es el mismo
  portal que le sirvió el archivo.

**Depende de:** PND-002.


**Avance (2026-10-24, decisión D-056).** Cada recurso del índice lleva `version_ledger` con la dirección del registro en el repositorio del método, la ruta, el nombre del campo (`changelog`) y la nota de que es append-only y que una huella publicada no se edita. La prueba no se conforma con que el puntero exista: lee el registro y exige que la entrada de la versión que el índice cita registre la huella que el índice cita. Se cierra con PND-002, contra producción.

**CIERRE (2026-10-24).** Cada recurso del índice lleva `version_ledger`: la dirección del
registro en el repositorio del método, la ruta, el nombre del campo (`changelog`) y la nota de que
es append-only, que una huella publicada no se edita y que el registro no viaja en el payload, así
que anotar una entrada no cambia la huella que esa entrada anota. El puntero **no** se metió adentro
de `gates.json` ni de `prompts.json`, por el razonamiento del auditor, que se adoptó tal cual: bajo
`hash_covers` obligaría a subir versión por agregar un enlace, y fuera del hash sería una clave que
puede mentir.

La prueba no se conforma con que el puntero exista: lee el registro que el índice nombra y exige que
la entrada de la versión citada registre **la misma huella** que el índice cita. Verificado hoy para
los dos recursos (`2026.10.3` → `0f3c1b47…`, `2026.10.1` → `3459750d…`).

**Criterio por perfil, verificado.** *P5:* desde el archivo publicado se llega al registro que vive
en otro alojamiento, y la huella se contrasta contra una fuente que no es el portal que sirvió el
archivo. **Commit:** `e286902`, publicado en `pkuschnirof/rpaforce` `f89d273`. Decisión D-056.

---

## PND-008 — No hay dirección versionada e inmutable *(era U-07)*

- **Nodo:** `interfaz-publica/api` [nodo propuesto]
- **Grupo:** G-API · **Severidad:** avisa · **Repositorio:** método (el generador; el espejo la
  arrastra solo) · **Estado: abierto**
- **Decisión del dueño (2026-10-24): opción (b), hacerlo, y SIN PURGA.** Una dirección inmutable
  que un día desaparece es peor que no haberla publicado, porque rompe exactamente a quien confió
  en la promesa; y un megabyte por año no es un problema que haya que resolver.

**Qué está mal.** Quien quiera reproducibilidad tiene que guardarse su copia, y quien apunte a la
dirección viva se actualiza en silencio: la huella le cambia abajo de los pies.

**Evidencia del auditor.**

> No existe /api/2026.10.2/gates.json. Quien quiera reproducibilidad tiene que guardarse su copia;
> quien apunte a la URL viva se actualiza en silencio y la huella le cambia abajo de los pies. Con
> las versiones y las huellas ya hechas, publicar también la ruta inmutable es casi gratis.
> Decidí si se hace y cómo se purgan las viejas, si alguna vez se purgan.

**Mi reproducción (2026-10-24).** Producción sirve hoy `catalog_version: 2026.10.2` con huella
`3bd03ac3bf79…` en una única dirección por recurso. No existe ninguna ruta con la versión adentro.

**Especificación.** El generador escribe además una carpeta por versión con los dos archivos; el
espejo la arrastra sola, porque ya copia el directorio entero. Crecimiento medido: unos **165 KB
por versión**; a seis versiones por año, un megabyte por año. El riesgo real no es el tamaño: es
que la copia congelada se desincronice de lo que la versión declaró, y se cubre con una
comprobación —la copia de la versión vigente tiene que ser **idéntica byte a byte** al archivo
vivo—. El índice dice cuál es la dirección viva y cuál la congelada.

**Criterio de aceptación por perfil.**

- *P5 (auditor):* dado el perfil auditor, esta persona puede citar una dirección que dentro de dos
  años devuelva exactamente el mismo contenido, y comprobarlo contra la huella que la versión
  registró.
- *P1:* dada una herramienta que certifica contra una versión concreta, esa herramienta puede
  fijarla sin guardarse una copia propia.

**Depende de:** PND-002 (el índice tiene que existir primero, porque es el que declara cuál es
cuál).

---

## PND-009 — La huella no es una firma, y conviene que el archivo lo diga más fuerte *(era U-08)*

- **Nodo:** `interfaz-publica/api` [nodo propuesto]
- **Grupo:** G-API · **Severidad:** avisa · **Repositorio:** método · **Estado: abierto**
- **Decisión del dueño (2026-10-24):** se adopta la recomendación: **escribirlo honesto en el
  archivo** y dejar la firma criptográfica como propuesta escrita, **no construida** (ver
  PND-024, creado por pedido del dueño en el mismo acto).

**Qué está mal.** No está mal: está dicho con poca fuerza. La huella es auto-consistente —quien
pueda editar el archivo puede recalcularla— y protege contra el truncado, la fusión mal hecha y la
edición a mano, que es exactamente lo que su propia nota promete; no protege contra un adversario
que controle el portal.

**Evidencia del auditor.**

> Es auto-consistente: quien pueda editar el archivo puede recalcularla. Protege contra el
> truncado, el merge y la edición a mano —que es exactamente lo que su propia nota promete, así
> que no hay deshonestidad— pero no contra un adversario. El ancla real es el registro de GitHub
> (ver U-06) más TLS. Escribilo así, en una frase, en el campo `what` del índice.

**Mi reproducción (2026-10-24).** La huella publicada hoy cubre trece claves y excluye ocho; el
`what` actual explica qué es el archivo y no dice nada sobre el alcance de la protección.

**Criterio de aceptación por perfil.**

- *P5 (auditor):* dado el perfil auditor, esta persona lee en el archivo mismo qué protege la
  huella y qué no, y no tiene que deducirlo.

**Trampa a tener en cuenta, y es la que hace que este pendiente dependa del siguiente:** si esa
frase vive en `what`, y `what` está **fuera** de la huella, es una declaración de seguridad que un
atacante puede editar para que diga lo contrario.

**Depende de:** PND-010 (cubrir `what` con la huella) y PND-002.

**Avance (2026-10-24, decisión D-056).** La frase está escrita, y sin maquillaje, en el campo `what` del índice: la huella es auto-consistente, detecta el truncado, la fusión mal hecha y la edición a mano, y **no** protege contra un adversario que controle el portal; las anclas que no viven ahí son el registro de versiones y el cifrado de la conexión. Hay una prueba que la exige. Lo que falta para cerrar es lo que este pendiente ya anticipaba, y es de PND-010: esa frase, en el índice, viaja sin huella que la proteja **por definición** (el índice no tiene), así que la misma declaración tiene que quedar también en el `what` de los dos recursos, una vez que `what` esté cubierto.

---

## PND-010 — `counts` y `what` quedan fuera de la huella *(era U-09)*

- **Nodo:** `interfaz-publica/api` [nodo propuesto]
- **Grupo:** G-API · **Severidad:** bloquea · **Repositorio:** método · **Estado: CERRADO** el
  2026-10-27, en `catalog_version 2026.10.6` y `corpus_version 2026.10.4`.
- **Decisión del dueño (2026-10-24): cubrir las dos.** En el mismo cambio de versión que ya fuerzan
  otras entradas de este backlog.

**Qué está mal.** Son las dos únicas claves del publicado que pueden cambiar sin que la
verificación lo note.

**Evidencia del auditor.**

> Son derivados y prosa, y es defendible, pero son las dos únicas claves del publicado que pueden
> cambiar sin romper la verificación. Verifiqué que hoy `counts` dice la verdad (24 peldaños, 8
> estaciones, 45 reglas, 12 evaluadores, y los arreglos tienen esos largos). Dejalo documentado
> como decisión consciente en el propio archivo, o cubrilo — y si lo cubrís, sube la versión por
> D-053 y va su entrada en el changelog.

**Mi reproducción (2026-10-24).**

```
hash_excludes: generated_at, git_commit, git_commit_note, source, license, content_hash, what, counts
counts: {"steps":24,"stations":8,"rules":45,"evaluators":12}
```

El resumen dice la verdad, confirmado. Y hay dos razones para cubrirlos, no una: un resumen de
cantidades que puede mentir es **peor que no tener resumen** —una herramienta que lo usa para
validar que terminó de leer aceptaría en silencio un archivo truncado—, y es justo en `what`
donde PND-009 pone la frase sobre el alcance de la protección.

**Criterio de aceptación por perfil.**

- *P1:* dada una herramienta consumidora, esa herramienta puede usar el resumen de cantidades para
  comprobar que leyó el archivo completo, porque el resumen está protegido.
- *P5:* dado el perfil auditor, no queda ninguna clave del publicado que pueda cambiar sin romper
  la verificación, salvo las que son de la corrida (`generated_at`, el identificador de git).

**Trabajo que arrastra, y es el paso que no se descubre en rojo:** cubrirlas **sube la versión
declarada** de los dos archivos y anota su entrada en el registro, que es append-only. Si no se
hace en ese orden, la publicación se niega con `E_VERSION`, que es exactamente para lo que ese
chequeo existe.

**Cierre (2026-10-27).** Las dos claves quedaron **cubiertas**, y en el mismo cambio de versión que
`PND-019`, que es lo que esta entrada pedía: una versión es un contenido, y uno solo.

Lo que hubo que mover no era la declaración sino **dónde se arma el dato**. `what` y `counts` se
construían *después* de calcular la huella, en el armado del archivo, así que declararlos cubiertos
sin más daba `E_HUELLA: la huella cubre la clave counts, que el publicado no tiene` —el validador
tenía razón—. Ahora los dos viven en `armarContenido()`, que es el contenido que se canonicaliza, y
el armado del archivo los toma de ahí. En los prompts, lo mismo con `what`.

```
gates.json    2026.10.5 -> 2026.10.6   huella 6fc83add4a12 -> 649f10179cc1
  covers  += counts, what        (13 claves -> 15)
  excludes -= counts, what       (8 claves -> 6)
prompts.json  2026.10.3 -> 2026.10.4   huella f5b02b3c893c -> 8e69d1189be9
  covers  += what                (6 claves -> 7)
  excludes -= what               (7 claves -> 6)
node build/gates_validate.mjs  -> validado (24 peldaños, 8 estaciones, 45 reglas)
node build/api_check.mjs       -> los tres recursos coinciden con las fuentes
node --test                    -> 261 pruebas, 0 fallos
```

Los valores no cambiaron: mismo resumen de cantidades, mismo texto. Lo que cambió es que ahora
**no pueden** cambiar sin que la verificación lo note, y queda dicho en el propio esquema
(`version_scheme.counts_is_covered`) por qué un resumen que puede mentir es peor que no tener
resumen.

**Depende de:** nada; va junto con PND-019 en el mismo cambio de versión.

---

## PND-011 — El publicado le pide al consumidor un catálogo que el método no le da *(era U-10)*

- **Nodo:** `corpus/idiomas` [nodo propuesto]
- **Grupo:** G-API · **Severidad:** bloquea · **Repositorio:** método · **Estado: abierto**
- **Decisión del dueño (2026-10-24): sí, y en DIEZ idiomas.**

**Qué está mal.** El archivo le dice al consumidor, con razón, "no imprimas estos textos, leé el
identificador y sacá el texto de tu propio catálogo", y el método no le da ningún catálogo: lo
único legible por máquina es justamente lo que le pide no imprimir.

**Evidencia del auditor.**

> `languages.text_language.consumer` dice, bien: "no imprimas estos textos, leé el id opaco y sacá
> el texto de tu propio catálogo". Pero lo único legible por máquina es justo lo que pide no
> imprimir, y lo traducido (los HTML) no está indexado por id. La salida natural es un
> labels.<idioma>.json por id, que es el paso siguiente de D-051 y convierte una instrucción en
> algo cumplible. Proponé la forma; no lo construyas sin que yo diga sí.

**Mi reproducción (2026-10-24), y el dato que cambia el tamaño del trabajo.** Esto **no** es
traducir de nuevo: las traducciones ya existen en prosa. Los 24 peldaños tienen su contrato
traducido, las 8 estaciones están en el camino evolutivo-correctivo, y las 45 reglas ya tienen un
puntero a su fila del anexo —de hecho el método **ya extrae** el texto inglés de esas 45 desde el
anexo, así que el mecanismo está inventado y probado. Es **una extracción más**.

Alcance medido: **24 + 8 + 45 = 77 identificadores con texto**, más el vocabulario de evaluadores
(12 nombres). Del orden de unos cientos de cadenas por idioma, todas ya escritas.

**Especificación.** Un archivo por idioma con el texto colgado del identificador; un extractor que
lo arma desde los documentos del método; y una verificación que falle si a un idioma le falta un
identificador. Nada de esto toca la base congelada: los textos por idioma son una capa **encima**,
no una edición de los datos. Entran al índice como recursos propios.

**Criterio de aceptación por perfil.**

- *P1, P2:* dada una herramienta consumidora, esa herramienta puede mostrarle a su usuario el
  título de un peldaño en el idioma de ese usuario, sacado de un catálogo que el método publica, y
  no escribirse sus propias traducciones.
- *P5:* dado el perfil auditor, esta persona puede comprobar que ningún identificador le falta a
  ningún idioma.

**Depende de:** PND-002 (van al índice) y PND-017 (son diez archivos porque el corpus va a diez
idiomas).

---

## PND-012 — `required: false` está declarado, publicado y nunca usado *(era U-11)*

- **Nodo:** `interfaz-publica/api` [nodo propuesto]
- **Grupo:** G-API · **Severidad:** registra · **Repositorio:** método · **Estado: abierto**

**Qué está mal.** Nada todavía. Es superficie de contrato sin un solo caso real, y queda anotada
para que el día que se use se sepa que es la primera vez.

**Evidencia del auditor.**

> `required: false` está declarado, publicado y nunca usado: los 29 evaluadores de los 24 peldaños
> son required:true. La semántica de `evaluator_semantics.required_false` y la de
> `compatibility.unknown_evaluator_not_required` existen y ningún consumidor las pisó jamás. No es
> un error. Anotalo en el backlog como superficie de contrato sin un solo caso real, para que el
> día que se use se sepa que es la primera vez.

**Mi reproducción (2026-10-24), y acá me corrijo a mí mismo.**

```
evaluadores declarados en los 24 peldanos: 29  | required:true 29 | required:false 0
evaluadores declarados en las 8 estaciones:  8  | required:true  8
vocabulario (counts.evaluators): 12
```

El número del auditor —**29 en los 24 peldaños**— es **correcto**. En una vuelta anterior dije que
eran 37 y que el auditor había contado mal; 37 es la suma de peldaños **más** estaciones, que es
otra cosa. La corrección queda escrita acá porque la usé para caracterizar el rigor de la
auditoría, y no correspondía.

**Criterio de aceptación por perfil.**

- *P1:* dado el perfil herramienta consumidora, el día que un evaluador se declare opcional, el
  registro dice que es la primera vez que ese camino se ejercita, y hay una prueba que lo cubre
  antes de publicarlo.

---

## PND-013 — La trampa: la configuración del servidor se borra en cada publicación *(era U-12)*

- **Nodo:** `cadena/publicacion` [nodo propuesto]
- **Grupo:** G-API · **Severidad:** bloquea · **Quién decide:** se hace y se reporta
- **Repositorio:** portal · **Estado: CERRADO** el 2026-10-24.

**Qué está mal.** El trabajo de publicación **vacía** los dos directorios antes de llenarlos, así
que cualquier configuración de servidor puesta adentro se evapora en la publicación siguiente.

**Evidencia del auditor.**

> LA TRAMPA, y si se te pasa el arreglo se deshace solo: el job `publicar` de
> .github/workflows/compuertas.yml hace `rm -rf portal/yujin.app/urazuke/api` y vuelve a llenar el
> directorio en cada fusión a main. Cualquier .htaccess puesto DENTRO de api/ se borra en la
> próxima publicación. La configuración de Apache tiene que vivir en yujin.app/urazuke/.htaccess,
> un nivel ARRIBA de los dos directorios que el espejo vacía, y heredarse hacia abajo.

**Mi reproducción (2026-10-24).** Confirmado en las dos puntas. En el flujo, el paso *Copiar
docs/html/ a las dos copias del portal* hace `rm -rf` de los dos destinos y los vuelve a crear. En
el árbol del portal **no existe** `.htaccess` ni en `yujin.app/` ni en `yujin.app/urazuke/`; el
único que hay está en la raíz del repositorio y es de otro sitio.

Este es, de los veintidós, el hallazgo que más tiempo ahorra: descubierto después y no antes,
cuesta un día de desconcierto preguntándose por qué una configuración que se puso "se desconfiguró
sola".

**Criterio de aceptación por perfil.**

- *P2 (navegador):* dado el perfil herramienta en navegador, esta persona sigue pudiendo leer la
  API **después** de la siguiente publicación del método, no sólo el día que se configuró.
- *P5:* dado el perfil auditor, esta persona puede comprobar que la configuración vive fuera del
  alcance del vaciado, leyendo el flujo.

**Es precondición de:** PND-004 y PND-005. Ninguno de los dos se da por hecho sin esto.

**Avance (2026-10-24, decisión D-056).** Resuelto en las dos puntas. En el portal, la configuración se escribió en `yujin.app/urazuke/.htaccess`, un nivel arriba de los dos directorios que el espejo vacía, con el motivo escrito adentro del archivo para que nadie la mueva por prolijidad. En el método, el trabajo de publicación ahora **se niega** si aparece un `.htaccess` adentro de lo que vacía y **avisa** si falta el de arriba: avisa y no frena, porque ese archivo es del portal y no del método. Falta el empujón del dueño en el portal.

**Iteración (2026-10-24, tarde) — el arreglo estaba bien y no alcanzaba.** El archivo quedó donde el vaciado no llega, se empujó, y **nunca llegó al servidor**: el transporte del portal lo excluía junto con el de la raíz (**PND-035**). Queda dicho porque es el aprendizaje que vale: poner la configuración fuera del alcance del vaciado era condición necesaria y no suficiente, y la única forma de saberlo fue **preguntarle a producción**, no releer el flujo. Por eso la guarda del método ya no dice "la configuración está donde el vaciado no llega" por el solo hecho de que el archivo exista en el repositorio del portal: ahora dice que el **archivo** está, y hay un paso aparte que le pregunta al servidor si la interfaz se puede consumir.

**Iteración (2026-10-24, noche) — la mitad que este pendiente guarda ya está verde.** Con el
transporte anclado (PND-035, `75a2e64`), el documento del directorio llegó al servidor y se mide:

```
OK    https://yujin.app/urazuke/api/ contesta con el indice -- HTTP 200, 2 recursos listados
```

Lo que **todavía no se midió**, y es exactamente el criterio de aceptación de esta entrada, es que
la configuración **sobreviva a una publicación del método**. Ninguna corrió después de que el
archivo estuviera puesto: el último espejado fue `f89d273`, de antes. Que el vaciado no la alcance
está verificado **leyendo** el flujo —el borrado apunta a `api/` y a `docs/`, un nivel abajo— y la
guarda del método lo exige, pero leer no es haber ocurrido. Este pendiente se cierra con la
medición de después de la próxima fusión a `main`, no antes.

**CIERRE (2026-10-24), medido después de una publicación del método.** La fusión de `3079fe6` a
`main` disparó la publicación (corrida `40133210429`), que es exactamente lo que este pendiente
esperaba para cerrarse. Lo que se midió, en ese orden:

*Uno — la publicación vació los dos directorios y la configuración no desapareció.* El paso que
copia imprime lo que cambia y lo que se va del portal después del vaciado y el rellenado:

```
el archivo esta commiteado en el portal y fuera del alcance del vaciado: portal/yujin.app/urazuke/.htaccess
OJO: esto dice que el ARCHIVO esta, no que el servidor lo tenga puesto. [...] Quien contesta de
verdad es el paso 'Preguntar a produccion...', mas abajo
--- lo que cambia en el portal ---
--- archivos que desaparecen del portal ---
El portal ya tiene exactamente esto: no hay nada que publicar.
```

Las dos listas vacías son la medición, y no dependen de que hubiera algo que publicar: si el
borrado hubiera alcanzado al archivo, habría aparecido en *archivos que desaparecen del portal*,
que se calcula del estado del clon **después** del vaciado.

*Dos — producción sigue sirviendo la interfaz, preguntado desde dentro de la propia publicación.*
El paso que D-057 agregó:

```
OK    https://yujin.app/urazuke/api/ contesta con el indice -- HTTP 200, 2 recursos listados
OK    index.json: un navegador de otro origen puede leerla -- access-control-allow-origin: *
OK    index.json: dice cuanto vale la copia -- cache-control: public, max-age=300, must-revalidate
OK    gates.json: un navegador de otro origen puede leerla -- access-control-allow-origin: *
OK    gates.json: dice cuanto vale la copia -- cache-control: public, max-age=300, must-revalidate
OK    prompts.json: un navegador de otro origen puede leerla -- access-control-allow-origin: *
OK    prompts.json: dice cuanto vale la copia -- cache-control: public, max-age=300, must-revalidate

La interfaz de datos se puede consumir: directorio, CORS y Cache-Control.
```

**Criterio por perfil, verificado.** *P2:* la lectura desde un navegador sigue funcionando después
de una publicación del método, que es lo que este pendiente pedía y no "el día que se configuró".
*P5:* el auditor lo comprueba leyendo el flujo —el borrado nombra `docs/` y `api/`, y la
configuración vive un nivel arriba— **y** corriendo `node build/api_headers.mjs`, que mide en vez de
afirmar.

**Lo que queda dicho, porque es el aprendizaje y no el arreglo.** Poner la configuración fuera del
alcance del vaciado era condición **necesaria y no suficiente**: el archivo quedó bien ubicado y
commiteado el 2026-10-24 a la tarde, el despliegue del portal cerró en verde, y producción siguió en
rojo porque el transporte la descartaba (PND-035). Por eso la guarda del método ya no afirma que la
configuración esté puesta: dice que el **archivo** está, que es lo único que mira, y lo dice con esa
advertencia escrita al lado. Quien contesta de verdad es el paso que le pregunta al servidor.

---

## PND-035 — El despliegue del portal excluía **todos** los `.htaccess`, no sólo el de la raíz *(hallazgo del método, no de la auditoría)*

- **Nodo:** `cadena/publicacion` [nodo propuesto]
- **Grupo:** G-API · **Severidad:** bloquea · **Quién decide:** se hace y se reporta
- **Repositorio:** portal (su flujo de despliegue) · **Estado: CERRADO** el 2026-10-24.

**Qué está mal.** El paso de `rsync` del despliegue del portal excluía `--exclude='.htaccess'`, sin barra
inicial. Un patrón de `rsync` sin barra se compara contra el **último componente** del nombre a
**cualquier** profundidad, así que descartaba los tres `.htaccess` del repositorio y no sólo el de
la raíz, que es el único que se quería preservar —ése es del servidor y el repositorio no tiene que
pisarlo—. La forma correcta es `--exclude='/.htaccess'`: la barra inicial ancla el patrón a la raíz de la
transferencia, que es exactamente lo que se quería y nada más.

**Cómo apareció, que es la parte que importa.** No lo trajo la auditoría. Apareció al **medir el
resultado** de PND-013: el archivo de configuración estaba commiteado (`fd1270e`), el despliegue del
portal cerró **en verde** en 21 segundos (corrida `40130433403`) y producción seguía con las siete
comprobaciones en rojo. El verde de un flujo no es prueba de que la configuración haya llegado; la
prueba es preguntarle al servidor.

**Mi medición (2026-10-24), después de ese despliegue verde.** `node build/api_headers.mjs`:

```
FALLA https://yujin.app/urazuke/api/ contesta con el indice -- HTTP 403, el cuerpo no es un indice
FALLA index.json: un navegador de otro origen puede leerla -- access-control-allow-origin: (no vuelve)
FALLA index.json: dice cuanto vale la copia -- cache-control: (no vuelve)
FALLA gates.json: un navegador de otro origen puede leerla -- access-control-allow-origin: (no vuelve)
FALLA gates.json: dice cuanto vale la copia -- cache-control: (no vuelve)
FALLA prompts.json: un navegador de otro origen puede leerla -- access-control-allow-origin: (no vuelve)
FALLA prompts.json: dice cuanto vale la copia -- cache-control: (no vuelve)

7 comprobacion(es) en rojo.
```

**La semántica, medida y no recordada.** `rsync` 3.4.1, árbol de prueba con los mismos tres caminos
del repositorio (la raíz, `yujin.app/urazuke/` y `dl/mcp_local/`):

```
--exclude='.htaccess'   -> llegaron 0: (ninguno)
--exclude='/.htaccess'  -> llegaron 2: dl/mcp_local/.htaccess yujin.app/urazuke/.htaccess
```

**Segunda víctima, preexistente y ajena al método.** `dl/mcp_local/.htaccess` reescribe
`/dl/mcp_local/latest.json` a `latest.json.php` para que la dirección que consulta el actualizador
automático quede limpia. Está commiteado desde abril de 2026 y nunca estuvo en el servidor. Medido
el mismo día: `latest.json` da **404** y `latest.json.php` da **200**. Anclar el exclude lo publica
también, lo cual queda fuera del alcance de este trabajo y es deseable: esa dirección empieza a
funcionar. Vale, sobre todo, como confirmación independiente de que el patrón suelto era un defecto
y no una decisión.

**Criterio de aceptación por perfil.**

- *P2 (navegador):* dado el perfil herramienta en navegador, esta persona puede leer los tres
  archivos **después** de un despliegue del portal, y no sólo el día que alguien tocó el servidor a
  mano.
- *P5 (auditor):* dado el perfil auditor, esta persona puede comprobar —leyendo el flujo del portal
  y corriendo una prueba repetible— que el transporte lleva la configuración anidada.

**Es precondición de:** PND-004, PND-005 y el cierre de PND-013. Ninguno de los tres se cierra sin
esto.

**Avance (2026-10-24, tarde).** Arreglado en las dos puntas; falta el empujón del dueño en el
portal. En el portal: el exclude quedó anclado, con el motivo y la medición escritos al lado, y se
agregó `build/verify-deploy-htaccess.mjs`, que corre **en el flujo, antes de desplegar**, y verifica
en dos niveles —estático, que la lista de excludes tenga la forma anclada y no la suelta; y de
comportamiento, corriendo `rsync` de verdad sobre el árbol de prueba cuando hay `rsync` en el
camino, como lo hay en el corredor—. Si no hay `rsync`, lo dice en voz alta en vez de saltearse en
silencio. Tiene su prueba en rojo propia (`--rojo`), **y esa prueba encontró dos defectos del
verificador antes de entregarlo**: leía sus propios comentarios como si fueran la orden (falso rojo)
y la mutación caía en un comentario en vez de en la línea de orden (falso verde). Los dos quedaron
dichos en el código, donde se cometieron. En el método: la guarda del `.htaccess` ya no afirma que
la configuración esté puesta por el solo hecho de que el archivo exista en el repositorio del
portal, y se agregó un paso que **le pregunta a producción** si la interfaz de datos se puede
consumir —avisa y no frena, porque esa configuración es del portal, pero no deja una publicación
diciendo que todo está bien cuando la interfaz no se puede leer—.

**Lo que este hallazgo le deja al método, más allá del arreglo.** Es la misma lección que PND-001 en
otra escala: ahí dos pasos de la cadena corrían en vacío y cerraban en verde; acá un despliegue
entero cerró en verde sin transportar lo que tenía que transportar. En los dos casos el verde era de
un paso que no hizo nada, y en los dos lo que lo descubrió fue exigir **la salida medida** en lugar
del código de salida. Es material directo para el peldaño 8 y para el argumento de que el rojo tiene
que ser un recibo.

**CIERRE (2026-10-24), medido en las tres puntas.** El dueño commiteó y empujó `75a2e64` en el
repositorio del portal.

*Uno — el guardián corrió donde importa, y la mitad de comportamiento también.* El paso previo al
despliegue, en la corrida `40132538551`, con `rsync` de verdad:

```
OK    el exclude del .htaccess esta anclado a la raiz ('/.htaccess') -- patron: '/.htaccess'
OK    ningun otro exclude de .htaccess sin anclar -- patrones con .htaccess: /.htaccess
OK    sigue existiendo el .htaccess anidado yujin.app/urazuke/.htaccess -- presente
OK    sigue existiendo el .htaccess anidado dl/mcp_local/.htaccess -- presente
      rsync: rsync  version 3.2.7  protocol version 31
OK    con '.htaccess' (suelto) no llega ninguno -- llegaron 0: (ninguno)
OK    con '/.htaccess' (anclado) llegan los anidados y no el de la raiz -- llegaron 2: dl/mcp_local/.htaccess yujin.app/urazuke/.htaccess
PASS -- el exclude esta anclado a la raiz y los .htaccess anidados viajan.
```

En la máquina del dueño la mitad de comportamiento **avisa que no corrió**, por falta de `rsync`, en
vez de saltearse en silencio; en el corredor corrió, y queda a la vista con la versión con que
corrió. Es la misma exigencia que PND-001 dejó en la cadena del método: un paso que no imprime su
salida no corrió.

*Dos — la configuración llegó.* Las siete comprobaciones de `node build/api_headers.mjs` pasaron de
siete en rojo a siete en verde con ese único cambio, sin tocar el `.htaccess` ni el contenido
publicado. El archivo era el mismo de `fd1270e`; lo que cambió fue el transporte.

*Tres — la segunda víctima, que es la confirmación independiente.* `dl/mcp_local/.htaccess` está
commiteado desde abril de 2026 y nunca había llegado al servidor. Medido antes y después:

```
antes:    https://rpaforce.com/dl/mcp_local/latest.json      404
          https://rpaforce.com/dl/mcp_local/latest.json.php  200
despues:  https://rpaforce.com/dl/mcp_local/latest.json      200, y el cuerpo es el manifiesto
          https://rpaforce.com/dl/mcp_local/latest.json.php  200
```

La dirección limpia que consulta el actualizador automático volvió a funcionar sin que nadie la
toque. Es trabajo ajeno al método, y por eso vale como prueba: el patrón suelto era un defecto y no
una decisión, y un defecto de transporte no distingue de quién es el archivo que descarta.

**Criterio por perfil, verificado.** *P2:* la lectura desde un navegador sobrevive a un despliegue
del portal, porque lo que la habilita viaja en el despliegue. *P5:* el auditor puede comprobarlo sin
credenciales, corriendo `node build/verify-deploy-htaccess.mjs` —que mide en vez de afirmar— y
leyendo el flujo del portal.

---

# Abiertos — G-ALCANCE: llegar al material publicado

## PND-014 — El mapa del sitio no conoce ningún documento del método *(era U-13)*

- **Nodo:** `interfaz-publica/portada` [nodo propuesto]
- **Grupo:** G-ALCANCE · **Severidad:** avisa · **Quién decide:** se hace y se reporta
- **Repositorio:** portal · **Estado: CERRADO** el 2026-10-24.

**Qué está mal.** El mapa del sitio lista la portada y nada más; ni un documento ni la API.

**Evidencia del auditor.**

> https://yujin.app/sitemap.xml lista siete URLs, entre ellas https://yujin.app/urazuke/, y no
> incluye ni un documento de /urazuke/docs/ ni la API. El robots.txt de la raíz invita por nombre
> a los rastreadores de inteligencia artificial y el mapa no los lleva a ningún documento.

**Mi reproducción (2026-10-24).** Siete direcciones en el mapa servido, exactamente como midió el
auditor:

```
https://yujin.app/              https://yujin.app/yujin-forge/     https://yujin.app/yuemail/
https://yujin.app/nac3-kikoe/   https://yujin.app/arquitectura-agentica/
https://yujin.app/urazuke/      https://yujin.app/casos-de-uso/
urazuke/docs: 0
```

**Y un matiz que importa para no cerrar esto de más.** En el árbol del portal hay un mapa
**modificado y sin commitear** que agrega las **nueve portadas por idioma** (`/urazuke/ar/`,
`/de/`, `/en/`, `/fr/`, `/hi/`, `/it/`, `/ja/`, `/pt/`, `/zh/`). Son diez direcciones de `urazuke`
en total, y **cero** de `/urazuke/docs/`: el trabajo sin publicar resuelve una parte de este
hallazgo y deja afuera los 76 documentos y la API.

**Criterio de aceptación por perfil.**

- *P4 (rastreador):* dado el perfil rastreador, esta persona llega desde el mapa a cada documento
  publicado y a la API, sin tener que descubrirlos por enlace.

**Cómo se verifica.** `curl -s https://yujin.app/sitemap.xml | grep -c "urazuke/docs"` → mayor que 0.

**Depende de:** PND-020 y PND-018 (el mapa modificado viaja con ese trabajo sin commitear).

**Cómo se cerró (2026-10-24).** El mapa del sitio dejó de escribirse a mano: el generador descubre
en el disco lo que hay, así que un documento entra al mapa **por existir**. Medido en producción
después del commit `63682dd`:

```
https://yujin.app/sitemap.xml   HTTP 200, 17708 bytes
direcciones totales:     96   (eran 7)
de urazuke:              90
de urazuke/docs:         76
de la interfaz de datos:  4   /api/  /api/index.json  /api/gates.json  /api/prompts.json
```

Y la cuenta de los documentos no es una coincidencia: `find docs/html -name '*.html' | wc -l` en
este repositorio da **76**, exactamente las 76 direcciones de `/urazuke/docs/` que el mapa lista.
Ni falta una ni sobra una.

**Criterio por perfil, verificado.** *P4:* desde el mapa se llega a cada documento publicado y a
los tres recursos de la interfaz, sin depender de que algún enlace los nombre.

**Lo que queda guardado, porque este defecto vuelve solo.** La publicación del método no toca la
portada ni el mapa, así que el próximo documento nuevo nacería huérfano otra vez. El verificador del
portal tiene ahora dos comprobaciones nuevas: que al mapa no le **falte** ninguna dirección
publicada y que no le **sobre** una que el método dejó de publicar —las dos con su rojo deliberado,
y cada rojo exigiendo el texto que el verificador tiene que decir, no sólo que se caiga—. La otra
mitad, el aviso del lado del método, es PND-025, que **cerró el 2026-10-26** (decía «sigue abierta»
hasta este commit: una entrada del registro no puede afirmar en presente un estado que otra entrada
desmiente, que es `PND-051` en chico).

---

## PND-015 — Diez documentos publicados que no se pueden alcanzar *(era U-14)*

- **Nodo:** `interfaz-publica/portada`, `corpus/anexo-h` [nodos propuestos]
- **Grupo:** G-ALCANCE · **Severidad:** bloquea · **Quién decide:** se hace y se reporta
- **Repositorio:** portal · **Estado: CERRADO** el 2026-10-24.

**Qué está mal.** El anexo de las 45 heurísticas en ocho idiomas, el documento de compuertas y el
de evaluaciones se sirven con éxito y no tienen un solo enlace que lleve a ellos.

**Evidencia del auditor.**

> ```
> https://yujin.app/urazuke/docs/ANEXO_HEURISTICAS.html     -> 200
> https://yujin.app/urazuke/docs/ja/ANEXO_HEURISTICAS.html  -> 200
> https://yujin.app/urazuke/docs/COMPUERTAS.html            -> 200
> ```
> y en la portada, local y en producción, hay CERO apariciones de "ANEXO_HEURISTICAS", cero de
> "COMPUERTAS" y cero de "EVALUACIONES_DE_IA". La tabla de material tiene nueve columnas (idioma,
> documento principal, contratos, manual-curso, referencias, camino evolutivo, curso parte 2,
> junior, en equipo) y ninguna es el Anexo H. (…) Son las 45 reglas que el método publica como
> dato y el documento que las explica: es lo último que debería estar escondido.

**Mi reproducción (2026-10-24).**

```
https://yujin.app/urazuke/docs/ANEXO_HEURISTICAS.html     200   61259
https://yujin.app/urazuke/docs/ja/ANEXO_HEURISTICAS.html  200   73391
https://yujin.app/urazuke/docs/COMPUERTAS.html            200   79145

en la portada servida (65.491 bytes), case-sensitive:
  ANEXO_HEURISTICAS.html   0
  COMPUERTAS.html          0
  EVALUACIONES_DE_IA       0
```

La palabra "compuertas" sí aparece tres veces en la portada, en prosa ("…el orden y las
compuertas…"), que no es un enlace. El hallazgo se sostiene.

**Criterio de aceptación por perfil.**

- *P3 (lector humano):* dado el perfil lector, esta persona llega al anexo de las 45 reglas y al
  documento de compuertas desde la portada, en no más de tres pasos (UX-03: no hay huérfanas).
- *P4 (rastreador):* dado el perfil rastreador, los tres documentos están enlazados en el HTML
  servido y en el mapa del sitio.

**Cómo se verifica.** `curl -s https://yujin.app/urazuke/ | grep -c "ANEXO_HEURISTICAS"` → mayor
que 0.

**Depende de:** PND-020 (la portada publicada está atrasada) y arrastra PND-025 (el chequeo que
evita que vuelva a pasar).

**Cómo se cerró (2026-10-24).** El anexo de las 45 reglas es ahora una **columna más** de la tabla
de material, en los ocho idiomas en que el método lo publica, y los otros dos documentos tienen su
párrafo explicando por qué están fuera del corpus traducido (D-051: son documentación de
herramienta y van en inglés). Medido en producción después del commit `63682dd`:

```
en la portada servida (70.395 bytes), los enlaces, no la prosa:
  docs/ANEXO_HEURISTICAS.html      1      docs/it/ANEXO_HEURISTICAS.html   1
  docs/en/ANEXO_HEURISTICAS.html   1      docs/ja/ANEXO_HEURISTICAS.html   1
  docs/de/ANEXO_HEURISTICAS.html   1      docs/pt/ANEXO_HEURISTICAS.html   1
  docs/fr/ANEXO_HEURISTICAS.html   1      docs/zh/ANEXO_HEURISTICAS.html   1
  href="docs/COMPUERTAS.html"          1
  href="docs/EVALUACIONES_DE_IA.html"  1

y los documentos que estaban huérfanos siguen sirviéndose, ahora con quien los nombre:
  docs/ANEXO_HEURISTICAS.html      200
  docs/ja/ANEXO_HEURISTICAS.html   200
  docs/COMPUERTAS.html             200
  docs/EVALUACIONES_DE_IA.html     200
```

**Criterio por perfil, verificado.** *P3:* se llega al anexo y al documento de compuertas en **un**
paso desde la portada —la tabla de material y el párrafo de abajo—, bastante por debajo de los tres
que pedía UX-03. *P4:* los tres están enlazados en el HTML **servido** (horneado, no después del
conmutador) y en el mapa del sitio, que ahora los lista con los otros 73.

**Lo que queda guardado.** El verificador del portal exige ahora que **todo** documento del disco
esté enlazado desde alguna de las diez páginas, y **falla**, no avisa: un documento al que nadie
puede llegar no está publicado, está servido. Tiene su rojo deliberado —*un documento publicado que
nadie enlaza*— que cae nombrando el archivo huérfano. Las mutaciones del portal pasaron de cinco a
nueve con este trabajo, y las nueve caen:

```
mutaciones: 9  rojos: 9
PRUEBA EN ROJO OK: las 9 mutaciones caen y el verificador nombra el problema.
```

---

## PND-049 — La hoja de las veinticinco preguntas nace huérfana *(deriva de PND-043)*

- **Nodo:** `interfaz-publica/portada` [nodo propuesto]
- **Grupo:** G-ALCANCE · **Severidad:** avisa · **Quién decide:** se hace y se reporta
- **Repositorio:** portal · **Estado: CERRADO** el 2026-10-26, y cerrado por el **efecto** y no
  por el commit: el empujón se hizo y producción sirve la hoja enlazada desde las diez portadas.
  Estuvo *en curso* unas horas, con el trabajo hecho y medido en el clon y sin empujar, porque ahí
  empujar **es** publicar y la decisión era del dueño.
- **Origen:** nació el 2026-10-26 al cerrar `PND-043`, y no es una sorpresa: es la consecuencia
  escrita de D-052, anotada en el mismo momento en que se creó la causa.

**Qué está mal.** El método publica un documento nuevo del corpus en los ocho idiomas
—`docs/PREGUNTAS_AL_PROVEEDOR.md`, la hoja que un dueño se lleva a una reunión con un proveedor— y
la publicación **no toca la portada** (D-052): espeja `docs/html/` y nada más. Así que los ocho
archivos van a quedar **servidos y sin que ninguna portada los enlace**, que es exactamente la
situación que `PND-015` cerró para los diez documentos anteriores. Servido no es publicado.

**Lo que esto NO es.** No es un hallazgo: es la mitad conocida del trabajo. Lo que hace que valga la
pena registrarlo en vez de confiar en la memoria es que ahora **algo lo dice solo**: el chequeo de
`PND-025` (`node build/portal_orphans.mjs --portal <árbol del portal>`) corre dentro del trabajo de
publicación, en el único momento en que los dos árboles están juntos, y va a nombrar los ocho
huérfanos por su nombre. Avisa y no frena, que es la severidad de UX-03 y lo que corresponde cuando
el arreglo vive en el otro repositorio.

**Mi reproducción (2026-10-26), y es la primera vez que el guardián de huérfanas se gana el
sueldo con un caso real y no con una prueba.** Corrido contra el árbol del portal, con los dos
árboles juntos, que es el único momento en que se puede:

```
$ node build/portal_orphans.mjs --portal <arbol del portal>
portadas del portal: 10 (index.html, ar/, de/, en/, fr/, hi/, it/, ja/, pt/, zh/)
documentos generados: 84 | enlazados desde una portada: 76 | en el mapa del sitio: 76
--- veredicto ---
  PREGUNTAS_AL_PROVEEDOR.html:    sin_enlace -- ninguna portada lo enlaza, y el mapa
                                  del sitio tampoco lo lleva
  en/PREGUNTAS_AL_PROVEEDOR.html: sin_enlace ...   (y asi los ocho idiomas)
Hay 8 documento(s) que el metodo publica y ninguna portada enlaza. Servido no es publicado:
agregalos al indice y al i18n de la landing, que viven en el repositorio del portal.
huerfanas: comprobado -- 84 documentos, 8 huerfanos, 0 fuera del mapa
```

Los ocho archivos existen porque el documento está en el arreglo literal de `build/build.mjs`
(si no estuviera, existiría y no se publicaría); los ocho quedan sin enlace porque la portada y su
i18n viven en el otro repositorio y este cambio no los toca. **Lo que importa del recibo de arriba
no es el ocho: es que lo dijo un programa, nombrando cada archivo, en vez de que alguien se
acordara.** De 76 enlazados a 84 generados: la cuenta cierra.

**Qué hay que producir.** En el repositorio del portal: la fila de la hoja en el índice de la
portada y su texto en el i18n de los diez idiomas de la interfaz —diez, no ocho, que es la cuenta de
la portada—, más la dirección en el mapa del sitio, que ya no se escribe a mano y se descubre del
disco. Con eso, su verificador de portadas vuelve a quedar en verde por sí solo.

**Criterio de aceptación por perfil.**

- *P3 (lector humano que llega por la portada):* dada esa persona, puede llegar a la hoja desde la
  portada en su idioma, sin que nadie le pase la dirección.
- *P4 (rastreador):* dado el perfil rastreador, los ocho documentos están enlazados desde alguna
  portada y están en el mapa del sitio.
- *P8 (dueño de proyecto):* dada esa persona, encuentra la hoja antes de la reunión y no después.

**Cómo se verifica.** `node build/portal_orphans.mjs --portal <árbol del portal>` deja de nombrarlos,
y el verificador de portadas del portal (`build/verify-urazuke-homes.mjs`) pasa sin excepciones.

**Qué se hizo (2026-10-26), medido antes y después.** En el repositorio del portal, una columna
nueva en la tabla del material: una celda por cada uno de los ocho idiomas del corpus, con el
título en el idioma de su fila —`Las 25 preguntas`, `The 25 questions`, `25の質問`, y así—, la
cabecera `material.col11` en los **diez** catálogos de la interfaz (hindi y árabe incluidos, que no
tienen corpus traducido y sin eso le mostrarían castellano a un lector árabe), las diez portadas
horneadas de nuevo y el mapa del sitio, que se descubre del disco.

```
node build/verify-urazuke-homes.mjs            (antes)
  FAIL -- 2 problem(s):
    - [sitemap.xml] missing 8 of the 98 urazuke url(s)
    - [index.html] 8 published document(s) that no page links to -- served but
      unreachable: docs/PREGUNTAS_AL_PROVEEDOR.html, docs/en/..., y los ocho

node build/verify-urazuke-homes.mjs            (despues)
  PASS -- every page is baked, linked, canonical and reciprocal.

node build/prerender-urazuke.mjs
  sitemap.xml -> 98 urazuke urls (10 homes, 4 data interface, 84 documents)
  Every key was present in every catalogue -- no fallbacks used.

node build/redproof-urazuke-homes.mjs
  mutaciones: 9  rojos: 9        (claves del arbol vivo: 245)
  PRUEBA EN ROJO OK: las 9 mutaciones caen y el verificador nombra el problema.

node build/portal_orphans.mjs --portal <arbol del portal>     (desde el metodo)
  documentos generados: 84 | enlazados desde una portada: 84 | en el mapa: 84
  huerfanas: comprobado -- 84 documentos, 0 huerfanos, 0 fuera del mapa
```

De 76 enlazados sobre 84 generados a 84 sobre 84. **Commit** en el repositorio del portal,
`7adbd4b`, **empujado el 2026-10-26** con el permiso del dueño, dentro de la misma pila que
`f72406a` y `6ea7f38`: ahí no hay pull request ni compuerta, y empujar publica.

**Por qué esto va antes que el otro commit del portal.** El commit anterior de esa rama conecta la
compuerta de las portadas al despliegue (`PND-038`). Con los ocho huérfanos puestos, esa compuerta
**frena el despliegue, que es el sitio entero** —comprobado: corrida sobre el árbol con los ocho
sin enlazar, `FAIL -- 2 problem(s)`—. Es la compuerta funcionando, y el arreglo es siempre un
enlace en la portada; el orden es primero el enlace y después la guarda.

**Lo que NO se tocó y queda dicho.** El texto de entrada de la sección del material sigue diciendo
«tres documentos por idioma» y «dos documentos más», y ya estaba viejo antes de esta columna. Es
prosa de la portada en diez idiomas y no es el alcance de esta entrada.

**Cuándo cierra.** Cuando ese commit se empuje y la hoja esté alcanzable desde la portada en
producción, que es lo que piden P3 y P4. No se cierra con el commit en la máquina: esa es la
diferencia que D-057 dejó escrita.

**Evidencia de cierre (2026-10-26), medida contra producción y no contra el clon.** El empujón
disparó el despliegue del portal, que cerró en verde, y después se le preguntó al servidor:

```
$ node -e "fetch de las portadas y de la hoja, contando enlaces"
  200    70223  enlaces a la hoja: 8   https://yujin.app/urazuke/
  200    70338  enlaces a la hoja: 8   https://yujin.app/urazuke/en/
  200    56025  enlaces a la hoja: 8   https://yujin.app/urazuke/ja/
  200    23126                         https://yujin.app/urazuke/docs/PREGUNTAS_AL_PROVEEDOR.html
  200    15146                         https://yujin.app/urazuke/docs/ja/PREGUNTAS_AL_PROVEEDOR.html

$ el mapa del sitio servido
  https://yujin.app/sitemap.xml -> 200, 98 urls de urazuke, 8 de la hoja
```

Las ocho celdas están en cada una de las diez portadas servidas, los ocho documentos contestan 200
y el mapa del sitio en producción lleva las ocho direcciones. Eso es P3 (se llega desde la portada
en el idioma de cada uno), P4 (enlazado y en el mapa) y P8 (está antes de la reunión, no después).

Y la vuelta del método lo confirmó desde el otro lado, en la corrida de publicación `40401061974`,
que es la primera vez que el guardián de huérfanas dice cero con contenido real y no con un
fixture:

```
documentos generados: 84 | enlazados desde una portada: 84 | en el mapa del sitio: 84
huerfanas: comprobado -- 84 documentos, 0 huerfanos, 0 fuera del mapa
```

**Depende de:** nada. `PND-043` ya está cerrado; esto es la mitad que vive en el otro repositorio.

---

## PND-058 — La portada promete cinco documentos por idioma y su tabla tiene diez *(lo encontró la revisión semántica)*

- **Nodo:** `interfaz-publica/portada` [nodo propuesto]
- **Grupo:** G-ALCANCE · **Severidad:** avisa · **Quién decide:** se hace y se reporta
- **Repositorio:** portal · **Estado: en curso** (reescrito y horneado el 2026-10-27, con su
  trinquete; esperando el empujón, que es del dueño)

**Qué está mal.** La entrada de la sección del material (`material.lede`) dice «Tres documentos por
idioma» y «desde la versión 5, dos documentos más por idioma». La tabla que sigue, en la misma
sección, tiene **diez** columnas de documento: documento principal, contratos de peldaño,
manual-curso, referencias, camino evolutivo, curso parte 2, junior, en equipo, anexo de heurísticas
y preguntas al proveedor. Un lector que le cree a la entrada y no cuenta las columnas no se entera
de que existen el Anexo H en su idioma ni la hoja de las veinticinco preguntas.

**Cómo apareció.** No lo trajo nadie de afuera: salió de leer las 245 cadenas de cada idioma contra
las castellanas para `PND-026` a `PND-034`. Es un defecto del **castellano**, así que los nueve
idiomas lo repiten fielmente y ninguna de las nueve entradas lo cubre.

**Mi reproducción (2026-10-27).** `material.lede` nombra tres documentos más dos; las claves
`material.col2` a `material.col11` son diez. La columna más nueva —la hoja de las veinticinco
preguntas— la agregué yo el 2026-10-26 y no revisé el párrafo que presenta la tabla, que ya estaba
viejo desde la versión en que entraron el junior, el trabajo en equipo y el anexo.

**Criterio de aceptación por perfil.**

- *P3 (lector humano que llega por la portada):* dado un lector en cualquiera de los diez idiomas,
  lo que la entrada promete es exactamente lo que la tabla lista, y el número no hay que contarlo.
- *P4 (rastreador que no ejecuta JavaScript):* sin cambio; esto es texto horneado en las diez
  páginas.

**Lo que cuesta, dicho porque cambia la forma del arreglo.** La frase vive en los diez catálogos de
la interfaz, así que se reescribe una vez en castellano y nueve veces traducida, y se hornea. Y
conviene escribirla **sin número** —«los documentos que la tabla lista»— para que la próxima columna
no vuelva a dejar la entrada vieja: es la misma lección que D-067 dejó para la lista de idiomas, que
ahora vive una sola vez.

**Lo que se escribió el 2026-10-27, y por qué NO es lo que este criterio pedía.** La entrada de
arriba decía que la frase convenía escribirla sin número. Se escribió **con** número y nombrando
los diez documentos, en el orden de la tabla, en los diez idiomas. La razón, dicha para que se
pueda discutir: el valor de ese párrafo para el lector es que explica *qué es* cada documento —«la
tesis, el relevamiento de los tres sistemas, los veinticuatro peldaños, los fallos reales y el
glosario»—, y una frase sin número del tipo «los documentos que la tabla lista» no dice nada que la
tabla no diga ya. Así que se eligió el texto útil y se pagó el precio con una guarda en vez de con
una promesa de acordarse.

**El trinquete, que es la parte que impide que vuelva a pasar.** Nada puede leer la prosa del
párrafo contra el marcado de la tabla: una es prosa en diez idiomas y la otra son once celdas. Lo
que **sí** puede hacer una máquina es negarse a que la cuenta de columnas cambie en silencio, y eso
es lo que entró como comprobación 10 de `build/verify-urazuke-homes.mjs`, con la cuenta declarada
(`COLUMNAS_DECLARADAS = 11`: una de idioma y diez de documento). Agregar o sacar una columna la pone
en rojo nombrando los diez catálogos que hay que volver a leer. Y trae su rojo deliberado, que es la
décima mutación de `build/redproof-urazuke-homes.mjs`:

```
ROJO  una columna de la tabla del material se va sin avisar  exit=1
      - [index.html] the material table has 10 columns and this verifier declares 11:
        re-read material.lede in the 10 catalogues ...
mutaciones: 10  rojos: 10
PRUEBA EN ROJO OK
```

Queda dicho qué **no** guarda, para no parir otra guarda dormida: no verifica que el párrafo diga la
verdad, ni que los diez nombres sean los diez títulos. Eso lo lee una persona. Lo único que
garantiza es que la próxima columna no pueda aterrizar sin que alguien tenga que mirar el párrafo.

**Depende de:** nada.

---

# Abiertos — G-IDIOMA: leer el método en mi idioma

## PND-016 — La interfaz está en diez idiomas y el corpus en ocho *(era U-15)*

- **Nodo:** `corpus/idiomas` [nodo propuesto]
- **Grupo:** G-IDIOMA · **Severidad:** bloquea · **Repositorio:** los dos · **Estado: abierto**
- **Decisión del dueño (2026-10-24): opción (a) — traducir el corpus a árabe e hindi y quedar en
  DIEZ en todas partes.** Es la decisión más cara del backlog y es suya; mi recomendación escrita
  había sido la (b), quedarse en ocho con la marca honesta. Queda anotado que la recomendación no
  se siguió, con sus razones a la vista, porque el costo permanente es el que va a aparecer en
  cada cambio futuro del método.

**Qué está mal.** Un lector árabe o hindi recibe la portada completa y correcta en su idioma, con
la dirección de lectura bien puesta, y una tabla de material que le ofrece ocho idiomas entre los
que no está el suyo. La interfaz promete algo que el corpus no tiene.

**Evidencia del auditor.**

> · El i18n de la portada tiene DIEZ idiomas completos: ar, de, en, es, fr, hi, it, ja, pt, zh.
>   Los diez tienen las 241 claves, cero faltantes, cero vacías. Lo comprobé archivo por archivo.
> · El corpus del método tiene OCHO: es (docs/), en, pt, fr, de, it, ja, zh. No hay docs/ar/ ni
>   docs/hi/, ni en el repositorio ni en docs/html/, ni en el portal.
> · Producción sirve https://yujin.app/urazuke/i18n/ar.json con 200.

**Mi reproducción (2026-10-24).** Las 241 claves en los diez archivos, cero faltantes, cero
vacías, comprobado archivo por archivo:

```
ar  claves 241  faltan 0  vacias 0
de  claves 241  faltan 0  vacias 0
en  claves 241  faltan 0  vacias 0
es  claves 241  faltan 0  vacias 0
fr  claves 241  faltan 0  vacias 0
hi  claves 241  faltan 0  vacias 0
it  claves 241  faltan 0  vacias 0
ja  claves 241  faltan 0  vacias 0
pt  claves 241  faltan 0  vacias 0
zh  claves 241  faltan 0  vacias 0
```

**Los números contados, no estimados** (el corpus son 34 documentos por idioma: el documento
principal, las referencias, los 24 contratos de peldaño, el camino evolutivo-correctivo, las dos
partes del manual-curso, el del junior, el del trabajo en equipo y el anexo de heurísticas):

| idioma | documentos | caracteres |
|---|---:|---:|
| castellano (fuente) | 34 | 822.100 |
| inglés | 34 | 743.678 |
| portugués | 34 | 812.728 |
| francés | 34 | 898.048 |
| alemán | 34 | 911.657 |
| italiano | 34 | 847.581 |
| japonés | 34 | 443.038 |
| chino | 34 | 368.095 |

Agregar dos idiomas son **68 documentos nuevos** y del orden de **1,5 a 1,8 millones de
caracteres** de texto traducido.

**El costo que no está en esa tabla, y que la decisión asume.** La regla del método dice que un
cambio en el castellano se replica en todas las traducciones **en el mismo commit**: pasar de ocho
a diez encarece **cada cambio futuro en un 25%, de forma permanente**. Y hay un costo escondido:
el árabe se lee al revés, el conversor no lo contempla, y la etiqueta del bloque que precede a cada
prompt se reconoce por idioma, así que hay que enseñarle **dos formas nuevas**.

**Especificación del trabajo.**

1. `docs/ar/` y `docs/hi/` con los 34 documentos cada uno.
2. Soporte de lectura de derecha a izquierda en `build/md2html.mjs` (`lang="ar" dir="rtl"`) y las
   dos formas nuevas de la etiqueta del bloque "antes de enviar el prompt" en `RE_ANTES`.
3. `build/prompts.mjs` verifica los prompts en **diez** idiomas, no en ocho, y falla si una
   traducción alteró la pieza inglesa.
4. La tabla de material de la portada ofrece diez idiomas.
5. Y lo que arrastra PND-019, que es el paso que se descubre en rojo si no se planifica.

**Criterio de aceptación por perfil.**

- *P3 (lector humano):* dado un lector árabe o hindi, esta persona encuentra el documento principal
  y los contratos en su idioma, con la dirección de lectura correcta, desde la tabla de material.
- *P4 (rastreador):* dado el perfil rastreador, hay una portada estática por idioma, también para
  esos dos.

**Depende de:** nada para arrancar. **Arrastra:** PND-019 (la frase de los idiomas está adentro de
la huella) y condiciona PND-011 (diez catálogos de textos, no ocho) y PND-018 (las portadas por
idioma).

---

## PND-017 — Error de traducción en italiano: "tre tramonti" *(era U-17, primera parte)*

- **Nodo:** `interfaz-publica/portada` [nodo propuesto]
- **Grupo:** G-IDIOMA · **Severidad:** bloquea · **Quién decide:** se hace y se reporta
- **Repositorio:** portal · **Estado: CERRADO** el 2026-10-24.

**Qué está mal.** Dos errores en cuatro palabras, en la única traducción errónea que apareció en
2.410 cadenas.

**Evidencia del auditor.**

> it.json, clave what.is.li2: "Ventiquattro gradini in tre tramonti". Dos errores en cuatro
> palabras: "tre" donde los otros nueve idiomas dicen cuatro, y "tramonti", que en italiano son
> atardeceres — el falso amigo de "tramo". Y el propio it.json ya traduce bien la misma idea en
> ladder.h2: "quattro fasi". Corregí a "in quattro fasi" para que el archivo sea coherente consigo
> mismo.

**Mi reproducción (2026-10-24).** Confirmado, y confirmado también que el archivo se contradice
consigo mismo:

```
it what.is.li2: "Ventiquattro gradini in tre tramonti, ciascuno con un contratto: ..."
it ladder.h2:   "Ventiquattro gradini, quattro fasi, nell'ordine in cui si salgono."
```

Los otros nueve dicen cuatro, cada uno en su idioma (verificado en los diez archivos).

**Criterio de aceptación por perfil.**

- *P3 (lector italiano):* dado un lector italiano, esta persona lee la misma cantidad de tramos en
  los dos lugares de la portada donde se nombra, y la palabra que lee significa *tramo*.

**Cómo se verifica.**
`node -e "const d=require('./i18n/it.json');console.log(d['what.is.li2'])"` → *quattro fasi*.

**Actualización del 2026-10-24: al cerrar PND-020 este hallazgo empeoró, y conviene decirlo.**
Hasta hoy el error vivía sólo en el catálogo y lo leía quien ejecutara JavaScript. Desde la
publicación de las portadas por idioma está **horneado en una página estática**, que es
precisamente la que leen los rastreadores que no ejecutan nada:

```
curl -s https://yujin.app/urazuke/it/ | grep tramonti
  Ventiquattro gradini in tre tramonti, ciascuno con un contratto: ...
```

El arreglo sigue siendo de una línea en el catálogo, pero ahora exige además **volver a hornear**
la portada italiana y publicarla. Quedó primero en la fila del grupo de idiomas.

**Depende de:** PND-020 *(cerrado)*.

**Cómo se cerró (2026-10-24).** Se corrigió el catálogo y se volvió a hornear la portada italiana,
que es lo que el agravamiento de arriba exigía: una línea en el catálogo no alcanzaba desde que el
texto viaja dentro de una página estática. Medido en producción después del commit `63682dd`:

```
https://yujin.app/urazuke/it/        HTTP 200, 70771 bytes
  tramonti        0
  quattro fasi    2

horneado en la página:
  Ventiquattro gradini in quattro fasi, ciascuno con un contratto: contesto, prompt,
  risultato atteso, verifica, segnali d'allarme.

https://yujin.app/urazuke/i18n/it.json
  what.is.li2 = Ventiquattro gradini in quattro fasi, ciascuno con un contratto: ...
  ladder.h2   = Ventiquattro gradini, quattro fasi, nell'ordine in cui si salgono.
```

**Criterio por perfil, verificado.** *P3 (lector italiano):* los dos lugares de la portada donde se
nombra la cantidad dicen **cuatro**, y la palabra que se lee es *fasi*, que significa tramo, no
*tramonti*, que son atardeceres. El archivo ya no se contradice consigo mismo.

**Lo que no cierra con esto.** Esta entrada era la primera parte de U-17. La segunda —la revisión
**semántica** de los nueve idiomas, buscando más falsos amigos y más números que no coincidan— son
PND-026 a PND-034 y siguen abiertas. Y se agrandaron un poco: las tres cadenas nuevas que este
trabajo agregó a los diez catálogos (el anexo, el documento de compuertas, la interfaz de datos)
las escribió el agente y nadie las revisó. El castellano, el inglés y las latinas se sostienen; el
japonés, el chino, el árabe y el hindi entran en esa revisión.

---

## PND-018 — Las nueve portadas por idioma existen y no están publicadas *(era U-18)*

- **Nodo:** `interfaz-publica/portada` [nodo propuesto]
- **Grupo:** G-IDIOMA · **Severidad:** bloquea · **Quién decide:** se hace y se reporta
- **Repositorio:** portal · **Estado: CERRADO** el 2026-10-24.

**Qué estaba mal.** Había un conjunto entero de páginas estáticas terminadas que nadie podía ver.

**Evidencia del auditor.**

> localmente hay ar/, de/, en/, fr/, hi/, it/, ja/, pt/, zh/, cada uno con su index.html (el árabe
> correctamente con lang="ar" dir="rtl"), y en producción:
> ```
> https://yujin.app/urazuke/ar/ -> 404
> https://yujin.app/urazuke/hi/ -> 404
> ```
> Es un conjunto entero de páginas estáticas que nadie puede ver. Para un rastreador que no
> ejecuta JavaScript, esas páginas son la única forma de leer el método en su idioma, porque la
> portada única depende del conmutador en el navegador. Averiguá por qué no se publicaron y
> publicalas, o explicame por qué no corresponde.

**Mi reproducción (2026-10-24), y la respuesta a "averiguá por qué".**

```
https://yujin.app/urazuke/ar/   404
https://yujin.app/urazuke/hi/   404
```

**No hay ninguna tubería rota: hay trabajo terminado y nunca commiteado.** En el árbol del portal,
sin agregar al control de versiones, están los nueve directorios (`ar de en fr hi it ja pt zh`),
más el generador que los produce, el verificador que los comprueba y el contrato escrito de esa
pieza. Y modificados sin commitear, el `index.html` de la portada y el mapa del sitio. Cero
commits locales por empujar; el remoto va dos adelante, que son las publicaciones automáticas del
método.

**Criterio de aceptación por perfil.**

- *P4 (rastreador):* dado el perfil rastreador sin JavaScript, esta persona puede leer la
  presentación del método en cada uno de los idiomas, cada uno en su propia dirección, sin
  ejecutar el conmutador.
- *P3:* dado el perfil lector, la dirección en su idioma responde con éxito.

**Cómo se verifica.** `curl -s -o /dev/null -w "%{http_code}" https://yujin.app/urazuke/ar/` → 200.

**Depende de:** PND-020. Es el mismo evento: una publicación que no se hizo.

**Evidencia de cierre (2026-10-24), medida contra producción después de publicar.** Las diez
direcciones responden, y cada página declara su idioma y su dirección de escritura:

```
200  https://yujin.app/urazuke/        200  https://yujin.app/urazuke/it/
200  https://yujin.app/urazuke/ar/     200  https://yujin.app/urazuke/ja/
200  https://yujin.app/urazuke/de/     200  https://yujin.app/urazuke/pt/
200  https://yujin.app/urazuke/en/     200  https://yujin.app/urazuke/zh/
200  https://yujin.app/urazuke/fr/
200  https://yujin.app/urazuke/hi/

https://yujin.app/urazuke/ar/  ->  <html lang="ar" dir="rtl">
https://yujin.app/urazuke/en/  ->  <html lang="en" dir="ltr">
```

El mapa del sitio de producción lista **16** direcciones, **10** de ellas del método: las nueve
portadas por idioma más la castellana. Antes listaba siete, una sola del método.

**Lo que hubo que arreglar antes de publicar, y no estaba en el hallazgo.** El verificador de esa
pieza estaba en **rojo con 98 problemas**, y fallaban las mismas diez comprobaciones en los diez
idiomas, el castellano incluido — que es la fuente de su propio catálogo. Lo que estaba mal era la
comparación, no las páginas: castigaba al generador por obedecer su contrato, en las flechas (el
catálogo las escribe como entidad y la página sirve el carácter) y en las direcciones de los
enlaces (el contrato le exige reescribirlas en las páginas por idioma). Se corrigió comparando
sentido en lugar de letra. Al relajar la comparación de enlaces apareció un agujero real: el
verificador dejaba pasar una página que llevara al lector al documento **del idioma equivocado**,
porque ese archivo existe. Se cerró con una comprobación nueva que importa el mapa de idiomas
**del generador** en vez de copiarlo, para que no puedan separarse con el tiempo.

**El verde se vio caer primero, y la prueba en rojo encontró un sexto problema que nadie había
visto.** Al dejar la prueba escrita como pieza repetible — `build/redproof-urazuke-homes.mjs`, que
copia el árbol a un temporal, lo mutila de cinco maneras y exige que el verificador caiga cada vez
— **una de las cinco pasó en verde**: borrarle el `<main>` entero a una página, **48.904 bytes de
las 67.616 que tiene**, y el verificador decía PASS.

```
ROJO  idioma equivocado en el atributo   exit=1
VERDE estructura perdida                 exit=0   <-- el agujero
ROJO  enlace al idioma equivocado        exit=1
ROJO  pagina sin hornear                 exit=1
ROJO  archivo equivocado                 exit=1
```

No era un falso positivo de la prueba: el verificador comprobaba que **lo que estaba** estuviera
bien horneado, enlazado, canónico y recíproco, y nunca que **estuviera todo**. Una página con el
cuerpo vaciado conserva sus cabeceras, su `canonical`, sus diez `hreflang` y un puñado de cadenas
correctamente horneadas, así que pasaba las siete comprobaciones. Y es exactamente el fallo que
esta pieza existe para impedir, porque la página horneada es **lo único** que lee un rastreador sin
JavaScript.

Se cerró con la comprobación **2b**: cada página tiene que llevar las **241** claves del catálogo
castellano, no un subconjunto bien traducido. Verificado antes de escribirla que las diez páginas
llevan hoy exactamente esas 241, así que la comprobación no inventa un requisito nuevo: declara el
que ya se cumplía sin estar escrito. Con ella, la mutación cae diciendo qué pasó:

```
[/urazuke/pt/] the page lost 223 of the 241 catalogue keys -- content is missing,
not mistranslated (first: hero.eyebrow, hero.h1, hero.lede, hero.author, hero.cta1)
```

Las cinco mutaciones caen ahora, y el árbol queda restaurado: la prueba trabaja sobre copias
temporales y no toca lo publicado. Idempotencia comprobada: dos corridas seguidas del generador dan
el mismo árbol, así que lo publicado es lo que el generador produce hoy y no material rancio.

**Una corrección, porque se dijo antes de medirlo.** Al reportar la publicación se afirmó que las
cinco mutaciones caían. Eran **cuatro**. La afirmación se hizo sin la prueba escrita, y la prueba
escrita la desmintió — que es precisamente para lo que el método exige que el rojo sea un recibo y
no un relato. Queda acá y no como nota al pie.

**Por qué nunca se había publicado, en una línea:** el contrato de esa pieza le prohíbe
explícitamente a quien la ejecuta hacer commit o publicar, porque la rama principal de ese
repositorio **no está protegida** (verificado) y un empujón despliega en caliente. El trabajo se
detuvo exactamente donde el contrato dice que se detenga. No hubo olvido ni tubería rota: faltaba
la compuerta humana.

**Commit:** `pkuschnirof/rpaforce` `5d29f79`, 16 archivos, empujado a `main` por el dueño el
2026-10-24. Verificado además que la publicación automática del método **no** borra estas
portadas: sólo vacía `urazuke/docs/` y `urazuke/api/`.

**Lo que queda por empujar en el portal, y por qué no se empujó solo:** la comprobación 2b y la
prueba en rojo son posteriores al commit publicado y están sin commitear en el árbol del portal.
No cambian ninguna página — el verificador sigue dando PASS sobre lo que ya está en producción —
así que lo publicado no está en riesgo; lo que falta es el guardián, no el contenido. Y el mismo
contrato que detuvo la publicación anterior lo detiene: en ese repositorio la rama principal no
está protegida y un empujón despliega en caliente, así que el commit es del dueño.

**Recibos:** RCP-026 (verde: verificador PASS 10/10), RCP-027 (mutación: 5 de 5 en rojo con la
comprobación 2b; 4 de 5 sin ella), RCP-028 (regresión: la cadena del método, 169 pruebas, 0
fallos).

---

## PND-019 — La historia de los idiomas está en más lugares de los que parece, y dos están adentro de la huella *(era U-16)*

- **Nodo:** `corpus/idiomas`, `interfaz-publica/api` [nodos propuestos]
- **Grupo:** G-IDIOMA · **Severidad:** bloquea · **Quién decide:** se hace y se reporta
- **Repositorio:** los dos · **Estado: CERRADO** el 2026-10-27 del lado del método; las cuarenta
  cadenas de la portada quedan nombradas y son del otro repositorio.

**Qué está mal.** La afirmación "ocho idiomas" está en más lugares de los que parece, y dos de
ellos están **protegidos por la huella** de los archivos publicados, así que corregir una oración
es mecánicamente subir dos versiones declaradas.

**Evidencia del auditor.**

> · en el i18n de la portada, cuatro claves × diez locales = cuarenta cadenas: meta.description,
>   hero.trust2, material.eyebrow y closing.p;
> · en el README del repositorio y en la prosa del documento principal;
> · y ACÁ ESTÁ LO QUE SE PUEDE ROMPER: en los DOS archivos publicados. gates.json dice en
>   languages.note "translated into seven more languages" y prompts.json dice "identical in the
>   eight versions of the method". La clave `languages` está dentro de hash_covers en los dos
>   archivos: lo verifiqué. Así que tocar la historia de los idiomas CAMBIA LA HUELLA de los dos,
>   y por D-053 obliga a subir catalog_version y corpus_version y a anotar las dos entradas nuevas
>   en el changelog, que es append-only. Si no lo hacés, la publicación se niega con E_VERSION, que
>   es exactamente para lo que ese chequeo existe. Ponelo en el backlog como paso explícito, no
>   como consecuencia que alguien descubre en rojo.

**Mi reproducción (2026-10-24).** Las cuatro claves existen en los diez locales: **40 cadenas**.
En castellano dicen, por ejemplo, `hero.trust2: "· Ocho idiomas"` y
`material.eyebrow: "Todo el material, en ocho idiomas"`. Y en lo publicado:

```
hash_covers: schema_version, catalog_version, languages, evaluators, evaluator_semantics,
             compatibility, tramos, steps, stations, loop_entry, heuristics, adapters, project_config
languages.note: "The prose of the method (docs/) is written in Spanish and translated into
                 seven more languages. ..."
```

`languages` está **adentro** de `hash_covers`: confirmado. Es el hallazgo de más valor económico
de la auditoría, porque encontrarlo antes del rojo es la diferencia entre un paso planificado y
una publicación que se niega sin que nadie entienda por qué.

**Especificación del paso, explícito y en este orden.**

1. Cambiar la prosa en los dos archivos publicados (`languages.note` en las compuertas, la frase
   de las ocho versiones en los prompts).
2. **Subir** `catalog_version` y `corpus_version`.
3. Anotar **las dos entradas nuevas** en sus registros, que son append-only, sin tocar las
   huellas ya publicadas.
4. Las 40 cadenas del i18n de la portada, el README y la prosa del documento principal, en el
   mismo commit que el castellano, en las traducciones.

**Y una pieza conceptual que va acá, no en otro lado.** Hoy son ocho idiomas porque se heredaron
de la lista del protocolo, y esa lista ya tiene diez: la frase "los ocho idiomas de NAC3", que
aparece en el README y en el documento principal, **quedó vieja sola**. El método declara **sus**
idiomas, por su cuenta; si coinciden con los de un protocolo, es coincidencia y no definición.
Cortar esa dependencia conceptual es casi gratis y refuerza justo el argumento de PND-022.

**Criterio de aceptación por perfil.**

- *P1, P2:* dada una herramienta consumidora, lo que el archivo dice sobre sus idiomas es verdad y
  está protegido por la huella que esa herramienta recalcula.
- *P3, P4:* dado el perfil lector o rastreador, el número de idiomas que lee en la portada, en el
  README y en el documento principal es el mismo.
- *P5:* dado el perfil auditor, cada versión nueva tiene su entrada en el registro con la huella
  que produjo, y ninguna entrada anterior se editó.

**Cierre (2026-10-27): hecho del lado del método, y la pieza conceptual es la que más valía.** El
paso explícito se corrió en el orden que esta entrada escribió, que es el único orden en que no
termina en un rojo que nadie entiende.

1. La prosa de los dos archivos publicados dejó de llevar la **cuenta**. `languages.note` de las
   compuertas ya no dice «translated into seven more languages» y los prompts ya no dicen
   «identical in the eight versions»: los dos apuntan a una lista que el método declara **una sola
   vez**, `languages.prose_versions`, con su `prose_versions_what` al lado. Agregar un idioma ahora
   cambia un arreglo y **ninguna oración**. Era la forma de este defecto: la afirmación vivía en
   una nota, en el corpus de prompts, en dos README, en la prosa del documento principal y en
   cuarenta cadenas de una portada, así que corregir una oración costaba dos versiones declaradas.
2. Subieron las dos versiones: `2026.10.5 -> 2026.10.6` y `2026.10.3 -> 2026.10.4`.
3. Las dos entradas nuevas quedaron anotadas en sus registros append-only con la huella que
   produjeron (`649f10179cc1` y `8e69d1189be9`), sin tocar ninguna huella ya publicada.
4. La prosa: **dieciséis** lugares, los ocho README y el documento principal en los ocho idiomas,
   en el mismo commit. «Los ocho idiomas de NAC3» pasó a «los ocho idiomas **que el método declara
   por su cuenta**», con su equivalente en inglés, portugués, francés, alemán, italiano, japonés y
   chino. Medido después: cero ocurrencias de la frase heredada en el corpus, y la única que queda
   en el repositorio es la que esta entrada cita como evidencia.

**La pieza conceptual, que es por la que esto importaba más de lo que parecía.** Hoy son ocho
idiomas porque se heredaron de la lista de un protocolo, y esa lista ya tiene diez: la frase
**quedó vieja sola**, sin que nadie la tocara. El método declara **sus** idiomas; si coinciden con
los de un protocolo, es coincidencia y no definición. Cortar esa dependencia costó una frase por
idioma y es exactamente el argumento que `PND-022` defiende: el método se sostiene sin el
protocolo y sin la herramienta.

**El número no se movió, y eso es a propósito.** Siguen siendo ocho. Pasar a diez es `PND-016`, que
es la decisión más cara del backlog y está abierta; lo que este cambio hace es que ese día cueste
un arreglo y no una cacería de oraciones.

**Lo que NO entró, nombrado y no omitido.** Las **cuarenta cadenas** del i18n de la portada
—cuatro claves por diez locales— viven en el repositorio del portal, que es otro árbol con otro
despliegue. Quedan pendientes ahí, y conviene que entren junto con `PND-016`, porque es el cambio
que les va a mover el número.

**Depende de:** PND-016 (la decisión de los diez idiomas es la que fija el número) y va junto con
PND-010 en el mismo cambio de versión.

---

# Abiertos — G-PUBLICACION: que lo servido sea lo último

## PND-020 — Producción está atrasada y se contradice sola *(era U-19)*

- **Nodo:** `cadena/publicacion` [nodo propuesto]
- **Grupo:** G-PUBLICACION · **Severidad:** bloquea · **Quién decide:** se hace y se reporta
- **Repositorio:** portal · **Estado: CERRADO** el 2026-10-24.

**Qué estaba mal.** La página servida decía "tres tramos" sin JavaScript y "cuatro tramos" con
JavaScript, y la copia local no tiene el error. No hay contenido que arreglar: hay una publicación
que destrabar.

**Evidencia del auditor.**

> · producción sirve index.html de 65.491 bytes y contiene "tres tramos";
> · la copia local tiene 68.450 bytes y NO lo contiene;
> · producción sirve i18n/es.json que dice "cuatro tramos".
>
> El "tres tramos" es el texto de respaldo escrito a mano dentro del elemento what.is.li2: el que
> lee todo lo que no ejecuta JavaScript. Con JavaScript la página dice cuatro; sin JavaScript dice
> tres. Y el robots.txt invita por nombre a los rastreadores de inteligencia artificial, que son
> justamente los que no lo ejecutan. Eso explica, probablemente, por qué un asistente ajeno leyó
> mal el método: le llegó la versión vieja.

**Mi reproducción (2026-10-24), y es peor de lo que el auditor escribió: la misma página se
contradice.**

```
producción index.html: 65.491 bytes
  "tres tramos"    1
  "cuatro tramos"  1

  <li data-i18n="what.is.li2">Veinticuatro peldanos en tres tramos, …</li>
  <h2 data-i18n="ladder.h2">Veinticuatro peldanos, cuatro tramos, en el orden en que se suben.</h2>

copia local: 68.450 bytes, "tres tramos" 0
```

El árbol del portal tiene ese `index.html` **modificado y sin commitear**, junto con el mapa del
sitio y las nueve portadas por idioma. Cero commits locales por empujar: es trabajo terminado que
nunca se commiteó. Y explica, con mucha probabilidad, por qué un asistente ajeno leyó mal el
método: le llegó la única portada que existe publicada, la vieja.

**Criterio de aceptación por perfil.**

- *P4 (rastreador):* dado el perfil rastreador sin JavaScript, esta persona lee **cuatro** tramos,
  igual que quien sí lo ejecuta.
- *P3:* dado el perfil lector, la página no se contradice consigo misma.

**Cómo se verifica.** `curl -s https://yujin.app/urazuke/ | grep -c "tres tramos"` → 0.

**Es precondición de:** PND-003, PND-014, PND-015, PND-017, PND-018 y la parte de portada de
PND-022. Todo el trabajo de portada se apoya en destrabar esto primero, porque si no se publica
sobre una versión vieja.

**Evidencia de cierre (2026-10-24), medida contra producción después de publicar.**

```
producción index.html: 68.904 bytes
  "tres tramos"    0
  "cuatro tramos"  2

copia local:           68.450 bytes
diferencia:            una sola línea, el script de medición que inyecta el hosting
                       (secureserver.net / tccl.min.js). Contenido idéntico.
```

Los dos lugares donde la portada nombra la cantidad dicen ahora lo mismo, y lo dicen **sin
JavaScript**: el texto de respaldo horneado dentro del elemento ya no se contradice con el que
pinta el conmutador. Es lo que lee un rastreador de los que el `robots.txt` de la raíz invita por
nombre.

**La publicación no movió nada de la interfaz pública**, comprobado en la misma vuelta:

```
node build/portal_verify.mjs --rondas 1
  gates.json:   coincide -- HTTP 200, 100112 bytes, version 2026.10.3, huella 0f3c1b472f92
  prompts.json: coincide -- HTTP 200,  64161 bytes, version 2026.10.1, huella 3459750db1d7
  Produccion sirve las dos huellas: publicado y verificado.
```

**Antes de publicar, el árbol del portal estaba tres commits atrasado** respecto del remoto — eran
publicaciones automáticas del método — y se puso al día sin tocar el trabajo pendiente.

**Commit:** `pkuschnirof/rpaforce` `5d29f79`, el mismo que PND-018: son el mismo evento.

---

## PND-037 — La prueba en rojo del verificador de portadas mira un árbol clavado a una ruta local *(hallazgo del método, no de la auditoría)*

- **Nodo:** `cadena/verificacion` [nodo propuesto]
- **Grupo:** G-PUBLICACION · **Severidad:** registra · **Quién decide:** se hace y se reporta
- **Repositorio:** portal · **Estado: CERRADO** el 2026-10-26, a la tercera. Se
  cerró, **se reabrió el mismo día** —su evidencia era un commit en el clon del portal, sin empujar,
  y lo que sus criterios piden no pasa hasta que ese commit esté empujado— y cerró de verdad cuando
  el empujón ocurrió y el despliegue del portal corrió dejando sus líneas en el registro de la
  corrida. Esa vuelta de más es la distinción que D-057 dejó escrita, aplicada a la contabilidad del
  propio registro: un commit en la máquina no es un efecto en producción.
- **Origen:** apareció al cerrar PND-022, cuando la prueba en rojo pasó en verde sin haber visto
  el cambio que estaba al lado.

**Qué está mal.** `build/redproof-urazuke-homes.mjs` es la prueba en rojo del verificador de las
diez portadas: copia el árbol del portal a un temporal, lo mutila de nueve maneras y exige que el
verificador caiga nombrando cada problema. El árbol que copia está escrito a mano como una **ruta
absoluta de una máquina** (`const SRC = 'C:/RPAForce/web'`), que no es la copia de trabajo donde
el programa vive. Así que la prueba puede dar las nueve en rojo —y decir "PRUEBA EN ROJO OK"— sin
haber mirado ni una vez el árbol que alguien está por publicar.

**Mi reproducción (2026-10-26).** Medido mientras se cerraba PND-022, con trece cadenas nuevas ya
puestas en los diez catálogos de este árbol:

```
node build/redproof-urazuke-homes.mjs             (tal cual esta)
  ROJO estructura perdida ... the page lost 226 of the 244 catalogue keys
  mutaciones: 9  rojos: 9   PRUEBA EN ROJO OK

el mismo programa, con SRC apuntado a este arbol
  ROJO estructura perdida ... the page lost 239 of the 257 catalogue keys
  mutaciones: 9  rojos: 9   PRUEBA EN ROJO OK
```

Las dos corridas dicen OK. La primera cuenta 244 claves, que es lo que tenía la **otra** copia; la
segunda cuenta 257, que es lo que tiene esta. El verde no distingue entre "el verificador guarda
este árbol" y "el verificador guarda un árbol cualquiera que había en el disco". Es el defecto de
D-057 en otra escala —un verde que no midió lo que uno cree que midió— y el primo de PND-001, donde
el guardián de línea de comandos acertaba sólo en un sistema operativo y dos pasos de la cadena
corrían en vacío, en verde.

**Hay un segundo síntoma de la misma familia, y conviene arreglarlos juntos.** El generador de las
portadas reescribe `yujin.app/sitemap.xml`, y su barrido de las direcciones viejas sólo entiende
finales de línea de Unix. Medido el mismo día, sobre la misma copia:

```
sitemap.xml en disco con CRLF (lo que da una copia de trabajo en Windows con core.autocrlf=true):
  node build/prerender-urazuke.mjs  ->  91 lineas vacias; el commiteado tiene 1
el mismo archivo convertido a LF:
  node build/prerender-urazuke.mjs  ->   1 linea vacia  (identico al commiteado)
```

No cambia ninguna dirección —las noventa siguen, y el verificador pasa igual—, pero deja noventa
líneas de basura en cada regeneración hecha desde Windows, y rompe la promesa del contrato de que
el generador es idempotente y la **única** fuente de esas páginas. Mientras esté así, el sitemap
se restaura a mano después de regenerar, que es exactamente lo que el contrato prohíbe.

**Qué hay que producir.** Que el árbol de la prueba en rojo salga de la ubicación del propio
programa, como ya lo hace el verificador (`resolve(__dirname, '..')`), y no de una ruta escrita a
mano; que el barrido del sitemap entienda los dos finales de línea; y una comprobación que lo
exija, porque un guardián arreglado sin prueba vuelve a romperse en seis meses.

**Criterio de aceptación por perfil.**

- *P5 (auditor):* dado el perfil auditor, la prueba en rojo corrida en cualquier copia del
  repositorio ejercita **esa** copia, y se puede demostrar: cambiar una cadena del árbol y ver que
  la cuenta de la prueba cambia con ella.
- *P4 (rastreador):* dado el perfil rastreador, el mapa del sitio regenerado desde cualquier
  sistema operativo es el mismo archivo.

**Cómo se verifica.** Clonar el repositorio en un directorio nuevo y correr la prueba en rojo sin
tocar nada: tiene que pasar, y la cuenta de claves que imprime tiene que ser la del clon.

**Qué se hizo (2026-10-26).** Las dos cosas que pedía, y una comprobación por cada una, porque un
guardián arreglado sin una prueba que vaya al rojo contra la regresión real vuelve a romperse en
seis meses y nadie se entera.

El árbol de la prueba en rojo ahora sale de la ubicación del propio programa, igual que en el
verificador, y no de una ruta escrita a mano. De paso, la prueba aprendió a decir en voz alta qué
árbol va a mutilar: `node build/redproof-urazuke-homes.mjs --arbol` imprime el árbol y el tamaño de
su catálogo en dos segundos, sin correr las nueve mutaciones, y es el recibo que un auditor puede
leer sin esperar un minuto.

El barrido del mapa del sitio normaliza los finales de línea al leer. No se le agregó una variante
más al patrón: se normaliza una vez, en la lectura, que es lo que hace que el mapa regenerado sea
el mismo archivo desde cualquier sistema operativo —que es la propiedad que el contrato promete— y
no sólo que el barrido no deje basura.

**Evidencia de cierre.** Medido en un clon nuevo del repositorio del portal, sin tocar nada, que es
exactamente lo que este pendiente pedía como verificación:

```
node build/redproof-urazuke-homes.mjs --arbol
  arbol: <el clon>
  catalogos: 10  claves (es): 257          <- las de ESTE arbol, no 244

el mismo clon con una cadena de mas en su catalogo castellano
  catalogos: 10  claves (es): 258          <- la cuenta sigue al arbol, que es el criterio P5

la corrida completa en el clon, sin tocar nada
  ROJO estructura perdida ... the page lost 239 of the 257 catalogue keys
  mutaciones: 9  rojos: 9   PRUEBA EN ROJO OK

node build/prerender-urazuke.mjs en ese mismo clon (sitemap.xml con CRLF, 575 de 575 lineas)
  sitemap.xml already lists all 90 urazuke urls
  y el mapa queda QUIETO: antes se reescribia con 90 lineas vacias de mas
```

Y probado en rojo antes de darlo por bueno, que es lo que vale. Las dos comprobaciones nuevas son
`build/redproof-arbol-propio.mjs` (dos segundos, sin dependencias: copia el árbol a un temporal, le
agrega una clave centinela, y exige que la prueba conteste el temporal con la centinela; después le
vuelve a clavar la ruta a mano y exige que la comprobación lo note) y
`build/redproof-sitemap-eol.mjs` (ocho segundos: regenera el mapa desde un árbol con CRLF y desde
uno con LF y exige el mismo archivo; después le saca la normalización al generador y exige que la
comprobación caiga). Las dos corridas en rojo cayeron:

```
redproof-arbol-propio.mjs
  VERDE ejercita su propio arbol      la copia temporal, 258 claves (con la centinela)
  ROJO  con la ruta clavada a mano    contesto otro arbol con 257 claves, sin la centinela

redproof-sitemap-eol.mjs
  VERDE con CRLF y con LF             identicos: 576 lineas, 2 vacia(s)
  ROJO  sin la normalizacion          666 lineas, 92 vacia(s): 90 lineas de basura
```

**Una cosa que apareció midiendo esto y queda dicha, porque no es lo mismo.** En un clon de
Windows, regenerar deja las diez portadas marcadas como modificadas en el estado del repositorio,
y sin embargo `git diff` no muestra **ninguna** diferencia: lo único que cambió son los finales de
línea, que el control de versiones normaliza al comparar y al guardar. O sea que lo publicado no
cambia —el despliegue baja el árbol commiteado, no la copia de trabajo— y el ruido es sólo del
estado local. Es distinto del caso del mapa del sitio, donde las noventa líneas vacías eran
contenido de verdad y el control de versiones no las normalizaba. No se tocó, a propósito: el
alcance de este pendiente es el mapa, y achicar o agrandar el alcance no es decisión de quien
ejecuta. Si molesta, es un pendiente nuevo de una línea.

**El efecto, medido en la corrida real y no en la máquina (2026-10-26).** El empujón se hizo con
el permiso del dueño y el despliegue del portal (`40400804428`, ubuntu-latest, 34 s, verde) corrió
las tres pruebas en rojo sobre el árbol del runner, que es un clon limpio y no la máquina de nadie,
y cada una dejó su línea exigida en el registro de la corrida:

```
PRUEBA EN ROJO OK: las 9 mutaciones caen y el verificador nombra el problema.
arbol propio: comprobado -- la prueba en rojo mutila el arbol donde vive, y con una ruta
              clavada a mano no lo hace.
eol: comprobado -- el mapa del sitio regenerado es el mismo archivo con CRLF y con LF, y sin
     la normalizacion no lo es.
```

Que esto corra en un clon del runner es la prueba de que el arreglo es el arreglo: con la ruta
clavada a mano, en una máquina donde `C:/RPAForce/web` no existe, la prueba no habría tenido árbol
que mutilar.

**Commit.** En el repositorio del portal, `f72406a`, **empujado el 2026-10-26** dentro de la pila
`7adbd4b..6ea7f38`. **Decisión:** D-060. *(Era `19662f1` cuando se escribió esta entrada. El
2026-10-26 se descartó el commit del párrafo de la portada que tenía debajo —`PND-051`, D-063—, el
enlace de la hoja nueva (`PND-049`) pasó a ir primero para que **cada** commit deje el árbol
desplegable, y este se reescribió encima: mismo contenido, identificador nuevo. Se corrige acá
porque un registro que cita un identificador que ya no resuelve no se puede auditar, que es la razón
de ser del grupo G-TRAZABILIDAD. **Y queda dicho que un identificador de un commit que todavía no se
empujó no es firme**: el que vale para auditar es el que quede en `main` del portal, y hasta
entonces éste nombra una pila local.)*
---

## PND-038 — La compuerta de las portadas existía, estaba bien escrita y no la corría nadie *(hallazgo del método, no de la auditoría)*

- **Nodo:** `cadena/verificacion` [nodo propuesto]
- **Grupo:** G-PUBLICACION · **Severidad:** bloquea · **Quién decide:** se hace y se reporta
- **Repositorio:** portal (su flujo de despliegue) · **Estado: CERRADO** el 2026-10-26, a la tercera. Se
  cerró, **se reabrió el mismo día** —su evidencia era un commit en el clon del portal, sin empujar,
  y lo que sus criterios piden no pasa hasta que ese commit esté empujado— y cerró de verdad cuando
  el empujón ocurrió y el despliegue del portal corrió dejando sus líneas en el registro de la
  corrida. Esa vuelta de más es la distinción que D-057 dejó escrita, aplicada a la contabilidad del
  propio registro: un commit en la máquina no es un efecto en producción.
- **Origen:** apareció el 2026-10-26 al implementar PND-025, y quedó escrito ahí y en D-058 sin
  entrada propia. Se registra ahora, porque un hallazgo que vive sólo en el cierre de otro no es
  parte del plan: es una nota al pie.

**Qué está mal.** `build/verify-urazuke-homes.mjs` es la compuerta que dice si las diez portadas
se pueden publicar, y la regla 4.11 de su contrato no deja lugar a dudas: todo documento que esté
en el disco tiene que estar enlazado desde alguna portada, y *"el verificador falla si no. No
avisa: falla"*. **Nadie la corría.** El flujo de despliegue del portal corría la guarda del
`.htaccess` y nunca ésta, así que la única defensa contra un documento publicado al que nadie
puede llegar era que alguien se acordara de correr un programa a mano, en el otro repositorio.

Y no es un camino raro: es el normal. El trabajo de publicación del método espeja `docs/html/`
dentro de `yujin.app/urazuke/` en **cada** fusión a `main` y **no toca la portada**. O sea que el
método tiene un camino automático para dejar un documento servido y ningún camino automático para
descubrir que quedó sin enlace. Es la misma clase de guarda dormida que PND-001 —donde el guardián
de línea de comandos acertaba sólo en un sistema operativo y dos pasos de la cadena corrían en
vacío— y que D-057, donde una guarda afirmaba un efecto que no había verificado: escrita,
correcta, y sin nadie que la invoque.

**Mi reproducción (2026-10-26).** Leído el flujo de despliegue del portal, paso por paso:

```
.github/workflows/deploy.yml  (push a main)
  Guard -- required secrets present
  Guard -- the deploy still carries the nested .htaccess files   -> verify-deploy-htaccess.mjs
  Pull repo zip + rsync overlay into public_html
  Verify rpaforce.com responds

menciones de verify-urazuke-homes en todo el flujo: 0
menciones de redproof-urazuke-homes  en todo el flujo: 0
```

**Qué hay que producir.** Que el despliegue del portal corra la compuerta, y que corra también la
prueba en rojo que demuestra que la compuerta todavía muerde —porque una compuerta que corre y ya
no distingue nada es el defecto de PND-037 en otra forma—. Y que el paso **exija la línea** que
cada programa imprime: un paso que no imprimió nada no corrió, y su código de salida no prueba
nada (D-057).

**Criterio de aceptación por perfil.**

- *P4 (rastreador):* dado el perfil rastreador, un documento que el método publique y que ninguna
  portada enlace no llega a producción sin que algo lo diga, y no depende de que alguien se
  acuerde.
- *P5 (auditor):* dado el perfil auditor, cada despliegue del portal deja en su registro la línea
  del verificador y la de las pruebas en rojo, así que se puede saber que corrieron y qué vieron.

**Cómo se verifica.** Leer el registro de un despliegue del portal y encontrar las cuatro líneas.
Y colgar un documento sin enlace en una rama de prueba: el despliegue tiene que frenar nombrándolo.

**Qué se hizo (2026-10-26).** Un paso nuevo en el flujo de despliegue del portal, antes de la
copia, que instala **la única dependencia que esos programas usan** (`cheerio`; ver la corrección de
más abajo) y corre la compuerta más las tres pruebas en rojo, exigiendo de cada una el texto que
imprime. Lo que no se hizo, y se dice: no se tocó la guarda del
`.htaccess`, que todavía confía en su código de salida; está fuera del alcance de esta entrada.

**La consecuencia, dicha en voz alta en el propio paso.** Una portada de Urazuke que deje de pasar
ahora **frena ese despliegue, que es el sitio entero**. Es lo que el contrato pide, y lo que frena
—publicar un documento al que nadie puede llegar— es peor que un despliegue demorado; el arreglo es
siempre un enlace en la portada. Queda escrito acá porque es el tipo de acoplamiento que conviene
haber leído **antes** de que frene un despliegue y no después.

**Evidencia de cierre.** El fragmento del paso corrido tal cual, en sus tres caminos, antes de
commitear:

```
(1) todo verde
    PASS -- every page is baked, linked, canonical and reciprocal.
    PRUEBA EN ROJO OK: las 9 mutaciones caen y el verificador nombra el problema.
    arbol propio: comprobado ...
    eol: comprobado ...
    exit=0

(2) un documento huerfano colgado en docs/
    - [index.html] 1 published document(s) that no page links to -- served but
      unreachable: docs/PROBE_HUERFANA.html
    ::error::node build/verify-urazuke-homes.mjs salio en rojo
    exit=1

(3) un programa que sale 0 y NO imprime su recibo
    corri, te lo juro
    ::error::... no imprimio 'PASS -- every page is baked' -- un paso que no
      imprimio nada no corrio
    exit=1
```

El camino (3) es el que importa de verdad: es el que hace que este arreglo no repita el defecto que
vino a arreglar.

**El efecto, medido en la primera corrida real (2026-10-26).** El empujón se hizo con el permiso
del dueño y el despliegue del portal `40400804428` corrió el paso nuevo, en verde, 34 segundos. Las
cuatro líneas que este pendiente pedía encontrar en el registro de un despliegue del portal están
ahí, y no es el relato de que corrió: es lo que imprimió:

```
Guard -- the Urazuke per-language homes pass, and the gate still bites
  added 32 packages in 4s
  Urazuke per-language homes: 10/10 pages on disk (ar, de, en, es, fr, hi, it, ja, pt, zh)
  PRUEBA EN ROJO OK: las 9 mutaciones caen y el verificador nombra el problema.
  arbol propio: comprobado -- la prueba en rojo mutila el arbol donde vive ...
  eol: comprobado -- el mapa del sitio regenerado es el mismo archivo con CRLF y con LF ...
```

Desde esta corrida, la compuerta de las portadas tiene quien la invoque en cada despliegue del
sitio. La defensa contra un documento publicado al que nadie puede llegar dejó de ser que alguien
se acuerde.

**Una corrección al propio arreglo, hecha antes de empujar y medida.** El paso instalaba las **dos**
dependencias del manifiesto de `build/` (`cheerio` y `sharp`) y los cuatro programas que corre usan
**una**: `cheerio`, que `prerender-urazuke.mjs` importa y los otros tres importan a través de él.
`sharp` no lo toca ninguno, es un módulo nativo, y éste es el **único** `npm install` de cualquier
flujo de ese repositorio, así que nada probaba que funcionara: dejar un binario compilado en el
camino crítico del despliegue del sitio entero, para algo que no se usa, es agrandar la superficie
de falla de una guarda sin ninguna razón. Comprobado apartando `build/node_modules/sharp` y
corriendo los cuatro: los cuatro en `exit=0` y los cuatro imprimiendo su línea exigida. En el runner
el install quedó en **32 paquetes, 4 segundos**. Lo que el paso sigue haciendo en rojo es *no haber
podido mirar*, que es rojo y no verde (D-058).

**Y un desvío propio en ese mismo commit, dicho acá porque no tiene dónde esconderse.** `6ea7f38`
**no cita su pendiente en el mensaje**, y es de esta entrada. La regla se había escrito el mismo día
—`PND-050`, D-062: un commit lleva sólo lo que su mensaje nombra y cita su pendiente— y se incumplió
en el commit siguiente, en el otro repositorio, que es donde no hay compuerta que lo mire. Está
empujado y lo publicado se corrige hacia adelante, así que la corrección es ésta: queda nombrado
acá y anotado como segunda ocurrencia en `PND-050`, que es donde la prevención mecánica espera
decisión del dueño. Dos veces en un día es el argumento de que la regla sola no alcanza.

**Commit.** En el repositorio del portal, `f72406a` (el paso) y `6ea7f38` (la corrección del
install), **empujados el 2026-10-26** dentro de la pila `7adbd4b..6ea7f38`. **Decisión:** D-060.
*(`f72406a` era `19662f1`; se reescribió el 2026-10-26 al descartar el commit que tenía debajo,
`PND-051`.)*
---

# Abiertos — G-ECOSISTEMA: entender qué es cada cosa

## PND-022 — El ecosistema se lee como un solo producto *(era U-21)*

- **Nodo:** `identidad/ecosistema` [nodo propuesto]
- **Grupo:** G-ECOSISTEMA · **Severidad:** bloquea · **Quién decide:** se hace y se reporta
- **Repositorio:** los dos (portada del portal y README del método) · **Estado: CERRADO** el
  2026-10-26.

**Qué estaba mal.** En ninguna de las dos portadas estaba escrita la distinción **como tal**: el
método es un método, el protocolo es un protocolo, la herramienta es una herramienta. Tres
naturalezas distintas, y un lector superficial las mete en una sola bolsa. Lo que sí estaba, y la
reproducción de abajo no vio, es la pregunta práctica contestada en la portada —«¿necesito la
herramienta?», tres veces y una sobre el pliegue—; la corrección del 2026-10-26 lo mide.

**Evidencia del auditor.**

> La portada de Urazuke enlaza NAC3 en el pie; la portada de NAC3 no enlaza Urazuke. Enlace de ida
> sin vuelta. Y, más importante: en ninguna de las dos está escrita la distinción. (…) Lo
> verifiqué pasándole el sitio a un asistente ajeno, que metió las tres en una sola bolsa y
> concluyó que todo esto era la narrativa de un producto. Para un método publicado bajo licencia
> libre, destilado de tres sistemas en producción y pensado para que lo use alguien que nunca va a
> tocar Forge, esa es la lectura más dañina posible. Escribí el párrafo que la desarma, en la
> portada, arriba, y repetilo en el README.

**Mi reproducción (2026-10-24).** Confirmado de dos maneras independientes. En la portada servida,
la herramienta aparece nombrada en prosa ("Forge automatiza las compuertas y la inyección de
prompts…") y la distinción no está escrita en ninguna parte. Y el experimento del auditor se
reprodujo: un asistente ajeno, con el sitio delante, describió el conjunto como "proyectos
relacionados con interfaces impulsadas por IA, contratos de navegación para agentes,
accesibilidad, voz y automatización de interfaces", dejando al método flotando ahí adentro, y
ofreció "análisis del código de GitHub" como si hubiera un sistema que auditar. Las dos cosas son
el mismo malentendido: **le pidió código a un método.**

**Corrección de esa reproducción (2026-10-26), y el defecto es del lado del método.** La frase
«la distinción no está escrita en ninguna parte» era **falsa**, y era comprobable con una orden de
dos segundos el día que se escribió. Medido contra la portada servida:

```
curl -s https://yujin.app/urazuke/                      -> HTTP 200, 70395 bytes
grep -o -i "Neutral respecto de la herramienta" | wc -l -> 3   (una en la tira del encabezado,
                                                                sobre el pliegue)
grep -o -i "¿Necesito Forge o NAC3?"            | wc -l -> 1
grep -o -i "el peldaño existe sin Forge"        | wc -l -> 1
grep -c  -i "Tres cosas distintas"                      -> 0
```

La pregunta **práctica** —«¿necesito la herramienta?»— está contestada en la portada, por su nombre,
y una de las tres menciones está arriba del pliegue. Lo que de verdad no estaba escrito es la
**taxonomía** —nombrar las tres naturalezas como tres— y qué *es* el protocolo en sus propios
términos: la pregunta frecuente dice que no es una condición, no dice qué es. Es bastante menos de
lo que esta entrada afirmaba, y la diferencia cambia la decisión.

**Y la contraprueba estaba en la mano y no se pesó.** El autor de «El Arte de Forjar Sistemas»
adaptó el método en 191 páginas **sin tocar la herramienta** (`PND-039` a `PND-048`): un lector
real, con esta misma portada delante, que lo entendió perfecto. Una lectura descuidada de un
asistente ajeno contra una adaptación demostrada no es un defecto de la página; generalizar de una
muestra de uno es justo lo que el método prohíbe. Queda en `PND-051`, porque un cierre que afirma
una medición que producción desmiente es el defecto que este método persigue, y estaba en el archivo
que es la verdad del plan.

**Especificación.** El párrafo que lo desarma, arriba en la portada y repetido en el README: el
método es qué hacer en qué orden, qué exigirle al que construye y cómo saber que entregó completo,
y se sigue con cualquier asistente o con lápiz y papel; el protocolo es un contrato para que una
interfaz sea navegable por un agente y por una persona con la misma dignidad; la herramienta
implementa el método y habla el protocolo. Y el enlace de vuelta, para que no sea de ida sola.

**El argumento que hay que usar, con la corrección que PND-023 ya aplicó.** La neutralidad de
herramienta no está sólo en la prosa: está en el dato. En los archivos publicados hay **cero**
menciones del protocolo, medido. Y desde D-055 hay **cero** menciones de la herramienta, con una
prueba que lo exige sobre las tres superficies. Hasta que la fusión de ese cambio llegue a
producción, el argumento que se puede usar es el que la auditoría proponía **menos** su parte
falsa: cero del protocolo, y la del nombre de la herramienta ya corregida con su decisión escrita.
No se publica el argumento absoluto antes de que lo publicado lo sostenga.

**Criterio de aceptación por perfil.**

- *P3 (lector humano):* dado el perfil lector, esta persona entiende, leyendo sólo la portada, que
  el método se puede usar sin la herramienta, y no concluye que es la narrativa de un producto.
- *P1 (herramienta consumidora):* dada una herramienta cualquiera, esa herramienta puede
  implementar las compuertas sin adoptar ningún protocolo ni ninguna otra herramienta, y el texto
  publicado lo dice.
- *P4 (rastreador):* dado el perfil rastreador, el párrafo está en el HTML servido, no detrás del
  conmutador.

**Depende de:** PND-020. La fusión del pull request #4 ya ocurrió (`fd8561c`, 2026-10-24); lo que
falta para poder publicar el argumento absoluto es que producción sirva ese contenido, y eso es
exactamente PND-020. **Cerrado el 2026-10-24**, así que la precondición estaba.

**Primero lo que autorizaba el argumento, y medido contra producción, no contra la copia local.**
La entrada decía que el argumento absoluto no se publica antes de que lo publicado lo sostenga. El
2026-10-26, con D-055 ya fusionado y publicado, se le preguntó a producción:

```
gates.json:   HTTP 200, 100112 bytes -> cero menciones
prompts.json: HTTP 200,  64151 bytes -> cero menciones
index.json:   HTTP 200,   4818 bytes -> "yujin" x4

las cuatro, y son direcciones que el propio archivo declara:
  .canonical_base    https://yujin.app/urazuke/api/
  .mirrors[0].base   https://yujin.app/urazuke/docs/api/
  .resources[0].url  https://yujin.app/urazuke/api/gates.json
  .resources[1].url  https://yujin.app/urazuke/api/prompts.json
```

Es la excepción estrecha de D-056, la que `tests/gates_neutralidad.test.mjs` ya verifica: el nombre
del alojamiento puede aparecer **sólo** como una de las direcciones que el archivo declara, nunca
en prosa y nunca en un nombre de campo. Así que el argumento se publica entero, y con el comando
que cualquiera corre, que es lo que lo vuelve comprobable en vez de afirmado:

```
curl -s https://yujin.app/urazuke/api/gates.json | grep -o -i -E "forge|nac-?3|yujin" | wc -l
  -> 0        (y el mismo comando sobre prompts.json -> 0)
```

**Lo que se escribió, y lo que se descartó (corregido el 2026-10-26).** En el método, una sección
nueva arriba del README —antes de la tesis—, replicada en los ocho idiomas del corpus en el mismo
commit: las tres naturalezas, una por párrafo, y el argumento medido con su comando al final. Eso
está escrito, fusionado y publicado. **En la portada del portal no va.** El párrafo estaba escrito y
horneado en los diez idiomas de la interfaz, commiteado en el repositorio del portal y sin empujar;
el dueño lo leyó, contrastó el criterio contra lo que la portada ya dice y decidió descartarlo. El
commit se descartó el 2026-10-26 —era `63e4a2c` en el clon de trabajo del portal, y sigue
recuperable de su registro de referencias mientras ese clon no recoja la basura— y nunca llegó a producción: medido ese día,
`id="tres-cosas"` no aparece ni en la portada servida ni en el árbol del portal.

**El criterio que queda escrito, que vale más que el párrafo.** Un documento se puede permitir un
párrafo cuidadoso arriba, porque el lector llega dispuesto a leer con cuidado; una portada contesta
la pregunta donde la pregunta se hace, y la de la portada ya estaba contestada tres veces. Está en
**D-063**, con la medición y con la contraprueba.

**La evidencia del lado del método, que es lo que el criterio pedía y no la promesa de que está
puesto.** Los ocho README del corpus llevan la sección, cada uno con su encabezado en su idioma:

```
es  ## Tres cosas distintas: un método, un protocolo, una herramienta
en  ## Three different things: a method, a protocol, a tool
pt  ## Três coisas distintas: um método, um protocolo, uma ferramenta
fr  ## Trois choses distinctes : une méthode, un protocole, un outil
de  ## Drei verschiedene Dinge: eine Methode, ein Protokoll, ein Werkzeug
it  ## Tre cose distinte: un metodo, un protocollo, uno strumento
ja  ## 三つの別のもの：方法、プロトコル、ツール
zh  ## 三件不同的东西：一个方法、一个协议、一个工具
```

El criterio de P1 está en el párrafo del argumento, con su comando. Y los de P3 y P4 **ya los
cumplía la portada antes de esta entrada**: eso es lo que la reproducción no vio, y la medición de
arriba es su evidencia.

**Lo que se midió sobre el árbol del portal y quedó registrado aparte.** La prueba en rojo del
verificador de las diez portadas tenía su árbol de origen **clavado a una ruta local** de una
máquina, así que corrida tal cual no miraba el repositorio en el que vive: decía «244 claves»
cuando el árbol que tenía al lado tenía otras. Es `PND-037`, y está arreglado: el recibo de dos
segundos ahora imprime el árbol que ejercita —`arbol: C:portal-trabajo`, `claves (es): 245`— y las
nueve mutaciones caen con la cuenta viva.

**El enlace de vuelta, que esta entrada no cerró, y lo que de verdad pasó con él.** La portada del
protocolo es `yujin.app/nac-spec/`. El 2026-10-24 no enlazaba a Urazuke, y la reproducción de
entonces concluyó que su fuente no estaba en ningún repositorio: por eso no se escribió. El
2026-10-26 el enlace apareció, y esta entrada lo registró como que **había aparecido solo**, sin
commit que lo produzca. **Las dos cosas eran falsas**, y el error es de método y no de dato: se
buscó en cuatro árboles y el que correspondía no era ninguno de ellos. La página vive en
`yujinapp/nac-spec` —otra **organización** de GitHub, distinta de `pkuschnirof/nac-spec`, que es el
repositorio de la especificación— y el enlace de vuelta tiene commit, pendiente y despliegue
propios. La refutación completa, con su medición, está en `PND-036`.

---

## PND-036 — REFUTADO: la portada del protocolo sí tiene fuente, y el hallazgo era un defecto propio de medición *(deriva de U-21)*

- **Nodo:** `identidad/ecosistema` [nodo propuesto]
- **Grupo:** G-ECOSISTEMA · **Severidad:** avisa · **Quién decide:** se hace y se reporta
- **Repositorio:** método (la entrada; el hallazgo nunca fue de otro repositorio) ·
  **Estado: CERRADO** el 2026-10-27 — **refutado**, con la fuente, el commit y el despliegue a la
  vista. Se queda en el registro con su refutación escrita, porque un hallazgo retirado es
  documentación de cómo se midió mal.
- **Origen:** apareció al cerrar `PND-022`, al ir a escribir el enlace de vuelta y no encontrar la
  página. El dueño lo cuestionó con una pregunta de alcance —«¿por qué estás tan preocupado con
  nac-spec? Es otro proyecto»— y al volver a medirlo con esa pregunta puesta, la entrada se cayó.

**Qué afirmaba esta entrada, y es falso.** Dos cosas. Que `https://yujin.app/nac-spec/` «no está en
ningún repositorio al que se pueda llegar», de modo que «no hay commit que la produzca, no hay
despliegue que la publique». Y, como confirmación, que el 2026-10-26 a las 19:10 UTC el enlace de
vuelta a Urazuke «apareció solo», **sin ningún commit que lo produzca**. Las dos son falsas, y la
segunda es peor que la primera: se presentó como la **prueba** del hallazgo.

**La refutación, medida (2026-10-27, 02:05 UTC).** La página tiene repositorio, tiene historia de
commits, tiene flujo de despliegue y tiene una comprobación en vivo después de publicar:

```
produccion
  curl -s -o /dev/null -w "%{http_code} %{size_download}" https://yujin.app/nac-spec/
    -> 200 89876
  menciones de "urazuke"                        -> 39
  href="https://yujin.app/urazuke/"             -> 4
  curl -sI | grep -i last-modified
    -> Last-Modified: Tue, 27 Oct 2026 01:57:29 GMT

la fuente, que si existe
  git remote get-url origin                     -> https://github.com/yujinapp/nac-spec.git
  git cat-file -s origin/main:index.html        -> 89422
  git show origin/main:index.html | head
    <title data-i18n="meta.title">NAC3 - the Native Agent Contract for agent-driven front-ends</title>
  menciones de "urazuke" en la fuente           -> 39

el commit que escribio el enlace de vuelta
  git log origin/main -S "yujin.app/urazuke/" -- index.html
    c64fcf2  feat(landing): say what NAC3 does not cover, and link back to
             the method (N-09/D-04, N-15, N-16)

el despliegue que esta entrada dijo que no existia
  .github/workflows/deploy.yml   name: Deploy nac-spec to yujin.app/nac-spec/
    rsync ... "USER@HOST:/home/USER/public_html/yujin.app/nac-spec/"
    node scripts/smoke-live-landing.mjs --base https://yujin.app/nac-spec/ --retries 3

el "cambio solo a las 19:10 sin ningun commit"
  gh run list
    40384271448  success  push  main  2026-10-26T19:09:59Z
      "docs(handoff): the 2.5.0 is published, measured against the registry"
    40435557479  success  push  main  2026-10-27T01:57:04Z
      "docs(handoff): the 2.5.1 is published, and the two defects that publishing found"
```

El `Last-Modified` que esta entrada usó como prueba de que la página cambia sin dejar rastro es la
hora en que terminó la corrida **40384271448**, que es un empujón a `main` de su repositorio. Y el
de hoy es la corrida **40435557479**. No cambió sola: la publicaron, dos veces, con su flujo.

**Lo único que no se reconcilió, dicho en vez de redondeado.** La fuente mide 89.422 bytes y
producción sirve 89.876: 454 de diferencia. Es consistente con el paso de horneado de los diez
idiomas que el flujo corre antes del `rsync`, y **no se verificó byte a byte**. No cambia la
refutación —la página tiene fuente— pero no se afirma lo que no se midió.

**Por qué falló la reproducción original, que es lo que hay que aprender.** No falló por falta de
comandos: la entrada trae su `grep -rl` corrido en cuatro árboles. Falló porque **ninguno de los
cuatro era el árbol correcto**, y la conclusión se escribió como si la lista hubiera sido completa:

```
arbol buscado por la entrada      remoto real                      por que no era
  metodo                          pkuschnirof/urazuke              no es
  portal                          pkuschnirof/rpaforce             la NOMBRA y la enlaza
  protocolo                       pkuschnirof/nac-spec             es la ESPECIFICACION, no el sitio
  voz                             pkuschnirof/nac3-kikoe           no es

el arbol que correspondia         yujinapp/nac-spec                otra ORGANIZACION de GitHub
  presente en esta maquina en dos clones, ninguno de los cuatro mirados
```

Y el propio flujo de la página explica el falso negativo más convincente de los cuatro: su
encabezado dice que el espejo **vivía antes dentro de `rpaforce`** (`rpaforce/yujin.app/nac-spec/`)
y se movió. La búsqueda encontró el fósil en el portal, leyó «la nombra pero no está» y cerró el
caso. Un rastro de una mudanza se interpretó como ausencia.

**Lo que queda verdadero de esta entrada: nada.** El enlace de vuelta existe —39 menciones y 4
enlaces a `yujin.app/urazuke/`— y allá se resolvió con sus propios identificadores (`N-09`, `N-15`,
`N-16`, `D-04`) **antes** de que el método lo buscara. Y la pregunta de alcance del dueño también se
sostiene por separado: el método no depende del protocolo, y eso está medido en `PND-019` —cero
menciones en los veinticuatro contratos, cero en el camino evolutivo-correctivo y cero en el nivel
de datos—.

**Criterio de aceptación por perfil, contra la medición de arriba.**

- *P3 (lector humano):* **cumplido, y ya lo estaba.** Esta persona llega a la portada del protocolo
  y vuelve al método: cuatro enlaces a `yujin.app/urazuke/` en la página servida.
- *P5 (auditor):* **cumplido, y ya lo estaba.** Existe repositorio (`yujinapp/nac-spec`), existe el
  commit que escribió el enlace (`c64fcf2`) y existe la corrida que lo publicó (`40384271448`).

**Cómo se verifica la refutación.** `curl -s https://yujin.app/nac-spec/ | grep -c -i urazuke` →
mayor que 0; y `git log origin/main -S "yujin.app/urazuke/" -- index.html` en `yujinapp/nac-spec` →
nombra el commit. Las dos órdenes están arriba con su salida.

**Lo que deja escrito, y es el único valor que tuvo esta entrada.** Una ausencia no se registra como
hallazgo desde una búsqueda que falló: se enumera el universo buscado y se dice por qué esa
enumeración es completa. «No lo encontré donde miré» no es «no existe». Es `PND-052`, y es el
segundo desvío de medición propio en dos días.

**Depende de:** nada. Era un hallazgo, y no lo era.
---

# Abiertos — trabajo derivado de las decisiones y de la revisión semántica

## PND-024 — Propuesta escrita del esquema de firma criptográfica *(deriva de U-08 / D2)*

- **Nodo:** `interfaz-publica/api` [nodo propuesto]
- **Grupo:** G-API · **Severidad:** registra · **Quién decide:** el dueño, cuando la propuesta esté
- **Repositorio:** método · **Estado: abierto**
- **Origen:** el dueño pidió explícitamente (2026-10-24) que, además de adoptar la recomendación de
  no construirla ahora, **el pendiente quede creado**.

**Qué hay que producir.** Una propuesta escrita, **no una implementación**: qué firma, con qué
esquema, dónde vive la clave privada, quién puede usarla, cada cuánto rota, qué pasa si se pierde,
y cómo un consumidor consigue la clave pública por una vía que **no** dependa del mismo portal que
la firma quería proteger.

**Lo que la firma agregaría, y lo que no, dicho de antemano.** Sólo sirve contra un compromiso
**del portal**, porque la clave viviría del lado del método. Sube el listón de "cualquiera que
entre al hosting compartido" a "alguien que entre a la cadena del método". Es una mejora real y
acotada. El costo que se subestima no es firmar: es la **custodia**.

**Criterio de aceptación por perfil.**

- *P5 (auditor):* dado el perfil auditor, existe un documento que dice qué protegería una firma,
  qué no, y qué haría falta para sostenerla, de modo que la decisión de construirla o no se pueda
  tomar con el costo a la vista.

**Depende de:** PND-007 (el puntero al registro es la alternativa barata, y conviene medirla antes
de evaluar la firma).

---

## PND-025 — Un chequeo que avise cuando el método publica algo que la portada no enlaza *(deriva de U-14)*

- **Nodo:** `cadena/publicacion` [nodo propuesto]
- **Grupo:** G-ALCANCE · **Severidad:** avisa · **Quién decide:** se hace y se reporta
- **Repositorio:** método, y lee el del portal · **Estado: CERRADO** el 2026-10-26.

**Qué está mal.** La causa de PND-015 es estructural y está escrita en `CLAUDE.md`: el disparador
de publicación **no toca la portada**, así que un documento nuevo queda accesible por su URL y no
aparece enlazado hasta que alguien se acuerde. Diez documentos demostraron que nadie se acuerda.

**Evidencia del auditor.**

> Esto es exactamente lo que CLAUDE.md ya advierte: el disparador de publicación no toca la
> landing, así que un documento nuevo queda accesible por su URL y no aparece enlazado hasta que
> alguien lo agregue. Agregá los tres a la portada y al i18n, y además proponeme cómo evitar que
> vuelva a pasar: un chequeo que compare lo que el método genera contra lo que la portada enlaza,
> y avise.

**Especificación propuesta.** Un programa que lista lo que el método genera en `docs/html/` y lo
contrasta contra lo que la portada y el mapa del sitio enlazan, y **avisa** (no bloquea) nombrando
cada documento huérfano. Es la regla UX-03 del Anexo H —"no hay huérfanas"— aplicada a la
publicación del propio método, y por eso la severidad es la que UX-03 declara.

**Pregunta abierta, y es de diseño, no de dueño:** el chequeo tiene que leer dos repositorios. Si
corre en el del método, necesita ver la portada; si corre en el del portal, necesita ver lo
generado. La salida más probable es que corra en el trabajo de publicación, que es el único momento
en que los dos árboles están juntos. Se propone y se reporta.

**Criterio de aceptación por perfil.**

- *P3, P4:* dado el perfil lector o rastreador, un documento que el método publica de acá en
  adelante no puede quedar huérfano sin que la corrida lo diga.

**Depende de:** PND-015.

**La pregunta de diseño, respondida (2026-10-26).** Corre en **este** repositorio, dentro del
trabajo de publicación, justo después de clonar el portal y **antes** de la copia: es el único
momento en que los dos árboles están juntos, y antes de la copia las portadas se leen como están
commiteadas en el portal y no como las dejó el espejo. El programa es `build/portal_orphans.mjs`,
corre con node pelado y se puede repetir a mano desde cualquier máquina que tenga los dos árboles:
`node build/portal_orphans.mjs --portal <árbol del portal>`. Queda **fuera** de
`build/build.mjs`, por el mismo motivo que los dos chequeos contra producción: la construcción
corre sobre un solo árbol.

**Y una razón más fuerte de la que estaba escrita, medida al implementarlo.** La mitad del portal
—`build/verify-urazuke-homes.mjs`, que falla si un documento del disco no está enlazado desde
ninguna portada— **no la corre nadie automáticamente**: medido el 2026-10-26, el flujo de
despliegue del portal corre `build/verify-deploy-htaccess.mjs` y no corre el de las portadas. O
sea que hasta hoy, cuando el método publicaba algo nuevo, lo único que podía descubrir el huérfano
era que alguien se acordara de correr un programa en el otro repositorio. Era la misma clase de
guarda dormida que PND-001 y que D-057: existe, está bien escrita y no la invoca nadie.

**Qué separa, y por qué tres estados y no dos.** Por documento: *enlazado* (alguna portada lo
enlaza y el mapa del sitio lo lleva), *fuera_del_mapa* (una portada lo enlaza y el mapa no: una
persona llega y un rastreador que no ejecuta JavaScript no) y *sin_enlace* (está servido y
ninguna portada lo enlaza). Y una cuarta situación que no es de un documento sino del chequeo
entero: *no se pudo mirar* —el árbol del portal no está donde se dijo, no hay portada principal,
no hay mapa del sitio, o no hay un solo documento generado que contrastar—. Esa última es **roja y
no verde**, y es la lección de D-057 aplicada de entrada: decir «cero huérfanos» cuando no se miró
nada es el defecto, no la ausencia de defecto. El paso de la cadena, además, exige la línea
`huerfanas: comprobado` que el programa imprime: un paso que no imprimió nada no corrió.

**Severidad, respetada.** Los huérfanos **avisan y no frenan** —es lo que UX-03 declara, y el
índice de la landing vive en el repositorio del portal—. Lo que sí frena la corrida es no haber
podido mirar.

**Evidencia de cierre.** Medido el 2026-10-26 contra el árbol real del portal: 10 portadas
descubiertas del disco, **76 documentos generados, 76 enlazados desde una portada, 76 en el mapa
del sitio, 0 huérfanos y 0 fuera del mapa**, código de salida 0. Probado en rojo antes de darlo
por bueno, que es lo que vale: (a) con un documento de más colgado en `docs/html/`, el programa lo
nombró —`PROBE_HUERFANA.html: sin_enlace`— y salió 2; (b) **cuatro mutaciones del propio programa,
cuatro rojos** de la prueba nueva: leer sólo el enlace relativo (deja nueve portadas sin mirar),
reportar «cero huérfanos» cuando no hay nada generado, dejar de considerar rojo que falte el mapa
del sitio y dejar de considerarlo que falte la portada principal; (c) el fragmento del paso de la
cadena corrido tal cual en sus tres caminos: verde, aviso con el huérfano nombrado, y rojo con
`huerfanas: NO se pudo comprobar` y sin la línea de comprobado. Suite completa en verde y árbol
limpio: `node --test` = **220 pruebas, 0 fallos** (eran 197; las 23 nuevas están en
`tests/portada_huerfanas.test.mjs`, y cinco de ellas son rojos deliberados).

**Commit / pull request:** pull request **#12**. **Decisión:** D-058.

---

## PND-026 a PND-034 — Revisión semántica de los nueve idiomas de la interfaz *(era U-17, segunda parte)*

- **Nodo:** `interfaz-publica/portada` [nodo propuesto]
- **Grupo:** G-IDIOMA · **Severidad:** avisa · **Quién decide:** se hace y se reporta
- **Repositorio:** portal · **Estado: en curso** (las nueve: revisadas el 2026-10-27; la mitad
  medida aplicada, publicada y verificada contra producción el mismo día; quedan los veintisiete
  hallazgos de juicio de traducción)

**Por qué son nueve entradas y no una.** La auditoría lo pidió así, y tiene razón: cada idioma lo
revisa alguien que lo lee, en un momento distinto, y el resultado de uno no dice nada del otro.
El castellano no entra porque es la fuente de verdad: contrastarlo contra sí mismo no mide nada.

**Qué está mal.** Lo que se verificó por máquina está bien y lo que falta es justamente lo que la
máquina no puede ver.

**Evidencia del auditor.**

> Y además, porque yo sólo pude verificar paridad de claves y coherencia de cantidades: pasá una
> revisión SEMÁNTICA de los diez idiomas buscando más falsos amigos y más números que no coincidan.
> Lo que verifiqué y está bien: las 241 claves existen en los diez archivos, ninguna vacía, y las
> cantidades (veinticuatro peldaños, cuatro tramos, tres sistemas de origen) coinciden en los diez
> salvo el caso italiano. Lo que NO verifiqué es si cada frase dice lo que dice la castellana.

**Mi reproducción (2026-10-24).** Paridad y vacíos: confirmado, 241 claves en los diez, cero
faltantes, cero vacías (la tabla está en PND-016). Y la única discrepancia de cantidad que la
máquina encuentra sigue siendo la italiana (PND-017).

**Especificación común a las nueve.** Leer las 241 cadenas del idioma contra las 241 castellanas y
reportar: falsos amigos (el caso italiano es el ejemplar: *tramonti* por *tramo*), números que no
coincidan, términos del glosario traducidos de dos maneras distintas dentro del mismo archivo, y
cualquier frase que diga algo que la castellana no dice. El resultado de cada entrada es una lista
de correcciones propuestas, o la constancia de que no hay ninguna.

**Criterio de aceptación por perfil.**

- *P3 (lector humano en ese idioma):* dado un lector de ese idioma, lo que esa persona lee en la
  portada dice lo mismo que dice la castellana, y los números coinciden.

**Las nueve entradas.**

| id | idioma | hallazgos | aplicados | queda | estado |
|---|---|---:|---:|---:|---|
| PND-026 | árabe (ar) | 7 | 7 | 0 | servido lo medido; lo de juicio horneado y sin empujar |
| PND-027 | alemán (de) | 8 | 8 | 1 | queda el ablandamiento de `thesis.k2.p` |
| PND-028 | inglés (en) | 1 | 0 | 1 | su único hallazgo es el ablandamiento, y es del dueño |
| PND-029 | francés (fr) | 5 | 5 | 0 | servido lo medido; lo de juicio horneado y sin empujar |
| PND-030 | hindi (hi) | 5 | 5 | 0 | los cinco, horneados y sin empujar |
| PND-031 | italiano (it) | 5 | 4 | 1 | queda el «(in spagnolo)», que se arregla en castellano |
| PND-032 | japonés (ja) | 6 | 6 | 0 | servido lo medido; lo de juicio horneado y sin empujar |
| PND-033 | portugués (pt) | 3 | 3 | 0 | servido lo medido; lo de juicio horneado y sin empujar |
| PND-034 | chino (zh) | 6 | 6 | 0 | servido lo medido; lo de juicio horneado y sin empujar |

La columna «aplicados» cuenta hallazgos, no cadenas: los cuarenta y cuatro aplicados son **127
cadenas** (21 el 2026-10-27 a la mañana y 106 a la tarde, más tres correcciones de las propias
correcciones). La de «queda» son **dos** hallazgos, y los dos los decide el dueño porque los dos
se arreglan tocando el castellano: el ablandamiento de `thesis.k2.p` —que el inglés y el alemán
comparten— y la aclaración «(en español)» que nueve idiomas agregan y la fuente de verdad no dice.

**Lo que se aplicó el 2026-10-27, y es la mitad medida.** El dueño eligió aplicar sólo lo que se
reproduce con un comando —números, flechas, registro— y dejar el juicio de traducción para después,
porque la elección de una palabra la discute un hablante nativo y el hallazgo no deja de serlo.
Entraron **veintiún** cambios en seis idiomas, en el repositorio del portal: los dos números del
japonés y del chino (`origin.h2`, que no era un número, y la cifra de la retrospectiva), las ocho
flechas del árabe en una sola dirección más su concordancia, el alemán tratando al lector de «Sie»
en las cinco claves que lo trataban de «du», el francés de «vous» en `prompt.antes`, y la variedad
del portugués de esa misma clave. Medido en lo horneado: 8 ← y 0 → en árabe, 8 → y 0 ← en
castellano; `四十六` en los dos títulos; `24〜27分` y `24 到 27 分钟`. El verificador de las diez
portadas da PASS y sus tres pruebas en rojo caen: 9 mutaciones, 9 rojos.

**Y el 2026-10-27 se publicó, así que esto ya es lo que el lector lee.** El dueño autorizó el
empujón. El commit se rebasó antes sobre la publicación automática del método que había entrado en
el medio —de `898547c` a `0d3ad88`, sin conflicto, porque uno toca el i18n de la portada y la otra
toca `api/`—, así que el identificador que este registro citaba como firme no lo era, y eso ya
estaba dicho: un identificador de algo sin empujar no es firme. El despliegue del portal cerró en
verde en la corrida `40590835303`, con los cuatro recibos que su paso exige a la vista
(`PASS -- every page is baked`, `PRUEBA EN ROJO OK`, `arbol propio: comprobado`,
`eol: comprobado`). Medido contra **producción** después y no antes: `ja/` y `zh/` sirven `四十六`
y `24〜27分` / `24 到 27 分钟`, y la cadena `四二十四` —la que no era un número— devuelve **cero** en
las dos; `ar/` sirve 8 `←` y 0 `→` contra los 8 `→` y 0 `←` del castellano; y los **diez**
catálogos servidos coinciden con los commiteados, normalizados los finales de línea (sin
normalizarlos los diez salen distintos, y es sólo CRLF: el contenido es idéntico).

**Por qué las nueve siguen en curso después de publicar.** Lo que se publicó es la mitad medida.
Los veintisiete hallazgos de juicio de traducción siguen sin tocar, y el criterio de aceptación es
sobre lo que el lector lee: mientras una de las dos formas de una misma palabra siga en la página,
la entrada de ese idioma no cerró. Cerrar por el empujón sería contar como efecto lo que todavía
no está en la página.

Dos cosas que se dejaron dichas en vez de redondeadas. El alemán conserva «du» en `prompt.tr` **a
propósito**: ese texto le habla al modelo y no a la persona, que es el mismo criterio que el
francés ya aplicaba, así que el hallazgo medido se resolvió en las cinco claves del lector y no en
las seis que la lista nombra. Y el hallazgo #2 del portugués —`o pendente` contra la `pendência`
del resto del archivo— es elección de término y **no** entró, aunque vive en la clave que sí se
tocó: queda a medias y se dice.

**Corrección de la cuenta de lo que quedaba, y es la segunda cuenta mal de esta misma entrada.**
Este registro dijo dos veces, el 2026-10-27, que quedaban **veintisiete** hallazgos de juicio.
Quedaban **treinta y siete**. La cuenta sale sola de la tabla —46 hallazgos menos los 9 aplicados
esa mañana— y el 27 no sale de ninguna resta: no era una medición, era una cifra escrita de memoria
en el mismo párrafo donde estaba el 46 que la desmiente. Se deja escrito en vez de corregir el
número y seguir, porque el defecto no es el número: es haber afirmado una cuenta sin restar, en una
entrada cuyo trabajo entero es contar. Es la misma familia que el resumen viejo del registro, que
ya tiene su propia prueba, en el único lugar del archivo donde ninguna prueba mira.

**Lo que se aplicó la tarde del 2026-10-27: treinta y cinco de los treinta y siete, 106 cadenas.**
El dueño pidió aplicar las de **coherencia interna** —un archivo que usa dos palabras para la misma
cosa se arregla eligiendo una— y que volvieran a él sólo las que cambian el tono.

**El criterio del desempate, que es lo que esta entrada deja como regla.** Cuando el hallazgo dice
«hay dos formas» y no dice cuál, elegir «la que más aparece en la página» es arbitrario: hubo tres
empates exactos. El desempate que se usó es **el corpus publicado de ese idioma**, que es el
documento que el lector abre al clic siguiente, y es la misma razón por la que el hallazgo del
inglés se cerró diciendo que su vocabulario coincide con el del corpus inglés. Medido antes de
elegir una sola palabra, y cambió tres decisiones que la lista recomendaba al revés:

```
de  Tor 141 : Gate 50            de  Sperre 152 : Schloss 3
de  Kette 41 : Pipeline 3        de  Arbeitsvereinbarung 51 : Zusammenarbeitsvereinbarung 0
it  **Cancello 35 : **Porta 0    it  voce in sospeso 444 : pendente 5
it  tratto 177 : fase 51         ja  保留項目 612 : 保留事項 0
ja  振り返り 56 : レトロスペクティブ 0  ja  区間 75 : フェーズ 28
ja  連鎖 46 : チェーン 1           zh  复盘 52 : 回顾 5
zh  待办项 650 : 待办事项 0        zh  部分 277 : 区段 1
zh  链条 29 : 链路 0              pt  pendência 680 : pendente 42
pt  cadeia 48 : esteira 0        fr  verrou 150 : cadenas 0
```

Y con **dos excepciones declaradas**, porque el criterio solo no alcanza. La primera: cuando el
hallazgo señala que una de las dos formas es **semánticamente equivocada**, gana la correcta aunque
el corpus prefiera la otra (es el caso del alemán `offener Posten`, que es una factura impagada, y
del árabe `خط الإنتاج`, que es la línea de producción). La segunda: **el hindi y el árabe no tienen
corpus publicado** —el corpus son ocho idiomas y la interfaz diez—, así que para esos dos el
desempate fue la mayoría en la página y la palabra del título, y queda dicho que es un criterio más
débil.

**Cuatro correcciones a las propias listas, que aparecieron al aplicarlas.** Las cuatro salen de
una verificación que exige que la forma vieja no quede en ninguna clave, y no de volver a leer:

- El hallazgo árabe de «la cadena» nombraba **cuatro** formas e incluía `thesis.body`. Ahí el
  castellano dice «pipelines», no «la cadena», así que la forma árabe era **fiel** y el cambio se
  revirtió. El mismo falso positivo estaba latente en el alemán, el japonés y el chino, y por eso
  los cuatro quedan salteados **con su razón escrita** en la verificación.
- El hallazgo japonés de «la cadena» nombraba dos formas y hay **tres**: `tramo3.p` traduce «la
  cadena a producción» como `本番への経路`, que es *la ruta*. El corpus lo confirma sin ambigüedad
  —`経路` 52 veces y es siempre *ruta*, `連鎖` 45 y es siempre *la cadena*, incluido `本番への連鎖`—,
  así que arreglar dos de tres habría dejado la incoherencia viva.
- El hallazgo hindi de «método» nombraba nueve claves y hay **diez**: `faq.a5` llevaba dos
  ocurrencias que la lista no nombraba.
- Y dos «residuos» italianos no eran residuos: `porta` es también el verbo *lleva*. Van salteados
  con su razón, y la medición del italiano se hizo contra el nombre del campo del contrato
  (`**Cancello`, 35 veces) y no contra el conteo crudo, que daba 238 falsos positivos y habría
  invertido la decisión.

**Verificación, pegada tal cual (2026-10-27).**

```
A paridad: los diez con 245 claves, cero vacias
B residuos: cero | salteados con razon escrita: 6
C simetria pagina/corpus: 3 terminos donde el corpus prefiere la otra forma
C hi y ar no tienen corpus publicado: su criterio fue la mayoria en pagina + correccion semantica

prerender: 10 idiomas, "Every key was present in every catalogue -- no fallbacks used"
verify-urazuke-homes: PASS -- every page is baked, linked, canonical and reciprocal
redproof-urazuke-homes: mutaciones 10, rojos 10
redproof-arbol-propio: comprobado · redproof-sitemap-eol: comprobado
```

Y queda dicho qué es cada mitad de ese recibo, porque no vale lo mismo. Las cuatro últimas líneas
son la cadena del portal, que corre en cada despliegue. Las tres primeras —`A`, `B` y `C`— salen de
un programa de **una sola vez**, escrito para esta aplicación y no commiteado, así que la
verificación es reproducible sólo mientras alguien lo vuelva a escribir. Convertirla en guarda es
justamente lo que `PND-060` propone, y necesita los dos árboles juntos.

**Lo que queda: dos hallazgos, y los dos son del castellano.** El ablandamiento de `thesis.k2.p`
—el castellano dice «un test que nunca viste fallar **no sabés si** prueba algo», que es una
afirmación sobre lo que uno puede saber, y el inglés y el alemán dicen que el test *quizás no prueba
nada*, que es otra cosa y deja la puerta abierta— y la aclaración «(en español)» que nueve idiomas
agregan en `material.practica` y la fuente de verdad no dice. Para la segunda la recomendación
sigue siendo **agregarla al castellano**, no borrar nueve aclaraciones correctas. Las dos esperan al
dueño porque las dos se resuelven escribiendo castellano, no traduciendo.

**Y un hallazgo que estas nueve entradas no podían ver, con entrada propia.** Comparar cada idioma
contra el castellano **de la misma página** no puede detectar que la página y el documento usen
palabras distintas para lo mismo. Al medir el desempate aparecieron tres casos, dos en alemán y uno
en francés: `PND-060`.

**La revisión se hizo el 2026-10-27, y la hizo un modelo.** El dueño lo autorizó así ese día,
después de que la entrada se reportara durante tres días como trabajo que necesitaba un hablante
nativo de cada idioma: es lo que la máquina del panel puede leer, y queda dicho en el propio
entregable para que nadie lo lea como la revisión de un nativo contratado. El entregable —las nueve
listas, hallazgo por hallazgo, con la corrección recomendada— está en
[`REVISION_SEMANTICA_INTERFAZ.md`](REVISION_SEMANTICA_INTERFAZ.md). Lo que ahí está marcado
`[medido]` se reproduce con un comando y no depende del juicio del revisor; el resto es juicio de
traducción y un nativo puede discutir una recomendación concreta sin que el hallazgo deje de serlo.

**Por qué quedan en curso y no cerradas.** El criterio de aceptación de arriba es sobre **lo que el
lector lee en la portada**, no sobre la existencia de la lista. Las nueve cierran cuando la
corrección está **servida**, y los arreglos viven en el repositorio del portal, donde empujar es
publicar las diez portadas horneadas. Cerrarlas con la lista sería exactamente el defecto de D-057:
un arreglo en una máquina no es un efecto en producción. La autorización de publicar es del dueño.

**Lo más grave de las nueve, para que no se pierda entre los cuarenta y seis hallazgos.** El
japonés y el chino escriben en el título de «De dónde sale» (`origin.h2`) la cadena `四二十四`, que
**no es un número**: el castellano dice «cuarenta y seis casos» y los otros siete idiomas lo dicen
bien. Los dos mismos idiomas cambian además una cifra de una retrospectiva real (`origin.f2.p`):
dicen «16 a 27 minutos» donde el castellano dice veinticuatro a veintisiete. Es la cifra que el
método publica para decir que mide.

**Corrección de la cuenta de esta entrada.** Decía 241 cadenas por idioma, y la auditoría también.
Medido el 2026-10-27: son **245** en los diez archivos, cero faltantes y cero vacías. Las cuatro de
diferencia entraron después de la auditoría —la columna de la hoja de las veinticinco preguntas y
su cabecera—, así que el número de la auditoría era correcto el día que lo midió. Se deja escrito
en vez de reescribir la evidencia del auditor, que no se toca.

**Nota sobre el alcance, para que no se confunda con PND-016.** Esto es la **interfaz** de la
portada: 245 cadenas por idioma. El **corpus** —34 documentos, cientos de miles de caracteres— no
entra acá; su revisión es otro trabajo y todavía no tiene entrada, porque primero hay que decidir
si se revisa todo o sólo lo que cambió.

**Dos defectos que la revisión encontró y no son de ninguna traducción.** Están en el castellano y
por lo tanto están, fielmente traducidos, en los diez idiomas: la portada afirma dos veces que la
retrospectiva es el peldaño 15 cuando una línea más arriba dice que es el 23 (`PND-057`), y la
entrada de la tabla del material promete cinco documentos por idioma cuando la tabla tiene diez
columnas (`PND-058`). Van con entrada propia porque no se arreglan traduciendo.

---

## PND-060 — La portada y el documento usan palabras distintas para lo mismo, y la revisión no podía verlo *(salió de medir el desempate de PND-026 a PND-034)*

- **Nodo:** `interfaz-publica/portada` [nodo propuesto]
- **Grupo:** G-IDIOMA · **Severidad:** avisa · **Quién decide:** **el dueño**, porque los tres
  arreglos posibles tienen costos muy distintos y uno de ellos toca el corpus
- **Repositorio:** los dos · **Estado: abierto**

**Qué está mal.** Un lector llega a la portada en su idioma, lee «compuerta», «pendiente» o
«peldaño» con una palabra, hace clic en el documento principal y encuentra otra. La portada y el
corpus son dos vocabularios distintos en el mismo idioma, y nada lo mira: la auditoría externa
comprobó paridad de claves, y las nueve revisiones semánticas comparan cada idioma contra el
**castellano de la misma página**. Ninguna de las dos puede ver esto, por construcción.

**Cómo apareció.** No lo buscó nadie. Salió de necesitar un desempate para unificar un término que
la página escribía de dos maneras: se midió qué palabra usa el corpus publicado de ese idioma, y
tres de las mediciones salieron al revés de lo que la página dice.

**Mi reproducción (2026-10-27), los tres casos con su cuenta.**

```
aleman, «pendiente»   pagina: offener Punkt    corpus: offener Posten   519 : 22
aleman, «evidencia»   pagina: Nachweis         corpus: Belege           190 : 4
frances, «peldano»    pagina: marche           corpus: echelon          545 : 27
```

El alemán es el caso raro y conviene decirlo entero: el corpus usa `offener Posten` 519 veces, y
`offener Posten` es, en alemán corriente, **una factura impagada**. O sea que el corpus no sólo
difiere de la página: difiere eligiendo un falso amigo, y lo hace casi quinientas veces más que la
alternativa. En la página se unificó sobre `offener Punkt`, que es la forma correcta, y eso es lo
que abre esta entrada.

**Lo que NO está mal, para que no se busque donde no hay nada.** Los otros dieciocho términos que se
midieron están alineados: la página y el corpus usan la misma palabra en los cuatro del alemán que
quedan, los tres del italiano, los cuatro del japonés, los cuatro del chino, los dos del portugués
y el candado francés. Y el hindi y el árabe quedan afuera de esta entrada porque **no tienen corpus
publicado**: la interfaz son diez idiomas y el corpus son ocho.

**Criterio de aceptación por perfil.**

- *P3 (lector humano en ese idioma):* dado un lector que pasa de la portada al documento principal,
  la palabra que nombra cada cosa es la misma en los dos.
- *P5 (lector que adapta el método a otro formato):* dado alguien que cita el método en alemán, la
  palabra que elija no depende de cuál de los dos textos leyó primero.

**Las tres salidas, con su costo medido, para que la decisión sea sobre números.**

1. **Alinear la portada al corpus.** El francés son 29 claves y 33 ocurrencias, y no es mecánico:
   `marche` es femenino y `échelon` masculino, así que cada frase cambia de artículo y de
   concordancia. Y el alemán vuelve a meter el falso amigo en la página. Costo: medio, y el
   resultado es peor en alemán que lo que hay hoy.
2. **Alinear el corpus a la portada.** Son 519 + 190 + 545 ocurrencias en tres términos y dos
   idiomas del corpus traducido, con concordancia en cada frase, y es un cambio del **método**, no
   del portal. Es lo correcto en alemán —saca un falso amigo repetido quinientas veces— y es
   discutible en francés, donde las dos palabras son válidas y `échelon` es la que los contratos
   usan. Costo: alto, y hay que medir antes si alguna ocurrencia cae dentro de un prompt, porque
   entonces sube el corpus de prompts con su huella.
3. **Elegir por término en vez de por dirección.** El alemán al corpus hacia `offener Punkt` y
   `Belege`, el francés a la portada hacia `échelon`. Es la única salida que no cambia una decisión
   buena para hacerla uniforme. Costo: el de la 2 en alemán y el de la 1 en francés, y hay que
   escribirlo como regla o la próxima vez se vuelve a discutir.

**Mi recomendación: la 3**, y primero el alemán, que es el que tiene un defecto de significado y no
sólo de coherencia. El francés puede esperar: `marche` y `échelon` son las dos correctas y lo único
que está mal es que no sean la misma.

**Lo que esto deja como regla, y es lo que vale más que los tres arreglos.** Hasta hoy el método
comprobaba que los diez catálogos tuvieran las mismas claves y que cada idioma dijera lo que dice el
castellano. Nunca comprobó que la portada y el corpus hablaran el mismo idioma **dentro** de un
idioma. La comprobación es posible y es barata para un glosario corto —contar las formas de cada
término en los dos árboles y exigir que la elegida sea la misma—, y necesita los **dos** árboles
juntos, que es la misma condición que el chequeo de huérfanas (D-058) y por lo tanto el mismo lugar:
el trabajo de publicación. Queda como propuesta y no como compromiso, porque exige declarar el
glosario término por término y eso es trabajo del dueño.

**Depende de:** nada, pero conviene después de que `PND-026` a `PND-034` cierren, para no mover dos
veces las mismas claves.

---

# Abiertos — G-METODO: aplicar el método completo, sin que falte una parte que el método exige

*De dónde salen diez de las once entradas de este grupo.* Un tercero —Oscar Schmitz— escribió una novela
que adapta el método, «El Arte de Forjar Sistemas» (191 páginas, 189.115 caracteres, 2026), y se
validó aseveración por aseveración contra la letra: 195 aseveraciones, 154 con veredicto, 108
exactas. El informe completo está en `docs/VALIDACION_LIBRO_EL_ARTE_DE_FORJAR_SISTEMAS.html`. De
ahí salen seis mejoras al método (su § 11, «Lo que el libro hace mejor que el método», `C+01` a
`C+05`, más la lectura que el dueño hizo de las omisiones del § 9) y tres defectos del método (su
§ 12, `C-01` a `C-03`). Esto es, literalmente, lo que el peldaño 23 pide: una propuesta concreta
de cambio a la escalera con el incidente que la justifica. La diferencia con las otras treinta y
ocho entradas es la fuente: no es una auditoría encargada ni una medición propia, es **un lector
que aplicó el método a fondo y lo que le pasó al aplicarlo**. Las etiquetas `M-01` a `M-06` y
`C-01` a `C-03` son las que el dueño usó al pedir el trabajo; las `C+nn` y `O-nn` son las del
informe. Se citan las dos para que se pueda ir de una a la otra. La undécima, `PND-053`, no sale
de ahí: es la mitad de abajo de `PND-039` —la ruta de las dos entradas previas del Anexo H—, que
quedó esperando una declaración del dueño y entró el 2026-10-27.

*Por qué un grupo nuevo y no uno de los cinco que ya hay.* Los cinco grupos existentes son todos
de la **interfaz publicada**: cómo se llega al material (G-ALCANCE), si lo servido es lo último
(G-PUBLICACION), si se puede consumir el dato (G-API), si se lee en el idioma de cada uno
(G-IDIOMA) y si se entiende qué es cada cosa (G-ECOSISTEMA). Las entradas de este grupo son del
**contenido del método**: si lo que el lector recibe está completo, es consistente y se puede
aplicar. La tentación es meter `PND-039` en G-ALCANCE, porque el síntoma se parece, y conviene no
hacerlo: `PND-015` era «el archivo no está enlazado» —un defecto de transporte, cerrado— y
`PND-039` es «el archivo está enlazado y el documento que la gente lee no lo nombra». Mismo
síntoma para el lector, trabajo distinto y dueño distinto. Lo que la persona vino a hacer, que es
la regla madre de B1, acá es **aplicar el método completo**, y eso no está en ninguno de los cinco.

*Lo que costó mecánicamente abrirlo, dicho porque es el tipo de cosa que este registro guarda.*
El grupo nuevo no es sólo una fila: `tests/pending_resumen.test.mjs` lleva la lista cerrada de
grupos en una constante, y una entrada con un grupo que no esté ahí se reporta como «grupo no
reconocido». Así que el grupo entra en tres lugares a la vez —la tabla de los grupos, la constante
de la prueba y la tabla del resumen— o el registro se contradice solo.

---

## PND-039 — El Anexo H no se puede encontrar desde el documento principal *(M-01; informe § 9, O-01 a O-06)*

- **Nodo:** `corpus/anexo-h` [nodo propuesto]
- **Grupo:** G-METODO · **Severidad:** bloquea · **Quién decide:** el trabajo se hace y se
  reporta; vuelve al dueño **una** decisión acotada, la del punto (c)
- **Repositorio:** método · **Estado: CERRADO** el 2026-10-26.
- **Origen:** retrospectiva del peldaño 23 sobre la validación del libro. Es la más importante de
  las diez y la única estructural.

**Qué está mal.** El Anexo H existe, es obligatorio y es mecánicamente exigible, y un lector del
documento principal no se entera de que existe. Son 45 reglas —18 de calidad de código y 27 de
usabilidad—, transversales a los cuatro tramos, enganchadas con dos entradas previas en el peldaño
2 y con cinco anclas en los peldaños 5, 8, 9, 10 y 12, y esas cinco anclas son evaluadores
`required: true` en el dato que el método publica. El documento principal no lo nombra ni una vez.

**Evidencia que me dio el dueño, pegada tal cual.**

> Medido hoy, 2026-10-26:
>   grep -c -i "anexo" docs/ESCALERA_METODOLOGICA.md   -> 0
>   grep -c -i "anexo" README.md                       -> 0
> Cero menciones en 143.274 caracteres del documento principal y cero en el README. Ninguna de las
> veinticuatro fichas lo nombra. Las palabras "usabilidad" y "matriz de perfiles" no aparecen en el
> documento principal en el sentido del anexo.
>
> La evidencia de que esto daña de verdad, y es lo que la hace distinta de una corazonada: el autor
> del libro leyó el documento principal y las 46 referencias con cuidado demostrable --reprodujo
> exactamente las seis cifras de la cuota fundida, las cuatro de los contadores 1.355/1.234 y los
> cinco arreglos del despliegue-- y omitió 27 de las 45 reglas, la lista de perfiles, la matriz y
> las cinco anclas completas. No se le pasaron: nunca supo que estaban. Su proyecto guía quedaría
> detenido en los peldaños 2, 5, 8, 10 y 12 de tus propias compuertas publicadas.

**Mi reproducción (2026-10-26).** Las dos cifras del dueño dan exactamente eso, y la medición
agrega tres cosas que no estaban en el pedido.

```
$ grep -c -i "anexo" docs/ESCALERA_METODOLOGICA.md
0
$ wc -c docs/ESCALERA_METODOLOGICA.md
143274 docs/ESCALERA_METODOLOGICA.md
$ grep -c -i "anexo" README.md
0
$ grep -c -i -E "annex|appendix|heuristic" README.md
0
$ grep -c -i -E "heuristic|matriz de perfiles|45 reglas" docs/ESCALERA_METODOLOGICA.md
0
$ grep -c -i "perfil" docs/ESCALERA_METODOLOGICA.md
1
  ... y la unica mencion es de otra cosa, linea 64: "El perfil que en realidad piden los..."
    (el perfil profesional que pide el mercado, no el perfil de usuario del anexo)

las cinco anclas, leidas del dato y no de la prosa (gates/steps.json):
  peldano  5  u05-pendientes             pendings_profiles         required=true  since_schema=2
  peldano  8  u08-tests-en-rojo          profile_matrix            required=true  since_schema=2
  peldano  9  u09-calidad-de-codigo      heuristics                required=true  since_schema=2
  peldano 10  u10-casos-de-prueba-manual manual_cases_per_profile  required=true  since_schema=2
  peldano 12  u12-verificacion-honesta   heuristics                required=true  since_schema=2
  (en gates/stations.json: ninguna; el camino del legado las hereda al entrar por el 5)

quien cita el anexo, contrato por contrato (castellano):
  docs/peldanos/peldano-05-pendientes.md              4 menciones
  docs/peldanos/peldano-08-tests-en-rojo.md           2
  docs/peldanos/peldano-09-calidad-de-codigo.md       3
  docs/peldanos/peldano-10-casos-de-prueba-manual.md  1
  docs/peldanos/peldano-12-verificacion-honesta.md    1
  -> los CONTRATOS lo citan, 5 de 5. Las FICHAS del documento principal, 0 de 5.

el peldano 2, que es donde nacen las dos entradas previas:
  gates/steps.json, verify[], since_schema 2:
    "Is the user glossary written, with the words people actually use for things?"
    "Is the list of profiles written, saying who each one is and what they come to do?"
  docs/peldanos/peldano-02-definicion-y-lectura.md:
    menciones de "perfil"   -> 0
    menciones de "glosario" -> 0
  -> el dato publicado las exige y ni la ficha ni el contrato las mencionan.
```

**Lo que la medición agrega al pedido, y que cambia el trabajo.** Tres hallazgos.

El primero: **los contratos sí citan el anexo, 5 de 5; lo que no lo cita es el documento
principal**. Eso recorta el trabajo y, sobre todo, condiciona la comprobación del punto (d) de
abajo —ver `PND-048`—.

El segundo: el README **castellano** es el único de los ocho que no tiene la fila del anexo en su
tabla de «Qué hay acá». Las siete traducciones la tienen.

```
README.md              anexo/annex = 0     <- la fuente de verdad
docs/en/README.md      anexo/annex = 1
docs/pt/README.md      anexo/annex = 1
docs/fr/README.md      anexo/annex = 1
docs/de/README.md      anexo/annex = 1
docs/it/README.md      anexo/annex = 1
docs/ja/README.md      anexo/annex = 1
docs/zh/README.md      anexo/annex = 1
(las dos tablas tienen 15 filas; la inglesa tiene ANEXO_HEURISTICAS.md y la castellana, en su
 lugar, EVALUACIONES_DE_IA.md, que es castellano-only)
```

Es D-013 al revés, y vale anotarlo tal cual: la regla dice que un cambio en el castellano se
replica en las siete traducciones, y acá **las siete llevan una fila que la fuente de verdad no
tiene**. Nadie lo hizo mal a propósito; la fila se agregó del lado traducido y nunca volvió.

El tercero es la consecuencia del segundo: el punto (b) del pedido no es «agregar una fila», es
**alinear la fuente con sus traducciones**, y el texto que se escriba tiene que decir lo que las
siete ya dicen o quedan nueve versiones con dos redacciones.

**Qué hay que producir.**

- (a) Que el documento principal nombre el Anexo H donde corresponde: en la Parte A, en el lugar
  donde se explica cómo se lee un peldaño —porque el anexo cambia qué hay que leer—; en la Parte C,
  al abrir los peldaños 5, 8, 9, 10 y 12; y en la ficha de cada uno de esos cinco, con el enlace.
- (b) Que el README castellano lo liste en la tabla de «Qué hay acá», con el texto alineado al que
  ya tienen las siete traducciones.
- (c) **[DECISIÓN DEL DUEÑO]** Si las dos entradas previas —el glosario del usuario y la lista de
  perfiles— se nombran en la ficha del peldaño 2, que es donde la verificación publicada ya las
  comprueba y la ficha no las menciona. Las opciones y su costo van en el informe al dueño, no acá.
- (d) La comprobación que impida que vuelva a pasar. Va en su propia entrada, `PND-048`, porque la
  medición mostró que la forma en que se pidió ya está en verde hoy y no habría atrapado esto.
- Y la réplica en los siete idiomas en el mismo commit (D-013), que no es negociable.

**Criterio de aceptación por perfil.**

- *P6 (lector humano que entra por el documento principal):* dada esa persona, al leer el documento
  principal de punta a punta se entera de que el Anexo H existe, de que es obligatorio y de dónde
  está, sin haber abierto ningún contrato.
- *P7 (lector que adapta el método a otro formato):* dado ese perfil —que es el caso que originó
  esta entrada—, esa persona puede producir su adaptación sin omitir las 45 reglas, porque el
  documento del que parte las nombra.
- *P8 (dueño de proyecto que aplica el método):* dado ese perfil, esa persona sabe antes de empezar
  que cinco peldaños no avanzan sin las piezas del anexo, y no lo descubre cuando la compuerta la
  detiene.
- *P1 (herramienta consumidora que compila las compuertas):* dada una herramienta, lo que el dato
  declara exigible tiene su correlato en la prosa que el usuario de esa herramienta lee, de modo que
  un `required: true` no aparezca como una exigencia de la herramienta sin origen en el método.

**Cómo se verifica.** `grep -c -i "anexo" docs/ESCALERA_METODOLOGICA.md` → mayor que 0, y lo mismo
en `README.md`; cada uno de los cinco peldaños ancla cita el anexo **en su ficha**; `node --test`
en verde; y la comprobación de `PND-048` cayendo en rojo contra el estado de hoy.

**Depende de:** nada. Es la primera del grupo y la que el dueño marcó como la más importante.

**Qué se hizo (2026-10-26).** (a) El documento principal nombra el Anexo H en la Parte A —como
novena parte que aparece sólo en seis peldaños, con la explicación de qué quiere decir "ancla"—, en
la apertura de la Parte C con la advertencia de leerlo antes de abrir el peldaño 5, y en la **ficha**
de los seis peldaños que lo cargan, cada una con una línea que empieza con `**Anexo H**` y con el
enlace al anexo. (b) `README.md` tiene la fila del anexo en su tabla de «Qué hay acá», con el texto
alineado al que ya tenían las siete traducciones. (c) **Decisión del dueño, 2026-10-26:** las dos
entradas previas se nombran en la **ficha y en el contrato** del peldaño 2 —no en una sola—, que es
la forma fuerte; el contrato las pide dentro del prompt y la sección 4 las comprueba. Y lo que la
decisión arrastró: el prompt del peldaño 2 cambió, así que `prompts/catalog.json` sube a
`corpus_version` 2026.10.2 con su huella, y la nota del dato que decía que «el contrato del peldaño
2 todavía no las pide» dejó de ser verdad, así que `gates/heuristics.json` se corrigió y
`catalog_version` subió a 2026.10.4. El camino **no** declara una ruta de archivo para las dos
entradas previas: el dueño nunca la declaró y un nombre inventado ahí se publica como si fuera un
valor de fábrica. Y la réplica en los siete idiomas, en el mismo commit (D-013). (d) La comprobación
está en `PND-048`.

**Evidencia de cierre.** Medido contra el árbol de ayer y contra el de hoy con el mismo programa:

```
$ node build/anexo_simetria.mjs contra HEAD (antes de este cambio)
  regla A (la ficha enlaza el anexo):   48 hallazgos de 48 fichas revisadas
  regla B (el contrato nombra el token): 8 hallazgos (el peldano 2 en los ocho idiomas)

$ node --test   (despues)
  # tests 239 | # pass 239 | # fail 0

$ grep -c -i "anexo" docs/ESCALERA_METODOLOGICA.md   -> 22   (era 0)
$ grep -c -i "anexo" README.md                       -> 1    (era 0)
$ node build/prompts.mjs    -> 54 prompts, traducciones verificadas en los siete, errores: 0
$ node build/api_check.mjs  -> los tres recursos publicados coinciden con las fuentes
```

**Commit.** El que trae este cierre; una entrada no puede citar su propio sha, y el identificador de
git que un build conoce de sí mismo siempre nombra al cambio anterior (es la misma razón por la que
`gates/catalog.json` lo declara informativo). **Decisión:** D-061.

---

## PND-040 — «La cobertura cuenta pruebas. El rojo dice si sirven» *(M-02; informe § 11, C+01)*

- **Nodo:** `corpus/escalera` [nodo propuesto]
- **Grupo:** G-METODO · **Severidad:** registra · **Quién decide:** se hace y se reporta
- **Repositorio:** método · **Estado: CERRADO** el 2026-10-26.

**Qué está mal.** Nada está mal: hay algo mejor escrito afuera. El método explica la relación
entre los peldaños 8 y 9 en varios párrafos de prosa y la ficha del 9 ya dice «la cobertura,
conviene recordarlo, cuenta pruebas». El libro la cierra en nueve palabras y resuelve una de las
confusiones más caras del oficio.

**Evidencia que me dio el dueño, pegada tal cual.**

> Es una máxima del capítulo 7 del libro. El método explica la relación entre los peldaños 8 y 9 en
> varios párrafos y la ficha del 9 dice "la cobertura cuenta pruebas". El libro la cierra en nueve
> palabras y resuelve una de las confusiones más caras del oficio. Entra como una línea en la ficha
> del peldaño 9 y en sus siete traducciones en el mismo commit.

**Mi reproducción (2026-10-26).** La frase del método está donde el dueño dice, y el informe la
registra como máxima `M-057` del libro.

```
informe de validacion, § 11 C+01:
  "Maxima M-057. El metodo explica la relacion entre los peldanos 8 y 9 en varios parrafos de
   prosa. El libro la resuelve en nueve palabras, y es una de las confusiones mas caras del
   oficio."
  "Propuesta: entra como una linea en la ficha del peldano 9, junto a <<la cobertura, conviene
   recordarlo, cuenta pruebas>>."
-> la frase de anclaje existe en la ficha del 9; la cita exacta se pega al escribir el cambio.
```

**Qué hay que producir.** Una línea en la ficha del peldaño 9 del documento principal, con el
crédito al libro en la forma que el método usa para los trabajos ajenos —enlace en la Parte F,
nunca como `Ref. N`—, replicada en los siete idiomas en el mismo commit.

**Criterio de aceptación por perfil.**

- *P6 (lector del documento principal):* dada esa persona, al leer la ficha del peldaño 9 entiende
  en una línea por qué la cobertura no alcanza, sin tener que reconstruirlo de varios párrafos.
- *P8 (dueño de proyecto):* dado ese perfil, esa persona puede repetir la distinción con sus propias
  palabras después de leerla una vez.

**Cómo se verifica.** La línea está en la ficha del 9 en los ocho idiomas; `node build/prompts.mjs`
en verde (la ficha no es un prompt, así que no debería moverse: si se mueve, se tocó lo que no era).

**Depende de:** nada.

**Qué se hizo (2026-10-26).** La máxima entró en la prosa de apertura de la ficha del peldaño 9,
donde la cobertura y el rojo se tocan: «la cobertura cuenta pruebas; el rojo dice si sirven», con el
párrafo que explica por qué un noventa por ciento de cobertura no dice nada sobre si un test se
pondría en rojo. El crédito va en la Parte F.5 y **no** como `Ref. N`. En los ocho idiomas, en el
mismo commit.

**Y una corrección a la evidencia que me dio el dueño, dicha en vez de tapada.** La frase de anclaje
que el pedido citaba —«la cobertura, conviene recordarlo, cuenta pruebas»— **no existe literal** en
la ficha del 9: `grep` de «cuenta pruebas» y de «conviene recordarlo» en `docs/` devuelve sólo las
líneas del propio registro. Era una paráfrasis del informe, no una cita del método. Así que la línea
no se puso «junto a» nada: se puso donde la distinción vive, que es la apertura de la ficha.

**Evidencia de cierre.** La línea está en la ficha del 9 en los ocho idiomas; `node build/prompts.mjs`
en verde (la ficha no es un prompt, y no se movió ninguno). **Decisión:** D-061.

---

## PND-041 — «El dueño no es dueño: es inquilino» *(M-03; informe § 11, C+03)*

- **Nodo:** `corpus/escalera` [nodo propuesto]
- **Grupo:** G-METODO · **Severidad:** registra · **Quién decide:** se hace y se reporta
- **Repositorio:** método · **Estado: CERRADO** el 2026-10-26.

**Qué está mal.** Lo mismo que la anterior: el método dice lo correcto y plano, y el libro lo dice
mejor. El método dice «el sistema tiene que poder usarse, mantenerse y recuperarse sin el agente y
sin vos». La formulación del libro nombra el costo en una palabra que cualquier dueño de negocio
entiende antes de terminar de leerla.

**Evidencia que me dio el dueño, pegada tal cual.**

> Capítulo 12. El método dice "el sistema tiene que poder usarse, mantenerse y recuperarse sin el
> agente y sin vos", que es correcto y plano. La formulación del libro nombra el costo en una
> palabra que cualquier dueño de negocio entiende antes de terminar de leerla. Entra como una línea
> en la ficha del peldaño 20.

**Mi reproducción (2026-10-26).** La frase del método está en la ficha del peldaño 20 y en el
contrato del 20; el informe la registra en su § 11 `C+03`.

```
$ grep -rn "sin el agente y sin vos" docs/ESCALERA_METODOLOGICA.md docs/peldanos/peldano-20-*.md
  (presente en los dos; la cita exacta se pega al escribir el cambio)
```

**Qué hay que producir.** Una línea en la ficha del peldaño 20, con el crédito al libro en la
Parte F, replicada en los siete idiomas en el mismo commit. La formulación se escribe propia o se
cita entre comillas con atribución: la idea es del libro y la frase de cuatro palabras es suya. Las
dos salidas son legítimas; la segunda es cita breve con atribución, que es lo que el método ya hace
con los trabajos ajenos de la Parte F.

**Criterio de aceptación por perfil.**

- *P8 (dueño de proyecto):* dada esa persona, al leer la ficha del peldaño 20 entiende qué le pasa
  si el manual de recuperación no existe, sin que nadie se lo explique.

**Cómo se verifica.** La línea está en la ficha del 20 en los ocho idiomas.

**Depende de:** nada.

**Qué se hizo (2026-10-26).** Entró en la prosa de apertura de la ficha del peldaño 20 y, además, en
el contrato del 20 y en la hoja de las veinticinco preguntas (pregunta 20), porque es el lugar donde
un dueño lee la consecuencia antes de firmar: «el dueño no es dueño, es inquilino», con la
explicación de qué significa —tener el sistema, pagarlo, y no poder entrar sin pedirle permiso a
quien lo construyó—. Crédito en la Parte F.5. En los ocho idiomas, en el mismo commit.

**Evidencia de cierre.** La formulación está en la ficha del 20 en los ocho idiomas y el crédito está
en F.5. **Decisión:** D-061.

---

## PND-042 — La proporcionalidad explicada, en vez de una tabla de veinticuatro filas *(M-04; informe § 11, C+04)*

- **Nodo:** `corpus/escalera` [nodo propuesto]
- **Grupo:** G-METODO · **Severidad:** registra · **Quién decide:** **el dueño** (adoptar la idea,
  la idea con el vocabulario, o nada)
- **Repositorio:** método · **Estado: CERRADO** el 2026-10-26.

**Qué está mal.** La Parte D tiene una tabla de veinticuatro filas marcada `[hipótesis]` para
contestar «¿todo esto para un sistema chico?». El epílogo del libro contesta la misma pregunta con
el marco shu-ha-ri —primero se hace todo como está escrito aunque no se entienda; después se
adapta a lo que uno tiene enfrente; al final se mejora para los que vienen— y lo ancla en la
escena correcta: la dueña decidiendo qué peldaños se achicaban y cuáles no se negociaban.

**Evidencia que me dio el dueño, pegada tal cual.**

> La Parte D tiene una tabla de veinticuatro filas marcada [hipótesis] para contestar "¿todo esto
> para un sistema chico?". El epílogo del libro contesta la misma pregunta con el marco shu-ha-ri:
> primero se hace todo como está escrito aunque no se entienda; después se adapta a lo que uno tiene
> enfrente; al final se mejora para los que vienen. Y lo ancla en la escena correcta: la dueña
> decidiendo qué peldaños se achicaban y cuáles no se negociaban.
> Mi recomendación es adoptar la IDEA y no el vocabulario, porque el método no usa vocabulario de
> budō en ninguna parte y atarlo al aparato de una novela lo vuelve dependiente de ella. Pero es tu
> decisión, y si querés el vocabulario entra con atribución: tres nociones, un párrafo cada una,
> antes de la tabla de la Parte D.

**Mi reproducción (2026-10-26).** La tabla de la Parte D existe, tiene veinticuatro filas y está
marcada `[hipótesis]`; el método no usa vocabulario de budō en ninguna parte.

```
$ grep -c -i -E "shu-ha-ri|shuhari|budo|kata|zanshin|kamae|metsuke" docs/ESCALERA_METODOLOGICA.md
0
nota: "Urazuke" si es japones, y es el nombre del metodo (D-014); eso no hace al metodo un
      documento de vocabulario de budo. El informe de validacion es el unico documento del
      repositorio que usa ese vocabulario, y es porque cita los titulos de los capitulos del
      libro, que es otra cosa.
```

**Qué hay que producir.** Primero la decisión del dueño, con sus opciones y su costo en el informe
que acompaña a este backlog. Después, según lo que decida: la idea escrita con palabras del método
antes de la tabla de la Parte D, o la idea con el vocabulario y su atribución, o nada. En los ocho
idiomas, en el mismo commit.

**Criterio de aceptación por perfil.**

- *P8 (dueño de proyecto con un sistema chico):* dada esa persona, al preguntarse «¿todo esto para
  esto?» encuentra la respuesta antes de la tabla y no tiene que deducirla de veinticuatro filas.
- *P6 (lector del documento principal):* dada esa persona, lo que lee no depende de haber leído una
  novela para entenderse.

**Cómo se verifica.** El párrafo está antes de la tabla de la Parte D en los ocho idiomas, y si se
adoptó el vocabulario, su atribución está en la Parte F.

**Depende de:** la decisión del dueño.

**Decisión del dueño (2026-10-26):** se adopta **la idea y no el vocabulario**, que es lo que el
propio dueño recomendó. El método no usa vocabulario de budō en ninguna parte y atarlo al aparato de
una novela lo volvería dependiente de ella.

**Qué se hizo.** Tres párrafos antes de la tabla de la Parte D, con palabras del método y en orden:
primero se hace completo, incluso lo que no se entiende para qué —porque la primera vez no estás en
condiciones de saber qué parte te sobra—; después se adapta a lo que tenés enfrente, y la decisión es
del dueño, peldaño por peldaño y **escrita antes de empezar**, porque «un peldaño achicado por
decisión escrita es proporcionalidad; achicado en silencio, es deuda»; y al final se mejora para los
que vienen, que es el peldaño 23 devolviendo la retrospectiva como propuesta de cambio. En los ocho
idiomas, en el mismo commit. La Parte F.5 acredita la idea.

**Evidencia de cierre.** Los tres párrafos están antes de la tabla de la Parte D en los ocho idiomas,
y el vocabulario de budō sigue en cero en el documento principal:
`grep -c -i -E "shu-ha-ri|shuhari|budo|kata" docs/ESCALERA_METODOLOGICA.md` → 0. **Decisión:** D-061.

---

## PND-043 — Las veinticinco preguntas para el proveedor, y la cuestión de licencia *(M-05; informe § 11, C+02)*

- **Nodo:** `corpus/hoja-del-dueno` [nodo propuesto]
- **Grupo:** G-METODO · **Severidad:** avisa · **Quién decide:** **el dueño**, y hay una cuestión
  de licencia que no la resuelve el agente
- **Repositorio:** método · **Estado: CERRADO** el 2026-10-26.

**Qué está mal.** El método tiene la «verificación de completitud sin leer código» dentro de cada
contrato —una sección 4 por contrato, en los veinticuatro peldaños y las ocho estaciones— y no
tiene la pieza que un dueño que nunca contrató software pueda llevar a una reunión: una hoja. El
Anexo II del libro agrupa veinticinco preguntas por promesa, con este criterio al frente: «las
respuestas que valen son las que se pueden ver: un archivo, un número con su comando, una prueba en
rojo, un manual, una firma. Las que no se pueden ver son promesas». A juicio del dueño es el mejor
aporte del libro y es material de la landing y del curso.

**Evidencia que me dio el dueño, pegada tal cual.**

> El Anexo II del libro agrupa veinticinco preguntas por promesa, con este criterio al frente: "las
> respuestas que valen son las que se pueden ver: un archivo, un número con su comando, una prueba
> en rojo, un manual, una firma. Las que no se pueden ver son promesas". El método tiene la
> verificación de completitud dentro de cada contrato, pero no tiene esta pieza: una hoja que un
> dueño que nunca contrató software pueda llevar a una reunión. Es, a mi juicio, el mejor aporte del
> libro y material de la landing y del curso.
>
> La cuestión de licencia, y no la resuelvas vos: Urazuke se publica bajo CC BY-SA 4.0 y la página
> de créditos del libro dice "© 2026 Oscar Schmitz" sin conceder licencia alguna sobre la
> adaptación. Absorber su Anexo II textual sería tomar derechos reservados dentro de una obra BY-SA.
> Las preguntas derivan en buena parte de tu método, pero la agrupación y la redacción son suyas.
> Tres caminos:
>   (a) pedirle permiso al autor y acreditarlo;
>   (b) escribirlas de cero desde las verificaciones de completitud de los contratos, que es de
>       donde salen, y acreditar al libro como origen de la idea;
>   (c) no hacerlo.
> Yo recomiendo (b): te queda una pieza propia, trazable a tus contratos, sin deuda de licencia, y
> el crédito al libro es honesto porque la idea es suya.

**Mi reproducción (2026-10-26).** Lo que se puede medir de este lado se midió; lo del libro es
palabra del dueño y queda marcado como tal.

```
la licencia del metodo: CC BY-SA 4.0, declarada en LICENSE, en README.md y en CLAUDE.md.

la pieza que falta, medida en el metodo:
  "verificacion de completitud sin leer codigo" es la seccion 4 de cada contrato: esta en los
  24 contratos de peldano y en las 8 estaciones del camino evolutivo-correctivo. NINGUN
  documento del corpus las junta en una hoja: no hay ningun archivo cuyo contenido sea una
  lista de preguntas para llevarle a un proveedor.

[dato del dueno, NO reproducido por mi] la pagina de creditos del libro dice "(c) 2026 Oscar
Schmitz" sin conceder licencia. No tengo el libro, asi que esto no lo verifique: entra como
afirmacion del dueno, y la decision de licencia se toma sobre su lectura, no sobre la mia.

el costo mecanico de un documento nuevo del corpus, medido:
$ sed -n '34p' build/build.mjs
  for (const nombre of ['ESCALERA_METODOLOGICA', 'REFERENCIAS', 'EVOLUTIVO_CORRECTIVO',
    'MANUAL_CURSO', 'MANUAL_CURSO_EVOLUTIVO', 'CAPACITACION_JUNIOR', 'TRABAJO_COLABORATIVO',
    'EVALUACIONES_DE_IA', 'ANEXO_HEURISTICAS', 'COMPUERTAS']) {
  -> es un arreglo literal. Un documento que no este ahi EXISTE y NO SE PUBLICA.
     Y D-052: la publicacion no toca la landing; enlazarlo desde la portada es un trabajo
     aparte en el repositorio del portal, y hasta que se haga queda huerfano --que ahora el
     chequeo de PND-025 avisa por su nombre, que es para lo que se escribio.
```

**Qué hay que producir.** Primero la decisión del dueño entre (a), (b) y (c), con la recomendación
y los costos en el informe que acompaña a este backlog. Si sale (a) o (b): un documento nuevo del
corpus, en los ocho idiomas en el mismo commit, agregado al arreglo literal de `build/build.mjs`,
y un pendiente propio para enlazarlo desde la portada en el repositorio del portal.

**Criterio de aceptación por perfil.**

- *P8 (dueño de proyecto que nunca contrató software):* dada esa persona, puede entrar a una reunión
  con un proveedor con una hoja de preguntas cuyas respuestas se pueden ver, y reconocer una promesa
  cuando la escucha.
- *P6 (lector del documento principal):* dada esa persona, llega a esa hoja desde el documento que
  está leyendo.
- *P5 (auditor):* dado ese perfil, cada pregunta de la hoja es trazable a la verificación de
  completitud del contrato de la que sale, de modo que la pieza sea del método y no un préstamo.

**Cómo se verifica.** Si se produce: el documento existe en los ocho idiomas, está en el arreglo de
`build/build.mjs`, `node build/build.mjs` lo genera, y `node build/portal_orphans.mjs` lo nombra
como huérfano hasta que la portada lo enlace.

**Depende de:** la decisión del dueño, y de la cuestión de licencia.

**Decisión del dueño (2026-10-26):** camino **(b)**, que es el que el dueño recomendó: las preguntas
se escriben **de cero** desde la verificación de completitud de los contratos, y el libro se acredita
como origen de la idea. Sin deuda de licencia, y la pieza queda del método.

**Qué se hizo.** `docs/PREGUNTAS_AL_PROVEEDOR.md`, en los ocho idiomas del corpus y en el mismo
commit, agregado al arreglo literal de `build/build.mjs` (si no está ahí, el documento existe y no se
publica). Veinticinco preguntas agrupadas por **lo que le están prometiendo** al dueño —se lo entrego
funcionando, sé lo que falta y en qué orden, está bien hecho, no te va a hacer daño, va a aguantar, te
voy a decir la verdad—, cada una con **qué respuesta se puede ver** y con el peldaño del que sale, así
que cada pregunta es trazable a su contrato. Más el criterio al frente (las respuestas que valen son
las que se pueden ver), las tres frases que significan «no tengo eso», las cinco que traen más
información si la reunión es corta, y la aclaración honesta en la otra dirección: un «no» con su razón
escrita es una buena respuesta, y es lo que el método llama proporcionalidad. El documento principal
la enlaza desde la Parte D, donde explica la verificación de completitud, y `README.md` la lista.

**Lo que NO se hizo, y por qué está dicho acá.** La portada del portal no la enlaza: la publicación
espeja `docs/html/` y **no toca la landing** (D-052). Hasta que alguien la agregue al índice y al i18n
de la portada, el documento va a quedar **huérfano**, y eso ahora lo avisa por su nombre el chequeo de
PND-025. Queda como entrada propia: `PND-049`.

**Evidencia de cierre.** Los ocho archivos existen, los ocho tienen las veinticinco preguntas
(`grep -c "^\*\*[0-9]\{1,2\}\."` → 25 en los ocho), `node build/build.mjs` generó los ocho HTML, y
`node --test` quedó en 239 de 239. **Decisión:** D-061.

---

## PND-044 — Lo que la prueba del manual de recuperación tiene que registrar *(M-06; informe § 11, C+05)*

- **Nodo:** `corpus/contratos` [nodo propuesto]
- **Grupo:** G-METODO · **Severidad:** avisa · **Quién decide:** se hace y se reporta
- **Repositorio:** método · **Estado: CERRADO** el 2026-10-26.

**Qué está mal.** El peldaño 20 ya exige que una persona que no programa siga el manual de
recuperación antes del primer despliegue. Lo que falta es lo que esa prueba **produce** cuando se
hace bien: el tiempo medido de punta a punta, el punto exacto donde la persona se trabó, y la
palabra que no entendió, vuelta propuesta de cambio a la escalera con su nombre y su fecha.

**Evidencia que me dio el dueño, pegada tal cual.**

> El peldaño 20 ya exige que una persona que no programa siga el manual de recuperación antes del
> primer despliegue. Lo que el libro muestra, y es lo que produce esa prueba cuando se hace bien: el
> tiempo medido de punta a punta, el punto exacto donde la persona se trabó, y la palabra que no
> entendió, vuelta propuesta de cambio a la escalera con su nombre y su fecha.
> Propuesta: que la compuerta del 20 pida que la ejecución registre el tiempo, el punto donde se
> trabó y las palabras que el lector no entendió, y que cada una de esas palabras abra un pendiente.
> ANTES de escribirlo, averiguá si esto ya está en docs/practica, donde el proyecto guía del curso
> (Turnera) corrió los veinticuatro contratos y puede estar documentado ahí con evidencia real. Si
> está, esto no es una mejora nueva: es una cosa de la práctica que falta subir a la ficha, y el
> pendiente lo dice así.
> Y una regla que no se negocia: la escena del libro no es una "Ref. N". Las referencias son casos
> propios reales con fecha y commit, y mezclar una novela ahí rompe lo único que hace útil a ese
> archivo.

**Mi reproducción (2026-10-26).** Lo averigüé antes de escribirlo, que es lo que el dueño pidió:
**no está en la práctica**. Es una mejora nueva, no una cosa de la práctica que falte subir.

```
$ grep -rn -i -E "se trab|no entend|palabra que no|minutos de punta a punta|tiempo medido" docs/practica/
  (ninguna coincidencia)

lo que SI hay en la practica, peldano 20:
$ sed -n '433,437p' docs/practica/MANUAL_FORGE_PROYECTO_NUEVO.md
  ### Peldano 20: manuales que una persona puede seguir sin IA
  docs/USER_MANUAL.md (para la recepcionista), docs/MAINTENANCE_MANUAL.md (arrancar, parar,
  copia de seguridad, leer el registro), docs/INFRASTRUCTURE_AND_RECOVERY_MANUAL.md (que hay y
  como se recupera desde cero en una tarde) y docs/CHANGELOG.md. Forge verifica los cuatro.

$ ls docs/practica/evidencia/turnera/
  AUDIT_2026-10-19.md  CODE_QUALITY.md  GOTCHAS.md  MEASUREMENTS.md
  MONITORING_REPORT_2026-10-19.md  PERFORMANCE_2026-10-19.md  RETROSPECTIVE_2026-10-19.md
  SIZING.md  git_log.txt  mutante_sobreturno.diff  pending.json  receipts.json  recibos.txt
  sizing.json  urazuke_status.json  urazuke_status.txt  workflow_instances.json
  -> hay evidencia de que la herramienta VERIFICA los cuatro manuales. No hay ni un registro
     de una persona que no programa siguiendolo, con tiempo, traba y palabras.

lo que el contrato del 20 ya pide, y donde entra el cambio:
$ grep -n -i -E "no programa|recuperaci" docs/peldanos/peldano-20-documentacion-viva.md
  130: - El manual de recuperacion lo podrias seguir vos, o alguien de confianza que no programe?
  144: - Nadie fuera del constructor leyo nunca el manual de recuperacion. Pedile a alguien que
       lo siga
  -> la seccion 4 (verificacion) y la 5 (senales de alarma) piden la prueba; ninguna de las dos
     pide el REGISTRO de su resultado.
```

**Y una cosa que la medición agrega.** Que la práctica no lo tenga **es, en sí, el dato**: el
proyecto guía corrió los veinticuatro contratos y esta prueba no dejó registro de su resultado. O
sea que el peldaño pide la prueba, la práctica la pasó, y nadie puede decir cuánto tardó la persona
ni dónde se trabó. Es la misma familia que las cuatro guardas dormidas: la compuerta existe, se
cumplió, y no produjo evidencia.

**Qué hay que producir.** El cambio en el contrato del peldaño 20 —sección 3, resultado esperado, y
sección 4, verificación— y en la ficha del 20: la ejecución registra el tiempo de punta a punta, el
punto donde la persona se trabó y las palabras que no entendió, y **cada palabra abre un
pendiente**. En los ocho idiomas, en el mismo commit. La escena del libro se acredita en la Parte
F; **no** entra como `Ref. N`.

**Criterio de aceptación por perfil.**

- *P8 (dueño de proyecto):* dada esa persona, después de la prueba tiene tres cosas escritas —cuánto
  tardó, dónde se trabó, qué palabras no entendió— y no «la prueba se hizo».
- *P6 (lector del documento principal):* dada esa persona, al leer la ficha del 20 sabe qué tiene
  que quedar escrito cuando la prueba termina.
- *P1 (herramienta consumidora):* dada una herramienta que compila las compuertas, el requisito
  nuevo es verificable sin leer código —hay un registro con tres campos, o no hay—.

**Cómo se verifica.** El contrato y la ficha del 20 lo piden en los ocho idiomas;
`node build/prompts.mjs` en verde (si el cambio toca un prompt, es una pieza en inglés idéntica en
las ocho versiones y el verificador lo exige).

**Depende de:** nada.

**Qué se hizo (2026-10-26).** El contrato del peldaño 20 pide ahora el **registro** de la prueba: en
«Para qué sirve» dice qué produce la prueba cuando se hace bien, la sección 3 lo exige como artefacto
con sus cuatro campos —fecha y nombre de quien la hizo, tiempo medido de punta a punta, el paso exacto
donde se trabó con sus palabras, y la lista de palabras que no entendió, más un pendiente por palabra—,
la sección 4 lo comprueba sin leer código y la sección 5 agrega sus dos señales de alarma (la prueba
que se hizo y no quedó registrada, y el registro sin ni una palabra en la lista). En la ficha del 20
entró como una parte propia, antes de «Quién decide», y la compuerta ahora dice «y la ejecución dejó su
registro». En los ocho idiomas, en el mismo commit. La escena del libro se acredita en F.5 y **no**
entra como `Ref. N`.

**Y el dato lo exige, que es lo que hace el requisito verificable sin leer código.** `gates/steps.json`
lleva una entrada **nueva** de `verify` en el peldaño 20, con su `since_schema` y sin tocar la base, que
pregunta por las tres cosas y por el pendiente de cada palabra. No declara una ruta de artefacto a
propósito: el método no nombra un archivo para eso y un nombre inventado ahí se publicaría como un
valor de fábrica. Por eso `catalog_version` subió a 2026.10.4 con su huella en el changelog.

**Evidencia de cierre.** `node build/gates_validate.mjs` → validado (24 peldaños, 8 estaciones, 45
reglas); `node build/api_check.mjs` → los tres recursos coinciden; `node build/gates_doc.mjs --check` →
`docs/COMPUERTAS.md` coincide con los datos; `node --test` → 239 de 239. **Decisión:** D-061.

---

## PND-045 — La Ref. 22 se contradice a sí misma, y por eso un tercero se equivocó *(C-01; informe § 12)*

- **Nodo:** `corpus/referencias` [nodo propuesto]
- **Grupo:** G-METODO · **Severidad:** avisa · **Quién decide:** se hace y se reporta
- **Repositorio:** método · **Estado: CERRADO** el 2026-10-26.

**Qué está mal.** La misma referencia dice dos cosas distintas en cuatro lugares. Son compatibles
—cuatro rondas producen tres retornos— y ninguna lo explicita. Es el único error del libro que el
método le facilitó.

**Evidencia que me dio el dueño, pegada tal cual.**

> Título: "cuatro rondas hasta la causa raíz". Cuerpo: "un bug volvió TRES veces hasta que se
> encontró la causa real". Tabla de fallos: "tres arreglos que no eran de raíz". Las tres son
> compatibles --cuatro rondas producen tres retornos-- y ninguna lo explicita. El libro leyó el
> título y escribió "volvió cuatro veces". Es el único error que el método le facilitó.
> Arreglo: una aclaración en el cuerpo de la Ref. 22.

**Mi reproducción (2026-10-26).** Las citas están donde el dueño dice, y son exactamente esas. La
medición agrega que no son tres lugares sino cuatro, y que otros dos documentos propagan el título.

```
$ grep -n -i "tres arreglo\|cuatro ronda\|PND-300" docs/REFERENCIAS.md
205: ### Ref. 22 - PND-300: cuatro rondas hasta la causa raiz (14 de julio)
444: | 14 de julio | PND-300, cuatro rondas | Arreglo de raiz o no es arreglo | pendiente 300 |
484: | PND-300: tres arreglos que no eran de raiz | Ref. 22 | 1, cero deuda; 7, medir | cerrado |

$ sed -n '207,208p' docs/REFERENCIAS.md
Un bug volvio tres veces hasta que se encontro la causa real, el 14 de julio. Cada "arreglo"
anterior habia sido sobre el sintoma.

-> cuatro lugares: el titulo (cuatro rondas), el cuerpo (volvio tres veces), la cronologia de
   la linea 444 (cuatro rondas) y la tabla de fallos de la 484 (tres arreglos).

y la Ref. 22 la citan dos documentos mas, los dos con la version del titulo:
$ grep -rn "cuatro rondas hasta la causa raiz" docs/ESCALERA_METODOLOGICA.md docs/peldanos/
  docs/ESCALERA_METODOLOGICA.md:1113
  docs/peldanos/peldano-22-monitoreo-de-errores.md:25
-> o sea que la version "cuatro" esta en cuatro lugares y la version "tres" en dos, y el unico
   lugar donde las dos aparecen juntas es la propia Ref. 22. Por eso el arreglo va ahi.
```

**Qué hay que producir.** Una aclaración en el cuerpo de la Ref. 22 que diga la aritmética en voz
alta —cuatro rondas de arreglo, tres retornos— de modo que el título, la cronología y la tabla de
fallos se lean como lo que son: la misma cuenta desde dos lados. En los ocho idiomas, en el mismo
commit.

**Criterio de aceptación por perfil.**

- *P7 (lector que adapta el método a otro formato):* dado ese perfil, esa persona que lee sólo el
  título de la Ref. 22 no puede concluir un número distinto del que dice el cuerpo.
- *P5 (auditor):* dado ese perfil, las cuatro menciones de la Ref. 22 se pueden conciliar sin tener
  que suponer la aritmética.

**Cómo se verifica.** El cuerpo de la Ref. 22 dice las dos cifras y su relación, en los ocho
idiomas.

**Depende de:** nada.

**Qué se hizo (2026-10-26).** Un párrafo nuevo en el cuerpo de la Ref. 22 que dice la aritmética en
voz alta: cuatro rondas de arreglo y tres retornos, con las cuatro rondas enumeradas una por una, y la
razón de que quede escrito —«si una referencia deja que alguien que la lee con cuidado saque otro
número, el defecto es de la referencia»—. El título, la cronología y la tabla de fallos no se tocaron:
ahora se leen como lo que son, la misma cuenta desde dos lados. En los ocho idiomas, en el mismo
commit.

**Evidencia de cierre.** El cuerpo de la Ref. 22 dice las dos cifras y su relación en los ocho
idiomas. **Decisión:** D-061.

---

## PND-046 — Un «fallo que evita» que cita un caso sin referencia, y no es uno solo *(C-02; informe § 12)*

- **Nodo:** `corpus/referencias` [nodo propuesto]
- **Grupo:** G-METODO · **Severidad:** registra · **Quién decide:** **el dueño** elige, caso por
  caso, entre escribir la referencia o quitar la mención
- **Repositorio:** método · **Estado: abierto**

**Qué está mal.** Hay fichas que citan un caso concreto en su «fallo que evita» sin su `[Ref. N]`,
así que nadie puede llegar a la evidencia. Es exactamente la clase de afirmación sin respaldo que
el método persigue, y un tercero que la reproduce la propaga sin que nadie pueda auditarla.

**Evidencia que me dio el dueño, pegada tal cual.**

> Su "fallo que evita" dice "el documento desactualizado que provocó un commit en el repositorio
> equivocado". Es el único "fallo que evita" de los veinticuatro sin su [Ref. N]: no tiene fecha ni
> commit, así que nadie puede auditarlo. Y el libro, al reproducirla, propaga una afirmación sin
> respaldo, que es exactamente lo que el método persigue.
> Arreglo: o una referencia nueva con su evidencia, o se quita la mención.

**Mi reproducción (2026-10-26), y acá la medición no coincide con el pedido.** El caso que el dueño
nombra está sin referencia, sí. Pero no es «el único», y la ficha del 20 **no** está sin
referencias: lleva dos.

```
contadas por maquina las 24 fichas mas la plantilla de la Parte A:
  "fallo que evita" con al menos un [Ref. N]: 22
  sin ningun [Ref. N]: 3, y una de las tres es la PLANTILLA de la Parte A (linea 224), que
  explica como se lee una ficha y no es una ficha. Quedan dos fichas reales:

  peldano  0 (linea 520): "meterse en un proyecto donde el agente no puede verificarse solo, o
             donde no hay un dueno del dominio que decida, y terminar con el humano revisando
             codigo linea por linea."
             -> NO cita ningun caso concreto: es una categoria de problema. A mi juicio no
                necesita referencia, y eso es una lectura mia, no una medicion.

  peldano 10 (linea 817): "... el menu desplegable incomodo que ningun test vio y la encargada
             si, en el proyecto guia del curso."
             -> SI cita un caso concreto, con protagonista y lugar, y SIN [Ref. N]. Es el mismo
                defecto que el dueno nombro, en una ficha que no estaba en el pedido.

  peldano 20 (linea 1059), la que el dueno nombra:
    "- **Fallo que evita**: el documento desactualizado que provoco un commit en el repositorio
      equivocado; el archivo de proyecto convertido en historial [Ref. 41](...#ref-41). Los
      manuales reproducibles a mano son los de la Obra Social [Ref. 24](...#ref-24)."
    -> el parrafo tiene TRES clausulas y DOS referencias. La que esta sin respaldo es la
       primera clausula, no la ficha.

$ grep -c "^### Ref\. " docs/REFERENCIAS.md
46        (Ref. 1 a Ref. 46, sin huecos: una referencia nueva seria Ref. 47)
```

**Lo que eso cambia.** El alcance. No es «la única ficha sin referencia»: son **dos clausulas sin
respaldo en dos fichas** —la primera del peldaño 20 y la del peldaño 10—, y una tercera ficha (la
del peldaño 0) que no cita ningún caso y por lo tanto no debería llevar referencia. Arreglar sólo
la que el dueño vio dejaría la otra viva, y la próxima persona que la reproduzca propagará lo mismo.

**Qué hay que producir.** Por cada una de las dos clausulas, una de dos: la referencia nueva con su
fecha y su commit, o quitar la mención. Las dos salidas son legítimas y la elección es del dueño
caso por caso, porque depende de si la evidencia existe —eso lo sabe él, no yo—. Si entra una
referencia nueva es `Ref. 47` y siguiente, y la numeración es append-only como todo en este
proyecto. En los ocho idiomas, en el mismo commit. Y queda dicho de paso: **la escena del libro no
es candidata a `Ref. N`**; las referencias son casos propios reales.

**Criterio de aceptación por perfil.**

- *P5 (auditor):* dado ese perfil, toda afirmación de un caso concreto en un «fallo que evita»
  tiene su `[Ref. N]` con fecha y commit, o no está.
- *P7 (lector que adapta el método):* dado ese perfil, esa persona no puede reproducir un caso del
  método sin poder llegar a su evidencia.

**Cómo se verifica.** Por el dueño, caso por caso: cada una de las dos cláusulas queda con su
`[Ref. N]` o no está. **Y lo que no se puede verificar por máquina queda dicho**, medido el
2026-10-26 al preparar `PND-048`: «cita un caso concreto» no es decidible. La regla por viñeta
—«cada fallo que evita lleva al menos una referencia»— deja **22 de 24 en verde y el peldaño 20
pasa**, que es justo el que motivó esta entrada, porque su viñeta lleva dos referencias y la
cláusula sin respaldo es la primera de tres. La regla por cláusula da **8 rojos de 50 cláusulas y 5
de esos 8 son falsos** (son categorías de problema, no casos), y además no viaja: el japonés no
separa con punto y coma y el chino parte una ficha distinto, así que «peldaño + número de cláusula»
no es una llave independiente del idioma. De `PND-048` esta entrada se lleva entonces **sólo los
dos candados decidibles**: que el conjunto de referencias de cada ficha sea idéntico en los ocho
idiomas (24 de 24 en verde hoy) y que cada «fallo que evita» lleve al menos una referencia o esté
registrado como genérico con su razón, como el anexo exige para un interruptor apagado.

**Depende de:** del dueño, para saber si la evidencia de cada caso existe.

**Lo que sí quedó cerrado de esta entrada (2026-10-26).** Los dos candados decidibles están en
`tests/anexo_simetria.test.mjs` y en verde: el conjunto de `[Ref. N]` de cada ficha es idéntico en los
ocho idiomas (24 de 24), y cada «fallo que evita» lleva su referencia **o está registrado con su
razón**. Las dos cláusulas sin respaldo quedan registradas ahí, cada una por lo que es: la del peldaño
0 como categoría de problema que no necesita referencia, y la del peldaño 10 como **deuda de este
pendiente**, con su razón y nombrando `PND-046`. El registro se vacía solo: el día que la ficha
consiga su `[Ref. N]`, la prueba cae pidiendo que se saque el registro. Lo que falta sigue siendo lo
mismo y sigue siendo del dueño: decidir, para cada una de las dos cláusulas, entre escribir la
referencia con su fecha y su commit o quitar la mención.

---

## PND-047 — La obligatoriedad de las pruebas de mutación se dice de dos maneras *(C-03; informe § 12)*

- **Nodo:** `proyecto/instrucciones` [nodo propuesto]
- **Grupo:** G-METODO · **Severidad:** avisa · **Quién decide:** se hace y se reporta
- **Repositorio:** método · **Estado: CERRADO** el 2026-10-26.

**Qué está mal.** El método dice en todas partes que con usuarios reales la mutación es
obligatoria, y `CLAUDE.md` —que es lo que un agente lee **como instrucción**— dice que el prompt es
opcional. La ambigüedad se resuelve del lado equivocado, y por el lector de peor consecuencia.

**Evidencia que me dio el dueño, pegada tal cual.**

> La ficha del peldaño 9 dice "obligatorias en cualquier proyecto con usuarios, opcionales sólo sin
> usuarios reales", y la verificación publicada lo confirma: "con usuarios reales, ¿se mide el
> puntaje de mutación por bloque?". CLAUDE.md dice "el peldaño 9 tiene un tercer prompt, OPCIONAL,
> de pruebas de mutación" (D-033). CLAUDE.md se lee como instrucción, así que la ambigüedad se
> resuelve del lado equivocado.
> Arreglo: alinear la frase de CLAUDE.md. Opcional sin usuarios reales, obligatorio con ellos.

**Mi reproducción (2026-10-26).** Las cinco fuentes, leídas una por una. Cuatro dicen lo mismo y la
quinta es la que está mal.

```
1) el documento principal, ficha del peldano 9 (linea 1363):
   "... las pruebas de mutacion son obligatorias en cualquier proyecto con usuarios (quedan ..."
2) el contrato del 9 (lineas 12-13):
   "... completo, con pruebas de mutacion incluidas, en cualquier proyecto con usuarios. Las
    pruebas de mutacion quedan como refuerzo opcional solo cuando no hay usuarios reales"
3) el dato publicado, gates/steps.json (linea 470):
   "With real users, is the mutation score measured per block, and did every surviving mutant
    in new code open a pending item?"
4) el registro de versiones del catalogo, gates/catalog.json:
   "... plus the mandatory mutation testing of step 9."
5) CLAUDE.md (linea 99):
   "... el peldano 9 tiene un tercer prompt, opcional, de pruebas de mutacion."
   -> la unica de las cinco que dice "opcional" sin su condicion.
```

**Por qué importa más de lo que parece.** Las otras cuatro fuentes las lee una persona, que puede
reconciliar; la quinta la lee un agente, que la toma como orden. Y el informe lo registra como causa
parcial de la omisión `O-03` del libro: el proyecto guía tiene usuarios y dinero, así que ahí la
mutación es obligatoria, y el libro la usó una sola vez como recurso puntual.

**Qué hay que producir.** Alinear la frase de `CLAUDE.md`: el tercer prompt es opcional sin usuarios
reales y obligatorio con ellos. `CLAUDE.md` no se traduce, así que esto es un archivo. Y revisar si
la frase de D-033 en `docs/DECISIONES.md` tiene el mismo problema: si lo tiene, **no se edita la
decisión** —las decisiones son append-only y llevan las palabras textuales de su día—, se aclara en
la decisión nueva de esta retrospectiva.

**Criterio de aceptación por perfil.**

- *P1 (herramienta consumidora, o agente que lee `CLAUDE.md` como instrucción):* dado ese lector, lo
  que concluye sobre la obligatoriedad de la mutación es lo mismo que concluye un lector de la ficha
  del peldaño 9 y lo mismo que exige el dato publicado.
- *P8 (dueño de proyecto con usuarios reales):* dada esa persona, nadie le dice que la mutación es
  opcional en su proyecto.

**Cómo se verifica.** Las cinco fuentes de arriba dicen lo mismo, leídas una por una. No requiere
regenerar nada: `CLAUDE.md` no entra al corpus ni a la huella.

**Depende de:** nada. Es la más barata de las diez y la de peor consecuencia por unidad de costo.

**Qué se hizo (2026-10-26).** La frase de `CLAUDE.md` quedó alineada con las otras cuatro fuentes: el
tercer prompt del peldaño 9 es **obligatorio en cualquier proyecto con usuarios y opcional sólo cuando
no hay usuarios reales**, y queda dicho por qué es un prompt aparte —porque se agrega, no porque se
pueda saltear—. D-033 **no se editó**: las decisiones llevan las palabras de su día, y la aclaración
vive en D-061, que es lo que la propia entrada pedía.

**Evidencia de cierre.** Las cinco fuentes leídas una por una dicen lo mismo:

```
1) ficha del peldano 9  -> "obligatorias en cualquier proyecto con usuarios (quedan opcionales solo
                            sin usuarios reales)"
2) contrato del 9       -> "con pruebas de mutacion incluidas, en cualquier proyecto con usuarios"
3) gates/steps.json     -> "With real users, is the mutation score measured per block...?"
4) gates/catalog.json   -> "plus the mandatory mutation testing of step 9"
5) CLAUDE.md            -> "obligatorio en cualquier proyecto con usuarios y opcional solo cuando
                            no hay usuarios reales"   <- era la unica que decia "opcional" a secas
```

No requirió regenerar nada: `CLAUDE.md` no entra al corpus ni a la huella. **Decisión:** D-061.

---

## PND-048 — La comprobación que exige que la prosa cite lo que el dato declara exigible *(deriva de M-01, punto d)*

- **Nodo:** `cadena/verificacion` [nodo propuesto]
- **Grupo:** G-METODO · **Severidad:** avisa · **Quién decide:** se hace y se reporta; vuelve al
  dueño la elección de la forma, porque la que se pidió ya está en verde
- **Repositorio:** método · **Estado: CERRADO** el 2026-10-26.

**Qué está mal.** Nada todavía: esto es la guarda que impide que `PND-039` vuelva. Y existe como
entrada propia por una razón medida: **la comprobación tal como se pidió ya está en verde hoy y no
habría atrapado nada.**

**Evidencia que me dio el dueño, pegada tal cual.**

> Y proponeme además una comprobación que impida que vuelva a pasar: algo que falle si un peldaño
> que tiene un evaluador del anexo en gates.json no lo cita en su ficha o en su contrato. Esa
> asimetría entre el dato y la prosa es justo lo que el peldaño 11 persigue.

**Mi reproducción (2026-10-26).** La forma pedida es una disyunción —ficha **o** contrato— y los
contratos lo citan los cinco.

```
peldano  5  ancla pendings_profiles         contrato: 4 menciones   ficha: 0
peldano  8  ancla profile_matrix            contrato: 2 menciones   ficha: 0
peldano  9  ancla heuristics                contrato: 3 menciones   ficha: 0
peldano 10  ancla manual_cases_per_profile  contrato: 1 mencion     ficha: 0
peldano 12  ancla heuristics                contrato: 1 mencion     ficha: 0

con la regla "ficha O contrato":  5 de 5 en VERDE, hoy, con el defecto de PND-039 puesto.
con la regla "ficha Y contrato":  5 de 5 en ROJO, que es lo que corresponde.
```

Es la quinta guarda dormida del proyecto, y la primera que se detecta **antes** de escribirla: una
disyunción donde una de las dos ramas siempre se cumple no es una compuerta, es un verde
garantizado. Las cuatro anteriores se descubrieron después de haber confiado en ellas.

**Segunda medición (2026-10-26, al preparar la decisión), y es la que fija la forma.** «Citar el
anexo» se puede medir de tres maneras y las tres dan números distintos sobre el mismo árbol:

```
                                          fichas (5x8)   contratos (5x8)
la palabra del idioma de cada version        0 de 40        40 de 40
el token ingles "Annex H"                    0 de 40        40 de 40
el enlace al archivo ANEXO_HEURISTICAS.md    0 de 40        16 de 40  (solo peldanos 5 y 9)
```

La fila del medio explica la de arriba: los contratos dan 40 de 40 **en los ocho idiomas** porque
la cita vive dentro del **prompt en inglés**, y `build/prompts.mjs` exige que ese prompt sea la
misma pieza byte a byte en las ocho versiones. La rama «el contrato lo cita» no está verde por
casualidad: está verde **por construcción**, y lo va a seguir estando.

De ahí sale la forma recomendada, que es una mezcla y no un compromiso: en la **ficha**, el
**enlace** —cero vocabulario por idioma, falsable hoy (0 de 40) y además le sirve al lector, porque
`build/md2html.mjs` lo convierte en el `.html` que la portada ya enlaza desde `PND-015`—; en el
**contrato**, el **token inglés**, que cuesta cero ediciones y lo único que agrega es el candado de
que nadie lo saque en silencio de las ocho a la vez. Una tabla de ocho palabras por idioma queda
descartada por lo que es: una entrada que falte da verde en silencio en ese idioma, que es el modo
de fallar que esta entrada existe para cerrar.

**Y la deriva entre idiomas ya pasó, en la dirección que nadie espera**, así que la comprobación se
exige en los ocho y no sólo en el castellano: los siete README traducidos **sí** listan el anexo en
su tabla de «qué hay acá» y **el castellano, que es la fuente de verdad, no lo lista**. Siete de
ocho.

**Dos detalles de ingeniería, porque son los que hacen la prueba barata y a prueba de
traducciones.** La ficha del peldaño *N* se encuentra por la línea que cita su contrato
—`peldanos/peldano-NN-`—, que está byte a byte igual en los ocho idiomas (verificado en inglés,
alemán, japonés y chino): la prueba no necesita saber cómo se dice «Peldaño» en ocho idiomas. Y se
ancla en el **número** y no en el nombre del archivo, porque de los veinticuatro identificadores
del dato hay **uno que no deriva** a su contrato (el del peldaño 21).

**Qué hay que producir.** Una prueba en `tests/`, con node pelado y sin dependencias, que lea
`gates/steps.json` y `gates/stations.json`, junte los peldaños con un evaluador del Anexo H
—`heuristics`, `profile_matrix`, `manual_cases_per_profile`, `pendings_profiles`; la lista sale del
dato, no se escribe a mano— y exija que **la ficha del documento principal** cite el anexo, además
del contrato. Con sus rojos deliberados, que es la regla de este repositorio: la prueba se muta y
tiene que caer, y cada mutación nombra lo suyo. Lo que propuse al abrir esta entrada —que la misma prueba
cubriera lo de `PND-046`, ninguna ficha cita un caso concreto sin su `[Ref. N]`— **no sobrevive la
medición en su forma fuerte, y queda dicho acá en vez de quedar como una promesa**:

```
por vineta ("cada fallo que evita lleva al menos un [Ref. N]"):
  22 de 24 en verde; rojo en los peldanos 0 y 10.
  EL PELDANO 20 PASA -- el que el dueno encontro -- porque su vineta lleva dos
  referencias y la clausula sin respaldo es la primera de tres.

por clausula:
  50 clausulas en las 24 fichas: 42 con referencia, 8 sin.
  5 de esas 8 son CATEGORIAS de problema y no casos ("el agente que ayuda
  expandiendo el alcance", "el que deja deuda para despues"): no deben llevar
  referencia. 62% de rojos falsos.

y no viaja: la estructura de clausulas no sobrevive la traduccion. El japones no
separa con punto y coma (las 24 fichas colapsan a una clausula) y el chino parte
la del peldano 10 en tres. "peldano + numero de clausula" NO es una llave
independiente del idioma.
```

Una guarda que da verde sobre el defecto que la motivó sería la sexta guarda dormida, y la primera
que nacería dormida a propósito. Y una con 62% de rojos falsos no enseña a escribir la referencia:
enseña a inventarla. Así que de `PND-046` esta prueba se lleva **sólo los dos candados que sí son
decidibles**: que el **conjunto de referencias de cada ficha sea idéntico en los ocho idiomas** (24
de 24 en verde hoy, candado libre, atrapa la traducción que se come un `[Ref. N]`) y que cada
«fallo que evita» lleve al menos una referencia **o esté registrado como genérico con su razón**
—que es la forma que el propio anexo exige para un interruptor apagado (`D-045`, `D-046`: apagado
sin registro es rojo)—. Las dos cláusulas sin respaldo **las arregla una persona, no una guarda**,
y eso es `PND-046`.

**La forma exacta vuelve al dueño.** El 2026-10-26 eligió la fuerza —«la ficha **y** el contrato lo
citan»— y pidió más contexto para la forma, que se le entregó medida en
`docs/DECISION_PND-048_CONTEXTO_MEDIDO.md`. No es una lista de tres opciones sino
**tres diales independientes**: el **ancla** (el enlace o la palabra), los **idiomas** (los ocho o
sólo el castellano) y la **dirección** (las dos o sólo del dato a la prosa). El costo recurrente,
que es el único argumento honesto a favor de la variante corta, está dicho: de acá en adelante,
meter un evaluador del anexo en un peldaño nuevo cuesta ocho ediciones del documento principal.

**La dirección inversa, que no estaba en el pedido y cuesta cero ediciones.** Una ficha que enlaza
el anexo para un peldaño que **no** tiene evaluador del anexo es rojo: la prosa prometiéndole al
lector una compuerta que el dato no exige. No es una invención: el validador ya tiene esa forma
—`E_ANEXO_HUERFANA`, «el anexo declara la regla y la compuerta no la tiene»— y es el peldaño 11
leído en los dos sentidos.

**Y el agujero que se anuncia solo.** Hoy **ninguna de las ocho estaciones** `N0..N7` declara un
evaluador del anexo. Si alguna lo declarara, la prueba tiene que ponerse **roja diciendo que no
sabe revisar estaciones**, no verde: es la semántica que `gates/evaluators.json` declara para
`required: true` —«una instalación que no lo sabe medir no reporta verde: reporta que no lo
mide»— aplicada a nuestra propia guarda.

**Criterio de aceptación por perfil.**

- *P1 (herramienta consumidora que compila las compuertas):* dada una herramienta, todo evaluador
  `required: true` que el dato declara tiene su correlato en la prosa que el usuario de esa
  herramienta lee, y la cadena falla si alguien agrega una ancla al dato y no la escribe.
- *P5 (auditor):* dado ese perfil, esa persona puede correr un comando y ver que no hay ninguna
  exigencia publicada que la prosa no nombre, en lugar de creerle a este registro.
- *P7 (lector que adapta el método):* dado ese perfil, lo que puede leer en el documento principal
  es todo lo que el método le va a exigir.

**Cómo se verifica.** La prueba cae en rojo contra el árbol de hoy —antes de `PND-039`— y queda en
verde después; `node --test` en verde; y cada mutación deliberada de la prueba cae y nombra lo suyo.

**Depende de:** `PND-039`, porque hasta que la prosa se escriba la prueba está en rojo a propósito.

**Decisión del dueño (2026-10-26):** la **recomendación completa**. Las tres variantes de los diales
quedaron como estaban recomendadas: el **ancla** es el enlace en la ficha y el token inglés en el
contrato, los **idiomas** son los ocho, y la **dirección** es la doble —del dato a la prosa y de la
prosa al dato—.

**Qué se hizo.** `build/anexo_simetria.mjs`, con las seis comprobaciones escritas como funciones
**puras** (reciben los textos y devuelven la lista de hallazgos, no leen el disco), y dos pruebas que
las usan: `tests/anexo_simetria.test.mjs` contra el árbol real y `tests/anexo_simetria_en_rojo.test.mjs`
con **diez rojos deliberados**, que alimentan las mismas funciones con un árbol mutilado y exigen que
caigan nombrando lo suyo. Es la razón de que sea una biblioteca y no sólo una prueba: una comprobación
que nadie vio caer no demuestra que guarde nada, y en este proyecto eso costó cuatro veces.

Lo que exige, además de A y B: (C) una ficha que enlaza el anexo para un peldaño que el dato **no**
ancla también es rojo —la prosa prometiéndole al lector una compuerta que el dato no exige, que es
`E_ANEXO_HUERFANA` leída al revés—; (D) si alguna de las ocho estaciones declarara un evaluador del
anexo, la prueba se pone **roja diciendo que no sabe revisar estaciones**, que es la semántica que
`gates/evaluators.json` declara para `required: true`; (E) el conjunto de `[Ref. N]` de cada ficha es
idéntico en los ocho idiomas; y (F) cada «fallo que evita» lleva su referencia **o está registrado con
su razón**, con dos registros separados porque son dos cosas distintas —el peldaño 0, que nombra una
categoría y no un caso, y el peldaño 10, que es la deuda del dueño de `PND-046` y nombra su pendiente—.
Los dos registros **se vacían solos**: si la ficha consigue su referencia, el registro queda viejo y la
prueba cae.

Y el vocabulario de evaluadores del anexo **se deriva del dato**: sale de los peldaños que declaran un
`anchor` en su `verify`, no de una lista escrita a mano, y hay un rojo deliberado que lo demuestra
—sacarle el ancla al peldaño 9 lo saca del vocabulario y lo hace caer por la dirección inversa—.

**Evidencia de cierre.** La prueba cae en rojo contra el árbol de HEAD y queda en verde después, con
el mismo programa:

```
contra HEAD (antes de este cambio):
  regla A (la ficha enlaza el anexo):    48 hallazgos de 48 fichas revisadas
  regla B (el contrato nombra el token):  8 hallazgos -> el peldano 2 en los ocho idiomas

despues:
  node --test tests/anexo_simetria.test.mjs tests/anexo_simetria_en_rojo.test.mjs
  # tests 19 | # pass 19 | # fail 0     (7 contra el arbol real + 10 rojos + 2 candados)

y la suite entera: # tests 239 | # pass 239 | # fail 0
```

**Lo que se retiró, y queda dicho en vez de quedar como promesa.** Que esta misma prueba cubriera «ninguna
ficha cita un caso concreto sin su `[Ref. N]`» no sobrevivió la medición: por viñeta deja 22 de 24 en
verde y **el peldaño 20 pasa** —el que el dueño encontró—, y por cláusula da 8 rojos de 50 con 5 falsos,
y no viaja a los ocho idiomas. Se quedaron sólo los dos candados decidibles (E y F). **Decisión:** D-061.

---

## PND-053 — Las dos entradas previas del Anexo H no tenían ruta, así que ninguna compuerta podía mirarlas *(el dueño la declara; herramienta: PND-008)*

- **Nodo:** `corpus/anexo-h` [nodo propuesto]
- **Grupo:** G-METODO · **Severidad:** bloquea · **Quién decide:** el dueño declaró el nombre y
  delegó la forma
- **Repositorio:** método · **Estado: CERRADO** el 2026-10-27.

**Qué estaba mal.** El Anexo H exige dos entradas **previas** al Bucle de Construcción —el glosario
del usuario y la lista de perfiles— y el método no decía dónde viven. El 2026-10-26 (`PND-039`,
D-061) se cerró la mitad de arriba: el contrato del peldaño 2 empezó a pedirlas por escrito y la
sección 4 a comprobarlas. La ruta quedó sin declarar **a propósito** —el dueño nunca la había
declarado y un nombre inventado ahí se publica como si fuera un valor de fábrica—, y ese "a
propósito" tenía un precio que estaba medido y que no era teórico.

**Mi reproducción (2026-10-27).** Las dos entradas se publicaban como exigidas y **no verificables
por máquina**:

```
$ node -e "..." sobre gates/heuristics.json (antes)
  prior_input_1  the user glossary     step 2  path: null  declared: false
  prior_input_2  the list of profiles  step 2  path: null  declared: false

$ las rutas que el peldano 2 declaraba
  PROJECT.md | docs/SEMANTIC_TREE.md | docs/STATUS.md      (tres, ninguna de las dos previas)
```

Las consecuencias, las dos escritas antes de hoy. **Una:** la compuerta del peldaño 5 no puede
contrastar los perfiles de un pendiente contra una lista que nada obliga a existir, así que la
matriz del peldaño 8 se puede seguir inventando. **Dos:** el consumidor que tiene que escribir el
evaluador de la matriz lo marcó como bloqueante de su propio trabajo —iba a medir sobre un insumo
opcional— y pidió resolverlo **antes** de escribirlo, no después.

**Decisión del dueño (2026-10-27).** *"Dales ruta y cierra."* El nombre queda delegado.

**Qué se hizo.** Las dos tienen ruta: **`docs/GLOSSARY.md`** y **`docs/PROFILES.md`**.

- **Por qué esos nombres y no los que proponía el camino** (`docs/GLOSARIO_USUARIO.md` y
  `docs/PERFILES.md`): medido antes de elegir, las cuarenta rutas de artefacto e insumo que el dato
  declara hoy están en inglés y en mayúsculas —`docs/SEMANTIC_TREE.md`, `docs/PROFILE_MATRIX.md`,
  `docs/WORKING_AGREEMENT.md`—, así que dos rutas en castellano serían las únicas dos del nivel de
  datos, que es justo donde D-051 manda inglés. `docs/PROFILES.md` además queda al lado de la
  `docs/PROFILE_MATRIX.md` que sale de ella.
- **Cómo entran al dato:** como artefactos **nuevos** del peldaño 2 con su `since_schema`, sin
  tocar la base congelada; con `min_bytes` y **sin** `must_contain`, porque lo que esos dos
  archivos tienen que *decir* lo juzga una persona y un patrón inventado acá publica una exigencia
  que el dueño no declaró. En `gates/heuristics.json` las dos entradas previas pasan a
  `declared: true` con su `path`. `catalog_version` sube a `2026.10.5` con su huella.
- **Y en la prosa, en los ocho idiomas:** el prompt del peldaño 2 nombra los dos archivos (una sola
  pieza en inglés, idéntica en las ocho; `corpus_version` sube a `2026.10.3` con su huella), la
  sección 3 del contrato reemplaza el "el método no te impone el nombre de esos dos archivos" por
  la ruta declarada, y la tabla del Anexo H lleva la ruta en la fila de cada entrada previa. Un
  archivo que la compuerta busca y el prompt no nombra es una compuerta que falla por una razón que
  a la persona nunca se le dijo.
- **Lo que NO se tocó, y por qué:** la ficha del peldaño 2 en el documento principal. Las fichas son
  prosa y no nombran archivos —dicen «un archivo de proyecto operativo», no `PROJECT.md`—; meterle
  dos rutas le rompe el registro. La ficha ya nombra las dos entradas previas desde D-061.

**La guarda que lo sostiene.** `tests/artefacto_nombrado.test.mjs`, con sus comprobaciones puras en
`build/artefacto_nombrado.mjs`: toda ruta que el dato declare para un peldaño tiene que estar
**nombrada en su contrato, en los ocho idiomas**; un contrato que no se pudo leer es hallazgo y no
salteo; los comodines (`docs/AUDIT_*.md` y los otros cuatro) se saltean desde un **registro con su
razón**, que la prueba exige idéntico al conjunto que el dato declara; y una corrida que revisó cero
pares no puede dar verde.

**Dicho sin inflarlo, que es lo que el método pide:** esta guarda **no** habría atrapado el defecto
que la originó. Mientras el dato no declaraba ninguna ruta no había par que revisar y la
comprobación daba verde con razón. Lo que guarda es que la ruta declarada hoy no se quede sin su
prosa en ninguno de los ocho idiomas, y que una ruta nueva no entre al dato en silencio.

**Criterio de aceptación por perfil.**

- *P1 (herramienta consumidora que compila las compuertas):* dada esa herramienta, puede escribir el
  evaluador de la matriz de perfiles contra un insumo que tiene ruta declarada, en vez de medir
  sobre un archivo opcional.
- *P8 (dueño de proyecto que aplica el método):* dado ese perfil, esa persona sabe en qué dos
  archivos van el glosario y los perfiles antes de que la compuerta del peldaño 5 la detenga.
- *P6 (lector humano que entra por el documento principal):* dada esa persona, lo que el peldaño 2
  le pide y lo que la compuerta le va a exigir dicen lo mismo.

**Evidencia de cierre.** Medido con el mismo programa, antes y después:

```
$ la guarda contra el arbol de HEAD, con la ruta en el dato y no en la prosa
  16 hallazgos (docs/GLOSSARY.md y docs/PROFILES.md, en los ocho idiomas)

$ en el arbol de hoy
  288 pares revisados (peldano x ruta x idioma), 288 en verde, 0 hallazgos

$ rojo demostrado en disco, no solo en memoria: sacada la ruta del contrato japones
  not ok 1 - A: cada artefacto que el dato exige por ruta esta nombrado en su contrato
    ja/peldano-2: docs/PROFILES.md

$ node --test                     -> # tests 249 | # pass 249 | # fail 0   (eran 239)
$ node build/prompts.mjs          -> 54 prompts, siete traducciones, errores: 0
$ node build/gates_validate.mjs   -> validado (24 peldanos, 8 estaciones, 45 reglas)
$ node build/gates_doc.mjs --check-> COMPUERTAS.md coincide con los datos
$ node build/api_check.mjs        -> los tres recursos coinciden con las fuentes
```

**Depende de:** nada. `PND-039` cerró la mitad de arriba; esta es la de abajo. **Decisión:** D-065.

---

## PND-057 — La portada dice dos veces que la retrospectiva es el peldaño 15, y una línea más arriba dice que es el 23 *(lo encontró la revisión semántica)*

- **Nodo:** `corpus/escalera` [nodo propuesto]
- **Grupo:** G-METODO · **Severidad:** avisa · **Quién decide:** se hace y se reporta
- **Repositorio:** portal · **Estado: en curso** (arreglado y horneado el 2026-10-27; esperando
  el empujón, que es del dueño)

**Qué está mal.** La portada se contradice sobre el número de un peldaño, dentro de la misma
página. En las preguntas frecuentes (`faq.a6`): «el **peldaño 15** pide que cada retrospectiva
termine en una propuesta concreta de cambio a la escalera». En los tres casos de uso
(`paths.c2.p`): «Es el **15** volviendo al 0». Y en la entrada de la escalera (`ladder.lede`), más
arriba en la misma página: «El **23** cierra el ciclo y vuelve al 0».

**Cuál es el número bueno.** El 23. Medido contra el documento principal el 2026-10-27:

```
$ grep -n "cierra el ciclo y vuelve al 0" docs/ESCALERA_METODOLOGICA.md
276: vivo. El 23 cierra el ciclo y vuelve al 0 para el proximo proyecto.
$ grep -n "Peldano 23" docs/ESCALERA_METODOLOGICA.md
1221: ### Peldano 23 -- El agente adentro del sistema, y la retrospectiva con numero
```

El 15 es *Integración continua, entornos, secretos y despliegue como producto*, que no tiene nada
que ver con la retrospectiva. Es un resto de cuando la escalera tenía dieciséis peldaños y el
último era el que cerraba el ciclo: `CLAUDE.md` ya dejó escrito que «dieciséis» no aparece más como
cuenta de peldaños, y esto es la misma deriva un nivel más abajo —un número de peldaño viejo— en un
archivo que esa regla no mira.

**Mi reproducción (2026-10-27).** Las dos claves llevan el 15 en los **diez** idiomas: el
castellano lo dice y las nueve traducciones lo traducen bien. O sea que esto no lo arregla ninguna
de las nueve revisiones semánticas; se arregla en la fuente y se replica.

**Lo que cuesta de verdad, y es la razón de la severidad.** Un lector que quiere proponer una mejora
va al peldaño 15 a buscar la retrospectiva y no la encuentra, y un lector que arma su calendario
pone la retrospectiva antes del primer despliegue. El dato publicado no tiene el defecto —`faq.a6`
es prosa de la portada, no `gates.json`—, así que ninguna herramienta lo hereda.

**Criterio de aceptación por perfil.**

- *P3 (lector humano que llega por la portada):* dado un lector en cualquiera de los diez idiomas,
  el número del peldaño de la retrospectiva es el mismo en las tres claves y es el 23.
- *P8 (dueño de proyecto que aplica el método):* dado el dueño que entra por la portada a buscar
  dónde se pide la propuesta de mejora, el peldaño que la portada nombra es el que la pide.

**Lo que esto deja como regla, y es lo que lo hace valer más que el arreglo.** Los números de
peldaño son la única parte de la prosa de la portada que se puede comprobar por máquina contra el
documento principal, y hoy no la comprueba nada. Una comprobación posible —y conviene decir que es
una propuesta y no un compromiso— es exigir que todo «peldaño N» que la portada nombre exista y
que, cuando la frase nombre la retrospectiva, el N sea el del título que la contiene. Eso vive en
el repositorio del portal y agranda su cadena; queda escrito acá y lo decide el dueño.

**Lo que se aplicó el 2026-10-27, y lo que lo distingue de los hallazgos de traducción.** El dueño
pidió los dos defectos del castellano juntos y en el acto. Son **veinte cadenas**: las dos claves
en los diez idiomas, todas con el 15 escrito con dígitos árabes, también en japonés (`第15段`),
chino (`第 15 级`) y árabe (`الدرجة 15`). Medido antes de tocar nada —y es la comprobación que
hacía falta para poder reemplazar sin leer veinte frases a mano—: en las veinte cadenas el `15`
aparece **exactamente una vez**, así que no hay otro número que se pueda pisar. Después:

```
PND-057: cadenas cambiadas = 20
verificado: 20 con 23 y sin 15, 0 mal
```

Y lo que el arreglo deja dicho, porque es lo que explica el defecto en vez de sólo taparlo: el 15
era el peldaño que cerraba el ciclo **cuando la escalera tenía dieciséis**. Las dos claves son
fósiles de esa escalera, traducidos fielmente a nueve idiomas, en un archivo que vive en otro
repositorio y que ninguna regla de este mira.

**Depende de:** nada.

---

# Abiertos — G-TRAZABILIDAD: reconstruir, desde el registro, qué cambió y por qué

## PND-050 — Un commit llevó ocho documentos que su mensaje no nombra

- **Nodo:** `proyecto/registro` [nodo propuesto]
- **Grupo:** G-TRAZABILIDAD · **Severidad:** registra · **Quién decide:** la limpieza se hizo y se
  reporta; la prevención volvió al dueño, que eligió la recomendada
- **Repositorio:** método · **Estado: CERRADO** el 2026-10-27, con la prevención hecha y probada
  en rojo contra el árbol que llevaba los apuntes.
- **Origen:** nació el 2026-10-26, revisando qué se había movido después de fusionar el pedido
  **#13**. No lo encontró el dueño y no lo encontró ninguna compuerta: apareció al leer el árbol.

**Qué está mal.** El commit `08a429d` anuncia en su mensaje un arreglo de una palabra en los ocho
idiomas —«la parte del anexo no es "la novena"»— y llevó además **siete** documentos que no tienen
nada que ver con él: los dos insumos del tramo de normalización que está abierto
(`docs/ELIGIBILITY_CRITERIA.md` y `docs/FUNCTIONALITY_RECOVERED.md`), los dos del paper
(`docs/paper/`) y **tres apuntes de sesión del panel de chat**, con el nombre en minúsculas y
guiones que delata de dónde salieron, tirados en la raíz de `docs/` donde todo lo demás se llama
en mayúsculas. Un octavo, el apunte con el contexto medido de `PND-048`, entró en `4099d07`, que
es el commit al que sí pertenece —el registro lo cita como la evidencia que se le entregó al dueño
para decidir—, y ese mensaje tampoco lo nombra.

Eso rompe dos reglas de este proyecto a la vez: **un commit hace una cosa** y **cada commit cita
su pendiente**. Y lo que cuesta no es el desorden: el registro de versiones es la única fuente que
dice por qué cambió cada archivo, así que quedaron ocho archivos en el árbol sin una línea que los
explique. El método se pasa el día exigiendo que una afirmación venga con su evidencia; un commit
cuyo mensaje describe el dos por ciento de lo que llevó es esa misma falla, puesta justo en el
lugar desde donde se audita todo lo demás.

**Mi reproducción (2026-10-26).**

```
$ git show --stat 08a429d | tail -1
 26 files changed, 1087 insertions(+), 21 deletions(-)

$ git show --numstat 08a429d   (sólo lo que el mensaje no nombra)
    67  docs/ELIGIBILITY_CRITERIA.md
   298  docs/FUNCTIONALITY_RECOVERED.md
    52  docs/paper/README.md
   224  docs/paper/metodo-protocolo-herramienta.md
   211  docs/auditoria-urazuke-el-arbol-del-portal-y-las-siete-decisiones.md
    81  docs/backlog-de-la-auditoria-el-registro-inaugurado-y-lo-que-qued.md
   133  docs/backlog-de-la-retrospectiva-las-4-decisiones-del-dueno.md
 -----
  1066  (de 1087 insertadas)

$ git log -1 --format=%B 08a429d | grep -ci "eligibility\|functionality\|paper\|backlog\|auditoria-urazuke"
0
```

Mil sesenta y seis de las mil ochenta y siete líneas que ese commit insertó —el **98 %**— están
fuera del alcance que su mensaje declara, y el mensaje no las menciona **ni una vez**. Las otras
veintiuna son el cambio real: dos líneas por archivo en los ocho idiomas y sus HTML.

**Lo que esto NO rompió, medido y no supuesto.** Ninguno de los ocho se publica. No están en el
arreglo literal de `build/build.mjs` —que es el que decide qué se genera por idioma, y lleva once
nombres— así que no existe HTML de ninguno y el espejo del portal no los pudo llevar:

```
$ ls docs/html/*.html | wc -l
12                      (los once del arreglo más CONTRATOS_DE_PELDANO; ninguno de los ocho)

la corrida de publicación de la fusión de #13, que corre con los dos árboles juntos:
  documentos generados: 84 | huerfanos: 8 -> los ocho son PREGUNTAS_AL_PROVEEDOR (PND-049)
```

Y ninguno de los cinco que se quedan nombra un cliente real ni lleva una ruta local: buscadas
`C:\`, `/Users/` y el nombre de la cuenta de la máquina, cero coincidencias.

**Lo que ya se hizo, en el mismo commit que registra esto.** Los tres apuntes de sesión salieron
del repositorio: no son corpus, no son evidencia citada y no son trabajo del método, son la pizarra
de una conversación. El cuarto **se queda y se renombra** a
`docs/DECISION_PND-048_CONTEXTO_MEDIDO.md`, porque el registro lo cita como la evidencia con la que
el dueño tomó una decisión —y una entrada que cita un archivo que no existe es exactamente lo que
el método persigue—; con el nombre del resto de la carpeta deja de parecer un resto y pasa a ser lo
que es, un expediente. Los cuatro que sí son material de trabajo en curso (los dos insumos de la
normalización y los dos del paper) **se quedan donde están**: pertenecen a pendientes abiertos y su
lugar es ése de todos modos.

**Decisión del dueño (2026-10-26).** Se le presentaron tres caminos —dejar los ocho y asumir que un
commit del registro quedó diciendo algo distinto de lo que hizo; sacarlos todos y volver a traerlos
cuando cada uno entrara con su pendiente; o sacar sólo los apuntes de sesión— con la recomendación
del tercero. Eligió la recomendación: *"Tu recomendación"*. Reescribir la historia de lo publicado
no estaba sobre la mesa y no se propuso.

**Lo que no se puede arreglar, y por eso esto queda escrito.** El mensaje de `08a429d` ya está en
`main` y `main` está publicada: en este repositorio fusionar es publicar, y lo publicado se corrige
hacia adelante. Reescribir la historia costaría más que el defecto. Así que la reparación de la
parte vieja **es esta entrada**: desde acá se puede reconstruir qué llevó ese commit de más, por
qué, y qué se hizo con cada archivo.

**Lo que queda abierto, y es la decisión del dueño.** La prevención. Hoy la única defensa contra
que esto vuelva es que alguien se acuerde de mirar el árbol antes de commitear, que es la forma
exacta de las cuatro guardas dormidas de este proyecto vista del otro lado: no hay guarda. La
propuesta, con la forma que el proyecto ya usa en el aviso de huérfanas y en el interruptor del
Anexo H —**un inventario con razón escrita**—: una prueba que lea los documentos que el árbol
tiene bajo `docs/` y exija que cada uno esté **en el arreglo literal de la construcción** (es
corpus y se publica) **o nombrado en una lista de la propia prueba con su razón** (es trabajo,
evidencia o expediente, y se dice de qué pendiente). Un archivo que no esté en ninguna de las dos
es rojo, y el mensaje dice el nombre. Cuesta una línea por cada documento de trabajo nuevo, que es
el mismo precio que ya se paga por agregar un documento al corpus, y atrapa el caso exacto de
arriba: los tres apuntes no habrían podido entrar en silencio. La alternativa honesta es **no
hacerla** y dejar que esto lo atrape la lectura del árbol antes de cada commit; el costo de esa
opción es que ya falló una vez, y no por descuido de nadie en particular.

**Criterio de aceptación por perfil.**

- *P5 (auditor que quiere probar que su copia es la buena):* dado ese perfil, esta persona puede
  tomar cualquier commit del método y saber, leyendo su mensaje, todo lo que ese commit llevó; y si
  encuentra en el árbol un archivo que ningún mensaje explica, el registro lo explica.
- *P8 (dueño de proyecto que aplica el método):* dado ese perfil, esta persona no tiene que leer el
  árbol a mano para saber si un commit se llevó algo de más: algo se lo dice, nombrando el archivo.

**Cómo se verifica.** Cuando la prevención esté hecha: la prueba cae en rojo contra el árbol de
`1a02cd3` nombrando los tres apuntes, y queda en verde contra el árbol de ahora. Mientras no esté,
esta entrada se queda abierta, que es lo que corresponde: la parte vieja está documentada y la
parte que impide la próxima vez, no.

**Cierre (2026-10-27): la prevención está hecha, y es la acotada.** El dueño eligió entre las tres
salidas que esta entrada deja escritas —*"Tu recomendación"*— y la recomendada era la **(a)**: el
inventario del árbol del método, sin agrandar el alcance a algo que mire el mensaje de un commit.
Vive en `build/inventario_documentos.mjs` con sus dos pruebas, y exige tres cosas: que todo
documento bajo `docs/` esté **en el arreglo literal de la construcción** o **en el inventario con
su razón**; que esa razón **cite el pendiente o la decisión que pide el documento** (una línea
«porque siempre estuvo ahí» es roja); y que el inventario **no tenga registros que sobren**, porque
una línea que explica un archivo que el árbol ya no tiene es un registro viejo diciendo algo falso.
Las exclusiones de árbol —las siete traducciones, `docs/html/`, `docs/peldanos/` y la evidencia de
los dos proyectos guía— son un **registro con su razón** y no una condición escondida adentro de la
comprobación, que es lo que el Anexo H pide para una regla apagada.

Y lee el **disco**, no el índice de git. Eso no es un detalle: el panel auto-guarda sus apuntes en
`docs/`, así que el archivo que conviene atrapar es el que todavía no se commiteó. La guarda cae
**antes** del commit y no después.

**La evidencia, medida y no relatada.**

```
$ node --test                                        (antes: 249 pruebas)
# tests 261 | # pass 261 | # fail 0

árbol de hoy
  rutas bajo docs/: 486 | documentos a explicar: 22
  publica la construcción: 11 | en el inventario: 11 | hallazgos: 0 | registros que sobran: 0

el rojo contra el árbol real, con la función pura alimentada por `git ls-tree -r 1a02cd3`
  arbol 1a02cd3: 25 documentos a explicar, 11 publicados por su propia construcción
  HALLAZGOS: 4
    docs/auditoria-urazuke-el-arbol-del-portal-y-las-siete-decisiones.md
    docs/backlog-de-la-auditoria-el-registro-inaugurado-y-lo-que-qued.md
    docs/backlog-de-la-retrospectiva-las-4-decisiones-del-dueno.md
    docs/la-cuarta-decision-con-contexto-medido-pnd-048.md
  (igual contra 08a429d, que es el commit que los llevó)

el rojo con el archivo puesto en el disco y sin commitear, que es como lo deja el panel
  not ok 1 - A: cada documento del arbol lo publica la construccion o lo explica el inventario
      docs/apunte-del-panel-de-prueba.md: no lo publica la construccion y no esta en el inventario
  not ok 4 - D: la comprobacion reviso algo, y lo dice con su cuenta
  not ok 5 - los cuatro apuntes del panel que motivaron esto no estan en el arbol
  # pass 2 | # fail 3     -> borrado el archivo, 5 de 5 en verde
```

**Corrección del criterio de aceptación que esta entrada escribió.** Decía «nombrando los **tres**
apuntes». Nombra **cuatro**: el cuarto es `la-cuarta-decision-con-contexto-medido-pnd-048.md`, que
no se borró sino que se renombró a `DECISION_PND-048_CONTEXTO_MEDIDO.md` porque el registro lo cita
como evidencia. En el árbol de `1a02cd3` todavía estaba con el nombre del panel, así que la guarda
lo cuenta, y tiene razón: ahí era un apunte suelto como los otros tres.

**Lo que la guarda encontró el día cero, y no estaba en ninguna entrada.** Dos documentos del árbol
que **nada explicaba**: `docs/AIevaluation.md` —las evaluaciones crudas de los modelos, de donde se
escribe `EVALUACIONES_DE_IA.md`; entró el 2026-10-20 con `D-041` y `D-042` y ni `CLAUDE.md`, ni
`DECISIONES.md`, ni este registro lo nombran— y `docs/PLAN_CURSO_MENTORING.md`, que `CLAUDE.md` sí
nombra pero ninguna entrada pide. Los dos entraron al inventario con su razón escrita. Es el mismo
efecto que tuvo el registro de comodines del Anexo H: una guarda que se gana el sueldo antes de
nacer, porque obliga a escribir lo que nadie había escrito.

**Lo que esta guarda NO hace, dicho para que nadie le atribuya más.** No mira el **mensaje** de un
commit. Un commit que lleva un documento ya registrado y no lo nombra sigue siendo posible, y eso
fue exactamente la segunda ocurrencia de abajo. Cubrirlo agranda el alcance —hace falta algo que
lea el mensaje, y en el repositorio del portal no hay ni pull request ni compuerta donde colgarlo—
y por eso no entró acá: el dueño eligió la (a) sabiendo ese límite, y está escrito en el encabezado
del propio programa.

**Segunda ocurrencia, el mismo día, y es el argumento de que la regla sola no alcanza.** Horas
después de escribir esta entrada y D-062, el commit `6ea7f38` del repositorio del portal —la
corrección del `npm install` de la guarda nueva, documentada en `PND-038`— se empujó **sin citar su
pendiente en el mensaje**. No llevó nada de más: es un archivo, y es el que su mensaje nombra. Lo
que incumplió es la otra mitad de la regla, la cita. Y es significativo *dónde* pasó: en el
repositorio del portal, que no tiene pull request, no tiene compuerta y no tiene ninguna
comprobación que mire el mensaje de un commit, así que la única defensa ahí es la memoria —la misma
forma que esta entrada ya describe—. Dos veces en un día, la segunda a horas de haber escrito la
regla, dice que escribir la regla donde un agente la lee es necesario y **no** suficiente. La
prevención que esta entrada propone cubre el árbol del método; el caso del portal pide además algo
que mire el mensaje, y eso agranda el alcance, que es decisión del dueño y no de quien ejecuta.

**Depende de:** nada.

---

## PND-051 — Un cierre afirmó una medición que producción desmentía *(desvío propio, el mismo día)*

- **Nodo:** `proyecto/registro` [nodo propuesto]
- **Grupo:** G-TRAZABILIDAD · **Severidad:** bloquea · **Quién decide:** se hace y se reporta
- **Repositorio:** método · **Estado: CERRADO** el 2026-10-26, con la corrección escrita en la
  propia entrada que falló.
- **Origen:** lo encontró el dueño leyendo la portada que la entrada decía que no existía. No lo
  encontró una compuerta, no lo encontró una auditoría: lo encontró la persona a la que el registro
  le estaba diciendo algo falso.

**Qué estaba mal.** `PND-022` se cerró el 2026-10-26 y su reproducción decía, con esas palabras,
que la distinción entre el método, el protocolo y la herramienta **«no está escrita en ninguna
parte»**. La portada servida la contestaba —`Neutral respecto de la herramienta` tres veces, una
sobre el pliegue; la pregunta frecuente `¿Necesito Forge o NAC3?`; la frase `el peldaño existe sin
Forge`— y era comprobable con una orden de dos segundos el día que se escribió. Sobre esa
reproducción falsa se escribió un párrafo nuevo para la portada en diez idiomas, se horneó y se
commiteó. El trabajo no era urgente: era innecesario.

**Y hay una segunda mitad, peor que la primera.** La contraprueba estaba en el mismo registro, diez
entradas más arriba: el autor de «El Arte de Forjar Sistemas» adaptó el método en 191 páginas sin
tocar la herramienta (`PND-039` a `PND-048`). Un lector real, con esa misma portada delante, que lo
entendió perfecto. El cierre generalizó de **una** lectura descuidada de un asistente ajeno y pasó
por encima de una adaptación demostrada. Es la misma falla de método que el propio Anexo H persigue
en un proyecto ajeno: una muestra de uno no es una medición.

**Mi reproducción (2026-10-26, 20:24 UTC).** Contra producción, que es lo único que decide:

```
curl -s https://yujin.app/urazuke/                      -> HTTP 200, 70395 bytes
grep -o -i "Neutral respecto de la herramienta" | wc -l -> 3
grep -o -i "¿Necesito Forge o NAC3?"            | wc -l -> 1
grep -o -i "el peldaño existe sin Forge"        | wc -l -> 1
grep -c  -i "Tres cosas distintas"                      -> 0   (el parrafo nunca se publico)
```

Lo único que de verdad faltaba era la **taxonomía** —nombrar las tres naturalezas como tres— y qué
*es* el protocolo en sus propios términos. Eso es una línea en un documento, no veintinueve líneas
arriba de la portada en diez idiomas.

**Qué se hizo.** Tres cosas, y ninguna es el párrafo. Se corrigió `PND-022` con la medición pegada
y con la contraprueba, diciendo por su nombre qué afirmó de más. Se descartó el commit del párrafo
de la portada (`63e4a2c` en el clon de trabajo del portal, recuperable de su registro de
referencias mientras ese clon no recoja la basura), así que no llegó ni va a llegar a producción. Y quedó escrito el criterio en
`CLAUDE.md` y en **D-063**: un documento se puede permitir un párrafo cuidadoso arriba; una portada
contesta la pregunta donde la pregunta se hace, y antes de escribir el párrafo se le pregunta a la
portada.

**La regla, dicha para que sirva la próxima vez.** Una reproducción que afirma una **ausencia** en
algo servido lleva el comando y la cuenta, no la frase. «No está escrito en ninguna parte» no es una
medición: es un recuerdo. Y cuando el registro ya tiene un lector real que hizo lo contrario de lo
que la hipótesis predice, ese lector pesa más que el anécdota.

**Lo que NO se mecanizó, y por qué se dice en vez de prometerlo.** No hay comprobación decidible que
atrape «la prosa afirma una ausencia»: el texto de una reproducción no es un dato con forma. Lo que
sí es decidible —que cada identificador de commit que el registro cita exista— se midió hoy sobre
las dieciséis citas del archivo: las dieciséis resuelven, siete en el método y nueve entre los dos
clones del portal, y una de ellas (`19662f1`) obligó a corregir dos entradas porque el commit se
reescribió al descartar el que tenía debajo. Pero esa comprobación **no la puede correr la suite del
método**: nueve de las dieciséis viven en un árbol que este repositorio no tiene, y el clon de
trabajo del portal es superficial, así que ni siquiera resuelve sus propios ancestros. Una
comprobación que sólo puede correr quien tenga las dos máquinas no es una compuerta. La defensa que queda
es una regla escrita donde un agente la lee como instrucción, y eso es exactamente la clase de
defensa que este proyecto viene llamando **guarda dormida** cuando la encuentra en otro lado. Queda
dicho así, sin disfrazarlo de arreglo.

**Criterio de aceptación por perfil.**

- *P5 (auditor):* dado ese perfil, esta persona puede tomar la entrada `PND-022` y correr ella misma
  cada medición que afirma, y cada una le da lo que la entrada dice.
- *P8 (dueño de proyecto):* dado ese perfil, esta persona no se encuentra con que el registro le
  afirma algo que su propio sitio desmiente.

**Cómo se verifica.** Correr las cinco órdenes del bloque de arriba contra producción y contrastarlas
con lo que `PND-022` afirma hoy. Y buscar `tres-cosas` en la portada servida: cero, que es lo que la
entrada corregida dice.

**Depende de:** nada.

---

## PND-052 — Una ausencia se registró como hallazgo desde una búsqueda que falló *(desvío propio, el segundo en dos días)*

- **Nodo:** `proyecto/registro` [nodo propuesto]
- **Grupo:** G-TRAZABILIDAD · **Severidad:** registra · **Quién decide:** la refutación se hizo y se
  reporta; la **prevención** vuelve al dueño, porque la única forma decidible que se encontró le
  cambia el alcance a este registro
- **Repositorio:** método · **Estado: abierto**
- **Origen:** lo abrió la refutación de `PND-036`. Y, como `PND-051`, no lo encontró una compuerta:
  lo encontró el dueño preguntando por qué el registro se estaba ocupando de otro proyecto.

**Qué está mal.** `PND-036` afirmó una **ausencia** —«no está en ningún repositorio al que se pueda
llegar»— desde una búsqueda que había mirado cuatro árboles y ninguno era el que correspondía, y la
escribió con la forma de un hallazgo medido: con su comando, su salida y su conclusión. Eso es más
peligroso que una afirmación sin medir, porque **parece** medida y pasa cualquier lectura. Y después
usó un `Last-Modified` como prueba de que una página «cambia sin dejar rastro», cuando el rastro era
una corrida de despliegue del repositorio que nunca se buscó.

**Por qué es el segundo y no el primero.** `PND-051` (D-063) fue el día anterior: un cierre afirmó
que algo «no está escrito en ninguna parte» y la portada servida lo contestaba tres veces. La regla
que salió de ahí —una reproducción que afirma una ausencia lleva el comando y la cuenta, no la
frase— **se cumplió** acá, y no alcanzó: el comando estaba, la cuenta estaba, y el universo sobre el
que corrió era el equivocado. Dos ocurrencias en dos días, de la misma familia y en formas
distintas, es un patrón del proyecto y no dos anécdotas.

**Evidencia medida (2026-10-27).**

```
entradas del registro que afirmaron una ausencia y resultaron falsas:  2
  PND-022 (cerrada el 26)  "no esta escrito en ninguna parte"   -> la portada lo dice 3 veces
  PND-036 (abierta el 26)  "no esta en ningun repositorio"      -> yujinapp/nac-spec

arboles con remoto de este ecosistema presentes en esta maquina:  8
arboles que la reproduccion de PND-036 enumero:                   4
arboles que contenian la pagina:                                  2  (ninguno de los 4)
```

**Qué habría que producir, y es la decisión.** Dos caminos, con su costo.

- *La regla escrita, y nada más.* Queda en `CLAUDE.md`: una entrada que afirma una ausencia enumera
  el universo buscado y dice por qué la enumeración es completa; si el universo son repositorios, se
  enumeran por su **remoto**, no por su carpeta. Cuesta un párrafo. Es la misma clase de defensa que
  este proyecto viene llamando «guarda dormida» cuando la encuentra del otro lado: depende de que
  alguien se acuerde.
- *La forma decidible.* Que el registro no pueda afirmar una ausencia de repositorio sin un bloque
  que liste los remotos consultados, y que una prueba exija ese bloque en toda entrada que use las
  fórmulas de ausencia. Es mecanizable y es barato de correr, pero **le cambia el alcance** a este
  registro: pasa a tener un campo obligatorio nuevo, y eso no lo decide quien escribe las entradas.

**Criterio de aceptación por perfil.**

- *P5 (auditor):* dado el perfil auditor, esta persona puede saber, de cada afirmación de ausencia
  del registro, sobre qué universo se corrió la búsqueda, sin tener que confiar en que fue completo.
- *P8 (dueño de proyecto):* dado ese perfil, esta persona no vuelve a encontrar el registro ocupado
  de un problema que no existe, y cuando pregunta «¿por qué esto?» la entrada ya dice su alcance.

**Cómo se verifica.** Con la regla escrita: que `CLAUDE.md` la lleve y que la refutación de
`PND-036` la cite. Con la forma decidible: una prueba que caiga sobre una entrada que afirme una
ausencia sin su bloque de universo, y que traiga su rojo deliberado.

**Depende de:** la decisión del dueño entre los dos caminos.

---

## PND-054 — El método exige la pregunta y no dice cómo se hace

- **Nodo:** `metodo/prompts` [nodo propuesto]
- **Grupo:** G-METODO · **Severidad:** bloquea · **Quién decide:** el dueño. La pieza la pidió él;
  lo que vuelve a él es **dónde vive**, **cómo se llaman los tres niveles** y si se exige por
  máquina.
- **Repositorio:** método · **Estado: CERRADO** el 2026-10-27. **Decisión:** D-070.
- **Origen:** pedido del dueño el 2026-10-27, escrito en medio de otro trabajo: *"Quiero agregar una
  forma mandatoria de comunicación"*.

**Qué está mal.** Todos los prompts del método llevan la cláusula de completitud —evaluá si el
contexto alcanza, pedí lo que falte, **no estimes**— y eso significa que el método **le ordena al
modelo preguntar**. Pero no dice **cómo**. La forma de la pregunta queda a la improvisación del
modelo, y entonces la persona que tiene que decidir recibe, en el mejor de los casos, una pregunta
suelta: sin los datos que la justifican, sin las opciones enumeradas y sin la recomendación de
quien ya miró el código. Es la misma asimetría que persigue el peldaño 11 —una punta exige y la
otra no sabe con qué cumplir—, acá en la dirección que más caro sale: hacia la persona.

Y es la contracara exacta de lo que el método ya hizo bien dos veces. El peldaño 8 no se conformó
con «mostrame el rojo»: definió **qué es un recibo de rojo** (comando exacto, versión, cantidad de
fallos, código de salida, pegados tal cual). El peldaño 12 no se conformó con «reportá»: separó
**verificado** de **creído**. Falta la tercera de la misma familia: no conformarse con «preguntá».

**El pedido del dueño, con sus palabras (2026-10-27).**

> Cuando el brain necesita una respuesta del interlocutor, quiero que mandatoriamente la plantee de
> la siguiente manera 1) enuncie los datos que justifican la pregunta ENUMERADOS ó con bullet 2)
> Una frase de no más de 5 líneas que visualice el contexto mediante el cuál esos datos enlazan y
> dejan ver el interrogante 3) La pregunta taxativa con las opciones de respuesta enumeradas 4) La
> recomendación del brain. 5) Tres niveles de profundidad técnica de la comunicación seleccionables
> por parámetro. Podemos incluír esto en el método y los prompts?

**Mi reproducción (2026-10-27), medida.**

```
$ grep -o "ask me" prompts/*.en.md | wc -l
22                                   (en 15 de los 27 archivos del corpus publicado)

$ grep -oi "options|recommendation|enumerat|bullet" prompts/*.en.md | sort | uniq -c
      2 prompts/peldano-03.en.md:options
      1 prompts/peldano-01.en.md:recommendation
      1 prompts/peldano-06.en.md:recommendation
```

Veintidós órdenes de preguntar, en más de la mitad de los prompts. **Cuatro** menciones de una
forma, en todo el corpus, y las cuatro incidentales. La orden está en todas partes; la forma, en
ninguna.

**Lo que ya existe y hay que no duplicar.** Los niveles de profundidad **no se inventan desde
cero**: el método ya tiene el **nivel principiante** (D-025, con su párrafo "Si sos principiante"
en ocho contratos) y la herramienta ya tiene **dos** modos de comunicación —didáctico y técnico—.
Tres niveles son una extensión de algo que existe, no una invención. Y los **nombres** de los tres
los declara el dueño: un valor que él no declaró no entra como si fuera de fábrica.

**Las tres salidas, con su costo.**

- **(i) Sólo los prompts.** La cláusula entra en la pieza inglesa de cada prompt, que es donde el
  modelo la lee. Costo: toca los 54 prompts, es **una** pieza idéntica byte a byte en las ocho
  versiones (`build/prompts.mjs` lo exige), su traducción de lectura se escribe en las siete, y
  **sube `corpus_version`** con su huella anotada. Lo que gana: es el único lugar que el modelo lee
  como instrucción.
- **(ii) Sólo la prosa.** Un párrafo transversal en la Parte A del documento principal y una línea
  en la sección 2 de cada contrato. Costo: ocho idiomas, cero cambios de versión del dato. Lo que
  gana: el lector sabe qué exigir. Lo que **no** gana: el modelo no lee la prosa, lee el prompt.
- **(iii) Las dos, más una regla del Anexo H.** Igual que arriba y además un id nuevo (`UX-28` o
  `CQ-19`, append-only) para que la forma sea **exigible** y no sólo recomendada, con su severidad
  y su fila en el anexo castellano e inglés. Costo: los dos de arriba, más `catalog_version` con su
  huella, más la simetría que `tests/anexo_simetria.test.mjs` ya vigila.

**Mi recomendación: la (iii), y con una honestidad por delante.** Una regla que vive sólo en la
prosa es una recomendación; una que vive sólo en el prompt no la puede exigir nadie. Pero lo que
una compuerta **puede** verificar es que la cláusula esté presente en los 54 prompts y en los ocho
idiomas —eso es decidible, y es la misma forma que `artefacto_nombrado`—. Lo que **ninguna** prueba
de este repositorio puede verificar es que una pregunta concreta que un modelo escribió el martes
tenga sus cuatro partes: eso lo juzga la persona que la recibe. Decirlo ahora evita la sexta guarda
dormida: una prueba que diga verde sobre la calidad de las preguntas sin haberla medido nunca.

**Criterio de aceptación por perfil.**

- *P8 (dueño de proyecto que aplica el método):* dada esa persona, cuando el modelo necesita que
  decida, recibe los datos enumerados, el párrafo de contexto, la pregunta con sus opciones
  numeradas y la recomendación; y puede contestar con un número, sin reconstruir el problema.
- *P6 (lector humano que entra por el documento principal):* dada esa persona, puede leer en el
  método qué forma tiene derecho a exigirle a una pregunta, igual que hoy lee qué forma tiene
  derecho a exigirle a un recibo de rojo.
- *P1, P2 (herramientas consumidoras):* dada una herramienta que compila los prompts, esa
  herramienta recibe la cláusula dentro de la pieza inglesa, sin tener que escribirse su propia
  versión; y el parámetro de nivel llega con sus tres valores declarados en el dato.
- *P5 (auditor):* dado el perfil auditor, esta persona puede comprobar que la cláusula está en los
  54 prompts y en los ocho idiomas, y que la versión publicada subió con su huella.

**Cómo se verifica.** La presencia, por máquina: una prueba que cuente la cláusula en los 54
prompts por idioma y caiga nombrando el que le falta, con su rojo deliberado. La **calidad** de una
pregunta concreta, no: la juzga el dueño, y queda escrito así para que nadie le atribuya a la
compuerta algo que no mide.

**Depende de:** nada. La decisión del dueño llegó el mismo día.

**Lo que decidió el dueño (2026-10-27), con sus palabras.** Entre las tres salidas: *"iii"* —las
dos, los prompts y la prosa, **más la regla nueva del Anexo H**, para que la forma sea exigible y
no sólo recomendada—. Y sobre los nombres de los tres niveles: *"con los nombres propuestos"*, que
son principiante, decisor y técnico; en el dato van en inglés, como las otras cuarenta rutas y
enumeraciones que el dato declara (D-051): `beginner`, `decision_maker`, `technical`.

**Estado: CERRADO.** Lo que quedó:

- **La regla.** `UX-28`, en una **familia nueva** del anexo: `B6`, la primera que no es sobre la
  pantalla que el sistema le muestra a una persona sino sobre la conversación en la que el sistema
  se construye. Cuatro partes en orden, y la profundidad declarada. Avisa, no bloquea, y se
  verifica con rojo humano al cierre del pendiente, como la captura de `UX-27`.
- **El parámetro.** `project_config.communication_depth`, con sus tres valores en
  `enums.communication_depth` y su campo en el contrato de configuración de proyecto. Sin declarar
  significa `decision_maker`, **y el agente dice cuál usó**: el default se declara, no se adivina.
- **La cláusula, en los prompts.** Una sola redacción inglesa idéntica, en los **setenta y dos**
  prompts de cada uno de los **ocho idiomas**, más su traducción en cada bloque `[xx]`. Son 576
  cláusulas inglesas y 504 traducidas.
- **La prosa.** El párrafo de la Parte A del documento principal —donde ya se nombra el Anexo H— y
  la sección `B6` del anexo con sus tres bloques: el por qué medido, los tres niveles y lo que la
  regla no promete. En los ocho idiomas, en el mismo commit.
- **La guarda.** `build/forma_de_la_pregunta.mjs`, con tres comprobaciones y **siete rojos
  deliberados**, invocada por `build/build.mjs` y por un paso del flujo que **exige la línea que
  imprime**. Las tres: (A) la cláusula inglesa en todos los prompts de los ocho idiomas, byte a
  byte la misma; (B) la traducción en cada bloque de su idioma; (C) **simetría con el dato** —los
  tres niveles que la cláusula nombra son exactamente los que el dato declara, y el campo está en
  el contrato de configuración—, que es la parte que impide que el modelo escriba un nivel que la
  herramienta no sabe leer.

**Y un agujero que este trabajo abrió y cerró en el mismo movimiento.** `UX-28` es la primera
**regla** que el método agrega después de que existiera la maquinaria de la fijación (D-068), y el
diferencial de un upgrade **no la contaba**: `entradasAgregadas` miraba peldaños, estaciones y
evaluadores, y las reglas del anexo no declaraban procedencia porque su tipo no tenía los campos.
Medido: el diferencial `2026.10.1 -> 2026.10.8` decía 3 entradas cuando son 4. Un proyecto que
subiera de versión se habría encontrado con una regla nueva que el diferencial omitió en silencio,
que es exactamente el defecto que D-067 cerró para el resumen de cantidades. Ahora el tipo `rule`
admite `since_schema` y `since_version`, el validador los exige con el mismo criterio que a
cualquier entrada, y hay un rojo deliberado —el décimo de esa guarda— que mutila la regla y tiene
que caer nombrándola.

**Lo medido, antes y después.**

```
$ node build/forma_de_la_pregunta.mjs
forma de la pregunta: comprobado -- 8 idiomas, 576 prompts, 504 traducciones, 0 hallazgos
$ node build/prompts.mjs            -> 54 prompts, siete traducciones, errores: 0
$ node build/gates_validate.mjs     -> validado (24 peldanos, 8 estaciones, 46 reglas)
$ node build/gates_doc.mjs --check  -> COMPUERTAS.md coincide con los datos
$ node build/api_check.mjs          -> los tres recursos coinciden con las fuentes
$ node build/version_fijada.mjs     -> 36 entradas agregadas, 0 hallazgos
$ node --test                       -> # tests 324 | # pass 324 | # fail 0   (eran 311)
```

**Los rojos, antes del verde.** El de la guarda nueva, en sus dos direcciones y en el dato:

```
rojo: a un prompt le falta la clausula            -> cae nombrando archivo y bloque
rojo: una traduccion perdio la clausula           -> cae nombrando [it]
rojo: el dato declara un nivel que la clausula no -> "no nombra el nivel auditor"
rojo: la clausula nombra uno que el dato no       -> "nombra expert", y el que falta
rojo: el contrato no declara el campo             -> "una herramienta tendria que adivinarlo"
rojo: el dato no declara el enum                  -> un solo hallazgo, y dice cual
rojo: una etiqueta de idioma que nadie declaro    -> "etiqueta de idioma xx"
```

Y el del conteo, que es el que atrapa una regla que entra o sale sin decisión: con las 46 reglas
puestas y la cuenta vieja declarada, `gates_validate` cae con `E_CUENTA`; y la prueba de la base
cae nombrando las cinco de rojo humano cuando eran cuatro.

**La tensión que este trabajo abrió, dicha porque es lo que el registro guarda.** La cláusula entra
**adentro** de los prompts, y la sección 6 del propio anexo argumenta que eso no se hace: D-044 dice
que repetir las reglas en los prompts las diluye y las deriva. No se resolvió haciendo de cuenta que
no existe: la excepción está **escrita en el anexo**, acotada (la cláusula nombra las cuatro partes y
el parámetro, y nada más; el enunciado completo sigue viviendo una sola vez) y argumentada —las otras
cuarenta y cinco son exigencias sobre el sistema, medidas sobre artefactos; ésta es una exigencia
sobre la conversación, y el único lugar desde donde se puede obedecer es lo que el modelo lee—. Y
dice qué **no** autoriza: copiar ninguna de las otras.

**Lo que no se midió, y el pedido original lo pedía.** El dueño pidió una forma «mandatoria». La
cláusula está y es exigible mecánicamente en su **presencia**; su **cumplimiento** en una pregunta
concreta no lo puede medir nada de este repositorio. Está escrito en la regla, en la guarda y acá,
en los tres lugares, para que nadie le atribuya a la compuerta algo que no mide.

**Lo que costó.** El nivel de datos subió a `2026.10.8` y el corpus de prompts a `2026.10.5`, cada
uno con su huella anotada en su registro; la cuenta del anexo pasó a cuarenta y seis reglas (18 de
calidad y 28 de usabilidad) en los ocho idiomas, y de paso dos cuentas que estaban clavadas a mano
—la línea de éxito del validador y el título del documento generado— ahora se cuentan del dato.

## PND-055 — El método decía qué congelar y nunca decía con qué congelarlo *(lo trajo una pregunta del dueño; herramienta: PND-013)*

- **Nodo:** `datos/compuertas` [nodo propuesto]
- **Grupo:** G-API · **Severidad:** bloquea · **Quién decide:** el dueño eligió la salida entre tres
- **Repositorio:** método · **Estado: CERRADO** el 2026-10-27, con la prosa en los ocho idiomas, el
  dato diferenciable y la obligación del consumidor declarada.

**Qué estaba mal.** El método publica la definición mecánica de las compuertas con una versión
declarada y una huella, y el documento generado dice desde el primer día que «un proyecto empieza y
termina en la misma versión del método». Lo que **no** estaba escrito en ninguna parte era tres
cosas: con **qué** se fija —el par `catalog_version` + huella de contenido—, que subir de versión en
medio de un proyecto es una **regresión del estado de completitud**, y que esa decisión es del
dueño. Y como el dato no lo decía, tampoco decía qué le exige al consumidor que fija.

El grupo es **G-API** y no G-METODO, y vale decir por qué: lo que la persona viene a hacer acá es
*consumir la definición con confianza*, y una definición que no dice contra qué se la fija no se
puede consumir con confianza por más que la huella coincida. La mitad de prosa —el párrafo del
documento principal y las dos líneas del contrato del peldaño 2— no cambia eso: está al servicio de
lo mismo, porque el dueño es la otra punta de ese contrato y es el único que puede decidir un
cambio de versión. No se abrió grupo nuevo: el séptimo abrió hace un día y abrir uno cuesta tocar
tres lugares a la vez.

**El origen, con las palabras del dueño (2026-10-27).** No lo trajo una auditoría ni una medición
propia: lo trajo una pregunta, hecha para encuadrar la medición del Anexo H del lado de la
herramienta.

> Forge encara un proyecto, con una versión de urazuke, y la tiene que mantener hasta el fin del
> proyecto a menos que el usuario decida upgradear. Porque el upgrade, trae necesariamente una
> regresión en el estado de completitud y puede cambiar los estados ya evaluados del proyecto,
> llevando a regresiones. (…) Justo ahora, queremos upgradear todo, porque no hay proyectos en
> marcha.

**Mi reproducción (2026-10-27), medida.** La prosa no lo nombraba, en ninguno de los ocho idiomas:

```
$ grep -c -i "congel" docs/ESCALERA_METODOLOGICA.md
2        (las dos son sobre congelar DECISIONES en el peldano 6, no una version)
$ grep -c "fijar la version\|cambiar de version" docs/ESCALERA_METODOLOGICA.md docs/peldanos/*.md
0
$ grep -c "catalog_version" docs/ESCALERA_METODOLOGICA.md docs/peldanos/peldano-02-*.md
0  0
```

Y la medición que le da el cuerpo: la herramienta que asiste este trabajo **ya fijaba, y fijaba
bien**, contra un identificador propio de su catálogo compilado —`base-schema-1`, con su hash— que
**no es una `catalog_version`** y no figura en ningún registro de versiones. Fija, sí, pero a algo
que el método no puede nombrar y que nadie de afuera puede auditar; y con eso, el diferencial de un
upgrade no se puede computar, así que al proyecto no se le puede decir **qué le reabre** subir. El
mecanismo estaba del lado de la herramienta y el contrato no estaba de ninguno de los dos.

La superficie, contada con el propio instrumento del método y no estimada: cada entrada que no está
en el congelado lleva su `since_schema`, así que la distancia es exactamente ese conjunto.

```
$ node -e "cuenta de entradas con since_schema >= 2 en gates/"
evaluadores nuevos:     4   (heuristics, profile_matrix, manual_cases_per_profile, pendings_profiles)
anclas required:true:   5   (peldanos 5, 8, 9, 10 y 12)
artefactos nuevos:      9
verificaciones nuevas: 17   (en 11 peldanos + 1 estacion)
```

**Y una cosa que apareció al medir y cambia cómo se lee un upgrade.** Los cuatro evaluadores nuevos
entraron con `2026.10.1`, que es la **primera** versión publicada. O sea que ningún salto entre dos
versiones publicadas agrega hoy un evaluador requerido, y el único caso que traba un proyecto es el
de quien nunca fijó una versión publicada y mide contra el congelado anterior a todas. Eso es
exactamente el caso medido arriba. La prueba lo deja anclado, para que el día que entre uno nuevo la
cuenta salga sola.

**Las tres salidas que volvieron al dueño, con su costo.**

- **(i) Sólo la prosa.** Un párrafo en el documento principal y una línea en el peldaño 2, en los
  ocho idiomas. Dice la regla; no la hace exigible. Cero cambios de versión del dato.
- **(ii) Prosa + el dato se hace diferenciable.** Procedencia por entrada a nivel de
  `catalog_version` y la declaración de cómo se obtiene el contenido de una versión anterior. Hace
  computable el diferencial. Toca el esquema y sube versión.
- **(iii) Lo anterior, más la obligación al consumidor.** Que el congelado registre la
  `catalog_version` y su huella y las contraste contra el registro. Convierte «fijar» en algo
  verificable desde afuera.

**Decisión del dueño (2026-10-27):** *"Mi respuesta a tu pregunta es 3."* — la (iii), completa.

**Lo que se hizo.**

- **El dato declara el contrato.** `gates/schema.json#pinning`, publicado y **cubierto por la
  huella** (es requisito, no decoración: una copia congelada alterada ahí cambiaría lo que el
  proyecto cree que debe). Declara el par que se fija, qué registra y qué contrasta el consumidor,
  qué pasa cuando no coincide —rojo, diciendo cuál de los dos se movió, nunca un re-fijado
  silencioso a lo que el servidor sirva hoy—, qué está prohibido —fijar a una identidad interna que
  el método no puede nombrar—, que el upgrade lo decide el dueño, y cómo se obtiene el contenido de
  una versión anterior. Eso último incluye lo que **no** está garantizado, dicho acá en vez de
  dejarlo descubrir: hoy no hay una dirección por versión.
- **La procedencia, medida y no inventada.** Las **35** entradas agregadas después del congelado
  declaran `since_version`. Reconstruida contra la historia de `gates/`: 32 llegaron con
  `2026.10.1`, una con `2026.10.4` y dos con `2026.10.5`. Una entrada de la base **no** declara
  procedencia, porque está en todas las versiones publicadas, y el validador rechaza las dos
  omisiones y una procedencia que apunte a una versión que nadie publicó.
- **La prosa, en los ocho idiomas.** Un párrafo en la Parte A del documento principal —ahí porque la
  versión fijada decide *cuál* de todas las exigencias aplica, igual que el Anexo H decide qué hay
  que leer— y dos líneas en el contrato del peldaño 2: una en el resultado esperado y una pregunta
  en la verificación de completitud.
- **La guarda.** `build/version_fijada.mjs` + `tests/version_fijada.test.mjs`, con once
  comprobaciones, y su archivo de rojos aparte, donde **ocho** mutilan el insumo y tienen que caer
  nombrando lo suyo —entre ellos el castellano, que es donde ya pasó lo contrario, y la comparación
  de versiones, que con cadenas pone `2026.10.9` por encima de `2026.10.10` y dejaría el
  diferencial vacío justo cuando hay trabajo que mirar—. Exige la simetría con la prosa en los ocho idiomas por el token inglés
  `catalog_version` —que es un identificador del dato y viaja idéntico, la misma forma que
  `anexo_simetria`—, la procedencia completa, y el diferencial **ejecutable**, anclado en la
  historia medida. Nueve rojos del validador más, en `gates_validador_en_rojo`. Y tiene **quien la
  invoque** desde el primer día: el paso nuevo del flujo exige la línea que el programa imprime,
  porque un paso que no imprimió nada no corrió.
- **La versión.** `catalog_version 2026.10.6 → 2026.10.7`, con su entrada en el registro
  append-only y la huella que produjo (`f6adbf113d57`). Ningún requisito, ningún id y ningún umbral
  cambiaron.

**Criterio de aceptación por perfil.**

- *P8 (dueño de proyecto que aplica el método):* dada esa persona, puede leer en el método con qué
  versión trabaja su proyecto, qué le cuesta subirla y que la decisión es suya; y antes de decidirla
  puede pedir la cuenta de qué requisitos entran en el medio.
- *P1, P2 (herramientas consumidoras):* dada una herramienta que compila las compuertas, esa
  herramienta encuentra **declarado** qué par tiene que registrar al fijar, contra qué contrastarlo
  y qué hacer cuando no coincide, sin tener que inventarse una convención propia.
- *P5 (auditor):* dado el perfil auditor, esta persona puede comprobar, sin leer código, que la
  prosa nombra la fijación en los ocho idiomas y que cada entrada agregada dice en qué versión
  entró; y puede reproducir el diferencial entre dos versiones publicadas.
- *P6 (lector humano que entra por el documento principal):* dada esa persona, al leer la Parte A se
  entera de que existe una versión fijada antes de que un upgrade le reabra un peldaño cerrado.

**Cómo se verifica.** `node build/version_fijada.mjs` imprime su cuenta y sus hallazgos;
`node --test` corre la guarda, sus diez rojos y los nueve del validador; `node build/api_check.mjs`
exige que lo publicado coincida y que el índice cite la huella viva.

**Lo que queda afuera, nombrado.** Que una herramienta **cumpla** la obligación que el dato le
declara no se mide en este repositorio: se mide en el de esa herramienta. El 2026-10-27 se le pasó
la medición y el orden corregido por el canal, con el detalle de que fijar a `base-schema-1` no es
fijar a una versión del método. Y esta guarda **no** habría atrapado el defecto que la originó:
mientras el dato no declaraba el contrato, no había simetría que revisar. Lo que guarda es que lo
declarado hoy no se quede sin su prosa, y que una entrada nueva no entre sin decir de dónde viene.

---

## PND-056 — El dato publicó una dirección que una máquina no puede bajar, y un puntero a una clave que el publicado no tiene *(lo trajo el consumidor; herramienta: PND-048)*

- **Nodo:** `datos/compuertas` [nodo propuesto]
- **Grupo:** G-API · **Severidad:** importante · **Quién decide:** nadie: es un defecto medido y su arreglo es mecánico
- **Repositorio:** método · **Estado: CERRADO** el 2026-10-27, con las dos direcciones publicadas, la cláusula autocontenida y su guarda.

**Qué estaba mal, y son dos cosas de la misma familia.** El contrato de fijación que acababa de
entrar con `PND-055` —publicado y cubierto por la huella— le decía al consumidor que contraste el
par (versión → huella) *«contra `version_scheme.version_ledger`»*. Esa clave **no existe en el
publicado**: vive sólo en `gates/schema.json`, que es una fuente. O sea que el único lector capaz de
seguir ese puntero era el que tiene el repositorio del método delante, que es exactamente el lector
para el que la interfaz de datos no hace falta. Y el índice de la interfaz declaraba del registro de
versiones **una sola dirección**, la página del blob, que ese alojamiento sirve como HTML; la
dirección que devuelve el JSON no estaba publicada en ninguna parte, así que para bajarlo hay que
**derivarla**. Adivinar una dirección es lo que la regla «nada inventado» prohíbe, y acá lo
obligaba el propio dato.

**Quién lo trajo.** El consumidor, el mismo día que implementó la obligación. No una auditoría, no
una medición propia: lo reportó quien tuvo que adivinar la dirección, con sus palabras:

> `index.json` publica la direccion de la PAGINA del blob, que devuelve HTML; hay que derivar
> `raw.githubusercontent` para bajar el JSON. Lo derivo en un solo lugar y lo reporto en el
> veredicto, pero adivinar una direccion es lo que el anexo prohibe. Convendria publicar tambien la
> cruda.

**Mi reproducción (2026-10-27), medida.** Las dos direcciones, pedidas de verdad:

```
$ node -e "fetch de las dos direcciones del registro de versiones"
200 text/html    284852  NO es JSON (        <!DOCTY...)  .../blob/main/gates/catalog.json
200 text/plain    11386  JSON valido                      raw.githubusercontent.com/.../gates/catalog.json
```

Y el puntero colgante, contra el publicado de `0af2a00`:

```
$ node -e "cada camino de clave que un texto del publicado nombra, resuelto contra el publicado"
NO RESUELVE  version_scheme.version_ledger   <- pinning.consumer_contract.must_contrast
RESUELVE     (los otros seis tokens de los dos recursos)
```

**Lo que se hizo.**

- **Las dos direcciones, publicadas.** El índice declara ahora, por recurso,
  `version_ledger.url` —la página que lee una persona— y `version_ledger.fetch_url` —el mismo
  archivo como JSON, que es lo que baja una herramienta—, con la nota que dice por qué son dos y no
  una. El verificador del índice las exige las dos (`E_INDICE_REGISTRO_CRUDO`) y exige que la de
  bajada termine en el `path` que el propio registro declara: una dirección que apunta a otro
  archivo es peor que ninguna. **El índice no tiene versión ni huella propias** (D-056), así que
  esta mitad **no cambia ninguna versión declarada**.
- **La cláusula, autocontenida.** `pinning.consumer_contract.must_contrast` ya no apunta a una clave
  de las fuentes: dice qué es el registro, que vive fuera del alojamiento que sirvió el archivo, y
  de dónde se saca su dirección —los dos campos del índice, por su nombre—, con la instrucción
  explícita de no derivar una de la otra ni clavarlas en el código.
- **La guarda, que es lo que hace que esto no vuelva.** `build/punteros_publicados.mjs` +
  `tests/punteros_publicados.test.mjs` (siete comprobaciones) y sus **diez rojos deliberados**
  aparte. Exige que **cada camino de clave que un texto publicado nombra resuelva en el publicado**;
  que los dos registros de salteo —sufijos que no son claves, y punteros que a propósito apuntan a
  otro recurso— no tengan entradas que sobren y lleven su razón escrita, como el anexo pide para una
  regla apagada; y la simetría entre la cláusula y el directorio: si el contrato manda leer un campo,
  el índice tiene que publicarlo. No haber podido mirar —sin índice— es **rojo y no verde**. Tiene
  **quien la invoque** desde el primer día: el paso nuevo del flujo exige la línea que el programa
  imprime. Tres rojos más en `api_indice`.
- **La huella de la versión, corregida antes de publicarla.** `2026.10.7` seguía sin publicar
  —producción servía `2026.10.6` y la entrada vivía en una rama sin fusionar—, así que la entrada del
  registro anota la huella del **contenido corregido** (`7575673f723e`) y dice por qué se corrigió en
  vez de subir a `2026.10.8`: una versión nueva habría dejado registrada una `2026.10.7` que nadie
  puede pedir nunca, y eso es una mentira peor que la nota. La regla sigue en pie y queda escrita con
  su alcance exacto: **la huella de una versión no se edita una vez que esa versión se sirvió.**

**Y lo que la distingue de la guarda de ayer, dicho porque es lo que la hace falsable:** ésta **sí**
habría atrapado el defecto que la originó. Medida contra el árbol publicado de `0af2a00` da **5
hallazgos** y nombra los dos —el puntero colgante y las dos direcciones que faltaban—; contra el
árbol de hoy, **cero**.

**Criterio de aceptación por perfil.**

- *P1, P2 (herramientas consumidoras):* dada una herramienta que sólo tiene la interfaz publicada,
  esa herramienta llega al registro de versiones **sin derivar ni adivinar** ninguna dirección, y
  todo campo que el contrato le manda leer existe en el archivo donde el contrato dice que está.
- *P5 (auditor):* dado el perfil auditor, esta persona puede correr una orden y ver que ningún texto
  del publicado apunta a una clave que el publicado no tiene, con la cuenta a la vista y no con una
  afirmación.
- *P8 (dueño de proyecto que aplica el método):* dada esa persona, lo que el método publica como
  obligación del consumidor es **cumplible** sin acceso al repositorio del método, que es la
  condición para poder exigirlo.

**Cómo se verifica.** `node build/punteros_publicados.mjs` imprime su cuenta y sus hallazgos;
`node --test` corre las siete comprobaciones, sus diez rojos y los tres nuevos del índice;
`node build/api_check.mjs` exige que el índice publicado sea el que dan las fuentes.

**Lo que queda afuera, nombrado.** Que la dirección de bajada **conteste** no lo verifica esta
guarda: eso es red, y la construcción corre sin red a propósito; lo pregunta la publicación contra
producción. Y que el consumidor **use** los dos campos en vez de seguir derivándolos se mide en su
repositorio, no en éste.

---

## PND-059 — El dato publicó un parámetro y no publicó sus valores, un día después de escribir la regla *(desvío propio; lo encontró la revisión de lo recién publicado)*

- **Nodo:** `datos/compuertas` [nodo propuesto]
- **Grupo:** G-API · **Severidad:** importante · **Quién decide:** nadie: es un defecto medido y su arreglo es mecánico
- **Repositorio:** método · **Estado: CERRADO** el 2026-10-27, con el bloque de enums resuelto en el publicado, el validador que lo exige y la regla E de la guarda de punteros.

**Qué estaba mal.** `2026.10.8` publicó el parámetro de UX-28 como
`project_config.communication_depth` y lo describió así: *«One of communication_depth: the
technical depth at which the agent speaks to the owner»*. Y **`communication_depth` no es una
clave de ningún archivo publicado**: los tres valores viven sólo en `gates/schema.json#enums`, que
es una fuente y no se publica. O sea que una herramienta que quisiera validar la profundidad que un
proyecto declaró tenía que **adivinar la lista**, y lo que veía mencionado era **uno** de los tres
valores, no los tres: una lista parcial que se lee como completa, que es peor que ninguna.

Es la misma familia que `PND-056` cerró **el día anterior** —un camino de clave que un texto
publicado nombra tiene que resolver en el publicado— cometida en la **primera entrada nueva** desde
que la regla existe. Y la guarda de punteros no lo vio por una razón que se puede nombrar: sólo
reconoce caminos **con punto**, y «One of communication_depth» es un token suelto. Dijo «0
hallazgos» y era verdad para los punteros que sabe ver.

**Mi reproducción (2026-10-27), medida sobre el archivo publicado de `deb06ce`.** Qué podía
recuperar un consumidor que sólo tiene `gates.json`:

```
$ node -e "contar los tres valores en el recurso que declara el parametro"
beginner          0 ocurrencias
decision_maker    1 ocurrencia   <- y solo como el default de la frase
technical         4 ocurrencias  <- las cuatro son la palabra inglesa ("technical depth",
                                    "technical module"), ninguna es el valor
communication_depth               no es clave en ninguna parte del publicado
project_config.enums              NO EXISTE
```

Los tres **sí** viajaban, pero en el **otro** recurso y en prosa: `prompts.json` los trae 72, 144 y
146 veces, adentro de la cláusula. Recuperables leyendo prosa inglesa de otro archivo, que no es lo
que una herramienta hace con un enum.

Y la mitad que más molesta: la entrada del registro de versiones de `2026.10.8` afirma que *«el
nombre y los tres valores se declaran acá para que ninguna herramienta los adivine»*. **El registro
no viaja en el publicado.** Para un consumidor, esa frase era falsa.

**Lo que se hizo.**

- **El bloque resuelto, y derivado.** `project_config.enums` publica la lista de valores de cada
  campo que nombra una, **derivada** de la única copia que hay en las fuentes
  (`gates/schema.json#enums`), para que no existan dos listas que puedan divergir —la misma regla
  que el enunciado de las reglas del anexo (D-044)—. Va con `enums_what`, que dice qué es el bloque
  y por qué existe. El campo lo nombra ahora como `` `project_config.enums.communication_depth` ``
  y lista los tres valores en la frase, así que el camino resuelve también por la regla A.
- **El validador lo exige** (`E_ENUM_CONFIGURACION`): un campo que nombra un enum por su nombre
  suelto es rojo, uno que nombra un enum que no existe es rojo, y publicar el bloque sin decir qué
  es también. Tres rojos deliberados nuevos.
- **La regla E de la guarda de punteros**, que es la regla A para la forma que la A no sabía ver.
  Es simétrica en las dos direcciones: un enum publicado que **ningún** campo nombra también es
  hallazgo, porque es una copia sin consumidor. Y la cuenta no puede ser cero: un publicado sin un
  solo enum resuelto frena la línea de comandos en vez de decir verde. Cinco rojos deliberados
  nuevos.
- **La versión sube a `2026.10.9`** con su huella anotada (`a4f6c78fa040`). No cambia ningún
  requisito, ningún id, ningún umbral y ninguna regla: el único contenido nuevo es la lista de tres
  valores que ya estaba publicada en prosa.

**Lo que la hace falsable, dicho con el número.** Esta guarda **sí** habría atrapado el defecto que
la originó. Medida contra el árbol publicado de `deb06ce`:

```
$ node -e "regla E contra el publicado de deb06ce"
enums de configuracion revisados: 0
  HALLAZGO communication_depth -- nombra el enum por su nombre suelto, que no es una clave del
           publicado: el consumidor tiene que adivinar la lista de valores
  HALLAZGO project_config -- no publica el bloque de enums resuelto
regla A sobre el mismo arbol: 0 hallazgos   <- por eso hacia falta la E
```

**Criterio de aceptación por perfil.**

- *P1, P2 (herramientas consumidoras):* dada una herramienta que sólo tiene la interfaz publicada,
  esa herramienta puede validar el valor que un proyecto declaró en `communication_depth` **sin
  adivinar ni leer prosa de otro recurso**, porque la lista de valores está en el mismo archivo que
  declara el campo.
- *P5 (auditor):* dado el perfil auditor, esta persona corre una orden y ve que ningún campo de la
  configuración nombra un enum que el publicado no resuelve, con la cuenta a la vista.
- *P8 (dueño de proyecto que aplica el método):* dada esa persona, lo que el método le pide declarar
  en su configuración tiene sus valores posibles escritos donde la herramienta los lee, así que una
  profundidad mal escrita se rechaza con los tres valores a la vista en vez de aceptarse en silencio.

**Cómo se verifica.** `node build/punteros_publicados.mjs` imprime la cuenta de enums resueltos y
sus hallazgos; `node build/gates_validate.mjs` cae con `E_ENUM_CONFIGURACION` si un campo vuelve a
nombrar un enum suelto; `node --test` corre las tres comprobaciones verdes y los ocho rojos nuevos;
`node build/gates_doc.mjs --check` exige que el documento generado publique la tabla de valores.

**Lo que queda afuera, nombrado.** Que un consumidor **use** la lista en vez de seguir con una
copia propia se mide en su repositorio, no en éste. Y la guarda resuelve nombres, no significados:
no verifica que los tres valores signifiquen lo que la prosa del anexo dice que significan.

---

# Resumen del estado

*Contado por máquina y no a mano: `tests/pending_resumen.test.mjs` cuenta las entradas del propio
archivo y exige que esta tabla sea exactamente eso, sin huecos ni repetidos. Nació de un defecto
medido el 2026-10-24 —con cinco cierres en un día la tabla seguía diciendo tres cerrados cuando ya
eran ocho—, así que la cuenta ya no depende de que alguien se acuerde de rehacerla.*

| grupo | entradas | abiertos | cerrados | bloqueantes abiertos |
|---|---:|---:|---:|---:|
| G-API | 17 | 5 | 12 | 1 |
| G-ALCANCE | 5 | 1 | 4 | 0 |
| G-IDIOMA | 14 | 11 | 3 | 1 |
| G-PUBLICACION | 5 | 0 | 5 | 0 |
| G-ECOSISTEMA | 3 | 0 | 3 | 0 |
| G-METODO | 13 | 2 | 11 | 0 |
| G-TRAZABILIDAD | 3 | 1 | 2 | 0 |
| **total** | **60** | **20** | **40** | **2** |

Sesenta entradas, `PND-001` a `PND-060`. Veintidós vienen de la auditoría externa
(`U-01` a `U-22`), cuatro del propio método midiendo su cadena y su publicación (PND-001, PND-035,
PND-037 y PND-038), dieciséis son trabajo derivado —la propuesta de firma, el chequeo de huérfanas, la portada del
protocolo que se creyó sin fuente y no lo estaba, la hoja nueva que nace sin enlace en la portada,
las nueve revisiones semánticas, los dos defectos del castellano que esas revisiones encontraron al
pasar (`PND-057` y `PND-058`) y el vocabulario partido entre la portada y el documento que apareció
al medir su desempate (`PND-060`)— y **diez son de una fuente nueva**: la retrospectiva
del peldaño 23 sobre «El Arte de Forjar Sistemas», la novela de Oscar Schmitz que adapta el método,
validada aseveración por aseveración contra la letra (`PND-039` a `PND-048`, grupo G-METODO). No las
trajo una auditoría encargada ni una medición propia: las trajo **un lector que aplicó el método a
fondo y lo que le pasó al aplicarlo**, que es exactamente la entrada que el peldaño 23 espera. Y las
dos últimas no las trajo nadie de afuera: `PND-050` salió de leer el árbol después de fusionar, y
`PND-051` de que el dueño leyera la portada que una entrada cerrada decía que no existía. Las dos
son desvíos propios, y las dos del mismo día. `PND-052` es el tercero, del día siguiente, y sale de
**refutar** una de las dos: `PND-036` afirmaba una ausencia desde una búsqueda que había mirado
cuatro árboles y ninguno era el que correspondía. Y `PND-056` tiene el origen que una interfaz
publicada tendría que tener más seguido: **lo trajo el consumidor**. No una auditoría ni el autor
releyéndose, sino la herramienta que intentó cumplir la obligación recién publicada y se encontró
con que, para cumplirla, tenía que adivinar una dirección.

`PND-059` es el cuarto desvío propio y el más incómodo de los cuatro, porque es la misma familia
que `PND-056` —un texto publicado que apunta a algo que el publicado no tiene— cometida **un día
después** de escribir la regla, en la primera entrada nueva desde que la regla existe. No la trajo
el consumidor ni una auditoría: salió de volver a leer lo que se acababa de publicar, que es lo
único que la separa de las tres anteriores.

`PND-060` es la última, y es la única del registro que **ninguna de las comprobaciones que ya
existen podía encontrar**. No es un desvío ni un hallazgo de nadie de afuera: salió de necesitar un
desempate. Las nueve revisiones semánticas comparan cada idioma contra el castellano **de la misma
página**, y la auditoría externa comparó paridad de claves; ninguna de las dos puede ver que la
portada y el documento usen palabras distintas para la misma cosa dentro de un idioma. Medido:
tres términos lo hacen, y en uno de ellos el corpus alemán repite quinientas diecinueve veces una
palabra que en alemán corriente significa *factura impagada*.

`PND-053` es de otra clase: no es un desvío ni un hallazgo de nadie, es una
declaración que faltaba. `PND-039` dejó escrito que las dos entradas previas del Anexo H no tenían
ruta y que no se inventaba ninguna porque el dueño no la había declarado; el 2026-10-27 la declaró
(`docs/GLOSSARY.md` y `docs/PROFILES.md`) y con eso dejaron de estar publicadas como exigidas y no
verificables por máquina.

**Lo que está primero, y por qué.** Las precondiciones del grupo de la API están cerradas, y en
este orden: PND-021 (cuál es el árbol del portal realmente desplegado), PND-020 y PND-018 (la
publicación atrasada), PND-002 con PND-006 y PND-007 (el índice, que es la raíz de siete entradas),
y PND-035 (el transporte del portal, que descartaba la configuración), con el que cierran PND-004,
PND-005 y PND-013 —este último recién cuando una publicación del método corrió **encima** de la
configuración sin borrarla, que es lo que su criterio pedía y no "está puesta hoy"—. El grupo de la
API queda sin ninguna precondición abierta.

**El grueso del grupo del alcance se cerró el 2026-10-24**, en el orden que el dueño autorizó y en
un solo movimiento sobre la misma portada: **PND-014** (el mapa, que pasó de 7 direcciones a 96 y ya
no se escribe a mano), **PND-015** (los documentos que se servían sin que nadie los enlazara, entre
ellos el anexo de las 45 reglas en ocho idiomas) y **PND-003** (nombrar la interfaz de datos, que
recién tenía sentido con el índice de PND-002 al que apuntar). De paso cerró **PND-017**, el error
italiano, que había que corregir antes de hornear o se publicaba dentro de una página estática.
Y el 2026-10-26 cerró el que faltaba, **PND-025**: la mitad del guardián que vive en el método.
Ahora la publicación, en el único momento en que los dos árboles están juntos, contrasta los
documentos que el método publica contra los que la portada enlaza y los que el mapa del sitio
lleva, y avisa nombrando a cada huérfano. Al implementarlo apareció algo peor que lo registrado:
la mitad del portal existía y **no la corría nadie** —su flujo de despliegue no la invocaba—, así
que hasta ese día la única defensa era que alguien se acordara. Eso quedó registrado como
**PND-038**, con su arreglo escrito y medido —el despliegue del portal corre la compuerta y las
pruebas en rojo, y exige la línea que cada una imprime—, y **cerró el mismo día**, cuando el
empujón ocurrió y la primera corrida real del paso dejó sus cuatro líneas en el registro de un
despliegue del portal. Con eso el grupo de la publicación queda **completo** y el del alcance estuvo
completo un día: `PND-049`, la hoja nueva, está enlazada desde las diez portadas servidas y los
ochenta y cuatro documentos del método están enlazados y en el mapa del sitio. Lo reabrió la
revisión semántica el 2026-10-27 con **PND-058**: la entrada de la tabla del material promete cinco
documentos por idioma y la tabla tiene diez columnas, así que el Anexo H y la hoja nueva están
enlazados y el párrafo que los presenta no los nombra. Llegar al material no es sólo que el enlace
exista.

**Y el 2026-10-26 el grupo del ecosistema cerró a medias, y la mitad que no cerró es la lección.**
**PND-022**: la distinción entre el método, el protocolo y la herramienta está escrita arriba en el
**README del método**, en los ocho idiomas del corpus, con el argumento de neutralidad en la única
forma que se sostiene —medido, con el comando que cualquiera corre contra el archivo servido, y no
como declaración del autor—. Antes de escribirlo se le preguntó a producción, que es lo que la propia
entrada exigía: cero menciones de la herramienta y del protocolo en los dos archivos publicados, y
en el índice sólo las direcciones que él mismo declara. **En la portada del portal no va**, y eso es
una corrección del mismo día: la reproducción de esa entrada decía que la distinción «no está escrita
en ninguna parte» y era falsa —la portada contesta la pregunta práctica tres veces, una sobre el
pliegue—, así que el párrafo que se había escrito y horneado en diez idiomas se descartó sin publicar
(`PND-051`, D-063). Al trabajarlo aparecieron dos cosas que no estaban registradas y que son mejores
que el pendiente. Una era real: la prueba en rojo del verificador de portadas mira **un árbol
clavado a una ruta local** y pasa en verde sin ver el cambio que tiene al lado (**PND-037**). La otra
**no existía**: se registró que la portada del protocolo estaba servida sin fuente en ningún
repositorio, y era un defecto propio de medición —se buscó en cuatro árboles y el que correspondía
no era ninguno— que quedó refutado el 2026-10-27 con la fuente, el commit y el despliegue a la vista
(**PND-036**, D-064).

**Y las cuatro guardas dormidas, contadas juntas, porque es el patrón del proyecto y no cuatro
anécdotas.** El guardián de línea de comandos que acertaba sólo en un sistema operativo y dejaba
dos pasos de la cadena corriendo en vacío (PND-001). La guarda que afirmaba un efecto que no había
verificado, con el despliegue cerrando en verde y producción en rojo (D-057, PND-035). La compuerta
de las portadas, escrita y correcta, que **no la invocaba nadie** (PND-038). Y la prueba en rojo
que mutilaba un árbol que no era el suyo y decía OK (PND-037). Las cuatro están cerradas, y las dos del portal
tardaron una vuelta de más a propósito: se habían cerrado con un commit en la máquina, se
**reabrieron el mismo día** porque eso no es un efecto en producción, y cerraron cuando el despliegue
del portal corrió de verdad y dejó cada línea exigida en el registro de su corrida. Esa vuelta es
D-057 aplicado a la contabilidad del propio registro. Las cuatro son la misma frase:
**un verde que no midió lo que uno cree que midió no es un verde**. Lo
que las descubrió, las cuatro veces, no fue leer el código: fue exigirle a cada guarda la salida
medida en vez de su código de salida.

**Y el 2026-10-26, al final del día, se abrió el grupo del método y se cerró casi entero.** Diez
entradas que no vienen de mirar la publicación sino de mirar el método: seis mejoras y tres defectos
que salieron de validar la novela que lo adapta, más la guarda que impide que la primera vuelva. La
que importaba era **PND-039**: el Anexo H —45 reglas, obligatorias, con cinco anclas que son
evaluadores `required: true` en el dato publicado— no se nombraba ni una vez en los 143.274
caracteres del documento principal, y el autor del libro, que reprodujo seis cifras seguidas de las
referencias sin un error, omitió veintisiete de esas reglas porque **nunca supo que estaban**. Eso no
es una corazonada sobre la claridad del documento: es un lector real, medido, cuyo proyecto guía
quedaría detenido en cinco peldaños de las compuertas del propio método.

El dueño decidió las cuatro que volvían a él —la ficha **y** el contrato del peldaño 2, la
proporcionalidad con palabras del método y sin vocabulario de budō, las veinticinco preguntas
escritas de cero desde los contratos, y la forma fuerte de la comprobación— y con eso cerraron nueve
de las diez en el mismo día: el anexo nombrado donde el dato lo exige, las cuatro formulaciones
adoptadas con crédito en la Parte F.5, la hoja nueva en los ocho idiomas, el registro que la prueba
del manual de recuperación tiene que dejar, la aritmética de la Ref. 22, la frase de `CLAUDE.md`
alineada, y la guarda con sus diez rojos deliberados. **Queda abierta una**: `PND-046`, porque la
elección entre escribir la referencia o quitar la mención es del dueño y la evidencia la tiene él.
De paso quedó abierta `PND-049` en el grupo del alcance, que es la consecuencia conocida de haber
publicado un documento nuevo —la portada del portal no lo enlazaba—, y **cerró el mismo día** con
el empujón: las ocho celdas están en las diez portadas servidas y el mapa del sitio en producción
lleva las ocho direcciones.

**Y el séptimo grupo nació de un desvío propio, el mismo día.** `PND-050`: el commit que cerraba el
trabajo de arriba —el que anuncia un arreglo de una palabra en los ocho idiomas— llevó además ocho
documentos que su mensaje no nombra, y mil sesenta y seis de las mil ochenta y siete líneas que
insertó están fuera del alcance que declara. No lo encontró el dueño ni lo encontró una compuerta:
apareció al leer el árbol después de fusionar. Ninguno de los ocho se publica —ninguno está en el
arreglo literal de la construcción, y la corrida de publicación lo confirma: los ocho huérfanos que
nombró son otros—, así que lo que se rompió no es lo servido: es la única fuente que dice por qué
cambió cada archivo. Los tres apuntes de sesión salieron del repositorio, el cuarto se quedó
renombrado porque el registro lo cita como evidencia de una decisión, y los cuatro que son material
de trabajo en curso se quedaron donde estaban. **Lo que queda abierto es la prevención**, que vuelve
al dueño: hoy la única defensa contra que vuelva a pasar es que alguien se acuerde de mirar el
árbol, que es la forma de una guarda dormida vista del otro lado —no hay guarda—.

`PND-054` es la última, y la pidió el dueño: el método les ordena a sus prompts **preguntar** —
veintidós veces, en más de la mitad del corpus— y no decía en ninguna parte **cómo se pregunta**.
Es la tercera de la familia del recibo de rojo y del reporte proporcional: el peldaño 8 definió qué
es un recibo, el 12 separó verificado de creído, y faltaba no conformarse con «preguntá». **Cerró
el mismo día** (D-070): la regla `UX-28` con su familia nueva `B6`, el parámetro
`communication_depth` con sus tres niveles declarados en el dato, la cláusula en los setenta y dos
prompts de los ocho idiomas y la guarda que exige que siga ahí. Y dejó escrita la tensión que abrió:
la cláusula entra **adentro** de los prompts, que es lo que D-044 argumentó que no se hace, así que
la excepción está escrita, acotada y argumentada en el propio anexo.

Lo que sigue son las decisiones del dueño que están esperando turno (PND-008, PND-009, PND-012,
PND-016, PND-024 y PND-046), los arreglos de las nueve revisiones semánticas —**ya hechas** el
2026-10-27, cuarenta y seis hallazgos, y en curso porque su criterio de aceptación es sobre lo que
el lector lee y publicar la portada es del dueño (PND-026 a PND-034, con PND-057 y PND-058, que son
del castellano)— y la prevención de los desvíos de medición (**PND-052**, que es el segundo del
mismo grupo en dos días). Los dos bloqueantes abiertos que quedan son uno de la API (PND-011, que
necesita el corpus en diez idiomas) y uno de idiomas (PND-016, la decisión más cara del backlog):
el del método, el del alcance, el de la publicación y el del contenido se cerraron —`PND-054`, la
forma de la pregunta, el 2026-10-27 con D-070—, y `PND-010` y `PND-019` cerraron juntos en un solo
cambio de versión.

**Una tensión de método, dicha para que quede en el registro.** Este trabajo se hace con el tramo
de normalización abierto y **en rojo** —la estación N0 no cerró—, y la normalización prohíbe tocar
el sistema. Es un evolutivo-correctivo deliberado por encima de la normalización, por decisión del
dueño. N0 no avanza mientras tanto, y eso está bien: lo que no se puede es no haberlo dicho.
