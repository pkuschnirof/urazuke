# Passo 2 — A definição do projeto e a leitura obrigatória (contrato do degrau)

**Fase:** arranque (uma vez; mantido em dia durante todo o projeto).
**Forma:** conversa (o agente redige, pergunta o que falta, o dono corrige).
**Tamanho:** obrigatório em todo projeto. Num projeto pequeno, o arquivo de projeto pode ter
cinquenta linhas; o que não pode é não existir.

## Para que serve

Cada sessão do agente começa do zero: ele não se lembra de ontem. Então precisa de um mapa, curto,
que diga o que é o projeto, em que estado está e que decisões já foram tomadas. E precisa da
obrigação de lê-lo antes de tocar em qualquer coisa. A falha que evita é dupla: trabalho jogado fora
por não ler o mapa, e o mapa que cresce até ficar ilegível (num dos sistemas de origem o arquivo de
projeto chegou a 9.661 linhas, e nesse estado ninguém lê, nem o modelo).

A regra prática que sai desse tropeço: **o arquivo de projeto é o programa, não o histórico**. O
que aconteceu vai para outro lugar (o registro de pendências, o estado vivo, o diário); o arquivo
de projeto diz o que é o sistema, para quem, o que não é, e o que foi decidido.

## 1. Contexto necessário

- Levantamento do negócio: o que o cliente faz, quem usa o sistema, que problema resolve, o que
  não deve fazer.
- O contrato de convivência (degrau 1).
- Se existe um sistema anterior: acesso de leitura ao seu código ou à sua documentação.
- As decisões já tomadas, se houver, ainda que só faladas.

## 2. Prompts

**Inicial:**

> We are going to define the project in writing. Read the business survey in
> `docs/INITIAL_SURVEY.md` and the working agreement in `docs/WORKING_AGREEMENT.md`. Evaluate
> whether the survey is sufficient to describe the system, its users and its boundaries; if it
> is not, ask me for what is missing before writing anything. Then write `PROJECT.md`, three
> hundred lines at most, with: what the system is and for whom; what it is NOT; the main
> modules as a list; the decisions already made, each with its date; and the instruction to
> read this file and the working agreement at the start of every session. Separately, create
> `docs/STATUS.md` for the living state (what is being worked on, what is open): that file
> changes every day; `PROJECT.md` almost never does. Reply in my language.

O que estamos pedindo: que avalie o levantamento e pergunte antes de redigir; que o arquivo de
projeto seja **curto** (o teto de trezentas linhas é arbitrário mas necessário: sem teto, cresce);
que diga explicitamente o que o sistema **não** é, porque o que não está dito é o que o modelo vai
inventar; que as decisões tenham data; e que separe o estado vivo em outro arquivo, para que o
arquivo de projeto não vire histórico.

**De fechamento:**

> Apply these corrections: [list]. Finalize `PROJECT.md` with today's date. Add to the working
> agreement that the change history never goes into `PROJECT.md`: it goes to `docs/STATUS.md`
> or to the pending-items register.

O que estamos pedindo: as correções do dono, a data, e uma regra nova no contrato que proteja o
arquivo de projeto de virar changelog. Essa regra é a que faltou no caso das 9.661 linhas.

## 3. Resultado esperado

- `PROJECT.md` (ou `CLAUDE.md`): curto, de leitura obrigatória, com o que é, para quem, o que não
  é, módulos, decisões com data, e a ordem de lê-lo. Máximo trezentas linhas.
- `docs/STATUS.md`: estado vivo, separado do anterior.
- Em ambos, uma data de última atualização.
- No contrato, a regra de que o histórico não vai em `PROJECT.md`.

## 4. Verificação de completude

- `PROJECT.md` cabe numa leitura de cinco minutos? Se não, está errado: é o programa, não o
  histórico.
- Diz explicitamente o que o sistema NÃO faz? (O que falta é o que o agente vai inventar.)
- Cada decisão tem data e quem a tomou?
- O agente perguntou algo sobre o negócio antes de redigir? Se não perguntou nada, revise o que
  supôs.
- O estado vivo está em outro arquivo?

## 5. Sinais de alerta

- O arquivo de projeto cresceu mais de 20 % num mês. Algo que não é programa está entrando.
- O agente começa uma sessão propondo algo que já foi decidido e está escrito. Não leu o mapa: o
  vínculo de leitura obrigatória falhou.
- A seção "o que não é" está vazia ou diz "nada em particular". Todo sistema tem limites; se não
  estão escritos, o modelo vai cruzá-los.
