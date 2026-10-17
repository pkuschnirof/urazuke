# 步骤 14 — 活的文档与人无需 AI 即可遵循的手册（台阶契约）

**阶段：** 运维（随系统诞生；每次变更时维护）。
**形式：** 例行；生成手册时加一次长发送。
**规模：** 按比例。小系统至少需要基础设施与恢复手册（怎么重新拉起、怎么恢复）；用户手册
可以是一页。不变的是：如果构建它的人消失了，另一个人必须能接着干。

## 用途

让系统在没有代理、没有构建它的人的情况下能使用、维护和恢复。如果代理不在的那天无法部署，
它就没完成。在经典方法中文档昂贵且会过时；这里重新生成是免费的，所以规则变成"在同一次提
交中"和"可手工复现"。它避免导致提交到错误仓库的过时文档，以及变成历史的项目文件。

恢复手册的一个质量标准，不懂技术也能判断：**一个不编程的可信的人，在凌晨三点，系统宕机、
代理断线的情况下，必须能照着做**。如果某一步写着"咨询开发者"或"视情况而定"，那一步就是
不完整的。

## 1. 所需上下文

- 每本手册的读者是谁：最终用户、维护者、运维基础设施的人。业务方知道；不清楚时代理提问。
- 在测试环境中运行的系统，用来截真实的图。
- `docs/DEPLOYMENT.md`（第 13 级台阶）和 `docs/LOCKS.md`（第 12 级台阶），它们是输入。

## 2. 提示词

**例行（放进协作契约）：**

> Every change that modifies what the user sees, what the operator does, or how the system is
> deployed, updates the corresponding manual in the same commit. If you do not know which
> manual, ask.

我们在要求什么：同一次提交的规则，这是唯一能让手册保持最新的规则，以及不清楚该改哪本手册
时的提问。

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

我们在要求什么：三本手册及其读者；测试环境的**真实**截图（不是画的也不是描述的）；恢复手册
的凌晨三点标准；文档形式的完整性条款：只有业务方知道的要提问，**不留空洞也不编造**；以及
日期和版本，让人知道每本手册对应哪个系统。

## 3. 预期结果

- `docs/USER_MANUAL.md`（或 HTML），嵌入真实截图。
- `docs/MAINTENANCE_MANUAL.md`。
- `docs/INFRASTRUCTURE_AND_RECOVERY_MANUAL.md`：逐步，给人看。
- 每本都有日期和它所记录的系统版本。
- 在改变界面、运维或部署的提交中：更新了的手册。

## 4. 完整性检验

- 随机翻到用户手册的一个界面：截图与今天测试环境里的一致吗？
- 恢复手册你自己，或一个不编程的可信的人，能照着做吗？读"宕机了"那一节：它是否按顺序、带
  命令地说了该做什么？
- 挑一个最近改了界面的提交：它动了手册吗？
- 有没有"[待补充]"或"咨询负责人"之类的空洞？那里代理应该提问。
- 每本手册是否说了它对哪个版本有效？

## 5. 警报信号

- 用户手册的截图来自一个已不存在的版本。它生成了一次就没再维护：同一次提交的规则不在契约
  里，或者没被执行。
- 恢复手册以"打开一个与代理的会话"开头。如果代理是前提，它就不是给人看的手册。
- 构建者之外没人读过恢复手册。让别人在测试环境里照着做；卡住的地方就是要修的地方。
