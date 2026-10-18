# Urazuke, o método da evidência — a escada metodológica (versão 4)

Autor: Pablo Kuschniroff, assistido por Claude Code. Versão 4, 18 de outubro de 2026. Este é um
documento de trabalho que vou continuar polindo com cada projeto que o usar; nada do que diz é
doutrina fechada ainda, embora seja, até onde eu sei, o primeiro destilado honesto de um método
que já tem três sistemas em produção nas costas.

Antes de entrar na matéria, uma advertência sobre como está escrito, porque importa. Escrevi-o
para pessoas que não viveram estes projetos comigo: gente que quer construir software com
inteligência artificial e que esse software dure, não gente que quer aprender a programar nem
colecionar truques de prompts. Por isso tomo o tempo de explicar, repito quando é preciso, uso a
linguagem de todos os dias, e deixo no final um **glossário** com cada sigla e cada expressão
coloquial que me escapa. Se em algum momento você topar com uma palavra estranha — "catraca",
"cadeado", "fail-closed", "PND" —, vá ao glossário; está tudo lá. E quando ler uma marca como
[Ref. 26](REFERENCIAS.md#ref-26), saiba que é um atalho para um caso real que conto no documento
de referências, com sua data e sua evidência; você pode ignorá-la sem perder o fio ou segui-la se
lhe interessar o detalhe.

Esta é a versão em português. O espanhol é a fonte da verdade; se as duas discordarem, a versão
espanhola vale e esta é corrigida. Os prompts para o modelo são idênticos em todos os idiomas.

O repositório público do método é
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke). Lá estão este
documento, os contratos de cada degrau, o manual do curso e as referências, nos oito idiomas do
NAC3.

## O nome

**Urazuke** (裏付け) é uma palavra japonesa que nomeia o respaldo que uma afirmação tem: o que a
sustenta por trás (literalmente, "o forro de trás"). O verbo *urazukeru* é "respaldar com
provas". Eu a escolhi em 17 de outubro de 2026, depois de descartar vários nomes por colisões com
empresas e projetos existentes, e a escolhi porque diz exatamente o que o método pede: que cada
afirmação do modelo venha com seu respaldo, e que o respaldo possa ser verificado sem ler o
código. O nome não se traduz; o subtítulo, "o método da evidência", sim: *the evidence method*,
*el método de la evidencia*, *la méthode de la preuve*, *die Nachweis-Methode*, *il metodo del
riscontro*, 裏付けの方法, 验证方法. Neste documento, "a escada" é a estrutura do método — seus
dezesseis degraus — e "Urazuke" é o método inteiro.

## Do que se trata

Quero ser claro sobre o que estou ensinando e o que não. Não estou ensinando uma ferramenta.
Estou ensinando um **método**: o que fazer em que ordem, o que pedir ao modelo em cada momento, o
que ele tem que lhe entregar, e como saber — sem ler código — que o que ele entregou está
completo. A aposta é que qualquer pessoa, com qualquer ferramenta de inteligência artificial que
sirva para programar, possa construir software conversando com um modelo em vez de digitar o
código à mão, e que o que sair seja robusto, esteja pronto para produção e, isto é o importante,
**não exija que o dono do projeto revise uma única linha de código**.

Soa ambicioso, e é. Mas tenho algo que quase ninguém tem: três sistemas reais que construí
exatamente assim, que hoje funcionam com clientes de verdade, e dos quais extraí cada regra que
segue. Então a pergunta que me faço não é "será que dá?", porque já deu. A pergunta é "o que fiz,
em que ordem, e o que de tudo isso é o que realmente fez a diferença?". Esta escada é a minha
resposta, e é a base de três coisas: a documentação do método, a prática que os alunos do curso
vão fazer, e os manuais. Mais adiante vou exportá-la como um fluxo de execução dentro da minha
ferramenta, para que seja a ferramenta a guiar o método e não a memória de cada um.

## De onde sai o método, e o que não quero que se interprete mal

Há uma leitura fácil de tudo isto que quero desarmar antes que se instale: a de que o método é
uma coleção de remendos que fui colocando depois de cada tropeço. Não é assim, e me importa dizer
com precisão porque muda como se deve ler cada degrau.

O método sai de dois fatores que se combinaram, e nenhum dos dois basta sozinho. O primeiro é **o
meu próprio conhecimento da engenharia de sistemas**. Levo muitos anos aplicando o que qualquer
um que venha de sistemas reconhece na hora: levantamento antes de desenhar, requisitos escritos,
dimensionamento com números, desenho, construção, testes como evidência, implantação
reproduzível, operação, auditoria periódica, documentação como parte do produto. A maior parte do
que exijo nos dezesseis degraus é o que sempre exigi num projeto bem conduzido. Não o inventei
para os modelos; eu o trouxe de antes.

O segundo fator é o que os incidentes destes cinco meses me mostraram, um após outro: **onde os
modelos aplicam esses princípios de maneira frágil**. Um modelo sabe perfeitamente o que é um
teste, o que é uma causa raiz, o que é um dimensionamento; se você perguntar, ele explica melhor
do que muitos engenheiros. Mas na prática diz que testou e não testou, estima com cara de quem
tem certeza um dado que só o negócio tem, preenche um buraco nas regras de negócio com o que lhe
pareceu razoável, relata de mais porque foi treinado para ser útil, e constrói um medidor que
mente sem perceber. Cada um desses casos, que conto nas [referências](REFERENCIAS.md), me disse
exatamente onde era preciso apertar: onde um princípio que para mim era óbvio precisava se
converter numa cláusula explícita do prompt, numa comporta, numa verificação que eu faço sem ler
código.

Então, quando num degrau digo "isto impus depois de tal incidente", não estou dizendo que o
princípio nasceu ali. Estou dizendo que ali comprovei que o modelo não o aplicava sozinho, e que
era preciso exigi-lo por escrito. O método é engenharia de sistemas de sempre, aplicada com a
rigidez que é necessária para um construtor que não se cansa e em quem não se pode acreditar sem
evidência. As cicatrizes são a prova de onde é preciso a rigidez, não a origem dos princípios.

## A IA não interrompe o método: ela o continua

Esta é a tese que abre tudo, e a coloco primeiro porque desarma a objeção mais comum antes que
apareça: "como você vai confiar em código que uma máquina escreveu?".

A minha resposta é que **a indústria já deixou de confiar no autor do código há vinte anos**.
Quando o grosso da escrita passou para equipes júnior, terceirizadas ou rotativas, a revisão
linha por linha se tornou impossível de sustentar. E o que cresceu em seu lugar foi tudo o que
hoje tomamos por garantido: os testes automatizados, a integração contínua, os critérios de
aceitação, os pipelines que não deixam passar nada sem verde, o "shift left" dos testes, o
controle de qualidade como função independente. Essa foi a resposta da engenharia de sistemas a
"quem escreve não é confiável": não ler o código dele, exigir evidência.

Colocar um modelo para escrever, então, não é um salto no vazio. É trocar um autor em quem já não
confiávamos por outro em quem também não, e para o qual **já tínhamos montado o aparato de
verificação**. Isso deveria tranquilizar, não inquietar. E ainda por cima o novo autor é mais
barato, mais rápido, e — diferentemente do júnior — não se ofende quando você pede que prove em
vermelho.

Por isso este método se apoia, sem disfarce, na engenharia de sistemas clássica. O esqueleto é o
de sempre. Não poderia ser de outra forma, porque os problemas são os de sempre: não saber
quantos dados vai haver, não saber o que o cliente quer, não saber se o que foi construído é o
que foi pedido. A IA não mudou os problemas; mudou quem faz cada parte e a que custo. Até o
critério de elegibilidade X2 do degrau 0 é engenharia clássica: testabilidade como condição de
contrato.

### O que é velho e o que é novo nisto

O velho, e convém dizer que é velho: o esqueleto de etapas, a independência de quem verifica em
relação a quem constrói, os testes como evidência, a documentação como parte do produto, o
levantamento antes do desenho.

O que de fato muda, e é onde está a minha contribuição, são três coisas:

1. **Onde vai o esforço do humano.** No método clássico o humano escreve a especificação, escreve
   o código, e outro humano o revisa. Aqui o humano faz só duas coisas: **decide, e verifica
   artefatos**. Todo o resto — redigir, construir, testar, medir, documentar — o modelo faz. Por
   isso cada degrau termina numa "verificação de completude sem ler código": é o lugar exato onde
   o humano segue sendo imprescindível, e nenhum outro.

2. **O autor também fabrica a evidência.** Este é o único ponto genuinamente novo, e é a nuance
   que justifica três degraus inteiros. O júnior escrevia código duvidoso, mas não fabricava a
   evidência: os testes e as medições eram montados por outro, ou pelo menos outro os olhava. O
   modelo, em compensação, produz o código *e* o teste *e* o medidor *e* o relatório, na mesma
   sessão, com a mesma segurança na voz quando está certo e quando está errado. Eu vi: o medidor
   que mentiu duas vezes [Ref. 36](REFERENCIAS.md#ref-36), o erro de autenticação relatado como
   "sucesso" [Ref. 43](REFERENCIAS.md#ref-43), as três de quatro afirmações que estavam erradas.
   Então "revisar evidência em vez de código" segue sendo o princípio correto, mas **a evidência
   tem que provar a si mesma**: o teste visto em vermelho (degrau 7), o instrumento com sua
   guarda (degrau 9), o relatório que separa o verificado do acreditado (degrau 10), o auditor
   diferente do construtor (degrau 11). Não é uma inquietação nova: é a mesma disciplina de
   independência do controle de qualidade, levada um passo mais para dentro.

3. **O custo dos artefatos.** No método clássico a documentação era cara, então se fazia uma vez
   e envelhecia. Aqui regenerá-la é grátis, então a regra passa a ser "no mesmo commit" e
   "reproduzível à mão, sem IA". O que antes era um ideal inalcançável passa a ser uma comporta.

Para o curso e para a apresentação pública, isto define o posicionamento com honestidade: não é
"a nova forma de programar"; é **engenharia de sistemas aplicada a um construtor que não se
cansa e em quem não se pode acreditar**. Para quem vem de sistemas soa familiar e baixa a
desconfiança; para quem vem do vibecoding dá o que não têm, que é justamente o esqueleto. E me
diferencia das ferramentas que vendem velocidade e omitem o esqueleto inteiro.

---

## Parte A — Como ler cada degrau

Cada degrau tem oito partes, sempre as mesmas, para que se possam comparar:

- **Intenção**: o que busca, numa frase.
- **Quando**: em que momento do projeto se sobe, e se se sobe uma vez ou se repete. Esta parte é
  nova na versão 4 e a explico em detalhe na Parte B, porque um método sem linha do tempo é uma
  lista de boas intenções.
- **Entradas**: o que tem que existir antes para poder subi-lo.
- **Artefato**: o que fica escrito ou executável quando se sobe. É sempre algo concreto: um
  arquivo, um teste, um script.
- **Comporta**: o que tem que ser verdade para passar ao seguinte. Se não se cumpre, não se sobe.
- **Quem decide**: o dono do projeto, o agente, ou ninguém porque é automático.
- **Falha que evita**: o tipo de problema que o degrau previne, com uma referência curta ao caso
  real onde o comprovei.
- **Contrato**: o arquivo onde está como se executa: contexto, prompts, resultado, verificação,
  sinais de alerta.

Dois esclarecimentos importantes. Primeiro: **a escada é neutra em relação à ferramenta**. Cada
artefato é um arquivo, um teste ou um script; nenhum exige a minha ferramenta nem nenhuma outra.
O Forge os automatiza (as comportas, os comandos, o registro de pendências), mas o degrau existe
sem o Forge. Segundo: **os degraus não são estritamente sequenciais**. Há três fases: os de 0 a 4
são de arranque e se sobem uma vez por projeto; os de 5 a 10 são o ciclo que se repete com cada
mudança; e os de 11 a 15 são de operação, quando o sistema já está vivo. O 15 fecha o ciclo e
volta ao 0 para o próximo projeto. Mas "não estritamente sequenciais" não quer dizer "em qualquer
ordem": a Parte B diz exatamente quando se sobe cada um e o que acontece no meio.

---

## Parte B — A linha do tempo: quando se sobe cada degrau e o que acontece no meio

Esta parte não existia nas versões anteriores, e sua ausência era um defeito sério: o método
dizia o que fazer e como verificá-lo, mas não dizia **quando**. E "quando" é a metade de um
método. Um leitor que o tomasse ao pé da letra podia subir os dezesseis degraus um após outro e se
perguntar em que momento se faz, então, a infraestrutura, a cadeia de integração e implantação
contínuas, a ingestão dos requisitos, o desenvolvimento da funcionalidade, os testes de ponta a
ponta de todos os fluxos, o olhar humano sobre as telas, e os testes humanos de aceitação. Tudo
isso acontece, e acontece em momentos precisos, entre os degraus e dentro deles. Aqui o escrevo.

### B.1 As cinco fases de um projeto

Um projeto conduzido com este método passa por cinco fases. As três do meio são as que
correspondem às três fases da escada; as duas dos extremos são a ingestão inicial e a vida em
produção, que o método também cobre embora não sejam "degraus" em si.

| Fase | Duração típica num projeto pequeno | Degraus que se sobem | O que mais acontece nessa fase |
|---|---|---|---|
| 0. Ingestão | de dois dias a uma semana, em paralelo com a fase 1 | nenhum ainda; é a matéria-prima do 0, do 2, do 3 e do 5 | Levantamento do negócio com o dono, com os métodos clássicos da engenharia de requisitos (ver B.5): entrevistas, casos de uso ou histórias de usuário, modelo de domínio, protótipos de tela. Escreve-se em prosa, incompleto de propósito; o agente o completa perguntando. |
| 1. Arranque | uma semana, de uma vez | 0, 1, 2, 3, 4 | Elegibilidade, contrato, definição, dimensionamento. E **toda a infraestrutura inicial**: o repositório, o ambiente de teste, a integração contínua, a primeira implantação com o sistema vazio. |
| 2. Ciclo | de três a seis semanas, em blocos funcionais de uma a duas semanas | 5, 6, 7, 8, 9, 10 com cada mudança | Desenvolvimento funcional bloco por bloco; testes em vermelho; testes de ponta a ponta do fluxo recém-construído; olhar humano sobre cada tela nova; no fechamento de cada bloco, testes humanos no ambiente de teste. |
| 3. Saída para produção | uma semana | 11, 12, 13, 14 | Auditoria por outra sessão; cadeados sobre tudo o que age sobre o mundo; fechamento da cadeia de implantação em produção com caminho de volta provado; os três manuais; testes de aceitação com o dono sobre todos os fluxos. |
| 4. Operação | enquanto o sistema viver | 15, e o ciclo (5 a 10) para cada evolução; 11 periódico | Agente residente; auditoria a cada um ou dois meses; cada mudança nova entra pelo ciclo completo e sai pela cadeia de implantação; retrospectiva no fechamento de cada etapa. |

Os tempos são para um projeto pequeno, do tamanho do projeto-guia do curso. Num projeto com
usuários e consequências, o ciclo se alonga e as fases 1 e 3 se mantêm quase iguais, porque o que
cresce é a funcionalidade, não a infraestrutura nem o fechamento.

### B.2 O que acontece entre degrau e degrau

Aqui está o que faltava. Para cada fase, que tarefas de cada tipo se fazem e em que momento exato
em relação aos degraus. Leia a tabela por linhas: cada linha é um tipo de trabalho, e cada célula
diz quando se faz dentro dessa fase.

| Tipo de trabalho | Arranque (degraus 0 a 4) | Ciclo (degraus 5 a 10, por bloco) | Saída para produção (11 a 14) | Operação (15 e ciclo) |
|---|---|---|---|---|
| **Ingestão de requisitos** | Antes do degrau 0: levantamento em prosa com o dono, com entrevistas, casos de uso e modelo de domínio. Completa-se no 2 (definição e árvore semântica) e no 3 (volumetria). | Ao abrir cada bloco: o pedido do cliente para esse bloco, tal como ele o diria, se converte em pendências com **especificação detalhada** (degrau 5): descrição, critérios de aceitação, regras aplicáveis, dados, telas, casos de borda. As perguntas que o agente faz são a ingestão fina. | Antes do 12: levantamento das ações com consequência. Antes do 13: levantamento de ambientes e acessos. | Cada pedido novo entra como pendência especificada, pendurada em seu nó da árvore semântica; o agente residente recolhe o que os usuários pedem. |
| **Infraestrutura** | Toda a inicial, no degrau 4: repositório, estrutura, ambiente de teste, credenciais, domínio de teste. Não se constrói funcionalidade até que o esqueleto vazio esteja implantado. | Nenhuma, salvo que um bloco a exija (uma fila, um serviço externo). Se exige, é uma pendência com seu teste. | No 13: ambiente de produção, segredos no servidor, domínio real, backups, monitoramento mínimo. | Mudanças de infraestrutura entram pelo ciclo e pelo 13; nunca "à mão, rápido". |
| **Cadeia CI/CD** | No degrau 4: a integração contínua roda a bateria em cada push desde a primeira semana, e a implantação no ambiente de teste é automática ao fazer merge. | Funciona sozinha. Cada commit a atravessa; se não está em verde, o bloco não fecha. | No 13 se completa: a implantação em produção espera o resultado da integração e só empacota; a promoção é um procedimento escrito; o caminho de volta se prova. | Cada implantação segue a rotina do 13: teste em verde com a mesma versão, caminho de volta pronto, verificação de ponta a ponta em produção depois. |
| **Desenvolvimento funcional** | Nenhum. O esqueleto se implanta vazio de propósito. | É o centro do ciclo: o agente pega uma pendência (5), pergunta as regras de negócio que faltam (6), constrói, e fecha com evidência (7, 8, 9, 10). Bloco por bloco, do básico ao que tem consequências. | O que age sobre o mundo (cobrar, enviar) se constrói no ciclo **depois** do degrau 12, com seus cadeados, e começa em modo de ensaio. | As evoluções entram pelo ciclo. |
| **Testes automáticos** | Um teste de fumaça que passa, no 4. É a semente da bateria. | Com cada pendência: o teste provado em vermelho (7), a regressão das vizinhas na mesma sessão, e **um teste de ponta a ponta do fluxo recém-construído**, desde a tela até o backend. Ao fechar um bloco: a bateria completa de ponta a ponta de **todos** os fluxos existentes, no ambiente de teste. | Antes da primeira implantação em produção: a bateria completa de ponta a ponta de todos os fluxos, em verde, com a mesma versão que vai ser promovida. Depois da implantação: uma verificação de ponta a ponta sobre a produção, em somente leitura. | Com cada mudança, o mesmo que no ciclo. |
| **Vista humana das telas** | No fechamento do 4: o dono abre a URL do ambiente de teste e vê a tela vazia. Parece trivial e é a primeira vez que alguém que não é o agente olha o sistema. | **Com cada pendência que toca uma tela**: o agente entrega uma captura real do ambiente de teste e o dono a olha. Dez segundos. É a forma mais barata de encontrar o que nenhum teste encontra: que o botão está onde não deve, que o texto diz outra coisa, que o fluxo não é o que o negócio imaginava. | No 14: as capturas do manual de usuário são o último olhar humano sistemático antes da produção. | Cada tela nova ou mudada, igual que no ciclo. |
| **Testes humanos** | Nenhum ainda, salvo abrir a tela vazia. | **No fechamento de cada bloco funcional**: o dono, ou um usuário de confiança, usa o sistema no ambiente de teste como o usaria de verdade, seguindo os fluxos do bloco. O que encontra se anota como pendências. Não se abre o bloco seguinte com achados humanos sem pendência. | Antes da primeira implantação em produção: **testes de aceitação** do dono sobre todos os fluxos, com dados de teste realistas, no ambiente de teste. E no 14, uma pessoa que não programa segue o manual de recuperação. | Com cada evolução, no fechamento de seu bloco. |
| **Decisões do dono** | No 0 (vai ou não vai), no 1 (o contrato), no 2 (o que NÃO é), no 3 (a opção de arquitetura). | Cada vez que o agente para por uma regra de negócio não escrita (6). Costumam ser duas ou três por bloco. | No 12 (cadeado por cadeado), no 13 (promover para produção), no 15 (o nível do agente residente). | As que surgirem; sempre escritas. |

Um detalhe que quero sublinhar porque é onde mais erra a gente que vem do vibecoding: **os testes
de ponta a ponta de todos os fluxos não são uma única vez no final**. São três vezes, em três
escalas. Com cada pendência, o fluxo que essa pendência tocou. No fechamento de cada bloco, todos
os fluxos que existem até ali. E antes da produção, todos os fluxos com a versão exata que vai ser
promovida. Se você só faz a terceira, chega ao final com um sistema que ninguém testou de ponta a
ponta durante semanas e a saída para produção se converte numa semana de consertos.

### B.3 O ritmo do ciclo: um bloco funcional típico

Um bloco funcional é um conjunto de entre quatro e oito pendências relacionadas, que juntas fazem
algo que o negócio pode usar: "a agenda básica", "os lembretes", "o relatório mensal". Um bloco
dura entre uma e duas semanas num projeto pequeno. Assim se vê por dentro:

1. **Abertura do bloco (meio dia).** O dono conta, em prosa, o que quer para este bloco. O agente
   o converte em pendências numeradas, com seu "como se verifica", e pergunta o que não dá para
   escrever uma pendência verificável (degrau 5). O dono prioriza.
2. **Cada pendência (de duas horas a um dia).** O agente anuncia que pendência pega e por quê.
   Constrói. Se no caminho aparece uma regra de negócio que não está escrita, para e pergunta
   (6). Quando termina, fecha com a rotina do 7: teste provado em vermelho, verde, regressão das
   vizinhas; um teste de ponta a ponta do fluxo tocado; e, se a mudança tocou um contrato entre
   duas partes do sistema, o outro lado atualizado no mesmo commit (8). Se a pendência dependia de
   um número — quantas consultas, quanto demora —, primeiro se mediu com um instrumento com teste
   (9). E o relatório separa o verificado do acreditado e declara os pontos cegos (10). O dono lê
   o relatório e olha a captura da tela. Não lê código.
3. **Fechamento do bloco (meio dia a um dia).** A bateria completa de ponta a ponta em verde no
   ambiente de teste. O dono ou um usuário de confiança usa o sistema seguindo os fluxos do bloco.
   O que encontra se anota como pendências. Atualiza-se o manual de usuário com as telas novas
   (14, no mesmo commit). Só então se abre o bloco seguinte.

Num dia típico do ciclo, o dono investe entre quinze e trinta minutos: responder duas ou três
perguntas de regras de negócio, ler dois ou três relatórios, olhar duas ou três capturas. Isso é
tudo o que o método lhe pede. Se está investindo mais, ou o agente está perguntando o que poderia
resolver sozinho (degrau 1), ou o dono está lendo código (e então algo do degrau 7 ou do 10 não
está funcionando).

### B.4 Os marcos humanos

Resumo numa lista os momentos em que um humano, o dono ou alguém de sua confiança, tem que olhar
ou usar o sistema. São poucos, estão em momentos precisos, e nenhum pode ser delegado ao agente:

- **Fim do arranque**: abrir a URL do ambiente de teste e ver o sistema vazio.
- **Com cada pendência que toca uma tela**: olhar a captura real do ambiente de teste.
- **No fechamento de cada bloco**: usar o sistema no ambiente de teste seguindo os fluxos do
  bloco.
- **Antes da primeira implantação em produção**: testes de aceitação sobre todos os fluxos.
- **No degrau 14**: uma pessoa que não programa segue o manual de recuperação no ambiente de
  teste.
- **Depois de cada implantação em produção**: verificar que a versão que roda é a que se queria,
  e fazer uma passada de somente leitura pelos fluxos críticos.

Todo o resto — os testes, as medições, as auditorias, a documentação — o modelo faz e o humano
verifica pelo artefato, não pelo código.

### B.5 Como entram os requisitos: do levantamento à árvore semântica e às pendências

Quero me deter nisto porque é onde a engenharia de sistemas clássica tem mais a dizer e onde o
vibecoding a ignora com mais entusiasmo. Um requisito não é uma frase do cliente num chat. É uma
frase do cliente **processada** por métodos que existem há décadas e que continuam valendo com um
modelo à frente, porque o modelo é muito bom aplicando-os se você pede e muito ruim aplicando-os
se não pede.

Os métodos que uso, e que o método exige em cada fase:

- **Entrevistas com o dono**, abertas, em prosa, registradas. São a fase 0. Não tento que sejam
  completas: tento que o agente detecte o que lhes falta.
- **Casos de uso ou histórias de usuário**, um por fluxo que o negócio pode nomear: "a
  recepcionista registra uma consulta", "o paciente recebe o lembrete". Cada um tem ator,
  gatilho, passos, resultado e exceções. São a unidade com que se abre um bloco funcional.
- **Modelo de domínio**: as entidades do negócio, seus atributos, seus estados possíveis e as
  transições entre estados. É o coração da árvore semântica (ver abaixo) e o que evita que o
  modelo invente estados que o negócio não tem.
- **Critérios de aceitação** por história, na forma "dada tal situação, quando acontece tal
  coisa, então se vê tal resultado". São os que se convertem no "como se verifica" de cada
  pendência e, depois, no teste de ponta a ponta.
- **Protótipos de tela**, mesmo que sejam um desenho. A vista humana das telas começa aqui, antes
  de existir código.
- **Rastreabilidade**: cada requisito pode ser seguido até a pendência que o implementa, o teste
  que o prova e o commit que o fechou. No método a rastreabilidade não é uma matriz à parte: é a
  própria pendência, que cita sua origem e sua evidência.

**A árvore semântica.** É o artefato que ordena tudo isto e é o mapa que o agente lê em cada
sessão (degrau 2). É uma árvore, não uma lista: o sistema na raiz; abaixo, os domínios ou
módulos; abaixo de cada um, seus atores, seus processos (os casos de uso), suas entidades com seus
estados, suas telas e suas integrações externas; e pendendo de cada nó, as pendências que o tocam
e as decisões que o afetam. O agente a constrói a partir do levantamento, você a corrige, e cresce
com cada bloco. Seu valor é duplo: dá ao modelo o contexto exato do nó que vai tocar sem ter que
ler todo o projeto, e dá a você uma forma de verificar que o sistema que o agente entende é o que
o negócio pediu, sem ler código. Quando uma pendência não pende de nenhum nó, ou a árvore está
incompleta ou a pendência está fora de escopo; as duas coisas se veem em dez segundos.

**A especificação detalhada vive na pendência.** No método clássico havia um documento de
especificação de requisitos, longo, que envelhecia. Aqui esse documento se decompõe: cada
pendência leva sua própria especificação completa, e a soma das pendências é a especificação do
sistema. Uma pendência bem escrita tem: título; o nó da árvore semântica de que pende; a história
ou caso de uso que a origina, com as palavras do cliente; a descrição detalhada do que se pede;
as regras de negócio aplicáveis, com sua decisão e sua data; os dados que entram e saem; as telas
afetadas, com o protótipo se houver; os casos de borda e as exceções; os critérios de aceitação;
e como se verifica. O agente a redige a partir do seu pedido em prosa, pergunta o que não dá para
especificar, e você a lê antes de ser construída. Ler uma especificação de pendência é o mais
perto que você vai estar de ler código, e é exatamente a distância correta.

**As pendências fechadas são documentação.** Isto é o que fecha o círculo. Quando uma pendência
se fecha, não se apaga nem se arquiva vazia: fica com sua especificação, a decisão que a
originou, a evidência com que se fechou (os números do vermelho e do verde, a captura da tela, o
número medido), o commit, e a data. A fila de pendências fechadas é, então, o histórico funcional
do sistema: o que se construiu, por quê, quando, e como se testou. Dali saem o diário de
mudanças, as seções novas do manual de usuário e, quando alguém pergunta seis meses depois "por
que o sistema faz isto?", a resposta. O manual do curso ensina a exigir esta documentação no
fechamento de cada pendência, na mesma sessão, como parte da rotina do degrau 5.

---

## Parte C — Os dezesseis degraus

### Passo 0 — Este projeto pode ser encarado assim? (a elegibilidade)

Há algo prévio a tudo, que não está em nenhum repositório porque sempre chegou decidido: a
decisão de **se um projeto se encara com este método ou não**. É um critério que vivi na minha
cabeça durante meses e que estou terminando de escrever. Os dois critérios excludentes já tenho
claros, e saem dos projetos que recusei, não dos que aceitei [Ref. 46](REFERENCIAS.md#ref-46):
os "não" definem a fronteira melhor do que os "sim". Os critérios que ponderam ainda estou
calibrando, e assim os marco.

- **Intenção**: decidir se um projeto se encara com este método, e com um agente à frente, ou
  não, ANTES de abrir o repositório. Porque se você entra num projeto que não dá, o método se
  degrada em "programar com IA" e aí sim o dono acaba lendo código.
- **Quando**: uma única vez, na primeira semana, antes de qualquer outra coisa. Uma hora de
  trabalho; economiza meses.
- **Entradas**: o pedido do cliente, o domínio do negócio, os dados, a tecnologia, os ambientes
  disponíveis, e quem vai ser o dono.
- **Artefato**: uma ficha de elegibilidade de uma página, com os critérios pontuados e a decisão:
  vai, não vai, ou vai com condições.
- **Comporta**: os critérios excludentes estão todos em verde, e a pontuação dos que ponderam
  supera o limiar (limiar que ainda não defini).
- **Quem decide**: o dono. Hoje sou eu; a ideia é que o método permita que outra pessoa decida
  com a mesma ficha.
- **Falha que evita**: meter-se num projeto onde o agente não pode se verificar sozinho, ou onde
  não há um dono do domínio que decida, e acabar com o humano revisando código linha por linha.
- **Contrato**: `peldanos/peldano-00-elegibilidad.md`.

**Os dois critérios excludentes.**

| # | Critério excludente | Por que mata o método |
|---|---|---|
| X1 | Tecnologia legada sem repositório acessível, ou com repositórios que não seguem um padrão | Sem um repositório padrão não há onde deixar a evidência: não há pendências citadas nos commits (degrau 5), nem testes que viajem com o código (7), nem integração e implantação como pacote (13), nem documentação no mesmo commit (14). O agente trabalha às cegas e não deixa rastro verificável. |
| X2 | Tecnologia que não pode ser testada de ponta a ponta: não se podem executar as telas e acessar cada elemento da interface com seus diferentes métodos, validando que a mudança chegou ao backend | Sem essa verificação de tela a backend o agente não pode se testar sozinho (degraus 7, 9 e 10), e então o dono teria que ler código, que é justamente o que o método promete evitar. |

Uma precisão que vale ouro para a neutralidade de ferramenta: **NAC3 (o protocolo que a minha
ferramenta usa para que as telas possam ser operadas por programa) NÃO é condição; é o meio com
que hoje consigo isso**. O critério neutro fica assim: a interface pode ser executada por
programa, e cada elemento da tela é acessível com seus diferentes métodos (clicar, digitar, ler
seu estado), de modo que um teste possa percorrer a tela e depois verificar o efeito no backend.
Uma tecnologia cuja interface não expõe seus elementos a um "driver" (como o Playwright, por
exemplo) fica de fora, mesmo que tenha repositório.

E uma leitura que me parece importante: no fundo X1 e X2 são **a mesma condição vista de dois
lados**. O agente tem que poder se verificar sozinho, de ponta a ponta, e deixar a evidência no
repositório. X1 é a metade "onde fica a evidência?"; X2 é a metade "como se produz a evidência?".

`[hipótese]` **Critérios que ponderam, ainda sem peso.** Deixo-os marcados como hipótese até que
os calibre com os primeiros projetos que usarem o método de ponta a ponta.

| # | Critério candidato | Como se viu nos casos | Excludente? |
|---|---|---|---|
| D1 | Há um dono do domínio com critério e com tempo para decidir (não para programar) | nos três sistemas, com as decisões escritas com data | `[?]` |
| D2 | Há um "oráculo" de verdade verificável: dados reais, um sistema externo, produção em somente leitura | o Plano de Saúde e seu Autorizador como oráculo [Ref. 26](REFERENCIAS.md#ref-26) | `[?]` |
| D4 | A tecnologia está dentro do que o agente domina sem inventar (Node, Python, SQL, React) | os três | `[?]` |
| D5 | O erro tem consequência real (dinheiro, saúde, operação), o que justifica o fail-closed | o Plano de Saúde (saúde, cobranças), a Associação (famílias) | `[?]` |
| D6 | A volumetria pode ser conhecida desde o dia um | Kikan: 3,4 milhões de linhas por ano [Ref. 15](REFERENCIAS.md#ref-15) | `[?]` |
| D7 | O cliente tolera um tempo de maturação e um humano no circuito | o aprovador automático com modo de ensaio [Ref. 28](REFERENCIAS.md#ref-28) | `[?]` |
| D9 | O escopo cabe num repositório e um dono | os três | `[?]` |
| D10 | Os segredos e acessos podem ser isolados (cofre, arquivo de ambiente, permissões delimitadas) | a chave de API mapeada a quem a criou [Ref. 13](REFERENCIAS.md#ref-13) | `[?]` |

Dois critérios que eu tinha em versões anteriores (que o agente possa testar sozinho, e que o
projeto seja novo ou auditável) absorvi em X2 e X1 respectivamente, porque são consequências e
não critérios à parte.

### Passo 1 — O contrato de convivência (as regras antes do código)

Antes de escrever uma única linha, coloque por escrito como vocês vão trabalhar, você e o
agente. Parece uma formalidade, e não é: é o que evita oitenta por cento das frustrações do mês
um. Pense que o agente chega cada manhã sem memória de ontem; o que não estiver escrito você vai
ter que repetir a cada vez, e a cada vez um pouco diferente.

- **Intenção**: fixar como trabalham o humano e o agente antes da primeira linha de código.
- **Quando**: uma única vez, na primeira semana, imediatamente depois da elegibilidade. Meia
  hora. Revisa-se quando um tropeço o exige.
- **Entradas**: nada do projeto; é o primeiro arquivo. De você: suas preferências de trabalho.
- **Artefato**: um documento de padrões de qualidade que diga, no mínimo: o tempo do humano é
  sagrado (não se gasta em coisas que o agente pode resolver sozinho); zero dívida técnica, isto
  é, quando algo quebra se conserta na raiz e se acrescenta a regressão na mesma sessão; o
  escopo é exato, nem mais nem menos do que o pedido; fala-se no idioma do usuário; a
  documentação se atualiza no mesmo commit; e jamais se anuncia como feito algo que não foi
  feito.
- **Comporta**: o contrato está no repositório e se lê em cada sessão.
- **Quem decide**: o dono. O agente pode propor mudanças, mas não edita o contrato por conta
  própria.
- **Falha que evita**: o agente que "ajuda" expandindo o escopo porque lhe pareceu boa ideia; o
  que deixa dívida "para depois" (e o depois nunca chega); e o que relata como feito o que
  *acredita* ter feito. Eu o escrevi pela primeira vez quando já levava duas semanas repetindo a
  mesma coisa em cada sessão [Ref. 1](REFERENCIAS.md#ref-1).
- **Contrato**: `peldanos/peldano-01-contrato-de-convivencia.md`.

### Passo 2 — A definição do projeto e a leitura obrigatória

Cada sessão do agente começa do zero. Dê a ele um mapa, curto, e obrigue-o a lê-lo antes de tocar
em qualquer coisa. As duas metades importam por igual: um mapa que ninguém lê não age, e um mapa
longo ninguém lê.

- **Intenção**: que cada sessão comece sabendo o que é o projeto, em que estado está e que
  decisões já foram tomadas.
- **Quando**: escreve-se uma vez, na primeira semana, depois do contrato; mantém-se em dia
  durante todo o projeto, com cada decisão nova.
- **Entradas**: o contrato (degrau 1) e o levantamento do negócio.
- **Artefato**: um arquivo de projeto operacional, e aqui vai uma ênfase: CURTO. É o programa,
  não o histórico. Mais a **árvore semântica** do sistema (ver B.5): domínios, atores, processos,
  entidades com seus estados, telas e integrações, com as pendências e as decisões pendendo de
  cada nó. Mais um arquivo de estado vivo com o que se está trabalhando e as dúvidas abertas.
- **Comporta**: o agente lê o arquivo de projeto e a árvore semântica antes de tocar em código, e
  provou-se que os lê.
- **Quem decide**: o dono define; o agente o mantém em dia.
- **Falha que evita**: duas, bem concretas. Trabalho descartável por não ter lido o mapa
  [Ref. 9](REFERENCIAS.md#ref-9). E o arquivo de projeto que cresce até se tornar ilegível
  [Ref. 41](REFERENCIAS.md#ref-41): o arquivo operacional e o livro de casos têm que ser arquivos
  diferentes.
- **Contrato**: `peldanos/peldano-02-definicion-y-lectura.md`.

### Passo 3 — Dimensionar antes de desenhar a arquitetura

Este é o degrau que mais caro custa pular, e sei disso porque eu o pulei. As decisões estruturais
se tomam com números, e os números primários o negócio tem, não o modelo.

- **Intenção**: que as decisões estruturais (que motor de banco de dados, se a interface é
  síncrona ou assíncrona, quanta concorrência) se tomem com números e não com gosto.
- **Quando**: uma vez, na primeira semana, antes de montar o esqueleto; refaz-se se o negócio
  muda de escala. Meia página e uma decisão num projeto pequeno.
- **Entradas**: um levantamento de dados de volumetria feito com o negócio, por natureza
  incompleto; e acesso de leitura ao sistema anterior se existir. Há dados que **só o negócio
  tem** e o modelo não pode inferir: por isso o prompt exige que ele avalie se estão completos e
  peça os que faltam, em vez de estimá-los com cara de quem tem certeza.
- **Artefato**: um registro de dimensionamento com opções FIXAS (três ou quatro opções concretas)
  e a escolhida; e as decisões "assimétricas" declaradas explicitamente, por exemplo "a interface
  de persistência é assíncrona desde a linha um mesmo que o primeiro motor seja síncrono", porque
  se você está errado custa pouco e se não faz custa uma fortuna.
- **Comporta**: o dimensionamento está registrado antes de montar o esqueleto.
- **Quem decide**: o dono escolhe entre as opções fixas; o agente as apresenta com números.
- **Falha que evita**: começar com um armazenamento que não aguenta a volumetria e descobrir
  quando mudar a interface custa uma etapa inteira de reengenharia
  [Ref. 15](REFERENCIAS.md#ref-15).
- **Contrato**: `peldanos/peldano-03-dimensionar.md`.

### Passo 4 — O esqueleto com suas comportas

Antes de o sistema fazer algo útil, tem que arrancar, ser testado e ser implantado VAZIO. Sim,
vazio. Porque o caminho para a produção é parte do produto, e a única forma de saber que funciona
é percorrê-lo quando ainda não há nada a perder. Este é o degrau onde se faz **toda a
infraestrutura inicial e a cadeia de integração e implantação**, e por isso ocupa a maior parte
da primeira semana.

- **Intenção**: ter um sistema que arranca, se testa e se implanta sem nenhuma funcionalidade
  ainda.
- **Quando**: uma vez, no final da primeira semana, depois do dimensionamento e antes de qualquer
  funcionalidade. É o fechamento da fase de arranque.
- **Entradas**: o dimensionamento (degrau 3), o levantamento de ambientes, e as credenciais do
  lugar onde vai ser implantado.
- **Artefato**: o esqueleto com a integração contínua em verde, a estrutura de testes montada com
  um teste de fumaça, uma implantação num ambiente de teste que funciona e foi rodada duas vezes,
  e as comportas do fluxo declaradas por escrito.
- **Comporta**: o esqueleto está em verde, a integração contínua roda, e a implantação no
  ambiente de teste funciona com zero funcionalidade. O dono abriu a URL e viu a tela vazia.
- **Quem decide**: o agente executa; o dono aprova visualmente.
- **Falha que evita**: descobrir a implantação um mês depois do arranque e pagar cinco pendências
  seguidas para que funcione, com funcionalidade em jogo [Ref. 32](REFERENCIAS.md#ref-32).
- **Contrato**: `peldanos/peldano-04-esqueleto.md`.

### Passo 5 — O plano são as pendências

Aqui há uma ideia que, quando você a pega, não solta mais: não há "plano" de um lado e "lista de
tarefas" do outro. **A lista de pendências É o plano.** E cada pendência diz como se verifica,
porque isso é o que você vai olhar em vez de olhar o código.

- **Intenção**: uma única fila de trabalho, com ordem e com comporta, que seja a verdade do
  projeto.
- **Quando**: cria-se ao abrir o primeiro bloco funcional, assim que termina o arranque; usa-se
  em cada sessão durante todo o projeto. Cada bloco novo começa convertendo o pedido do cliente
  em pendências.
- **Entradas**: o pedido do cliente para o bloco, as auditorias, e os achados dos testes humanos.
- **Artefato**: um registro de pendências numeradas, cada uma com sua **especificação detalhada**
  (ver B.5): o nó da árvore semântica de que pende, a história de origem com as palavras do
  cliente, a descrição, as regras de negócio aplicáveis, os dados, as telas, os casos de borda,
  os critérios de aceitação e como se verifica. E, ao fechar, a **documentação da pendência
  feita**: a evidência, o commit, a data, o que ficou decidido no caminho. As pendências fechadas
  são o histórico funcional do sistema.
- **Comporta**: nenhuma mudança entra sem pendência especificada; e a pendência se fecha com
  evidência documentada, não com "pronto".
- **Quem decide**: o dono prioriza; o agente propõe e executa em ordem.
- **Falha que evita**: a especificação que "é superada" e fica obsoleta em duas semanas
  [Ref. 17](REFERENCIAS.md#ref-17); e o trabalho do qual seis meses depois ninguém sabe por que
  foi feito [Ref. 7](REFERENCIAS.md#ref-7).
- **Contrato**: `peldanos/peldano-05-pendientes.md`.

### Passo 6 — As decisões se escrevem junto ao código

O modelo, quando encontra um buraco nas regras de negócio, o preenche. Não para para perguntar;
completa com o que lhe parece mais provável, com a mesma naturalidade com que escreve o resto. Por
isso este degrau não é "escreva as decisões" mas "exija que ele pare e pergunte quando faltar
uma", e quando você decide, a decisão fica com as suas palavras, o seu nome e a data.

- **Intenção**: que cada regra de domínio ou decisão estrutural tenha dono, data e lugar.
- **Quando**: em cada sessão do ciclo, cada vez que o agente topa com uma regra não escrita.
  Costumam ser duas ou três por bloco funcional. Também no arranque (degraus 0 e 3) e na saída
  para produção (12 e 13).
- **Entradas**: a conversa com o dono. É o único insumo.
- **Artefato**: a decisão escrita no commit e num registro de decisões, com as palavras textuais.
  Se o dono não respondeu e o agente teve que escolher, fica marcada como "decisão por omissão"
  para revisá-la.
- **Comporta**: uma regra de negócio não entra no código sem sua frase de origem.
- **Quem decide**: o dono. Sempre. Sem exceções.
- **Falha que evita**: discutir seis semanas depois por que algo é assim; e, pior, o agente
  inventando regras de domínio porque lhe pareceram razoáveis. A prática de escrever a regra no
  commit com data e dono vem do Plano de Saúde [Ref. 29](REFERENCIAS.md#ref-29), e a de congelar
  decisões antes de construir, da minha ferramenta [Ref. 5](REFERENCIAS.md#ref-5).
- **Contrato**: `peldanos/peldano-06-decisiones.md`.

### Passo 7 — Testes como cadeados, provados em vermelho

Um teste que você nunca viu falhar, você não sabe se prova algo. Por isso aqui a regra não é
"escreva testes"; é "demonstre que o teste fica em vermelho contra o código antigo, depois em
verde, e depois que a regressão continua em verde". E os testes de ponta a ponta, desde a tela
até o backend, são os que substituem a sua leitura do código.

- **Intenção**: que cada comportamento que importa tenha um teste que FALHA se quebra, e que se
  saiba com certeza que falha.
- **Quando**: com cada pendência do ciclo, ao fechá-la. O teste de ponta a ponta do fluxo tocado,
  no mesmo fechamento. A bateria completa de ponta a ponta, no fechamento de cada bloco e antes
  de cada implantação em produção.
- **Entradas**: a mudança já implementada e a pendência com seu "como se verifica".
- **Artefato**: o teste novo, a saída em vermelho e em verde com números, a regressão das vizinhas
  na mesma sessão, e o commit que diz contra o que se provou em vermelho.
- **Comporta**: vermelho demonstrado, verde, regressão em verde. E o agente não simula justamente
  a parte que quer provar.
- **Quem decide**: o agente executa e relata; o dono lê o relatório, não o teste.
- **Falha que evita**: os testes que passam porque não provam nada, e o verde que esconde um bug
  [Ref. 44](REFERENCIAS.md#ref-44). O caso dos contadores é o exemplo completo de um teste provado
  em vermelho contra o critério antigo [Ref. 26](REFERENCIAS.md#ref-26).
- **Contrato**: `peldanos/peldano-07-tests-en-rojo.md`.

### Passo 8 — Simetria entre produtor e consumidor, e o registro de antipadrões

Quando você muda uma ponta (o servidor, o banco, um robô), a outra ponta (a tela, um contador, um
relatório) tem que mudar no mesmo commit. O princípio que sustenta isso é que **toda lista tem um
único dono**. E os erros que você já pagou uma vez se anotam com sua verificação automática, para
não pagá-los duas vezes.

- **Intenção**: que uma mudança numa ponta arraste a outra, sempre, no mesmo commit.
- **Quando**: com cada pendência que toca um contrato entre duas partes do sistema; o mapa de
  contratos se constrói ao abrir o segundo bloco funcional, quando já há tela e servidor; o
  registro de antipadrões cresce cada vez que algo quebra pela segunda vez.
- **Entradas**: o mapa de quem produz e quem consome cada contrato; o registro de antipadrões.
- **Artefato**: o servidor define a lista e o consumidor a lê; o mapa produtor/consumidor; o
  registro de antipadrões com cheiro, causa raiz, correção e detecção precoce.
- **Comporta**: automática: o agente procura o outro lado antes de dar uma mudança por fechada.
- **Quem decide**: ninguém; é automático.
- **Falha que evita**: o contador que não coincide com a consulta [Ref. 26](REFERENCIAS.md#ref-26);
  duas cópias do mesmo módulo que se dessincronizam [Ref. 41](REFERENCIAS.md#ref-41). A solução
  de uma única fonte, eu a impus no Plano de Saúde [Ref. 27](REFERENCIAS.md#ref-27).
- **Contrato**: `peldanos/peldano-08-simetria-y-antipatrones.md`.

### Passo 9 — Medir antes de construir, com um instrumento que também se verifica

Este é, para mim, o degrau mais adulto de todos, e o que mais demorei a formalizar porque dava
por certo que um modelo o aplicaria sozinho. Não aplica. A regra é: nenhum número que decide algo
sai de uma impressão; sai de um medidor que vive no repositório, que tem um teste, e que você pode
rodar. E o medidor também se verifica, porque os medidores mentem.

- **Intenção**: que todo número que alimenta uma decisão saia de um instrumento com teste, e que
  o próprio instrumento seja auditado.
- **Quando**: no ciclo, cada vez que uma pendência depende de um número ou de uma hipótese de
  causa, ANTES de construir. No arranque, o dimensionamento é o primeiro caso. Num projeto
  pequeno, "medir" é contar com um comando e anotar o número com a data.
- **Entradas**: a hipótese, do dono ou do agente, e acesso ao que se quer medir.
- **Artefato**: o medidor com guarda no repositório; o número com seu comando e sua data; a
  auditoria em duas direções; o aproximado marcado; e, se corresponder, um orçamento por caminho
  apertado ao medido e protegido por um teste.
- **Comporta**: as cinco regras: medidor com guarda; se o instrumento não existe, constrói-se;
  audita-se em duas direções; o aproximado se marca; e quem executa verifica os números de quem
  planejou.
- **Quem decide**: o número. O dono traz a hipótese; o agente a mede antes de construir.
- **Falha que evita**: os medidores que mentiam e o plano com três de quatro números errados
  [Ref. 36](REFERENCIAS.md#ref-36); a catraca em zero que não via 84 chamadas
  [Ref. 35](REFERENCIAS.md#ref-35). As regras, eu as escrevi, em sessão, antes de que fossem
  doutrina [Ref. 45](REFERENCIAS.md#ref-45).
- **Contrato**: `peldanos/peldano-09-medir.md`.

### Passo 10 — Verificação honesta e relatório proporcional

Se você não vai ler código, o relatório do agente tem que ser confiável, e isso não acontece
sozinho. O modelo foi treinado para ser útil e completo, e um relatório que diz "isto não consegui
verificar" parece menos útil do que um que diz "pronto". Então exija explicitamente as más
notícias, os pontos cegos e o que ele não fez.

- **Intenção**: que o relatório do agente seja confiável sem que o dono leia código.
- **Quando**: em cada relatório, de cada pendência, durante todo o projeto. É a forma que tem que
  ter tudo o que o agente lhe diz.
- **Entradas**: o trabalho feito e a pendência que o pedia.
- **Artefato**: um relatório com três blocos: verificado (com a prova ao lado), acreditado (e por
  que não foi testado), pontos cegos (o que ele não consegue ver de onde está). Cobre cada item
  pedido. As más notícias primeiro.
- **Comporta**: nenhuma afirmação sem sua prova. "Pronto" não se diz seco. Diante de um
  "continua quebrado", primeiro se compara a versão publicada com a que tem a correção.
- **Quem decide**: o dono confia, ou pede a prova. Nunca revisa código.
- **Falha que evita**: o erro relatado como sucesso e os relatórios que declaravam verificado o
  que não estava [Ref. 43](REFERENCIAS.md#ref-43); o turno que trabalhou invisível uma hora e
  quarenta e três [Ref. 16](REFERENCIAS.md#ref-16). A regra de honestidade de verificação, eu a
  escrevi em junho [Ref. 8](REFERENCIAS.md#ref-8).
- **Contrato**: `peldanos/peldano-10-verificacion-honesta.md`.

### Passo 11 — A auditoria periódica como insumo do plano

De vez em quando há que olhar o sistema inteiro com olhos frescos, e o que se vê não vai para um
relatório que se arquiva: vai para a fila de pendências. A parte importante é "olhos frescos":
que audite alguém que não construiu, porque quem construiu compartilha seus próprios
pressupostos. Basta outra sessão do modelo, com outro arquivo de instruções.

- **Intenção**: olhar o sistema completo de vez em quando e converter o que se vê em pendências.
- **Quando**: obrigatória antes da primeira implantação em produção (abre a fase de saída). Em
  operação, a cada um ou dois meses segundo o ritmo de mudança, e no fechamento de cada etapa
  grande.
- **Entradas**: o repositório inteiro e a produção em somente leitura.
- **Artefato**: um relatório com achados graduados, cada um com localização, risco, evidência e
  prioridade; notas por dimensão; e os achados urgentes já convertidos em pendências.
- **Comporta**: cada achado urgente tem uma pendência aberta antes de dar a auditoria por
  fechada.
- **Quem decide**: o dono prioriza os achados.
- **Falha que evita**: consultas que leem tabelas inteiras [Ref. 18](REFERENCIAS.md#ref-18); duas
  portas de administrador que ninguém viu até que outro as olhou
  [Ref. 40](REFERENCIAS.md#ref-40); uma vulnerabilidade conhecida e um componente enorme
  [Ref. 41](REFERENCIAS.md#ref-41).
- **Contrato**: `peldanos/peldano-11-auditoria.md`.

### Passo 12 — Fail-closed, cadeados e zero dano silencioso

Diante da dúvida ou da falha, o sistema NÃO age. E o diz. Soa óbvio, mas é o contrário do que o
software faz por padrão, que diante da dúvida segue em frente. Este degrau vai **antes** de
construir as funcionalidades que agem sobre o mundo, não depois.

- **Intenção**: que o sistema, diante de uma dúvida ou de uma falha, não aja, e avise.
- **Quando**: na fase de saída para produção, antes de construir qualquer funcionalidade que
  cobre, envie, aprove ou apague; revisa-se com cada ação nova com consequências. As automações
  novas começam em modo de ensaio e se habilitam depois de olhar seu registro por uns dias.
- **Entradas**: o levantamento das ações com consequência, feito com o dono.
- **Artefato**: a tabela de cadeados: cada ação com sua reversibilidade, seu cadeado, seu caminho
  de volta; um teste por cadeado provado em vermelho; as automações novas em modo de ensaio.
- **Comporta**: toda ação irreversível tem cadeado e caminho de volta documentado.
- **Quem decide**: o dono aprova cadeado por cadeado; o sistema nunca os pula.
- **Falha que evita**: uma dupla cobrança, uma aprovação automática sem passar por um humano, o
  apagamento de dados do cliente. Os cadeados do Plano de Saúde são o modelo
  [Ref. 28](REFERENCIAS.md#ref-28); o reflexo de não quebrar a listagem inteira, também
  [Ref. 25](REFERENCIAS.md#ref-25).
- **Contrato**: `peldanos/peldano-12-fail-closed.md`.

### Passo 13 — Integração contínua, ambientes, segredos e implantação como parte do produto

Chegar à produção tem que ser um pacote reproduzível: os testes rodam UMA vez, a implantação só
empacota e sobe, a configuração vive no servidor e não no repositório, e o caminho de volta está
provado. Boa parte disto já existe desde o esqueleto; este degrau o completa rumo à produção.

- **Intenção**: que chegar à produção seja um pacote reproduzível, com os testes rodados uma
  única vez e a configuração fora do repositório.
- **Quando**: a cadeia de integração e a implantação no ambiente de teste se montam no degrau 4.
  O fechamento rumo à produção — ambiente real, segredos, promoção, caminho de volta provado,
  cadeado contra segredos — se faz na fase de saída, depois da auditoria e dos cadeados. A rotina
  de cada implantação se aplica em toda a operação.
- **Entradas**: o levantamento de ambientes e acessos; o esqueleto com sua integração.
- **Artefato**: a integração contínua que roda a bateria uma vez por commit; a implantação que
  espera esse resultado e só empacota; a configuração só no servidor; o procedimento de promoção
  escrito e repetível; o caminho de volta provado; a verificação que impede subir um segredo.
- **Comporta**: teste em verde com a mesma versão antes de tocar na produção; caminho de volta
  provado; nenhum segredo no repositório nem no chat sem rotacionar.
- **Quem decide**: o dono promove para produção; o agente prepara tudo.
- **Falha que evita**: testes rodados três vezes por commit e a cota queimada
  [Ref. 39](REFERENCIAS.md#ref-39); a implantação endurecida a golpes de pendências por tê-la
  descoberto tarde [Ref. 32](REFERENCIAS.md#ref-32); segredos colados no chat
  [Ref. 42](REFERENCIAS.md#ref-42).
- **Contrato**: `peldanos/peldano-13-ci-entornos-secretos-deploy.md`.

### Passo 14 — Documentação viva e manuais que uma pessoa pode seguir sem IA

O sistema tem que poder ser usado, mantido e recuperado sem o agente e sem você. Se no dia em
que não há agente não se pode implantar, não está terminado. E como regenerar documentação com um
modelo é grátis, a regra passa a ser "no mesmo commit".

- **Intenção**: que o sistema possa ser usado, mantido e recuperado sem o agente e sem o
  construtor.
- **Quando**: o manual de usuário cresce com cada bloco funcional, no fechamento, com as telas
  novas. Os três manuais completos se geram na fase de saída para produção, depois do 13, e o
  teste com uma pessoa que não programa se faz antes da primeira implantação. A rotina do mesmo
  commit rege durante toda a operação.
- **Entradas**: o sistema rodando no ambiente de teste; os artefatos do 12 e do 13.
- **Artefato**: o manual de usuário com capturas reais, o de manutenção, e o de infraestrutura e
  recuperação escrito para uma pessoa que tem que fazê-lo à mão às três da manhã; cada um com data
  e versão.
- **Comporta**: a documentação está em dia no mesmo commit; alguém que não programa seguiu o
  manual de recuperação.
- **Quem decide**: o agente mantém; o dono lê o manual, não o código.
- **Falha que evita**: o documento desatualizado que provocou um commit no repositório errado; o
  arquivo de projeto convertido em histórico [Ref. 41](REFERENCIAS.md#ref-41). Os manuais
  reproduzíveis à mão são os do Plano de Saúde [Ref. 24](REFERENCIAS.md#ref-24).
- **Contrato**: `peldanos/peldano-14-documentacion-viva.md`.

### Passo 15 — O agente dentro do sistema, e a retrospectiva com número

O último degrau tem duas partes que fecham o mesmo ciclo. Primeiro: o agente fica residente em
produção, com escopo delimitado, agindo em nome de uma pessoa. Segundo: o próprio método se
revisa com números, e o que se aprende volta ao degrau 0 para o próximo projeto.

- **Intenção**: que o agente fique residente em produção com escopo delimitado, e que o método se
  revise com números.
- **Quando**: o agente residente, ao entrar em operação, depois da primeira implantação em
  produção. A retrospectiva, no fechamento de cada etapa e do projeto; é obrigatória mesmo que
  seja de uma página.
- **Entradas**: o sistema em produção, os incidentes, os custos.
- **Artefato**: o documento do agente residente com seu mapa do sistema, seu escopo, sua
  credencial em nome de uma pessoa e a prova de que o que está fora do escopo é recusado; e a
  retrospectiva com números com fonte, cada incidente mapeado a um degrau, e pelo menos uma
  proposta concreta de mudança à escada.
- **Comporta**: o agente não pode fazer o que o dono não aprovou; a retrospectiva produz pelo
  menos uma mudança à escada.
- **Quem decide**: o dono.
- **Falha que evita**: o agente que opera sem mapa; e o método que se repete igual projeto após
  projeto sem aprender. A retrospectiva com número que matou a equipe multiagente é o modelo
  [Ref. 6](REFERENCIAS.md#ref-6); o agente residente, o do Plano de Saúde
  [Ref. 13](REFERENCIAS.md#ref-13).
- **Contrato**: `peldanos/peldano-15-agente-residente-y-retrospectiva.md`.

---

## Parte D — Como se executa, quanto se exige, e com que ferramenta

### Como se executa cada degrau: o contrato

A ficha de oito partes diz o que cada degrau busca, quando se sobe e o que deixa. Mas um degrau
se entende cabalmente só quando se vê **como se pede, o que tem que voltar e como sei que voltou
completo**. Por isso cada degrau tem, além da ficha, um **contrato** num arquivo próprio dentro de
`peldanos/`, sempre com as mesmas cinco seções:

1. **Contexto necessário**, nomeado de forma genérica ("levantamento de dados de volumetria",
   "acesso de leitura ao sistema anterior", "a lista de ações com consequência real"), sem descer
   ao detalhe da engenharia de sistemas. Os levantamentos são por natureza incompletos; não tento
   torná-los completos com um formulário.
2. **Prompts**, os que se dão ao modelo, textuais. O inicial e, quando o degrau é uma conversa, o
   de fechamento. Todos levam a mesma cláusula, que é o coração do assunto: *o modelo avalia se o
   contexto basta; se não basta, pede tudo o que falta antes de seguir; e não estima nem inventa
   um dado que só o negócio tem*. Quem sabe o que lhe falta para calcular é o modelo, não um
   formulário. E cada prompt vem precedido de um bloco que diz **"Antes de enviar o prompt"**:
   os arquivos e os insumos que você (ou o negócio com você) tem que ter construído antes de
   colá-lo, com o seu nome, o seu conteúdo e o seu estado mínimo aceitável. O prompt os nomeia, o
   bloco lhe diz como têm que estar feitos; sem esse bloco, o prompt menciona arquivos que
   ninguém lhe disse como escrever.
3. **Resultado esperado**: as características detalhadas do artefato.
4. **Verificação de completude**: a lista de comprovações que o dono faz sobre o artefato, **sem
   ler código**. Se uma dá "não", o degrau não foi subido.
5. **Sinais de alerta**: dois ou três sintomas de que o degrau foi subido mal embora pareça
   subido.

E no cabeçalho de cada contrato: a fase, o quando, a forma e o tamanho (se é obrigatório em todo
projeto ou proporcional).

**Os prompts estão em inglês, e cada um traz sua tradução.** É uma decisão que tomei por três
razões: o mesmo conteúdo em espanhol ocupa entre 30 e 50 % mais tokens; a capacidade de seguir
instruções dos modelos está mais bem calibrada em inglês, de modo que um prompt em inglês tolera
melhor a brevidade sem se tornar ambíguo; e o vocabulário do ofício (test, commit, rollback, mock)
é inglês. Mas não quero que o inglês seja uma barreira para ler o método: abaixo de cada prompt
vai a explicação do que estou pedindo e por que cada cláusula está ali, e na versão HTML há um
botão que mostra o prompt traduzido ao idioma do documento. O prompt que se cola ao modelo é o
inglês; a tradução é para que você o entenda. E todos terminam com "Reply in my language", porque
o prompt está em inglês mas a conversa não precisa estar.

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
| Definição do projeto (P2) | `CLAUDE.md` + `docs/STATUS.md` | igual, em regras e docs | igual | `PROJECT.md` + arquivo de contexto |
| Registro de pendências (P5) | `docs/PENDING.md` ou issues | igual | igual | registro de pendências nativo com verbos |
| Prompts de degrau (todos) | colam-se no chat ao subir o degrau | igual | igual | injetam-se ao cruzar a comporta |
| Comportas (P4) | `docs/GATES.md`, manual | igual | igual | G1 a G9, automáticas |
| Medidores e orçamentos (P9) | scripts no repo com teste | igual | igual | igual, mais a catraca estática |

A coluna do Forge é a que mais automatiza; as outras três funcionam igualmente bem se o dono faz à
mão o que o Forge faz sozinho: colar o prompt do degrau no momento certo e exigir a verificação de
completude antes de passar ao seguinte. Essa é, de fato, a prática do curso.

---

## Parte E — O que falta elaborar

1. **O degrau 0 completo**: os pesos dos critérios que ponderam, o limiar, e mais projetos
   recusados como contraexemplos. Tenho X1 e X2; falta o resto.
2. **Um nome memorável para cada degrau**, numa frase, para os manuais e as publicações.
3. **A exportação ao Forge**: que degraus já são comportas ou comandos e quais faltam para poder
   rodar a escada como fluxo de execução.
4. **Provar os contratos num projeto real de ponta a ponta.** Os dezesseis prompts estão escritos
   a partir do que fiz, não executados tal como estão. O primeiro projeto que os usar completos
   vai corrigir vários; faz parte do degrau 15.
5. **A primeira turma do curso**, que vai corrigir os tempos da linha do tempo e os erros típicos,
   que hoje estão escritos a partir dos meus projetos e não de alunos.
6. **O que NÃO está na escada e deveria estar** `[hipótese]`: a gestão do custo de tokens e cotas
   como orçamento explícito (hoje é reativa); a rotação de segredos como rotina e não como
   incidente; e um critério para quando o humano SIM tem que olhar o código, porque hoje a
   resposta é "nunca" e suspeito que há momentos pontuais em que convém.

---

## Glossário

Cada sigla, cada nome próprio e cada expressão coloquial que aparece neste documento, explicada.
Em ordem alfabética. Algumas entradas são termos que aparecem em nomes de arquivo ou mensagens de
commit dos repositórios de origem; mantenho-as para que a evidência possa ser seguida.

**Agente** — Um programa de inteligência artificial que não só responde perguntas mas executa
ações: lê arquivos, escreve código, roda comandos, faz commits. Neste documento, "o agente" é o
Claude Code ou a ferramenta que você usar.

**Ambiente** — Uma instalação separada do sistema. Os habituais: desenvolvimento (a máquina do
programador), UAT (teste do cliente) e PROD (produção, o de verdade).

**Anonimização** — Neste documento os clientes reais se chamam "o Plano de Saúde", "o
Autorizador" e "a Associação", e seus sistemas "Autorizaciones" e "Kikan". É de propósito: os
nomes ficam reservados até que eu tenha permissão para usá-los.

**Antipadrão** — Uma forma de fazer as coisas que parece razoável mas que se sabe que termina
mal. O contrário de um "padrão" (uma boa prática comprovada).

**Apertar o teto** — Baixar um limite (um orçamento, um máximo permitido) até que fique logo
acima do medido, para que qualquer piora faça falhar um teste.

**Aprovador automático** — Em Autorizaciones, o robô que aprova ordens automaticamente segundo
regras. Primeiro rodou em "modo de ensaio" (ver dry-run) antes de deixá-lo agir.

**Artefato** — Algo concreto que se produz: um arquivo, um teste, um script, um documento. Na
escada, cada degrau deixa um artefato.

**Árvore semântica** — O mapa do sistema em forma de árvore: o sistema na raiz; abaixo, os
domínios; abaixo, atores, processos, entidades com seus estados, telas e integrações; e de cada
nó pendem as pendências e as decisões que o tocam. O agente a constrói, você a corrige, e é o que
o agente lê antes de tocar em código. Ver B.5.

**Assíncrono / síncrono (async / sync)** — Uma chamada síncrona espera o resultado antes de
seguir; uma assíncrona deixa a tarefa andando e segue, e depois recolhe o resultado. Os bancos de
dados reais em Node são assíncronos; por isso a interface tem que ser desde o começo.

**Associação (a)** — Assim chamo neste documento o cliente do sistema Kikan (seu nome real fica
reservado): uma associação civil que atende famílias e precisava de uma mesa de atendimento
omnicanal e campanhas.

**AUD-*** — A série de auditorias numeradas que se fizeram no Kikan em agosto, e que geraram
pendências.

**Autorizador (o)** — Assim chamo o sistema do Plano de Saúde que recebe as ordens e devolve um
veredito (aprovada, rejeitada). Para nós funciona como "oráculo": a verdade contra a qual se
verificam os contadores.

**Autorizaciones** — Nome com que chamo o primeiro sistema em produção (o real fica reservado):
automação da gestão de ordens do Plano de Saúde para uma entidade de saúde, com um humano no
circuito.

**await** — Em JavaScript, a palavra que indica "espere o resultado desta chamada assíncrona".
Uma chamada ao banco sem `await` é um bug silencioso: o código segue antes de ter o dado.

**Backend** — A parte do sistema que não se vê: o servidor, a lógica, o banco de dados. O
contrário de "frontend" (a tela).

**Bateria (de testes)** — O conjunto completo de testes de um projeto, rodado todo junto.

**Bloco funcional** — Um conjunto de entre quatro e oito pendências relacionadas que juntas fazem
algo que o negócio pode usar. É a unidade de trabalho do ciclo; dura entre uma e duas semanas num
projeto pequeno.

**Cadeado** — Uma proteção que impede que uma ação perigosa ocorra sem uma condição explícita.
Por exemplo, o botão de pânico tem um cadeado dedicado: não pode ser apertado por acidente.

**Catraca** — Um mecanismo que só gira para um lado. No Kikan, um contador de chamadas sem
`await` que só pode descer: se sobe, o teste falha.

**Causa raiz** — O motivo real de um problema, em oposição ao sintoma. Corrigir o sintoma faz o
problema voltar; corrigir a causa raiz, não.

**CI (integração contínua)** — Um serviço (aqui, o GitHub Actions) que roda os testes
automaticamente cada vez que se sobe código. CI/CD acrescenta a implantação automática.

**CLAUDE.md / PROJECT.md** — O arquivo que o agente lê ao começar cada sessão para saber o que é
o projeto e como trabalhar nele.

**Claude Code** — A ferramenta da Anthropic com que trabalhei estes projetos e com que escrevi
este documento: uma sessão de um modelo com acesso ao repositório, que lê, escreve, executa e faz
commits.

**Cofre (vault)** — Um lugar cifrado onde se guardam segredos (chaves, senhas) em vez de
deixá-los em arquivos de texto.

**Commit** — Um ponto salvo na história do código, com uma mensagem que explica o que mudou e por
quê. Cada commit tem um identificador curto (por exemplo `2219f7a`).

**Comporta (gate)** — Uma condição que tem que ser cumprida para poder avançar. Se não se cumpre,
não se passa. No Forge estão numeradas G1 a G9.

**Concorrência** — Quantas coisas acontecem ao mesmo tempo no sistema (usuários simultâneos,
processos em paralelo).

**CORS** — Um mecanismo de segurança dos navegadores que decide de que domínios se pode chamar
um servidor. Mal configurado, bloqueia chamadas legítimas com erros confusos.

**Critérios de aceitação** — As condições, escritas na forma "dada tal situação, quando acontece
tal coisa, então se vê tal resultado", que definem quando um requisito está cumprido. No método
são o "como se verifica" de cada pendência e o roteiro do teste de ponta a ponta.

**CVE** — Um identificador público de uma vulnerabilidade de segurança conhecida num componente
de software.

**Dívida técnica** — O que fica mal feito "para arrumar depois". O método a proíbe: o que quebra
se conserta na raiz na mesma sessão.

**Doutrina** — No Forge, um documento curto que fixa como se faz algo (como se testa, como se
verifica, como se dimensiona). É a forma que o método toma dentro da ferramenta.

**Driver (critério)** — Um fator que empurra uma decisão para um lado ou para outro. No degrau
0, os drivers são os fatores que decidem se um projeto é elegível.

**Dry-run (modo de ensaio)** — Rodar um processo "a seco": faz tudo menos a ação final. O
aprovador automático rodou assim no começo, mostrando o que teria aprovado sem aprovar nada.

**Embarcado (embed)** — O Forge instalado dentro do sistema do cliente, como assistente
residente, com permissões delimitadas.

**End to end (E2E, de ponta a ponta)** — Testar o sistema completo, desde a tela até o banco de
dados, como uma pessoa o usaria.

**Especificação de requisitos** — No método clássico, um documento longo que descrevia tudo o que
o sistema devia fazer. Neste método se decompõe: cada pendência leva sua especificação detalhada
completa, e a soma das pendências é a especificação do sistema. Ver B.5.

**Esqueleto (scaffold)** — A estrutura inicial de um projeto, sem funcionalidade: arranca, tem
testes vazios, se implanta.

**Fail-closed** — "Falha fechado": diante da dúvida ou do erro, o sistema não age. O contrário de
"fail-open", que diante da dúvida segue em frente.

**Fallback (ao legado)** — Voltar a um caminho antigo quando o novo falha. O método o proíbe: se
há sistema antigo, audita-se e migra-se; não se deixa como rede de segurança silenciosa.

**Fase (da escada)** — Cada um dos três grupos de degraus: arranque (0 a 4), ciclo (5 a 10),
operação (11 a 15).

**Fixture** — Dados de teste que se carregam antes de rodar um teste ou uma implantação.

**Flip (interruptor)** — Uma mudança de configuração que escolhe entre dois caminhos (por
exemplo, o motor antigo ou o novo) sem tocar em código.

**Forge (Yujin Forge)** — A ferramenta que construí: uma camada sobre o Claude Code que lhe
acrescenta o método (doutrinas, comportas, pendências, um painel de chat, um app móvel, e o modo
embarcado).

**Frontend** — A parte visível do sistema: as telas.

**Full scan** — Uma consulta ao banco de dados que lê a tabela inteira porque não tem um índice
que a ajude. Com tabelas pequenas não se nota; com milhões de linhas, derruba o sistema.

**G-DOC** — No Forge, a comporta que exige que a documentação se atualize no mesmo commit que a
mudança.

**gate-ci** — O trabalho da implantação do Kikan que espera que a integração contínua termine em
verde antes de empacotar.

**GCP** — Google Cloud Platform, a nuvem onde rodam os servidores dos dois sistemas da
Associação.

**GOTCHAS** — Um arquivo que registra "armadilhas" conhecidas: erros que já pagamos uma vez, com
seu cheiro, sua causa raiz, sua correção e como detectá-los antes.

**Greenfield / brownfield** — Um projeto novo do zero (greenfield, "campo verde") contra um que
parte de algo existente (brownfield, "campo usado").

**Grep** — Um comando que busca texto em arquivos. "Medidor, não grep" significa: um número
importante não se tira contando com uma busca de texto, mas com um programa com teste.

**Heap** — A memória que um programa usa. "A bateria morria por heap" quer dizer que os testes
ficavam sem memória e parecia que falhavam.

**HITL (human in the loop, humano no circuito)** — Um desenho onde uma pessoa aprova antes de o
sistema agir. Em Autorizaciones, o aprovador manual.

**Índice** — Uma estrutura auxiliar do banco de dados que torna rápida uma busca. Sem índice, a
consulta é um full scan.

**Ingestão de requisitos** — O momento em que o pedido do negócio entra no método: primeiro em
prosa, com o dono, e depois convertido em pendências verificáveis pelo agente, que pergunta o que
falta.

**IPC (correia entre processos)** — Um canal entre dois processos. No Forge foi usado como
"correia": se o processo pai morre, o filho fica sabendo e se desliga.

**JSON (armazenamento em)** — Guardar os dados em arquivos de texto com formato JSON em vez de
num banco de dados. Serve para começar; não serve para milhões de linhas.

**Kikan** — O sistema de mesa de atendimento omnicanal e campanhas da Associação, o segundo
sistema em produção.

**Legado (legacy)** — Um sistema antigo que continua em uso.

**Linha do tempo** — A Parte B deste documento: quando se sobe cada degrau e que tarefas de
infraestrutura, ingestão, desenvolvimento, testes e olhar humano acontecem no meio.

**Log** — O registro do que um programa vai fazendo. "Valide com o log" significa: não confie no
que o agente diz que fez, olhe o registro.

**MariaDB** — O motor de banco de dados SQL que o Kikan usa em produção.

**Medidor com guarda** — Um script que mede algo (quantas consultas, quantos laços) e que tem um
teste próprio que verifica que o medidor mede bem. "Com guarda" quer dizer "protegido por um
teste".

**Mentir (um medidor)** — Quando um instrumento devolve um número errado porque não vê parte do
que tem que medir. Aconteceu conosco duas vezes.

**Mês três** — Expressão minha para o momento em que um sistema construído às pressas começa a
mostrar seus problemas: quando já tem dados de verdade e usuários de verdade.

**Mock (simular)** — Substituir uma parte real do sistema por uma simulação durante um teste.
"Não mockar a si mesmo" significa não simular justamente a parte que se quer testar.

**NAC3** — O protocolo do Forge que faz com que as telas de uma aplicação possam ser operadas por
programa (cada elemento da interface tem um identificador e métodos). Permite o teste de ponta a
ponta. Não é obrigatório para o método: é o meio, não a condição.

**Na marra** — Aprender algo porque saiu mal, não porque alguém explicou antes. Uso no sentido de
"estas regras se aprenderam na marra", e neste documento esclareço que não é toda a verdade: os
princípios eu trazia de antes; os tropeços mostraram onde o modelo não os aplica.

**Node (Node 22)** — O ambiente onde roda o JavaScript do servidor. "Node 22 fixo" quer dizer
que se cravou a versão para que todos os ambientes usem a mesma.

**Oráculo** — Uma fonte de verdade externa contra a qual se pode verificar um resultado.

**Orçamento de consultas** — O máximo de consultas ao banco que um caminho da aplicação pode
fazer, medido e protegido por um teste.

**Órfão (turno órfão)** — Um processo que continua rodando quando quem o lançou já lhe perdeu o
rastro.

**P0, P1, P2** — Níveis de prioridade de um achado: P0 é o que há que resolver já.

**Pendência fechada (documentação do feito)** — Uma pendência que ao fechar conserva sua
especificação, a decisão que a originou, a evidência com que se fechou, o commit e a data. A fila
de pendências fechadas é o histórico funcional do sistema.

**Piloto automático** — Um mandato escrito para que o agente trabalhe sozinho durante horas (24
ou 48) fazendo commits e pushes sem perguntar, e entregue um resumo no final.

**Plano de Saúde (o)** — Assim chamo a entidade de saúde cliente do primeiro sistema em produção
(seu nome real fica reservado).

**Playwright** — Uma ferramenta que controla um navegador por programa para testar telas como uma
pessoa faria.

**PND (pendência)** — Um item numerado da fila de trabalho (PND-001, PND-002…). Neste método, as
pendências SÃO o plano, cada uma leva sua especificação detalhada, e as pendências fechadas são a
documentação do feito.

**PROD (produção)** — O ambiente de verdade, o que o cliente usa.

**Promoção (UAT → PROD)** — Passar algo do ambiente de teste para o de produção de forma
controlada.

**Provado em vermelho** — Um teste do qual se demonstrou que FALHA contra o código antigo antes
de que a correção o ponha em verde.

**Pull / push** — Baixar e subir código ao repositório remoto (GitHub).

**Quadro (o painel)** — O painel compartilhado do Forge onde o agente deixa relatórios para que
eu os leia.

**Rastreabilidade** — Poder seguir um requisito até a pendência que o implementa, o teste que o
prova e o commit que o fechou. No método não é uma matriz à parte: é a própria pendência, que cita
sua origem e sua evidência.

**Ref. N** — Uma referência curta a um caso real, explicado no documento de referências com sua
data e sua evidência. Está para que os procedimentos fiquem limpos e o detalhe continue
disponível.

**Regressão** — Um teste que verifica que algo que já funcionava continua funcionando depois de
uma mudança.

**Repositório (repo)** — O lugar onde vive o código com toda a sua história. "Repo padrão" quer
dizer um manejado com Git e com uma estrutura reconhecível.

**Retenção (retention)** — Quanto tempo se guardam os dados de cada tabela antes de apagá-los.

**Rollback (caminho de volta)** — Voltar à versão anterior quando uma implantação sai mal.

**RPAForce** — A minha marca, sob a qual se entregam estes sistemas.

**Runbook** — Um procedimento operacional escrito passo a passo. "Idempotente" quer dizer que
pode ser rodado duas vezes sem quebrar nada.

**Semeador (seeder)** — Um script que carrega dados de teste num ambiente.

**Shift left** — Mover os testes para mais cedo no processo de desenvolvimento.

**Smell (cheiro)** — Um sinal de que algo anda mal no código, antes de falhar.

**Sobrescrever (uma configuração)** — Escrever por cima de algo por acidente.

**SQ (padrões de qualidade)** — O contrato de convivência entre humano e agente no Forge.

**SQL** — A linguagem dos bancos de dados relacionais.

**Tag** — Uma etiqueta sobre um commit que marca uma versão.

**TDD** — "Primeiro o teste, depois o código". O método o deixa como opção para escopos
pequenos, não como regra universal.

**Testes de aceitação** — Os testes que o dono, ou um usuário de confiança, faz usando o sistema
como o usaria de verdade, antes de aceitá-lo para produção. São humanos; o agente não os faz.

**Token** — Dois sentidos. Em IA: a unidade com que se mede (e se cobra) o texto que o modelo
processa. Em segurança: uma credencial de acesso.

**Turno** — Uma volta da conversa com o agente: o usuário pede, o agente trabalha e responde.

**UAT** — O ambiente onde o cliente testa antes da produção.

**Urazuke** (裏付け) — O nome do método. Em japonês, o respaldo que uma afirmação tem, o que a
sustenta por trás; *urazukeru*, respaldar com provas. Pronuncia-se u-ra-ZU-ke. Não se traduz.

**Vibecoding / vibecoder** — Construir software conversando com uma IA, descrevendo o que se
quer, em vez de escrever o código à mão. Um vibecoder é quem faz isso.

**Vigia** — Em Autorizaciones, o processo que revisa periodicamente o que ficou travado e o
empurra, com guardas para não empurrar duas vezes.

**Vista humana das telas** — O hábito de que o dono olhe uma captura real de cada tela nova ou
mudada, no ambiente de teste, com cada pendência que a toca. Dez segundos que encontram o que
nenhum teste encontra.

**Volumetria** — Quantos dados o sistema vai manejar: linhas por ano, usuários, picos.

**Watchdog (vigia de silêncio)** — Um processo que verifica se outro continua dando sinais de
vida, e o mata se fica calado tempo demais.

**Yujin** — O ecossistema do qual o Forge é o produto comercial.
