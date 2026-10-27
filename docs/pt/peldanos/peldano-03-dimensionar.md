# Passo 3 — Dimensionar antes de desenhar a arquitetura (contrato do degrau)

**Fase:** arranque.
**Quando:** uma vez, depois da definição e antes de montar o esqueleto;
refaz-se se o negócio muda de escala.
**Forma:** conversa: o agente calcula e apresenta opções; você escolhe.
**Tamanho:** obrigatório sempre, mas proporcional: num projeto pequeno o dimensionamento pode ser
meia página e uma única decisão ("cabe em SQLite durante anos"). O que não pode é não ser feito,
porque a pergunta "quanto vai crescer?" custa cinco minutos e a resposta errada custa semanas.

## Para que serve

Tome as decisões estruturais — que motor de banco de dados, se a interface é síncrona ou
assíncrona, quanta concorrência — com números e não com gosto. É o degrau que mais caro custa
pular, e digo com conhecimento de causa: num dos meus sistemas comecei com arquivos JSON e quando
medi resultou que ia gerar 3,4 milhões de linhas por ano; mudar a interface depois custou uma
etapa inteira de reengenharia [Ref. 15](../REFERENCIAS.md#ref-15).

Há um ponto-chave que vale a pena ter presente: **há dados que só o negócio tem** (quantas
entidades, quantos eventos por entidade, quantos operadores no pico, quanto tempo há que
conservar) e o modelo não pode inferi-los. O que ele pode inferir é o derivado. Por isso o prompt
exige que ele avalie se os dados primários estão completos e peça os que faltam, em vez de
estimá-los com cara de quem tem certeza. Quem sabe o que lhe falta para calcular é o modelo, não
um formulário.

E uma segunda ideia que quero que você leve: as **decisões assimétricas**. Há decisões que custam
muito pouco se você as toma e resultam desnecessárias, e muitíssimo se não as toma e resultam
necessárias. A interface de persistência assíncrona desde a linha um é o exemplo canônico: se o
motor acaba sendo síncrono, sobrou um `await`; se acaba sendo assíncrono e você não previu, há
que reescrever tudo. Essas decisões, tome-as sempre que forem baratas, mesmo que hoje não sejam
necessárias.

## 1. Contexto necessário

O que segue é a lista genérica. Os arquivos concretos que você tem que ter prontos antes de cada
prompt, com seu conteúdo e seu estado mínimo, estão na seção 2, no bloco "Antes de enviar o
prompt" que precede cada um.

- **Levantamento de dados de volumetria** do negócio, nomeado assim de forma genérica: entidades
  principais e seu crescimento, eventos por entidade, operadores simultâneos e horário do pico,
  tempo de conservação dos dados, cargas excepcionais (campanhas, fechamentos), crescimento
  esperado. O levantamento é por natureza incompleto; o agente avalia e pede.
- Se há um sistema anterior: acesso de leitura ao seu banco para tirar números reais em vez de
  estimados.
- `PROJECT.md` e a árvore semântica (degrau 2): as entidades da árvore são as que há que
  dimensionar.

## 2. Prompts

**Inicial:**

**Antes de enviar o prompt**, isto tem que existir, e quem faz é você (ou o negócio com você), não
o agente:

- `docs/VOLUME_SURVEY.md`: o levantamento de volumetria, escrito com o dono do domínio (ou com
  você mesmo, se o projeto é seu). Para cada entidade principal da árvore semântica: quantas há
  hoje, quantas se acrescentam por mês, quantos eventos cada uma gera (uma consulta gera três
  mensagens; uma autorização gera tantas consultas ao banco); quantas pessoas operam no pico e a
  que hora é o pico; quanto tempo os dados são conservados; que cargas excepcionais há (campanhas,
  fechamentos de mês, a segunda-feira depois de um feriado); que crescimento esperam e se o
  sistema poderia ser vendido a outros. E o mais importante: para cada número, de onde sai ("disse
  a encarregada", "contado no caderno de setembro", "suposto"). Os supostos se marcam como
  supostos; não se disfarçam de dado.
- `PROJECT.md` e `docs/SEMANTIC_TREE.md` (degrau 2), fechados: as entidades que há que dimensionar
  são as da árvore.
- Se há um sistema anterior com banco de dados: um acesso de somente leitura para que o agente
  tire números reais em vez de estimados, com a string de conexão guardada fora do repositório e o
  nome da variável anotado no levantamento.
- Estado mínimo aceitável: toda entidade da árvore tem pelo menos um número com sua fonte, mesmo
  que vários digam "suposto". O agente vai lhe pedir os supostos; esse pedido é o degrau
  funcionando.

> Before proposing any architecture we are going to size the system. Read `PROJECT.md` and the
> volume survey in `docs/VOLUME_SURVEY.md`. Distinguish primary data (facts only the business
> knows) from derived data (what can be computed from the primary data). Evaluate whether the
> primary data is complete enough to compute what follows; if any primary figure is missing, or
> is marked as an assumption, ask me for all the missing figures before going on. Never estimate
> a primary figure. If a previous system can be queried, use its real numbers and state where
> each came from. With the primary data complete, compute, showing the arithmetic: rows per year
> for the three largest tables, peak concurrency, data size at five years, and what breaks first
> if everything is multiplied by ten. Then present three options for persistence and concurrency,
> each with the cost of migrating to the others later. Do not choose: I choose. Do not write code.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [pt]
> Antes de propor qualquer arquitetura vamos dimensionar o sistema. Leia `PROJECT.md` e o
> levantamento de volumetria em `docs/VOLUME_SURVEY.md`. Distinga os dados primários (fatos que
> só o negócio sabe) dos derivados (o que se pode calcular a partir dos primários). Avalie se os
> dados primários estão completos o bastante para calcular o que segue; se falta algum dado
> primário, ou está marcado como suposição, peça-me todos os que faltam antes de seguir. Nunca
> estime um dado primário. Se for possível consultar um sistema anterior, use seus números reais
> e diga de onde sai cada um. Com os primários completos, calcule, mostrando a conta: linhas por
> ano das três maiores tabelas, concorrência no pico, tamanho dos dados em cinco anos, e o que
> quebra primeiro se tudo for multiplicado por dez. Depois apresente três opções de persistência
> e concorrência, cada uma com o custo de migrar para as outras mais adiante. Não escolha: eu
> escolho. Não escreva código.
>
> Quando você precisar de uma decisão minha, peça-a com as quatro partes da UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e nesta ordem: os dados que tornam a pergunta necessária,
> enumerados; um parágrafo de no máximo cinco linhas que os ligue e deixe ver a dúvida; a pergunta
> com as suas respostas possíveis enumeradas; e a sua recomendação. Diga-o na profundidade técnica
> que o projeto declarou em `communication_depth` —`beginner`, `decision_maker` ou `technical`—;
> se o projeto não declarou nenhuma, use `decision_maker`.
>
> Responda no meu idioma.

O que estou pedindo, cláusula por cláusula: distinguir primários de derivados (é a distinção que
evita o invento); **pedir os primários que faltam e nunca estimá-los**; usar números reais do
sistema anterior quando existir, com sua fonte; calcular o derivado com a conta à vista, para que
você possa refazê-la; o cenário "por dez", que é o que revela o que quebra primeiro; três opções
com o custo de migrar entre elas, porque a decisão não é só "qual" mas "quanto custa errar"; e
que não escolha nem escreva código, porque este degrau é de decisão, não de construção.

**De fechamento:**

**Antes de enviar o prompt**, você tem que ter isto à mão:

- As três opções que o agente apresentou, lidas, e pelo menos uma conta refeita à mão por você
  (linhas por ano da tabela maior, por exemplo): tem que dar o mesmo.
- Os dados primários que ele pediu, conseguidos de verdade (no caderno, perguntando ao dono) e
  dados no chat; nenhum estimado por você para sair do passo.
- A sua escolha, com a letra da opção e uma razão de uma linha, decidida por você e, se há dono,
  com ele.
- Estado mínimo aceitável: a conta refeita coincide, os supostos viraram dados com fonte, e a
  opção está escolhida. Se a conta não coincide, não feche: pergunte.

> I choose option [B]. Record in `docs/SIZING.md`: the primary data with its source, the derived
> data with its arithmetic, the three options, the chosen one and why, and the decisions we are
> taking "just in case" even though they are not needed today (for example: the persistence
> interface is asynchronous from line one, even if the first engine is synchronous). Include the
> questions you asked and my answers.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [pt]
> Escolho a opção [B]. Registre em `docs/SIZING.md`: os dados primários com sua fonte, os
> derivados com sua conta, as três opções, a escolhida e por quê, e as decisões que tomamos "por
> precaução" mesmo que hoje não sejam necessárias (por exemplo: a interface de persistência é
> assíncrona desde a linha um, mesmo que o primeiro motor seja síncrono). Inclua as perguntas que
> você fez e as minhas respostas.
>
> Quando você precisar de uma decisão minha, peça-a com as quatro partes da UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e nesta ordem: os dados que tornam a pergunta necessária,
> enumerados; um parágrafo de no máximo cinco linhas que os ligue e deixe ver a dúvida; a pergunta
> com as suas respostas possíveis enumeradas; e a sua recomendação. Diga-o na profundidade técnica
> que o projeto declarou em `communication_depth` —`beginner`, `decision_maker` ou `technical`—;
> se o projeto não declarou nenhuma, use `decision_maker`.

O que estou pedindo: o registro completo, com fontes e contas; a escolhida e a razão; e as
decisões assimétricas escritas, porque se ficam implícitas não se respeitam.

## 3. Resultado esperado

Um arquivo `docs/SIZING.md` com:

- Data e quem decidiu.
- Tabela de dados primários: valor, fonte (informado pelo negócio / medido no sistema anterior),
  data. Nenhum com fonte "suposição".
- Tabela de dados derivados: valor, de que primários sai, a conta.
- O cenário "por dez": o que quebra primeiro.
- As três opções numeradas, com o custo de migrar entre elas.
- A escolhida e a razão, em uma ou duas frases.
- As decisões assimétricas, listadas.
- As perguntas que o agente fez e as respostas.

## 4. Verificação de completude

- Há algum dado primário com fonte "suposição" ou sem fonte? Se há, o degrau não foi subido: o
  agente tinha que pedi-lo.
- Cada dado derivado mostra de que primários sai e com que conta? Você consegue refazer uma conta
  à mão e dá o mesmo?
- Há três opções e uma escolhida com razão escrita?
- Diz o que acontece se a volumetria se multiplica por dez?
- As decisões assimétricas estão escritas, ou ficaram implícitas?
- O agente perguntou? Se apresentou números sem ter feito uma única pergunta, desconfie.

## 5. Sinais de alerta

- Os três cenários de opções levam à mesma conclusão. O agente já tinha escolhido e montou as
  outras duas para cumprir.
- Um número derivado tem mais precisão do que os primários de que sai ("1.234.567 linhas" a
  partir de "umas 5.000 famílias"). A precisão é falsa.
- O cenário "por dez" diz "não acontece nada". Sempre acontece algo; se ele não encontrou, não
  procurou.
