# Passo 19 — Testes de desempenho em volume e ponto de ruptura (contrato do degrau)

**Fase:** qualidade operacional, antes da primeira implantação em produção.
**Quando:** na fase de saída para produção, depois do 16 (sem observabilidade não se sabe o que
quebrou) e do 17 (sobre a persistência já otimizada), e antes da primeira implantação em
produção. Repete-se antes de cada implantação que mude a arquitetura, a persistência ou um fluxo
crítico, e quando o dimensionamento muda (vende-se a outro cliente, dobra-se o volume). Num
legado, roda-se com os volumes medidos em N6, antes da primeira implantação posterior à
normalização.
**Forma:** um único disparo; o agente carrega, mede e quebra; você lê os números e o ponto de
ruptura.
**Tamanho:** proporcional: num projeto pequeno, uma rodada ao volume esperado e uma ao "vezes
dez"; num com consequências, completo, com o ponto de ruptura encontrado e os limiares
registrados para o monitoramento.

## Para que serve

O degrau 3 dimensionou com contas; este degrau comprova as contas com o sistema real rodando.
Quero saber três coisas antes de entrar o primeiro usuário: como se comporta o sistema ao volume
que o negócio disse (a tela mais usada responde no que o dono toleraria?), como se comporta no
"vezes dez" (aguenta, ou o que deixa de aguentar primeiro?), e **onde quebra**: a carga exata em
que algo cede, e o que é esse algo (as conexões ao banco, a memória, uma fila, um bloqueio). O
ponto de ruptura é o número mais útil de toda a fase, porque dele saem os limiares de alerta do
degrau 20: um alerta posto "a olho" avisa tarde ou avisa sempre; um alerta posto abaixo do ponto
de ruptura medido, com uma margem, avisa quando ainda há tempo. Os padrões de escala que tirei de
um sistema em produção [Ref. 12](../REFERENCIAS.md#ref-12) e a bateria que morria por memória e
parecia um teste falho [Ref. 44](../REFERENCIAS.md#ref-44) são os dois antecedentes: o primeiro, de
medir a carga real; o segundo, de que um ponto de ruptura não encontrado a tempo se disfarça de
outra coisa.

**Se você está começando.** Um *teste de carga* é um programa que simula muitos usuários usando o
sistema ao mesmo tempo, para ver o que acontece. *Vazão* (throughput) é quantas ações por segundo
ele aguenta. *Latência* é quanto uma ação demora para responder; olha-se a *mediana* (a metade
das ações demorou menos que isto) e o *percentil 95* (95 % demorou menos que isto; os 5 %
restantes são os usuários que reclamam). O *ponto de ruptura* é a quantidade de carga em que algo
deixa de funcionar: não "fica lento" e sim "as conexões ao banco se esgotaram" ou "a memória
encheu". E um *limiar* é um número limite a partir do qual o monitoramento avisa.

## 1. Contexto necessário

O que segue é a lista genérica. Os arquivos concretos que você tem que ter prontos antes de cada
prompt, com seu conteúdo e seu estado mínimo, estão na seção 2, no bloco "Antes de enviar o
prompt" que precede cada um.

- O dimensionamento (degrau 3 ou N6): o volume esperado e o "vezes dez".
- A observabilidade (16) acesa, para ver o que quebra.
- A persistência otimizada (17) com os seus orçamentos.
- Um ambiente de teste parecido com produção em recursos, ou a consciência de em que difere.
- Os fluxos críticos (os da árvore semântica, ou os da caracterização num legado).

## 2. Prompts

**Inicial (carregar, medir, quebrar):**

**Antes de enviar o prompt**, isto tem que existir, e quem faz é você (ou o negócio com você), não
o agente:

- `docs/SIZING.md` com o volume esperado (usuários concorrentes no pico, eventos por hora, linhas
  por tabela) e o "vezes dez": são os dois degraus de carga.
- A lista de fluxos críticos para o vazio do prompt, escrita por você a partir da árvore
  semântica: os que mais se usam e os que têm consequência. Entre três e seis.
- Um ambiente de teste com recursos comparáveis aos de produção, ou, se não for possível, anotado
  em `docs/ENVIRONMENTS_SURVEY.md` em que difere (metade da memória, outro motor), para que os
  números se leiam com essa correção.
- Dados ao volume esperado no ambiente de teste (o mesmo script do degrau 17).
- A sua tolerância, com o dono: quanto pode demorar a tela mais usada para que o negócio o
  considere aceitável (dois segundos, cinco). Sem esse número, os resultados não se podem julgar.
- Estado mínimo aceitável: você sabe os dois degraus de carga, os fluxos críticos e a tolerância.

> We are going to find out how this system behaves at the volumes of `docs/SIZING.md`, and where
> it breaks. In the test environment, with the observability of step 16 on and the data loaded at
> the expected volume: (1) write a load script that lives in the repository and drives the
> critical flows [list] from the screen or the API as users would, with a configurable number of
> concurrent users and duration, and with a test that proves the script really exercises each
> flow (the backend effect appears); (2) run it at the expected volume and show me, per flow:
> throughput, median and 95th percentile latency, error rate, and the resource usage of the
> server and the database during the run; (3) run it at ten times the expected volume and show me
> the same; (4) raise the load step by step until something breaks, and tell me exactly what
> broke first (database connections, memory, a queue, a lock, the disk) and at which load: that
> is the breaking point; (5) compare every number with the budgets of `docs/PERSISTENCE.md`, with
> the tolerance I gave you ([tolerance] for the most used screen) and with the sizing assumptions,
> and tell me which assumption was wrong, if any. Do not optimize anything yet. Write
> `docs/PERFORMANCE_[date].md` with the numbers, the commands, the breaking point and your
> diagnosis of the first bottleneck. Reply in my language.

> [pt]
> Vamos descobrir como este sistema se comporta aos volumes de `docs/SIZING.md`, e onde ele
> quebra. No ambiente de teste, com a observabilidade do degrau 16 acesa e os dados carregados ao
> volume esperado: (1) escreva um script de carga que viva no repositório e opere os fluxos
> críticos [lista] a partir da tela ou da API como os usuários fariam, com uma quantidade de
> usuários concorrentes e uma duração configuráveis, e com um teste que prove que o script de
> fato exercita cada fluxo (o efeito no backend aparece); (2) rode-o ao volume esperado e
> mostre-me, por fluxo: vazão, latência mediana e percentil 95, taxa de erro, e o uso de recursos
> do servidor e do banco durante a rodada; (3) rode-o a dez vezes o volume esperado e mostre-me o
> mesmo; (4) suba a carga degrau por degrau até que algo quebre, e diga-me exatamente o que
> quebrou primeiro (conexões ao banco, memória, uma fila, um bloqueio, o disco) e a que carga:
> esse é o ponto de ruptura; (5) compare cada número com os orçamentos de `docs/PERSISTENCE.md`,
> com a tolerância que lhe dei ([tolerância] para a tela mais usada) e com os pressupostos do
> dimensionamento, e diga-me que pressuposto estava errado, se algum. Não otimize nada ainda.
> Escreva `docs/PERFORMANCE_[data].md` com os números, os comandos, o ponto de ruptura e o seu
> diagnóstico do primeiro gargalo. Responda no meu idioma.

O que estou pedindo: um script de carga que é mais um medidor (vive no repositório e tem teste,
porque um script de carga que não exercita o fluxo mede o ar); três rodadas (esperado, vezes dez,
até quebrar); os números com comandos; a comparação com os orçamentos, a tolerância do negócio e
os pressupostos do dimensionamento, que é onde se descobre que o degrau 3 errou em alguma coisa;
e **nada de otimizar ainda**, porque otimizar sem ler o diagnóstico é mudar o que não era.

**De fechamento (limiares e pendências):**

**Antes de enviar o prompt**, você tem que ter isto à mão:

- `docs/PERFORMANCE_[data].md` lido por você, com a tolerância do negócio ao lado: a tela mais
  usada entra no tolerável ao volume esperado? E no "vezes dez"?
- Com o dono, a decisão sobre o "vezes dez": se o negócio planeja crescer, os gargalos abaixo do
  "vezes dez" são pendências agora; se não, podem esperar, com data.
- Estado mínimo aceitável: você leu o ponto de ruptura e decidiu que gargalos se corrigem agora.

> Record in `docs/PERFORMANCE.md`: the expected volume, the ten-times volume, the breaking point
> with what breaks, and the alert thresholds that monitoring (step 20) will use, set below the
> breaking point with a margin and above the expected volume. Open a pending item for each
> bottleneck that sits below [ten times the expected volume / the volume I decided], with the
> measured number as its acceptance criterion. Make the load test a gate in `docs/GATES.md`: it
> reruns before every deployment that changes the architecture, the persistence or a critical
> flow, and its results are archived with date and version. Show me the first run archived.

> [pt]
> Registre em `docs/PERFORMANCE.md`: o volume esperado, o volume vezes dez, o ponto de ruptura
> com o que quebra, e os limiares de alerta que o monitoramento (degrau 20) vai usar, fixados
> abaixo do ponto de ruptura com uma margem e acima do volume esperado. Abra uma pendência para
> cada gargalo que fique abaixo de [dez vezes o volume esperado / o volume que decidi], com o
> número medido como critério de aceitação. Faça do teste de carga uma comporta em
> `docs/GATES.md`: volta a rodar antes de cada implantação que mude a arquitetura, a persistência
> ou um fluxo crítico, e os seus resultados se arquivam com data e versão. Mostre-me a primeira
> rodada arquivada.

O que estou pedindo: os limiares de alerta derivados do ponto de ruptura, que é o encaixe com o
degrau 20; os gargalos como pendências com o número como critério (assim se fecham com evidência
e não com "agora anda melhor"); e o teste de carga como comporta arquivada, para que dentro de
seis meses se possa comparar.

## 3. Resultado esperado

- O script de carga no repositório, com teste.
- `docs/PERFORMANCE_[data].md` com as três rodadas, os números, o ponto de ruptura e o
  diagnóstico; `docs/PERFORMANCE.md` com os limiares e a comporta.
- Uma pendência por gargalo abaixo do volume decidido.
- O teste de carga como comporta antes das implantações que o exigem.

## 4. Verificação de completude

- A tela mais usada, ao volume esperado, demora menos que a tolerância do dono? Se não, há uma
  pendência aberta com esse número.
- O ponto de ruptura diz o que quebrou e a que carga, ou diz "o sistema ficou lento"?
- Os limiares de `docs/PERFORMANCE.md` estão abaixo do ponto de ruptura e acima do esperado?
- Rode você o script ao volume esperado com o comando que ele lhe deu: os números se parecem?
- O ambiente de teste difere de produção em recursos, e está anotado como?

## 5. Sinais de alerta

- "Aguenta o vezes dez sem problemas" sem um ponto de ruptura. Se não encontrou onde quebra, não
  subiu a carga o suficiente.
- O script de carga bate na API mas não passa pela tela, num sistema em que a tela é a que
  carrega. Mede outra coisa.
- Os resultados são de uma rodada na máquina do agente, não no ambiente de teste.
- Corrigiram-se gargalos durante o teste, "já que estava". Agora você não sabe que número
  corresponde a que versão.
