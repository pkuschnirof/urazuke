# Licencia del método Urazuke

Este repositorio tiene **dos licencias**, y la frontera entre las dos es una sola idea: **lo
que una persona lee se comparte igual; lo que una máquina ejecuta o consume no exige nada a
cambio.** El método se protege, la herramienta que lo implementa no se traba.

| Qué | Licencia | Dónde |
|---|---|---|
| Los programas: el conversor, los validadores, las compuertas, los publicadores, y sus pruebas | **Apache-2.0** (`LICENSE-CODE`) | `build/`, `tests/` |
| La definición mecánica de las compuertas, que es lo que una herramienta implementa: el esquema, los peldaños, las estaciones, los evaluadores, el Anexo H como dato, los adaptadores y la base | **Apache-2.0** (`LICENSE-CODE`) | `gates/`, y su copia publicada `docs/html/api/gates.json` con sus copias por versión |
| El índice de la interfaz de datos, que es metadata de publicación y nada más | **Apache-2.0** (`LICENSE-CODE`) | `docs/html/api/index.json` |
| **El método**: la escalera, los contratos de peldaño, las referencias, los manuales, el Anexo H en prosa, el glosario, las ocho traducciones y los HTML de lectura | **CC BY-SA 4.0** (`LICENSE`) | `docs/`, salvo los tres archivos de arriba |
| Los prompts | **CC BY-SA 4.0** (`LICENSE`) | `prompts/`, `docs/html/api/prompts.json` |
| Los textos del método por identificador, extraídos de la prosa | **CC BY-SA 4.0** (`LICENSE`) | `labels/`, `docs/html/api/labels.json` |
| El README, la guía para contribuir y las normas del proyecto | **CC BY-SA 4.0** (`LICENSE`) | `README.md`, `CONTRIBUTING.md`, `CLAUDE.md` |

**Por qué no está todo bajo la misma.** El "compartir igual" sobre la prosa es exactamente lo
que quiero: quien se lleve el método, lo extienda y lo publique, lo publica abierto. Sobre un
archivo que se ejecuta hace otra cosa: no define dónde termina la adaptación —una empresa que
mete un evaluador adentro de su cadena de entrega no sabe si la cadena entera pasó a ser una
adaptación de esto, y cuando la respuesta es "no sé", la decisión de esa empresa es "no lo
uses"—, Creative Commons misma recomienda no usar sus licencias para software, y cualquier
revisión de licencias corporativa pone "CC BY-SA sobre código" en la misma casilla que "sin
licencia". Eso no protege nada que yo pueda hacer valer; lo que cuesta es justamente la
adopción que busco. Apache-2.0 es además la licencia de NAC3, así que dos proyectos míos
dejan de ser incompatibles entre sí.

**Un texto puede viajar en los dos lados, y eso es a propósito.** La redacción de una regla
del Anexo H está en el catálogo de compuertas, que una herramienta implementa (Apache-2.0), y
también en el recurso de etiquetas y en la prosa del anexo, que una persona lee (CC BY-SA
4.0). El titular es el mismo y puede licenciar su propio texto dos veces; lo que no puede es
dejar adivinando al que lo consume. Por eso **cada recurso publicado declara su licencia en su
propio campo `license`, y el índice de la interfaz la extrae de cada uno** en vez de declarar
una sola para todos.

**La ficha del repositorio declara CC BY-SA 4.0**, que es la licencia de la mayor parte de lo
que hay acá y la del método. El detector de GitHub lee un solo archivo; el reparto completo es
éste.

---

## La prosa del método: CC BY-SA 4.0

Esta es la lectura en castellano de la licencia, con las notas que la acompañan. El texto
legal que rige está en `LICENSE`, en la redacción original de Creative Commons: está ahí en
inglés porque es la versión que los detectores automáticos reconocen, y por eso la ficha del
repositorio declara la licencia en vez de dejarla en blanco. La traducción oficial al
castellano del texto legal es https://creativecommons.org/licenses/by-sa/4.0/legalcode.es

---

Urazuke — el método de la evidencia
Copyright (c) 2026 Pablo Kuschnirof

Esta obra está publicada bajo la licencia Creative Commons Atribución-CompartirIgual 4.0
Internacional (CC BY-SA 4.0).

Usted es libre de:
- Compartir: copiar y redistribuir el material en cualquier medio o formato.
- Adaptar: remezclar, transformar y construir a partir del material, para cualquier
  propósito, incluso comercial.

Bajo los siguientes términos:
- Atribución: debe dar crédito de manera adecuada, brindar un enlace a la licencia e
  indicar si se han realizado cambios.
- CompartirIgual: si remezcla, transforma o crea a partir del material, debe distribuir su
  contribución bajo la misma licencia que el original.
- Sin restricciones adicionales: no puede aplicar términos legales ni medidas tecnológicas
  que restrinjan legalmente a otros hacer cualquier uso permitido por la licencia.

Texto legal completo: https://creativecommons.org/licenses/by-sa/4.0/legalcode.es
Resumen legible: https://creativecommons.org/licenses/by-sa/4.0/deed.es

Nota: la licencia cubre los documentos del método (texto, contratos de peldaño, glosario).
Los nombres "Yujin", "Yujin Forge", "Kikan", "RPAForce" y "NAC3" son marcas o nombres de
producto de su titular y no quedan licenciados por este archivo. Los sistemas de los clientes
mencionados están anonimizados y no forman parte de esta obra.

---

## Lo que se ejecuta y lo que una máquina consume: Apache-2.0

Copyright 2026 Pablo Kuschnirof

Los programas de `build/` y sus pruebas en `tests/`, la definición mecánica de las compuertas
en `gates/` y las dos piezas de la interfaz de datos que son metadata o definición
—`docs/html/api/gates.json` con sus copias por versión, y `docs/html/api/index.json`— se
publican bajo la licencia Apache, versión 2.0. El texto legal que rige está en `LICENSE-CODE`,
en la redacción original: https://www.apache.org/licenses/LICENSE-2.0

En lenguaje de todos los días: podés usarlo, modificarlo, redistribuirlo y meterlo adentro de
un producto cerrado, con o sin fines comerciales, sin pedir permiso y sin tener que abrir lo
tuyo. Lo que sí tenés que hacer es conservar el aviso de copyright y la licencia, y decir qué
archivos cambiaste. Y viene con una concesión de patentes explícita, que es la mitad que las
licencias de Creative Commons no tienen y la razón por la que una revisión corporativa la
acepta sin preguntar.

La misma nota de arriba vale acá: los nombres "Yujin", "Yujin Forge", "Kikan", "RPAForce" y
"NAC3" no quedan licenciados por este archivo. Apache-2.0 lo dice por su cuenta en su sección
6: la licencia no concede derechos sobre las marcas del titular.
