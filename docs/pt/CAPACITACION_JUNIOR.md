# Urazuke — o desenvolvedor júnior na era posterior à programação à mão: o que muda na sua formação, com que objetivo capacitá-lo e como

Autor: Pablo Kuschniroff, assistido por Claude Code. Versão 1, 18 de outubro de 2026. Este
documento acompanha o [documento principal](ESCALERA_METODOLOGICA.md) do método e as duas partes
do curso ([projeto novo](MANUAL_CURSO.md), [projeto herdado](MANUAL_CURSO_EVOLUTIVO.md)). Está
escrito para três leitores: quem dirige uma equipe e tem que decidir o que ensina a quem entra;
quem dá aulas ou mentoria; e o próprio júnior, que quer saber em que se transformar. As palavras
estranhas estão no glossário do documento principal. Repositório público:
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke).

## Por que escrevo isto

Durante trinta anos, um desenvolvedor júnior se formou de uma só maneira: escrevendo código sob
supervisão. Entrava sabendo uma linguagem pela metade, davam-lhe tarefas pequenas e delimitadas,
um sênior revisava o seu código, e em dois ou três anos de escrever e ser corrigido aprendia o
ofício. O código era ao mesmo tempo o trabalho e a escola.

Isso acabou, e não porque os juniores já não sejam necessários, mas porque **o modelo escreve o
código**. Com o meu método, quem constrói não lê o código: exige evidência. Então a pergunta que
me fazem, e que eu me faço, é honesta e urgente: se o júnior já não escreve o código, como
aprende? E o que aprende? E para se transformar em quê?

Tenho uma resposta, e a escrevo a partir de dois lugares. Um, os três sistemas que construí
assim, nos quais eu fui o único humano e onde vi, incidente por incidente, que habilidades me
salvaram e quais não me fizeram falta. O outro, os anos de ensinar engenharia de sistemas antes
de os modelos existirem: muito do que hoje é preciso ensinar a um júnior é o que a engenharia de
sistemas clássica sempre ensinou e a indústria deixou de praticar quando o ofício virou
"programar". O modelo nos obriga a voltar ao que era o ofício antes de o teclado o encobrir.

Uma advertência para não me interpretarem mal: não estou dizendo que o júnior não tenha que saber
programar. Estou dizendo que **ele já não se forma programando**, e que o que tem que saber de
programação muda de natureza: de ofício a alfabetização.

## O que um júnior fazia, e o que faz agora

| | Antes | Agora, com o método |
|---|---|---|
| **O que produz** | Código, sob supervisão. | Evidência: contratos, árvores semânticas, pendências especificadas, verificações de completude, decisões escritas. O código quem produz é o modelo. |
| **Como aprende** | Escrevendo e recebendo correções sobre o código. | Dirigindo o modelo degrau por degrau e recebendo correções sobre a evidência que exigiu e a que aceitou sem exigir. |
| **O que o sênior revisa** | O seu código. | O seu critério: o que pediu ao modelo, o que o modelo supôs sem que ele detectasse, o que aceitou como "pronto" sem prova. |
| **Qual é o seu erro típico** | Um bug. | Acreditar no modelo. |
| **Quando é útil** | Quando escreve código que não é preciso reescrever, e isso demora. | Quando termina o seu primeiro projeto pequeno com os vinte e quatro degraus: o método não promete velocidade, promete um sistema operável e um critério formado. |
| **Em que se transforma** | Num programador que sabe mais linguagens e frameworks. | Em alguém que pode responder por um sistema sem ter escrito uma linha: um engenheiro de sistemas que dirige modelos. |

## O impacto nos focos de capacitação

Digo-o primeiro numa frase e depois o desmonto: **o que perde peso é tudo o que o modelo faz
melhor do que um júnior de dois anos, e o que ganha peso é tudo o que o modelo faz mal e que o
método existe para corrigir**. Essa segunda lista eu não inventei: é a lista das falhas do
documento de referências, olhada ao contrário. Cada falha do modelo é uma habilidade que o humano
tem que ter.

### Os focos que perdem peso

- **A sintaxe e as linguagens.** Saber uma linguagem "de cor" era metade da formação. Já não: o
  modelo escreve em qualquer uma, melhor e mais rápido. O que fica é saber *lê-las*, que é outra
  coisa (ver mais abaixo).
- **Os frameworks e as bibliotecas.** Conhecer a API de uma biblioteca era valor de mercado. O
  modelo a conhece inteira, com as suas versões. O júnior tem que saber que existem, para que
  servem e quando escolher uma, não como se chama cada função.
- **A digitação e a produtividade de escrita.** Atalhos do editor, autocompletar, gerar o andaime
  à mão. Desapareceu como foco.
- **A depuração linha por linha como ofício principal.** Continua existindo, mas muda de lugar:
  agora é a última ferramenta, quando a evidência (o log, o teste em vermelho, o medidor) não
  bastou.
- **A memória de "como se faz tal coisa".** Padrões, receitas, truques. O modelo os tem todos.

### Os focos que ganham peso

Ordeno-os pelo degrau onde se exercitam, porque essa é a forma de ensiná-los.

1. **Engenharia de requisitos** (degraus 0, 2, 3, 5). Entrevistar um dono que não sabe o que
   quer, escrever em prosa o que ele quer, nomear casos de uso, montar a árvore semântica do
   negócio, especificar uma pendência com os seus critérios de aceitação na forma "dado, quando,
   então", distinguir um dado primário de um derivado e pedir o primário em vez de estimá-lo. É a
   habilidade número um, e é a que a indústria deixou de ensinar há vinte anos. O modelo é péssimo
   nisto por desenho: completa os vazios com o mais provável, e o mais provável não é o que o
   negócio precisa.
2. **Desenho da verificação** (degraus 8, 7, 12, 19). Não escrever o teste: saber que teste
   demonstra o quê, por que um teste tem que ser visto em vermelho antes de valer, o que é um
   teste de ponta a ponta e o que é uma simulação que não prova nada, que número decide alguma
   coisa e com que instrumento se mede, como se lê um relatório e se distingue o verificado do
   acreditado. O júnior tem que poder dizer "esse teste não prova o que você diz" sem ler o teste.
3. **Leitura de evidência** (todos os degraus). Ler um relatório do modelo com desconfiança
   treinada: encontrar a afirmação sem prova, o "deveria funcionar" disfarçado de verificado, o
   ponto cego não declarado, o "pronto" que não era [Ref. 43](REFERENCIAS.md#ref-43). Esta
   habilidade não existia como foco de formação porque não havia ninguém que mentisse com tanta
   segurança e tão boa redação.
4. **Dimensionamento e operação** (degraus 3, 4, 15, 16 a 22). O que é um ambiente, como se
   implanta, o que é a integração contínua, o que se mede em produção, o que é um índice, um ponto
   de ruptura, um limiar de alerta. Antes era território de outro papel; agora o júnior dirige o
   modelo que o faz, e tem que saber o que pedir e como verificar que ele fez.
5. **Segurança e consequência** (degraus 14, 18). Que ações do sistema agem sobre o mundo, o que
   é um cadeado, o que é fail-closed, o que é uma vulnerabilidade e por que uma atualização de
   dependência é uma mudança.
6. **Decisão e comunicação com o dono** (degraus 1, 6, 20). Perguntar bem, com recomendação e
   alternativa; escrever uma decisão com palavras textuais, data e dono; escrever um manual que
   uma pessoa que não programa possa seguir. O júnior é, no método, o tradutor entre o dono e o
   modelo, e a tradução se faz nos dois sentidos.
7. **Inglês instrumental.** Os prompts do método estão em inglês, porque os modelos seguem
   instruções com mais precisão em inglês. Não é preciso falá-lo; é preciso ler um prompt e
   entender cada cláusula, e poder escrever uma cláusula nova quando o caso pedir.
8. **O catálogo de falhas do modelo.** Reconhecer, pelo seu cheiro, cada forma em que o modelo se
   engana: supõe em vez de perguntar, inventa um dado primário, relata de mais, faz "já que estou
   aqui" fora do escopo, refatora o que não se pediu, melhora as suas palavras, fecha sem
   evidência, fica em silêncio quando não sabe. As quatro correções que fiz em sessão e que
   viraram regras [Ref. 45](REFERENCIAS.md#ref-45) são o exemplo: cada uma é uma falha que um
   júnior formado tem que detectar no primeiro relatório.
9. **Custo como orçamento.** Tokens, cota de integração contínua, tempo do dono. O júnior que não
   olha o custo repete a equipe multiagente que gastava o dobro e entregava a metade
   [Ref. 6](REFERENCIAS.md#ref-6).

### O que o júnior sim tem que saber de programação: alfabetização, não ofício

Aqui está a nuance que mais me importa, e a que mais se interpreta mal. Um júnior que nunca
escreveu código não sabe quando o modelo mente *dentro* do código, e o método tem um momento, que
hoje marco como hipótese no documento principal, em que o humano sim tem que olhar. Por isso a
alfabetização mínima não é negociável. A lista:

- **Ler código**, não escrevê-lo: seguir uma função, entender um condicional, reconhecer um laço,
  ver onde se faz uma consulta ao banco. Como ler um contrato sem ser advogado.
- **Como roda um sistema**: o que é um servidor, um processo, um banco de dados, uma requisição
  HTTP, um navegador, uma tarefa programada. Onde vive cada coisa.
- **Git**: o que é um commit, um ramo, um push, um histórico. O suficiente para ler o rastro de
  evidência que o método deixa ali.
- **SQL básico**: ler uma consulta e entender que tabela ela lê e com que filtro. É o idioma dos
  dados, e dos números do degrau 7.
- **O terminal**: rodar um comando que o modelo lhe deu e ler a sua saída. Se o júnior não
  consegue rodar o medidor, não consegue verificar o número.
- **Depuração como última ferramenta**: quando o log, o teste e o medidor não bastaram, abrir o
  código com o modelo ao lado e ler juntos.

Ensina-se na primeira etapa, pratica-se durante todo o curso, e não é o ofício: é a
alfabetização que permite exercê-lo.

## Com que objetivo capacitar um júnior

Digo-o sem rodeios, porque da clareza do objetivo depende todo o resto. O objetivo de capacitar um
júnior na era posterior à programação à mão é formar alguém que **possa responder por um sistema
em produção sem ter escrito uma linha do seu código**: que possa levar um projeto pequeno pelos
vinte e quatro degraus de ponta a ponta, dirigindo um modelo, exigindo-lhe evidência em cada passo,
decidindo com o dono, e sabendo a todo momento o que está verificado, o que está acreditado e o
que não se vê. Eu o chamo, provisoriamente, de *dono técnico da evidência*: aquele que não lê o
código e, ainda assim, pode dizer, com provas na mão, que o sistema faz o que o negócio pediu e
vai continuar fazendo amanhã.

Três consequências do objetivo, que ordenam a capacitação:

1. **O artefato de avaliação é a evidência, não o código.** Um júnior se avalia pelo contrato que
   escreveu, pela árvore que montou, pela pendência que especificou, pelo vermelho que exigiu,
   pelo relatório que não aceitou. A rubrica do anexo A do manual do curso já o diz: não subido,
   subido, subido com evidência de critério. Esse terceiro nível, poder contar um caso em que o
   modelo se enganou e como o detectou, é o objetivo de verdade.
2. **O reflexo se forma com incidentes, não com teoria.** Ninguém aprende a desconfiar do modelo
   lendo que é preciso desconfiar; aprende quando o modelo lhe diz "pronto" e não era, e ele o
   descobre no ambiente de teste. Por isso o curso tem provas de propósito (deixar uma pergunta
   sem responder e ver o que o modelo faz; deixar suposições no levantamento), e por isso a
   capacitação tem que ter incidentes desenhados, não só tarefas que deem certo.
3. **O júnior se forma no método inteiro, não numa fase.** A tentação é pô-lo "a fazer pendências"
   no ciclo, que é o mais parecido com dar-lhe tarefas pequenas de código. É um erro: o ciclo sem
   o arranque é construir sobre areia, e o júnior que nunca fez um degrau 0 ou um 3 não entende
   por que o 5 tem a forma que tem. Os dois projetos-guia existem para isso: um novo e um herdado,
   de ponta a ponta, os vinte e quatro degraus e as oito estações.

## Como capacitá-lo: o plano

O que segue é o plano que eu usaria, e que vou usar com a primeira turma: quatro etapas, sem
prazos (o método não os tem, e a formação também não: cada etapa termina quando a sua lista de
saída dá "sim"), com um mentor, sobre os dois projetos-guia do curso, e depois um projeto real
pequeno com um dono de verdade.

### Etapa 1: alfabetização e o modelo como objeto de estudo

- A alfabetização de cima: ler código, como roda um sistema, git, SQL básico, o terminal. Com o
  modelo ao lado, explicando; o júnior não escreve, lê e roda.
- **O modelo como objeto de estudo**: um tempo de fazer pedidos ao modelo com o único propósito
  de vê-lo falhar. Pedir-lhe um dado que ele não tem e ver se o inventa. Dar-lhe um pedido ambíguo
  e ver se ele pergunta. Pedir-lhe que feche algo e ver se diz "pronto" sem prova. Pedir-lhe que
  corrija um bug sem reproduzi-lo. Cada falha se anota com o seu cheiro. No fim da etapa o júnior
  tem o seu próprio catálogo, e é o catálogo do documento de referências, descoberto.
- Leitura do documento principal, com o glossário à mão, e das referências: a história de onde sai
  cada regra.

### Etapa 2: o projeto novo, com mentor

O manual do curso, parte 1, tal como está, sobre o projeto-guia "Turnera" ou sobre um projeto
próprio pequeno. Os vinte e quatro degraus. Com três regras de mentoria:

- **O mentor revisa evidência, não código.** Lê o contrato de convivência, a árvore semântica, a
  especificação de três pendências, o relatório de fechamento de uma pendência, o relatório da
  auditoria, o relatório do teste de carga. E faz uma única pergunta de cada vez: "como você sabe
  que isto é verdade?". Se a resposta for "porque o modelo disse", o degrau não está subido.
- **O mentor desenha incidentes.** De vez em quando, sem avisar, altera alguma coisa: muda um
  dado do levantamento, mete uma suposição na volumetria, pede uma mudança fora do escopo através
  do modelo. O júnior tem que detectá-lo pela evidência.
- **O júnior mantém o seu próprio registro de falhas do modelo**: cada vez que o pegou, que cheiro
  tinha, em que degrau. No fim do projeto esse registro é a sua retrospectiva pessoal, e a
  proposta de mudança à escada (degrau 23) quem a escreve é ele.

### Etapa 3: o projeto herdado, com menos mentor

O manual, parte 2: a Turnera herdada, ou um legado real pequeno. A fase de normalização e os dois
primeiros blocos. Aqui a mentoria baixa: o mentor lê o mapa recuperado e as discrepâncias, o
relatório da auditoria com as suas marcas de velocidade, e o fechamento do primeiro bug em modo
corretivo. O objetivo desta etapa é que o júnior aprenda o que o projeto novo não ensina: a ler
um sistema alheio através do modelo, a decidir com o dono o que do que o código faz está errado e
o que era uma regra esquecida, e a não reescrever.

### Etapa 4: o projeto real, sozinho

Um projeto pequeno de verdade, com um dono de verdade que tem quinze minutos por dia, de ponta a
ponta. O mentor não intervém; lê a retrospectiva com números no final. Se o júnior chegar à
produção com as vinte e quatro condições da lista de saída em "sim", está formado. Se não, a lista
diz exatamente que degrau voltar a subir, e isso também é formação.

### O que mede o progresso

Não quantas pendências fechou. Três coisas, nesta ordem:

1. **Quantas vezes pegou o modelo**, e em que degrau. Um júnior que em todo o projeto novo não
   pegou o
   modelo nenhuma vez não está olhando: o modelo falha sempre.
2. **Quanto custou ao dono.** Minutos por dia de perguntas; se sobem, o júnior está transferindo
   ao dono o que o método pede que ele resolva (degrau 1).
3. **A qualidade da sua proposta de mudança à escada.** É o indicador de critério: um júnior que
   propõe uma mudança concreta, justificada com um incidente próprio, entendeu o método como algo
   vivo e não como uma lista.

## O impacto nos papéis e na equipe

Digo-o porque quem dirige uma equipe vai me perguntar. Se o júnior se forma assim, a equipe muda
de forma:

- **O júnior** deixa de ser "o que escreve o fácil" e passa a ser quem leva um projeto pequeno
  inteiro com o método. É mais valioso antes, e é mais perigoso antes, porque dirige um modelo que
  constrói rápido; por isso o método é a condição, não um acréscimo.
- **O sênior** deixa de revisar código e passa a três coisas: escrever e manter os contratos (o de
  convivência, as comportas, os cadeados), auditar com outra sessão (degrau 13) e decidir o que o
  júnior não pode decidir (arquitetura, o "vezes dez", o que bloqueia). O seu valor se move do
  teclado para o critério, que é onde sempre esteve nos bons.
- **A equipe encolhe e se achata.** Um sênior e dois ou três juniores com método levam o que antes
  levava uma equipe de oito. Vi isso nos meus próprios números quando eliminei uma equipe inteira
  de agentes [Ref. 6](REFERENCIAS.md#ref-6): a mesma lógica se aplica aos humanos que dirigem
  modelos.
- **O dono do domínio entra na equipe.** Com quinze minutos por dia, mas entra, porque o método o
  exige. Capacitar um júnior inclui ensiná-lo a conseguir esses quinze minutos e a não gastá-los.

## Os riscos, ditos sem suavizar

- **O júnior que nunca escreveu código e não sabe quando olhar.** É o risco principal, e eu o
  mitigo com a alfabetização obrigatória e com o exercício de depuração como última ferramenta.
  Mas marco-o como hipótese: ainda não sei quanto código é preciso ter escrito para ler bem o que
  outro escreve. Suspeito que pouco, e suspeito que o que importa não é ter escrito e sim ter
  *depurado*.
- **A dependência de uma ferramenta.** O método é neutro em relação à ferramenta de propósito. Um
  júnior formado numa só ferramenta aprende os seus atalhos e não o método; a formação tem que
  passar por pelo menos duas.
- **O custo invisível.** Um júnior com um modelo gasta tokens como se fossem de graça. O orçamento
  de tokens tem que ser parte da formação desde a primeira etapa, com o número à vista.
- **A ilusão de velocidade.** O modelo constrói numa sessão o que antes levava muito mais, e o
  júnior pode acreditar que terminou. A lista de saída para produção, com as suas vinte e quatro
  condições, é o antídoto: "terminado" tem uma definição, e não é "funciona".
- **O mentor que revisa código por costume.** É o risco do lado do sênior, e é sério: um mentor
  que lê o código ensina ao júnior que a evidência não basta, que é exatamente o contrário do
  método. O mentor tem que se formar no método antes do júnior.

## O que falta elaborar `[hipótese]`

1. Quanta programação é preciso ter feito para ler bem o código de outro. A minha intuição é que o
   que importa é ter depurado, não ter escrito, e que basta pouco. Sem dados ainda.
2. O plano de quatro etapas está escrito a partir dos meus projetos e do que ensinei antes dos
   modelos, não a partir de uma turma. A primeira vai corrigi-lo, igual que ao curso.
3. Se o "dono técnico da evidência" é um papel novo ou é o engenheiro de sistemas de sempre com
   outra ferramenta. Inclino-me para o segundo, e então o nome sobra; mas o mercado vai precisar
   de um nome, e prefiro propor um antes que proponham um pior.
4. O que acontece com o júnior que entra numa equipe que não usa o método. Este documento supõe
   que a equipe o adota; se não, o júnior formado assim vai bater de frente com um sênior que lhe
   pede código. Não tenho resposta, salvo que o método está publicado para que esse sênior o leia.
