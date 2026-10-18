# 步骤 6 — 决策写在代码旁边（台阶契约）

**阶段：** 循环。
**时机：** 循环的每次会话中，每当代理碰到一条没写下的业务规则，或者一个会改变用户所见的分
叉。通常每个功能块两三次。也在启动阶段（第 0 和第 3 级台阶）和上线生产阶段（第 12 和第 13
级）。
**形式：** 简短对话：代理察觉有一个决定要做，提问，并把它写下来。
**规模：** 所有项目必需。在小项目里，记录可以是一张十行的表；重要的是业务规则有所有者。

## 用途

让每条业务规则和每个结构性决定都有所有者、日期和位置。否则，六周后没人知道"已批准加余额回
到队列"是客户的决定还是代理的灵机一动。还要避免最糟的：代理因为觉得合理而发明领域规则。

这有一个后果我想大声说出来：模型碰到规则里的空缺时，**会把它填上**。它不停下来；它用它觉得
最可能的东西补全，而且和写其他东西一样自然。所以这级台阶的例行不是"写下决策"，而是"缺一条
时停下来问"。后者是难的，也是必须写进契约里要求的。把规则连同我的原话和日期写进提交的做法，
是我在互助会强制推行的 [Ref. 29](../REFERENCIAS.md#ref-29)；在构建之前冻结决策的做法来自我的
工具 [Ref. 5](../REFERENCIAS.md#ref-5)。

## 1. 所需上下文

- 与所有者的对话：这是唯一的上下文。代理不能决定业务规则。
- 一个约定好写决策的地方：提交信息、待办项的规格，以及一份 `docs/DECISIONS.md` 记录。

## 2. 提示词

**例行（放进协作契约）：**

> Whenever implementing something requires a business rule that is not written down, or you
> must choose between two approaches that change what the user sees, stop and ask me, in prose,
> with your recommendation and the alternative. Do not implement the one you prefer. When I
> decide, write the decision with my name and the date in the commit message, in the pending
> item's specification and in `docs/DECISIONS.md`, with the exact words I used. If I do not
> answer and you must move on, implement the most reversible option and mark it "decision by
> omission, pending confirmation", so that I can review it.

> [zh]
> 每当实现某件事需要一条没写下的业务规则，或者你必须在两种会改变用户所见的做法之间选择
> 时，停下来用散文问我，附你的建议和备选方案。不要实现你偏好的那个。当我决定后，把决定连
> 同我的名字和日期写进提交信息、待办项的规格和 `docs/DECISIONS.md`，用我用的原话。如果我
> 没回答而你必须继续，实现最可逆的选项，并标为"缺省决策，待确认"，以便我复查。

我在要求什么：面对没写下的规则或可见的分叉时**停下来**；提问时附建议和备选（让你十秒就能决
定，而不是十分钟）；把决定用你的原话记录在三个地方（提交、待办项、记录），而不是"改进过"的
转述；以及你没回答时，选最可逆的选项并标为"缺省"，那是让工作能继续而决定不会消失的东西。

**收尾（每个决定）：**

> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.

> [zh]
> 规则：[原话]。由我决定，[日期]。记下来，继续。

我在要求什么：一个决定的最小格式：规则原文、谁、何时。三样东西；缺任何一样都不是一条记录
在案的决定。

## 3. 预期结果

- `docs/DECISIONS.md`：每个决定一行或一段，附日期、谁决定的、原话、应用它的待办项或提交，
  以及是否"缺省"。
- 在每个受影响待办项的规格里：规则及其决定和日期。
- 在每次实现业务规则的提交里：来源的那句话。

## 4. 完整性检验

- 打开三次触及业务规则的提交：每次都引用了谁决定的、何时吗？
- 有没有未确认的"缺省"决定？确认或撤销它们；别留着。
- 系统里有没有哪条规则你不认为是你的？有的话，代理发明了它：这是这级台阶的故障，写成待办
  项并复查。
- 那些句子是原话，还是被代理"改进"过？必须是你的话。

## 5. 警报信号

- 过了一周的工作，决策记录没有增长。要么工作纯粹是机械的（罕见），要么代理自己做了决定。
- 记录的决定全都用同一种打磨过的风格写成。它们是代理的转述，不是你的话。
- 系统的一个用户问"它为什么这样做？"，没人找得到那个决定。
