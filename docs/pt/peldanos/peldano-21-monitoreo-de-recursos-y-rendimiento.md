# Passo 21 — Monitoramento de recursos, funções e consultas fora de faixa, com relatório cíclico (contrato do degrau)

**Fase:** operação.
**Quando:** monta-se na fase de operação, com a primeira implantação em produção, com os
limiares do 19 e as métricas do 16; a partir daí, roda sozinho, e o relatório cíclico se lê com o
dono em cada ciclo (semanal num sistema com consequências, mensal num pequeno). Cada
evento fora de faixa entra no ciclo como pendência corretiva. Num legado, igual, com uma
diferença: a primeira leitura do relatório é a linha base, e o que já estava fora de faixa no
primeiro dia se converte em pendências com a sua marca de velocidade.
**Forma:** um único disparo para montar; depois, rotina cíclica.
**Tamanho:** mínimo num projeto pequeno (um relatório mensal, um alerta de disco e um de erros de
banco); completo num com consequências (limiares por função e por consulta, alertas, relatório
semanal).

## Para que serve

Os testes do degrau 19 dizem como se comporta o sistema um dia, com uma carga que eu escolhi. A
produção é todos os dias, com a carga que os usuários escolhem, com os dados crescendo, e com
mudanças que entram toda semana. O que estava em faixa em outubro sai de faixa em março sem que
ninguém mude nada, só porque a tabela cresceu. Este degrau existe para que isso se veja **antes
que o usuário o veja**: o uso de recursos contra a capacidade, o tempo de resposta de cada
função, cada ponto de entrada, cada tarefa e cada consulta, comparado com os limiares do 19 e com
a sua própria história; um alerta quando algo sai de faixa; e um relatório cíclico que eu leio
com o dono, onde cada desvio tem uma causa ou uma pendência. O teto apertado ao medido
[Ref. 37](../REFERENCIAS.md#ref-37) é a ideia de fundo: a faixa não é uma opinião, é o número medido
mais uma margem; e a cota de integração contínua que se esgotou sem que ninguém olhasse
[Ref. 39](../REFERENCIAS.md#ref-39) é a falha que ele evita: um recurso que se consome sem
monitoramento se descobre quando acaba.

Duas regras que não negocio. Um alerta que dispara e ninguém lê é um defeito do alerta, não de
quem não o leu: ajusta-se ou elimina-se. E um limiar não se sobe para calar um alerta sem uma
razão medida escrita.

**Se você está começando.** *Monitorar* é olhar o sistema o tempo todo por máquina e avisar
quando algo sai do normal. Os *recursos* são o que o sistema consome: processador, memória,
disco, conexões ao banco, e também cotas de serviços externos (quantas mensagens por mês o
provedor deixa você mandar). "*Fora de faixa*" quer dizer acima de um *limiar* (um limite fixo,
que saiu dos testes do degrau 19) ou muito diferente da *linha base* (o que esse mesmo número
vinha dando nos últimos dias). Um *alerta* é o aviso na hora; o *relatório cíclico* é o resumo
que se lê a cada semana ou a cada mês com calma.

## 1. Contexto necessário

O que segue é a lista genérica. Os arquivos concretos que você tem que ter prontos antes de cada
prompt, com seu conteúdo e seu estado mínimo, estão na seção 2, no bloco "Antes de enviar o
prompt" que precede cada um.

- A observabilidade (16): as métricas e os registros dos quais ele se alimenta.
- Os limiares do 19 e os orçamentos do 17.
- Produção implantada (15), com acesso de somente leitura para o monitoramento.
- O canal de alertas e o ciclo do relatório: você os decide com o dono.

## 2. Prompts

**Inicial (montar e demonstrar):**

**Antes de enviar o prompt**, isto tem que existir, e quem faz é você (ou o negócio com você), não
o agente:

- `docs/OBSERVABILITY.md` (16) e `docs/PERFORMANCE.md` (19) fechados: as métricas e os limiares.
- `docs/PERSISTENCE.md` (17) com os orçamentos por caminho.
- O canal de alertas, decidido com o dono: a quem chega, por onde (e-mail, mensageria), e quem o
  lê a que hora. Um alerta que chega a uma caixa que ninguém abre é decoração.
- O ciclo do relatório: semanal ou mensal, e quem o lê com você.
- Acesso de somente leitura do monitoramento à produção (o servidor, o banco, os registros), com
  a credencial fora do chat.
- A porcentagem de desvio sobre a linha base que você considera alarme (por exemplo, 30 % a mais
  que a média dos últimos catorze dias), para o vazio do prompt.
- Estado mínimo aceitável: há limiares escritos, um canal com uma pessoa que o lê, e um ciclo.

> We are going to keep this system watched in production. Using the metrics and logs of step 16,
> the budgets of `docs/PERSISTENCE.md` and the thresholds of `docs/PERFORMANCE.md`, set up: (1)
> collection of resource usage (CPU, memory, disk, database connections, queue sizes, external
> quotas) and of the response time of every function, endpoint, job and query, with the
> correlation id, kept with a history; (2) alerts when any of them is out of range: above the
> thresholds, or more than [X] percent over the baseline of the last [N] days, sent to [channel],
> with the rule that an alert that fires without a human reading it is a defect of the alert and
> gets fixed or removed; (3) a cyclic report, [weekly], generated automatically, with: resource
> usage against capacity and its trend, the slowest functions and queries and how they moved
> against the previous period, every out-of-range event with its cause if known, and what you
> propose for each; (4) the rule that every out-of-range event becomes a corrective pending item
> with the measured number as its acceptance criterion, closed with the full routine. Nothing
> here may read or store personal data. Show me the first report generated on real data from the
> test environment, and one alert fired on purpose by exceeding a threshold. Document the
> thresholds, the channel, the cycle and how to silence an alert with a written reason in
> `docs/MONITORING.md`. Reply in my language.

> [pt]
> Vamos manter este sistema vigiado em produção. Com as métricas e os registros do degrau 16, os
> orçamentos de `docs/PERSISTENCE.md` e os limiares de `docs/PERFORMANCE.md`, monte: (1) a coleta
> do uso de recursos (CPU, memória, disco, conexões ao banco, tamanho das filas, cotas externas)
> e do tempo de resposta de cada função, ponto de entrada, tarefa e consulta, com o identificador
> de correlação, guardado com história; (2) alertas quando qualquer um deles sair de faixa: acima
> dos limiares, ou mais de [X] por cento sobre a linha base dos últimos [N] dias, enviados para
> [canal], com a regra de que um alerta que dispara sem que um humano o leia é um defeito do
> alerta e se corrige ou se elimina; (3) um relatório cíclico, [semanal], gerado automaticamente,
> com: uso de recursos contra capacidade e a sua tendência, as funções e consultas mais lentas e
> como se moveram em relação ao período anterior, cada evento fora de faixa com a sua causa se
> for conhecida, e o que você propõe para cada um; (4) a regra de que cada evento fora de faixa
> se converte numa pendência corretiva com o número medido como critério de aceitação, fechada
> com a rotina completa. Nada disto pode ler nem guardar dados pessoais. Mostre-me o primeiro
> relatório gerado com dados reais do ambiente de teste, e um alerta disparado de propósito
> ultrapassando um limiar. Documente os limiares, o canal, o ciclo e como silenciar um alerta com
> uma razão escrita em `docs/MONITORING.md`. Responda no meu idioma.

O que estou pedindo: coleta com história (sem história não há linha base, e sem linha base não há
"fora de faixa"); alertas contra duas referências, o limiar absoluto do 19 e o desvio relativo
sobre a própria história; o relatório cíclico com a forma de um relatório do degrau 12 (cada
desvio com causa ou com proposta, nada de "tudo normal"); a conversão de cada desvio em pendência
com número; e as duas demonstrações: o primeiro relatório e um alerta provocado.

**Rotina de cada ciclo (vai no contrato de convivência):**

**Antes de enviar o prompt**, você tem que ter isto à mão:

- O relatório cíclico recém-gerado, e um tempo seu com o dono para lê-lo.
- `docs/MONITORING.md` à mão, para comparar os limiares.
- Estado mínimo aceitável: você leu o relatório antes de colar o prompt; o agente não o lê por
  você.

> With every cyclic report of resources and performance: go through it with me, event by event;
> tell me which out-of-range events become pending items now and which can wait, with your
> reason; write the decision with the date in the report itself; and tell me whether any threshold
> must change and why, with the measurement that justifies it. Never raise a threshold to silence
> an alert without a measured reason written down.

> [pt]
> Com cada relatório cíclico de recursos e desempenho: percorra-o comigo, evento por evento;
> diga-me que eventos fora de faixa se convertem em pendências agora e quais podem esperar, com a
> sua razão; escreva a decisão com a data no próprio relatório; e diga-me se algum limiar tem que
> mudar e por quê, com a medição que o justifica. Nunca suba um limiar para calar um alerta sem
> uma razão medida escrita.

O que estou pedindo: que o relatório se leia e se decida, com rastro; e a regra do limiar, que é
a que evita que o monitoramento vá ficando silencioso aos poucos.

## 3. Resultado esperado

- Coleta de recursos e tempos de resposta com história, sem dados pessoais.
- Alertas por limiar e por desvio, para um canal que uma pessoa lê.
- O relatório cíclico, gerado sozinho, com cada desvio causado ou proposto.
- `docs/MONITORING.md` com limiares, canal, ciclo e como silenciar com razão.
- A rotina no contrato; os desvios como pendências corretivas.

## 4. Verificação de completude

- Peça que se ultrapasse um limiar de propósito em teste: o alerta chegou até você, pelo canal
  combinado, com o identificador?
- Leia o último relatório: cada evento fora de faixa tem causa ou proposta? Algum ficou sem nada?
- Há uma pendência para cada desvio que você decidiu atender, com o número como critério?
- Algum limiar subiu desde o 19? Com que razão escrita?
- O relatório menciona a cota dos serviços externos (mensageria, integração contínua)?

## 5. Sinais de alerta

- Os alertas disparam todos os dias e ninguém os lê. É preciso baixar a sua quantidade até que
  cada um signifique alguma coisa, não se acostumar.
- O relatório diz "tudo normal" três ciclos seguidos. Ou o sistema não tem usuários, ou o
  relatório não olha o que importa.
- Um limiar subiu "para que pare de avisar". É o degrau 21 morrendo em silêncio.
- O monitoramento guarda dados pessoais "para poder diagnosticar". É um vazamento com horário.
