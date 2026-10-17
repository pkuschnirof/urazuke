# Passo 9 — Medir antes de construir, com um instrumento que também se verifica (contrato do degrau)

**Fase:** ciclo (cada vez que um número alimenta uma decisão).
**Forma:** um disparo por medição; às vezes uma conversa quando a hipótese é do dono.
**Tamanho:** proporcional. Num projeto pequeno, "medir" pode ser contar com um comando e anotar o
número com sua data; a catraca e o orçamento de consultas são para sistemas com volume. O que não
muda com o tamanho: nenhum número que decide algo sai de uma impressão.

## Para que serve

Para que todo número que alimenta uma decisão saia de um programa com teste, e não de uma busca de
texto, de uma impressão, nem de "acho que são uns cem". E para que o instrumento mesmo seja
auditado, porque os medidores mentem: no Kikan um não via 84 chamadas com o contador em zero, e
outro dizia 27 quando eram 44. As cinco regras são: medidor com guarda; se o instrumento não existe,
constrói-se; audita-se em duas direções; o aproximado se marca; e quem executa verifica os números
de quem planejou.

Há uma razão de fundo para este degrau existir: o modelo é muito bom em produzir afirmações com
número ("há uns 120 laços desse tipo") e essas afirmações soam exatamente igual quando são medidas e
quando são estimadas. O dono não tem como distingui-las pelo tom. A única forma é exigir o
instrumento: "com que você mediu? mostre o comando". Se não há comando, é uma impressão, por mais
decimais que tenha.

## 1. Contexto necessário

- A hipótese, do dono ou do agente: "acho que o problema é X", "devem ser uns cem".
- Acesso ao que se quer medir: o código, o banco somente leitura, o log.
- Os medidores que já existem no repositório, se houver.

## 2. Prompts

**Inicial:**

> Before building anything, we are going to measure. The hypothesis is: [X]. Write a meter (a
> script that lives in the repository) that measures [the quantity], and a test for the meter
> that checks it against a known case where the answer is known in advance. If measuring
> requires access or data you lack, ask me; do not approximate silently. If some part can only
> be approximated, mark it as approximate and tell me the margin. Run the meter, show me the
> number together with the command that produces it, and audit it in both directions: from the
> code to the measurement (is everything that should be counted, counted?) and from the
> measurement to the code (does everything counted actually exist?). Only then propose what to
> build. Reply in my language.

O que estamos pedindo, cláusula por cláusula: o medidor **no repositório** (não um comando solto
que se perde); o **teste do medidor** contra um caso conhecido (a guarda); a cláusula de completude
na sua forma para medir (pedir o acesso, não aproximar em silêncio); marcar o aproximado com sua
margem; o número **com o comando** que o produz, para que o dono possa rodá-lo; a auditoria em
duas direções, que é o que destapou os dois medidores que mentiam; e a ordem: primeiro medir,
depois propor.

**Quando há um orçamento:**

> Set the budget for [queries / loops / time] on this path at the measured value plus a small
> margin, and protect it with a test that fails if it is exceeded. Tell me the number and the
> margin.

O que estamos pedindo: que o orçamento seja o medido mais pouco, não um número redondo, e que tenha
um teste que falhe se for superado. Assim uma regressão de desempenho aparece na bateria e não em
produção.

**Quando quem planejou deu números (regra cinco):**

> Before executing the plan, verify every number the plan asserts with the meter. If any does
> not match, stop and tell me; do not execute on a wrong number.

O que estamos pedindo: que quem executa não confie nos números de quem planejou, ainda que seja o
mesmo modelo em outra sessão. No Kikan, três de quatro afirmações do plano estavam erradas; onde
havia instrumento, o número era exato.

## 3. Resultado esperado

- O medidor no repositório (`tools/measure_*.py`, `scripts/meter-*.mjs` ou similar), com seu
  teste.
- O número, com o comando que o produz e a data.
- A auditoria em duas direções, escrita em duas ou três linhas.
- O aproximado marcado como tal, com sua margem.
- Se há orçamento: o valor, a margem, e o teste que o protege.
- No commit: "measured: [number] with [meter]".

## 4. Verificação de completude

- Você consegue rodar o comando do medidor e dá o mesmo número? (Você roda; não precisa entender,
  só executar.)
- O medidor tem teste? Contra que caso conhecido?
- Há algum número no relatório sem medidor por trás? Pergunte de onde saiu.
- O aproximado está marcado?
- Se o plano trazia números, o agente os verificou antes de executar e disse quais não batiam?

## 5. Sinais de alerta

- Um número mudou entre dois relatórios sem que o código mudasse. Um dos dois não foi medido.
- O medidor dá zero. Quase nunca é zero; quase sempre é que o medidor não vê algo (no Kikan, duas
  vezes).
- O agente propõe construir "enquanto mede", para ganhar tempo. A ordem é o método: primeiro o
  número, depois o plano.
