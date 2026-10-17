# Peldaño 13 — Integración continua, entornos, secretos y despliegue como parte del producto (contrato del peldaño)

**Tramo:** operación (se arma sobre el esqueleto del peldaño 4; se revisa con cada cambio de
infraestructura).
**Forma:** un solo tiro para armarlo; rutina para cada despliegue.

## Para qué sirve

Para que llegar a producción sea un paquete reproducible: los tests se corren UNA vez, la
configuración vive fuera del repositorio, y los secretos no andan dando vueltas. Evita los tests
corriendo tres veces por commit (2.000 minutos de cuota en 16 días), la clave de la base impresa
en una transcripción, el CORS que solo conocía el primer dominio, y la configuración pisada por
la batería de tests.

## 1. Contexto requerido

- **Relevamiento de entornos y accesos**, en forma genérica: qué entornos hay (prueba,
  producción), dónde corren, quién tiene acceso, cómo se promueve algo de uno a otro, qué
  secretos existen y dónde viven hoy, cuánta cuota de integración continua hay. El agente evalúa
  si alcanza y pregunta.
- El esqueleto con su integración continua y su despliegue al entorno de prueba (peldaño 4).

## 2. Prompts

**Inicial:**

> Vamos a cerrar el circuito hasta producción. Leé el relevamiento de entornos y accesos.
> **Evaluá si tenés lo necesario para desplegar a producción de forma segura (accesos,
> dominio, dónde viven los secretos, cómo se vuelve atrás); si falta algo, pedímelo.**
> Después armá: (1) la integración continua corre la batería completa una sola vez por
> commit; (2) el despliegue espera el resultado de esa corrida y solamente empaqueta y sube,
> sin volver a correr tests; (3) la configuración de cada entorno vive en el servidor (archivo
> de entorno o bóveda), nunca en el repositorio; (4) un procedimiento escrito para promover
> del entorno de prueba a producción, que se pueda correr dos veces sin romper nada; (5) la
> vuelta atrás, probada; (6) una verificación automática que impida subir un secreto al
> repositorio. Documentá todo en `docs/DESPLIEGUE.md` de forma que una persona lo pueda hacer
> a mano sin vos.

**Rutina de cada despliegue:**

> Antes de tocar producción: el entorno de prueba en verde con la misma versión; la vuelta
> atrás lista; y decime qué cambia en la configuración. Después del despliegue: mostrame la
> versión corriendo en producción y una prueba de punta a punta sobre producción, en solo
> lectura.

**Si un secreto apareció en el chat o en un commit:**

> Ese secreto está comprometido: rotalo ahora, decime dónde más estaba, y agregá la
> verificación que lo habría detectado.

## 3. Resultado esperado

- La integración continua corriendo una sola vez por commit, con el enlace a una corrida.
- El despliegue que espera a la integración y solo empaqueta; medido: cuánto tarda antes y
  después.
- La configuración fuera del repositorio; en el repo, solo un ejemplo sin valores.
- `docs/DESPLIEGUE.md`: cómo desplegar, promover y volver atrás, paso a paso, para una persona.
- La vuelta atrás probada al menos una vez, con su evidencia.
- La verificación anti-secretos activa (un intento de subir uno, rechazado).
- Un registro de la cuota de integración continua consumida por mes.

## 4. Verificación de completitud

- ¿Cuántas veces corre la batería por cada commit? Tiene que ser una. Pedí el enlace.
- ¿Hay algún valor de configuración real (una clave, una contraseña, una URL interna) en el
  repositorio? Pedile al agente que busque y te muestre la búsqueda vacía.
- ¿Podrías seguir `docs/DESPLIEGUE.md` vos, sin el agente? Leelo con esa pregunta.
- ¿La vuelta atrás se probó? ¿Cuándo? ¿Qué evidencia hay?
- ¿Se pegó algún secreto en el chat durante el proyecto? Si sí, ¿se rotó?
- ¿Sabés cuánta cuota de integración continua queda este mes?
