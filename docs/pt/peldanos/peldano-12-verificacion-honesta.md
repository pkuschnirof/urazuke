# Passo 12 — Verificação honesta e relatório proporcional (contrato do degrau)

**Fase:** ciclo.
**Quando:** em cada relatório, de cada pendência, durante todo o projeto. É a forma que tem que
ter tudo o que o agente lhe diz.
**Forma:** rotina; é a forma que cada relatório do agente deve ter.
**Tamanho:** obrigatório em todo projeto, sem exceções. Não custa nada e é o que permite ao dono
não ler código.

## Para que serve

Se você não vai ler código, o relatório do agente tem que ser confiável. Não otimista, não
"completo na aparência": confiável. Isto é o genuinamente novo do método: o autor do código
fabrica também a evidência, e faz isso com a mesma segurança na voz quando está certo e quando
está errado. Por isso a evidência tem que provar a si mesma, e o relatório tem que separar o
verificado do acreditado. A regra, eu a escrevi em junho [Ref. 8](../REFERENCIAS.md#ref-8), e
voltei a precisar dela em outubro, quando um erro de autenticação foi relatado com a legenda
"success" [Ref. 43](../REFERENCIAS.md#ref-43).

Entenda por que o modelo tende a relatar de mais. Não é má-fé: é que foi treinado para ser útil
e completo, e um relatório que diz "isto não consegui verificar" parece menos útil do que um que
diz "pronto". Então **peça explicitamente** as más notícias, os pontos cegos e o que ele não fez.
Se você não pede, ele não dá, não porque esconda mas porque não considera isso parte da resposta.

## 1. Contexto necessário

O que segue é a lista genérica. Os arquivos concretos que você tem que ter prontos antes de cada
prompt, com seu conteúdo e seu estado mínimo, estão na seção 2, no bloco "Antes de enviar o
prompt" que precede cada um.

- O trabalho feito e a pendência que o pedia.
- O contrato de convivência (degrau 1), que já proíbe anunciar o não feito.

## 2. Prompts

**Rotina (vai no contrato de convivência; aplica-se em cada relatório):**

**Antes de enviar o prompt**, isto tem que existir, e quem faz é você (ou o negócio com você), não
o agente:

- `docs/WORKING_AGREEMENT.md` (degrau 1), onde vai a rotina.
- A lista do que você pediu na sessão, escrita por você (os itens do pedido), para contrastar o
  relatório: o prompt pede que ele cubra cada item um por um, e você tem que saber quantos eram.
- Estado mínimo aceitável: nada mais. Esta rotina se cola uma vez e vale para sempre.

> When you report, separate three blocks: VERIFIED (what you tested, with the command and its
> output), BELIEVED (what you think works but did not test, and why not), and BLIND SPOTS (what
> you cannot see from where you are: another environment, real data, the user's browser). Cover
> every item I asked for, one by one, even when the answer is "I did not do it". No claim
> without its proof next to it. Do not say "done": say what is done and how you know it. If
> something went wrong, say it first. Reply in my language.

> [pt]
> Quando relatar, separe três blocos: VERIFICADO (o que você testou, com o comando e sua saída),
> ACREDITADO (o que você acha que funciona mas não testou, e por que não), e PONTOS CEGOS (o que
> você não consegue ver de onde está: outro ambiente, dados reais, o navegador do usuário). Cubra
> cada item que eu pedi, um por um, mesmo quando a resposta for "não fiz". Nenhuma afirmação sem
> sua prova ao lado. Não diga "pronto": diga o que está feito e como você sabe. Se algo deu
> errado, diga primeiro. Responda no meu idioma.

O que estou pedindo, cláusula por cláusula: os três blocos, que são a estrutura que torna honesto
um relatório (o verificado com sua prova, o acreditado com a razão de por que não foi testado, o
que ele não consegue ver); a cobertura item por item, para que nada "seja esquecido"; a prova ao
lado de cada afirmação; a proibição do "pronto" seco; e as más notícias primeiro, porque o modelo
tende a deixá-las para o final ou para nunca.

**Diante de um "continua quebrado" seu:**

**Antes de enviar o prompt**, você tem que ter isto à mão:

- A sua verificação, feita no lugar onde você olha (o ambiente de teste, o seu navegador), com o
  que viu anotado: em que URL, que versão o sistema mostra se é que mostra, o que você fez, o que
  esperava, o que aconteceu.
- O número de versão ou o commit que o agente disse que continha a correção, copiado do relatório
  anterior dele.
- Estado mínimo aceitável: você consegue dizer "olho em [URL], vejo a versão [N], faço [isto],
  acontece [isto]". Sem isso, o "continua quebrado" é uma impressão, e o agente vai diagnosticar
  uma impressão.

> Before diagnosing again, compare the version running where I see the problem with the version
> that contains your fix. Tell me both. If they differ, the problem is publication, not code.

> [pt]
> Antes de diagnosticar de novo, compare a versão que roda onde eu vejo o problema com a versão
> que contém a sua correção. Diga-me as duas. Se são diferentes, o problema é de publicação, não
> de código.

O que estou pedindo: que diante de um "continua quebrado" ele não volte a diagnosticar do zero
mas primeiro compare versões. Metade dos "continua quebrado" são correções que estão no
repositório mas não no lugar onde você olha [Ref. 45](../REFERENCIAS.md#ref-45).

## 3. Resultado esperado

Cada relatório do agente com:

- Os três blocos (verificado / acreditado / pontos cegos), mesmo que algum esteja vazio.
- Uma linha por cada item pedido, com seu estado.
- Para cada "verificado": o comando e a saída, ou o teste e seu resultado, ou o número e seu
  medidor.
- O que deu errado, no começo e não no final.

## 4. Verificação de completude

- Estão os três blocos? Se "acreditado" e "pontos cegos" estão sempre vazios, o agente não está
  sendo honesto: sempre há algo que ele não viu.
- Escolha ao acaso uma afirmação do bloco "verificado": tem sua prova ao lado? Você consegue
  reproduzi-la?
- Cobre cada item do que você pediu, ou há um que "foi esquecido"?
- As más notícias estão no começo?
- Disse "pronto" seco alguma vez? É uma violação do contrato.

## 5. Sinais de alerta

- Dez relatórios seguidos sem nenhum ponto cego. Ninguém vê tudo; o bloco está vazio por costume,
  não por verdade.
- O bloco "verificado" tem frases como "deveria funcionar". É "acreditado" disfarçado.
- O relatório é mais longo do que a mudança. Um relatório proporcional diz o que há que dizer; um
  inflado está tapando algo com volume.
