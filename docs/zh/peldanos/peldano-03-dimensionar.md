# 步骤 3 — 在设计架构之前先做容量估算（台阶契约）

**阶段：** 启动。
**时机：** 一次，定义之后、搭骨架之前；业务规模变化时重做。
**形式：** 对话：代理计算并呈现选项；你选择。
**规模：** 始终必需，但按比例：在小项目里，容量估算可以是半页和一个决定（"SQLite 能撑好几
年"）。它不能做的是不做，因为"会长多大？"这个问题花五分钟，而错误的答案花几周。

## 用途

用数字而不是凭喜好来做结构性决定——用哪个数据库引擎、接口是同步还是异步、多大并发。这是跳
过代价最大的一级台阶，我说这话有切身体会：在我的一个系统里，我用 JSON 文件起步，等到测量时
发现它每年会产生 340 万行；之后改接口花了整整一个重构阶段
[Ref. 15](../REFERENCIAS.md#ref-15)。

有一个关键点值得你记住：**有些数据只有业务才有**（多少实体、每个实体多少事件、峰值时多少操
作员、要保留多久），模型推断不出来。它能推断的是派生出来的东西。所以提示词要求它评估原始数
据是否完整，并索要缺的，而不是一脸笃定地估计它们。知道自己缺什么才能计算的是模型，不是一
张表单。

还有第二个想法希望你带走：**非对称决策**。有些决定，做了但结果没必要，代价很小；没做但结果
有必要，代价巨大。从第一行起就让持久化接口异步是典型例子：如果引擎最后是同步的，多了一个
`await`；如果最后是异步的而你没预见，就得全部重写。这类决定只要便宜就一律做，哪怕今天不需
要。

## 1. 所需上下文

下面这份是通用清单。你在每条提示词之前必须已经做好的具体文件，连同它们的内容和最低状态，在第
2 节里，在每条提示词前面的"发送提示词之前"方框里。

- 业务的**容量数据调研**，以通用方式这么称呼：主要实体及其增长、每个实体的事件数、同时操作
  的人数和峰值时段、数据保留时间、特殊负荷（活动、结账）、预期增长。调研天然是不完整的；
  代理评估并索要。
- 如果有旧系统：对其数据库的读访问权，用来取真实数字而不是估计值。
- `PROJECT.md` 和语义树（第 2 级台阶）：树里的实体就是要估算容量的实体。

## 2. 提示词

**初始：**

**发送提示词之前**，下面这些必须已经存在，而且是你（或业务方和你一起）来做，不是代理：

- `docs/VOLUME_SURVEY.md`：容量调研，和领域所有者一起写（如果项目是你自己的，就和你自己一起
  写）。对语义树里的每个主要实体：今天有多少，每月新增多少，每个实体产生多少事件（一个预约产
  生三条消息；一次授权产生多少次查询）；高峰时有多少人在操作，高峰是几点；数据保存多久；有哪
  些例外负载（促销、月结、长假之后的第一个周一）；预期的增长是多少，系统有没有可能卖给别人。
  而最重要的是：每个数字，它从哪里来（"主管说的"、"在九月的本子上数出来的"、"假设"）。假设要
  标成假设；不要把它打扮成数据。
- `PROJECT.md` 和 `docs/SEMANTIC_TREE.md`（第 2 级台阶），已定稿：要做容量估算的实体就是树里
  的那些。
- 如果有带数据库的旧系统：一个只读访问权，让代理取到真实数字而不是估算值，连接串保存在仓库之
  外，变量名记在调研里。
- 最低可接受状态：树里的每个实体都至少有一个带来源的数字，哪怕好几个写着"假设"。代理会来向你
  要那些假设；这个索要就是台阶在起作用。

> Before proposing any architecture we are going to size the system. Read `PROJECT.md` and the
> volume survey in `docs/VOLUME_SURVEY.md`. Distinguish primary data (facts only the business
> knows) from derived data (what can be computed from the primary data). Evaluate whether the
> primary data is complete enough to compute what follows; if any primary figure is missing, or
> is marked as an assumption, ask me for all the missing figures before going on. Never estimate
> a primary figure. If a previous system can be queried, use its real numbers and state where
> each came from. With the primary data complete, compute, showing the arithmetic: rows per year
> for the three largest tables, peak concurrency, data size at five years, and what breaks first
> if everything is multiplied by ten. Then present three options for persistence and concurrency,
> each with the cost of migrating to the others later. Do not choose: I choose. Do not write code.
> Reply in my language.

> [zh]
> 在提出任何架构之前，我们要先估算系统的容量。读 `PROJECT.md` 和 `docs/VOLUME_SURVEY.md`
> 中的容量调研。区分原始数据（只有业务知道的事实）和派生数据（能从原始数据算出来的）。评
> 估原始数据是否完整到足以计算接下来的东西；如果缺任何原始数字，或者有被标为假设的，在继
> 续之前向我索要所有缺的数字。绝不估计原始数字。如果可以查询旧系统，用它的真实数字，并说
> 明每个数字从哪里来。原始数据齐全后，计算并展示算式：三张最大的表每年的行数、峰值并发、
> 五年后的数据大小，以及如果一切乘以十先坏的是什么。然后给出三个持久化与并发的选项，每个
> 附上以后迁移到其他选项的代价。不要选：我来选。不要写代码。用我的语言回复。

我在要求什么，逐条：区分原始数据和派生数据（这是避免发明的区分）；**索要缺的原始数据，绝不
估计它们**；旧系统存在时用它的真实数字，附来源；把派生数据连算式一起算出来，让你能重算；
"乘以十"的场景，那是揭示什么先坏的东西；三个选项附相互迁移的代价，因为决定不只是"选哪
个"，还有"选错了代价多大"；以及不选、不写代码，因为这级台阶是决策，不是构建。

**收尾：**

**发送提示词之前**，你手边必须有这些：

- 代理给出的三个方案，已读过，而且至少有一笔账由你亲手重算过（比如最大那张表一年多少行）：结
  果必须一样。
- 它向你索要的原生数据，真的去拿到了（在本子上数，去问所有者）并在聊天里给了它；没有哪个是你
  为了交差自己估出来的。
- 你的选择，写上方案的字母和一行话的理由，由你决定，如果有所有者，和他一起决定。
- 最低可接受状态：重算的账对得上，假设变成了带来源的数据，方案已经选定。如果账对不上，别收尾：
  去问。

> I choose option [B]. Record in `docs/SIZING.md`: the primary data with its source, the derived
> data with its arithmetic, the three options, the chosen one and why, and the decisions we are
> taking "just in case" even though they are not needed today (for example: the persistence
> interface is asynchronous from line one, even if the first engine is synchronous). Include the
> questions you asked and my answers.

> [zh]
> 我选选项 [B]。记录到 `docs/SIZING.md`：原始数据及其来源、派生数据及其算式、三个选项、选
> 中的那个和原因，以及我们"以防万一"做的、今天虽然不需要的决定（例如：持久化接口从第一行
> 起就是异步的，哪怕第一个引擎是同步的）。把你问过的问题和我的回答包含进去。

我在要求什么：完整的记录，附来源和算式；选中的和理由；以及写下来的非对称决策，因为留在隐含
状态它们就不会被遵守。

## 3. 预期结果

一个 `docs/SIZING.md` 文件，包含：

- 日期和谁决定的。
- 原始数据表：值、来源（业务告知 / 在旧系统中测得）、日期。没有一个来源是"假设"。
- 派生数据表：值、来自哪些原始数据、算式。
- "乘以十"的场景：什么先坏。
- 编号的三个选项，附相互迁移的代价。
- 选中的和原因，一到两句话。
- 列出的非对称决策。
- 代理问过的问题和回答。

## 4. 完整性检验

- 有没有原始数据的来源是"假设"或没有来源？有的话，台阶没登上：代理本该索要。
- 每个派生数据是否展示了来自哪些原始数据、用什么算式？你能手算一遍并得到同样的结果吗？
- 是否有三个选项，并有一个附书面理由的选中项？
- 它是否说了容量乘以十会发生什么？
- 非对称决策是写下来了，还是留在隐含状态？
- 代理提问了吗？如果它一个问题没问就给出了数字，别信。

## 5. 警报信号

- 三个选项的场景都导向同一个结论。代理早已选好，另外两个是凑数的。
- 某个派生数字的精度高于它来自的原始数据（从"大约 5.000 个家庭"得出"1.234.567 行"）。精
  度是假的。
- "乘以十"的场景说"没事"。总会有事；它没找到，是因为没去找。
