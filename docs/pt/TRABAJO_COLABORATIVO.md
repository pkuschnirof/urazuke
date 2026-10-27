# Urazuke — trabalho colaborativo: vários desenvolvedores, cada um com o seu agente, sobre um mesmo ramo

Autor: Pablo Kuschniroff, assistido por Claude Code. Versão 1, 19 de outubro de 2026. Este
documento complementa o [documento principal](ESCALERA_METODOLOGICA.md): diz como se aplica o
método quando não há um só humano com um só agente, e sim vários desenvolvedores, cada um com o
seu, trabalhando sobre o mesmo repositório e sobre o mesmo ramo. As palavras estranhas estão no
glossário do documento principal. Repositório público:
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## O problema, dito sem rodeios

O método está escrito no singular: o dono, o agente, a pendência. Os meus três sistemas eu os
construí assim, um humano e um modelo. Mas uma equipe que adota o método não tem um humano: tem
três, ou cinco, cada um com a sua sessão de agente aberta sobre o mesmo código, e na maioria das
equipes pequenas, sobre o **mesmo ramo**, porque a floresta de ramos de vida longa é a forma mais
segura de que duas semanas de trabalho se integrem numa sexta-feira aos gritos. Trabalhar sobre
um ramo compartilhado pode ser feito bem, e a indústria o faz há anos com regras conhecidas
(commits pequenos e integrados várias vezes por dia, a integração contínua como árbitro, as
funcionalidades pela metade escondidas atrás de um interruptor). O que muda com o método é que
essas regras já não são cumpridas por pessoas que leem o código das outras: são cumpridas por
agentes que não se veem entre si, e então é preciso escrevê-las onde cada agente as leia.

O que segue são as regras, e depois os prompts. Não acrescento degraus: os vinte e quatro são os
mesmos. Acrescento o que cada degrau precisa para que vários o subam ao mesmo tempo.

**Se você está começando.** Um *ramo* é uma cópia do código onde se trabalha; o *ramo
compartilhado* (costuma se chamar *main* ou *trunk*) é o único que importa, o que se implanta.
*Integrar* é colocar a sua mudança nesse ramo; *conflito* é quando duas pessoas mudaram a mesma
linha e a ferramenta não sabe qual vale. Um *interruptor de funcionalidade* é uma chave de
configuração que deixa uma funcionalidade apagada mesmo que o código já esteja lá, para poder
integrar pela metade sem que o usuário a veja. E *reivindicar* uma pendência é anotar o seu nome
nela para que mais ninguém a pegue.

## As sete regras do ramo compartilhado

1. **A pendência é a unidade de propriedade.** Ninguém trabalha sem uma pendência reivindicada em
   seu nome em `docs/PENDING.md`, e uma pendência tem um só dono de cada vez. Duas pessoas não
   pegam duas pendências que tocam o mesmo módulo ao mesmo tempo; se não dá para evitar, avisam-se
   e a segunda espera que a primeira integre. O agente, ao começar a sessão, lê as pendências
   reivindicadas por outros e não as toca.
2. **Integrar pequeno e com frequência.** Uma pendência se parte em mudanças que se integram ao
   ramo compartilhado várias vezes por dia, nunca no final da semana. Antes de cada integração:
   trazer o dos demais, rodar a bateria inteira, e só depois subir. Uma mudança que não pode ser
   integrada num dia é uma pendência mal cortada: corta-se de novo.
3. **A integração contínua é o árbitro, não o humano.** Ninguém integra com a cadeia em vermelho,
   e ninguém discute se uma mudança "quebra": quem diz é a bateria, a comporta de qualidade (9) e
   a caracterização se for um legado. Quem põe o ramo compartilhado em vermelho o conserta antes
   de qualquer outra coisa, ou reverte a sua mudança.
4. **O que está pela metade vai atrás de um interruptor.** Uma funcionalidade que leva mais de um
   dia se integra do mesmo jeito, apagada por configuração, com o seu interruptor anotado na
   pendência, e acende-se quando a pendência se fecha com evidência. Assim ninguém espera por
   ninguém para integrar.
5. **As listas têm um só dono, e o mapa diz qual.** O mapa produtor-consumidor (11) é o detector
   de conflitos da equipe: antes de tocar um contrato entre partes, olha-se quem o consome, e os
   consumidores se atualizam na mesma mudança, mesmo que sejam de outra pessoa. A árvore semântica
   (2) é o mapa compartilhado, e quem a muda é quem acrescenta um nó, no mesmo commit.
6. **As decisões se escrevem com nome, e valem para todos.** Uma regra de negócio decidida por um
   desenvolvedor com o dono vai para `docs/DECISIONS.md` na hora, porque o agente do lado vai
   precisar dela nessa mesma tarde e não vai adivinhá-la. O contrato de convivência (1) é um só
   para a equipe; ninguém tem regras próprias que os demais não leem.
7. **Revisa-se evidência, não código, e quem revisa é outro.** Uma pendência é fechada pelo seu
   dono com a rotina completa (8, 9, 10, 12), e é dada por fechada por outra pessoa da equipe
   lendo o relatório: o vermelho, o verde, a regressão, a qualidade, o caso manual. Ninguém fecha
   as suas próprias pendências, e ninguém lê o código para fechá-las.

E uma regra sobre os agentes, que é a que de verdade muda em relação a uma equipe sem modelos:
**cada agente trabalha em nome de uma pessoa**, com o seu próprio contexto de sessão, e a única
coisa que compartilham é o que está escrito no repositório. Não há memória comum fora dos
arquivos. Por isso o estado vivo (`docs/STATUS.md`), as pendências e as decisões se escrevem na
hora, e não "no final do dia": o agente do colega vai lê-los em cinco minutos.

## Como se repartem os degraus numa equipe

| Degrau | Quem o sobe | O que muda em equipe |
|---|---|---|
| 0 a 4, arranque | Uma só pessoa, a que lidera, com o dono. | Faz-se uma vez e antes de que entre o resto. O esqueleto (4) inclui a cadeia de integração que vai ser o árbitro, e as comportas (`docs/GATES.md`) incluem as do ramo compartilhado. |
| 1, contrato | O líder o escreve; todos o assinam. | Acrescentam-se as sete regras de cima como rotinas. Um só arquivo para a equipe. |
| 5, pendências | O líder abre o bloco com o dono; cada um reivindica. | A pendência leva um campo "reivindicado por" e "módulos que toca". Duas pendências que tocam o mesmo módulo não se reivindicam ao mesmo tempo. |
| 6, decisões | Quem precisa dela, com o dono. | Escreve-se na hora, não no final do dia. |
| 7 a 12, o ciclo | Cada um, com o seu agente, sobre a sua pendência. | Antes de integrar: trazer, rodar tudo, subir. O que está pela metade, atrás de um interruptor. O relatório (12) é lido por outro. |
| 9, qualidade | Uma só configuração para todos. | Ninguém tem exceções próprias ao linter. |
| 10, casos de teste manual | Escreve-os o dono da pendência; executa-os outro. | Quem não construiu a funcionalidade é quem melhor a prova. |
| 11, simetria | Quem toca um contrato atualiza os consumidores, sejam de quem forem. | O mapa é o detector de conflitos. |
| 13, auditoria | Uma sessão distinta de todas as que construíram. | Em equipe é mais fácil: o auditor é quem não tocou nesse módulo. |
| 14 a 20, saída | O líder coordena; cada degrau tem um responsável. | Uma pessoa promove para produção; os demais não. |
| 21 a 23, operação | Um responsável pelo monitoramento por ciclo, rotativo. | O relatório cíclico é lido pela equipe inteira; as pendências que saem dele se reivindicam como qualquer outra. |

## Os prompts

**Antes de enviar o prompt**, isto tem que existir, e quem faz é você (ou o líder da equipe), não
o agente:

- `docs/WORKING_AGREEMENT.md` (degrau 1), fechado, um só para a equipe, com a lista dos membros e
  os seus nomes de usuário no repositório.
- `docs/PENDING.md` (degrau 5) com o campo "reivindicado por" e "módulos que toca" em cada
  pendência, ainda que estejam vazios.
- A decisão da equipe sobre o interruptor de funcionalidade: onde se declara (a configuração do
  servidor, um arquivo) e como se nomeia, escrita em `PROJECT.md`.
- A cadeia de integração (degraus 4 e 15) com a bateria e a comporta de qualidade (9) como
  condição de fusão no ramo compartilhado, configurada na plataforma do repositório (ninguém pode
  subir com a cadeia em vermelho).
- Estado mínimo aceitável: há um contrato único, as pendências têm os dois campos, e a plataforma
  recusa um push com a cadeia em vermelho.

**Rotina do ramo compartilhado (vai no contrato de convivência):**

> We work as a team on one shared branch, each person with their own agent session, and the only
> shared memory is what is written in the repository. Rules: (1) At the start of every session,
> read `docs/STATUS.md`, `docs/DECISIONS.md` and `docs/PENDING.md`; never touch a pending item
> claimed by someone else, and never take one that touches a module another claimed item touches.
> (2) Before every integration into the shared branch: pull the others' changes, run the full
> suite and the quality gate, and only then push; integrate several times a day, never at the end
> of the week. (3) Never push with the pipeline red; whoever turns it red fixes it before anything
> else or reverts. (4) Anything that cannot be finished and integrated today goes behind a feature
> switch, off by default, noted in the pending item. (5) Before touching a contract between parts
> (a service, a table, a list of values), look up its consumers in `docs/PRODUCER_CONSUMER_MAP.md`
> and update them in the same change, whoever owns them. (6) Every business decision goes to
> `docs/DECISIONS.md` the moment it is taken, with the person's name and the date. (7) Update
> `docs/STATUS.md` with what you are doing when you start and when you stop, so that the others'
> agents see it.
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
> Trabalhamos em equipe sobre um só ramo compartilhado, cada pessoa com a sua própria sessão de
> agente, e a única memória compartilhada é o que está escrito no repositório. Regras: (1) Ao
> começar cada sessão, leia `docs/STATUS.md`, `docs/DECISIONS.md` e `docs/PENDING.md`; nunca toque
> numa pendência reivindicada por outro, e nunca pegue uma que toque um módulo que outra pendência
> reivindicada toca. (2) Antes de cada integração ao ramo compartilhado: traga as mudanças dos
> demais, rode a bateria completa e a comporta de qualidade, e só depois suba; integre várias
> vezes por dia, nunca no final da semana. (3) Nunca suba com a cadeia em vermelho; quem a põe em
> vermelho a conserta antes de qualquer outra coisa ou reverte. (4) O que não puder ser terminado
> e integrado hoje vai atrás de um interruptor de funcionalidade, apagado por padrão, anotado na
> pendência. (5) Antes de tocar um contrato entre partes (um serviço, uma tabela, uma lista de
> valores), busque os seus consumidores em `docs/PRODUCER_CONSUMER_MAP.md` e atualize-os na mesma
> mudança, sejam de quem forem. (6) Toda decisão de negócio vai para `docs/DECISIONS.md` no
> momento em que é tomada, com o nome da pessoa e a data. (7) Atualize `docs/STATUS.md` com o que
> você está fazendo ao começar e ao terminar, para que os agentes dos demais o vejam. Responda no
> meu idioma.
>
> Quando você precisar de uma decisão minha, peça-a com as quatro partes da UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e nesta ordem: os dados que tornam a pergunta necessária,
> enumerados; um parágrafo de no máximo cinco linhas que os ligue e deixe ver a dúvida; a pergunta
> com as suas respostas possíveis enumeradas; e a sua recomendação. Diga-o na profundidade técnica
> que o projeto declarou em `communication_depth` —`beginner`, `decision_maker` ou `technical`—;
> se o projeto não declarou nenhuma, use `decision_maker`.

O que estou pedindo: as sete regras feitas rotina do agente, porque o agente não vê os outros
agentes e só vai cumprir o que ler; a leitura obrigatória ao começar a sessão, que é o que
substitui a conversa de corredor; a integração pequena e frequente com a bateria como condição; o
interruptor para o que está pela metade; o mapa como detector de conflitos; e o estado vivo
escrito na hora.

**Ao reivindicar uma pendência:**

**Antes de enviar o prompt**, você tem que ter isto à mão:

- A pendência que você quer pegar, escolhida por você do backlog, e uma olhada nas reivindicadas
  por outros: alguma toca o mesmo módulo?
- O seu nome de usuário no repositório, o que vai ficar no campo "reivindicado por".
- Estado mínimo aceitável: você sabe que módulos a sua pendência toca e que ninguém os tem
  reivindicados.

> I am taking pending item [PND-NNN]. Before anything: list the pending items claimed by others
> and tell me whether any of them touches the same modules as mine, by the "modules it touches"
> field and by the producer-consumer map; if there is an overlap, stop and tell me, do not start.
> If there is none, write my name in the "claimed by" field with today's date, write in
> `docs/STATUS.md` what I am starting, re-read the item's specification, and tell me which
> contracts of the map this item will touch and who consumes them.
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
> Pego a pendência [PND-NNN]. Antes de tudo: liste as pendências reivindicadas por outros e
> diga-me se alguma toca os mesmos módulos que a minha, pelo campo "módulos que toca" e pelo mapa
> produtor-consumidor; se houver sobreposição, pare e diga-me, não comece. Se não houver, escreva
> o meu nome no campo "reivindicado por" com a data de hoje, escreva em `docs/STATUS.md` o que
> estou começando, releia a especificação da pendência, e diga-me que contratos do mapa esta
> pendência vai tocar e quem os consome.
>
> Quando você precisar de uma decisão minha, peça-a com as quatro partes da UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e nesta ordem: os dados que tornam a pergunta necessária,
> enumerados; um parágrafo de no máximo cinco linhas que os ligue e deixe ver a dúvida; a pergunta
> com as suas respostas possíveis enumeradas; e a sua recomendação. Diga-o na profundidade técnica
> que o projeto declarou em `communication_depth` —`beginner`, `decision_maker` ou `technical`—;
> se o projeto não declarou nenhuma, use `decision_maker`.
>
> Responda no meu idioma.

O que estou pedindo: a verificação de sobreposição antes de começar, que é o momento barato de
evitar um conflito; a reivindicação escrita; e a lista de consumidores que vou tocar, para saber
desde o princípio a quem estou mudando alguma coisa.

**Ao integrar:**

**Antes de enviar o prompt**, você tem que ter isto à mão:

- A pendência com a sua rotina de fechamento feita ou, se estiver pela metade, o interruptor
  anotado.
- A certeza de que o ramo compartilhado está em verde agora mesmo (se estiver em vermelho,
  primeiro se conserta isso, seja de quem for).
- Estado mínimo aceitável: você sabe se integra algo terminado ou algo pela metade atrás de um
  interruptor.

> We are going to integrate into the shared branch. Pull the others' changes first and tell me
> what came in and whether anything touches my modules. Resolve conflicts, if any, by reading
> both sides and asking me when a business rule is involved; never by keeping mine. Run the full
> suite, the quality gate and, if this is an inherited system, the characterization suite, and
> show me the counts. If anything is red, stop: tell me what and whose change it comes from. If
> this item is not finished, confirm the feature switch is off by default and say so in the
> commit message. Then push, show me the pipeline green on the shared branch, and update
> `docs/STATUS.md` and the pending item.
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
> Vamos integrar ao ramo compartilhado. Traga primeiro as mudanças dos demais e diga-me o que
> entrou e se algo toca os meus módulos. Resolva os conflitos, se houver, lendo os dois lados e
> perguntando-me quando houver uma regra de negócio em jogo; nunca ficando com o meu. Rode a
> bateria completa, a comporta de qualidade e, se for um sistema herdado, a bateria de
> caracterização, e mostre-me os números. Se algo estiver em vermelho, pare: diga-me o quê e de
> que mudança de quem vem. Se esta pendência não estiver terminada, confirme que o interruptor
> está apagado por padrão e diga-o na mensagem do commit. Depois suba, mostre-me a cadeia em verde
> sobre o ramo compartilhado, e atualize `docs/STATUS.md` e a pendência.
>
> Quando você precisar de uma decisão minha, peça-a com as quatro partes da UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e nesta ordem: os dados que tornam a pergunta necessária,
> enumerados; um parágrafo de no máximo cinco linhas que os ligue e deixe ver a dúvida; a pergunta
> com as suas respostas possíveis enumeradas; e a sua recomendação. Diga-o na profundidade técnica
> que o projeto declarou em `communication_depth` —`beginner`, `decision_maker` ou `technical`—;
> se o projeto não declarou nenhuma, use `decision_maker`.
>
> Responda no meu idioma.

O que estou pedindo: trazer antes de subir; resolver os conflitos lendo os dois lados e não
"ganhando" (o reflexo do modelo diante de um conflito é ficar com a sua versão); a bateria como
condição; a cadeia em verde sobre o ramo compartilhado como evidência, e não na máquina do
agente; e o estado vivo em dia.

## Verificação de completude (quem a faz é o líder, sem ler código)

- Pegue três pendências fechadas esta semana: foram fechadas por alguém diferente do seu dono,
  lendo o relatório?
- Quantas vezes por dia se integrou ao ramo compartilhado? Peça o histórico; se for uma vez por
  semana, a regra 2 não se cumpre.
- Houve um conflito esta semana? Como se resolveu, e há uma pendência do mapa por causa disso?
- Há alguma funcionalidade pela metade sem interruptor no ramo compartilhado?
- `docs/STATUS.md` diz o que cada um está fazendo hoje?

## Sinais de alerta

- Cada desenvolvedor tem o seu próprio contrato de convivência "porque trabalha diferente". Os
  agentes vão seguir regras diferentes sobre o mesmo código.
- As integrações se acumulam para a sexta-feira. É a floresta de ramos, sem os ramos.
- Alguém lê o código do colega para aprovar a sua pendência. O método se degradou a revisão de
  código, que é o que o modelo faz pior do que a evidência.
- Um conflito se resolveu "ficando com a versão mais nova". Uma regra de negócio se perdeu sem
  que ninguém o decidisse.
- O agente de uma pessoa fechou uma pendência reivindicada por outra. A leitura ao começar a
  sessão não está no contrato, ou o contrato não se lê.

## O que falta elaborar `[hipótese]`

1. Estas regras vêm da prática conhecida da indústria sobre ramos compartilhados e do que o
   método exige; não as provei com uma equipe de vários agentes trabalhando ao mesmo tempo. A
   primeira equipe que as usar vai corrigi-las, e a retrospectiva (23) tem que perguntar quantos
   conflitos houve e quantos poderiam ter sido evitados com o mapa.
2. Não sei quantas pessoas um ramo compartilhado aguenta com o método antes de que seja preciso
   outra forma de trabalho. A minha intuição é que mais do que aguentava sem o método, porque a
   pendência especificada e o mapa tiram metade dos motivos de conflito.
3. No Forge, o registro de pendências nativo e o grafo de conhecimento fazem a reivindicação e a
   detecção de sobreposição sozinhos; nas outras ferramentas faz-se à mão com os campos da
   pendência. Ainda não provei quanto isso muda na prática.
