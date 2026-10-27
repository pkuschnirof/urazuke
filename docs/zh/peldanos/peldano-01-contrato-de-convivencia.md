# 步骤 1 — 协作契约（台阶契约）

**阶段：** 启动。
**时机：** 只做一次，紧接着适格性之后；当一次教训要求时再修订。
**形式：** 一次发送，加上你的一轮调整。
**规模：** 所有项目必需。这是所有台阶里最便宜的一级，也是避免最多挫败的一级。

## 用途

在第一行代码之前，把你和代理将如何工作写下来。看起来像走形式，其实不是：它避免代理通过扩大
范围来"帮忙"、把债务留到以后、或者把它以为做了的事报告为已完成。在我的工具里这个文件叫
`SQ.md`（质量标准）；名字不重要，内容重要。

这样想：代理是一个新同事，每天早上到来时不记得昨天。契约是你第一天对它说的话，也是它每天要
重读的话。如果你不写下来，你每次都得再说一遍，而且每次说得都不一样。我第一次写它，是在每次
会话重复同样的话两周之后 [Ref. 1](../REFERENCIAS.md#ref-1)，而我写进去的没有一条在系统工程里
是新的；新的是必须把它写给一个没有记忆的人。

## 1. 所需上下文

下面这份是通用清单。你在每条提示词之前必须已经做好的具体文件，连同它们的内容和最低状态，在第
2 节里，在每条提示词前面的"发送提示词之前"方框里。

- 项目方面的：没有；这是第一个文件。
- 你的：你的工作偏好（语言、希望它怎么问你、什么算浪费你的时间、给代理多大的自主权）。

## 2. 提示词

**初始：**

**发送提示词之前**，下面这些必须已经存在，而且是你（或业务方和你一起）来做，不是代理：

- 项目的东西一样都不需要：这是要写的第一个文件。如果你已经做过第 0 级台阶，
  `docs/ELIGIBILITY.md` 就存在，让代理看到它也挺好，但不是必需的。
- 你的工作偏好，在开始之前想好，并记在一张你手边的短清单上（写在一张纸上，或者，如果你想让它
  留在仓库里，写进 `docs/MY_PREFERENCES.md`）：你希望对话用哪种语言；你希望它问你多少（少问，
  但带上推荐；还是多问）；什么在你看来是浪费你的时间；你给它多大的自主权（它能自己提交吗？能
  自己部署到测试环境吗？生产环境永远不行吗？）；什么是你不能容忍的。代理会就这些问你；这张清
  单是为了让你一行话就能回答，而不是临场发挥。
- 项目文件夹已创建，代理在里面打开。
- 最低可接受状态：那五个问题你每一个都答得上来。出来的契约会和你的回答一样好。

> Before we write any code, we are going to set the working agreement between you and me.
> Write `docs/WORKING_AGREEMENT.md` with at least these rules, each with one line explaining
> what it prevents: (1) My time is sacred: do not ask me what you can resolve on your own, and
> when you do ask, ask in prose, with your recommendation. (2) Zero technical debt: whatever
> breaks is fixed at the root, with its regression test, in the same session. (3) Exact scope:
> no more and no less than what was asked; if you see something else, log it as a pending item,
> do not do it. (4) Documentation is updated in the same commit as the change. (5) Never report
> as done something you have not verified; always separate what you verified from what you
> believe. (6) Speak my language. Add any rules you think this project needs, marked as
> proposals. If you need to know something about how I work in order to write this, ask me.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [zh]
> 在写任何代码之前，我们要确定你我之间的协作契约。写 `docs/WORKING_AGREEMENT.md`，至少包含
> 这些规则，每条附一行说明它避免什么：(1) 我的时间是神圣的：别问我你自己能解决的事，要问
> 的时候，用散文问，附你的建议。(2) 零技术债务：坏了的东西从根上修，附回归测试，在同一次
> 会话中。(3) 范围精确：不多不少，只做要求的；如果你看到别的，记为待办项，不要做。(4) 文
> 档在变更的同一次提交中更新。(5) 绝不把你没验证的事报告为已完成；永远把你验证过的和你相
> 信的分开。(6) 说我的语言。加上你认为这个项目需要的规则，标为提案。如果为了写这个你需要
> 了解我怎么工作，问我。
>
> 当你需要我做决定时，用 UX-28（`docs/ANEXO_HEURISTICAS.md`）的四个部分来问，并按这个顺序：让这个
> 问题成为必要的数据，列举出来；不超过五行的一段话，把这些数据连起来并让问题显现；问题本身，可能的
> 答案逐一编号；以及你的推荐。用项目在 `communication_depth` 中声明的技术深度来说——`beginner`、`de
> cision_maker` 或 `technical`——；项目没有声明就用 `decision_maker`。

我在要求什么：六条最低规则，每条附它避免的故障（这正是让它们成为规则而不是建议的东西）；它
提出项目自己的规则但标为提案，由你接受或拒绝；以及问它需要了解的关于你的事。一份一个问题都
没问就写出来的契约是可疑的：代理不认识它将要共事的人。

**收尾：**

**发送提示词之前**，你手边必须有这些：

- 代理写的 `docs/WORKING_AGREEMENT.md` 草稿，由你从头到尾读过一遍。对他提议的每一条规则，你
  的裁决：接受还是拒绝，如果拒绝，一行话的理由。这些要填进提示词的 [X, Y] 和 [Z] 两个空里，
  而填空的人是你。
- 他问你"你怎么工作"的那些问题的回答，已经在聊天里给过了。
- 最低可接受状态：没有一条提议的规则留着没有裁决。一条你既没接受也没拒绝的规则，会像你接受了
  一样留在契约里。

> I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the
> agreement with today's date and a version number. Then add to the project file the
> instruction to read this agreement at the start of every session.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [zh]
> 我接受规则 1 到 6 和你的提案 [X, Y]；我拒绝 [Z]，因为 [原因]。用今天的日期和一个版本号
> 定稿契约。然后在项目文件中加上每次会话开始时读这份契约的指令。
>
> 当你需要我做决定时，用 UX-28（`docs/ANEXO_HEURISTICAS.md`）的四个部分来问，并按这个顺序：让这个
> 问题成为必要的数据，列举出来；不超过五行的一段话，把这些数据连起来并让问题显现；问题本身，可能的
> 答案逐一编号；以及你的推荐。用项目在 `communication_depth` 中声明的技术深度来说——`beginner`、`de
> cision_maker` 或 `technical`——；项目没有声明就用 `decision_maker`。

我在要求什么：用日期和版本定稿契约，并把它挂到项目文件上，让每次会话都读它。没有那个挂钩，
契约存在但不起作用。

## 3. 预期结果

一个 `docs/WORKING_AGREEMENT.md` 文件（或 `SQ.md`，或 `CONTRATO.md`），包含：

- 日期和版本。
- 每条规则编号，一到两句话，附它避免的故障。
- 项目自己的规则，标为项目规则。
- 页脚一行，说明代理可以提议修改但不能独自编辑契约。

以及项目文件（`PROJECT.md` 或 `CLAUDE.md`）里一行，命令每次会话开始时读它。

## 4. 完整性检验

- 六条最低规则是否都在，每条附它避免的故障？
- 有没有哪条规则写成了愿望（"尽量……"、"尽可能……"）？有的话，它没用：规则要么遵守要么
  不遵守。
- 项目文件是否命令每次会话都读它？
- 代理是否至少问了你一个关于你怎么工作的问题？如果它什么都没问就全写好了，可疑：它不认
  识你。

## 5. 警报信号

- 契约超过二十条规则。没有人，无论人类还是模型，遵守二十条规则；遵守的是六到八条。
- 有一条规则说"代理可以在认为必要时修改本契约"。不行。
- 两周后，代理做了契约禁止的事，没人注意到。契约没被读：检查项目文件里的挂钩。
