# Passo 14 — Documentação viva e manuais que uma pessoa pode seguir sem IA (contrato do degrau)

**Fase:** operação.
**Quando:** o manual de usuário cresce com cada bloco funcional, no fechamento, com as telas
novas; alimentado pelas pendências fechadas, que são a documentação do feito. Os três manuais
completos se geram na fase de saída para produção, depois do 13, e o teste com uma pessoa que não
programa se faz antes da primeira implantação. A rotina do mesmo commit rege durante toda a
operação.
**Forma:** rotina; mais um disparo longo quando se geram os manuais.
**Tamanho:** proporcional. Um sistema pequeno precisa, no mínimo, do manual de infraestrutura e
recuperação; o de usuário pode ser uma página. O que não muda: se a pessoa que o construiu
desaparece, outra tem que poder continuar.

## Para que serve

Faça com que o sistema possa ser usado, mantido e recuperado sem o agente e sem você. Se no dia
em que não há agente não se pode implantar, não está terminado. No método clássico a
documentação era cara e envelhecia; aqui regenerá-la é grátis, então a regra passa a ser "no
mesmo commit" e "reproduzível à mão". Os manuais que escrevi para o Plano de Saúde com esse
critério são o modelo [Ref. 24](../REFERENCIAS.md#ref-24); e o arquivo de projeto que virou um
histórico de milhares de linhas é o contraexemplo [Ref. 41](../REFERENCIAS.md#ref-41).

Um critério de qualidade para o manual de recuperação, que serve para julgá-lo sem ser técnico:
**tem que poder ser seguido por uma pessoa de confiança que não programe, às três da manhã, com o
sistema caído e o agente sem conexão**. Se em algum passo diz "consultar o desenvolvedor" ou
"conforme o caso", esse passo está incompleto.

E uma fonte que não se deve desperdiçar: as pendências fechadas. Cada uma traz sua
especificação, sua decisão, sua evidência e sua data. O manual de usuário não se escreve do zero
no final: monta-se, bloco a bloco, a partir das pendências que fecharam, e o diário de mudanças
sai diretamente delas.

## 1. Contexto necessário

O que segue é a lista genérica. Os arquivos concretos que você tem que ter prontos antes de cada
prompt, com seu conteúdo e seu estado mínimo, estão na seção 2, no bloco "Antes de enviar o
prompt" que precede cada um.

- Quem são os leitores de cada manual: o usuário final, quem mantém, quem opera a
  infraestrutura. O negócio sabe; o agente pergunta se não está claro.
- O sistema rodando no ambiente de teste, para tirar capturas reais.
- As pendências fechadas do bloco, com sua documentação de fechamento (degrau 5).
- `docs/DEPLOYMENT.md` (degrau 13) e `docs/LOCKS.md` (degrau 12), que são insumos.

## 2. Prompts

**Rotina (vai no contrato de convivência):**

**Antes de enviar o prompt**, isto tem que existir, e quem faz é você (ou o negócio com você), não
o agente:

- `docs/WORKING_AGREEMENT.md`, onde vai a rotina.
- A decisão de que manuais o sistema vai ter e para quem é cada um (o usuário final, quem mantém,
  quem opera a infraestrutura), escrita em `PROJECT.md` ou dita no chat, para que "o manual
  correspondente" faça sentido.
- Estado mínimo aceitável: há uma lista de manuais, cada um com o seu leitor.

> Every change that modifies what the user sees, what the operator does, or how the system is
> deployed, updates the corresponding manual in the same commit. At the close of every
> functional block, add to the user manual the screens and flows of the pending items closed
> in that block, with real screenshots from the test environment, and add their entries to the
> changelog. If you do not know which manual, ask.

> [pt]
> Toda mudança que modifique o que o usuário vê, o que o operador faz, ou como o sistema é
> implantado, atualiza o manual correspondente no mesmo commit. No fechamento de cada bloco
> funcional, acrescente ao manual de usuário as telas e os fluxos das pendências fechadas nesse
> bloco, com capturas reais do ambiente de teste, e acrescente suas entradas ao diário de
> mudanças. Se não souber a que manual vai, pergunte.

O que estou pedindo: a regra do mesmo commit, que é a única que mantém um manual em dia; o
fechamento de bloco como momento em que as pendências fechadas viram manual e diário de mudanças;
e a pergunta quando não está claro a que manual vai.

**Para gerar os manuais:**

**Antes de enviar o prompt**, você tem que ter isto à mão:

- O sistema rodando no ambiente de teste com dados realistas, não vazio: as capturas saem dali.
- As pendências fechadas com a sua documentação de fechamento (degrau 5), que são a fonte do
  manual de usuário e do diário de mudanças.
- `docs/DEPLOYMENT.md` (degrau 13) e `docs/LOCKS.md` (degrau 12), que são o insumo do manual de
  infraestrutura e recuperação.
- O que só o negócio sabe, preparado para quando o agente perguntar: quem é responsável pelo quê,
  para que telefone se liga quando cai, quem faz a cópia de segurança, em que idioma o usuário lê.
- Estado mínimo aceitável: há dados no ambiente de teste, e você sabe para quem ligar às três da
  manhã.

> Generate three manuals from the system as it is today in the test environment: the user
> manual (screen by screen, with real screenshots, in the user's language, no jargon); the
> maintenance manual (how it is built, where everything is, how to run the test suite, how to
> add a module); and the infrastructure and recovery manual (how to deploy, how to roll back,
> how to restore a backup, what to do if it goes down; written for a person who has to do it by
> hand, without AI, at three in the morning). If for any section you need something only the
> business knows (who is responsible for what, which phone number to call), ask me; do not leave
> a gap and do not invent. Each manual carries a date and the system version. Reply in my
> language.

> [pt]
> Gere três manuais a partir do sistema tal como está hoje no ambiente de teste: o manual de
> usuário (tela por tela, com capturas reais, no idioma do usuário, sem jargão); o manual de
> manutenção (como está construído, onde está cada coisa, como rodar a bateria, como acrescentar
> um módulo); e o manual de infraestrutura e recuperação (como implantar, como voltar atrás,
> como restaurar um backup, o que fazer se cair; escrito para uma pessoa que tem que fazê-lo à
> mão, sem IA, às três da manhã). Se para alguma seção você precisar de algo que só o negócio
> sabe (quem é responsável pelo quê, para que telefone ligar), peça-me; não deixe um buraco nem
> invente. Cada manual leva data e versão do sistema. Responda no meu idioma.

O que estou pedindo: os três manuais com seus leitores; capturas **reais** do ambiente de teste
(não desenhos nem descrições); o critério das três da manhã para o de recuperação; a cláusula de
completude na sua forma para documentar: o que só o negócio sabe se pergunta, e **não se deixa um
buraco nem se inventa**; e data e versão, para que se saiba a que sistema corresponde cada
manual.

## 3. Resultado esperado

- `docs/USER_MANUAL.md` (ou HTML), com capturas reais e incrustadas, que cresceu bloco a bloco.
- `docs/MAINTENANCE_MANUAL.md`.
- `docs/INFRASTRUCTURE_AND_RECOVERY_MANUAL.md`: passo a passo, para uma pessoa.
- `docs/CHANGELOG.md`, alimentado pelas pendências fechadas.
- Cada um com data e a versão do sistema que documenta.
- Nos commits que mudam telas, operação ou implantação: o manual atualizado.

## 4. Verificação de completude

- Abra o manual de usuário numa tela ao acaso: a captura coincide com o que há hoje no ambiente
  de teste?
- O manual de recuperação, você conseguiria segui-lo, ou alguém de confiança que não programe?
  Leia a seção "caiu": diz o que fazer, em ordem, com os comandos?
- Escolha um commit recente que mudou uma tela: tocou no manual?
- O diário de mudanças tem uma entrada para cada pendência fechada do último bloco?
- Há um buraco tipo "[completar]" ou "consultar o responsável"? Aí o agente tinha que perguntar.
- Cada manual diz para que versão do sistema vale?

## 5. Sinais de alerta

- O manual de usuário tem capturas de uma versão que já não existe. Foi gerado uma vez e não se
  manteve: a regra do mesmo commit não está no contrato ou não está sendo aplicada.
- O manual de recuperação começa com "abra uma sessão com o agente". Se o agente é
  pré-requisito, não é um manual para uma pessoa.
- Ninguém fora do construtor leu nunca o manual de recuperação. Peça a alguém que o siga no
  ambiente de teste; o que travar é o que há que corrigir.
