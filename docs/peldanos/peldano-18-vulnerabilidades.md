# Peldaño 18 — Escaneo y solución de vulnerabilidades, en la cadena y con calendario (contrato del peldaño)

**Tramo:** salida a producción.
**Cuándo:** en la fase de salida a producción, después del 15 (el escaneo corre en la
integración continua) y antes del primer despliegue: ningún P0 abierto se promueve. Después, en
cada push, y con un calendario propio (semanal) aunque no haya pushes, porque las
vulnerabilidades nuevas aparecen sin que vos cambies nada. En un legado, la primera corrida es
parte de N3 (la dimensión de seguridad de la auditoría) y los hallazgos entran al backlog con su
marca de velocidad.
**Forma:** un solo tiro para montar y correr; después, automático, con un reporte que vos leés.
**Tamaño:** obligatorio en todo proyecto que vaya a tener usuarios: el escaneo de dependencias y
de secretos no se negocia; el análisis estático y la línea base de configuración, proporcionales.

## Para qué sirve

La auditoría del peldaño 13 mira el sistema con ojos frescos cada tanto; este peldaño mira una
sola cosa, la seguridad, todo el tiempo y por máquina. Son complementarios: la auditoría encuentra
lo que requiere criterio (una puerta de administrador que nadie debería tener
[Ref. 40](../REFERENCIAS.md#ref-40)); el escaneo encuentra lo que requiere constancia (la dependencia
que ayer no tenía una vulnerabilidad conocida y hoy sí [Ref. 41](../REFERENCIAS.md#ref-41)). La
primera auditoría de seguridad formal me convenció de que la seguridad es una rutina periódica y
no una lista que se tilda una vez [Ref. 23](../REFERENCIAS.md#ref-23); este peldaño es esa rutina
hecha máquina.

Y una regla que quiero escrita: **una actualización de dependencia es un cambio**, y entra por el
bucle como cualquier otro. "Subí la versión para cerrar la vulnerabilidad" sin regresión ni punta
a punta es la forma más común de romper producción un viernes.

**Si sos principiante.** Una *vulnerabilidad* es un defecto que alguien puede usar para entrar,
robar datos o hacer que el sistema haga algo que no debería. Las hay de cuatro tipos que este
peldaño busca por máquina. En las *dependencias*: las piezas de software de otros que tu sistema
usa (hay bases públicas que listan cuáles tienen defectos conocidos, identificados con un número
CVE). En el *código*: el *análisis estático* lee el código sin ejecutarlo buscando patrones
peligrosos, como una *inyección* (que un usuario escriba en un formulario algo que la base
interprete como una orden). En el *historial*: un secreto (una contraseña, una clave) que alguna
vez se guardó en el repositorio sigue ahí aunque después se haya borrado. Y en la
*configuración*: puertos abiertos que no hacían falta, contraseñas por defecto, *cabeceras de
seguridad* (instrucciones que el servidor le manda al navegador para protegerlo) que faltan.

## 1. Contexto requerido

Lo que sigue es la lista genérica. Los archivos concretos que tenés que tener hechos antes de cada
prompt, con su contenido y su estado mínimo, están en la sección 2, en el bloque "Antes de enviar
el prompt" que precede a cada uno.

- La integración continua (peldaño 4 y 15), donde corre el escaneo.
- El relevamiento de entornos: qué servidor, qué contenedor, qué puertos, para la línea base de
  configuración.
- La auditoría anterior (13, o N3), para no reportar lo ya conocido.
- Tu criterio sobre qué es P0: lo que permite entrar, lo que expone datos personales, lo que
  permite cobrar o enviar sin control.

## 2. Prompts

**Inicial (montar, correr, proponer):**

**Antes de enviar el prompt**, esto tiene que existir, y lo hacés vos (o el negocio con vos), no
el agente:

- La integración continua corriendo en cada push (peldaño 4 y 15), con cuota suficiente: el
  escaneo agrega minutos por corrida; averiguá cuántos te quedan.
- `docs/ENVIRONMENTS_SURVEY.md` con el servidor, el contenedor si hay, los puertos expuestos y
  quién administra el dominio, para que el agente sepa qué línea base aplicar.
- `docs/AUDIT_[fecha].md` (peldaño 13 o N3), para que no reporte lo conocido.
- Tu criterio de P0 en dos líneas, para el hueco del prompt. Para la mayoría de los sistemas: lo
  que permite entrar sin credencial, lo que expone datos personales, lo que permite cobrar,
  enviar o borrar sin control.
- Acceso de lectura del agente al servidor para la línea base de configuración; si no se lo das,
  esa parte queda como no escaneada, y lo tiene que decir.
- Estado mínimo aceptable: la integración continua corre, sabés la cuota, y escribiste qué es P0.

> We are going to scan this system for vulnerabilities and fix what matters before production.
> Set up, in continuous integration, on every push and also on a weekly schedule: (1) a scan of
> every dependency against the known vulnerability databases; (2) static analysis of the code for
> the common classes of defect (injection, insecure deserialization, path traversal, weak
> cryptography, hard-coded secrets, insecure defaults); (3) a secrets scan over the whole
> repository history; (4) a check of the server and container configuration against a baseline
> (exposed ports, default credentials, permissions, security headers, transport encryption). Run
> all of it now and write `docs/SECURITY_[date].md` with every finding: where, the risk, the
> evidence, the priority (P0 must be fixed now by my criteria: [criteria]; P1 before production;
> P2 when possible), and whether a fix exists (an upgrade, a patch, a configuration change). If a
> part cannot be scanned from where you are, say so and mark it as not scanned; do not pass it as
> clean. Then propose the fixes for every P0 and P1, one pending item each. Do not apply any
> upgrade yet: an upgrade is a change and goes through the full routine. Reply in my language.

> [es]
> Vamos a escanear este sistema en busca de vulnerabilidades y a arreglar lo que importa antes de
> producción. Armá, en la integración continua, en cada push y también con un calendario semanal:
> (1) un escaneo de cada dependencia contra las bases de vulnerabilidades conocidas; (2) análisis
> estático del código para las clases comunes de defecto (inyección, deserialización insegura,
> recorrido de rutas, criptografía débil, secretos escritos en el código, valores por defecto
> inseguros); (3) un escaneo de secretos sobre todo el historial del repositorio; (4) una
> verificación de la configuración del servidor y del contenedor contra una línea base (puertos
> expuestos, credenciales por defecto, permisos, cabeceras de seguridad, cifrado del transporte).
> Corré todo ahora y escribí `docs/SECURITY_[fecha].md` con cada hallazgo: dónde, el riesgo, la
> evidencia, la prioridad (P0 hay que arreglarlo ya según mi criterio: [criterio]; P1 antes de
> producción; P2 cuando se pueda), y si existe un arreglo (una actualización, un parche, un
> cambio de configuración). Si alguna parte no se puede escanear desde donde estás, decilo y
> marcala como no escaneada; no la des por limpia. Después proponé los arreglos para cada P0 y
> P1, un pendiente cada uno. No apliques ninguna actualización todavía: una actualización es un
> cambio y pasa por la rutina completa. Respondé en mi idioma.

Qué le estoy pidiendo: las cuatro capas de escaneo (dependencias, código, secretos en el
historial, configuración), en la cadena **y con calendario**, porque las vulnerabilidades nuevas
no esperan a tu próximo push; el informe con la forma del peldaño 13, con la cláusula de "no
escaneado" en vez de "limpio"; el criterio de P0 dado por mí; y la prohibición de actualizar sin
pasar por el bucle, que es la que evita el viernes roto.

**De cierre (arreglar y convertir en compuerta):**

**Antes de enviar el prompt**, tenés que tener esto a mano:

- `docs/SECURITY_[fecha].md` leído por vos, con dos hallazgos verificados (pedile la evidencia).
- La lista de arreglos aprobados para el hueco del prompt; para cada actualización de
  dependencia, la conciencia de que es un cambio y va a correr la regresión y la punta a punta.
- Estado mínimo aceptable: ningún P0 sin veredicto.

> Fix [list], each as its own pending item, with its test proved red where a test applies (an
> injection that no longer passes, a header that is now present, a secret that is now refused),
> and with the regression suite and the end-to-end suite green after every upgrade. Run the scan
> again and show me it is clean of P0 and P1. Make the scan a gate in `docs/GATES.md`: nothing is
> promoted to production with an open P0, and a new P1 opens a pending item automatically. Record
> the policy, the schedule and what is not covered in `docs/SECURITY.md`.

> [es]
> Arreglá [lista], cada uno como pendiente propio, con su test probado en rojo donde un test
> aplique (una inyección que ya no pasa, una cabecera que ahora está, un secreto que ahora se
> rechaza), y con la regresión y la batería de punta a punta en verde después de cada
> actualización. Volvé a correr el escaneo y mostrame que está limpio de P0 y P1. Hacé del escaneo
> una compuerta en `docs/GATES.md`: nada se promueve a producción con un P0 abierto, y un P1
> nuevo abre un pendiente automáticamente. Registrá la política, el calendario y lo que no está
> cubierto en `docs/SECURITY.md`.

Qué le estoy pidiendo: un pendiente por arreglo, con el rojo del peldaño 8 donde se puede (una
vulnerabilidad arreglada sin test vuelve con el próximo refactor); el escaneo repetido como
evidencia; y la conversión en compuerta, que es lo que hace que este peldaño siga vivo cuando
nadie lo mira.

## 3. Resultado esperado

- El escaneo en cuatro capas corriendo en cada push y semanalmente.
- `docs/SECURITY_[fecha].md` con los hallazgos y lo no escaneado; `docs/SECURITY.md` con la
  política, el calendario, la compuerta y la cobertura.
- Los P0 y P1 arreglados, cada uno con su pendiente y su test donde aplica.
- La compuerta en `docs/GATES.md`.

## 4. Verificación de completitud

- Pedile el enlace a la última corrida del escaneo: ¿está en verde, y de qué fecha es?
- ¿El informe dice qué NO escaneó?
- ¿Cada P0 tiene su pendiente cerrado con evidencia, o abierto con fecha?
- Pedile que introduzca a propósito una dependencia con vulnerabilidad conocida en una rama: ¿la
  cadena se pone en rojo?
- ¿Sabés cuándo corre el próximo escaneo programado?

## 5. Señales de alarma

- El escaneo pasó limpio a la primera en un sistema con más de un mes. Casi nunca es verdad: falta
  una capa, o se escaneó solo la rama y no el historial.
- Se actualizaron diez dependencias en un commit "para cerrar los hallazgos". Ese commit no
  tiene antes ni después; es el viernes roto esperando.
- El escaneo está pero no es compuerta: produce informes que nadie lee.
- Hay un P0 "aceptado" sin pendiente ni fecha ni firma.
