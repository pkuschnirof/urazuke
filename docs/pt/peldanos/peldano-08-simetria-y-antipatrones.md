# Passo 8 — Simetria entre produtor e consumidor, e o registro de antipadrões (contrato do degrau)

**Fase:** ciclo (cada mudança que toca um contrato entre duas partes).
**Forma:** automática no ciclo; mais um arquivo que cresce a cada tropeço.
**Tamanho:** a simetria é sempre obrigatória; o mapa produtor/consumidor é opcional num projeto
de um único módulo, e obrigatório assim que há uma tela e um servidor separados.

## Para que serve

Quando você muda uma ponta (o servidor, o robô, o esquema do banco), a outra ponta (a tela, o
contador, o consumidor) tem que mudar no mesmo commit. Se não, cedo ou tarde divergem, e o usuário
vê um número de um lado e outro número do outro (o caso 1.355 contra 1.234). E os erros que já
pagamos uma vez se anotam para não pagá-los duas vezes.

O princípio geral por trás: **toda lista tem um único dono**. As colunas de uma tabela, os estados
possíveis de uma ordem, as causas pelas quais algo espera: define-as uma única parte do sistema (o
produtor) e todas as demais as leem de lá. Assim que há duas cópias da mesma lista, uma das duas
está desatualizada; só falta saber qual.

## 1. Contexto necessário

- Um mapa de quais partes do sistema consomem o quê: que telas leem que serviços, que processos
  escrevem que tabelas. Se não existe, o primeiro prompt o constrói.
- O registro de antipadrões `docs/GOTCHAS.md`, ainda que vazio.

## 2. Prompts

**Para construir o mapa (uma vez):**

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

O que estamos pedindo: o inventário de contratos com seus dois lados, e a cláusula de completude na
sua forma para este degrau: o que não se vê se declara, não se omite. Um mapa com lacunas tapadas é
pior do que nenhum mapa.

**Rotina (vai no contrato de convivência):**

> Before closing any change that touches a contract, look up every consumer in the map and
> update them in the same commit. Always prefer that the producer defines the list (columns,
> causes, states) and the consumer reads it, rather than each keeping its own copy. If the map
> does not have that relationship, add it.

O que estamos pedindo: a simetria como reflexo (procurar o outro lado antes de fechar), a regra da
lista com um único dono, e que o mapa se mantenha sozinho à medida que se usa.

**Quando algo quebra pela segunda vez:**

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

O que estamos pedindo: o formato fixo de um antipadrão (cheiro, causa raiz, correção, detecção
precoce) e, o mais importante, a verificação automática: um antipadrão anotado e não automatizado
vai se repetir quando mudar a pessoa ou a sessão.

## 3. Resultado esperado

- `docs/PRODUCER_CONSUMER_MAP.md`: a lista de contratos com produtor e consumidores.
- Em cada commit que toca um contrato: os consumidores atualizados, nomeados na mensagem.
- `docs/GOTCHAS.md`: uma entrada por antipadrão, com as quatro partes (cheiro, causa raiz,
  correção, como detectá-lo antes), e a data da primeira vez.

## 4. Verificação de completude

- Escolha um contrato do mapa e peça ao agente que mostre onde cada consumidor o lê. Se algum tem
  sua própria cópia da lista, há dívida.
- Há um número que se mostre em duas telas diferentes? Compare: são iguais?
- Cada entrada do GOTCHAS tem as quatro partes?
- Repetiu-se algum erro que já estava no GOTCHAS? Se sim, falta a verificação automática.

## 5. Sinais de alerta

- O mesmo valor aparece escrito à mão em mais de um arquivo ("PENDENTE", "APROVADA" no servidor e
  na tela). Duas cópias; uma vai divergir.
- Uma mudança no servidor foi fechada com o teste do servidor em verde e ninguém tocou na tela.
- O GOTCHAS tem entradas sem a parte "como detectá-lo antes". São anedotas, não antipadrões.
