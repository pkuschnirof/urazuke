# 步骤 13 — 作为计划输入的定期审计（台阶契约）

**阶段：** 上线生产。
**时机：** 第一次部署到生产之前必需；它开启上线阶段。之后，在运维中，根据变化节奏每一到两个
月一次，以及每个大阶段收尾时。
**形式：** 一次长发送，最好发给一个与构建者不同的代理。
**规模：** 任何项目第一次部署到生产之前必需；之后与变化节奏成比例（每周都变的系统每月审计
一次；稳定的系统每六个月一次）。

## 用途

每隔一段时间用新鲜的眼光看整个系统，并把看到的转成待办项。审计不是一份归档的报告：它是计
划。它避免没人看见的写在代码里的密码、读整张表的查询
[Ref. 18](../REFERENCIAS.md#ref-18)、依赖里的已知漏洞、几千行的组件
[Ref. 41](../REFERENCIAS.md#ref-41)。它也是把质量控制的独立性再往里推一步：审计的人不是构
建的人。

关于独立性：不需要另一家公司或另一个工具。**另一次会话，用另一个指令文件，没有参与过构建**
就够了。你要的是审计者不共享构建者的预设。一个构建了某模块的模型"知道"硬编码的密码是临时
的；一个第一次看到它的模型会如实报告。两道构建者在一天内留下的管理员入口就是这样被发现的
[Ref. 40](../REFERENCIAS.md#ref-40)。

如果可以选择，还要让它是**一个不同的模型**，而不只是同一个模型的另一次会话：2026 年的一项
研究测得，用不同模型的干净会话比同一模型的两次会话能发现更多错误
（[arXiv 2610.01471](https://arxiv.org/abs/2610.01471)）。这不是一道硬闸门，因为有时构建者
的模型是唯一可用的；但这是一个值得在可能时践行的偏好，系统越关键，就越值得践行。

## 1. 所需上下文

下面这份是通用清单。你在每条提示词之前必须已经做好的具体文件，连同它们的内容和最低状态，在第
2 节里，在每条提示词前面的"发送提示词之前"方框里。

- 完整的仓库，只读。
- 生产环境或测试环境，只读（数据库、日志）。
- 上一次审计，如果有，用来衡量什么变了。
- 范围：完整性、安全、性能、代码质量，或全部。
- `docs/PENDING.md`，附上一周期关闭的待办项及其凭据，供审计者挑选要复现哪些。

## 2. 提示词

**初始（如果可以，发给与构建者不同的代理）：**

**发送提示词之前**，下面这些必须已经存在，而且是你（或业务方和你一起）来做，不是代理：

- 一个新的代理会话，和构建者的那个不同：在另一个文件夹里克隆一份干净的仓库，而且，如果你的工
  具允许，给它一个不同的指令文件，上面只写"你是审计者；这个系统不是你造的"。没有这一点，审计
  者会共享构建者的假设，然后确认它们。
- 给那个会话的测试环境或生产环境的只读访问权：数据库、日志。只读凭据，放在仓库之外，变量名在
  聊天里说。
- 范围，由你决定，填进 [scope] 空：完整性、安全、性能、代码质量，或者全部。
- 上一次的审计，如果有的话（上次的 `docs/AUDIT_[日期]`），好让它衡量变了什么。
- 最低可接受状态：审计者的会话不是构建者的那个，而且它只有只读权限。

> Audit this system for [scope]. Read-only: change nothing except writing your report to
> `docs/AUDIT_[date].md`. If auditing some part requires access you lack (the database, the
> log, an environment), tell me and mark that part as not audited; do not pass it as fine. Go
> through all of the code, not a sample. Pick two or three pending items closed in the last cycle
> and reproduce their receipts literally: rerun the exact red-then-green commands they cite
> against the commits they name, and say for each one whether it reproduces or not. A receipt you
> only read is not a receipt you audited. For every finding: where it is (file and line), what
> the risk is, what evidence proves it (the command, the query, the number), and its priority:
> P0 must be fixed now, P1 soon, P2 when possible. Give a grade to every dimension you audited.
> End with the list of P0 findings turned into proposed pending items.
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
> 对这个系统做 [范围] 审计。只读：除了把你的报告写到 `docs/AUDIT_[日期].md` 之外什么都不
> 改。如果审计某部分需要你没有的访问权（数据库、日志、某个环境），告诉我并把那部分标为未
> 审计；不要把它当作没问题放过去。走遍全部代码，不是抽样。挑选上一周期关闭的两三个待办项，
> 逐字复现它们的凭据：针对它们点名的提交，重新运行它们引用的那个确切的先红后绿的命令，并对
> 每一个说明它能不能复现。一份你只读过的凭据，不是你审计过的凭据。每个发现：它在哪里（文件和
> 行）、风险是什么、什么证据证明它（命令、查询、数字），以及它的优先级：P0 必须马上修，P1
> 尽快，P2 有可能时。给你审计的每个维度打分。以转成拟议待办项的 P0 发现清单收尾。用我的语
> 言回复。
>
> 当你需要我做决定时，用 UX-28（`docs/ANEXO_HEURISTICAS.md`）的四个部分来问，并按这个顺序：让这个
> 问题成为必要的数据，列举出来；不超过五行的一段话，把这些数据连起来并让问题显现；问题本身，可能的
> 答案逐一编号；以及你的推荐。用项目在 `communication_depth` 中声明的技术深度来说——`beginner`、`de
> cision_maker` 或 `technical`——；项目没有声明就用 `decision_maker`。

我在要求什么，逐条：只读（审计者不修；它提议）；适配审计的完整性条款：**没能验证的要声明，
不默认通过**；全部代码而不是抽样，因为严重的发现通常在没人看的地方；**逐字复现两三份凭据**，
让审计去验证证据而不只是读它（这就是堵上 D-033 那个缺口的条款：被转述的红不是被审计过的红）；
每个发现附位置、风险、证据和优先级，让它不必重读报告就能行动；按维度打分，用来和上一次审计
比较；以及 P0 已经转成拟议的待办项。

**收尾（发给构建者）：**

**发送提示词之前**，你手边必须有这些：

- `docs/AUDIT_[日期].md`，由你读过，并且随机挑两条发现和审计者核实过（向它要命令、要行号；它
  必须拿得出来）。
- 构建者的会话已打开：这条提示词是发给构建者的，不是发给审计者的，文件的日期要填进空里。
- 最低可接受状态：你读了报告，知道有多少条 P0 和 P1，而且你打算去数它开了多少个待办项。

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [zh]
> 读 `docs/AUDIT_[日期].md`。为每个 P0 和 P1 开一个待办项，引用该发现。如果你不同意其中任
> 何一条，带着反面证据告诉我；不要忽略它。
>
> 当你需要我做决定时，用 UX-28（`docs/ANEXO_HEURISTICAS.md`）的四个部分来问，并按这个顺序：让这个
> 问题成为必要的数据，列举出来；不超过五行的一段话，把这些数据连起来并让问题显现；问题本身，可能的
> 答案逐一编号；以及你的推荐。用项目在 `communication_depth` 中声明的技术深度来说——`beginner`、`de
> cision_maker` 或 `technical`——；项目没有声明就用 `decision_maker`。

我在要求什么：审计转成待办项（否则就是一份归档的报告），而且不同意要明确并附证据，不能沉默。

## 3. 预期结果

- `docs/AUDIT_[日期].md`，包含：范围、什么能验证什么不能（以及为什么）、附位置、风险、证据和
  优先级的发现、每个维度一个分数、复现上一周期两三份凭据的结果，以及拟议待办项清单。
- 在 `docs/PENDING.md` 里：每个 P0 和 P1 一个待办项，引用该发现。

## 4. 完整性检验

- 报告说了它**没能**验证什么吗？如果它说全验证了，别信。
- 挑两个发现：它们有文件和行、有你能复现的证据吗？
- 报告说了它复现了哪些凭据、附上命令和结果，还是只说读过了？
- 在宣布审计关闭之前，每个 P0 都开了待办项吗？
- 各维度的分数能和上一次审计比较吗？
- 审计的是构建的那个代理吗？是的话，要求对 P0 做第二次审视。

## 5. 警报信号

- 审计没有发现任何 P0。在一个超过三个月的系统里，这几乎从不为真；更可能是范围太小，或者审
  计者共享了预设。
- 发现没有文件行号。那是意见，不是发现。
- 报告说凭据"已经复核过"，却没有展示跑过的命令或它的输出。读过的凭据和复现过的凭据不是一
  回事，只有后者才堵上 D-033 的异议。
- 过了两周，P0 还没有待办项。审计被归档了。
