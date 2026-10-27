# 步骤 4 — 带闸门的骨架（台阶契约）

**阶段：** 启动。
**时机：** 一次，在启动阶段收尾时，容量估算之后、任何功能之前。全部初始基础设施和集成与部署链
就是在这里做的。
**形式：** 一次长发送，最后由你目视批准。
**规模：** 所有将有用户的项目必需。在一个用完即弃的原型里可以跳过；但如果原型活了下来（它
们总是活下来），这级台阶是第一件要补的。

## 用途

让系统在拥有功能之前，先以**空**的状态启动、测试和部署。到最后才发现部署是极其昂贵的：在我
的一个系统里，部署在启动一个月后才到来，花了连续五个待办项
[Ref. 32](../REFERENCIAS.md#ref-32)。如果骨架在启动阶段就部署，那些教训会在零功能的情况下
发生。

背后的总体想法：**通往生产的路是产品的一部分**，不是最后的手续。一个在程序员机器上能跑、却
没法部署的系统不是系统；是演示。而知道这条路能走通的唯一方法，是在还没有东西可失去的时候
走一遍。所以在这级台阶里要搭起循环阶段之后会用到的一切：有结构的仓库、测试环境、每次 push
都运行测试套件的持续集成，以及到测试环境的自动部署。

## 1. 所需上下文

下面这份是通用清单。你在每条提示词之前必须已经做好的具体文件，连同它们的内容和最低状态，在第
2 节里，在每条提示词前面的"发送提示词之前"方框里。

- `docs/SIZING.md`（第 3 级台阶）：选中的选项定义了骨架。
- 环境调研：它将运行在哪里（云、自有服务器），是否有测试环境和生产环境，谁有访问权，如果
  已有东西，今天如何部署。
- 将要部署的地方的凭证，哪怕是免费服务。
- 项目类型：新建、修正，还是已有系统的演进。

## 2. 提示词

**初始：**

**发送提示词之前**，下面这些必须已经存在，而且是你（或业务方和你一起）来做，不是代理：

- `docs/ENVIRONMENTS_SURVEY.md`：环境调研，由你来写。系统会在哪里运行（你已经有的服务器，还
  是云服务，哪一家）；会不会有测试环境和生产环境，它们是否已经存在；谁对什么有访问权；今天如
  果有东西，是怎么部署的（手工、一个脚本、没有）；项目的类型（全新、纠错，还是对既有系统的演
  进）；以及测试环境将会有的 URL 或域名，如果已经知道的话。提示词把它叫作 "the environments
  survey"，没有给路径：就用这个名字保存，或者在聊天里告诉它叫什么。
- 要部署到的那个地方的凭据，哪怕是个免费服务：已创建，由你亲自试过一次（登进控制台），并保存
  在仓库之外（放在你机器上的一个环境文件里，或者你工具的密钥管理器里）。告诉代理它们在哪里；
  不要把它们贴进聊天。
- `PROJECT.md`（第 2 级台阶）和 `docs/SIZING.md`（第 3 级台阶），已定稿：骨架是在那里选定的
  方案之上构建的，代理必须读到它们。
- 最低可接受状态：你自己能登进要部署到的那个服务，而且调研里写明了测试环境是哪个。没有这些，
  骨架会留在你的机器上，台阶登不上去。

> We are going to build the skeleton of the system, with no functionality at all. Read
> `PROJECT.md`, `docs/SIZING.md` and the environments survey. Evaluate whether you have what is
> needed for the skeleton to run in the test environment (access, URL, deployment method); if
> anything is missing, ask me before starting. Then build: the folder structure; the server and
> the UI starting up; the test structure with one smoke test that passes; continuous
> integration running that test suite on every push; and the deployment to the test
> environment. Declare the gates of the workflow (what must be green to move from one stage to
> the next) in `docs/GATES.md`. When done, take a screenshot of the empty UI running in the
> test environment and show it to me. Do not add any functionality "while you are at it".
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
> 我们要构建系统的骨架，完全没有功能。读 `PROJECT.md`、`docs/SIZING.md` 和环境调研。评估
> 你是否具备让骨架在测试环境中运行所需的东西（访问权、URL、部署方式）；如果缺什么，在开
> 始之前问我。然后构建：文件夹结构；能启动的服务器和界面；带一个能通过的冒烟测试的测试结
> 构；每次 push 都运行那个测试套件的持续集成；以及到测试环境的部署。在 `docs/GATES.md` 中
> 声明工作流的闸门（从一个阶段进到下一个必须是绿色的东西）。完成后，对运行在测试环境中的
> 空界面截图给我看。不要"顺手"加任何功能。
>
> 当你需要我做决定时，用 UX-28（`docs/ANEXO_HEURISTICAS.md`）的四个部分来问，并按这个顺序：让这个
> 问题成为必要的数据，列举出来；不超过五行的一段话，把这些数据连起来并让问题显现；问题本身，可能的
> 答案逐一编号；以及你的推荐。用项目在 `communication_depth` 中声明的技术深度来说——`beginner`、`de
> cision_maker` 或 `technical`——；项目没有声明就用 `decision_maker`。
>
> 用我的语言回复。

我在要求什么：开始前先验证它有访问权（没有的话骨架就留在代理的机器上）；骨架是什么的精确
清单（结构、启动、一个测试、持续集成、部署到测试环境）；写下来的闸门；一张来自测试环境的真
实截图，那是它已部署的唯一有效证据；以及明确禁止添加功能，因为模型倾向于"顺手"，而那会破
坏范围精确。

**收尾：**

**发送提示词之前**，你手边必须有这些：

- 代理给你看的测试环境截图，以及你自己用浏览器访问那个 URL 的结果：看到的必须是同一个东西。
  这是系统第一次被人眼看见，是一个里程碑。
- 一条绿色的持续集成运行记录的链接，向代理要来，由你亲自打开。
- `docs/GATES.md`，已读：每道闸门都有一个可验证的条件。
- 最低可接受状态：你用自己的眼睛，在真实的 URL 上看到了那个空白界面。如果你只看了截图，别批
  准。

> Skeleton approved. Record in `docs/STATUS.md` the test environment URL, the command to run
> the tests and the command to deploy, and mark this step as done. Then run the deployment a
> second time and show me that the second run changed nothing.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [zh]
> 骨架批准。在 `docs/STATUS.md` 中记录测试环境的 URL、运行测试的命令和部署的命令，并把这一
> 步标为已完成。然后第二次运行部署，并向我展示第二次运行什么都没改变。
>
> 当你需要我做决定时，用 UX-28（`docs/ANEXO_HEURISTICAS.md`）的四个部分来问，并按这个顺序：让这个
> 问题成为必要的数据，列举出来；不超过五行的一段话，把这些数据连起来并让问题显现；问题本身，可能的
> 答案逐一编号；以及你的推荐。用项目在 `communication_depth` 中声明的技术深度来说——`beginner`、`de
> cision_maker` 或 `technical`——；项目没有声明就用 `decision_maker`。

我在要求什么：把三条命令留在下次会话能找到的地方，并证明部署是可重复的（跑两次不弄坏任何东
西）。那第二次运行是流程确实是流程而不是运气的证据。

## 3. 预期结果

- 带结构的仓库，服务器和界面能启动。
- 一个绿色的冒烟测试，测试套件在持续集成中运行（附绿色运行的链接）。
- 到测试环境的部署能用，附 URL，并且运行了两次。
- `docs/GATES.md`：闸门清单，每个附通过条件。
- 一张运行在测试环境中的空系统的截图。
- `docs/STATUS.md` 更新了三条命令（运行、测试、部署）。

## 4. 完整性检验

- 你能打开测试环境的 URL 并看到空界面吗？（你来做，不是代理。）
- 有没有一条指向绿色持续集成运行的链接？
- 部署运行了两次，第二次没弄坏任何东西吗？
- 闸门是否写了下来，每个附一个可验证的条件？
- 有没有你没要求的功能？有的话，代理违反了范围精确。

## 5. 警报信号

- 骨架"在本地能用"，但部署"以后再看"。不行：部署就是骨架。
- 截图来自代理的机器，而不是测试环境。要 URL。
- 闸门写着"代码质量好"之类的东西。闸门是可验证的条件："测试套件是绿的"、"到测试环境的部
  署成功了"。
