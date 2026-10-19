# Passo 22 — Monitoramento de erros e relatório cíclico: nenhum erro sem pendência (contrato do degrau)

**Fase:** operação.
**Quando:** monta-se na fase de operação, com a primeira implantação, junto com o 21, sobre os
registros do 16; a partir daí roda sozinho, com alertas na hora e um relatório cíclico que se lê
com o dono. Cada erro novo entra no ciclo como pendência corretiva e se fecha
com o teste que o reproduz em vermelho. Num legado, a primeira leitura é a linha base: os erros
que já existiam no primeiro dia viram pendências com a sua marca de velocidade, e nenhum fica
como "conhecido" sem uma pendência que diga por que se tolera e até quando.
**Forma:** um único disparo para montar; depois, rotina cíclica.
**Tamanho:** obrigatório em todo projeto com usuários: a captura centralizada e o relatório não
se negociam; os alertas na hora, proporcionais.

## Para que serve

Um sistema em produção produz erros que nenhum usuário reporta: o que viu a tela em branco e
tentou de novo, o da tarefa noturna que falhou e ninguém olha, o da chamada externa que devolveu
um erro e o código engoliu. Se não os capturo, não existem até que existam demais. Este degrau é
a contraparte do 21: aquele vigia o desempenho, este vigia os erros, e os dois terminam no mesmo
lugar, o ciclo, como pendências corretivas. As regras de fundo são duas. **Nenhum erro sem
pendência**: um erro novo abre uma, e se fecha com o teste que o reproduz em vermelho, como pede
o modo corretivo do caminho evolutivo. E **não existe o "erro conhecido"** sem uma pendência que
diga por que se tolera e até quando; "esse erro sempre esteve aí" é a frase com que um sistema
apodrece. O erro de autenticação reportado como sucesso [Ref. 43](../REFERENCIAS.md#ref-43) e as
quatro rodadas até a causa raiz [Ref. 22](../REFERENCIAS.md#ref-22) são os dois antecedentes: o
primeiro, de que os erros se escondem se não forem capturados por máquina; o segundo, de que um
erro sem reprodução se corrige várias vezes.

**Se você está começando.** Um *erro* é qualquer coisa que o sistema tentou fazer e não
conseguiu: uma tela que não carregou, uma tarefa noturna que se interrompeu, uma chamada a outro
serviço que falhou. Uma *exceção não tratada* é um erro que o código não previu e que corta o que
estava fazendo. *Capturar* um erro é guardá-lo com todos os seus dados (quando, em que versão,
com que identificador, a *pilha*, que é a lista de passos do programa até a falha) num único
lugar central, em vez de deixá-lo se perder na tela de um usuário. *Agrupar* é juntar as mil
vezes que aconteceu o mesmo erro numa só entrada com um contador. E a *taxa de erro por fluxo* é,
de cada cem vezes que alguém cadastrou um turno, quantas falharam.

## 1. Contexto necessário

O que segue é a lista genérica. Os arquivos concretos que você tem que ter prontos antes de cada
prompt, com seu conteúdo e seu estado mínimo, estão na seção 2, no bloco "Antes de enviar o
prompt" que precede cada um.

- A observabilidade (16): os erros chegam com identificador de correlação, versão e ator.
- A tabela de cadeados (14): os erros em ações com consequência são alerta imediato.
- Produção implantada (15), com o navegador do usuário incluído na captura.
- O canal de alertas e o ciclo do relatório, compartilhados com o 21.

## 2. Prompts

**Inicial (montar e demonstrar):**

**Antes de enviar o prompt**, isto tem que existir, e quem faz é você (ou o negócio com você), não
o agente:

- `docs/OBSERVABILITY.md` (16) fechado: os erros têm que sair com identificador, versão, ambiente
  e ator.
- `docs/LOCKS.md` (14): a lista de ações com consequência, cujos erros são alerta na hora.
- O canal e o ciclo do relatório, os mesmos do degrau 21, decididos com o dono; e o número de
  ocorrências por hora de um erro conhecido a partir do qual você quer alerta, para o vazio do
  prompt.
- Onde se guardam os erros e por quanto tempo (o mesmo lugar que os registros, ou um serviço de
  captura de erros), decidido por você, com a regra de que não contêm dados pessoais.
- Estado mínimo aceitável: os erros já saem com identificador (16) e há um canal com uma pessoa
  que o lê.

> We are going to make sure that no error in production goes unseen. Using the records of step 16,
> set up: (1) centralized capture of every error and unhandled exception in the backend, in the
> jobs and in the user's browser, with the correlation id, the version, the environment, the
> actor (never personal data) and the stack; (2) grouping of errors by cause, so that one defect
> is one entry, with its count, first and last occurrence, versions affected and the flows it
> touches; (3) alerts to [channel] for every new error type, for a known error that crosses [N]
> occurrences per hour, and for any error inside a consequential action of `docs/LOCKS.md`; (4) a
> cyclic report, [weekly], generated automatically, with: new errors, recurring errors and their
> trend, the errors fixed in the period with their pending item, the error rate per flow against
> the previous period, and what you propose for each open one; (5) the rule that every new error
> type opens a corrective pending item, closed with the test that reproduces it in red, and that
> there is no "known error" without a pending item that says why it is tolerated and until when.
> Show me one error provoked on purpose in the test environment, in the browser, followed by its
> id to the backend record, the alert and the report. Document it in `docs/MONITORING.md`. Reply
> in my language.

> [pt]
> Vamos nos assegurar de que nenhum erro em produção passe sem ser visto. Com os registros do
> degrau 16, monte: (1) a captura centralizada de cada erro e exceção não tratada no backend, nas
> tarefas e no navegador do usuário, com o identificador de correlação, a versão, o ambiente, o
> ator (nunca dados pessoais) e a pilha; (2) o agrupamento de erros por causa, de modo que um
> defeito seja uma entrada, com a sua quantidade, primeira e última ocorrência, versões afetadas
> e os fluxos que toca; (3) alertas para [canal] para cada tipo de erro novo, para um erro
> conhecido que ultrapasse [N] ocorrências por hora, e para qualquer erro dentro de uma ação com
> consequência de `docs/LOCKS.md`; (4) um relatório cíclico, [semanal], gerado automaticamente,
> com: erros novos, erros recorrentes e a sua tendência, os erros corrigidos no período com a sua
> pendência, a taxa de erro por fluxo em relação ao período anterior, e o que você propõe para
> cada um que esteja aberto; (5) a regra de que cada tipo de erro novo abre uma pendência
> corretiva, fechada com o teste que o reproduz em vermelho, e de que não existe o "erro
> conhecido" sem uma pendência que diga por que se tolera e até quando. Mostre-me um erro
> provocado de propósito no ambiente de teste, no navegador, seguido pelo seu identificador até o
> registro do backend, o alerta e o relatório. Documente-o em `docs/MONITORING.md`. Responda no
> meu idioma.

O que estou pedindo: a captura nos três lugares onde os erros se escondem (backend, tarefas,
navegador), com o identificador do 16 para poder segui-los; o agrupamento, sem o qual o relatório
é uma lista de dez mil linhas; os três alertas que importam (novo, recorrente que cresce, com
consequência); o relatório com a taxa por fluxo, que é o número que o dono entende; as duas
regras; e a demonstração de ponta a ponta, do navegador ao relatório.

**Rotina de cada ciclo (vai no contrato de convivência):**

**Antes de enviar o prompt**, você tem que ter isto à mão:

- O relatório cíclico de erros recém-gerado, lido por você.
- `docs/PENDING.md` à mão, para verificar que os recorrentes têm pendência.
- Estado mínimo aceitável: você leu o relatório antes de colar o prompt.

> With every cyclic error report: go through it with me; open the corrective pending items for
> the new errors, each with the way to reproduce it; confirm that every recurring error has a
> pending item or a written reason with a date; and tell me which errors disappeared and why,
> with the commit that fixed each one. An error that disappeared without a fix is not solved: it
> is hiding, and it stays in the report until its cause is known.

> [pt]
> Com cada relatório cíclico de erros: percorra-o comigo; abra as pendências corretivas dos erros
> novos, cada uma com a forma de reproduzi-lo; confirme que cada erro recorrente tem uma
> pendência ou uma razão escrita com data; e diga-me que erros desapareceram e por quê, com o
> commit que corrigiu cada um. Um erro que desapareceu sem correção não está resolvido: está
> escondido, e fica no relatório até que a sua causa seja conhecida.

O que estou pedindo: a disciplina do ciclo, e a regra do erro que desaparece, que é a mais
contraintuitiva e a que mais vale: um erro que foi embora sozinho volta sozinho.

## 3. Resultado esperado

- Captura centralizada de erros no backend, nas tarefas e no navegador, agrupados por causa, sem
  dados pessoais.
- Alertas por erro novo, recorrente que cresce, e com consequência.
- O relatório cíclico com a taxa de erro por fluxo.
- `docs/MONITORING.md` completo (com o 21); a rotina no contrato.
- Uma pendência para cada erro aberto; nenhum "conhecido" sem pendência.

## 4. Verificação de completude

- Provoque você um erro no navegador em teste (uma ação que você sabe que falha): apareceu na
  captura com o seu identificador, e o alerta chegou até você?
- Leia o último relatório: há algum erro recorrente sem pendência nem razão?
- Pegue um erro "corrigido" do relatório: a pendência tem o teste que o reproduziu em vermelho?
- A taxa de erro por fluxo está lá, e baixou ou subiu em relação ao período anterior?
- Procure um dado pessoal na captura de erros: não pode estar.

## 5. Sinais de alerta

- Zero erros em produção durante um mês com usuários reais. Não existe sistema assim; a captura
  não está vendo o navegador ou as tarefas.
- Um erro com mil ocorrências e um comentário "conhecido, não afeta". Sem pendência, sem data.
- Os erros se "corrigem" reiniciando o serviço. Desaparecem e voltam.
- O relatório de erros e o de recursos são lidos por gente diferente e ninguém os cruza: a
  consulta lenta do 21 é a causa do tempo de espera esgotado do 22.
