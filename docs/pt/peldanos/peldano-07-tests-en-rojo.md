# Passo 7 — Testes como cadeados, provados em vermelho (contrato do degrau)

**Fase:** ciclo (cada mudança).
**Forma:** um disparo só; o agente executa e relata, o dono lê o relatório.
**Tamanho:** obrigatório em todo projeto. É o coração do método: se há um degrau que não se
negocia, é este.

## Para que serve

Um teste que você nunca viu falhar, você não sabe se prova algo. A regra aqui não é "escreva
testes": é "demonstre que o teste fica vermelho contra o código antigo, e depois verde com o
novo". Evita os testes que passam porque não provam nada, e o verde que esconde um bug.

Por que isso é mais importante com um modelo do que com um programador humano: o modelo escreve o
código e o teste **na mesma sessão, com o mesmo entendimento**. Se entendeu mal o pedido, o teste
vai provar o que ele entendeu, e vai passar. O vermelho contra o código antigo é a única forma
barata de comprovar que o teste está olhando para o que importa: se o código antigo passa, o teste
não distingue o antes do depois, e então não serve.

## 1. Contexto necessário

- A mudança já implementada (por padrão os testes vêm depois de implementar; "primeiro o teste"
  fica como opção para escopos pequenos e bem definidos).
- A pendência que origina a mudança, com seu "como se verifica".
- A bateria existente e o comando para rodá-la (degrau 4).

## 2. Prompts

**Rotina (vai no contrato de convivência; aplica-se a cada mudança):**

> To close this pending item I need evidence, not your word. (1) Write the test that proves what
> the item asks for. (2) Demonstrate that this test fails against the previous code: you may
> temporarily revert the change, or run the test against the old version, but show me the red
> output. (3) Show me the green output with the change. (4) Run the regression suite for the
> neighbouring items and show me it is still green. (5) Do not replace with mocks the very part
> you are trying to test. If testing end to end requires something you lack (data, access, an
> environment), ask me for it; do not simulate what you do not have. Finally, the commit message
> says "proved red against [what]" and the test counts.

O que estamos pedindo, cláusula por cláusula: (1) o teste; (2) **o vermelho demonstrado**, com a
saída à vista, que é a cláusula que distingue este método de "escreva testes"; (3) o verde; (4) a
regressão dos vizinhos na mesma sessão, porque uma mudança quebra coisas ao lado; (5) não mockar
justamente o que se prova; e a cláusula de completude adaptada a este degrau: se falta algo para
provar de ponta a ponta, **pedir, não simular**. A mensagem de commit com os números deixa a
evidência onde o código vive.

**Quando o agente diz que não dá para testar:**

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

O que estamos pedindo: que "não dá para testar" não seja o fim da conversa mas o começo de uma
pendência. A não-testabilidade é dívida, e a dívida se registra.

## 3. Resultado esperado

- O teste novo no repositório, nomeado com a pendência que fecha.
- No relatório do agente e na mensagem do commit: a saída em vermelho (quantos falham, contra que
  versão), a saída em verde, e a regressão em verde com seus números.
- Se foi provado de ponta a ponta (tela → backend), a evidência de que o backend mudou (a linha,
  o registro, o estado).

## 4. Verificação de completude

- O relatório mostra o vermelho? Com números: "4 de 8 falham contra o critério antigo". Se só
  mostra verde, o degrau não foi subido.
- A regressão rodou na mesma sessão? Quantos testes, quantos em verde?
- Há alguma parte "simulada" (mock) justo onde está a mudança? Pergunte ao agente o que simulou e
  por quê.
- O commit cita a pendência e diz "provado em vermelho"?
- Se o teste é de tela, verifica também o efeito no backend?

## 5. Sinais de alerta

- Todos os testes novos da semana passaram em verde de primeira, e nunca se mostrou um vermelho.
  Ou o agente está pulando o passo ou os testes não provam nada.
- A bateria demora cada vez mais e ninguém sabe por quê. Costuma ser que os testes de ponta a
  ponta foram substituídos por simulações "para rodar rápido".
- O agente relata "os testes passam" sem dizer quantos. Sempre com números.
