# 步骤 0 — 这个项目能这样做吗？（台阶契约）

**阶段：** 启动（每个项目一次，在打开仓库之前）。
**形式：** 对话（代理评估并提问；所有者决定）。
**规模：** 所有项目必需，无论多小。花一小时；省几个月。
**状态：** 与 Pablo 一起制定中。排除性准则 X1 和 X2 已确认；权重准则（D1 到 D10）仍是尚未
加权的假设。

## 用途

避免陷入方法无法运作的项目。如果代理无法端到端地自我验证，或者没有一个做决定的领域所有者，
方法就退化为"用 AI 编程"，人类最终还是要读代码。这级台阶是入口：只过一次，如果过不去，
早知道比晚知道好。

有一个底层的想法值得明说：**这个方法不适用于所有项目，而这不是缺陷**。一个承诺适用于一切
的方法等于什么都没说。这级台阶做的是把边界写下来，让进或不进的决定成为一个决定，而不是一
个希望。

## 1. 所需上下文

以通用方式命名；代理评估是否足够，并索要缺少的部分。

- 需求调研：客户想要什么，为谁，今天没有这个系统会怎样。
- 技术调研：有什么技术或提议什么技术，是否存在先前的系统，该系统是否有仓库以及如何管理。
- 可测试性调研：界面能否以程序方式运行，界面的每个元素能否以其各种方法（点击、输入、读取
  状态）访问，以便测试能走完界面并验证后端的效果。
- 谁是领域所有者，有多少时间做决定。
- 错误的后果是什么（金钱、健康、运营、没有）。
- 环境与访问：是否会有测试环境，代理能否访问，是否有只读可查询的生产环境。

## 2. 提示词

提示词用英文写，这是模型遵循指令最精确、消耗 token 最少的语言。每条之下用中文解释我们在
要求什么、为什么每个条款都在那里。

**初始：**

> We are going to assess whether this project can be run with the Urazuke method. Read the
> initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`. First, evaluate whether the survey is sufficient to answer
> every criterion. If any criterion cannot be answered from the survey, ask me for the missing
> information before going on; do not assume. Then fill in the sheet criterion by criterion:
> the answer, where it comes from, and for each exclusionary criterion whether it is green or
> red. Do not decide: present me the completed sheet with your reading and your doubts, and I
> will decide. Reply in my language.

我们在要求什么：读两份输入（调研和准则表）；**在回答之前先评估调研是否足够**，不够就提问
而不是假设（这是方法所有提示词的核心条款）；填写表格并注明每个答案的来源，以便事后追溯；
把排除性准则标为绿或红；并且**不做决定**，因为适格性由所有者决定。最后一行要求它用所有者
的语言回答，因为提示词是英文的，但对话不必是。

**收尾：**

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.

我们在要求什么：把决定连同日期和所有者写下来（第 6 级台阶），若有条件则附条件，并附上问答
的痕迹，这是它没有假设任何东西的证据。

## 3. 预期结果

一页的 `docs/ELIGIBILITY.md`（或项目使用的名字），包含：

- 日期和决定者。
- 两条排除性准则及其答案和来源：
  - X1：有可访问且按标准管理的仓库（或项目是新的）。
  - X2：界面能以程序方式运行，每个元素能以其各种方法访问，并验证对后端的效果。
- 权重准则（梯子中的 D1 到 D10，待定稿后），每条附答案、来源和权重。
- 决定：可、不可，或附条件可，并写明条件。
- 代理提出的问题和答案，以留下痕迹。

## 4. 完整性检验（所有者进行，不读代码）

- 两条排除性准则是否都有明确的答案和来源？若有一条是红的，决定是"不可"，还是有一个化解它
  的条件？
- 是否有准则是用"我想是的"或"大概"回答的？如果有，台阶没登上：代理应该提问。
- 决定是否带日期和姓名写下了？
- 条件（如果有）是否可验证？（"在第 3 级台阶之前获得生产环境的只读访问"可以；"客户配合"
  不行。）

## 5. 警报信号

- 代理一个问题都没问就填完了整张表。要么调研是完美的（从来不是），要么它假设了。
- 决定是"附条件可"，而条件超过三个。很可能是一个不愿说出口的"不可"。
- 准则 X2 的回答是"可以，稍微做点工作"。如果今天界面不能以程序方式操作，那"稍微"就是整个
  项目。
