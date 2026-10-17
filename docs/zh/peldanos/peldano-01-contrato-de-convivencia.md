# 步骤 1 — 协作契约（台阶契约）

**阶段：** 启动（每个项目一次；遭遇教训时修订）。
**形式：** 一次发送，所有者调整一轮。
**规模：** 所有项目必需。这是最便宜的一级台阶，也是避免最多挫败感的一级。

## 用途

让人类和代理在第一行代码之前就商定如何合作。看起来像形式，其实不是：正是它避免了代理
"帮忙"扩大范围、把债务留到以后，或者把它以为做了的事报告为已做。在 Forge 中这个文件叫
`SQ.md`（质量标准）；名字不重要，内容重要。

可以这样理解：代理是一个每天早上到来、对昨天没有记忆的新同事。契约是你第一天告诉它的，也
是它每天要重读的。不写下来，你就得每次都说，而且每次说得都不一样。

## 1. 所需上下文

- 项目方面：无；这是第一个文件。
- 所有者方面：工作偏好（语言、希望如何被提问、什么算浪费自己的时间、给代理多大的自主权）。

## 2. 提示词

**初始：**

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

我们在要求什么：六条最低规则，每条附它避免的故障（这使它们成为规则而非建议）；提出项目特有
的规则但标为提案，让所有者接受或拒绝；询问它需要了解的关于所有者的事。一份一个问题都没问
就写出来的契约是可疑的：代理不认识它将要共事的人。

**收尾：**

> I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the
> agreement with today's date and a version number. Then add to the project file the
> instruction to read this agreement at the start of every session.

我们在要求什么：用日期和版本号定稿契约，并把它挂到项目文件上，使其在每次会话中被读取。没有
这个挂接，契约存在但不起作用。

## 3. 预期结果

一个 `docs/WORKING_AGREEMENT.md`（或 `SQ.md`、`CONTRATO.md`）文件，包含：

- 日期和版本。
- 每条规则编号，一两句话，附它避免的故障。
- 项目特有的规则，标明为此。
- 末尾一行说明代理可以提议修改，但不单独编辑契约。

以及项目文件（`PROJECT.md` 或 `CLAUDE.md`）中的一行，命令在每次会话开始时读它。

## 4. 完整性检验

- 六条最低规则是否都在，每条都附它避免的故障？
- 是否有规则写成了愿望（"尽量……"、"尽可能……"）？有的话就没用：规则要么遵守要么不遵守。
- 项目文件是否命令每次会话读它？
- 代理是否至少问了你一个关于你如何工作的问题？如果什么都没问就写完了，那是可疑的：它不认识
  你。

## 5. 警报信号

- 契约超过二十条规则。没有人，无论人类还是模型，能遵守二十条规则；能遵守的是六到八条。
- 有一条规则说"代理认为必要时可以修改本契约"。不行。
- 两周后，代理做了契约禁止的事而没人注意。契约没有被读：检查项目文件中的挂接。
