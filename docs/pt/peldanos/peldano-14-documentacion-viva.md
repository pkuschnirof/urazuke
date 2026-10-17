# Passo 14 — Documentação viva e manuais que uma pessoa pode seguir sem IA (contrato do degrau)

**Fase:** operação (nasce com o sistema; mantém-se a cada mudança).
**Forma:** rotina; mais um disparo longo quando se geram os manuais.
**Tamanho:** proporcional. Um sistema pequeno precisa, no mínimo, do manual de infraestrutura e
recuperação (como se levanta, como se restaura); o de usuário pode ser uma página. O que não muda:
se a pessoa que o construiu desaparece, outra tem que poder continuar.

## Para que serve

Para que o sistema possa ser usado, mantido e recuperado sem o agente e sem a pessoa que o
construiu. Se no dia em que o agente não está não dá para implantar, não está terminado. No método
clássico a documentação era cara e envelhecia; aqui regenerá-la é grátis, então a regra passa a ser
"no mesmo commit" e "reproduzível à mão". Evita o documento desatualizado que provocou um commit no
repositório errado, e o arquivo de projeto convertido em histórico.

Um critério de qualidade para o manual de recuperação, que serve para julgá-lo sem ser técnico:
**tem que poder ser seguido por uma pessoa de confiança que não programe, às três da manhã, com o
sistema caído e o agente sem conexão**. Se em algum passo diz "consultar o desenvolvedor" ou
"conforme o caso", esse passo está incompleto.

## 1. Contexto necessário

- Quem são os leitores de cada manual: o usuário final, quem mantém, quem opera a infraestrutura.
  O negócio sabe; o agente pergunta se não está claro.
- O sistema rodando no ambiente de teste, para tirar capturas reais.
- `docs/DEPLOYMENT.md` (degrau 13) e `docs/LOCKS.md` (degrau 12), que são insumo.

## 2. Prompts

**Rotina (vai no contrato de convivência):**

> Every change that modifies what the user sees, what the operator does, or how the system is
> deployed, updates the corresponding manual in the same commit. If you do not know which
> manual, ask.

O que estamos pedindo: a regra do mesmo commit, que é a única que mantém um manual em dia, e a
pergunta quando não está claro a que manual vai.

**Para gerar os manuais:**

> Generate three manuals from the system as it is today in the test environment: the user
> manual (screen by screen, with real screenshots, in the user's language, no jargon); the
> maintenance manual (how it is built, where everything is, how to run the test suite, how to
> add a module); and the infrastructure and recovery manual (how to deploy, how to roll back,
> how to restore a backup, what to do if it goes down; written for a person who has to do it by
> hand, without AI, at three in the morning). If for any section you need something only the
> business knows (who is responsible for what, which phone number to call), ask me; do not leave
> a gap and do not invent. Each manual carries a date and the system version. Reply in my
> language.

O que estamos pedindo: os três manuais com seus leitores; capturas **reais** do ambiente de teste
(não desenhos nem descrições); o critério das três da manhã para o de recuperação; a cláusula de
completude na sua forma para documentar: o que só o negócio sabe se pergunta, e **não se deixa
lacuna nem se inventa**; e data e versão, para que se saiba a que sistema corresponde cada manual.

## 3. Resultado esperado

- `docs/USER_MANUAL.md` (ou HTML), com capturas reais e incorporadas.
- `docs/MAINTENANCE_MANUAL.md`.
- `docs/INFRASTRUCTURE_AND_RECOVERY_MANUAL.md`: passo a passo, para uma pessoa.
- Cada um com data e a versão do sistema que documenta.
- Nos commits que mudam telas, operação ou implantação: o manual atualizado.

## 4. Verificação de completude

- Abra o manual de usuário numa tela ao acaso: a captura coincide com o que há hoje no ambiente de
  teste?
- O manual de recuperação, você conseguiria seguir, ou alguém de confiança que não programe? Leia a
  seção "caiu": diz o que fazer, em ordem, com os comandos?
- Escolha um commit recente que mudou uma tela: tocou no manual?
- Há alguma lacuna tipo "[completar]" ou "consultar o responsável"? Ali o agente tinha que
  perguntar.
- Cada manual diz para que versão do sistema vale?

## 5. Sinais de alerta

- O manual de usuário tem capturas de uma versão que já não existe. Foi gerado uma vez e não
  mantido: a regra do mesmo commit não está no contrato ou não está sendo aplicada.
- O manual de recuperação começa com "abra uma sessão com o agente". Se o agente é pré-requisito,
  não é um manual para uma pessoa.
- Ninguém fora do construtor leu alguma vez o manual de recuperação. Peça a alguém que o siga no
  ambiente de teste; o que travar é o que há que corrigir.
