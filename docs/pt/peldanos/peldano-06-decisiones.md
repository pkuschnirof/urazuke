# Passo 6 — As decisões se escrevem junto ao código (contrato do degrau)

**Fase:** ciclo (cada vez que aparece uma regra de negócio ou uma decisão estrutural).
**Forma:** conversa curta: o agente detecta que há uma decisão, pergunta, e a deixa escrita.
**Tamanho:** obrigatório em todo projeto. Num pequeno o registro pode ser uma tabela de dez
linhas; o que importa é que as regras de negócio tenham dono.

## Para que serve

Para que cada regra de negócio e cada decisão estrutural tenha dono, data e lugar. Se não, em seis
semanas ninguém sabe se "aprovada mais saldo volta para a fila" foi uma decisão do cliente ou uma
ideia do agente. E evita o pior: o agente inventando regras de domínio porque lhe pareceram
razoáveis.

Isso tem uma consequência que vale dizer em voz alta: o modelo, quando encontra uma lacuna nas
regras, **a preenche**. Não para; completa com o que lhe parece mais provável, e o faz com a mesma
naturalidade com que escreve o resto. Por isso a rotina deste degrau não é "escreva as decisões"
mas "pare e pergunte quando faltar uma". A segunda é a difícil, e é a que se deve exigir no
contrato.

## 1. Contexto necessário

- A conversa com o dono: é o único contexto. O agente não pode decidir regras de negócio.
- Um lugar combinado onde se escrevem as decisões: a mensagem do commit, o documento da
  pendência, ou um registro `docs/DECISIONS.md`.

## 2. Prompts

**Rotina (vai no contrato de convivência):**

> Whenever implementing something requires a business rule that is not written down, or you
> must choose between two approaches that change what the user sees, stop and ask me, in prose,
> with your recommendation and the alternative. Do not implement the one you prefer. When I
> decide, write the decision with my name and the date in the commit message and in
> `docs/DECISIONS.md`, with the exact words I used. If I do not answer and you must move on,
> implement the most reversible option and mark it "decision by omission, pending confirmation",
> so that I can review it.

O que estamos pedindo: que **pare** diante de uma regra não escrita ou de uma bifurcação visível;
que pergunte com recomendação e alternativa (para que o dono decida em dez segundos, não em dez
minutos); que registre a decisão com as palavras textuais do dono, não com uma paráfrase
"melhorada"; e, para quando o dono não responde, a opção mais reversível marcada como "por
omissão", que é o que permite seguir sem que a decisão desapareça.

**De fechamento (cada decisão):**

> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.

O que estamos pedindo: o formato mínimo de uma decisão: a regra textual, quem, quando. Três coisas;
sem qualquer uma das três não é uma decisão registrada.

## 3. Resultado esperado

- `docs/DECISIONS.md`: uma linha ou um parágrafo por decisão, com data, quem decidiu, a frase
  textual, a pendência ou commit onde foi aplicada, e se foi "por omissão".
- Em cada commit que implementa uma regra de negócio: a frase de origem ("regra do dono:
  aprovada + saldo = volta para a fila", "decisão do dono 2026-08-10").

## 4. Verificação de completude

- Abra três commits que toquem regras de negócio: cada um cita quem decidiu e quando?
- Há decisões "por omissão" sem confirmar? Confirme-as ou reverta-as; não as deixe.
- Há alguma regra no sistema que você não reconhece como sua? Se houver, o agente a inventou: é
  uma falha do degrau, escreve-se como pendência e se revisa.
- As frases estão textuais ou "melhoradas" pelo agente? Têm que ser as suas.

## 5. Sinais de alerta

- Passou uma semana de trabalho e o registro de decisões não cresceu. Ou o trabalho foi puramente
  mecânico (raro) ou o agente decidiu sozinho.
- As decisões registradas estão todas redigidas com o mesmo estilo polido. São paráfrases do
  agente, não suas palavras.
- Um usuário do sistema pergunta "por que faz isso?" e ninguém encontra a decisão.
