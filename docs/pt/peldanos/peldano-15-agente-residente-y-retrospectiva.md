# Passo 15 — O agente dentro do sistema, e a retrospectiva com número (contrato do degrau)

**Fase:** operação (quando o sistema já está em produção) e encerramento (volta ao degrau 0 para o
próximo projeto).
**Forma:** duas partes: uma conversa para definir o escopo do agente residente, e um disparo longo
para a retrospectiva.
**Tamanho:** o agente residente é opcional (muitos sistemas não precisam; os que têm usuários que
pedem suporte, sim). A retrospectiva é obrigatória em todo projeto, ainda que seja de uma página:
sem ela o método não aprende.

## Para que serve

Duas coisas que fecham o mesmo ciclo. Primeiro: o agente fica residente em produção, com escopo
delimitado, para diagnosticar, operar e dar suporte sem que o construtor precise estar. Segundo: o
próprio método se revisa com números, e o que se aprende muda a escada. Evita o agente operando sem
mapa do sistema, e o método que se repete igual projeto após projeto sem aprender (a equipe
multiagente foi encerrada com uma retrospectiva: 60 dólares e 73 minutos contra 90 minutos).

Sobre o agente residente, a regra que ordena tudo: **age em nome de alguém**. Sua credencial está
mapeada a uma pessoa responsável, e tudo o que faz fica registrado em nome dessa pessoa. Não é uma
conta de sistema anônima: é um empregado com chefe. Isso define seu escopo (o que essa pessoa
autorizou) e sua rastreabilidade (quem responde pelo que fez).

## 1. Contexto necessário

Para o agente residente:
- O que o agente pode fazer em produção e o que não: ler, diagnosticar, mudar configuração,
  executar ações. O dono decide.
- Como o agente se identifica perante o sistema (uma credencial própria, mapeada a uma pessoa
  responsável).
- A quem avisa quando encontra algo que não pode resolver (tickets, e-mail).

Para a retrospectiva:
- Os incidentes do projeto, os custos (tokens, cota, tempo do dono), as pendências que mais voltas
  deram, e as datas.

## 2. Prompts

**Para o agente residente (inicial):**

> We are going to leave you resident in production. First, build the map of the system you will
> need in order to operate it: modules, environments, where each configuration lives, which
> actions are consequential (read `docs/LOCKS.md`), whom to notify. If there are parts of the
> system you cannot see from where you are, tell me; the map must not have hidden gaps. Then
> propose your scope in three levels: read-only and diagnosis; configuration changes with my
> approval; consequential actions behind locks. I choose the level. Your credential acts as the
> person who created it: everything you do is logged under that person's name. Reply in my
> language.

O que estamos pedindo: o mapa do sistema antes de operar (operar sem mapa é a falha que este degrau
evita); a cláusula de completude na sua forma: **as lacunas do mapa se declaram, não se tapam**; os
três níveis de escopo para que o dono escolha um e não um "depende"; e a regra da credencial em
nome de uma pessoa.

**Para o agente residente (de fechamento):**

> Level [X]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the credential (never its
> value), and the procedure to request my approval. Then prove, with a real attempt recorded in
> the log, that something outside your scope is rejected.

O que estamos pedindo: o documento do agente residente (sem o valor da credencial, nunca), e a prova
em vermelho do escopo: uma tentativa real, registrada, de fazer algo fora do nível, rejeitada. É o
degrau 7 aplicado às permissões.

**Para a retrospectiva:**

> [The stage / the project] is over. Do the retrospective with numbers, not impressions: what it
> cost (tokens, quota, my time), how many pending items, which ones took the most rounds and why,
> which incidents happened and which step of the ladder each falls into, and which step failed
> or was missing. If you lack the data for any figure (my time, for instance), ask me for it or
> mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder:
> which step is modified, how, and which incident justifies it. Write it to
> `docs/RETROSPECTIVE_[date].md`. Reply in my language.

O que estamos pedindo: números com fonte (custos, pendências, rodadas, incidentes); cada incidente
mapeado a um degrau, porque um incidente que não cai em nenhum é um degrau que falta; a cláusula de
completude para os números que não tem (perguntar ou marcar como estimado); e **pelo menos uma
proposta concreta de mudança à escada**, porque uma retrospectiva que não muda nada não foi uma
retrospectiva.

## 3. Resultado esperado

- `docs/RESIDENT_AGENT.md`: mapa do sistema, escopo escolhido, credencial mapeada a uma pessoa,
  procedimento de aprovação, e a prova de rejeição registrada no log.
- `docs/RETROSPECTIVE_[date].md`: os números com sua fonte, os incidentes mapeados a degraus, e
  pelo menos uma proposta de mudança à escada com sua justificativa.

## 4. Verificação de completude

- O mapa do sistema diz o que o agente NÃO pode ver? Se não diz, tem lacunas tapadas.
- Você provou (ou viu no log) que uma ação fora do escopo é rejeitada?
- A credencial do agente age em nome de uma pessoa identificável?
- A retrospectiva tem números com fonte, ou adjetivos? ("Custou muito" não é um número.)
- Cada incidente cai num degrau? Se algum não cai em nenhum, falta um degrau: essa é a proposta de
  mudança.
- Há pelo menos uma proposta concreta de mudança à escada? Se a retrospectiva não muda nada, não
  foi uma retrospectiva.

## 5. Sinais de alerta

- O agente residente "precisa" de um nível mais alto de permissões toda semana. Revise se o que
  pede é para resolver problemas do sistema ou para resolver suas próprias limitações.
- A retrospectiva diz que tudo saiu bem. Nunca sai tudo bem; está escrita para o dono, não para o
  método.
- Dois projetos seguidos tiveram o mesmo incidente e a escada não mudou entre um e outro. O degrau
  15 não está sendo fechado: escreve-se a retrospectiva e não se aplica.
