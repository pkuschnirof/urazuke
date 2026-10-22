# Passo 5 — O plano são as pendências: a especificação detalhada vive em cada uma (contrato do degrau)

**Fase:** ciclo.
**Quando:** o registro se cria ao abrir o primeiro bloco funcional, assim que termina o arranque;
cada bloco novo começa convertendo o pedido do cliente em pendências especificadas; a rotina se
usa em cada sessão durante todo o projeto; a documentação da pendência feita se escreve ao
fechá-la, na mesma sessão.
**Forma:** um disparo ao abrir cada bloco; depois, rotina de cada sessão.
**Tamanho:** obrigatório em todo projeto. É o degrau que faz com que todos os demais possam ser
seguidos: sem pendências numeradas e especificadas não há onde pendurar nem a especificação nem
a evidência.

## Para que serve

Tenha uma única fila de trabalho, com ordem e com comporta, que seja a verdade do projeto. Não
há "plano" de um lado e "tarefas" do outro: a lista de pendências É o plano. Evita a
especificação longa que é superada em duas semanas e fica obsoleta
[Ref. 17](../REFERENCIAS.md#ref-17), e o trabalho do qual ninguém sabe por que foi feito
[Ref. 7](../REFERENCIAS.md#ref-7).

Mas há mais, e é o que distingue este degrau de uma lista de tarefas qualquer. No método clássico
existia um documento de especificação de requisitos, longo, que descrevia tudo o que o sistema
tinha que fazer e que envelhecia antes de ser terminado. Aqui esse documento se decompõe: **a
especificação detalhada vive em cada pendência**. Uma pendência bem escrita traz: o nó da árvore
semântica de que pende; a história de usuário ou caso de uso que a origina, com as palavras do
cliente; a descrição detalhada; as regras de negócio aplicáveis, com sua decisão e sua data; os
dados que entram e saem; as telas afetadas, com o protótipo se houver; os casos de borda e as
exceções; os critérios de aceitação na forma "dado, quando, então"; e como se verifica. A soma
das pendências é a especificação do sistema, e a rastreabilidade (requisito → pendência → teste →
commit) não é uma matriz à parte: é a própria pendência.

E a terceira coisa, que fecha o círculo: **as pendências fechadas são documentação**. Quando uma
pendência se fecha, não se apaga nem se arquiva vazia: fica com sua especificação, a decisão que
a originou, a evidência com que se fechou (os números do vermelho e do verde, a captura, o número
medido), o commit e a data. A fila de pendências fechadas é o histórico funcional do sistema: o
que se construiu, por quê, quando e como se testou. Dali saem o diário de mudanças, as seções
novas do manual, e a resposta a "por que o sistema faz isto?" seis meses depois.

## 1. Contexto necessário

O que segue é a lista genérica. Os arquivos concretos que você tem que ter prontos antes de cada
prompt, com seu conteúdo e seu estado mínimo, estão na seção 2, no bloco "Antes de enviar o
prompt" que precede cada um.

- O pedido do cliente para o bloco, em prosa, tal como ele o diria, com suas ambiguidades. Se
  você fez casos de uso ou histórias de usuário na ingestão, melhor: são a unidade natural de um
  bloco.
- A árvore semântica (degrau 2), para pendurar cada pendência em seu nó.
- As auditorias e os achados dos testes humanos, se já houve.
- `PROJECT.md` e `docs/STATUS.md`.

## 2. Prompts

**Para abrir um bloco:**

**Antes de enviar o prompt**, isto tem que existir, e quem faz é você (ou o negócio com você), não
o agente:

- O pedido do cliente para este bloco, escrito em prosa, tal como ele o diria, com suas
  ambiguidades. Vai em `docs/INITIAL_SURVEY.md` sob um título com o nome do bloco, ou num arquivo
  próprio (por exemplo `docs/blocks/BLOCK_01_REQUEST.md`); o prompt diz "the client's request for
  this block" sem caminho, então diga no chat onde está. Se na ingestão você escreveu casos de uso
  ou histórias de usuário, vão ali: são a unidade natural do bloco. Se o dono lhe deu uma
  prioridade, também. Não o "melhore" você: as ambiguidades são o que o agente tem que perguntar.
- `docs/SEMANTIC_TREE.md` (degrau 2), em dia: cada pendência vai pender de um nó dali.
- `PROJECT.md` e `docs/STATUS.md` (degrau 2), em dia.
- Se houve auditorias (degrau 13) ou testes humanos (a vista humana no fechamento do bloco
  anterior): seus achados, em `docs/AUDIT_[data].md` ou anotados no estado vivo, porque são
  pendências candidatas para este bloco.
- Estado mínimo aceitável: o pedido do bloco está escrito com as palavras do cliente, e a árvore
  tem os nós desse bloco, ou o pedido deixa ver quais faltam.

> We are going to turn everything that must be done in this block into numbered pending items,
> each one carrying its full specification. Read `PROJECT.md`, `docs/SEMANTIC_TREE.md`, the
> client's request for this block, and whatever is in `docs/STATUS.md`. If the request is
> ambiguous on any point such that you cannot write a verifiable pending item for it, ask me; do
> not resolve it by assuming. Then create or extend `docs/PENDING.md` with one item per thing to
> do, each with: number (PND-001 onwards); one-line title; the node of the semantic tree it hangs
> from; the user story or use case that originates it, in the client's words; the detailed
> description; the business rules that apply, each with its decision and date, or marked as
> "rule missing, asked"; the data in and out; the screens affected; the edge cases and
> exceptions; the acceptance criteria in the form "given, when, then"; how it will be verified
> as done; and status. If a node the item needs does not exist in the tree, propose it and mark
> it. Order the items by the priority I gave you; if I gave none, propose an order and tell me
> why.
>
> This block also carries the hooks of Annex H. Every pending item that
> touches a screen declares, in `docs/PENDING.md`: the group of convergence
> it belongs to (Annex H, B1), the profiles that have it, and one acceptance
> criterion per affected profile, written as "given profile X, this person
> can do Y and cannot do Z". It also adds or updates its row in
> `docs/PROFILE_MATRIX.md`: the functionality, its group, its profiles and
> its entry route. A pending item that touches a screen without that row is
> not planned: the row is written here, not invented later in the code. The
> catalogue lives in `docs/ANEXO_HEURISTICAS.md`: cite it, do not restate
> it.
>
> Reply in my language.

> [pt]
> Vamos converter tudo o que há para fazer neste bloco em pendências numeradas, cada uma com sua
> especificação completa. Leia `PROJECT.md`, `docs/SEMANTIC_TREE.md`, o pedido do cliente para
> este bloco, e o que houver em `docs/STATUS.md`. Se o pedido é ambíguo em algum ponto de modo
> que você não consiga escrever uma pendência verificável, pergunte-me; não resolva supondo.
> Depois crie ou estenda `docs/PENDING.md` com um item por coisa a fazer, cada um com: número
> (PND-001 em diante); título de uma linha; o nó da árvore semântica de que pende; a história de
> usuário ou caso de uso que o origina, com as palavras do cliente; a descrição detalhada; as
> regras de negócio que se aplicam, cada uma com sua decisão e data, ou marcada como "regra
> faltante, perguntada"; os dados que entram e saem; as telas afetadas; os casos de borda e as
> exceções; os critérios de aceitação na forma "dado, quando, então"; como se vai verificar que
> está feito; e o estado. Se um nó de que o item precisa não existe na árvore, proponha-o e
> marque-o. Ordene os itens pela prioridade que eu lhe dei; se não dei nenhuma, proponha uma
> ordem e diga-me por quê.
>
> Este bloco também carrega os ganchos do Anexo H. Toda pendência que toca
> uma tela declara, em `docs/PENDING.md`: o grupo de convergência ao qual
> pertence (Anexo H, B1), os perfis que a têm e um critério de aceitação por
> perfil afetado, escrito como «dado o perfil X, esta pessoa pode fazer Y e
> não pode fazer Z». Além disso, adiciona ou atualiza a sua linha em
> `docs/PROFILE_MATRIX.md`: a funcionalidade, o seu grupo, os seus perfis e
> a sua rota de entrada. Uma pendência que toca uma tela sem essa linha não
> está planejada: a linha se escreve aqui e não se inventa depois no código.
> O catálogo está em `docs/ANEXO_HEURISTICAS.md`: cite-o, não o repita.
>
> Responda no meu idioma.

O que estou pedindo: que converta o pedido em itens verificáveis e que **pergunte quando o pedido
não dá para escrever um verificável** (a ambiguidade se resolve perguntando, não escolhendo); a
especificação completa de cada pendência, campo por campo, que é a engenharia de requisitos
clássica decomposta em unidades pequenas; o nó da árvore de que pende, que é o que permite a você
detectar uma pendência fora de escopo; as regras de negócio com sua decisão ou marcadas como
faltantes, que é o engate com o degrau 6; os critérios de aceitação na forma clássica, que são o
roteiro do teste de ponta a ponta do degrau 8; e uma ordem proposta com sua razão, para que você a
confirme ou mude.

**Rotina de cada sessão (vai no contrato de convivência):**

**Antes de enviar o prompt**, você tem que ter isto à mão:

- `docs/PENDING.md` com o bloco especificado e lido por você, pendência por pendência, como se
  você fosse o cliente, com as suas correções já feitas (é a tarefa mais importante do degrau, e a
  que mais tentação dá de pular).
- `docs/WORKING_AGREEMENT.md` (degrau 1), onde esta rotina se acrescenta.
- Estado mínimo aceitável: nenhuma pendência tem uma especificação de uma linha. Se tem, não
  comece a construir: faça-a completar primeiro.

> Before touching any code, open `docs/PENDING.md`, tell me which item you are taking and why,
> and re-read its specification. Every commit cites its pending item. A pending item is closed
> with written evidence (the test counts red and green, the screenshot, the measured number),
> never with "done". When you close it, keep it in the register with its full specification and
> add: the evidence, the commit, the date, and any decision that was taken along the way; that
> record is the documentation of what was built. If along the way you see something that is not
> on the list, add it as a new pending item with its specification; do not do it.

> [pt]
> Antes de tocar em código, abra `docs/PENDING.md`, diga-me que pendência você pega e por quê, e
> releia sua especificação. Cada commit cita sua pendência. Uma pendência se fecha com evidência
> escrita (os números do teste em vermelho e em verde, a captura, o número medido), nunca com
> "pronto". Quando fechá-la, deixe-a no registro com sua especificação completa e acrescente: a
> evidência, o commit, a data, e qualquer decisão que tenha sido tomada no caminho; esse registro
> é a documentação do que foi construído. Se no caminho você vir algo que não está na lista,
> acrescente como pendência nova com sua especificação; não faça.

O que estou pedindo: a disciplina de cada sessão: anunciar o que pega e reler a especificação (o
agente começa sem memória, e a especificação é a sua memória da pendência), citar a pendência em
cada commit, fechar com evidência, **documentar a pendência feita** no mesmo registro, e **anotar
em vez de fazer** o que aparecer fora da lista. Essa última cláusula é a que protege o escopo
exato quando o modelo "vê algo mais".

## 3. Resultado esperado

`docs/PENDING.md` (ou a ferramenta que seu projeto usar) com, por pendência:

- Número, título, estado (aberta / em curso / fechada), data de abertura e de fechamento.
- O nó da árvore semântica.
- A história ou caso de uso de origem, com as palavras do cliente.
- A especificação detalhada: descrição, regras de negócio com decisão e data, dados, telas,
  casos de borda, critérios de aceitação, como se verifica.
- Ao fechar: a evidência, o commit, a data, as decisões tomadas no caminho.

E a rotina no contrato de convivência.

## 4. Verificação de completude

- Leia a especificação de uma pendência ao acaso como se fosse o cliente: descreve o que você
  pediu, com as suas palavras de origem? Os critérios de aceitação são os que você usaria para
  dizer "está bom"? Há um caso de borda que você conhece e não está?
- Cada pendência pende de um nó da árvore? Há alguma pendurada num nó que você não reconhece?
- Cada pendência diz como se verifica? Uma pendência sem verificação não pode ser fechada.
- Há regras de negócio marcadas como "faltante, perguntada" que não lhe perguntaram?
- Há pendências "fechadas" sem evidência nem commit? Se há, reabra-as. As fechadas conservam sua
  especificação e sua documentação de fechamento?
- Pegue três commits ao acaso: citam sua pendência?
- Apareceu no código algo que não tem pendência? Aí o agente saiu do escopo.

## 5. Sinais de alerta

- Uma pendência leva mais de três sessões "em curso". Ou são três pendências, ou está travada
  por uma decisão que ninguém tomou (degrau 6).
- Há mais pendências fechadas num dia do que commits nesse dia. Estão sendo fechadas sem
  evidência.
- As especificações são de uma linha. O agente as escreveu para cumprir, não para construir
  sobre elas; vai inventar o que falta na hora de construir.
- A lista tem mais de cinquenta pendências abertas. Não é um plano, é um inventário de
  ansiedades: há que priorizar e arquivar.
- Alguém pergunta por que o sistema faz algo e a resposta não está em nenhuma pendência fechada.
  A documentação do feito não está sendo escrita.
