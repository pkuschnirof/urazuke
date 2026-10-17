# Passo 13 — Integração contínua, ambientes, segredos e implantação como parte do produto (contrato do degrau)

**Fase:** operação (monta-se sobre o esqueleto do degrau 4; revisa-se a cada mudança de
infraestrutura).
**Forma:** um disparo para montar; rotina para cada implantação.
**Tamanho:** obrigatório em todo projeto com usuários. Num pequeno, "integração contínua" pode ser
uma única ação do GitHub e "ambientes" podem ser duas pastas no mesmo servidor; o que não se
negocia é que os testes rodem sozinhos, que a configuração não esteja no repositório, e que haja
caminho de volta.

## Para que serve

Para que chegar à produção seja um pacote reproduzível: os testes rodam UMA vez, a configuração
vive fora do repositório, e os segredos não ficam circulando. Evita os testes rodando três vezes por
commit (2.000 minutos de cota em 16 dias), a chave do banco impressa numa transcrição, o CORS que só
conhecia o primeiro domínio, e a configuração sobrescrita pela bateria de testes.

Sobre os segredos há uma regra que convém adotar como reflexo, sem exceções: **um segredo que foi
visto num chat, num log ou num commit já não é um segredo**. Não importa se "ninguém viu" ou se
"foi apagado depois". Rotaciona-se. A rotação custa dez minutos; descobrir se alguém o usou é
impossível.

## 1. Contexto necessário

- **Levantamento de ambientes e acessos**, de forma genérica: que ambientes há (teste, produção),
  onde rodam, quem tem acesso, como se promove algo de um para outro, que segredos existem e onde
  vivem hoje, quanta cota de integração contínua há. O agente avalia se é suficiente e pergunta.
- O esqueleto com sua integração contínua e sua implantação no ambiente de teste (degrau 4).

## 2. Prompts

**Inicial:**

> We are going to close the path to production. Read the environments and access survey.
> Evaluate whether you have what is needed to deploy to production safely (access, domain,
> where the secrets live, how to roll back); if anything is missing, ask me. Then set up: (1)
> continuous integration runs the full test suite exactly once per commit; (2) the deployment
> waits for that run's result and only packages and uploads, without running tests again; (3)
> each environment's configuration lives on the server (environment file or vault), never in the
> repository; (4) a written procedure to promote from the test environment to production, which
> can be run twice without breaking anything; (5) the rollback, tested; (6) an automatic check
> that prevents committing a secret. Document all of it in `docs/DEPLOYMENT.md` so that a person
> can do it by hand without you. Reply in my language.

O que estamos pedindo, cláusula por cláusula: os acessos antes de começar; os testes **uma única
vez** por commit (rodá-los três vezes foi o que queimou a cota); a implantação que só empacota; a
configuração fora do repositório; a promoção como procedimento repetível; o caminho de volta
**provado** (um caminho de volta que nunca foi provado não existe); o cadeado contra segredos em
commits; e a documentação para uma pessoa, que é o degrau 14 aplicado à infraestrutura.

**Rotina de cada implantação:**

> Before touching production: the test environment is green with the same version; the
> rollback is ready; and tell me what changes in the configuration. After deploying: show me
> the version running in production and an end-to-end check on production, read-only.

O que estamos pedindo: as três condições prévias (teste em verde com a mesma versão, caminho de
volta pronto, mudanças de configuração anunciadas) e as duas evidências posteriores (a versão
rodando e uma prova de ponta a ponta sem escrever nada).

**Se um segredo apareceu no chat ou num commit:**

> That secret is compromised: rotate it now, tell me everywhere else it was used, and add the
> check that would have caught it.

O que estamos pedindo: rotação imediata, inventário de onde mais estava, e a verificação que o teria
detectado, para que da próxima vez não chegue ao chat.

## 3. Resultado esperado

- A integração contínua rodando uma única vez por commit, com o link para uma execução.
- A implantação que espera a integração e só empacota; medido: quanto demora antes e depois.
- A configuração fora do repositório; no repo, só um exemplo sem valores.
- `docs/DEPLOYMENT.md`: como implantar, promover e voltar atrás, passo a passo, para uma pessoa.
- O caminho de volta provado pelo menos uma vez, com sua evidência.
- A verificação anti-segredos ativa (uma tentativa de subir um, rejeitada).
- Um registro da cota de integração contínua consumida por mês.

## 4. Verificação de completude

- Quantas vezes roda a bateria por commit? Tem que ser uma. Peça o link.
- Há algum valor de configuração real (uma chave, uma senha, uma URL interna) no repositório?
  Peça ao agente que busque e mostre a busca vazia.
- Você conseguiria seguir `docs/DEPLOYMENT.md` sozinho, sem o agente? Leia com essa pergunta.
- O caminho de volta foi provado? Quando? Que evidência há?
- Colou-se algum segredo no chat durante o projeto? Se sim, foi rotacionado?
- Você sabe quanta cota de integração contínua resta este mês?

## 5. Sinais de alerta

- A implantação em produção é feita "à mão, rápido, porque é uma mudança pequena". As mudanças
  pequenas são as que quebram a produção, porque ninguém as testa.
- O arquivo de exemplo de configuração tem valores que parecem reais. Provavelmente são.
- Ninguém sabe dizer quando foi a última vez que se provou o caminho de volta.
