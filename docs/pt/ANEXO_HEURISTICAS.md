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

As regras CQ-12 a CQ-18 são as que fazem com que "qualidade de código" signifique algo no front. Sem elas, o projeto pode ter noventa por cento de mutação e uma tela que calcula o total com a sua própria aritmética dentro de um componente: o pior dos dois mundos, porque o cálculo duplicado passa todos os testes de backend.

**Severidades iniciais (D-048).** Desde o primeiro dia bloqueiam as catorze regras que têm verificador e que não dependem de um limiar que valha discutir: CQ-01 a CQ-06, CQ-08 e CQ-11 a CQ-17. CQ-09 bloqueia onde há usuários reais, que é onde se mede. Avisam três, e só três: CQ-07 (tipos), CQ-10 (dependências) e CQ-18 (acessibilidade), porque são as que precisam que o projeto calibre primeiro. O formatador, o linter, o tamanho e a complexidade **não se afrouxam**: o passo 9 já os bloqueia hoje, e esta extensão o estende, não o substitui; a dívida herdada se resolve com exceção declarada ou com a linha de base da catraca, nunca baixando a severidade. E CQ-12 e CQ-14 são as duas únicas regras desta tabela que bloqueiam com vermelho humano e não de máquina: se verificam no fechamento do pendente e com o caso manual na frente, igual a UX-22 e UX-27, não em cada commit. Se o projeto não consegue sustentar esse fechamento, a regra baixa a AVISA por decisão registrada, não por descuido.

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

Cinco famílias. A primeira e a segunda são as que o dono pediu explicitamente; as outras três existem porque sem elas o agrupamento e os perfis se degradam igual, mais devagar.

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

## 6. Onde se engancha, e que artefatos produz

O anexo não inventa passos novos: pendura-se nos que existem. Isso evita duplicar comportas e evita o destino habitual das listas de usabilidade, que é serem lidas uma vez.

**Onde vai (D-043).** É transversal aos quatro trechos, com o peso principal no Loop de Construção (passos 5 a 12), que é onde se decide e se constrói. Não é um passo próprio: um passo numerado obrigaria a renumerar a escada, alteraria a contagem de passos e sujeitaria o anexo a tradução obrigatória dos contratos aos oito idiomas antes de que a construção pudesse passar em verde, sem agregar nenhuma comporta que o loop não tenha já.

**Como se engancha (D-044).** Uma fonte canônica, cinco âncoras e duas entradas prévias. O texto das regras vive só aqui e os prompts o citam; nunca o copiam. Repetir as quarenta e cinco regras dentro dos oito prompts do loop as dilui (competem com o trabalho de cada passo e o agente as obedece diferente em cada vez), as desalinha (duas cópias do mesmo texto se desincronizam sozinhas, que é o antipadrão que o passo 11 persegue) e não as torna mais transversais: o que torna uma regra transversal é que cada bloco passe pela mesma comporta, não que a regra esteja escrita em todas partes.

| Momento | O que se agrega | Por que ali |
|---|---|---|
| **Entrada prévia 1** - definição de escopo | O glossário do usuário | Sem glossário, UX-01 e UX-24 não têm com o que se comparar. |
| **Entrada prévia 2** - definição de escopo | A lista de perfis | Sem a lista, a matriz de B2 se inventa no passo 5 e tudo o que se deriva dela nasce sem base. |
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
      "reason": "relatório imprimível herdado, sem tokens",
      "authorised_by": "dono",
      "review": "2027-01-31"
    }
  ]
}
```

Os dois zeros são deliberados e são a parte que importa: a cobertura mínima a fixa a catraca com o medido, e o objetivo de mutação o fixa o dono quando o projeto tem usuários. Se estão em zero e ninguém os declarou, a comporta o reporta como limiar não declarado em vez de inventá-lo.

## 8. As duas peças, na forma que o método usa

**Qualidade de código.**

> Set up and maintain the code-quality gate for this project, configured for its frontend family. The core rules are the same in every project; what changes is how each one is measured and at which threshold. Install one formatter and one linter with a single shared configuration; enforce size limits per file and per function, complexity per function, duplication, dead code, declared-and-used dependencies, type checking where the language allows it, coverage with a ratchet, and secret scanning. Where the project has real users, add mutation testing scoped to the changed lines and record the score per block. Then extend the gate to the frontend itself: no business rule inside a screen, one typed client for every server call, one home for shared state, no user-visible string outside the translation catalogue, a stable identifier and role on every interactive element, styling only through tokens, and automatic basic accessibility checks. Every rule has a stable id, a severity (blocks, warns, records) and a named verifier. Thresholds and exceptions are declared by the owner in one configuration file; a rule switched off without a written exception is a gate failure, not a decision. Report the result per rule in `docs/CODE_QUALITY.md`, not as a single number.

> [pt]
> Monte e mantenha a comporta de qualidade de código do projeto, configurada para a sua família de frontend. As regras do núcleo são as mesmas em todo projeto; o que muda é com o que se mede cada uma e com qual limiar. Instale um único formatador e um único linter com configuração compartilhada; faça cumprir limites de tamanho por arquivo e por função, complexidade por função, duplicação, código morto, dependências declaradas e usadas, verificação de tipos onde a linguagem permitir, cobertura com catraca e varredura de segredos. Onde o projeto tiver usuários reais, agregue testes de mutação restritos às linhas mudadas e registre o escore por bloco. Depois estenda a comporta ao front: nenhuma regra de negocio dentro de uma tela, um único cliente tipado para toda chamada ao servidor, um só lugar para o estado compartilhado, nenhum texto visível fora do catálogo de traduções, identificador estável e papel em todo elemento interativo, estilos só por tokens e verificação automática de acessibilidade básica. Cada regra tem identificador estável, severidade (bloqueia, avisa, registra) e verificador nomeado. Os limiares e as exceções os declara o dono em um arquivo de configuração; uma regra apagada sem exceção escrita é um fracasso da comporta, não uma decisão. Reporte o resultado por regra em `docs/CODE_QUALITY.md`, não como um número único.

**Usabilidade.**

> Build the usability criteria for this project before writing the first screen, and enforce them where the method already has hooks. Group functionality by what the person came to do, never by the internal module or the data entity: every menu group is named with a user job in the project glossary, every functionality has exactly one canonical home, no functionality is orphaned, and every group is reachable in no more than three steps from the entry screen. Then declare accessibility in one matrix and derive everything from it: each functionality lists the profiles that have it, each functionality has at least one profile, each profile has at least one functionality and its own entry point, the navigation is generated from the matrix instead of written by hand, and every route checks the permission on the server because hiding an entry is not protecting it. Verify the matrix per profile with an end-to-end check that compares what is reachable with the matrix row: neither less nor more. Require the four states on every list (with data, empty, loading, error), a visible working indicator with the option to cancel long operations, an error message that says what happened and what to do without losing entered data, a primary action per screen, confirmation or undo for destructive actions, and a form that keeps what was typed. Run each manual test case once per affected profile, run the first-click check at the close of every block, and require a real screenshot of the test environment on every item that touches a screen. Record the result per rule, with owner-declared exceptions, in `docs/USABILITY.md`, and keep the matrix in `docs/PROFILE_MATRIX.md` as the single source of truth.

> [pt]
> Monte os critérios de usabilidade do projeto antes de escrever a primeira tela, e faça-os cumprir onde o método já tem enganches. Agrupe as funcionalidades pelo que a pessoa veio fazer, nunca pelo módulo interno nem pela entidade de dados: cada grupo do menu se nomeia com um trabalho do usuário no glossário do projeto, cada funcionalidade tem exatamente uma casa canônica, nenhuma fica órfã e todo grupo se alcanca em no máximo três passos desde a tela de entrada. Depois declare a acessibilidade em uma única matriz e derive tudo dela: cada funcionalidade enumera que perfis a tem, cada funcionalidade tem ao menos um perfil, cada perfil tem ao menos uma funcionalidade e um ponto de entrada próprio, a navegação se gera desde a matriz em vez de se escrever a mão, e toda rota verifica a permissão do lado do servidor porque esconder uma entrada não é protegê-la. Verifique a matriz por perfil com um teste ponta a ponta que compare o alcançável contra a linha da matriz: nem menos nem mais. Exija os quatro estados em toda lista (com dados, vazia, carregando, com erro), um indicador visível de trabalho em curso com opção de cancelar o longo, uma mensagem de erro que diga o que passou e o que fazer sem perder o carregado, uma ação principal por tela, confirmação ou desfazer nas ações destrutivas e um formulário que conserve o escrito. Rode cada caso de teste manual uma vez por perfil afetado, rode o teste do primeiro clique no fechamento de cada bloco e exija uma captura real do ambiente de teste em todo pendente que toque uma tela. Registre o resultado por regra, com as exceções declaradas pelo dono, em `docs/USABILITY.md`, e mantenha a matriz em `docs/PROFILE_MATRIX.md` como fonte única de verdade.

## 9. O que esta proposta não faz

- **Não agrega um passo.** São quarenta e cinco regras transversais (18 de qualidade e 27 de usabilidade), não uma etapa nova. Penduram-se nos passos que já existem.
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

### Fechado em D-048, e as duas correções que arrasta

As duas perguntas que travavam a escrita dos prompts já estão respondidas: a 1 ficou na linha 5 e a 2 na linha 6. Mas a recomendação que se aprovou tinha dois erros de fato, e ficam escritos aqui para que não voltem:

1. **O defeito da contagem.** Onde este anexo dizia "vinte e sete regras" o número correto é **quarenta e cinco**: 18 de qualidade (CQ-01 a CQ-18) e 27 de usabilidade (UX-01 a UX-27). A cifra velha vinha de um rascunho que só contava a metade. Corrigido nas seções 6 e 9 e anotado em D-048; o texto de D-044 se conserva tal como se escreveu, porque uma decisão é um registro e não se reescreve.
2. **O formatador, o linter, o tamanho e a complexidade não se afrouxam.** Uma versão anterior desta recomendação os mandava a "avisa" para não travar projetos com dívida herdada. Não pode ser: o passo 9 já os bloqueia hoje, e esta extensão o estende, não o substitui. A dívida herdada se resolve com exceção declarada - com motivo e data de revisão - ou com a linha de base da catraca, não baixando a severidade da regra.

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

**O que não entra na conta.** O que só pode julgar uma pessoa - o teste do primeiro clique (UX-07), o teste de tarefa (UX-06), a captura (UX-27) e todos os casos manuais - se registra como passado ou falhado, por bloco, com nome e data, e se reporta a parte como cobertura de verificação humana. Não entra na porcentagem de cumprimento. Se se misturam, o resultado é um número que é sessenta por cento medição e quarenta por cento opinião, e ninguém pode dizer qual é qual. Por isso a seção 9 segue valendo: o painel não inventa uma nota de usabilidade, conta regras.

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
