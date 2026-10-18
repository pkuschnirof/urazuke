# 步骤 7 — 作为锁的测试，先证红（台阶契约）

**阶段：** 循环。
**时机：** 每个待办项关闭时：红色和绿色的测试、邻近项的回归，以及所触及流程的端到端测试。
全部流程的完整端到端测试套件，在每个功能块收尾时和每次部署到生产之前。
**形式：** 一次发送；代理执行并报告，你读报告。
**规模：** 所有项目必需。这是方法的核心：如果有一级台阶不可协商，就是这一级。

## 用途

一个你从没见它失败过的测试，你不知道它是否证明了什么。这里的规则不是"写测试"：而是"证明测
试对旧代码变红，然后对新代码变绿"。它避免因为什么都不证明而通过的测试，以及掩盖缺陷的绿色
[Ref. 44](../REFERENCIAS.md#ref-44)。

为什么这对模型比对人类程序员更重要：模型**在同一次会话中、用同一种理解**写代码和测试。如果
它误解了请求，测试会证明它理解的东西，并且通过。对旧代码的红色是检验测试在看重要的东西的唯
一廉价方法：如果旧代码也能通过，测试就区分不了前后，那它就没用。把这一点展示得最清楚的案例
是对不上的计数器 [Ref. 26](../REFERENCIAS.md#ref-26)。

还有第二半：端到端测试。一个从界面出发验证（点击、输入、读取）并在后端检查效果（行留下了，
状态变了）的测试，才是替代你读代码的东西。待办项的验收标准（"给定、当、那么"）是它的脚本。
而且它们在三个尺度上跑三次：每个待办项跑所触及的流程，每个功能块收尾时跑全部流程，生产之前
用精确版本跑全部流程。

## 1. 所需上下文

- 已实现的变更（默认测试在实现之后；"先写测试"作为小而明确的范围的选项保留）。
- 引发变更的待办项，附其验收标准和"如何验证"。
- 现有的测试套件和运行它的命令（第 4 级台阶）。

## 2. 提示词

**例行（放进协作契约；每次变更都适用）：**

> To close this pending item I need evidence, not your word. (1) Write the test that proves what
> the item asks for, following its acceptance criteria. (2) Demonstrate that this test fails
> against the previous code: you may temporarily revert the change, or run the test against the
> old version, but show me the red output. (3) Show me the green output with the change. (4) Run
> the regression suite for the neighbouring items and show me it is still green. (5) Run the
> end-to-end test of the flow this item touches, from the screen to the backend, and show me the
> backend effect. (6) Do not replace with mocks the very part you are trying to test. If testing
> end to end requires something you lack (data, access, an environment), ask me for it; do not
> simulate what you do not have. Finally, the commit message says "proved red against [what]"
> and the test counts.

> [zh]
> 要关闭这个待办项，我需要证据，不是你的口头保证。(1) 写出证明该项所要求之事的测试，遵循
> 它的验收标准。(2) 证明这个测试对之前的代码会失败：你可以临时撤销变更，或对旧版本运行测
> 试，但要给我看红色的输出。(3) 给我看带变更的绿色输出。(4) 运行邻近项的回归套件，给我看
> 它仍是绿色。(5) 运行该项触及的流程的端到端测试，从界面到后端，给我看后端的效果。(6) 不
> 要恰好用模拟（mock）替换你要测的那部分。如果端到端测试需要你没有的东西（数据、访问权、
> 环境），向我索要；不要模拟你没有的。最后，提交信息写"对 [什么] 先证红"以及测试的数字。

我在要求什么，逐条：(1) 测试，由待办项的验收标准引导；(2) **展示出来的红色**，输出可见，这
是把本方法和"写测试"区分开的条款；(3) 绿色；(4) 同一会话中邻近项的回归，因为一个变更会弄坏
旁边的东西；(5) 所触及流程的端到端测试，后端效果可见；(6) 不要恰好模拟要测的东西；以及适配
这级台阶的完整性条款：端到端测试缺什么，**索要，不模拟**。带数字的提交信息把证据留在代码所
在的地方。

**每个功能块收尾时和每次部署到生产之前：**

> Run the complete end-to-end suite of every flow that exists so far, in the test environment,
> with the exact version that will be promoted. Show me the counts, and for each flow the
> backend check that proves it. If any flow has no end-to-end test, say so and open a pending
> item for it; do not pass it as covered.

> [zh]
> 在测试环境中，用将要提升的精确版本，运行到目前为止存在的每个流程的完整端到端套件。给我
> 看数字，以及每个流程证明它的后端检查。如果有哪个流程没有端到端测试，说出来并为它开一个
> 待办项；不要把它当作已覆盖放过去。

我在要求什么：端到端测试的第二和第三个尺度，用精确版本（不是"最新的"），每个流程附后端效果，
以及完整性条款：没覆盖的要声明并变成待办项，不当作已覆盖放过去。

**当代理说无法测试时：**

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

> [zh]
> 解释为什么无法测试、要加什么才能测试，并为此开一个待办项。变更在能测试之前不算关闭。

我在要求什么："无法测试"不是对话的结束，而是一个待办项的开始。不可测试性是债务，债务要
记录。

## 3. 预期结果

- 仓库中的新测试，以它关闭的待办项命名。
- 代理的报告和提交信息中：红色输出（多少个失败、对哪个版本）、绿色输出，以及带数字的绿色
  回归。
- 所触及流程的端到端测试，附后端变化的证据（行、记录、状态）。
- 每个功能块收尾时和生产之前：完整端到端套件绿色，按流程，用精确版本。

## 4. 完整性检验

- 报告是否展示了红色？带数字："8 个中 4 个对旧标准失败"。只展示绿色，台阶就没登上。
- 回归是否在同一会话中运行？多少个测试，多少个绿？
- 变更所在的地方是否恰好有"模拟"（mock）的部分？问代理它模拟了什么、为什么。
- 提交是否引用了待办项并写了"先证红"？
- 界面测试是否也验证了对后端的效果？
- 功能块收尾时：所有流程都在端到端套件里，还是有哪个"靠单元测试覆盖"？

## 5. 警报信号

- 这周所有新测试第一次就全绿，从没展示过红色。要么代理省略了步骤，要么测试什么都不证明。
- 测试套件越来越慢，没人知道为什么。通常是端到端测试被换成了模拟，"为了跑得快"。
- 代理报告"测试通过"而不说多少个。永远要带数字。
- 你到了上线生产，完整的端到端套件第一次运行。功能块的收尾被漏掉了。
