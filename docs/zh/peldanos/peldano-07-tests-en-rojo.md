# 步骤 7 — 作为锁的测试，先证红（台阶契约）

**阶段：** 循环（每次变更）。
**形式：** 一次发送；代理执行并报告，所有者读报告。
**规模：** 所有项目必需。这是方法的核心：如果有一级台阶不可协商，就是这一级。

## 用途

一个你从没见它失败过的测试，你不知道它是否证明了什么。这里的规则不是"写测试"：而是"证明
测试对旧代码变红，然后对新代码变绿"。它避免因为什么都不证明而通过的测试，以及掩盖缺陷的
绿色。

为什么这对模型比对人类程序员更重要：模型**在同一次会话中、用同一种理解**写代码和测试。如果
它误解了请求，测试会证明它理解的东西，并且通过。对旧代码的红色是检验测试在看重要的东西的
唯一廉价方法：如果旧代码也能通过，测试就区分不了前后，那它就没用。

## 1. 所需上下文

- 已实现的变更（默认测试在实现之后；"先写测试"作为小而明确的范围的选项保留）。
- 引发变更的待办项，附其"如何验证"。
- 现有的测试套件和运行它的命令（第 4 级台阶）。

## 2. 提示词

**例行（放进协作契约；每次变更都适用）：**

> To close this pending item I need evidence, not your word. (1) Write the test that proves what
> the item asks for. (2) Demonstrate that this test fails against the previous code: you may
> temporarily revert the change, or run the test against the old version, but show me the red
> output. (3) Show me the green output with the change. (4) Run the regression suite for the
> neighbouring items and show me it is still green. (5) Do not replace with mocks the very part
> you are trying to test. If testing end to end requires something you lack (data, access, an
> environment), ask me for it; do not simulate what you do not have. Finally, the commit message
> says "proved red against [what]" and the test counts.

我们在要求什么，逐条：(1) 测试；(2) **展示出来的红色**，输出可见，这是把本方法和"写测试"
区分开的条款；(3) 绿色；(4) 同一会话中邻近项的回归，因为一个变更会弄坏旁边的东西；(5) 不要
恰好 mock 掉要测的东西；以及适配这级台阶的完整性条款：端到端测试缺什么，**索要，不模拟**。
带数字的提交信息把证据留在代码所在的地方。

**当代理说无法测试时：**

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

我们在要求什么："无法测试"不是对话的结束，而是一个待办项的开始。不可测试性是债务，债务要
记录。

## 3. 预期结果

- 仓库中的新测试，以它关闭的待办项命名。
- 代理的报告和提交信息中：红色输出（多少个失败、对哪个版本）、绿色输出，以及带数字的绿色
  回归。
- 如果做了端到端测试（界面 → 后端），后端变化的证据（行、记录、状态）。

## 4. 完整性检验

- 报告是否展示了红色？带数字："8 个中 4 个对旧标准失败"。只展示绿色，台阶就没登上。
- 回归是否在同一会话中运行？多少个测试，多少个绿？
- 变更所在的地方是否恰好有"模拟"（mock）的部分？问代理它模拟了什么、为什么。
- 提交是否引用了待办项并写了"先证红"？
- 如果测试是界面测试，是否也验证了对后端的效果？

## 5. 警报信号

- 这周所有新测试第一次就全绿，从没展示过红色。要么代理省略了步骤，要么测试什么都不证明。
- 测试套件越来越慢，没人知道为什么。通常是端到端测试被换成了模拟，"为了跑得快"。
- 代理报告"测试通过"而不说多少个。永远要带数字。
