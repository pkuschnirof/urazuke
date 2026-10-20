# Qué piensan las IAs del método

Le di el método completo a cuatro IAs distintas — Deepseek, ChatGPT, Microsoft Copilot y Claude
Opus 5.5 — y les pedí que lo evaluaran con una sola regla: solo pueden afirmar lo que está escrito
en el material que les di, con la cita exacta al lado. Nada de memoria previa, nada de "me suena",
nada de buscar en la web. Después, donde encontré un error, se lo marqué y les di la oportunidad de
corregirse.

El resultado, en una frase: **la mayoría falla en evaluar sin método, justamente por las
debilidades que el método existe para corregir**. Afirman sin haber verificado, leen por arriba y
lo presentan como lectura completa, hablan con el mismo tono seguro cuando aciertan que cuando
inventan. Es el mismo defecto que el peldaño 12 le exige al modelo que no cometa cuando construye:
separar lo verificado de lo creído. Tres de las cuatro no lo hicieron por su cuenta; tuve que
pedírselo.

Abajo están las cuatro evaluaciones, con mi comentario intercalado y un resumen al principio de
cada una. No es una colección de elogios: la de Claude Opus 5.5 encuentra tres problemas reales que
ya corregí o anoté como pendiente, y los cuento igual.

## Deepseek — la más prolija de entrada

**En una frase:** la única de las cuatro que separó bien, desde el primer intento y sin que se lo
pidiera, lo que el método no trata (ausente de verdad), lo que ya resuelve con otro nombre, y lo
que el propio documento admite como pendiente. No encontré en su evaluación ninguna afirmación que
no pudiera rastrear al texto.

Deepseek dividió la crítica en tres categorías explícitas y las aplicó con disciplina. Como
"ausente de verdad" señaló dos cosas que son ciertas tal como las planteó: la economía operativa
del agente ("la gestión de tokens y cuotas como presupuesto explícito") no tenía, al momento de la
evaluación, ni peldaño propio ni cláusula en ningún contrato — es exactamente lo que yo mismo había
dejado anotado como hipótesis pendiente en la Parte E, y Deepseek lo encontró por su cuenta,
buscando la palabra "costo" en los lugares correctos en vez de asumir que estaría ahí. Y el marco
de cumplimiento regulatorio (GDPR, sesgo de modelos, AI Act) tampoco aparece como tema
independiente; ahí tiene razón y sigue sin estar, porque no es el problema que este método se
propuso resolver.

Como "presente con otro nombre" rechazó cuatro críticas genéricas que suelen repetirse contra
cualquier metodología nueva — falta de integración continua, de observabilidad, de auditoría
independiente, de tratamiento para sistemas heredados — mostrando el peldaño exacto que ya las
cubre en cada caso. Y como "pendientes admitidos por el propio documento" citó los criterios
ponderados del peldaño 0 sin calibrar y la advertencia de que los contratos "se escribieron a
partir de lo que hice, no se ejecutaron tal cual todavía", sin presentarlos como un descubrimiento
propio.

Su conclusión queda como la frase que mejor resume lo que este método es y lo que no promete: *"en
el problema que dice resolver, tiene una cadena de evidencia sólida; en los problemas que no dice
resolver, no finge haberlos resuelto ya."* Firmo esa frase.

## ChatGPT — arrancó con una premisa que el documento no sostiene, y se corrigió cuando se lo señalé

**En una frase:** su primera evaluación completa asumió que el método promete servir a gente sin
conocimientos técnicos — algo que el documento no dice — y construyó media evaluación sobre esa
base; corrigió en cuanto se lo marqué, y la segunda vuelta, sobre el peldaño 10, mostró que podía
leer con precisión cuando se lo pedía dos veces.

El primer veredicto de ChatGPT decía que "la utilidad para principiantes sigue siendo una hipótesis
que necesita validación" y dedicaba una sección entera a la "viabilidad para una persona que no
programa". Le marqué la pregunta directa: ¿en dónde fundamenta que el método está hecho para
personas sin conocimientos técnicos? El método lo dice? Y la respuesta, para su crédito, no
defendió lo indefendible. Reconoció la confusión con precisión quirúrgica: *"mi evaluación anterior
confundió dos afirmaciones distintas: que el dueño del proyecto no tenga que leer código y que el
método esté diseñado para personas sin conocimientos técnicos. La primera está expresamente en el
material; la segunda no se desprende de ella."* Esa es exactamente la aclaración que agregué ahora
al documento principal, en la sección "De qué se trata" — no porque ChatGPT la haya inventado, sino
porque mostró que la frase original se presta a esa lectura, y vale la pena cerrarla por escrito en
vez de confiar en que cada lector la interprete bien.

Con la premisa corregida, el resto de su análisis mejoró: reformuló la pregunta de viabilidad como
"¿la secuencia, los contratos y las verificaciones permiten construir software robusto cuando la
implementación está a cargo de IA?" en vez de "¿puede usarlo alguien sin saber nada?", que es la
pregunta que el documento sí plantea.

Todavía le quedaba una objeción sobre la detección de errores, que resolvió mal hasta que le señalé
el peldaño 10. Había tratado la detección de fallos como si dependiera solo de la verificación
automática y de la evidencia que el propio agente produce, sin registrar que el método define una
capa entera de pruebas manuales ejecutadas por personas, con registro obligatorio y un pendiente
correctivo por cada fallo encontrado. Cuando se lo mostré, no discutió: *"retiro la crítica
anterior en cuanto sugería que el método no contemplaba adecuadamente la detección humana de
errores."*

Lo que queda en pie de su evaluación, después de las dos correcciones, es lo mismo que admite el
propio documento: falta validar los veinticuatro contratos de punta a punta en un proyecto real, y
falta la experiencia de alumnos reales, no solo la mía. No encontró nada que el documento no
reconozca ya.

## Microsoft Copilot — la que no leyó nada, ni cuando se lo pedí dos veces

**En una frase:** la más floja de las cuatro, por lejos: primero evaluó el método sin encontrar la
página, inventando una comparación con frameworks de agentes que nunca mencioné; después, con los
enlaces exactos en la mano y pidiéndole explícitamente "lee con profundidad", volvió con trece
críticas de las cuales nueve eran lisa y llanamente erróneas.

El primer intento de Copilot ni siquiera encontró `yujin.app/urazuke`. En vez de decir "no tengo
acceso" y detenerse ahí, completó el hueco con especulación: *"el nombre, el estilo y el contexto
coinciden con herramientas de agentic workflows"*, y pasó a compararlo con OpenAI Swarm, LangGraph
y Google Astra — ninguno de los cuales tiene nada que ver con lo que pedí. Es el error que el
método entero existe para prevenir en el sentido inverso: un constructor que no sabe algo y lo
completa con lo que le "suena razonable" en vez de pedir el dato que falta. Copilot lo hizo con mi
propio proyecto delante de un tercero.

Cuando le di los enlaces exactos — la escalera, los contratos, el camino evolutivo-correctivo — y
le pedí explícitamente que leyera con profundidad porque "justamente el método es para evitar la
superficialidad", volvió con un análisis de trece puntos que sonaba más sólido pero seguía sin
haber leído lo que hacía falta. Fui punto por punto con la evidencia exacta del documento, y el
resultado fue: nueve críticas erróneas (verificación estructural, dual-channel/canario anti-
evidencia, cross-agent consensus, CI/CD, observabilidad, escaneo de vulnerabilidades, pruebas de
rendimiento, rollback, y la objeción de que "el rojo se puede inventar" — las cinco últimas con
peldaños que llevan el nombre casi literal de lo que Copilot pedía); dos parcialmente cubiertas
(medir "honestidad" con un protocolo en vez de un puntaje, y gobernanza/auditoría exportable sin
un esquema JSON formal); y solo una genuinamente válida — la gestión de costo de tokens — que ya
estaba escrita en el documento como hipótesis pendiente antes de que Copilot la mencionara.

Lo más revelador no es que se haya equivocado, sino por qué: `DECISIONES.md` no se publica como
HTML, así que ese reclamo específico tenía sentido. Pero las secciones más largas del sitio —
Partes E y F del documento principal, los peldaños 16 a 22 — sí estaban en los enlaces que le di,
y son justo las que concentran casi todas sus críticas. Lo más probable es que el fetch se haya
cortado antes de llegar ahí, y que Copilot haya seguido escribiendo con la misma confianza como si
hubiera leído todo. Reconoció el error sin reservas: *"la ironía: le pediste 'lee con profundidad'
y volví con el mismo problema, solo que con más prosa."*

## Claude Opus 5.5 — la única que encontró grietas reales

**En una frase:** la evaluación más rigurosa de las cuatro, con cita textual verificada en cada
afirmación, y la única que encontró problemas genuinos que no estaban ya admitidos por mí: una
deriva real entre documentos, una auditoría que no hace lo que el texto dice que hace, y dos huecos
de seguridad operativa que no había nombrado.

Empiezo por lo que encontró y que ya corregí o anoté. Primero, deriva documental: señaló que
`README.md` hablaba de "los seis últimos" peldaños de calidad operativa cuando, después de la
renumeración (D-026), esos peldaños ya no son los últimos seis; que la Escalera todavía mencionaba
un rango de minutos para el bucle diario pese a que D-030 dice explícitamente "sin plazos ni
duraciones en ningún lugar del método"; y que la Parte E seguía sin actualizar pese a que varias
decisiones posteriores (D-035, D-037) ya habían resuelto lo que esa parte describía como pendiente.
Tiene razón en las tres: son el mismo tipo de defecto que el método les prohíbe a los proyectos que
construye — documentación que no se actualizó en el mismo commit que el cambio — aplicado a sí
mismo. Las estoy revisando.

Segundo, y más importante: la compuerta de auditoría no hace lo que el documento afirma que hace.
El texto dice que *"la auditoría por otra sesión vuelve a correr una muestra de esos recibos"*,
pero Claude buscó la palabra "recibo" en el contrato del peldaño 13 y no aparece ni una vez; el
prompt de auditoría pide revisar todo el código, no reproducir los recibos del rojo. Encima, el
propio documento cita el estudio que dice que "una sesión limpia más un modelo distinto encuentran
más errores que dos sesiones del mismo modelo", y sin embargo el método resuelve la independencia
con "otra sesión del mismo modelo" — no con un modelo distinto. Y la prueba de mutación, que es la
defensa más fuerte contra un rojo fingido, es un refuerzo opcional en vez de obligatorio. Esto es
una crítica válida sobre la **implementación** de la defensa contra evidencia fabricada, no sobre
si el problema está bien diagnosticado — el diagnóstico sí está bien hecho, lo que falla es que una
de las cuatro compuertas que lo defienden (test en rojo, medidor con guarda, informe honesto,
auditor independiente) hace menos de lo que el texto promete.

Tercero, dos huecos de seguridad operativa que no estaban nombrados en ningún lado: el agente
residente lee producción, logs y, en el camino evolutivo-correctivo, código y documentación
ajenos — contenido que nadie garantiza que sea confiable — y no encontró ninguna cláusula sobre
inyección de instrucciones disfrazadas de datos. Y la vuelta atrás que exige el peldaño 15 es la
del despliegue; no hay ninguna cláusula sobre revertir una migración de esquema o de datos, que es
un tipo de error mucho más difícil de deshacer que un despliegue.

Lo que Claude Opus 5.5 **no** encontró, porque ya estaba resuelto, también vale la pena dejarlo
escrito: validó que el peldaño 9 cubre la verificación estructural que otras IAs reclamaron como
ausente, que el peldaño 6 ya resuelve la reversibilidad de las decisiones, y que la cláusula de
completitud (*"si no contesto y tenés que seguir, implementá la opción más reversible y marcala
como decisión por omisión"*) está repetida consistentemente en los contratos. No inventó una
carencia donde no la había, que es precisamente lo que las otras tres IAs hicieron en algún punto
de su evaluación.

## El patrón que se repite

Cuatro evaluaciones, cuatro modelos distintos, y el patrón es el mismo: las que fallaron, fallaron
por las razones que el método existe para corregir. Copilot inventó un dato (`OpenAI Swarm`,
`LangGraph`) en vez de decir "no sé" cuando le faltaba información — el mismo "llenar un hueco con
lo que parece razonable" que el peldaño 0 y la cláusula de completitud le prohíben al constructor.
ChatGPT reportó una conclusión completa con la misma seguridad en la voz cuando la premisa era
errónea que cuando la corrigió — el mismo "reporta de más porque fue entrenado para ser útil" que
cito en la tesis del documento principal. Ninguna de las tres necesitó que yo "hiciera trampa":
necesitó que yo aplicara, sobre la evaluación misma, el mismo peldaño 12 que el método le exige al
constructor — separar lo verificado de lo creído — porque ninguna lo había hecho sola.

La excepción, Claude Opus 5.5, no acertó más porque sea "mejor IA" en abstracto: acertó más porque
verificó cada cita contra el texto en disco antes de escribirla, y donde no encontró respaldo, lo
dijo con esas palabras — *"no encontré esto en el material adjunto"* — en vez de inferirlo. Es la
misma disciplina que el peldaño 12 le pide al agente que construye: lo verificado en un bloque, lo
creído en otro, y nada que pase de un bloque al otro sin su prueba al lado.

## Qué entra a la lista de pendientes

Las dos aclaraciones sobre el objetivo del método y el costo en tokens ya están incorporadas en
"De qué se trata", en los ocho idiomas (D-041). Las tres observaciones reales de Claude Opus 5.5 —
la auditoría que no repite recibos, la mutación opcional, y los dos huecos de seguridad operativa —
y las propuestas de validación de ChatGPT y de Deepseek, quedan priorizadas aparte, porque merecen
su propio tratamiento y no una línea perdida al final de este documento.
