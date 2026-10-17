# Urazuke — o curso. Manual com tarefas práticas, degrau por degrau, até a aplicação em produção

Versão 1, 17 de outubro de 2026. É um documento de trabalho do projeto Urazuke: vai ser corrigido
com a primeira turma que o usar. Está escrito em linguagem do dia a dia, e cada sigla ou expressão
estranha está no glossário do documento principal (`ESCALERA_METODOLOGICA.md`). Esta é a versão em
português; o espanhol é a fonte da verdade. Os prompts para o modelo são idênticos em todos os
idiomas.

## Antes de começar

### Para quem é este curso

Para alguém que quer construir software com inteligência artificial **e que esse software seja
usado de verdade**, por gente de verdade, durante meses. Não é um curso de programação: você não vai
aprender uma linguagem nem um framework. Tampouco é um curso de "prompts": você não vai aprender
truques para que o modelo escreva melhor. É um curso de **método**: do que fazer em que ordem, o que
pedir ao modelo em cada momento, o que ele tem que te entregar, e como saber — sem ler código — que o
que ele entregou está completo.

Serve para você se é alguma destas pessoas:

- Tem um negócio, um consultório, uma consultoria pequena, e quer seu próprio sistema sem contratar
  uma equipe de desenvolvimento.
- É consultor ou freelancer de automação e seus clientes pedem "algo mais" do que um robô.
- Sabe programar, mas quer que o modelo faça o trabalho pesado e você fique com as decisões.
- Já "vibecodou" algo, funcionou duas semanas, e no mês três caiu.

Não serve para você se o que quer é um protótipo para a demo de sexta-feira. Para isso há
ferramentas mais rápidas, e este método vai te parecer lento. O método é para o que tem que seguir
funcionando depois da demo.

### O que você vai ter no final

Uma aplicação sua, rodando em produção, com: testes que foram vistos falhar antes de passar;
implantação reproduzível com caminho de volta; configuração e segredos fora do repositório; as
decisões de negócio escritas com data; cadeados em tudo o que cobra, envia ou apaga; três manuais
que uma pessoa pode seguir sem IA; uma auditoria feita por um agente diferente do que construiu; e
uma retrospectiva com números. Isso é o que aqui chamamos de "production grade": não é que
funcione, é que **se pode sustentar**.

E você vai ter algo mais, que é o que de verdade leva: o reflexo de não acreditar no modelo sem
evidência, e de saber exatamente que evidência pedir em cada passo.

### O que você precisa

1. **Uma ferramenta de IA para programar.** Qualquer uma que possa ler e escrever arquivos no seu
   repositório e executar comandos: Claude Code, Cursor, Codex CLI, Gemini CLI, Forge. O método não
   depende de qual; o documento principal tem uma tabela de onde vai cada artefato em cada
   ferramenta. Neste manual dizemos "o agente" para nos referirmos à que você usar.
2. **Uma conta no GitHub** (ou equivalente) e noções mínimas do que é um repositório, um commit e
   um push. Se não as tem, dedique uma tarde antes de começar; qualquer tutorial introdutório basta.
   Não precisa de mais.
3. **Um projeto.** O ideal é que seja seu: um sistema de que você precisa ou que um cliente pediu,
   com usuários que vão usá-lo. Se não tem um, use o **projeto-guia** que descrevemos abaixo; está
   pensado para passar pelos dezesseis degraus sem pular nenhum.
4. **Tempo.** O curso tem dezesseis lições, uma por degrau. As de arranque (0 a 4) são de uma a
   três horas cada; as do ciclo (5 a 10) se aprendem numa tarde e se praticam durante todo o
   projeto; as de operação (11 a 15) são de duas a quatro horas cada. Um projeto pequeno, de ponta a
   ponta, são entre quatro e oito semanas de trabalho parcial.
5. **Um dono do domínio com tempo para decidir.** Se o projeto é seu, é você. Se é de um cliente, é
   o cliente, e ele tem que saber que vai ter que responder perguntas durante todo o projeto. Este
   ponto não é negociável: sem dono que decida, o modelo decide, e aí o método quebra.

### Como se faz o curso

Cada lição tem a mesma estrutura:

- **O que você precisa entender**: o conceito, explicado como se explica a uma pessoa.
- **A tarefa**: passo a passo, com o prompt exato que você vai dar ao agente (em inglês, porque os
  modelos seguem instruções com mais precisão em inglês; abaixo de cada um está explicado em
  português o que você está pedindo) e o que fazer com o que ele devolve.
- **A verificação de completude**: a lista de perguntas que você se faz sobre o que o agente
  entregou, sem abrir o código. Se alguma dá "não", a lição não está terminada.
- **A entrega**: o arquivo ou a evidência que tem que existir no final.
- **Erros típicos**: o que acontece com quase todos na primeira vez.
- **No projeto-guia**: como esta lição se vê aplicada ao projeto de exemplo.

Uma regra para todo o curso: **não avance ao degrau seguinte com uma verificação em "não"**. A
tentação de "depois eu arrumo" é exatamente o que o método existe para evitar. Se um degrau não se
sobe completo, o seguinte se constrói sobre areia.

### O projeto-guia: "Turnera"

Se você não tem projeto próprio, use este. É pequeno, mas tem tudo o que é preciso para que nenhum
dos dezesseis degraus seja de mentira: usuários reais, dados pessoais, mensagens que saem ao mundo,
e dinheiro.

**O negócio.** Um consultório (pode ser um estúdio, um salão de beleza, uma oficina: qualquer lugar
que dá horários). Hoje os horários se anotam num caderno e se confirmam por WhatsApp à mão. Perdem-se
horários porque as pessoas esquecem, há horários duplicados porque duas pessoas anotaram em cadernos
diferentes, e ninguém sabe quantos horários foram cancelados no mês passado.

**O que querem.** Uma agenda web onde as duas recepcionistas e os três profissionais vejam os
horários; lembretes automáticos 24 horas antes, por WhatsApp ou e-mail; a possibilidade de pedir um
sinal por link de pagamento para certos horários; e um par de números no final do mês (quantos
horários, quantas faltas, quantos sinais).

**O dono.** A encarregada do consultório. Tem critério sobre o negócio (sabe que horários levam
sinal, com quanta antecedência se pode cancelar, o que se diz a um paciente que faltou três vezes)
e tem quinze minutos por dia para responder perguntas. Não programa, e não vai ler código.

**Os números que só ela sabe.** Uns quarenta horários por dia, duzentos e cinquenta dias por ano.
Umas três mensagens por horário (confirmação, lembrete, às vezes reagendamento). Os dados dos
pacientes se conservam cinco anos. O pico é segunda-feira de manhã, com as duas recepcionistas
carregando ao mesmo tempo. E uma pergunta que ela não sabe responder e que importa: se isto
funciona, vão vender para outros consultórios? (A resposta muda o dimensionamento por dez.)

**O que tem consequências.** Enviar um lembrete (se for enviado duas vezes, incomoda; se for ao
número errado, é um problema de privacidade). Cobrar um sinal (dinheiro). Cancelar um horário
(irreversível para o paciente que o perde). Apagar um paciente (dados pessoais).

Com isso basta para começar. Todo o resto o agente vai perguntar, e faz parte do exercício que
pergunte.

---

## Fase de arranque: lições 0 a 4

Estas cinco lições se fazem uma vez por projeto, antes de escrever funcionalidade. São as que mais
tentação dão de pular ("quero ver algo funcionando"), e são as que mais caro custa pular. Um
conselho prático: faça-as numa semana, de uma vez, e só depois abra o ciclo.

### Lição 0 — Este projeto pode ser encarado assim?

**O que você precisa entender.** O método não serve para qualquer projeto, e saber isso antes de
começar é a primeira decisão de qualidade. Há duas condições sem as quais não funciona: que haja um
repositório padrão onde deixar a evidência (X1), e que as telas possam ser operadas por programa para
provar de ponta a ponta, da tela ao backend (X2). Se qualquer uma das duas falha, o agente não vai
conseguir se verificar sozinho, e então você vai acabar lendo código, que é justamente o que o método
promete evitar. Depois há critérios que ponderam (se há um dono com tempo, se o erro tem
consequências, se pode ser provado num ambiente à parte etc.), que ainda estamos calibrando com os
primeiros projetos.

Para o projeto-guia as duas condições se cumprem: é um projeto novo (não há legado) e vamos
construí-lo com uma interface web operável por programa. Para um projeto próprio, esta lição pode
terminar em "não vai", e isso é um resultado válido do curso.

**A tarefa.**

1. Escreva, à mão, num arquivo `docs/INITIAL_SURVEY.md`, o que você sabe do projeto: o que o cliente
   quer, para quem, o que acontece hoje sem o sistema, que tecnologia há ou se propõe, se há um
   sistema anterior e se tem repositório, quem é o dono e quanto tempo tem, que consequência tem um
   erro, que ambientes vai haver. Meia página. Não importa que esteja incompleto; aliás, faz parte do
   exercício que esteja incompleto.
2. Copie a ficha de critérios do documento principal (os excludentes X1 e X2 e os candidatos D1 a
   D10) para `docs/ELIGIBILITY_CRITERIA.md`.
3. Abra o agente na pasta do projeto (ainda vazia salvo esses dois arquivos) e cole este prompt:

> We are going to assess whether this project can be run with the Urazuke method. Read the
> initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`. First, evaluate whether the survey is sufficient to answer
> every criterion. If any criterion cannot be answered from the survey, ask me for the missing
> information before going on; do not assume. Then fill in the sheet criterion by criterion:
> the answer, where it comes from, and for each exclusionary criterion whether it is green or
> red. Do not decide: present me the completed sheet with your reading and your doubts, and I
> will decide. Reply in my language.

   Você está pedindo que leia os dois arquivos, que **avalie se o levantamento basta e pergunte o
   que falta antes de responder** (esta cláusula se repete em todos os prompts do curso; é o coração
   do método), que preencha a ficha dizendo de onde sai cada resposta, e que não decida: a decisão é
   sua.

4. Responda às perguntas dele. Se não fez nenhuma, desconfie e pergunte o que ele supôs.
5. Quando ele apresentar a ficha, leia e decida. Depois cole o prompt de fechamento:

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.

**Verificação de completude.** Abra `docs/ELIGIBILITY.md` e se pergunte: os dois excludentes têm
resposta explícita e fonte? Há algum critério respondido com "provavelmente"? (Se houver, o agente
tinha que perguntar.) A decisão tem data e nome? As condições, se houver, podem ser verificadas?
Estão as perguntas que ele fez e suas respostas?

**Entrega.** `docs/ELIGIBILITY.md`, de uma página.

**Erros típicos.** Escrever o levantamento "completo" para que o agente não pergunte: você perde o
exercício e, pior, se acostuma a fazer o trabalho do modelo. Responder "vai" com cinco condições: é
um "não vai" disfarçado. E o mais comum: pular a lição porque "é óbvio que vai". O óbvio é o que não
se escreve, e o que não se escreve é o que depois se discute.

**No projeto-guia.** O agente deveria perguntar, no mínimo, se a interface vai ser web ou móvel
(porque X2 depende disso), se há um sistema anterior ainda que seja uma planilha, e que canal de
mensagens vai ser usado (o WhatsApp tem requisitos que o e-mail não tem). A ficha termina em "vai",
com uma condição razoável: ter o canal de mensagens definido antes do degrau 12.

### Lição 1 — O contrato de convivência

**O que você precisa entender.** O agente chega a cada sessão sem memória da anterior. É como um
colega novo toda manhã. O contrato de convivência é o que você diz a ele no primeiro dia e o que ele
vai reler todos os dias: como você trabalha, o que não tolera, que nível de autonomia dá a ele. Sem
contrato, você vai repetir as mesmas coisas a cada sessão, e cada vez um pouco diferente.

As seis regras mínimas têm cada uma uma falha por trás: "meu tempo é sagrado" evita que ele te
consulte a cada detalhe; "zero dívida" evita o "depois eu arrumo"; "escopo exato" evita que "já que
está aqui" te adicione coisas; "documentação no mesmo commit" evita os manuais velhos; "nunca
relatar como feito o não verificado" evita o "pronto" que não era; "fale meu idioma" evita que te
responda em inglês porque o prompt estava em inglês.

**A tarefa.**

1. Pense cinco minutos em como você trabalha: prefere que ele pergunte muito ou pouco? Em que
   idioma? O que te tira do sério ao trabalhar com outras pessoas? Anote numa lista curta; você vai
   contar quando ele perguntar.
2. Cole este prompt:

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

   Você está pedindo as seis regras com a falha que cada uma evita, regras próprias marcadas como
   propostas para que você as aceite ou rejeite, e que ele pergunte sobre você.

3. Responda às perguntas. Leia as propostas: aceite as que te servem, rejeite as que não, sempre
   com uma razão de uma linha.
4. Feche com:

> I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the
> agreement with today's date and a version number. Then add to the project file the
> instruction to read this agreement at the start of every session.

   Se ainda não há arquivo de projeto (você o faz na lição 2), ele vai criar um mínimo com essa
   instrução; está bem.

**Verificação de completude.** Estão as seis regras, cada uma com a falha que evita? Há alguma
escrita como aspiração ("tentar…")? O arquivo de projeto ordena lê-lo ao começar cada sessão? Ele te
fez pelo menos uma pergunta sobre como você trabalha?

**Entrega.** `docs/WORKING_AGREEMENT.md` com data e versão, vinculado ao arquivo de projeto.

**Erros típicos.** Aceitar vinte regras porque todas soam bem: ninguém respeita vinte; seis ou oito
se respeitam. Deixar uma regra que diga que o agente pode mudar o contrato: não. E o mais
silencioso: nunca provar se ele lê. Na lição 2 você vai ver como.

**No projeto-guia.** Uma regra própria que o agente costuma propor para a Turnera, e que vale a
pena aceitar: "nunca mando uma mensagem real a um paciente de um ambiente que não seja produção; em
teste, as mensagens vão para uma caixa falsa". É o degrau 12 aparecendo cedo.

### Lição 2 — A definição do projeto e a leitura obrigatória

**O que você precisa entender.** O arquivo de projeto (`PROJECT.md`, ou `CLAUDE.md`, ou o nome
que sua ferramenta usar) é o mapa que o agente lê ao começar cada sessão. Tem que ser **curto**: o
que é o sistema, para quem, o que NÃO é, os módulos, as decisões tomadas com data, e a ordem de ler o
contrato. O que aconteceu cada dia não vai aí: vai para o estado vivo (`docs/STATUS.md`) e para o
registro de pendências. Um dos sistemas de origem do método deixou este arquivo crescer até 9.661
linhas; nesse estado, ninguém lê, e o modelo também não.

A seção "o que NÃO é" é a mais importante e a que todos deixam vazia. O que não está escrito é o que
o modelo vai inventar quando encontrar uma lacuna.

**A tarefa.**

1. Complete `docs/INITIAL_SURVEY.md` com o que você aprendeu na lição 0 (as respostas às perguntas
   do agente). Adicione uma seção "o que o sistema NÃO deve fazer", ainda que com dois itens.
2. Cole:

> We are going to define the project in writing. Read the business survey in
> `docs/INITIAL_SURVEY.md` and the working agreement in `docs/WORKING_AGREEMENT.md`. Evaluate
> whether the survey is sufficient to describe the system, its users and its boundaries; if it
> is not, ask me for what is missing before writing anything. Then write `PROJECT.md`, three
> hundred lines at most, with: what the system is and for whom; what it is NOT; the main
> modules as a list; the decisions already made, each with its date; and the instruction to
> read this file and the working agreement at the start of every session. Separately, create
> `docs/STATUS.md` for the living state (what is being worked on, what is open): that file
> changes every day; `PROJECT.md` almost never does. Reply in my language.

   Você está pedindo que pergunte antes de redigir, um arquivo de projeto curto com a seção "o que
   não é", decisões com data, e o estado vivo em outro arquivo.

3. Leia `PROJECT.md` inteiro. Tem que caber em cinco minutos. Corrija o que não for verdade ou não
   for seu.
4. Feche com:

> Apply these corrections: [list]. Finalize `PROJECT.md` with today's date. Add to the working
> agreement that the change history never goes into `PROJECT.md`: it goes to `docs/STATUS.md`
> or to the pending-items register.

5. **A prova de leitura.** Feche a sessão do agente e abra uma nova. Sem dizer mais nada, peça: "O
   que este sistema não deve fazer?". Se ele responder com o que diz o `PROJECT.md`, o vínculo
   funciona. Se responder qualquer outra coisa, não está lendo o mapa: revise como sua ferramenta
   carrega o arquivo de projeto.

**Verificação de completude.** `PROJECT.md` se lê em cinco minutos? Diz o que o sistema NÃO faz?
Cada decisão tem data e quem a tomou? O agente perguntou algo antes de redigir? O estado vivo está em
outro arquivo? Passou na prova de leitura?

**Entrega.** `PROJECT.md` (máximo trezentas linhas) e `docs/STATUS.md`, e a prova de leitura
passada.

**Erros típicos.** Colar em `PROJECT.md` toda a especificação que você já tinha: é o programa, não a
especificação. Deixar "o que não é" vazio. E não fazer a prova de leitura: é a única forma de saber
que o degrau 1 e o 2 estão atuando e não só existindo.

**No projeto-guia.** Em "o que NÃO é" da Turnera deveriam estar, no mínimo: não é um sistema de
prontuário (não guarda dados médicos), não é um gateway de pagamentos (usa um link de pagamento de
um provedor, não processa cartões), e não manda mensagens de marketing (só confirmações e
lembretes). Cada um desses três "não" te economiza uma conversa de meia hora mais adiante.

### Lição 3 — Dimensionar antes de desenhar a arquitetura

**O que você precisa entender.** Há decisões que, tomadas mal, custam semanas: que banco de dados,
se as chamadas ao banco são síncronas ou assíncronas, quantas pessoas podem usar o sistema ao mesmo
tempo. E todas dependem de números que **só o negócio tem**: quantos horários por dia, quantas
mensagens por horário, quantos anos se guarda. O modelo não pode inferir esses números; pode inferir
o que se deriva deles (linhas por ano, tamanho em cinco anos). Por isso o prompt exige que
distinga dados primários de derivados, e **peça os primários que faltam em vez de estimá-los**.
Quando o modelo estima um dado primário, faz isso com a mesma cara de seguro de quando calcula; e
você não tem como distinguir pelo tom.

Há além disso um tipo de decisão que convém tomar sempre: as **assimétricas**, baratas se sobram e
caríssimas se faltam. O exemplo canônico é fazer a interface com o banco de dados assíncrona desde o
primeiro dia ainda que o primeiro banco seja um arquivo: se você nunca muda de banco, sobrou um
`await`; se muda, economizou uma reescrita.

**A tarefa.**

1. Sente-se com o dono (ou com você mesmo, se o projeto é seu) e escreva `docs/VOLUME_SURVEY.md`:
   as entidades principais e quantas há, quantas se adicionam por mês, quantos eventos por entidade,
   quantas pessoas operam no pico e quando é o pico, quanto tempo se conservam os dados, se há cargas
   excepcionais, que crescimento esperam. Para cada número, anote de onde sai: "a encarregada
   disse", "contado no caderno de setembro", "suposto". Deixe alguns em "suposto" de propósito: você
   vai ver o que o agente faz com eles.
2. Cole:

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

   Você está pedindo: distinguir primários de derivados; **pedir os primários que faltam ou estão em
   "suposto", e nunca estimá-los**; calcular o derivado com a conta à vista; o cenário "vezes dez";
   três opções com o custo de mudar de uma para outra; e que não escolha.

3. Se ele te pedir os "supostos", bem: esse era o exercício. Consiga os números (pergunte ao dono,
   conte no caderno) e dê a ele. Se não pediu e calculou mesmo assim, pare e pergunte o que fez com
   os supostos: é uma falha do degrau e convém vê-la agora.
4. Leia as três opções. Refaça uma conta à mão (por exemplo, linhas por ano da tabela maior): tem
   que dar o mesmo. Escolha.
5. Feche com:

> I choose option [B]. Record in `docs/SIZING.md`: the primary data with its source, the derived
> data with its arithmetic, the three options, the chosen one and why, and the decisions we are
> taking "just in case" even though they are not needed today (for example: the persistence
> interface is asynchronous from line one, even if the first engine is synchronous). Include the
> questions you asked and my answers.

**Verificação de completude.** Há algum dado primário com fonte "suposto" ou sem fonte? Cada dado
derivado mostra a conta, e dá o mesmo se você refaz? Há três opções e uma escolhida com razão? Diz o
que acontece "vezes dez"? As decisões assimétricas estão escritas? Ele te perguntou?

**Entrega.** `docs/SIZING.md`.

**Erros típicos.** Completar o levantamento com números inventados por você para que o agente não
pergunte (é o mesmo erro da lição 0, e é pior aqui porque esses números decidem a arquitetura).
Escolher a opção "mais potente" por via das dúvidas: o custo de migrar está na tabela justamente
para que você escolha a menor que aguente o "vezes dez". E não escrever as decisões assimétricas: se
não estão escritas, na lição 4 o agente não vai respeitá-las.

**No projeto-guia.** Primários: 40 horários/dia × 250 dias = 10.000 horários/ano; 3 mensagens por
horário = 30.000 mensagens/ano; 5 anos de conservação; pico de duas recepcionistas simultâneas. O
"vezes dez" é a pergunta de se vai ser vendido a outros consultórios: 100.000 horários e 300.000
mensagens por ano. As três opções típicas: um arquivo SQLite (basta para um consultório por anos,
não aguenta o vezes dez com vários escrevendo), PostgreSQL desde o começo (aguenta tudo, custa um
pouco mais de infraestrutura), ou SQLite agora com a interface assíncrona e uma migração prevista
para PostgreSQL (a assimétrica). Para o curso escolhemos a terceira: é a que ensina mais.

### Lição 4 — O esqueleto com suas comportas

**O que você precisa entender.** Antes de o sistema fazer algo útil, tem que arrancar, ser
provado e implantado **vazio**. Parece perda de tempo ("implantar o quê, se não há nada?") e é o
contrário: o caminho até a produção faz parte do produto, e a única forma de saber que funciona é
percorrê-lo quando ainda não há nada a perder. Num dos sistemas de origem a implantação chegou um
mês depois do início e custou cinco pendências seguidas; com o esqueleto implantado na primeira
semana, esses cinco golpes teriam caído no vazio.

As **comportas** são as condições para passar de uma etapa a outra ("a bateria está em verde", "a
implantação em teste funcionou"). Escrevê-las agora, ainda que pareçam óbvias, é o que depois
permite dizer "isto não passa" sem discutir.

**A tarefa.**

1. Escreva `docs/ENVIRONMENTS_SURVEY.md`: onde o sistema vai rodar (um servidor que você já tem, um
   serviço na nuvem), se vai haver um ambiente de teste e um de produção, quem tem acesso a quê, e
   como se implanta hoje se há algo. Se não tem nada, diga: o agente vai propor a opção mais
   simples.
2. Garanta que tem as credenciais do lugar onde vai ser implantado, ainda que seja um serviço
   gratuito. Sem isso, o esqueleto fica na sua máquina e a lição não pode ser terminada.
3. Cole:

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

   Você está pedindo que verifique acessos antes de começar, a lista exata do que é um esqueleto,
   as comportas escritas, uma captura real do ambiente de teste, e a proibição de adicionar
   funcionalidade.

4. Esta tarefa é longa (uma ou duas horas de trabalho do agente) e vai ter idas e vindas:
   credenciais que faltam, um serviço que pede para confirmar o e-mail etc. É normal. O que não é
   normal é que ele te diga "pronto" sem a captura do ambiente de teste.
5. Quando ele mostrar a captura, abra você a URL no seu navegador. Tem que se ver o mesmo.
6. Feche com:

> Skeleton approved. Record in `docs/STATUS.md` the test environment URL, the command to run
> the tests and the command to deploy, and mark this step as done. Then run the deployment a
> second time and show me that the second run changed nothing.

**Verificação de completude.** Você abriu a URL do ambiente de teste e viu a tela vazia? Há um link
para uma execução de integração contínua em verde? A implantação foi executada duas vezes e a segunda
não quebrou nada? As comportas têm cada uma uma condição verificável? Há alguma funcionalidade que
você não pediu?

**Entrega.** O repositório com o esqueleto, a integração contínua em verde, a URL do ambiente de
teste funcionando, `docs/GATES.md`, e `docs/STATUS.md` com os três comandos.

**Erros típicos.** Aceitar "funciona local, a implantação vemos depois": não, a implantação é o
esqueleto. Aceitar uma captura da máquina do agente em vez do ambiente de teste. E deixar que "já
que está aqui" te adicione uma tela de login, um menu, um logo: cada coisa que entra sem pendência é
escopo que escapou.

**No projeto-guia.** O esqueleto da Turnera é uma página web que diz "Turnera — versão 0.0.1"
rodando numa URL pública de um ambiente de teste, um servidor que responde "ok" numa rota de saúde,
um teste de fumaça que chama essa rota, a integração contínua rodando esse teste a cada push, e a
implantação automática no ambiente de teste. As comportas: "bateria em verde para mesclar",
"ambiente de teste em verde para promover a produção", "caminho de volta provado para a primeira
implantação em produção". Nada mais. E é curioso como é satisfatório ver essa página vazia numa URL
real.

---

## Fase do ciclo: lições 5 a 10

Estas seis lições são as que você vai usar **a cada mudança**, durante todo o projeto. Aprendem-se
numa tarde, mas se praticam durante semanas. A ideia é que no final da fase você tenha o reflexo:
pegar uma pendência, construir, provar em vermelho, atualizar o outro lado, medir o que houver que
medir, e relatar separando o verificado do acreditado. Esse reflexo é o método.

Para praticá-las você vai precisar de funcionalidade real. No projeto-guia, o primeiro bloco de
pendências é a agenda básica: ver os horários do dia, cadastrar um horário, cancelá-lo. Nada de
mensagens nem pagamentos ainda; isso vem depois dos cadeados (lição 12).

### Lição 5 — O plano são as pendências

**O que você precisa entender.** Não há "plano" de um lado e "lista de tarefas" do outro: **a
lista de pendências é o plano**. Cada pendência tem número, de onde vem (a decisão ou o pedido que a
originou), como se verifica que está feita, e, quando se fecha, a evidência. Isso último é o que
você vai olhar em vez de olhar o código. E uma regra de ouro para o agente: o que aparece fora da
lista se anota como pendência nova, não se faz.

**A tarefa.**

1. Escreva em `docs/INITIAL_SURVEY.md` (ou num arquivo à parte) o pedido do cliente para o primeiro
   bloco de funcionalidade, tal como o cliente diria, com suas ambiguidades. Para a Turnera: "quero
   ver os horários do dia, cadastrar um novo e cancelar".
2. Cole:

> We are going to turn everything that must be done into numbered pending items. Read
> `PROJECT.md`, the client's request and whatever is in `docs/STATUS.md`. If the request is
> ambiguous on any point such that you cannot write a verifiable pending item for it, ask me;
> do not resolve it by assuming. Create `docs/PENDING.md` with one item per thing to do: number
> (PND-001 onwards), one-line title, what is requested, which decision originates it (or
> "client request, date"), how it will be verified as done, and status. Order them by the
> priority I gave you; if I gave none, propose an order and tell me why. Reply in my language.

   Você está pedindo que converta o pedido em itens verificáveis, que **pergunte quando o pedido não
   dá para escrever um verificável**, e que proponha uma ordem com sua razão.

3. Responda às perguntas (para a Turnera ele vai perguntar, por exemplo, o que é "o dia": o de hoje,
   ou qualquer um que se escolha?; cancelar apaga ou marca?). Essas perguntas são decisões de
   negócio; na lição 6 você vai ver onde se escrevem.
4. Adicione ao contrato de convivência a rotina de cada sessão. Cole:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before touching any code, open
> `docs/PENDING.md`, tell me which item you are taking and why. Every commit cites its pending
> item. A pending item is closed with written evidence (the test, the screenshot, the number),
> never with 'done'. If along the way you see something that is not on the list, add it as a new
> pending item; do not do it."

5. Agora sim, comece a construir. Peça que pegue a primeira pendência. A partir daqui, cada sessão
   começa com "que pendência você pega e por quê".

**Verificação de completude.** Cada pendência diz como se verifica? Há pendências fechadas sem
evidência nem commit? Pegue três commits ao acaso: citam sua pendência? Apareceu no código algo sem
pendência? Ele te perguntou pelo ambíguo?

**Entrega.** `docs/PENDING.md` com o primeiro bloco, a rotina no contrato, e a primeira pendência
em curso.

**Erros típicos.** Escrever pendências sem "como se verifica" ("melhorar a tela de horários"): não
podem ser fechadas, e então se fecham com "pronto". Deixar o agente fechar pendências sem evidência
porque "já vi funcionar". E o que mais custa corrigir: deixar que ele faça "uma coisinha a mais" fora
da lista. A primeira vez que você deixa, perdeu o escopo exato.

**No projeto-guia.** O primeiro bloco da Turnera são umas seis pendências: PND-001 ver os horários
de um dia; PND-002 cadastrar um horário com paciente, profissional, data e hora; PND-003 impedir
dois horários do mesmo profissional na mesma hora; PND-004 cancelar um horário (marcar, não apagar:
decisão da lição 6); PND-005 buscar um paciente por nome ou telefone; PND-006 o cadastro de
paciente com os dados mínimos. Cada uma com sua verificação: "aparece na tela e fica no banco", "ao
tentar o horário duplicado a tela avisa e o banco não grava" etc.

### Lição 6 — As decisões se escrevem junto ao código

**O que você precisa entender.** O modelo, quando encontra uma lacuna nas regras de negócio, **a
preenche**. Não para para perguntar; completa com o que lhe parece mais provável, com a mesma
naturalidade com que escreve o resto. Por isso esta lição não é "escreva as decisões" mas "exija que
ele pare e pergunte quando faltar uma". E quando você decide, a decisão se escreve com suas palavras
textuais, seu nome e a data, no commit e num registro. Seis semanas depois, quando alguém perguntar
"por que cancelar não apaga?", a resposta está escrita e é sua.

**A tarefa.**

1. Adicione ao contrato a rotina de decisões. Cole:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Whenever implementing something requires a
> business rule that is not written down, or you must choose between two approaches that change
> what the user sees, stop and ask me, in prose, with your recommendation and the alternative. Do
> not implement the one you prefer. When I decide, write the decision with my name and the date
> in the commit message and in `docs/DECISIONS.md`, with the exact words I used. If I do not
> answer and you must move on, implement the most reversible option and mark it 'decision by
> omission, pending confirmation', so that I can review it."

   Você está pedindo que pare diante de uma regra não escrita, que pergunte com recomendação e
   alternativa (para que você possa decidir em dez segundos), que registre suas palavras textuais, e
   que quando você não responde escolha o mais reversível e marque.

2. Continue construindo as pendências do bloco. Cada vez que ele te perguntar uma regra de negócio,
   decida e responda com o formato de fechamento:

> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.

3. Faça a prova contrária, uma vez, de propósito: deixe uma pergunta sem resposta durante uma sessão
   e veja o que ele faz. Tem que escolher o mais reversível e marcar "por omissão". Se escolheu o que
   lhe pareceu e não marcou, é uma falha do degrau: corrija no contrato.

**Verificação de completude.** Abra três commits que toquem regras de negócio: citam quem decidiu
e quando? Há decisões "por omissão" sem confirmar? Há alguma regra no sistema que você não reconhece
como sua? As frases são textuais ou "melhoradas"?

**Entrega.** `docs/DECISIONS.md` crescendo, com pelo menos cinco decisões do primeiro bloco, e os
commits citando-as.

**Erros típicos.** Responder às perguntas por chat e não exigir que fiquem escritas: na terceira
sessão ninguém mais se lembra. Deixar que o agente "melhore" suas palavras: uma regra parafraseada é
uma regra diferente. E o mais grave: descobrir em produção uma regra que ninguém decidiu. Quando
acontecer (vai acontecer), não é um bug: é uma falha do degrau 6, e se corrige no contrato, não só no
código.

**No projeto-guia.** Decisões típicas do primeiro bloco da Turnera: "cancelar marca o horário como
cancelado e guarda quem e quando; não se apaga nada"; "um profissional não pode ter dois horários na
mesma hora, mas sim dois pacientes num horário duplo se o profissional habilitou"; "o telefone do
paciente é obrigatório; o e-mail não". Cada uma com data e com o nome da encarregada.

### Lição 7 — Testes como cadeados, provados em vermelho

**O que você precisa entender.** Esta é a lição central do curso. Um teste que você nunca viu
falhar, você não sabe se prova algo. O modelo escreve o código e o teste na mesma sessão, com o
mesmo entendimento: se entendeu mal o pedido, o teste prova o que ele entendeu, e passa. A única
forma barata de saber que o teste olha para o que importa é **vê-lo em vermelho contra o código
antigo**: se o código de antes da mudança também passa, o teste não distingue o antes do depois, e
então não serve. Por isso o pedido não é "escreva testes" mas "me mostre o vermelho, depois o verde,
depois a regressão".

E uma segunda ideia: as provas de ponta a ponta. Um teste que verifica a partir da tela (clica,
digita, lê) e comprova o efeito no backend (a linha ficou, o estado mudou) é o que substitui sua
leitura do código. É o critério X2 da lição 0 convertido em prática.

**A tarefa.**

1. Adicione ao contrato a rotina de evidência. Cole:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "To close a pending item I need evidence,
> not your word. (1) Write the test that proves what the item asks for. (2) Demonstrate that this
> test fails against the previous code: you may temporarily revert the change, or run the test
> against the old version, but show me the red output. (3) Show me the green output with the
> change. (4) Run the regression suite for the neighbouring items and show me it is still green.
> (5) Do not replace with mocks the very part you are trying to test. If testing end to end
> requires something you lack (data, access, an environment), ask me for it; do not simulate what
> you do not have. Finally, the commit message says 'proved red against [what]' and the test
> counts."

   Você está pedindo o teste, **o vermelho demonstrado com a saída à vista**, o verde, a regressão
   dos vizinhos na mesma sessão, nada de simular justo o que se prova, e pedir o que falta para provar
   de ponta a ponta em vez de simular.

2. Pegue a pendência do horário duplicado (PND-003 na Turnera, ou o equivalente no seu projeto: uma
   regra que impede algo). Peça que a feche com a rotina. Leia o relatório: tem que haver uma saída
   em vermelho com números ("1 de 1 falha contra a versão sem a regra") e depois o verde.
3. Peça um teste de ponta a ponta para essa mesma pendência: que abra a tela, tente cadastrar o
   horário duplicado, leia o aviso, e comprove no banco que não foi gravado. Se ele disser que não
   pode porque a tela não pode ser operada por programa, pare: isso é X2 falhando, e tem que ser
   corrigido agora (adicionar identificadores aos elementos da tela) antes de seguir.
4. Quando o agente disser que algo "não dá para testar", cole:

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

**Verificação de completude.** O relatório mostra o vermelho, com números? A regressão rodou na
mesma sessão, com números? Há alguma parte simulada justo onde está a mudança? O commit diz
"provado em vermelho"? O teste de tela verifica também o backend?

**Entrega.** Pelo menos três pendências fechadas com a rotina completa (vermelho, verde,
regressão), uma delas com um teste de ponta a ponta.

**Erros típicos.** Aceitar "os testes passam" sem números e sem vermelho. Aceitar que a bateria se
"acelere" substituindo as provas de ponta a ponta por simulações. E deixar passar um "não dá para
testar" sem abrir a pendência: a não-testabilidade é dívida, e a dívida se registra.

**No projeto-guia.** O vermelho do horário duplicado se vê assim: o agente tira temporariamente a
regra, roda o teste, e a saída diz que o teste falhou porque o segundo horário foi gravado. Põe a
regra de volta, roda, verde. Depois a regressão: os testes de PND-001 e PND-002 continuam em verde. E
o de ponta a ponta: um navegador controlado por programa carrega o formulário, aperta "salvar", lê a
mensagem "esse horário já está ocupado", e uma consulta ao banco confirma que há um único horário
naquela hora. Quando você vir esse relatório pela primeira vez, vai entender para que é todo o
método.

### Lição 8 — Simetria entre produtor e consumidor, e o registro de antipadrões

**O que você precisa entender.** Quando você muda uma ponta do sistema (o servidor, o banco, um
robô), a outra ponta (a tela, um contador, um relatório) tem que mudar no mesmo commit. Se não,
divergem, e o usuário vê um número de um lado e outro do outro. O princípio que evita isso é simples
de enunciar e difícil de sustentar: **toda lista tem um único dono**. Os estados possíveis de um
horário, as colunas de um relatório, as causas pelas quais algo espera: uma única parte os define (o
produtor) e as demais os leem de lá. Assim que há duas cópias, uma está desatualizada; só falta
saber qual.

A segunda metade da lição é o registro de antipadrões (GOTCHAS): os erros que você já pagou uma
vez, anotados com seu cheiro, sua causa raiz, sua correção e como detectá-los antes. O importante não
é anotá-los: é adicionar a verificação automática que os detecte, porque um antipadrão anotado e não
automatizado se repete quando a sessão muda.

**A tarefa.**

1. Peça o mapa de contratos:

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

   Você está pedindo o inventário de contratos com seus dois lados, e que o que ele não vê ele
   declare em vez de omitir.

2. Adicione a rotina ao contrato:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before closing any change that touches a
> contract, look up every consumer in the map and update them in the same commit. Always prefer
> that the producer defines the list (columns, causes, states) and the consumer reads it, rather
> than each keeping its own copy. If the map does not have that relationship, add it."

3. Faça a prova da lista: escolha uma lista que apareça na tela (na Turnera, os estados de um
   horário: pendente, confirmado, cancelado, faltou) e peça ao agente que mostre onde está definida e
   onde é lida. Se há duas definições, peça que deixe só uma.
4. Na primeira vez que algo quebrar pela segunda vez (vai acontecer nas próximas semanas), cole:

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

**Verificação de completude.** Escolha um contrato do mapa: cada consumidor o lê do produtor ou
tem sua cópia? Há um número que se mostre em duas telas e dão igual? Cada entrada do GOTCHAS tem as
quatro partes? Repetiu-se algo que já estava anotado?

**Entrega.** `docs/PRODUCER_CONSUMER_MAP.md`, a rotina no contrato, e `docs/GOTCHAS.md` (ainda que
comece com uma única entrada).

**Erros típicos.** Fazer o mapa uma vez e não voltar a olhá-lo: tem que crescer com cada contrato
novo. Anotar antipadrões como anedotas ("uma vez aconteceu que…") sem a parte "como detectá-lo
antes". E o clássico: o mesmo texto de um estado escrito à mão no servidor e na tela; no dia em que
um muda, o outro fica.

**No projeto-guia.** O mapa da Turnera tem, no começo, quatro ou cinco contratos: a lista de
estados de horário (define-a o servidor, leem-na a tela e o relatório mensal); a tabela de horários
(escreve-a o cadastro, leem-na a agenda do dia e o relatório); a tabela de pacientes; e, mais adiante,
a fila de mensagens (escreve-a a agenda, lê-a o enviador). O primeiro GOTCHA costuma ser de datas: a
agenda mostrava o horário no dia errado porque o servidor guardava num fuso horário e a tela mostrava
em outro. Cheiro: "o horário das 23 aparece amanhã". Causa raiz: dois fusos horários. Correção: um
só, no servidor. Detecção: um teste com um horário às 23:30.

### Lição 9 — Medir antes de construir, com um instrumento que também se verifica

**O que você precisa entender.** O modelo produz afirmações com número ("há umas 120 consultas
desse tipo") e soam exatamente igual quando são medidas e quando são estimadas. Você não pode
distingui-las pelo tom. A única forma é exigir o instrumento: "com que você mediu? mostre o
comando". A regra do degrau é que **nenhum número que decide algo sai de uma impressão**: sai de um
medidor que vive no repositório, que tem um teste que o verifica contra um caso conhecido, e que você
pode rodar.

E há algo mais, que aprendemos na marra: os medidores também mentem. Num dos sistemas de origem, um
medidor dava zero porque não via uma parte do código, e outro dizia 27 quando eram 44. Por isso a
auditoria em duas direções: do código à medida (tudo o que deveria ser contado está contado?) e da
medida ao código (tudo o contado existe de verdade?).

Num projeto pequeno, "medir" é modesto: contar quantas consultas uma tela faz ao carregar, quanto
demora o relatório mensal, quantas mensagens foram enviadas ontem. Não precisa de catraca nem
orçamento por caminho. O que precisa é que o número tenha um comando por trás.

**A tarefa.**

1. Escolha uma hipótese. Na Turnera, uma boa: "a agenda do dia faz uma consulta ao banco por cada
   horário que mostra" (o clássico laço N+1). Se não for verdade, melhor: você vai ver como se
   verifica uma hipótese falsa.
2. Cole:

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

   Você está pedindo o medidor no repositório, o teste do medidor, pedir o que lhe falta em vez de
   aproximar, marcar o aproximado, o número com o comando, a auditoria em duas direções, e a ordem:
   primeiro medir, depois propor.

3. Rode você o comando que ele deu. Tem que dar o mesmo número. Não precisa entender o script; sim
   executá-lo.
4. Se a hipótese era verdadeira e o agente propõe corrigir, peça um orçamento:

> Set the budget for [queries] on this path at the measured value plus a small margin, and
> protect it with a test that fails if it is exceeded. Tell me the number and the margin.

   Assim, se alguém voltar a meter o laço daqui a três meses, a bateria detecta.

5. Adicione ao contrato a regra cinco, para quando um plano trouxer números:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before executing a plan that asserts
> numbers, verify every number with the meter. If any does not match, stop and tell me; do not
> execute on a wrong number."

**Verificação de completude.** Você rodou o medidor e deu o mesmo? Tem teste, contra que caso
conhecido? Há algum número no relatório sem medidor por trás? O aproximado está marcado? Há
orçamento com teste?

**Entrega.** Um medidor no repositório com seu teste, um número com seu comando e data em
`docs/STATUS.md` ou na pendência, e (se correspondia) um orçamento protegido por um teste.

**Erros típicos.** Aceitar o número sem rodar o comando: metade do valor desta lição está em você
rodá-lo. Um medidor que dá zero: quase nunca é zero; quase sempre não está vendo algo. E deixar que o
agente "corrija enquanto mede": a ordem é o método.

**No projeto-guia.** O medidor da Turnera é um script que carrega um dia com 10, 50 e 200 horários
num banco de teste, abre a agenda desse dia contando as consultas, e escreve os três números. O teste
do medidor verifica que com 0 horários conta exatamente as consultas base (digamos, 2). Se havia
laço, os números são 12, 52 e 202; corrige-se, passam a ser 3, 3 e 3, e o orçamento fica em 4 com um
teste que falha se a agenda faz mais de 4 consultas para qualquer quantidade de horários.

### Lição 10 — Verificação honesta e relatório proporcional

**O que você precisa entender.** Se você não vai ler código, o relatório do agente tem que ser
confiável, e isso não acontece sozinho. O modelo foi treinado para ser útil e completo, e um
relatório que diz "isto não pude verificar" parece menos útil do que um que diz "pronto". Então é
preciso **pedir explicitamente** as más notícias, os pontos cegos e o que não fez. Se você não
pede, ele não dá; não porque esconda, mas porque não considera parte da resposta.

A estrutura que o torna honesto são três blocos: **verificado** (com a prova ao lado), **acreditado**
(o que ele acha que funciona e por que não provou), e **pontos cegos** (o que não pode ver de onde
está). E uma regra: as más notícias primeiro.

**A tarefa.**

1. Adicione ao contrato a rotina de relatório:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "When you report, separate three blocks:
> VERIFIED (what you tested, with the command and its output), BELIEVED (what you think works but
> did not test, and why not), and BLIND SPOTS (what you cannot see from where you are: another
> environment, real data, the user's browser). Cover every item I asked for, one by one, even when
> the answer is 'I did not do it'. No claim without its proof next to it. Do not say 'done': say
> what is done and how you know it. If something went wrong, say it first."

2. Peça que feche a próxima pendência e leia o relatório com a lista de verificação abaixo. Na
   primeira vez, quase certamente, o bloco "pontos cegos" vai estar vazio. Pergunte: "o que você não
   pode ver de onde está?". Tem que haver algo (seu navegador, o ambiente de produção, os dados
   reais). Se ele insistir que nada, insista você.
3. Pratique o "continua quebrado". Peça algo pequeno, verifique no ambiente de teste, e se por
   qualquer razão você não vir a mudança (é comum: a implantação demora, ou não foi feita), diga
   "continua quebrado" e cole:

> Before diagnosing again, compare the version running where I see the problem with the version
> that contains your fix. Tell me both. If they differ, the problem is publication, not code.

   Metade dos "continua quebrado" são correções que estão no repositório e não no lugar onde você
   olha. Esta cláusula te economiza horas.

**Verificação de completude.** Estão os três blocos? Você escolheu uma afirmação de "verificado"
ao acaso e ela tem sua prova ao lado, e você pôde reproduzi-la? Cobre cada item do que você pediu?
As más notícias estão no começo? Ele disse "pronto" seco alguma vez?

**Entrega.** A rotina no contrato e três relatórios consecutivos com os três blocos, um deles com
um ponto cego real.

**Erros típicos.** Ler só o bloco "verificado" e pular os outros dois: os outros dois são os que te
protegem. Aceitar "deveria funcionar" dentro de "verificado": isso é "acreditado" disfarçado. E se
acostumar a relatórios cada vez mais longos: um relatório inflado está tapando algo com volume.

**No projeto-guia.** Um bom relatório de fechamento de PND-004 (cancelar um horário) na Turnera:
"VERIFICADO: o teste de cancelamento passa (1/1, provado em vermelho contra a versão que apagava);
regressão 6/6; no ambiente de teste, o horário 17 de 3 de novembro figura cancelado por 'recepcao1'
às 10:42 (captura). ACREDITADO: o relatório mensal vai contar bem os cancelamentos, mas não provei
porque o relatório é PND-011 e ainda não existe. PONTOS CEGOS: não posso ver como o estado
'cancelado' aparece no celular da recepcionista; prove você."

---

## Fase de operação: lições 11 a 15

Estas cinco lições são as que convertem "funciona" em "pode ser sustentado". Fazem-se quando o
primeiro bloco de funcionalidade está construído com o ciclo, e antes de o sistema agir sobre o
mundo (mandar mensagens, cobrar) ou ter usuários reais. No projeto-guia, é o momento de adicionar os
lembretes e o sinal, e por isso a lição 12 (cadeados) vem antes de construir essas funcionalidades,
não depois.

### Lição 11 — A auditoria periódica como insumo do plano

**O que você precisa entender.** De vez em quando é preciso olhar o sistema inteiro com olhos
frescos, e o que se vê não vai para um relatório que se arquiva: vai para a lista de pendências. A
parte importante é "olhos frescos": quem audita não tem que ser quem construiu, porque compartilha
seus pressupostos. Um modelo que construiu um módulo "sabe" que a senha escrita no código era
provisória; um modelo que o vê pela primeira vez a relata como o que é. Não precisa de outra
empresa: basta **outra sessão, com outro arquivo de instruções, que não tenha participado**.

**A tarefa.**

1. Abra uma sessão nova do agente numa cópia limpa do repositório (clone-o em outra pasta). Se sua
   ferramenta permitir, dê a ela um arquivo de instruções diferente, que só diga "você é um auditor;
   você não construiu este sistema". Dê acesso somente leitura ao ambiente de teste.
2. Cole:

> Audit this system for [integrity, security, performance and code quality]. Read-only: change
> nothing except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires
> access you lack (the database, the log, an environment), tell me and mark that part as not
> audited; do not pass it as fine. Go through all of the code, not a sample. For every finding:
> where it is (file and line), what the risk is, what evidence proves it (the command, the
> query, the number), and its priority: P0 must be fixed now, P1 soon, P2 when possible. Give a
> grade to every dimension you audited. End with the list of P0 findings turned into proposed
> pending items. Reply in my language.

   Você está pedindo somente leitura, que declare o que não pôde auditar em vez de aprová-lo por
   omissão, todo o código e não uma amostra, cada achado com localização, risco, evidência e
   prioridade, notas por dimensão, e os P0 já como pendências propostas.

3. Leia o relatório. Escolha dois achados e peça ao auditor que mostre a evidência (o comando, a
   linha). Tem que conseguir.
4. Volte à sessão do construtor e cole:

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.

5. Repita esta lição antes da primeira implantação em produção (lição 13) e, depois, a cada um ou
   dois meses.

**Verificação de completude.** O relatório diz o que NÃO pôde auditar? Dois achados ao acaso têm
arquivo, linha e evidência reproduzível? Cada P0 tem sua pendência aberta? As notas vão poder ser
comparadas com a próxima auditoria? Auditou uma sessão diferente da que construiu?

**Entrega.** `docs/AUDIT_[data].md` e as pendências P0/P1 abertas.

**Erros típicos.** Auditar com a mesma sessão que construiu: vai confirmar seus próprios
pressupostos. Aceitar um relatório sem nenhum P0 num sistema com mais de um mês: quase nunca é
verdade. E arquivar o relatório sem abrir as pendências: aí a auditoria não serviu para nada.

**No projeto-guia.** A primeira auditoria da Turnera costuma encontrar: dados de pacientes no log
(telefones impressos ao enviar mensagens: P0); a busca de pacientes por nome sem índice (P1, vai se
notar aos 5.000 pacientes); o formulário de horário sem validar que a data seja futura (P1); e alguma
dependência com uma vulnerabilidade conhecida (P1). Quatro pendências novas, todas com arquivo e
linha.

### Lição 12 — Fail-closed, cadeados e zero dano silencioso

**O que você precisa entender.** O software, por padrão, na dúvida segue em frente: se a
validação falha, o código continua; se o serviço não responde, assume-se que está tudo bem. É
"fail-open", como uma porta que se abre quando falta luz. O método inverte o padrão: **na dúvida,
não**. Toda ação com consequência (cobrar, enviar, apagar, aprovar) leva um cadeado, tem um caminho
de volta escrito, e toda automação nova começa em modo de ensaio, registrando o que teria feito,
até você habilitá-la.

Esta lição vem **antes** de construir as funcionalidades que agem sobre o mundo. Na Turnera, antes
dos lembretes e do sinal.

**A tarefa.**

1. Escreva `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` com o dono: o que o sistema faz ou vai fazer que
   cobra, envia, aprova, apaga ou avisa alguém de fora; o que acontece se for feito duas vezes; o
   que acontece se for feito errado; como se desfaz.
2. Cole:

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock. Reply in my language.

   Você está pedindo que compare o que o negócio disse com o que o código faz (ali aparecem as
   ações de que ninguém se lembrava), que as diferenças sejam perguntadas, e para cada ação a
   reversibilidade, o cadeado e o caminho de volta, com a regra do fail-closed escrita.

3. Confirme cadeado por cadeado. Feche com:

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.

4. Agora construa as funcionalidades com consequência (os lembretes, o sinal) com o ciclo das
   lições 5 a 10, e deixe-as em modo de ensaio. Olhe durante uns dias o registro de "teria mandado"
   antes de habilitar o envio real.

**Verificação de completude.** Cada ação que cobra, envia, aprova ou apaga está na tabela? Cada
cadeado tem seu teste em vermelho? Toda ação irreversível tem caminho de volta escrito? As
automações novas começaram em modo de ensaio e você viu o registro antes de habilitá-las?

**Entrega.** `docs/LOCKS.md`, um teste por cadeado provado em vermelho, e as automações em modo de
ensaio com seu registro.

**Erros típicos.** Habilitar o envio real "para testar com uma mensagem para o meu próprio
telefone": o modo de ensaio existe justamente para isso. Um cadeado que se contorna com um parâmetro
"para testes": esse parâmetro vai ficar ligado em produção. E não olhar o registro de "teria
feito": é a única janela para ver um erro antes que chegue a um paciente.

**No projeto-guia.** A tabela de cadeados da Turnera: enviar lembrete (não reversível; cadeado:
idempotência por horário, um único envio por horário e canal, limite de 200 por dia, modo de ensaio
primeiro; volta: nenhuma, por isso o limite); cobrar sinal (reversível com devolução; cadeado:
confirmação explícita da recepcionista, valor fixado pelo profissional; volta: devolução pelo
provedor de pagamentos); cancelar horário (irreversível para o paciente; cadeado: confirmação e
registro de quem; volta: recriar o horário); apagar paciente (irreversível; cadeado: confirmação
dupla, só a encarregada, e só se não tem horários futuros; volta: nenhuma, por isso dupla). Cada
cadeado com um teste que mostra que, sem o cadeado, a ação acontecia.

### Lição 13 — Integração contínua, ambientes, segredos e implantação como parte do produto

**O que você precisa entender.** Chegar à produção tem que ser um pacote reproduzível: os testes
rodam **uma** vez, a implantação só empacota e sobe, a configuração vive no servidor e não no
repositório, há um procedimento para promover de teste a produção que pode ser rodado duas vezes, e o
caminho de volta está **provado** (um caminho de volta que nunca foi provado não existe). Sobre os
segredos, uma regra sem exceções: **um segredo que foi visto num chat, num log ou num commit já não
é um segredo**; rotaciona-se, e ponto.

Você já tem boa parte disto desde o esqueleto (lição 4). Esta lição completa rumo à produção.

**A tarefa.**

1. Complete `docs/ENVIRONMENTS_SURVEY.md` com o que falta para produção: o domínio, onde vão viver
   os segredos, quanta cota de integração contínua você tem (se usa GitHub Actions, veja o limite do
   plano: um dos sistemas de origem a queimou rodando os testes três vezes por commit).
2. Cole:

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

   Você está pedindo os acessos antes de começar, os testes uma única vez por commit, a implantação
   que só empacota, a configuração fora, a promoção repetível, o caminho de volta provado, o cadeado
   contra segredos, e a documentação para uma pessoa.

3. Antes da primeira implantação em produção, faça a auditoria da lição 11 se não fez.
4. Adicione ao contrato a rotina de implantação:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before touching production: the test
> environment is green with the same version; the rollback is ready; and tell me what changes in
> the configuration. After deploying: show me the version running in production and an
> end-to-end check on production, read-only."

5. Faça a primeira implantação em produção, com o sistema ainda sem usuários reais. E depois **prove
   o caminho de volta**: peça que volte à versão anterior e mostre que está rodando, e depois que
   volte à nova.
6. Se em algum momento do curso você colou um segredo no chat (uma chave de API, uma senha), cole:

> That secret is compromised: rotate it now, tell me everywhere else it was used, and add the
> check that would have caught it.

**Verificação de completude.** Quantas vezes roda a bateria por commit? (uma; peça o link). Há
algum valor real de configuração no repositório? (peça a busca vazia). Você conseguiria seguir
`docs/DEPLOYMENT.md` sozinho? O caminho de volta foi provado, quando, com que evidência? Foi
rotacionado todo segredo que apareceu no chat? Você sabe quanta cota de integração contínua resta?

**Entrega.** A integração contínua uma vez por commit, a implantação que só empacota,
`docs/DEPLOYMENT.md`, o caminho de volta provado, o cadeado anti-segredos ativo, e o sistema rodando
em produção (sem usuários ainda).

**Erros típicos.** A implantação "à mão, rápido, porque é uma mudança pequena": as mudanças
pequenas são as que quebram a produção, porque ninguém as testa. O arquivo de exemplo de
configuração com valores que parecem reais (são). E não provar o caminho de volta até o dia em que
precisa.

**No projeto-guia.** Para a Turnera, a integração contínua roda a bateria (uns 30 testes a esta
altura, incluídos os de ponta a ponta) a cada push; a implantação em teste é automática ao mesclar
em `main`; a promoção a produção é um comando que empacota a versão que está em teste e a sobe, com
a configuração (a chave do provedor de mensagens, a do provedor de pagamentos, a URL do banco) num
arquivo de ambiente no servidor que não está no repositório. O caminho de volta é o mesmo comando com
a versão anterior. E o cadeado anti-segredos é uma verificação a cada commit que rejeita qualquer
coisa que pareça uma chave.

### Lição 14 — Documentação viva e manuais que uma pessoa pode seguir sem IA

**O que você precisa entender.** O sistema tem que poder ser usado, mantido e recuperado sem o
agente e sem você. O critério para o manual de recuperação é concreto: **tem que poder ser seguido
por uma pessoa de confiança que não programe, às três da manhã, com o sistema caído e o agente sem
conexão**. Se um passo diz "consultar o desenvolvedor", está incompleto. E como regenerar
documentação com um modelo é grátis, a regra passa a ser "no mesmo commit": cada mudança que toca o
que o usuário vê, o que o operador faz ou como se implanta atualiza o manual no mesmo commit.

**A tarefa.**

1. Adicione a rotina ao contrato:

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Every change that modifies what the user
> sees, what the operator does, or how the system is deployed, updates the corresponding manual in
> the same commit. If you do not know which manual, ask."

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

   Você está pedindo os três manuais com capturas reais, o critério das três da manhã para o de
   recuperação, que pergunte o que só o negócio sabe em vez de deixar lacunas, e data e versão.

3. A prova real: dê o manual de recuperação a alguém que não programe (o dono, um familiar) e peça
   que siga a seção "caiu" no ambiente de teste. Onde travar, há que corrigir o manual.
4. Depois da próxima mudança de tela, verifique que o commit tocou o manual de usuário.

**Verificação de completude.** Uma captura ao acaso coincide com o ambiente de teste de hoje?
Alguém que não programa pôde seguir a seção "caiu"? O último commit que mudou uma tela tocou o
manual? Há lacunas tipo "[completar]"? Cada manual diz para que versão vale?

**Entrega.** Os três manuais com data e versão, e a prova com uma pessoa feita.

**Erros típicos.** Gerar os manuais uma vez e não colocar a rotina no contrato: em dois meses têm
capturas de telas que já não existem. Um manual de recuperação que começa com "abra uma sessão com o
agente". E não fazer a prova com uma pessoa: é a única verificação que vale.

**No projeto-guia.** O manual de usuário da Turnera tem seis telas com captura; o de manutenção
explica onde está cada módulo e como rodar a bateria; e o de recuperação diz, em ordem, com os
comandos: como saber se o sistema está caído, como reiniciá-lo, como voltar à versão anterior, como
restaurar o banco do último backup (que se faz todas as noites: isso também sai desta lição), e a
quem ligar. A encarregada o seguiu no ambiente de teste e travou em "restaurar o banco" porque o
comando assumia uma pasta que ela não tinha; corrigiu-se o manual.

### Lição 15 — O agente dentro do sistema, e a retrospectiva com número

**O que você precisa entender.** Duas coisas fecham o ciclo. A primeira é opcional: deixar o
agente residente em produção, com escopo delimitado, para diagnosticar e dar suporte sem você estar.
A regra que ordena é que **age em nome de alguém**: sua credencial está mapeada a uma pessoa
responsável, e tudo o que faz fica registrado em nome dessa pessoa; não é uma conta anônima, é um
empregado com chefe. A segunda é obrigatória: a retrospectiva com números. O que custou, quantas
pendências, quais deram voltas, que incidentes houve e em que degrau caem, e **pelo menos uma
mudança proposta à escada**. Uma retrospectiva que não muda nada não foi uma retrospectiva.

**A tarefa (agente residente, se corresponder).**

1. Decida com o dono se o sistema precisa de um agente residente. Na Turnera sim: as recepcionistas
   vão ter perguntas ("por que o lembrete não chegou para este paciente?") que o agente pode
   responder lendo o log, sem que ninguém ligue para o desenvolvedor.
2. Cole:

> We are going to leave you resident in production. First, build the map of the system you will
> need in order to operate it: modules, environments, where each configuration lives, which
> actions are consequential (read `docs/LOCKS.md`), whom to notify. If there are parts of the
> system you cannot see from where you are, tell me; the map must not have hidden gaps. Then
> propose your scope in three levels: read-only and diagnosis; configuration changes with my
> approval; consequential actions behind locks. I choose the level. Your credential acts as the
> person who created it: everything you do is logged under that person's name. Reply in my
> language.

   Você está pedindo o mapa antes de operar, que as lacunas do mapa sejam declaradas, três níveis
   de escopo para que você escolha um, e a credencial em nome de uma pessoa.

3. Escolha o nível (para começar, sempre o primeiro: somente leitura e diagnóstico). Feche com:

> Level [1: read-only and diagnosis]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the
> credential (never its value), and the procedure to request my approval. Then prove, with a real
> attempt recorded in the log, that something outside your scope is rejected.

**A tarefa (retrospectiva, sempre).**

4. Junte os números que só você tem: quantas horas dedicou, quanto gastou na ferramenta de IA,
   quanta cota de integração contínua usou.
5. Cole:

> [The project] is over. Do the retrospective with numbers, not impressions: what it cost
> (tokens, quota, my time), how many pending items, which ones took the most rounds and why,
> which incidents happened and which step of the ladder each falls into, and which step failed
> or was missing. If you lack the data for any figure (my time, for instance), ask me for it or
> mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder:
> which step is modified, how, and which incident justifies it. Write it to
> `docs/RETROSPECTIVE_[date].md`. Reply in my language.

   Você está pedindo números com fonte, cada incidente mapeado a um degrau (um incidente que não
   cai em nenhum é um degrau que falta), que ele peça os números que não tem, e uma proposta
   concreta de mudança à escada.

6. Leia a proposta de mudança. Se parecer válida, mande ao repositório do Urazuke como proposta de
   melhoria (ver `CONTRIBUTING.md`): essa é a forma como o método aprende de cada projeto.

**Verificação de completude.** O mapa diz o que o agente NÃO pode ver? Você viu no log que uma
ação fora do escopo é rejeitada? A credencial age em nome de uma pessoa? A retrospectiva tem
números com fonte, ou adjetivos? Cada incidente cai num degrau? Há pelo menos uma proposta concreta
de mudança?

**Entrega.** `docs/RESIDENT_AGENT.md` (se corresponder) e `docs/RETROSPECTIVE_[data].md`.

**Erros típicos.** Dar ao agente residente um nível alto "para que possa resolver tudo": comece por
somente leitura e suba quando houver evidência. Uma retrospectiva que diz que tudo saiu bem: nunca
sai tudo bem; está escrita para você, não para o método. E não mandar a proposta de mudança: o
degrau 15 se fecha quando a escada muda, não quando o documento se escreve.

**No projeto-guia.** A retrospectiva da Turnera, num curso típico: seis semanas, umas quarenta horas
do aluno, vinte e oito pendências, as que mais voltas deram foram as de mensagens (fusos horários e o
provedor de WhatsApp); dois incidentes, um no degrau 8 (o estado "faltou" existia na tela e não no
servidor) e outro no 13 (uma implantação em produção com a configuração de teste, detectada pela
verificação de ponta a ponta depois da implantação). Proposta de mudança: que a rotina de implantação
do degrau 13 exija mostrar a diferença de configuração entre teste e produção antes de promover, não
só "o que muda".

---

## A lista de saída para produção

Quando as dezesseis lições estão feitas, o sistema cumpre esta lista. É a definição operacional de
"production grade" no Urazuke, e pode ser usada como lista de verificação final, com o dono, sem
abrir o código:

1. Há uma ficha de elegibilidade com decisão, data e nome (P0).
2. Há um contrato de convivência que o agente lê a cada sessão, e provou-se que o lê (P1, P2).
3. O arquivo de projeto se lê em cinco minutos e diz o que o sistema NÃO é (P2).
4. Há um dimensionamento com dados primários com fonte, derivados com conta, e o cenário "vezes
   dez" (P3).
5. O esqueleto foi implantado vazio, e a implantação foi rodada duas vezes (P4).
6. Toda mudança tem sua pendência, e toda pendência fechada tem sua evidência (P5).
7. Toda regra de negócio tem dono, data e palavras textuais (P6).
8. Todo teste importante foi visto em vermelho antes de verde; há provas de ponta a ponta que
   verificam o backend a partir da tela (P7).
9. Toda lista tem um único dono; há um mapa produtor/consumidor; há um registro de antipadrões com
   verificação automática (P8).
10. Todo número que decidiu algo tem um medidor com teste que você pode rodar (P9).
11. Todo relatório separa verificado, acreditado e pontos cegos (P10).
12. Houve pelo menos uma auditoria por uma sessão diferente, e seus P0 são pendências (P11).
13. Toda ação com consequência tem cadeado com teste em vermelho e caminho de volta; as automações
    passaram por modo de ensaio (P12).
14. Os testes rodam uma vez por commit; a configuração está fora do repositório; o caminho de
    volta foi provado; nenhum segredo vive no repositório nem no chat sem rotação (P13).
15. Há três manuais com data e versão, e uma pessoa que não programa seguiu o de recuperação
    (P14).
16. Há uma retrospectiva com números e uma proposta de mudança à escada (P15).

Se as dezesseis dão "sim", o sistema está pronto para entrar em operação. Se alguma dá "não", você já
sabe que degrau voltar a subir.

---

## Anexo A — Como avaliar (para quem dá o curso ou se autoavalia)

Uma rubrica simples, por lição, com três níveis:

- **Não subido**: falta a entrega, ou alguma verificação de completude dá "não".
- **Subido**: a entrega existe e todas as verificações dão "sim".
- **Subido com evidência de critério**: além disso, o aluno pode contar um caso em que o agente fez
  algo errado nessa lição (supôs, inventou, relatou demais) e como o detectou. Esse é o objetivo
  real do curso: não o artefato, mas o reflexo.

O que não se avalia: a qualidade do código. Ninguém a lê. Avalia-se a qualidade da evidência.

## Anexo B — Adaptação do curso a cada ferramenta

Os prompts são os mesmos em qualquer ferramenta. O que muda é onde vão as rotinas que no curso se
adicionam a `docs/WORKING_AGREEMENT.md`:

- No **Claude Code**, as rotinas vão no `CLAUDE.md` do projeto (ou se inclui o contrato a partir
  dali), e se leem sozinhas a cada sessão.
- No **Cursor**, vão em `.cursor/rules/`, como regras sempre ativas.
- No **Codex CLI** ou **Gemini CLI**, em `AGENTS.md` ou `GEMINI.md` na raiz.
- No **Forge**, o contrato e as rotinas são doutrinas, e os prompts de degrau se injetam sozinhos ao
  cruzar cada comporta; o registro de pendências é nativo. O curso com o Forge é o mesmo curso com
  menos copiar e colar.

A prova de leitura da lição 2 vale para todas: se uma sessão nova não sabe o que o sistema NÃO faz, a
ferramenta não está carregando o arquivo onde você colocou o contrato.

## Anexo C — O que este manual ainda não tem

- Uma turma que o tenha cursado. Os tempos, os erros típicos e o projeto-guia estão escritos a
  partir dos três sistemas de origem, não de alunos. A primeira turma vai corrigi-los (e isso é,
  literalmente, o degrau 15 aplicado ao curso).
- Os pesos dos critérios de elegibilidade (lição 0), que estão sendo elaborados.
