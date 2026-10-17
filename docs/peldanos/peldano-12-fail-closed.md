# Peldaño 12 — Fail-closed, candados y cero daño silencioso (contrato del peldaño)

**Tramo:** operación (se diseña antes de que el sistema actúe sobre el mundo; se revisa con cada
acción nueva con consecuencia).
**Forma:** conversación: el agente lista las acciones con consecuencia, el dueño confirma cuáles
llevan candado y de qué tipo.

## Para qué sirve

Para que el sistema, ante duda o falla, NO actúe, y avise. Suena obvio y es lo contrario de lo
que hace el software por defecto, que ante la duda sigue adelante. Evita el doble cobro, la
aprobación automática sin que pase por un humano, el `git add -A` que sube una credencial, y
borrar datos del cliente.

## 1. Contexto requerido

- **Relevamiento de acciones con consecuencia**, nombrado así en forma genérica: qué hace el
  sistema que cobra, envía, aprueba, borra, o le avisa a alguien de afuera; qué pasa si se hace
  dos veces; qué pasa si se hace mal; cómo se deshace. Lo sabe el negocio; el agente evalúa si
  la lista está completa y pregunta.
- Qué acciones puede hacer el agente mismo sobre el sistema (si está embebido).

## 2. Prompts

**Inicial:**

> Vamos a decidir qué acciones del sistema necesitan candado. Leé el relevamiento de acciones
> con consecuencia y recorré el código buscando todo lo que cobra, envía, aprueba, borra o
> notifica hacia afuera. **Compará las dos listas: si en el código hay acciones que el
> relevamiento no menciona, o al revés, preguntame antes de seguir.** Para cada acción
> proponé: si es reversible o no, qué candado lleva (confirmación explícita, doble seguro,
> modo de ensayo, límite por día, un humano en el circuito), y cuál es el camino de vuelta
> si sale mal. Regla general: ante cualquier duda o falla en el camino, la acción NO se
> ejecuta y se registra por qué. Presentame la tabla; yo confirmo candado por candado.

**De cierre:**

> Confirmo los candados [tales]; cambiá [tal] por [tal]. Implementalos con un test por candado
> que demuestre que, ante la condición de duda, la acción NO ocurre (probado en rojo contra la
> versión sin candado). Dejá la tabla final en `docs/CANDADOS.md`. Y para cualquier
> automatización nueva: primero modo de ensayo, con registro de lo que habría hecho, hasta
> que yo la habilite.

## 3. Resultado esperado

- `docs/CANDADOS.md`: una fila por acción con consecuencia: qué hace, si es reversible, el
  candado, el camino de vuelta, quién lo aprobó y cuándo.
- Un test por candado, probado en rojo, que verifica que ante la duda la acción no ocurre.
- Las automatizaciones nuevas arrancando en modo de ensayo, con el registro de "habría hecho".
- Si el agente está embebido: sus permisos escritos (qué puede leer, qué puede cambiar, qué
  necesita aprobación).

## 4. Verificación de completitud

- ¿Cada acción que cobra, envía, aprueba o borra está en la tabla? Pensá en una que no esté y
  preguntá.
- ¿Cada candado tiene su test en rojo? ("Sin el candado, la acción ocurría; con el candado,
  no.")
- ¿Toda acción irreversible tiene camino de vuelta escrito? Si no lo tiene, necesita doble
  seguro.
- ¿Las automatizaciones nuevas arrancaron en modo de ensayo? ¿Viste el registro de "habría
  hecho" antes de habilitarlas?
- ¿Qué pasa si el agente embebido intenta algo fuera de sus permisos? Pedile que lo pruebe y
  que te muestre el rechazo en el log.
