# Peldaño 4 — El esqueleto con sus compuertas (contrato del peldaño)

**Tramo:** arranque.
**Cuándo:** una vez, al cierre del arranque, después del dimensionamiento y antes de
cualquier funcionalidad. Es acá donde se hace toda la infraestructura inicial y la cadena de
integración y despliegue.
**Forma:** un solo tiro largo, con aprobación visual tuya al final.
**Tamaño:** obligatorio en todo proyecto que vaya a tener usuarios. En un prototipo descartable se
puede saltear; pero si el prototipo sobrevive (siempre sobreviven), este peldaño es lo primero que
hay que pagar.

## Para qué sirve

Hacé que el sistema arranque, se pruebe y se despliegue VACÍO antes de tener funcionalidad.
Descubrir el despliegue al final es carísimo: en uno de mis sistemas llegó un mes después del
arranque y costó cinco pendientes seguidos [Ref. 32](../REFERENCIAS.md#ref-32). Si el esqueleto se
despliega en el arranque, esos golpes se dan con cero funcionalidad en juego.

La idea general detrás: **el camino a producción es parte del producto**, no un trámite del final.
Un sistema que funciona en la máquina del programador y no se puede desplegar no es un sistema; es
una demo. Y la única forma de saber que el camino funciona es recorrerlo cuando todavía no hay
nada que perder. Por eso en este peldaño se monta todo lo que después va a usar el bucle: el
repositorio con su estructura, el entorno de prueba, la integración continua que corre la
batería en cada push, y el despliegue automático al entorno de prueba.

## 1. Contexto requerido

Lo que sigue es la lista genérica. Los archivos concretos que tenés que tener hechos antes de cada
prompt, con su contenido y su estado mínimo, están en la sección 2, en el bloque "Antes de enviar
el prompt" que precede a cada uno.

- `docs/SIZING.md` (peldaño 3): la opción elegida define el esqueleto.
- Relevamiento de entornos: dónde va a correr (nube, servidor propio), si hay un entorno de prueba
  y uno de producción, quién tiene acceso, cómo se despliega hoy si hay algo.
- Las credenciales del lugar donde se va a desplegar, aunque sea un servicio gratuito.
- El tipo de proyecto: nuevo, corrección o evolución de algo existente.

## 2. Prompts

**Inicial:**

**Antes de enviar el prompt**, esto tiene que existir, y lo hacés vos (o el negocio con vos), no
el agente:

- `docs/ENVIRONMENTS_SURVEY.md`: el relevamiento de entornos, escrito por vos. Dónde va a correr
  el sistema (un servidor que ya tenés, un servicio en la nube, cuál); si va a haber un entorno de
  prueba y uno de producción, y si ya existen; quién tiene acceso a qué; cómo se despliega hoy si
  hay algo (a mano, un script, nada); el tipo de proyecto (nuevo, corrección o evolución de algo
  existente); y la URL o el dominio que va a tener el entorno de prueba, si ya se sabe. El prompt
  lo nombra como "the environments survey", sin ruta: guardalo con este nombre, o decile en el
  chat cómo se llama.
- Las credenciales del lugar donde se va a desplegar, aunque sea un servicio gratuito: creadas,
  probadas por vos una vez (entrar al panel), y guardadas fuera del repositorio (en un archivo de
  entorno de tu máquina o en el gestor de secretos de tu herramienta). Al agente se le dice dónde
  están; no se le pegan en el chat.
- `PROJECT.md` (peldaño 2) y `docs/SIZING.md` (peldaño 3), cerrados: el esqueleto se construye
  sobre la opción elegida ahí, y el agente lo tiene que leer.
- Estado mínimo aceptable: podés entrar vos al servicio donde se va a desplegar, y el relevamiento
  dice cuál es el entorno de prueba. Sin eso, el esqueleto se queda en tu máquina y el peldaño no
  se sube.

> We are going to build the skeleton of the system, with no functionality at all. Read
> `PROJECT.md`, `docs/SIZING.md` and the environments survey. Evaluate whether you have what is
> needed for the skeleton to run in the test environment (access, URL, deployment method); if
> anything is missing, ask me before starting. Then build: the folder structure; the server and
> the UI starting up; the test structure with one smoke test that passes; continuous
> integration running that test suite on every push; and the deployment to the test
> environment. Declare the gates of the workflow (what must be green to move from one stage to
> the next) in `docs/GATES.md`. When done, take a screenshot of the empty UI running in the
> test environment and show it to me. Do not add any functionality "while you are at it".
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [es]
> Vamos a construir el esqueleto del sistema, sin ninguna funcionalidad. Leé `PROJECT.md`,
> `docs/SIZING.md` y el relevamiento de entornos. Evaluá si tenés lo necesario para que el
> esqueleto corra en el entorno de prueba (acceso, URL, forma de desplegar); si falta algo,
> pedímelo antes de empezar. Después construí: la estructura de carpetas; el servidor y la
> interfaz arrancando; la estructura de tests con un test de humo que pasa; la integración
> continua corriendo esa batería en cada push; y el despliegue al entorno de prueba. Declará las
> compuertas del flujo (qué tiene que estar en verde para pasar de una etapa a la siguiente) en
> `docs/GATES.md`. Cuando termines, sacá una captura de la interfaz vacía corriendo en el entorno
> de prueba y mostrámela. No agregues ninguna funcionalidad "ya que estás".
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.
>
> Respondé en mi idioma.

Qué le estoy pidiendo: que verifique que tiene los accesos antes de empezar (sin eso el esqueleto
se queda en la máquina del agente); la lista exacta de lo que es un esqueleto (estructura,
arranque, un test, integración continua, despliegue a prueba); las compuertas escritas; una
captura real del entorno de prueba, que es la única evidencia válida de que se desplegó; y la
prohibición explícita de agregar funcionalidad, porque el modelo tiende a "ya que estoy" y eso
rompe el alcance exacto.

**De cierre:**

**Antes de enviar el prompt**, tenés que tener esto a mano:

- La captura del entorno de prueba que el agente te mostró, y tu propia visita a esa URL desde tu
  navegador: tiene que verse lo mismo. Es la primera vista humana del sistema, y es un hito.
- Un enlace a una corrida de integración continua en verde, pedido al agente y abierto por vos.
- `docs/GATES.md`, leído: cada compuerta tiene una condición verificable.
- Estado mínimo aceptable: viste la pantalla vacía en la URL real, con tus ojos. Si solo viste la
  captura, no aprobes.

> Skeleton approved. Record in `docs/STATUS.md` the test environment URL, the command to run
> the tests and the command to deploy, and mark this step as done. Then run the deployment a
> second time and show me that the second run changed nothing.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [es]
> Esqueleto aprobado. Registrá en `docs/STATUS.md` la URL del entorno de prueba, el comando para
> correr los tests y el comando para desplegar, y marcá este paso como hecho. Después corré el
> despliegue por segunda vez y mostrame que la segunda corrida no cambió nada.
>
> Cuando necesites una decisión mía, pedila con las cuatro partes de la UX-28
> (`docs/ANEXO_HEURISTICAS.md`) y en este orden: los datos que hacen necesaria la pregunta,
> enumerados; un párrafo de no más de cinco líneas que los enlace y deje ver el interrogante; la
> pregunta con sus respuestas posibles enumeradas; y tu recomendación. Decilo a la profundidad
> técnica que el proyecto declaró en `communication_depth` —`beginner`, `decision_maker` o
> `technical`—; si el proyecto no declaró ninguna, usá `decision_maker`.

Qué le estoy pidiendo: dejar los tres comandos donde la próxima sesión los encuentre, y probar
que el despliegue es repetible (correrlo dos veces sin romper nada). Esa segunda corrida es la
prueba de que el procedimiento es un procedimiento y no una suerte.

## 3. Resultado esperado

- El repositorio con la estructura, el servidor y la pantalla arrancando.
- Un test de humo en verde y la batería corriendo en integración continua (con el enlace a la
  corrida en verde).
- El despliegue al entorno de prueba funcionando, con la URL, y corrido dos veces.
- `docs/GATES.md`: la lista de compuertas, cada una con la condición para pasar.
- Una captura de pantalla del sistema vacío corriendo en el entorno de prueba.
- `docs/STATUS.md` actualizado con los tres comandos (correr, testear, desplegar).

## 4. Verificación de completitud

- ¿Podés abrir la URL del entorno de prueba y ver la pantalla vacía? (Lo hacés vos, no el agente.)
- ¿Hay un enlace a una corrida de integración continua en verde?
- ¿El despliegue se corrió dos veces y la segunda no rompió nada?
- ¿Las compuertas están escritas con una condición verificable cada una?
- ¿Hay alguna funcionalidad que no pediste? Si la hay, el agente violó el alcance exacto.

## 5. Señales de alarma

- El esqueleto "funciona en local" pero el despliegue "lo vemos después". No: el despliegue es el
  esqueleto.
- La captura de pantalla es de la máquina del agente, no del entorno de prueba. Pedí la URL.
- Las compuertas dicen cosas como "el código tiene buena calidad". Una compuerta es una condición
  verificable: "la batería está en verde", "el despliegue a prueba funcionó".
