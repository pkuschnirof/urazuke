# Passo 1 — O contrato de convivência (contrato do degrau)

**Fase:** arranque.
**Quando:** uma única vez, imediatamente depois da elegibilidade; revisa-se quando um tropeço o
exige.
**Forma:** um disparo, com uma volta de ajuste sua.
**Tamanho:** obrigatório em todo projeto. É o degrau mais barato de todos e o que mais frustração
evita.

## Para que serve

Coloque por escrito, antes da primeira linha de código, como vocês vão trabalhar, você e o
agente. Parece uma formalidade e não é: é o que evita que o agente "ajude" expandindo o escopo,
deixe dívida para depois, ou relate como feito o que acredita ter feito. Na minha ferramenta
este arquivo se chama `SQ.md` (padrões de qualidade); o nome não importa, o conteúdo sim.

Pense assim: o agente é um colaborador novo que chega cada manhã sem memória de ontem. O
contrato é o que você diz a ele no primeiro dia, e o que ele vai reler todos os dias. Se você não
o escreve, vai ter que dizer a cada vez, e vai dizer diferente a cada vez. Eu o escrevi pela
primeira vez quando já levava duas semanas repetindo a mesma coisa em cada sessão
[Ref. 1](../REFERENCIAS.md#ref-1), e nada do que coloquei era novo em engenharia de sistemas; o
novo era ter que escrevê-lo para alguém sem memória.

## 1. Contexto necessário

O que segue é a lista genérica. Os arquivos concretos que você tem que ter prontos antes de cada
prompt, com seu conteúdo e seu estado mínimo, estão na seção 2, no bloco "Antes de enviar o
prompt" que precede cada um.

- Nenhum do projeto: é o primeiro arquivo.
- Seu: suas preferências de trabalho (idioma, como quer que lhe perguntem, o que considera uma
  perda do seu tempo, que nível de autonomia dá ao agente).

## 2. Prompts

**Inicial:**

**Antes de enviar o prompt**, isto tem que existir, e quem faz é você (ou o negócio com você), não
o agente:

- Nada do projeto: é o primeiro arquivo que se escreve. Se você já fez o degrau 0,
  `docs/ELIGIBILITY.md` existe e está bem que o agente o veja, mas não é necessário.
- As suas preferências de trabalho, pensadas antes de começar e anotadas numa lista curta que você
  tem à mão (num papel, ou em `docs/MY_PREFERENCES.md` se quiser que fique no repositório): em que
  idioma quer a conversa; quanto quer que ele pergunte (pouco e com recomendação, ou muito); o que
  considera uma perda do seu tempo; que nível de autonomia dá a ele (pode fazer commits sozinho?,
  pode implantar no ambiente de teste sozinho?, em produção nunca?); o que você não tolera. O
  agente vai perguntar sobre isto; a lista é para que você responda em uma linha e não improvise.
- A pasta do projeto criada e o agente aberto ali.
- Estado mínimo aceitável: você sabe responder cada uma dessas cinco perguntas. O contrato que
  sair vai ser tão bom quanto as suas respostas.

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
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [pt]
> Antes de escrever código, vamos fixar o contrato de convivência entre você e eu. Escreva
> `docs/WORKING_AGREEMENT.md` com pelo menos estas regras, cada uma com uma linha que explique o
> que evita: (1) Meu tempo é sagrado: não me pergunte o que você pode resolver sozinho, e quando
> perguntar, pergunte em prosa, com a sua recomendação. (2) Zero dívida técnica: o que quebra se
> conserta na raiz, com seu teste de regressão, na mesma sessão. (3) Escopo exato: nem mais nem
> menos do que o pedido; se vir outra coisa, anote como pendência, não faça. (4) A documentação se
> atualiza no mesmo commit que a mudança. (5) Nunca relate como feito algo que você não verificou;
> separe sempre o que verificou do que acredita. (6) Fale o meu idioma. Acrescente as regras que
> achar que este projeto precisa, marcadas como propostas. Se precisar saber algo sobre como eu
> trabalho para escrever isto, pergunte-me.
>
> Quando você precisar de uma decisão minha, peça-a com as quatro partes da UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e nesta ordem: os dados que tornam a pergunta necessária,
> enumerados; um parágrafo de no máximo cinco linhas que os ligue e deixe ver a dúvida; a pergunta
> com as suas respostas possíveis enumeradas; e a sua recomendação. Diga-o na profundidade técnica
> que o projeto declarou em `communication_depth` —`beginner`, `decision_maker` ou `technical`—;
> se o projeto não declarou nenhuma, use `decision_maker`.

O que estou pedindo: as seis regras mínimas, cada uma com a falha que evita (isso é o que as
torna regras e não conselhos); que proponha regras próprias do projeto mas as marque como
propostas, para que você as aceite ou rejeite; e que pergunte o que precisar saber sobre você.
Um contrato redigido sem uma única pergunta é suspeito: o agente não conhece a pessoa com quem
vai trabalhar.

**De fechamento:**

**Antes de enviar o prompt**, você tem que ter isto à mão:

- O rascunho de `docs/WORKING_AGREEMENT.md` que o agente escreveu, lido inteiro por você. Para
  cada regra que ele propôs, o seu veredicto: você a aceita ou a rejeita, e se a rejeita, uma
  razão de uma linha. Isso vai nos buracos [X, Y] e [Z] do prompt, e quem os preenche é você.
- As respostas ao que ele perguntou sobre como você trabalha, já dadas no chat.
- Estado mínimo aceitável: não fica nenhuma regra proposta sem veredicto. Uma regra que você não
  aceitou nem rejeitou fica no contrato como se você a tivesse aceitado.

> I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the
> agreement with today's date and a version number. Then add to the project file the
> instruction to read this agreement at the start of every session.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [pt]
> Aceito as regras 1 a 6 e as suas propostas [X, Y]; rejeito [Z] porque [razão]. Feche o contrato
> com a data de hoje e um número de versão. Depois acrescente ao arquivo de projeto a instrução
> de ler este contrato ao começar cada sessão.
>
> Quando você precisar de uma decisão minha, peça-a com as quatro partes da UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e nesta ordem: os dados que tornam a pergunta necessária,
> enumerados; um parágrafo de no máximo cinco linhas que os ligue e deixe ver a dúvida; a pergunta
> com as suas respostas possíveis enumeradas; e a sua recomendação. Diga-o na profundidade técnica
> que o projeto declarou em `communication_depth` —`beginner`, `decision_maker` ou `technical`—;
> se o projeto não declarou nenhuma, use `decision_maker`.

O que estou pedindo: que feche o contrato com data e versão, e que o engate ao arquivo de projeto
para que seja lido em cada sessão. Sem esse engate o contrato existe mas não age.

## 3. Resultado esperado

Um arquivo `docs/WORKING_AGREEMENT.md` (ou `SQ.md`, ou `CONTRATO.md`) com:

- Data e versão.
- Cada regra numerada, em uma ou duas frases, com a falha que evita.
- As regras próprias do projeto, marcadas como tais.
- Uma linha ao pé que diga que o agente propõe mudanças mas não edita o contrato sozinho.

E uma linha no arquivo de projeto (`PROJECT.md` ou `CLAUDE.md`) que ordene lê-lo ao começar cada
sessão.

## 4. Verificação de completude

- Estão as seis regras mínimas, cada uma com a falha que evita?
- Há alguma regra escrita como aspiração ("tentar…", "na medida do possível…")? Se há, não serve:
  as regras se cumprem ou não.
- O arquivo de projeto ordena lê-lo em cada sessão?
- O agente lhe fez pelo menos uma pergunta sobre como você trabalha? Se redigiu tudo sem
  perguntar nada, é suspeito: ele não conhece você.

## 5. Sinais de alerta

- O contrato tem mais de vinte regras. Ninguém, nem humano nem modelo, respeita vinte regras;
  respeitam-se seis ou oito.
- Uma regra diz "o agente pode modificar este contrato quando considerar necessário". Não.
- Duas semanas depois, o agente faz algo que o contrato proíbe e ninguém nota. O contrato não
  está sendo lido: revise o engate no arquivo de projeto.
