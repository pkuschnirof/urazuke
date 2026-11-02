# Passo 13 — A auditoria periódica como insumo do plano (contrato do degrau)

**Fase:** saída para produção.
**Quando:** obrigatória antes da primeira implantação em produção; abre a fase de saída. Depois,
em operação, a cada um ou dois meses segundo o ritmo de mudança, e no fechamento de cada etapa
grande.
**Forma:** um disparo longo, idealmente a um agente diferente do que constrói.
**Tamanho:** obrigatório antes da primeira implantação em produção, em qualquer projeto; depois,
proporcional ao ritmo de mudança (um sistema que muda todas as semanas se audita a cada mês; um
estável, a cada seis).

## Para que serve

Olhe o sistema inteiro com olhos frescos de vez em quando, e converta o que vir em pendências. A
auditoria não é um relatório que se arquiva: é plano. Evita a senha escrita no código que ninguém
tinha visto, as consultas que leem tabelas inteiras [Ref. 18](../REFERENCIAS.md#ref-18), a
vulnerabilidade conhecida numa dependência, o componente de milhares de linhas
[Ref. 41](../REFERENCIAS.md#ref-41). E é a independência do controle de qualidade levada um passo
mais para dentro: quem audita não é quem construiu.

Sobre a independência: não precisa de outra empresa nem de outra ferramenta. Basta **outra
sessão, com outro arquivo de instruções, que não tenha participado da construção**. O que você
busca é que o auditor não compartilhe os pressupostos do construtor. Um modelo que construiu um
módulo "sabe" que a senha hardcoded era provisória; um modelo que o vê pela primeira vez a relata
como o que é. Assim se detectaram duas portas de administrador que o construtor tinha deixado num
dia [Ref. 40](../REFERENCIAS.md#ref-40).

Se você pode escolher, que além disso seja **um modelo diferente** do que construiu, não apenas
outra sessão do mesmo: um estudo de 2026 mediu que uma sessão limpa com um modelo diferente
encontra mais erros que duas sessões do mesmo modelo
([arXiv 2610.01471](https://arxiv.org/abs/2610.01471)). Mas essa preferência tem um **piso de
capacidade**, e digo isso porque medi: outro modelo encontra mais **somente se esse modelo puder
fazer o trabalho**. Abaixo de certa capacidade a diversidade deixa de ser uma vantagem e vira um
custo, porque verificar um achado falso custa quase o mesmo que você mesmo o ter procurado. Então a
ordem é esta: primeiro, **outro modelo, se estiver à altura da tarefa**; se não estiver, **outra
sessão do mesmo modelo, declarando o desvio** na linha `Auditor:` do relatório; e **nunca** um
auditor escolhido por qual chave está carregada ou por qual tempo limite ele aguenta. Se um limite
da ferramenta o escolheu, o relatório diz isso com essas palavras: é o caso `tool_constraint` da
chave `auditor_choice`, e existe porque a restrição da ferramenta se disfarça de escolha técnica e
a única coisa que a desnuda é ter de nomeá-la. Que o modelo do construtor seja o único disponível
não é uma falha do método: é um desvio declarado, e um desvio declarado pode ser auditado. (Decisão
D-079, sobre o experimento de 2026-11-02: o auditor de outro modelo entregou quatro dos nove
achados que ele mesmo anunciou, e seu único P0 era falso por ler mal uma vírgula decimal; o do
mesmo modelo, afastando-se da preferência e declarando-o na sua primeira linha, entregou
dezessete, e nenhum resultou falso ao verificá-los um por um.)

E aqui vai o limite, porque dizê-lo vale mais que simulá-lo: **o degrau 13 não se pode verificar
por máquina de ponta a ponta**. O seu trabalho fá-lo um terceiro, assim que a comporta não pode
avaliar o trabalho; pode avaliar o seu **rastro**. Medi-o no 2026-11-02 e é incómodo: um relatório
que dizia de si mesmo, textual, «encontrei nove achados, escrevo quatro, o relatório está
incompleto» saía **verde**, porque «completo» não é uma propriedade do arquivo —é a relação entre o
que o relatório anuncia e o que entrega— e uma comporta que olha o arquivo não a vê. E não basta
dar-lhe mais orçamento ao auditor: nessa medição a sessão **não se cortou**, terminou sozinha, num
turno e cento e trinta mil tokens, emitindo o seu marcador de fecho por sua conta. Uma comporta não
pode distinguir um relatório cortado de um abandonado. O que pode, e é o que o método lhe exige
desde D-081, é pedir ao relatório que **declare** o que depois se pode falsificar contando: a sua
completude sob `audit_completeness`, com quantos achados anunciou e quantos escreveu; a nota de
cada dimensão sob `dimension_grades`; o veredicto de cada recibo que voltou a correr sob
`receipts_reproduced`; e o que não auditou sob `not_audited`, com a sua pendência aberta. Nenhuma
das quatro impede mentir. As quatro convertem a mentira numa afirmação concreta, escrita, com data
e com assinatura, em vez de um silêncio; e contar os achados escritos de um relatório e compará-los
com a sua própria cifra custa dois minutos e não exige ler código, que é justo a classe de
verificação que este método te pede a ti.

## 1. Contexto necessário

O que segue é a lista genérica. Os arquivos concretos que você tem que ter prontos antes de cada
prompt, com seu conteúdo e seu estado mínimo, estão na seção 2, no bloco "Antes de enviar o
prompt" que precede cada um.

- O repositório completo, em somente leitura.
- A produção ou o ambiente de teste, em somente leitura (banco de dados, logs).
- A auditoria anterior, se houve, para medir o que mudou.
- O escopo: integridade, segurança, desempenho, qualidade de código, ou tudo.
- `docs/PENDING.md` com as pendências fechadas no último ciclo e seus recibos, para que o
  auditor escolha quais reproduzir.
- O registro da evidência do último ciclo completo: os commits funcionais, as pendências fechadas
  com os seus recibos, e os recibos com mutação arquivados. Não é o mesmo que o ponto anterior: lá
  o auditor escolhe dois ou três recibos para reproduzir, e aqui tem que poder contar o registro
  inteiro.

## 2. Prompts

**Inicial (a um agente diferente do construtor, se possível):**

**Antes de enviar o prompt**, isto tem que existir, e quem faz é você (ou o negócio com você), não
o agente:

- Uma sessão nova do agente, diferente da do construtor: um clone limpo do repositório em outra
  pasta e, se a sua ferramenta permitir, um arquivo de instruções diferente que só diga "você é um
  auditor; você não construiu este sistema". Sem isto, o auditor compartilha os supostos do
  construtor e os confirma.
- Acesso de somente leitura para essa sessão ao ambiente de teste ou à produção: banco de dados,
  logs. Credenciais de somente leitura, fora do repositório, com o nome da variável dito no chat.
- O escopo, decidido por você, para o buraco [scope]: integridade, segurança, desempenho,
  qualidade de código, ou tudo.
- A auditoria anterior, se houve (`docs/AUDIT_[data]` da vez passada), para que meça o que mudou.
- Quem vai auditar e por que esse, decidido por você: outro modelo se estiver à altura da tarefa,
  outra sessão do mesmo se não estiver, e nunca o que ficou porque era a chave que estava carregada
  ou o único que aguentava o tempo limite. O prompt pede que ele declare isso no relatório, mas a
  decisão é sua: se você não a tomar, a ferramenta a toma.
- Estado mínimo aceitável: a sessão do auditor não é a do construtor, e tem somente leitura.

> Audit this system for [scope]. Read-only: change nothing except writing your report to
> `docs/AUDIT_[date].md`. If auditing some part requires access you lack (the database, the
> log, an environment), tell me and mark that part as not audited; do not pass it as fine. Go
> through all of the code, not a sample. Pick two or three pending items closed in the last cycle
> and reproduce their receipts literally: rerun the exact red-then-green commands they cite
> against the commits they name, and say for each one whether it reproduces or not. A receipt you
> only read is not a receipt you audited. For every finding: where it is (file and line), what
> the risk is, what evidence proves it (the command, the query, the number), and its priority:
> P0 must be fixed now, P1 soon, P2 when possible. Give a grade to every dimension you audited.
> End with the list of P0 findings turned into proposed pending items.
>
> This report carries declarations that a gate reads, each one under its fixed key, so write the
> key in English even when the report is in my language. `auditor_choice`: which case applies and
> who decided it -- `different_model` if you are a model other than the one that built this
> system; `same_model_declared` if you are the same model because no other one was up to the
> task; `tool_constraint` if what chose you was a key that happened to be loaded, a timeout or
> any other limit of the tool, and then say so with those words. In the `Auditor:` line, the
> model that built and the model that audits. `evidence_register_health`: the health of the
> register of the evidence, which is a dimension of this audit and is not optional -- how many
> functional commits carry no receipt of any kind; how many pending items closed as shipped lack
> their receipts, and of those how many have the reason written; and of the receipts that carry
> a mutation, how many can be applied again. Each of those figures measured by a program, with
> the command next to it, and a figure you could not measure declared as not measured and never
> as zero. If the register of the evidence is broken, every other finding in this report rests
> on data nobody can reproduce. `findings_by_destination`: every finding assigned to one
> destination -- `product` if the defect is in the audited system, `method` if it is in the
> method being followed, `tool` if it is in the tool that runs it -- with the register where its
> pending item goes. A finding whose destination nobody assigned leaves this audit open.
>
> Four more declarations, about this report and not about the system, because a gate can read the
> trace of the work and cannot read the work. `audit_completeness`: `complete` when you wrote down
> every finding you found, and next to it `findings_announced` and `findings_written` with their
> figures. Those two figures have to be the same figure: if you announce nine findings and write
> four, this report is not complete and this step does not close with it -- so do not announce a
> count you are not going to write, and do not stop halfway and emit your closing marker as if you
> had finished. `dimension_grades`: the grade of every dimension you audited, each one with the name
> of its dimension next to it. `receipts_reproduced`: for every receipt you reran, `reproduces` or
> `does_not_reproduce`, with the command and its output; at least one, and a receipt you only read
> is not one of them. `not_audited`: `none` when you audited everything in the scope, or
> `with_pending` and then, part by part, what you did not audit, why, and the pending item that is
> open for it. A part named as not audited and left without its own pending item leaves this report
> open; an audit with a smaller scope declared up front is worth more than a wide one with holes.
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
> Audite este sistema em [escopo]. Somente leitura: não mude nada salvo escrever seu relatório
> em `docs/AUDIT_[data].md`. Se auditar alguma parte exige um acesso que você não tem (o banco
> de dados, o log, um ambiente), diga-me e marque essa parte como não auditada; não a dê por
> boa. Percorra todo o código, não uma amostra. Escolha duas ou três pendências fechadas no
> último ciclo e reproduza seus recibos tal qual: rode de novo os comandos exatos de vermelho e
> depois verde que citam, contra os commits que nomeiam, e diga para cada um se reproduz ou não.
> Um recibo que você só leu não é um recibo que você auditou. Para cada achado: onde está
> (arquivo e linha), qual é o risco, que evidência o prova (o comando, a consulta, o número), e
> sua prioridade: P0 tem que ser corrigido já, P1 em breve, P2 quando der. Dê uma nota a cada
> dimensão que auditou. Termine com a lista de achados P0 convertidos em pendências propostas.
>
> Este relatório leva declarações que uma comporta lê, cada uma com a sua chave fixa, então
> escreva a chave em inglês mesmo que o relatório esteja no meu idioma. `auditor_choice`: que
> caso se aplica e quem o decidiu —`different_model` se você é um modelo diferente do que
> construiu este sistema; `same_model_declared` se você é o mesmo modelo porque nenhum outro
> estava à altura da tarefa; `tool_constraint` se o que o escolheu foi uma chave que estava
> carregada, um tempo limite ou qualquer outro limite da ferramenta, e então diga-o com essas
> palavras. Na linha `Auditor:`, o modelo que construiu e o modelo que audita.
> `evidence_register_health`: a saúde do registro da evidência, que é uma dimensão desta
> auditoria e não é opcional —quantos commits funcionais não têm nenhum recibo; quantas
> pendências fechadas como entregues não têm os seus recibos, e dessas quantas têm o motivo
> escrito; e dos recibos que levam uma mutação, quantos se aplicam de novo—. Cada uma dessas
> cifras medida por um programa, com o comando ao lado, e uma cifra que você não pôde medir
> declarada como não medida e nunca como zero. Se o registro da evidência está quebrado, todos os
> outros achados deste relatório apoiam-se em dados que ninguém pode reproduzir.
> `findings_by_destination`: cada achado atribuído a um destino —`product` se o defeito é do
> sistema auditado, `method` se é do método que se está seguindo, `tool` se é da ferramenta que o
> roda— com o registro onde vai a sua pendência. Um achado cujo destino ninguém atribuiu deixa
> esta auditoria aberta.
>
> Quatro declarações mais, sobre este relatório e não sobre o sistema, porque uma comporta pode ler o
> rastro do trabalho e não pode ler o trabalho. `audit_completeness`: `complete` quando você escreveu
> todos os achados que encontrou, e ao lado `findings_announced` e `findings_written` com as suas
> cifras. Essas duas cifras têm de ser a mesma cifra: se você anuncia nove achados e escreve quatro,
> este relatório não está completo e este degrau não fecha com ele —então não anuncie uma contagem
> que não vai escrever, e não pare no meio do caminho e emita o seu marcador de fecho como se tivesse
> terminado—. `dimension_grades`: a nota de cada dimensão que você auditou, cada uma com o nome da
> sua dimensão ao lado. `receipts_reproduced`: por cada recibo que você voltou a correr, `reproduces`
> ou `does_not_reproduce`, com o comando e a sua saída; ao menos um, e um recibo que você só leu não é
> um desses. `not_audited`: `none` quando você auditou tudo o que estava no alcance, ou
> `with_pending` e então, parte por parte, o que não auditou, por quê, e a pendência que ficou aberta
> por isso. Uma parte nomeada como não auditada e deixada sem a sua pendência deixa este relatório
> aberto; uma auditoria com um alcance menor declarado de entrada vale mais que uma ampla com
> buracos.
>
> Quando você precisar de uma decisão minha, peça-a com as quatro partes da UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e nesta ordem: os dados que tornam a pergunta necessária,
> enumerados; um parágrafo de no máximo cinco linhas que os ligue e deixe ver a dúvida; a pergunta
> com as suas respostas possíveis enumeradas; e a sua recomendação. Diga-o na profundidade técnica
> que o projeto declarou em `communication_depth` —`beginner`, `decision_maker` ou `technical`—;
> se o projeto não declarou nenhuma, use `decision_maker`.
>
> Responda no meu idioma.

O que estou pedindo, cláusula por cláusula: somente leitura (o auditor não corrige; propõe); a
cláusula de completude na sua forma para auditar: **o que não se pôde verificar se declara, não
se aprova por omissão**; todo o código e não uma amostra, porque os achados graves costumam estar
onde ninguém olha; **a reprodução literal de duas ou três recibos**, para que a auditoria verifique
evidência em vez de só a ler (esta é a cláusula que fecha o buraco de D-033: um vermelho contado
não é um vermelho auditado); cada achado com localização, risco, evidência e prioridade, para que
seja acionável sem reler o relatório; notas por dimensão, para comparar com a auditoria anterior; e
os P0 já convertidos em pendências propostas.

E o que as duas decisões de novembro acrescentam, dito à parte porque as duas mudam o trabalho do
auditor e não só a sua redação: as **três declarações com chave fixa**, porque "completo" e
"auditado" não são propriedades que se possam ler de um relatório escrito em prosa livre (D-079 e
D-080); a **saúde do registro da evidência** como dimensão obrigatória, porque é a única que audita
as demais —se o registro da evidência está quebrado, todos os outros achados do relatório
apoiam-se em dados que ninguém pode reproduzir, e então o relatório inteiro vale menos do que as
suas notas dizem—; e o **destino de cada achado**, porque um defeito do método anotado no registro
do produto é um defeito que ninguém vai corrigir nunca: o dono do produto não pode corrigir o
método, e quem podia nunca soube.

**De fechamento (ao construtor):**

**Antes de enviar o prompt**, você tem que ter isto à mão:

- `docs/AUDIT_[data].md`, lido por você, e dois achados ao acaso verificados com o auditor (peça o
  comando, a linha; ele tem que poder mostrá-los).
- A sessão do construtor aberta: este prompt vai ao construtor, não ao auditor, com a data do
  arquivo colocada no buraco.
- Estado mínimo aceitável: você leu o relatório, sabe quantos P0 e P1 há, e vai contar as
  pendências que ele abrir.

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.
>
> Open each one in the register of the destination the report assigned to it: the product
> register for `product`, and for `method` and for `tool` the register of the method or the
> register of the tool, never the product's. If a finding arrives with no destination, ask me
> for it before opening anything.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [pt]
> Leia `docs/AUDIT_[data].md`. Abra uma pendência para cada P0 e P1, citando o achado. Se
> discordar de algum, diga-me com a evidência contrária; não o ignore.
>
> Abra cada uma no registro do destino que o relatório lhe atribuiu: o registro do produto para
> `product`, e para `method` e para `tool` o registro do método ou o da ferramenta, nunca o do
> produto. Se um achado chega sem destino, peça-mo antes de abrir nada.
>
> Quando você precisar de uma decisão minha, peça-a com as quatro partes da UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e nesta ordem: os dados que tornam a pergunta necessária,
> enumerados; um parágrafo de no máximo cinco linhas que os ligue e deixe ver a dúvida; a pergunta
> com as suas respostas possíveis enumeradas; e a sua recomendação. Diga-o na profundidade técnica
> que o projeto declarou em `communication_depth` —`beginner`, `decision_maker` ou `technical`—;
> se o projeto não declarou nenhuma, use `decision_maker`.

O que estou pedindo: que a auditoria se converta em pendências (se não, é um relatório que se
arquiva), e que a discordância seja explícita e com evidência, não silenciosa.

E, desde D-080, que cada pendência se abra no registro do seu destino. O construtor é quem tem as
mãos no produto, então é quem mais facilmente manda tudo para o registro do produto; um achado que
chega sem destino pergunta-se a você antes de abrir nada.

## 3. Resultado esperado

- `docs/AUDIT_[data].md` com: escopo, o que se pôde verificar e o que não (e por quê), os
  achados com localização, risco, evidência e prioridade, uma nota por dimensão, o resultado de
  reproduzir duas ou três recibos do último ciclo, e a lista de pendências propostas.
- Em `docs/PENDING.md`: uma pendência para cada P0 e P1, citando o achado.
- Nesse mesmo relatório, as três declarações que uma comporta pode ler, com a sua chave em inglês:
  `auditor_choice` (que caso se aplica e quem o decidiu), `evidence_register_health` (as cifras do
  registro da evidência, cada uma com o comando que a mediu, e "não medida" quando não se pôde
  medir) e `findings_by_destination` (cada achado com o seu destino).
- No registro de cada destino: uma pendência para cada P0 e P1. As do produto no registro do
  produto, as do método no do método, as da ferramenta no da ferramenta.
- Nesse mesmo relatório, as quatro declarações que D-081 acrescenta às três anteriores:
  `audit_completeness` em `complete`, com `findings_announced` e `findings_written` na mesma cifra;
  `dimension_grades` com a nota de cada dimensão auditada; `receipts_reproduced` com o veredicto de
  cada recibo que se voltou a correr; e `not_audited` em `none` ou em `with_pending`, e então a
  pendência aberta de cada parte que ficou de fora.

## 4. Verificação de completude

- O relatório diz o que NÃO pôde verificar? Se diz que verificou tudo, desconfie.
- Escolha dois achados: têm arquivo e linha, e uma evidência que você consegue reproduzir?
- O relatório diz quais recibos reproduziu, com o comando e o resultado, ou só diz que os leu?
- Cada P0 tem sua pendência aberta antes de dar a auditoria por fechada?
- As notas por dimensão vão poder ser comparadas com a auditoria anterior?
- Auditou o mesmo agente que construiu? Se sim, peça um segundo olhar sobre os P0.
- O relatório diz quem auditou e por que esse? Se a razão é que era o único que havia carregado ou
  o único que aguentava o tempo limite, isso é `tool_constraint` e tem que estar escrito assim.
- Estão as cifras da saúde do registro da evidência, cada uma com o comando que a mediu? Uma cifra
  que não se pôde medir diz "não medida"; um zero que não distingue "não há nenhum" de "não pude
  olhar" não é uma cifra (CQ-19, o denominador).
- Cada achado tem destino, e a sua pendência ficou aberta no registro desse destino?
- `findings_announced` e `findings_written` dizem a mesma cifra? Conta à mão os achados escritos e
  compara-os com a cifra declarada: é a única maneira de falsificar a declaração, e é a verificação
  mais barata deste degrau.
- Cada parte que o relatório nomeia como não auditada tem a sua pendência aberta? Uma parte
  declarada e sem pendência é uma parte que ninguém vai auditar nunca.
- Há ao menos um recibo com o seu veredicto, `reproduces` ou `does_not_reproduce`, com o comando e
  a saída colados? Um recibo lido não tem veredicto.

## 5. Sinais de alerta

- A auditoria não encontrou nenhum P0. Num sistema de mais de três meses, quase nunca é verdade;
  mais provável é que o escopo tenha sido pequeno ou que o auditor compartilhasse os
  pressupostos.
- Os achados não têm linha de arquivo. São opiniões, não achados.
- O relatório diz que os recibos "foram revisados" sem mostrar o comando que rodou nem a sua
  saída. Um recibo lido e um reproduzido não são a mesma coisa, e só o segundo fecha a objeção
  de D-033.
- Passaram-se duas semanas e os P0 continuam sem pendência. A auditoria foi arquivada.
- O relatório elogia a independência do auditor e não diz que caso de `auditor_choice` se aplica.
  Quando foi a ferramenta que escolheu o auditor e não você, é justamente o caso que ninguém
  escreve por conta própria.
- A saúde do registro da evidência volta em zero e sem comando. Um zero sem o comando que o
  produziu é um "não pude olhar" disfarçado de boa notícia.
- Todos os achados saíram com destino `product`. Num controle que olha o sistema com o método e a
  ferramenta em uso, que nenhum seja do método nem da ferramenta é improvável: o mais provável é
  que ninguém se perguntou pelo destino.
- O relatório declara `audit_completeness: complete` e a conta dos achados escritos não dá. É a
  única das declarações que se pode falsificar em dois minutos, e por isso convém fazê-lo sempre.
- O relatório termina com uma frase de fecho impecável e não voltou sobre as partes que tinha
  marcado como não auditadas. Um auditor que fica sem lugar emite o seu marcador de fecho do mesmo
  jeito: o que distingue um relatório terminado de um abandonado não é o final, é `not_audited`.
