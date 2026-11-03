# 步骤 12 — 诚实的验证与相称的报告（台阶契约）

**阶段：** 循环。
**时机：** 每份报告，每个待办项，整个项目期间。这是代理告诉你的一切必须具备的形式。
**形式：** 例行；是代理每份报告必须具备的形式。
**规模：** 所有项目必需，无例外。它不花任何代价，而且是让所有者不读代码的东西。

## 用途

如果你不打算读代码，代理的报告就必须可信。不是乐观的，不是"看起来完整的"：可信的。这是方
法里真正新的东西：代码的作者也制造证据，而且无论对错都用同样笃定的语气。所以证据必须证明它
自己，报告必须把已验证的和相信的分开。这条规则我在六月写下
[Ref. 8](../REFERENCIAS.md#ref-8)，十月又再次需要它，那时一个认证错误被报告成了"success"
[Ref. 43](../REFERENCIAS.md#ref-43)。

要理解模型为什么倾向于多报。不是恶意：它被训练成有用且完整，而一份说"这个我没能验证"的报
告，感觉上不如一份说"搞定"的有用。所以**明确地向它索要**坏消息、盲点和它没做的事。你不要，
它就不给，不是因为它隐瞒，而是因为它不认为那是回答的一部分。

## 1. 所需上下文

下面这份是通用清单。你在每条提示词之前必须已经做好的具体文件，连同它们的内容和最低状态，在第
2 节里，在每条提示词前面的"发送提示词之前"方框里。

- 做完的工作和要求它的待办项。
- 协作契约（第 1 级台阶），它已经禁止宣告没做的事。

## 2. 提示词

**例行（放进协作契约；每份报告都适用）：**

**发送提示词之前**，下面这些必须已经存在，而且是你（或业务方和你一起）来做，不是代理：

- `docs/WORKING_AGREEMENT.md`（第 1 级台阶），这条例行要加进去的地方。
- 你在这次会话里要求过的事情的清单，由你写下来（请求里的各项），用来对照报告：提示词要求它逐
  项覆盖，而你得知道一共有几项。
- 最低可接受状态：没有别的了。这条例行贴一次，永远生效。

> When you report, separate three blocks: VERIFIED (what you tested, with the command and its
> output), BELIEVED (what you think works but did not test, and why not), and BLIND SPOTS (what
> you cannot see from where you are: another environment, real data, the user's browser). Cover
> every item I asked for, one by one, even when the answer is "I did not do it". No claim
> without its proof next to it. Do not say "done": say what is done and how you know it. If
> something went wrong, say it first.
>
> When you report, also report the Annex H groups: what was measured, what
> only warns and why, and which rule is switched off with its reason, who
> authorised it and its review date. Report the two dashboard figures with
> the fingerprint they were computed with (catalogue version, active and
> switched-off rules, frontend adapter, tool versions) and with the account
> of any movement. No figure closes a block: the green is decided rule by
> rule, and a switched-off rule with no written exception turns the whole
> report red.
>
> When what you report is a finding about how we work and not about what we built, close it with
> the fixed key `findings_by_destination`: each finding assigned to `product` if the defect is in
> the system, `method` if it is in the method being followed, `tool` if it is in the tool that
> runs it, and written into the register of that destination. A defect of the method or of the
> tool filed in the product's register is a defect nobody is ever going to fix.
>
> And when this closing touches manual test cases, declare its reach with three fixed keys:
> `cases_touched`, how many cases this closing touches; `cases_with_an_execution_row`, how many of
> those a person has signed with a date and a name; and `executed_by`, who signed them. When the
> answer is none, say it in so many words: a case that is written and that nobody ran is not half a
> verification, it is zero with the appearance of one (Annex H, CQ-21.2). Read the figures from the
> signed execution tables and from nothing else, never from your own reading of the system.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [zh]
> 报告时，分成三块：已验证（你测过的，附命令和它的输出）、相信（你认为能用但没测的，以及
> 为什么没测）和盲点（你从你所在的位置看不到的：另一个环境、真实数据、用户的浏览器）。逐
> 一覆盖我要求的每一项，即使答案是"我没做"。没有一条断言旁边没有它的证据。不要说"搞定"：
> 说做了什么、你怎么知道的。如果有什么出了错，先说它。用我的语言回复。
>
> 汇报时也要汇报附录H的分组：测了什么，什么只是警告以及为什么，哪条规则被关掉、理由、
> 谁批准的、复查日期。两个看板数字要带着计算它们时用的指纹（目录版本、启用与关掉的规则、
> 前端适配器、工具版本）以及任何变动的记录来汇报。任何数字都不关闭一个块：绿是逐条规则
> 决定的，一条被关掉却没有书面例外的规则会让整份汇报变红。
>
> 当你报告的是关于我们怎么工作、而不是关于我们造了什么的发现时，用固定的键
> `findings_by_destination` 收尾：每个发现都指派——缺陷在系统里就是 `product`，在所遵循的
> 方法里就是 `method`，在运行它的工具里就是 `tool`——并写进那个去向的登记册。把方法或工具的
> 缺陷记在产品的登记册里，是一个永远没人会修的缺陷。
>
> 而当这次收尾动到人工测试用例时，用三个固定的键声明它的到达范围：`cases_touched`，这次收尾动到了
> 多少个用例；`cases_with_an_execution_row`，其中有多少个有人用日期和姓名签过；以及 `executed_by`，
> 是谁签的。如果答案是一个都没有，就把话说全：一个写好了却没人跑过的用例，不是半次验证，而是看起
> 来像一次验证的零（附录 H，CQ-21.2）。这些数字出自签过名的执行表格，除此之外别无来处，绝不出自你
> 自己对系统的阅读。
>
> 当你需要我做决定时，用 UX-28（`docs/ANEXO_HEURISTICAS.md`）的四个部分来问，并按这个顺序：让这个
> 问题成为必要的数据，列举出来；不超过五行的一段话，把这些数据连起来并让问题显现；问题本身，可能的
> 答案逐一编号；以及你的推荐。用项目在 `communication_depth` 中声明的技术深度来说——`beginner`、`de
> cision_maker` 或 `technical`——；项目没有声明就用 `decision_maker`。

我在要求什么，逐条：三块，那是让报告诚实的结构（已验证的附证据，相信的附为什么没测的理由，
它看不到的）；逐项覆盖，让没有什么"被忘掉"；每条断言旁边的证据；禁止光秃秃的"搞定"；以及坏
消息先说，因为模型倾向于把它们留到最后或永远不说。

还有，从 D-080 起，是去向：一份把方法的缺陷送进产品登记册的报告，可以是诚实的，也可以是没用
的，因为本来修得了它的那个人从来不知道。登记册有三个，而这条例程把它们点名。

**面对你的一句"还是坏的"：**

**发送提示词之前**，你手边必须有这些：

- 你的验证，在你看的那个地方做的（测试环境、你的浏览器），看到的东西记下来：在哪个 URL，系统
  显示的是哪个版本（如果它显示的话），你做了什么，你期待什么，结果发生了什么。
- 代理说包含那个修复的版本号或提交号，从它上一份报告里抄下来。
- 最低可接受状态：你能对它说"我在 [URL] 看，看到版本 [N]，我做了 [这个]，发生了 [这个]"。没
  有这些，"还是坏的"就只是一种印象，而代理会去诊断一种印象。

> Before diagnosing again, compare the version running where I see the problem with the version
> that contains your fix. Tell me both. If they differ, the problem is publication, not code.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [zh]
> 在重新诊断之前，比较我看到问题的地方正在运行的版本和包含你修复的版本。两个都告诉我。如
> 果它们不同，问题在发布，不在代码。
>
> 当你需要我做决定时，用 UX-28（`docs/ANEXO_HEURISTICAS.md`）的四个部分来问，并按这个顺序：让这个
> 问题成为必要的数据，列举出来；不超过五行的一段话，把这些数据连起来并让问题显现；问题本身，可能的
> 答案逐一编号；以及你的推荐。用项目在 `communication_depth` 中声明的技术深度来说——`beginner`、`de
> cision_maker` 或 `technical`——；项目没有声明就用 `decision_maker`。

我在要求什么：面对"还是坏的"时不要从零重新诊断，而是先比较版本。一半的"还是坏的"是修复在
仓库里、却不在你看的地方 [Ref. 45](../REFERENCIAS.md#ref-45)。

## 3. 预期结果

代理的每份报告包含：

- 三块（已验证 / 相信 / 盲点），哪怕有一块是空的。
- 每个要求的项一行，附其状态。
- 每个"已验证"：命令和输出，或测试和结果，或数字和它的量具。
- 出错的东西，在开头而不是结尾。
- 还有，当报告产出的是关于我们怎么工作、而不是关于我们造了什么的发现时，
  `findings_by_destination`：每个发现带着它的去向——产品、方法或工具——并写进那个去向的
  登记册。
- 而当这次收尾动到人工用例时：`cases_touched`、`cases_with_an_execution_row` 和 `executed_by`；
  如果答案是一个都没有，就把话说全。
## 4. 完整性检验

- 三块都在吗？如果"相信"和"盲点"总是空的，代理没有诚实：总有它没看到的东西。
- 从"已验证"块随机挑一条断言：它旁边有证据吗？你能复现吗？
- 它覆盖了你要求的每一项，还是有一项"被忘了"？
- 坏消息在开头吗？
- 它有没有哪次光说"搞定"？那是违反契约。
- 那些不属于系统的发现，有没有被指派去向、有没有开在该开的登记册里？方法和工具不是从产品的
  登记册里修好的。
- 报告有说这次收尾动到了多少个人工用例、其中有多少个有人签过吗？如果那个数字只在用例所在的文件
  里，就没有人会读它：一个需要人专门去找的数字，拦不住任何人。
## 5. 警报信号

- 连续十份报告没有任何盲点。没有人什么都看得见；那块是出于习惯而空，不是出于真相。
- "已验证"块里有"应该能用"之类的句子。那是伪装的"相信"。
- 报告比变更还长。一份相称的报告说该说的；一份膨胀的报告在用篇幅遮盖什么。
- 报告说这个块已经验证过了，而这个块的人工用例，执行表格是空的。写下来不等于跑过。
