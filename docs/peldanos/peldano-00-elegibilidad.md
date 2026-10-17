# Peldaño 0 — ¿Este proyecto se puede encarar así? (contrato del peldaño)

**Tramo:** arranque (una vez por proyecto, antes de abrir el repositorio).
**Forma:** conversación (el agente evalúa y pregunta; el dueño decide).
**Estado:** en elaboración con Pablo. Los criterios excluyentes X1 y X2 están confirmados; el
resto son hipótesis sin peso todavía.

## Para qué sirve

Para no meterse en un proyecto donde el método no puede funcionar. Si el agente no va a poder
verificarse solo de punta a punta, o si no hay un dueño del dominio que decida, el método se
degrada a "programar con IA" y el humano termina leyendo código. Este peldaño es la puerta de
entrada: se cruza una vez, y si no se cruza, mejor saberlo antes que después.

## 1. Contexto requerido

Nombrado en forma genérica; el agente evalúa si alcanza y pide lo que falte.

- Relevamiento del pedido: qué quiere el cliente, para quién, y qué pasa hoy sin el sistema.
- Relevamiento tecnológico: qué tecnología hay o se propone, si existe un sistema anterior, si
  ese sistema tiene repositorio y cómo está manejado.
- Relevamiento de testeabilidad: si las pantallas se pueden ejecutar por programa y si cada
  elemento de la interfaz es accesible con sus distintos métodos (clic, tipeo, lectura de
  estado), de modo que un test recorra la pantalla y verifique el efecto en el backend.
- Quién es el dueño del dominio y cuánto tiempo tiene para decidir.
- Qué consecuencia tiene un error (plata, salud, operación, nada).
- Entornos y accesos: si va a haber un entorno de prueba, si el agente puede acceder, si hay
  producción consultable en solo lectura.

## 2. Prompts

**Inicial:**

> Vamos a evaluar si este proyecto se puede encarar con el método de la escalera. Leé el
> relevamiento en `docs/RELEVAMIENTO_INICIAL.md` y la ficha de criterios en
> `docs/ELEGIBILIDAD_CRITERIOS.md`. Primero evaluá si el relevamiento alcanza para responder
> cada criterio; **si falta información para alguno, pedímela antes de seguir, y no supongas**.
> Después completá la ficha criterio por criterio: para cada uno, la respuesta, de dónde sale,
> y si es excluyente, si está en verde o en rojo. No decidas vos: presentame la ficha con tu
> lectura y las dudas, y yo decido.

**De cierre:**

> Decido: [va / no va / va con estas condiciones: …]. Dejá la ficha final en
> `docs/ELEGIBILIDAD.md` con fecha, quién decidió, la respuesta a cada criterio con su fuente,
> y las condiciones si las hay.

## 3. Resultado esperado

Un archivo `docs/ELEGIBILIDAD.md`, de una página, con:

- Fecha y quién decidió.
- Los dos criterios excluyentes con su respuesta y su fuente:
  - X1: hay repositorio accesible y manejado de forma estándar (o el proyecto es nuevo).
  - X2: la interfaz se puede ejecutar por programa y cada elemento es accesible con sus
    distintos métodos, con verificación del efecto en el backend.
- Los criterios que ponderan (los D1 a D10 de la escalera, cuando estén cerrados), cada uno
  con respuesta, fuente y peso.
- La decisión: va, no va, o va con condiciones, y las condiciones escritas.
- Las preguntas que el agente hizo y las respuestas, para que quede el rastro.

## 4. Verificación de completitud (la hace el dueño, sin leer código)

- ¿Los dos excluyentes tienen respuesta explícita y fuente? Si alguno está en rojo, ¿la
  decisión es "no va" o tiene una condición que lo resuelve?
- ¿Hay algún criterio respondido con "supongo que sí" o "probablemente"? Si lo hay, el
  peldaño no está subido: el agente tenía que preguntar.
- ¿La decisión está escrita con fecha y con nombre?
- ¿Las condiciones (si las hay) son verificables? ("Tener acceso de lectura a producción
  antes del peldaño 3" sí; "que el cliente colabore" no.)
