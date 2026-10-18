# Passo 0 — Este projeto pode ser encarado assim? (contrato do degrau)

**Fase:** arranque.
**Quando:** uma única vez, na primeira semana, antes de abrir o repositório e antes de qualquer
outra coisa. Uma hora de trabalho.
**Forma:** conversa: o agente avalia e pergunta; você decide.
**Tamanho:** obrigatório em todo projeto, por menor que seja. Leva uma hora; economiza meses.
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
