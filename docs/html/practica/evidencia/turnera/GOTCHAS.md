# Anti-patrones y golpes — Turnera (peldaño 11)

Cada vez que algo sale mal, acá queda la regla que lo evita. Se lee en cada sesión.

| Fecha | Golpe | Regla |
|---|---|---|
| 2026-10-19 | La primera propuesta de persistencia (todo en memoria en un archivo JSON) fue rechazada por la compuerta de dimensionamiento: 180.000 filas al horizonte superan lo que se puede materializar en memoria, y la atomicidad de "un solo hilo" no se ve en el código. | Dimensionar ANTES de elegir la persistencia; una garantía que no está escrita en el código no es una garantía. |
| 2026-10-19 | El cierre de un peldaño desde la CLI evaluaba la carpeta actual y no la del proyecto (el evaluador decía "ELIGIBILITY.md missing" con el archivo existente). | Toda compuerta recibe la raíz del proyecto explícita; el cwd es solo el último recurso. Forge lo corrigió en el mismo día. |
| 2026-10-19 | El rechazo del sobreturno se verificaba leyendo y después escribiendo, en dos pasos: dos recepcionistas podían pasar las dos. | La verificación y la escritura van en la misma transacción. |
| 2026-10-19 | La primera corrida del reporte cíclico abrió seis "bugs" que eran errores de red del propio panel de Forge (servidor apagado), no del producto. | Un error solo cuenta si viene del producto; la herramienta de monitoreo separa sus propios errores de los del sistema. Forge lo corrigió el mismo día. |
| 2026-10-19 | La auditoría externa (otro modelo) encontró que dos candados escritos en LOCKS.md (ausente solo hoy o después; teléfono válido para recordar) no existían en el código, y que un turno cancelado se podía revivir. | Un candado escrito en un documento no es un candado hasta que tiene su test; la auditoría lo verifica haciendo, no leyendo. |
| 2026-10-19 | Al agregar los candados, cuatro tests viejos fallaron porque sus datos de prueba asumían el comportamiento anterior (un teléfono "111", marcar ausente un turno futuro). | Cuando una regla cambia, los tests que la contradicen se cambian a la vista, en el mismo commit, y el reporte honesto lo dice; nunca se "arreglan" silenciando la regla nueva. |

