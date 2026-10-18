# Passo 8 — Simetria entre produtor e consumidor, e o registro de antipadrões (contrato do degrau)

**Fase:** ciclo.
**Quando:** com cada pendência que toca um contrato entre duas partes do sistema. O mapa de
contratos se constrói ao abrir o segundo bloco funcional, quando já há tela e servidor. O
registro de antipadrões cresce cada vez que algo quebra pela segunda vez.
**Forma:** automática dentro do ciclo; mais um arquivo que cresce com cada tropeço.
**Tamanho:** a simetria é obrigatória sempre; o mapa produtor/consumidor é opcional num projeto
de um único módulo, e obrigatório assim que há uma tela e um servidor separados.

## Para que serve

Quando você muda uma ponta (o servidor, o robô, o esquema do banco), faça com que a outra ponta
(a tela, o contador, o consumidor) mude no mesmo commit. Se não, cedo ou tarde divergem, e o
usuário vê um número de um lado e outro número do outro [Ref. 26](../REFERENCIAS.md#ref-26). E os
erros que você já pagou uma vez, anote-os para não pagá-los duas vezes
[Ref. 2](../REFERENCIAS.md#ref-2).

O princípio geral por trás, que impus no Plano de Saúde e que vale para todo sistema
[Ref. 27](../REFERENCIAS.md#ref-27): **toda lista tem um único dono**. As colunas de uma tabela,
os estados possíveis de uma ordem, as causas pelas quais algo espera: define-as uma única parte
do sistema (o produtor) e todas as demais as leem dali. Assim que há duas cópias da mesma lista,
uma está desatualizada; só falta saber qual. A árvore semântica do degrau 2 é o primeiro lugar
onde essas listas se declaram: os estados de uma entidade estão ali, e o código tem que lê-los
de uma única fonte.

## 1. Contexto necessário

O que segue é a lista genérica. Os arquivos concretos que você tem que ter prontos antes de cada
prompt, com seu conteúdo e seu estado mínimo, estão na seção 2, no bloco "Antes de enviar o
prompt" que precede cada um.

- Um mapa de que partes do sistema consomem o quê: que telas leem que serviços, que processos
  escrevem que tabelas. Se não existe, o primeiro prompt o constrói.
- O registro de antipadrões `docs/GOTCHAS.md`, mesmo que vazio.

## 2. Prompts

**Para construir o mapa (uma vez):**

**Antes de enviar o prompt**, isto tem que existir, e quem faz é você (ou o negócio com você), não
o agente:

- O sistema com pelo menos um bloco funcional construído: sem contratos entre partes não há mapa a
  fazer.
- `docs/SEMANTIC_TREE.md` em dia: as listas (estados, tipos, causas) estão declaradas ali, e o
  mapa tem que coincidir com a árvore.
- Uma lista escrita por você das partes que vivem fora do repositório e que produzem ou consomem
  algo do sistema (um robô, uma planilha que lê o banco, um processo de outra equipe), para que o
  agente as coloque no mapa mesmo que não as veja. Se não há nenhuma, diga.
- Estado mínimo aceitável: o agente consegue ler todo o repositório, e você lhe disse o que há
  fora.

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

> [pt]
> Construa `docs/PRODUCER_CONSUMER_MAP.md`: para cada contrato do sistema (um serviço, uma
> tabela, um formato de arquivo, uma lista de valores), quem o produz e quem o consome. Se há
> partes do sistema que você não consegue acessar ou que não entende, diga-me em vez de
> deixá-las fora do mapa. Responda no meu idioma.

O que estou pedindo: o inventário de contratos com seus dois lados, e a cláusula de completude na
sua forma para este degrau: o que não se vê se declara, não se omite. Um mapa com buracos
escondidos é pior do que nenhum mapa.

**Rotina (vai no contrato de convivência):**

**Antes de enviar o prompt**, você tem que ter isto à mão:

- `docs/PRODUCER_CONSUMER_MAP.md`, construído e revisado por você: escolha um contrato e verifique
  que os dois lados são os que você conhece.
- `docs/WORKING_AGREEMENT.md`, onde vai a rotina.
- Estado mínimo aceitável: o mapa existe e tem pelo menos os contratos do primeiro bloco.

> Before closing any change that touches a contract, look up every consumer in the map and
> update them in the same commit. Always prefer that the producer defines the list (columns,
> causes, states) and the consumer reads it, rather than each keeping its own copy. If the map
> does not have that relationship, add it.

> [pt]
> Antes de fechar qualquer mudança que toque um contrato, procure no mapa cada consumidor e
> atualize-os no mesmo commit. Prefira sempre que o produtor defina a lista (colunas, causas,
> estados) e o consumidor a leia, em vez de cada um ter sua cópia. Se o mapa não tem essa
> relação, acrescente-a.

O que estou pedindo: a simetria como reflexo (procurar o outro lado antes de fechar), a regra da
lista com um único dono, e que o mapa se mantenha sozinho à medida que se usa.

**Quando algo quebra pela segunda vez:**

**Antes de enviar o prompt**, você tem que ter isto à mão:

- A evidência de que é a segunda vez: a pendência ou o commit da primeira, localizado por você
  (procure nas pendências fechadas de `docs/PENDING.md`), para colá-lo junto com o prompt. Sem
  essa referência, o agente vai registrar um antipadrão genérico que não serve para detectar nada.
- `docs/GOTCHAS.md`, criado mesmo que esteja vazio, com o formato no cabeçalho: cheiro, causa
  raiz, correção, como detectá-lo antes.
- Estado mínimo aceitável: você consegue nomear a primeira vez com data ou com número de
  pendência.

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

> [pt]
> Isto já nos aconteceu. Registre em `docs/GOTCHAS.md` com: como cheira (o sinal precoce), a
> causa raiz, a correção, e como detectá-lo da próxima vez antes que doa. E acrescente, se
> possível, um teste ou uma verificação automática que o detecte.

O que estou pedindo: o formato fixo de um antipadrão (cheiro, causa raiz, correção, detecção
precoce) e, sobretudo, a verificação automática: um antipadrão anotado e não automatizado vai se
repetir quando mudar a pessoa ou a sessão.

## 3. Resultado esperado

- `docs/PRODUCER_CONSUMER_MAP.md`: a lista de contratos com produtor e consumidores.
- Em cada commit que toca um contrato: os consumidores atualizados, nomeados na mensagem.
- `docs/GOTCHAS.md`: uma entrada por antipadrão, com as quatro partes (cheiro, causa raiz,
  correção, como detectá-lo antes), e a data da primeira vez.

## 4. Verificação de completude

- Escolha um contrato do mapa e peça ao agente que lhe mostre onde cada consumidor o lê. Se
  algum tem sua própria cópia da lista, há dívida.
- Há um número que se mostra em duas telas diferentes? Compare: dão o mesmo?
- Cada entrada de GOTCHAS tem as quatro partes?
- Repetiu-se um erro que já estava em GOTCHAS? Se sim, falta a verificação automática.

## 5. Sinais de alerta

- O mesmo valor aparece escrito à mão em mais de um arquivo ("PENDENTE", "APROVADA" no servidor
  e na tela). Duas cópias; uma vai divergir.
- Uma mudança no servidor foi fechada com o teste do servidor em verde e ninguém tocou na tela.
- GOTCHAS tem entradas sem a parte "como detectá-lo antes". São anedotas, não antipadrões.
