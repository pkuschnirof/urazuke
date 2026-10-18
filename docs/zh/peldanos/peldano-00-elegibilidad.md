# 步骤 0 — 这个项目能这样做吗？（台阶契约）

**阶段：** 启动。
**时机：** 只做一次，在第一周，在打开仓库之前，先于其他一切。一个小时的工作。
**形式：** 对话：代理评估并提问；你决定。
**规模：** 所有项目必需，再小也是。花一个小时；省下几个月。
**状态：** 排他性准则 X1 和 X2 已经定稿；加权准则（D1 到 D10）我还在校准，标为假设。

## 用途

别进入一个方法无法运作的项目。如果代理没法自己端到端地验证自己，或者没有一个能做决定的领域
所有者，方法就退化为"用 AI 编程"，而你最终会去读代码。这级台阶是入口：只跨一次，如果跨不
过去，早知道比晚知道好。

还有一个底层的想法，我希望你心里清楚：**方法不是对任何项目都适用，而这不是缺陷**。一个承诺
对一切都适用的方法什么也没说。这级台阶做的是把边界写下来，让进或不进成为一个决定而不是一个
希望。两条排他性准则来自我拒绝过的项目，而不是我接受过的
[Ref. 46](../REFERENCIAS.md#ref-46)。

## 1. 所需上下文

以通用方式命名；代理评估是否足够，并索要缺的。

- 请求调研：客户想要什么，为谁，今天没有这个系统时发生什么。
- 技术调研：有或提议什么技术，是否存在旧系统，那个系统有没有仓库、如何管理。
- 可测试性调研：界面能否由程序执行，界面的每个元素是否都能通过其各种方法（点击、输入、读
  取状态）访问，使得一个测试能走完界面并在后端验证效果。
- 领域所有者是谁，有多少时间做决定。
- 一个错误有什么后果（钱、健康、运营、没有）。
- 环境与访问：会不会有测试环境，代理能否访问，是否有可只读查询的生产环境。

## 2. 提示词

提示词用英文，那是模型遵循指令最精确、消耗 token 最少的语言。每条都附翻译（在 HTML 里有一
个按钮），下面是我在要求什么、为什么每个条款都在那里的解释。贴给模型的是英文。

**初始：**

> We are going to assess whether this project can be run with the Urazuke method. Read the
> initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`. First, evaluate whether the survey is sufficient to answer
> every criterion. If any criterion cannot be answered from the survey, ask me for the missing
> information before going on; do not assume. Then fill in the sheet criterion by criterion:
> the answer, where it comes from, and for each exclusionary criterion whether it is green or
> red. Do not decide: present me the completed sheet with your reading and your doubts, and I
> will decide. Reply in my language.

> [zh]
> 我们要评估这个项目能否用 Urazuke 方法来做。读 `docs/INITIAL_SURVEY.md` 中的初始调研和
> `docs/ELIGIBILITY_CRITERIA.md` 中的准则表。首先，评估调研是否足以回答每一条准则。如果
> 有任何准则无法从调研中回答，在继续之前向我索要缺少的信息；不要假设。然后逐条填写准则
> 表：答案、它从哪里来，以及每条排他性准则是绿色还是红色。不要做决定：把填好的表连同你
> 的解读和你的疑问呈给我，由我来决定。用我的语言回复。

我在要求什么：读两份输入（调研和准则表）；**在回答之前先评估调研是否足够**，不够就提问而
不是假设（这是方法所有提示词的核心条款）；填表时注明每个答案的来源，以便事后追溯；把排他
性准则标为绿或红；并且**不做决定**，因为适格性由我决定。最后一行要求它用我的语言回答，因
为提示词是英文的，但对话不必是。

**收尾：**

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.

> [zh]
> 决定：[可行 / 不可行 / 有条件可行：…]。把最终的表写到 `docs/ELIGIBILITY.md`，附日期、
> 谁决定的、每条准则的答案及其来源，以及条件（如有）。把你问过的问题和我的回答包含进去。

我在要求什么：把决定写下来，附日期和所有者（第 6 级台阶），附条件（如有），并留下问答的痕
迹，那是它没有假设任何东西的证据。

## 3. 预期结果

一个 `docs/ELIGIBILITY.md` 文件（或你项目用的名字），一页，包含：

- 日期和谁决定的。
- 两条排他性准则，各附答案和来源：
  - X1：有可访问、以标准方式管理的仓库（或项目是新的）。
  - X2：界面可由程序执行，每个元素都能通过其各种方法访问，并能验证对后端的效果。
- 加权准则，每条附答案、来源和权重（权重校准后）。
- 决定：可行、不可行，或有条件可行，并把条件写下来。
- 代理问过的问题和回答，留下痕迹。

## 4. 完整性检验（你来做，不读代码）

- 两条排他性准则是否有明确的答案和来源？如果有一条是红色，决定是"不可行"，还是有一个能
  解决它的条件？
- 有没有哪条准则的答案是"我想是的"或"大概"？如果有，台阶没登上：代理本该提问。
- 决定是否写明了日期和名字？
- 条件（如有）是否可验证？（"在第 3 级台阶之前拿到生产环境的读访问权"可以；"客户要配
  合"不行。）

## 5. 警报信号

- 代理一个问题都没问就把整张表填完了。要么调研是完美的（从来不是），要么它假设了。
- 决定是"有条件可行"，而条件超过三个。那很可能是一个不想说出口的"不可行"。
- 准则 X2 的回答是"可以，稍微做点工作"。如果界面今天不能由程序操作，那"一点工作"就是整个
  项目。
