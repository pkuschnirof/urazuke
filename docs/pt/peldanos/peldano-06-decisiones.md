# Passo 6 — As decisões se escrevem junto ao código (contrato do degrau)

**Fase:** ciclo.
**Quando:** em cada sessão do ciclo, cada vez que o agente topa com uma regra de negócio não
escrita ou com uma bifurcação que muda o que o usuário vê. Costumam ser duas ou três por bloco.
Também no arranque (degraus 0 e 3) e na saída para produção (12 e 13).
**Forma:** conversa curta: o agente detecta que há uma decisão, pergunta, e a deixa escrita.
**Tamanho:** obrigatório em todo projeto. Num pequeno o registro pode ser uma tabela de dez
linhas; o que importa é que as regras de negócio tenham dono.

## Para que serve

Faça com que cada regra de negócio e cada decisão estrutural tenha dono, data e lugar. Se não,
em seis semanas ninguém sabe se "aprovada mais saldo volta para a fila" foi uma decisão do
cliente ou uma ocorrência do agente. E evite o pior: o agente inventando regras de domínio porque
lhe pareceram razoáveis.

Isso tem uma consequência que quero dizer em voz alta: o modelo, quando encontra um buraco nas
regras, **o preenche**. Não para; completa com o que lhe parece mais provável, e faz isso com a
mesma naturalidade com que escreve o resto. Por isso a rotina deste degrau não é "escreva as
decisões" mas "pare e pergunte quando faltar uma". A segunda é a difícil, e é o que há que exigir
no contrato. A prática de deixar a regra escrita no commit, com as minhas palavras e a data, eu a
impus no Plano de Saúde [Ref. 29](../REFERENCIAS.md#ref-29), e a de congelar as decisões antes de
construir vem da minha ferramenta [Ref. 5](../REFERENCIAS.md#ref-5).

## 1. Contexto necessário

O que segue é a lista genérica. Os arquivos concretos que você tem que ter prontos antes de cada
prompt, com seu conteúdo e seu estado mínimo, estão na seção 2, no bloco "Antes de enviar o
prompt" que precede cada um.

- A conversa com o dono: é o único contexto. O agente não pode decidir regras de negócio.
- Um lugar acordado onde se escrevem as decisões: a mensagem do commit, a especificação da
  pendência, e um registro `docs/DECISIONS.md`.

## 2. Prompts

**Rotina (vai no contrato de convivência):**

**Antes de enviar o prompt**, isto tem que existir, e quem faz é você (ou o negócio com você), não
o agente:

- `docs/WORKING_AGREEMENT.md` (degrau 1), onde vai a rotina.
- `docs/DECISIONS.md`, criado mesmo que esteja vazio, com o formato no cabeçalho: data, quem
  decidiu, as palavras textuais, a pendência que a necessitava. Você o cria ou o pede ao agente na
  mesma sessão; o que importa é que o lugar acordado exista antes da primeira decisão.
- Você, disponível. Esta rotina só funciona se, quando o agente para e pergunta, alguém responde
  em horas e não em semanas. Se o dono do domínio é outra pessoa, combine com ele o canal e o
  tempo de resposta antes de colar o prompt.
- Estado mínimo aceitável: o registro existe e há alguém que decide.

> Whenever implementing something requires a business rule that is not written down, or you
> must choose between two approaches that change what the user sees, stop and ask me, in prose,
> with your recommendation and the alternative. Do not implement the one you prefer. When I
> decide, write the decision with my name and the date in the commit message, in the pending
> item's specification and in `docs/DECISIONS.md`, with the exact words I used. If I do not
> answer and you must move on, implement the most reversible option and mark it "decision by
> omission, pending confirmation", so that I can review it.

> [pt]
> Cada vez que implementar algo exigir uma regra de negócio que não está escrita, ou você tiver
> que escolher entre duas abordagens que mudam o que o usuário vê, pare e pergunte-me, em prosa,
> com a sua recomendação e a alternativa. Não implemente a que você prefere. Quando eu decidir,
> escreva a decisão com o meu nome e a data na mensagem do commit, na especificação da pendência
> e em `docs/DECISIONS.md`, com as palavras exatas que usei. Se eu não responder e você tiver que
> seguir, implemente a opção mais reversível e marque-a como "decisão por omissão, pendente de
> confirmação", para que eu a revise.

O que estou pedindo: que **pare** diante de uma regra não escrita ou de uma bifurcação visível;
que pergunte com recomendação e alternativa (para que você decida em dez segundos, não em dez
minutos); que registre a decisão com as suas palavras textuais nos três lugares (o commit, a
pendência, o registro), não com uma paráfrase "melhorada"; e, para quando você não responde, a
opção mais reversível marcada como "por omissão", que é o que permite seguir sem que a decisão
desapareça.

**De fechamento (cada decisão):**

**Antes de enviar o prompt**, você tem que ter isto à mão:

- A pergunta do agente, lida, com a sua recomendação e a sua alternativa.
- A sua decisão, consultada com o dono do domínio se não for você, redigida numa frase com as suas
  palavras exatas, as que você quer que fiquem para sempre (vão estar no commit, na pendência e no
  registro), e a data.
- Estado mínimo aceitável: a frase está escrita antes de colar o prompt, não se improvisa no chat.
  Uma regra parafraseada depois é uma regra diferente.

> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.

> [pt]
> Regra: [texto exato]. Decidida por mim, [data]. Anote e continue.

O que estou pedindo: o formato mínimo de uma decisão: a regra textual, quem, quando. Três coisas;
sem qualquer uma das três não é uma decisão registrada.

## 3. Resultado esperado

- `docs/DECISIONS.md`: uma linha ou um parágrafo por decisão, com data, quem decidiu, a frase
  textual, a pendência ou commit onde se aplicou, e se foi "por omissão".
- Na especificação de cada pendência afetada: a regra com sua decisão e data.
- Em cada commit que implementa uma regra de negócio: a frase de origem.

## 4. Verificação de completude

- Abra três commits que toquem regras de negócio: cada um cita quem decidiu e quando?
- Há decisões "por omissão" sem confirmar? Confirme-as ou reverta-as; não as deixe.
- Há alguma regra no sistema que você não reconhece como sua? Se há, o agente a inventou: é uma
  falha do degrau, escreve-se como pendência e se revisa.
- As frases estão textuais ou "melhoradas" pelo agente? Têm que ser as suas.

## 5. Sinais de alerta

- Passou uma semana de trabalho e o registro de decisões não cresceu. Ou o trabalho foi
  puramente mecânico (raro) ou o agente decidiu sozinho.
- As decisões registradas estão todas redigidas com o mesmo estilo polido. São paráfrases do
  agente, não as suas palavras.
- Um usuário do sistema pergunta "por que ele faz isto?" e ninguém encontra a decisão.
