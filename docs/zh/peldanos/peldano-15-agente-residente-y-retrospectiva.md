# 步骤 15 — 系统里的代理，以及带数字的复盘（台阶契约）

**阶段：** 运维与收尾。
**时机：** 驻留代理，在进入运维时，第一次部署到生产之后。复盘，在每个阶段和项目收尾时；它回
到第 0 级台阶，为下一个项目做准备。
**形式：** 两部分：一次对话定义驻留代理的范围，一次长发送做复盘。
**规模：** 驻留代理是可选的（很多系统不需要；有用户要求支持的系统需要）。复盘在所有项目必
需，哪怕只有一页：没有它方法就不学习。

## 用途

两件闭合同一个循环的事。第一：把驻留代理留在生产里，范围受限，用来诊断、运维和提供支持，而
你不必在场 [Ref. 13](../REFERENCIAS.md#ref-13)。第二：用数字复查方法本身，并让学到的东西改
变梯子。它避免没有系统地图就运维的代理，以及一个项目接一个项目原样重复、不学习的方法。让我
砍掉整个代理团队的那次带数字的复盘，是第二件事的范本 [Ref. 6](../REFERENCIAS.md#ref-6)。

关于驻留代理，统领一切的规则：**它以某人的名义行动**。它的凭证映射到一个负责的人，它做的一
切都以那个人的名义记录。它不是匿名的系统账户：它是一个有上司的雇员。这定义了它的范围（那个
人授权它的东西）和它的可追溯性（谁为它做的事负责）。

## 1. 所需上下文

下面这份是通用清单。你在每条提示词之前必须已经做好的具体文件，连同它们的内容和最低状态，在第
2 节里，在每条提示词前面的"发送提示词之前"方框里。

对驻留代理：
- 代理在生产里能做什么、不能做什么：读、诊断、改配置、执行动作。由你决定。
- 代理如何向系统表明身份（一个自己的凭证，映射到一个负责的人）。
- 它遇到解决不了的事时通知谁（工单、邮件）。

对复盘：
- 项目的事故、成本（token、配额、你的时间）、折腾最多的待办项，以及日期。

## 2. 提示词

**对驻留代理（初始）：**

**发送提示词之前**，下面这些必须已经存在，而且是你（或业务方和你一起）来做，不是代理：

- 留一个驻留代理的决定，和所有者一起做出并写下来：为了什么（支持、诊断），以及初始的界限是什
  么。
- 代理在生产环境里专属的凭据，由你创建，映射到一个有名字的负责人，范围最小（一开始只读）；它
  的值，在聊天之外、仓库之外。
- `docs/LOCKS.md`（第 12 级台阶）和 `docs/DEPLOYMENT.md`（第 13 级台阶），保持最新：提示词要
  求它读第一份。
- 代理发现自己解决不了的事情时通知谁：一个由你决定的渠道（工单、邮件）。
- 最低可接受状态：凭据存在，有人类主人，而且是只读的。

> We are going to leave you resident in production. First, build the map of the system you will
> need in order to operate it: modules, environments, where each configuration lives, which
> actions are consequential (read `docs/LOCKS.md`), whom to notify. If there are parts of the
> system you cannot see from where you are, tell me; the map must not have hidden gaps. Then
> propose your scope in three levels: read-only and diagnosis; configuration changes with my
> approval; consequential actions behind locks. I choose the level. Your credential acts as the
> person who created it: everything you do is logged under that person's name. Reply in my
> language.

> [zh]
> 我们要把你留驻在生产里。首先，构建你运维它所需的系统地图：模块、环境、每个配置住在哪
> 里、哪些动作有后果（读 `docs/LOCKS.md`）、通知谁。如果系统有你从你所在的位置看不到的部
> 分，告诉我；地图不能有隐藏的空洞。然后分三个级别提议你的范围：只读与诊断；经我批准的配
> 置变更；锁之后的有后果动作。我来选级别。你的凭证以创建它的人的身份行动：你做的一切都以
> 那个人的名义记录。用我的语言回复。

我在要求什么：运维之前的系统地图（没有地图就运维正是这级台阶要避免的故障）；适配的完整性条
款：**地图的空洞要声明，不藏起来**；三个范围级别，让你选一个而不是"看情况"；以及凭证以一个人
的名义的规则。

**对驻留代理（收尾）：**

**发送提示词之前**，你手边必须有这些：

- 代理提出的地图和三个级别，由你读过，以及你选的级别（一开始，永远选第一个）。
- 一个在所选范围之外的具体动作，由你想好，让代理去尝试，而你在日志里看到那次拒绝（比如在级别
  1 下：改一个配置）。
- 最低可接受状态：你选好了级别，而且知道哪一次尝试必须失败。

> Level [X]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the credential (never its
> value), and the procedure to request my approval. Then prove, with a real attempt recorded in
> the log, that something outside your scope is rejected.

> [zh]
> 级别 [X]。把地图、范围、凭证（绝不写它的值）和请求我批准的流程写进
> `docs/RESIDENT_AGENT.md`。然后用一次记录在日志里的真实尝试证明，超出你范围的事会被拒绝。

我在要求什么：驻留代理的文档（绝不含凭证的值），以及范围的红色证明：一次真实的、记录在案
的、做级别之外的事的尝试，被拒绝。那是第 7 级台阶应用于权限。

**对复盘：**

**发送提示词之前**，下面这些必须已经存在，而且是你（或业务方和你一起）来做，不是代理：

- 只有你才有的那些数字，事先收集好：你投入了多少小时（从你的日历里来，不是从记忆里来），在
  AI 工具上花了多少钱（账单或消费面板），用掉了多少持续集成配额，以及这个阶段的开始和结束日
  期。把它们写进 `docs/RETROSPECTIVE_INPUTS.md`，或者在它要的时候在聊天里给它。
- 这个阶段的事故清单，按你记得的样子，附大致日期，用来和代理从待办项和提交里挖出来的东西对照。
  你记得而代理找不到的，就是一个文档的窟窿，值得记下来。
- `docs/PENDING.md`，里面有带文档的已关闭待办项（第 5 级台阶），以及 `docs/DECISIONS.md`（第
  6 级台阶），它们是那些数字的来源。
- 最低可接受状态：小时数和花费都记下来了，附来源。没有这些，复盘就只能用形容词来做。

> [The stage / the project] is over. Do the retrospective with numbers, not impressions: what it
> cost (tokens, quota, my time), how many pending items, which ones took the most rounds and why,
> which incidents happened and which step of the ladder each falls into, and which step failed
> or was missing. If you lack the data for any figure (my time, for instance), ask me for it or
> mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder:
> which step is modified, how, and which incident justifies it. Write it to
> `docs/RETROSPECTIVE_[date].md`. Reply in my language.

> [zh]
> [这个阶段 / 这个项目] 结束了。做带数字的复盘，不是印象：它花了什么（token、配额、我的时
> 间）、多少个待办项、哪些折腾了最多轮、为什么，发生了哪些事故、每个落在梯子的哪级台阶，
> 以及哪级台阶失败或缺失。如果某个数字你没有数据（比如我的时间），向我索要或标为估计；不
> 要发明。以一条对梯子的具体修改提案收尾：修改哪级台阶、怎么改、哪个事故支持它。写到
> `docs/RETROSPECTIVE_[日期].md`。用我的语言回复。

我在要求什么：带来源的数字（成本、待办项、轮次、事故）；每个事故映射到一级台阶，因为一个不
落在任何一级的事故就是一级缺失的台阶；对它没有的数字的完整性条款（索要或标为估计）；以及
**至少一条对梯子的具体修改提案**，因为一次什么都不改变的复盘不是复盘。

## 3. 预期结果

- `docs/RESIDENT_AGENT.md`：系统地图、选定的范围、映射到一个人的凭证、批准流程，以及记录在
  日志里的拒绝证明。
- `docs/RETROSPECTIVE_[日期].md`：带来源的数字、映射到台阶的事故，以及至少一条附理由的对梯
  子的修改提案。

## 4. 完整性检验

- 系统地图说了代理**不能**看到什么吗？没说的话，它有隐藏的空洞。
- 你测试过（或在日志里看到）范围之外的动作被拒绝吗？
- 代理的凭证以一个可识别的人的名义行动吗？
- 复盘有带来源的数字，还是形容词？（"花了很多"不是数字。）
- 每个事故都落在一级台阶上吗？如果有一个哪级都不落，缺一级台阶：那就是修改提案。
- 至少有一条对梯子的具体修改提案吗？如果复盘什么都不改变，它就不是复盘。

## 5. 警报信号

- 驻留代理每周都"需要"更高一级的权限。检查它要的是为了解决系统的问题，还是它自己的限制。
- 复盘说一切顺利。从来不会一切顺利；它是写给你看的，不是写给方法的。
- 连续两个项目发生了同样的事故，而梯子在两者之间没有改变。第 15 级台阶没有闭合：复盘写了
  却没应用。
