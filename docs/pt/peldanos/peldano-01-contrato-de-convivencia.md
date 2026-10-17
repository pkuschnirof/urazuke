# Passo 1 — O contrato de convivência (contrato do degrau)

**Fase:** arranque (uma vez por projeto; revisado quando um tropeço exige).
**Forma:** um disparo só, com uma rodada de ajuste do dono.
**Tamanho:** obrigatório em todo projeto. É o degrau mais barato de todos e o que mais frustração
evita.

## Para que serve

Para que humano e agente combinem como vão trabalhar antes da primeira linha de código. Parece
uma formalidade e não é: é o que evita que o agente "ajude" expandindo o escopo, deixe dívida para
depois, ou relate como feito o que acredita ter feito. No Forge este arquivo se chama `SQ.md`
(padrões de qualidade); o nome não importa, o conteúdo sim.

Uma forma de entender: o agente é um colega novo que chega toda manhã sem memória de ontem. O
contrato é o que você diz a ele no primeiro dia, e o que ele vai reler todo dia. Se você não
escreve, vai ter que dizer toda vez, e vai dizer diferente a cada vez.

## 1. Contexto necessário

- Nenhum do projeto: é o primeiro arquivo.
- Do dono: suas preferências de trabalho (idioma, como quer que lhe perguntem, o que considera
  perda de tempo, que nível de autonomia dá ao agente).

## 2. Prompts

**Inicial:**

> Before we write any code, we are going to set the working agreement between you and me.
> Write `docs/WORKING_AGREEMENT.md` with at least these rules, each with one line explaining
> what it prevents: (1) My time is sacred: do not ask me what you can resolve on your own, and
> when you do ask, ask in prose, with your recommendation. (2) Zero technical debt: whatever
> breaks is fixed at the root, with its regression test, in the same session. (3) Exact scope:
> no more and no less than what was asked; if you see something else, log it as a pending item,
> do not do it. (4) Documentation is updated in the same commit as the change. (5) Never report
> as done something you have not verified; always separate what you verified from what you
> believe. (6) Speak my language. Add any rules you think this project needs, marked as
> proposals. If you need to know something about how I work in order to write this, ask me.

O que estamos pedindo: as seis regras mínimas, cada uma com a falha que evita (é isso que as torna
regras e não conselhos); que proponha regras próprias do projeto mas as marque como propostas, para
que o dono as aceite ou rejeite; e que pergunte o que precisar saber sobre o dono. Um contrato
redigido sem uma única pergunta é suspeito: o agente não conhece a pessoa com quem vai trabalhar.

**De fechamento:**

> I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the
> agreement with today's date and a version number. Then add to the project file the
> instruction to read this agreement at the start of every session.

O que estamos pedindo: que feche o contrato com data e versão, e que o vincule ao arquivo de
projeto para que seja lido em toda sessão. Sem esse vínculo o contrato existe mas não atua.

## 3. Resultado esperado

Um arquivo `docs/WORKING_AGREEMENT.md` (ou `SQ.md`, ou `CONTRATO.md`) com:

- Data e versão.
- Cada regra numerada, em uma ou duas frases, com a falha que evita.
- As regras próprias do projeto, marcadas como tais.
- Uma linha ao pé dizendo que o agente propõe mudanças mas não edita o contrato sozinho.

E uma linha no arquivo de projeto (`PROJECT.md` ou `CLAUDE.md`) que ordene lê-lo ao começar cada
sessão.

## 4. Verificação de completude

- As seis regras mínimas estão lá, cada uma com a falha que evita?
- Há alguma regra escrita como aspiração ("tentar…", "na medida do possível…")? Se houver, não
  serve: as regras se cumprem ou não.
- O arquivo de projeto ordena lê-lo em cada sessão?
- O agente fez pelo menos uma pergunta sobre como você trabalha? Se redigiu tudo sem perguntar
  nada, é suspeito: ele não te conhece.

## 5. Sinais de alerta

- O contrato tem mais de vinte regras. Ninguém, nem humano nem modelo, respeita vinte regras;
  respeitam-se seis ou oito.
- Uma regra diz "o agente pode modificar este contrato quando considerar necessário". Não.
- Duas semanas depois, o agente faz algo que o contrato proíbe e ninguém percebe. O contrato não
  está sendo lido: revise o vínculo no arquivo de projeto.
