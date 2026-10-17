# Os contratos de degrau

Um arquivo por degrau. Cada um tem o mesmo esqueleto: o cabeçalho com fase, forma e tamanho
(obrigatório ou proporcional); para que serve; (1) contexto necessário, nomeado de forma genérica;
(2) os prompts, **em inglês**, cada um seguido da explicação no idioma do leitor sobre o que
estamos pedindo e por que cada cláusula está ali; (3) o resultado esperado, com suas
características; (4) a verificação de completude, que o dono faz sem ler código; (5) os sinais de
alerta, os sintomas de que o degrau foi subido mal.

Os prompts em inglês são uma peça única, idêntica em todas as versões do documento nos oito
idiomas; `node build/build.mjs` os extrai para `prompts/` e verifica que nenhuma tradução os tenha
alterado.

Estão escritos a partir do que fizemos nos três repositórios, ainda não executados tal como
estão. O primeiro projeto que os usar de ponta a ponta vai corrigir vários: isso faz parte do
degrau 15.

| Degrau | Arquivo | Fase | Forma |
|---|---|---|---|
| 0 — Este projeto pode ser encarado assim? | `peldano-00-elegibilidad.md` | arranque | conversa (em elaboração com Pablo) |
| 1 — O contrato de convivência | `peldano-01-contrato-de-convivencia.md` | arranque | um disparo + ajuste |
| 2 — Definição do projeto e leitura obrigatória | `peldano-02-definicion-y-lectura.md` | arranque | conversa |
| 3 — Dimensionar antes da arquitetura | `peldano-03-dimensionar.md` | arranque | conversa |
| 4 — O esqueleto com suas comportas | `peldano-04-esqueleto.md` | arranque | um disparo longo + aprovação visual |
| 5 — O plano são as pendências | `peldano-05-pendientes.md` | ciclo | um disparo + rotina |
| 6 — As decisões se escrevem junto ao código | `peldano-06-decisiones.md` | ciclo | conversa curta, toda vez |
| 7 — Testes como cadeados, provados em vermelho | `peldano-07-tests-en-rojo.md` | ciclo | rotina de cada mudança |
| 8 — Simetria produtor/consumidor e antipadrões | `peldano-08-simetria-y-antipatrones.md` | ciclo | automática + um arquivo que cresce |
| 9 — Medir antes de construir | `peldano-09-medir.md` | ciclo | um disparo por medição |
| 10 — Verificação honesta e relatório proporcional | `peldano-10-verificacion-honesta.md` | ciclo | rotina de todo relatório |
| 11 — A auditoria periódica como insumo do plano | `peldano-11-auditoria.md` | operação | um disparo longo, auditor diferente |
| 12 — Fail-closed, cadeados e zero dano silencioso | `peldano-12-fail-closed.md` | operação | conversa |
| 13 — Integração contínua, ambientes, segredos e implantação | `peldano-13-ci-entornos-secretos-deploy.md` | operação | um disparo + rotina de implantação |
| 14 — Documentação viva e manuais sem IA | `peldano-14-documentacion-viva.md` | operação | rotina + um disparo longo |
| 15 — O agente residente e a retrospectiva com números | `peldano-15-agente-residente-y-retrospectiva.md` | operação e encerramento | duas partes |

Fases: **arranque** se sobe uma vez por projeto; **ciclo** se repete a cada mudança; **operação**
quando o sistema já está vivo. O 15 volta ao 0 para o próximo projeto. Os nomes dos arquivos ficam
em espanhol em todos os idiomas para que as ferramentas de build os reconheçam.
