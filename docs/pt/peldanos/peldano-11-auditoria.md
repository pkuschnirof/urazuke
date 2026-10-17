# Passo 11 — A auditoria periódica como insumo do plano (contrato do degrau)

**Fase:** operação (de vez em quando: ao fechar uma etapa grande, antes de uma implantação
importante, ou a cada um ou dois meses).
**Forma:** um disparo longo, idealmente a cargo de um agente diferente do que constrói.
**Tamanho:** obrigatória antes da primeira implantação em produção, em qualquer projeto; depois,
proporcional ao ritmo de mudança (um sistema que muda toda semana se audita todo mês; um estável, a
cada seis).

## Para que serve

Para olhar o sistema inteiro com olhos frescos de vez em quando, e converter o visto em pendências.
A auditoria não é um relatório que se arquiva: é plano. Evita a senha escrita a fogo que ninguém
viu, as 264 consultas que liam tabelas inteiras, a vulnerabilidade conhecida numa dependência, o
componente de 2.679 linhas. E é a independência do controle de qualidade levada um passo mais para
dentro: quem audita não é quem construiu.

Sobre a independência: não é preciso outra empresa nem outra ferramenta. Basta **outra sessão, com
outro arquivo de instruções, que não tenha participado da construção**. O que se busca é que o
auditor não compartilhe os pressupostos do construtor. Um modelo que construiu um módulo "sabe" que
a senha hardcoded era provisória; um modelo que o vê pela primeira vez a relata como o que é.

## 1. Contexto necessário

- O repositório completo, somente leitura.
- Produção ou o ambiente de teste, somente leitura (banco de dados, logs).
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

O que estamos pedindo, cláusula por cláusula: somente leitura (o auditor não corrige; propõe); a
cláusula de completude na sua forma para auditar: **o que não pôde ser auditado se declara, não se
aprova por omissão**; todo o código e não uma amostra, porque os achados graves costumam estar onde
ninguém olha; cada achado com localização, risco, evidência e prioridade, para que seja acionável
sem reler o relatório; notas por dimensão, para comparar com a auditoria anterior; e os P0 já
convertidos em pendências propostas.

**De fechamento (ao construtor):**

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.

O que estamos pedindo: que a auditoria se converta em pendências (senão é um relatório que se
arquiva), e que o desacordo seja explícito e com evidência, não silencioso.

## 3. Resultado esperado

- `docs/AUDIT_[date].md` com: escopo, o que pôde ser auditado e o que não (e por quê), os achados
  com localização, risco, evidência e prioridade, uma nota por dimensão, e a lista de pendências
  propostas.
- Em `docs/PENDING.md`: uma pendência para cada P0 e P1, citando o achado.

## 4. Verificação de completude

- O relatório diz o que NÃO pôde auditar? Se diz que auditou tudo, desconfie.
- Escolha dois achados: têm arquivo e linha, e uma evidência que você pode reproduzir?
- Cada P0 tem sua pendência aberta antes de dar por fechada a auditoria?
- As notas por dimensão podem ser comparadas com a auditoria anterior?
- Auditou o mesmo agente que construiu? Se foi assim, peça uma segunda olhada nos P0.

## 5. Sinais de alerta

- A auditoria não encontrou nenhum P0. Num sistema com mais de três meses de vida, isso quase
  nunca é verdade; mais provável é que o escopo foi pequeno ou o auditor compartilhava
  pressupostos.
- Os achados não têm linha de arquivo. São opiniões, não achados.
- Passaram duas semanas e os P0 continuam sem pendência. A auditoria foi arquivada.
