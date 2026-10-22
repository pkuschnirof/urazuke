# Anexo H - Heuristicas de qualidade de codigo e de usabilidade

**Estado: APROVADO - FORMA, SEVERIDADES INICIAIS E TRADUCAO.** Nao fica nenhuma decisao aberta. A forma (D-043 e D-044), os interruptores (D-045 e D-046), o painel (D-047) e as severidades iniciais com o peso da acessibilidade (D-048, secao 10) estao decididos. O texto esta traduzido em seis dos oito idiomas (alemao, espanhol, frances, ingles, italiano e portugues); faltam japones e chines, e so quando existirem ele entra na API de prompts, onde `build/prompts.mjs` o exige byte a byte. Data: 2026-10-22.

Registro das decisoes deste anexo: `docs/DECISIONES.md`, D-043 a D-048. O painel de cumprimento (secao 12) foi decidido com duas cifras em D-047. O trabalho de implementacao vive em PND-002; a traducao e a indexacao, em PND-003.

## 1. O que falta hoje, e por que

O passo 9 ja mede o codigo, e o faz com uma comporta que nao deixa passar nada: um unico formatador, limites de tamanho (trezentas linhas por arquivo, quarenta por funcao), complexidade por funcao, codigo duplicado, codigo morto, dependencias declaradas e usadas, cobertura com catraca e testes de mutacao onde ha usuarios reais. O numero fica escrito em `docs/CODE_QUALITY.md`. Isso esta resolvido.

O que nao esta resolvido e a outra metade do produto. Revisei o corpus dos passos: nao ha uma unica mencao a usabilidade, a perfis/pessoas nem a agrupamento funcional. A interface se sustenta hoje em duas coisas: a captura que o dono olha por dez segundos e os casos de teste manuais. As duas sao boas e as duas sao humanas, caras e esquecidas. Um sistema pode passar na comporta de qualidade com honras e ser inutilizavel: tudo verde, e a pessoa nao acha onde cobrar.

E ha um problema de segunda camada que e tecnico mas aparece na interface: quando o mesmo produto e usado por varios perfis (administracao, operacao, consulta, cliente), as funcionalidades sao habilitadas em tres lugares diferentes - o banco, o menu e o guarda de rota - que se escrevem em momentos diferentes e se desincronizam sozinhos. O sintoma e sempre o mesmo: alguem ve um botao que nao e seu, ou pior, alguem que sim tem o permiso nao acha a tela.

As duas heuristicas que seguem atacam essas duas coisas com a mesma forma: um catalogo curto de afirmacoes verificaveis, alguns instrumentos que as medem sozinhos, e um caminho de excecao declarada para quando o projeto precisa sair da linha.

## 2. O modelo: tres capas, uma unica forma de regra

A tentacao e fazer uma lista de regras e amarra-la a stack do primeiro projeto. Isso envelhece mal: a regra de React nao aplica em Angular, a de Angular nao aplica em servidor com templates, e em dois anos metade da lista esta morta. A proposta separa tres capas.

**Capa 1 - Nucleo agnostico (nao negociavel).** Afirmacoes sobre resultados, nao sobre ferramentas. "Ha um unico formatador e ninguem discute com ele" aplica igual em TypeScript, em PHP ou em Go. O nucleo se enumera com identificadores estaveis e nao muda de projeto em projeto.

**Capa 2 - Adaptador por stack (configuravel).** Para cada regra do nucleo, cada familia de frontend declara *com o que* se mede e *com qual limiar*. Um projeto React com Vite, um Next, um Angular, um servidor com templates, um mobile e um de linha de comando sao seis adaptadores diferentes do mesmo nucleo. Tudo o que o usuario pediu como "configuravel por frontend" vive aqui.

**Capa 3 - Decisoes do projeto (declaradas).** Os limiares concretos e as excecoes. Nao se inventam: se perguntam ao dono e ficam escritos, igual ao dimensionamento do passo de arquitetura. Se um limiar nao esta declarado, aplica o do adaptador e fica registrado como tal.

Toda regra se escreve sempre com a mesma ficha de seis campos:

| Campo | O que contem |
|---|---|
| `id` | Identificador estavel (`CQ-07`, `UX-12`). Nunca se reutiliza. |
| Enunciado | Uma so frase, no imperativo, sobre um resultado observavel. |
| Por que | O dano concreto que evita. Se nao ha dano, a regra e sobrante. |
| Como se verifica | O instrumento: comporta automatica, consulta a matriz, teste ponta a ponta ou caso manual. |
| Severidade | `BLOQUEIA` (a comporta vai a vermelho e o bloco nao fecha), `AVISA` (abre um pendente), `REGISTRA` (so fica no documento). |
| Aplica a | Perfis onde manda. Fora deles nao corre, e isso nao e excecao: e escopo. |

**A excecao se declara, nunca se omite.** Uma regra se apaga com ficha de quatro campos: identificador, motivo em uma linha, quem a autoriza (o dono, nao o agente) e data de revisao. Uma regra apagada sem ficha e um fracasso da comporta, nao uma decisao. E o mesmo criterio que o metodo ja usa para recusar um limite subido "para passar".

## 3. Os quatro instrumentos

Nenhuma heuristica vale nada se a sua verificacao e uma opiniao. Sao quatro, e cada regra declara a qual pertence.

1. **Comporta automatica.** Corre em cada push e no fechamento do bloco. Devolve verde ou vermelho. E barata, e repetivel e nao discute. Mede tudo o que pode ser contado.
2. **Consulta a matriz.** A matriz funcionalidade-por-perfil (ver B2) e um artefato declarativo; o menu, o roteamento e os permisoes se derivam dela. Verificar a matriz e verificar a interface. E a peca que converte parte da usabilidade em algo que uma maquina pode verificar.
3. **Teste ponta a ponta por perfil.** Para cada perfil declarado, um script que entra como esse perfil e compara o conjunto de funcionalidades alcancaveis contra a linha da matriz: *nem menos nem mais*. E o teste que pega as duas desincronizacoes tipicas (o botao que sobra e a tela que falta).
4. **Caso manual.** O que nenhuma maquina julga: se o agrupamento se entende, se a tarefa se completa sem ajuda, se o texto esta no idioma do usuario. Se corre com pessoas e se registra, como o passo 10 ja manda.

## 4. Parte A - Qualidade de codigo

O nucleo estende o passo 9: nao o substitui e nao o contradiz, da nome, severidade e adaptador a cada coisa que ja se mede, e agrega o que hoje falta, que e a interface vista como codigo.

| id | Familia | Enunciado | Verifica | Severidade |
|---|---|---|---|---|
| CQ-01 | Forma | Ha um unico formatador, corre sem intervencao e nao admite discussao. | Comporta | BLOQUEIA |
| CQ-02 | Forma | Ha um unico linter por repositorio e suas regras sao as mesmas para todos; uma regra se apaga com motivo escrito, nunca em um arquivo solto. | Comporta | BLOQUEIA |
| CQ-03 | Tamanho | Nenhum arquivo supera o limite declarado (arranca em 300 linhas) e nenhuma funcao supera o seu (arranca em 40). | Comporta | BLOQUEIA |
| CQ-04 | Complexidade | Nenhuma funcao supera o limite declarado de caminhos. | Comporta | BLOQUEIA |
| CQ-05 | Duplicacao | Nao entra duplicacao nova: o bloco copiado se extrai ou se justifica. | Comporta | BLOQUEIA |
| CQ-06 | Coisas mortas | Nao ha codigo morto: funcoes, variaveis, importacoes, ramos e dependencias sem uso. | Comporta | BLOQUEIA |
| CQ-07 | Tipos | Se a linguagem permite tipos, o projeto os usa a serio; o tipo "any" e excecao declarada, nao habito. | Comporta | AVISA |
| CQ-08 | Testes | A cobertura nao baixa: o numero de hoje e o piso de amanha. | Comporta | BLOQUEIA |
| CQ-09 | Testes | Com usuarios reais, o escore de mutacao se mede por bloco e todo mutante que sobrevive em codigo novo abre um pendente. | Comporta + registro | BLOQUEIA |
| CQ-10 | Dependencias | Toda dependencia esta declarada, se usa e nao traz uma arvore de terceiros desproporcionada ao que aporta. | Comporta | AVISA |
| CQ-11 | Segredos | Nao ha credenciais, chaves nem cadeias de conexao no repositorio, nem no historico novo. | Comporta | BLOQUEIA |
| CQ-12 | Interface | A interface nao decide: nenhuma tela nem componente contem regras de negocio (o que se permite, quanto custa, que estado segue). Vive no dominio e a vista consulta. | Revisao no fechamento + caso manual | BLOQUEIA |
| CQ-13 | Interface | Toda chamada ao servidor passa por um unico cliente tipado; nenhuma tela monta a sua requisicao a mao. | Comporta (busca) | BLOQUEIA |
| CQ-14 | Interface | Ha um unico lugar onde vive o estado compartido; duplicar estado entre telas e um fracasso, nao um atalho. | Revisao no fechamento | BLOQUEIA |
| CQ-15 | Interface | Todo texto visivel sai de um catalogo de traducoes; nenhuma cadeia de usuario fica escrita dentro do componente. | Comporta (busca) | BLOQUEIA |
| CQ-16 | Interface | Todo elemento interativo leva identificador estavel e papel, para que o teste automatico o encontre pelo nome e nao pela posicao. | Comporta (busca) | BLOQUEIA |
| CQ-17 | Interface | Todas as cores, espacamentos e tipografias saem de tokens; nenhum valor solto na folha de estilos. | Comporta (busca) | BLOQUEIA |
| CQ-18 | Interface | A acessibilidade basica se verifica sozinha: contraste, rotulos nos campos, foco visivel, navegacao por teclado nos fluxos principais, imagens com texto alternativo. | Comporta | AVISA |

As regras CQ-12 a CQ-18 sao as que fazem com que "qualidade de codigo" signifique algo no front. Sem elas, o projeto pode ter noventa por cento de mutacao e uma tela que calcula o total com a sua propria aritmetica dentro de um componente: o pior dos dois mundos, porque o calculo duplicado passa todos os testes de backend.

**Severidades iniciais (D-048).** Desde o primeiro dia bloqueiam as catorze regras que tem verificador e que nao dependem de um limiar que valha discutir: CQ-01 a CQ-06, CQ-08 e CQ-11 a CQ-17. CQ-09 bloqueia onde ha usuarios reais, que e onde se mede. Avisam tres, e so tres: CQ-07 (tipos), CQ-10 (dependencias) e CQ-18 (acessibilidade), porque sao as que precisam que o projeto calibre primeiro. O formatador, o linter, o tamanho e a complexidade **nao se afrouxam**: o passo 9 ja os bloqueia hoje, e esta extensao o estende, nao o substitui; a divida herdada se resolve com excecao declarada ou com a linha de base da catraca, nunca baixando a severidade. E CQ-12 e CQ-14 sao as duas unicas regras desta tabela que bloqueiam com vermelho humano e nao de maquina: se verificam no fechamento do pendente e com o caso manual na frente, igual a UX-22 e UX-27, nao em cada commit. Se o projeto nao consegue sustentar esse fechamento, a regra baixa a AVISA por decisao registrada, nao por descuido.

**Adaptador por familia de frontend.** Exemplo de como se instancia a capa 2 (os nomes sao ilustrativos; o projeto escolhe e escreve os seus):

| Conceito | Aplicacao de pagina unica (React, Vue, Angular) | Servidor com templates | Mobile nativo | Linha de comando |
|---|---|---|---|---|
| CQ-12 dominio na vista | Regra de lint sobre tamanho e dependencias do componente + revisao | Revisao do controlador | Revisao do view-model | Revisao da capa de comandos |
| CQ-13 cliente unico | Geracao a partir do contrato da API | Servico unico do servidor | Cliente gerado | Cliente unico do SDK |
| CQ-15 textos | Catalogo + regra que proibe literais visiveis | Catalogo do motor de templates | Catalogo de recursos | Catalogo |
| CQ-16 identificadores | Atributos declarativos por elemento | Identificadores no markup | Identificadores de acessibilidade | Saida estavel |
| CQ-17 tokens | Tokens na folha de estilos, sem valores soltos | O mesmo | O mesmo | Nao aplica |
| CQ-18 acessibilidade | Analisador automatico na comporta | Analisador sobre o HTML gerado | Analisador de acessibilidade | Nao aplica |

O que muda entre colunas e a ferramenta e o limiar. O que nao muda e o enunciado. Isso e o que torna a heuristica agnostica sem virar decorativa.

## 5. Parte B - Usabilidade

Cinco familias. A primeira e a segunda sao as que o dono pediu explicitamente; as outras tres existem porque sem elas o agrupamento e os perfis se degradam igual, mais devagar.

### B1 - Agrupamento por convergencia funcional

A regra mae: **uma funcionalidade se agrupa por aquilo que a pessoa veio fazer, nao pelo modulo do qual saiu.** O codigo se organiza por entidades ("Fatura", "Cliente", "Pagamento"); as pessoas nao. Ninguem entra no sistema para "gerenciar entidades": entra para cobrar, para despachar, para fechar o mes. Se o menu mostra as entidades, a pessoa faz a traducao. O menu *e* o trabalho.

| id | Enunciado | Verifica | Severidade |
|---|---|---|---|
| UX-01 | Todo grupo do menu se nomeia com um trabalho do usuario (no vocabulario dele, com o glossario do projeto), nunca com um modulo tecnico nem com uma entidade de dados. | Caso manual + revisao da matriz | AVISA |
| UX-02 | Toda funcionalidade tem exatamente uma casa canonica. Se serve dois grupos, se escolhe uma casa e o outro aponta para ela; nao se duplica a entrada. | Consulta a matriz | BLOQUEIA |
| UX-03 | Nao ha orfas: toda funcionalidade declarada e alcancavel desde a tela de entrada em no maximo tres passos. | Caminhamento automatico de rotas | BLOQUEIA |
| UX-04 | O tamanho de um grupo e razoavel: menos de tres funcionalidades indica um grupo que nao era grupo; mais de sete indica uma gaveta. | Consulta a matriz | AVISA |
| UX-05 | Todo grupo tem uma tela de entrada que diz o que se faz ali e qual e a acao principal. Nenhum grupo abre direto em uma tabela vazia. | Caso manual | AVISA |
| UX-06 | Os fluxos que a pessoa faz seguido vivem juntos: se "registrar um pagamento" e "ver a conta do cliente" se usam na mesma sessao, compartilham grupo. | Caso manual (teste de tarefa) | REGISTRA |
| UX-07 | O teste do primeiro clique: o dono, diante de uma tarefa concreta ("onde se cobra um pagamento?"), nomeia um lugar. Se nomeia dois, ha duplicacao; se nao nomeia nenhum, ha orfa. Corre no fechamento de cada bloco. | Caso manual | AVISA |

### B2 - Perfis e funcionalidades habilitadas por perfil

Aqui esta a peca que mais paga, e o motivo e de engenharia, nao de desenho: **a habilitacao se declara uma vez, em uma matriz, e tudo o resto se deriva dela.** Hoje o erro classico e escrever o permiso tres vezes (no menu, no guarda de rota e no filtro de dados) e ter as tres desincronizadas. Com a matriz como produtor unico, o menu, o roteamento, os permisoes do servidor e os scripts de teste sao consumidores, e a simetria produtor/consumidor que o metodo ja exige se torna verificavel sozinha.

A matriz tem quatro colunas e uma linha por funcionalidade: *funcionalidade*, *casa* (o grupo de B1), *perfis que a tem*, *rota de entrada*. Nada mais.

| id | Enunciado | Verifica | Severidade |
|---|---|---|---|
| UX-08 | Toda funcionalidade declara na matriz que perfis a tem. Uma funcionalidade sem perfil nao existe: ou se lhe da um perfil ou se apaga. | Consulta a matriz | BLOQUEIA |
| UX-09 | Todo perfil declarado tem ao menos uma funcionalidade e um ponto de entrada proprio. Um perfil vazio e um perfil que ninguem usou ao desenhar. | Consulta a matriz | BLOQUEIA |
| UX-10 | A navegacao se gera desde a matriz. Um menu escrito a mao e um fracasso, nao um atalho. | Comporta (busca) | BLOQUEIA |
| UX-11 | Esconder nao e proteger: toda rota verifica o permiso do lado do servidor alem de esconder a entrada. Digitar o endereco a mao nao basta para entrar. | Teste ponta a ponta | BLOQUEIA |
| UX-12 | Nem menos nem mais: para cada perfil, o conjunto de funcionalidades alcancaveis e exatamente o da sua linha da matriz. | Teste ponta a ponta por perfil | BLOQUEIA |
| UX-13 | A negativa se explica: se uma pessoa entra em uma funcionalidade que nao e sua, ve uma mensagem que diz por que e a quem pedir acesso. Nunca uma tela em branco, nunca um botao cinza sem motivo. | Caso manual | AVISA |
| UX-14 | O mesmo botao significa o mesmo para todos: se dois perfis compartilham rotulo, compartilham efeito. Se o efeito muda por perfil, muda o rotulo ou a funcionalidade se divide em duas. | Caso manual | AVISA |
| UX-15 | Os dados tambem se filtram por perfil: quem ve a lista ve as linhas que lhe correspondem, nao a lista inteira com as linhas escondidas no navegador. | Teste ponta a ponta + revisao do servidor | BLOQUEIA |
| UX-16 | A matriz e o manual do usuario se atualizam no mesmo pendente que a funcionalidade. Uma funcionalidade nova sem linha na matriz nao fecha. | Fechamento do pendente | BLOQUEIA |

### B3 - Estados, e o que a pessoa ve quando algo nao esta

A maioria das reclamacoes de "nao funciona" sao telas que nao souberam dizer "nao ha nada", "esta carregando" ou "falhou". Quatro estados, sempre, em toda lista e em toda tela de detalhe.

| id | Enunciado | Verifica | Severidade |
|---|---|---|---|
| UX-17 | Toda lista tem os quatro estados resolvidos: com dados, vazia, carregando e com erro. A vazia distingue "ainda nao ha nada" de "sua busca nao achou nada". | Caso manual + revisao | AVISA |
| UX-18 | Enquanto algo demora, se ve que esta trabalhando e se pode cancelar se for longo. Um botao que nao responde nada e a reclamacao numero um. | Caso manual | AVISA |
| UX-19 | O erro diz o que passou, o que se pode fazer e nao apaga o que foi digitado. Nem um codigo tecnico sozinho, nem um "ocorreu um erro". | Caso manual | AVISA |

### B4 - Acoes e erros

| id | Enunciado | Verifica | Severidade |
|---|---|---|---|
| UX-20 | Uma tela tem uma acao principal evidente; o resto e secundario e se parece com isso. | Caso manual | AVISA |
| UX-21 | Toda acao destrutiva pede confirmacao nomeando o objeto afetado, e quando se pode se desfaz em vez de confirmar. | Caso manual | AVISA |
| UX-22 | Um formulario que falha conserva o que foi digitado e marca o campo com o problema, no lugar do campo. | Caso manual | BLOQUEIA |
| UX-23 | Nenhuma acao deixa a tela sem saida: depois de salvar, apagar ou cancelar, a pessoa sabe onde esta e como seguir. | Caso manual | AVISA |

### B5 - Linguagem e acessibilidade

| id | Enunciado | Verifica | Severidade |
|---|---|---|---|
| UX-24 | A interface fala o idioma do glossario do projeto: o mesmo objeto se chama igual na tela, no manual e no e-mail. Um sinonimo e um defeito. | Caso manual + revisao | AVISA |
| UX-25 | Tudo se pode fazer sem mouse e com leitor de tela nos fluxos principais; o foco esta sempre visivel e nao se prende. | Comporta (CQ-18) + caso manual | AVISA |
| UX-26 | Os estados nao se comunicam so por cor; toda imagem informativa tem texto alternativo; os textos se leem em tamanho normal sem zoom. | Comporta (CQ-18) | AVISA |
| UX-27 | Todo pendente que toca uma tela entrega a captura real do ambiente de teste, e o dono a olha antes de fechar. A captura nao e opcional e nao e um mockup. | Fechamento do pendente | BLOQUEIA |

## 6. Onde se engancha, e que artefatos produz

O anexo nao inventa passos novos: pendura-se nos que existem. Isso evita duplicar comportas e evita o destino habitual das listas de usabilidade, que e serem lidas uma vez.

**Onde vai (D-043).** E transversal aos quatro trechos, com o peso principal no Loop de Construcao (passos 5 a 12), que e onde se decide e se constroi. Nao e um passo proprio: um passo numerado obrigaria a renumerar a escada, alteraria a contagem de passos e sujeitaria o anexo a traducao obrigatoria dos contratos aos oito idiomas antes de que a construcao pudesse passar em verde, sem agregar nenhuma comporta que o loop nao tenha ja.

**Como se engancha (D-044).** Uma fonte canonica, cinco ancoras e duas entradas previas. O texto das regras vive so aqui e os prompts o citam; nunca o copiam. Repetir as quarenta e cinco regras dentro dos oito prompts do loop as dilui (competem com o trabalho de cada passo e o agente as obedece diferente em cada vez), as desalinha (duas copias do mesmo texto se desincronizam sozinhas, que e o antipadrao que o passo 11 persegue) e nao as torna mais transversais: o que torna uma regra transversal e que cada bloco passe pela mesma comporta, nao que a regra esteja escrita em todas partes.

| Momento | O que se agrega | Por que ali |
|---|---|---|
| **Entrada previa 1** - definicao de escopo | O glossario do usuario | Sem glossario, UX-01 e UX-24 nao tem com o que se comparar. |
| **Entrada previa 2** - definicao de escopo | A lista de perfis | Sem a lista, a matriz de B2 se inventa no passo 5 e tudo o que se deriva dela nasce sem base. |
| **Ancora 1** - passo 5 (o plano) | Todo pendente que toca uma tela declara tres coisas: a que grupo de convergencia pertence (B1), que perfis a tem e que criterios de aceitacao sao por perfil ("dado o perfil X, a pessoa pode fazer Y e nao pode fazer Z"). Sem essa declaracao o pendente nao passa o passo. | Aqui *nascem* o agrupamento e os perfis: sao decisoes de planejamento, nao de codigo. E a ancora de maior rendimento e a que hoje nao existe. |
| **Ancora 2** - passo 8 (testes em vermelho) | A matriz se converte em um teste que primeiro se ve falhar: por cada perfil, o alcancavel contra a sua linha (UX-11, UX-12, UX-15). | Sem isso a matriz e um documento que ninguem olha. |
| **Ancora 3** - passo 9 (qualidade) | O catalogo CQ completo com o seu adaptador e os seus limiares declarados; `docs/CODE_QUALITY.md` reporta por regra, nao por numero unico. E a matriz como comporta (UX-02, UX-03, UX-08, UX-09, UX-10, UX-16). | E o unico lugar onde o texto entra literal como diretiva, e e a comporta que corre em cada bloco com catraca. |
| **Ancora 4** - passo 10 (casos manuais) | Cada caso se executa **uma vez por perfil afetado**, derivado da matriz e nao escrito a mao. Um caso corrido com um so perfil nao conta como executado. | Os casos manuais sao a unica verificacao humana do metodo; se nao se abrem por perfil, a metade de B2 nunca se olha. |
| **Ancora 5** - passo 12 (verificacao e reporte honesto) | O reporte diz o que se mediu, o que ficou em avisa e que regra esta apagada, com o seu motivo, o seu autor e a sua data de revisao. | Zero dano silencioso: um grupo apagado nao pode ser lido como cumprido. |
| Manual do usuario | Se organiza pelos grupos de B1 e declara, por grupo, que perfis entram. | O manual e o menu se nomeiam com as mesmas palavras ou o glossario se rompe. |
| Fechamento de cada bloco | Teste do primeiro clique (UX-07), captura do ambiente real (UX-27) e os dois testes ponta a ponta da matriz. | Sao as tres verificacoes que nao se podem automatizar. |

**Estado (D-049).** As cinco ancoras ja estao enganchadas: o prompt inicial dos passos 5, 8, 9, 10 e 12 cita este anexo nos oito idiomas, com uma unica redacao inglesa identica em todos e a sua traducao local ao lado. O documento se publica no site com o resto do metodo, em espanhol; a traducao existe hoje em seis dos oito idiomas e a sua entrada na API de prompts espera os dois ultimos (D-043). Quando entrar, `build/prompts.mjs` compara o texto em ingles byte a byte entre as oito versoes e a construcao falha se alguma diferir.

Os passos 6, 7 e 11 recebem no maximo uma linha: o 6 ja registra limiares e excecoes como decisoes (e o lugar natural da excecao declarada), e o 11 e onde entra a golpes o caso da matriz escrita em quatro lugares. Nao se lhes agrega texto proprio para nao dilui-los.

Tres artefatos, todos em `docs/`: `CODE_QUALITY.md` (estendido), `USABILITY.md` (novo, com o resultado por regra e as excecoes declaradas) e `PROFILE_MATRIX.md` (a matriz, que e ao mesmo tempo documento e fonte do menu).

## 7. Configuracao

Um unico arquivo por projeto declara a capa 2 e a capa 3. Exemplo com a forma proposta, nao com valores definitivos:

```json
{
  "version": 1,
  "frontend": "react-vite",
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
  "thresholds": {
    "lines_per_file": 300,
    "lines_per_function": 40,
    "paths_per_function": 10,
    "minimum_coverage": 0,
    "mutation_target": 0
  },
  "exceptions": [
    {
      "rule": "CQ-17",
      "reason": "relatorio imprimivel herdado, sem tokens",
      "authorised_by": "dono",
      "review": "2027-01-31"
    }
  ]
}
```

Os dois zeros sao deliberados e sao a parte que importa: a cobertura minima a fixa a catraca com o medido, e o objetivo de mutacao o fixa o dono quando o projeto tem usuarios. Se estao em zero e ninguem os declarou, a comporta o reporta como limiar nao declarado em vez de inventa-lo.

## 8. As duas pecas, na forma que o metodo usa

**Qualidade de codigo.**

> Set up and maintain the code-quality gate for this project, configured for its frontend family. The core rules are the same in every project; what changes is how each one is measured and at which threshold. Install one formatter and one linter with a single shared configuration; enforce size limits per file and per function, complexity per function, duplication, dead code, declared-and-used dependencies, type checking where the language allows it, coverage with a ratchet, and secret scanning. Where the project has real users, add mutation testing scoped to the changed lines and record the score per block. Then extend the gate to the frontend itself: no business rule inside a screen, one typed client for every server call, one home for shared state, no user-visible string outside the translation catalogue, a stable identifier and role on every interactive element, styling only through tokens, and automatic basic accessibility checks. Every rule has a stable id, a severity (blocks, warns, records) and a named verifier. Thresholds and exceptions are declared by the owner in one configuration file; a rule switched off without a written exception is a gate failure, not a decision. Report the result per rule in `docs/CODE_QUALITY.md`, not as a single number.

> [pt]
> Monte e mantenha a comporta de qualidade de codigo do projeto, configurada para a sua familia de frontend. As regras do nucleo sao as mesmas em todo projeto; o que muda e com o que se mede cada uma e com qual limiar. Instale um unico formatador e um unico linter com configuracao compartilhada; faca cumprir limites de tamanho por arquivo e por funcao, complexidade por funcao, duplicacao, codigo morto, dependencias declaradas e usadas, verificacao de tipos onde a linguagem permitir, cobertura com catraca e varredura de segredos. Onde o projeto tiver usuarios reais, agregue testes de mutacao acotados as linhas mudadas e registre o escore por bloco. Depois estenda a comporta ao front: nenhuma regra de negocio dentro de uma tela, um unico cliente tipado para toda chamada ao servidor, um so lugar para o estado compartilhado, nenhum texto visivel fora do catalogo de traducoes, identificador estavel e papel em todo elemento interativo, estilos so por tokens e verificacao automatica de acessibilidade basica. Cada regra tem identificador estavel, severidade (bloqueia, avisa, registra) e verificador nomeado. Os limiares e as excecoes os declara o dono em um arquivo de configuracao; uma regra apagada sem excecao escrita e um fracasso da comporta, nao uma decisao. Reporte o resultado por regra em `docs/CODE_QUALITY.md`, nao como um numero unico.

**Usabilidade.**

> Build the usability criteria for this project before writing the first screen, and enforce them where the method already has hooks. Group functionality by what the person came to do, never by the internal module or the data entity: every menu group is named with a user job in the project glossary, every functionality has exactly one canonical home, no functionality is orphaned, and every group is reachable in no more than three steps from the entry screen. Then declare accessibility in one matrix and derive everything from it: each functionality lists the profiles that have it, each functionality has at least one profile, each profile has at least one functionality and its own entry point, the navigation is generated from the matrix instead of written by hand, and every route checks the permission on the server because hiding an entry is not protecting it. Verify the matrix per profile with an end-to-end check that compares what is reachable with the matrix row: neither less nor more. Require the four states on every list (with data, empty, loading, error), a visible working indicator with the option to cancel long operations, an error message that says what happened and what to do without losing entered data, a primary action per screen, confirmation or undo for destructive actions, and a form that keeps what was typed. Run each manual test case once per affected profile, run the first-click check at the close of every block, and require a real screenshot of the test environment on every item that touches a screen. Record the result per rule, with owner-declared exceptions, in `docs/USABILITY.md`, and keep the matrix in `docs/PROFILE_MATRIX.md` as the single source of truth.

> [pt]
> Monte os criterios de usabilidade do projeto antes de escrever a primeira tela, e faca-os cumprir onde o metodo ja tem enganches. Agrupe as funcionalidades pelo que a pessoa veio fazer, nunca pelo modulo interno nem pela entidade de dados: cada grupo do menu se nomeia com um trabalho do usuario no glossario do projeto, cada funcionalidade tem exatamente uma casa canonica, nenhuma fica orfa e todo grupo se alcanca em no maximo tres passos desde a tela de entrada. Depois declare a acessibilidade em uma unica matriz e derive tudo dela: cada funcionalidade enumera que perfis a tem, cada funcionalidade tem ao menos um perfil, cada perfil tem ao menos uma funcionalidade e um ponto de entrada proprio, a navegacao se gera desde a matriz em vez de se escrever a mao, e toda rota verifica o permiso do lado do servidor porque esconder uma entrada nao e protege-la. Verifique a matriz por perfil com um teste ponta a ponta que compare o alcancavel contra a linha da matriz: nem menos nem mais. Exija os quatro estados em toda lista (com dados, vazia, carregando, com erro), um indicador visivel de trabalho em curso com opcao de cancelar o longo, uma mensagem de erro que diga o que passou e o que fazer sem perder o carregado, uma acao principal por tela, confirmacao ou desfazer nas acoes destrutivas e um formulario que conserve o escrito. Rode cada caso de teste manual uma vez por perfil afetado, rode o teste do primeiro clique no fechamento de cada bloco e exija uma captura real do ambiente de teste em todo pendente que toque uma tela. Registre o resultado por regra, com as excecoes declaradas pelo dono, em `docs/USABILITY.md`, e mantenha a matriz em `docs/PROFILE_MATRIX.md` como fonte unica de verdade.

## 9. O que esta proposta nao faz

- **Nao agrega um passo.** Sao quarenta e cinco regras transversais (18 de qualidade e 27 de usabilidade), nao uma etapa nova. Penduram-se nos passos que ja existem.
- **Nao inventa um escore.** Um numero de "usabilidade 78" nao diz o que arrumar e se otimiza na direcao errada. Se reporta por regra. A secao 12 propoe duas cifras derivadas, mas sao uma contagem de regras com o seu assento - nao uma nota de qualidade nem de usabilidade - e nao autorizam fechar nada.
- **Nao substitui o dono.** O teste do primeiro clique, a captura e o teste de tarefa continuam sendo humanos: sao o unico instrumento que distingue "funciona" de "serve".
- **Nao traz limiares de fabrica.** Os do adaptador sao um ponto de partida declarado; o projeto que nao declare os seus os herda e fica registrado como tal.
- **Nao promete que a comporta detecte o mau agrupamento.** Uma maquina pode verificar que nao haja duplicacao nem orfas; se o grupo se chama "Gestao", tem que ver uma pessoa.

## 10. As decisoes: o que ficou resolvido e o que falta

### Resolvidas

| # | Decisao | Registro |
|---|---|---|
| 1 | **Transversal ao Loop de Construcao, nao passo proprio.** Nao se renumera a escada, nao se altera a contagem de passos e o anexo nao herda a obrigacao de traduzir um contrato de passo. | D-043 |
| 2 | **Uma fonte canonica com cinco ancoras e duas entradas previas,** em vez de copiar as quarenta e cinco regras dentro dos oito prompts do loop. | D-044 |
| 3 | **Dois interruptores independentes** (qualidade e usabilidade), tres estados por regra (bloqueia, avisa, apagada), adaptador por familia de frontend, limiares e excecoes declarados pelo dono. | D-045 |
| 4 | **Disciplina do interruptor:** vive na configuracao do projeto e nao no prompt; apagar so vale como decisao registrada com motivo, autor e data de revisao; o apagado e observavel no reporte; e o interruptor se testa acendendo e apagando. | D-046 |
| 5 | **Severidades iniciais, fixadas regra por regra:** em qualidade bloqueiam catorze (CQ-01 a CQ-06, CQ-08, CQ-11 a CQ-17), CQ-09 bloqueia onde ha usuarios reais, e avisam tres (CQ-07, CQ-10, CQ-18). Em usabilidade bloqueiam onze (UX-02, UX-03, UX-08 a UX-12, UX-15, UX-16, UX-22, UX-27), UX-06 so registra e o resto avisa. Nem "tudo bloqueia" - o projeto nao arranca - nem "tudo avisa" - a heuristica e um adorno. | D-048 |
| 6 | **A acessibilidade arranca avisando e escala a bloqueante por declaracao do dono** quando o produto tem usuarios finais fora da organizacao. O default nao se inventa: a escalada se declara, com o mesmo mecanismo que qualquer limiar (D-045). | D-048 |

### Fechado em D-048, e as duas correcoes que arrasta

As duas perguntas que travavam a escrita dos prompts ja estao respondidas: a 1 ficou na linha 5 e a 2 na linha 6. Mas a recomendacao que se aprovou tinha dois erros de fato, e ficam escritos aqui para que nao voltem:

1. **O defeito da contagem.** Onde este anexo dizia "vinte e sete regras" o numero correto e **quarenta e cinco**: 18 de qualidade (CQ-01 a CQ-18) e 27 de usabilidade (UX-01 a UX-27). A cifra velha vinha de um rascunho que so contava a metade. Corrigido nas secoes 6 e 9 e anotado em D-048; o texto de D-044 se conserva tal como se escreveu, porque uma decisao e um registro e nao se reescreve.
2. **O formatador, o linter, o tamanho e a complexidade nao se afrouxam.** Uma versao anterior desta recomendacao os mandava a "avisa" para nao travar projetos com divida herdada. Nao pode ser: o passo 9 ja os bloqueia hoje, e esta extensao o estende, nao o substitui. A divida herdada se resolve com excecao declarada - com motivo e data de revisao - ou com a linha de base da catraca, nao baixando a severidade da regra.

E uma limitacao declarada, porque e a unica de sua classe: **CQ-12 e CQ-14 bloqueiam com vermelho humano.** Nenhuma ferramenta prova que uma tela nao decide regras de negocio. Se verificam no fechamento do pendente, com o caso manual na frente e o mesmo criterio que UX-22 e UX-27; se o projeto nao consegue sustentar esse fechamento, baixam a AVISA por decisao registrada. Uma regra que bloqueia e que ninguem verifica e pior que uma regra que avisa.

### Calendario, nao decisao

**A traducao.** Feita: o anexo existe nos oito idiomas e os seus dois prompts fazem parte da API de prompts, identicos em ingles nas oito versoes (D-043 o exige e `build/prompts.mjs` o faz cumprir). O texto em castelhano continua sendo o canonico: se alguma vez uma traducao e o castelhano discordarem, ganha o castelhano e a traducao se corrige na mesma mudanca.

## 11. Como se comprova que a comporta vigia

Uma heuristica que nao muda nada quando se acende ou se apaga nao e uma comporta, e decoracao. A prova de aceitacao da implementacao (PND-002) e um projeto fixture com violacoes deliberadas de cada familia:

| Cenario | Resultado exigido |
|---|---|
| Qualidade acesa, com violacao | Vermelho, nomeando a regra e o arquivo onde esta a violacao. |
| Qualidade apagada **com registro** | Verde, e o reporte **diz** que esta apagada, desde quando e quem a autorizou. |
| Qualidade apagada **sem registro** | Vermelho. Apagar sem motivo escrito e um fracasso, nao uma ausencia de regra. |
| Usabilidade acesa, com perfil que alcanca a mais | Vermelho em UX-12, com o perfil e a funcionalidade nomeados. |
| Usabilidade acesa, com funcionalidade sem linha na matriz | Vermelho em UX-08 ao fechar o pendente (UX-16). |
| Os dois grupos apagados | Verde nos dois, com as duas linhas de apagado no reporte. |
| Se planta uma violacao de uma regra que **avisa** | Verde, e se abre um pendente que nomeia a regra e o arquivo: avisar nao e aprovar. |
| Se planta uma violacao de uma regra que **bloqueia** | Vermelho, com regra, arquivo e remedio nomeados. E nao ha painel: a media nao fecha blocos. |
| Painel: se apaga uma regra **com registro** | O cumprimento pode subir, mas a **cobertura da comporta baixa** e a cifra se publica com o assento que o explica. Com uma unica cifra este cenario passaria inadvertido; e a prova de que as duas cifras existem por um motivo (D-047). |
| Painel: duas corridas com regulamentos distintos | As duas cifras se mostram com a sua impressao digital (versao do catalogo, regras ativas e apagadas, adaptador, versoes de ferramentas) e **nao se grafam como uma serie continua**: sao duas medidas distintas e dize-lo e parte do resultado. |
| Painel: regulamento invalido (regra apagada sem registro) | Nao emite cifras. A saida e vermelho, nao um painel com um asterisco. |
| Painel: cumprimento alto com uma regra que bloqueia em vermelho | O bloco **nao fecha**. O painel faz media; o verde o decide cada regra, uma por uma. |
| Painel: melhora a porcentagem por tocar so o automatico | A porcentagem sobe e a linha de verificacao humana nao se move; se reporta a parte e o reporte nao soma as duas coisas em um numero unico. |

O que se olha nao e so a cor: se olha que as duas linhas de apagado **existam** no reporte. Um resultado verde sem essa linha e o unico fracasso que esta prova nao pode detectar sozinha por cor, e por isso se verifica lendo a saida.

## 12. O painel de cumprimento (DECIDIDO: duas cifras, D-047)

**Estado.** Decidido em 2026-10-22 em D-047: o painel vai com duas cifras, com a impressao digital do regulamento, com catraca, com o humano fora da porcentagem e com o assento obrigatorio. Nao autoriza fechar blocos. O que segue e a especificacao que a implementacao (PND-002) tem que cumprir.

**O que e.** Um derivado determinista do resultado por regra que a comporta ja emitiu. Nao mede nada novo nem julga nada novo: conta. Se o painel pudesse mudar o veredito de uma regra haveria duas fontes de verdade para o mesmo, que e exatamente o que o anexo combate em UX-10 (a navegacao se deriva da matriz) e em CQ-14 (um unico lugar para o estado).

**O que nao e.** Nao e um criterio de aceitacao. Nenhuma cifra autoriza fechar um bloco: o verde ou o vermelho o decide cada regra que bloqueia, uma por uma. O painel descreve a tendencia e aponta o que olhar. Se comeca a se usar como limiar de fechamento, deixou de servir, porque o caminho mais curto para subir um numero e apagar regras.

**Duas cifras, nunca uma.**

| Cifra | Formula | O que mede | Como se move |
|---|---|---|---|
| **Cumprimento** | regras que passam / regras ativas | quao limpo esta o que se esta olhando | sobe quando se arruma |
| **Cobertura da comporta** | regras ativas / regras declaradas no catalogo | quanto do anexo esta realmente olhando | baixa quando se apaga uma regra |

A razao de que sejam duas: apagar uma regra **sobe** o cumprimento e **baixa** a cobertura. Com uma unica cifra apagar e gratis e o painel premia a cegueira. Com duas cifras que se movem em direcoes opostas, o atalho desaparece: para mostrar um painel melhor tem que se arrumar codigo, nao apagar regras. E a cobertura nao se pode subir sem medir.

**A impressao digital do regulamento.** Cada registro guarda com que medida se calculou: versao do catalogo, regras ativas e apagadas, adaptador de frontend e versoes das ferramentas. Sem isso, um 82 de ontem e um 91 de hoje nao sao a mesma medida ainda que se escrevam igual: sao dois regulamentos distintos e a serie e falsa. Duas cifras sem impressao digital produzem uma ilusao de progresso, que e pior que nao ter painel. Se a impressao digital muda, o registro se marca como **nao comparavel** ou o historico se recalcula com a medida vigente; nunca se grafa junto sem dize-lo.

**Catraca.** O cumprimento nao baixa de um bloco ao seguinte sem uma decisao registrada que o explique. E o mesmo mecanismo que a cobertura de testes ja tem em CQ-08: o numero de hoje e o piso de amanha. Baixar nao esta proibido; baixar sem registro, sim.

**O que nao entra na conta.** O que so pode julgar uma pessoa - o teste do primeiro clique (UX-07), o teste de tarefa (UX-06), a captura (UX-27) e todos os casos manuais - se registra como passado ou falhado, por bloco, com nome e data, e se reporta a parte como cobertura de verificacao humana. Nao entra na porcentagem de cumprimento. Se se misturam, o resultado e um numero que e sessenta por cento medicao e quarenta por cento opiniao, e ninguem pode dizer qual e qual. Por isso a secao 9 segue valendo: o painel nao inventa uma nota de usabilidade, conta regras.

**Como se falsifica.** Amplia a prova de aceitacao da secao 11:

| Cenario | Resultado exigido |
|---|---|
| Se planta uma violacao de uma regra que bloqueia | O cumprimento baixa em exatamente uma regra sobre as ativas, e aparece o vermelho com a regra nomeada. |
| Se apaga uma regra com registro | O cumprimento pode subir; a cobertura baixa em uma regra sobre as declaradas; o reporte nomeia a regra, o motivo e a data de revisao. |
| Se apaga sem registro | Vermelho, e nao se emite painel: um regulamento invalido nao produz cifras. |
| Mesma arvore e mesma configuracao, duas corridas | A mesma cifra, identica. |
| Muda a configuracao entre dois blocos | Os dois registros ficam marcados como nao comparaveis, ou o historico se recalcula com a medida vigente. |
| O painel se usa como criterio de fechamento | Uso indevido, nao cenario valido: o verde o decide a regra, nao a media. |

**Onde aparece.** No reporte honesto do passo 12 (ancora 5), e nesta ordem: primeiro o veredito binario da comporta, depois as duas cifras, depois o que esta apagado e ate quando, depois o movimento contra o bloco anterior com a sua causa nomeada. Sempre com o assento: *baixou quatro pontos: CQ-15, tres cadeias fora do catalogo na tela de cobranca*. Uma cifra sem assento e ruido; o assento e o que a torna acionavel para um dono que nao le codigo.

**Risco declarado.** O painel vai ser lido pelo dono, que nao le codigo, e por isso vai querer que suba. O numero se converte no objetivo, e o objetivo desloca o proposito. As defesas sao as de cima, e sao cinco: duas cifras que se contradizem ao apagar, a impressao digital que impede comparar medidas distintas, a catraca que nao deixa baixar sem registro, o humano fora da porcentagem e o assento obrigatorio, com a comporta que nao se negocia por media. Se alguma das cinco cai, o painel se apaga: um painel mal usado faz mais dano que nao te-lo.

## 13. Registro

Toda decisao deste anexo fica em `docs/DECISIONES.md` com data, autor, citacao textual e arquivos de impacto: D-043 (forma), D-044 (mecanismo), D-045 (interruptores), D-046 (disciplina do interruptor), D-047 (o painel com duas cifras) e D-048 (severidades iniciais e o peso da acessibilidade). A implementacao e os seus criterios de aceitacao vivem em PND-002; a traducao e a indexacao, em PND-003.

Nao fica nenhuma decisao aberta: a forma (D-043 e D-044), os interruptores (D-045 e D-046), o painel (D-047) e as severidades iniciais com o peso da acessibilidade (D-048) estao decididas. O texto viaja nos oito idiomas e faz parte da API de prompts, o que fecha o unico item que ficava no calendario.
