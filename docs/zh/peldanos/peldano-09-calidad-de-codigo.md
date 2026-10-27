# 步骤 9 — 由机器验证的代码质量，带闸门（台阶契约）

**阶段：** 循环。
**时机：** 搭建一次，在开启第一个功能块时（启动阶段一结束就做），从那时起它在每次提交时自己
跑，作为持续集成的闸门；每个待办项都在质量为绿时关闭，在先证红的测试（8）之后、人工测试用例
（10）之前。每个功能块收尾时和每次部署之前，质量报告和所有者一起读。在遗留系统里，第一次运行
就是基线，发现的东西带着速度标记进待办队列。
**形式：** 搭建时一次发送；之后是每次变更的例行和按功能块的阅读。
**规模：** 所有项目在其最低级别上必需（链条里一个 linter 和一条大小限制）；任何有用户的项目都
要完整，变异测试也包含在内。变异测试只在没有真实用户时（一个内部工具、一个没有别人运行的原
型）才保持是可选的加固。

## 用途

所有者不读代码，而这正是本方法的要点。但代码是存在的，总得有人维护它（下一个代理，下一个开发
者），而一份今天能跑、明天没人看得懂的代码，就是会在第三个月被讨回的债。如果没人读它，**那就
得让一台机器来看**：一些工具，在每次提交时测量一个人类评审会看的东西，并把它变成一个带限制的
数字。我在我所有项目里都这么做过，只是没把它命名为一级台阶；而一次质量审计给我退回了一个两千
多行的组件和一个将近一万行的项目文件 [Ref. 41](../REFERENCIAS.md#ref-41)：这两个都过不了一条
写下来的大小限制。静态棘轮——它不让某个质量数字变差 [Ref. 35](../REFERENCIAS.md#ref-35)——就是
我给这级台阶的形式。

由机器测量的东西，按重要性排序：代码遵守唯一的风格（*linter* 和*格式化工具*）；没有任何函数、
没有任何文件超过一个大小；每个函数的*复杂度*保持在一个限制之下；没有重复代码也没有死代码；依
赖都已声明且在使用；测试的*覆盖率*永远不下降（棘轮）；以及，如果语言允许，类型能对得上。这些
没有一样能取代先证红的测试：一份无可挑剔的代码也可能是错的。它避免的是那种正确却再没人能动的
代码。

还有一样东西，我不再把它当成任何有用户的项目里的可选加固：**变异测试**。我在这份文档较早的
版本里把它留成"可选，推荐"，而对这个方法的一次外部评估让我注意到其中的矛盾：如果 F 部分说变
异测试是我所知道的、在 2026 年的研究里唯一把能证明什么的测试和只做装饰的测试区分开的度量，
那就不该把它排除在"完整"之外——偏偏是在那些多一个装饰性测试就会伤到人的项目里。一个工具故意
在代码里植入错误（把"大于"改成"大于或等于"、删掉一行、把一个条件反过来），然后跑测试；每一个测试没抓住的
错误就是一个*存活的变异体*，而被抓住的比例就是分数。这是对第 8 级台阶展示出来的红色的补充
度量：红色证明有一个测试在看守今天的变更；变异衡量的是整个测试套件看守了多少。而且据我所
知，在 2026 年的那些研究里，它是唯一把能证明什么的测试和只做装饰的测试区分开的度量（主文档
的 F 部分）。

**如果你是初学者。** 一个 *linter* 是一个读代码并标出哪里写得不对或有危险的程序（一个没用到的
变量，一个结果永远一样的比较），就像文字处理软件里的拼写检查。一个*格式化工具*把代码按唯一的
风格摆好（缩进、空格），让所有代码看起来像同一只手写的。一个函数的*复杂度*是它能走多少条不同
的路径（每一个"如果"都会增加它）；一个有四十条路径的函数谁也看不懂。*重复代码*是同一段被抄到
两个地方：哪天修好了一个，另一个还是坏的。*覆盖率*是代码里有多大比例被某个测试执行到。而一个
*棘轮*是一种只许变好的机制：今天的数字就是明天的底线。*变异测试*是一个程序，它故意把代码弄
坏，一次一个小改动，然后看有没有哪个测试察觉到；如果一个都没察觉到，那块代码就没有被看守。

## 1. 所需上下文

下面这份是通用清单。你在每条提示词之前必须已经做好的具体文件，连同它们的内容和最低状态，在第
2 节里，在每条提示词前面的"发送提示词之前"方框里。

- 持续集成在每次 push 时都在跑（第 4 级台阶）。
- 第一个功能块已经开启，至少有一个待办项已经构建：没有代码就没有质量可测。
- 你对那些限制的决定，或者愿意接受代理提议的限制并附上理由。
- 之前的审计（13，或遗留系统里的 N3），如果有过。

## 2. 提示词

**初始（搭起闸门）：**

**发送提示词之前**，下面这些必须已经存在，而且是你（或业务方和你一起）来做，不是代理：

- 持续集成在每次 push 时都在跑（第 4 级台阶），以及你还剩多少配额：质量检查会给每次运行加上
  几分钟。
- 第一个功能块里至少有一个待办项已经构建并用第 8 级台阶关闭，这样才有真实的代码可测，而不是
  空的骨架。
- 你对两条限制的决定，写成一行：一个文件和一个函数的最大大小（作为起点，三百行和四十行），以
  及覆盖率是不是只能往上走。其余的由代理提议，你批准。
- 在遗留系统里：`docs/AUDIT_[日期].md`（N3），好让代理不报告已知的东西，并让第一次运行成为
  基线。
- 最低可接受状态：链条在跑，有一个已关闭待办项的代码，而且你写下了那两条限制。

> We are going to make the code quality verified by machine, because nobody is going to read the
> code. Set up, in continuous integration, on every push: (1) a linter and a formatter with one
> configuration for the whole repository, failing the build on any violation; (2) limits on the
> size of every file and every function ([file lines] and [function lines]) and on the complexity
> of every function, failing the build when exceeded; (3) detection of duplicated code and of dead
> code (unused functions, variables, imports, dependencies); (4) a test coverage report with a
> ratchet: the measured coverage of today becomes the floor, and the build fails if it drops; (5)
> type checking if the language allows it. Run all of it now on the current code and write
> `docs/CODE_QUALITY.md` with: the tools, the configuration, every limit with its current measured
> value, and the list of what fails today with where it is. Do not fix anything yet: what fails
> today becomes pending items, and I decide which limits apply now and which are raised with a
> date. Make the whole set a gate in `docs/GATES.md`: nothing is merged with quality red.
>
> Extend this gate to the screen frontier, as Annex H section 4 declares: no
> business rule inside a screen, one typed client for every server call, one
> home for shared state, no user-visible string outside the translation
> catalogue, a stable identifier and role on every interactive element,
> styling only through tokens, and automatic basic accessibility checks.
> Every rule carries its stable id, its severity and its named verifier; the
> thresholds and the exceptions are declared by me in the project
> configuration file, and a rule switched off with no written exception is a
> failure of the gate, not a decision. `docs/CODE_QUALITY.md` and
> `docs/USABILITY.md` report result by result, never as a single number. The
> catalogue is `docs/ANEXO_HEURISTICAS.md`: cite it, do not copy it.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [zh]
> 我们要让代码质量由机器来验证，因为没有人会去读代码。请在持续集成里、在每次 push 时搭起：
> (1) 一个 linter 和一个格式化工具，整个仓库只用一份配置，任何违规都让构建失败；(2) 对每个
> 文件和每个函数的大小（[每文件行数] 和 [每函数行数]）以及每个函数的复杂度设限制，超过就让
> 构建失败；(3) 重复代码和死代码（没用到的函数、变量、导入和依赖）的检测；(4) 一份带棘轮的
> 测试覆盖率报告：今天测得的覆盖率成为底线，一旦下降构建就失败；(5) 如果语言允许，做类型检
> 查。现在就把这一切在当前代码上跑一遍，并写出 `docs/CODE_QUALITY.md`，内容包括：工具、配
> 置、每条限制及其当前实测值，以及今天哪些没通过、它们在哪里的清单。先什么都不要修：今天没
> 通过的东西会变成待办项，而哪些限制现在就生效、哪些带日期再提高，由我来决定。把这一整套做
> 成 `docs/GATES.md` 里的一道闸门：质量为红时什么都不合并。
>
> 把这道理延伸到界面边界，如附录H第4节所声明：界面里不放业务规则；每次调用服务端只有
> 一个带类型的客户端；共享状态只有一个存放处；翻译目录之外不出现任何用户可见的文字；每
> 个可交互元素都有稳定的标识和角色；样式只通过令牌；基本的无障碍自动检查。每条规则都带
> 稳定的编号、严重级别和有名字的验证者；阈值和例外由我在项目配置文件中声明，一条被关掉
> 却没有书面例外的规则属于这道门槛的故障，不是决定。
> `docs/CODE_QUALITY.md` 和
> `docs/USABILITY.md` 逐条报结果，绝不汇成一个数字。目录在
> `docs/ANEXO_HEURISTICAS.md`：引用它，不要复制它。
>
> 用我的语言回答。
>
> 当你需要我做决定时，用 UX-28（`docs/ANEXO_HEURISTICAS.md`）的四个部分来问，并按这个顺序：让这个
> 问题成为必要的数据，列举出来；不超过五行的一段话，把这些数据连起来并让问题显现；问题本身，可能的
> 答案逐一编号；以及你的推荐。用项目在 `communication_depth` 中声明的技术深度来说——`beginner`、`de
> cision_maker` 或 `technical`——；项目没有声明就用 `decision_maker`。

我在要求什么：一个人类评审会做的那五项检查，由机器来做，并且以构建变红作为后果，因为一项不拦
路的检查只是一条建议；限制带着它的实测值，这样限制出自数字而不是出自一种看法；覆盖率的棘轮，
那是让质量不会自己退化的那块零件；以及**先什么都不要修**，因为在一个已经写了代码的系统里，第
一次运行永远是红的，而哪些现在修、哪些带日期容忍，是我的决定。

**例行（放进协作契约）：**

**发送提示词之前**，你手边必须有这些：

- `docs/CODE_QUALITY.md` 你自己读过：每一条限制你都懂它是什么、为什么在那里吗？
- 你对"今天哪些没通过"那份清单的决定：哪些现在就修（每条一个待办项），哪些带日期容忍，写在同
  一个文件里。
- `docs/WORKING_AGREEMENT.md`，这条例行要加进去的地方。
- 最低可接受状态：闸门是绿的，或者每一处红都有待办项或日期。

> Every pending item is closed with the quality gate green: linter, formatter, size and
> complexity limits, no new duplication, no dead code, coverage at or above the ratchet. A quality
> failure is fixed in the same commit, never silenced with an exception, and a limit is never
> raised to pass; if a limit must change, say so with the reason and I decide. At the close of
> every block, show me `docs/CODE_QUALITY.md` with the numbers of the block against the previous
> one.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [zh]
> 每个待办项都在质量闸门为绿时关闭：linter、格式化工具、大小和复杂度限制、没有新的重复、没
> 有死代码、覆盖率等于或高于棘轮。一处质量失败在同一次提交中修好，绝不用例外把它消音，也绝
> 不为了通过而提高某条限制；如果某条限制必须改，说出来并给出理由，由我决定。每个功能块收尾
> 时，给我看 `docs/CODE_QUALITY.md`，用本块的数字对比上一块。
>
> 当你需要我做决定时，用 UX-28（`docs/ANEXO_HEURISTICAS.md`）的四个部分来问，并按这个顺序：让这个
> 问题成为必要的数据，列举出来；不超过五行的一段话，把这些数据连起来并让问题显现；问题本身，可能的
> 答案逐一编号；以及你的推荐。用项目在 `communication_depth` 中声明的技术深度来说——`beginner`、`de
> cision_maker` 或 `technical`——；项目没有声明就用 `decision_maker`。

我在要求什么：质量成为每个待办项收尾的一部分，而不是一件另外的任务；禁止消音（一个模型面对红
色的 linter 时，倾向于加上例外而不是去修，因为那样更快）和禁止把限制调高；以及按功能块的阅
读，那是你唯一会去看这些数字的时刻。

**任何有用户的项目都必需（只在没有真实用户时可选）：变异测试。**

**发送提示词之前**，你手边必须有这些：

- 质量闸门已经搭起并且是绿的，覆盖率已测量并记在 `docs/CODE_QUALITY.md` 里。
- 至少有一个功能块已用第 8 级台阶收尾，这样才有测试可以变异。
- 你对范围的决定，写成一行：全部代码（贵，而且只在一次有意义，作为基线）或者只对每个待办项
  改动的行（常规做法）。
- 最低可接受状态：覆盖率已测量，而且有一个已收尾的功能块。

> Add mutation testing to the quality gate, [on the whole codebase | only on the lines changed by
> each pending item]: a tool that plants small deliberate bugs in the code (a flipped condition, a
> deleted line, a changed operator) and runs the tests. Run it now and write in
> `docs/CODE_QUALITY.md`: the tool, the scope, the number of mutants planted, how many the tests
> killed, how many survived and where. Do not fix anything yet: every surviving mutant in code
> that matters becomes a pending item for a test that catches it, and I decide which ones matter.
> From now on, report the mutation score at the close of every block next to the coverage, and
> treat a drop as a quality failure.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [zh]
> 把变异测试加进质量闸门，[对全部代码 | 只对每个待办项改动的行]：一个工具，它故意在代码里
> 植入小错误（一个反过来的条件、一行被删掉、一个被改掉的运算符）然后跑测试。现在就跑一遍，
> 并在 `docs/CODE_QUALITY.md` 里写下：工具、范围、植入的变异体数量、测试杀掉了多少、存活了
> 多少以及在哪里。先什么都不要修：每一个在重要代码里存活下来的变异体都变成一个待办项，对应
> 一个能抓住它的测试，而哪些重要由我决定。从现在起，每个功能块收尾时把变异分数报告在覆盖率
> 旁边，并把下降当作一次质量失败。用我的语言回答。
>
> 当你需要我做决定时，用 UX-28（`docs/ANEXO_HEURISTICAS.md`）的四个部分来问，并按这个顺序：让这个
> 问题成为必要的数据，列举出来；不超过五行的一段话，把这些数据连起来并让问题显现；问题本身，可能的
> 答案逐一编号；以及你的推荐。用项目在 `communication_depth` 中声明的技术深度来说——`beginner`、`de
> cision_maker` 或 `technical`——；项目没有声明就用 `decision_maker`。

我在要求什么：覆盖率给不出的那个度量（覆盖率说的是哪些代码被执行到了；变异说的是哪些代码被
看守着）；范围收窄到改动的行，这是让每个待办项都付得起这笔成本的关键；**先什么都不要修**，因
为决定哪个变异体重要是我的事；以及每个功能块收尾时的分数，和覆盖率放在一起，下降按红处理。

## 3. 预期结果

- linter、格式化工具、各项限制、重复和死代码的检测、带棘轮的覆盖率以及类型，在每次 push 时
  运行，该红的时候就红。
- `docs/CODE_QUALITY.md`，里面有工具、配置、带实测值的限制，以及没通过的东西连同它的待办项或
  它的日期的清单。
- `docs/GATES.md` 里的闸门，以及写进契约的例行。
- 在任何有用户的项目里：`docs/CODE_QUALITY.md` 里的变异分数，按功能块，放在覆盖率旁边，以及
  每一个在重要代码里存活的变异体对应一个待办项。

## 4. 完整性检验（由你来做，不读代码）

- 向它要链条最后一次运行的链接：质量是绿的吗？
- 让它在一个分支上故意塞进一个一百行的函数和一个没用到的变量：链条会因为这两件事都变红吗？
- 今天的覆盖率是不是大于或等于上一个功能块收尾时的？把两个数字都要过来。
- 代码里有没有任何对 linter 的例外？向它要清单；每一条都必须有写下来的理由。
- 从第一次运行以来有没有哪条限制被调高过？理由是什么，谁决定的？
- 如果项目有真实用户：变异测试在跑吗？如果没有，有什么写下来的理由证明不需要它？
- 如果有变异测试：上一个功能块里存活了多少个变异体，每一个都有待办项或写下来的理由吗？

## 5. 警报信号

- 质量在已经写好的代码上第一次就过了绿。这几乎从来不是真的：限制太松了。
- 代理提议"把这条规则关掉，因为它太严格了"。有时候它是对的；但永远要经过你，并附上写下来的
  理由。
- 覆盖率上升是因为加了一些什么都不证明的测试（藏起一个缺陷的那种绿，第 8 级台阶）。棘轮量的
  是数量；展示出来的红量的是质量。两者要一起走。
- 一个文件长到了限制，于是被拆成两个内容相同的文件。那是伪装成合规的重复。
- 覆盖率很高而变异分数很低。那是一些执行了代码却什么都不验证的测试：正是第 8 级台阶展示出
  来的红色想要避免的情形。
- 项目有真实用户，却没人跑变异测试，也没人写下不跑的理由。对一个有用户的项目来说，"这是可
  选的"已经不再是一个站得住的理由。
