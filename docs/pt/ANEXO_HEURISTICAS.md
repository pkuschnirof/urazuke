# Anexo H - Heurísticas de qualidade de código e de usabilidade

**Estado: APROVADO E EM PRODUÇÃO.** Não fica nenhuma decisão aberta: a forma (D-043 e D-044), os interruptores (D-045 e D-046), o painel (D-047) e as severidades iniciais com o peso da acessibilidade (D-048, seção 10) estão decididas. O documento está publicado nos oito idiomas do método e os seus dois prompts fazem parte da API de prompts: a partir dali, `build/prompts.mjs` exige o texto ingles idêntico byte a byte nos oito ou a construção falha. Data: 2026-10-22.

Registro das decisões deste anexo: `docs/DECISIONES.md`, D-043 a D-048. O painel de cumprimento (seção 12) foi decidido com duas cifras em D-047. O trabalho de implementação vive em PND-002; a tradução e a indexação, em PND-003.

## 1. O que falta hoje, e por que

O passo 9 já mede o código, e o faz com uma comporta que não deixa passar nada: um único formatador, limites de tamanho (trezentas linhas por arquivo, quarenta por função), complexidade por função, código duplicado, código morto, dependências declaradas e usadas, cobertura com catraca e testes de mutação onde há usuários reais. O número fica escrito em `docs/CODE_QUALITY.md`. Isso está resolvido.

O que não está resolvido é a outra metade do produto. Revisei o corpus dos passos: não há uma única menção a usabilidade, a perfis/pessoas nem a agrupamento funcional. A interface se sustenta hoje em duas coisas: a captura que o dono olha por dez segundos e os casos de teste manuais. As duas são boas e as duas são humanas, caras e esquecidas. Um sistema pode passar na comporta de qualidade com honras e ser inutilizável: tudo verde, e a pessoa não acha onde cobrar.

E há um problema de segunda camada que é técnico mas aparece na interface: quando o mesmo produto é usado por vários perfis (administração, operação, consulta, cliente), as funcionalidades são habilitadas em três lugares diferentes - o banco, o menu e o guarda de rota - que se escrevem em momentos diferentes e se desincronizam sozinhos. O sintoma é sempre o mesmo: alguém vê um botão que não é seu, ou pior, alguém que sim tem a permissão não acha a tela.

As duas heurísticas que seguem atacam essas duas coisas com a mesma forma: um catálogo curto de afirmações verificáveis, alguns instrumentos que as medem sozinhos, e um caminho de exceção declarada para quando o projeto precisa sair da linha.

## 2. O modelo: três capas, uma única forma de regra

A tentação é fazer uma lista de regras e amarrá-la a stack do primeiro projeto. Isso envelhece mal: a regra de React não aplica em Angular, a de Angular não aplica em servidor com templates, e em dois anos metade da lista está morta. A proposta separa três capas.

**Capa 1 - Núcleo agnóstico (não negociável).** Afirmações sobre resultados, não sobre ferramentas. "Há um único formatador e ninguém discute com ele" aplica igual em TypeScript, em PHP ou em Go. O núcleo se enumera com identificadores estáveis e não muda de projeto em projeto.

**Capa 2 - Adaptador por stack (configurável).** Para cada regra do núcleo, cada família de frontend declara *com o que* se mede e *com qual limiar*. Um projeto React com Vite, um Next, um Angular, um servidor com templates, um mobile e um de linha de comando são seis adaptadores diferentes do mesmo núcleo. Tudo o que o usuário pediu como "configurável por frontend" vive aqui.

**Capa 3 - Decisões do projeto (declaradas).** Os limiares concretos e as exceções. Não se inventam: se perguntam ao dono e ficam escritos, igual ao dimensionamento do passo de arquitetura. Se um limiar não está declarado, aplica o do adaptador e fica registrado como tal.

Toda regra se escreve sempre com a mesma ficha de seis campos:

| Campo | O que contém |
|---|---|
| `id` | Identificador estável (`CQ-07`, `UX-12`). Nunca se reutiliza. |
| Enunciado | Uma só frase, no imperativo, sobre um resultado observável. |
| Por que | O dano concreto que evita. Se não há dano, a regra é sobrante. |
| Como se verifica | O instrumento: comporta automática, consulta a matriz, teste ponta a ponta ou caso manual. |
| Severidade | `BLOQUEIA` (a comporta vai a vermelho e o bloco não fecha), `AVISA` (abre um pendente), `REGISTRA` (só fica no documento). |
| Aplica a | Perfis onde manda. Fora deles não corre, e isso não é exceção: é escopo. |

**A exceção se declara, nunca se omite.** Uma regra se apaga com ficha de quatro campos: identificador, motivo em uma linha, quem a autoriza (o dono, não o agente) e data de revisão. Uma regra apagada sem ficha é um fracasso da comporta, não uma decisão. É o mesmo critério que o método já usa para recusar um limite subido "para passar".

**Uma regra pode ter faces, e apaga-se uma só (D-078).** Uma face é um corte do mesmo enunciado com identificador próprio —`CQ-19.1`, `CQ-19.2`—, append-only como o das regras e nunca reciclado. Existem por uma razão mecânica e não de redação: sem identificador não se pode apagar uma só, e uma regra que só se pode apagar inteira empurra a apagar demais. A ficha de apagado é a mesma de cima, com o identificador de uma face no lugar do de uma regra, e uma ficha cujo identificador não resolve nem para uma regra nem para uma face é um apagado pendurado, que é vermelho. Três coisas disto não se negociam. Uma regra com qualquer face apagada **não se informa como cumprida**: o reporte diz "CQ-19: três de quatro faces, uma apagada com o seu motivo" e nunca uma porcentagem sozinha, que é o critério do apagado observável aplicado dentro de uma regra. A conta de faces **deriva-se** do dado e não se escreve, como qualquer cifra que vive ao lado do nome de uma coleção. E o painel da seção 12 conta faces e não regras para uma regra que as tem, ou a porcentagem mente. Hoje `CQ-18` tem cinco comprovações sem identificador, então é a única regra com faces não endereçáveis: dar-lhes identificador é agregar e não renomear, e é trabalho à parte.

## 3. Os quatro instrumentos

Nenhuma heurística vale nada se a sua verificação é uma opinião. São quatro, e cada regra declara a qual pertence.

1. **Comporta automática.** Corre em cada push e no fechamento do bloco. Devolve verde ou vermelho. É barata, é repetível e não discute. Mede tudo o que pode ser contado.
2. **Consulta a matriz.** A matriz funcionalidade-por-perfil (ver B2) é um artefato declarativo; o menu, o roteamento e as permissões se derivam dela. Verificar a matriz e verificar a interface. É a peça que converte parte da usabilidade em algo que uma máquina pode verificar.
3. **Teste ponta a ponta por perfil.** Para cada perfil declarado, um script que entra como esse perfil e compara o conjunto de funcionalidades alcançáveis contra a linha da matriz: *nem menos nem mais*. É o teste que pega as duas desincronizações típicas (o botão que sobra e a tela que falta).
4. **Caso manual.** O que nenhuma máquina julga: se o agrupamento se entende, se a tarefa se completa sem ajuda, se o texto está no idioma do usuário. Se corre com pessoas e se registra, como o passo 10 já manda.

## 4. Parte A - Qualidade de código

O núcleo estende o passo 9: não o substitui e não o contradiz, da nome, severidade e adaptador a cada coisa que já se mede, e agrega o que hoje falta, que é a interface vista como código.

| id | Família | Enunciado | Verifica | Severidade |
|---|---|---|---|---|
| CQ-01 | Forma | Há um único formatador, corre sem intervenção e não admite discussão. | Comporta | BLOQUEIA |
| CQ-02 | Forma | Há um único linter por repositório e suas regras são as mesmas para todos; uma regra se apaga com motivo escrito, nunca em um arquivo solto. | Comporta | BLOQUEIA |
| CQ-03 | Tamanho | Nenhum arquivo supera o limite declarado (arranca em 300 linhas) e nenhuma função supera o seu (arranca em 40). | Comporta | BLOQUEIA |
| CQ-04 | Complexidade | Nenhuma função supera o limite declarado de caminhos. | Comporta | BLOQUEIA |
| CQ-05 | Duplicação | Não entra duplicação nova: o bloco copiado se extrai ou se justifica. | Comporta | BLOQUEIA |
| CQ-06 | Coisas mortas | Não há código morto: funções, variáveis, importações, ramos e dependências sem uso. | Comporta | BLOQUEIA |
| CQ-07 | Tipos | Se a linguagem permite tipos, o projeto os usa a sério; o tipo "any" é exceção declarada, não habito. | Comporta | AVISA |
| CQ-08 | Testes | A cobertura não baixa: o número de hoje é o piso de amanhã. | Comporta | BLOQUEIA |
| CQ-09 | Testes | Com usuários reais, o escore de mutação se mede por bloco e todo mutante que sobrevive em código novo abre um pendente. | Comporta + registro | BLOQUEIA |
| CQ-10 | Dependências | Toda dependência está declarada, se usa e não traz uma árvore de terceiros desproporcionada ao que aporta. | Comporta | AVISA |
| CQ-11 | Segredos | Não há credenciais, chaves nem cadeias de conexão no repositório, nem no histórico novo. | Comporta | BLOQUEIA |
| CQ-12 | Interface | A interface não decide: nenhuma tela nem componente contém regras de negocio (o que se permite, quanto custa, que estado segue). Vive no domínio e a vista consulta. | Revisão no fechamento + caso manual | BLOQUEIA |
| CQ-13 | Interface | Toda chamada ao servidor passa por um único cliente tipado; nenhuma tela monta a sua requisição a mão. | Comporta (busca) | BLOQUEIA |
| CQ-14 | Interface | Há um único lugar onde vive o estado compartido; duplicar estado entre telas é um fracasso, não um atalho. | Revisão no fechamento | BLOQUEIA |
| CQ-15 | Interface | Todo texto visível sai de um catálogo de traduções; nenhuma cadeia de usuário fica escrita dentro do componente. | Comporta (busca) | BLOQUEIA |
| CQ-16 | Interface | Todo elemento interativo leva identificador estável e papel, para que o teste automático o encontre pelo nome e não pela posição. | Comporta (busca) | BLOQUEIA |
| CQ-17 | Interface | Todas as cores, espaçamentos e tipografias saem de tokens; nenhum valor solto na folha de estilos. | Comporta (busca) | BLOQUEIA |
| CQ-18 | Interface | A acessibilidade básica se verifica sozinha: contraste, rótulos nos campos, foco visível, navegação por teclado nos fluxos principais, imagens com texto alternativo. | Comporta | AVISA |
| CQ-19 | Recibo | Todo instrumento com o qual o projeto decide declara as condições em que o seu número vale: que conjunto esperava percorrer e quanto percorreu, de que depende, e o que informa quando não pôde olhar. Um instrumento cujo silêncio se lê igual à saúde não mede: tranquiliza. | Comporta + caso manual | BLOQUEIA |
| CQ-20 | Privilégio | Uma verificação corre com o privilégio mínimo para verificar e com nenhum mais, e que não pôde fazer dano mede-se, não se promete. | Comporta + caso manual | BLOQUEIA |
| CQ-21 | Alcance | Toda verificação declara até onde chegou a sua corrida, e o que ficou além desse ponto conta-se como não verificado e nunca como são: um duplo que nenhuma corrida atravessa, um artefato que ninguém correu e um passo que nenhuma execução alcançou não dizem que o que está adiante funciona, dizem que ninguém olhou. | Comporta + caso manual | BLOQUEIA |
| CQ-22 | Contraste | Um número que o projeto mede contra um requisito que o projeto declarou contrasta-se, e o resultado do contraste é o veredito: uma medição que existe e que ninguém comparou com o seu limiar não verificou nada. Que a medição exista é o princípio da verificação e não o seu fim. | Comporta + caso manual | BLOQUEIA |
| CQ-23 | Procedência | Um veredito vale por onde correu, quando correu e onde ficou escrito: sobre a árvore que fica, depois da última mudança que afeta o que mede, sobre artefatos deste trabalho, e com a sua saída num lugar que sobrevive à corrida. Um verde que não pode dizer essas quatro coisas não é um verde velho: é o verde de outra coisa. | Comporta + caso manual | BLOQUEIA |
| CQ-24 | Registro | Um registro responde à pergunta para a qual existe, sobre todo o seu percurso: os campos com que se responde a essa pergunta escreve-os o caminho que produz o fato, e o trecho que ficou fora do seu alcance informa-se como fora de alcance e nunca como zero. | Comporta + caso manual | BLOQUEIA |
| CQ-25 | O servido | Toda afirmação sobre o que um sistema publica verifica-se contra O QUE É SERVIDO, pela rede, e não contra o repositório. Uma comprovação que só lê a árvore não a pode estabelecer em nenhuma das duas direções: algo commitado pode nunca chegar ao leitor, e algo que ninguém commitou pode chegar-lhe. | Comporta + caso manual | BLOQUEIA |

As regras CQ-12 a CQ-18 são as que fazem com que "qualidade de código" signifique algo no front. Sem elas, o projeto pode ter noventa por cento de mutação e uma tela que calcula o total com a sua própria aritmética dentro de um componente: o pior dos dois mundos, porque o cálculo duplicado passa todos os testes de backend.

**As duas regras do recibo, e de onde saíram (D-078).** CQ-19 e CQ-20 entraram em 2026-11-01 e não saíram de uma ideia: saíram de onze falhas medidas num experimento que estava medindo outra coisa. Todas tinham a mesma forma —um instrumento que não pôde olhar e informou isso igual à saúde, ou que olhou menos do que acreditava ter olhado— e apareceram por onze caminhos distintos, o que torna muito improvável que seja o defeito de um programa. O que as torna duas regras e não onze é que se lhes pode fazer a mesma pergunta: *qual é o denominador deste número, e o que informa este instrumento quando não pôde olhar?* CQ-19 é sobre o que um instrumento **informa**; CQ-20 é sobre o **privilégio** com o qual corre, que é parte da verificação e não um detalhe de operação. Cada uma entra com as suas faces, que é a forma que a seção 2 descreve.

#### As quatro faces de CQ-19

| id | Face | Enunciado |
|---|---|---|
| CQ-19.1 | O denominador | Toda medição que percorre um conjunto declara quantos elementos esperava percorrer ao lado de quantos percorreu, e falha fechado quando percorreu menos. Não basta distinguir o zero que é "não há" do zero que é "não pude olhar": há que distinguir o "menos porque não olhei tudo", que é o que se lê igual à saúde. |
| CQ-19.2 | A independência | Nenhum instrumento depende do recurso que mede. Quando não se pode evitar, o seu reporte declara de que depende, e a queda dessa dependência informa-se como "não pude olhar" e nunca como saúde. |
| CQ-19.3 | O universo, nas duas direções | Todo filtro, busca ou seleção declara o universo sobre o qual correu: "não encontrei nada" e "não corri" são dois resultados distintos e não se escrevem igual, e um filtro que devolveu demais também não se aplicou. Uma cifra que decide mede-se duas vezes, de duas formas distintas, antes de ser usada. |
| CQ-19.4 | O irmão frouxo | Quando um controle tem contraparte na cadeia, ou são o mesmo instrumento com a mesma configuração, ou a diferença está declarada: o que mede cada um, qual manda, e o que pode passar um e falhar o outro. Um controle local mais permissivo do que o que decide é um verde que mente. |

**Em que difere do recibo do passo 8.** São o mesmo conceito sobre objetos distintos, e por isso levam o mesmo nome: o recibo do passo 8 é um artefato que um plano produz —o vermelho com o seu comando exato, a sua versão, os seus números e o seu código de saída, colado tal como saiu—, e o recibo do instrumento é a condição que um número traz ao lado para poder ser lido. Um exige-se uma vez por candado; o outro, cada vez que uma cifra decide algo. Dito ao contrário, que é como se checa sem pensar: se o que você tem na frente é um teste, peça o recibo do passo 8; se é um número, peça o de CQ-19.

#### As duas faces de CQ-20

| id | Face | Enunciado |
|---|---|---|
| CQ-20.1 | O efeito não declarado | Um comando que se apresenta como de somente leitura corre sem permissão de escrever, e o privilégio com o qual correu declara-se ao lado do seu resultado. Um instrumento que escreve enquanto diz que não deixa o dono decidindo sobre um estado que o próprio instrumento mudou. |
| CQ-20.2 | A sonda que só é inofensiva quando falha | Uma sonda que exerce uma operação destrutiva para comprovar que está impedida corre onde a sua sentença não pode aterrissar, e o seu reporte prova que o estado ficou idêntico contando-o antes e depois. Uma sonda cujo dano depende de que o impedimento funcione não verifica o impedimento: aposta nele. |

O par de CQ-20 com a rotina do vermelho do passo 8 lê-se sozinho: o vermelho primeiro exige que um teste **possa** detectar; CQ-20 exige que ao detectar **não rompa**.

**A regra do alcance, e por que é uma e não três (D-087).** CQ-21 entrou em 2026-11-03 e também não saiu de uma ideia: saiu de três defeitos medidos no mesmo experimento, no segundo lote, e os três tinham uma forma que se diz numa linha —**um artefato correto que não chega ao único lugar onde produz efeito**—. O caso de prova escrito que ninguém executou. O caso corrigido que ninguém voltou a correr. E a porta duplicada que nenhuma prova atravessou, que é a que vale metade do preço: um braço do experimento construiu a sua vista sobre uma porta com o seu duplo, que é o que o método empurra a fazer para que a vista seja verificável, e essa porta escutava um só tipo de evento enquanto quatro dos cinco controles emitiam outro. **Quatro controles mortos num navegador, com oitenta e um arquivos de prova em verde por cima**, e entre eles um que afirmava exatamente o que estava roto, verde porque percorria os ouvintes do nó falso e os chamava à mão. Nos oitenta e um arquivos não havia um só aperto de botão. O que os torna uma regra e não três é que se lhes pode fazer a mesma pergunta: *até onde chegou esta corrida, e que parte do artefato ficou sem atravessar?*

E há que dizer de onde vem a redação, porque não é minha. A minha pedia *"ao menos uma prova que o atravesse de verdade, contra a implementação real"*, e o braço aceitou-a e mostrou com o seu próprio código que **não alcança**: uma das suas provas já corria a implementação real, contra um documento de mentira que invocava o ouvinte sem olhar o evento. Atravessava o adaptador de verdade e seguia sem ver o defeito. A que ficou é a dele, e é a de `CQ-21.1`: o outro lado tem de ser **o outro lado de verdade**. O seu custo também o mediu ele, que é a objeção que esta face vai receber: **uma corrida, quinze segundos e seis décimos, zero pacotes novos**.

#### As quatro faces de CQ-21

| id | Face | Enunciado |
|---|---|---|
| CQ-21.1 | O outro lado de verdade | Toda porta com duplo de prova tem ao menos uma corrida que a atravessa até o outro lado de verdade, e o outro lado é aquilo que a porta está duplicando: se ali há um navegador, um sistema operativo, uma base ou a rede, não há forma de cumpri-la sem isso, e nenhuma quantidade de duplos fiéis a substitui. |
| CQ-21.2 | Escrito não é corrido | Um artefato de verificação que ninguém correu conta zero e não meia verificação, e a sua cifra viaja ao reporte onde se decide e não só ao arquivo onde o artefato vive: um número que há que ir buscar não freia ninguém. |
| CQ-21.3 | O caso volta inteiro | Uma execução informa até que passo chegou, e os passos que não alcançou não passaram nem falharam: quando se arruma o que falhou, o caso volta a correr inteiro e deixa uma fila de execução nova posterior ao arranjo, e uma correção não se fecha com a verificação do passo que falhou. |
| CQ-21.4 | O vermelho chegou à afirmação | Um vermelho prova o que diz provar só se a corrida chegou até a afirmação: um vermelho que é uma exceção —o código mutado não compila, o arquivo não se parseia, o ambiente não arrancou— não falseou nada, porque a afirmação nem passou nem falhou, e declarar caçada uma mutação por esse vermelho é dar veredito sobre um passo que a corrida nunca alcançou. |

**Em que se diferencia de `CQ-19.1`, que é a pergunta que vai fazer o primeiro leitor.** São dois eixos e não o mesmo dito duas vezes. `CQ-19.1` olha a **largura**: dos elementos que um instrumento esperava percorrer, quantos percorreu. `CQ-21` olha o **fundo**: até que camada, ou até que passo, chegou **uma** corrida. E distinguem-se porque o caso da porta os separa sozinho: os oitenta e um arquivos correram os oitenta e um, de modo que o denominador estava perfeito e o fundo era zero. Um número pode ter o seu denominador completo e nunca ter tocado a camada onde o defeito vive. Dito ao contrário, que é como se checa sem pensar: se a dúvida é *quantos de quantos*, é `CQ-19.1`; se a dúvida é *até onde*, é `CQ-21`.

**E o que esta regra não promete, dito aqui e não quando falhar.** Nenhuma comporta pode verificar que a corrida que um projeto declara atravessa a porta **de verdade**: o que uma máquina olha é a declaração —que a porta esteja no inventário do passo 11, com o seu adaptador, o seu duplo e a corrida que a atravessa nomeando o que há do outro lado— e o que decide se isso é certo é uma pessoa lendo o comando. Essa é toda a comporta que há, e é mais do que havia: até 2026-11-03 um projeto com uma porta duplicada e nenhuma corrida que a atravessasse saía **exatamente igual** a um que a tinha, e medi-o com o avaliador real sobre duas árvores que só diferiam nisso. O mesmo vale para `CQ-21.3`: que a fila nova cubra *todos* os passos di-lo quem executou, não um programa. A cifra é mecânica; a verdade da cifra é do dono.

**E a quarta face chegou depois, em 2026-11-07, com D-089.** `CQ-21.4` não estava no dia em que a regra entrou e trouxe-a um defeito que encontrou uma comporta e não uma pessoa: o verificador de âncoras de mutação de um braço do experimento achou uma mutação **declarada caçada porque o teste ficara vermelho**, e o teste ficara vermelho por um erro de tipo e não por uma afirmação falhada —o código mutado explodia antes de chegar à afirmação—. O vermelho era real e não provava o que dizia provar. No mesmo dia, em outro sistema, uma guarda plantava um mutante com os finais de linha do outro sistema operacional, o corredor não parseava o arquivo, e o recibo **culpava o mutante**. Entra como face desta regra e não como regra própria porque a pergunta que a detecta é a de `CQ-21` palavra por palavra: a corrida não chegou até a afirmação, então a afirmação é um passo que a corrida não alcançou, e o enunciado da regra já diz que um passo que nenhuma execução alcançou não passou nem falhou. A pergunta mecânica, que se faz sem ferramentas: **o vermelho é uma afirmação falhada, ou é uma exceção?** É, além disso, o par exato da rotina do vermelho do degrau 8: o vermelho primeiro exige que um teste **possa** detectar, `CQ-20` que ao detectar **não quebre**, e `CQ-21.4` que o vermelho que se exibe como prova **tenha chegado até onde prova algo**.

**As três regras do terceiro lote, e por que são três e não dez (D-089).** CQ-22, CQ-23 e CQ-24 entraram em 2026-11-07 e vêm de dez achados: nove que o braço C1 do experimento A/B deixou ao fechar os vinte e quatro degraus —vinte e dois de vinte e quatro sem override, que é a cifra correta— e um que não saiu do braço mas de uma análise de plataformas de ferramentas. O proprietário trouxe-os com uma linha que é a que torna quase todos uma só família: **não aceites «a medição existe» como critério**. E a família parte-se em três ao perguntar a cada achado o que é que ninguém olha. *Contra o que se contrasta este número, e quem decidiu?* é `CQ-22`. *Este veredito é deste trabalho, e continua a existir?* é `CQ-23`. *Este registro pode responder à pergunta para a qual existe, sobre todo o seu percurso?* é `CQ-24`. As três perguntas podem fazer-se à mão e as três têm resposta falseável; por isso são regras e não advertências.

**CQ-22, o contraste, e o caso que a mediu.** O degrau 19 do braço —provas de desempenho em volume e ponto de ruptura— **fechou em verde com o seu requisito não funcional incumprido**: p95 de 557 a 911 milissegundos contra um teto declarado de 300, a duzentos simultâneos, com o poço de conexões de um módulo saturado desde vinte pessoas. E a comporta que o deixou passar **tem razão no que mede**: verifica que o recibo exista, que cubra os quatro fluxos e que traga os seus limiares ou a impossibilidade escrita. Palavras do braço, que é quem o encontrou: *"nenhuma comporta da escada pergunta se o número passa"*. É isso que esta regra fecha, e a consequência há que dizê-la inteira porque é grande: até 2026-11-07 uma escada de vinte e quatro degraus podia fechar-se **completa**, com todos os seus requisitos não funcionais incumpridos, e cada comporta tendo razão uma por uma.

A regra entra com **quatro faces e não com uma**, e cada uma vem de uma metade distinta do mesmo buraco. `CQ-22.2` é a metade estrutural e é a que o proprietário pediu explícita: o requisito do caso dizia *"p95 < 300 ms"* e **não dizia a que concorrência**, então o mesmo sistema passa a vinte pessoas e falha a duzentas, e um limiar sem a sua condição não se pode contrastar contra nada. `CQ-22.3` é a do pior caso, um degrau mais acima: o manual de infraestrutura e recuperação do braço, quatrocentas e nove linhas escritas *"para as três da manhã"*, declara na sua seção 6, textual, **«Não há cópias de segurança. Nenhuma. De nada.»**, com o comando de verificação transcrito —e o degrau 20 fechou em verde, porque a comporta verifica que o manual exista e declare o que não sabe, não que a cópia exista—. Essa diferença é a que esta face marca e não se negocia: para o p95 a impossibilidade escrita é uma saída legítima, porque há sistemas onde a carga não se pode medir; *"não há cópias de segurança"*, escrito com toda a honestidade do mundo, **não pode fechar um degrau**. Um p95 que não passa é um sistema lento e descobre-se com usuários irritados; uma cópia que não existe é um sistema de onde não se pode voltar, e descobre-se no dia em que faz falta, que é o pior momento. E `CQ-22.4` é a face que o décimo achado pediu com o seu próprio cuidado escrito: se a exigência acabar por ser *"que exista um inventário"*, nasce com o defeito que todo este lote vem consertar.

**CQ-23, a procedência, e a medição que a ordena.** Três dos dez achados são o mesmo veredito olhado de três lados. O primeiro: uma comporta que **não é cega e que não corre**. Um commit entrou com uma regra em vermelho porque a cadeia se havia corrido **antes** de escrever o documento que a quebrava, e a árvore estava vinte e sete commits adiantada, então o gancho que olha a árvore que de verdade fica não correu nenhuma das duas vezes. O verde era **certo e era velho**. O segundo: duas corridas da mesma cadeia no mesmo projeto com resultados opostos, e a diferença era uma só coisa —uma ficou num registro em disco, cento e dez linhas com trinta e sete comportas e quatro em vermelho, e a outra viajava dentro da resposta e perdeu-se inteira—. O terceiro: um degrau **em verde e sem fazer**, cujos dois chequeos resolviam os mesmos dois arquivos do degrau anterior, com a pendência do degrau em zero entradas de trabalho; nenhuma comporta o detectou e parou-o o braço, negando-se a aceitar o seu próprio verde.

Dos três, a redação de `CQ-23.3` é do braço e há que creditá-lo: *"a pergunta que o detecta é uma só e pode fazer-se à mão: que arquivo desta lista não existia antes de começar? Se a resposta é nenhum, o verde é de outro."* A minha teria falado de «artefatos próprios do degrau» e não teria dado ao leitor uma pergunta que pode fazer sem ferramentas. É a segunda vez que acontece —`CQ-21.1` também é sua— e convém que fique escrito.

**CQ-24, o registro, e os dois defeitos independentes que o tornaram família.** O título do experimento era *"vinte e quatro degraus fechados, zero fechos forçados"*, informado três vezes no mesmo dia e escrito em três documentos. O braço foi verificá-lo antes de copiá-lo, e sobre os cento e noventa e cinco elementos do seu registro mediu isto: **zero** com o campo de forçado escrito, **vinte e oito** que nomeiam a palavra na sua prosa, **dez** fechos que a prosa declara forçados pelo proprietário sob nove autorizações, e desses **dois** que são tarefas da escada —os dois com o motivo de fecho em «entregue» e nenhum campo de forçado—. O campo existe para um momento exato, o degrau 23, e o seu próprio esquema diz que é obrigatório *"para que a retrospectiva possa contar os fechos forçados por motivo"*; no único projeto que chegou até lá **nunca se escreveu**, e a conta houve que fazê-la lendo prosa, que é justamente o que o mecanismo vinha evitar. Há um corolário que vale só: a lista de nove autorizações da retrospectiva **omitia uma**, porque se armou com uma busca da palavra «override» e a prosa desse elemento não a usa —um recontagem por palavra sobre prosa livre é um instrumento que não pode garantir a sua própria população, que é `CQ-19.3`—.

O que o converteu em regra e não num arranjo foi a **segunda ocorrência, independente**, medida no mesmo dia do lote e em outro sistema escrito por outro autor: o programa de arranque de um painel escrevia no seu registro, que é de só adicionar, um campo de motivo **constante** —*"arranque da série 2: o painel velho tinha 1.23.5 em memória"*—, certo do primeiro arranque e falso dos três seguintes, que ficaram arquivados para sempre com um motivo que não era o seu. O campo existia, enchia-se em cada linha, e mentia. Duas ocorrências independentes do mesmo padrão são uma família e não um descuido, então `CQ-24.1` está redigida para a família —*um campo obrigatório cujo valor não se deriva do fato que diz registrar*— e não para o campo que a trouxe.

`CQ-24.2` é o outro achado e é mais barato de consertar do que parece. Mediu-o o braço ao escrever a sua retrospectiva: os **doze** primeiros anti-padrões do seu registro entraram **num só commit no degrau 11** e descrevem os degraus 00 a 11, dos quais os degraus 00 a 04 informam **zero incidentes**. As suas palavras: *"a tua pergunta —em que passo cai cada incidente— não se pode responder bem para o primeiro quinto do percurso, que é onde se tomam as decisões mais caras de desfazer."* O proprietário ofereceu duas saídas —que os registros nasçam no degrau 01, ou que as linhas retroativas se marquem como tais— e a face toma **as duas numa**, nessa ordem, porque a primeira evita o problema na raiz e a segunda é a que se pode cumprir num legado onde o registro já nasceu tarde. E fica dito que a primeira sozinha não basta: um registro que existe desde o degrau 01 e que ninguém escreve informa zero igual.

**E o que estas três regras não prometem, dito aqui e não quando falharem.** Nenhuma comporta pode verificar que o número que um projeto declara seja o que mediu, nem que a condição que um limiar declara seja a que governa o requisito, nem que uma linha retroativa esteja marcada com honestidade. O que uma máquina olha é a **declaração** —o veredito ao lado da cifra, a condição ao lado do limiar, o denominador de um inventário e a decisão de cada entrada, a data de um veredito contra a do último câmbio, o degrau em que um registro nasceu— e a verdade da declaração decide-a uma pessoa lendo. É a mesma fronteira que `CQ-21` escreveu na sua seção e vale repeti-la: a cifra é mecânica, a verdade da cifra é do proprietário. O que muda a respeito de não ter a regra é que antes o silêncio e a saúde escreviam-se igual.

**CQ-25, o servido, e as duas roturas do site do próprio método (D-095).** CQ-25 entrou em 2026-11-08 e é a primeira regra que não sai do sistema de um cliente nem de um braço do experimento: sai de duas roturas medidas no site onde este método se publica, uma por cada direção do contraste, e a frase que as junta é do dono: **servido não é publicado**. A primeira [Ref. 47](REFERENCIAS.md#ref-47) é algo **commitado que não chega**: o ficheiro de configuração que torna legível a interface de dados do portal estava commitado e desdobrado em verde em 2026-10-24, o transporte da publicação excluía-o, e nunca chegou ao servidor; encontrou-o uma pessoa a perguntar-se por que é que o publicado não se lia. A segunda [Ref. 48](REFERENCIAS.md#ref-48) é a contrária, e é a que nenhuma guarda do método podia ver: em 2026-11-08 mediu-se que o alojamento **injeta** um script alheio nas oitenta e quatro páginas publicadas, quatrocentos e cinquenta e quatro bytes acrescentados depois do fecho do corpo, que nenhum commit escreveu. A guarda que o método já tinha para o código de terceiros disse «0 achados» nessa mesma manhã, e **era verdade**: lê a árvore. O que as torna uma regra e não dois arranjos é que se lhes faz a mesma pergunta, e faz-se à mão: *isto que estou a afirmar do publicado, perguntei-o ao repositório ou ao servidor?* E convém dizer o resultado da semana inteira, porque não é o de um pendente: o método publicou a exigência do inventário do código de terceiros numa segunda-feira e o seu próprio site incumpriu-a **duas vezes** antes de sexta — uma por um terceiro que escolhemos e outra por um que não escolhemos —, e as duas encontrou-as o método a aplicar-se a si mesmo. Uma norma que não se rompe sozinha na primeira semana é uma norma que ninguém testou.

A regra entra com **quatro faces**, porque cada uma se apaga sozinha, e duas delas levam uma exigência que a primeira redação não tinha e que o dono acrescentou com o seu motivo escrito. A `CQ-25.1` faltava-lhe **a quem e de onde** se perguntou: «o servido» não é uma coisa só, porque um servidor pode responder diferente por cliente, por região e por momento, portanto uma sonda que pergunta de um só lugar com um só cliente verifica **uma resposta** e não «o servido»; sem essa declaração, a regra nasceria com o defeito que `CQ-22.2` descreve — um valor sem a sua condição — na mesma semana em que `CQ-22.2` se publicou. E a `CQ-25.2` faltava-lhe **que o calendário tenha corrido**: um calendário que falha em silêncio deixa a regra sem efeito e ninguém se dá conta, porque o painel continua verde em razão de não ter corrido nada — um veredicto que não prova que algo tenha corrido —, portanto a última corrida leva a sua data e uma corrida ausente ou velha é **vermelha** e não silenciosa.

E `CQ-25.4` fica **marcada como aplicação e não como invenção**: «não ter podido olhar é vermelho e nunca verde» é a família do zero e já está no catálogo, em `CQ-19.1`. Deixa-se escrita aqui porque o modo de falha é concreto e a tentação é real — «o endereço não respondeu» lê-se como «não se acrescentou nada» —, mas com a referência cruzada à vista: sem ela o catálogo teria duas regras a dizer a mesma coisa, e no dia em que uma se editasse divergiriam, que é a família que D-044, D-077 e D-090 perseguem, esta vez dentro do catálogo. Pela mesma razão **não há uma face do universo**: que se verifiquem todas as páginas publicadas e não uma é `CQ-19.3` — o universo nas duas direções — e ancora-se por referência em vez de se repetir.

E o que esta regra **não** promete, dito aqui e não quando falhar: nenhuma comporta pode verificar que a sonda tenha perguntado de onde diz ter perguntado, nem que o calendário que um projeto declara seja o que de verdade corre. O que uma máquina olha é a **declaração** — a que endereço se perguntou, com que cliente, a data da última corrida, e o contraste dos bytes contra a árvore — e a verdade da declaração decide-a uma pessoa a ler. É a mesma fronteira que `CQ-21` e o terceiro lote escreveram nas suas secções, e vale repeti-la uma vez mais: a cifra é mecânica, a verdade da cifra é do dono.


#### As quatro faces de CQ-22

| id | Face | Enunciado |
|---|---|---|
| CQ-22.1 | O número contra o seu limiar | Toda cifra que um requisito declarado governa chega com o seu limiar ao lado e com o seu veredito —passa ou não passa—, e a que não passa é vermelha e não «medida». A impossibilidade escrita continua a valer como saída; o silêncio não. |
| CQ-22.2 | O limiar com a sua condição | Um limiar declara a condição em que vale —a que volume, a que concorrência, em que ambiente, sobre que dados— e um limiar sem a sua condição reporta-se como não declarado: o mesmo sistema passa a vinte pessoas e falha a duzentas, então sem a condição não há nada contra o que contrastar. A condição é uma decisão do proprietário e não se supõe. |
| CQ-22.3 | A ausência declarada não fecha | Uma salvaguarda que o método exige e que não existe não fecha o seu degrau por estar honestamente declarada. A diferença com a impossibilidade escrita é mecânica: se o que falta é o número, a honestidade basta e a medição fica pendente; se o que falta é a salvaguarda, não falta um número —falta o caminho de volta—, e isso é um vermelho com o seu projeto prévio. |
| CQ-22.4 | Cada entrada com a sua decisão | Um inventário que o método exige fecha com uma decisão por entrada —aceita, acotada ou rejeitada, com quem e quando—, e não com a lista existindo. Um inventário completo cujas entradas ninguém resolveu é a mesma medição que ninguém contrastou, com outra forma. |

#### As três faces de CQ-23

| id | Face | Enunciado |
|---|---|---|
| CQ-23.1 | Posterior à última mudança | Um veredito é posterior à última mudança que afeta o que mede, e correu sobre a árvore que fica. Um verde certo e velho lê-se igual a um vigente; e uma comporta que olha a árvore definitiva e só corre ao publicar deixa um verde com data de vencimento que ninguém revalida. |
| CQ-23.2 | A saída sobrevive à corrida | Toda verificação que pode durar mais do que o turno que a lançou deixa o seu veredito onde o turno seguinte o lê. Uma saída que viaja dentro da resposta morre com ela, e o que se perde não é o trabalho —esse ficou— mas o veredito, que é a única coisa pela qual se correu. |
| CQ-23.3 | O artefato é deste trabalho | Dos artefatos com que um passo fecha, pelo menos um nasceu nele, e a pergunta que o detecta faz-se à mão e sem ferramentas: que arquivo desta lista não existia antes de começar? Se a resposta é «nenhum», o verde é de outro passo, e a comporta mediu bem o artefato errado. |

#### As duas faces de CQ-24

| id | Face | Enunciado |
|---|---|---|
| CQ-24.1 | O campo escreve-o o fato | Um campo obrigatório cujo valor não se deriva do fato que diz registrar pode ser certo de si mesmo e falso do fato: escreve-o o caminho que produz o fato, ou o método declara que esse campo não é o registro do fato e diz qual o é. Um campo constante, ou vazio enquanto o fato ocorre e contado na prosa do lado, deixa uma conta que há que fazer lendo, que é justamente o que o campo vinha evitar. |
| CQ-24.2 | O registro nasce antes do trabalho | Um registro que começa a meio do percurso não pode responder pelo trecho anterior, e o seu zero ali lê-se como «não aconteceu nada». Nasce antes do trabalho que registra, ou as linhas escritas para trás marcam-se como tais e o trecho sem registro informa-se como não registrado e nunca como limpo. |

#### As quatro faces de CQ-25

| id | Face | Enunciado |
|---|---|---|
| CQ-25.1 | Os bytes, e de onde se perguntou | O contraste corre pela rede contra o endereço publicado e compara BYTES, não afirmações. A sonda declara de onde e como quem perguntou, porque o que é servido pode diferir por cliente, por região e por momento. |
| CQ-25.2 | O calendário que correu | Corre com calendário e não só com um commit, porque o que o lado que serve acrescenta ou retira muda sem um commit. A última corrida leva a sua data, e uma corrida ausente ou velha é vermelha. |
| CQ-25.3 | As duas direções | O contraste corre nos dois sentidos: cai algo commitado que não chega, e cai também uma injeção declarada que deixou de estar. |
| CQ-25.4 | Não ter podido olhar | Não ter podido olhar é vermelho e nunca verde. É CQ-19.1 aplicada a este contraste, nomeada aqui porque "o endereço não respondeu" lê-se como "não se acrescentou nada". |


**Severidades iniciais (D-048).** Desde o primeiro dia bloqueiam as regras que têm verificador e que não dependem de um limiar que valha discutir: CQ-01 a CQ-06, CQ-08, CQ-11 a CQ-17, CQ-19, CQ-20, CQ-21, CQ-22, CQ-23, CQ-24 e CQ-25. CQ-09 bloqueia onde há usuários reais, que é onde se mede. Avisam três, e só três: CQ-07 (tipos), CQ-10 (dependências) e CQ-18 (acessibilidade), porque são as que precisam que o projeto calibre primeiro. O formatador, o linter, o tamanho e a complexidade **não se afrouxam**: o passo 9 já os bloqueia hoje, e esta extensão o estende, não o substitui; a dívida herdada se resolve com exceção declarada ou com a linha de base da catraca, nunca baixando a severidade. E CQ-12 e CQ-14 são as duas únicas regras desta tabela que bloqueiam com vermelho humano e não de máquina: se verificam no fechamento do pendente e com o caso manual na frente, igual a UX-22 e UX-27, não em cada commit. Se o projeto não consegue sustentar esse fechamento, a regra baixa a AVISA por decisão registrada, não por descuido.

**Adaptador por família de frontend.** Exemplo de como se instância a capa 2 (os nomes são ilustrativos; o projeto escolhe e escreve os seus):

| Conceito | Aplicação de página única (React, Vue, Angular) | Servidor com templates | Mobile nativo | Linha de comando |
|---|---|---|---|---|
| CQ-12 domínio na vista | Regra de lint sobre tamanho e dependências do componente + revisão | Revisão do controlador | Revisão do view-model | Revisão da capa de comandos |
| CQ-13 cliente único | Geração a partir do contrato da API | Serviço único do servidor | Cliente gerado | Cliente único do SDK |
| CQ-15 textos | Catálogo + regra que proíbe literais visíveis | Catálogo do motor de templates | Catálogo de recursos | Catálogo |
| CQ-16 identificadores | Atributos declarativos por elemento | Identificadores no markup | Identificadores de acessibilidade | Saída estável |
| CQ-17 tokens | Tokens na folha de estilos, sem valores soltos | O mesmo | O mesmo | Não aplica |
| CQ-18 acessibilidade | Analisador automático na comporta | Analisador sobre o HTML gerado | Analisador de acessibilidade | Não aplica |

O que muda entre colunas é a ferramenta e o limiar. O que não muda é o enunciado. Isso é o que torna a heurística agnóstica sem virar decorativa.

## 5. Parte B - Usabilidade

Seis famílias. A primeira e a segunda são as que o dono pediu explicitamente; as outras três existem porque sem elas o agrupamento e os perfis se degradam igual, mais devagar. A sexta nasceu depois, em 2026-10-27 (D-070), e é de outra classe: as cinco primeiras são sobre a tela que o sistema mostra a uma pessoa, e a sexta é sobre a conversa na qual o sistema é construído.

### B1 - Agrupamento por convergência funcional

A regra mãe: **uma funcionalidade se agrupa por aquilo que a pessoa veio fazer, não pelo módulo do qual saiu.** O código se organiza por entidades ("Fatura", "Cliente", "Pagamento"); as pessoas não. Ninguém entra no sistema para "gerenciar entidades": entra para cobrar, para despachar, para fechar o mês. Se o menu mostra as entidades, a pessoa faz a tradução. O menu *é* o trabalho.

| id | Enunciado | Verifica | Severidade |
|---|---|---|---|
| UX-01 | Todo grupo do menu se nomeia com um trabalho do usuário (no vocabulário dele, com o glossário do projeto), nunca com um módulo técnico nem com uma entidade de dados. | Caso manual + revisão da matriz | AVISA |
| UX-02 | Toda funcionalidade tem exatamente uma casa canônica. Se serve dois grupos, se escolhe uma casa e o outro aponta para ela; não se duplica a entrada. | Consulta a matriz | BLOQUEIA |
| UX-03 | Não há órfãs: toda funcionalidade declarada é alcançável desde a tela de entrada em no máximo três passos. | Caminhamento automático de rotas | BLOQUEIA |
| UX-04 | O tamanho de um grupo é razoável: menos de três funcionalidades indica um grupo que não era grupo; mais de sete indica uma gaveta. | Consulta a matriz | AVISA |
| UX-05 | Todo grupo tem uma tela de entrada que diz o que se faz ali e qual é a ação principal. Nenhum grupo abre direto em uma tabela vazia. | Caso manual | AVISA |
| UX-06 | Os fluxos que a pessoa faz seguido vivem juntos: se "registrar um pagamento" e "ver a conta do cliente" se usam na mesma sessão, compartilham grupo. | Caso manual (teste de tarefa) | REGISTRA |
| UX-07 | O teste do primeiro clique: o dono, diante de uma tarefa concreta ("onde se cobra um pagamento?"), nomeia um lugar. Se nomeia dois, há duplicação; se não nomeia nenhum, há órfã. Corre no fechamento de cada bloco. | Caso manual | AVISA |

### B2 - Perfis e funcionalidades habilitadas por perfil

Aqui está a peça que mais paga, e o motivo é de engenharia, não de desenho: **a habilitação se declara uma vez, em uma matriz, e tudo o resto se deriva dela.** Hoje o erro clássico é escrever a permissão três vezes (no menu, no guarda de rota e no filtro de dados) e ter as três desincronizadas. Com a matriz como produtor único, o menu, o roteamento, as permissões do servidor e os scripts de teste são consumidores, e a simetria produtor/consumidor que o método já exige se torna verificável sozinha.

A matriz tem quatro colunas e uma linha por funcionalidade: *funcionalidade*, *casa* (o grupo de B1), *perfis que a tem*, *rota de entrada*. Nada mais.

| id | Enunciado | Verifica | Severidade |
|---|---|---|---|
| UX-08 | Toda funcionalidade declara na matriz que perfis a tem. Uma funcionalidade sem perfil não existe: ou se lhe dá um perfil ou se apaga. | Consulta a matriz | BLOQUEIA |
| UX-09 | Todo perfil declarado tem ao menos uma funcionalidade e um ponto de entrada próprio. Um perfil vazio é um perfil que ninguém usou ao desenhar. | Consulta a matriz | BLOQUEIA |
| UX-10 | A navegação se gera desde a matriz. Um menu escrito a mão é um fracasso, não um atalho. | Comporta (busca) | BLOQUEIA |
| UX-11 | Esconder não é proteger: toda rota verifica a permissão do lado do servidor além de esconder a entrada. Digitar o endereço a mão não basta para entrar. | Teste ponta a ponta | BLOQUEIA |
| UX-12 | Nem menos nem mais: para cada perfil, o conjunto de funcionalidades alcançáveis é exatamente o da sua linha da matriz. | Teste ponta a ponta por perfil | BLOQUEIA |
| UX-13 | A negativa se explica: se uma pessoa entra em uma funcionalidade que não é sua, vê uma mensagem que diz por que e a quem pedir acesso. Nunca uma tela em branco, nunca um botão cinza sem motivo. | Caso manual | AVISA |
| UX-14 | O mesmo botão significa o mesmo para todos: se dois perfis compartilham rótulo, compartilham efeito. Se o efeito muda por perfil, muda o rótulo ou a funcionalidade se divide em duas. | Caso manual | AVISA |
| UX-15 | Os dados também se filtram por perfil: quem vê a lista vê as linhas que lhe correspondem, não a lista inteira com as linhas escondidas no navegador. | Teste ponta a ponta + revisão do servidor | BLOQUEIA |
| UX-16 | A matriz e o manual do usuário se atualizam no mesmo pendente que a funcionalidade. Uma funcionalidade nova sem linha na matriz não fecha. | Fechamento do pendente | BLOQUEIA |

### B3 - Estados, e o que a pessoa vê quando algo não está

A maioria das reclamações de "não funciona" são telas que não souberam dizer "não há nada", "está carregando" ou "falhou". Quatro estados, sempre, em toda lista e em toda tela de detalhe.

| id | Enunciado | Verifica | Severidade |
|---|---|---|---|
| UX-17 | Toda lista tem os quatro estados resolvidos: com dados, vazia, carregando e com erro. A vazia distingue "ainda não há nada" de "sua busca não achou nada". | Caso manual + revisão | AVISA |
| UX-18 | Enquanto algo demora, se vê que está trabalhando e se pode cancelar se for longo. Um botão que não responde nada é a reclamação número um. | Caso manual | AVISA |
| UX-19 | O erro diz o que passou, o que se pode fazer e não apaga o que foi digitado. Nem um código técnico sozinho, nem um "ocorreu um erro". | Caso manual | AVISA |

### B4 - Ações e erros

| id | Enunciado | Verifica | Severidade |
|---|---|---|---|
| UX-20 | Uma tela tem uma ação principal evidente; o resto é secundário e se parece com isso. | Caso manual | AVISA |
| UX-21 | Toda ação destrutiva pede confirmação nomeando o objeto afetado, e quando se pode se desfaz em vez de confirmar. | Caso manual | AVISA |
| UX-22 | Um formulário que falha conserva o que foi digitado e marca o campo com o problema, no lugar do campo. | Caso manual | BLOQUEIA |
| UX-23 | Nenhuma ação deixa a tela sem saída: depois de salvar, apagar ou cancelar, a pessoa sabe onde está e como seguir. | Caso manual | AVISA |

### B5 - Linguagem e acessibilidade

| id | Enunciado | Verifica | Severidade |
|---|---|---|---|
| UX-24 | A interface fala o idioma do glossário do projeto: o mesmo objeto se chama igual na tela, no manual e no e-mail. Um sinônimo é um defeito. | Caso manual + revisão | AVISA |
| UX-25 | Tudo se pode fazer sem mouse e com leitor de tela nos fluxos principais; o foco está sempre visível e não se prende. | Comporta (CQ-18) + caso manual | AVISA |
| UX-26 | Os estados não se comunicam só por cor; toda imagem informativa tem texto alternativo; os textos se leem em tamanho normal sem zoom. | Comporta (CQ-18) | AVISA |
| UX-27 | Todo pendente que toca uma tela entrega a captura real do ambiente de teste, e o dono a olha antes de fechar. A captura não é opcional e não é um mockup. | Fechamento do pendente | BLOQUEIA |

### B6 - A pergunta ao dono

O método ordena ao modelo **perguntar** em mais da metade dos seus prompts: vinte e duas vezes, em quinze dos vinte e sete arquivos do corpus publicado. E até 2026-10-27 não dizia em nenhuma parte **como se pergunta**, então a forma ficava na improvisação e o dono recebia a pergunta solta: sem os dados que a justificam, sem opções e sem recomendação. É a mesma assimetria que o passo 11 persegue -- algo exigido de um lado e não definido do outro -- na direção que sai mais caro: para a pessoa que decide. O método já fez isto duas vezes: o passo 8 não se contentou com "mostre-me o vermelho" e definiu o que é um recibo; o passo 12 não se contentou com "reporte" e separou verificado de acreditado.

| id | Enunciado | Verifica | Severidade |
|---|---|---|---|
| UX-28 | Quando o agente precisa de uma decisão do dono, a pergunta chega com as suas quatro partes e nesta ordem: os dados que a tornam necessária, enumerados; um parágrafo de no máximo cinco linhas que os ligue e deixe ver a dúvida; a pergunta com as suas respostas possíveis enumeradas; e a recomendação do agente. E na profundidade técnica que o projeto declarou. Uma pergunta solta deixa para o dono o trabalho de reconstruir por que lhe perguntam. | Revisão do dono no fechamento do pendente | AVISA |

**Os três níveis de profundidade, e de onde saem.** O projeto declara um e o agente fala nesse nível: `beginner` (linguagem do dia a dia, orientada ao resultado, sem nomes de arquivo nem jargão), `decision_maker` (números medidos e consequências, sem caminhos de arquivo: o que o método usa por padrão) e `technical` (arquivo, linha e comando). Não foram inventados para esta regra: o nível principiante já é a forma de todo o método (D-025). O nome do parâmetro e os três valores vivem no nível de dados, em `project_config.communication_depth`, porque é o que uma ferramenta consumidora tem de ler sem adivinhar.

**O que esta regra não promete.** Uma comporta pode verificar que a cláusula esteja nos setenta e dois prompts e nos oito idiomas -- e verifica; nenhum teste pode verificar que uma pergunta concreta que um modelo escreveu numa terça tenha as suas quatro partes. Isso o dono julga, e é por isso que a regra avisa e não bloqueia. Uma regra que bloqueia e que ninguém pode verificar é pior que uma regra que avisa: é a mesma limitação declarada que CQ-12 e CQ-14 já têm.


## 6. Onde se engancha, e que artefatos produz

O anexo não inventa passos novos: pendura-se nos que existem. Isso evita duplicar comportas e evita o destino habitual das listas de usabilidade, que é serem lidas uma vez.

**Onde vai (D-043).** É transversal aos quatro trechos, com o peso principal no Loop de Construção (passos 5 a 12), que é onde se decide e se constrói. Não é um passo próprio: um passo numerado obrigaria a renumerar a escada, alteraria a contagem de passos e sujeitaria o anexo a tradução obrigatória dos contratos aos oito idiomas antes de que a construção pudesse passar em verde, sem agregar nenhuma comporta que o loop não tenha já.

**Como se engancha (D-044).** Uma fonte canônica, cinco âncoras e duas entradas prévias. O texto das regras vive só aqui e os prompts o citam; nunca o copiam. Repetir as regras dentro dos oito prompts do loop as dilui (competem com o trabalho de cada passo e o agente as obedece diferente em cada vez), as desalinha (duas cópias do mesmo texto se desincronizam sozinhas, que é o antipadrão que o passo 11 persegue) e não as torna mais transversais: o que torna uma regra transversal é que cada bloco passe pela mesma comporta, não que a regra esteja escrita em todas partes.

**A única regra que entra no prompt, e por quê (D-070).** UX-28 é a exceção escrita ao de cima, e convém dizer em que difere das demais: aquelas são exigências sobre **o sistema que se constrói**, e a comporta mede-as sobre artefatos que o projeto deixa escritos; UX-28 é uma exigência sobre **a conversa na qual se constrói**, e a única maneira de o modelo obedecê-la é que esteja no que o modelo lê. Entra acotada -- nomeia as quatro partes e o parâmetro, e nada mais -- numa única redação inglesa idêntica nos oito idiomas. O que esta exceção **não** autoriza é copiar nenhuma das outras: o argumento de D-044 segue inteiro para tudo o que uma comporta pode olhar.

| Momento | O que se agrega | Por que ali |
|---|---|---|
| **Entrada prévia 1** - definição de escopo | O glossário do usuário, em `docs/GLOSSARY.md` | Sem glossário, UX-01 e UX-24 não têm com o que se comparar. |
| **Entrada prévia 2** - definição de escopo | A lista de perfis, em `docs/PROFILES.md` | Sem a lista, a matriz de B2 se inventa no passo 5 e tudo o que se deriva dela nasce sem base. |
| **Âncora 1** - passo 5 (o plano) | Todo pendente que toca uma tela declara três coisas: a que grupo de convergência pertence (B1), que perfis a tem e que critérios de aceitação são por perfil ("dado o perfil X, a pessoa pode fazer Y e não pode fazer Z"). Sem essa declaração o pendente não passa o passo. | Aqui *nascem* o agrupamento e os perfis: são decisões de planejamento, não de código. É a âncora de maior rendimento e a que hoje não existe. |
| **Âncora 2** - passo 8 (testes em vermelho) | A matriz se converte em um teste que primeiro se vê falhar: por cada perfil, o alcançável contra a sua linha (UX-11, UX-12, UX-15). | Sem isso a matriz é um documento que ninguém olha. |
| **Âncora 3** - passo 9 (qualidade) | O catálogo CQ completo com o seu adaptador e os seus limiares declarados; `docs/CODE_QUALITY.md` reporta por regra, não por número único. E a matriz como comporta (UX-02, UX-03, UX-08, UX-09, UX-10, UX-16). | É o único lugar onde o texto entra literal como diretiva, e é a comporta que corre em cada bloco com catraca. |
| **Âncora 4** - passo 10 (casos manuais) | Cada caso se executa **uma vez por perfil afetado**, derivado da matriz e não escrito a mão. Um caso corrido com um só perfil não conta como executado. | Os casos manuais são a única verificação humana do método; se não se abrem por perfil, a metade de B2 nunca se olha. |
| **Âncora 5** - passo 12 (verificação e reporte honesto) | O reporte diz o que se mediu, o que ficou em avisa e que regra está apagada, com o seu motivo, o seu autor e a sua data de revisão. | Zero dano silencioso: um grupo apagado não pode ser lido como cumprido. |
| Manual do usuário | Se organiza pelos grupos de B1 e declara, por grupo, que perfis entram. | O manual e o menu se nomeiam com as mesmas palavras ou o glossário se rompe. |
| Fechamento de cada bloco | Teste do primeiro clique (UX-07), captura do ambiente real (UX-27) e os dois testes ponta a ponta da matriz. | São as três verificações que não se podem automatizar. |

**Estado (D-049).** As cinco âncoras estão ligadas: o prompt inicial dos peldanos 5, 8, 9, 10 e 12 cita este anexo nos oito idiomas, com uma única redação inglesa idêntica em todos e a sua tradução local ao lado. O documento é publicado no site com o resto do método nos oito idiomas, e os seus dois prompts entraram em `docs/html/api/prompts.json` como contrato `anexo-h`: a partir dali `build/prompts.mjs` compara-os byte a byte nos oito ou a construção falha.

Os passos 6, 7 e 11 recebem no máximo uma linha: o 6 já registra limiares e exceções como decisões (e o lugar natural da exceção declarada), e o 11 é onde entra a golpes o caso da matriz escrita em quatro lugares. Não se lhes agrega texto próprio para não diluí-los.

Três artefatos, todos em `docs/`: `CODE_QUALITY.md` (estendido), `USABILITY.md` (novo, com o resultado por regra e as exceções declaradas) e `PROFILE_MATRIX.md` (a matriz, que é ao mesmo tempo documento e fonte do menu).

## 7. Configuração

Um único arquivo por projeto declara a capa 2 e a capa 3. Exemplo com a forma proposta, não com valores definitivos:

```json
{
  "frontend": "react-vite",
  "real_users": true,
  "communication_depth": "decision_maker",
  "measured_by": {
    "format": "prettier",
    "lint": "eslint",
    "types": "tsc",
    "complexity": "eslint-complexity",
    "duplication": "jscpd",
    "dead": "knip",
    "coverage": "vitest-coverage",
    "mutation": "stryker",
    "accessibility": "axe-core"
  },
  "tools": {
    "eslint": "9.12.0",
    "vitest": "2.1.3",
    "stryker": "8.6.0"
  },
  "thresholds": {
    "lines_per_file": 300,
    "lines_per_function": 40,
    "paths_per_function": 10,
    "minimum_coverage": 0,
    "mutation_target": 0,
    "end_users_outside_the_organisation": false,
    "acceptable_data_loss_window": "1h"
  },
  "switches": {
    "code_quality": true,
    "usability": true
  },
  "switched_off": [
    {
      "rule": "CQ-17",
      "reason": "relatório imprimível herdado, sem tokens",
      "authorized_by": "dono",
      "review_date": "2027-01-31"
    }
  ]
}
```

**As chaves desse arquivo são nível de dados e não se traduzem** (D-051, D-075): vão em inglês, em ASCII puro, com o nome exato que o dado declara —as oito de primeiro nível, as quatro do registro de desligamento (`gates/schema.json#project_config`) e os identificadores de limiar (`gates/adapters.json`)— e **idênticas nos oito idiomas**. No idioma do leitor vão os **valores** que uma pessoa escreve: o motivo de um desligamento, por exemplo. Escreveu-se medido em 2026-10-29: até esse dia o exemplo levava as chaves traduzidas —quatro vocabulários distintos nos oito idiomas e oitenta e sete nomes para vinte e quatro casas— e um desligamento escrito como o exemplo ensinava passava pela própria comporta do método **em verde**, com a regra desligada e o registro de quatro campos de D-046 sem ser olhado, porque a comporta lê `switched_off` e o exemplo dizia `exceptions`. `build/claves_configuracion.mjs` agora o exige.

As nove chaves de dentro de `measured_by` são as únicas **ilustrativas**, e isso é uma decisão e não um descuido: o método **não abrange com que se mede cada regra**, o que fica a critério de quem mede (decisão do dono, 2026-10-29). E `end_users_outside_the_organisation` é o limiar da escalada de CQ-18 (D-048, D-076): em `true` a regra bloqueia, em `false` a escalada fica **declinada e registrada**, e sem declarar reporta-se como limiar não declarado —que é «escalada pendente, ninguém olhou» e não o mesmo que tê-la declinado—. Não se usa `real_users` para isso: uma ferramenta interna pode ter duzentos usuários reais e nenhum fora da organização. E `acceptable_data_loss_window` é o limiar de `CQ-22` para o ensaio de destruição e restituição do degrau 20 (D-089): é o período de perda de dados que o proprietário declara aceitável, e **responde-o ele, não o método nem o agente**. O valor do exemplo é ilustrativo como todos os de cima; o que não é ilustrativo é que sem essa resposta a cadência da cópia de segurança não se pode contrastar contra nada —uma cópia por hora, uma por dia e nenhuma são igualmente defensáveis— e a comporta reporta-o como limiar não declarado.

`communication_depth` é o parâmetro de UX-28 e toma um de três valores -- `beginner`, `decision_maker`, `technical`. Se o projeto não o declara, o agente usa `decision_maker` e diz isso: o default declara-se, não se adivinha.

Os dois zeros são deliberados e são a parte que importa: a cobertura mínima a fixa a catraca com o medido, e o objetivo de mutação o fixa o dono quando o projeto tem usuários. Se estão em zero e ninguém os declarou, a comporta o reporta como limiar não declarado em vez de inventá-lo.

## 8. As duas peças, na forma que o método usa

**Qualidade de código.**

> Set up and maintain the code-quality gate for this project, configured for its frontend family. The core rules are the same in every project; what changes is how each one is measured and at which threshold. Install one formatter and one linter with a single shared configuration; enforce size limits per file and per function, complexity per function, duplication, dead code, declared-and-used dependencies, type checking where the language allows it, coverage with a ratchet, and secret scanning. Where the project has real users, add mutation testing scoped to the changed lines and record the score per block. Then extend the gate to the frontend itself: no business rule inside a screen, one typed client for every server call, one home for shared state, no user-visible string outside the translation catalogue, a stable identifier and role on every interactive element, styling only through tokens, and automatic basic accessibility checks. Every rule has a stable id, a severity (blocks, warns, records) and a named verifier. Thresholds and exceptions are declared by the owner in one configuration file; a rule switched off without a written exception is a gate failure, not a decision. Report the result per rule in `docs/CODE_QUALITY.md`, not as a single number.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [pt]
> Monte e mantenha a comporta de qualidade de código do projeto, configurada para a sua família de frontend. As regras do núcleo são as mesmas em todo projeto; o que muda é com o que se mede cada uma e com qual limiar. Instale um único formatador e um único linter com configuração compartilhada; faça cumprir limites de tamanho por arquivo e por função, complexidade por função, duplicação, código morto, dependências declaradas e usadas, verificação de tipos onde a linguagem permitir, cobertura com catraca e varredura de segredos. Onde o projeto tiver usuários reais, agregue testes de mutação restritos às linhas mudadas e registre o escore por bloco. Depois estenda a comporta ao front: nenhuma regra de negocio dentro de uma tela, um único cliente tipado para toda chamada ao servidor, um só lugar para o estado compartilhado, nenhum texto visível fora do catálogo de traduções, identificador estável e papel em todo elemento interativo, estilos só por tokens e verificação automática de acessibilidade básica. Cada regra tem identificador estável, severidade (bloqueia, avisa, registra) e verificador nomeado. Os limiares e as exceções os declara o dono em um arquivo de configuração; uma regra apagada sem exceção escrita é um fracasso da comporta, não uma decisão. Reporte o resultado por regra em `docs/CODE_QUALITY.md`, não como um número único.
>
> Quando você precisar de uma decisão minha, peça-a com as quatro partes da UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e nesta ordem: os dados que tornam a pergunta necessária,
> enumerados; um parágrafo de no máximo cinco linhas que os ligue e deixe ver a dúvida; a pergunta
> com as suas respostas possíveis enumeradas; e a sua recomendação. Diga-o na profundidade técnica
> que o projeto declarou em `communication_depth` —`beginner`, `decision_maker` ou `technical`—;
> se o projeto não declarou nenhuma, use `decision_maker`.

**Usabilidade.**

> Build the usability criteria for this project before writing the first screen, and enforce them where the method already has hooks. Group functionality by what the person came to do, never by the internal module or the data entity: every menu group is named with a user job in the project glossary, every functionality has exactly one canonical home, no functionality is orphaned, and every group is reachable in no more than three steps from the entry screen. Then declare accessibility in one matrix and derive everything from it: each functionality lists the profiles that have it, each functionality has at least one profile, each profile has at least one functionality and its own entry point, the navigation is generated from the matrix instead of written by hand, and every route checks the permission on the server because hiding an entry is not protecting it. Verify the matrix per profile with an end-to-end check that compares what is reachable with the matrix row: neither less nor more. Require the four states on every list (with data, empty, loading, error), a visible working indicator with the option to cancel long operations, an error message that says what happened and what to do without losing entered data, a primary action per screen, confirmation or undo for destructive actions, and a form that keeps what was typed. Run each manual test case once per affected profile, run the first-click check at the close of every block, and require a real screenshot of the test environment on every item that touches a screen. Record the result per rule, with owner-declared exceptions, in `docs/USABILITY.md`, and keep the matrix in `docs/PROFILE_MATRIX.md` as the single source of truth.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [pt]
> Monte os critérios de usabilidade do projeto antes de escrever a primeira tela, e faça-os cumprir onde o método já tem enganches. Agrupe as funcionalidades pelo que a pessoa veio fazer, nunca pelo módulo interno nem pela entidade de dados: cada grupo do menu se nomeia com um trabalho do usuário no glossário do projeto, cada funcionalidade tem exatamente uma casa canônica, nenhuma fica órfã e todo grupo se alcanca em no máximo três passos desde a tela de entrada. Depois declare a acessibilidade em uma única matriz e derive tudo dela: cada funcionalidade enumera que perfis a tem, cada funcionalidade tem ao menos um perfil, cada perfil tem ao menos uma funcionalidade e um ponto de entrada próprio, a navegação se gera desde a matriz em vez de se escrever a mão, e toda rota verifica a permissão do lado do servidor porque esconder uma entrada não é protegê-la. Verifique a matriz por perfil com um teste ponta a ponta que compare o alcançável contra a linha da matriz: nem menos nem mais. Exija os quatro estados em toda lista (com dados, vazia, carregando, com erro), um indicador visível de trabalho em curso com opção de cancelar o longo, uma mensagem de erro que diga o que passou e o que fazer sem perder o carregado, uma ação principal por tela, confirmação ou desfazer nas ações destrutivas e um formulário que conserve o escrito. Rode cada caso de teste manual uma vez por perfil afetado, rode o teste do primeiro clique no fechamento de cada bloco e exija uma captura real do ambiente de teste em todo pendente que toque uma tela. Registre o resultado por regra, com as exceções declaradas pelo dono, em `docs/USABILITY.md`, e mantenha a matriz em `docs/PROFILE_MATRIX.md` como fonte única de verdade.
>
> Quando você precisar de uma decisão minha, peça-a com as quatro partes da UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e nesta ordem: os dados que tornam a pergunta necessária,
> enumerados; um parágrafo de no máximo cinco linhas que os ligue e deixe ver a dúvida; a pergunta
> com as suas respostas possíveis enumeradas; e a sua recomendação. Diga-o na profundidade técnica
> que o projeto declarou em `communication_depth` —`beginner`, `decision_maker` ou `technical`—;
> se o projeto não declarou nenhuma, use `decision_maker`.

## 9. O que esta proposta não faz

- **Não agrega um passo.** São regras transversais — de qualidade de código e de usabilidade —, não uma etapa nova. Penduram-se nos passos que já existem. **Quantas são não o diz esta prosa: declara-o o dado publicado** (`heuristics.counts`), que é a única cópia que não vence (D-090).
- **Não inventa um escore.** Um número de "usabilidade 78" não diz o que arrumar e se otimiza na direção errada. Se reporta por regra. A seção 12 propõe duas cifras derivadas, mas são uma contagem de regras com o seu assento - não uma nota de qualidade nem de usabilidade - e não autorizam fechar nada.
- **Não substitui o dono.** O teste do primeiro clique, a captura e o teste de tarefa continuam sendo humanos: são o único instrumento que distingue "funciona" de "serve".
- **Não traz limiares de fabrica.** Os do adaptador são um ponto de partida declarado; o projeto que não declare os seus os herda e fica registrado como tal.
- **Não promete que a comporta detecte o mau agrupamento.** Uma máquina pode verificar que não haja duplicação nem órfãs; se o grupo se chama "Gestão", tem que ver uma pessoa.

## 10. As decisões: o que ficou resolvido e o que falta

### Resolvidas

| # | Decisão | Registro |
|---|---|---|
| 1 | **Transversal ao Loop de Construção, não passo próprio.** Não se renumera a escada, não se altera a contagem de passos e o anexo não herda a obrigação de traduzir um contrato de passo. | D-043 |
| 2 | **Uma fonte canônica com cinco âncoras e duas entradas prévias,** em vez de copiar as quarenta e cinco regras dentro dos oito prompts do loop. | D-044 |
| 3 | **Dois interruptores independentes** (qualidade e usabilidade), três estados por regra (bloqueia, avisa, apagada), adaptador por família de frontend, limiares e exceções declarados pelo dono. | D-045 |
| 4 | **Disciplina do interruptor:** vive na configuração do projeto e não no prompt; apagar só vale como decisão registrada com motivo, autor e data de revisão; o apagado é observável no reporte; e o interruptor se testa acendendo e apagando. | D-046 |
| 5 | **Severidades iniciais, fixadas regra por regra:** em qualidade bloqueiam catorze (CQ-01 a CQ-06, CQ-08, CQ-11 a CQ-17), CQ-09 bloqueia onde há usuários reais, e avisam três (CQ-07, CQ-10, CQ-18). Em usabilidade bloqueiam onze (UX-02, UX-03, UX-08 a UX-12, UX-15, UX-16, UX-22, UX-27), UX-06 só registra e o resto avisa. Nem "tudo bloqueia" - o projeto não arranca - nem "tudo avisa" - a heurística é um adorno. | D-048 |
| 6 | **A acessibilidade arranca avisando e escala a bloqueante por declaração do dono** quando o produto tem usuários finais fora da organização. O default não se inventa: a escalada se declara, com o mesmo mecanismo que qualquer limiar (D-045). | D-048 |
| 7 | **A forma da pergunta é uma regra com identificador (UX-28), e entra nos prompts.** O método ordenava perguntar vinte e duas vezes e nunca dizia como; a forma são quatro partes em ordem e um nível de profundidade declarado pelo projeto. É a exceção escrita a D-044, acotada e argumentada na seção 6. | D-070 |

### Fechado em D-048, e as duas correções que arrasta

As duas perguntas que travavam a escrita dos prompts já estão respondidas: a 1 ficou na linha 5 e a 2 na linha 6. Mas a recomendação que se aprovou tinha dois erros de fato, e ficam escritos aqui para que não voltem:

1. **O defeito da contagem.** Onde este anexo dizia "vinte e sete regras" o número correto é **quarenta e cinco**: 18 de qualidade (CQ-01 a CQ-18) e 27 de usabilidade (UX-01 a UX-27). A cifra velha vinha de um rascunho que só contava a metade. Corrigido nas seções 6 e 9 e anotado em D-048; o texto de D-044 se conserva tal como se escreveu, porque uma decisão é um registro e não se reescreve.
2. **O formatador, o linter, o tamanho e a complexidade não se afrouxam.** Uma versão anterior desta recomendação os mandava a "avisa" para não travar projetos com dívida herdada. Não pode ser: o passo 9 já os bloqueia hoje, e esta extensão o estende, não o substitui. A dívida herdada se resolve com exceção declarada - com motivo e data de revisão - ou com a linha de base da catraca, não baixando a severidade da regra.

**E desde 2026-11-08 são cinquenta e três.** CQ-25 entrou com D-095 e a conta passou a 25 de qualidade e 28 de usabilidade; é a sétima regra com **faces**, e a primeira que não sai de um sistema construído com o método mas de duas roturas do site onde o método se publica.

**E desde 2026-11-07 são cinquenta e duas.** CQ-22, CQ-23 e CQ-24 entraram com D-089 e a conta passou a 24 de qualidade e 28 de usabilidade; são a quarta, a quinta e a sexta regra com **faces**, e na mesma mudança CQ-21 recebeu a sua quarta face, que é a primeira vez que uma regra publicada ganha uma face depois de ter entrado.

**E desde 2026-11-03 são quarenta e nove.** CQ-21 entrou com D-087 e a conta passou a 21 de qualidade e 28 de usabilidade; é a terceira regra com **faces** e a primeira que entra com o limite do que pode verificar escrito na sua própria seção.

**E desde 2026-11-01 são quarenta e oito.** CQ-19 e CQ-20 entraram com D-078 e a conta passou a 20 de qualidade e 28 de usabilidade; são as duas primeiras regras com **faces**, que é a forma que a seção 2 descreve.

**E desde 2026-10-27 são quarenta e seis.** UX-28 entrou com D-070 e a conta passou a 18 de qualidade e 28 de usabilidade. A nota de cima conserva-se tal como foi escrita, porque uma correção também é um registro; o que muda com uma regra nova é a conta, não a história da conta.

É uma limitação declarada, porque é a única de sua classe: **CQ-12 e CQ-14 bloqueiam com vermelho humano.** Nenhuma ferramenta prova que uma tela não decide regras de negocio. Se verificam no fechamento do pendente, com o caso manual na frente e o mesmo critério que UX-22 e UX-27; se o projeto não consegue sustentar esse fechamento, baixam a AVISA por decisão registrada. Uma regra que bloqueia e que ninguém verifica e pior que uma regra que avisa.

### Calendário, não decisão

**A tradução.** Feita: o anexo existe nos oito idiomas e os seus dois prompts fazem parte da API de prompts, idênticos em ingles nas oito versões (D-043 o exige e `build/prompts.mjs` o faz cumprir). O texto em castelhano continua sendo o canônico: se alguma vez uma tradução e o castelhano discordarem, ganha o castelhano e a tradução se corrige na mesma mudança.

## 11. Como se comprova que a comporta vigia

Uma heurística que não muda nada quando se acende ou se apaga não é uma comporta, é decoração. A prova de aceitação da implementação (PND-002) é um projeto fixture com violações deliberadas de cada família:

| Cenário | Resultado exigido |
|---|---|
| Qualidade acesa, com violação | Vermelho, nomeando a regra e o arquivo onde está a violação. |
| Qualidade apagada **com registro** | Verde, e o reporte **diz** que está apagada, desde quando e quem a autorizou. |
| Qualidade apagada **sem registro** | Vermelho. Apagar sem motivo escrito é um fracasso, não uma ausência de regra. |
| Usabilidade acesa, com perfil que alcanca a mais | Vermelho em UX-12, com o perfil e a funcionalidade nomeados. |
| Usabilidade acesa, com funcionalidade sem linha na matriz | Vermelho em UX-08 ao fechar o pendente (UX-16). |
| Os dois grupos apagados | Verde nos dois, com as duas linhas de apagado no reporte. |
| Se planta uma violação de uma regra que **avisa** | Verde, e se abre um pendente que nomeia a regra e o arquivo: avisar não é aprovar. |
| Se planta uma violação de uma regra que **bloqueia** | Vermelho, com regra, arquivo e remédio nomeados. E não há painel: a média não fecha blocos. |
| Painel: se apaga uma regra **com registro** | O cumprimento pode subir, mas a **cobertura da comporta baixa** e a cifra se pública com o assento que o explica. Com uma única cifra este cenário passaria inadvertido; e a prova de que as duas cifras existem por um motivo (D-047). |
| Painel: duas corridas com regulamentos distintos | As duas cifras se mostram com a sua impressão digital (versão do catálogo, regras ativas e apagadas, adaptador, versões de ferramentas) e **não se grafam como uma série contínua**: são duas medidas distintas e dizê-lo é parte do resultado. |
| Painel: regulamento inválido (regra apagada sem registro) | Não emite cifras. A saída é vermelho, não um painel com um asterisco. |
| Painel: cumprimento alto com uma regra que bloqueia em vermelho | O bloco **não fecha**. O painel faz média; o verde o decide cada regra, uma por uma. |
| Painel: melhora a porcentagem por tocar só o automático | A porcentagem sobe e a linha de verificação humana não se move; se reporta a parte e o reporte não soma as duas coisas em um número único. |

O que se olha não é só a cor: se olha que as duas linhas de apagado **existam** no reporte. Um resultado verde sem essa linha é o único fracasso que esta prova não pode detectar sozinha por cor, e por isso se verifica lendo a saída.

## 12. O painel de cumprimento (DECIDIDO: duas cifras, D-047)

**Estado.** Decidido em 2026-10-22 em D-047: o painel vai com duas cifras, com a impressão digital do regulamento, com catraca, com o humano fora da porcentagem e com o assento obrigatório. Não autoriza fechar blocos. O que segue é a especificação que a implementação (PND-002) tem que cumprir.

**O que é.** Um derivado determinista do resultado por regra que a comporta já emitiu. Não mede nada novo nem julga nada novo: conta. Se o painel pudesse mudar o veredito de uma regra haveria duas fontes de verdade para o mesmo, que é exatamente o que o anexo combate em UX-10 (a navegação se deriva da matriz) e em CQ-14 (um único lugar para o estado).

**O que não é.** Não é um critério de aceitação. Nenhuma cifra autoriza fechar um bloco: o verde ou o vermelho o decide cada regra que bloqueia, uma por uma. O painel descreve a tendência e aponta o que olhar. Se começa a se usar como limiar de fechamento, deixou de servir, porque o caminho mais curto para subir um número é apagar regras.

**Duas cifras, nunca uma.**

| Cifra | Formula | O que mede | Como se move |
|---|---|---|---|
| **Cumprimento** | regras que passam / regras ativas | quão limpo está o que se está olhando | sobe quando se arruma |
| **Cobertura da comporta** | regras ativas / regras declaradas no catálogo | quanto do anexo está realmente olhando | baixa quando se apaga uma regra |

A razão de que sejam duas: apagar uma regra **sobe** o cumprimento e **baixa** a cobertura. Com uma única cifra apagar é grátis e o painel premia a cegueira. Com duas cifras que se movem em direções opostas, o atalho desaparece: para mostrar um painel melhor tem que se arrumar código, não apagar regras. E a cobertura não se pode subir sem medir.

**A impressão digital do regulamento.** Cada registro guarda com que medida se calculou: versão do catálogo, regras ativas e apagadas, adaptador de frontend e versões das ferramentas. Sem isso, um 82 de ontem e um 91 de hoje não são a mesma medida ainda que se escrevam igual: são dois regulamentos distintos e a série é falsa. Duas cifras sem impressão digital produzem uma ilusão de progresso, que é pior que não ter painel. Se a impressão digital muda, o registro se marca como **não comparável** ou o histórico se recalcula com a medida vigente; nunca se grafa junto sem dizê-lo.

**Catraca.** O cumprimento não baixa de um bloco ao seguinte sem uma decisão registrada que o explique. É o mesmo mecanismo que a cobertura de testes já tem em CQ-08: o número de hoje é o piso de amanhã. Baixar não está proibido; baixar sem registro, sim.

**O que não entra na conta.** O que só pode julgar uma pessoa - o teste do primeiro clique (UX-07), o teste de tarefa (UX-06), a captura (UX-27), UX-28 e todos os casos manuais - se registra como passado ou falhado, por bloco, com nome e data, e se reporta a parte como cobertura de verificação humana. Não entra na porcentagem de cumprimento. Se se misturam, o resultado é um número que é sessenta por cento medição e quarenta por cento opinião, e ninguém pode dizer qual é qual. Por isso a seção 9 segue valendo: o painel não inventa uma nota de usabilidade, conta regras.

**Como se falsifica.** Amplia a prova de aceitação da seção 11:

| Cenário | Resultado exigido |
|---|---|
| Se planta uma violação de uma regra que bloqueia | O cumprimento baixa em exatamente uma regra sobre as ativas, e aparece o vermelho com a regra nomeada. |
| Se apaga uma regra com registro | O cumprimento pode subir; a cobertura baixa em uma regra sobre as declaradas; o reporte nomeia a regra, o motivo e a data de revisão. |
| Se apaga sem registro | Vermelho, e não se emite painel: um regulamento inválido não produz cifras. |
| Mesma árvore e mesma configuração, duas corridas | A mesma cifra, idêntica. |
| Muda a configuração entre dois blocos | Os dois registros ficam marcados como não comparáveis, ou o histórico se recalcula com a medida vigente. |
| O painel se usa como critério de fechamento | Uso indevido, não cenário válido: o verde o decide a regra, não a média. |

**Onde aparece.** No reporte honesto do passo 12 (âncora 5), e nesta ordem: primeiro o veredito binário da comporta, depois as duas cifras, depois o que está apagado e até quando, depois o movimento contra o bloco anterior com a sua causa nomeada. Sempre com o assento: *baixou quatro pontos: CQ-15, três cadeias fora do catálogo na tela de cobrança*. Uma cifra sem assento é ruído; o assento é o que a torna acionável para um dono que não lê código.

**Risco declarado.** O painel vai ser lido pelo dono, que não lê código, e por isso vai querer que suba. O número se converte no objetivo, e o objetivo desloca o propósito. As defesas são as de cima, e são cinco: duas cifras que se contradizem ao apagar, a impressão digital que impede comparar medidas distintas, a catraca que não deixa baixar sem registro, o humano fora da porcentagem e o assento obrigatório, com a comporta que não se negocia por média. Se alguma das cinco cai, o painel se apaga: um painel mal usado faz mais dano que não te-lo.

## 13. Registro

Toda decisão deste anexo fica em `docs/DECISIONES.md` com data, autor, citação textual e arquivos de impacto: D-043 (forma), D-044 (mecanismo), D-045 (interruptores), D-046 (disciplina do interruptor), D-047 (o painel com duas cifras) e D-048 (severidades iniciais e o peso da acessibilidade). A implementação e os seus critérios de aceitação vivem em PND-002; a tradução e a indexação, em PND-003.

Não fica nenhuma decisão aberta: a forma (D-043 e D-044), os interruptores (D-045 e D-046), o painel (D-047) e as severidades iniciais com o peso da acessibilidade (D-048) estão decididas. O texto viaja nos oito idiomas e faz parte da API de prompts, o que fecha o único item que ficava no calendário.
