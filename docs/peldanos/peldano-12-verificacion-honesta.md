# Peldaño 12 — Verificación honesta y reporte proporcional (contrato del peldaño)

**Tramo:** bucle.
**Cuándo:** en cada reporte, de cada pendiente, durante todo el proyecto. Es la forma que tiene que
tener todo lo que el agente te dice.
**Forma:** rutina; es la forma que debe tener cada reporte del agente.
**Tamaño:** obligatorio en todo proyecto, sin excepciones. No cuesta nada y es lo que le permite al
dueño no leer código.

## Para qué sirve

Si no vas a leer código, el reporte del agente tiene que ser confiable. No optimista, no "completo
en apariencia": confiable. Esto es lo genuinamente nuevo del método: el autor del código fabrica
también la evidencia, y lo hace con la misma seguridad en la voz cuando está bien y cuando está
mal. Por eso la evidencia tiene que probarse a sí misma, y el reporte tiene que separar lo
verificado de lo creído. La regla la escribí en junio [Ref. 8](../REFERENCIAS.md#ref-8), y la
volví a necesitar en octubre, cuando un error de autenticación fue reportado con la leyenda
"success" [Ref. 43](../REFERENCIAS.md#ref-43).

Entendé por qué el modelo tiende a reportar de más. No es mala fe: es que fue entrenado para ser
útil y completo, y un reporte que dice "esto no lo pude verificar" se siente menos útil que uno
que dice "listo". Entonces **pedile explícitamente** las malas noticias, los puntos ciegos y lo
que no hizo. Si no se lo pedís, no te lo da, no porque lo oculte sino porque no lo considera parte
de la respuesta.

## 1. Contexto requerido

Lo que sigue es la lista genérica. Los archivos concretos que tenés que tener hechos antes de cada
prompt, con su contenido y su estado mínimo, están en la sección 2, en el bloque "Antes de enviar
el prompt" que precede a cada uno.

- El trabajo hecho y el pendiente que lo pedía.
- El contrato de convivencia (peldaño 1), que ya prohíbe anunciar lo no hecho.

## 2. Prompts

**Rutina (va en el contrato de convivencia; se aplica en cada reporte):**

**Antes de enviar el prompt**, esto tiene que existir, y lo hacés vos (o el negocio con vos), no
el agente:

- `docs/WORKING_AGREEMENT.md` (peldaño 1), donde va la rutina.
- La lista de lo que pediste en la sesión, escrita por vos (los ítems del pedido), para contrastar
  el reporte: el prompt le pide cubrir cada ítem uno por uno, y vos tenés que saber cuántos eran.
- Estado mínimo aceptable: nada más. Esta rutina se pega una vez y rige para siempre.

> When you report, separate three blocks: VERIFIED (what you tested, with the command and its
> output), BELIEVED (what you think works but did not test, and why not), and BLIND SPOTS (what
> you cannot see from where you are: another environment, real data, the user's browser). Cover
> every item I asked for, one by one, even when the answer is "I did not do it". No claim
> without its proof next to it. Do not say "done": say what is done and how you know it. If
> something went wrong, say it first.
>
> When you report, also report the Annex H groups: what was measured, what
> only warns and why, and which rule is switched off with its reason, who
> authorised it and its review date. Report the two dashboard figures with
> the fingerprint they were computed with (catalogue version, active and
> switched-off rules, frontend adapter, tool versions) and with the account
> of any movement. No figure closes a block: the green is decided rule by
> rule, and a switched-off rule with no written exception turns the whole
> report red.
>
> Reply in my language.

> [es]
> Cuando reportes, separá tres bloques: VERIFICADO (lo que probaste, con el comando y su salida),
> CREÍDO (lo que pensás que funciona pero no probaste, y por qué no), y PUNTOS CIEGOS (lo que no
> podés ver desde donde estás: otro entorno, datos reales, el navegador del usuario). Cubrí cada
> ítem que te pedí, uno por uno, incluso cuando la respuesta sea "no lo hice". Ninguna afirmación
> sin su prueba al lado. No digas "listo": decí qué está hecho y cómo lo sabés. Si algo salió mal,
> decilo primero.
>
> Cuando informes, informá también los grupos del Anexo H: qué se midió, qué
> solo advierte y por qué, y qué regla está apagada, con su motivo, quién la
> autorizó y su fecha de revisión. Informá las dos cifras del tablero con la
> huella con la que se calcularon (versión del catálogo, reglas activas y
> apagadas, adaptador de frontend, versiones de las herramientas) y con el
> asiento de todo movimiento. Ninguna cifra cierra un bloque: el verde se
> decide regla por regla, y una regla apagada sin excepción escrita vuelve
> rojo el informe entero.
>
> Respondé en mi idioma.

Qué le estoy pidiendo, cláusula por cláusula: los tres bloques, que son la estructura que vuelve
honesto un reporte (lo verificado con su prueba, lo creído con la razón de por qué no se probó, lo
que no puede ver); la cobertura ítem por ítem, para que nada "se olvide"; la prueba al lado de
cada afirmación; la prohibición del "listo" a secas; y las malas noticias primero, porque el
modelo tiende a dejarlas para el final o para nunca.

**Ante un "sigue roto" tuyo:**

**Antes de enviar el prompt**, tenés que tener esto a mano:

- Tu verificación, hecha en el lugar donde mirás (el entorno de prueba, tu navegador), con lo que
  viste anotado: en qué URL, qué versión muestra el sistema si la muestra, qué hiciste, qué
  esperabas, qué pasó.
- El número de versión o el commit que el agente dijo que contenía el arreglo, copiado de su
  reporte anterior.
- Estado mínimo aceptable: podés decirle "miro en [URL], veo la versión [N], hago [esto], pasa
  [esto]". Sin eso, el "sigue roto" es una impresión, y el agente va a diagnosticar una impresión.

> Before diagnosing again, compare the version running where I see the problem with the version
> that contains your fix. Tell me both. If they differ, the problem is publication, not code.

> [es]
> Antes de volver a diagnosticar, compará la versión que corre donde yo veo el problema con la
> versión que contiene tu arreglo. Decime las dos. Si son distintas, el problema es de publicación,
> no de código.

Qué le estoy pidiendo: que ante un "sigue roto" no vuelva a diagnosticar de cero sino que primero
compare versiones. La mitad de los "sigue roto" son arreglos que están en el repositorio pero no
en el lugar donde vos mirás [Ref. 45](../REFERENCIAS.md#ref-45).

## 3. Resultado esperado

Cada reporte del agente con:

- Los tres bloques (verificado / creído / puntos ciegos), aunque alguno esté vacío.
- Una línea por cada ítem pedido, con su estado.
- Para cada "verificado": el comando y la salida, o el test y su resultado, o el número y su
  medidor.
- Lo que salió mal, al principio y no al final.

## 4. Verificación de completitud

- ¿Están los tres bloques? Si "creído" y "puntos ciegos" están siempre vacíos, el agente no está
  siendo honesto: siempre hay algo que no vio.
- Elegí al azar una afirmación del bloque "verificado": ¿tiene su prueba al lado? ¿La podés
  reproducir?
- ¿Cubre cada ítem de lo que pediste, o hay uno que "se olvidó"?
- ¿Las malas noticias están al principio?
- ¿Dijo "listo" a secas alguna vez? Es una violación del contrato.

## 5. Señales de alarma

- Diez reportes seguidos sin ningún punto ciego. Nadie ve todo; el bloque está vacío por
  costumbre, no por verdad.
- El bloque "verificado" tiene frases como "debería funcionar". Es "creído" disfrazado.
- El reporte es más largo que el cambio. Un reporte proporcional dice lo que hay que decir; uno
  inflado está tapando algo con volumen.
