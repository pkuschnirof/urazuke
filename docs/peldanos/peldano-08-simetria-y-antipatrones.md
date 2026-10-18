# Peldaño 8 — Simetría entre productor y consumidor, y el registro de anti-patrones (contrato del peldaño)

**Tramo:** bucle.
**Cuándo:** con cada pendiente que toca un contrato entre dos partes del sistema. El mapa de
contratos se construye al abrir el segundo bloque funcional, cuando ya hay pantalla y servidor. El
registro de anti-patrones crece cada vez que algo se rompe por segunda vez.
**Forma:** automática dentro del bucle; más un archivo que crece con cada golpe.
**Tamaño:** la simetría es obligatoria siempre; el mapa productor/consumidor es opcional en un
proyecto de un solo módulo, y obligatorio apenas hay una pantalla y un servidor separados.

## Para qué sirve

Cuando cambiás una punta (el servidor, el robot, el esquema de la base), hacé que la otra punta
(la pantalla, el contador, el consumidor) cambie en el mismo commit. Si no, tarde o temprano
divergen, y el usuario ve un número de un lado y otro número del otro
[Ref. 26](../REFERENCIAS.md#ref-26). Y los errores que ya pagaste una vez, anotalos para no
pagarlos dos veces [Ref. 2](../REFERENCIAS.md#ref-2).

El principio general detrás, que impuse en la Obra Social y que vale para todo sistema
[Ref. 27](../REFERENCIAS.md#ref-27): **toda lista tiene un solo dueño**. Las columnas de una
tabla, los estados posibles de una orden, las causas por las que algo espera: las define una sola
parte del sistema (el productor) y todas las demás las leen de ahí. En cuanto hay dos copias de la
misma lista, una está desactualizada; solo falta saber cuál. El árbol semántico del peldaño 2 es
el primer lugar donde esas listas se declaran: los estados de una entidad están ahí, y el código
tiene que leerlos de una sola fuente.

## 1. Contexto requerido

- Un mapa de qué partes del sistema consumen qué: qué pantallas leen qué servicios, qué procesos
  escriben qué tablas. Si no existe, el primer prompt lo construye.
- El registro de anti-patrones `docs/GOTCHAS.md`, aunque esté vacío.

## 2. Prompts

**Para construir el mapa (una vez):**

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

> [es]
> Construí `docs/PRODUCER_CONSUMER_MAP.md`: para cada contrato del sistema (un servicio, una
> tabla, un formato de archivo, una lista de valores), quién lo produce y quién lo consume. Si hay
> partes del sistema a las que no podés acceder o que no entendés, decímelo en vez de dejarlas
> fuera del mapa. Respondé en mi idioma.

Qué le estoy pidiendo: el inventario de contratos con sus dos lados, y la cláusula de completitud
en su forma para este peldaño: lo que no se ve se declara, no se omite. Un mapa con agujeros
escondidos es peor que ningún mapa.

**Rutina (va en el contrato de convivencia):**

> Before closing any change that touches a contract, look up every consumer in the map and
> update them in the same commit. Always prefer that the producer defines the list (columns,
> causes, states) and the consumer reads it, rather than each keeping its own copy. If the map
> does not have that relationship, add it.

> [es]
> Antes de cerrar cualquier cambio que toque un contrato, buscá en el mapa a cada consumidor y
> actualizalos en el mismo commit. Preferí siempre que el productor defina la lista (columnas,
> causas, estados) y el consumidor la lea, en vez de que cada uno tenga su copia. Si el mapa no
> tiene esa relación, agregala.

Qué le estoy pidiendo: la simetría como reflejo (buscar el otro lado antes de cerrar), la regla de
la lista con un solo dueño, y que el mapa se mantenga solo a medida que se usa.

**Cuando algo se rompe por segunda vez:**

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

> [es]
> Esto ya nos pasó. Registralo en `docs/GOTCHAS.md` con: cómo huele (la señal temprana), la causa
> raíz, el arreglo, y cómo detectarlo la próxima vez antes de que duela. Y agregá, si se puede, un
> test o una verificación automática que lo detecte.

Qué le estoy pidiendo: el formato fijo de un anti-patrón (olor, causa raíz, arreglo, detección
temprana) y, sobre todo, la verificación automática: un anti-patrón anotado y no automatizado se
va a repetir cuando cambie la persona o la sesión.

## 3. Resultado esperado

- `docs/PRODUCER_CONSUMER_MAP.md`: la lista de contratos con productor y consumidores.
- En cada commit que toca un contrato: los consumidores actualizados, nombrados en el mensaje.
- `docs/GOTCHAS.md`: una entrada por anti-patrón, con las cuatro partes (olor, causa raíz,
  arreglo, cómo detectarlo antes), y la fecha de la primera vez.

## 4. Verificación de completitud

- Elegí un contrato del mapa y pedile al agente que te muestre dónde lo lee cada consumidor. Si
  alguno tiene su propia copia de la lista, hay deuda.
- ¿Hay un número que se muestre en dos pantallas distintas? Compará: ¿dan igual?
- ¿Cada entrada de GOTCHAS tiene las cuatro partes?
- ¿Se repitió un error que ya estaba en GOTCHAS? Si sí, falta la verificación automática.

## 5. Señales de alarma

- El mismo valor aparece escrito a mano en más de un archivo ("PENDIENTE", "APROBADA" en el
  servidor y en la pantalla). Dos copias; una va a divergir.
- Un cambio al servidor se cerró con el test del servidor en verde y nadie tocó la pantalla.
- GOTCHAS tiene entradas sin la parte "cómo detectarlo antes". Son anécdotas, no anti-patrones.
