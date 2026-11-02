# 步骤 10 — 人工测试用例和功能一起写，并且由人来执行（台阶契约）

**阶段：** 循环。
**时机：** 每个待办项关闭时，在先证红的测试（8）和质量（9）之后：代理写出它所触及流程的人工
测试用例。由人在三个时刻执行：每个功能块收尾时（人工测试）、第一次部署到生产之前（和所有者一
起做的验收测试），以及每次部署之后，做一轮只读的检查。每一次失败的执行都把一条需求以纠正型待
办项的形式重新注入循环。
**形式：** 每个待办项的例行；之后是按周期的人工执行。
**规模：** 所有有用户的项目必需：人工测试用例是唯一既不由模型来写、也不由模型来跑的测试。

## 用途

本方法的自动测试已经够多了：先证红的测试、回归、三种量级上的端到端。全都是模型写的、模型跑
的，而且全都在检验模型理解到的东西。还缺一种测试：一个人用自己的眼睛和自己的手，照着一份写下
来的脚本去做，并且找出任何测试都找不出的东西：放错位置的按钮、看不懂的提示、技术上能跑而在人
看来没用的流程。人工查看和人工测试本来就在时间线里；缺的是让它们有**脚本**，而且这份脚本由构
建了那个功能的同一个人、在同一个时刻、根据待办项的验收标准写出来。没有脚本，人工测试就是"拿
系统玩一会儿"，找到什么取决于那天的心情。有脚本，它每次都一样地执行，发生了什么会被记录下来，
而没通过的东西作为需求回到循环里。这就是过程图所展示的那个回路的闭合：人工测试用例的执行把需
求重新注入开发。

一个人工测试用例永远是同一个形状：一个标识符；产生它的那个待办项；前置条件（开始之前必须存在
什么：一个患者、一个昨天的预约）；编号的步骤，每一步写这个人做什么、必须看到什么；最后的预期
结果，包括一个人能够验证的后端效果（出现的一条记录、假收件箱里的一条消息）；要用的测试数据；
以及留给每一次执行结果的空位：日期、谁、通过还是失败、备注。

**如果你是初学者。** 一个*人工测试用例*是一份让人去测某个功能的食谱：要准备什么，一步一步做
什么，每一步应该发生什么。它写出来是为了让任何人都能照样做一遍，不需要知道系统是怎么造的。
*执行*一个用例就是照着食谱做，并记下它通过还是失败。*前置条件*是开始之前必须存在的东西。而*
重新注入*的意思是，这个人发现的毛病会作为一条新的请求、用他自己的话，回到待办项清单里。

随 D-082 还进来了两件事，而且是两件，不是一件。第一件：**人为了验收而执行，智能体为了找出毛病
而走一遍**，方法两样都要。智能体的走查——智能体打开每一个画面、看看上面有什么、用一用它、并
顺着流程从一个画面走到下一个，像一个人那样——不替代人的执行，也不是第 8 级那种端到端测试：
端到端测试走的是某个人选好的那条路，而走查找的是没有人想到要去试的东西。我要它，是因为我测过：
在一个完整周期里智能体做过的所有事情当中，走查是**找出界面毛病最多的那件事**，而方法并没有要
它；是智能体自己要自己做的。它留在 `docs/SCREEN_WALKTHROUGH.md` 里，带着它的分母：系统有多少个
画面、它走了多少个、找到了多少个毛病。进不去的画面也要算在总数里，并写明它的理由；为了让数字
好看一点而把它从分母里拿掉，正是附录 H 的 `CQ-19.1` 所禁止的。

第二件，是把这一级的界线当面说清楚：**把用例写下来，和由一个人去执行它们，是两种不同的状态，
而第二种方法强制不了。** 没有任何程序能验证一个人用自己的手照着脚本走过一遍，而一道要求它的
闸门，只能靠说谎来满足。所以这一级要求能被验证的那部分——声明——并把债摆在明面上：
`docs/MANUAL_TESTS.md` 开头的 `cases_written`、`cases_executed_by_a_person` 和
`execution_debt`；第二个数字只有签过名的执行能让它动，智能体的阅读绝不能。这条声明**不会添一道新的闸门**：这一级额外要的是把债写下来，而不是让数字大于零，
因为逼一个人正是方法做不到的事。真正**拦住**的、而且从附录 H 的锚 4 起就已经在那里的，是
这一条：没有人按角色跑过的用例，不是一个执行过的用例。我在 2026-11-02 用真实的评估器测过：
一个实现了这个锚的安装会变红，并说签过名的用例登记是空的。所以缺的不是一道封锁，而是让这笔债
**读得出来**——它的数字和欠它的人的名字——而不是一个只说「没有人签」、却不说该谁签、从何时
开始欠的空登记。还有一件读这一级时值得知道的事：打开它的那次测量来自一个带着空表往前走的项目，
而它跑的是模式 1 的**冻结**；在那里，第 10 级唯一的检查就是文件存在。我在 2026-11-02 的一个真实项目里测过：十三个用例写好了，执行表是空的，这一级
是绿的，而一份合规文档把六条标准断言为已验证，而它们的验证者是一个从来没有执行过它们的人。
智能体做的正是这一级所说的那些。窟窿在这一级身上。

## 1. 所需上下文

下面这份是通用清单。你在每条提示词之前必须已经做好的具体文件，连同它们的内容和最低状态，在第
2 节里，在每条提示词前面的"发送提示词之前"方框里。

- 正在关闭的那个待办项，附它"给定、当、那么"形式的验收标准（第 5 级台阶）：它们是用例的原料。
- 带数据的测试环境，好让那些步骤真的走得通。
- 谁来执行这些用例（所有者、一个信得过的用户），以及什么时候执行（功能块收尾、验收、每次部署
  之后）。

## 2. 提示词

**每个待办项的例行（放进协作契约）：**

**发送提示词之前**，下面这些必须已经存在，而且是你（或业务方和你一起）来做，不是代理：

- 那个待办项连同它的验收标准在 `docs/PENDING.md` 里（第 5 级台阶），已经构建好，而且先证红的
  测试和质量都已就绪（第 8 和 9 级台阶）。
- `docs/MANUAL_TESTS.md` 已创建，哪怕是空的，在开头写好用例的格式：标识符、待办项、前置条件、
  步骤（动作和可见结果）、包含一个人可验证的后端效果的预期结果、测试数据，以及执行表（日期、
  谁、通过还是失败、备注）。
- 谁执行、什么时候执行的决定，写在 `PROJECT.md` 或契约里：对一个小项目来说，就是所有者在每个
  功能块收尾时和第一次部署之前。
- `docs/WORKING_AGREEMENT.md`，这条例行要加进去的地方。
- 最低可接受状态：文件带着它的格式已经存在，而且待办项有验收标准。

> Every pending item that changes what a user sees or does is closed with its manual test cases
> written in `docs/MANUAL_TESTS.md`, derived from its acceptance criteria: one case per flow the
> item touches, with an id, the pending item, the precondition, the numbered steps (what the
> person does and what they must see), the expected result including a backend effect a person
> can verify without tools, the test data to use, and an empty execution table (date, who,
> passed or failed, observation). Write them for a person who does not know how the system is
> built. Keep the cases of closed items up to date: when a flow changes, its cases change in the
> same commit. Never mark a case as executed yourself: execution is human.
>
> Every manual case also runs once per affected profile, and it is derived
> from `docs/PROFILE_MATRIX.md` instead of being written by hand: a case run
> with a single profile is not an executed case (Annex H, anchor 4). At the
> close of each block add the two human checks no machine replaces: the
> first-click check, where I name the place I would look for a task and you
> compare that with the menu, and the real screenshot of the test
> environment.
>
> `docs/MANUAL_TESTS.md` carries at its head three declarations that a gate reads, each one under
> its fixed key in English even when the file is in my language, because what this step owes is not
> the same as what it can prove. `cases_written`: how many cases are written.
> `cases_executed_by_a_person`: how many of those a person signed in their execution table, with a
> date and a name; you keep the first figure, and the second one moves only when a person executes
> -- never from your own reading of the system. `execution_debt`: `none` when the two figures are
> the same, or `pending_verifier` and then the cases nobody has executed yet, with who owes each
> execution and since when. That debt is not a gate of its own: what this step asks you for is the
> declaration and not a figure above zero, because the method cannot make a person execute. But it
> is never silent either, and a step that advances with its debt declared is honest in a way that a
> step advancing while it looks complete is not.
>
> And walk the screens yourself, which is a different thing from the execution a person owes and
> never a replacement for it: you walk to find defects, a person executes to accept. Go through
> every screen the system has as a person would -- open it, look at what is on it, use it, and
> follow the flow from one screen to the next -- and write `docs/SCREEN_WALKTHROUGH.md` with
> `screens_total`, how many screens the system has; `screens_walked`, how many of them you actually
> walked; and `walkthrough_findings`, how many defects the walk found. A screen you could not reach
> is counted in the total and named with its reason: taking it out of the denominator so that the
> figure reads better is the one thing this file must never do. For every defect: the screen, what
> you saw, what you expected instead, and the pending item you opened for it.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [zh]
> 每个会改变用户所见或所做之事的待办项，都要在它的人工测试用例写进 `docs/MANUAL_TESTS.md`
> 之后才算关闭，用例由它的验收标准推导出来：待办项触及的每条流程一个用例，带一个标识符、那
> 个待办项、前置条件、编号的步骤（这个人做什么、必须看到什么）、预期结果（包括一个人不用工
> 具就能验证的后端效果）、要用的测试数据，以及一张空的执行表（日期、谁、通过还是失败、备
> 注）。写给一个不知道系统是怎么造的人看。把已关闭待办项的用例保持更新：当一条流程变了，它
> 的用例在同一次提交中跟着变。绝不要自己把一个用例标为已执行：执行是人做的。
>
> 每个手工用例还要对每个受影响角色各跑一次，而且它是从
> `docs/PROFILE_MATRIX.md` 推导出来的，不是手写的：只用一个角
> 色跑过的用例不算执行过（附录H，锚点4）。每个块收尾时加上两项没有任何机器能替代的确
> 认：第一次点击，我说出我会去哪里找这件事，你把它和菜单对照；以及对测试环境的真实截图。
>
> `docs/MANUAL_TESTS.md` 在它的开头带上三条闸门会读的声明，每一条都放在它固定的键下面、用
> 英文写，即使这个文件用的是我的语言，因为这一级所欠的东西，和它能证明的东西不是同一件。
> `cases_written`：写下来的用例有多少个。`cases_executed_by_a_person`：其中有多少个是一个人
> 在它的执行表里签过的，带日期、带名字；第一个数字由你维护，第二个数字只有在一个人执行了
> 之后才会动——绝不从你自己对系统的阅读里动。`execution_debt`：两个数字一样时写 `none`，
> 否则写 `pending_verifier`，然后写出还没有人执行的那些用例，带上每一个执行是谁欠的、从
> 什么时候开始欠的。这笔债不是一道自己的闸门：这一级向你要的是那条声明，而不是一个大于
> 零的数字，因为方法没办法逼一个人去执行。但它也绝不会是静默的。带着声明过的债往前走的
> 一级是诚实的，而看起来完整却往前走的那一级不是。
>
> 还要你自己走一遍画面，这和我们欠一个人的执行是两回事，也绝不是它的替代：你走是为了
> 找出毋疵，一个人执行是为了验收。像一个人那样走过系统所有的画面——打开它、看看上面有
> 什么、用它、并顺着流程从一个画面走到下一个——然后写 `docs/SCREEN_WALKTHROUGH.md`，带上
> `screens_total`（系统有多少个画面）、`screens_walked`（其中你真正走过的有多少个）、
> 以及 `walkthrough_findings`（这一遍走下来找到多少个毋疵）。进不去的画面也要算在总数里，
> 并写明它的理由：为了让数字好看一点而把它从分母里拿掉，是这个文件永远不能做的唯一一件
> 事。每一个毋疵：哪个画面、你看到了什么、你本来期待的是什么、以及你为它开的待办项。
>
> 当你需要我做决定时，用 UX-28（`docs/ANEXO_HEURISTICAS.md`）的四个部分来问，并按这个顺序：让这个
> 问题成为必要的数据，列举出来；不超过五行的一段话，把这些数据连起来并让问题显现；问题本身，可能的
> 答案逐一编号；以及你的推荐。用项目在 `communication_depth` 中声明的技术深度来说——`beginner`、`de
> cision_maker` 或 `technical`——；项目没有声明就用 `decision_maker`。

我在要求什么：用例出自验收标准（这样它检验的是被要求的东西，而不是模型理解到的东西）；它写给
一个不知道系统怎么运转的人看，那正是一个测试用例和一份技术笔记之间的差别；它包含一个人能验证
的后端效果，好让人工测试也看一眼屏幕的另一边；用例在同一次提交中保持更新，和文档一样；以及
**模型绝不执行它们**，因为由模型执行的用例不过是又一个测试，而要点恰恰在于由一个人来执行。

以及 D-082 加进来的：让智能体**自己走一遍画面**，那是找出界面毛病最多的事，也是方法原先没有
要的；还有让用例文件在开头带上「写下来的」和「执行过的」之间的差，好让一个带着债往前走的
级别，**是说出来地**往前走。走查不替代人的执行：它让人的执行更短，因为那个人不会再撞上智能体
只要看一眼就能发现的毛病。

**用于一次执行（功能块收尾、验收、一次部署之后）：**

**发送提示词之前**，你手边必须有这些：

- 执行已经做完：一个人在测试环境里（或者在一次部署之后，在生产上以只读方式）照着
  `docs/MANUAL_TESTS.md` 的用例走了一遍，并在每个用例的表里记下了日期、谁、通过还是失败，以
  及备注。这件事由那个人亲手做，在贴提示词之前；代理不做这件事。
- 那些塞不进任何用例的零散观察（什么让人别扭、什么看不懂），带日期记在文件末尾。
- 最低可接受状态：范围内所有用例都有今天的结果，哪怕是"没能执行"并附上理由。

> Read the executions of today in `docs/MANUAL_TESTS.md`. For every case that failed, and for
> every loose observation at the end of the file, open a corrective pending item in
> `docs/PENDING.md` with the person's words as the way to reproduce it, hanging from the node of
> the semantic tree it touches; do not fix anything now. For every case that passed, nothing. Then
> tell me, flow by flow, how many cases passed and how many failed, compared with the previous
> execution, and which failures repeat. If a case could not be executed, tell me why and whether
> the case or the system is the problem.
>
> Then refresh the three declarations at the head of the file: `cases_written`,
> `cases_executed_by_a_person` counted from the signed execution tables and from nothing else, and
> `execution_debt` with who still owes which execution and since when.
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
> 读 `docs/MANUAL_TESTS.md` 里今天的那些执行。对每一个失败的用例，以及文件末尾每一条零散
> 观察，在 `docs/PENDING.md` 里开一个纠正型待办项，用那个人的原话作为复现方式，挂在它所触
> 及的语义树节点下；现在什么都不要修。对每一个通过的用例，什么都不做。然后逐条流程告诉我，
> 多少个用例通过、多少个失败，和上一次执行作对比，以及哪些失败在重复出现。如果某个用例没能
> 执行，告诉我为什么，以及问题出在用例身上还是系统身上。用我的语言回答。
>
> 然后刷新文件开头的三条声明：`cases_written`、只从签过的执行表里数出来的
> `cases_executed_by_a_person`，以及带着谁还欠哪一次执行、从什么时候开始欠的
> `execution_debt`。
>
> 当你需要我做决定时，用 UX-28（`docs/ANEXO_HEURISTICAS.md`）的四个部分来问，并按这个顺序：让这个
> 问题成为必要的数据，列举出来；不超过五行的一段话，把这些数据连起来并让问题显现；问题本身，可能的
> 答案逐一编号；以及你的推荐。用项目在 `communication_depth` 中声明的技术深度来说——`beginner`、`de
> cision_maker` 或 `technical`——；项目没有声明就用 `decision_maker`。

我在要求什么：把重新注入做成可操作的：每一次人为发现的失败都是一个纠正型待办项，用那个人的话
（不是模型的话）作为复现，并挂在树上；和上一次执行的对比，那是告诉你系统在功能块之间是在变好
还是在退化的东西；以及"用例写错了"和"系统坏了"这两者的区分，它们是两个不同的待办项。

## 3. 预期结果

- `docs/MANUAL_TESTS.md`，每个已关闭待办项所触及的每条流程都有一个用例，按那个格式，写给一个
  人看。
- 每个周期都有记录在案的执行，带日期和执行人。
- 每一处失败、每一条观察都有一个纠正型待办项。
- 写进契约的例行。
- `docs/SCREEN_WALKTHROUGH.md`，里面是智能体的走查：`screens_total`、`screens_walked` 和
  `walkthrough_findings`，每一个毛病都带着它的画面、看到了什么、本该是什么，以及它的待办项。
- 在 `docs/MANUAL_TESTS.md` 的开头，闸门会读的三条声明：`cases_written`、只有签过名的执行能让
  它动的 `cases_executed_by_a_person`，以及为 `none` 或 `pending_verifier` 的
  `execution_debt`，带上每一次执行是谁欠的、从什么时候开始欠的。

## 4. 完整性检验（由你来做，不读代码）

- 随便挑一个用例，你自己在测试环境里走一遍，什么都不要问代理：走得通吗？如果你不得不开口问，
  那这个用例就不是写给人看的。
- 每个触及界面的已关闭待办项都有它的用例吗？向它要没有用例的待办项清单。
- 用例有没有说要在屏幕的另一边验证什么效果，以及一个人怎么验证它？
- 最后一次执行在每个用例里都有日期和名字吗？有没有哪个"通过"是没有日期的？
- 最后一次执行里的每一处失败都有它的待办项吗，而且带着那个人的原话吗？
- `cases_executed_by_a_person` 是从签过名的表里数出来的，而不是从智能体的阅读里来的吗？拿一个
  被算成已执行的用例，到它的表里找日期和名字。
- 如果有债，`execution_debt` 说清了是谁欠的、从什么时候开始欠的吗？没有名字的债不是债，是一个
  排好了版的遗忘。
- 走查有没有把打不开的画面算在总数里，并写明理由？在一个有画面藏在智能体没有的那个角色后面的
  系统里，`screens_walked` 等于总数，那是一个编出来的数字。
- 走查找到的毛病，有没有像人发现的失败那样，各自带着待办项？

## 5. 警报信号

- 代理把那些用例标成了已执行。是它执行的，那和没执行是一回事。
- 用例是把自动测试用散文抄了一遍。人工用例必须看测试看不到的东西：看得见的、看得懂的、让人别
  扭的。
- 每一次执行里所有用例都通过。人总是能找到东西的；如果什么都没找到，那就是没在照脚本走，或者
  脚本没要求去看。
- 失败"当场就修了"，没有待办项。那个人的原话丢了，什么在重复出现的痕迹也丢了。
- 这一级显示为已完成，而 `cases_executed_by_a_person` 是零。这不是错误：这是债，它摆在明面上，
  正是为了不让人把它读成完成。
- 智能体的走查什么也没找到，而系统有新画面。走过不等于打开过：如果一个发现都没有，更可能是它
  看了一眼画面，而没有用它。
- 走查开始被当成不执行用例的借口。这是两件有两个目的的事，能验收的那一件是人的那一件。
