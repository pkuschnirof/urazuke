# 步骤 10 — 诚实的验证与相称的报告（台阶契约）

**阶段：** 循环（每次变更关闭时）。
**形式：** 例行；这是代理每份报告都应有的形式。
**规模：** 所有项目必需，无例外。它不花成本，而且正是它让所有者可以不读代码。

## 用途

如果所有者不读代码，代理的报告就必须可信。不是乐观的，不是"表面完整的"：是可信的。这是方
法中真正新的东西：代码的作者也制造证据，而且无论对错都用同样笃定的语气。所以证据必须证明
它自己，报告必须把已验证的和相信的分开。

需要理解模型为什么倾向于多报。不是恶意：是因为它被训练成有用和完整，而一份说"这个我没能
验证"的报告看起来不如一份说"完成了"的有用。所以必须**明确要求**坏消息、盲点和没做的事。
你不要求，它就不给，不是因为它隐瞒，而是因为它不认为那是回答的一部分。

## 1. 所需上下文

- 完成的工作和要求它的待办项。
- 协作契约（第 1 级台阶），它已禁止宣布未做的事。

## 2. 提示词

**例行（放进协作契约；适用于每份报告）：**

> When you report, separate three blocks: VERIFIED (what you tested, with the command and its
> output), BELIEVED (what you think works but did not test, and why not), and BLIND SPOTS (what
> you cannot see from where you are: another environment, real data, the user's browser). Cover
> every item I asked for, one by one, even when the answer is "I did not do it". No claim
> without its proof next to it. Do not say "done": say what is done and how you know it. If
> something went wrong, say it first. Reply in my language.

我们在要求什么，逐条：三个块，这是让报告诚实的结构（已验证的附证据，相信的附没测的原因，
看不见的）；逐项覆盖，让什么都不会"被忘记"；每条断言旁边有证据；禁止干巴巴的"完成了"；
坏消息放在最前面，因为模型倾向于把它们留到最后或永远不说。

**面对所有者的"还是坏的"：**

> Before diagnosing again, compare the version running where I see the problem with the version
> that contains your fix. Tell me both. If they differ, the problem is publication, not code.

我们在要求什么：面对"还是坏的"，不要从头重新诊断，先比较版本。一半的"还是坏的"是修复在
仓库里但不在所有者看的地方。

## 3. 预期结果

代理的每份报告包含：

- 三个块（已验证 / 相信 / 盲点），哪怕有的是空的。
- 每个被要求的项一行，附状态。
- 每个"已验证"：命令和输出，或测试和结果，或数字和量具。
- 出了问题的事，放在开头而不是结尾。

## 4. 完整性检验

- 三个块都在吗？如果"相信"和"盲点"总是空的，代理就不诚实：总有它没看见的东西。
- 随机从"已验证"块挑一条断言：旁边有证据吗？你能复现吗？
- 是否覆盖了你要求的每一项，还是有一项"被忘了"？
- 坏消息在开头吗？
- 它有没有说过干巴巴的"完成了"？那是违反契约。

## 5. 警报信号

- 连续十份报告没有任何盲点。没有人能看见一切；块是空的是出于习惯，不是出于真实。
- "已验证"块里有"应该能用"之类的句子。那是伪装的"相信"。
- 报告比变更还长。相称的报告说该说的；膨胀的报告在用篇幅掩盖什么。
