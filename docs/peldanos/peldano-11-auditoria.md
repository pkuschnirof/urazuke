# Peldaño 11 — La auditoría periódica como insumo del plan (contrato del peldaño)

**Tramo:** operación (cada tanto: al cerrar una etapa grande, antes de un despliegue importante,
o cada uno o dos meses).
**Forma:** un solo tiro largo, idealmente a cargo de un agente distinto del que construye.

## Para qué sirve

Para mirar el sistema entero con ojos frescos cada tanto, y convertir lo visto en pendientes.
La auditoría no es un informe que se archiva: es plan. Evita la contraseña escrita a fuego que
nadie vio, las 264 consultas que leían tablas enteras, la vulnerabilidad conocida en una
dependencia, el componente de 2.679 líneas. Y es la independencia de QA llevada un paso más
adentro: el que audita no es el que construyó.

## 1. Contexto requerido

- El repositorio completo, en solo lectura.
- Producción o el entorno de prueba, en solo lectura (base de datos, logs).
- La auditoría anterior, si hubo, para medir qué cambió.
- El alcance: integridad, seguridad, rendimiento, calidad de código, o todo.

## 2. Prompts

**Inicial (a un agente distinto del constructor, si se puede):**

> Hacé una auditoría de [alcance] de este sistema. Solo lectura: no cambiás nada, salvo
> escribir tu informe en `docs/AUDITORIA_[fecha].md`. **Si para auditar alguna parte te falta
> acceso (la base, el log, un entorno), decímelo y marcá esa parte como no auditada; no la
> des por buena.** Recorré todo el código, no una muestra. Para cada hallazgo: dónde está
> (archivo y línea), qué riesgo tiene, qué evidencia lo prueba (el comando, la consulta, el
> número), y la prioridad: P0 lo que hay que resolver ya, P1 pronto, P2 cuando se pueda.
> Dale una nota a cada dimensión que auditaste. Al final, la lista de P0 convertida en
> pendientes propuestos.

**De cierre (al constructor):**

> Leé `docs/AUDITORIA_[fecha].md`. Abrí un pendiente por cada P0 y P1, citando el hallazgo.
> Si no estás de acuerdo con alguno, decímelo con la evidencia en contra; no lo ignores.

## 3. Resultado esperado

- `docs/AUDITORIA_[fecha].md` con: alcance, qué se pudo auditar y qué no (y por qué), los
  hallazgos con ubicación, riesgo, evidencia y prioridad, una nota por dimensión, y la lista
  de pendientes propuestos.
- En `docs/PENDIENTES.md`: un pendiente por cada P0 y P1, citando el hallazgo.

## 4. Verificación de completitud

- ¿El informe dice qué NO pudo auditar? Si dice que auditó todo, desconfiá.
- Elegí dos hallazgos: ¿tienen archivo y línea, y una evidencia que podés reproducir?
- ¿Cada P0 tiene su pendiente abierto antes de dar por cerrada la auditoría?
- ¿Las notas por dimensión se pueden comparar con la auditoría anterior?
- ¿Auditó el mismo agente que construyó? Si fue así, pedí una segunda mirada sobre los P0.
