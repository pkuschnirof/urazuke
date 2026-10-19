# Dimensionamiento — Turnera (peldaño 3)

Escrito por el agente a partir de `docs/VOLUME_SURVEY.md`. Cada número tiene su fuente. El
registro mecánico que Forge hace cumplir (compuerta G9) se tomó con `yujin.sizing.record` y se
revalida en cada reporte cíclico (`yf urazuke cycle`).

## Volumetría (fuente: la dueña)

| Entidad | Cantidad | Eventos por año | Filas por evento | Filas por año |
|---|---|---|---|---|
| Turnos | 40 por día × 250 días | 10.000 | 1 turno + 2 cambios de estado + 3 mensajes = 6 | 60.000 |

- Bytes por fila (medido sobre un turno de ejemplo, con sus mensajes): ~400.
- Retención: negocio 5 años (1.825 días); rastro técnico 90 días.
- Concurrencia pico: 5 personas. Horizonte: 3 años.
- Hardware: 8 GB de RAM, techo de heap del runtime de Node 2 GB, 256 GB de disco, 4 núcleos.

## Derivación

- Filas por año: 60.000. Al horizonte: 180.000. Vivas tras la retención: hasta 300.000 a los
  cinco años.
- Disco al horizonte: menos de 200 MB. Admisible.

## La primera elección fue rechazada, y eso es el método funcionando

La primera propuesta del agente fue "todo en memoria con escritura directa a un archivo JSON,
una porción por día en memoria, un solo proceso y un solo hilo". La compuerta G9 la **rechazó**
con dos razones, textuales:

> pagination: 180000 rows at the horizon exceeds the 100000-row limit for materialising before
> slicing | write_concurrency: inadmissible with 5 concurrent users: the guarantee is implicit,
> undocumented, and nobody can see it in the code

Es exactamente el caso que el método cuenta en su referencia del post mortem de un sistema real:
un prototipo en memoria que se vuelve el sistema de producción por omisión. Acá se frenó antes de
escribir la primera línea.

## Las cuatro opciones admisibles (registro G9)

| Eje | Opción | Por qué |
|---|---|---|
| Residencia del estado | base SQL con acceso asíncrono (sql-async) | SQLite embebido en Node (`node:sqlite`), sin dependencias; nada vive entero en memoria |
| Paginación | por clave (sql-keyset) | la agenda del día es una consulta `WHERE fecha = ?`, nunca la tabla entera |
| Retención | por antigüedad (retention-by-age): 5 años negocio, 90 días rastro | fija por clase de dato |
| Concurrencia de escritura | transacciones explícitas (explicit-transactions) | el rechazo del sobreturno ocurre dentro de la misma transacción que la escritura |

## Escenario por diez (vender a otros consultorios)

600.000 filas por año, 1,8 millones al horizonte: con SQLite sigue admisible en disco y en
memoria; lo que cambia es la concurrencia de escritura entre consultorios, que exigiría un
servidor de base de datos. **Decisión escrita (D-003):** antes de sumar el segundo consultorio
se migra a un servidor SQL; la interfaz `src/store.js` es asíncrona desde la primera línea para
que esa migración no toque a los consumidores.
