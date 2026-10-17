# Passo 0 — Este projeto pode ser encarado assim? (contrato do degrau)

**Fase:** arranque (uma vez por projeto, antes de abrir o repositório).
**Forma:** conversa (o agente avalia e pergunta; o dono decide).
**Tamanho:** obrigatório em todo projeto, por menor que seja. Leva uma hora; economiza meses.
**Estado:** em elaboração com Pablo. Os critérios excludentes X1 e X2 estão confirmados; os
critérios que ponderam (D1 a D10) ainda são hipóteses sem peso.

## Para que serve

Para não entrar num projeto onde o método não pode funcionar. Se o agente não vai conseguir se
verificar sozinho de ponta a ponta, ou se não há um dono do domínio que decida, o método se degrada
em "programar com IA" e o humano acaba lendo código. Este degrau é a porta de entrada: cruza-se
uma vez, e se não dá para cruzar, melhor saber antes do que depois.

Há uma ideia de fundo que vale dizer explicitamente: **o método não serve para qualquer projeto, e
isso não é um defeito**. Um método que promete servir para tudo não está dizendo nada. O que este
degrau faz é colocar a fronteira por escrito, para que a decisão de entrar ou não seja uma decisão
e não uma esperança.

## 1. Contexto necessário

Nomeado de forma genérica; o agente avalia se é suficiente e pede o que falta.

- Levantamento do pedido: o que o cliente quer, para quem, e o que acontece hoje sem o sistema.
- Levantamento tecnológico: que tecnologia existe ou se propõe, se existe um sistema anterior, se
  esse sistema tem repositório e como é gerenciado.
- Levantamento de testabilidade: se as telas podem ser executadas por programa e se cada elemento
  da interface é acessível com seus diferentes métodos (clique, digitação, leitura de estado), de
  modo que um teste percorra a tela e verifique o efeito no backend.
- Quem é o dono do domínio e quanto tempo tem para decidir.
- Que consequência tem um erro (dinheiro, saúde, operação, nenhuma).
- Ambientes e acessos: se haverá um ambiente de teste, se o agente pode acessá-lo, se a produção
  pode ser consultada somente leitura.

## 2. Prompts

Os prompts vão em inglês, o idioma em que os modelos seguem instruções com mais precisão e menos
tokens. Abaixo de cada um, a explicação em português do que estamos pedindo e por que cada cláusula
está ali.

**Inicial:**

> We are going to assess whether this project can be run with the Urazuke method. Read the
> initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`. First, evaluate whether the survey is sufficient to answer
> every criterion. If any criterion cannot be answered from the survey, ask me for the missing
> information before going on; do not assume. Then fill in the sheet criterion by criterion:
> the answer, where it comes from, and for each exclusionary criterion whether it is green or
> red. Do not decide: present me the completed sheet with your reading and your doubts, and I
> will decide. Reply in my language.

O que estamos pedindo: que leia os dois insumos (o levantamento e a ficha de critérios); que
**antes de responder avalie se o levantamento é suficiente** e, se não for, pergunte em vez de
supor (esta é a cláusula central de todos os prompts do método); que preencha a ficha com a fonte
de cada resposta, para que depois se possa rastrear; que marque os excludentes em verde ou
vermelho; e que **não decida**, porque a elegibilidade é decidida pelo dono. A última linha pede
que responda no idioma do dono, porque o prompt está em inglês mas a conversa não precisa estar.

**De fechamento:**

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.

O que estamos pedindo: que deixe a decisão escrita com data e dono (degrau 6), com as condições se
houver, e com o rastro de perguntas e respostas, que é a evidência de que nada foi suposto.

## 3. Resultado esperado

Um arquivo `docs/ELIGIBILITY.md` (ou o nome que o projeto usar), de uma página, com:

- Data e quem decidiu.
- Os dois critérios excludentes com sua resposta e sua fonte:
  - X1: há repositório acessível e gerenciado de forma padrão (ou o projeto é novo).
  - X2: a interface pode ser executada por programa e cada elemento é acessível com seus
    diferentes métodos, com verificação do efeito no backend.
- Os critérios que ponderam (os D1 a D10 da escada, quando estiverem fechados), cada um com
  resposta, fonte e peso.
- A decisão: vai, não vai, ou vai com condições, e as condições escritas.
- As perguntas que o agente fez e as respostas, para que fique o rastro.

## 4. Verificação de completude (feita pelo dono, sem ler código)

- Os dois excludentes têm resposta explícita e fonte? Se algum está em vermelho, a decisão é "não
  vai" ou há uma condição que o resolve?
- Há algum critério respondido com "suponho que sim" ou "provavelmente"? Se houver, o degrau não
  foi subido: o agente tinha que perguntar.
- A decisão está escrita com data e nome?
- As condições (se houver) são verificáveis? ("Ter acesso de leitura à produção antes do degrau
  3" sim; "que o cliente colabore" não.)

## 5. Sinais de alerta

- O agente preencheu a ficha inteira sem fazer uma única pergunta. Ou o levantamento era perfeito
  (nunca é) ou ele supôs.
- A decisão é "vai com condições" e as condições são mais de três. Provavelmente é um "não vai"
  que ninguém quer dizer.
- O critério X2 foi respondido com "sim, com um pouco de trabalho". Se as telas não podem ser
  operadas por programa hoje, esse "pouco de trabalho" é o projeto inteiro.
