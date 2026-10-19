# Os contratos de degrau

Um arquivo por degrau. Todos têm o mesmo esqueleto, e o têm de propósito, para que você possa
compará-los e para que, com o tempo, o reflexo de lê-los seja automático: o cabeçalho com a fase,
o quando, a forma e o tamanho (obrigatório ou proporcional); para que serve; (1) o contexto
necessário, nomeado de forma genérica; (2) os prompts, **em inglês**, cada um precedido por um
bloco **"Antes de enviar o prompt"** (os arquivos e os insumos que você tem que ter prontos antes
de colá-lo, com o seu conteúdo e o seu estado mínimo), seguido da sua tradução e, abaixo, da
explicação do que estou pedindo ao modelo e por que cada cláusula está ali; (3) o resultado
esperado, com suas características; (4) a verificação de completude, que você faz sem
ler código; (5) os sinais de alerta, os sintomas de um degrau mal subido.

Os prompts em inglês são uma peça única, idêntica nas oito versões do documento;
`node build/build.mjs` os extrai para `prompts/` e verifica que nenhuma tradução os tenha
alterado. A tradução que acompanha cada prompt é para que você o entenda; ao modelo se cola o
inglês.

Eu os escrevi a partir do que fiz em três sistemas que hoje estão em produção, ainda não os
executei tal como estão. O primeiro projeto que os usar de ponta a ponta vai corrigir vários;
isso faz parte do degrau 23. Quando um contrato cita um caso real, faz isso com uma marca
`[Ref. N]` que leva ao [documento de referências](../REFERENCIAS.md); o procedimento fica limpo e
o detalhe continua a um clique.

| Degrau | Arquivo | Fase | Quando |
|---|---|---|---|
| 0 — Este projeto pode ser encarado assim? | `peldano-00-elegibilidad.md` | arranque | antes de tudo |
| 1 — O contrato de convivência | `peldano-01-contrato-de-convivencia.md` | arranque | depois da elegibilidade |
| 2 — Definição do projeto e leitura obrigatória | `peldano-02-definicion-y-lectura.md` | arranque | depois do contrato; mantém-se sempre |
| 3 — Dimensionar antes da arquitetura | `peldano-03-dimensionar.md` | arranque | depois da definição, antes do esqueleto |
| 4 — O esqueleto com suas comportas | `peldano-04-esqueleto.md` | arranque | fechamento do arranque |
| 5 — O plano são as pendências | `peldano-05-pendientes.md` | ciclo | ao abrir cada bloco; cada sessão |
| 6 — As decisões se escrevem junto ao código | `peldano-06-decisiones.md` | ciclo | cada vez que falta uma regra |
| 7 — Medir antes de construir | `peldano-07-medir.md` | ciclo | antes de construir sobre um número |
| 8 — Testes como cadeados, provados em vermelho | `peldano-08-tests-en-rojo.md` | ciclo | ao fechar cada pendência |
| 9 — Qualidade do código verificada por máquina | `peldano-09-calidad-de-codigo.md` | ciclo | monta-se ao abrir o primeiro bloco; roda em cada commit |
| 10 — Casos de teste manual junto com a funcionalidade | `peldano-10-casos-de-prueba-manual.md` | ciclo | com cada pendência; execução humana ao fechar cada bloco, na aceitação e depois de cada implantação |
| 11 — Simetria produtor/consumidor e antipadrões | `peldano-11-simetria-y-antipatrones.md` | ciclo | com cada mudança de contrato |
| 12 — Verificação honesta e relatório proporcional | `peldano-12-verificacion-honesta.md` | ciclo | em cada relatório |
| 13 — A auditoria periódica como insumo do plano | `peldano-13-auditoria.md` | saída para produção | antes da produção; depois, periódica |
| 14 — Fail-closed, cadeados e zero dano silencioso | `peldano-14-fail-closed.md` | saída para produção | antes de construir o que age sobre o mundo |
| 15 — Integração contínua, ambientes, segredos e implantação | `peldano-15-ci-entornos-secretos-deploy.md` | saída para produção | fechamento rumo à produção; rotina em cada implantação |
| 16 — Observabilidade e rastreabilidade totais, com nível configurável | `peldano-16-observabilidad-y-trazabilidad.md` | saída para produção | saída para produção, depois do 15 e antes do 19 |
| 17 — Otimização da camada de persistência | `peldano-17-persistencia.md` | saída para produção | saída para produção, depois do 16 e antes do 19; repete-se quando uma consulta sai de faixa |
| 18 — Varredura e solução de vulnerabilidades | `peldano-18-vulnerabilidades.md` | saída para produção | antes da primeira implantação; depois, em cada push e semanal |
| 19 — Testes de desempenho e ponto de ruptura | `peldano-19-rendimiento-y-punto-de-ruptura.md` | saída para produção | antes da primeira implantação; antes de cada implantação que mude arquitetura, persistência ou um fluxo crítico |
| 20 — Documentação viva e manuais sem IA | `peldano-20-documentacion-viva.md` | saída para produção | ao fechar cada bloco; completos antes da produção |
| 21 — Monitoramento de recursos e desempenho, relatório cíclico | `peldano-21-monitoreo-de-recursos-y-rendimiento.md` | operação | com a primeira implantação; depois, roda sozinho e se lê por ciclo |
| 22 — Monitoramento de erros, relatório cíclico | `peldano-22-monitoreo-de-errores.md` | operação | com a primeira implantação, junto com o 21 |
| 23 — O agente residente e a retrospectiva com número | `peldano-23-agente-residente-y-retrospectiva.md` | operação | ao entrar em operação; ao fechar cada etapa |

Fases: **arranque** se sobe uma vez por projeto; **ciclo** se repete a cada mudança; **operação**
quando o sistema já está vivo. O 23 volta ao 0 para o projeto seguinte. A linha do tempo
completa, com o que acontece entre degrau e degrau, está na Parte B do documento principal. Os
nomes dos arquivos ficam em espanhol em todos os idiomas para que as ferramentas de build os
reconheçam.
