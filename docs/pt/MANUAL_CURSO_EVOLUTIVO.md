# Urazuke — o curso, parte 2: o projeto herdado. Normalizar um sistema que não nasceu com o método, e depois evoluí-lo

Autor: Pablo Kuschniroff, assistido por Claude Code. Versão 1, 18 de outubro de 2026. Esta é a
segunda parte do [manual do curso](MANUAL_CURSO.md): dá por feito que você fez a primeira, ou pelo
menos que leu as lições 0 a 8, porque aqui não volto a explicar o que é uma pendência, um teste em
vermelho ou uma árvore semântica. O método desta parte está na página do
[caminho evolutivo-corretivo](EVOLUTIVO_CORRECTIVO.md); aqui está a prática, com um segundo
projeto-guia. As palavras estranhas, no glossário do documento principal; os casos reais, nas
[referências](REFERENCIAS.md). Repositório público:
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## Antes de começar

### Para quem é esta parte

Para quem fez a primeira parte e descobriu que, na vida real, quase nunca lhe dão uma pasta vazia.
Dão-lhe um sistema que já roda, com usuários que dependem dele, e lhe pedem "conserte isto" ou
"acrescente aquilo". E também para quem "vibecodou" algo há uns meses, funcionou, e agora tem que
continuar construindo em cima disso sem que caia. Os dois estão no mesmo lugar: com um legado,
mesmo que um dos dois o tenha escrito.

### O que você vai ter no final

O mesmo sistema que você herdou, fazendo o mesmo que fazia, mas com tudo o que o método dá por
suposto em volta: um contrato de convivência com as regras do legado, o mapa recuperado do sistema
com as marcas de onde saiu cada afirmação, a lista de discrepâncias entre o que o código faz e o
que o negócio acredita, uma auditoria convertida em backlog com marcas de velocidade, um ambiente
de teste com dados anonimizados, uma implantação que se repete, os segredos fora do código e
rotacionados, uma bateria de caracterização que vigia os fluxos críticos, cadeados sobre o que já
age sobre o mundo, o dimensionamento com números medidos, e um backlog onde a dívida e o pedido do
cliente convivem, emparelhados por módulo. E depois, o primeiro bug corrigido com o seu teste em
vermelho e a primeira funcionalidade nova construída com o método completo.

### A ordem desta parte

| Etapa | Lições | O que você faz além |
|---|---|---|
| 1 | N0, N1, N2, N3 | **Leitura.** Nada se muda. Você percorre a árvore recuperada com o dono, decide as discrepâncias uma por uma, lê a auditoria. No fechamento: o mapa e o inventário de dívida. |
| 2 | N4, N5 | **O cinto.** Ambiente de teste com dados anonimizados, implantação duas vezes, segredos rotacionados, bateria de caracterização com o seu vermelho por mutação. Cadeados confirmados sobre o que já age. No fechamento: o sistema roda em teste e a bateria está em verde. |
| 3 | N6, N7, R1 | **Medir, ordenar, corrigir.** Dimensionamento medido. O backlog com as duas marcas. O primeiro bloco: o bug conhecido, fechado em modo corretivo com os seus emparelhados. |
| 4 | R2 | **Evoluir.** O segundo bloco: a funcionalidade nova, construída com o método completo (lições 5 a 12 da primeira parte), com a caracterização como regressão. |
| 5 e 6 | 13, 14, 15, 20, 16, 17, 18, 19 da primeira parte | **Saída para produção.** Auditoria periódica, cadeados restantes, fechamento do caminho para produção, os três manuais (que o legado não tinha), e os quatro degraus de qualidade operacional prévios à implantação: observabilidade completa, persistência com o que N6 mediu, varredura de vulnerabilidades como comporta, teste de carga com o ponto de ruptura. |
| 7 | 23, 21, 22 da primeira parte | **Operação.** Os dois monitoramentos montados com a implantação, com a primeira leitura como linha base do legado; agente residente; retrospectiva com a pergunta própria do legado: quanto custou normalizar. |

### O projeto-guia: "Turnera herdada"

É o mesmo consultório da primeira parte, dois anos depois e em outra linha do tempo: nunca fizeram
a Turnera com o método. Em vez disso, o sobrinho da encarregada fez para eles, num verão, uma
aplicação web, "Turnos", que funciona desde então. Hoje tem duas recepcionistas e três
profissionais usando-a todos os dias, umas vinte mil consultas registradas, e ninguém que a
entenda inteira: o sobrinho foi morar fora e responde uma mensagem a cada duas semanas.

**O que há.** Um repositório no GitHub com o código (um único ramo, commits com mensagens do tipo
"ajustes"), um banco de dados no mesmo servidor onde roda a aplicação, a implantação à mão
copiando arquivos por FTP, a senha do banco escrita no código, nenhum teste, um processo agendado
no servidor que manda os lembretes todas as noites, e uma planilha que a encarregada baixa todos
os meses conectando-se ao banco com uma ferramenta de desktop. Há uma cópia de segurança
"automática" que ninguém restaurou nunca.

**O que dói.** Duas coisas. A primeira, um bug: às vezes um paciente recebe o lembrete duas vezes,
e às vezes nenhuma; a encarregada não sabe quando acontece, mas tem capturas de pacientes
reclamando. A segunda, o que falta: querem pedir um sinal por link de pagamento para certas
consultas, e querem ver quantas consultas, faltas e cancelamentos houve no mês sem baixar a
planilha.

**O dono.** A mesma encarregada: critério sobre o negócio, quinze minutos por dia, não lê código.
E uma novidade que importa: ela acredita que o sistema faz coisas que não faz, e não sabe de
coisas que o sistema de fato faz. Isso é normal num legado, e é o que a lição N2 vai trazer à luz.

**Os fluxos críticos**, nas palavras dela: "registro uma consulta", "cancelo uma consulta", "o
lembrete chega", "procuro um paciente", "baixo a planilha do mês". São cinco; serão a bateria de
caracterização.

Com isto basta. Todo o resto está no sistema, e é o agente que vai lê-lo.

---

## Trecho de normalização: lições N0 a N7

Estas oito lições são o trecho que a primeira parte não tinha. As quatro primeiras são de leitura:
nada se muda, e a tentação de mudar algo vai ser enorme. As duas seguintes montam o cinto. As duas
últimas medem e ordenam. Só depois se toca em funcionalidade.

### Lição N0 — Elegibilidade de um sistema existente: pré-requisitos que o agente verifica fazendo

**O que você tem que entender.** Na lição 0 os critérios eram respondidos pelo levantamento. Aqui
há um sistema, e então os critérios podem ser **verificados fazendo**, pelo agente, sem que
ninguém opine: ele consegue montar um ambiente completo com fontes, dados e persistência?
Consegue entender o código? Consegue escrever, só a partir do código, um documento que descreva
toda a funcionalidade e que a encarregada reconheça como o seu sistema? Consegue operar as telas
com uma ferramenta de teste e rodar um teste de ponta a ponta? Constrói-se com as ferramentas de
hoje? Os dados podem ser copiados e anonimizados, e há uma cópia de segurança que foi restaurada?
As integrações têm modo de teste? São sete pré-requisitos, e a regra nova é que um vermelho não
é um "não vai": é um **projeto prévio**, com o seu próprio alcance, para que o sistema se torne
elegível.

**Antes de enviar o prompt**, com as suas mãos:

- `docs/INITIAL_SURVEY.md`, curto: o que a Turnos faz e para quem segundo a encarregada, o que dói
  (o lembrete duplicado, o que falta), quem a fez e quanto demora para responder, onde roda, quem
  tem acesso, e que há uma cópia de segurança "automática" que ninguém restaurou. Meia página.
- `docs/ELIGIBILITY_CRITERIA.md`: a ficha da lição 0 mais os sete pré-requisitos do legado
  (copie-os da página do caminho evolutivo-corretivo, estação N0), com três colunas vazias: verde
  ou vermelho, evidência, projeto prévio.
- Acesso de leitura ao repositório, uma cópia do banco (ou produção em somente leitura) e um
  lugar onde o agente possa tentar levantar o sistema (a sua máquina basta para o curso), com as
  credenciais fora do chat.

1. Cole o prompt inicial da estação N0 (na página do caminho evolutivo-corretivo), tal como está.
2. Vai demorar: ele tem que montar o ambiente, ler tudo, escrever
   `docs/FUNCTIONALITY_RECOVERED.md` e rodar um teste. Quando terminar, leia esse documento com a
   encarregada: ele descreve o sistema que ela acredita ter? O que não coincidir, anote: é a
   primeira lista de discrepâncias.
3. Olhe a ficha: cada pré-requisito tem que ter evidência de algo que o agente fez, e não uma
   resposta sua.

**Antes de enviar o prompt** de fechamento: a sua decisão em uma linha e, para cada vermelho, se
o projeto prévio se encara agora, depois, ou nunca.

4. Cole o prompt de fechamento da estação N0.

**Verificação de completude.** Cada pré-requisito tem evidência feita, e não dita? Existe o
documento de funcionalidade recuperada e a encarregada o reconheceu? Rodou um teste de ponta a
ponta real? Cada vermelho tem o seu projeto prévio como pendência bloqueante?

**Entrega.** `docs/ELIGIBILITY.md`, `docs/FUNCTIONALITY_RECOVERED.md`, e as pendências
bloqueantes dos projetos prévios, se houver.

**Erros típicos.** Aceitar um verde que o agente respondeu sem fazer ("sim, o código é
entendível"). E tratar um vermelho como recusa: o método pede um projeto prévio, não uma
desistência.

**No projeto-guia.** O agente monta a Turnos na sua máquina com uma cópia do banco (verde),
entende o código salvo um módulo de relatórios escrito numa linguagem de modelos velha (verde,
com nota), escreve o documento de funcionalidade e a encarregada descobre ali duas coisas que não
sabia que o sistema fazia (verde: o documento é melhor do que a memória dela), opera quatro das
seis telas e roda um teste do fluxo de cadastro (vermelho: duas telas não operáveis, projeto
prévio: "tornar operáveis o calendário e a busca"), constrói com as ferramentas de hoje salvo
uma dependência morta do gerador de PDF (vermelho: projeto prévio pequeno), copia e anonimiza os
dados (verde) mas a cópia de segurança nunca foi restaurada (vermelho: restaurá-la é o projeto
prévio mais barato de todos), e o provedor de mensagens tem modo de teste (verde). Decisão: vai,
depois de três projetos prévios pequenos.

### Lição N1 — O contrato de convivência para um legado

**O que você tem que entender.** Às seis regras da lição 1 acrescentam-se cinco que existem porque
um modelo diante de código alheio faz três coisas por reflexo: reordena-o, "conserta-o" onde lhe
parece errado, e supõe que o que o código faz diferente do que ele esperaria é um erro. As regras
do legado bloqueiam esses reflexos: não se refatora o que não foi pedido, lê-se antes de tocar, o
estranho se anota em vez de consertar, o comportamento atual é a especificação até que o dono diga
outra coisa, e nada entra sem a caracterização em verde.

**Antes de enviar o prompt**, com as suas mãos:

- As suas preferências de trabalho, como na lição 1, e uma decisão a mais: quanto risco você
  aceita enquanto se normaliza. Para o curso: o agente pode implantar no ambiente de teste
  sozinho; em produção, nunca, até a lição 15.
- `docs/ELIGIBILITY.md` fechado.

1. Cole este prompt:

> Before we touch anything, we are going to set the working agreement between you and me for a
> system that already exists and has users. Write `docs/WORKING_AGREEMENT.md` with the six rules
> of the method (my time is sacred; zero technical debt; exact scope; documentation in the same
> commit; never report as done what you have not verified; speak my language), each with one line
> explaining what it prevents, and these five rules for an inherited system: (7) Nothing is
> refactored that was not asked for, and no module is rewritten. (8) Code you do not understand
> is read before it is touched, and what you learn goes into the system map. (9) Anything strange
> you find (a secret in the code, a dead path, a duplicated rule, a query without an index) is
> logged as a pending item with its evidence, never fixed in passing. (10) Current behaviour is
> the specification until the owner says otherwise: a difference between what the code does and
> what the business says is a discrepancy for me to decide, not a bug for you to fix silently.
> (11) No change reaches the test environment without the characterization suite green. Add any
> rules you think this system needs, marked as proposals. If you need to know something about how
> I work in order to write this, ask me.

> [pt]
> Antes de tocar em nada, vamos fixar o contrato de convivência entre você e eu para um sistema
> que já existe e tem usuários. Escreva `docs/WORKING_AGREEMENT.md` com as seis regras do método
> (o meu tempo é sagrado; zero dívida técnica; escopo exato; documentação no mesmo commit; nunca
> relatar como feito o que você não verificou; fale o meu idioma), cada uma com uma linha que
> explique o que ela evita, e estas cinco regras para um sistema herdado: (7) Não se refatora nada
> que não tenha sido pedido, e não se reescreve nenhum módulo. (8) O código que você não entende é
> lido antes de ser tocado, e o que você aprende vai para o mapa do sistema. (9) Qualquer coisa
> estranha que você encontre (um segredo no código, um caminho morto, uma regra duplicada, uma
> consulta sem índice) é registrada como pendência com a sua evidência, nunca consertada de
> passagem. (10) O comportamento atual é a especificação até que o dono diga outra coisa: uma
> diferença entre o que o código faz e o que o negócio diz é uma discrepância que eu decido, não
> um bug que você conserta em silêncio. (11) Nenhuma mudança chega ao ambiente de teste sem a
> bateria de caracterização em verde. Acrescente as regras que você achar que este sistema
> precisa, marcadas como propostas. Se você precisa saber algo sobre como eu trabalho para
> escrever isto, pergunte-me.

2. Leia as propostas. Se uma diz "modernizar o código à medida que se toca", rejeite-a com razão:
   é a reescrita disfarçada.

**Antes de enviar o prompt** de fechamento: o seu veredito sobre cada proposta, com razão de uma
linha, para as lacunas do prompt.

3. Feche com o prompt de fechamento da lição 1, sem mudanças.

**Verificação de completude.** Estão as onze regras, cada uma com a falha que evita? Há alguma
proposta que habilite refatorar ou reescrever?

**Entrega.** `docs/WORKING_AGREEMENT.md` com data e versão.

**Erros típicos.** Aceitar uma regra de "limpeza progressiva" porque soa razoável. Soa razoável e
é a forma como o agente se autoriza a mudar o que não lhe pediram.

**No projeto-guia.** O agente propõe duas regras próprias que vale aceitar: "neste sistema nenhum
envio real sai do ambiente de teste: os lembretes em teste vão para uma caixa falsa", e "a
planilha mensal que a encarregada baixa é um consumidor do sistema e conta como contrato". A
segunda é o mapa produtor-consumidor aparecendo antes da hora, e está bem.

### Lição N2 — A leitura do sistema: o mapa recuperado e as discrepâncias

**O que você tem que entender.** É a lição que mais valor dá por hora de todo o curso. Na lição 2
o arquivo de projeto e a árvore saíam do levantamento; aqui saem do próprio sistema, e cada
afirmação leva uma marca de onde saiu: `[código]`, `[base]`, `[configuração]`, `[documentação]`,
`[negócio]` ou `[inferido]`. As marcas são o que lhe permite verificar sem ler código: você olha o
inferido e o confirma ou o corrige. E aparece um documento novo, a lista de discrepâncias: tudo o
que não coincide entre o que o código faz, o que o banco impõe e o que o negócio acredita. Não se
resolvem sozinhas: cada uma é uma decisão sua com data. Um legado sempre tem discrepâncias; se a
lista sai vazia, o agente não comparou.

**Antes de enviar o prompt**, com as suas mãos e com o dono:

- Acesso de leitura para o agente a tudo: o repositório inteiro, o esquema do banco (somente
  leitura, credencial fora do chat), a configuração do servidor com os valores dos segredos
  tapados, os logs recentes, e o que houver de documentação (na Turnos, um e-mail do sobrinho com
  "como subir mudanças").
- Em `docs/INITIAL_SURVEY.md`, uma seção nova escrita com a encarregada: **o que ela acredita que
  o sistema faz**, caso de uso por caso de uso, e as regras de que ela se lembra ("uma consulta
  não pode ser cancelada com menos de duas horas", "o lembrete sai às oito da noite"). Não
  verifique isso contra o sistema: essa comparação é o trabalho do agente.
- A lista do que vive fora do repositório: o processo agendado dos lembretes e a planilha mensal
  que se conecta ao banco.
- `docs/WORKING_AGREEMENT.md` fechado.

1. Cole este prompt:

> We are going to recover the map of this system from what exists. Read the whole repository
> (every branch), the database schema (read-only), the configuration of each environment, the
> recent logs and whatever documentation there is; if some part cannot be read from where you are,
> tell me and mark it as a gap; do not fill it by guessing. Then write three things. First,
> complete `docs/INITIAL_SURVEY.md` in the form the method expects (what the system does and for
> whom; what it does NOT do; who uses it; the technology; the environments; what an error costs),
> with every statement tagged by its source: [code], [database], [configuration], [documentation],
> [business] for what the survey already says, or [inferred]. Second, `PROJECT.md`, three hundred
> lines at most, and `docs/SEMANTIC_TREE.md`: the domains and, under each one, the actors, the
> processes (each with trigger, steps, outcome and exceptions as the code actually implements
> them), the entities with the attributes, states and transitions the database and the code
> enforce, the screens, the external integrations and the scheduled jobs; every node tagged the
> same way. Third, `docs/DISCREPANCIES.md`: everything where the code, the database, the
> documentation and what the business says in the survey do not agree, with the evidence on each
> side. Do not resolve any discrepancy and do not fix anything: list them. Create `docs/STATUS.md`
> for the living state. Reply in my language.

> [pt]
> Vamos recuperar o mapa deste sistema a partir do que existe. Leia o repositório inteiro (todos
> os ramos), o esquema do banco de dados (somente leitura), a configuração de cada ambiente, os
> logs recentes e a documentação que houver; se alguma parte não puder ser lida de onde você está,
> diga-me e marque-a como lacuna; não a preencha adivinhando. Depois escreva três coisas.
> Primeiro, complete `docs/INITIAL_SURVEY.md` na forma que o método espera (o que o sistema faz e
> para quem; o que NÃO faz; quem o usa; a tecnologia; os ambientes; quanto custa um erro), com
> cada afirmação marcada pela sua fonte: [código], [base], [configuração], [documentação],
> [negócio] para o que o levantamento já diz, ou [inferido]. Segundo, `PROJECT.md`, de trezentas
> linhas no máximo, e `docs/SEMANTIC_TREE.md`: os domínios e, sob cada um, os atores, os processos
> (cada um com gatilho, passos, resultado e exceções tal como o código de fato os implementa), as
> entidades com os atributos, estados e transições que o banco e o código impõem, as telas, as
> integrações externas e os processos agendados; cada nó marcado da mesma forma. Terceiro,
> `docs/DISCREPANCIES.md`: tudo aquilo em que o código, o banco, a documentação e o que o negócio
> diz no levantamento não coincidem, com a evidência de cada lado. Não resolva nenhuma
> discrepância e não conserte nada: liste-as. Crie `docs/STATUS.md` para o estado vivo. Responda
> no meu idioma.

   Você está pedindo a ele que leia tudo e declare o que não pôde ler, o levantamento e a árvore
com marcas, os processos como o código os implementa (não como deveriam ser), os processos
agendados, e as discrepâncias listadas sem resolver.

2. Percorra a árvore com a encarregada, nó por nó. Cada `[inferido]` se confirma ou se corrige.
   Cada `[código]` se compara com o que ela acredita: onde não coincide, há uma discrepância que
   talvez o agente já tenha listado, e se não listou, você a acrescenta.
3. Decida cada discrepância com ela, em uma linha, com a data. Há três respostas possíveis: "o
   sistema está certo, o negócio tinha esquecido" (confirma-se como regra), "o sistema está
   errado, é preciso mudá-lo" (abre-se uma pendência), ou "não sei, vemos depois" (fica aberta com
   data; não demasiadas).

**Antes de enviar o prompt** de fechamento: a lista de nós confirmados e corrigidos, e a lista de
discrepâncias com a sua decisão e a data, uma linha cada uma.

4. Feche com:

> I confirm these nodes: [list]. Correct these: [list]. The discrepancies are decided as follows:
> [one line each: discrepancy, my decision, today's date]. Finalize `docs/INITIAL_SURVEY.md`,
> `PROJECT.md` and `docs/SEMANTIC_TREE.md` with today's date, keeping the source tags. Write each
> discrepancy decision in `docs/DECISIONS.md` with my exact words, and open a pending item in
> `docs/PENDING.md` for every discrepancy where I decided the system must change; for the ones
> where I decided the current behaviour stays, write it next to the node as a confirmed rule. Add
> to `PROJECT.md` the instruction to read this file, the tree and the working agreement at the
> start of every session.

> [pt]
> Confirmo estes nós: [lista]. Corrija estes: [lista]. As discrepâncias se decidem assim: [uma
> linha cada uma: discrepância, a minha decisão, a data de hoje]. Feche `docs/INITIAL_SURVEY.md`,
> `PROJECT.md` e `docs/SEMANTIC_TREE.md` com a data de hoje, conservando as marcas de fonte.
> Escreva cada decisão sobre uma discrepância em `docs/DECISIONS.md` com as minhas palavras
> exatas, e abra uma pendência em `docs/PENDING.md` para cada discrepância em que eu decidi que o
> sistema tem que mudar; nas que eu decidi que o comportamento atual fica, escreva-o junto ao nó
> como regra confirmada. Acrescente a `PROJECT.md` a instrução de ler este arquivo, a árvore e o
> contrato de convivência ao começar cada sessão.

5. **A prova de leitura**, como na lição 2: sessão nova, sem contexto, "o que este sistema NÃO
   faz? que processo roda sozinho de noite?". Ele tem que responder com o mapa.

**Verificação de completude.** Há nós marcados `[inferido]`? (Se não há nenhum, o agente não
distingue o que leu do que supôs.) Há pelo menos um processo agendado na árvore? A lista de
discrepâncias tem mais de zero? Cada uma tem decisão com data ou ficou aberta de propósito? As
marcas sobreviveram ao fechamento? Passou a prova de leitura?

**Entrega.** `docs/INITIAL_SURVEY.md` completo com marcas, `PROJECT.md`, `docs/SEMANTIC_TREE.md`,
`docs/DISCREPANCIES.md` decidido, `docs/DECISIONS.md` com as decisões, `docs/STATUS.md`.

**Erros típicos.** Resolver as discrepâncias "consertando o código para que faça o que a
encarregada diz", sem decidi-las uma por uma: várias dessas discrepâncias são regras que o negócio
esqueceu e o código lembrava. E deixar que o agente apague as marcas no fechamento "para que fique
mais limpo": uma árvore sem marcas já não se pode verificar.

**No projeto-guia.** A árvore da Turnos tem o domínio Agenda que a encarregada esperava, e duas
coisas que não: um estado de consulta "reagendada" que existe no banco e que nenhuma tela mostra
`[base]`, e um processo agendado que, além de mandar lembretes, apaga as consultas canceladas com
mais de um ano `[código]`; a encarregada não sabia que eram apagadas. As discrepâncias típicas são
oito: a regra das duas horas para cancelar não existe no código (cancela-se sempre); o lembrete
sai às oito segundo ela e às sete segundo a configuração; o telefone do paciente não é obrigatório
no banco mesmo que ela acredite que sim; e assim por diante. A do apagamento é a que mais a
surpreende, e ela a decide num minuto: "isso não se apaga mais". Pendência.

### Lição N3 — A auditoria como inventário da dívida

**O que você tem que entender.** A lição 13, mas no começo em vez de no final, e com um campo a
mais por achado: se bloqueia (é preciso consertar antes de qualquer mudança), se se paga ao tocar
o módulo, ou se pode esperar. Sem esse campo, um legado auditado tem quarenta achados e ninguém
sabe por qual começar. O que bloqueia é você que decide, não o auditor: em geral, um segredo
exposto, uma tela que não pode ser operada, uma implantação que não pode ser repetida, a falta de
cópia de segurança, e o que puder danificar dados ou cobrar a mais.

**Antes de enviar o prompt**, com as suas mãos:

- Uma sessão nova do agente, com um clone limpo e um arquivo de instruções que diga "você é um
  auditor; não leu nem vai tocar este sistema". Acesso de somente leitura ao banco e ao servidor.
- `PROJECT.md`, `docs/SEMANTIC_TREE.md` e `docs/DISCREPANCIES.md` de N2, para que ele não
  redescubra o que está escrito.
- O seu critério do que bloqueia, em duas linhas, para a lacuna do prompt. Para a Turnos: segredo
  exposto, tela não operável, implantação não repetível, sem cópia de segurança testada, qualquer
  coisa que apague ou mande sem controle.

1. Cole este prompt:

> Audit this system for integrity, security, performance, code quality and deployability, as the
> inventory of what must be normalized before and during its evolution. Read-only: change nothing
> except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires access you
> lack (the database, the logs, the server), tell me and mark that part as not audited; do not
> pass it as fine. Go through all of the code, not a sample, and read `docs/SEMANTIC_TREE.md` and
> `docs/DISCREPANCIES.md` first so that you do not report what is already known. For every
> finding: where it is (file and line), the risk, the evidence that proves it (the command, the
> query, the number), its priority (P0 must be fixed now, P1 soon, P2 when possible), and one more
> field: whether it BLOCKS (must be fixed before any change, by my criteria: [an exposed secret, a
> screen that cannot be driven by a program, a deployment that cannot be repeated, no tested
> backup, anything that deletes or sends without control]), whether it is PAID WHEN TOUCHED (fixed
> together with the first change that enters its module), or whether it CAN WAIT. Grade every
> dimension you audited. End with every finding turned into a proposed pending item, blocking
> ones first. Reply in my language.

> [pt]
> Audite este sistema em integridade, segurança, desempenho, qualidade de código e capacidade de
> implantação, como inventário do que é preciso normalizar antes e durante a sua evolução. Somente
> leitura: não mude nada salvo escrever o seu relatório em `docs/AUDIT_[fecha].md`. Se auditar
> alguma parte exigir um acesso que você não tem (o banco, os logs, o servidor), diga-me e marque
> essa parte como não auditada; não a dê por boa. Percorra todo o código, não uma amostra, e leia
> antes `docs/SEMANTIC_TREE.md` e `docs/DISCREPANCIES.md` para não reportar o que já se sabe. Para
> cada achado: onde está (arquivo e linha), o risco, a evidência que o prova (o comando, a
> consulta, o número), a sua prioridade (P0 é preciso consertar já, P1 em breve, P2 quando der), e
> um campo a mais: se BLOQUEIA (é preciso consertar antes de qualquer mudança, segundo o meu
> critério: [um segredo exposto, uma tela que não pode ser operada por programa, uma implantação
> que não pode ser repetida, sem cópia de segurança testada, qualquer coisa que apague ou mande
> sem controle]), se PAGA-SE AO TOCAR (conserta-se junto com a primeira mudança que entrar no seu
> módulo), ou se PODE ESPERAR. Dê uma nota a cada dimensão que você auditou. Termine com cada
> achado convertido em pendência proposta, os bloqueantes primeiro. Responda no meu idioma.

2. Leia o relatório. Escolha dois achados e peça a evidência. Revise as marcas de velocidade: você
   pode subir ou baixar qualquer uma, com razão.

**Antes de enviar o prompt** de fechamento: o relatório lido, os dois achados verificados, e a
sessão do construtor aberta (o fechamento vai para o construtor, não para o auditor).

3. Volte à sessão do construtor e cole o prompt de fechamento da lição 13, acrescentando-lhe no
   final: "Each pending item keeps the speed mark of its finding."

**Verificação de completude.** Ele diz o que não pôde auditar? Há pelo menos um "bloqueia"? Cada
achado tem arquivo, linha e evidência? Os bloqueantes já são pendências?

**Entrega.** `docs/AUDIT_[fecha].md` com marcas de velocidade, e as pendências bloqueantes
abertas.

**Erros típicos.** Tudo em "pode esperar", por um auditor que não quer incomodar. Ou tudo em
"bloqueia", por um dono assustado: então nada pode ser começado nunca. Entre três e oito
bloqueantes é o normal num sistema pequeno.

**No projeto-guia.** A auditoria da Turnos encontra, como bloqueantes: a senha do banco no código
(e no histórico do git, de modo que é preciso rotacioná-la, não só movê-la); a implantação por FTP
sem registro de que versão roda; o processo agendado que apaga consultas sem cadeado; as duas
telas não operáveis. Como "paga-se ao tocar": a busca de pacientes sem índice (módulo de
pacientes), a consulta da agenda do dia que faz uma consulta por consulta marcada (módulo de
agenda), o envio de lembretes sem idempotência (módulo de mensagens; é a pista do bug). Como "pode
esperar": uma dependência velha sem vulnerabilidade conhecida, e o código duplicado do formato de
data em três lugares.

### Lição N4 — O cinto de segurança

**O que você tem que entender.** É a comporta dura deste caminho: até que o cinto não esteja em
verde, não se muda uma linha de funcionalidade. O cinto tem cinco peças: um ambiente de teste com
dados anonimizados, uma implantação que se repete, os segredos fora do código e rotacionados, a
integração contínua rodando o que houver, e a bateria de caracterização. Esta última é a lição 8
ao contrário: o teste nasce em verde, porque captura o que o sistema faz hoje, defeitos incluídos,
e a prova de que serve é que ele fica em vermelho quando você quebra o fluxo de propósito. Sem
esse vermelho por mutação, é um teste que passa porque não olha nada.

**Antes de enviar o prompt**, com as suas mãos e com o dono:

- `docs/ENVIRONMENTS_SURVEY.md`, que o agente redigiu em N2 com marcas e você completa: onde vai
  rodar o ambiente de teste (para o curso, um serviço gratuito ou um contêiner na sua máquina
  basta), como se implanta hoje, onde vão viver os segredos no servidor.
- A decisão de anonimização com a encarregada: nomes, telefones, e-mails e documentos dos
  pacientes se substituem por valores falsos; as datas e as quantidades se conservam. É uma
  obrigação legal, não um detalhe técnico.
- A lista de fluxos críticos para a caracterização: os cinco da encarregada.
- A cópia de segurança restaurada na sua máquina (a condição de N0). Se você não fez isso, faça
  agora: o agente vai copiar o banco de produção e você precisa saber que há caminho de volta.
- Acesso do agente ao servidor em somente leitura e ao lugar do ambiente de teste com escrita,
  credenciais fora do chat.

1. Cole este prompt:

> We are going to build the safety belt around this system before changing anything in it. Read
> the environments survey, `docs/AUDIT_[date].md` and `docs/SEMANTIC_TREE.md`. Evaluate whether you
> have what is needed (read access to the server where it runs and to its database, write access
> to where the test environment will run, the way it is deployed today); if anything is missing,
> ask me before starting. Then set up, without touching any functionality: (1) a test environment
> that runs the system exactly as production does, with a copy of the data where the personal
> fields I listed are anonymized; (2) a reproducible deployment to that environment, run twice,
> showing me that the second run changed nothing; (3) every secret found in the repository or in
> the code moved to the server configuration (environment file or vault), with the list of what
> you moved so that I rotate each one; (4) continuous integration running whatever test suite
> exists today, even if it is a single smoke test, on every push; (5) `docs/GATES.md` with the
> gates of this project, including: nothing reaches the test environment without the
> characterization suite green, and nothing reaches production without the full suite green with
> the exact version. Document all of it in `docs/DEPLOYMENT.md` so that a person can do it by hand
> without you. Take a screenshot of the system running in the test environment and show it to me.
> Reply in my language.

> [pt]
> Vamos construir o cinto de segurança em volta deste sistema antes de mudar nada nele. Leia o
> levantamento de ambientes, `docs/AUDIT_[fecha].md` e `docs/SEMANTIC_TREE.md`. Avalie se você tem
> o necessário (acesso de leitura ao servidor onde ele roda e ao seu banco, acesso de escrita a
> onde vai rodar o ambiente de teste, a forma como se implanta hoje); se faltar algo, peça-me
> antes de começar. Depois monte, sem tocar em nenhuma funcionalidade: (1) um ambiente de teste
> que rode o sistema exatamente como a produção, com uma cópia dos dados em que os campos pessoais
> que eu listei estejam anonimizados; (2) uma implantação reproduzível nesse ambiente, rodada duas
> vezes, mostrando-me que a segunda rodada não mudou nada; (3) todo segredo encontrado no
> repositório ou no código movido para a configuração do servidor (arquivo de ambiente ou cofre),
> com a lista do que você moveu para que eu rotacione cada um; (4) a integração contínua rodando a
> bateria que exista hoje, mesmo que seja um único teste de fumaça, a cada push; (5)
> `docs/GATES.md` com as comportas deste projeto, incluídas: nada chega ao ambiente de teste sem a
> bateria de caracterização em verde, e nada chega à produção sem a bateria completa em verde com
> a versão exata. Documente tudo em `docs/DEPLOYMENT.md` de modo que uma pessoa possa fazê-lo à
> mão sem você. Tire uma captura do sistema rodando no ambiente de teste e mostre-me. Responda no
> meu idioma.

2. É uma tarefa longa, com idas e vindas. Quando ele lhe mostrar a captura, abra você a URL: tem
   que se ver a Turnos com dados. Procure um paciente real pelo nome: ele não pode estar lá.
3. Rotacione cada segredo da lista que ele lhe deu. Você, no painel que corresponder, hoje.

**Antes de enviar o prompt** da bateria: o ambiente de teste aberto por você, os segredos
rotacionados, e a lista dos cinco fluxos críticos para a lacuna do prompt.

4. Cole este prompt:

> We are going to write the characterization tests of these critical flows: [load an
> appointment; cancel an appointment; the reminder reaches the patient; search a patient; download
> the monthly sheet]. A characterization test captures what the system does today, exactly as it
> does it, defects included; it is not a test of what the system should do. For each flow: drive
> it from the screen as a user would and check the effect in the backend (the row, the state, the
> message queued). Every test must pass against the current code. Then prove that each test
> actually watches its flow: break the flow deliberately with a temporary change, show me the red
> output, revert the change, show me the green. If a flow cannot be driven from the screen, do not
> simulate it: say so and open a pending item marked as blocking. If while writing these tests you
> find behaviour that looks wrong, do not fix it: add it to `docs/DISCREPANCIES.md` with the
> evidence. Record the command to run the suite in `docs/STATUS.md`, and make the suite the gate
> for the test environment as `docs/GATES.md` says. Reply in my language.

> [pt]
> Vamos escrever os testes de caracterização destes fluxos críticos: [registrar uma consulta;
> cancelar uma consulta; o lembrete chega ao paciente; procurar um paciente; baixar a planilha do
> mês]. Um teste de caracterização captura o que o sistema faz hoje, exatamente como o faz,
> defeitos incluídos; não é um teste do que o sistema deveria fazer. Para cada fluxo: opere-o a
> partir da tela como um usuário faria e verifique o efeito no backend (a linha, o estado, a
> mensagem enfileirada). Todos os testes têm que passar contra o código atual. Depois demonstre
> que cada teste de fato vigia o seu fluxo: quebre o fluxo de propósito com uma mudança
> temporária, mostre-me a saída em vermelho, reverta a mudança, mostre-me o verde. Se um fluxo não
> puder ser operado a partir da tela, não o simule: diga-o e abra uma pendência marcada como
> bloqueante. Se, enquanto escreve estes testes, você encontrar um comportamento que parece
> incorreto, não o conserte: acrescente-o a `docs/DISCREPANCIES.md` com a evidência. Registre o
> comando para rodar a bateria em `docs/STATUS.md`, e faça com que a bateria seja a comporta do
> ambiente de teste como diz `docs/GATES.md`. Responda no meu idioma.

   Você está pedindo a ele o teste que nasce em verde e demonstra que serve ficando em vermelho
por mutação; nada de simular o que não se pode operar; e o que parece errado, anotado como
discrepância, não consertado.

5. As duas telas não operáveis (a pendência bloqueante de N0) se resolvem aqui, antes da bateria
   ou como parte dela: peça a ele que feche essa pendência com a rotina da lição 8, e que depois
   escreva os testes de caracterização desses fluxos.
6. Rode você a bateria com o comando de `docs/STATUS.md`. Tem que estar em verde.

**Verificação de completude.** Você abriu o ambiente de teste e não encontrou um nome real? A
implantação rodou duas vezes e a segunda não mudou nada? A busca de segredos no repositório veio
vazia, e você rotacionou os que ela encontrou? Cada um dos cinco fluxos tem o seu teste e o seu
vermelho por mutação à vista? Você mesmo rodou a bateria?

**Entrega.** O ambiente de teste rodando com dados anonimizados, `docs/DEPLOYMENT.md`,
`docs/GATES.md`, os segredos rotacionados, a integração contínua em verde, e a bateria de
caracterização em verde com os seus cinco vermelhos demonstrados.

**Erros típicos.** Deixar a bateria "para depois" e começar a consertar o bug: o cinto
pela metade é a causa número um de quebrar o que funcionava. Dados de teste "de exemplo" em vez da
cópia anonimizada: os bugs de um legado vivem nos dados reais (o lembrete duplicado da Turnos só
aparece com certos pacientes). E mover o segredo sem rotacioná-lo: ele estava no histórico do git;
já não é um segredo.

**No projeto-guia.** O teste de caracterização do lembrete é o mais interessante: captura que o
processo noturno manda uma mensagem por consulta do dia seguinte para a caixa falsa, e passa.
Enquanto o escreve, o agente nota que, se o processo for rodado duas vezes, manda duas vezes, e
anota isso como discrepância com a evidência. É a pista do bug, e ainda não se conserta: o
comportamento atual é a especificação até a lição R1. O vermelho por mutação: o agente comenta a
linha que enfileira a mensagem, o teste falha, descomenta, passa.

### Lição N5 — Cadeados e mapa produtor-consumidor a partir do código

**O que você tem que entender.** As lições 14 e 11, feitas por inventário sobre o que já existe,
antes de mudar nada. O agente vai encontrar no código mais do que o negócio se lembra que o
sistema faz para fora: envios, apagamentos, processos noturnos. A comparação entre as duas listas
é o resultado. E cada cadeado leva uma proposta de "agora" ou "ao tocar": um cadeado sobre algo
que manda mensagens vai agora; um sobre uma exportação mensal pode esperar o bloco que tocar esse
módulo.

**Antes de enviar o prompt**, com as suas mãos e com o dono:

- Em `docs/INITIAL_SURVEY.md`, a lista do que a encarregada **sabe** que o sistema faz para fora:
  manda lembretes, e nada mais, segundo ela.
- Acesso do agente às tarefas agendadas do servidor.
- A lista do que vive fora do repositório (a planilha mensal), para o mapa.
- O ambiente de teste de N4 rodando.

1. Cole este prompt:

> Go through the code, the database triggers and the scheduled jobs of the server looking for
> everything that charges, sends, approves, deletes, notifies outwards or runs on a schedule, and
> write `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` with every statement tagged by its source. Compare
> it with the list the business wrote in `docs/INITIAL_SURVEY.md`: whatever the code does that the
> business did not list, or the other way round, ask me about before going on. For every action:
> what triggers it, whether it can run twice, whether it is reversible, what lock exists today if
> any, and what the way back is. In the same pass, build `docs/PRODUCER_CONSUMER_MAP.md`: for every
> contract in the system (a service, a table, a file format, a list of values), who produces it
> and who consumes it, including the things outside the repository I told you about. If there are
> parts you cannot see, say so instead of leaving them out. Present me the actions table with a
> proposed lock for each (explicit confirmation, double safety, dry-run mode, daily limit, a human
> in the loop) and a proposal of which locks go NOW, before any change, and which can go when the
> module is touched. Do not implement anything yet: I confirm lock by lock. Reply in my language.

> [pt]
> Percorra o código, os gatilhos do banco e as tarefas agendadas do servidor procurando tudo o que
> cobra, envia, aprova, apaga, avisa para fora ou roda sozinho num horário, e escreva
> `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` com cada afirmação marcada pela sua fonte. Compare-o com
> a lista que o negócio escreveu em `docs/INITIAL_SURVEY.md`: o que o código faz e o negócio não
> listou, ou ao contrário, pergunte-me antes de seguir. Para cada ação: o que a dispara, se pode
> rodar duas vezes, se é reversível, que cadeado tem hoje se tem algum, e qual é o caminho de
> volta. Na mesma passada, construa `docs/PRODUCER_CONSUMER_MAP.md`: para cada contrato do sistema
> (um serviço, uma tabela, um formato de arquivo, uma lista de valores), quem o produz e quem o
> consome, incluídas as coisas fora do repositório que eu lhe contei. Se há partes que você não
> pode ver, diga-o em vez de deixá-las de fora. Apresente-me a tabela de ações com um cadeado
> proposto para cada uma (confirmação explícita, duplo seguro, modo de ensaio, limite diário, um
> humano no circuito) e uma proposta de que cadeados vão AGORA, antes de qualquer mudança, e quais
> podem ir quando se tocar o módulo. Não implemente nada ainda: eu confirmo cadeado por cadeado.
> Responda no meu idioma.

2. Confirme cadeado por cadeado com a encarregada, e a marca "agora" ou "ao tocar" de cada um.

**Antes de enviar o prompt** de fechamento: a tabela com o seu veredito por linha, e a lista dos
cadeados "agora" para a lacuna do prompt.

3. Feche com o prompt de fechamento da lição 14, listando só os cadeados "agora"; os demais ficam
   no backlog com a sua marca.

**Verificação de completude.** A lista do agente tem mais ações do que a da encarregada? (Se tem
as mesmas, ele não olhou as tarefas agendadas.) Cada cadeado "agora" tem o seu teste em vermelho
contra a versão sem cadeado? A planilha mensal está no mapa como consumidor?

**Entrega.** `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`, `docs/PRODUCER_CONSUMER_MAP.md`,
`docs/LOCKS.md` com os cadeados "agora" implementados e testados.

**Erros típicos.** Implementar todos os cadeados agora "já que estamos aqui": é a regra das duas
velocidades violada, e é tempo que não se dedica ao bug que o cliente pediu.

**No projeto-guia.** O agente encontra três ações que a encarregada não listou: o apagamento
noturno de consultas canceladas antigas, um e-mail que o sistema manda ao profissional quando uma
consulta é cancelada (ela não sabia), e a exportação que alimenta a planilha. Cadeados "agora": o
apagamento noturno passa a modo de ensaio (registra o que teria apagado) até que ela decida, e o
envio de lembretes recebe um limite diário. "Ao tocar": idempotência do envio (módulo de
mensagens, entra com o bug), confirmação no cancelamento (módulo de agenda). O mapa tem seis
contratos, e a planilha mensal é consumidora da tabela de consultas: se alguém lhe mudar uma
coluna, a planilha quebra em silêncio.

### Lição N6 — Dimensionar com números reais

**O que você tem que entender.** A lição 3 com uma vantagem: os dados primários estão no banco e
nos logs. Não se perguntam, medem-se, com um medidor com teste (lição 7). A encarregada aporta só
o que não está em lugar nenhum: quanto esperam crescer, e se o sistema vai ser vendido a outros
consultórios.

**Antes de enviar o prompt**, com as suas mãos:

- Acesso de somente leitura ao banco de produção, ou a cópia completa de N4 (a anonimização não
  tocou nem datas nem quantidades), e aos logs de acesso.
- As duas respostas do negócio: crescimento esperado ("igual ao de agora, talvez um profissional a
  mais") e o "por dez" ("se funcionar, a minha irmã tem outro consultório").
- Um caso conhecido para o teste do medidor: a quantidade de profissionais, que são três.

1. Cole este prompt:

> Before changing anything we are going to size this system with its real numbers. With read-only
> access to the production database (or the complete test copy) and to the logs, measure instead
> of asking: rows per table and growth per month from the timestamps, events per entity, peak
> concurrency from the access logs, data size today and projected at five years, and the slowest
> queries. Write a meter for each number (a script that lives in the repository, with a test
> against a known case I will give you) and show me every number together with the command that
> produces it; audit each meter in both directions (is everything that should be counted, counted?
> does everything counted exist?). Write `docs/VOLUME_SURVEY.md` with every figure tagged
> [database] or [log], and ask me only for what cannot be measured: the growth the business
> expects and whether the system will serve more than one site. Then write `docs/SIZING.md`: what
> breaks first if everything is multiplied by ten, which of the current architecture choices hold
> and which do not, and which asymmetric decisions we take now, before evolving, because they are
> cheap today and expensive later. Do not change any code. Reply in my language.

> [pt]
> Antes de mudar nada vamos dimensionar este sistema com os seus números reais. Com acesso de
> somente leitura ao banco de dados de produção (ou à cópia completa de teste) e aos logs, meça em
> vez de perguntar: linhas por tabela e crescimento por mês a partir das datas, eventos por
> entidade, concorrência no pico a partir dos logs de acesso, tamanho dos dados hoje e projetado
> em cinco anos, e as consultas mais lentas. Escreva um medidor para cada número (um script que
> viva no repositório, com um teste contra um caso conhecido que eu vou lhe dar) e mostre-me cada
> número junto com o comando que o produz; audite cada medidor nas duas direções (está contado
> tudo o que deveria ser contado? existe tudo o que está contado?). Escreva
> `docs/VOLUME_SURVEY.md` com cada cifra marcada [base] ou [log], e peça-me só o que não se pode
> medir: o crescimento que o negócio espera e se o sistema vai servir a mais de um lugar. Depois
> escreva `docs/SIZING.md`: o que quebra primeiro se tudo se multiplicar por dez, quais das
> decisões de arquitetura atuais aguentam e quais não, e que decisões assimétricas tomamos agora,
> antes de evoluir, porque hoje são baratas e depois caras. Não mude nenhum código. Responda no
> meu idioma.

2. Rode você um medidor (o de linhas por tabela, por exemplo). Tem que lhe dar o mesmo. Refaça uma
   conta à mão.

**Antes de enviar o prompt** de fechamento: a conta refeita que coincide, e a sua decisão sobre o
que não aguenta o "por dez", se há algo.

3. Feche com o prompt de fechamento da lição 3, escolhendo entre as opções que ele tiver proposto
   ou confirmando que o atual aguenta.

**Verificação de completude.** Há algum número primário sem medidor? Você rodou um? Está escrito o
"por dez"?

**Entrega.** `docs/VOLUME_SURVEY.md` com marcas, os medidores com teste, `docs/SIZING.md`.

**Erros típicos.** Aceitar "o banco é grande demais para contar, estimo uns cem mil". Um banco
grande se conta com uma consulta; isso é um medidor.

**No projeto-guia.** Vinte mil consultas em dois anos, mil por mês e crescendo devagar; sessenta
mil mensagens; duas usuárias no pico; o banco ocupa pouco; a consulta mais lenta é a busca de
pacientes por nome (sem índice, a auditoria já dizia). O "por dez" aguenta em tudo salvo nessa
busca e no envio noturno, que demora proporcional às consultas. Decisão assimétrica: a interface
de envio de mensagens passa a ter uma fila, mesmo que hoje não faça falta, porque o sinal (lição
R2) vai usar o mesmo canal.

### Lição N7 — O backlog de normalização, emparelhado com o pedido do cliente

**O que você tem que entender.** A lição 5 com duas colunas a mais. Uma única fila onde convivem a
dívida (auditoria, discrepâncias, telas, cadeados pendentes, decisões do dimensionamento) e o
pedido do cliente (o que falha, o que falta), cada pendência com a sua marca de velocidade e o seu
tipo, e cada pendência do cliente com a lista das de normalização que tocam o mesmo módulo e
convém pagar junto com ela. Isso é a regra "paga-se ao tocar" tornada operativa.

**Antes de enviar o prompt**, com as suas mãos e com o dono:

- O pedido do cliente para esta etapa, em `docs/blocks/STAGE_01_REQUEST.md`, em duas listas com as
  palavras da encarregada. O que falha: "às vezes o lembrete chega duas vezes, e às vezes não
  chega; tenho capturas de três pacientes da semana passada". O que falta: "quero pedir sinal por
  link de pagamento nas consultas de primeira vez", "quero ver os números do mês sem baixar a
  planilha".
- Todos os artefatos de N2 a N6 fechados. Se faltar algum, não abra este prompt.
- As pendências bloqueantes de N0, N3 e N4 fechadas.

1. Cole este prompt:

> We are going to turn the normalization and the client's request for this stage into one queue
> of numbered pending items in `docs/PENDING.md`, each with its full specification as the method
> asks (number, title, node of the semantic tree, origin, description, business rules with
> decision and date or marked as missing, data in and out, screens, edge cases, acceptance
> criteria as given, when, then, how it will be verified, status). Sources for the normalization
> items: `docs/AUDIT_[date].md`, the discrepancies I decided to change, the screens that cannot be
> driven by a program, the secrets to rotate, the locks that are not implemented yet, and the
> decisions in `docs/SIZING.md`; each one keeps its speed mark: BLOCKS, PAID WHEN TOUCHED, or CAN
> WAIT. Sources for the client's items: the client's request for this stage; each one marked
> CORRECTIVE (something that fails today, with the way to reproduce it in the client's words) or
> EVOLUTIVE (something new). For every client item, list the normalization items that touch the
> same modules and should be paid together with it. If the request is ambiguous on any point such
> that you cannot write a verifiable item, ask me; do not resolve it by assuming. Order: blocking
> items first, then the client's items in the priority I gave you, each with its paired
> normalization. Reply in my language.

> [pt]
> Vamos converter a normalização e o pedido do cliente para esta etapa numa única fila de
> pendências numeradas em `docs/PENDING.md`, cada uma com a sua especificação completa como o
> método pede (número, título, nó da árvore semântica, origem, descrição, regras de negócio com
> decisão e data ou marcadas como faltantes, dados que entram e saem, telas, casos de borda,
> critérios de aceitação na forma dado, quando, então, como se verifica, estado). Fontes das
> pendências de normalização: `docs/AUDIT_[fecha].md`, as discrepâncias em que eu decidi mudar, as
> telas que não podem ser operadas por programa, os segredos a rotacionar, os cadeados que ainda
> não estão implementados, e as decisões de `docs/SIZING.md`; cada uma conserva a sua marca de
> velocidade: BLOQUEIA, PAGA-SE AO TOCAR, ou PODE ESPERAR. Fontes das pendências do cliente: o
> pedido do cliente para esta etapa; cada uma marcada CORRETIVO (algo que hoje falha, com a forma
> de reproduzi-lo em palavras do cliente) ou EVOLUTIVO (algo novo). Para cada pendência do
> cliente, liste as pendências de normalização que tocam os mesmos módulos e convém pagar junto
> com ela. Se o pedido é ambíguo em algum ponto de modo que você não possa escrever uma pendência
> verificável, pergunte-me; não o resolva supondo. Ordem: primeiro as que bloqueiam, depois as do
> cliente na prioridade que eu lhe dei, cada uma com a sua normalização emparelhada. Responda no
> meu idioma.

2. Leia a especificação de cada pendência do cliente como se você fosse a encarregada, igual à
   lição 5. E revise os emparelhamentos: faz sentido pagar essa dívida com esse pedido?
3. Acrescente ao contrato a rotina de cada sessão da lição 5, sem mudanças.

**Verificação de completude.** Fica algum "bloqueia" aberto? Cada corretivo diz como se reproduz
com as palavras do cliente? Cada pendência do cliente tem as suas emparelhadas?

**Entrega.** `docs/PENDING.md` com tudo, e a rotina no contrato.

**Erros típicos.** Um backlog com cinquenta pendências em "pode esperar": é a reescrita disfarçada
de lista. Arquive o que não vai ser pago e diga isso. E abrir o primeiro bloco com um bloqueante
aberto "porque é pequeno".

**No projeto-guia.** O backlog da Turnos fica com três pendências do cliente: o lembrete duplicado
(corretivo, módulo de mensagens, emparelhado com a idempotência do envio e com a fila de mensagens
do dimensionamento), o sinal (evolutivo, módulo novo de pagamentos, emparelhado com a confirmação
no cancelamento porque toca a mesma tela), e o relatório mensal (evolutivo, módulo de relatórios,
emparelhado com o índice de pacientes e com o contrato da planilha, que é substituída). E uns doze
de normalização, dos quais três "podem esperar" e isso se diz.

---

## O ciclo sobre o legado: lições R1 e R2

### Lição R1 — O primeiro bloco: o bug, em modo corretivo

**O que você tem que entender.** Uma pendência corretiva é um bug conhecido. Na lição 8 o vermelho
se fabricava; aqui o vermelho é o próprio bug: o teste que reproduz a falha, operando o fluxo como
o usuário que a reportou, tem que falhar contra o código atual. Se não falha, você reproduziu
outro bug. Esse vermelho é a prova de que você conserta o certo, e vale mais do que qualquer
explicação do agente sobre o que "deve estar acontecendo" [Ref. 22](REFERENCIAS.md#ref-22). E a
causa raiz se diz em prosa antes de tocar, porque às vezes a causa raiz é uma regra de negócio que
ninguém escreveu, e isso quem decide é você.

**Antes de enviar o prompt**, com as suas mãos:

- A pendência corretiva em `docs/PENDING.md` com a reprodução em palavras da encarregada, e um
  caso concreto: as três capturas da semana passada, com o nome (falso, em teste) dos pacientes e
  a data. Sem um caso, não há teste.
- A bateria de caracterização em verde, com o comando em `docs/STATUS.md`.
- As emparelhadas desta pendência, listadas nela.
- A encarregada avisada de que hoje você vai lhe fazer uma pergunta de negócio.

1. Abra o bloco com a rotina de cada sessão: o agente anuncia que pendência pega e relê a
   especificação.
2. Cole este prompt:

> This pending item is a correction: [some patients receive the reminder twice and some receive
> none; three cases from last week are attached in the item]. Before changing anything: (1)
> Reproduce the failure with a test that drives the flow from the screen and checks the effect in
> the backend, and show me that it fails against the current code; that red is the proof that you
> reproduced the right defect. If you cannot reproduce it, tell me what you tried and what you
> need; do not fix what you cannot see. (2) Find the root cause and tell me in prose, with the
> evidence, before fixing. If the root cause is a business rule nobody wrote down, stop and ask me.
> (3) Fix at the root, not where it hurts, and nothing else: anything else you find goes to a
> pending item. (4) Show me the test green, the characterization suite still green, and the
> regression of the neighbouring items. (5) If the fix changes a current behaviour that someone
> may depend on, say so explicitly: that is a decision for me, not a side effect. Close the paired
> normalization items of this module in the same block, each with its own evidence. The commit
> message says "proved red against [version]" and the test counts. Reply in my language.

> [pt]
> Esta pendência é uma correção: [alguns pacientes recebem o lembrete duas vezes e outros não
> recebem nenhum; na pendência estão os três casos da semana passada]. Antes de mudar nada: (1)
> Reproduza a falha com um teste que opere o fluxo a partir da tela e verifique o efeito no
> backend, e mostre-me que ele falha contra o código atual; esse vermelho é a prova de que você
> reproduziu o defeito correto. Se não conseguir reproduzi-lo, diga-me o que tentou e o que
> precisa; não conserte o que não pode ver. (2) Encontre a causa raiz e diga-ma em prosa, com a
> evidência, antes de consertar. Se a causa raiz é uma regra de negócio que ninguém escreveu, pare
> e pergunte-me. (3) Conserte na raiz, não onde dói, e nada mais: qualquer outra coisa que você
> encontre vai para uma pendência. (4) Mostre-me o teste em verde, a bateria de caracterização
> ainda em verde, e a regressão das pendências vizinhas. (5) Se o conserto muda um comportamento
> atual do qual alguém pode depender, diga-o explicitamente: isso é uma decisão minha, não um
> efeito colateral. Feche as pendências de normalização emparelhadas deste módulo no mesmo bloco,
> cada uma com a sua própria evidência. A mensagem do commit diz "provado em vermelho contra
> [versão]" e os números dos testes. Responda no meu idioma.

   Você está pedindo a ele a reprodução antes do diagnóstico, a causa raiz em prosa antes de
tocar, a raiz e nada mais, a caracterização como regressão do sistema inteiro, e que uma mudança
de comportamento seja uma decisão sua.

3. Leia a causa raiz antes de autorizar o conserto. Se ele lhe perguntar uma regra de negócio,
   decida-a com a encarregada e responda com o formato de fechamento da lição 6.
4. No fechamento: rode você a bateria de caracterização. E use o sistema no ambiente de teste um
   tempo, como a recepcionista: a vista humana não se delega.

**Verificação de completude.** Você viu o vermelho do teste que reproduz o bug, com números? A
causa raiz estava escrita em prosa antes do conserto? A caracterização continua em verde? As
emparelhadas foram fechadas com a sua própria evidência? O commit diz "provado em vermelho"?

**Entrega.** O bug fechado com a rotina completa, as emparelhadas fechadas, e a bateria de
caracterização ampliada com o teste do bug.

**Erros típicos.** Autorizar o conserto sem ler a causa raiz: na Turnos, a primeira hipótese do
agente costuma ser "o processo roda duas vezes" e é metade da verdade. E deixar que o "já que
estou aqui" organize o módulo de mensagens: regra 7.

**No projeto-guia.** O teste reproduz o envio duplicado com uma consulta que foi reagendada: o
processo noturno manda um lembrete por cada linha de consulta do dia seguinte, e uma consulta
reagendada tem duas linhas (a velha, no estado "reagendada", que nenhuma tela mostra, e a nova).
Os que não recebem nenhum são os que foram reagendados para depois do envio. Causa raiz: o estado
"reagendada" que apareceu na lição N2. A pergunta de negócio: "uma consulta reagendada é uma
consulta nova ou a mesma consulta?". A encarregada decide: a mesma consulta, com histórico. O
conserto na raiz toca o estado, não o envio; a idempotência emparelhada se paga no mesmo bloco; o
vermelho diz "2 mensagens para 1 consulta" e o verde "1 mensagem para 1 consulta". E a mudança de
comportamento se declara: as consultas reagendadas deixam de aparecer duas vezes na planilha
mensal, que é consumidora da tabela; a encarregada aprova.

### Lição R2 — O segundo bloco: o sinal, em modo evolutivo

**O que você tem que entender.** O novo sobre o velho se constrói com o método completo, tal e
qual as lições 5 a 12 da primeira parte: especificação na pendência, decisões com data, teste em
vermelho, prova de ponta a ponta, relatório honesto. Duas diferenças. A regressão das vizinhas é o
sistema inteiro, e a bateria de caracterização é a que o diz. E quando o bloco entra num módulo,
as pendências de normalização marcadas "paga-se ao tocar" desse módulo entram com ele, com a sua
própria evidência. Não se faz ao módulo novo o que o legado fez ao antigo.

**Antes de enviar o prompt**, com as suas mãos:

- A pendência evolutiva do sinal em `docs/PENDING.md`, com a sua especificação completa lida por
  você, as suas emparelhadas, e as decisões de negócio que a encarregada já possa tomar: que
  consultas levam sinal, quanto, o que acontece se não for pago.
- O levantamento de ações com consequência (N5) com a linha "cobrar sinal" acrescentada, porque é
  uma ação nova que age sobre o mundo: cadeado antes de construir, como na lição 14.
- A bateria de caracterização em verde.

1. Abra o bloco com o prompt de abertura da lição 5, sobre o pedido do sinal, e leia a
   especificação como a encarregada.
2. Antes de construir, o cadeado: cole o prompt de fechamento da lição 14 para a ação "cobrar
   sinal", com modo de ensaio primeiro.
3. Construa com a rotina da lição 8, pendência por pendência, com as emparelhadas no mesmo bloco.
4. No fechamento do bloco: a bateria completa de ponta a ponta (a de caracterização mais os testes
   novos), com o prompt de fechamento de bloco da lição 8, e um tempo seu usando o sistema.

**Verificação de completude.** O sinal tem cadeado com teste em vermelho antes de existir a
cobrança? A caracterização continua em verde depois do bloco? As emparelhadas do módulo foram
pagas? Há algo do módulo velho que foi "melhorado" sem pendência?

**Entrega.** O sinal funcionando no ambiente de teste, em modo de ensaio, com a sua especificação,
o seu cadeado, os seus testes e a sua prova de ponta a ponta; as emparelhadas fechadas.

**Erros típicos.** Construir o sinal "rápido, como está feito o resto" para que encaixe: o módulo
novo nasce com o método completo, sempre. E esquecer o cadeado porque "é um link de pagamento, não
somos nós que cobramos": o link é mandado a um paciente; isso é uma ação para fora.

**No projeto-guia.** O sinal usa o mesmo canal que os lembretes, que agora tem fila (a decisão
assimétrica de N6 pagando-se sozinha). Cadeado: confirmação explícita da recepcionista e valor
fixado pelo profissional; modo de ensaio durante um tempo registrando "teria pedido sinal a". A
emparelhada da tela de cancelamento (a confirmação) se paga neste bloco porque o sinal muda o que
acontece ao cancelar. No fechamento, a bateria roda sete fluxos: os cinco de caracterização, o do
bug de R1 e o do sinal.

---

## Depois: saída para produção e operação

Daqui em diante, o legado é um sistema com método, e as lições 13 a 22 da primeira parte se
aplicam tal e qual, com quatro notas. A primeira é sobre os seis degraus de qualidade
operacional: a observabilidade mínima e a varredura de vulnerabilidades já entraram com o cinto,
as medições de persistência já estão em N6, e o teste de carga se roda com esses volumes antes da
primeira implantação; os dois monitoramentos arrancam com a primeira leitura como linha base, e o
que já estava mal no primeiro dia vira pendência com a sua marca. As outras três notas são estas.
A auditoria da lição 13 compara contra a de N3: quanta dívida
foi paga, quanta continua. Os manuais da lição 20 num legado costumam não existir, e se geram a
partir do sistema como está e das pendências fechadas, que agora sim documentam o feito. E a
retrospectiva da lição 23 tem uma pergunta própria deste caminho: quanto custou normalizar (em
horas, em tokens, em etapas antes da primeira mudança), e o que da dívida marcada "pode esperar"
acabou custando do mesmo jeito. Essa resposta é a que vai corrigir o calendário desta parte na
próxima versão.

## Lista de saída do trecho de normalização

As oito condições que o dono verifica sem ler código, antes de abrir o primeiro bloco. São as
mesmas da página do caminho evolutivo-corretivo; repito-as aqui porque são a entrega desta parte.

1. Existem todos os insumos das etapas anteriores (levantamento, elegibilidade, contrato, arquivo
   de projeto, árvore, ambientes, volumetria, dimensionamento, comportas), com marcas de fonte, e
   o dono confirmou cada nó inferido (N2).
2. Cada discrepância tem decisão com data, e as que mudam o sistema têm pendência (N2).
3. A auditoria existe e cada achado tem marca de velocidade (N3).
4. O cinto está em verde: ambiente de teste com dados anonimizados, implantação rodada duas vezes,
   segredos fora e rotacionados, integração contínua, bateria de caracterização com o vermelho por
   mutação demonstrado (N4).
5. Toda ação com consequência tem veredito, e os cadeados "agora" têm o seu teste em vermelho
   (N5).
6. Os números primários estão medidos com medidor e teste, e o "por dez" está escrito (N6).
7. Não fica nenhum "bloqueia" aberto, e cada pendência do cliente tem as suas emparelhadas (N7).
8. O contrato tem as cinco regras do legado, e uma sessão nova passa a prova de leitura (N1, N2).

## Anexo — O que esta parte ainda não tem

- Uma turma que a tenha cursado sobre um legado real. A Turnos herdada está construída a partir do
  que vi em sistemas alheios em modo diagnóstico, não de um aluno.
- Um repositório de exemplo da "Turnos" tal como o sobrinho a deixou, para que o aluno que não tem
  um legado próprio tenha um para normalizar. É a pendência mais importante desta parte.
- O critério de tamanho da bateria de caracterização para sistemas grandes, e como se reparte a
  normalização por módulo quando o sistema tem dezenas.
