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

我在要求什么：用例出自验收标准（这样它检验的是被要求的东西，而不是模型理解到的东西）；它写给
一个不知道系统怎么运转的人看，那正是一个测试用例和一份技术笔记之间的差别；它包含一个人能验证
的后端效果，好让人工测试也看一眼屏幕的另一边；用例在同一次提交中保持更新，和文档一样；以及
**模型绝不执行它们**，因为由模型执行的用例不过是又一个测试，而要点恰恰在于由一个人来执行。

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
> the case or the system is the problem. Reply in my language.

> [zh]
> 读 `docs/MANUAL_TESTS.md` 里今天的那些执行。对每一个失败的用例，以及文件末尾每一条零散
> 观察，在 `docs/PENDING.md` 里开一个纠正型待办项，用那个人的原话作为复现方式，挂在它所触
> 及的语义树节点下；现在什么都不要修。对每一个通过的用例，什么都不做。然后逐条流程告诉我，
> 多少个用例通过、多少个失败，和上一次执行作对比，以及哪些失败在重复出现。如果某个用例没能
> 执行，告诉我为什么，以及问题出在用例身上还是系统身上。用我的语言回答。

我在要求什么：把重新注入做成可操作的：每一次人为发现的失败都是一个纠正型待办项，用那个人的话
（不是模型的话）作为复现，并挂在树上；和上一次执行的对比，那是告诉你系统在功能块之间是在变好
还是在退化的东西；以及"用例写错了"和"系统坏了"这两者的区分，它们是两个不同的待办项。

## 3. 预期结果

- `docs/MANUAL_TESTS.md`，每个已关闭待办项所触及的每条流程都有一个用例，按那个格式，写给一个
  人看。
- 每个周期都有记录在案的执行，带日期和执行人。
- 每一处失败、每一条观察都有一个纠正型待办项。
- 写进契约的例行。

## 4. 完整性检验（由你来做，不读代码）

- 随便挑一个用例，你自己在测试环境里走一遍，什么都不要问代理：走得通吗？如果你不得不开口问，
  那这个用例就不是写给人看的。
- 每个触及界面的已关闭待办项都有它的用例吗？向它要没有用例的待办项清单。
- 用例有没有说要在屏幕的另一边验证什么效果，以及一个人怎么验证它？
- 最后一次执行在每个用例里都有日期和名字吗？有没有哪个"通过"是没有日期的？
- 最后一次执行里的每一处失败都有它的待办项吗，而且带着那个人的原话吗？

## 5. 警报信号

- 代理把那些用例标成了已执行。是它执行的，那和没执行是一回事。
- 用例是把自动测试用散文抄了一遍。人工用例必须看测试看不到的东西：看得见的、看得懂的、让人别
  扭的。
- 每一次执行里所有用例都通过。人总是能找到东西的；如果什么都没找到，那就是没在照脚本走，或者
  脚本没要求去看。
- 失败"当场就修了"，没有待办项。那个人的原话丢了，什么在重复出现的痕迹也丢了。
