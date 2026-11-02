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

Duas coisas mais entraram com D-082, e são duas e não uma. A primeira: **a pessoa executa para
aceitar e o agente percorre para encontrar defeitos**, e o método pede as duas. A percorrida
agêntica —que o agente abra cada tela, olhe o que há nela, a use e siga o fluxo de uma para a
seguinte, como o faria uma pessoa— não substitui a execução humana e tampouco é a prova de ponta a
ponta do degrau 8: a de ponta a ponta percorre um caminho que alguém escolheu, e a percorrida busca
o que ninguém pensou em provar. Peço-a porque o medi: de tudo o que um agente fez num ciclo
completo, a percorrida foi **o que mais defeitos de interface encontrou**, e o método não a pedia;
pedia-a o agente a si mesmo. Fica em `docs/SCREEN_WALKTHROUGH.md`, com o seu denominador: quantas
telas tem o sistema, quantas percorreu e quantos defeitos encontrou. Uma tela em que não conseguiu
entrar conta-se no total e nomeia-se com a sua razão; tirá-la do denominador para que o número
fique bonito é exatamente o que proíbe `CQ-19.1` do Anexo H.

E a segunda, que é o limite deste degrau dito de frente: **escrever os casos e que uma pessoa os
execute são dois estados distintos, e o segundo o método não o pode obrigar.** Nenhum programa pode
verificar que uma pessoa seguiu um guião com as suas próprias mãos, e uma comporta que o exigisse
só se poderia satisfazer mentindo. Então o degrau exige o que se pode verificar —a declaração— e
a dívida fica à vista: `cases_written`, `cases_executed_by_a_person` e `execution_debt` na cabeça
de `docs/MANUAL_TESTS.md`, e a segunda cifra move-a uma execução assinada e nunca a leitura do
agente. A declaração **não acrescenta uma comporta nova**: o que o degrau exige de mais é que a dívida
esteja escrita, não que a cifra seja maior que zero, porque obrigar uma pessoa é o que o método não
pode fazer. O que **sim** freia, e já estava desde a âncora 4 do Anexo H, é que um caso que ninguém
correu por perfil não é um caso executado: medi-o no 2026-11-02 com o avaliador real e uma
instalação que implementa essa âncora põe-se em vermelho dizendo que o registro de casos assinados
está vazio. Assim que o que faltava não era um bloqueio: era que a dívida fosse **legível** —a sua
cifra e o nome de quem a deve— em vez de um registro vazio que diz «ninguém assinou» sem dizer quem
tinha de assinar nem desde quando. E convém saber, para ler o degrau, de onde saiu a medição que o
abriu: o projeto que avançou com a tabela vazia corria o **congelado** do esquema 1, onde o único
chequeo do degrau 10 é que o arquivo exista. Medi-o no 2026-11-02 num
projeto real: os treze casos escritos, a tabela de execuções vazia, o degrau em verde, e um
documento de cumprimento que afirmava seis critérios como verificados cujo verificador era uma
pessoa que nunca os executou. O agente tinha feito exatamente o que o degrau dizia. O buraco era do
degrau.

**E a pergunta que tudo isso deixa, respondida sem rodeios: se ninguém assinou nem um caso,
avanço?** Não. Medi em 2026-11-02 com o avaliador real, e as duas metades são da mesma peça: com o
registro de assinaturas vazio o degrau 10 sai **vermelho** dizendo que ninguém assinou nenhum caso,
e com um único caso assinado por uma pessoa —com o seu nome, a sua data e o perfil com que o
executou— a mesma árvore, com os seus treze casos escritos e o seu `execution_debt` em
`pending_verifier`, deixa de estar vermelha e passa à verificação do dono. Então o que freia não é a
dívida, e nunca foi: o que freia é que **ninguém tenha assinado nada**, e isso está na âncora 4 do
Anexo H desde `2026.10.1`, desde antes de esta declaração existir. A dívida não abre nem fecha a
comporta: ela a torna **legível**, que é outra coisa e é a que faltava.

Escrevo isso porque era preciso dizê-lo aqui e não deixar que cada um deduza. Um projeto que avançou
o degrau 10 com o registro de assinaturas vazio não o fez porque o método permita: fixou o
**congelado** do esquema 1, onde a única verificação do degrau 10 é que o arquivo exista, e isso é
exatamente o que `PND-055` e D-068 dizem sobre fixar contra uma identidade interna que o método não
pode nomear. Se te aconteceu, a primeira coisa a olhar não é o degrau: é contra que versão o projeto
está fixado.

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
>
> Every manual case also runs once per affected profile, and it is derived
> from `docs/PROFILE_MATRIX.md` instead of being written by hand: a case run
> with a single profile is not an executed case (Annex H, anchor 4). At the
> close of each block add the two human checks no machine replaces: the
> first-click check, where I name the place I would look for a task and you
> compare that with the menu, and the real screenshot of the test
> environment.
>
> `docs/MANUAL_TESTS.md` carries at its head three declarations that a gate reads, each one under
> its fixed key in English even when the file is in my language, because what this step owes is not
> the same as what it can prove. `cases_written`: how many cases are written.
> `cases_executed_by_a_person`: how many of those a person signed in their execution table, with a
> date and a name; you keep the first figure, and the second one moves only when a person executes
> -- never from your own reading of the system. `execution_debt`: `none` when the two figures are
> the same, or `pending_verifier` and then the cases nobody has executed yet, with who owes each
> execution and since when. That debt is not a gate of its own: what this step asks you for is the
> declaration and not a figure above zero, because the method cannot make a person execute. But it
> is never silent either, and a step that advances with its debt declared is honest in a way that a
> step advancing while it looks complete is not.
>
> And walk the screens yourself, which is a different thing from the execution a person owes and
> never a replacement for it: you walk to find defects, a person executes to accept. Go through
> every screen the system has as a person would -- open it, look at what is on it, use it, and
> follow the flow from one screen to the next -- and write `docs/SCREEN_WALKTHROUGH.md` with
> `screens_total`, how many screens the system has; `screens_walked`, how many of them you actually
> walked; and `walkthrough_findings`, how many defects the walk found. A screen you could not reach
> is counted in the total and named with its reason: taking it out of the denominator so that the
> figure reads better is the one thing this file must never do. For every defect: the screen, what
> you saw, what you expected instead, and the pending item you opened for it.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

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
>
> Todo caso manual também é executado uma vez por perfil afetado, e é
> derivado de `docs/PROFILE_MATRIX.md` em vez de ser escrito à mão: um caso
> rodado com um único perfil não é um caso executado (Anexo H, âncora 4). No
> fecho de cada bloco, acrescente as duas verificações humanas que nenhuma
> máquina substitui: a do primeiro clique, em que eu nomeio o lugar onde
> procuraria uma tarefa e você compara isso com o menu, e a captura real do
> ambiente de teste.
>
> `docs/MANUAL_TESTS.md` leva na sua cabeça três declarações que uma comporta lê, cada uma com a sua
> chave fixa em inglês mesmo que o arquivo esteja no meu idioma, porque o que este degrau deve não é o
> mesmo que o que ele pode provar. `cases_written`: quantos casos estão escritos.
> `cases_executed_by_a_person`: quantos desses uma pessoa assinou na sua tabela de execuções, com data
> e com nome; a primeira cifra é você que a mantém, e a segunda move-se só quando uma pessoa executa
> —nunca a partir da sua própria leitura do sistema—. `execution_debt`: `none` quando as duas cifras
> são a mesma, ou `pending_verifier` e então os casos que ninguém executou ainda, com quem deve cada
> execução e desde quando. Essa dívida não é uma comporta própria: o que este degrau te pede é a
> declaração e não uma cifra maior que zero, porque o método não pode obrigar uma pessoa a executar.
> Mas também nunca é silenciosa, e um degrau que avança com a sua dívida declarada é honesto de uma
> maneira que não o é um que avança parecendo completo.
>
> E percorra você mesmo as telas, que é outra coisa distinta da execução que devemos a uma pessoa e
> nunca um substituto dela: você percorre para encontrar defeitos, uma pessoa executa para aceitar.
> Passe por cada tela que o sistema tem como o faria uma pessoa —abra-a, olhe o que há nela, use-a,
> e siga o fluxo de uma tela para a seguinte— e escreva `docs/SCREEN_WALKTHROUGH.md` com
> `screens_total`, quantas telas o sistema tem; `screens_walked`, quantas dessas você percorreu de
> verdade; e `walkthrough_findings`, quantos defeitos a percorrida encontrou. Uma tela em que não
> conseguiu entrar conta-se no total e nomeia-se com a sua razão: tirá-la do denominador para que a
> cifra se leia melhor é a única coisa que este arquivo nunca pode fazer. Por cada defeito: a tela, o
> que viu, o que esperava em vez disso, e a pendência que abriu por isso.
>
> Quando você precisar de uma decisão minha, peça-a com as quatro partes da UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e nesta ordem: os dados que tornam a pergunta necessária,
> enumerados; um parágrafo de no máximo cinco linhas que os ligue e deixe ver a dúvida; a pergunta
> com as suas respostas possíveis enumeradas; e a sua recomendação. Diga-o na profundidade técnica
> que o projeto declarou em `communication_depth` —`beginner`, `decision_maker` ou `technical`—;
> se o projeto não declarou nenhuma, use `decision_maker`.

O que estou pedindo: que o caso saia dos critérios de aceitação (assim prova o que se pediu, não
o que o modelo entendeu); que esteja escrito para alguém que não sabe como o sistema funciona,
que é a diferença entre um caso de teste e uma nota técnica; que inclua o efeito no backend
verificável por uma pessoa, para que o teste manual também olhe do outro lado da tela; que os
casos se mantenham no mesmo commit, igual que a documentação; e **que o modelo nunca os execute**,
porque executados pelo modelo são mais um teste, e a graça é que os execute uma pessoa.

E o que acrescenta D-082: que o agente **percorra as telas por sua conta**, que é o que mais
defeitos de interface encontra e o que o método não pedia; e que o arquivo de casos leve na sua
cabeça a diferença entre o escrito e o executado, para que um degrau que avança com dívida avance
**dizendo-o**. A percorrida não substitui a execução humana: torna-a mais curta, porque a pessoa já
não se encontra com os defeitos que o agente poderia ter visto olhando.

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
> the case or the system is the problem.
>
> Then refresh the three declarations at the head of the file: `cases_written`,
> `cases_executed_by_a_person` counted from the signed execution tables and from nothing else, and
> `execution_debt` with who still owes which execution and since when.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [pt]
> Leia as execuções de hoje em `docs/MANUAL_TESTS.md`. Por cada caso que falhou, e por cada
> observação solta no final do arquivo, abra uma pendência corretiva em `docs/PENDING.md` com as
> palavras da pessoa como forma de reproduzi-lo, pendurada no nó da árvore semântica que toca;
> não conserte nada agora. Por cada caso que passou, nada. Depois diga-me, fluxo por fluxo,
> quantos casos passaram e quantos falharam, comparado com a execução anterior, e que falhas se
> repetem. Se um caso não se pôde executar, diga-me por quê e se o problema é o caso ou o
> sistema.
>
> Depois atualize as três declarações da cabeça do arquivo: `cases_written`,
> `cases_executed_by_a_person` contada a partir das tabelas de execução assinadas e de mais nada, e
> `execution_debt` com quem continua a dever qual execução e desde quando.
>
> Quando você precisar de uma decisão minha, peça-a com as quatro partes da UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e nesta ordem: os dados que tornam a pergunta necessária,
> enumerados; um parágrafo de no máximo cinco linhas que os ligue e deixe ver a dúvida; a pergunta
> com as suas respostas possíveis enumeradas; e a sua recomendação. Diga-o na profundidade técnica
> que o projeto declarou em `communication_depth` —`beginner`, `decision_maker` ou `technical`—;
> se o projeto não declarou nenhuma, use `decision_maker`.
>
> Responda no meu idioma.

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
- `docs/SCREEN_WALKTHROUGH.md` com a percorrida do agente: `screens_total`, `screens_walked` e
  `walkthrough_findings`, e cada defeito com a sua tela, o que se viu, o que se esperava e a sua
  pendência.
- Na cabeça de `docs/MANUAL_TESTS.md`, as três declarações que uma comporta lê: `cases_written`,
  `cases_executed_by_a_person` —que só move uma execução assinada— e `execution_debt` em `none` ou
  em `pending_verifier`, com quem deve cada execução e desde quando.

## 4. Verificação de completude (você a faz, sem ler código)

- Pegue um caso ao acaso e siga-o você mesmo no ambiente de teste sem perguntar nada ao agente:
  conseguiu? Se teve que perguntar, o caso não está escrito para uma pessoa.
- Cada pendência fechada que toca uma tela tem o seu caso? Peça a lista de pendências sem caso.
- O caso diz que efeito verificar do outro lado da tela, e como uma pessoa o verifica?
- A última execução tem data e nome em cada caso? Há algum "passou" sem data?
- Cada falha da última execução tem a sua pendência, com as palavras da pessoa?
- `cases_executed_by_a_person` sai das tabelas assinadas e não da leitura do agente? Toma um caso
  contado como executado e procura a data e o nome na sua tabela.
- Se há dívida, `execution_debt` diz quem a deve e desde quando? Uma dívida sem nome não é uma
  dívida: é um esquecimento com formato.
- A percorrida conta as telas que não conseguiu abrir dentro do total, com a sua razão? Um
  `screens_walked` igual ao total num sistema com telas atrás de um perfil que o agente não tem é
  uma cifra inventada.
- Os defeitos da percorrida têm a sua pendência, igual que as falhas humanas?

- Se ainda ninguém assinou nem um caso, o texto te diz que não avanças? Faz a pergunta ao contrato
  e à comporta —«se ninguém executou, avanço?»— e exige que respondam o mesmo. Se o contrato diz que
  sim e a comporta diz que não, quem está errado é o contrato.

## 5. Sinais de alerta

- O agente marcou os casos como executados. Executou-os ele, que é o mesmo que não executá-los.
- Os casos são cópias do teste automático em prosa. Um caso manual tem que olhar o que o teste
  não olha: o que se vê, o que se entende, o que incomoda.
- Todos os casos passam em todas as execuções. As pessoas encontram coisas sempre; se não
  encontram nada, não estão seguindo o roteiro ou o roteiro não pede que se olhe.
- As falhas se "consertam" na hora, sem pendência. Perdem-se as palavras da pessoa e o rastro do
  que se repetiu.
- O degrau figura cumprido, `cases_executed_by_a_person` está em zero **e a comporta te deu
  verde**. O número em zero não é o problema: uma dívida declarada é honesta. O problema é o verde:
  com o catálogo publicado, um degrau 10 sem nenhuma assinatura sai vermelho pela âncora 4. Se saiu
  verde, não festeje: olha contra que `catalog_version` o projeto está fixado.
- A percorrida do agente não encontrou nada e o sistema tem telas novas. Percorrer não é abrir: se
  não há achados, o mais provável é que tenha olhado a tela e não a tenha usado.
- A percorrida começa a usar-se como desculpa para não executar os casos. São duas coisas com dois
  propósitos, e a que aceita é a da pessoa.
