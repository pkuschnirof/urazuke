# 步骤 5 — 计划就是待办项：详细规格活在每一项里（台阶契约）

**阶段：** 循环。
**时机：** 登记册在开启第一个功能块时创建，启动阶段一结束就建；每个新功能块都从把客户的请求
转成带规格的待办项开始；例行在整个项目期间的每次会话中使用；已完成待办项的文档在关闭它时、
同一次会话中写。
**形式：** 每个功能块开启时一次发送；之后是每次会话的例行。
**规模：** 所有项目必需。这是让其他所有台阶都能被跟踪的那一级：没有编号并带规格的待办项，
规格和证据都没有地方可挂。

## 用途

只保留一条工作队列，有顺序、有闸门，它是项目的真相。没有"计划"归计划、"任务"归任务：待办
项清单就是计划。它避免两周后被超越、变得过时的长规格
[Ref. 17](../REFERENCIAS.md#ref-17)，以及没人知道为什么做了的工作
[Ref. 7](../REFERENCIAS.md#ref-7)。

但还有更多，那是把这级台阶和随便哪张任务清单区分开的东西。在经典方法里有一份需求规格文档，
长长的，描述系统必须做的一切，还没写完就过时了。这里那份文档被分解：**详细规格活在每个待办
项里**。一个写得好的待办项带有：它挂在语义树的哪个节点下；引发它的用户故事或用例，用客户的
原话；详细描述；适用的业务规则，附决定和日期；进出的数据；受影响的界面，有原型就附上；边
界情况和例外；"给定、当、那么"形式的验收标准；以及如何验证。待办项之和就是系统的规格，可追
溯性（需求 → 待办项 → 测试 → 提交）不是一张单独的矩阵：就是待办项本身。

第三点，闭合了这个圆：**已关闭的待办项是文档**。一个待办项关闭时，不删除，也不空着归档：它
保留着规格、引发它的决定、关闭它的证据（红色和绿色的数字、截图、测得的数字）、提交和日期。
已关闭的待办项队列就是系统的功能历史：建了什么、为什么、什么时候、怎么测的。变更日志、手册
的新章节，以及六个月后"系统为什么这样做？"的答案，都从那里来。

## 1. 所需上下文

- 客户对这个功能块的请求，散文，按他会说的方式，带着它的含糊。如果你在摄入阶段做了用例或
  用户故事，更好：它们是一个功能块的天然单位。
- 语义树（第 2 级台阶），用来把每个待办项挂到它的节点下。
- 审计和人工测试的发现，如果已经有了。
- `PROJECT.md` 和 `docs/STATUS.md`。

## 2. 提示词

**开启一个功能块：**

> We are going to turn everything that must be done in this block into numbered pending items,
> each one carrying its full specification. Read `PROJECT.md`, `docs/SEMANTIC_TREE.md`, the
> client's request for this block, and whatever is in `docs/STATUS.md`. If the request is
> ambiguous on any point such that you cannot write a verifiable pending item for it, ask me; do
> not resolve it by assuming. Then create or extend `docs/PENDING.md` with one item per thing to
> do, each with: number (PND-001 onwards); one-line title; the node of the semantic tree it hangs
> from; the user story or use case that originates it, in the client's words; the detailed
> description; the business rules that apply, each with its decision and date, or marked as
> "rule missing, asked"; the data in and out; the screens affected; the edge cases and
> exceptions; the acceptance criteria in the form "given, when, then"; how it will be verified
> as done; and status. If a node the item needs does not exist in the tree, propose it and mark
> it. Order the items by the priority I gave you; if I gave none, propose an order and tell me
> why. Reply in my language.

> [zh]
> 我们要把这个功能块里必须做的一切转成编号的待办项，每一项都带有它的完整规格。读
> `PROJECT.md`、`docs/SEMANTIC_TREE.md`、客户对这个功能块的请求，以及 `docs/STATUS.md` 里的
> 内容。如果请求在某一点上含糊到你写不出一个可验证的待办项，问我；不要靠假设来解决。然后
> 创建或扩展 `docs/PENDING.md`，每件要做的事一项，每项包含：编号（从 PND-001 起）；一行标
> 题；它挂在语义树的哪个节点下；引发它的用户故事或用例，用客户的原话；详细描述；适用的业
> 务规则，每条附决定和日期，或标为"规则缺失，已询问"；进出的数据；受影响的界面；边界情况
> 和例外；"给定、当、那么"形式的验收标准；如何验证它已完成；以及状态。如果某项需要的节点
> 在树里不存在，提议它并标出来。按我给你的优先级排序；如果我没给，提议一个顺序并告诉我为
> 什么。用我的语言回复。

我在要求什么：把请求转成可验证的条目，并且**当请求不足以写出可验证的条目时提问**（含糊靠提
问解决，不靠选择）；每个待办项的完整规格，逐字段，那是经典需求工程分解成小单位；它挂的树节
点，那是让你发现超出范围的待办项的东西；业务规则附决定或标为缺失，那是与第 6 级台阶的挂
钩；经典形式的验收标准，那是第 7 级台阶端到端测试的脚本；以及一个附理由的建议顺序，由你确认
或更改。

**每次会话的例行（放进协作契约）：**

> Before touching any code, open `docs/PENDING.md`, tell me which item you are taking and why,
> and re-read its specification. Every commit cites its pending item. A pending item is closed
> with written evidence (the test counts red and green, the screenshot, the measured number),
> never with "done". When you close it, keep it in the register with its full specification and
> add: the evidence, the commit, the date, and any decision that was taken along the way; that
> record is the documentation of what was built. If along the way you see something that is not
> on the list, add it as a new pending item with its specification; do not do it.

> [zh]
> 在动任何代码之前，打开 `docs/PENDING.md`，告诉我你取哪一项、为什么，并重读它的规格。每次
> 提交都引用它的待办项。一个待办项用书面证据关闭（测试红色和绿色的数字、截图、测得的数
> 字），绝不用"搞定"。关闭时，把它连同完整规格留在登记册里，并加上：证据、提交、日期，以
> 及途中做过的任何决定；那条记录就是所建之物的文档。如果途中你看到清单上没有的东西，把它
> 作为新的待办项连同规格加进去；不要做它。

我在要求什么：每次会话的纪律：宣布取哪一项并重读规格（代理从无记忆起步，规格是它对待办项的
记忆），每次提交引用待办项，用证据关闭，**在同一登记册里记录已完成的待办项**，以及对清单之
外出现的东西**记下而不是做**。最后那条是模型"看到更多"时保护范围精确的条款。

## 3. 预期结果

`docs/PENDING.md`（或你项目用的工具），每个待办项包含：

- 编号、标题、状态（开放 / 进行中 / 已关闭）、开启日期和关闭日期。
- 语义树的节点。
- 引发它的用户故事或用例，用客户的原话。
- 详细规格：描述、附决定和日期的业务规则、数据、界面、边界情况、验收标准、如何验证。
- 关闭时：证据、提交、日期、途中做的决定。

以及协作契约里的例行。

## 4. 完整性检验

- 随机读一个待办项的规格，像你是客户：它是否用你的原话描述了你要的东西？验收标准是不是
  你会用来说"可以"的那些？有没有一个你知道而它没写的边界情况？
- 每个待办项都挂在树的一个节点下吗？有没有挂在你不认识的节点下的？
- 每个待办项都说了如何验证吗？没有验证的待办项无法关闭。
- 有没有标为"缺失，已询问"却没问过你的业务规则？
- 有没有没有证据、没有提交就"关闭"的待办项？有的话，重新打开。已关闭的是否保留着规格和
  关闭文档？
- 随机取三次提交：它们引用了待办项吗？
- 代码里出现了没有待办项的东西吗？那里代理超出了范围。

## 5. 警报信号

- 一个待办项"进行中"超过三次会话。要么它是三个待办项，要么它被一个没人做的决定卡住了
  （第 6 级台阶）。
- 一天关闭的待办项比那天的提交还多。它们在没有证据的情况下被关闭。
- 规格只有一行。代理写它们是为了交差，不是为了在上面构建；它会在构建时发明缺的东西。
- 清单有超过五十个开放的待办项。那不是计划，是焦虑的清单：得排优先级并归档。
- 有人问系统为什么做某件事，答案不在任何已关闭的待办项里。已完成的文档没有在写。
