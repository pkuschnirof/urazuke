# Passo 5 — O plano são as pendências (contrato do degrau)

**Fase:** ciclo (usado a cada mudança, durante todo o projeto).
**Forma:** um disparo ao criá-lo; depois, rotina de cada sessão.
**Tamanho:** obrigatório em todo projeto. É o degrau que faz com que todos os outros possam ser
rastreados: sem pendências numeradas não há onde pendurar a evidência.

## Para que serve

Para que haja uma única fila de trabalho, com ordem e com comporta, que seja a verdade do projeto.
Não há "plano" de um lado e "tarefas" do outro: a lista de pendências É o plano. Evita a
especificação que é superada em duas semanas e fica obsoleta, e o trabalho do qual ninguém sabe por
que foi feito.

Uma pendência bem escrita tem três coisas que um item de lista de tarefas normalmente não tem: de
onde vem (a decisão ou o pedido que a originou), como se verifica que está feita, e a evidência com
que foi fechada. A primeira evita que o trabalho perca sua razão; a segunda evita que se feche com
"pronto"; a terceira é o que o dono olha em vez de olhar o código.

## 1. Contexto necessário

- A especificação ou o pedido inicial do cliente, por incompleto que seja.
- As auditorias, se já houve.
- `PROJECT.md` e `docs/STATUS.md`.

## 2. Prompts

**Para criar o registro:**

> We are going to turn everything that must be done into numbered pending items. Read
> `PROJECT.md`, the client's request and whatever is in `docs/STATUS.md`. If the request is
> ambiguous on any point such that you cannot write a verifiable pending item for it, ask me;
> do not resolve it by assuming. Create `docs/PENDING.md` with one item per thing to do: number
> (PND-001 onwards), one-line title, what is requested, which decision originates it (or
> "client request, date"), how it will be verified as done, and status. Order them by the
> priority I gave you; if I gave none, propose an order and tell me why. Reply in my language.

O que estamos pedindo: que converta o pedido em itens verificáveis e que **pergunte quando o pedido
não dá para escrever um verificável** (a ambiguidade se resolve perguntando, não escolhendo); os
campos de cada pendência, em particular "como se verifica", que é o que depois permite fechá-la com
evidência; e uma ordem proposta com sua razão, para que o dono a confirme ou mude.

**Rotina de cada sessão (vai no contrato de convivência ou em `PROJECT.md`):**

> Before touching any code, open `docs/PENDING.md`, tell me which item you are taking and why.
> Every commit cites its pending item. A pending item is closed with written evidence (the test,
> the screenshot, the number), never with "done". If along the way you see something that is not
> on the list, add it as a new pending item; do not do it.

O que estamos pedindo: a disciplina de cada sessão: anunciar o que se toma, citar a pendência em
cada commit, fechar com evidência, e **anotar em vez de fazer** o que aparecer fora da lista. Essa
última cláusula é a que protege o escopo exato quando o modelo "vê algo mais".

## 3. Resultado esperado

`docs/PENDING.md` (ou a ferramenta que o projeto usar) com, por pendência:

- Número, título, estado (aberta / em curso / fechada), data de abertura e de fechamento.
- O que se pede, em duas ou três frases.
- Origem: a decisão ou o pedido, com data.
- Como se verifica que está feita: o teste, a tela, o número.
- Ao fechar: a evidência e o commit.

E a rotina no contrato ou em `PROJECT.md`.

## 4. Verificação de completude

- Cada pendência diz como se verifica? Uma pendência sem verificação não pode ser fechada.
- Há pendências "fechadas" sem evidência nem commit? Se houver, reabra-as.
- Pegue três commits ao acaso: citam sua pendência?
- Apareceu no código algo que não tem pendência? Ali o agente saiu do escopo.
- O agente perguntou pelos pontos ambíguos do pedido, ou os resolveu sozinho?

## 5. Sinais de alerta

- Uma pendência leva mais de três sessões "em curso". Ou são três pendências, ou está travada por
  uma decisão que ninguém tomou (degrau 6).
- Há mais pendências fechadas num dia do que commits nesse dia. Estão sendo fechadas sem
  evidência.
- A lista tem mais de cinquenta pendências abertas. Não é um plano, é um inventário de
  ansiedades: é preciso priorizar e arquivar.
