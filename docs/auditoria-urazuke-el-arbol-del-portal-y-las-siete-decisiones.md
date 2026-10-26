# Antes de arrancar: lo que resolví, y las decisiones que son tuyas

**Fecha:** 24 de octubre de 2026. **Base:** la auditoría externa de 22 hallazgos, re-medida por mí.

---

## 1. Tu primera respuesta, aplicada

El registro va en **el que el método ya exige**, `docs/PENDING.md`, y hoy ese archivo **no existe**: lo verifiqué. Lo nombran once veces el manual del curso, once el camino evolutivo-correctivo, ocho el contrato del peldaño 5 y la tabla de la escalera, y en el repositorio no está. Así que el backlog de la auditoría no va a ser un archivo satélite: va a **inaugurar el registro canónico**, con los 22 hallazgos como un grupo adentro, en el formato que el propio peldaño 5 manda (número, título, nodo del que cuelga, origen, descripción, reglas, datos, pantallas, casos borde, criterios de aceptación «dado/cuando/entonces», cómo se verifica, estado) más los campos que la auditoría pide encima (grupo de convergencia, perfiles con criterio por perfil, severidad, quién decide, qué repositorio toca).

Eso tiene un efecto secundario que conviene que sepas: **el peldaño 5 queda ejercido sobre el propio método**, que es justo lo que el método dice que hay que hacer y todavía no había hecho sobre sí mismo.

---

## 2. El árbol del portal: contexto amplio y respuesta con evidencia

Te pedí esto porque la auditoría dejó una ambigüedad abierta y te prohibía escribir en el portal hasta resolverla. **Ya está resuelta, y la auditoría se equivocó.**

### Qué preguntaba la auditoría

Decía: «el árbol local que tiene la portada apunta a un remoto llamado rpaforce-crm, y el flujo del método publica en pkuschnirof/rpaforce». O sea: dos nombres parecidos, y nadie sabía cuál es el que de verdad está desplegado. Empujar al equivocado significa o bien no cambiar nada, o bien escribir en un sistema que no es el que creés.

### Qué encontré, midiendo

**Los dos repositorios existen y son cosas distintas.** `pkuschnirof/rpaforce` es el sitio web: tiene adentro una carpeta `yujin.app/` con todos los sitios del dominio, y ahí abajo `urazuke/`. `pkuschnirof/rpaforce-crm` es otro producto entero —un CRM, con su aplicación, su infraestructura y su móvil— y **no contiene la portada de Urazuke en ninguna parte**: pedí esa ruta y devuelve «no existe».

**Lo que se está sirviendo hoy sale del primero, y lo probé byte a byte.** Bajé la página de producción y bajé la copia que está en `pkuschnirof/rpaforce`. Son idénticas salvo **una sola línea agregada al final**: un script de medición de rendimiento que inyecta el hosting (es GoDaddy/secureserver, se identifica solo en ese script). No hay otra diferencia. Eso cierra la pregunta: **el árbol desplegado es `pkuschnirof/rpaforce`, en `yujin.app/urazuke/`, exactamente como dice el flujo del método.**

**De dónde salió la confusión de la auditoría, que es lo interesante.** En esta máquina hay un directorio `C:\RPAForce` que efectivamente apunta a `rpaforce-crm`. Pero la portada **no está ahí**: está en `C:\RPAForce\web`, que es un repositorio **anidado adentro del otro**, con su propio remoto, y ese remoto sí es `pkuschnirof/rpaforce`. La auditoría miró la carpeta padre, leyó el remoto del padre, y atribuyó ese remoto al contenido del hijo. Es un error razonable y es exactamente el tipo de cosa que una auditoría «desde afuera» no puede ver.

### Y acá está el hallazgo que cambia dos entradas del backlog

La auditoría pedía «averiguá qué quedó sin publicar y por qué». La respuesta es mucho más simple de lo que parecía: **nada se rompió. El trabajo nunca se commiteó.**

En `C:\RPAForce\web`, hoy:

- la portada corregida (la que dice «cuatro tramos», 68.450 caracteres) está **modificada y sin commitear**;
- el mapa del sitio está **modificado y sin commitear**;
- las **nueve portadas por idioma** (`ar/ de/ en/ fr/ hi/ it/ ja/ pt/ zh/`) están **sin agregar siquiera al control de versiones**;
- y con ellas, tres piezas que la auditoría no sabía que existían: un **contrato escrito** de cómo se generan esas nueve portadas, el **generador** que las produce y un **verificador** que las comprueba;
- la rama local no tiene **ningún** commit por empujar, y el remoto está **dos commits adelante** (son las publicaciones automáticas del método, que sí funcionaron).

O sea: los hallazgos U-18 (las nueve portadas dan 404) y U-19 (producción dice «tres tramos» y se contradice con su propio archivo de idioma) **no son dos problemas: son un solo evento**, y el evento es trabajo terminado que quedó en el disco. No hay que diagnosticar una tubería rota ni republicar nada del método: hay que correr el generador, verificar, commitear y empujar.

Y hay una consecuencia que vale para el paper: **el asistente ajeno que leyó mal el método tenía razón en lo que leyó.** Le llegó la portada vieja, la que dice tres tramos, porque es la única que existe publicada.

### Un detalle técnico que importa para arreglar la interfaz pública

En todo ese árbol hay **un solo** archivo de configuración de servidor, en la raíz, y está escrito para el otro dominio. No hay ninguno al nivel de `yujin.app/` ni de `urazuke/`. Confirmé además la trampa que la auditoría detectó: la publicación automática **borra y rehace** las dos carpetas de Urazuke en cada fusión. Así que la configuración que hace falta para que la interfaz pública sea legible por un navegador tiene que vivir **en `yujin.app/urazuke/`, un nivel arriba de las dos que se vacían**. La auditoría acertó de lleno acá.

---

## 3. Las decisiones que son tuyas

Son **siete**: las cinco que la auditoría marcó, la confirmación que pidió antes de escribir el índice, y una que la auditoría no vio y que yo encontré. Cada una con contexto, opciones, costo y mi recomendación. Ninguna la ejecuto sin tu palabra.

---

### D1 — ¿Publicamos también una dirección que nunca cambia? *(era U-07)*

**El problema.** Hoy la interfaz pública tiene una sola dirección por recurso, y esa dirección siempre devuelve la última versión. Quien quiera reproducibilidad —un investigador que cita el método, una herramienta que certifica contra una versión concreta— tiene que guardarse su propia copia, y quien apunte a la dirección viva se actualiza en silencio: la huella le cambia abajo de los pies sin que nadie le avise.

**Lo que ya está hecho y hace esto barato.** El método ya declara versión y ya publica una huella recalculable. Lo único que falta es dejar también una copia bajo una dirección que incluya la versión.

**Opciones y costo.**

- **(a) No hacerlo.** Costo cero. El consumidor serio guarda su copia, como hoy.
- **(b) Hacerlo.** El generador escribe además una carpeta por versión, y el espejo la arrastra solo, porque ya copia esa carpeta entera. Crecimiento: unos **165 KB por versión** (los dos archivos). A seis versiones por año, un megabyte por año. El riesgo real no es el tamaño: es que la copia congelada se desincronice de lo que la versión declaró. Se cubre con una comprobación: la copia de la versión vigente tiene que ser **idéntica byte a byte** al archivo vivo.

**¿Y la purga?** La auditoría pregunta cómo se purgan las viejas. Mi respuesta es que **no se purgan nunca**: una dirección inmutable que un día desaparece es peor que no haberla publicado, porque rompe exactamente a quien confió en la promesa. Y un megabyte por año no es un problema que haya que resolver.

**Mi recomendación: sí, hacerlo, sin purga, y después del índice** —porque el índice es el que tiene que decir cuál es la dirección viva y cuál la congelada.

---

### D2 — ¿Firma criptográfica? *(era U-08)*

**El problema, bien planteado.** La huella que el archivo publica es **auto-consistente**: quien pueda editar el archivo puede recalcularla. Protege contra el archivo truncado, la fusión mal hecha y la edición a mano —que es exactamente lo que su propia nota promete, así que no hay deshonestidad— pero **no protege contra alguien que controle el portal**. El ancla de confianza real, hoy, son dos cosas: el registro que vive en el repositorio del método (otro repositorio, con su rama protegida y su historia pública) y el cifrado de la conexión.

**Lo que una firma agregaría, y lo que no.** Una firma sólo sirve contra un compromiso **del portal**, porque la clave viviría arriba, del lado del método. No protege contra un compromiso de la cadena del método, porque ahí es donde estaría la clave. O sea: sube el listón de «cualquiera que entre al hosting compartido» a «alguien que entre a la cadena del método». Es una mejora real, pero acotada.

**El costo, que es el que suele subestimarse.** No es firmar: es la **custodia**. Dónde vive la clave privada, quién puede usarla, cada cuánto rota, qué pasa si se pierde, y cómo un consumidor consigue la clave pública de una manera que no dependa del mismo portal que la firma quería proteger. Eso es un proyecto, no una línea.

**La alternativa barata, que creo que es la que conviene.** El índice va a apuntar al registro que vive en el repositorio del método. Eso le da al consumidor un **segundo ancla, alojado en otro lado**, que puede contrastar sin pedirle nada a nadie. Cuesta un enlace y cubre buena parte del mismo riesgo.

**Mi recomendación: por ahora, escribirlo honesto en el archivo —una frase que diga qué protege la huella y qué no— y dejar la firma como propuesta escrita, no construida.** Y priorizar el puntero al registro, que es mucho más barato por unidad de protección.

---

### D3 — Las dos claves que pueden cambiar sin romper nada *(era U-09)*

**El problema.** Dos claves del archivo publicado quedan **afuera** de lo que la huella protege: el resumen de cantidades y el texto que explica qué es el archivo. Son las dos únicas que pueden cambiar sin que la verificación lo note. Verifiqué que hoy el resumen dice la verdad.

**El argumento para dejarlo como está:** el resumen es derivado (no agrega información) y el texto es prosa explicativa; cubrirlos obliga a subir la versión cada vez que se mejora una redacción.

**El argumento para cubrirlos, que me parece más fuerte, y tiene dos patas.**

Primera: un resumen de cantidades que puede mentir es **peor que no tener resumen**. Una herramienta que lo usa para validar que terminó de leer el archivo aceptaría en silencio un archivo truncado.

Segunda, y es la que decide: **en ese texto explicativo es justamente donde D2 propone poner la frase sobre qué protege la huella y qué no.** Una declaración de confianza que vive fuera de la huella es una declaración que un atacante puede editar para que diga lo contrario. En el momento en que ese campo pasa a contener una afirmación de seguridad, tiene que estar protegido.

Sobre el costo: cubrirlos sube la versión una vez y anota una entrada en el registro. Eso no es un efecto colateral, es **para lo que el registro existe**. Y si mejorar una redacción sube la versión, está bien que la suba: la regla del método dice que una versión es un contenido, y la prosa es contenido.

**Mi recomendación: cubrir las dos**, en el mismo cambio de versión que ya van a forzar otras entradas del backlog.

---

### D4 — El catálogo de textos por idioma *(era U-10)*

**El problema, que es una promesa incumplible.** El archivo publicado le dice al consumidor, con razón: «no imprimas estos textos, leé el identificador y sacá el texto de tu propio catálogo». Pero el método **no le da ningún catálogo**, y lo único legible por máquina que tiene a mano es justamente lo que le pide no imprimir. En la práctica, una herramienta o le muestra castellano a un lector inglés, o se escribe sus propias traducciones —y entonces el método pierde el control de lo que sus compuertas dicen, que es precisamente lo que no quería.

**El dato que cambia el tamaño del trabajo.** A primera vista esto suena a «traducir todo otra vez». No lo es: **las traducciones ya existen**, en prosa, en los documentos del método en siete idiomas. Los 24 peldaños tienen su contrato traducido, las 8 estaciones están en el camino evolutivo-correctivo, y las 45 reglas ya tienen un puntero a su fila del anexo —de hecho el método **ya extrae** el texto inglés de esas 45 desde el anexo, así que el mecanismo está inventado y probado. Esto es **una extracción más**, no una traducción nueva.

**Alcance medido:** 24 + 8 + 45 = 77 identificadores con texto, más el vocabulario de evaluadores. Del orden de unos cientos de cadenas por idioma, todas ya escritas.

**Cómo lo haría.** Un archivo por idioma, con el texto colgado del identificador; un extractor que lo arma desde los documentos; y una verificación que falle si a un idioma le falta un identificador. Nada de esto toca la base congelada, porque los textos por idioma son una capa **encima**, no una edición de los datos.

**Depende de D5:** si el corpus queda en ocho idiomas, son ocho archivos; si va a diez, son diez.

**Mi recomendación: sí, y es la pieza que sigue después del índice** —pero quiero mostrarte la forma concreta antes de escribir una línea, como la auditoría pide. Es el hallazgo que convierte una instrucción imposible en una cumplible.

---

### D5 — Árabe e hindi: la decisión más cara *(era U-15)*

**El problema.** La portada funciona en **diez** idiomas, completa y correcta, incluido el árabe con su dirección de lectura. El corpus del método existe en **ocho**. Un lector árabe o hindi recibe una página impecable en su idioma y una tabla de material que le ofrece ocho idiomas entre los que no está el suyo. **La interfaz promete algo que el corpus no tiene.**

**Los números, contados y no estimados.** El corpus son **34 documentos por idioma**: el documento principal, las referencias, los 24 contratos de peldaño, el camino evolutivo-correctivo, las dos partes del manual-curso, el documento del junior, el del trabajo en equipo y el anexo de heurísticas. Medido hoy, documento por documento:

| idioma | documentos | caracteres |
|---|---:|---:|
| inglés | 34 | 743.678 |
| portugués | 34 | 812.728 |
| francés | 34 | 898.048 |
| alemán | 34 | 911.657 |
| italiano | 34 | 847.581 |
| japonés | 34 | 443.038 |
| chino | 34 | 368.095 |

Agregar dos idiomas son **68 documentos nuevos** y, por la longitud que suele tener cada lengua, del orden de **1,5 a 1,8 millones de caracteres** de texto traducido.

**Pero ése no es el costo que importa.** El costo que importa es **permanente**: la regla del método dice que un cambio en el castellano se replica en todas las traducciones **en el mismo commit**. Pasar de ocho a diez encarece **cada cambio futuro del método en un 25%, para siempre**. Y el método todavía se está moviendo: el cuarto tramo entró hace poco, hay una decisión nueva por escribir y veintidós hallazgos por arreglar.

Hay además un costo escondido que nadie contó: **el árabe se lee al revés**. El conversor que produce los documentos no contempla eso, y la etiqueta del bloque que precede a cada prompt se reconoce por idioma, así que habría que enseñarle dos formas nuevas. No es enorme, pero no es cero y hoy no está.

**Las opciones.**

- **(a) Traducir y quedar en diez en todas partes.** Resuelve la promesa. Cuesta el millón y medio largo de caracteres, más el conversor para el árabe, más el 25% permanente sobre todo cambio futuro.
- **(b) Quedarse en ocho y que la portada deje de prometer lo que no hay.** Dos variantes: retirar árabe e hindi de la interfaz, o **dejarlos y marcar explícitamente, en su propio idioma, que la interfaz está en diez y el corpus en ocho**. Cuesta un par de frases por idioma y una marca en la tabla.
- **(c) Traducir sólo la puerta de entrada** (el documento principal y el léeme) a esos dos idiomas. Lo nombro para descartarlo: un corpus a medias es una promesa rota más difícil de explicar que un «ocho» limpio.

**Mi recomendación: la (b), con la marca y sin retirar nada.** Tres razones. La interfaz en árabe e hindi ya está hecha y es correcta: retirarla pierde alcance a cambio de nada. La frase honesta convierte una promesa rota en una promesa exacta, que es el estándar que el método se exige a sí mismo en todo lo demás. Y sobre todo: **congelá el conjunto de idiomas mientras el método se mueve.** Cuando deje de moverse, la decisión se vuelve a abrir con el costo real a la vista.

**Y un orden que me parece importante.** Antes de decidir si el conjunto crece, decidí **por qué es ese conjunto**. Hoy son ocho porque se heredaron de la lista del protocolo, y esa lista ya tiene diez: la frase «los ocho idiomas de NAC3» quedó vieja sola. El método debería **declarar sus propios idiomas, por su cuenta**, y si coinciden con los del protocolo que sea coincidencia y no definición. Eso es casi gratis, desactiva una dependencia conceptual que no te hace falta, y refuerza justo el argumento que la auditoría quiere que uses.

**Ojo con una trampa que la auditoría encontró y que vale oro:** la frase que cuenta la historia de los idiomas está **adentro de lo que la huella protege**, en los dos archivos publicados. Así que «corregir una oración» es, mecánicamente, subir dos versiones declaradas y anotar dos entradas en un registro que no se edita. Si no se hace en ese orden, la publicación se niega sola. Eso ya está anotado como paso explícito.

---

### D6 — El índice, ¿sin versión ni huella propia? *(la confirmación que la auditoría pidió)*

**Qué propone la auditoría.** Que el índice nuevo **no lleve** versión ni huella propias: es un directorio, no un catálogo, y su identidad es la de aquello que apunta. Si llevara huella, cualquier cambio en los otros dos obligaría a subir una **tercera** línea de versión que nadie declaró.

**Estoy de acuerdo, y el argumento es correcto.** Pero hay una tensión que conviene resolver explícitamente, porque si no queda colgada: si el índice no tiene identidad propia, **¿cómo sabe el consumidor que el índice no está viejo?** Y un índice viejo es exactamente el peor caso, porque miente con cara de dato verificado.

**La salida no es darle versión: es que el índice sea comprobable contra lo que apunta.** El consumidor pide el recurso, recalcula su huella, y la compara con la que el índice citó. Si no coinciden, el índice está viejo y el consumidor lo sabe **sin necesidad de confiar en él**. Esa es la razón por la que no necesita identidad propia, y es lo que tiene que **decir en su propio texto explicativo**: «no me uses como ancla de confianza; verificame contra los recursos que listo».

**Mi recomendación: confirmo la propuesta, con esa frase agregada**, y con la comprobación automática que la auditoría pide —que el índice cite siempre las huellas vivas— corriendo en la cadena.

---

### D7 — La huella de herramienta en el dato publicado *(era U-22, más lo que la auditoría no vio)*

Acá hay **dos cosas** de peso muy distinto, y la auditoría le dedicó un hallazgo entero a la chica y se perdió la grande.

**La chica.** En una nota del archivo publicado se cita la ruta del archivo que guarda la base congelada, y ese nombre incluye el de la herramienta. Es procedencia honesta: dice de dónde salió el congelado y por qué no se edita. Renombrarlo escondería la historia, y además cambiaría un texto que está adentro de la huella, o sea una suba de versión por cosmética. **Mi recomendación: dejarlo, y explicarlo en vez de disimularlo.**

**La grande, que encontré yo.** La auditoría te propone, como «la prueba más fuerte que tenés» contra la objeción de que esto es la narrativa de un producto, que en los datos publicados no hay ni una mención de las herramientas. **La primera mitad es cierta** —del protocolo, cero menciones, lo verifiqué— **y la segunda es falsa.** El peldaño de dimensionamiento publica, como pregunta de verificación del dueño, literalmente: *«¿El registro de dimensionamiento de Forge está admisible?»*. Un artefacto de una herramienta, nombrado adentro de una compuerta obligatoria, en el nivel de datos.

Si publicás el argumento tal como está escrito, **el primero que busque adentro del archivo te refuta.** Y lo agrava el lugar: esa pregunta está en la **base congelada**, la parte que por regla no se toca.

**Las opciones.**

- **(i) Dejarla y ajustar el argumento.** En vez de «cero menciones de herramienta», decir la verdad completa: cero menciones del protocolo, y una sola de la herramienta, heredada del congelado, que nombramos nosotros antes de que la encuentre otro. Costo: una frase. Honestidad: total. Es, de hecho, un argumento **más** creíble que el absoluto, porque un absoluto invita a buscarle la excepción.
- **(ii) Neutralizar la pregunta.** No se edita la entrada congelada —eso está prohibido—: entra una entrada **nueva** que la reemplaza, con su marca de versión, su decisión escrita y su anotación en el registro. La regla del método **ya contempla** este caso: dice que si de verdad hay que cambiar un requisito existente, es un cambio del método y va con su decisión. Lo que no existe todavía es **cómo se expresa eso** en la comprobación de diferencia cero contra el congelado.

**El costo real de la (ii), dicho sin suavizar:** sería **la primera vez** que se toca el congelado. No es una edición puntual, es construir y estrenar el mecanismo de reemplazo, y eso fija el precedente de cómo se hace de ahí en adelante. Es el cambio de más riesgo de todo el backlog.

**Mi recomendación, con el matiz: la (ii), pero sólo si querés el argumento absoluto para el paper.** A favor: el método está por publicar un escrito que defiende la neutralidad de herramienta, y una compuerta que nombra una herramienta es el único contraejemplo citable. Además otra entrada del backlog ya obliga a subir la versión de ese mismo archivo, así que el costo marginal de que viaje junto es casi nulo. Y hay un beneficio inesperado: **estrenar el mecanismo de reemplazo deja un rastro de auditoría que es material de primera para el paper** —«así se enmienda un requisito congelado, y esto es lo que queda escrito».

Contra: toca lo intocable por un motivo retórico. **Si preferís no abrir esa puerta antes del paper, la (i) es perfectamente defendible** y cuesta una frase. De las siete, ésta es la decisión donde más me importa que decidas vos.

---

## 4. Algo urgente que apareció de paso, y no es de la auditoría

Buscando el árbol del portal encontré, en una **copia vieja** de otro repositorio que quedó en esta máquina, un **acceso personal a GitHub guardado en texto plano** dentro de la configuración del control de versiones. Cualquiera que lea ese archivo entra a tu cuenta con los permisos que ese acceso tenga.

No lo copio acá a propósito. **Revocalo**: entrá a la configuración de tu cuenta de GitHub, a la sección de accesos personales, y anulá el que esté activo; después borrá o limpiá esa copia vieja. Es cuestión de minutos y no depende de nada de lo demás.

---

## 5. El orden de trabajo que propongo

1. **Arreglar los tres guardianes que no corren** donde la cadena corre. Son tres líneas y hoy dejan pasar en verde cosas que deberían frenar. Todo lo que sigue agrega guardianes nuevos **a esa misma cadena**, así que arreglarla primero no es una preferencia: es la condición para que el resto signifique algo.
2. **Inaugurar el registro de pendientes** con los 22 hallazgos adentro, en el formato del peldaño 5. Pará ahí y revisalo, como pide la auditoría.
3. **Lo que es puro método** y no depende de ninguna decisión tuya: el índice de la interfaz pública, las comprobaciones que lo cubren, la corrección del italiano, la decisión escrita y la actualización del documento de contexto.
4. **Lo que toca el portal**, como un cambio aparte y con su propia evidencia: la configuración que falta, las nueve portadas por idioma, el mapa del sitio, los enlaces a los documentos escondidos y el párrafo que distingue método, protocolo y herramienta.
5. **Lo que dependa de tus siete respuestas**, cuando las tenga.

Una aclaración de encuadre, para que la escalera tenga memoria: esto se trabaja con la normalización abierta y en rojo, y la normalización prohíbe tocar el sistema. O sea que es un evolutivo-correctivo deliberado por encima del tramo, por decisión tuya. Está bien que así sea, pero queda escrito.
