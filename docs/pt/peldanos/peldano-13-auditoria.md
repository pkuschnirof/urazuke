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

Se puder escolher, que seja também **um modelo diferente** do que construiu, não só outra sessão
do mesmo: um estudo de 2026 mediu que uma sessão limpa com um modelo diferente encontra mais erros
que duas sessões do mesmo modelo ([arXiv 2610.01471](https://arxiv.org/abs/2610.01471)). Não é uma
comporta dura, porque às vezes o modelo do construtor é o único disponível; é uma preferência que
vale a pena exercer quando se pode, e quanto mais crítico o sistema, mais vale exercê-la.

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
> Quando você precisar de uma decisão minha, peça-a com as quatro partes da UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e nesta ordem: os dados que tornam a pergunta necessária,
> enumerados; um parágrafo de no máximo cinco linhas que os ligue e deixe ver a dúvida; a pergunta
> com as suas respostas possíveis enumeradas; e a sua recomendação. Diga-o na profundidade técnica
> que o projeto declarou em `communication_depth` —`beginner`, `decision_maker` ou `technical`—;
> se o projeto não declarou nenhuma, use `decision_maker`.

O que estou pedindo: que a auditoria se converta em pendências (se não, é um relatório que se
arquiva), e que a discordância seja explícita e com evidência, não silenciosa.

## 3. Resultado esperado

- `docs/AUDIT_[data].md` com: escopo, o que se pôde verificar e o que não (e por quê), os
  achados com localização, risco, evidência e prioridade, uma nota por dimensão, o resultado de
  reproduzir duas ou três recibos do último ciclo, e a lista de pendências propostas.
- Em `docs/PENDING.md`: uma pendência para cada P0 e P1, citando o achado.

## 4. Verificação de completude

- O relatório diz o que NÃO pôde verificar? Se diz que verificou tudo, desconfie.
- Escolha dois achados: têm arquivo e linha, e uma evidência que você consegue reproduzir?
- O relatório diz quais recibos reproduziu, com o comando e o resultado, ou só diz que os leu?
- Cada P0 tem sua pendência aberta antes de dar a auditoria por fechada?
- As notas por dimensão vão poder ser comparadas com a auditoria anterior?
- Auditou o mesmo agente que construiu? Se sim, peça um segundo olhar sobre os P0.

## 5. Sinais de alerta

- A auditoria não encontrou nenhum P0. Num sistema de mais de três meses, quase nunca é verdade;
  mais provável é que o escopo tenha sido pequeno ou que o auditor compartilhasse os
  pressupostos.
- Os achados não têm linha de arquivo. São opiniões, não achados.
- O relatório diz que os recibos "foram revisados" sem mostrar o comando que rodou nem a sua
  saída. Um recibo lido e um reproduzido não são a mesma coisa, e só o segundo fecha a objeção
  de D-033.
- Passaram-se duas semanas e os P0 continuam sem pendência. A auditoria foi arquivada.
