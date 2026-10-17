# Peldaño 10 — Verificación honesta y reporte proporcional (contrato del peldaño)

**Tramo:** bucle (al cerrar cada cambio).
**Forma:** rutina; es la forma que tiene que tener todo reporte del agente.
**Tamaño:** obligatorio en todo proyecto, sin excepción. No cuesta nada y es lo que hace que el
dueño pueda no leer código.

## Para qué sirve

Si el dueño no va a leer código, el reporte del agente tiene que ser confiable. No optimista,
no "completo en apariencia": confiable. Esto es lo genuinamente nuevo del método: el autor
del código también fabrica la evidencia, y lo hace con la misma seguridad en la voz cuando
está bien y cuando está mal. Por eso la evidencia tiene que probarse a sí misma, y el reporte
tiene que separar lo verificado de lo creído.

Hay que entender por qué el modelo tiende a reportar de más. No es mala fe: es que fue
entrenado para ser útil y completo, y un reporte que dice "no pude verificar esto" se siente
menos útil que uno que dice "listo". Entonces hay que **pedirle explícitamente** las malas
noticias, los puntos ciegos y lo que no hizo. Si no se lo pedís, no te lo va a dar, no porque lo
oculte sino porque no lo considera parte de la respuesta.

## 1. Contexto requerido

- El trabajo hecho y el pendiente que lo pedía.
- El contrato de convivencia (peldaño 1), que ya prohíbe anunciar lo no hecho.

## 2. Prompts

**Rutina (va en el contrato de convivencia; se aplica a todo reporte):**

> When you report, separate three blocks: VERIFIED (what you tested, with the command and its
> output), BELIEVED (what you think works but did not test, and why not), and BLIND SPOTS (what
> you cannot see from where you are: another environment, real data, the user's browser). Cover
> every item I asked for, one by one, even when the answer is "I did not do it". No claim
> without its proof next to it. Do not say "done": say what is done and how you know it. If
> something went wrong, say it first. Reply in my language.

Qué le estamos pidiendo, cláusula por cláusula: los tres bloques, que son la estructura que
vuelve honesto un reporte (lo verificado con su prueba, lo creído con la razón de no haberlo
probado, lo que no se puede ver); la cobertura ítem por ítem, para que nada "se olvide"; la
prueba al lado de cada afirmación; la prohibición del "listo" a secas; y las malas noticias
primero, porque el modelo tiende a dejarlas para el final o para nunca.

**Ante un "sigue roto" del dueño:**

> Before diagnosing again, compare the version running where I see the problem with the version
> that contains your fix. Tell me both. If they differ, the problem is publication, not code.

Qué le estamos pidiendo: que ante "sigue roto" no vuelva a diagnosticar de cero sino que
primero compare versiones. La mitad de los "sigue roto" son arreglos que están en el
repositorio pero no en el lugar donde el dueño mira.

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

## 5. Señales de alarma

- Diez reportes seguidos sin ningún punto ciego. Nadie ve todo; el bloque está vacío por
  costumbre, no por verdad.
- El bloque "verificado" contiene frases como "debería funcionar". Eso es "creído" disfrazado.
- El reporte es más largo que el cambio. Un reporte proporcional dice lo que hay que decir; uno
  inflado está tapando algo con volumen.
