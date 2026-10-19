# Passo 9 — Qualidade do código verificada por máquina, com comporta (contrato do degrau)

**Fase:** ciclo.
**Quando:** monta-se uma vez, ao abrir o primeiro bloco funcional (assim que termina o arranque),
e a partir daí roda sozinho em cada commit, como comporta da integração contínua; cada pendência
se fecha com a qualidade em verde, depois do teste em vermelho (8) e antes do caso de teste
manual (10). No fechamento de cada bloco e antes de cada implantação, o relatório de qualidade se
lê com o dono. Num legado, a primeira corrida é a linha base e os achados entram na lista de
pendências com a sua marca de velocidade.
**Forma:** um único disparo para montar; depois, rotina de cada mudança e leitura por bloco.
**Tamanho:** obrigatório no seu nível mínimo em todo projeto (um linter e um limite de tamanho na
cadeia); completo em qualquer projeto com usuários.

## Para que serve

O dono não lê o código, e esse é o ponto do método. Mas o código existe, alguém vai mantê-lo (o
próximo agente, o próximo desenvolvedor), e um código que funciona hoje e é ilegível amanhã é
dívida que se cobra no mês três. Se ninguém o lê, **uma máquina tem que olhá-lo**: ferramentas
que, em cada commit, medem o que um revisor humano olharia e o convertem num número com um
limite. Eu fiz isso em todos os meus projetos, sem nomeá-lo como degrau, e uma auditoria de
qualidade me devolveu um componente de mais de duas mil linhas e um arquivo de projeto de quase
dez mil [Ref. 41](../REFERENCIAS.md#ref-41): nenhum dos dois teria passado um limite de tamanho
escrito. A catraca estática, que impede que um número de qualidade piore
[Ref. 35](../REFERENCIAS.md#ref-35), é a forma que dou a este degrau.

O que se mede por máquina, em ordem de importância: que o código respeite um estilo único (o
*linter* e o *formatador*); que nenhuma função nem nenhum arquivo passe de um tamanho; que a
*complexidade* de cada função fique abaixo de um limite; que não haja código duplicado nem código
morto; que as dependências estejam declaradas e usadas; que a *cobertura* dos testes nunca baixe
(a catraca); e, se a linguagem permitir, que os tipos fechem. Nada disto substitui o teste em
vermelho: um código impecável pode estar errado. O que evita é o código correto que ninguém pode
voltar a tocar.

**Se você está começando.** Um *linter* é um programa que lê o código e marca o que está mal
escrito ou é perigoso (uma variável que não se usa, uma comparação que sempre dá o mesmo), como o
corretor ortográfico de um processador de texto. Um *formatador* o arruma com um estilo único
(recuos, espaços) para que todo o código pareça escrito pela mesma mão. A *complexidade* de uma
função é quantos caminhos diferentes ela pode tomar (cada "se" a aumenta); uma função com
quarenta caminhos ninguém entende. *Código duplicado* é o mesmo bloco copiado em dois lugares: no
dia em que se conserta um, o outro fica errado. A *cobertura* é que porcentagem do código é
executada por algum teste. E uma *catraca* é um mecanismo que só deixa melhorar: o número de hoje
é o piso de amanhã.

## 1. Contexto necessário

O que segue é a lista genérica. Os arquivos concretos que você tem que ter prontos antes de cada
prompt, com o seu conteúdo e o seu estado mínimo, estão na seção 2, no bloco "Antes de enviar o
prompt" que precede cada um.

- A integração contínua rodando em cada push (degrau 4).
- O primeiro bloco funcional aberto, com ao menos uma pendência construída: sem código não há
  qualidade que medir.
- A sua decisão sobre os limites, ou a disposição de aceitar os que o agente propuser, com razão.
- A auditoria anterior (13, ou N3 num legado), se houve.

## 2. Prompts

**Inicial (montar a comporta):**

**Antes de enviar o prompt**, isto tem que existir, e você o faz (ou o negócio com você), não o
agente:

- A integração contínua rodando em cada push (degrau 4), e quanta cota resta a você: as
  verificações de qualidade acrescentam minutos.
- Ao menos uma pendência do primeiro bloco construída e fechada com o degrau 8, para que haja
  código real para medir e não o esqueleto vazio.
- A sua decisão sobre dois limites, escrita numa linha: o tamanho máximo de um arquivo e de uma
  função (para começar, trezentas linhas e quarenta), e se a cobertura só pode subir. O resto o
  agente propõe e você aprova.
- Num legado: `docs/AUDIT_[data].md` (N3), para que o agente não reporte o conhecido e a primeira
  corrida seja a linha base.
- Estado mínimo aceitável: a cadeia roda, há código de uma pendência fechada, e você escreveu os
  dois limites.

> We are going to make the code quality verified by machine, because nobody is going to read the
> code. Set up, in continuous integration, on every push: (1) a linter and a formatter with one
> configuration for the whole repository, failing the build on any violation; (2) limits on the
> size of every file and every function ([file lines] and [function lines]) and on the complexity
> of every function, failing the build when exceeded; (3) detection of duplicated code and of dead
> code (unused functions, variables, imports, dependencies); (4) a test coverage report with a
> ratchet: the measured coverage of today becomes the floor, and the build fails if it drops; (5)
> type checking if the language allows it. Run all of it now on the current code and write
> `docs/CODE_QUALITY.md` with: the tools, the configuration, every limit with its current measured
> value, and the list of what fails today with where it is. Do not fix anything yet: what fails
> today becomes pending items, and I decide which limits apply now and which are raised with a
> date. Make the whole set a gate in `docs/GATES.md`: nothing is merged with quality red. Reply in
> my language.

> [pt]
> Vamos fazer com que a qualidade do código seja verificada por máquina, porque ninguém vai ler o
> código. Monte, na integração contínua, em cada push: (1) um linter e um formatador com uma só
> configuração para todo o repositório, que façam a construção falhar diante de qualquer
> violação; (2) limites ao tamanho de cada arquivo e de cada função ([linhas por arquivo] e
> [linhas por função]) e à complexidade de cada função, que façam a construção falhar ao serem
> ultrapassados; (3) detecção de código duplicado e de código morto (funções, variáveis,
> importações e dependências sem uso); (4) um relatório de cobertura de testes com catraca: a
> cobertura medida hoje passa a ser o piso, e a construção falha se baixar; (5) verificação de
> tipos se a linguagem permitir. Rode tudo agora sobre o código atual e escreva
> `docs/CODE_QUALITY.md` com: as ferramentas, a configuração, cada limite com o seu valor medido
> atual, e a lista do que hoje falha com onde está. Não conserte nada ainda: o que hoje falha se
> converte em pendências, e eu decido que limites se aplicam já e quais se sobem com data. Faça do
> conjunto uma comporta em `docs/GATES.md`: nada se funde com a qualidade em vermelho. Responda no
> meu idioma.

O que estou pedindo: as cinco verificações que um revisor humano faria, feitas por máquina e com
a construção em vermelho como consequência, porque uma verificação que não bloqueia é um
conselho; os limites com o seu valor medido, para que o limite saia do número e não de uma
opinião; a catraca de cobertura, que é a peça que faz com que a qualidade não se degrade sozinha;
e **não consertar nada ainda**, porque num sistema com código já escrito a primeira corrida
sempre dá vermelho e a decisão sobre o que se conserta agora e o que se tolera com data é minha.

**Rotina (vai no contrato de convivência):**

**Antes de enviar o prompt**, você tem que ter isto à mão:

- `docs/CODE_QUALITY.md` lido por você: você entende cada limite e por que está ali?
- A sua decisão sobre a lista do que hoje falha: o que se conserta agora (uma pendência cada um) e
  o que se tolera com data, escrita no mesmo arquivo.
- `docs/WORKING_AGREEMENT.md`, onde vai a rotina.
- Estado mínimo aceitável: a comporta está em verde ou cada vermelho tem pendência ou data.

> Every pending item is closed with the quality gate green: linter, formatter, size and
> complexity limits, no new duplication, no dead code, coverage at or above the ratchet. A quality
> failure is fixed in the same commit, never silenced with an exception, and a limit is never
> raised to pass; if a limit must change, say so with the reason and I decide. At the close of
> every block, show me `docs/CODE_QUALITY.md` with the numbers of the block against the previous
> one.

> [pt]
> Toda pendência se fecha com a comporta de qualidade em verde: linter, formatador, limites de
> tamanho e complexidade, sem duplicação nova, sem código morto, cobertura igual ou maior que a
> catraca. Uma falha de qualidade se conserta no mesmo commit, nunca se silencia com uma exceção,
> e um limite nunca se sobe para passar; se um limite tiver que mudar, diga-o com a razão e eu
> decido. No fechamento de cada bloco, mostre-me `docs/CODE_QUALITY.md` com os números do bloco
> contra o anterior.

O que estou pedindo: que a qualidade seja parte do fechamento de cada pendência e não uma tarefa
à parte; a proibição de silenciar (um modelo diante de um linter em vermelho tende a acrescentar
a exceção em vez de consertar, porque é mais rápido) e de subir o limite; e a leitura por bloco,
que é o único momento em que você olha os números.

## 3. Resultado esperado

- O linter, o formatador, os limites, a detecção de duplicação e código morto, a cobertura com
  catraca e os tipos, rodando em cada push e em vermelho quando corresponde.
- `docs/CODE_QUALITY.md` com ferramentas, configuração, limites com valor medido, e a lista do
  que falha com a sua pendência ou a sua data.
- A comporta em `docs/GATES.md` e a rotina no contrato.

## 4. Verificação de completude (você a faz, sem ler código)

- Peça a ele o link da última corrida da cadeia: a qualidade está em verde?
- Peça a ele que coloque de propósito, num ramo, uma função de cem linhas e uma variável sem uso:
  a cadeia fica em vermelho pelas duas coisas?
- A cobertura de hoje é maior ou igual à do fechamento do bloco anterior? Peça os dois números.
- Há alguma exceção ao linter no código? Peça a lista; cada uma tem que ter razão escrita.
- Subiu algum limite desde a primeira corrida? Com que razão e quem o decidiu?

## 5. Sinais de alerta

- A qualidade passou em verde de primeira sobre código já escrito. Quase nunca é verdade: os
  limites estão frouxos demais.
- O agente propõe "desativar esta regra porque é muito estrita". Às vezes tem razão; sempre tem
  que passar por você com a razão escrita.
- A cobertura sobe porque se acrescentaram testes que não provam nada (o verde que esconde um
  defeito, degrau 8). A catraca mede quantidade; o vermelho demonstrado mede qualidade. Vão
  juntos.
- Um arquivo cresceu até o limite e se partiu em dois arquivos com o mesmo conteúdo. É a
  duplicação disfarçada de cumprimento.
