# Passo 11 — A auditoria periódica como insumo do plano (contrato do degrau)

**Fase:** operação.
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

## 1. Contexto necessário

- O repositório completo, em somente leitura.
- A produção ou o ambiente de teste, em somente leitura (banco de dados, logs).
- A auditoria anterior, se houve, para medir o que mudou.
- O escopo: integridade, segurança, desempenho, qualidade de código, ou tudo.

## 2. Prompts

**Inicial (a um agente diferente do construtor, se possível):**

> Audit this system for [scope]. Read-only: change nothing except writing your report to
> `docs/AUDIT_[date].md`. If auditing some part requires access you lack (the database, the
> log, an environment), tell me and mark that part as not audited; do not pass it as fine. Go
> through all of the code, not a sample. For every finding: where it is (file and line), what
> the risk is, what evidence proves it (the command, the query, the number), and its priority:
> P0 must be fixed now, P1 soon, P2 when possible. Give a grade to every dimension you audited.
> End with the list of P0 findings turned into proposed pending items. Reply in my language.

> [pt]
> Audite este sistema em [escopo]. Somente leitura: não mude nada salvo escrever seu relatório
> em `docs/AUDIT_[data].md`. Se auditar alguma parte exige um acesso que você não tem (o banco
> de dados, o log, um ambiente), diga-me e marque essa parte como não auditada; não a dê por
> boa. Percorra todo o código, não uma amostra. Para cada achado: onde está (arquivo e linha),
> qual é o risco, que evidência o prova (o comando, a consulta, o número), e sua prioridade: P0
> tem que ser corrigido já, P1 em breve, P2 quando der. Dê uma nota a cada dimensão que auditou.
> Termine com a lista de achados P0 convertidos em pendências propostas. Responda no meu idioma.

O que estou pedindo, cláusula por cláusula: somente leitura (o auditor não corrige; propõe); a
cláusula de completude na sua forma para auditar: **o que não se pôde verificar se declara, não
se aprova por omissão**; todo o código e não uma amostra, porque os achados graves costumam estar
onde ninguém olha; cada achado com localização, risco, evidência e prioridade, para que seja
acionável sem reler o relatório; notas por dimensão, para comparar com a auditoria anterior; e os
P0 já convertidos em pendências propostas.

**De fechamento (ao construtor):**

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.

> [pt]
> Leia `docs/AUDIT_[data].md`. Abra uma pendência para cada P0 e P1, citando o achado. Se
> discordar de algum, diga-me com a evidência contrária; não o ignore.

O que estou pedindo: que a auditoria se converta em pendências (se não, é um relatório que se
arquiva), e que a discordância seja explícita e com evidência, não silenciosa.

## 3. Resultado esperado

- `docs/AUDIT_[data].md` com: escopo, o que se pôde verificar e o que não (e por quê), os
  achados com localização, risco, evidência e prioridade, uma nota por dimensão, e a lista de
  pendências propostas.
- Em `docs/PENDING.md`: uma pendência para cada P0 e P1, citando o achado.

## 4. Verificação de completude

- O relatório diz o que NÃO pôde verificar? Se diz que verificou tudo, desconfie.
- Escolha dois achados: têm arquivo e linha, e uma evidência que você consegue reproduzir?
- Cada P0 tem sua pendência aberta antes de dar a auditoria por fechada?
- As notas por dimensão vão poder ser comparadas com a auditoria anterior?
- Auditou o mesmo agente que construiu? Se sim, peça um segundo olhar sobre os P0.

## 5. Sinais de alerta

- A auditoria não encontrou nenhum P0. Num sistema de mais de três meses, quase nunca é verdade;
  mais provável é que o escopo tenha sido pequeno ou que o auditor compartilhasse os
  pressupostos.
- Os achados não têm linha de arquivo. São opiniões, não achados.
- Passaram-se duas semanas e os P0 continuam sem pendência. A auditoria foi arquivada.
