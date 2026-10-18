# Passo 7 — Testes como cadeados, provados em vermelho (contrato do degrau)

**Fase:** ciclo.
**Quando:** com cada pendência, ao fechá-la: o teste em vermelho e em verde, a regressão das
vizinhas e o teste de ponta a ponta do fluxo tocado. A bateria completa de ponta a ponta de todos
os fluxos, no fechamento de cada bloco e antes de cada implantação em produção.
**Forma:** um disparo; o agente executa e relata, você lê o relatório.
**Tamanho:** obrigatório em todo projeto. É o coração do método: se há um degrau que não se pode
negociar, é este.

## Para que serve

Um teste que você nunca viu falhar, você não sabe se prova algo. A regra aqui não é "escreva
testes": é "demonstre que o teste fica em vermelho contra o código antigo, e depois em verde com
o novo". Evita os testes que passam porque não provam nada, e o verde que esconde um bug
[Ref. 44](../REFERENCIAS.md#ref-44).

Por que isto é mais importante com um modelo do que com um programador humano: o modelo escreve
o código e o teste **na mesma sessão, com o mesmo entendimento**. Se entendeu mal o pedido, o
teste vai provar o que ele entendeu, e vai passar. O vermelho contra o código antigo é a única
forma barata de comprovar que o teste está olhando o que importa: se o código antigo o passa, o
teste não distingue o antes do depois, e então não serve. O caso que melhor mostra isso é o dos
contadores que não coincidiam [Ref. 26](../REFERENCIAS.md#ref-26).

E a segunda metade: os testes de ponta a ponta. Um teste que verifica desde a tela (clica,
digita, lê) e comprova o efeito no backend (a linha ficou, o estado mudou) é o que substitui a
sua leitura do código. Os critérios de aceitação da pendência ("dado, quando, então") são o seu
roteiro. E rodam três vezes em três escalas: o fluxo tocado com cada pendência, todos os fluxos
no fechamento de cada bloco, e todos os fluxos com a versão exata antes da produção.

## 1. Contexto necessário

- A mudança já implementada (por padrão os testes vêm depois de implementar; "primeiro o teste"
  fica como opção para escopos pequenos e bem definidos).
- A pendência que origina a mudança, com seus critérios de aceitação e seu "como se verifica".
- A bateria existente e o comando para rodá-la (degrau 4).

## 2. Prompts

**Rotina (vai no contrato de convivência; aplica-se em cada mudança):**

> To close this pending item I need evidence, not your word. (1) Write the test that proves what
> the item asks for, following its acceptance criteria. (2) Demonstrate that this test fails
> against the previous code: you may temporarily revert the change, or run the test against the
> old version, but show me the red output. (3) Show me the green output with the change. (4) Run
> the regression suite for the neighbouring items and show me it is still green. (5) Run the
> end-to-end test of the flow this item touches, from the screen to the backend, and show me the
> backend effect. (6) Do not replace with mocks the very part you are trying to test. If testing
> end to end requires something you lack (data, access, an environment), ask me for it; do not
> simulate what you do not have. Finally, the commit message says "proved red against [what]"
> and the test counts.

> [pt]
> Para fechar esta pendência preciso de evidência, não da sua palavra. (1) Escreva o teste que
> prova o que a pendência pede, seguindo seus critérios de aceitação. (2) Demonstre que esse
> teste falha contra o código anterior: você pode reverter temporariamente a mudança, ou rodar o
> teste contra a versão antiga, mas mostre-me a saída em vermelho. (3) Mostre-me a saída em
> verde com a mudança. (4) Rode a regressão das pendências vizinhas e mostre-me que continua em
> verde. (5) Rode o teste de ponta a ponta do fluxo que esta pendência toca, desde a tela até o
> backend, e mostre-me o efeito no backend. (6) Não substitua por simulações justamente a parte
> que está testando. Se testar de ponta a ponta exige algo que você não tem (dados, acesso, um
> ambiente), peça-me; não simule o que não tem. Por último, a mensagem do commit diz "provado em
> vermelho contra [o quê]" e os números dos testes.

O que estou pedindo, cláusula por cláusula: (1) o teste, guiado pelos critérios de aceitação da
pendência; (2) **o vermelho demonstrado**, com a saída à vista, que é a cláusula que distingue
este método de "escreva testes"; (3) o verde; (4) a regressão das vizinhas na mesma sessão,
porque uma mudança quebra coisas ao lado; (5) o teste de ponta a ponta do fluxo tocado, com o
efeito no backend à vista; (6) não simular justamente o que se testa; e a cláusula de completude
adaptada a este degrau: se falta algo para testar de ponta a ponta, **pedir, não simular**. A
mensagem de commit com os números deixa a evidência onde vive o código.

**No fechamento de cada bloco e antes de cada implantação em produção:**

> Run the complete end-to-end suite of every flow that exists so far, in the test environment,
> with the exact version that will be promoted. Show me the counts, and for each flow the
> backend check that proves it. If any flow has no end-to-end test, say so and open a pending
> item for it; do not pass it as covered.

> [pt]
> Rode a bateria completa de ponta a ponta de todos os fluxos que existem até agora, no
> ambiente de teste, com a versão exata que vai ser promovida. Mostre-me os números e, para cada
> fluxo, a verificação no backend que o prova. Se algum fluxo não tem teste de ponta a ponta,
> diga e abra uma pendência; não o dê por coberto.

O que estou pedindo: a segunda e a terceira escala dos testes de ponta a ponta, com a versão
exata (não "a última"), com o efeito no backend por fluxo, e com a cláusula de completude: o que
não está coberto se declara e vira pendência, não se dá por coberto.

**Quando o agente diz que não dá para testar:**

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

> [pt]
> Explique por que não dá para testar, o que haveria que acrescentar para que dê, e abra uma
> pendência para isso. A mudança não está fechada até que possa ser testada.

O que estou pedindo: que "não dá para testar" não seja o fim da conversa mas o começo de uma
pendência. A não-testabilidade é dívida, e a dívida se registra.

## 3. Resultado esperado

- O teste novo no repositório, nomeado com a pendência que fecha.
- No relatório do agente e na mensagem do commit: a saída em vermelho (quantos falham, contra
  que versão), a saída em verde, e a regressão em verde com seus números.
- O teste de ponta a ponta do fluxo tocado, com a evidência de que o backend mudou (a linha, o
  registro, o estado).
- No fechamento de cada bloco e antes da produção: a bateria completa de ponta a ponta em verde,
  por fluxo, com a versão exata.

## 4. Verificação de completude

- O relatório mostra o vermelho? Com números: "4 de 8 falham contra o critério antigo". Se só
  mostra verde, o degrau não foi subido.
- A regressão rodou na mesma sessão? Quantos testes, quantos em verde?
- Há alguma parte "simulada" (mock) justo onde está a mudança? Pergunte ao agente o que simulou
  e por quê.
- O commit cita a pendência e diz "provado em vermelho"?
- O teste de tela verifica também o efeito no backend?
- No fechamento do bloco: estão todos os fluxos na bateria de ponta a ponta, ou há algum que "se
  cobre com os unitários"?

## 5. Sinais de alerta

- Todos os testes novos da semana passaram em verde de primeira, e nunca se mostrou um vermelho.
  Ou o agente está omitindo o passo ou os testes não provam nada.
- A bateria demora cada vez mais e ninguém sabe por quê. Costuma ser que os testes de ponta a
  ponta foram sendo substituídos por simulações "para rodar rápido".
- O agente relata "os testes passam" sem dizer quantos. Sempre com números.
- Você chega à saída para produção e a bateria completa de ponta a ponta roda pela primeira vez.
  Faltaram os fechamentos de bloco.
