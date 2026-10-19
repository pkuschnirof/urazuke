# Passo 7 — Medir antes de construir, com um instrumento que também se verifica (contrato do degrau)

**Fase:** ciclo.
**Quando:** cada vez que uma pendência depende de um número ou de uma hipótese de causa, ANTES de
construir. No arranque, o dimensionamento é o primeiro caso. Num projeto pequeno, "medir" é
contar com um comando e anotar o número com a data.
**Forma:** um disparo por medição; às vezes uma conversa quando a hipótese é sua.
**Tamanho:** proporcional. A catraca e o orçamento de consultas são para sistemas com volume. O
que não muda com o tamanho: nenhum número que decide algo sai de uma impressão.

## Para que serve

Faça com que todo número que alimenta uma decisão saia de um programa com teste, e não de uma
busca de texto, de uma impressão, nem de "acho que são uns cem". E faça com que o próprio
instrumento seja auditado, porque os medidores mentem: um dos meus não via 84 chamadas com o
contador em zero, e outro dizia 27 quando eram 44 [Ref. 35](../REFERENCIAS.md#ref-35),
[Ref. 36](../REFERENCIAS.md#ref-36). As cinco regras que escrevi depois disso são: medidor com
guarda; se o instrumento não existe, constrói-se; audita-se em duas direções; o aproximado se
marca; e quem executa verifica os números de quem planejou.

Este degrau é o que mais demorei a formalizar, e por uma razão que vale a pena contar: dava por
certo que um modelo aplicaria sozinho algo tão básico da engenharia como "meça antes de tocar".
Não aplica. O modelo é muito bom em produzir afirmações com número ("há uns 120 laços desse
tipo") e essas afirmações soam exatamente igual quando estão medidas e quando estão estimadas.
Você não tem como distingui-las pelo tom. A única forma é exigir o instrumento: "com que você
mediu? mostre-me o comando". Se não há comando, é uma impressão, por mais decimais que tenha. As
regras, eu as impus em sessão, corrigindo o agente, antes de que fossem doutrina
[Ref. 45](../REFERENCIAS.md#ref-45).

## 1. Contexto necessário

O que segue é a lista genérica. Os arquivos concretos que você tem que ter prontos antes de cada
prompt, com seu conteúdo e seu estado mínimo, estão na seção 2, no bloco "Antes de enviar o
prompt" que precede cada um.

- A hipótese, sua ou do agente: "acho que o problema é X", "devem ser uns cem".
- Acesso ao que se quer medir: o código, o banco em somente leitura, o log.
- Os medidores que já existem no repositório, se houver.

## 2. Prompts

**Inicial:**

**Antes de enviar o prompt**, isto tem que existir, e quem faz é você (ou o negócio com você), não
o agente:

- A hipótese, escrita numa frase, sua ou tirada do agente: "acho que a agenda faz uma consulta ao
  banco para cada consulta que mostra", "devem ser uns cem laços". Vai no buraco [X] do prompt, e
  a quantidade a medir no outro buraco.
- Acesso ao que se vai medir: o código (ele já o tem); o banco em somente leitura, se a medida é
  sobre dados reais, com a string de conexão fora do repositório e o nome da variável dito no
  chat; o log, com o seu caminho.
- Os medidores que já existem no repositório, se os há, nomeados, para que o agente os reutilize
  em vez de fazer outro.
- Um caso conhecido para o teste do medidor: uma situação em que você sabe a resposta de antemão
  ("com zero consultas tem que contar exatamente as duas consultas base ao banco"). Se não lhe
  ocorre nenhum, peça ao agente que o proponha, mas valide-o você: um medidor verificado contra um
  caso que o próprio medidor inventou não está verificado.
- Estado mínimo aceitável: a hipótese cabe numa frase e há um caso conhecido com o qual verificar
  o instrumento.

> Before building anything, we are going to measure. The hypothesis is: [X]. Write a meter (a
> script that lives in the repository) that measures [the quantity], and a test for the meter
> that checks it against a known case where the answer is known in advance. If measuring
> requires access or data you lack, ask me; do not approximate silently. If some part can only
> be approximated, mark it as approximate and tell me the margin. Run the meter, show me the
> number together with the command that produces it, and audit it in both directions: from the
> code to the measurement (is everything that should be counted, counted?) and from the
> measurement to the code (does everything counted actually exist?). Only then propose what to
> build. Reply in my language.

> [pt]
> Antes de construir qualquer coisa, vamos medir. A hipótese é: [X]. Escreva um medidor (um
> script que vive no repositório) que meça [a quantidade], e um teste para o medidor que o
> verifique contra um caso conhecido onde a resposta se sabe de antemão. Se medir exige acesso
> ou dados que você não tem, peça-me; não aproxime em silêncio. Se alguma parte só pode ser
> aproximada, marque-a como aproximada e diga-me a margem. Rode o medidor, mostre-me o número
> junto com o comando que o produz, e audite-o nas duas direções: do código à medição (está
> contado tudo o que deveria ser contado?) e da medição ao código (existe de verdade tudo o que
> foi contado?). Só então proponha o que construir. Responda no meu idioma.

O que estou pedindo, cláusula por cláusula: o medidor **no repositório** (não um comando solto
que se perde); o **teste do medidor** contra um caso conhecido (a guarda); a cláusula de
completude na sua forma para medir (pedir o acesso, não aproximar em silêncio); marcar o
aproximado com sua margem; o número **com o comando** que o produz, para que você possa rodá-lo;
a auditoria em duas direções, que é o que desmascarou os meus dois medidores que mentiam; e a
ordem: primeiro medir, depois propor.

**Quando há um orçamento:**

**Antes de enviar o prompt**, você tem que ter isto à mão:

- O número medido, que você mesmo rodou com o comando que o agente lhe deu, e que deu o mesmo. Se
  você não o rodou, não fixe um orçamento sobre ele.
- A margem que você está disposto a dar, decidida por você: um pouco mais do que o medido, não o
  dobro "por via das dúvidas".
- Estado mínimo aceitável: você rodou o medidor.

> Set the budget for [queries / loops / time] on this path at the measured value plus a small
> margin, and protect it with a test that fails if it is exceeded. Tell me the number and the
> margin.

> [pt]
> Fixe o orçamento de [consultas / laços / tempo] neste caminho no valor medido mais uma margem
> pequena, e proteja-o com um teste que falhe se for superado. Diga-me o número e a margem.

O que estou pedindo: que o orçamento seja o medido mais pouco, não um número redondo, e que tenha
um teste que falhe se for superado. Assim uma regressão de desempenho aparece na bateria e não
em produção [Ref. 37](../REFERENCIAS.md#ref-37).

**Quando quem planejou deu números (regra cinco):**

**Antes de enviar o prompt**, você tem que ter isto à mão:

- Um plano do agente com números dentro ("há 121 laços", "são 27 consultas"), à vista na conversa.
- O medidor que mede essa quantidade, já existente (o prompt inicial deste degrau). Se não há
  medidor para esse número, primeiro o prompt inicial e depois este.
- Estado mínimo aceitável: para cada número do plano você sabe com que medidor se verifica.

> Before executing the plan, verify every number the plan asserts with the meter. If any does
> not match, stop and tell me; do not execute on a wrong number.

> [pt]
> Antes de executar o plano, verifique com o medidor cada número que o plano afirma. Se algum
> não bate, pare e diga-me; não execute sobre um número errado.

O que estou pedindo: que quem executa não confie nos números de quem planejou, mesmo que seja o
mesmo modelo em outra sessão. No meu caso, três de quatro afirmações do plano estavam erradas;
onde havia instrumento, o número era exato.

## 3. Resultado esperado

- O medidor no repositório (`tools/measure_*.py`, `scripts/meter-*.mjs` ou similar), com seu
  teste.
- O número, com o comando que o produz e a data.
- A auditoria em duas direções, escrita em duas ou três linhas.
- O aproximado marcado como tal, com sua margem.
- Se há orçamento: o valor, a margem, e o teste que o protege.
- No commit: "measured: [number] with [meter]".

## 4. Verificação de completude

- Você consegue rodar o comando do medidor e dá o mesmo número? (Você roda; não precisa
  entendê-lo, só executá-lo.)
- O medidor tem teste? Contra que caso conhecido?
- Há algum número no relatório sem medidor por trás? Pergunte de onde saiu.
- O aproximado está marcado?
- Se o plano trazia números, o agente os verificou antes de executar e lhe disse quais não
  batiam?

## 5. Sinais de alerta

- Um número mudou entre dois relatórios sem que o código mudasse. Um dos dois não foi medido.
- O medidor dá zero. Quase nunca é zero; quase sempre o medidor não está vendo algo.
- O agente propõe construir "enquanto mede", para ganhar tempo. A ordem é o método: primeiro o
  número, depois o plano.
