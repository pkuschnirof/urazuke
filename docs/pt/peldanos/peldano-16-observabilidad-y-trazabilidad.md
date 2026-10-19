# Passo 16 — Observabilidade e rastreabilidade totais, com nível configurável (contrato do degrau)

**Fase:** saída para produção.
**Quando:** na fase de saída para produção, depois do 15 (já há cadeia de implantação e
configuração por ambiente) e antes dos testes de desempenho (19), porque sem observabilidade os
testes de desempenho não dizem o que quebrou. Num legado, o nível mínimo (registros estruturados
com nível configurável e um identificador de correlação) entra no cinto de segurança (N4); o
nível completo, aqui. A regra de "todo módulo novo registra e propaga" vale durante toda a
operação.
**Forma:** um único disparo; o agente monta e demonstra; você lê um rastro real.
**Tamanho:** obrigatório no seu nível mínimo em todo projeto que vá ter usuários; completo em
qualquer projeto com consequências.

## Para que serve

Quando algo falhar em produção, e vai falhar, quero poder seguir uma ação desde a tela até o
banco de dados e até cada chamada externa, com um único identificador, sem abrir o código e sem
pedir ao agente que "revise". E quero poder subir o nível de detalhe dos registros em produção,
em um minuto, sem voltar a implantar, e baixá-lo depois. Isso é observabilidade: ver o que o
sistema faz. E a segunda coisa é rastreabilidade: que toda ação com consequência (cobrou, enviou,
apagou, aprovou) deixe um rastro de quem, quando, o quê, de onde e com que resultado, num
registro que a aplicação não pode editar. Sem isto, o agente residente do degrau 23 opera às
cegas, o monitoramento dos degraus 21 e 22 não tem do que se alimentar, e cada incidente se
diagnostica com hipóteses em vez de com evidência. O turno órfão que continuou vivo uma hora e
quarenta e três se encontrou pelo log, não pelo código [Ref. 16](../REFERENCIAS.md#ref-16); e o
agente residente arrancou, justamente, lendo logs [Ref. 13](../REFERENCIAS.md#ref-13).

"Nível configurável" é a cláusula que distingue isto de "pôr logs": o nível (erro, aviso,
informação, depuração, rastreamento) se muda por configuração no servidor, por ambiente, sem
tocar código nem implantar, e produção roda em informação salvo quando se está investigando
alguma coisa.

**Se você está começando.** Um *registro* (log) é uma linha que o sistema escreve cada vez que
faz alguma coisa: "10:42:13, módulo agenda, usuário recepcao1, turno 17 cancelado".
*Estruturado* quer dizer que todas as linhas têm as mesmas partes na mesma ordem, para que se
possam buscar por máquina. O *nível* é quanto detalhe se escreve: em "erro", só o que falhou; em
"rastreamento", cada passo. O *identificador de correlação* é um número único que se dá a cada
ação quando ela começa (você apertou "cancelar") e que viaja colado a tudo o que essa ação
provoca (a consulta ao banco, a mensagem ao paciente), de modo que depois se busca esse número e
aparece a história completa. E a *auditoria* é uma lista que não se pode editar das ações
importantes: quem fez o quê e quando.

## 1. Contexto necessário

O que segue é a lista genérica. Os arquivos concretos que você tem que ter prontos antes de cada
prompt, com seu conteúdo e seu estado mínimo, estão na seção 2, no bloco "Antes de enviar o
prompt" que precede cada um.

- A cadeia de implantação e a configuração por ambiente (degrau 15): o nível se configura ali.
- A tabela de cadeados (degrau 14): cada ação com consequência é uma entrada da auditoria.
- O levantamento inicial com os dados pessoais marcados: os registros não podem contê-los.
- Onde vão viver os registros e as métricas (um arquivo rotacionado, um serviço): você decide.

## 2. Prompts

**Inicial:**

**Antes de enviar o prompt**, isto tem que existir, e quem faz é você (ou o negócio com você), não
o agente:

- `docs/DEPLOYMENT.md` (degrau 15) com a forma como se lê a configuração por ambiente: o nível de
  registro vai ser mais uma variável dessa configuração.
- `docs/LOCKS.md` (degrau 14): a lista de ações com consequência é a lista do que tem que ficar
  na auditoria.
- Em `docs/INITIAL_SURVEY.md`, a lista de que dados são pessoais (nomes, telefones, e-mails,
  documentos, diagnósticos), escrita por você com o dono: é o que os registros têm que mascarar.
  É uma obrigação legal, não uma preferência.
- A sua decisão de onde vivem os registros e as métricas: um arquivo rotacionado no servidor
  basta para um projeto pequeno; um serviço de registros, para um com consequências. E quanto
  tempo se conservam.
- Estado mínimo aceitável: você sabe que dados são pessoais e onde vão viver os registros.

> We are going to make this system observable and traceable, end to end, with a level that I can
> change without redeploying. Read `PROJECT.md`, `docs/SEMANTIC_TREE.md`, `docs/DEPLOYMENT.md` and
> `docs/LOCKS.md`. Evaluate whether you have what is needed (where the logs and metrics will live,
> how configuration is read per environment, which external services are called); if anything is
> missing, ask me. Then set up: (1) structured logging, one record per event, with timestamp,
> level, module, correlation id and actor, with the level configurable per environment at runtime
> (error, warning, info, debug, trace) without a redeploy, and a default of info in production;
> (2) a correlation id created at the entry of every request, job and message, propagated through
> every call and written in every record, so that one id follows an action from the screen to the
> backend, to the database and to every external call; (3) traceability of every consequential
> action in `docs/LOCKS.md`: who, when, what, from where, with which input and which outcome, in
> an audit record the application cannot edit; (4) health and metrics endpoints or files
> (requests, latency, errors, queue sizes, resource usage) that the monitoring of steps 21 and 22
> will read; (5) masking of every personal field listed in `docs/INITIAL_SURVEY.md`, so that no
> log record contains personal data. Show me one real request followed by its id through every
> layer, and show me the level changing in the test environment without a redeploy. Document the
> levels, where to change them and where the records live in `docs/OBSERVABILITY.md`. Reply in my
> language.

> [pt]
> Vamos fazer com que este sistema seja observável e rastreável, de ponta a ponta, com um nível
> que eu possa mudar sem voltar a implantar. Leia `PROJECT.md`, `docs/SEMANTIC_TREE.md`,
> `docs/DEPLOYMENT.md` e `docs/LOCKS.md`. Avalie se tem o necessário (onde vão viver os registros
> e as métricas, como se lê a configuração por ambiente, que serviços externos são chamados); se
> faltar algo, peça-me. Depois monte: (1) registro estruturado, um registro por evento, com data
> e hora, nível, módulo, identificador de correlação e ator, com o nível configurável por
> ambiente em tempo de execução (erro, aviso, informação, depuração, rastreamento) sem voltar a
> implantar, e com informação como valor padrão em produção; (2) um identificador de correlação
> criado na entrada de cada pedido, tarefa e mensagem, propagado por cada chamada e escrito em
> cada registro, de modo que um único identificador siga uma ação desde a tela até o backend, o
> banco e cada chamada externa; (3) rastreabilidade de toda ação com consequência de
> `docs/LOCKS.md`: quem, quando, o quê, de onde, com que entrada e com que resultado, num
> registro de auditoria que a aplicação não pode editar; (4) pontos ou arquivos de saúde e
> métricas (pedidos, latência, erros, tamanho das filas, uso de recursos) que o monitoramento dos
> degraus 21 e 22 vai ler; (5) mascaramento de todo campo pessoal listado em
> `docs/INITIAL_SURVEY.md`, de modo que nenhum registro contenha dados pessoais. Mostre-me um
> pedido real seguido pelo seu identificador através de cada camada, e mostre-me o nível mudando
> no ambiente de teste sem voltar a implantar. Documente os níveis, onde se mudam e onde vivem os
> registros em `docs/OBSERVABILITY.md`. Responda no meu idioma.

O que estou pedindo: as cinco peças, e duas demonstrações que são a evidência do degrau: **um
identificador real seguido por todas as camadas** (se não consegue mostrá-lo, a propagação está
quebrada em algum lugar) e **o nível mudando sem implantar** (se é preciso implantar, não é
configurável). A auditoria de ações com consequência tem que ser imutável a partir da aplicação,
porque um rastro que a aplicação pode apagar não é um rastro. E o mascaramento de dados pessoais
vai no mesmo prompt porque os registros são o lugar onde mais dados pessoais vazam sem que
ninguém o decida.

**Rotina (vai no contrato de convivência):**

**Antes de enviar o prompt**, você tem que ter isto à mão:

- `docs/OBSERVABILITY.md` lido por você: você entende como subir o nível e onde ler um registro?
- `docs/WORKING_AGREEMENT.md`, onde vai a rotina.
- Estado mínimo aceitável: você subiu e baixou o nível, uma vez, no ambiente de teste.

> Every new module, job or integration writes structured log records with the correlation id and
> the actor at the level that corresponds, masks personal data, propagates the id to every call it
> makes, and records every consequential action in the audit trail. A pending item that adds one
> of those is not closed without showing one real id followed end to end through the new code.

> [pt]
> Todo módulo, tarefa ou integração nova escreve registros estruturados com o identificador de
> correlação e o ator no nível que corresponde, mascara os dados pessoais, propaga o
> identificador a cada chamada que faz, e registra toda ação com consequência na auditoria. Uma
> pendência que acrescenta um desses não se fecha sem mostrar um identificador real seguido de
> ponta a ponta através do código novo.

O que estou pedindo: que a observabilidade não se degrade com cada módulo novo, que é o que
acontece sempre se não for regra: o módulo do mês três não registra nada e é justamente o que
falha.

## 3. Resultado esperado

- Registros estruturados com nível configurável por ambiente, mudados sem implantar.
- Um identificador de correlação em cada registro, propagado da tela ao banco e às chamadas
  externas.
- Um registro de auditoria imutável das ações com consequência.
- Pontos ou arquivos de saúde e métricas, documentados.
- Nenhum dado pessoal nos registros.
- `docs/OBSERVABILITY.md` e a rotina no contrato.

## 4. Verificação de completude (você a faz, sem ler código)

- Peça-lhe um identificador de um pedido real e procure-o você nos registros: aparece na tela, no
  backend, no banco e na chamada externa, se houve?
- Suba o nível para depuração no ambiente de teste, faça uma ação, olhe os registros, baixe-o.
  Você teve que implantar? Então não está subido.
- Procure um nome ou um telefone de teste nos registros: não pode estar.
- Faça uma ação com consequência em teste (cancelar, enviar para a caixa falsa): ficou na
  auditoria com quem, quando, o quê e resultado?
- `docs/OBSERVABILITY.md` basta para você encontrar um registro sozinho às três da manhã?

## 5. Sinais de alerta

- O agente mostra "logs" mas cada módulo escreve num formato diferente. Não é estruturado;
  ninguém vai conseguir buscá-los.
- O identificador aparece no backend mas não nas chamadas externas ou nas tarefas programadas.
  São justamente os lugares onde os incidentes se perdem.
- O nível de produção ficou em depuração "por enquanto". Enche-se o disco e vazam dados.
- A auditoria de ações com consequência vive na mesma tabela que o resto dos dados e a aplicação
  pode apagá-la.
