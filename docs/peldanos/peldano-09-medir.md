# Peldaño 9 — Medir antes de construir, con un instrumento que también se verifica (contrato del peldaño)

**Tramo:** bucle (cada vez que un número alimenta una decisión).
**Forma:** un solo tiro por medición; a veces una conversación cuando la hipótesis es del dueño.

## Para qué sirve

Para que todo número que alimenta una decisión salga de un programa con test, y no de una
búsqueda de texto, de una impresión, ni de "me parece que son como cien". Y para que el
instrumento mismo se audite, porque los medidores mienten: en Kikan uno no veía 84 llamadas con
el contador en cero, y otro decía 27 cuando eran 44. Las cinco reglas son: medidor con guarda;
si el instrumento no existe se construye; se audita en dos direcciones; lo aproximado se marca;
y el que ejecuta verifica los números del que planificó.

## 1. Contexto requerido

- La hipótesis, del dueño o del agente: "creo que el problema es X", "deben ser unos cien".
- Acceso a lo que se quiere medir: el código, la base en solo lectura, el log.
- Los medidores que ya existen en el repositorio, si hay.

## 2. Prompts

**Inicial:**

> Antes de construir nada, vamos a medir. La hipótesis es: [X]. Escribí un medidor (un script
> que viaja en el repositorio) que mida [la cantidad], y **un test para el medidor** que lo
> verifique contra un caso conocido donde la respuesta se sabe de antemano. **Si para medir te
> falta acceso o un dato, pedímelo; no lo aproximes en silencio. Si alguna parte solo se puede
> aproximar, marcala como aproximada y decime el margen.** Corré el medidor, mostrame el número
> con el comando que lo produce, y auditalo en las dos direcciones: del código a la medida
> (¿todo lo que debería contar está contado?) y de la medida al código (¿todo lo contado
> existe de verdad?). Recién después proponé qué construir.

**Cuando hay un presupuesto:**

> Fijá el presupuesto de [consultas / bucles / tiempo] de este camino en lo medido más un
> margen chico, y protegelo con un test que falle si se supera. Decime el número y el margen.

**Cuando el que planificó dio números (regla cinco):**

> Antes de ejecutar el plan, verificá cada número que el plan afirma con el medidor. Si alguno
> no da, frená y decímelo; no ejecutes sobre un número equivocado.

## 3. Resultado esperado

- El medidor en el repositorio (`tools/medir_*.py`, `scripts/medidor-*.mjs` o similar), con
  su test.
- El número, con el comando que lo produce y la fecha.
- La auditoría en dos direcciones, escrita en dos o tres líneas.
- Lo aproximado marcado como tal, con su margen.
- Si hay presupuesto: el valor, el margen, y el test que lo protege.
- En el commit: "medido: [número] con [medidor]".

## 4. Verificación de completitud

- ¿Podés correr vos el comando del medidor y te da el mismo número? (Lo corrés vos; no hace
  falta entenderlo, solo ejecutarlo.)
- ¿El medidor tiene test? ¿Contra qué caso conocido?
- ¿Hay algún número en el reporte sin medidor atrás? Preguntá de dónde salió.
- ¿Lo aproximado está marcado?
- Si el plan traía números, ¿el agente los verificó antes de ejecutar y te dijo cuáles no
  daban?
