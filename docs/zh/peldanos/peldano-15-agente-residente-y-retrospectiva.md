# 步骤 15 — 系统里的代理，以及带数字的复盘（台阶契约）

**阶段：** 运维（系统已在生产中）与收尾（回到第 0 级台阶，为下一个项目）。
**形式：** 两部分：一次定义驻留代理范围的对话，和一次复盘的长发送。
**规模：** 驻留代理可选（很多系统不需要；有用户要支持的需要）。复盘在所有项目中必需，哪
怕只有一页：没有它，方法就不会学习。

## 用途

两件事闭合同一个循环。第一：代理以受限范围驻留在生产中，在构建者不在场时诊断、运维和提供
支持。第二：方法自身用数字复盘，学到的东西改变梯子。它避免没有系统地图就运维的代理，以及
一个项目接一个项目重复而不学习的方法（多代理团队就是以一次复盘关闭的：60 美元加 73 分钟对
90 分钟）。

关于驻留代理，统领一切的规则：**它以某人的名义行动**。它的凭证绑定到一个负责的人，它做的
一切都以那个人的名义记录。它不是匿名的系统账号：它是一个有上司的雇员。这定义了它的范围
（那个人授权了什么）和可追溯性（谁为它做的事负责）。

## 1. 所需上下文

驻留代理：
- 代理在生产中能做什么、不能做什么：读、诊断、改配置、执行动作。所有者决定。
- 代理如何向系统表明身份（自己的凭证，绑定到一个负责的人）。
- 它发现解决不了的事时通知谁（工单、邮件）。

复盘：
- 项目的事故、成本（token、配额、所有者的时间）、兜了最多圈子的待办项、日期。

## 2. 提示词

**驻留代理（初始）：**

> We are going to leave you resident in production. First, build the map of the system you will
> need in order to operate it: modules, environments, where each configuration lives, which
> actions are consequential (read `docs/LOCKS.md`), whom to notify. If there are parts of the
> system you cannot see from where you are, tell me; the map must not have hidden gaps. Then
> propose your scope in three levels: read-only and diagnosis; configuration changes with my
> approval; consequential actions behind locks. I choose the level. Your credential acts as the
> person who created it: everything you do is logged under that person's name. Reply in my
> language.

我们在要求什么：运维之前先有系统地图（没有地图就运维正是这级台阶避免的故障）；这级台阶
形式的完整性条款：**地图的空洞要声明，不要隐藏**；三个层级的范围，让所有者选一个而不是
"看情况"；以及以某人名义的凭证规则。

**驻留代理（收尾）：**

> Level [X]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the credential (never its
> value), and the procedure to request my approval. Then prove, with a real attempt recorded in
> the log, that something outside your scope is rejected.

我们在要求什么：驻留代理的文档（永远不含凭证的值），以及范围的先证红：一次真实的、记录在
日志里的、层级之外的尝试，被拒绝。这是第 7 级台阶应用于权限。

**复盘：**

> [The stage / the project] is over. Do the retrospective with numbers, not impressions: what it
> cost (tokens, quota, my time), how many pending items, which ones took the most rounds and why,
> which incidents happened and which step of the ladder each falls into, and which step failed
> or was missing. If you lack the data for any figure (my time, for instance), ask me for it or
> mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder:
> which step is modified, how, and which incident justifies it. Write it to
> `docs/RETROSPECTIVE_[date].md`. Reply in my language.

我们在要求什么：带来源的数字（成本、待办项、轮次、事故）；每个事故映射到一级台阶，因为不落
在任何一级的事故就是缺的那一级；它没有的数字的完整性条款（索要或标为估算）；以及**至少一
条对梯子的具体修改提议**，因为不改变任何东西的复盘不是复盘。

## 3. 预期结果

- `docs/RESIDENT_AGENT.md`：系统地图、选定的范围、绑定到人的凭证、批准流程，以及记录在日志
  里的拒绝证据。
- `docs/RETROSPECTIVE_[date].md`：带来源的数字、映射到台阶的事故，以及至少一条附理由的对
  梯子的修改提议。

## 4. 完整性检验

- 系统地图是否说了代理看不见什么？没说的话，它有隐藏的空洞。
- 你测过（或在日志里看到）范围之外的动作被拒绝吗？
- 代理的凭证是以一个可识别的人的名义行动的吗？
- 复盘有带来源的数字，还是形容词？（"花了很多"不是数字。）
- 每个事故都落在某一级台阶上吗？如果有一个不落在任何一级，就缺一级：那就是修改提议。
- 至少有一条对梯子的具体修改提议吗？如果复盘不改变任何东西，它就不是复盘。

## 5. 警报信号

- 驻留代理每周都"需要"更高的权限级别。看看它要的是为了解决系统的问题，还是它自己的限制。
- 复盘说一切顺利。从来不会一切顺利；它是写给所有者看的，不是写给方法的。
- 连续两个项目出了同样的事故，而梯子在两者之间没变。第 15 级台阶没有闭合：复盘写了却没应用。
