# Peldaño 14 — Documentación viva y manuales que una persona puede seguir sin IA (contrato del peldaño)

**Tramo:** operación (nace con el sistema; se mantiene en cada cambio).
**Forma:** rutina; más un tiro largo cuando se generan los manuales.

## Para qué sirve

Para que el sistema se pueda usar, mantener y recuperar sin el agente y sin la persona que lo
construyó. Si el día que no está el agente no se puede desplegar, no está terminado. En el método
clásico la documentación era cara y envejecía; acá regenerarla es gratis, entonces la regla pasa
a ser "en el mismo commit" y "reproducible a mano". Evita el documento desactualizado que provocó
un commit en el repositorio equivocado, y el archivo de proyecto convertido en historial.

## 1. Contexto requerido

- Quiénes son los lectores de cada manual: el usuario final, el que mantiene, el que opera la
  infraestructura. Lo sabe el negocio; el agente pregunta si no está claro.
- El sistema corriendo en el entorno de prueba, para sacar capturas reales.
- `docs/DESPLIEGUE.md` (peldaño 13) y `docs/CANDADOS.md` (peldaño 12), que son insumo.

## 2. Prompts

**Rutina (va en el contrato):**

> Todo cambio que modifique lo que el usuario ve, lo que el operador hace, o cómo se despliega,
> actualiza el manual correspondiente en el mismo commit. Si no sabés cuál manual, preguntá.

**Para generar los manuales:**

> Generá tres manuales a partir del sistema tal como está hoy en el entorno de prueba: el de
> usuario (pantalla por pantalla, con capturas reales, en el idioma del usuario y sin jerga),
> el de mantenimiento (cómo está armado, dónde está cada cosa, cómo se corre la batería, cómo
> se agrega un módulo), y el de infraestructura y recuperación (cómo se despliega, cómo se
> vuelve atrás, cómo se restaura un backup, qué hacer si se cae; escrito para una persona que
> lo tenga que hacer a mano, sin IA, a las tres de la mañana). **Si para alguna sección te
> falta saber algo que solo el negocio sabe (quién es responsable de qué, qué teléfono se
> llama), preguntámelo; no dejes un hueco ni inventes.** Cada manual con fecha y versión del
> sistema.

## 3. Resultado esperado

- `docs/MANUAL_USUARIO.md` (o HTML), con capturas reales e incrustadas.
- `docs/MANUAL_MANTENIMIENTO.md`.
- `docs/MANUAL_INFRAESTRUCTURA_Y_RECUPERACION.md`: paso a paso, para una persona.
- Cada uno con fecha y la versión del sistema que documenta.
- En los commits que cambian pantallas, operación o despliegue: el manual actualizado.

## 4. Verificación de completitud

- Abrí el manual de usuario en una pantalla al azar: ¿la captura coincide con lo que hay hoy
  en el entorno de prueba?
- ¿El manual de recuperación lo podrías seguir vos, o alguien de confianza que no programe?
  Leé la sección de "se cayó": ¿dice qué hacer, en orden, con los comandos?
- Elegí un commit reciente que cambió una pantalla: ¿tocó el manual?
- ¿Hay un hueco tipo "[completar]" o "consultar al responsable"? Ahí el agente tenía que
  preguntar.
- ¿Cada manual dice para qué versión del sistema vale?
