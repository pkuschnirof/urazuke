# Urazuke — o curso. Manual com tarefas práticas, degrau por degrau, até a aplicação em produção

Autor: Pablo Kuschniroff, assistido por Claude Code. Versão 2, 18 de outubro de 2026. É um
documento de trabalho do projeto Urazuke: vou corrigi-lo com a primeira turma que o usar. Está
escrito em linguagem de todos os dias, e cada sigla ou expressão estranha está no glossário do
documento principal (`ESCALERA_METODOLOGICA.md`). Quando cito um caso real faço isso com uma
marca `[Ref. N]` que leva ao [documento de referências](REFERENCIAS.md); o manual fica limpo e o
detalhe, a um clique. O repositório público do método é
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke). Esta é a versão em
português; o espanhol é a fonte da verdade.

## Antes de começar

### Para quem é este curso

Para alguém que quer construir software com inteligência artificial **e que esse software seja
usado de verdade**, por gente de verdade, durante meses. Não é um curso de programação: você não
vai aprender uma linguagem nem um framework. Também não é um curso de "prompts": você não vai
aprender truques para que o modelo escreva melhor. É um curso de **método**: do que fazer em que
ordem, o que pedir ao modelo em cada momento, o que ele tem que lhe entregar, e como saber — sem
ler código — que o que ele entregou está completo.

Serve para você se é uma destas pessoas:

- Tem um negócio, um consultório, uma consultoria pequena, e quer seu próprio sistema sem
  contratar uma equipe de desenvolvimento.
- É consultor ou freelancer de automação e seus clientes pedem "algo mais" do que um robô.
- Sabe programar, mas quer que o modelo faça o trabalho pesado e você fique com as decisões.
- Já "vibecodou" algo, funcionou duas semanas, e no mês três caiu.

Não serve para você se o que quer é um protótipo para uma demo de sexta-feira. Para isso há
ferramentas mais rápidas, e este método vai lhe parecer lento. O método é para o que tem que
continuar funcionando depois da demo.

### O que você vai ter no final

Uma aplicação sua, rodando em produção, com: testes que foram vistos falhar antes de passar;
testes de ponta a ponta de todos os fluxos; implantação reproduzível com caminho de volta;
configuração e segredos fora do repositório; as decisões de negócio escritas com data; uma
árvore semântica do sistema e a especificação detalhada de cada coisa que foi construída, em suas
pendências; cadeados em tudo o que cobra, envia ou apaga; três manuais que uma pessoa pode seguir
sem IA; uma auditoria feita por um agente diferente do que construiu; e uma retrospectiva com
números. Isso é o que aqui chamo "production grade": não é que funcione, é que **pode ser
sustentado**.

E você vai ter algo mais, que é o que de verdade leva: o reflexo de não acreditar no modelo sem
evidência, e de saber exatamente que evidência pedir a ele em cada passo.

### O que você precisa

1. **Uma ferramenta de IA para programar.** Qualquer uma que possa ler e escrever arquivos no seu
   repositório e executar comandos: Claude Code, Cursor, Codex CLI, Gemini CLI, Forge. O método
   não depende de qual; o documento principal tem uma tabela de onde vai cada artefato em cada
   ferramenta. Neste manual digo "o agente" para me referir à que você usar.
2. **Uma conta no GitHub** (ou equivalente) e noções mínimas do que é um repositório, um commit e
   um push. Se não as tem, dedique uma tarde antes de começar; qualquer tutorial introdutório
   basta. Não precisa de mais.
3. **Um projeto.** O ideal é que seja seu: um sistema de que você precisa ou que um cliente lhe
   pediu, com usuários que vão usá-lo. Se não tem um, use o **projeto-guia** que descrevo abaixo;
   está pensado para passar pelos vinte e quatro degraus sem pular nenhum. Se o que você tem é um
   sistema que já existe e é preciso corrigir ou fazer crescer, esta primeira parte lhe ensina o
   método sobre um projeto novo, e a [parte 2 do curso](MANUAL_CURSO_EVOLUTIVO.md) lhe ensina a
   normalizá-lo primeiro, com um segundo projeto-guia herdado.
4. **Tempo.** O curso tem vinte e quatro lições, uma por degrau, e uma ordem que diz em que
   etapa cai cada coisa (ver "A ordem do curso"). Não lhe dou prazos, de propósito: o método é
   um processo, não uma promessa de velocidade, e quanto demora cada etapa é o tamanho do seu
   projeto que põe. O que eu lhe dou é a ordem, e essa não se negocia.
5. **Um dono do domínio com tempo para decidir.** Se o projeto é seu, é você. Se é de um cliente,
   é o cliente, e ele tem que saber que vai ter que responder perguntas durante todo o projeto.
   Este ponto não é negociável: sem dono que decida, o modelo decide, e aí o método quebra.

### Como se faz o curso

Cada lição tem a mesma estrutura:

- **O que você tem que entender**: o conceito, explicado como se explica a uma pessoa.
- **A tarefa**: passo a passo, com o prompt exato que você vai dar ao agente (em inglês, porque os
  modelos seguem instruções com mais precisão em inglês; cada um traz sua tradução, e abaixo está
  explicado o que você está pedindo) e o que fazer com o que ele devolver. Antes de cada prompt
  há um bloco que diz **"Antes de enviar o prompt"**: os arquivos e os insumos que você tem que
  ter feito com as suas mãos antes de colá-lo. Não o pule: o prompt nomeia esses arquivos, e se
  não existem ou estão vazios, o agente vai inventá-los ou vai pedi-los a você.
- **A verificação de completude**: a lista de perguntas que você se faz sobre o que o agente
  entregou, sem abrir o código. Se alguma dá "não", a lição não está terminada.
- **A entrega**: o arquivo ou a evidência que tem que existir no final.
- **Erros típicos**: o que acontece com quase todos na primeira vez.
- **No projeto-guia**: como se vê esta lição aplicada ao projeto de exemplo.

Uma regra para todo o curso: **não avance ao degrau seguinte com uma verificação em "não"**. A
tentação de "depois eu arrumo" é exatamente o que o método existe para evitar. Se um degrau não
é subido completo, o seguinte se constrói sobre areia.

### A ordem do curso: quando se faz cada coisa

O documento principal tem, na sua Parte B, a linha do tempo completa do método. Aqui a traduzo
para a ordem do curso para o projeto-guia. São etapas, não semanas: cada uma dura o que o seu
projeto pedir, e o que não é negociável é a ordem e, sobretudo, o que acontece entre lição e
lição.

| Etapa | Lições | O que você faz além das lições |
|---|---|---|
| 0 | nenhuma | **Ingestão**: você entrevista o dono e escreve em prosa o que ele quer, para quem, o que acontece hoje, o que tem consequências, que números só ele sabe. Nomeia os casos de uso que puder ("a recepcionista registra uma consulta"), desenha as telas principais mesmo que à mão, e lista as entidades do negócio com seus estados. Incompleto de propósito. |
| 1 | 0, 1, 2, 3, 4 | **Arranque, de uma vez.** Elegibilidade, contrato, definição com árvore semântica, dimensionamento, e o esqueleto com **toda a infraestrutura e a cadeia de integração e implantação**: repositório, ambiente de teste, integração contínua, primeira implantação vazia. No fechamento, você abre a URL e vê a tela vazia. |
| 2 | 5, 6, 8, 10 | **Primeiro bloco funcional** (a agenda básica). Você abre o bloco convertendo o pedido em pendências especificadas. Com cada pendência: decisões, teste em vermelho, teste de ponta a ponta do fluxo, captura da tela que você olha. No fechamento do bloco: bateria completa de ponta a ponta, e você usa o sistema no ambiente de teste seguindo os fluxos do bloco. |
| 3 | 7, 9, 11, 12 | **Segundo bloco** (pacientes e busca). As quatro lições restantes do ciclo se aprendem sobre este bloco. Mesmo fechamento: ponta a ponta de todos os fluxos, testes humanos, manual de usuário com as telas novas. |
| 4 | 13, 14 | **Saída para produção, primeira metade.** Auditoria por outra sessão. Cadeados. E só depois, o **terceiro bloco** (lembretes e sinal), construído com o ciclo completo e deixado em modo de ensaio. |
| 5 | 15, 16, 17, 18, 19, 20 | **Saída para produção, segunda metade.** Fechamento da cadeia para produção com caminho de volta provado. Observabilidade com nível configurável, persistência medida antes e depois, varredura de vulnerabilidades como comporta, teste de carga com o ponto de ruptura. Os três manuais; alguém que não programa segue o de recuperação. **Testes de aceitação** seus ou do dono sobre todos os fluxos. Primeira implantação em produção sem usuários. |
| 6 | 21, 22, 23 | **Operação.** Você habilita os lembretes depois de olhar o registro de ensaio. Os dois monitoramentos montados com a implantação: recursos e desempenho, erros; o primeiro relatório cíclico lido com o dono. Agente residente. Retrospectiva com números e proposta de mudança à escada. |

Se o seu projeto é maior, o que cresce são as etapas 2 e 3 (mais blocos), não a 1 nem a 4 e 5.
E se em algum momento você se encontrar fazendo infraestrutura na etapa 3, ou rodando a bateria
de ponta a ponta pela primeira vez na etapa 5, volte à ordem: algo foi pulado.

### O projeto-guia: "Turnera"

Se você não tem projeto próprio, use este. É pequeno, mas tem tudo o que é preciso para que
nenhum dos vinte e quatro degraus seja de mentira: usuários reais, dados pessoais, mensagens que
saem para o mundo, e dinheiro.

**O negócio.** Um consultório (pode ser um escritório, um salão de beleza, uma oficina: qualquer
lugar que marca horários). Hoje as consultas se anotam num caderno e se confirmam pelo WhatsApp à
mão. Perdem-se consultas porque as pessoas esquecem, há consultas duplicadas porque duas pessoas
anotaram em cadernos diferentes, e ninguém sabe quantas consultas foram canceladas no mês
passado.

**O que querem.** Uma agenda web onde as duas recepcionistas e os três profissionais vejam as
consultas; lembretes automáticos 24 horas antes, por WhatsApp ou e-mail; a possibilidade de pedir
um sinal por link de pagamento para certas consultas; e um par de números no final do mês
(quantas consultas, quantas ausências, quantos sinais).

**O dono.** A encarregada do consultório. Tem critério sobre o negócio (sabe que consultas levam
sinal, com quanta antecedência se pode cancelar, o que se diz a um paciente que faltou três
vezes) e tem quinze minutos por dia para responder perguntas. Não programa, e não vai ler código.

**Os números que só ela sabe.** Umas quarenta consultas por dia, duzentos e cinquenta dias por
ano. Umas três mensagens por consulta (confirmação, lembrete, às vezes remarcação). Os dados dos
pacientes se conservam cinco anos. O pico é segunda-feira de manhã, com as duas recepcionistas
registrando ao mesmo tempo. E uma pergunta que ela não sabe responder e que importa: se isto
funcionar, vão vender para outros consultórios? (A resposta muda o dimensionamento por dez.)

**O que tem consequências.** Enviar um lembrete (se for enviado duas vezes, incomoda; se for
enviado ao número errado, é um problema de privacidade). Cobrar um sinal (dinheiro). Cancelar uma
consulta (irreversível para o paciente que a perde). Apagar um paciente (dados pessoais).

**Os casos de uso que a encarregada nomeia**, tal como ela diz: "registro uma consulta", "procuro
um paciente", "cancelo uma consulta", "o lembrete chega ao paciente", "peço o sinal", "vejo
quantas consultas houve este mês". São seis; serão os fluxos de ponta a ponta.

Com isso basta para começar. Todo o resto o agente vai perguntar, e faz parte do exercício que
ele pergunte.

---

## Fase de arranque: lições 0 a 4

Estas cinco lições se fazem uma vez por projeto, na etapa 1, antes de escrever funcionalidade.
São as que mais tentação dão de pular ("quero ver algo funcionando"), e são as que mais caro
custa pular. Faça-as de uma vez, e só depois abra o ciclo.

### Lição 0 — Este projeto pode ser encarado assim?

**O que você tem que entender.** O método não serve para qualquer projeto, e saber disso antes de
começar é a primeira decisão de qualidade. Há duas condições sem as quais não funciona: que haja
um repositório padrão onde deixar a evidência (X1), e que as telas possam ser operadas por
programa para testar de ponta a ponta, desde a tela até o backend (X2). Se qualquer uma das duas
falha, o agente não vai poder se verificar sozinho, e então você vai acabar lendo código, que é
justo o que o método promete evitar. As duas eu tirei de projetos que recusei
[Ref. 46](REFERENCIAS.md#ref-46). Depois há critérios que ponderam (se há um dono com tempo, se
o erro tem consequências, se é possível testar num ambiente à parte, etc.), que ainda estou
calibrando.

Para o projeto-guia as duas condições se cumprem: é um projeto novo (não há legado) e vamos
construí-lo com uma interface web operável por programa. Para um projeto próprio, esta lição pode
terminar em "não vai", e isso é um resultado válido do curso.

**A tarefa.**

**Antes de enviar o prompt**, com as suas mãos (o agente não pode fazer isto por você):

- `docs/INITIAL_SURVEY.md`: você o escreve à mão, a partir da ingestão da etapa 0: o que o
  cliente quer, para quem, o que acontece hoje sem o sistema, que tecnologia há ou se propõe, se
  há um sistema anterior e se tem repositório, se as telas vão poder ser operadas por programa,
  quem é o dono e quanto tempo tem, que consequência tem um erro, que ambientes vai haver. Meia
  página. Não importa que esteja incompleto; de fato, faz parte do exercício que esteja
  incompleto, e o que você não sabe escreve como "não sei".
- `docs/ELIGIBILITY_CRITERIA.md`: copie a ficha de critérios do documento principal (os
  excludentes X1 e X2 e os candidatos), com as colunas de resposta, fonte e verde ou vermelho
  vazias. Não a preencha você: quem a preenche é o agente.
- A pasta do projeto, ainda vazia salvo esses dois arquivos, com o agente aberto ali.
- O conteúdo completo de cada arquivo está no contrato do degrau 0, no mesmo bloco.

1. Cole este prompt:

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

   Você está pedindo que leia os dois arquivos, que **avalie se o levantamento basta e pergunte o
   que faltar antes de responder** (esta cláusula se repete em todos os prompts do curso; é o
   coração do método), que preencha a ficha dizendo de onde sai cada resposta, e que não decida:
   a decisão é sua.

2. Responda às perguntas dele. Se não fez nenhuma, desconfie e pergunte o que ele supôs.
3. Quando ele apresentar a ficha, leia e decida.

**Antes de enviar o prompt** de fechamento: a sua decisão em uma linha (vai, não vai, ou vai com
condições, cada condição verificável e não mais de três), e as respostas que você deu às
perguntas dele nesta mesma sessão, porque o prompt pede que as inclua.

4. Cole o prompt de fechamento:

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.

> [pt]
> Decisão: [vai / não vai / vai com estas condições: …]. Escreva a ficha final em
> `docs/ELIGIBILITY.md` com a data, quem decidiu, a resposta a cada critério com sua fonte, e as
> condições, se houver. Inclua as perguntas que você fez e as minhas respostas.

**Verificação de completude.** Abra `docs/ELIGIBILITY.md` e pergunte-se: os dois excludentes têm
resposta explícita e fonte? Há algum critério respondido com "provavelmente"? (Se há, o agente
tinha que perguntar.) A decisão tem data e nome? As condições, se houver, podem ser verificadas?
Estão as perguntas que ele fez e as suas respostas?

**Entrega.** `docs/ELIGIBILITY.md`, de uma página.

**Erros típicos.** Escrever o levantamento "completo" para que o agente não pergunte: você perde
o exercício e, pior, se acostuma a fazer o trabalho do modelo. Responder "vai" com cinco
condições: é um "não vai" disfarçado. E o mais comum: pular a lição porque "é óbvio que vai". O
óbvio é o que não se escreve, e o que não se escreve é o que depois se discute.

**No projeto-guia.** O agente deveria perguntar, no mínimo, se a interface vai ser web ou móvel
(porque X2 depende disso), se há um sistema anterior mesmo que seja um Excel, e que canal de
mensagens vai ser usado (o WhatsApp tem requisitos que o e-mail não tem). A ficha termina em
"vai", com uma condição razoável: ter o canal de mensagens definido antes do degrau 14.

### Lição 1 — O contrato de convivência

**O que você tem que entender.** O agente chega a cada sessão sem memória da anterior. É como um
colaborador novo a cada manhã. O contrato de convivência é o que você diz a ele no primeiro dia e
o que ele vai reler todos os dias: como você trabalha, o que não tolera, que nível de autonomia
dá a ele. Sem contrato, você vai repetir as mesmas coisas a cada sessão, e a cada vez um pouco
diferente. Eu o escrevi pela primeira vez depois de duas semanas me repetindo
[Ref. 1](REFERENCIAS.md#ref-1).

As seis regras mínimas têm cada uma uma falha por trás: "meu tempo é sagrado" evita que ele lhe
consulte cada detalhe; "zero dívida" evita o "depois eu arrumo"; "escopo exato" evita que "já que
está aí" ele lhe acrescente coisas; "documentação no mesmo commit" evita os manuais velhos;
"nunca relatar como feito o não verificado" evita o "pronto" que não era; "fale o meu idioma"
evita que ele responda em inglês porque o prompt estava em inglês.

**A tarefa.**

**Antes de enviar o prompt**, com as suas mãos:

- As suas preferências de trabalho, pensadas cinco minutos e anotadas numa lista curta (num
  papel, ou em `docs/MY_PREFERENCES.md`): prefere que ele pergunte muito ou pouco? Em que idioma?
  Que nível de autonomia dá a ele (commits sozinho, implantação em teste sozinho, produção
  nunca)? O que lhe tira do sério em trabalhar com outras pessoas? Você vai contar a ele quando
  perguntar; a lista é para não improvisar.
- A pasta do projeto com o agente aberto ali. Nada mais: é o primeiro arquivo do projeto.

1. Cole este prompt:

> Before we write any code, we are going to set the working agreement between you and me.
> Write `docs/WORKING_AGREEMENT.md` with at least these rules, each with one line explaining
> what it prevents: (1) My time is sacred: do not ask me what you can resolve on your own, and
> when you do ask, ask in prose, with your recommendation. (2) Zero technical debt: whatever
> breaks is fixed at the root, with its regression test, in the same session. (3) Exact scope:
> no more and no less than what was asked; if you see something else, log it as a pending item,
> do not do it. (4) Documentation is updated in the same commit as the change. (5) Never report
> as done something you have not verified; always separate what you verified from what you
> believe. (6) Speak my language. Add any rules you think this project needs, marked as
> proposals. If you need to know something about how I work in order to write this, ask me.

> [pt]
> Antes de escrever código, vamos fixar o contrato de convivência entre você e eu. Escreva
> `docs/WORKING_AGREEMENT.md` com pelo menos estas regras, cada uma com uma linha que explique o
> que evita: (1) Meu tempo é sagrado: não me pergunte o que você pode resolver sozinho, e quando
> perguntar, pergunte em prosa, com a sua recomendação. (2) Zero dívida técnica: o que quebra se
> conserta na raiz, com seu teste de regressão, na mesma sessão. (3) Escopo exato: nem mais nem
> menos do que o pedido; se vir outra coisa, anote como pendência, não faça. (4) A documentação se
> atualiza no mesmo commit que a mudança. (5) Nunca relate como feito algo que você não verificou;
> separe sempre o que verificou do que acredita. (6) Fale o meu idioma. Acrescente as regras que
> achar que este projeto precisa, marcadas como propostas. Se precisar saber algo sobre como eu
> trabalho para escrever isto, pergunte-me.

   Você está pedindo as seis regras com a falha que cada uma evita, regras próprias marcadas como
   propostas para que você as aceite ou rejeite, e que ele pergunte sobre você.

2. Responda às perguntas. Leia as propostas: aceite as que lhe servirem, rejeite as que não,
   sempre com uma razão de uma linha.

**Antes de enviar o prompt** de fechamento: o seu veredicto sobre cada proposta do agente,
escrito: quais você aceita [X, Y], quais rejeita [Z] e por quê, em uma linha cada uma. Vai nos
buracos do prompt, e quem os preenche é você.

3. Feche com:

> I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the
> agreement with today's date and a version number. Then add to the project file the
> instruction to read this agreement at the start of every session.

> [pt]
> Aceito as regras 1 a 6 e as suas propostas [X, Y]; rejeito [Z] porque [razão]. Feche o contrato
> com a data de hoje e um número de versão. Depois acrescente ao arquivo de projeto a instrução
> de ler este contrato ao começar cada sessão.

   Se ainda não há arquivo de projeto (você faz isso na lição 2), ele vai criar um mínimo com
   essa instrução; está bem.

**Verificação de completude.** Estão as seis regras, cada uma com a falha que evita? Há alguma
escrita como aspiração ("tentar…")? O arquivo de projeto ordena lê-lo ao começar cada sessão?
Ele lhe fez pelo menos uma pergunta sobre como você trabalha?

**Entrega.** `docs/WORKING_AGREEMENT.md` com data e versão, engatado ao arquivo de projeto.

**Erros típicos.** Aceitar vinte regras porque todas soam bem: ninguém respeita vinte; seis ou
oito se respeitam. Deixar uma regra que diga que o agente pode mudar o contrato: não. E o mais
silencioso: nunca provar se ele o lê. Na lição 2 você vai ver como.

**No projeto-guia.** Uma regra própria que o agente costuma propor para a Turnera, e que vale a
pena aceitar: "nunca envio uma mensagem real a um paciente a partir de um ambiente que não seja
produção; em teste, as mensagens vão para uma caixa falsa". É o degrau 14 aparecendo cedo.

### Lição 2 — A definição do projeto, a árvore semântica e a leitura obrigatória

**O que você tem que entender.** O arquivo de projeto (`PROJECT.md`, ou `CLAUDE.md`, ou o nome
que a sua ferramenta usar) é o mapa que o agente lê ao começar cada sessão. Tem que ser
**curto**: o que é o sistema, para quem, o que NÃO é, os módulos, as decisões tomadas com data, e
a ordem de ler o contrato. O que aconteceu cada dia não vai ali: vai para o estado vivo
(`docs/STATUS.md`) e para o registro de pendências. Um dos meus sistemas deixou este arquivo
crescer até mais de nove mil linhas; nesse estado, ninguém o lê, e o modelo também não
[Ref. 41](REFERENCIAS.md#ref-41).

Mas o mapa tem uma segunda peça, e é a que mais trabalho faz: a **árvore semântica**. É o sistema
decomposto como uma árvore: os domínios no primeiro nível, e abaixo de cada um seus atores, seus
processos (os casos de uso que você nomeou na ingestão, com ator, gatilho, passos, resultado e
exceções), suas entidades com seus atributos e seus estados, suas telas e suas integrações
externas. É o modelo de domínio da engenharia de requisitos de toda a vida, posto em forma de
árvore para que o modelo o leia. De cada nó vão pender as pendências e as decisões que o tocam.
Seu valor é duplo: dá ao agente o contexto exato do nó que vai tocar, e dá a você uma forma de
verificar, sem ler código, que o sistema que o agente entende é o que o negócio pediu. Se a
árvore tem um estado que o negócio nunca nomeou, o modelo o inventou, e você vai vê-lo antes que
ele construa sobre ele.

A seção "o que NÃO é" continua sendo a mais importante e a que todos deixam vazia. O que não
está escrito é o que o modelo vai inventar quando encontrar um buraco.

**A tarefa.**

**Antes de enviar o prompt**, com as suas mãos:

- `docs/INITIAL_SURVEY.md`, completado com o que você aprendeu na lição 0 (as respostas às
  perguntas do agente) e com o levantamento do negócio: quem usa o sistema, que problema resolve,
  uma seção "o que o sistema NÃO tem que fazer" mesmo que com dois itens, os casos de uso que o
  dono nomeia com as palavras dele, as entidades com seus estados, os desenhos das telas mesmo
  que sejam fotos de um papel, as integrações externas, e as decisões já tomadas, com data. Se
  usou um método de ingestão (entrevistas, casos de uso, histórias de usuário, protótipos), diga
  qual e cole o resultado.
- `docs/WORKING_AGREEMENT.md`, fechado (lição 1).
- Se há um sistema anterior, acesso de leitura ao seu código ou à sua documentação, anotado no
  levantamento.

1. Cole:

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

   Você está pedindo que ele pergunte antes de redigir, um arquivo de projeto curto com a seção
   "o que não é", a árvore semântica com sua estrutura completa e com os nós inferidos marcados,
   e o estado vivo em outro arquivo.

2. Leia `PROJECT.md` inteiro. Tem que caber em cinco minutos. Corrija o que não for verdade ou
   não for seu.
3. Percorra a árvore semântica como se fosse o cliente. Olhe cada nó marcado como inferido e
   confirme-o ou corrija-o. Procure atores que faltem, estados de entidade que o negócio não usa,
   telas que você não pediu.

**Antes de enviar o prompt** de fechamento: `PROJECT.md` lido inteiro por você, a árvore
percorrida nó por nó com um veredicto para cada nó inferido, e a lista de correções escrita para
o buraco [lista] do prompt. Se a lista estiver vazia na primeira vez, desconfie da sua leitura.

4. Feche com:

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

5. **A prova de leitura.** Feche a sessão do agente e abra uma nova. Sem dizer mais nada, peça:
   "O que este sistema não tem que fazer? E de que nó da árvore pende a tela da agenda?". Se ele
   responde com o que dizem `PROJECT.md` e a árvore, o engate funciona. Se responde qualquer
   outra coisa, não está lendo o mapa: revise como a sua ferramenta carrega o arquivo de projeto.

**Verificação de completude.** `PROJECT.md` se lê em cinco minutos? Diz o que o sistema NÃO faz?
A árvore tem todos os atores que você conhece, e cada entidade tem os estados que o negócio usa,
nem mais nem menos? Você confirmou ou corrigiu todos os nós inferidos? Cada decisão tem data e
quem a tomou? O agente perguntou algo antes de redigir? O estado vivo está em outro arquivo?
Passou na prova de leitura?

**Entrega.** `PROJECT.md` (máximo trezentas linhas), `docs/SEMANTIC_TREE.md` com os nós
confirmados, `docs/STATUS.md`, e a prova de leitura passada.

**Erros típicos.** Colar em `PROJECT.md` toda a especificação que você já tinha: é o programa,
não a especificação. Deixar "o que não é" vazio. Aceitar a árvore sem percorrê-la: o modelo
infere estados e telas com uma naturalidade que dá medo, e cada nó inventado é funcionalidade
que ele vai construir sem que ninguém a tenha pedido. E não fazer a prova de leitura: é a única
forma de saber que o degrau 1 e o 2 estão agindo e não só existindo.

**No projeto-guia.** Em "o que NÃO é" da Turnera deveriam estar, no mínimo: não é um sistema de
prontuário (não guarda dados médicos), não é um gateway de pagamentos (usa um link de pagamento
de um provedor, não processa cartões), e não envia mensagens de marketing (só confirmações e
lembretes). A árvore tem um domínio "Agenda" com os atores recepcionista e profissional, os
processos "registrar consulta", "cancelar consulta" e "procurar paciente", as entidades Consulta
(com estados pendente, confirmada, cancelada, ausente) e Paciente, e as telas "agenda do dia" e
"ficha do paciente"; um domínio "Mensagens" com o processo "enviar lembrete", a entidade Mensagem
e a integração com o provedor de WhatsApp; e um domínio "Pagamentos" com "pedir sinal" e a
integração com o provedor de pagamentos. Se o agente lhe acrescenta um estado "remarcada" à
consulta, pergunte de onde ele tirou: a encarregada não o nomeou. Talvez seja necessário, talvez
não; você decide, não ele.

### Lição 3 — Dimensionar antes de desenhar a arquitetura

**O que você tem que entender.** Há decisões que, tomadas mal, custam semanas: que banco de
dados, se as chamadas ao banco são síncronas ou assíncronas, quanta gente pode usar o sistema ao
mesmo tempo. E todas dependem de números que **só o negócio tem**: quantas consultas por dia,
quantas mensagens por consulta, quantos anos se guarda. O modelo não pode inferir esses números;
pode inferir o que se deriva deles (linhas por ano, tamanho em cinco anos). Por isso o prompt
exige que ele distinga dados primários de derivados, e **peça os primários que faltam em vez de
estimá-los**. Quando o modelo estima um dado primário, faz isso com a mesma cara de quem tem
certeza de quando calcula; e você não tem como distinguir pelo tom. A mim custou uma etapa
inteira de reengenharia não ter feito isso a tempo [Ref. 15](REFERENCIAS.md#ref-15).

Há além disso um tipo de decisão que convém tomar sempre: as **assimétricas**, baratas se sobram
e caríssimas se faltam. O exemplo canônico é fazer a interface com o banco de dados assíncrona
desde o primeiro dia mesmo que o primeiro banco seja um arquivo: se você nunca muda de banco,
sobrou um `await`; se muda, economizou reescrever tudo.

**A tarefa.**

**Antes de enviar o prompt**, com as suas mãos e com o dono:

- `docs/VOLUME_SURVEY.md`: sente-se com o dono (ou com você mesmo, se o projeto é seu) e escreva
  as entidades principais (as da árvore semântica) e quantas há, quantas se acrescentam por mês,
  quantos eventos por entidade, quantas pessoas operam no pico e quando é o pico, quanto tempo se
  conservam os dados, se há cargas excepcionais, que crescimento esperam. Para cada número, anote
  de onde sai: "a encarregada disse", "contado no caderno de setembro", "suposição". Deixe alguns
  em "suposição" de propósito: você vai ver o que o agente faz com eles.
- `PROJECT.md` e `docs/SEMANTIC_TREE.md`, fechados (lição 2).
- Se há um sistema anterior com banco de dados, um acesso de somente leitura para que o agente
  tire números reais, com a string de conexão fora do repositório.

1. Cole:

> Before proposing any architecture we are going to size the system. Read `PROJECT.md` and the
> volume survey in `docs/VOLUME_SURVEY.md`. Distinguish primary data (facts only the business
> knows) from derived data (what can be computed from the primary data). Evaluate whether the
> primary data is complete enough to compute what follows; if any primary figure is missing, or
> is marked as an assumption, ask me for all the missing figures before going on. Never estimate
> a primary figure. If a previous system can be queried, use its real numbers and state where
> each came from. With the primary data complete, compute, showing the arithmetic: rows per year
> for the three largest tables, peak concurrency, data size at five years, and what breaks first
> if everything is multiplied by ten. Then present three options for persistence and concurrency,
> each with the cost of migrating to the others later. Do not choose: I choose. Do not write code.
> Reply in my language.

> [pt]
> Antes de propor qualquer arquitetura vamos dimensionar o sistema. Leia `PROJECT.md` e o
> levantamento de volumetria em `docs/VOLUME_SURVEY.md`. Distinga os dados primários (fatos que
> só o negócio sabe) dos derivados (o que se pode calcular a partir dos primários). Avalie se os
> dados primários estão completos o bastante para calcular o que segue; se falta algum dado
> primário, ou está marcado como suposição, peça-me todos os que faltam antes de seguir. Nunca
> estime um dado primário. Se for possível consultar um sistema anterior, use seus números reais
> e diga de onde sai cada um. Com os primários completos, calcule, mostrando a conta: linhas por
> ano das três maiores tabelas, concorrência no pico, tamanho dos dados em cinco anos, e o que
> quebra primeiro se tudo for multiplicado por dez. Depois apresente três opções de persistência
> e concorrência, cada uma com o custo de migrar para as outras mais adiante. Não escolha: eu
> escolho. Não escreva código. Responda no meu idioma.

   Você está pedindo: distinguir primários de derivados; **pedir a você os primários que faltam
   ou estão em "suposição", e nunca estimá-los**; calcular o derivado com a conta à vista; o
   cenário "por dez"; três opções com o custo de mudar de uma para outra; e que não escolha.

2. Se ele pede as "suposições", bem: esse era o exercício. Consiga os números (pergunte ao dono,
   conte no caderno) e dê a ele. Se não pediu e calculou do mesmo jeito, pare e pergunte o que
   ele fez com as suposições: é uma falha do degrau e convém vê-la agora.
3. Leia as três opções. Refaça uma conta à mão (por exemplo, linhas por ano da maior tabela): tem
   que dar o mesmo. Escolha.

**Antes de enviar o prompt** de fechamento: as suposições convertidas em dados com fonte, uma
conta refeita à mão por você que coincide com a do agente, e a opção escolhida com uma razão de
uma linha.

4. Feche com:

> I choose option [B]. Record in `docs/SIZING.md`: the primary data with its source, the derived
> data with its arithmetic, the three options, the chosen one and why, and the decisions we are
> taking "just in case" even though they are not needed today (for example: the persistence
> interface is asynchronous from line one, even if the first engine is synchronous). Include the
> questions you asked and my answers.

> [pt]
> Escolho a opção [B]. Registre em `docs/SIZING.md`: os dados primários com sua fonte, os
> derivados com sua conta, as três opções, a escolhida e por quê, e as decisões que tomamos "por
> precaução" mesmo que hoje não sejam necessárias (por exemplo: a interface de persistência é
> assíncrona desde a linha um, mesmo que o primeiro motor seja síncrono). Inclua as perguntas que
> você fez e as minhas respostas.

**Verificação de completude.** Há algum dado primário com fonte "suposição" ou sem fonte? Cada
dado derivado mostra a conta, e dá o mesmo se você a refaz? Há três opções e uma escolhida com
razão? Diz o que acontece "por dez"? As decisões assimétricas estão escritas? Ele lhe perguntou?

**Entrega.** `docs/SIZING.md`.

**Erros típicos.** Completar o levantamento com números inventados por você para que o agente
não pergunte (é o mesmo erro da lição 0, e é pior aqui porque esses números decidem a
arquitetura). Escolher a opção "mais potente" por precaução: o custo de migrar está na tabela
justamente para que você escolha a menor que aguente o "por dez". E não escrever as decisões
assimétricas: se não estão escritas, na lição 4 o agente não vai respeitá-las.

**No projeto-guia.** Primários: 40 consultas/dia × 250 dias = 10.000 consultas/ano; 3 mensagens
por consulta = 30.000 mensagens/ano; 5 anos de conservação; pico de duas recepcionistas
simultâneas. O "por dez" é a pergunta de se se vende a outros consultórios: 100.000 consultas e
300.000 mensagens por ano. As três opções típicas: um arquivo SQLite (basta para um consultório
durante anos, não aguenta o por dez com vários escrevendo), PostgreSQL desde o começo (aguenta
tudo, custa um pouco mais de infraestrutura), ou SQLite agora com a interface assíncrona e uma
migração prevista para PostgreSQL (a assimétrica). Para o curso escolhemos a terceira: é a que
ensina mais.

### Lição 4 — O esqueleto com suas comportas

**O que você tem que entender.** Antes de o sistema fazer algo útil, tem que arrancar, ser testado
e ser implantado **vazio**. Parece uma perda de tempo ("implantar o quê, se não há nada?") e é o
contrário: o caminho para a produção é parte do produto, e a única forma de saber que funciona é
percorrê-lo quando ainda não há nada a perder. Num dos meus sistemas a implantação chegou um mês
depois do arranque e custou cinco pendências seguidas [Ref. 32](REFERENCIAS.md#ref-32); com o
esqueleto implantado no arranque, esses cinco tropeços teriam acontecido em vazio.

Esta lição é, além disso, **onde se faz toda a infraestrutura e a cadeia de integração e
implantação** do projeto. Você não vai voltar a tocá-la até a lição 15, e no meio vai construir
toda a funcionalidade sobre ela. Por isso ocupa a maior parte da etapa 1.

As **comportas** são as condições para passar de uma etapa a outra ("a bateria está em verde", "a
implantação em teste funcionou"). Escrevê-las agora, mesmo que pareçam óbvias, é o que depois
permite dizer "isto não passa" sem discutir.

**A tarefa.**

**Antes de enviar o prompt**, com as suas mãos:

- `docs/ENVIRONMENTS_SURVEY.md`: onde o sistema vai rodar (um servidor que você já tem, um
  serviço na nuvem), se vai haver um ambiente de teste e um de produção, quem tem acesso a quê,
  como se implanta hoje se há algo, e o tipo de projeto (novo, correção ou evolução). Se não tem
  nada, diga: o agente vai lhe propor a opção mais simples. O prompt o nomeia "the environments
  survey", sem caminho: diga como se chama.
- As credenciais do lugar onde vai ser implantado, mesmo que seja um serviço gratuito: criadas,
  testadas por você entrando no painel, e guardadas fora do repositório; ao agente você diz onde
  estão, não as cola no chat. Sem isso, o esqueleto fica na sua máquina e a lição não pode ser
  terminada.
- `PROJECT.md` e `docs/SIZING.md`, fechados (lições 2 e 3).

1. Cole:

> We are going to build the skeleton of the system, with no functionality at all. Read
> `PROJECT.md`, `docs/SIZING.md` and the environments survey. Evaluate whether you have what is
> needed for the skeleton to run in the test environment (access, URL, deployment method); if
> anything is missing, ask me before starting. Then build: the folder structure; the server and
> the UI starting up; the test structure with one smoke test that passes; continuous
> integration running that test suite on every push; and the deployment to the test
> environment. Declare the gates of the workflow (what must be green to move from one stage to
> the next) in `docs/GATES.md`. When done, take a screenshot of the empty UI running in the
> test environment and show it to me. Do not add any functionality "while you are at it".
> Reply in my language.

> [pt]
> Vamos construir o esqueleto do sistema, sem nenhuma funcionalidade. Leia `PROJECT.md`,
> `docs/SIZING.md` e o levantamento de ambientes. Avalie se você tem o necessário para que o
> esqueleto rode no ambiente de teste (acesso, URL, forma de implantar); se faltar algo, peça-me
> antes de começar. Depois construa: a estrutura de pastas; o servidor e a interface arrancando;
> a estrutura de testes com um teste de fumaça que passa; a integração contínua rodando essa
> bateria em cada push; e a implantação no ambiente de teste. Declare as comportas do fluxo (o
> que tem que estar em verde para passar de uma etapa à seguinte) em `docs/GATES.md`. Quando
> terminar, tire uma captura da interface vazia rodando no ambiente de teste e mostre-a para
> mim. Não acrescente nenhuma funcionalidade "já que está aí". Responda no meu idioma.

   Você está pedindo que ele verifique acessos antes de começar, a lista exata do que é um
   esqueleto, as comportas escritas, uma captura real do ambiente de teste, e a proibição de
   acrescentar funcionalidade.

2. Esta tarefa é longa e vai ter idas e vindas:
   credenciais que faltam, um serviço que pede para confirmar o e-mail, etc. É normal. O que não
   é normal é que ele diga "pronto" sem a captura do ambiente de teste.
3. Quando ele mostrar a captura, abra você a URL no seu navegador. Tem que se ver o mesmo. É a
   primeira vista humana do sistema, e é um marco.

**Antes de enviar o prompt** de fechamento: a sua visita à URL do ambiente de teste feita, o link
da execução de integração contínua em verde aberto por você, e `docs/GATES.md` lido, com uma
condição verificável por comporta.

4. Feche com:

> Skeleton approved. Record in `docs/STATUS.md` the test environment URL, the command to run
> the tests and the command to deploy, and mark this step as done. Then run the deployment a
> second time and show me that the second run changed nothing.

> [pt]
> Esqueleto aprovado. Registre em `docs/STATUS.md` a URL do ambiente de teste, o comando para
> rodar os testes e o comando para implantar, e marque este passo como feito. Depois rode a
> implantação uma segunda vez e mostre-me que a segunda execução não mudou nada.

**Verificação de completude.** Você abriu a URL do ambiente de teste e viu a tela vazia? Há um
link para uma execução de integração contínua em verde? A implantação foi rodada duas vezes e a
segunda não quebrou nada? As comportas têm cada uma uma condição verificável? Há alguma
funcionalidade que você não pediu?

**Entrega.** O repositório com o esqueleto, a integração contínua em verde, a URL do ambiente de
teste funcionando, `docs/GATES.md`, e `docs/STATUS.md` com os três comandos.

**Erros típicos.** Aceitar "funciona em local, a implantação a gente vê depois": não, a
implantação é o esqueleto. Aceitar uma captura da máquina do agente em vez do ambiente de teste.
E deixar que "já que está aí" ele lhe acrescente uma tela de login, um menu, um logo: cada coisa
que entra sem pendência é escopo que escapou.

**No projeto-guia.** O esqueleto da Turnera é uma página web que diz "Turnera — versão 0.0.1"
rodando numa URL pública de um ambiente de teste, um servidor que responde "ok" numa rota de
saúde, um teste de fumaça que chama essa rota, a integração contínua rodando esse teste em cada
push, e a implantação automática no ambiente de teste. As comportas: "bateria em verde para
fazer merge", "ambiente de teste em verde para promover para produção", "caminho de volta provado
para a primeira implantação em produção". Nada mais. E é estranho o quanto é satisfatório ver
essa página vazia numa URL real.

---

## Fase do ciclo: lições 5 a 12

Estas oito lições são as que você vai usar **com cada mudança**, durante todo o projeto.
Aprendem-se nas etapas 2 e 3 sobre os dois primeiros blocos funcionais, e se praticam até o
final. Vão na ordem em que se fazem com cada pendência: abrir um bloco convertendo o pedido em
pendências especificadas, pegar uma, decidir o que faltar, medir o que houver que medir,
construir, provar em vermelho e de ponta a ponta, passar a comporta de qualidade, escrever os
casos de teste manual, atualizar o outro lado, e relatar separando o verificado do acreditado. No
fechamento do bloco, executar os casos de teste manual você mesmo. Esse reflexo é o método.

Para praticá-las você vai precisar de funcionalidade real. No projeto-guia, o primeiro bloco é a
agenda básica: ver as consultas do dia, registrar uma consulta, cancelá-la. O segundo, pacientes
e busca. Nada de mensagens nem pagamentos ainda; isso vem depois dos cadeados (lição 14).

### Lição 5 — O plano são as pendências, e a especificação detalhada vive em cada uma

**O que você tem que entender.** Não há um "plano" de um lado e uma "lista de tarefas" do outro:
**a lista de pendências é o plano**. Mas há duas ideias mais, e são as que distinguem este método
de uma lista de tarefas qualquer.

A primeira: a **especificação detalhada vive em cada pendência**. No método clássico havia um
documento de especificação de requisitos, longo, que envelhecia antes de ser terminado. Aqui se
decompõe: cada pendência traz o nó da árvore semântica de que pende, a história de usuário ou o
caso de uso que a origina com as palavras do cliente, a descrição detalhada, as regras de negócio
aplicáveis com sua decisão e sua data, os dados que entram e saem, as telas afetadas, os casos de
borda, os critérios de aceitação na forma "dado, quando, então", e como se verifica. Ler a
especificação de uma pendência é o mais perto que você vai estar de ler código, e é exatamente a
distância correta: ali é onde você detecta que o agente entendeu outra coisa, antes que ele
construa.

A segunda: **as pendências fechadas são documentação**. Quando uma pendência se fecha, fica com
sua especificação, a decisão que a originou, a evidência com que se fechou, o commit e a data. A
fila de pendências fechadas é o histórico funcional do sistema, e dali saem o diário de mudanças
e as seções novas do manual. E a regra de ouro para o agente: o que aparece fora da lista se anota
como pendência nova, com sua especificação, não se faz.

**A tarefa.**

**Antes de enviar o prompt**, com as suas mãos:

- O pedido do cliente para o primeiro bloco de funcionalidade, escrito em
  `docs/INITIAL_SURVEY.md` sob um título com o nome do bloco, ou num arquivo à parte (por exemplo
  `docs/blocks/BLOCK_01_REQUEST.md`; o prompt diz "the client's request for this block" sem
  caminho, então diga onde está), tal como o cliente o diria, com suas ambiguidades. Para a
  Turnera: "quero ver as consultas do dia, registrar uma nova e cancelar". Se na ingestão você
  escreveu os casos de uso, cole-os também: são a unidade natural do bloco. Se o dono lhe deu uma
  prioridade, também.
- `docs/SEMANTIC_TREE.md`, `PROJECT.md` e `docs/STATUS.md`, em dia (lição 2).

1. Cole:

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
> why. Reply in my language.

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
> ordem e diga-me por quê. Responda no meu idioma.

   Você está pedindo que ele converta o pedido em itens verificáveis, que **pergunte quando o
   pedido não dá para escrever um verificável**, a especificação completa de cada um campo por
   campo, o nó da árvore de que pende, as regras de negócio com sua decisão ou marcadas como
   faltantes, os critérios de aceitação que depois serão o roteiro do teste, e uma ordem com sua
   razão.

2. Responda às perguntas (para a Turnera ele vai perguntar, por exemplo, o que é "o dia": o de
   hoje, ou qualquer um que se escolha?; cancelar apaga ou marca?). Essas perguntas são decisões
   de negócio; na lição 6 você vai ver onde se escrevem.
3. **Leia a especificação de cada pendência** como se fosse o cliente. Esta é a tarefa mais
   importante da lição, e a que mais tentação dá de pular. Descreve o que você pediu, com as
   suas palavras? Os critérios de aceitação são os que você usaria para dizer "está bom"? Há um
   caso de borda que você conhece e não está? Pende do nó correto? Corrija antes que se construa
   qualquer coisa.
**Antes de enviar o prompt** da rotina: `docs/PENDING.md` com o bloco especificado e lido por
você pendência por pendência, com as suas correções feitas (nenhuma pendência com uma
especificação de uma linha), e `docs/WORKING_AGREEMENT.md`, onde a rotina se acrescenta.

4. Acrescente ao contrato de convivência a rotina de cada sessão. Cole:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before touching any code, open
> `docs/PENDING.md`, tell me which item you are taking and why, and re-read its specification.
> Every commit cites its pending item. A pending item is closed with written evidence (the test
> counts red and green, the screenshot, the measured number), never with 'done'. When you close
> it, keep it in the register with its full specification and add: the evidence, the commit, the
> date, and any decision that was taken along the way; that record is the documentation of what
> was built. If along the way you see something that is not on the list, add it as a new pending
> item with its specification; do not do it."

> [pt]
> Acrescente esta rotina a `docs/WORKING_AGREEMENT.md`: "Antes de tocar em código, abra
> `docs/PENDING.md`, diga-me que pendência você pega e por quê, e releia sua especificação. Cada
> commit cita sua pendência. Uma pendência se fecha com evidência escrita (os números do teste em
> vermelho e em verde, a captura, o número medido), nunca com 'pronto'. Quando fechá-la, deixe-a
> no registro com sua especificação completa e acrescente: a evidência, o commit, a data, e
> qualquer decisão que tenha sido tomada no caminho; esse registro é a documentação do que foi
> construído. Se no caminho você vir algo que não está na lista, acrescente como pendência nova
> com sua especificação; não faça."

5. Agora sim, comece a construir. Peça que ele pegue a primeira pendência. A partir daqui, cada
   sessão começa com "que pendência você pega e por quê", e cada fechamento deixa a pendência
   documentada.

**Verificação de completude.** Leia a especificação de uma pendência ao acaso: tem todos os
campos, e descreve o que você pediu? Cada pendência pende de um nó da árvore que você reconhece?
Cada uma diz como se verifica? Há regras marcadas "faltante, perguntada" que não lhe
perguntaram? Há pendências fechadas sem evidência nem commit? As fechadas conservam sua
especificação e sua documentação de fechamento? Pegue três commits ao acaso: citam sua
pendência? Apareceu no código algo sem pendência?

**Entrega.** `docs/PENDING.md` com o primeiro bloco especificado, a rotina no contrato, e a
primeira pendência em curso.

**Erros típicos.** Aceitar especificações de uma linha: o agente as escreveu para cumprir, e vai
inventar o que falta na hora de construir. Não ler as especificações: é o único momento em que
você pode interceptar um mal-entendido antes que custe. Deixar que o agente feche pendências sem
evidência porque "já vi funcionar". Deixar que feche sem documentar: seis meses depois ninguém
sabe por que o sistema faz o que faz. E o que mais custa corrigir: deixar que ele faça "uma
coisinha a mais" fora da lista. A primeira vez que você deixa, perdeu o escopo exato.

**No projeto-guia.** O primeiro bloco da Turnera são umas seis pendências, penduradas no domínio
"Agenda" da árvore: PND-001 ver as consultas de um dia; PND-002 registrar uma consulta com
paciente, profissional, data e hora; PND-003 impedir duas consultas do mesmo profissional na mesma
hora; PND-004 cancelar uma consulta (marcar, não apagar: decisão da lição 6); PND-005 procurar um
paciente por nome ou telefone; PND-006 o cadastro de paciente com os dados mínimos. A
especificação da PND-003, por exemplo, diz: nó Agenda → processo "registrar consulta" → entidade
Consulta; história: "não pode haver duas consultas do mesmo profissional na mesma hora, aconteceu
comigo duas vezes com o caderno" (palavras da encarregada); regra: "consulta dupla só se o
profissional habilitou" (decisão pendente, perguntada); dados: profissional, data, hora de
início, duração; tela: formulário de registro; casos de borda: consultas que se sobrepõem
parcialmente, consultas de duração diferente; critérios de aceitação: "dada uma consulta do Dr. A
às 10:00, quando tento registrar outra do Dr. A às 10:00, então a tela avisa e o banco não a
guarda"; verificação: teste de ponta a ponta do formulário mais consulta ao banco. Isso é uma
especificação.

### Lição 6 — As decisões se escrevem junto ao código

**O que você tem que entender.** O modelo, quando encontra um buraco nas regras de negócio, **o
preenche**. Não para para perguntar; completa com o que lhe parece mais provável, com a mesma
naturalidade com que escreve o resto. Por isso esta lição não é "escreva as decisões" mas "exija
que ele pare e pergunte quando faltar uma". E quando você decide, a decisão se escreve com as
suas palavras textuais, o seu nome e a data, no commit, na especificação da pendência e num
registro. Eu faço isso desde o primeiro sistema [Ref. 29](REFERENCIAS.md#ref-29); seis semanas
depois, quando alguém perguntar "por que cancelar não apaga?", a resposta está escrita e é sua.

**A tarefa.**

**Antes de enviar o prompt**, com as suas mãos:

- `docs/WORKING_AGREEMENT.md` (lição 1), onde vai a rotina.
- `docs/DECISIONS.md`, criado mesmo que esteja vazio, com o formato no cabeçalho: data, quem
  decidiu, as palavras textuais, a pendência que a necessitava.
- Um acordo com o dono do domínio, se não for você, sobre o canal e o tempo em que ele responde:
  a rotina só funciona se alguém decide em horas, não em semanas.

1. Acrescente ao contrato a rotina de decisões. Cole:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Whenever implementing something requires a
> business rule that is not written down, or you must choose between two approaches that change
> what the user sees, stop and ask me, in prose, with your recommendation and the alternative. Do
> not implement the one you prefer. When I decide, write the decision with my name and the date
> in the commit message, in the pending item's specification and in `docs/DECISIONS.md`, with
> the exact words I used. If I do not answer and you must move on, implement the most reversible
> option and mark it 'decision by omission, pending confirmation', so that I can review it."

> [pt]
> Acrescente esta rotina a `docs/WORKING_AGREEMENT.md`: "Cada vez que implementar algo exigir
> uma regra de negócio que não está escrita, ou você tiver que escolher entre duas abordagens que
> mudam o que o usuário vê, pare e pergunte-me, em prosa, com a sua recomendação e a alternativa.
> Não implemente a que você prefere. Quando eu decidir, escreva a decisão com o meu nome e a data
> na mensagem do commit, na especificação da pendência e em `docs/DECISIONS.md`, com as palavras
> exatas que usei. Se eu não responder e você tiver que seguir, implemente a opção mais
> reversível e marque-a como 'decisão por omissão, pendente de confirmação', para que eu a
> revise."

   Você está pedindo que ele pare diante de uma regra não escrita, que pergunte com recomendação
   e alternativa (para que você possa decidir em dez segundos), que registre as suas palavras
   textuais nos três lugares, e que quando você não responde escolha o mais reversível e o
   marque.

2. Continue construindo as pendências do bloco. Cada vez que ele lhe perguntar uma regra de
   negócio, decida e responda com o formato de fechamento.

**Antes de enviar o prompt** de fechamento: a pergunta do agente lida com a sua recomendação e a
sua alternativa, e a sua decisão redigida numa frase com as palavras exatas que você quer que
fiquem para sempre, consultada com o dono se não for você, com a data. Não se improvisa no chat.

3. Cole:

> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.

> [pt]
> Regra: [texto exato]. Decidida por mim, [data]. Anote e continue.

4. Faça a prova contrária, uma vez, de propósito: deixe uma pergunta sem responder durante uma
   sessão e veja o que ele faz. Tem que escolher o mais reversível e marcá-lo "por omissão". Se
   escolheu o que lhe pareceu e não marcou, é uma falha do degrau: corrija-a no contrato.

**Verificação de completude.** Abra três commits que toquem regras de negócio: citam quem decidiu
e quando? A regra está também na especificação da pendência? Há decisões "por omissão" sem
confirmar? Há alguma regra no sistema que você não reconhece como sua? As frases são textuais ou
"melhoradas"?

**Entrega.** `docs/DECISIONS.md` crescendo, com pelo menos cinco decisões do primeiro bloco, e os
commits e as pendências citando-as.

**Erros típicos.** Responder às perguntas pelo chat e não exigir que fiquem escritas: na terceira
sessão já ninguém se lembra. Deixar que o agente "melhore" as suas palavras: uma regra
parafraseada é uma regra diferente. E o mais grave: descobrir em produção uma regra que ninguém
decidiu. Quando acontecer (vai acontecer), não é um bug: é uma falha do degrau 6, e se corrige no
contrato, não só no código.

**No projeto-guia.** Decisões típicas do primeiro bloco da Turnera: "cancelar marca a consulta
como cancelada e guarda quem e quando; não se apaga nada"; "um profissional não pode ter duas
consultas na mesma hora, mas sim dois pacientes numa consulta dupla se o profissional habilitou";
"o telefone do paciente é obrigatório; o e-mail não". Cada uma com data e com o nome da
encarregada, e cada uma colada na especificação da pendência que precisava dela.

### Lição 7 — Medir antes de construir, com um instrumento que também se verifica

**O que você tem que entender.** O modelo produz afirmações com número ("há umas 120 consultas
desse tipo") e soam exatamente igual quando são medidas e quando são estimadas. Você não consegue
distingui-las pelo tom. A única forma é exigir o instrumento: "com que você mediu? mostre-me o
comando". A regra do degrau é que **nenhum número que decide algo sai de uma impressão**: sai de
um medidor que vive no repositório, que tem um teste que o verifica contra um caso conhecido, e
que você pode rodar.

E há algo mais, que aprendi na marra e que é o motivo pelo qual demorei a formalizar esta regra
que dava por óbvia: os medidores também mentem. Num dos meus sistemas, um medidor dava zero
porque não via uma parte do código, e outro dizia 27 quando eram 44
[Ref. 35](REFERENCIAS.md#ref-35), [Ref. 36](REFERENCIAS.md#ref-36). Por isso a auditoria em duas
direções: do código à medida (está contado tudo o que deveria ser contado?) e da medida ao código
(existe de verdade tudo o que foi contado?).

Num projeto pequeno, "medir" é modesto: contar quantas consultas uma tela faz ao carregar,
quanto demora o relatório mensal, quantas mensagens foram enviadas ontem. Não precisa de uma
catraca nem de um orçamento por caminho. O que precisa é que o número tenha um comando por trás.

**A tarefa.**

**Antes de enviar o prompt**, com as suas mãos:

- A hipótese, numa frase. Na Turnera, uma boa: "a agenda do dia faz uma consulta ao banco para
  cada consulta que mostra" (o clássico laço N+1). Se não for verdade, melhor: você vai ver como
  se verifica uma hipótese falsa. Vai no buraco do prompt, junto com a quantidade a medir.
- Um caso conhecido para o teste do medidor, no qual você sabe a resposta de antemão ("com zero
  consultas tem que contar exatamente as consultas base").
- Acesso ao que se mede (o banco em somente leitura se são dados reais, o log) e os medidores que
  já existam no repositório, nomeados.

1. Cole:

> Before building anything, we are going to measure. The hypothesis is: [the day view runs one
> database query per appointment shown]. Write a meter (a script that lives in the repository)
> that measures [the number of queries the day view runs for a day with N appointments], and a
> test for the meter that checks it against a known case where the answer is known in advance.
> If measuring requires access or data you lack, ask me; do not approximate silently. If some
> part can only be approximated, mark it as approximate and tell me the margin. Run the meter,
> show me the number together with the command that produces it, and audit it in both
> directions: from the code to the measurement (is everything that should be counted, counted?)
> and from the measurement to the code (does everything counted actually exist?). Only then
> propose what to build. Reply in my language.

> [pt]
> Antes de construir qualquer coisa, vamos medir. A hipótese é: [a agenda do dia faz uma
> consulta ao banco para cada consulta que mostra]. Escreva um medidor (um script que vive no
> repositório) que meça [a quantidade de consultas que a agenda do dia faz para um dia com N
> consultas], e um teste para o medidor que o verifique contra um caso conhecido onde a resposta
> se sabe de antemão. Se medir exige acesso ou dados que você não tem, peça-me; não aproxime em
> silêncio. Se alguma parte só pode ser aproximada, marque-a como aproximada e diga-me a margem.
> Rode o medidor, mostre-me o número junto com o comando que o produz, e audite-o nas duas
> direções: do código à medição (está contado tudo o que deveria ser contado?) e da medição ao
> código (existe de verdade tudo o que foi contado?). Só então proponha o que construir. Responda
> no meu idioma.

   Você está pedindo o medidor no repositório, o teste do medidor, pedir o que lhe falta em vez
   de aproximar, marcar o aproximado, o número com o comando, a auditoria em duas direções, e a
   ordem: primeiro medir, depois propor.

2. Rode você o comando que ele lhe deu. Tem que dar o mesmo número. Não precisa entender o
   script; precisa executá-lo.
3. Se a hipótese era verdadeira e o agente propõe corrigir, peça um orçamento.

**Antes de enviar o prompt** do orçamento: o número medido, rodado por você com o comando que ele
lhe deu (tem que dar o mesmo), e a margem que você está disposto a dar, decidida por você: um
pouco mais do que o medido, não o dobro por via das dúvidas.

4. Cole:

> Set the budget for [queries] on this path at the measured value plus a small margin, and
> protect it with a test that fails if it is exceeded. Tell me the number and the margin.

> [pt]
> Fixe o orçamento de [consultas] neste caminho no valor medido mais uma margem pequena, e
> proteja-o com um teste que falhe se for superado. Diga-me o número e a margem.

   Assim, se alguém voltar a meter o laço dentro de três meses, a bateria o detecta.

**Antes de enviar o prompt** da regra cinco: `docs/WORKING_AGREEMENT.md`, e um medidor já
existente para cada quantidade que um plano possa afirmar; se não há medidor, primeiro o prompt
inicial desta lição.

5. Acrescente ao contrato a regra cinco, para quando um plano trouxer números:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before executing a plan that asserts
> numbers, verify every number with the meter. If any does not match, stop and tell me; do not
> execute on a wrong number."

> [pt]
> Acrescente esta rotina a `docs/WORKING_AGREEMENT.md`: "Antes de executar um plano que afirma
> números, verifique cada número com o medidor. Se algum não bate, pare e diga-me; não execute
> sobre um número errado."

**Verificação de completude.** Você rodou o medidor e deu o mesmo? Tem teste, contra que caso
conhecido? Há algum número no relatório sem medidor por trás? O aproximado está marcado? Há
orçamento com teste?

**Entrega.** Um medidor no repositório com seu teste, um número com seu comando e data em
`docs/STATUS.md` ou na pendência, e (se correspondia) um orçamento protegido por um teste.

**Erros típicos.** Aceitar o número sem rodar o comando: metade do valor desta lição está em
que você o rode. Um medidor que dá zero: quase nunca é zero; quase sempre não está vendo algo. E
deixar que o agente "corrija enquanto mede": a ordem é o método.

**No projeto-guia.** O medidor da Turnera é um script que carrega um dia com 10, 50 e 200
consultas num banco de teste, abre a agenda desse dia contando as consultas ao banco, e escreve
os três números. O teste do medidor verifica que com 0 consultas conta exatamente as consultas
base (digamos, 2). Se havia laço, os números são 12, 52 e 202; corrige-se, passam a ser 3, 3 e 3,
e o orçamento fica em 4 com um teste que falha se a agenda faz mais de 4 consultas ao banco para
qualquer quantidade de consultas.

### Lição 8 — Testes como cadeados, provados em vermelho, e os testes de ponta a ponta

**O que você tem que entender.** Esta é a lição central do curso. Um teste que você nunca viu
falhar, você não sabe se prova algo. O modelo escreve o código e o teste na mesma sessão, com o
mesmo entendimento: se entendeu mal o pedido, o teste prova o que ele entendeu, e passa. A única
forma barata de saber que o teste olha o que importa é **vê-lo em vermelho contra o código
antigo**: se o código de antes da mudança também o passa, o teste não distingue o antes do
depois, e então não serve. Por isso o pedido não é "escreva testes" mas "mostre-me o vermelho,
depois o verde, depois a regressão". O caso que melhor mostra isso é o dos contadores que não
coincidiam [Ref. 26](REFERENCIAS.md#ref-26).

E a segunda ideia, que é tão importante quanto a primeira: os testes de ponta a ponta. Um teste
que verifica desde a tela (clica, digita, lê) e comprova o efeito no backend (a linha ficou, o
estado mudou) é o que substitui a sua leitura do código. Os critérios de aceitação da pendência
("dado, quando, então") são o seu roteiro. E rodam **três vezes, em três escalas**: o fluxo
tocado, com cada pendência; todos os fluxos que existem, no fechamento de cada bloco; e todos os
fluxos com a versão exata, antes de cada implantação em produção. Se você só faz a terceira,
chega ao final com um sistema que ninguém testou de ponta a ponta durante semanas.

**A tarefa.**

**Antes de enviar o prompt**, com as suas mãos:

- `docs/WORKING_AGREEMENT.md`, onde vai a rotina.
- A pendência que vai ser fechada, com os seus critérios de aceitação "dado, quando, então" e o
  seu "como se verifica" em `docs/PENDING.md`: são o roteiro do teste. Se não os tem, volte à
  lição 5 antes de pedir o teste.
- A bateria e o comando para rodá-la em `docs/STATUS.md` (lição 4), e o ambiente de teste
  rodando, com dados suficientes para o fluxo que se toca; se faltam dados, carregue-os você ou
  peça que ele os crie como parte do teste, mas que não os simule.

1. Acrescente ao contrato a rotina de evidência. Cole:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "To close a pending item I need evidence, not
> your word. (1) Write the test that proves what the item asks for, following its acceptance
> criteria. (2) Demonstrate that this test fails against the previous code: you may temporarily
> revert the change, or run the test against the old version, but show me the red output as a
> receipt, not a summary: the exact command, the identifier of the version it ran against, the count
> of failing tests and the exit code, pasted as they came out, so that I can rerun it myself with
> one command. (3) Show me the green output with the change. (4) Run the regression suite for the
> neighbouring items and show me it is still green. (5) Run the end-to-end test of the flow this
> item touches, from the screen to the backend, and show me the backend effect. (6) Do not replace
> with mocks the very part you are trying to test. If testing end to end requires something you lack
> (data, access, an environment), ask me for it; do not simulate what you do not have. Finally, the
> commit message says 'proved red against [what]' and the test counts."

> [pt]
> Acrescente esta rotina a `docs/WORKING_AGREEMENT.md`: "Para fechar uma pendência preciso de
> evidência, não da sua palavra. (1) Escreva o teste que prova o que a pendência pede, seguindo
> seus critérios de aceitação. (2) Demonstre que esse teste falha contra o código anterior: você
> pode reverter temporariamente a mudança, ou rodar o teste contra a versão antiga, mas mostre-me
> a saída em vermelho como um recibo, não como um resumo: o comando exato, o identificador da
> versão contra a qual rodou, a quantidade de testes que falham e o código de saída, colados tal
> como saíram, para que eu possa voltar a rodá-lo com um único comando. (3) Mostre-me a saída em
> verde com a mudança. (4) Rode a regressão das pendências vizinhas e mostre-me que continua em
> verde. (5) Rode o teste de ponta a ponta do fluxo que esta pendência toca, desde a tela até o
> backend, e mostre-me o efeito no backend. (6) Não substitua por simulações justamente a parte
> que está testando. Se testar de ponta a ponta exige algo que você não tem (dados, acesso, um
> ambiente), peça-me; não simule o que não tem. Por último, a mensagem do commit diz 'provado em
> vermelho contra [o quê]' e os números dos testes."

   Você está pedindo o teste guiado pelos critérios de aceitação, **o vermelho demonstrado como
   recibo** (o comando, a versão, os números e o código de saída, para que você mesmo possa
   voltar a rodá-lo), o verde, a regressão das vizinhas, o teste de ponta a ponta do fluxo com o
   efeito no backend, nada de simular justo o que se testa, e pedir o que falta em vez de
   simulá-lo.

2. Pegue a pendência da consulta duplicada (PND-003 na Turnera, ou o equivalente no seu projeto:
   uma regra que impede algo). Peça que ele a feche com a rotina. Leia o relatório: tem que haver
   uma saída em vermelho com números ("1 de 1 falha contra a versão sem a regra"), depois o
   verde, e o teste de ponta a ponta: um navegador controlado por programa que abre a tela, tenta
   registrar a consulta duplicada, lê o aviso, e comprova no banco que não foi guardada.
3. Se ele diz que não dá para testar de ponta a ponta porque a tela não pode ser operada por
   programa, pare: isso é X2 falhando, e há que corrigir agora (acrescentar identificadores aos
   elementos da tela) antes de seguir.

**Antes de enviar o prompt**: distinga se falta a ele um insumo que você tem (dados, um acesso,
um ambiente: dê-o e não mande este prompt) ou se de verdade o sistema não é testável ali (este
prompt).

4. Cole:

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

> [pt]
> Explique por que não dá para testar, o que haveria que acrescentar para que dê, e abra uma
> pendência para isso. A mudança não está fechada até que possa ser testada.

5. **No fechamento do bloco**, quando as seis pendências estiverem fechadas, rode a bateria
   completa.

**Antes de enviar o prompt** da bateria: as seis pendências fechadas com a rotina, a versão exata
que vai ser promovida identificada e implantada no ambiente de teste, e a sua própria lista dos
fluxos que existem (tirada dos casos de uso da árvore semântica), para contrastá-la com o que o
agente disser que cobriu.

6. Cole:

> Run the complete end-to-end suite of every flow that exists so far, in the test environment,
> with the exact version that will be promoted. Show me the counts, and for each flow the
> backend check that proves it. If any flow has no end-to-end test, say so and open a pending
> item for it; do not pass it as covered.

> [pt]
> Rode a bateria completa de ponta a ponta de todos os fluxos que existem até agora, no
> ambiente de teste, com a versão exata que vai ser promovida. Mostre-me os números e, para cada
> fluxo, a verificação no backend que o prova. Se algum fluxo não tem teste de ponta a ponta,
> diga e abra uma pendência; não o dê por coberto.

7. E depois disso, **use o sistema você**. Abra o ambiente de teste e faça o que a recepcionista
   faria: registre uma consulta, tente a duplicada, cancele, procure. O que lhe incomodar, o que
   não entender, o que estiver onde não deve: anote como pendência. Este tempo encontra o que
   nenhum teste encontra.

**Verificação de completude.** O relatório mostra o vermelho, com números? A regressão rodou na
mesma sessão, com números? O teste de ponta a ponta verifica também o backend? Há alguma parte
simulada justo onde está a mudança? O commit diz "provado em vermelho"? No fechamento do bloco:
estão todos os fluxos na bateria de ponta a ponta? Você usou o sistema e anotou o que encontrou?

**Entrega.** Pelo menos três pendências fechadas com a rotina completa (vermelho, verde,
regressão, ponta a ponta), a bateria completa de ponta a ponta do bloco em verde, e as pendências
que saíram dos seus testes humanos.

**Erros típicos.** Aceitar "os testes passam" sem números e sem vermelho. Aceitar que a bateria
"acelere" substituindo os testes de ponta a ponta por simulações. Deixar passar um "não dá para
testar" sem abrir a pendência. E fechar o bloco sem usá-lo você: a vista humana não se delega.

**No projeto-guia.** O vermelho da consulta duplicada se vê assim: o agente tira temporariamente
a regra, roda o teste, e a saída diz que o teste falhou porque a segunda consulta foi guardada.
Coloca a regra de volta, roda, verde. Depois a regressão: os testes de PND-001 e PND-002 continuam
em verde. E o de ponta a ponta: um navegador controlado por programa preenche o formulário,
aperta "salvar", lê a mensagem "esse horário já está ocupado", e uma consulta ao banco confirma
que há uma única consulta nessa hora. No fechamento do bloco, a bateria de ponta a ponta percorre
os três fluxos que existem (ver o dia, registrar, cancelar), e a encarregada registra dez
consultas de teste e descobre que a hora se escolhe com um menu suspenso incômodo. Pendência nova.
Quando você vir esse relatório pela primeira vez, vai entender para que serve todo o método.

**O que mudou em 19 de outubro de 2026 (D-037).** No primeiro bloco de um projeto novo não há código anterior: o teste novo falha porque o módulo não existe, e esse vermelho não prova nada. Desde esse dia, quando a versão anterior não tem o módulo, o vermelho se prova **por mutação**: o agente planta um defeito de propósito na função recém-escrita, mostra o teste em vermelho contra esse defeito (o recibo leva o diff), reverte-o e mostra o verde. No Forge, um vermelho que só diz "o arquivo não carrega" já não fecha o pendente. Um mutante por pendente; os testes de mutação sobre toda a base continuam sendo o reforço opcional da lição 9.

### Lição 9 — Qualidade do código verificada por máquina

**O que você tem que entender.** Você não lê o código, e está bem; mas o código existe e alguém
vai mantê-lo. Se ninguém o lê, uma máquina tem que olhá-lo: um *linter* (como o corretor
ortográfico de um processador de texto, mas para código), um *formatador* (um só estilo para
tudo), limites de tamanho de arquivos e funções, limites de *complexidade* (quantos caminhos tem
uma função), detecção de código duplicado e morto, e a *cobertura* de testes com uma *catraca*
(a de hoje é o piso de amanhã). Tudo na integração contínua, em vermelho quando se viola. Eu fiz
isso em todos os meus projetos; uma auditoria me devolveu um componente de mais de duas mil
linhas porque nenhum limite o tinha freado [Ref. 41](REFERENCIAS.md#ref-41).

**Antes de enviar o prompt**, com as suas mãos:

- A integração contínua rodando (lição 4) e ao menos uma pendência do bloco fechada com a
  lição 8, para que haja código real para medir.
- Os seus dois limites, numa linha: para a Turnera, trezentas linhas por arquivo e quarenta por
  função, e a cobertura só sobe.

1. Cole o prompt inicial do contrato do degrau 9 (em `docs/peldanos/`), com os seus limites nos
   vazios.
2. Leia `docs/CODE_QUALITY.md`. Vai haver uma lista do que hoje falha; decida o que se conserta
   já (uma pendência cada um) e o que se tolera com data, e escreva-o no mesmo arquivo.

**Antes de enviar o prompt** da rotina: `docs/CODE_QUALITY.md` lido e com as suas decisões, e
`docs/WORKING_AGREEMENT.md`.

3. Acrescente ao contrato a rotina do degrau 9, envolvida em "Add this routine to
   `docs/WORKING_AGREEMENT.md`:" como as demais.
4. Peça a ele que coloque de propósito, num ramo, uma função de cem linhas e uma variável sem
   uso: a cadeia tem que ficar em vermelho pelas duas coisas.

**Verificação de completude.** A última corrida da cadeia tem a qualidade em verde? O teste do
ramo ficou em vermelho? Há exceções ao linter, e cada uma tem razão escrita? A cobertura de hoje
é maior ou igual à de ontem?

**Entrega.** A comporta de qualidade na cadeia, `docs/CODE_QUALITY.md` com limites e valores, e a
rotina no contrato.

**Erros típicos.** Deixar que o agente "desative esta regra porque é muito estrita" sem que passe
por você. Subir um limite para que passe. E confundir cobertura com qualidade: a cobertura conta
testes, o vermelho da lição 8 diz se eles provam alguma coisa.

**Reforço opcional.** Quando o bloco estiver fechado, o contrato do degrau 9 tem um terceiro
prompt, o dos *testes de mutação*: uma ferramenta quebra o código de propósito, uma mudança
pequena por vez, e conta quantos desses erros os testes capturam. É a medida que a cobertura não
dá, e a que responde à objeção de que o agente pode fingir o vermelho. Na Turnera fazemos isso no
fechamento do segundo bloco, só sobre as linhas mudadas.

**No projeto-guia.** A primeira corrida da Turnera dá vermelho em três coisas: o formulário de
consulta tem uma função de 70 linhas (parte-se em duas: pendência), há duas cópias do formato de
data (uma só, no servidor: pendência), e a cobertura está em 61 %. A catraca fica em 61 e sobe
com cada pendência. No fechamento do bloco, 74 %.

### Lição 10 — Os casos de teste manual se escrevem junto com a funcionalidade

**O que você tem que entender.** Todos os testes que vimos até aqui são escritos e rodados pelo
modelo, e provam o que o modelo entendeu. Falta a prova que faz uma pessoa com os seus olhos e as
suas mãos, seguindo um *roteiro*: um caso de teste manual, com precondição, passos, resultado
esperado e uma tabela para anotar cada execução. O roteiro é escrito pelo agente junto com cada
pendência, a partir dos critérios de aceitação; você (ou a encarregada) o executa no fechamento
de cada bloco, antes da primeira implantação e depois de cada implantação; e o que falha volta ao
ciclo como pendência corretiva, com as suas palavras. É a vista humana com roteiro, e é o
fechamento do circuito do gráfico do processo: a execução manual reinjeta requisitos.

**Antes de enviar o prompt**, com as suas mãos:

- `docs/MANUAL_TESTS.md` criado, ainda que vazio, com o formato no cabeçalho (copie-o do contrato
  do degrau 10).
- A decisão de quem executa e quando, escrita no contrato: para o curso, você no fechamento de
  cada bloco e a encarregada antes da primeira implantação.
- Uma pendência do bloco fechada com as lições 8 e 9.

1. Acrescente ao contrato a rotina do degrau 10 (no contrato, "Rotina de cada pendência"),
   envolvida como as demais. A partir de agora, cada pendência que toque uma tela se fecha com o
   seu caso.
2. Peça a ele que escreva os casos das pendências já fechadas do bloco. Pegue um ao acaso e
   siga-o você no ambiente de teste sem perguntar nada: se teve que perguntar, o caso não está
   escrito para uma pessoa; mande reescrevê-lo.
3. No fechamento do bloco, execute todos os casos do bloco você, à mão, e anote em cada um a
   data, o seu nome, passou ou falhou, e a observação. O que o incomodar e não couber em nenhum
   caso, anote no final do arquivo.

**Antes de enviar o prompt** da execução: as suas execuções anotadas no arquivo, caso por caso, e
as observações soltas no final.

4. Cole o prompt de execução do contrato do degrau 10. Cada falha tem que voltar como pendência
   corretiva com as suas palavras.

**Verificação de completude.** Você conseguiu seguir um caso sem perguntar? Cada pendência
fechada que toca uma tela tem o seu caso? Cada caso diz o que verificar do outro lado da tela? A
execução tem data e nome em cada caso? Cada falha tem a sua pendência com as suas palavras?

**Entrega.** `docs/MANUAL_TESTS.md` com um caso por fluxo do bloco, a primeira execução
registrada, e uma pendência por falha.

**Erros típicos.** Deixar que o agente marque os casos como executados. Casos que são o teste
automático em prosa. E consertar as falhas na hora, sem pendência: perdem-se as suas palavras e o
rastro do que se repete.

**No projeto-guia.** Os casos do primeiro bloco da Turnera são seis: ver a agenda do dia,
registrar uma consulta, tentar um encaixe, cancelar, procurar um paciente, cadastrar um paciente.
Na primeira execução falham dois: o de cancelar (a agenda não se atualiza até recarregar a
página; observação da encarregada: "pensei que não tinha sido cancelada") e o de procurar (com
dois pacientes do mesmo sobrenome, mostra um só). Duas pendências corretivas, com as palavras
dela. O menu suspenso incomodo da hora, que nenhum teste viu, aparece como observação solta.

### Lição 11 — Simetria entre produtor e consumidor, e o registro de antipadrões

**O que você tem que entender.** Quando você muda uma ponta do sistema (o servidor, o banco, um
robô), a outra ponta (a tela, um contador, um relatório) tem que mudar no mesmo commit. Se não,
divergem, e o usuário vê um número de um lado e outro do outro [Ref. 26](REFERENCIAS.md#ref-26).
O princípio que evita isso é simples de enunciar e difícil de sustentar: **toda lista tem um
único dono**. Os estados possíveis de uma consulta, as colunas de um relatório, as causas pelas
quais algo espera: define-as uma única parte (o produtor) e as demais as leem dali
[Ref. 27](REFERENCIAS.md#ref-27). A árvore semântica é o primeiro lugar onde essas listas se
declaram. Assim que há duas cópias, uma está desatualizada; só falta saber qual.

A segunda metade da lição é o registro de antipadrões (GOTCHAS): os erros que você já engoliu
uma vez, anotados com seu cheiro, sua causa raiz, sua correção e como detectá-los antes
[Ref. 2](REFERENCIAS.md#ref-2). O importante não é anotá-los: é acrescentar a verificação
automática que os detecte, porque um antipadrão anotado e não automatizado se repete quando muda
a sessão.

**A tarefa.**

**Antes de enviar o prompt**, com as suas mãos:

- Pelo menos um bloco funcional construído: sem contratos entre partes não há mapa a fazer.
- `docs/SEMANTIC_TREE.md` em dia: as listas (estados, tipos, causas) estão declaradas ali, e o
  mapa tem que coincidir com a árvore.
- Uma lista escrita por você do que vive fora do repositório e produz ou consome algo do sistema
  (um robô, uma planilha, um processo de outra equipe), ou a constatação de que não há nada.

1. Peça o mapa de contratos:

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

> [pt]
> Construa `docs/PRODUCER_CONSUMER_MAP.md`: para cada contrato do sistema (um serviço, uma
> tabela, um formato de arquivo, uma lista de valores), quem o produz e quem o consome. Se há
> partes do sistema que você não consegue acessar ou que não entende, diga-me em vez de
> deixá-las fora do mapa. Responda no meu idioma.

   Você está pedindo o inventário de contratos com seus dois lados, e que o que ele não vê
   declare em vez de omitir.

**Antes de enviar o prompt** da rotina: o mapa revisado por você (escolha um contrato e
verifique que os dois lados são os que você conhece) e `docs/WORKING_AGREEMENT.md`.

2. Acrescente a rotina ao contrato:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before closing any change that touches a
> contract, look up every consumer in the map and update them in the same commit. Always prefer
> that the producer defines the list (columns, causes, states) and the consumer reads it, rather
> than each keeping its own copy. If the map does not have that relationship, add it."

> [pt]
> Acrescente esta rotina a `docs/WORKING_AGREEMENT.md`: "Antes de fechar qualquer mudança que
> toque um contrato, procure no mapa cada consumidor e atualize-os no mesmo commit. Prefira
> sempre que o produtor defina a lista (colunas, causas, estados) e o consumidor a leia, em vez
> de cada um ter sua cópia. Se o mapa não tem essa relação, acrescente-a."

3. Faça a prova da lista: escolha uma lista que apareça na tela (na Turnera, os estados de uma
   consulta: pendente, confirmada, cancelada, ausente) e peça ao agente que lhe mostre onde está
   definida e onde é lida. Se há duas definições, peça que ele deixe uma só, e que coincida com a
   árvore semântica.
4. Na primeira vez que algo quebrar pela segunda vez (vai acontecer),
   registre-o.

**Antes de enviar o prompt**: a pendência ou o commit da primeira vez, localizado por você entre
os fechados de `docs/PENDING.md`, para colá-lo junto com o prompt (sem essa referência o
antipadrão sai genérico); e `docs/GOTCHAS.md` criado mesmo que esteja vazio, com o formato no
cabeçalho: cheiro, causa raiz, correção, como detectá-lo antes.

5. Cole:

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

> [pt]
> Isto já nos aconteceu. Registre em `docs/GOTCHAS.md` com: como cheira (o sinal precoce), a
> causa raiz, a correção, e como detectá-lo da próxima vez antes que doa. E acrescente, se
> possível, um teste ou uma verificação automática que o detecte.

**Verificação de completude.** Escolha um contrato do mapa: cada consumidor o lê do produtor ou
tem sua cópia? Há um número que se mostre em duas telas e deem o mesmo? Os estados das entidades
coincidem entre o código e a árvore semântica? Cada entrada de GOTCHAS tem as quatro partes?
Repetiu-se algo que já estava anotado?

**Entrega.** `docs/PRODUCER_CONSUMER_MAP.md`, a rotina no contrato, e `docs/GOTCHAS.md` (mesmo
que comece com uma única entrada).

**Erros típicos.** Fazer o mapa uma vez e não voltar a olhá-lo: tem que crescer com cada contrato
novo. Anotar antipadrões como anedotas ("uma vez aconteceu que…") sem a parte "como detectá-lo
antes". E o clássico: o mesmo texto de um estado escrito à mão no servidor e na tela; no dia em
que um mudar, o outro fica.

**No projeto-guia.** O mapa da Turnera tem, no começo, quatro ou cinco contratos: a lista de
estados de consulta (o servidor a define, a tela e o relatório mensal a leem); a tabela de
consultas (o registro a escreve, a agenda do dia e o relatório a leem); a tabela de pacientes; e,
mais adiante, a fila de mensagens (a agenda a escreve, o enviador a lê). O primeiro GOTCHA
costuma ser de datas: a agenda mostrava a consulta no dia errado porque o servidor guardava num
fuso horário e a tela mostrava em outro. Cheiro: "a consulta das 23 aparece amanhã". Causa raiz:
dois fusos horários. Correção: um só, no servidor. Detecção: um teste com uma consulta às 23:30.

### Lição 12 — Verificação honesta e relatório proporcional

**O que você tem que entender.** Se você não vai ler código, o relatório do agente tem que ser
confiável, e isso não acontece sozinho. O modelo foi treinado para ser útil e completo, e um
relatório que diz "isto não consegui verificar" parece menos útil do que um que diz "pronto".
Então há que **pedir explicitamente** as más notícias, os pontos cegos e o que ele não fez. Se
você não pede, ele não dá; não porque esconda, mas porque não considera isso parte da resposta. A
mim relataram um erro de autenticação com a legenda "success" [Ref. 43](REFERENCIAS.md#ref-43).

A estrutura que o torna honesto são três blocos: **verificado** (com a prova ao lado),
**acreditado** (o que ele acha que funciona e por que não testou), e **pontos cegos** (o que ele
não consegue ver de onde está). E uma regra: as más notícias primeiro.

**A tarefa.**

**Antes de enviar o prompt**, com as suas mãos:

- `docs/WORKING_AGREEMENT.md`, onde vai a rotina.
- O costume de anotar, em cada sessão, a lista do que você pediu: o prompt exige que ele cubra
  cada item um por um, e você tem que saber quantos eram.

1. Acrescente ao contrato a rotina de relatório:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "When you report, separate three blocks:
> VERIFIED (what you tested, with the command and its output), BELIEVED (what you think works but
> did not test, and why not), and BLIND SPOTS (what you cannot see from where you are: another
> environment, real data, the user's browser). Cover every item I asked for, one by one, even when
> the answer is 'I did not do it'. No claim without its proof next to it. Do not say 'done': say
> what is done and how you know it. If something went wrong, say it first."

> [pt]
> Acrescente esta rotina a `docs/WORKING_AGREEMENT.md`: "Quando relatar, separe três blocos:
> VERIFICADO (o que você testou, com o comando e sua saída), ACREDITADO (o que você acha que
> funciona mas não testou, e por que não), e PONTOS CEGOS (o que você não consegue ver de onde
> está: outro ambiente, dados reais, o navegador do usuário). Cubra cada item que eu pedi, um por
> um, mesmo quando a resposta for 'não fiz'. Nenhuma afirmação sem sua prova ao lado. Não diga
> 'pronto': diga o que está feito e como você sabe. Se algo deu errado, diga primeiro."

2. Peça que ele feche a próxima pendência e leia o relatório com a lista de verificação abaixo.
   Na primeira vez, quase com certeza, o bloco "pontos cegos" vai estar vazio. Pergunte: "o que
   você não consegue ver de onde está?". Tem que haver algo (o seu navegador, o ambiente de
   produção, os dados reais). Se ele insiste que nada, insista você.
3. Pratique o "continua quebrado". Peça algo pequeno, verifique no ambiente de teste, e se por
   qualquer razão você não vê a mudança (é comum: a implantação demora, ou não foi feita), diga
   "continua quebrado".

**Antes de enviar o prompt**: a sua verificação anotada (em que URL você olhou, que versão o
sistema mostra, o que você fez, o que esperava, o que aconteceu) e o commit ou a versão que o
agente disse que continha a correção, copiado do relatório dele. Sem isso, o "continua quebrado"
é uma impressão.

4. Cole:

> Before diagnosing again, compare the version running where I see the problem with the version
> that contains your fix. Tell me both. If they differ, the problem is publication, not code.

> [pt]
> Antes de diagnosticar de novo, compare a versão que roda onde eu vejo o problema com a versão
> que contém a sua correção. Diga-me as duas. Se são diferentes, o problema é de publicação, não
> de código.

   Metade dos "continua quebrado" são correções que estão no repositório e não no lugar onde você
   olha [Ref. 45](REFERENCIAS.md#ref-45). Esta cláusula lhe economiza horas.

**Verificação de completude.** Estão os três blocos? Você escolheu uma afirmação de
"verificado" ao acaso e ela tem sua prova ao lado, e você conseguiu reproduzi-la? Cobre cada item
do que você pediu? As más notícias estão no começo? Disse "pronto" seco alguma vez?

**Entrega.** A rotina no contrato e três relatórios consecutivos com os três blocos, um deles
com um ponto cego real.

**Erros típicos.** Ler só o bloco "verificado" e pular os outros dois: os outros dois são os que
protegem você. Aceitar "deveria funcionar" dentro de "verificado": isso é "acreditado"
disfarçado. E se acostumar a relatórios cada vez mais longos: um relatório inflado está tapando
algo com volume.

**No projeto-guia.** Um bom relatório de fechamento da PND-004 (cancelar uma consulta) na
Turnera: "VERIFICADO: o teste de cancelamento passa (1/1, provado em vermelho contra a versão que
apagava); regressão 6/6; ponta a ponta do fluxo 'cancelar' em verde, com a linha marcada no banco;
no ambiente de teste, a consulta 17 de 3 de novembro consta cancelada por 'recepcao1' às 10:42
(captura). ACREDITADO: o relatório mensal vai contar bem os cancelamentos, mas não testei porque o
relatório é a PND-011 e ainda não existe. PONTOS CEGOS: não consigo ver como fica o estado
'cancelada' no celular da recepcionista; teste você."

---

## Fase de saída para produção: lições 13 a 20

Estas oito lições são as que convertem "funciona" em "pode ser sustentado", e se fazem uma vez,
em ordem, quando os dois primeiros blocos estão construídos com o ciclo e testados por você no
ambiente de teste, e antes de o sistema agir sobre o mundo (enviar mensagens, cobrar) ou ter
usuários reais. No projeto-guia, é o momento de acrescentar os lembretes e o sinal, e por isso a
lição 14 (cadeados) vai antes de construir essas funcionalidades, não depois. As quatro de
qualidade operacional (16 a 19) são as que eu fazia sem nomear; se você está começando, cada um
dos seus contratos tem um parágrafo "Se você está começando" que explica as suas palavras;
leia-o antes da lição.

### Lição 13 — A auditoria periódica como insumo do plano

**O que você tem que entender.** De vez em quando há que olhar o sistema inteiro com olhos
frescos, e o que se vê não vai para um relatório que se arquiva: vai para a lista de pendências.
A parte importante é "olhos frescos": quem audita não tem que ser quem construiu, porque
compartilha seus pressupostos. Um modelo que construiu um módulo "sabe" que a senha escrita no
código era provisória; um modelo que o vê pela primeira vez a relata como o que é. Assim se
encontraram duas portas de administrador que o construtor tinha deixado num dia
[Ref. 40](REFERENCIAS.md#ref-40). Não precisa de outra empresa: basta **outra sessão, com outro
arquivo de instruções, que não tenha participado**.

**A tarefa.**

**Antes de enviar o prompt**, com as suas mãos:

- Uma sessão nova do agente numa cópia limpa do repositório (clone-o em outra pasta). Se a sua
  ferramenta permitir, dê a ela um arquivo de instruções diferente, que só diga "você é um
  auditor; você não construiu este sistema".
- Acesso de somente leitura para essa sessão ao ambiente de teste (banco de dados, logs), com
  credenciais de somente leitura fora do repositório.
- O escopo decidido por você para o buraco do prompt, e a auditoria anterior, se houve.

1. Cole:

> Audit this system for [integrity, security, performance and code quality]. Read-only: change
> nothing except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires
> access you lack (the database, the log, an environment), tell me and mark that part as not
> audited; do not pass it as fine. Go through all of the code, not a sample. For every finding:
> where it is (file and line), what the risk is, what evidence proves it (the command, the
> query, the number), and its priority: P0 must be fixed now, P1 soon, P2 when possible. Give a
> grade to every dimension you audited. End with the list of P0 findings turned into proposed
> pending items. Reply in my language.

> [pt]
> Audite este sistema em [integridade, segurança, desempenho e qualidade de código]. Somente
> leitura: não mude nada salvo escrever seu relatório em `docs/AUDIT_[data].md`. Se auditar
> alguma parte exige um acesso que você não tem (o banco de dados, o log, um ambiente), diga-me
> e marque essa parte como não auditada; não a dê por boa. Percorra todo o código, não uma
> amostra. Para cada achado: onde está (arquivo e linha), qual é o risco, que evidência o prova
> (o comando, a consulta, o número), e sua prioridade: P0 tem que ser corrigido já, P1 em breve,
> P2 quando der. Dê uma nota a cada dimensão que auditou. Termine com a lista de achados P0
> convertidos em pendências propostas. Responda no meu idioma.

   Você está pedindo somente leitura, que ele declare o que não pôde auditar em vez de aprová-lo
   por omissão, todo o código e não uma amostra, cada achado com localização, risco, evidência e
   prioridade, notas por dimensão, e os P0 já como pendências propostas.

2. Leia o relatório. Escolha dois achados e peça ao auditor que lhe mostre a evidência (o
   comando, a linha). Tem que conseguir.

**Antes de enviar o prompt** de fechamento: o relatório lido por você, os dois achados
verificados com o auditor, e a sessão do construtor aberta (este prompt vai ao construtor, não ao
auditor), com a data do arquivo no buraco.

3. Volte à sessão do construtor e cole:

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.

> [pt]
> Leia `docs/AUDIT_[data].md`. Abra uma pendência para cada P0 e P1, citando o achado. Se
> discordar de algum, diga-me com a evidência contrária; não o ignore.

4. Repita esta lição antes da primeira implantação em produção (lição 15) e, depois, a cada um
   ou dois meses.

**Verificação de completude.** O relatório diz o que NÃO pôde auditar? Dois achados ao acaso têm
arquivo, linha e evidência reproduzível? Cada P0 tem sua pendência aberta? As notas vão poder ser
comparadas com a próxima auditoria? Auditou uma sessão diferente da que construiu?

**Entrega.** `docs/AUDIT_[data].md` e as pendências P0/P1 abertas.

**Erros típicos.** Auditar com a mesma sessão que construiu: vai confirmar seus próprios
pressupostos. Aceitar um relatório sem nenhum P0 num sistema de mais de um mês: quase nunca é
verdade. E arquivar o relatório sem abrir as pendências: aí a auditoria não serviu para nada.

**No projeto-guia.** A primeira auditoria da Turnera costuma encontrar: dados de pacientes no log
(telefones impressos ao enviar mensagens: P0); a busca de pacientes por nome sem índice (P1, vai
se notar aos 5.000 pacientes); o formulário de consulta sem validar que a data seja futura (P1); e
alguma dependência com uma vulnerabilidade conhecida (P1). Quatro pendências novas, todas com
arquivo e linha.

### Lição 14 — Fail-closed, cadeados e zero dano silencioso

**O que você tem que entender.** O software, por padrão, diante da dúvida segue em frente: se a
validação falha, o código continua; se o serviço não responde, assume-se que está tudo bem. É
"fail-open", como uma porta que se abre quando a luz acaba. O método inverte o padrão: **na
dúvida, não**. Toda ação com consequência (cobrar, enviar, apagar, aprovar) leva um cadeado, tem
um caminho de volta escrito, e toda automação nova começa em modo de ensaio, registrando o que
teria feito, até que você a habilite. Os cadeados que coloquei no meu primeiro sistema são o
modelo [Ref. 28](REFERENCIAS.md#ref-28).

Esta lição vai **antes** de construir as funcionalidades que agem sobre o mundo. Na Turnera,
antes dos lembretes e do sinal, que são o terceiro bloco.

**A tarefa.**

**Antes de enviar o prompt**, com as suas mãos e com o dono:

- `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`: o que o sistema faz ou vai fazer que cobra, envia,
  aprova, apaga ou avisa alguém de fora; e para cada ação, o que acontece se for feita duas
  vezes, o que acontece se for feita errado, como se desfaz, quem deveria poder fazê-la. Os
  processos da árvore semântica lhe dão a lista de partida. O prompt o nomeia "the survey of
  consequential actions", sem caminho: diga onde está.
- `docs/SEMANTIC_TREE.md`, em dia.

1. Cole:

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock. Reply in my language.

> [pt]
> Vamos decidir que ações do sistema precisam de cadeado. Leia o levantamento de ações com
> consequência, e percorra o código procurando tudo o que cobra, envia, aprova, apaga ou avisa
> para fora. Compare as duas listas: se o código tem ações que o levantamento não menciona, ou
> ao contrário, pergunte-me antes de seguir. Para cada ação proponha: se é reversível, que
> cadeado leva (confirmação explícita, dupla trava, modo de ensaio, limite diário, um humano no
> circuito), e qual é o caminho de volta se der errado. Regra geral: diante de qualquer dúvida ou
> falha no caminho, a ação NÃO se executa e o motivo se registra. Apresente-me a tabela; eu
> confirmo cadeado por cadeado. Responda no meu idioma.

   Você está pedindo que ele compare o que o negócio disse com o que o código faz (aí aparecem as
   ações de que ninguém se lembrava), que as diferenças ele pergunte, e para cada ação a
   reversibilidade, o cadeado e o caminho de volta, com a regra do fail-closed escrita.

2. Confirme cadeado por cadeado, com o dono.

**Antes de enviar o prompt** de fechamento: para cada linha da tabela, a sua confirmação ou a sua
mudança, escritas para os buracos do prompt; nenhuma linha sem veredicto, porque um cadeado não
confirmado é um cadeado que não se implementa.

3. Feche com:

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.

> [pt]
> Confirmo os cadeados [lista]; mude [X] por [Y]. Implemente-os com um teste por cadeado que
> prove que, na condição de dúvida, a ação NÃO ocorre (provado em vermelho contra a versão sem o
> cadeado). Registre a tabela final em `docs/LOCKS.md`. E para toda automação nova: modo de
> ensaio primeiro, registrando o que teria feito, até que eu a habilite.

4. Agora abra o terceiro bloco (os lembretes, o sinal) com a lição 5, construa-o com o ciclo
   completo das lições 5 a 12, e deixe-o em modo de ensaio. Olhe durante uns dias o registro de
   "teria enviado" antes de habilitar o envio real.

**Verificação de completude.** Cada ação que cobra, envia, aprova ou apaga está na tabela? Cada
cadeado tem seu teste em vermelho? Toda ação irreversível tem caminho de volta escrito? As
automações novas começaram em modo de ensaio e você viu o registro antes de habilitá-las?

**Entrega.** `docs/LOCKS.md`, um teste por cadeado provado em vermelho, e as automações em modo
de ensaio com seu registro.

**Erros típicos.** Habilitar o envio real "para testar com uma mensagem ao meu próprio
telefone": o modo de ensaio existe justamente para isso. Um cadeado que se pula com um parâmetro
"para testes": esse parâmetro vai ficar ligado em produção. E não olhar o registro de "teria
feito": é a única janela para ver um erro antes que chegue a um paciente.

**No projeto-guia.** A tabela de cadeados da Turnera: enviar lembrete (não reversível; cadeado:
idempotência por consulta, um único envio por consulta e canal, limite de 200 por dia, modo de
ensaio primeiro; volta: nenhuma, por isso o limite); cobrar sinal (reversível com devolução;
cadeado: confirmação explícita da recepcionista, valor fixado pelo profissional; volta: devolução
pelo provedor de pagamentos); cancelar consulta (irreversível para o paciente; cadeado:
confirmação e registro de quem; volta: recriar a consulta); apagar paciente (irreversível;
cadeado: dupla confirmação, só a encarregada, e só se não tem consultas futuras; volta: nenhuma,
por isso dupla). Cada cadeado com um teste que mostra que, sem o cadeado, a ação ocorria.

### Lição 15 — Integração contínua, ambientes, segredos e implantação como parte do produto

**O que você tem que entender.** Chegar à produção tem que ser um pacote reproduzível: os testes
rodam **uma** vez, a implantação só empacota e sobe, a configuração vive no servidor e não no
repositório, há um procedimento para promover de teste para produção que pode ser rodado duas
vezes, e o caminho de volta está **provado** (um caminho de volta que nunca foi provado não
existe). A mim os testes rodados três vezes por commit queimaram a cota de integração contínua
[Ref. 39](REFERENCIAS.md#ref-39). Sobre os segredos, uma regra sem exceções: **um segredo que
foi visto num chat, num log ou num commit já não é um segredo**; rotaciona-se, e ponto
[Ref. 42](REFERENCIAS.md#ref-42).

Você já tem boa parte disto desde o esqueleto (lição 4): a integração contínua e a implantação em
teste. Esta lição o completa rumo à produção.

**A tarefa.**

**Antes de enviar o prompt**, com as suas mãos:

- `docs/ENVIRONMENTS_SURVEY.md` (lição 4), completado com o que falta para a produção: o domínio
  e quem o administra, onde vão viver os segredos e quais são (o nome, nunca o valor), quem pode
  tocar na produção, como se faria hoje um caminho de volta, e quanta cota de integração contínua
  você tem (se usa o GitHub Actions, veja o limite do plano). O prompt o nomeia "the environments
  and access survey": diga onde está.
- O acesso à produção para o agente, decidido por você, com a credencial fora do repositório e do
  chat.
- O esqueleto com a sua integração contínua e a sua implantação em teste funcionando (lição 4).

1. Cole:

> We are going to close the path to production. Read the environments and access survey.
> Evaluate whether you have what is needed to deploy to production safely (access, domain,
> where the secrets live, how to roll back); if anything is missing, ask me. Then set up: (1)
> continuous integration runs the full test suite exactly once per commit; (2) the deployment
> waits for that run's result and only packages and uploads, without running tests again; (3)
> each environment's configuration lives on the server (environment file or vault), never in the
> repository; (4) a written procedure to promote from the test environment to production, which
> can be run twice without breaking anything; (5) the rollback, tested; (6) an automatic check
> that prevents committing a secret. Document all of it in `docs/DEPLOYMENT.md` so that a person
> can do it by hand without you. Reply in my language.

> [pt]
> Vamos fechar o caminho para a produção. Leia o levantamento de ambientes e acessos. Avalie se
> você tem o necessário para implantar em produção com segurança (acesso, domínio, onde vivem
> os segredos, como voltar atrás); se faltar algo, peça-me. Depois monte: (1) a integração
> contínua roda a bateria completa exatamente uma vez por commit; (2) a implantação espera o
> resultado dessa execução e só empacota e sobe, sem voltar a rodar testes; (3) a configuração
> de cada ambiente vive no servidor (arquivo de ambiente ou cofre), nunca no repositório; (4) um
> procedimento escrito para promover do ambiente de teste para a produção, que possa ser rodado
> duas vezes sem quebrar nada; (5) o caminho de volta, provado; (6) uma verificação automática
> que impeça subir um segredo num commit. Documente tudo em `docs/DEPLOYMENT.md` de modo que uma
> pessoa possa fazê-lo à mão sem você. Responda no meu idioma.

   Você está pedindo os acessos antes de começar, os testes uma única vez por commit, a
   implantação que só empacota, a configuração fora, a promoção repetível, o caminho de volta
   provado, o cadeado contra segredos, e a documentação para uma pessoa.

2. Antes da primeira implantação em produção, faça a auditoria da lição 13 se não a fez, e rode a
   bateria completa de ponta a ponta de todos os fluxos com a versão exata que vai promover (o
   prompt de fechamento de bloco da lição 8).

**Antes de enviar o prompt** da rotina: `docs/DEPLOYMENT.md` escrito e lido por você (você
conseguiria segui-lo sozinho?), e `docs/WORKING_AGREEMENT.md`.

3. Acrescente ao contrato a rotina de implantação:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before touching production: the test
> environment is green with the same version; the rollback is ready; and tell me what changes in
> the configuration. After deploying: show me the version running in production and an
> end-to-end check on production, read-only."

> [pt]
> Acrescente esta rotina a `docs/WORKING_AGREEMENT.md`: "Antes de tocar na produção: o
> ambiente de teste está em verde com a mesma versão; o caminho de volta está pronto; e diga-me
> o que muda na configuração. Depois de implantar: mostre-me a versão que roda em produção e uma
> verificação de ponta a ponta sobre a produção, em somente leitura."

4. Faça a primeira implantação em produção, com o sistema ainda sem usuários reais. E depois
   **prove o caminho de volta**: peça que ele volte à versão anterior e lhe mostre que está
   rodando, e depois que volte à nova.
5. Se em algum momento do curso você colou um segredo no chat (uma chave de API, uma senha),
   rotacione-o.

**Antes de enviar o prompt**: o segredo identificado (o seu nome, nunca o seu valor), onde
apareceu e quando, e o seu acesso ao painel onde ele se gera, caso o agente não possa
rotacioná-lo sozinho. Este prompt não se manda "mais tarde".

6. Cole:

> That secret is compromised: rotate it now, tell me everywhere else it was used, and add the
> check that would have caught it.

> [pt]
> Esse segredo está comprometido: rotacione-o agora, diga-me em que outros lugares foi usado, e
> acrescente a verificação que o teria pego.

**Verificação de completude.** Quantas vezes roda a bateria por commit? (uma; peça o link). Há
algum valor real de configuração no repositório? (peça a busca vazia). Você conseguiria seguir
`docs/DEPLOYMENT.md` sozinho? O caminho de volta foi provado, quando, com que evidência? Foi
rotacionado todo segredo que apareceu no chat? Você sabe quanta cota de integração contínua lhe
resta?

**Entrega.** A integração contínua uma vez por commit, a implantação que só empacota,
`docs/DEPLOYMENT.md`, o caminho de volta provado, o cadeado antissegredos ativo, e o sistema
rodando em produção (sem usuários ainda).

**Erros típicos.** A implantação "à mão, rápido, porque é uma mudança pequena": as mudanças
pequenas quebram a produção porque ninguém as testa. O arquivo de exemplo de configuração com
valores que parecem reais (são). E não provar o caminho de volta até o dia em que você precisa
dele.

**No projeto-guia.** Para a Turnera, a integração contínua roda a bateria (uns 30 testes a esta
altura, incluídos os seis fluxos de ponta a ponta) em cada push; a implantação em teste é
automática ao fazer merge em `main`; a promoção para produção é um comando que empacota a versão
que está em teste e a sobe, com a configuração (a chave do provedor de mensagens, a do provedor
de pagamentos, a URL do banco) num arquivo de ambiente no servidor que não está no repositório. O
caminho de volta é o mesmo comando com a versão anterior. E o cadeado antissegredos é uma
verificação em cada commit que recusa qualquer coisa que pareça uma chave.

### Lição 16 — Observabilidade e rastreabilidade, com nível configurável

**O que você tem que entender.** Quando algo falhar em produção, você vai querer saber o que
aconteceu sem abrir o código e sem que o agente "revise": buscar um número e ver aparecer a
história completa dessa ação, da tela ao banco. Isso é um *registro estruturado* com um
*identificador de correlação*. E você vai querer subir o detalhe do que o sistema escreve, um
minuto, enquanto investiga, sem voltar a implantar: isso é o *nível configurável*. A
*rastreabilidade* é a outra metade: toda ação com consequência (cobrou, enviou, apagou) fica numa
lista que a aplicação não pode editar, com quem, quando e o quê. Sem isto, o agente residente da
lição 23 opera às cegas e os monitoramentos das lições 21 e 22 não têm o que olhar
[Ref. 16](REFERENCIAS.md#ref-16).

**Antes de enviar o prompt**, com as suas mãos e com o dono:

- `docs/DEPLOYMENT.md` (lição 15), com como se lê a configuração por ambiente: o nível vai ser
  mais uma variável.
- `docs/LOCKS.md` (lição 14): a lista de ações que têm que ficar na auditoria.
- Em `docs/INITIAL_SURVEY.md`, a lista de que dados são pessoais (na Turnera: nome, telefone,
  e-mail e documento do paciente), escrita com a encarregada. Os registros têm que mascará-los;
  é uma obrigação legal.
- A sua decisão de onde vivem os registros e quanto se conservam. Para o curso: um arquivo
  rotacionado no servidor, noventa dias.

1. Cole o prompt inicial do contrato do degrau 16 (em `docs/peldanos/`), tal como está.
2. Quando ele lhe mostrar o identificador de um pedido real, procure-o você nos registros do
   ambiente de teste: tem que aparecer na tela, no backend, no banco e na chamada ao provedor de
   mensagens.
3. Suba o nível para depuração você mesmo, faça uma ação, olhe, baixe-o. Se você teve que
   implantar, não está subido.
4. Procure "João" (ou qualquer nome de teste) nos registros: não pode estar.

**Antes de enviar o prompt** da rotina: `docs/OBSERVABILITY.md` lido por você, e o nível subido e
baixado por você uma vez.

5. Acrescente ao contrato a rotina do degrau 16 (no contrato, "Rotina"), envolvida em "Add this
   routine to `docs/WORKING_AGREEMENT.md`:" como as demais.

**Verificação de completude.** Você seguiu um identificador por todas as camadas? Mudou o nível
sem implantar? Há algum dado pessoal nos registros? O cancelamento de um turno em teste ficou na
auditoria com quem e quando? `docs/OBSERVABILITY.md` basta para você encontrar um registro
sozinho?

**Entrega.** Registros estruturados com nível configurável, o identificador propagado, a
auditoria de ações com consequência, `docs/OBSERVABILITY.md`, e a rotina no contrato.

**Erros típicos.** Aceitar "logs" que cada módulo escreve de um jeito. Deixar produção em
depuração "por enquanto". E que o identificador não chegue à tarefa noturna de lembretes, que é
justamente onde os incidentes se perdem.

**No projeto-guia.** O identificador de "cancelar o turno 17" aparece no clique, no servidor, na
linha marcada no banco e no e-mail ao profissional. A auditoria diz "recepcao1 cancelou o turno
17 às 10:42 a partir da agenda do dia; resultado: ok". A encarregada sobe o nível para
rastreamento para ver por que um lembrete demorou, encontra-o, e baixa-o.

### Lição 17 — Otimização da camada de persistência, medida antes e depois

**O que você tem que entender.** O banco de dados é onde os sistemas morrem devagar: bem com cem
turnos, mal com cem mil. Um *índice* é como o de um livro: sem ele, o banco lê a tabela inteira
para encontrar um turno. Um *laço N+1* é fazer cem consultas para mostrar cem turnos em vez de
uma. Esta lição aplica a lição 7 ao banco: medir cada consulta com um medidor com teste, mudar o
que os números dizem, medir de novo sobre os mesmos dados, e deixar um orçamento com teste para
que não volte [Ref. 18](REFERENCIAS.md#ref-18), [Ref. 37](REFERENCIAS.md#ref-37). Não é
reescrever o banco nem mudar de motor: isso foi a lição 3.

**Antes de enviar o prompt**, com as suas mãos:

- `docs/SIZING.md` e `docs/VOLUME_SURVEY.md` (lição 3): os volumes a carregar.
- O ambiente de teste com dados **ao volume esperado**: para a Turnera, dez mil turnos e trinta
  mil mensagens de um ano, gerados por um script que o agente deixa no repositório (peça-o como
  pendência prévia, com a forma da árvore semântica).
- `docs/PRODUCER_CONSUMER_MAP.md` (lição 11), em dia.
- Um caso conhecido para o teste do medidor: a tabela de profissionais tem três linhas.

1. Cole o prompt inicial do contrato do degrau 17.
2. Leia a lista de mudanças propostas como a encarregada leria uma lista de consertos do
   consultório: você entende o que cada uma ganha e que risco tem? Aprove ou recuse uma por uma.
   Refaça uma conta à mão (linhas por mês da tabela de turnos).

**Antes de enviar o prompt** de fechamento: a lista com o seu veredicto por mudança e a conta
refeita que coincide.

3. Cole o prompt de fechamento do contrato do degrau 17, com a lista aprovada.
4. Rode você um medidor antes e depois, com os dois comandos que ele lhe deu.

**Verificação de completude.** As suas rodadas coincidem com a tabela de `docs/PERSISTENCE.md`?
Resta alguma consulta que leia uma tabela inteira num fluxo crítico? Cada tabela tem retenção
escrita? Os orçamentos têm teste (peça-lhe que ultrapasse um e lhe mostre o vermelho)?

**Entrega.** Os medidores com teste, `docs/PERSISTENCE.md` com antes e depois, os orçamentos com
teste, e a bateria em verde.

**Erros típicos.** Medir com os dez registros do esqueleto. Aceitar "é melhor migrarmos para
outro banco". E melhorar um número quebrando a planilha mensal que lia essa tabela: faltou o
mapa.

**No projeto-guia.** A agenda do dia fazia uma consulta por turno (o laço da lição 7): 52
consultas para 50 turnos passam a 3. A busca de pacientes por nome lia a tabela inteira: um
índice a baixa de 800 milissegundos para 4 com dez mil pacientes. Retenção: as mensagens se
arquivam ao fim de um ano; os turnos, nunca. Orçamento: 4 consultas para a agenda, com teste.

### Lição 18 — Varredura e solução de vulnerabilidades

**O que você tem que entender.** Uma *vulnerabilidade* é um defeito que alguém pode usar para
entrar, roubar dados ou fazer com que o sistema faça o que não deve. A auditoria (lição 13) as
busca com critério, de vez em quando; esta lição as busca por máquina, o tempo todo, em quatro
camadas: as *dependências* (peças de terceiros que o seu sistema usa, com os seus defeitos
conhecidos publicados), o código (*análise estática*), os segredos no histórico do repositório, e
a configuração do servidor. E uma regra: atualizar uma dependência é uma mudança, e passa pelo
ciclo; "subi a versão para fechar o achado" sem regressão é a forma mais comum de quebrar a
produção numa sexta-feira [Ref. 41](REFERENCIAS.md#ref-41), [Ref. 23](REFERENCIAS.md#ref-23).

**Antes de enviar o prompt**, com as suas mãos:

- A integração contínua rodando (lição 4 e 15), e quanta cota lhe resta: a varredura acrescenta
  minutos.
- `docs/ENVIRONMENTS_SURVEY.md` com o servidor, as portas e quem administra o domínio.
- `docs/AUDIT_[data].md` (lição 13), para que não repita o conhecido.
- O seu critério de P0, em duas linhas: para a Turnera, o que deixe entrar sem credencial, o que
  exponha dados de pacientes, o que permita mandar mensagens ou cobrar sem controle.

1. Cole o prompt inicial do contrato do degrau 18, com o seu critério no vazio.
2. Leia `docs/SECURITY_[data].md`. Escolha dois achados e peça-lhe a evidência. Ele diz o que NÃO
   varreu?

**Antes de enviar o prompt** de fechamento: a lista de correções aprovadas; para cada atualização
de dependência, a consciência de que vai rodar a regressão e a ponta a ponta.

3. Cole o prompt de fechamento do contrato do degrau 18.
4. Peça-lhe que meta de propósito, num ramo, uma dependência com vulnerabilidade conhecida: a
   cadeia tem que ficar em vermelho.

**Verificação de completude.** A última rodada da varredura está em verde e de que data? Cada P0
tem pendência fechada com evidência? A varredura é comporta em `docs/GATES.md`? Você sabe quando
roda a próxima varredura programada?

**Entrega.** A varredura em quatro camadas na cadeia e com calendário, `docs/SECURITY_[data].md`,
`docs/SECURITY.md`, os P0 e P1 corrigidos, a comporta.

**Erros típicos.** Uma varredura "limpa de primeira" num sistema de mais de um mês: faltou uma
camada. Dez dependências atualizadas num commit. Um P0 "aceito" sem pendência nem data.

**No projeto-guia.** A varredura da Turnera encontra: uma dependência do gerador de PDF com uma
vulnerabilidade conhecida (P1, atualiza-se com regressão e ponta a ponta); o cabeçalho que impede
embutir a agenda em outro site, ausente (P1, uma linha de configuração, com teste); uma chave de
teste do provedor de pagamentos no histórico do repositório (P0: rotaciona-se, ainda que seja de
teste); e uma porta do banco aberta para o mundo no servidor de teste (P0: fecha-se). A varredura
fica como comporta e roda às segundas-feiras.

### Lição 19 — Testes de desempenho em volume e ponto de ruptura

**O que você tem que entender.** A lição 3 dimensionou com contas; esta as comprova com o sistema
rodando. Um *teste de carga* simula muitos usuários ao mesmo tempo. Olha-se a *vazão* (ações por
segundo), a *latência* (quanto demora cada ação; a mediana e o *percentil 95*, que é o que veem
os que reclamam) e a taxa de erro, ao volume esperado e ao "vezes dez". E depois sobe-se a carga
até que algo quebre: o *ponto de ruptura* não é "fica lento" e sim "as conexões ao banco se
esgotaram em 180 usuários". Esse número é o mais útil da fase, porque dele saem os *limiares* de
alerta da lição 21 [Ref. 12](REFERENCIAS.md#ref-12), [Ref. 44](REFERENCIAS.md#ref-44).

**Antes de enviar o prompt**, com as suas mãos e com o dono:

- `docs/SIZING.md` com o volume esperado e o "vezes dez": para a Turnera, duas usuárias no pico e
  quarenta turnos por dia; vezes dez, vinte usuárias e quatrocentos turnos.
- Os fluxos críticos para o vazio do prompt: cadastrar um turno, ver a agenda do dia, buscar um
  paciente, o envio noturno de lembretes.
- A tolerância da encarregada para a tela mais usada (a agenda do dia): "se demorar mais de dois
  segundos, as meninas reclamam".
- O ambiente de teste com os dados ao volume (lição 17) e, se difere de produção em recursos,
  anotado como em `docs/ENVIRONMENTS_SURVEY.md`.
- A observabilidade da lição 16 acesa.

1. Cole o prompt inicial do contrato do degrau 19, com os fluxos e a tolerância nos vazios.
2. Leia `docs/PERFORMANCE_[data].md` com a tolerância ao lado: a agenda do dia entra em dois
   segundos ao volume esperado? E no vezes dez? O que quebrou primeiro e a que carga?
3. Decida com a encarregada até que volume se corrigem os gargalos agora: se pensam vendê-lo a
   outros consultórios, o "vezes dez" é agora; se não, com data.

**Antes de enviar o prompt** de fechamento: o relatório lido, a decisão sobre o "vezes dez".

4. Cole o prompt de fechamento do contrato do degrau 19.
5. Rode você o script ao volume esperado com o comando que ele lhe deu: os números têm que se
   parecer.

**Verificação de completude.** A tela mais usada entra na tolerância, ou há uma pendência com o
número? O ponto de ruptura diz o que quebrou e a que carga? Os limiares de
`docs/PERFORMANCE.md` estão abaixo do ponto de ruptura e acima do esperado? O teste é comporta e
a primeira rodada está arquivada?

**Entrega.** O script de carga com teste, `docs/PERFORMANCE_[data].md`, `docs/PERFORMANCE.md` com
limiares e comporta, e uma pendência por gargalo.

**Erros típicos.** "Aguenta o vezes dez sem problemas" sem ponto de ruptura: não subiu a carga o
suficiente. Um script que bate na API e não na tela. Corrigir gargalos durante o teste, "já que
estava".

**No projeto-guia.** Ao volume esperado, a agenda responde em 300 milissegundos; no vezes dez, em
1,4 segundo; o envio noturno de 400 lembretes demora 50 segundos. O ponto de ruptura: com 180
usuárias concorrentes esgota-se o pool de conexões (10) e as ações começam a falhar. Limiares:
alerta se a agenda passar de 1,5 segundo ou se as conexões em uso passarem de 7. Pendência: o
envio noturno em lotes de 50, porque a encarregada sim quer vendê-lo.

### Lição 20 — Documentação viva e manuais que uma pessoa pode seguir sem IA

**O que você tem que entender.** O sistema tem que poder ser usado, mantido e recuperado sem o
agente e sem você. O critério para o manual de recuperação é concreto: **tem que poder ser
seguido por uma pessoa de confiança que não programe, às três da manhã, com o sistema caído e o
agente sem conexão**. Se um passo diz "consultar o desenvolvedor", está incompleto. E como
regenerar documentação com um modelo é grátis, a regra passa a ser "no mesmo commit": cada
mudança que toca o que o usuário vê, o que o operador faz ou como se implanta, atualiza o manual
no mesmo commit. Os manuais que escrevi para o meu primeiro sistema com esse critério são o modelo
[Ref. 24](REFERENCIAS.md#ref-24).

E uma fonte que você já tem: as pendências fechadas. Se documentou cada fechamento como pede a
lição 5, o manual de usuário não se escreve do zero: monta-se a partir das pendências que
fecharam, bloco a bloco, e o diário de mudanças sai diretamente delas.

**A tarefa.**

**Antes de enviar o prompt**, com as suas mãos:

- `docs/WORKING_AGREEMENT.md`, onde vai a rotina.
- A lista de manuais que o sistema vai ter, cada um com o seu leitor (o usuário final, quem
  mantém, quem opera a infraestrutura), escrita em `PROJECT.md` ou dita no chat.

1. Acrescente a rotina ao contrato:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Every change that modifies what the user
> sees, what the operator does, or how the system is deployed, updates the corresponding manual
> in the same commit. At the close of every functional block, add to the user manual the screens
> and flows of the pending items closed in that block, with real screenshots from the test
> environment, and add their entries to the changelog. If you do not know which manual, ask."

> [pt]
> Acrescente esta rotina a `docs/WORKING_AGREEMENT.md`: "Toda mudança que modifique o que o
> usuário vê, o que o operador faz, ou como o sistema é implantado, atualiza o manual
> correspondente no mesmo commit. No fechamento de cada bloco funcional, acrescente ao manual de
> usuário as telas e os fluxos das pendências fechadas nesse bloco, com capturas reais do
> ambiente de teste, e acrescente suas entradas ao diário de mudanças. Se não souber a que manual
> vai, pergunte."

**Antes de enviar o prompt** dos manuais: o sistema rodando no ambiente de teste com dados
realistas (as capturas saem dali), as pendências fechadas com a sua documentação (lição 5),
`docs/DEPLOYMENT.md` e `docs/LOCKS.md` em dia, e o que só o negócio sabe, preparado para quando
ele perguntar: quem é responsável pelo quê, para que telefone se liga às três da manhã, quem faz
a cópia de segurança.

2. Cole:

> Generate three manuals from the system as it is today in the test environment: the user
> manual (screen by screen, with real screenshots, in the user's language, no jargon); the
> maintenance manual (how it is built, where everything is, how to run the test suite, how to
> add a module); and the infrastructure and recovery manual (how to deploy, how to roll back,
> how to restore a backup, what to do if it goes down; written for a person who has to do it by
> hand, without AI, at three in the morning). If for any section you need something only the
> business knows (who is responsible for what, which phone number to call), ask me; do not leave
> a gap and do not invent. Each manual carries a date and the system version. Reply in my
> language.

> [pt]
> Gere três manuais a partir do sistema tal como está hoje no ambiente de teste: o manual de
> usuário (tela por tela, com capturas reais, no idioma do usuário, sem jargão); o manual de
> manutenção (como está construído, onde está cada coisa, como rodar a bateria, como acrescentar
> um módulo); e o manual de infraestrutura e recuperação (como implantar, como voltar atrás,
> como restaurar um backup, o que fazer se cair; escrito para uma pessoa que tem que fazê-lo à
> mão, sem IA, às três da manhã). Se para alguma seção você precisar de algo que só o negócio
> sabe (quem é responsável pelo quê, para que telefone ligar), peça-me; não deixe um buraco nem
> invente. Cada manual leva data e versão do sistema. Responda no meu idioma.

   Você está pedindo os três manuais com capturas reais, o critério das três da manhã para o de
   recuperação, que ele pergunte o que só o negócio sabe em vez de deixar buracos, e data e
   versão.

3. A prova real: dê o manual de recuperação a alguém que não programe (o dono, um familiar) e
   peça que siga a seção "caiu" no ambiente de teste. Onde travar, há que corrigir o manual.
4. Depois da próxima mudança de tela, verifique que o commit tocou o manual de usuário.
5. E agora os **testes de aceitação**: o dono usa o sistema inteiro no ambiente de teste, com
   dados realistas, seguindo os seis fluxos, antes de entrar o primeiro usuário real. O que ele
   encontrar são pendências; com elas fechadas, o sistema está aceito.

**Verificação de completude.** Uma captura ao acaso coincide com o ambiente de teste de hoje?
Alguém que não programa conseguiu seguir a seção "caiu"? O último commit que mudou uma tela
tocou o manual? O diário de mudanças tem uma entrada para cada pendência fechada? Há buracos tipo
"[completar]"? Cada manual diz para que versão vale? O dono fez os testes de aceitação sobre
todos os fluxos?

**Entrega.** Os três manuais com data e versão, a prova com uma pessoa feita, e os testes de
aceitação fechados.

**Erros típicos.** Gerar os manuais uma vez e não colocar a rotina no contrato: em dois meses
têm capturas de telas que já não existem. Um manual de recuperação que começa com "abra uma
sessão com o agente". E não fazer a prova com uma pessoa: é a única verificação que vale.

**No projeto-guia.** O manual de usuário da Turnera tem seis telas com captura, montadas a partir
das pendências fechadas dos três blocos; o de manutenção explica onde está cada módulo e como
rodar a bateria; e o de recuperação diz, em ordem, com os comandos: como saber se o sistema está
caído, como reiniciá-lo, como voltar à versão anterior, como restaurar o banco do último backup
(que se faz todas as noites: isso também sai desta lição), e para quem ligar. A encarregada o
seguiu no ambiente de teste e travou em "restaurar o banco" porque o comando assumia uma pasta
que ela não tinha; corrigiu-se o manual.

## Fase de operação: lições 21 a 23

Estas três lições começam com a primeira implantação em produção e não terminam: os dois
monitoramentos se montam com ela e rodam sozinhos a partir daí, e a retrospectiva fecha cada
etapa e volta ao 0 para a seguinte.

### Lição 21 — Monitoramento de recursos e desempenho, com relatório cíclico

**O que você tem que entender.** A lição 19 diz como se comporta o sistema um dia; a produção é
todos os dias, com os dados crescendo. *Monitorar* é olhar por máquina, o tempo todo, o uso de
*recursos* (processador, memória, disco, conexões, cota do provedor de mensagens) e o tempo de
resposta de cada função e cada consulta, e avisar quando algo sai de faixa: acima de um *limiar*
(os da lição 19) ou muito diferente da *linha base* (o que vinha dando). Um *alerta* avisa na
hora; o *relatório cíclico* se lê com calma a cada semana ou a cada mês. Duas regras: um alerta
que ninguém lê é um defeito do alerta; e um limiar não se sobe para calar um alerta sem uma razão
medida escrita [Ref. 37](REFERENCIAS.md#ref-37), [Ref. 39](REFERENCIAS.md#ref-39).

**Antes de enviar o prompt**, com as suas mãos e com o dono:

- `docs/OBSERVABILITY.md` (16), `docs/PERSISTENCE.md` (17) e `docs/PERFORMANCE.md` (19) fechados.
- O canal de alertas decidido com a encarregada: a quem chega e por onde. Para o curso: ao seu
  e-mail e à sua mensageria.
- O ciclo: mensal para a Turnera; semanal se houvesse dinheiro em jogo todos os dias.
- O desvio que você considera alarme: 30 % sobre a média dos últimos catorze dias.
- Acesso de somente leitura do monitoramento à produção, com a credencial fora do chat.

1. Cole o prompt inicial do contrato do degrau 21, com o canal, o ciclo e o desvio nos vazios.
2. Peça-lhe que ultrapasse um limiar de propósito em teste: o alerta tem que lhe chegar pelo
   canal.
3. Leia o primeiro relatório: cada evento fora de faixa tem que ter causa ou proposta.

**Antes de enviar o prompt** da rotina: o primeiro relatório lido por você.

4. Acrescente ao contrato a rotina do degrau 21, envolvida em "Add this routine to
   `docs/WORKING_AGREEMENT.md`:".

**Verificação de completude.** O alerta provocado chegou até você? O relatório tem cada desvio
com causa ou proposta? Há uma pendência para cada desvio que você decidiu atender, com o número
como critério? Algum limiar subiu desde a lição 19, e com que razão? O relatório olha a cota do
provedor de mensagens?

**Entrega.** Coleta com história, alertas, o relatório cíclico, `docs/MONITORING.md`, a rotina no
contrato.

**Erros típicos.** Alertas todos os dias que ninguém lê. Três relatórios seguidos que dizem "tudo
normal". Um limiar subido "para que pare de avisar". Dados pessoais guardados "para
diagnosticar".

**No projeto-guia.** O primeiro relatório mensal da Turnera diz: disco a 40 %, memória estável, a
agenda do dia em 320 milissegundos de mediana (linha base), a busca de pacientes subiu de 4 para
9 milissegundos (a tabela cresce; dentro da faixa), e a cota de mensagens a 60 % (proposta:
avisar aos 80 %). Um desvio: o relatório mensal da encarregada demorou 11 segundos no dia 1
(proposta: pré-calculá-lo de noite; pendência).

**O que mudou em 19 de outubro de 2026 (D-039).** A medição que revalida o dimensionamento leva a sua janela verificável: o primeiro e o último registro lidos da base, não um número digitado à mão. Na prática, 30.000 linhas de três anos passadas como se fossem de um abriram um alarme falso. Uma janela digitada à mão é marcada como tal no relatório e só avisa.

### Lição 22 — Monitoramento de erros e relatório cíclico

**O que você tem que entender.** Um sistema em produção produz erros que ninguém reporta: a
recepcionista que viu a tela em branco e tentou de novo, a tarefa noturna que se interrompeu.
Esta lição os *captura* nos três lugares onde se escondem (o backend, as tarefas e o navegador),
*agrupa*-os (mil vezes o mesmo erro é uma entrada com um contador), avisa dos novos e dos que
crescem, e produz um relatório com a *taxa de erro por fluxo* (de cada cem turnos cadastrados,
quantos falharam). Duas regras: nenhum erro sem pendência, e não existe o "erro conhecido" sem
uma pendência que diga por que se tolera e até quando [Ref. 43](REFERENCIAS.md#ref-43),
[Ref. 22](REFERENCIAS.md#ref-22).

**Antes de enviar o prompt**, com as suas mãos:

- `docs/OBSERVABILITY.md` (16): os erros já saem com identificador, versão e ator.
- `docs/LOCKS.md` (14): os erros em ações com consequência são alerta imediato.
- O canal e o ciclo da lição 21, e o número de ocorrências por hora de um erro conhecido a partir
  do qual você quer alerta: para a Turnera, dez.
- Onde se guardam os erros e por quanto tempo, sem dados pessoais.

1. Cole o prompt inicial do contrato do degrau 22, com o canal, o ciclo e o número nos vazios.
2. Provoque você um erro no navegador, em teste (uma data impossível no formulário de turno, por
   exemplo): tem que aparecer na captura com o seu identificador, e lhe chegar o alerta se for
   novo.

**Antes de enviar o prompt** da rotina: o primeiro relatório de erros lido por você, e
`docs/PENDING.md` à mão.

3. Acrescente ao contrato a rotina do degrau 22, envolvida como as demais.
4. Com o primeiro relatório: abra as pendências corretivas dos erros novos, cada uma com a sua
   reprodução, e feche-as com a rotina da lição 8 (o teste que o reproduz em vermelho).

**Verificação de completude.** O seu erro provocado chegou à captura, ao alerta e ao relatório?
Há algum erro recorrente sem pendência nem razão com data? Um erro "corrigido" do relatório tem o
teste em vermelho na sua pendência? A taxa de erro por fluxo está lá, e comparada com o período
anterior? Há dados pessoais na captura?

**Entrega.** A captura centralizada e agrupada, os alertas, o relatório cíclico com a taxa por
fluxo, `docs/MONITORING.md` completo, a rotina no contrato, e uma pendência por erro.

**Erros típicos.** "Zero erros num mês" com usuários reais: a captura não vê o navegador ou as
tarefas. Um erro com mil ocorrências e o comentário "conhecido, não afeta". Erros que se
"corrigem" reiniciando. E ler o relatório de erros sem cruzá-lo com o de recursos: a consulta
lenta de um é o tempo de espera esgotado do outro.

**No projeto-guia.** O primeiro relatório da Turnera tem três erros: um no navegador (a agenda
falha se o nome do profissional tiver um apóstrofo; 14 vezes; pendência, teste em vermelho), um
na tarefa noturna (o provedor de mensagens devolveu um erro numa noite; 1 vez; pendência para
retentar com registro), e um "conhecido" do sobrinho na planilha mensal (pendência com data:
substitui-se pelo relatório da lição R2 na parte 2). Taxa de erro: 0,3 % em "cadastrar turno",
0 % nos demais.

**O que mudou em 19 de outubro de 2026 (D-038).** A captura de erros separa por fonte: os erros do sistema e os das ferramentas que o observam (o painel, o agente residente, o próprio monitoramento) vão em seções distintas do relatório, e só os do sistema abrem pendentes. Na prática, o primeiro relatório cíclico abriu seis "bugs" que eram a ferramenta falando com um servidor desligado.

### Lição 23 — O agente dentro do sistema, e a retrospectiva com número

**O que você tem que entender.** Duas coisas fecham o ciclo. A primeira é opcional: deixar o
agente residente em produção, com escopo delimitado, para diagnosticar e dar suporte sem que
você esteja [Ref. 13](REFERENCIAS.md#ref-13). A regra que o ordena é que **age em nome de
alguém**: sua credencial está mapeada a uma pessoa responsável, e tudo o que faz fica registrado
em nome dessa pessoa; não é uma conta anônima, é um empregado com chefe. A segunda é obrigatória:
a retrospectiva com números. O que custou, quantas pendências, quais deram voltas, que incidentes
houve e em que degrau caem, e **pelo menos uma mudança proposta à escada**. Uma retrospectiva que
não muda nada não foi uma retrospectiva; a que me levou a eliminar uma equipe inteira de agentes
é o modelo [Ref. 6](REFERENCIAS.md#ref-6).

**A tarefa (agente residente, se corresponder).**

**Antes de enviar o prompt**, com as suas mãos e com o dono:

- A decisão de se o sistema precisa de um agente residente, e para quê. Na Turnera sim: as
  recepcionistas vão ter perguntas ("por que o lembrete não chegou a este paciente?") que o
  agente pode responder lendo o log, sem que ninguém ligue para o desenvolvedor.
- Uma credencial própria para o agente em produção, criada por você, mapeada a uma pessoa
  responsável com nome, de somente leitura para começar, com o valor fora do chat e do
  repositório.
- `docs/LOCKS.md` e `docs/DEPLOYMENT.md` em dia, e o canal (chamado, e-mail) pelo qual ele avisa
  o que não consegue resolver.

1. Cole:

> We are going to leave you resident in production. First, build the map of the system you will
> need in order to operate it: modules, environments, where each configuration lives, which
> actions are consequential (read `docs/LOCKS.md`), whom to notify. If there are parts of the
> system you cannot see from where you are, tell me; the map must not have hidden gaps. Then
> propose your scope in three levels: read-only and diagnosis; configuration changes with my
> approval; consequential actions behind locks. I choose the level. Your credential acts as the
> person who created it: everything you do is logged under that person's name. Reply in my
> language.

> [pt]
> Vamos deixá-lo residente em produção. Primeiro, construa o mapa do sistema de que você vai
> precisar para operá-lo: módulos, ambientes, onde vive cada configuração, que ações têm
> consequência (leia `docs/LOCKS.md`), a quem avisar. Se há partes do sistema que você não
> consegue ver de onde está, diga-me; o mapa não pode ter buracos escondidos. Depois proponha o
> seu escopo em três níveis: somente leitura e diagnóstico; mudanças de configuração com a minha
> aprovação; ações com consequência atrás de cadeados. Eu escolho o nível. A sua credencial age
> como a pessoa que a criou: tudo o que você fizer fica registrado em nome dessa pessoa.
> Responda no meu idioma.

   Você está pedindo o mapa antes de operar, que os buracos do mapa ele declare, três níveis de
   escopo para que você escolha um, e a credencial em nome de uma pessoa.

2. Escolha o nível (para começar, sempre o primeiro: somente leitura e diagnóstico).

**Antes de enviar o prompt** de fechamento: o mapa e os três níveis lidos, o nível escolhido, e
uma ação concreta fora desse escopo pensada por você, para que o agente a tente e você veja a
recusa no log.

3. Feche com:

> Level [1: read-only and diagnosis]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the
> credential (never its value), and the procedure to request my approval. Then prove, with a real
> attempt recorded in the log, that something outside your scope is rejected.

> [pt]
> Nível [1: somente leitura e diagnóstico]. Escreva em `docs/RESIDENT_AGENT.md` o mapa, o
> escopo, a credencial (nunca o seu valor), e o procedimento para pedir a minha aprovação. Depois
> demonstre, com uma tentativa real registrada no log, que algo fora do seu escopo é recusado.

**A tarefa (retrospectiva, sempre).**

**Antes de enviar o prompt**, com as suas mãos:

- Os números que só você tem, em `docs/RETROSPECTIVE_INPUTS.md` ou prontos para o chat: quantas
  horas dedicou (do seu calendário, não de memória), quanto gastou na ferramenta de IA (a
  fatura), quanta cota de integração contínua usou, e as datas de início e de fim.
- A lista de incidentes como você os lembra, com data aproximada, para contrastar com o que o
  agente tirar das pendências e dos commits.
- `docs/PENDING.md` com os fechados documentados e `docs/DECISIONS.md`, que são a fonte dos
  números.

4. Cole:

> [The project] is over. Do the retrospective with numbers, not impressions: what it cost
> (tokens, quota, my time), how many pending items, which ones took the most rounds and why,
> which incidents happened and which step of the ladder each falls into, and which step failed
> or was missing. If you lack the data for any figure (my time, for instance), ask me for it or
> mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder:
> which step is modified, how, and which incident justifies it. Write it to
> `docs/RETROSPECTIVE_[date].md`. Reply in my language.

> [pt]
> [O projeto] terminou. Faça a retrospectiva com números, não com impressões: o que custou
> (tokens, cota, meu tempo), quantas pendências, quais deram mais voltas e por quê, que
> incidentes houve e em que degrau da escada cai cada um, e que degrau falhou ou faltou. Se não
> tiver o dado para alguma cifra (meu tempo, por exemplo), peça-me ou marque como estimativa;
> não invente. Termine com uma proposta concreta de mudança à escada: que degrau se modifica,
> como, e que incidente o justifica. Escreva em `docs/RETROSPECTIVE_[data].md`. Responda no meu
> idioma.

   Você está pedindo números com fonte, cada incidente mapeado a um degrau (um incidente que não
   cai em nenhum é um degrau que falta), que ele lhe peça os números que não tem, e uma proposta
   concreta de mudança à escada.

5. Leia a proposta de mudança. Se lhe parecer válida, mande-a ao
   [repositório do Urazuke](https://github.com/pkuschnirof/urazuke) como proposta de melhoria
   (ver `CONTRIBUTING.md`): essa é a forma como o método aprende de cada projeto.

**Verificação de completude.** O mapa diz o que o agente NÃO consegue ver? Você viu no log que
uma ação fora do escopo é recusada? A credencial age em nome de uma pessoa? A retrospectiva tem
números com fonte, ou adjetivos? Cada incidente cai num degrau? Há pelo menos uma proposta
concreta de mudança?

**Entrega.** `docs/RESIDENT_AGENT.md` (se corresponder) e `docs/RETROSPECTIVE_[data].md`.

**Erros típicos.** Dar ao agente residente um nível alto "para que possa resolver tudo": comece
por somente leitura e suba quando houver evidência. Uma retrospectiva que diz que tudo saiu bem:
nunca sai tudo bem; está escrita para você, não para o método. E não mandar a proposta de
mudança: o degrau 23 se fecha quando a escada muda, não quando o documento se escreve.

**No projeto-guia.** A retrospectiva da Turnera, num curso típico: umas quarenta horas do
aluno, vinte e oito pendências, as que mais voltas deram foram as de mensagens (fusos
horários e o provedor de WhatsApp); dois incidentes, um no degrau 11 (o estado "ausente"
existia na tela e não no servidor, e tampouco na árvore semântica) e outro no 15 (uma
implantação em produção com a configuração de teste, detectada pela verificação de ponta a
ponta depois da implantação). Proposta de mudança: que a rotina de implantação do degrau 15
exija mostrar a diferença de configuração entre teste e produção antes de promover, não só "o
que muda".

---

## A lista de saída para produção

Quando as vinte e quatro lições estão feitas, o sistema cumpre esta lista. É a definição operacional
de "production grade" no Urazuke, e pode ser usada como lista de verificação final, com o dono,
sem abrir o código:

1. Há uma ficha de elegibilidade com decisão, data e nome (P0).
2. Há um contrato de convivência que o agente lê em cada sessão, e provou-se que o lê (P1, P2).
3. O arquivo de projeto se lê em cinco minutos e diz o que o sistema NÃO é; há uma árvore
   semântica confirmada pelo dono, e toda pendência pende de um nó (P2).
4. Há um dimensionamento com dados primários com fonte, derivados com conta, e o cenário "por
   dez" (P3).
5. O esqueleto foi implantado vazio no arranque, com a cadeia de integração e
   implantação, e a implantação foi rodada duas vezes (P4).
6. Toda mudança tem sua pendência com especificação detalhada, e toda pendência fechada conserva
   sua especificação e sua evidência: é a documentação do feito (P5).
7. Toda regra de negócio tem dono, data e palavras textuais, no commit, na pendência e no
   registro (P6).
8. Todo número que decidiu algo tem um medidor com teste que você pode rodar (P7).
9. Todo teste importante foi visto em vermelho antes de verde; cada fluxo tem seu teste de ponta
   a ponta que verifica o backend desde a tela; a bateria completa rodou no fechamento de cada
   bloco e antes da produção (P8).
10. A qualidade do código se verifica por máquina em cada commit, é comporta, e a cobertura
   nunca baixou (P9).
11. Cada funcionalidade tem os seus casos de teste manual, escritos para uma pessoa; foram
   executados no fechamento de cada bloco e na aceitação, com data e nome; cada falha voltou
   como pendência (P10).
12. Toda lista tem um único dono; há um mapa produtor/consumidor; há um registro de antipadrões
   com verificação automática (P11).
13. Todo relatório separa verificado, acreditado e pontos cegos (P12).
14. Houve pelo menos uma auditoria por uma sessão diferente, e seus P0 são pendências (P13).
15. Toda ação com consequência tem cadeado com teste em vermelho e caminho de volta; as
    automações passaram por modo de ensaio (P14).
16. Os testes rodam uma vez por commit; a configuração está fora do repositório; o caminho de
    volta foi provado; nenhum segredo vive no repositório nem no chat sem rotacionar (P15).
17. Os registros são estruturados, com nível configurável sem implantar, com um identificador que
    segue cada ação da tela ao banco; as ações com consequência ficam numa auditoria imutável;
    nenhum dado pessoal nos registros (P16).
18. As consultas reais foram medidas ao volume esperado, corrigidas com antes e depois, e há
    orçamentos com teste por caminho crítico (P17).
19. A varredura de vulnerabilidades roda em cada push e com calendário, é comporta, e não há P0
    aberto (P18).
20. Há um teste de carga com teste, rodado ao volume esperado e ao "vezes dez", com o ponto de
    ruptura escrito e os limiares derivados dele (P19).
21. Há três manuais com data e versão, montados a partir das pendências fechadas; uma pessoa que
    não programa seguiu o de recuperação; o dono fez os testes de aceitação sobre todos os fluxos
    (P20).
22. O uso de recursos e os tempos de resposta são vigiados com alertas e relatório cíclico, e
    cada desvio tem causa ou pendência (P21).
23. Os erros são capturados no backend, nas tarefas e no navegador, são agrupados, são relatados
    por ciclo com a taxa por fluxo, e nenhum fica sem pendência (P22).
24. Há uma retrospectiva com números e uma proposta de mudança à escada (P23).

Se as vinte e quatro dão "sim", o sistema está pronto para implantar. Se alguma dá "não", você já
sabe que degrau voltar a subir.

---

## E depois: a parte 2, o projeto herdado

Esta primeira parte ensina o método sobre uma pasta vazia porque é a forma mais clara de
aprendê-lo. Mas na vida real quase nunca lhe dão uma pasta vazia: dão-lhe um sistema que já roda e
lhe pedem "conserte isto" ou "acrescente aquilo". A [parte 2 do curso](MANUAL_CURSO_EVOLUTIVO.md)
pega o mesmo consultório em outra linha do tempo, com uma aplicação que um sobrinho lhes fez num
verão e que ninguém entende inteira, e ensina o trecho de normalização do
[caminho evolutivo-corretivo](EVOLUTIVO_CORRECTIVO.md): oito lições para recuperar os insumos que
o método dá por supostos, montar o cinto de segurança e ordenar a dívida, e mais duas para
corrigir o primeiro bug e construir a primeira funcionalidade nova com o método completo.

## Anexo A — Como avaliar (para quem dá o curso ou se autoavalia)

Uma rubrica simples, por lição, com três níveis:

- **Não subido**: falta a entrega, ou alguma verificação de completude dá "não".
- **Subido**: a entrega existe e todas as verificações dão "sim".
- **Subido com evidência de critério**: além disso, o aluno consegue contar um caso em que o
  agente fez algo errado nessa lição (supôs, inventou, relatou de mais) e como o detectou. Esse é
  o objetivo real do curso: não o artefato, mas o reflexo.

O que não se avalia: a qualidade do código. Ninguém a lê. Avalia-se a qualidade da evidência.

## Anexo B — Adaptação do curso a cada ferramenta

Os prompts são os mesmos em qualquer ferramenta. O que muda é onde vão as rotinas que no curso se
acrescentam a `docs/WORKING_AGREEMENT.md`:

- No **Claude Code**, as rotinas vão no `CLAUDE.md` do projeto (ou se inclui o contrato a partir
  dali), e se leem sozinhas em cada sessão.
- No **Cursor**, vão em `.cursor/rules/`, como regras sempre ativas.
- No **Codex CLI** ou **Gemini CLI**, em `AGENTS.md` ou `GEMINI.md` na raiz.
- No **Forge**, o contrato e as rotinas são doutrinas, os prompts de degrau se injetam sozinhos
  ao cruzar cada comporta, o registro de pendências é nativo e a árvore semântica é o grafo de
  conhecimento do projeto. O curso com o Forge é o mesmo curso com menos copiar e colar.

A prova de leitura da lição 2 vale para todas: se uma sessão nova não sabe o que o sistema NÃO
faz, a ferramenta não está carregando o arquivo onde você colocou o contrato.

## Anexo C — O que este manual ainda não tem

- Uma turma que o tenha cursado. A ordem das etapas, os erros típicos e o projeto-guia
  estão escritos a partir dos meus três sistemas, não de alunos. A primeira turma vai corrigi-los
  (e isso é, literalmente, o degrau 23 aplicado ao curso).
- Os pesos dos critérios de elegibilidade (lição 0), que estou calibrando.
- Um exemplo completo de `docs/PENDING.md` do projeto-guia, com as vinte e oito pendências
  especificadas e fechadas, para que um aluno veja como fica a documentação do feito no final de
  um projeto.
