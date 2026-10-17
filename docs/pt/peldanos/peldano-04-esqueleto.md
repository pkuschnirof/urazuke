# Passo 4 — O esqueleto com suas comportas (contrato do degrau)

**Fase:** arranque (uma vez).
**Forma:** um disparo longo, com aprovação visual do dono no final.
**Tamanho:** obrigatório em todo projeto que vá ter usuários. Num protótipo descartável pode ser
pulado; mas se o protótipo sobrevive (sempre sobrevivem), este degrau é a primeira coisa a pagar.

## Para que serve

Para que o sistema arranque, seja testado e implantado VAZIO antes de ter funcionalidade.
Descobrir a implantação no final é caríssimo: no Kikan chegou um mês depois do início e custou cinco
pendências seguidas. Se o esqueleto é implantado na primeira semana, esses golpes caem com zero
funcionalidade em jogo.

A ideia geral por trás: **o caminho até a produção faz parte do produto**, não é um trâmite do
final. Um sistema que funciona na máquina do programador e não pode ser implantado não é um
sistema; é uma demo. E a única forma de saber que o caminho funciona é percorrê-lo quando ainda não
há nada a perder.

## 1. Contexto necessário

- `docs/SIZING.md` (degrau 3): a opção escolhida define o esqueleto.
- Levantamento de ambientes: onde vai rodar (nuvem, servidor próprio), se há um ambiente de teste e
  um de produção, quem tem acesso, como se implanta hoje se há algo.
- O tipo de projeto: novo (greenfield), correção ou evolução de algo existente.

## 2. Prompts

**Inicial:**

> We are going to build the skeleton of the system, with no functionality at all. Read
> `PROJECT.md`, `docs/SIZING.md` and the environments survey. Evaluate whether you have what is
> needed for the skeleton to run in the test environment (access, URL, deployment method); if
> anything is missing, ask me before starting. Then build: the folder structure; the server and
> the UI starting up; the test structure with one smoke test that passes; continuous
> integration running that test suite on every push; and the deployment to the test
> environment. Declare the gates of the workflow (what must be green to move from one stage to
> the next) in `docs/GATES.md`. When done, take a screenshot of the empty UI running in the
> test environment and show it to me. Do not add any functionality "while you are at it".
> Reply in my language.

O que estamos pedindo: que verifique que tem os acessos antes de começar (sem isso o esqueleto fica
na máquina do agente); a lista exata do que é um esqueleto (estrutura, arranque, um teste,
integração contínua, implantação em teste); as comportas escritas; uma captura real do ambiente de
teste, que é a única evidência válida de que foi implantado; e a proibição explícita de adicionar
funcionalidade, porque o modelo tende ao "já que estou aqui" e isso quebra o escopo exato.

**De fechamento:**

> Skeleton approved. Record in `docs/STATUS.md` the test environment URL, the command to run
> the tests and the command to deploy, and mark this step as done. Then run the deployment a
> second time and show me that the second run changed nothing.

O que estamos pedindo: deixar os três comandos onde a próxima sessão os encontre, e provar que a
implantação é repetível (rodá-la duas vezes sem quebrar nada). Essa segunda rodada é a prova de que
o procedimento é um procedimento e não sorte.

## 3. Resultado esperado

- O repositório com a estrutura, o servidor e a tela arrancando.
- Um teste de fumaça em verde e a bateria rodando em integração contínua (com o link para a
  execução em verde).
- A implantação no ambiente de teste funcionando, com a URL, e executada duas vezes.
- `docs/GATES.md`: a lista de comportas, cada uma com a condição para passar.
- Uma captura de tela do sistema vazio rodando no ambiente de teste.
- `docs/STATUS.md` atualizado com os três comandos (rodar, testar, implantar).

## 4. Verificação de completude

- Você consegue abrir a URL do ambiente de teste e ver a tela vazia? (Você faz isso, não o agente.)
- Há um link para uma execução de integração contínua em verde?
- A implantação foi executada duas vezes e a segunda não quebrou nada?
- As comportas estão escritas com uma condição verificável cada?
- Há alguma funcionalidade que você não pediu? Se houver, o agente violou o escopo exato.

## 5. Sinais de alerta

- O esqueleto "funciona local" mas a implantação "vemos depois". Não: a implantação é o esqueleto.
- A captura de tela é da máquina do agente, não do ambiente de teste. Peça a URL.
- As comportas dizem coisas como "o código tem boa qualidade". Uma comporta é uma condição
  verificável: "a bateria está em verde", "a implantação em teste funcionou".
