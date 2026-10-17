# 步骤 5 — 计划就是待办项（台阶契约）

**阶段：** 循环（每次变更都用，贯穿整个项目）。
**形式：** 创建时一次发送；之后是每次会话的例行。
**规模：** 所有项目必需。这级台阶让其他所有台阶可追踪：没有编号的待办项，就没有地方挂
证据。

## 用途

让有顺序和闸门的单一工作队列成为项目的事实。没有"计划"在一边、"任务"在另一边：待办项列表
就是计划。它避免两周后被超越而过时的规格说明，以及没人知道为什么做的工作。

写得好的待办项有三样任务清单条目通常没有的东西：它从哪来（引发它的决定或请求）、如何验证
已完成，以及关闭时的证据。第一样防止工作失去理由；第二样防止用"完成了"关闭；第三样是所有
者看的东西，代替看代码。

## 1. 所需上下文

- 规格说明或客户的初始请求，无论多不完整。
- 审计，如果已经有。
- `PROJECT.md` 和 `docs/STATUS.md`。

## 2. 提示词

**创建记录：**

> We are going to turn everything that must be done into numbered pending items. Read
> `PROJECT.md`, the client's request and whatever is in `docs/STATUS.md`. If the request is
> ambiguous on any point such that you cannot write a verifiable pending item for it, ask me;
> do not resolve it by assuming. Create `docs/PENDING.md` with one item per thing to do: number
> (PND-001 onwards), one-line title, what is requested, which decision originates it (or
> "client request, date"), how it will be verified as done, and status. Order them by the
> priority I gave you; if I gave none, propose an order and tell me why. Reply in my language.

我们在要求什么：把请求转成可验证的条目，并**在请求模糊到写不出可验证条目时提问**（歧义靠
提问解决，不靠选择）；每个待办项的字段，特别是"如何验证"，它之后让条目能用证据关闭；以及
附理由的建议顺序，让所有者确认或修改。

**每次会话的例行（放进协作契约或 `PROJECT.md`）：**

> Before touching any code, open `docs/PENDING.md`, tell me which item you are taking and why.
> Every commit cites its pending item. A pending item is closed with written evidence (the test,
> the screenshot, the number), never with "done". If along the way you see something that is not
> on the list, add it as a new pending item; do not do it.

我们在要求什么：每次会话的纪律：宣布取哪个，每次提交引用待办项，用证据关闭，以及对列表之外
出现的东西**记下而不做**。最后那条是模型"看到别的东西"时保护确切范围的条款。

## 3. 预期结果

`docs/PENDING.md`（或项目使用的工具），每个待办项包含：

- 编号、标题、状态（打开 / 进行中 / 关闭）、打开和关闭日期。
- 要求什么，两三句话。
- 来源：决定或请求，附日期。
- 如何验证已完成：测试、界面、数字。
- 关闭时：证据和提交。

以及契约或 `PROJECT.md` 中的例行。

## 4. 完整性检验

- 每个待办项是否说了如何验证？没有验证的待办项无法关闭。
- 是否有没有证据也没有提交的"已关闭"待办项？有就重新打开。
- 随机取三个提交：是否引用了它们的待办项？
- 代码中是否出现了没有待办项的东西？那就是代理越出范围的地方。
- 代理是否就请求中的模糊点问了你，还是自己解决了？

## 5. 警报信号

- 一个待办项"进行中"超过三次会话。要么它是三个待办项，要么被一个没人做的决定卡住了（第 6
  级台阶）。
- 一天关闭的待办项比当天的提交还多。它们在没有证据的情况下被关闭。
- 列表有超过五十个打开的待办项。那不是计划，是焦虑清单：需要排优先级并归档。
