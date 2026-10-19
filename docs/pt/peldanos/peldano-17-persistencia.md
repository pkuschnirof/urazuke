# Passo 17 — Otimização da camada de persistência, medida antes e depois (contrato do degrau)

**Fase:** saída para produção.
**Quando:** na fase de saída para produção, depois do 16 (é preciso ver as consultas para
medi-las) e antes do 19 (os testes de desempenho se rodam sobre a persistência já otimizada; se
não, medem o problema que já se conhecia). Repete-se quando um bloco acrescenta uma tabela grande
ou muda um fluxo crítico, e quando o monitoramento (21) mostra uma consulta fora de faixa. Num
legado, as medições saem de N6 e a maior parte do que se encontra se paga "ao tocar", salvo o que
já está fora de faixa.
**Forma:** dois disparos: medir e propor; aplicar com antes e depois.
**Tamanho:** proporcional: num projeto pequeno, os índices das consultas reais e o fim dos laços
N+1; num com consequências, completo, com orçamentos por caminho.

## Para que serve

A camada de persistência é onde os sistemas morrem devagar: funcionam bem com cem registros,
aceitavelmente com dez mil, e aos cem mil cada tela demora vinte segundos, e ninguém sabe quando
começou. Este degrau existe para que isso se decida com números e antes da produção, não com
reclamações e depois. E para que se decida **com o método do degrau 7**: cada consulta que o
sistema faz se conta e se cronometra com um medidor que tem teste, muda-se o que os números
dizem, e mede-se de novo sobre os mesmos dados. A primeira auditoria de consultas sem índice
sobre um sistema vivo [Ref. 18](../REFERENCIAS.md#ref-18) e o orçamento de consultas apertado ao
medido [Ref. 37](../REFERENCIAS.md#ref-37) são a origem deste degrau; a decisão da interface
assíncrona desde a linha um [Ref. 15](../REFERENCIAS.md#ref-15), o seu antecedente no arranque.

O que não é: não é "reescrever o acesso a dados", nem escolher outro motor. Isso foi decidido
pelo degrau 3. É ajustar o que há (índices, paginação, lotes, retenção, tamanho do pool) a partir
do que as consultas reais fazem.

**Se você está começando.** A *camada de persistência* é a parte do sistema que guarda e lê os
dados, quase sempre um banco de dados. Um *índice* é como o índice de um livro: sem ele, para
encontrar um turno o banco lê a tabela inteira (isso é um *full scan*); com ele, vai direto. Um
*laço N+1* é um erro muito comum: para mostrar cem turnos, o sistema faz uma consulta para a
lista e depois mais cem consultas, uma por turno, em vez de uma só. *Paginação* é mostrar de
vinte em vinte em vez de tudo junto. *Retenção* é quanto tempo se guarda cada dado antes de
arquivá-lo ou apagá-lo. E o *pool de conexões* é a quantidade de "linhas abertas" que o sistema
mantém com o banco ao mesmo tempo. Nada disto exige que você leia código: exige que você olhe
números antes e depois.

## 1. Contexto necessário

O que segue é a lista genérica. Os arquivos concretos que você tem que ter prontos antes de cada
prompt, com seu conteúdo e seu estado mínimo, estão na seção 2, no bloco "Antes de enviar o
prompt" que precede cada um.

- O dimensionamento e a volumetria (degrau 3, ou N6 num legado): os volumes aos quais é preciso
  medir.
- O mapa produtor-consumidor (degrau 11): o que consome cada tabela.
- A observabilidade (16): cada consulta visível com o seu tempo.
- O ambiente de teste carregado com dados ao volume esperado.

## 2. Prompts

**Inicial (medir e propor):**

**Antes de enviar o prompt**, isto tem que existir, e quem faz é você (ou o negócio com você), não
o agente:

- `docs/SIZING.md` e `docs/VOLUME_SURVEY.md` (degrau 3 ou N6), fechados: os volumes a carregar.
- O ambiente de teste com dados **ao volume esperado**, não com dez registros de exemplo. Se há
  um sistema anterior ou produção, uma cópia anonimizada; se é um projeto novo, peça ao agente
  que gere dados sintéticos com a forma da árvore semântica e os volumes do dimensionamento, e
  que o deixe como script no repositório. Isto é uma pendência prévia, não parte deste prompt.
- `docs/PRODUCER_CONSUMER_MAP.md` (degrau 11), em dia.
- Se há produção: acesso de somente leitura, com a credencial fora do chat, para medir sobre
  dados reais além dos de teste.
- Um caso conhecido para o teste de cada medidor (uma tabela cuja quantidade de linhas você
  sabe).
- Estado mínimo aceitável: o ambiente de teste tem os volumes do dimensionamento e o agente
  consegue ver cada consulta com o seu tempo (degrau 16).

> We are going to optimize the persistence layer with measurements, not opinions. Read
> `docs/SIZING.md`, `docs/VOLUME_SURVEY.md` and `docs/PRODUCER_CONSUMER_MAP.md`. With the test
> environment loaded at the volumes of the sizing (and, if I gave you access, production
> read-only), measure first, with meters that live in the repository and have a test against a
> known case: every query the system runs per screen and per job, with its count and its time;
> the queries that read whole tables; the ones that run once per item; the size and monthly growth
> of every table; the connection pool usage at the peak. Audit each meter in both directions. Show
> me the numbers with the commands that produce them. Then propose, query by query, what to
> change: indexes derived from the real queries, pagination, batching, the elimination of N+1
> loops, retention and archiving per table, pool size; for each change, the expected gain, the
> risk, and which consumers in the map it touches. Do not change anything yet: I approve the list.
> Reply in my language.

> [pt]
> Vamos otimizar a camada de persistência com medições, não com opiniões. Leia `docs/SIZING.md`,
> `docs/VOLUME_SURVEY.md` e `docs/PRODUCER_CONSUMER_MAP.md`. Com o ambiente de teste carregado
> aos volumes do dimensionamento (e, se eu lhe dei acesso, produção em somente leitura), meça
> primeiro, com medidores que vivem no repositório e têm um teste contra um caso conhecido: cada
> consulta que o sistema roda por tela e por tarefa, com a sua quantidade e o seu tempo; as
> consultas que leem tabelas inteiras; as que rodam uma vez por item; o tamanho e o crescimento
> mensal de cada tabela; o uso do pool de conexões no pico. Audite cada medidor nas duas
> direções. Mostre-me os números com os comandos que os produzem. Depois proponha, consulta por
> consulta, o que mudar: índices derivados das consultas reais, paginação, lotes, a eliminação
> dos laços N+1, retenção e arquivamento por tabela, tamanho do pool; para cada mudança, o ganho
> esperado, o risco, e que consumidores do mapa ela toca. Não mude nada ainda: eu aprovo a lista.
> Responda no meu idioma.

O que estou pedindo: medir com o método do degrau 7 (medidor com teste, auditado nas duas
direções, número com comando) antes de propor; propor consulta por consulta, com o ganho e o
risco, e com os consumidores do mapa que cada mudança toca (um índice novo não toca ninguém; uma
retenção por tabela toca todos os que leem essa tabela); e **não mudar nada até que eu aprove**,
porque a otimização é o lugar onde mais se "melhora" o que ninguém pediu.

**De fechamento (aplicar com antes e depois):**

**Antes de enviar o prompt**, você tem que ter isto à mão:

- A lista de mudanças propostas, lida, com a sua aprovação ou recusa para cada uma; as recusadas,
  com razão de uma linha. Para as que tocam consumidores do mapa, a confirmação de que você
  entende o que muda para eles.
- Uma conta refeita à mão sobre um número da medição (linhas por mês da tabela maior, por
  exemplo), que coincide.
- Estado mínimo aceitável: cada mudança tem veredicto e você entende que consumidor ela toca.

> Apply the approved changes [list], one commit each. For each one show me the meter before and
> after on the same data, the regression suite green, and the end-to-end suite green. Set a budget
> per critical path (queries and time) at the measured value plus a small margin, protected by a
> test that fails if it is exceeded. Update every consumer in the map that a change touches, in
> the same commit. Record the before and after table, the budgets and the retention per table in
> `docs/PERSISTENCE.md`.

> [pt]
> Aplique as mudanças aprovadas [lista], um commit cada uma. Para cada uma mostre-me o medidor
> antes e depois sobre os mesmos dados, a regressão em verde, e a bateria de ponta a ponta em
> verde. Fixe um orçamento por caminho crítico (consultas e tempo) no valor medido mais uma
> margem pequena, protegido por um teste que falhe se for ultrapassado. Atualize no mesmo commit
> cada consumidor do mapa que uma mudança toque. Registre a tabela de antes e depois, os
> orçamentos e a retenção por tabela em `docs/PERSISTENCE.md`.

O que estou pedindo: um commit por mudança, para que o antes e o depois sejam atribuíveis; o
mesmo medidor sobre os mesmos dados (se os dados mudam, o número não diz nada); o orçamento com
teste, que é o que impede que o laço N+1 volte em três meses; e a simetria do degrau 11 aplicada à
persistência.

## 3. Resultado esperado

- Os medidores de consultas no repositório, com teste.
- `docs/PERSISTENCE.md` com a tabela de antes e depois por mudança, os orçamentos por caminho e a
  retenção por tabela.
- Os índices, a paginação, os lotes e a retenção aplicados, um commit cada um, com a regressão e
  a ponta a ponta em verde.
- Um teste por orçamento que falha se for ultrapassado.

## 4. Verificação de completude

- Rode você um medidor antes e depois (o agente lhe dá os dois comandos): coincidem com a tabela?
- Há alguma consulta que leia uma tabela inteira num fluxo crítico? Por que ficou?
- Cada tabela tem uma política de retenção escrita, ainda que seja "para sempre"?
- Os orçamentos têm teste? Peça-lhe que ultrapasse um de propósito e lhe mostre o vermelho.
- A tela mais lenta, com os dados ao volume, demora o que o dimensionamento esperava?

## 5. Sinais de alerta

- As medições foram feitas com os dados de exemplo do esqueleto. Tudo é rápido com dez linhas.
- O agente propõe "migrar para outro banco" ou "reescrever a camada de dados". Isso é o degrau 3,
  e se for preciso voltar a ele é uma decisão sua, não uma otimização.
- Melhorou o número mas a ponta a ponta de um fluxo deixou de passar. Um índice não quebra um
  fluxo; uma retenção ou uma paginação sim: faltou um consumidor do mapa.
- Não há orçamentos. Sem orçamento, a otimização dura até o próximo bloco.
