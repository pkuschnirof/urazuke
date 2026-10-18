# 步骤 14 — 活的文档与一个人无需 AI 即可遵循的手册（台阶契约）

**阶段：** 运维。
**时机：** 用户手册随每个功能块在收尾时增长，加入新界面；由已关闭的待办项喂养，它们是所做之
事的文档。三份完整的手册在上线生产阶段、第 13 级之后生成，找一个不编程的人做的测试在第一
次部署到生产之前完成。同一次提交的例行贯穿整个运维。
**形式：** 例行；生成手册时加一次长发送。
**规模：** 按比例。小系统至少需要基础设施与恢复手册；用户手册可以是一页。不变的是：如果构建
它的人消失了，另一个人必须能接着做。

## 用途

让系统在没有代理、也没有你的情况下能用、能维护、能恢复。如果没有代理的那天没法部署，它就没
完成。在经典方法里文档昂贵且会老化；这里重新生成是免费的，所以规则变成"在同一次提交中"和
"可手工复现"。我按这个标准为互助会写的手册是范本 [Ref. 24](../REFERENCIAS.md#ref-24)；变
成几千行历史的项目文件是反例 [Ref. 41](../REFERENCIAS.md#ref-41)。

恢复手册的一条质量标准，不懂技术也能用来评判：**一个不编程的可信的人，在凌晨三点，系统宕
机、代理离线的情况下，必须能照着做**。如果某一步写着"咨询开发者"或"视情况而定"，那一步就
不完整。

还有一个不该浪费的来源：已关闭的待办项。每一个都带有它的规格、决定、证据和日期。用户手册不
是在最后从零写起：它一块一块地从关闭的待办项组装起来，变更日志直接从它们生成。

## 1. 所需上下文

- 每份手册的读者是谁：最终用户、维护的人、运维基础设施的人。业务知道；不清楚的话代理提问。
- 在测试环境中运行的系统，用来取真实截图。
- 这个功能块已关闭的待办项，附其关闭文档（第 5 级台阶）。
- `docs/DEPLOYMENT.md`（第 13 级台阶）和 `docs/LOCKS.md`（第 12 级台阶），它们是输入。

## 2. 提示词

**例行（放进协作契约）：**

> Every change that modifies what the user sees, what the operator does, or how the system is
> deployed, updates the corresponding manual in the same commit. At the close of every
> functional block, add to the user manual the screens and flows of the pending items closed
> in that block, with real screenshots from the test environment, and add their entries to the
> changelog. If you do not know which manual, ask.

> [zh]
> 每一次改变用户所见、操作员所做或系统部署方式的变更，都在同一次提交中更新相应的手册。每
> 个功能块收尾时，把该块中关闭的待办项的界面和流程加到用户手册里，附来自测试环境的真实截
> 图，并把它们的条目加到变更日志。如果你不知道该进哪份手册，问。

我在要求什么：同一次提交的规则，那是唯一能让手册保持最新的规则；把功能块收尾作为已关闭待办
项变成手册和变更日志的时刻；以及不清楚该进哪份手册时提问。

**生成手册：**

> Generate three manuals from the system as it is today in the test environment: the user
> manual (screen by screen, with real screenshots, in the user's language, no jargon); the
> maintenance manual (how it is built, where everything is, how to run the test suite, how to
> add a module); and the infrastructure and recovery manual (how to deploy, how to roll back,
> how to restore a backup, what to do if it goes down; written for a person who has to do it by
> hand, without AI, at three in the morning). If for any section you need something only the
> business knows (who is responsible for what, which phone number to call), ask me; do not leave
> a gap and do not invent. Each manual carries a date and the system version. Reply in my
> language.

> [zh]
> 根据系统今天在测试环境中的样子生成三份手册：用户手册（逐个界面，附真实截图，用用户的语
> 言，不用行话）；维护手册（它是怎么构建的、每样东西在哪里、怎么运行测试套件、怎么添加一
> 个模块）；以及基础设施与恢复手册（怎么部署、怎么回滚、怎么恢复备份、宕机了怎么办；写给
> 一个必须在凌晨三点、没有 AI、手工完成的人）。如果某一节你需要只有业务知道的东西（谁负责
> 什么、打哪个电话），问我；不要留空，也不要发明。每份手册都带日期和系统版本。用我的语言
> 回复。

我在要求什么：三份手册及其读者；来自测试环境的**真实**截图（不是图画或描述）；恢复手册的凌晨
三点标准；适配文档的完整性条款：只有业务知道的要问，**不留空、不发明**；以及日期和版本，让人
知道每份手册对应哪个系统。

## 3. 预期结果

- `docs/USER_MANUAL.md`（或 HTML），附嵌入的真实截图，一块一块长起来。
- `docs/MAINTENANCE_MANUAL.md`。
- `docs/INFRASTRUCTURE_AND_RECOVERY_MANUAL.md`：逐步，给一个人看。
- `docs/CHANGELOG.md`，由已关闭的待办项喂养。
- 每份都带日期和它记录的系统版本。
- 在改变界面、运维或部署的提交里：更新过的手册。

## 4. 完整性检验

- 随机翻到用户手册的一个界面：截图和今天测试环境里的一致吗？
- 恢复手册你自己、或一个不编程的可信的人能照着做吗？读"宕机了"一节：它按顺序、带命令地说
  了该做什么吗？
- 挑一次最近改了界面的提交：它动了手册吗？
- 变更日志有上一个功能块每个已关闭待办项的条目吗？
- 有没有"[待补]"或"咨询负责人"之类的空洞？那里代理本该提问。
- 每份手册都说了它对哪个系统版本有效吗？

## 5. 警报信号

- 用户手册的截图来自一个不再存在的版本。它生成过一次，没有维护：同一次提交的规则不在契约
  里，或者没在执行。
- 恢复手册以"打开一个与代理的会话"开头。如果代理是前提，它就不是给人看的手册。
- 构建者之外没人读过恢复手册。让某人在测试环境里照着做；卡住他的地方就是要修的地方。
