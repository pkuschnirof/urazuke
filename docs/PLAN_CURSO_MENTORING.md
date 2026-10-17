# Plan: curso + mentoring para "vibecoders" (borrador 1)

Conversacion Pablo <-> Sumi, 2026-10-16. Es un BORRADOR para seguir elaborando; nada de esto
esta decidido salvo lo marcado como decision. ASCII puro.

## 1. Diagnostico de partida

**Listos para**: mentoring con auditoria a una cohorte chica (5). **No listos para**: un curso
grabado y masivo.

Lo que tenemos y casi nadie tiene: **un caso real con evidencia**. Kikan: ~45.000 lineas de
API, 272 archivos de test, un cliente productivo con familias reales, y una reingenieria de
persistencia de 12 etapas ejecutada por un agente (Forge) con decisiones escritas, medidas y
guardadas por tests. El material del curso YA EXISTE: esta en los encabezados de los archivos,
en los 62 commits de la reingenieria y en los dos informes de esta semana
(`[repositorio Kikan]/docs/INTEGRIDAD_REINGENIERIA_PERSISTENCIA_2026_10_14.md` y
`AUDITORIA_CALIDAD_CODIGO_2026_10_15.md`). Falta ordenarlo.

Lo que NO esta listo para que un desconocido lo use en vivo (todo visto la semana del
2026-10-13): un turno huerfano corriendo 1h43 invisible (arreglado en Forge 1.18.0), un error
de OAuth reportado como "success" (pendiente), un deploy que se pisa con otro, 23 pushes/dia
que fundieron la cuota de GitHub Actions, dos puertas de admin creadas en 24 h (PND-223
retirada), la clave de MariaDB impresa en un transcript. **Es a la vez el mejor contenido del
curso y la razon para no grabarlo todavia**: un mentoring lo tolera, un video no.

## 2. Frente a Antigravity / Cursor / Claude Code

(Conocimiento hasta mediados de 2026.)

| | Antigravity / Cursor / Claude Code | Forge |
|---|---|---|
| Cerebro | los mismos modelos | los mismos (Forge corre Claude por `claude -p`) |
| Donde juega | el IDE, agentes en paralelo, navegador | el proyecto como sistema vivo y despues PRODUCCION (asistente residente) |
| Que verifica | artefactos: planes, capturas, grabaciones | tests como candados, presupuestos de consultas, medidores con guarda, registro de pendientes |
| Que registra | el chat | decisiones junto al codigo, journal de cambios, auditoria de quien hizo que |
| Que impide | poco: optimizan velocidad al primer demo | fail-closed: verbos NAC3 con aprobacion, scopes, doctrinas, gates de workflow |

El modelo puede abordar la complejidad de Forge (es el mismo). Lo que no tienen es el SISTEMA
OPERATIVO alrededor del modelo: nada les impide `git add -A` con un token, ni les exige medir
antes de reescribir, ni les hace escribir por que una decision es asi. Con Antigravity se llega
al demo mas rapido; en el mes tres (3,4 M filas/ano, el heap revienta) no hay metodo.

**El nicho**: no "programar con IA" sino "SOSTENER con IA un sistema que un cliente usa".
Advertencias: Antigravity converge en la idea de artefactos-como-evidencia y Google despliega
mas rapido; la ventaja es metodologica y de caso, no tecnologica; ventana 12-18 meses.

## 3. Publico

Decision tentativa: **consultoras chicas, equipos de RPA/automatizacion, freelancers con 1-3
clientes productivos** -- gente que ya tiene el problema del mes tres. NO indie hackers de fin
de semana (no pagan por disciplina).

## 4. Fases

**Fase 0 -- 3 semanas, sin alumnos.** Elegir publico. Extraer el metodo en 8-10 doctrinas cortas
(la mitad ya esta en `docs/doctrine`). Cerrar las fallas que avergonzarian en vivo: mensaje de
OAuth, CORS del deploy, `yf doctor` para instalacion y keys. Partir el `CLAUDE.md` de kikan: el
operativo de 300 lineas es el PROGRAMA del curso; el historial de PNDs es el LIBRO DE CASOS.

**Fase 1 -- una cohorte de 5, 6 semanas, mentoring + auditoria.** Cada uno trae su proyecto
real. Seis sesiones:
1. El modelo operativo: pendientes como plan, decisiones escritas, las reglas SQ.
2. De spec a esqueleto con NAC3.
3. Tests como candados; rojo antes que verde.
4. Medir antes de construir: presupuestos, medidores con guarda.
5. CI, secretos, deploy, costo de cuota.
6. El agente en produccion: embed, scopes, aprobaciones.
Entre sesiones, el entregable es la AUDITORIA de su repo (misma herramienta que
`AUDITORIA_CALIDAD_CODIGO`). Precio alto, cupo chico: se cobra el acompanamiento, no el video.

**Fase 2 -- el curso es el residuo de la cohorte.** Lo grabado sale de lo que paso en la fase 1,
fallas incluidas; Forge con licencia por asiento va adentro (trial + seats ya existen).

Riesgo principal: el ancho de banda de Pablo (Forge + Kikan + Autorizaciones + cohorte no entran). La
cohorte tiene que ser el lugar donde Kikan y Autorizaciones se CUENTAN, no un cuarto trabajo.

## 5. LinkedIn: 4-6 semanas antes de la cohorte (no hay alumnos hoy)

Objetivo unico: una lista de espera de 20-30 nombres, de la que salen 5.

**Que se vende (una frase, y no es Forge)**: "Como sostener con IA un sistema que un cliente
usa de verdad -- con el caso completo de uno en produccion." Forge aparece como lo que usamos.

**Contenido = el caso en pedazos.** 3 posts/semana, 5 semanas, 150-250 palabras, un numero en
la primera linea, una tabla o captura, cierre con pregunta. Sin vender en los primeros 10.
Posts listos para contar (datos verificados de la semana del 13-oct):
- El agente corrio 1h43 invisible y commiteo 6 veces: como lo encontre y que cambie.
- 2.000 minutos de GitHub en 16 dias: cada commit pagaba los tests tres veces.
- Le pedi mapear una API key a un usuario; lo hizo bien, y 24 h antes habia creado otra puerta
  que daba superadmin a cualquier admin.
- De 121 bucles N+1 a 79: midio con un script con test antes de tocar, y el numero estaba mal.
- Un CLAUDE.md de 213.000 tokens "leido en cada turno": como un manual se vuelve un changelog.
- Auditoria a 45.000 lineas escritas por IA: A en errores, D en documentacion; los numeros.
Cuidados: permiso del cliente para nombrarlo (si no: "una entidad de salud con 5.000 familias");
ninguna captura con datos de familias.

**El iman**: auditoria de repo gratis para los primeros 5 (semana 2). Cada una es una
conversacion de 30 min con alguien que ya tiene un sistema vivo. De 5 salen 2 alumnos.

**Acompana**: perfil con titular de problema, no de cargo ("Sistemas con IA que sobreviven al
cliente | caso real en produccion"), destacados con los dos informes y el paper del benchmark
de yujin.app; landing en yujin.app con lista de espera (una pagina; el repo de landings es
`pkuschnirof/rpaforce`, `C:\RPAForce\web\yujin.app\`); 30 DMs a contactos del mundo RPA/
consultoras en la semana 3; NADA de anuncios pagos todavia.

| Semana | Que pasa |
|---|---|
| 1 | perfil + 3 posts de caso |
| 2 | 3 posts + lanzar la auditoria gratis |
| 3 | 3 posts + 30 DMs + hacer las auditorias |
| 4 | 3 posts + abrir la lista de espera con fecha |
| 5 | 3 posts + conversaciones 1:1 con la lista |
| 6 | cerrar 5 y arrancar |

## 6. Proximos pasos (a elaborar)

- [ ] Decidir publico y nombre del programa.
- [ ] Sumi redacta los primeros 5 posts con los datos reales + texto de la landing.
- [ ] Pedir permiso a los clientes para el caso con nombre.
- [ ] Lista de las 8-10 doctrinas del metodo (que ya existe / que falta).
- [ ] Precio y formato de la cohorte (6 sesiones, cupo 5).
- [ ] Fase 0 tecnica: OAuth message, CORS deploy, `yf doctor`.
