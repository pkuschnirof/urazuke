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
  arrastra solo) · **Estado: CERRADO** el 2026-10-27, en `catalog_version 2026.10.10` y
  `corpus_version 2026.10.6`.
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

**Lo que entró, y dos cosas de la especificación cambiaron al medirlas.**

*Una carpeta por RECURSO y no una por versión.* La especificación decía «una carpeta por versión
con los dos archivos», que es lo que el auditor había propuesto (`/api/2026.10.2/gates.json`). No
se puede: cada recurso declara **su propia línea de versión** —hoy el catálogo va en `2026.10.10`
y el corpus de prompts en `2026.10.6`—, así que una carpeta con un número adentro estaría
nombrando con la versión de uno el contenido del otro. Quedó
`docs/html/api/gates/2026.10.10.json` y `docs/html/api/prompts/2026.10.6.json`. El espejo las
arrastra solas, como la especificación anticipaba: la publicación copia el directorio entero.

*La promesa es el CONTENIDO y no los bytes, y eso corrige la comprobación que la especificación
pedía.* Decía que la copia de la versión vigente tiene que ser «idéntica byte a byte» al archivo
vivo. No sirve: `generated_at` y `git_commit` quedan **fuera** de la huella a propósito —si
entraran, cada regeneración cambiaría la huella sin que cambie una sola regla—, así que prometer
los bytes es prometer algo que la primera regeneración rompe. Lo que se promete es el contenido que
la huella cubre, y la comprobación es la que de verdad vale: la huella **recalculada** de cada
copia tiene que ser la que su propia entrada del registro anota. Eso es, literalmente, el criterio
de aceptación de P5.

*Y hasta dónde llega la promesa de una versión vieja, medido y escrito en el dato.* La huella de
una versión cubre lo que cubría el día que se publicó, y eso creció: `PND-010` metió `what` y
`counts` adentro en `2026.10.6`. Medido copia por copia: las versiones `2026.10.1` a `2026.10.5`
del catálogo **no cubren** esas dos claves, y las de `2026.10.6` en adelante no dejan nada en el
limbo. Para una de esas cinco, la dirección sólo puede prometer lo que esa versión podía probar, y
eso **no lo arregla una versión posterior** —una huella ya publicada no se edita (D-053)—. Está
dicho en `pinning.prior_version_content.what_is_promised`, con las versiones nombradas, y hay una
prueba que fija la tabla para que el límite no se pueda ensanchar en silencio.

**Lo que se recuperó, que es la mitad que no estaba en la especificación.** La dirección inmutable
podía haber empezado a existir desde hoy, hacia adelante, dejando sin dirección las nueve versiones
ya publicadas —que son justamente las que alguien pudo haber fijado—. No hizo falta: el archivo
publicado está commiteado en cada versión, así que las copias se **extraen** de la historia de
`main` y se verifican una por una contra el registro. No es arqueología, es extracción, y la
diferencia la dice la medición:

```
node build/version_inmutable.mjs --congelar
  congelada: gates.json 2026.10.1 ... 2026.10.9   (nueve)
  congelada: prompts.json 2026.10.1 ... 2026.10.5  (cinco)
  versiones inmutables: comprobado -- 14 copias, cada una con la huella que su registro anota, 0 hallazgos
```

Las catorce recalculan exactamente la huella que su propia entrada del registro anota. Si una no
hubiera dado, se decía y se dejaba sin dirección; dieron las catorce.

**Y una cosa que NO entró, y la decidió la medición y no el gusto.** El primer intento puso la
dirección **absoluta** adentro de `gates.json`, para que una herramienta que sólo tiene ese archivo
sepa de dónde volver a leerlo. La prueba de neutralidad lo rechazó, y tenía razón: una dirección
absoluta lleva el nombre del alojamiento, y el README publica —en los ocho idiomas— un comando que
cuenta esas ocurrencias **sobre el archivo servido** y afirma que devuelve **0**. Habría convertido
una afirmación medida y publicada en una afirmación falsa, que es exactamente el defecto que este
proyecto persigue. Quedó así: el recurso declara su **camino relativo** (`gates/2026.10.10.json`) y
la dirección **absoluta** la declara el índice, que es el directorio de la interfaz y tiene su
excepción escrita y probada desde D-056. Medido después del cambio: `gates.json` 0, `prompts.json`
0, y hay una prueba que corre esa misma cuenta sobre los dos archivos para que el README no dependa
de que alguien se acuerde.

**Evidencia de cierre.**

```
node --test                        ->  359 pruebas, 0 fallos (eran 335)
node build/version_inmutable.mjs   ->  comprobado -- 16 copias, 0 hallazgos (gates/ 10, prompts/ 6)
node build/api_check.mjs           ->  los tres recursos coinciden, y las 16 copias tambien
la cuenta del README sobre lo publicado:  gates.json 0 | prompts.json 0
archivos a publicar                ->  156 (eran 140: +16 copias)
```

Los rojos antes del verde, en `tests/version_inmutable.test.mjs`: falta una copia y sale nombrada;
una copia alterada en una clave cubierta cae por la huella; una copia bien nombrada con otra
versión adentro cae por las dos cosas; una copia que el registro no anota cae; la versión viva sin
entrada en el registro cae; y `congelar` **no toca** una copia que ya existe, porque el directorio
es append-only igual que el registro del que sale. Más un verde deliberado que documenta la
promesa: una copia alterada **sólo** en `generated_at` pasa, y eso no es un agujero sino lo que
`what_is_promised` declara.

**La guarda nace con quien la invoque**, que es la lección que este repositorio pagó cuatro veces:
el paso nuevo del flujo exige la línea que el programa imprime, y `build/build.mjs` congela sola la
copia de la versión vigente —que es una copia de un archivo que está en disco y no necesita git—,
así que subir de versión no depende de que alguien se acuerde de un comando. Recuperar una versión
**anterior** sí necesita la historia, y la cadena clona a profundidad 1: por eso eso es una
operación local y deliberada (`--congelar`) y lo que corre en cada cambio es la verificación.

---

## PND-009 — La huella no es una firma, y conviene que el archivo lo diga más fuerte *(era U-08)*

- **Nodo:** `interfaz-publica/api` [nodo propuesto]
- **Grupo:** G-API · **Severidad:** avisa · **Repositorio:** método · **Estado: CERRADO** el
  2026-10-27, en `catalog_version 2026.10.10` y `corpus_version 2026.10.6`.
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

**Cierre (2026-10-27).** `what` quedó cubierto por la huella en `2026.10.6` del catálogo y en
`2026.10.4` del corpus de prompts (`PND-010`), que era la condición que este pendiente tenía
escrita desde el 24. Con eso la frase se movió a donde se puede comprobar: viaja en el `what` de
los **dos recursos**, adentro de lo que la huella cubre, y sigue viajando en el del índice.

**Y va en UNA SOLA COPIA**, que es la misma regla que el enunciado de las reglas del anexo (D-044):
vive en `ALCANCE_DE_LA_HUELLA` de `build/gates_lib.mjs` y los tres `what` la componen. La prueba no
se conforma con que los tres digan algo parecido: exige que sea la **misma cadena, byte a byte**, y
cae si alguien la reescribe en un archivo y deja tres versiones de la misma promesa.

Lo que la frase dice, sin maquillaje, es lo que la huella hace de verdad: es auto-consistente —quien
puede editar un archivo puede recalcularla—, detecta el truncado, la fusión mal hecha y la edición a
mano, **no** protege contra un adversario que controle el alojamiento que sirvió el archivo, las
anclas que no viven ahí son el registro de versiones y el cifrado de la conexión, y **no hay firma
criptográfica: eso es una decisión escrita con su costo a la vista y no un olvido**. Esa última
oración es la que cierra el círculo con `PND-024`, que sigue abierto: la propuesta de firma todavía
no está escrita, y el archivo ya no deja que alguien suponga que existe.

**Evidencia de cierre.**

```
node --test  ->  359 pruebas, 0 fallos
la frase, literal, en los tres publicados: gates.json, prompts.json, index.json
`what` cubierto por la huella en los dos recursos: si
el indice NO declara content_hash: es la decision D-056, no un olvido
```

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
- **Grupo:** G-API · **Severidad:** bloquea · **Repositorio:** método · **Estado: CERRADO** el
  2026-10-28 — publicado, verificado en producción y cerrado con los ocho idiomas que tienen prosa.
- **Decisión del dueño (2026-10-24): sí, y en DIEZ idiomas.**
- **Decisión del dueño (2026-10-28): "PND-011 cerrar con 8 idiomas".** La obligación de los diez
  no se retira: vive en `PND-016`, que es donde está su costo y de donde este catálogo los va a
  tomar solo.

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

**Depende de:** PND-002 (van al índice) y PND-016 (el corpus va a diez idiomas). *El número de
este segundo decía `PND-017`, que es el error de traducción del italiano; la referencia estaba
mal desde que se escribió la entrada y se corrige acá, a la vista, el 2026-10-28.*

**Avance (2026-10-28, decisión D-074). Construido, fusionado y servido por producción.**

El catálogo existe: `docs/html/api/labels.json`, `labels_version 2026.10.1`, huella
`0f3c78defe6f`, generado por `build/labels_api.mjs`. Lleva el título de los veinticuatro
peldaños, el título de las ocho estaciones y el enunciado de las cuarenta y seis reglas del
Anexo H, en los ocho idiomas que la prosa declara, con su entrada en el índice, su registro
append-only y su dirección por versión. Lo medido, pegado tal cual:

```
node build/labels_api.mjs
api: docs/html/api/labels.json (catalogo 2026.10.1, 8 idiomas x 78 ids = 624 textos extraidos, huella 0f3c78defe6f)

node build/api_check.mjs
gates.json: la huella recalculada coincide (version 2026.10.10, 280d8745797b)
prompts.json: la huella recalculada coincide (version 2026.10.6, 03866b055357)
labels.json: la huella recalculada coincide (version 2026.10.1, 0f3c78defe6f)
index.json: cita las versiones y huellas vivas de gates.json 2026.10.10/280d8745797b,
  prompts.json 2026.10.6/03866b055357, labels.json 2026.10.1/0f3c78defe6f
versiones inmutables: comprobado -- 17 copias, cada una con la huella que su registro anota
  (gates/ 10, prompts/ 6, labels/ 1)

node --test
# tests 383   # pass 383   # fail 0        (eran 360 antes de este cambio: 23 nuevas,
                                            doce de ellas rojos deliberados)
```

**Lo que no es:** una traducción nueva. Las traducciones ya estaban en la prosa, así que esto es
una **extracción**, el mismo mecanismo que ya resolvía el enunciado inglés de las reglas. Y hay
una prueba que lo exige sobre las **624** cadenas: cada una tiene que aparecer **literal** en el
documento del idioma del que dice salir. Es la que impide que este archivo se vuelva una segunda
versión del método, que es el riesgo propio de un catálogo de textos.

**Lo que quedó afuera, con su razón y su medición** (declarado en `scope`, adentro de la huella):
el vocabulario de evaluadores, cuya descripción es nivel de datos y existe en un solo idioma
—traducirla sería escribir texto acá—; y las preguntas de verificación de cada peldaño, porque la
lista que el dato declara y la que la prosa del contrato lleva **no son la misma**: medido el
2026-10-28, **cero de veinticuatro** peldaños coinciden en cantidad y la prosa es la más larga en
todos, así que emparejarlas por posición las etiquetaría mal. Esa medición se reproduce en una
prueba, para que la exclusión no se vuelva falsa sola.

**Los ocho idiomas y la decisión de diez.** El dueño decidió diez el 2026-10-24 y esto publica
ocho, que son los que tienen prosa: un idioma sin prosa no tiene texto que extraer. No hay nada
que hacer acá para llegar a diez —la lista se **deriva** de `languages.prose_versions`, así que el
día que `PND-016` lleve el corpus a diez el catálogo publica diez sin tocar una línea de este
programa—, y el recurso lo dice de frente en `languages.note`.

**El desvío propio que este cambio atrapó, y vale más que el recurso.**
`build/portal_verify.mjs` —el programa que después de empujar le pregunta a producción si sirve lo
que este repositorio commiteó— llevaba su lista de recursos **clavada en dos**. Con un tercero
publicado, la publicación le habría preguntado por dos de tres y habría cerrado **en verde sin
haber mirado el tercero**: el defecto de D-057 otra vez, en otra escala. Ahora la lista sale de la
que el índice declara, igual que la de las copias por versión. Medido contra producción antes de
fusionar, con el arreglo puesto:

```
node build/portal_verify.mjs --rondas 1          (código de salida 1)
gates.json:   coincide    -- HTTP 200, 113626 bytes, version 2026.10.10, huella 280d8745797b
prompts.json: coincide    -- HTTP 200, 102716 bytes, version 2026.10.6,  huella 03866b055357
labels.json:  ilegible    -- HTTP 404, 13 bytes: 404 Not Found
index.json:   otra_huella -- HTTP 200, 9118 bytes, el indice servido no cita la huella de labels.json
No se pudo leer produccion. La publicacion ocurrio; lo que falta es la evidencia de que llego.
```

Ese 404 es el correcto: el recurso todavía no se fusionó. Y es la prueba de que la guarda que
acabo de arreglar de verdad mira el tercer recurso, porque antes del arreglo habría dicho que todo
estaba bien.

**El efecto, que es lo único que cuenta (D-057).** Fusionado el 2026-10-28 a las 10:53 UTC
(`abc3349`, pedido de fusión 26). La publicación del método espejó el recurso en el portal y
**el despliegue del portal salió en rojo donde tenía que salir**: su comprobación 8 pidió las
noventa y nueve direcciones que el método publica y el mapa del sitio llevaba noventa y ocho,
nombrando la que faltaba. Servido no es publicado, y eso es exactamente lo que esa compuerta
existe para decir:

```
FAIL -- 1 problem(s):
  - [sitemap.xml] missing 1 of the 99 urazuke url(s)
    (first: https://yujin.app/urazuke/api/labels.json)
Fix the generator, never this verifier.
```

El mapa del sitio vive en el repositorio del portal y el trabajo de publicación del método no lo
toca, así que un recurso nuevo de la interfaz de datos **siempre** va a dejar ese despliegue en
rojo hasta que alguien regenere el mapa. Arreglado en el generador y no en el verificador
(`node build/prerender-urazuke.mjs`, que lo descubre del disco), con las cuatro comprobaciones del
portal en verde antes de empujar, y el despliegue `40676973425` cerró bien. Lo que producción
sirve ahora, medido desde esta máquina:

```
node build/portal_verify.mjs --rondas 1          (código de salida 0)
gates.json:   coincide -- HTTP 200, 113626 bytes, version 2026.10.10, huella 280d8745797b
prompts.json: coincide -- HTTP 200, 102716 bytes, version 2026.10.6,  huella 03866b055357
labels.json:  coincide -- HTTP 200,  91432 bytes, version 2026.10.1,  huella 0f3c78defe6f
index.json:   coincide -- HTTP 200,  12843 bytes, cita las 3 huellas que declara lo commiteado
Produccion sirve las 3 huellas y un indice que las cita: publicado y verificado.

node build/api_headers.mjs                       (código de salida 0)
OK    https://yujin.app/urazuke/api/ contesta con el indice -- HTTP 200, 3 recursos listados
OK    labels.json: un navegador de otro origen puede leerla -- access-control-allow-origin: *
OK    labels.json: dice cuanto vale la copia -- cache-control: public, max-age=300, must-revalidate
```

**Y dos defectos propios más del mismo programa, atrapados al leer su propia salida.** El
veredicto decía `labels.json: version (sin version declarada)` sobre un archivo que **sí** la
declara, y cerraba con «Produccion sirve **las dos** huellas» habiendo mirado tres. Los dos son la
misma falta en dos formas: una lista escrita a mano (la cadena `catalog_version ?? corpus_version`,
que no reconoce `labels_version`) y una cuenta escrita a mano dentro del texto de un veredicto.
Ninguno afecta la huella —la verificación era correcta—, pero este programa existe **para
reportar**, y un reporte que dice «no declara versión» sobre un archivo que la declara es la
misma clase de mentira que el aviso del 2026-10-23 que lo originó. Arreglados derivando las dos
cosas: el nombre del campo sale de `version_field` de cada recurso del índice y la cuenta sale de
la lista. Cuatro pruebas nuevas, y las tres que pueden caer **caen** con el defecto reintroducido:

```
--- con el defecto puesto ---
not ok 12 - la version se lee del campo que CADA recurso declara, sin adivinar el nombre
not ok 14 - un recurso que no declara su campo lo dice por su nombre, no "sin version declarada"
not ok 15 - la linea del veredicto cuenta los recursos que hay, no los que habia
# pass 12   # fail 3
--- restaurado ---
# pass 15   # fail 0        (suite completa: # tests 387  # pass 387  # fail 0)
```

**Evidencia de cierre (2026-10-28), medida del lado del consumidor y no del disco.** Los dos
criterios de aceptación son sobre lo que un consumidor puede hacer, así que se comprobaron como lo
haría un consumidor: bajando el archivo **servido** y leyéndolo como lo leería una herramienta
ajena, sin ninguna traducción propia a mano.

```
GET https://yujin.app/urazuke/api/labels.json   HTTP 200, 91432 bytes, labels_version 2026.10.1
idiomas 8 [es en pt fr de it ja zh]   ids 78   cadenas 624   ids sin texto en algun idioma: 0
counts declarado: steps 24, stations 8, rules 46, ids_per_language 78, strings 624  -- coincide
labels.es.steps[5] -> El plan son los pendientes
labels.ja.steps[5] -> 計画とは保留項目のこと
labels.de.steps[5] -> Der Plan sind die offenen Posten
labels.zh.steps[5] -> 计划就是待办项
labels.pt.rules["UX-28"] -> Quando o agente precisa de uma decisao do dono, a pergunta chega com
  as suas quatro partes e nesta ordem: os dados que a tornam necessaria, enumerados; [...]

node --test                                     # tests 387   # pass 387   # fail 0
```

- *P1, P2 — cumplido.* Una herramienta que no tiene ni una traducción propia pide **un** archivo por
  red y le muestra a su usuario el título del peldaño 5 en japonés, en alemán o en chino. El texto
  que le muestra es el de la prosa del método, no una traducción que la herramienta se escribió.
- *P5 — cumplido.* El auditor comprueba que a ningún identificador le falta su texto en ningún
  idioma con la cuenta de arriba —78 por idioma, 624 en total, cero huecos— y la contrasta contra
  el `counts` que el propio archivo declara, que desde `2026.10.6` está **cubierto por la huella**
  (D-067): un archivo truncado no puede mentir sobre su propio tamaño.

**Por qué cierra con ocho, dicho entero porque el dueño había decidido diez.** No hay trabajo que
hacer acá para llegar a diez. Los ocho son exactamente los idiomas que tienen prosa, un idioma sin
prosa no tiene texto que extraer —extraerlo sería **escribir** texto nuevo acá, que es lo único que
este recurso no puede hacer—, y la lista se **deriva** de `languages.prose_versions` (D-067), así
que el día que `PND-016` lleve el corpus a diez este catálogo publica diez sin que nadie toque una
línea del programa. Dejar la entrada abierta habría mostrado en el registro un bloqueante que nadie
puede trabajar: su costo es el de `PND-016`, que tiene su propia entrada y es la decisión más cara
del backlog. El recurso lo dice de frente en `languages.note`, nombrando la diferencia entre los
diez idiomas de la interfaz y los ocho de la prosa como lo que es: un pendiente abierto del método
y no un defecto del archivo.

**Lo que este cierre deja afuera a propósito, para que no se busque acá.** Los diez idiomas del
corpus son `PND-016`. Y la tabla «Qué hay acá» de `README.md` no lista `labels/`, igual que no
lista `gates/`: la tabla nombra el corpus y lo que un lector abre, y cambiar ese criterio son ocho
traducciones que ninguna entrada pide.

**Commit / pull request:** el recurso entró con el pull request **#26**, fusionado en `main` el
2026-10-28 como `abc3349`, y los dos defectos del reporte del verificador con el **#27**,
`dab37f7`. Esta documentación de cierre y el resumen recontado van en su propio pedido de fusión,
que es lo único que este cierre agrega.

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

## PND-061 — La cifra de cumplimiento y la exclusión de lo humano no pueden ser las dos literales *(lo trajo una verificación del consumidor; el dueño la decide)*

- **Nodo:** `datos/compuertas` [nodo propuesto]
- **Grupo:** G-API · **Severidad:** avisa · **Quién decide:** el dueño, porque cualquiera de las tres lecturas cambia un número que el método publica
- **Repositorio:** método · **Estado: abierto** desde el 2026-10-29.

**Qué está mal.** El tablero del Anexo H publica dos cifras, y la primera es
`compliance = rules_passing / rules_active`. Al lado, la lista de lo que queda **fuera** del
porcentaje: `["UX-06", "UX-07", "UX-27", "every manual case"]`. Tres identificadores y **una
frase** — y la frase es la que decide el número. Una herramienta que lee el dato tiene que elegir
qué significa «every manual case», y las tres lecturas razonables dan tres cifras distintas para el
mismo proyecto, todas defendibles contra el mismo archivo publicado.

**Mi reproducción (2026-10-29), sobre un proyecto `react-vite` sin usuarios reales — 45 reglas
activas de las 46, porque CQ-09 sólo corre donde hay usuarios.**

```
$ node -e "contar las tres lecturas de 'every manual case' sobre gates/heuristics.json"
instrumento manual_case, solo              17 reglas   CQ-12 CQ-14 UX-05 UX-06 UX-07 UX-13 UX-14
                                                       UX-17 UX-18 UX-19 UX-20 UX-21 UX-22 UX-23
                                                       UX-24 UX-27 UX-28
instrumento manual_case, entre otros       20 reglas   (las 17 + UX-01, UX-15, UX-25)
las tres nombradas por su id                3 reglas   UX-06 UX-07 UX-27  <- las tres son
                                                       exclusivamente manual_case

lectura                                   fuera   maximo alcanzable
solo las tres nombradas                       3        42/45 = 93.3 %
las exclusivamente manuales                  17        28/45 = 62.2 %
toda regla que toque un caso manual          20        25/45 = 55.6 %
```

Y tres reglas quedan indecidibles en cualquier lectura intermedia, porque su instrumento es
**mixto**: UX-01 (`manual_case` + `matrix_query`), UX-15 (`e2e_per_profile` + `manual_case`) y
UX-25 (`auto_gate` + `manual_case`). Mitad adentro, mitad afuera, y el dato no dice de qué lado
caen.

**La segunda mitad, que es la que obliga a decidir y no sólo a aclarar.** El dato tampoco dice si
una regla que **juzga una persona** puede entrar en `rules_passing`. De eso dependen dos mundos
distintos:

- Si **puede** —un dueño mira el caso manual y la da por buena—, entonces excluir del divisor a
  UX-06, UX-07 y UX-27 necesita una razón escrita, porque las otras catorce exclusivamente
  manuales no se excluyen y se juzgan igual.
- Si **no puede**, entonces las diecisiete están en el divisor y no pueden estar nunca en el
  dividendo, así que la cifra queda clavada abajo del 100 % para siempre **y agregar un caso manual
  la baja** — con lo cual el trinquete, que el mismo bloque le pone encima, le pide al dueño una
  decisión registrada por una caída que causó haciendo exactamente lo que el método le pide. Un
  trinquete que castiga cumplir es un trinquete que se apaga.

Esto último se dice como lo que es: el 2026-10-28, al reportarlo por primera vez, se afirmó
directamente que la cifra queda clavada. **Era la segunda rama y se contó como la única**, sin
haber verificado que el dato prohíba lo primero. No lo prohíbe: no dice nada. Es la forma chica de
D-064 y queda escrita acá en vez de corregida en silencio.

**Lo que mide el consumidor hoy, y lo dice.** La herramienta que implementa el anexo divide por las
reglas que están **dentro** del porcentaje y declara la divergencia con el dato. Es la única de las
tres lecturas que no hace absurdo al trinquete, y está bien elegida; lo que no puede hacer una
herramienta es decidir por el método.

**Criterio de aceptación por perfil.**

- *P1, P2 (herramientas consumidoras):* dada una herramienta que sólo tiene la interfaz publicada,
  esa herramienta calcula la cifra de cumplimiento **sin elegir entre tres lecturas**: la exclusión
  se resuelve desde el dato, por lista de identificadores o por un predicado sobre un campo
  publicado, y las tres reglas de instrumento mixto tienen su lado dicho.
- *P5 (auditor):* dado el perfil auditor, esta persona recalcula la cifra de un proyecto y le da
  **el mismo número** que la herramienta, sin preguntarle a nadie qué quiso decir la frase.
- *P8 (dueño de proyecto):* dada esa persona, agregar un caso manual nunca le baja la cifra ni le
  pide una decisión registrada por haber hecho lo que el método pide.

**Lo que hay que decidir, y por eso el pendiente vuelve al dueño.** Cuál de las tres lecturas es la
del método —y, con ella, si una regla juzgada por una persona cuenta como aprobada—. Las tres son
aditivas: por D-068 ningún proyecto que ya fijó una versión se mueve hasta que su dueño lo decida,
así que escribirla no reabre ningún peldaño cerrado.

---

## PND-062 — La escalada de CQ-18 no tenía identificador de umbral, así que su ausencia significaba dos cosas *(lo trajo una verificación del consumidor)*

- **Nodo:** `datos/compuertas` [nodo propuesto]
- **Grupo:** G-API · **Severidad:** avisa · **Quién decide:** nadie: es un defecto medido y su arreglo es mecánico
- **Repositorio:** método · **Estado: CERRADO** el 2026-10-30, por el efecto: producción sirve `2026.10.11` con el identificador del umbral y los tres estados de la escalada escritos. **Decisión:** D-076.

**Qué estaba mal.** CQ-18 (la accesibilidad básica) **avisa** desde el día uno y **escala a
bloquea** cuando el producto tiene usuarios finales fuera de la organización (D-048). La cláusula
decía que la escalada *«requiere una declaración del dueño, por el mismo mecanismo que cualquier
umbral»* — y ese mecanismo es **por identificador de umbral**: un proyecto declara
`thresholds.<id>` y lo que no está declarado se reporta como no declarado, nunca se inventa. **No
existía el identificador.**

**Mi reproducción (2026-10-29).**

```
$ node -e "los ids de umbral que el dato publica"
lines_per_file  lines_per_function  paths_per_function  minimum_coverage  mutation_target
                                                        <- ninguno es esta condicion
```

Así que un dueño que decidía bien —«esta herramienta es para gente de adentro, la escalada no
aplica»— **no tenía dónde escribirlo**. Y lo que eso costaba no es la decisión: es la auditoría de
seis meses después, donde la ausencia de una clave se lee **igual** para una escalada *declinada
con fundamento* y para una escalada *que nadie miró nunca*. Es la forma de D-057 en otra escala: un
estado que no se distingue de no haber medido.

**Y la trampa de al lado, medida porque es el atajo obvio.** `project_config.real_users` significa
otra cosa. Una herramienta interna de recursos humanos puede tener doscientos usuarios reales y
**cero** usuarios fuera de la organización, así que reusar ese campo escalaría la regla a
bloqueante **en silencio** justo en el proyecto donde la escalada no corresponde.

**Lo que se hizo.**

- **Un umbral nuevo**, `end_users_outside_the_organisation`, con `value: null` y
  `declared: false` como cualquier umbral que el método no fija, `declared_by` el dueño, y su
  procedencia (`since_schema: 2`, `since_version: "2026.10.11"`). Es un booleano y no un número,
  porque lo que un umbral declara es **un valor**, y el valor acá es si la condición se cumple.
- **La cláusula lo nombra y declara los tres estados**: `true` escala la regla a bloquea, `false`
  registra la escalada como **declinada**, y sin declaración se reporta como umbral no declarado,
  que es **escalada pendiente** y no escalada declinada.
- **El contrato del anexo lo nombra en los ocho idiomas**, en la sección 7, con los tres estados y
  con el aviso de que `real_users` no sirve para esto.
- **El validador recorre los umbrales buscando procedencia**, así que el próximo umbral no puede
  entrar sin decir en qué versión entró; y **el diferencial de un upgrade lo cuenta**: pasó de
  cuatro entradas a cinco, con la nueva nombrada.
- **La versión sube a `2026.10.11`** con su huella anotada (`c17a09557a5f`). No cambia ningún
  requisito, ningún id se recicla y ninguna severidad se mueve: CQ-18 sigue avisando y sigue
  escalando bajo exactamente la condición que D-048 escribió.

La ortografía del identificador sigue las palabras que la regla ya usaba —*outside the
organisation*— porque los identificadores son append-only y no se renombran.

**Criterio de aceptación por perfil.**

- *P1 (herramienta consumidora):* dada una herramienta que corre la compuerta, esa herramienta
  distingue las tres situaciones de la escalada de CQ-18 leyendo **una** clave del proyecto, y
  reporta «escalada pendiente» cuando nadie declaró nada, en vez de tratarla como declinada.
- *P5 (auditor):* dado el perfil auditor, esta persona puede ver en la configuración de un proyecto
  si la escalada se declinó y quién lo decidió, en vez de deducirlo de una ausencia.
- *P8 (dueño de proyecto):* dada esa persona, su decisión sobre la escalada **tiene dónde
  escribirse**, y declararla no la obliga a tocar `real_users`, que significa otra cosa.

**Cómo se verifica.** `node build/gates_validate.mjs` (24 peldaños, 8 estaciones, 46 reglas, en
verde); `node build/version_fijada.mjs`, que imprime el diferencial `2026.10.1 -> 2026.10.11` con
cinco entradas; `node build/claves_configuracion.mjs`, que exige que el identificador esté nombrado
en los ocho idiomas; `node --test`, con el rojo deliberado que cae si el ejemplo deja de nombrarlo.

**Lo que queda afuera, nombrado.** Que una herramienta **implemente** los tres estados se mide en
su repositorio. Y el método no declara ningún valor por omisión: un proyecto que no declara nada
sigue con la escalada pendiente, que es el estado que faltaba poder decir.

**Cómo se cerró (2026-10-30), por el efecto y no por el commit.** La fusión `9cf19d8` disparó la
publicación. Lo que cierra esto no es que el identificador esté escrito en `gates/`: es que un
consumidor que **sólo tiene la interfaz publicada** pueda leerlo. Bajado del extremo canónico, no
del disco:

```
$ node -e "los ids de umbral que el dato SERVIDO publica, y la clausula de CQ-18"
GET https://yujin.app/urazuke/api/gates.json   HTTP 200, 115272 bytes, version 2026.10.11
lines_per_file 300 | lines_per_function 40 | paths_per_function - | minimum_coverage -
mutation_target - | end_users_outside_the_organisation -   <- declared_by: the owner
CQ-18.escalates_to.declared_by_threshold = "end_users_outside_the_organisation"
  true -> escala a bloquea | false -> escalada DECLINADA | sin declarar -> PENDIENTE
```

Son seis umbrales donde había cinco, y el que entró es el que faltaba. La corrida de publicación lo
dejó anotado con su propia medición: la huella `c17a09557a5f` apareció servida en la **tercera
vuelta** —las dos primeras devolvieron `2026.10.10`, que es la copia vieja del portal, y por eso el
verificador reintenta en vez de declarar rojo—, las tres huellas coincidiendo, el índice citándolas,
cero huérfanas de ochenta y cuatro documentos y la interfaz consumible. Antes de fusionar, la cadena
en verde: 412 pruebas, 0 fallos.

---

## PND-063 — Las claves del archivo de configuración estaban traducidas, y el apagado escrito como el anexo lo enseñaba pasaba la compuerta en verde *(desvío propio, el quinto; lo encontró el dueño al pedir un ejemplo)*

- **Nodo:** `corpus/anexo-h` [nodo propuesto]
- **Grupo:** G-API · **Severidad:** bloquea · **Quién decide:** nadie: es un defecto medido y su arreglo es mecánico
- **Repositorio:** método · **Estado: CERRADO** el 2026-10-30, por el efecto: producción sirve las claves con el nombre que el dato declara, y el apagado escrito como el ejemplo lo enseña ya no pasa en verde. **Decisión:** D-075.

**Qué estaba mal.** El Anexo H, sección 7, muestra el único archivo que un proyecto escribe para la
compuerta: la capa 2 y la capa 3. Esas claves **no son prosa**: son el contrato que una herramienta
escribe y lee, y el propio dato lo dice en `project_config.what` —*«these are the field names a
consumer tool has to write and read. Declared here so no tool has to guess them»*—. El ejemplo las
llevaba **traducidas**, y encima no eran las que el contrato declara.

**Mi reproducción (2026-10-29). Primero el tamaño del desvío:**

```
$ node -e "los caminos de clave del ejemplo de la seccion 7, por idioma"
es en pt fr de it ja zh      24 caminos de clave cada uno
vocabularios distintos        4   es/ja/zh castellano | en/pt/fr ingles | de aleman | it italiano
nombres distintos en total   87   para 24 casilleros
```

Las ocho versiones se mueven siempre juntas (D-013) y aun así el ejemplo había quedado con cuatro
vocabularios: el japonés y el chino no tradujeron las claves y se quedaron con el castellano; el
portugués y el francés tomaron las inglesas; el alemán y el italiano tradujeron a las suyas.

**Y después el daño, que es lo que convierte esto en bloqueante.** El apagado escrito **exactamente
como el ejemplo inglés lo enseñaba** —`exceptions` / `authorised_by` / `review`— dado a la propia
compuerta del método:

```
$ node build/gates_validate.mjs --config <el apagado como lo ensena el ejemplo>
compuertas: validado (24 peldanos, 8 estaciones, 46 reglas) + la configuracion del proyecto
exit=0

$ node build/gates_validate.mjs --config <el mismo apagado, con el nombre del contrato>
[E_APAGADO_SIN_REGISTRO] la regla CQ-17 esta apagada sin authorized_by
[E_APAGADO_SIN_REGISTRO] la regla CQ-17 esta apagada sin review_date
exit=1
```

**Sale en verde con la regla apagada.** La compuerta lee `switched_off` y el ejemplo decía
`exceptions`, así que el registro de cuatro campos que D-046 llama no negociable **no se mira
nunca**. Es daño silencioso —lo que SQ 0.3 prohíbe— causado por la documentación del propio método,
no por un adversario ni por un atajo de nadie: le pasa al lector que **obedece**.

**Lo que se hizo.**

- **Las ocho versiones llevan las mismas claves**, en inglés, en ASCII puro y con el nombre exacto
  que el dato declara. Los **valores** siguen en el idioma del lector, porque los escribe una
  persona: el motivo de un apagado, el nombre de quien lo autoriza.
- **El ejemplo pasó a mostrar las ocho de primer nivel** —las siete que declara
  `project_config.fields` más `measured_by`, que es la capa 2— y no cinco. Faltaban `real_users`,
  `switches` y `tools`: campos que la compuerta lee y que el lector no escribía porque nunca supo
  que existían. Y salió `version`, que no es un nombre que el contrato declare.
- **Una guarda nueva**, `build/claves_configuracion.mjs`, con su paso en el flujo que exige la
  línea medida. Exige las dos direcciones: toda clave del ejemplo es un nombre que el dato declara,
  y todo nombre que el dato declara aparece en el ejemplo. Más los ocho idiomas idénticos y el
  ASCII.
- **Catorce rojos deliberados**, entre ellos los dos defectos originales —la clave traducida y el
  nombre viejo del apagado—, que tienen que volver a caer si alguien los reintroduce. El
  decimocuarto reproduce el daño: exige que con el nombre viejo la compuerta salga **limpia**, que
  es el defecto, y que con el del contrato caigan los dos campos del registro.
- **Y una prueba que ata el documento al programa**: se le da el ejemplo de cada idioma a la
  compuerta y se exige que lo único que salga sean los **dos** umbrales que el anexo declara
  deliberados en cero. Sin ella, los ocho ejemplos podrían quedar idénticos y los ocho equivocados.
- **Las exenciones son un registro con su razón**, no una condición escondida: las nueve claves de
  dentro de `measured_by` (el método no abarca con qué se mide cada regla, y eso lo decidió el
  dueño el 2026-10-29) y el contenido de `tools` (nombres y versiones de herramientas, que el nivel
  de datos no nombra, D-055). Hay un rojo deliberado que cae si alguien agrega una exención sin
  razón.

**Lo que la hace falsable, dicho con el número.** Medida contra el árbol anterior a este cambio:

```
$ node -e "la guarda nueva contra el arbol de 08afa11"
hallazgos: 151
  en: no lleva las mismas claves que es -- tiene thresholds... le falta umbrales...
  es: la clave medido_por no es un nombre que el dato declare
  ...
$ node build/claves_configuracion.mjs          (sobre el arbol corregido)
claves de configuracion: comprobado -- 8 idiomas, 32 claves, 2 exenciones con su razon, 0 hallazgos
```

**Criterio de aceptación por perfil.**

- *P8 (dueño de proyecto que aplica el método):* dada esa persona, el archivo que escribe copiando
  la forma del anexo **es el que la compuerta lee**, en cualquiera de los ocho idiomas: una regla
  apagada se ve como apagada y le exige su registro de cuatro campos.
- *P1 (herramienta consumidora):* dada una herramienta que lee el anexo de cualquier idioma, los
  nombres de campo que encuentra son los mismos y son los que el dato declara, así que no hay dos
  implementaciones que escriban dos archivos incompatibles.
- *P5 (auditor):* dado el perfil auditor, esta persona corre una orden y ve la cuenta de claves
  revisadas, los ocho idiomas y las exenciones con su razón.

**Lo que queda afuera, nombrado.** Con qué se mide cada regla —las nueve claves de `measured_by`—
sigue siendo criterio de quien mide, por decisión del dueño del 2026-10-29, así que el método no
declara esos nombres y la guarda no los exige. Y ninguna prueba verifica que los **valores** del
ejemplo sean los adecuados para un proyecto: son ilustrativos y el anexo lo dice.

**Cómo se cerró (2026-10-30), por el efecto.** Lo que había que medir no es que el ejemplo esté
corregido en disco —eso ya estaba el 29—, sino que las claves que el lector copia del anexo
**servido** sean las que la compuerta lee. Bajado del publicado:

```
$ node -e "los campos de configuracion que el dato SERVIDO declara"
GET https://yujin.app/urazuke/api/gates.json   HTTP 200, version 2026.10.11
frontend | real_users | switches | switched_off | thresholds | tools | communication_depth
switch_off_record = ["rule","reason","authorized_by","review_date"]
project_config.enums = ["communication_depth"]
```

Son las que el contrato declara, con el nombre exacto, en una sola ortografía y las mismas en los
ocho idiomas. El apagado escrito **como el anexo lo enseña** ahora dice `switched_off`, así que el
validador mira el registro de cuatro campos en vez de pasar de largo: **el verde falso ya no se
puede escribir copiando el ejemplo**, que es la única forma de cierre que este pendiente admitía.
La guarda corre en la cadena y dejó su línea medida —`claves de configuración: comprobado -- 8
idiomas, 32 claves, 2 exenciones con su razón, 0 hallazgos`—, con 151 hallazgos contra el árbol
anterior. Fusión `9cf19d8`; 412 pruebas, 0 fallos.

---

## PND-064 — Una cifra escrita a mano adentro de un artefacto que se genera: el documento decía cuatro y listaba cinco *(desvío propio, el sexto; salió de leer el documento publicado)*

- **Nodo:** `interfaz-publica/api` [nodo propuesto]
- **Grupo:** G-API · **Severidad:** avisa · **Quién decide:** nadie: es un defecto medido y su arreglo es mecánico
- **Repositorio:** método · **Estado: CERRADO** el 2026-10-30, con la cifra derivada del dato y la guarda que lo exige corriendo en la cadena. **Decisión:** D-077.

**Qué estaba mal.** `docs/COMPUERTAS.md` —que se genera de `gates/`, que se publica, y que dice de
sí mismo *«This document is generated. Do not edit it: fix the source»*— llevaba esta oración:

> The four that block with a **human red** -- CQ-12, CQ-14, UX-22, UX-27, UX-28 -- are tested by no
> tool at all.

**Cuatro, y después cinco identificadores.** La lista sale del dato (`heuristics.rules` filtrado por
`human_red`) y el número estaba escrito a mano, así que el día que entró UX-28 la lista creció y el
número se quedó donde estaba. Y no era el único error de la frase: de esos cinco, UX-28 **avisa y
no bloquea** —lo dice el propio dato y lo dice la tabla dos líneas más arriba, en la misma página—,
así que la oración también le atribuía una severidad que el método no le dio. Un lector que la
tomara por buena verificaría cuatro reglas con una persona delante y se saltearía la quinta.

**Mi reproducción (2026-10-30).**

```
$ node -e "las reglas con rojo humano, del dato"
human_red: CQ-12:blocks CQ-14:blocks UX-22:blocks UX-27:blocks UX-28:warns   (son 5, bloquean 4)

$ grep -n "four that block" docs/COMPUERTAS.md
746:The four that block with a **human red** -- CQ-12, CQ-14, UX-22, UX-27, UX-28 -- are tested by no
```

La frase era **cierta el día que se escribió**: UX-28 entró el 2026-10-27 con D-070, cuatro días
después. No la rompió nadie; se rompió sola, que es la definición del defecto.

**Por qué es la misma familia que ya está escrita cuatro veces en este repositorio.** Es una
**segunda copia de un hecho**: una que se actualiza sola (la lista, derivada) y otra que no (el
número, escrito). Es lo que D-044 resolvió para el enunciado de las reglas, D-067 para la lista de
idiomas y D-074 para los títulos del método. Lo nuevo acá es **dónde** vivía la copia: no en una
fuente que alguien mantiene, sino adentro del artefacto que el consumidor lee como autoridad.

**Lo que se buscó además, y lo que se encontró.** Enumerando el universo y no desde una búsqueda
que falló (D-064): las nueve fuentes que se mantienen a mano, el documento generado y los cuatro
recursos publicados. Aparecieron tres cifras más de la misma clase, las tres **correctas hoy** y
ninguna vigilada por nada: `'### The five anchors and the two prior inputs'` y
`'### The three artifacts'` en `build/gates_doc.mjs`, y `'Twelve evaluator names'` en el `scope` de
`build/labels_api.mjs` —ésta, además, viaja **adentro de lo que cubre la huella** del recurso, así
que un evaluador nuevo publicaría una medición falsa con cara de medida—. Y dos registros
**fechados** que dicen «forty-five rules» cuando hoy son cuarenta y seis: la entrada de `2026.10.1`
del registro de versiones y `gates/schema.json#history["2"]`. Ésas **no se tocan**: llevan las
palabras de su día (D-053, D-061) y van al registro de exenciones con su razón.

**Lo que se hizo.**

- **Las cuatro cifras se derivan**: `cardinal(n)` vive una sola vez en `build/gates_lib.mjs`,
  deletrea de 0 a 99 y **se niega** arriba de su alcance en vez de improvisar. Las cifras correctas
  salieron byte a byte iguales —que es la prueba de que la derivación no cambia lo publicado—, así
  que **ninguna huella se movió y ninguna versión sube**.
- **La frase ahora dice lo que el dato dice**: cinco de las cuarenta y seis reglas llevan rojo
  humano, cuatro bloquean y una avisa, con los identificadores de cada grupo y la aclaración que el
  defecto enseñó: un rojo humano dice **quién verifica** una regla, no con cuánta fuerza pega.
- **Una guarda nueva**, `build/cifras_derivadas.mjs`, con su paso en la cadena y en
  `build/build.mjs`, que exige la línea medida.
- **El mapa de colecciones no se escribe: se deriva** del dato —toda clave de arreglo a
  profundidad 2 o menos de `gates/*.json`—, así que una colección nueva queda vigilada **el día que
  entra** y no el día que alguien se acuerda de agregarla a una lista. Sin eso, la guarda sería
  otra enumeración a mano, que es la forma exacta del defecto que persigue, y diría «0 hallazgos»
  con razón: el defecto de D-071, repetido en la guarda que lo arregla.
- **Dos comprobaciones y no una**, porque la primera no alcanzaba y eso se midió: la cifra pegada
  al nombre de una colección (`A`) **no ve** la frase original, donde el número está pegado a
  *that*. La que la ve es `A2`: **un número al lado de una enumeración de identificadores es la
  cuenta de esa enumeración**.
- **Doce rojos deliberados**, el primero de los cuales es la frase original reproducida tal como
  estaba commiteada. Tiene que volver a caer si alguien la reintroduce.

**Lo que la hace falsable, dicho con el número.** Medida contra el árbol anterior a este cambio:

```
$ node -e "la guarda nueva contra el arbol de e9ae53b"
arbol e9ae53b: 14 archivos, 22 colecciones, 27 cifras medidas
hallazgos: 1
  docs/COMPUERTAS.md linea 746: dice "four" al lado de una enumeracion de 5 identificadores
  (CQ-12, CQ-14, UX-22, UX-27, UX-28). La lista sale del dato y el numero esta escrito.

$ node build/cifras_derivadas.mjs                   (sobre el arbol corregido)
cifras derivadas: comprobado -- 14 archivos del universo, 22 colecciones derivadas del dato,
29 cifras medidas, 7 exenciones con su razon, 0 hallazgos
```

**Y los falsos positivos, que también se midieron, porque son los que definen la forma de la
guarda.** La primera versión daba cinco, y cada uno enseñó una condición: `"one of steps, stations
or rules"` —el `keyed_by` de `labels.json`, que **enumera** los valores posibles— se leía como «un
peldaño» y reclamaba veinticuatro; `"sixteen hash covers"` se leía como una cuenta de `covers`, que
son seis; los extremos de un rango (`CQ-01 to CQ-18`) se leían como una enumeración de dos; un
`"(step 2)"` coincidía de casualidad con una lista de dos identificadores; y la propia frase
corregida, que lleva **dos** cifras derivadas, se leía con la equivocada. De ahí las tres
exigencias que la guarda escribe en su cabecera: el número va **pegado** al sustantivo, una
enumeración es una **corrida contigua** que un rango corta, y el candidato de `A2` descarta el
número ya explicado por `A` y el calificado por la palabra que lo precede.

**Criterio de aceptación por perfil.**

- *P8 (dueño de proyecto que aplica el método):* dada esa persona, cuando el documento de las
  compuertas le dice cuántas reglas necesitan una persona delante, el número **es** la cantidad de
  reglas que la lista de al lado nombra, y las que bloquean están separadas de las que avisan.
- *P5 (auditor que quiere probar que su copia es la buena):* dado el perfil auditor, esta persona
  corre una orden y ve cuántos archivos se miraron, cuántas colecciones se derivaron del dato,
  cuántas cifras se midieron y cuántas exenciones hay con su razón —y si un archivo del universo no
  se pudo leer, eso es **rojo** y no un verde con menos cuentas.
- *P1 (herramienta consumidora):* dada una herramienta que lee el `scope` de un recurso publicado
  para saber qué quedó afuera, la medición que ese campo declara es la del dato de hoy y no la del
  día en que alguien la escribió, incluso cuando viaja adentro de la huella.

**Lo que queda afuera, nombrado.** Las cifras de la **prosa** del método —el documento principal,
los contratos, los manuales— no las mira esta guarda: son voz del autor, están en castellano y
contar es parte de lo que la prosa hace. Los dos registros fechados tampoco, por decisión escrita y
con su razón en el registro de exenciones. Y no se verifica que una cifra esté **bien derivada** en
el programa que la escribe: se verifica el resultado, que es lo que un consumidor lee.

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
- **Repositorio:** portal · **Estado: CERRADO** el 2026-10-27, cuando el empujón ocurrió y la
  entrada servida pasó a nombrar los diez documentos en los diez idiomas.

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

**Documentación de cierre (2026-10-27).** Cierra por el **efecto en producción** y no por el
commit. El despliegue del portal (`40601065094`) corrió la comprobación nueva dentro de la cadena
y dejó sus recibos: `PASS -- every page is baked, linked, canonical and reciprocal` y
`PRUEBA EN ROJO OK: las 10 mutaciones caen y el verificador nombra el problema` —diez mutaciones,
no nueve: la décima es la de este trinquete, y es su primera corrida real—. Medido contra
producción después:

```
es/ "Diez documentos por idioma" 1 · "Tres documentos por idioma" 0
en/ "Ten documents per language" 1 · de/ "Zehn Dokumente" 1
los diez catalogos servidos == los diez commiteados (normalizados los finales de linea)
```

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
la huella) y PND-018 (las portadas por idioma). **Ya no condiciona PND-011**, que cerró el
2026-10-28 con los ocho idiomas que tienen prosa: el catálogo de textos deriva su lista de
`languages.prose_versions`, así que publica diez el día que este pendiente lleve el corpus a diez,
sin que nadie toque una línea de ese programa. Lo que sí sigue siendo cierto es que **ese** día el
catálogo sube de versión y vuelve a publicar: los diez no son gratis, son de acá.

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
- **Grupo:** G-IDIOMA · **Severidad:** avisa · **Quién decide:** se hace y se reporta, menos el
  hallazgo que toca el castellano, que es del dueño
- **Repositorio:** portal · **Estado: en curso** (las nueve: revisadas el 2026-10-27; cuarenta y
  **cinco** de los cuarenta y seis hallazgos aplicados, publicados y verificados contra producción
  el mismo día; queda **uno**, el compartido por las nueve, y espera al dueño)
- **Decisión del dueño (2026-10-27):** sobre el ablandamiento de `thesis.k2.p`, *"Tu recomendación,
  1"* — la salida (a): el inglés y el alemán se alinean al castellano. Aplicada y servida el mismo
  día. Y, en el mismo mensaje, *"Terminado el tema de las traducciones por ahora. Necesitamos
  avanzar"*: el hallazgo compartido de `material.practica` queda sin decidir y sin tocar.

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
| PND-026 | árabe (ar) | 7 | 7 | 0 propios + el compartido | todo lo propio, servido |
| PND-027 | alemán (de) | 8 | 8 | 0 propios + el compartido | todo lo propio, servido |
| PND-028 | inglés (en) | 1 | 1 | 0 propios + el compartido | su único hallazgo propio, servido |
| PND-029 | francés (fr) | 5 | 5 | 0 propios + el compartido | todo lo propio, servido |
| PND-030 | hindi (hi) | 5 | 5 | 0 propios + el compartido | todo lo propio, servido |
| PND-031 | italiano (it) | 5 | 4 | 0 propios + el compartido | el «(in spagnolo)» es el compartido |
| PND-032 | japonés (ja) | 6 | 6 | 0 propios + el compartido | todo lo propio, servido |
| PND-033 | portugués (pt) | 3 | 3 | 0 propios + el compartido | todo lo propio, servido |
| PND-034 | chino (zh) | 6 | 6 | 0 propios + el compartido | todo lo propio, servido |

La columna «aplicados» cuenta hallazgos, no cadenas: los cuarenta y cinco aplicados son **129
cadenas** (21 el 2026-10-27 a la mañana, 106 a la tarde y 2 a la noche, más tres correcciones de
las propias correcciones). La de «queda» es **uno**: la aclaración «(en español)» de
`material.practica`, que los nueve agregan y el castellano no dice, y lo decide el dueño porque se
resuelve escribiendo castellano. El otro que quedaba —el ablandamiento de `thesis.k2.p`, que el
inglés y el alemán compartían— lo decidió el dueño esa misma noche y ya está servido.

**Y la columna «queda» hay que leerla con una corrección, porque la tabla la decía mal.** El
segundo hallazgo estaba archivado bajo el italiano, que fue donde se vio primero, y eso hacía que
la tabla mostrara seis idiomas con cero pendiente. Medido el 2026-10-27 sobre los diez catálogos:
la aclaración la agregan **los nueve**, cada uno en su idioma (`(Spanish)`, `(auf Spanisch)`,
`(en espagnol)`, `(in spagnolo)`, `(em espanhol)`, `（スペイン語）`, `（西班牙语）`,
`(स्पेनिश में)`, `(بالإسبانية)`). Así que es **un hallazgo compartido por las nueve entradas**,
no uno del italiano, y ninguna de las nueve puede cerrar hasta que esté resuelto: su criterio de
aceptación dice que lo que el lector lee dice lo mismo que la castellana, y eso hoy no se cumple
en ninguno de los nueve. Archivarlo en una sola entrada era cómodo y escondía ocho.

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

**Por qué las nueve siguieron en curso después de ese primer empujón.** Lo que se publicó esa
mañana era la mitad medida. Los hallazgos de juicio de traducción seguían sin tocar, y el criterio
de aceptación es sobre lo que el lector lee: mientras una de las dos formas de una misma palabra
siga en la página, la entrada de ese idioma no cerró. Cerrar por el empujón sería contar como
efecto lo que todavía no está en la página.

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

**Lo que queda: dos hallazgos, medidos cadena por cadena el 2026-10-27, y los dos tocan el
castellano.** Van con su enunciado completo porque son lo único que impide cerrar las nueve, y van
con una **corrección de cómo los había clasificado este registro**: decía que los dos se resuelven
«escribiendo castellano», y para el primero eso es falso por la propia regla del proyecto.

*(1) El ablandamiento de `thesis.k2.p`, en el inglés y el alemán.* Medidas las diez cadenas:

```
es  «Un test que nunca viste fallar NO SABES SI prueba algo.»
en  "A test you never saw fail MAY PROVE NOTHING."
de  "Ein Test, den man nie hat scheitern sehen, BEWEIST VIELLEICHT NICHTS."
fr  it  pt  ja  zh  hi  ar  -> los siete dicen lo que dice el castellano
```

Son dos afirmaciones distintas. La castellana es sobre **lo que uno puede saber**: no viste el
rojo, entonces no sabés. La inglesa y la alemana son sobre el test: *quizás* no prueba nada, que
deja abierta la lectura «y quizás sí», que es exactamente el consuelo que el peldaño 8 le saca al
lector. Siete de nueve traducciones no se ablandaron, así que la divergencia no es del idioma.

Y acá está la corrección: por D-013 **el castellano es la fuente de verdad y, si divergen,
prevalece**. Entonces la dirección del arreglo no la elige nadie: si la afirmación castellana se
mantiene, lo que se cambia son dos cadenas, la inglesa y la alemana. Lo único que el dueño decide
es si la afirmación castellana es la que el método quiere hacer. Las dos salidas, con su costo:
**(a)** alinear el inglés y el alemán al castellano —dos cadenas, el método dice que no sabés—; o
**(b)** adoptar la forma ablandada como la buena y bajarla al castellano y a las siete fieles
—ocho cadenas, y el método dice *quizás*—. La recomendación fue la **(a)**: la frase vive en la
tarjeta que presenta la disciplina del rojo, y «quizás no prueba nada» es la frase que el método
existe para no dejar decir.

**RESUELTO Y SERVIDO el 2026-10-27 a la noche, con la salida (a).** El dueño eligió la (a) y las
dos cadenas quedaron así:

```
en  A test you never saw fail -- you do not know whether it proves anything.
de  Ein Test, den man nie hat scheitern sehen: man weiß nicht, ob er irgendetwas beweist.
```

**El alemán entró con eszett y la redacción propuesta decía doble s**, y la diferencia se midió
antes de escribir la cadena en vez de arrastrar la propuesta: el catálogo alemán usa `ß` en diez
cadenas (`schließt`, `verhältnismäßiger`, `außerhalb`, `Maßstäbe`, `Größe`), o sea ortografía
alemana corriente y no la variante suiza, así que `weiss` habría sido la única excepción del
archivo. Es la misma clase de corrección que las cuatro de las propias listas de más arriba: la
propuesta de un revisor no es la cadena que se publica hasta que se mide contra el archivo que la
va a llevar.

El commit del portal es `2d74175`, rebasado a `6704325` sobre la publicación automática del método
que había entrado en el medio —otra vez, y por la misma razón: un identificador de algo sin empujar
no es firme—. El despliegue cerró en verde en la corrida `40603256711`, con los cuatro recibos que
su paso exige a la vista (`10/10 pages on disk`, `PASS -- every page is baked, linked, canonical
and reciprocal`, `PRUEBA EN ROJO OK: las 10 mutaciones caen`, `arbol propio: comprobado`,
`eol: comprobado`). Medido contra **producción** después y no antes, con la forma nueva contra la
que se descartó:

```
en  HTTP 200   70851 bytes  |  "you do not know whether it proves anything" 1  |  "may prove nothing" 0
de  HTTP 200   73302 bytes  |  "man weiß nicht, ob er irgendetwas beweist"  1  |  "beweist vielleicht nichts" 0
es  HTTP 200   71248 bytes  |  "no sabés si prueba algo" 1                      |  "quizás" 0
```

Y el diff, para que se vea el alcance: **cuatro archivos, una línea cada uno** —los dos catálogos y
los dos horneados—, los otros ocho idiomas sin tocar. Con esto `PND-028` se queda sin hallazgos
propios y `PND-027` tampoco: las nueve quedan con **el compartido y nada más**.

*(2) La aclaración de `material.practica`, que los nueve agregan y el castellano no dice.* Los dos
manuales de práctica están **sólo en castellano** —`docs/practica/` queda explícitamente fuera del
corpus traducido—, así que las nueve aclaraciones son **verdaderas y útiles**: le avisan al lector
que el enlace que está por abrir no está en su idioma. Lo que falta es del lado del castellano, y
no es una redundancia: es una **incoherencia interna de la portada castellana**, medida en la
clave de al lado. `material.toolsdocs`, un párrafo más abajo en la misma sección, sí declara el
idioma de los documentos que quedan fuera del corpus: «Dos documentos más, fuera del corpus
traducido: las compuertas explicadas, **en inglés** […]; y las evaluaciones de modelos de IA sobre
el método, **en castellano**». O sea que la página ya fijó la convención un párrafo antes y
`material.practica` es la única entrada fuera del corpus que no la cumple. Las nueve traducciones
encontraron el hueco cada una por su cuenta.

Las tres salidas: **(a)** agregarlo al castellano con la forma de `material.toolsdocs` y pasar los
nueve de la acotación entre paréntesis a la frase completa —diez cadenas, y la página queda con una
sola convención—; **(b)** sacar la aclaración de los nueve —nueve cadenas, y un lector árabe abre
un manual en castellano sin aviso—; **(c)** dejar la asimetría. La recomendación es la **(a)**, y la
redacción propuesta para el castellano es: «Con la evidencia recolectada en cada peldaño. Los dos
están **fuera del corpus traducido**: van sólo en castellano.» Para los nueve, la misma frase en su
idioma en lugar del paréntesis, que dice *por qué* y no sólo *en qué idioma*.

**Y la tarde del 2026-10-27 se publicó también el vocabulario único, así que las 106 cadenas ya
son lo que el lector lee.** El dueño autorizó el empujón de los dos commits juntos —el de los dos
defectos del castellano y el del vocabulario—, en ese orden, para que cada uno dejara el árbol
desplegable por su cuenta. El commit del vocabulario es `94d3656` y el despliegue cerró en verde en
la corrida `40601065094`, con los cuatro recibos que su paso exige:

```
Urazuke per-language homes: 10/10 pages on disk (ar, de, en, es, fr, hi, it, ja, pt, zh)
PASS -- every page is baked, linked, canonical and reciprocal.
PRUEBA EN ROJO OK: las 10 mutaciones caen y el verificador nombra el problema.
arbol propio: comprobado -- la prueba en rojo mutila el arbol donde vive ...
eol: comprobado -- el mapa del sitio regenerado es el mismo archivo con CRLF y con LF ...
```

Medido contra **producción** después y no antes, con las formas que el desempate del corpus eligió
contra las que descartó, que es la comprobación que importa porque es donde el criterio se podría
haber aplicado al revés:

```
los diez catalogos servidos == los diez commiteados: 10/10 (normalizados los finales de linea)
de/  Tor 9 : Gate 0     Sperre 4 : Schloss 0     Kette 8 : Pipeline 1
fr/  verrou 3 : cadenas 0
it/  cancello 4 : porta 2
pt/  pendencia 25 : pendente 0
ja/  保留項目 20 : 保留事項 0     振り返り 6 : レトロスペクティブ 0
zh/  待办项 22 : 待办事项 0      复盘 6 : 回顾 0
```

Las dos cuentas que no son cero están explicadas y son las dos excepciones ya declaradas arriba, no
residuos: el `Pipeline` alemán vive en `thesis.body`, donde el castellano dice «pipelines» y la
forma alemana es fiel; y los dos `porta` italianos son el verbo *lleva*. Están salteados con su
razón escrita en la verificación, y se vuelven a medir acá para que el cero de las otras diez
cuentas signifique algo.

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

**Por qué quedan en curso y no cerradas, al 2026-10-27 con todo lo aplicado ya servido.** El
criterio de aceptación es sobre **lo que el lector lee en la portada**, no sobre la existencia de
la lista ni sobre que el empujón haya ocurrido. Los cuarenta y cuatro hallazgos aplicados están
servidos y medidos contra producción, y eso cierra la parte que se podía cerrar sin el dueño. Lo
que queda abierto es **un hallazgo compartido por las nueve**: la aclaración de `material.practica`,
que los nueve agregan y la fuente de verdad no dice. El otro que quedaba —el ablandamiento de
`thesis.k2.p` en el inglés y el alemán— se resolvió y se sirvió la noche del 2026-10-27, así que
ninguna de las nueve tiene hallazgos propios abiertos. Mientras el compartido no se resuelva, lo
que el lector lee en cualquiera de los nueve sigue diciendo algo que la castellana no dice, y por
eso ninguna de las nueve cierra. Cerrar seis de ellas por tener cero hallazgos propios habría sido
leer la tabla y no el criterio; cerrar las nueve ahora, por el mismo motivo, sería leer la tabla de
nuevo. **Y el dueño pidió terminar el tema de las traducciones por ahora**, así que el compartido
queda escrito, medido y sin tocar: a una decisión de distancia y sin trabajo pendiente detrás.

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
- **Repositorio:** portal · **Estado: CERRADO** el 2026-10-27, cuando el empujón ocurrió y
  producción sirvió el 23 en los diez idiomas.

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

**Documentación de cierre (2026-10-27).** El dueño autorizó el empujón y cerró por el **efecto en
producción**, que es la regla de D-057: un arreglo en una máquina no es un efecto. El commit
`a5012b9` entró a `main` del portal y el despliegue cerró en verde en la corrida `40601065094`,
con los cuatro recibos que su paso exige a la vista. Medido contra producción después y no antes,
con la aguja de cada idioma y no con una sola:

```
es/ "peldaño 23" 1 · "peldaño 15" 0 · "Es el 23" 1 · "Es el 15" 0
en/ "step 23" 2 · "step 15" 0        de/ "Stufe 23" 1 · "Stufe 15" 0
fr/ "marche 23" 1 · "marche 15" 0    it/ "gradino 23" 1 · "gradino 15" 0 · "È il 23" 1
pt/ "degrau 23" 1 · "degrau 15" 0    ja/ "第23段" 3 · "第15段" 0
zh/ "第 23 级" 3 · "第 15 级" 0        hi/ "सीढ़ी 23" 1 · "सीढ़ी 15" 0
ar/ "الدرجة 23" 3 · "الدرجة 15" 0
los diez catalogos servidos == los diez commiteados (normalizados los finales de linea)
```

Lo que **no** se hizo, y queda escrito como propuesta y no como compromiso: la comprobación que
exija que todo «peldaño N» de la portada exista y que el N de la retrospectiva sea el del título
que la contiene. Vive en el repositorio del portal, agranda su cadena y la decide el dueño. Hoy la
única defensa contra que vuelva a derivar es que alguien lo lea.

**Depende de:** nada.

---

# Abiertos — las quince mejoras que trajo el experimento de medición del método

**De dónde salen, y en qué orden conviene leerlas.** Entre el 31 de octubre y el 1 de noviembre
de 2026 corrí un experimento que midió el método usándolo en serio: tres brazos construyendo el
mismo sistema, uno de ellos recorriendo la escalera completa en conversación dirigida, veinte idas
y vueltas, veinte horas de reloj y setecientos setenta y cinco millones de tokens. De ahí salieron
**treinta y tres hallazgos** —recontados con un programa, porque la cuenta a mano decía treinta y
uno—; las de la herramienta ya están arregladas del otro lado y **quince son del método**. Son
éstas.

**Y la quince llegó tarde, lo que es la mejor evidencia del lote.** El prompt que trajo este
trabajo decía "catorce" y la lista tenía quince: `M+04` —*una cifra que depende del repositorio nace
envejecida*— se había perdido en una cuenta hecha a mano, que es exactamente lo que `M+04` dice que
pasa. Aparece acá como `PND-074`, y el rastro de cómo se perdió queda escrito en vez de borrado.

Una aclaración que vale para las quince, y es la misma que abre `docs/REFERENCIAS.md`: ninguna de
estas reglas nació del incidente que la hizo visible. Todas son ingeniería de sistemas de siempre
—no le creas a un instrumento que no verificaste, no confundas la ausencia de hallazgos con la
ausencia de problemas, no aceptes un riesgo sin el aviso que te diga cuándo ocurrió—, y lo que el
experimento aportó fue **dónde los modelos las aplican de manera frágil** y, en seis casos, que ni
siquiera un agente que cumple la consigna al pie de la letra las aplica solo. El incidente es la
prueba de que hace falta decirlo explícito, no el origen de la regla. Si alguna de estas entradas
termina redactada como "esto salió de que algo se rompió", está mal redactada.

**Lo que estas quince entradas NO son.** No son ediciones del corpus. Una regla nueva del método
es una obligación que les voy a imponer a todos los proyectos que vengan, y eso lo decide el dueño,
una por una, con el texto delante. Lo que cada entrada tiene abajo es la especificación, la
ubicación propuesta, la evidencia y el criterio de aceptación; el borrador de la regla se escribe
aparte, en un documento de trabajo, y **nada entra al corpus sin aprobación**. Por eso las quince
dicen `Quién decide: el dueño` y ninguna dice que el trabajo se hace y se reporta.

**El universo de las mediciones propias, enumerado una vez (D-064).** Las quince reproducciones de
abajo corren sobre los **36 archivos fuente del corpus castellano**: los diez documentos en
castellano que `build/build.mjs` publica por idioma (`ESCALERA_METODOLOGICA`, `REFERENCIAS`,
`EVOLUTIVO_CORRECTIVO`, `MANUAL_CURSO`, `MANUAL_CURSO_EVOLUTIVO`, `CAPACITACION_JUNIOR`,
`TRABAJO_COLABORATIVO`, `EVALUACIONES_DE_IA`, `ANEXO_HEURISTICAS`, `PREGUNTAS_AL_PROVEEDOR`), los
veinticuatro contratos de peldaño con el `README.md` de su carpeta, y el `README.md` de la raíz.
Queda **afuera**, con su razón: `docs/COMPUERTAS.md`, que se genera, es nivel de datos y está en
inglés (D-051); las siete traducciones, que son una copia de lo que la construcción publica y se
mueven en el mismo commit que el castellano (D-013); y los documentos que no son corpus —este
registro, el de decisiones, el plan del curso—. La enumeración es completa porque es la misma que
la construcción recorre para publicar, más los dos README que ninguna otra lista nombra. Cuando una
entrada dice "cero menciones en el corpus", es cero en esos 36 archivos, y el comando está al lado.

**La severidad de cada entrada es mi lectura, y conviene auditarla acá en vez de quince veces.**
El criterio que usé: *bloquea* cuando la ausencia de la regla permite que algo cierre en verde sin
haber probado nada, o produce daño silencioso —que es lo que este proyecto prohíbe desde su primera
regla de calidad—; *avisa* cuando el costo es real y queda visible, como un renombre de ochenta y
cuatro citas o un verde que la cadena rechaza después. Con ese criterio salieron **siete que
bloquean** (`PND-065`, `PND-067`, `PND-069`, `PND-073`, `PND-074`, `PND-077` y `PND-079`) y **ocho
que avisan**. Ninguna quedó en *registra*: las quince cambian lo que un peldaño exige, y eso no es
una anotación. Si alguna severidad está mal, cambiarla es una línea y la cuenta del resumen se
rehace sola.

**Por qué las quince van a G-METODO, y la alternativa que queda abierta.** El grupo de
convergencia se elige por lo que la persona vino a hacer, y lo que estas quince tocan es **el
contenido del método**: si lo que el lector recibe está completo y se puede aplicar. Es el mismo
grupo que abrieron `PND-039` a `PND-048`, que también las trajo alguien que aplicó el método a
fondo. La alternativa que consideré y no tomé por mi cuenta es abrir un **octavo grupo** para las
seis de la familia del cero —lo que esa persona vino a hacer sería *poder creerle a un verde*, que
no es lo mismo que aplicar el método completo—. No se hizo porque abrir un grupo toca tres lugares a
la vez (la tabla de grupos de arriba, la constante de `tests/pending_resumen.test.mjs` y la tabla
del resumen) y porque es una decisión del dueño, no una comodidad de redacción. Queda planteada en
la entrada de la familia.

---

## PND-065 — Una medición que puede informar cero no distingue los dos ceros, y la parcial se lee igual que la salud *(del experimento; `M+07`, cabeza de la familia)*

- **Nodo:** `corpus/contratos` [nodo propuesto]
- **Origen:** el experimento de medición del método, hallazgo `M+07` con su ampliación del turno 20.
  No es de la auditoría externa ni de una medición de la publicación.
- **Grupo:** G-METODO · **Severidad:** bloquea · **Repositorio:** método
- **Quién decide:** **el dueño**. Es una regla nueva y, además, la que decide cómo se redactan las
  otras cinco de su familia: hay que resolver primero si es **una regla con seis caras** o **seis
  reglas hermanas**. La recomendación, con su motivo, está al final de la entrada.
- **Estado: abierto, escrito y verde en la cadena** — el dueño resolvió la forma el 2026-11-01
  (D-078): **una regla con cuatro caras**, `CQ-19` «Recibo del instrumento», casa en el peldaño 9
  (`Ancla 3`), y esta entrada es su **primera cara**, `CQ-19.1` «El denominador». Escrita en el
  dato (`gates/heuristics.json`, publicado en `2026.10.12`), en el Anexo H de los ocho idiomas, en
  el catálogo de textos (`2026.10.2`) y en la pregunta de verificación del contrato del peldaño 9.
  Cadena local en verde: 458 pruebas, cero fallos. **Cierra cuando la fusión a `main` la deje
  servida en producción**, que es el criterio de D-057: un arreglo en la máquina no es un efecto.

**Qué falta, completo.** El método exige medir antes de construir y exige que el instrumento se
verifique: el peldaño 7 lo lleva en el título. Lo que **no** exige es que el instrumento declare
qué informa cuando **no pudo mirar**. Y ésa es la única pregunta que separa un número bueno de un
número tranquilizador, porque los dos se leen igual: un cero que significa "no hay nada" y un cero
que significa "no miré" son el mismo carácter en la misma pantalla. La regla que falta tiene dos
mitades, y la segunda es la que muerde.

1. **El cero.** Toda medición que pueda informar cero tiene que poder distinguir *cero porque no
   hay* de *cero porque no pude mirar*, y si no puede distinguirlos **falla cerrado**: informa que
   no midió, no informa cero.
2. **La cuenta parcial, que es la mitad nueva.** No alcanza con preguntar por cero. Una medición
   que recorre un conjunto declara **cuántos elementos esperaba recorrer** y falla si recorrió
   menos, no sólo si recorrió ninguno. La frase que lo cierra es del brazo: *no es "cero porque no
   miré", es "menos porque no miré todo", y se lee igual que salud*. Y la versión general, que es
   la que vale para los otros proyectos: **una guarda que sólo cubre el caso extremo deja pasar
   todo el rango**. El cero es el caso visible; la cuenta parcial es el que muerde.

Es el *rojo primero* del peldaño 8 aplicado al **instrumento que mide** en vez de al test que
prueba: igual que un test que nadie vio caer no prueba nada, un medidor que nadie vio informar "no
pude mirar" no mide nada.

**Evidencia medida (el experimento).** El brazo partió su registro de mutaciones para no pasar un
tope de líneas que no quiso subir, y eso dejó a la medición de calidad informando **cero mutantes
declarados, sin un solo error**: un número que debía gritar dijo cero en silencio. No lo encontró
ninguna prueba, ni el analizador estático, ni la revisión del propio texto; lo encontró la compuerta
que no le cree al documento y lo contrasta contra una medición fresca. La ampliación es peor, porque
le pasó **sobre su propia guarda**: la cifra de mutantes contaba **28 de 47**, y lo que falló no fue
el patrón —había una condición escrita a propósito para el caso en que la cifra "cae a 0 en
silencio", o sea exactamente la guarda que esta regla pide— sino que la desincronización real fue
**parcial**, y una guarda que pregunta por cero no ve 28 de 47. Los diecinueve que el instrumento no
vio se leen como si no existieran.

**Mi reproducción (2026-11-01), sobre los 36 archivos del corpus.**

```
grep -niE "cero porque|dos ceros|da cero"   ->  4 menciones
grep -niEc "saturad|saturaci"               ->  0
```

Las cuatro menciones existen y **ninguna es esta regla**. Dos son la misma **señal de alarma para
el dueño** —peldaño 7, sección 5: *"El medidor da cero. Casi nunca es cero; casi siempre el medidor
no está viendo algo"*, repetida en la lección del manual—; una es la explicación de los dos umbrales
en cero del Anexo H, que es otro tema; y la cuarta es el caso de un medidor propio en las
referencias. O sea: el método **ya sospecha del cero**, y lo dice en el único lugar donde no obliga
a nadie —la lista de cosas que el dueño tiene que mirar con desconfianza—. No hay obligación sobre
quien construye, no hay cláusula en ningún prompt, y de la **cuenta parcial** no hay una sola
mención en los 36 archivos. Un dueño que lea la señal de alarma y pregunte "¿por qué da cero?"
recibe una explicación; un dueño frente a un 28 de 47 no tiene ni la señal.

**Criterio de aceptación por perfil.**

- *P8 (dueño de proyecto que aplica el método):* dado el perfil dueño, esta persona puede mirar
  cualquier número que un peldaño le entrega y hacer una sola pregunta —*"¿qué informa este
  instrumento cuando no pudo mirar?"*— y negarse a cerrar el peldaño si la respuesta es "lo mismo
  que la salud"; y cuando el número recorre un conjunto, puede exigir la cuenta de lo que el
  instrumento **esperaba** recorrer al lado de la cuenta de lo que recorrió, sin tener que saber
  cómo está hecho el instrumento.
- *P6 (lector humano que entra por el documento principal):* dado ese perfil, esta persona
  encuentra la regla **por su nombre** desde la ficha del peldaño que la carga, y no tiene que
  deducirla de una señal de alarma escrita para otra cosa.
- *P7 (lector que adapta el método a otro formato):* dado ese perfil, esta persona puede reproducir
  la regla con todas sus caras sin inventar ninguna, porque están enumeradas y cada una dice qué
  instrumento vigila. Es el perfil que ya falló una vez acá, con las veintisiete reglas del Anexo H
  que un lector real omitió porque nunca supo que estaban (`PND-039`).

**Dónde iría.** El peldaño 7 (medir antes de construir, con un instrumento que también se verifica)
es la casa natural, porque la regla es la extensión de su propio título. Con enlaces desde el
peldaño 8 (donde vive el rojo primero, que es la misma idea aplicada al test), el 12 (verificación
honesta) y el 14 (fail-closed). Y **una** línea corta en el contrato de convivencia del peldaño 1,
no cinco: ver el argumento 1 de abajo.

**La recomendación sobre la forma, con el motivo, para que el dueño decida.** Una regla con nombre
y seis caras, no seis reglas hermanas. Cuatro argumentos, tres de ellos medidos:

1. **El contrato de convivencia no aguanta seis reglas más, y lo dice el propio método.** El
   peldaño 1 tiene como señal de alarma: *"El contrato tiene más de veinte reglas. Nadie, ni humano
   ni modelo, respeta veinte reglas; se respetan seis u ocho"*, y hoy exige seis mínimas. Cuatro
   entradas de este lote proponen, cada una por su cuenta, entrar ahí. Serían diez u once reglas, y
   la señal que el método escribió para que nadie infle un contrato la rompería el propio método.
2. **La forma ya existe en el método y es verificable.** `CQ-18` es **un** identificador con cinco
   comprobaciones adentro (contraste, etiquetas, foco, teclado, texto alternativo). Una regla con
   caras no es una regla vaga: es una regla cuyas caras son predicados, cada uno con su verificador.
   Eso evita de paso el defecto que `PND-061` midió —una regla cuyo cumplimiento es parcial y cuyo
   porcentaje admite tres lecturas— porque las caras se cuentan.
3. **Las seis aparecieron por seis caminos distintos y ninguna la vio venir la anterior.** Un
   lector que recibe seis reglas separadas reconoce la que se parece a su caso y no las otras cinco;
   un lector que recibe una regla con nombre se lleva **la pregunta**, que es lo único que
   generaliza al séptimo camino, que nadie midió todavía.
4. **El nivel de datos.** Los identificadores no se reciclan ni cambian de significado nunca. Seis
   identificadores para un principio son seis lugares que hay que mantener sincronizados, que es la
   familia de D-044, D-067, D-074 y D-077: dos copias de un hecho, una que se actualiza sola y otra
   que no.

Lo que la forma de una sola regla **cuesta**, dicho para que la decisión sea con el precio delante:
una cara apagada se ve menos que una regla apagada, así que el registro de excepciones tiene que
poder apagar **una cara** con su motivo, y no sólo la regla entera.

**Lo que esta entrada no incluye.** El borrador del texto —el nombre de la regla, el enunciado, la
cláusula de los prompts y la ficha, si va al Anexo H— se escribe después de que el dueño elija la
forma, porque la forma condiciona cada palabra. El evaluador que lo verifique por máquina es
trabajo de la herramienta.
---

## PND-066 — Un medidor que depende del recurso que mide informa salud cuando el recurso está saturado *(del experimento; `M+08`, segunda cara de la familia)*

- **Nodo:** `corpus/contratos` [nodo propuesto]
- **Origen:** el experimento de medición del método, hallazgo `M+08`. Lo encontró el brazo sobre su
  propio medidor, el mismo día en que escribió la regla de los dos ceros.
- **Grupo:** G-METODO · **Severidad:** avisa · **Repositorio:** método
- **Quién decide:** **el dueño**, y depende de cómo resuelva la forma en `PND-065`: si es una regla
  con caras, ésta es una cara y no una entrada del corpus por su cuenta.
- **Estado: abierto, escrito y verde en la cadena** — entró como la segunda cara de `CQ-19`,
  `CQ-19.2` «La independencia» (D-078), con el enunciado que vive una sola vez en el Anexo H y se
  extrae al publicado. **Cierra con la fusión**, por D-057.
- **Depende de** `PND-065` (la forma).

**Qué falta, completo.** El peldaño 7 ya exige que el medidor tenga su test contra un caso conocido.
Lo que falta es **de qué clase** tiene que ser ese caso cuando el medidor comparte el recurso que
mide: un medidor que usa el mismo reloj, la misma conexión, el mismo bucle o la misma memoria que
está midiendo **se cae junto con lo que mide**, y al caerse informa exactamente lo mismo que la
salud. No informa un error: informa cero, o informa "bien". La regla que falta es que un medidor así
necesita un **control bajo saturación** —un caso que demuestre que el medidor sí detecta la
saturación cuando la saturación está puesta a propósito—, y que si ese control no se puede
construir, el medidor se rehace de manera que no dependa del recurso que mide.

Por qué es una cara propia y no una repetición del cero: en las otras apariciones el instrumento
*mira mal* —un patrón que no encuentra lo que hay, un cero que no distingue dos causas—. Acá el
instrumento está bien escrito y lo que lo rompe es que **comparte el destino de su objeto**. Un
reloj que no tictaquea y un sistema sin atraso se leen igual.

**Evidencia medida (el experimento).** El brazo midió el atraso del bucle de eventos para decidir
si la verificación de contraseña tenía que ser asincrónica. Su primer medidor informó **"0 ms de
atraso" con el proceso congelado 622 ms**: el medidor usaba el reloj del bucle, el bucle estaba
bloqueado y el reloj nunca llegaba a tictaquear. Lo rehízo con el reloj arrancado antes del bloqueo
y con su control, y recién entonces midió **623 ms contra 10 ms**, que son los dos números de los
que salieron dos decisiones de diseño. Sin el control, la decisión se habría tomado sobre un cero.

**Mi reproducción (2026-11-01), sobre los 36 archivos del corpus.**

```
grep -niEc "saturad|saturaci"   ->  0
grep -nic "caso conocido"       ->  15 menciones (5 en el contrato del peldaño 7)
```

Cero menciones de la saturación en todo el corpus. Y las quince del caso conocido dicen otra cosa:
*"un caso conocido donde la respuesta se sabe de antemano"*, que es un caso **en reposo**. El propio
ejemplo que el contrato del peldaño 7 le da al dueño lo muestra: *"con cero turnos tiene que contar
exactamente las dos consultas base"*. Un medidor verificado contra ese caso puede estar
perfectamente verificado y seguir informando salud el día que el recurso se sature, porque nadie le
pidió nunca el caso de arriba.

**Criterio de aceptación por perfil.**

- *P8 (dueño de proyecto que aplica el método):* dado el perfil dueño, esta persona puede
  preguntarle a quien construye una sola cosa sobre cualquier medidor —*"¿qué informa cuando lo que
  mide está saturado, y con qué caso lo probaste?"*— y rechazar el peldaño si la respuesta es que no
  se probó. No necesita entender el medidor para hacer la pregunta.
- *P6 (lector humano que entra por el documento principal):* dado ese perfil, esta persona entiende
  en lenguaje de todos los días por qué un instrumento puede estar bien hecho y mentir igual, con un
  ejemplo que no exige saber qué es un bucle de eventos.

**Dónde iría.** El peldaño 7, pegado a la exigencia del caso conocido, que es donde hoy se lee "que
el medidor tenga sus casos" y hay que leer "y que tenga su control bajo saturación".

**Lo que esta entrada no incluye.** El caso conocido en reposo no se reemplaza: se **agrega** el de
saturación. Y no se pide un control de saturación para todo medidor, sino para el que comparte
recurso con lo que mide; la condición tiene que quedar escrita en el borrador, porque una exigencia
universal acá sería gold plating en un proyecto chico.

---

## PND-067 — Un filtro que no encuentra nada y un sistema sin hallazgos se leen igual *(del experimento; `M+09`, tercera cara de la familia)*

- **Nodo:** `corpus/contratos` [nodo propuesto]
- **Origen:** el experimento de medición del método, hallazgo `M+09`. Le pasó al brazo sobre sí
  mismo, en el turno 18.
- **Grupo:** G-METODO · **Severidad:** bloquea · **Repositorio:** método
- **Quién decide:** **el dueño**, y depende de cómo resuelva la forma en `PND-065`.
- **Estado: abierto, escrito y verde en la cadena** — entró como la tercera cara de `CQ-19`,
  `CQ-19.3` «El universo, en las dos direcciones» (D-078). La séptima vía que el experimento trajo
  al final —un filtro que devolvió **de más**— entró acá, como la segunda dirección de esta cara, y
  por eso **no se abrió el octavo grupo de convergencia**: el disparador quedó evaluado y no
  disparado, con su razón. **Cierra con la fusión**, por D-057.
- **Depende de** `PND-065` (la forma).

**Qué falta, completo.** Entre una compuerta y la decisión que se toma con su resultado casi siempre
hay un **filtro**: una búsqueda sobre la salida, un recuento de líneas, un patrón que pesca la
palabra que importa. El método exige el recibo de la compuerta y no dice nada del filtro, y el
filtro es el lugar más barato donde se pierde un rojo: cuando no encuentra nada devuelve lo mismo
que devolvería si el sistema estuviera impecable. La regla que falta: **ningún filtro sobre la
salida de una compuerta se usa para decidir sin haber verificado antes que el filtro encuentra algo
cuando hay algo**. Es el rojo primero aplicado al filtro, y no al test ni al medidor. Y la
consecuencia práctica, que es la que un dueño puede exigir sin leer código: lo que se mira es **la
línea medida que el programa imprime**, no su código de salida ni el resultado de un patrón sobre
su salida.

La frase del brazo, que es la versión más corta y más útil de toda la familia: *un filtro que no
encuentra nada y un sistema sin hallazgos se leen igual*.

**Evidencia medida (el experimento).** El brazo leyó la salida de una compuerta con una búsqueda
que pedía `hallazgos`, cuando el mensaje del programa dice `hallazgo(s)`. **La compuerta estaba en
rojo y su filtro le mostró verde durante tres pasos.** No lo encontró revisando el filtro: lo
encontró cuando la cadena lo frenó.

**Mi reproducción (2026-11-01), sobre los 36 archivos del corpus.**

```
grep -niE "\bfiltros?\b"   ->  2 menciones, ninguna sobre leer la salida de una compuerta
```

Las dos son de otra cosa: una enseña a leer una consulta de base de datos en el documento de
capacitación, y la otra es el filtro de datos como consumidor de la matriz de perfiles en el Anexo
H. O sea: el corpus nombra la palabra dos veces y nunca para esto. Lo más cercano que el método ya
tiene es la exigencia del peldaño 8 de que el recibo del rojo traiga el comando, la cantidad de
fallos y el código de salida **pegados tal cual**, que es la misma intuición y no cubre el caso: el
recibo se exige del test, no del filtro con el que alguien leyó la compuerta. Y este proyecto ya
pagó cuatro veces la versión grande de este defecto —las cuatro guardas dormidas de `PND-001`,
`PND-035`, `PND-037` y `PND-038`—, cuyas cuatro lecciones terminan en la misma frase: lo que las
descubrió fue exigirle a cada guarda **la salida medida** en vez de su código de salida. Eso está
escrito en este registro y en las instrucciones del repositorio; **no está en el corpus**, que es lo
que un lector recibe.

**Criterio de aceptación por perfil.**

- *P8 (dueño de proyecto que aplica el método):* dado el perfil dueño, esta persona puede pedir, de
  cualquier verde que se le reporte, la línea que el programa imprimió, y sabe que un paso que no
  imprimió nada no corrió. Es una exigencia que se hace sin leer código y sin entender el filtro.
- *P7 (lector que adapta el método a otro formato):* dado ese perfil, esta persona puede llevarse la
  regla en una sola frase, que es la forma en la que esta cara es más fuerte que las otras cinco.

**Dónde iría.** El contrato de convivencia del peldaño 1 es el lugar que le daría más alcance, por
su brevedad, pero ahí entra **una** línea de la familia y no cuatro (ver `PND-065`). Si la forma
elegida es la regla con caras, el enunciado largo vive en el peldaño 7 y lo que va al peldaño 1 es
la frase corta.

**Lo que esta entrada no incluye.** No propone prohibir los filtros: propone verificarlos. Un
proyecto que lee compuertas a mano no tiene que construir nada.

---

## PND-068 — Dos instrumentos que miden lo mismo con distinto rigor, y el laxo es el que uno mira primero *(del experimento; `M+11`, cuarta cara de la familia)*

- **Nodo:** `corpus/contratos` [nodo propuesto]
- **Origen:** el experimento de medición del método, hallazgo `M+11`, turno 19 del brazo.
- **Grupo:** G-METODO · **Severidad:** avisa · **Repositorio:** método
- **Quién decide:** **el dueño**, y depende de cómo resuelva la forma en `PND-065`.
- **Estado: abierto, escrito y verde en la cadena** — entró como la cuarta cara de `CQ-19`,
  `CQ-19.4` «El hermano laxo» (D-078). **Cierra con la fusión**, por D-057.
- **Depende de** `PND-065` (la forma).

**Qué falta, completo.** Un proyecto con integración continua tiene casi siempre **dos** copias de
cada control: la que corre en la máquina de quien construye y la que corre en la cadena. El método
exige la cadena y exige que el control exista, y no dice en ninguna parte qué pasa cuando las dos
copias **miden distinto**. La regla que falta: cuando un control tiene contraparte en la cadena, **o
son el mismo instrumento con la misma configuración, o la diferencia está declarada** —qué mide cada
uno, cuál manda, y qué puede pasar uno y fallar el otro—. Un control local más permisivo que el que
decide no es una comodidad: es un verde que miente, y miente justo en el momento en que quien
construye baja la guardia.

Por qué es una cara propia: en las otras tres el instrumento informa mal. Acá los dos instrumentos
informan **bien** —cada uno dice la verdad sobre lo que mide— y el defecto es que **miden distinto y
nadie lo declaró**, y el que se consulta primero es el más laxo.

**Evidencia medida (el experimento).** El brazo tituló su propio commit con el hallazgo: *"los casos
de C-25 pasaban el lint local y no el de la cadena"*. Tenía un verde que no era el verde que manda:
miraba su analizador local, se quedaba tranquilo, y el que decide lo rechazaba después. Lo encontró
porque la cadena lo frenó, **no porque lo buscara**.

**Mi reproducción (2026-11-01), sobre los 36 archivos del corpus.**

```
grep -niE "más permisivo|mas permisivo|el verde que vale"   ->  0
grep -niE "misma configuración|en tu máquina" (peldaño 15)  ->  0
```

Cero menciones. El contrato del peldaño 15 exige que la cadena exista y que corra en cada cambio, y
no dice nada sobre la relación entre lo que corre en la cadena y lo que corre en la máquina. Es un
hueco de una línea, y es el hueco por el que entró un rechazo entero de la cadena después de tres
pasos tranquilos.

**Criterio de aceptación por perfil.**

- *P8 (dueño de proyecto que aplica el método):* dado el perfil dueño, esta persona sabe que el
  verde que vale es el de la cadena, y puede exigir, para cada control que corre en los dos lados,
  o la misma configuración o la diferencia escrita en una línea.
- *P6 (lector humano que entra por el documento principal):* dado ese perfil, esta persona entiende
  por qué dos controles que dicen la verdad pueden dejar pasar un error entre los dos.

**Dónde iría.** El peldaño 15 (integración continua, entornos, secretos y despliegue), y en el
contrato de convivencia como frase corta si el dueño elige llevar una sola línea de la familia allá:
*el verde que vale es el de la cadena; si el local dice algo distinto, la diferencia se declara o se
elimina*.

**Lo que esta entrada no incluye.** No pide unificar los dos controles por decreto: unificar es una
de las dos salidas y declarar la diferencia es la otra, porque hay controles que a propósito corren
más rápido y más flojo en la máquina para no esperar.
---

## PND-069 — Una sonda que sólo es inofensiva cuando falla es una trampa *(del experimento; `M+12`, quinta cara de la familia)*

- **Nodo:** `corpus/contratos` [nodo propuesto]
- **Origen:** el experimento de medición del método, hallazgo `M+12`. Lo encontró el brazo
  haciéndose el daño que estaba tratando de demostrar, y cumpliendo mi instrucción al pie de la
  letra.
- **Grupo:** G-METODO · **Severidad:** bloquea · **Repositorio:** método
- **Quién decide:** **el dueño**, y depende de cómo resuelva la forma en `PND-065`.
- **Estado: abierto, escrito y verde en la cadena** — **no** quedó como cara de `CQ-19`: el dueño
  aplicó su propio criterio en su contra el 2026-11-01 y la separó, porque no es sobre lo que un
  instrumento **informa** sino sobre el **privilegio** con el que corre. Entró como `CQ-20.2` «La
  sonda que sólo es inofensiva cuando falla», segunda cara de la regla nueva `CQ-20` «El privilegio
  de una verificación», con casa en el peldaño 14 —fail-closed—, que es la pareja de la rutina del
  rojo del peldaño 8: el rojo exige que una prueba **pueda** detectar, y ésta que al detectar **no
  rompa**. **Cierra con la fusión**, por D-057.
- **Depende de** `PND-065` (la forma).

**Qué falta, completo.** El método exige el rojo antes del verde, y en el peldaño 14 exige probar
que lo prohibido se rechaza: que la base rechace el dato inválido, que el candado cierre. Para
probar eso hay que **intentar** lo prohibido, y una prueba que intenta lo prohibido es inofensiva
**mientras la prohibición funcione**. El día que no funcione —que es justamente el día que la prueba
existe para detectar— la prueba **ejecuta** lo que estaba probando. Y en el rojo provocado, donde se
corre a propósito con un rol que **sí puede** para poder ver el rechazo, el daño no es probable: es
seguro.

La regla que falta: **toda prueba que verifique una prohibición ejecuta su sentencia dentro de algo
que siempre se deshace** —una transacción con vuelta atrás garantizada, un entorno descartable, una
copia—, y el caso que lo demuestra es que **después de correrla el estado es idéntico**, medido, no
supuesto. Es la pareja de la regla del rojo primero: el rojo primero exige que la prueba **pueda**
detectar; ésta exige que al detectar **no rompa**.

La frase del brazo: *una sonda que sólo es inofensiva cuando falla es una trampa: el día que alguien
la corra con un rol que puede, hace el daño que estaba buscando*.

**Evidencia medida (el experimento).** Le pedí el rojo de un caso donde el servidor intentara
cambiar el esquema y la base lo rechazara. Para provocar ese rojo, el brazo corrió las mismas
sentencias con la credencial del **dueño** de la base, que sí puede. El séptimo caso **no falló:
entró**. Un `UPDATE` sin cláusula de filtro le sumó un cupo tomado a **1001 renglones**, con cero
lugares guardados vivos: su propia sonda rompió la invariante que el sistema existe para sostener.
La reparó y lo verificó con dos cuentas en cero —cero renglones con el contador distinto de cero,
cero con la suma por encima de la capacidad—, y repitió el rojo midiendo que no quedara rastro. Y
la observación sobre el origen, que es la que más me importa: **salió de cumplir mi instrucción al
pie de la letra**. Yo pedí un rojo que sólo se podía provocar con un rol que pudiera. La instrucción
era correcta y el modo de cumplirla tenía el defecto adentro; no lo habría evitado pidiéndolo mejor.

**Mi reproducción (2026-11-01), sobre los 36 archivos del corpus.**

```
grep -niEc "\bsondas?\b"                             ->  0
grep -niE "rollback|se deshace" (fuera del glosario) ->  0 sobre pruebas de prohibición
```

Cero menciones de la sonda y cero del envoltorio que se deshace. Las apariciones de la vuelta atrás
en el corpus son todas del despliegue —el glosario, el ensayo de la vuelta atrás del peldaño 15— y
ninguna es sobre una prueba que ejecuta lo prohibido. El contrato del peldaño 14 pide probar el
rechazo y no dice **con qué recaudo**, que es exactamente el hueco por donde se fue un dato real.

**Criterio de aceptación por perfil.**

- *P8 (dueño de proyecto que aplica el método):* dado el perfil dueño, esta persona puede autorizar
  un rojo provocado sabiendo que viene con su envoltorio que se deshace y con la cuenta que
  demuestra que no quedó rastro, y puede negarse a autorizar uno que no la traiga. Hoy esa decisión
  se le presenta sin la pregunta.
- *P6 (lector humano que entra por el documento principal):* dado ese perfil, esta persona entiende
  en una frase por qué una prueba puede ser peligrosa precisamente cuando descubre lo que buscaba.

**Dónde iría.** El peldaño 14 (fail-closed y candados), al lado de la exigencia de probar el
rechazo. Es el único de la familia que no es sobre lo que un instrumento informa, sino sobre lo que
un instrumento **hace**, y por eso su casa no es el peldaño 7.

**Lo que esta entrada no incluye.** No propone prohibir el rojo provocado con un rol privilegiado:
es la única forma de ver algunos rechazos. Propone el envoltorio y la cuenta de cero rastro.

---

## PND-070 — Un comando declarado de sólo lectura necesita un caso que lo corra sin permiso de escribir *(del experimento; `M+06`, sexta cara de la familia, y la que dudo que sea de esta familia)*

- **Nodo:** `corpus/contratos` [nodo propuesto]
- **Origen:** el experimento de medición del método, hallazgo `M+06`, turno 17 del brazo, encontrado
  **probando otra cosa**.
- **Grupo:** G-METODO · **Severidad:** avisa · **Repositorio:** método
- **Quién decide:** **el dueño**, y hay además una pregunta de clasificación que le dejo abajo.
- **Estado: abierto, escrito y verde en la cadena** — la duda de clasificación que esta entrada
  dejaba planteada se resolvió a su favor: **no** es de la familia del recibo. Entró como `CQ-20.1`
  «El efecto no declarado», primera cara de `CQ-20` (D-078), en el peldaño 14. **Cierra con la
  fusión**, por D-057.

**Qué falta, completo.** Un comando declarado de sólo lectura que necesita que algo exista tiene dos
caminos, y el fácil —crearlo— lo convierte en un comando de **escritura** sin que su nombre, su
documentación ni su salida cambien. Nada en la prosa lo delata. Lo delata una sola cosa: correrlo
sin el permiso de escribir. La regla que falta, en una frase: *todo comando declarado de sólo
lectura necesita un caso que lo corra sin permiso de escritura; si pasa, no era de sólo lectura*.
Y su generalización, que es lo que la hace una regla del método y no una receta: **una declaración
se verifica quitándole el permiso que dice no necesitar**, nunca leyéndola.

**Evidencia medida (el experimento).** Le pedí al brazo verificar el corredor de migraciones sin
permiso de escritura, porque un despliegue que falla por eso falla el día peor. Lo probó, y de paso
descubrió que la opción de estado —que su propio documento promete que *"no toca nada"*— **creaba el
libro mayor de migraciones** para poder leerlo. Un operador con credenciales de sólo lectura no
podía enterarse de qué le faltaba: el comando que existe para informarle fallaba por intentar
escribir, y el que lo corría con permisos no se enteraba nunca.

**Mi reproducción (2026-11-01), sobre los 36 archivos del corpus.**

```
grep -niE "sin permiso|credenciales de s[oó]lo lectura"   ->  3 menciones, las tres de otra cosa
```

Las tres son la credencial de sólo lectura que el dueño le da al **auditor** (peldaño 13 y sus dos
lecciones del manual). Ninguna es un caso que corra algo sin permiso de escribir para ver si era
verdad. Y hay una vuelta que conviene decir, porque es del propio método: el prompt de la auditoría
se declara de sólo lectura —*"no cambies nada salvo escribir tu informe"*— y lo único que sostiene
esa declaración es la instrucción. El método confía en una declaración de sólo lectura en su propio
corpus, que es exactamente la clase de confianza que esta regla pide reemplazar por un caso.

**Criterio de aceptación por perfil.**

- *P8 (dueño de proyecto que aplica el método):* dado el perfil dueño, esta persona puede pedir, de
  cualquier comando que le vendan como inofensivo, el caso que lo corrió sin permiso de escribir y
  su salida; y sabe que si no existe ese caso, la promesa es una frase.
- *P6 (lector humano que entra por el documento principal):* dado ese perfil, esta persona entiende
  por qué un comando puede escribir sin que nadie lo haya querido, con un ejemplo de todos los días
  (el informe que para poder informarte tiene que crear el archivo donde anota).

**Dónde iría.** El peldaño 14 (fail-closed y candados), junto a la familia de reglas que no le creen
a la declaración.

**Y la objeción que dejo escrita, porque el dueño pidió que las diga antes de redactar.** No estoy
convencido de que ésta sea la misma familia que las otras cinco. Las cinco anteriores son sobre lo
que un instrumento **informa** cuando no pudo mirar; ésta es sobre un efecto **no declarado** —el
comando escribe y dice que no—, y el daño no es un verde falso: es un operador que se queda sin
información y un entorno que cambia sin que nadie lo sepa. Lo que las hermana es la **forma de
verificarlas** (correr la cosa en la condición en la que debería fallar), no lo que protegen. Si
entra como cara de la regla del cero, el enunciado de esa regla hay que estirarlo para que cubra
efectos además de informes, y un enunciado estirado es exactamente lo que `PND-061` midió cuando
una frase admitió tres lecturas. Mi recomendación: que sea **regla propia en el peldaño 14**, con un
enlace a la familia que diga que comparten el método de verificación. La decisión es del dueño y
cambia la cuenta de la familia: serían cinco caras y una regla hermana, no seis caras.
---

## PND-071 — Releer cada archivo después de escribirlo, y verificar lo que quedó en disco *(del experimento; `M+03`)*

- **Nodo:** `corpus/contratos` [nodo propuesto]
- **Origen:** el experimento de medición del método, hallazgo `M+03`. Nació como regla que impuse en
  sesión y el brazo la convirtió en mecanismo.
- **Grupo:** G-METODO · **Severidad:** avisa · **Repositorio:** método
- **Quién decide:** **el dueño**. Es una regla nueva del contrato de convivencia, que es la pieza
  más sensible al número de reglas.
- **Estado: abierto** — especificación escrita, borrador pendiente de aprobación.

**Qué falta, completo.** El contrato de convivencia ya trae, como quinta regla mínima, *"nunca
reportes como hecho algo que no verificaste; separá siempre lo que verificaste de lo que creés"*. Lo
que no trae es **el mecanismo**, y acá el mecanismo no es un detalle de implementación: es la
diferencia entre una regla que se cumple y una que se cree cumplida. El agente escribe un archivo,
la capa que escribe le contesta que salió bien, y el agente reporta que está hecho. Entre esas dos
cosas hay un disco que nadie leyó. La regla que falta: **después de escribir un archivo se lo
vuelve a leer del disco y se verifica lo que quedó** —que exista, que tenga el tamaño esperado, que
empiece y termine donde debe, que no haya bytes que nadie puso—, y lo que se reporta es el resultado
de esa lectura, no el de la escritura.

Es hermana de la regla madre de la familia del cero y conviene decirlo: *no confiarle a la memoria,
ni a la intención, lo que el disco puede decir*. Y tiene una propiedad que la hace barata: no
necesita que nadie entienda nada, sólo que el orden sea escribir, leer, reportar.

**Evidencia medida (el experimento).** La escribí como regla en sesión y el brazo la convirtió en un
verificador con siete comprobaciones por archivo. **Falló sobre sí misma en su primera corrida**, y
lo que encontró fue un archivo con secuencias de escape expandidas a bytes reales, **byte nulo
incluido**: la búsqueda de texto devolvía "archivo binario" en vez de texto. Sin ese verificador el
archivo quedaba roto en disco y el agente reportaba que estaba listo. El mismo defecto me rompió
cuatro archivos en un día del lado del conductor, y los cacé de casualidad, mirando un error de
sintaxis. Y una nota que vale como evidencia fresca y no del experimento: **esta misma sesión
reprodujo la clase de defecto** —dos escrituras grandes volvieron con un error de comillas y **el
archivo no quedó ni creado**, con la herramienta informando el error de otra cosa—, así que la
escritura se hizo con otra capa y se verificó leyendo. La regla se aplicó para escribir la regla.

**Mi reproducción (2026-11-01), sobre los 36 archivos del corpus.**

```
grep -niE "releer|volver a leer"   ->  4 menciones, ninguna sobre releer lo que se escribió
```

Las cuatro son de otra cosa: tres dicen que el contrato de convivencia se relee cada sesión y una
dice que un informe de auditoría no debería tener que releerse para ser accionable. La quinta regla
mínima del peldaño 1 cubre la **obligación** de no reportar sin verificar, y ninguna de las 36
fuentes dice **cómo** se verifica una escritura. Es el mismo hueco que `PND-054` encontró en la
pregunta: el método ordenaba preguntar y no decía cómo se pregunta.

**Criterio de aceptación por perfil.**

- *P8 (dueño de proyecto que aplica el método):* dado el perfil dueño, esta persona puede pedir, de
  cualquier archivo que se le reporte escrito, qué se leyó de vuelta y qué decía; y el agente que
  trabaja con ella no puede reportar un archivo como escrito sin haberlo leído del disco.
- *P6 (lector humano que entra por el documento principal):* dado ese perfil, esta persona entiende
  por qué una herramienta que contesta "listo" no es prueba de nada, sin necesitar saber qué es un
  byte nulo.

**Dónde iría.** El contrato de convivencia del peldaño 1, como mecanismo de la quinta regla mínima
—no como regla séptima—, y con su enlace desde el peldaño 12 (verificación honesta). Que entre como
mecanismo de una regla que ya existe es lo que evita inflar el contrato, que es la señal de alarma
de ese mismo peldaño.

**Lo que esta entrada no incluye.** Las siete comprobaciones concretas del brazo son de su proyecto
y de su lenguaje; lo que el método puede exigir es la relectura y el reporte de lo leído, no una
lista de siete comprobaciones que envejecería.

---

## PND-072 — Un insumo con dos públicos en un solo archivo es una trampa esperando *(del experimento; `M+05`, y es un desvío propio del conductor)*

- **Nodo:** `corpus/contratos` [nodo propuesto]
- **Origen:** el experimento de medición del método, hallazgo `M+05`. No lo encontró el brazo: lo
  encontré yo, en mi propia rúbrica de evaluación, el 1 de noviembre.
- **Grupo:** G-METODO · **Severidad:** avisa · **Repositorio:** método
- **Quién decide:** **el dueño**.
- **Estado: abierto** — especificación escrita, borrador pendiente de aprobación.

**Qué falta, completo.** El método tiene compuertas sobre los **artefactos** que un peldaño produce
y ninguna sobre los **insumos** que un peldaño consume. Y hay una forma de insumo que es una trampa
esperando: el archivo con **dos públicos** —una parte que puede viajar y otra que no—, porque la
prohibición vive en la prosa y lo que la tiene que respetar es un programa. La regla que falta tiene
dos niveles:

1. **Mínimo.** Un insumo que tiene partes que no deben viajar **se parte en archivos**: un archivo,
   un público. Si por algún motivo tiene que quedar junto, la parte que no viaja va delimitada por
   una marca que un programa pueda encontrar, y el que lo consume **corta por esa marca y falla
   cerrado si no la encuentra**.
2. **Mejor, y es el que propongo.** El que manda un insumo **verifica la salida de su propio
   recorte**, buscando las frases que no deben estar. No alcanza con cortar en el lugar correcto:
   hay que comprobar que lo que quedó no contiene lo que se quiso sacar.

La frase que las resume, y que es la que me gustaría que quedara en el método: *un arreglo sin su
propia verificación es una hipótesis*. Es hermana del rojo antes del verde, aplicada al insumo en
vez de al artefacto.

**Evidencia medida (el experimento).** Mi rúbrica de evaluación es un archivo congelado con **tres
públicos mezclados**: un preámbulo para el lector del experimento, que **no** puede viajar porque
dice que hay una batería oculta; la consigna, que sí viaja; y una sección sobre cómo se puntúa al
evaluador, que no puede viajar y **lleva escrito en el título** que no se le dice al evaluador. El
programa que armaba la consigna leía el archivo entero. La prohibición estaba escrita, era clara y
**no impedía nada**. El agravante que lo convierte en regla y no en anécdota: lo había leído varias
veces desde que lo congelé, y ninguna compuerta lo miró, porque no hay compuertas sobre los insumos.
Y el segundo agravante, que es el que justifica el nivel 2: **el primer recorte estaba puesto en el
lugar correcto** respecto del defecto que yo había entendido, y una frase sobrevivió igual, porque
el defecto era más grande de lo que creía.

**Mi reproducción (2026-11-01), sobre los 36 archivos del corpus.**

```
grep -niE "dos públicos|un público|partir el insumo"   ->  0
```

Cero menciones. Y la mitad que sí existe conviene decirla, porque delimita el hueco: el método ya
tiene, desde D-022, el bloque *"Antes de enviar el prompt"* delante de cada prompt, que dice qué
insumos tiene que haber, quién los hace y su estado mínimo aceptable. O sea: el método **ya declara
los insumos**; lo que no dice es que un insumo tiene público y que las partes que no viajan se
separan con un mecanismo. El lugar está preparado y la regla falta.

**Criterio de aceptación por perfil.**

- *P8 (dueño de proyecto que aplica el método):* dado el perfil dueño, esta persona puede mirar
  cualquier insumo que esté por mandarle a un agente y contestar una pregunta —*"¿todo esto es para
  el que lo va a leer?"*— y, si la respuesta es no, sabe que la parte que no viaja se saca con un
  corte verificado y no con una advertencia escrita adentro.
- *P7 (lector que adapta el método a otro formato):* dado ese perfil, esta persona recibe la regla
  con sus dos niveles y puede adoptar el mínimo sin el mejor, con la diferencia dicha.

**Dónde iría.** El contrato de convivencia del peldaño 1, junto a la relectura de `PND-071` —son la
misma familia: no confiarle a la intención lo que un programa puede comprobar—, y una línea en el
bloque genérico de los insumos (D-022), que es donde el método ya habla de qué tiene que existir
antes de un prompt.

**Lo que esta entrada no incluye.** No propone una compuerta sobre los insumos, que sería un cambio
de alcance grande y es trabajo de la herramienta: propone la regla y el recaudo del que manda.

---

## PND-073 — Un peor caso aceptado y no instrumentado es daño silencioso *(del experimento; `M+01`)*

- **Nodo:** `corpus/contratos` [nodo propuesto]
- **Origen:** el experimento de medición del método, hallazgo `M+01`. Salió de una decisión de
  arquitectura que acepté en conversación y que el brazo no dejó pasar como aceptación y listo.
- **Grupo:** G-METODO · **Severidad:** bloquea · **Repositorio:** método
- **Quién decide:** **el dueño**.
- **Estado: abierto** — especificación escrita, borrador pendiente de aprobación.

**Qué falta, completo.** El peldaño 6 exige que cada decisión quede escrita con el nombre del dueño,
la fecha y **sus palabras exactas**. Lo que no exige es lo que viene después de un tipo particular
de decisión: la que **acepta un riesgo**. Cuando el dueño dice "me parece bien, acepto que en ese
caso se pierda una venta", el registro guarda la aceptación y el proyecto sigue; y el día que el
caso ocurre, **nadie se entera**, porque la aceptación no vino con el aviso. La regla que falta:
**por cada riesgo que el dueño acepta, el proyecto declara el mecanismo que avisa cuando ocurre, y
una aceptación sin instrumentación no cierra la decisión.**

La frase con la que el brazo lo planteó es la que mejor lo dice, y es la que quiero en el método:
*vos elegiste perder una venta, no elegiste no enterarte*.

Y tiene una **mitad que no es prosa**: para que algo pueda verificarlo, el registro de riesgos
aceptados tiene que ser un **dato** —cada riesgo aceptado con su mecanismo de aviso declarado—, no
un párrafo en el registro de decisiones. Esa mitad va al nivel de datos, en inglés y en ASCII puro
(D-051), y mientras la herramienta no implemente su evaluador el peldaño que la pida sale
`unmeasured`, que es honesto y no mide.

**Evidencia medida (el experimento).** Cuando acepté el precio de una decisión de arquitectura —que
se pudieran morir cupos—, el brazo derivó **tres obligaciones no opcionales** en vez de anotar la
aceptación: la restricción vive en la base y no en el servicio; la costura de verificación
reconcilia **sin leer el contador que verifica**; y el barrido lleva vigilancia desde el día uno. Las
tres salen de la misma pregunta —*¿cómo nos enteramos el día que esto pase?*— y ninguna estaba
pedida por el método.

**Mi reproducción (2026-11-01), sobre los 36 archivos del corpus.**

```
grep -niE "riesgo aceptado|peor caso aceptado|aceptás el riesgo|el precio"   ->  0
```

Cero menciones en las 36 fuentes. El método tiene la aceptación del dueño en varios lugares —el
dimensionamiento del peldaño 3, el apagado de una regla del Anexo H con su registro de cuatro
campos, la excepción escrita de la urgencia en el camino evolutivo— y en los tres casos lo que pide
es **el registro de la decisión**, nunca el aviso de que el caso ocurrió. El registro de apagado es
el que está más cerca y conviene mirarlo, porque muestra la forma: identificador, motivo, quién
autoriza y fecha de revisión. Lo que falta es un quinto campo de la misma clase: **con qué nos
enteramos**.

**Criterio de aceptación por perfil.**

- *P8 (dueño de proyecto que aplica el método):* dado el perfil dueño, esta persona no puede
  aceptar un riesgo sin que le muestren, en la misma conversación, con qué se va a enterar el día
  que ocurra; y puede releer el registro seis meses después y ver, por cada riesgo que aceptó, qué
  lo vigila.
- *P1 (herramienta consumidora):* dada una herramienta consumidora, esa herramienta puede leer el
  registro de riesgos aceptados como dato y decir, por cada uno, si tiene mecanismo de aviso
  declarado, sin interpretar prosa.
- *P6 (lector humano que entra por el documento principal):* dado ese perfil, esta persona entiende
  la diferencia entre aceptar que algo pase y aceptar no enterarse, que es la frase entera de la
  regla.

**Dónde iría.** El peldaño 6 (las decisiones se escriben junto al código), que es donde vive la
aceptación. Con enlaces a los peldaños 16, 21 y 22, que son los que construyen el aviso, y al 3
cuando el riesgo aceptado es de dimensionamiento. La mitad de datos va a `gates/`.

**Lo que esta entrada no incluye.** No pide que todo riesgo aceptado se mitigue: pide que se
instrumente. La diferencia es exactamente lo que la vuelve aceptable para un proyecto chico.
---

## PND-074 — Una cifra que depende del repositorio nace envejecida *(del experimento; `M+04`, y la que el prompt de este lote se perdió por una cuenta a mano)*

- **Nodo:** `corpus/contratos` [nodo propuesto]
- **Origen:** el experimento de medición del método, hallazgo `M+04`. Lo encontró el brazo
  reproduciendo una cifra propia, y yo había tropezado con lo mismo una hora antes construyendo una
  compuerta. Esa coincidencia es, en sí misma, el dato.
- **Grupo:** G-METODO · **Severidad:** bloquea · **Repositorio:** método
- **Quién decide:** **el dueño**.
- **Estado: abierto** — especificación escrita, borrador pendiente de aprobación.

**Qué falta, completo.** No es un error de medición: es una **propiedad** de cualquier cifra que
depende del estado del repositorio y que vive dentro del repositorio. **El acto de guardarla la
cambia.** Nace envejecida. El método ya exige el comando que produce el número, y eso no alcanza,
porque cuando alguien corre ese comando seis semanas después y le da otro número, *"no reproduce"*
significa dos cosas distintas —un error de medición o el paso del tiempo— y esa distinción es
justamente la que decide si hay algo que arreglar. La regla que falta tiene dos niveles:

1. **Mínimo, y debería ser obligatorio.** Toda cifra que dependa del estado del repositorio se
   escribe con **dos** cosas al lado: el comando que la reproduce **y el commit en que se midió**.
2. **Mejor.** La cifra vive en un archivo aparte con su commit adentro y el documento la cita, para
   que un verificador pueda decir *"esta cifra es la foto del commit X y el árbol está en Y,
   rehacela"* en vez de ponerse en rojo por envejecer. Y la razón de fondo, que es una regla del
   método en sí misma: **un control que se pone en rojo por el paso del tiempo se apaga solo.** Una
   compuerta que nace en rojo no sirve.

**Evidencia medida (el experimento), y es de dos lados.** Le pedí al brazo reproducir dos de las
veinte cifras escritas a mano en su documento de pronóstico. Las **72 líneas de producto**
reprodujeron exacto. Los **36 commits no: eran 37**. Y el motivo que trajo es mejor que el error:
*"el 36 era cierto cuando se midió y envejeció al commitearse: el commit que trajo el documento es
el 37"*. Del otro lado, una hora antes, yo estaba construyendo la compuerta que verifica que ninguna
cifra de mi paper contradiga su archivo y la puse a contar en vivo las líneas de documento del
brazo: **habría dado rojo en el commit siguiente**, porque el brazo escribe documentos todos los
turnos. Lo arreglé guardando la cifra en un archivo con el commit en que se midió y haciendo que la
compuerta **avise** en vez de ponerse en rojo cuando el árbol ya pasó de esa foto. El brazo llegó al
mismo problema desde el otro lado, por reproducir una cifra en vez de por construir un control.

Y la tercera evidencia es **de esta misma conversación**, y es la mejor que tengo: el prompt que me
trajo este lote decía *"catorce hallazgos"*, y al recontarlos con un programa resultaron **quince**
—la entrada que falta en una cuenta a mano es, exactamente, esta regla—. El dueño lo dejó escrito en
el prompt en vez de borrar el rastro. Una regla cuya ausencia se cobra en el documento que la viene
a proponer no necesita más justificación.

**Mi reproducción (2026-11-01), sobre los 36 archivos del corpus.**

```
grep -niE "con el comando que (lo|la) produce"       ->  4 (peldaño 7, las dos lecciones del
                                                         manual y el camino evolutivo)
grep -niE "commit en que se midió|con su commit"     ->  0
```

El método pide el comando y pide **la fecha**: el resultado esperado del peldaño 7 dice *"El número,
con el comando que lo produce y la fecha"*. La fecha es lo que no alcanza: con la fecha sé **cuándo**
se midió y no sé **sobre qué árbol**, que es lo único que hace reproducible la cifra. Cero menciones
del commit en las 36 fuentes. Y lo que lo hace más llamativo es que el método **ya tiene la idea en
otro peldaño**: el 20 exige que la documentación se regenere *"en el mismo commit"* que el cambio,
porque antes envejecía. La misma lógica no llegó nunca a las cifras.

**Lo que este repositorio ya hizo de esta familia, para que el borrador no lo repita.** D-077
(`PND-064`, cerrado el 2026-10-30) deriva del dato las cifras escritas junto a una colección que el
dato declara, y eso cubre el artefacto que **se genera**. M+04 es la otra mitad: la cifra en **prosa
que se escribe a mano** y que nadie puede derivar, donde lo único que se puede exigir es el par
comando + commit. Las dos son la misma familia —dos copias de un hecho, una que se actualiza sola y
otra que no— y el borrador tiene que decir cuál se aplica cuándo, porque un lector que lea las dos
va a preguntar si tiene que hacer las dos cosas.

**Criterio de aceptación por perfil.**

- *P8 (dueño de proyecto que aplica el método):* dado el perfil dueño, esta persona puede tomar
  cualquier cifra de cualquier documento del proyecto, correr el comando que tiene al lado y, si el
  número no da, saber **sin preguntarle a nadie** si eso es un error o es el paso del tiempo.
- *P5 (auditor que quiere probar que su copia es la buena):* dado el perfil auditor, esta persona
  puede reproducir una cifra contra el árbol en el que se midió y no contra el de hoy, que es la
  única forma de que la reproducción signifique algo.
- *P6 (lector humano que entra por el documento principal):* dado ese perfil, esta persona entiende
  por qué una cifra puede ser cierta el día que se escribe y falsa al día siguiente sin que nadie se
  haya equivocado.

**Dónde iría.** El peldaño 7 (medir), extendiendo el resultado esperado que hoy pide comando y
fecha; el peldaño 3 (dimensionar) y el 9 (calidad de código), que son los dos que producen
documentos llenos de cifras medidas; y el contrato de convivencia del peldaño 1, junto a la
relectura de `PND-071`, porque son la misma familia: **no confiarle a la memoria lo que el disco
puede decir**.

**Lo que esta entrada no incluye.** No propone derivar toda cifra de prosa, que es lo que D-077 ya
resolvió donde se puede: propone el par comando + commit donde no se puede derivar. Y no propone
que un control se ponga en rojo por envejecer, que es justamente el defecto que la regla nombra.
---

## PND-075 — Una invariante que se cumple y no se puede mirar desde afuera no es verificable *(del experimento; `M+02`, y es declaración, no prosa)*

- **Nodo:** `corpus/anexo-h` [nodo propuesto]
- **Origen:** el experimento de medición del método, hallazgo `M+02`. Lo produjo el brazo
  escribiendo la tabla de las cinco invariantes de su sistema con dos columnas separadas, sin que
  el método se lo pidiera.
- **Grupo:** G-METODO · **Severidad:** avisa · **Repositorio:** método
- **Quién decide:** **el dueño**, y hay tres decisiones encadenadas abajo, no una.
- **Estado: abierto, con tres decisiones tomadas el 2026-11-01** — el dueño decidió: (1) el
  fundamento es **la evidencia medida de esta entrada** y no una cita de `docs/AIevaluation.md`,
  porque esa objeción está registrada como una de las nueve **erróneas** en
  `EVALUACIONES_DE_IA.md` y el peldaño 9 cubre lo que reclamaba —citarla la resucitaría en contra
  del documento que la cerró—; (2) va como **pendiente propio con su secuencia**, no como cara de
  la familia del recibo, porque el concepto *invariante* no está en el corpus con ninguna otra
  palabra —cero apariciones en los archivos del corpus castellano— y entra con su explicación de
  nivel principiante y su entrada de glosario en los ocho idiomas; (3) el evaluador entra como
  `required: false` **con su prueba**, que sería el primer uso real de ese camino. Falta el
  borrador.
- **Depende de** `PND-012` (es el primer uso real de `required: false`).
- **Y una regla de uso que esta entrada deja escrita:** un documento de trabajo que se cita como
  fundamento tiene que decir **cuál es el documento que lo juzga**. La fuente cruda
  (`docs/AIevaluation.md`) y el documento escrito de ella (`EVALUACIONES_DE_IA.md`) pueden
  contradecirse, y quien cita la cruda sin leer la escrita revive lo que el método cerró. No es un
  defecto del archivo crudo —una fuente cruda tiene que quedar cruda—: es una línea que le falta a
  su registro del inventario, que hoy dice de dónde sale la escrita y no dice que **lo que la
  escrita descartó no se vuelve a citar desde la cruda**.

**Qué falta, completo.** Una **invariante** es una afirmación sobre el sistema que tiene que ser
verdadera siempre, pase lo que pase: *nunca se reservan más lugares que la capacidad*, *dos personas
no se quedan con el mismo turno*. El método pide el árbol semántico en el peldaño 2 y pide, en el
14, que lo prohibido se rechace; lo que no pide en ninguna parte es que cada invariante declare
**dos cosas distintas**: dónde se **cumple** —qué pieza del sistema la hace imposible de violar, que
en el buen diseño es la base de datos y no el servicio— y dónde se **observa** —con qué consulta,
desde afuera, alguien comprueba hoy que sigue valiendo—. Son dos columnas y no una, y la segunda es
la que falta siempre: *una invariante que se cumple pero no se puede mirar desde afuera no es
verificable*, y una invariante no verificable es una promesa.

Lo que esta entrada propone escribir es la **declaración**, en inglés y ASCII puro (D-051): el
artefacto nuevo en el peldaño 2 con su `since_schema` y su `since_version`, su pregunta de
verificación del dueño, y el evaluador que lo juzga. La implementación del evaluador es de la
herramienta y no de este trabajo; mientras no exista, el peldaño informa que está declarado y no
medido.

**Evidencia medida (el experimento).** El brazo escribió la tabla de las cinco invariantes de su
sistema con las dos columnas separadas, por su cuenta y con la frase de arriba como motivo. Y la
contracara, medida el mismo día en el mismo sistema: la costura que **verifica** una de esas
invariantes reconcilia **sin leer el contador que verifica**, porque leerlo haría que el verificador
y lo verificado compartieran la fuente —que es, dicho de otro modo, la misma regla de `PND-066`
vista del lado del diseño—. Las dos cosas salieron de la misma conversación y ninguna la pedía el
método.

**Mi reproducción (2026-11-01), sobre los 36 archivos del corpus.**

```
grep -nic "invariantes?"                      ->  0
grep -niE "dónde se observa|observable desde" ->  0
```

**Cero.** La palabra *invariante* no aparece ni una vez en las 36 fuentes del corpus castellano, y
tampoco aparece en el glosario del documento principal. Esto cambia el tamaño de la entrada y hay
que decirlo antes de redactar: `M+02` no es "agregarle una columna a una tabla que ya existe". Es
**introducir un concepto que el método no tiene**, con lo que eso implica por D-025 (nivel
principiante): se explica en lenguaje de todos los días la primera vez que aparece y entra al
glosario, en los ocho idiomas. Lo más cercano que el método tiene hoy es *"lo que la base rechaza
por su cuenta"* del peldaño 14, que es la primera columna sin nombrarla y sin la segunda.

**Criterio de aceptación por perfil.**

- *P8 (dueño de proyecto que aplica el método):* dado el perfil dueño, esta persona puede pedir la
  tabla de invariantes de su sistema y, por cada fila, correr la consulta de la segunda columna y
  ver con sus ojos que la invariante sigue valiendo hoy. Si una fila no tiene consulta, esa
  invariante es una promesa y ella lo sabe sin que nadie se lo explique.
- *P1 (herramienta consumidora):* dada una herramienta consumidora, esa herramienta puede leer del
  dato que el peldaño 2 declara el artefacto de invariantes y su evaluador, y decidir si lo mide o
  informa que está declarado y no medido —sin inventar la ruta ni aproximar con el evaluador más
  parecido—.
- *P6 (lector humano que entra por el documento principal):* dado ese perfil, esta persona aprende
  qué es una invariante en lenguaje de todos los días, con un ejemplo de su negocio, la primera vez
  que la palabra aparece.

**Dónde iría, y el precio de cada pieza.** El peldaño 2 (la definición del proyecto, el árbol
semántico y la lectura obligatoria), como artefacto nuevo —`docs/INVARIANTS.md`, nombre en inglés y
en mayúsculas porque es nivel de datos y porque las cuarenta y dos rutas que el dato ya declara
están así (D-051, D-065)—, con `min_bytes` y **sin** `must_contain`, por el mismo motivo que
`docs/GLOSSARY.md` y `docs/PROFILES.md`: lo que ese archivo tiene que *decir* lo juzga una persona.
Y con el precio dicho: una ruta que el dato declara **la nombra el contrato de su peldaño, en los
ocho idiomas** (`tests/artefacto_nombrado.test.mjs`, 288 pares hoy), así que la declaración y la
prosa de los ocho contratos entran en el mismo commit o la prueba se pone roja.

**Las tres decisiones encadenadas, para que el dueño las vea juntas.**

1. **¿Entra el concepto?** Es vocabulario nuevo del método y va al glosario en ocho idiomas.
2. **¿Con qué evaluador?** Uno nuevo, de nombre nuevo, porque el vocabulario es append-only y
   ninguno de los doce actuales significa esto. `artifacts` alcanza para exigir que el archivo
   exista; no alcanza para exigir que cada fila tenga su consulta.
3. **¿`required: true` o `required: false`?** Y acá está la trampa que conviene ver antes de
   publicar: la semántica publicada dice que un evaluador `required: true` que la instalación no
   conoce **no deja avanzar el peldaño**. Declararlo así congela el peldaño 2 de todos los
   proyectos hasta que la herramienta lo implemente. `required: false` avisa y deja avanzar, y
   sería **el primer uso real de ese camino** en toda la historia del dato (`PND-012`), lo que
   obliga a cubrirlo con una prueba antes de publicarlo. Mi recomendación es `required: false` con
   su prueba, y subirlo a `true` cuando haya una implementación.

**Lo que esta entrada no incluye.** La implementación del evaluador. Y no propone que el método
defina *cómo* se observa cada clase de invariante: eso es del proyecto, igual que el método no
define con qué se mide cada regla del Anexo H (D-075).

---

## PND-076 — La severidad de un defecto encontrado es prosa, y cuatro pases la calificaron igual de mal *(del experimento; `M+10`, y es declaración, no prosa)*

- **Nodo:** `corpus/anexo-h` [nodo propuesto]
- **Origen:** el experimento de medición del método, hallazgo `M+10`. No salió de una corrida: salió
  de una conversación con el dueño, y de que él me corrigiera una exageración.
- **Grupo:** G-METODO · **Severidad:** avisa · **Repositorio:** método
- **Quién decide:** **el dueño**.
- **Estado: abierto** — especificación escrita, borrador pendiente de aprobación.
- **Depende de** `PND-012` (igual que `PND-075`, si el evaluador entra como opcional).

**Qué falta, completo.** El método ya hace bien la mitad difícil: la severidad **de sus propias
reglas** es un dato. El Anexo H declara `BLOQUEA` / `AVISA` / `REGISTRA` por regla, el dato publicado
las lleva por identificador, y hasta distingue las que bloquean con rojo humano de las que bloquean
con rojo de máquina. Para un **defecto que alguien encuentra**, en cambio, la severidad es prosa: el
peldaño 13 le pide al auditor *"su prioridad: P0 hay que arreglarlo ya, P1 pronto, P2 cuando se
pueda"*, y eso se lee e interpreta. Dos lectores razonables lo aplican distinto, y no por descuido:
porque la definición no tiene un predicado que se pueda contrastar contra el hallazgo.

La regla que falta: **criterios de severidad declarados y contrastables**, con la forma de las
reglas que ya existen. No *"severidad 1 es grave"*, sino predicados que un programa pueda verificar
contra el hallazgo. Por ejemplo, y es el del experimento: *un endpoint alcanzable sin credencial que
devuelve datos de otro usuario **es** severidad máxima*. Con eso, una calificación discrepante **se
puede marcar**: el programa compara la severidad dicha contra el criterio que aplica y reporta la
diferencia, en vez de que alguien la descubra seis meses después.

**Evidencia medida (el experimento), con su límite adentro.** Cuatro pases de evaluación sobre dos
sistemas encontraron el mismo bypass de autorización —**en la línea exacta, las cuatro veces**— y
las cuatro lo calificaron **severidad 3** cuando por la definición escrita es **severidad 1**. El
evaluador tenía la definición delante: la consigna incluía *"1: viola una invariante, pierde datos,
o deja actuar sobre lo ajeno"*, y el defecto es "actuar sobre lo ajeno" por la letra —la costura de
auditoría devuelve el rastro de cualquier reserva a cualquiera, sin credencial—. No fue un problema
de **encontrarlo**: fue de **calificarlo**.

**El límite de ese dato, y va adentro del borrador, no como nota al pie.** Son cuatro corridas sobre
**un solo** defecto: es una observación repetida cuatro veces, no cuatro observaciones sobre
calibración. No alcanza para afirmar que la subestimación es sistemática, y la palabra
*"sistemáticamente"* quedó retirada del registro del experimento por eso. Lo que queda es: sobre el
único defecto grave de ese experimento, cuatro pases lo encontraron y ninguno lo calificó como lo
que era. Eso amerita **medirlo con más defectos**, no concluirlo. Si el borrador se escribe sin esa
limitación, el método publica como regla una inferencia de un solo caso, que es exactamente lo que
el peldaño 12 prohíbe.

**Mi reproducción (2026-11-01), sobre los 36 archivos del corpus.**

```
grep -o "\bP0\b" | wc -l               ->  63 menciones, en 6 de los 36 archivos
grep -niE "criterios? de severidad"    ->  0
```

Las 63 menciones de `P0` son la escala de prioridad del auditor, repetida en el contrato del peldaño
13, en el del 18, en la Parte B del documento principal, en el camino evolutivo y en las dos
lecciones del manual, **siempre con la misma definición en prosa**. Cero menciones de un criterio de severidad declarado. Y hay un hallazgo
lateral que conviene aprovechar porque es la forma que el dueño pide: el contrato del peldaño 18
(vulnerabilidades) ya escribe *"P0 hay que arreglarlo ya según mi criterio: [criterio]"* —con el
hueco para que el dueño lo complete—, y el peldaño 13 no. O sea: la forma de pedirle el criterio al
dueño **ya existe en el método, en un peldaño, y no en el que audita**. El borrador tiene que
resolver esa asimetría, no inventar una forma nueva.

**Criterio de aceptación por perfil.**

- *P8 (dueño de proyecto que aplica el método):* dado el perfil dueño, esta persona recibe el
  informe de auditoría con cada hallazgo y su severidad **junto al criterio que la determina**, y
  puede discutir la calificación mirando el criterio en vez de mirando la opinión del que calificó.
- *P1 (herramienta consumidora):* dada una herramienta consumidora, esa herramienta puede leer los
  criterios de severidad del dato y marcar un hallazgo cuya severidad dicha no coincide con el
  criterio que le aplica, con la misma mecánica con la que hoy lee `initial_severity` por regla.
- *P5 (auditor que quiere probar que su copia es la buena):* dado el perfil auditor, esta persona
  puede calificar dos auditorías distintas con la misma escala y que las notas se puedan comparar,
  que es lo que el peldaño 13 ya promete y hoy no sostiene.

**Dónde iría.** La casa natural es el nivel de datos, con la forma que ya existe por regla; y la
prosa que lo pide, el contrato del peldaño 13, alineado con el del 18 que ya pide el criterio del
dueño. El Anexo H es donde vive hoy la severidad declarativa y es el lugar donde el borrador tiene
que mirar antes de inventar nada.

**Lo que esta entrada no incluye.** No propone una tabla universal de severidades por tipo de
defecto, que envejecería y que ningún proyecto obedecería: propone que los criterios **se declaren**
y que el proyecto los complete, como ya hace con los umbrales. Y no afirma nada sobre la
calibración de los evaluadores más allá del único defecto medido.
---

## PND-077 — Los marcadores de plantilla se confunden con la respuesta del dueño *(del experimento; `M-05`, y es un defecto del método, no un agregado)*

- **Nodo:** `corpus/contratos` [nodo propuesto]
- **Origen:** el experimento de medición del método, hallazgo `M-05`. Lo encontró el brazo en el
  peldaño 3, y lo encontró **no cayendo en la trampa**.
- **Grupo:** G-METODO · **Severidad:** bloquea · **Repositorio:** método
- **Quién decide:** **el dueño**. La forma del marcador nuevo es suya: afecta los setenta y dos
  prompts de los ocho idiomas.
- **Estado: abierto, con el token decidido el 2026-11-01** — es **`%%`**, y el criterio que lo
  decidió no es dónde aparece sino **cómo falla**: `{{COMPLETAR}}` procesado por un motor de
  plantillas —Mustache, Handlebars, Jinja, Django, Vue, Angular, plantillas de Go— **desaparece
  entero y en silencio**, y el prompt queda leyéndose completo, que es el defecto de esta entrada
  en forma de token; `%%COMPLETAR%%` en un `printf` queda `%COMPLETAR%`, visiblemente un hueco, y
  en un decodificador de URL **revienta**, porque `%%` no es una codificación válida. Entre un
  mecanismo cuya seguridad depende de que un segundo mecanismo funcione y uno seguro por
  construcción, el dueño tomó el segundo. Medido sobre lo versionado el mismo día: `%%` y `>>>`
  son los **únicos ceros reales** —`{{` aparece tres veces, las tres como `${{ }}` de Actions, y la
  primera tabla que dio cero para `{{` había medido sólo los `.md`—. Lo que se pierde y queda
  dicho: `{{` se reconoce como hueco sin explicación y `%%` no tanto; se compensa en el **texto**
  del hueco (`%%COMPLETAR: TU RESPUESTA%%`, y la palabra de adentro **se traduce**), no en el
  delimitador, que es protocolo igual que el nombre de archivo de `PND-079`.
- **Y la guarda va partida en dos, porque la redacción original miraba el lugar equivocado:** *«ningún
  prompt enviado puede contener el token»* no es verificable en este repositorio, que nunca ve un
  prompt enviado y **publica plantillas, que tienen que contener el token**. Acá: todo hueco de un
  prompt publicado usa el token, y los **152 tokens entre corchetes** que hoy tiene el corpus
  quedan en un registro cerrado con su razón —eso es lo que hoy no se puede escribir y el token
  nuevo habilita, porque hoy **ningún patrón separa el hueco del enlace**: `[X]` tiene la misma
  forma que `[Ref. 35]`, que `[es]` y que cualquier enlace de markdown—. Allá: la obligación
  declarada sobre el consumidor, como la de fijación de `D-068`, **dicha de frente como lo que
  ninguna prueba de acá puede verificar**. Y el recurso publica, por prompt, **la cantidad de
  huecos, derivada** (`D-077`): un consumidor cuyo renderizador se los comió cuenta y se entera, y
  eso vale para cualquier token, no sólo para el elegido.

**Qué está mal.** El método usa corchetes para marcar lo que el dueño tiene que completar, y hay una
plantilla que dice, en el prompt de cierre del peldaño 3, **`Elijo la opción [B]`**. Leída por un
agente, esa línea no parece un hueco: parece **una decisión tomada**. Y es la peor clase de
contaminación posible, porque el peldaño 3 es el que el método protege más —las cifras del
dimensionamiento son del dueño y no se inventan— y el marcador está escrito en un lugar que el dueño
controla, lo que lo hace parecer suyo. El defecto no es el corchete: es que el corchete es **un token
que un humano podría escribir**. La regla que falta: *un marcador de plantilla usa un token que
ningún humano escribiría nunca*, y lo que queda sin completar tiene que ser imposible de leer como
una respuesta.

**Evidencia medida (el experimento).** El brazo **no la tomó por decisión mía**: dejó la sección
escrita y vacía con el motivo adentro, razonando que era *"la misma clase de contaminación que este
peldaño acababa de encontrar con las nueve cifras: un dato que parece tuyo porque está escrito en un
lugar que vos controlás, pero que no dijiste"*. O sea: el método se salvó por la integridad del
agente, que es exactamente lo que el método no quiere que sostenga una garantía. Un agente menos
escrupuloso registra un dimensionamiento con la opción B elegida por nadie, y el peldaño cierra en
verde.

**Mi reproducción (2026-11-01), sobre los 36 archivos del corpus.**

```
grep -ohE "\[[^]]{1,24}\]" | sort -u      ->  152 tokens distintos entre corchetes
grep -rn "Elijo la opción \[B\]"          ->  4 (contrato del peldaño 3 y su lección, es/en)
```

Ciento cincuenta y dos tokens distintos con la misma forma de un corchete simple, y acá está lo
que convierte esto en un defecto y no en una incomodidad: **ningún patrón los separa**. El hueco que
el dueño completa (`[X]`, `[B]`, `[fecha]`) tiene exactamente la misma forma que el enlace a una
referencia (`[Ref. 35]`), que la etiqueta de idioma de un bloque traducido (`[es]`), que la marca de
lo que es interpretación y no hecho (`[hipótesis]`), que las marcas de fuente del camino
evolutivo-correctivo (`[código]`, `[base]`, `[inferido]`) y que el texto de cualquier enlace de
markdown. Cinco significados y una sola forma, y uno de los cinco quiere decir "esto lo decidió el
dueño". Por eso hoy **no hay guarda posible** que verifique que un prompt se pegó completo: para
escribirla habría que poder distinguir el hueco del enlace, y no se puede. Elegir el token nuevo es,
entonces, también elegir con qué **no** se confunde, y recién con eso la guarda se vuelve escribible.
La frase del `[B]` aparece cuatro veces en castellano —en el contrato del peldaño 3 y en la lección
del manual, una dentro del prompt inglés y otra dentro de su bloque traducido—, y contada sobre las
ocho versiones son **treinta apariciones en dieciséis archivos**: dos por archivo, salvo el inglés,
que lleva una porque no tiene bloque traducido. Ése es el tamaño real del reemplazo de esta frase,
y el del lote entero de marcadores es mucho mayor; conviene medirlo antes de redactar.

**Criterio de aceptación por perfil.**

- *P8 (dueño de proyecto que aplica el método):* dado el perfil dueño, esta persona puede pegar un
  prompt sin completar y el agente **no puede** confundir un hueco con una respuesta suya; y si se
  olvidó de completar uno, el agente se lo dice en vez de seguir.
- *P6 (lector humano que entra por el documento principal):* dado ese perfil, esta persona ve de un
  vistazo qué partes de un prompt tiene que completar, sin confundirlas con las citas ni con las
  marcas del propio texto.
- *P7 (lector que adapta el método a otro formato):* dado ese perfil, esta persona puede reescribir
  los prompts en otro formato y conservar la distinción, porque el token es único y buscable.

**Dónde iría.** Los setenta y dos prompts de los ocho idiomas, más la explicación de la forma en la
Parte A del documento principal (cómo se lee un peldaño), que es donde se explica cómo se usa un
prompt. Es un cambio **mecánico y grande**: toca los ocho idiomas en el mismo commit (D-013) y la
pieza inglesa del prompt es una sola y tiene que quedar idéntica en las ocho versiones, que es lo
que `build/prompts.mjs` verifica. Conviene que el borrador traiga la cuenta exacta de reemplazos y
una guarda que exija que no quede ningún marcador de la forma vieja, porque un reemplazo parcial acá
es la cuenta parcial de `PND-065` aplicada a este trabajo.

**Lo que esta entrada no incluye.** No cambia **qué** se le pide al dueño en cada hueco: sólo la
forma del marcador. Y no toca los otros cuatro significados del corchete, que se quedan como están
si el token nuevo es distinguible de los cuatro.

---

## PND-078 — El prefijo de un identificador no está fijado en ninguna parte, y dos cosas distintas se llamaron igual *(del experimento; `M-06`)*

- **Nodo:** `corpus/contratos` [nodo propuesto]
- **Origen:** el experimento de medición del método, hallazgo `M-06`. Lo encontró el brazo cuando ya
  era tarde: renombrando.
- **Grupo:** G-METODO · **Severidad:** avisa · **Repositorio:** método
- **Quién decide:** **el dueño**, porque fijar un espacio de nombres es una obligación nueva para
  todos los proyectos.
- **Estado: abierto** — especificación escrita, borrador pendiente de aprobación.

**Qué está mal.** El método exige identificadores estables para sus propias reglas —el Anexo H lo
dice con todas las letras: *identificador estable, no se reutiliza nunca*— y **no dice nada** sobre
los identificadores que un proyecto crea. Así que el proyecto los inventa en la sesión en que los
necesita, y dos cosas distintas terminan con el mismo prefijo. Cuando eso pasa, el costo no es de
confusión: es de **renombrar citas en todo el árbol**, que es un trabajo que no agrega nada y que
toca archivos que nadie quería tocar. La regla que falta: *los prefijos de identificador se fijan en
el catálogo del proyecto antes de usarse, uno por clase de cosa, y no se reciclan* —que es, palabra
por palabra, la regla que el método ya se aplica a sí mismo y nunca le pidió a nadie—.

**Evidencia medida (el experimento).** El prefijo `C-` se usó para las **condiciones de
elegibilidad** y para las **compuertas** del mismo proyecto. Cuando la colisión se hizo visible,
hubo que renombrar **84 citas en 14 archivos**. Ninguna de las dos elecciones estaba mal: las dos
eran razonables y ninguna sabía de la otra, porque nada las obligaba a declararse.

**Mi reproducción (2026-11-01), sobre los 36 archivos del corpus.**

```
grep -ohE "\b(PND|CQ|UX|D|C|G|N)-[0-9]+\b" | prefijos ->  UX-nn 221 | D-nn 72 | CQ-nn 60 | PND-nn 24
grep -niE "prefijos?"                                 ->  0
grep -nic "identificador estable"                     ->  7 (todas sobre las reglas del propio método)
```

El corpus usa cuatro prefijos propios y los usa con disciplina —`UX-`, `D-`, `CQ-`, `PND-`—, dice
siete veces que un identificador es estable y **nunca dice la palabra prefijo**. Cero menciones de
`C-nn`, que confirma que la colisión no fue del corpus sino de lo que el corpus **hace producir**:
el peldaño 5 pide *"pendientes numerados"* sin fijar su prefijo, y el camino evolutivo pide
condiciones de elegibilidad sin fijar el suyo. El método tiene la regla y se la aplica sólo a sí
mismo.

**Criterio de aceptación por perfil.**

- *P8 (dueño de proyecto que aplica el método):* dado el perfil dueño, esta persona tiene un lugar
  donde están declarados los prefijos de su proyecto y puede negarse a aceptar un identificador con
  un prefijo que no está declarado, sin tener que recordar cuáles ya se usaron.
- *P6 (lector humano que entra por el documento principal):* dado ese perfil, esta persona entiende
  por qué dos listas numeradas pueden chocar y qué cuesta arreglarlo después (84 citas, 14
  archivos), que es el dato que convierte la regla en algo que vale la pena hacer antes.

**Dónde iría.** El peldaño 2, donde se escribe la definición del proyecto y el árbol semántico, que
es el lugar donde hoy se declaran los nombres de las cosas. Con una mención en el peldaño 5, que es
el que produce el primer identificador de la vida de un proyecto.

**Y la objeción que dejo escrita.** Ésta es la más chica de las quince y es la que más se parece a
una comodidad de quien construye. Un proyecto de tres pendientes no necesita un catálogo de
prefijos, y una regla que lo obligue sería gold plating —lo que el método llama exigencia
desproporcionada—. Mi recomendación: que entre como **regla proporcional** (obligatoria desde que el
proyecto tiene dos clases de identificador con numeración propia, no desde el primer commit) y que
la frase del método diga ese umbral, no que lo deje implícito.

---

## PND-079 — El nombre de archivo es protocolo y no se traduce, y el método no lo dice en ninguna parte *(del experimento; `M-03`, y el dueño ya decidió la regla)*

- **Nodo:** `corpus/contratos` [nodo propuesto]
- **Origen:** el experimento de medición del método, hallazgo `M-03`. Lo medí yo sobre el brazo
  autónomo, que escribió su documentación en castellano porque el expediente del dueño la pedía en
  castellano.
- **Grupo:** G-METODO · **Severidad:** bloquea · **Repositorio:** método
- **Decisión del dueño (2026-11-01):** *"Ya lo decidí: el nombre de archivo es protocolo y no se
  traduce"*, y la herramienta ya lo implementó con su mensaje. Lo que falta es **que el método lo
  diga como regla**, no sólo que la herramienta lo explique en un error.
- **Quién decide:** la regla está decidida; el dueño aprueba **el texto** y dónde va.
- **Estado: abierto** — especificación escrita, borrador pendiente de aprobación.

**Qué está mal.** La compuerta compara **rutas literales**. El dato declara `docs/DECISIONS.md` y el
proyecto escribió `docs/DECISIONES.md`, con el contenido completo y bien hecho; la compuerta informó
**0 de 29 artefactos presentes**. Y la tensión que lo produjo no es un error de nadie: el expediente
del dueño pedía la documentación **en castellano** —y el método entero empuja en esa dirección, con
el nivel principiante y el "respondé en mi idioma"—, mientras su catálogo espera **nombres en
inglés**. Un dueño real se choca con lo mismo el primer día. La regla que falta es la mitad que la
herramienta no puede cubrir: **el nombre del archivo es parte del contrato, va en el idioma que el
dato declara y no se traduce; lo que se traduce es el contenido.**

**Evidencia medida (el experimento).** El brazo autónomo escribió `docs/ARQUITECTURA.md` y
`docs/DECISIONES.md`; la compuerta exigía `docs/DECISIONS.md` y reportó **0 de 29 presentes**. El
contenido existía. El silencio del método es lo que convirtió un criterio razonable del dueño en un
peldaño en rojo sin motivo visible.

**Mi reproducción (2026-11-01), sobre el dato y sobre el corpus.**

```
rutas declaradas por el dato (24 peldaños + 8 estaciones)  ->  42
rutas con un carácter del castellano                       ->  0
grep -niE "no se traducen" en los 36 archivos              ->  1, y es de las claves de configuración
```

Las cuarenta y dos rutas que el dato declara están en inglés y en mayúsculas, sin una tilde ni una
eñe, y el corpus dice *"no se traducen"* **una sola vez**: de las claves del archivo de
configuración, que entró con D-075 el 2026-10-29. O sea: el principio ya está escrito y ya está
peleado —el nivel de datos va en inglés porque no está traducido (D-051), y las claves que una
herramienta lee no se traducen (D-075)— y **nunca se extendió a las rutas de los artefactos**, que
son nivel de datos por el mismo argumento y son lo primero que un proyecto escribe. Es la misma
familia que `PND-063`: daño silencioso contra el lector que **obedece**, con la diferencia de que
acá el lector obedece al dueño en vez de al ejemplo.

**Criterio de aceptación por perfil.**

- *P8 (dueño de proyecto que aplica el método):* dado el perfil dueño, esta persona puede pedir la
  documentación en su idioma y saber, antes de que un peldaño le dé rojo, que **el nombre del
  archivo no es parte de ese pedido**; y si un peldaño le da 0 de 29, encuentra en el contrato la
  frase que lo explica sin tener que leer el mensaje de una herramienta.
- *P1 (herramienta consumidora):* dada una herramienta consumidora, esa herramienta puede comparar
  rutas literales sin tener que mantener alias por idioma, porque el método declara que la ruta es
  protocolo.
- *P6 (lector humano que entra por el documento principal):* dado ese perfil, esta persona entiende
  la distinción entre el nombre de un archivo y lo que el archivo dice, en una frase y con un
  ejemplo.

**Dónde iría.** La Parte A del documento principal (cómo se lee un peldaño), que es donde se explica
qué es un artefacto, y el contrato del peldaño 2, que es el primero que declara rutas. En los ocho
idiomas, en el mismo commit. Conviene además que el glosario lo lleve, porque "protocolo" usado así
—el nombre como contrato— es vocabulario que el método no explica todavía.

**Lo que esta entrada no incluye.** La mitad de la herramienta, que ya está hecha: el mensaje que
explica el rojo cuando encuentra el archivo con el nombre traducido. Y no propone aceptar alias por
idioma, que era la otra salida posible y el dueño ya decidió la contraria.

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

## PND-080 — El universo de la guarda de cifras derivadas no incluye la prosa, y la exclusión no está declarada *(propia, medida al escribir D-078)*

- **Nodo:** `build/cifras-derivadas` [nodo propuesto]
- **Origen:** medición propia del 2026-11-01, haciendo D-078. No la trajo una auditoría: apareció al
  preguntar qué cifras del árbol se vuelven falsas cuando entra una regla nueva.
- **Grupo:** G-METODO · **Severidad:** bloquea · **Repositorio:** método
- **Quién decide:** **el dueño**, y la pregunta es binaria: la prosa entra al universo de la guarda,
  o la exclusión se declara con su razón. Las dos salidas son aceptables; **ninguna declaración no
  lo es**.
- **Estado: abierto** — el defecto está medido y las cifras de hoy quedaron corregidas a mano en el
  mismo commit; lo que falta es la guarda o la exclusión escrita.

**Qué falta, completo.** `D-077` dejó una regla que no se negocia: una cifra escrita junto al nombre
de una colección que el dato declara **se deriva**. Y dejó una guarda que la exige,
`build/cifras_derivadas.mjs`, con una virtud que su propia decisión subraya —el mapa de colecciones
no se escribe, se deriva del dato, así que una colección nueva queda vigilada el día que entra—.
Lo que esa guarda **no** mira es la prosa: su universo son **catorce archivos** —las nueve fuentes de
`gates/`, el documento generado y los cuatro recursos publicados— y los veintisiete archivos del
corpus castellano, con sus siete traducciones, no están. Eso no es un olvido descubierto por
razonamiento: **se midió, y ya había pasado**.

**La evidencia, medida el 2026-11-01 sobre el árbol de `1a373c8`.** La cuenta de reglas del Anexo H
pasó a cuarenta y seis el 2026-10-27 con `D-070`, y cuatro días después:

- la **ficha del glosario** del documento principal —la entrada «Anexo H», que es donde un lector
  busca qué es— decía *«cuarenta y cinco reglas verificables, dieciocho de calidad del código y
  veintisiete de usabilidad»* en **seis de los ocho idiomas** (es, en, pt, de, ja, zh);
- la línea de la **Parte B** que describe el peldaño 9 decía *«el catálogo de las cuarenta y cinco
  reglas»* en **ocho de ocho**;
- y el francés y el italiano tenían el glosario **correcto** mientras el castellano, que es la
  fuente de verdad, lo tenía mal: `D-013` al revés, la misma forma que el `README.md` tuvo con el
  Anexo H (`D-061`).

Catorce líneas vivas y falsas, en siete idiomas, durante cuatro días, sin que nada se pusiera en
rojo. No las rompió nadie: se rompieron solas cuando entró UX-28, que es la definición del defecto
que `D-077` persigue, **una capa más afuera**. Y la cuenta de arriba es **un piso y no un total**:
la lista de palabras por idioma con la que se midió se perdió *ancres* en francés, así que hay al
menos una forma que la medición no vio. Se dice porque es la cara del denominador (`CQ-19.1`)
aplicada a la propia medición de este pendiente.

**Lo que se arregló en el mismo commit, y lo que no.** D-078 corrigió las catorce líneas y las puso
en cuarenta y ocho —la cuenta nueva—, en los ocho idiomas, más la cuenta de las que bloquean desde
el día uno (catorce a dieciséis) y la cuenta de la Parte A. Lo que **no** se arregló es la causa:
mañana entra otra regla y el mismo defecto vuelve, porque **nada mira la prosa**.

**Criterio de aceptación.** Una de estas dos, y la decide el dueño:

1. **La prosa entra al universo.** `build/cifras_derivadas.mjs` recorre los veintisiete archivos del
   corpus castellano y sus traducciones, con sus rojos deliberados, y el paso del flujo exige la
   línea medida. El costo es que la cifra hay que reconocerla en ocho idiomas, incluidos el japonés
   y el chino, donde se escribe con numerales chinos; la guarda tendría que deletrear en ocho
   idiomas o bien buscar los **patrones** de cada uno, con su registro de los que no sabe leer.
2. **La exclusión se declara, con su razón y su alcance.** El registro de exenciones de la guarda
   dice que la prosa queda afuera, por qué, y **qué protege en su lugar** —hoy, nada—, de manera que
   un lector que confía en la guarda no crea que mira lo que no mira.

Y una tercera cosa que vale en las dos salidas: la decisión que la resuelva **cita esta medición**,
porque una exclusión declarada sin el daño que ya ocurrió se lee como una comodidad.

## PND-081 — La traducción china del prompt del camino heredado numeraba sus cinco reglas 8, 11, 7, 12 y 13 *(propia, medida al renumerar por D-078)*

- **Nodo:** `corpus/evolutivo` [nodo propuesto]
- **Origen:** medición propia del 2026-11-01, haciendo la renumeración que D-078 pide. No la buscaba
  nadie: apareció al leer el bloque que había que reescribir.
- **Grupo:** G-IDIOMA · **Severidad:** bloquea · **Repositorio:** método
- **Quién decide:** nadie: es un defecto medido y su arreglo es mecánico.
- **Estado: abierto, arreglado en el árbol** — el bloque chino quedó con `9` a `13` en orden, igual
  que los otros siete idiomas. **Cierra con la fusión**, por D-057.

**Qué estaba mal.** El prompt inicial de la estación del contrato de convivencia heredado enumera
las cinco reglas que existen porque un modelo frente a código ajeno reescribe: en inglés y en seis
traducciones van `(7)` a `(11)`, continuando las seis del método. El bloque **chino** las numeraba
`（8）`, `（11）`, `（7）`, `（12）` y `（13）`: desordenadas, con dos números que ningún otro idioma
tenía y con el `9` y el `10` ausentes. Está así desde que la traducción existe —se verificó contra
`HEAD` antes de tocar nada—, y ninguna guarda lo veía: `build/prompts.mjs` exige que la pieza
**inglesa** sea idéntica byte a byte en las ocho versiones, que es lo que la vuelve una sola pieza,
y no mira la numeración de los bloques traducidos, que son prosa de cada idioma.

**Qué deja.** Un lector chino que obedece el prompt escribe un contrato cuyas reglas se llaman 7, 8,
11, 12 y 13 y le pide al dueño que acepte «las reglas 1 a 13» cuando hay once; y si pregunta por la
regla 9, no existe. Es daño silencioso causado por la traducción, y le pasa al lector que **obedece**
(`D-075`, mismo patrón).

**Qué se hizo.** La renumeración de D-078 —las cinco pasan de `(7)..(11)` a `(9)..(13)` porque el
método ahora tiene ocho reglas mínimas— se hizo **por orden de aparición y no por valor**, en los
ocho idiomas, para no arrastrar el desorden chino a la numeración nueva.

**El enunciado, que vale más que el arreglo, y lo pidió el dueño.** **Una compuerta que compara
traducciones declara qué compara y qué no, y la frase con la que se la cita no puede afirmar más que
su universo.** La compuerta no miente: `build/prompts.mjs` hace exactamente lo que dice —la pieza
inglesa es una sola y es idéntica en las ocho versiones— y estuvo verde con razón. La que miente es
la frase con la que la citamos, que es «las ocho versiones dicen lo mismo», y que afirma sobre los
bloques traducidos una propiedad que ningún instrumento mira. Es `CQ-19.3` en su forma más
incómoda, porque el universo declarado y el universo citado se separaron en el repositorio que
escribió la regla.

**Si es una quinta cara de `CQ-19`, lo decide el dueño, y mi recomendación es que no.** El enunciado
tiene dos mitades con obligados distintos. La primera —que el instrumento declare qué compara y qué
no— **ya es `CQ-19.3`**: este defecto no es un hueco de la cara, es su primer caso medido en el
corpus del propio método, y eso la fortalece en lugar de pedirle una hermana. La segunda —que la
frase que cita una compuerta no afirme más que su universo— **no es una propiedad de un instrumento
sino de quien lo cita**, así que su lugar natural es donde ya viven las versiones de conducta, que
es el contrato de convivencia, y no una cara del anexo. Agregar `CQ-19.5` costaría estirar el
enunciado de `CQ-19` —que habla de lo que un instrumento informa— para que cubra lo que una persona
escribe, que es el movimiento por el que `M+06` quedó afuera de la familia.

**Criterio de aceptación.** Una guarda que compare, bloque por bloque y en los ocho idiomas, la
**secuencia de números** de un prompt traducido contra la del inglés: la pieza inglesa ya está
candada byte a byte, así que lo único que falta es exigir que la traducción lleve los mismos números
en el mismo orden. Con su rojo deliberado: el bloque chino tal como estaba commiteado el
2026-11-01, que tiene que volver a caer si alguien lo reintroduce.

## PND-082 — Las cinco comprobaciones de CQ-18 no tienen identificador, así que no se puede apagar una sola *(propia, consecuencia declarada de D-078)*

- **Nodo:** `corpus/anexo-h` [nodo propuesto]
- **Origen:** la propia decisión D-078, que al darle caras a `CQ-19` y a `CQ-20` deja a `CQ-18`
  siendo la única regla con caras no direccionables. Está dicho en el anexo y en el dato, no
  escondido.
- **Grupo:** G-METODO · **Severidad:** avisa · **Repositorio:** método
- **Quién decide:** **el dueño**, y el orden ya lo decidió: `CQ-19` sale con el mecanismo, y `CQ-18`
  recibe identificadores después.
- **Estado: abierto** — declarado en `heuristics.faces.rules_with_faces_today` y en la sección 2 del
  Anexo H de los ocho idiomas.

**Qué falta, completo.** `CQ-18` (accesibilidad básica) enuncia **cinco** comprobaciones en una sola
oración: contraste, etiquetas en los campos, foco visible, navegación por teclado en los flujos
principales e imágenes con texto alternativo. Ninguna tiene identificador propio, así que un
proyecto que necesite apagar **una** —la navegación por teclado en una pantalla heredada, por
ejemplo— tiene que apagar la regla entera, que es justo lo que el mecanismo de caras existe para
evitar: una regla que sólo se puede apagar entera empuja a apagar de más.

**Por qué no entró en el mismo lote.** Porque el método queda, mientras tanto, con una regla que se
puede apagar por cara y otra que no, y un lector que necesite apagar una comprobación de `CQ-18` va
a creer que puede. Eso es lo que esta entrada registra. **Darles identificador es agregar y no
renombrar**, así que la disciplina append-only lo permite y no hay citas esperando: `CQ-18` sigue
diciendo lo que dice, y `CQ-18.1` a `CQ-18.5` serían entradas nuevas con su `since_version`.

**Criterio de aceptación.** Las cinco comprobaciones con su identificador y su fila en el Anexo H de
los ocho idiomas, extraídas y no transcritas al dato, con su procedencia; el enunciado de `CQ-18`
sin cambiar una palabra; y el validador exigiendo lo mismo que ya exige a las caras de `CQ-19`.

## PND-083 — La regla de precedencia del castellano no tiene verificación cruzada, así que un error de la fuente se publica ocho veces *(propia, medida al corregir las cifras de D-078; el dueño pidió escribirla)*

- **Nodo:** `corpus/idiomas` [nodo propuesto]
- **Origen:** medición propia del 2026-11-01 y pedido explícito del dueño el mismo día: *"Si eso no
  está escrito en algún lado, escribilo."*
- **Grupo:** G-IDIOMA · **Severidad:** bloquea · **Repositorio:** método
- **Quién decide:** el dueño, porque es una regla del método y no un arreglo.
- **Estado: abierto.** Los dos casos medidos están arreglados en el árbol; lo que falta es el
  enunciado en el corpus y su verificación.

**El enunciado.** **Una regla de precedencia sin verificación cruzada convierte un error de la
fuente en ocho errores, y las copias correctas no tienen manera de defenderse.** `D-013` dice que el
castellano es la fuente de verdad y que las siete traducciones lo siguen en el mismo commit, y toda
la doctrina de las traducciones está escrita en esa dirección. Lo que ninguna parte del método dice
es qué pasa **cuando la fuente se equivoca**: la regla de precedencia no se suspende, así que
propaga el error, y una traducción que estaba bien queda registrada como la desviada.

**Los dos casos medidos, y los dos del mismo repositorio.** El primero es el que `D-061` ya anotó al
pasar: `README.md` no listaba el Anexo H en su tabla y **las siete traducciones sí lo listaban**, así
que la fuente de verdad era la única equivocada y las siete copias correctas parecían las
divergentes. El segundo se midió el 2026-11-01 al corregir las cifras de `D-078`: la ficha del
glosario del Anexo H decía *cuarenta y cinco reglas* en seis de los ocho idiomas, y los dos que la
tenían **bien** eran el francés y el italiano —el castellano, que manda, la tenía mal—. Las dos veces
el defecto se encontró leyendo, no midiendo, y las dos veces lo encontró una persona.

**Y una tercera forma, adentro de un mismo idioma, medida el mismo día.** El dueño pidió que quedara
anotada porque es del tema y porque **así apareció**: la regla (7) del contrato de convivencia, recién
escrita por `D-078`, pedía recibo para **todo** número que el agente entrega, cuando el Anexo H se lo
pide a *«todo instrumento con el que el proyecto decide»* y la línea que distingue los dos recibos,
cuatro renglones más abajo, dice *«cada vez que una cifra decide algo»*. **Cada una de las tres se lee
perfecta sola; las tres juntas se contradicen**, y el contrato era el que pedía más. No lo encontró
quien leyó una redacción: lo encontró quien comparó las tres. Es la misma verificación cruzada que
esta entrada pide entre idiomas, aplicada **adentro de uno**, y sube el alcance de lo que falta: dos
copias de una obligación en distintos documentos del mismo idioma tampoco tienen hoy quién las
compare. La regla quedó acotada en los ocho idiomas antes de publicarse.

**Qué deja.** Que la propiedad que el método reclama de su corpus —ocho versiones que dicen lo
mismo— esté sostenida por la dirección de la copia y no por una comparación. Mientras la
verificación sea «la traducción coincide con el castellano», un error del castellano sale **verde
ocho veces**, y el único mecanismo que queda es que alguien lea en un idioma que no es el suyo. Es
la familia de `CQ-19.2`, la independencia: el instrumento que verifica las traducciones depende del
artefacto que mide.

**Qué NO es.** No es pedir que las traducciones puedan corregir el castellano por su cuenta: la
precedencia se queda, porque sin ella hay ocho fuentes. Lo que se pide es que **la divergencia se
detecte en las dos direcciones y la resuelva el dueño**, que es exactamente la forma que `D-072` ya
eligió para el vocabulario de la portada —cuando la forma elegida no es la que el corpus usa, el
corpus no se toca de callado: se registra con su cuenta y lo decide el dueño—.

**Criterio de aceptación.** Dos piezas. (1) El enunciado escrito en el corpus, donde la doctrina de
los idiomas se lee, en los ocho idiomas, diciendo que una divergencia entre el castellano y una
traducción es un hallazgo **sin presumir cuál de los dos lados está mal**. (2) Una guarda que compare
en las dos direcciones lo que hoy se compara en una sola, con su rojo deliberado: el `README.md` tal
como estaba antes de `D-061` y la ficha del glosario tal como estaba commiteada en `1a373c8`, que
tienen que volver a caer si alguien los reintroduce. Mientras la guarda no exista, lo que vale es el
enunciado: un lector que sabe que la fuente puede estar mal lee distinto.

## PND-084 — Un estado del veredicto significa a la vez «el método declaró que esto no lo abarca» y «nadie declaró el medidor» *(lo trajo el consumidor; `M+17`, reescrita por el dueño)*

- **Nodo:** `gates/esquema` [nodo propuesto]
- **Origen:** lo trajo **el consumidor**, como `M+17` del experimento de medición del método. La
  primera redacción decía que el método publica sus reglas «sin publicar con qué se miden», y el
  dueño la **retiró el 2026-11-01** al verificar que eso es `D-075`, su propia decisión del
  2026-10-29, con el número medido y su frase al lado: *«el método no abarca con qué se mide cada
  regla y eso queda a criterio de quien mide»*. Lo que queda de la mejora es lo que la refutación
  dejó, y es otra cosa: **D-075 decidió no llenar la celda; no decidió que el consumidor no pueda
  distinguir una decisión de un descuido.**
- **Grupo:** G-API · **Severidad:** bloquea · **Repositorio:** método (el vocabulario) y consumidor
  (lo que computa)
- **Quién decide:** **el dueño**, porque el vocabulario de situación de una regla es dato publicado
  y append-only.
- **Estado: abierto.** Nada está arreglado: es una entrada nueva del mismo día en que se retiró la
  que la originó.

**El enunciado.** **Un estado que significa dos cosas no es un estado.** El dato publica el
vocabulario de situación de una regla en `gates/schema.json#enums.rule_situation`, y el evaluador de
referencia pone `declared_not_measured` con esta nota: *«this installation did not measure it: it is
not read as green»*. Ese mismo valor cubre dos situaciones que no son la misma: **«el método declaró
que el medidor es del proyecto y el proyecto no lo declaró»** y **«nadie lo declaró y nadie lo
miró»**. La primera es una decisión escrita; la segunda es un descuido. Y cuando alguna de las que
bloquean cae ahí, el veredicto de la corrida entera pasa a `not_measured`, así que la ambigüedad
sube de la fila al tablero.

**La evidencia, medida el 2026-11-01 sobre `gates/` de este repositorio.** De las **48** reglas,
**31** declaran `checker_declared_by: adapter` y **17** `owner`; el puntero del adaptador
(`adapters.annex_columns.covers`) publica **seis** celdas, de las cuales **cinco** son de reglas que
defieren a él —`CQ-12` declara `owner` y tiene celda igual—, y la forma del archivo del dueño está
marcada `illustrative: true` con la advertencia de que tomar esos nombres por defecto **es inventar
la capa 2**. Resultado: **veintiséis reglas defieren al adaptador y no tienen celda publicada**, más
las **seis caras** de `CQ-19` y `CQ-20`, que no declaran medidor propio y heredan el de su regla. La
herramienta del otro lado ve **veintiséis filas iguales** donde hay veintiséis decisiones escritas y
cero descuidos. Y conviene decir lo que este lote le hizo al número: **lo empeoró en dos**, porque
`CQ-19` y `CQ-20` entraron del lado de las que no tienen celda.

**Qué NO se pide, y está decidido.** No se pide publicar la celda que `D-075` decidió no publicar.
La decisión se mantiene entera: el método no abarca con qué se mide cada regla, el primer hueco se
cierra **declarándolo y no llenándolo**, y las nueve claves de `measured_by` siguen ilustrativas por
decisión escrita.

**Qué se pide.** Partir el estado en dos: *fuera del alcance del método, por decisión* contra *sin
declarar*. Y no hay que decidir nada nuevo para derivarlo, porque **las dos piezas ya están en el
dato**: `checker_declared_by` dice de quién es el medidor, y `measured_by.illustrative` dice que lo
que el método muestra es una forma y no un valor. Es `D-076` en la capa del medidor —la misma forma
que obligó a escribir `end_users_outside_the_organisation`, donde la ausencia de una clave
significaba a la vez «escalada declinada con fundamento» y «nadie la miró»—.

**Criterio de aceptación.** Un valor nuevo de `rule_situation`, **agregado y no renombrado**, con su
`since_version`, derivado de `checker_declared_by` y de `measured_by.illustrative` y no declarado a
mano regla por regla; `declared_not_measured` sin cambiar una palabra; el evaluador de referencia
informando los dos conjuntos separados y diciendo el denominador de cada uno (`CQ-19.1`); el
diferencial de un upgrade contándolo, porque un estado nuevo cambia lo que un proyecto lee de su
propio tablero (`D-068`, `D-076`); y el rojo deliberado de las veintiséis, que tienen que aparecer
del lado de la decisión y no del lado del descuido.

## PND-085 — El presupuesto de reglas del contrato de convivencia no es un número, y la cifra de la alarma puesta como techo deja en infracción al único caso real *(del experimento; `M+18`, reescrita por el dueño con la medición en la mano)*

- **Nodo:** `corpus/peldano-01` [nodo propuesto]
- **Origen:** `M+18` del experimento de medición del método. La primera redacción buscaba **el
  número** —cuántas reglas aguanta el contrato— y el dueño la reescribió el 2026-11-01 después de
  medir el contrato de convivencia del brazo que recorrió la escalera completa, corriendo él mismo
  el contador de ese proyecto.
- **Grupo:** G-METODO · **Severidad:** avisa · **Repositorio:** método
- **Quién decide:** el dueño, y ya decidió: **no se busca el número**. Lo que falta es escribirlo.
- **Estado: abierto.** Nada tocado: la señal de alarma del peldaño 1 sigue diciendo lo que decía.

**La medición que volteó la pregunta.** El contrato de convivencia de ese proyecto tiene
**veintidós reglas en vigencia** —quince obligatorias, ocho propuestas y una de ellas rechazada—, y
la cifra **la cuenta una máquina**: el proyecto se escribió su propia compuerta para contarlas. Ese
contrato se escribió cuando el mínimo que el método pedía eran **seis**, así que el proyecto agregó
dieciséis. De dónde vinieron es el dato que cambia la conclusión: **nueve las dictó el dueño** —dos
en la aceptación, dos porque las pide la consigna del peldaño 2, dos en el 5, una en el 10 y dos al
cerrar un pendiente— y **siete son propuestas del agente, aprobadas regla por regla**. El
crecimiento no lo infló el agente: fue el método funcionando.

**Qué deja la cifra de la alarma leída como techo.** La señal de alarma del peldaño 1 dice *«nadie
respeta veinte reglas; se respetan seis u ocho»*, y desde `D-078` el mínimo del método son **ocho**,
así que el lector queda en el techo de la propia frase el día que cumple el mínimo. Si ese número se
tomara como presupuesto, **el proyecto que aplicó el método con más cuidado queda catorce reglas en
infracción, por haber hecho lo que el método le pidió**. Una compuerta que nace en rojo contra el
único caso real que el método tiene no es un presupuesto. Y hay un segundo dato que lo confirma: en
el camino evolutivo-correctivo sobre un sistema heredado el piso ya es **trece** antes de que el
proyecto agregue nada —ocho del método más cinco del legado—, así que un techo de ocho dejaba en
infracción a ese camino el día uno.

**El enunciado, que es una propiedad y no una cantidad.** **Una regla entra con el fallo medido que
la hizo necesaria y, donde se pueda, con quién la cuenta —o no entra—; y el total lo cuenta una
máquina.** Lo que hizo que veintidós reglas siguieran siendo respetables no fue la cantidad: fue que
cada una llegó con el fallo que evita y la mayoría con su compuerta. Y la mitad mecánica no es un
adorno: ese mismo contrato decía *«quince en vigencia»* cuando contadas eran **diecisiete**, hasta
que una compuerta las contó. La cantidad no era el problema; la cifra a mano sí, que es `D-077` en
la capa del proyecto.

**Criterio de aceptación.** Cuatro piezas, en los ocho idiomas. (1) La señal de alarma del peldaño 1
deja de dar una cifra como techo y da la propiedad. (2) El prompt de cierre pide que cada regla
propuesta llegue con el fallo medido que la hizo necesaria, y **lo que necesita motivo escrito es
una regla sin su fallo**, no la novena regla. (3) La invitación dice *«una regla tuya entra con el
fallo que la hizo necesaria, y el total lo cuenta una compuerta»* y no *«el presupuesto está
gastado»*. (4) La verificación de completitud del peldaño 1 pregunta por el contador y no por el
número.

## PND-086 — Los tres tipos de recibo no tienen la misma cardinalidad, así que un lote en tres pendientes paga tres veces la misma regresión o deja dos sin ninguna *(lo trajo la herramienta sobre su propio trabajo; `M+19`)*

- **Nodo:** `corpus/peldano-08` [nodo propuesto]
- **Origen:** lo observó **la herramienta sobre su propio trabajo**, lo nombró en su informe y **no
  lo cambió**: *«un recibo respalda un solo pendiente, así que un lote entregado en tres pendientes
  paga tres veces la misma batería o deja dos sin regresión»*. El dueño lo verificó en el código del
  consumidor el 2026-11-01: el campo es singular y el resumen filtra por igualdad exacta.
- **Grupo:** G-METODO · **Severidad:** bloquea · **Repositorio:** método (el enunciado) y consumidor
  (la dirección del recibo)
- **Quién decide:** el dueño, porque es el enunciado del peldaño 8 y toca `D-033`.
- **Estado: abierto.**

**El enunciado.** **Un recibo se direcciona por el objeto del que es un hecho, y la regresión es un
hecho sobre un estado del árbol y no sobre un pendiente.** El método pide tres recibos —el rojo
primero, el verde y la regresión— y les da **la misma forma de dirección**, pero el rojo y el verde
dependen del **pendiente** y la regresión depende del **estado del árbol**: el mismo commit es el
mismo hecho para todos los pendientes que cierran en él. No falta una regresión: **hay una
haciéndose pasar por tres**.

**Qué deja, y por qué la rama mala es la que no se ve.** Con un lote que cierra tres pendientes, la
disyuntiva es correr tres veces la misma batería sobre el mismo árbol —caro y sin información
nueva— o dejar dos pendientes sin recibo de regresión. La segunda rama es la peor **porque no
avisa**: el pendiente cierra, el resumen no muestra regresión y nada dice *«falta»* —dice **nada**—,
que es la forma exacta de `CQ-19.1`, un silencio que se lee igual que la salud.

**Qué se pide.** Que la regresión se direccione por su **estado del árbol** y respalde a todos los
pendientes de ese estado **declarando cuáles**, porque un conjunto no declarado se leería como
«cubre todo», que es `CQ-19.3`; y que la compuerta verifique que **el commit del recibo sea el que
se entrega**. Una regresión de ayer sobre un árbol de hoy no es una regresión: es una foto.

**Dónde vive.** En el peldaño 8, junto a `D-033`, y conviene que entre con la línea que `D-078`
acaba de escribir sobre los dos recibos, porque las dos son sobre lo mismo: **qué recibo corresponde
a qué afirmación**.

**Criterio de aceptación.** El enunciado en el contrato del peldaño 8 de los ocho idiomas, diciendo
los tres recibos con su objeto y su cardinalidad; y, del lado del consumidor —que se mide en su
repositorio y no acá—, la dirección por estado del árbol con el conjunto declarado y la compuerta
que exige que el commit del recibo sea el entregado.

## PND-087 — La regla (5) del contrato de convivencia parte en dos lo que el propio método parte en tres *(propia, medida al reportar PND-081; el dueño decidió el nombre y la forma rectificando los suyos)*

- **Nodo:** `corpus/peldano-01` [nodo propuesto]
- **Origen:** salió de mi propio reporte de `PND-081`. La numeración de los cinco bloques traducidos
  la verifiqué **leyendo los ocho y comparando los números a mano**; lo dije así —reproducible pero
  no automática— y el dueño la clasificó, correctamente y con el único vocabulario que hay, como
  *«te lo creo y queda anotado como creído»*. Esa clasificación **es** el defecto: el binario obligó
  a tirar una medición reproducible al casillero de las creencias. El dueño lo levantó a pendiente
  el 2026-11-01 y decidió el nombre y la forma el mismo día.
- **Grupo:** G-METODO · **Severidad:** bloquea · **Repositorio:** método
- **Quién decide:** el dueño, **y ya decidió**: el nombre, la forma y las dos obligaciones. Lo que
  falta es escribirlo.
- **Estado: abierto.** Nada tocado: la regla (5) sigue diciendo lo que decía.

**El binario, y las dos salidas malas.** La regla (5) del contrato de convivencia pide *«nunca
reportes como hecho algo que no verificaste; separá siempre lo que verificaste de lo que creés»*.
Son dos casilleros y las cosas son tres: lo que verificó una máquina, lo que verificó una persona de
manera reproducible y sin que ninguna guarda lo cuide, y lo que se cree. Con dos casilleros, el del
medio tiene que ir a alguno y los dos están mal. Si va a **verificado**, el dueño supone una
máquina, y suponer una máquina es suponer que el hecho va a seguir siendo cierto mañana sin que
nadie mire: es un estado que se lee igual que la salud, que es el enunciado de `CQ-19.1` aplicado al
informe en vez de al instrumento. Si va a **creído**, se tira a la basura una medición que se puede
repetir y discutir, y eso es peor que exagerar: es evidencia borrada.

**El caso medido, y es del mismo día.** `PND-081` —la traducción china que numeraba sus cinco reglas
`8, 11, 7, 12, 13`— no la encontró ninguna guarda y no la puede encontrar ninguna, porque no existe:
la verifiqué leyendo los ocho bloques y comparando las secuencias. Es repetible por cualquiera en
diez minutos, con el archivo a la vista, y no es una creencia. El criterio de aceptación de esa
entrada es, justamente, **la guarda que falta**.

**Por qué es un patrón del método y no una excepción.** Este método ya partió un estado en tres
**cuatro veces, y las cuatro con razón**: `D-054` (la publicación verifica contra producción y separa
el verde del aviso y del rojo), `D-058` (*no haber podido mirar es rojo y no verde*), `D-076` (el
umbral `end_users_outside_the_organisation`, con sus tres estados dichos) y `PND-084`
(`declared_not_measured`, que hoy significa dos cosas). Las cuatro son sobre lo que el **sistema**
mide. El binario de la regla (5) es el que faltaba, y es el que está más cerca del dueño, porque es
sobre lo que el agente le **entrega en la conversación**.

**El nombre, y los dos que se descartaron.** **«Verificado sin guarda»** (`verified without a
gate`). El criterio que lo decide es que **nombre lo que le falta y no lo que tiene**, así no se
puede usar para quedar bien: un estado que se llama por su carencia no sirve de puerta de escape. Se
descartaron dos. *«Verificado a mano»* choca de frente con la **cifra a mano** que `D-077` persigue:
sería usar como etiqueta positiva la misma palabra con la que el método nombra lo que no hay que
hacer. Y *«verificado leyendo»* cubre sólo los ojos: una medición humana reproducible puede ser
contar, correr un comando y mirar la salida, o comparar dos archivos, y ninguna de las tres es leer.

**La forma: un tercer valor y no una novena regla.** Entra como tercer valor de la regla (5), que es
la que ya lleva el binario defectuoso. Eso hace crecer el **vocabulario de una regla que ya existe**
y **no mueve la cuenta de reglas**, que es exactamente la tensión de `PND-085`: una novena regla para
arreglar el problema de que hay ocho es el problema otra vez.

**Las dos obligaciones que el estado arrastra, y sin ellas es una etiqueta.** La primera: una
afirmación en ese estado **nombra la guarda que la volvería verde**. Con eso el estado deja de ser
una etiqueta y se vuelve un pendiente solo —es lo que el criterio de aceptación de `PND-081` ya es,
subido un nivel: de criterio de un pendiente a condición de la afirmación—. La segunda: **declara
quién y cuándo**. Una medición humana reproducible sin autor ni fecha no se puede repetir ni
discutir, y entonces es una creencia con mejor nombre.

**Lo que esto no es.** No es la copia de una regla del Anexo H adentro de un prompt, que es lo que
`D-044` prohíbe y lo que `D-078` tuvo que argumentar para las reglas (7) y (8): `CQ-19` y `CQ-20`
hablan de los **instrumentos del sistema**, y esto le agrega un valor a una regla de **conducta** que
ya existía desde el primer día. No hay enunciado del anexo que se duplique.

**Dónde entra, y con quiénes.** Con `PND-084` y `PND-085`, **porque los tres son el mismo
movimiento**: uno parte un veredicto en dos, otro reemplaza una cifra por una propiedad y éste parte
un binario en tres. Los tres son sobre el vocabulario con el que se informa, y ninguno de los tres
agrega una regla.

**Criterio de aceptación.** (1) La regla (5) con sus tres valores en el prompt del peldaño 1 de los
ocho idiomas, cada valor nombrando lo que le falta. (2) Las dos obligaciones **adentro** del
enunciado y no en una nota al pie. (3) La verificación de completitud del peldaño 1 pregunta por el
tercer valor con sus dos obligaciones, y no sólo por las ocho reglas. (4) Y lo que ninguna prueba de
acá puede verificar, dicho de frente: **si una afirmación concreta está en el casillero correcto lo
juzga el dueño**. Lo que sí se puede exigir por máquina es que los tres valores estén en el prompt
del peldaño 1 en los ocho idiomas y que la pieza inglesa siga siendo idéntica, que es lo que
`build/prompts.mjs` ya hace.

## PND-088 — Un instrumento informó «anotada» las dos veces que corrió, y la segunda duplicó: no miró el estado que iba a cambiar *(la herramienta sobre su propio trabajo; el dueño pidió las dos lecturas sin desempate)*

- **Nodo:** `corpus/peldano-14` o `corpus/peldano-09` [nodo propuesto], según la lectura que cierre.
- **Origen:** lo midió **la herramienta sobre su propio trabajo** el 2026-11-01, escribiendo el
  registro de `D-078`. El dueño le agregó el enunciado que lo hace verificable y pidió explícitamente
  que la entrada quede **con las dos lecturas y sin desempate**, para cerrarla él.
- **Grupo:** G-METODO · **Severidad:** bloquea —una cara no declara severidad propia y hereda la de
  su regla (verificado en `gates/heuristics.json`: las seis caras de `CQ-19` y `CQ-20` no llevan
  `initial_severity`), y las dos reglas candidatas bloquean— · **Repositorio:** método
- **Quién decide:** el dueño, **y a propósito no está decidido**.
- **Estado: abierto**, con la decisión pendiente y declarada.

**El caso medido.** El programa con el que inserté la nota de `PND-083` no era idempotente. Lo corrí
dos veces —la segunda porque dudé de que la primera hubiera corrido— e **insertó la nota las dos
veces, informando «anotada» las dos**, con código de salida 0 las dos. Lo agarré **contando
apariciones antes de commitear**, no leyendo el archivo. Si no contaba, el registro quedaba con la
nota duplicada y el commit la publicaba.

**El enunciado, del dueño, y por qué es el que se puede verificar.** *Un instrumento que informa
éxito sin mirar si ya estaba hecho no es no-idempotente: es un instrumento que no mira el estado que
va a cambiar.* La diferencia no es de estilo. «No idempotente» nombra una propiedad del
**resultado** —correrlo dos veces no da lo mismo—, que se descubre corriéndolo dos veces y mirando,
o sea después del daño. «No mira el estado que va a cambiar» nombra la **omisión en el instrumento**
—no leyó antes de escribir—, que se ve en el instrumento mismo, con una sola corrida, y que una
revisión o una compuerta puede exigir. Es la familia de `CQ-20.1` con el signo invertido: ahí el
comando escribía diciendo que no tocaba nada; acá dice que hizo algo que ya estaba hecho.

**Las dos lecturas, y lo que las separa.**

1. **Cara de `CQ-20`** —el privilegio y el efecto, no el informe—. Es la lectura del dueño. Lo que
   falló fue una **escritura que no debía ocurrir**, y `CQ-20` es la regla de las escrituras de una
   verificación. A favor: no estira el enunciado de `CQ-19`, que es el movimiento por el que `M+06`
   quedó afuera de la familia, y la pareja con `CQ-20.1` se lee sola.
2. **Cara de `CQ-19`** —el informe—. Lo que el dueño **vio** fue el informe: «anotada» se leyó igual
   cuando insertó y cuando duplicó, que es un estado que se lee igual que la salud, el enunciado de
   `CQ-19.1`. A favor: el daño llega por el informe, que es el sujeto de `CQ-19`, y la detección fue
   **contar**, que es su remedio.

**Lo que no tengo para desempatar.** Depende de qué protege la regla. Si protege el **estado** —que
no se escriba dos veces—, es `CQ-20`. Si protege **que el dueño pueda saber** —que el informe no
mienta—, es `CQ-19`. En el caso medido pasaron las dos cosas, y por eso el caso no desempata solo.

**La tercera salida, descartada midiendo.** No es la lectura amplia de una cara que ya existe.
`CQ-20.1` pide que un comando presentado como de **sólo lectura** corra sin permiso de escribir y que
el privilegio se declare al lado del resultado; `CQ-19.1` pide el denominador de una medición que
recorre un conjunto. Ninguna de las dos, leída como está escrita, le pide a un instrumento que
**escribe a propósito** que lea primero el estado que va a cambiar. Así que es un agregado con cara
nueva, y no una interpretación de lo ya publicado.

**El precio, que es chico y conviene decirlo.** Una cara más deja a `CQ-20` en tres o a `CQ-19` en
cinco. La cuenta de caras **se deriva** (`D-077`), así que ninguna cifra escrita se vuelve falsa, y el
único costo real es que el informe de cumplimiento se alarga en una línea. `PND-082` queda igual:
`CQ-18` sigue siendo la única regla con comprobaciones que no se pueden apagar de a una.

**Criterio de aceptación.** El dueño elige la lectura; la cara entra con su identificador
(append-only), su enunciado **una sola vez** en el Anexo H castellano y extraído al inglés, su
procedencia declarada por cara, la versión del catálogo con su huella y sus textos en el catálogo de
etiquetas; y el caso medido queda como su «fallo que evita», con su referencia, cuando el corpus se
toque.

## PND-089 — La tabla del resumen la cuenta una máquina y el párrafo que la explica no, así que una de sus cifras ya fue falsa *(propia, medida mutando la guarda)*

- **Nodo:** `tests/pending-resumen` [nodo propuesto]
- **Origen:** medición propia del 2026-11-01. Salió de **recontar** las cifras del resumen para
  escribir las entradas de este lote, no de leerlo.
- **Grupo:** G-METODO · **Severidad:** avisa · **Repositorio:** método
- **Quién decide:** el dueño, y es la misma pregunta binaria de `PND-080`: la cifra entra al universo
  de la guarda, o la exclusión se declara con su razón.
- **Estado: abierto** —la cifra que estaba mal se corrigió en el commit anterior; lo que falta es la
  guarda o la exclusión escrita.

**El defecto.** `tests/pending_resumen.test.mjs` existe justamente contra esto: cuenta las entradas
del archivo y exige que la tabla del resumen sea exactamente eso, sin huecos ni repetidos. Nació de
un defecto medido —con cinco cierres en un día la tabla seguía diciendo tres cerrados cuando ya eran
ocho—. Lo que **no** mira es el párrafo pegado abajo de la tabla, donde el mismo hecho está escrito
**en palabras**. De ese par, la guarda verifica el **rango de ids** y no la **cuenta**. Y el párrafo
sigue con una docena de cifras más de la misma clase —veintidós de la auditoría externa, cuatro
propias, dieciséis derivadas, diez de la retrospectiva, quince del experimento—, todas a mano.

**La evidencia, medida y no razonada.** Cambié *«Ochenta y seis entradas»* por *«Doscientas cuarenta
entradas»* en el disco y corrí la prueba sola: **5 de 5 en verde, 0 fallos**. La guarda no la mira.
El árbol quedó como estaba.

**Y ya había pasado.** El mismo párrafo decía *«el mismo trabajo dejó tres entradas nuevas»* cuando
ya eran cuatro: `PND-083` había entrado y la frase quedó vieja **en el mismo commit que la escribió**.
La encontré recontando para escribir este lote, no leyendo. Es la misma forma que `PND-064` —una
cifra a mano junto a una colección que se deriva— y la misma que `PND-080` —la prosa fuera del
universo de la guarda—, en el único archivo donde el método se aplica a sí mismo y a diez líneas de
la guarda que ya existe.

**La severidad, dicha porque es mi lectura.** **Avisa** y no bloquea: este archivo no es corpus
publicado, no viaja en ocho idiomas, y lo que un lector usa como plan es la **tabla**, que sí la
cuenta una máquina. Lo que la cifra falsa cuesta es la credibilidad del registro, no un proyecto
detenido. Marcarla bloqueante sería inflar la fila de G-METODO por una cifra en palabras.

**Criterio de aceptación.** Una de estas dos, y la decide el dueño:

1. **La cuenta entra al universo de la guarda.** La prueba exige que el párrafo diga la misma cuenta
   que la tabla, con su rojo deliberado. Y una advertencia medida para que la salida no se compre
   barata: `cardinal()` de `build/gates_lib.mjs` deletrea en **inglés**, y este archivo es
   castellano, así que reusarlo no alcanza —habría que escribir un deletreador castellano, que es una
   segunda copia de la misma función, o que el párrafo diga la cifra en numerales, que es verificable
   con una línea—. Esa elección es parte de la decisión y no un detalle de implementación.
2. **La exclusión se declara**, en el comentario de cabecera de la prueba, con su razón y con qué
   protege en su lugar.

Y en las dos salidas: la decisión **cita esta medición**, porque una exclusión declarada sin el daño
que ya ocurrió se lee como una comodidad.

## PND-090 — La compuerta de `main` pide una aprobación que, para el único que puede escribir, no se puede dar: el único camino es el bypass *(la trajo el dueño al fusionar `#31`)*

- **Nodo:** `gobernanza/main-protegida` [nodo propuesto]
- **Origen:** el dueño, el 2026-11-01. No la trajo una auditoría ni una prueba: la trajo el **acto de
  pasar la compuerta** y ver que el único camino disponible era saltearla.
- **Grupo:** G-TRAZABILIDAD · **Severidad:** avisa · **Repositorio:** método (configuración del
  repositorio, no código)
- **Quién decide:** el dueño. La recomendación es suya, está escrita abajo tal como la dictó y no la
  toco.
- **Estado: abierto**

**Qué está mal.** El conjunto de reglas que protege `main` se llama «main protegida: PR + aprobacion
de propietario» y pide una aprobación que, para la única persona con permiso de escritura en este
repositorio, **no existe forma de dar**: GitHub no permite aprobar tu propio pull request. Así que la
regla no se cumple, se saltea. Y una compuerta cuyo único camino es el bypass entrena exactamente el
hábito que el método existe para evitar —es la misma forma que este registro ya anotó dos veces: una
compuerta que nace en rojo se desactiva en la primera semana—.

**La configuración viva, medida y no recordada.** `gh api repos/pkuschnirof/urazuke/rulesets`: un
solo conjunto, `id 25306517`, `enforcement: active`, creado el 2026-10-17 a las 11:57:31 (-03). Tres
reglas —`deletion`, `non_fast_forward` y `pull_request`— y la última con
`required_approving_review_count: 1`, `require_code_owner_review: true`,
`require_last_push_approval: true`, `required_review_thread_resolution: true`,
`require_extra_approval_for_unattributed_changes: true` y `allowed_merge_methods: ["squash"]`.
`bypass_actors` tiene **una** entrada: el rol de administrador, con `bypass_mode: always`; y el
propio dato declara `current_user_can_bypass: "always"`. La protección clásica de rama **no existe**
(`gh api .../branches/main/protection` devuelve `404 Branch not protected`), así que ese conjunto de
reglas **es toda la compuerta**: no hay una segunda mitad en otro lugar que compense lo que ésta no
hace.

**Por qué no se puede cumplir, dicho con precisión, porque la frase corta es falsa.** La regla **no**
es imposible en general: una contribución desde un fork la cumple sin esfuerzo —el dueño aprueba el
cambio de otro, que es el proceso que `CONTRIBUTING.md` describe—. Es imposible para **un cambio de
quien tiene el permiso de escritura**: `.github/CODEOWNERS` es `* @pkuschnirof` y la lista de
colaboradores tiene un solo elemento, `pkuschnirof`, `admin`. Ésa es la mitad que la regla, como está
escrita, no distingue, y es la mitad donde vive todo el trabajo: los treinta y un pull requests que
este repositorio fusionó son todos del mismo autor.

**El historial, con su universo enumerado (D-064).** Universo: los pull requests fusionados
(`gh pr list --state merged --limit 100`, **31** resultados, sin truncar) y el feed de eventos del
repositorio (`gh api repos/.../events --paginate`, **201** eventos, ventana `2026-10-17T14:51:06Z` a
`2026-11-01T20:41:47Z`, que arranca **seis minutos antes** de que el conjunto de reglas quedara
activo y por eso cubre todo el período de vigencia).

- **31 de 31** pull requests fusionados tienen **cero** revisiones. Ninguno se fusionó con la
  aprobación que la regla pide: los treinta y uno pasaron por el bypass de administrador.
- **30 empujones directos a `main`** entre el 2026-10-17 y el 2026-10-22, sin pull request —también
  bypass, porque la regla `pull_request` exige uno—. El último es del 2026-10-22: desde `#1`
  (2026-10-23) todo entró por pull request.
- Y una medición que **no alcanza**, dicha porque es justo el tema de este lote: de los 31 pull
  requests, sólo **26** tienen su empujón a `main` dentro del feed de eventos, que GitHub trunca
  (201 devueltos contra un tope de 300). O sea que el feed **demostró, contra el único dato que
  tengo completo, que no cubre todo**, y entonces el **30** de arriba es un **piso y no una cuenta**.
  Lo completo es la lista de pull requests, y es la que sostiene el 31 de 31.
- El único empujón a `main` que no pude emparejar con una fusión (`2026-10-27T15:05:42Z`) **no es un
  empujón directo**: su `head` es `063ec7c`, el commit de aplanado de `#20`. Es el mismo evento
  repetido, y lo verifiqué en vez de anotarlo como hallazgo.

**Y nada de esto fue un descuido en el momento.** La fusión de `#31` tenía la cadena en verde
(`verificar: SUCCESS`) y la corrida de `main` posterior también. El problema no es que haya entrado
algo malo: es que el verde fue **voluntario**. De las tres reglas del conjunto, **ninguna es
`required_status_checks`**, así que hoy nada impide fusionar con la cadena en rojo.

**Lo que cuesta si queda sin decir, que es lo que el dueño nombró.** Un tercero que audite el
historial de `main` va a ver una regla de aprobación de propietario vigente desde el 2026-10-17 y una
fila de entradas a `main` que la ignoran, y va a concluir lo contrario de lo que pasó: que acá se
fusiona sin control. Lo que pasó es que la compuerta humana real —una sola persona que lee cada
cambio antes de fusionarlo— no tiene forma de dejar su rastro en el mecanismo que la pide.

**Qué dice hoy el método de sí mismo.** `D-012`, del 2026-10-17 —el mismo día del conjunto de
reglas—: «Nada se fusiona en `main` sin revisión y autorización de los mantenedores», con las
palabras del dueño y con la regla de GitHub nombrada en su columna de impacto. `CONTRIBUTING.md`
promete lo mismo y describe el proceso de la contribución ajena, que es el caso que **sí** se puede
cumplir. Lo que ninguno de los dos dice es qué pasa con el cambio del mantenedor. `D-012` **no se
edita** —una decisión lleva las palabras de su día—: lo que entre, entra como decisión nueva.

**La recomendación del dueño, tal como la dictó.** Dejar el `pull_request` exigido, bajar las
aprobaciones a **0** y hacer **requeridos los chequeos**. La compuerta sigue siendo real —nada entra
a `main` sin pull request y sin cadena verde— y además se puede cumplir. Dos cosas que la medición le
agrega, y son de implementación y no de criterio: bajar las aprobaciones a cero implica además soltar
`require_code_owner_review` y `require_last_push_approval`, que son aprobaciones con otro nombre y
quedarían pidiendo lo mismo; y los chequeos requeridos **no existen hoy**, así que esa pata no
reordena nada, **agrega** una compuerta que el repositorio no tiene.

**Criterio de aceptación.** Una de estas dos, y la decide el dueño:

1. **El conjunto de reglas cambia**, con su decisión nueva en `docs/DECISIONES.md`. Verificable sin
   leer código: `gh api .../rulesets/25306517` muestra `required_approving_review_count: 0`, sin
   `require_code_owner_review` ni `require_last_push_approval`, y una regla `required_status_checks`
   con el chequeo `verificar`; y la fusión siguiente cierra **sin** bypass.
2. **Queda como está, y entonces queda escrito que las fusiones a `main` son bypass por diseño y no
   por descuido**, donde lo lee quien audita: una decisión nueva en `docs/DECISIONES.md` y una línea
   en `CONTRIBUTING.md` que diga qué pasa con el cambio del mantenedor, las dos citando esta
   medición. Criterio: un tercero que lea el historial de `main` sin preguntarle a nadie entiende por
   qué 31 de 31 fusiones no tienen aprobación.

**La severidad, dicha porque es mi lectura.** **Avisa**: no hay nada detenido y la cadena viene
estando verde de hecho en cada fusión. Pero conviene decir que hay un argumento para lo contrario, y
es el más incómodo de los dos: con el sentido que *bloquea* tenía en las entradas anteriores —«una
compuerta de este repositorio está en rojo y no cierra»— una compuerta que **sólo** cierra por bypass
está peor que en rojo, porque cierra sin haber hecho nada, que es el defecto de `D-057`. Cambiar la
severidad es una línea.

## PND-091 — Los tres recursos vivos publican un identificador de commit que no existe en ninguna rama del repositorio *(propia, medida al rebasar el lote de `D-078`)*

- **Nodo:** `api/git-commit` [nodo propuesto]
- **Origen:** medición propia del 2026-11-01, y salió del **rebase**: al cambiar los shas del lote el
  campo informativo quedó nombrando un commit que el rebase dejó huérfano. Al mirar el resto
  aparecieron doce archivos más en la misma condición.
- **Grupo:** G-API · **Severidad:** avisa · **Repositorio:** método
- **Quién decide:** se hace y se reporta —es una cláusula en un campo que la huella no cubre—; el
  dueño decide sólo si prefiere la segunda salida, que es dejar de emitir el campo.
- **Estado: abierto**

**Qué está mal.** Los recursos publicados llevan el sha de git del cambio **anterior** al que los
contiene, y lo declaran: *«Informative. It is the sha of the change BEFORE the one that contains this
file, because it is computed before saving: it is not the identity of what is published and no
comparison looks at it.»* Todo eso es cierto. Lo que la nota **no** dice es que ese identificador
puede **no existir**: `main` sólo recibe commits de aplanado y la rama se borra al fusionar, así que
el commit que el recurso nombra es, por construcción, uno que la fusión deja huérfano. Un consumidor
que lo imprime —y la nota dice que ya hay consumidores que lo imprimen— imprime un identificador que
no resuelve en ninguna parte.

**La medición, con su universo.** Universo: los **25** archivos de `docs/html/api/` que `api_check`
enumera (los 4 vivos y las 21 copias inmutables). `index.json` no lleva sha; de los **24** que sí,
**13 nombran un commit que ningún ref del remoto contiene** —`git merge-base --is-ancestor` contra
todos los `refs/remotes/origin/*`, que hoy es sólo `main`—. Entre esos 13 están **los tres vivos**:
`gates.json`, `labels.json` y `prompts.json` llevan `0a94f88`, que era un commit local de esta rama
antes del rebase, nunca se empujó y ya no es alcanzable desde ningún ref. Un clon nuevo de este
repositorio no tiene ese objeto, y nunca lo va a tener.

**Por qué es la misma familia.** Es `PND-056` y `D-069` —un puntero que el dato publica tiene que
resolver— en la forma que esa regla no cubre: `build/punteros_publicados.mjs` verifica caminos de
clave y direcciones, no identificadores de commit. Y es la forma de este lote: el campo **no miente**
—dice la verdad y dice menos de lo que el lector necesita—, así que el lector completa solo la parte
que no está escrita, que es que el identificador existe.

**Y lo barato que sale, medido antes de proponerlo.** `git_commit_note` está en `hash_excludes`
(`gates/schema.json#version_scheme`), así que agregarle una cláusula **no sube ninguna versión y no
toca ninguna huella**. Lo mismo vale para el `version_note` del corpus de prompts.

**Criterio de aceptación.** Una de estas dos:

1. **La nota lo dice**, en los tres recursos vivos y en las copias que se congelen de ahí en más: que
   el sha es el del cambio anterior y que **puede no existir en el repositorio publicado**, porque
   `main` sólo recibe commits de aplanado y las ramas se borran al fusionar; y qué mirar en su lugar
   —`catalog_version` más la huella, que es la identidad y sí resuelve—.
2. **Se deja de emitir.** Es un campo que ninguna comparación mira y cuya única función declarada es
   no romper al consumidor que ya lo imprime; si se saca, se saca con el aviso de compatibilidad que
   corresponda.

Y en las dos salidas, lo que desde acá **no** se puede verificar, dicho de frente: se puede exigir
que la cláusula esté, no que el sha resuelva —eso depende del remoto y de qué ramas existan el día
que alguien mire—.

## PND-092 — La preferencia por auditar con otro modelo no tenía piso: el informe salió incompleto y el auditor lo había elegido un vencimiento *(del experimento A/B del método; el dueño pidió el lote)*

- **Nodo:** `corpus/contratos` [nodo propuesto]
- **Origen:** el experimento A/B del método (`C:\urazuke-exp`), peldaño 13 del brazo C1, el
  2026-11-02. Entrada `PND-059` del registro de la herramienta, que **no es este registro** (la
  numeración no se corresponde). El dueño pidió el lote y fijó la forma: reproducir primero, aplicar
  después.
- **Grupo:** G-METODO · **Severidad:** avisa · **Repositorio:** método
- **Quién decide:** el dueño, y lo decidió: el orden de preferencia va tal como el pendiente lo
  propuso.
- **Estado: CERRADO** el 2026-11-02, con **D-079**.

**Qué estaba mal.** D-042 prefería un modelo distinto del que construyó y decía, con razón, que no
es compuerta dura «porque a veces el modelo del constructor es el único disponible». Lo que **no**
contestaba es el otro caso: qué hacer cuando el otro modelo **está** disponible y **no llega**. Y
ése es el caso que se midió.

**Mi reproducción, el 2026-11-02.** Leí D-042 completa antes de tocar nada: contesta el caso de la
**disponibilidad** y no el de la **capacidad**, así que el pendiente se sostiene, acotado a esa
mitad. La medición que lo funda, del recibo `evidence/rendimiento_auditoria.json` del experimento:
se cumplió D-042 en su forma más pura —otro modelo, otro proveedor, sub-sesión sin ninguna memoria
conversacional— y el informe escribió **cuatro de los nueve hallazgos que él mismo anunció**; de los
cuatro, dos nuevos y ciertos, uno ya registrado y nombrado en la propia consigna, y **uno falso**,
que era su único P0: leyó `p95_ms: 5.666` como 5666 ms y declaró incumplido por 18,9x un criterio
que tenía **52,9x de margen**. Al auditor lo eligió un **vencimiento de 306 segundos**. El
contraste, que el dueño verificó uno por uno: el auditor del **mismo** modelo que construyó,
apartándose de la preferencia y declarándolo en su primera línea, entregó **diecisiete** hallazgos
—2 P0, 5 P1, 10 P2— y ninguno resultó falso.

**Qué quedó.** El orden de preferencia escrito en el contrato del peldaño 13 y en sus siete
traducciones: otro modelo **si está a la altura de la tarea**; si no lo está, otra sesión del mismo
modelo **declarando la desviación** en la línea `Auditor:`; y **nunca** un auditor elegido por qué
clave hay cargada o por qué vencimiento aguanta. El prompt le pide al auditor declararlo bajo la
clave fija `auditor_choice`, con uno de sus tres valores, y el caso `tool_constraint` existe
justamente porque la restricción de herramienta se disfraza de elección técnica. En el dato: un
artefacto y una pregunta nuevos en el peldaño 13 (`gates/steps.json`, `since_version` `2026.10.13`).

**Lo que este cierre NO hizo, dicho porque es la mitad que queda.** No editó D-042: una decisión
lleva las palabras de su día (D-053, D-061), así que la aclaración vive en D-079 y la reescritura se
ejecutó donde D-042 **rige**. No subió la hipótesis del dueño —«para urazuke sólo sirven los
modelos realmente frontier»— al método: un dato no la prueba y el método no nombra proveedores
(D-055). Y no convirtió la declaración del auditor en compuerta que bloquea: la línea `Auditor:`
sigue siendo un `should_contain`, que es trabajo del turno siguiente de este lote.

**Criterio de aceptación.** Leer D-042 y el contrato del peldaño 13 y ver si contestan «el otro
modelo no llega, y ahora qué», con un orden y con la obligación de declarar por qué ese auditor.
Verificado: lo contestan, en los ocho idiomas, y el dato lo exige en el artefacto del informe.

## PND-093 — El método exigía evidencia en cinco peldaños y en ninguno exigía auditar el instrumento que la guarda, ni separar los hallazgos por destino *(lo trajo el dueño como la lección general del control)*

- **Nodo:** `corpus/contratos` [nodo propuesto]
- **Origen:** la auditoría del peldaño 13 del brazo C1 del experimento A/B, el 2026-11-02, y la
  lección que el dueño sacó de ella: «el método se inmuniza a sí mismo, pero tienes que registrar
  pending los defectos de método y herramienta que surgen de cada control». Entrada `PND-061` del
  registro de la herramienta, que no es este registro.
- **Grupo:** G-METODO · **Severidad:** avisa · **Repositorio:** método
- **Quién decide:** el dueño, y lo decidió: las dos partes entran, y la dimensión no es opcional.
- **Estado: CERRADO** el 2026-11-02, con **D-080**.

**Qué estaba mal.** Dos cosas que son la misma pregunta mirada de los dos lados. La primera: el
método exigía evidencia —el 8 el rojo como recibo, el 5 el cierre con evidencia escrita, el 12
separar lo verificado de lo creído— y **en ninguna parte exigía auditar el instrumento que la
guarda**, así que un registro roto se lee igual que un registro lleno. La segunda: el peldaño 13
decía *«turn every finding into a proposed pending item»* y **no distinguía de quién es el defecto**,
así que los de método y de herramienta terminaban en el registro del producto, donde el único que
puede leerlos no puede arreglarlos.

**Mi reproducción, el 2026-11-02.** Leí los dos prompts del peldaño 13 y sus cinco preguntas de
verificación publicadas: no piden en ninguna parte mirar si los recibos **sirven**. Lo más cercano
es la cláusula de D-033, que pide reproducir **dos o tres** recibos elegidos por el auditor —una
muestra, nunca el censo—, y es por esa cláusula que la auditoría del experimento encontró, **por
casualidad**, las tres formas que el pendiente nombra: un commit de 130 archivos y 5.886 líneas sin
un solo recibo; pendientes cerrados como entregados sin su terna, en un proyecto que afirmaba por
escrito que el registro rechaza esos cierres; y mutaciones archivadas que no se vuelven a aplicar
porque les falta el salto de línea final. Sobre el destino, la precisión que la reproducción agregó:
el destino **método** ya existía, y sólo en el peldaño 23 —*«End with a concrete proposal to change
the ladder»*—; el destino **herramienta** no existía en ninguno de los tres controles, y ninguno
impedía cerrar con hallazgos sin destino. Así que esto no agregó tres destinos desde cero:
generalizó al 12 y al 13 lo que el 23 ya hacía con uno, y agregó el tercero.

**Qué quedó.** (a) La **salud del registro de la evidencia** como dimensión **no opcional** del
peldaño 13, bajo la clave fija `evidence_register_health`, con tres cifras que contesta un programa
—commits funcionales sin ningún recibo; cierres sin su terna, y cuántos de ésos tienen el motivo
escrito; recibos con mutación que se vuelven a aplicar—, cada una con el comando al lado, y una
cifra que no se pudo medir declarada **no medida** y nunca cero, que es `CQ-19.1`. No es opcional
porque es la única dimensión que audita a las demás. (b) El cierre por destino en los **tres**
controles —12, 13 y 23— bajo la clave fija `findings_by_destination`, con `product`, `method` y
`tool`, y el control no cierra con un hallazgo sin destino. En el dato: cuatro artefactos y cuatro
preguntas nuevos sobre los peldaños 12, 13 y 23 (`since_version` `2026.10.13`).

**Lo que este cierre NO hizo.** Darles identificador de umbral a las tres cifras: el método no
abarca con qué se mide cada una y eso queda a criterio de quien mide, que es la misma razón de las
nueve claves de `measured_by` de D-075. Y escribir el programa que las mide: el método declara qué
cifra se pide, no con qué herramienta.

**Criterio de aceptación.** Leer el peldaño 13 y preguntar si obliga a mirar si los recibos sirven,
o sólo a mirar el sistema. Verificado: lo obliga, como dimensión y no como sugerencia dentro de otra
instrucción. Y dado un control que produce hallazgos, los hallazgos quedan repartidos en tres
registros según su destino y el control no cierra con uno sin asignar.

## PND-094 — Los cuarenta y ocho prompts de los manuales son una copia que ningún guardián compara con su contrato, y ninguno lleva la cláusula de la UX-28 *(propia, medida al aplicar D-079 y D-080; destino: método)*

- **Nodo:** `corpus/contratos` [nodo propuesto]
- **Origen:** medido al aplicar este lote. Es un hallazgo con **destino método**, que es justamente
  lo que D-080 va a exigir de ahora en más de cada control.
- **Grupo:** G-METODO · **Severidad:** avisa · **Repositorio:** método
- **Quién decide:** el dueño, y la regla escrita de este lote fue que yo eligiera donde algo
  estuviera ambiguo y dejara escrito por qué ésa y no otra. Elegí la **(1)**, declarar.
- **Estado: CERRADO** el 2026-11-02, con **D-085**.

**Qué está mal.** Los manuales del curso llevan **su propia copia** de los prompts de cada lección,
y esa copia **no la compara nadie** con el contrato del peldaño que enseña. El universo de
`build/prompts.mjs` y de `build/forma_de_la_pregunta.mjs` es el mismo y está escrito en los dos
programas: los veinticuatro contratos más `EVOLUTIVO_CORRECTIVO.md`, `TRABAJO_COLABORATIVO.md` y
`ANEXO_HEURISTICAS.md`. Los manuales quedan **afuera de los dos**, y en `build/build.mjs` aparecen
una sola vez: en la lista de archivos que se convierten a HTML. O sea que es exactamente la familia
de D-044, D-067, D-074 y D-077 —dos copias de un hecho, una que se actualiza sola y otra que no—,
con la copia viviendo en el documento que un lector principiante lee **como instrucción**.

**La evidencia, medida el 2026-11-02 sobre este árbol.** `docs/MANUAL_CURSO.md` lleva **37**
prompts, `docs/MANUAL_CURSO_EVOLUTIVO.md` **10** y `docs/practica/MANUAL_FORGE_PROYECTO_NUEVO.md`
**1**: cuarenta y ocho. De los cuarenta y ocho, **cero** llevan la cláusula de la UX-28, que D-070
puso en los setenta y dos prompts del corpus con una compuerta que los cuenta. Y el drift se ve en
la lección 13 sin buscarlo: su prompt no tiene la reproducción literal de recibos que D-042 agregó
el 2026-10-20, ni la cláusula de la UX-28, ni —desde hoy— las tres declaraciones de D-079 y D-080.

**Lo que esta entrada NO afirma.** No afirma que el drift sea un descuido. La hipótesis más probable
es la contraria: los prompts de las lecciones son una **versión didáctica más corta a propósito**, y
D-042 ya eligió no tocarlos cuando agregó sus cláusulas. El defecto no es la divergencia: es que la
divergencia **no está declarada en ninguna parte** y no la mide nadie, así que no se puede distinguir
«más corto a propósito» de «quedó viejo», que es la misma forma de D-076 y de `PND-084`.

**Criterio de aceptación.** Una de estas dos, y la decide el dueño. **(1) Declarada:** un registro
—con su razón, como el de exclusiones de `build/inventario_documentos.mjs`— que diga que los prompts
de los manuales son una versión didáctica y qué se le exige a esa versión, más una guarda que al
menos verifique eso que se le exige; el principiante tiene que poder saber que el prompt de la
lección es más corto que el del contrato. **(2) Unificada:** el prompt del contrato entra en la
lección y el manual deja de llevar copia, con la cláusula de la UX-28 incluida. Verificable sin leer
código en las dos salidas: abrir la lección 13 y el contrato del peldaño 13 y ver si dicen lo mismo
o si el manual dice por qué no.

**Qué quedó, y por qué la (1).** La hipótesis de esta entrada era que la copia corta es deliberada,
y al medirla se confirma: unificar metería en cuarenta y siete lecciones las cláusulas que el
contrato arrastra —la forma de la pregunta, la reproducción de un recibo, las declaraciones del
rastro— y taparía el concepto que la lección enseña, que es exactamente lo contrario del nivel
principiante de D-025. Entonces se declara. En los dos manuales y en los ocho idiomas: una
subsección propia que dice que el prompt de la lección es la versión del curso y que el completo
vive en el contrato, con la regla práctica —para aprender, el de la lección; para un sistema de
verdad, el del contrato—; y, en cada lección que trae prompt, el puntero a su contrato **con el
nombre del archivo**, que es protocolo y viaja idéntico en las ocho versiones. Dieciséis punteros en
el manual del curso y ocho en el evolutivo, por idioma: ciento noventa y dos en total.

**Y el defecto era peor de lo que esta entrada decía, que es lo que se encontró al aplicarla.** El
manual no sólo no declaraba la divergencia: declaraba **lo contrario**. Decía, en su sección de cómo
se cursa y en los ocho idiomas, «la tarea: paso a paso, con el prompt **exacto** que le vas a dar al
agente». Ésa era la copia que mentía —la familia de D-044 y D-067— y es lo primero que se corrigió:
ahora dice «el prompt del curso».

**La guarda**, `build/prompts_didacticos.mjs`, con su paso en el flujo que exige la línea medida:

```
prompts didacticos: comprobado -- 8 idiomas, 2 manuales, 192 lecciones con prompt, 376 prompts,
192 punteros al contrato, 2 exenciones con su razon, 0 hallazgos
```

Exige cinco cosas, y ninguna es que la lección diga lo mismo que el contrato: la declaración en los
dieciséis pares idioma-manual; el puntero en cada lección con prompt; que el archivo nombrado
**exista** en el árbol de ese idioma, que es D-069 aplicado a la prosa; que las ocho versiones
tengan los mismos prompts en las mismas lecciones y apunten a los mismos contratos, posición por
posición —lo que atrapa a una traducción que pierde un prompt o que apunta a otro peldaño, el drift
silencioso que nadie estaba midiendo—; y el orden ascendente, para que la lección 13 no apunte al
contrato del 12. Las dos exenciones son los manuales de práctica, y **cada una declara su cifra
medida** de bloques de cita: el de proyecto nuevo tiene uno, que es la salida de un comando y no un
prompt. Va con su número porque una máquina no puede distinguir una salida de un prompt, así que lo
que la guarda exige es que esa cifra no se mueva sin que alguien vuelva a mirar; una exención que se
puede volver falsa sola es el defecto de D-077.

**Los rojos**, en `tests/prompts_didacticos.test.mjs`: once comprobaciones, ocho de ellas
mutaciones del árbol. La primera reproduce el árbol **tal como estaba antes de esta decisión** —sin
declaración y sin un solo puntero— y tiene que caer nombrando los dieciséis manuales y las lecciones
una por una; después, un manual sin su declaración (y sólo ése), una lección con prompt y sin
puntero, un puntero que no resuelve, una traducción que pierde un prompt, una que apunta a otro
peldaño, las ocho apuntando mal a la vez —que es el caso donde la comparación entre idiomas no dice
nada y lo único que queda es el orden— y una exención cuya razón dejó de ser verdad.

**Una cifra de esta entrada se corrige.** Decía cuarenta y ocho prompts en los manuales; son
**cuarenta y siete** (treinta y siete en el manual del curso y diez en el evolutivo). El que sobraba
era el único bloque de cita de `docs/practica/MANUAL_FORGE_PROYECTO_NUEVO.md`, y no es un prompt: es
la salida de un comando. Ese manual, además, dice de frente que los prompts llegan desde la API
publicada del método y que la herramienta los inyecta sola, así que no es una copia divergente y
queda exento con su razón.

**Criterio de aceptación.** Dado un lector principiante que abre la lección 13 y el contrato del
peldaño 13, cuando compara los dos prompts, entonces el manual dice por qué no dicen lo mismo —y la
lección nombra el archivo del contrato, que es `peldanos/peldano-13-auditoria.md`—. Y dado un cambio
que rompa esa declaración, cuando corre la cadena, entonces la guarda lo nombra en vez de callarse:
verificado con los ocho rojos deliberados.

## PND-095 — La compuerta del peldaño 13 no podía ver que una auditoría estuviera incompleta: dio verde con un informe que se declara incompleto *(del experimento A/B del método; el dueño pidió el lote)*

- **Nodo:** `corpus/contratos` [nodo propuesto]
- **Origen:** el experimento A/B del método (`C:\urazuke-exp`), peldaño 13 del brazo C1, el
  2026-11-02, y la frase del dueño: «no debería aceptársele una auditoría abortada». Entrada
  `PND-058` del registro de la herramienta, que **no es este registro** (la numeración no se
  corresponde).
- **Grupo:** G-METODO · **Severidad:** avisa · **Repositorio:** método
- **Quién decide:** el dueño, y lo decidió: las cuatro propuestas entran, y el límite que queda se
  escribe en el texto del método.
- **Estado: CERRADO** el 2026-11-02, con **D-081**.

**Qué estaba mal.** El método promete que un peldaño cierra cuando la evaluación mecánica da verde,
y en el peldaño 13 esa promesa era más débil de lo que se lee: «completo» no es una propiedad del
archivo —es la relación entre lo que el informe **anuncia** y lo que **entrega**— y una compuerta
que mira el archivo no la puede ver.

**Mi reproducción, el 2026-11-02.** Armé el caso que el pendiente pedía: un `docs/AUDIT_2026-11-02.md`
que dice de sí mismo, textual, «encontré NUEVE hallazgos. Escribo cuatro ... el informe está
INCOMPLETO», con su línea `Auditor:` y sus dos insumos, y lo evalué con el evaluador **real** de la
herramienta. Verde contra el catálogo compilado y verde contra la definición que el método publica.
Y una tercera medición que el pendiente no traía: **borré la línea `Auditor:` entera y siguió
verde**, con aviso, porque es un `should_contain`. O sea que del peldaño 13 bloqueaban **dos** cosas
y no tres: que exista un `docs/AUDIT_*.md` de doscientos bytes y que tenga menos de sesenta días.
El defecto era peor de lo que la entrada afirmaba. Y hay un dato que lo endurece y que vino del
experimento: el informe **no se cortó**. La sub-sesión terminó con `status: done`, un turno y 130.525
tokens, emitiendo su marcador de cierre por su cuenta. No alcanza con darle más presupuesto, y una
compuerta no puede distinguir un informe cortado de uno abandonado.

**Qué quedó.** Cuatro exigencias nuevas sobre el informe, todas sobre el **rastro** del trabajo:
`audit_completeness` en `complete` con `findings_announced` y `findings_written` en la misma cifra;
`dimension_grades` con la nota de cada dimensión; `receipts_reproduced` con el veredicto de cada
recibo reproducido; y `not_audited` en `none` o en `with_pending`, con el pendiente de cada parte que
quedó afuera. En el dato: cuatro artefactos y tres preguntas nuevos (`gates/steps.json`,
`since_version` `2026.10.14`). Y el **límite escrito**, que es la mitad que el dueño pidió aparte: el
peldaño 13 no se puede verificar por máquina de punta a punta, porque su trabajo lo hace un tercero,
y eso está en la prosa del contrato y en la ficha, en los ocho idiomas.

**La medición del arreglo, que es lo que lo hace un cierre y no una promesa.** El mismo informe del
turno 1 pasa de verde a **rojo** nombrando las cuatro que le faltan. Un informe que trae todas las
declaraciones y dice `audit_completeness: partial` con `findings_announced: 9` y
`findings_written: 4` sale **rojo**, y el único chequeo que falla es el de la completitud. El mismo
informe con las nueve escritas y `complete` sale **verde**. Es el criterio de aceptación, medido en
los tres estados.

**Lo que este cierre NO hizo, dicho porque es el límite.** No agregó un evaluador que compare las
dos cifras aritméticamente: el vocabulario de evaluadores es append-only y un nombre que una
instalación no conoce **detiene el peldaño para todos los consumidores**, y dos cifras que escribió
la misma mano no se verifican entre sí. La comparación contra el cuerpo del informe es la
verificación del dueño, y quedó publicada como tal en la sección 4 del contrato.

**Criterio de aceptación.** Dado un informe que anuncia N hallazgos y escribe menos de N, cuando se
evalúa el peldaño 13, entonces la compuerta no da verde y el motivo nombra la incompletitud.
Verificado con el evaluador real, en los tres casos de arriba.

## PND-096 — La recorrida agéntica de las pantallas no era exigencia de ningún peldaño, y el peldaño 10 no distinguía los casos escritos de los ejecutados *(del experimento A/B del método; el dueño pidió el lote)*

- **Nodo:** `corpus/contratos` [nodo propuesto]
- **Origen:** el experimento A/B del método, el 2026-11-02, midiendo la procedencia de cada criterio
  contra el texto de los veinticuatro prompts congelados y no contra sus títulos, y la observación
  del dueño: «faltan criterios como ... navegabilidad agéntica de las pantallas simulando recorrida
  humana para detectar bugs de interface y e2e ... son cosas que Forge hace con el método que no
  tienes evaluadas». Entrada `PND-060` del registro de la herramienta, que no es este registro.
- **Grupo:** G-METODO · **Severidad:** avisa · **Repositorio:** método
- **Quién decide:** el dueño, y lo decidió: entran la propuesta (b) y la (a); la (c) queda afuera.
- **Estado: CERRADO** el 2026-11-02, con **D-082**.

**Qué estaba mal.** Dos cosas distintas que el peldaño 10 mezclaba. La primera: la **recorrida
agéntica** —que el agente abra cada pantalla, la mire, la use y siga el flujo de una a la siguiente,
como lo haría una persona— no la pedía **ninguno** de los veinticuatro peldaños, y en el ciclo
completo que se midió fue lo que más defectos de interface encontró. La hacía el agente por su
cuenta. La segunda: el peldaño exige escribir los casos y prohíbe explícitamente que el agente los
marque como ejecutados, pero no distinguía por escrito «casos escritos» de «casos que ejecutó una
persona», así que la deuda no se veía.

**Mi reproducción, el 2026-11-02.** Las dos mitades se sostienen. La prohibición está textual
(«Never mark a case as executed yourself: execution is human»). Y la recorrida: corrí diecisiete
patrones sobre los veinticuatro prompts generados —`navigat`, `walk through`, `browse`, `click`,
`screenshot`, `every screen`, `as if you were a user`, `accessib` y diez más— y lo que el método
pide son **capturas** (peldaños 4, 5, 10 y 20) y la prueba de **punta a punta** (8). Lo único
parecido a una recorrida vive en la estación N0 del camino heredado, que no es uno de los
veinticuatro y además evalúa testeabilidad en vez de buscar defectos de interface. Cero de
veinticuatro.

**Qué quedó.** La recorrida entra como exigencia propia del peldaño 10, con artefacto nuevo
—`docs/SCREEN_WALKTHROUGH.md`, la única ruta nueva de este lote— y con su **denominador**:
`screens_total`, `screens_walked`, `walkthrough_findings`, y una pantalla a la que no se pudo entrar
se cuenta en el total con su razón, que es `CQ-19.1`. Y el archivo de casos lleva en su cabeza
`cases_written`, `cases_executed_by_a_person` —que mueve una ejecución firmada y nunca la lectura del
agente— y `execution_debt`, con quién debe cada ejecución y desde cuándo.

**La medición del arreglo.** Un árbol con los casos escritos y sin las declaraciones sale **rojo**
nombrando las dos cosas que le faltan; el mismo árbol con la deuda declarada (`cases_written: 13`,
`cases_executed_by_a_person: 0`, `execution_debt: pending_verifier` con quién y desde cuándo) y con
la recorrida escrita pone los dos chequeos nuevos en **verde**.

**Y una corrección que me hice antes de commitear, porque la primera redacción era falsa.** Había
escrito, en la prosa del contrato y en la ficha, que la deuda «no frena el peldaño». Lo que **entra**
no frena: lo que se exige es la declaración, no que la cifra sea mayor que cero. Pero el peldaño
**sí** frena por otra cosa, que ya estaba: `manual_cases_per_profile` es `required: true` desde
`2026.10.1` (ancla 4 del Anexo H, D-044), y una instalación que lo implementa se pone en rojo
diciendo que el registro de casos firmados está vacío —lo medí con el evaluador real—. El proyecto
que avanzó con la tabla de ejecuciones vacía corría el **congelado del esquema 1**, donde el único
chequeo del peldaño 10 es que el archivo exista. Así que lo que faltaba nunca fue un bloqueo: era que
la deuda fuera **legible**. El texto quedó corregido en los ocho idiomas antes del commit, y la
tensión con el ancla 4 quedó registrada aparte, en `PND-097`, porque la decide el dueño.

**Criterio de aceptación.** Dado un proyecto donde nadie ejecutó los casos manuales, cuando se
evalúa el peldaño 10, entonces el estado distingue escritos de ejecutados y la deuda queda declarada
con su verificador pendiente. Verificado: las dos cifras y la deuda están en el dato y en los ocho
contratos, y el chequeo las exige.

## PND-097 — El ancla 4 ya hace de la ejecución humana una condición de avance, y el dueño pidió que no lo sea: la contradicción es del método y no de este lote *(propia, medida al aplicar D-082; destino: método)*

- **Nodo:** `corpus/contratos` [nodo propuesto]
- **Origen:** medido al aplicar D-082, el 2026-11-02, con el evaluador real de la herramienta sobre
  un árbol de prueba y sobre el brazo del experimento. Es un hallazgo con **destino método**, del
  mecanismo que D-080 instaló.
- **Grupo:** G-METODO · **Severidad:** avisa · **Repositorio:** método
- **Quién decide:** el dueño, y la regla escrita de este lote fue que yo eligiera donde algo
  estuviera ambiguo y dejara escrito por qué ésa y no otra. Elegí la **(1)**, por una razón medida
  que la entrada no traía y que está abajo; y queda dicho, porque va contra la letra de lo que pidió:
  la **(2)** sigue siendo suya y cuesta editar un requisito publicado.
- **Estado: CERRADO** el 2026-11-02, con **D-083**.

**Qué está mal.** El lote pedía, textual, que la ejecución humana de los casos manuales sea «una
deuda declarada con su verificador pendiente, **no una condición de avance**». Eso se aplicó en lo
que este lote controla: la declaración entra y no exige que la cifra sea mayor que cero. Pero el
peldaño 10 **ya tenía** la ejecución humana como condición de avance, por otra vía:
`manual_cases_per_profile`, `required: true` desde `2026.10.1`, que es el ancla 4 del Anexo H y
viene de D-044.

**La evidencia, medida el 2026-11-02 con el evaluador real.** Un árbol con la matriz de perfiles
bien formada, los casos escritos, la deuda declarada y la recorrida hecha sale **rojo** con un solo
motivo: «el registro de casos manuales está vacío: nadie firmó ningún caso». Y la razón por la que
el experimento vio el peldaño en verde es otra, y conviene que quede escrita: ese proyecto fijó
`catalog_version: forge-compiled/base-schema-1`, o sea el **congelado del esquema 1**, donde el
peldaño 10 no declara ese evaluador y su único chequeo es que el archivo exista. Es, de paso, la
cuarta medición de lo que `PND-055` y D-068 ya decían sobre fijar contra una identidad interna que
el método no puede nombrar.

**Por qué no lo resolví yo.** Relajar el ancla 4 es **editar un requisito publicado**, y eso se hace
con su propia decisión y no de costado: el ancla es `required: true`, está anclada en el Anexo H,
tiene su entrada en el diferencial desde `2026.10.1`, y hay proyectos que la fijaron. Y la otra
salida —dejarla como está— obliga a que la prosa del peldaño 10 **diga** que la ejecución humana es
condición de avance, que es lo contrario de lo que el lote pidió. Las dos son legítimas; ninguna es
mía.

**Criterio de aceptación.** Una de estas dos, y la decide el dueño. **(1) El ancla sigue siendo dura:**
la prosa del peldaño 10 dice, en los ocho idiomas, que un proyecto no avanza del peldaño 10 sin que
una persona haya firmado al menos un caso, y la deuda declarada es lo que hace legible ese rojo.
**(2) La ejecución humana deja de ser condición:** entra una decisión que lo escriba, con lo que eso
le hace al ancla 4 y al diferencial de los proyectos que ya la fijaron. Verificable sin leer código:
abrir el contrato del peldaño 10 y preguntar «si nadie ejecutó, ¿avanzo?», y que el texto conteste lo
mismo que contesta la compuerta.

**Qué quedó, y por qué la (1).** La razón no es una preferencia: la base **congelada** del peldaño
10 —la que no se edita, D-050— lleva en su propio **título** «y los ejecutan personas» y pregunta,
entre sus tres verificaciones de base, «¿los casos se ejecutaron al cierre del bloque, con fecha y
quién?». Relajar el ancla 4 dejaría al dato contradiciendo su propia base, y eso no se hace de
costado. Entonces entra lo que faltaba de verdad, que era **texto**: la prosa del contrato del
peldaño 10 contesta ahora, en los ocho idiomas y sin vueltas, la pregunta «si nadie firmó ni un
caso, ¿avanzo?»; la sección 4 trae la verificación del dueño que la hace falsable —preguntarle lo
mismo al contrato y a la compuerta y exigir que contesten igual—; y el dato suma **una** pregunta de
verificación (`gates/steps.json`, `since_version` `2026.10.15`). Ningún requisito nuevo: el
requisito ya estaba.

**Y una señal de alarma que estaba al revés, que es lo que este cierre arregla además de lo
pedido.** El contrato listaba, entre sus señales: «el peldaño figura cumplido y
`cases_executed_by_a_person` está en cero. **No es un error**: es la deuda». Con el catálogo
publicado, el error es el **verde**: la cifra en cero es honesta, y un peldaño 10 sin ninguna firma
sale rojo por el ancla 4. La señal dice ahora eso, y manda a mirar contra qué `catalog_version`
está fijado el proyecto, que es la única forma de que salga verde (`PND-055`, D-068, cuarta
medición).

**La medición del cierre, con el evaluador real de la herramienta** (`node evaluar_ancla.mjs 10
<árbol>`, que recorre **todos** los evaluadores que el dato declara y no sólo `artifacts`):

- árbol con la matriz bien formada, los trece casos escritos, la deuda declarada y la recorrida
  hecha, y el **registro de firmas vacío**: `manual_cases_per_profile` -> **red**, «el registro de
  casos manuales esta vacio: nadie firmo ningun caso».
- el **mismo** árbol con **un** caso firmado —`judged_by`, fecha y el perfil de su funcionalidad—:
  `manual_cases_per_profile` -> **owner**. Deja de estar rojo y pasa a la verificación del dueño,
  con la deuda de los otros doce declarada.

Las dos corridas juntas son la prueba de que las dos afirmaciones del contrato son verdaderas a la
vez: la declaración no agrega compuerta, y lo que frena es que nadie haya firmado nada.

**Criterio de aceptación.** Dado el contrato del peldaño 10 en cualquiera de los ocho idiomas,
cuando el lector pregunta «si nadie ejecutó, ¿avanzo?», entonces el texto contesta lo mismo que
contesta la compuerta. Verificado contra las dos corridas de arriba.

## PND-098 — El documento de cumplimiento no declara quién verifica cada criterio, así que un criterio cuyo verificador es una persona puede figurar como verificado sin su firma *(propuesta (c) de la entrada de origen, que este lote no pidió; destino: método)*

- **Nodo:** `corpus/contratos` [nodo propuesto]
- **Origen:** la tercera propuesta de la entrada `PND-060` del registro de la herramienta. El lote
  pidió aplicar la (b) y la (a); la (c) quedó afuera por alcance (SQ 5) y se registra para que no se
  pierda.
- **Grupo:** G-METODO · **Severidad:** avisa · **Repositorio:** método
- **Quién decide:** el dueño; el criterio de aceptación de esta entrada era uno solo y no dos
  salidas opuestas, así que lo apliqué tal como está escrito.
- **Estado: CERRADO** el 2026-11-02, con **D-084**.

**Qué está mal.** `docs/USABILITY.md` es el documento de cumplimiento del peldaño 9 y lleva, por
criterio, si está cumplido. Lo que no lleva es **quién lo verifica**. Y hay criterios cuyo
verificador es una persona —los que se juzgan mirando, los `human_red` del Anexo H— y criterios que
verifica un programa. Sin esa columna, los dos se leen igual.

**La evidencia, del experimento.** El documento de cumplimiento de ese proyecto tuvo que corregirse
el 2026-11-02: **seis** criterios pasaron de «verificado» a «no verificable» y **uno solo** quedó en
verificado, porque el verificador de los otros era una persona y nadie había ejecutado los trece
casos manuales. Lo escribió el propio brazo al revisarse. No es un defecto del agente: el documento
no tenía dónde decir de quién era el criterio.

**Criterio de aceptación.** Dado un documento de cumplimiento con un criterio cuyo verificador es
una persona y sin firma, cuando se evalúa el peldaño que lo exige, entonces ese criterio no puede
figurar como verificado. Verificable sin leer código: abrir el documento y preguntar, criterio por
criterio, quién lo dijo.

**Qué quedó.** Sobre los **dos** documentos de cumplimiento del peldaño 9: la declaración con su
denominador —`criteria_total` contando las reglas que nadie verificó todavía, que es `CQ-19.1`
pedido a un documento de cumplimiento, `criteria_verified_by_a_program`,
`criteria_verified_by_a_person` firmadas con nombre y fecha, y `verification_debt` con su
verificador pendiente— y, criterio por criterio, `verified_by` con el instrumento que el catálogo
**ya** declara para esa regla. En el dato: cuatro artefactos y dos preguntas nuevos
(`gates/steps.json`, `since_version` `2026.10.15`); en el prompt inicial del peldaño 9, la cláusula
en los ocho idiomas; y en la prosa del contrato, el párrafo, el resultado esperado, dos
verificaciones del dueño y una señal de alarma.

**La pieza que abarató la entrada, y que la entrada no había visto.** El verificador **no hay que
inventarlo**: `gates/heuristics.json` declara, por regla, su `instrument`, y declara que un
`manual_case` lo **juzga una persona** y devuelve «passed or failed, with a name and a date». De las
cuarenta y ocho reglas, **veintidós** tienen un caso manual entre sus instrumentos. Así que la
columna que faltaba era una **copia que nadie estaba obligado a sacar del dato**, que es la familia
de D-044 y D-077, y por eso `verified_by` se deriva y no se elige. De ahí también que entren los
dos documentos y no sólo `docs/USABILITY.md`, que es el que nombró el hallazgo: cuatro reglas de
calidad de código —`CQ-12`, `CQ-14`, `CQ-19` y `CQ-20`, dos de ellas `human_red`— también las juzga
un caso manual, y arreglar una mitad reproducía el defecto en la otra (SQ 14).

**La medición del cierre, con el evaluador real** (`node evaluar_metodo.mjs 9 <árbol>`):

- el documento **como estaba en el experimento** —los criterios en «verificada», sin columna de
  verificador— sale **rojo** en las cuatro exigencias nuevas, nombrando `/criteria_total.{0,20}\d/`
  y `/verified_by/` una por una.
- el documento con las cuatro cifras y el `verified_by` de cada criterio pasa las cuatro. Los
  chequeos que siguen rojos en ese árbol de prueba son de antes de este lote (el `GATES.md` de
  juguete y la falta de integración continua), y no de D-084.

**La prueba que lo guarda, y por qué hizo falta.** `tests/declaraciones_del_rastro.test.mjs` creció
de once a dieciocho comprobaciones: las cinco claves nuevas declaradas en el peldaño y el archivo
que les toca, el documento que el prompt pide pasando, el documento del experimento cayendo, el
borde que importa —con la cabeza completa pero **sin** el verificador por criterio cae **una sola**
exigencia, que es exactamente el hueco que este pendiente nombra—, la cifra en prosa y la deuda
fuera de vocabulario cayendo, y una simetría que las doce claves de D-081 y D-082 no tenían: los
cuatro instrumentos que la expresión acepta son **exactamente** los que declara
`heuristics.json#instruments`, en las dos direcciones. Recibos: `red_proof` contra `a467e1f` (6 de
18 caen), `green` (18 de 18), `regression` (476 de 476).

**Criterio de aceptación.** Dado un documento de cumplimiento con un criterio cuyo verificador es
una persona y sin firma, cuando se evalúa el peldaño que lo exige, entonces ese criterio no puede
figurar como verificado: el documento tiene que escribirlo `not_verifiable`, y si no declara su
verificador la compuerta sale roja nombrándolo. Verificado con el evaluador real, en los dos
estados.

## PND-099 — Un proyecto corre una definición de compuertas más vieja que la publicada y el atraso no se ve desde adentro *(la trajo el dueño al cerrar el lote del experimento; destino: método)*

- **Nodo:** `datos/compuertas` [nodo propuesto]
- **Origen:** la pidió el dueño el 2026-11-02, al aceptar el lote, por la **reincidencia**: es la
  cuarta vez que el mismo defecto se registra, y la segunda vez que se mide en un solo lote. Es un
  hallazgo con **destino método** del mecanismo que D-080 instaló el mismo día.
- **Grupo:** G-API · **Severidad:** avisa · **Repositorio:** método
- **Quién decide:** el dueño. Entra **planteado y sin resolver**, por pedido explícito: congelar
  está bien y no se discute; lo que falta es que el atraso sea visible, y cómo se hace visible
  cambia lo que el método le exige a un proyecto.
- **Estado: abierto**

**Qué está mal.** El método manda fijar una versión del catálogo el día que el proyecto empieza y
mantenerla hasta el final (D-068), y eso está bien: un upgrade en medio de un proyecto **reabre**
peldaños ya cerrados. Pero fijar y **decir contra qué se fijó** son dos cosas distintas, y el
método hoy exige la primera y no la segunda. El resultado es que un proyecto puede estar
midiéndose contra una definición vieja —o contra una que el método no puede nombrar— y **nadie se
entera desde adentro del proyecto**: el único que ve la diferencia es alguien de afuera que mide
contra la publicada.

**Los cuatro registros que el dueño contó, y son tres eventos.** Vale la precisión porque dos de
los cuatro son la entrada y la decisión del mismo día. Y hay una quinta, de este mismo turno, al
final de la lista.

1. **2026-10-27 — `PND-055` y D-068.** La herramienta que asiste este trabajo ya fijaba, y fijaba
   bien en sus propios términos, contra un identificador de su **catálogo compilado**
   (`base-schema-1` con su hash) que no es una `catalog_version` y no figura en ningún registro.
   Fija, sí, pero a algo que el método no puede nombrar, nadie de afuera puede auditar, y contra lo
   cual el diferencial de un upgrade no se puede computar.
2. **2026-11-02, turno 1 del lote — `PND-095`.** El cuerpo del pendiente que el dueño mandó citaba
   `dist/urazuke/catalog.js`, que es la **copia compilada** dentro de la herramienta y está
   atrasada: informaba tres chequeos del peldaño 13 y la definición que el método publica tiene
   cinco, en dos artefactos. Un número que ya había entrado al paper del experimento. El conductor
   lo registró en su bitácora con la forma exacta del defecto: *leyó la copia compilada y la llamó
   «la compuerta»*.
3. **2026-11-02, turno 3 del lote — `PND-097`.** El brazo del experimento fijó
   `catalog_version: forge-compiled/base-schema-1`, el congelado del esquema 1, donde el único
   chequeo del peldaño 10 es que el archivo exista. Vio **verde** con trece casos manuales escritos
   y **cero** ejecutados por una persona. Con el catálogo publicado, el mismo árbol sale **rojo**:
   `manual_cases_per_profile` es `required` desde `2026.10.1`.

**Y el daño que hizo el tercero es el que convierte esto en pendiente.** El dueño vio ese verde,
concluyó —razonablemente— que el peldaño 10 avanzaba hueco, y me instruyó a **relajar un
requisito publicado** para arreglarlo. El requisito ya lo arreglaba. O sea que el atraso invisible
no sólo deja pasar un peldaño: **produce una instrucción fundada en una premisa falsa**, y la
premisa falsa viene de una copia congelada y no del método. Quedó escrito así, por el dueño, al
aceptar el lote: *«relajar un requisito publicado para arreglar algo que el requisito ya arreglaba
habría sido el peor resultado posible de este lote»*.

**Y una quinta, encontrada mientras se escribía esta entrada, que es la más limpia de las cinco.**
El recibo de evidencia del propio cierre de este lote (`RCP-082`, `node --test`, 487 de 487) sale
sellado con `gates_source: compiled` y `gates_version: forge-compiled/base-schema-1`. Universo
enumerado, que es lo que D-064 exige para una afirmación de este tipo: los **82** recibos del
almacén de este proyecto; **66** llevan el sello del conjunto de reglas y **los 66** dicen eso
mismo; los otros 16 son anteriores al sello y no dicen nada. O sea que el instrumento que guarda la
evidencia del método estampa, en **cada** recibo, una identidad que el propio método **prohíbe**
fijar —y la estampa en el casillero donde iría una `catalog_version`, así que se lee igual que una
versión—. Nadie tenía que buscarla: estaba impresa ochenta y dos veces en el registro que D-080
instaló para auditar a los demás instrumentos.

**Lo que el dato YA tiene, medido, para que el pendiente no vuelva a pedir lo que existe.**
`gates/schema.json#pinning` declara desde `2026.10.7`: el par que se fija (`catalog_version` +
`content_hash`), que el consumidor lo **registre** «en lo que escriba para el proyecto», que lo
**contraste** contra el registro de versiones, que al no coincidir sea **rojo** diciendo cuál de
los dos se movió, que esté **prohibido** fijar a una identidad compilada que el método no puede
nombrar, y cómo se **computa el diferencial** sin red (`since_version` de cada entrada agregada
después del congelado). El diferencial funciona: `node build/version_fijada.mjs` → *«8 idiomas, 16
textos, 75 entradas agregadas, 0 hallazgos; diferencial 2026.10.1 → 2026.10.15: 43 entradas, 0
evaluadores requeridos»*. Nada de esto hay que inventarlo.

**Lo que NO tiene, y es el hueco exacto.** Tres mediciones del 2026-11-02:

- **El diferencial se computa cuando alguien decide un upgrade, que es tarde.** El dato lo pide en
  `upgrade.before_deciding` —*«compute the differential and show it»*— y en ninguna parte pide que
  el proyecto **diga** dónde está parado mientras no haya ningún upgrade en curso. El atraso se
  vuelve visible justo en el momento en que ya no importa que haya sido invisible.
- **Ningún peldaño lo pide.** `grep -o catalog_version gates/steps.json` → **0**; recorriendo los
  veinticuatro peldaños, **0 de 24** nombran la versión fijada entre sus artefactos o sus preguntas
  de verificación. En la prosa castellana aparece en **dos** contratos —el 2, que dice qué fijar, y
  el 10, que desde D-083 manda mirarla cuando un verde sorprende— y en la Parte A. O sea: el método
  ya sabe que esto importa y lo dice en prosa, y no lo convirtió en artefacto de ningún peldaño.
- **Y la asimetría productor/consumidor que lo cierra (SQ 14):** el dato declara la forma de la
  configuración de proyecto que la compuerta lee —`project_config.fields`, **siete** campos:
  `frontend`, `real_users`, `switches`, `switched_off`, `thresholds`, `tools`,
  `communication_depth`— y **ninguno es el par fijado**. El método le pide al consumidor que
  registre el par «en lo que escriba para el proyecto» y el único archivo de proyecto cuya forma
  el método declara **no tiene dónde ponerlo**. Un requisito que el productor declara y el
  consumidor no tiene dónde cumplir es la familia de `PND-056` y D-069, en la capa de la
  configuración.

**La precisión que afina el planteo, y hay que leerla antes de elegir una salida.** El problema
**no** está entre dos versiones publicadas: el diferencial de `2026.10.1` a `2026.10.15` agrega
**43 entradas y 0 evaluadores requeridos**, así que ningún salto entre publicadas traba hoy un
peldaño —D-068 ya lo había medido—. El único caso que traba, y es el que se midió dos veces en
este lote, es el del proyecto que **nunca fijó una versión publicada**: se quedó en un congelado
interno del consumidor. Entonces lo que un proyecto necesita saber primero no es «cuántas versiones
me atrasé» sino **«¿estoy fijado a algo que el método puede nombrar?»**, y la respuesta «no» tiene
que ser legible sin salir del proyecto.

**Las salidas posibles, sin elegir ninguna.** Son del dueño y se registran para que la decisión sea
entre opciones escritas y no entre lo que se le ocurra a quien pase:

1. **Sólo la configuración.** El par fijado entra como campo de `project_config.fields`, con la
   obligación de que sea una `catalog_version` que el registro de versiones contenga. Barato y
   mecánico; sube una versión del catálogo. No hace nada por el proyecto cuyo consumidor no escribe
   esa configuración.
2. **La configuración más un artefacto de peldaño.** Lo anterior, y además el peldaño 2 —que es
   donde se fija— pide un artefacto del proyecto que declare la versión fijada, su huella, la
   vigente el día que se miró y el atraso en entradas del diferencial. Es lo único que lo vuelve
   verificable por máquina desde adentro del proyecto, y es también lo que más le cuesta a un
   lector que sigue el método con lápiz y papel.
3. **La configuración más una verificación del dueño.** Lo de (1), y el peldaño 2 suma una
   pregunta de verificación —«¿contra qué `catalog_version` corre este proyecto, y está en el
   registro de versiones?»— sin artefacto nuevo. Más liviano que (2) y no atrapa al que no mira.

Y una cuarta, que no es alternativa sino aviso y conviene tenerla al lado: **que el método declare
qué informa un proyecto fijado a una identidad que el registro no contiene.** Hoy el dato lo
**prohíbe** y no dice qué se informa cuando pasa, así que pasa en silencio; es `CQ-19.1` —un
instrumento que no pudo mirar informa que no pudo, nunca cero— aplicado a la propia fijación.

**Criterio de aceptación.** Dado un proyecto que corre las compuertas del método, cuando el dueño
de ese proyecto pregunta «contra qué definición me estoy midiendo y cuánto me atrasé», entonces la
respuesta sale del propio proyecto, con la versión fijada, su huella y el atraso medido contra el
registro de versiones; y si la identidad fijada no está en el registro, el proyecto lo **dice** en
vez de quedarse callado. Verificable sin leer código: abrir lo que el proyecto declara y
preguntarle eso. Y lo que desde acá **no** se va a poder verificar, dicho antes de empezar: que una
herramienta **cumpla** la obligación se mide en el repositorio de esa herramienta, no en éste
(D-068).

**Perfiles afectados y criterio por perfil.**

- *P1 (herramienta consumidora):* dada una herramienta que fija, esa herramienta tiene un campo
  declarado dónde escribir el par fijado, y no tiene que inventarse dónde ponerlo.
- *P4 (dueño de un proyecto que corre el método):* dada esa persona, puede saber, sin preguntarle a
  nadie y sin salir de su proyecto, contra qué versión se mide y cuánto se atrasó.
- *P6 (lector humano que entra por el documento principal):* dada esa persona, se entera de que un
  verde puede venir de una definición vieja **antes** de festejarlo, y no después de que alguien lo
  mida de afuera.

**Depende de:** nada. `PND-055` y `PND-056` están cerrados y son sus antecedentes.

## PND-100 — La portada publicada decía «las 45 reglas» y el dato decía 48: una cifra a mano en el único árbol donde las guardas del método no pueden mirar *(salió de la verificación de producción que pidió el dueño al cerrar el lote; destino: método)*

- **Nodo:** `interfaz-publica/portada` [nodo propuesto]
- **Grupo:** G-PUBLICACION · **Severidad:** avisa · **Quién decide:** el dueño, y decidió: eligió la
  salida 1 de las tres que se le presentaron —arreglar la cifra **y** agregar la guarda que la
  derive del dato—, con estas palabras: «Vamos por 1».
- **Repositorio:** los dos · **Estado: CERRADO** el 2026-11-02, con la cifra derivada del dato en
  las diez portadas y la guarda corriendo en el despliegue del portal. **Decisión:** D-086.
- **Origen:** no lo trajo una auditoría ni una compuerta. El dueño, al cerrar el lote de D-079 a
  D-085, preguntó si todo lo del lote estaba servido en producción y si la documentación y las
  páginas web estaban actualizadas «si correspondía». La verificación medida contestó que la
  interfaz de datos estaba entera y en hora —cuatro recursos, 199 comprobaciones, 71 JSON byte a
  byte— y que **la portada no**.

**Qué estaba mal.** La tabla de material de `yujin.app/urazuke/` —la que lista los diez documentos
por idioma, y es la primera página que ve un lector— decía «las 45 reglas» en el texto del enlace al
Anexo H, en las **ocho** filas de idioma y en los **ocho** vocabularios (`Las 45 reglas`,
`The 45 rules`, `As 45 regras`, `Les 45 règles`, `Die 45 Regeln`, `Le 45 regole`, `45のルール`,
`45 条规则`). Ochenta celdas: ocho por página, en las diez portadas por idioma, porque las nueve
traducidas se hornean de la castellana. Y el dato que el método publica, servido y verificado ese
mismo día, declaraba `counts.rules = 48` (catálogo `2026.10.15`, con `faces: 6`).

**Nadie la rompió: se rompió sola.** La frase era cierta el día que se escribió. Quedó vieja el
2026-10-27, cuando D-070 metió `UX-28` y el anexo pasó a cuarenta y seis reglas, y quedó más vieja
el 2026-11-01, cuando D-078 metió `CQ-19` y `CQ-20` y lo llevó a cuarenta y ocho. Es la familia de
D-044, D-067, D-074 y D-077 —dos copias de un hecho, una que se actualiza sola y otra que no— y lo
nuevo es **dónde** vivía la copia: en el repositorio del portal. La guarda que el método ya tiene
para esto, `build/cifras_derivadas.mjs` (D-077), no la podía encontrar, y no por un hueco de su
universo sino por el **límite de su alcance**, que es un árbol: su universo son las fuentes del
método, el documento generado y los recursos publicados, todos de este repositorio.

**Qué se hizo.** Las dos mitades de la salida 1.

1. **La cifra, derivada del dato y no corregida a ojo.** `48` en las ocho celdas de
   `yujin.app/urazuke/index.html`, y las nueve portadas regeneradas con
   `node build/prerender-urazuke.mjs`, que es el único modo de tocarlas: el arreglo va siempre en el
   generador y nunca en el verificador (D-074). Medido antes: ochenta celdas con `45`, cero con
   `48`. Medido después: cero con `45`, ochenta con `48`, y el diff de cada una de las diez páginas
   son ocho líneas y nada más.
2. **La guarda, en el programa que el despliegue del portal ya corre** desde D-060
   (`build/verify-urazuke-homes.mjs`, chequeo 11). El número de una celda tiene que ser el que el
   catálogo **espejado** en `yujin.app/urazuke/api/gates.json` declara para esa colección, y qué
   colección es sale del **documento que el enlace nombra**: `ANEXO_HEURISTICAS.html` cuenta
   `rules`, `CONTRATOS_DE_PELDANO.html` cuenta `steps`. Esa elección es lo que hace que la guarda no
   necesite una lista de palabras en ocho idiomas y siga funcionando el día que alguien escriba
   «reglas» donde decía «rules».

**Las tres propiedades de la guarda, y cada una se vio caer.** No haber podido mirar es **rojo y
nunca verde** —sin catálogo espejado, ilegible o sin `counts`, cae diciendo eso, que es D-057—. Una
cifra que la guarda **no sabe** comprobar es un fallo y no un permiso: o el documento se mapea a una
colección del dato, o entra al registro de exenciones **con su razón**, y así un documento nuevo con
una cifra queda vigilado el día que entra a la tabla. Y un registro que **ya no aplica** también es
un fallo, porque un mapa que no empareja con nada imprime un verde sin haber comprobado nada
(D-066). La mutación que importa es la que **cambia la cuenta en el dato** y exige que la portada
caiga contra el número nuevo: es lo que separa esta guarda de una que comparara contra un `48`
escrito a mano, que sería el defecto que persigue (D-071).

**La reproducción propia, con las salidas medidas (2026-11-02).**

- El universo de cifras de la tabla, contado antes de escribir una línea: **310** celdas con un
  número en las diez portadas, de **cuatro** documentos. Dos se derivan del dato (`rules`, `steps`)
  y dos entran al registro de exenciones con su razón: las veinticinco preguntas al proveedor,
  porque el dato no declara ninguna colección de preguntas —`counts` tiene `steps`, `stations`,
  `rules`, `faces` y `evaluators`—, y el «Parte 2» del manual evolutivo, porque es un **ordinal** y
  no el tamaño de nada.
- `node build/verify-urazuke-homes.mjs` sobre el árbol arreglado:
  `PASS -- every page is baked, linked, canonical and reciprocal`, 10 de 10 páginas.
- `node build/redproof-urazuke-homes.mjs`: **16 mutaciones, 16 rojos** —las diez que ya estaban más
  las seis nuevas—, cada una nombrando lo suyo. La cuarta nueva, que es la que prueba la derivación,
  cayó así: *«the link to ANEXO_HEURISTICAS.html reads "Las 48 reglas" and the published data
  declares counts.rules = 55»*. Ninguna de las seis escribe un número: todas lo sacan del árbol o
  del dato, por el mismo motivo que `desincronizarFila` en `tests/pending_resumen.test.mjs`.
- Los otros cuatro programas del paso de guardas del portal, en verde y con su línea:
  `arbol propio: comprobado`, `eol: comprobado`, `nac-spec indexable: comprobado` (10 mutaciones en
  rojo) y el verificador del `.htaccess` del despliegue.

**La consecuencia, dicha acá y no cuando aparezca.** El día que el método publique la regla 49, su
trabajo de publicación commitea el `gates.json` nuevo en el repositorio del portal y **el despliegue
del portal se pone en rojo** —el sitio entero— hasta que la cifra se arregle y las portadas se
regeneren. Es lo mismo que D-074 registra para el mapa del sitio, y es correcto: el arreglo es una
cifra más un comando, y lo que frena —publicar una portada que miente sobre el dato del propio
método— es peor que un despliegue tarde.

**Lo que la guarda no promete, y queda escrito.** Las cifras **deletreadas** de la prosa de la
portada —«veinticuatro peldaños», «ocho estaciones», «ocho idiomas»— no las mira ninguna máquina:
viven en los diez catálogos de la interfaz, en diez idiomas, y una lista de numerales deletreados en
diez idiomas sería la lista a mano que esta guarda existe para no tener. Medidas hoy contra el dato
en el catálogo castellano, las tres coinciden: `steps` 24, `stations` 8, `languages.prose_versions`
8. Eso lo lee una persona, y está dicho en la cabecera del chequeo para que se sepa antes y no
después.

**Perfiles afectados y criterio por perfil.**

- *P3 (lector humano que llega por la portada):* dada esa persona, lo que la tabla dice que hay en
  el anexo es lo que el anexo tiene, y lo que el dato publicado cuenta.
- *P6 (lector humano que entra por el documento principal):* dada esa persona, no se entera por una
  resta propia de que la portada y el anexo no dicen el mismo número.
- *P8 (dueño de proyecto que aplica el método):* dado el despliegue del portal, una cifra que se
  venció sola frena la publicación nombrando la página, el documento, la cifra escrita y la que el
  dato declara, en vez de salir servida.

**Depende de:** nada. D-077 (`PND-064`) es su antecedente directo y está cerrado; esta entrada es la
misma regla bajada al único árbol donde aquélla no alcanza.

---


## PND-101 — Un puerto con doble de prueba sin ninguna corrida que lo atraviese: cuatro controles muertos en un navegador con ochenta y un archivos de prueba en verde encima *(del experimento A/B del método, segundo lote; el dueño pidió el lote)*

- **Nodo:** `corpus/contratos` [nodo propuesto]
- **Origen:** el experimento A/B del método (`C:\urazuke-exp`), el brazo C1, el 2026-11-02, y la
  redacción es del brazo y no mía. Entrada `PND-070` del registro de la herramienta, que **no es
  este registro** (la numeración no se corresponde), con prioridad 90.
- **Grupo:** G-METODO · **Severidad:** avisa · **Repositorio:** método
- **Quién decide:** el dueño, y lo decidió: entra, con la redacción del brazo y no con la mía.
- **Estado: CERRADO** el 2026-11-03, con **D-087** (`CQ-21.1`).

**Qué estaba mal.** El método empuja a construir la vista sobre un **puerto** con su doble de
prueba, y hace bien: es lo que la vuelve verificable sin abrir un navegador. Lo que no hacía era
exigir una sola corrida que mirara ese punto. El brazo construyó su vista sobre un puerto que
escuchaba un único tipo de evento —`submit`— mientras cuatro de los cinco controles eran
`<button type="button">`. **Cuatro controles muertos en un navegador**, con ochenta y un archivos de
prueba en verde encima, y entre ellos uno que afirmaba exactamente lo que estaba roto:

```js
it('pasar de pagina pide la siguiente, y volver pide la anterior', ...)
  l.activar('talleres-siguiente');
  expect(urls.at(-1)).toBe(BASE + '/workshops?page=2');
```

Verde, porque `activar` recorría los oyentes del nodo **falso** y los llamaba a mano. En los
ochenta y un archivos no había un solo `.click()`, `dispatchEvent`, `fireEvent` ni `userEvent`.

**La medición del dueño sobre los tres brazos, que es la que hace que esto sea del método y no de
la práctica.** Los dos brazos sin escalera enganchan cada control por su cuenta con el evento que
le corresponde —dos y tres tipos de evento— y el brazo con escalera abstrajo el enganche en un
puerto, y el puerto concentró los cinco en uno. **Ninguno de los tres aprieta un botón en una
prueba**: esa ceguera es de la práctica. Lo que es del método es la última columna: **concentró el
riesgo en un punto y no exigió una prueba que mire ese punto.**

**La redacción, que no es mía, y por qué la mía no alcanzaba.** La mía decía «al menos una prueba
que lo atraviese de verdad, contra la implementación real». El brazo la aceptó y mostró con su
propio código que no alcanza: su `lienzo.test.ts` **ya** corría la implementación real, contra un
documento de mentira que invocaba al oyente sin mirar el evento. Atravesaba el adaptador real y
seguía sin ver el defecto. La que quedó es la suya: el otro lado tiene que ser **el otro lado de
verdad** —el navegador, el sistema operativo, la base o la red— y ninguna cantidad de dobles fieles
lo sustituye.

**El costo, medido por él, que es la objeción que esta cara va a recibir.** Una corrida, **15,6
segundos, cero paquetes nuevos**: el navegador se maneja con el `WebSocket` que Node 22 ya trae.

**Qué quedó.** `CQ-21.1` en el Anexo H, y su efecto en el peldaño 11: la familia
`ports_with_a_test_double` en `docs/PRODUCER_CONSUMER_MAP.md`, con `ports_total`,
`ports_with_a_crossing_run` y, por puerto, su adaptador, su doble y el `crossing_run` nombrando el
comando y **qué alcanzó del otro lado** —`browser`, `operating_system`, `database`, `network` o
`none`—. Un puerto en `none` es un hueco **declarado**, que es lo que pidió el brazo. Y en el
peldaño 8, la corrida que atraviesa entra en la rutina del cierre con evidencia.

**Mi reproducción y el rojo primero, el 2026-11-03.** Armé dos árboles que **sólo** difieren en esa
familia y los evalué con el evaluador **real** de la herramienta, contra la definición que el método
publica. Antes (catálogo `2026.10.15`): los dos salen **verde**; la compuerta no los distingue. Con
`2026.10.16`: el que no tiene la familia sale **rojo** nombrando
`ports_with_a_test_double`, y el que la tiene sale **verde**. Y el tercer árbol, que es el que
distingue las dos redacciones —el `crossing_run` que dice «instancia el adaptador REAL contra un
documento de mentira»— sale **rojo** nombrando `crossing_run`, porque lo que alcanzó no es ninguno
de los cuatro otros lados que el dato nombra. Con la redacción vieja ese árbol salía verde.

**Lo que este cierre NO hizo, dicho porque es el límite y está publicado como tal.** Ninguna
compuerta puede verificar que la corrida declarada atraviesa el puerto **de verdad**: lo que una
máquina mira es la declaración, y si eso es cierto lo decide una persona leyendo el comando. Está
escrito en la sección de `CQ-21` del Anexo H y en la verificación del contrato del peldaño 11, en
los ocho idiomas, en vez de simulado.

**Criterios de aceptación por perfil (Anexo H, ancla 1).**

- *P1 (dueño del método):* dado el árbol con un puerto doblado y sin corrida que lo atraviese,
  cuando se evalúa el peldaño 11, entonces la compuerta no da verde y el motivo nombra la familia
  que falta. Medido en los tres árboles de arriba.
- *P8 (dueño de proyecto que aplica el método):* dado el mapa productor-consumidor, el dueño toma un
  puerto, lee su corrida y puede decir si el otro lado es un navegador o es otro doble, sin leer
  código.

**Depende de:** nada. `PND-102` y `PND-103` son sus hermanas: las tres son la misma forma.

---

## PND-102 — Un peldaño cierra con trece casos manuales escritos y cero ejecutados, y la cifra no llega al informe donde se decide *(del experimento A/B del método, segundo lote; el dueño pidió el lote)*

- **Nodo:** `corpus/contratos` [nodo propuesto]
- **Origen:** el experimento A/B del método, el brazo C1, el peldaño 10 cerrado el 2026-11-02 con
  trece casos escritos y ninguno ejecutado; el dueño los ejecutó un día después y **dos fallaron**
  —la paginación no avanzaba y el formulario perdía el correo tipeado—, los dos incumpliendo
  criterios que el propio brazo había escrito. Entrada `PND-069` del registro de la herramienta,
  con prioridad 85.
- **Grupo:** G-METODO · **Severidad:** avisa · **Repositorio:** método
- **Quién decide:** el dueño, y lo decidió: la cifra tiene que ser visible, sin bloquear el cierre.
- **Estado: CERRADO** el 2026-11-03, con **D-087** (`CQ-21.2`).

**Qué estaba mal, y hay que decirlo con lo que ya estaba, porque la entrada pedía más de lo que
faltaba.** La frase de origen es «el método trata *el caso está escrito* como la evidencia del
peldaño 10», y eso era verdad hasta el 2026-11-02 y dejó de serlo **ese mismo día**: D-082 puso
`cases_written`, `cases_executed_by_a_person` y `execution_debt` en la cabeza de
`docs/MANUAL_TESTS.md`, y D-083 midió con el evaluador real que un peldaño 10 con el registro de
firmas vacío sale **rojo** por el ancla 4. O sea que la compuerta hoy es **más dura** que lo que
esta entrada pide, y el brazo salió verde porque corría el **congelado** del esquema 1
(`catalog_version` `forge-compiled/base-schema-1`, verificado el 2026-11-03 en
`.forge/urazuke-gates.json` del brazo), que es exactamente lo que `PND-055` y D-068 dicen sobre
fijar contra una identidad interna que el método no puede nombrar.

**Lo que SÍ faltaba, que es la mitad que este cierre arregla.** La cifra existía **en el archivo
donde vive el caso** y no en el informe donde se decide. El dueño lee el informe honesto en cada
cierre; el archivo de casos lo abre cuando sospecha. Un número que hay que ir a buscar no frena a
nadie, y eso es `CQ-21.2`: el artefacto de verificación que nadie corrió cuenta **cero** —no media
verificación— y su cifra viaja al informe. Además la entrada pide una cosa que la cabeza del
archivo no daba: la cuenta **de este cierre**, no la del archivo entero. Un `cases_written: 13` con
`cases_executed_by_a_person: 0` no dice que este cierre agregó tres casos y ninguno corrió.

**Qué quedó.** En el peldaño 12, las tres claves fijas del alcance en la rutina del informe
honesto: `cases_touched`, cuántos casos toca este cierre; `cases_with_an_execution_row`, cuántos de
ésos firmó una persona con fecha y nombre; y `executed_by`, quién los firmó. Con todas las letras
cuando la respuesta es ninguno, que es lo que la entrada pedía textualmente. Las claves van en
inglés y en ASCII y la prosa alrededor en el idioma del lector (D-051, D-075), como las tres de
D-080.

**Mi reproducción y el rojo primero, el 2026-11-03.** Dos árboles que sólo difieren en ese párrafo
de `docs/WORKING_AGREEMENT.md`, evaluados con el evaluador real. Antes: los dos pasan el artefacto
del peldaño 12. Con `2026.10.16`: el que no declara el alcance sale **rojo** nombrando
`cases_touched`, y el que lo declara pasa. Y en la batería del método, el rojo deliberado exige que
caigan **las tres** claves y no una.

**Lo que este cierre NO hizo.** No bloquea el cierre por una cifra en cero, que es lo que el dueño
pidió explícitamente: lo que se exige es la **declaración**. Y no toca el ancla 4, que es lo que sí
frena y lo que `PND-097` tiene abierto a nombre del dueño.

**Criterios de aceptación por perfil (Anexo H, ancla 1).**

- *P1 (dueño del método):* dado un contrato de convivencia sin las tres claves del alcance, cuando
  se evalúa el peldaño 12, entonces la compuerta no da verde y nombra las tres que faltan.
- *P8 (dueño de proyecto):* dado cualquier informe de cierre que toque casos manuales, el dueño lee
  «N escritos, 0 ejecutados» en el informe mismo, sin abrir el archivo de los casos.

**Depende de:** nada. D-082 y D-083 (`PND-096`, `PND-097`) son su antecedente directo y están
cerrados; esta entrada es la cifra viajando al lugar donde se decide.

---

## PND-103 — Un correctivo nacido de un caso manual cierra con la verificación del paso que falló, y la segunda exigencia de ese paso nunca se verifica *(del experimento A/B del método, segundo lote; el dueño pidió el lote)*

- **Nodo:** `corpus/contratos` [nodo propuesto]
- **Origen:** el experimento A/B del método, reconstruyendo la historia del caso MT-02 del brazo
  C1. Entrada `PND-071` del registro de la herramienta, con prioridad 88.
- **Grupo:** G-METODO · **Severidad:** avisa · **Repositorio:** método
- **Quién decide:** el dueño, y lo decidió con su redacción: el caso vuelve a correr entero.
- **Estado: CERRADO** el 2026-11-03, con **D-087** (`CQ-21.3`).

**Qué estaba mal, y es más grave que el anterior porque todo el aparato funcionó.** El paso 5 del
caso MT-02 pedía **dos** cosas: «el botón Salir tiene que estar y tiene que funcionar». La historia,
tal como el dueño la escribió:

```
el caso existe, con sus dos exigencias        <- el metodo
se ejecuta y falla por la PRIMERA             <- el metodo
se arregla la ausencia                        <- el brazo
el peldano cierra                             <- el metodo
la SEGUNDA nunca se verifica                  <- nadie
```

El botón apareció. Nadie volvió a correr el caso. Y la segunda exigencia no se cumplía: ese botón
era uno de los cuatro controles muertos de `PND-101`. No hay ninguna señal en ninguna parte: la
fila dice «FALLÓ», el correctivo dice «cerrado» y el defecto sigue.

**El motivo, que es preciso y es el que hace de esto una regla y no una advertencia.** Una fila de
ejecución informa **hasta dónde llegó** quien ejecutó. Si el caso se corta en el paso 3, los pasos
4 y 5 no dicen «pasaron»: no dicen nada. Cerrar sobre esa fila es confundir *no lo vi fallar* con
*lo vi andar*.

**Qué quedó.** `CQ-21.3`, y su efecto en dos lugares. En el peldaño 10, `rerun_after_a_fix` en
`docs/MANUAL_TESTS.md`: un caso que falló y cuyo fallo se arregló no vuelve a contar como
verificado hasta que una persona lo corra **entero** y firme una fila nueva posterior al arreglo,
con el pendiente que la causó; el prompt de la ejecución pide además la lista de los casos que
deben una vuelta a correr, con la corrección que los arregló y desde cuándo. Y en el bucle
correctivo del camino heredado, la cláusula de que una corrección nacida de un caso manual **no
cierra** con la verificación del paso que falló. Fue ahí y no en el peldaño 8 porque en un legado
el rojo es el bug mismo, así que la corrección cierra con su test de reproducción en verde —y eso
está bien— y el caso manual que la encontró queda atrás.

**Mi reproducción y el rojo primero, el 2026-11-03.** Dos árboles con el caso MT-02 y su tabla de
ejecuciones: uno con la fila del fallo y el texto «se cerró con la verificación del paso 5», y otro
con dos filas nuevas posteriores al arreglo sobre los cinco pasos —la primera de las cuales
encuentra la segunda exigencia incumplida y abre el correctivo siguiente, que es exactamente lo que
tenía que pasar en el experimento—. Antes: el artefacto del peldaño 10 da **ok** en los dos; la
compuerta no los distingue. Con `2026.10.16`: el primero sale **rojo** nombrando
`rerun_after_a_fix` y el segundo pasa.

**Lo que este cierre NO hizo.** No verifica que la fila nueva cubra **todos** los pasos: eso lo
dice quien ejecutó, no un programa, y está escrito como límite en el Anexo H y en la sección 4 del
contrato del peldaño 10.

**Criterios de aceptación por perfil (Anexo H, ancla 1).**

- *P1 (dueño del método):* dado un archivo de casos donde un caso falló, se arregló y no hay fila
  posterior al arreglo, cuando se evalúa el peldaño 10, entonces la compuerta no da verde.
- *P8 (dueño de proyecto):* dado un correctivo cerrado, el dueño mira la tabla del caso que lo
  originó y ve una fila con fecha posterior al arreglo, o ve que falta y sabe que el correctivo no
  cierra.

**Depende de:** nada. `PND-101` es su hermana y el defecto que ocultaba era el mismo botón.

---

## PND-104 — La cuenta de reglas del Anexo H estaba vencida en veinte lugares de la prosa: tres versiones del documento principal (una no sumaba), los nueve README y las ocho hojas de preguntas al proveedor *(propia, medida al subir la cuenta a cuarenta y nueve; destino: método)*

- **Nodo:** `corpus/documento-principal` [nodo propuesto]
- **Origen:** propia, el 2026-11-03, al aplicar D-087: para subir la cuenta de cuarenta y ocho a
  cuarenta y nueve hubo que leer el párrafo que presenta el Anexo H en los ocho idiomas, y tres no
  decían lo que el dato declara.
- **Grupo:** G-TRAZABILIDAD · **Severidad:** avisa · **Repositorio:** método
- **Quién decide:** nadie: es un defecto medido contra el dato publicado.
- **Estado: CERRADO** el 2026-11-03, en el mismo commit que lo encontró.

**Qué estaba mal, medido.** En la Parte A del documento principal, el párrafo que presenta el Anexo
H dice cuántas reglas son y cómo se reparten. Al 2026-11-03, antes de este lote:

| idioma | decía | el dato declaraba | vencido desde |
|---|---|---|---|
| alemán | cuarenta y seis, dieciocho de calidad, veintiocho de usabilidad | cuarenta y ocho, veinte, veintiocho | 2026-11-01 (D-078) |
| italiano | cuarenta y cinco, dieciocho, veintisiete | cuarenta y ocho, veinte, veintiocho | 2026-10-27 (D-070) |
| francés | cuarenta y ocho, veinte, **veintisiete** | cuarenta y ocho, veinte, veintiocho | 2026-10-27 (D-070) |

La francesa es la que conviene mirar dos veces: el total estaba bien y el desglose no, así que la
oración **no sumaba** —cuarenta y ocho igual a veinte más veintisiete— y se publicó así una semana.
Las otras cinco versiones estaban bien.

**Y hay un segundo lugar, peor, que apareció al revisar el primero: los nueve `README`.** La fila
del Anexo H de la tabla de material dice, en el `README.md` de la raíz y en los ocho de
`docs/<idioma>/`, «dieciocho reglas de calidad de código y veintisiete de usabilidad». **Nueve de
nueve**, las dos cifras mal, vencidas desde el 2026-10-27. Y esa unanimidad es lo que lo hace peor
que el caso de arriba, no mejor: las tres del documento principal son una traducción que se quedó
atrás, un defecto de D-013 que una comprobación de simetría podría encontrar; las nueve del README
son **un hecho que nunca se volvió a derivar**, replicado con disciplina a los ocho idiomas, y
ninguna comprobación de simetría lo ve porque las nueve dicen lo mismo. Es la primera página del
repositorio y es la tabla que D-061 arregló por la razón inversa: ahí las siete traducciones
listaban el anexo y la fuente de verdad no.

**Y un tercer lugar, con la misma forma que el segundo: las ocho hojas de preguntas al proveedor.**
`docs/PREGUNTAS_AL_PROVEEDOR.md` y sus siete traducciones cierran la pregunta 15 con «(Anexo H, las
veintisiete reglas de usabilidad.)», **ocho de ocho**, y son veintiocho desde el 2026-10-27. Esa
hoja se escribió el 2026-10-26 con D-061 y quedó vencida **al día siguiente**, cuando UX-28 entró
con D-070: no es que nadie la mantuviera, es que nació un día antes del cambio y nada la volvió a
mirar. Es la hoja que un lector le lleva a un proveedor para hacerle preguntas incómodas, así que la
cifra viaja fuera del proyecto.

**El universo del barrido, enumerado, porque esta entrada afirma que no hay más (D-064).** Se buscó
sobre los **312** archivos `.md` del árbol —310 bajo `docs/` sin contar `docs/html/`, que se genera,
más `README.md` y `CLAUDE.md` de la raíz—, con el texto desenvuelto de los saltos de línea para que
una cifra partida en dos renglones no se escape, contra trece formas de las cuentas viejas en los
ocho idiomas. Aparecieron veinte afirmaciones de estado presente, las veinte corregidas, y el resto
de las ocurrencias son **registros fechados** que no se tocan: las notas apiladas de la cuenta del
anexo, las filas de la tabla de decisiones de D-044, el defecto del conteo de la sección 13, el
hecho histórico de las veintisiete reglas que el lector se salteó, y el papel de la taxonomía.

**Por qué importa y de qué familia es.** Es la familia de D-044, D-077 y D-086: dos copias de un
hecho, una que se actualiza y otra que no. Y el lugar es el peor de los tres que ya se registraron:
no es un documento generado ni la portada del portal, es **la prosa del método**, en el párrafo que
le presenta al lector el anexo que D-061 agregó justamente porque el documento principal no lo
nombraba. La guarda de las cifras derivadas (D-077) no lo ve, y eso está escrito en su cabecera y
no es un descuido: esa guarda mira el nivel de datos y el documento que se genera de él, y la prosa
del método la lee una persona.

**Qué quedó.** Las veinte corregidas —tres del documento principal, nueve del README y ocho de la
hoja de preguntas—, con la cuenta nueva, en el mismo commit que la subió. Y queda
dicho acá, con su medición, que este chequeo **no tiene guarda**: lo que lo encontró fue tener que
tocar la cifra, y la próxima vez que una regla entre va a pasar lo mismo. Darle una guarda es
trabajo aparte y no es gratis —hay que decidir qué frases de la prosa son «una cifra al lado del
nombre de una colección» en ocho idiomas, que es justo lo que D-077 declaró fuera de su alcance—.

**Criterios de aceptación por perfil (Anexo H, ancla 1).**

- *P1 (dueño del método):* dado cualquier archivo del corpus, cuando se lee una cuenta de reglas
  del Anexo H que afirma el estado presente, entonces el total es el que `heuristics.counts.total`
  declara y el desglose suma el total. Verificado sobre los 312 archivos del árbol el 2026-11-03,
  con el universo enumerado arriba.
- *P5 (lector que adapta el método):* dado el documento principal en su idioma, el lector no se
  saltea reglas por creer que son menos de las que hay, que es exactamente lo que pasó en
  `PND-039`.

**Depende de:** nada.

---

# Resumen del estado

*Contado por máquina y no a mano: `tests/pending_resumen.test.mjs` cuenta las entradas del propio
archivo y exige que esta tabla sea exactamente eso, sin huecos ni repetidos. Nació de un defecto
medido el 2026-10-24 —con cinco cierres en un día la tabla seguía diciendo tres cerrados cuando ya
eran ocho—, así que la cuenta ya no depende de que alguien se acuerde de rehacerla.*

| grupo | entradas | abiertos | cerrados | bloqueantes abiertos |
|---|---:|---:|---:|---:|
| G-API | 24 | 6 | 18 | 1 |
| G-ALCANCE | 5 | 0 | 5 | 0 |
| G-IDIOMA | 16 | 13 | 3 | 3 |
| G-PUBLICACION | 6 | 0 | 6 | 0 |
| G-ECOSISTEMA | 3 | 0 | 3 | 0 |
| G-METODO | 45 | 23 | 22 | 11 |
| G-TRAZABILIDAD | 5 | 2 | 3 | 0 |
| **total** | **104** | **44** | **60** | **15** |

Ciento cuatro entradas, `PND-001` a `PND-104`. Veintidós vienen de la auditoría externa
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

**Y el 2026-10-27, a la noche, el grupo de la API bajó a tres abiertos.** Cerraron `PND-008` y
`PND-009` juntos, porque los dos viven en lo que el archivo publicado dice de sí mismo y los dos
suben la misma versión. **PND-008**: cada versión declarada tiene ahora su propia dirección, sin
purga, y las nueve del catálogo y las cinco del corpus que ya estaban publicadas se **recuperaron**
de la historia de `main` y verifican, una por una, contra la huella que su entrada del registro
anota. Dejó de ser un lujo el día que se publicó el contrato de fijación: el dato le decía a un
proyecto que congele una versión y la mantenga hasta el final, y no había ninguna dirección desde
donde volver a leerla —el propio archivo lo decía, *«There is no per-version URL on this host
today»*—. **PND-009**: la frase que dice qué protege la huella y qué no se movió al `what` de los
**dos recursos**, que es donde la huella la cubre; vivía sólo en el índice, que no tiene huella
propia por decisión escrita, así que viajaba sin protección —y la trampa estaba anticipada en el
propio pendiente desde el 24: una declaración de seguridad en un campo sin proteger es una que un
atacante puede editar para que diga lo contrario—. Las dos traen un dato que vale más que el
arreglo: **la primera versión del cambio puso la dirección absoluta adentro del recurso y la prueba
de neutralidad la rechazó**, porque el README publica, en los ocho idiomas, un comando que cuenta
las menciones del alojamiento sobre el archivo servido y afirma que da **0**. Una línea más y una
afirmación medida y publicada quedaba falsa. El recurso declara su camino relativo y la dirección
absoluta la declara el índice, que es el único archivo con esa excepción escrita.

**Y el 2026-10-28 el grupo de la API bajó a dos abiertos y se quedó sin ningún bloqueante.**
Cerró `PND-011`: el archivo publicado le pedía al consumidor, con razón, que no imprima sus textos
y que lea el identificador contra un catálogo propio, y el método no publicaba ningún catálogo de
donde sacarlo, así que la instrucción era correcta y no se podía cumplir. Ahora lo publica —setenta
y ocho identificadores en los ocho idiomas de la prosa, 624 cadenas **extraídas** y no escritas—, y
cierra con ocho por decisión del dueño del mismo día, porque los dos que faltan no tienen prosa de
donde extraer y la lista se deriva sola el día que `PND-016` los traiga. Lo que ese cambio dejó
vale más que el recurso: el programa que después de empujar le pregunta a producción si sirve lo
commiteado llevaba su lista de recursos **clavada en dos**, así que con un tercero publicado habría
cerrado en verde sin haber mirado el tercero.

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
despliegue del portal. Con eso el grupo de la publicación queda **completo**, y el del alcance
también: `PND-049`, la hoja nueva, está enlazada desde las diez portadas servidas y los ochenta y
cuatro documentos del método están enlazados y en el mapa del sitio. Lo había reabierto la revisión
semántica el 2026-10-27 con **PND-058** —la entrada de la tabla del material prometía cinco
documentos por idioma y la tabla tiene diez columnas, así que el Anexo H y la hoja nueva estaban
enlazados y el párrafo que los presenta no los nombraba; llegar al material no es sólo que el
enlace exista—, y cerró el mismo día, cuando la entrada reescrita quedó servida en los diez
idiomas con el trinquete de la cuenta de columnas corriendo en el despliegue.

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
mismo grupo en dos días). Queda **un** bloqueante abierto, y es el más caro del backlog: el de
idiomas (PND-016), que está esperando al dueño. El de las claves de configuración (PND-063) cerró
el 2026-10-30, y cerró como corresponde: estuvo **arreglado y medido** un día entero —las ocho
versiones corregidas, la guarda en la cadena— y **siguió abierto**, porque un arreglo en la máquina
no es un efecto en producción (D-057); cerró cuando el anexo servido llevó las claves que el dato
declara. El grupo de la API había cerrado el 2026-10-28 con PND-011 —el catálogo de textos servido y
verificado, con los ocho idiomas que tienen prosa—, lo reabrió este desvío y volvió a cerrar con la
misma publicación; el del método, el del alcance, el de
la publicación y el del contenido se cerraron antes —`PND-054`, la
forma de la pregunta, el 2026-10-27 con D-070—, y `PND-010` y `PND-019` cerraron juntos en un solo
cambio de versión.

**Y las tres últimas, del 2026-10-29, salieron de verificar al consumidor en vez de a la publicación.** Las dos primeras son huecos de las capas 2 y 3 del Anexo H que aparecieron al medir si la herramienta había implementado el anexo: `PND-061`, la cifra de cumplimiento, donde la lista de lo que queda fuera del porcentaje lleva tres identificadores y **una frase**, y las tres lecturas razonables de esa frase dan 93,3 %, 62,2 % y 55,6 % para el mismo proyecto; y `PND-062`, la escalada de CQ-18, que se declaraba «por el mismo mecanismo que cualquier umbral» y no tenía identificador de umbral, así que la ausencia de una clave significaba a la vez «escalada declinada» y «nadie la miró» —**cerrada el 2026-10-30**, con el umbral `end_users_outside_the_organisation` servido y los tres estados dichos—. El tercer hueco que esa verificación trajo —con qué se mide cada regla— **no es un pendiente**: el dueño decidió el mismo día que el método no lo abarca y queda a criterio de quien mide (D-075).

`PND-063` es el quinto desvío propio y el peor de los cinco, porque no falló un reporte: falló una compuerta. Lo encontró el dueño pidiendo un ejemplo práctico de los otros dos. El ejemplo de configuración del anexo llevaba las claves **traducidas** —cuatro vocabularios distintos en los ocho idiomas, ochenta y siete nombres para veinticuatro casilleros— y, medido contra la propia compuerta del método, un apagado escrito **exactamente como el ejemplo lo enseñaba** salía `validado` con código 0: la regla apagada y el registro de cuatro campos que D-046 llama no negociable sin mirarse nunca, porque la compuerta lee `switched_off` y el ejemplo decía `exceptions`. Los cuatro desvíos anteriores fueron afirmaciones que la medición desmentía; este es daño silencioso —lo que SQ 0.3 prohíbe— y le pasaba al lector que **obedece**. La guarda que lo cierra exige las dos direcciones y trae catorce rojos deliberados, uno de ellos reproduciendo el verde falso. **Cerró el 2026-10-30**, con las claves servidas y no sólo corregidas en disco.

`PND-064` es el sexto desvío propio y el de forma más pura: una cifra escrita a mano **adentro de
un artefacto que se genera**. El documento de las compuertas decía «The four that block with a
human red» y, a continuación, listaba **cinco** identificadores, uno de los cuales avisa y no
bloquea. La lista sale del dato; el número estaba escrito. No lo rompió nadie: la frase era cierta
el día que se escribió y dejó de serlo cuatro días después, cuando UX-28 entró con D-070. Es la
misma familia que D-044, D-067 y D-074 —dos copias de un hecho, una que se actualiza sola y otra
que no—, y lo nuevo es dónde vivía la copia: en el archivo que el consumidor lee como autoridad y
que dice de sí mismo «no lo edites». Enumerando el universo aparecieron tres cifras más de la misma
clase, las tres correctas hoy y ninguna vigilada, y una de ellas viajando **adentro de lo que cubre
la huella**. El arreglo deriva las cuatro, y las correctas salieron byte a byte iguales: ninguna
huella se movió y ninguna versión sube. La guarda que lo cierra deriva su mapa **del dato** y no de
una lista escrita —si no, sería otra enumeración a mano, que es el defecto que persigue— y trae
doce rojos deliberados, el primero de ellos la frase original tal como estaba commiteada.

**Y el 2026-11-01 entraron quince de una fuente que el registro no tenía: el método medido
usándolo.** `PND-065` a `PND-079` salen de un experimento de dos días —tres brazos construyendo el
mismo sistema, uno de ellos recorriendo la escalera completa en conversación dirigida, veinte idas
y vueltas— y no se parecen a ninguna de las cuatro fuentes anteriores. No las trajo una auditoría
encargada (como las veintidós de `U-01` a `U-22`), ni un lector que adaptó el corpus (como las diez
de `PND-039` a `PND-048`), ni una medición de la publicación, ni un desvío propio: las trajo
**correr el método contra un sistema real y mirar qué deja pasar**. Seis son una sola familia con
seis caras —un instrumento que informa salud cuando lo que pasó es que no pudo mirar— y aparecieron
por seis caminos distintos, cada uno ciego al anterior; cuatro más son de la misma raíz y otra forma
—no confiarle a la intención ni a la memoria lo que un programa o el disco pueden comprobar—; dos
son declaración y no prosa, y van al nivel de datos con su evaluador; y tres son **defectos del
método**, no agregados, uno de ellos con la decisión del dueño ya tomada. Las quince están
**abiertas y en borrador**: ninguna tocó el corpus, porque una regla nueva del método es una
obligación para todos los proyectos que vengan y la aprueba el dueño una por una.

**Y el 2026-11-01, a la tarde, seis de las quince dejaron de ser borrador.** El dueño decidió las
cinco preguntas que la familia tenía abiertas y entró `D-078`: **dos** reglas con caras —`CQ-19`
«Recibo del instrumento», con cuatro, en el peldaño 9; y `CQ-20` «El privilegio de una
verificación», con dos, en el peldaño 14—, publicadas en `2026.10.12`, con sus textos en el
catálogo (`2026.10.2`) y con las dos reglas de conducta que arrastran al contrato de convivencia,
que pasó de seis reglas mínimas a ocho (`2026.10.7` del corpus de prompts). `PND-065` a `PND-070`
quedan **escritas y verdes en la cadena**, y cierran con la fusión, porque un arreglo en la máquina
no es un efecto (`D-057`). Las nueve que siguen abiertas en borrador son las otras del experimento.

**Y el mismo trabajo dejó cuatro entradas nuevas, tres de ellas medidas mientras se escribía la
decisión.** `PND-080`: la guarda de cifras derivadas **no mira la prosa** y esa exclusión no está
declarada —y no es una hipótesis, es un daño que ya había ocurrido: la cuenta de reglas del Anexo H
llevaba cuatro días siendo falsa en catorce líneas vivas de siete idiomas, con el francés y el
italiano correctos y el castellano, que es la fuente de verdad, equivocado—. `PND-081`: la
traducción china del prompt del camino heredado numeraba sus cinco reglas `8, 11, 7, 12, 13`, con
el `9` y el `10` ausentes, desde que la traducción existe; la pieza inglesa está candada byte a
byte y nadie mira la numeración de los bloques traducidos. Y `PND-082` es la consecuencia declarada
de la decisión: `CQ-18` enuncia cinco comprobaciones sin identificador, así que es la única regla
con caras que no se pueden apagar de a una. Y `PND-083` la pidió el dueño al leer las otras tres:
la regla de precedencia del castellano no tiene verificación cruzada, así que un error de la fuente
se publica ocho veces y las copias correctas quedan registradas como las desviadas.

**Y el 2026-11-01, a la noche, entraron tres más, y las tres vienen de que el dueño verificó antes
de aceptar.** `PND-084` nació **retirando** la mejora que la trajo: `M+17` decía que el método
publica sus reglas sin publicar con qué se miden, y eso es `D-075`, la decisión del propio dueño de
dos días antes, con el número medido y su frase al lado. Lo que la refutación dejó es mejor que la
mejora: `D-075` decidió **no llenar** la celda y no decidió que el consumidor no pueda distinguir
una decisión de un descuido, y hoy `declared_not_measured` significa las dos cosas para las
veintiséis reglas que defieren al adaptador sin celda publicada. `PND-085` es la otra que la
medición dio vuelta: `M+18` buscaba **el número** de reglas que aguanta el contrato de convivencia,
y el único caso real tiene veintidós en vigencia contadas por su propia compuerta, de las cuales
dieciséis las agregó el proyecto —nueve dictadas por el dueño— después de que el método le pidiera
seis. Con el mínimo en ocho, un techo de ocho deja al proyecto que aplicó el método con más cuidado
catorce reglas en infracción, así que la cifra se reemplaza por la propiedad que de verdad aguantó.
Y `PND-086` la trajo **la herramienta sobre su propio trabajo**: los tres recibos del peldaño 8
tienen la misma forma de dirección y no la misma cardinalidad, porque la regresión es un hecho sobre
un estado del árbol y no sobre un pendiente. Las tres son **del dueño verificando lo que le
trajeron**, que es la fuente que ninguna de las cinco anteriores tenía.

**Y el cierre del mismo día dejó tres entradas más, y las tres salen de rectificar: dos al
dueño y una a mí.** `PND-087` es el tercer valor que le falta a la regla (5) del contrato de
convivencia: el método ya partió un estado en tres cuatro veces —`D-054`, `D-058`, `D-076` y
`PND-084`— y el binario «verificado o creído» era el que quedaba, justo en la regla que está más
cerca del dueño. El nombre que entra es **«verificado sin guarda»**, elegido por un criterio que
vale más que el nombre —que nombre lo que le falta y no lo que tiene, así no se puede usar para
quedar bien—, y el dueño descartó los dos suyos, uno de ellos porque *«a mano»* es la palabra con
la que `D-077` nombra lo que no hay que hacer. `PND-088` la trajo **la herramienta sobre su propio
trabajo**, por segunda vez en el día: el programa con el que insertó una nota del registro no
miraba el estado que iba a cambiar, informó «anotada» las dos veces que corrió y la segunda
duplicó; queda abierta **con sus dos lecturas y sin desempate** —cara de `CQ-20` o cara de
`CQ-19`— por pedido del dueño. Y `PND-089` es la más incómoda de las tres, porque es **este
archivo**: la tabla del resumen la cuenta una máquina desde el 2026-10-24 y el párrafo que la
explica, pegado diez líneas abajo, lleva una docena de cifras a mano; una de ellas ya fue falsa, y
la guarda se mutó para probar que no la mira.

**Y al final del 2026-11-01 entraron dos más, y las dos salen de fusionar y de rebasar.**
`PND-090` la trajo **el dueño en el acto de pasar la compuerta**: la regla que protege `main` pide
una aprobación de propietario y, para el único que tiene permiso de escritura, no hay forma de
dársela —GitHub no permite aprobar el propio pull request—, así que el único camino es el bypass de
administrador. Medido contra la configuración viva y el universo completo de fusiones: **31 de 31**
sin ninguna revisión, treinta empujones directos antes del primer pull request, y **ninguna** regla
de chequeos requeridos, así que el verde de la cadena viene siendo voluntario. No hay nada detenido y
no entró nada malo; lo que está en juego es lo que concluye quien audite el historial, que vería una
regla de aprobación vigente y una fila de fusiones que la ignoran. Y `PND-091` salió del **rebase**
de este mismo lote: los tres recursos vivos publican el sha del cambio anterior al que los contiene,
declarado informativo, y ese commit no existe en ninguna rama del repositorio —trece de los
veinticuatro archivos publicados que llevan un sha nombran uno que ningún ref del remoto contiene—.
Es `D-069` en la forma que la guarda de punteros no sabe ver, y la nota que lo declara informativo es
cierta y dice menos de lo que el lector completa.

`PND-100` es la centésima y la trajo el dueño preguntando **si estaba todo servido**, que es la
pregunta que una publicación verificada debería contestar sola. La interfaz de datos contestó bien
—cuatro recursos, versiones y huellas vivas— y la **portada** contestó mal: decía «las 45 reglas» en
las ocho filas de su tabla cuando el dato publicado declara cuarenta y ocho. No la rompió nadie: se
venció sola cuatro días después de escribirse, el 2026-10-27 con D-070 y el 2026-11-01 con D-078. Es
la familia de D-077 con un agravante de ubicación: vivía en el repositorio del portal, que es el
único árbol donde ninguna guarda del método puede mirar, y en la primera página que ve un lector.
Cierra con la cifra derivada del dato y con la guarda que lo exige corriendo en el despliegue del
portal (D-086).

`PND-101`, `PND-102` y `PND-103` son las tres del **segundo lote** del experimento A/B, y son una
sola forma vista desde tres ángulos: *un artefacto correcto que no llega al único lugar donde
produce efecto*. El caso escrito que nadie ejecutó, el caso corregido que nadie volvió a correr y el
puerto doblado que ninguna prueba atravesó. Cierran con **una** regla y no con tres —`CQ-21`, con
tres caras— porque se les hace la misma pregunta, que es la forma que D-078 ya había usado para los
once fallos del primer lote. Y hay dos cosas de este trío que conviene no perder. La primera: la
redacción de `CQ-21.1` **la escribió el brazo** y no el método, después de refutar la mía con su
propio código; es la segunda vez que un lector mejora una regla antes de que se publique. La
segunda: el dueño contó que él cometió la misma falla en el mismo experimento —ejecutó los casos,
encontró los dos defectos, escribió el informe con su evidencia y **no se lo mandó al brazo**, que
se quedó parado cuatro horas—, y lo contó justamente porque si el conductor del experimento pisa la
trampa que le está marcando al método, la trampa es de la forma y no del que la pisa.

`PND-104` es el quinto desvío propio del registro y apareció **por el lote que lo encontró**: para
subir la cuenta de reglas de cuarenta y ocho a cuarenta y nueve hubo que leer la cuenta del Anexo H
en la prosa, y estaba vencida en **veinte** lugares. Tres en el documento principal —el alemán
cuarenta y seis, el italiano cuarenta y cinco, y el francés cuarenta y ocho igual a veinte más
veintisiete, que ni suma—, los **nueve** README y las **ocho** hojas de preguntas al proveedor, que
nacieron el 2026-10-26 y quedaron vencidas al día siguiente. Los diecisiete últimos son peores que
los tres primeros: no son una traducción que se quedó atrás, son un hecho que nunca se volvió a
derivar y que está replicado con disciplina en los ocho idiomas, así que ninguna comprobación de
simetría lo puede ver. El universo del barrido —312 archivos— está enumerado en la entrada, porque
afirmar que no hay más desde una búsqueda que no dice dónde buscó es `D-064`. Es la familia de D-044, D-077 y D-086 en el único
lugar donde ninguna de las tres guardas mira: la prosa del método. Queda cerrada con las doce
corregidas y con lo que no tiene arreglo automático dicho de frente: lo que la encontró fue tener
que tocar la cifra, y la próxima regla va a volver a pasar por acá.

Un aviso para leer la tabla de arriba, porque la cuenta de bloqueantes pasó de uno a ocho en un día
y eso no significa lo que parece. En las sesenta y cuatro entradas anteriores *bloquea* quería decir
"una compuerta de **este** repositorio está en rojo y no cierra". En estas quince quiere decir **lo
que su ausencia le cuesta a un proyecto que aplica el método**: nada de lo que este repositorio
publica hoy está detenido por ellas. Quedó escrito así, y no bajado a *avisa*, porque bajarlo
escondería el costo; y queda dicho acá para que nadie lea la fila de G-METODO como un incendio.

**Una tensión de método, dicha para que quede en el registro.** Este trabajo se hace con el tramo
de normalización abierto y **en rojo** —la estación N0 no cerró—, y la normalización prohíbe tocar
el sistema. Es un evolutivo-correctivo deliberado por encima de la normalización, por decisión del
dueño. N0 no avanza mientras tanto, y eso está bien: lo que no se puede es no haberlo dicho.
