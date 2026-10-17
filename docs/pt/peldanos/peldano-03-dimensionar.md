# Passo 3 — Dimensionar antes de desenhar a arquitetura (contrato do degrau)

**Fase:** arranque (uma vez; refeito se o negócio mudar de escala).
**Forma:** conversa (o agente calcula e apresenta opções; o dono escolhe).
**Tamanho:** sempre obrigatório, mas proporcional: num projeto pequeno o dimensionamento pode ser
meia página e uma única decisão ("cabe em SQLite por anos"). O que não pode é ser pulado, porque a
pergunta "quanto vai crescer?" custa cinco minutos e a resposta errada custa semanas.

## Para que serve

Para que as decisões estruturais — que motor de banco de dados, se a interface é síncrona ou
assíncrona, quanta concorrência — sejam tomadas com números e não com gosto. É o degrau que mais
caro custa pular: no Kikan começou-se com arquivos JSON e quando se mediu descobriu-se que o sistema
gerava 3,4 milhões de linhas por ano; mudar a interface depois custou uma etapa inteira de
reengenharia.

Um ponto-chave, que surgiu ao elaborar este contrato: **há dados que só o negócio tem** (quantas
entidades, quantos eventos por entidade, quantos operadores no pico, quanto tempo conservar) e o
modelo não pode inferi-los. O que ele pode inferir é o derivado. Por isso o prompt exige que
avalie se os dados primários estão completos e peça os que faltam, em vez de estimá-los com cara de
seguro. Quem sabe o que falta para calcular é o modelo, não um formulário.

E uma segunda ideia que vale a pena nomear: as **decisões assimétricas**. Há decisões que custam
muito pouco se você as toma e resultam desnecessárias, e muitíssimo se não as toma e resultam
necessárias. A interface de persistência assíncrona desde a linha um é o exemplo canônico: se o
motor acabar sendo síncrono, sobrou um `await`; se acabar sendo assíncrono e você não previu, tem
que reescrever tudo. Essas decisões se tomam sempre que forem baratas, mesmo que hoje não façam
falta.

## 1. Contexto necessário

- **Levantamento de dados de volumetria** do negócio, nomeado assim de forma genérica: entidades
  principais e seu crescimento, eventos por entidade, operadores simultâneos e horário do pico,
  tempo de conservação dos dados, cargas excepcionais (campanhas, fechamentos), crescimento
  esperado. O levantamento é por natureza incompleto; o agente avalia e pede.
- Se há um sistema anterior: acesso de leitura ao seu banco para tirar números reais em vez de
  estimados.
- `PROJECT.md` (degrau 2).

## 2. Prompts

**Inicial:**

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
> Reply in my language.

O que estamos pedindo, cláusula por cláusula: distinguir primários de derivados (a distinção que
evita a invenção); **pedir os primários que faltam e nunca estimá-los**; usar números reais do
sistema anterior quando existir, com sua fonte; calcular o derivado com a conta à vista, para que o
dono possa refazê-la; o cenário "vezes dez", que é o que revela o que quebra primeiro; três opções
com o custo de migrar entre elas, porque a decisão não é só "qual" mas "quanto custa errar"; e que
não escolha nem escreva código, porque este degrau é de decisão, não de construção.

**De fechamento:**

> I choose option [B]. Record in `docs/SIZING.md`: the primary data with its source, the derived
> data with its arithmetic, the three options, the chosen one and why, and the decisions we are
> taking "just in case" even though they are not needed today (for example: the persistence
> interface is asynchronous from line one, even if the first engine is synchronous). Include the
> questions you asked and my answers.

O que estamos pedindo: o registro completo, com fontes e contas; a escolhida e a razão; e as
decisões assimétricas escritas, porque se ficarem implícitas não se respeitam.

## 3. Resultado esperado

Um arquivo `docs/SIZING.md` com:

- Data e quem decidiu.
- Tabela de dados primários: valor, fonte (informado pelo negócio / medido no sistema anterior),
  data. Nenhum com fonte "suposto".
- Tabela de dados derivados: valor, de que primários sai, a conta.
- O cenário "vezes dez": o que quebra primeiro.
- As três opções numeradas, com o custo de migrar entre elas.
- A escolhida e a razão, em uma ou duas frases.
- As decisões assimétricas (baratas se você estiver errado, caríssimas se não as tomar),
  listadas.
- As perguntas que o agente fez e as respostas.

## 4. Verificação de completude

- Há algum dado primário com fonte "suposto" ou sem fonte? Se houver, o degrau não foi subido: o
  agente tinha que pedi-lo.
- Cada dado derivado mostra de que primários sai e com que conta? Você consegue refazer uma
  conta à mão e dá o mesmo?
- Há três opções e uma escolhida com razão escrita?
- Diz o que acontece se a volumetria se multiplica por dez?
- As decisões assimétricas estão escritas, ou ficaram implícitas?
- O agente perguntou? Se apresentou números sem ter feito uma única pergunta, desconfie.

## 5. Sinais de alerta

- As três opções levam à mesma conclusão. O agente já tinha escolhido e montou as outras duas
  para cumprir tabela.
- Um número derivado tem mais precisão que os primários de que sai ("1.234.567 linhas" a partir
  de "umas 5.000 famílias"). A precisão é falsa.
- O cenário "vezes dez" diz "não acontece nada". Sempre acontece algo; se não encontrou, não
  procurou.
