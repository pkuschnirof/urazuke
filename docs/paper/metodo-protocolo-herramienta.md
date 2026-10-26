# Método, protocolo y herramienta: tres cosas distintas

*Pieza común a todas las versiones del paper. Borrador 1, 24 de octubre de 2026. Pablo
Kuschniroff, asistido por Claude Code. Material de trabajo: todavía no es parte del corpus
publicado ni está traducido.*

---

## Por qué esta sección va primera

Porque si no, el lector llega solo a la conclusión equivocada, y yo lo medí.

El 24 de octubre de 2026 le pedí a un asistente comercial de uso masivo que analizara en
profundidad la presentación pública del método. No pudo leer la página —cosa que conviene
registrar aparte, porque dice algo sobre cómo hay que publicar, no sobre el método—, y de todo lo
que escribió hubo una sola frase sustantiva: que el ecosistema al que pertenece Urazuke "describe
proyectos relacionados con interfaces impulsadas por IA, contratos de navegación para agentes,
accesibilidad, voz y automatización de interfaces". Urazuke quedó flotando ahí adentro, como un
proyecto más de esa bolsa.

En una sola frase metió tres cosas de naturaleza distinta y dejó al método adentro de una
narrativa de producto. Y lo que más me interesa de ese fallo es que después, cuando le pedí que
dibujara la relación entre las tres, acertó en algo importante —vio que forman un sistema y no
tres cosas sueltas— y se equivocó en lo único que había que no equivocar: dibujó una pila que baja
del método al protocolo y del protocolo a la herramienta, como si cada capa dependiera de la
siguiente. La flecha apunta al revés. Más abajo explico por qué, y por qué esa inversión es
exactamente la lectura que más daño le hace a un método publicado bajo licencia libre.

`[hipótesis]` Que ésta sea *la* lectura más común y no una casualidad de una sola herramienta es
mi interpretación, no un hecho: tengo una medición, no una muestra. Pero es una medición del tipo
de lector que más me importa, el que llega sin que yo esté al lado, así que la trato como si fuera
la regla hasta que algo la contradiga.

## Las tres cosas, cada una en una frase

**Urazuke es un método.** Qué hacer, en qué orden, qué pedirle al modelo en cada momento, qué
tiene que entregar, y cómo saber —sin leer código— que lo que entregó está completo. No es
software. Son veinticuatro peldaños en cuatro tramos, cada uno con su contrato escrito, y se
sigue con Claude Code, con Cursor, con Codex, con Gemini, con mi propia herramienta, o con lápiz
y papel y un modelo en una pestaña del navegador.

**NAC3 es un protocolo.** Un acuerdo sobre la forma de la superficie del producto: que cada
elemento de una pantalla tenga un identificador estable y métodos para operarlo, de manera que un
programa pueda hacer clic, tipear y leer el estado igual que una persona. *Protocolo*, para quien
no viene de sistemas, significa acuerdo sobre la forma, no programa: el acuerdo de que un enchufe
tenga dos patas a tal distancia es un protocolo, y lo cumplen fabricantes que no se conocen entre
sí. Resuelve un problema distinto del que resuelve el método: que la pantalla sea operable por un
agente y por una persona con la misma dignidad.

**Yujin Forge es una herramienta.** Un programa que implementa el método —automatiza las
compuertas, inyecta los prompts en el momento correcto, lleva el registro de pendientes— y que
habla el protocolo. Es la encarnación opinada, no la cosa.

Y esto es lo que la pila de tres cajas esconde: **no son tres capas del mismo tipo de cosa.** Un
método se sigue, un protocolo se cumple, una herramienta se instala. Mezclarlas en un dibujo
prolijo obliga a inventar una dependencia que no existe.

## Cuatro hechos que el repositorio sostiene

No son opiniones mías sobre mi propio método; son cosas que cualquiera puede ir a verificar.

1. **El método se declara neutral de herramienta, y lo pone en una tabla.** La Parte D del
   documento principal tiene una sección entera —"Cómo se usa con cualquier herramienta"— con
   cinco columnas: Claude Code, Cursor, Codex CLI / Gemini CLI y Forge. Para cada artefacto del
   método dice dónde se pone en cada una. Forge es una columna, la que más automatiza; el texto
   dice, con esas palabras, que "las otras tres funcionan igual de bien si el dueño hace a mano lo
   que Forge hace solo", y que ésa es, de hecho, la práctica del curso.

2. **Los veinticuatro contratos de peldaño no mencionan el protocolo ni una vez.** Cero de
   veinticuatro, medido el 24 de octubre de 2026 sobre los contratos castellanos. Si el protocolo
   fuera la capa que hace posible la verificación, aparecería en los contratos de los peldaños que
   exigen pruebas: 8, 10, 12. No aparece en ninguno.

3. **El documento principal dice explícitamente lo contrario de la dependencia.** En el peldaño 0,
   al enunciar el criterio excluyente X2, hay una frase que está ahí justamente para cerrar esta
   puerta: *"una precisión que vale oro para la neutralidad de herramienta: NAC3 (el protocolo que
   usa mi herramienta para que las pantallas se puedan operar por programa) **no** es condición; es
   el medio con el que hoy lo logro"*. Y el glosario cierra igual: *"No es obligatorio para el
   método: es el medio, no la condición."* El criterio, enunciado en términos neutrales, es que la
   interfaz se pueda ejecutar por programa y que cada elemento de la pantalla sea accesible con sus
   distintos métodos, de modo que un test pueda recorrer la pantalla y después verificar el efecto
   en el fondo. Eso lo cumple el protocolo, y lo cumple igual una aplicación sin una sola marca
   manejada por un driver común.

4. **Está decidido por escrito, con fecha.** Decisión D-003, 17 de octubre de 2026, en el registro
   de decisiones, con la cita textual del dueño: *"Nac3 no es obligatorio. SI testear desde la
   ejecución de las pantallas y el acceso a cada elemento de la interfaz con sus diferentes
   métodos."* No es una aclaración que agregué cuando me preguntaron: es anterior a la primera
   versión completa del documento.

Y un quinto hecho que no es del texto sino de la forma de publicarlo: el método está bajo licencia
CC BY-SA 4.0, con sus contratos, sus prompts y sus compuertas en un repositorio público. Se puede
seguir, enseñar y modificar sin instalar nada mío. Un método que necesitara mi herramienta no se
publicaría así.

## La flecha apunta al revés: el método publica, la herramienta consume

Éste es el corazón de la corrección, y tiene su propia decisión escrita.

Hasta el 23 de octubre de 2026, la definición mecánica de las compuertas —qué artefacto tiene que
existir en cada peldaño, qué tiene que decir, con qué estrategia se verifica— vivía compilada
adentro de la herramienta. Quinientas cuarenta y siete líneas de código. El síntoma de que eso
estaba mal era medible: la definición cambiaba cuando la herramienta sacaba una versión, no cuando
el método decidía algo. Y había cuarenta y cinco reglas de calidad que el método ya exigía por
escrito y que ninguna herramienta medía.

La decisión D-050 lo invirtió: **el método es el dueño de esa definición y la publica como datos.**
La fuente vive en el repositorio del método, se publica en una dirección fija de internet, y la
herramienta es consumidora, igual que ya lo era con los prompts. Lo publicado viaja con una
versión que el método declara a mano y con una *huella de contenido* —un número corto que resume
el archivo entero y cambia si cambia un solo carácter— que el consumidor **recalcula** en vez de
creerle. Si no coincide, lo que recibió no es lo que el método publicó.

De ahí sale la frase que corrige el dibujo: **Forge necesita al método; el método no necesita a
Forge.** Una pila que baja del método a la herramienta dice lo contrario, y esa lectura convierte
un método publicado bajo licencia libre en un embudo de ventas. Es la objeción que conviene tener
desarmada antes de que alguien la formule, no después.

## Son dos contratos verificables, no uno

La palabra "contrato" aparece en los dos lados de esta historia y nombra dos cosas distintas.
Confundirlas invierte la importancia.

**El contrato del proceso** son las compuertas publicadas como datos. Dice qué artefacto tiene que
existir en cada peldaño, qué tiene que decir y cómo se verifica; viaja con versión declarada y
huella recalculable; tiene reglas de edición que una máquina hace cumplir (una entrada de la base
congelada no se edita, los identificadores se agregan y no se reciclan, y un umbral que el dueño
no declaró se publica como *no declarado* en vez de inventarse un número). Éste es el contrato que
sostiene la tesis del método: que se puede verificar que un agente entregó completo sin leer su
código.

**El contrato de la superficie** es el protocolo: que la pantalla sea operable por programa. Es
real y es útil, pero es una condición sobre el producto, no sobre el proceso.

Llamar "contrato verificable" al segundo y dejar al primero sin nombre —que es exactamente lo que
hizo el asistente— es quedarse con el que se ve y perder el que sostiene el argumento.

## Lo que hace fehaciente a una prueba, y no es el protocolo

Si hay una pregunta que un auditorio técnico va a hacer, es ésta: *si el que construye es el mismo
que dice que probó, ¿por qué le creo?* La respuesta del método no pasa por el protocolo en ningún
momento.

Pasa por tres cosas. **El rojo como recibo** (decisión D-033): en el peldaño 8 no se acepta el
relato "probé que el test falla antes de arreglarlo"; se exige el recibo —el comando exacto, la
versión contra la que corrió, la cantidad de fallos y el código de salida, pegados tal cual—.
**La compuerta**, que se niega a cerrar el peldaño si ese recibo no está. Y **las pruebas de
mutación**, un tercer control del peldaño 9: romper el flujo a propósito, ver el test en rojo,
revertir, ver el verde; un test que no se pone rojo cuando el sistema se rompe es un test que no
mira nada.

Nada de eso necesita una pantalla. Funciona igual en un sistema que no tiene interfaz. El
protocolo ayuda en el peldaño de las pruebas de punta a punta, que es uno; lo que hace *fehaciente*
a una prueba es el recibo y la compuerta que lo exige.

## El diagrama honesto

```
                        ┌──────────────────────────────┐
                        │   Software en producción      │   ← el destino
                        └──────────────────────────────┘
                                       ▲
                            se construye siguiendo
                                       │
      ┌───────────────────────────────────────────────────────────────┐
      │  URAZUKE — el método                                          │
      │  exige la evidencia y publica sus compuertas como datos,      │
      │  con versión declarada y huella que el consumidor recalcula   │
      └───────────────────────────────────────────────────────────────┘
               ▲                                    ▲
     consume las compuertas              satisface el criterio de entrada
     y automatiza el método              "la pantalla se opera por programa"
               │                                    │
  ┌──────────────────────────┐      ┌──────────────────────────────────────┐
  │ UNA herramienta          │      │ NAC3 — un protocolo                  │
  │ Forge, Claude Code,      │      │ uno de los medios de que la pantalla │
  │ Cursor, Codex, Gemini…   │      │ sea verificable (no el único)        │
  └──────────────────────────┘      └──────────────────────────────────────┘
```

Las dos flechas suben. Ni la herramienta ni el protocolo están *debajo* del método en el sentido de
sostenerlo: están debajo en el sentido de rendirle cuentas. La herramienta consume lo que el método
publica; el protocolo satisface uno de los criterios que el método exige, y no es el único que lo
satisface.

Y conviene admitir el costo de esta versión: **la pila que baja es más linda.** Es limpia, se
dibuja en tres líneas y se recuerda. La versión correcta es más desprolija, y para una presentación
de todos modos va a hacer falta una simplificación. Mejor tener una que no mienta: tres cajas,
las flechas hacia arriba, y la palabra "una" delante de la herramienta haciendo todo el trabajo.

## Qué garantiza cada pieza, y qué se rompe si la saco

Esta tabla es, creo, la mejor forma de contar las tres cosas sin dibujar nada, porque obliga a
contestar la pregunta correcta.

| Pieza | Qué garantiza | Qué pasa si falta |
|---|---|---|
| **El método** | Que el dueño pueda verificar, sin leer una línea de código, que lo que el modelo entregó está completo | El modelo entrega lo que le pareció razonable y nadie tiene con qué discutirle. La herramienta, si la hay, automatiza compuertas que nadie definió: vuelve a decidir el proveedor y no el dueño |
| **El protocolo** | Que la pantalla sea operable por programa con identificadores estables, para una persona y para un agente | Hay que lograr lo mismo con otro driver y selectores más frágiles: más trabajo, más mantenimiento, el método sigue en pie. Si no se puede de **ninguna** manera, el proyecto no es elegible (criterio X2) y el método se niega a empezar: es la única pieza cuyo faltante absoluto detiene todo, y no porque falte el protocolo, sino porque falta la verificabilidad que el protocolo provee |
| **La herramienta** | Que las compuertas se apliquen solas, que el prompt del peldaño aparezca en el momento correcto y que la evidencia se registre sin que nadie se acuerde | El dueño pega el prompt a mano y exige la verificación de completitud antes de pasar al peldaño siguiente. Más disciplina, el mismo resultado. Ésa es la práctica del curso |

## Cómo se cuenta en treinta segundos

Para el guion de presentación, probado contra lo de arriba y sin ninguna frase que el repositorio
no sostenga:

> Urazuke es un método, no un programa: dice qué pedirle a un modelo, en qué orden, y cómo
> comprobar sin leer código que entregó completo. Está destilado de tres sistemas que están en
> producción con clientes de verdad, y publicado bajo licencia libre. Al lado hay dos cosas que no
> son el método y que conviene no confundir: un protocolo, que hace que las pantallas se puedan
> operar por programa, y que es *uno* de los medios de cumplir uno de los requisitos de entrada; y
> una herramienta, que automatiza las compuertas. El método publica sus compuertas como datos, con
> versión y con una huella que el consumidor recalcula, y la herramienta las consume. La
> herramienta necesita al método. El método no necesita a la herramienta.

## Lo que todavía es hipótesis

- `[hipótesis]` Que la confusión entre las tres sea la lectura por defecto de un lector nuevo.
  Tengo una medición del 24 de octubre de 2026 y nada más.
- `[hipótesis]` Que tres cajas con las flechas hacia arriba sea la simplificación correcta para un
  auditorio general. No la probé con un auditorio todavía; es la que se me ocurre que no miente.
- Queda fuera de esta sección, a propósito, todo lo que depende de a quién le estemos escribiendo:
  el costo del error evitado, la comparación con los trabajos publicados y la escalera en detalle
  viven en las versiones por audiencia, no acá.
