# Urazuke — o método da evidência

*Urazuke* (裏付け) é uma palavra japonesa que nomeia o respaldo que uma afirmação tem: o que a
sustenta por trás. O verbo, *urazukeru*, é "respaldar com provas". Esse é o método.

Um método para construir software com inteligência artificial que saia robusto, pronto para
produção, **sem que o dono do projeto precise ler uma única linha de código**. Destilado de três
sistemas reais que hoje estão em produção, com os tropeços incluídos.

Esta pasta contém a versão em português do método. O espanhol é a fonte da verdade; se as duas
versões discordarem, a espanhola vale e a portuguesa é corrigida.

## A tese em uma frase

A IA não interrompe o método: ela o continua. A indústria deixou de confiar no autor do código há
vinte anos e aprendeu a exigir evidência em vez de lê-lo; o modelo é o próximo autor, não o
primeiro em quem não se confia. A única coisa genuinamente nova é que esse autor também fabrica a
evidência, e por isso a evidência precisa provar a si mesma.

## O que há aqui

| Arquivo | O que é |
|---|---|
| `ESCALERA_METODOLOGICA.md` | O documento principal: a tese, o levantamento dos três repositórios de origem (momentos e marcos com seus commits), os dezesseis degraus da escada com sua ficha, as falhas reais mapeadas aos degraus, o que ainda falta, e o glossário. |
| `peldanos/peldano-NN-*.md` | O contrato de cada degrau: contexto necessário, os prompts (em inglês, fonte única, idênticos em todos os idiomas), o resultado esperado, a verificação de completude e os sinais de alerta. É o que um aluno executa e o que depois se exporta ao Forge. |
| `peldanos/README.md` | O índice dos contratos, com a fase de cada um. |
| `MANUAL_CURSO.md` | O curso: dezesseis lições, uma por degrau, com o conceito explicado, a tarefa prática passo a passo com os prompts, a verificação de completude, a entrega, os erros típicos e o exemplo no projeto-guia ("Turnera"). Termina com a lista de saída para produção. |

O registro de decisões (`../DECISIONES.md`) fica apenas em espanhol, porque cita as palavras
textuais do dono.

## Como ler

Comece pelo `ESCALERA_METODOLOGICA.md`, ou pelo seu HTML em `../html/pt/`. Se encontrar uma
palavra estranha, o glossário está no final. Depois, o contrato do degrau que interessar.

## Idiomas

O espanhol é a fonte da verdade. A documentação existe nos oito idiomas do NAC3 (espanhol,
inglês, português, francês, alemão, italiano, japonês e chinês). Os prompts para o modelo são uma
única peça em inglês, idêntica em todas as versões, explicada no idioma do leitor. O nome não se
traduz; o subtítulo sim: *el método de la evidencia*, *the evidence method*, *o método da
evidência*, *la méthode de la preuve*, *die Nachweis-Methode*, *il metodo del riscontro*,
裏付けの方法, 验证方法.

## Licença e como contribuir

O método é publicado sob **Creative Commons Atribuição-CompartilhaIgual 4.0** (`../../LICENSE`):
pode-se usar, traduzir e adaptar, com atribuição e sob a mesma licença. As melhorias a **este**
repositório entram por pull request a partir de um fork, com sua evidência, e são integradas por
um mantenedor depois de revisá-las; ninguém mais escreve em `main`. O processo está em
`../../CONTRIBUTING.md`.

Os clientes dos sistemas de origem estão anonimizados ("o Plano de Saúde", "a Associação"); os
números, as datas e os commits são reais.

## Origem

Pablo Kuschnirof (RPAForce / Yujin) e Sumi (a sessão do Claude Code que trabalha com ele), a partir
de `yujin-forge`, `Autorizações` e `Kikan`. Outubro de 2026.
