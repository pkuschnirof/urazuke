# Urazuke — o método da evidência

*Urazuke* (裏付け) é uma palavra japonesa que nomeia o respaldo que uma afirmação tem: o que a
sustenta por trás. O verbo, *urazukeru*, é "respaldar com provas". Esse é o método.

Um método para construir software com inteligência artificial que saia robusto, pronto para
produção, **sem que o dono do projeto precise ler uma única linha de código**. Eu o destilei de
três sistemas reais que hoje estão em produção, apoiado na engenharia de sistemas de sempre e no
que esses sistemas me mostraram sobre onde os modelos a aplicam de maneira frágil.

Autor: Pablo Kuschniroff, assistido por Claude Code. Publicado sob Creative Commons BY-SA 4.0.
Apresentação pública: [yujin.app/urazuke](https://yujin.app/urazuke/).

Esta pasta contém a versão em português do método. O espanhol é a fonte da verdade; se as duas
versões discordarem, a espanhola vale e a portuguesa é corrigida.

## A tese em uma frase

A IA não interrompe o método: ela o continua. A indústria deixou de confiar no autor do código há
vinte anos e aprendeu a exigir evidência em vez de lê-lo; o modelo é o próximo autor, não o
primeiro em quem não se confia. A única coisa nova é que esse autor também fabrica a evidência, e
por isso a evidência precisa provar a si mesma.

## O que há aqui

| Arquivo | O que é |
|---|---|
| `ESCALERA_METODOLOGICA.md` | O documento principal: a tese, de onde sai o método, a linha do tempo (quando se sobe cada degrau e o que acontece no meio: infraestrutura, CI/CD, ingestão de requisitos, desenvolvimento, testes de ponta a ponta, vista humana, testes humanos), os vinte e quatro degraus com sua ficha (os seis últimos, de qualidade operacional: observabilidade, persistência, vulnerabilidades, desempenho, e os dois monitoramentos), o que falta, os trabalhos relacionados (o que existe de parecido no mundo e em que este método se distingue), e o glossário. |
| `EVOLUTIVO_CORRECTIVO.md` | O caminho para um sistema que já existe e não nasceu com o método: os três casos de uso do método, o princípio de normalizar sem reescrever, as oito estações de normalização (N0 a N7) com os seus contratos e prompts, o ciclo em modo corretivo e evolutivo, e a lista de saída do trecho. |
| `REFERENCIAS.md` | Os casos reais por trás do método, numerados ("Ref. N"), com data e evidência, para que os procedimentos fiquem limpos e o detalhe continue a um clique. Inclui as cronologias dos três sistemas e a tabela de falhas por degrau. |
| `peldanos/peldano-NN-*.md` | O contrato de cada degrau: quando, contexto necessário, prompts em inglês com sua tradução e, antes de cada um, o bloco "Antes de enviar o prompt" com os arquivos que você tem que construir e o seu conteúdo; resultado esperado, verificação de completude sem ler código, sinais de alerta. |
| `peldanos/README.md` | O índice dos contratos. |
| `MANUAL_CURSO.md` | O curso: calendário, vinte e quatro lições com tarefas práticas e prompts, projeto-guia ("Turnera"), lista de saída para produção. |
| `MANUAL_CURSO_EVOLUTIVO.md` | A parte 2 do curso: o projeto-guia herdado ("Turnera herdada"), dez lições (N0 a N7, R1 e R2) para normalizar um legado e depois corrigi-lo e evoluí-lo. |
| `../DECISIONES.md` | As decisões do projeto, com data e palavras textuais. O método se aplica a si mesmo. Fica apenas em espanhol. |
| `TRABAJO_COLABORATIVO.md` | Como se aplica o método quando vários desenvolvedores, cada um com o seu agente, trabalham sobre o mesmo ramo: as sete regras do ramo compartilhado, como se repartem os degraus, e os prompts. |
| `CAPACITACION_JUNIOR.md` | O impacto do método na formação dos desenvolvedores júnior: que focos perdem peso, quais ganham, com que objetivo e como capacitar um júnior na era posterior à programação à mão. |
| `../PLAN_CURSO_MENTORING.md` | O rascunho do plano comercial do curso e do mentoring. Fica apenas em espanhol. |
| `../html/pt/` | As versões HTML para leitura confortável, com o botão que traduz cada prompt. Não se editam à mão. |
| `../../build/` | O conversor de markdown para HTML, o extrator e verificador de prompts, e o script que monta tudo. |
| `../../prompts/` | Os prompts em inglês extraídos dos contratos, gerados; não se editam à mão. |

## Como ler

Comece pelo `ESCALERA_METODOLOGICA.md`, ou pelo seu HTML em `../html/pt/`. Se encontrar uma
palavra estranha, o glossário está no final. Depois, o contrato do degrau que lhe interessar, e o
manual do curso se quiser aplicá-lo. Se o que você tem não é uma pasta vazia e sim um sistema que
já roda e é preciso corrigir ou fazer crescer, o caminho é `EVOLUTIVO_CORRECTIVO.md` e a parte 2
do manual.

## Como regenerar os HTML

```
node build/build.mjs
```

Verifica que os prompts em inglês sejam idênticos nas oito versões (os dos contratos e os do
caminho evolutivo-corretivo) e produz, para cada idioma, `ESCALERA_METODOLOGICA.html`,
`REFERENCIAS.html`, `EVOLUTIVO_CORRECTIVO.html`, `MANUAL_CURSO.html`,
`MANUAL_CURSO_EVOLUTIVO.html`, `CAPACITACION_JUNIOR.html`, `TRABAJO_COLABORATIVO.html` e
`CONTRATOS_DE_PELDANO.html` (o espanhol em `docs/html/`, os demais em `docs/html/<idioma>/`).

## Idiomas

O espanhol é a fonte da verdade. A documentação existe nos oito idiomas do NAC3: espanhol
(`docs/`), inglês (`docs/en/`), português (`docs/pt/`), francês (`docs/fr/`), alemão (`docs/de/`),
italiano (`docs/it/`), japonês (`docs/ja/`) e chinês (`docs/zh/`). Cada pasta tem seu README, o
documento principal, as referências, os vinte e quatro contratos, o caminho evolutivo-corretivo e as
duas partes do manual-curso. Os prompts para o modelo são uma única peça em inglês, idêntica em
todas as versões, com sua tradução ao idioma do documento ao lado;
`node build/prompts.mjs --check` falha se uma tradução os alterou. O nome não se traduz; o
subtítulo sim: *the evidence method*, *o método da evidência*, *la méthode de la preuve*, *die
Nachweis-Methode*, *il metodo del riscontro*, 裏付けの方法, 验证方法.

As decisões (`docs/DECISIONES.md`) e o plano do curso ficam apenas em espanhol porque citam
palavras textuais.

## Licença e como contribuir

O método é publicado sob **Creative Commons Atribuição-CompartilhaIgual 4.0** (`../../LICENSE`):
pode-se usar, traduzir e adaptar, com atribuição e compartilhando sob a mesma licença. As
melhorias a **este** repositório entram por pull request a partir de um fork, com sua evidência, e
são integradas por um mantenedor depois de revisá-las; ninguém mais escreve em `main`. O processo
está em `../../CONTRIBUTING.md`. O degrau 23 do método pede que cada retrospectiva termine numa
proposta concreta de mudança à escada; essa é a forma esperada de contribuir.

Os clientes dos sistemas de origem estão anonimizados ("o Plano de Saúde", "a Associação"); os
números, as datas e os commits são reais.

## Estilo deste projeto

Diferente do resto dos meus repositórios, e de propósito: primeira pessoa, prosa explicada,
linguagem de todos os dias, caracteres latinos com acentos e cedilhas, e um glossário para cada
sigla e cada expressão coloquial. Está escrito para pessoas que não viveram os projetos. Ver
`CLAUDE.md`.
