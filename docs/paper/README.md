# El paper sobre Urazuke, NAC3 y Forge — material de trabajo

Acá armo el escrito que explica el método a una audiencia que no vivió los proyectos: qué es, para
qué sirve, qué objetivo persigue y cómo se implementa. El trabajo está registrado como **PND-009**.

## Estado

| Pieza | Archivo | Estado |
|---|---|---|
| Método, protocolo y herramienta: tres cosas distintas | `metodo-protocolo-herramienta.md` | borrador 1, 24 de octubre de 2026 |

Esta primera pieza es **común a todas las versiones posibles** del paper: no depende de a qué
audiencia le escribamos, y es la que desarma la confusión que una lectura superficial produce sola
(que el método es la narrativa de un producto). Por eso la escribí antes de decidir el resto.

## Lo que falta decidir, y es del dueño

1. **Un paper con una puerta de entrada por audiencia, o varios papers hermanos.** Mi
   recomendación es la segunda: el que decide presupuesto quiere el costo del error evitado, el
   académico quiere la comparación con lo publicado y la objeción del rojo fingido respondida, y
   mezclarlos debilita a los dos. Cambia el tamaño del trabajo, así que la decisión va antes de
   escribir la segunda pieza.
2. **Qué audiencias concretas se cubren.**
3. **En qué idioma vive este material y si entra al corpus traducido.** Hoy está en castellano,
   porque es voz del autor y el castellano es la fuente de verdad (D-013). Pero D-051 dice que lo
   que queda fuera del corpus traducido va en inglés, y su lista de excepciones —el registro de
   decisiones, las evaluaciones de IA, el plan del curso, los manuales de práctica— no incluye un
   paper, porque no existía cuando se escribió la decisión. Las dos lecturas son defendibles y
   hace falta una decisión escrita: o el paper entra al corpus traducido (y entonces cada cambio
   se replica en siete idiomas en el mismo commit), o queda como voz del autor en castellano, o se
   escribe en inglés. Mientras no esté decidido, trabajo en castellano y no toco los árboles de
   los otros idiomas.

## Lo que hay que arreglar antes de que el paper cite la presentación pública

- La portada del portal se contradice consigo misma: en un lugar dice "veinticuatro peldaños en
  **tres** tramos" y más abajo dice "veinticuatro peldaños, **cuatro** tramos". La fuente de verdad
  del método dice cuatro (D-025); el texto de arriba quedó viejo cuando entró el cuarto tramo. Vive
  en el repositorio del portal, no en éste.
- Un asistente comercial de uso masivo no pudo leer la página el 24 de octubre de 2026, aunque la
  página responde bien, entrega su texto en el código y el archivo de permisos para rastreadores
  autoriza explícitamente a los de inteligencia artificial. Conclusión práctica para el formato: el
  paper tiene que ser una pieza **autónoma**, un archivo que alguien pega completo en cualquier
  asistente y que se explique solo, sin depender de que el asistente navegue.

## Nota de alcance

Esto es material de trabajo: no se publica, no entra en `docs/html/`, no lo lee la construcción
(`build/build.mjs` toma los archivos del método por nombre y los contratos de `docs/peldanos/`, así
que este directorio le es invisible) y nada de lo que hay acá es todavía doctrina del método. Lo
que de esta carpeta termine siendo parte del método se mueve al documento que corresponda, con su
decisión escrita.
