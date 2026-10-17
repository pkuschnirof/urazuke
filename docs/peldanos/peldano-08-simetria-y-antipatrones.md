# Peldaño 8 — Simetría entre productor y consumidor, y el registro de anti-patrones (contrato del peldaño)

**Tramo:** bucle (cada cambio que toca un contrato entre dos partes).
**Forma:** automática en el bucle; más un archivo que crece con cada golpe.

## Para qué sirve

Cuando cambiás una punta (el servidor, el robot, el esquema de la base), la otra punta (la
pantalla, el contador, el que consume) tiene que cambiar en el mismo commit. Si no, tarde o
temprano divergen, y el usuario ve un número en un lado y otro número en el otro (el caso 1.355
contra 1.234). Y los errores que ya nos comimos una vez se anotan para no comerlos dos veces.

## 1. Contexto requerido

- Un mapa de qué partes del sistema consumen qué: qué pantallas leen qué servicios, qué
  procesos escriben qué tablas. Si no existe, el primer prompt lo construye.
- El registro de anti-patrones `docs/GOTCHAS.md`, aunque esté vacío.

## 2. Prompts

**Para construir el mapa (una vez):**

> Armá `docs/MAPA_PRODUCTOR_CONSUMIDOR.md`: para cada contrato del sistema (un servicio, una
> tabla, un formato de archivo, una lista de valores), quién lo produce y quiénes lo consumen.
> **Si hay partes del sistema a las que no tenés acceso o que no entendés, decímelo en vez de
> dejarlas fuera del mapa.**

**Rutina (va en el contrato):**

> Antes de cerrar cualquier cambio que toque un contrato, buscá en el mapa todos los
> consumidores y actualizalos en el mismo commit. Preferí siempre que el productor defina la
> lista (columnas, causas, estados) y el consumidor la lea, en vez de que cada uno tenga su
> copia. Si el mapa no tiene esa relación, agregala.

**Cuando algo se rompe por segunda vez:**

> Esto ya nos pasó. Anotalo en `docs/GOTCHAS.md` con: cómo se huele (la señal temprana), la
> causa raíz, el arreglo, y cómo detectarlo la próxima vez antes de que duela. Y agregá, si se
> puede, un test o una verificación automática que lo detecte.

## 3. Resultado esperado

- `docs/MAPA_PRODUCTOR_CONSUMIDOR.md`: la lista de contratos con productor y consumidores.
- En cada commit que toca un contrato: los consumidores actualizados, nombrados en el mensaje.
- `docs/GOTCHAS.md`: una entrada por anti-patrón, con las cuatro partes (olor, causa raíz,
  arreglo, cómo detectarlo antes), y la fecha de la primera vez.

## 4. Verificación de completitud

- Elegí un contrato del mapa y pedile al agente que te muestre dónde lo lee cada consumidor.
  Si alguno tiene su propia copia de la lista, hay deuda.
- ¿Hay un número que se muestre en dos pantallas distintas? Compará: ¿dan igual?
- ¿Cada entrada de GOTCHAS tiene las cuatro partes?
- ¿Se repitió algún error que ya estaba en GOTCHAS? Si sí, falta la verificación automática.
