# Passo 14 — Fail-closed, cadeados e zero dano silencioso (contrato do degrau)

**Fase:** saída para produção.
**Quando:** na fase de saída para produção, ANTES de construir qualquer funcionalidade que cobre,
envie, aprove ou apague; revisa-se com cada ação nova com consequências. As automações novas
começam em modo de ensaio e se habilitam depois de olhar seu registro por uns dias.
**Forma:** conversa: o agente lista as ações com consequência, você confirma quais levam cadeado
e de que tipo.
**Tamanho:** obrigatório assim que o sistema faz algo irreversível (cobrar, enviar, apagar,
aprovar). Um sistema de somente leitura pode pulá-lo; no momento em que ganha seu primeiro botão
que age sobre o mundo, este degrau passa a ser o mais importante.

## Para que serve

Faça com que o sistema, diante de uma dúvida ou de uma falha, NÃO aja, e que o diga. Soa óbvio e
é o contrário do que o software faz por padrão, que diante da dúvida segue em frente. Evita a
dupla cobrança, a aprovação automática sem passar por um humano, o `git add -A` que sobe uma
credencial, e o apagamento de dados do cliente. Os cadeados que coloquei no Plano de Saúde são o
modelo: o botão de pânico com dupla trava, o aprovador automático em modo de ensaio, o vigia com
guardas [Ref. 28](../REFERENCIAS.md#ref-28); e o reflexo de que uma falha deixe uma linha sem seu
botão em vez de quebrar a listagem inteira [Ref. 25](../REFERENCIAS.md#ref-25).

O princípio tem nome, "fail-closed", e vem da segurança física: uma porta de segurança que fica
fechada quando a luz acaba. O contrário, "fail-open", é a porta que se abre. Em software a
maioria das coisas é fail-open por padrão: se a validação falha, o código segue; se o serviço não
responde, assume-se que está tudo bem. O método inverte o padrão: **na dúvida, não**. E se aplica
tanto ao sistema quanto ao agente que o opera.

## 1. Contexto necessário

O que segue é a lista genérica. Os arquivos concretos que você tem que ter prontos antes de cada
prompt, com seu conteúdo e seu estado mínimo, estão na seção 2, no bloco "Antes de enviar o
prompt" que precede cada um.

- **Levantamento de ações com consequência**, nomeado assim de forma genérica: o que o sistema
  faz que cobra, envia, aprova, apaga, ou avisa alguém de fora; o que acontece se for feito duas
  vezes; o que acontece se for feito errado; como se desfaz. O negócio sabe; o agente avalia se a
  lista está completa e pergunta. A árvore semântica ajuda: cada processo com consequência está
  ali.
- Que ações o próprio agente pode fazer sobre o sistema (se está embarcado).

## 2. Prompts

**Inicial:**

**Antes de enviar o prompt**, isto tem que existir, e quem faz é você (ou o negócio com você), não
o agente:

- `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`: o levantamento de ações com consequência, escrito com o
  dono do domínio. O que o sistema faz ou vai fazer que cobra, envia, aprova, apaga, ou avisa
  alguém de fora; e para cada ação: o que acontece se for feita duas vezes, o que acontece se for
  feita mal, como se desfaz, e quem deveria poder fazê-la. Os processos da árvore semântica lhe
  dão a lista de partida: percorra-os um por um. O prompt o nomeia "the survey of consequential
  actions", sem caminho: guarde-o com este nome ou diga no chat onde está.
- Se o agente vai estar embutido ou residente: que ações ele mesmo pode fazer sobre o sistema,
  numa seção à parte do mesmo levantamento.
- `docs/SEMANTIC_TREE.md`, em dia.
- Estado mínimo aceitável: cada processo da árvore que atua sobre o mundo está na lista com o seu
  "o que acontece se for feito duas vezes".

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock.
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
> Vamos decidir que ações do sistema precisam de cadeado. Leia o levantamento de ações com
> consequência, e percorra o código procurando tudo o que cobra, envia, aprova, apaga ou avisa
> para fora. Compare as duas listas: se o código tem ações que o levantamento não menciona, ou
> ao contrário, pergunte-me antes de seguir. Para cada ação proponha: se é reversível, que
> cadeado leva (confirmação explícita, dupla trava, modo de ensaio, limite diário, um humano no
> circuito), e qual é o caminho de volta se der errado. Regra geral: diante de qualquer dúvida ou
> falha no caminho, a ação NÃO se executa e o motivo se registra. Apresente-me a tabela; eu
> confirmo cadeado por cadeado.
>
> Quando você precisar de uma decisão minha, peça-a com as quatro partes da UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e nesta ordem: os dados que tornam a pergunta necessária,
> enumerados; um parágrafo de no máximo cinco linhas que os ligue e deixe ver a dúvida; a pergunta
> com as suas respostas possíveis enumeradas; e a sua recomendação. Diga-o na profundidade técnica
> que o projeto declarou em `communication_depth` —`beginner`, `decision_maker` ou `technical`—;
> se o projeto não declarou nenhuma, use `decision_maker`.
>
> Responda no meu idioma.

O que estou pedindo: o cruzamento entre o que o negócio disse e o que o código faz (aí aparecem
as ações de que ninguém se lembrava); a cláusula de completude na sua forma para este degrau: as
diferenças entre as duas listas se perguntam, não se resolvem; para cada ação, reversibilidade,
cadeado e caminho de volta; e a regra geral do fail-closed escrita no prompt, para que fique na
tabela e no código.

**De fechamento:**

**Antes de enviar o prompt**, você tem que ter isto à mão:

- A tabela que o agente apresentou, lida cadeado por cadeado com o dono; para cada linha, a sua
  confirmação ou a sua mudança, escritas para os buracos [list], [X] e [Y] do prompt.
- Estado mínimo aceitável: não há linha sem veredicto. Um cadeado não confirmado é um cadeado que
  não vai ser implementado.

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [pt]
> Confirmo os cadeados [lista]; mude [X] por [Y]. Implemente-os com um teste por cadeado que
> prove que, na condição de dúvida, a ação NÃO ocorre (provado em vermelho contra a versão sem o
> cadeado). Registre a tabela final em `docs/LOCKS.md`. E para toda automação nova: modo de
> ensaio primeiro, registrando o que teria feito, até que eu a habilite.
>
> Quando você precisar de uma decisão minha, peça-a com as quatro partes da UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e nesta ordem: os dados que tornam a pergunta necessária,
> enumerados; um parágrafo de no máximo cinco linhas que os ligue e deixe ver a dúvida; a pergunta
> com as suas respostas possíveis enumeradas; e a sua recomendação. Diga-o na profundidade técnica
> que o projeto declarou em `communication_depth` —`beginner`, `decision_maker` ou `technical`—;
> se o projeto não declarou nenhuma, use `decision_maker`.

O que estou pedindo: o teste por cadeado **provado em vermelho** (sem o cadeado, a ação ocorria;
com o cadeado, não), que é o degrau 8 aplicado à segurança; a tabela final; e a regra do modo de
ensaio para toda automação nova, que é o que permite ver o que teria feito antes de deixá-la
fazer.

## 3. Resultado esperado

- `docs/LOCKS.md`: uma linha por ação com consequência: o que faz, se é reversível, o cadeado, o
  caminho de volta, quem o aprovou e quando.
- Um teste por cadeado, provado em vermelho, que verifica que na dúvida a ação não ocorre.
- As automações novas começando em modo de ensaio, com o registro de "teria feito".
- Se o agente está embarcado: suas permissões escritas (o que pode ler, o que pode mudar, o que
  exige aprovação).

## 4. Verificação de completude

- Cada ação que cobra, envia, aprova ou apaga está na tabela? Pense numa que não esteja e
  pergunte.
- Cada cadeado tem seu teste em vermelho? ("Sem o cadeado, a ação ocorria; com o cadeado, não.")
- Toda ação irreversível tem caminho de volta escrito? Se não tem, precisa de dupla trava.
- As automações novas começaram em modo de ensaio? Você viu o registro de "teria feito" antes de
  habilitá-las?
- O que acontece se o agente embarcado tenta algo fora de suas permissões? Peça que ele tente e
  lhe mostre a recusa no log.

## 5. Sinais de alerta

- Uma automação passou de "não existe" a "roda sozinha" sem um período de modo de ensaio.
- O log não tem nenhuma entrada de "ação não executada por dúvida". Ou o sistema nunca duvida
  (impossível) ou quando duvida segue em frente.
- Um cadeado pode ser pulado com um parâmetro "para testes". Esse parâmetro vai ficar ligado em
  produção.
