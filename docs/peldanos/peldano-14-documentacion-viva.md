# Peldaño 14 — Documentación viva y manuales que una persona puede seguir sin IA (contrato del peldaño)

**Tramo:** operación (nace con el sistema; se mantiene en cada cambio).
**Forma:** rutina; más un tiro largo cuando se generan los manuales.
**Tamaño:** proporcional. Un sistema chico necesita, como mínimo, el manual de infraestructura y
recuperación (cómo se levanta, cómo se restaura); el de usuario puede ser una página. Lo que no
cambia: si la persona que lo construyó desaparece, otra tiene que poder seguir.

## Para qué sirve

Para que el sistema se pueda usar, mantener y recuperar sin el agente y sin la persona que lo
construyó. Si el día que no está el agente no se puede desplegar, no está terminado. En el método
clásico la documentación era cara y envejecía; acá regenerarla es gratis, entonces la regla pasa
a ser "en el mismo commit" y "reproducible a mano". Evita el documento desactualizado que provocó
un commit en el repositorio equivocado, y el archivo de proyecto convertido en historial.

Un criterio de calidad para el manual de recuperación, que sirve para juzgarlo sin ser técnico:
**tiene que poder seguirlo una persona de confianza que no programe, a las tres de la mañana,
con el sistema caído y el agente sin conexión**. Si en algún paso dice "consultar con el
desarrollador" o "según corresponda", ese paso está incompleto.

## 1. Contexto requerido

- Quiénes son los lectores de cada manual: el usuario final, el que mantiene, el que opera la
  infraestructura. Lo sabe el negocio; el agente pregunta si no está claro.
- El sistema corriendo en el entorno de prueba, para sacar capturas reales.
- `docs/DEPLOYMENT.md` (peldaño 13) y `docs/LOCKS.md` (peldaño 12), que son insumo.

## 2. Prompts

**Rutina (va en el contrato de convivencia):**

> Every change that modifies what the user sees, what the operator does, or how the system is
> deployed, updates the corresponding manual in the same commit. If you do not know which
> manual, ask.

Qué le estamos pidiendo: la regla del mismo commit, que es la única que mantiene un manual al
día, y la pregunta cuando no está claro a qué manual va.

**Para generar los manuales:**

> Generate three manuals from the system as it is today in the test environment: the user
> manual (screen by screen, with real screenshots, in the user's language, no jargon); the
> maintenance manual (how it is built, where everything is, how to run the test suite, how to
> add a module); and the infrastructure and recovery manual (how to deploy, how to roll back,
> how to restore a backup, what to do if it goes down; written for a person who has to do it by
> hand, without AI, at three in the morning). If for any section you need something only the
> business knows (who is responsible for what, which phone number to call), ask me; do not leave
> a gap and do not invent. Each manual carries a date and the system version. Reply in my
> language.

Qué le estamos pidiendo: los tres manuales con sus lectores; capturas **reales** del entorno de
prueba (no dibujos ni descripciones); el criterio de las tres de la mañana para el de
recuperación; la cláusula de completitud en su forma para documentar: lo que solo el negocio
sabe se pregunta, y **no se deja un hueco ni se inventa**; y fecha y versión, para que se sepa a
qué sistema corresponde cada manual.

## 3. Resultado esperado

- `docs/USER_MANUAL.md` (o HTML), con capturas reales e incrustadas.
- `docs/MAINTENANCE_MANUAL.md`.
- `docs/INFRASTRUCTURE_AND_RECOVERY_MANUAL.md`: paso a paso, para una persona.
- Cada uno con fecha y la versión del sistema que documenta.
- En los commits que cambian pantallas, operación o despliegue: el manual actualizado.

## 4. Verificación de completitud

- Abrí el manual de usuario en una pantalla al azar: ¿la captura coincide con lo que hay hoy
  en el entorno de prueba?
- ¿El manual de recuperación lo podrías seguir vos, o alguien de confianza que no programe?
  Leé la sección de "se cayó": ¿dice qué hacer, en orden, con los comandos?
- Elegí un commit reciente que cambió una pantalla: ¿tocó el manual?
- ¿Hay un hueco tipo "[completar]" o "consultar al responsable"? Ahí el agente tenía que
  preguntar.
- ¿Cada manual dice para qué versión del sistema vale?

## 5. Señales de alarma

- El manual de usuario tiene capturas de una versión que ya no existe. Se generó una vez y no
  se mantuvo: la regla del mismo commit no está en el contrato o no se está aplicando.
- El manual de recuperación empieza con "abrir una sesión con el agente". Si el agente es un
  prerrequisito, no es un manual para una persona.
- Nadie fuera del constructor leyó nunca el manual de recuperación. Pedile a alguien que lo
  siga en el entorno de prueba; lo que trabe es lo que hay que arreglar.
