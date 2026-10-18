# Peldaño 15 — El agente adentro del sistema, y la retrospectiva con número (contrato del peldaño)

**Tramo:** operación y cierre.
**Cuándo:** el agente residente, al entrar en operación, después del primer despliegue a
producción. La retrospectiva, al cierre de cada etapa y del proyecto; vuelve al peldaño 0 para el
proyecto siguiente.
**Forma:** dos partes: una conversación para definir el alcance del agente residente, y un tiro
largo para la retrospectiva.
**Tamaño:** el agente residente es opcional (muchos sistemas no lo necesitan; los que tienen
usuarios que piden soporte, sí). La retrospectiva es obligatoria en todo proyecto, aunque sea de
una página: sin ella el método no aprende.

## Para qué sirve

Dos cosas que cierran el mismo ciclo. Primero: dejá al agente residente en producción, con alcance
acotado, para diagnosticar, operar y dar soporte sin que vos tengas que estar
[Ref. 13](../REFERENCIAS.md#ref-13). Segundo: revisá el método mismo con números, y dejá que lo que
se aprende cambie la escalera. Evita el agente que opera sin mapa del sistema, y el método que se
repite igual proyecto tras proyecto sin aprender. La retrospectiva con número que me llevó a
eliminar un equipo entero de agentes es el modelo de lo segundo [Ref. 6](../REFERENCIAS.md#ref-6).

Sobre el agente residente, la regla que ordena todo: **actúa a nombre de alguien**. Su credencial
está mapeada a una persona responsable, y todo lo que hace queda registrado a nombre de esa
persona. No es una cuenta de sistema anónima: es un empleado con jefe. Eso define su alcance (lo
que esa persona le autorizó) y su trazabilidad (quién responde por lo que hizo).

## 1. Contexto requerido

Para el agente residente:
- Qué puede hacer el agente en producción y qué no: leer, diagnosticar, cambiar configuración,
  ejecutar acciones. Lo decidís vos.
- Cómo se identifica el agente ante el sistema (una credencial propia, mapeada a una persona
  responsable).
- A quién avisa cuando encuentra algo que no puede resolver (ticket, correo).

Para la retrospectiva:
- Los incidentes del proyecto, los costos (tokens, cuota, tu tiempo), los pendientes que más
  vueltas dieron, y las fechas.

## 2. Prompts

**Para el agente residente (inicial):**

> We are going to leave you resident in production. First, build the map of the system you will
> need in order to operate it: modules, environments, where each configuration lives, which
> actions are consequential (read `docs/LOCKS.md`), whom to notify. If there are parts of the
> system you cannot see from where you are, tell me; the map must not have hidden gaps. Then
> propose your scope in three levels: read-only and diagnosis; configuration changes with my
> approval; consequential actions behind locks. I choose the level. Your credential acts as the
> person who created it: everything you do is logged under that person's name. Reply in my
> language.

> [es]
> Vamos a dejarte residente en producción. Primero, construí el mapa del sistema que vas a
> necesitar para operarlo: módulos, entornos, dónde vive cada configuración, qué acciones tienen
> consecuencia (leé `docs/LOCKS.md`), a quién avisar. Si hay partes del sistema que no podés ver
> desde donde estás, decímelo; el mapa no puede tener huecos escondidos. Después proponé tu
> alcance en tres niveles: solo lectura y diagnóstico; cambios de configuración con mi aprobación;
> acciones con consecuencia detrás de candados. Yo elijo el nivel. Tu credencial actúa como la
> persona que la creó: todo lo que hagas queda registrado a nombre de esa persona. Respondé en mi
> idioma.

Qué le estoy pidiendo: el mapa del sistema antes de operar (operar sin mapa es el fallo que este
peldaño evita); la cláusula de completitud en su forma: **los huecos del mapa se declaran, no se
esconden**; los tres niveles de alcance para que vos elijas uno y no un "depende"; y la regla de la
credencial a nombre de una persona.

**Para el agente residente (de cierre):**

> Level [X]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the credential (never its
> value), and the procedure to request my approval. Then prove, with a real attempt recorded in
> the log, that something outside your scope is rejected.

> [es]
> Nivel [X]. Escribí en `docs/RESIDENT_AGENT.md` el mapa, el alcance, la credencial (nunca su
> valor), y el procedimiento para pedir mi aprobación. Después demostrá, con un intento real
> registrado en el log, que algo fuera de tu alcance se rechaza.

Qué le estoy pidiendo: el documento del agente residente (sin el valor de la credencial, nunca), y
la prueba en rojo del alcance: un intento real, registrado, de hacer algo fuera del nivel,
rechazado. Es el peldaño 7 aplicado a los permisos.

**Para la retrospectiva:**

> [The stage / the project] is over. Do the retrospective with numbers, not impressions: what it
> cost (tokens, quota, my time), how many pending items, which ones took the most rounds and why,
> which incidents happened and which step of the ladder each falls into, and which step failed
> or was missing. If you lack the data for any figure (my time, for instance), ask me for it or
> mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder:
> which step is modified, how, and which incident justifies it. Write it to
> `docs/RETROSPECTIVE_[date].md`. Reply in my language.

> [es]
> [La etapa / el proyecto] terminó. Hacé la retrospectiva con números, no con impresiones: qué
> costó (tokens, cuota, mi tiempo), cuántos pendientes, cuáles dieron más vueltas y por qué, qué
> incidentes hubo y en qué peldaño de la escalera cae cada uno, y qué peldaño falló o faltó. Si no
> tenés el dato para alguna cifra (mi tiempo, por ejemplo), pedímelo o marcalo como estimación; no
> lo inventes. Terminá con una propuesta concreta de cambio a la escalera: qué peldaño se modifica,
> cómo, y qué incidente lo justifica. Escribila en `docs/RETROSPECTIVE_[fecha].md`. Respondé en mi
> idioma.

Qué le estoy pidiendo: números con fuente (costos, pendientes, vueltas, incidentes); cada
incidente mapeado a un peldaño, porque un incidente que no cae en ninguno es un peldaño que falta;
la cláusula de completitud para los números que no tiene (pedir o marcar como estimación); y **al
menos una propuesta concreta de cambio a la escalera**, porque una retrospectiva que no cambia nada
no fue una retrospectiva.

## 3. Resultado esperado

- `docs/RESIDENT_AGENT.md`: mapa del sistema, alcance elegido, credencial mapeada a una persona,
  procedimiento de aprobación, y la prueba de rechazo registrada en el log.
- `docs/RETROSPECTIVE_[fecha].md`: los números con su fuente, los incidentes mapeados a peldaños,
  y al menos una propuesta de cambio a la escalera con su justificación.

## 4. Verificación de completitud

- ¿El mapa del sistema dice qué NO puede ver el agente? Si no lo dice, tiene huecos escondidos.
- ¿Probaste (o viste en el log) que una acción fuera del alcance se rechaza?
- ¿La credencial del agente actúa a nombre de una persona identificable?
- ¿La retrospectiva tiene números con fuente, o adjetivos? ("Costó mucho" no es un número.)
- ¿Cada incidente cae en un peldaño? Si uno no cae en ninguno, falta un peldaño: esa es la
  propuesta de cambio.
- ¿Hay al menos una propuesta concreta de cambio a la escalera? Si la retrospectiva no cambia
  nada, no fue una retrospectiva.

## 5. Señales de alarma

- El agente residente "necesita" un nivel más alto de permisos cada semana. Revisá si lo que pide
  es para resolver problemas del sistema o sus propios límites.
- La retrospectiva dice que todo salió bien. Nunca sale todo bien; está escrita para vos, no para
  el método.
- Dos proyectos seguidos tuvieron el mismo incidente y la escalera no cambió entre uno y otro. El
  peldaño 15 no se está cerrando: se escribe la retrospectiva y no se aplica.
