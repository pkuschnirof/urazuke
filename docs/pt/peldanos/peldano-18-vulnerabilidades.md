# Passo 18 — Varredura e solução de vulnerabilidades, na cadeia e com calendário (contrato do degrau)

**Fase:** saída para produção.
**Quando:** na fase de saída para produção, depois do 15 (a varredura roda na integração
contínua) e antes da primeira implantação: nenhum P0 aberto se promove. Depois, em cada push, e
com um calendário próprio (semanal) ainda que não haja pushes, porque as vulnerabilidades novas
aparecem sem que você mude nada. Num legado, a primeira rodada é parte de N3 (a dimensão de
segurança da auditoria) e os achados entram no backlog com a sua marca de velocidade.
**Forma:** um único disparo para montar e rodar; depois, automático, com um relatório que você lê.
**Tamanho:** obrigatório em todo projeto que vá ter usuários: a varredura de dependências e de
segredos não se negocia; a análise estática e a linha base de configuração, proporcionais.

## Para que serve

A auditoria do degrau 13 olha o sistema com olhos frescos de vez em quando; este degrau olha uma
só coisa, a segurança, o tempo todo e por máquina. São complementares: a auditoria encontra o que
exige critério (uma porta de administrador que ninguém deveria ter
[Ref. 40](../REFERENCIAS.md#ref-40)); a varredura encontra o que exige constância (a dependência que
ontem não tinha uma vulnerabilidade conhecida e hoje tem [Ref. 41](../REFERENCIAS.md#ref-41)). A
primeira auditoria de segurança formal me convenceu de que a segurança é uma rotina periódica e
não uma lista que se marca uma vez [Ref. 23](../REFERENCIAS.md#ref-23); este degrau é essa rotina
feita máquina.

E uma regra que quero escrita: **uma atualização de dependência é uma mudança**, e entra pelo
ciclo como qualquer outra. "Subi a versão para fechar a vulnerabilidade" sem regressão nem ponta
a ponta é a forma mais comum de quebrar a produção numa sexta-feira.

**Se você está começando.** Uma *vulnerabilidade* é um defeito que alguém pode usar para entrar,
roubar dados ou fazer com que o sistema faça algo que não deveria. Há quatro tipos que este
degrau busca por máquina. Nas *dependências*: as peças de software de terceiros que o seu sistema
usa (há bases públicas que listam quais têm defeitos conhecidos, identificados com um número
CVE). No *código*: a *análise estática* lê o código sem executá-lo buscando padrões perigosos,
como uma *injeção* (que um usuário escreva num formulário algo que o banco interprete como uma
ordem). No *histórico*: um segredo (uma senha, uma chave) que alguma vez foi guardado no
repositório continua lá mesmo que depois tenha sido apagado. E na *configuração*: portas abertas
que não eram necessárias, senhas padrão, *cabeçalhos de segurança* (instruções que o servidor
manda ao navegador para protegê-lo) que faltam.

## 1. Contexto necessário

O que segue é a lista genérica. Os arquivos concretos que você tem que ter prontos antes de cada
prompt, com seu conteúdo e seu estado mínimo, estão na seção 2, no bloco "Antes de enviar o
prompt" que precede cada um.

- A integração contínua (degrau 4 e 15), onde roda a varredura.
- O levantamento de ambientes: que servidor, que contêiner, que portas, para a linha base de
  configuração.
- A auditoria anterior (11, ou N3), para não reportar o que já é conhecido.
- O seu critério sobre o que é P0: o que permite entrar, o que expõe dados pessoais, o que
  permite cobrar ou enviar sem controle.

## 2. Prompts

**Inicial (montar, rodar, propor):**

**Antes de enviar o prompt**, isto tem que existir, e quem faz é você (ou o negócio com você), não
o agente:

- A integração contínua rodando em cada push (degrau 4 e 15), com cota suficiente: a varredura
  acrescenta minutos por rodada; descubra quantos lhe restam.
- `docs/ENVIRONMENTS_SURVEY.md` com o servidor, o contêiner se houver, as portas expostas e quem
  administra o domínio, para que o agente saiba que linha base aplicar.
- `docs/AUDIT_[data].md` (degrau 13 ou N3), para que não reporte o conhecido.
- O seu critério de P0 em duas linhas, para o vazio do prompt. Para a maioria dos sistemas: o que
  permite entrar sem credencial, o que expõe dados pessoais, o que permite cobrar, enviar ou
  apagar sem controle.
- Acesso de leitura do agente ao servidor para a linha base de configuração; se você não o der,
  essa parte fica como não varrida, e ele tem que dizê-lo.
- Estado mínimo aceitável: a integração contínua roda, você sabe a cota, e escreveu o que é P0.

> We are going to scan this system for vulnerabilities and fix what matters before production.
> Set up, in continuous integration, on every push and also on a weekly schedule: (1) a scan of
> every dependency against the known vulnerability databases; (2) static analysis of the code for
> the common classes of defect (injection, insecure deserialization, path traversal, weak
> cryptography, hard-coded secrets, insecure defaults); (3) a secrets scan over the whole
> repository history; (4) a check of the server and container configuration against a baseline
> (exposed ports, default credentials, permissions, security headers, transport encryption). Run
> all of it now and write `docs/SECURITY_[date].md` with every finding: where, the risk, the
> evidence, the priority (P0 must be fixed now by my criteria: [criteria]; P1 before production;
> P2 when possible), and whether a fix exists (an upgrade, a patch, a configuration change). If a
> part cannot be scanned from where you are, say so and mark it as not scanned; do not pass it as
> clean. Then propose the fixes for every P0 and P1, one pending item each. Do not apply any
> upgrade yet: an upgrade is a change and goes through the full routine.
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
> Vamos varrer este sistema em busca de vulnerabilidades e corrigir o que importa antes da
> produção. Monte, na integração contínua, em cada push e também com um calendário semanal: (1)
> uma varredura de cada dependência contra as bases de vulnerabilidades conhecidas; (2) análise
> estática do código para as classes comuns de defeito (injeção, desserialização insegura,
> percurso de caminhos, criptografia fraca, segredos escritos no código, valores padrão
> inseguros); (3) uma varredura de segredos sobre todo o histórico do repositório; (4) uma
> verificação da configuração do servidor e do contêiner contra uma linha base (portas expostas,
> credenciais padrão, permissões, cabeçalhos de segurança, cifragem do transporte). Rode tudo
> agora e escreva `docs/SECURITY_[data].md` com cada achado: onde, o risco, a evidência, a
> prioridade (P0 tem que ser corrigido já segundo o meu critério: [critério]; P1 antes da
> produção; P2 quando der), e se existe uma correção (uma atualização, um patch, uma mudança de
> configuração). Se alguma parte não puder ser varrida de onde você está, diga-o e marque-a como
> não varrida; não a dê por limpa. Depois proponha as correções para cada P0 e P1, uma pendência
> cada uma. Não aplique nenhuma atualização ainda: uma atualização é uma mudança e passa pela
> rotina completa.
>
> Quando você precisar de uma decisão minha, peça-a com as quatro partes da UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e nesta ordem: os dados que tornam a pergunta necessária,
> enumerados; um parágrafo de no máximo cinco linhas que os ligue e deixe ver a dúvida; a pergunta
> com as suas respostas possíveis enumeradas; e a sua recomendação. Diga-o na profundidade técnica
> que o projeto declarou em `communication_depth` —`beginner`, `decision_maker` ou `technical`—;
> se o projeto não declarou nenhuma, use `decision_maker`.
>
> Responda no meu idioma.

O que estou pedindo: as quatro camadas de varredura (dependências, código, segredos no histórico,
configuração), na cadeia **e com calendário**, porque as vulnerabilidades novas não esperam o seu
próximo push; o relatório com a forma do degrau 13, com a cláusula de "não varrido" em vez de
"limpo"; o critério de P0 dado por mim; e a proibição de atualizar sem passar pelo ciclo, que é a
que evita a sexta-feira quebrada.

**De fechamento (corrigir e transformar em comporta):**

**Antes de enviar o prompt**, você tem que ter isto à mão:

- `docs/SECURITY_[data].md` lido por você, com dois achados verificados (peça-lhe a evidência).
- A lista de correções aprovadas para o vazio do prompt; para cada atualização de dependência, a
  consciência de que é uma mudança e vai rodar a regressão e a ponta a ponta.
- Estado mínimo aceitável: nenhum P0 sem veredicto.

> Fix [list], each as its own pending item, with its test proved red where a test applies (an
> injection that no longer passes, a header that is now present, a secret that is now refused),
> and with the regression suite and the end-to-end suite green after every upgrade. Run the scan
> again and show me it is clean of P0 and P1. Make the scan a gate in `docs/GATES.md`: nothing is
> promoted to production with an open P0, and a new P1 opens a pending item automatically. Record
> the policy, the schedule and what is not covered in `docs/SECURITY.md`.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [pt]
> Corrija [lista], cada um como pendência própria, com o seu teste provado em vermelho onde um
> teste se aplique (uma injeção que já não passa, um cabeçalho que agora está presente, um
> segredo que agora é recusado), e com a regressão e a bateria de ponta a ponta em verde depois
> de cada atualização. Volte a rodar a varredura e mostre-me que está limpa de P0 e P1. Faça da
> varredura uma comporta em `docs/GATES.md`: nada se promove para produção com um P0 aberto, e um
> P1 novo abre uma pendência automaticamente. Registre a política, o calendário e o que não está
> coberto em `docs/SECURITY.md`.
>
> Quando você precisar de uma decisão minha, peça-a com as quatro partes da UX-28
> (`docs/ANEXO_HEURISTICAS.md`) e nesta ordem: os dados que tornam a pergunta necessária,
> enumerados; um parágrafo de no máximo cinco linhas que os ligue e deixe ver a dúvida; a pergunta
> com as suas respostas possíveis enumeradas; e a sua recomendação. Diga-o na profundidade técnica
> que o projeto declarou em `communication_depth` —`beginner`, `decision_maker` ou `technical`—;
> se o projeto não declarou nenhuma, use `decision_maker`.

O que estou pedindo: uma pendência por correção, com o vermelho do degrau 8 onde é possível (uma
vulnerabilidade corrigida sem teste volta com a próxima refatoração); a varredura repetida como
evidência; e a conversão em comporta, que é o que faz este degrau continuar vivo quando ninguém
olha.

## 3. Resultado esperado

- A varredura em quatro camadas rodando em cada push e semanalmente.
- `docs/SECURITY_[data].md` com os achados e o não varrido; `docs/SECURITY.md` com a política, o
  calendário, a comporta e a cobertura.
- Os P0 e P1 corrigidos, cada um com a sua pendência e o seu teste onde se aplica.
- A comporta em `docs/GATES.md`.

## 4. Verificação de completude

- Peça-lhe o link da última rodada da varredura: está em verde, e de que data é?
- O relatório diz o que NÃO varreu?
- Cada P0 tem a sua pendência fechada com evidência, ou aberta com data?
- Peça-lhe que introduza de propósito uma dependência com vulnerabilidade conhecida num ramo: a
  cadeia fica em vermelho?
- Você sabe quando roda a próxima varredura programada?

## 5. Sinais de alerta

- A varredura passou limpa de primeira num sistema com mais de um mês. Quase nunca é verdade:
  falta uma camada, ou varreu-se só o ramo e não o histórico.
- Atualizaram-se dez dependências num commit "para fechar os achados". Esse commit não tem antes
  nem depois; é a sexta-feira quebrada esperando.
- A varredura está lá mas não é comporta: produz relatórios que ninguém lê.
- Há um P0 "aceito" sem pendência, sem data e sem assinatura.
