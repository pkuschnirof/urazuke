# Peldaño 10 — Verificación honesta y reporte proporcional (contrato del peldaño)

**Tramo:** bucle (al cerrar cada cambio).
**Forma:** rutina; es la forma que tiene que tener todo reporte del agente.

## Para qué sirve

Si el dueño no va a leer código, el reporte del agente tiene que ser confiable. No optimista,
no "completo en apariencia": confiable. Esto es lo genuinamente nuevo del método: el autor
del código también fabrica la evidencia, y lo hace con la misma seguridad en la voz cuando
está bien y cuando está mal. Por eso la evidencia tiene que probarse a sí misma, y el reporte
tiene que separar lo verificado de lo creído.

## 1. Contexto requerido

- El trabajo hecho y el pendiente que lo pedía.
- El contrato (peldaño 1), que ya prohíbe anunciar lo no hecho.

## 2. Prompts

**Rutina (va en el contrato; se aplica a todo reporte):**

> Cuando reportes, separá en tres bloques: **Verificado** (lo que probaste, con el comando y
> la salida), **Creído** (lo que pensás que funciona pero no probaste, y por qué no), y
> **Puntos ciegos** (lo que no podés ver desde donde estás: otro entorno, datos reales, el
> navegador del usuario). Cubrí cada ítem de lo que te pedí, uno por uno, aunque la respuesta
> sea "no lo hice". Ninguna afirmación sin su prueba al lado. No digas "listo": decí qué está
> listo y cómo lo sabés. Si algo salió mal, decilo primero.

**Ante un "sigue roto" del dueño:**

> Antes de volver a diagnosticar, compará qué versión está corriendo donde yo lo veo con la
> versión que tiene tu arreglo. Decime las dos. Si no coinciden, el problema es de publicación,
> no de código.

## 3. Resultado esperado

Cada reporte del agente con:

- Los tres bloques (verificado / creído / puntos ciegos), aunque alguno esté vacío.
- Un renglón por ítem de lo pedido, con su estado.
- Para cada "verificado": el comando y la salida, o el test y su resultado, o el número y su
  medidor.
- Lo que salió mal, al principio y no al final.

## 4. Verificación de completitud

- ¿Están los tres bloques? Si "creído" y "puntos ciegos" están siempre vacíos, el agente no
  está siendo honesto: siempre hay algo que no vio.
- Elegí una afirmación del bloque "verificado" al azar: ¿tiene su prueba al lado? ¿Podés
  reproducirla?
- ¿Cubre cada ítem de lo que pediste, o hay alguno que "se olvidó"?
- ¿Las malas noticias están al principio?
- ¿Alguna vez dijo "listo" a secas? Es una violación del contrato.
