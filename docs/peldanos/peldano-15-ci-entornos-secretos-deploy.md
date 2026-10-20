# Peldaño 15 — Integración continua, entornos, secretos y despliegue como parte del producto (contrato del peldaño)

**Tramo:** salida a producción.
**Cuándo:** la cadena de integración y el despliegue al entorno de prueba se montan en el peldaño
4. El cierre hacia producción —entorno real, secretos en el servidor, promoción, vuelta atrás
probada, candado contra secretos— se hace en el tramo de salida, después de la auditoría y de los
candados. La rutina de cada despliegue se aplica en toda la operación.
**Forma:** un solo tiro para montarlo; rutina para cada despliegue.
**Tamaño:** obligatorio en todo proyecto con usuarios. En uno chico, "integración continua" puede
ser una sola acción de GitHub y "entornos" pueden ser dos carpetas en el mismo servidor; lo que no
se negocia es que los tests corran solos, que la configuración no esté en el repositorio, y que
haya vuelta atrás.

## Para qué sirve

Hacé que llegar a producción sea un paquete reproducible: los tests corren UNA vez, la
configuración vive fuera del repositorio, y los secretos no andan dando vueltas. Evita los tests
corridos tres veces por commit y la cuota fundida [Ref. 39](../REFERENCIAS.md#ref-39), el
despliegue endurecido a golpe de pendientes por haberlo descubierto tarde
[Ref. 32](../REFERENCIAS.md#ref-32), y los secretos pegados en el chat
[Ref. 42](../REFERENCIAS.md#ref-42).

Sobre los secretos hay una regla que adoptá como reflejo, sin excepciones: **un secreto que se vio
en un chat, en un log o en un commit ya no es un secreto**. No importa si "nadie lo vio" o si "se
borró después". Se rota. La rotación cuesta diez minutos; averiguar si alguien lo usó es
imposible.

## 1. Contexto requerido

Lo que sigue es la lista genérica. Los archivos concretos que tenés que tener hechos antes de cada
prompt, con su contenido y su estado mínimo, están en la sección 2, en el bloque "Antes de enviar
el prompt" que precede a cada uno.

- **Relevamiento de entornos y accesos**, en forma genérica: qué entornos hay (prueba,
  producción), dónde corren, quién tiene acceso, cómo se promueve algo de uno a otro, qué secretos
  existen y dónde viven hoy, cuánta cuota de integración continua hay. El agente evalúa si alcanza
  y pregunta.
- El esqueleto con su integración continua y su despliegue a prueba (peldaño 4).

## 2. Prompts

**Inicial:**

**Antes de enviar el prompt**, esto tiene que existir, y lo hacés vos (o el negocio con vos), no
el agente:

- `docs/ENVIRONMENTS_SURVEY.md` (peldaño 4), completado con lo que falta para producción: el
  dominio y quién lo administra; dónde van a vivir los secretos en el servidor (archivo de
  entorno, bóveda) y cuáles son (el nombre, nunca el valor); cómo se promueve hoy algo de prueba a
  producción, si hay algo; quién puede tocar producción; cuánta cuota de integración continua
  tenés (el límite del plan de tu proveedor) y cuánta consumiste; cómo se haría una vuelta atrás
  hoy. El prompt lo nombra "the environments and access survey": decile dónde está.
- El acceso a producción para el agente, decidido por vos: cuál, con qué credencial, y la
  credencial fuera del repositorio y del chat.
- El esqueleto con su integración continua y su despliegue a prueba funcionando (peldaño 4), y
  `docs/STATUS.md` con los comandos.
- Estado mínimo aceptable: sabés dónde van a vivir los secretos y cuánta cuota te queda. Si no
  sabés la cuota, averiguala antes: este peldaño existe en parte por eso.

> We are going to close the path to production. Read the environments and access survey.
> Evaluate whether you have what is needed to deploy to production safely (access, domain,
> where the secrets live, how to roll back); if anything is missing, ask me. Then set up: (1)
> continuous integration runs the full test suite exactly once per commit; (2) the deployment
> waits for that run's result and only packages and uploads, without running tests again; (3)
> each environment's configuration lives on the server (environment file or vault), never in the
> repository; (4) a written procedure to promote from the test environment to production, which
> can be run twice without breaking anything; (5) the rollback, tested — and if any change
> migrates schema or data, a written plan for undoing or compensating it, since reverting the code
> alone does not undo a migration that already ran; (6) an automatic check that prevents
> committing a secret. Document all of it in `docs/DEPLOYMENT.md` so that a person can do it by
> hand without you. Reply in my language.

> [es]
> Vamos a cerrar el camino a producción. Leé el relevamiento de entornos y accesos. Evaluá si
> tenés lo necesario para desplegar a producción con seguridad (acceso, dominio, dónde viven los
> secretos, cómo volver atrás); si falta algo, pedímelo. Después armá: (1) la integración continua
> corre la batería completa exactamente una vez por commit; (2) el despliegue espera el resultado
> de esa corrida y solo empaqueta y sube, sin volver a correr tests; (3) la configuración de cada
> entorno vive en el servidor (archivo de entorno o bóveda), nunca en el repositorio; (4) un
> procedimiento escrito para promover del entorno de prueba a producción, que se pueda correr dos
> veces sin romper nada; (5) la vuelta atrás, probada —y si algún cambio migra esquema o datos, un
> plan escrito para deshacerlo o compensarlo, porque revertir el código solo no deshace una
> migración que ya corrió—; (6) una verificación automática que impida subir un secreto en un
> commit. Documentá todo en `docs/DEPLOYMENT.md` de modo que una persona lo pueda hacer a mano sin
> vos. Respondé en mi idioma.

Qué le estoy pidiendo, cláusula por cláusula: los accesos antes de empezar; los tests **una sola
vez** por commit (correrlos tres veces es lo que fundió la cuota); el despliegue que solo
empaqueta; la configuración fuera del repositorio; la promoción como procedimiento repetible; la
vuelta atrás **probada** (una vuelta atrás que nunca se probó no existe) **con su plan de datos**,
porque una migración de esquema o de datos no se deshace revirtiendo el commit; el candado contra
secretos en los commits; y la documentación para una persona, que es el peldaño 20 aplicado a la
infraestructura.

**Rutina de cada despliegue:**

**Antes de enviar el prompt**, tenés que tener esto a mano:

- `docs/WORKING_AGREEMENT.md`, donde va la rutina.
- `docs/DEPLOYMENT.md` (el prompt inicial de este peldaño), escrito y leído por vos: ¿lo podrías
  seguir solo?
- Antes de cada despliegue real, además: la batería completa de punta a punta en verde con la
  versión exacta (peldaño 8, cierre de bloque), y la auditoría hecha si es el primer despliegue
  (peldaño 13).
- Estado mínimo aceptable: la vuelta atrás se probó al menos una vez antes de que haya usuarios.

> Before touching production: the test environment is green with the same version; the
> rollback is ready; and tell me what changes in the configuration. After deploying: show me
> the version running in production and an end-to-end check on production, read-only.

> [es]
> Antes de tocar producción: el entorno de prueba está en verde con la misma versión; la vuelta
> atrás está lista; y decime qué cambia en la configuración. Después de desplegar: mostrame la
> versión que corre en producción y una verificación de punta a punta sobre producción, en solo
> lectura.

Qué le estoy pidiendo: las tres condiciones previas (prueba en verde con la misma versión, vuelta
atrás lista, cambios de configuración anunciados) y las dos pruebas posteriores (la versión
corriendo y una verificación de punta a punta sin escribir nada).

**Si un secreto apareció en el chat o en un commit:**

**Antes de enviar el prompt**, tenés que tener esto a mano:

- El secreto identificado: cuál es (su nombre, nunca su valor), dónde apareció (el chat, un
  commit, un log) y cuándo. Si apareció en un commit, el commit.
- Tu acceso al lugar donde se genera (el panel del proveedor), por si el agente no puede rotarlo
  solo. La rotación la hacés vos o la hace él con tu credencial, pero no se pospone.
- Estado mínimo aceptable: podés nombrar el secreto y dónde se vio. Y la regla sin excepciones:
  este prompt no se manda "más tarde".

> That secret is compromised: rotate it now, tell me everywhere else it was used, and add the
> check that would have caught it.

> [es]
> Ese secreto está comprometido: rotalo ahora, decime en qué otros lugares se usó, y agregá la
> verificación que lo habría atrapado.

Qué le estoy pidiendo: rotación inmediata, inventario de dónde más estaba, y la verificación que
lo habría detectado, para que la próxima vez no llegue al chat.

## 3. Resultado esperado

- La integración continua corriendo una sola vez por commit, con el enlace a una corrida.
- El despliegue que espera a la integración y solo empaqueta; medido: cuánto tarda antes y
  después.
- La configuración fuera del repositorio; en el repo, solo un ejemplo sin valores.
- `docs/DEPLOYMENT.md`: cómo desplegar, promover y volver atrás, paso a paso, para una persona.
- La vuelta atrás probada al menos una vez, con su evidencia.
- La verificación anti-secretos activa (un intento de subir uno, rechazado).
- Un registro de la cuota de integración continua consumida por mes.

## 4. Verificación de completitud

- ¿Cuántas veces corre la batería por cada commit? Tiene que ser una. Pedí el enlace.
- ¿Hay algún valor real de configuración (una clave, una contraseña, una URL interna) en el
  repositorio? Pedile al agente que busque y te muestre la búsqueda vacía.
- ¿Podrías seguir `docs/DEPLOYMENT.md` vos solo, sin el agente? Leelo con esa pregunta.
- ¿La vuelta atrás se probó? ¿Cuándo? ¿Qué evidencia hay?
- Si hubo una migración de esquema o de datos: ¿hay un plan escrito para deshacerla o compensarla,
  además de la vuelta atrás del código?
- ¿Se pegó algún secreto en el chat durante el proyecto? Si sí, ¿se rotó?
- ¿Sabés cuánta cuota de integración continua queda este mes?

## 5. Señales de alarma

- El despliegue a producción se hace "a mano, rápido, porque es un cambio chico". Los cambios
  chicos son los que rompen producción, porque nadie los prueba.
- El archivo de ejemplo de la configuración tiene valores que parecen reales. Probablemente lo
  sean.
- Nadie sabe decir cuándo fue la última vez que se probó la vuelta atrás.
- Una migración cambió datos o esquema y "la vuelta atrás" de la que se habla es solo la del
  código. Para esa migración, no hay vuelta atrás: hay, en el mejor de los casos, un plan para
  compensarla.
