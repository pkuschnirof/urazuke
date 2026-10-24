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
con PND-006 y PND-007, que se cierran con él). El resto de la lista sigue esperando su turno; nada
se arregla fuera del orden acordado.

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

La regla madre de B1 es que una funcionalidad se agrupa por **lo que la persona vino a hacer**. La
interfaz pública del método tiene cinco cosas que alguien viene a hacer:

| grupo | lo que la persona vino a hacer |
|---|---|
| **G-API** | encontrar la definición de las compuertas y consumirla con confianza |
| **G-ALCANCE** | llegar al material que el método publica |
| **G-IDIOMA** | leer el método en su idioma |
| **G-PUBLICACION** | que lo que está servido sea lo último que el método produjo |
| **G-ECOSISTEMA** | entender qué es cada cosa: el método, el protocolo, la herramienta |

*Nota de lectura:* la auditoría dijo "hay cuatro grupos" y después presentó **cinco**. Se adopta
el cinco: el quinto grupo es real y no es un sobrante de los otros cuatro.

## Los perfiles (Anexo H, B2)

| perfil | quién es | por dónde entra |
|---|---|---|
| **P1** | herramienta consumidora que corre en un servidor | pide los archivos de la API por red |
| **P2** | herramienta consumidora que corre en un navegador | igual, pero sujeta a la política de origen |
| **P3** | lector humano que llega por la portada | `https://yujin.app/urazuke/` |
| **P4** | rastreador que no ejecuta JavaScript | la portada, el mapa del sitio, el archivo de permisos |
| **P5** | auditor que quiere probar que su copia es la buena | la API, más el registro de versiones del repositorio |

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
- **Quién decide:** se hace y se reporta · **Repositorio:** portal · **Estado: abierto**

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

---

## PND-004 — Falta CORS: ninguna herramienta de navegador puede leer la API *(era U-03)*

- **Nodo:** `interfaz-publica/api` [nodo propuesto]
- **Grupo:** G-API · **Severidad:** bloquea · **Quién decide:** se hace y se reporta
- **Repositorio:** portal (configuración del servidor) · **Estado: abierto**

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

---

## PND-005 — Falta Cache-Control: nada dice cuánto vale la copia *(era U-04)*

- **Nodo:** `interfaz-publica/api` [nodo propuesto]
- **Grupo:** G-API · **Severidad:** avisa · **Quién decide:** se hace y se reporta
- **Repositorio:** portal (configuración del servidor) · **Estado: abierto**

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
- **Grupo:** G-API · **Severidad:** bloquea · **Repositorio:** método · **Estado: abierto**
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
- **Repositorio:** portal · **Estado: abierto**

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

---

## PND-035 — El despliegue del portal excluía **todos** los `.htaccess`, no sólo el de la raíz *(hallazgo del método, no de la auditoría)*

- **Nodo:** `cadena/publicacion` [nodo propuesto]
- **Grupo:** G-API · **Severidad:** bloquea · **Quién decide:** se hace y se reporta
- **Repositorio:** portal (su flujo de despliegue) · **Estado: abierto**

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

---

# Abiertos — G-ALCANCE: llegar al material publicado

## PND-014 — El mapa del sitio no conoce ningún documento del método *(era U-13)*

- **Nodo:** `interfaz-publica/portada` [nodo propuesto]
- **Grupo:** G-ALCANCE · **Severidad:** avisa · **Quién decide:** se hace y se reporta
- **Repositorio:** portal · **Estado: abierto**

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

---

## PND-015 — Diez documentos publicados que no se pueden alcanzar *(era U-14)*

- **Nodo:** `interfaz-publica/portada`, `corpus/anexo-h` [nodos propuestos]
- **Grupo:** G-ALCANCE · **Severidad:** bloquea · **Quién decide:** se hace y se reporta
- **Repositorio:** portal · **Estado: abierto**

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
- **Repositorio:** portal · **Estado: abierto**

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
- **Repositorio:** los dos · **Estado: abierto**

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

# Abiertos — G-ECOSISTEMA: entender qué es cada cosa

## PND-022 — El ecosistema se lee como un solo producto *(era U-21)*

- **Nodo:** `identidad/ecosistema` [nodo propuesto]
- **Grupo:** G-ECOSISTEMA · **Severidad:** bloquea · **Quién decide:** se hace y se reporta
- **Repositorio:** los dos (portada del portal y README del método) · **Estado: abierto**

**Qué está mal.** En ninguna de las dos portadas está escrita la distinción: el método es un
método, el protocolo es un protocolo, la herramienta es una herramienta. Tres naturalezas
distintas, y un lector superficial las mete en una sola bolsa.

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
exactamente PND-020.

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
- **Repositorio:** los dos · **Estado: abierto**

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

---

## PND-026 a PND-034 — Revisión semántica de los nueve idiomas de la interfaz *(era U-17, segunda parte)*

- **Nodo:** `interfaz-publica/portada` [nodo propuesto]
- **Grupo:** G-IDIOMA · **Severidad:** avisa · **Quién decide:** se hace y se reporta
- **Repositorio:** portal · **Estado: abierto** (las nueve)

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

| id | idioma | estado |
|---|---|---|
| PND-026 | árabe (ar) | abierto |
| PND-027 | alemán (de) | abierto |
| PND-028 | inglés (en) | abierto |
| PND-029 | francés (fr) | abierto |
| PND-030 | hindi (hi) | abierto |
| PND-031 | italiano (it) | abierto |
| PND-032 | japonés (ja) | abierto |
| PND-033 | portugués (pt) | abierto |
| PND-034 | chino (zh) | abierto |

**Nota sobre el alcance, para que no se confunda con PND-016.** Esto es la **interfaz** de la
portada: 241 cadenas por idioma. El **corpus** —34 documentos, cientos de miles de caracteres— no
entra acá; su revisión es otro trabajo y todavía no tiene entrada, porque primero hay que decidir
si se revisa todo o sólo lo que cambió.

---

# Resumen del estado

*Contado del propio archivo el 2026-10-24 por la tarde, no estimado: la tabla anterior había
quedado vieja con los cierres del día —decía tres cerrados cuando ya eran ocho—. Un registro que
es la verdad del plan no puede llevar un resumen desincronizado de sus propias entradas.*

| grupo | entradas | abiertos | cerrados | bloqueantes abiertos |
|---|---:|---:|---:|---:|
| G-API | 14 | 11 | 3 | 6 |
| G-ALCANCE | 3 | 3 | 0 | 1 |
| G-IDIOMA | 13 | 12 | 1 | 3 |
| G-PUBLICACION | 3 | 0 | 3 | 0 |
| G-ECOSISTEMA | 2 | 1 | 1 | 1 |
| **total** | **35** | **27** | **8** | **11** |

Treinta y cinco entradas, `PND-001` a `PND-035`. Veintidós vienen de la auditoría externa
(`U-01` a `U-22`), dos del propio método midiendo su cadena y su publicación (PND-001 y PND-035),
y las once restantes son trabajo derivado: la propuesta de firma, el chequeo de huérfanas y las
nueve revisiones semánticas.

**Lo que está primero, y por qué.** PND-021 está cerrado y era la precondición de todo el trabajo
en el portal. **PND-020** es la precondición del resto de ese trabajo: hasta que la portada
publicada deje de estar atrasada, cualquier cambio de portada se escribe sobre una versión vieja.
**PND-013** es la precondición de PND-004 y PND-005: sin eso, la configuración que se ponga se
borra sola en la publicación siguiente; y **PND-035**, descubierto midiendo el resultado de
PND-013, es la precondición de los tres, porque sin eso la configuración no llega al servidor se
ponga donde se ponga. Y **PND-002** es la raíz del grupo de la API: siete
entradas se apoyan en el índice.

**Una tensión de método, dicha para que quede en el registro.** Este trabajo se hace con el tramo
de normalización abierto y **en rojo** —la estación N0 no cerró—, y la normalización prohíbe tocar
el sistema. Es un evolutivo-correctivo deliberado por encima de la normalización, por decisión del
dueño. N0 no avanza mientras tanto, y eso está bien: lo que no se puede es no haberlo dicho.
