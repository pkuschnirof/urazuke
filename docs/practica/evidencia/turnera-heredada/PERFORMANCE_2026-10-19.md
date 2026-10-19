# Prueba de rendimiento de Turnera — 2026-10-19

Versión: 1.3.2, commit `90d53bb`. Máquina: la del agente (Windows 11, Node v22.16.0), cliente y
servidor en la misma máquina, sin red de por medio. **Todo es aproximado** en el sentido de que
no es la PC del consultorio ni la base real; los números sirven para comparar entre corridas y
contra el umbral, no como promesa de lo que verá la recepcionista. Marcas: `[medido]`,
`[cálculo]`, `[supuesto]`.

Método: el de `docs/PERFORMANCE.md` (script temporal fuera del repositorio; servidor real en
puerto 0 con `crearServidor` [código: src/server.js:164-170]; 5 pedidos de calentamiento; 300
pedidos por corrida; `fetch` desde Node). Bases sembradas como dice `docs/PERSISTENCE.md`
(750 días desde 2024-01-01; 40 y 400 turnos por día). La fecha consultada, 2025-06-10, tiene 40
turnos en la base chica y 400 en la grande (es lo que devuelve cada respuesta, columna
`filas_por_respuesta`).

## Las corridas (salida textual, una línea JSON por corrida) [medido]

```
=== carga 30k c5
{"db":"t30k.db","ruta":"/api/turnos?fecha=2025-06-10","total":300,"concurrencia":5,"errores":0,"filas_por_respuesta":40,"p50_ms":4.6,"p95_ms":7.4,"max_ms":15.8,"min_ms":2.9,"wall_ms":313,"req_por_s":957}
=== carga 30k c50
{"db":"t30k.db","ruta":"/api/turnos?fecha=2025-06-10","total":300,"concurrencia":50,"errores":0,"filas_por_respuesta":40,"p50_ms":48.9,"p95_ms":79.3,"max_ms":89.2,"min_ms":26.2,"wall_ms":329,"req_por_s":912}
=== carga 300k c5
{"db":"t300k.db","ruta":"/api/turnos?fecha=2025-06-10","total":300,"concurrencia":5,"errores":0,"filas_por_respuesta":400,"p50_ms":19.4,"p95_ms":25.5,"max_ms":33.2,"min_ms":9.2,"wall_ms":1199,"req_por_s":250}
=== carga 300k c50
{"db":"t300k.db","ruta":"/api/turnos?fecha=2025-06-10","total":300,"concurrencia":50,"errores":0,"filas_por_respuesta":400,"p50_ms":207.5,"p95_ms":229,"max_ms":243.2,"min_ms":26.9,"wall_ms":1221,"req_por_s":246}
=== carga 30k resumen c5
{"db":"t30k.db","ruta":"/api/resumen?mes=2025-06","total":300,"concurrencia":5,"errores":0,"filas_por_respuesta":-1,"p50_ms":4.1,"p95_ms":7.5,"max_ms":13.4,"min_ms":3.3,"wall_ms":280,"req_por_s":1073}
=== carga 300k resumen c50
{"db":"t300k.db","ruta":"/api/resumen?mes=2025-06","total":300,"concurrencia":50,"errores":0,"filas_por_respuesta":-1,"p50_ms":189.7,"p95_ms":228.3,"max_ms":235.4,"min_ms":27.7,"wall_ms":1161,"req_por_s":258}
```

(`filas_por_respuesta: -1` en el resumen quiere decir que la respuesta no es una lista, es un
objeto con tres números [código: src/store.js:176].)

## Leído contra los umbrales

| Escenario | Base | Simultáneos | p50 | p95 | máx | errores | Umbral p95 < 200 ms |
|---|---|---|---|---|---|---|---|
| **El de la dueña** (agenda del día) | 30.000 | 5 | 4,6 ms | **7,4 ms** | 15,8 ms | 0 | cumple, por 27 veces |
| Diez veces las personas | 30.000 | 50 | 48,9 ms | 79,3 ms | 89,2 ms | 0 | cumple |
| Diez veces los datos | 300.000 | 5 | 19,4 ms | 25,5 ms | 33,2 ms | 0 | cumple |
| Diez veces las dos cosas | 300.000 | 50 | 207,5 ms | **229 ms** | 243,2 ms | 0 | **no cumple** (fuera del escenario de la dueña) |
| Resumen mensual, el de la dueña | 30.000 | 5 | 4,1 ms | 7,5 ms | 13,4 ms | 0 | cumple |
| Resumen mensual, por diez las dos cosas | 300.000 | 50 | 189,7 ms | 228,3 ms | 235,4 ms | 0 | no cumple (ídem) |

Lo que dicen los números:

- En el escenario real (5 personas, 3 años de turnos) la agenda del día responde en menos de
  8 ms el 95 % de las veces y el servidor atiende unos 950 pedidos por segundo. La recepcionista
  nunca va a esperar por el servidor; si espera, es la red o el navegador.
- El tiempo crece con la **concurrencia** más que con los **datos**: pasar de 5 a 50
  simultáneos multiplica el p95 por 10 (7,4 → 79,3 ms) sobre la misma base; pasar de 30.000 a
  300.000 filas lo multiplica por 3,4 (7,4 → 25,5 ms). Es coherente con que `node:sqlite` es
  síncrono [código: src/store.js:83]: los pedidos se atienden de a uno, y con 400 filas por día
  cada uno tarda más (0,737 ms de consulta [medido en `docs/PERSISTENCE.md`] más armar y
  serializar 400 objetos).
- Con 50 simultáneos sobre la base por diez el p95 pasa los 200 ms (229 ms). No es el
  escenario de la dueña (serían 50 personas sobre un consultorio con 400 turnos por día, que la
  agenda ni siquiera admite [código: src/rules.js:3,40-46]). Queda anotado como el primer
  umbral que se cruza, igual que decía `docs/SIZING.md`: lo que no aguanta el por diez es el
  proceso único, no el motor.
- **Cero errores** en 1.800 pedidos. No apareció el punto de ruptura duro.

## Lo que es aproximado, dicho explícitamente

- Cliente y servidor en la misma máquina: no hay latencia de red. En el consultorio, el
  navegador está en la misma PC [documentación: README.md:3], así que se parece; si alguien
  entra desde otra máquina de la red, sumar la red.
- Una sola corrida de 300 pedidos por escenario; no se repitió para promediar. Los p95 pueden
  moverse un 20-30 % entre corridas por otros procesos de la máquina [supuesto, basado en la
  diferencia 7,9 s / 2,7 s del listado sin filtro entre N6 y hoy].
- El `fetch` de Node reutiliza conexiones; un navegador abre las suyas. Diferencia pequeña a
  este tamaño [supuesto].
- La base sembrada tiene los estados rotando parejo y notas cortas; la real tiene lo que tiene.
- No se midió la PC del consultorio (CPU, disco, antivirus). Es el punto ciego principal.

## Qué haría falta para cerrar los puntos ciegos

Correr el mismo script en la PC del consultorio con una copia **anonimizada** de `data/`
(propuesta P-1 del contrato), en un puerto distinto del 4300 y con `TURNERA_DATA` apuntando a la
copia, nunca a `data/`. Diez minutos, cero cambios de código.
