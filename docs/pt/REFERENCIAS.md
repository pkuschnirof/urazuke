# Urazuke — Referências: os casos por trás do método

Autor: Pablo Kuschniroff, assistido por Claude Code. Versão 4, 18 de outubro de 2026.

Este documento existe para uma coisa: que os procedimentos e os manuais do método fiquem limpos.
Quando no documento principal, num contrato de degrau ou numa lição do curso eu afirmo algo do
tipo "isto aprendi na marra" ou "isto impus porque o modelo aplicava mal", não quero sujar a
explicação com datas, identificadores de commit e números de pendência. Coloco uma marca curta,
`[Ref. N]`, e quem tiver vontade de investigar o caso vem aqui e o encontra com sua data, sua
evidência e a minha leitura do que aconteceu. Quem não tiver vontade, continua lendo sem
tropeçar.

Dois esclarecimentos antes de começar. O primeiro: os três sistemas de que saem estes casos são
reais e hoje estão em produção, com gente de verdade usando-os. Os clientes estão anonimizados, e
eu os chamo "o Plano de Saúde" (com seu "Autorizador") e "a Associação"; seus sistemas eu chamo
"Autorizaciones" e "Kikan". O terceiro repositório é a ferramenta onde nasceu o método,
yujin-forge, que é minha e leva seu nome. Os números, as datas e os identificadores de commit são
reais; se algum dia eu tiver a permissão dos clientes, colocarei os nomes.

O segundo esclarecimento é mais importante, e o repito no documento principal porque não quero
que se interprete mal: **o método não saiu somente da casuística de falhas**. Saiu de duas coisas
que se combinaram. Por um lado, do meu próprio conhecimento da engenharia de sistemas, que venho
aplicando desde muito antes de existirem estes modelos; a maior parte do que peço nos degraus é o
que sempre pedi num projeto bem conduzido. Por outro lado, de que os incidentes destes cinco
meses me mostraram, um após outro, **onde os modelos aplicam esses princípios de maneira
frágil**: onde dizem que testaram e não testaram, onde estimam com cara de quem tem certeza, onde
preenchem um buraco de regras de negócio com uma ocorrência, onde relatam de mais. Os casos que
seguem são, então, a prova de onde é preciso apertar, não a origem de todo o método. Leia-os com
essa lente.

---

## Como citar

Em qualquer documento do método, `[Ref. 26]` enlaça à entrada "Ref. 26" deste arquivo. As
entradas estão agrupadas por sistema de origem e, dentro de cada grupo, em ordem cronológica. No
final há três cronologias completas, caso alguém queira ver a sequência inteira, e uma tabela que
mapeia cada falha ao degrau que a cobre.

---

## A. yujin-forge: onde o método se formou (maio a outubro de 2026)

### Ref. 1 — Nascem os padrões de qualidade (25 de maio)

Escrevi o primeiro documento de padrões de qualidade, `SQ.md`, em 25 de maio (commit
`2219f7a`). É o primeiro "contrato de convivência" entre o humano e o agente, e o escrevi porque
levava duas semanas repetindo ao modelo as mesmas coisas em cada sessão: que o meu tempo é
sagrado e não se gasta no que ele pode resolver sozinho; que não se deixa dívida técnica, o que
quebra se conserta na raiz; que a documentação se mantém em dia; que o escopo é exato, nem mais
nem menos do que o pedido. Nada disso é novo em engenharia de sistemas. O novo foi ter que
escrevê-lo para um colaborador que cada manhã chega sem memória de ontem. É a origem do degrau 1.

### Ref. 2 — O primeiro registro de antipadrões (27 de maio)

Em 27 de maio (commit `73f4029`) abri `GOTCHAS.md`: um arquivo onde cada erro que se repetiu
fica anotado com um formato fixo, como cheira, qual é a causa raiz, como foi corrigido, e como
detectá-lo da próxima vez antes que doa. Abri-o porque o modelo cometia o mesmo erro em sessões
diferentes sem nenhuma memória de tê-lo cometido antes. É a metade "antipadrões" do degrau 8.

### Ref. 3 — As comportas do fluxo, injetadas só quando correspondem (2 de junho)

Em 2 de junho (commit `5b47475`) defini comportas explícitas no fluxo de trabalho, numeradas G1
a G9, e uma comporta de documentação, G-DOC, que exige que a documentação se atualize no mesmo
commit que a mudança. E tomei uma decisão que resultou importante: a doutrina de cada comporta
entra no prompt do agente só no momento em que se aplica, não sempre, porque o contexto é finito
e o que se injeta a mais se paga em atenção. É o antecedente direto da ideia de "contrato de
degrau" que se injeta ao cruzar a comporta.

### Ref. 4 — A política de testes se reformula (4 de junho)

Até 4 de junho eu insistia com "primeiro o teste, depois o código" para tudo. Nesse dia (commit
`a9f59c7`, documento `testing-policy.md`) aceitei que não serve universalmente: por padrão os
testes vêm depois de implementar, o teste-primeiro fica como opção para escopos pequenos e bem
definidos, o esqueleto tem que estar em verde como comporta, e acrescentei uma proteção contra
laços, um modal que para tudo quando o agente dá voltas sem avançar. Conto isso porque mostra que
o método também se corrige a si mesmo quando uma regra minha resulta rígida demais.

### Ref. 5 — As decisões se congelam antes de construir (4 de junho)

Antes de um sprint grande escrevi e numerei três decisões estruturais (D1, D2, D3) num documento
de decisões de 4 de junho. Foi a primeira vez que formalizei algo que sempre fiz em projetos
clássicos: a decisão se escreve antes de construir, com data, para que depois ninguém a discuta
de memória. É o antecedente do degrau 6.

### Ref. 6 — Elimino a equipe multiagente com um número na mão (5 de junho)

Eu tinha uma equipe de cinco agentes (diretor, analista, programador, testador, montador de
esqueletos) que passavam trabalho entre si. Fiz um experimento medido: essa equipe gastou 60
dólares e 73 minutos e entregou algo pela metade; uma única sessão com um único agente levou 90
minutos e entregou algo publicável. Em 5 de junho (commit `7584f8b`, documentado num paper
interno) eliminei a equipe inteira. É o primeiro caso de "retrospectiva com um número na mão, e
redesenho", e é o motivo pelo qual o degrau 15 exige números e não impressões.

### Ref. 7 — O plano passa a ser a lista de pendências (6 de junho)

Em 6 de junho (commit `4fc82c6`, plano do registro de pendências) o plano de trabalho passou a
SER a fila de pendências: uma lista canônica, numerada, com comandos para manejá-la, que se
atualiza em cada sessão. Deixou de haver "plano" de um lado e "tarefas" do outro. É a origem do
degrau 5.

### Ref. 8 — Honestidade de verificação e tipos de fluxo (10 de junho)

Em 10 de junho (commits `7ab9d8a` e `2c552c0`, documentos `verification-honesty.md` e
`workflow-kinds.md`) tornei obrigatória a doutrina em cada prompt e escrevi a regra de
"honestidade de verificação": verificar que a rede realmente fica vermelha quando tem que ficar,
declarar os pontos cegos, e fazer afirmações proporcionais ao que foi comprovado. Separei além
disso três tipos de fluxo: projeto novo, correção e evolução. É a origem do degrau 10 e da
metade "vermelho" do degrau 7.

### Ref. 9 — Trabalho descartado por não ler o mapa (12 de junho)

Em 12 de junho uma sessão começou a construir sem ler o grafo de conhecimento do projeto, e o
trabalho de toda uma tarde foi descartável porque contradizia decisões que já estavam escritas.
Daí a regra de leitura obrigatória do degrau 2: o mapa existe, mas se não se obriga a lê-lo, não
age.

### Ref. 10 — Pilotos automáticos de 24 e 48 horas (14 a 21 de junho)

Entre 14 e 21 de junho deixei o agente trabalhar sozinho durante um dia, e depois dois, com um
mandato escrito: commit e push por cada peça, sem perguntar, e eu recebia um resumo. Conto isso
porque prova que o método aguenta autonomia longa quando o contrato de convivência e o registro
de pendências estão bem feitos; e porque foi ali que aprendi a ler resumos com desconfiança, que
é o degrau 10.

### Ref. 11 — Modo diagnóstico sobre sistemas alheios (julho)

Em julho (documento `diagnostic-mode.md`) o agente começou a entrar em sistemas produtivos de
clientes em modo diagnóstico: somente leitura, delimitado, sem tocar em nada. É o primeiro nível
do escopo do agente residente do degrau 15.

### Ref. 12 — Padrões de desempenho tomados da produção do Plano de Saúde (22 de julho)

Em 22 de julho (commit `873339c`) incorporei à ferramenta padrões de escala extraídos do sistema
do Plano de Saúde: o das duas transações e, sobretudo, "medir antes de tocar". Foi a primeira
vez que o método se alimentou de um sistema que já estava em produção, e é um antecedente do
degrau 9.

### Ref. 13 — O agente fica residente na produção do Plano de Saúde (14 de agosto)

Em 14 de agosto o agente ficou instalado dentro do sistema do cliente, como assistente
residente, com três regras: um mapa do sistema obrigatório antes de operar, "primeiro a solução
operacional" quando algo falha, e a capacidade de abrir tickets. É a origem da primeira metade do
degrau 15.

### Ref. 14 — O dimensionamento como comporta (10 e 11 de outubro)

Em 10 e 11 de outubro (commits `c602725` e `0bd1b05`, documento `sizing.md`) formalizei o
dimensionamento antes de construir, escolhendo entre opções fixas, e o registrei como mais uma
comporta (G9). Formalizei-o tarde, depois do tropeço do Kikan que conto na referência 15, e essa
é justamente a lição do degrau 3.

### Ref. 15 — A interface de persistência assíncrona desde a linha um (13 de outubro)

Em 13 de outubro (commit `7391cc5`, documento `persistence-interface.md`) escrevi a regra de que
a interface com o banco de dados é assíncrona desde a primeira linha, mesmo que o primeiro motor
seja síncrono. É uma decisão "assimétrica": custa pouco se você está errado e custa muitíssimo se
não a toma. Sei disso porque no Kikan não a tomei a tempo e mudá-la depois custou uma etapa
inteira da reengenharia, a E6, com três baterias de testes passadas para assíncrono. É um caso do
degrau 3.

### Ref. 16 — O turno órfão de uma hora e quarenta e três (14 de outubro)

Em 14 de outubro o agente trabalhou uma hora e quarenta e três minutos invisível para mim, e fez
seis commits nesse intervalo. Foi uma falha do método, e feia. Corrigi-a na raiz na versão 1.18.0
(commit `b80a659`): um vigia de silêncio que mata o turno se ele deixa de dar sinais de vida, uma
correia entre processos para que o filho morra com o pai, e 28 testes. Cai no degrau 10 (o
relatório tem que ser visível) e no 12 (na dúvida, o sistema não segue).

---

## B. Autorizaciones: o método sob carga real (junho a outubro de 2026)

### Ref. 17 — O desenho inicial que o repositório superou (11 de junho)

Autorizaciones começou com um documento de desenho (a "opção C"). O repositório o superou
rapidíssimo: o construído foi muito mais do que dizia o papel. A lição que me ficou, e que está
no degrau 5, é que a especificação vale como ponto de partida e o plano vivo são as pendências.

### Ref. 18 — A primeira auditoria de consultas sem índice (23 de junho)

Em 23 de junho fiz a primeira auditoria de "full scans" (consultas que leem a tabela inteira
porque não há um índice) sobre um sistema vivo. Os achados se converteram em pendências, não num
relatório arquivado. É a origem do degrau 11.

### Ref. 19 — Lições da nuvem do Google (24 de junho)

Os erros de infraestrutura das primeiras semanas na nuvem do Google ficaram escritos como lições
para não repeti-los. É a primeira versão do que depois foi o manual de infraestrutura do degrau
14.

### Ref. 20 — O manual de usuário nasce junto com o sistema (26 de junho)

Em 26 de junho já havia manual de usuário, com o sistema construído pela metade. Fiz assim de
propósito: nos projetos clássicos o manual se escrevia no final, quando já ninguém se lembrava de
nada; com um modelo que o regenera grátis, não há desculpa para que não nasça com o sistema.
Degrau 14.

### Ref. 21 — Cópia de segurança de segunda camada (13 de julho)

Antes de confiar no sistema com dados reais coloquei duas camadas de backup: uma local e outra
no armazenamento do Google. Degrau 13 e manual de recuperação do 14.

### Ref. 22 — PND-300: quatro rodadas até a causa raiz (14 de julho)

Um bug voltou três vezes até que se encontrou a causa real, em 14 de julho. Cada "correção"
anterior tinha sido sobre o sintoma. Aqui "a correção é na raiz ou não é correção", que já
estava no contrato de convivência, deixou de ser uma frase e virou prática: há que medir a
hipótese antes de tocar. Degraus 1 e 9.

### Ref. 23 — Auditoria de segurança (16 de julho)

Em 16 de julho fiz a primeira auditoria de segurança formal, com achados convertidos em
pendências. Foi a que me convenceu a tratar a segurança como uma auditoria periódica e não como
uma lista que se marca uma vez no começo. Degrau 11.

### Ref. 24 — Manual interno e manual de recuperação de desastres (26 e 29 de julho)

Em 26 e 29 de julho (commits `6444ce6`, pendência 442, e `a30cee3`, pendência 459) deixei
documentado tudo o que é operacional, implantar, recuperar, manter, de forma "reproduzível à mão,
sem IA". O critério que usei, e que está no degrau 14, é que se amanhã não há agente, uma pessoa
de confiança que não programa possa seguir o manual.

### Ref. 25 — O fail-closed como reflexo (27 de julho)

Em 27 de julho (commit `e18406d`, pendência 452): se uma tabela não existe ou uma busca falha, a
linha simplesmente fica sem seu botão; nunca se quebra a listagem inteira. Na dúvida, não agir e
não quebrar. E o teste dessa correção foi provado em vermelho "sem o try/except", isto é,
demonstrou-se que sem a proteção a listagem quebrava. Degraus 7 e 12.

### Ref. 26 — Os contadores que não coincidiam: 1.355 contra 1.234 (6 e 7 de agosto)

Este é, para mim, o exemplo mais completo de "verificar com instrumento". Um contador da tela
mostrava 1.355 aprovações e a consulta ao banco mostrava 1.234. Em 6 e 7 de agosto (commits
`ab3e529`, pendência 517, e `1f5feb9`, pendência 514) verificou-se a causa raiz diretamente sobre
a produção em somente leitura, decompôs-se a diferença número por número (145 a mais, 24 a menos;
145 menos 24 são 121), escreveu-se um teste que foi provado EM VERMELHO contra o critério antigo,
e o script de diagnóstico ficou no repositório para a próxima vez. Degraus 7, 8 e 9.

### Ref. 27 — Simetria entre produtor e consumidor (6 de agosto)

Em 6 de agosto (commits `50fe968`, pendência 510, e `7251129`, pendência 509) impus que a "causa
de espera" que o usuário vê se calcule com as MESMAS comportas com que o robô decide, e que a
lista de colunas da grade seja definida pelo servidor e o frontend a consuma. Assim não podem
divergir. É a regra "toda lista tem um único dono" do degrau 8.

### Ref. 28 — Botão de pânico com cadeado, modo de ensaio do aprovador, vigia com guardas (7 de agosto)

Em 7 de agosto (commit `0954740`, pendência 524) ficaram os cadeados do sistema: um botão de
pânico com dupla trava, o aprovador automático rodando primeiro em modo de ensaio (faz tudo menos
aprovar, e registra o que teria aprovado), e um vigia que empurra o que ficou travado com guardas
para não empurrar duas vezes. Degrau 12.

### Ref. 29 — As regras de domínio escritas no commit (10 de agosto)

Em 10 de agosto (commit `0ae3ae6`, pendência 550) a mensagem do commit diz, textual: "regra
Pablo: aprovada + saldo = volta", "decisão Pablo 2026-08-10". A decisão de negócio ficou com data
e com dono, colada ao código que a implementa. Degrau 6.

---

## C. Kikan: o método maduro (agosto a outubro de 2026)

### Ref. 30 — Arranque com o método já escrito, e a série de auditorias AUD-* (21 a 29 de agosto)

Kikan foi o primeiro projeto que começou com tudo o anterior já escrito desde o dia um: um
arquivo de projeto operacional e pendências como plano desde o primeiro commit (21 de agosto). Em
28 e 29 de agosto fiz uma série de auditorias precoces (AUD-1, AUD-2…) que se converteu
diretamente em 19 documentos de pendências. Degraus 2, 5 e 11.

### Ref. 31 — Integração contínua desde a primeira semana; implantação como pacote (28 de agosto, 23 e 24 de setembro)

Os testes rodaram no GitHub desde a primeira semana (`ci.yml`, 28 de agosto). A implantação
chegou em 23 de setembro (`deploy.yml`, commit `bb801ed`): um pacote, com a configuração vivendo
no servidor e não no repositório, e a versão do runtime cravada. Que a implantação tenha chegado
um mês depois do arranque é o erro que motiva o degrau 4.

### Ref. 32 — A implantação se endurece a golpes de pendências (30 de setembro a 4 de outubro)

Entre 30 de setembro e 4 de outubro houve cinco pendências seguidas só para que a implantação
funcionasse bem: a URL pública nos dois ambientes (`f85c3c9`), recarregar o serviço antes de
reiniciar e antes de voltar atrás (`513c8d0`, pendência 108), um fixture que reconcilia em vez
de duplicar (`076df76`, pendência 134), o material do cliente fora da árvore que se espelha
(`9d76af8`, pendência 130), e a bateria de testes que já não suja a configuração que viaja na
implantação (`0bd20a8`, pendência 107, 3 de outubro). Se o esqueleto tivesse sido implantado
vazio na primeira semana, esses cinco tropeços teriam acontecido com zero funcionalidade em jogo.
Degraus 4 e 13.

### Ref. 33 — Promoção de UAT para produção (4 e 8 de outubro)

Em 4 e 8 de outubro (commits `4eb5ad7`, pendência 027, e `7658e2e`) ficou um circuito explícito
para passar configuração e campanhas do ambiente de teste para o de produção. Degrau 13.

### Ref. 34 — O esquema derivado do código, com cadeado (11 de outubro)

Na etapa 1 da reengenharia da persistência (commits `6113319` e `68819ce`) o inventário de
tabelas e campos se derivou do próprio código, com um teste que o protege, e se abriu no quadro
compartilhado para que eu o revisasse. É uma lista com um único dono, o código. Degrau 8.

### Ref. 35 — A catraca estática, e o medidor que não via (11 a 13 de outubro)

Na etapa 6 da reengenharia (commits `06b2734`, `f6e5221`, `2fc6239`, `1d55a93`) coloquei uma
"catraca": um contador de chamadas ao banco sem `await`, isto é, sem esperar o resultado, que só
pode descer e nunca subir. E aconteceu algo que vale a pena contar: descobriu-se DUAS vezes que o
medidor não via partes do código. Primeiro 70 chamadas, depois 84, com o contador em zero. Se o
instrumento não se verifica, o número tranquiliza e mente. Degrau 9.

### Ref. 36 — Os medidores que mentiam e as cinco regras da seção 11.b (13 e 14 de outubro)

Textual dos commits de 13 de outubro (`880ac0f`, `f955620`): "o medidor de E7.5 mentia sobre um
banco com o ALTER já aplicado"; "são 44, não 27". E uns dias antes, um plano afirmava que havia
121 laços de certo tipo e quem executou mediu 79. De tudo isso escrevi a seção 11.b do documento
de reengenharia, com as cinco regras que hoje são o degrau 9: medidor com guarda; se o
instrumento não existe, constrói-se; audita-se em duas direções; o aproximado se marca; e quem
executa verifica os números de quem planejou. Com a frase que resume: "três de quatro afirmações
estavam erradas; onde havia instrumento, exato".

### Ref. 37 — Orçamento de consultas e o teto apertado ao medido (14 de outubro)

Na etapa 8 (commits `5926b3f`, `10ada00`) cada caminho da aplicação ficou com um orçamento de
consultas ao banco medido e protegido por um teste, e a troca de motor de banco de dados ficou
como um interruptor por ambiente. Na etapa 9 (`0730082`, `7f5f1af`) o teto se apertou ao medido
mais uma margem pequena: 63 sobre 60. O orçamento não é um número inventado. Degrau 9.

### Ref. 38 — Retenção por tabela, e um relatório de integridade feito por outra sessão (14 de outubro)

Nas etapas 10 e 12 (commits `f72b15a`, `b266f11`) o pacote real passou a trazer os scripts de
migração, a retenção de dados se declarou por tabela e se delimitou em produção, e um relatório
de integridade feito por uma sessão diferente do Claude Code, que não tinha construído o sistema,
foi absorvido como pendências. É o auditor diferente do construtor do degrau 11.

### Ref. 39 — A implantação só empacota, e a cota que se queimou (14 de outubro)

Os testes rodavam três vezes por cada commit, entre 16 e 27 minutos cada vez; em 16 dias
consumiram-se 2.000 minutos de cota do GitHub Actions, e um dia de 23 pushes acabou de queimá-la.
Em 14 de outubro (commit `39497b0`) parti o circuito: os testes rodam UMA única vez, na
integração contínua; a implantação espera esse resultado e só empacota. De 16 a 27 minutos por
commit, para 11. Degrau 13.

### Ref. 40 — Duas portas de administrador em vinte e quatro horas (15 de outubro)

Em 15 de outubro criaram-se duas portas de administrador num único dia (pendências 223 e 257).
Uma revisão externa detectou; retirei uma (commits `69bdab2`, `20fdbe7`, `1558ee4`) e ficou uma
única via. Conto isso como evidência de que o método aguenta "desfazer rápido" sem drama, e de
por que a auditoria tem que ser feita por alguém que não construiu. Degraus 11 e 12.

### Ref. 41 — A auditoria de qualidade: uma vulnerabilidade, um componente enorme, um arquivo de projeto de 9.661 linhas (15 de outubro)

A auditoria de qualidade de 15 de outubro encontrou uma vulnerabilidade conhecida numa
dependência, um componente de tela de 2.679 linhas, oito módulos duplicados entre a versão web e
a móvel, e um `CLAUDE.md` que tinha crescido até 9.661 linhas e 789 kilobytes, um arquivo que a
essa altura ninguém lê, nem o modelo. Daí a regra do degrau 2: o arquivo de projeto é o programa,
não o histórico, e o livro de casos vai à parte. Degraus 2, 8 e 11.

### Ref. 42 — Segredos colados no chat (14 e 16 de outubro)

Em 14 de outubro uma chave do banco de dados ficou impressa numa transcrição, e em 16 umas chaves
de API apareceram coladas no chat. Nenhuma das duas foi "vista por ninguém", e as duas há que
rotacionar do mesmo jeito, porque um segredo que esteve num chat, num log ou num commit já não é
um segredo. Degrau 13.

### Ref. 43 — Três relatórios que não eram o que diziam (14 a 16 de outubro)

Três casos pequenos e muito ilustrativos do degrau 10. Em 14 de outubro um erro de autenticação
foi relatado pela ferramenta com a legenda "success". Em 16 o CORS do servidor se derivou só do
primeiro nome de domínio, e o assistente de configuração do ambiente de teste dava um erro 500
que o relatório não mencionava. E o aplicativo móvel perdia as abas em condições que o relatório
declarava verificadas. Os três se corrigem com a mesma regra: separar o verificado do acreditado
e declarar os pontos cegos.

### Ref. 44 — A bateria que morria por memória e parecia um teste falhado

Uma bateria inteira de testes "morreu" por falta de memória (commit `1d7a20b`), e o relatório
leu isso como um teste que falhava. Até que não se olhou a saída completa não se entendeu que não
tinha falhado nenhum teste: o processo tinha caído. É o motivo pelo qual o degrau 7 pede os
números do vermelho e do verde, não só o veredito.

---

## D. O que impus em sessão, e o que recusei

### Ref. 45 — Quatro correções que fiz em sessão e que depois viraram regras (outubro)

Há regras do método que não saíram de um commit mas de correções que fiz ao agente em plena
sessão, e que depois formalizei. Cito-as porque mostram o segundo fator da origem do método, o meu
próprio critério de engenharia diante da aplicação frágil do modelo. "Medidor com guarda, não
grep": um número que alimenta uma decisão se mede com um programa com teste, não com uma busca de
texto. "Meça a hipótese, não só o sintoma": quando eu trago uma causa em forma de impressão, há
que medi-la antes de construir, porque costumo ter razão no sintoma e a causa costuma estar ao
lado. "Valide os limites com o log, não com a prosa": uma negativa do modelo não prova que o
limite esteja aplicado; há que forçar a invocação e ler o registro. E "compare primeiro a versão
publicada": diante de um "continua quebrado", olhar que versão roda onde eu vejo o problema antes
de voltar a diagnosticar. Degraus 9 e 10.

### Ref. 46 — Os projetos que recusei, e de onde saem os critérios excludentes (17 de outubro)

Os dois critérios excludentes do degrau 0 não saem dos projetos que aceitei mas dos que recusei.
Recusei tecnologias legadas sem repositório acessível ou com repositórios que não seguem um
padrão, porque sem repositório não há onde deixar a evidência. E recusei tecnologias que não
podem ser testadas de ponta a ponta, onde não se podem executar as telas e acessar cada elemento
da interface com seus diferentes métodos validando que a mudança chegou ao backend. Esclareci
naquele momento, e sustento, que NAC3 não é obrigatório: obrigatório é testar a partir da
execução das telas.

---

## E. Cronologias completas

Coloco-as caso alguém queira ver a sequência inteira e não um caso solto. Cada linha traz a
evidência tal como está nos repositórios.

### E.1 yujin-forge

| Data | Momento | O que mudou | Evidência |
|---|---|---|---|
| 25 de maio | Nascem os padrões de qualidade | Primeiro contrato de convivência: tempo do humano, zero dívida, documentação em dia, escopo exato | `2219f7a` |
| 27 de maio | Primeiro registro de antipadrões | Formato fixo: cheiro, causa raiz, correção, detecção precoce | `73f4029` |
| 2 de junho | Comportas G1 a G9 e G-DOC | A doutrina entra no prompt só quando se aplica | `5b47475` |
| 4 de junho | Política de testes reformulada | Testes depois de implementar por padrão; esqueleto em verde; proteção contra laços | `a9f59c7`, `testing-policy.md` |
| 4 de junho | Decisões congeladas antes do sprint | D1, D2, D3 escritas e numeradas | documento de decisões de 4 de junho |
| 5 de junho | Elimina-se a equipe multiagente | 60 dólares e 73 minutos contra 90 minutos | `7584f8b` |
| 6 de junho | O plano são as pendências | Fila canônica, numerada, atualizada por sessão | `4fc82c6` |
| 10 de junho | Doutrinas obrigatórias; honestidade de verificação; tipos de fluxo | Vermelho real, pontos cegos, afirmações proporcionais | `7ab9d8a`, `2c552c0` |
| 14 a 21 de junho | Pilotos automáticos de 24 e 48 horas | Autonomia longa com mandato escrito | notas de sessão |
| 5 e 10 de julho | Modo diagnóstico | Somente leitura sobre sistemas alheios | `diagnostic-mode.md` |
| 22 de julho | Endurecimento de desempenho | Padrões de escala tomados da produção | `873339c` |
| 14 de agosto | Agente residente em produção | Mapa do sistema, solução operacional primeiro, tickets | notas de sessão |
| 10 e 11 de outubro | Dimensionamento como comporta | Opções fixas, registradas | `c602725`, `0bd1b05` |
| 13 de outubro | Interface de persistência assíncrona | Decisão assimétrica | `7391cc5` |
| 14 de outubro | Turno órfão de 1 h 43 → 1.18.0 | Vigia de silêncio, correia entre processos, 28 testes | `b80a659` |

### E.2 Autorizaciones

| Data | Momento | O que trouxe | Evidência |
|---|---|---|---|
| 11 de junho | Documento de desenho inicial | Superado pelo repositório em semanas | documento de desenho |
| 23 de junho | Auditoria de consultas sem índice | Achados convertidos em pendências | documento de auditoria |
| 24 de junho | Lições da nuvem do Google | Erros de infraestrutura escritos como lições | documento de lições |
| 26 de junho | Manual de usuário | Nasce com o sistema | manual |
| 13 de julho | Backup de segunda camada | Local e na nuvem | commit de backup |
| 14 de julho | PND-300, quatro rodadas | Correção na raiz ou não é correção | pendência 300 |
| 16 de julho | Auditoria de segurança | Periódica, gera pendências | documento de auditoria |
| 26 e 29 de julho | Manuais interno e de recuperação | Reproduzíveis à mão, sem IA | `6444ce6`, `a30cee3` |
| 27 de julho | Fail-closed como reflexo | A linha fica sem botão; a listagem não quebra | `e18406d` |
| 6 e 7 de agosto | Contadores 1.355 contra 1.234 | Causa raiz sobre produção, teste em vermelho, script no repo | `ab3e529`, `1f5feb9` |
| 6 de agosto | Simetria produtor/consumidor | Uma única fonte para causas e colunas | `50fe968`, `7251129` |
| 7 de agosto | Botão de pânico, modo de ensaio, vigia | Cadeados | `0954740` |
| 10 de agosto | Regras de domínio no commit | Com data e dono | `0ae3ae6` |

### E.3 Kikan

| Data | Momento | O que trouxe | Evidência |
|---|---|---|---|
| 21 de agosto | Arranque com o método escrito | Arquivo de projeto e pendências desde o dia um | primeiro commit |
| 28 e 29 de agosto | Série AUD-* | 19 documentos de pendências | documentos de pendências |
| 28 de agosto | Integração contínua | Testes no GitHub desde a primeira semana | `ci.yml` |
| 23 e 24 de setembro | Implantação como pacote | Configuração no servidor; runtime fixo | `deploy.yml`, `bb801ed` |
| 30 de setembro a 4 de outubro | Implantação endurecida | Cinco pendências seguidas | `f85c3c9`, `513c8d0`, `076df76`, `9d76af8`, `0bd20a8` |
| 4 e 8 de outubro | Promoção UAT para PROD | Circuito explícito | `4eb5ad7`, `7658e2e` |
| 11 de outubro | Esquema derivado do código | Com cadeado, aberto no quadro | `6113319`, `68819ce` |
| 11 a 13 de outubro | Catraca estática | O medidor não via: 70, depois 84 | `06b2734`, `f6e5221`, `2fc6239`, `1d55a93` |
| 13 de outubro | Medidores que mentiam | "são 44, não 27" | `880ac0f`, `f955620` |
| 14 de outubro | Orçamento de consultas; teto 63 sobre 60 | Medido mais uma margem | `5926b3f`, `10ada00`, `0730082`, `7f5f1af` |
| 14 de outubro | As cinco regras de 11.b | Medidor com guarda, auditoria em duas direções | documento de reengenharia, 11.b |
| 14 de outubro | Retenção por tabela; integridade externa | Relatório de outra sessão absorvido como pendências | `f72b15a`, `b266f11` |
| 14 de outubro | A implantação só empacota | De 16-27 minutos para 11 | `39497b0` |
| 15 de outubro | Duas portas de administrador | Uma retirada em 24 horas | `69bdab2`, `20fdbe7`, `1558ee4` |
| 15 de outubro | Auditoria de qualidade | Vulnerabilidade, componente de 2.679 linhas, arquivo de 9.661 linhas | documento de auditoria |

---

## F. Cada falha, e o degrau que a cobre

Esta tabela é, de certo modo, a prova da escada: cada tropeço tem que cair em algum degrau. Se
aparecesse um que não cai em nenhum, faltaria um degrau.

| Falha | Referência | Degrau que a cobre | Estado |
|---|---|---|---|
| A equipe multiagente que gastava o dobro e entregava a metade | Ref. 6 | 15, retrospectiva com número | fechado |
| Trabalho descartado por não ler o mapa | Ref. 9 | 2, leitura obrigatória | fechado |
| PND-300: três correções que não eram na raiz | Ref. 22 | 1, zero dívida; 9, medir | fechado |
| Contadores 1.355 contra 1.234 | Ref. 26 | 9, instrumento; 8, simetria | fechado |
| 3,4 milhões de linhas por ano sobre arquivos JSON | Ref. 15 | 3, dimensionar | fechado |
| Medidores que mentiam; catraca em zero | Refs. 35 e 36 | 9, verificar o instrumento | fechado |
| Turno órfão de 1 h 43 | Ref. 16 | 10 e 12 | fechado |
| Testes três vezes por commit; cota queimada | Ref. 39 | 13 | fechado; a cota há que ampliar |
| Duas portas de administrador em 24 horas | Ref. 40 | 11 e 12 | fechado |
| Segredos colados no chat | Ref. 42 | 13 | rotação pendente |
| Erro de autenticação relatado como sucesso | Ref. 43 | 10 | pendente, uma linha |
| Arquivo de projeto de 9.661 linhas | Ref. 41 | 2 | pendente |
| CORS do primeiro domínio; assistente de configuração com erro 500 | Ref. 43 | 13 e 8 | aplicação pendente |
| O aplicativo móvel perde abas | Ref. 43 | 10 e 12 | diagnóstico feito; correção pendente |
