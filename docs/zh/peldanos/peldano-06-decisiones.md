# 步骤 6 — 决策写在代码旁边（台阶契约）

**阶段：** 循环（每次出现业务规则或结构性决定时）。
**形式：** 简短对话：代理察觉有决定要做，提问，并写下。
**规模：** 所有项目必需。小项目的记录可以是一张十行的表；重要的是业务规则有所有者。

## 用途

让每条业务规则和每个结构性决定都有所有者、日期和位置。否则六周后没人知道"已批准加余额
回到队列"是客户的决定还是代理的临时想法。它还避免最糟的事：代理因为觉得合理而编造领域
规则。

这有一个值得大声说出的后果：模型遇到规则中的空缺时，**会把它填上**。它不会停下来；它用它
觉得最可能的东西补全，和写其他东西一样自然。所以这级台阶的例行不是"把决定写下来"，而是
"缺一条时停下来问"。后者才是难的，也是契约中必须要求的。

## 1. 所需上下文

- 与所有者的对话：这是唯一的上下文。代理不能决定业务规则。
- 一个约定的写决定的地方：提交信息、待办项文档，或 `docs/DECISIONS.md` 记录。

## 2. 提示词

**例行（放进协作契约）：**

> Whenever implementing something requires a business rule that is not written down, or you
> must choose between two approaches that change what the user sees, stop and ask me, in prose,
> with your recommendation and the alternative. Do not implement the one you prefer. When I
> decide, write the decision with my name and the date in the commit message and in
> `docs/DECISIONS.md`, with the exact words I used. If I do not answer and you must move on,
> implement the most reversible option and mark it "decision by omission, pending confirmation",
> so that I can review it.

我们在要求什么：面对未写下的规则或可见的分叉时**停下**；带推荐和备选方案提问（让所有者十
秒内决定，而不是十分钟）；用所有者的原话记录决定，而不是"改进过的"转述；以及所有者不回答
时，选最可逆的选项并标为"因缺省"，这让工作能继续而决定不会消失。

**收尾（每个决定）：**

> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.

我们在要求什么：一个决定的最小格式：规则原文、谁、何时。三样；缺任何一样都不是记录在案的
决定。

## 3. 预期结果

- `docs/DECISIONS.md`：每个决定一行或一段，附日期、决定者、原话、应用它的待办项或提交，以及
  是否"因缺省"。
- 每个实现业务规则的提交中：来源语句（"rule from the owner: approved + balance = back to the
  queue"、"owner decision 2026-08-10"）。

## 4. 完整性检验

- 打开三个涉及业务规则的提交：每个都引用了谁决定、何时决定吗？
- 是否有未确认的"因缺省"决定？确认或撤销它们；别留着。
- 系统中是否有你不认得是自己的规则？有就说明代理编造了：这是台阶的故障，写成待办项并审查。
- 语句是原话还是被代理"改进"了？必须是你的话。

## 5. 警报信号

- 一周的工作过去了，决定记录没有增长。要么工作纯粹是机械的（罕见），要么代理自己决定了。
- 记录的决定全都用同一种打磨过的风格写成。那是代理的转述，不是你的话。
- 系统的用户问"为什么它这么做？"而没人能找到决定。
