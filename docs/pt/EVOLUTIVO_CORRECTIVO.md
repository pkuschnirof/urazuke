# Urazuke — o caminho evolutivo-corretivo: normalizar um sistema que não nasceu com o método, e depois subir a escada

Autor: Pablo Kuschniroff, assistido por Claude Code. Versão 1, 18 de outubro de 2026. Esta página
é a segunda metade do método: o [documento principal](ESCALERA_METODOLOGICA.md) descreve o caminho
de um projeto novo, e aqui descrevo o que faço quando o sistema já existe, foi outra pessoa que o
fez (ou fui eu mesmo, "vibecodando" sem evidência), e agora é preciso corrigi-lo ou fazê-lo
crescer. As palavras estranhas estão no glossário do documento principal; os casos reais, nas
[referências](REFERENCIAS.md). Repositório público:
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## Por que esta página existe

Quando escrevi a escada, escrevi-a olhando para a pasta vazia: o degrau 0 decide se o projeto é
encarado, o 4 implanta o esqueleto sem funcionalidade, e só no 5 aparece a primeira coisa que o
usuário vai ver. É o caso limpo, e é o que melhor ensina. Mas não é o caso mais frequente. Na
prática, na maioria das vezes em que alguém me chama já há um sistema rodando, com usuários que
dependem dele, feito por alguém que já não está ou por um modelo a quem ninguém pediu evidência, e
o pedido é "conserte isto" ou "acrescente aquilo". A minha própria ferramenta entrou em sistemas
alheios em modo diagnóstico muito antes de a escada estar escrita
[Ref. 11](REFERENCIAS.md#ref-11), e a primeira vez que o método se alimentou de um sistema em
produção foi olhando um que já existia [Ref. 12](REFERENCIAS.md#ref-12).

E aqui há uma armadilha que quero nomear antes de seguir: a tentação, diante de um legado, é
escolher entre dois extremos que estão os dois errados. Um é "reescrevo com o método, do zero":
soa limpo, e quase sempre termina num segundo sistema que não chega a substituir o primeiro. O
outro é "aplico o ciclo diretamente, que é para isso que estão os degraus 5 a 10": soa pragmático,
e é construir sobre areia, porque o ciclo dá por suposto que existe um contrato, um mapa, um
ambiente de teste, uma bateria que roda e uma implantação que se repete. Nada disso existe num
sistema que não nasceu com o método. Este caminho é o que vai pelo meio: **primeiro se normaliza,
sem reescrever, e depois se sobe a escada**.

## Os casos de uso do método

O método tem três casos de uso, e convém saber em qual você está antes de abrir o agente, porque
muda por onde se entra.

| Caso | Ponto de partida | Por onde se entra | Quanto dura a entrada | Onde está escrito |
|---|---|---|---|---|
| **Projeto novo** | Pasta vazia e um dono com um pedido. | Degrau 0, e daí os dezesseis em ordem. | Uma semana de arranque antes da primeira funcionalidade. | O documento principal, os dezesseis contratos e o manual do curso. |
| **Evolutivo-corretivo sobre um sistema feito com o método** | O sistema já subiu a escada: tem contrato, mapa, pendências fechadas com evidência, bateria, implantação e manuais. | Degrau 5: abre-se um bloco e segue-se o ciclo; o 11 periódico; o 15 no fechamento da etapa. | Nenhuma: é o degrau 15 voltando ao 0 para a etapa seguinte, que já está na Parte B do documento principal. | O documento principal (fase 4, operação). |
| **Evolutivo-corretivo sobre um sistema feito sem o método** | Um sistema que roda, com usuários, sem nenhum desses artefatos ou com alguns pela metade. | O trecho de normalização desta página (N0 a N7), e só depois o ciclo, em modo corretivo ou evolutivo. | De duas a três semanas para um sistema pequeno, antes de tocar a primeira linha de funcionalidade. | Esta página e o manual do curso, parte 2. |

O que fica de fora, nomeado para que não se confunda: a **migração tecnológica** (mudar de
plataforma, de linguagem, de banco de dados) não é um caso de uso do método; é outro projeto, e em
geral cai nos critérios excludentes do degrau 0 [Ref. 46](REFERENCIAS.md#ref-46). Se o sistema que
você herdou não tem repositório acessível ou se as suas telas não podem ser operadas por programa
nem podem ser tornadas operáveis, o que cabe não é normalizá-lo e sim um projeto novo que o
substitua, com o degrau 0 inteiro.

E um esclarecimento que vale para o terceiro caso: dá no mesmo se o legado é de outra equipe ou é
seu. Um sistema que você construiu com um modelo, sem evidência, há três meses, é exatamente tão
legado quanto o que um contratado fez há três anos. Muda o esforço de lê-lo, não o caminho.

## O princípio: normalizar sem reescrever, com todos os insumos

Normalizar é levar o sistema ao estado que o método dá por suposto ao abrir o ciclo. E faço isso
com três regras que não negocio.

**Primeira: não se reescreve.** A normalização não toca em funcionalidade. Coloca em volta do
sistema o que lhe falta (o contrato, o mapa, o ambiente de teste, a bateria, a implantação
repetível, os cadeados sobre o que já age sobre o mundo) e deixa o sistema fazendo o mesmo que
fazia. Um legado quebra mais vezes pelo entusiasmo de "organizar tudo" do que pelo bug que era
preciso consertar.

**Segunda: duas velocidades.** Há uma parte da dívida que se paga antes de qualquer mudança, e a
ela chamo o **cinto de segurança**: poder rodar o sistema num ambiente de teste com dados
parecidos com os reais, implantá-lo de forma repetível, ter os segredos fora do código, e ter uma
bateria de caracterização dos fluxos críticos que fica em vermelho se algo disso muda. O cinto é
uma **comporta dura**: nada se muda sem ele, com uma única exceção escrita para a urgência em
produção, que explico mais abaixo. O resto da dívida se paga **à medida que se toca**: quando um
bloco entra num módulo, as pendências de normalização desse módulo entram com ele. Nunca "uma
semana de faxina geral".

**Terceira: todos os insumos das etapas anteriores têm que existir, mesmo que seja preciso
recuperá-los por autodescobrimento.** Esta é a regra que distingue este caminho de "aplicar o
ciclo e pronto". Cada degrau do trecho de arranque produz um artefato que os degraus seguintes
leem: o levantamento inicial, a ficha de elegibilidade, o contrato de convivência, o arquivo de
projeto, a árvore semântica, o levantamento de volumetria, o dimensionamento, o levantamento de
ambientes, as comportas. No projeto novo esses insumos são escritos pelo dono com o agente a
partir da ingestão. No legado ninguém os escreveu, e o ciclo não pode arrancar sem eles. A solução
não é pulá-los: é que o agente os **recupere do próprio sistema**, lendo o código, o esquema do
banco, a configuração dos ambientes, os logs e o que houver de documentação, e que cada afirmação
desses documentos leve uma marca de onde saiu. As marcas que uso são cinco: `[código]`, `[base]`,
`[configuração]`, `[documentação]` e `[inferido]`, mais `[negócio]` para o que o dono confirmou ou
corrigiu. Um documento recuperado com marcas é um documento que se pode verificar sem ler código:
o dono olha as afirmações marcadas `[inferido]` e as confirma ou as corrige, e olha as marcadas
`[código]` para ver se o sistema faz o que ele acredita que faz. O que não coincide é uma
**discrepância**, e as discrepâncias são o ouro da normalização: são os bugs que ninguém reportou
e as regras que ninguém decidiu.

### A tabela de insumos recuperados

Para que não fique no abstrato, aqui está cada insumo do trecho de arranque, onde nasce no projeto
novo, e como se consegue no caminho evolutivo-corretivo.

| Insumo | No projeto novo é produzido por | No caminho evolutivo-corretivo | Quem confirma |
|---|---|---|---|
| `docs/INITIAL_SURVEY.md` | O dono, à mão, na ingestão (degraus 0 e 2). | O agente o redige a partir do código, do banco e da configuração, com marcas de fonte, em N2; o dono acrescenta o que só o negócio sabe. | O dono, afirmação por afirmação no que está `[inferido]`. |
| `docs/ELIGIBILITY_CRITERIA.md` e `docs/ELIGIBILITY.md` | Degrau 0. | N0, com quatro critérios a mais, próprios do legado. | O dono decide. |
| `docs/WORKING_AGREEMENT.md` | Degrau 1. | N1, com cinco regras a mais, próprias do legado. | O dono. |
| `PROJECT.md`, `docs/SEMANTIC_TREE.md`, `docs/STATUS.md` | Degrau 2, a partir do levantamento. | N2, a partir do sistema, com marcas; mais a lista de discrepâncias. | O dono percorre a árvore e decide cada discrepância. |
| `docs/AUDIT_[fecha].md` | Degrau 11, no final. | N3, no começo: é o inventário da dívida. | O dono lê e verifica dois achados. |
| `docs/ENVIRONMENTS_SURVEY.md`, o ambiente de teste, a integração contínua, a implantação repetível, `docs/GATES.md` | Degraus 4 e 13. | N4, o cinto de segurança, com a bateria de caracterização. | O dono vê a captura e a segunda rodada da implantação. |
| `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`, `docs/PRODUCER_CONSUMER_MAP.md` | Degraus 12 e 8. | N5, por inventário do código e do banco. | O dono confirma cadeado por cadeado. |
| `docs/VOLUME_SURVEY.md`, `docs/SIZING.md` | Degrau 3, com números que o negócio dá. | N6, com números medidos no banco e nos logs (degrau 9 aplicado ao dimensionamento). | O dono aporta só o que não se pode medir. |
| `docs/PENDING.md` | Degrau 5, a partir do pedido do cliente. | N7, a partir da auditoria, das discrepâncias e do pedido do cliente, com a marca "bloqueia / paga-se ao tocar / pode esperar". | O dono ordena. |
| `docs/DECISIONS.md`, `docs/GOTCHAS.md`, `docs/LOCKS.md`, `docs/DEPLOYMENT.md` | Degraus 6, 8, 12, 13. | Criam-se vazios ou se completam em N2, N4 e N5, e crescem no ciclo como no projeto novo. | O dono. |

Se ao terminar N7 faltar algum destes arquivos, o trecho não está subido. Não importa que o
sistema "funcione": o ciclo vai precisar dele na primeira sessão.

## O trecho de normalização: as oito estações

Chamo-as estações e não degraus, e as numero N0 a N7, para que não se confundam com os dezesseis
da escada. Não são degraus novos: são os degraus do arranque e três da operação (o 8, o 11 e o
12), em outra ordem e com outra entrada. No projeto novo a entrada é o levantamento; aqui a
entrada é o sistema, e a leitura é feita pelo agente.

| Estação | Degraus de origem | O que muda em relação ao projeto novo |
|---|---|---|
| N0 — Elegibilidade de um sistema existente | 0 | Quatro critérios a mais; X2 se mede tela por tela; se está em vermelho, é a primeira pendência, não uma condição. |
| N1 — O contrato de convivência para um legado | 1 | Cinco regras a mais: não refatorar o que não foi pedido, ler antes de tocar, anotar em vez de consertar de passagem, o comportamento atual é a especificação, nada entra sem a caracterização em verde. |
| N2 — A leitura do sistema | 2 | O levantamento, o arquivo de projeto e a árvore saem do código com marcas de fonte; aparece a lista de discrepâncias. |
| N3 — A auditoria como inventário | 11 | Vai primeiro, não por último, e cada achado diz se bloqueia, se se paga ao tocar, ou se pode esperar. |
| N4 — O cinto de segurança | 4, 7, 13 | Ambiente de teste com dados, implantação repetível, segredos fora, integração contínua, e a bateria de caracterização. Comporta dura. |
| N5 — Cadeados e mapa a partir do código | 12, 8 | Inventário de tudo o que age sobre o mundo e de todos os contratos entre partes, antes de mudar nada. |
| N6 — Dimensionar com números reais | 3, 9 | Os primários se medem, não se perguntam; o dono aporta só o que não está no banco. |
| N7 — O backlog de normalização | 5 | A dívida e o pedido do cliente, numa única fila, com a marca de velocidade e o emparelhamento por módulo. |

A ordem importa. N3 vai antes de N4 porque a auditoria diz o que tem que entrar no cinto (os
segredos que encontrou, as telas que não se podem operar, a implantação que não se pode repetir).
N5 vai depois do cinto porque inventariar ações com consequência exige poder rodar o sistema num
lugar onde errar não custe. N6 vai no final porque mede sobre o ambiente de teste com dados, que
só existe a partir de N4. E N7 fecha porque junta tudo o anterior numa única fila.

### Quando: o calendário da normalização

| Semana | Estações | O que mais acontece |
|---|---|---|
| 1 | N0, N1, N2, N3 | Leitura do sistema com o dono ao lado, confirmando nós e decidindo discrepâncias. Nada se muda. No fechamento da semana: o mapa recuperado e o inventário de dívida. |
| 2 | N4, N5 | O cinto: ambiente de teste com dados, implantação repetida duas vezes, segredos rotacionados, bateria de caracterização dos fluxos críticos. Cadeados confirmados sobre o que já age. No fechamento: o sistema roda em teste e a bateria está em verde. |
| 3 | N6, N7, e o primeiro bloco | Dimensionamento medido. O backlog ordenado. Abre-se o primeiro bloco com o degrau 5, corretivo ou evolutivo, com as suas pendências de normalização emparelhadas. Daqui em diante é o ciclo de sempre. |

Se o sistema é grande, o que se estica é a semana 1 (há mais para ler) e a bateria de
caracterização da semana 2 (há mais fluxos). Não se estica N7: um backlog de normalização que
demora uma semana para ser escrito é um backlog que ninguém vai manter.

---

### N0 — Elegibilidade de um sistema existente

- **Intenção**: decidir se este sistema pode ser encarado com o método, antes de tocá-lo. Os dois
  excludentes são os mesmos do degrau 0, X1 (repositório acessível e manejado de forma padrão) e
  X2 (telas operáveis por programa, com verificação do efeito no backend), mas aqui X2 se mede
  tela por tela sobre o que existe, e se está em vermelho não é uma condição para começar: é a
  primeira pendência do backlog, marcada como bloqueante.
- **Quando**: uma vez, no primeiro dia. Duas horas.
- **Entradas**: o levantamento inicial (o pedido, quem usa o sistema, o que dói), acesso de
  leitura ao repositório e, se der, ao ambiente onde ele roda.
- **Artefato**: `docs/ELIGIBILITY.md` com a decisão, e os quatro critérios que acrescento para um
  legado: se há alguém que saiba como funciona (e quanto tempo tem); se a produção pode ser
  consultada em somente leitura; se existe algum teste automático; se existe uma cópia de
  segurança e se alguma vez foi restaurada.
- **Comporta**: X1 em verde; X2 em verde ou com a sua pendência bloqueante aberta; cópia de
  segurança restaurada pelo menos uma vez antes de N4.
- **Quem decide**: o dono.

**Antes de enviar o prompt**, isto tem que existir, e quem faz é você (ou o negócio com você), não
o agente:

- `docs/INITIAL_SURVEY.md`, a versão curta que você pode escrever no primeiro dia: o que o sistema
  faz e para quem, segundo o negócio; o que dói hoje (o bug que motiva o pedido, o que falta);
  quem o fez e se está disponível; onde roda; quem tem acesso a quê; se há cópia de segurança e
  quem a faz. Meia página, incompleta de propósito: em N2 o agente vai completá-la a partir do
  sistema.
- `docs/ELIGIBILITY_CRITERIA.md`: a ficha do degrau 0 (X1, X2 e os que ponderam) mais quatro
  linhas para os critérios do legado: alguém que saiba, produção consultável, testes existentes,
  cópia de segurança restaurada. Colunas vazias para resposta, fonte e verde ou vermelho.
- Acesso de leitura ao repositório para o agente, e se possível ao ambiente de teste ou à produção
  em somente leitura, com as credenciais fora do chat.
- Estado mínimo aceitável: o agente pode clonar o repositório e você sabe quem fez o sistema e se
  está vivo (o sistema e a pessoa).

**Inicial:**

> We are going to assess whether this existing system can be taken over with the Urazuke method.
> Read the initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`, which for an existing system adds four criteria: whether anyone
> who knows how the system works is available; whether production can be queried read-only;
> whether any automated test exists; and whether a backup exists and has ever been restored. Then
> explore the repository and, if I gave you access, the environment where it runs: change nothing.
> Fill in the sheet criterion by criterion with the answer, its source (survey, code, database,
> configuration, or inferred) and, for the exclusionary criteria X1 and X2, green or red. For X2,
> list every screen and say for each whether it can be driven by a program today and whether the
> effect can be checked in the backend. If a criterion cannot be answered from what you have, ask
> me; do not assume. Do not decide: present me the completed sheet with your reading and your
> doubts, and I will decide. Reply in my language.

> [pt]
> Vamos avaliar se este sistema existente pode ser encarado com o método Urazuke. Leia o
> levantamento inicial em `docs/INITIAL_SURVEY.md` e a ficha de critérios em
> `docs/ELIGIBILITY_CRITERIA.md`, que para um sistema existente acrescenta quatro critérios: se há
> alguém disponível que saiba como o sistema funciona; se a produção pode ser consultada em
> somente leitura; se existe algum teste automático; e se existe uma cópia de segurança e se
> alguma vez foi restaurada. Depois explore o repositório e, se eu lhe dei acesso, o ambiente onde
> ele roda: não mude nada. Preencha a ficha critério por critério com a resposta, a sua fonte
> (levantamento, código, base, configuração, ou inferido) e, para os critérios excludentes X1 e
> X2, verde ou vermelho. Para X2, liste cada tela e diga para cada uma se hoje pode ser operada
> por programa e se o efeito pode ser verificado no backend. Se um critério não puder ser
> respondido com o que você tem, pergunte-me; não suponha. Não decida: apresente-me a ficha
> completa com a sua leitura e as suas dúvidas, e eu decido. Responda no meu idioma.

O que estou pedindo: o mesmo que no degrau 0, com três diferenças. Que explore o sistema sem mudar
nada, porque aqui há um sistema para explorar; que cada resposta diga de onde saiu, porque o
levantamento é curto e a maioria das respostas vai vir do código; e que X2 se meça **tela por
tela**, porque num legado a resposta nunca é "sim" ou "não" para todo o sistema, é "estas quatro
sim, estas duas não", e essas duas são a primeira pendência.

**Antes de enviar o prompt** de fechamento: a sua decisão em uma linha, tomada depois de ler a
ficha completa; as condições, verificáveis e não mais de três (a da cópia de segurança restaurada
antes de N4 é quase sempre uma); e a lista de telas em vermelho para X2, que o prompt converte na
primeira pendência.

**De fechamento:**

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, every answer with its source, and the
> conditions if any. If X2 is red for any screen, create `docs/PENDING.md` and open the first
> pending item: make every screen drivable by a program with its backend effect checkable; mark it
> as blocking. Include the questions you asked and my answers.

> [pt]
> Decisão: [vai / não vai / vai com estas condições: …]. Escreva a ficha final em
> `docs/ELIGIBILITY.md` com a data, quem decidiu, cada resposta com a sua fonte, e as condições,
> se houver. Se X2 está em vermelho para alguma tela, crie `docs/PENDING.md` e abra a primeira
> pendência: fazer com que toda tela possa ser operada por programa com o seu efeito no backend
> verificável; marque-a como bloqueante. Inclua as perguntas que você fez e as minhas respostas.

Verificação de completude: X2 tem uma resposta por tela, e não uma para todo o sistema? Os quatro
critérios do legado têm resposta com fonte? Se a cópia de segurança nunca foi restaurada, isso
ficou como condição antes de N4? Sinal de alerta: o agente respondeu X2 em verde para tudo porque
"é uma aplicação web". As aplicações web antigas são as que menos podem ser operadas por programa.

---

### N1 — O contrato de convivência para um legado

- **Intenção**: fixar as regras antes de tocar em nada, com cinco regras a mais do que o degrau 1,
  que são as de que um sistema herdado precisa para que o agente não o "melhore" por conta
  própria.
- **Quando**: no primeiro dia, depois de N0. Meia hora.
- **Entradas**: as suas preferências de trabalho, como no degrau 1.
- **Artefato**: `docs/WORKING_AGREEMENT.md` com as seis regras do método e as cinco do legado.
- **Comporta**: o contrato tem data e versão, e o arquivo de projeto (quando existir, em N2) manda
  lê-lo.
- **Quem decide**: o dono.

**Antes de enviar o prompt**, você tem que ter isto à mão:

- As suas preferências de trabalho, numa lista curta, como no degrau 1: idioma, quanto você quer
  que ele pergunte, que autonomia você lhe dá, o que você não tolera.
- Uma decisão sua sobre o nível de risco que você aceita enquanto se normaliza: se o agente pode
  ou não implantar no ambiente de teste por conta própria (em produção, nunca, até N4 fechado e o
  degrau 13 subido).
- `docs/ELIGIBILITY.md` (N0), fechado.
- Estado mínimo aceitável: você sabe responder às perguntas do degrau 1 e à do risco.

**Inicial:**

> Before we touch anything, we are going to set the working agreement between you and me for a
> system that already exists and has users. Write `docs/WORKING_AGREEMENT.md` with the six rules
> of the method (my time is sacred; zero technical debt; exact scope; documentation in the same
> commit; never report as done what you have not verified; speak my language), each with one line
> explaining what it prevents, and these five rules for an inherited system: (7) Nothing is
> refactored that was not asked for, and no module is rewritten. (8) Code you do not understand
> is read before it is touched, and what you learn goes into the system map. (9) Anything strange
> you find (a secret in the code, a dead path, a duplicated rule, a query without an index) is
> logged as a pending item with its evidence, never fixed in passing. (10) Current behaviour is
> the specification until the owner says otherwise: a difference between what the code does and
> what the business says is a discrepancy for me to decide, not a bug for you to fix silently.
> (11) No change reaches the test environment without the characterization suite green. Add any
> rules you think this system needs, marked as proposals. If you need to know something about how
> I work in order to write this, ask me.

> [pt]
> Antes de tocar em nada, vamos fixar o contrato de convivência entre você e eu para um sistema
> que já existe e tem usuários. Escreva `docs/WORKING_AGREEMENT.md` com as seis regras do método
> (o meu tempo é sagrado; zero dívida técnica; escopo exato; documentação no mesmo commit; nunca
> relatar como feito o que você não verificou; fale o meu idioma), cada uma com uma linha que
> explique o que ela evita, e estas cinco regras para um sistema herdado: (7) Não se refatora nada
> que não tenha sido pedido, e não se reescreve nenhum módulo. (8) O código que você não entende é
> lido antes de ser tocado, e o que você aprende vai para o mapa do sistema. (9) Qualquer coisa
> estranha que você encontre (um segredo no código, um caminho morto, uma regra duplicada, uma
> consulta sem índice) é registrada como pendência com a sua evidência, nunca consertada de
> passagem. (10) O comportamento atual é a especificação até que o dono diga outra coisa: uma
> diferença entre o que o código faz e o que o negócio diz é uma discrepância que eu decido, não
> um bug que você conserta em silêncio. (11) Nenhuma mudança chega ao ambiente de teste sem a
> bateria de caracterização em verde. Acrescente as regras que você achar que este sistema
> precisa, marcadas como propostas. Se você precisa saber algo sobre como eu trabalho para
> escrever isto, pergunte-me.

O que estou pedindo: as seis regras de sempre, e cinco que existem porque um modelo diante de um
código alheio faz três coisas por reflexo: reordena-o, "conserta-o" onde lhe parece errado, e
supõe que o que o código faz é um erro quando difere do que ele esperaria. As regras 7, 9 e 10
bloqueiam exatamente esses três reflexos. A regra 8 converte a leitura em mapa, para que o que o
agente aprende de um módulo não se perca ao fechar a sessão. A 11 é o cinto de segurança escrito
como regra, para que exista antes de existir a bateria.

**De fechamento:** o prompt de fechamento do degrau 1, sem mudanças: você aceita e rejeita as
propostas com razão, e o contrato fica com data e versão.

Sinal de alerta: o agente propõe como regra "modernizar o código à medida que se toca". Essa regra
é a reescrita disfarçada; rejeite-a com razão escrita.

---

### N2 — A leitura do sistema: o mapa recuperado e as discrepâncias

- **Intenção**: que exista o mapa que o degrau 2 produz num projeto novo, mas tirado do próprio
  sistema, com marcas de fonte, e com a lista de tudo o que não coincide entre o código, o banco,
  a documentação e o que o negócio acredita. É o degrau 2 feito por engenharia reversa, e é o
  passo que mais valor dá por hora de todo o caminho.
- **Quando**: na primeira semana, depois de N1. Dois ou três dias, com o dono disponível para
  confirmar.
- **Entradas**: o repositório completo, o esquema do banco em somente leitura, a configuração de
  cada ambiente, os logs se houver, a documentação que existir, e o levantamento curto de N0.
- **Artefato**: `docs/INITIAL_SURVEY.md` completado com marcas; `PROJECT.md`;
  `docs/SEMANTIC_TREE.md` com cada nó marcado; `docs/STATUS.md`; e a lista de discrepâncias, cada
  uma decidida pelo dono e escrita em `docs/DECISIONS.md`.
- **Comporta**: nenhum nó `[inferido]` sem veredito do dono; nenhuma discrepância sem decisão ou
  sem pendência; a prova de leitura do degrau 2 passada.
- **Quem decide**: o dono, discrepância por discrepância.

**Antes de enviar o prompt**, isto tem que existir, e quem faz é você (ou o negócio com você), não
o agente:

- Acesso de leitura para o agente a tudo o que se possa ler: o repositório inteiro (todos os
  ramos, não só o principal), o esquema do banco de dados (uma credencial de somente leitura, fora
  do chat), a configuração de cada ambiente (os arquivos de ambiente com os valores dos segredos
  tapados, ou a lista de variáveis sem os seus valores), os logs recentes se existirem, e qualquer
  documentação, mesmo que seja um e-mail velho ou um manual desatualizado.
- `docs/INITIAL_SURVEY.md` de N0, com uma seção nova, escrita por você com o dono: **o que o
  negócio acredita que o sistema faz**, nas palavras dele, caso de uso por caso de uso, e as
  regras de negócio de que ele se lembra ("uma consulta não pode ser cancelada com menos de duas
  horas"). Não a verifique contra o sistema: justamente essa comparação é que vai ser feita pelo
  agente, e as diferenças são as discrepâncias.
- `docs/WORKING_AGREEMENT.md` (N1), fechado.
- Uma lista escrita por você do que vive fora do repositório e toca o sistema: um robô, uma
  planilha que lê o banco, um processo agendado no servidor, outro sistema que consome uma tabela.
  O agente não vai ver isso a partir do código.
- Estado mínimo aceitável: o agente pode ler o código e o esquema do banco, e o levantamento tem
  pelo menos três casos de uso e três regras em palavras do negócio.

**Inicial:**

> We are going to recover the map of this system from what exists. Read the whole repository
> (every branch), the database schema (read-only), the configuration of each environment, the
> recent logs and whatever documentation there is; if some part cannot be read from where you are,
> tell me and mark it as a gap; do not fill it by guessing. Then write three things. First,
> complete `docs/INITIAL_SURVEY.md` in the form the method expects (what the system does and for
> whom; what it does NOT do; who uses it; the technology; the environments; what an error costs),
> with every statement tagged by its source: [code], [database], [configuration], [documentation],
> [business] for what the survey already says, or [inferred]. Second, `PROJECT.md`, three hundred
> lines at most, and `docs/SEMANTIC_TREE.md`: the domains and, under each one, the actors, the
> processes (each with trigger, steps, outcome and exceptions as the code actually implements
> them), the entities with the attributes, states and transitions the database and the code
> enforce, the screens, the external integrations and the scheduled jobs; every node tagged the
> same way. Third, `docs/DISCREPANCIES.md`: everything where the code, the database, the
> documentation and what the business says in the survey do not agree, with the evidence on each
> side. Do not resolve any discrepancy and do not fix anything: list them. Create `docs/STATUS.md`
> for the living state. Reply in my language.

> [pt]
> Vamos recuperar o mapa deste sistema a partir do que existe. Leia o repositório inteiro (todos
> os ramos), o esquema do banco de dados (somente leitura), a configuração de cada ambiente, os
> logs recentes e a documentação que houver; se alguma parte não puder ser lida de onde você está,
> diga-me e marque-a como lacuna; não a preencha adivinhando. Depois escreva três coisas.
> Primeiro, complete `docs/INITIAL_SURVEY.md` na forma que o método espera (o que o sistema faz e
> para quem; o que NÃO faz; quem o usa; a tecnologia; os ambientes; quanto custa um erro), com
> cada afirmação marcada pela sua fonte: [código], [base], [configuração], [documentação],
> [negócio] para o que o levantamento já diz, ou [inferido]. Segundo, `PROJECT.md`, de trezentas
> linhas no máximo, e `docs/SEMANTIC_TREE.md`: os domínios e, sob cada um, os atores, os processos
> (cada um com gatilho, passos, resultado e exceções tal como o código de fato os implementa), as
> entidades com os atributos, estados e transições que o banco e o código impõem, as telas, as
> integrações externas e os processos agendados; cada nó marcado da mesma forma. Terceiro,
> `docs/DISCREPANCIES.md`: tudo aquilo em que o código, o banco, a documentação e o que o negócio
> diz no levantamento não coincidem, com a evidência de cada lado. Não resolva nenhuma
> discrepância e não conserte nada: liste-as. Crie `docs/STATUS.md` para o estado vivo. Responda
> no meu idioma.

O que estou pedindo: que leia tudo e declare o que não pôde ler (a cláusula de completude na sua
forma de legado: a lacuna se marca, não se preenche); que o levantamento e a árvore saiam com
**marcas de fonte** em cada afirmação, porque essa marca é o que lhe permite verificar sem ler
código; que os processos e os estados sejam **os que o código implementa**, não os que deveriam
ser, porque o comportamento atual é a especificação (regra 10 do contrato); que inclua os
processos agendados, que são os de que ninguém se lembra e os que mais estrago fazem; e que as
discrepâncias fiquem listadas com a evidência de cada lado e **sem resolver**, porque resolvê-las
é decidir, e decidir é seu.

**Antes de enviar o prompt** de fechamento: a árvore percorrida com o dono nó por nó, com a lista
de nós confirmados e a de corrigidos; e a lista de discrepâncias, cada uma com a decisão do dono
em uma linha e a data (o sistema está certo e o negócio tinha esquecido; o sistema está errado e
se muda; ou fica aberta com data, e não demasiadas).

**De fechamento:**

> I confirm these nodes: [list]. Correct these: [list]. The discrepancies are decided as follows:
> [one line each: discrepancy, my decision, today's date]. Finalize `docs/INITIAL_SURVEY.md`,
> `PROJECT.md` and `docs/SEMANTIC_TREE.md` with today's date, keeping the source tags. Write each
> discrepancy decision in `docs/DECISIONS.md` with my exact words, and open a pending item in
> `docs/PENDING.md` for every discrepancy where I decided the system must change; for the ones
> where I decided the current behaviour stays, write it next to the node as a confirmed rule. Add
> to `PROJECT.md` the instruction to read this file, the tree and the working agreement at the
> start of every session.

> [pt]
> Confirmo estes nós: [lista]. Corrija estes: [lista]. As discrepâncias se decidem assim: [uma
> linha cada uma: discrepância, a minha decisão, a data de hoje]. Feche `docs/INITIAL_SURVEY.md`,
> `PROJECT.md` e `docs/SEMANTIC_TREE.md` com a data de hoje, conservando as marcas de fonte.
> Escreva cada decisão sobre uma discrepância em `docs/DECISIONS.md` com as minhas palavras
> exatas, e abra uma pendência em `docs/PENDING.md` para cada discrepância em que eu decidi que o
> sistema tem que mudar; nas que eu decidi que o comportamento atual fica, escreva-o junto ao nó
> como regra confirmada. Acrescente a `PROJECT.md` a instrução de ler este arquivo, a árvore e o
> contrato de convivência ao começar cada sessão.

O que estou pedindo: que a decisão sobre cada discrepância fique nos três lugares de sempre (o
registro de decisões, a pendência se for preciso mudar, a árvore se for confirmada), e que as
marcas de fonte **não se apaguem** no fechamento: uma árvore que perdeu as marcas é uma árvore que
já não se pode verificar.

Verificação de completude: percorra a árvore como o dono: há um estado de entidade que o negócio
nunca usou? Se está marcado `[código]`, o sistema o tem mesmo que ninguém o use, e é uma
discrepância. Há um processo agendado na árvore? Se não há nenhum, pergunte ao agente onde ele
procurou. Cada discrepância tem decisão com data? Passou a prova de leitura do degrau 2 (uma
sessão nova sabe o que o sistema NÃO faz)? Sinais de alerta: a árvore não tem nada marcado
`[inferido]` (o agente não está distinguindo o que leu do que supôs); a lista de discrepâncias
está vazia (nunca está vazia num legado: o agente comparou mal ou não comparou); o arquivo de
projeto passa das trezentas linhas porque "havia muito a documentar" (isso vai para a árvore, e o
que aconteceu vai para o estado vivo [Ref. 41](REFERENCIAS.md#ref-41)).

---

### N3 — A auditoria como inventário da dívida

- **Intenção**: o degrau 11, mas no começo e com uma pergunta a mais por achado: bloqueia, paga-se
  ao tocar o módulo, ou pode esperar? O relatório não é um relatório: é a matéria-prima do cinto
  (N4) e do backlog (N7). No meu primeiro projeto que arrancou com o método já escrito, a série de
  auditorias precoces se converteu diretamente em pendências [Ref. 30](REFERENCIAS.md#ref-30);
  aqui faço o mesmo sobre um sistema alheio.
- **Quando**: na primeira semana, depois de N2, numa sessão distinta da que leu o sistema, se der.
  Um dia.
- **Entradas**: o repositório em somente leitura, o ambiente onde ele roda em somente leitura, o
  mapa recuperado (N2).
- **Artefato**: `docs/AUDIT_[fecha].md` com cada achado marcado "bloqueia / paga-se ao tocar /
  pode esperar".
- **Comporta**: nenhum achado sem marca de velocidade; os que bloqueiam têm pendência aberta antes
  de começar N4.
- **Quem decide**: o dono, sobre as marcas de velocidade.

**Antes de enviar o prompt**, isto tem que existir, e quem faz é você (ou o negócio com você), não
o agente:

- Uma sessão nova do agente, se a sua ferramenta permitir, com um clone limpo e um arquivo de
  instruções que diga "você é um auditor; não leu nem vai tocar este sistema", para que não
  compartilhe os supostos da sessão de N2. Se não der, a mesma sessão, mas saiba disso.
- Acesso de somente leitura ao ambiente onde o sistema roda (banco, logs, configuração), com
  credenciais de somente leitura fora do chat.
- O mapa recuperado de N2 (`PROJECT.md`, `docs/SEMANTIC_TREE.md`) e `docs/DISCREPANCIES.md`, para
  que o auditor não volte a descobrir o que já está escrito.
- O seu critério sobre o que significa "bloqueia": em geral, um segredo exposto, uma tela que não
  pode ser operada por programa, uma implantação que não pode ser repetida, a falta de cópia de
  segurança, e qualquer coisa que possa danificar dados ou cobrar a mais. Escreva-o em duas linhas
  para dá-lo a ele.
- Estado mínimo aceitável: o auditor tem somente leitura e sabe o que você considera bloqueante.

**Inicial:**

> Audit this system for integrity, security, performance, code quality and deployability, as the
> inventory of what must be normalized before and during its evolution. Read-only: change nothing
> except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires access you
> lack (the database, the logs, the server), tell me and mark that part as not audited; do not
> pass it as fine. Go through all of the code, not a sample, and read `docs/SEMANTIC_TREE.md` and
> `docs/DISCREPANCIES.md` first so that you do not report what is already known. For every
> finding: where it is (file and line), the risk, the evidence that proves it (the command, the
> query, the number), its priority (P0 must be fixed now, P1 soon, P2 when possible), and one more
> field: whether it BLOCKS (must be fixed before any change, by my criteria: [criteria]), whether
> it is PAID WHEN TOUCHED (fixed together with the first change that enters its module), or whether
> it CAN WAIT. Grade every dimension you audited. End with every finding turned into a proposed
> pending item, blocking ones first. Reply in my language.

> [pt]
> Audite este sistema em integridade, segurança, desempenho, qualidade de código e capacidade de
> implantação, como inventário do que é preciso normalizar antes e durante a sua evolução. Somente
> leitura: não mude nada salvo escrever o seu relatório em `docs/AUDIT_[fecha].md`. Se auditar
> alguma parte exigir um acesso que você não tem (o banco, os logs, o servidor), diga-me e marque
> essa parte como não auditada; não a dê por boa. Percorra todo o código, não uma amostra, e leia
> antes `docs/SEMANTIC_TREE.md` e `docs/DISCREPANCIES.md` para não reportar o que já se sabe. Para
> cada achado: onde está (arquivo e linha), o risco, a evidência que o prova (o comando, a
> consulta, o número), a sua prioridade (P0 é preciso consertar já, P1 em breve, P2 quando der), e
> um campo a mais: se BLOQUEIA (é preciso consertar antes de qualquer mudança, segundo o meu
> critério: [critério]), se PAGA-SE AO TOCAR (conserta-se junto com a primeira mudança que entrar
> no seu módulo), ou se PODE ESPERAR. Dê uma nota a cada dimensão que você auditou. Termine com
> cada achado convertido em pendência proposta, os bloqueantes primeiro. Responda no meu idioma.

O que estou pedindo: a auditoria do degrau 11 com a dimensão "capacidade de implantação"
acrescentada (porque num legado a implantação costuma ser o primeiro problema) e com o campo de
velocidade, que é o que converte um relatório em um plano: sem esse campo, um legado auditado tem
quarenta achados e ninguém sabe por qual começar. O critério do que bloqueia sou eu que dou, não o
auditor, porque depende das consequências do negócio.

**De fechamento:** o prompt de fechamento do degrau 11, ao construtor, com um acréscimo: as
pendências que ele abrir levam a marca de velocidade do achado.

Verificação: o relatório diz o que NÃO pôde auditar? Há pelo menos um achado marcado "bloqueia"?
(Num legado, sempre há; se não há, o auditor não olhou os segredos nem a implantação.) Dois
achados ao acaso têm arquivo, linha e evidência reproduzível? Sinal de alerta: está tudo em "pode
esperar". É um auditor que não quer incomodar.

---

### N4 — O cinto de segurança

- **Intenção**: que exista, em volta do sistema e sem tocar na sua funcionalidade, o que torna
  seguro mudá-lo: um ambiente de teste com dados parecidos com os reais, uma implantação que se
  repete, os segredos fora do código, a integração contínua rodando o que houver, e a **bateria de
  caracterização** dos fluxos críticos. É o degrau 4, a primeira metade do 13 e uma forma
  invertida do 7, juntos e antes de qualquer mudança. É uma **comporta dura**: até que o cinto não
  esteja em verde, não se muda uma linha de funcionalidade.
- **Quando**: a segunda semana, inteira.
- **Entradas**: o levantamento de ambientes (recuperado em N2 e confirmado por você), o relatório
  de N3 com os seus achados bloqueantes, a árvore semântica com os processos, e acesso ao servidor
  e ao banco.
- **Artefato**: o ambiente de teste rodando com dados anonimizados; `docs/DEPLOYMENT.md` com a
  implantação em teste repetida duas vezes; os segredos na configuração do servidor e
  rotacionados; a integração contínua em verde; `docs/GATES.md`; e a bateria de caracterização em
  verde, com o vermelho demonstrado para cada fluxo.
- **Comporta**: captura do sistema rodando em teste vista por você; segunda rodada da implantação
  sem mudanças; busca de segredos no repositório vazia; bateria de caracterização em verde e cada
  teste provado em vermelho por mutação.
- **Quem decide**: o dono, sobre que fluxos são críticos e sobre a anonimização dos dados.

**Antes de enviar o prompt**, isto tem que existir, e quem faz é você (ou o negócio com você), não
o agente:

- `docs/ENVIRONMENTS_SURVEY.md`, que o agente redigiu em N2 com marcas e você completou: onde roda
  hoje, como se implanta hoje (mesmo que seja "copio os arquivos por FTP"), onde vão viver os
  segredos no servidor, quem tem acesso, e onde vai rodar o ambiente de teste (um servidor à
  parte, um contêiner, uma conta de nuvem; se você não tem nada, diga, e o agente propõe o mais
  simples). O prompt o chama de "the environments survey"; diga a ele onde está.
- Acesso do agente ao servidor de produção em somente leitura (para copiar o banco e a
  configuração) e ao lugar onde vai rodar o ambiente de teste com permissões de escrita, com as
  credenciais fora do chat.
- A sua decisão sobre a **anonimização** dos dados de teste: que campos são dados pessoais (nomes,
  telefones, e-mails, documentos) e como se substituem. Você decide porque é uma obrigação legal,
  não uma preferência técnica.
- A lista de **fluxos críticos** para a caracterização, escrita por você a partir dos processos da
  árvore semântica: os que, se mudarem sem querer, custam dinheiro ou confiança ao negócio. Entre
  quatro e oito para um sistema pequeno. Não "todos": todos é nenhum.
- `docs/AUDIT_[fecha].md` (N3), para que o agente saiba que segredos encontrou e que telas não
  podem ser operadas.
- Uma cópia de segurança de produção restaurada pelo menos uma vez, mesmo que seja na sua máquina,
  antes de o agente tocar no servidor. É a condição de N0 que vence aqui.
- Estado mínimo aceitável: você sabe onde vai rodar o ambiente de teste, tem a lista de fluxos
  críticos, decidiu a anonimização e restaurou uma cópia de segurança.

**Para o ambiente, a implantação e os segredos:**

> We are going to build the safety belt around this system before changing anything in it. Read
> the environments survey, `docs/AUDIT_[date].md` and `docs/SEMANTIC_TREE.md`. Evaluate whether you
> have what is needed (read access to the server where it runs and to its database, write access
> to where the test environment will run, the way it is deployed today); if anything is missing,
> ask me before starting. Then set up, without touching any functionality: (1) a test environment
> that runs the system exactly as production does, with a copy of the data where the personal
> fields I listed are anonymized; (2) a reproducible deployment to that environment, run twice,
> showing me that the second run changed nothing; (3) every secret found in the repository or in
> the code moved to the server configuration (environment file or vault), with the list of what
> you moved so that I rotate each one; (4) continuous integration running whatever test suite
> exists today, even if it is a single smoke test, on every push; (5) `docs/GATES.md` with the
> gates of this project, including: nothing reaches the test environment without the
> characterization suite green, and nothing reaches production without the full suite green with
> the exact version. Document all of it in `docs/DEPLOYMENT.md` so that a person can do it by hand
> without you. Take a screenshot of the system running in the test environment and show it to me.
> Reply in my language.

> [pt]
> Vamos construir o cinto de segurança em volta deste sistema antes de mudar nada nele. Leia o
> levantamento de ambientes, `docs/AUDIT_[fecha].md` e `docs/SEMANTIC_TREE.md`. Avalie se você tem
> o necessário (acesso de leitura ao servidor onde ele roda e ao seu banco, acesso de escrita a
> onde vai rodar o ambiente de teste, a forma como se implanta hoje); se faltar algo, peça-me
> antes de começar. Depois monte, sem tocar em nenhuma funcionalidade: (1) um ambiente de teste
> que rode o sistema exatamente como a produção, com uma cópia dos dados em que os campos pessoais
> que eu listei estejam anonimizados; (2) uma implantação reproduzível nesse ambiente, rodada duas
> vezes, mostrando-me que a segunda rodada não mudou nada; (3) todo segredo encontrado no
> repositório ou no código movido para a configuração do servidor (arquivo de ambiente ou cofre),
> com a lista do que você moveu para que eu rotacione cada um; (4) a integração contínua rodando a
> bateria que exista hoje, mesmo que seja um único teste de fumaça, a cada push; (5)
> `docs/GATES.md` com as comportas deste projeto, incluídas: nada chega ao ambiente de teste sem a
> bateria de caracterização em verde, e nada chega à produção sem a bateria completa em verde com
> a versão exata. Documente tudo em `docs/DEPLOYMENT.md` de modo que uma pessoa possa fazê-lo à
> mão sem você. Tire uma captura do sistema rodando no ambiente de teste e mostre-me. Responda no
> meu idioma.

O que estou pedindo: o esqueleto do degrau 4 construído em volta de algo que já existe, com a
metade do degrau 13 adiantada (segredos fora, implantação documentada) porque num legado os
segredos no código são a regra e não a exceção [Ref. 42](REFERENCIAS.md#ref-42); a anonimização
como parte do ambiente e não como um detalhe; e as comportas escritas antes de existir a bateria,
para que a bateria nasça já sendo comporta.

**Antes de enviar o prompt** da bateria: o ambiente de teste aberto por você com os dados
anonimizados; os segredos da lista rotacionados, hoje; a lista de fluxos críticos para a lacuna do
prompt; e, se N0 deixou telas em vermelho, a pendência bloqueante que as torna operáveis fechada
antes ou como parte desta bateria.

**Para a bateria de caracterização:**

> We are going to write the characterization tests of these critical flows: [list]. A
> characterization test captures what the system does today, exactly as it does it, defects
> included; it is not a test of what the system should do. For each flow: drive it from the
> screen as a user would and check the effect in the backend (the row, the state, the message
> queued). Every test must pass against the current code. Then prove that each test actually
> watches its flow: break the flow deliberately with a temporary change, show me the red output,
> revert the change, show me the green. If a flow cannot be driven from the screen, do not
> simulate it: say so and open a pending item marked as blocking. If while writing these tests you
> find behaviour that looks wrong, do not fix it: add it to `docs/DISCREPANCIES.md` with the
> evidence. Record the command to run the suite in `docs/STATUS.md`, and make the suite the gate
> for the test environment as `docs/GATES.md` says. Reply in my language.

> [pt]
> Vamos escrever os testes de caracterização destes fluxos críticos: [lista]. Um teste de
> caracterização captura o que o sistema faz hoje, exatamente como o faz, defeitos incluídos; não
> é um teste do que o sistema deveria fazer. Para cada fluxo: opere-o a partir da tela como um
> usuário faria e verifique o efeito no backend (a linha, o estado, a mensagem enfileirada). Todos
> os testes têm que passar contra o código atual. Depois demonstre que cada teste de fato vigia o
> seu fluxo: quebre o fluxo de propósito com uma mudança temporária, mostre-me a saída em
> vermelho, reverta a mudança, mostre-me o verde. Se um fluxo não puder ser operado a partir da
> tela, não o simule: diga-o e abra uma pendência marcada como bloqueante. Se, enquanto escreve
> estes testes, você encontrar um comportamento que parece incorreto, não o conserte: acrescente-o
> a `docs/DISCREPANCIES.md` com a evidência. Registre o comando para rodar a bateria em
> `docs/STATUS.md`, e faça com que a bateria seja a comporta do ambiente de teste como diz
> `docs/GATES.md`. Responda no meu idioma.

O que estou pedindo: o degrau 7 ao contrário. No projeto novo o teste nasce em vermelho e passa a
verde com a mudança; aqui o teste nasce em verde, porque captura o que há, e a prova de que serve
é que **fica em vermelho quando você quebra o fluxo de propósito**. Sem essa mutação demonstrada,
um teste de caracterização é um teste que passa porque não olha nada, que é o mesmo problema do
verde que esconde um bug [Ref. 44](REFERENCIAS.md#ref-44). E as duas cláusulas de disciplina: o
que não se pode operar se declara e bloqueia, e o que parece errado se anota como discrepância,
não se conserta, porque até que o dono não decida, o comportamento atual é a especificação.

Verificação de completude: você mesmo abriu a URL do ambiente de teste e viu o sistema com dados?
Procurou um nome real nesses dados e ele não está lá? A implantação rodou duas vezes e a segunda
não mudou nada? Você pediu a busca de segredos no repositório e ela veio vazia? Rotacionou cada
segredo da lista? Cada fluxo crítico tem o seu teste, e cada teste tem o seu vermelho por mutação
à vista? Sinais de alerta: a bateria de caracterização passou inteira "de primeira" e nunca se
mostrou um vermelho; o ambiente de teste roda "na máquina do agente" e não num lugar que você
possa abrir; os dados de teste são "uns poucos registros de exemplo" em vez de uma cópia
anonimizada (os bugs de um legado vivem nos dados reais, não nos de exemplo).

---

### N5 — Cadeados e mapa produtor-consumidor a partir do código

- **Intenção**: saber, antes de mudar nada, o que o sistema faz que age sobre o mundo (cobra,
  envia, aprova, apaga, avisa, roda sozinho de noite) e quem produz e consome cada contrato entre
  partes. No projeto novo isso se decide antes de construir (degrau 12) e se mapeia à medida que
  se constrói (degrau 8). No legado já está construído, e ninguém se lembra disso por inteiro. Uma
  mudança evolutiva pode disparar uma ação com consequência que estava adormecida, e uma mudança
  corretiva pode deixar um consumidor desatualizado.
- **Quando**: a segunda semana, depois do cinto, porque inventariar ações exige poder rodar o
  sistema onde errar não custe.
- **Entradas**: o código, o banco, os processos agendados do servidor, a árvore semântica, e a
  lista do que vive fora do repositório.
- **Artefato**: `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` com marcas de fonte,
  `docs/PRODUCER_CONSUMER_MAP.md`, e depois do fechamento `docs/LOCKS.md` com os cadeados que vão
  agora e os que vão depois.
- **Comporta**: nenhuma ação com consequência sem veredito do dono; os cadeados marcados "agora"
  implementados com o seu teste em vermelho antes do primeiro bloco.
- **Quem decide**: o dono, cadeado por cadeado.

**Antes de enviar o prompt**, isto tem que existir, e quem faz é você (ou o negócio com você), não
o agente:

- Com o dono, uma lista escrita do que o negócio **sabe** que o sistema faz para fora: o que
  cobra, o que manda, a quem avisa, o que apaga, o que roda sozinho. Vai numa seção de
  `docs/INITIAL_SURVEY.md`. O agente vai encontrar no código mais do que o negócio se lembra; a
  comparação entre as duas listas é o resultado.
- Acesso do agente aos processos agendados do servidor (a lista de tarefas agendadas ou o
  equivalente da sua plataforma), porque os envios automáticos costumam viver ali e não no código.
- A lista do que vive fora do repositório (N2), para o mapa.
- O ambiente de teste de N4 rodando, para que ele possa disparar uma ação e ver o que acontece sem
  consequências reais.
- Estado mínimo aceitável: o negócio escreveu a sua lista e o agente pode ver as tarefas
  agendadas.

**Inicial:**

> Go through the code, the database triggers and the scheduled jobs of the server looking for
> everything that charges, sends, approves, deletes, notifies outwards or runs on a schedule, and
> write `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` with every statement tagged by its source. Compare
> it with the list the business wrote in `docs/INITIAL_SURVEY.md`: whatever the code does that the
> business did not list, or the other way round, ask me about before going on. For every action:
> what triggers it, whether it can run twice, whether it is reversible, what lock exists today if
> any, and what the way back is. In the same pass, build `docs/PRODUCER_CONSUMER_MAP.md`: for every
> contract in the system (a service, a table, a file format, a list of values), who produces it
> and who consumes it, including the things outside the repository I told you about. If there are
> parts you cannot see, say so instead of leaving them out. Present me the actions table with a
> proposed lock for each (explicit confirmation, double safety, dry-run mode, daily limit, a human
> in the loop) and a proposal of which locks go NOW, before any change, and which can go when the
> module is touched. Do not implement anything yet: I confirm lock by lock. Reply in my language.

> [pt]
> Percorra o código, os gatilhos do banco e as tarefas agendadas do servidor procurando tudo o que
> cobra, envia, aprova, apaga, avisa para fora ou roda sozinho num horário, e escreva
> `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` com cada afirmação marcada pela sua fonte. Compare-o com
> a lista que o negócio escreveu em `docs/INITIAL_SURVEY.md`: o que o código faz e o negócio não
> listou, ou ao contrário, pergunte-me antes de seguir. Para cada ação: o que a dispara, se pode
> rodar duas vezes, se é reversível, que cadeado tem hoje se tem algum, e qual é o caminho de
> volta. Na mesma passada, construa `docs/PRODUCER_CONSUMER_MAP.md`: para cada contrato do sistema
> (um serviço, uma tabela, um formato de arquivo, uma lista de valores), quem o produz e quem o
> consome, incluídas as coisas fora do repositório que eu lhe contei. Se há partes que você não
> pode ver, diga-o em vez de deixá-las de fora. Apresente-me a tabela de ações com um cadeado
> proposto para cada uma (confirmação explícita, duplo seguro, modo de ensaio, limite diário, um
> humano no circuito) e uma proposta de que cadeados vão AGORA, antes de qualquer mudança, e quais
> podem ir quando se tocar o módulo. Não implemente nada ainda: eu confirmo cadeado por cadeado.
> Responda no meu idioma.

O que estou pedindo: o inventário dos degraus 12 e 8 numa passada, porque percorrem o mesmo
código; a comparação entre o que o negócio se lembra e o que o código faz, que é onde aparecem os
envios de que ninguém se lembrava; e a proposta de **agora ou ao tocar** para cada cadeado, que é
a regra das duas velocidades aplicada à proteção: um cadeado sobre uma ação que cobra vai agora;
um cadeado sobre uma exportação mensal pode esperar o bloco que tocar esse módulo.

**De fechamento:** o prompt de fechamento do degrau 12, com os cadeados marcados "agora", cada um
com o seu teste em vermelho contra a versão sem cadeado; os demais ficam no backlog com a sua
marca.

Sinal de alerta: o agente encontrou exatamente as mesmas ações que o negócio listou. Num legado
isso nunca acontece; faltou olhar as tarefas agendadas ou os gatilhos do banco.

---

### N6 — Dimensionar com números reais

- **Intenção**: o degrau 3, mas com a vantagem enorme do legado: os dados primários não é preciso
  perguntar, estão no banco e nos logs. Medem-se com o degrau 9 (um medidor com teste, auditado
  nas duas direções) e o dono aporta só o que não está em lugar nenhum: quanto esperam crescer e
  se o sistema vai ser vendido a outros.
- **Quando**: a terceira semana, antes de abrir o primeiro bloco. Meio dia.
- **Entradas**: o banco de produção em somente leitura ou a cópia completa de teste, os logs, a
  árvore semântica com as entidades.
- **Artefato**: `docs/VOLUME_SURVEY.md` com cada número marcado `[base]` ou `[log]` e o seu
  comando, os medidores no repositório com o seu teste, e `docs/SIZING.md` com o "por dez" e as
  decisões assimétricas que convém tomar antes de evoluir.
- **Comporta**: nenhum número primário sem medidor; uma conta refeita por você que coincide.
- **Quem decide**: o dono, sobre o crescimento esperado e as decisões assimétricas.

**Antes de enviar o prompt**, você tem que ter isto à mão:

- Acesso de somente leitura ao banco de produção (ou a cópia completa de N4, se a anonimização não
  tocou nem as datas nem as quantidades) e aos logs de acesso ou de aplicação, com a credencial
  fora do chat.
- As duas respostas que só o negócio tem, escritas: quanto esperam crescer nos próximos dois anos,
  e se o sistema vai ser usado em mais de um lugar (o "por dez").
- Um caso conhecido para o teste de cada medidor: por exemplo, a quantidade de registros de uma
  tabela pequena que você pode contar à mão.
- Estado mínimo aceitável: o agente pode consultar o banco e você tem as duas respostas.

**Inicial:**

> Before changing anything we are going to size this system with its real numbers. With read-only
> access to the production database (or the complete test copy) and to the logs, measure instead
> of asking: rows per table and growth per month from the timestamps, events per entity, peak
> concurrency from the access logs, data size today and projected at five years, and the slowest
> queries. Write a meter for each number (a script that lives in the repository, with a test
> against a known case I will give you) and show me every number together with the command that
> produces it; audit each meter in both directions (is everything that should be counted, counted?
> does everything counted exist?). Write `docs/VOLUME_SURVEY.md` with every figure tagged
> [database] or [log], and ask me only for what cannot be measured: the growth the business
> expects and whether the system will serve more than one site. Then write `docs/SIZING.md`: what
> breaks first if everything is multiplied by ten, which of the current architecture choices hold
> and which do not, and which asymmetric decisions we take now, before evolving, because they are
> cheap today and expensive later. Do not change any code. Reply in my language.

> [pt]
> Antes de mudar nada vamos dimensionar este sistema com os seus números reais. Com acesso de
> somente leitura ao banco de dados de produção (ou à cópia completa de teste) e aos logs, meça em
> vez de perguntar: linhas por tabela e crescimento por mês a partir das datas, eventos por
> entidade, concorrência no pico a partir dos logs de acesso, tamanho dos dados hoje e projetado
> em cinco anos, e as consultas mais lentas. Escreva um medidor para cada número (um script que
> viva no repositório, com um teste contra um caso conhecido que eu vou lhe dar) e mostre-me cada
> número junto com o comando que o produz; audite cada medidor nas duas direções (está contado
> tudo o que deveria ser contado? existe tudo o que está contado?). Escreva
> `docs/VOLUME_SURVEY.md` com cada cifra marcada [base] ou [log], e peça-me só o que não se pode
> medir: o crescimento que o negócio espera e se o sistema vai servir a mais de um lugar. Depois
> escreva `docs/SIZING.md`: o que quebra primeiro se tudo se multiplicar por dez, quais das
> decisões de arquitetura atuais aguentam e quais não, e que decisões assimétricas tomamos agora,
> antes de evoluir, porque hoje são baratas e depois caras. Não mude nenhum código. Responda no
> meu idioma.

O que estou pedindo: medir em vez de perguntar, que é o que o legado permite e o projeto novo não;
o medidor com teste e a auditoria nas duas direções do degrau 9, porque os medidores mentem
[Ref. 35](REFERENCIAS.md#ref-35), [Ref. 36](REFERENCIAS.md#ref-36); e o dimensionamento como
comporta antes de evoluir [Ref. 14](REFERENCIAS.md#ref-14): se a arquitetura atual não aguenta o
"por dez" e o pedido do cliente é justamente crescer, isso se sabe agora e não no terceiro bloco.

**De fechamento:** o prompt de fechamento do degrau 3, escolhendo entre as opções que ele tiver
proposto para o que não aguenta, ou confirmando que o atual aguenta.

Sinal de alerta: um número "aproximado" sem marca de aproximado. Se está no banco, mede-se; se não
está, pede-se; não há terceira opção.

---

### N7 — O backlog de normalização, emparelhado com o pedido do cliente

- **Intenção**: uma única fila de pendências, com especificação completa, onde convivem a dívida
  (o que saiu da auditoria, as discrepâncias, as telas não operáveis, os cadeados pendentes, as
  decisões do dimensionamento) e o pedido do cliente (o que é preciso corrigir e o que é preciso
  acrescentar), cada um com a sua marca de velocidade e emparelhados por módulo. É o degrau 5 com
  duas colunas a mais.
- **Quando**: a terceira semana, no fechamento do trecho. Meio dia. Depois, o ciclo.
- **Entradas**: `docs/AUDIT_[fecha].md`, `docs/DISCREPANCIES.md` com as decisões, `docs/LOCKS.md`,
  `docs/SIZING.md`, a árvore semântica, e o pedido do cliente para esta etapa.
- **Artefato**: `docs/PENDING.md` com todas as pendências especificadas, marcadas "bloqueia /
  paga-se ao tocar / pode esperar" e "corretivo / evolutivo / normalização", e o emparelhamento
  por módulo.
- **Comporta**: não fica nenhuma pendência marcada "bloqueia" aberta antes do primeiro bloco; cada
  pendência do cliente tem listadas as de normalização que entram com ela.
- **Quem decide**: o dono, sobre a ordem.

**Antes de enviar o prompt**, isto tem que existir, e quem faz é você (ou o negócio com você), não
o agente:

- O pedido do cliente para esta etapa, em prosa e com as palavras dele, separado em duas listas: o
  que **falha hoje** (cada coisa com como se reproduz, o que acontece e o que deveria acontecer,
  segundo o negócio) e o que **falta** (o novo). Vai em `docs/blocks/STAGE_01_REQUEST.md` ou onde
  você preferir; o prompt diz "the client's request for this stage", então diga a ele onde está.
  Se o dono deu prioridades, também.
- Todos os artefatos de N2 a N6 fechados: a árvore, a auditoria, as discrepâncias decididas, os
  cadeados, o dimensionamento. Se faltar algum, não abra este prompt: o backlog vai sair
  incompleto e você não vai saber o que lhe falta.
- As pendências bloqueantes que já existem (de N0, N3 e N4) fechadas ou em curso com data.
- Estado mínimo aceitável: o pedido do cliente está em duas listas com as palavras dele, e os
  artefatos das estações anteriores existem.

**Inicial:**

> We are going to turn the normalization and the client's request for this stage into one queue
> of numbered pending items in `docs/PENDING.md`, each with its full specification as the method
> asks (number, title, node of the semantic tree, origin, description, business rules with
> decision and date or marked as missing, data in and out, screens, edge cases, acceptance
> criteria as given, when, then, how it will be verified, status). Sources for the normalization
> items: `docs/AUDIT_[date].md`, the discrepancies I decided to change, the screens that cannot be
> driven by a program, the secrets to rotate, the locks that are not implemented yet, and the
> decisions in `docs/SIZING.md`; each one keeps its speed mark: BLOCKS, PAID WHEN TOUCHED, or CAN
> WAIT. Sources for the client's items: the client's request for this stage; each one marked
> CORRECTIVE (something that fails today, with the way to reproduce it in the client's words) or
> EVOLUTIVE (something new). For every client item, list the normalization items that touch the
> same modules and should be paid together with it. If the request is ambiguous on any point such
> that you cannot write a verifiable item, ask me; do not resolve it by assuming. Order: blocking
> items first, then the client's items in the priority I gave you, each with its paired
> normalization. Reply in my language.

> [pt]
> Vamos converter a normalização e o pedido do cliente para esta etapa numa única fila de
> pendências numeradas em `docs/PENDING.md`, cada uma com a sua especificação completa como o
> método pede (número, título, nó da árvore semântica, origem, descrição, regras de negócio com
> decisão e data ou marcadas como faltantes, dados que entram e saem, telas, casos de borda,
> critérios de aceitação na forma dado, quando, então, como se verifica, estado). Fontes das
> pendências de normalização: `docs/AUDIT_[fecha].md`, as discrepâncias em que eu decidi mudar, as
> telas que não podem ser operadas por programa, os segredos a rotacionar, os cadeados que ainda
> não estão implementados, e as decisões de `docs/SIZING.md`; cada uma conserva a sua marca de
> velocidade: BLOQUEIA, PAGA-SE AO TOCAR, ou PODE ESPERAR. Fontes das pendências do cliente: o
> pedido do cliente para esta etapa; cada uma marcada CORRETIVO (algo que hoje falha, com a forma
> de reproduzi-lo em palavras do cliente) ou EVOLUTIVO (algo novo). Para cada pendência do
> cliente, liste as pendências de normalização que tocam os mesmos módulos e convém pagar junto
> com ela. Se o pedido é ambíguo em algum ponto de modo que você não possa escrever uma pendência
> verificável, pergunte-me; não o resolva supondo. Ordem: primeiro as que bloqueiam, depois as do
> cliente na prioridade que eu lhe dei, cada uma com a sua normalização emparelhada. Responda no
> meu idioma.

O que estou pedindo: o degrau 5 completo (a especificação detalhada vive em cada pendência, também
nas de normalização), com as duas marcas que fazem este caminho: a velocidade, que diz quando se
paga cada dívida, e o tipo, que diz como se fecha (um corretivo se fecha com o teste que reproduz
a falha; um evolutivo, com o do degrau 7). E o **emparelhamento por módulo**, que é a regra
"paga-se ao tocar" tornada operativa: quando abro o bloco do "sinal", as pendências de
normalização do módulo de pagamentos entram com ele, e não antes nem depois.

**De fechamento:** a rotina de cada sessão do degrau 5, sem mudanças, no contrato de convivência.

Verificação de completude: fica algum "bloqueia" aberto? Então o primeiro bloco não se abre. Cada
corretivo diz como se reproduz, com as palavras do cliente? Cada pendência do cliente tem a sua
lista de emparelhadas, mesmo que vazia? Sinal de alerta: o backlog tem mais de cinquenta
pendências de normalização em "pode esperar". Não é dívida registrada: é a reescrita disfarçada de
lista. Arquive o que não vai ser pago nunca e diga isso.

---

## O ciclo sobre um sistema herdado: modo corretivo e modo evolutivo

Terminado N7, o caminho se junta com a escada: os degraus 5 a 10 se sobem com cada pendência,
igual ao projeto novo, com os mesmos contratos e os mesmos prompts. Mas há dois detalhes que valem
um item à parte, porque são os que distinguem "tocar um legado com método" de "tocar um legado com
cuidado".

### O modo corretivo: o vermelho é natural

Uma pendência corretiva é um bug: algo que hoje falha e o cliente sabe. No degrau 7 do projeto
novo, o vermelho se fabrica (escreve-se o teste, roda-se contra o código antigo, vê-se falhar). No
corretivo o vermelho **é o próprio bug**: o teste que reproduz a falha, operando o fluxo a partir
da tela como o usuário que a reportou, tem que falhar contra o código atual. Se não falha, você
não reproduziu o bug que lhe reportaram; reproduziu outro. Esse vermelho é a prova de que você
está consertando o certo, e vale mais do que qualquer explicação do agente sobre "o que deve estar
acontecendo". O caso das quatro rodadas até a causa raiz [Ref. 22](REFERENCIAS.md#ref-22) é o que
me ensinou que, sem reprodução escrita, cada rodada conserta um sintoma diferente.

**Antes de enviar o prompt**, você tem que ter isto à mão:

- A pendência corretiva em `docs/PENDING.md` (N7), com a forma de reproduzi-la em palavras do
  cliente: o que ele fez, o que aconteceu, o que esperava. Se o cliente não sabe reproduzi-la,
  primeiro consiga um caso (um registro, uma data, uma captura); sem reprodução não há teste, e
  sem teste não há fechamento.
- A bateria de caracterização (N4) em verde no ambiente de teste, com o comando em
  `docs/STATUS.md`.
- As pendências de normalização emparelhadas com esta, listadas na pendência.
- A sua disposição para decidir: se a causa raiz acabar sendo uma regra de negócio que ninguém
  escreveu (acontece com frequência), o agente vai parar e perguntar, e alguém tem que responder
  nesse mesmo dia.
- Estado mínimo aceitável: você sabe reproduzir o bug à mão no ambiente de teste.

**Para fechar uma pendência corretiva:**

> This pending item is a correction: [what fails, in the client's words, and how to reproduce
> it]. Before changing anything: (1) Reproduce the failure with a test that drives the flow from
> the screen and checks the effect in the backend, and show me that it fails against the current
> code; that red is the proof that you reproduced the right defect. If you cannot reproduce it,
> tell me what you tried and what you need; do not fix what you cannot see. (2) Find the root
> cause and tell me in prose, with the evidence, before fixing. If the root cause is a business
> rule nobody wrote down, stop and ask me. (3) Fix at the root, not where it hurts, and nothing
> else: anything else you find goes to a pending item. (4) Show me the test green, the
> characterization suite still green, and the regression of the neighbouring items. (5) If the
> fix changes a current behaviour that someone may depend on, say so explicitly: that is a decision
> for me, not a side effect. Close the paired normalization items of this module in the same
> block, each with its own evidence. The commit message says "proved red against [version]" and
> the test counts. Reply in my language.

> [pt]
> Esta pendência é uma correção: [o que falha, em palavras do cliente, e como reproduzi-lo]. Antes
> de mudar nada: (1) Reproduza a falha com um teste que opere o fluxo a partir da tela e verifique
> o efeito no backend, e mostre-me que ele falha contra o código atual; esse vermelho é a prova de
> que você reproduziu o defeito correto. Se não conseguir reproduzi-lo, diga-me o que tentou e o
> que precisa; não conserte o que não pode ver. (2) Encontre a causa raiz e diga-ma em prosa, com
> a evidência, antes de consertar. Se a causa raiz é uma regra de negócio que ninguém escreveu,
> pare e pergunte-me. (3) Conserte na raiz, não onde dói, e nada mais: qualquer outra coisa que
> você encontre vai para uma pendência. (4) Mostre-me o teste em verde, a bateria de
> caracterização ainda em verde, e a regressão das pendências vizinhas. (5) Se o conserto muda um
> comportamento atual do qual alguém pode depender, diga-o explicitamente: isso é uma decisão
> minha, não um efeito colateral. Feche as pendências de normalização emparelhadas deste módulo no
> mesmo bloco, cada uma com a sua própria evidência. A mensagem do commit diz "provado em vermelho
> contra [versão]" e os números dos testes. Responda no meu idioma.

O que estou pedindo: a reprodução **antes** do diagnóstico, porque um modelo diagnostica com muita
segurança o que não reproduziu; a causa raiz em prosa antes de tocar, para que você possa frear um
conserto que aponta errado; a raiz e nada mais, porque num legado "já que estou aqui" é a forma
mais comum de quebrar o que funcionava; a caracterização em verde como regressão do sistema
inteiro; e a cláusula 5, que converte a mudança de comportamento em decisão. E o emparelhamento: a
dívida deste módulo se paga agora, com a sua evidência, não "depois".

### O modo evolutivo: a caracterização é a regressão

Uma pendência evolutiva é algo novo sobre algo que existe. Abre-se com o prompt do degrau 5,
constrói-se com o 6 e o 7 tal e qual, e a única diferença é o que significa "a regressão das
vizinhas": aqui as vizinhas são o sistema inteiro, e a bateria de caracterização é a que diz que o
que funcionava continua funcionando. Mais duas regras. Primeira: quando o bloco entra num módulo,
as pendências de normalização marcadas "paga-se ao tocar" desse módulo entram com ele, com a sua
própria evidência; é a regra das duas velocidades. Segunda: o novo nasce já com o método completo,
ou seja, com a sua especificação na pendência, o seu teste em vermelho, a sua prova de ponta a
ponta e o seu cadeado se age sobre o mundo. Não se faz ao módulo novo o que o legado fez ao
antigo.

### A exceção: a urgência em produção

O cinto é uma comporta dura, e uma comporta dura precisa da sua exceção escrita, porque, se eu não
a escrevo, a exceção se inventa no dia em que algo cai às onze da noite. A exceção é esta: se a
produção está caída ou está danificando dados e o cinto ainda não está completo, faz-se o mínimo
que detenha o dano, com o caminho de volta à mão e com o dono avisado, e **no mesmo dia** se abre
a pendência corretiva e se fecha com a rotina completa: o teste que a reproduz em vermelho, a
causa raiz, a regressão. Um conserto de urgência que não volta a entrar pelo ciclo é dívida que se
cobra com juros.

**Antes de enviar o prompt**, você tem que ter isto à mão: a confirmação de que é uma urgência de
verdade (produção caída ou danificando dados, não "o cliente está nervoso"), o dono avisado, e a
forma de voltar atrás (a cópia de segurança de N0 ou a versão anterior) à mão.

**Para uma urgência:**

> This is an urgent fix on production: [what is happening]. Do the minimum that stops the damage,
> on a branch, with the rollback ready before you deploy, and tell me exactly what you changed and
> what you did not verify. Do not touch anything else. Then, today, open the corrective pending
> item in `docs/PENDING.md` with what happened, and we close it with the full routine: the test
> that reproduces it in red, the root cause, the fix at the root, the characterization suite and
> the regression green. Reply in my language.

> [pt]
> Isto é um conserto urgente em produção: [o que está acontecendo]. Faça o mínimo que detenha o
> dano, num ramo, com o caminho de volta pronto antes de implantar, e diga-me exatamente o que
> você mudou e o que não verificou. Não toque em mais nada. Depois, hoje mesmo, abra a pendência
> corretiva em `docs/PENDING.md` com o que aconteceu, e nós a fechamos com a rotina completa: o
> teste que a reproduz em vermelho, a causa raiz, o conserto na raiz, a bateria de caracterização
> e a regressão em verde. Responda no meu idioma.

O que estou pedindo: o mínimo, com o caminho de volta antes e não depois, e com o relatório
honesto do que não foi verificado (degrau 10); e a obrigação de voltar a entrar pelo ciclo no
mesmo dia, que é o que separa uma exceção de um hábito.

## Quando o sistema está normalizado

Nunca de todo, e está bem que seja assim: a dívida marcada "paga-se ao tocar" se paga ao longo de
meses, módulo por módulo, e a marcada "pode esperar" às vezes não se paga nunca, e é preciso
dizê-lo. O que sim tem um momento preciso é o **fechamento do trecho**, que é quando se abre o
primeiro bloco. Esta é a lista:

1. Existem todos os insumos da tabela de insumos recuperados, com marcas de fonte, e o dono
   confirmou cada nó `[inferido]` da árvore (N2).
2. Cada discrepância tem decisão com data, e as que mudam o sistema têm pendência (N2).
3. A auditoria existe e cada achado tem marca de velocidade (N3).
4. O cinto está em verde: ambiente de teste com dados anonimizados que você abriu; implantação
   rodada duas vezes; busca de segredos vazia e os encontrados rotacionados; integração contínua
   em verde; bateria de caracterização em verde com o vermelho por mutação demonstrado para cada
   fluxo crítico (N4).
5. Toda ação com consequência tem veredito, e os cadeados marcados "agora" têm o seu teste em
   vermelho (N5).
6. Os números primários estão medidos com medidor e teste, e o "por dez" está escrito (N6).
7. Não fica nenhuma pendência marcada "bloqueia" aberta, e cada pendência do cliente tem as suas
   emparelhadas (N7).
8. O contrato de convivência tem as cinco regras do legado, e uma sessão nova passa a prova de
   leitura (N1, N2).

Se as oito dão "sim", o sistema está normalizado até onde este caminho exige, e o que segue é a
escada de sempre. As fases 3 e 4 do documento principal (saída para produção e operação) se
aplicam tal e qual: a auditoria periódica, os manuais (que num legado costumam não existir, e se
geram com o degrau 14 a partir do sistema como está), o agente residente, e a retrospectiva com
números, que num legado tem uma pergunta própria: quanto custou normalizar, e o que da dívida que
marcamos "pode esperar" acabou custando do mesmo jeito.

## Sinais de alerta do caminho inteiro

- O agente propõe reescrever um módulo "porque assim é mais fácil do que entendê-lo". É a regra 7
  do contrato violada; num legado, entender é o trabalho.
- Começou-se a mudar funcionalidade com o cinto pela metade ("a bateria terminamos depois").
  Depois não chega nunca, e a primeira mudança sem bateria é a que quebra o que ninguém sabia que
  existia.
- A lista de discrepâncias se resolveu "consertando o código para que faça o que o negócio diz"
  sem que o dono decidisse cada uma. Algumas dessas discrepâncias são regras que o negócio
  esqueceu e o código lembrava.
- O backlog de normalização cresce mais rápido do que se paga. Está mal marcado: há coisas em
  "paga-se ao tocar" que são "pode esperar", ou há módulos que se tocam sem pagar a sua dívida.
- Os números do dimensionamento saíram de uma estimativa "porque o banco é grande demais para
  contar". Um banco grande se conta com uma consulta; isso é um medidor.
- Um conserto de urgência não voltou a entrar pelo ciclo. Conte quantos houve no mês; se são mais
  de um, o cinto não é comporta, é decoração.

## O que falta elaborar `[hipótese]`

1. Os quatro critérios de elegibilidade próprios do legado estão escritos a partir da minha
   experiência com sistemas alheios em modo diagnóstico; não os calibrei com projetos recusados
   como fiz com X1 e X2. Um legado sem ninguém que saiba como funciona pode ser viável do mesmo
   jeito se o banco e o código forem legíveis; um legado com testes que ninguém roda há dois anos
   talvez esteja pior do que um sem testes. Falta casuística.
2. O tamanho da bateria de caracterização: entre quatro e oito fluxos é o que funcionou comigo em
   sistemas pequenos; num grande não sei se o critério é por fluxo, por módulo ou por dinheiro em
   jogo.
3. Quanto dura a normalização num sistema grande: o calendário de três semanas é para um sistema
   do tamanho do projeto-guia. Num com dezenas de módulos, suspeito que a normalização se faça por
   módulo, com um cinto por módulo, e que N2 se faça inteiro mas N4 se reparta. Não o provei.
4. O que acontece com um legado construído por um modelo com o método pela metade (contrato sim,
   testes não): se este caminho se percorre inteiro ou se há um atalho. A minha intuição é que não
   há atalho, e que o atalho é justamente o erro, mas é intuição.
