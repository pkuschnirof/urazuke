# Passo 10 — Verificação honesta e relatório proporcional (contrato do degrau)

**Fase:** ciclo (ao fechar cada mudança).
**Forma:** rotina; é a forma que todo relatório do agente tem que ter.
**Tamanho:** obrigatório em todo projeto, sem exceção. Não custa nada e é o que faz com que o dono
possa não ler código.

## Para que serve

Se o dono não vai ler código, o relatório do agente tem que ser confiável. Não otimista, não
"completo na aparência": confiável. Isto é o genuinamente novo do método: o autor do código também
fabrica a evidência, e o faz com a mesma segurança na voz quando está certo e quando está errado.
Por isso a evidência tem que provar a si mesma, e o relatório tem que separar o verificado do
acreditado.

É preciso entender por que o modelo tende a relatar demais. Não é má-fé: é que foi treinado para
ser útil e completo, e um relatório que diz "não pude verificar isto" parece menos útil do que um
que diz "pronto". Então é preciso **pedir explicitamente** as más notícias, os pontos cegos e o que
não fez. Se você não pede, ele não dá, não porque esconda, mas porque não considera parte da
resposta.

## 1. Contexto necessário

- O trabalho feito e a pendência que o pedia.
- O contrato de convivência (degrau 1), que já proíbe anunciar o não feito.

## 2. Prompts

**Rotina (vai no contrato de convivência; aplica-se a todo relatório):**

> When you report, separate three blocks: VERIFIED (what you tested, with the command and its
> output), BELIEVED (what you think works but did not test, and why not), and BLIND SPOTS (what
> you cannot see from where you are: another environment, real data, the user's browser). Cover
> every item I asked for, one by one, even when the answer is "I did not do it". No claim
> without its proof next to it. Do not say "done": say what is done and how you know it. If
> something went wrong, say it first. Reply in my language.

O que estamos pedindo, cláusula por cláusula: os três blocos, que são a estrutura que torna honesto
um relatório (o verificado com sua prova, o acreditado com a razão de não ter sido provado, o que
não se pode ver); a cobertura item por item, para que nada "se esqueça"; a prova ao lado de cada
afirmação; a proibição do "pronto" seco; e as más notícias primeiro, porque o modelo tende a
deixá-las para o final ou para nunca.

**Diante de um "continua quebrado" do dono:**

> Before diagnosing again, compare the version running where I see the problem with the version
> that contains your fix. Tell me both. If they differ, the problem is publication, not code.

O que estamos pedindo: que diante de "continua quebrado" não volte a diagnosticar do zero mas
primeiro compare versões. Metade dos "continua quebrado" são correções que estão no repositório mas
não no lugar onde o dono olha.

## 3. Resultado esperado

Cada relatório do agente com:

- Os três blocos (verificado / acreditado / pontos cegos), ainda que algum esteja vazio.
- Uma linha por item do pedido, com seu estado.
- Para cada "verificado": o comando e a saída, ou o teste e seu resultado, ou o número e seu
  medidor.
- O que deu errado, no começo e não no final.

## 4. Verificação de completude

- Os três blocos estão lá? Se "acreditado" e "pontos cegos" estão sempre vazios, o agente não está
  sendo honesto: sempre há algo que não viu.
- Escolha uma afirmação do bloco "verificado" ao acaso: tem sua prova ao lado? Você consegue
  reproduzi-la?
- Cobre cada item do que você pediu, ou há algum que "se esqueceu"?
- As más notícias estão no começo?
- Alguma vez disse "pronto" seco? É uma violação do contrato.

## 5. Sinais de alerta

- Dez relatórios seguidos sem nenhum ponto cego. Ninguém vê tudo; o bloco está vazio por costume,
  não por verdade.
- O bloco "verificado" contém frases como "deveria funcionar". Isso é "acreditado" disfarçado.
- O relatório é mais longo do que a mudança. Um relatório proporcional diz o que precisa dizer; um
  inflado está tapando algo com volume.
