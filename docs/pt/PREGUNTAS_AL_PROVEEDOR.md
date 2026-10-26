# As vinte e cinco perguntas para o fornecedor

Esta folha é para um momento muito concreto: alguém está lhe oferecendo construir um sistema, ou
está lhe entregando um, e você não programa. Você não tem de aprender a programar para esta reunião.
Tem de saber **o que pedir que lhe mostrem**.

O método completo vive nos contratos dos vinte e quatro degraus, e cada contrato traz a sua
"verificação de completitude sem ler código": a lista de comprovações que o dono faz sobre o que foi
entregue. Isso serve enquanto o projeto está em marcha, mas está repartido em trinta e dois arquivos
e ninguém entra numa reunião com isso. Esta folha é a mesma coisa, reunida e ordenada por **o que
estão lhe prometendo**. Imprime-se e leva-se.

## A única regra que você tem de lembrar

**As respostas que valem são as que se podem ver.** Um arquivo, um número com o comando que o
produz, uma prova que se viu falhar, um manual, uma assinatura com data. As que não se podem ver são
promessas, e uma promessa não é uma resposta: é uma intenção, dita por alguém que quer fechar a
reunião.

Não é preciso que você entenda o que lhe mostram. Basta que **exista** e que a pessoa abra na sua
frente. Se para lhe responder ela tiver de explicar por que ainda não, anote a data e volte a
perguntar na reunião seguinte: o que se repete duas vezes sem se mostrar não vai aparecer.

Três frases que convém reconhecer, porque significam "não tenho isso":

- "Confie em mim, isso a gente sempre faz assim."
- "Isso se vê no final, quando estiver tudo pronto."
- "Está na minha cabeça / está no repositório, depois te mando."

E um esclarecimento honesto na outra direção: **um "não" dito com a sua razão é uma boa resposta**.
"Não temos provas de carga porque são trinta usuários e combinamos assim" é um não com razão, e é
exatamente o que o método chama de proporcionalidade. O que não serve é o "sim" que não se pode ver.

## Se você só tem dez minutos

Se a reunião for curta, estas cinco trazem mais informação que as vinte e cinco: a **4** (uma prova
vista em vermelho), a **7** (o plano são as pendências), a **13** (o limite que freia a construção),
a **20** (o manual de recuperação, provado por uma pessoa) e a **24** (o relatório que diz o que não
se pôde verificar). Se essas cinco se podem ver, o resto quase sempre está. Se nenhuma se pode ver,
o resto quase nunca está.

---

## O que lhe prometem: "entrego funcionando"

**1. Você pode me mostrar o sistema rodando num ambiente que não é o seu computador?**
O que se pode ver: um endereço que você abre, no seu telefone, com dados de prova. Se só funciona na
máquina de quem o construiu, ainda não existe como sistema.
*(Degrau 15.)*

**2. O que tem de ser verdade para você considerar terminado um pedido meu?**
O que se pode ver: escrito, antes de começar, por cada pedido. Deveria incluir "a prova passou" e
"uma pessoa usou". Se a resposta é "quando funcionar", não há critério: há opinião.
*(Degrau 5, critérios de aceitação.)*

**3. Há uma prova automática de cada coisa que me importa?**
O que se pode ver: uma rodada da bateria de provas, com números, na tela. Você não se importa com o
conteúdo: importa que haja saída e que diga quantas passaram.
*(Degrau 8.)*

**4. Você pode me mostrar uma dessas provas **falhando**?**
O que se pode ver: o pedaço de tela onde a prova ficou vermelha contra o sistema sem o arranjo, com
o comando que a rodou e a data. É a pergunta mais importante da folha: uma prova que ninguém viu
falhar não se sabe se prova algo. Um sistema pode ter mil provas que passam e não vigiar nada.
*(Degrau 8. No método se chama "provado em vermelho".)*

**5. Quem, que não seja você nem um programa, usou o sistema e chegou até o final?**
O que se pode ver: uma lista de casos de prova escritos para uma pessoa, com data, com o nome de
quem os executou e o que aconteceu. Quem construiu não pode ser o único que provou, e o modelo prova
o que entendeu, que não sempre é o que você pediu.
*(Degrau 10.)*

**6. Se eu fizer algo errado na tela — carrego duas vezes, aperto o botão apressado —, o que
acontece?**
O que se pode ver: a lista das ações que não se podem desfazer, cada uma com a sua tranca e o que
acontece se falhar no meio do caminho. A resposta correta nunca é "isso não deveria acontecer".
*(Degrau 14.)*

## O que lhe prometem: "sei o que falta e em que ordem"

**7. Onde está a lista do que falta, e posso vê-la hoje?**
O que se pode ver: um registro de pendências numeradas, com cada uma escrita em detalhe e com a data
em que se fechou. **Essa lista é o plano**: se há um plano em outro lugar e uma lista por aqui, há
dois planos, e o que vale é o que ninguém está olhando.
*(Degrau 5.)*

**8. Cada coisa que você vai me construir está escrita antes de construí-la, com as minhas
palavras?**
O que se pode ver: a pendência aberta, com a história de onde saiu o pedido dita como você a disse,
as regras que se aplicam, as telas e os casos raros. Se está numa linha, o que falta vai ser
inventado por alguém.
*(Degrau 5.)*

**9. Quando algo do negócio não está claro, o que você faz?**
O que se pode ver: o arquivo de decisões, com data e com quem decidiu cada uma. A resposta que você
busca é "eu te pergunto e anoto". Um modelo que encontra um buraco nas regras do negócio o preenche
sozinho e segue, e seis semanas depois ninguém sabe por que o sistema faz aquilo.
*(Degraus 1 e 6.)*

**10. Está escrito que coisas o sistema **não** vai fazer?**
O que se pode ver: uma seção própria, com pelo menos dois itens, no documento do projeto. O que não
está dito é exatamente o que vai aparecer construído de outra maneira.
*(Degrau 2.)*

**11. Quem são os diferentes tipos de pessoa que vão usar isto, e está escrito o que cada um pode
fazer?**
O que se pode ver: a lista de perfis — quem é cada um e o que vem fazer — e uma tabela que diz o que
cada perfil pode fazer. Se há um só perfil chamado "usuário", quase sempre falta a metade: é a causa
mais comum de alguém ver um botão que não lhe corresponde, ou de alguém que sim tem a permissão não
encontrar a tela.
*(Degrau 2, entradas prévias do Anexo H; degrau 8, a matriz.)*

## O que lhe prometem: "está bem feito"

**12. O que mede uma máquina em cada mudança, sem que ninguém se lembre de olhar?**
O que se pode ver: a configuração da cadeia de verificação no repositório e o registro da última
rodada. "Nós revisamos entre nós" não é uma resposta: é um costume, e os costumes caem na semana em
que há pressa.
*(Degraus 4 e 9.)*

**13. Há um limite que, se for passado, **freia** a construção?**
O que se pode ver: um arquivo com os limites e o seu valor medido de hoje, e uma rodada freada por
um deles. A pergunta de controle, que convém fazer tal qual: *alguma vez vocês subiram um limite
para poder seguir?* Se a resposta é sim e não está escrito por quê, o limite é decorativo.
*(Degrau 9.)*

**14. Como você sabe que o código vai poder ser mantido por outra pessoa?**
O que se pode ver: o relatório por regra, não um número único: tamanho de arquivo, tamanho de
função, código repetido, código morto. Um "noventa e cinco por cento de qualidade" não diz o que
arrumar.
*(Degrau 9 e Anexo H.)*

**15. As telas alguém pensou, ou saíram do que o programa precisava?**
O que se pode ver: o registro das regras de usabilidade com o seu resultado, e as exceções
desligadas com o motivo escrito, quem autorizou e quando se revisa. Um sistema pode passar todas as
verificações técnicas e ser inutilizável: tudo verde, e a pessoa não encontra onde cobrar.
*(Anexo H, as vinte e sete regras de usabilidade.)*

**16. As provas que você me mostrou vigiam de verdade ou decoram?**
O que se pode ver: o placar de mutação. É um programa que mete erros de propósito e conta quantos as
provas pegam; o número sai com o seu comando. Se o seu sistema tem usuários reais, isso não é
opcional no método.
*(Degrau 9.)*

## O que lhe prometem: "não vai lhe fazer dano"

**17. O que acontece com os meus dados se algo se romper no meio de uma operação?**
O que se pode ver: a tabela de ações com a sua reversibilidade, e a regra escrita de que na dúvida o
sistema **se freia** em vez de seguir. Uma cobrança duplicada ou uma aprovação automática que
ninguém olhou são o caso típico.
*(Degrau 14.)*

**18. Há copias de segurança, e alguma vez vocês provaram restaurar uma?**
O que se pode ver: a data da última restauração **provada**. Uma cópia que nunca se restaurou não é
uma cópia de segurança: é um arquivo do qual ninguém sabe nada.
*(Degrau 20, manual de recuperação.)*

**19. Quem revisa que o sistema não tenha buracos conhecidos, e a cada quanto?**
O que se pode ver: o escaneamento rodando na cadeia, com data, e os achados convertidos em
pendências. Mais uma pergunta curta e muito reveladora: *onde estão guardadas as chaves e as senhas
do sistema?* Se estão no código, você já tem um problema.
*(Degraus 18 e 15.)*

**20. Alguém que não programa recuperou o sistema desde zero seguindo um manual?**
O que se pode ver: o manual, e o registro dessa prova com três coisas: quanto tempo levou de ponta a
ponta, em que passo exato travou a pessoa, e que palavras não entendeu. Se o manual começa com "abra
uma sessão com o agente", não é um manual para uma pessoa. E enquanto isso não existir, dito sem
rodeios: **o dono não é dono, é inquilino**. Tem o sistema, paga por ele, e não pode entrar sem pedir
permissão a quem o construiu.
*(Degrau 20.)*

## O que lhe prometem: "vai aguentar"

**21. Com que números vocês dimensionaram isto, e de onde saíram?**
O que se pode ver: quantos usuários ao mesmo tempo, quantas operações por dia, quanto cresce por
ano, quanto tempo tem de ficar guardado. E a parte que importa: esses números os tem o **seu
negócio**, não quem constrói. Se foi ele que os inventou, estão errados.
*(Degrau 3.)*

**22. Provaram com a carga que eu vou lhe dar, e com dez vezes mais?**
O que se pode ver: o relatório da rodada, com o ponto exato onde o sistema caiu. Saber onde se rompe
é a única forma de saber quanta margem você tem.
*(Degrau 19.)*

**23. Quando o sistema estiver lento em seis meses, como vocês vão saber por quê?**
O que se pode ver: os registros com identificador por ação, o relatório das consultas mais lentas, e
os alertas configurados. Se a resposta é "vemos quando acontecer", você vai ver primeiro, por um
usuário irritado.
*(Degraus 16, 17, 21 e 22.)*

## O que lhe prometem: "vou lhe dizer a verdade"

**24. Quando você me informa que algo está pronto, como distingo o que provou do que supõe?**
O que se pode ver: o relatório em três blocos: **verificado** (com a prova ao lado), **acreditado**
(e por que não se provou) e **pontos cegos** (o que não se pode ver de onde está). "Pronto" seco não
é um relatório. E a segunda parte da pergunta vale mais que a primeira: *que coisas desta entrega
você **não** pôde verificar?* Se a resposta é "nenhuma, tudo verificado", desconfie: ninguém
verifica tudo.
*(Degrau 12.)*

**25. Quem revisa o trabalho, além de você mesmo?**
O que se pode ver: uma auditoria feita por alguém — ou algo — distinto de quem construiu, com os seus
achados convertidos em pendências e com data. Um modelo avaliza uma parte considerável dos seus
próprios erros, e uma pessoa também. Quem constrói não pode ser o único que verifica.
*(Degrau 13.)*

---

## O que fazer com as respostas

Anote, ao lado de cada pergunta, uma de três coisas: **vi**, **ainda não vi** (com a data em que lhe
prometeram) ou **não existe e me disse por quê** (com a razão). Não é preciso que as vinte e cinco
dêem "vi": um projeto pequeno não precisa de provas de carga nem de monitoramento semanal, e o
método diz isso. O que sim tem de acontecer é que **cada "não" tenha a sua razão escrita**, porque um
não com razão é uma decisão sua e um não sem razão é uma dívida que você vai pagar sem tê-la
escolhido.

E uma última, que não está numerada porque não é para o fornecedor: se alguém se incomoda porque
você pede para ver as coisas, isso também é informação.

---

## De onde sai esta folha

As vinte e cinco perguntas são a "verificação de completitude sem ler código" dos contratos deste
método, reunida: cada uma cita o degrau de que sai, então qualquer um pode ir ao contrato e ler a
versão completa. Estão escritas de zero para esta folha.

**A ideia de que isto tinha de existir como uma folha não é minha.** Veio da primeira adaptação do
método a outro formato — o romance de Oscar Schmitz "El Arte de Forjar Sistemas", 2026, creditado na
Parte F do documento principal —, que o disse melhor que eu: o método tem a verificação repartida nos
seus contratos e lhe faltava a peça que um dono leva a uma reunião. O critério do começo desta folha
— que as respostas que valem são as que se podem ver — também é de lá. A versão dele das perguntas é
obra dele e tem os seus direitos reservados; estas são outras, escritas a partir dos meus contratos,
e por isso se publicam com a licença deste repositório.
