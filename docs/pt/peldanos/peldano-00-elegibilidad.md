# Passo 0 — Este projeto pode ser encarado assim? (contrato do degrau)

**Fase:** arranque.
**Quando:** uma única vez, antes de abrir o repositório e antes de qualquer outra coisa.
**Forma:** conversa: o agente avalia e pergunta; você decide.
**Tamanho:** obrigatório em todo projeto, por menor que seja.
**Estado:** os critérios excludentes X1 e X2 estão fechados; os critérios que ponderam (D1 a D10)
ainda estou calibrando e os marco como hipótese.

## Para que serve

Não entre num projeto onde o método não pode funcionar. Se o agente não vai poder se verificar
sozinho de ponta a ponta, ou se não há um dono do domínio que decida, o método se degrada em
"programar com IA" e você acaba lendo código. Este degrau é a porta de entrada: cruza-se uma vez,
e se não se cruza, melhor saber antes do que depois.

E uma ideia de fundo que quero que você tenha clara: **o método não serve para qualquer projeto,
e isso não é um defeito**. Um método que promete servir para tudo não está dizendo nada. O que
este degrau faz é colocar a fronteira por escrito, para que a decisão de entrar ou não entrar seja
uma decisão e não uma esperança. Os dois critérios excludentes saem de projetos que recusei, não
dos que aceitei [Ref. 46](../REFERENCIAS.md#ref-46).

## 1. Contexto necessário

O que segue é a lista genérica. Os arquivos concretos que você tem que ter prontos antes de cada
prompt, com seu conteúdo e seu estado mínimo, estão na seção 2, no bloco "Antes de enviar o
prompt" que precede cada um.

Nomeado de forma genérica; o agente avalia se basta e pede o que faltar.

- Levantamento do pedido: o que o cliente quer, para quem, e o que acontece hoje sem o sistema.
- Levantamento tecnológico: que tecnologia há ou se propõe, se existe um sistema anterior, se
  esse sistema tem repositório e como é manejado.
- Levantamento de testabilidade: se as telas podem ser executadas por programa e se cada elemento
  da interface é acessível com seus diferentes métodos (clique, digitação, leitura de estado), de
  modo que um teste percorra a tela e verifique o efeito no backend.
- Quem é o dono do domínio e quanto tempo tem para decidir.
- Que consequência tem um erro (dinheiro, saúde, operação, nada).
- Ambientes e acessos: se vai haver um ambiente de teste, se o agente pode acessá-lo, se há
  produção consultável em somente leitura.

## 2. Prompts

Os prompts vão em inglês, que é o idioma em que os modelos seguem instruções com mais precisão e
menos tokens. Cada um traz sua tradução (no HTML, com um botão), e abaixo a explicação do que
estou pedindo e por que cada cláusula está ali. Ao modelo se cola o inglês.

**Inicial:**

**Antes de enviar o prompt**, isto tem que existir, e quem faz é você (ou o negócio com você), não
o agente:

- `docs/INITIAL_SURVEY.md`: o levantamento inicial. Você o escreve à mão, depois de conversar com
  o cliente (é o resultado da ingestão da fase 0). De meia página a uma página, em prosa, não em
  formulário, com seis coisas: (1) o pedido: o que o cliente quer, com as palavras dele, para
  quem, e o que acontece hoje sem o sistema (o caderno, a planilha, a pessoa que faz à mão); (2) a
  tecnologia: o que há ou o que se propõe, se existe um sistema anterior, se esse sistema tem
  repositório e como é manejado (ramos, quem sobe, se há testes); (3) a testabilidade: se as telas
  podem ser executadas por programa, e se cada elemento da interface tem como ser encontrado,
  clicado, digitado e lido; se você não sabe, diga; (4) o dono do domínio: quem é, com nome e
  papel, e quanto tempo tem por semana para decidir; (5) a consequência de um erro: dinheiro,
  saúde, operação, nada; (6) os ambientes: se vai haver um de teste, se o agente vai poder
  acessá-lo, se há uma produção consultável em somente leitura. O que você não sabe fica escrito
  como "não sei": não preencha você para que o agente não pergunte, porque a graça do degrau é ver
  o que ele pergunta.
- `docs/ELIGIBILITY_CRITERIA.md`: a ficha de critérios. Você a copia do documento principal (a
  ficha do degrau 0: os dois excludentes X1 e X2 e os critérios D1 a D10 que ponderam), com uma
  coluna vazia para a resposta, outra para a fonte e outra para verde ou vermelho. Não a preencha:
  quem a preenche é o agente.
- A pasta do projeto, criada, com o agente aberto ali e ainda sem nada mais que esses dois
  arquivos dentro de `docs/`.
- Estado mínimo aceitável: os dois arquivos existem, o levantamento toca as seis coisas mesmo que
  várias digam "não sei", e o agente está parado na pasta.

> We are going to assess whether this project can be run with the Urazuke method. Read the
> initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`. First, evaluate whether the survey is sufficient to answer
> every criterion. If any criterion cannot be answered from the survey, ask me for the missing
> information before going on; do not assume. Then fill in the sheet criterion by criterion:
> the answer, where it comes from, and for each exclusionary criterion whether it is green or
> red. Do not decide: present me the completed sheet with your reading and your doubts, and I
> will decide. Reply in my language.

> [pt]
> Vamos avaliar se este projeto pode ser encarado com o método Urazuke. Leia o levantamento
> inicial em `docs/INITIAL_SURVEY.md` e a ficha de critérios em `docs/ELIGIBILITY_CRITERIA.md`.
> Primeiro, avalie se o levantamento basta para responder cada critério. Se algum critério não
> puder ser respondido com o levantamento, peça-me a informação que falta antes de seguir; não
> suponha. Depois preencha a ficha critério por critério: a resposta, de onde sai, e para cada
> critério excludente se está em verde ou em vermelho. Não decida: apresente-me a ficha completa
> com a sua leitura e as suas dúvidas, e eu decido. Responda no meu idioma.

O que estou pedindo: que leia os dois insumos (o levantamento e a ficha de critérios); que
**antes de responder avalie se o levantamento basta** e, se não bastar, pergunte em vez de supor
(esta é a cláusula central de todos os prompts do método); que preencha a ficha com a fonte de
cada resposta, para que depois se possa rastrear; que marque os excludentes em verde ou vermelho;
e que **não decida**, porque a elegibilidade decido eu. A última linha pede que responda no meu
idioma, porque o prompt está em inglês mas a conversa não precisa estar.

**De fechamento:**

**Antes de enviar o prompt**, você tem que ter isto à mão:

- A sua decisão, em uma linha, tomada depois de ler a ficha completa que o agente apresentou: vai,
  não vai, ou vai com condições. Se há condições, escreva-as antes de colar o prompt, cada uma
  verificável ("acesso de leitura a produção antes do degrau 3" sim; "que o cliente colabore"
  não), e não mais de três.
- As respostas que você deu às perguntas do agente, dadas nesta mesma sessão do chat: o prompt
  pede que ele as inclua na ficha final, e se a sessão for outra, ele não as tem.
- Estado mínimo aceitável: cada critério da ficha tem resposta e fonte à vista, e você já decidiu.
  Se ainda tem dúvida, não mande o fechamento: continue perguntando.

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.

> [pt]
> Decisão: [vai / não vai / vai com estas condições: …]. Escreva a ficha final em
> `docs/ELIGIBILITY.md` com a data, quem decidiu, a resposta a cada critério com sua fonte, e as
> condições, se houver. Inclua as perguntas que você fez e as minhas respostas.

O que estou pedindo: que deixe a decisão escrita com data e dono (degrau 6), com as condições se
houver, e com o rastro de perguntas e respostas, que é a evidência de que não supôs nada.

## 3. Resultado esperado

Um arquivo `docs/ELIGIBILITY.md` (ou o nome que seu projeto usar), de uma página, com:

- Data e quem decidiu.
- Os dois critérios excludentes com sua resposta e sua fonte:
  - X1: há repositório acessível e manejado de forma padrão (ou o projeto é novo).
  - X2: a interface pode ser executada por programa e cada elemento é acessível com seus
    diferentes métodos, com verificação do efeito no backend.
- Os critérios que ponderam, cada um com resposta, fonte e peso (quando o peso estiver
  calibrado).
- A decisão: vai, não vai, ou vai com condições, e as condições escritas.
- As perguntas que o agente fez e as respostas, para que fique o rastro.

## 4. Verificação de completude (você faz, sem ler código)

- Os dois excludentes têm resposta explícita e fonte? Se algum está em vermelho, a decisão é "não
  vai" ou tem uma condição que o resolve?
- Há algum critério respondido com "suponho que sim" ou "provavelmente"? Se há, o degrau não foi
  subido: o agente tinha que perguntar.
- A decisão está escrita com data e com nome?
- As condições (se houver) são verificáveis? ("Ter acesso de leitura à produção antes do degrau
  3" sim; "que o cliente colabore" não.)

## 5. Sinais de alerta

- O agente preencheu a ficha inteira sem fazer uma única pergunta. Ou o levantamento era perfeito
  (nunca é) ou ele supôs.
- A decisão é "vai com condições" e as condições são mais de três. Provavelmente é um "não vai"
  que ninguém quer dizer.
- O critério X2 foi respondido "sim, com um pouco de trabalho". Se as telas não podem ser operadas
  por programa hoje, esse "pouco de trabalho" é o projeto inteiro.
