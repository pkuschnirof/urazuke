# Ficha de criterios de elegibilidad

Insumo de la estación N0 del camino evolutivo-correctivo. Es la ficha **en blanco**: la
transcripción de los criterios del peldaño 0 del documento principal
([`ESCALERA_METODOLOGICA.md`](ESCALERA_METODOLOGICA.md), Parte "¿Este proyecto se puede encarar
así?") más los siete prerrequisitos del legado de
[`EVOLUTIVO_CORRECTIVO.md`](EVOLUTIVO_CORRECTIVO.md). Las columnas las completa el agente con lo
que hizo, no con lo que le preguntó a nadie; la ficha completa, con la decisión, va a
[`ELIGIBILITY.md`](ELIGIBILITY.md).

- **Sistema evaluado**: este repositorio (`pkuschnirof/urazuke`): la construcción, la definición
  de compuertas como datos, los dos extremos publicados y el sitio generado.
- **Quién decide**: Pablo Kuschniroff, dueño del método. El agente verifica y presenta; no
  decide.
- **Fecha de apertura de la ficha**: 24 de octubre de 2026.

## Los dos criterios excluyentes del peldaño 0

| # | Criterio excluyente | Respuesta | Fuente | Verde o rojo |
|---|---|---|---|---|
| X1 | Tecnología heredada sin repositorio accesible, o con repositorios que no siguen un estándar | | | |
| X2 | Tecnología que no se puede probar de punta a punta: no se pueden ejecutar las pantallas y acceder a cada elemento de la interfaz con sus distintos métodos, validando que el cambio llegó al backend | | | |

El criterio neutral de X2, tal como lo fija el documento principal: la interfaz se puede
ejecutar por programa y cada elemento de la pantalla es accesible con sus distintos métodos
(hacer clic, tipear, leer su estado), de modo que un test pueda recorrer la pantalla y después
verificar el efecto en el backend. NAC3 no es condición: es uno de los medios.

## Los criterios que ponderan (todavía sin peso, `[hipótesis]`)

| # | Criterio candidato | Respuesta | Fuente | Verde o rojo |
|---|---|---|---|---|
| D1 | Hay un dueño del dominio con criterio y con tiempo para decidir (no para programar) | | | |
| D2 | Hay un "oráculo" de verdad verificable: datos reales, un sistema externo, producción en solo lectura | | | |
| D4 | La tecnología está dentro de lo que el agente domina sin inventar (Node, Python, SQL, React) | | | |
| D5 | El error tiene consecuencia real (plata, salud, operación), lo que justifica el fail-closed | | | |
| D6 | La volumetría se puede conocer desde el día uno | | | |
| D7 | El cliente tolera un tiempo de maduración y un humano en el circuito | | | |
| D9 | El alcance cabe en un repositorio y un dueño | | | |
| D10 | Los secretos y accesos se pueden aislar (bóveda, archivo de entorno, permisos acotados) | | | |

Nota de transcripción: el contrato del peldaño 0 habla de "los criterios D1 a D10", y la tabla
del documento principal tiene ocho filas: faltan D3 y D8. El propio documento dice, dos párrafos
más abajo, que dos criterios de versiones anteriores quedaron absorbidos en X1 y X2, así que los
huecos son de identificadores que no se reciclan. Queda anotado porque el texto que manda copiar
"D1 a D10" hace esperar diez.

## Los siete prerrequisitos del legado

Cada uno lo verifica el agente **haciendo**, no preguntando. Si está en rojo no es un rechazo: es
un proyecto previo con su propio criterio de salida, que es el prerrequisito verificado en verde.

| # | Prerrequisito | Verde o rojo | Evidencia (qué hizo el agente y qué pasó) | Proyecto previo, si está en rojo |
|---|---|---|---|---|
| 1 | Se puede montar un ambiente completo del sistema, con todos sus fuentes, su modelo de datos y su persistencia, desde el repositorio y una copia de los datos | | | |
| 2 | El código es entendible y abordable por un modelo de frontera: puede leerlo entero y explicar qué hace cada módulo sin inventar | | | |
| 3 | A partir del código, el modelo puede describir en un documento la funcionalidad completa del sistema, en una forma que un usuario final reconozca como su sistema y acepte | | | |
| 4 | El frontend puede ser recorrido por herramientas de prueba para generar tests de punta a punta, con cada elemento accesible y el efecto en el backend verificable (es X2) | | | |
| 5 | El sistema se puede construir y ejecutar desde los fuentes con herramientas disponibles hoy: las dependencias se resuelven, las versiones existen, nada depende de un binario perdido | | | |
| 6 | Los datos de producción se pueden copiar y anonimizar para un entorno de prueba, y hay una copia de respaldo que se restauró al menos una vez | | | |
| 7 | Las integraciones externas tienen un modo de prueba o se pueden aislar en el borde, para que las acciones con consecuencia se prueben sin consecuencias | | | |

## Compuerta de la estación

Los siete en verde, con la evidencia del agente: el ambiente montado, el documento de
funcionalidad escrito y un test de punta a punta de un flujo corriendo. Cada rojo se convierte en
un proyecto previo con su propio pendiente de salida, marcado como bloqueante.
