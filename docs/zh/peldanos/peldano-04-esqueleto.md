# 步骤 4 — 带闸门的骨架（台阶契约）

**阶段：** 启动（一次）。
**形式：** 一次长发送，最后由所有者目视批准。
**规模：** 所有将有用户的项目必需。一次性原型可以跳过；但如果原型活下来了（它们总会活下
来），这级台阶是第一件要补交的。

## 用途

让系统在有任何功能之前就空着启动、测试和部署。到最后才发现部署极其昂贵：在 Kikan 中它在
启动一个月后才到来，连续花了五个待办项。如果骨架在第一周就部署，那些教训就会在零功能的
状态下承受。

背后的一般想法：**通往生产的路是产品的一部分**，不是最后的手续。一个在程序员机器上能运行
却无法部署的系统不是系统，是演示。而知道这条路通不通的唯一办法，是在还没有什么可失去的时
候走一遍。

## 1. 所需上下文

- `docs/SIZING.md`（第 3 级台阶）：选中的选项定义骨架。
- 环境调研：将在哪里运行（云、自有服务器），是否有测试环境和生产环境，谁有访问权，如果已
  有东西现在怎么部署。
- 项目类型：新建（绿地）、修正，或对现有事物的演进。

## 2. 提示词

**初始：**

> We are going to build the skeleton of the system, with no functionality at all. Read
> `PROJECT.md`, `docs/SIZING.md` and the environments survey. Evaluate whether you have what is
> needed for the skeleton to run in the test environment (access, URL, deployment method); if
> anything is missing, ask me before starting. Then build: the folder structure; the server and
> the UI starting up; the test structure with one smoke test that passes; continuous
> integration running that test suite on every push; and the deployment to the test
> environment. Declare the gates of the workflow (what must be green to move from one stage to
> the next) in `docs/GATES.md`. When done, take a screenshot of the empty UI running in the
> test environment and show it to me. Do not add any functionality "while you are at it".
> Reply in my language.

我们在要求什么：开始之前核实它有访问权（否则骨架留在代理的机器上）；骨架的确切清单（结构、
启动、一个测试、持续集成、部署到测试环境）；写下的闸门；测试环境的真实截图，这是它已部署
的唯一有效证据；以及明确禁止添加功能，因为模型倾向于"顺手"，而那会破坏确切范围。

**收尾：**

> Skeleton approved. Record in `docs/STATUS.md` the test environment URL, the command to run
> the tests and the command to deploy, and mark this step as done. Then run the deployment a
> second time and show me that the second run changed nothing.

我们在要求什么：把三个命令留在下一次会话能找到的地方，并证明部署是可重复的（运行两次不坏
任何东西）。第二次运行是流程是流程而不是运气的证明。

## 3. 预期结果

- 仓库，包含结构、服务器和界面能启动。
- 一个绿色的冒烟测试，测试套件在持续集成中运行（附绿色运行的链接）。
- 部署到测试环境可用，附 URL，并运行了两次。
- `docs/GATES.md`：闸门列表，每个附通过条件。
- 空系统在测试环境中运行的截图。
- `docs/STATUS.md` 更新了三个命令（运行、测试、部署）。

## 4. 完整性检验

- 你能打开测试环境的 URL 看到空界面吗？（你来做，不是代理。）
- 是否有绿色持续集成运行的链接？
- 部署是否运行了两次，第二次没坏任何东西？
- 闸门是否写下了，每个都有可验证的条件？
- 是否有你没要求的功能？有就说明代理违反了确切范围。

## 5. 警报信号

- 骨架"在本地能用"，但部署"以后再看"。不行：部署就是骨架。
- 截图来自代理的机器，而不是测试环境。要 URL。
- 闸门写着"代码质量好"之类的话。闸门是可验证的条件："测试套件是绿的"、"部署到测试环境
  成功"。
