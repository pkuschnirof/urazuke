# Urazuke — 验证方法

*Urazuke*（裏付け）是一个日语词，指一个断言所拥有的依据：从背后支撑它的东西。动词
*urazukeru* 的意思是"用证据支撑"。这就是这个方法。

一种用人工智能构建软件的方法，产出的软件稳健、可投入生产，而且**项目的所有者不必读一行
代码**。我从三个如今正在生产环境运行的真实系统中把它提炼出来，一边靠的是一直以来的系统
工程，一边靠的是那些系统让我看到的、模型在哪些地方把这门工程应用得很脆弱。

作者：Pablo Kuschniroff，由 Claude Code 辅助。以 Creative Commons BY-SA 4.0 发布。
公开展示：[yujin.app/urazuke](https://yujin.app/urazuke/)。

本文件夹是方法的中文版。西班牙语是事实来源；若两个版本有出入，以西班牙语版为准，并修正
中文版。

## 一句话的论点

AI 没有中断方法：它延续了方法。业界在二十年前就不再信任代码的作者，并学会了索要证据而不
是读代码；模型是下一位作者，而不是第一位需要被怀疑的作者。唯一真正新的东西是，这位作者
也制造证据，因此证据必须证明它自己。

## 这里有什么

| 文件 | 是什么 |
|---|---|
| `ESCALERA_METODOLOGICA.md` | 主文档：论点、方法从哪里来、时间线（每级台阶何时登、台阶之间发生什么：基础设施、CI/CD、需求摄入、开发、端到端测试、人工查看、人工测试）、附卡片的二十四级台阶（最后六级是运维质量：可观测性、持久化、漏洞、性能，以及两个监控）、尚待完成的事项，以及术语表。 |
| `EVOLUTIVO_CORRECTIVO.md` | 针对一个已经存在、而且不是用方法诞生的系统的路：方法的三个使用场景、不重写地规范化的原则、八个规范化站点（N0 到 N7）及其契约和提示词、纠正模式与演进模式的循环，以及这个阶段的出口清单。 |
| `REFERENCIAS.md` | 方法背后的真实案例，编号（"Ref. N"），附日期和证据，让流程保持干净、细节一点即达。包含三个系统的年表和按台阶划分的故障表。 |
| `peldanos/peldano-NN-*.md` | 每级台阶的契约：时机、所需上下文、英文提示词及其翻译，以及每条提示词前面的"发送提示词之前"方框，列出你必须亲手构建的文件及其内容；预期结果、不读代码即可完成的完整性检验、警报信号。 |
| `peldanos/README.md` | 契约索引。 |
| `MANUAL_CURSO.md` | 课程：日程、二十四节课，附实践任务和提示词、引导项目（"Turnera"）、上线生产清单。 |
| `MANUAL_CURSO_EVOLUTIVO.md` | 课程的第 2 部分：继承来的引导项目（"继承来的 Turnera"），十节课（N0 到 N7、R1 和 R2），先把一个遗留系统规范化，然后再纠正它、让它演进。 |
| `../DECISIONES.md` | 项目的决策，附日期和原话。方法应用于它自己。 |
| `TRABAJO_COLABORATIVO.md` | 当多名开发者、每人带着自己的代理、在同一个分支上工作时，方法怎么用：共享分支的七条规则、台阶怎么分配，以及提示词。 |
| `CAPACITACION_JUNIOR.md` | 方法对初级开发者培养的影响：哪些重点失去分量、哪些获得分量，以什么目标、怎样在手工编程时代之后培训一个初级。 |
| `../PLAN_CURSO_MENTORING.md` | 课程与辅导的商业计划草案。 |
| `../html/` | 便于阅读的 HTML 版本，带翻译每条提示词的按钮。不手工编辑。 |
| `../../build/` | markdown 到 HTML 的转换器、提示词的提取与检验器，以及组装一切的脚本。 |
| `../../prompts/` | 从契约中提取的英文提示词，自动生成；不手工编辑。 |

## 如何阅读

从 `ESCALERA_METODOLOGICA.md` 开始，或者从 `../html/zh/` 中的 HTML 版开始。遇到陌生的词，术
语表在末尾。然后读你感兴趣的那级台阶的契约，想要应用的话再读课程手册。如果你手上的不是一个空
文件夹，而是一个已经在跑、需要纠正或者让它成长的系统，那条路是 `EVOLUTIVO_CORRECTIVO.md` 和
手册的第 2 部分。

## 如何重新生成 HTML

```
node build/build.mjs
```

它检验英文提示词在八个版本中完全一致（契约里的那些和演进-纠正之路里的那些），并为每种语言生
成 `ESCALERA_METODOLOGICA.html`、`REFERENCIAS.html`、`EVOLUTIVO_CORRECTIVO.html`、
`MANUAL_CURSO.html`、`MANUAL_CURSO_EVOLUTIVO.html`、`CAPACITACION_JUNIOR.html`、
`TRABAJO_COLABORATIVO.html` 和 `CONTRATOS_DE_PELDANO.html`（西班牙语在 `docs/html/`，其余在
`docs/html/<语言>/`）。

## 语言

西班牙语是事实来源。文档存在于 NAC3 的八种语言中：西班牙语（`docs/`）、英语（`docs/en/`）、葡
萄牙语（`docs/pt/`）、法语（`docs/fr/`）、德语（`docs/de/`）、意大利语（`docs/it/`）、日语
（`docs/ja/`）和中文（`docs/zh/`）。每个文件夹都有自己的 README、主文档、参考资料、二十四份契
约、演进-纠正之路，以及课程手册的两个部分。给模型的提示词是英文的单一原件，在所有版本中完全相
同，旁边附有文档语言的翻译；如果某个翻译改动了它们，`node build/prompts.mjs --check` 会失败。
名字不翻译；副标题翻译：*the evidence method*、*o método da evidência*、*la méthode de la
preuve*、*die Nachweis-Methode*、*il metodo del riscontro*、裏付けの方法、验证方法。

决策记录（`../DECISIONES.md`）和课程计划只保留西班牙语，因为它们逐字引用了原话。

## 许可与如何贡献

本方法以 **知识共享 署名-相同方式共享 4.0** 许可（`../../LICENSE`）发布：可以使用、翻译和
改编，只要署名并采用相同许可。对**本**仓库的改进通过从 fork 发起的 pull request 提交，附带
其证据，经审查后由维护者合并；其他任何人都不写入 `main`。流程见 `../../CONTRIBUTING.md`。
方法的第 23 级台阶要求每次复盘都以一条对梯子的具体修改提案收尾；那就是预期的贡献方式。

源系统的客户已匿名化（"互助会"、"协会"）；数字、日期和提交记录是真实的。

公开仓库：[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke)。

## 本项目的文风

与我其余的仓库不同，而且是有意为之：第一人称、把事情讲清楚的散文、日常语言，以及一份收录
每个缩写和每个口语表达的术语表。它是写给没有经历过这些项目的人的。见 `../../CLAUDE.md`。
