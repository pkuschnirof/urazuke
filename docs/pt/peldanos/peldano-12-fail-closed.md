# Passo 12 — Fail-closed, cadeados e zero dano silencioso (contrato do degrau)

**Fase:** operação (desenha-se antes de o sistema agir sobre o mundo; revisa-se a cada ação nova
com consequência).
**Forma:** conversa: o agente lista as ações com consequência, o dono confirma quais levam cadeado e
de que tipo.
**Tamanho:** obrigatório assim que o sistema faz algo irreversível (cobrar, enviar, apagar,
aprovar). Um sistema somente leitura pode pulá-lo; no momento em que ganha seu primeiro botão que
age sobre o mundo, este degrau se torna o mais importante.

## Para que serve

Para que o sistema, diante de dúvida ou falha, NÃO aja, e avise. Soa óbvio e é o contrário do que o
software faz por padrão, que diante da dúvida segue em frente. Evita a cobrança dupla, a aprovação
automática sem passar por um humano, o `git add -A` que sobe uma credencial, e apagar dados do
cliente.

O princípio tem nome, "fail-closed", e vem da segurança física: uma porta de segurança que fica
fechada quando falta luz. O contrário, "fail-open", é a porta que se abre. Em software a maioria das
coisas é fail-open por padrão: se a validação falha, o código segue; se o serviço não responde,
assume-se que está tudo bem. O método inverte o padrão: **na dúvida, não**. E se aplica tanto ao
sistema quanto ao agente que o opera.

## 1. Contexto necessário

- **Levantamento de ações com consequência**, nomeado assim de forma genérica: o que o sistema faz
  que cobra, envia, aprova, apaga, ou avisa alguém de fora; o que acontece se for feito duas vezes;
  o que acontece se for feito errado; como se desfaz. O negócio sabe; o agente avalia se a lista
  está completa e pergunta.
- Que ações o próprio agente pode fazer sobre o sistema (se está embarcado).

## 2. Prompts

**Inicial:**

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock. Reply in my language.

O que estamos pedindo: a comparação entre o que o negócio disse e o que o código faz (ali aparecem
as ações de que ninguém se lembrava); a cláusula de completude na sua forma para este degrau: as
diferenças entre as duas listas se perguntam, não se resolvem; para cada ação, reversibilidade,
cadeado e caminho de volta; e a regra geral do fail-closed escrita no prompt, para que fique na
tabela e no código.

**De fechamento:**

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.

O que estamos pedindo: o teste por cadeado **provado em vermelho** (sem o cadeado, a ação
acontecia; com o cadeado, não), que é o degrau 7 aplicado à segurança; a tabela final; e a regra do
modo de ensaio para toda automação nova, que é o que permite ver o que teria feito antes de deixá-la
fazer.

## 3. Resultado esperado

- `docs/LOCKS.md`: uma linha por ação com consequência: o que faz, se é reversível, o cadeado, o
  caminho de volta, quem aprovou e quando.
- Um teste por cadeado, provado em vermelho, que verifica que na dúvida a ação não acontece.
- As automações novas começando em modo de ensaio, com o registro de "teria feito".
- Se o agente está embarcado: suas permissões escritas (o que pode ler, o que pode mudar, o que
  precisa de aprovação).

## 4. Verificação de completude

- Cada ação que cobra, envia, aprova ou apaga está na tabela? Pense numa que não esteja e
  pergunte.
- Cada cadeado tem seu teste em vermelho? ("Sem o cadeado, a ação acontecia; com o cadeado, não.")
- Toda ação irreversível tem caminho de volta escrito? Se não tem, precisa de segurança dupla.
- As automações novas começaram em modo de ensaio? Você viu o registro de "teria feito" antes de
  habilitá-las?
- O que acontece se o agente embarcado tenta algo fora de suas permissões? Peça que ele teste e
  mostre a rejeição no log.

## 5. Sinais de alerta

- Uma automação passou de "não existe" a "roda sozinha" sem um período de modo de ensaio.
- O log não tem nenhuma entrada de "ação não executada por dúvida". Ou o sistema nunca duvida
  (impossível) ou quando duvida segue em frente.
- Um cadeado pode ser contornado com um parâmetro "para testes". Esse parâmetro vai ficar ligado
  em produção.
