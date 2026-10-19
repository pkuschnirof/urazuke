# Passo 2 — A definição do projeto, a árvore semântica e a leitura obrigatória (contrato do degrau)

**Fase:** arranque.
**Quando:** escreve-se uma vez, depois do contrato; a árvore semântica e o
estado vivo se mantêm em dia durante todo o projeto, com cada bloco e cada decisão nova.
**Forma:** conversa: o agente redige, pergunta o que falta, você corrige.
**Tamanho:** obrigatório em todo projeto. Num pequeno, o arquivo de projeto pode ter cinquenta
linhas e a árvore semântica vinte nós; o que não podem é não existir.

## Para que serve

Cada sessão do agente começa do zero: ele não se lembra de ontem. Dê a ele um mapa, curto, que
diga o que é o projeto, em que estado está e que decisões já foram tomadas, e obrigue-o a lê-lo
antes de tocar em qualquer coisa. A falha que evita é dupla: trabalho descartável por não ler o
mapa [Ref. 9](../REFERENCIAS.md#ref-9), e o mapa que cresce até se tornar ilegível
[Ref. 41](../REFERENCIAS.md#ref-41). A regra prática: **o arquivo de projeto é o programa, não o
histórico**. O que aconteceu vai para outro lugar.

O mapa tem duas peças, e a segunda é a que mais trabalho faz. A primeira é o arquivo de projeto:
o que é o sistema, para quem, o que NÃO é, as decisões tomadas. A segunda é a **árvore
semântica**: o sistema decomposto como uma árvore, com os domínios, e abaixo de cada um seus
atores, seus processos (os casos de uso), suas entidades com seus estados, suas telas e suas
integrações; e de cada nó pendem as pendências e as decisões que o tocam. A árvore sai do
levantamento que você fez com os métodos clássicos da engenharia de requisitos (entrevistas,
casos de uso, modelo de domínio), o agente a constrói, você a corrige, e é o que dá ao modelo o
contexto exato do nó que vai tocar sem ter que ler todo o projeto. E é o que permite a você
verificar, sem ler código, que o sistema que o agente entende é o que o negócio pediu.

## 1. Contexto necessário

O que segue é a lista genérica. Os arquivos concretos que você tem que ter prontos antes de cada
prompt, com seu conteúdo e seu estado mínimo, estão na seção 2, no bloco "Antes de enviar o
prompt" que precede cada um.

- Levantamento do negócio: o que o cliente faz, quem usa o sistema, que problema resolve, o que
  não tem que fazer. Com as entrevistas, os casos de uso ou histórias de usuário que você puder
  nomear, e as entidades do negócio com seus estados, mesmo que incompletos.
- O contrato de convivência (degrau 1).
- Se existe um sistema anterior: acesso de leitura ao seu código ou à sua documentação.
- As decisões já tomadas, se houver, mesmo que de boca.

## 2. Prompts

**Inicial:**

**Antes de enviar o prompt**, isto tem que existir, e quem faz é você (ou o negócio com você), não
o agente:

- `docs/INITIAL_SURVEY.md` (degrau 0), completado com o levantamento do negócio. Você o escreve a
  partir das entrevistas da ingestão; se usou um método (entrevistas, casos de uso, histórias de
  usuário, protótipos de tela), diga qual e cole o resultado. Tem que ter: o que o cliente faz;
  quem usa o sistema (os atores, com nome de papel); que problema resolve; o que NÃO tem que
  fazer, numa seção própria, mesmo que tenha dois itens; os casos de uso ou histórias de usuário
  que o dono nomeia, com as palavras dele, mesmo que sejam dez linhas; as entidades do negócio com
  seus estados ("uma consulta está pendente, confirmada, cancelada"), mesmo que estejam
  incompletas; os desenhos ou as fotos das telas, se houver; as integrações externas (mensagens,
  pagamentos, outro sistema); e as decisões já tomadas, mesmo que tenham sido de palavra, com data
  e quem as tomou.
- `docs/WORKING_AGREEMENT.md` (degrau 1), fechado com data e versão.
- Se existe um sistema anterior: acesso de leitura ao seu código ou à sua documentação, com o
  caminho ou o link anotado no levantamento.
- Estado mínimo aceitável: o levantamento tem a seção "o que NÃO é" com pelo menos dois itens,
  pelo menos um caso de uso com as palavras do dono, e pelo menos uma entidade com seus estados.
  Sem isso, a árvore que sair vai ser inventada, e você não vai ter com que compará-la.

> We are going to define the project in writing. Read the business survey in
> `docs/INITIAL_SURVEY.md` and the working agreement in `docs/WORKING_AGREEMENT.md`. Evaluate
> whether the survey is sufficient to describe the system, its users, its domain and its
> boundaries; if it is not, ask me for what is missing before writing anything. Then write two
> things. First, `PROJECT.md`, three hundred lines at most, with: what the system is and for
> whom; what it is NOT; the main modules as a list; the decisions already made, each with its
> date; and the instruction to read this file and the semantic tree at the start of every
> session. Second, `docs/SEMANTIC_TREE.md`: the system as a tree, with the domains at the top
> level and, under each one, its actors, its processes (the use cases, each with actor, trigger,
> steps, outcome and exceptions), its entities with their attributes, states and transitions,
> its screens, and its external integrations. Mark every node you inferred rather than read in
> the survey, so that I can confirm or correct it. Separately, create `docs/STATUS.md` for the
> living state (what is being worked on, what is open): that file changes every day; the other
> two change only when the system changes. Reply in my language.

> [pt]
> Vamos definir o projeto por escrito. Leia o levantamento do negócio em
> `docs/INITIAL_SURVEY.md` e o contrato de convivência em `docs/WORKING_AGREEMENT.md`. Avalie se
> o levantamento basta para descrever o sistema, seus usuários, seu domínio e seus limites; se
> não bastar, peça-me o que falta antes de escrever qualquer coisa. Depois escreva duas coisas.
> Primeiro, `PROJECT.md`, de trezentas linhas no máximo, com: o que é o sistema e para quem; o
> que NÃO é; os módulos principais como lista; as decisões já tomadas, cada uma com sua data; e a
> instrução de ler este arquivo e a árvore semântica ao começar cada sessão. Segundo,
> `docs/SEMANTIC_TREE.md`: o sistema como uma árvore, com os domínios no primeiro nível e, abaixo
> de cada um, seus atores, seus processos (os casos de uso, cada um com ator, gatilho, passos,
> resultado e exceções), suas entidades com seus atributos, estados e transições, suas telas e
> suas integrações externas. Marque cada nó que você inferiu em vez de ler no levantamento, para
> que eu o confirme ou corrija. À parte, crie `docs/STATUS.md` para o estado vivo (no que se está
> trabalhando, o que está aberto): esse arquivo muda todos os dias; os outros dois mudam só
> quando o sistema muda. Responda no meu idioma.

O que estou pedindo: que avalie o levantamento e pergunte antes de redigir; que o arquivo de
projeto seja **curto** (o teto de trezentas linhas é arbitrário mas necessário: sem teto,
cresce); que diga explicitamente o que o sistema **não** é, porque o que não está dito é o que o
modelo vai inventar; que as decisões tenham data; que construa a **árvore semântica** com a
estrutura completa (domínios, atores, casos de uso com suas partes, entidades com estados e
transições, telas, integrações), que é o modelo de domínio da engenharia de requisitos posto em
forma de árvore; que **marque o que inferiu**, porque é ali que se escondem as invenções; e que
separe o estado vivo em outro arquivo, para que o mapa não se converta em histórico.

**De fechamento:**

**Antes de enviar o prompt**, você tem que ter isto à mão:

- `PROJECT.md`, lido inteiro por você (tem que caber em cinco minutos), com as suas correções
  anotadas: o que não é verdade, o que não é seu, o que sobra.
- `docs/SEMANTIC_TREE.md`, percorrido nó por nó como se você fosse o cliente: cada nó marcado como
  inferido tem o seu veredicto (confirmado ou corrigido), e você anotou os atores que faltam, os
  estados que o negócio não usa, as telas que ninguém pediu.
- A lista de correções, escrita, que vai no buraco [list] do prompt. Se a lista estiver vazia na
  primeira vez, desconfie da sua leitura, não do agente.
- Estado mínimo aceitável: nenhum nó marcado como "inferido" fica sem o seu veredicto.

> Apply these corrections: [list]. Finalize `PROJECT.md` and `docs/SEMANTIC_TREE.md` with
> today's date. Add to the working agreement two rules: the change history never goes into
> `PROJECT.md` (it goes to `docs/STATUS.md` or to the pending-items register); and every pending
> item must hang from a node of the semantic tree, and the tree is updated in the same commit
> whenever a block adds or changes a node.

> [pt]
> Aplique estas correções: [lista]. Feche `PROJECT.md` e `docs/SEMANTIC_TREE.md` com a data de
> hoje. Acrescente ao contrato de convivência duas regras: o histórico de mudanças nunca vai em
> `PROJECT.md` (vai para `docs/STATUS.md` ou para o registro de pendências); e toda pendência
> tem que pender de um nó da árvore semântica, e a árvore se atualiza no mesmo commit cada vez
> que um bloco acrescenta ou muda um nó.

O que estou pedindo: as suas correções (sobretudo aos nós que ele marcou como inferidos), a
data, e duas regras novas no contrato: a que protege o arquivo de projeto de virar histórico, e a
que ata cada pendência a um nó da árvore, que é o que mantém a árvore viva e o que permite a você
detectar em dez segundos uma pendência fora de escopo.

## 3. Resultado esperado

- `PROJECT.md` (ou `CLAUDE.md`): curto, de leitura obrigatória, com o que é, para quem, o que
  não é, módulos, decisões com data, e a ordem de lê-lo junto com a árvore. Máximo de trezentas
  linhas.
- `docs/SEMANTIC_TREE.md`: a árvore semântica, com os nós inferidos marcados até que você os
  confirme, e, desde o primeiro bloco, as pendências e decisões pendendo de seus nós.
- `docs/STATUS.md`: estado vivo, separado dos anteriores.
- Nos três, uma data de última atualização.
- No contrato, as duas regras novas.

## 4. Verificação de completude

- `PROJECT.md` cabe numa leitura de cinco minutos? Se não, está errado: é o programa, não o
  histórico.
- Diz explicitamente o que o sistema NÃO faz? (O que falta é o que o agente vai inventar.)
- Percorra a árvore semântica como se fosse o cliente: estão todos os atores que você conhece?
  Cada entidade tem os estados que o negócio usa, nem mais nem menos? Há algum nó que você não
  reconhece? Esse é um invento: corrija agora.
- Os nós inferidos estão marcados? Você confirmou ou corrigiu todos?
- Cada decisão tem data e quem a tomou?
- O agente perguntou algo sobre o negócio antes de redigir? Se não perguntou nada, revise o que
  ele supôs.
- O estado vivo está em outro arquivo?
- A prova de leitura: feche a sessão, abra uma nova, e pergunte o que o sistema NÃO faz e de que
  nó da árvore pende tal tela. Se responde com o mapa, o engate funciona.

## 5. Sinais de alerta

- O arquivo de projeto cresceu mais de 20 % em um mês. Algo que não é programa está entrando.
- O agente começa uma sessão propondo algo que já foi decidido e está escrito. Não leu o mapa: o
  engate de leitura obrigatória falhou.
- A seção "o que não é" está vazia ou diz "nada em particular". Todo sistema tem limites; se não
  estão escritos, o modelo vai cruzá-los.
- Há pendências que não pendem de nenhum nó da árvore. Ou a árvore ficou velha ou essas
  pendências estão fora de escopo; as duas coisas há que olhar.
- Uma entidade da árvore tem um estado que o negócio nunca nomeou. O modelo o inventou porque
  lhe pareceu lógico, e vai construir sobre ele.
