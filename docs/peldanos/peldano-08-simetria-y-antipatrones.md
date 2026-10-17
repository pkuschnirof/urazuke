# Peldaño 8 — Simetría entre productor y consumidor, y el registro de anti-patrones (contrato del peldaño)

**Tramo:** bucle (cada cambio que toca un contrato entre dos partes).
**Forma:** automática en el bucle; más un archivo que crece con cada golpe.
**Tamaño:** la simetría es obligatoria siempre; el mapa productor/consumidor es opcional en un
proyecto de un solo módulo, y obligatorio en cuanto hay una pantalla y un servidor separados.

## Para qué sirve

Cuando cambiás una punta (el servidor, el robot, el esquema de la base), la otra punta (la
pantalla, el contador, el que consume) tiene que cambiar en el mismo commit. Si no, tarde o
temprano divergen, y el usuario ve un número en un lado y otro número en el otro (el caso 1.355
contra 1.234). Y los errores que ya nos comimos una vez se anotan para no comerlos dos veces.

El principio general detrás: **toda lista tiene un solo dueño**. Las columnas de una tabla, los
estados posibles de una orden, las causas por las que algo espera: las define una sola parte del
sistema (el productor) y todas las demás las leen de ahí. En cuanto hay dos copias de la misma
lista, una de las dos está desactualizada; solo falta saber cuál.

## 1. Contexto requerido

- Un mapa de qué partes del sistema consumen qué: qué pantallas leen qué servicios, qué
  procesos escriben qué tablas. Si no existe, el primer prompt lo construye.
- El registro de anti-patrones `docs/GOTCHAS.md`, aunque esté vacío.

## 2. Prompts

**Para construir el mapa (una vez):**

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

Qué le estamos pidiendo: el inventario de contratos con sus dos lados, y la cláusula de
completitud en su forma para este peldaño: lo que no se ve se declara, no se omite. Un mapa con
huecos tapados es peor que ningún mapa.

**Rutina (va en el contrato de convivencia):**

> Before closing any change that touches a contract, look up every consumer in the map and
> update them in the same commit. Always prefer that the producer defines the list (columns,
> causes, states) and the consumer reads it, rather than each keeping its own copy. If the map
> does not have that relationship, add it.

Qué le estamos pidiendo: la simetría como reflejo (buscar el otro lado antes de cerrar), la
regla de la lista con un solo dueño, y que el mapa se mantenga solo a medida que se usa.

**Cuando algo se rompe por segunda vez:**

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

Qué le estamos pidiendo: el formato fijo de un anti-patrón (olor, causa raíz, arreglo, detección
temprana) y, lo más importante, la verificación automática: un anti-patrón anotado y no
automatizado se va a repetir cuando cambie la persona o la sesión.

## 3. Resultado esperado

- `docs/PRODUCER_CONSUMER_MAP.md`: la lista de contratos con productor y consumidores.
- En cada commit que toca un contrato: los consumidores actualizados, nombrados en el mensaje.
- `docs/GOTCHAS.md`: una entrada por anti-patrón, con las cuatro partes (olor, causa raíz,
  arreglo, cómo detectarlo antes), y la fecha de la primera vez.

## 4. Verificación de completitud

- Elegí un contrato del mapa y pedile al agente que te muestre dónde lo lee cada consumidor.
  Si alguno tiene su propia copia de la lista, hay deuda.
- ¿Hay un número que se muestre en dos pantallas distintas? Compará: ¿dan igual?
- ¿Cada entrada de GOTCHAS tiene las cuatro partes?
- ¿Se repitió algún error que ya estaba en GOTCHAS? Si sí, falta la verificación automática.

## 5. Señales de alarma

- El mismo valor aparece escrito a mano en más de un archivo ("PENDIENTE", "APROBADA" en el
  servidor y en la pantalla). Dos copias; una va a divergir.
- Un cambio en el servidor se cerró con el test del servidor en verde y nadie tocó la pantalla.
- GOTCHAS tiene entradas sin la parte "cómo detectarlo antes". Son anécdotas, no anti-patrones.
