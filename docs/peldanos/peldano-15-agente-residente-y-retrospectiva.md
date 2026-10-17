# Peldaño 15 — El agente adentro del sistema, y la retrospectiva con número (contrato del peldaño)

**Tramo:** operación (cuando el sistema ya está en producción) y cierre (vuelve al peldaño 0 para
el próximo proyecto).
**Forma:** dos partes: una conversación para definir el alcance del agente residente, y un tiro
largo para la retrospectiva.

## Para qué sirve

Dos cosas que cierran el mismo ciclo. Primero: el agente queda residente en producción, con
alcance acotado, para diagnosticar, operar y dar soporte sin que el constructor tenga que estar.
Segundo: el método mismo se revisa con números, y lo que se aprende cambia la escalera. Evita al
agente operando sin mapa del sistema, y al método que se repite igual proyecto tras proyecto sin
aprender (el equipo multiagente se mató con una retrospectiva: 60 dólares y 73 minutos contra 90
minutos).

## 1. Contexto requerido

Para el agente residente:
- Qué puede hacer el agente en producción y qué no: leer, diagnosticar, cambiar configuración,
  ejecutar acciones. Lo decide el dueño.
- Cómo se identifica el agente ante el sistema (una credencial propia, mapeada a una persona
  responsable).
- A quién le avisa cuando encuentra algo que no puede resolver (tickets, correo).

Para la retrospectiva:
- Los incidentes del proyecto, los costos (tokens, cuota, tiempo del dueño), los pendientes que
  más vueltas dieron, y las fechas.

## 2. Prompts

**Para el agente residente (inicial):**

> Vamos a dejarte residente en producción. Primero armá el mapa del sistema que vas a necesitar
> para operarlo: módulos, entornos, dónde está cada configuración, qué acciones tienen
> consecuencia (leé `docs/CANDADOS.md`), a quién avisar. **Si hay partes del sistema que no
> podés ver desde donde estás, decímelo; el mapa no puede tener huecos tapados.** Después
> proponeme tu alcance en tres niveles: solo lectura y diagnóstico; cambiar configuración con
> mi aprobación; ejecutar acciones con candado. Yo elijo el nivel. Tu credencial actúa como la
> persona que la creó: todo lo que hagas queda registrado a nombre de esa persona.

**Para el agente residente (de cierre):**

> Nivel [tal]. Dejá escrito en `docs/AGENTE_RESIDENTE.md` el mapa, el alcance, la credencial
> (sin su valor), y el procedimiento para pedirme aprobación. Y probá, con un intento real
> registrado en el log, que algo fuera de tu alcance se rechaza.

**Para la retrospectiva:**

> Terminó [la etapa / el proyecto]. Hacé la retrospectiva con números, no con impresiones:
> cuánto costó (tokens, cuota, mi tiempo), cuántos pendientes, cuáles dieron más vueltas y
> por qué, qué incidentes hubo y en qué peldaño de la escalera caen, y qué peldaño falló o
> faltó. **Si para algún número no tenés el dato (por ejemplo mi tiempo), pedímelo o marcalo
> como estimado; no lo inventes.** Terminá con una propuesta concreta de cambio a la escalera:
> qué peldaño se modifica, cómo, y qué incidente lo justifica. Dejalo en
> `docs/RETROSPECTIVA_[fecha].md`.

## 3. Resultado esperado

- `docs/AGENTE_RESIDENTE.md`: mapa del sistema, alcance elegido, credencial mapeada a una
  persona, procedimiento de aprobación, y la prueba de rechazo registrada en el log.
- `docs/RETROSPECTIVA_[fecha].md`: los números con su fuente, los incidentes mapeados a
  peldaños, y al menos una propuesta de cambio a la escalera con su justificación.

## 4. Verificación de completitud

- ¿El mapa del sistema dice qué NO puede ver el agente? Si no lo dice, tiene huecos tapados.
- ¿Probaste (o viste en el log) que una acción fuera del alcance se rechaza?
- ¿La credencial del agente actúa a nombre de una persona identificable?
- ¿La retrospectiva tiene números con fuente, o adjetivos? ("Costó mucho" no es un número.)
- ¿Cada incidente cae en un peldaño? Si alguno no cae en ninguno, falta un peldaño: esa es la
  propuesta de cambio.
- ¿Hay al menos una propuesta concreta de cambio a la escalera? Si la retrospectiva no cambia
  nada, no fue una retrospectiva.
