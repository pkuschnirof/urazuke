# Peldaño 4 — El esqueleto con sus compuertas (contrato del peldaño)

**Tramo:** arranque (una vez).
**Forma:** un solo tiro largo, con aprobación visual del dueño al final.

## Para qué sirve

Para que el sistema arranque, se pruebe y se despliegue VACÍO antes de tener funcionalidad.
Descubrir el despliegue al final es carísimo: en Kikan llegó un mes después del arranque y
costó cinco pendientes seguidos. Si el esqueleto se despliega la primera semana, esos golpes se
dan con cero funcionalidad en juego.

## 1. Contexto requerido

- `docs/SIZING.md` (peldaño 3): la opción elegida define el esqueleto.
- Relevamiento de entornos: dónde va a correr (nube, servidor propio), si hay un entorno de
  prueba y uno de producción, quién tiene acceso, cómo se despliega hoy si hay algo.
- El tipo de proyecto: nuevo (greenfield), corrección o evolución de algo existente.

## 2. Prompts

**Inicial:**

> Vamos a armar el esqueleto del sistema, sin ninguna funcionalidad. Leé `PROJECT.md`,
> `docs/SIZING.md` y el relevamiento de entornos. **Evaluá si tenés lo necesario para que el
> esqueleto corra en el entorno de prueba (accesos, URL, forma de desplegar); si falta algo,
> pedímelo antes de empezar.** Después construí: la estructura de carpetas, el arranque del
> servidor y de la pantalla, la estructura de tests con un test de humo que pase, la integración
> continua que corra esa batería en cada push, y el despliegue al entorno de prueba. Declará las
> compuertas del flujo (qué tiene que estar en verde para pasar de una etapa a otra) en
> `docs/COMPUERTAS.md`. Al terminar, generá una captura de la pantalla vacía corriendo en el
> entorno de prueba y mostrámela. No agregues funcionalidad "ya que estás".

**De cierre:**

> Aprobado el esqueleto. Dejá en `docs/ESTADO.md` la URL del entorno de prueba, el comando para
> correr los tests y el comando para desplegar, y marcá el peldaño como subido.

## 3. Resultado esperado

- El repositorio con la estructura, el servidor y la pantalla arrancando.
- Un test de humo en verde y la batería corriendo en integración continua (con el enlace a la
  corrida en verde).
- El despliegue al entorno de prueba funcionando, con la URL.
- `docs/COMPUERTAS.md`: la lista de compuertas, cada una con la condición para pasar.
- Una captura de pantalla del sistema vacío corriendo en el entorno de prueba.
- `docs/ESTADO.md` actualizado con los tres comandos (correr, testear, desplegar).

## 4. Verificación de completitud

- ¿Podés abrir la URL del entorno de prueba y ver la pantalla vacía? (Lo hacés vos, no el
  agente.)
- ¿Hay un enlace a una corrida de integración continua en verde?
- ¿El despliegue se puede repetir? Pedile al agente que lo corra dos veces seguidas y que te
  muestre que la segunda no rompió nada.
- ¿Las compuertas están escritas con una condición verificable cada una?
- ¿Hay alguna funcionalidad que no pediste? Si la hay, el agente violó el alcance exacto.
