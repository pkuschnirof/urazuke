# Calidad del codigo verificada por maquina

Generado por `yf urazuke quality check` el 2026-10-19T17:49:55.078Z. Stack: Node.js / TypeScript (npm, vitest).
Los numeros de abajo son medidos; el trinquete (`.forge/quality-ratchet.json`) solo deja mejorar.

## Herramientas

- Bateria: `npm test`
- Lint / formato: (ninguno instalado; medidores nativos de Forge)
- Cobertura: `npx vitest run --coverage --coverage.reporter=json-summary` -> coverage/coverage-summary.json
- Mutacion: stryker (`npx stryker run`)

## Limites y valores medidos

| Medida | Limite | Medido | Estado |
|---|---|---|---|
| Lineas por archivo (max) | 300 | 166 | ok |
| Lineas por funcion (max) | 40 | 24 | ok |
| Complejidad por funcion (max) | 10 | 9 | ok |
| Bloques duplicados (8 lineas) | 0 | 0 | ok |
| Cobertura de lineas (%) | piso - | - | sin medir |
| Puntaje de mutacion (%) | piso - | - | sin medir |
| Lint / formato | 0 fallos | 0 fallos | ok |

## Lo que hoy falla (0)

- nada

## Trinquete

- en verde: los numeros no empeoraron.

## Decisiones del dueno

_Que se arregla ahora (un pendiente cada uno) y que se tolera con fecha._
