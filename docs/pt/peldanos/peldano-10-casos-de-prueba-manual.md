# Passo 10 — Os casos de teste manual se escrevem junto com a funcionalidade, e quem os executa são pessoas (contrato do degrau)

**Fase:** ciclo.
**Quando:** com cada pendência, ao fechá-la, depois do teste em vermelho (8) e da qualidade (9):
o agente escreve os casos de teste manual do fluxo que tocou. Executam-se por pessoas em três
momentos: no fechamento de cada bloco (os testes humanos), antes da primeira implantação em
produção (os testes de aceitação com o dono), e depois de cada implantação, numa passada de
somente leitura. Cada execução que falha reinjeta um requisito no ciclo como pendência corretiva.
**Forma:** rotina de cada pendência; depois, execução humana por ciclo.
**Tamanho:** obrigatório em todo projeto com usuários: o caso de teste manual é o único teste que
o modelo não escreve nem roda.

## Para que serve

O método tem provas automáticas de sobra: o teste em vermelho, a regressão, a ponta a ponta em
três escalas. Todas as escreve e as roda o modelo, e todas provam o que o modelo entendeu. Falta
a prova que faz uma pessoa com os próprios olhos e as próprias mãos, seguindo um roteiro escrito,
e que encontra o que nenhum teste encontra: o botão que está onde não deve, a mensagem que não se
entende, o fluxo que tecnicamente anda e humanamente não serve. A vista humana e os testes
humanos já estavam na linha do tempo; o que faltava era que tivessem **roteiro**, e que o roteiro
fosse escrito por quem construiu a funcionalidade, no mesmo momento, a partir dos critérios de
aceitação da pendência. Sem roteiro, o teste humano é "brinque um pouco com o sistema", e o que
se encontra depende do humor do dia. Com roteiro, executa-se igual a cada vez, registra-se o que
aconteceu, e o que falha volta ao ciclo como requisito. É o fechamento do circuito que o gráfico
do processo mostra: a execução manual dos casos de teste reinjeta requisitos no desenvolvimento.

Um caso de teste manual tem sempre a mesma forma: um identificador; a pendência que o origina; a
precondição (o que tem que existir antes: um paciente, uma consulta de ontem); os passos,
numerados, cada um com o que a pessoa faz e o que tem que ver; o resultado esperado no final,
incluído o efeito no backend que uma pessoa pode verificar (um registro que aparece, uma mensagem
na caixa falsa); os dados de teste a usar; e o espaço para o resultado de cada execução: data,
quem, passou ou falhou, observação.

**Se você está começando.** Um *caso de teste manual* é uma receita para que uma pessoa prove uma
funcionalidade: o que preparar, o que fazer passo a passo, e o que tem que acontecer em cada
passo. Escreve-se para que qualquer um a siga igual, sem saber como o sistema está feito.
*Executar* um caso é seguir a receita e anotar se passou ou falhou. *Precondição* é o que tem que
existir antes de começar. E *reinjetar* quer dizer que o que a pessoa encontrou de errado volta à
lista de pendências como um pedido novo, com as palavras dela.

## 1. Contexto necessário

O que segue é a lista genérica. Os arquivos concretos que você tem que ter prontos antes de cada
prompt, com o seu conteúdo e o seu estado mínimo, estão na seção 2, no bloco "Antes de enviar o
prompt" que precede cada um.

- A pendência que se está fechando, com os seus critérios de aceitação "dado, quando, então"
  (degrau 5): são a matéria-prima do caso.
- O ambiente de teste com dados, para que os passos se possam seguir de verdade.
- Quem vai executar os casos (o dono, um usuário de confiança) e quando (fechamento de bloco,
  aceitação, depois de cada implantação).

## 2. Prompts

**Rotina de cada pendência (vai no contrato de convivência):**

**Antes de enviar o prompt**, isto tem que existir, e você o faz (ou o negócio com você), não o
agente:

- A pendência com os seus critérios de aceitação em `docs/PENDING.md` (degrau 5), já construída e
  com o teste em vermelho e a qualidade em verde (degraus 8 e 9).
- `docs/MANUAL_TESTS.md` criado, ainda que vazio, com o formato do caso no cabeçalho:
  identificador, pendência, precondição, passos (ação e resultado visível), resultado esperado
  com o efeito no backend verificável por uma pessoa, dados de teste, e a tabela de execuções
  (data, quem, passou ou falhou, observação).
- A decisão de quem executa e quando, escrita em `PROJECT.md` ou no contrato: para um projeto
  pequeno, o dono no fechamento de cada bloco e antes da primeira implantação.
- `docs/WORKING_AGREEMENT.md`, onde vai a rotina.
- Estado mínimo aceitável: o arquivo existe com o seu formato e a pendência tem critérios de
  aceitação.

> Every pending item that changes what a user sees or does is closed with its manual test cases
> written in `docs/MANUAL_TESTS.md`, derived from its acceptance criteria: one case per flow the
> item touches, with an id, the pending item, the precondition, the numbered steps (what the
> person does and what they must see), the expected result including a backend effect a person
> can verify without tools, the test data to use, and an empty execution table (date, who,
> passed or failed, observation). Write them for a person who does not know how the system is
> built. Keep the cases of closed items up to date: when a flow changes, its cases change in the
> same commit. Never mark a case as executed yourself: execution is human.

> [pt]
> Toda pendência que mude o que um usuário vê ou faz se fecha com os seus casos de teste manual
> escritos em `docs/MANUAL_TESTS.md`, derivados dos seus critérios de aceitação: um caso por
> fluxo que a pendência toca, com um identificador, a pendência, a precondição, os passos
> numerados (o que a pessoa faz e o que tem que ver), o resultado esperado incluindo um efeito no
> backend que uma pessoa possa verificar sem ferramentas, os dados de teste a usar, e uma tabela
> de execuções vazia (data, quem, passou ou falhou, observação). Escreva-os para uma pessoa que
> não sabe como o sistema está feito. Mantenha em dia os casos das pendências fechadas: quando um
> fluxo muda, os seus casos mudam no mesmo commit. Nunca marque um caso como executado você
> mesmo: a execução é humana.

O que estou pedindo: que o caso saia dos critérios de aceitação (assim prova o que se pediu, não
o que o modelo entendeu); que esteja escrito para alguém que não sabe como o sistema funciona,
que é a diferença entre um caso de teste e uma nota técnica; que inclua o efeito no backend
verificável por uma pessoa, para que o teste manual também olhe do outro lado da tela; que os
casos se mantenham no mesmo commit, igual que a documentação; e **que o modelo nunca os execute**,
porque executados pelo modelo são mais um teste, e a graça é que os execute uma pessoa.

**Para uma execução (fechamento de bloco, aceitação, depois de uma implantação):**

**Antes de enviar o prompt**, você tem que ter isto à mão:

- A execução feita: uma pessoa seguiu os casos de `docs/MANUAL_TESTS.md` no ambiente de teste (ou
  em produção, em somente leitura, depois de uma implantação) e anotou na tabela de cada caso a
  data, quem, passou ou falhou, e a observação. Isto a pessoa faz à mão, antes de colar o prompt;
  o agente não o faz.
- As observações soltas que não cabem em nenhum caso (o que incomodou, o que não se entendeu),
  anotadas no final do arquivo com data.
- Estado mínimo aceitável: todos os casos do alcance têm resultado de hoje, ainda que seja "não
  se pôde executar" com a razão.

> Read the executions of today in `docs/MANUAL_TESTS.md`. For every case that failed, and for
> every loose observation at the end of the file, open a corrective pending item in
> `docs/PENDING.md` with the person's words as the way to reproduce it, hanging from the node of
> the semantic tree it touches; do not fix anything now. For every case that passed, nothing. Then
> tell me, flow by flow, how many cases passed and how many failed, compared with the previous
> execution, and which failures repeat. If a case could not be executed, tell me why and whether
> the case or the system is the problem. Reply in my language.

> [pt]
> Leia as execuções de hoje em `docs/MANUAL_TESTS.md`. Por cada caso que falhou, e por cada
> observação solta no final do arquivo, abra uma pendência corretiva em `docs/PENDING.md` com as
> palavras da pessoa como forma de reproduzi-lo, pendurada no nó da árvore semântica que toca;
> não conserte nada agora. Por cada caso que passou, nada. Depois diga-me, fluxo por fluxo,
> quantos casos passaram e quantos falharam, comparado com a execução anterior, e que falhas se
> repetem. Se um caso não se pôde executar, diga-me por quê e se o problema é o caso ou o
> sistema. Responda no meu idioma.

O que estou pedindo: a reinjeção feita operativa: cada falha humana é uma pendência corretiva,
com as palavras da pessoa (não as do modelo) como reprodução, e pendurada na árvore; a comparação
com a execução anterior, que é o que diz a você se o sistema melhora ou se degrada entre blocos;
e a distinção entre "o caso está mal escrito" e "o sistema está mal", que são duas pendências
diferentes.

## 3. Resultado esperado

- `docs/MANUAL_TESTS.md` com um caso por fluxo tocado por cada pendência fechada, no formato,
  escrito para uma pessoa.
- As execuções registradas, com data e quem, em cada ciclo.
- Uma pendência corretiva por cada falha e por cada observação.
- A rotina no contrato.

## 4. Verificação de completude (você a faz, sem ler código)

- Pegue um caso ao acaso e siga-o você mesmo no ambiente de teste sem perguntar nada ao agente:
  conseguiu? Se teve que perguntar, o caso não está escrito para uma pessoa.
- Cada pendência fechada que toca uma tela tem o seu caso? Peça a lista de pendências sem caso.
- O caso diz que efeito verificar do outro lado da tela, e como uma pessoa o verifica?
- A última execução tem data e nome em cada caso? Há algum "passou" sem data?
- Cada falha da última execução tem a sua pendência, com as palavras da pessoa?

## 5. Sinais de alerta

- O agente marcou os casos como executados. Executou-os ele, que é o mesmo que não executá-los.
- Os casos são cópias do teste automático em prosa. Um caso manual tem que olhar o que o teste
  não olha: o que se vê, o que se entende, o que incomoda.
- Todos os casos passam em todas as execuções. As pessoas encontram coisas sempre; se não
  encontram nada, não estão seguindo o roteiro ou o roteiro não pede que se olhe.
- As falhas se "consertam" na hora, sem pendência. Perdem-se as palavras da pessoa e o rastro do
  que se repetiu.
