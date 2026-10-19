# Resultado de rendimiento — 2026-10-19

Máquina de desarrollo (4 núcleos, 8 GB, Windows 11, Node 22.16.0). Base temporal en disco local.
Comandos y salida tal cual salieron (sin la advertencia experimental de `node:sqlite`).

## Volumen esperado: 30.000 filas, 5 en concurrencia

```
node scripts/load-agenda.mjs --rows 30000 --concurrency 5 --requests 500
  conc | req | errores | altas | ms total |   rps |  p50 |  p95 |  p99 |  max (ms)
     5 | 500 |       0 |    98 |      909 | 550.1 | 8.21 | 12.26 | 39.08 | 51.56
```

## Por diez: 300.000 filas, 5 en concurrencia

```
node scripts/load-agenda.mjs --rows 300000 --concurrency 5 --requests 500
  conc | req | errores | altas | ms total |   rps |  p50 |  p95 |  p99 |  max (ms)
     5 | 500 |       0 |    59 |     1261 | 396.5 | 11.48 | 20.32 | 51.51 | 74.09
```

## Punto de ruptura: 300.000 filas, concurrencia creciente

```
node scripts/load-agenda.mjs --rows 300000 --requests 400 --breakpoint --p95-ms 200
  conc | req | errores | altas | ms total |   rps |  p50 |  p95 |  p99 |  max (ms)
     5 | 400 |       0 |    49 |     1101 | 363.3 |   11 | 22.71 |   61 | 93.98
    10 | 400 |       0 |     0 |      791 | 505.7 | 17.96 | 31.83 | 35.56 | 37.75
    20 | 400 |       0 |     0 |      939 |   426 | 43.8 | 83.95 | 102.49 | 107.12
    40 | 400 |       0 |     0 |      717 | 557.9 | 70.83 | 101.33 | 143.92 | 147.13
    80 | 400 |       0 |     0 |      656 | 609.8 | 120.34 | 168.27 | 200.09 | 255.55
   160 | 400 |       0 |     0 |      678 |   590 | 227.99 | 400.29 | 426.09 | 430.48
  punto de ruptura: concurrencia 160 (p95 400.29 ms, errores 0)
```

## Lectura

- Al volumen esperado y al por diez, con la concurrencia esperada, el p95 está a una décima
  del umbral (12 y 20 ms contra 200). Cero errores.
- Lo primero que se rompe es la **latencia por saturación del único hilo de Node**, no la base:
  entre 80 y 160 peticiones en vuelo el p95 cruza los 200 ms, sin un solo error ni un solo
  sobreturno colado. El rendimiento (peticiones por segundo) se queda en ~600 desde 40 en
  adelante: ese es el techo de esta máquina con un proceso.
- A 50 en concurrencia (el por diez de las personas) el p95 queda alrededor de 100 ms. Admisible.

## Lo aproximado, marcado

- En las corridas de ruptura, a partir del segundo nivel las altas dan 0 porque los lugares ya
  fueron tomados en el primer nivel y el servidor responde 409 (que no cuenta como error).
  Esas corridas miden lecturas más rechazos, no altas. Para medir altas a alta concurrencia hay
  que sembrar días distintos por nivel: pendiente si alguna vez importa.
- La máquina del consultorio no es esta; el orden de magnitud sirve, el milisegundo no.

## Qué cambia con esto

Nada hoy. El dato que queda escrito: antes de sumar el segundo consultorio (D-003), repetir la
ruptura con la base de servidor nueva y comparar contra esta tabla.
