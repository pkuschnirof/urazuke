# Urazuke, o método da evidência — a escada metodológica (versão 3)

Conversa entre Pablo e Sumi, 17 de outubro de 2026 (versão 1 pela manhã; versão 2 à tarde, com a
tese de abertura, os contratos de degrau e o repositório próprio; versão 3 com o nome, os contratos
enriquecidos, os prompts em inglês, o guia por tamanho de projeto e o guia por ferramenta). Este é
um documento de trabalho: vamos continuar elaborando-o em várias passadas, então nada do que diz é
doutrina ainda. É, simplesmente, o primeiro destilado honesto do que fizemos de verdade em três
repositórios que hoje estão em produção, com gente real usando-os.

Uma observação de estilo, porque importa: este documento está escrito para pessoas que não viveram
esses projetos. Por isso explica as coisas com calma, repete quando é preciso, usa linguagem do dia
a dia, e tem no final um **glossário** com cada sigla e cada expressão coloquial que aparece. Se em
algum momento você encontrar uma palavra estranha — "catraca", "cadeado", "PND", "fail-closed" —
vá ao glossário; está tudo lá.

Esta é a versão em português. O espanhol é a fonte da verdade; se as duas discordarem, a versão
espanhola vale e esta é corrigida. Os prompts para o modelo são idênticos em todos os idiomas.

## O nome

**Urazuke** (裏付け) é uma palavra japonesa que nomeia o respaldo que uma afirmação tem: o que a
sustenta por trás (literalmente, "o forro de trás"). O verbo *urazukeru* é "respaldar com provas".
Pablo o escolheu em 17 de outubro de 2026 ("Vamos com Urazuke"), depois que a verificação de nomes
descartou Hashigo, Kaidan e Shōko por colisões com empresas e projetos existentes. O nome não se
traduz; o subtítulo, "o método da evidência", sim: *el método de la evidencia*, *the evidence
method*, *la méthode de la preuve*, *die Nachweis-Methode*, *il metodo del riscontro*, 裏付けの方法,
验证方法. Neste documento, "a escada" é a estrutura do método — seus dezesseis degraus — e "Urazuke"
é o método inteiro.

## Do que se trata isto?

Pablo disse com clareza: não quer ensinar uma ferramenta, quer ensinar **o método**. A ideia é que
qualquer pessoa, com qualquer ferramenta de inteligência artificial que sirva para programar, possa
"vibecodar" (isto é, construir software conversando com uma IA em vez de digitar o código à mão) e
que o que sai seja robusto, pronto para produção, e — isto é o importante — **sem que o dono do
projeto precise revisar uma única linha de código**.

Soa ambicioso, e é. Mas temos algo que quase ninguém tem: três sistemas reais que foram construídos
exatamente assim e que hoje funcionam com clientes de verdade. Então a pergunta não é "será que dá?",
mas "o que fizemos, em que ordem, e o que de tudo isso é o que realmente fez a diferença?".

Esta escada é a resposta a essa pergunta. E vai servir de base para três coisas: a documentação do
método, a prática que os alunos vão fazer, e os manuais. Mais adiante, além disso, vamos exportá-la
como um "fluxo de execução de projeto" dentro do Forge, para que a ferramenta guie o método em vez
de a pessoa ter que se lembrar.

## De onde sai tudo isto (as fontes)

Levantei os três repositórios em modo somente leitura, sem tocar em nada:

- **`[repositório yujin-forge]`** (a ferramenta Forge e, sobretudo, o lugar onde o método nasceu):
  1.090 commits entre 10 de maio e 14 de outubro de 2026. Lá estão o documento de padrões de
  qualidade (`docs/SQ.md`), as 31 doutrinas em `docs/doctrine/`, o registro de antipadrões
  (`docs/GOTCHAS.md`), o paper onde se decidiu encerrar a equipe multiagente
  (`docs/PAPER_SUMI_VS_AGENTIC.md`), as decisões congeladas do diretor
  (`docs/DIRECTOR_DECISIONS_2026_06_04.md`), o plano do registro de pendências
  (`docs/PENDING_REGISTRY_PLAN.md`) e o texto das regras SQ 1 a 9 que o Forge injeta no cérebro
  a cada turno (`src/chat/server.ts`).
- **`[repositório Autorizações]`** (o primeiro sistema produtivo, para uma entidade de saúde):
  469 commits entre 11 de junho e 9 de outubro, 641 pendências e todas fechadas. Inclui o
  documento de desenho inicial, as lições aprendidas da nuvem do Google, várias auditorias e os
  manuais.
- **`[repositório Kikan]`** (o segundo sistema produtivo, a mesa de atendimento omnicanal e
  campanhas da Associação): 442 commits entre 21 de agosto e 16 de outubro, 37 tags, a série de
  auditorias AUD-*, 19 documentos de pendências, o documento da reengenharia de persistência
  (`docs/REINGENIERIA_PERSISTENCIA_SQL.md`, com suas etapas E1 a E12 e a famosa seção 11.b), a
  integração contínua e a implantação, e os dois relatórios desta semana (integridade em 14 de
  outubro, qualidade em 15).
- Minha própria memória das correções que Pablo me fez ao longo destes meses ("medidor com
  guarda", "meça a hipótese", "valide com o log", "veja primeiro que versão está publicada").

**Sobre os nomes.** Os clientes dos dois sistemas produtivos estão anonimizados: chamamos de "o
Plano de Saúde" (com seu "Autorizador") e "a Associação", e seus sistemas de "Autorizações" e
"Kikan". Os números, as datas e os commits são reais; os nomes das organizações ficam reservados
até termos sua permissão. Os caminhos locais dos repositórios de origem aparecem como
`[repositório …]`.

Uma convenção que vale para todo o documento: **cada afirmação cita o commit ou o documento onde
está a evidência**. E quando algo é interpretação minha e não fato comprovado, marco com a etiqueta
`[hipótese]`, para que se distinga à primeira vista o que está provado do que estou propondo.

## A IA não interrompe o método: ela o continua

Esta é a tese que abre o documento, e a colocamos primeiro porque desarma a objeção mais comum
antes que apareça: "como você vai confiar em código que uma máquina escreveu?".

A resposta é que **a indústria já deixou de confiar no autor do código há vinte anos**. Quando o
grosso da escrita passou para equipes júnior, terceirizadas ou rotativas, a revisão linha por linha
se tornou impossível de sustentar. E o que cresceu em seu lugar foi tudo o que hoje tomamos por
garantido: os testes automatizados, a integração contínua, os critérios de aceitação, os pipelines
que não deixam passar nada sem verde, o "shift left" dos testes, o controle de qualidade como
função independente. Essa foi a resposta da engenharia de sistemas a "quem escreve não é
confiável": não ler o código dele, exigir evidência.

Então colocar um modelo de inteligência artificial para escrever não é um salto no vazio. É trocar
um autor em quem já não confiávamos por outro em quem também não, e para o qual **já tínhamos
montado o aparato de verificação**. Isso deveria tranquilizar, não inquietar. E ainda por cima o
novo autor é mais barato, mais rápido, e — diferentemente do júnior — não se ofende quando você pede
que prove em vermelho.

Por isso este método se apoia, sem disfarce, na engenharia de sistemas clássica. O esqueleto é o de
sempre: levantamento, requisitos, dimensionamento, desenho, construção, teste, implantação,
operação, auditoria. Não poderia ser de outra forma, porque os problemas são os de sempre: não saber
quantos dados vai haver, não saber o que o cliente quer, não saber se o que foi construído é o que
foi pedido. A IA não mudou os problemas; mudou quem faz cada parte e a que custo. Até o critério de
elegibilidade X2 (ver degrau 0) é engenharia clássica: testabilidade como condição de contrato.

### O que é velho e o que é novo nisto

O velho, e que convém dizer que é velho: o esqueleto de etapas, a independência de quem verifica em
relação a quem constrói, os testes como evidência, a documentação como parte do produto, o
levantamento antes do desenho.

O que de fato muda, e é onde está o nosso, são três coisas:

1. **Onde vai o esforço do humano.** No método clássico o humano escreve a especificação, escreve o
   código, e outro humano o revisa. Aqui o humano faz só duas coisas: **decide, e verifica
   artefatos**. Todo o resto — redigir, construir, testar, medir, documentar — o modelo faz. Por isso
   cada degrau termina numa "verificação de completude sem ler código": é o lugar exato onde o humano
   segue sendo imprescindível, e nenhum outro.

2. **O autor também fabrica a evidência.** Este é o único ponto genuinamente novo, e é a nuance que
   justifica três degraus inteiros. O júnior escrevia código duvidoso, mas não fabricava a evidência:
   os testes e as medições eram montados por outro, ou pelo menos outro os olhava. O modelo, em
   compensação, produz o código *e* o teste *e* o medidor *e* o relatório, na mesma sessão, com a
   mesma segurança na voz quando está certo e quando está errado. Vimos isso: o medidor que mentiu
   duas vezes, o erro de autenticação relatado como "sucesso", as três de quatro afirmações que
   estavam erradas. Então "revisar evidência em vez de código" segue sendo o princípio correto, mas
   **a evidência tem que provar a si mesma**: o teste visto em vermelho (degrau 7), o instrumento com
   sua guarda (degrau 9), o relatório que separa o verificado do acreditado (degrau 10), o auditor
   diferente do construtor (degrau 11). Não é uma inquietação nova: é a mesma disciplina de
   independência do controle de qualidade, levada um passo mais para dentro.

3. **O custo dos artefatos.** No método clássico a documentação era cara, então se fazia uma vez e
   envelhecia. Aqui regenerá-la é grátis, então a regra passa a ser "no mesmo commit" e "reproduzível
   à mão, sem IA". O que antes era um ideal inalcançável passa a ser uma comporta.

Para o curso e para a apresentação pública, isto define o posicionamento com honestidade: não é "a
nova forma de programar"; é **engenharia de sistemas aplicada a um construtor que não se cansa e em
quem não se pode acreditar**. Para quem vem de sistemas soa familiar e baixa a desconfiança ("isso
você já sabe fazer"); para quem vem do vibecoding dá o que não têm, que é justamente o esqueleto. E
nos diferencia das ferramentas que vendem velocidade e omitem o esqueleto inteiro.

---

## Parte A — Levantamento: os momentos e os marcos que importaram

### A.1 yujin-forge: onde o método nasceu (maio a outubro de 2026)

Há algo fundamental a dizer de cara, porque muda como se lê todo o resto: **o método não foi
desenhado primeiro e aplicado depois**. Foi ao contrário. Cada regra foi escrita *depois* de um
tropeço, no mesmo repositório onde esse tropeço foi vivido, e muitas vezes no mesmo dia. Nenhuma
doutrina nasceu em abstrato, numa reunião de quadro branco. Todas têm um incidente atrás e um commit
de nascimento. Isto é, creio eu, a coisa mais honesta e mais valiosa que temos para contar.

Aqui vai a sequência, em ordem:

| Data | Momento | O que mudou no método | Evidência |
|---|---|---|---|
| 25 de maio | Nascem as SQ (os padrões de qualidade) | É o primeiro "contrato de convivência" entre o humano e o agente. Diz coisas como: o tempo do humano é sagrado; nada de dívida técnica (o que quebra se conserta na raiz); tudo em ASCII; a documentação sempre em dia; e o escopo exato, nem mais nem menos do que o pedido. | `2219f7a docs: add SQ.md` |
| 27 de maio | Primeiro registro de GOTCHAS | Os erros que se repetem começam a ser anotados num formato fixo: como cheira, qual é a causa raiz, como foi corrigido, e como detectar da próxima vez antes que doa. | `73f4029` (gotchas doc) |
| 2 de junho | Comportas (gates) e G-DOC, injetados só quando correspondem | Aparecem as comportas explícitas do fluxo de trabalho, numeradas G1 a G9. E um detalhe inteligente: a doutrina entra no prompt do agente só no momento em que se aplica, não sempre, para não gastar contexto à toa. | `5b47475` |
| 4 de junho | Reformula-se a política de testes | Até então se insistia com "primeiro o teste, depois o código" (TDD) para tudo. Descobre-se que não serve universalmente: por padrão os testes vêm *depois* de implementar, o TDD fica como opção para escopos pequenos e bem definidos, o esqueleto tem que estar em verde como comporta, e se adiciona uma proteção contra laços (quando o agente dá voltas sem avançar, salta um modal que para tudo). | `a9f59c7`, `docs/doctrine/testing-policy.md` |
| 4 de junho | Congelam-se as decisões do diretor | Antes de um sprint, três decisões se escrevem e se numeram (D1, D2, D3). Aqui nasce a prática de "a decisão se escreve antes de construir". | `docs/DIRECTOR_DECISIONS_2026_06_04.md` |
| 5 de junho | REDESENHO: encerra-se a equipe multiagente | Este é um momento enorme. Havia uma equipe de cinco agentes (diretor, analista, programador, testador, montador de esqueletos) que passavam trabalho entre si. Fez-se um experimento medido: essa equipe gastou 60 dólares e 73 minutos e entregou algo pela metade; uma única sessão com um único agente levou 90 minutos e entregou algo publicável. Eliminou-se a equipe inteira. É o primeiro caso de "retrospectiva com um número na mão, e redesenho". | `7584f8b`, `docs/PAPER_SUMI_VS_AGENTIC.md` |
| 6 de junho | Registro de pendências | O plano de trabalho passa a SER a lista de pendências: uma fila canônica, com comandos para manejá-la, que se atualiza a cada sessão. Já não há "plano" de um lado e "tarefas" do outro. | `4fc82c6`, `docs/PENDING_REGISTRY_PLAN.md` |
| 10 de junho | Doutrinas obrigatórias + honestidade de verificação + tipos de fluxo | A doutrina deixa de ser opcional: vai como bloco obrigatório em cada prompt. Nasce a "honestidade de verificação": verificar que a rede realmente fica vermelha quando tem que ficar, declarar os pontos cegos, e fazer afirmações proporcionais ao que foi comprovado. E separam-se três tipos de fluxo: projeto novo (greenfield), correção, e evolução. | `7ab9d8a`, `2c552c0`, `docs/doctrine/verification-honesty.md`, `workflow-kinds.md` |
| 14 a 21 de junho | Pilotos automáticos de 24 e 48 horas | O agente trabalha sozinho durante um dia ou dois com um mandato escrito: commit e push por cada peça, sem perguntar, e o humano recebe um resumo. Prova-se que o método aguenta autonomia longa. | memória `feedback_autopilot_mandate`, `project_autonomous_multisession_interrupt` |
| 5 e 10 de julho | Escala de concorrência e modo diagnóstico | O agente entra em sistemas produtivos alheios em modo diagnóstico: somente leitura, delimitado, sem tocar em nada. | `docs/doctrine/diagnostic-mode.md` |
| 22 de julho | Endurecimento de desempenho | Extraem-se padrões de escala do sistema do Plano de Saúde (por exemplo, o das duas transações; e "medir antes de tocar"). Pela primeira vez o método se alimenta de um sistema que já está em produção. | `873339c` |
| 14 de agosto | Forge Embed vivo na produção do Plano de Saúde | O agente fica RESIDENTE dentro do sistema do cliente: com um mapa do sistema obrigatório, com a regra de "primeiro a solução operacional", e com capacidade de abrir tickets. | a memória do assistente residente em produção |
| 10 e 11 de outubro | Modo operação + dimensionamento (G9) | Dimensiona-se antes de construir, escolhendo entre opções fixas, e o dimensionamento fica registrado como mais uma comporta. | `c602725`, `0bd1b05`, `docs/doctrine/sizing.md` |
| 13 de outubro | Interface de persistência | Uma decisão "assimétrica" (custa pouco se você estiver errado, custa muitíssimo se não a tomar): a interface com o banco de dados é assíncrona desde a linha um, ainda que o primeiro motor seja síncrono. Mudá-la depois custou uma etapa inteira da reengenharia (E6: três baterias de testes). | `7391cc5`, `docs/doctrine/persistence-interface.md` |
| 14 de outubro | O turno órfão de 1 hora 43 → versão 1.18.0 | Uma falha do método, e bem feia: o agente trabalhou uma hora e quarenta e três minutos invisível para o humano, e fez seis commits nesse período. Corrigiu-se na raiz: um vigia de silêncio, uma correia entre processos, e 28 testes. | `b80a659`, CHANGELOG 1.18.0 |

O que se lê nesta tabela? Que em cinco meses o método passou de "regras de cortesia" (as SQ, que
são quase boas maneiras de convivência) a "comportas medidas" (dimensionamento, orçamento de
consultas, honestidade de verificação). E que cada degrau tem data de nascimento e um tropeço que o
justificou. Isso é o que o torna ensinável: não é teoria, é cicatriz.

### A.2 Autorizações: o método sob carga real (junho a outubro de 2026)

Este foi o primeiro sistema com usuários de verdade, com dinheiro em jogo e com dados de saúde. São
641 pendências, todas fechadas. E aqui aconteceu algo diferente: o método aprendeu a **operar**,
não só a construir. Uma coisa é um sistema funcionar quando você mesmo testa; outra muito diferente
é continuar funcionando às três da manhã com um robô aprovando ordens.

| Data | Momento | O que trouxe | Evidência |
|---|---|---|---|
| 11 de junho | Início com um documento de desenho (a "opção C") | Houve uma especificação inicial. E o repositório a "superou" rapidíssimo: o que foi construído foi muito mais do que dizia o papel. Lição: a especificação vale como ponto de partida, mas o plano vivo são as pendências. | o documento de desenho inicial |
| 23 de junho | Auditoria de consultas sem índice | A primeira auditoria de "full scans" (consultas que leem a tabela inteira porque não há índice) sobre um sistema vivo. E os achados se convertem em pendências, não num relatório que se arquiva. | documento de auditoria de 23 de junho |
| 24 de junho | Lições aprendidas da nuvem do Google | Os erros de infraestrutura se escrevem como lições para não repeti-los. | documento de lições GCP |
| 26 de junho | Manual de usuário | O manual nasce junto com o sistema, não no final quando ninguém se lembra de nada. | manual de 26 de junho |
| 13 de julho | Cópia de segurança de segunda camada | Duas camadas de backup antes de confiar no sistema: uma local e outra no armazenamento do Google. | commit backup camada 2 |
| 14 de julho | A saga do PND-300 (quatro rodadas de causa raiz) | Um bug que voltou três vezes até se encontrar a causa real. Aqui "a correção é na raiz ou não é correção" deixa de ser uma frase bonita e vira prática obrigatória. | PND-300 |
| 16 de julho | Auditoria de segurança | A segurança se trata como uma auditoria periódica que gera pendências, não como uma lista de verificação que se marca uma vez no começo. | documento de auditoria de 16 de julho |
| 26 e 29 de julho | Manual interno da RPAForce + manual de recuperação de desastres | Tudo o que é operacional (implantar, recuperar, manter) fica documentado de forma "reproduzível à mão, sem IA". Se amanhã não há agente, uma pessoa pode seguir o manual. | `6444ce6 (pnd442)`, `a30cee3 (pnd459)` |
| 27 de julho | O "fail-closed" como reflexo | Se uma tabela não existe ou uma busca falha, a linha simplesmente fica sem seu botão; nunca se quebra a listagem inteira. Na dúvida, não agir e não quebrar. | `e18406d (pnd452)` |
| 6 e 7 de agosto | Contadores verificados contra produção (1.355 contra 1.234) | Este é, para mim, o exemplo mais completo de "verificar com instrumento". Um contador mostrava 1.355 aprovações e a consulta mostrava 1.234. Verificou-se a causa raiz diretamente sobre produção (somente leitura), decompôs-se a diferença número por número (145 a mais, 24 a menos, 145 − 24 = 121), escreveu-se um teste que foi provado em VERMELHO contra o critério antigo, e o script de diagnóstico ficou no repositório para a próxima. | `ab3e529 (pnd517)`, `1f5feb9 (pnd514)` |
| 6 de agosto | Simetria produtor/consumidor ao vivo | A "causa de espera" que o usuário vê se calcula com as MESMAS comportas com que o robô decide (regra SQ 7); e a lista de colunas é definida pelo servidor e consumida pelo frontend. Assim não podem divergir. | `50fe968 (pnd510)`, `7251129 (pnd509)` |
| 7 de agosto | Botão de pânico com cadeado dedicado | Cadeados: segurança dupla, modo de ensaio (dry-run) do aprovador automático, um vigia que empurra com guardas. | `0954740 (pnd524)` |
| 10 de agosto | Regras de domínio escritas no commit | Textual: "regra Pablo: aprovada + saldo = volta", "decisão Pablo 2026-08-10". A decisão de negócio fica com data e com dono, colada ao código que a implementa. | `0ae3ae6 (pnd550)` |

O que se lê aqui? Que neste repositório o método ganhou seus degraus OPERACIONAIS: o fail-closed,
os cadeados, os backups, os manuais que uma pessoa pode seguir sem IA, as auditorias periódicas, e
a verificação contra produção com um instrumento e não a olho.

### A.3 Kikan: o método maduro (agosto a outubro de 2026)

O segundo sistema produtivo, e o primeiro construído com tudo o anterior já escrito desde o dia um.
Aqui aparecem os degraus de **medição** e de **integração e implantação contínuas**: é o
repositório onde, pela primeira vez, medir vem sistematicamente antes de construir.

| Data | Momento | O que trouxe | Evidência |
|---|---|---|---|
| 21 de agosto | Início | O projeto começa com um `CLAUDE.md` operacional (o arquivo que o agente lê ao começar) e com pendências como plano desde o primeiro dia. | primeiro commit |
| 28 e 29 de agosto | Série de auditorias AUD-* → 19 documentos de pendências | Uma auditoria sistemática precoce que se converte diretamente no plano de trabalho. | documentos PND de 28 e 29 de agosto |
| 28 de agosto | Integração contínua (CI) | Os testes rodam no GitHub desde a primeira semana. | `ci.yml` |
| 23 e 24 de setembro | Implantação + configuração só no servidor + Node 22 fixo | A implantação é um pacote; a configuração vive no ambiente, não no repositório; e a versão do runtime fica cravada. | `deploy.yml`, `bb801ed` |
| 30 de setembro a 4 de outubro | A implantação se endurece a golpes de pendências | A URL pública nos dois ambientes; recarregar o serviço antes de reiniciar e antes de voltar atrás; um fixture que RECONCILIA em vez de duplicar; o material do cliente fora da árvore espelhada. Cinco pendências seguidas sobre o mesmo: a implantação descoberta tarde cobra seu preço. | `f85c3c9`, `513c8d0 (PND-108)`, `076df76 (PND-134)`, `9d76af8 (PND-130)` |
| 3 de outubro | Isolar a configuração | A bateria de testes já não suja a configuração que viaja na implantação. | `0bd20a8 (PND-107)` |
| 4 e 8 de outubro | Promoção de UAT para PROD | Um circuito explícito para passar configuração e campanhas do ambiente de teste ao de produção. | `4eb5ad7 (PND-027)`, `7658e2e` |
| 11 de outubro | REENGENHARIA, etapa 1: o esquema derivado do CÓDIGO, com cadeado | O inventário de tabelas e campos se deriva do próprio código, com um teste que o protege, e se abre no quadro (o painel compartilhado com Pablo). | `6113319`, `68819ce` |
| 11 a 13 de outubro | Etapa 6: a catraca estática, três baterias passadas para assíncrono | A "catraca" é um contador de chamadas ao banco sem `await` (sem esperar o resultado), que só pode descer, nunca subir. E aconteceu algo ótimo para contar: descobriu-se DUAS vezes que o medidor não via partes do código (70 chamadas, e depois 84, com o contador em zero). | `06b2734`, `f6e5221`, `2fc6239`, `1d55a93` |
| 13 de outubro | Medidores que mentiam | Textual dos commits: "o medidor de E7.5 mentia sobre um banco com o ALTER já aplicado"; "são 44, não 27". O método aprende algo novo: **o instrumento também tem que ser verificado**. | `880ac0f`, `f955620` |
| 14 de outubro | Etapa 8: o interruptor, o orçamento de consultas e a guarda de reentrada | A troca de motor de banco de dados é um interruptor por ambiente; cada caminho da aplicação tem um orçamento de consultas medido e protegido por um teste. | `5926b3f`, `10ada00` |
| 14 de outubro | Etapa 9: o teto se aperta ao medido (63 sobre 60) | O orçamento não é um número inventado: é o que se mediu mais uma margem pequena. | `0730082`, `7f5f1af` |
| 14 de outubro | Seção 11.b: as cinco regras | Medidor com guarda; construir o instrumento se não existe; auditar em duas direções; marcar o aproximado; e quem executa verifica quem planejou. Com uma frase que diz tudo: "três de quatro afirmações estavam erradas; onde havia instrumento, exato". | `docs/REINGENIERIA_PERSISTENCIA_SQL.md` 11.b |
| 14 de outubro | Etapas 10 e 12 + integridade externa | O pacote REAL traz os scripts de migração; a retenção de dados se declara por tabela e se delimita em produção; e um relatório de integridade feito por um terceiro (eu, Sumi) que o Forge absorve como pendências. | `f72b15a`, `b266f11`, `INTEGRIDAD_..._10_14.md` |
| 14 de outubro | A implantação só empacota (gate-ci) | Os testes rodam UMA só vez (em CI); a implantação espera esse resultado e empacota. De 16 a 27 minutos por commit, para 11. | `39497b0` |
| 15 de outubro | PND-223 retirada em 24 horas / PND-257 | Criaram-se duas portas de administrador num único dia. Uma revisão externa detectou; retirou-se uma e ficou uma única via. O método aguenta "desfazer rápido" sem drama. | `69bdab2`, `20fdbe7`, `1558ee4` |
| 15 de outubro | Auditoria de qualidade | Notas por dimensão; uma vulnerabilidade conhecida numa dependência; um componente de 2.679 linhas; um `CLAUDE.md` de 9.661 linhas. Insumo para o próximo plano. | `AUDITORIA_CALIDAD_CODIGO_2026_10_15.md` |

O que se lê aqui? Que o Kikan é o primeiro repositório onde a MEDIÇÃO precede a construção de
maneira sistemática (dimensionamento, catraca, orçamento), e onde a implantação e a integração
contínua se tratam como parte do produto e não como um trâmite.

### A.4 Os padrões que se repetem nos três repositórios

Se olharmos os três repositórios juntos, há dez coisas que aparecem uma e outra vez. Estas são, no
fundo, o método:

1. **Tropeço → regra escrita no mesmo dia.** Nenhuma doutrina nasceu em abstrato. Cada uma tem um
   commit de nascimento e um incidente atrás.
2. **O plano são as pendências.** Pendências numeradas (PND-nnn) nos três repositórios; a
   especificação é o ponto de partida, a fila de pendências é a verdade.
3. **A decisão se escreve junto ao código, com dono e data.** "Regra Pablo", "decisão Pablo
   2026-08-10", as decisões do diretor, e no Kikan a "decisão por omissão" (quando Pablo não
   respondeu e o agente escolheu, deixou marcado como tal).
4. **O teste se prova em vermelho.** Não basta estar em verde: é preciso demonstrar que o teste falha
   contra o código antigo. Se você nunca o viu vermelho, não sabe se prova algo.
5. **Medir com instrumento, e verificar o instrumento.** Um script com teste que viaja no
   repositório; o medidor mentiu duas vezes e consertou-se o medidor antes do código.
6. **Fail-closed e cadeados.** Nada se quebra em silêncio; na dúvida, não fazer.
7. **Auditoria periódica → pendências.** Full-scan em junho, segurança em julho, AUD-* em agosto,
   integridade e qualidade em outubro. A auditoria não é relatório: é plano.
8. **Documentação e manuais nascem com o sistema**, e se mantêm no mesmo commit que a mudança.
9. **O agente opera dentro do sistema** (diagnóstico → operação → residente) com permissões
   delimitadas e aprovações; o humano aprova, não digita.
10. **Retrospectiva com número → redesenho.** A equipe multiagente foi encerrada com 60 dólares e 73
    minutos contra 90 minutos; a implantação foi dividida com 16-27 minutos contra 11; e esta escada
    mesma é exatamente isso.

E agora as falhas, porque sem elas isto seria propaganda e não um levantamento: o turno órfão de
uma hora e quarenta e três (14 de outubro); um erro de autenticação relatado como "sucesso"; duas
portas de administrador em 24 horas; 23 pushes num dia que queimaram a cota do GitHub Actions; a
chave do banco de dados impressa numa transcrição; um `CLAUDE.md` que virou um histórico de
mudanças de 9.661 linhas; o aplicativo móvel do Forge que perde as abas; e os medidores que mentiram
duas vezes. Tudo isso aconteceu. E tudo isso está na escada, porque é daí que saem os degraus.

---

## Parte B — A escada, versão 3

### Como ler cada degrau

Cada degrau tem sete partes, sempre as mesmas, para que se possam comparar:

- **Intenção**: o que busca, numa frase.
- **Entradas**: o que tem que existir antes para poder subi-lo.
- **Artefato**: o que fica escrito ou executável quando se sobe. Sempre algo concreto: um
  arquivo, um teste, um script.
- **Comporta**: o que tem que ser verdade para passar ao seguinte. Se não se cumpre, não se sobe.
- **Quem decide**: o dono do projeto, o agente, ou ninguém porque é automático.
- **Falha que evita**: o tropeço real que o originou. Isto é o que o torna crível.
- **Evidência**: o commit ou documento onde está.

Dois esclarecimentos importantes. Primeiro: **a escada é neutra em relação à ferramenta**. Cada
artefato é um arquivo, um teste ou um script; nenhum exige o Forge. O Forge os automatiza (as
comportas, os comandos, o registro de pendências), mas o degrau existe sem o Forge. Segundo: **os
degraus não são estritamente sequenciais**. Há três fases: os de 0 a 4 são de arranque e se sobem
uma vez por projeto; os de 5 a 10 são o ciclo que se repete a cada mudança; e os de 11 a 15 são de
operação, quando o sistema já está vivo. O 15 fecha o ciclo e volta ao 0 para o próximo projeto.

### Como se executa cada degrau: o contrato

A ficha de sete partes diz o que cada degrau busca e o que deixa. Mas um degrau se entende
cabalmente só quando se vê **como se pede, o que tem que voltar e como sei que voltou completo**.
Por isso cada degrau tem, além da ficha, um **contrato** num arquivo próprio dentro de
`peldanos/`, sempre com as mesmas cinco seções:

1. **Contexto necessário** — nomeado de forma genérica ("levantamento de dados de volumetria",
   "acesso de leitura ao sistema anterior", "a lista de ações com consequência real"), sem descer ao
   detalhe da engenharia de sistemas. Os levantamentos são por natureza incompletos; não tentamos
   torná-los completos com um formulário.
2. **Prompt(s)** — o que se dá ao modelo, textual. O inicial e, quando o degrau é uma conversa, o
   de fechamento. Todos levam a mesma cláusula, que é o coração do assunto: *o modelo avalia se o
   contexto é suficiente; se não é, pede tudo o que falta antes de seguir; e não estima nem inventa
   um dado que só o negócio tem*. Quem sabe o que falta para calcular é o modelo, não um formulário.
3. **Resultado esperado** — as características detalhadas do artefato: que arquivo, que seções, o
   que cada uma tem que ter, o que não pode faltar.
4. **Verificação de completude** — a lista de comprovações que o dono faz sobre o artefato, **sem
   ler código**. Se uma dá "não", o degrau não foi subido.
5. **Sinais de alerta** — dois ou três sintomas de que o degrau foi subido mal ainda que pareça
   subido. São os que se veem semanas depois, quando já dói.

E no cabeçalho de cada contrato, além da fase e da forma, o **tamanho**: se o degrau é obrigatório
em todo projeto ou proporcional, e o que significa "proporcional" num pequeno.

**Os prompts estão em inglês.** É uma decisão (D-013) e tem três razões: o mesmo conteúdo em
espanhol ocupa entre 30 e 50 % mais tokens; a capacidade de seguir instruções dos modelos está
melhor calibrada em inglês, de modo que um prompt em inglês tolera melhor a brevidade sem se tornar
ambíguo; e o vocabulário do ofício (test, commit, rollback, mock) é inglês. Abaixo de cada prompt
vai a explicação, no idioma do leitor, do que estamos pedindo e por que cada cláusula está ali: o
prompt é uma única peça idêntica nas oito versões do documento; a explicação é o que se traduz. E
todos terminam com "Reply in my language", porque o prompt está em inglês mas a conversa não precisa
estar.

Esses dezesseis contratos são, além disso, o que depois se exporta ao Forge: hoje o Forge injeta
uma doutrina quando se cruza uma comporta; o contrato do degrau *é* essa doutrina, e o prompt *é* o
que se injeta. Escrevê-los para o curso e escrevê-los para o fluxo do Forge é o mesmo trabalho.

### O que é obrigatório e o que é proporcional, segundo o tamanho do projeto

Uma pergunta que aparece logo: "tudo isso para um sistema pequeno?". A resposta é que dezesseis
degraus não são dezesseis semanas; vários se sobem numa hora, e os que são proporcionais encolhem
com o projeto. O que não encolhe é a lista dos que não se negociam. Esta tabela é uma proposta
`[hipótese]` para confirmar com o primeiro projeto que usar o método de ponta a ponta:

| Degrau | Projeto pequeno (um dono, poucos usuários, sem dinheiro em jogo) | Projeto com usuários e consequências |
|---|---|---|
| 0 Elegibilidade | obrigatório (uma hora) | obrigatório |
| 1 Contrato | obrigatório (meia hora) | obrigatório |
| 2 Definição | obrigatório, cinquenta linhas bastam | obrigatório |
| 3 Dimensionar | obrigatório, meia página e uma decisão | obrigatório, completo |
| 4 Esqueleto | obrigatório se vai ter usuários | obrigatório |
| 5 Pendências | obrigatório | obrigatório |
| 6 Decisões | obrigatório | obrigatório |
| 7 Testes em vermelho | obrigatório | obrigatório |
| 8 Simetria | a regra sim; o mapa, opcional | obrigatório com mapa |
| 9 Medir | proporcional: contar e anotar | obrigatório, com medidores e orçamentos |
| 10 Verificação honesta | obrigatório | obrigatório |
| 11 Auditoria | uma, antes da produção | periódica |
| 12 Fail-closed | opcional se é somente leitura | obrigatório |
| 13 Integração e implantação | mínimo: testes sozinhos, configuração fora, caminho de volta | obrigatório, completo |
| 14 Documentação | mínimo: recuperação | os três manuais |
| 15 Residente e retrospectiva | retrospectiva de uma página | ambos |

Em resumo: há nove degraus que não se negociam em nenhum projeto (0, 1, 2, 3, 5, 6, 7, 10 e a
retrospectiva do 15), e sete que se dimensionam com o projeto.

### Como se usa com qualquer ferramenta

O método é neutro de ferramenta; o que muda entre uma e outra é **onde se coloca cada artefato**
para que o modelo o leia. A correspondência, para as ferramentas mais usadas no final de 2026:

| Artefato do método | Claude Code | Cursor | Codex CLI / Gemini CLI | Forge |
|---|---|---|---|---|
| Contrato de convivência (P1) e rotinas (P5, P6, P7, P8, P10, P14) | `CLAUDE.md` do projeto | `.cursor/rules/` | `AGENTS.md` / `GEMINI.md` | doutrinas injetadas por comporta |
| Definição do projeto (P2) | `CLAUDE.md` + `docs/STATUS.md` | igual, em regras e docs | igual | `PROJECT.md` + `.forge/sumi-context.md` |
| Registro de pendências (P5) | `docs/PENDING.md` ou issues | igual | igual | registro de pendências nativo com verbos |
| Prompts de degrau (todos) | colam-se no chat ao subir o degrau | igual | igual | injetam-se ao cruzar a comporta |
| Comportas (P4) | `docs/GATES.md`, manual | igual | igual | G1 a G9, automáticas |
| Medidores e orçamentos (P9) | scripts no repositório com teste | igual | igual | igual, mais a catraca estática |

A coluna do Forge é a que mais automatiza; as outras três funcionam igualmente bem se o dono faz à
mão o que o Forge faz sozinho: colar o prompt do degrau no momento certo e exigir a verificação de
completude antes de passar ao seguinte. Essa é, de fato, a prática do curso.

### Passo 0 — Este projeto pode ser encarado assim? (a elegibilidade)

Este degrau tem uma história particular. Pablo disse em 17 de outubro: há algo prévio a tudo, que
não está em nenhum repositório porque sempre chegou decidido — a decisão de **se um projeto se
encara com este método ou não**. É um critério que vivia na cabeça dele, e que vamos elaborar
juntos. Então tudo o que segue neste degrau é, em parte, confirmado por ele, e em parte hipótese
minha para começar a conversa. Distingo com cuidado.

- **Intenção**: decidir se um projeto se encara com este método, e com um agente à frente, ou não,
  ANTES de abrir o repositório. Porque se você entra num projeto que não dá, o método se degrada em
  "programar com IA" e aí sim o dono acaba lendo código.
- **Entradas**: o pedido do cliente, o domínio do negócio, os dados, a tecnologia, os ambientes
  disponíveis, e quem vai ser o dono.
- **Artefato**: uma ficha de elegibilidade de uma página, com os critérios pontuados e a decisão:
  vai, não vai, ou vai com condições.
- **Comporta**: os critérios excludentes estão todos em verde, e a pontuação dos que ponderam
  supera o limiar (limiar que ainda não definimos).
- **Quem decide**: hoje, Pablo. A ideia é que o método permita que outra pessoa decida com a mesma
  ficha.
- **Falha que evita**: meter-se num projeto onde o agente não pode se verificar sozinho, ou onde
  não há um dono do domínio que decida, e acabar com o humano revisando código linha por linha.
- **Contrato (como se executa)**: `peldanos/peldano-00-elegibilidad.md`.

**Os dois critérios excludentes que Pablo confirmou (17 de outubro).** E atenção a este detalhe,
que me parece muito fino: saem dos projetos que Pablo *rejeitou*, não dos que aceitou. Os "não"
definem a fronteira melhor que os "sim".

| # | Critério excludente | Palavras de Pablo, textuais (traduzidas) | Por que mata o método |
|---|---|---|---|
| X1 | Tecnologia herdada sem repositório acessível, ou com repositórios que não seguem um padrão | "Tecnologias legacy sem repo acessível ou com repos não padrão" | Sem um repositório padrão não há onde deixar a evidência: não há pendências citadas nos commits (degrau 5), nem testes que viajem com o código (7), nem integração e implantação como pacote (13), nem documentação no mesmo commit (14). O agente trabalha às cegas e não deixa rastro verificável. |
| X2 | Tecnologia que não se pode provar de ponta a ponta: não se podem executar as telas e acessar cada elemento da interface com seus diferentes métodos, validando que a mudança chegou ao backend | "Não podemos testar o end to end a partir da tela validando as mudanças no backend"; e depois: "NAC3 não é obrigatório. SIM testar a partir da execução das telas e do acesso a cada elemento da interface com seus diferentes métodos" | Sem essa verificação de tela a backend o agente não pode se provar sozinho (degraus 7, 9 e 10), e então o dono teria que ler código — que é justamente o que o método promete evitar. |

Uma precisão que Pablo fez e que vale ouro para a neutralidade de ferramenta: **NAC3 (o protocolo
que o Forge usa para que as telas possam ser operadas por programa) NÃO é condição; é o meio com
que hoje conseguimos**. O critério neutro fica assim: a interface pode ser executada por programa,
e cada elemento da tela é acessível com seus diferentes métodos (clicar, digitar, ler seu estado),
de modo que um teste possa percorrer a tela e depois verificar o efeito no backend. Uma tecnologia
cuja interface não expõe seus elementos a um "driver" (como o Playwright, por exemplo) fica de fora,
ainda que tenha repositório.

E uma leitura minha sobre esses dois: no fundo são **a mesma condição vista de dois lados**. O
agente tem que poder se verificar sozinho, de ponta a ponta, e deixar a evidência no repositório. X1
é a metade "onde fica a evidência?"; X2 é a metade "como se produz a evidência?". Isso converte duas
das minhas hipóteses abaixo (D3 e D8) em consequências de X1 e X2, não em critérios à parte.

`[hipótese]` **Critérios candidatos que eu vejo nos três casos.** Estes há que confirmar, pesar e
completar com Pablo; com certeza faltam os que estão na cabeça dele.

| # | Critério candidato | Como se viu nos casos | Excludente? |
|---|---|---|---|
| D1 | Há um dono do domínio com critério e com tempo para decidir (não para programar) | Pablo nos três; "regra Pablo", "decisão Pablo" com data | `[?]` |
| D2 | Há um "oráculo" de verdade verificável: dados reais, um sistema externo, produção em somente leitura | o Plano de Saúde e seu Autorizador como oráculo (o caso 1.355 contra 1.234); produção em somente leitura | `[?]` |
| D3 | O agente pode provar sozinho: acesso a ambientes de teste, integração contínua, dados de teste | UAT nos dois projetos da Associação; um semeador de dados anonimizados (pnd511) | absorvido por X2 |
| D4 | A tecnologia está dentro do que o agente domina sem inventar (Node, Python, SQL, React) | os três | `[?]` |
| D5 | O erro tem consequência real (dinheiro, saúde, operação), o que justifica o fail-closed | o Plano de Saúde (saúde, cobranças), a Associação (famílias) | `[?]` |
| D6 | A volumetria pode ser conhecida desde o dia um (dimensionamento G9) | Kikan: 3,4 milhões de linhas por ano; o Plano de Saúde: 7.819 linhas | `[?]` |
| D7 | O cliente tolera um tempo de maturação e um humano no circuito (não tudo automático no dia um) | o aprovador automático com modo de ensaio; o humano no circuito do Plano de Saúde | `[?]` |
| D8 | Projeto novo, ou herdado mas auditável (se há legado: audita-se primeiro, e zero "fallback" ao legado) | SQ 0.2; a ferramenta de migração do Forge | absorvido por X1 |
| D9 | O escopo cabe num repositório e um dono (sem coordenação entre várias equipes) | os três | `[?]` |
| D10 | Os segredos e acessos podem ser isolados (cofre, arquivo de ambiente, permissões delimitadas) | `forge-embed.env`, a chave de API mapeada a quem a criou | `[?]` |

**Perguntas para elaborar juntos**: de D1 a D10, quais mais são excludentes e quais ponderam? Que
peso tem cada um? Que outros projetos Pablo rejeitou e por quê? E, muito importante, há critérios
de negócio (margem, relação com o cliente, tempo disponível de Pablo) que não saem de nenhum
repositório e que também decidem?

### Passo 1 — O contrato de convivência (as regras antes do código)

Antes de escrever uma única linha, humano e agente combinam como vão trabalhar. Parece uma
formalidade, e não é: é o que evita 80 % das frustrações do mês um.

- **Intenção**: fixar como trabalham o humano e o agente antes da primeira linha de código.
- **Entradas**: nada; é o primeiro arquivo do projeto.
- **Artefato**: um documento de padrões de qualidade (no Forge se chama `SQ.md`, mas pode se chamar
  como quiser) que diga, no mínimo: o tempo do humano é sagrado (não se gasta em coisas que o agente
  pode resolver sozinho); zero dívida técnica, isto é, quando algo quebra se conserta na raiz e se
  adiciona a regressão na mesma sessão; o escopo é exato, nem mais nem menos do que o pedido;
  fala-se no idioma do usuário; a documentação se atualiza no mesmo commit; e jamais se anuncia
  como feito algo que não se fez.
- **Comporta**: o contrato está no repositório e se lê em cada sessão.
- **Quem decide**: o dono. O agente pode propor mudanças, mas não edita o contrato por conta
  própria.
- **Falha que evita**: o agente que "ajuda" expandindo o escopo porque lhe pareceu boa ideia; o que
  deixa dívida "para depois" (e o depois nunca chega); e o que relata como feito o que *acredita*
  ter feito.
- **Evidência**: `2219f7a` (25 de maio); as regras SQ 1 a 9 em `src/chat/server.ts`; `docs/SQ.md`,
  seções 0.1 a 0.11.
- **Contrato (como se executa)**: `peldanos/peldano-01-contrato-de-convivencia.md`.

### Passo 2 — A definição do projeto e a leitura obrigatória

Cada sessão do agente começa do zero: ele não se lembra de ontem. Então é preciso dar-lhe um mapa,
e é preciso obrigá-lo a lê-lo antes de tocar em nada.

- **Intenção**: que cada sessão comece sabendo o que é o projeto, em que estado está e que decisões
  já foram tomadas.
- **Entradas**: o contrato (degrau 1) e o pedido do cliente.
- **Artefato**: um arquivo de projeto operacional (`PROJECT.md` ou `CLAUDE.md`), e aqui uma
  ênfase: CURTO. É o programa, não o histórico. Mais um arquivo de estado vivo (no Forge,
  `.forge/sumi-context.md`) com a especificação atual, a fatia em que se está trabalhando, as
  decisões recentes e as dúvidas abertas. E uma memória de decisões.
- **Comporta**: o agente lê o mapa antes de tocar código. No Forge isto é uma regra explícita:
  "leia primeiro o grafo de conhecimento".
- **Quem decide**: o dono define; o agente mantém em dia.
- **Falha que evita**: duas, bem concretas. Uma: trabalho descartável por não ter lido o mapa
  (aconteceu comigo em 12 de junho e custou uma tarde). Duas: o `CLAUDE.md` do Kikan que cresceu até
  9.661 linhas e 789 kilobytes, impossível de ler para qualquer um — o arquivo operacional e o livro
  de casos têm que ser arquivos distintos.
- **Evidência**: SQ 1.1 (leitura obrigatória); memória `feedback_read_knowledge_graph_first`;
  `AUDITORIA_CALIDAD_CODIGO_2026_10_15.md`.
- **Contrato (como se executa)**: `peldanos/peldano-02-definicion-y-lectura.md`.

### Passo 3 — Dimensionar antes de desenhar a arquitetura

Este é o degrau que mais caro custa pular, e sabemos porque o pulamos.

- **Intenção**: que as decisões estruturais (que motor de banco de dados, se a interface é síncrona
  ou assíncrona, quanta concorrência) sejam tomadas com números e não com gosto.
- **Entradas**: um levantamento de dados de volumetria feito com o negócio (entidades, eventos,
  operadores no pico, conservação, cargas excepcionais), por natureza incompleto; e acesso de leitura
  ao sistema anterior se existir. Há dados que **só o negócio tem** e o modelo não pode inferir: por
  isso o prompt exige que avalie se estão completos e peça os que faltam, em vez de estimá-los com
  cara de seguro.
- **Artefato**: um registro de dimensionamento com opções FIXAS (não uma lista aberta: três ou
  quatro opções concretas) e a escolhida. No Forge é a comporta G9. E as decisões "assimétricas"
  declaradas explicitamente — por exemplo, "a interface de persistência é assíncrona desde a linha um
  ainda que o primeiro motor seja síncrono", porque se você estiver errado custa pouco e se não fizer
  custa uma fortuna.
- **Comporta**: o dimensionamento está registrado antes de montar o esqueleto.
- **Quem decide**: o dono escolhe entre as opções fixas; o agente as apresenta com números.
- **Falha que evita**: a do Kikan. Começou-se com um armazenamento em arquivos JSON, e quando se
  mediu resultou que o sistema ia gerar 3,4 milhões de linhas por ano. Mudar a interface de
  persistência depois custou a etapa E6 da reengenharia: três baterias de testes inteiras passadas
  para assíncrono, mais de uma semana.
- **Evidência**: `0bd1b05` (dimensionamento, 11 de outubro); `7391cc5` (interface de persistência,
  13 de outubro); SQ 1.2 e 1.3; `docs/doctrine/sizing.md` (os "quatro buracos", mais o quinto).
- **Contrato (como se executa)**: `peldanos/peldano-03-dimensionar.md`.

### Passo 4 — O esqueleto com suas comportas

Antes de o sistema fazer algo útil, tem que arrancar, ser testado e implantado VAZIO. Sim, vazio.
Porque descobrir a implantação no final é caríssimo.

- **Intenção**: ter um sistema que arranca, se prova e se implanta sem nenhuma funcionalidade
  ainda.
- **Entradas**: o dimensionamento (degrau 3) e o tipo de fluxo (projeto novo, correção, ou evolução
  de algo que já existe).
- **Artefato**: o esqueleto com a integração contínua em verde, a estrutura de testes montada, uma
  implantação num ambiente de teste que funciona, e as comportas G1 a G9 declaradas.
- **Comporta**: o esqueleto está em verde, a integração contínua roda, e a implantação no ambiente
  de teste funciona com zero funcionalidades.
- **Quem decide**: o agente executa; o dono aprova visualmente (com uma captura de tela ou uma
  prova automatizada que a gere).
- **Falha que evita**: no Kikan a implantação chegou em 23 de setembro, um mês depois do início, e
  entre 30 de setembro e 4 de outubro houve cinco pendências seguidas só para que a implantação
  funcionasse bem. Se o esqueleto tivesse sido implantado vazio na primeira semana, esses cinco
  golpes teriam caído com zero funcionalidade em jogo.
- **Evidência**: `docs/doctrine/gates.md`; `workflow-kinds.md` (projeto novo, passos 6 de 18); a
  política de testes, "scaffold gate green"; `ci.yml` do Kikan, 28 de agosto.
- **Contrato (como se executa)**: `peldanos/peldano-04-esqueleto.md`.

### Passo 5 — O plano são as pendências

Aqui há uma ideia que, quando você pega, não solta mais: não há "plano" de um lado e "lista de
tarefas" do outro. **A lista de pendências É o plano.**

- **Intenção**: uma única fila de trabalho, com ordem e com comporta, que seja a verdade do
  projeto.
- **Entradas**: a especificação inicial, as auditorias, os pedidos do cliente, e os tropeços.
- **Artefato**: um registro de pendências numeradas (PND-001, PND-002…), cada uma com título,
  estado, a decisão que a originou e o teste que a fecha. E cada commit cita sua pendência.
- **Comporta**: nenhuma mudança entra sem uma pendência; e a pendência se fecha com evidência, não
  com "pronto".
- **Quem decide**: o dono prioriza; o agente propõe e executa em ordem.
- **Falha que evita**: a especificação que "se supera" e fica obsoleta em duas semanas (aconteceu
  com Autorizações e seu documento de desenho inicial); e o trabalho do qual, seis meses depois,
  ninguém sabe por que foi feito.
- **Evidência**: `4fc82c6` (6 de junho); `docs/PENDING_REGISTRY_PLAN.md`; 641 pendências em
  Autorizações; 19 documentos de pendências no Kikan; memória `project_pending_registry_is_plan`.
- **Contrato (como se executa)**: `peldanos/peldano-05-pendientes.md`.

### Passo 6 — As decisões se escrevem junto ao código

Cada regra de negócio e cada decisão estrutural tem que ter um dono, uma data e um lugar onde está
escrita. Se não, em seis semanas ninguém sabe se "aprovada mais saldo volta para a fila" foi uma
decisão do cliente ou uma ideia do agente.

- **Intenção**: que cada regra de domínio ou decisão estrutural tenha dono, data e lugar.
- **Entradas**: a conversa com o dono.
- **Artefato**: a decisão escrita no commit, no documento da pendência, ou num registro de
  decisões. E quando o dono não respondeu e o agente teve que escolher, fica marcado como "decisão
  por omissão" para que possa ser revisada.
- **Comporta**: uma regra de negócio não entra no código sem sua frase de origem.
- **Quem decide**: o dono. Sempre. Sem exceções.
- **Falha que evita**: discutir seis semanas depois por que algo é assim; e, pior, o agente
  inventando regras de domínio porque lhe pareceram razoáveis.
- **Evidência**: `0ae3ae6 (pnd550)`, com o texto "regra Pablo" e "decisão Pablo 2026-08-10" dentro
  do commit; `docs/DIRECTOR_DECISIONS_2026_06_04.md`; SQ 7 (memória de decisões).
- **Contrato (como se executa)**: `peldanos/peldano-06-decisiones.md`.

### Passo 7 — Testes como cadeados, provados em vermelho

Um teste que você nunca viu falhar, você não sabe se prova algo. Por isso aqui a regra não é
"escreva testes"; é "demonstre que o teste fica vermelho contra o código antigo".

- **Intenção**: que cada comportamento que importa tenha um teste que FALHA se quebra, e que se
  saiba, com certeza, que falha.
- **Entradas**: a mudança já implementada (por padrão os testes vêm depois de implementar;
  "primeiro o teste" fica como opção para escopos pequenos).
- **Artefato**: o teste novo, mais a regressão das pendências vizinhas rodada na mesma sessão. E no
  commit, textual: "provado em VERMELHO contra o critério antigo", "verificado VERMELHO 4 de 8".
- **Comporta**: vermelho demonstrado → verde → regressão em verde. E o agente não se mocka a si
  mesmo (não substitui por simulações as partes que justamente quer provar).
- **Quem decide**: o agente executa e relata; o dono não revisa o teste, revisa o relatório.
- **Falha que evita**: os testes que passam porque não provam nada; e o verde que esconde um bug —
  aconteceu conosco que uma bateria inteira "morria" por falta de memória e parecia um teste
  falhando (`1d7a20b`).
- **Evidência**: `docs/doctrine/testing-policy.md` (4 de junho); `ab3e529 (pnd517)`; `0ae3ae6
  (pnd550)`; `e18406d (pnd452)`, "vermelha sem o try/except".
- **Contrato (como se executa)**: `peldanos/peldano-07-tests-en-rojo.md`.

### Passo 8 — Simetria entre produtor e consumidor, e o registro de antipadrões

Quando você muda uma ponta (o servidor, o robô, o esquema do banco), a outra ponta (a tela, o
contador, o consumidor) tem que mudar no mesmo commit. Se não, cedo ou tarde divergem, e o usuário
vê um número de um lado e outro número do outro.

- **Intenção**: que uma mudança numa ponta arraste a outra, sempre, no mesmo commit.
- **Entradas**: qualquer mudança de contrato entre duas partes do sistema.
- **Artefato**: o servidor define a lista (as colunas, as causas, as comportas) e o consumidor a lê
  de lá, em vez de ter sua própria cópia. Mais o registro de GOTCHAS: cada antipadrão com seu cheiro,
  sua causa raiz, sua correção e como detectá-lo antes.
- **Comporta**: é automática (regra SQ 14): o agente procura o outro lado antes de dar por fechada
  uma mudança.
- **Quem decide**: ninguém; é automático.
- **Falha que evita**: o contador que não coincide com a consulta (1.355 contra 1.234); a deriva
  entre a versão web e a móvel (GOTCHAS G-2); duas cópias do mesmo módulo que se dessincronizam
  (G-3; no Kikan há 8 módulos duplicados entre web e móvel, detectados na auditoria).
- **Evidência**: SQ 14; `docs/GOTCHAS.md` (27 de maio); `50fe968 (pnd510)`; `7251129 (pnd509)`.
- **Contrato (como se executa)**: `peldanos/peldano-08-simetria-y-antipatrones.md`.

### Passo 9 — Medir antes de construir, com um instrumento que também se verifica

Este é, para mim, o degrau mais "adulto" de todos, e o que mais demorou a aparecer. A regra é: todo
número que alimenta uma decisão sai de um programa com teste. Não de um `grep`, não de uma
impressão, não de "acho que são uns cem".

- **Intenção**: que todo número que alimenta uma decisão saia de um instrumento com teste, e que o
  próprio instrumento seja auditado.
- **Entradas**: uma hipótese (do dono ou do agente) sobre uma causa, uma quantidade ou um custo.
- **Artefato**: um "medidor com guarda" (um script mais um teste que o protege) que viaja no
  repositório; um orçamento por caminho (quantas consultas, quantos laços) apertado ao medido mais
  uma margem pequena; e uma "catraca", um contador que só pode descer.
- **Comporta**: as cinco regras da seção 11.b do Kikan: (1) medidor com guarda; (2) se o instrumento
  não existe, constrói-se; (3) audita-se em duas direções (do código à medida e da medida ao código);
  (4) o aproximado se marca como aproximado; e (5) quem executa verifica os números de quem planejou.
- **Quem decide**: o número. O dono traz a hipótese; o agente a mede antes de construir. E uma
  observação de meses de trabalho com Pablo: ele costuma ter razão no sintoma, e a causa costuma
  estar ao lado de onde ele a situa — por isso se mede, não se discute.
- **Falha que evita**: os "121 laços" que eram 79; as "27 corridas" que eram 44; o medidor que
  mentia porque o banco já tinha aplicada uma mudança de esquema; a catraca com o contador em zero
  que não estava vendo 84 chamadas.
- **Evidência**: `REINGENIERIA_PERSISTENCIA_SQL.md`, seção 11.b; `880ac0f`, `f955620`,
  `1d55a93`, `0730082` (63 sobre 60); `_diag_pnd517_counters.py`; memórias
  `feedback_medidor_con_guarda`, `feedback_medir_la_hipotesis`,
  `feedback_validar_limites_con_el_log`.
- **Contrato (como se executa)**: `peldanos/peldano-09-medir.md`.

### Passo 10 — Verificação honesta e relatório proporcional

Se o dono não vai ler código, o relatório do agente tem que ser confiável. Não "otimista", não
"completo na aparência": confiável. E isso tem regras.

- **Intenção**: que o relatório do agente seja confiável sem que o dono leia código.
- **Entradas**: o trabalho feito.
- **Artefato**: um relatório que separa claramente o "verificado" do "acreditado"; que declara seus
  pontos cegos (o que não pôde provar); que cobre cada item do que se pediu, um por um; e que cita a
  evidência (o log, o teste, o número).
- **Comporta**: nenhuma afirmação sem sua prova. "Pronto" se diz só com a disciplina de "pronto"
  (SQ 5). E diante de um "continua quebrado", a primeira coisa é comparar que versão está publicada
  contra qual tem a correção, antes de voltar a diagnosticar.
- **Quem decide**: o dono confia, ou pede a evidência. Nunca revisa o código.
- **Falha que evita**: o erro de autenticação que o Forge relatou como "sucesso" (14 de outubro);
  anunciar trabalho não feito (SQ 9c); e o agente que diz "corrigido" quando a correção está no
  repositório mas ainda não foi publicada.
- **Evidência**: `docs/doctrine/verification-honesty.md` (10 de junho); SQ 9a, 9b e 9c; SQ 5;
  memória `feedback_check_published_version_first`.
- **Contrato (como se executa)**: `peldanos/peldano-10-verificacion-honesta.md`.

### Passo 11 — A auditoria periódica como insumo do plano

De vez em quando é preciso olhar o sistema inteiro com olhos frescos. E o que se vê não vai para um
relatório que se arquiva: vai para a fila de pendências.

- **Intenção**: olhar o sistema completo de vez em quando e converter o visto em pendências.
- **Entradas**: o repositório inteiro, e produção em somente leitura.
- **Artefato**: um relatório com achados graduados (P0 o urgente, P1, P2…; ou notas por dimensão)
  que termina em pendências numeradas. Idealmente feito por um auditor diferente do construtor: no
  nosso caso, eu (Sumi) audito o que o Forge constrói, e o Forge absorve os achados.
- **Comporta**: cada achado P0 tem uma pendência aberta antes de dar por fechada a auditoria.
- **Quem decide**: o dono prioriza os achados.
- **Falha que evita**: uma senha de superadministrador escrita a fogo no código que ninguém tinha
  visto; 264 consultas que liam tabelas inteiras; uma vulnerabilidade conhecida numa dependência; um
  componente de tela de 2.679 linhas.
- **Evidência**: full-scan de 23 de junho e segurança de 16 de julho (Autorizações); AUD-* → 19
  pendências (Kikan, 28 de agosto); `INTEGRIDAD_..._10_14.md`, absorvido em `b266f11`;
  `AUDITORIA_CALIDAD_..._10_15.md`.
- **Contrato (como se executa)**: `peldanos/peldano-11-auditoria.md`.

### Passo 12 — Fail-closed, cadeados e zero dano silencioso

Na dúvida ou na falha, o sistema NÃO age. E diz. Isto soa óbvio, mas é o contrário do que o
software faz por padrão, que na dúvida segue em frente.

- **Intenção**: que o sistema, diante de dúvida ou falha, não aja, e avise.
- **Entradas**: qualquer ação com consequência (cobrar, enviar, aprovar, apagar).
- **Artefato**: cadeados (segurança dupla, botão de pânico), um modo de ensaio antes de automatizar
  de verdade, um vigia que empurra com guardas, permissões e aprovações explícitas para o agente, e
  buscas que, se falham, não quebram a tela.
- **Comporta**: toda ação irreversível tem cadeado e um caminho de volta documentado.
- **Quem decide**: o dono aprova o cadeado; o sistema nunca o pula.
- **Falha que evita**: uma cobrança dupla; uma aprovação automática sem passar por um humano; um
  `git add -A` que sobe um token ao repositório; apagar dados do cliente.
- **Evidência**: `0954740 (pnd524)`; `e18406d (pnd452)`; o aprovador automático em modo de ensaio;
  SQ 0.3 (zero dano silencioso); os verbos NAC3 com aprovação.
- **Contrato (como se executa)**: `peldanos/peldano-12-fail-closed.md`.

### Passo 13 — Integração contínua, ambientes, segredos e implantação como parte do produto

Chegar à produção tem que ser um pacote reproduzível: os testes rodam UMA vez, a configuração vive
fora do repositório, e os segredos não ficam circulando.

- **Intenção**: que chegar à produção seja um pacote reproduzível, com os testes rodados uma só vez
  e a configuração fora do repositório.
- **Entradas**: o esqueleto (degrau 4) e os testes (degrau 7).
- **Artefato**: uma integração contínua que roda a bateria; uma implantação que espera o resultado
  dessa integração e só empacota e sobe; a configuração só no servidor (num arquivo de ambiente ou
  num cofre); uma promoção explícita do ambiente de teste ao de produção; um procedimento (runbook)
  que pode ser rodado duas vezes sem quebrar nada; e a cota de minutos de integração contínua
  vigiada.
- **Comporta**: o ambiente de teste em verde antes de tocar produção; o caminho de volta
  (rollback) provado; e nenhum segredo no repositório nem no chat — se colou um por engano,
  rotaciona-se.
- **Quem decide**: o dono promove a produção; o agente prepara tudo.
- **Falha que evita**: os testes rodando três vezes por commit (de 16 a 27 minutos cada; 2.000
  minutos em 16 dias, cota queimada); a chave do banco de dados impressa numa transcrição; o CORS
  derivado só do primeiro nome de domínio do servidor; a configuração sobrescrita pela bateria de
  testes (PND-107).
- **Evidência**: `39497b0` (gate-ci); `0bd20a8 (PND-107)`; `513c8d0 (PND-108)`; `7658e2e`
  (promoção); memórias `project_kikan_deploy_solo_empaqueta` e
  `project_embed_apikey_environmentfile`.
- **Contrato (como se executa)**: `peldanos/peldano-13-ci-entornos-secretos-deploy.md`.

### Passo 14 — Documentação viva e manuais que uma pessoa pode seguir sem IA

O sistema tem que poder ser usado, mantido e recuperado sem o agente e sem a pessoa que o
construiu. Se no dia em que o agente não está não dá para implantar, não está terminado.

- **Intenção**: que o sistema possa ser usado, mantido e recuperado sem o agente e sem o
  construtor.
- **Entradas**: cada mudança (no Forge, a comporta G-DOC).
- **Artefato**: o manual de usuário, o de manutenção, o manual interno de infraestrutura
  "reproduzível à mão, sem IA", o de recuperação de desastres, e o diário de mudanças. Tudo no mesmo
  commit que a mudança que o motivou.
- **Comporta**: a documentação está em dia (SQ 4); o manual se regenera junto com o sistema.
- **Quem decide**: o agente mantém; o dono lê o manual, não o código.
- **Falha que evita**: um documento de gestão de repositórios desatualizado que provocou um commit
  no repositório errado; e o `CLAUDE.md` convertido em histórico de mudanças.
- **Evidência**: SQ 3.3, 3.4 e 6; o manual de 26 de junho; `6444ce6 (pnd442)`; `a30cee3
  (pnd459)`; o manual do Kikan com imagens incorporadas de 16 de outubro.
- **Contrato (como se executa)**: `peldanos/peldano-14-documentacion-viva.md`.

### Passo 15 — O agente dentro do sistema, e a retrospectiva com número

O último degrau tem duas partes que parecem distintas mas fecham o mesmo ciclo. Primeiro: o agente
fica residente em produção, com escopo delimitado. Segundo: o próprio método se revisa com números,
e o que se aprende volta ao degrau 0 para o próximo projeto.

- **Intenção**: que o agente fique residente em produção com escopo delimitado (diagnóstico →
  operação → suporte), e que o método se revise com números.
- **Entradas**: o sistema em produção, os incidentes, os custos.
- **Artefato**: o agente embarcado com um mapa do sistema obrigatório, permissões delimitadas, uma
  chave de API que age como a pessoa que a criou, e tickets. Mais uma retrospectiva escrita com
  medição (um paper, um relatório) que muda o método e volta ao degrau 0.
- **Comporta**: o agente embarcado não pode fazer o que o dono não aprovou; e a retrospectiva
  produz pelo menos uma mudança na escada.
- **Quem decide**: o dono.
- **Falha que evita**: a equipe multiagente que gastava o dobro e entregava a metade (encerrada
  com números em 5 de junho); e o agente operando dentro de um sistema sem ter um mapa desse
  sistema.
- **Evidência**: `docs/PAPER_SUMI_VS_AGENTIC.md`; `7584f8b`; `1c7c0b5` (o embarcado, PND-147);
  `c602725` (modo operação); `20fdbe7` e `1558ee4` (PND-257 e PND-223); a memória do assistente
  residente em produção.
- **Contrato (como se executa)**: `peldanos/peldano-15-agente-residente-y-retrospectiva.md`.

---

## Parte C — As falhas reais, e que degrau cobre cada uma

Esta tabela é, de certo modo, a prova da escada: cada tropeço que levamos tem que cair em algum
degrau. Se há um tropeço que não cai em nenhum, falta um degrau.

| Falha (e quando aconteceu) | Degrau que a cobre | Está fechada? |
|---|---|---|
| A equipe multiagente: 60 dólares e 73 minutos para uma entrega pela metade (5 de junho) | 15, retrospectiva com número | sim (redesenhou-se) |
| Trabalho descartado por não ler o mapa (12 de junho) | 2, leitura obrigatória | sim |
| PND-300: três correções que não eram na raiz (14 de julho) | 1, zero dívida / 9, medir | sim (na quarta rodada) |
| O contador 1.355 contra 1.234 (7 de agosto) | 9, instrumento / 8, simetria | sim |
| 3,4 milhões de linhas por ano sobre arquivos JSON, interface síncrona (11 de outubro) | 3, dimensionar | sim (etapas E1 a E12) |
| Medidores que mentiam: 27 que eram 44, a catraca em zero (13 de outubro) | 9, verificar o instrumento | sim |
| O turno órfão de 1 hora 43, seis commits invisíveis (14 de outubro) | 10, verificação honesta / 12, fail-closed | sim (versão 1.18.0) |
| Testes rodados três vezes por commit; cota do GitHub Actions queimada (14 de outubro) | 13, integração como produto | sim (gate-ci); a cota tem que ser ampliada por Pablo |
| Duas portas de administrador em 24 horas (15 de outubro) | 11, auditoria externa / 12, cadeados | sim (PND-223 retirada) |
| A chave do MariaDB e as chaves `yerp_` coladas no chat (14 e 16 de outubro) | 13, segredos | a rotação está pendente de Pablo |
| "reported error: success" (14 de outubro) | 10, relatório proporcional | pendente (é uma correção de uma linha) |
| O `CLAUDE.md` de 9.661 linhas (15 de outubro) | 2, arquivo operacional contra livro de casos | pendente |
| CORS derivado do primeiro nome de domínio; o assistente de configuração de UAT dava erro 500 (16 de outubro) | 13, implantação / 8, simetria | o prompt para o Forge está entregue; pendente de aplicar |
| Forge Mobile perde as abas (16 de outubro) | 10 / 12 | diagnóstico feito; a correção está pendente |

---

## Parte D — O que falta elaborar (para a próxima passada)

Feito na versão 2 (17 de outubro, tarde): a tese de abertura ("a IA não interrompe o método: ela o
continua"), os dezesseis contratos de degrau em `peldanos/`, e o repositório próprio do método.
Feito na versão 3: o nome, os contratos enriquecidos (tamanho, sinais de alerta, prompts em inglês
com explicação), o guia por tamanho de projeto e o guia por ferramenta. Falta:

1. **O degrau 0 completo**: a lista real de critérios (os de Pablo mais minhas hipóteses), quais
   excluem e quais ponderam, os pesos, o limiar, e os projetos rejeitados como contraexemplos. Já
   temos X1 e X2; faltam os demais.
2. **A ordem e o agrupamento**: a escada tem três fases (arranque, do 0 ao 4; ciclo, do 5 ao 10;
   operação, do 11 ao 15). É preciso confirmar se se ensina assim ou se convém começar pelo ciclo,
   que é o que um aluno vai usar todos os dias.
3. **Um nome memorável para cada degrau**, de uma frase, para os manuais e as publicações.
4. ~~O que é mínimo e o que é opcional segundo o tamanho do projeto~~ — **proposto** na tabela "O
   que é obrigatório e o que é proporcional", marcada como hipótese até que um projeto a confirme.
5. **O mapeamento ao Forge**: que degraus já são comportas ou comandos (G1 a G9, o registro de
   pendências, o dimensionamento, as doutrinas) e quais faltam para poder exportar a escada como um
   fluxo de execução.
6. **A prática**: o manual-curso (`MANUAL_CURSO.md`), com uma tarefa prática por degrau que um
   aluno possa repetir no seu próprio repositório até ter a aplicação em produção. Em andamento.
7. **O que NÃO está na escada e deveria estar** `[hipótese]`: a gestão do custo de tokens e de
   cotas como um orçamento explícito (hoje é reativo: ficamos sabendo quando queima); a rotação de
   segredos como rotina e não como incidente; e um critério para quando o humano SIM tem que olhar
   código — hoje a resposta é "nunca", mas os dois relatórios desta semana sugerem que há momentos
   pontuais em que convém.
8. ~~O nome~~ — **feito**: Urazuke, o método da evidência (D-014, 17 de outubro).
9. ~~A apresentação pública em yujin.app~~ — **feito** (17 de outubro, à noite): a subpágina
   `yujin.app/urazuke` (repositório `pkuschnirof/rpaforce`, pasta `web/yujin.app/urazuke/`), com a
   landing nos dez idiomas de interface do site, os três documentos HTML nos oito idiomas do método,
   e um cartão em destaque na página inicial de yujin.app. Falta publicá-la com um push para `main`
   desse repositório e, quando este repositório abrir, ligá-lo a partir dali.
10. **Provar os contratos num projeto real.** Os dezesseis prompts estão escritos a partir do que
    fizemos, não executados tal como estão. O primeiro projeto que os usar de ponta a ponta vai
    corrigir vários; isso faz parte do degrau 15.

---

## Glossário

Cada sigla, cada nome próprio e cada expressão coloquial que aparece neste documento, explicada.
Em ordem alfabética. Algumas entradas são termos em espanhol que aparecem em nomes de arquivos ou
mensagens de commit dos repositórios de origem; mantêm-se para que a evidência possa ser seguida.

**Agente** — Um programa de inteligência artificial que não só responde perguntas mas executa
ações: lê arquivos, escreve código, roda comandos, faz commits. Neste documento, "o agente" é o
Forge ou a Sumi (ver abaixo).

**Anonimização** — Neste documento os clientes reais se chamam "o Plano de Saúde", "o
Autorizador" e "a Associação", e seus sistemas "Autorizações" e "Kikan". É de propósito: os nomes
ficam reservados até termos permissão para usá-los.

**Antipadrão** — Uma forma de fazer as coisas que parece razoável mas que se sabe que termina mal.
O contrário de um "padrão" (uma boa prática comprovada).

**Apertar o teto** — Baixar um limite (um orçamento, um máximo permitido) até que fique logo acima
do medido, para que qualquer piora faça um teste falhar.

**Artefato** — Algo concreto que fica produzido: um arquivo, um teste, um script, um documento. Na
escada, cada degrau deixa um artefato.

**Assíncrono / síncrono (async / sync)** — Uma chamada síncrona fica esperando o resultado antes
de seguir; uma assíncrona deixa a tarefa em andamento e segue, e depois recolhe o resultado. Os
bancos de dados reais em Node são assíncronos; por isso a interface tem que sê-lo desde o começo.

**Associação (a)** — Assim este documento chama o cliente do sistema Kikan (seu nome real fica
reservado): uma associação civil que atende famílias e precisava de uma mesa de atendimento
omnicanal (vários canais de contato num só lugar) e campanhas.

**AUD-*** — A série de auditorias numeradas que se fizeram no Kikan em agosto (AUD-1, AUD-2…), e
que geraram pendências.

**Autorizações** — Nome com que este documento chama o primeiro sistema produtivo (o real fica
reservado): automação (RPA) da gestão de ordens do Plano de Saúde para uma entidade de saúde, com um
humano no circuito.

**Autorizador (o)** — Assim este documento chama o sistema do Plano de Saúde que recebe as ordens
e devolve um veredito (aprovada, rejeitada). Para nós funciona como "oráculo": a verdade contra a
qual se verificam os contadores.

**AutoAprovador** — No sistema de Autorizações, o robô que aprova ordens automaticamente segundo
regras. Primeiro rodou em "modo de ensaio" (ver dry-run) antes de deixá-lo agir.

**Autopilot (piloto automático)** — Um mandato escrito para que o agente trabalhe sozinho durante
horas (24 ou 48) fazendo commits e pushes sem perguntar, e entregue um resumo no final.

**await** — Em JavaScript, a palavra que indica "espere o resultado desta chamada assíncrona". Uma
chamada ao banco de dados sem `await` é um bug silencioso: o código segue antes de ter o dado.

**Backend** — A parte do sistema que não se vê: o servidor, a lógica, o banco de dados. O contrário
de "frontend" (a tela).

**Bateria (de testes)** — O conjunto completo de testes de um projeto, rodados todos juntos.

**Cadeado** — Uma proteção que impede que uma ação perigosa ocorra sem uma condição explícita. Por
exemplo, o botão de pânico tem um cadeado dedicado: não pode ser apertado por acidente.

**Catraca** — Um mecanismo que só gira num sentido. No Kikan, um contador de chamadas sem `await`
que só pode descer: se sobe, o teste falha.

**Causa raiz** — O motivo real de um problema, em oposição ao sintoma. Corrigir o sintoma faz o
problema voltar; corrigir a causa raiz, não.

**CI (integração contínua)** — Um serviço (aqui, o GitHub Actions) que roda os testes
automaticamente cada vez que se sobe código.

**CLAUDE.md / PROJECT.md** — O arquivo que o agente lê ao começar cada sessão para saber o que é o
projeto e como trabalhar nele.

**Cofre (vault)** — Um lugar cifrado onde se guardam segredos (chaves, senhas) em vez de deixá-los
em arquivos de texto.

**Commit** — Um ponto salvo na história do código, com uma mensagem que explica o que mudou e por
quê. Cada commit tem um identificador curto (por exemplo `2219f7a`).

**Comporta (gate)** — Uma condição que tem que ser cumprida para poder avançar. Se não se cumpre,
não se passa. No Forge estão numeradas G1 a G9.

**Concorrência** — Quantas coisas acontecem ao mesmo tempo no sistema (usuários simultâneos,
processos em paralelo).

**CORS** — Um mecanismo de segurança dos navegadores que decide de que domínios se pode chamar um
servidor. Mal configurado, bloqueia chamadas legítimas com erros confusos.

**CVE** — Um identificador público de uma vulnerabilidade de segurança conhecida em algum
componente de software.

**Dívida técnica** — O que fica mal feito "para arrumar depois". O método a proíbe: o que quebra se
conserta na raiz na mesma sessão.

**Doutrina** — No Forge, um documento curto que fixa como se faz algo (como se testa, como se
verifica, como se dimensiona). Há 31. É a forma que o método toma dentro da ferramenta.

**Driver (critério)** — Um fator que empurra uma decisão num sentido ou noutro. No degrau 0, os
drivers são os fatores que decidem se um projeto é elegível.

**Dry-run (modo de ensaio)** — Rodar um processo "a seco": faz tudo menos a ação final. O
AutoAprovador rodou assim primeiro, mostrando o que teria aprovado sem aprovar nada.

**E1 a E12** — As doze etapas da reengenharia de persistência do Kikan (a mudança de armazenamento
em arquivos JSON para um banco de dados MariaDB).

**Embarcado (embed, Forge Embedded)** — O Forge instalado dentro do sistema do cliente, como
assistente residente, com permissões delimitadas.

**End to end (E2E, de ponta a ponta)** — Provar o sistema completo, desde a tela até o banco de
dados, como uma pessoa o usaria.

**Ambiente** — Uma instalação separada do sistema. Os habituais: desenvolvimento (a máquina do
programador), UAT (teste do cliente) e PROD (produção, a de verdade).

**Esqueleto (scaffold)** — A estrutura inicial de um projeto, sem funcionalidade: arranca, tem
testes vazios, se implanta.

**Fail-closed** — "Falha fechado": diante da dúvida ou do erro, o sistema não age. O contrário de
"fail-open", que diante da dúvida segue em frente.

**Fallback (ao legado)** — Voltar a um caminho antigo quando o novo falha. O método o proíbe (SQ
0.2): se há um sistema antigo, audita-se e migra-se; não se deixa como rede de segurança silenciosa.

**Fixture** — Dados de teste que se carregam antes de rodar um teste ou uma implantação.

**Flip (interruptor)** — Uma mudança de configuração que escolhe entre dois caminhos (por exemplo,
o motor antigo ou o novo) sem tocar código.

**Forge (Yujin Forge)** — A ferramenta que Pablo construiu: uma camada sobre o Claude Code que lhe
agrega o método (doutrinas, comportas, pendências, um painel de chat, um aplicativo móvel, e o modo
embarcado). `yf` é seu comando.

**Frontend** — A parte visível do sistema: as telas.

**Full scan** — Uma consulta ao banco de dados que lê a tabela inteira porque não tem um índice que
a ajude. Com tabelas pequenas não se nota; com milhões de linhas, derruba o sistema.

**Queimar a cota** — Esgotar o orçamento de algo (minutos de integração contínua, tokens da IA)
antes do tempo.

**G-DOC** — No Forge, a comporta que exige que a documentação se atualize no mesmo commit que a
mudança.

**gate-ci** — O trabalho da implantação do Kikan que espera que a integração contínua termine em
verde antes de empacotar. Criado em 14 de outubro.

**GCP** — Google Cloud Platform, a nuvem onde rodam os servidores dos dois sistemas da Associação.

**Tropeço** — Um incidente, um erro que doeu. "Tropeço → regra" é o padrão de nascimento de todas
as doutrinas.

**GOTCHAS** — Um arquivo que registra "armadilhas" conhecidas: erros que já pagamos uma vez, com
seu cheiro, sua causa raiz, sua correção e como detectá-los antes.

**Greenfield / brownfield** — Um projeto novo do zero (greenfield, "campo verde") contra um que
parte de algo existente (brownfield, "campo marrom").

**Grep** — Um comando que busca texto em arquivos. "Medidor, não grep" significa: um número
importante não se obtém contando com uma busca de texto, mas com um programa com teste.

**Heap** — A memória que um programa usa. "A bateria morria por heap" quer dizer que os testes
ficavam sem memória e parecia que falhavam.

**HITL (human in the loop, humano no circuito)** — Um desenho em que uma pessoa aprova antes de o
sistema agir. Em Autorizações, o aprovador manual.

**Órfão (turno órfão)** — Um processo que continua rodando quando quem o lançou já o perdeu de
vista. Em 14 de outubro um turno do Forge trabalhou uma hora e quarenta e três assim.

**Índice** — Uma estrutura auxiliar do banco de dados que torna rápida uma busca. Sem índice, a
consulta é um full scan.

**IPC (correia entre processos)** — Um canal entre dois processos. No Forge 1.18.0 foi usado como
"correia": se o processo pai morre, o filho fica sabendo e se desliga.

**JSON (armazenamento em)** — Guardar os dados em arquivos de texto com formato JSON em vez de num
banco de dados. Serve para começar; não serve para milhões de linhas.

**Kikan** — O sistema de mesa de atendimento omnicanal e campanhas da Associação, o segundo
sistema produtivo.

**Legado (legacy)** — Um sistema antigo que continua em uso.

**Log** — O registro do que um programa vai fazendo. "Valide com o log" significa: não confie no
que o agente diz que fez, olhe o registro.

**MariaDB** — O motor de banco de dados SQL que o Kikan usa em produção.

**Medidor com guarda** — Um script que mede algo (quantas consultas, quantos laços) e que tem um
teste próprio que verifica que o medidor mede bem. "Com guarda" quer dizer "protegido por um
teste".

**Mentir (um medidor)** — Quando um instrumento devolve um número errado porque não vê parte do que
tem que medir. Aconteceu conosco duas vezes.

**Mês três** — Expressão nossa para o momento em que um sistema construído rápido começa a mostrar
seus problemas: quando já tem dados de verdade e usuários de verdade.

**Mock (mockar)** — Substituir uma parte real do sistema por uma simulação durante um teste. "Não
se mockar a si mesmo" significa não simular justamente a parte que se quer provar.

**NAC3** — O protocolo do Forge que faz com que as telas de uma aplicação possam ser operadas por
programa (cada elemento da interface tem um identificador e métodos). Permite o teste de ponta a
ponta. Pablo esclareceu que não é obrigatório para o método: é o meio, não a condição.

**Node (Node 22)** — O ambiente onde roda o JavaScript do servidor. "Node 22 fixo" quer dizer que a
versão ficou cravada para que todos os ambientes usem a mesma.

**Oráculo** — Uma fonte de verdade externa contra a qual se pode verificar um resultado. Para os
contadores do Plano de Saúde, o oráculo é o Autorizador.

**P0, P1, P2** — Níveis de prioridade de um achado: P0 é o que há que resolver já.

**Paper** — Um documento de análise com medições e conclusões. O `PAPER_SUMI_VS_AGENTIC` é o que
justificou encerrar a equipe multiagente.

**Sobrescrever (uma configuração)** — Escrever por cima de algo por acidente. "A bateria
sobrescrevia a configuração da implantação" foi o PND-107.

**Quadro (o painel)** — O painel compartilhado do Forge onde o agente deixa relatórios para Pablo
ler.

**Plano de Saúde (o)** — Assim este documento chama a operadora de saúde cliente do primeiro
sistema produtivo (seu nome real fica reservado).

**Playwright** — Uma ferramenta que controla um navegador por programa para provar telas como uma
pessoa faria.

**PND (pendência)** — Um item numerado da fila de trabalho (PND-001, PND-002…). Neste método, as
pendências SÃO o plano.

**Orçamento de consultas** — O máximo de consultas ao banco de dados que um caminho da aplicação
pode fazer, medido e protegido por um teste. Se uma modificação o supera, o teste falha.

**Provado em vermelho** — Um teste do qual se demonstrou que FALHA contra o código antigo antes de
a correção deixá-lo em verde. Se você nunca o viu vermelho, não sabe se prova algo.

**PROD (produção)** — O ambiente de verdade, o que o cliente usa.

**Promoção (UAT → PROD)** — Passar algo (configuração, campanhas) do ambiente de teste ao de
produção de maneira controlada.

**Pull / push** — Baixar e subir código ao repositório remoto (GitHub).

**R8 modal** — No Forge, a janela que para tudo quando o agente entra num laço sem avançar.

**Regressão** — Um teste que verifica que algo que já funcionava continua funcionando depois de
uma mudança.

**Relay** — O serviço intermediário que conecta o aplicativo móvel do Forge com a sessão de
desktop.

**Repositório (repo)** — O lugar onde vive o código com toda a sua história. "Repo padrão" quer
dizer um gerenciado com Git e com uma estrutura reconhecível.

**Retenção** — Quanto tempo se conservam os dados de cada tabela antes de apagá-los.

**Rollback (caminho de volta)** — Voltar à versão anterior quando uma implantação sai mal.

**RPAForce** — A marca de Pablo sob a qual se entregam estes sistemas.

**Runbook** — Um procedimento operacional escrito passo a passo, para que qualquer um possa
segui-lo. "Idempotente" quer dizer que pode ser rodado duas vezes sem quebrar nada.

**SDD** — Um documento de desenho de software escrito antes de construir.

**Semeador (seeder)** — Um script que carrega dados de teste num ambiente.

**Shift left** — Mover os testes para mais cedo no processo de desenvolvimento, para a "esquerda"
da linha do tempo, em vez de deixá-los para o final.

**Smell (cheiro)** — Um sinal de que algo anda mal no código, antes de falhar.

**SQ (Standards of Quality, padrões de qualidade)** — O contrato de convivência entre humano e
agente no Forge. Numerados: SQ 1 (o tempo do usuário é sagrado), SQ 2 (zero dívida), SQ 3 (ASCII),
SQ 4 (documentação em dia), SQ 5 (escopo exato), SQ 6 (idioma do usuário), SQ 7 (simetria
produtor/consumidor), SQ 8 (autonomia), SQ 9 (verificar antes de afirmar). E no documento longo, as
seções 0.1 a 0.11.

**SQL** — A linguagem dos bancos de dados relacionais.

**Sumi (Sumi-Forge)** — O nome da sessão do Claude Code que trabalha com Pablo no repositório do
Forge; a que escreve este documento. O Forge é o produto; a Sumi é quem o constrói e audita o que o
Forge faz em outros projetos.

**Tag** — Uma etiqueta sobre um commit que marca uma versão (por exemplo, v1.18.0).

**TDD** — "Primeiro o teste, depois o código". O método o deixa como opção para escopos pequenos,
não como regra universal.

**Na marra** — Aprender algo porque saiu mal, não porque alguém explicou antes. Usa-se no sentido
de "estas regras se aprenderam na marra".

**Token** — Dois sentidos. Na IA: a unidade em que se mede (e se cobra) o texto que o modelo
processa. Em segurança: uma credencial de acesso. "Um `git add -A` com um token" é subir uma
credencial ao repositório por engano.

**Turno** — Uma volta da conversa com o agente: o usuário pede, o agente trabalha e responde.

**UAT** — O ambiente onde o cliente testa antes da produção.

**Urazuke** (裏付け) — O nome do método. Em japonês, o respaldo que uma afirmação tem, o que a
sustenta por trás; *urazukeru*, respaldar com provas. Pronuncia-se u-ra-ZU-ke. Não se traduz.

**Vibecoding / vibecoder** — Construir software conversando com uma IA, descrevendo o que se quer,
em vez de escrever o código à mão. Um vibecoder é quem faz isso.

**Vigia** — Em Autorizações, o processo que revisa periodicamente o que ficou travado e o empurra,
com guardas para não empurrar duas vezes.

**Volumetria** — Quantos dados o sistema vai manejar: linhas por ano, usuários, picos.

**Watchdog (vigia de silêncio)** — Um processo que olha se outro continua dando sinais de vida, e
o mata se fica calado tempo demais. O Forge 1.18.0 o adicionou para que um turno não possa ficar
órfão.

**yerp_** — O prefixo das chaves de API do Kikan.

**yf** — O comando do Forge no terminal.

**Yujin** — O ecossistema do qual o Forge é o produto comercial.
